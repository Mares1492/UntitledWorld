class Faction {
    static factions = new Map();
    constructor(name, color) {
        this.name = name;
        this.color = color;
        this.areas = [];
        this.ownedCities = [];
        this.ownedPlanets = [];
        this.ownedRegions = [];
        this.relations = new Map();
        this.addFaction(this);
    }
    static getFaction(factionName) {
        if (Faction.factions.has(factionName)) {
            return Faction.factions.get(factionName);
        }
        console.log(`Faction '${factionName}' does not exist`);
        return false;
    }
    addFaction(faction) {
        if (Faction.factions.has(faction.name)) {
            console.log(`Faction '${faction.name}' already exists`);
            return false;
        }
        Faction.factions.set(faction.name, faction);
        console.log(`Faction '${faction.name}' is added`);
        return true;
    }
}

export default Faction;