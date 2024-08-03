let times = [];
let timesSorteados = [];


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
    } else if(times.length  < 8 ){
        alert("Adicione no mínimo 8 times.");
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
    time.nomeTime = "";
}


function iniciarPartida(){
      //informando que o jogo pode começar se o número de equipes for par 
      if(times.length %2 !== 0){
        alert("O número de times deve ser par.");
        return;
        }


}

function sortearTimes(times){
    //usando math floor e random pra gerar um indice aleatorio do array e selecionar os times
    for(let i = times.length; i; i--){
        let indiceAleatorio = Math.floor(Math.random() * i);

        //atribuindo com destructing
        [times[i - 1]], [times[indiceAleatorio]] = [times[indiceAleatorio]], [times[i-1]];



    }
    

}
