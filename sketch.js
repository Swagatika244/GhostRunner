var PLAY=1
var END=0
var gameState = PLAY
var towerImg , tower
var doorsG , doorImg , door 
var climber , climbersG , climberImg 
var invisible1, invisible2
var ghost, ghostImg 
var boxG, box
var gameOver , gameOverImg
var restartImg , restart

function preload(){
    towerImg = loadImage("tower.png");
    doorImg = loadImage("door.png");
    climberImg = loadImage("climber.png");
    ghostImg = loadImage("ghost-standing.png")
    restartImg = loadImage("restart1.png");
    gameOverImg = loadImage("gameOver.png");
    spookySound = loadSound("spooky.wav");
    
}
function setup(){
    createCanvas(windowWidth,windowHeight);
    spookySound.loop();
    tower = createSprite(width/2,height/2);
    tower.addImage("tower",towerImg);

    ghost = createSprite(width/2,height/2);
    ghost.addImage(ghostImg)
    ghost.scale=0.35;
    //ghost.debug=true;
    ghost.setCollider("rectangle",-20,10,150,200)

    invisible1 = createSprite(tower.width-100,height/2,30,height);
    invisible2 = createSprite(tower.width+429,height/2,30,height);
    invisible1.visible=false;
    invisible2.visible=false;

    gameOver = createSprite(tower.x,tower.y);
    gameOver.addImage(gameOverImg);
    gameOver.scale=0.8;

    restart = createSprite(tower.x,tower.y+150);
    restart.addImage(restartImg);
    restart.scale=0.13;

    doorsG=new Group();
    climbersG=new Group();
    boxG= new Group();
}
function draw(){
    background(0);
if(gameState===PLAY){
     
    gameOver.visible=false;
    restart.visible=false;

    tower.velocityY=1;


    if (tower.y>height-150){
        tower.y=height/2;
    }

    if(keyDown("space")){
        ghost.velocityY=-5;
    }
    if(keyDown("left_arrow")){
        ghost.x =ghost.x-3;
    }
    if(keyDown("right_arrow")){
        ghost.x =ghost.x+3;
    }
    ghost.velocityY = ghost.velocityY + 0.8;
    
    if(climbersG.isTouching(ghost)){
        ghost.velocityY=0;
    }
    ghost.collide(invisible1);
    ghost.collide(invisible2);

    if(ghost.isTouching(boxG)||ghost.y>height){
        ghost.destroy();
        gameState=END;
    }

    spawnDoors();
    
}
 else if (gameState===END){
    gameOver.visible=true;
    restart.visible=true;

    tower.velocityY=0;
    climbersG.destroyEach();
    boxG.destroyEach();
    doorsG.destroyEach();

    climbersG.setVelocityEach(0);
    boxG.setVelocityEach(0);
    doorsG.setVelocityEach(0);

    if (mousePressedOver(restart)){
        reset();
    }

}
drawSprites();
}

function spawnDoors(){
   if (frameCount%240===0){
    door= createSprite(Math.round(random(tower.width,tower.width+320)),0,10,10);
    climber= createSprite(door.x,door.y+50,10,10);
    box = createSprite(door.x,climber.y+12);
    box.width=95;
    box.height=2;

    door.addImage(doorImg);
    climber.addImage(climberImg);
    //box.visible=false;
    

    door.velocityY= 1;
    climber.velocityY= 1;
    box.velocityY= 1;

    door.lifetime=height+200;
    climber.lifetime=door.lifetime ;
    box.lifetime=climber.lifetime;
    

    door.depth = climber.depth;
    door.depth = ghost.depth;
    ghost.depth = ghost.depth + 1;
    climber.depth=box.depth;
    box.depth = ghost.depth;

    //box.debug=true;

    doorsG.add(door);
    climbersG.add(climber);
    boxG.add(box);
   }
}
function reset(){
    gameState=PLAY;
    ghost = createSprite(width/2,height/2);
    ghost.addImage(ghostImg)
    ghost.scale=0.35;
    //ghost.debug=true;
    ghost.setCollider("rectangle",-20,10,150,200)

}