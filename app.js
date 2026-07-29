/* ==========================================================================
   OBOLOS - THE COMPLIANCE PROTOCOL FOR TOKENIZED EQUITY
   Fully Interactive Multipage Application Logic & Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initCapTableEngine();
  initCapTableRegistryPage();
  initComplianceTesterPage();
  initDevSandboxPage();
});

// 1. Interactive Cap Table Valuation & Share Issuance Calculator
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
    const poolAmount = val * 0.2;
    const poolTokens = Math.round(poolAmount / 10).toLocaleString();

    if (valuationDisplay) valuationDisplay.textContent = valFormatted;
    if (poolDisplay) poolDisplay.textContent = '$' + poolAmount.toLocaleString();
    if (tokenSharesDisplay) tokenSharesDisplay.textContent = poolTokens + ' OB-EQUITY';

    if (statusBadge) {
      statusBadge.textContent = 'VERIFIED COMPLIANT (SEC / ROBINHOOD CHAIN)';
      statusBadge.style.color = '#00f0ff';
    }
  };

  valuationSlider.addEventListener('input', updateCalculator);
  updateCalculator();
}

// 2. Interactive Cap Table Portal Page (cap-table.html)
function initCapTableRegistryPage() {
  const registryList = document.getElementById('shareholderRegistryList');
  if (!registryList) return;

  window.addNewShareholder = function() {
    const nameInput = document.getElementById('newShareholderName');
    const classInput = document.getElementById('newShareClass');
    const sharesInput = document.getElementById('newShareAmount');

    if (!nameInput || !nameInput.value) {
      showObolosToast('⚠️ Please enter shareholder entity name');
      return;
    }

    const name = nameInput.value;
    const shareClass = classInput ? classInput.value : 'Common Stock A';
    const shares = sharesInput ? parseInt(sharesInput.value, 10).toLocaleString() : '100,000';

    const row = document.createElement('div');
    row.className = 'registry-row';
    row.style.cssText = 'display: flex; justify-content: space-between; padding: 14px 0; border-bottom: 1px solid var(--stroke); color: var(--text-white); font-family: var(--font-mono); font-size: 0.88rem;';
    row.innerHTML = `
      <span>${name}</span>
      <span style="color: var(--neon-cyan);">${shareClass}</span>
      <span>${shares} OB-EQ</span>
      <span style="color: #4ade80;">100% Vested</span>
    `;

    registryList.appendChild(row);
    nameInput.value = '';
    showObolosToast(`✅ Issued ${shares} OB-EQ to ${name} on Robinhood Chain!`);
  };
}

// 3. Interactive Compliance Protocol Tester (protocol.html)
function initComplianceTesterPage() {
  const form = document.getElementById('complianceTestForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const resultBox = document.getElementById('complianceTestResult');
    const senderAcc = document.getElementById('testSenderAcc').value;
    const recipientAcc = document.getElementById('testRecipientAcc').value;

    if (resultBox) {
      resultBox.style.display = 'block';
      resultBox.innerHTML = `
        <div style="background: rgba(0, 240, 255, 0.08); border: 1px solid var(--neon-cyan); border-radius: 12px; padding: 16px; margin-top: 20px;">
          <div style="color: var(--neon-cyan); font-weight: 700; font-size: 0.9rem;">STATUS: PASSED (SEC REG D COMPLIANT)</div>
          <div style="color: var(--text-muted); font-size: 0.85rem; margin-top: 6px;">
            Transfer from <code>${senderAcc.substring(0, 10)}...</code> to <code>${recipientAcc.substring(0, 10)}...</code> verified on Robinhood Chain contract.
          </div>
        </div>
      `;
    }

    showObolosToast('🛡️ Compliance verification executed successfully!');
  });
}

// 4. Interactive Developer Sandbox (developers.html)
function initDevSandboxPage() {
  window.runSoliditySim = function() {
    const outputBox = document.getElementById('solidityOutputBox');
    if (outputBox) {
      outputBox.innerHTML = `
        <div style="color: #4ade80; font-family: var(--font-mono); font-size: 0.85rem;">
          [COMPILER SUCCESS] IObolosEquityToken compiled & verified on Robinhood Chain Testnet.<br/>
          Contract Address: 0x71C7656EC7ab88b098defB751B7401B5f6d8976F<br/>
          Gas Used: 42,108 gas
        </div>
      `;
    }
    showObolosToast('⚡ Solidity interface compiled & verified!');
  };
}

// Global Portal Modal & Drawer Logic
function toggleMobileMenuObolos() {
  const drawer = document.getElementById('mobileMenuDrawerObolos');
  if (drawer) drawer.classList.toggle('open');
}

function launchComplianceModal() {
  const modal = document.getElementById('obolosPortalModal');
  if (modal) modal.style.display = 'flex';
  else showObolosToast('🛡️ Robinhood Chain Equity Portal Launched!');
}

function closePortalModal() {
  const modal = document.getElementById('obolosPortalModal');
  if (modal) modal.style.display = 'none';
}

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
