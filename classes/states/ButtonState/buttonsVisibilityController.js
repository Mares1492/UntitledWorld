const exitCityBtn = document.getElementById('exit-city-button');
const nextAreaLeftBtn = document.getElementById('next-area-left');
const nextAreaRightBtn = document.getElementById('next-area-right');
const worldDescription = document.getElementById('world-description');
export const buttonVisibilityHandler = (action) =>{
    switch (action) {
        case 'enter-city':
            exitCityBtn.style.display = 'block';
            nextAreaLeftBtn.style.display = 'block';
            nextAreaRightBtn.style.display = 'block';
            break;
        case 'exit-city':
            exitCityBtn.style.display = 'none';
            nextAreaLeftBtn.style.display = 'none';
            nextAreaRightBtn.style.display = 'none';
            break;
        case 'show-region-generator':
            worldDescription.style.display = 'absolute';
            break;
        case 'hide-region-generator':
            worldDescription.style.display = 'none';
            break;
        default:
            exitCityBtn.style.display = 'none';
            nextAreaLeftBtn.style.display = 'none';
            nextAreaRightBtn.style.display = 'none';
            break;
    }
}