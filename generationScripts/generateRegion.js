import Planet from "../classes/Planet/Planet.js";
import Region from "../classes/Planet/Region.js";
import Session from "../classes/Game/Session.js";
const story = document.getElementById('story');
const regionNameGlobal = document.getElementById('region-name');

const generateRegion = (text=story.value,regionName = regionNameGlobal.value) =>{
    if (!Session.currentPlayer.location.city && !Session.currentPlayer.location.colony && !Session.currentPlayer.location.tile){
        const planet = Planet.getPlanet("New Hope") //adjust to get planet from input
        if (planet){
            const region = new Region(
                regionName,
                text,
                parent.innerWidth/100,
                parent.innerHeight/80,
                {planet:planet.name},
            );
            Session.currentPlayer.location = {planet:planet.name,region:region.name};
            console.log("Adding: ",region,"To: ",planet);
            planet.addRegion(region);
            document.getElementById('region-name').value = region.name;
            Session.currentPlayer.updateMap();
            return region;
        }
        else {
            console.log("Planet not found");
        }
    }
    alert("Player should not be on surface");
}
export default generateRegion;
