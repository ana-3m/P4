// escotomas.js - Controle dos efeitos de escotomas usando canvas com posições aleatórias e gradiente para visão tubular

const ESCOTOMAS_EFFECTS = {
    MULTIPLOS_ESCOTOMAS: {
        id: 'multiplosEscotomas',
        type: 'multiple',
        generatePositions: (count, canvasWidth, canvasHeight) => {
            const positions = [];
            for (let i = 0; i < count; i++) {
                const size = Math.floor(Math.random() * (150 - 30) + 30); // Tamanho entre 30 e 150 pixels
                const x = Math.floor(Math.random() * canvasWidth);
                const y = Math.floor(Math.random() * canvasHeight);
                positions.push({ x, y, size });
            }
            return positions;
        },
    },
    ESCOTOMA_BINASAL: {
        id: 'escotomaBinasal',
        type: 'binasal',
        opacity: 0.8
    },
    ESCOTOMA_BITEMPORAL: {
        id: 'escotomaBitemporal',
        type: 'bitemporal',
        opacity: 0.8
    },
    ESCOTOMA_ALTITUDINAL_INFERIOR: {
        id: 'escotomaAltitudinalInferior',
        type: 'altitudinalInferior',
        opacity: 0.8
    },
    ESCOTOMA_ALTITUDINAL_SUPERIOR: {
        id: 'escotomaAltitudinalSuperior',
        type: 'altitudinalSuperior',
        opacity: 0.8
    },
    ESCOTOMA_CENTRAL: {
        id: 'escotomaCentral',
        type: 'central',
        positions: [
            { x: 'center', y: 'center', size: 300 }
        ],
    },
    VISAO_TUBULAR: {
        id: 'visaoTubular',
        type: 'tubular',
        radius: 10, // Raio da área central clara
    }
};

// ******************************* DESENHO DOS ESCOTOMAS ***************************

function drawScotomaWithRadialGradient(ctx, centerX, centerY, innerRadius, outerRadius) {
    let gradient = ctx.createRadialGradient(centerX, centerY, innerRadius, centerX, centerY, outerRadius);
    gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');   // Centro totalmente opaco
    gradient.addColorStop(0.8, 'rgba(0, 0, 0, 0.95)');   // Centro totalmente opaco
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');   // Borda transparente

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, outerRadius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
}

function drawTubularVisionEffect(ctx, width, height, centerRadius) {
    const gradient = ctx.createRadialGradient(
        width / 2, height / 2, width / 2,  // Bordas escuras começam cedo
        width / 2, height / 2, centerRadius // Centro mais claro
    );

    // Opacidade máxima nas bordas, reduzindo até o centro
    gradient.addColorStop(0.6, 'rgba(0, 0, 0, 1)');  // Borda totalmente escura
    gradient.addColorStop(0.7, 'rgba(0, 0, 0, 0.9)');  // Borda totalmente escura
    gradient.addColorStop(0.8, 'rgba(0, 0, 0, 0.5)'); // Meio-transição
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');   // Centro totalmente claro

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
}

function drawBinasalEffect(ctx, width, height) {
    const gradient = ctx.createLinearGradient(width / 4, 0, 3 * width / 4, 0);
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0)'); // Transparente na borda esquerda da faixa
    gradient.addColorStop(0.1, 'rgba(0, 0, 0, 0.95)'); // Transparente na borda esquerda da faixa
    gradient.addColorStop(0.5, 'rgba(0, 0, 0, 1)'); // Opaco no centro
    gradient.addColorStop(0.9, 'rgba(0, 0, 0, 0.95)'); // Transparente na borda esquerda da faixa
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)'); // Transparente na borda direita da faixa

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(width / 4, 0);
    ctx.lineTo(3 * width / 4, 0);
    ctx.lineTo(3 * width / 4, height);
    ctx.lineTo(width / 4, height);
    ctx.closePath();
    ctx.fill();
}

function drawBitemporalEffect(ctx, width, height) {
    // Lado esquerdo: opaco na borda, transparente na parte interna
    const leftGradient = ctx.createLinearGradient(0, 0, width / 4, 0);
    leftGradient.addColorStop(0, 'rgba(0, 0, 0, 1)');
    leftGradient.addColorStop(0.9, 'rgba(0, 0, 0, 0.95)');
    leftGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = leftGradient;
    ctx.fillRect(0, 0, width / 4, height);

    // Lado direito: transparente na parte interna, opaco na borda
    const rightGradient = ctx.createLinearGradient(3 * width / 4, 0, width, 0);
    rightGradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
    rightGradient.addColorStop(0.1, 'rgba(0, 0, 0, 0.95)');
    rightGradient.addColorStop(1, 'rgba(0, 0, 0, 1)');
    ctx.fillStyle = rightGradient;
    ctx.fillRect(3 * width / 4, 0, width / 4, height);
}

function drawAltitudinalInferiorEffect(ctx, width, height) {
    const gradient = ctx.createLinearGradient(0, height / 2, 0, height);
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0)'); // Transparente no centro
    gradient.addColorStop(0.1, 'rgba(0, 0, 0, 0.95)');    // Opaco no topo
    gradient.addColorStop(1, 'rgba(0, 0, 0, 1)'); // Opaco na base

    ctx.fillStyle = gradient;
    ctx.fillRect(0, height / 2, width, height / 2);
}

function drawAltitudinalSuperiorEffect(ctx, width, height) {
    const gradient = ctx.createLinearGradient(0, 0, 0, height / 2);
    gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');    // Opaco no topo
    gradient.addColorStop(0.9, 'rgba(0, 0, 0, 0.95)');    // Opaco no topo
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');    // Transparente no meio

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height / 2);
}

// ************************ IMLEMENTAÇÃO DOS FILTROS **************

let currentCanvasOverlay = null;

document.addEventListener('DOMContentLoaded', () => {
    registerOcularEffects();
    setupOcularMenuListeners();
});

function registerOcularEffects() {
    for (const effectKey in ESCOTOMAS_EFFECTS) {
        const effect = ESCOTOMAS_EFFECTS[effectKey];
        EffectManager.registerEffect(
            effect.id,
            () => activateOcularEffect(effect),
            () => deactivateOcularEffect(effect)
        );
    }
}

function setupOcularMenuListeners() {
    for (const effectKey in ESCOTOMAS_EFFECTS) {
        const effect = ESCOTOMAS_EFFECTS[effectKey];
        const menuItem = document.getElementById(effect.id);

        if (menuItem) {
            menuItem.addEventListener('click', () => {
                EffectManager.activateEffect(effect.id);
            });
        }
    }
}

function activateOcularEffect(effect) {
    deactivateOcularEffect(effect);

    selectedEffect = effect.id; // Atualiza qual efeito está ativo

    const canvas = document.createElement('canvas');
    canvas.id = "canvasOverlay";
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100vw';
    canvas.style.height = '100vh';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';

    document.body.appendChild(canvas);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext('2d');

    if (effect.type === 'multiple') {
        const num = Math.floor(Math.random() * (9 - 1) + 1);
        const positions = effect.generatePositions(num, canvas.width, canvas.height);

        positions.forEach(({ x, y, size }) => {
            drawScotomaWithRadialGradient(ctx, x, y, 0, size);
        });
    } else if (effect.type === 'binasal') {
        drawBinasalEffect(ctx, canvas.width, canvas.height, effect.opacity);
    } else if (effect.type === 'bitemporal') {
        drawBitemporalEffect(ctx, canvas.width, canvas.height, effect.opacity);
    } else if (effect.type === 'altitudinalInferior') {
        drawAltitudinalInferiorEffect(ctx, canvas.width, canvas.height, effect.opacity);
    } else if (effect.type === 'altitudinalSuperior') {
        drawAltitudinalSuperiorEffect(ctx, canvas.width, canvas.height, effect.opacity);
    } else if (effect.type === 'central') {
        effect.positions.forEach(({ x, y, size }) => {
            if (x === 'center') x = canvas.width / 2;
            if (y === 'center') y = canvas.height / 2;
            drawScotomaWithRadialGradient(ctx, x, y, 0, size);
        });
    } else if (effect.type === 'tubular') {
        drawTubularVisionEffect(ctx, canvas.width, canvas.height, effect.radius);
    }

    const menuItem = document.getElementById(effect.id);
    if (menuItem) menuItem.classList.add('ativo');

    currentCanvasOverlay = canvas;
}

function deactivateOcularEffect(effect) {
    if (currentCanvasOverlay) {
        currentCanvasOverlay.remove();
        currentCanvasOverlay = null;
    }
    const menuItem = document.getElementById(effect.id);
    if (menuItem) menuItem.classList.remove('ativo');
}

function deactivateAllOcularEffects() {
    for (const effectKey in ESCOTOMAS_EFFECTS) {
        const effect = ESCOTOMAS_EFFECTS[effectKey];
        deactivateOcularEffect(effect);
    }
}

window.deactivateAllEffects = function () {
    deactivateAllOcularEffects();
};