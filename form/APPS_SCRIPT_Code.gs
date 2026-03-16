/**
 * Paste this entire file into your Google Apps Script editor (Extensions → Apps Script).
 * 1. Set the sheet tab name below (getSheetByName('Sheet1')) to match your tab.
 * 2. Save, then Deploy → Manage deployments → Edit → Version → New version → Deploy.
 */

function doPost(e) {
  // Avoid "Cannot read properties of undefined (reading 'postData')" when body is missing
  var raw = null;
  if (e && e.postData && e.postData.contents) {
    raw = e.postData.contents;
  } else if (e && e.parameter && e.parameter.data) {
    raw = decodeURIComponent(e.parameter.data);
  }
  if (!raw) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: 'No data received' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  var data;
  try {
    data = JSON.parse(raw);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: 'Invalid JSON' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');
  if (!sheet) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: 'Sheet not found' }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  var headers = sheet.getLastRow() === 0
    ? []
    : sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

  var allKeys = [];
  for (var k in data) {
    if (data.hasOwnProperty(k) && allKeys.indexOf(k) === -1) allKeys.push(k);
  }
  allKeys.sort();

  if (headers.length === 0) {
    sheet.getRange(1, 1, 1, allKeys.length).setValues([allKeys]);
    headers = allKeys;
  }

  var row = [];
  for (var i = 0; i < headers.length; i++) {
    var val = data[headers[i]];
    if (Array.isArray(val)) val = val.join(', ');
    row.push(val !== undefined && val !== null ? val : '');
  }

  for (var j = 0; j < allKeys.length; j++) {
    if (headers.indexOf(allKeys[j]) === -1) {
      headers.push(allKeys[j]);
      var v = data[allKeys[j]];
      if (Array.isArray(v)) v = v.join(', ');
      row.push(v !== undefined && v !== null ? v : '');
    }
  }

  if (row.length < headers.length) {
    for (var n = row.length; n < headers.length; n++) row.push('');
  }

  sheet.appendRow(row);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
