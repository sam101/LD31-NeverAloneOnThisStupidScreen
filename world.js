var common = require('./common');
function World(id) {
    this.id = id;
    this.width = common.WIDTH;
    this.height = common.HEIGHT;
    this.size = 0;
    console.log("Just built a world with id " + id + "(" + this.width + "," + this.height + ")");
}

World.prototype.isFull = function() {
    return this.size >= common.PLAYERS_PER_WORLD;
}

World.prototype.addPlayer = function(socket) {
    this.size++;
}

module.exports = World;