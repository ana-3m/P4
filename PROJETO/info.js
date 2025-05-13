let selectedFilter = null;

// informacao para cada filtro
const filterInfo = {
    tritanopia: {
        t: "Tritanopia",
        p1: "A tritanopia é uma forma rara de daltonismo, onde as pessoas têm dificuldade em distinguir cores no espectro azul-amarelo.",
        p2: "É causada pela ausência ou disfunção dos cones do olho responsáveis por perceber o azul. Podem confundir tons de azul com verde, e amarelo com roxo."
    },
    protanopia: {
        t: "Protanopia",
        p1: "A protanopia é uma forma de daltonismo em que as pessoas têm dificuldade em distinguir cores no espectro vermelho-verde. É causada pela ausência ou disfunção dos cones da retina responsáveis por perceber a cor vermelha. ",
        p2: "Os indivíduos com protanopia podem confundir tons de vermelho com verde ou castanho, e tendem a ver o vermelho como uma cor mais escura ou acinzentada. Esta condição é hereditária e afecta principalmente os homens."
    },
    deuteranopia: {
        t: "Deuteranopia",
        p1: "A deuteranopia é uma forma comum de daltonismo, onde as pessoas têm dificuldade em distinguir cores no espectro vermelho-verde. É causada pela ausência ou disfunção dos cones da retina responsáveis por perceber a cor verde.  ",
        p2: "Indivíduos com deuteranopia podem confundir tons de verde com vermelho ou castanho, tornando certas cores mais difíceis de identificar com precisão."
    },
    estrabismoVertical: {
        t: "Estrabismo Vertical",
        p1: "Ocorre quando há um desvio vertical de um dos olhos.",
        p2: "Ex: parésia do ramo superior do III par."
    },
    estrabismoHorizontal: {
        t: "Estrabismo Horizontal",
        p1: "Ocorre quando há um desvio horizontal de um dos olhos.",
        p2: "Ex: parésia do VI par."
    },
    estrabismoComplexo: {
        t: "Estrabismo Complexo",
        p1: "Ocorre quando há um desvio horizontal e vertical de um dos olhos.",
        p2: "Ex: parésia do III par."
    },
    nistagmo: {
        t: "Nistagmo",
        p1: "Movimentos involuntarios e rápidos dos olhos.",
        p2: "Pode ser congénito ou adquirido em doenças do sistema nervoso central."
    },
    multiplosEscotomas: {
        t: "Multiplos Escotomas",
        p1: "Manchas escuras no campo visual.",
        p2: "Degenerescência Macular da Idade (DMI)."
    },
    escotomaBinasal: {
        t: "Escotoma Binasal",
        p1: "Ausencia de visão no campo nasal de cada olho.",
        p2: "Doenças das vias óticas a nível central."
    },
    escotomaBitemporal: {
        t: "Escotoma Bitemporal",
        p1: "Ausencia de visão no campo temporal de cada olho.",
        p2: "Doenças das vias óticas a nível do quiasma ótico."
    },
    escotomaAltitudinalInferior: {
        t: "Escotoma Altitudinal Inferior",
        p1: "Ausencia de visão na metade inferior do campo visual.",
        p2: "Oclusão vascular retina superior."
    },
    escotomaAltitudinalSuperior: {
        t: "Escotoma Altitudinal Superior",
        p1: "Ausencia de visão na metade superior do campo visual.",
        p2: "Oclusão vascular da retina inferior."
    },
    escotomaCentral: {
        t: "Escotoma Central",
        p1: "Ausencia de visão central.",
        p2: "Degenerescência Macular da Idade (DMI)."
    },
    visaoTubular: {
        t: "Visão Tubular",
        p1: "Perda do campo visual periférico, que resulta numa visão em tubo.",
        p2: "Estadio final de Glaucoma ou em doenças degenerativas da retina."
    },
    cataratas: {
        t: "Cataratas",
        p1: "Diminuição da visão por opacidade do cristalino.",
        p2: "Geralmente surge com a idade."
    }

};

// detecta item clicado
document.querySelectorAll('#menu .word').forEach(item => {
    item.addEventListener('click', () => {
        selectedFilter = item.getAttribute('data-filter') || item.id;

        // atualiza o conteúdo se o popup estiver visível
        if (popup.style.display === 'flex' && filterInfo[selectedFilter]) {
            const info = filterInfo[selectedFilter];
            popupContent.innerHTML = `
                <div class="titulo">${info.t}</div>
                <div class="colunas">
                    <div class="coluna">${info.p1}</div>
                    <div class="coluna">${info.p2}</div>
                </div>
            `;
        }
    });
});

// clica no botao do icon 
const infoIcon = document.getElementById('iconInfo');
const popup = document.getElementById('popupInfo');

document.getElementById('iconInfo').addEventListener('click', () => {
    if (selectedFilter && filterInfo[selectedFilter]) {
        const info = filterInfo[selectedFilter];
        const isVisible = popup.style.display === 'flex';

        // se estiver vivivel então popup aparece
        if (!isVisible) {
            // popup aparece e troca o icon
            document.getElementById('popupContent').innerHTML = `
            <div class="titulo">${info.t}</div>
            <div class="colunas">
                <div class="coluna">${info.p1}</div>
                <div class="coluna">${info.p2}</div>
            </div>
        `;
            popup.style.display = 'flex';
            infoIcon.src = 'imagem/infoClose.svg';

            // menu baixa
            menu.classList.remove('open');
            openBtn.classList.remove('open');
            icon.src = 'imagem/up.png';

        } else {
            // popup none e troca para icon original
            popup.style.display = 'none';
            infoIcon.src = 'imagem/info.svg';
        }
    }
});




