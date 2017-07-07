function Player() {
  this.direction = "";
  this.position = { row: 23, column: 13 };
  this.laserShooted = [];
  this.lifes = 3

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
  //  if($('.player').hasClass('right')){
  //     $('.player').removeClass('right')
  //    } else if($('.player').hasClass('left')){
  //     $('.player').removeClass('left')
  //    }
     $('.player').removeClass('player');
     
     var selector = '[data-row=' + this.position.row + ']' +
                    '[data-col=' + this.position.column + ']';

      $(selector).addClass('player');
      $(selector).addClass(this.direction);
      setTimeout(function(){$(selector).removeClass(this.direction)}.bind(this), 500);
  };


Player.prototype.shootLaser = function(){
  var laser  = new Laser(this.position.column);
  this.laserShooted.push(laser)
  setInterval(laser.move.bind(laser), 100)
  $('#laser').get(0).play()
}

Player.prototype.checkRocksToRemove = function(){
  this.laserShooted.forEach(function(laser){
    if(laser.position.row < 0){
      laser = null;
    }
  })
}