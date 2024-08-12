const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth - 40;
canvas.height = window.innerHeight - 150;

let painting = false;
let tool = 'brush'; // Текущий инструмент (кисть или ластик)

function startPosition(e) {
    painting = true;
    draw(e);
}

function endPosition() {
    painting = false;
    ctx.beginPath();
}

function draw(e) {
    if (!painting) return;

    ctx.lineWidth = document.getElementById('size').value;
    ctx.lineCap = 'round';

    if (tool === 'brush') {
        ctx.strokeStyle = document.getElementById('color').value;
    } else if (tool === 'eraser') {
        ctx.strokeStyle = '#ffffff'; // Ластик рисует белым
    }

    ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);

document.getElementById('clear').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Функция для сохранения изображения
document.getElementById('save').addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'my_painting.png';
    link.href = canvas.toDataURL();
    link.click();
});

// Открытие файла
document.getElementById('upload').addEventListener('click', () => {
    document.getElementById('fileInput').click();
});

document.getElementById('fileInput').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0, img.width, img.height);
            }
            img.src = event.target.result;
        }
        reader.readAsDataURL(file);
    }
});

// Выбор инструмента
document.getElementById('brushTool').addEventListener('click', () => {
    tool = 'brush';
    document.getElementById('brush').innerText = 'Brush';
});

document.getElementById('eraserTool').addEventListener('click', () => {
    tool = 'eraser';
    document.getElementById('brush').innerText = 'Rubber';
});
