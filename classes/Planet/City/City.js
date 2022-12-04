import Region from "../Region.js";
import Planet from "../Planet";



class City {
    constructor(name=new Date().getTime().toString(),description="No data",location={planet:"no data",region:"no data",cords:{}},ownedBy=null) {
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
            this.addArea(new Area());
        }
    }
    addCityToRegion() {
        Planet.getPlanet(this.location.planet).getRegion(this.location.region).addCity(this);
    }
    addArea(area) {
        if (this.areas.has(area.name)) {
            console.log(`Area '${area.name}' already exists`);
            alert(`Area '${area.name}' already exists`);
            return false;
        }
        this.areas.set(area.name, area);
        console.log(`Area '${area.name}' is added to '${this.name}'`);
        return true;
    }
    getArea(areaName) {
        if (this.areas.has(areaName)) {
            return this.areas.get(areaName);
        }
        return false;
    }
}
