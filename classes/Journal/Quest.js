import Entry from "./Entry.js";

class Quest extends Entry{
    constructor(id,name,description,type, data) {
        super(id,name,description,type);
        this.reward = data.reward;
        this.location = location; //{planet,region,{cords}}
        this.difficulty = data.difficulty;
        this.questGiver = data.questGiver;
        this.questType = data.questType;
        this.questID = data.questID;
        this.timeLimit = data?.timeLimit;
        this.status = "started"; //started, completed, failed
    }
    getReward(){
        return this.reward;
    }
    getLocation(){
        return this.location;
    }
    getDifficulty(){
        return this.difficulty;
    }
    getQuestGiver(){
        return this.questGiver;
    }
    getQuestType(){
        return this.questType;
    }
    getQuestID(){
        return this.questID;
    }
    getTimeLimit(){
        return this.timeLimit;
    }
    getStatus(){
        return this.status;
    }
    setStatus(status){
        this.status = status;
    }
}

export default Quest;