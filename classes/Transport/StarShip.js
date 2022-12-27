import Transport from "./Transport.js";
import Planet from "../Planet/Planet.js";

class StarShip extends Transport {
    hasLanded = false;
    constructor(name, img,size,type,owner=null) {
        super(name,null, owner, img, size);
        this.type = type;
    }

    landAt(planet,region,x,y) {
        if (this.hasLanded) {
            alert(`${this.name} is already landed`);
            return false;
        }
        console.log(`Landing at ${planet}|${region} at ${x},${y}`);
        const landed = Planet.getPlanet(planet).getRegion(region).getTile(x,y).handleLanding(this.name,this.size,this.img);
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
export default StarShip;
