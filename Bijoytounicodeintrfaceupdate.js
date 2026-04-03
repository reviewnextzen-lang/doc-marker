 
 
 // open model
function openbijoytounicodeModal(){
    if(typeof setActiveMode === "function") setActiveMode("mode-bijoy-unicode-tool");
    document.getElementById("bijoytounicodeModal").style.display = "flex";
    document.body.style.overflow = "hidden";
}
// close model
function closebijoytounicodeModal(){
    document.getElementById("bijoytounicodeModal").style.display = "none";
    document.body.style.overflow = "auto";
    document.getElementById("txtInput-sg").value = "";
}



window.addEventListener('load', function() {

  // ===== Counter =====
  function updateCounter(textareaId) {
      const textarea = document.getElementById(textareaId);
      const charOutput = document.getElementById(`outputChars_${textareaId}`);
      const wordOutput = document.getElementById(`outputWords_${textareaId}`);
      const text = textarea.value;
      const charCount = text.length;
      const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
      charOutput.innerText = `Characters: ${charCount}`;
      wordOutput.innerText = `Words: ${wordCount}`;
  }

  ['CONVERTEDT','EDT'].forEach(id => {
      const textarea = document.getElementById(id);
      textarea.addEventListener('input', () => updateCounter(id));
      textarea.addEventListener('paste', () => setTimeout(() => updateCounter(id), 10));
  });

  // ===== Helper to safely set textarea value and update counter =====
  function setTextareaValue(id, value) {
      const textarea = document.getElementById(id);
      textarea.value = value;
      updateCounter(id);
  }

  // ===== Copy / Paste / Clear with button feedback =====
  function showTempText(button, text) {
      const original = button.innerText;
      button.innerText = text;
      setTimeout(() => button.innerText = original, 1200);
  }

  window.copyAny = function(id, button) {
      const textarea = document.getElementById(id);
      if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.writeText(textarea.value);
      } else {
          textarea.select();
          document.execCommand('copy');
      }
      if(button) showTempText(button, "Copied!");
  }

  window.pasteAny = function(id, button) {
      const textarea = document.getElementById(id);
      if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard.readText().then(text => {
              setTextareaValue(id, text);
              if(button) showTempText(button, "Pasted!");
          });
      } else {
          textarea.focus();
      }
  }

  window.clearAny = function(id, button) {
      setTextareaValue(id, "");
      if(button) showTempText(button, "Cleared!");
  }

  // ===== Swap & Undo =====
  let lastSwap = { t1: "", t2: "" };
  window.swapAny = function(id1, id2) {
      const t1 = document.getElementById(id1);
      const t2 = document.getElementById(id2);

      lastSwap.t1 = t1.value;
      lastSwap.t2 = t2.value;

      const temp = t1.value;
      setTextareaValue(id1, t2.value);
      setTextareaValue(id2, temp);

      t1.focus();
  }

  window.undoSwap = function() {
      if (lastSwap.t1 !== "" || lastSwap.t2 !== "") {
          setTextareaValue('CONVERTEDT', lastSwap.t1);
          setTextareaValue('EDT', lastSwap.t2);
          document.getElementById('CONVERTEDT').focus();
      }
  }

  // ===== Download Word (.doc) =====
  window.downloadDoc = function(textareaId, type, fontName) {
      const textarea = document.getElementById(textareaId);
      const text = textarea.value;

      const today = new Date();
      const yyyy = today.getFullYear();
      const mm = String(today.getMonth() + 1).padStart(2,'0');
      const dd = String(today.getDate()).padStart(2,'0');
      const timestamp = `${yyyy}-${mm}-${dd}`;
      const filename = `${type}_${timestamp}.doc`;

      const htmlContent = `
        <html xmlns:o='urn:schemas-microsoft-com:office:office'
              xmlns:w='urn:schemas-microsoft-com:office:word'
              xmlns='http://www.w3.org/TR/REC-html40'>
        <head>
            <meta charset="UTF-8">
            <style>
                body { font-family: ${fontName}, Arial, sans-serif; font-size: 14pt; }
                p { margin: 0 0 10px; }
            </style>
        </head>
        <body>
            <p>${text.replace(/\n/g, "<br>")}</p>
        </body>
        </html>
      `;

      const blob = new Blob(['\ufeff', htmlContent], { type: 'application/msword' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
  }

});
 
// clear all text area   
  function ClearInput() {
        document.getElementById("EDT").value = '';
        document.getElementById("CONVERTEDT").value = '';
        document.getElementById("EDT").focus();
    }  
  