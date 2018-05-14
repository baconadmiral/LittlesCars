function Hitbox(x, y)
{
  this.x = x;
  this.y = y;
  this.yOffset = 10;
  this.xOffset = 10;

  this.upLeftX = this.x - this.xOffset;
  this.upLeftY = this.y - this.yOffset;

  this.upRightX = this.x + this.xOffset;
  this.upRightY = this.y - this.yOffset;

  this.downLeftX = this.x - this.xOffset;
  this.downLeftY = this.y + this.yOffset;

  this.downRightX = this.x + this.xOffset;
  this.downRightY = this.y + this.yOffset;

  this.upRightX = this.x + this.xOffset;
  this.upRightY = this.y - this.yOffset;

  this.checkCollision = function(hitboxList)
  {
    for(let i = 0; hitboxList.length; i++)
    {
      if(this.upLeftX )
    }

    return false;
  }

  this.setCoordinates = function()
  {
    this.upLeftX = this.x - this.xOffset;
    this.upLeftY = this.y - this.yOffset;

    this.upRightX = this.x + this.xOffset;
    this.upRightY = this.y - this.yOffset;

    this.downLeftX = this.x - this.xOffset;
    this.downLeftY = this.y + this.yOffset;

    this.downRightX = this.x + this.xOffset;
    this.downRightY = this.y + this.yOffset;

    this.upRightX = this.x + this.xOffset;
    this.upRightY = this.y - this.yOffset;
  }



}
