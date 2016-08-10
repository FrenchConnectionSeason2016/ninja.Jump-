function drawScore(bonusP1, bonusP2) {
    var canvas = document.getElementById("points");
    var ctx = canvas.getContext("2d");
    canvas.width = 800;
    canvas.height = 422;
    ctx.font = "18px Arial";
    ctx.fillStyle = "red";
    var score=0;



	ctx.fillText('Score: ' + score, 10, 20);
    ctx.fillText('Bonuses: ', 200, 20);
    
    var star1 = new Image();
    star1.src = "images/Star (1).png";
    
    ctx.drawImage(star1, 275, 2, 20, 20);
    ctx.fillText(bonusP1, 300, 20);
    var star2 = new Image();
    star2.src = "images/Star (2).png";
    
    ctx.drawImage(star2, 400, 2, 20, 20);
    ctx.fillText(bonusP2, 420, 20);
    
}

