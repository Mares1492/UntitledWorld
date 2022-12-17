

class Planet {
    static planets = new Map();
    constructor(
        location,
        name= new Date().getTime().toString(),
        type="no data",
        description="no data",
        atmosphere="no data",
        temperature="no data",
        gravity="no data",
        terrain=["no data"],
        water="no data",
        life="no data",
        resources= ["no data"],
        ownedBy=null,
        status="no data",
        system="no data"
    ) {
        this.location = location;
        this.name = name;
        this.type = type;
        this.description = description;
        this.atmosphere = atmosphere;
        this.temperature = temperature;
        this.gravity = gravity;
        this.terrain = terrain;
        this.water = water;
        this.life = life;
        this.resources = resources;
        this.regions = new Map();
        this.ownedBy = ownedBy;
        this.status = status;
        this.system = system;
        this.addPlanet();

    }
    addRegion(region) {
        if (this.regions.has(region.name)) {
            console.log(`Region '${region.name}' already exists`);
            alert(`Region '${region.name}' already exists`);
            return false;
        }
        else {
            this.regions.set(region.name, region);
            console.log(`Region '${region.name}' is added to '${this.name}'`);
            return true;
        }
    }

    getRegion(regionName) {
        return this.regions.get(regionName);
    }

    getAllRegions() {
        return this.regions;
    }

    addPlanet() {
        if (Planet.planets.has(this.name)) {
            console.log(`Planet ${this.name} with such name already exists`);
            this.name = new Date().getTime().toString();
            console.log(`New name for planet is ${this.name}`);
            Planet.planets.set(this.name, this);
        }
        else {
            Planet.planets.set(this.name, this);
        }
    }

    static getPlanet(planetName) {
        if (Planet.planets.has(planetName)) {
            console.log(`Planet ${planetName} is found`);
            return Planet.planets.get(planetName);
        }
        else {
            console.log(`Planet ${planetName} not found`);
            return false;
        }
    }

    addResource(resource) {
        this.resources.push(resource);
    }

    static renamePlanet(oldName, newName) {
        let planet = Planet.planets.get(oldName);
        Planet.planets.delete(oldName);
        planet.name = newName;
        Planet.planets.set(newName, planet);
    }

    static getPlanets() {
        return Planet.planets;
    }

    destroy() {
        this.status = "destroyed";
        this.description = "This planet has been destroyed.";
    }


}

export default Planet;
