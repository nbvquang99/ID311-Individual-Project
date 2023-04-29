import { CURSOR_SIZE, BULLET_HOLE_SIZE, BULLET_DURATION } from './Constants.js';
import { Subject } from './Subject';

// Assets
import cursor from '../data/cursor.png';
import bulletHole from '../data/bulletHole.png';
import shot from '../data/shot.mp3';
import empty from '../data/empty.mp3';

class Gun extends Subject  {
	constructor(totShots) {
        super();
        noCursor();
        this.cursor = loadImage(cursor);
        this.shotSound = loadSound(shot);
        this.emptySound = loadSound(empty);
        this.totShots = totShots;
        this.reload();
        this.x = 0;
        this.y = 0 ;
    }

  // TO DO
}


// Bullet
class Bullet {
  
  // TO DO
}


export { Gun };
