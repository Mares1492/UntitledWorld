class Save {
    static saves = new Map();
    constructor() {

    }
    static getSaves(){ //mb multiple saves
        return JSON.parse(localStorage.getItem('saves'));
    }

    loadSave(){//yet to be created
        console.log("Save not found");
    }

    saveGame(game){
        localStorage.setItem('saves', JSON.stringify(game));
    }
}