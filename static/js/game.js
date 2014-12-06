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

    this.isLaunched = false;

    requestAnimationFrame(render);

    this.frameCount = 0;
    this.diff = 0;
    this.lastTime = Date.now();
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
    world = new World(initialData);
    this.container.addChild(world);

    this.isLaunched = true;
};

Game.prototype.draw = function() {
    this.renderer.render(this.stage);
    this.frame();
};

Game.prototype.frame = function() {
    this.diff += Date.now() - this.lastTime;
    this.lastTime = Date.now();
    while (this.diff > common.FRAME_TIME) {
        this.diff -= common.FRAME_TIME;
        this.frameCount++;
        if (game.isLaunched) {
            world.frame(this.frameCount);
        }
    }
};

window.onresize = function(event) {
    game.sizeContainer();
};

function render() {
    game.draw();
    requestAnimFrame(render);
}

var game = new Game();