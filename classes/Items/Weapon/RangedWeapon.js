import Weapon from "./Weapon.js";

class RangedWeapon extends Weapon {
    constructor(name, damage, range, weight, value, type, ammoType, reloadTime,hands) {
        super(name, damage, range, weight, value, type,hands);
        this.ammoType = ammoType;
        this.reloadTime = reloadTime;
    }
}
export default RangedWeapon;
