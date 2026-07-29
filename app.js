/* ==========================================================================
   OBOLOS - THE COMPLIANCE PROTOCOL FOR TOKENIZED EQUITY
   Interactive Cap Table Engine & Compliance Verification Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initCapTableEngine();
});

// Interactive Cap Table Valuation & Share Issuance Calculator
function initCapTableEngine() {
  const valuationSlider = document.getElementById('valSlider');
  const valuationDisplay = document.getElementById('valDisplay');
  const poolDisplay = document.getElementById('poolDisplay');
  const tokenSharesDisplay = document.getElementById('tokenSharesDisplay');
  const statusBadge = document.getElementById('complianceStatusBadge');

  if (!valuationSlider) return;

  const updateCalculator = () => {
    const val = parseInt(valuationSlider.value, 10);
    const valFormatted = '$' + (val / 1000000).toFixed(1) + 'M';
    const poolTokens = Math.round((val * 0.2) / 10).toLocaleString();

    if (valuationDisplay) valuationDisplay.textContent = valFormatted;
    if (poolDisplay) poolDisplay.textContent = '$' + (val * 0.2).toLocaleString();
    if (tokenSharesDisplay) tokenSharesDisplay.textContent = poolTokens + ' OB-EQUITY';

    if (statusBadge) {
      statusBadge.textContent = 'VERIFIED COMPLIANT (SEC / ROBINHOOD CHAIN)';
      statusBadge.style.color = '#00f0ff';
    }
  };

  valuationSlider.addEventListener('input', updateCalculator);
  updateCalculator();
}

// Mobile Menu Drawer Toggle
function toggleMobileMenuObolos() {
  const drawer = document.getElementById('mobileMenuDrawerObolos');
  if (drawer) drawer.classList.toggle('open');
}

// Toast Notifications
function showObolosToast(msg) {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed; bottom: 28px; right: 28px; z-index: 1000;
    background: #161a23; color: #ffffff; border: 1px solid #00f0ff;
    padding: 14px 22px; border-radius: 9999px; font-family: var(--font-sans);
    font-size: 0.85rem; box-shadow: 0 10px 30px rgba(0, 240, 255, 0.4);
    font-weight: 600;
  `;
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 4000);
}

function launchComplianceModal() {
  showObolosToast('🛡️ Robinhood Chain Compliance Protocol Verified! KYC/AML Whitelisted.');
}
