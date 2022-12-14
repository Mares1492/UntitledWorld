import Entry from "./Entry.js";

class Note extends Entry {
    constructor(title, description,type) {
        super(title, description,type);
    }
}

export default Note;