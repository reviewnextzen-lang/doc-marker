const onlineVacList = [

  { name: "হাম-রুবেলা ভ্যাকসিন আবেদন", logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjvHDbfqFrEbczVCCWZ2KdeouLRWcnEfHcL4C5mcyPW-_oJssL4cxPb8LFT4CFMr9htZh8rSI27oVFaPesb3p6zdOEZ7L4uBzaPJZlEhTNQvRVqpCifWp9b0BnhxIYB1riseXz1dXeT4ZxPOu6EYUtCVT8vMgN2S9IPf_Cd4V_7AnDn74-d4rhYuMB6PJ8/s1600/tica.png", link: "https://vaxepi.gov.bd/registration/mr" },
  { name: "টাইফয়েড ভ্যাকসিন আবেদন", logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjvHDbfqFrEbczVCCWZ2KdeouLRWcnEfHcL4C5mcyPW-_oJssL4cxPb8LFT4CFMr9htZh8rSI27oVFaPesb3p6zdOEZ7L4uBzaPJZlEhTNQvRVqpCifWp9b0BnhxIYB1riseXz1dXeT4ZxPOu6EYUtCVT8vMgN2S9IPf_Cd4V_7AnDn74-d4rhYuMB6PJ8/s1600/tica.png", link: "https://vaxepi.gov.bd/registration/tcv" },
  { name: "মেনিনজাইটিস ভ্যাকসিন আবেদন", logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjvHDbfqFrEbczVCCWZ2KdeouLRWcnEfHcL4C5mcyPW-_oJssL4cxPb8LFT4CFMr9htZh8rSI27oVFaPesb3p6zdOEZ7L4uBzaPJZlEhTNQvRVqpCifWp9b0BnhxIYB1riseXz1dXeT4ZxPOu6EYUtCVT8vMgN2S9IPf_Cd4V_7AnDn74-d4rhYuMB6PJ8/s1600/tica.png", link: "https://vaxepi.gov.bd/registration/meningitis" },
  { name: "এইচপিভি ভ্যাকসিন আবেদন", logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjvHDbfqFrEbczVCCWZ2KdeouLRWcnEfHcL4C5mcyPW-_oJssL4cxPb8LFT4CFMr9htZh8rSI27oVFaPesb3p6zdOEZ7L4uBzaPJZlEhTNQvRVqpCifWp9b0BnhxIYB1riseXz1dXeT4ZxPOu6EYUtCVT8vMgN2S9IPf_Cd4V_7AnDn74-d4rhYuMB6PJ8/s1600/tica.png", link: "https://vaxepi.gov.bd/registration/hpv" }
	
];

// গ্রেডিয়েন্ট প্যালেট
const vacGradients = [
  "linear-gradient(135deg, #ff8a80, #ff5252)",
  "linear-gradient(135deg, #a5d6a7, #66bb6a)",
  "linear-gradient(135deg, #90caf9, #42a5f5)",
  "linear-gradient(135deg, #ffe082, #ffb347)"
];

function openVacModal() {
    if(typeof setActiveMode === "function") setActiveMode('mode-online-vac');
    document.getElementById('onlineVacModal').style.display = 'flex';
    renderVacGrid();
}

function closevacModal() {
    document.getElementById('onlineVacModal').style.display = 'none';
}

function renderVacGrid() {
    const container = document.getElementById("vac-master-grid");
    container.innerHTML = "";

    onlineVacList.forEach((seba, index) => {
        const card = document.createElement("div");
        card.className = "seba-card-item";
        card.style.background = vacGradients[index % vacGradients.length];
        
        card.innerHTML = `
            <img src="${seba.logo}" alt="${seba.name}">
            <span>${seba.name}</span>
            <div class="btn-seba-visit">নিবন্ধন করুন</div>
        `;
        
        card.onclick = () => window.open(seba.link, '_blank');
        container.appendChild(card);
    });
}

