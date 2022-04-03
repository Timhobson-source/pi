const TWO_PI = 2 * Math.PI;
const radiusBuffer = 10;
const DP = 10;  // decimal place precision for UI
var running = false;
var numPoints = 0;
var numPointsInCircle = 0;


function clearCanvas(canvas, context) {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function drawCircle() {
    var canvas = document.getElementById("square");
    var context = canvas.getContext("2d");

    var circle = {
        width: canvas.width / 2,
        height: canvas.height / 2,
        radius: canvas.width / 2
    }
    context.lineWidth = 3;

    context.beginPath();
    context.arc(circle.width, circle.height, circle.radius, 0, TWO_PI);
    context.stroke();

    drawPoint(circle.width, circle.height, "black");
}

function drawPoint(x, y, color = "red") {
    // get canvas and context
    var canvas = document.getElementById("square");
    var context = canvas.getContext("2d");

    context.beginPath();
    context.arc(x, y, 1, 0, TWO_PI);
    context.fillStyle = color;
    context.fill();
}

function drawRandomPoint() {
    var canvas = document.getElementById("square");
    var x = Math.floor(Math.random() * canvas.width);
    var y = Math.floor(Math.random() * canvas.height);
    var radius = canvas.width / 2;
    var center_x = canvas.width / 2;
    var center_y = canvas.height / 2;

    numPoints++;
    if ((x - center_x) ** 2 + (y - center_y) ** 2 <= radius ** 2) {
        numPointsInCircle++;
    }

    drawPoint(x, y);
    var resultsBox = document.getElementById('resultsbox');
    var approx = (4 * numPointsInCircle / numPoints).toFixed(DP);
    resultsBox.innerHTML =
        "Approximation:<br> " + approx.toString()
        + "<br><br>Total Points:<br> " + numPoints.toString()
        + "<br><br>Points In Circle:<br> " + numPointsInCircle.toString();
}

function run() {
    if (running == false) {
        console.log("running");
        running = true;

        button = document.getElementById('button');
        button.innerHTML = "Stop";
        button.intervalId = setInterval(drawRandomPoint, 0.01);
    }
    else {
        console.log("stopping");
        running = false;

        button = document.getElementById('button');
        button.innerHTML = "Go";
        clearInterval(button.intervalId);
    }
}


window.onload = function () {
    button = document.getElementById('button');
    button.innerHTML = "Go";

    var resultsBox = document.getElementById('resultsbox');
    resultsBox.innerHTML = "Click \"Go\" to start";
    drawCircle();
};
