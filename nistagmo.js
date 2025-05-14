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
    
    nistagmoInterval = setInterval(() => {
        camera.style.transform = `translateX(${direction * 5}px) scaleX(${(window.innerWidth + 2) / window.innerWidth})`;
        direction *= -1;
    }, speed);
    
    document.getElementById('nistagmo').classList.add('ativo');
}

function stopNistagmo() {
    if (nistagmoInterval) {
        clearInterval(nistagmoInterval);
        nistagmoInterval = null;
        document.getElementById('camera').style.transform = 'translateX(0px) scaleX(1)';
        document.getElementById('nistagmo').classList.remove('ativo');
    }
}