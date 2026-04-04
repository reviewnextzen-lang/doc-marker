

let biCropper = null;

  function openbirthPosterModal() {
      setActiveMode('mode-birth-poster');
      document.getElementById('birthPosterModal').style.display = 'flex';
      resizeBiPreview(); 
  }

  function closebirthPosterModal() {
      document.getElementById('birthPosterModal').style.display = 'none';
      resetbirthPoster();
  }

  // Update Data and Templates
  function updateBithPoster() {
      document.getElementById('out-bi-name').innerText = document.getElementById('bi-name').value || 'আপনার নাম';
      document.getElementById('out-bi-title').innerText = document.getElementById('bi-title').value || 'আপনার পদবি';
      document.getElementById('out-bi-address').innerText = document.getElementById('bi-address').value || 'আপনার ঠিকানা';
      document.getElementById('out-bi-msg').innerText = document.getElementById('bi-msg').value || 'সবাইকে পবিত্র ঈদুল ফিতরের শুভেচ্ছা ও অভিনন্দন';
      
      // Update Theme and Layout dynamically
      const poster = document.getElementById('birth-poster-export');
      const theme = document.getElementById('bi-theme').value;
      const layout = document.getElementById('bi-layout').value;
      poster.className = 'ep-poster-export-birth' + theme + ' ' + layout;
  }

  // Load and Init Crop
  function loadBiPhoto(event) {
      const file = event.target.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = function(e) {
              const image = document.getElementById('bi-crop-image');
              image.src = e.target.result;
              document.getElementById('ep-cropper-modal-birth').style.display = 'flex';
              
              if (biCropper) {
                  biCropper.destroy();
              }
              // Initialize Cropper.js
              biCropper = new Cropper(image, {
                  aspectRatio: 1, // 1:1 Square/Circle crop
                  viewMode: 1,
                  autoCropArea: 1
              });
          }
          reader.readAsDataURL(file);
      }
  }

  // Save Cropped Image
  function saveBiCrop() {
      if (biCropper) {
          const canvas = biCropper.getCroppedCanvas({
              width: 500,
              height: 500
          });
          document.getElementById('out-bi-photo').src = canvas.toDataURL('image/jpeg', 0.95);
          closeBiCrop();
      }
  }

  // Close Cropper Modal
  function closeBiCrop() {
      document.getElementById('ep-cropper-modal').style.display = 'none';
      document.getElementById('bith-photo-in').value = ''; 
      if(biCropper) {
          biCropper.destroy();
          biCropper = null;
      }
  }

  // Responsive Scaling for Mobile Preview
  function resizeBiPreview() {
      const wrapper = document.getElementById('bi-preview-wrapper');
      const poster = document.getElementById('birth-poster-export');
      if(!wrapper || !poster) return;
      
      const wrapperWidth = wrapper.clientWidth;
      if(wrapperWidth < 820) {
          const scale = wrapperWidth / 840; 
          poster.style.transform = `scale(${scale})`;
          wrapper.style.height = `${800 * scale}px`;
      } else {
          poster.style.transform = `scale(1)`;
          wrapper.style.height = `800px`;
      }
  }
  window.addEventListener('resize', resizeBiPreview);

  // High Quality Download using html2canvas
  function downloadbirthPoster() {
      const poster = document.getElementById('birth-poster-export');
      const btn = document.getElementById('btn-bi-download');
      
      // Remove transform scale so html2canvas captures full 800x800 res
      poster.style.transform = 'scale(1)';
      
      btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> প্রসেসিং হচ্ছে...';
      btn.style.opacity = '0.7';
      btn.disabled = true;

      html2canvas(poster, {
          scale: 2, // 1600x1600 output resolution (HD)
          useCORS: true,
          backgroundColor: null
      }).then(canvas => {
          let link = document.createElement('a');
          link.download = 'Birthday_Poster.jpg';
          link.href = canvas.toDataURL('image/jpeg', 1.0);
          link.click();
          
          btn.innerHTML = '<i class="fa-solid fa-download"></i> HD ডাউনলোড';
          btn.style.opacity = '1';
          btn.disabled = false;
          resizeBiPreview(); // Restore mobile view
      }).catch(err => {
          console.error("Poster Error: ", err);
          btn.innerHTML = '<i class="fa-solid fa-download"></i> HD ডাউনলোড';
          btn.disabled = false;
          resizeBiPreview();
      });
  }

  function resetbirthPoster() {
      document.getElementById('bi-name').value = '';
      document.getElementById('bi-title').value = '';
      document.getElementById('bi-address').value = '';
      document.getElementById('bi-msg').value = 'সবাইকে পবিত্র ঈদুল ফিতরের শুভেচ্ছা ও অভিনন্দন';
      document.getElementById('bi-theme').value = 'theme-blue';
      document.getElementById('bi-layout').value = 'layout-1';
      document.getElementById('out-bi-photo').src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'><path fill='%2394a3b8' d='M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z'/></svg>";
      updateBithPoster();
  }