class Entry{
    static entries = new Map();
    constructor(id,name,description,type){
        this.id = id;
        this.name = name;
        this.description = description;
        this.type = type;
        this.date = new Date().toLocaleString();
    }
}

export default Entry;
