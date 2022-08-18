//Audios

var greenAudio = new Audio("sounds/green.mp3");
var redAudio = new Audio("sounds/red.mp3");
var yellowAudio = new Audio("sounds/yellow.mp3");
var blueAudio = new Audio("sounds/blue.mp3");
var wrongAudio = new Audio("sounds/wrong.mp3");



//Animação do Botão

function buttonAnimation(result) {

    $(result).addClass("pressed");

    setTimeout(function () {
        $(result).removeClass("pressed");
    }, 100);
}

$("#green").click(function () {
    greenAudio.play();
    buttonAnimation(this);
})

$("#red").click(function () {
    redAudio.play();
    buttonAnimation(this);
})

$("#yellow").click(function () {
    yellowAudio.play();
    buttonAnimation(this);
})

$("#blue").click(function () {
    blueAudio.play();
    buttonAnimation(this);
})



//Jogo aleatório

function randomGame() {

    switch (Math.floor(Math.random() * 4)) {
        case 0: var result = ".green";
            greenAudio.play();
            $("#green").fadeIn(100).fadeOut(100).fadeIn(100);
            break;

        case 1: var result = ".red";
            redAudio.play();
            $("#red").fadeIn(100).fadeOut(100).fadeIn(100);
            break;

        case 2: var result = ".yellow";
            yellowAudio.play();
            $("#yellow").fadeIn(100).fadeOut(100).fadeIn(100);
            break;

        case 3: var result = ".blue";
            blueAudio.play();
            $("#blue").fadeIn(100).fadeOut(100).fadeIn(100);
            break;

        default:
            break;
    }
    newLevel(result);
    return (result);

}



//Comparador de respostas

var answerNumber = 0;

function comparador() {

    if (allResults[answerNumber] === allPlayerAnswer[answerNumber]) {
        console.log("é a mesma resposta");

        answerNumber++;

        if (answerNumber === allResults.length) {

            allPlayerAnswer = [];
            answerNumber = 0;

            setTimeout(function () {
                randomGame();
            }, 1000);

            console.log("Novo nivel");

        } else {
            console.log("próxima checagem");
        }

    } else {
        console.log("Errou");
        answerNumber = 0;
        gameOver();
    }
}



//Resultados e Novo nivel

var allResults = [];

function newLevel(result) {
    allResults.push(result);
    $("#level-title").text("Nível " + allResults.length);
}



//Respostas do jogador e Comparação

var allPlayerAnswer = [];

$(".btn").click(function () {
    allPlayerAnswer.push("." + this.id);
    comparador();
})



//Início

$(document).keydown(function () {

    if (allResults.length === 0) {

        var result = randomGame();
    }

});



//Game Over

function gameOver() {
    allResults = [];
    allPlayerAnswer = [];

    $("body").addClass("game-over");

    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);

    wrongAudio.play();

    $("#level-title").text("Fim de Jogo, pressione qualquer tecla para Reiniciar");
}