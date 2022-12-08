import Planet from "./classes/Planet/Planet.js";
import Player from "./classes/Character/Player.js";
import Region from "./classes/Planet/Region.js";
import Rocket from "./classes/Vehicle/Rocket.js";
import handleAction from "./classes/Character/player-controller.js";
import StarSystem from "./classes/StarSystem/StarSystem.js";
const submit = document.getElementById('generate');
const bgColorInput = document.getElementById('bg-color-input');
const landingBtn = document.getElementById('landing-button');
const takeOffBtn = document.getElementById('take-off-button');
const goToBtn = document.getElementById('go-to-button');
const enterCityBtn = document.getElementById('enter-city-button');
const story = document.getElementById('story');
const exitCityBtn = document.getElementById('exit-city-button');
const nextAreaContainer = document.getElementById('next-area-container');
exitCityBtn.style.display = 'none';
nextAreaContainer.style.display = 'none';
takeOffBtn.style.display = 'none';
goToBtn.style.display = 'none';
enterCityBtn.style.display = 'none';
document.getElementById('activity-button').style.display = 'none';

//Prototype section start ↓

const homeSystem = new StarSystem({galaxy: 'Home galaxy',sector: 'Home sector',subSector: 'Home sub-sector',cords:{x:765 , y:1320,z: 233}}, 'Home system');

const homePlanet = new Planet(
    {galaxy: 'Home galaxy',sector: 'Home sector',subSector: 'Home sub-sector',system: 'Home system'},
    "Home Planet",
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
    "Player1",
    {health:20, defense:0, attack:0, speed:1},
    {str:10,dex:10,int:10,agi:10,cha:10},
    {planet:"Home Planet",region:"Home",tile:{x:0,y:0}},
    new Rocket("Rocket",0,0,"./img/rocket-on-ground.png?",30));


console.log(player);
const updateMap = () => {
    Planet.getPlanet(player.getPlanet()).getRegion(player.getRegion()).updateMap();
}

const getStory = (type) => {

    if (type === "Text") {
        return story.value;
    }
}

const generatePic = () =>{
    const planet = Planet.getPlanet("Home Planet") //adjust to get planet from input
    const text = getStory("Text");
    const region = new Region(
        "New Hope",
        text,
        parent.innerWidth/70,
        parent.innerHeight/70,
        planet.name
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
        nextAreaContainer.style.display = 'none';
    }
}
//---------------------------EVENT LISTENERS---------------------------\\

enterCityBtn.addEventListener('click',handleEnterCityBtnClick);
landingBtn.addEventListener('click', handleLanding);
takeOffBtn.addEventListener('click', handleTakeOff);
exitCityBtn.addEventListener('click',handleExitCityBtnClick);
goToBtn.addEventListener('click', walkToTile);
submit.addEventListener('click', generatePic);
bgColorInput.addEventListener('change', (e) => {
    document.body.style.backgroundColor = e.target.value;
});
