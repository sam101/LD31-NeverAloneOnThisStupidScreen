"use strict";

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
};


Player.prototype.frame = function() {
    var keys = KeyboardJS.activeKeys();
    if (keys.indexOf('up') != -1) {
        this.move(0, -1);
    }
    else if (keys.indexOf('down') != -1) {
        this.move(0, 1);
    }
    else if (keys.indexOf('left') != -1) {
        this.move(-1, 0);
    }
    else if (keys.indexOf('right') != -1) {
        this.move(1, 0);
    }
};

Player.prototype.move = function(x, y) {
    if (world.isAvailable(this.data.x + x, this.data.y + y)) {
        this.data.x += x;
        this.data.y += y;
        this.calculatePosition();
    }
    network.socket.emit('move', this.data.x, this.data.y);
};
