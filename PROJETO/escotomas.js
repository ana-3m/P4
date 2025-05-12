// escotomas.js - Controle dos efeitos de escotomas usando canvas

// Definição dos filtros para as doenças oculares
const ESCOTOMAS_EFFECTS = {
    MULTIPLOS_ESCOTOMAS: {
        id: 'multiplosEscotomas',
        type: 'multiple', // Várias manchas
        // Array de posições e tamanhos das manchas (em pixels)
        positions: [
            { x: 100, y: 150, size: 50 },
            { x: 300, y: 200, size: 40 },
            { x: 500, y: 350, size: 60 }
        ],
        opacity: 0.7
    },
    ESCOTOMA_CENTRAL: {
        id: 'escotomaCentral',
        type: 'central', // Mancha central
        positions: [
            { x: 'center', y: 'center', size: 300 }
        ],
        opacity: 0.8
    },
    VISAO_TUBULAR: {
        id: 'visaoTubolar',
        type: 'tubular', // Simula a visão tubular: escurece a periferia deixando uma “janela” central
        radius: 100, // Raio claro no centro
        opacity: 0.9
    }
};

function drawScotomaWithRadialGradient(ctx, centerX, centerY, innerRadius, outerRadius) {
    // Cria o gradiente radial: do centro (innerRadius) até a borda (outerRadius)
    let gradient = ctx.createRadialGradient(centerX, centerY, innerRadius, centerX, centerY, outerRadius);
    gradient.addColorStop(0, 'rgba(0, 0, 0, 1)');   // Centro totalmente opaco
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');   // Borda transparente

    ctx.fillStyle = gradient;
    ctx.beginPath();
    // Desenha o círculo usando o outerRadius
    ctx.arc(centerX, centerY, outerRadius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
}

// Variável para armazenar o canvas atualmente aplicado
let currentCanvasOverlay = null;

// Inicializa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    registerOcularEffects();
    setupOcularMenuListeners();

    /* Opcional: atualizar o canvas se a janela mudar de tamanho
    window.addEventListener('resize', () => {
        // Se algum efeito estiver ativo, reativa-o para atualizar o tamanho
        if (currentCanvasOverlay) {
            // Preserva o id do efeito ativo e reativa
            const activeEffect = document.querySelector('.ativo')?.id;
            if (activeEffect) {
                const effect = Object.values(ESCOTOMAS_EFFECTS).find(e => e.id === activeEffect);
                if (effect) {
                    deactivateOcularEffect(effect);
                    activateOcularEffect(effect);
                }
            }
        }
    });*/
});

// Registra os efeitos no sistema central (usando o EffectManager já existente)
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

// Configura os listeners dos itens do menu para ativação dos filtros
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

// Função para ativar um filtro de escotomas usando canvas
function activateOcularEffect(effect) {
    // Remove qualquer efeito já aplicado
    deactivateOcularEffect(effect);

    // Verifica se a câmara principal está ativa
    const mainCamera = document.getElementById('camera');
    if (!mainCamera?.srcObject) return;

    // Cria e configura o canvas overlay
    currentCanvasOverlay = document.createElement('canvas');
    currentCanvasOverlay.id = "canvasOverlay";
    currentCanvasOverlay.style.position = 'fixed';
    currentCanvasOverlay.style.top = '0';
    currentCanvasOverlay.style.left = '0';
    currentCanvasOverlay.style.width = '100vw';
    currentCanvasOverlay.style.height = '100vh';
    currentCanvasOverlay.style.pointerEvents = 'none';
    currentCanvasOverlay.style.zIndex = '2';

    // Adiciona o canvas ao documento
    document.body.appendChild(currentCanvasOverlay);

    // Garante que o canvas tenha o tamanho total da janela
    currentCanvasOverlay.width = window.innerWidth;
    currentCanvasOverlay.height = window.innerHeight;

    const ctx = currentCanvasOverlay.getContext('2d');

    // De acordo com o tipo de efeito, desenha as manchas ou o efeito tubular
    if (effect.type === 'multiple' || effect.type === 'central') {
        effect.positions.forEach(pos => {
            let x = pos.x, y = pos.y;
            if (x === 'center') x = currentCanvasOverlay.width / 2;
            if (y === 'center') y = currentCanvasOverlay.height / 2;
            // Se quiser um gradiente radial, defina um innerRadius (pode ser zero ou um valor pequeno)
            let innerRadius = 0; // Centro com opacidade total
            let outerRadius = pos.size; // O tamanho máximo da mancha
            drawScotomaWithRadialGradient(ctx, x, y, innerRadius, outerRadius);
        });
    } else if (effect.type === 'tubular') {
        // Desenha uma sobreposição preta cobrindo a tela inteira
        ctx.fillStyle = `rgba(0, 0, 0, ${effect.opacity})`;
        ctx.fillRect(0, 0, currentCanvasOverlay.width, currentCanvasOverlay.height);

        // Utiliza a operação de composição para "recortar" uma área central circular
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.arc(
            currentCanvasOverlay.width / 2,
            currentCanvasOverlay.height / 2,
            effect.radius, 0, 2 * Math.PI
        );
        ctx.fill();

        // Reseta a operação de composição
        ctx.globalCompositeOperation = 'source-over';
    }

    // Marca o item do menu como ativo
    const menuItem = document.getElementById(effect.id);
    if (menuItem) menuItem.classList.add('ativo');
}

// Função para desativar o efeito de escotomas
function deactivateOcularEffect(effect) {
    if (currentCanvasOverlay) {
        currentCanvasOverlay.remove();
        currentCanvasOverlay = null;
    }
    const menuItem = document.getElementById(effect.id);
    if (menuItem) menuItem.classList.remove('ativo');
}

// Função para desativar todos os efeitos de escotomas
function deactivateAllOcularEffects() {
    for (const effectKey in ESCOTOMAS_EFFECTS) {
        const effect = ESCOTOMAS_EFFECTS[effectKey];
        deactivateOcularEffect(effect);
    }
};

// Adiciona ao EffectManager a função para desativar todos os efeitos
window.deactivateAllEffects = function () {
    deactivateAllOcularEffects();
    // Outros efeitos podem ser adicionados aqui
};