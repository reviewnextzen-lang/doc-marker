 function openNpCardModal() {
    if (typeof setActiveMode === &quot;function&quot;) setActiveMode(&#39;mode-student-np&#39;);
    document.getElementById(&#39;BookCardModal&#39;).style.display = &#39;flex&#39;;
}

function closeNpCardModal() {
    document.getElementById(&#39;BookCardModal&#39;).style.display = &#39;none&#39;;
} 
  
 let bkLogoImg = null;
  let bkStudentImg = null;
  let bkCurrentLang = 'en';
  let bkOrient = 'h'; 

  function setBookOrient(mode) {
    bkOrient = mode;
    document.getElementById('bk-h-btn').classList.toggle('active', mode === 'h');
    document.getElementById('bk-v-btn').classList.toggle('active', mode === 'v');
    drawBookCard();
  }

  function setBookLang(lang) {
    bkCurrentLang = lang;
    const elements = {
      'bk-main-title': lang === 'bn' ? '<i class="fa-solid fa-address-card"></i> বইরে কাভার নেইমল্পেট মেকার' : '<i class="fa-solid fa-address-card"></i> Book Name Plate Maker',
      'bk-lbl-inst-name': lang === 'bn' ? 'প্রতিষ্ঠানের নাম' : 'Institution Name',
      'bk-txt-up-logo': lang === 'bn' ? 'লোগো আপলোড' : 'Upload Logo',
      'bk-txt-up-photo': lang === 'bn' ? 'ছাত্রের ছবি' : 'Book Cover Photo',
      'bk-lbl-name': lang === 'bn' ? 'ছাত্র/ছাত্রীর নাম' : 'Student Name',
      'bk-lbl-class': lang === 'bn' ? 'শ্রেণী' : 'Class',
      'bk-lbl-roll': lang === 'bn' ? 'রোল নং' : 'Roll No',
      'bk-lbl-book': lang === 'bn' ? 'বইয়ের নাম' : 'Book Name',
      'bk-lbl-blood': lang === 'bn' ? 'রক্তের গ্রুপ' : 'Blood Group',
      'bk-lbl-phone': lang === 'bn' ? 'ফোন' : 'Phone',
      'bk-lbl-theme': lang === 'bn' ? 'কার্ডের থিম কালার' : 'Card Theme Color',
      'bk-intro-text': lang === 'bn' ? 'প্রফেশনাল বই নেইমল্পেট তৈরি করুন (৩.৩৭ x ২.১২৫ ইঞ্চি)। এটি স্টুডিও প্রিন্টিংয়ের জন্য উপযুক্ত।' : 'Professional Book Name Plate (3.37 x 2.125 in). Ready for studio printing.'
    };
    for (let id in elements) {
      let el = document.getElementById(id);
      if(el) el.innerHTML = elements[id];
    }
    drawBookCard();
  }

  function loadBookAsset(event, type) {
    const reader = new FileReader();
    reader.onload = function(e) {
      const img = new Image();
      img.onload = function() {
        if (type === 'logo') bkLogoImg = img;
        else bkStudentImg = img;
        document.getElementById('bk-canvas').style.display = 'block';
        document.getElementById('bk-placeholder').style.display = 'none';
        drawBookCard();
      };
      img.src = e.target.result;
    };
    if(event.target.files[0]) reader.readAsDataURL(event.target.files[0]);
  }

  function drawBookCard() {
    const canvas = document.getElementById('bk-canvas');
    const ctx = canvas.getContext('2d');
    if(bkOrient === 'h') { canvas.width=1012; canvas.height=638; }
    else { canvas.width=638; canvas.height=1012; }

    const themeColor = document.getElementById('bk-color').value;
    const inst = document.getElementById('bk-inst').value || (bkCurrentLang==='bn'?'প্রতিষ্ঠানের নাম':'INSTITUTION NAME');
    const name = document.getElementById('bk-name').value || (bkCurrentLang==='bn'?'ছাত্রের নাম':'STUDENT NAME');
    const s_class = document.getElementById('bk-class').value;
    const roll = document.getElementById('bk-roll').value;
    const book = document.getElementById('bk-book').value;
    const blood = document.getElementById('bk-blood').value;
    const phone = document.getElementById('bk-phone').value;
    const fontBN='SolaimanLipi', fontEN='Arial', activeFont = bkCurrentLang==='bn'?fontBN:fontEN;

    ctx.fillStyle="#fff"; ctx.fillRect(0,0,canvas.width,canvas.height);
    if(bkOrient==='h'){
      ctx.fillStyle=themeColor; ctx.fillRect(0,0,canvas.width,180);
      ctx.fillStyle="#fff"; ctx.textAlign="center"; ctx.font=`bold 42px ${activeFont}`;
      ctx.fillText(inst, canvas.width/2+50, 80);
      ctx.font=`24px ${activeFont}`; ctx.fillText(bkCurrentLang==='bn'?'স্টুডেন্ট':'Student', canvas.width/2+50, 130);
      if(bkLogoImg) ctx.drawImage(bkLogoImg,40,30,120,120);
      ctx.strokeStyle=themeColor; ctx.lineWidth=5; ctx.strokeRect(50,220,240,290);
      if(bkStudentImg) ctx.drawImage(bkStudentImg,55,225,230,280);
      ctx.textAlign="left"; ctx.fillStyle=themeColor; ctx.font=`bold 36px ${activeFont}`; ctx.fillText(name,330,260);
      ctx.fillStyle="#374151"; ctx.font=`26px ${activeFont}`; let y=320;
      const labels=bkCurrentLang==='bn'?['শ্রেণী','রোল','বইয়ের নাম','রক্ত','ফোন']:['Class','Roll','Book Name','Blood','Phone'];
      const values=[s_class,roll,book,blood,phone];
      labels.forEach((l,i)=>{ctx.fillStyle="#6b7280";ctx.fillText(l+" :",330,y);ctx.fillStyle="#111827";ctx.font=`bold 26px ${activeFont}`;ctx.fillText(values[i]||'---',480,y);y+=50;});
      ctx.fillStyle=themeColor; ctx.fillRect(0,600,canvas.width,38);
    } else {
      ctx.fillStyle=themeColor; ctx.fillRect(0,0,canvas.width,220);
      if(bkLogoImg) ctx.drawImage(bkLogoImg,canvas.width/2-50,20,100,100);
      ctx.fillStyle="#fff"; ctx.textAlign="center"; ctx.font=`bold 35px ${activeFont}`; ctx.fillText(inst,canvas.width/2,160);
      ctx.font=`20px ${activeFont}`; ctx.fillText(bkCurrentLang==='bn'?'স্টুডেন্ট':'Student',canvas.width/2,195);
      ctx.strokeStyle=themeColor; ctx.lineWidth=5; ctx.strokeRect(canvas.width/2-110,250,220,270);
      if(bkStudentImg) ctx.drawImage(bkStudentImg,canvas.width/2-105,255,210,260);
      ctx.fillStyle=themeColor; ctx.font=`bold 34px ${activeFont}`; ctx.fillText(name,canvas.width/2,580);
      ctx.textAlign="left"; ctx.font=`24px ${activeFont}`; y=640;
      const labels=bkCurrentLang==='bn'?['শ্রেণী','রোল','বইয়ের নাম','রক্ত','ফোন']:['Class','Roll','Book Name','Blood','Phone'];
      const values=[s_class,roll,book,blood,phone];
      labels.forEach((l,i)=>{ctx.fillStyle="#6b7280";ctx.fillText(l+":",100,y);ctx.fillStyle="#111827";ctx.font=`bold 24px ${activeFont}`;ctx.fillText(values[i]||'---',220,y);y+=55;});
      ctx.fillStyle=themeColor; ctx.fillRect(0,canvas.height-40,canvas.width,40);
    }
  }

  function downloadBookCard() {
    const canvas=document.getElementById('bk-canvas');
    if(!bkStudentImg && !bkLogoImg) return alert("Please fill data and upload photo!");
    const link=document.createElement('a');
    link.download='Book_Card.jpg';
    link.href=canvas.toDataURL('image/jpeg',1.0);
    link.click();
  }

  function resetBookCard() {
    bkLogoImg=null; bkStudentImg=null;
    document.querySelectorAll('.bk-inputs-side input').forEach(i=>i.value='');
    document.getElementById('bk-canvas').style.display='none';
    document.getElementById('bk-placeholder').style.display='flex';
    setBookLang('en'); setBookOrient('h');
  }  
  