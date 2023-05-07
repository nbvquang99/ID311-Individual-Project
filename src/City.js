import { CURSOR_SIZE, BULLET_HOLE_SIZE, BULLET_DURATION } from './Constants.js';
import { Subject } from './Subject';

// Assets
import cursor from '../data/cursor.png';
import bulletHole from '../data/bulletHole.png';
import shot from '../data/shot.mp3';
import empty from '../data/empty.mp3';

class City extends Subject  {
	constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.city = new Sprite(x, y, );
        
    }

	draw() {
        if (this.cursor != null) {
            imageMode(CENTER);
            image(this.cursor, mouseX, mouseY, CURSOR_SIZE, CURSOR_SIZE);
            for (let bullet of this.bullets) {
				bullet.draw();
			}
        }
    }

    reload() {
        this.bullets = [];
        this.remainingShots = this.totShots;
        this.notifySubscribers("gun", this.x, this.y, this.getRemainingShots());
    }

    getRemainingShots() {
        return this.remainingShots;
    }

    shoot() {
        if (this.remainingShots <= 0) {
			if (this.emptySound != null) {
				this.emptySound.play();
			}
        } else {
			this.remainingShots--;
			this.x = mouseX + random(-30, 30);
			this.y = mouseY + random(-30, 30);
			this.bullets.push(new Bullet(this.x, this.y));
			if (this.shotSound != null) {
				this.shotSound.play();
			}
		}
        this.notifySubscribers("gun", this.x, this.y, this.getRemainingShots());
    }
}


// Bullet
class Bullet {
	constructor(x, y) {
        this.img = loadImage(bulletHole);
        this.visible = true;
        this.x = x;
        this.y = y;
        setTimeout(() => {
            this.visible = false;
        }, BULLET_DURATION);
    }

    draw() {
		if (this.visible && this.img != null) {
			imageMode(CENTER);
        	image(this.img, this.x, this.y, BULLET_HOLE_SIZE, BULLET_HOLE_SIZE);
		}
	}
}


export { Gun };
