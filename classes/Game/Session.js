import Player from "../Character/Player.js";
import StarSystem from "../StarSystem/StarSystem.js";
import Planet from "../Planet/Planet.js";
import generateRegion from "../../generationScripts/generateRegion.js";
import items from "../../textData/ItemData.js";
import Food from "../Items/Food/Food.js";
import Item from "../Items/Item.js";
import MeleeWeapon from "../Items/Weapon/MeleeWeapon.js";
import RangedWeapon from "../Items/Weapon/RangedWeapon.js";

class Session{
    static currentPlayer;
    constructor(playerName,job,appearance,startPlanet) {
        this.homeSystem = new StarSystem({galaxy: 'Home galaxy',sector: 'Home sector',subSector: 'Home sub-sector',cords:{x:765 , y:1320,z: 233}}, 'Home system');
        this.homePlanet = new Planet(
            startPlanet?.location,
            startPlanet?.name,
            startPlanet?.type,
            startPlanet?.description,
            startPlanet?.atmosphere,
            startPlanet?.temperature,
            startPlanet?.gravity,
            startPlanet?.terrain,
            startPlanet?.water,
            startPlanet?.life,
            startPlanet?.resources,
            startPlanet?.ownedBy,
            startPlanet?.status,
            startPlanet?.system
        );
        console.log(this.homeSystem);
        console.log(this.homePlanet);
        this.player =  new Player(
            playerName,
            appearance,
            job.params,
            job.stats,
            {planet:this.homePlanet.name,region:"Home"}
        );
        Session.currentPlayer = this.player;
        this.homeRegion = generateRegion(startPlanet.startingRegionDescription,"Home");
        this.spawnPlayer();
        this.createItems();
    }
    spawnPlayer(){
        const city = this.homeRegion.getCity("City-1")
        Session.currentPlayer.location = {planet:this.homePlanet.name,region:this.homeRegion.name,city:city.name,tile:{x:city.location.tile.x,y:city.location.tile.y}};
        document.getElementById("map-component").style.display = "block";
        document.getElementById("info-component").style.display = "flex";
        Session.currentPlayer.handleEnterCity(city,"city");
        document.getElementById("exit-city-button").style.display = "block";
        document.getElementById("enter-city-button").style.display = "none";
        document.getElementById("landing-button").style.display = "none";
        document.getElementById("take-off-button").style.display = "none";
    }
    createItems(){ //TODO: move to some kind of item factory
        items.food.forEach(item => new Food(
            item.name,
            item?.value,
            item?.weight,
            item?.type,
            item?.effect
        ));
        items.medicine.forEach(item => new Food( //TODO: create medicine class
            item.name,
            item?.value,
            item?.weight,
            item?.type,
            item?.effect
        ));
        items.misc.forEach(item => new Item( //TODO: create misc class
            item.name,
            item?.value,
            item?.weight,
            item?.type
        ));
        items.meleeWeapon.forEach(item => new MeleeWeapon(
            item.name,
            item?.damage,
            item?.range,
            item?.weight,
            item?.value,
            item?.type,
            item?.hands
        ));
        items.rangedWeapon.forEach(item => new RangedWeapon(
            item.name,
            item?.damage,
            item?.range,
            item?.weight,
            item?.value,
            item?.type,
            item?.ammoType,
            item?.hands
        ));
        items.armor.forEach(item => new Item( //TODO: create armor class
            item.name,
            item?.value,
            item?.weight,
            item?.type
        ));
    }
}

export default Session;