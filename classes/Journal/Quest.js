import Entry from "./Entry.js";

class Quest extends Entry{
    constructor(name,description,type, data) {
        super(name,description,type);
        this.reward = data.reward;
        this.location = location; //{planet,region,{cords}}
        this.difficulty = data.difficulty;
        this.questGiver = data.questGiver;
        this.questType = data.questType;
        this.questID = data.questID;
        this.timeLimit = data?.timeLimit;
        this.status = "started"; //started, completed, failed
    }
}

export default Quest;