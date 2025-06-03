// daltonismo.js - Filtros de daltonismo e acromatopsia via canvas com CSS filter
document.addEventListener('DOMContentLoaded', () => {
    registerFilters();
    setupColorFilterListeners();
});

const COLOR_FILTERS = {
    tritanopia: {
        apply: () => applyColorFilter('tritanopia'),
        remove: () => removeColorFilter()
    },
    protanopia: {
        apply: () => applyColorFilter('protanopia'),
        remove: () => removeColorFilter()
    },
    deuteranopia: {
        apply: () => applyColorFilter('deuteranopia'),
        remove: () => removeColorFilter()
    },
    acromatopsia: {
        apply: () => applyColorFilter('grayscale'),
        remove: () => removeColorFilter()
    }
};

// Variáveis para o canvas e seu contexto
let colorCanvas = null;
let colorCtx = null;

function registerFilters() {
    for (const filterName in COLOR_FILTERS) {
        EffectManager.registerEffect(
            filterName,
            COLOR_FILTERS[filterName].apply,
            COLOR_FILTERS[filterName].remove
        );
    }
}

function setupColorFilterListeners() {
    document.querySelectorAll('[data-filter]').forEach(button => {
        const filterName = button.dataset.filter;
        button.addEventListener('click', () => {
            // Alterna o filtro (se já estiver ativo, desativa)
            if (EffectManager.isCurrentEffect(filterName)) {
                EffectManager.deactivateCurrentEffect();
                button.classList.remove('ativo');
            } else {
                EffectManager.activateEffect(filterName);
                button.classList.add('ativo');
            }
        });
    });
}

function applyColorFilter(filterName) {
    const video = document.getElementById('camera');

    // Remove qualquer canvas existente antes de criar um novo
    removeColorFilter();

    // Cria o canvas para processar o vídeo
    colorCanvas = document.createElement("canvas");
    colorCanvas.id = "colorCanvas";
    colorCanvas.style.position = "fixed";
    colorCanvas.style.top = "0";
    colorCanvas.style.left = "0";
    colorCanvas.style.width = "100vw";
    colorCanvas.style.height = "100vh";
    colorCanvas.style.pointerEvents = "none";
    colorCanvas.style.zIndex = "1";

    // Ajusta o tamanho interno para telas retina
    colorCanvas.width = window.innerWidth * devicePixelRatio;
    colorCanvas.height = window.innerHeight * devicePixelRatio;
    document.body.appendChild(colorCanvas);

    // Em vez de aplicar o filtro via contexto, definimos o filtro no próprio canvas
    switch (filterName) {
        case "tritanopia":
            colorCanvas.style.filter = "url(#tritanopia-filter)";
            break;
        case "protanopia":
            colorCanvas.style.filter = "url(#protanopia-filter)";
            break;
        case "deuteranopia":
            colorCanvas.style.filter = "url(#deuteranopia-filter)";
            break;
        case "grayscale":
            colorCanvas.style.filter = "grayscale(100%)";
            break;
        default:
            colorCanvas.style.filter = "none";
    }

    colorCtx = colorCanvas.getContext("2d");

    function drawFrame() {
        if (!colorCanvas || !video || !video.srcObject) {
            requestAnimationFrame(drawFrame);
            return;
        }

        // Limpa o canvas
        colorCtx.clearRect(0, 0, colorCanvas.width, colorCanvas.height);

        // Se a câmera estiver no modo frontal, aplica a inversão antes de desenhar
        if (currentFacingMode === "user") {
            colorCtx.save();
            // Inverte horizontalmente
            colorCtx.scale(-1, 1);
            // Depois do scale, desloca a imagem para compensar a inversão
            colorCtx.drawImage(video, -colorCanvas.width, 0, colorCanvas.width, colorCanvas.height);
            colorCtx.restore();
        } else {
            // Para câmeras traseiras, desenha normalmente
            colorCtx.drawImage(video, 0, 0, colorCanvas.width, colorCanvas.height);
        }

        // Atualiza o frame usando requestAnimationFrame
        requestAnimationFrame(drawFrame);
    }

    drawFrame();
}

function removeColorFilter() {
    if (colorCanvas) {
        colorCanvas.remove();
        colorCanvas = null;
    }
    document.getElementById('camera').style.filter = 'none';
    document.querySelectorAll('[data-filter]').forEach(btn => {
        btn.classList.remove('ativo');
    });
}