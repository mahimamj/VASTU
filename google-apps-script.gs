/**
 * Google Apps Script to save form data to Google Sheets
 * 
 * SETUP INSTRUCTIONS:
 * 1. Create a new Google Sheet
 * 2. Go to Extensions > Apps Script
 * 3. Paste this code
 * 4. Replace 'YOUR_SHEET_NAME' with your actual sheet name
 * 5. Deploy as Web App:
 *    - Click Deploy > New Deployment
 *    - Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 *    - Click Deploy
 * 6. Copy the Web App URL and use it in your form submissions
 */

function doPost(e) {
  try {
    // Use the first sheet in the spreadsheet (usually the main sheet)
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getSheets()[0] || spreadsheet.insertSheet('Form Submissions');
    
    // If first row is empty, add headers
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp',
        'Full Name',
        'City',
        'Email',
        'Phone',
        'Date of Birth',
        'Vastu Questions',
        'Payment Method',
        'Amount',
        'Status'
      ]);
    }
    
    // Parse the incoming data
    let data = {};
    if (e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else {
      data = JSON.parse(e.parameter.data || '{}');
    }
    
    const timestamp = new Date();
    
    // Append the row with all the form data
    sheet.appendRow([
      timestamp,
      data.name || '',
      data.city || '',
      data.email || '',
      data.phone || '',
      data.dob || '',
      data.questions || '',
      data.paymentMethod || 'N/A',
      data.amount || '2100',
      data.status || 'Pending'
    ]);
    
    return ContentService
      .createTextOutput(JSON.stringify({success: true, message: 'Data saved successfully'}))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    // Log error for debugging
    Logger.log('Error: ' + error.toString());
    Logger.log('Event data: ' + JSON.stringify(e));
    
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false, 
        error: error.toString(),
        details: error.stack || ''
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService
    .createTextOutput('Vastu Easy Form Handler - POST data here')
    .setMimeType(ContentService.MimeType.TEXT);
}

