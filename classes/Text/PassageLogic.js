const textElement = document.getElementById('console-text');
const optionButtonsElement = document.getElementById('option-buttons');

let state = {}
// Varastatud kood, lel, vajab cleanupi, praegu tho don't care, it works tekstidega
function startGame() {
    state = {}
    showPassage(1)
}

function showPassage(PassageIndex) {
    const textNode = textPassages.find(textNode => textNode.id === PassageIndex)
    textElement.innerText = textNode.text

    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button)
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {

    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    state = Object.assign(state, option.setState)
    showPassage(nextTextNodeId)
}

export default startGame;

//hmmmm

const textPassages = [{
        id: 1,
        text: `"One Way Ticket" - Dream" \n
        When humanity first left its home system in a controlled manner, and interplanetary travel was still not everyone's daily routine, mankind finally proved that they were not alone. Many other species inhabited the stars, but were almost undetectable without direct contact. This was due to the window where a species is discoverable being relatively short- leading to most civilisations being either too insignificant to be noticed or too advanced to leave any energy unused, perceivable only as empty space.
        A common language among these new species emerged more than it was developed. It was soon discovered most life worked on the same principle as far as brains and thought was concerned, although other biology varied wildly. As such, creating translations for all these languages was a relatively simple feat.
        United by the gift of communication, all species rushed towards scientific discovery. The goal was simple: create or discover a utopia, colonizing the universe on the way. They were foolish. Blinded by the advent of alien technology, few stopped to realize that they were all roughly equally developed. The vast majority of colonies never became sustainable. Explorers never returned from the void they were so eager to visit. The oh so human quality of ambition equally blinded even the most alien of minds to fall victim to the same delusion. 
        What remained soon re-organised the resources and manpower still available, drawing up the first reasonable plans for space exploration. One that, most likely, wouldn’t bear fruit during the lifetimes of those that drew it up. A sacrifice they were proud to make.       
        `,
        options: [{
                text: 'Choice 1',
                nextText: 2
            },
            {
                text: 'Choice 2',
                nextText: 2
            }
        ]
    },

    {
        id: 2,
        text: 'Successfully reached textpassage 2'
    }
]