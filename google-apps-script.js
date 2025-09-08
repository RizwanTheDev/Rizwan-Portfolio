function doPost(e) {
  try {
    const sheet = SpreadsheetApp.openById('1LGTYuRLUNRhCRHTBQEyiMFz620GWlFGWgLDZgVUlvAA').getActiveSheet();
    const params = e.parameter;
    
    sheet.appendRow([
      new Date(),
      params.name || '',
      params.email || '',
      params.subject || '',
      params.service || 'Not specified',
      params.message || ''
    ]);
    
    return ContentService.createTextOutput('Success');
  } catch (error) {
    return ContentService.createTextOutput('Error: ' + error.toString());
  }
}

function doGet() {
  return ContentService.createTextOutput('GET method not allowed');
}