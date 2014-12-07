function Score(data) {
    PIXI.DisplayObjectContainer.call(this);

    this.text = new PIXI.Text(data.score, {font:"32px pressstart", fill:"yellow", dropShadow:true});
    this.text.position.x = common.RENDER_WIDTH - this.text.width;
    this.text.position.y = common.TILE_SIZE;

    this.addChild(this.text);
};
Score.prototype = Object.create(PIXI.DisplayObjectContainer.prototype);

Score.prototype.update = function(data) {
    console.log("New score : " + data.score);
    this.text.setText(data.score);
    this.text.position.x = common.RENDER_WIDTH - this.text.width;
};