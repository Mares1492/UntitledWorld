import Planet from "./classes/Planet/Planet.js";
import Player from "./classes/Character/Player.js";
import Region from "./classes/Planet/Region.js";
import Rocket from "./classes/Transport/Rocket.js";
import handleAction from "./classes/Character/player-controller.js";
import StarSystem from "./classes/StarSystem/StarSystem.js";
import startGame from "./classes/Text/PassageLogic.js";
import Appearance from "./classes/Character/Appearance.js";
const submit = document.getElementById('generate');
const bgColorInput = document.getElementById('bg-color-input');
const landingBtn = document.getElementById('landing-button');
const takeOffBtn = document.getElementById('take-off-button');
const goToBtn = document.getElementById('go-to-button');
const enterCityBtn = document.getElementById('enter-city-button');
const story = document.getElementById('story');
const exitCityBtn = document.getElementById('exit-city-button');
const nextAreaLeftBtn = document.getElementById('next-area-left');
const nextAreaRightBtn = document.getElementById('next-area-right');
// Kristo osa
const confirmName = document.getElementById('character-name-button');
const sexBtn = document.getElementById('sex-button');
const jobBtn = document.getElementById('job-button');
const gameBtn = document.getElementById('start-game-button');
// Kristo osa lõpp
takeOffBtn.style.display = 'none';
goToBtn.style.display = 'none';
enterCityBtn.style.display = 'none';
document.getElementById('activity-button').style.display = 'none';

//Prototype section start ↓

const homeSystem = new StarSystem({galaxy: 'Home galaxy',sector: 'Home sector',subSector: 'Home sub-sector',cords:{x:765 , y:1320,z: 233}}, 'Home system');

const homePlanet = new Planet(
    {galaxy: 'Home galaxy',sector: 'Home sector',subSector: 'Home sub-sector',system: 'Home system'},
    "New Hope",
    "Terrestrial",
    "Your home-planet",
    "Breathable",
    "Moderate",
    "1G",
    ["Hills","Mountains","Forests","trees","grass"],
    "Moderate",
    "Sapient life",
    ["Water", "Minerals", "Metals","Lumber", "Plants", "Animals"],
    null);

console.log(homeSystem);
console.log(homePlanet);

const player = new Player(
    "Ben Grylls",
    {health:20, defense:0, attack:0, speed:1},
    {strength:5,dexterity:4,intellect:6,agility:3,charisma:7},
    {planet:"New Hope",region:"Home",tile:{x:0,y:0}}
);
player.setTransport(new Rocket("Rocket","./img/rocket-on-ground.png?",30))

console.log(player);
const updateMap = () => {
    Planet.getPlanet(player.getPlanet()).getRegion(player.getRegion()).updateMap();
}

const getStory = (type) => { //It is actually a part of the early version of the game, but I decided to keep it for now
    if (type === "Text") {
        return story.value;
    }
}

const generatePic = () =>{
    const planet = Planet.getPlanet("New Hope") //adjust to get planet from input
    const text = getStory("Text");
    const region = new Region(
        "Home",
        text,
        parent.innerWidth/120,
        parent.innerHeight/70,
        {planet:planet.name},
        );
    player.location = {planet:planet.name,region:region.name};
    console.log("Adding: ",region,"To: ",planet);
    planet.addRegion(region);
    submit.style.display = 'none';
    document.getElementById('region-name').value = region.name;
    updateMap();
}

//Prototype section end ↑

const handleEnterCityBtnClick = () =>{
    const result = handleAction(player,"enter city")
    if (result) {
        exitCityBtn.style.display = 'block';
        enterCityBtn.style.display = 'none';
        // nextAreaContainer.style.display = 'block';
    }

}
const walkToTile = () => {
    handleAction(player, "walk");
}
const handleTakeOff = () => {
    handleAction(player,"take off");
}
const handleLanding = () => {
    handleAction(player,"land");
}
const handleExitCityBtnClick = () => {
    const result = handleAction(player,"exit city");
    if (result){
        exitCityBtn.style.display = 'none';
    }
}

const handleGoToNextArea = () => {
    handleAction(player,"next area");
}
const handleGoToPrevArea = () => {
    handleAction(player,"prev area");
}

// Kristo osa

const updatePlayerName = () =>{
    player.name = document.getElementById('character-name-input').value;
    document.getElementById('character-name').innerHTML = player.name;
    console.log("Player name is", '"',player.name,'"');
}

const startingGame = () =>{
    var startingScreen = document.getElementById('starting-screen');
    startingScreen.parentNode.removeChild(startingScreen);
    startGame();
    document.getElementById('modal-passage').style.display = 'block';
}

const appearance = new Appearance(
    "male","blue","brown", "short", "muscled"
);

// Kristo osa lõpp

//---------------------------EVENT LISTENERS---------------------------\\
nextAreaLeftBtn.addEventListener('click',handleGoToPrevArea);
nextAreaRightBtn.addEventListener('click',handleGoToNextArea);
enterCityBtn.addEventListener('click',handleEnterCityBtnClick);
landingBtn.addEventListener('click', handleLanding);
takeOffBtn.addEventListener('click', handleTakeOff);
exitCityBtn.addEventListener('click',handleExitCityBtnClick);
goToBtn.addEventListener('click', walkToTile);
submit.addEventListener('click', generatePic);
bgColorInput.addEventListener('change', (e) => {
    document.body.style.backgroundColor = e.target.value;
});
// Kristo osa
confirmName.addEventListener('click', updatePlayerName);
gameBtn.addEventListener('click', startingGame);

// Kristo osa lõpp