// cataratas2.js - Filtro de cataratas simplificado (sem shaders)
let cataractElements = {
    overlay: null,
    blurContainer: null
};

document.addEventListener('DOMContentLoaded', () => {
    EffectManager.registerEffect(
        'cataratas',
        startCataratas,
        stopCataratas
    );

    document.getElementById('cataratas')?.addEventListener('click', () => {
        EffectManager.activateEffect('cataratas');
    });
});

function startCataratas() {
    const camera = document.getElementById('camera');
    
    // Cria container para os efeitos
    cataractElements.blurContainer = document.createElement('div');
    cataractElements.blurContainer.style.position = 'absolute';
    cataractElements.blurContainer.style.top = '0';
    cataractElements.blurContainer.style.left = '0';
    cataractElements.blurContainer.style.width = '100%';
    cataractElements.blurContainer.style.height = '100%';
    cataractElements.blurContainer.style.overflow = 'hidden';
    
    // Clona a câmera para aplicar efeitos sem modificar a original
    const cameraClone = camera.cloneNode(true);
    cameraClone.style.filter = 'blur(8px) brightness(1.2)';
    cameraClone.style.width = '100%';
    cameraClone.style.height = '100%';
    cameraClone.style.objectFit = 'cover';
    
    // Adiciona overlay branco semi-transparente
    cataractElements.overlay = document.createElement('div');
    cataractElements.overlay.style.position = 'absolute';
    cataractElements.overlay.style.top = '0';
    cataractElements.overlay.style.left = '0';
    cataractElements.overlay.style.width = '100%';
    cataractElements.overlay.style.height = '100%';
    cataractElements.overlay.style.backgroundColor = 'rgba(255, 255, 255, 0.3)';
    cataractElements.overlay.style.pointerEvents = 'none';
    
    // Monta a estrutura
    cataractElements.blurContainer.appendChild(cameraClone);
    cataractElements.blurContainer.appendChild(cataractElements.overlay);
    camera.parentNode.insertBefore(cataractElements.blurContainer, camera);
    camera.style.display = 'none';
    
    // Efeito dinâmico de variação
    let currentOpacity = 0.3;
    let direction = 0.01;
    
    cataractElements.interval = setInterval(() => {
        currentOpacity += direction;
        if (currentOpacity > 0.4 || currentOpacity < 0.2) {
            direction *= -1;
        }
        cataractElements.overlay.style.backgroundColor = `rgba(255, 255, 255, ${currentOpacity})`;
    }, 100);
    
    document.getElementById('cataratas').classList.add('ativo');
}

function stopCataratas() {
    const camera = document.getElementById('camera');
    
    // Remove todos os elementos de efeito
    if (cataractElements.blurContainer) {
        cataractElements.blurContainer.remove();
        cataractElements.blurContainer = null;
    }
    
    if (cataractElements.interval) {
        clearInterval(cataractElements.interval);
    }
    
    // Restaura a câmera original
    camera.style.display = 'block';
    document.getElementById('cataratas').classList.remove('ativo');
}