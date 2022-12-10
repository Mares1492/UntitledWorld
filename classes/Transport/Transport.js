class Transport {
  constructor(name,location=null,owner=null,img="",size=15,alt="[<|=|>]") {
    this.name = name;
    this.passengers = [];
    this.location = location;
    this.owner = owner;
    this.img = img;
    this.size = size;
    this.alt = alt;
    console.log(`${this.name} is created and ready to go!`);
  }
  setOwner(owner) {
    this.owner = owner;
  }
  addPassenger(p) {
    this.passengers.push(p);
  }
}

export default Transport;
