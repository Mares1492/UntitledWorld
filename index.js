import handleStartGame from "./scenarios/gameStart.js";
import generateRegion from "./generationScripts/generateRegion.js";
import Session from "./classes/Game/Session.js";
import handleAction from "./classes/Character/player-controller.js";
const bgColorInput = document.getElementById('bg-color-input');
const landingBtn = document.getElementById('landing-button');
const takeOffBtn = document.getElementById('take-off-button');
const goToBtn = document.getElementById('go-to-button');
const enterCityBtn = document.getElementById('enter-city-button');
const exitCityBtn = document.getElementById('exit-city-button');
const nextAreaLeftBtn = document.getElementById('next-area-left');
const nextAreaRightBtn = document.getElementById('next-area-right');
const journalBtn = document.getElementById('journal');
const inventoryBtn = document.getElementById('inventory');
const gameBtn = document.getElementById('start-game-button');
const generateBtn = document.getElementById('generate');


//Prototype section start ↓

//player.setTransport(new Rocket("Rocket","./img/rocket-on-ground.png?",30))

//Prototype section end ↑

//---------------------------EVENT LISTENERS---------------------------\\

gameBtn.addEventListener('click', handleStartGame);

generateBtn.addEventListener('click',()=>{
    generateRegion();
});
nextAreaLeftBtn.addEventListener('click',() =>
    handleAction(Session.currentPlayer,"prev area"));

nextAreaRightBtn.addEventListener('click',() =>
    handleAction(Session.currentPlayer,"next area"));

enterCityBtn.addEventListener('click',() =>{
    const result = handleAction(Session.currentPlayer,"enter city")
    if (result) {
        exitCityBtn.style.display = 'block';
        enterCityBtn.style.display = 'none';
    }
});

landingBtn.addEventListener('click', () => {
    if (!Session.currentPlayer.location.city && !Session.currentPlayer.location.colony){
        handleAction(Session.currentPlayer,"land");
    }else {
        alert(`Your ${Session.currentPlayer.transport.name} cannot land in the middle of the city`);
    }
});

takeOffBtn.addEventListener('click', () =>
    handleAction(Session.currentPlayer,"take off"));

exitCityBtn.addEventListener('click',() => {
    const result = handleAction(Session.currentPlayer,"exit city");
    if (result){
        exitCityBtn.style.display = 'none';
    }
});

goToBtn.addEventListener('click', () =>
    handleAction(Session.currentPlayer, "walk"));

journalBtn.addEventListener('click',() =>
    handleAction(Session.currentPlayer,"update journal"));

inventoryBtn.addEventListener('click',() =>
    handleAction(Session.currentPlayer,"update inventory"));

bgColorInput.addEventListener('change', (e) => {
    document.body.style.backgroundColor = e.target.value;
});

