class Item{
    static allItems = new Map();
    constructor(name, value, weight=null,type="scarp"){
        this.id = Item.allItems.size+1;
        this.name = name;
        this.value = value;
        this.weight = weight;
        this.add();
    }
    add(){
        if (!Item.allItems.has(this.name)){ //TODO: potentially all the items can be unique
            Item.allItems.set(this.name, this);
        }
    }
    static getItem(name){
        if (Item.allItems.has(name)){
            return Item.allItems.get(name);
        }
        console.error("Item not found");
        alert("Item is not available in this version of the game");
        return null;
    }
}
export default Item;
