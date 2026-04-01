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
  const qrFallback = document.getElementById("qrFallback");
  const qrToast = document.getElementById("qrToast");

  const qrSize = document.getElementById("qrSize");
  const qrColor = document.getElementById("qrColor");


  
  let currentFinalLink = "";
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






  // Extract Google Drive File ID
  function extractDriveFileId(link) {
    try {
      const url = new URL(link);

      if (
        !url.hostname.includes("drive.google.com") &&
        !url.hostname.includes("docs.google.com")
      ) {
        return null;
      }

      let match = url.pathname.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
      if (match && match[1]) return match[1];

      let id = url.searchParams.get("id");
      if (id) return id;

      if (url.pathname.includes("/open") && id) return id;
      if (url.pathname.includes("/thumbnail") && id) return id;
      if (url.pathname.includes("/uc") && id) return id;

      return null;
    } catch (err) {
      return null;
    }
  }

  function isValidGoogleDriveFileLink(link) {
    return !!extractDriveFileId(link);
  }

  function convertDriveLink(link) {
    const fileId = extractDriveFileId(link);
    if (!fileId) return null;
    return `https://drive.google.com/uc?export=download&id=${fileId}`;
  }

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

  function clearQRCanvas(mode = "placeholder") {
    const ctx = qrCanvas.getContext("2d");
    ctx.clearRect(0, 0, qrCanvas.width, qrCanvas.height);
    qrCanvas.classList.remove("show");

    qrPlaceholder.style.display = "none";
    qrFallback.style.display = "none";

    if (mode === "fallback") {
      qrFallback.style.display = "flex";
    } else {
      qrPlaceholder.style.display = "flex";
    }
  }

  async function generateQR() {
    const raw = inputLink.value.trim();

    if (!raw) {
      showError("Please enter your Google Drive file link first.");
      clearQRCanvas("placeholder");
      outputLink.value = "";
      currentFinalLink = "";
      return;
    }

    if (!isValidGoogleDriveFileLink(raw)) {
      showError("Please enter a valid Google Drive file link.");
      clearQRCanvas("placeholder");
      outputLink.value = "";
      currentFinalLink = "";
      return;
    }

    hideError();
    setLoading(true);

    const finalLink = convertDriveLink(raw);

    if (!finalLink) {
      showError("Invalid Google Drive file link. Please try again.");
      clearQRCanvas("placeholder");
      outputLink.value = "";
      currentFinalLink = "";
      setLoading(false);
      return;
    }

    // Always keep direct link available
    currentFinalLink = finalLink;
    outputLink.value = finalLink;

    const size = parseInt(qrSize.value, 10);
    const darkColor = qrColor.value;

    const ctx = qrCanvas.getContext("2d");
    ctx.clearRect(0, 0, qrCanvas.width, qrCanvas.height);
    qrCanvas.classList.remove("show");
    qrPlaceholder.style.display = "none";
    qrFallback.style.display = "none";

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

      qrCanvas.classList.add("show");
      showToast("QR code generated successfully");
      hideError();

    } catch (error) {
      clearQRCanvas("fallback");
      showError("QR generation failed, but your direct download link is ready.");
      showToast("Direct link is still available");
    } finally {
      setLoading(false);
    }
  }

  btnGenerate.onclick = generateQR;

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
        clearQRCanvas("placeholder");
        outputLink.value = "";
        currentFinalLink = "";
      }
    } catch (err) {
      showError("Clipboard access failed. Paste manually.");
    }
  };

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
        clearQRCanvas("placeholder");
        outputLink.value = "";
        currentFinalLink = "";
      }
    }, 100);
  });

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

  btnOpenLink.onclick = () => {
    const link = outputLink.value.trim();

    if (!link) {
      showError("Generate your direct link first before opening.");
      return;
    }

    window.open(link, "_blank");
  };

  btnClear.onclick = () => {
    inputLink.value = "";
    outputLink.value = "";
    currentFinalLink = "";
    hideError();
    clearQRCanvas("placeholder");
    inputLink.focus();
    showToast("All fields cleared");
  };

  btnDownload.onclick = () => {
    if (!outputLink.value.trim()) {
      showError("Generate a QR code first before downloading.");
      return;
    }

    if (!qrCanvas.classList.contains("show")) {
      showError("QR preview is unavailable right now.");
      return;
    }

    const img = qrCanvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = img;
    a.download = "google-drive-qr-code.png";
    a.click();
    showToast("PNG downloaded");
  };

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

  qrSize.addEventListener("change", () => {
    if (currentFinalLink) generateQR();
  });

  qrColor.addEventListener("input", () => {
    if (currentFinalLink) generateQR();
  });

  inputLink.addEventListener("input", () => {
    hideError();
  });