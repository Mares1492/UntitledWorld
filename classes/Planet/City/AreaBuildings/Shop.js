import shopTypes from "../../../../textData/shopTypes.js";
import handleItemAction from "../../../../controllers/items-controller.js";
class Shop{
    constructor(){
        this.items = new Map();
        this.generateRandomShop();
    }
    generateRandomShop(){
        const shop = shopTypes[Math.floor(Math.random() * shopTypes.length)];
        this.name = shop.name;
        let shopItems = shop.items;
        for (let i = 0; i < shopItems.length; i++){
            let item = shopItems[i];//TODO:add random amounts of Items
            this.items.set(item.name, item);
        }
    }
    showShop(){
        let shopItems = this.items.values();
        return {items:Array.from(shopItems), handleItemAction};

    }

}
export default Shop;
