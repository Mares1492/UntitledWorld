const submit = document.getElementById('generate');
const landscapeContainer = document.getElementById('landscape-container');
const close = document.getElementById("closeBtn");
const modal = document.getElementById('modal');
const tileName = document.getElementById('tile-name');
const modalContent = document.getElementById('modal-content');

class Landscape {
    constructor(text, width, height, terrainElements, positiveAdjectives,negativeAdjectives,positiveEconomicAdjectives,negativeEconomicAdjectives) {
        this.text = text;
        this.positiveAdjectives = positiveAdjectives;
        this.negativeAdjectives = negativeAdjectives;
        this.positiveEconomicAdjectives = positiveEconomicAdjectives;
        this.negativeEconomicAdjectives = negativeEconomicAdjectives;
        this.terrainElements = terrainElements;
        this.width = width;
        this.height = height;
        this.filteredText = this.filterText();
        this.basicTerrain = text
            .split('.')[0]
            .split(' ')
            .map(word => this.isWordInElements(Object.keys(this.terrainElements), word)).filter(word=>word); //uses the first sentence to determine the basic terrain
        console.log(`This lands basic terrain contains ${this.basicTerrain}`);
        this.landscape = this.generate();
        this.numberOfElements = this.getNumberOfElements(text);
        if (this.basicTerrain.length) {
            this.addElements();
        }
    }
    generate() {
        if (this.basicTerrain.length) {
            let landscape = [];
            let randomTerr = 0;
            for (let y=0; y < this.height; y++) {
                landscape.push([]);
                for (let x=0; x < this.width; x++) {
                    randomTerr = Math.floor(Math.random() * this.basicTerrain.length);
                    const pickedTerrain = this.terrainElements[this.basicTerrain[randomTerr]];
                    landscape[y][x] = new Terrain(
                        pickedTerrain.name,
                        pickedTerrain.symbol,
                        x,
                        y,
                        pickedTerrain.color,
                        pickedTerrain.img,
                        pickedTerrain.width,
                        pickedTerrain.height,
                        pickedTerrain?.style
                    );
                    //landscape[y][x] = this.terrainElements[this.basicTerrain[randomTerr]];
                }
            }
            return landscape;
        } else {
            return [[this.terrainElements.rocket]];
        }
    }
    getNumberOfElements(text) {
        let numberOfElements = new Map();
        console.log(text);
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
        console.log(`text by words: #${this.filteredText}#`);
        let index = this.filteredText.indexOf(key);
        console.log(`index of ${key} is ${index}`);
        let positive = this.isWordInElements(this.positiveAdjectives, this.text.at(index-1));
        if (positive) {
            return 20;
        }
        let negative = this.isWordInElements(this.negativeAdjectives, this.text.at(index-1));
        if (negative) {
            return 5;
        }
        return 10;
    }

    filterText() {
        let toFilter = ["of","and","so","the","are","a","an"];
        return this.text.split(' ').filter(word => !toFilter.includes(word)).join(' ');
    }


    checkForCluster(element, x, y) {
        let index = this.text.indexOf(element);
        let cluster = [];
        let negative = this.isWordInElements(this.negativeEconomicAdjectives, this.text.at(index-1));
        if (negative) {
            return false;
        }
        let positive = this.isWordInElements(this.positiveEconomicAdjectives, this.text.at(index-1));
        if (positive) {
            if (y !== 0) {
                cluster.push({y:y - 1,x:x});
            }
            //check down
            if (y !== this.height - 1) {
                cluster.push({y:y + 1,x:x});
            }
            //check left
            if (x !== 0) {
                cluster.push({y:y,x:x-1});
            }
            //check right
            if (x !== this.width - 1) {
                cluster.push({y:y,x:x+1});
            }
            if (!cluster.length) {
                return false;
            }
            return cluster;
        }
        return false;
    }

    createCluster(element, cluster) {
        for (let i=0; i < cluster.length; i++) {
            this.addElement(element, cluster[i].x, cluster[i].y);
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
        this.landscape[y][x] = terrainElements[element];

    }

    addElements() {
        const terrainElementKeys = Object.keys(this.terrainElements);
        for (const [key, value] of this.numberOfElements.entries()) {
            let element = this.isWordInElements(terrainElementKeys, key);
            if (element) {
                let spawnMultiplier = this.getLandmarkSpawnMultiplier(element);
                console.log(`spawn multiplier for ${element} is ${spawnMultiplier}`);
                for (let i = 0; i<(value+Math.floor(Math.random() * spawnMultiplier)); i++) { //10 is default but it will be based on adjectives
                    let x = Math.floor(Math.random() * this.width);
                    let y = Math.floor(Math.random() * this.height);
                    //console.log(`adding element ${element} to ${x} : ${y}`);
                    const cluster = this.checkForCluster(element, x, y)
                    console.log(`cluster exists: ${cluster}`);
                    if (cluster) {
                        this.createCluster(element, cluster);
                    }else {
                        this.addElement(element, x, y);
                    }
                }
            }
        }
    }


    printLandscape() {
        return this.landscape;
    }
}

class Terrain {
    constructor(name,symbol, x, y, color,img,width,height,style="",description="No data") {
        this.color = color;
        this.symbol = symbol;
        this.x = x;
        this.y = y;
        this.name = name;
        this.img = img;
        this.width = width;
        this.height = height;
        this.style = style;
        this.cluster = false;
        this.description = description;
    }
    addToCluster(clusterNr) {
        this.cluster = true;
        this.clusterNr = clusterNr;
    }
    destroy() {
        this.symbol = ' ';
        this.img = '/img/fire.png';
        this.description = 'This place was destroyed';
    }
    landAt() {
        this.terrImg = this.img;
        this.terrDescription = this.description;
        this.img = '/img/rocket.png';
        this.description = 'This is your rocket';
    }
    landOff() {
        this.img = this.terrImg;
        this.description = this.terrDescription;
    }
}

class Rocket {
    constructor(name, x, y,img,width,height) {
        this.name = name;
        this.x = x;
        this.y = y;
        this.img = img;
        this.width = width;
        this.height = height;
    }

}

const terrainElements = {
    rocket:{symbol:'R', color:'rgba(0,0,0,0)', img:'img/rocket.png', width:50, height:50,style:"box-shadow:inset 0 -1em 1em #f8bc04;",name:'rocket'},
    water: {symbol:'~',color: '#F8F8F8',img:"img/water.png",width:"35",height:"35",style:"opacity: 0.5;",name:"Water"},
    ocean: {symbol:'~',color: '#F8F8F8',img:"img/water.png",width:"35",height:"35",style:"opacity: 0.5;",name:"Ocean"},
    sand: {symbol:'.', color: '#909090',img:"img/sand.png",width:"8",height:"8",style:"opacity: 0.7;background-repeat: repeat;",name:"sand"},
    rock: {symbol:':', color: '#909090',img:"img/rock.png",width:"20",height:"20",style:"opacity: 0.7;background-repeat: repeat;",name:"rock"},
    desert: {symbol:'*', color: '#909090',img:"img/sand.png",width:"20",height:"20",style:"opacity: 0.7;background-repeat: repeat;",name:"desert"},
    green: {symbol:',', color: '#909090',img:"img/grass.png",width:"10",height:"10",style:"opacity: 0.7;background-repeat: repeat;",name:"Grass"},
    grass: {symbol:',', color: '#B0B0B0',img:"img/grass.png",width:"20",height:"20",style:"opacity: 0.7;background-repeat: space;",name:"Grass"},
    trees: {symbol:'↑', color: '#585858',img:"img/tree.png",width:"20",height:"20",style:"opacity: 0.7;background-repeat: space;",name:"Trees"},
    town: {symbol:'|_|_|', color: '#909090',img:"img/town.png",width:"15",height:"15",style:"background-repeat: no-repeat;",name:"Town"},
    palace: {symbol:'|^|^|^|', color: '#909090',img:"img/palace.png",width:"15",height:"15",name:"palace"},
    forest: {symbol:'↑↑↑', color: '#585858',img:"img/forest.png",width:"30",height:"30",name:"forest"},
    river: {symbol:'≈',color: '#F8F8F8',img:"img/river.png",width:"35",height:"35",style:"opacity: 0.5;background-repeat: space;",name:"River"},
    mountain: {symbol:'/\\\\',color: '#606060',img:"img/mountain.png", width:"40",height:"40",name:"Mountain"},
    road: {symbol:'─',color: '#A0A0A0',img:"img/road.png",width:"30",height:"30",name:"road"},
    house: {symbol:'|^|',color: '#606060',img:"img/house.png",width:"23",height:"23",name:"house"},
    castle: {symbol:'|_|',color: '#909090',img:"img/castle.png",width:"30",height:"30",name:"castle"},
    city: {symbol:'|_|_|_|',color: '#909090',img:"img/city.png",width:"30",height:"30",name:"city"},
    camp: {symbol:'(^)',color: '#606060',img:"img/camp.png",width:"25",height:"25",name:"camp"},
    bridge: {symbol:'=',color: '#383838',img:"img/bridge.png",width:"30",height:"30",name:"Bridge"},
    cave: {symbol:'()',color: '#606060',img:"img/cave.png",width:"20",height:"20",name:"Cave"},
    mine: {symbol:'()',color: '#606060',img:"img/mine.png",width:"20",height:"20",name:"mine"},
    farm: {symbol:'[=^=]',color: '#909090',img:"img/farm.png",width:"20",height:"20",name:"farm"},
    village: {symbol:'|_|_|_|_|',color: '#909090',img:"img/village.png",width:"30",height:"30",name:"village"},
    sky: {symbol:'\n',color: '#E8E8E8',img:"img/sky.png",width:"30",height:"30",name:"sky"},
    colony: {symbol:'|-|(|)|_|',color: '#606060',img:"img/colony.png",width:"30",height:"30",name:"colony"},
    lumbermill: {symbol:'↑__|_|_↑',color: '#606060',img:"img/lumbermill.png",width:"20",height:"20",name:"lumbermill"},
    battle: {symbol:'X',color: '#606060',img:"img/battle.png",width:"20",height:"20",name:"battle"},
    ruin: {symbol:'/||\\',color: '#606060',img:"img/ruin.png",width:"20",height:"20",name:"ruin"},
    fire: {symbol:'F',color: '#606060',img:"img/fire.png",width:"20",height:"20",name:"fire"},
    volcano:{symbol:'V',color: '#606060',img:"img/volcano.png",width:"30",height:"30",name:"volcano"},
}

const positiveAdjectives = ["big","good","lot"];
const negativeAdjectives = ["bad","small","little","few"]
const positiveEconomicAdjectives = ["rich","wealthy","poverty","wealth"];
const negativeEconomicAdjectives = ["poor","poverty","unwealthy","unwealth"];

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

const openModal=(desc,name)=> {
    modalContent.innerHTML = desc;
    tileName.innerHTML = name;

    modal.style.display = 'block'
};

const closeModal=()=> modal.style.display = 'none';

// Close modal

const generatePic = () =>{
    const text = getStory("Text");
    const landscape = new Landscape(text, parent.innerWidth/50, parent.innerHeight/45, terrainElements,positiveAdjectives,negativeAdjectives,positiveEconomicAdjectives,negativeEconomicAdjectives);
    landscapeContainer.innerHTML = landscape.printLandscape().map(el =>
        `<div class="tiles">
            ${el.map(el => `
                <div 
                class="tile" 
                style="background-color: ${el.color}" 
                id="${el.x+''+el.y}"
                onclick="openModal('${el.description}','${el.name}')"
                 >
                    <img 
                        style="${el.style}" 
                        src="${el.img}" 
                        width="${el.width}" 
                        height="${el.height}" 
                        alt="${el.symbol}" 
                        class="element" 
                    >
                </div>`).join('')}
         </div>`).join('');
    landscapeContainer.scrollIntoView();
}


close.addEventListener('click', closeModal);
submit.addEventListener('click', generatePic);







