import Weapon from "./Weapon.js";

class RangedWeapon extends Weapon {
    constructor(name, damage, range, weight, value, type, ammoType, reloadTime) {
        super(name, damage, range, weight, value, type);
        this.ammoType = ammoType;
        this.reloadTime = reloadTime;
    }
}
export default RangedWeapon;
