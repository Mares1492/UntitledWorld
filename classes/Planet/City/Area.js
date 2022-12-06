const cityElements = {
    cityBuilding: {
        symbol:'|^|',
        width:"23",
        height:"23",
        color: '#606060',
        imgVariation:["img/city/buildings/background","img/city/buildings/background2","img/city/buildings/background3",
            "img/city/buildings/background4","img/city/buildings/background5","img/city/buildings/background6",
            "img/city/buildings/background7"
        ],
        name:"City Building",
        description:"Some kind of city building"},

    bridge: {symbol:'=',color: '#383838',img:"img/bridge.png",width:"30",height:"30",name:"Bridge"},
    road: {symbol:'─',color: '#A0A0A0',img:"img/roads/road.png",width:"30",height:"30",name:"road"},
    water: {symbol:'~',color: '#F8F8F8',img:"img/water.png",width:"35",height:"35",style:"opacity: 0.5;",name:"Water"},
};

class Area {
    constructor(name=new Date().getTime().toString(),description="no data",location="no data",size={x:24,y:12}) {
        this.name = name;
        this.description = description;
        this.location = location;
        this.factions = [];
        this.size = size;
    }
    generateArea() {
        if (!this.area){
            this.area = [];
            for (let y = 0; y < this.size.y; y++) {
                this.area.push([]);
                for (let x = 0; x < this.size.x; x++) {
                    this.area[x].addElement(cityElements.cityBuilding, x, y);
                }
            }
        }
        else {
            console.log("Area already generated");
        }
    }
    addElement(element,x,y) {
        this.area[x][y] = element;
    }
}
