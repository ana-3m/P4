// Ativar a câmara através de getUserMedia, com restrições para dispositivos móveis
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({
        video: {
            facingMode: "user", // Use "user" para a câmara frontal ou "environment" para a traseira
            width: { ideal: 1280 },
            height: { ideal: 720 }
        }
    })
    .then(function(stream) {
        const camera = document.getElementById('camera');
        camera.srcObject = stream;
        camera.play();
    })
    .catch(function(err) {
        console.error("Erro ao aceder à câmara:", err);
    });
} else {
    console.error("getUserMedia não é suportado neste navegador.");
}

// Alterna o menu e programa a animação do botão
const openBtn = document.getElementById("open");
const menu = document.getElementById("menu");
const icon = document.getElementById("icon");

openBtn.addEventListener("click", function() {
    menu.classList.toggle("open");
    openBtn.classList.toggle("open");

    if (openBtn.classList.contains("open")) {
        // Se o menu estiver aberto, muda a imagem para "down.png"
        icon.src = "imagem/down.png";
    } else {
        // Se fechado, volta à imagem original ("up.png")
        icon.src = "imagem/up.png";
    }
});