import { Subject } from './Subject';
import { Gun } from './Gun';

import teddy from '../data/teddy.png';
import duck from '../data/duck.png';
import squirrel from '../data/squirrel.png';

class Target extends Subject {
	// TO DO
	constructor(x, y, width) {
        super();
        this.visible = true;
        this.x = x;
        this.y = y;
        this.width = width,
        this.height = 0;
        this.img = null;
    }

    getPoints() {
        return 0;
    }

    draw() {
		if (this.visible && this.img!=null) {
			imageMode(CENTER);
        	image(this.img, this.x, this.y, this.width, this.height);
		}
    }

    isHit(x, y) {
		if (x < this.x - this.width/2) return false;
		if (x > this.x + this.width/2) return false;
		if (y < this.y - this.height/2) return false;
		if (y > this.y + this.height/2) return false;
		return true;
    }

    shoot(x, y) {
		if (this.visible && this.isHit(x, y)) {
			this.visible = false;
        	this.notifySubscribers("target", this.getPoints());
		}
    }

    update(source, ...others) {
        if (source == "gun") {
            const [x, y, remainingShots] = others;
			if (remainingShots >= 0) {
				this.shoot(x, y);
			}
        }
    }
}

// TO DO
// class TeddyTarget ...
class TeddyTarget extends Target {
    constructor(x, y, width) {
        super(x, y, width);
        this.img = loadImage(teddy, () => {
            this.height = this.img.height * (this.width / this.img.width);
        });
    }

    getPoints() {
        return 1;
    }
}

// class DuckTarget ...
class DuckTarget extends Target {
    constructor(x, y, width) {
        super(x, y, width);
        this.img = loadImage(duck, () => {
            this.height = this.img.height * (this.width / this.img.width);
        });
    }
	
    getPoints() {
        return 3;
    }
}

// class SquirrelTarget ...
class SquirrelTarget extends Target {
    constructor(x, y, width) {
        super(x, y, width);
        this.img = loadImage(squirrel, () => {
            this.height = this.img.height * (this.width / this.img.width);
        });
    }
	
    getPoints() {
        return 5;
    }
}

class TargetFactory {
	// TO DO
	static getInstance() {
		if (!this.instance) {
			this.instance = new TargetFactory();
		}
        return this.instance;
    }

    getTargetsByName(targetNames, targerWidth, y) {
		const tmp = (targetNames.length - 1) * targerWidth * 1.5;
        const tmp2 = (width - tmp) / 2;
		let res = [];
		let i = 0;
		for (let target of targetNames) {
			if (target === "teddy") res.push(new TeddyTarget(tmp2 + i * targerWidth * 1.5, y, targerWidth));
			if (target === "duck") res.push(new DuckTarget(tmp2 + i * targerWidth * 1.5, y, targerWidth));
			if (target === "squirrel") res.push(new SquirrelTarget(tmp2 + i * targerWidth * 1.5, y, targerWidth));
			i++;
		}
        return res;
    }

    getRandomTargets(numTargets, targerWidth, y) {
        const samples = ["teddy", "squirrel", "duck"];
		let res = [];
		for (let i=0; i<numTargets; i++) {
			res.push(samples[Math.floor(random() * 3)]);
		}
        // console.log(res);
        return this.getTargetsByName(res, targerWidth, y);
    }
}

export { Target, TargetFactory };
