
let cam;
let camAspect;

let currentFilter = 1; // 1: vertical, 2: horizontal, 3: diagonal

let showGlasses = true;
let fullScreenMode = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  cam = createCapture(VIDEO, () => {
    camAspect = cam.width / cam.height;
  });
  cam.hide();
  
  // Configura o elemento dos óculos
  let oculos = document.getElementById('oculos');
  oculos.style.display = showGlasses ? 'block' : 'none';
}

function draw() {
  background(0);
  
  if (fullScreenMode) {
    !showGlasses;
    let oculos = document.getElementById('oculos');
    oculos.style.display = showGlasses ? 'block' : 'none';
    // Modo "cover" - ocupa toda largura, corta excesso vertical
    let displayWidth = width;
    let displayHeight = width / camAspect; // Altura proporcional
    
    // Centraliza verticalmente (cortará o excesso)
    let yOffset = (height - displayHeight) / 2;
    
    // Aplica o filtro atual
    applyFilter(displayWidth, displayHeight, yOffset);
  } else {
    showGlasses;
    // Modo dividido (metade da tela com corte de excesso)
    let camHeight = height;
    let camWidth = camHeight * camAspect;
  
    // Lado esquerdo (sem filtro)
    image(cam, 0, 0, width / 2, height,  0, 0, min(camWidth, width / 2), camHeight);
  
    // Define deslocamentos com base no filtro
    offsetX = 0;
    offsetY = 0;

    // Lado direito (com filtro)
    tint(255);
    //
    if (currentFilter === 1) {
      offsetY = 15; // vertical
      image(cam, width / 2 + 15, 0, width / 2 , height, max(0, camWidth - width / 2 ), 15, min(camWidth, width / 2), camHeight);
      
    

    } else if (currentFilter === 2) {
      image(cam, width / 2 + offsetX, 0, width / 2 , height, max(0, camWidth - width / 2 ),0, min(camWidth, width / 2), camHeight);
      offsetX = -15; // horizontal
    
    }
    /*} else if (currentFilter === 3) {
      image(cam, width / 2 + offsetX, 0, width / 2 - offsetY, height, max(0, camWidth - width / 2 ),0, min(camWidth, width / 2), camHeight);
      offsetX = -15;
      offsetY = 15; // diagonal
    } */
  
    noTint();
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
    image(cam, 0, yOffset -15 , displayWidth, displayHeight);
  } else if (currentFilter === 2) {
    // Filtro 2: Deslocamento horizontal
    image(cam, 15, yOffset, displayWidth, displayHeight);
  } else if (currentFilter === 3) {
    // Filtro 3: Deslocamento diagonal
    image(cam, 10, yOffset + 10, displayWidth, displayHeight);
  }
  noTint();
}

function keyPressed() {
  // Tecla 'g' para mostrar/ocultar óculos
  if (key === 'g' || key === 'G') {
    showGlasses = !showGlasses;
    let oculos = document.getElementById('oculos');
    oculos.style.display = showGlasses ? 'block' : 'none';
  }
  
  // Tecla 'f' para alternar entre modos de tela
  if (key === 'f' || key === 'F') {
    fullScreenMode = !fullScreenMode;
  }
  
  // Tecla '1' para filtro vertical (padrão)
  if (key === '1') {
    currentFilter = 1;
  }
  
  // Tecla '2' para filtro horizontal
  if (key === '2') {
    currentFilter = 2;
  }
  
  // Tecla '3' para filtro diagonal
  if (key === '3') {
    currentFilter = 3;
  }
  
  return false; // Previne comportamento padrão
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}