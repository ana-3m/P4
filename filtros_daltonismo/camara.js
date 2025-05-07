const video = document.getElementById('camera');

// acesso à câmera assim que a página carregar
navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
        video.srcObject = stream;
    })
    .catch((err) => {
        console.error('Erro ao acessar a câmera:', err);
        alert('Não foi possível acessar a câmera.');
    });