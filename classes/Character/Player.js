
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
        if (this.inventory.has(item.name)) {
            this.inventory.set(item,this.inventory.get(item.name) + 1);
        } else {
            this.inventory.set(item, 1);
        }
    }
    getItem(item) {
        if (this.inventory.has(item)) {
            this.inventory.set(item,this.inventory.get(item) - 1);
            if (this.inventory.get(item) === 0) {
                this.inventory.delete(item);
            }
        } else {
            console.log("Item does not exist");
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
    getCity() {
        return this.location.city;
    }
    getArea() {
        return this.location.area;
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
        let loopCatcher = 0;
        let timeout = 0;
        let passable = true;
        let path = [];
        let stuck = false;
        let whereToGo;
        const tryPush = (x,y) => {
            if (region.getTile(x, y)?.isPassable) {
                if(!path.length || (path.at(-1).x !== x || path.at(-1).y !== y)) {
                    timeout++
                    path.push({x:x, y:y, timeout:timeout});
                    return true;
                }else {
                    stuck = true;
                    console.log("stuck",stuck);
                }
            }else{
                return false;
            }
        }
        tryPush(xNow,yNow);
        while ((xTo !== xNow || yTo !== yNow) && !stuck && loopCatcher < 1000) {
            loopCatcher++;
            whereToGo = Math.floor(Math.random()*2);
                if(xNow<xTo && yNow<yTo) {
                    if(tryPush(xNow+1,yNow+1)){
                        xNow++;
                        yNow++;
                    }else {
                        if(whereToGo) {
                            if(tryPush(xNow+1,yNow)) {
                                xNow++;
                            }
                        }else {
                            if(tryPush(xNow,yNow+1)) {
                                yNow++;
                            }
                        }
                    }
                }
                else if(xNow>xTo && yNow>yTo){
                    if(tryPush(xNow-1,yNow-1)){
                        xNow--;
                        yNow--;
                    }else {
                        if(whereToGo) {
                            if(tryPush(xNow-1,yNow)) {
                                xNow--;
                            }
                        }else {
                            if(tryPush(xNow,yNow-1)) {
                                yNow--;
                            }
                        }
                    }
                }
                else if (xNow>xTo && yNow<yTo){
                    if(tryPush(xNow-1,yNow+1)){
                        xNow--;
                        yNow++;
                    }else {
                        if(whereToGo) {
                            if(tryPush(xNow-1,yNow)) {
                                xNow--;
                            }
                        }else {
                            if(tryPush(xNow,yNow+1)) {
                                yNow++;
                            }
                        }
                    }
                }
                else if (xNow<xTo && yNow>yTo){
                    if(tryPush(xNow+1,yNow-1)){
                        xNow++;
                        yNow--;
                    }else {
                        if(whereToGo) {
                            if(tryPush(xNow+1,yNow)) {
                                xNow++;
                            }
                        }else {
                            if(tryPush(xNow,yNow-1)) {
                                yNow--;
                            }
                        }
                    }
                }
                else if (xNow<xTo && yNow===yTo){
                    if(tryPush(xNow+1,yNow)){
                        xNow++;
                    }else {
                        if(whereToGo) {
                            if(tryPush(xNow,yNow+1)) {
                                yNow++;
                            }
                        }else {
                            if(tryPush(xNow,yNow-1)) {
                                yNow--;
                            }
                        }
                    }
                }
                else if (xNow>xTo && yNow===yTo){
                    if(tryPush(xNow-1,yNow)){
                        xNow--;
                    }else {
                        if(whereToGo) {
                            if(tryPush(xNow,yNow+1)) {
                                yNow++;
                            }
                        }else {
                            if(tryPush(xNow,yNow-1)) {
                                yNow--;
                            }
                        }
                    }
                }
                else if (yNow<yTo && xNow===xTo){
                    if(tryPush(xNow,yNow+1)){
                        yNow++;
                    }else {
                        if(whereToGo) {
                            if(tryPush(xNow+1,yNow)) {
                                xNow++;
                            }
                        }else {
                            if(tryPush(xNow-1,yNow)) {
                                xNow--;
                            }
                        }
                    }
                }
                else if (yNow>yTo && xNow===xTo){
                    if(tryPush(xNow,yNow-1)){
                        yNow--;
                    }else {
                        if(whereToGo) {
                            if(tryPush(xNow+1,yNow)) {
                                xNow++;
                            }
                        }else {
                            if(tryPush(xNow-1,yNow)) {
                                xNow--;
                            }
                        }
                    }
                }
        }
        for (let i = 0; i < path.length; i++) {
            passable = region.getTile(path[i].x, path[i].y).handlePlayerBypassing(path[i].timeout,this.getItem)
            if (!passable) {
                return {x:path[i].x,y:path[i].y};
            }
        }
        return {x:xNow,y:yNow};
    }
    goToTile(tile,maxTilesToMove=50) {
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
            this.updateMap()
            const location = this.handleMovingToTile(tile,maxTilesToMove);
            if (location.x !== tile.x || location.y !== tile.y) {
                alert(`Cannot find the way, better head back to the ${this.transport.name}`);
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

    handleEnterCity(city) {
      const area = city.getRandomArea();
      this.location = {...this.location, city: city.name};
      this.handleEnterArea(area);
    }
    handleEnterArea(area) {
      console.log('Entering area', area);
      area.handlePlayerArrival();
      this.location = {...this.location, area: area.name};
      this.updateMap();
    }
    handleExitCity() {
      this.location = {...this.location, city: null, area: null};
      this.updateMap();
    }

    updateMap = ()=>{
      if (this.location.area) {
        return this.updateCityAreaMap();
      }else if (this.location.region) {
        return this.updateRegionMap();
      }
      console.log('No map to update');
    }

    updateRegionMap = () => {
        Planet
            .getPlanet(this.getPlanet())
            .getRegion(this.getRegion())
            .updateMap();
    }
    updateCityAreaMap = () =>{
        Planet
            .getPlanet(this.getPlanet())
            .getRegion(this.getRegion()).getCity(this.getCity()).getArea(this.getArea())
            .updateMap();
    }

}

export default Player;
