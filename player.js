function Player() {
  this.direction = "left";
  this.position = { row: 23, column: 13 };

  $(document).on('keydown',function(e){
    switch (e.keyCode) {
       case 32: // arrow left
         this.shootLaser();
        break;
     }
  }.bind(this))
}

Player.prototype.move = function () {
  switch (this.direction) {
    case "left":
    this.position.column -= 1
    this.show()
      break;
      case "right":
      this.position.column += 1
      this.show()
    break;
  }
};

Player.prototype.goLeft = function() {
     this.direction = 'left';
   this.move()
 };

 Player.prototype.goRight = function() {
     this.direction = 'right';
   this.move()
 };

 Player.prototype.show = function() {
     $('.player').removeClass('player');
     var selector = '[data-row=' + this.position.row + ']' +
                    '[data-col=' + this.position.column + ']';

      $(selector).addClass('player');
  };


Player.prototype.shootLaser = function(){
  var laser  = new Laser(this.position.column);
  setInterval(laser.move.bind(laser), 100)
}