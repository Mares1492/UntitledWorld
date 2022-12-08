import Planet from "../Planet.js";
import Area from "./Area.js";



class City {
    constructor(name=new Date().getTime().toString(),location,description="No data",ownedBy=null) {
        this.name = name;
        this.description = description;
        this.location = location;
        this.ownedBy = ownedBy;
        this.areas = new Map();
        this.generate();
        this.factions = new Map();
    }


    generate() {
        const numberOfAreas = Math.floor(Math.random() * 5) + 1;
        for (let i = 0; i < numberOfAreas; i++) {
            this.addArea(new Area(
                `Area-${i+1}`,
                {planet:this.location.planet,region:this.location.region,city: this.name},
            ));
        }
        console.log(`Detected: ${this.name} ----> ${this.areas.size} ${this.areas.size===1?"area":"areas"} | cords ---> x:${this.location.tile.x} | y:${this.location.tile.y}`);
    }
    addArea(area) {
        if (this.areas.has(area.name)) {
            console.log(`Area '${area.name}' in ${this.name} already exists`);
            throw new Error(`Area '${area.name}' already exists`);
        }
        this.areas.set(area.name, area);
    }
    getArea(areaName) {
        if (this.areas.has(areaName)) {
            return this.areas.get(areaName);
        }
        console.log(`Area '${areaName}' in ${this.name} does not exist`);
        return false;
    }

    getRandomArea() {
        const areas = Array.from(this.areas.values());
        return areas[Math.floor(Math.random() * areas.length)];
    }
}

export default City;

