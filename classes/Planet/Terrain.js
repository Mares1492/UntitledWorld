import Region from "./Region.js";
import Planet from "./Planet.js";


class Terrain {
    constructor(name,symbol, x, y, color,img,width,height,style="",description="No data",isLandable=true,isPassable=true,location=null,) {
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
        this.isLandable = isLandable;
        this.location = location;
        this.isPassable = isPassable;
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
        this.isLandable = newTerrain?.isLandable;
    }
    changeDescription(newDescription) {
        this.description = newDescription;
    }
    destroy() {
        this.symbol = ' ';
        this.img = '/img/fire.png';
        this.description = 'This place was destroyed';
    }
    handlePlayerPassing(counter) {
        if (this.isPassable) {
            console.log(`Passed through ${this.name} at ${this.x},${this.y}`);
            setTimeout(() => {
                const el = document.getElementById(`${this.x + '-' + this.y}`)
                el.style.animation = "playerPassing 600ms";
            }, counter * 200);
            return true;
        }
        console.log(`Can't pass through ${this.name} at ${this.x},${this.y}`);
        return false;
    }
    handlePlayerArrival() {
        if (this.isPassable) {
            this.playerPresent = true;
            if (!this.playerTransportPresent) {
                this.terrImg = this.img;
                this.terrDescription = this.description;
                this.terrSize = this.width;
                this.description = "You are here";
                this.img = './img/character/location.png?';
                this.width = 40;
                this.height = 40;
            }
            console.log(`Arrived to ${this.name} at ${this.x},${this.y}`);
            return true;
        }
        return false;
    }
    handlePlayerDeparture() {
        this.playerPresent = false;
        if (!this.playerTransportPresent) {
        this.description = this.terrDescription;
        this.img = this.terrImg;
        this.width = this.terrSize;
        this.height = this.terrSize;
        }
        console.log(`Departed from ${this.name} at ${this.x},${this.y}`);
    }
    handleLanding(shipType,size,shipImg) {
        console.log(`Trying to land on ${this.name}| Landing is possible: ${this.isLandable}`);
        if (this.isLandable){
            if (this.playerTransportPresent) {
                alert("There is already a ship here");
                return false;
            }
            this.terrImg = this.img;
            this.terrDescription = this.description;
            this.terrSize = this.width;
            this.terrColor = this.color;
            this.color = "rgba(0,0,0,0)";
            this.width = size;
            this.height = size;
            this.playerTransportPresent = true;
            this.playerPresent = true;
            this.description = `Your ${shipType} is here`;
            this.img = shipImg;
            console.log(`Landed on ${this.name} at ${this.x},${this.y}`);
            return true;
        }
        return false;
    }
    handleTakeOff() {
        if (this.playerTransportPresent && this.playerPresent) {
            this.img = this.terrImg;
            this.description = this.terrDescription;
            this.width = this.terrSize;
            this.height = this.terrSize;
            this.color = this.terrColor;
            this.playerTransportPresent = false;
            this.playerPresent = false;
            console.log(`Took off from ${this.name} at ${this.x},${this.y}`);
            return true;
        }
        return false;
    }
}

export default Terrain;
