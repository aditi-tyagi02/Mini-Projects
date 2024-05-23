let convertedDataURL = '';

function handleDragOver(event) {
    event.preventDefault();
    event.stopPropagation();
    document.getElementById('dropContainer').style.border = '2px dashed #555';
}

function handleDrop(event) {
    event.preventDefault();
    event.stopPropagation();
    document.getElementById('dropContainer').style.border = '2px dashed #aaa';

    const fileInput = document.getElementById('fileInput');
    fileInput.files = event.dataTransfer.files;
    convertToJPG();
}

function convertToJPG() {
    const fileInput = document.getElementById('fileInput');
    const outputDiv = document.getElementById('output');

    if (fileInput.files.length === 0) {
        alert('Please select a TIF file.');
        return;
    }

    const tifFile = fileInput.files[0];

    // Check if the selected file is a TIF file
    if (!tifFile.name.toLowerCase().endsWith('.tif') && !tifFile.name.toLowerCase().endsWith('.tiff')) {
        alert('Please select a valid TIF file.');
        return;
    }

    const reader = new FileReader();

    reader.onload = function (e) {
        const img = document.createElement('img');
        img.src = e.target.result;
        outputDiv.innerHTML = '<p>Converted Image:</p>';
        outputDiv.appendChild(img);

        // Convert TIF to JPG using a canvas
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Convert the canvas to a data URL representing a JPG image
        convertedDataURL = canvas.toDataURL('image/jpeg');
    };

    reader.readAsDataURL(tifFile);
}

function downloadJPG() {
    if (convertedDataURL) {
        const downloadLink = document.createElement('a');
        downloadLink.href = convertedDataURL;
        downloadLink.download = 'converted_image.jpg';
        downloadLink.click();
    } else {
        alert('Please convert a TIF file first.');
    }
}

function resetConverter() {
    const fileInput = document.getElementById('fileInput');
    const outputDiv = document.getElementById('output');

    fileInput.value = ''; // Clear file input
    outputDiv.innerHTML = ''; // Clear output
    convertedDataURL = ''; // Clear converted data URL
}