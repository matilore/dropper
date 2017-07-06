function Rock (){
  this.position = { row: 0, column: Math.floor(Math.random() * 24)}
  this.impacted = false;
  this.outOfGrid = false;
}