// colorFilters.js - Filtros de daltonismo e acromatopsia
document.addEventListener('DOMContentLoaded', () => {
    // Registra os filtros no EffectManager
    registerColorFilters();
    
    // Configura os listeners do menu
    setupColorFilterListeners();
});

const COLOR_FILTERS = {
    tritanopia: {
        apply: () => applyColorFilter('tritanopia-filter'),
        remove: () => removeColorFilter()
    },
    protanopia: {
        apply: () => applyColorFilter('protanopia-filter'),
        remove: () => removeColorFilter()
    },
    deuteranopia: {
        apply: () => applyColorFilter('deuteranopia-filter'),
        remove: () => removeColorFilter()
    },
    acromatopsia: {
        apply: () => applyColorFilter('grayscale(100%)'),
        remove: () => removeColorFilter()
    }
};

function registerColorFilters() {
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

function applyColorFilter(filterValue) {
    const video = document.getElementById('camera');
    if (filterValue.includes('filter')) {
        video.style.filter = `url(#${filterValue})`;
    } else {
        video.style.filter = filterValue;
    }
}

function removeColorFilter() {
    document.getElementById('camera').style.filter = 'none';
    document.querySelectorAll('[data-filter]').forEach(btn => {
        btn.classList.remove('ativo');
    });
}