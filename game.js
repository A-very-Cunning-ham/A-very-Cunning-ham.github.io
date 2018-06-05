
var time = 10; //in seconds

var count = 0;
var score = 0;

var categs = JSON.parse(sessionStorage.categs)


 function joinCategs (categs) {
     let array = [];
     let i = 0;
     for (i=0;i < categs.length; i++) {
         if (categs[i]) {
             array = array.concat(units[i]);
         }
     }
     return array;
 }
var currentCategs = joinCategs(categs);


function randomQA (array, n) {
    let x = array[(generateRandom(0, array.length-1, n[0]))]
    if (checkDupes (x, n) === true) {
        return randomQA(array, n);
    } else {
        return x
    }
}

function checkDupes (a, as) {
    for (i=0;i<=as.length; i++) {
        if (a === as[i]) {
            return true;
        }
    }
}

var doneQuestions = [-1];
function nextQuestion(){
  $("#correct_answer").html("");
  answered = false;
  resetBoard();
  startTimer();
  if (doneQuestions.length-1 === currentCategs.length) {
      $("#currentQuestion").html("All questions used");
      return 0;
  }
  currentQuestion = randomQA(currentCategs, doneQuestions);
  let exc = [currentQuestion]; //Temp array of excluded values
  let a1 = randomQA(currentCategs, exc);
  exc = [currentQuestion, a1];
  let a2 = randomQA(currentCategs, exc);
  exc = [currentQuestion, a1, a2];
  let a3 = randomQA(currentCategs, exc);

  answers = [currentQuestion[0],a1[0],a2[0],a3[0]];

  answers = shuffle(answers);
  $("#currentQuestion").html(currentQuestion[1]);
  $("#answer1").html(answers[0]);
  $("#answer2").html(answers[1]);
  $("#answer3").html(answers[2]);
  $("#answer4").html(answers[3]);
  doneQuestions.push(currentQuestion);
  count++;
  $("#qs_left").html("Questions Remaining: "+((currentCategs.length)-(doneQuestions.length)+1));
}


$(document).ready(function(){

    $("#a").click(function(){
        $("div.button").hide();
    });

    $("#startButton").click(function(){
      $(this).html("Next Question");
      nextQuestion();
    });

    $(document).on("keypress", function (e) {
        if (e.which === 113) {
            checkAnswer(answers[0], "#buttonA");
        }
        if (e.which === 119) {
            checkAnswer(answers[1], "#buttonB");
        }
        if (e.which === 101) {
            checkAnswer(answers[2], "#buttonC");
        }
        if (e.which === 114) {
            checkAnswer(answers[3], "#buttonD");
        }
    });

    $("#buttonA").click(function(){
        checkAnswer(answers[0], this);
    });
    $("#buttonB").click(function(){
        checkAnswer(answers[1], this);
    });
    $("#buttonC").click(function(){
        checkAnswer(answers[2], this);
    });
    $("#buttonD").click(function(){
        checkAnswer(answers[3], this);
    });


});

function startTimer(){
    $("#timer").finish().css('width','200px');
    $("#timer").animate({width:'0px'}, time*1000, function(){
    $("#correct_answer").html("Correct Answer: "+currentQuestion[0]);
    doneQuestions.splice(-1,1);
    });

}

function stopTimer(){
    $("#timer").stop(true);
}

function shuffle(array) {
    var i = array.length,
        j = 0,
        temp;

    while (i--) {
        j = Math.floor(Math.random() * (i+1));
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function generateRandom(min, max, i) {
    var num = Math.floor(Math.random() * (max - min + 1)) + min;
    return (num === i[0]) ? generateRandom(min, max, i) : num;
}

var answered = false;

function checkAnswer(ans, id){
  console.log(ans);
  console.log(currentQuestion[0]);
    if (answered === true) {
        return 0;
    };

    if(ans === currentQuestion[0]){
    incrementScore(id);
    answered = true;
    stopTimer();

  }else{
    $(id).html("<p class=buttonText>Incorrect</p>");
    stopTimer();
    answered = true;
    $("#correct_answer").html("Correct Answer: "+currentQuestion[0]);
    // return false;
  }
  let pc = (Math.floor((score/count)*100))
  if (pc === Infinity) {
      let pc = 0;
  }
  $("#percent_right").html("Percent Right: " + pc +"%");
}

function incrementScore(id){
      $(id).html("<p class=buttonText>Correct</p>");
      score++;
      $("#score").html("Score: "+score);
}

function resetBoard(){
  $("#timer").removeAttr('style');;
  $('#buttonA').html("A");
  $('#buttonB').html("B");
  $('#buttonC').html("C");
  $('#buttonD').html("D");
}
