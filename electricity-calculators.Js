   
   function openElectricModal() {
    if(typeof setActiveMode === 'function') setActiveMode('mode-electri-calculat');
    document.getElementById('electricalculatModal').style.display = 'flex';
    initializeRtData();
    setRtLang(rtLang);
}

function closeElectriccalculatorModal() {
    document.getElementById('electricalculatModal').style.display = 'none';
}    
   
   
   
  const presets = {
    Light: { watt: 20, hours: 5 },
    Fan: { watt: 75, hours: 8 },
    TV: { watt: 120, hours: 5 },
    Fridge: { watt: 200, hours: 24 },
    'Laptop': { watt: 65, hours: 6 },
    'AC (1 Ton)': { watt: 1200, hours: 6 },
    'AC (1.5 Ton)': { watt: 1500, hours: 6 },
    Pump: { watt: 750, hours: 2 },
    Custom: { watt: 0, hours: 0 },
  };

  function addCalcItem() {
  const container = document.getElementById('calcItems');

  const itemDiv = document.createElement('div');
  itemDiv.className = 'calc-item';

  // ROW 1 (Select + Name + Remove)
  const row1 = document.createElement('div');
 row1.className = 'calc-row top';

  // ROW 2 (Qty + Watt + Hours)
  const row2 = document.createElement('div');
 row2.className = 'calc-row bottom';

  // SELECT
  const select = document.createElement('select');
  select.className = 'preset-select';
    

  const placeholderOption = document.createElement('option');
  placeholderOption.value = '';
  placeholderOption.textContent = 'Select Appliance';
  placeholderOption.disabled = true;
  placeholderOption.selected = true;
  select.appendChild(placeholderOption);

  for (const key in presets) {
    if (key === 'Custom') continue;
    const option = document.createElement('option');
    option.value = key;
    option.textContent = key;
    select.appendChild(option);
  }

  const customOption = document.createElement('option');
  customOption.value = 'Custom';
  customOption.textContent = 'Custom';
  select.appendChild(customOption);

  // NAME INPUT
  const productNameInput = document.createElement('input');
  productNameInput.type = 'text';
  productNameInput.className = 'product-name-input';
  productNameInput.placeholder = 'Name';
  productNameInput.style.display = 'none';

  // REMOVE BUTTON
  const removeBtn = document.createElement('span');
  removeBtn.className = 'calc-remove-btn';
  removeBtn.textContent = 'X';
  removeBtn.onclick = () => {
  itemDiv.style.opacity = '0';
  itemDiv.style.transform = 'translateX(20px)';
  setTimeout(() => {
    itemDiv.remove();
    autoCalculate();
  }, 200);
};
    
    
    
    

  // QTY
  const qtyInput = document.createElement('input');
  qtyInput.type = 'number';
  qtyInput.placeholder = 'Qty';
  qtyInput.oninput = autoCalculate;

  // WATT
  const wattInput = document.createElement('input');
  wattInput.type = 'number';
  wattInput.placeholder = 'Watt';
  wattInput.oninput = autoCalculate;

  // HOURS
  const hoursInput = document.createElement('input');
  hoursInput.type = 'number';
  hoursInput.placeholder = 'Hours/day';
  hoursInput.oninput = autoCalculate;
    
    
   hoursInput.addEventListener('change', () => {
  const allItems = document.querySelectorAll('.calc-item');
  if (itemDiv === allItems[allItems.length - 1]) {
    addCalcItem();
  }
}); 

  // SELECT CHANGE
  select.onchange = () => {
    if (select.value === 'Custom') {
      productNameInput.style.display = 'block';
      productNameInput.value = '';
      wattInput.value = '';
      hoursInput.value = '';
    } else if (select.value === '') {
      productNameInput.style.display = 'none';
      productNameInput.value = '';
      wattInput.value = '';
      hoursInput.value = '';
    } else {
      productNameInput.style.display = 'none';
      productNameInput.value = select.value;
      wattInput.value = presets[select.value].watt;
      hoursInput.value = presets[select.value].hours;
    }
    autoCalculate();
  };

  // BUILD ROW 1
  row1.appendChild(select);
  row1.appendChild(productNameInput);
  row1.appendChild(removeBtn);

  // BUILD ROW 2
  row2.appendChild(qtyInput);
  row2.appendChild(wattInput);
  row2.appendChild(hoursInput);

  // APPEND
  itemDiv.appendChild(row1);
  itemDiv.appendChild(row2);

  container.appendChild(itemDiv);
    
   
   itemDiv.style.opacity = '0';
itemDiv.style.transform = 'translateY(10px)';

setTimeout(() => {
  itemDiv.style.transition = '0.3s';
  itemDiv.style.opacity = '1';
  itemDiv.style.transform = 'translateY(0)';
}, 50); 
    
    
    
 setTimeout(() => {
  select.focus();
}, 100);   
    
    
}
  


  function calculate() {

    let extraHTML = '';


// Safely get IPS/Solar toggle values
const ipsEnabled = document.getElementById('ipsToggle') ? document.getElementById('ipsToggle').checked : false;
const solarEnabled = document.getElementById('solarToggle') ? document.getElementById('solarToggle').checked : false;
    
    const projectName = document.getElementById('calcProject').value || 'Electric Load Report';
    const location = document.getElementById('calcLocation').value || '-';
    const unitCost = parseFloat(document.getElementById('calcUnitCost').value) || 8;

    let totalLoad = 0;
    let totalEnergyWhDay = 0;
    let reportItemsHTML = '';

    const items = document.querySelectorAll('.calc-item');
    items.forEach((item) => {
      const presetSelect = item.querySelector('select.preset-select');
      const productNameInput = item.querySelector('.product-name-input');
      const qtyInput = item.querySelector('input[placeholder="Qty"]');
      const wattInput = item.querySelector('input[placeholder="Watt"]');
      const hoursInput = item.querySelector('input[placeholder="Hours/day"]');

      const selectedPreset = presetSelect.value;
      let name = '';

      if (selectedPreset === 'Custom') {
        name = productNameInput.value.trim() || 'Custom Appliance';
      } else if (selectedPreset === '') {
        // Ignore if placeholder selected
        return;
      } else {
        name = selectedPreset;
      }

      const qty = parseFloat(qtyInput.value) || 0;
      const watt = parseFloat(wattInput.value) || 0;
      const hours = parseFloat(hoursInput.value) || 0;

      if (qty === 0 || watt === 0 || hours === 0) return; // skip incomplete

      const load = qty * watt;
      const energyWh = load * hours;
      const current = load / 230;

      totalLoad += load;
      totalEnergyWhDay += energyWh;

      const wire =
        current < 10 ? '1.5 mm²' :
        current < 16 ? '2.5 mm²' :
        current < 25 ? '4 mm²' :
        current < 32 ? '6 mm²' :
        '10 mm²';

      reportItemsHTML += `
        <tr>
          <td>${name}</td>
          <td>${qty}</td>
          <td>${watt}</td>
          <td>${hours}</td>
          <td>${energyWh.toFixed(2)}</td>
          <td>${current.toFixed(2)}</td>
          <td>${wire}</td>
        </tr>`;
    });

    // Skip if no items
    if (!reportItemsHTML) {
      document.getElementById('calcPreview').innerHTML = '<h2>Live Report</h2><p>No appliances added.</p>';
      return;
    }

    // Electrical Summary
    const totalCurrent = totalLoad / 230;

    const mainWire =
      totalCurrent < 10 ? '1.5 mm²' :
      totalCurrent < 16 ? '2.5 mm²' :
      totalCurrent < 25 ? '4 mm²' :
      totalCurrent < 32 ? '6 mm²' :
      '10 mm²';

    const breaker =
      totalCurrent < 10 ? '10A MCB' :
      totalCurrent < 16 ? '16A MCB' :
      totalCurrent < 25 ? '25A MCB' :
      totalCurrent < 32 ? '32A MCB' :
      '63A MCB';

    const dailyKWh = totalEnergyWhDay / 1000;
    const monthlyKWh = dailyKWh * 30;
    const monthlyBill = monthlyKWh * unitCost;

    
    

    
    
if (ipsEnabled) {

  const ipsBackupInput = document.getElementById('ipsBackup');
  const backupHours = ipsBackupInput ? parseFloat(ipsBackupInput.value) || 4 : 4;

  const totalVA = totalLoad / 0.8;
  const batteryAh = (totalLoad * backupHours) / 12;

  extraHTML += `
    <h3>🔋 IPS System</h3>
    <table border="1" style="width:100%">
      <tr><td><b>Backup Time</b></td><td>${backupHours} Hours</td></tr>
      <tr><td><b>Required VA</b></td><td>${totalVA.toFixed(0)} VA</td></tr>
      <tr><td><b>IPS Size</b></td><td>${Math.ceil(totalVA/1000)} KVA</td></tr>
      <tr><td><b>Battery</b></td><td>${Math.ceil(batteryAh)} Ah</td></tr>
    </table>
  `;
}

/* ===== SOLAR FULL SYSTEM ===== */
if (solarEnabled) {

  const solarBackupInput = document.getElementById('solarBackup');
  const backupHours = solarBackupInput ? parseFloat(solarBackupInput.value) || 6 : 6;

  const sunHours = 5;
  const efficiency = 0.75;
  const systemVoltage = 12;

  const solarKW = (totalEnergyWhDay / 1000) / (sunHours * efficiency);

  const panelWatt = 550;
  const panelCount = Math.ceil((solarKW * 1000) / panelWatt);

  const batteryAh = (totalLoad * backupHours) / systemVoltage;

  const inverterVA = totalLoad / 0.8;

  extraHTML += `
    <h3>☀ Solar System</h3>
    <table border="1" style="width:100%">
      <tr><td><b>Backup Time</b></td><td>${backupHours} Hours</td></tr>
      <tr><td><b>Solar Size</b></td><td>${solarKW.toFixed(2)} kW</td></tr>
      <tr><td><b>Panel</b></td><td>${panelWatt}W × ${panelCount}</td></tr>
      <tr><td><b>Inverter</b></td><td>${Math.ceil(inverterVA/1000)} KVA</td></tr>
      <tr><td><b>Battery</b></td><td>${Math.ceil(batteryAh)} Ah</td></tr>
    </table>
  `;
}
    
 setTimeout(() => {
  const ipsToggle = document.getElementById('ipsToggle');
  const solarToggle = document.getElementById('solarToggle');

  if (ipsToggle) {
    ipsToggle.addEventListener('change', function () {
      const box = document.getElementById('ipsInputBox');
      if (box) box.style.display = this.checked ? 'block' : 'none';
    });
  }

  if (solarToggle) {
    solarToggle.addEventListener('change', function () {
      const box = document.getElementById('solarInputBox');
      if (box) box.style.display = this.checked ? 'block' : 'none';
    });
  }

}, 100);
    
    
    
    // Build report table HTML
    const reportHTML = `
      <h2>${projectName}</h2>
      <p><b>Location:</b> ${location}</p>

      <h3>📋 Appliance Details</h3>
      <table border="1" cellpadding="6" cellspacing="0" style="border-collapse: collapse; width: 100%;">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Qty</th>
            <th>Per Product Watt</th>
            <th>Average Running Time (h)</th>
            <th>Total Energy (Wh)</th>
            <th>Current (A)</th>
            <th>Wire</th>
          </tr>
        </thead>
        <tbody>
          ${reportItemsHTML}
          <tr>
            <td><b>Total</b></td>
            <td></td>
            <td></td>
            <td></td>
            <td><b>${totalEnergyWhDay.toFixed(2)}</b></td>
            <td><b>${totalCurrent.toFixed(2)}</b></td>
            <td></td>
          </tr>
        </tbody>
      </table>

      <h3>⚡ Electrical Summary</h3>
      <table border="1" cellpadding="6" cellspacing="0" style="border-collapse: collapse; width: 100%;">
        <tbody>
          <tr><td><b>Total Load</b></td><td>${totalLoad} W</td></tr>
          <tr><td><b>Total Current</b></td><td>${totalCurrent.toFixed(2)} A</td></tr>
          <tr><td><b>Breaker Use is safe</b></td><td>${breaker}</td></tr>
          <tr><td><b>Wire</b></td><td>${mainWire}</td></tr>
          <tr><td><b>Monthly Bill</b></td><td>৳${monthlyBill.toFixed(0)}</td></tr>
        </tbody>
      </table>
    `;

   document.getElementById('calcPreview').innerHTML = reportHTML + extraHTML;
  }

function autoCalculate() {
  try {
    calculate();
  } catch (e) {
    console.log("AutoCalculate Error:", e);
  }
}
  
  
function getReportHTML() {
  return document.getElementById('calcPreview').innerHTML;
}
  
  
function printReport() {
  const content = getReportHTML();

  const win = window.open('', '', 'width=900,height=700');

  win.document.write(`
    <html>
      <head>
        <title>Report</title>
        <style>
          body {
            font-family: Arial;
            padding: 20px;
            color: #000;
          }

          h2 { text-align: center; }

          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
          }

          th, td {
            border: 1px solid #000;
            padding: 8px;
            font-size: 13px;
          }

          h3 {
            margin-top: 20px;
          }
        </style>
      </head>
      <body>
        ${content}
      </body>
    </html>
  `);

  win.document.close();

  setTimeout(() => {
    win.print();
  }, 500);
}
  
  

  function clearAll() {
    document.getElementById('calcItems').innerHTML = '';
    document.getElementById('calcPreview').innerHTML = '<h2>Live Report</h2><p>Start adding appliances...</p>';
  }


  
 
  
function downloadPDF() {

  const { jsPDF } = window.jspdf;
  const element = document.getElementById("calcPreview");

  // Create a clean clone (for print-style)
  const clone = element.cloneNode(true);

  clone.style.padding = "20px";
  clone.style.background = "#ffffff";
  clone.style.color = "#000";

  clone.style.width = "800px";

  document.body.appendChild(clone);

  html2canvas(clone, {
    scale: 2,
    useCORS: true
  }).then(canvas => {

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");

    const pageWidth = 210;
    const pageHeight = 297;

    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    let position = 0;

    // MULTI PAGE SUPPORT
    if (imgHeight > pageHeight) {

      let heightLeft = imgHeight;

      while (heightLeft > 0) {
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        position -= pageHeight;

        if (heightLeft > 0) {
          pdf.addPage();
        }
      }

    } else {
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    }

    pdf.save("Load_Report.pdf");

    document.body.removeChild(clone);
  });
}

  
  // Initialize with one empty item (no preset selected)
  addCalcItem();