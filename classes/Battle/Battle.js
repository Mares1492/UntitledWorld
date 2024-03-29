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
        this.updateHealthBar();
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
        this.updateHealthBar();
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
            this.event = `Enemy tries to shoot you but misses!`; //TODO: add enemy attack
            this.handleUpdateBattleScreen();
            this.nextRound();
        },Math.floor(Math.random()*3000)+1000)
    }

    updateHealthBar(){
        document.getElementById('player-health').style.width = `${Session.currentPlayer.getHealth()/Session.currentPlayer.getMaxHealth()*100}%`;
        document.getElementById('enemy-health').style.width = `${this.enemy[0].getHealth()/this.enemy[0].getMaxHealth()*100}%`;
    }
    handleUpdateBattleScreen(){
        landscapeContainer.innerHTML =
            `
                <div class="battle-screen">
                <span id="timer" class="center">10</span>
                <div class="battle-screen-header">
                    <div class="battle-screen-side left">
                        <div class="battle-screen-name"><img src="./img/user-not-found.png" width="50" height="50" alt="avatar">
                            <span class="battle-screen-name-font">${Session.currentPlayer.name}</span>
                        </div>
                        <div class="battle-screen-health"><div class="current-health" id=player-health>${Session.currentPlayer.getHealth()}/${Session.currentPlayer.getMaxHealth()}</div></div>
                    </div>
                    <div class="battle-screen-turn center">${this.turn}</div>
                    <div class="battle-screen-side rigth">
                        <div class="battle-screen-name"><img src='${this.enemy[0].img}' width="50" height="50" alt="avatar">
                            <span class="battle-screen-name-font">${this.enemy[0].name}</span>
                        </div>
                        <div class="battle-screen-health"><div class="current-health" id=enemy-health>${this.enemy[0].getHealth()}/${this.enemy[0].getMaxHealth()}</div></div>
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
                    this.event = "You are prepared to dodge the enemy attack";
                    this.handleUpdateBattleScreen();
                    this.nextRound();
                }else alert("It's not your turn");
            })
        }
    }
}
export default Battle
