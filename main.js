

function startGame() {
	// start screen logic

	var ninja,
		canvas,
		WIDTH = 800,
		HEIGHT = 422,
		backgroundImage,
		obstacles,
		bonuses,
		level,
        goldBonuses = 0,
        greyBonuses = 0,
		goldNinja,
		greyNinja;


	function gameLoop() {

		backgroundImage.render().update();
		obstacles.renderAndUpdate().spawn(bonuses.goldBonusesArray);
		bonuses.renderAndUpdate().spawn(obstacles.obstaclesArray);

		goldNinja.render();
		goldNinja.update();
		goldNinja.updateJumpIndex();

		collideWithBonus(goldNinja, bonuses.goldBonusesArray);
		collideWithObstacles(goldNinja, obstacles.obstaclesArray);
		if(goldNinja.collided){
			return;
		}

		greyNinja.render();
		greyNinja.update();
		greyNinja.updateJumpIndex();

		collideWithBonus(greyNinja, bonuses.greyBonusesArray);
		collideWithObstacles(greyNinja, obstacles.obstaclesArray);
		// if(greyNinja.collided){
		// 	return;
		// }

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

	window.addEventListener('keydown', function(event){
		if(event.keyCode === 38 && !goldNinja.jumping){
			goldNinja.jump();
		}
		if(event.keyCode === 40 && !goldNinja.leaning){
			goldNinja.lean();
		}
		// w
		if(event.keyCode === 87 && !greyNinja.jumping){
			greyNinja.jump();
		}
		// s
		if(event.keyCode === 83 && !greyNinja.leaning){
			greyNinja.lean();
		}
	});

	gameLoop();

	console.log("game over");

	// end screen logic
}



window.addEventListener('load', startGame, false);




