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


const nistagmoItem = document.querySelector("#wordList li.nistagmo");

function ativarNistagmo() {
  if (nistagmoAtivo) return;
  nistagmoAtivo = true;
  nistagmoItem.classList.add("ativo");

  intervaloNistagmo = setInterval(() => {
    deslocamento = direcao;
    camera.style.transform = `translateX(${deslocamento}px) scaleX(${(window.innerWidth + 2) / window.innerWidth})`;
    direcao *= -1;
  }, velocidade);
}

function desativarNistagmo() {
  clearInterval(intervaloNistagmo);
  camera.style.transform = "translateX(0px) scaleX(1)";
  nistagmoAtivo = false;
  nistagmoItem.classList.remove("ativo");
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
