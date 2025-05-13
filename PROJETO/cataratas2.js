// cataratas2.js - Filtro de cataratas sem uso da câmara (apenas efeito de blur e overlay)

let p5Instance;
let isCataratasActive = false;

document.addEventListener('DOMContentLoaded', () => {
  // Registra o efeito no EffectManager
  EffectManager.registerEffect(
    'cataratas',
    activateCataratas,
    deactivateCataratas
  );

  // Configura o listener para ativar o efeito ao clicar no botão correspondente
  document.getElementById('cataratas')?.addEventListener('click', () => {
    EffectManager.activateEffect('cataratas');
  });
});

function activateCataratas() {
  if (isCataratasActive) return;
  
  // Inicializa o p5.js, que criará um canvas overlay no body
  p5Instance = new p5(cataratasSketch, document.body);
  isCataratasActive = true;
  
  document.getElementById('cataratas').classList.add('ativo');
}

function deactivateCataratas() {
  if (!isCataratasActive) return;
  
  // Remove o canvas criado pelo p5.js
  if (p5Instance) {
    p5Instance.remove();
    p5Instance = null;
  }
  
  isCataratasActive = false;
  document.getElementById('cataratas').classList.remove('ativo');
}

// Sketch p5.js para o efeito de cataratas sem câmara
function cataratasSketch(p) {
  // Parâmetros para o efeito
  const blurAmount = 10;      // Intensidade do blur (pode ser ajustado conforme o necessário)
  const overlayOpacity = 200; // Opacidade do overlay (0 a 255)

  p.setup = function() {
    // Cria um canvas do tamanho da janela
    p.createCanvas(windowWidth, windowHeight);
    // Se desejado, você pode desabilitar o loop se o efeito for estático
    // p.noLoop();
  };

  p.draw = function() {
    // Limpa o canvas
    p.clear();
    
    // Preenche o canvas com uma cor branca com leve transparência
    p.background(255, 255, 255, overlayOpacity);
    
    // Aplica um filtro de blur para simular a visão embaçada (efeito catarata)
    p.filter(p.BLUR, blurAmount);
  };

  p.windowResized = function() {
    p.resizeCanvas(windowWidth, windowHeight);
    p.redraw();
  };
}
