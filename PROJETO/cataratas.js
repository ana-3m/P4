// catarata.js
// catarata.js
const CATARATAS_EFFECT = {
    id: 'cataratas',
    type: 'cataratas',
    opacity: 0.7,
    blurAmount: 8
};

let canvasOverlay = null;
let animationFrameId = null;

document.addEventListener('DOMContentLoaded', () => {
    EffectManager.registerEffect(
        CATARATAS_EFFECT.id,
        () => activateCataratasEffect(),
        () => deactivateCataratasEffect()
    );
});

function activateCataratasEffect() {
    // Adiciona a classe ativo ao item do menu
    const menuItem = document.getElementById(CATARATAS_EFFECT.id);
    if (menuItem) menuItem.classList.add('ativo');

    const videoElement = document.getElementById('camera');
    if (!videoElement) return;

    // Cria o canvas overlay
    canvasOverlay = document.createElement('canvas');
    canvasOverlay.id = "cataratasOverlay";
    canvasOverlay.classList.add('cataratas-effect'); // Adiciona classe para controle via CSS
    document.body.appendChild(canvasOverlay);

    // Estilos podem ser movidos para o CSS
    canvasOverlay.style.position = 'fixed';
    canvasOverlay.style.top = '0';
    canvasOverlay.style.left = '0';
    canvasOverlay.style.width = '100%';
    canvasOverlay.style.height = '100%';
    canvasOverlay.style.pointerEvents = 'none';
    canvasOverlay.style.zIndex = '2';

    function resizeCanvas() {
        if (!canvasOverlay || !videoElement) return;
        canvasOverlay.width = videoElement.videoWidth || window.innerWidth;
        canvasOverlay.height = videoElement.videoHeight || window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    function drawEffect() {
        if (!canvasOverlay) return;

        const ctx = canvasOverlay.getContext('2d');
        ctx.clearRect(0, 0, canvasOverlay.width, canvasOverlay.height);
        
        // Aplica o efeito de blur
        ctx.filter = `blur(${CATARATAS_EFFECT.blurAmount}px)`;
        ctx.drawImage(videoElement, 0, 0, canvasOverlay.width, canvasOverlay.height);
        
        // Adiciona a camada branca semi-transparente
        ctx.filter = 'none';
        ctx.fillStyle = `rgba(255, 255, 255, ${CATARATAS_EFFECT.opacity})`;
        ctx.fillRect(0, 0, canvasOverlay.width, canvasOverlay.height);

        animationFrameId = requestAnimationFrame(drawEffect);
    }

    drawEffect();
}

function deactivateCataratasEffect() {
    // Remove a classe ativo do item do menu
    const menuItem = document.getElementById(CATARATAS_EFFECT.id);
    if (menuItem) menuItem.classList.remove('ativo');

    // Limpa a animação
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }

    // Remove o canvas
    if (canvasOverlay) {
        canvasOverlay.remove();
        canvasOverlay = null;
    }
}

window.deactivateAllEffects = function() {
    deactivateCataratasEffect();
};