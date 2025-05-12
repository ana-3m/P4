   let CATARATAS_EFFECT = {
        id: 'cataratas',
        type: 'cataratas',
        opacity: 0.3, // Ajuste de opacidade para simular difusão de luz
        blurAmount: 10 // Intensidade do desfoque
    };

   // let currentCanvasOverlay = null;

    document.addEventListener('DOMContentLoaded', () => {
        EffectManager.registerEffect(
            CATARATAS_EFFECT.id,
            () => activateCataratasEffect(),
            () => deactivateCataratasEffect()
        );
    });

    function activateCataratasEffect() {
        //deactivateCataratasEffect(); // Remove overlays anteriores

        // Criar um canvas overlay
        currentCanvasOverlay = document.createElement('canvas');
        currentCanvasOverlay.id = "canvasOverlay";
        currentCanvasOverlay.style.position = 'fixed';
        currentCanvasOverlay.style.top = '0';
        currentCanvasOverlay.style.left = '0';
        currentCanvasOverlay.style.width = '100vw';
        currentCanvasOverlay.style.height = '100vh';
        currentCanvasOverlay.style.pointerEvents = 'none';
        currentCanvasOverlay.style.zIndex = '2';

        document.body.appendChild(currentCanvasOverlay);

        currentCanvasOverlay.width = window.innerWidth;
        currentCanvasOverlay.height = window.innerHeight;

        const ctx = currentCanvasOverlay.getContext('2d');
        ctx.fillStyle = `rgba(255, 255, 255, ${CATARATAS_EFFECT.opacity})`; // Leve opacidade branca para difusão
        ctx.fillRect(0, 0, currentCanvasOverlay.width, currentCanvasOverlay.height);

        // Aplica o efeito de desfoque
        ctx.filter = `blur(${CATARATAS_EFFECT.blurAmount}px)`;

        // Marca o efeito como ativo
        const menuItem = document.getElementById(CATARATAS_EFFECT.id);
        if (menuItem) menuItem.classList.add('ativo');
    }

    function deactivateCataratasEffect() {
        if (currentCanvasOverlay) {
            currentCanvasOverlay.remove();
            currentCanvasOverlay = null;
        }
        const menuItem = document.getElementById(CATARATAS_EFFECT.id);
        if (menuItem) menuItem.classList.remove('ativo');
    }

    window.deactivateAllEffects = function () {
        deactivateCataratasEffect();
    };