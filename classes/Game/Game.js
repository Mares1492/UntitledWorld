class Game {
    constructor() {
        this.players = [];
        this.currentPlayer = 0;
    }
    addPlayer(player) {
        this.players.push(player);
    }
    nextPlayer() {
        this.currentPlayer++;
        if (this.currentPlayer >= this.players.length) {
            this.currentPlayer = 0;
        }
    }
    play() {
        this.players[this.currentPlayer].play();
        this.nextPlayer();
    }
}