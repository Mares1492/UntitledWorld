import Transport from "./Transport.js";
import Planet from "../Planet/Planet.js";

class Rocket extends Transport {
    hasLanded = false;
    constructor(name, img,size, owner=null) {
        super(name,null, owner, img, size);
        this.type = "Rocket"
    }

    landAt(planet,region,x,y) {
        if (this.hasLanded) {
            alert("Rocket is already landed");
            return false;
        }
        console.log(`Landing at ${planet}|${region} at ${x},${y}`);
        const landed = Planet.getPlanet(planet).getRegion(region).getTile(x,y).handleLanding(this.type,this.size,this.img);
        if (landed) {
            this.x = x;
            this.y = y;
            this.location = {planet:planet,region:region};
            this.hasLanded = true;
            console.log(`Landed on ${planet} in ${region} region`);
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
            console.log(`Took off from ${this.location.planet} in ${this.location.region} region`);
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
