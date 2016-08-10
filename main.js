function startGame() {
	// start screen logic

	var ninja,
		canvas,
		WIDTH = 800,
		HEIGHT = 500,
		backgroundImage,
		obstacles;


	function gameLoop() {

		backgroundImage.render().update();
		obstacles.renderAndUpdate().spawn();

		ninja.update();
		ninja.updateJumpIndex();
		ninja.render();

		window.requestAnimationFrame(gameLoop);
	}

	canvas = document.getElementById("gamePlace");
	canvas.width = WIDTH;
	canvas.height = HEIGHT;

	ninja = ninjaSprite({
		canvas: canvas,
		context: canvas.getContext("2d"),
		width: 512,
		height: 64,
		numberOfFrames: 8,
		ticksPerFrame: 4,
		frameIndex: 0,
		jumping: false,
		leaning: false,
		x: 270,
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

	window.addEventListener('keydown', ninja.jump, false);
	window.addEventListener('keydown', ninja.lean, false);

	gameLoop();



	// end screen logic
}



window.addEventListener('load', startGame, false);




