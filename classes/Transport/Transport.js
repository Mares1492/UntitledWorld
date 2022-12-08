class Transport {
  constructor(name,speed,passengers=[],location=null,destination=null,owner=null,x=null,y=null,img,size=15,alt="[<|=|>]") {
    this.name = name;
    this.speed = speed;
    this.passengers = passengers;
    this.location = location;
    this.destination = destination;
    this.owner = owner;
    this.x = x;
    this.y = y;
    this.img = img;
    this.size = size;
    this.alt = alt;
    console.log(`${this.name} is created and ready to go!`);
  }
  addPassenger(p) {
    this.passengers.push(p);
  }
}

export default Transport;
