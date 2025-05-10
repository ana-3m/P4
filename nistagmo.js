
//nistagmo.js
let nistagmoAtivo = false;
let velocidade = 70;
let direcao = 1;
let deslocamento = 5;
let intervaloNistagmo = null;
const camera = document.getElementById("camera");

camera.style.left = "0";
camera.style.transform = "translateX(0px)";

const nistagmoItem = document.querySelector("#menu li#nistagmo");

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

// Corrigido: seletor agora usa #menu
document.addEventListener("DOMContentLoaded", () => {
  const itens = document.querySelectorAll("#menu li");
  itens.forEach(item => {
    if (item.textContent.trim() === "Nistagmo") {
      item.addEventListener("click", () => {
        if (nistagmoAtivo) {
          desativarNistagmo();
          console.log("desativado nistagmo");
        } else {
          ativarNistagmo();
          console.log("ativado nistagmo");
        }
      });
    }
  });
});