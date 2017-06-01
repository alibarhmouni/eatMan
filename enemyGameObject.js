class Enemy
{
	constructor(_id, _name, _health, _x, _y, _vx, _vy, _anchor,state,_direction)
	{
		this.id = _id;
		this.name = _name;
		this.health = _health;
		this.x = _x;
		this.y = _y;
		this.vx = _vx;
		this.vy = _vy;
		this.anchor = _anchor;
		this.state = state;
		this.direction = _direction;
		this.Sprite = game.add.sprite(this.x,this.y,'enemy');
		game.physics.arcade.enable( this.Sprite );
		this.Sprite.body.gravity.set(0,600);
		this.Sprite.animations.add('enemyWalk', [0,1,2,1], 5, true);
	    this.Sprite.animations.add('enemyCry', [3,4], 5, true);
	    this.Sprite.animations.play('enemyWalk');
	    this.Sprite.anchor.set(this.anchor);
		this.Sprite.scale.set(1.5);
		this.Sprite.body.setSize(60, 100, 15, 10);
		this.Sprite.body.velocity.x = this.vx;
		this.Sprite.body.checkCollision.up = false;
		this.Sprite.body.checkCollision.left = false;
		this.Sprite.body.checkCollision.right = false;
		this.Sprite.body.collideWorldBounds=true;
	
	
		

	}

	update()
	{

		switch(this.state)
		{
			// case "hit":
	  //    		// console.log(this.health);
   //              this.state = "idle";  

	  //    		break;

	     	case "invisible":
	     		console.log("ennemi mort ");
                

	     		break;

	     	

	     	case "slip":
	     		
                

	     		break;

	     	case "idle":

	    		// console.log(this.Sprite.body.position.x);
	    		// enemiesPosition();

	     		break;

		}
	}

		
		
}