import Area from "./Area.js";

class Colony {
    constructor(name=new Date().getTime().toString(),location,description="No data",ownedBy=null) {
        this.name = name;
        this.description = description;
        this.location = location;
        this.ownedBy = ownedBy;
        this.area = new Area(
            `${this.name} CORE`,
            {planet:this.location.planet,region:this.location.region,colony: this.name},
        )
        this.speciality = this.area.speciality
    }

    handleEnterArea(){
        return this.area.handlePlayerArrival()
    }

    getArea(){
        return this.area
    }

    getSpeciality(){
        return this.speciality
    }

}

export default Colony