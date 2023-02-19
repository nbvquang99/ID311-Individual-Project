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

  // 1. Init gun and score display  -- Uncomment when ready
  // gun = new Gun(TOT_SHOTS);
  // score = new ScoreDisplay(gun.getRemainingShots());

  // 2. Init the targets 
  initTargets(gun, score);

  // 3. Subscribe gun -- Uncomment when ready
  // gun.subscribe(score);
}

function draw() {
  background('#eeeeee');

  // draw targets, gun, bullets, score  -- Uncomment when ready
  // for (let t of targets) t.draw();
  // gun.draw();
  // score.draw();
}

// Shoot
function mousePressed() {
  // gun.shoot(); -- Uncomment when ready
}

// Spacebar to reload
function keyPressed() {
  if (key === ' ') {
    initTargets();
    //  -- Uncomment when ready
    // gun.reload();
    // score.resetScore();
  }
}

// init the targets
function initTargets() {
  
  // Unsubscribe previous targets  -- Uncomment when ready
  /*
  if (targets.length > 0) {
    for (let t of targets) {
      gun.unsubscribe(t);
    }
  }
  */


  // Create targets  -- Uncomment when ready
  /*
  targets = TargetFactory.getInstance().getRandomTargets(
    MAX_TARGETS,
    TARGET_WIDTH,
    height / 2
  );
  */

  // Subscribe to events  -- Uncomment when ready
  /*
  targets.map((target) => {
    target.subscribe(score);
    gun.subscribe(target);
  });
  */
}

// Do not touch these
window.setup = setup;
window.draw = draw;
window.mousePressed = mousePressed;
window.keyPressed = keyPressed;
