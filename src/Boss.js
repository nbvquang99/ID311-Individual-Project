import { ATTACKER_HEIGTH, ATTACKER_WIDTH, WINDOW_HEIGHT, WINDOW_WIDTH } from './Constants.js';
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
        this.health = 5;
        this.ammoArr = [];
        this.shadow = new Sprite(WINDOW_WIDTH/2, 100, 115.5, 'none');
        this.smoke = new Sprite(WINDOW_WIDTH/2, 50, 115.5, 'none');
        this.explosion = new Sprite(WINDOW_WIDTH/2, 100, 115.5, 'none');
        this.ufo = new Sprite(WINDOW_WIDTH/2, 100, 553.6, 232, 'none');
        this.ufo.spriteSheet = bossImg;
        this.ufo.offset.x = 0;
        loadAndScale(bossExplodedImg, 50, 50).then((loadedImg) => {
            this.explosion.addAnimation("explosion", loadedImg);
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
        this.draw();
        let x = random(138, WINDOW_WIDTH-138);
        let y = random(58, WINDOW_HEIGHT/2);
        this.shadow.moveTo(x, y, 4);
        this.smoke.moveTo(x, y-50, 4);
        await this.ufo.moveTo(x, y, 4);
        await this.shoot(x, y);
        this.randomSequence();
    }

    shoot(x, y) {
        return new Promise((resolve, reject) => {
            this.ammoArr.push(new Ammo(x, y, this.ammoImg));
            this.ammoArr.push(new Ammo(x, y, this.ammoImg));
            resolve();
        });
    }

    getSprite() {
        return this.ufo;
    }

	draw() {
        this.shadow.collider = "kinematics";
        this.ufo.autoDraw = true;
        this.shadow.autoDraw = true;
        if (this.health < 3) this.smoke.autoDraw = true;
    }

    unDraw() {
        this.ufo.autoDraw = false;
        this.shadow.autoDraw = false;
    }
}

class Ammo {
    constructor(x, y, img) {
        this.ammo = new Sprite(x, y+50, 70, 70, "kinematic");
        this.ammo.addAnimation("ammo", img);
        this.ammo.animation.frameDelay = 1;
        this.ammo.direction = random(40, 150);
        this.ammo.pixelPerfect = true;
        this.ammo.speed = 5;
    }
    getSprite() {
        return this.ammo;
    }
    draw() {
        this.ammo.autoDraw = true;
    }
    unDraw() {
        this.ammo.autoDraw = false;
    }
}

export { Boss };