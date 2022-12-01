class Terrain {
    constructor(name,symbol, x, y, color,img,width,height,style="",description="No data") {
        this.color = color;
        this.symbol = symbol;
        this.x = x;
        this.y = y;
        this.name = name;
        this.img = img;
        this.width = width;
        this.height = height;
        this.style = style;
        this.cluster = false;
        this.description = description;
    }
    addToCluster(clusterNr) {
        this.cluster = true;
        this.clusterNr = clusterNr;
    }
    destroy() {
        this.symbol = ' ';
        this.img = '/img/fire.png';
        this.description = 'This place was destroyed';
    }
    landAt() {
        this.terrImg = this.img;
        this.terrDescription = this.description;
        this.img = '/img/rocket.png';
        this.description = 'This is your rocket';
    }
    landOff() {
        this.img = this.terrImg;
        this.description = this.terrDescription;
    }
}

export default Terrain;