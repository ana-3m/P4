//estrabismo2

let cam;
let currentFilter = 0;
let filtroAtivo = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cam = createCapture(VIDEO);
  cam.size(windowWidth, windowHeight);
  cam.hide();

  const vertical = document.querySelector("#menu li#estrabismoVertical");
  const horizontal = document.querySelector("#menu li#estrabismoHorizontal");
  const diagonal = document.querySelector("#menu li#estrabismoDiagonal");

  const allItems = [vertical, horizontal, diagonal];

  function ativarFiltro(tipo) {
    if (filtroAtivo === tipo) {
      currentFilter = 0;
      filtroAtivo = 0;
      allItems.forEach(el => el.classList.remove("ativo"));
      console.log(`Filtro ${tipo} desativado`);
    } else {
      currentFilter = tipo;
      filtroAtivo = tipo;
      allItems.forEach(el => el.classList.remove("ativo"));
      switch (tipo) {
        case 1:
          vertical.classList.add("ativo");
          console.log("Filtro vertical ativado (III par)");
          break;
        case 2:
          horizontal.classList.add("ativo");
          console.log("Filtro horizontal ativado (IV par)");
          break;
        case 3:
          diagonal.classList.add("ativo");
          console.log("Filtro diagonal ativado (VI par)");
          break;
      }
    }
  }

  vertical.addEventListener("click", () => ativarFiltro(1));
  horizontal.addEventListener("click", () => ativarFiltro(2));
  diagonal.addEventListener("click", () => ativarFiltro(3));
}

function draw() {
  background(0);
  applyFilter(width, height, 0);
}

// Função para aplicar o filtro com deslocamento e duplicação
function applyFilter(displayWidth, displayHeight, yOffset) {
  // Imagem normal
  image(cam, 0, yOffset, displayWidth, displayHeight);

  if (currentFilter !== 0) {
    tint(255, 100); // semitransparente sobreposição

    if (currentFilter === 1) {
      // Filtro 1: deslocamento vertical
      image(cam, 0, yOffset - 30, displayWidth, displayHeight);
    } else if (currentFilter === 2) {
      // Filtro 2: deslocamento horizontal
      image(cam, 30, yOffset, displayWidth, displayHeight);
    } else if (currentFilter === 3) {
      // Filtro 3: deslocamento diagonal
      image(cam, 15, yOffset + 15, displayWidth, displayHeight);
    }

    noTint();
  }
}
