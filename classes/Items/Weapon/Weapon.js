class Weapon extends Item {
    constructor(name, damage, range, weight, value, type){
        super(name, value,weight, type );
        this.damage = damage;
        //this.durability = durability; //TODO: decide if durability is needed
        this.range = range;
        this.weight = weight;
    }
}
export default Weapon;
