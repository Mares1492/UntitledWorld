import Entry from "./Entry.js";

class Note extends Entry {
    constructor(id,name, description,type) {
        super(id,name, description,type);
    }
}

export default Note;