const onlineSebaList = [
  { name: "জন্ম নিবন্ধন যাচাই", logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh_YtLcyQqdG8mF1SEK2V0upbcWkDImMFjPFTAnyNxYmGnmw4FYR3ZoApXGsVSFqz2_ed32oGwCJn2dWhra3bEeZhn-Q9KXMBDtnvyXO0Yg8Hi13QJjgTXqyjOYRVzJty-hUK1OA1ijBBqnCJ2w_09pOW3RNToYRow3lcffGWI6yrl2ZAZWaY6UBGTu-Z8/s1600/jonmo.jpeg", link: "https://everify.bdris.gov.bd/" },
  { name: "নতুন জন্ম নিবন্ধন আবেদন", logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhIUcfEleYR4vIsscnivWiU3i_Y9_CAKCQWEa_xgZSlzlOX5-_D0O8wUsjxNBAEekSwraFkQQcaUMPPpb5e49aEqZhWteN1LNjHMJoBFUSD2eUFsBfQMFc11EDrBaUDjYUZtBlnsIxK0SJSgo22DZuOCiANEd9zafKTZD4egaGrm0vGPsx8BJDQ4m4Egpw/s1600/dob.png", link: "https://bdris.gov.bd/br/application" },
  { name: "জন্ম তথ্য সংশোধন আবেদন", logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh_YtLcyQqdG8mF1SEK2V0upbcWkDImMFjPFTAnyNxYmGnmw4FYR3ZoApXGsVSFqz2_ed32oGwCJn2dWhra3bEeZhn-Q9KXMBDtnvyXO0Yg8Hi13QJjgTXqyjOYRVzJty-hUK1OA1ijBBqnCJ2w_09pOW3RNToYRow3lcffGWI6yrl2ZAZWaY6UBGTu-Z8/s1600/jonmo.jpeg", link: "https://bdris.gov.bd/br/correction" },
  { name: "নতুন মৃত্যু নিবন্ধন আবেদন", logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh_YtLcyQqdG8mF1SEK2V0upbcWkDImMFjPFTAnyNxYmGnmw4FYR3ZoApXGsVSFqz2_ed32oGwCJn2dWhra3bEeZhn-Q9KXMBDtnvyXO0Yg8Hi13QJjgTXqyjOYRVzJty-hUK1OA1ijBBqnCJ2w_09pOW3RNToYRow3lcffGWI6yrl2ZAZWaY6UBGTu-Z8/s1600/jonmo.jpeg", link: "https://bdris.gov.bd/dr/application" },


 

// গ্রেডিয়েন্ট প্যালেট
const sebaGradients = [
  "linear-gradient(135deg, #ff8a80, #ff5252)",
  "linear-gradient(135deg, #a5d6a7, #66bb6a)",
  "linear-gradient(135deg, #90caf9, #42a5f5)",
  "linear-gradient(135deg, #ffe082, #ffb347)"
];

function openbirthModal() {
    if(typeof setActiveMode === "function") setActiveMode('mode-online-birth');
    document.getElementById('onlinebirthModal').style.display = 'flex';
    renderSebaGrid();
}

function closebirthModal() {
    document.getElementById('onlinebirthModal').style.display = 'none';
}

function renderSebaGrid() {
    const container = document.getElementById("seba-master-grid");
    container.innerHTML = "";

    onlineSebaList.forEach((seba, index) => {
        const card = document.createElement("div");
        card.className = "seba-card-item";
        card.style.background = sebaGradients[index % sebaGradients.length];
        
        card.innerHTML = `
            <img src="${seba.logo}" alt="${seba.name}">
            <span>${seba.name}</span>
            <div class="btn-seba-visit">ভিজিট করুন</div>
        `;
        
        card.onclick = () => window.open(seba.link, '_blank');
        container.appendChild(card);
    });
}
