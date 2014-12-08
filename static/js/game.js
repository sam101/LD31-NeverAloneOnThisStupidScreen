"use strict";
var game;

function Game() {
    this.stage = new PIXI.Stage(0x0);
    this.stage.interactive = true;

    this.renderer = PIXI.autoDetectRenderer(window.innerWidth, window.innerHeight);

    this.renderer.view.setAttribute("id", "renderer");
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
    var widthScaleRatio = window.innerWidth / common.RENDER_WIDTH;
    var heightScaleRatio = window.innerHeight / common.RENDER_HEIGHT;

    var scaleRatio = Math.min(widthScaleRatio, heightScaleRatio);

    this.renderer.resize(common.RENDER_WIDTH * scaleRatio, common.RENDER_HEIGHT * scaleRatio);

    this.container.scale.x = scaleRatio;
    this.container.scale.y = scaleRatio;
};

Game.prototype.startGame = function(initialData) {
    console.log("Let's start the game !");
    sounds.MUSIC.play();
    world = new World(initialData);
    this.container.addChild(world);

    this.isLaunched = true;
};


Game.prototype.endGame = function() {
    var blurFilter = new PIXI.BlurFilter();
    world.filters = [blurFilter];

    buzz.all().stop();
    sounds.GAME_OVER.play();

    var gameOver = new PIXI.Text("GAME OVER. RESET IN 5 SECONDS.", {font:"30px pressstart", fill:"white", dropShadow:true});
    gameOver.position.x = common.RENDER_WIDTH / 2 - gameOver.width / 2;
    gameOver.position.y = common.RENDER_HEIGHT / 2 - gameOver.height / 2;
    this.container.addChild(gameOver);
    this.isLaunched = false;

    setTimeout(function() {
        location.reload();
    }, 5000);
};

Game.prototype.winGame = function() {
    var blurFilter = new PIXI.BlurFilter();
    world.filters = [blurFilter];
    buzz.all().stop();


    this.isLaunched = false;

    var winGame = new PIXI.Text("YOU GOT TO LEVEL 42. YOU WON. SORRY, THERE'S NO HEAVEN.", {font:"23px pressstart", fill:"white", dropShadow:true});
    winGame.position.x = common.RENDER_WIDTH / 2 - winGame.width / 2;
    winGame.position.y = common.RENDER_HEIGHT / 2 - winGame.height / 2;
    this.container.addChild(winGame);


    this.isLaunched = false;

}

Game.prototype.invalidUsername = function() {
    var invalid = new PIXI.Text("YOU SUPPLIED AN INVALID USERNAME !", {font:"30px pressstart", fill:"white", dropShadow:true});
    invalid.position.x = common.RENDER_WIDTH / 2 - invalid.width / 2;
    invalid.position.y = common.RENDER_HEIGHT / 2 - invalid.height / 2;

    this.container.addChild(invalid);
};

Game.prototype.alreadyConnectedFromSomewhereElse = function() {
    var invalid = new PIXI.Text("YOU'RE ALREADY CONNECTED FROM ANOTHER TAB !", {font:"30px pressstart", fill:"white", dropShadow:true});
    invalid.position.x = common.RENDER_WIDTH / 2 - invalid.width / 2;
    invalid.position.y = common.RENDER_HEIGHT / 2 - invalid.height / 2;

    this.container.addChild(invalid);

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

Game.prototype.gotDisconnected = function() {
    var blurFilter = new PIXI.BlurFilter();
    world.filters = [blurFilter];
    buzz.all().stop();

    var error = new PIXI.Text("CONNECTION WITH SERVER LOST. SORRY.", {font:"30px pressstart", fill:"white", dropShadow:true});
    error.position.x = common.RENDER_WIDTH / 2 - error.width / 2;
    error.position.y = common.RENDER_HEIGHT / 2 - error.height / 2;

    this.container.addChild(error);

};

window.onresize = function(event) {
    game.sizeContainer();
};

function render() {
    game.draw();
    requestAnimFrame(render);
}

var game = new Game();