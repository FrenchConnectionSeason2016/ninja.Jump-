function ninjaSprite(options) {

	var that = {},
		tickCount = 0,
		ticksPerFrame = options.ticksPerFrame || 0,
        ninjaJump,
        ninjaLean,
        ninjaRun;

	//numberOfFrames = options.numberOfFrames || 1;
    
    ninjaRun = new Image();
	ninjaRun.src = "images/run.png";

	ninjaJump = new Image();
	ninjaJump.src = 'images/jump.png';

	ninjaLean = new Image();
	ninjaLean.src = 'images/lean.png';

    that.canvas = options.canvas;
	that.context = options.context;
	that.width = options.width;
	that.height = options.height;
	that.image = ninjaRun;
	that.numberOfFrames = options.numberOfFrames || 1;
	that.jumping = options.jumping;
	that.leaning= options.leaning;
    that.frameIndex = options.frameIndex;
	that.jumpIndex = 0;
	that.y= options.y;
	that.x= options.x;
	that.collided = false;
	//UPDATE

	that.update = function () {

		

		tickCount += 1;

		if (tickCount > ticksPerFrame) {

			tickCount = 0;

			if (that.frameIndex < that.numberOfFrames - 1) {

				that.frameIndex += 1;
			} else {
				that.frameIndex = 0;
			}
		}
	};


	that.updateJumpIndex = function () {

		if (that.jumping) {
			
			if ( that.jumpIndex < 17 ) {
				that.y -= 6;
			} else {		   

                    that.y += 6;			
				
			}

			that.jumpIndex+=1;

		} else {
			that.y = options.y;
		}
		

	};


	//RENDER
	that.render = function () {



		that.context.clearRect(0, 0, that.canvas.width, that.canvas.height);	

	
		// if (that.jumping) {
		// 		console.log(jumpIndex);	


		// 	if ( jumpIndex < 17) {
		// 		y -= 6;
		// 	} else {
		// 		y += 6;
		// 	}

		// 	jumpIndex+=1;

		// } else {
		// 	y = 336;
		// }
		
		    that.context.drawImage(
			that.image,
			that.frameIndex * that.width / that.numberOfFrames,
			0,
			that.width / that.numberOfFrames,
			that.height,
			that.x,
			that.y,
			that.width / that.numberOfFrames,
			that.height);

		var ctx = that.canvas.getContext('2d');
		ctx.beginPath();
		ctx.moveTo(0, 250);
		ctx.lineTo(600, 250);
		ctx.stroke();


		if ((that.jumping || that.leaning) && that.frameIndex === (that.numberOfFrames - 1)) {

			that.jumpIndex=0;	
			that.run();
			that.frameIndex = 0;	
		}
	};

    function jump(ev) {

		//console.log(ev)
		if (ev.keyCode == 38 && !that.jumping) {
			that.jumping = true;
			that.leaning = false;
			that.image = ninjaJump;
			that.frameIndex = 0,
				that.ticksPerFrame = 6;
		}

	}

	function lean(ev) {

		if (ev.keyCode == 40 && !that.leaning ) {
			that.jumping = false;
			that.leaning = true;
			that.image = ninjaLean;
			that.frameIndex = 0;
			that.ticksPerFrame = 6;
		}


	}

	function run() { 

		that.jumping = false;
		that.leaning = false;
		that.image = ninjaRun;
		that.ticksPerFrame = 4;
		that.frameIndex= 0;
	}

	

    that.jump = jump;
    that.run = run;
    that.lean= lean;

	return that;
}