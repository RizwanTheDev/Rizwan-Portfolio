// ============================================================
// Google Apps Script — Paste this in your Apps Script editor
// ============================================================

function doPost(e) {
  try {
    const sheet = SpreadsheetApp
      .openById('14CF2FLEvytIWYIkkQrl8grZxMvRVwuCD2wjFJi4UDRc')
      .getActiveSheet();

    const name    = e.parameter.name    || '';
    const email   = e.parameter.email   || '';
    const subject = e.parameter.subject || '';
    const service = e.parameter.service || 'Not specified';
    const message = e.parameter.message || '';
    const date    = new Date().toLocaleString('en-PK', { timeZone: 'Asia/Karachi' });

    // Save to Google Sheet
    sheet.appendRow([date, name, email, subject, service, message]);

    // Send auto-reply to user
    try { sendAutoReply(name, email, subject); } catch(err) {}

    // Notify admin
    try { sendAdminNotification(name, email, subject, service, message, date); } catch(err) {}

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ─── User Confirmation Email ────────────────────────────────
function sendAutoReply(name, email, subject) {
  const year = new Date().getFullYear();

  const htmlBody =
    '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>' +
    '<body style="margin:0;padding:0;background:#f4f4f8;font-family:\'Segoe UI\',Arial,sans-serif;">' +
    '<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f8;padding:40px 0;">' +
    '<tr><td align="center">' +
    '<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(99,102,241,0.10);">' +

    // Header
    '<tr><td style="background:linear-gradient(135deg,#6366f1,#8b5cf6);padding:40px;text-align:center;">' +
    '<div style="font-size:30px;font-weight:700;color:#fff;letter-spacing:1px;margin-bottom:6px;">R&#953;&#541;&#623;&#945;&#643;</div>' +
    '<div style="color:rgba(255,255,255,0.80);font-size:13px;letter-spacing:2px;text-transform:uppercase;">Software Engineer</div>' +
    '</td></tr>' +

    // Checkmark icon
    '<tr><td align="center" style="padding:36px 40px 0;">' +
    '<table cellpadding="0" cellspacing="0"><tr>' +
    '<td align="center" style="width:68px;height:68px;background:linear-gradient(135deg,#6366f1,#8b5cf6);border-radius:50%;">' +
    '<span style="color:#fff;font-size:32px;line-height:68px;">&#10003;</span>' +
    '</td></tr></table></td></tr>' +

    // Body
    '<tr><td style="padding:24px 48px 36px;text-align:center;">' +
    '<h2 style="color:#1f2937;font-size:22px;font-weight:700;margin:0 0 12px;">Message Sent Successfully!</h2>' +
    '<p style="color:#6b7280;font-size:15px;line-height:1.75;margin:0 0 8px;">Hi <strong style="color:#1f2937;">' + name + '</strong>, thank you for reaching out.</p>' +
    '<p style="color:#6b7280;font-size:15px;line-height:1.75;margin:0 0 28px;">I have received your message regarding <strong style="color:#1f2937;">' + subject + '</strong> and will personally get back to you within <strong style="color:#6366f1;">24 hours</strong>.</p>' +
    '<a href="mailto:rizwanarshad.se.official@gmail.com" style="display:inline-block;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;text-decoration:none;padding:13px 36px;border-radius:8px;font-size:14px;font-weight:600;">Contact Directly</a>' +
    '</td></tr>' +

    // Divider
    '<tr><td style="padding:0 40px;"><hr style="border:none;border-top:1px solid #e5e7eb;"></td></tr>' +

    // Social links
    '<tr><td style="padding:20px 40px;text-align:center;">' +
    '<a href="https://www.linkedin.com/in/c%D4%8B-r%CE%B9%C8%A5%C9%AF%CE%B1%C9%B3-a%C9%BE%CA%82%D4%8B%CE%B1%D4%83-0a024a366/" style="color:#6366f1;text-decoration:none;font-size:13px;font-weight:500;margin:0 8px;">LinkedIn</a>' +
    '<span style="color:#d1d5db;">|</span>' +
    '<a href="https://github.com" style="color:#6366f1;text-decoration:none;font-size:13px;font-weight:500;margin:0 8px;">GitHub</a>' +
    '<span style="color:#d1d5db;">|</span>' +
    '<a href="mailto:rizwanarshad.se.official@gmail.com" style="color:#6366f1;text-decoration:none;font-size:13px;font-weight:500;margin:0 8px;">Email</a>' +
    '</td></tr>' +

    // Footer
    '<tr><td style="background:#f8f7ff;padding:16px 40px;text-align:center;border-top:1px solid #e5e7eb;">' +
    '<p style="color:#9ca3af;font-size:12px;margin:0;">&copy; ' + year + ' Rizwan Arshad &middot; Lahore, Pakistan<br>' +
    'This is an automated confirmation &mdash; please do not reply to this email.</p>' +
    '</td></tr>' +

    '</table></td></tr></table></body></html>';

  MailApp.sendEmail({
    to: email,
    subject: '\u2705 Message Received \u2014 I\'ll respond within 24 hours | Rizwan Arshad',
    htmlBody: htmlBody
  });
}

// ─── Admin Notification Email ───────────────────────────────
function sendAdminNotification(name, email, subject, service, message, date) {

  const htmlBody =
    '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>' +
    '<body style="margin:0;padding:0;background:#f4f4f8;font-family:\'Segoe UI\',Arial,sans-serif;">' +
    '<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f8;padding:40px 0;">' +
    '<tr><td align="center">' +
    '<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(99,102,241,0.10);">' +

    // Header
    '<tr><td style="background:linear-gradient(135deg,#1f2937,#374151);padding:32px 40px;text-align:center;">' +
    '<div style="font-size:12px;color:rgba(255,255,255,0.55);letter-spacing:2px;text-transform:uppercase;margin-bottom:8px;">Portfolio Notification</div>' +
    '<div style="font-size:22px;font-weight:700;color:#fff;">&#128236; New Message Received</div>' +
    '</td></tr>' +

    // Alert badge
    '<tr><td align="center" style="padding:28px 40px 0;">' +
    '<div style="display:inline-block;background:#fef3c7;border:1px solid #fcd34d;color:#92400e;font-size:13px;font-weight:600;padding:7px 20px;border-radius:20px;">&#9889; Action Required &mdash; Reply within 24 hours</div>' +
    '</td></tr>' +

    // Sender details card
    '<tr><td style="padding:24px 40px 0;">' +
    '<table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f7ff;border-radius:12px;border:1px solid #e5e7eb;">' +
    '<tr><td style="padding:20px 24px;">' +
    '<div style="font-size:12px;font-weight:700;color:#6366f1;text-transform:uppercase;letter-spacing:1px;margin-bottom:16px;">Sender Details</div>' +
    '<table width="100%" cellpadding="0" cellspacing="0">' +
    '<tr><td style="padding:7px 0;color:#6b7280;font-size:13px;width:90px;">Name</td><td style="padding:7px 0;color:#1f2937;font-size:13px;font-weight:600;">' + name + '</td></tr>' +
    '<tr><td style="padding:7px 0;color:#6b7280;font-size:13px;">Email</td><td style="padding:7px 0;font-size:13px;"><a href="mailto:' + email + '" style="color:#6366f1;font-weight:600;text-decoration:none;">' + email + '</a></td></tr>' +
    '<tr><td style="padding:7px 0;color:#6b7280;font-size:13px;">Service</td><td style="padding:7px 0;color:#1f2937;font-size:13px;font-weight:600;">' + service + '</td></tr>' +
    '<tr><td style="padding:7px 0;color:#6b7280;font-size:13px;">Subject</td><td style="padding:7px 0;color:#1f2937;font-size:13px;font-weight:600;">' + subject + '</td></tr>' +
    '<tr><td style="padding:7px 0;color:#6b7280;font-size:13px;">Received</td><td style="padding:7px 0;color:#1f2937;font-size:13px;">' + date + '</td></tr>' +
    '</table></td></tr></table></td></tr>' +

    // Message body card
    '<tr><td style="padding:16px 40px 0;">' +
    '<table width="100%" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;border:1px solid #e5e7eb;">' +
    '<tr><td style="padding:20px 24px;">' +
    '<div style="font-size:12px;font-weight:700;color:#6366f1;text-transform:uppercase;letter-spacing:1px;margin-bottom:12px;">Message</div>' +
    '<p style="color:#374151;font-size:14px;line-height:1.75;margin:0;white-space:pre-wrap;">' + message + '</p>' +
    '</td></tr></table></td></tr>' +

    // CTA button
    '<tr><td style="padding:28px 40px 32px;text-align:center;">' +
    '<a href="mailto:' + email + '?subject=Re: ' + subject + '" style="display:inline-block;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;text-decoration:none;padding:13px 36px;border-radius:8px;font-size:14px;font-weight:600;letter-spacing:0.5px;">Reply to ' + name + '</a>' +
    '</td></tr>' +

    // Footer
    '<tr><td style="background:#f8f7ff;padding:16px 40px;text-align:center;border-top:1px solid #e5e7eb;">' +
    '<p style="color:#9ca3af;font-size:12px;margin:0;">Sent from your portfolio contact form &middot; rizwanarshad.se.official@gmail.com</p>' +
    '</td></tr>' +

    '</table></td></tr></table></body></html>';

  MailApp.sendEmail({
    to: 'rizwanarshad.se.official@gmail.com',
    subject: '\uD83D\uDCEC New Message from ' + name + ' \u2014 ' + subject,
    htmlBody: htmlBody,
    replyTo: email
  });
}
