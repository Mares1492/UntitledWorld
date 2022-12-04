import Character from "./Character.js";

class NPC extends Character {
    constructor(name="Anon", params={health : 10,defense:0, attack : 0, speed : 0}, stats={},level=1,defense=0,status="alive", location=null, relationship=0, dialogue= new Map(),faction=null) {
        super(name, level, status, location,stats);
        this.relationship = relationship;
        this.dialogue = dialogue;
        this.faction = faction;
    }
    improveRelationship(amount) {
        this.relationship += amount;
    }
    reduceRelationship(amount) {
        this.relationship -= amount;
    }
    getRelationship() {
        if (this.relationship > 50) {
            return "friendly";
        }
        if (this.relationship < -50) {
            return "hostile";
        }
        return "neutral";
    }
    getFaction() {
        return this.faction;
    }


}