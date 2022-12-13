class Appearance {
    constructor(sex, eyes, hair, height, build, job) {
        this.sex = sex;
        this.eyes = eyes;
        this.hair = hair;
        this.height = height;
        this.build = build;
        this.job = job;
    }
  
      updateAppearance() {
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

export default Appearance;