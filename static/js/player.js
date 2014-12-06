function Player(data) {
    var textureData = common.sprites[data.sprite];
    PIXI.Sprite.call(this, textureData.texture);

    this.data = data;

    this.position.x = data.x * common.TILE_SIZE;
    this.position.y = data.y * common.TILE_SIZE;

    console.log("Position:" + this.data.x + "," + this.data.y);
    console.log("Position:" + this.position.x + "," + this.position.y);
}
Player.prototype = Object.create(PIXI.Sprite.prototype);
