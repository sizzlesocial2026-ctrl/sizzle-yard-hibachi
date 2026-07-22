import fs from "node:fs/promises";
import path from "node:path";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputDir = "/private/tmp/sizzle-yard-leads-sheet";
const outputPath = path.join(outputDir, "Sizzle Yard Hibachi Leads.xlsx");

const workbook = Workbook.create();
const leads = workbook.worksheets.add("Leads");
const status = workbook.worksheets.add("Status Options");
const summary = workbook.worksheets.add("Summary");

const headers = [
  "Timestamp",
  "Lead Source",
  "Customer Name",
  "Phone",
  "Email",
  "City / ZIP",
  "Event Date",
  "Preferred Time",
  "Adults",
  "Kids",
  "Total Guests",
  "Event Type",
  "Estimated Total",
  "Deposit",
  "Estimated Balance",
  "Message / Notes",
  "Status",
  "Owner",
  "Quoted Amount",
  "Deposit Sent",
  "Deposit Paid",
  "Final Order Amount",
  "Add-ons",
  "Lost Reason",
  "Last Follow-up",
  "Next Follow-up",
];

leads.showGridLines = false;
summary.showGridLines = false;
status.showGridLines = false;

leads.getRange("A1:Z1").values = [headers];
leads.getRange("A1:Z1").format.fill = { color: "#1F2937" };
leads.getRange("A1:Z1").format.font = { color: "#FFFFFF", bold: true };
leads.getRange("A1:Z1").format.wrapText = true;
leads.getRange("A1:Z1").format.borders = { preset: "outside", style: "thin", color: "#111827" };
leads.freezePanes.freezeRows(1);

const widths = [
  150, 120, 140, 120, 180, 110, 120, 120, 70, 70, 90, 120, 120,
  90, 120, 260, 130, 100, 120, 110, 110, 140, 160, 160, 120, 120,
];
widths.forEach((width, index) => {
  leads.getRangeByIndexes(0, index, 1, 1).format.columnWidthPx = width;
});

leads.getRange("A2:Z201").format.borders = {
  insideHorizontal: { style: "thin", color: "#E5E7EB" },
};
leads.getRange("A2:Z201").format.font = { color: "#111827" };
leads.getRange("A2:Z201").format.wrapText = true;
leads.getRange("A2:A201").setNumberFormat("yyyy-mm-dd hh:mm");
leads.getRange("G2:G201").setNumberFormat("yyyy-mm-dd");
leads.getRange("Y2:Z201").setNumberFormat("yyyy-mm-dd");
leads.getRange("I2:K201").setNumberFormat("#,##0");
leads.getRange("M2:O201").setNumberFormat("$#,##0");
leads.getRange("S2:S201").setNumberFormat("$#,##0");
leads.getRange("V2:V201").setNumberFormat("$#,##0");

leads.tables.add("A1:Z201", true, "SizzleYardLeads");

const statusRows = [
  ["Status"],
  ["New Lead"],
  ["Contacted"],
  ["Quoted"],
  ["Deposit Sent"],
  ["Deposit Paid"],
  ["Booked"],
  ["Completed"],
  ["Lost"],
  ["Follow Up Later"],
  [""],
  ["Deposit / Payment"],
  ["No"],
  ["Yes"],
  [""],
  ["Lead Source"],
  ["Website Form"],
  ["Phone Call"],
  ["SMS"],
  ["Google Ads"],
  ["Google Business Profile"],
  ["Instagram"],
  ["Referral"],
  ["Other"],
];
status.getRange("A1:A24").values = statusRows;
status.getRange("A1:A1").format.fill = { color: "#1F2937" };
status.getRange("A1:A1").format.font = { color: "#FFFFFF", bold: true };
status.getRange("A12:A12").format.fill = { color: "#374151" };
status.getRange("A12:A12").format.font = { color: "#FFFFFF", bold: true };
status.getRange("A16:A16").format.fill = { color: "#374151" };
status.getRange("A16:A16").format.font = { color: "#FFFFFF", bold: true };
status.getRange("A:A").format.columnWidthPx = 180;

summary.getRange("A1:D1").merge();
summary.getRange("A1:D1").values = [["Sizzle Yard Hibachi Leads Summary"]];
summary.getRange("A1:D1").format.fill = { color: "#111827" };
summary.getRange("A1:D1").format.font = { color: "#FFFFFF", bold: true, size: 16 };
summary.getRange("A1:D1").format.rowHeightPx = 34;

summary.getRange("A3:B9").values = [
  ["Metric", "Value"],
  ["Total Leads", null],
  ["New Leads", null],
  ["Quoted", null],
  ["Deposit Sent", null],
  ["Booked", null],
  ["Estimated Revenue", null],
];
summary.getRange("A3:B3").format.fill = { color: "#374151" };
summary.getRange("A3:B3").format.font = { color: "#FFFFFF", bold: true };
summary.getRange("A4:B9").format.borders = { preset: "inside", style: "thin", color: "#E5E7EB" };
summary.getRange("B4").formulas = [["=COUNTA(Leads!C2:C201)"]];
summary.getRange("B5").formulas = [["=COUNTIF(Leads!Q2:Q201,\"New Lead\")"]];
summary.getRange("B6").formulas = [["=COUNTIF(Leads!Q2:Q201,\"Quoted\")"]];
summary.getRange("B7").formulas = [["=COUNTIF(Leads!Q2:Q201,\"Deposit Sent\")"]];
summary.getRange("B8").formulas = [["=COUNTIF(Leads!Q2:Q201,\"Booked\")"]];
summary.getRange("B9").formulas = [["=SUM(Leads!S2:S201)"]];
summary.getRange("B9").setNumberFormat("$#,##0");
summary.getRange("A:A").format.columnWidthPx = 180;
summary.getRange("B:B").format.columnWidthPx = 130;

await fs.mkdir(outputDir, { recursive: true });

const inspect = await workbook.inspect({
  kind: "sheet,table",
  maxChars: 5000,
  tableMaxRows: 6,
  tableMaxCols: 8,
});

const errors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 50 },
  maxChars: 2000,
});

const preview = await workbook.render({
  sheetName: "Leads",
  range: "A1:Z12",
  scale: 1,
  format: "png",
});
await fs.writeFile(path.join(outputDir, "preview.png"), new Uint8Array(await preview.arrayBuffer()));

const output = await SpreadsheetFile.exportXlsx(workbook);
await output.save(outputPath);

console.log(JSON.stringify({ outputPath, inspect: inspect.ndjson, errors: errors.ndjson }, null, 2));
