let cam;
let currentFilter = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cam = createCapture(VIDEO);
  cam.size(windowWidth, windowHeight);
  cam.hide();

  const vertical = document.querySelector("#menu li#estrabismoVertical");
  const horizontal = document.querySelector("#menu li#estrabismoHorizontal");
  const diagonal = document.querySelector("#menu li#estrabismoDiagonal");

  const allEstrabismoItems = [vertical, horizontal, diagonal];

  function ativarFiltro(tipo) {
    if (currentFilter === tipo) {
      // Se o filtro já estiver ativo, desativa-o
      currentFilter = 0;
      // Remove a classe "ativo" de todos
      allEstrabismoItems.forEach(el => el.classList.remove("ativo"));
      console.log("Filtro desativado");
    } else {
      // Ativa o filtro selecionado
      currentFilter = tipo;
      // Remove a classe "ativo" de todos
      allEstrabismoItems.forEach(el => el.classList.remove("ativo"));
      // Adiciona "ativo" ao selecionado
      if (tipo === 1) vertical.classList.add("ativo");
      if (tipo === 2) horizontal.classList.add("ativo");
      if (tipo === 3) diagonal.classList.add("ativo");
      console.log(`Filtro ${tipo === 1 ? "vertical" : tipo === 2 ? "horizontal" : "diagonal"} ativado`);
    }
  }

  vertical.addEventListener("click", () => {
    ativarFiltro(1);
  });

  horizontal.addEventListener("click", () => {
    ativarFiltro(2);
  });

  diagonal.addEventListener("click", () => {
    ativarFiltro(3);
  });
}

function draw() {
  background(0);
  image(cam, 0, 0, width, height);

  if (currentFilter !== 0) {
    tint(255, 100);
    switch (currentFilter) {
      case 1: image(cam, 0, -30, width, height); break;
      case 2: image(cam, 15, 15, width, height); break;
      case 3: image(cam, 15, -30, width, height); break;
    }
    noTint();
  }
}
