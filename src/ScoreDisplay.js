import { BULLET_SIZE, FONT_SIZE } from './Constants.js';
import { Gun } from './Gun.js';
import { Target } from './Target';

import bullet from '../data/bullet.png';

class ScoreDisplay {
	// TO DO
	constructor(inititalBullets) {
		this.img = loadImage(bullet);
		this.resetScore();
		this.setBullets(inititalBullets);
	}
	
	draw() {
		for (let i = 0; i < this.shotLeft; i++)
			image(this.img, width - BULLET_SIZE - BULLET_SIZE * i, BULLET_SIZE, BULLET_SIZE, BULLET_SIZE);
		fill(255, 0, 0);
		textFont("Arial", FONT_SIZE);
		text(`Score: ${this.score}`, 12, FONT_SIZE);
	}

	resetScore() {
		this.score = 0;
	}

	addScore(scoreToAdd) {
		this.score += scoreToAdd;
	}

	setBullets(numBullets) {
		this.shotLeft = numBullets;
	}

	update(source, ...others) {
		if (source == "gun") {
			const [x, y, remainingShots] = others;
			this.setBullets(remainingShots)
		} else if (source == "target") {
			const [points] = others;
			this.addScore(points)
		}
	}
}

export { ScoreDisplay };
