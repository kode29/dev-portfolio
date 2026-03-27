const uploadedFiles = [];

const overlay = document.getElementById("dropOverlay");
const fileList = document.getElementById("fileList");

document
  .getElementById("downloadZipBtn")
  .addEventListener("click", downloadZip);
document.getElementById("clearBtn").addEventListener("click", clearList);

/* -------------------------
   Drag & Drop (Viewport)
------------------------- */

window.addEventListener("dragenter", (e) => {
  e.preventDefault();
  overlay.classList.add("active");
});

window.addEventListener("dragover", (e) => {
  e.preventDefault();
});

window.addEventListener("dragleave", (e) => {
  if (e.clientX === 0 && e.clientY === 0) {
    overlay.classList.remove("active");
  }
});

window.addEventListener("drop", (e) => {
  e.preventDefault();
  overlay.classList.remove("active");
  handleFiles(e.dataTransfer.files);
});

/* -------------------------
   Handle Files
------------------------- */

async function handleFiles(files) {
  for (const file of files) {
    const fileObj = {
      originalFile: file,
      convertedBlob: null,
      status: "processing",
    };

    uploadedFiles.push(fileObj);
    renderList();

    try {
      const result = await convertPDF(file);
      fileObj.convertedBlob = result;
      fileObj.status = "done";
    } catch (err) {
      console.error(err);
      fileObj.status = "error";
    }

    renderList();
  }
}

/* -------------------------
   Convert PDF → JPG
------------------------- */

async function convertPDF(file) {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument(new Uint8Array(arrayBuffer)).promise;

  const page = await pdf.getPage(1); // single-page assumption

  const viewport = page.getViewport({ scale: 3 });

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = viewport.width;
  canvas.height = viewport.height;

  await page.render({
    canvasContext: ctx,
    viewport: viewport,
  }).promise;

  return await new Promise((resolve) =>
    canvas.toBlob(resolve, "image/jpeg", 0.95)
  );
}

/* -------------------------
   Render List
------------------------- */

function renderList() {
  fileList.innerHTML = "";

  uploadedFiles.forEach((file) => {
    const div = document.createElement("div");
    div.className = "file-item";

    const name = document.createElement("div");
    name.innerText = file.originalFile.name;

    const status = document.createElement("div");
    status.className = `file-status ${file.status}`;

    if (file.status === "processing") {
      status.innerText = "Processing...";
    }

    if (file.status === "done") {
      const link = document.createElement("a");
      link.href = URL.createObjectURL(file.convertedBlob);
      link.download = file.originalFile.name.replace(".pdf", ".jpg");
      link.innerText = "Download";
      status.appendChild(link);
    }

    if (file.status === "error") {
      status.innerText = "Error";
    }

    div.appendChild(name);
    div.appendChild(status);

    fileList.appendChild(div);
  });
}

/* -------------------------
   Download ZIP
------------------------- */

async function downloadZip() {
  const zip = new JSZip();

  uploadedFiles.forEach((file) => {
    if (file.status === "done") {
      const name = file.originalFile.name.replace(".pdf", ".jpg");
      zip.file(name, file.convertedBlob);
    }
  });

  const content = await zip.generateAsync({ type: "blob" });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(content);
  link.download = "converted-files.zip";
  link.click();
}

/* -------------------------
   Clear List
------------------------- */

function clearList() {
  uploadedFiles.length = 0;
  renderList();
}
