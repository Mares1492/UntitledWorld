import Character from "./Character.js";

class NPC extends Character {
    constructor(
        name="Anon",
        params={health : 10,defense:0, attack : 0, speed : 0},
        stats={strength:1,dexterity:1,intellect:1,agility:1,charisma:1},
        level=1,
        status="alive",
        location=null,
        faction=null,
        relationship=0,
        dialogue= new Map()) {
        super(name, params,level, status, location,stats);
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
export default NPC;

