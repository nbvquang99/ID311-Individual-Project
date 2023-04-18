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

  // 2. Init the targets

  // 3. Subscribe gun
}

function draw() {
  background('#eeeeee');

  // draw targets, gun, bullets, score
}

// Shoot
function mousePressed() {
  // shoot
}

// Spacebar to reload
function keyPressed() {
  if (key === ' ') {
    // reset score and targets
  }
}

// init the targets
function initTargets() {
  // Create new targets from the factory
  // Remember to unsubscribe the previous targets and to subscribe the new ones
}

// Do not touch these
window.setup = setup;
window.draw = draw;
window.mousePressed = mousePressed;
window.keyPressed = keyPressed;
