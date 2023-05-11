import { ATTACKER_HEIGTH, ATTACKER_WIDTH, BOSS_HEALTH, WINDOW_HEIGHT, WINDOW_WIDTH } from './Constants.js';
import { loadAndScale, loadMultiAndScale } from './Util.js';

// Assets
import bossImg from '../assets/boss/ufo.png';
import bossAmmoImg from '../assets/boss/bossAttack.gif';
import bossSmokeImg from '../assets/boss/bossSmoke.gif';
import bossExplodedImg from '../assets/boss/bossExplode.gif';

class Boss {
	constructor() {
        loadAndScale(bossAmmoImg, 70, 70).then((loadedImg) => {
            this.ammoImg = loadedImg;
        });
        this.attackShown = false;
        this.health = BOSS_HEALTH;
        this.ammoArr = [];
        this.shadow = new Sprite(WINDOW_WIDTH/2, 100, 115.5, 'none');
        this.smoke = new Sprite(WINDOW_WIDTH/2, 50, 115.5, 'none');
        this.explosion = new Sprite(WINDOW_WIDTH/2, 100, 115.5, 'none');
        this.ufo = new Sprite(WINDOW_WIDTH/2, 100, 553.6, 232, 'none');
        this.ufo.spriteSheet = bossImg;
        this.ufo.offset.x = 0;
        loadMultiAndScale(10, "assets/explosions/expl", ".png").then((loadedArr)=>{
            this.explosion.addAnimation("explosion", ...loadedArr);
            this.explosion.animation.noLoop();
            this.explosion.animation.scale = 6;
            this.explosion.animation.frameDelay = 8;
        });
        this.ufo.addAnis({
            ufo: { row: 0, frames: 3, frameDelay: 15}
        });
        loadAndScale(bossSmokeImg, 150, 150).then((loadedImg) => {
            this.smoke.addAnimation("smoke", loadedImg);
        });
        this.ufo.animation.scale = 0.5;
        this.ufo.autoDraw = false;
        this.shadow.autoDraw = false;
        this.explosion.autoDraw = false;
        this.smoke.autoDraw = false;
        this.ufo.pixelPerfect = true;
    }

    isHitUfo(objArr) {
        let res = [];
        for (let i = 0; i<objArr.length; i++) {
            if (this.shadow.collides(objArr[i].getSprite())) res.push(i);
        }
        return res;
    }

    isHitAmmo(i, objArr) {
        for (let j = 0; j<objArr.length; j++) {
            if (this.ammoArr[i].getSprite().collides(objArr[j].getSprite())) {
                this.ammoArr[i].getSprite().remove();
                this.ammoArr.splice(i, 1);
                return j;
            }
        }
        return -1;
    }

    async randomSequence() {
        let x = random(138, WINDOW_WIDTH-138);
        let y = random(58, WINDOW_HEIGHT/2);
        this.shadow.moveTo(x, y, 4);
        this.smoke.moveTo(x, y-50, 4);
        this.explosion.moveTo(x, y, 4);
        await this.ufo.moveTo(x, y, 4);
        await this.shoot(x, y);
        this.randomSequence();
    }

    shoot(x, y) {
        return new Promise((resolve, reject) => {
            this.ammoArr.push(new Ammo(x, y, this.ammoImg, this.attackShown));
            this.ammoArr.push(new Ammo(x, y, this.ammoImg, this.attackShown));
            resolve();
        });
    }

    getSprite() {
        return this.ufo;
    }

    unDrawAttack() {
        for (let i=0; i<this.ammoArr.length; i++) {
            this.ammoArr[i].unDraw();
        }
    }

    async drawExplosion() {
        this.shadow.collider = "none";
        this.ufo.autoDraw = false;
        this.shadow.autoDraw = false;
        this.smoke.autoDraw = false;
        this.explosion.autoDraw = true;
        await this.explosion.animation.rewind();
        return this.explosion.animation.play();
    }

	draw() {
        this.attackShown = true;
        this.shadow.collider = "kinematics";
        this.ufo.autoDraw = true;
        this.shadow.autoDraw = true;
        if (this.health <= BOSS_HEALTH/2) this.smoke.autoDraw = true;
    }

    unDraw() {
        this.shadow.collider = "none";
        this.ufo.autoDraw = false;
        this.shadow.autoDraw = false;
        this.smoke.autoDraw = false;
        this.explosion.autoDraw = false;
        this.unDrawAttack();
    }

    bossReset() {
        this.attackShown = false;
        this.ammoArr = [];
        this.health = BOSS_HEALTH;
        this.stopMoving = false;
        this.unDraw();
    }
}

class Ammo {
    constructor(x, y, img, shown) {
        this.ammo = new Sprite(x, y+50, 70, 70, "kinematic");
        this.ammo.addAnimation("ammo", img);
        this.ammo.animation.frameDelay = 1;
        this.ammo.direction = random(40, 150);
        this.ammo.pixelPerfect = true;
        this.ammo.speed = 5;
        this.ammo.autoDraw = shown;
        if (!shown) this.ammo.collider = "none";
    }
    getSprite() {
        return this.ammo;
    }
    unDraw() {
        this.ammo.collider = "none";
        this.ammo.autoDraw = false;
    }
}

export { Boss };