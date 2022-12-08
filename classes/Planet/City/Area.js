import Terrain from "../Terrain.js";
const landscapeContainer = document.getElementById('landscape-container');


const cityElements = {
    cityBuilding: {
        symbol:'|^|',
        width:"23",
        height:"23",
        color: '#606060',
        img:["./../../../img/city/buildings/background.png?","./../../../img/city/buildings/background2.png?","./../../../img/city/buildings/background3.png?",
            "./../../../img/city/buildings/background4.png?","./../../../img/city/buildings/background5.png?","./../../../img/city/buildings/background6.png?",
            "./../../../img/city/buildings/background7.png?"
        ],
        name:"City Building",
        description:"Some kind of city building",isPassable:false},
    bridge: {symbol:'=',color: '#383838',img:"./../../../img/bridge.png?",width:"30",height:"30",name:"Bridge",isActivity:true,description:"A bridge"},
    roadX: {symbol:'|',color: '#A0A0A0',img:"./../../../img/city/roads/road.png?",width:"30",height:"30",name:"Road"},
    roadY: {symbol:'|',color: '#A0A0A0',img:"./../../../img/city/roads/road.png?",width:"30",height:"30",name:"Road",style: "transform: rotate(90deg);"},
    water: {symbol:'~',color: '#F8F8F8',img:"./../../../img/water.png?",width:"35",height:"35",style:"opacity: 0.5;",name:"Water"},
};

class Area {
    constructor(name=new Date().getTime().toString(),location,description="no data",size={x:24,y:12}) {
        this.name = name;
        this.description = description;
        this.location = location;
        this.factions = [];
        this.size = size;
        this.generateArea();
    }
    generateArea() {
        if (!this.landscape){
            this.landscape = [];
            for (let y = 0; y < this.size.y; y++) {
                this.landscape.push([]);
                for (let x = 0; x < this.size.x; x++) {
                    this.addElement(cityElements.cityBuilding, x, y);
                }
            }
            this.addRoads();
        }
        else {
            console.log("Area already generated");
        }
    }
    addRoads(){
        for (let times=0; times < Math.floor(Math.random() * 3 + 1);times++) {
            const randomY = Math.floor(Math.random() * this.size.y);
            for (let x = 0; x < this.size.x; x++) {
                this.addElement(cityElements.roadY, x, randomY);
            }
        }
        for (let times=0; times < Math.floor(Math.random() * 3 + 1);times++){
            const randomX = Math.floor(Math.random() * this.size.x);
            for (let y = 0; y < this.size.y; y++) {
                this.addElement(cityElements.roadX, randomX, y);
            }
        }

    }

    addElement(element,x,y) {
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
            {planet:this.location.planet,region:this.location.region,city: this.location.city,area:this.name,tile:{x:x,y:y}},
            element?.isActivity
        );
    }

    handlePlayerArrival() {
        console.log(`Player arrived to ${this.name} at ${this.location.city}...`);
        return true;
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
                    if (${el.isActivity}) {
                        document.getElementById('activity-button').style.display = 'block';
                    }
                    else {
                        document.getElementById('activity-button').style.display = 'none';
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
        landscapeContainer.innerHTML = this.getLandscape();
        landscapeContainer.scrollIntoView();
        console.log("Changed map to area");
    }
}

export default Area;
