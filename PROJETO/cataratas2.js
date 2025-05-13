<<<<<<< Updated upstream
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

=======
// cataratas2.js - Filtro de cataratas usando efeito de blur
let cataratasCanvas;
let p5Instance;
let isCataratasActive = false;

document.addEventListener('DOMContentLoaded', () => {
    // Registra o efeito
    EffectManager.registerEffect(
        'cataratas',
        activateCataratas,
        deactivateCataratas
    );

    // Configura o listener
>>>>>>> Stashed changes
    document.getElementById('cataratas')?.addEventListener('click', () => {
        EffectManager.activateEffect('cataratas');
    });
});

<<<<<<< Updated upstream
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
=======
function activateCataratas() {
    if (isCataratasActive) return;
    
    const camera = document.getElementById('camera');
    camera.style.display = 'none'; // Esconde o vídeo original
    
    // Inicializa p5.js
    p5Instance = new p5(cataratasSketch, document.body);
    isCataratasActive = true;
>>>>>>> Stashed changes
    
    document.getElementById('cataratas').classList.add('ativo');
}

<<<<<<< Updated upstream
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
=======
function deactivateCataratas() {
    if (!isCataratasActive) return;
    
    // Remove o canvas do p5
    if (p5Instance) {
        p5Instance.remove();
        p5Instance = null;
    }
    
    // Mostra o vídeo original novamente
    const camera = document.getElementById('camera');
    camera.style.display = 'block';
    isCataratasActive = false;
    
    document.getElementById('cataratas').classList.remove('ativo');
}

// Sketch p5.js para o efeito de cataratas
function cataratasSketch(p) {
    let cam;
    let blurAmount = 10; // Intensidade do blur
    
    p.setup = function() {
        // Cria um canvas do tamanho da câmera
        const camera = document.getElementById('camera');
        p.createCanvas(camera.offsetWidth, camera.offsetHeight);
        
        // Captura o vídeo da câmera
        cam = p.createCapture(p.VIDEO);
        cam.size(p.width, p.height);
        cam.hide();
    };
    
    p.draw = function() {
        // Aplica o efeito de blur
        p.image(cam, 0, 0, p.width, p.height);
        p.filter(p.BLUR, blurAmount);
        
        // Adiciona um leve efeito de "opacidade" para simular catarata
        p.fill(255, 255, 255, 30);
        p.rect(0, 0, p.width, p.height);
    };
    
    p.windowResized = function() {
        const camera = document.getElementById('camera');
        p.resizeCanvas(camera.offsetWidth, camera.offsetHeight);
        cam.size(p.width, p.height);
    };
>>>>>>> Stashed changes
}