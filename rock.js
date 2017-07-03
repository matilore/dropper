function Rock (){
  this.position = { row: 0, column: Math.floor(Math.random() * 24)}
  this.impacted = false;
  this.classId += 1
  this.id = this.classId;
}

Rock.prototype.classId = 0;
