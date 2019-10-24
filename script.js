


function startGame() {
    //get id question + start sections
    var queSection = document.getElementById("multiChoiceQ");
    var startSection = document.getElementById("startScr");
    //hide start
    startSection.classList.add("d-none");
    //show questions
    queSection.classList.remove("d-none");
    //pass questions global from questions.js
    buildQue(questions);
    //start timer

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


function showNextQue() {
    var currentQuestion = document.querySelectorAll(".question:not(.d-none)")[0];
    //Get number from current Item id by splitting string and parsing number and adding 1
    var currentIndex = Number.parseInt(currentQuestion.id.split("-")[1]);
    currentQuestion.classList.add("d-none");
    document.getElementById(`question-${++currentIndex}`).classList.remove('d-none');
}


function checkAnswer(event) {
    //querySelectorAll returns an array need toget first element.
    //The a query string says give me all item with a question class that are not hidden
    var currentQuestion = document.querySelectorAll(".question:not(.d-none)")[0];
    var currentAnswer = currentQuestion.dataset.answer;
    //check clicked button
    //Use Event Object to look at data-choice attribute on element
    var currentChoice = event.currentTarget.dataset.choice;
    //look at property data-choice and compare to data-answer on parent
    if(currentChoice === currentAnswer){
        //Show `Right` text
        //Add point to score
    }else{
        //Show `Wrong` text
        //Subtract 15 seconds
    }
    //Show next question
    showNextQue();
}


function updatePlayerSc() {

}



