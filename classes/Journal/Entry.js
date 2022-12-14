class Entry{
    constructor(name,description,type){
        this.name = name;
        this.description = description;
        this.type = type;
        this.date = new Date().toLocaleString();
    }
}

export default Entry;
