

function drawScore(bonusP1, bonusP2) {
    var canvas = document.getElementById("points");
    var ctx = canvas.getContext("2d");
    canvas.width = 800;
    canvas.height = 422;
    var y =25;
    ctx.font = "18px Impact";
    ctx.fillStyle = "black";// "#180063"

	ctx.fillText('Score: ' + score, 10, y);
    ctx.fillText('Level: '+ level, 10, y+20 );
    ctx.fillText('Bonuses: ', 190, y);
    
    var goldStar = document.getElementById('gold-bonus');
    
    ctx.drawImage(goldStar, 275, 7, 20, 20);
    ctx.fillText(bonusP1, 300, y);
    var greyStar = document.getElementById('grey-bonus');
    
    ctx.drawImage(greyStar, 350, 7, 20, 20);
    ctx.fillText(bonusP2, 375, y);
    
}

    //Napravih go na polovin sekunda, moje da se promeni
    window.setInterval(function scoreIncrease() {
        
        score += level;

        if(score >= (previousScore + 1000)){
            previousScore= score;
            level+=1;
        }
  
    }, 50);


