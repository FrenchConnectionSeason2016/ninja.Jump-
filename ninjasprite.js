function ninjaSprite(options) {

	var that = {},
		tickCount = 0,
		ticksPerFrame = options.ticksPerFrame || 0,
        ninjaJump,
        ninjaLean,
        ninjaRun;

	//numberOfFrames = options.numberOfFrames || 1;


    that.canvas = options.canvas;
	that.context = options.context;
	that.width = options.width;
	that.height = options.height;
	that.image = options.runImage;
	that.runImage = options.runImage;
	that.leanImage = options.leanImage;
	that.jumpImage = options.jumpImage;
	that.numberOfFrames = options.numberOfFrames || 1;
	that.jumping = options.jumping;
	that.leaning= options.leaning;
    that.frameIndex = options.frameIndex;
	that.jumpIndex = 0;
	that.y= options.y;
	that.x= options.x;
	that.tickCount = 0;
	that.dead = false;
	//UPDATE

	that.update = function () {
		
		that.tickCount += 1;

		if (that.tickCount > ticksPerFrame) {

			that.tickCount = 0;

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
		var offset=20;


		that.context.clearRect(that.x - offset, that.y - offset*4, that.width / that.numberOfFrames + 2*offset, that.height + 8*offset);	

	
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


		if ((that.jumping || that.leaning) && that.frameIndex === (that.numberOfFrames - 1)) {

			that.jumpIndex=0;	
			that.run();
			that.frameIndex = 0;	
		}
	};

    function jump() {
			that.jumping = true;
			that.leaning = false;
			that.image = that.jumpImage;
			that.frameIndex = 0,
			that.ticksPerFrame = 6;
	}

	function lean() {
	
			that.jumping = false;
			that.leaning = true;
			that.image = that.leanImage;
			that.frameIndex = 0;
			that.ticksPerFrame = 6;
	}

	function run() { 

		that.jumpIndex= 0;
		that.jumping = false;
		that.leaning = false;
		that.image = that.runImage;
		that.ticksPerFrame = 4;
		that.frameIndex= 0;
	}


    that.jump = jump;
    that.run = run;
    that.lean= lean;

	return that;
}