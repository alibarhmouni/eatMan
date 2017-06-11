
var jouerSprite;
var regles;
var Player1;
var Player2;
var Player3;
var Player4;
var cpt = 0;
var mainMenuArray = [];
var playersButtonArray= [];
var playersInGame = [];
var pressed = false;
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

		mainMenuArray[0] = game.add.sprite(game.world.centerX,800,'jouer');
		mainMenuArray[1] = game.add.sprite(300 ,800,'regles');
		playersButtonArray[0] = game.add.sprite(game.world.centerX ,150,'1Player');
		playersButtonArray[1] = game.add.sprite(game.world.centerX ,300,'2Players');
		playersButtonArray[2] = game.add.sprite(game.world.centerX ,450,'3Players');
		playersButtonArray[3] = game.add.sprite(game.world.centerX ,600,'4Players');
		// playersButtonArray[0].state = 'selected';

		// for (var i = 0; i < mainMenuArray.length; i++) 
		// {
		// 	mainMenuArray[i].anchor.set(0.5);
		// 	mainMenuArray[i].inputEnabled = true;

			
		// 	mainMenuArray[i].events.onInputOver.add(this.over.bind(i),this);
		// 	mainMenuArray[i].events.onInputOut.add(this.out.bind(i),this);
			
		// }

		// mainMenuArray[0].events.onInputDown.add(this.start,this);


		// for (var i = 0; i < playersButtonArray.length; i++) 
		// {
		// 	playersButtonArray[i].anchor.set(0.5);
		// 	playersButtonArray[i].inputEnabled = true;
		// 	playersButtonArray[i].events.onInputOver.add(this.over.bind(i),this);
		// 	playersButtonArray[i].events.onInputOut.add(this.out.bind(i),this);
		// 	playersButtonArray[i].events.onInputDown.add(this.choosePlayersNumber.bind(i),this);
		// }
		padInit();



		

		


		

		// var wKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
		// wKey.onDown.addOnce(this.start, this);

	},
	start: function()
	{
		game.state.start('start');
	},
	over: function(i)
	{

		i.tint = '0xE50F00';
	},
	out: function(i)
	{

		i.tint = '0xffffff';
	},

	choosePlayersNumber: function(i)
	{
		switch(i.key)
		{
			case "1Player":
				playersInGame[0] = 1;
				break
			case "2Players":
				playersInGame[0] = 2;
				break
			case "3Players":
				playersInGame[0] = 3;
				break
			case "4Players":
				playersInGame[0] = 4;
				break
		}
		// console.log(playersInGame);
		
		// console.log(playersInGame);
	},


	update: function()
	{
 
		
    	playersButtonArray[cpt].state = 'selected';

    	if((cpt-1) >= 0)
    	{
    		playersButtonArray[cpt-1].state = 'unselected';
    	}
    	
    	
    	if(!pressed)
    	{
    		pressed = true;
    		if(pads[0].justPressed(Phaser.Gamepad.XBOX360_DPAD_DOWN))
	    	{
	    		cpt ++;
	    	}
	    	setTimeout(function(){
	    		pressed= false;
	    	},100);
    	}
		    	
		    	
		    	
		    


		for (var i = 0; i < playersButtonArray.length; i++) 
		{
			console.log(playersButtonArray[i].state);
			if (playersButtonArray[i].state == 'unselected')
	    	{
	    		console.log('test');
	    		playersButtonArray[i].tint = '0xffffff';
	    	}
	    	if(playersButtonArray[i].state == 'selected')
	    	{
	    		playersButtonArray[i].tint = '0xE50F00';
	    	}
		}
    	
    	

	    

	}


}