// ========================================
// ELEMENTOS HTML
// ========================================

const cobraElemento = document.getElementById("cobra");
const comidaElemento = document.getElementById("comida");

const pontuacaoElemento = document.getElementById("pontuacao");

const botaoPausa = document.getElementById("botaoPausa");
const botaoReiniciar = document.getElementById("botaoReiniciar");


// ========================================
// CONFIGURAÇÕES
// ========================================

const TAMANHO_CELULA = 25;

const TAMANHO_TABULEIRO = 500;

const VELOCIDADE = 150;

const PONTUACAO_MAXIMA = 10;


// ========================================
// ESTADO DO JOGO
// ========================================

let cobra;

let comida;

let pontuacao;

let direcao;

let proximaDirecao;

let jogoPausado;

let intervalo;


// ========================================
// INICIAR / REINICIAR JOGO
// ========================================

function iniciarJogo() {

    // Cobra inicial

    cobra = [

        {
            x: 250,
            y: 250
        },

        {
            x: 225,
            y: 250
        },

        {
            x: 200,
            y: 250
        }

    ];


    // Pontuação

    pontuacao = 0;


    // Direção inicial

    direcao = {
        x: 1,
        y: 0
    };


    proximaDirecao = {
        x: 1,
        y: 0
    };


    // Jogo ativo

    jogoPausado = false;


    // Atualizar interface

    pontuacaoElemento.textContent = pontuacao;

    botaoPausa.textContent = "⏸️ Pausar";


    // Criar comida

    criarComida();


    // Desenhar cobra

    desenharCobra();


    // Limpar intervalo anterior

    clearInterval(intervalo);


    // Iniciar jogo

    intervalo = setInterval(atualizarJogo, VELOCIDADE);

}


// ========================================
// DESENHAR COBRA
// ========================================

function desenharCobra() {

    // Limpa a cobra atual

    cobraElemento.innerHTML = "";


    // Percorre cada parte da cobra

    cobra.forEach((parte, indice) => {

        const segmento = document.createElement("div");


        // Cabeça

        if (indice === 0) {

            segmento.classList.add("cabeca");

        }

        // Corpo

        else {

            segmento.classList.add("corpo");

        }


        segmento.style.left = `${parte.x - cobra[0].x}px`;

        segmento.style.top = `${parte.y - cobra[0].y}px`;


        cobraElemento.appendChild(segmento);

    });


    // Posicionar o elemento principal

    cobraElemento.style.left = `${cobra[0].x}px`;

    cobraElemento.style.top = `${cobra[0].y}px`;

}


// ========================================
// ATUALIZAR JOGO
// ========================================

function atualizarJogo() {

    // Não movimentar se estiver pausado

    if (jogoPausado) {

        return;

    }


    // Atualizar direção

    direcao = proximaDirecao;


    // Nova posição da cabeça

    let novaCabeca = {

        x: cobra[0].x + direcao.x * TAMANHO_CELULA,

        y: cobra[0].y + direcao.y * TAMANHO_CELULA

    };


    // ====================================
    // TELETRANSPORTE NAS BORDAS
    // ====================================

    // Saiu pela esquerda

    if (novaCabeca.x < 0) {

        novaCabeca.x = TAMANHO_TABULEIRO - TAMANHO_CELULA;

    }


    // Saiu pela direita

    if (novaCabeca.x >= TAMANHO_TABULEIRO) {

        novaCabeca.x = 0;

    }


    // Saiu por cima

    if (novaCabeca.y < 0) {

        novaCabeca.y = TAMANHO_TABULEIRO - TAMANHO_CELULA;

    }


    // Saiu por baixo

    if (novaCabeca.y >= TAMANHO_TABULEIRO) {

        novaCabeca.y = 0;

    }


    // ====================================
    // ADICIONAR NOVA CABEÇA
    // ====================================

    cobra.unshift(novaCabeca);


    // ====================================
    // VERIFICAR COMIDA
    // ====================================

    if (novaCabeca.x === comida.x &&
        novaCabeca.y === comida.y) {

        // Aumentar pontuação

        pontuacao++;


        // Atualizar placar

        pontuacaoElemento.textContent = pontuacao;


        // Criar nova comida

        criarComida();


        // Verificar se chegou a 10

        if (pontuacao >= PONTUACAO_MAXIMA) {

            setTimeout(() => {

                alert("🎉 Você chegou a 10 pontos!");

                iniciarJogo();

            }, 50);

            return;

        }

    }

    else {

        // Remove o último segmento

        // Isso mantém o tamanho da cobra

        cobra.pop();

    }


    // Desenhar novamente

    desenharCobra();

}


// ========================================
// CRIAR COMIDA
// ========================================

function criarComida() {

    let posicaoValida = false;


    while (!posicaoValida) {

        comida = {

            x: Math.floor(
                Math.random() *
                (TAMANHO_TABULEIRO / TAMANHO_CELULA)
            ) * TAMANHO_CELULA,

            y: Math.floor(
                Math.random() *
                (TAMANHO_TABULEIRO / TAMANHO_CELULA)
            ) * TAMANHO_CELULA

        };


        // Verificar se comida não está
        // dentro da cobra

        posicaoValida = !cobra.some(parte =>

            parte.x === comida.x &&
            parte.y === comida.y

        );

    }


    // Posicionar comida

    comidaElemento.style.left = `${comida.x + 2}px`;

    comidaElemento.style.top = `${comida.y + 2}px`;

}


// ========================================
// CONTROLE DO TECLADO
// ========================================

document.addEventListener("keydown", function (event) {

    switch (event.key) {


        // =================================
        // CIMA
        // =================================

        case "ArrowUp":

            event.preventDefault();

            if (direcao.y === 0) {

                proximaDirecao = {
                    x: 0,
                    y: -1
                };

            }

            break;


        // =================================
        // BAIXO
        // =================================

        case "ArrowDown":

            event.preventDefault();

            if (direcao.y === 0) {

                proximaDirecao = {
                    x: 0,
                    y: 1
                };

            }

            break;


        // =================================
        // ESQUERDA
        // =================================

        case "ArrowLeft":

            event.preventDefault();

            if (direcao.x === 0) {

                proximaDirecao = {
                    x: -1,
                    y: 0
                };

            }

            break;


        // =================================
        // DIREITA
        // =================================

        case "ArrowRight":

            event.preventDefault();

            if (direcao.x === 0) {

                proximaDirecao = {
                    x: 1,
                    y: 0
                };

            }

            break;

    }

});


// ========================================
// PAUSAR / CONTINUAR
// ========================================

botaoPausa.addEventListener("click", function () {

    jogoPausado = !jogoPausado;


    if (jogoPausado) {

        botaoPausa.textContent = "▶️ Continuar";

    }

    else {

        botaoPausa.textContent = "⏸️ Pausar";

    }

});


// ========================================
// REINICIAR
// ========================================

botaoReiniciar.addEventListener("click", function () {

    iniciarJogo();

});


// ========================================
// BOTÕES DE CONTROLE
// ========================================

document.getElementById("cima").addEventListener("click", function () {

    if (direcao.y === 0) {

        proximaDirecao = {
            x: 0,
            y: -1
        };

    }

});


document.getElementById("baixo").addEventListener("click", function () {

    if (direcao.y === 0) {

        proximaDirecao = {
            x: 0,
            y: 1
        };

    }

});


document.getElementById("esquerda").addEventListener("click", function () {

    if (direcao.x === 0) {

        proximaDirecao = {
            x: -1,
            y: 0
        };

    }

});


document.getElementById("direita").addEventListener("click", function () {

    if (direcao.x === 0) {

        proximaDirecao = {
            x: 1,
            y: 0
        };

    }

});


// ========================================
// INICIAR
// ========================================

iniciarJogo();