import Planet from "../Planet.js";
import Area from "./Area.js";
import area from "./Area.js";

class City {
    constructor(name=new Date().getTime().toString(),location,description="No data",ownedBy=null) {
        this.name = name;
        this.description = description;
        this.location = location;
        this.ownedBy = ownedBy;
        this.areas = new Map();
        this.numberOfAreas = Math.floor(Math.random() * 7) + 2;
        this.generate();
        this.factions = new Map(); //TODO: add factions :)
    }

    generate() {
        for (let i = 0; i < this.numberOfAreas; i++) {
            this.addArea(new Area(
                `Area-${i+1}`,
                {planet:this.location.planet,region:this.location.region,city: this.name},
            ));
        }
        console.log(`Detected: ${this.name} ----> ${this.areas.size} ${this.areas.size===1?"area":"areas"} | cords ---> x:${this.location.tile.x} | y:${this.location.tile.y}`);
    }

    getAreasSpecialities() {
        let specialities = [];
        this.areas.forEach(area => {
            if(!specialities.includes(area.speciality)) {
                specialities.push(area.speciality);
            }
        })
        return "Located: " + specialities.join(", ")+ " areas";
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
    getOtherArea(type,currentArea) {
        const areas = Array.from(this.areas.keys());
        if (areas){
            if (type==="next"){
                const nextAreaIndex = areas.indexOf(currentArea)+1;
                if (!areas[nextAreaIndex]){
                    return this.getArea(areas[0]);
                }
                return this.getArea(areas[nextAreaIndex]);
            }
            if (type==="prev"){
                const prevAreaIndex = areas.indexOf(currentArea)-1;
                if (prevAreaIndex<0){
                    return this.getArea(areas[areas.length-1]);
                }
                return this.getArea(areas[prevAreaIndex]);
            }
        }
        return false;
    }

    getRandomArea() {
        const areas = Array.from(this.areas.values());
        return areas[Math.floor(Math.random() * areas.length)];
    }
}

export default City;

