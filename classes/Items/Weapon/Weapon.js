import Item from "../Item.js";

class Weapon extends Item {
    constructor(name, damage, range, weight, value, type,hands=2){
        super(name, value,weight, type);
        this.damage = damage;
        //this.durability = durability; //TODO: decide if durability is needed
        this.range = range;
        this.weight = weight;
        this.hands = hands;
    }
}
export default Weapon;
