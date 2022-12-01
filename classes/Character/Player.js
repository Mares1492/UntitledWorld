
import Character from "./Character.js";
class Player extends Character{
  constructor(name, health=20, defense=0, attack=0, speed=1, level=1, experience=0, gold=0, equipped=[], abilities=[], stats={}, status="alive", location=null) {
  super(name, health, defense, attack, speed, level, status, location,stats);
    this.experience = experience;
    this.gold = gold;
    this.inventory = new Map();
    this.equipped = equipped;
    this.abilities = abilities;
  }
    equipItem(item) {
        if (this.inventory.has(item)) {
            this.equipped.push(item);
            this.inventory.delete(item);
        }
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
}

export default Player;