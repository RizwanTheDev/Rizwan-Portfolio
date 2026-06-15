// CV Request System with Admin Approval
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby-aAYbpk4e6wGPciRrhfCZxnop1eiaU9XdciCzPgNywgIM3oJpfBmmtH6Qv3BrX3SK/exec';

// CV Request Modal HTML
const cvRequestModalHTML = `
<div id="cvRequestModal" class="cv-modal">
  <div class="cv-modal-content">
    <div class="cv-modal-header">
      <h3><i class="bi bi-file-earmark-text"></i> Request CV Access</h3>
      <button class="cv-close" onclick="closeCVModal()">&times;</button>
    </div>
    
    <div class="cv-modal-body">
      <div id="cvRequestForm">
        <p>Please fill out this form to request access to my CV. I'll review your request and respond via email.</p>
        
        <form id="cvForm">
          <div class="cv-form-group">
            <label for="requesterName">Your Name *</label>
            <input type="text" id="requesterName" required>
          </div>
          
          <div class="cv-form-group">
            <label for="requesterEmail">Email Address *</label>
            <input type="email" id="requesterEmail" required>
          </div>
          
          <div class="cv-form-group">
            <label for="requesterCompany">Company/Organization</label>
            <input type="text" id="requesterCompany">
          </div>
          
          <div class="cv-form-group">
            <label for="requesterPurpose">Purpose of Request *</label>
            <textarea id="requesterPurpose" rows="3" required placeholder="e.g., Job opportunity, collaboration, etc."></textarea>
          </div>
          
          <div class="cv-form-actions">
            <button type="button" onclick="closeCVModal()" class="cv-btn cv-btn-secondary">Cancel</button>
            <button type="submit" class="cv-btn cv-btn-primary" id="submitCVRequest">
              <i class="bi bi-send"></i> Submit Request
            </button>
          </div>
        </form>
      </div>
      
      <div id="cvRequestSuccess" style="display: none;">
        <div class="cv-success-icon">✅</div>
        <h4>Request Submitted!</h4>
        <p>Thank you for your interest! I've received your CV request and will review it personally.</p>
        <div class="cv-success-details">
          <p><strong>What happens next?</strong></p>
          <ul>
            <li>I'll review your request within 24 hours</li>
            <li>If approved, you'll receive an email with the CV link</li>
            <li>All requests are handled personally by me</li>
          </ul>
        </div>
        <button onclick="closeCVModal()" class="cv-btn cv-btn-primary">Close</button>
      </div>
    </div>
  </div>
</div>`;

// Initialize CV request system
function initCVRequestSystem() {
  document.body.insertAdjacentHTML('beforeend', cvRequestModalHTML);
  
  const cvButtons = document.querySelectorAll('[data-cv-download]');
  cvButtons.forEach(button => {
    button.addEventListener('click', openCVModal);
  });
  
  document.getElementById('cvForm').addEventListener('submit', handleCVRequest);
}

function openCVModal() {
  document.getElementById('cvRequestModal').style.display = 'block';
  document.body.style.overflow = 'hidden';
}

function closeCVModal() {
  document.getElementById('cvRequestModal').style.display = 'none';
  document.body.style.overflow = 'auto';
  
  document.getElementById('cvForm').reset();
  document.getElementById('cvRequestForm').style.display = 'block';
  document.getElementById('cvRequestSuccess').style.display = 'none';
  document.getElementById('submitCVRequest').disabled = false;
  document.getElementById('submitCVRequest').innerHTML = '<i class="bi bi-send"></i> Submit Request';
}

async function handleCVRequest(e) {
  e.preventDefault();
  
  const submitBtn = document.getElementById('submitCVRequest');
  const name = document.getElementById('requesterName').value.trim();
  const email = document.getElementById('requesterEmail').value.trim();
  const company = document.getElementById('requesterCompany').value.trim();
  const purpose = document.getElementById('requesterPurpose').value.trim();
  
  if (!name || !email || !purpose) {
    alert('Please fill in all required fields');
    return;
  }
  
  submitBtn.disabled = true;
  submitBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Submitting...';
  
  try {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('company', company);
    formData.append('purpose', purpose);
    formData.append('timestamp', new Date().toISOString());
    
    await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      body: formData,
      mode: 'no-cors'
    });
    
    document.getElementById('cvRequestForm').style.display = 'none';
    document.getElementById('cvRequestSuccess').style.display = 'block';
    
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to submit request. Please email me directly at rizwanarshad.se.official@gmail.com');
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="bi bi-send"></i> Submit Request';
  }
}

document.addEventListener('DOMContentLoaded', initCVRequestSystem);

window.addEventListener('click', function(e) {
  const modal = document.getElementById('cvRequestModal');
  if (e.target === modal) {
    closeCVModal();
  }
});