 function openDobModal() {
      // setActiveMode('mode-dob-checker'); // আপনার মূল ফ্রেমে যদি setActiveMode থাকে
      document.getElementById('dobModal').style.display = 'flex';
      // ডিফল্টভাবে জন্ম নিবন্ধন ট্যাব দেখাবে
      showDobTab('birth');
  }

  function closeDobModal() {
      document.getElementById('dobModal').style.display = 'none';
  }

  function showDobTab(tabName) {
      // সব ট্যাব কন্টেন্ট লুকান
      const tabContents = document.querySelectorAll('.dob-tab-content');
      tabContents.forEach(content => {
          content.style.display = 'none';
      });

      // সব ট্যাব বাটন থেকে 'active' ক্লাস সরান
      const tabButtons = document.querySelectorAll('.dob-tab-btn');
      tabButtons.forEach(button => {
          button.classList.remove('active');
      });

      // নির্বাচিত ট্যাব কন্টেন্ট দেখান এবং বাটনে 'active' ক্লাস যোগ করুন
      if (tabName === 'birth') {
          document.getElementById('birthTabContent').style.display = 'block';
          document.querySelector('.dob-tab-btn:nth-child(1)').classList.add('active');
      } else if (tabName === 'death') {
          document.getElementById('deathTabContent').style.display = 'block';
          document.querySelector('.dob-tab-btn:nth-child(2)').classList.add('active');
      }
  }

  // জন্ম নিবন্ধন ফর্মের জন্য স্ক্রিপ্ট
  const jnField = document.getElementById("UBRN");
  const copyBtn = document.getElementById("copyBtn");

  // ১৭ সংখ্যার বেশি টাইপ করা যাবে না
  if (jnField) { // Ensure element exists before adding listener
      jnField.addEventListener("input", function() {
          if(this.value.length > 17){
              this.value = this.value.slice(0, 17);
          }
      });
  }

  // কপি বাটন: বাটনের লেখা পরিবর্তন
  if (copyBtn) { // Ensure element exists before adding listener
      copyBtn.addEventListener("click", function() {
          const value = jnField.value.slice(0,17);
          if(value.length === 17){
              navigator.clipboard.writeText(value).then(() => {
                  copyBtn.textContent = "কপি হয়েছে";
                  setTimeout(() => { copyBtn.textContent = "১৭ সংখ্যা কপি করুন?"; }, 2000);
              }).catch(err => {
                  console.error("Failed to copy: ", err);
                  alert("কপি করতে ব্যর্থ হয়েছেন।");
              });
          } else {
              copyBtn.textContent = "সঠিক ১৭ সংখ্যা নেই";
              setTimeout(() => { copyBtn.textContent = "১৭ সংখ্যা কপি করুন?"; }, 2000);
          }
      });
  }

  // ফর্ম সাবমিট ভেরিফিকেশন (জন্ম নিবন্ধন)
  const ubrnForm = document.getElementById("ubrnForm");
  if (ubrnForm) { // Ensure element exists before adding listener
      ubrnForm.addEventListener("submit", function(e){
          if(jnField.value.length !== 17){
              alert("জন্ম নিবন্ধন নম্বর অবশ্যই ১৭ সংখ্যার হতে হবে।");
              e.preventDefault();
          }
      });
  }

  // মৃত্যু নিবন্ধন ফর্মের জন্য স্ক্রিপ্ট
  const deathUBRNField = document.getElementById("deathUBRN");
  const deathCopyBtn = document.getElementById("deathCopyBtn");

  // ১৭ সংখ্যার বেশি টাইপ করা যাবে না
  if (deathUBRNField) { // Ensure element exists before adding listener
      deathUBRNField.addEventListener("input", function() {
          if(this.value.length > 17){
              this.value = this.value.slice(0, 17);
          }
      });
  }

  // কপি বাটন: বাটনের লেখা পরিবর্তন
  if (deathCopyBtn) { // Ensure element exists before adding listener
      deathCopyBtn.addEventListener("click", function() {
          const value = deathUBRNField.value.slice(0,17);
          if(value.length === 17){
              navigator.clipboard.writeText(value).then(() => {
                  deathCopyBtn.textContent = "কপি হয়েছে";
                  setTimeout(() => { deathCopyBtn.textContent = "১৭ সংখ্যা কপি করুন"; }, 2000);
              }).catch(err => {
                  console.error("Failed to copy: ", err);
                  alert("কপি করতে ব্যর্থ হয়েছেন।");
              });
          } else {
              deathCopyBtn.textContent = "সঠিক ১৭ সংখ্যা নেই";
              setTimeout(() => { deathCopyBtn.textContent = "১৭ সংখ্যা কপি করুন?"; }, 2000);
          }
      });
  }

  // ফর্ম সাবমিট ভেরিফিকেশন (মৃত্যু নিবন্ধন)
  const deathUbrnForm = document.getElementById("deathUbrnForm");
  if (deathUbrnForm) { // Ensure element exists before adding listener
      deathUbrnForm.addEventListener("submit", function(e){
          if(deathUBRNField.value.length !== 17){
              alert("মৃত্যু নিবন্ধন নম্বর অবশ্যই ১৭ সংখ্যার হতে হবে।");
              e.preventDefault();
          }
      });
  }
