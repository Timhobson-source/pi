const TWO_PI = 2 * Math.PI;
const DP = 10;  // decimal place precision for UI
var running = false;
var numPoints = 0;
var numPointsInCircle = 0;
var xValues = [];
var yValues = [];

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

function determineAddPointToChart(n) {
    if (n < 25) {
        return true;
    }
    else {
        return (n % 15 == 0);
    }
}

function addSimulation() {
    var canvas = document.getElementById("square");
    var resultsBox = document.getElementById('resultsbox');

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

    // only plot every ten points
    drawPoint(x, y);

    if (determineAddPointToChart(numPoints)) {
        addDataToChart(chart, numPoints, approx);
    }
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


function addDataToChart(chart, label, data) {
    chart.data.labels.push(label);
    chart.data.datasets.forEach((dataset) => {
        dataset.data.push(data);
    });
    chart.update();
}


function handleKeyPress(event) {
    // if the user presses enter or space, run/stop the simulation
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

    chart = new Chart("myChart", {
        type: "line",
        data: {
            labels: xValues,
            datasets: [{
                backgroundColor: "rgba(0,0,0,0)",
                borderColor: "rgba(0,0,0,1)",
                data: yValues
            }]
        },
        options: {
            elements: {
                point: {
                    borderWidth: 0,
                    radius: 0,
                    backgroundColor: 'rgba(0,0,0,0)'
                },
            },
            // add legend to chart
            legend: {
                display: false
            },
            title: {
                display: false,
            },
            scales: {
                xAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Number of Simulations',
                        fontSize: 20,
                        color: "black",
                    },
                    ticks: {
                        fontSize: 15,
                        color: "black",
                    }
                }],
                yAxes: [{
                    display: true,
                    scaleLabel: {
                        display: true,
                        labelString: 'Approximation',
                        fontSize: 20,
                        color: "black",
                    },
                    ticks: {
                        fontSize: 15,
                        color: "black",
                    }
                }]
            },
            plugins: {
                annotation: {
                    annotations: [{
                        type: 'line',
                        mode: 'horizontal',
                        scaleID: 'y-axis-1',
                        value: Math.PI,
                        borderColor: 'red',
                        borderWidth: 4,
                        label: {
                            enabled: false,
                            content: 'Test label'
                        },
                        position: "top"
                    }]
                }
            }
        }
    });

    document.addEventListener('keypress', handleKeyPress);
};

