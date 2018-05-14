
function Car(id)
{


  let evaluationPoint = 200;

  this.imageNameList = [];
  this.imageNameList.push('carRed.png');
  this.imageNameList.push('carYellow.png');
  this.imageNameList.push('carGreen.png');
  this.imageNameList.push('carPurple.png');
  this.imageNameList.push('carBlue.png');

  this.image = loadImage(random(this.imageNameList));
  this.carId = id;
  this.isLookingForSpot = false;
  this.isWaitingInTraffic = false;
  this.waitingAtGate = false;
  this.yLoc =  height + 10;
  this.xLoc =  200;


  this.waitTimer = 500;
  this.waited = false;
  this.speed = -1.0;
  this.myLaneIndex = -1;
  
  this.carSprite = createSprite(this.xLoc, this.yLoc-20, 30, 30);
  this.carSprite.addImage(loadImage(random(this.imageNameList)));
  this.carSprite.velocity.y = this.speed;
  this.carSprite.rotateToDirection = true;

  this.collisionFinished = false;
  this.annealCollide = 20;
  
  this.angle = 0;


  this.update = function(throughPut, carList, gateList, divider)
  {
    //look for the lane with the least cars
    if(this.carSprite.position.y <= divider.dividerSprite.position.y + evaluationPoint && !this.waited)
    {
      //Stops Car at gateList
      if(this.carSprite.overlap(divider.dividerSprite) && this.waited == false)
      {
          this.carSprite.rotateToDirection = false;
          this.carSprite.velocity.y = 0;
          this.waitingAtGate = true;

          if(frameCount % 20)
          {  
            this.waitTimer -= throughPut;
          }
      }
      
      if(this.waitTimer <= 0)
      {
        if(this.myLaneIndex == 2)
            console.log("Removed");
        this.waited = true;
        this.carSprite.velocity.y  = this.speed;
        gateList[this.myLaneIndex].removeCarFromLane();
      }
      
      
      if(this.myLaneIndex == -1)
      {
          this.myLaneIndex = this.findLane(carList, gateList, divider);
          this.angle = gateList[this.myLaneIndex].addCarToLane(this);
      }
      
      if(!this.carSprite.overlap(divider.dividerSprite))
          this.carSprite.velocity.y  = this.speed;
      
      if(this.myLaneIndex != -1)
          this.isCollidedWithCars(carList, gateList);
      
      if(this.angle > 260 && this.carSprite.position.x >= gateList[this.myLaneIndex].xLoc && this.waitingAtGate == false)
          this.carSprite.setSpeed(1.4, -90);
      else if(this.angle < 260 && this.carSprite.position.x <= gateList[this.myLaneIndex].xLoc && this.waitingAtGate == false)  
          this.carSprite.setSpeed(1.4, -90);
          
      
    }
  }

  this.isCollidedWithCars = function(carList, gateList)
  {
    let carQue = gateList[this.myLaneIndex].carQueue;
    let indexInLane  = carQue.indexOf(this);
    
    if(indexInLane > 0)
    {
      if(typeof carQue[indexInLane - 1] != 'undefined')
      {
        carQue[indexInLane-1].carSprite.displace(this.carSprite);
      }
    }
  }

  this.findLane = function(carList, gateList, divider)
  {
    let minIndex = 0;
    let minVal = gateList[0].carsInLane;

    for(let i = 0; i < gateList.length; i++)
    {
      if(minVal >= gateList[i].carsInLane)
      {
        minVal = gateList[i].carsInLane;
        minIndex = i;
      }
    }

    //if(!this.isLookingForSpot)
  //  {
//      gateList[minIndex].addCarToLane();
//      this.isLookingForSpot = true;
    //  this.xLoc = gateList[minIndex].findLaneFrontX();
    //  console.log("car added to lane: " + minIndex);
  //  }

    return minIndex;
  }

}
