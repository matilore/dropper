function Game() {
  this.items = [];  

   for (var row = 0; row < 50; row++) {
     for (var col = 0; col < 50; col++) {
       $('#board').append($('<div>')
          .addClass('cell')
          .attr('data-row', row)
          .attr('data-col', col)
        );
     }
   }
 }

 Game.prototype.start = function(){
     this.student = new Student();

     this.student.show();
     this.student.move();
     this.assignControlsToKeys();
     setInterval(this.createItem.bind(this), 4000)
    setInterval(this.displayItems.bind(this), 200)

 }

 Game.prototype.assignControlsToKeys = function() {

   $(document).on('keydown', function(e) {
       console.log(this)
     switch (e.keyCode) {
       case 37: // arrow left
         this.student.goLeft();
        break;
       case 39: // arrow right
          this.student.goRight();
        break;
     }
   }.bind(this));
 };

 Game.prototype.createItem = function(){
     this.items.push(new Item());
 }

 Game.prototype.displayItems = function(){
     for(var i = 0; i < this.items.length; i++){
        this.items[i].move();
     }
 }


 function Student() {
  this.direction = "left";
  this.position = { row: 47, column: 24 };
}

Student.prototype.move = function () {
  switch (this.direction) {
    case "left":
    this.position.column -= 1
    this.show()
    setTimeout(this.move.bind(this), 100)
      break;
      case "right":
      this.position.column += 1
      this.show()
    setTimeout(this.move.bind(this), 100)
    break;
  }
};

Student.prototype.goLeft = function() {
   if (this.direction === 'left' || this.direction === 'right') {
     this.direction = 'left';
   }
 };

 Student.prototype.goRight = function() {
   if (this.direction === 'right' || this.direction === 'left') {
     this.direction = 'right';
   }
 };

 Student.prototype.show = function() {
     $('.student').removeClass('student');
     var selector = '[data-row=' + this.position.row + ']' +
                    '[data-col=' + this.position.column + ']';

      $(selector).addClass('student');
  };



function Item (){
  this.position = { row: 0, column: Math.floor(Math.random() * 50)}
}


Item.prototype.move = function () {

    this.selector = function(row = this.position.row){
        return '[data-row=' + row + ']' + '[data-col=' + this.position.column + ']';
    }
              
    this.position.row =  this.position.row + 1;
    $(this.selector(this.position.row - 1)).removeClass('item');
    $(this.selector()).addClass('item');
};



 $(document).ready(function(){
     var game = new Game()
     game.start()
 })