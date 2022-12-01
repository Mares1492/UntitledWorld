import Character from "./Character.js";

class NPC extends Character {
    constructor(name="Anon", health=10, attack=0,speed=0, stats={},level=1,defense=0,status="alive", location=null, relationship="neutral", dialogue=null,faction=null) {
        super(name, health, defense, attack, speed, level, status, location,stats);
        this.relationship = relationship;
        this.dialogue = dialogue;
        this.faction = faction;
    }


}