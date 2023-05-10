import { BLOWN_CITY_HEIGHT, CITY_HEIGHT, CITY_WIDTH, WINDOW_HEIGHT } from './Constants.js';
import { Subject } from './Subject';
import { loadAndScale } from './Util.js';

// Assets
import cityImg from '../assets/City.png';
import blownCity from '../assets/explodedCity.png';

class City extends Subject  {
	constructor(x, y) {
        super();
        this.isBlown = false;
        this.x = x;
        this.y = y;
        this.city = new Sprite(x, y, CITY_WIDTH, CITY_HEIGHT, "static");
        loadAndScale(blownCity, CITY_WIDTH, BLOWN_CITY_HEIGHT).then((loadedImg) => {
            this.blownCity = loadedImg;
            this.city.addAnimation("cityBlown", loadedImg);
        });
        loadAndScale(cityImg, CITY_WIDTH, CITY_HEIGHT).then((loadedImg) => {
            this.cityImg = loadedImg;
            this.city.addAnimation("city", loadedImg);
            this.city.changeAnimation("city");
        });
        this.city.autoDraw = false;
    }

    blown() {
        if (!this.isBlown) {
            this.isBlown = true;
            this.city.collider = "static";
            this.city.y = this.y+40;
            this.city.changeAnimation("cityBlown");
        }
    }

    cityReset() {
        this.isBlown = false;
        this.city.x = this.x;
        this.city.y = this.y;
        this.city.changeAnimation("city");
    }

    getSprite() {
        return this.city;
    }

	draw() {
        if (!this.isBlown) this.city.collider = "dynamic";
        this.city.autoDraw = true;
    }

    unDraw() {
        this.city.autoDraw = false;
    }

    update(source, ...others) {
        if (source = "attacker") {
            this.blown();
        }
    }
}

export { City };