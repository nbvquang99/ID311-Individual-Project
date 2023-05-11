import { BULLET_HEIGTH, BULLET_WIDTH, EXPLOSION_RADIUS } from './Constants.js';
import { loadAndScale, loadMultiAndScale } from './Util.js';

// Assets
import bulletImg from '../assets/rockets/missile.png';

class Bullet {
	constructor() {
        this.isSuper = false;
        this.shooting = false;
        this.bullet = new Sprite(width/2, height, EXPLOSION_RADIUS, 'none');
        loadMultiAndScale(10, "assets/explosions/expl", ".png").then((loadedArr)=>{
            this.bullet.addAnimation("explosion", ...loadedArr);
            this.bullet.animation.noLoop();
        });
        loadAndScale(bulletImg, BULLET_WIDTH, BULLET_HEIGTH).then((loadedImg) => {
            this.bullet.addAnimation("bullet", loadedImg);
            this.bullet.changeAnimation("bullet");
        });
        this.bullet.autoDraw = false;
        this.bullet.pixelPerfect = true;
    }

    bulletShoot() {
        if (!this.shooting) {
            this.shooting = true;
            this.bullet.collider = "dynamic";
            this.bullet.rotateTo(mouse, 100, 0)
            this.draw();
            this.bullet.moveTo(mouse, 15).then((res) => {
                if (res) this.bulletExploded();
                else this.bulletExploded();
            });
        }
    }

    bulletExploded() {
        return new Promise((resolve, reject) => {
            this.bullet.collider = "static";
            this.shooting = false;
            if (this.bullet.animation.name != "explosion") {
                this.bullet.changeAnimation("explosion").then((res) => {
                    this.bullet.remove();
                });
            }
            resolve();
        });
    }

    bulletReset() {
        this.unDraw();
        this.shooting = false;
        this.bullet.animation.rewind().then(()=> {
            console.log(this.bullet.animation);
            this.bullet.changeAnimation("bullet");
            
        });
        this.bullet.x = width/2;
        this.bullet.y = height;
        this.bullet.collider = "none";
    }

    getSprite() {
        return this.bullet;
    }

	draw() {
        this.bullet.autoDraw = true;
    }

    unDraw() {
        this.bullet.autoDraw = false;
    }
}

export { Bullet };