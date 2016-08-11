var highscore = 0,
	score = 0,
	level = 1,
	previousScore = 0,
	lastLevel = 1,
	teamName ="French baguette";

function startGame() {
	// start screen logic


	var ninja,
		canvas,
		WIDTH = 800,
		HEIGHT = 422,
		backgroundImage,
		obstacles,
		bonuses,
        goldBonuses = 0,
        greyBonuses = 0,
		goldNinja,
		greyNinja,
		audio;

	document.getElementsByTagName('h1')[0].style.display = "block";

	function gameLoop() {

		backgroundImage.render().update();
		obstacles.renderAndUpdate().spawn(bonuses.goldBonusesArray);
		bonuses.renderAndUpdate().spawn(obstacles.obstaclesArray);

		if (!goldNinja.dead) {
			goldNinja.render();
			goldNinja.update();
			goldNinja.updateJumpIndex();

			if (collideWithBonus(goldNinja, bonuses.goldBonusesArray)) {
				goldBonuses += 1;
			}
			collideWithObstacles(goldNinja, obstacles.obstaclesArray);
		}

		if (!greyNinja.dead) {
			greyNinja.render();
			greyNinja.update();
			greyNinja.updateJumpIndex();

			if (collideWithBonus(greyNinja, bonuses.greyBonusesArray)) {
				greyBonuses += 1;
			}
			collideWithObstacles(greyNinja, obstacles.obstaclesArray);
		}


		drawScore(goldBonuses, greyBonuses);

		if (level > lastLevel) {
			if (greyNinja.dead) {
				greyNinja.dead = false;
				greyNinja.run();
			}
			if (goldNinja.dead) {
				goldNinja.dead = false;
				goldNinja.run();
			}

		}

		if (goldNinja.dead && greyNinja.dead) {
			audio.pause();
			highscore = score;
			highscore += 10 * (goldBonuses + greyBonuses);
			console.log(highscore);
			generateEndScreen();
			return;
		}

		window.requestAnimationFrame(gameLoop);
	}

	canvas = document.getElementById("gamePlace");
	canvas.width = WIDTH;
	canvas.height = HEIGHT;

	goldNinja = ninjaSprite({
		canvas: canvas,
		context: canvas.getContext("2d"),
		width: 512,
		height: 64,
		numberOfFrames: 8,
		ticksPerFrame: 4,
		frameIndex: 0,
		jumping: false,
		leaning: false,
		jumpImage: document.getElementById('gold-jump'),
		runImage: document.getElementById('gold-run'),
		leanImage: document.getElementById('gold-lean'),
		x: 350,
		y: 336
	});

	greyNinja = ninjaSprite({
		canvas: canvas,
		context: canvas.getContext("2d"),
		width: 512,
		height: 64,
		numberOfFrames: 8,
		ticksPerFrame: 4,
		frameIndex: 0,
		jumping: false,
		leaning: false,
		jumpImage: document.getElementById('grey-jump'),
		runImage: document.getElementById('grey-run'),
		leanImage: document.getElementById('grey-lean'),
		x: 150,
		y: 336
	});

	backgroundImage = createBackgroundImage({
		width: WIDTH,
		height: HEIGHT
	});

	obstacles = createObstacles({
		width: WIDTH,
		height: HEIGHT,
		positionY: 356
	});

	bonuses = createBonuses({
		width: WIDTH,
		height: HEIGHT,
		positionY: 280
	});

	audio = new Audio("audio/audio.mp3");
	audio.addEventListener('ended', function () {
		this.currentTime = 0;
		this.play();
	}, false);

	window.addEventListener('keydown', function (event) {
		if (event.keyCode === 38 && !goldNinja.jumping) {
			goldNinja.jump();
		}
		if (event.keyCode === 40 && !goldNinja.leaning) {
			goldNinja.lean();
		}
		// w
		if (event.keyCode === 87 && !greyNinja.jumping) {
			greyNinja.jump();
		}
		// s
		if (event.keyCode === 83 && !greyNinja.leaning) {
			greyNinja.lean();
		}
	});

	audio.play();
	gameLoop();

}

function generateEndScreen(){
	document.getElementById('team-name').innerHTML += teamName;
	document.getElementById('high-score').innerHTML += highscore;
	document.getElementById('end-screen').style.display = "block";

}


window.addEventListener('load', startGame, false);




