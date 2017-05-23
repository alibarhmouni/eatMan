class Enemy
{
	constructor(_id, _name, _lifePoints, _x, _y, _vx, _vy, _anchor,state)
	{
		this.id = _id;
		this.name = _name;
		this.lifePoints = _lifePoints;
		this.x = _x;
		this.y = _y;
		this.vx = _vx;
		this.vy = _vy;
		this.anchor = _anchor;
		this.state = state;
		this.Sprite = game.add.sprite(this.x,this.y,'enemy');
		game.physics.arcade.enable( this.Sprite );
		this.Sprite.body.gravity.set(0,600);
		this.Sprite.animations.add('enemyWalk', [0,1,2,1], 5, true);
	    this.Sprite.animations.add('enemyCry', [3,4], 5, true);
	    this.Sprite.animations.play('enemyWalk');
		this.Sprite.scale.set(1.5);
		this.Sprite.body.setSize(60, 100, 15, 10);

	}

	update()
	{
		/*console.log(this.state);*/
		switch(this.state)
		{
			case "hit":
	     		
            	this.lifePoints -=1;
                this.state = "idle";  

	     		break;

	     

	     	default: 
	     		this.state = "idle";
	     		break;
		}
	}

		
		
}