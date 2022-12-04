class Character {
  constructor(name, params = {}, level=1, status="alive", location=null, stats={}) {
      this.name = name;
      this.params = params;
      this.level = level;
      this.status = status;
      this.location = location;
      this.stats = stats;

  }

    handleAttack() {
        console.log(`${this.name} attacks! ${this.params.attack} damage!`);
    }
    die() {
        console.log(`${this.name} dies!`);
        this.status = "dead";
    }
    loseHealth(dmg) {
        console.log(`${this.name} loses health!`);
        this.health -= dmg;
        if (this.health <= 0) {
            this.die();
        }
    }

}

export default Character;