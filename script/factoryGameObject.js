class Factory
{
	constructor(_name, _health, _x, _y, _anchor,state)
	{
		this.name = _name;
		this.health = _health;
		this.x = _x;
		this.y = _y;
		this.anchor = _anchor;
		this.state = state;
		this.Sprite = game.add.sprite(this.x, this.y, this.name);
		game.physics.arcade.enable( this.Sprite );
    	this.Sprite.anchor.set(0.5);
    	this.Sprite.animations.add('openDore', [1,0], 5, false);
    	this.Sprite.body.setSize(190, 75, 150, 120);
    	this.Sprite.scale.set(1.20);


    		enterFactory = false;
			this.isEnteringFactory = function()
			{
				if(!enterFactory)
				{
					enterFactory = true;
					// this.Sprite.tint =  '0xE50F00';
					this.health +=25;
					customers ++;
					customersPercent += 2.5;
					this.Sprite.play('openDore');
					
					var _self = this;
					setTimeout(function()
			    	{
			    	   // _self.Sprite.tint = '0xffffff';
			    	   // console.log(_self.Sprite);
			    	   
					}, 100);

				}
			}



	}

	update()
	{
		if(this.state == "idle")
		{
			// console.log('idle');
		}
		else if(this.state == "hit")
		{
			this.isEnteringFactory();
			// console.log(this.health);
		}
	}
}
