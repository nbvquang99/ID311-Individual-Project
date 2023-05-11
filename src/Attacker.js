import { ATTACKER_HEIGTH, ATTACKER_WIDTH, WINDOW_HEIGHT, WINDOW_WIDTH } from './Constants.js';
import { loadAndScale, loadMultiAndScale } from './Util.js';

// Assets
import smokeImg from '../assets/rockets/smoke.png';

class Attacker {
	constructor(speedMin, speedMax) {
        this.rocket = new Sprite(random(0,WINDOW_WIDTH), 0, 80, 10, 'kinematic');
        loadMultiAndScale(10, "../assets/explosions/expl", ".png").then((loadedArr)=>{
            this.rocket.addAnimation("explosion", ...loadedArr);
            this.rocket.animation.noLoop();
        });
        loadAndScale(smokeImg, ATTACKER_WIDTH, ATTACKER_HEIGTH).then((loadedImg) => {
            this.rocket.addAnimation("rocket", loadedImg);
            this.rocket.changeAnimation("rocket");
        });
        this.speed = random(speedMin, speedMax);
        this.angle = random(45, 160);
        this.rocket.rotation = this.angle;
        this.rocket.direction = this.angle;
        this.rocket.autoDraw = false;
        this.rocket.pixelPerfect = true;
    }

    rocketLaunch() {
        this.rocket.speed = this.speed;
    }

    rocketExploded() {
        this.rocket.changeAnimation("explosion").then(()=>{
            this.rocketReset();
        });
    }

    rocketReset(isInit) {
        if (isInit || this.rocket.y > WINDOW_HEIGHT+10 || (this.rocket.animation.name == "explosion" && this.rocket.animation.frame == 9)) {
            this.rocket.changeAnimation("rocket");
            this.rocket.x = random(0,width);
            this.rocket.y = -100;
            this.angle = random(45, 160);
            this.rocket.rotation = this.angle;
            this.rocket.direction = this.angle;
            this.rocket.speed = 0;
        }
    }

    getSprite() {
        return this.rocket;
    }

    isHit(objArr) {
        for (let i = 0; i<objArr.length; i++) {
            if (this.rocket.collides(objArr[i].getSprite())) return i;
            if (this.rocket.colliding(objArr[i].getSprite())) return i;
            if (this.rocket.collided(objArr[i].getSprite())) return i;
        }
        return -1;
    }

    isHitMulti(objArr) {
        let res = [];
        for (let i = 0; i<objArr.length; i++) {
            if (this.rocket.collides(objArr[i].getSprite())) res.push(i);
            // if (this.rocket.colliding(objArr[i].getSprite())) return i;
            // if (this.rocket.collided(objArr[i].getSprite())) return i;
        }
        return res;
    }

	draw() {
        this.rocket.autoDraw = true;
    }

    unDraw() {
        this.rocket.autoDraw = false;
    }
}

export { Attacker };