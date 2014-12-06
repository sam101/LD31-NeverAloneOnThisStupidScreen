"use strict";
var game;

function Game() {
    this.stage = new PIXI.Stage(0x0);
    this.stage.interactive = true;

    this.renderer = PIXI.autoDetectRenderer(common.RENDER_WIDTH, common.RENDER_HEIGHT);
    document.body.appendChild(this.renderer.view);
    requestAnimationFrame(render);
}

Game.prototype.draw = function() {
    this.renderer.render(this.stage);

    requestAnimFrame(render);
}

function render() {
    game.draw();
}

var game = new Game();