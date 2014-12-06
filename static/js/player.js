function Player(data) {
    var textureData = common.sprites[data.sprite];
    PIXI.Sprite.call(this, textureData.texture);

    this.data = data;

    this.calculatePosition();

    console.log("Position:" + this.data.x + "," + this.data.y);
    console.log("Position:" + this.position.x + "," + this.position.y);
}
Player.prototype = Object.create(PIXI.Sprite.prototype);

Player.prototype.calculatePosition = function() {
    this.position.x = this.data.x * common.TILE_SIZE;
    this.position.y = this.data.y * common.TILE_SIZE;
}

Player.prototype.move = function(x, y) {

    this.data.x -= x;
    this.data.y -= y;
    this.calculatePosition();
}

Player.prototype.moveLeft = function() {
    this.move(-1, 0);
}

Player.prototype.moveRight = function() {
    this.move(1, 0);
}

Player.prototype.moveTop = function() {
    this.move(0, -1);
}

Player.prototype.moveBottom = function() {
    this.move(0, 1);
}
