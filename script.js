


function startGame() {
    //get id question + start sections
    var queSection = document.getElementById("multiChoiceQ");
    var startSection = document.getElementById("startScr");
    //hide start
    startSection.classList.add("d-none");
    //show questions
    queSection.classList.remove("d-none");
}