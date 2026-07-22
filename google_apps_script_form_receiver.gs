const SHEET_NAME = "Leads";
const HEADERS = [
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
  "Next Follow-up"
];

const STATUS_OPTIONS = [
  "New Lead",
  "Contacted",
  "Quoted",
  "Deposit Sent",
  "Deposit Paid",
  "Booked",
  "Completed",
  "Lost"
];

const LOST_REASONS = [
  "No Response",
  "Price",
  "Date Unavailable",
  "Outside Service Area",
  "Booked Competitor",
  "Other"
];

const OWNERS = ["Sizzle Yard", "Song", "Team"];

function doPost(e) {
  const sheet = getOrCreateSheet_();
  const data = JSON.parse(e.postData.contents || "{}");

  sheet.appendRow([
    new Date(),
    data.leadSource || "Website Form",
    data.name || "",
    data.phone || "",
    data.email || "",
    data.city || "",
    data["event-date"] || "",
    data.time || "",
    data.adults || "",
    data.kids || "",
    data.guests || data["guest-count"] || "",
    data.eventType || "",
    data.estimatedTotal || data["estimated-total"] || "",
    data.depositAmount || "",
    data.estimatedBalance || data["estimated-balance"] || "",
    data.notes || "",
    "New Lead",
    "",
    "",
    "No",
    "No",
    "",
    "",
    "",
    "",
    ""
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
    sheet.appendRow(HEADERS);
  }

  return sheet;
}

function setupMerchantDashboard() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const leads = ensureSheet_(spreadsheet, "Leads");
  const statusOptions = ensureSheet_(spreadsheet, "Status Options");
  const summary = ensureSheet_(spreadsheet, "Summary");
  const replyTemplates = ensureSheet_(spreadsheet, "Reply Templates");

  setupLeadsSheet_(leads);
  setupStatusOptionsSheet_(statusOptions);
  setupSummarySheet_(summary);
  setupReplyTemplatesSheet_(replyTemplates);

  return "Sizzle Yard Hibachi merchant dashboard setup complete.";
}

function ensureSheet_(spreadsheet, name) {
  return spreadsheet.getSheetByName(name) || spreadsheet.insertSheet(name);
}

function setupLeadsSheet_(sheet) {
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, HEADERS.length)
    .setFontWeight("bold")
    .setBackground("#f1f3f4")
    .setFontColor("#202124");

  const widths = [
    155, 135, 165, 145, 190, 145, 130, 130, 80, 80, 105, 135, 125,
    100, 135, 285, 135, 115, 130, 120, 120, 145, 145, 155, 135, 135
  ];
  widths.forEach(function(width, index) {
    sheet.setColumnWidth(index + 1, width);
  });

  sheet.getRange("A:A").setNumberFormat("m/d/yyyy h:mm am/pm");
  sheet.getRange("G:G").setNumberFormat("m/d/yyyy");
  sheet.getRange("Y:Z").setNumberFormat("m/d/yyyy");
  sheet.getRange("M:O").setNumberFormat("$#,##0");
  sheet.getRange("S:V").setNumberFormat("$#,##0");

  applyDropdown_(sheet.getRange("Q2:Q1000"), STATUS_OPTIONS);
  applyDropdown_(sheet.getRange("R2:R1000"), OWNERS);
  applyDropdown_(sheet.getRange("T2:T1000"), ["No", "Yes"]);
  applyDropdown_(sheet.getRange("U2:U1000"), ["No", "Yes"]);
  applyDropdown_(sheet.getRange("X2:X1000"), LOST_REASONS);

  if (sheet.getFilter()) {
    sheet.getFilter().remove();
  }
  sheet.getRange(1, 1, Math.max(sheet.getMaxRows(), 2), HEADERS.length).createFilter();

  const rules = [
    formatTextRule_(sheet, "Q2:Q1000", "New Lead", "#fff3cd"),
    formatTextRule_(sheet, "Q2:Q1000", "Contacted", "#e8f0fe"),
    formatTextRule_(sheet, "Q2:Q1000", "Quoted", "#e6f4ea"),
    formatTextRule_(sheet, "Q2:Q1000", "Deposit Sent", "#d2e3fc"),
    formatTextRule_(sheet, "Q2:Q1000", "Deposit Paid", "#ceead6"),
    formatTextRule_(sheet, "Q2:Q1000", "Booked", "#b7e1cd"),
    formatTextRule_(sheet, "Q2:Q1000", "Completed", "#f1f3f4"),
    formatTextRule_(sheet, "Q2:Q1000", "Lost", "#fce8e6"),
    formatTextRule_(sheet, "U2:U1000", "Yes", "#ceead6"),
    SpreadsheetApp.newConditionalFormatRule()
      .whenFormulaSatisfied('=AND($Z2<>"",$Z2<=TODAY(),NOT(REGEXMATCH($Q2,"Booked|Completed|Lost")))')
      .setBackground("#fce8e6")
      .setRanges([sheet.getRange("Z2:Z1000")])
      .build()
  ];
  sheet.setConditionalFormatRules(rules);
}

function applyDropdown_(range, values) {
  const rule = SpreadsheetApp.newDataValidation()
    .requireValueInList(values, true)
    .setAllowInvalid(false)
    .build();
  range.setDataValidation(rule);
}

function formatTextRule_(sheet, rangeA1, text, background) {
  return SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo(text)
    .setBackground(background)
    .setRanges([sheet.getRange(rangeA1)])
    .build();
}

function setupStatusOptionsSheet_(sheet) {
  sheet.clear();
  sheet.getRange(1, 1, 9, 2).setValues([
    ["Status", "Meaning"],
    ["New Lead", "New inquiry. Reply as soon as possible."],
    ["Contacted", "Customer received first reply."],
    ["Quoted", "Price and details were sent."],
    ["Deposit Sent", "Deposit payment link or request was sent."],
    ["Deposit Paid", "Deposit received. Confirm booking details."],
    ["Booked", "Party is confirmed on the calendar."],
    ["Completed", "Event finished."],
    ["Lost", "Lead did not book."]
  ]);
  sheet.getRange(1, 4, 7, 1).setValues([
    ["Lost Reason"],
    ["No Response"],
    ["Price"],
    ["Date Unavailable"],
    ["Outside Service Area"],
    ["Booked Competitor"],
    ["Other"]
  ]);
  sheet.getRange(1, 6, 4, 1).setValues([
    ["Owner"],
    ["Sizzle Yard"],
    ["Song"],
    ["Team"]
  ]);
  sheet.getRange("A1:F1").setFontWeight("bold").setBackground("#f1f3f4");
  sheet.autoResizeColumns(1, 6);
}

function setupSummarySheet_(sheet) {
  sheet.clear();
  sheet.getRange("A1").setValue("Sizzle Yard Hibachi Lead Summary");
  sheet.getRange("A1").setFontWeight("bold").setFontSize(14);
  sheet.getRange(3, 1, 12, 2).setValues([
    ["Metric", "Count"],
    ["New Lead", '=COUNTIF(Leads!Q:Q,"New Lead")'],
    ["Contacted", '=COUNTIF(Leads!Q:Q,"Contacted")'],
    ["Quoted", '=COUNTIF(Leads!Q:Q,"Quoted")'],
    ["Deposit Sent", '=COUNTIF(Leads!Q:Q,"Deposit Sent")'],
    ["Deposit Paid", '=COUNTIF(Leads!Q:Q,"Deposit Paid")'],
    ["Booked", '=COUNTIF(Leads!Q:Q,"Booked")'],
    ["Completed", '=COUNTIF(Leads!Q:Q,"Completed")'],
    ["Lost", '=COUNTIF(Leads!Q:Q,"Lost")'],
    ["Deposit Paid = Yes", '=COUNTIF(Leads!U:U,"Yes")'],
    ["Estimated Pipeline", '=SUM(Leads!M2:M)'],
    ["Follow-up Due", '=COUNTIFS(Leads!Z:Z,"<="&TODAY(),Leads!Z:Z,"<>",Leads!Q:Q,"<>Booked",Leads!Q:Q,"<>Completed",Leads!Q:Q,"<>Lost")']
  ]);
  sheet.getRange("A3:B3").setFontWeight("bold").setBackground("#f1f3f4");
  sheet.getRange("B4:B12").setNumberFormat("0");
  sheet.getRange("B13").setNumberFormat("$#,##0");
  sheet.getRange("B14").setNumberFormat("0");
  sheet.getRange("A16").setValue("Daily workflow");
  sheet.getRange("A17").setValue("Reply to New Lead quickly, send quote, send deposit request, then set Next Follow-up.");
  sheet.setColumnWidth(1, 210);
  sheet.setColumnWidth(2, 150);
}

function setupReplyTemplatesSheet_(sheet) {
  sheet.clear();
  sheet.getRange(1, 1, 8, 3).setValues([
    ["Situation", "English SMS", "Chinese Note"],
    [
      "New lead first reply",
      "Hi {{Name}}, thanks for reaching out to Sizzle Yard Hibachi. We can help with your hibachi party. What city is the party in, what date/time do you prefer, and how many adults/kids?",
      "新客人先确认城市、日期时间、成人小孩人数。"
    ],
    [
      "Date available quote",
      "Hi {{Name}}, your date looks available. For Sizzle Yard Hibachi, adults are $60, kids are $30, with a $600 minimum. A $100 deposit holds the date. Want me to send the deposit link?",
      "只使用已确认价格：成人60，小孩30，最低600，定金100。"
    ],
    [
      "Deposit sent",
      "I just sent the $100 deposit request. Once it is paid, your date/time is locked in and we will confirm the final headcount and menu before the event.",
      "发定金后提醒：付款后才锁定日期时间。"
    ],
    [
      "No reply follow-up",
      "Hi {{Name}}, just checking in. Do you still want to hold {{Event Date}} for your hibachi party? I can help confirm availability and next steps.",
      "没有回复时用，语气轻，不催太重。"
    ],
    [
      "Deposit received / booked",
      "Thanks {{Name}}, we received your deposit. Your Sizzle Yard Hibachi party is booked for {{Event Date}} at {{Time}}. We will confirm details again before the event.",
      "收到定金后确认已预订。"
    ],
    [
      "Date unavailable",
      "Hi {{Name}}, that time may not be available. If your schedule is flexible, send me 1-2 backup times and I will check the closest available option.",
      "日期不确定或满了时，引导客户给备用时间。"
    ],
    [
      "After event review request",
      "Hi {{Name}}, thank you for booking Sizzle Yard Hibachi. If you enjoyed the party, could you leave us a quick Google review? It helps our small business a lot: https://www.google.com/search?q=Sizzle+Yard+Hibachi+%E2%80%93+Hibachi+at+Home+Los+Angeles&ludocid=3950289117609659613#lrd=0x6a564786b5a35abb:0x36d23f05df370cdd,3",
      "活动结束后再发。只给真实客户，不要批量刷评价。"
    ]
  ]);
  sheet.getRange("A1:C1").setFontWeight("bold").setBackground("#f1f3f4");
  sheet.setColumnWidth(1, 180);
  sheet.setColumnWidth(2, 520);
  sheet.setColumnWidth(3, 260);
  sheet.getRange("B:C").setWrap(true);
}
