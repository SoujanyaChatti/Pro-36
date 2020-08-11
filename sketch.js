//Create variables here
var changegs,readgs,br,gar,washr,lr;
var gamestate;
var sadDog,foodS;
var doggy,database,fedtime,lastfed,feedb,addfoodb,foodObj,foodS,image1,image2;

function preload()
{
  image1=loadImage("images/Dog.png");
  image2=loadImage("images/happydog.png");
  br=loadImage("images/BedRoom.png");
  washr=loadImage("images/Wash Room.png");
  gar=loadImage("images/Garden.png");
  sadDog=loadImage("images/Dog.png");
  lr=loadImage("images/Living Room.png");
	//load images here
}

function setup() {
  createCanvas(1100,1000);
  database=firebase.database();

  foodObj=new Food();

  readgs=database.ref('Gamestate');
  readgs.on("value",function(data){
    gamestate=data.val();
  });
  
  
  doggy=createSprite(500,200);
  doggy.addImage(image1);
  doggy.scale=0.2;
  
  
  feedb=createButton("Feed the dog");
  feedb.position(400,50);
  feedb.mousePressed(feedDog)
  
  addfoodb=createButton("add food");
  addfoodb.position(500,50);
  addfoodb.mousePressed(addFoods);

  var dogf=database.ref('Food');
  dogf.on("value",readF);
  
}



function draw() {  
background(46,139,87);
fedtime=database.ref('FeedTime');
  fedtime.on("value",function(data){
    lastfed=data.val();
  })
currentTime=hour();
if(currentTime==(lastfed+1)){
  update("Playing");
  foodObj.garden();
 
  
}
else if(currentTime==(lastfed+2)){
  update("Sleeping");
  foodObj.bedroom();
}
else if(currentTime>(lastfed+2)&&currentTime<=(lastfed+4)){
  update("Bathing");
  foodObj.washroom();
  doggy.scale=0.1;
  
}
else if(currentTime>(lastfed+4)&&currentTime<=(lastfed+7)){
update("Chilling");
foodObj.livingroom();

}
else{
  update("Hungry");
  foodObj.display();
 
  
}
drawSprites();
foodObj.display();

fill("red");
textSize(20);
if(lastfed>=12){
  text("last fed:"+ lastfed%12 +"PM",400,30);
}
else if(lastfed==0){
  text("last fed:12 AM",350,30);
}
else{
  text("last fed:"+lastfed+" AM",350,30);
}

if(gamestate!="Hungry"){
  feedb.hide();
  addfoodb.hide();
  doggy.remove();
}
else{
  feedb.show();
  addfoodb.show();
  doggy.addImage(sadDog);
}

}


function readF(data){
  foodS=data.val();
  foodObj.updatefoodstock(foodS);
}

function feedDog(){
  doggy.addImage(image2);
 
  foodObj.updatefoodstock(foodObj.getfoodstock()-1);
  database.ref('/').set({
    Food:foodObj.getfoodstock(),
    FeedTime:hour(),
    Gamestate:"Hungry"
  })
}
function addFoods(){
  foodS++
  database.ref('/').set({
    Food:foodS
  })
  
}
function update(state){
  database.ref('/').update({
    Gamestate:state
  });
}