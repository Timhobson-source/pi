const TWO_PI = 2 * Math.PI;
const DP = 10;  // decimal place precision for UI
var running = false;
var numPoints = 0;
var numPointsInCircle = 0;
var xValues = [];
var yValues = [];


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

function addSimulation() {
    var canvas = document.getElementById("square");
    var resultsBox = document.getElementById('resultsbox');

    for (var i = 0; i < 10; i++) {
        var x = Math.floor(Math.random() * canvas.width);
        var y = Math.floor(Math.random() * canvas.height);
        var radius = canvas.width / 2;
        var center_x = canvas.width / 2;
        var center_y = canvas.height / 2;

        numPoints++;
        if ((x - center_x) ** 2 + (y - center_y) ** 2 <= radius ** 2) {
            numPointsInCircle++;
        }

        var approx = (4 * numPointsInCircle / numPoints).toFixed(DP);
        xValues.push(numPoints);
        yValues.push(approx)
        drawPoint(x, y);
    }

    drawChart(xValues, yValues);
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
        button.intervalId = setInterval(addSimulation, 0.01);
    }
    else {
        console.log("stopping");
        running = false;

        button = document.getElementById('button');
        button.innerHTML = "Go";
        clearInterval(button.intervalId);
    }
}

function drawChart(xVals, yVals) {
    new Chart("myChart", {
        type: "line",
        data: {
            labels: xVals,
            datasets: [{
                backgroundColor: "rgba(0,0,0,0)",
                borderColor: "rgba(0,0,0,1)",
                data: yVals
            }]
        },
        options: {}
    });
}


function handleKeyPress(event) {
    // if the user presses enter, run the simulation
    console.log(event.keyCode);
    if (event.keyCode == 13 | event.keyCode == 32) {
        run();
    }
}


window.onload = function () {
    var button = document.getElementById('button');
    button.innerHTML = "Go";

    var resultsBox = document.getElementById('resultsbox');
    resultsBox.innerHTML = "Click \"Go\" to start";
    drawCircle();
    drawChart(xValues, yValues);

    document.addEventListener('keypress', handleKeyPress);
};
