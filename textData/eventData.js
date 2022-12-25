import handleStartBattle from "../scenarios/battleStart.js";
import Session from "../classes/Game/Session.js";

export const events = [{
    id: 1,
    text: `"One Way Ticket" - Dream" \n
        When humanity first left its home system in a controlled manner, and interplanetary travel was still not everyone's daily routine, mankind finally proved that they were not alone. Many other species inhabited the stars, but were almost undetectable without direct contact. This was due to the window where a species is discoverable being relatively short- leading to most civilisations being either too insignificant to be noticed or too advanced to leave any energy unused, perceivable only as empty space.
        A common language among these new species emerged more than it was developed. It was soon discovered most life worked on the same principle as far as brains and thought was concerned, although other biology varied wildly. As such, creating translations for all these languages was a relatively simple feat.
        United by the gift of communication, all species rushed towards scientific discovery. The goal was simple: create or discover a utopia, colonizing the universe on the way. They were foolish. Blinded by the advent of alien technology, few stopped to realize that they were all roughly equally developed. The vast majority of colonies never became sustainable. Explorers never returned from the void they were so eager to visit. The oh so human quality of ambition equally blinded even the most alien of minds to fall victim to the same delusion. 
        What remained soon re-organised the resources and manpower still available, drawing up the first reasonable plans for space exploration. One that, most likely, wouldn’t bear fruit during the lifetimes of those that drew it up. A sacrifice they were proud to make.
        
        Thus began the first Planetary Rush - a search, primarily, for suitable long term colonies and mining operations. Prophesied to act as a foundation for a united universe. As these foundations were placed, the first hyper-corporations emerged. Profit driven organizations that out-grew the planets and even species they were born on. So capable and rich that, in the eyes of the common man, they can be considered nations of their own.
        Unfortunately, you can only dream about the first rush. You are nothing more than an ordinary worker. Cursed by your lack of wealth to rent out your thoughts and your mind. An insult to your worth. The work is monotonous and unremarkable - you barely have enough to pay for a room and meager food.)
      
        Recently, the same repeating visions torment you in your dreams: You have taken up a position on the main bridge of a familiar spacecraft. Recovering from your daze, you become conscious of your situation. As if becoming lucid, yet unable to influence your own mind, you gaze out of the reinforced glass windows to see your battleship entering combat with an enemy vessel. You can see it clearly with all its rusted paint and noticeably decaying hull. It’s metal exterior- stained brown with blood red accents. Despite the distance and size of the ship, for some reason you can clearly see the name of this vessel - "The Scourge".  Regardless of the vacuum, when the hulls of the ships collide, you hear the infernal screech of ripping metal.  The enemy craft literally tore your ship in half, continuing to hammer your ship with all its guns. The depressurization alarm goes off for the bridge, followed by the storage room and the crew living-quarters. While everyone around you is panicking, you are distracted by the strange figure now standing in front of you - Six arms and a TV instead of a head.  Incredibly ancient technology even by television standards. On its screen only a: ":-)" symbol can be identified.  You wake up in your bed in a cold sweat only to find a letter on your Personal Device Assistant with a concerningly intriguing headline: "Ready to change your life forever?"
        `,
    options: [
        {
            text: 'Read now',
            eventEffect() {

            },
            nextText: 2
        },
        {
            text: 'Read it later',
            eventEffect() {

            },
            nextText: 5
        }
    ]
},

    {
        id: 2,
        text: `"Read now" \n
        You are still dazed both from your much needed rest and disturbing dream. Regardless, you open up the letter to discover it has been sent by a mysterious “DocDor Corp”. It reads as follows:

        "Hello fellow citizen!

        As of today, you have been signed up for a one time grant from DocDor Corp to participate in Planetary Rush 57. The grant will bestow upon you the following: 1×Small starship, 1×Basic exploration kit, 1×Personal weapon, as well as 2 000 credits in cash. To redeem this offer, simply visit your system's central registered spaceport and prepare for the adventure of a lifetime!

        Best regards,
        DocDor Corp"

        The message jolts you out of your dazed state, but brings with it mainly confusion. You remain undecided if the message is just another scam, like so many of these “once in a lifetime” offers are. While yes, you want to believe this mail, it seems awfully fishy considering spaceport tickets in this day and age.However, you truly are unwilling to spend another week without food. Unless you start taking chances, you may never see your circumstances change. As such, a simple dilemma remains:
        `,
        options: [
            {
                text: "Yeah, seems legit",
                eventEffect() {

                },
                nextText: 3
            },
            {
                text: "Breakfast first, business later",
                eventEffect() {

                },
                nextText: 6
            },
            {
                text: "It's obviously a scam, better get ready for work",
                eventEffect() {

                },
                nextText: 7
            }
        ]
    },

    {
        id: 3,
        text: `"Yeah, seems legit" \n
        Even though the letter is obviously a scam, you’ve had enough of eating dry tasteless bricks of nutrients and drinking water that reeks of chlorine. Without thinking twice, you book yourself a one way ticket to the nearest spaceport. The ship there is scheduled to leave this very evening. Surviving without food is a routine for you anyways and it's only going to be a week at most. On the off chance that the letter didn't lie to you, you may finally receive answers to some of your questions and see a change in this monotonous routine. By the end of the booking process, the feeling in your heart tells you you’ve finally made the right choice.

        You don't exactly know where you were born or even when. Much less who your parents were. One day you simply discovered yourself in an orphanage. Much the same feeling as in your dream.You have been calling this dusty hellscape home ever since. But the nagging curiosity at the back of your mind never went away. For a time, you felt you could leave these thoughts behind. But then your life went to shit and these passing curiosities grew ever stronger. Sometimes spiraling into hour-long contemplations. Not much else to do alone in your bland gray room. You gaze at the ticket with a sense of gleeful expectation as it may just be your ticket to more than a spaceport. It may be your ticket to answers.

        `,
        options: [
            {
                text: "OH, SHIT I'M LATE FOR WORK",
                eventEffect() {

                },
                nextText: 4 //Meie praegune Character Creator placeholder ID
            },
        ]
    },

    {
        id: 5,
        text: `“Read it later” \n
        After reading the headline, you decided to leave the letter on your run down metal coffee table. Metal has turned into the cheapest material on the market after the emergence of asteroid mining, leaving wood as a luxury you cannot afford. You reluctantly crawl out of bed to prepare for your usual morning routine. First you go to the kitchen to start your old dinky coffee machine and fry some synthetic eggs, which the ruling hyper-corporations “generously” provide. The coffee isn’t even real coffee as so few planets can support the crop. It tastes like dirt, and you often wonder what culinary sensations you’ve missed out on as the years have gone by. The room you inhabit is cramped at best and claustrophobic at worst. Maybe it could fit another person, but neither of you would have space to walk more than 1 step. The sound of eggs being fried calms you down again. It separates your morning from the nightmares before. It returns your sense of control. Once the coffee machine plays its 6 beep melody, you take your favorite mug and fill it up with the cheap brew you desire. You can't help but gaze at the illustration on your mug. A starship with a logo identical to the one used to stamp the letter. Intrigued by your discovery, you rotate the mug to find an inscription on it: “DocDor Corp Scourge”. The ship depicted on the mug gives off an eerie sense of danger to you. A sense of déjà vu packed in a layer of malice. Maybe a premonition. 
        The silver-hulled ship from your mug is a proud explorer of the galaxy from the third Planetary Rush. A perfect example of the galactic dream. A vessel to look up to and remember for its accomplishments. The mere thought of it should inspire you, and yet it only pulls out images from your nightmares. The shape of the hull and the blood red accents. With some rust, the two almost match perfectly. No, no. You’re overthinking things. The ship on your cup is a sign of hope and ambition. The ship in your dreams is everything but.
        You awaken from your thoughts to the smell of burning. Your habit of daydreaming is getting worse. As you try to extinguish what remains from your eggs, you glance at the second-hand electronic clock on your wall and realize the time. You are horribly late for work and storm off to the bathroom to fix your looks, not like it matters much.
        `,
        options: [{
            text: "Gonna look good at least for myself",
            eventEffect() {

            },
            nextText: 4
        },
        ]
    },

    {
        id: 6,
        text: `“Breakfast first, business later” \n
        After reading the headline, you decided to leave the letter on your run down metal coffee table. Metal has turned into the cheapest material on the market after the emergence of asteroid mining, leaving wood as a luxury you cannot afford. You reluctantly crawl out of bed to prepare for your usual morning routine. First you go to the kitchen to start your old dinky coffee machine and fry some synthetic eggs, which the ruling hyper-corporations “generously” provide. The coffee isn’t even real coffee as so few planets can support the crop. It tastes like dirt, and you often wonder what culinary sensations you’ve missed out on as the years have gone by. The room you inhabit is cramped at best and claustrophobic at worst. Maybe it could fit another person, but neither of you would have space to walk more than 1 step. The sound of eggs being fried calms you down again. It separates your morning from the nightmares before. It returns your sense of control. Once the coffee machine plays its 6 beep melody, you take your favorite mug and fill it up with the cheap brew you desire. You can't help but gaze at the illustration on your mug. A starship with a logo identical to the one used to stamp the letter. Intrigued by your discovery, you rotate the mug to find an inscription on it: “DocDor Corp Scourge”. The ship depicted on the mug gives off an eerie sense of danger to you. A sense of déjà vu packed in a layer of malice. Maybe a premonition. 
        The silver-hulled ship from your mug is a proud explorer of the galaxy from the third Planetary Rush. A perfect example of the galactic dream. A vessel to look up to and remember for its accomplishments. The mere thought of it should inspire you, and yet it only pulls out images from your nightmares. The shape of the hull and the blood red accents. With some rust, the two almost match perfectly. No, no. You’re overthinking things. The ship on your cup is a sign of hope and ambition. The ship in your dreams is everything but. Although, the logos lining up gives you a bit of hope.

        As you start to warm up to the idea of believing the letter, you smell your “food” burning on the stove, which knocks you out of your short daydream. While trying to save what remains of your breakfast, you gaze at the clock hanging tilted on your wall.

        `,
        options: [
            {
                text: "Oh, for fucks sake, Im late again!(Rush to the bathroom)",
                eventEffect() {

                },
                nextText: 4
            },
        ]
    },

    {
        id: 7,
        text: `“It's obviously a scam, better get ready for work” \n
        You trip and knock yourself out on the coffee table. No one comes to help you and you soon bleed out. (read: route not implemented yet)
        `,
        options: [
            {
                text: "Go back",
                eventEffect() {

                },
                nextText: 2
            },
        ]
    },

    {
        id: 4,
        text: `“Character creation screen” \n
        Placeholder, not yet finished :(
        `,
        options: [
            {
                text: "Look away from mirror(leave character creation)",
                eventEffect() {

                },
                nextText: 8
            },
        ]
    },

    {
        id: 8,
        text: `“Leaving this world behind” \n
        You stood inside your small dwelling, surveying the few belongings  you accumulated over the years. It wasn't much, but it was all necessary for the journey ahead. It was high time something changed and finally to leave this cursed world behind.
        As you carefully packed your belongings into a small backpack, you made sure not to forget anything important, especially your favorite mug, as it could be a key to finding answers. With a deep breath, you slung the bag over your shoulder and set off towards the space transit hub.
        During this last walk you couldn't help but feel a mix of excitement and trepidation. You’ve been on this planet for so long, with no way to escape, but all was about to change. Luckily you’ve been ready to change, ready to see what opportunities awaited and striving for answers.
        After a short walk, you’ve reached your destination. A large transit ship was already waiting on the platform, different people embarking it.
        You took one last glance at the boring cityscape before the ship took off, myriads of stars temporarily blurring your vision with all the colors. In a matter of a mere hour it reached your local space port, with ships of all sorts and sizes circling it. More of them were sticking out of many dock ports the station had. Most of them belonged to Rushers - an intergalactic term for participants of Planetary Rush.
        Few more minutes passed, before your ship arrived at the port and you got off it, finally getting to the customs.
        `,
        options: [
            {
                text: "Give them your name",
                eventEffect() {
                    const player = Session.currentPlayer;
                    player.addCredit(2000);
                    player.addItem("DocDor Corp Scourge Mug");
                    player.addItem("Metal baton");
                    player.addItem("Pistol");
                    player.addItem("Personal jump pack");
                    player.addItem("Personal rookie suit");
                    player.updateInventoryDisplay()
                },
                nextText: 9
            },
        ]
    },

    {
        id: 9,
        text: `“Give them your name” \n
        As you give them your name and surprisingly get what the exact list of what was offered in the mail, you are surprised by your PDA opening on its own with a short message:

        “ Told ya, that we’ll turn your life around, dear friend. Have some fun exploring the space station, and then drop by the shipyard, we have some ships prepared for you, just pick the one which suits you best and it's yours.

        Writing this with a smile,
        DocDor CEO”
        `,
        options: [
            {
                text: "Well, that was strange",
                eventEffect() {
                    const player = Session.currentPlayer;
                    player.journal.addEntry("Journey begins!","You are set up and ready to begin your journey.","note")
                    player.updateJournalDisplay()
                },
                nextText: 0
            },
        ]
    },
    {
        id: 10,
        text: `“Approached by some weird guys” \n
        -Hey brother, I see you’re a new addition to the rusher community. Wanna go hang out with some of the old school rushers and hear their wisdom? - Just as suddenly, as he approached you he pulled a gun out, and pointed it at you.
        -Not like you have a chance to say no, but I guess we'll see how dumb are ya.
        `,
        options: [
            {
                text: "Fight him",
                eventEffect() {
                    handleStartBattle("bandit",1,1);
                },
                nextText: 0
            },
            {
                text: "Comply",
                eventEffect() {
                    const player = Session.currentPlayer
                    player.inventory = new Map()
                    player.updateInventoryDisplay()
                    player.params.health = 5
                    player.updateStats()
                    player.stats.charisma = 1
                    player.updateStats()
                    player.removeCredit(2050,'remove')
                    player.journal.addEntry("Rape","You were robed and raped...","note")
                    player.updateJournalDisplay()
                },
                nextText: 11
            },
        ]
    },
    {
        id: 11,
        text: `As they drag you away from main traffic areas, they drug and rape you senseless and take all your belongings(Read: Route not implemented yet)
        `,
        options: [
            {
                text: "Well that sucks",
                eventEffect(){

                },
                nextText: 0
            },
        ]
    },
]