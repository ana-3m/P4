let selectedFilter = null;

// informacao para cada filtro
const filterInfo = {
    tritanopia: {
        p1: "A tritanopia é uma forma rara de daltonismo, onde as pessoas têm dificuldade em distinguir cores no espectro azul-amarelo.",
        p2: "É causada pela ausência ou disfunção dos cones do olho responsáveis por perceber o azul. Podem confundir tons de azul com verde, e amarelo com roxo."
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
    });
  });

  // clica no botao do icon 
  document.getElementById('iconInfo').addEventListener('click', () => {
    if (selectedFilter && filterInfo[selectedFilter]) {
      const info = filterInfo[selectedFilter];
      document.getElementById('popupContent').innerHTML = `
        <div class="coluna">${info.p1}</div>
        <div class="coluna">${info.p2}</div>
      `;
      document.getElementById('popupInfo').style.display = 'flex';
    }
  });
  
