/**
 * CV REQUEST NOTIFICATION SYSTEM
 * Admin gets beautiful notification email (NO buttons - just info)
 * 
 * SETUP:
 * 1. Create Google Sheet
 * 2. Extensions → Apps Script
 * 3. Paste this code
 * 4. Run setupSheet()
 * 5. Deploy as Web App
 */

const ADMIN_EMAIL = 'rizwanarshad.se.official@gmail.com';

function doPost(e) {
  try {
    const name = e.parameter.name || '';
    const email = e.parameter.email || '';
    const company = e.parameter.company || '';
    const purpose = e.parameter.purpose || '';
    
    if (!name || !email || !purpose) return ContentService.createTextOutput('ERROR');
    
    const sheet = getSheet();
    const timestamp = new Date();
    const requestId = 'REQ' + timestamp.getTime().toString().slice(-8);
    
    sheet.appendRow([
      Utilities.formatDate(timestamp, Session.getScriptTimeZone(), 'yyyy-MM-dd HH:mm:ss'),
      requestId, name, email, company, purpose, 'New Request', ''
    ]);
    
    sendAdminNotification(requestId, name, email, company, purpose, timestamp);
    sendUserConfirmation(name, email);
    
    return ContentService.createTextOutput('SUCCESS');
  } catch (error) {
    Logger.log('Error: ' + error);
    return ContentService.createTextOutput('ERROR');
  }
}

function doGet(e) {
  return HtmlService.createHtmlOutput('<h1>CV Request System Active</h1>');
}

function sendAdminNotification(id, name, email, company, purpose, timestamp) {
  const timeStr = Utilities.formatDate(timestamp, Session.getScriptTimeZone(), 'MMM dd, yyyy - hh:mm a');
  
  MailApp.sendEmail({
    to: ADMIN_EMAIL,
    subject: '📬 New CV Request from ' + name + (company ? ' @ ' + company : ''),
    htmlBody: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width,initial-scale=1">
      </head>
      <body style="margin:0;padding:0;background:#f5f7fa;font-family:'Segoe UI',Arial,sans-serif">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f7fa;padding:40px 20px">
          <tr>
            <td align="center">
              <table width="100%" cellpadding="0" cellspacing="0" style="max-width:650px;background:white;border-radius:16px;box-shadow:0 8px 30px rgba(0,0,0,0.12);overflow:hidden">
                
                <tr>
                  <td style="background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);padding:50px 40px;text-align:center">
                    <div style="width:100px;height:100px;background:rgba(255,255,255,0.15);border-radius:50%;display:inline-flex;align-items:center;justify-content:center;margin-bottom:20px">
                      <span style="font-size:50px">📬</span>
                    </div>
                    <h1 style="margin:0;color:white;font-size:32px;font-weight:700">New CV Request</h1>
                    <p style="margin:15px 0 0;color:rgba(255,255,255,0.95);font-size:18px">From ${name}</p>
                  </td>
                </tr>
                
                <tr>
                  <td style="padding:45px 40px">
                    
                    <table width="100%" cellpadding="0" cellspacing="0" style="background:linear-gradient(135deg,#f8f9ff 0%,#f0f4ff 100%);border:2px solid #e0e7ff;border-radius:12px;margin-bottom:30px">
                      <tr>
                        <td style="padding:30px">
                          <h2 style="margin:0 0 25px;color:#1e293b;font-size:20px">Request Details</h2>
                          
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="padding:15px 0;border-bottom:1px solid #e0e7ff">
                                <table width="100%" cellpadding="0" cellspacing="0">
                                  <tr>
                                    <td width="140"><span style="color:#667eea;font-weight:600">👤 Name</span></td>
                                    <td style="color:#1e293b">${name}</td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                            
                            <tr>
                              <td style="padding:15px 0;border-bottom:1px solid #e0e7ff">
                                <table width="100%" cellpadding="0" cellspacing="0">
                                  <tr>
                                    <td width="140"><span style="color:#667eea;font-weight:600">✉️ Email</span></td>
                                    <td><a href="mailto:${email}" style="color:#667eea">${email}</a></td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                            
                            <tr>
                              <td style="padding:15px 0;border-bottom:1px solid #e0e7ff">
                                <table width="100%" cellpadding="0" cellspacing="0">
                                  <tr>
                                    <td width="140"><span style="color:#667eea;font-weight:600">🏢 Company</span></td>
                                    <td style="color:#1e293b">${company || 'Not provided'}</td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                            
                            <tr>
                              <td style="padding:15px 0">
                                <table width="100%" cellpadding="0" cellspacing="0">
                                  <tr>
                                    <td width="140" style="vertical-align:top"><span style="color:#667eea;font-weight:600">💬 Purpose</span></td>
                                    <td style="color:#1e293b">${purpose}</td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                    
                    <table width="100%" cellpadding="0" cellspacing="0" style="background:#fefce8;border:2px solid #fde047;border-radius:12px;margin-bottom:30px">
                      <tr>
                        <td style="padding:25px;text-align:center">
                          <p style="margin:0 0 15px;color:#854d0e;font-weight:600">📋 Quick Actions</p>
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="padding:8px">
                              // cv link attached on this below on center
                                <a href="mailto:${email}?subject=Re%3A%20CV%20Request&body=Hello%2C%0A%0AThank%20you%20for%20your%20interest.%20As%20requested%2C%20I%20am%20sharing%20my%20CV%20for%20your%20review.%20Please%20let%20me%20know%20if%20you%20need%20any%20additional%20information.%0A%0ACV%20Link%3A%20https%3A%2F%2Fdrive.google.com%2Ffile%2Fd%2F1r7x0Vwx1b9WBbkgYF-6N435waLptPGok%2Fview%3Fusp%3Dsharing%0A%0ABest%20regards%2C%0ARizwan%20Arshad"
                                style="display:block;background:white;color:#854d0e;padding:14px 20px;text-decoration:none;border-radius:8px;font-weight:600;border:2px solid #fde047">
                                📧 Reply via Email
                                </a>
                              </td>
                              <td style="padding:8px">
                                <a href="https://docs.google.com/spreadsheets" style="display:block;background:white;color:#854d0e;padding:14px 20px;text-decoration:none;border-radius:8px;font-weight:600;border:2px solid #fde047">
                                  📊 View in Sheet
                                </a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                    
                    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;border-radius:10px">
                      <tr>
                        <td style="padding:20px">
                          <p style="color:#64748b;font-size:13px;margin:5px 0"><strong>Request ID:</strong> ${id}</p>
                          <p style="color:#64748b;font-size:13px;margin:5px 0"><strong>Received:</strong> ${timeStr}</p>
                          <p style="color:#64748b;font-size:13px;margin:5px 0"><strong>Status:</strong> <span style="background:#10b981;color:white;padding:3px 10px;border-radius:12px;font-size:12px">New Request</span></p>
                        </td>
                      </tr>
                    </table>
                    
                  </td>
                </tr>
                
                <tr>
                  <td style="background:#f8fafc;padding:30px;text-align:center;border-top:1px solid #e2e8f0">
                    <p style="margin:0;color:#64748b;font-size:13px">CV Request System • ${timeStr}</p>
                  </td>
                </tr>
                
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `
  });
}

function sendUserConfirmation(name, email) {
  MailApp.sendEmail({
    to: email,
    subject: '✅ CV Request Received - Rizwan Arshad',
    htmlBody: `
      <!DOCTYPE html>
      <html>
      <body style="margin:0;padding:0;background:#f5f7fa;font-family:Arial">
        <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f7fa;padding:40px 20px">
          <tr>
            <td align="center">
              <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:white;border-radius:16px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08)">
                
                <tr>
                  <td style="background:linear-gradient(135deg,#10b981,#059669);padding:40px;text-align:center">
                    <div style="font-size:60px;margin-bottom:15px">✅</div>
                    <h1 style="margin:0;color:white;font-size:28px">Request Received!</h1>
                  </td>
                </tr>
                
                <tr>
                  <td style="padding:40px">
                    <p style="font-size:17px;color:#1e293b">Hi <strong>${name}</strong>,</p>
                    <p style="color:#64748b;line-height:1.7">Thank you for requesting my CV! I'll review it personally and respond within 24 hours.</p>
                    
                    <table width="100%" cellpadding="0" cellspacing="0" style="background:#ecfdf5;border-left:4px solid #10b981;border-radius:8px;margin:25px 0">
                      <tr>
                        <td style="padding:20px">
                          <p style="margin:0 0 12px;color:#065f46;font-weight:600">📋 What's Next?</p>
                          <ul style="color:#047857;margin:0;padding-left:20px">
                            <li>Personal review of your request</li>
                            <li>CV sent via email if approved</li>
                            <li>Response within 24 hours</li>
                          </ul>
                        </td>
                      </tr>
                    </table>
                    
                    <p style="color:#64748b">Portfolio: <a href="https://rizwanthedev.github.io/Rizwan-Portfolio/" style="color:#667eea">View my work</a></p>
                    
                    <table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #e2e8f0;margin-top:30px;padding-top:20px">
                      <tr>
                        <td>
                          <p style="margin:0 0 5px;font-weight:600">Best regards,</p>
                          <p style="margin:0;color:#667eea;font-weight:700;font-size:18px">Rizwan Arshad</p>
                          <p style="margin:5px 0 0;color:#64748b;font-size:14px">Software Engineer</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                
              </table>
            </td>
          </tr>
        </table>
      </body>
      </html>
    `
  });
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('CV Requests');
  if (!sheet) {
    sheet = ss.insertSheet('CV Requests');
    sheet.appendRow(['Timestamp','Request ID','Name','Email','Company','Purpose','Status','Notes']);
    const header = sheet.getRange(1,1,1,8);
    header.setFontWeight('bold').setBackground('#667eea').setFontColor('#ffffff').setHorizontalAlignment('center');
    sheet.setColumnWidth(1,150);
    sheet.setColumnWidth(2,120);
    sheet.setColumnWidth(3,150);
    sheet.setColumnWidth(4,200);
    sheet.setColumnWidth(5,150);
    sheet.setColumnWidth(6,300);
    sheet.setColumnWidth(7,120);
    sheet.setColumnWidth(8,200);
  }
  return sheet;
}

function setupSheet() {
  getSheet();
  Browser.msgBox('Setup Complete!', 'Sheet created. Deploy as Web App now.', Browser.Buttons.OK);
}

function testEmail() {
  sendAdminNotification('TEST123','John Doe','john@example.com','Acme Corp','Testing the CV request notification system',new Date());
  Browser.msgBox('Test Sent!', 'Check ' + ADMIN_EMAIL + ' for beautiful notification email', Browser.Buttons.OK);
}