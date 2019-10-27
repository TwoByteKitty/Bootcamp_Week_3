function getDate() {
var momDate = moment().format("dddd, MMMM Do, YYYY"); 
console.log(momDate);
$("#dateDiv").html(momDate);
}

getDate();

// alert-dark alert-primary alert-success

function hourColor() {
    var currentHr = moment().format(".a.h");
    console.log(currentHr);
}

hourColor();