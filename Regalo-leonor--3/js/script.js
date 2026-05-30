// Control de Ventanas Emergentes (Modales)
function openModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
    if(modalId === 'surprise-modal') {
        initScratchCard(); // Inicializa el lienzo interactivo al abrir el juego
    }
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Acción de soplar la vela del pastel
function blowCandle() {
    document.getElementById('cake-image').src = "https://i.postimg.co/DZs98NfS/cake-off.gif";
    document.getElementById('candle-instruction').style.display = 'none';
    document.getElementById('wish-message').style.display = 'block';
}

// --- SISTEMA INTERACTIVO DE RASCA Y GANA ---
let canvasInit = false;
function initScratchCard() {
    if (canvasInit) return; // Evita recrear la capa si vuelve a abrir la ventana
    
    const canvas = document.getElementById('scratch-canvas');
    const ctx = canvas.getContext('2d');
    
    // Pintar superficie superior (Rosa pastel elegante)
    ctx.fillStyle = '#e1bee7';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Texto guía sobre la raspadita
    ctx.fillStyle = '#4a148c';
    ctx.font = 'bold 18px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✨ RASCA AQUÍ ✨', canvas.width / 2, canvas.height / 2 + 5);

    let isDrawing = false;

    // Lógica para remover píxeles de la capa superior
    function scratch(e) {
        if (!isDrawing) return;
        
        const rect = canvas.getBoundingClientRect();
        // Detecta coordenadas tanto para mouse como para pantallas táctiles de celulares
        const x = (e.clientX || e.touches[0].clientX) - rect.left;
        const y = (e.clientY || e.touches[0].clientY) - rect.top;
        
        ctx.globalCompositeOperation = 'destination-out'; // Cambia el pincel a modo borrador
        ctx.beginPath();
        ctx.arc(x, y, 25, 0, Math.PI * 2); // Radio de borrado
        ctx.fill();
    }

    // Eventos para Computadoras (Mouse)
    canvas.addEventListener('mousedown', () => isDrawing = true);
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mousemove', scratch);

    // Eventos para Teléfonos Móviles (Touch)
    canvas.addEventListener('touchstart', () => isDrawing = true);
    canvas.addEventListener('touchend', () => isDrawing = false);
    canvas.addEventListener('touchmove', scratch);
    
    canvasInit = true;
}
