

var ninja,
	ninjaRun,
	ninjaJump,
	ninjaLean,
	canvas,
	frameIndex = 0;


function gameLoop() {

	window.requestAnimationFrame(gameLoop);

	ninja.update();
	ninja.updateJumpIndex();
	ninja.render();
}

function sprite(options) {

	var that = {},
		tickCount = 0,
		ticksPerFrame = options.ticksPerFrame || 0,
		jumpIndex = 0;

	//numberOfFrames = options.numberOfFrames || 1;

		  var altitude = 336;


	that.context = options.context;
	that.width = options.width;
	that.height = options.height;
	that.image = options.image;
	that.numberOfFrames = options.numberOfFrames || 1;
	that.jumping = options.jumping;
	that.leaning= options.leaning;

	//UPDATE

	that.update = function () {

		

		tickCount += 1;

		if (tickCount > ticksPerFrame) {

			tickCount = 0;

			if (frameIndex < that.numberOfFrames - 1) {

				frameIndex += 1;
			} else {
				frameIndex = 0;
			}
		}
	};


	that.updateJumpIndex = function () {

		if (that.jumping) {
			
			if ( jumpIndex < 17) {
				altitude -= 6;
			} else {
				altitude += 6;
			}

			jumpIndex+=1;

		} else {
			altitude = 336;
		}
		

	}


	//RENDER
	that.render = function () {



		that.context.clearRect(0, 0, 600, 400);	

	
		// if (that.jumping) {
		// 		console.log(jumpIndex);	


		// 	if ( jumpIndex < 17) {
		// 		altitude -= 6;
		// 	} else {
		// 		altitude += 6;
		// 	}

		// 	jumpIndex+=1;

		// } else {
		// 	altitude = 336;
		// }
		
		    that.context.drawImage(
			that.image,
			frameIndex * that.width / that.numberOfFrames,
			0,
			that.width / that.numberOfFrames,
			that.height,
			270,
			altitude,
			that.width / that.numberOfFrames,
			that.height);

		var ctx = canvas.getContext('2d');
		ctx.beginPath();
		ctx.moveTo(0, 250);
		ctx.lineTo(600, 250);
		ctx.stroke();


		if ((that.jumping || that.leaning) && frameIndex === (that.numberOfFrames - 1)) {

			jumpIndex=0;	
			Run();
			frameIndex = 0;	
		}
	};



	return that;
}


canvas = document.getElementById("gamePlace");
canvas.width = 600;
canvas.height = 400;


ninjaRun = new Image();
ninjaRun.src = "run.png";

ninjaJump = new Image();
ninjaJump.src = 'jump.png';

ninjaLean = new Image();
ninjaLean.src = 'lean.png';



ninja = sprite({
	context: canvas.getContext("2d"),
	width: 512,
	height: 64,
	image: ninjaRun,
	numberOfFrames: 8,
	ticksPerFrame: 4,
	jumping: false,
	leaning: false


});


function Jump(ev) {

	//console.log(ev)
	if (ev.keyCode == 38 && !ninja.jumping) {
		ninja.jumping = true;
		ninja.leaning=false;
		ninja.image = ninjaJump;
		frameIndex = 0,
			ticksPerFrame = 6;
	}

}

function Lean(ev) {

	if(ev.keyCode == 40 && !ninja.leaning){
		ninja.jumping=false;
		ninja.leaning=true;
		ninja.image = ninjaLean;
		frameIndex=0;
		ticksPerFrame = 6;
	}
	

}

function Run() {

	ninja.jumping = false;
	ninja.leaning=false;
	ninja.image = ninjaRun;
		ticksPerFrame = 4;
}



//var body = document.getElementsByTagName('body')[0];

window.addEventListener('load', gameLoop, false);

window.addEventListener('keydown', Jump, false);
window.addEventListener('keydown', Lean, false);



