// ============================================================
// Google Apps Script — Paste this in your Apps Script editor
// ============================================================

function doPost(e) {
  const output = ContentService.createTextOutput();
  output.setMimeType(ContentService.MimeType.JSON);

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

    // 1. Save to sheet
    sheet.appendRow([date, name, email, subject, service, message]);

    // 2. User confirmation email
    try {
      sendUserEmail(name, email, subject);
    } catch(err) {
      Logger.log('USER EMAIL ERROR: ' + err.message);
    }

    // 3. Admin notification email
    try {
      sendAdminEmail(name, email, subject, service, message, date);
    } catch(err) {
      Logger.log('ADMIN EMAIL ERROR: ' + err.message);
    }

    output.setContent(JSON.stringify({ status: 'success' }));

  } catch (err) {
    Logger.log('DOPOST ERROR: ' + err.message);
    output.setContent(JSON.stringify({ status: 'error', message: err.message }));
  }

  return output;
}

function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}

// ─── User Confirmation Email ────────────────────────────────
function sendUserEmail(name, email, subject) {
  const year = new Date().getFullYear();

  const body =
    '<!DOCTYPE html><html><head><meta charset="utf-8"></head>' +
    '<body style="margin:0;padding:0;background:#f4f4f8;font-family:Arial,sans-serif;">' +
    '<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f8;padding:32px 0;">' +
    '<tr><td align="center">' +
    '<table width="580" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;">' +

    // Header
    '<tr><td style="background:linear-gradient(135deg,#6366f1,#8b5cf6);padding:36px 40px;text-align:center;">' +
    '<div style="font-size:26px;font-weight:700;color:#ffffff;margin-bottom:4px;">Rizwan Arshad</div>' +
    '<div style="color:rgba(255,255,255,0.80);font-size:12px;letter-spacing:2px;text-transform:uppercase;">Software Engineer</div>' +
    '</td></tr>' +

    // Checkmark
    '<tr><td align="center" style="padding:32px 40px 0;">' +
    '<table cellpadding="0" cellspacing="0"><tr>' +
    '<td align="center" width="64" height="64" style="background:linear-gradient(135deg,#6366f1,#8b5cf6);border-radius:50%;">' +
    '<div style="color:#fff;font-size:28px;line-height:64px;text-align:center;">&#10003;</div>' +
    '</td></tr></table>' +
    '</td></tr>' +

    // Body
    '<tr><td style="padding:24px 48px 36px;text-align:center;">' +
    '<h2 style="color:#1f2937;font-size:20px;font-weight:700;margin:0 0 12px;">Message Sent Successfully!</h2>' +
    '<p style="color:#6b7280;font-size:15px;line-height:1.7;margin:0 0 10px;">Hi <strong style="color:#1f2937;">' + name + '</strong>, thank you for reaching out.</p>' +
    '<p style="color:#6b7280;font-size:15px;line-height:1.7;margin:0 0 28px;">Your message about <strong style="color:#1f2937;">' + subject + '</strong> has been received. I will personally respond within <strong style="color:#6366f1;">24 hours</strong>.</p>' +
    '<a href="mailto:rizwanarshad.se.official@gmail.com" style="display:inline-block;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#ffffff;text-decoration:none;padding:12px 32px;border-radius:8px;font-size:14px;font-weight:600;">Contact Directly</a>' +
    '</td></tr>' +

    // Divider
    '<tr><td style="padding:0 40px;"><hr style="border:none;border-top:1px solid #e5e7eb;"></td></tr>' +

    // Social
    '<tr><td style="padding:18px 40px;text-align:center;">' +
    '<a href="https://www.linkedin.com/in/c%D4%8B-r%CE%B9%C8%A5%C9%AF%CE%B1%C9%B3-a%C9%BE%CA%82%D4%8B%CE%B1%D4%83-0a024a366/" style="color:#6366f1;text-decoration:none;font-size:13px;margin:0 8px;">LinkedIn</a>' +
    '<span style="color:#d1d5db;">|</span>' +
    '<a href="https://github.com/RizwanTheDev" style="color:#6366f1;text-decoration:none;font-size:13px;margin:0 8px;">GitHub</a>' +
    '<span style="color:#d1d5db;">|</span>' +
    '<a href="mailto:rizwanarshad.se.official@gmail.com" style="color:#6366f1;text-decoration:none;font-size:13px;margin:0 8px;">Email</a>' +
    '</td></tr>' +

    // Footer
    '<tr><td style="background:#f8f7ff;padding:14px 40px;text-align:center;border-top:1px solid #e5e7eb;">' +
    '<p style="color:#9ca3af;font-size:11px;margin:0;">&copy; ' + year + ' Rizwan Arshad &middot; Lahore, Pakistan<br>This is an automated confirmation &mdash; please do not reply.</p>' +
    '</td></tr>' +

    '</table></td></tr></table></body></html>';

  MailApp.sendEmail({
    to: email,
    subject: 'Message Received - I\'ll respond within 24 hours | Rizwan Arshad',
    htmlBody: body,
    noReply: true
  });
}

// ─── Admin Notification Email ───────────────────────────────
function sendAdminEmail(name, email, subject, service, message, date) {

  const body =
    '<!DOCTYPE html><html><head><meta charset="utf-8"></head>' +
    '<body style="margin:0;padding:0;background:#f4f4f8;font-family:Arial,sans-serif;">' +
    '<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f8;padding:32px 0;">' +
    '<tr><td align="center">' +
    '<table width="580" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;">' +

    // Header
    '<tr><td style="background:linear-gradient(135deg,#1f2937,#374151);padding:28px 40px;text-align:center;">' +
    '<div style="font-size:11px;color:rgba(255,255,255,0.5);letter-spacing:2px;text-transform:uppercase;margin-bottom:6px;">Portfolio Alert</div>' +
    '<div style="font-size:20px;font-weight:700;color:#ffffff;">New Contact Form Submission</div>' +
    '</td></tr>' +

    // Badge
    '<tr><td align="center" style="padding:24px 40px 0;">' +
    '<div style="display:inline-block;background:#fef3c7;border:1px solid #fcd34d;color:#92400e;font-size:12px;font-weight:700;padding:6px 18px;border-radius:20px;">Action Required &mdash; Reply within 24 hours</div>' +
    '</td></tr>' +

    // Sender details
    '<tr><td style="padding:20px 40px 0;">' +
    '<table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f7ff;border-radius:10px;border:1px solid #e5e7eb;">' +
    '<tr><td style="padding:18px 22px;">' +
    '<div style="font-size:11px;font-weight:700;color:#6366f1;text-transform:uppercase;letter-spacing:1px;margin-bottom:14px;">Sender Details</div>' +
    '<table width="100%" cellpadding="0" cellspacing="0">' +
    '<tr><td style="padding:6px 0;color:#6b7280;font-size:13px;width:80px;">Name</td><td style="padding:6px 0;color:#1f2937;font-size:13px;font-weight:600;">' + name + '</td></tr>' +
    '<tr><td style="padding:6px 0;color:#6b7280;font-size:13px;">Email</td><td style="padding:6px 0;font-size:13px;"><a href="mailto:' + email + '" style="color:#6366f1;font-weight:600;text-decoration:none;">' + email + '</a></td></tr>' +
    '<tr><td style="padding:6px 0;color:#6b7280;font-size:13px;">Service</td><td style="padding:6px 0;color:#1f2937;font-size:13px;font-weight:600;">' + service + '</td></tr>' +
    '<tr><td style="padding:6px 0;color:#6b7280;font-size:13px;">Subject</td><td style="padding:6px 0;color:#1f2937;font-size:13px;font-weight:600;">' + subject + '</td></tr>' +
    '<tr><td style="padding:6px 0;color:#6b7280;font-size:13px;">Time</td><td style="padding:6px 0;color:#1f2937;font-size:13px;">' + date + '</td></tr>' +
    '</table></td></tr></table></td></tr>' +

    // Message
    '<tr><td style="padding:14px 40px 0;">' +
    '<table width="100%" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:10px;border:1px solid #e5e7eb;">' +
    '<tr><td style="padding:18px 22px;">' +
    '<div style="font-size:11px;font-weight:700;color:#6366f1;text-transform:uppercase;letter-spacing:1px;margin-bottom:10px;">Message</div>' +
    '<p style="color:#374151;font-size:14px;line-height:1.75;margin:0;white-space:pre-wrap;">' + message + '</p>' +
    '</td></tr></table></td></tr>' +

    // CTA
    '<tr><td style="padding:24px 40px 28px;text-align:center;">' +
    '<a href="mailto:' + email + '?subject=Re: ' + subject + '" style="display:inline-block;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#ffffff;text-decoration:none;padding:12px 32px;border-radius:8px;font-size:14px;font-weight:600;">Reply to ' + name + '</a>' +
    '</td></tr>' +

    // Footer
    '<tr><td style="background:#f8f7ff;padding:14px 40px;text-align:center;border-top:1px solid #e5e7eb;">' +
    '<p style="color:#9ca3af;font-size:11px;margin:0;">Sent from your portfolio contact form &middot; rizwanarshad.se.official@gmail.com</p>' +
    '</td></tr>' +

    '</table></td></tr></table></body></html>';

  MailApp.sendEmail({
    to: 'rizwanarshad.se.official@gmail.com',
    subject: 'New Message from ' + name + ' - ' + subject,
    htmlBody: body,
    replyTo: email
  });
}
