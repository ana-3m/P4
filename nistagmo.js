// nistagmo.js - Atualizado para usar o EffectManager
let nistagmoInterval = null;

document.addEventListener('DOMContentLoaded', () => {
    // Registra o efeito
    EffectManager.registerEffect(
        'nistagmo',
        startNistagmo,
        stopNistagmo
    );

    // Configura o listener
    document.getElementById('nistagmo')?.addEventListener('click', () => {
        EffectManager.activateEffect('nistagmo');
    });
});

// Exemplo em startCamera:
const camera = document.getElementById('camera');

function startNistagmo() {
    let direction = 1;
    const speed = 70;

    nistagmoInterval = setInterval(() => {
        if (currentFacingMode === "user") {
        camera.style.transform = `scaleX(-1) translateX(${direction * 5}px)`;
        camera.style.webkitTransform = `scaleX(-1) translateX(${direction * 5}px)`;
        } else {
        camera.style.transform = `translateX(${direction * 5}px)`;
        camera.style.webkitTransform = `translateX(${direction * 5}px)`;
        }
        direction *= -1;
    }, speed);

    document.getElementById('nistagmo').classList.add('ativo');
}

function stopNistagmo() {
    if (nistagmoInterval) {
        clearInterval(nistagmoInterval);
        nistagmoInterval = null;
        document.getElementById('camera').style.transform = (currentFacingMode === "user") ? "scaleX(-1)" : "none";
        document.getElementById('nistagmo').classList.remove('ativo');
    }
}