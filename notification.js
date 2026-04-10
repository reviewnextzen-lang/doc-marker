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
 "👉 শামীম আহমেদ","👉 নাহিদ হাসান","👉 সাইফুল ইসলাম",
 "👉 Tanvir Hasan","👉 Imran Khan","👉 Mahmudul Hasan"
];

const products=[
 {t:"Photoshop Premium",i:"https://i.imgur.com/ztHlyUO.jpeg"},
 {t:"Canva Lifetime",i:"https://i.imgur.com/WbW6AEr.jpeg"},
 {t:"YouTube Premium",i:"https://i.imgur.com/k8RYKkU.jpeg"}
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