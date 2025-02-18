const listaDeNumerosSorteados = new Set();
const numeroLimite = 100;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

document.addEventListener("DOMContentLoaded", () => {
    exibirMensagemInicial();
    document.querySelector(".container__botao").addEventListener("click", verificarChute);
    document.getElementById("reiniciar").addEventListener("click", reiniciarJogo);
});

function exibirTextoNaTela(tag, texto) {
    const campo = document.querySelector(tag);
    if (campo) {
        campo.innerHTML = texto;
        responsiveVoice.speak(texto, 'Brazilian Portuguese Female', { rate: 1.2 });
    }
}

function exibirMensagemInicial() {
    exibirTextoNaTela("h1", "Jogo do número secreto");
    exibirTextoNaTela("p", "Escolha um número entre 1 e 100");
}

function verificarChute() {
    const chute = Number(document.querySelector(".container__input").value);
    if (isNaN(chute) || chute < 1 || chute > numeroLimite) {
        exibirTextoNaTela("p", "Digite um número válido entre 1 e 10!");
        return;
    }

    if (chute === numeroSecreto) {
        exibirTextoNaTela("h1", "Acertou!");
        const palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
        exibirTextoNaTela("p", `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`);
        document.getElementById("reiniciar").removeAttribute("disabled");
    } else {
        exibirTextoNaTela("p", chute > numeroSecreto ? "O número secreto é menor" : "O número secreto é maior");
        tentativas++;
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    if (listaDeNumerosSorteados.size >= numeroLimite) {
        listaDeNumerosSorteados.clear();
    }

    let numeroEscolhido;
    do {
        numeroEscolhido = Math.floor(Math.random() * numeroLimite) + 1;
    } while (listaDeNumerosSorteados.has(numeroEscolhido));
    
    listaDeNumerosSorteados.add(numeroEscolhido);
    console.log("Números sorteados:", [...listaDeNumerosSorteados]);
    return numeroEscolhido;
}

function limparCampo() {
    const input = document.querySelector(".container__input");
    if (input) input.value = "";
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    tentativas = 1;
    limparCampo();
    exibirMensagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled", "true");
}