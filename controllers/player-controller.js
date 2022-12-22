import Planet from "../classes/Planet/Planet.js";


const handleAction = (player,type) => {
    document.getElementById("shop-component").style.display = "none";//TODO: find a better place for this
    if (player.getIsPlayerAbleToAct(type)) {
        const x = parseInt(document.getElementById('tile-x-cords').innerHTML);
        const y = parseInt(document.getElementById('tile-y-cords').innerHTML);
        const region = Planet.getPlanet(player.getPlanet()).getRegion(player.getRegion());
        let playerTile = player.getTile();
        switch (type) {
            case 'enter city':
                player.setIsUnableToAct(1000)
                if (playerTile.x === x && playerTile.y === y) {
                    const thisTile = region.getTile(x,y);
                    console.log(thisTile);
                    if (thisTile.type === 'city') {
                        thisTile.handlePlayerDeparture();
                        player.handleEnterCity(region.getCity(thisTile.name),thisTile.type);
                        player.updateMap();
                    } else if (thisTile.type === 'colony') {
                        thisTile.handlePlayerDeparture();
                        player.handleEnterCity(region.getColony(thisTile.name),thisTile.type);
                        player.updateMap();
                    }else {
                        alert("There is no city here!");
                    }
                } else {
                    alert("Something went wrong! You are not on the tile you are trying to enter!");
                }
                break
            case 'walk':
                const maxTilesToMove = 50;
                if (!player.location.area){
                const tileTo = region.getTile(x,y)
                    if (!tileTo.isPassable) {
                        if (tileTo.name === "x-x-x-x-x-x-x-x") {
                            alert("There is no way for you to deal with them right now!");
                        } else if (tileTo.name === "Military deployment area"){
                            alert("Suicide will be available in future dlc")
                        }else {
                            alert("You can't go there!");
                        }
                        return;
                    }
                }
                const lengthOfPath = Math.abs(playerTile.x - x) + Math.abs(playerTile.y - y);
                if (playerTile.x === x && playerTile.y === y) {
                    alert("You are already there!");
                }
                else if (lengthOfPath > maxTilesToMove) {
                    alert("you can't travel that distance at once!");

                }
                else {
                    const timeout = (Math.abs(x-playerTile.x)*200+Math.abs(y-playerTile.y)*200);
                    player.setIsUnableToAct(timeout)
                    const arrived = player.goToTile({x:x, y:y},maxTilesToMove);
                    if (arrived) {
                        console.log(`This path took ${player.location.area?Math.floor(timeout / 150)+ " minutes":Math.floor(timeout / 120)+" hours"}`);
                        player.updateMap();
                    } else {
                        alert("You can't go there!")
                    }
                }
                break
            case 'exit city':
                player.setIsUnableToAct(1000)
                const exited = player.handleExitCity();
                if (exited){
                    playerTile = player.getTile();
                    region.getTile(playerTile.x,playerTile.y).handlePlayerArrival();
                    player.updateMap();
                }else {
                    alert("You can't exit the city right now!");
                }
                break
            case 'shop':
                player.setIsUnableToAct(500)
                region
                    .getCity(player.getCity())
                    .getArea(player.getArea())
                    .getTile(x,y)
                    .handleShowShop();
                break
            case 'talk':
                //...
                break
            case 'fight':
                //...
                break
            case 'land':
                const isLandable = region.getTile(x,y).isLandable;
                if (!isLandable){
                    alert("You can't land here!");
                    return;
                }
                player.setIsUnableToAct(5000)
                console.log(x, y, player.getPlanet(), player.getRegion())
                const hasLanded = player.getTransport()
                    .landAt(player.getPlanet(), player.getRegion(), x, y);
                if (hasLanded) {
                    player.goToTile({x: x, y: y});
                    player.updateMap();
                    document.getElementById('go-to-button').style.display = 'block';
                    document.getElementById('landing-button').style.display = 'none';
                    document.getElementById(`${x + '-' + y}`).style.animation = "landingAnimation 5s";
                    setTimeout(() => {
                        document.getElementById(`${x + '-' + y}`).style.animation = "";
                    }, 5000);
                } else {
                    alert("You can't land here!");
                }
                break
            case 'take off':
                player.setIsUnableToAct(5000)
                const landedOff = player.getTransport().takeOff();
                if (landedOff) {
                    player.handleLeavePlanetSurface();
                    document.getElementById('go-to-button').style.display = 'none';
                    document.getElementById('landing-button').style.display = 'block';
                    document.getElementById('take-off-button').style.display = 'none';
                    document.getElementById(`${x + '-' + y}`).style.animation = "takeOffAnimation 5s ease-in";
                    setTimeout(() => {
                        player.updateMap()
                    }, 5000);
                } else {
                    alert("You can't take off from here!");
                }
                break
            case 'next area':
                player.setIsUnableToAct(500)
                const nextArea = player.handleGoToOtherArea("next");
                if (nextArea) {
                    player.updateMap();
                } else {
                    alert("Can't go to next area!");
                }
                break
            case 'prev area':
                player.setIsUnableToAct(500)
                const prevArea = player.handleGoToOtherArea("prev");
                if (prevArea) {
                    player.updateMap();
                } else {
                    alert("Can't go to previous area!");
                }
                break
            case 'update inventory':
                console.log("Updating inventory");
                player.updateInventoryDisplay();
                break
            case 'update journal':
                console.log("Updating journal");
                player.updateJournalDisplay();
                break
            default:
                console.log('No right action found')
                return false
        }
        return true
    }
    return false
}

export default handleAction