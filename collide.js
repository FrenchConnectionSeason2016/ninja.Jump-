function collideWithObstacles(ninja, obstaclesArray) {
    var ninjaX = ninja.x + ninja.width /(ninja.numberOfFrames * 2);
    var ninjaY = ninja.y + ninja.height / 2;
    var ninjaRadius = ninja.height / 2;
    var i;
    var obstacle;

    if (ninja.leaning) {

        ninjaY = ninjaY + ninja.height / 2;
        ninjaRadius = ninjaRadius / 2;

    }

    for (i = 0; i < obstaclesArray.length; i += 1) {
        obstacle = obstaclesArray[i];

        var obstacleX = obstacle.positionX + obstacle.width / 2;
        var obstacleY = obstacle.positionY + obstacle.height / 2;
        var obstacleRadius = obstacle.width / 2 - 15;

        var dist = distance(ninjaX, ninjaY, obstacleX, obstacleY);

        if (dist < (ninjaRadius + obstacleRadius)) {

            ninja.collided = true;
            return true;
        }
    }

    return false;

}

function collideWithBonus(ninja, bonusesArray) {

    var ninjaX = ninja.x + ninja.width /(ninja.numberOfFrames * 2);
    var ninjaY = ninja.y + ninja.height / 2;

    if (bonusesArray.length < 1) {
        return false;
    }
    var bonus = bonusesArray[0];
    var bonusX = bonus.positionX + bonus.width / 2;
    var bonusY = bonus.positionY + bonus.height / 2;
    var ninjaRadius = ninja.height / 2 ;
    var bonusRadius = bonus.height / 2;
    var i;

    for (i = 0; i < bonusesArray.length; i += 1) {
        var dist = distance(ninjaX, ninjaY, bonusX, bonusY);

        if (dist < (ninjaRadius + bonusRadius)) {
            bonus.isCollected = true;
            //debugger;
            bonus.removeBonus();
            bonusesArray.splice(i,1);
            return true;
        }
    }

}


function distance(x1, y1, x2, y2) {

    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
}