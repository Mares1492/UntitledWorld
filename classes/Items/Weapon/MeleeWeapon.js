import Weapon from "./Weapon.js";

class MeleeWeapon extends Weapon {
  constructor(name, damage, range, weight, value, type,hands) {
    super(name, damage, range, weight, value, type,hands);
  }
}
export default MeleeWeapon;
