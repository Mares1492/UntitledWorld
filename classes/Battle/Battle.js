import Enemy from "../Character/Enemy.js";
import Session from "../Game/Session.js";
const landscapeContainer = document.getElementById('landscape-container');
class Battle{
    constructor(enemy=[new Enemy()],effect) {
        this.enemy = enemy;
        this.turn = "Player Turn";
        this.event = "Battle Starts";
        this.counter = 10;
        this.effect = effect;
        this.startBattle();
    }
    startBattle(){
        document.getElementById('exit-city-button').style.display = 'none';
        this.handleUpdateBattleScreen();
        return this.nextRound()
    }
    endBattle(){
        this.event = "You are victorious!";
        this.handleUpdateBattleScreen();
        setTimeout(() => {
            this.effect();
            Session.currentPlayer.updateJournalDisplay();
            document.getElementById('exit-city-button').style.display = 'block';
            return Session.currentPlayer.updateMap();
        }, 3000);
    }
    nextRound(){
        clearTimeout(this.turnTimeout)
        clearTimeout(this.roundTimeout);
        clearInterval(this.rounds);
        this.event = "Next Round";
        document.getElementById('timer').style.visibility = "hidden";
        if (this.enemy[0].getStatus()==="dead"){
            return this.endBattle();
        }else {
            this.roundTimeout = setTimeout(() => {
                return this.round();
            }, 3000);
        }

    }
    round(){
        this.counter = 10;
        document.getElementById('timer').style.visibility = "visible";
        this.rounds = setInterval(()=>{
            this.counter--;
            document.getElementById('timer').innerHTML = this.counter;
        }, 1000)
        if(this.turn === "Player Turn"){
            this.playerTurn();
        }else if(this.turn === "Enemy Turn"){
            this.enemyTurn();
        }
    }
    playerTurn(){
        this.turnTimeout = setTimeout(()=>{
            this.turn = "Enemy Turn";
            this.handleUpdateBattleScreen();
            this.nextRound();
        },10000)
    }
    enemyTurn(){
        this.turnTimeout = setTimeout(()=>{
            this.turn = "Player Turn";
            Session.currentPlayer.handleDefense(Math.floor(Math.random() * 3));
            this.handleUpdateBattleScreen();
            this.nextRound();
        },10000)
    }
    handleUpdateBattleScreen(){
        landscapeContainer.innerHTML =
            `
                <div class="battle-screen">
                <span id="timer" class="center">10</span>
                <div class="battle-screen-header">
                    <div class="battle-screen-side left">
                        <div class="battle-screen-name"><img alt="avatar ">${Session.currentPlayer.name}</div>
                        <div class="battle-screen-health">${Session.currentPlayer.params.health}</div>
                    </div>
                    <div class="battle-screen-turn center">${this.turn}</div>
                    <div class="battle-screen-side rigth">
                        <div class="battle-screen-name"><img src='${this.enemy[0].img}' alt="avatar ">${this.enemy[0].name}</div>
                        <div class="battle-screen-health">${this.enemy[0].params.health}</div>
                    </div>               
                </div>
                <div class="battle-screen-center"><span class="battle-screen-note">${this.event}</span></div>
                <div class="battle-screen-footer">
                    <button id="melee" style="cursor: grabbing;background-color: #880D0D;" class="battle-screen-button">Melee</button>
                    <button id="ranged" style="cursor: crosshair;background-color: #D8C45D;" class="battle-screen-button">Ranged</button>
                    <button id="dodge" style="cursor: pointer;background-color: #62A177;" class="battle-screen-button">Dodge</button>
                </div>
                </div>
            `
        if (this.turn==="Player Turn"){
            document.getElementById('melee').addEventListener('click',()=>{
                if (this.turn==="Player Turn"){
                    this.turn = "Enemy Turn";
                    this.event = `You hit the enemy for ${Session.currentPlayer.params.attack * 3} damage in melee`;
                    this.enemy[0].handleDefense(Session.currentPlayer.params.attack*3); //TODO: add damage calculation method
                    this.handleUpdateBattleScreen();
                    this.nextRound();
                }else alert("It's not your turn");
            })
            document.getElementById('ranged').addEventListener('click',()=>{
                if (this.turn==="Player Turn") {
                    this.turn = "Enemy Turn";
                    this.event = `You shoot the enemy for ${Session.currentPlayer.params.attack * 10} damage`;
                    this.enemy[0].handleDefense(Session.currentPlayer.params.attack * 10); //TODO: add damage calculation method
                    this.handleUpdateBattleScreen();
                    this.nextRound();
                } else alert("It's not your turn");
            })
            document.getElementById('dodge').addEventListener('click',()=>{
                if (this.turn==="Player Turn") {
                    this.turn = "Enemy Turn";
                    this.event = "You dodged the enemy attack";
                    this.handleUpdateBattleScreen();
                    this.nextRound();
                }else alert("It's not your turn");
            })
        }
    }
}
export default Battle
