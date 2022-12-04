
import Character from "./Character.js";
import Planet from "../Planet/Planet.js";
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
    goToTile(tile) {
        const region = Planet
            .getPlanet(this.location.planet)
            .getRegion(this.location.region)
        if (this.location.tile){
            region
                .getTile(this.location.tile.x,this.location.tile.y)
                .handlePlayerDeparture()
        }
        this.location = {...this.location, tile:tile};
        region
            .getTile(tile.x,tile.y)
            .handlePlayerArrival();

    }
    goToLocation(location) {
        this.location = location;
    }

}

export default Player;