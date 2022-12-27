import NPC from "./NPC.js";

class Enemy extends NPC {
    constructor(
        name = 'Stranger',
        params = {health:15, defense:1, attack:1, speed:1},
        stats={strength:5,dexterity:5,intellect:5,agility:5,charisma:5},
        img = "./img/stranger.png",
        level=1,
        status="alive",
        location=null,
        faction= "strangers",
        relationship=-100) {
        super(name, params, stats, level, status, location, faction, relationship);
        this.img = img;
    }
}
export default Enemy;
