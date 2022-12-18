class Weapon{
    constructor(name, damage, range, weight, value, type){
        this.name = name;
        this.damage = damage;
        //this.durability = durability; //TODO: decide if durability is needed
        this.range = range;
        this.weight = weight;
        this.value = value;
        this.type = type;
    }
}
export default Weapon;
