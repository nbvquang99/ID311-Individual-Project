import '../css/style.css';

import { MAX_TARGETS, TARGET_WIDTH, TOT_SHOTS } from './Constants.js';
import { ScoreDisplay } from './ScoreDisplay.js';
import { Gun } from './Gun.js';
import { TargetFactory } from './Target.js';

// Globals
let gun;
let score;
let targets = [];

function setup() {
	createCanvas(800, 600);

	// 1. Init gun and score display
	gun = new Gun(TOT_SHOTS);
	score = new ScoreDisplay(TOT_SHOTS);
	// console.log(gun);
	// console.log(score);
	// 2. Init the targets
	initTargets();

	// 3. Subscribe gun
}

function draw() {
	background('#eeeeee');
	// draw targets, gun, bullets, score
	for (let target of targets) target.draw();
	gun.draw();
	score.draw();
}

// Shoot
function mousePressed() {
	// shoot
	gun.shoot();
}

// Spacebar to reload
function keyPressed() {
	if (key === ' ') {
		// reset score and targets
		initTargets();
		gun.reload();
		score.resetScore();
	}
}

// init the targets
function initTargets() {
	// Create new targets from the factory
	// Remember to unsubscribe the previous targets and to subscribe the new ones
	gun.unsubscribeAll();
	gun.subscribe(score);
	targets = TargetFactory.getInstance().getRandomTargets(MAX_TARGETS, TARGET_WIDTH, height / 2);
	for (let target of targets) {
		target.subscribe(score);
		gun.subscribe(target);
	}
}

// Do not touch these
window.setup = setup;
window.draw = draw;
window.mousePressed = mousePressed;
window.keyPressed = keyPressed;
