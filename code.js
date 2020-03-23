var canvas;
var canvasContext;
var ballX = 50;     //ball start position left/right
var ballY = 50;     //ball start position up/down
var ballSpeedX = 10;    //speed left/right
var ballSpeedY = 4;     //speed up/down

var paddle1Y = 210;
var paddle2Y = 210;
const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10;
const OVERLAP = 5;

function calculateMousePos(evt)
{
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    var mouseY = evt.clientY - rect.top - root.scrollTop;
    return {
        x: mouseX,
        y: mouseY
    };
}

window.onload = function(){
    console.log("Hellow World!");
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    var framesPerSecond = 30;
    setInterval(function()  //callBoth()
    {
        moveEverything();
        drawEverything(); 
    }, 1000/framesPerSecond); 
    // drawEverything();

    canvas.addEventListener('mousemove',
        function(evt)
        {
            var mousePos = calculateMousePos(evt)
            paddle1Y = mousePos.y-(PADDLE_HEIGHT/2);
        });
}


function ballReset()
{
    ballSpeedX = -ballSpeedX;
    ballX = canvas.width/2;
    ballY = canvas.height/2;
}



function moveEverything() 
{
    
    ballX = ballX + ballSpeedX;
    ballY = ballY + ballSpeedY;

    if (ballX > canvas.width - (PADDLE_THICKNESS + OVERLAP))
    {
        if (ballY > paddle1Y + OVERLAP && ballY < paddle1Y + PADDLE_HEIGHT + OVERLAP)
        {
            ballSpeedX = -ballSpeedX; 
        } else {
            ballReset();
        }    //if ball hits above or below paddle, it will reset. If it hits the paddle, ball will turn around.
    }
    if (ballX < 0)
    {
        ballSpeedX = -ballSpeedX;   //once hit left wall, ball will turn around
    }
    if (ballY > canvas.height)
    {
        ballSpeedY = -ballSpeedY;   //once hit bottom wall, ball will turn around
    }
    if (ballY < 0)
    {
        ballSpeedY = -ballSpeedY;   //once hit top wall, ball will turn around
    }
}

// momement code separated into another function
function drawEverything()
{
    //background
    colorRect(0,0,canvas.width,canvas.height,'grey');
    
    //left player paddle (computer)
    colorRect(0,paddle2Y,PADDLE_THICKNESS,PADDLE_HEIGHT,'turquoise');
    
    //right player paddle (you)
    colorRect(canvas.width-PADDLE_THICKNESS,paddle1Y,PADDLE_THICKNESS,PADDLE_HEIGHT,'turquoise');

    //ball
    colorCircle(ballX, ballY, 10,'chartreuse');
    
}


//template for rectangular shapes
function colorRect(X,Y,width,height,drawColor)
{
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(X,Y,width,height);
}

//templage for circular shapes
function colorCircle(centerX, centerY, radius, drawColor)
{
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX,centerY,radius,0, Math.PI*2, true);
    canvasContext.fill();
}