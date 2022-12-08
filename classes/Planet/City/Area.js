import Terrain from "../Terrain.js";
const landscapeContainer = document.getElementById('landscape-container');
const landscapeDesc = document.getElementById('landscape-description');

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
        description:"Some kind of city building",isPassable:true},
    bridge: {symbol:'=',color: '#383838',img:"./../../../img/bridge.png?",width:"30",height:"30",name:"Bridge",isActivity:true,description:"A bridge"},
    roadY: {symbol:'|',color: '#A0A0A0',img:"./../../../img/city/roads/road1.png?",width:"30",height:"30",name:"Road"},
    roadX: {symbol:'-',color: '#A0A0A0',img:"./../../../img/city/roads/road2.png?",width:"30",height:"30",name:"Road"},
    water: {symbol:'~',color: '#F8F8F8',img:"./../../../img/water.png?",width:"35",height:"35",style:"opacity: 0.5;",name:"Water"},
    Commercial: {symbol:'C',color: '#e3c4a8',img:["./../../../img/city/buildings/big-store.png?","./../../../img/city/buildings/small-store.png?"],
        width:"30",height:"30",name:"Commercial Building",isActivity:true,description:"Like a shop or something"},
    Support: {symbol:'S',color: '#909090',img:"./../../../img/city/buildings/city-support.png?",
        width:"30",height:"30",name:"City Support",description:"A city support building, like a police station or fire station"},
    Social: {symbol:'S',color: '#909090',img:"./../../../img/city/buildings/social.png?",
        width:"30",height:"30",name:"Social Building",description:"A social building, like a school or hospital"},
    Cosmic: {symbol:'S',color: '#e3c4a8',img:"./../../../img/city/buildings/spaceport.png?",
        width:"30",height:"30",name:"DocDor Corp Branch",description:"They can pay for your space missions"},
    Residential: {symbol:'H',color: '#909090',img:["./../../../img/city/buildings/ncp-house.png?","./../../../img/city/buildings/ncp-house2.png?","./../../../img/city/buildings/ncp-house3.png?"],
        width:"30",height:"30",name:"Important House",description:"A house of some important person in the city"},
    Research: {symbol:'S',color: '#e3c4a8',img:["./../../../img/city/buildings/special.png?","./../../../img/city/buildings/special2.png?","./../../../img/city/buildings/special3.png?"],
        width:"35",height:"35",name:"Special Building",description:"A special building, like a museum, library, university or laboratory"},
    Military: {symbol:'KILL',color: '#909090',img:["./../../../img/city/buildings/military.png?","./../../../img/city/buildings/military.png?","./../../../img/city/buildings/military.png?"],
        width:"30",height:"30",name:"Military Building",description:"A military building, like a post, military base or station"},

};

const areas = ["Industrial", "Residential", "Commercial", "Agricultural", "Research", "Cosmic", "Military", "Social", "Support"];

class Area {
    constructor(name=new Date().getTime().toString(),location,description="no data",size={x:parent.innerWidth/120,y: parent.innerHeight/70}) {
        this.name = name;
        this.description = description;
        this.speciality = areas[Math.floor(Math.random()*areas.length)];
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
            this.addSpecializedBuildings();
            this.addSupportingBuildings();
            this.addRoads();
        }
        else {
            console.log("Area already generated");
        }
    }
    addSpecializedBuildings(){
        for (let i = 0; i < Math.floor(Math.random()*this.size.x*2 + 5); i++) {
            const x = Math.floor(Math.random()*this.size.x);
            const y = Math.floor(Math.random()*this.size.y);
            const building = cityElements[this.speciality];
            if (building) {
                this.addElement(building, x, y);
            }
        }

    }
    addSupportingBuildings(){
        for (let i = 0; i < Math.floor(Math.random()* 5 + 1); i++) {
            const x = Math.floor(Math.random()*this.size.x);
            const y = Math.floor(Math.random()*this.size.y);
            const building = Math.random()>0.5?cityElements.Support:cityElements.Social;
            if (building){
                this.addElement(building,x,y);
            }
        }
    }
    addRoads(){
        for (let times=0; times < Math.floor(Math.random() * 3 + 1);times++) {
            const randomY = Math.floor(Math.random() * this.size.y);
            for (let x = 0; x < this.size.x; x++) {
                this.addElement(cityElements.roadX, x, randomY);
            }
        }
        for (let times=0; times < Math.floor(Math.random() * 3 + 1);times++){
            const randomX = Math.floor(Math.random() * this.size.x);
            for (let y = 0; y < this.size.y; y++) {
                this.addElement(cityElements.roadY, randomX, y);
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
        landscapeDesc.innerHTML = `${this.location.city} || ${this.name} || ${this.speciality}`;
        landscapeContainer.innerHTML = this.getLandscape();
        landscapeContainer.scrollIntoView();
        console.log("Changed map to area");
    }
}

export default Area;
