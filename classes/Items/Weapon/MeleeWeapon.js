import Weapon from "./Weapon.js";

class MeleeWeapon extends Weapon {
  constructor(name, damage, range, weight, value, type,hands=1) {
    super(name, damage, range, weight, value, type);
    this.hands = hands;
  }
}
export default MeleeWeapon;
