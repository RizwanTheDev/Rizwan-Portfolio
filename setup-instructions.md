# Google Sheets Setup Instructions

## Step 1: Create Google Sheet
1. Go to https://sheets.google.com
2. Create new sheet
3. Add headers in row 1: Date | Name | Email | Subject | Service | Message
4. Copy the sheet ID from URL (between /d/ and /edit)

## Step 2: Create Google Apps Script
1. Go to https://script.google.com
2. Create new project
3. Paste the code from google-apps-script.js
4. Replace 'YOUR-SHEET-ID-HERE' with your actual sheet ID
5. Save the project

## Step 3: Deploy the Script
1. Click "Deploy" → "New deployment"
2. Type: Web app
3. Execute as: Me
4. Who has access: Anyone
5. Click "Deploy"
6. Copy the web app URL

## Step 4: Update Contact Form
1. In contact.html, replace 'YOUR_SCRIPT_ID' with your deployment URL
2. Save the file

## Step 5: Test
1. Open your website
2. Fill out the contact form
3. Check your Google Sheet for the data

Your form will now store all messages in Google Sheets!