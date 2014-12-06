function Other(data) {
    this.data = data;

    var textureData = common.sprites[data.sprite];
    PIXI.Sprite.call(this, textureData.texture);

    this.calculatePosition();
}

Other.prototype = Object.create(PIXI.Sprite.prototype);

Other.prototype.calculatePosition = function() {
    this.position.x = this.data.x * common.TILE_SIZE;
    this.position.y = this.data.y * common.TILE_SIZE;
};


