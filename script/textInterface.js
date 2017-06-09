var textInterface = function()
{
	     /*     TEXT INTERFACE    */


    scoreText =  game.add.text(700, 57, " SCORE : ", {
        font: "25px Arial",
        fill: "#FFFFFF",
        align: "center"
    });

   

    HealthText =  game.add.text(25, 40, " Player1 : ", {
        font: "20px Arial",
        fill: "#FFFFFF",
        align: "center"
    });


    HealthText =  game.add.text(320, 40, " Player2 : ", {
        font: "20px Arial",
        fill: "#FFFFFF",
        align: "center"
    });


    HealthText =  game.add.text(520, 40, " Player3 : ", {
        font: "20px Arial",
        fill: "#FFFFFF",
        align: "center"
    });


    HealthText =  game.add.text(25, 40, " Player4 : ", {
        font: "20px Arial",
        fill: "#FFFFFF",
        align: "center"
    });


    scoreText.anchor.setTo(0.5, 0.5);
    scoreText.anchor.setTo(0.5, 0.5);
   

    factoryText =  game.add.text(510, 715, " Customers : ", {
        font: "25px Arial",
        fill: "#ffe400",
        align: "center"
    });
}