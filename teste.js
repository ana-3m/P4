// Ativar a câmara através de getUserMedia
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function (stream) {
            const camera = document.getElementById('camera');
            camera.srcObject = stream;
            camera.play();
        })
        .catch(function (err) {
            console.error("Erro ao aceder à câmara:", err);
        });
}

// Alterna o menu e programa a animação do botão
const openBtn = document.getElementById("open");
const menu = document.getElementById("menu");
const icon = document.getElementById("icon");

openBtn.addEventListener("click", function(){
    menu.classList.toggle("open");
    openBtn.classList.toggle("open");
    if (openBtn.classList.contains("open")) {
      // Se o menu estiver aberto, muda a imagem para "icone_open.png"
      icon.src = "imagem/down.png";
    } else {
      // Se fechado, volta à imagem original ("icone.png")
      icon.src = "imagem/up.png";
    }
  });