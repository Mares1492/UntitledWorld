class Event{
    static eventList = new Map();
    constructor(id,content,options){
        this.id = id;
        this.options = options;
        this.pages = this.splitByPages(content);
        console.log(this.pages);
        Event.eventList.set(this.id,this);

    }
    splitByPages(text){
        return text.split(".").map(sentence => sentence+".");
    }
    static getEvent(id){
        if (Event.eventList.has(id)){
            return Event.eventList.get(id);
        }
        console.error("Event not found");
        return false;
    }
}

export default Event;