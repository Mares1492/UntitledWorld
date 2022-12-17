import Terrain from "./Terrain.js";
import Planet from "./Planet.js";
import City from "./City/City.js";
import Colony from "./City/Colony.js";

const landscapeContainer = document.getElementById('landscape-container');
const landscapeDesc = document.getElementById('landscape-description')
const nextAreaLeft = document.getElementById('next-area-left');
const nextAreaRight = document.getElementById('next-area-right');

const terrainElements = {
    rocket:{symbol:'R', color:'rgba(0,0,0,0)', img:'./img/rocket.png?', width:50, height:50,style:"box-shadow:inset 0 -1em 1em #f8bc04;",name:'Rocket',description:"You are not suppose to be here :p"},
    ocean: {symbol:'~',color: '#F8F8F8',img:"./img/water.png?",width:"35",height:"35",style:"opacity: 0.5;",name:"An Ocean",passable:false,description:"A large body of water"},
    sea: {symbol:'~',color: '#F8F8F8',img:"./img/water.png?",width:"35",height:"35",style:"opacity: 0.5;",name:"A sea",passable:false,description:"A large body of water, not as large as an ocean though"},
    sand: {symbol:'.', color: '#909090',img:"./img/sand.png?",width:"25",height:"25",style:"opacity: 0.7;background-repeat: repeat;align-self:end;",name:"Sand",description:"Just a big pile of sand"},
    rock: {symbol:':', color: '#909090',img:"./img/rock.png?",width:"20",height:"20",style:"opacity: 0.7;background-repeat: repeat;",name:"Rock"},
    desert: {symbol:'*', color: '#909090',img:"./img/desert.png?",width:"35",height:"35",style:"opacity: 0.7;background-repeat: repeat;",name:"Desert"},
    plain: {symbol:',', color: '#B0B0B0',img:"./img/grass.png?",width:"10",height:"10",style:"opacity: 0.7;background-repeat: repeat;",name:"Plains"},
    wildness: {symbol:',', color: '#B0B0B0',img:["./img/grass.png?","./img/forest.png","./img/rock.png",],width:"10",height:"10",style:"opacity: 0.7;background-repeat: repeat;",name:"wildness",description:"A wild place, with a lot of different things"},
    grass: {symbol:',', color: '#909090',img:"./img/grass.png?",width:"13",height:"13",style:"opacity: 0.7;background-repeat: repeat;",name:"Grass"},
    trees: {symbol:'↑', color: '#909090',img:"./img/tree.png?",width:"20",height:"20",style:"opacity: 0.7;background-repeat: space;",name:"Trees"},
    town: {symbol:'|_|_|', color: '#606060',img:"./img/town.png?",width:"26",height:"26",style:"background-repeat: no-repeat;align-self:end;",name:"Town",isLandable:false,description:"Small and unimportant town"},
    palace: {symbol:'|^|^|^|', color: '#909090',img:"./img/palace.png?",width:"15",height:"15",name:"Palace"},
    forest: {symbol:'↑↑↑', color: '#585858',img:"./img/forest.png?",width:"30",height:"30",name:"Forest",style:"align-self:end;",isLandable:false},
    river: {symbol:'≈',color: '#F8F8F8',img:"./img/river.png?",width:"35",height:"35",style:"opacity: 0.5;background-repeat: space;",name:"River",description:"At this place, the river overflowed strongly. It is not possible to cross it.",isPassable:false,isLandable:false},
    mountain: {symbol:'/\\\\',color: '#606060',img:["./img/mountain.png?","./img/mountains.png?"],style:"align-self:end;", width:"40",height:"40",name:"Mountains",isPassable:false,isLandable:false},
    quest: {symbol:'+',color: '#A0A0A0',img:"./img/quest.png?",width:"30",height:"30",name:"Quest Marker",description: "A quest marker. You can may find something interesting there."},
    house: {symbol:'|^|',color: '#909090',img:"./img/house.png?",width:"15",height:"15",name:"House",description: "A lonely house in the centre of wildness."},
    castle: {symbol:'|_|',color: '#909090',img:"./img/castle.png?",width:"30",height:"30",name:"Castle"},
    city: {symbol:'|_|_|_|',color: '#909090',img:["./img/city.png?","./img/city2.png?","./img/city3.png?","./img/city4.png?"],width:"37",height:"37",name:"City",isLandable:false},
    camp: {symbol:'(^)',color: '#606060',img:"./img/camp.png?",width:"25",height:"25",name:"Camp",description: "It can be anything from war refuges camp to nomads and from nearby colony residents to a group of bandit-cannibals."},
    cave: {symbol:'()',color: '#606060',img:"./img/cave.png?",width:"20",height:"20",name:"Cave",description: "Dark and dusty cave. You can find something interesting there(or not).",isLandable:false},
    mine: {symbol:'()',color: '#B0B0B0',img:"./img/mine.png?",width:"15",height:"15",name:"Mine",description:"A mine. You can find minerals there. Hard labor is required.",isLandable:false},
    farm: {symbol:'[=^=]',color: '#909090',img:"./img/farm.png?",width:"20",height:"20",name:"Farm"},
    village: {symbol:'|_|_|_|_|',color: '#909090',img:"./img/village.png?",width:"30",height:"30",name:"Village"},
    //sky: {symbol:'\n',color: '#E8E8E8',img:"./img/sky.png?",width:"30",height:"30",name:"Sky"},
    colony: {symbol:'|-|(|)|_|',color: '#606060',img:"./img/colony.png?",width:"30",height:"30",name:"Colony",style:"align-self:end;",description: " may one day become a city",isLandable:false},
    lumber: {symbol:'↑__|_|_↑',color: '#B0B0B0',img:"./img/lumbermill.png?",width:"15",height:"15",name:"Lumber-camp",description: "A lumber-camp. You can find wood there."},
    battle: {symbol:'X',color: '#606060',img:"./img/battle.png?",width:"20",height:"20",name:"Battle",isPassable:false,isLandable:false,description: "Battlefield..."},
    ruin: {symbol:'/||\\',color: '#606060',img:"./img/ruin.png?",width:"20",height:"20",name:"Ruin"},
    fire: {symbol:'F',color: '#606060',img:"./img/fire.png?",width:"20",height:"20",name:"Fire",isPassable:false},
    volcano:{symbol:'V',color: '#606060',img:"./img/volcano.png?",width:"30",height:"30",name:"Volcano",isPassable:false,isLandable:false},
    hill:{symbol:'^#^',color: '#B0B0B0',img:"./img/hill.png?",width:"35",height:"35",name:"Hills"},
    swamp:{symbol:'≈≈',color: '#606060',img:"./img/swamp.png?",width:"15",height:"15",name:"Swamp"},
    lake:{symbol:'≈≈≈',color: '#909090',img:"./img/lake.png?",width:"30",height:"30",name:"Lake",description:"A lake big enough to be mentioned of"},
    field:{symbol:'___',color: '#B0B0B0',img:"./img/field.png?",width:"30",height:"30",name:"Field"},
    spaceStation:{symbol:'|_|_<|>_|_|',color: 'rgba(0,0,0,0)',img:"./img/space-station.png?",width:"40",height:"40",name:"Space Station",style:"box-shadow:inset 0 -1em 1em #000000;opacity:0.7;",description:"Somewhere in space."},
    aliens:{symbol:'X',color: '#b71c1c',img:["./img/aliens.png?","./img/aliens2.png?","./img/aliens3.png?"],width:"20",height:"20",name:"x-x-x-x-x-x-x-x",description:"Alien activity detected.",isPassable:false,isLandable:false},
    military:{symbol:'KILL',color: '#ff9e80',img:["./img/military.png?","./img/military2.png?"],
    width:"30",height:"30",name:"Military deployment area",description:"Serious guys with guns, better stay away.",isPassable:false,isLandable:false},
}

const positiveAdjectives = ["lot","many","much"];
const negativeAdjectives = ["few"]
const positiveEconomicAdjectives = ["rich","wealthy","poverty","wealth","big","good","huge","gigantic","vast","great"];
const negativeEconomicAdjectives = ["poor","poverty","unwealthy","unwealth","bad","small","little","poorly"];

class Region {
    constructor(name,text, width, height,location) {
        this.name = name;
        this.text = this.initialFilter(text);
        this.positiveAdjectives = positiveAdjectives;
        this.negativeAdjectives = negativeAdjectives;
        this.positiveEconomicAdjectives = positiveEconomicAdjectives;
        this.negativeEconomicAdjectives = negativeEconomicAdjectives;
        this.terrainElements = terrainElements;
        this.width = width;
        this.height = height;
        this.location = location;
        this.filteredText = this.filterText();
        this.cities = new Map();
        this.colonies = new Map();
        if (text.split(".").length > 1 && text.split(".")[1].split(" ").length > 5) {
            this.basicTerrain = this.textBasedBasicTerrainGen();
        }
        else {
            this.basicTerrain = this.planetBasedBasicTerrainGen();
        }
        console.log(`This regions basic terrain contains ${this.basicTerrain}`);
        this.generate();
        this.numberOfElements = this.getNumberOfElements(text);
        if (this.basicTerrain.length) {
            this.addElements();
        }
        this.selectedTile = {name:"No Data",description:"No title provided",x:0,y:0};
    }
    planetBasedBasicTerrainGen() {
        const planet = Planet.getPlanet(this.location.planet)
        const terr =  planet.terrain.map(
                el => this.isWordInElements(Object.keys(this.terrainElements), el))
            .filter(word=>word);
        const resources = planet.resources.map(
            el => this.isWordInElements(Object.keys(this.terrainElements), el))
            .filter(word=>word);
        return terr.concat(resources);
    }
    textBasedBasicTerrainGen() {
        return this.text
            .split('.')[0]
            .split(' ')
            .filter(word=>word.length>2)
            .map(word => this.isWordInElements(Object.keys(this.terrainElements), word)).filter(word=>word);

    }

    generate() {
        if (this.basicTerrain.length) {
            this.landscape = [];
            let randomTerr = 0;
            for (let y=0; y < this.height; y++) {
                this.landscape.push([]);
                for (let x=0; x < this.width; x++) {
                    randomTerr = Math.floor(Math.random() * this.basicTerrain.length);
                    const pickedTerrain = this.terrainElements[this.basicTerrain[randomTerr]];
                    this.addElement(pickedTerrain, x, y);
                    //landscape[y][x] = this.terrainElements[this.basicTerrain[randomTerr]];
                }
            }
        } else {
            this.landscape = [[]];
            this.addElement(this.terrainElements.spaceStation, 0, 0);
        }
    }
    addColony(x,y){
        const colony = new Colony(`Colony-${this.colonies.size+1}`,{planet:this.location.planet,region:this.name,tile:{x:x,y:y}})
        console.log(colony);
        if (this.colonies.has(colony.name)) {
            console.log(`Colony ${colony.name} already exists`);
            return false;
        }
        this.colonies.set(colony.name, colony);
        console.log(`Colony ${colony.name} added to ${this.name}`);
        return colony;
    }
    getColony(name){
        if (this.colonies.has(name)) {
            return this.colonies.get(name);
        }
        console.log(`Colony ${name} not found`);
        console.log(this.colonies);
        return false;
    }
    addCity(x,y) {
        const city = new City(`City-${this.cities.size+1}`,{planet:this.location.planet,region:this.name,tile:{x:x,y:y}});
        if (this.cities.has(city.name)) {
            console.log(`City ${city.name} already exists`);
            return false;
        }
        this.cities.set(city.name, city);
        return city.name;
    }
    getCities() {
        return this.cities;
    }
    getCity(name) {
        if (this.cities.has(name)) {
            return this.cities.get(name);
        }
        console.log(`City ${name} not found`);
        return false;
    }
    getRandomCity() {
        const cities = Array.from(this.cities.values());
        return cities[Math.floor(Math.random() * cities.length)];
    }

    getNumberOfElements(text) {
        let numberOfElements = new Map();
        text.split('.').forEach(sentence => sentence.split(' ').forEach(word => {
            if (numberOfElements.has(word)) {
                numberOfElements.set(word, numberOfElements.get(word) + 1);
            } else {
                numberOfElements.set(word, 1);
            }
        }));
        return numberOfElements;
    }
    getLandmarkSpawnMultiplier(key) {
        const index = this.filteredText.indexOf(key);
        let positive = this.isWordInElements(this.positiveAdjectives, this.filteredText.at(index-1));
        if (positive) {
            return 25;
        }
        let negative = this.isWordInElements(this.negativeAdjectives, this.filteredText.at(index-1));
        if (negative) {
            return 5;
        }
        return 10;
    }
    initialFilter(text) {
        return text.replace(/[^a-zA-Z0-9-,-. ]/g, '');
    }

    filterText() {
        let toFilter = ["of","and","so","the","are","a","an","is","with","also","be","should",""," "];

        return this.text.replace(/[,-. ]/g,' ').split(' ').filter(word => (!toFilter.includes(word)));
    }


    checkForCluster(element) {
        const index = this.filteredText.indexOf(element);
        if (index < 0) {
            return false;
        }
        let negative = this.isWordInElements(this.negativeEconomicAdjectives, this.filteredText.at(index-1));
        if (negative) {
            return false;
        }
        let positive = this.isWordInElements(this.positiveEconomicAdjectives, this.filteredText.at(index-1));
        if (positive) {
            console.log(`dev: Cluster needs to be generated for ${element}`); //TODO: finish generate cluster handler
            return true;
        }
        return false;
    }

    createCluster(element, x, y) {
        if (element){
            for (let i = 0; i < Math.floor(Math.random() * 9+1); i++) {
                const randomX = Math.random()>0.5?Math.floor(Math.random()) +1:Math.floor(Math.random() * -1) -1;
                const randomY = Math.random()>0.5?Math.floor(Math.random()) +1:Math.floor(Math.random() * -1) -1;
                if (this.getTile(x + randomX, y + randomY)) {
                    console.log(`dev: Cluster element ${element} added at ${x + randomX},${y + randomY}`);
                    this.addElement(element, x + randomX, y + randomY);
                }
            }
        }
    }

    isWordInElements(elements, key) {
        if (key){
            key = key.toLowerCase();
            for (const element of elements) {
                if(element.toLowerCase().
                startsWith(key.slice(0, Math.max(element.length - 1, 1)))){
                    return element;
                }
            }
        }
        return false;
    }

    addElement(element, x, y) {
        let img = element.img;
        if (typeof element.img !== "string") {
            img = element.img[Math.floor(Math.random() * element.img.length)];
        }
        this.landscape[y][x] = new Terrain(
            element.name,
            element.symbol,
            x,
            y,
            element.color,
            img,
            element.width,
            element.height,
            element?.style,
            element?.description,
            element?.isLandable,
            element?.isPassable,
            {planet: this.location.planet, region: this.name}
        );
        if (element.name === "City") {
            const cityName = this.addCity(x, y);
            if (cityName) {
                this.landscape[y][x].name = cityName;
                this.landscape[y][x].description = this.getCity(cityName).getAreasSpecialities()
                this.landscape[y][x].type = "city";
            }
        }
        if (element.name === "Colony") {
            const colony = this.addColony(x, y)
            if (colony) {
                this.landscape[y][x].name = colony.name;
                this.landscape[y][x].type = "colony";
                const spec = colony.getSpeciality();
                this.landscape[y][x].description = `This is a ${spec} colony, ${this.landscape[y][x].description}`;
                if (spec === "Agricultural") {
                    console.log(`dev: Colony ${colony.name} is an agriculture colony`);
                    this.createCluster(terrainElements.farm, x, y);
                }
                if (spec === "Industrial") {
                    console.log(`dev: Colony ${colony.name} is an industrial colony`);
                    this.createCluster(terrainElements.mine, x, y);
                }
                if (spec === "Military") {
                    console.log(`dev: Colony ${colony.name} is an military colony`);
                    this.createCluster(terrainElements.military, x, y);
                }
                if (spec === "Residential"){
                    console.log(`dev: Colony ${colony.name} is an residential colony`);
                    this.createCluster(terrainElements.camp, x, y);
                }
            }
        }
    }

    addElements() {
        const terrainElementKeys = Object.keys(this.terrainElements);
        for (const [key, value] of this.numberOfElements.entries()) {
            let element = this.isWordInElements(terrainElementKeys, key);
            const cluster = this.checkForCluster(element)
            if (cluster) {
                //this.createCluster(element, cluster);
            }
            if (element) {
                let spawnMultiplier = this.getLandmarkSpawnMultiplier(element);
                for (let i = 0; i<(value+Math.floor(Math.random() * spawnMultiplier)); i++) { //10 is default but it is based on adjectives
                    let x = Math.floor(Math.random() * this.width);
                    let y = Math.floor(Math.random() * this.height);
                    this.addElement(this.terrainElements[element], x, y);
                }
            }
        }
    }

    handleLanding(x,y,shipType,size) {
        this.landscape[y][x].handleLanding(size);
    }


    getTile(x,y) {
        if(this.landscape[y] && this.landscape[y][x]) {
            return this.landscape[y][x];
        }
        return false;
    }

    getLandscape() {
        return this.landscape.map(line =>
            `<div class="tiles">
            ${line.map(el => 
                `
                <div 
                class="tile" 
                style="background-color: ${el.color}" 
                onmousedown="function openModal() {
                    this.selectedTile = {name: '${el.name}',description:'${el.description}', x: ${el.x}, y: ${el.y},planet:'${el.location.planet}',region:'${el.location.region}'};
                    document.getElementById('tile-name').innerHTML = '${el.name}';
                    document.getElementById('modal-content').innerHTML = '${el.description}';
                    document.getElementById('tile-y-cords').innerHTML = '${el.y}';
                    document.getElementById('tile-x-cords').innerHTML = '${el.x}';
                    document.getElementById('modal').style.display = 'block';
                    if ('${el.playerPresent}'==='true'&&'${el.playerTransportPresent}'==='true') {
                        document.getElementById('take-off-button').style.display = 'block';
                    }else {
                        document.getElementById('take-off-button').style.display = 'none';
                    }
                    if (('${el.name.startsWith('City')}'==='true' || '${el.name.startsWith('Colony')}'==='true') && '${el.playerPresent}'==='true') {
                        document.getElementById('enter-city-button').style.display = 'block';
                    }else {
                        document.getElementById('enter-city-button').style.display = 'none';
                    }
                }
                openModal()"
                "
                >
                    <img 
                        id="${el.x+'-'+el.y}"
                        style="${el.style}" 
                        src="${el.img}" 
                        width="${el.width}" 
                        height="${el.height}" 
                        alt="${el.symbol}" 
                        class="element" 
                    >
                </div>`).join('')}
         </div>`).join('');
    };

    updateMap = () => {
        console.log('Updating region map');
        landscapeDesc.innerHTML = `Planet: ${this.location.planet} || Region: ${this.name}`;
        nextAreaLeft.style.display = 'none';
        nextAreaRight.style.display = 'none';
        landscapeDesc.style.marginLeft = null;
        landscapeContainer.innerHTML = this.getLandscape();
        landscapeContainer.scrollIntoView();
    }
}



export default Region;
