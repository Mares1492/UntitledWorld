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
        
        Thus began the first Planetary Rush - a search, primarily, for suitable long term colonies and mining operations. Prophesied to act as a foundation for a united universe. As these foundations were placed, the first hyper-corporations emerged. Profit driven organizations that out-grew the planets and even species they were born on. So capable and rich that, in the eyes of the common man, they can be considered nations of their own.
        Unfortunately, you can only dream about the first rush. You are nothing more than an ordinary worker of the $job(think tank). $job_description( Cursed by your lack of wealth to rent out your thoughts and your mind. An insult to your worth. The work is monotonous and unremarkable - you barely have enough to pay for a room and meager food.)
      
        Recently, the same repeating visions torment you in your dreams: You have taken up a position on the main bridge of a familiar spacecraft. Recovering from your daze, you become conscious of your situation. As if becoming lucid, yet unable to influence your own mind, you gaze out of the reinforced glass windows to see your battleship entering combat with an enemy vessel. You can see it clearly with all its rusted paint and noticeably decaying hull. It’s metal exterior- stained brown with blood red accents. Despite the distance and size of the ship, for some reason you can clearly see the name of this vessel - "The Scourge".  Regardless of the vacuum, when the hulls of the ships collide, you hear the infernal screech of ripping metal.  The enemy craft literally tore your ship in half, continuing to hammer your ship with all its guns. The depressurization alarm goes off for the bridge, followed by the storage room and the crew living-quarters. While everyone around you is panicking, you are distracted by the strange figure now standing in front of you - Six arms and a TV instead of a head.  Incredibly ancient technology even by television standards. On its screen only a: ":-)" symbol can be identified.  You wake up in your bed in a cold sweat only to find a letter on your Personal Device Assistant with a concerningly intriguing headline: "Ready to change your life forever?"
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