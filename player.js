
function Player(socket, gameid, world) {
    this.gameid = gameid;
    this.socket = socket;
    this.world = world;
}

module.exports = Player;