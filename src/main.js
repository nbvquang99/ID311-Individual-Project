import '../css/style.css';
import { Attacker } from './Attacker';
import { City } from './City.js';
import { Bullet } from './Bullet.js';
import { SuperBullet } from './SuperBullet.js';
import { AIRDROP_NUM, CITY_NUM, WINDOW_HEIGHT } from './Constants';
import { Cursor } from './Cursor';
import { StaticDisplay } from './StaticDisplay';
import { Airdrop } from './Airdrop';

// Globals
let bullets = []; 			// array of our ammo
let cities = []; 			// array of cities that we need to protect
let rockets = []; 			// array of attackers
let airDrops = [];			// array of airdrops
let airDropDelta = 600;		// number of frames before airdrops
let previousFrameCount = 0;	// store the previous frame count
let gameState = 4;			// 0:gameplay; 1:gameOver; 2:Main menu; 3:Leaderboard; 4:splash page
let rumbleCheck = false;	// screen rumble

// Images
let backgroundImage;
let scoreTitle;
let gameTitle;
let leaderboardTitle;
let splashVideo;

// Sound
let laserSound;
let explSound;
let noAmmoSound;
let nextLevelSound;
let introMusic;
let airDropSound;

// Cursor
let cursor;

// gameplay statistic
let staticDisplay;
let allowIncLevel = false;

// buttons
let startButton;
let backButton;
let leaderButton;

function preload() {
	backgroundImage = loadImage("../assets/background.png");
	scoreTitle = loadImage("../assets/Text/score.png");
	gameTitle = loadImage("../assets/Text/title.png");
	leaderboardTitle = loadImage("../assets/Text/leaderboard.png");
	splashVideo = createVideo(['../assets/Video/video1.mp4']);
	// sound loading
	explSound = loadSound('../assets/Sounds/explosionSound.wav');
    laserSound = loadSound('../assets/Sounds/laser.wav');
    noAmmoSound = loadSound('../assets/Sounds/error.mp3');
    nextLevelSound = loadSound('../assets/Sounds/NextLevel.wav');
    introMusic = loadSound('../assets/Sounds/throughSpace.mp3');
    airDropSound = loadSound('../assets/Sounds/airdrop.wav');
	// create Cursor
	cursor = new Cursor();
	// create static display
	staticDisplay = new StaticDisplay();
	// init Cities
	for (let i =0; i<CITY_NUM; i++) {
        cities[i] = new City(400*i+150, WINDOW_HEIGHT - 50);
	}
	// init rockets
	for (let i=0; i<100; i++) {
        rockets[i] = new Attacker(staticDisplay.attackerSpeedMin, staticDisplay.attackerSpeedMax);
	}
	// init airdrops
	for (let i=0; i<AIRDROP_NUM; i++) {
        airDrops[i] = new Airdrop(100*i+50);
	}
}

function setup() {
	createCanvas(1500, 850);
	world.gravity = 0;
	// resize background
	backgroundImage.resize(width, height);
	// button creation
    startButton = createButton('Start Game');
    leaderButton = createButton ('Leaderboard');
    backButton = createButton('back');
    startButton.hide();
    leaderButton.hide();
    backButton.hide();
	for (let i=0; i<AIRDROP_NUM; i++) {
		for (let j=0; j<CITY_NUM; j++) airDrops[i].getSprite().overlaps(cities[j].getSprite());
	}
}

function draw() {
	if (gameState == 0) { // gameplay
		// draw background
		background("Darkblue");
		imageMode(CORNER);
		image(backgroundImage,0,0);
		// draw cursor
		cursor.draw();
		// draw scores and cannon
		staticDisplay.drawScore();
		staticDisplay.drawCannon();
		// draw cities
		for (let i = 0; i < CITY_NUM; i++) {
			cities[i].draw();
		}
		// check rumble
		rumble();
		// airdop
		if (staticDisplay.bulletNum < 30) {
			if (airDropStart(airDropDelta, 2)) {
				airDropDelta = Math.floor(random(30, 60))*60;
			}
			airDropStart(airDropDelta, 1);
		}
		// check gameplay
		gameplayCompute();
		// draw attackers
		for (let i = 0; i < staticDisplay.attackerNum; i++) {
			rockets[i].draw();
			rockets[i].rocketLaunch();
		}
	}
	if (gameState == 1) { // game over
		clear();
		gameplayHide();
        imageMode(CORNER);
        image(backgroundImage, 0, 0);
        imageMode(CENTER)
        image(scoreTitle, width/2, 100);
        fill('red');
        textSize(32);
        textAlign(CENTER);
        text(staticDisplay.score,width/2,height/2);
        text("Press Space",width/2,height-50);
	}
	if (gameState == 2) { // main menu
		previousFrameCount = frameCount;
		clear();
		imageMode(CORNER);
        image(backgroundImage, 0, 0);
        imageMode(CENTER);
        image(gameTitle, width/2, height/4+100);
        fill(255);
        textSize(10);
        textFont(staticDisplay.gameFont);
		textAlign(CENTER);
        text("Controls: Aim = Mouse     Fire = Left-mouse     Super Fire = Right-mouse     Menu = Esc", width/2, height-50);
		/*---Play music---*/
		introMusic.play();
        introMusic.playMode("untilDone");
		/*---Button show---*/
		startButton.style('font-size', '20px');
        startButton.style('font-family', 'lores-9-wide-bold-alt-oaklan');
        startButton.position(width/2-250, height/2+50);
        startButton.size(500, 50);
        startButton.style('color', 'red');
        startButton.style('border', '2px solid #f44336');
        startButton.style('background', 'darkblue');
        startButton.mouseClicked(()=>{
			gameState = 0;
			leaderButton.hide();
			startButton.hide();
			introMusic.stop();
		});
		startButton.show();
		/*---Leaderboard button show---*/
		leaderButton.style('font-size','20px');
        leaderButton.style('font-family','lores-9-wide-bold-alt-oaklan');
        leaderButton.style('border', '2px solid #f44336');
        leaderButton.style('background', 'darkblue');
        leaderButton.position(width/2-250,height/2+150);
        leaderButton.size(500,50);
        leaderButton.style('color','red');
        leaderButton.mouseClicked(()=> {
			gameState = 3;
			leaderButton.hide();
			startButton.hide();
		});
		leaderButton.show();
	}
	if (gameState == 3) { // leaderboard
		clear();
		noLoop(); // Don't keep printing the leaderboard page
		imageMode(CORNER);
		image(backgroundImage, 0, 0);
		imageMode(CENTER);
		image(leaderboardTitle, width/2, 100);
		/*---Back button show---*/
        backButton.show();
        backButton.style('font-size','20px');
        backButton.style('font-family','lores-9-wide-bold-alt-oaklan');
        backButton.position(width/2-250, height-50);
        backButton.size(500,50);
        backButton.mouseClicked(()=>{
			gameState = 2;
			backButton.hide();
			loop();
		});
		/*---Load the leaderboard---*/
		let leaderboard = JSON.parse(localStorage.getItem("leaderboard"));
		leaderboard.sort((x, y) => {return y.score - x.score});
		fill("red");
		textSize(24);
		textAlign(CENTER);
		textFont(staticDisplay.gameFont);
		text("RANK"+"   "+"HIGH SCORE",width/2, 200);
		for (let i = 0; i < min(leaderboard.length, 5); i++){
			textAlign(CENTER);
			text(i+1 + "     " + leaderboard[i].score, width/2, 50*i+250);
        }
	}
	if (gameState === 4) { // splash page
		background("Darkblue");
		imageMode(CENTER);
		image(splashVideo, width/2, height/2, width, height);
		fill("red");
		textSize(20);
		textAlign(CENTER);
		textFont(staticDisplay.gameFont);
		text("By Nguyen Ba Vinh Quang", width/2, height-300);
		text("Press Any Key", width/2, height-100);
		image(gameTitle, width/2, height/2);
		splashVideo.volume(0);
		splashVideo.hide();
		splashVideo.loop();
		if(keyIsPressed === true) {
			gameState = 2;
		}
	}
}

function airDropStart(delta, num) {
	if (frameCount - delta >= previousFrameCount) {
		previousFrameCount = frameCount;
		for (let i=0; i<num; i++) {
			let id = -1;
			while (id == -1 || airDrops[id].getSprite().speed != 0) {
				id = Math.floor(random(0, AIRDROP_NUM));
			}
			airDrops[id].airDropLaunch();
			airDropSound.play();
		}
		return true;
	}
	return false;
}

function gameplayHide() {
	for (let i = 0; i < cities.length; i++) {
		cities[i].unDraw();
	}
	for (let i = 0; i < rockets.length; i++) {
		rockets[i].unDraw();
	}
	for (let i = 0; i < bullets.length; i++) {
		bullets[i].unDraw();
	}
	for (let i = 0; i < airDrops.length; i++) {
		airDrops[i].unDraw();
	}
	cursor.unDraw();
}

function gameReset() {
	// reset cities
	for (let i = 0; i < cities.length; i++) {
		cities[i].cityReset();
	}
	// reset rockets
	for (let i = 0; i < rockets.length; i++) {
		rockets[i].rocketReset(true);
	}
	// reset airdrops
	for (let i = 0; i < airDrops.length; i++) {
		airDrops[i].airDropReset(true);
	}
	// reset bullets
	bullets = [];
	// reset statistic
	staticDisplay.reset();
}

function gameplayCompute() {
	// check collision and change statistic
	for (let i = 0; i < staticDisplay.attackerNum; i++) {
		let cityId = rockets[i].isHit(cities);
		if (cityId > -1) {
			explSound.play();
			rockets[i].rocketExploded();
			cities[cityId].blown();
			rumbleCheck = true;
		}
		let bulletArr = rockets[i].isHitMulti(bullets);
		if (bulletArr.length > 0) {
			explSound.play();
			rockets[i].rocketExploded();
			staticDisplay.increaseScore(100);
			staticDisplay.increaseBlownEnemies(1);
			allowIncLevel = true;
		}
		for (let j = bulletArr.length-1; j >= 0; j--) {
			if (bullets[bulletArr[j]].isSuper) staticDisplay.increaseScore(100);
			bullets[bulletArr[j]].bulletExploded().then(()=>{
				bullets.splice(bulletArr[j], 1);
			});
		}
		rockets[i].rocketReset(false);
	}

	// check airdrop collision
	for (let i = 0; i < airDrops.length; i++) {
		let bulletId = airDrops[i].isHit(bullets);
		if (bulletId > -1) {
			explSound.play();
			airDrops[i].airDropExploded();
			bullets[bulletId].bulletExploded().then(()=>{
				bullets.splice(bulletId, 1);
			});
			staticDisplay.increaseBulletNum(10);
		}
		airDrops[i].airDropReset(false);
	}

	// check increase level
	if (allowIncLevel && staticDisplay.blownEnemies > 0 && staticDisplay.blownEnemies % 10 == 0) {
		allowIncLevel = false;
		nextLevelSound.play();
		staticDisplay.increaseLevel();
	}

	// check game over
	const citiesLeft = cities.reduce((acc, city) => {
		if (!city.isBlown) return acc+1;
		return acc;
	}, 0);
	if (citiesLeft == 0) {
		rumbleCheck = false;
		gameState = 1;
		staticDisplay.saveScore();
	}
}

function rumble() {
	if (frameCount % 60 == 0){
        rumbleCheck=false;
    }
	if (rumbleCheck){
		translate(randomGaussian(-5,5),randomGaussian(-5,5));
	}
}

function mousePressed() {
	if (mouseButton === LEFT && gameState == 0) {
		if (staticDisplay.bulletNum > 0) {
			staticDisplay.increaseBulletNum(-1);
			bullets.push(new Bullet());
			for (let i = 0; i<bullets.length-1; i++) bullets[bullets.length-1].getSprite().overlaps(bullets[i].getSprite());
			for (let i = 0; i<cities.length; i++) bullets[bullets.length-1].getSprite().overlaps(cities[i].getSprite());
			bullets[bullets.length-1].bulletShoot();
			laserSound.play();
		} else {
			noAmmoSound.play();
		}
	}
	if (mouseButton === RIGHT && gameState == 0) {
		if (staticDisplay.bulletNum > 1) {
			staticDisplay.increaseBulletNum(-2);
			bullets.push(new SuperBullet());
			for (let i = 0; i<bullets.length-1; i++) bullets[bullets.length-1].getSprite().overlaps(bullets[i].getSprite());
			for (let i = 0; i<cities.length; i++) bullets[bullets.length-1].getSprite().overlaps(cities[i].getSprite());
			bullets[bullets.length-1].bulletShoot();
			laserSound.play();
		} else {
			noAmmoSound.play();
		}
	}
}

// Spacebar to reload
function keyPressed() {
	if (kb.presses('space') && gameState == 1) {
		gameState = 2;
		gameReset();
	}
	if (keyCode == 27 && gameState == 0) {
		gameState = 2;
		gameplayHide();
		gameReset();
	}
}

// Do not touch these
window.setup = setup;
window.preload = preload;
window.draw = draw;
window.mousePressed = mousePressed;
window.keyPressed = keyPressed;