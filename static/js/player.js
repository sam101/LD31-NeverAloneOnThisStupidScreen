"use strict";

function Player(data) {
    var textureData = common.sprites[data.sprite];
    PIXI.Sprite.call(this, textureData.texture);

    this.data = data;

    this.calculatePosition();

    console.log("Position:" + this.data.x + "," + this.data.y);
    console.log("Position:" + this.position.x + "," + this.position.y);

    this.nameText = new PIXI.Text(data.name.toUpperCase() + "(" + data.level + ")", {font:"9px pressstart", fill:"white", dropShadow:true});
    this.nameText.anchor.x = 0.3;
    this.nameText.anchor.y = 1.5;

    this.currentLevel = data.level;

    this.addChild(this.nameText);
}
Player.prototype = Object.create(PIXI.Sprite.prototype);

Player.prototype.calculatePosition = function() {
    this.position.x = this.data.x * common.TILE_SIZE;
    this.position.y = this.data.y * common.TILE_SIZE;
};

Player.prototype.update = function(data) {
    if (data.level != this.currentLevel) {
        this.nameText.setText(data.name.toUpperCase() + "(" + data.level + ")");
        this.currentLevel = data.level;
    }
    this.data = data;

    this.calculatePosition();
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
