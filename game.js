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
    setInterval(this.createRock.bind(this), 3000)
    setInterval(this.checkImpact.bind(this), 10);


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
      var rock = new Rock()
     rock.interval = setInterval(function(){
     this.rocks.push(rock);
     this.moveRock(rock)
     }.bind(this), 200);
 }

Game.prototype.selector = function(row = rock.position.row, rock){
        return '[data-row=' + row + ']' + '[data-col=' + rock.position.column + ']';
    }   

Game.prototype.moveRock = function (rock) {
      rock.position.row =  rock.position.row + 1;
      $(this.selector(rock.position.row - 1, rock)).removeClass('rock');
      $(this.selector(rock.position.row, rock)).addClass('rock');
};



Game.prototype.checkImpact = function(){

      this.rocks.forEach(function(rock){
        console.log(rock.position)


          //  if(rock.position.row === this.player.position.row && rock.position.column === this.player.position.column){
          //     $(this.selector(rock.position.row, rock)).addClass('explosion')
          //     setTimeout(function(){
          //       $(this.selector(rock.position.row, rock)).removeClass('explosion');
          //   }.bind(this), 100)
          //     rock.impacted = true;
          // }

        this.player.laserShooted.forEach(function(laser){
                if(rock.position.row === laser.position.row && rock.position.column === laser.position.column){
                  
                  $(this.selector(rock.position.row, rock)).addClass('explosion')
                  rock.impacted = true
                    if(rock.impacted == true){
                      clearInterval(rock.interval);
                     setTimeout(function(){
                      var indexRock = this.rocks.indexOf(rock)
                      this.rocks.splice(indexRock, 1);
                      $(this.selector(rock.position.row, rock)).removeClass('rock');
                      $(this.selector(rock.position.row, rock)).removeClass('explosion');
                      rock = null;
                    }.bind(this), 200)
                  }
                }
              }.bind(this))
      }.bind(this))
       
}