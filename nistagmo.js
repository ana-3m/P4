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

function startNistagmo() {
    const camera = document.getElementById('camera');
    let direction = 1;
    const speed = 70;
    
    // Define o baseline: se a câmera for frontal, ela já foi configurada com scaleX(-1) em startCamera
    const baseTransform = (currentFacingMode === "user") ? "scaleX(-1)" : "";
    
    nistagmoInterval = setInterval(() => {
        // Apenas acrescenta a translação ao baseline já configurado
        camera.style.transform = `translateX(${direction * 5}px)` + (currentFacingMode === "user" ? " scaleX(-1)" : "");
        direction *= -1;
    }, speed);
    
    document.getElementById('nistagmo').classList.add('ativo');
}

function stopNistagmo() {
    if (nistagmoInterval) {
        clearInterval(nistagmoInterval);
        nistagmoInterval = null;
        // Restaura o baseline: se frontal, mantém o scaleX(-1); se não, sem escala.
        document.getElementById('camera').style.transform = (currentFacingMode === "user") ? "scaleX(-1)" : "none";
        document.getElementById('nistagmo').classList.remove('ativo');
    }
}