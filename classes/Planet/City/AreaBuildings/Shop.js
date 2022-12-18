import shopTypes from "../../../../textData/shopTypes";
class Shop{
    constructor(){
        this.items = new Map();
        this.generateRandomShop();
    }
    generateRandomShop(){
        this.shop = shopTypes[Math.floor(Math.random() * shopTypes.length)];
        let shopItems = this.shop.items;
        for (let i = 0; i < shopItems.length; i++){
            let item = shopItems[i];//TODO:add random amounts of items
            this.items.set(item.name, item);
        }
    }
}
export default Shop;
