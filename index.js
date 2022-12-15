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
const journalBtn = document.getElementById('journal');
const inventoryBtn = document.getElementById('inventory');
const regionNameGlobal = document.getElementById('region-name');

// Kristo osa

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
    new Appearance(),
    {health:20, defense:0, attack:0, speed:1},
    {strength:5,dexterity:4,intellect:6,agility:3,charisma:7},
    {planet:"New Hope",region:"Home"}
);
player.setTransport(new Rocket("Rocket","./img/rocket-on-ground.png?",30))

console.log(player);
const updateMap = () => {
    Planet.getPlanet(player.getPlanet()).getRegion(player.getRegion()).updateMap();
}

const textTemplate = "This is a green planet with a lot of grass and trees. " +
    "There is a big river. There are a lot of cities and towns. " +
    "There are also some farms and mines. There are also some caves. " +
    "There are also some camps and houses. There are also some quest points. There should also be some colonies."

const generatePic = (text=story.value,regionName = regionNameGlobal.value) =>{
    if (!player.location.city && !player.location.colony && !player.location.tile){
        const planet = Planet.getPlanet("New Hope") //adjust to get planet from input
        const region = new Region(
            regionName,
            text,
            parent.innerWidth/120,
            parent.innerHeight/70,
            {planet:planet.name},
            );
        player.location = {planet:planet.name,region:region.name};
        console.log("Adding: ",region,"To: ",planet);
        planet.addRegion(region);
        document.getElementById('region-name').value = region.name;
        updateMap();
        return region;
    }
    alert("Player should not be on surface");
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
    if (!player.location.city && !player.location.colony){
        handleAction(player,"land");
    }else {
        alert(`Your ${player.transport.name} cannot land in the middle of the city`);
    }
}
const handleExitCityBtnClick = () => {
    const result = handleAction(player,"exit city");
    if (result){
        exitCityBtn.style.display = 'none';
    }
}
const handleJournalClick = () => {
    handleAction(player,"update journal");
}
const handleInventoryClick = () => {
   handleAction(player,"update inventory");
}

const handleGoToNextArea = () => {
    handleAction(player,"next area");
}
const handleGoToPrevArea = () => {
    handleAction(player,"prev area");
}

const handleShowInterface = () => {
    document.getElementById('info-component').style.display = 'flex';
    document.getElementById('map-component').style.display = 'block';
}

// Kristo osa

const playerAppearance = new Appearance(
    "unassigned","blue","brown", "short", "muscled", "unassigned"
);

//Ma armastan nuppe!!!!!


const startingGame = () =>{
    console.log("Starting game");
    const name = document.getElementById('character-name-input').value;
    if (name === ""){
        alert("Please enter a name");
        return;
    }
    const gender = document.querySelector('input[name="gender"]:checked')?.value;
    if (!gender){
        alert("Please select characters gender");
    }
    const job = document.querySelector('input[name="job"]:checked')?.value;
    if (!job){
        alert("Please select a job");
        return;
    }

    player.updateName(name);
    document.getElementById('create-char-container').style.display = 'none';
    document.getElementById('modal-passage').style.display = 'block';
    handleShowInterface()
    startGame();
    const region = generatePic(textTemplate,"Home");
    const city = region.getCity("City-1")
    player.location = {planet:homePlanet.name,region:region.name,city:city.name,tile:{x:city.location.tile.x,y:city.location.tile.y}};
    player.transport.landAt(player.location.planet,player.location.region,player.location.tile.x,player.location.tile.y);
    player.handleEnterCity(city,"city");
    document.getElementById('exit-city-button').style.display = 'block';

}

// Kristo osa lõpp

//---------------------------EVENT LISTENERS---------------------------\\
nextAreaLeftBtn.addEventListener('click',handleGoToPrevArea);
nextAreaRightBtn.addEventListener('click',handleGoToNextArea);
enterCityBtn.addEventListener('click',handleEnterCityBtnClick);
landingBtn.addEventListener('click', handleLanding);
takeOffBtn.addEventListener('click', handleTakeOff);
exitCityBtn.addEventListener('click',handleExitCityBtnClick);
goToBtn.addEventListener('click', walkToTile);
submit.addEventListener('click', ()=>generatePic());
journalBtn.addEventListener('click',handleJournalClick);
inventoryBtn.addEventListener('click',handleInventoryClick);
bgColorInput.addEventListener('change', (e) => {
    document.body.style.backgroundColor = e.target.value;
});
// Kristo osa
gameBtn.addEventListener('click', startingGame);
// Kristo osa lõpp