let times = [];



function cadastrar(){
    //buscando os valores inseridos pelo usuário
    const time = {};

     time.nomeTime = document.getElementById("nome-time").value;
     time.gritoGuerra = document.getElementById("grito-guerra").value;
     time.anoFundacao = document.getElementById("ano-fundacao").value;
    
    
    
    //verificando campos em branco
    if(time.nomeTime == "" || time.gritoGuerra == "" || time.anoFundacao == ""){
        alert("Preencha todos os campos corretamente!");
        return;
    }

    if(times.includes(time.nomeTime)){
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
    times.push(time.nomeTime);

    if(resultado.textContent == " "){
        resultado.textContent = time.nomeTime;
    } else{
        resultado.textContent +=  time.nomeTime + ", ";
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
        let timesSorteados = document.getElementById("lista-sorteio");
        sortearTimes(times);
        

        //loop que vai garantir que os times sorteados nao se repitam
        for(let i = 0; i < times.length; i++){
            if(i == times.length - 1){
                //ao chegar no ultimo indice do array, este último sorteia o primeiro
                timesSorteados.innerHTML += "Partida " + (i + 1) + ": " + times[i] + " --> " + times[0] + "<br>";
            } else {
                //sorteando o time do próximo indice + 1 pra não repetir pares
                timesSorteados.innerHTML += "Partida " + (i + 1) + ": " + times[i] + " --> " + times[i + 1] + "<br>";
            }
        }
}

function iniciarPartida(partida){
  
    alert("Iniciando " + partida);
    

}

function sortearTimes(lista){
    //usando math floor e random pra gerar um indice aleatorio do array e selecionar os times
    for(let i = lista.length; i; i--){
        let indiceAleatorio = Math.floor(Math.random() * i);

        //atribuindo com destructuring
        [times[i - 1]], [times[indiceAleatorio]] = [times[indiceAleatorio]], [times[i-1]];
    }

}
