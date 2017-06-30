function Laser (playerPosition){
  this.position = { row: 23, column: playerPosition }
}


Laser.prototype.move = function () {

    this.selector = function(row = this.position.row){
        return '[data-row=' + row + ']' + '[data-col=' + this.position.column + ']';
    }
              
    this.position.row =  this.position.row - 1;
    $(this.selector(this.position.row + 1)).removeClass('laser');
    $(this.selector()).addClass('laser');
};
