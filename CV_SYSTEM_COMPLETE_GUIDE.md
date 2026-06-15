# 📋 CV REQUEST SYSTEM - COMPLETE DOCUMENTATION

## 🎯 SYSTEM OVERVIEW

This is a professional CV request system where:
- Users request CV access via a modal form
- Admin gets beautiful email notification
- Admin replies via Gmail with pre-filled message + CV link
- All requests tracked in Google Sheet

---

## 📁 PROJECT FILES

### Frontend Files (Website):
```
assets/
├── js/
│   └── cv-admin-system.js          ✅ Modal form & submission
├── css/
│   └── cv-admin-system.css         ✅ Professional modal styling
```

### Backend File (Google Apps Script):
```
NOTIFICATION_ONLY_SCRIPT.js          ✅ Email notifications + Sheet logging
```

### Updated Pages:
```
resume.html                          ✅ Includes CV request button
```

---

## ⚡ COMPLETE SETUP GUIDE

### STEP 1: Google Sheets Setup

1. Go to: **https://sheets.google.com**
2. Create **Blank** spreadsheet
3. Name it: **"CV Request System"**
4. Keep tab open

---

### STEP 2: Google Apps Script Setup

1. In your Google Sheet: **Extensions** → **Apps Script**
2. Delete all existing code
3. Open: **`NOTIFICATION_ONLY_SCRIPT.js`**
4. Copy ALL code
5. Paste into Apps Script editor
6. **Save** (Ctrl+S) - Name: "CV Admin System"

---

### STEP 3: Grant Permissions

1. Function dropdown → Select **`setupSheet`**
2. Click **Run** ▶️
3. Popup: "Authorization required" → Click **"Review permissions"**
4. Choose account: **rizwanarshad.se.official@gmail.com**
5. Click **"Advanced"** (bottom left)
6. Click **"Go to CV Admin System (unsafe)"**
7. Click **"Allow"**
8. Wait for popup: **"Setup Complete!"**
9. Click **"OK"**
10. Go to Google Sheet - see **"CV Requests"** tab with headers ✅

---

### STEP 4: Test Email System

1. Function dropdown → Select **`testEmail`**
2. Click **Run** ▶️
3. Wait for popup: **"Test Sent!"**
4. Check email: **rizwanarshad.se.official@gmail.com**
5. Should see: **"📬 New CV Request from John Doe"**
6. Email should have beautiful design ✅

---

### STEP 5: Deploy as Web App

1. Click **"Deploy"** (top right)
2. Click **"New deployment"**
3. Click gear icon ⚙️ → Select **"Web app"**
4. Settings:
   - **Description:** CV Request System
   - **Execute as:** Me (rizwanarshad.se.official@gmail.com)
   - **Who has access:** Anyone
5. Click **"Deploy"**
6. **COPY THE WEB APP URL** - looks like:
   ```
   https://script.google.com/macros/s/AKfycby.../exec
   ```
7. Click **"Done"**

---

### STEP 6: Update Website URL

1. Open: **`assets/js/cv-admin-system.js`**
2. Find **Line 2:**
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby-aAYbpk4e6wGPciRrhfCZxnop1eiaU9XdciCzPgNywgIM3oJpfBmmtH6Qv3BrX3SK/exec';
   ```
3. **Replace** with YOUR URL from Step 5
4. **Save** file

---

### STEP 7: Test Complete System

1. Open **`resume.html`** in browser
2. Click **"Download My CV"** button
3. Modal should appear ✅
4. Fill form:
   - **Name:** Test User
   - **Email:** YOUR email address
   - **Company:** Test Company
   - **Purpose:** Testing the system
5. Click **"Submit Request"**
6. Should see success message ✅

---

### STEP 8: Verify Everything

**Check Admin Email:**
1. Open: rizwanarshad.se.official@gmail.com
2. Should receive: "📬 New CV Request from Test User"
3. Beautiful email with all details ✅
4. Has "Reply via Email" button ✅

**Check User Email:**
1. Open: YOUR email
2. Should receive: "✅ CV Request Received - Rizwan Arshad"
3. Confirmation message ✅

**Check Google Sheet:**
1. Go to Google Sheet
2. Should have 1 row of data with test request ✅
3. Status: "New Request"

---

## 🎨 ADMIN EMAIL FEATURES

### Beautiful Professional Design:
- 📬 Gradient purple header with icon
- 👤 Clean request details card
- 📋 Quick Actions: Reply via Email + View in Sheet
- 📊 Metadata: Request ID, Timestamp, Status badge
- 📱 Mobile responsive

### Reply Email Pre-filled Message:
```
Hello,

Thank you for your interest. As requested, I am sharing my CV for your review. Please let me know if you need any additional information.

CV Link: https://drive.google.com/file/d/1Fx2tFJcpH9Jd5veEugQ41FBPYIL3C3LK/view?usp=sharing

Best regards,
Rizwan Arshad
```

---

## 📊 GOOGLE SHEET COLUMNS

| Column | Description |
|--------|-------------|
| Timestamp | When request was submitted |
| Request ID | Unique ID (REQ12345678) |
| Name | Requester's name |
| Email | Requester's email |
| Company | Company/Organization |
| Purpose | Why they need CV |
| Status | New Request / Replied |
| Notes | Your personal notes |

---

## 💡 HOW TO USE (Daily Workflow)

### When Someone Requests CV:

1. **Get Email** (rizwanarshad.se.official@gmail.com)
   - Subject: "📬 New CV Request from [Name]"
   - Beautiful professional email

2. **Review Details**
   - Name, Email, Company, Purpose
   - All displayed in organized card

3. **Click "Reply via Email"**
   - Gmail opens in new tab
   - Message already pre-filled
   - CV link included

4. **Send Email**
   - Review message (edit if needed)
   - Click Send in Gmail
   - User gets CV link immediately

5. **Update Sheet (Optional)**
   - Go to Google Sheet
   - Change Status from "New Request" to "Replied"
   - Add any notes

**Total Time: ~30 seconds per request!**

---

## 🔧 CUSTOMIZATION

### Change Reply Message:

In **`NOTIFICATION_ONLY_SCRIPT.js`**, find this line:
```javascript
mailto:${email}?subject=Re%3A%20CV%20Request&body=Hello%2C%0A%0A...
```

The `body=` part contains the message. It's URL encoded.

To update:
1. Write your message in plain text
2. Go to: https://www.urlencoder.org/
3. Paste message → Click "Encode"
4. Copy encoded text
5. Replace in script
6. Redeploy

### Change CV Link:

Replace this:
```
https://drive.google.com/file/d/1Fx2tFJcpH9Jd5veEugQ41FBPYIL3C3LK/view?usp=sharing
```

With your CV link, then URL encode it.

### Change Admin Email:

In script, Line 11:
```javascript
const ADMIN_EMAIL = 'rizwanarshad.se.official@gmail.com';
```

---

## 🚨 TROUBLESHOOTING

### No Emails Received:
- ✅ Check spam folder
- ✅ Verify email in script is correct
- ✅ Check Apps Script: View → Executions (look for errors)
- ✅ Re-run `testEmail()` function

### Form Doesn't Submit:
- ✅ Check browser console (F12) for errors
- ✅ Verify script URL in `cv-admin-system.js`
- ✅ Check script is deployed as Web App
- ✅ Check "Who has access" is set to "Anyone"

### Sheet Not Updating:
- ✅ Script must be opened FROM the sheet
- ✅ Re-run `setupSheet()` function
- ✅ Check sheet name is "CV Requests"

### Reply Button Doesn't Work:
- ✅ Check default email client is set
- ✅ Try copying the mailto link directly
- ✅ Use webmail (Gmail.com) if desktop client fails

---

## ✅ SUCCESS CHECKLIST

- [ ] Google Sheet created: "CV Request System"
- [ ] Apps Script code pasted from NOTIFICATION_ONLY_SCRIPT.js
- [ ] setupSheet() function ran successfully
- [ ] testEmail() sent to admin email
- [ ] Test email received with beautiful design
- [ ] Web App deployed successfully
- [ ] Deployment URL copied
- [ ] Website JavaScript file updated with URL
- [ ] resume.html includes CV button
- [ ] Test form submission works
- [ ] Success modal appears
- [ ] Admin email received
- [ ] User confirmation email received
- [ ] Data appears in Google Sheet
- [ ] "Reply via Email" opens Gmail
- [ ] Message is pre-filled with CV link

---

## 🎉 SYSTEM COMPLETE!

You now have a professional CV request system with:
- ✅ Beautiful modal form
- ✅ Professional email notifications
- ✅ Quick reply with CV link
- ✅ Google Sheet tracking
- ✅ Mobile responsive
- ✅ Zero maintenance required

**Everything is automated except the actual sending (which you control)!**

---

## 📞 SUPPORT

If you need help:
1. Check this documentation first
2. Check Apps Script logs: View → Executions
3. Test with `testEmail()` function
4. Verify all files are in correct locations

---

**Last Updated:** Based on complete chat conversation
**System Status:** ✅ Fully Working
**Files Created:** All files restored and working