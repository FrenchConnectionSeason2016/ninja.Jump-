function collideWithObstacle(ninja, obstacle) {


var ninjaX = ninja.x+ninja.width/2;
var ninjaY = ninja.y+ninja.height/2;

var obstacleX = obstacle.positionX+obstacle.width/2;
var obstacleY = obstacle.positionY+obstacle.height/2;

var ninjaRadius = ninja.height/2;
var obstacleRadius = ninja.height/2;

if (ninja.leaning) {

    ninjaY = ninjaY+ninja.height/2;
    ninjaRadius=ninjaRadius/2;

}

var dist = distance(ninjaX,ninjaY,obstacleX,obstacleY);

if (dist< (ninjaRadius + obstacleRadius)) {
    
    ninja.collided=true;
}
    
}


function collideWithBonus(ninja, bonus) {
     
    var ninjaX = ninja.x+ninja.width/2;
    var ninjaY = ninja.y+ninja.height/2;
    var bonusX = bonus.positionX+bonus.width/2;    
    var bonusY = bonus.positionY+bonus.height/2;
    var ninjaRadius = ninja.height/2;
    var bonusRadius = bonus.height/2;   

    var dist = distance(ninjaX,ninjaY,bonusX,bonusY);
    
    if(dist<( ninjaRadius +bonusRadius)){

        bonus.isCollected = true;

    }

}


function distance(x1, y1, x2, y2) {
    
    return Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
}