import Region from "./Region.js";
import Planet from "./Planet.js";


class Terrain {
    constructor(name,symbol, x, y, color,img,width,height,style="",description="No data",terrainIsLandable=true,location=null,inCluster=false) {
        this.color = color;
        this.symbol = symbol;
        this.x = x;
        this.y = y;
        this.name = name;
        this.img = img;
        this.width = width;
        this.height = height;
        this.style = style;
        this.description = description;
        this.terrainIsLandable = terrainIsLandable;
        this.location = location;
        this.inCluster = inCluster;
    }
    modifyTerrain(newTerrain) {
        this.symbol = newTerrain?.symbol;
        this.color = newTerrain?.color;
        this.name = newTerrain?.name;
        this.img = newTerrain?.img;
        this.width = newTerrain?.width;
        this.height = newTerrain?.height;
        this.style = newTerrain?.style;
        this.description = newTerrain?.description;
        this.terrainIsLandable = newTerrain?.terrainIsLandable;
    }
    changeDescription(newDescription) {
        this.description = newDescription;
    }
    destroy() {
        this.symbol = ' ';
        this.img = '/img/fire.png';
        this.description = 'This place was destroyed';
    }
    handlePlayerArrival() {
        this.playerPresent = true;
        this.terrImg = this.img;
        this.terrDescription = this.description;
        this.terrSize = this.width;
        if (!this.playerTransportPresent) {
            this.description = "You are here";
            this.img = '/img/character/location.png';
            this.width = 30;
            this.height = 30;
        }
        console.log(`Arrived to ${this.name} at ${this.x},${this.y}`);
    }
    handlePlayerDeparture() {
        this.playerPresent = false;
        this.description = this.terrDescription;
        this.img = this.terrImg;
        this.width = this.terrSize;
        this.height = this.terrSize;
        console.log(`Departed from ${this.name} at ${this.x},${this.y}`);
    }
    handleLanding(shipType,size) {
        console.log(`Trying to land on ${this.name}| Landing is possible: ${this.terrainIsLandable}`);
        if (this.terrainIsLandable){
            this.terrImg = this.img;
            this.terrDescription = this.description;
            this.terrSize = this.width;
            this.width = size;
            this.height = size;
            this.playerTransportPresent = true;
            this.playerPresent = true;
            this.description = `Your ${shipType} is here`;
            this.img = '/img/rocket-on-ground.png';
            console.log(`Landed on ${this.name} at ${this.x},${this.y}`);
            return true;
        }
        return false;
    }
    handleTakeOff() {
            this.img = this.terrImg;
            this.description = this.terrDescription;
            this.width = this.terrSize;
            this.height = this.terrSize;
            this.playerTransportPresent = false;
            this.playerPresent = false;
            console.log(`Took off from ${this.name} at ${this.x},${this.y}`);
            return true;
    }
}

export default Terrain;