var textInterface = function()
{
	     /*     TEXT INTERFACE    */


    scoreText =  game.add.text(700, 57, " SCORE : ", {
        font: "25px Arial",
        fill: "#FFFFFF",
        align: "center"
    });

   

    HealthText =  game.add.text(25, 40, " HEALTH : ", {
        font: "25px Arial",
        fill: "#FFFFFF",
        align: "center"
    });

    scoreText.anchor.setTo(0.5, 0.5);
    scoreText.anchor.setTo(0.5, 0.5);
    factory = new Factory("shop", 0,800,730,0.5,"idle");
    mainCharacter = new Player(0,"eatMan",100,700,450,500,0,0.5,"idle");

    factoryText =  game.add.text(510, 735, " Customers : ", {
        font: "25px Arial",
        fill: "#ffe400",
        align: "center"
    });
}