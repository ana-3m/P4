// DETECÇÃO DE ORIENTAÇÃO

// Função que verifica a orientação do dispositivo e exibe um overlay se estiver vertical
function checkOrientation() {
  const overlay = document.getElementById("rotateOverlay");
  const NotOverlay = document.getElementById("NOT");
  // Se a largura for menor que a altura (provavelmente em modo retrato)
  if (window.innerWidth < window.innerHeight) {
    overlay.style.display = "flex";  // mostra o overlay
    NotOverlay.style.display = "none";   // oculta o overlay

  } else {
    overlay.style.display = "none";   // oculta o overlay
    NotOverlay.style.display = "block";   // oculta o overlay
  }
}

// Verifica a orientação inicialmente e sempre que a janela for redimensionada
window.addEventListener("resize", checkOrientation);
document.addEventListener("DOMContentLoaded", checkOrientation);

//fullscreen
document.addEventListener("DOMContentLoaded", () => {
  const fullscreenBtn = document.getElementById("fullscreenButton");

  fullscreenBtn.addEventListener("click", () => {
    if (!document.fullscreenElement) {
      // Se não está em ecrã completo, ativa
      const docEl = document.documentElement;
      if (docEl.requestFullscreen) {
        docEl.requestFullscreen();
      } else if (docEl.mozRequestFullScreen) {
        docEl.mozRequestFullScreen();
      } else if (docEl.webkitRequestFullscreen) {
        docEl.webkitRequestFullscreen();
      } else if (docEl.msRequestFullscreen) {
        docEl.msRequestFullscreen();
      }
    } else {
      // Se já está em ecrã completo, sai
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  });
});

// MANIPULAÇÃO DA CÂMARA E BOTÃO DE TROCA

// Variáveis globais para armazenar o stream e o modo atual da câmera
let currentStream = null;
let currentFacingMode = "environment";  // Inicia com a câmera traseira

// Função que inicia a câmera com o parâmetro de facingMode desejado ("environment" ou "user")
function startCamera(facingMode) {
  // Se já existe um stream ativo, para todos os tracks dele
  if (currentStream) {
    currentStream.getTracks().forEach(track => track.stop());
  }

  navigator.mediaDevices.getUserMedia({
    video: {
      facingMode: { ideal: facingMode },
      width: { ideal: 1280 },
      height: { ideal: 720 }
    },
    audio: false
  })
    .then(function (stream) {
      currentStream = stream;  // Armazena o stream atual para possíveis futuras paradas
      const camera = document.getElementById('camera');
      camera.srcObject = stream;

      // Aplica espelhamento **apenas** se for a câmera frontal
      camera.style.transform = (facingMode === "user") ? "scaleX(-1)" : "none";

      camera.play();
    })
    .catch(function (err) {
      console.error("Erro ao aceder à câmara:", err);
    });
}



// INICIALIZAÇÃO AO CARREGAR A PÁGINA
document.addEventListener("DOMContentLoaded", () => {
  // Inicia a câmera usando a traseira
  startCamera(currentFacingMode);

  // Alterna o menu e programa a animação do botão de abertura do menu (seu código existente)
  const openBtn = document.getElementById("open");
  const menu = document.getElementById("menu");
  const icon = document.getElementById("icon");

  openBtn.addEventListener("click", function () {
    menu.classList.toggle("open");
    openBtn.classList.toggle("open");

    if (openBtn.classList.contains("open")) {
      icon.src = "imagem/down.png";
    } else {
      icon.src = "imagem/up.png";
    }
  });

  // Configura o botão de trocar câmera
  const toggleCameraButton = document.getElementById("changeCam");
  toggleCameraButton.addEventListener("click", function () {
    // Altera entre "environment" (traseira) e "user" (frontal)
    currentFacingMode = (currentFacingMode === "environment") ? "user" : "environment";
    startCamera(currentFacingMode);
  });
});

// ********** about us ***********

const logoBS = document.getElementById("logo");
const aboutUS = document.getElementById("aboutUsOverlay")

logoBS.addEventListener("click", function () {
  if (aboutUS.style.display === "flex") {
    aboutUS.style.display = "none";
  } else {
    aboutUS.style.display = "flex";
  }
});