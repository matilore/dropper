function Game() {
  this.rocks = [];  

   for (var row = 0; row < 25; row++) {
     for (var col = 0; col < 25; col++) {
       $('#board').append($('<div>')
          .addClass('cell')
          .attr('data-row', row)
          .attr('data-col', col)
        );
     }
   }
 }

 Game.prototype.start = function(){
    this.player = new Player();
    this.player.show();
    this.player.move();
    this.assignControlsToKeys();
    setInterval(this.createRock.bind(this), 8000)
    setInterval(this.displayRocks.bind(this), 200)

 }

 Game.prototype.assignControlsToKeys = function() {

   $(document).on('keydown', function(e) {
     switch (e.keyCode) {
       case 37: // arrow left
         this.player.goLeft();
        break;
       case 39: // arrow right
          this.player.goRight();
        break;
     }
   }.bind(this));
 };

 Game.prototype.createRock = function(){
     this.rocks.push(new Rock());
 }

Game.prototype.selector = function(row = rock.position.row, rock){
        return '[data-row=' + row + ']' + '[data-col=' + rock.position.column + ']';
    }   

Game.prototype.moveRock = function (rock) {
      rock.position.row =  rock.position.row + 1;
      setInterval(this.checkImpact.bind(this, rock), 100);
      $(this.selector(rock.position.row - 1, rock)).removeClass('rock');
      $(this.selector(rock.position.row, rock)).addClass('rock');
};

 Game.prototype.displayRocks = function(){
    this.rocks.forEach(function(rock){
      if(rock != null){
        this.moveRock(rock);
      } else {
        this.removeRock(rock)
      }
    }.bind(this))
 }

Game.prototype.removeRock = function(rock){
  this.rocks = this.rocks.filter(function(rock){
    return rock != null;
  })
}


Game.prototype.checkImpact = function(rock){
      //  if(rock.position.row === this.player.position.row && rock.position.column === this.player.position.column){
      //     $(this.selector(rock.position.row, rock)).addClass('explosion')
      //     setTimeout(function(){
      //       $(this.selector(rock.position.row, rock)).removeClass('explosion');
      //   }.bind(this), 100)
      //     rock.impacted = true;
      //  }
        console.log(rock)
       this.player.laserShooted.forEach(function(laser){
                if(rock.position.row === laser.position.row && rock.position.column === laser.position.column){
                  $(this.selector(rock.position.row, rock)).addClass('explosion')
                  setTimeout(function(){
                    $(this.selector(rock.position.row, rock)).removeClass('explosion');
                    $(this.selector(rock.position.row, rock)).removeClass('rock');

                }.bind(this), 100)
                  rock = null;
                        }
              }.bind(this))
}