// estrabismo.js - Controle dos efeitos de estrabismo vertical, horizontal e diagonal

// Efeitos disponíveis
const EFFECTS = {
    VERTICAL: {
        id: 'estrabismoVertical',
        transform: 'translateY(-20px)',
        color: 'rgba(20, 20, 20, 0.7)'
    },
    HORIZONTAL: {
        id: 'estrabismoHorizontal',
        transform: 'translateX(20px)',
        color: 'rgba(20, 20, 20, 0.7)'
    },
    DIAGONAL: {
        id: 'estrabismoComplexo',
        transform: 'translate(10px, -10px)',
        color: 'rgba(20, 20, 20, 0.7)'
    }
};

// Variável para armazenar o elemento de efeito atual
let currentEffectElement = null;

// Inicialização quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    // Registra todos os efeitos no EffectManager
    registerStrabismusEffects();
    
    // Configura os listeners dos itens do menu
    setupMenuListeners();
});

// Registra os efeitos no sistema central
function registerStrabismusEffects() {
    for (const effectKey in EFFECTS) {
        const effect = EFFECTS[effectKey];
        
        EffectManager.registerEffect(
            effect.id,
            () => activateStrabismusEffect(effect),
            () => deactivateStrabismusEffect(effect)
        );
    }
}

// Configura os listeners do menu
function setupMenuListeners() {
    for (const effectKey in EFFECTS) {
        const effect = EFFECTS[effectKey];
        const menuItem = document.getElementById(effect.id);
        
        if (menuItem) {
            menuItem.addEventListener('click', () => {
                EffectManager.activateEffect(effect.id);
            });
        }
    }
}

// Ativa um efeito de estrabismo
function activateStrabismusEffect(effect) {
    // Remove qualquer efeito anterior
    deactivateStrabismusEffect(effect);
    
    // Obtém o stream da câmera principal
    const mainCamera = document.getElementById('camera');
    if (!mainCamera?.srcObject) return;

    // Cria o elemento de vídeo para o efeito
    currentEffectElement = document.createElement('video');
    currentEffectElement.className = `camera-effect ${effect.id}`;
    currentEffectElement.autoplay = true;
    currentEffectElement.playsinline = true;
    currentEffectElement.srcObject = mainCamera.srcObject;

    // Define a transformação base – se a câmera estiver no modo frontal, já deve estar invertida;
    // para os efeitos, concatenamos: se estiver frontal, usamos "scaleX(-1) " + efeito, 
    // caso contrário, apenas o efeito.
    let baseTransform = "";
    if (currentFacingMode === "user") {
        baseTransform = "scaleX(-1) ";
    }

    // Aplica os estilos com os prefixos para compatibilidade em dispositivos móveis
    currentEffectElement.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        object-fit: cover;
        opacity: 0.4;
        transform: ${baseTransform}${effect.transform};
        -webkit-transform: ${baseTransform}${effect.transform};
        z-index: 1;
        pointer-events: none;
    `;

    // Adiciona ao documento
    document.body.appendChild(currentEffectElement);
    
    // Atualiza o item do menu
    document.getElementById(effect.id).classList.add('ativo');
}

// Desativa um efeito de estrabismo
function deactivateStrabismusEffect(effect) {
    // Remove o elemento de efeito se existir
    if (currentEffectElement) {
        currentEffectElement.remove();
        currentEffectElement = null;
    }
    
    // Remove a classe 'ativo' do item do menu
    const menuItem = document.getElementById(effect.id);
    if (menuItem) menuItem.classList.remove('ativo');
}

// Função para desativar todos os efeitos de estrabismo
function deactivateAllStrabismusEffects() {
    for (const effectKey in EFFECTS) {
        const effect = EFFECTS[effectKey];
        deactivateStrabismusEffect(effect);
    }
}

// Adiciona ao EffectManager a função para desativar todos os efeitos
window.deactivateAllEffects = function() {
    deactivateAllStrabismusEffects();
    // Outros efeitos podem ser adicionados aqui
};