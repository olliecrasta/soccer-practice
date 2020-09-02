//variable for canvas
var canvas;
//create the ball, playerPaddle and computerPaddle as sprite objects
var ball,ballImg;
var playerPaddle,playerImg,playerFallImg,playerKickImg;
var computerPaddle,computerImg;

//variable to store different state of game
var gameState;

//variables to keep the score
var compScore;
var playerScore;

//variables for sounds
var hitSound;

function preload(){
  //player = loadAnimation("geekyplay.png");
  playerImg = loadImage("playerplay.png");
  ballImg = loadImage("ball.png");
  robotImg = loadImage("robot.png");
  playerFallImg = loadImage("playerfall.png");
  playerKickImg = loadImage("playerkick.png");
  //groundImage = loadImage("ground2.png")
  
  //load sounds
  soundFormats('mp3', 'ogg');
  crashSound = loadSound('crash.ogg');
  kickSound = loadSound('kick.ogg');
  
}

function setup(){
//create canvas
canvas=createCanvas(400,400);
//create the ball, playerPaddle and computerPaddle as sprite objects
ball = createSprite(200,200,10,10);
ball.addImage("ball",ballImg);
ball.scale =0.5;
  
playerPaddle = createSprite(380,200,10,70);
playerPaddle.addImage("playerplay",playerImg);
playerPaddle.addImage("playerfall",playerFallImg);
playerPaddle.addImage("playerkick",playerKickImg); 
playerPaddle.scale=0.5;
  
computerPaddle = createSprite(10,200,10,70);
computerPaddle.addImage("robot",robotImg);
computerPaddle.scale=0.8;


//variable to store different state of game
gameState = "serve";

//variables to keep the score
compScore = 0;
playerScore = 0;

window.focus();
  
}

function draw() {
  //clear the screen
  background("white");
  
  //place info text in the center
  if (gameState === "serve") {
    text("Press Space to Serve",150,180);
  }
   
  //display scores
  text(compScore, 170,20);
  text(playerScore, 230,20);
  
  //make the player paddle move with the mouse's y position
  playerPaddle.y = World.mouseY;
  
  //AI for the computer paddle
  //make it move with the ball's y position
  computerPaddle.y = ball.y;
  
  //draw line at the centre
  for (var i = 0; i < 400; i=i+20) {
    line(200,i,200,i+10);
  }
  
   
 if(ball.isTouching(computerPaddle)|| ball.isTouching(playerPaddle)){ 
                                                                     
      kickSound.play();
    }
  //create edge boundaries
  //make the ball bounce with the top and the bottom edges
  var edges = createEdgeSprites();
  ball.bounceOff(edges[2]);
  ball.bounceOff(edges[3]);
  ball.bounceOff(playerPaddle);
  ball.bounceOff(computerPaddle);
  
  //ensure animations stay within frame
  playerPaddle.collide(edges);
  computerPaddle.collide(edges);
  
  //serve the ball when space is pressed
  if (keyDown("space") &&  gameState === "serve") {
    serve();
    gameState = "play";
    playerPaddle.changeImage("playerplay");
  }
   if(keyDown("k")){
    playerPaddle.changeImage("playerkick");
 
  }
  if(keyWentUp("k")){
    playerPaddle.changeImage("playerplay");
  }
 
  //reset the ball to the centre if it crosses the screen
  if(ball.x > 400 || ball.x <0) {
    crashSound.play();
    if(ball.x > 400) {
      compScore = compScore + 1;
   playerPaddle.changeImage("playerfall");
    }
    
    if(ball.x < 0) {
      playerScore = playerScore + 1;
    }
    
    reset();
    gameState = "serve";
  }
  
  if (playerScore === 5 || compScore === 5){
    gameState = "over";
    text("Game Over!",170,160);
    text("Press 'R' to Restart",150,180);
  }
  
  if (keyDown("r") && gameState === "over") {
    gameState = "serve";
    compScore = 0;
    playerScore = 0;
  }
  
  drawSprites();
}

function serve() {
  ball.velocityX = 3;
  ball.velocityY = 4;
}

function reset() {
  ball.x = 200;
  ball.y = 200;
  ball.velocityX = 0;
  ball.velocityY = 0;
}