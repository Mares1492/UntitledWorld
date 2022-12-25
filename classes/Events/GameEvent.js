class GameEvent{
    static eventList = new Map();
    constructor(id,content,options){
        this.id = id;
        this.options = options;
        this.page = 0;
        this.pages = this.splitByPages(content);
        console.log(this.pages);
        GameEvent.eventList.set(this.id,this);

    }
    splitByPages(text){
        return text.split(".").map(sentence => sentence+".");
    }
    static getEvent(id){
        if (GameEvent.eventList.has(id)){
            return GameEvent.eventList.get(id);
        }
        console.error("Event not found");
        return false;
    }
    trigger(){
        console.log(`Event ${this.id} triggered`);
    }
}

export default GameEvent;