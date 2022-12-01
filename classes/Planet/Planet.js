class Planet {
    static planets = [];
    constructor(
        name="no data",
        type="no data",
        description="no data",
        atmosphere="no data",
        temperature="no data",
        gravity="no data",
        terrain="no data",
        water="no data",
        life="no data",
        resources="no data",
        ownedBy=null,
        status="normal",
        system="no data"
    ) {
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
        this.regions.set(region.name, region);
    }

    getRegion(regionName) {
        return this.regions.get(regionName);
    }

    getAllRegions() {
        return this.regions;
    }

    addPlanet() {
        Planet.planets.push(this);
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