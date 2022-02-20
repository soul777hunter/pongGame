/*
//
// Variables
//
*/

let xBall = 300; // X-Axis
let yBall = 200; // Y-Axis
let dBall = 15; // Diameter
let radius = dBall / 2; // Radius = Diameter / 2

let speedXBall = 10; // Ball speed
let speedYBall = 10; // Ball speed

// Racket
let wRacket = 10; // Width
let hRacket = 90; // Height

// Player Racket
let xRacketPlayer = 5; // X-Axis
let yRacketPlayer = 150; // Y-Axis

// Opponent Racket
let xRacketOpponent = 585; // X-Axis
let yRacketOpponent = 150; // Y-Axis
let speedOpponent = 0;

// Points
let playerPoints = 0;
let opponentPoints = 0;

// Sound
let point;

/*
//
// Functions
//
*/

function preload() {
  point = loadSound("./point.mp3");
}

function setup() {
  createCanvas(600, 400);
}
  
function draw() {
  background(0);

  ball();
  ballMovement();

  racket(xRacketPlayer, yRacketPlayer);
  racket(xRacketOpponent, yRacketOpponent);
  racketMovement();
  racketMovementOpponent();

  racketCollisionVerify(xRacketOpponent, yRacketOpponent);
  racketCollisionVerify(xRacketPlayer, yRacketPlayer);
  ballCollisionVerify();

  scoreboard();
}

// Ball Functions
function ball() {
  circle(xBall, yBall, dBall);
}
  
function ballMovement() {
  xBall += speedXBall;
  yBall += speedYBall;
}

//
// Racket Functions
//

function racket(x, y) {
  rect(x, y, wRacket, hRacket);
}

// Player Movement
function racketMovement() {
  if(keyIsDown(UP_ARROW)) {
    yRacketPlayer -= 10;
  }

  if(keyIsDown(DOWN_ARROW)) {
    yRacketPlayer += 10;
  }
}

// Opponent Movement
function racketMovementOpponent() {
  speedOpponent = yBall - yRacketOpponent - wRacket / 2 - 30;
  yRacketOpponent += speedOpponent;
}

//
// Collision Functions
//

function ballCollisionVerify() {
  if((xBall + radius) > width || (xBall - radius) < 0) {
    speedXBall *= -1;
  }

  if((yBall + radius) > height || (yBall - radius) < 0) {
    speedYBall *= -1;
  }
}

function racketCollisionVerify(x, y){
  let collided = collideRectCircle(x, y, wRacket, hRacket, xBall, yBall, radius);
  if (collided){
    speedXBall *= -1;
  }
}

//
// Scoreboard
//

function scoreboard() {
  // Show scoreboard
  fill(255);
  textSize(22);
  text(playerPoints, 275, 35);
  text(opponentPoints, 315, 35);

  // Condition to make points
  if(xBall > 590) {
    playerPoints++;
    point.play();
  }

  if(xBall < 10) {
    opponentPoints++;
    point.play();
  }
}