"use strict";
function LifeBar(player) {
    PIXI.DisplayObjectContainer.call(this);

    this.position.x = 0;
    this.position.y = 0;

    this.emptyBar = new PIXI.Sprite(common.emptyBar);
    this.addChild(this.emptyBar);

    this.lifeBar = new PIXI.Sprite(common.lifeBar);
    this.addChild(this.lifeBar);

    this.hp = player.data.hp;
    this.hpMax = player.data.hpMax;

    this.hpText = new PIXI.Text("HP " + this.hp + "/" + this.hpMax, {font:"14px pressstart", fill:"white", dropShadow:true});
    this.hpText.position.y++;
    this.addChild(this.hpText);

    this.update(player.data.hp, player.data.hpMax);

}

LifeBar.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

LifeBar.prototype.update = function(hp, hpMax) {
    if (this.hp == hp && this.hpMax == hpMax) {
        return;
    }
    this.hpText.setText("HP " + hp + "/" + hpMax);
    common.lifeBar.frame = new PIXI.Rectangle(0,0, hp / hpMax * common.lifeBar.width, common.lifeBar.height);
    this.hp = hp;
    this.hpMax = hpMax;

};