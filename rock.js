function Rock (){
  this.position = { row: 0, column: Math.floor(Math.random() * 24)}
}


Rock.prototype.move = function () {

    this.selector = function(row = this.position.row){
        return '[data-row=' + row + ']' + '[data-col=' + this.position.column + ']';
    }
              
    this.position.row =  this.position.row + 1;
    $(this.selector(this.position.row - 1)).removeClass('rock');
    $(this.selector()).addClass('rock');
    
    if(this.position.row > 24){
        delete this
    }
};
