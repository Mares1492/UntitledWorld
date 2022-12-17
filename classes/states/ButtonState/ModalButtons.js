class ModalButtons {
    static state;
    constructor() {
        this.goToBtn = document.getElementById('go-to-button');
        this.landingBtn = document.getElementById('landing-button');
        this.takeOffBtn = document.getElementById('take-off-button');
        this.enterCityBtn = document.getElementById('enter-city-button');
        ModalButtons.state = this;
    }
    showGoToBtn() {
        this.goToBtn.style.display = 'block';
    }
    hideGoToBtn() {
        this.goToBtn.style.display = 'none';
    }
    showLandingBtn() {
        this.landingBtn.style.display = 'block';
    }
    hideLandingBtn() {
        this.landingBtn.style.display = 'none';
    }
    showTakeOffBtn() {
        this.takeOffBtn.style.display = 'block';
    }
    hideTakeOffBtn() {
        this.takeOffBtn.style.display = 'none';
    }
    showEnterCityBtn() {
        this.enterCityBtn.style.display = 'block';
    }
    hideEnterCityBtn() {
        this.enterCityBtn.style.display = 'none';
    }

}

export default ModalButtons