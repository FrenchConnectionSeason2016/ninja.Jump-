var highscore = 0,
	score = 0,
	level = 1,
	previousScore = 0,
	lastLevel = 1,
	teamName = "";

function generateStartScreen() {

	var fragment = document.createDocumentFragment();

    function changeButtonBackground(ev) {
        if (ev.target.className === 'button') {
            ev.target.style.backgroundColor = 'blue';
        }
    }

    function changeBackButtonBackground(ev) {
        if (ev.target.className === 'button') {
            ev.target.style.backgroundColor = '';
        }
    }

    // start game function to change
    function startCurrentGame() {
        menu.style.display = 'none';
		startGame();

    }

    function saveTeamname() {
        teamName = nameInput.value;
    }

    function returnToStartMenu() {
        rulesCollection.style.display = 'none';
        startMenu.style.display = 'block';
    }

    function listRules() {
        menu.style.display = 'none';
        var rulesList = document.createElement('div');
        rulesList.setAttribute('id', 'rules-list');

        var rules = document.createElement('div');
        rules.setAttribute('id', 'rules-collection');

        var rulesItems = document.createElement('div');
        rulesItems.setAttribute('id', 'rules');
        rulesItems.innerHTML += 'If you think it is easy to run on the beach you are wrong! ';
        rulesItems.innerHTML += 'There are umbrellas that can hit you on the head, so duck! ';
        rulesItems.innerHTML += 'There are also beach chairs that can break your leg, so jump! ';
        rulesItems.innerHTML += 'You are lucky being not alone! ';
        rulesItems.innerHTML += '<br/>But if you jump hihg enough you can collect coins! Good Luck! ';

        var startMenuButton = button.cloneNode(true);
        startMenuButton.id = 'menuButton';
        startMenuButton.innerHTML += 'Back to main menu';
        startMenuButton.addEventListener('click', returnToStartMenu, false);
        startMenuButton.addEventListener('mouseover', changeButtonBackground, false);
        startMenuButton.addEventListener('mouseout', changeBackButtonBackground, false);

        rulesList.appendChild(rulesItems);
        rulesList.appendChild(startMenuButton);
        wrapper.appendChild(rulesList);
        rulesCollection = rulesList;
    }

    function quitGame() {
        window.close();
    }

    var wrapper = document.getElementById('wrapper');
    // var animation = document.getElementById('animation');

    var rulesCollection;

    var button = document.createElement('div');
    button.classList.add('button');

    var startMenu = document.createElement('div');
    startMenu.setAttribute('id', 'start-screen');
    startMenu.addEventListener('mouseover', changeButtonBackground, false);
    startMenu.addEventListener('mouseout', changeBackButtonBackground, false);

    var startButton = button.cloneNode(true);
    startButton.innerHTML += 'START';
    startButton.addEventListener('click', startCurrentGame, false);

    var rulesButton = button.cloneNode(true);
    rulesButton.innerHTML += 'READ RULES';
    rulesButton.addEventListener('click', listRules, false);

    var nameLable = document.createElement('label');
    nameLable.for = 'teamName:';
    nameLable.innerHTML += 'TEAM NAME:';

    var nameInput = document.createElement("input");
    nameInput.id = 'teamName';
    nameInput.type = 'text';
    nameInput.style.fontSize = "25px";
    nameInput.style.background = '#B5DBFF';
    nameInput.addEventListener('input', saveTeamname, false);

    console.log(nameInput);

    var quitButton = button.cloneNode(true);
    quitButton.innerHTML += 'QUIT';
    quitButton.addEventListener('click', quitGame, false);

    startMenu.appendChild(rulesButton);
    startMenu.appendChild(nameLable);
    startMenu.appendChild(nameInput);
    startMenu.appendChild(startButton);
    startMenu.appendChild(quitButton);
    fragment.appendChild(startMenu);

    wrapper.appendChild(fragment);

    var menu = document.getElementById('start-screen');

}

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


	// var canvases = document.getElementsByTagName('canvas');
	// for (i = 0; i < canvases.length; i += i) {
	// 	canvases[i].style.display = 'block';
	// }

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


	function generateEndScreen() {
		document.getElementById('team-name').innerHTML += teamName;
		document.getElementById('high-score').innerHTML += highscore;
		document.getElementById('end-screen').style.display = "block";

	}


	window.addEventListener('load', generateStartScreen, false);




