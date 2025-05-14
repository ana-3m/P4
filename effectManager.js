// effectManager.js - Versão atualizada
let currentEffect = null;
const effectCallbacks = {};

function registerEffect(effectName, activateCallback, deactivateCallback) {
    effectCallbacks[effectName] = {
        activate: activateCallback,
        deactivate: deactivateCallback
    };
}

function activateEffect(effectName) {
    // Desativa o efeito atual se existir
    if (currentEffect && currentEffect !== effectName) {
        deactivateCurrentEffect();
    }
    
    // Alterna o efeito se já estiver ativo
    if (currentEffect === effectName) {
        deactivateCurrentEffect();
        return;
    }
    
    // Ativa o novo efeito
    if (effectCallbacks[effectName]) {
        effectCallbacks[effectName].activate();
        currentEffect = effectName;
    }
}

function deactivateCurrentEffect() {
    if (!currentEffect) return;
    
    if (effectCallbacks[currentEffect]) {
        effectCallbacks[currentEffect].deactivate();
    }
    
    currentEffect = null;
}

function isCurrentEffect(effectName) {
    return currentEffect === effectName;
}

function isEffectActive() {
    return currentEffect !== null;
}

// Exporta as funções para uso em outros arquivos
window.EffectManager = {
    registerEffect,
    activateEffect,
    deactivateCurrentEffect,
    isCurrentEffect,
    isEffectActive
};