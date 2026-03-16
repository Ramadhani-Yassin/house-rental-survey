# Collecting form submissions — step-by-step

Your survey form can send data to **Formspree** (easiest) or **Google Sheets**. Follow one of the two options below.

---

## Option A: Formspree (recommended, ~2 minutes)

### What you need
- An email address (to receive submissions or log in).
- No server or coding beyond the one change below.

### Steps

1. **Sign up**
   - Go to [https://formspree.io](https://formspree.io).
   - Click **Get Started** and create a free account (or use Google/GitHub).

2. **Create a form**
   - In the dashboard, click **+ New Form**.
   - Give it a name (e.g. “House Rental Survey Tanzania”).
   - Copy the **form endpoint** (looks like `https://formspree.io/f/xxxxxxxx`).

3. **Connect your survey**
   - Open `form/script.js` in your project.
   - Find the line:  
     `var SUBMIT_ENDPOINT = '';`
   - Paste your endpoint between the quotes:  
     `var SUBMIT_ENDPOINT = 'https://formspree.io/f/xxxxxxxx';`  
     (use your real ID instead of `xxxxxxxx`.)

4. **Test**
   - Open your survey in the browser, fill it out, and submit.
   - You should see the thank-you message, and the submission in your Formspree dashboard (and optionally in your email if you turned that on).

### Formspree free tier
- 50 submissions per month on the free plan.
- Submissions are stored in the Formspree dashboard; you can export or forward to email.

---

## Option B: Google Sheets

### What you need
- A Google account.
- One Google Sheet to store responses.

### Steps

1. **Create a Google Sheet**
   - Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet.
   - Name it (e.g. “House Rental Survey Responses”).
   - In the first row, add headers that match your form fields (e.g. `name`, `age`, `location`, `gender`, `respondent_type`, etc.). You can add more columns later; the script will append whatever keys are in the payload.

2. **Add the script**
   - In the sheet: **Extensions → Apps Script**.
   - Delete any sample code and paste the script below.
   - Replace `SHEET_NAME` with the exact name of your sheet tab (usually “Sheet1” if you didn’t rename it).

```javascript
// Handles missing e.postData (use e.parameter.data when form sends as form-encoded)
function doPost(e) {
  var raw = null;
  if (e && e.postData && e.postData.contents) raw = e.postData.contents;
  else if (e && e.parameter && e.parameter.data) raw = decodeURIComponent(e.parameter.data);
  if (!raw) return ContentService.createTextOutput(JSON.stringify({ error: 'No data' })).setMimeType(ContentService.MimeType.JSON);
  var data;
  try { data = JSON.parse(raw); } catch (err) { return ContentService.createTextOutput(JSON.stringify({ error: 'Invalid JSON' })).setMimeType(ContentService.MimeType.JSON); }
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');
  if (!sheet) return ContentService.createTextOutput(JSON.stringify({ error: 'Sheet not found' })).setMimeType(ContentService.MimeType.JSON);
  var headers = sheet.getLastRow() === 0 ? [] : sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  var allKeys = []; for (var k in data) { if (data.hasOwnProperty(k) && allKeys.indexOf(k) === -1) allKeys.push(k); }
  allKeys.sort();
  if (headers.length === 0) { sheet.getRange(1, 1, 1, allKeys.length).setValues([allKeys]); headers = allKeys; }
  var row = [];
  for (var i = 0; i < headers.length; i++) { var val = data[headers[i]]; if (Array.isArray(val)) val = val.join(', '); row.push(val !== undefined && val !== null ? val : ''); }
  for (var j = 0; j < allKeys.length; j++) {
    if (headers.indexOf(allKeys[j]) === -1) { headers.push(allKeys[j]); var v = data[allKeys[j]]; if (Array.isArray(v)) v = v.join(', '); row.push(v !== undefined && v !== null ? v : ''); }
  }
  if (row.length < headers.length) for (var n = row.length; n < headers.length; n++) row.push('');
  sheet.appendRow(row);
  return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
}
```

3. **Deploy as web app**
   - In Apps Script: **Deploy → New deployment**.
   - Click the gear next to “Select type” and choose **Web app**.
   - Description: e.g. “Survey submit”.
   - **Execute as:** Me (your Google account).
   - **Who has access:** Anyone (so the form on the internet can POST to it).
   - Click **Deploy**, then **Authorize access** and complete the Google login.
   - Copy the **Web app URL** (looks like `https://script.google.com/macros/s/xxxxx/exec`).

4. **Connect your survey**
   - Open `form/script.js`.
   - Set:  
     `var SUBMIT_ENDPOINT = 'https://script.google.com/macros/s/xxxxx/exec';`  
     (use your real URL.)

5. **Test**
   - Submit a response from your survey; a new row should appear in the Google Sheet.

---

## If you leave `SUBMIT_ENDPOINT` empty

- The form still works: it builds the payload, logs it to the browser console, and shows the thank-you message.
- No data is sent anywhere. Useful for local testing.

---

## Summary

| Step | Formspree | Google Sheets |
|------|-----------|----------------|
| 1 | Sign up at formspree.io | Create a Google Sheet |
| 2 | Create a form, copy endpoint | Add Apps Script, paste script, set sheet name |
| 3 | In `script.js`: set `SUBMIT_ENDPOINT` to Formspree URL | Deploy as web app (Anyone), copy URL |
| 4 | In `script.js`: set `SUBMIT_ENDPOINT` to Web app URL | — |
| 5 | Submit a test response | Submit a test response |

Only one endpoint is used at a time: either your Formspree URL or your Google Sheets web app URL.
