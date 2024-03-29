class Character {
  constructor(name, params = {}, level=1, status="alive", location=null, stats={}) {
      this.name = name;
      this.params = params;
      this.level = level;
      this.status = status;
      this.location = location;
      this.stats = stats;
      this.currentHealth = params.health;
  }

    getStatus() {
      return this.status;
    }

    handleAttack() { //TODO: add attack logic(buffs, items, etc)
        return this.params.attack;
    }
    handleDefense(dmg) {
        this.loseHealth(dmg-this.params.defense);
    }
    die() {
        console.log(`${this.name} dies!`);
        this.status = "dead";
    }
    loseHealth(dmg) {
        console.log(`${this.name} loses health!`);
        this.currentHealth -= dmg;
        if (this.currentHealth <= 0) {
            this.currentHealth = 0
            this.die();
        }
    }
    getHealth() {
        return this.currentHealth;
    }
    getMaxHealth() {
        return this.params.health;
    }

}

export default Character;
