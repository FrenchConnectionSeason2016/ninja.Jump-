function createObstacles(options) {
    var obstaclesCanvas = document.getElementById('game-objects'),
        obstaclesContext = obstaclesCanvas.getContext('2d'),
        jumpImage = document.getElementById('beach-chair'),
        duckImage = document.getElementById('umbrella'),
        width = options.width,
        height = options.height;

    obstaclesCanvas.width = width;
    obstaclesCanvas.height = height;
   
    // function rand(low, high) {
    //         return Math.floor( Math.random() * (high - low + 1) + low );
    //     }

    function spawn(goldBonusesArray) {
        var that = this,
            obstaclesArray = that.obstaclesArray,
            newObstacle,
            randomNum,
            distance = 70,
            lastObstacle = obstaclesArray[obstaclesArray.length - 1],
            lastBonus = goldBonusesArray[goldBonusesArray.length-1];

        if(lastObstacle && lastObstacle.positionX + lastObstacle.width + distance > width){
            return that;
        }

         if(lastBonus && lastBonus.positionX + lastBonus.width + distance > width){
             return that;
         }
        
        randomNum = Math.random();
        if(randomNum <= 0.02){
            newObstacle = createObstacle({
                canvas: obstaclesCanvas,
                context: obstaclesContext,
                image: jumpImage,
                positionY: options.positionY,
                width: jumpImage.width,
                height: jumpImage.height,
                speed: 4,
            });
            obstaclesArray.push(newObstacle);
        }
         else if(randomNum <= 0.04){
             newObstacle = createObstacle({
                 canvas: obstaclesCanvas,
                 context: obstaclesContext,
                 image: duckImage,
                 positionY: options.positionY - duckImage.height / 1.75,
                 width: duckImage.width,
                 height: (duckImage.height / 5) * 2,
                 speed: 4,
             });
             obstaclesArray.push(newObstacle);
        }

        return that;
    }

    function renderAndUpdate() {
        var that = this,
            i, 
            indexesToRemove = [],
            obstacle;

        for (i = 0; i < that.obstaclesArray.length; i += 1) {
            obstacle = that.obstaclesArray[i];
            obstacle.render().update();
            if(obstacle.positionX < 0 - obstacle.imageWidth){
                indexesToRemove.push(i);
            }
        }

        for(i=0; i< indexesToRemove.length; i+=1){
            that.obstaclesArray.splice(i,1);
        }
        return that;
    }

    var obstacles = {
        obstaclesArray: [],
        spawn: spawn,
        renderAndUpdate: renderAndUpdate
    };

    return obstacles;
}

function createObstacle(options) {

    function update() {
        var that = this;

        that.lastX = that.positionX;
        that.lastY = that.positionY;
        that.positionX -= that.speed;

        return that;
    }

    function render() {
        var that = this,
            offset = 10;

        that.context.clearRect(
            that.lastX - offset,
            that.lastY - offset,
            that.imageWidth + 2 * offset,
            that.imageHeight + 2 * offset
        );

        that.context.drawImage(that.image, that.positionX, that.positionY);

        return that;
    }

    var obstacle = {
        canvas: options.canvas,
        context: options.context,
        image: options.image,
        imageWidth: options.image.width,
        imageHeight: options.image.height,
        positionX: options.canvas.width,
        positionY: options.positionY,
        lastX: options.canvas.width,
        lastY: options.positionY,
        width: options.width,
        height: options.height,
        speed: options.speed,
        update: update,
        render: render
    };

    return obstacle;
}
