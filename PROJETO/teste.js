// Variáveis globais para armazenar o stream e o modo atual da câmera
let currentStream = null;
let currentFacingMode = "environment";  // Inicia com a traseira

// Função que inicia a câmera com a restrição passada (environment ou user)
function startCamera(facingMode) {
    // Se já existe um stream ativo, pare todos os tracks dele
    if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop());
    }
    
    navigator.mediaDevices.getUserMedia({
        video: {
            facingMode: { ideal: facingMode },
            width: { ideal: 1280 },
            height: { ideal: 720 }
        }
    })
    .then(function (stream) {
        currentStream = stream;  // Armazena o stream atual para eventualmente fechá-lo ao trocar
        const camera = document.getElementById('camera');
        camera.srcObject = stream;
        camera.play();
    })
    .catch(function (err) {
        console.error("Erro ao aceder à câmara:", err);
    });
}

// Inicializa a câmera ao carregar a página usando a traseira
document.addEventListener("DOMContentLoaded", () => {
    startCamera(currentFacingMode);
    
    // Alterna o menu e programa a animação do botão de abertura do menu
    const openBtn = document.getElementById("open");
    const menu = document.getElementById("menu");
    const icon = document.getElementById("icon");

    openBtn.addEventListener("click", function() {
        menu.classList.toggle("open");
        openBtn.classList.toggle("open");
        
        if (openBtn.classList.contains("open")) {
            icon.src = "imagem/down.png";
        } else {
            icon.src = "imagem/up.png";
        }
    });

    // Configura o botão de trocar câmera
    const toggleCameraButton = document.getElementById("toggleCameraButton");
    toggleCameraButton.addEventListener("click", function() {
        // Se está usando a traseira ("environment"), alterna para a frontal ("user")
        currentFacingMode = (currentFacingMode === "environment") ? "user" : "environment";
        startCamera(currentFacingMode);
    });
});
