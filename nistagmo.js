// nistagmo.js

let nistagmoAtivo = false;
let velocidade = 70; // tempo em ms entre deslocamentos
let direcao = 1;
let deslocamento = 5;
let intervaloNistagmo = null;
const camera = document.getElementById("camera");

// Garante que o vídeo preencha a tela mesmo com "abanar"
camera.style.left = "0";
camera.style.transform = "translateX(0px)";

function ativarNistagmo() {
  if (nistagmoAtivo) return;
  nistagmoAtivo = true;

  intervaloNistagmo = setInterval(() => {
    // Alterna entre -1px e 1px
    deslocamento = direcao;
    camera.style.transform = `translateX(${deslocamento}px) scaleX(${(window.innerWidth + 5) / window.innerWidth})`;
    direcao *= -1;
  }, velocidade);
}

function desativarNistagmo() {
  clearInterval(intervaloNistagmo);
  camera.style.transform = "translateX(0px) scaleX(1)";
  nistagmoAtivo = false;
}

// Escuta o clique no item "Nistagmo"
document.addEventListener("DOMContentLoaded", () => {
  const itens = document.querySelectorAll("#wordList li");
  itens.forEach(item => {
    if (item.textContent.trim() === "Nistagmo") {
      item.addEventListener("click", () => {
        if (nistagmoAtivo) {
          desativarNistagmo();
        } else {
          ativarNistagmo();
        }
      });
    }
  });
});
