var timer;
var scoresArray;
var playerScore = 0;
var gameLength = questions.length * 15;

function startGame() {
    //get id question + start sections
    var queSection = document.getElementById("multiChoiceQ");
    var startSection = document.getElementById("startScr");
    var timerDisplay = document.getElementById("timeRemain");
    var gameLength = questions.length * 15;
    //hide start
    startSection.classList.add("d-none");
    //show questions
    queSection.classList.remove("d-none");
    //pass questions global from questions.js
    buildQue(questions);
    var scoresText = localStorage.getItem("scores");
    if (scoresText) {
        scoresArray = JSON.parse(scoresText);
    } else {
        scoresArray = [];
    }
    //start timer
    playerScore = gameLength;
    timer = startTimer(playerScore, timerDisplay);
}

function buildQue(questions = []) {
    var questionsHtml = '';
    //loop over questions array
    for (var i = 0; i < questions.length; i++) {
        var listItemsHtml = '';
        var currentQuestion = questions[i];
        var choices = questions[i].choices;

        //loop over choices
        for (var j = 0; j < choices.length; j++) {
            var currentChoice = choices[j];
            var listItemTemplate = `<li class="list-group-item">
            <button class="btn btn-lg btn-block btn-info" onclick="checkAnswer(event)"
            data-choice="${currentChoice}">${currentChoice}</button>
            </li>`
            listItemsHtml += listItemTemplate;
        }

        var questionTemplate = `<div id="question-${i}" data-answer="${currentQuestion.answer}" class="question ${i !== 0 ? 'd-none' : ''}">
            <p class="lead" id="questionBox-${i}">${currentQuestion.title}</p>
            <hr class="my-4">
            <ul class="list-group">
                ${listItemsHtml}
            </ul>
        </div>`;
        questionsHtml += questionTemplate;
    }
    document.getElementById('question-tron').innerHTML = questionsHtml
}

function startTimer(duration, display) {
    var timer = duration, seconds;
    return setInterval(function () {
        seconds = parseInt(playerScore % 60, 10);
        display.textContent = seconds;
        --playerScore;
    }, 1000);
}

function showNextQue() {
    var playerFdbk = document.getElementById('feedback');
    var currentQuestion = document.querySelectorAll(".question:not(.d-none)")[0];
    //Get number from current quiz item id (split string, parse number, add 1)
    var currentIndex = Number.parseInt(currentQuestion.id.split("-")[1]);
    if (currentIndex !== questions.length - 1) {
        //Next Question
        currentQuestion.classList.add("d-none");
        playerFdbk.innerHTML = "";
        document.getElementById(`question-${++currentIndex}`).classList.remove('d-none');
    } else {
        // stop timer and show finished section
        clearInterval(timer);
        document.getElementById("playerScrDispl").textContent = playerScore;
        document.getElementById("multiChoiceQ").classList.add("d-none");
        document.getElementById("finishLine").classList.remove("d-none");
    }
}

function submitScore(event) {
    var playerName = document.getElementById("playerName").value;
    //Push a score object;
    scoresArray.push({ playerName: playerName, playerScore: playerScore });
    localStorage.setItem("scores", JSON.stringify(scoresArray));
    location.href = "scores.html";
}

function checkAnswer(event) {
    //querySelectorAll returns an array. need to get first element.
    var currentQuestion = document.querySelectorAll(".question:not(.d-none)")[0];
    var currentAnswer = currentQuestion.dataset.answer;
    //check clicked button
    //Use Event Object to look at data-choice attribute on element
    var currentChoice = event.currentTarget.dataset.choice;
    var playerFdbk = document.getElementById('feedback');
    //look at property data-choice and compare to data-answer on parent
    if (currentChoice === currentAnswer) {
        //Show "Correct!" text
        playerFdbk.innerHTML = "Correct!";

    } else {
        //Show "Wrong!" text
        playerFdbk.innerHTML = "Wrong!";
        //Subtract 15 seconds
        playerScore = playerScore - 15;
    }
    //Show next question
    setTimeout(showNextQue, 1000);
}
