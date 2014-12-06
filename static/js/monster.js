function Monster(data) {
    this.data = data;

    var textureData = common.monsterSprites[data.sprite];
    PIXI.Sprite.call(this, textureData.texture);

    this.calculatePosition();
}
Monster.prototype = Object.create(PIXI.Sprite.prototype);

Monster.prototype.update = function(data) {
    this.data = data;
    this.calculatePosition();
}

Monster.prototype.calculatePosition = function() {
    this.position.x = this.data.x * common.TILE_SIZE;
    this.position.y = this.data.y * common.TILE_SIZE;
};