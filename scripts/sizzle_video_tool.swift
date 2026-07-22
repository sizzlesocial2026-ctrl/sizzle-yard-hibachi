import AppKit
import AVFoundation
import Foundation

struct VideoItem {
    let index: Int
    let path: String
}

func usage() -> Never {
    print("""
    Usage:
      swift scripts/sizzle_video_tool.swift thumbnails <mapping.csv> <output-dir>
      swift scripts/sizzle_video_tool.swift clip <input-video> <output-video> <start-seconds> <duration-seconds>
    """)
    exit(2)
}

func ensureDirectory(_ path: String) throws {
    try FileManager.default.createDirectory(atPath: path, withIntermediateDirectories: true)
}

func loadMapping(_ path: String) throws -> [VideoItem] {
    let text = try String(contentsOfFile: path, encoding: .utf8)
    var items: [VideoItem] = []

    for line in text.split(separator: "\n").dropFirst() {
        let parts = line.split(separator: ",", maxSplits: 2).map(String.init)
        guard parts.count >= 2 else { continue }
        let reviewName = parts[0]
        let numberText = reviewName
            .replacingOccurrences(of: "sizzle-yard-review-", with: "")
            .split(separator: "-")
            .first
            .map(String.init) ?? "0"
        let index = Int(numberText) ?? (items.count + 1)
        let reviewPath = URL(fileURLWithPath: path)
            .deletingLastPathComponent()
            .appendingPathComponent("videos")
            .appendingPathComponent(reviewName)
            .path
        items.append(VideoItem(index: index, path: reviewPath))
    }

    return items.sorted { $0.index < $1.index }
}

func jpegData(from image: CGImage, maxWidth: CGFloat = 360) -> Data? {
    let width = CGFloat(image.width)
    let height = CGFloat(image.height)
    let scale = min(1, maxWidth / width)
    let targetSize = NSSize(width: width * scale, height: height * scale)
    let nsImage = NSImage(cgImage: image, size: targetSize)
    guard let tiff = nsImage.tiffRepresentation,
          let bitmap = NSBitmapImageRep(data: tiff) else {
        return nil
    }
    return bitmap.representation(using: .jpeg, properties: [.compressionFactor: 0.82])
}

func generateThumbnails(mappingPath: String, outputDir: String) throws {
    try ensureDirectory(outputDir)
    let items = try loadMapping(mappingPath)

    for item in items {
        let url = URL(fileURLWithPath: item.path)
        let asset = AVURLAsset(url: url)
        let generator = AVAssetImageGenerator(asset: asset)
        generator.appliesPreferredTrackTransform = true
        generator.maximumSize = CGSize(width: 720, height: 720)

        let time = CMTime(seconds: 0.5, preferredTimescale: 600)
        do {
            let cgImage = try generator.copyCGImage(at: time, actualTime: nil)
            if let data = jpegData(from: cgImage) {
                let output = URL(fileURLWithPath: outputDir)
                    .appendingPathComponent(String(format: "candidate-%02d.jpg", item.index))
                try data.write(to: output)
                print("thumb \(item.index): \(output.path)")
            }
        } catch {
            print("thumb \(item.index) failed: \(error.localizedDescription)")
        }
    }
}

func exportClip(input: String, output: String, start: Double, duration: Double) throws {
    let inputURL = URL(fileURLWithPath: input)
    let outputURL = URL(fileURLWithPath: output)

    if FileManager.default.fileExists(atPath: outputURL.path) {
        try FileManager.default.removeItem(at: outputURL)
    }

    let asset = AVURLAsset(url: inputURL)
    guard let export = AVAssetExportSession(asset: asset, presetName: AVAssetExportPreset1280x720) ??
            AVAssetExportSession(asset: asset, presetName: AVAssetExportPresetPassthrough) else {
        throw NSError(domain: "SizzleVideoTool", code: 1, userInfo: [NSLocalizedDescriptionKey: "Could not create export session"])
    }

    export.outputURL = outputURL
    export.outputFileType = .mp4
    export.shouldOptimizeForNetworkUse = true
    export.timeRange = CMTimeRange(
        start: CMTime(seconds: start, preferredTimescale: 600),
        duration: CMTime(seconds: duration, preferredTimescale: 600)
    )

    let semaphore = DispatchSemaphore(value: 0)
    export.exportAsynchronously {
        semaphore.signal()
    }
    semaphore.wait()

    if export.status == .completed {
        print("clip: \(outputURL.path)")
    } else {
        let message = export.error?.localizedDescription ?? "Unknown export failure"
        throw NSError(domain: "SizzleVideoTool", code: 2, userInfo: [NSLocalizedDescriptionKey: message])
    }
}

let args = CommandLine.arguments
guard args.count >= 2 else { usage() }

do {
    switch args[1] {
    case "thumbnails":
        guard args.count == 4 else { usage() }
        try generateThumbnails(mappingPath: args[2], outputDir: args[3])
    case "clip":
        guard args.count == 6,
              let start = Double(args[4]),
              let duration = Double(args[5]) else { usage() }
        try exportClip(input: args[2], output: args[3], start: start, duration: duration)
    default:
        usage()
    }
} catch {
    fputs("Error: \(error.localizedDescription)\n", stderr)
    exit(1)
}
