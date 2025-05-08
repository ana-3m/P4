//estrabismo2.js
let cam;
let currentFilter = 0; // 0 = nenhum filtro, 1 = vertical, 2 = horizontal, 3 = diagonal

function setup() {
  const canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-2'); // Coloca o canvas atrás do menu, mas acima do vídeo
  cam = createCapture(VIDEO);
  cam.size(windowWidth, windowHeight);
  cam.hide(); // Oculta o elemento HTML do vídeo, vamos usar apenas a imagem

  // Listeners para ativar os filtros correspondentes aos cliques nos elementos HTML
  document.querySelector('.estrabismoVertical')?.addEventListener('click', () => {
    currentFilter = 1;
  });

  document.querySelector('.estrabismoHorizontal')?.addEventListener('click', () => {
    currentFilter = 2;
  });

  document.querySelector('.estrabismoDiagonal')?.addEventListener('click', () => {
    currentFilter = 3;
  });
}

function draw() {
  // Mostrar câmera base
  image(cam, 0, 0, width, height);

  // Aplicar filtro (duplicado com deslocamento e transparência)
  if (currentFilter > 0) {
    applyFilter(width, height, 0); // yOffset = 0 para centralizar com deslocamento interno
  }
}

function applyFilter(displayWidth, displayHeight, yOffset) {
  tint(255, 100); // Transparência leve

  if (currentFilter === 1) {
    // Filtro 1: Deslocamento vertical
    image(cam, 0, yOffset - 30, displayWidth, displayHeight);
  } else if (currentFilter === 2) {
    // Filtro 2: Deslocamento horizontal
    image(cam, 30, yOffset, displayWidth, displayHeight);
  } else if (currentFilter === 3) {
    // Filtro 3: Deslocamento diagonal
    image(cam, 15, yOffset + 15, displayWidth, displayHeight);
  }

  noTint(); // Resetar a transparência
}
