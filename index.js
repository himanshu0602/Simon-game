var buttonColours = ["green","red","yellow","blue"];

var gamePattern = [];
var userClickedPattern=[];

var started = false;
var level = 0;

$(document).keydown(function (){
     if (!started){
         $("h1").text("level "+ level);
         newSequence();

         started = true;
     }
});

$(".btn").click(function(){
    var userSelectColor = $(this).attr("id");
    userClickedPattern.push(userSelectColor);

    makeSound(userSelectColor);
    animationBtn(userSelectColor);

    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if(userClickedPattern.length === gamePattern.length){
                setTimeout(function()  {
                    newSequence();
                }, 1000);
        }
        
    }
    else {
        makeSound("wrong");
        $("body").addClass("gameOver");
        $("h1").text("Game Over , Press Any Key to Restart");

        setTimeout(function() {
            $("body").removeClass("gameOver");
        }, 200);

        startOver();
        }

}

function newSequence(){
    userClickedPattern = [];
    level++;
    $("h1").text("level "+ level);
var randomNumber = Math.floor(Math.random()*4);
var randomChosenColour = buttonColours[randomNumber];
gamePattern.push(randomChosenColour);

$("#"+ randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
makeSound(randomChosenColour);

}

function animationBtn(clikedColor){
     $("#" + clikedColor).addClass("pressed");

     setTimeout(function() {
         $("#" + clikedColor).removeClass("pressed");
     }, 100);
}

function makeSound(name) {
    var sound = new Audio("sounds/"+ name + ".mp3");
    sound.play();
}

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}