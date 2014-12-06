"use strict";
var game;

function Game() {
    this.stage = new PIXI.Stage(0x0);
    this.stage.interactive = true;

    this.renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);
    document.body.appendChild(this.renderer.view);

    this.container = new PIXI.DisplayObjectContainer();
    this.sizeContainer();

    this.stage.addChild(this.container);

    requestAnimationFrame(render);
}

Game.prototype.sizeContainer = function() {
    var currentWidthScaleRatio = window.innerWidth / common.RENDER_WIDTH;
    var currentHeightScaleRatio = window.innerHeight / common.RENDER_HEIGHT;

    console.log(currentWidthScaleRatio + "," + currentHeightScaleRatio);

    this.renderer.resize(window.innerWidth, window.innerHeight);

    this.container.scale.x = currentWidthScaleRatio;
    this.container.scale.y = currentHeightScaleRatio;
};

Game.prototype.startGame = function(initialData) {
    console.log("Let's start the game !");

    this.tiles = new Tiles(initialData.tiles);
    this.container.addChild(this.tiles);

    this.player = new Player(initialData.player);
    this.container.addChild(this.player);
};

Game.prototype.draw = function() {
    this.renderer.render(this.stage);

};

window.onresize = function(event) {
    game.sizeContainer();
};

function render() {
    game.draw();
    requestAnimFrame(render);
}

var game = new Game();