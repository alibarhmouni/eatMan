class Player
{
	constructor(_id, _name, _lifePoints, _x, _y, _vx, _vy, _anchor, _gravity)
	{
		this.id = _id;
		this.name = _name;
		this.lifePoints = _lifePoints;
		this.x = _x;
		this.y = _y;
		this.vx = _vx;
		this.vy = _vy;
		this.anchor = _anchor;
		this.gravity = _gravity;
		this.idle = true;
		this.isWalking = false;
		this.isDown = false;
		this.fire = false;
		this.jumpTimer = 0;
		this.isJumping = false;


		this.Sprite = game.add.sprite(this.x, this.y, this.name);
		game.physics.arcade.enable( this.Sprite );
		this.Sprite.body.gravity.set(0,this.gravity);
		game.camera.follow(this.Sprite);
		this.Sprite.anchor.set(this.anchor);


		/*     WEAPON     */
		this.weapon = game.add.weapon(10, 'bullet');
    	this.weapon.bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS;
    	game.physics.arcade.enable( this.weapon.bullets.hash );
    	this.weapon.bulletGravity.y = 400;
		this.weapon.setBulletFrames(0, 0, true);
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
					// 	// Player.weapon.fireAngle += 1;
					// 	console.log(this.weapon.bullets.hash.fireAngle);
					// },500);
					// console.log(this.weapon.bullets.hash.fireAngle);

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





		if(this.idle)
		{
	   		this.Sprite.play('idle');
		}

		/*       INPUTS       */


		if (cursors.left.isDown && !cursors.up.isDown)
    	{
	    	this.idle = false; 
	    	this.isWalking = true;
	        
	        this.scaleLeft();
	        this.Sprite.body.velocity.x = -200;
	    	this.Sprite.play('walk');

    	}

    	else if (cursors.right.isDown && !cursors.up.isDown)
	    {
	    	this.idle = false;
	    	this.isWalking = true;

	    	if(this.isWalking)
	    	{
	    		this.scaleRight();
	    		this.Sprite.body.velocity.x = 200;
		    	this.Sprite.play('walk');
	    	}

	    }




	    else if (cursors.left.isDown && cursors.up.isDown)
	    {
	        this.scaleLeft();
	        this.idle = false;
	        this.Sprite.body.velocity.x = -200;
	        if(!this.fire)
	        {
	        	this.fire = true;
	            
	            
	            this.fireAudio.play();
	            this.Sprite.play('fire');

	            if(this.Sprite.scale.x == 1)
		        {
		            this.Sprite.scale.x *= (-1);
		            this.weapon.bulletGravity.x = 250;

		            this.weapon.fire();
		                
		        }

		        else if (this.Sprite.scale.x == -1)
		        {
		        	
		        	 this.weapon.bulletGravity.x = -250;
		        	 this.weapon.fire();
		        }
	           
	           	setTimeout(function()
	           	{
	         		this.fire = false;	
	           	}, 600);

	            
	        }
	    }

	    else if (cursors.right.isDown && cursors.up.isDown)
	    {
	        if(this.Sprite.scale.x == (-1))
	        {
	            this.Sprite.scale.x *= (-1);
	                
	        }

	        this.idle = false;
	       	this.Sprite.body.velocity.x = 200;
	        if(!this.fire)
	        {

	        	this.fire = true;
	            
	            
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
	           
	           	setTimeout(function()
	           	{
	         		this.fire = false;	
	           	}, 600);

	        }
	    }




	    else if (cursors.down.isDown)
	    {
	        this.idle = false;
	        
	        
	        
	        
	        	this.isDown = true;

	        	if(this.isDown)
	        	{
	        		this.Sprite.play('getDown');
	        		
	        	}
	        	

	    }


	    else if (cursors.up.isDown)
	    {
	    	this.idle = false;
	    	console.log('fire');
	    	// console.log(this.fire);
			
	        if(!this.fire)
	        {
	    		this.fire = true;
	        	this.Sprite.play('fire');
	            
	            this.fireAudio.play();
	           

	         	if(this.Sprite.scale.x == 1)
		        {
		            
		            this.weapon.bulletGravity.x = 250;

		            this.weapon.fire();
		                
		        }

		        else if (this.Sprite.scale.x == -1)
		        {
		        	this.weapon.bulletGravity.x = -250;
		        	this.weapon.fire();
		        }
	           
	           	setTimeout(function(){

	         		this.fire = false;
	         		console.log('fireTimeout: '+this.fire);	
	           	}, 600);
	         
				
	        }
	        
	    }

	    else
		{
			
			this.idle = true;
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


