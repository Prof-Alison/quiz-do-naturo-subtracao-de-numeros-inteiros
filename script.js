const perguntas = [
    {
        pergunta: `$$(-2) - (+1) $$`,
        alternativas: ["4", "0", "-3", "-1"],
        resposta: "-3"
    },
    {
        pergunta: "$$(-22) - (-21)$$",
        alternativas: ["-1", "-33", "+1", "-4"],
        resposta: "-1"
    },
    {
        pergunta: "$$(+11) - (+14)$$",
        alternativas: ["4", "25", "-2", "-3"],
        resposta: "-3"
    },
    {
        pergunta: "$$(-4) - (+2) - (+2)$$",
        alternativas: ["-2", "-8", "3", "2"],
        resposta: "-8"
    },
    {
        pergunta: "$$(+7) - (-4)$$",
        alternativas: ["11", "15", "3", "-3"],
        resposta: "11"
    },
    {
        pergunta: "$$(-75) - (+25)$$",
        alternativas: ["-100", "+100", "-50", "+25"],
        resposta: "-100"
    },
    {
        pergunta: "$$(-6) - (-5)$$",
        alternativas: ["-11", "-1", "-6", "-2"],
        resposta: "-1"
    },
    {
        pergunta: "$$(+15) - (-15)$$",
        alternativas: ["6", "-6", "30", "0"],
        resposta: "30"
    },
    {
        pergunta: "$$(-19) - (-21)$$",
        alternativas: ["-40", "2", "4", "3"],
        resposta: "2"
    },
    {
        pergunta: "$$(-1) - (-1) $$",
        alternativas: ["4", "-2", "0", "2"],
        resposta: "0"
    }
];

let currentPerguntaIndex = 0;
let NarutoCerto = 0;
let NarutoErrado = 0;

const perguntaElement = document.getElementById('pergunta');
const alternativasElement = document.getElementById('alternativas');
const alternativaCertaElement = document.getElementById('NarutoCerto');
const alternativaErradaElement = document.getElementById('NarutoErrado');
const nextBotao = document.getElementById('nextBotao');
const feedbackElement = document.getElementById('feedback');
const perguntasEmbaralhadas = embaralhaArray(perguntas);
const clickSound = new Audio('naruto clone.mp3');

function mostraPergunta() {
    const currentPergunta = perguntas[currentPerguntaIndex];
    perguntaElement.textContent = currentPergunta.pergunta;
    alternativasElement.innerHTML = ''; // Limpar alternativas anteriores
    
    // Embaralhar as alternativas
    const alternativasEmbaralhadas = embaralhaArray([...currentPergunta.alternativas]);
    
    alternativasEmbaralhadas.forEach(alternativa => {
        const botao = document.createElement('button');
        botao.textContent = alternativa;
        botao.addEventListener('click', (event) => {clickSound.play();selectResposta(event);});
        alternativasElement.appendChild(botao);
    });
    MathJax.typeset(); // Chame o MathJax para processar o conteúdo matemático
}

function selectResposta(event) {
    const respostaSelecionada = event.target.textContent;
    if (respostaSelecionada === perguntas[currentPerguntaIndex].resposta) {
        NarutoCerto++;
        alternativaCertaElement.textContent = NarutoCerto;
        mostrarFeedback('correto');
    } else {
        NarutoErrado++;
        alternativaErradaElement.textContent = NarutoErrado;
        mostrarFeedback('errado');
    }
    currentPerguntaIndex++;
    if (currentPerguntaIndex < perguntas.length) {
        setTimeout(mostraPergunta, 1000); // Mostrar próxima pergunta após 1 segundo
    } else {
        // Lógica para quando todas as perguntas foram respondidas
    }
}

function embaralhaArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

perguntasEmbaralhadas.forEach(pergunta => {
    console.log(pergunta);
});

function mostrarFeedback(tipo) {
    const img = document.createElement('img');
    img.src = tipo === 'correto' ? 'Naruto Certo.png' : 'Naruto Errado.png';
    img.alt = tipo === 'correto' ? 'Naruto Certo' : 'Naruto Errado';
    img.className = tipo === 'correto' ? 'naruto-certo' : 'naruto-errado';
    feedbackElement.appendChild(img);
}

nextBotao.addEventListener('click', mostraPergunta);
mostraPergunta();
