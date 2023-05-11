import { ATTACKER_INIT_NUM, BULLET_INIT_NUM, FONT_SIZE } from "./Constants";


class StaticDisplay {
	constructor() {
		this.gameFont = loadFont('../assets/font/gameFont.ttf');
		this.score = 0;
		this.level = 1;
		this.blownEnemies = 0;
		this.bulletNum = BULLET_INIT_NUM;
		this.attackerNum = ATTACKER_INIT_NUM; 
		this.attackerSpeedMin = 1;
		this.attackerSpeedMax = 5;
		this.leaderboard = [{score: 1000}, {score: 1500}];
		localStorage.setItem("leaderboard", JSON.stringify(this.leaderboard));
	}

	saveScore() {
		this.leaderboard.push({score: this.score});
		localStorage.setItem("leaderboard", JSON.stringify(this.leaderboard));
	}
	
	reset() {
		this.score = 0;
		this.level = 1;
		this.blownEnemies = 0;
		this.bulletNum = BULLET_INIT_NUM;
		this.attackerNum = ATTACKER_INIT_NUM;
		this.attackerSpeedMin = 1;
		this.attackerSpeedMax = 5;
	}
	
	drawScore() {
		fill('red');
        textFont(this.gameFont);
        textSize(FONT_SIZE);
        text("SCORE:  "+ this.score, 200, 50);
        text("LEVEL:  "+ this.level, width-400, 50);
	}

	drawCannon() {
		fill(255);
		ellipse(width/2, height, 100, 100);
		fill(0);
		textAlign(CENTER);
		textSize(FONT_SIZE);
		if (this.bulletNum == 0) {
			fill('red');
		}
		else {
			fill('green');
		}
		text(this.bulletNum, width/2, height-10);
	}

	increaseScore(addedScore) {
		this.score += addedScore;
	}

	increaseLevel() {
		this.level++;
		this.attackerSpeedMin++;
		this.attackerSpeedMax++;
		this.attackerNum+=3;
		this.bulletNum+=12;
		this.score+=500*(this.level-1);
	}

	increaseBlownEnemies(x) {
		this.blownEnemies+=x;
	}

	increaseAttackerNum(x) {
		this.attackerNum+=x;
	}

	increaseBulletNum(x) {
		this.bulletNum+=x;
	}
}

export { StaticDisplay };