document.addEventListener("DOMContentLoaded", function(){

// ✅ Bangla number
function bn(n){
  const d=["০","১","২","৩","৪","৫","৬","৭","৮","৯"];
  return n.toString().replace(/\d/g,x=>d[x]);
}

// ✅ Unicode Bangla text (SAFE)
const TXT_ORDER = "\u0985\u09B0\u09CD\u09A1\u09BE\u09B0 \u0995\u09B0\u09C7\u099B\u09C7\u09A8"; // অর্ডার করেছেন
const TXT_MIN = "\u09AE\u09BF\u09A8\u09BF\u099F \u0986\u0997\u09C7"; // মিনিট আগে

// ✅ data
const names=[
  "👉 শামীম আহমেদ", "👉 শাকিল হোসেন", "👉 আরিফুল ইসলাম", "👉 কামরুল হাসান", "👉 মেহেদী হাসান", 
    "👉 তানভীর আহমেদ", "👉 জাহিদুল ইসলাম", "👉 নিলয় রহমান", "👉 সাইফুল ইসলাম", "👉 ফয়সাল আহমেদ", 
    "👉 আরাফাত রহমান", "👉 রিপন মিয়া", "👉 সুমন আলী", "👉 রাজু আহমেদ", "👉 ইকবাল হোসেন", 
    "👉 নাহিদ হাসান", "👉 রাসেল মাহমুদ", "👉 সজীব হোসেন", "👉 আশিকুর রহমান", "👉 মিজানুর রহমান", 
    "👉 তারেক আজিজ", "👉 জুয়েল রানা", "👉 মনির হোসেন", "👉 ইলিয়াছ আহমেদ", "👉 রাশেদ খান", 
    "👉 সোহেল রানা", "👉 মোস্তফা কামাল", "👉 সাব্বির আহমেদ", "👉 আবু সায়েম", "👉 হাসিবুর রহমান", 
    "👉 মাসুম বিল্লাহ", "👉 লিটন শেখ", "👉 আসাদুল ইসলাম", "👉 বিপ্লব হোসেন", "👉 শাহীন আলম", 
    "👉 জাহিদ হাসান", "👉 আল-আমিন হোসেন", "👉 কবির আহমেদ", "👉 মইনুল ইসলাম", "👉 ইমরান হোসেন", 
    "👉 মামুনুর রশিদ", "👉 শরিফুল ইসলাম", "👉 আতিকুর রহমান", "👉 সানি আহমেদ", "👉 রনি হোসেন", 
    "👉 আসিফ মাহমুদ", "👉 রাব্বি ইসলাম", "👉 পলাশ আহমেদ", "👉 নয়ন মিয়া", "👉 জসিম উদ্দিন", 
    "👉 রফিকুল ইসলাম", "👉 সালাম চৌধুরী", "👉 কালাম হোসেন", "👉 রুবেল আহমেদ", "👉 রানা মাহমুদ", 
    "👉 আলামিন ইসলাম", "👉 হিমেল হাসান", "👉 শাওন রহমান", "👉 সিফাত আহমেদ", "👉 তুহিন শেখ", 
    "👉 মুরাদ হোসেন", "👉 পনির আহমেদ", "👉 আকাশ মাহমুদ", "👉 সাগর হোসেন", "👉 শান্ত ইসলাম", 
    "👉 বিজয় কুমার", "👉 জয় আহমেদ", "👉 অনিমেষ দাস", "👉 সুজন মিয়া", "👉 রুহুল আমিন", 
    "👉 জিয়াউল ইসলাম", "👉 শরীফ আহমেদ", "👉 তৌহিদ হাসান", "👉 জুবায়ের রহমান", "👉 ইসমাইল হোসেন", 
    "👉 হানিফ মিয়া", "👉 আনোয়ার হোসেন", "👉 জাহাঙ্গীর আলম", "👉 ওসমান গনি", "👉 মোক্তার হোসেন", 
    "👉 ফারুক আহমেদ", "👉 বাপ্পি রহমান", "👉 শুভ ইসলাম", "👉 অনিক হাসান", "👉 তপু চৌধুরী", 
    "👉 সায়মন আহমেদ", "👉 ফাহিম মাহমুদ", "👉 হাসিবুর রহমান", "👉 আজিজুল হক", "👉 মাহিন আহমেদ", 
    "👉 মিরাজ হোসেন", "👉 নাজমুল হুদা", "👉 আক্তারুজ্জামান", "👉 পারভেজ আহমেদ", "👉 সাদ্দাম হোসেন", 
    "👉 মোবারক আলী", "👉 উজ্জ্বল হোসেন", "👉 মুন্না মিয়া", "👉 শওকত আলী", "👉 মানিক রহমান",
    // নতুন ১০০টি ইংলিশ বাংলাদেশী নাম
    "👉 Anisul Islam", "👉 Badrul Hasan", "👉 Faysal Chowdhury", "👉 Golam Kibria", "👉 Harun Rashid",
    "👉 Jahangir Khan", "👉 Kamal Uddin", "👉 Lutfur Rahman", "👉 Nurul Islam", "👉 Omar Faruk",
    "👉 Quazi Rahman", "👉 Rofiqul Islam", "👉 Selim Reza", "👉 Tofazzal Hossain", "👉 Uzzal Ahmed",
    "👉 Wahiduzzaman", "👉 Yeamin Khan", "👉 Zahirul Haque", "👉 Abul Kalam", "👉 Bashir Ahmed",
    "👉 Delwar Hossain", "👉 Emranul Haque", "👉 Forhad Ali", "👉 Gazi Salauddin", "👉 Hiron Mia",
    "👉 Iqbal Khan", "👉 Jabbar Sheikh", "👉 Khalilur Rahman", "👉 Mainul Haque", "👉 Nazmul Islam",
    "👉 Palash Das", "👉 Rashedul Islam", "👉 Salim Mia", "👉 Tanvir Hasan", "👉 Ubaidul Islam",
    "👉 Wasiul Islam", "👉 Yusuf Ali", "👉 Zaker Hossain", "👉 Altaf Hossain", "👉 Badshah Mia",
    "👉 Dilip Kumar", "👉 Ekramul Haque", "👉 Firoz Ahmed", "👉 Giasuddin Ahmed", "👉 Habibur Rahman",
    "👉 Imran Khan", "👉 Jamal Uddin", "👉 Karim Khan", "👉 Liton Islam", "👉 Mozammel Haque",
    "👉 Naimul Islam", "👉 Obaidullah", "👉 Prodip Das", "👉 Rafiqul Alam", "👉 Samsul Haque",
    "👉 Tarikul Islam", "👉 Uttam Kumar", "👉 Waliullah", "👉 Yasin Ali", "👉 Zillur Rahman",
    "👉 Ariful Haque", "👉 Babul Mia", "👉 Chan Mia", "👉 Dulu Mia", "👉 Emon Hossain",
    "👉 Farid Ahmed", "👉 Golam Rabbani", "👉 Hafizur Rahman", "👉 Ilias Mia", "👉 Jahid Hasan",
    "👉 Kazi Safi", "👉 Lokman Hossain", "👉 Montu Mia", "👉 Nayeem Ahmed", "👉 Omar Sharif",
    "👉 Pintu Das", "👉 Razu Ahmed", "👉 Saiful Alam", "👉 Tuhin Khan", "👉 Uzzal Bhuiyan",
    "👉 Wazed Ali", "👉 Yaqub Ali", "👉 Zulfiqar Ali", "👉 Ashraful Islam", "👉 Babu Sheikh",
    "👉 Chandan Kumar", "👉 Dipu Kumar", "👉 Ershadul Haque", "👉 Faysal Ahmed", "👉 Gani Mia",
    "👉 Helal Uddin", "👉 Jewel Rana", "👉 Kawsar Ahmed", "👉 Lovely Akter", "👉 Mahmudul Hasan"
];

const products=[
 {t:"Surfshark VPN",i:"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjpmH7BQNeXQ9HZ7PmR9M7QIErSX2VqbZu1OI9EpaaIUMOG9FcbXd6XDW2UGqZX_fBQwA-K0ptl6BTe1C3PSdn8Us0eQtHHpbRVEz8i3c5UAvz4WTiT8nvU4aQvLh1Sx40jr1Vn6cqfKPfmDnddh6UjZeI3YEw_fy-4AuN1SR0km2QeFqofQor_eP1mtjWJ/s1600/VPN.webp",link:"#"},
 {t:"Bangla Landing Page",i:"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiVGg0YYnxoCdfPHPPJDv5yXNGBmWomtWvZ7mImJ_JCZ3ugaRAyzQ1zFgDKGPuM076_H-AlCeoJ26kVv8Om0wW7EcE8_THkNvBK8Eap1EDeqvP_FvG-PZM7DNK6D451plLcF1Q5fIQIdqobZKF0xpBaR_i0k5AgvOdPSefdlZ3hxK55ZxGX3rGWkMnKGcgf/s1600/Bangla-Landing-Page.webp",link:"#"},
 {t:"300+CV Bundle",i:"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjg_B9paQPdPuZ_N7X1iAdP9vjVtHGdWYaNRQ9nsdZr8lESA5V_74w8dhMP2vU_2dxA_J_X6QbjVUFsa4sEhA3Wa6Cqia08phbsaH8hLZLVmn8rzTrnomBRslSOpDAOrmcybLqAhXW6F-i9LcxCivQY7ylfROl-oYVJcOHCfSgyn9sxislJkr8dkcQktLhH/s1600/300+cvbundle.webp",link:"#"},
 {t:"Truecaller Premium",i:"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgR8W8WROeVxHgdk4r8m_GrQZkPymlAho7sxz97zTF0r6t0jh2W6YpaE5bcxM86ZLbATFEn2EGVvEawlp0B7hOgO_XErQV4C-pFofFQAOaPiOqSPXGjPs6ny5mEHgwyE9z8GMo1lYFZ2r3sap3argt4i9qwuSnAH5-cQc0h42ovO7Qf0LuQD4J_dQXm8rzS/s1600/Truecaller-premium.png",link:"#"},
  {t:"IMO Pro",i:"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhHm-uLdgjHvtFKS_xYdrDiVTkmloB98xRrp6WlnFeJzadTz9PHcuXoGjdRIVTEkkI3RTnpy1FO2Ig0yKjmgKB6l4-dmQ4OtlAhQuCE70ANmifyxizAVD53R9G7v9JKsreivGXvGUshWB21VwXSgkCxM8cgvNvbiGqJkkehYGBabkB5ezrN2uGn2xfdBrGt/s1600/Imo-pro.png",link:"#"}
];

const box=document.getElementById("snBox");
const img=document.getElementById("snImg");
const nameEl=document.getElementById("snName");
const textEl=document.getElementById("snText");
const timeEl=document.getElementById("snTime");

if(!box) return;

// ✅ time
function timeTxt(){
  const m=Math.floor(Math.random()*7)+2;
  return bn(m)+" "+TXT_MIN;
}

// ✅ show
function show(){

  const n=names[Math.floor(Math.random()*names.length)];
  const p=products[Math.floor(Math.random()*products.length)];

  img.src=p.i;
  nameEl.innerText=n;

  // 🔥 Bangla SAFE render
  textEl.innerText=p.t+" "+TXT_ORDER;
  timeEl.innerText=timeTxt();

  box.classList.add("active");

  setTimeout(()=>{box.classList.remove("active");},4500);

  setTimeout(show, Math.random()*20000+15000);
}

setTimeout(show,4000);

});
