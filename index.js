import handleStartGame from "./scenarios/gameStart.js";
import generateRegion from "./generationScripts/generateRegion.js";
import Session from "./classes/Game/Session.js";
import handleAction from "./controllers/player-controller.js";
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
const shopBtn = document.getElementById('shop-button');
const activityBtn = document.getElementById('activity-button');
const findRegionBtn = document.getElementById('find-region-btn');
const worldDescription = document.getElementById('world-description');


//Prototype section start ↓

//player.setTransport(new StarShip("StarShip","./img/rocket-on-ground.png?",30))

//Prototype section end ↑

//---------------------------EVENT LISTENERS---------------------------\\

gameBtn.addEventListener('click', handleStartGame);

generateBtn.addEventListener('click',()=>{
    generateRegion();
});
nextAreaLeftBtn.addEventListener('click',() =>
    handleAction("prev area"));

nextAreaRightBtn.addEventListener('click',() =>
    handleAction("next area"));

enterCityBtn.addEventListener('click',() =>{
    const result = handleAction("enter city")
    if (result) {
        exitCityBtn.style.display = 'block';
        enterCityBtn.style.display = 'none';
    }
});

landingBtn.addEventListener('click', () => {
    if (!Session.currentPlayer.location.city && !Session.currentPlayer.location.colony){
        handleAction("land");
    }else {
        alert(`Your ${Session.currentPlayer.transport.name} cannot land in the middle of the city`);
    }
});

takeOffBtn.addEventListener('click', () =>
    handleAction("take off"));

exitCityBtn.addEventListener('click',() => {
    const result = handleAction("exit city");
    if (result){
        exitCityBtn.style.display = 'none';
    }
});

goToBtn.addEventListener('click', () =>
    handleAction("walk"));

journalBtn.addEventListener('click',() =>
    handleAction("update journal"));

inventoryBtn.addEventListener('click',() =>
    handleAction("update inventory"));

bgColorInput.addEventListener('change', (e) => {
    document.body.style.backgroundColor = e.target.value;
});

shopBtn.addEventListener('click',() =>
    handleAction("shop"));

activityBtn.addEventListener('click',() =>
    handleAction("activity"));

findRegionBtn.addEventListener('click',() => {
    if (worldDescription.style.visibility === 'hidden') {
        worldDescription.style.visibility = 'visible';
    } else {
        worldDescription.style.visibility = 'hidden';
    }
});