var gameOverState = 
{
	create: function()
	{
		gameOverAudio.play();
		var gameOverLabel = game.add.text(0,0,"GAME OVER",
		{font: '50px Arial', fill: '#00FF00'});
		gameOverLabel.x = game.world.centerX - gameOverLabel.width*(0.5);
		gameOverLabel.y = game.world.centerY -25;
		var gameOverLabel1 = game.add.text(game.world.centerX,game.world.centerY + 300,"Score: "+ enemiesKilled,
		{font: '50px Arial', fill: '#00FF00'});

		gameOverLabel1.x = game.world.centerX - gameOverLabel1.width*(0.5);
		gameOverLabel1.y = game.world.centerY + 100;


        


		var startLabel = game.add.text(80, game.world.height-80,'press the w key to restart', {font: '25 px Arial',fill: '#ffffff'});
		// var wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
		var NKey = game.input.keyboard.addKey(Phaser.Keyboard.N);
		NKey.onDown.addOnce(this.restart, this);
		// wKey.onDown.addOne(this.restart, this);

	},
	restart: function()
	{
		customers = 0;
		enemiesKilled = 0;
		// game.state.start('boot');
		game.state.start('menu');
	}
	
}