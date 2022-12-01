class Character {
  constructor(name, health=10, defense=0, attack=0, speed=0, level=1, status="alive", location=null,stats={}) {
      this.name = name;
      this.health = health;
      this.defense = defense;
      this.attack = attack;
      this.speed = speed;
      this.level = level;
      this.status = status;
      this.location = location;
      this.stats = stats;

  }
    handleAttack() {
        console.log(`${this.name} attacks! ${this.attack} damage!`);
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