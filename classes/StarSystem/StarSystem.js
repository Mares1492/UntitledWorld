class StarSystem{
    constructor(location,name=`System-${new Date().getTime().toString(2)}`){
        this.name = name;
        this.location = location;
        this.planets = new Map();
    }
    addPlanet(planet){
        if (this.planets.has(planet.name)){
            throw new Error(`Planet ${planet.name} already exists in ${this.name}`);
        }
        this.planets.set(planet.name, planet);
    }
}
export default StarSystem;
