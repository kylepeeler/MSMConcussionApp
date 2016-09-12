/**
 * Created by Kyle on 9/8/16.
 */

//Orientation Test Variables
var orientationValues = {
    whereAreWe: false,
    period: false,
    lastScore: false,
    lastGamePlayer: false,
    lastGameWin: false
};

var coordinationValues = {
    upperExtremity: false,
    fingerToNose: false
};

var wordRecallLists = [
    ["Bacon", "Hunter", "Paper", "Silver", "Rabbit"],
    ["Coffee", "Airplane", "Water", "Basket", "Olive"],
    ["Mountain", "Bamboo", "Chimney", "Acorn", "Stomach"]
];

var concentrationSequences = [
    ["3-1-6", "4-6-1", "3-7-5", "2-4-1"],
    ["4-8-3-7", "9-7-3-6", "9-6-3-8", "5-2-1-8"],
    ["5-1-6-9-2", "6-4-5-8-3", "2-7-1-5-3", "1-3-2-9-7"],
    ["8-4-2-6-5-8", "2-8-4-7-1-9", "6-8-2-4-9-1", "9-1-3-6-4-2"]
];

var concentrationSequenceIndex = 0;
var concentrationSequenceLength = 3;
var concentrationScore = 0;
var timerStarted = false;
var twelveMonthsCorrect = false;



$(document).ready(function(){
    showOrientation();
    initializeScores();
    generateWordRecallLists();
    $("#timerControl").click(function(){
       start30SecTimer();
    });
});

function start30SecTimer(){
    if (!timerStarted){
        timerStarted = true;
        var timeLeft = 30;
        var elem = document.getElementById('timer');
        var timerButton = document.getElementById('timerControl');
        var timerId = setInterval(countdown, 1000);

        function countdown() {
            if (timeLeft == 0) {
                clearTimeout(timerId);
                alert("Time is up");
                timerStarted = false;
                elem.innerHTML = "Click button to start timer";
            } else {
                elem.innerHTML = timeLeft + ' seconds remaining';
                timeLeft--;
                timerButton.innerHTML = "Reset timer";
                timerButton.click(function(){
                    clearTimeout(timerId);
                    timerButton.innerHTML = "Start timer";
                    $("#timerControl").click(function(){
                        start30SecTimer();
                    });
                });

            }
        }
    }
}

function addToConcentrationScore(){
    if (concentrationScore < 4){
        concentrationScore++;
    }
    $("#total-concentration").val(concentrationScore);
}

function generateConcentrationSequence(length, curIndex){
    if (concentrationScore < 3){
        if (length < 3){
            length = 3;
        }
        if (length > 6){
            length = 6;
        }
        var randIndex = -1;
        do{
            randIndex = Math.floor(Math.random() * 4);
        }while (randIndex == curIndex);
        concentrationSequenceIndex = randIndex;
        if (length == 3){
            $(".sequence").html(concentrationSequences[0][randIndex]);
        }else if (length == 4){
            $(".sequence").html(concentrationSequences[1][randIndex]);
        }else if (length == 5){
            $(".sequence").html(concentrationSequences[2][randIndex]);
        }else if (length == 6){
            $(".sequence").html(concentrationSequences[3][randIndex]);
        }
        else{
            return "Invalid length";
        }
    }else{
        alert("Test completed");
    }
}

function generateWordRecallLists(){
    //get a random word list
    var wordListIndex = Math.floor((Math.random() * wordRecallLists.length));
    var wordList = wordRecallLists[wordListIndex];
    var wordListOutput = "";
    for (var i = 0; i < wordList.length; i++){
        wordListOutput += "<div class='checkbox word-list-checkbox'><label><input type='checkbox' value='1'> " +  wordList[i] + "</label></div>"
    }
    //output the html
    $(".word-list").each(function(){
        $(this).html(wordListOutput);
    });
    //update the score (should set to 0 with new list)
    $("#total-word-recall").val(calculateWordRecallScore());
    //reset the delayed word recall list
    $("#total-delayed-word-recall").val(calculateDelayedWordRecallScore());
    //setup the event handler
    $(".word-list-checkbox").click(function(){
        //update the total score
        $("#total-word-recall").val(calculateWordRecallScore());
    });
}

function initializeScores(){
    $("#total-orientation").val(0);
}

function calculateOrientationScore(){
    var orientationTestScore = 0;
    if (orientationValues.whereAreWe){
        orientationTestScore++;
    }
    if (orientationValues.period){
        orientationTestScore++;
    }
    if (orientationValues.lastScore){
        orientationTestScore++;
    }
    if (orientationValues.lastGamePlayer){
        orientationTestScore++;
    }
    if (orientationValues.lastGameWin){
        orientationTestScore++;
    }
    return orientationTestScore;
}

function calculateWordRecallScore(){
    var trial1Sum = 0;
    var trial2Sum = 0;
    var trial3Sum = 0;
    $(".trial-1-list input").each(function(){
        if ($(this).is(":checked")){
            trial1Sum++;
        }
    });
    $(".trial-2-list input").each(function(){
        if ($(this).is(":checked")){
            trial2Sum++;
        }
    });
    $(".trial-3-list input").each(function(){
        if ($(this).is(":checked")){
            trial3Sum++;
        }
    });
    return trial1Sum + trial2Sum + trial3Sum;
}

function calculateDelayedWordRecallScore(){
    var delayedSum = 0;
    $(".delayed-trial-list input").each(function(){
       if ($(this).is(":checked")){
           delayedSum++;
       }
    });
    return delayedSum;
}

function resetOrientation(){
    var reallyReset = confirm("Are you sure you want to reset the orientation test?");
    if (reallyReset){
        orientationValues.whereAreWe = false;
        orientationValues.period = false;
        orientationValues.lastScore = false;
        orientationValues.lastGamePlayer = false;
        orientationValues.lastGameWin = false;
        //update the total score
        $("#total-orientation").val(calculateOrientationScore());
        //enable all orientation buttons
        var $correctButtons = $(".orientation-correct");
        var $incorrectButtons = $(".orientation-incorrect");
        $correctButtons.prop('disabled', false);
        $incorrectButtons.prop('disabled', false);
        //set all buttons to default style
        $correctButtons.removeClass('btn-primary');
        $incorrectButtons.removeClass('btn-primary');
        $correctButtons.addClass('btn-default');
        $incorrectButtons.addClass('btn-default');
    }
}

function showOrientation(){
    //show orientation div and hide all other tests
    $("#orientation").show();
    $("#word-recall").hide();
    $("#delayed-word-recall").hide();
    $("#concentration").hide();
    $("#twelve-months").hide();
    $("#modified-bess").hide();
    $("#coordination").hide();
    $("#total-score").hide();

    //add to orientation score on correct and disable button to prevent duplicate clicks
    $(".orientation-correct").click(function(event){
        //update the css to add the primary class and remove default class
        $(this).removeClass('btn-default');
        $(this).addClass('btn-primary');
        //update the css of the other button to change to default
        $(this).parent().next().children().removeClass('btn-primary');
        $(this).parent().next().children().addClass('btn-default');
        //disable the correct button
        $(this).prop('disabled', true);
        //set the proper value
        if (event.target.id == "where-are-we-correct"){
            orientationValues.whereAreWe = true;
        }else if (event.target.id == "period-correct"){
            orientationValues.period = true;
        }else if (event.target.id == "last-score-correct"){
            orientationValues.lastScore = true;
        }else if (event.target.id == "last-game-player-correct"){
            orientationValues.lastGamePlayer = true;
        }else if (event.target.id == "last-game-win-correct"){
            orientationValues.lastGameWin = true;
        }
        //enable the correct button
        $(this).parent().next().children().prop('disabled', false);
        //update the total score
        $("#total-orientation").val(calculateOrientationScore());
    });

    $(".orientation-incorrect").click(function(){
        //update the css to add the primary class and remove default class
        $(this).removeClass('btn-default');
        $(this).addClass('btn-primary');
        //update the css of the other button to change to default
        $(this).parent().prev().children().removeClass('btn-primary');
        $(this).parent().prev().children().addClass('btn-default');
        //disable incorrect button
        $(this).prop('disabled', true);
        //set the proper value
        if (event.target.id == "where-are-we-incorrect"){
            orientationValues.whereAreWe = false;
        }else if (event.target.id == "period-incorrect"){
            orientationValues.period = false;
        }else if (event.target.id == "last-score-incorrect"){
            orientationValues.lastScore = false;
        }else if (event.target.id == "last-game-player-incorrect"){
            orientationValues.lastGamePlayer = false;
        }else if (event.target.id == "last-game-win-incorrect"){
            orientationValues.lastGameWin = false;
        }
        //enable the closest correct button
        $(this).parent().prev().children().prop('disabled', false);
        //update the total score
        $("#total-orientation").val(calculateOrientationScore());
    });
}

function resetConcentrationSequence(){
    concentrationSequenceIndex = 0;
    concentrationSequenceLength = 3;
    concentrationScore = 0;
    generateConcentrationSequence(3, 0);
    $("#total-concentration").val(0);
}

function resetWordRecall(){
    //uncheck all the boxes
    $(".word-list-checkbox input").each(function(){
       $(this).prop('checked', false);
    });
    //recalculate the score
    $("#total-word-recall").val(calculateWordRecallScore());
}

function resetDelayedWordRecall(){
    //uncheck all the boxes
    $(".delayed-trial-list input").each(function(){
        $(this).prop('checked', false);
    });
    //recalculate the score
    $("#total-delayed-word-recall").val(calculateDelayedWordRecallScore());
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
    $(".delayed-trial-list").click(function(){
        $("#total-delayed-word-recall").val(calculateDelayedWordRecallScore());
    })

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
    generateConcentrationSequence(concentrationSequenceLength, concentrationSequenceIndex);
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

    //add to orientation score on correct and disable button to prevent duplicate clicks
    $(".twelve-months-correct").click(function(event){
        //update the css to add the primary class and remove default class
        $(this).removeClass('btn-default');
        $(this).addClass('btn-primary');
        //update the css of the other button to change to default
        $(this).parent().next().children().removeClass('btn-primary');
        $(this).parent().next().children().addClass('btn-default');
        //disable the correct button
        $(this).prop('disabled', true);
        //enable the correct button
        $(this).parent().next().children().prop('disabled', false);
        //update the value
        twelveMonthsCorrect = true;
    });

    $(".twelve-months-incorrect").click(function(){
        //update the css to add the primary class and remove default class
        $(this).removeClass('btn-default');
        $(this).addClass('btn-primary');
        //update the css of the other button to change to default
        $(this).parent().prev().children().removeClass('btn-primary');
        $(this).parent().prev().children().addClass('btn-default');
        //disable incorrect button
        $(this).prop('disabled', true);
        //enable the closest correct button
        $(this).parent().prev().children().prop('disabled', false);
        //update the value
        twelveMonthsCorrect = false;
    })
}

var totalBessScore = 0;

function addBessError(){
    totalBessScore++;
    $("#total-modified-bess").val(totalBessScore);
}

function removeBessError(){
    totalBessScore--;
    if (totalBessScore < 0){
        totalBessScore = 0;
    }
    $("#total-modified-bess").val(totalBessScore);
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

function calculateCoordinationScore(){
    var coordinationScore = 0;
    if (coordinationValues.fingerToNose){
        coordinationScore++;
    }if (coordinationValues.upperExtremity){
        coordinationScore++;
    }
    return coordinationScore;
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
    //add to orientation score on correct and disable button to prevent duplicate clicks
    $(".coordination-success").click(function(event){
        //update the css to add the primary class and remove default class
        $(this).removeClass('btn-default');
        $(this).addClass('btn-primary');
        //update the css of the other button to change to default
        $(this).parent().next().children().removeClass('btn-primary');
        $(this).parent().next().children().addClass('btn-default');
        //disable the correct button
        $(this).prop('disabled', true);
        //set the proper value
        if (event.target.id == "upperExtremitySuccess"){
            coordinationValues.upperExtremity = true;
        }else if (event.target.id == "fingerToNoseSuccess") {
            coordinationValues.fingerToNose = true;
        }
        $(this).parent().next().children().prop('disabled', false);
        //update the total score
        $("#total-coordination").val(calculateCoordinationScore());
    });

    $(".coordination-failure").click(function(){
        //update the css to add the primary class and remove default class
        $(this).removeClass('btn-default');
        $(this).addClass('btn-primary');
        //update the css of the other button to change to default
        $(this).parent().prev().children().removeClass('btn-primary');
        $(this).parent().prev().children().addClass('btn-default');
        //disable incorrect button
        $(this).prop('disabled', true);
        //set the proper value
        if (event.target.id == "upperExtremityFailure"){
            coordinationValues.upperExtremity = false;
        }else if (event.target.id == "fingerToNoseFailure") {
            coordinationValues.fingerToNose = false;
        }
        //enable the closest correct button
        $(this).parent().prev().children().prop('disabled', false);
        //update the total score
        $("#total-coordination").val(calculateCoordinationScore());
    })
}

function calculateTotalMaddocksScore(){
    var twelveMonthsCorrect = 0;
    if ($(".twelve-months-correct").hasClass("btn-primary")){
        twelveMonthsCorrect = 1;
    }
    return parseInt($("#total-orientation").val()) + parseInt($("#total-word-recall").val()) + parseInt($("#total-delayed-word-recall").val()) + parseInt($("#total-concentration").val()) + twelveMonthsCorrect;
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
    $("#final-maddocks-score").html(calculateTotalMaddocksScore());
    $("#final-balance-score").html($("#total-modified-bess").val());
    $("#final-coordination-score").html($("#total-coordination").val());
}