import Terrain from "./Terrain.js";
import Planet from "./Planet.js";

class Region {
    constructor(name,text, width, height, terrainElements, positiveAdjectives,negativeAdjectives,positiveEconomicAdjectives,negativeEconomicAdjectives,planetName) {
        this.name = name;
        this.text = this.initialFilter(text);
        console.log(this.text);
        this.positiveAdjectives = positiveAdjectives;
        this.negativeAdjectives = negativeAdjectives;
        this.positiveEconomicAdjectives = positiveEconomicAdjectives;
        this.negativeEconomicAdjectives = negativeEconomicAdjectives;
        this.terrainElements = terrainElements;
        this.width = width;
        this.height = height;
        this.planetName = planetName;
        this.filteredText = this.filterText();
        this.cities = new Map();
        if (text.split('').length > 20) {
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
        const planet = Planet.getPlanet(this.planetName)
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
            return [[this.terrainElements.rocket]];
        }
    }
    addCity(city) {
        if (this.cities.has(city.name)) {
            console.log(`City ${city.name} already exists`);
            return false;
        }
        this.cities.set(city.name, city);
        return true;
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
        console.log(`Getting landmark spawn multiplier for ${key}`);
        const index = this.filteredText.indexOf(key);
        console.log(`Checking for pre ${key} word... It is ${this.filteredText.at(index-1)}`);
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
        console.log(`index of ${element} is ${index}`);
        let cluster = [];
        console.log(`checking for pre ${element} word... It is ${this.filteredText.at(index-1)}`);
        let negative = this.isWordInElements(this.negativeEconomicAdjectives, this.filteredText.at(index-1));
        if (negative) {
            console.log(`negative adjective found`);
            return false;
        }
        let positive = this.isWordInElements(this.positiveEconomicAdjectives, this.filteredText.at(index-1));
        if (positive) {
            console.log(`positive adjective found`);
            return true;
        }
        console.log(`no adjective found`);
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
            {planet:this.planetName,region:this.name}
        );

    }

    addElements() {
        const terrainElementKeys = Object.keys(this.terrainElements);
        console.log(this.filteredText);
        for (const [key, value] of this.numberOfElements.entries()) {
            let element = this.isWordInElements(terrainElementKeys, key);
            const cluster = this.checkForCluster(element)
            if (cluster) {
                //this.createCluster(element, cluster);
            }
            if (element) {
                let spawnMultiplier = this.getLandmarkSpawnMultiplier(element);
                console.log(`spawn multiplier for ${element} is ${spawnMultiplier}`);
                for (let i = 0; i<(value+Math.floor(Math.random() * spawnMultiplier)); i++) { //10 is default but it is based on adjectives
                    let x = Math.floor(Math.random() * this.width);
                    let y = Math.floor(Math.random() * this.height);
                    console.log(`adding element ${element} to ${x} : ${y}`);
                    this.addElement(this.terrainElements[element], x, y);
                }
            }
        }
    }

    handleLanding(x,y,shipType,size) {
        this.landscape[y][x].handleLanding(size);
    }


    getTile(x,y) {
        return this.landscape[y][x];
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
}



export default Region;
