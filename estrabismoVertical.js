// estrabismo.js
let duplicatedCameraVertical = null;
let duplicatedCameraHorizontal = null;
let duplicatedCameraDiagonal = null;

function setupEstrabismoFilters() {
    setupEstrabismoVertical();
    setupEstrabismoHorizontal();
    setupEstrabismoDiagonal();
}

// Vertical (já existente)
function setupEstrabismoVertical() {
    const menuItem = document.getElementById("estrabismoVertical");
    if (menuItem) {
        menuItem.addEventListener("click", () => {
            toggleEstrabismoVertical();
            // Desativa outros efeitos
            removeDuplicatedCameraHorizontal();
            removeDuplicatedCameraDiagonal();
        });
    }
}

function toggleEstrabismoVertical() {
    if (duplicatedCameraVertical) {
        removeDuplicatedCameraVertical();
    } else {
        createDuplicatedCameraVertical();
    }
}

function createDuplicatedCameraVertical() {
    removeAllCameraEffects();
    
    const mainCamera = document.getElementById('camera');
    if (!mainCamera?.srcObject) return;

    duplicatedCameraVertical = document.createElement('video');
    duplicatedCameraVertical.className = 'camera-effect estrabismo-vertical';
    duplicatedCameraVertical.autoplay = true;
    duplicatedCameraVertical.playsinline = true;
    duplicatedCameraVertical.srcObject = mainCamera.srcObject;

    duplicatedCameraVertical.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        object-fit: cover;
        opacity: 0.4;
        transform: translateY(-30px);
        z-index: 1;
    `;

    document.body.appendChild(duplicatedCameraVertical);
}

function removeDuplicatedCameraVertical() {
    if (duplicatedCameraVertical) {
        duplicatedCameraVertical.remove();
        duplicatedCameraVertical = null;
    }
}

// Horizontal
function setupEstrabismoHorizontal() {
    const menuItem = document.getElementById("estrabismoHorizontal");
    if (menuItem) {
        menuItem.addEventListener("click", () => {
            toggleEstrabismoHorizontal();
            // Desativa outros efeitos
            removeDuplicatedCameraVertical();
            removeDuplicatedCameraDiagonal();
        });
    }
}

function toggleEstrabismoHorizontal() {
    if (duplicatedCameraHorizontal) {
        removeDuplicatedCameraHorizontal();
    } else {
        createDuplicatedCameraHorizontal();
    }
}

function createDuplicatedCameraHorizontal() {
    removeAllCameraEffects();
    
    const mainCamera = document.getElementById('camera');
    if (!mainCamera?.srcObject) return;

    duplicatedCameraHorizontal = document.createElement('video');
    duplicatedCameraHorizontal.className = 'camera-effect estrabismo-horizontal';
    duplicatedCameraHorizontal.autoplay = true;
    duplicatedCameraHorizontal.playsinline = true;
    duplicatedCameraHorizontal.srcObject = mainCamera.srcObject;

    duplicatedCameraHorizontal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        object-fit: cover;
        opacity: 0.4;
        transform: translateX(30px);
        z-index: 1;
    `;

    document.body.appendChild(duplicatedCameraHorizontal);
}

function removeDuplicatedCameraHorizontal() {
    if (duplicatedCameraHorizontal) {
        duplicatedCameraHorizontal.remove();
        duplicatedCameraHorizontal = null;
    }
}

// Diagonal
function setupEstrabismoDiagonal() {
    const menuItem = document.getElementById("estrabismoDiagonal");
    if (menuItem) {
        menuItem.addEventListener("click", () => {
            toggleEstrabismoDiagonal();
            // Desativa outros efeitos
            removeDuplicatedCameraVertical();
            removeDuplicatedCameraHorizontal();
        });
    }
}

function toggleEstrabismoDiagonal() {
    if (duplicatedCameraDiagonal) {
        removeDuplicatedCameraDiagonal();
    } else {
        createDuplicatedCameraDiagonal();
    }
}

function createDuplicatedCameraDiagonal() {
    removeAllCameraEffects();
    
    const mainCamera = document.getElementById('camera');
    if (!mainCamera?.srcObject) return;

    duplicatedCameraDiagonal = document.createElement('video');
    duplicatedCameraDiagonal.className = 'camera-effect estrabismo-diagonal';
    duplicatedCameraDiagonal.autoplay = true;
    duplicatedCameraDiagonal.playsinline = true;
    duplicatedCameraDiagonal.srcObject = mainCamera.srcObject;

    duplicatedCameraDiagonal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        object-fit: cover;
        opacity: 0.4;
        transform: translate(20px, -20px);
        z-index: 1;
    `;

    document.body.appendChild(duplicatedCameraDiagonal);
}

function removeDuplicatedCameraDiagonal() {
    if (duplicatedCameraDiagonal) {
        duplicatedCameraDiagonal.remove();
        duplicatedCameraDiagonal = null;
    }
}

// Função auxiliar para remover todos os efeitos
function removeAllCameraEffects() {
    document.querySelectorAll('.camera-effect').forEach(el => el.remove());
    duplicatedCameraVertical = null;
    duplicatedCameraHorizontal = null;
    duplicatedCameraDiagonal = null;
}

// Configura para desativar qualquer efeito ao clicar em outros itens
document.querySelectorAll('#menu li.word').forEach(item => {
    if (!['estrabismoVertical', 'estrabismoHorizontal', 'estrabismoDiagonal'].includes(item.id)) {
        item.addEventListener("click", () => {
            removeAllCameraEffects();
        });
    }
});

// Garante que o menu fique sempre acima
document.getElementById('menu').style.zIndex = '10';

// Inicialização
if (document.readyState === 'complete') {
    setupEstrabismoFilters();
} else {
    document.addEventListener('DOMContentLoaded', setupEstrabismoFilters);
}