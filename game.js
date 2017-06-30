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
    setInterval(this.createItem.bind(this), 2000)
    setInterval(this.displayItems.bind(this), 100)
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

 Game.prototype.createItem = function(){
     this.rocks.push(new Rock());
 }

 Game.prototype.displayItems = function(){
     for(var i = 0; i < this.rocks.length; i++){
        this.rocks[i].move();
     }
 }
