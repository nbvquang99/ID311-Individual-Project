import { AIRDROP_HEIGTH, AIRDROP_WIDTH, WINDOW_HEIGHT } from './Constants.js';
import { loadAndScale, loadMultiAndScale } from './Util.js';

// Assets
import airdropImg from '../assets/airdrop.png';

class Airdrop {
	constructor(x) {
        this.airDrop = new Sprite(x, -10, 50, 'kinematic');
        loadAndScale(airdropImg, AIRDROP_WIDTH, AIRDROP_HEIGTH).then((loadedImg) => {
            this.airDrop.addAnimation("airdrop", loadedImg);
        });
        this.airDrop.speed = 0;
        this.airDrop.direction = 90;
        this.airDrop.autoDraw = false;
        this.airDrop.pixelPerfect = true;
    }

    airDropLaunch() {
        this.airDrop.speed = 2;
        this.draw();
    }

    airDropExploded() {
        this.airDropReset(true);
    }

    airDropReset(isBlown) {
        if (isBlown || this.airDrop.y > WINDOW_HEIGHT + 20) {
            this.airDrop.y = -10;
            this.airDrop.speed = 0;
            this.unDraw();
        }
    }

    getSprite() {
        return this.airDrop;
    }

    isHit(objArr) {
        for (let i = 0; i<objArr.length; i++) {
            if (this.airDrop.collides(objArr[i].getSprite())) return i;
        }
        return -1;
    }

	draw() {
        this.airDrop.autoDraw = true;
    }

    unDraw() {
        this.airDrop.autoDraw = false;
    }
}

export { Airdrop };