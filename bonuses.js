function createBonuses(options) {
    var bonusesCanvas = document.getElementById('game-objects'),
        bonusesContext = bonusesCanvas.getContext('2d'),
        goldStar = document.getElementById('gold-star'),
        greyStar = document.getElementById('grey-star'),
        width = options.width,
        height = options.height,
        positionY = options.positionY;

    bonusesCanvas.width = options.width;
    bonusesCanvas.height = options.height;


    // function rand(low, high) {
    //         return Math.floor( Math.random() * (high - low + 1) + low );
    //     }

    function spawn(obstaclesArray) {
        var that = this,
            greyBonusesArray = that.greyBonusesArray,
            goldBonusesArray = that.goldBonusesArray,
            newGoldBonus,
            newGreyBonus,
            distance = 80 + level * 30,
            lastObstacle = obstaclesArray[obstaclesArray.length - 1],
            lastBonus = goldBonusesArray[goldBonusesArray.length - 1];

        if (lastObstacle && lastObstacle.positionX + lastObstacle.width + distance > width) {
            return that;
        }

        if (lastBonus && lastBonus.positionX + lastBonus.width + distance > width) {
            return that;
        }

        if (obstaclesArray.length > 2) {

            newGreyBonus = createBonus({
                canvas: bonusesCanvas,
                context: bonusesContext,
                image: greyStar,
                positionX: width,
                positionY: positionY,
                width: goldStar.width / 7,
                height: goldStar.height,
                speed: 3,
                numberOfFrames: 7,
                ticksPerFrame: 5,
            });

            newGoldBonus = createBonus({
                canvas: bonusesCanvas,
                context: bonusesContext,
                image: goldStar,
                positionX: width + 70,
                positionY: positionY,
                width: goldStar.width / 7,
                height: goldStar.height,
                speed: 3,
                numberOfFrames: 7,
                ticksPerFrame: 5,
            });

            greyBonusesArray.push(newGreyBonus);
            goldBonusesArray.push(newGoldBonus);

        }

        return that;
    }

    function renderAndUpdate() {
        var that = this,
            i,
            goldIndexesToRemove = [],
            greyIndexesToRemove = [],
            bonus,
            goldLength = that.goldBonusesArray.length,
        greyLength = that.greyBonusesArray.length;

        for (i = 0; i < goldLength; i += 1) {
            bonus = that.goldBonusesArray[i];
            bonus.render().update();
            if (bonus.positionX < 0 - bonus.imageWidth) {
                goldIndexesToRemove.push(i);
            }
        }

        for (i = 0; i < greyLength; i += 1) {
            bonus = that.greyBonusesArray[i];
            bonus.render().update();
            if (bonus.positionX < 0 - bonus.imageWidth) {
                greyIndexesToRemove.push(i);
            }
        }

        for (i = 0; i < goldIndexesToRemove.length; i += 1) {
            that.goldBonusesArray.splice(i, 1);
        }

        for (i = 0; i < greyIndexesToRemove.length; i += 1) {
            that.greyBonusesArray.splice(i, 1);
        }

        return that;
    }

    var bonuses = {
        goldBonusesArray: [],
        greyBonusesArray: [],
        spawn: spawn,
        renderAndUpdate: renderAndUpdate
    };

    return bonuses;
}

function createBonus(options) {

    function removeBonus(){
        var that = this,
            offset = 15;

        that.context.clearRect(
            that.lastX - offset,
            that.lastY - offset,
            that.width + 2 * offset,
            that.height + 2 * offset
        );
        
    }

    function update() {
        var that = this;

        that.lastX = that.positionX;
        that.positionX -= (that.speed + level);

        // frameIndex
        that.tickCount += 1;

        if (that.tickCount > that.ticksPerFrame) {

            that.tickCount = 0;

            if (that.frameIndex < that.numberOfFrames - 1) {

                that.frameIndex += 1;
            } else {
                that.frameIndex = 0;
            }
        }

        return that;
    }

    function render() {
        var that = this,
            offset = 15;

        that.context.clearRect(
            that.lastX - offset,
            that.lastY - offset,
            that.width + 2 * offset,
            that.height + 2 * offset
        );

        that.context.drawImage(
            that.image,
            that.frameIndex * that.imageWidth / that.numberOfFrames,
            0,
            that.width,
            that.height,
            that.positionX,
            that.positionY,
            that.width,
            that.height);

        return that;
    }

    var bonus = {
        canvas: options.canvas,
        context: options.context,
        image: options.image,
        imageWidth: options.image.width,
        imageHeight: options.image.height,
        positionX: options.positionX,
        positionY: options.positionY,
        lastX: options.positionX,
        lastY: options.positionY,
        width: options.width,
        height: options.height,
        speed: options.speed,
        numberOfFrames: options.numberOfFrames,
        frameIndex: 0,
        tickCount: 0,
        ticksPerFrame: options.ticksPerFrame,
        update: update,
        render: render,
        removeBonus: removeBonus
    };

    return bonus;
}