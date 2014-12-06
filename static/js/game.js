"use strict";
var game;

function Game() {
    this.stage = new PIXI.Stage(0x0);
    this.stage.interactive = true;

    this.renderer = PIXI.autoDetectRenderer(common.RENDER_WIDTH, common.RENDER_HEIGHT);
    document.body.appendChild(this.renderer.view);

    this.container = new PIXI.DisplayObjectContainer();
    this.stage.addChild(this.container);

    requestAnimationFrame(render);
}

Game.prototype.startGame = function(initialData) {
    console.log("Let's start the game !");
    this.tiles = new Tiles(initialData.tiles);
    this.container.addChild(this.tiles);
};

Game.prototype.draw = function() {
    this.renderer.render(this.stage);

};

function render() {
    game.draw();
    requestAnimFrame(render);
}

var game = new Game();