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

var wordRecallLists = [
    ["Bacon", "Hunter", "Paper", "Silver", "Rabbit"],
    ["Coffee", "Airplane", "Water", "Basket", "Olive"],
    ["Mountain", "Bamboo", "Chimney", "Acorn", "Stomach"]
];

$(document).ready(function(){
    showOrientation();
    initializeScores();
    generateWordRecallLists();
});

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
    })
}

function resetWordRecall(){
    //uncheck all the boxes
    $(".word-list-checkbox input").each(function(){
       $(this).prop('checked', false);
    });
    //recalculate the score
    $("#total-word-recall").val(calculateWordRecallScore());
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