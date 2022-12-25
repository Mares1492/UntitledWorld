import Quest from "./Quest.js";
import Note from "./Note.js";

class Journal{
    constructor(owner){
        this.owner = owner;
        this.entries = new Map();
    }
    addEntry(name,description,type,data=null){
        switch (type) {
            case "quest":
                this.entries.set(name, new Quest(this.entries.size+1,name, description, type ,data));
                break;
            case "note":
                this.entries.set(name, new Note(this.entries.size+1,name, description, type));
                break;
            default:
                break;
        }
    }
    removeEntry(name){
        this.entries.delete(name);
    }
    getEntry(name){
        return this.entries.get(name);
    }
    getEntries(){
        return this.entries;
    }
    getEntriesByType(type){
        let entries = [];
        for (let entry of this.entries.values()){
            if (entry.type === type){
                entries.push(entry);
            }
        }
        return entries;
    }
}

export default Journal;
