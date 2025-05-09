//estrabismo.js

let cam;
let camAspect;
let currentFilter = 1; // 1: vertical, 2: horizontal, 3: diagonal


let fullScreenMode = true;

function setup() {
    createCanvas(windowWidth, windowHeight);
    
    cam = createCapture(VIDEO, () => {
      camAspect = cam.width / cam.height;
    });
    cam.hide(); 
    
    // Adiciona listeners para os botões do menu
    const verticalBtn = document.getElementById("estrabismoVertical");
    const horizontalBtn = document.getElementById("estrabismoHorizontal");
    const diagonalBtn = document.getElementById("estrabismoDiagonal");
  
    if (verticalBtn) {
      verticalBtn.addEventListener("click", () => {
        currentFilter = 1;
      });
    }
  
    if (horizontalBtn) {
      horizontalBtn.addEventListener("click", () => {
        currentFilter = 2;
      });
    }
  
    if (diagonalBtn) {
      diagonalBtn.addEventListener("click", () => {
        currentFilter = 3;
      });
    }
  }

function draw() {
  background(0);
  
  if (fullScreenMode) {

  
    // Modo "cover" - ocupa toda largura, corta excesso vertical
    let displayWidth = width;
    let displayHeight = width / camAspect; // Altura proporcional
    
    // Centraliza verticalmente (cortará o excesso)
    let yOffset = (height - displayHeight) / 2;
    
    // Aplica o filtro atual
    applyFilter(displayWidth, displayHeight, yOffset);
 
  }
}

//filtro de fullscreen 
function applyFilter(displayWidth, displayHeight, yOffset) {
  // Imagem normal
  image(cam, 0, yOffset, displayWidth, displayHeight);
  
  // Imagem com deslocamento baseado no filtro atual
  tint(255, 100);
  if (currentFilter === 1) {
    // Filtro 1: Deslocamento vertical
    image(cam, 0, yOffset -30 , displayWidth, displayHeight);
  } else if (currentFilter === 2) {
    // Filtro 2: Deslocamento horizontal
    image(cam,30, yOffset, displayWidth, displayHeight);
  } else if (currentFilter === 3) {
    // Filtro 3: Deslocamento diagonal
    image(cam,15, yOffset + 15, displayWidth, displayHeight);
  }
  noTint();
}


function applyFilterV(displayWidth, displayHeight, yOffset) {
// Imagem normal
image(cam, 0, yOffset, displayWidth, displayHeight);
  
// Imagem com deslocamento baseado no filtro atual
tint(255, 100);
  // Filtro 1: Deslocamento vertical
  image(cam, 0, yOffset -30 , displayWidth, displayHeight);

}

function applyFilterH(displayWidth, displayHeight, yOffset) {
  // Imagem normal
  image(cam, 0, yOffset, displayWidth, displayHeight);
    
  // Imagem com deslocamento baseado no filtro atual
  tint(255, 100);
    // Filtro 2: Deslocamento horizontal
    image(cam,15, yOffset + 15, displayWidth, displayHeight);
  
  }


  function applyFilterD(displayWidth, displayHeight, yOffset) {
    // Imagem normal
    image(cam, 0, yOffset, displayWidth, displayHeight);
      
    // Imagem com deslocamento baseado no filtro atual
    tint(255, 100);
      // Filtro 3: Deslocamento diagonal
      image(cam, 0, yOffset -30 , displayWidth, displayHeight);
    
    }



function keyPressed() {
  if (key === '1') {
    currentFilter = 1; // Filtro vertical
  } else if (key === '2') {
    currentFilter = 2; // Filtro horizontal
  } else if (key === '3') {
    currentFilter = 3; // Filtro diagonal
  }
}
