let selectedFilter = null;

// informacao para cada filtro
const filterInfo = {
    tritanopia: {
        t: "Tritanópia",
        p1: "A tritanópia é uma forma rara de daltonismo, onde as pessoas têm dificuldade em distinguir cores no espectro azul-amarelo.",
        p2: "É causada pela ausência ou disfunção dos cones do olho responsáveis por perceber o azul. Podem confundir tons de azul com verde, e amarelo com roxo."
    },
    protanopia: {
        t: "Protanópia",
        p1: "A protanópia é uma forma de daltonismo em que as pessoas têm dificuldade em distinguir cores no espectro vermelho-verde. É causada pela ausência ou disfunção dos cones da retina responsáveis por perceber a cor vermelha.",
        p2: "Os indivíduos com protanopia podem confundir tons de vermelho com verde ou castanho, e tendem a ver o vermelho como uma cor mais escura ou acinzentada. Esta condição é hereditária e afeta principalmente os homens."
    },
    deuteranopia: {
        t: "Deuteranópia",
        p1: "A deuteranópia é uma forma comum de daltonismo, onde as pessoas têm dificuldade em distinguir cores no espectro vermelho-verde. Ela resulta da ausência ou disfunção dos cones da retina que captam a cor verde.",
        p2: "Quem possui deuteranopia pode confundir tons de verde com vermelho ou castanho, o que torna a identificação precisa de certas cores mais desafiadora em atividades cotidianas."
    },
    acromatopsia: {
        t: "Acromatópsia",
        p1: "A acromatópsia é uma forma rara de daltonismo caracterizada pela ausência total da percepção de cores, fazendo com que os indivíduos vejam o mundo apenas em tons de cinza.",
        p2: "Normalmente, a acromatópsia possui uma origem genética. Para além do impacto da visão monocromática, esta pode resultar numa sensibilidade aumentada à luminosidade e dificuldades com o contraste."
    },
    estrabismoVertical: {
        t: "Estrabismo Vertical",
        p1: "O estrabismo vertical ocorre quando há um desvio vertical de um dos olhos. Esse desalinhamento pode comprometer a visão binocular e a percepção de profundidade.",
        p2: "É uma condição que deriva da parésia do ramo superior do III par, que corresponde a uma paralisia do terceiro nervo craniano."
    },
    estrabismoHorizontal: {
        t: "Estrabismo Horizontal",
        p1: "O estrabismo horizontal ocorre quando há um desvio hotizontal de um dos olhos. Esse desalinhamento pode interferir no alinhamento adequado da visão, podendo dificultar a coordenação dos movimentos oculares e afetar a percepção espacial.",
        p2: "É uma condição que deriva da parésia do VI par, que corresponde a uma paralisia do sexto nervo craniano."
    },
    estrabismoComplexo: {
        t: "Estrabismo Complexo",
        p1: "O estrabismo complexo ocorre quando há um desvio hotizontal e vertical de um dos olhos. Esse desalinhamento pode levar a um comprometimento significativo da visão binocular ",
        p2: "É uma condição que deriva da parésia do III par, que corresponde a uma paralisia do terceiro nervo craniano."
    },
    nistagmo: {
        t: "Nistagmo",
        p1: "O nistagmo é definido por movimentos rápidos e involuntários dos olhos que podem ser horizontais, verticais ou até rotacionais, dificultando a fixação de um objeto.",
        p2: "É uma condição que pode ser congênita ou surgir a partir de problemas no sistema nervoso central, afetando a capacidade de manter uma imagem estável e interferindo em atividades que dependem do foco visual."
    },
    multiplosEscotomas: {
        t: "Multiplos Escotomas",
        p1: "Os múltiplos escotomas são caracterizados por manchas escuras ou áreas de perda de visão que surgem em diferentes partes do campo visual, tanto na região central quanto na periférica.",
        p2: "Esta condição frequentemente está associada à Degenerescência Macular da Idade (DMI) e pode dificultar a identificação de detalhes, afetando a qualidade da visão e a capacidade para tarefas diárias."
    },
    escotomaBinasal: {
        t: "Escotoma Binasal",
        p1: "O escotoma binasal apresenta a ausência de visão campo nasal de cada olho, comprometendo a percepção do campo visual interno e dificultando a apreciação de detalhes próximos ao nariz.",
        p2: "Essa limitação visual geralmente decorre de doenças que afetam as vias óticas a nível central, tornando difícil a integração de estímulos visuais exigidos para uma visão completa."
    },
    escotomaBitemporal: {
        t: "Escotoma Bitemporal",
        p1: "O escotoma bitemporal apresenta a ausência de visão campo temporal de cada olho, o que reduz a percepção dos detalhes na parte externa do campo visual.",
        p2: "Essa condição está frequentemente ligada a doenças das vias óticas a nível do quiasma ótico, resultando em áreas cegas laterais."
    },
    escotomaAltitudinalInferior: {
        t: "Escotoma Altitudinal Inferior",
        p1: "O escotoma altitudinal inferior apresenta uma pela perda de visão na metade inferior do campo visual, resultando numa área cegas inferior",
        p2: "É uma condição que geralmente ocorre devido a uma oclusão vascular da retina superior, e pode interferir significativamente em atividades que dependem da visão periférica inferior."
    },
    escotomaAltitudinalSuperior: {
        t: "Escotoma Altitudinal Superior",
        p1: "O escotoma altitudinal superior caracteriza-se pela perda de visão na metade superior do campo visual, gerando uma lacuna na percepção da região superior.",
        p2: "É uma condição que resulta de uma oclusão vascular da retina inferior, afetando a capacidade de captar informações visuais na parte superior do campo."
    },
    escotomaCentral: {
        t: "Escotoma Central",
        p1: "O escotoma central consiste na perda de visão na região central do campo visual, apresentando uma mancha no centro da visão.",
        p2: "Frequentemente ligado à Degenerescência Macular da Idade (DMI), é uma condição que compromete o reconhecimento de rostos e objetos, tendo um forte impacto na realização das atividades diárias."
    },
    visaoTubular: {
        t: "Visão Tubular",
        p1: "A visão tubular é uma condição em que há uma drástica redução do campo visual periférico, fazendo com que o indivíduo observe o ambiente como se o visse através de um tubo e preservando apenas a visão central.",
        p2: "É muito presente já num estádio final de glaucoma ou em doenças degenerativas da retina. Assim, é uma limitação visual quee dificulta a percepção do ambiente ao redor e impõe desafios significativos às atividades diárias."
    },
    cataratas: {
        t: "Cataratas",
        p1: "As cataratas caracterizam-se pela opacificação gradual do cristalino, o que resulta em visão turva e perda progressiva da nitidez visual. Estas podem impactar severamente a qualidade de vida, pois dificultam desde a leitura até a condução.",
        p2: "É uma condição que surge com a idade, podendo, raramente, surgir em crianças e jovens. Sendo esta uma condição que condiciona bastante as tarefas básicas, o seu diagnóstico vem acompanhado com a indicação de cirurgia."
    }
};


// detecta item clicado
document.querySelectorAll('#menu .word').forEach(item => {
    item.addEventListener('click', () => {
        selectedFilter = item.getAttribute('data-filter') || item.id;

        // atualiza o conteúdo se o popup estiver visível
        if (popup.style.display === 'flex' && filterInfo[selectedFilter]) {
            const info = filterInfo[selectedFilter];
            popupContent.innerHTML = `
                <div class="titulo">${info.t}</div>
                <div class="colunas">
                    <div class="coluna">${info.p1}</div>
                    <div class="coluna">${info.p2}</div>
                </div>
            `;
        }
    });
});

// clica no botao do icon 
const infoIcon = document.getElementById('iconInfo');
const popup = document.getElementById('popupInfo');
//partes do menu para baixar
const openBtn = document.getElementById("open");
const menu = document.getElementById("menu");

document.getElementById('iconInfo').addEventListener('click', () => {
    const isVisible = popup.style.display === 'flex';

    if (!isVisible) {
        let infoContent = "";

        // Se houver um filtro selecionado, exibe a informação correspondente
        if (selectedFilter && filterInfo[selectedFilter]) {
            const info = filterInfo[selectedFilter];
            infoContent = `
                <div class="titulo">${info.t}</div>
                <div class="colunas">
                    <div class="coluna">${info.p1}</div>
                    <div class="coluna">${info.p2}</div>
                </div>
            `;
        } else {
            // Se **nenhum filtro estiver ativo**, exibe um texto genérico
            infoContent = `
                <div class="titulo"><img class="logoInfo" src="imagem/logo1.png" alt="logo" width="60" height="60">BLIND SPOT</div>
                <div class="colunas">
                    <div class="coluna">Nesta web app poderá experênciar algumas das várias condições que podem afetar a nossa visão.</div>
                    <div class="coluna">1. Abra o menu abaixo e selecione os efeitos para entender melhor como as respetivas doenças afetam a visão.</div> 
                    <div class="coluna">2. Pressione o botão de informação para saber mais sobre essa mesma doença.</div>
                </div>
            `;
        }

        // Atualiza o conteúdo do popup
        document.getElementById('popupContent').innerHTML = infoContent;
        popup.style.display = 'flex';
        infoIcon.src = 'imagem/infoClose.svg';

        // Fecha o menu e corrige o ícone
        menu.classList.remove('open');
        openBtn.classList.remove('open');
        icon.src = 'imagem/up.png';

    } else {
        // Fecha apenas o popup e corrige o ícone de info
        popup.style.display = 'none';
        infoIcon.src = 'imagem/info.svg';
    }
});