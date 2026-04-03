 
 
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


// ====== Character & Word Counter ======
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

// Initialize counters
['CONVERTEDT','EDT'].forEach(id => {
    const textarea = document.getElementById(id);
    textarea.addEventListener('input', () => updateCounter(id));
    textarea.addEventListener('paste', () => setTimeout(() => updateCounter(id), 10));
});

// ====== Copy ======
function copyAny(id) {
    const textarea = document.getElementById(id);
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(textarea.value);
    } else {
        textarea.select();
        document.execCommand('copy');
    }
}

// ====== Paste ======
function pasteAny(id) {
    const textarea = document.getElementById(id);
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.readText().then(text => {
            textarea.value = text;
            updateCounter(id); // ✅ Update counter after paste
        });
    } else {
        textarea.focus();
    }
}

// ====== Clear ======
function clearAny(id) {
    const textarea = document.getElementById(id);
    textarea.value = "";
    updateCounter(id); // ✅ Update counter after clear
    textarea.focus();
}

// ====== Swap & Undo ======
let lastSwap = { t1: "", t2: "" };
function swapAny(id1, id2) {
    const t1 = document.getElementById(id1);
    const t2 = document.getElementById(id2);

    lastSwap.t1 = t1.value;
    lastSwap.t2 = t2.value;

    const temp = t1.value;
    t1.value = t2.value;
    t2.value = temp;

    // ✅ Update counters after swap
    updateCounter(id1);
    updateCounter(id2);

    t1.focus();
}

function undoSwap() {
    const t1 = document.getElementById('CONVERTEDT');
    const t2 = document.getElementById('EDT');

    if (lastSwap.t1 !== "" || lastSwap.t2 !== "") {
        t1.value = lastSwap.t1;
        t2.value = lastSwap.t2;

        // ✅ Update counters after undo
        updateCounter('CONVERTEDT');
        updateCounter('EDT');

        t1.focus();
    }
}

// ====== Download as Word (.doc) with Font & Timestamp ======
function downloadDoc(textareaId, type, fontName) {
    const textarea = document.getElementById(textareaId);
    const text = textarea.value;

    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
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
 
// clear all text area   
  function ClearInput() {
        document.getElementById("EDT").value = '';
        document.getElementById("CONVERTEDT").value = '';
        document.getElementById("EDT").focus();
    }  
  