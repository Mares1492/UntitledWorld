import Vehicle from "./Vehicle.js";
import Planet from "../Planet/Planet.js";

class Rocket extends Vehicle {
    hasLanded = false;
    constructor(name, x, y,img,size,owner=null) {
        super(name, 10, [owner], null, null, owner, x, y,img,size,size);
        console.log("Rocket is ready");
        this.type = "Rocket"
    }
    landAt(planet,region,x,y) {
        if (this.hasLanded) {
            alert("Rocket is already landed");
            return false;
        }
        console.log(`Landing at ${planet}|${region} at ${x},${y}`);
        const landed = Planet.getPlanet(planet).getRegion(region).getTile(x,y).handleLanding(this.type,this.size);
        if (landed) {
            this.x = x;
            this.y = y;
            this.location = {planet:planet,region:region};
            this.hasLanded = true;
            console.log(`Landed on ${planet} in ${region} region at cords:${this.x},${this.x}`);
            return true;
        }
        return false;

    }
    takeOff() {
        const tookOff = Planet.
            getPlanet(this.location.planet).
            getRegion(this.location.region).
            getTile(this.x,this.y).handleTakeOff();
        if (tookOff) {
            console.log(`Took off from ${this.location.planet} in ${this.location.region} region at cords:${this.x},${this.x}`);
            this.x = null;
            this.y = null;
            this.location = null;
            this.hasLanded = false;
            return true;
        }
        return false;
    }

}
export default Rocket;