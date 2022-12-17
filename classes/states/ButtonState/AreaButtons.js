class AreaButtons{
    static state;
    constructor(){
        this.exitCityBtn = document.getElementById('exit-city-button');
        this.nextAreaLeftBtn = document.getElementById('next-area-left');
        this.nextAreaRightBtn = document.getElementById('next-area-right');
        AreaButtons.state = this;
    }
    showExitCityBtn(){
        this.exitCityBtn.style.display = 'block';
    }
    hideExitCityBtn(){
        this.exitCityBtn.style.display = 'none';
    }
    showNextAreaLeftBtn(){
        this.nextAreaLeftBtn.style.display = 'block';
    }
    hideNextAreaLeftBtn(){
        this.nextAreaLeftBtn.style.display = 'none';
    }
    showNextAreaRightBtn(){
        this.nextAreaRightBtn.style.display = 'block';
    }
    hideNextAreaRightBtn(){
        this.nextAreaRightBtn.style.display = 'none';
    }
}

export default AreaButtons;