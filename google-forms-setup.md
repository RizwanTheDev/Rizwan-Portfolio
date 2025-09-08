# Google Forms Setup for Contact Form

## Step 1: Create Google Form
1. Go to https://forms.google.com
2. Create new form with these fields:
   - Name (Short answer)
   - Email (Short answer) 
   - Subject (Short answer)
   - Service (Multiple choice - optional)
   - Message (Paragraph)

## Step 2: Get Form URL
1. Click "Send" button
2. Copy the form link
3. Replace "viewform" with "formResponse" in URL

## Step 3: Get Field Names
1. Open form in new tab
2. Right-click on each field → Inspect
3. Find "name" attribute (e.g., "entry.123456789")

## Step 4: Replace Form Action
Replace the form in contact.html with:

```html
<form action="YOUR_GOOGLE_FORM_URL" method="POST" target="hidden_iframe" id="contact-form">
  <!-- Keep existing form fields but add name attributes -->
  <input type="text" name="entry.NAME_FIELD_ID" id="name" class="form-control" required>
  <input type="email" name="entry.EMAIL_FIELD_ID" id="email" class="form-control" required>
  <!-- etc... -->
</form>

<iframe name="hidden_iframe" style="display:none;"></iframe>
```