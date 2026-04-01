
 // open model
function openGdriveModal(){
    if(typeof setActiveMode === "function") setActiveMode("mode-gdrive-tool");
    document.getElementById("signdriveGeneratorModal").style.display = "flex";
    document.body.style.overflow = "hidden";
}
// close model
function closegdriveModal(){
    document.getElementById("signdriveGeneratorModal").style.display = "none";
    document.body.style.overflow = "auto";
    document.getElementById("txtInput-sg").value = "";
}

  // Elements
  const openBtn = document.getElementById("btnOpenModal");
  const closeBtn = document.getElementById("btnCloseModal");
  const overlay = document.getElementById("modalOverlay");

  const inputLink = document.getElementById("inputLink");
  const outputLink = document.getElementById("outputLink");
  const errorMessage = document.getElementById("errorMessage");

  const btnGenerate = document.getElementById("btnGenerate");
  const btnPaste = document.getElementById("btnPaste");
  const btnCopy = document.getElementById("btnCopy");
  const btnOpenLink = document.getElementById("btnOpenLink");
  const btnClear = document.getElementById("btnClear");
  const btnDownload = document.getElementById("btnDownload");
  const btnDownloadSVG = document.getElementById("btnDownloadSVG");

  const qrCanvas = document.getElementById("qrCanvas");
  const qrPlaceholder = document.getElementById("qrPlaceholder");
  const qrToast = document.getElementById("qrToast");

  const qrSize = document.getElementById("qrSize");
  const qrColor = document.getElementById("qrColor");

  let currentFinalLink = "";

  // Open Modal
  openBtn.onclick = () => {
    overlay.style.display = "flex";
    overlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    setTimeout(() => inputLink.focus(), 150);
  };

  // Close Modal
  closeBtn.onclick = closeModal;

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.style.display === "flex") {
      closeModal();
    }
  });

  function closeModal() {
    overlay.style.display = "none";
    overlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  }
  
  
  
  
  
  
  
  
  
  

  // =========================
  // VALIDATION + CONVERSION
  // =========================

  function extractDriveFileId(link) {
    try {
      const url = new URL(link);

      // Only allow drive.google.com or docs.google.com
      if (
        !url.hostname.includes("drive.google.com") &&
        !url.hostname.includes("docs.google.com")
      ) {
        return null;
      }

      // Format 1: /file/d/FILE_ID/view
      let match = url.pathname.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
      if (match && match[1]) return match[1];

      // Format 2: /uc?id=FILE_ID
      let id = url.searchParams.get("id");
      if (id) return id;

      // Format 3: /open?id=FILE_ID
      if (url.pathname.includes("/open") && id) return id;

      // Format 4: /thumbnail?id=FILE_ID
      if (url.pathname.includes("/thumbnail") && id) return id;

      return null;
    } catch (err) {
      return null;
    }
  }

  function isValidGoogleDriveFileLink(link) {
    const fileId = extractDriveFileId(link);
    return !!fileId;
  }

  function convertDriveLink(link) {
    const fileId = extractDriveFileId(link);
    if (!fileId) return null;
    return `https://drive.google.com/uc?export=download&id=${fileId}`;
  }

  // =========================
  // UI HELPERS
  // =========================

  function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = "block";
    inputLink.style.border = "2px solid #ef4444";
  }

  function hideError() {
    errorMessage.style.display = "none";
    inputLink.style.border = "2px solid #d7dce5";
  }

  function setLoading(state) {
    btnGenerate.classList.toggle("loading", state);
    btnGenerate.disabled = state;
  }

  let toastTimer;
  function showToast(message) {
    clearTimeout(toastTimer);
    qrToast.textContent = message;
    qrToast.classList.add("show");

    toastTimer = setTimeout(() => {
      qrToast.classList.remove("show");
    }, 2200);
  }

  function clearQRCanvas() {
    const ctx = qrCanvas.getContext("2d");
    ctx.clearRect(0, 0, qrCanvas.width, qrCanvas.height);
    qrCanvas.classList.remove("show");
    qrPlaceholder.style.display = "flex";
  }

  // =========================
  // GENERATE QR
  // =========================

  async function generateQR() {
    const raw = inputLink.value.trim();

    if (!raw) {
      showError("Please enter your Google Drive file link first.");
      clearQRCanvas();
      outputLink.value = "";
      currentFinalLink = "";
      return;
    }

    // Strict validation
    if (!isValidGoogleDriveFileLink(raw)) {
      showError("Please enter a valid Google Drive file link.");
      clearQRCanvas();
      outputLink.value = "";
      currentFinalLink = "";
      return;
    }

    hideError();
    setLoading(true);

    const finalLink = convertDriveLink(raw);

    // Safety check
    if (!finalLink) {
      showError("Invalid Google Drive file link. Please try again.");
      clearQRCanvas();
      outputLink.value = "";
      currentFinalLink = "";
      setLoading(false);
      return;
    }

    currentFinalLink = finalLink;
    outputLink.value = finalLink;

    const size = parseInt(qrSize.value, 10);
    const darkColor = qrColor.value;

    const ctx = qrCanvas.getContext("2d");
    ctx.clearRect(0, 0, qrCanvas.width, qrCanvas.height);
    qrCanvas.classList.remove("show");

    try {
      await new Promise(resolve => setTimeout(resolve, 350));

      await QRCode.toCanvas(qrCanvas, finalLink, {
        width: size,
        margin: 2,
        color: {
          dark: darkColor,
          light: "#ffffff"
        }
      });

      qrPlaceholder.style.display = "none";
      qrCanvas.classList.add("show");
      showToast("QR code generated successfully");
    } catch (error) {
      showError("QR generation failed. Please try again.");
      clearQRCanvas();
      outputLink.value = "";
      currentFinalLink = "";
    } finally {
      setLoading(false);
    }
  }

  // Generate
  btnGenerate.onclick = generateQR;

  // Paste
  btnPaste.onclick = async () => {
    try {
      const text = await navigator.clipboard.readText();

      if (!text.trim()) {
        showError("Clipboard is empty.");
        return;
      }

      inputLink.value = text.trim();
      hideError();
      showToast("Link pasted successfully");

      if (isValidGoogleDriveFileLink(text.trim())) {
        setTimeout(() => generateQR(), 300);
      } else {
        showError("The pasted link is not a valid Google Drive file link.");
        clearQRCanvas();
        outputLink.value = "";
        currentFinalLink = "";
      }
    } catch (err) {
      showError("Clipboard access failed. Paste manually.");
    }
  };

  // Auto detect on paste manually
  inputLink.addEventListener("paste", () => {
    setTimeout(() => {
      const raw = inputLink.value.trim();

      if (!raw) return;

      if (isValidGoogleDriveFileLink(raw)) {
        hideError();
        showToast("Valid Google Drive link detected");
        setTimeout(() => generateQR(), 350);
      } else {
        showError("This is not a valid Google Drive file link.");
        clearQRCanvas();
        outputLink.value = "";
        currentFinalLink = "";
      }
    }, 100);
  });

  // Copy
  btnCopy.onclick = async () => {
    const link = outputLink.value.trim();

    if (!link) {
      showError("Generate your direct link first before copying.");
      return;
    }

    try {
      await navigator.clipboard.writeText(link);
      btnCopy.innerHTML = '<i class="fa-solid fa-check"></i> Copied';
      btnCopy.classList.add("copied");
      btnCopy.disabled = true;
      showToast("Direct link copied");

      setTimeout(() => {
        btnCopy.innerHTML = '<i class="fa-regular fa-copy"></i> Copy';
        btnCopy.classList.remove("copied");
        btnCopy.disabled = false;
      }, 2000);
    } catch (error) {
      showError("Copy failed. Please copy manually.");
    }
  };

  // Open Link
  btnOpenLink.onclick = () => {
    const link = outputLink.value.trim();

    if (!link) {
      showError("Generate your direct link first before opening.");
      return;
    }

    window.open(link, "_blank");
  };

  // Clear
  btnClear.onclick = () => {
    inputLink.value = "";
    outputLink.value = "";
    currentFinalLink = "";
    hideError();
    clearQRCanvas();
    inputLink.focus();
    showToast("All fields cleared");
  };

  // Download PNG
  btnDownload.onclick = () => {
    if (!outputLink.value.trim()) {
      showError("Generate a QR code first before downloading.");
      return;
    }

    const img = qrCanvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = img;
    a.download = "google-drive-qr-code.png";
    a.click();
    showToast("PNG downloaded");
  };

  // Download SVG
  btnDownloadSVG.onclick = async () => {
    if (!currentFinalLink) {
      showError("Generate a QR code first before downloading SVG.");
      return;
    }

    try {
      const svgString = await QRCode.toString(currentFinalLink, {
        type: "svg",
        width: parseInt(qrSize.value, 10),
        margin: 2,
        color: {
          dark: qrColor.value,
          light: "#ffffff"
        }
      });

      const blob = new Blob([svgString], { type: "image/svg+xml" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "google-drive-qr-code.svg";
      a.click();

      URL.revokeObjectURL(url);
      showToast("SVG downloaded");
    } catch (err) {
      showError("SVG download failed.");
    }
  };

  // Re-generate on settings change
  qrSize.addEventListener("change", () => {
    if (currentFinalLink) generateQR();
  });

  qrColor.addEventListener("input", () => {
    if (currentFinalLink) generateQR();
  });

  // Remove error while typing
  inputLink.addEventListener("input", () => {
    hideError();
  });
