"use strict";

function Other(data) {
    this.data = data;

    var textureData = common.sprites[data.sprite];
    PIXI.Sprite.call(this, textureData.texture);

    this.nameText = new PIXI.Text(data.name.toUpperCase(), {font:"9px pressstart", fill:"black"});
    this.nameText.anchor.x = 0.3;
    this.nameText.anchor.y = 1.5;

    this.addChild(this.nameText);

    this.calculatePosition();
}

Other.prototype = Object.create(PIXI.Sprite.prototype);

Other.prototype.update = function(data) {
    this.data = data;
    this.calculatePosition();
}

Other.prototype.calculatePosition = function() {
    this.position.x = this.data.x * common.TILE_SIZE;
    this.position.y = this.data.y * common.TILE_SIZE;
};


