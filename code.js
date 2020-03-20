var canvas;
var canvasContext;
var ballX = 50;

window.onload = function(){
    console.log("Hellow World!");
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    var framesPerSecond = 30;
    // setInterval(drawEverything, 1000/framesPerSecond); 
    drawEverything();
}


// momement code separated into another function
function drawEverything()
{
    ballX = ballX + 5;

    console.log(ballX);
    canvasContext.fillStyle = 'grey';
    canvasContext.fillRect(0,0,canvas.width,canvas.height);
    
    canvasContext.fillStyle = 'turquoise';
    canvasContext.fillRect(0,210,15,100);
    
    canvasContext.fillStyle = 'chartreuse';
    canvasContext.fillRect(ballX,100,15,10);
}







console.log("Hello World!");
console.log(canvas);