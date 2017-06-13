var textInterface = function()
{
	     /*     TEXT INTERFACE    */
    var healthBarPositionX = 25;
    var healthBarPositionY = 40;
    // var playerNumber = 1;
// console.log(nameCharactersArray[0]);
    for (var i = 0; i < playersInGame[0]; i++) 
    {
       
        HealthText =  game.add.text(healthBarPositionX, healthBarPositionY, nameCharactersArray[i]+": ",
        {

            font: "20px Arial",
            fill: "#FFFFFF",
            align: "center"
        });
        healthBarPositionX += 400;
        // healthBarPositionY ++;
        // playerNumber++;

    }
    scoreText =  game.add.text(750, 107, " SCORE : ", {
        font: "30px Arial",
        fill: "#FFE414",
        align: "center"
    });

   



    scoreText.anchor.setTo(0.5, 0.5);
    scoreText.anchor.setTo(0.5, 0.5);
   

    factoryText =  game.add.text(535, 715, " Invités : ", {
        font: "25px Arial",
        fill: "#ffe400",
        align: "center"
    });
}