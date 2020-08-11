class Food{
    constructor(){
    this.foodstock=0;
    this.lastfed;
    this.milkimage=loadImage("images/Milk.png");                                   
    }
  
  updatefoodstock(foodstock){
  this.foodstock=foodstock;
  }
  getFedTime(lastfed){
 this.lastfed=lastfed;
  }
  deductfoodstock(){
    if(this.foodstock>0){
      this.foodstock=this.foodstock-1;
    }
  }
  getfoodstock(){
    return this.foodstock;
  }
 bedroom(){
   background(br,550,500);
 }
 livingroom(){
   background(lr,550,500);
 }
 garden(){
   background(gar,550,500);
 }
 washroom(){
  background(washr,550,500);
}
    display(){
        var xp=80;
        var yp=100;
        imageMode(CENTER);
        image(this.milkimage,720,720,70,70);

      if(this.foodstock!=0){
      for(var i=0;i<this.foodstock;i++){
             if(i%10==0){
                  xp=80;
                  yp=yp+50;
             }
              
              
             
              image(this.milkimage,xp,yp,50,50);
              xp=xp+30;
        }
       
    }
  }
}