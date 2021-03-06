// Cor: [claro, escuro]
cores = {
    "rosa": ["#FFB6C1", "#FF1493", 0],
    "azul": ["#7DF9FF", "#0096FF", 1],
    "verde": ["#98FB98", "#7CFC00", 2],
    "amarelo": ["#FFD580", "#FF7518", 3],
    "roxo": ["#CF9FFF", "#BF40BF", 4]
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

    document.getElementById("reset").addEventListener('click', reset);
}

// Disable buttons
function disableButtons(){
    for(b of buttons){
        b.disabled = true;
    }
}

function ableButtons(){
    for(b of buttons){
        b.disabled = false;
    }
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
    disableButtons();
    const temp = 1000;
    // Indicar que é um nivel novo
    await delay(temp);
    document.getElementById("legenda").innerHTML = "New level!";
    await delay(temp);
    // Dar reset ao array
    jogadas.length = 0;
    
    // Indicar que vai ser mostrada a sequencia e mudar o level
    document.getElementById("level").innerHTML = "Level " + x;
    document.getElementById("legenda").innerHTML = "Watch carefully!";
    await delay(temp);

    // Mostrar a sequencia até agora
    for (let i = 0; i < sequencia.length; i++){ 
        // Piscar o button
        escuro(buttons[sequencia[i]]);
        await delay(temp/2);
        claro(buttons[sequencia[i]]);
        await delay(temp/4);
    }

    // Adicionar um button aleatorio
    let but = buttons[randInt(5)];
    // Colocar a sua posição no array
    sequencia.push(cores[but.id][2]);
    // Piscar o button
    escuro(but);
    await delay(temp/2);
    claro(but);
    await delay(temp/4);
    
    // Cheats
    console.log(sequencia);
    // Indicar que é a vez do jogador
    document.getElementById("legenda").innerHTML = "Your turn!";
    ableButtons();
}

function verificaJogada(button){
    jogadas.push(cores[button.id][2]);
    // Se não for igual perdeu
    if(sequencia[jogadas.length - 1] !== jogadas[jogadas.length - 1]){
        disableButtons();
        document.getElementById("legenda").innerHTML = "You lost!";
        fim = 1;
        document.getElementById("reset").style.visibility="visible";
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
    disableButtons();
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
    document.getElementById("reset").style.visibility="visible";
}

// Função que dá reset ao jogo
async function reset(){
    // Esconde o button de reset
    document.getElementById("reset").style.visibility="hidden";
    document.getElementById("legenda").innerHTML = "Reseting!";
    document.getElementById("level").innerHTML = "Memory game";
    // Coloca as variaveis no estado inicial
    jogadas = [];
    sequencia = [];
    nivel = 1;
    fim = 0;
    // Piscar 2 vezes
    for(let i = 0; i < 2; i++){
        await delay(250);
        todasEscuras()
        await delay(250);
        todasClaras();
    }
    // Recomeça o nivel 1
    level(nivel);
}

let jogadas = [];
let sequencia = [];
let nivel = 1;
let fim = 0;

sequenciaInicial();