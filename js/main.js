/**
 * Created by Kyle on 9/8/16.
 */

$(document).ready(function(){
   showOrientation();
});

function showOrientation(){
    $("#orientation").show();
    $("#word-recall").hide();
    $("#delayed-word-recall").hide();
    $("#concentration").hide();
    $("#twelve-months").hide();
    $("#modified-bess").hide();
    $("#coordination").hide();
    $("#total-score").hide();
}

function showWordRecall(){
    $("#orientation").hide();
    $("#word-recall").show();
    $("#delayed-word-recall").hide();
    $("#concentration").hide();
    $("#twelve-months").hide();
    $("#modified-bess").hide();
    $("#coordination").hide();
    $("#total-score").hide();
}

function showDelayedWordRecall(){
    $("#orientation").hide();
    $("#word-recall").hide();
    $("#delayed-word-recall").show();
    $("#concentration").hide();
    $("#twelve-months").hide();
    $("#modified-bess").hide();
    $("#coordination").hide();
    $("#total-score").hide();
}

function showConcentration(){
    $("#orientation").hide();
    $("#word-recall").hide();
    $("#delayed-word-recall").hide();
    $("#concentration").show();
    $("#twelve-months").hide();
    $("#modified-bess").hide();
    $("#coordination").hide();
    $("#total-score").hide();
}

function showTwelveMonths(){
    $("#orientation").hide();
    $("#word-recall").hide();
    $("#delayed-word-recall").hide();
    $("#concentration").hide();
    $("#twelve-months").show();
    $("#modified-bess").hide();
    $("#coordination").hide();
    $("#total-score").hide();
}

function showModifiedBess(){
    $("#orientation").hide();
    $("#word-recall").hide();
    $("#delayed-word-recall").hide();
    $("#concentration").hide();
    $("#twelve-months").hide();
    $("#modified-bess").show();
    $("#coordination").hide();
    $("#total-score").hide();
}

function showCoordination(){
    $("#orientation").hide();
    $("#word-recall").hide();
    $("#delayed-word-recall").hide();
    $("#concentration").hide();
    $("#twelve-months").hide();
    $("#modified-bess").hide();
    $("#coordination").show();
    $("#total-score").hide();
}

function showTotalScore(){
    $("#orientation").hide();
    $("#word-recall").hide();
    $("#delayed-word-recall").hide();
    $("#concentration").hide();
    $("#twelve-months").hide();
    $("#modified-bess").hide();
    $("#coordination").hide();
    $("#total-score").show();
}