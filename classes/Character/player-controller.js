import Planet from "../Planet/Planet.js";


const handleAction = (player,type) => {
    if (player.getIsPlayerAbleToAct(type)) {
        const x = parseInt(document.getElementById('tile-x-cords').innerHTML);
        const y = parseInt(document.getElementById('tile-y-cords').innerHTML);
        const region = Planet.getPlanet(player.getPlanet()).getRegion(player.getRegion());
        switch (type) {
            case 'enter city':
                player.setIsUnableToAct(5000)
                const tile = player.getTile();
                if (tile.x === x && tile.y === y) {
                    let city = region.getTile(x,y);
                    console.log(city);
                    if (city.type === 'city') {
                        city = region.getCity(city.name);
                        player.handleEnterCity(city);//TODO: add city enter handler
                        player.updateMap();
                    } else {
                        alert("There is no city here!");
                    }
                } else {
                    alert("Something went wrong! You are not on the tile you are trying to enter!");
                }
                break
            case 'walk':
                const maxTilesToMove = 50;
                const isPassable = region.getTile(x,y).isPassable
                if (!isPassable) {
                    alert("You can't go there!");
                    return;
                }
                if (player.getIsPlayerAbleToAct("go to new tile")) {
                    const playerTile = player.getTile();
                    const lengthOfPath = Math.abs(playerTile.x - x) + Math.abs(playerTile.y - y);
                    if (player.getTile().x === x && player.getTile().y === y) {
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
                }
                break
            case 'exit city':
                player.setIsUnableToAct(1000)
                player.handleExitCity();
                break
            case 'talk':
                //...
                break
            case 'fight':
                //...
                break
            case 'land':
                const isLandable = region.getTile(x,y).isPassable
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
            default:
                console.log('No right action found')
                return false
        }
        return true
    }
    return false
}

export default handleAction