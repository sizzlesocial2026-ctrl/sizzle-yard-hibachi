const SHEET_NAME = "Sizzle Yard Leads";

function doPost(e) {
  const sheet = getOrCreateSheet_();
  const data = JSON.parse(e.postData.contents || "{}");

  sheet.appendRow([
    new Date(),
    data.name || "",
    data.phone || "",
    data.email || "",
    data["event-date"] || "",
    data.city || "",
    data.adults || "",
    data.kids || "",
    data.guests || data["guest-count"] || "",
    data.estimatedTotal || data["estimated-total"] || "",
    data.depositAmount || "",
    data.estimatedBalance || data["estimated-balance"] || "",
    data.minimumApplied || "",
    data.time || "",
    data.notes || "",
    data.submittedAt || ""
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}

function getOrCreateSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    sheet.appendRow([
      "Received At",
      "Name",
      "Phone",
      "Email",
      "Event Date",
      "City / ZIP",
      "Adults",
      "Kids",
      "Guest Count",
      "Estimated Total",
      "Deposit Amount",
      "Estimated Balance",
      "Minimum Applied",
      "Preferred Time",
      "Notes",
      "Browser Submitted At"
    ]);
  }

  return sheet;
}
