import Terrain from "./Terrain.js";

class Region {
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
        this.landscape[y][x] = this.terrainElements[element];

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




    getLandscape(openModal) {
        this._openModal = openModal;
        return this.landscape.map(el =>
            `<div class="tiles">
            ${el.map(el => `
                <div 
                class="tile" 
                style="background-color: ${el.color}" 
                id="${el.x+''+el.y}"
                onclick="_openModal('${el.description}','${el.name}')"
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
    };
}

export default Region;