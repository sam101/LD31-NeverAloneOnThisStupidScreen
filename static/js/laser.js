"use strict";
function Laser(data) {
    this.data = data;

    PIXI.Sprite.call(this, common.laser);

    this.calculatePosition();
}
Laser.prototype = Object.create(PIXI.Sprite.prototype);

Laser.prototype.frame = function() {
    switch (this.data.direction) {
        case common.directions.LEFT:
            this.data.x--;
        break;
        case common.directions.RIGHT:
            this.data.x++;
         break;
        case common.directions.TOP:
            this.data.y--;
        break;
        case common.directions.BOTTOM:
            this.data.y++;
        break;
    }
    if (! world.isAvailable(this.data.x, this.data.y)) {
        world.removeLaser(this);
    }
    this.calculatePosition();
};

Laser.prototype.calculatePosition = function() {
    this.position.x = this.data.x * common.TILE_SIZE;
    this.position.y = this.data.y * common.TILE_SIZE;
};