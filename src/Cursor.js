import { CURSOR_SIZE } from './Constants.js';

// Assets
import cursorImg from '../assets/crosshair/crosshair.png';
import { loadAndScale } from './Util.js';

class Cursor {
	constructor(totShots) {
        loadAndScale(cursorImg, CURSOR_SIZE, CURSOR_SIZE).then((loadedImg) => {
            this.cursorImg = loadedImg;
        });
    }

	draw() {
        noCursor();
        if (this.cursorImg != null) {
            imageMode(CENTER);
            image(this.cursorImg, mouseX, mouseY, CURSOR_SIZE, CURSOR_SIZE);
        }
    }

    unDraw() {
        cursor();
    }
}

export { Cursor };