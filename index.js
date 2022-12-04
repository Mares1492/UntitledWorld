import Planet from "./classes/Planet/Planet.js";
import Player from "./classes/Character/Player.js";
import Region from "./classes/Planet/Region.js";
import Rocket from "./classes/Vehicle/Rocket.js";
const submit = document.getElementById('generate');
const landscapeContainer = document.getElementById('landscape-container');
const landingBtn = document.getElementById('landing-button');
const takeOffBtn = document.getElementById('take-off-button');
const goToBtn = document.getElementById('go-to-button');
document.getElementById('take-off-button').style.display = 'none';
document.getElementById('go-to-button').style.display = 'none';

const homePlanet = new Planet(
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

const player = new Player(
    "Player1",
    {health:20, defense:0, attack:0, speed:1},
    {str:10,dex:10,int:10,agi:10,cha:10},
    {planet:"Home Planet",region:"Home",tile:{x:0,y:0}},
    new Rocket("Rocket",0,0,"/img/rocket.png",30));
console.log(homePlanet);
console.log(player);

const terrainElements = {
    rocket:{symbol:'R', color:'rgba(0,0,0,0)', img:'img/rocket.png', width:50, height:50,style:"box-shadow:inset 0 -1em 1em #f8bc04;",name:'Rocket'},
    ocean: {symbol:'~',color: '#F8F8F8',img:"img/water.png",width:"35",height:"35",style:"opacity: 0.5;",name:"An Ocean",passable:false,description:"A large body of water"},
    sea: {symbol:'~',color: '#F8F8F8',img:"img/water.png",width:"35",height:"35",style:"opacity: 0.5;",name:"A sea",passable:false,description:"A large body of water, not as large as an ocean though"},
    sand: {symbol:'.', color: '#909090',img:"img/sand.png",width:"8",height:"8",style:"opacity: 0.7;background-repeat: repeat;",name:"Sand"},
    rock: {symbol:':', color: '#909090',img:"img/rock.png",width:"20",height:"20",style:"opacity: 0.7;background-repeat: repeat;",name:"Rock"},
    desert: {symbol:'*', color: '#909090',img:"img/desert.png",width:"20",height:"20",style:"opacity: 0.7;background-repeat: repeat;",name:"Desert"},
    plain: {symbol:',', color: '#B0B0B0',img:"img/grass.png",width:"10",height:"10",style:"opacity: 0.7;background-repeat: repeat;",name:"Plains"},
    wildness: {symbol:',', color: '#B0B0B0',img:["img/grass.png","img/forest.png","img/rock.png",],width:"10",height:"10",style:"opacity: 0.7;background-repeat: repeat;",name:"wildness",description:"A wild place, with a lot of different things"},
    grass: {symbol:',', color: '#909090',img:"img/grass.png",width:"13",height:"13",style:"opacity: 0.7;background-repeat: space;",name:"Grass"},
    trees: {symbol:'↑', color: '#909090',img:"img/tree.png",width:"20",height:"20",style:"opacity: 0.7;background-repeat: space;",name:"Trees"},
    town: {symbol:'|_|_|', color: '#909090',img:"img/town.png",width:"15",height:"15",style:"background-repeat: no-repeat;",name:"Town"},
    palace: {symbol:'|^|^|^|', color: '#909090',img:"img/palace.png",width:"15",height:"15",name:"Palace"},
    forest: {symbol:'↑↑↑', color: '#585858',img:"img/forest.png",width:"30",height:"30",name:"Forest"},
    river: {symbol:'≈',color: '#F8F8F8',img:"img/river.png",width:"35",height:"35",style:"opacity: 0.5;background-repeat: space;",name:"River",description:"At this place, the river overflowed strongly. It is not possible to cross it.",passable:false},
    mountain: {symbol:'/\\\\',color: '#606060',img:["img/mountain.png","img/mountains.png"], width:"40",height:"40",name:"Mountains",passable:false},
    quest: {symbol:'+',color: '#A0A0A0',img:"img/quest.png",width:"30",height:"30",name:"Quest Marker",description: "A quest marker. You can may find something interesting there."},
    house: {symbol:'|^|',color: '#909090',img:"img/house.png",width:"15",height:"15",name:"House",description: "A lonely house in the centre of wildness."},
    castle: {symbol:'|_|',color: '#909090',img:"img/castle.png",width:"30",height:"30",name:"Castle"},
    city: {symbol:'|_|_|_|',color: '#909090',img:"img/city.png",width:"30",height:"30",name:"City"},
    camp: {symbol:'(^)',color: '#606060',img:"img/camp.png",width:"25",height:"25",name:"Camp"},
    //bridge: {symbol:'=',color: '#383838',img:"img/bridge.png",width:"30",height:"30",name:"Bridge"},
    cave: {symbol:'()',color: '#606060',img:"img/cave.png",width:"20",height:"20",name:"Cave",description: "Dark and dusty cave. You can find something interesting there(or not).",passable:false},
    mine: {symbol:'()',color: '#B0B0B0',img:"img/mine.png",width:"15",height:"15",name:"Mine",description:"A mine. You can find minerals there. Hard labor is required."},
    farm: {symbol:'[=^=]',color: '#909090',img:"img/farm.png",width:"20",height:"20",name:"Farm"},
    village: {symbol:'|_|_|_|_|',color: '#909090',img:"img/village.png",width:"30",height:"30",name:"Village"},
    sky: {symbol:'\n',color: '#E8E8E8',img:"img/sky.png",width:"30",height:"30",name:"Sky"},
    colony: {symbol:'|-|(|)|_|',color: '#606060',img:"img/colony.png",width:"30",height:"30",name:"Colony",description: "A colony. Nice."},
    lumber: {symbol:'↑__|_|_↑',color: '#B0B0B0',img:"img/lumbermill.png",width:"15",height:"15",name:"Lumber-camp",description: "A lumber-camp. You can find wood there."},
    battle: {symbol:'X',color: '#606060',img:"img/battle.png",width:"20",height:"20",name:"Battle",passable:false,description: "Battlefield..."},
    ruin: {symbol:'/||\\',color: '#606060',img:"img/ruin.png",width:"20",height:"20",name:"Ruin"},
    fire: {symbol:'F',color: '#606060',img:"img/fire.png",width:"20",height:"20",name:"Fire",passable:false},
    volcano:{symbol:'V',color: '#606060',img:"img/volcano.png",width:"30",height:"30",name:"Volcano",passable:false},
    hill:{symbol:'^#^',color: '#B0B0B0',img:"img/hill.png",width:"50",height:"50",name:"Hills"},
    swamp:{symbol:'≈≈',color: '#606060',img:"img/swamp.png",width:"15",height:"15",name:"Swamp"},
    lake:{symbol:'≈≈≈',color: '#909090',img:"img/lake.png",width:"30",height:"30",name:"Lake",description:"A lake big enough to be mentioned of"},
    field:{symbol:'___',color: '#B0B0B0',img:"img/field.png",width:"37",height:"37",name:"Field"},
}

const positiveAdjectives = ["lot","many","much"];
const negativeAdjectives = ["few"]
const positiveEconomicAdjectives = ["rich","wealthy","poverty","wealth","big","good","huge","gigantic","vast","great"];
const negativeEconomicAdjectives = ["poor","poverty","unwealthy","unwealth","bad","small","little","poorly"];

// const description = "This is a green planet with a lot of grass and trees.
// There are some mountains and a few rivers. There are also some cities and castles.
// There are also some farms and mines. There are also some caves.
// There are also some camps and houses. There are also some roads. There should also be a colony"

const getStory = (type) => {
    const story = document.getElementById('story');
    if (type === "Text") {
        return story.value;
    }
}

const goToTile = () => {
    const x = parseInt(document.getElementById('tile-x-cords').innerHTML);
    const y = parseInt(document.getElementById('tile-y-cords').innerHTML);
    player.goToTile({x:x, y:y});
    updateMap()
}

const tryToTakeOff = () => {
    const landedOff = player.getTransport().takeOff();
    if (landedOff) {
        document.getElementById('go-to-button').style.display = 'none';
        document.getElementById('landing-button').style.display = 'block';
        document.getElementById('take-off-button').style.display = 'none';
        updateMap();
        const x = parseInt(document.getElementById('tile-x-cords').innerHTML);
        const y = parseInt(document.getElementById('tile-y-cords').innerHTML);
        document.getElementById(`${x+'-'+y}`).style.animation = "takeOffAnimation 5s";
        setTimeout(() => {
            document.getElementById(`${x+'-'+y}`).style.animation = "";
            updateMap();
        }, 5000);
    }
    else {
        alert("You can't take off from here!");
    }
}

const tryToLand = async () => {
    const region = Planet
        .getPlanet(player.getPlanet())
        .getRegion(player.getRegion());
    const x = parseInt(document.getElementById('tile-x-cords').innerHTML);
    const y = parseInt(document.getElementById('tile-y-cords').innerHTML);
    console.log(x,y,player.getPlanet(),player.getRegion())
    const hasLanded = player.getTransport()
        .landAt(player.getPlanet(), player.getRegion(), x, y);
    if (hasLanded) {
        player.goToTile({x:x, y:y});
        updateMap();
        document.getElementById('go-to-button').style.display = 'block';
        document.getElementById('landing-button').style.display = 'none';
        document.getElementById(`${x+'-'+y}`).style.animation = "landingAnimation 5s";
        setTimeout(() => {
            document.getElementById(`${x+'-'+y}`).style.animation = "";
        }, 5000);
    }else {
        alert("You can't land here!");
    }
}

const updateMap = (planet=homePlanet,regionName="Home") => {
    const region = planet.getRegion(regionName)
    landscapeContainer.innerHTML = region.getLandscape();
    landscapeContainer.scrollIntoView();
}

const generatePlanet = ({props}) => { // creates a new planet by optional params
    new Planet(
        props?.name,
        props?.type,
props?.description,
        props?.temperature,
        props?.gravity,
        props?.gravity,
        props?.terrain,
        props?.water,
        props?.life,
        props?.resources);

}

const generatePic = () =>{
    const planet = Planet.getPlanet("Home Planet") //adjust to get planet from input
    const text = getStory("Text");
    const region = new Region(
        "Home",
        text,
        parent.innerWidth/50,
        parent.innerHeight/45,
        terrainElements,
        positiveAdjectives,
        negativeAdjectives,
        positiveEconomicAdjectives,
        negativeEconomicAdjectives,
        planet.name
        );
    player.location = {planet:planet.name,region:region.name};
    console.log("Adding ",region,"To ",planet);
    planet.addRegion(region);
    updateMap();
}



landingBtn.addEventListener('click', tryToLand);
takeOffBtn.addEventListener('click', tryToTakeOff);
goToBtn.addEventListener('click', goToTile);
submit.addEventListener('click', generatePic);








