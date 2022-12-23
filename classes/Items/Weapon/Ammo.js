import Item from "../Item.js";

class Ammo extends Item {
    constructor(name, value, weight=null,type="ammo",ammoType="unknown",weapon=null) {
        super(name, value, weight,type);
        this.ammoType = ammoType;
        this.weapon = weapon;
    }
}