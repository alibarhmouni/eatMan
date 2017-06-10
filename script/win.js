var gameOverState = 
{
	create: function()
	{
		var winLabel = game.add.text(game.world.centerX,game.world.centerY,"GAME OVER",
		{font: '50px Arial', fill: '#00FF00'});

		var startLabel = game.add.text(80, game.world.height-80,'press the w key to restart', {font: '25 px Arial',fill: '#ffffff'});
		// var wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
		var NKey = game.input.keyboard.addKey(Phaser.Keyboard.N);
		NKey.onDown.addOnce(this.restart, this);
		// wKey.onDown.addOne(this.restart, this);

	},
	restart: function()
	{
		// game.state.start('boot');
		game.state.start('menu');
	}
	
}