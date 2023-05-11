import { CITY_HEIGHT, CITY_WIDTH } from './Constants.js';
import { loadAndScale } from './Util.js';

// Assets
import fireImg from '../assets/fire/fire.gif';

class Fire {
	constructor(x, y) {
        this.fire = new Sprite(x, y+20, CITY_WIDTH, CITY_HEIGHT, "none");
        loadAndScale(fireImg, CITY_WIDTH, CITY_HEIGHT).then((loadedImg) => {
            this.fire.addAnimation("fire", loadedImg);
        });
        this.fire.autoDraw = false;
    }

	drawFire() {
        this.fire.autoDraw = true;
    }

    unDrawFire() {
        this.fire.autoDraw = false;
    }
}

export { Fire };