function getScores() {
    return JSON.parse(localStorage.getItem("scores"));
}

function buildTable() {
    var scores = getScores();
    //loop over score and create table rows and append to body
}

buildTable();