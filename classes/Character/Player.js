import Character from "./Character.js";
import Planet from "./../Planet/Planet.js";
import Journal from "./../Journal/Journal.js";
import GameEvent from "../Events/GameEvent.js";
import {showPassage} from "../Text/PassageLogic.js";
const charName = document.getElementById("character-name")
const charParams = document.getElementById("character-params")
const charStats = document.getElementById("character-stats")
const charCredit = document.getElementById("credit")
class Player extends Character{
  constructor(
      name,
      appearance,
      params={health:20, defense:0, attack:0, speed:1},
      stats={strength:3,dexterity:3,intellect:3,agility:3,charisma:3},
      location={},
      backstory="nobody",
      transport=null,
      status="alive",
      level=1,
      experience=0,
      credit=100,
      equipped=new Map(),
      abilities=new Map(),
      inventory=new Map(),
  ) {
  super(name, params, level, status, location,stats);
        this.experience = experience;
        this.inventory = inventory;
        this.credit = credit;
        charCredit.innerHTML = this.credit;
        this.equipped = equipped;
        this.abilities = abilities;
        this.transport = transport;
        this.isAbleToAct = true;
        charName.innerHTML = this.name;
        this.updateParams();
        this.updateStats();
        this.journal = new Journal(this.name)
        this.tilesPassed = 0;
  }

    updateName(name){
      this.name = name;
      charName.innerHTML = this.name;
    }

    updateStats(){
        charStats.innerHTML =
            `
                <div class="character-stat" id="str">STR: ${this.stats.strength}</div>
                <div class="character-stat" id="dex">DEX: ${this.stats.dexterity}</div>
                <div class="character-stat" id="int">INT: ${this.stats.intellect}</div>
                <div class="character-stat" id="agi">AGI: ${this.stats.agility}</div>
                <div class="character-stat" id="cha">CHA: ${this.stats.charisma}</div>
            `
    }
    updateParams(){
        charParams.innerHTML =
            `
                <div class="character-stat" id="hp">HP: ${this.params.health}</div>
                <div class="character-stat" id="def">DEF: ${this.params.defense}</div>
                <div class="character-stat" id="atk">ATK: ${this.params.attack}</div>
                <div class="character-stat" id="spd">SPD: ${this.params.speed}</div>
            `
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
        alert(`You are unable to ${action} at the moment`);
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
        this.updateStats();
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
    addItem(name) {
        if (this.inventory.has(name)) {
            this.inventory.set(name,this.inventory.get(name) + 1);
            this.updateInventoryDisplay();
        } else {
            this.inventory.set(name, 1);
        }
    }
    addCredit(credit) {
        this.credit += credit;
        charCredit.innerHTML = this.credit;
    }
    removeCredit(amount,event) {
        amount = parseInt(amount)
        switch (event){
            case 'shop':
                if (this.credit - amount>=0) {
                    this.credit -= amount;
                    charCredit.innerHTML = this.credit;
                    return true;
                } else {
                    alert("Not enough credits");
                    return false;
                }
            case 'remove':
                if(this.credit - amount>=0){
                    this.credit -= amount;
                    charCredit.innerHTML = this.credit;
                    return true;
                } else {
                    this.credit = 0;
                    charCredit.innerHTML = this.credit;
                    return true
                }
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
        transport.setOwner(this.name);
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
    getColony() {
        return this.location.colony;
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

    handleMovingToTile(tile,maxTilesToMove,location) {
        const xTo = tile.x;
        const yTo = tile.y;
        let xNow = this.getTile().x;
        let yNow = this.getTile().y;
        let loopCatcher = 0;
        let timeout = 0;
        let passable = true;
        let path = [];
        let stuck = false;
        let whereToGo;
        const tryPush = (x,y) => {
            if (location.getTile(x, y)?.isPassable) {
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
            passable = location.getTile(path[i].x, path[i].y).handlePlayerBypassing(path[i].timeout,this.getItem)
            if (!passable) {
                return {x:path[i].x,y:path[i].y};
            }
            this.tilesPassed++;
            if(this.tilesPassed===3){
                //GameEvent.getEvent(10).trigger() TODO: add event handling through GameEvent class
                showPassage(10);
                return {x:path[i].x,y:path[i].y};
            }
        }
        return {x:xNow,y:yNow};
    }
    goToTile(tile,maxTilesToMove=50) {
      const location = this.location.area
          ?this.location.city?
              Planet
                  .getPlanet(this.getPlanet())
                  .getRegion(this.getRegion())
                  .getCity(this.getCity())
                  .getArea(this.getArea())
              :
              Planet
                  .getPlanet(this.getPlanet())
                  .getRegion(this.getRegion())
                  .getColony(this.getColony())
                  .getArea()
          :Planet
              .getPlanet(this.getPlanet())
              .getRegion(this.getRegion())
        const handleArrival = (argX,argY) => {
            const arrived = location
                .getTile(argX, argY)
                .handlePlayerArrival();
            if (arrived) {
                this.location = {...this.location, tile: {x:argX, y:argY}};
                return true;
            }
            return false;
        }
        const currTile = this.getTile()
        if (currTile){
            location
                .getTile(currTile.x,currTile.y)
                .handlePlayerDeparture()
            this.updateMap()
            const newLocation = this.handleMovingToTile(tile,maxTilesToMove,location)
            if (newLocation.x !== tile.x || newLocation.y !== tile.y) {
                if (this.transport?.name){
                    alert(`Cannot find the way, better head back to the ${this.transport.name}`);
                }
                return handleArrival(newLocation.x,newLocation.y);
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

    handleEnterCity(settlement,type) {
      this.tileBackup = this.location.tile;
      if (type=== 'city') {
        this.location = {...this.location, city: settlement.name};
        this.handleEnterArea(settlement.getRandomArea());
      }if (type === 'colony'){
        this.location = {...this.location, colony: settlement.name};
        this.handleEnterArea(settlement.getArea());
      }
    }
    handleGoToOtherArea(type) {
      const nextArea = Planet
          .getPlanet(this.getPlanet())
          .getRegion(this.getRegion())
          .getCity(this.getCity())
          .getOtherArea(type,this.getArea());
      if (nextArea) {
          this.handleExitArea();
          this.handleEnterArea(nextArea);
          return true;
      }
        return false;
    }
    handleEnterArea(area) {
      console.log('Entering area', area);
      const cords = area.handlePlayerArrival();
      if (cords) {
          this.location = {...this.location, area: area.name, tile: cords};
          this.updateMap();
          return true;
      }
      else {
          alert('Cannot enter any area');
      }
      return false;
    }
    handleExitArea(){
        const location = this.location.city
            ?Planet
                .getPlanet(this.getPlanet())
                .getRegion(this.getRegion())
                .getCity(this.getCity())
                .getArea(this.getArea())
            :Planet
                .getPlanet(this.getPlanet())
                .getRegion(this.getRegion())
                .getColony(this.getColony())
                .getArea()
        if (location) {
            const tile = this.getTile()
            location.getTile(tile.x,tile.y).handlePlayerDeparture();
            return true;
        }
        return false;
    }
    handleExitCity() {
      const exited = this.handleExitArea();
      if (exited) {
          this.location = {...this.location, city: null, colony:null, area: null, tile: this.tileBackup};
          return true;
      }
       return false;
    }

    updateMap = ()=>{
      if (this.location.city) {
        return this.updateCityAreaMap();
      } else if(this.location.colony) {
          return this.updateColonyAreaMap();
      } else if (this.location.region) {
        return this.updateRegionMap();
      }
      console.log('No map to update');
    }

    updateInventoryDisplay(){
        const inventory = document.getElementById('ji-container');
        if (this.inventory.size) {
            inventory.innerHTML = Array.from(this.inventory).map(item =>
                `<div class="inventory-container">
                    <div class="inventory-item is-pointable" onclick="alert('Effect is work in progress')">
                        <span class="inventory-name left">${item[0]}</span>
                        <span class="inventory-amount right">x${item[1]}</span>
                    </div>
                </div>`
            ).join('');
        } else {
            inventory.innerHTML = `<div class="inventory-container">
                    <div class="inventory-item">
                        <span class="inventory-amount">Empty</span>
                    </div>
                </div>`;
        }
        inventory.style.animation = 'pixalate 0.5s ease-out;';
    }
    updateJournalDisplay() {
        const journal = document.getElementById('ji-container');
        if (this.journal.entries.size) {
            journal.innerHTML = Array.from(this.journal.entries.values()).map(entry =>
                `<div class="inventory-container">
                    <span class="journal-entry-title">#${entry.id}. ${entry.name}</span>
                    <div class="inventory-item journal-entry is-pointable">
                        ${entry.description}
                    </div>
                 </div>`
            ).join('');
        }else {
            journal.innerHTML = `<div class="inventory-container" >
                <span class="journal-entry-title">No Entries found</span>
            </div>`
        }
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
            .getRegion(this.getRegion())
            .getCity(this.getCity())
            .getArea(this.getArea())
            .updateMap();
    }
    updateColonyAreaMap = () =>{
        Planet
            .getPlanet(this.getPlanet())
            .getRegion(this.getRegion())
            .getColony(this.getColony())
            .getArea()
            .updateMap();
    }
    die(){
      document.getElementById('global-component').innerHTML =
          `
            <div class="game-over">
            <h1>Game Over</h1>
            <p>You died</p>
            <button onclick="window.location.reload()">Restart</button>
          `;
    }

}

export default Player;
