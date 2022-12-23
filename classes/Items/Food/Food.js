import Item from "../Item.js";

class Food extends Item{
      constructor(name, value, weight=null,type="food",effect=0) {
          super(name, value, weight, type);
          this.effect = effect;
      }
  }
  export default Food;
