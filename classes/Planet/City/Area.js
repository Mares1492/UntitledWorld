import Terrain from "../Terrain.js";
const landscapeContainer = document.getElementById('landscape-container');
const landscapeDesc = document.getElementById('landscape-description');
const nextAreaLeft = document.getElementById('next-area-left');
const nextAreaRight = document.getElementById('next-area-right');

const cityElements = {
    cityBuilding: {
        symbol:'|^|',
        width:"23",
        height:"23",
        color: '#606060',
        img:["./img/city/background.png?","./img/city/background2.png?","./img/city/background3.png?",
            "./img/city/background4.png?","./img/city/background5.png?","./img/city/background6.png?",
            "./img/city/background7.png?"
        ],
        name:"City Building",
        description:"Some kind of city building",isPassable:true},
    bridge: {symbol:'=',color: '#383838',img:"./img/bridge.png?",width:"30",height:"30",name:"Bridge",description:"A bridge"},
    roadY: {symbol:'|',color: '#A0A0A0',img:"./img/city/road1.png?",width:"30",height:"30",name:"Road"},
    roadX: {symbol:'-',color: '#A0A0A0',img:"./img/city/road2.png?",width:"30",height:"30",name:"Road"},
    water: {symbol:'~',color: '#F8F8F8',img:"./img/water.png?",width:"35",height:"35",style:"opacity: 0.5;",name:"Water"},
    Commercial: {symbol:'C',color: '#f2d871',img:["./img/city/big-store.png?","./img/city/small-store.png?"],
        width:"30",height:"30",name:"Commercial Building",isActivity:true,description:"Like a shop or something"},
    Support: {symbol:'S',color: '#B0B0B0',img:["./img/city/city-support.png?","./img/city/police-station.png?"],
        width:"30",height:"30",name:"City Support",description:"A city support building, like a police station or fire station"},
    Social: {symbol:'S',color: '#B0B0B0',img:["./img/city/social.png?","./img/city/hospital.png?","./img/city/clinic.png?"],
        width:"30",height:"30",name:"Social Building",description:"A social building, like a school or hospital"},
    Cosmic: {symbol:'S',color: '#e3c4a8',img:"./img/city/spaceport.png?",isActivity:true,
        width:"30",height:"30",name:"DocDor Corp Branch",description:"They can pay for your space missions"},
    Residential: {symbol:'H',color: '#909090',img:["./img/city/ncp-house.png?","./img/city/ncp-house2.png?","./img/city/ncp-house3.png?"],
        width:"30",height:"30",name:"Important House",description:"A house of some important person in the city"},
    Research: {symbol:'S',color: '#909090',img:["./img/city/special.png?","./img/city/special2.png?","./img/city/special3.png?"],
        width:"35",height:"35",name:"Special Building",description:"A special building, like a museum, library, university or laboratory"},
    Military: {symbol:'KILL',color: '#909090',img:["./img/city/military.png?","./img/city/military2.png?","./img/city/military3.png?",
            "./img/city/warehouse.png?","./img/city/warehouse2.png?","./img/city/warehouse3.png?"],
        width:"30",height:"30",name:"Military Building",description:"A military base, post or warehouse"},
    Industrial: {symbol:'I',color: '#909090',img:["./img/city/industrial.png?","./img/city/power-plant.png?","./img/city/factory.png?","./img/city/factory2.png?",
            "./img/city/geothermal.png?","./img/city/wind-turbines.png?","./img/city/solar-panel.png?","./img/city/chemical-plant.png?"],
        width:"30",height:"30",name:"Industrial Building",description:"An industrial building, like a factory or power plant"},
    Agricultural: {symbol:'A',color: '#909090',img:"./img/city/dome.png?",
        width:"30",height:"30",name:"Agricultural Building",description:"Dome based agricultural building, ideal for growing crops in harsh environments like city jungle"},
};

const areas = ["Industrial", "Residential", "Commercial", "Agricultural", "Research", "Military"];

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
        const building = cityElements[this.speciality];
        if (building) {
        for (let i = 0; i < Math.floor(Math.random()*this.size.x*6 + this.size.x*2); i++) {
            const x = Math.floor(Math.random()*this.size.x);
            const y = Math.floor(Math.random()*this.size.y);
            this.addElement(building, x, y);
            }
        }

    }
    addSupportingBuildings(){
        for (let i = 0; i < Math.floor(Math.random()* this.size.x + 3); i++) {
            const x = Math.floor(Math.random()*this.size.x);
            const y = Math.floor(Math.random()*this.size.y);
            const randomCategory = Math.floor(Math.random()*4 + 1)
            if (randomCategory=== 1) {
                this.addElement(cityElements.Support, x, y);
            }
            else if (randomCategory === 2) {
                this.addElement(cityElements.Social, x, y);
            }
            else if (randomCategory === 3) {
                this.addElement(cityElements.Cosmic, x, y);
            }
            else if (randomCategory === 4) {
                this.addElement(cityElements.Commercial, x, y);
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
    getTile(x,y) {
        return this.landscape[y][x];
    }

    handlePlayerArrival() {
        const randY = Math.floor(Math.random()*this.size.y);
        const randX = Math.floor(Math.random()*this.size.x);
        const arrived = this.getTile(randX,randY).handlePlayerArrival();
        if (arrived){
            console.log(`Player arrived to ${this.name} at ${this.location.colony?this.location.colony:this.location.city}...`);
            return {x:randX,y:randY};
        }
        else {
            console.error("Player tried to arrive to an empty area(WHAT???)");
            return false;
        }
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
                    if ('${el.isActivity}'==='true' && '${el.playerPresent}'==='true') {
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
        if (this.location.colony) {
            landscapeDesc.innerHTML = ` ${this.name} || Spec: ${this.speciality}`;
        }
        if (this.location.city) {
            landscapeDesc.innerHTML = `City: ${this.location.city} || Area: ${this.name} || Spec: ${this.speciality}`;
            nextAreaLeft.style.display = 'block';
            nextAreaRight.style.display = 'block';
            landscapeDesc.style.marginLeft = 'calc(5% + 2em)';
        }
        landscapeContainer.innerHTML = this.getLandscape();
        landscapeContainer.scrollIntoView();
        console.log("Changed map to area");
    }
}




export default Area;
