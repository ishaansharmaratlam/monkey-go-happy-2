var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage,bananaGroup,obstacleGroup
var invisibleGround
var score = 0
//var ground
var collide
var bgImage


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
 collide = loadImage("sprite_0.png") 
  
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  bgImage = loadImage("jungle.jpg")
 
}



function setup() {
 createCanvas(600,600) 
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
//ground = createSprite(300,350,600,20); 

monkey = createSprite(100,60,20,20);  
monkey.addAnimation("monkey", monkey_running);
monkey.scale = 0.2
//monkey.debug = true;
  
  
  
invisibleGround = createSprite(300,500,600,20);
invisibleGround.visible = false;
  
}


function draw() {
  
  background(bgImage)
  stroke("white")
  textSize(20)
  fill("white")  
  text("score: "+ score, 400,50);
  
  
  
 obstacles (); 
 bananas();
  
  monkey.velocityY = monkey.velocityY + 0.8
  monkey.collide(invisibleGround);
  
 if (gameState === PLAY){
   
  
   
   
   
   if(keyDown("up")&&monkey.y >= 235) {
      monkey.velocityY = -13;  
    }
   
   stroke("white")
  textSize(20)
  fill("white")
  survivalTime = Math.ceil(frameCount/frameRate())
  text("Survival Time: "+survivalTime, 100,50)
   
   
  
  if(monkey.isTouching(bananaGroup)){
        bananaGroup.destroyEach();
    score = score + 1;
  }
    if(monkey.isTouching(obstacleGroup)){
     gameState = END;   
  }
 } else if (gameState === END){
 monkey.addImage("monkey",collide);
 obstacle.velocityX = 0
 banana.velocityX = 0
   
   stroke("black")
  textSize(20)
  fill("blue  ")
  text("Survival Time: "+survivalTime, 100,50)
 
 
 }
   
  
  
   
  
drawSprites();
  
}
function bananas(){
  if (frameCount%200 === 0){
    
    banana = createSprite(600,350,50, 50 )
    banana.addAnimation("banana", bananaImage);
    banana.scale = 0.15;
    banana.velocityX = -(10 + 3*score/100);         
    banana.lifetime = 220;
    bananaGroup.add(banana);
    

  }
  
}

function obstacles(){
  if (frameCount%200 === 0){
    
    obstacle = createSprite(600,450,50, 50 )
    obstacle.addImage("obstacle", obstacleImage);
    obstacle.scale = 0.15;
    obstacle.velocityX = -(10 + 3*score/100);          
    obstacle.lifetime = 220;
    obstacleGroup.add(obstacle);
   // obstacle.debug = true;

  }
  
}







