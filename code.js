var canvas;
var canvasContext;
var ballX = 50;     //ball start position left/right
var ballY = 50;     //ball start position up/down
var ballSpeedX = 10;    //speed left/right
var ballSpeedY = 4;     //speed up/down

var player1Score = 0;   //you
var player2Score = 0;   //computer
const WINNING_SCORE = 3;

var showingWinScreen = false;

var paddle1Y = 210;     //You  paddle start location
var paddle2Y = 210;     //Computer  paddle start location
const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10;
const RADIUS = 10;  


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

function handleMouseClick(evt)
{
    if(showingWinScreen)
    {
        player1Score = 0;
        player2Score = 0;
        showingWinScreen = false;
    }
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

    canvas.addEventListener('mousedown',handleMouseClick)
}


function ballReset()
{
    if(player1Score == WINNING_SCORE || player2Score == WINNING_SCORE)
    {
        showingWinScreen = true;
    }

    ballSpeedX = -ballSpeedY;
    ballX = canvas.width/2;
    ballY = canvas.height/2;
}


//this will ignore paddle chasing when it's 35 pixels above or below center (70 pixel span)
function computerPlay()
{
    var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
    if (paddle2YCenter < ballY - 35)    
    {
        paddle2Y += 10;
    } else if (paddle2YCenter > ballY + 35)
    {
        paddle2Y -= 10;
    }
} 


function moveEverything() 
{
    //computerPlay();

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballX > canvas.width)
    {
        if (ballY > (paddle1Y) && ballY < paddle1Y + PADDLE_HEIGHT)
        {
            ballSpeedX = -ballSpeedX; 

            var deltaY = ballY - (paddle1Y + PADDLE_HEIGHT/2);      //mixes trajectory of ball when hit in particular location of paddle.
            ballSpeedY = deltaY * .33;  //.33 makes the speed a little less crazy and moderates it.
        } else {
            
            player2Score += 1;  //must be before ballReset()
            ballReset();
        }    //if ball hits above or below "you" paddle, it will reset and give computer a point. If it hits the paddle, ball will turn around.
    }
    if (ballX < 0)
    {
        if (ballY > (paddle2Y + RADIUS) && ballY < paddle2Y + (PADDLE_HEIGHT + RADIUS))
        {
            ballSpeedX = -ballSpeedX; 

            var deltaY = ballY - (paddle2Y + PADDLE_HEIGHT/2);      //mixes trajectory of ball when hit in particular location of paddle.
            ballSpeedY = deltaY * .33;  //.33 makes the speed a little less crazy and moderates it.
        } else {
            
            player1Score += 1;  //must be before ballReset();
            ballReset();
        }   //if ball hits above or below "computer" paddle, it will reset and give you a point. If it hits the paddle, ball will turn around.
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


function drawNew() 
{
    for(var i=0;i<canvas.height; i+=40)
    {
        colorRect(canvas.width/2-1,i,2,20,'turquoise');
    }
}

// all things visual
function drawEverything()
{
    colorRect(0,0,canvas.width,canvas.height,'grey');  //grey background

    if (showingWinScreen) 
    {
        ballSpeedX = 0;
        canvasContext.fillStyle = 'turquoise';

        if (player1Score == WINNING_SCORE)
        {
            canvasContext.fillText("You won!", 250, canvas.height/4);
        } else if (player2Score == WINNING_SCORE)
        {
            canvasContext.fillText ("Computer Won", 450,canvas.height/4);
        }

        canvasContext.fillText("click to continue",canvas.width/2 - 45, canvas.height/2);
        return;
    }


    //background
    colorRect(0,0,canvas.width,canvas.height,'grey');
    
    //left player paddle (computer)
    colorRect(0,paddle2Y,PADDLE_THICKNESS,PADDLE_HEIGHT,'turquoise');
    
    //right player paddle (you)
    colorRect(canvas.width-PADDLE_THICKNESS,paddle1Y,PADDLE_THICKNESS,PADDLE_HEIGHT,'turquoise');

    //ball
    colorCircle(ballX, ballY, RADIUS,'chartreuse');

    //player scores
    canvasContext.fillText(player1Score,canvas.width/2 + 100, 100);
    canvasContext.fillText(player2Score,canvas.width/2 - 100, 100);
}


//template for rectangular shapes
function colorRect(X,Y,width,height,drawColor)
{
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(X,Y,width,height);
}

//template for circular shapes
function colorCircle(centerX, centerY, radius, drawColor)
{
    canvasContext.fillStyle = drawColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX,centerY,radius,0, Math.PI*2, true);
    canvasContext.fill();
}