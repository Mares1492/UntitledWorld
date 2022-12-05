
import Character from "./Character.js";
import Planet from "../Planet/Planet.js";
import planet from "../Planet/Planet.js";
import region from "../Planet/Region.js";
class Player extends Character{
  constructor(
      name,
      params={health:20, defense:0, attack:0, speed:1},
      stats={},
      location=null,
      transport=null,
      status="alive",
      level=1,
      experience=0,
      gold=0,
      equipped=new Map(),
      abilities=new Map(),
      inventory=new Map()
  ) {
  super(name, params, level, status, location,stats);
    this.experience = experience;
    this.gold = gold;
    this.inventory = inventory;
    this.equipped = equipped;
    this.abilities = abilities;
    this.transport = transport;
    this.isAbleToAct = true;
  }

    setIsUnableToAct(time) {
        this.isAbleToAct = false;
        setTimeout(() => {
            this.isAbleToAct = true;
        }, time);
    }
    getIsPlayerAbleToAct(action) {
      if (this.isAbleToAct) {
        return true;
      }
        alert(`You are not able to ${action} at the moment`);
        return false;

    }

    addAbility(ability) {
        if (this.abilities.has(ability.name)) {
            console.log("Ability already exists");
        } else {
            this.abilities.set(ability.name, ability);
        }
    }

    upgradeAbility(abilityName) {
        if (this.abilities.has(abilityName)) {
            this.abilities
                .set(abilityName,{...this.abilities
                        .get(abilityName), level:this.abilities
                        .get(abilityName).level + 1});
        } else {
            console.log("Ability does not exist");
        }
    }
    levelUp() {
        this.experience -= this.level * 100;
        this.level++;
        this.params.health += 10;
        this.params.attack += 1;
        this.params.defense += 1;
        this.params.speed += 1;
    }
    addExperience(exp) {
        this.experience += exp;
        if (this.experience >= this.level * 100) {
            this.levelUp();
        }
    }
    equipItem(item) {
        if (this.inventory.has(item)) {
            this.inventory.get(item)
                .type === "weapon"
                ? this.equipped.set("weapon", item)
                : this.equipped.set("armor", item);
            }
            this.inventory.delete(item);
        }
    addItem(item) {
        if (this.inventory.has(item)) {
            this.inventory.set(item,this.inventory.get(item) + 1);
        } else {
            this.inventory.set(item, 1);
        }
    }
    removeItem(item) {
        if (this.inventory.has(item)) {
            this.inventory.set(item,this.inventory.get(item) - 1);
            if (this.inventory.get(item) <= 0) {
                this.inventory.delete(item);
            }
        }
    }
    setTransport(transport) {
        this.transport = transport;
    }
    getTransport() {
        return this.transport;
    }
    getPlanet() {
        return this.location.planet;
    }
    getRegion() {
        return this.location.region;
    }
    getTile() {
        return this.location.tile;
    }
    getInventory() {
        return this.inventory;
    }
    goToPlanet(planet) {
        this.location = {...this.location, planet:planet};
    }
    goToRegion(region) {
        this.location = {...this.location, region:region};
    }

    handleMovingToTile(tile,maxTilesToMove) {
        const xTo = tile.x;
        const yTo = tile.y;
        let xNow = this.getTile().x;
        let yNow = this.getTile().y;
        const region = Planet.getPlanet(this.getPlanet()).getRegion(this.getRegion());
        let timeout = 0;
        let loopCatcher = 0;
        let passable = true;
        let currentTile = region.getTile(xNow,yNow);
        while ((xTo !== xNow || yTo !== yNow) && loopCatcher < maxTilesToMove) {
            //TODO: get rid of this code duplication(separate method for this may be too complicated to even be worth it)
            loopCatcher++;
                if (xNow < xTo) {
                    xNow++;
                    timeout++;
                    passable = region.getTile(xNow, yNow).handlePlayerPassing(timeout);
                    if (!passable) {
                        xNow--;
                        timeout--;
                        if (yNow === yTo) {
                            for (let i = 0; i < Math.floor(Math.random() * 4)+1; i++) {
                                Math.floor(Math.random() * 2) === 0 ? yNow++ : yNow--;
                                timeout++;
                                passable = region.getTile(xNow, yNow).handlePlayerPassing(timeout);
                            }
                        }
                    }
                }
                if (xNow > xTo) {
                    xNow--;
                    timeout++;
                    passable = region.getTile(xNow, yNow).handlePlayerPassing(timeout);
                    if (!passable) {
                        xNow++;
                        timeout--;
                        if (yNow === yTo) {
                            for (let i = 0; i < Math.floor(Math.random() * 4)+1; i++) {
                                Math.floor(Math.random() * 2) === 0 ? yNow++ : yNow--;
                                timeout++;
                                passable = region.getTile(xNow, yNow).handlePlayerPassing(timeout);
                            }
                        }
                    }
                }
                if (yNow < yTo) {
                    yNow++;
                    timeout++;
                    passable = region.getTile(xNow, yNow).handlePlayerPassing(timeout);
                    if (!passable) {
                        yNow--;
                        timeout--;
                        if (xNow === xTo) {
                            for (let i = 0; i < Math.floor(Math.random() * 4)+1; i++) {
                                Math.floor(Math.random() * 2) === 0 ? xNow++ : xNow--;
                                timeout++;
                                passable = region.getTile(xNow, yNow).handlePlayerPassing(timeout);
                            }
                        }

                    }
                }
                if (yNow > yTo) {
                    yNow--;
                    timeout++;
                    passable = region.getTile(xNow, yNow).handlePlayerPassing(timeout);
                    if (!passable) {
                        yNow++;
                        timeout--;
                        if (xNow === xTo) {
                            for (let i = 0; i < Math.floor(Math.random() * 4)+1; i++) {
                                Math.floor(Math.random() * 2) === 0 ? xNow++ : xNow--;
                                timeout++;
                                passable = region.getTile(xNow, yNow).handlePlayerPassing(timeout);
                            }
                        }
                    }
                }
            }
            return {x:xNow,y:yNow};
        }
    goToTile(tile,updateMap,maxTilesToMove=50) {
        const handleArrival = (argX,argY) => {
            const arrived = region
                .getTile(argX, argY)
                .handlePlayerArrival();
            if (arrived) {
                this.location = {...this.location, tile: {x:argX, y:argY}};
                return true;
            }
            return false;
        }
        const region = Planet
            .getPlanet(this.location.planet)
            .getRegion(this.location.region)
        if (this.location.tile){
            region
                .getTile(this.location.tile.x,this.location.tile.y)
                .handlePlayerDeparture()
            updateMap();
            const location = this.handleMovingToTile(tile,maxTilesToMove);
            if (location.x !== tile.x || location.y !== tile.y) {
                return handleArrival(location.x,location.y);
            }
        }
        return handleArrival(tile.x,tile.y);
    }

    handleLeavePlanetSurface() {
        this.location = {...this.location, tile:null};
    }
    goToLocation(location) {
        this.location = location;
    }

}

export default Player;
