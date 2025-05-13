let selectedFilter = null;

// informacao para cada filtro
const filterInfo = {
    tritanopia: {
        t: "Tritanopia",
        p1: "A tritanopia é uma forma rara de daltonismo, onde as pessoas têm dificuldade em distinguir cores no espectro azul-amarelo.",
        p2: "É causada pela ausência ou disfunção dos cones do olho responsáveis por perceber o azul. Podem confundir tons de azul com verde, e amarelo com roxo."
    },
    protanopia : {
        t: "Protanopia",
        p1: "A protanopia é uma forma de daltonismo em que as pessoas têm dificuldade em distinguir cores no espectro vermelho-verde. É causada pela ausência ou disfunção dos cones da retina responsáveis por perceber a cor vermelha. ",
        p2: "Os indivíduos com protanopia podem confundir tons de vermelho com verde ou castanho, e tendem a ver o vermelho como uma cor mais escura ou acinzentada. Esta condição é hereditária e afecta principalmente os homens."
    },
    deuteranopia : {
        t: "Deuteranopia",
        p1: "A deuteranopia é uma forma comum de daltonismo, onde as pessoas têm dificuldade em distinguir cores no espectro vermelho-verde. É causada pela ausência ou disfunção dos cones da retina responsáveis por perceber a cor verde.  ",
        p2: "Indivíduos com deuteranopia podem confundir tons de verde com vermelho ou castanho, tornando certas cores mais difíceis de identificar com precisão."
    }

    /*
  protanopia: "Protanopia: deficiência na percepção do vermelho.",
  deuteranopia: "Deuteranopia: deficiência na percepção do verde.",
  acromatopsia: "Acromatopsia: ausência total de percepção de cores.",
  estrabismoVertical: "Estrabismo vertical (III par): desalinhamento dos olhos no eixo vertical.",
  estrabismoHorizontal: "Estrabismo horizontal (IV par): desalinhamento lateral.",
  estrabismoDiagonal: "Estrabismo diagonal (VI par): desalinhamento em diagonal.",
  nistagmo: "Nistagmo: movimentos involuntários e rápidos dos olhos.",
  */
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




