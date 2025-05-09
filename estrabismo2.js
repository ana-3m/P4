//estrabismo2.js
let cam;
let currentFilter = 1;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cam = createCapture(VIDEO);
  cam.hide();

  // Seletores de filtro por classe
  document.querySelector(".estrabismoVertical").addEventListener("click", () => currentFilter = 1);
     console.log("Filtro vertical ativado (III par)");

     document.querySelector(".estrabismoHorizontal").addEventListener("click", () => currentFilter = 2);
  document.querySelector(".estrabismoDiagonal").addEventListener("click", () => currentFilter = 3);
}

function draw() {
  background(0);

  // Mostra imagem normal da webcam
  image(cam, 0, 0, width, height);

  // Aplica deslocamento conforme filtro
  tint(255, 100); // semitransparente para efeito "fantasma"
  if (currentFilter === 1) {
    image(cam, 0, -30, width, height); // Vertical
console.log("Aplicando filtro vertical no draw()");

  } else if (currentFilter === 2) {
    image(cam, 15, 15, width, height); // Horizontal
  } else if (currentFilter === 3) {
    image(cam, 15, -30, width, height); // Diagonal
  }
}
console.log("entrou no script");
