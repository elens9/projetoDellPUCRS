let times = [];
let partidas = [];
let partidaAtual;

function cadastrar(){
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
    if(nomeTime == "" || gritoGuerra == "" || anoFundacao == ""){
        alert("Preencha todos os campos corretamente!");
        return;
    }
    //CONFERIR
    if(times.includes(nomeTime)){
        alert("O nome desse time já existe. Crie outro.")
        return;
    }
    
     //informando que o jogo pode começar se o número de equipes for par entre 8 e 16
    if (times.length > 16){
        alert("O limite de equipes é de 16.");
        return;
    } 

    console.log(times);
    let resultado = document.getElementById("lista-times");
    times.push(time);

    //FAZER UM FOR
    let mensagem;
    if(mensagem != ""){
        mensagem = `Times cadastrados: ${time.nomeTime},`;
        resultado.innerHTML = mensagem;

    }
    
    
       
    
    

    //limmpando os campos
    document.getElementById("nome-time").value = "";
    document.getElementById("grito-guerra").value = "";
    document.getElementById("ano-fundacao").value = "";
}



function iniciarCampeonato(){
      //permitindo o início da partida só com 8 ou mais times em números pares
      if(times.length %2 !== 0 || times.length < 4){
        alert("O número de times deve ser maior que 8 e par.");
        return;
        }

        //sorteando os times
        aleatorizarTimes(times);
        sortearTimes(times);
}



function aleatorizarTimes(lista){
    //usando math floor e random pra gerar um indice aleatorio do array e selecionar os times
    for(let i = lista.length; i; i--){
        let indiceAleatorio = Math.floor(Math.random() * i);

        //atribuindo com destructuring
        [times[i - 1]], [times[indiceAleatorio]] = [times[indiceAleatorio]], [times[i-1]];
    }
}



function sortearTimes(times){
    partidas = []; //limpando as partidas anteriores
    let timesSorteados = document.getElementById("lista-sorteio");
    let partidaDetalhes = "";


    //limpando
    timesSorteados.innerHTML = "";
    let partidaHtml = "";

     for(let i = 0; i < times.length; i+=2){
        if(times.lenght == 0){
            partidaHtml = `Partida ${Math.floor(i/2) + 1}: ${times[i].nomeTime} vs ${times[i + 1].nomeTime} <br>`;
        }else {
            partidaHtml = `Partida ${Math.floor(i/2) + 1}: ${times[i].nomeTime} vs ${times[i + 1].nomeTime} <br>`;

        }


            timesSorteados.innerHTML += partidaHtml;


            //adicionando os times no array partidas
            partidas.push({
                time1 : times[i],
                time2 : times[i + 1]
            });
            
    }
}



function iniciarPartida(){
    partidaAtual = 0;
    atualizarPlacar();
    let partidaSelecionada = document.getElementById("select_partida");
    partidaSelecionada.innerHTML =  `<option value="">Selecione um partida</option>`;
                    
    let mostrarPartida = document.getElementById("mostrar-partida");


    if(partidaSelecionada){

        for(i = 0; i < partidas.length; i++){
            let selecao = document.createElement("option");
            selecao.value = i;
            selecao.textContent = `Partida ${i +1}`;
            partidaSelecionada.appendChild(selecao);
            
        }
       
    }
  
  
    
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
    document.getElementById("btn-falta1").addEventListener("click", function (){
        avisarAdvrungh(0);
        
    })

    document.getElementById("btn-falta2").addEventListener("click", function(){
        avisarAdvrungh(1);
      
    })

}

function encerrarPartida(){

    let placarFinal = document.getElementById("placar-final");
    let [time1, time2] = times;
    atualizarPlacar();

    if(time1.pontuacao == time2.pontuacao){
        placarFinal.innerHTML = `Empate! ${time1.nomeTime} = ${time1.pontuacao} <br> ${time2.nomeTime} = ${time2.pontuacao}
                                É hora de um GRUSHT!!!`;
        //DESENVOLVER SOLUÇÃO

    }else{
        let vencedor = time1.pontuacao > time2.pontuacao ? time1 : time2;
        let perdedor = time1.pontuacao > time2.pontuacao ? time2 : time1;

        placarFinal.innerHTML = `Time ${vencedor.nomeTime} é o vencedor. <br>
                                Time ${vencedor.nomeTime} = ${vencedor.pontuacao} pts <br>
                                Time ${perdedor.nomeTime} = ${perdedor.pontuacao} pts`;

    }

    }

   

function atualizarPlacar(){
    totalPontos = document.getElementById("pontuacao");
    
    if(totalPontos){
        let htmlMostrar = "";
        for(let i = 0; i < times.length; i+=2){
            if(i + 1 < times.length){
                htmlMostrar +=  `<div>
                Pontuação inicial do time ${times[i].nomeTime} = ${times[i].pontuacao} pontos <br>
                Pontuação inicial do time ${times[i + 1].nomeTime} = ${times[i + 1].pontuacao} pontos <br>
                </div>`;
            }
        }
        totalPontos.innerHTML = htmlMostrar;
        }
       
        partidas.push(totalPontos);
}



function avisarAdvrungh(i){
    let advrungh = 10;
    if(i >= 0 && i < times.length){
        times[i].pontuacao -= advrungh;
        atualizarPlacar();
    }
}



function fazerBlot(i){
    let blot = 5;
    if(i >= 0 && i < times.length){
        times[i].pontuacao += blot;
        atualizarPlacar();
    } 
}



function fazerPlif(i){
    let plif = 1;
    if(i >= 0 && i < times.length){
        times[i].pontuacao -= plif;
        atualizarPlacar();
    } 
}



function limparPartida(){
    document.getElementById("placar-final").innerHTML = "";
    document.getElementById("pontuacao").innerHTML = "";
    document.getElementById("iniciar-partida").innerHTML = "";
    document.getElementById("mostrar-partida").innerHTML = "";
    document.getElementById("iniciar-partida").innerHTML ="";
}



