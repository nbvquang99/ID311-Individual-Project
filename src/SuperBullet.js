import { EXPLOSION_RADIUS, SUPER_BULLET_HEIGTH, SUPER_BULLET_WIDTH } from './Constants.js';
import { loadAndScale, loadMultiAndScale } from './Util.js';

// Assets
import bulletImg from '../assets/rockets/superMissile.png';

class SuperBullet {
	constructor() {
        this.isSuper = true;
        this.shooting = false;
        this.bullet = new Sprite(width/2, height, EXPLOSION_RADIUS*2, 'none');
        loadMultiAndScale(10, "assets/explosions/expl", ".png").then((loadedArr)=>{
            this.bullet.addAnimation("explosion", ...loadedArr);
            this.bullet.animation.scale.x = 2;
            this.bullet.animation.scale.y = 2;
            this.bullet.animation.noLoop();
        });
        loadAndScale(bulletImg, SUPER_BULLET_WIDTH, SUPER_BULLET_HEIGTH).then((loadedImg) => {
            this.bullet.addAnimation("bullet", loadedImg);
            this.bullet.changeAnimation("bullet");
        });
        this.bullet.autoDraw = false;
    }

    bulletShoot() {
        if (!this.shooting) {
            this.shooting = true;
            this.bullet.collider = "dynamic";
            this.bullet.rotateTo(mouse, 100, 0)
            this.draw();
            this.bullet.moveTo(mouse, 15).then((res) => {
                if (res) this.bulletExploded();
            });
        }
    }

    bulletExploded() {
        this.bullet.collider = "static";
        if (this.bullet.animation.name != "explosion") {
            this.bullet.changeAnimation("explosion").then((res) => {
                // this.bulletReset();
                this.bullet.remove();
            });
        }
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

export { SuperBullet };