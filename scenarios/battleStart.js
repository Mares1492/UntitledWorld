import Battle from "../classes/Battle/Battle.js";
import Enemy from "../classes/Character/Enemy.js";
import enemyTypes from "../textData/enemyTypes.js";
const nextAreaLeft = document.getElementById('next-area-left');
const nextAreaRight = document.getElementById('next-area-right');

const handleStartBattle = (enemy,enemyLvl,numberOfEnemies) =>{
    nextAreaLeft.style.display = 'none';
    nextAreaRight.style.display = 'none';
    const chosenEnemy = enemyTypes[enemy];
    const battle = new Battle(
        [ //TODO: let it add enemies using loop
        new Enemy(
            chosenEnemy.name,
            chosenEnemy.params,
            chosenEnemy.stats,
            chosenEnemy.img,
            enemyLvl)
        ],
        numberOfEnemies);
}
export default handleStartBattle