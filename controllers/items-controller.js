import Session from "../classes/Game/Session.js";

const handleItemAction = (item,action) => {
    const player = Session.currentPlayer;
      switch (action) {
          case 'buy':
            //const buy = prompt('What would you like to buy?','Nothing!');
              // TODO: Maybe add a prompt to ask the user what they would like to buy  :P
              const buy = player.removeGold(item.price);
              if (buy) {
                player.addItem(item);
                console.log(`You bought the ${item.name}!`);
              } else {
                console.log("You don't have enough gold!");
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
export default handleItemAction
