const jobs={
    miner : {
        name: "Miner",
        params:{health:20, defense:0, attack:3, speed:1},
        stats:{strength:6,dexterity:9,intellect:4,agility:6,charisma:5},
        percs:[{name:"Mining",level:1},{name:"Smithing",level:1}],
        startingPlanet:"terrestrialPlanet"
    },

    privateMilitaryContractor :  {
        name: "Private Military Contractor",
        params:{health:30, defense:5, attack:5, speed:3},
        stats:{strength:8,dexterity:5,intellect:3,agility:7,charisma:6},
        percs:[{name:"Combat",level:1},{name:"Leadership",level:1}],
        startingPlanet:"terrestrialPlanet"
    },

    thinkTankAssistant : {
        name: "Think Tank Assistant",
        params:{health:15, defense:-2, attack:1, speed:1},
        stats:{strength:3,dexterity:3,intellect:8,agility:5,charisma:8},
        percs:[{name:"Research",level:1},{name:"Negotiation",level:1}],
        startingPlanet:"terrestrialPlanet"
    }
}

export default jobs