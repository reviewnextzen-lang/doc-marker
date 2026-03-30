const bdResultList = [
  { name: "প্রাথমিক শিক্ষা অধিদপ্তর", logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjSJM7ViqGBVmSaJnzpUPKMeV6sy2VOjILagStNeUn7T12HiMiMYLRFsZRN_v33_9gfHnyDnHOGy5uZW4UD2926t3Qs32CFj8z2vRKpemr6xTTI9HOCTOoRQmcSWM7AmTRtrVQcyI7cCkmwQV9VX56XwYbp0i4Z28oXm4ry6wL0vJ4Q2rfwY5PfOumk72ka/s1600/logo.png", link: "http://180.211.137.51/" },
  { name: "প্রাথমিক শিক্ষা-বিদ্যালয় ভিত্তিক", logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjSJM7ViqGBVmSaJnzpUPKMeV6sy2VOjILagStNeUn7T12HiMiMYLRFsZRN_v33_9gfHnyDnHOGy5uZW4UD2926t3Qs32CFj8z2vRKpemr6xTTI9HOCTOoRQmcSWM7AmTRtrVQcyI7cCkmwQV9VX56XwYbp0i4Z28oXm4ry6wL0vJ4Q2rfwY5PfOumk72ka/s1600/logo.png", link: "http://180.211.137.51/ResultSchWise.aspx" },
  { name: "বাংলাদেশ শিক্ষা বোর্ড", logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjf6pKWFvOJXMa0_MTwuFSpAxLSe4wIK4e1qaXyja66soUpkQqwoFEqdkAgbog26OhExkhdMYAAi4t7X-eHoiKDtYsn-CPQTFR9Qk9Erg5zEr0jpvKoWxeGoMuctncD4gKIjRsI5zikBAhPhrydslCQinjJTXvPdfCCPZlJAFZ3DWn52E07BruIGxTrsM_s/s1600/teletalk-sim.png", link: "http://www.educationboardresults.gov.bd/" },
  { name: "পরীক্ষার রেজাল্ট বিডি", logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEirdi302iOuDH0D4pcbbdT9HreLKvAs6ffFHkKEunWVPsDY9ZUTsUkVFkh0Fp3BRpLwSDT05grknaYQ56HjiNvHUeMXb65RlB0HbA8qWVxr88fUbZZbkSMdohd7myoU5PyoVyOAfUO5ksmI5bAgXdFRQZzg4EpJhC28MHLvmTYCuJkQcosQ2d7iNlXQm1rU/s1600/gov.png", link: "https://eboardresults.com/v2/home?lang=bn" },
  { name: "কওমী মাদরাসা শিক্ষাবোর্ড", logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjTikdu5gLgjX_0codEXZoV5Neoo8vlWv8hJl3lvmIAUZuV72WcA2PPvZSRITHVLnFdCVs2w12lMhumN-E7_j0HpI2-GC3DmyqwgDLFawKdi6sfBYZ5RkeABKIAYx-G0qp2mZeLkyO9Sv-6_3px3QwBVyaBumJBIleY0pdimD-rbI6njJXCtQENqNep3TRx/s1600/logog.png", link: "https://wifaqresult.com/" },
  { name: "কারিগরী শিক্ষা বোর্ড", logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjWcTzEJWxQifA3yUWCEL_2X4-8oyUQw0NG7uvbli8fkhXRNjyDriJJf29_e2gq8QNBVWdEPxd6i9vTyWxpLO58jG5M4X9OIkeGXjC4uAV9-9fubHol3qmZG2ZzTuo8IVrjE3fsYJuBxXxbz2P4YV2uGFOce5SU_8t7FeNTOBaMgXOKXmqV9LL8CXWMjUYw/s1600/bteb.png", link: "http://180.211.162.102:8444/result_arch/index.php" },
  { name: "মেডিকেল রেজাল্ট - MBBS", logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi6PX0C_VpvBxtxP149TxpB730nMGSSrbjZhRru09xYyDKbkFv9XjLVk739vQ0zKvnx9KuVFMgqRD60mgEcwfVlKTGXvb67VWwpuY1T0PsMxWZZ9-6CZVB0Njy3N6e9VMcjWz21aEvQ-wyQ11W-C5dSFmI9SDmUsLvnJ-qPtfiM_GdmdaIF_46nrACAmL9B/s1600/mbbs.png", link: "https://result.dghs.gov.bd/mbbs/" },
  { name: "মেডিকেল রেজাল্ট - BDS", logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjw-I3NUXNGvwwU9L62wt93-wIluCntL1b49jUshe4nF3mst84_pU0JghZVybFArE-nj6S_2ihM6z3dO7VoFg9TKOnHGldCmXjr96SaJVyvcq1V4SICHg8cXACjLYejXWPLyclMSHfgirURf-PkDQjKieuk38fbCdjB8EsVnH-QLGq0tTb7Y5bkNjKlFqui/s1600/bds.png", link: "https://result.dghs.gov.bd/bds/" },
  { name: "বিদ্যালয়ের অভ্যন্তরীণ রেজাল্ট", logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiNnFzEAPxeEXXXIH2ISzC6J-Up9un0KlficPT_6zc0H-mlgd2ddqs5VVfo7fr_whQuMGrjmOFBwv2yafvs3JxDr7BapA9uBh5loMilHK8o9LjpLt7OgqV9jf9icbmPQBgqR2j0GNw94SGDb_Fj-EXSH8m15MSmalE747RIvIKkJ3IG1k-WOtKX20zOksRv/s1600/css.png", link: "http://sib.gov.bd/" },
  
  // নতুন ৩টি সাইট নিচে যুক্ত হলো
  { name: "জাতীয় বিশ্ববিদ্যালয় (NU)", logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiUb_j7JldXQTxoeg43S5s0SSiTxfYUJS3eWwYP1cKEB_9uYVy2rWN7qwBMGDUrfIrobHep6hcLdxKG1C8vK9TyOXqsdbn__R54JGxQGzQn-PwTFGBTlowYFDPZEH4PqHzkaFC6m2dvB4B0k8liDniirAxuQixeFOSBpBn9XlOmuVQytRRxVeow8_6O3oPM/s1600/NU.png", link: "http://results.nu.ac.bd/" },
  { name: "উন্মুক্ত বিশ্ববিদ্যালয় (BOU)", logo: "https://exam.bou.ac.bd/images/boulogo-new.png", link: "https://exam.bou.ac.bd/" },
  { name: "শিক্ষক নিবন্ধন (NTRCA)", logo: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiCjL6ThMslP2APzFjTOheT0gpKtkEf3YJgEud1pAqCbsNQwd_QmZ8CiIEo9oAVjJlRs3fymKhbaRwRyNT0L76f3Px27CUfNwHYFj6eRdhBzOIWaI9fbO5cSQSB_j3A73HRqp4QZfhNBMrslUzFexoIbf-pgst5m5W0FXmK0gGkuPqdfKlXm00RkE3V4unH/s1600/ntrca.png", link: "http://ntrca.teletalk.com.bd/result/" }
];

// রেজাল্ট গ্রেডিয়েন্ট প্যালেট
const resGradients = [
  "linear-gradient(135deg, #FF8A80, #FF5252)",
  "linear-gradient(135deg, #A5D6A7, #66BB6A)",
  "linear-gradient(135deg, #90CAF9, #42A5F5)",
  "linear-gradient(135deg, #FFE082, #FFB347)",
  "linear-gradient(135deg, #F48FB1, #F06292)",
  "linear-gradient(135deg, #80CBC4, #26A69A)"
];

function openResultModal() {
    if(typeof setActiveMode === "function") setActiveMode('mode-result-check');
    document.getElementById('resultCheckModal').style.display = 'flex';
    renderResultGrid();
}

function closeResultModal() {
    document.getElementById('resultCheckModal').style.display = 'none';
}

function renderResultGrid() {
    const container = document.getElementById("result-master-grid");
    if(!container) return;
    container.innerHTML = "";

    bdResultList.forEach((item, index) => {
        const card = document.createElement("div");
        card.className = "res-card-item";
        card.style.background = resGradients[index % resGradients.length];
        
        card.innerHTML = `
            <img src="${item.logo}" alt="${item.name}">
            <span>${item.name}</span>
            <div class="btn-res-visit">ভিজিট করুন</div>
        `;
        
        card.onclick = () => window.open(item.link, '_blank');
        container.appendChild(card);
    });
}
