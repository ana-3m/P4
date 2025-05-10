//estrabismo2.js
let cam;
let currentFilter = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cam = createCapture(VIDEO);
  cam.size(windowWidth, windowHeight);
  cam.hide();

  document.querySelector("#estrabismoVertical").addEventListener("click", () => {
    currentFilter = 1;
    console.log("Filtro vertical ativado (III par)");
  });

  document.querySelector("#estrabismoHorizontal").addEventListener("click", () => {
    currentFilter = 2;
    console.log("Filtro horizontal ativado (IV par)");
  });

  document.querySelector("#estrabismoDiagonal").addEventListener("click", () => {
    currentFilter = 3;
    console.log("Filtro diagonal ativado (VI par)");
  });
}

function draw() {
  background(0);
  image(cam, 0, 0, width, height);

  if (currentFilter !== 0) {
    tint(255, 100);
    switch (currentFilter) {
      case 1: // Vertical
        image(cam, 0, -30, width, height);
        break;
      case 2: // Horizontal
        image(cam, 15, 15, width, height);
        break;
      case 3: // Diagonal
        image(cam, 15, -30, width, height);
        break;
    }
    noTint();
  }
}
