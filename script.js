// Cor: [claro, escuro]
cores = {
    "rosa": ["#FFB6C1", "#FF1493", 0],
    "azul": ["#7DF9FF", "#0047AB", 1],
    "verde": ["#32CD32", "#008000", 2],
    "amarelo": ["#FCF55F", "#DAA520", 3],
    "roxo": ["#DA70D6", "#9F2B68", 4]
}

// Os buttons coloridos
buttons = [
    document.getElementById("rosa"),
    document.getElementById("azul"),
    document.getElementById("verde"),
    document.getElementById("amarelo"),
    document.getElementById("roxo"),
]

// Função para esperar "time" segundos
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

// Coloca o button claro
function claro(button){
    button.style.backgroundColor = cores[button.id][0];
}

// Coloca o button escuro
function escuro(button){
    button.style.backgroundColor = cores[button.id][1];
}

// Coloca todos os buttons claros
function todasClaras(){
    for (c in cores){
        document.getElementById(c).style.background = cores[c][0];
    }
}

// Coloca todos os buttons escuros
function todasEscuras(){
    for (c in cores){
        document.getElementById(c).style.background = cores[c][1];
    }
}

function clickButton(button){
    // Tirar todas as cores
    todasClaras();
    // Mudar a cor do clicado
    escuro(button);    
    // Adicionar a jogada
    verificaJogada(button);
    // esperar antes de dar reset à cor do button
    delay(500).then(() => claro(button));
}

// Add event listeners
function criarEventListeners(){
    buttons[0].addEventListener('click', function(){clickButton(buttons[0]);});
    buttons[1].addEventListener('click', function(){clickButton(buttons[1]);});
    buttons[2].addEventListener('click', function(){clickButton(buttons[2]);});
    buttons[3].addEventListener('click', function(){clickButton(buttons[3]);});
    buttons[4].addEventListener('click', function(){clickButton(buttons[4]);});
}

// Fazer uma sequencia inicial e inicar o primeiro nivel
async function sequenciaInicial(){
    const timer = 250;
    // Ligar uma a uma 
    for(bt of buttons){
        await delay(timer);
        escuro(bt);
    }
    // Desligar uma a uma
    for(bt of buttons){
        await delay(timer);
        claro(bt);
    }
    // Piscar 2 vezes
    for(let i = 0; i < 2; i++){
        await delay(timer);
        todasEscuras()
        await delay(timer);
        todasClaras();
    }
    criarEventListeners();
    level(nivel);
}

// Função que devolve um int random
function randInt(max) {
    return Math.floor(Math.random() * max);
}

// Função que muda de nivel
async function level(x){
    const temp = 1000;
    // Indicar que é um nivel novo
    await delay(temp);
    document.getElementById("legenda").innerHTML = "New level!";
    await delay(temp);
    // Dar reset aos arrays
    jogadas.length = 0;
    sequencia.length = 0;
    // Indicar que vai ser mostrada a sequencia e mudar o level
    document.getElementById("level").innerHTML = "Level " + x;
    document.getElementById("legenda").innerHTML = "Watch carefully!";
    await delay(temp);
    // Criar sequencia
    for (let i = 0; i < x; i++){ 
        // Escolher um button aleatorio
        let but = buttons[randInt(5)];
        // Colocar a sua posição no array
        sequencia.push(cores[but.id][2]);
        // Piscar o button
        escuro(but);
        await delay(temp/2);
        claro(but);
        await delay(temp/4);
    }
    // Cheats
    console.log(sequencia);
    // Indicar que é a vez do jogador
    document.getElementById("legenda").innerHTML = "Your turn!";
}

function verificaJogada(button){
    jogadas.push(cores[button.id][2]);
    // Se não for igual perdeu
    if(sequencia[jogadas.length - 1] !== jogadas[jogadas.length - 1]){
        document.getElementById("legenda").innerHTML = "You lost!";
        fim = 1;
    }
    // Se os tamanhos forem iguais então acabou o nivel
    if(!fim && jogadas.length === sequencia.length){
        document.getElementById("legenda").innerHTML = "Nice job!";
        // Começar o nivel seguinte
        nivel++;
        // Se ultrapassou o nivel 10 ganhou o jogo
        if(nivel > 10){
            victory();
        }
        else{
            level(nivel);
        }
    }
}

async function victory(){
    const temp = 1000;
    document.getElementById("legenda").innerHTML = "YOU WON!";
    await delay(temp);
    // Piscar 5 vezes
    for(let i = 0; i < 5; i++){
        todasEscuras();
        await delay(temp/5);
        todasClaras();
        await delay(temp/5);
    }
    document.getElementById("legenda").innerHTML = "Game Over!";
}

let jogadas = [];
let sequencia = [];
let nivel = 1;
let fim = 0;

sequenciaInicial();
