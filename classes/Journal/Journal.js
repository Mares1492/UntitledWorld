import Quest from "./Quest.js";
import Note from "./Note.js";

class Journal{
    constructor(owner){
        this.owner = owner;
        this.entries = new Map();
    }
    addEntry(name,text,type,data){
        if (type === 'note'){
            this.entries.set(name, new Note(name,text,type));
        }
        if (type === 'quest'){
            this.entries.set(name, new Quest(name,text,type,data));
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
