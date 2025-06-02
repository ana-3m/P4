let cataratasCanvas = null;
let isCataratasActive = false;

document.addEventListener("DOMContentLoaded", () => {
  EffectManager.registerEffect("cataratas", activateCataratas, deactivateCataratas);

  const btnCataratas = document.getElementById("cataratas");
  if (btnCataratas) {
    btnCataratas.addEventListener("click", () => {
      EffectManager.activateEffect("cataratas");
    });
  }
});

function activateCataratas() {
  if (isCataratasActive) return;

  cataratasCanvas = document.createElement("canvas");
  cataratasCanvas.id = "cataratasCanvas";
  cataratasCanvas.style.position = "fixed";
  cataratasCanvas.style.top = "0";
  cataratasCanvas.style.left = "0";
  cataratasCanvas.style.width = "100vw";
  cataratasCanvas.style.height = "100vh";
  cataratasCanvas.style.pointerEvents = "none";
  cataratasCanvas.style.zIndex = "1";

  cataratasCanvas.width = window.innerWidth;
  cataratasCanvas.height = window.innerHeight;
  document.body.appendChild(cataratasCanvas);

  isCataratasActive = true;
  document.getElementById("cataratas").classList.add("ativo");

  requestAnimationFrame(drawCataratas);
}

function drawCataratas() {
  if (!cataratasCanvas || !cataratasCanvas) return; // Evita erro se o canvas não foi criado corretamente

  const ctx = cataratasCanvas.getContext("2d");
  const camera = document.getElementById("camera");

  if (!camera || !camera.srcObject) {
    // Se a câmara não estiver ativa, tenta novamente no próximo frame
    requestAnimationFrame(drawCataratas);
    return;
  }

  ctx.clearRect(0, 0, cataratasCanvas.width, cataratasCanvas.height);

  // Aplica efeito de blur
  ctx.filter = "blur(8px)";

  // Detecta se a câmera ativa é frontal
  if (currentFacingMode === "user") {
    ctx.save();  // Salva o estado atual do contexto
    ctx.scale(-1, 1); // Inverte horizontalmente
    ctx.drawImage(camera, -cataratasCanvas.width, 0, cataratasCanvas.width, cataratasCanvas.height);
    ctx.restore(); // Restaura o estado original do contexto
  } else {
    // Se for a câmera traseira, desenha normalmente
    ctx.drawImage(camera, 0, 0, cataratasCanvas.width, cataratasCanvas.height);
  }

  // Overlay branco translúcido
  ctx.filter = "none";
  ctx.fillStyle = "rgba(60, 60, 60, 0.35)";
  ctx.fillRect(0, 0, cataratasCanvas.width, cataratasCanvas.height);

  // Chama o próximo frame
  requestAnimationFrame(drawCataratas);
}

function deactivateCataratas() {
  if (!isCataratasActive) return;

  if (cataratasCanvas) {
    cataratasCanvas.remove();
    cataratasCanvas = null;
  }

  isCataratasActive = false;
  document.getElementById("cataratas").classList.remove("ativo");
}