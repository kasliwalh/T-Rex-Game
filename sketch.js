var trex, trex_running, trex_collider;
var ground, invisible_ground, ground_image;
var cloud_image, clouds_group;
var obstacle_group, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var score = 0;
var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var gameOver, restart;
var gameOverImage, restartImage;

function preload(){
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  trex_collided = loadImage("trex_collided.png");
  ground_image = loadImage("ground2.png");
  cloud_image = loadImage("cloud.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  gameOverImage = loadImage("gameOver.png");
  restartImage = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trex_collided);
  trex.scale = 0.5;
  ground = createSprite(200,180,400,20);
  ground.addImage("ground", ground_image)
  ground.velocityX = -6;
  invisible_ground = createSprite(200,190,400,10);
  invisible_ground.visible = false;
  clouds_group = new Group();
  obstacle_group = new Group();
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImage)
  restart = createSprite(300,140);
  restart.addImage(restartImage);
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  gameOver.visible = false;
  restart.visible = false;
}

function draw() {
  background(255);
  
  text("Score:"+score,500,50)
  
  if(gamestate === PLAY){
    score = score + Math.round(getFrameRate()/60);
    //To make the Trex jump and collide with the Invisible ground
  if(keyDown("space") && trex.y >= 161.3){
    trex.velocityY = -12;
  }
  trex.velocityY = trex.velocityY + 0.8;
  if(ground.x < 0){
    ground.x = ground.width/2;
  }
  spawn_clouds();
  
  spawn_obstacles();
    
  if(obstacle_group.isTouching(trex)){
    gamestate = END;
  }
  }
  else if(gamestate === END){
    gameOver.visible = true;
    restart.visible = true;
    trex.changeAnimation("collided", trex_collided);
    ground.velocityX = 0;
    trex.velocityY = 0;
    obstacle_group.setVelocityXEach(0);
    clouds_group.setVelocityXEach(0);
    obstacle_group.setLifetimeEach(-1);
    clouds_group.setLifetimeEach(-1);
    if(mousePressedOver(restart)){
      reset();
    }
  }
  
  console.log(trex.y);
  
  trex.collide(invisible_ground);
  drawSprites();
}

function spawn_clouds(){
  if(frameCount % 150 === 0){
    var cloud = createSprite (600,120,40,10);
    cloud.y = Math.round(random(80,120))
    cloud.addImage (cloud_image);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    cloud.lifetime = 200
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    clouds_group.add(cloud)
  }
}

function spawn_obstacles(){
  if(frameCount % 60 === 0){
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -4;
    var rand = Math.round(random(1,6));
    switch(rand){
      case 1:obstacle.addImage(obstacle1);
      break;
      case 2:obstacle.addImage(obstacle2);
      break;
      case 3:obstacle.addImage(obstacle3);
      break;
      case 4:obstacle.addImage(obstacle4);
      break;
      case 5:obstacle.addImage(obstacle5);
      break;
      case 6:obstacle.addImage(obstacle6);
      break;
      default:break;
    }
    obstacle.scale = 0.5
    obstacle.lifetime = 300;
    obstacle_group.add(obstacle);
  }
}

function reset(){
  gamestate = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  obstacle_group.destroyEach();
  clouds_group.destroyEach();
  score = 0;
  trex.changeAnimation("running", trex_running);
}