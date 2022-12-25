import Session from "../classes/Game/Session.js";
import Item from "../classes/Items/Item.js";

const handleItemAction = (event,name=null,action=null) => {
    const player = Session.currentPlayer;
    if (event) {
        name = event.target.getAttribute('data-name');
        action = event.target.getAttribute('data-action');
    }
    const item = Item.getItem(name);
    if (item) {
        switch (action) {
            case 'buy':
                //const buy = prompt('What would you like to buy?','Nothing!');
                // TODO: Maybe add a prompt to ask the user what they would like to buy  :P
                const price = event.target.getAttribute('data-price')
                const buy = player.removeCredit(price,'shop');
                if (buy) {
                    player.addItem(name);
                    console.log(`You bought the ${name} for ${price}!`);
                }
                break
            case 'sell':
                break
            case 'add':
                break
            case 'remove':
                break
            case 'use':
                break
            case 'equip':
                break
            case 'unequip':
                break
            case 'drop':
                break
            case 'examine':
                break
            default:
                break
        }
    }
}
export default handleItemAction
