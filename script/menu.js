
var jouerSprite;
var regles;
var mainMenuArray = [];
var menuState = 
{


	create: function()
	{
		

		var mainMenuImage = game.add.image(game.world.centerX,game.world.centerY,'backgroundMenu');
		// console.log(mainMenuImage.texture.width);
		mainMenuImage.anchor.set(0.5);
		// mainMenuImage.events.onInputDown.add(listener, this);
		var nameLabel = game.add.text(game.world.centerX, game.world.centerY/2 ,"EATMAN",{font: '50px Arial', fill: '#ffffff'});
		nameLabel.anchor.set(0.5);

		mainMenuArray[0] = game.add.sprite(game.world.centerX,game.world.centerY,'plante');
		mainMenuArray[1] = game.add.sprite(game.world.centerX +200,game.world.centerY,'ketchup');

		for (var i = 0; i < mainMenuArray.length; i++) 
		{
			mainMenuArray[i].anchor.set(0.5);
			mainMenuArray[i].inputEnabled = true;

			
			mainMenuArray[i].events.onInputOver.add(this.over.bind(i),this);
			mainMenuArray[i].events.onInputOut.add(this.out.bind(i),this);
			
		}
		mainMenuArray[0].events.onInputDown.add(this.start,this);


		


		

		// var wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
		// wKey.onDown.addOnce(this.start, this);

	},
	start: function()
	{
		game.state.start('play');
	},
	over: function(i)
	{

		i.tint = '0xE50F00';
	},
	out: function(i)
	{

		i.tint = '0xffffff';
	}

	


}