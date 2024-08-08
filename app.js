let times = [];
let partidas = [];
let partidaAtual;
let vencedores = [];
let partidaSelecionadaIndice = -1;

function cadastrar() {
    //buscando os valores inseridos pelo usuário
    nomeTime = document.getElementById("nome-time").value;
    gritoGuerra = document.getElementById("grito-guerra").value;
    anoFundacao = document.getElementById("ano-fundacao").value;


    let time = {
        nomeTime,
        gritoGuerra,
        anoFundacao,
        pontuacao: 50
    };


    //verificando campos em branco
    if (nomeTime == "" || gritoGuerra == "" || anoFundacao == "") {
        alert("Preencha todos os campos corretamente!");
        return;
    }

    if (times.some(time => time.nomeTime == nomeTime)) {
        alert("O nome desse time já existe. Crie outro.")
        return;
    }

    //limitando a 16 o número de times
    if (times.length > 16) {
        alert("O limite de times é de 16.");
        return;
    }


    let resultado = document.getElementById("lista-times");
    times.push(time);

    resultado.innerHTML = ``;

    //mostrando times cadastrados
    for (i = 0; i < times.length; i++) {
        resultado.innerHTML += `<label class="texto_label">Time cadastrado: ${times[i].nomeTime}</label><br>`;
    }

    //limmpando os campos
    document.getElementById("nome-time").value = "";
    document.getElementById("grito-guerra").value = "";
    document.getElementById("ano-fundacao").value = "";
}



function iniciarCampeonato() {
    //permitindo o início da partida só com 8 ou mais times em números pares
    if (times.length % 2 !== 0 || times.length < 4 || times.length > 16) {
        alert("O número de times deve ser par entre 8 e 16.");
        return;
    }

    //sorteando os times
    aleatorizarTimes(times);
    sortearTimes(times);



    //console.log(`Campeonato iniciado com os times ${times[i].textContent}`);
}



function aleatorizarTimes(lista) {

    //usando math floor e random pra gerar um indice aleatorio do array e selecionar os times
    for (let i = lista.length; i; i--) {
        let indiceAleatorio = Math.floor(Math.random() * i);

        //atribuindo com destructuring
        [times[i - 1]], [times[indiceAleatorio]] = [times[indiceAleatorio]], [times[i - 1]];
    }
}



function sortearTimes(times) {
    console.log(partidas)
    partidas = []; //limpando as partidas anteriores
    let timesSorteados = document.getElementById("lista-sorteio");

    //limpando
    timesSorteados.innerHTML = "";
    let partidaHtml = "";

    for (let i = 0; i < times.length; i += 2) {
        if (times.length == 0) {
            partidaHtml += `Partida ${Math.floor(i / 2) + 1}: ${times[i].nomeTime} vs ${times[i + 1].nomeTime} <br>`;


        } else {
            partidaHtml += `Partida ${Math.floor(i / 2) + 1}: ${times[i].nomeTime} vs ${times[i + 1].nomeTime} <br>`;

        }

    }
    timesSorteados.innerHTML += partidaHtml;

    //adicionando os times no array partidas
    partidas.push(partidaHtml);
    console.log(partidaHtml);
    console.log(times);




}

function selecionarPartida() {
    let partidaSelecionada = document.getElementById("select_partida");
    partidaSelecionada.innerHTML = `<option value="">Selecione um partida</option>`;


    for (i = 0; i < partidas.length; i += 2) {
        let selecao = document.createElement("option");
        selecao.value += i;
        if (partidas.length == 0) {
            selecao.textContent += `Partida ${i + 1}: ${times[i].nomeTime} vs ${times[i + 1].nomeTime}`;
        } else {
            selecao.textContent += `Partida ${Math.floor(i / 2) + 1}: ${times[i].nomeTime} vs ${times[i + 1].nomeTime}`;


        }

        partidaSelecionada.appendChild(selecao);
    }
}




function iniciarPartida() {
    selecionarPartida();
    limparPartida();


    atualizarPlacar();



    //ao clicar no botão de blot ou plif o placar já é atualizado
    document.getElementById("btn-blot1").addEventListener("click", function () {
        fazerBlot(0);
    })

    document.getElementById("btn-plif1").addEventListener("click", function () {
        fazerPlif(0);

    })
    document.getElementById("btn-blot2").addEventListener("click", function () {
        fazerBlot(1);

    })

    document.getElementById("btn-plif2").addEventListener("click", function () {
        fazerPlif(1);

    })

    //ao clicar no botão de Advrungh a falta é registrada pra equipe e descontada no placar
    document.getElementById("btn-falta1").addEventListener("click", function () {
        avisarAdvrungh(0);

    })

    document.getElementById("btn-falta2").addEventListener("click", function () {
        avisarAdvrungh(1);

    })


}

function encerrarPartida() {
    let partida = partidas[index]; 
    //garantindo que os dois times de cada partida sejam atribuídos corretamente 
    let [time1, time2] = times;

    document.getElementById("pontuacao").innerHTML = "";//limpando campo
    let placarFinal = document.getElementById("placar-final");
    
    atualizarPlacar();

    if (time1.pontuacao == time2.pontuacao) {
        placarFinal.innerHTML = `Empate! ${time1.nomeTime} = ${time1.pontuacao} <br> ${time2.nomeTime} = ${time2.pontuacao}
                                É hora de um GRUSHT!!!`;
        //DESENVOLVER SOLUÇÃO

    } else {
        let vencedor = time1.pontuacao > time2.pontuacao ? time1 : time2;
        let perdedor = time1.pontuacao > time2.pontuacao ? time2 : time1;

        placarFinal.innerHTML = `Time ${vencedor.nomeTime} é o vencedor. Passa pra próxima fase. <br>
                                Time ${vencedor.nomeTime} = ${vencedor.pontuacao} pts <br>
                                Time ${perdedor.nomeTime} = ${perdedor.pontuacao} pts`;
        vencedores.push(vencedor);
        console.log(vencedores);
    }

}

function proximaFase() {
    aleatorizarTimes(vencedores);
    sortearTimes(vencedores);

    atualizarPlacar();


}



function atualizarPlacar() {
    totalPontos = document.getElementById("pontuacao");
    document.getElementById("pontuacao").innerHTML = "";
    let htmlMostrar = "";
    let time1 = times[partidaSelecionadaIndice * 2];
    let time2 = times[partidaSelecionadaIndice * 2 + 1];


    if (totalPontos && time1 && time2) {

            htmlMostrar += `<div>
                    Pontuação inicial do time ${time1.nomeTime} = ${time1.pontuacao} pontos <br>
                    Pontuação inicial do time ${time2.nomeTime} = ${time2.pontuacao} pontos <br>
                    </div>`;


        }

    
    totalPontos.innerHTML = htmlMostrar;


    partidas.push(totalPontos);


}



function avisarAdvrungh(i) {
    if(partidaSelecionadaIndice < 0) return;
    let advrungh = 10;
    let index = partidaSelecionadaIndice * 2 + 1;
    if (index >= 0 && index < times.length) {
        times[index].pontuacao -= advrungh;
        atualizarPlacar();
    }
}



function fazerBlot(i) {
    if(partidaSelecionadaIndice < 0) return;
    let blot = 5;
    let index = partidaSelecionadaIndice * 2 + 1;
    if (index >= 0 && index < times.length) {
        times[index].pontuacao += blot;
        atualizarPlacar();
    }
}



function fazerPlif(i) {
    if(partidaSelecionadaIndice < 0) return;
    let index = partidaSelecionadaIndice * 2 + 1;
    let plif = 1;
    if (index >= 0 && index < times.length) {
        times[index].pontuacao -= plif;
        atualizarPlacar();
    }
}



function limparPartida() {
    document.getElementById("placar-final").innerHTML = "";
    document.getElementById("pontuacao").innerHTML = "";
    document.getElementById("iniciar-partida").innerHTML = "";
    document.getElementById("mostrar-partida").innerHTML = "";
    document.getElementById("iniciar-partida").innerHTML = "";
}



