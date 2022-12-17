class RegionGenState{
    constructor() {
        this.regionGenComponent = document.getElementById("world-description");
    }
    show() {
        this.regionGenComponent.style.display = "block";
    }
    hide() {
        this.regionGenComponent.style.display = "none";
    }
}

export default RegionGenState;