import {events} from "../../textData/eventData.js";
const textElement = document.getElementById('modal-text');
const optionButtonsElement = document.getElementById('option-buttons');


let state = {}
// Varastatud kood, lel, vajab cleanupi, praegu tho don't care, it works tekstidega

function startGame() {
    state = {}
    showPassage(1)
}

export function showPassage(PassageIndex) {
    document.getElementById('modal-passage').style.display = 'block';
    if (typeof PassageIndex === "function"){
        PassageIndex = PassageIndex() //TODO: that's a bit hacky(js only solution), think of a better way to do this
        if (PassageIndex === 0) return closeTextModal()
    }
    const textNode = events.find(textNode => textNode.id === PassageIndex)
    textElement.innerText = textNode.text

    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('option-buttons')
            button.addEventListener('click', () => {
                option.eventEffect()
                selectOption(option)})
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {

    const nextTextNodeId = option.nextText
    if (nextTextNodeId === 0) {
        state = {}
        return closeTextModal()
    }
    state = Object.assign(state, option.setState)
    showPassage(nextTextNodeId)
}

const closeTextModal = () => {
 document.getElementById('modal-passage').style.display = 'none'
};

export default startGame;

//Erinevate komponentide näitamiseks id numbrid
//Map komponendi näitamine on id 0
