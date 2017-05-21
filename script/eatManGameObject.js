class Player
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
		this.jumpTimer = 0;
		this.fire = false;

		
		

		this.Sprite = game.add.sprite(this.x, this.y, this.name);
		game.physics.arcade.enable( this.Sprite );
		this.Sprite.body.gravity.set(0,600);
		game.camera.follow(this.Sprite);
		this.Sprite.anchor.set(this.anchor);


		/*     WEAPON     */
		this.weapon = game.add.weapon(10, 'bullet');
    	this.weapon.bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS;
    	game.physics.arcade.enable( this.weapon.bullets.hash );
    	this.weapon.bulletGravity.y = 400;
    	
    	console.log(this.weapon);
		// this.weapon.setBulletFrames(0, 1, true);
    	this.weapon.fireAngle = -75;
    	this.weapon.bulletSpeed = 500;
    	this.weapon.fireRate = 500;
    	this.weapon.trackSprite(this.Sprite, 0, 15, false);
    	this.fireAudio = new Phaser.Sound(game,'fireBullet',1,false);


		/*     adding animations      */
		this.Sprite.animations.add('walk', [0,1,2,3], 10, true);
		this.Sprite.animations.add('idle', [8,9], 5, true);
	    this.Sprite.animations.add('walk', [0,1,2,3], 10, true);
	    this.Sprite.animations.add('getDown', [6], 5, true);
	    this.Sprite.animations.add('fire', [10,11], 10, false);
	    this.Sprite.animations.add('jump', [10,11], 5, true);
	
		this.weaponAngle = function()
			{
				if(this.Sprite.scale.x == 1)
				{
					// setTimeout(function()
					// {
					// 	this.weapon.fireAngle += 1;
					// },500);
				}

				else if (this.Sprite.scale.x == -1)
				{
					this.weapon.fireAngle = Phaser.ANGLE_UP;
				}
			}

			this.scaleLeft = function()
			{
				if(this.Sprite.scale.x == 1)
		        {
		            this.Sprite.scale.x *= (-1);

		                
		        }
			}

			this.scaleRight = function()
			{
				if(this.Sprite.scale.x == (-1))
	    		{
		    		this.Sprite.scale.x *= (-1);
	    		}
			}



	}

	update()
	{
		game.physics.arcade.collide(layerCollision, this.Sprite);
		this.Sprite.body.velocity.x = 0;

		/*     Fire angle     */
			
		

		this.weaponAngle();

		switch(this.state)
		{
			case "idle":
				this.Sprite.play('idle');
				break;

			case "walkingLeft":
				this.scaleLeft();
		        this.Sprite.body.velocity.x = - this.vx;
		    	this.Sprite.play('walk');
		    	break;

		    case "walkingRight":
		    	this.scaleRight();
	    		this.Sprite.body.velocity.x = this.vx;
		    	this.Sprite.play('walk');
		    	break;
		    case "leftFire":
			    this.scaleLeft();
		        this.Sprite.body.velocity.x = -this.vx;
		        this.fireAudio.play();
		        this.Sprite.play('fire');

	            if(this.Sprite.scale.x == 1)
		        {
		            this.Sprite.scale.x *= (-1);
		            this.weapon.bulletGravity.x = this.vx;

		            this.weapon.fire();
		                
		        }

		        else if (this.Sprite.scale.x == -1)
		        {
		        	
		        	 this.weapon.bulletGravity.x = -this.vx;
		        	 this.weapon.fire();
		        }
	           
	           // 	setTimeout(function()
	           // 	{
	         		// this.fire = false;	
	           // 	}, 600);

		    	break;
		    case "rightFire":
			    if(this.Sprite.scale.x == (-1))
		        {
		            this.Sprite.scale.x *= (-1);  
		        }
		       	this.Sprite.body.velocity.x = this.vx;

		       
	            this.fireAudio.play();
	            this.Sprite.play('fire');

	            if(this.Sprite.scale.x == 1)
		        {
		            this.weapon.bulletGravity.x = 250;
		            this.weapon.fire();
		        }

		        else if (this.Sprite.scale.x == -1)
		        {
		        	 this.Sprite.scale.x *= (-1);
		        	 this.weapon.bulletGravity.x = -250;
		        	 this.weapon.fire();
		        }
	           // 	setTimeout(function()
	           // 	{
	         		// this.fire = false;	
	           // 	}, 600);

		    	break;
		    case "down":
	        	this.Sprite.play('getDown');
	     		break;

	     	case "fire":

		     	if(!this.fire)
				{
					this.fire = true;
					
					if(this.Sprite.scale.x == 1)
			        {
			            this.weapon.bulletGravity.x = 250;
			            // this.weapon.fire();
			        }

			        else if (this.Sprite.scale.x == -1)
			        {
			        	this.weapon.bulletGravity.x = -250;
			        	
			        }
			        this.weapon.fire();
			        this.Sprite.play('fire');
			        this.fireAudio.play();
			       //this.fire = false;	

			       //setTimeout(function()
	    		   //{
	           			
	               //this.fire = false;	
	               //this.state = 'idle';
				   // }, 600);
				}
	     		break;
	     
		}

		
        if(this.Sprite.body.blocked.down)
        {
	         if (jumpButton.isDown && game.time.now > this.jumpTimer)
	         {
	            
	                this.Sprite.body.velocity.y = -400;
	                this.jumpTimer = game.time.now + 750;
	         }
        }







	}
}


