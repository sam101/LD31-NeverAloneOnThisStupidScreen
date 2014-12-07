"use strict";
function ExpBar(player) {
    PIXI.DisplayObjectContainer.call(this);

    this.emptyBar = new PIXI.Sprite(common.emptyBar);
    this.addChild(this.emptyBar);

    this.expBar = new PIXI.Sprite(common.expBar);
    this.addChild(this.expBar);

    this.position.x = 0;
    this.position.y = common.RENDER_HEIGHT - common.emptyBar.height;

    this.level = player.data.level;
    this.exp = player.data.exp;
    this.expToNextLevel = player.data.expToNextLevel;

    common.expBar.frame = new PIXI.Rectangle(0,0,0, common.expBar.height);

    this.update(player.data.level, player.data.exp, player.data.expToNextLevel);
};

ExpBar.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

ExpBar.prototype.update = function(level, exp, expToNextLevel) {
    if (level == this.level && exp == this.exp && expToNextLevel == this.expToNextLevel) {
        return;
    }
    else if (level != this.level) {
        sounds.LEVEL_UP.play();
    }
    common.expBar.frame = new PIXI.Rectangle(0,0, exp / expToNextLevel * common.expBar.width, common.expBar.height);

    this.level = level;
    this.exp = exp;
    this.expToNextLevel = expToNextLevel;

};
