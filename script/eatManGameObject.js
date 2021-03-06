class Player
{
	constructor(_id, _name, _health, _x, _y, _vx, _vy, _anchor,_state)
	{

		this.id = _id;
		this.name = _name;
		this.health = _health;
		this.x = _x;
		this.y = _y;
		this.vx = _vx;
		this.vy = _vy;
		// this.bonusCharacter = [];
		this.anchor = _anchor;
		this.state = _state;
		this.jumpTimer = 0;
		// this.spriteColor = _spriteColor;
		this.power;

		 /*     HEALTH BAR     */

        var balles;

         if(this.name == 'eatMan')
	    {
        	balles = "bullet";
	    }
	    else if(this.name == 'friteBoy')
	    {
        	balles = "fireBall";
	    }
	    else if(this.name == 'eatMan3')
	    {
	    	balles = "bullet";
	    }
	     else if(this.name == 'eatGirl')
        {
        	balles = "bullet";
        }
        
           

		this.Sprite = game.add.sprite(this.x, this.y, this.name);
		game.physics.arcade.enable( this.Sprite );
		this.Sprite.body.checkCollision.up = false;
		this.Sprite.body.gravity.set(0,600);
		this.Sprite.anchor.set(this.anchor);
		this.Sprite.body.setSize(60, 80, 15, 30);
		this.Sprite.scale.set(1);
		this.Sprite.body.collideWorldBounds=true;
		
	    // this.Sprite.tint = this.spriteColor;
		
		


		/*     WEAPON     */
		this.weapon = game.add.weapon(10, balles);
		// bullets.callAll('animations.add', 'animations', 'fire', [0,1,2,3,4,5,6], 5, true);bullets.callAll('play', null, 'fire');
    	this.weapon.bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS;
    	game.physics.arcade.enable( this.weapon.bullets.hash );
    	// this.weapon.bulletGravity.y = 400;
    	
    	
		// this.weapon.setBulletFrames(0, 1, true);
    	// this.weapon.fireAngle = -75;
    	this.weapon.bulletSpeed = 1000;
    	this.weapon.fireRate = 100;
    	// this.weapon.trackSprite(this.Sprite, 90, 45, false);
    	this.fireAudio = new Phaser.Sound(game,'fireBullet',1,false);

    	



		/*     adding animations      */
		this.Sprite.animations.add('walk', [0,1,2,3], 10, true);
		this.Sprite.animations.add('friteWalk', [0,1,2,3,2,1], 10, true);
		this.Sprite.animations.add('idle', [8,9], 5, true);
	    this.Sprite.animations.add('getDown', [6], 5, true);
	    this.Sprite.animations.add('fire', [12,13,14], 10, false);
	    this.Sprite.animations.add('fireWalk', [16,17,18], 10, true);
	    this.Sprite.animations.add('fireWalkFrite', [16,17,18], 5, true);
	    this.Sprite.animations.add('jump', [10,11], 5, true);
	    this.Sprite.animations.add('hit', [10,15], 10, true);

	    
	    if(this.name == 'eatMan')
	    {
	    	this.power = 5;
	    	barPosX = 200;
        	// this.weapon.bulletSpeed = 1000;
        	balles = "bullets";

	    }
	    else if(this.name == 'friteBoy')
	    {
	    	this.power = 10;
	    	barPosX = 1000;
        	balles = "fireBall";

        	this.weapon.bullets.forEach(function(bullet){
        		bullet.scale.setTo(0.25);
        	});
	    }
	    else if(this.name == 'eatGirl')
	    {
	    	this.power = 3;
	    	barPosX = 600;
	    }
	     else if(this.name == 'eatMan3')
        {
        	this.power = 10;
        	barPosX = 1400;
        	
        }


        this.barConfig = {x: barPosX, y: barPosY, width: 150, height: 10};
        this.myHealthBar = new HealthBar(game, this.barConfig);

	
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

			var fire = false;
			this.fireCheck = function()
			{
				if(this.name == "eatGirl")
				{
					if(!fire)
					{
						fire = true;
						this.Sprite.play('getDown');
				        this.fireAudio.play();
				        this.weapon.bulletSpeed = 1000;
						if(this.Sprite.scale.x == 1)
				        {
				        	this.weapon.trackSprite(this.Sprite, 0, -40, false);
				            // this.weapon.bulletGravity.x = 250;
							this.weapon.fireAngle = Phaser.ANGLE_UP;
					        this.weapon.fire();
				        }

				        else if (this.Sprite.scale.x == -1)
				        {
				        	this.weapon.trackSprite(this.Sprite, 0, -40, false);
				        	// this.weapon.bulletGravity.x = -250;
							this.weapon.fireAngle = Phaser.ANGLE_UP;
					        this.weapon.fire();

				        }
				        setTimeout(function()
				    	{
				           		
				           	fire = false;

						}, 100);

					}
					
				}

				if(this.name == "friteBoy")
				{
					

					if(!fire)
					{
						fire = true;
						this.Sprite.play('fire');
				        rocketAudio.play();
				        this.weapon.bulletSpeed = 1000;

						if(this.Sprite.scale.x == 1)
				        {
				        	this.weapon.trackSprite(this.Sprite, 80, 10, false);
				            // this.weapon.bulletGravity.Y = 2000;
							this.weapon.fireAngle = Phaser.ANGLE_RIGHT;
					        this.weapon.fire();
				        }

				        else if (this.Sprite.scale.x == -1)
				        {

				        	this.weapon.trackSprite(this.Sprite, -80, 10, false);
				        	// this.weapon.bulletGravity.x = -250;
							this.weapon.fireAngle = Phaser.ANGLE_LEFT;
					        this.weapon.fire();

				        }
				        setTimeout(function()
				    	{
				           		
				           	fire = false;

						}, 500);

					}
					
					
				}

				else{

					if(!fire)
					{
						fire = true;
						this.Sprite.play('fire');
				        this.fireAudio.play();
				        this.weapon.bulletSpeed = 1000;
						if(this.Sprite.scale.x == 1)
				        {
				        	this.weapon.trackSprite(this.Sprite, 80, 30, false);
				            // this.weapon.bulletGravity.x = 250;
							this.weapon.fireAngle = Phaser.ANGLE_RIGHT;
					        this.weapon.fire();
				        }

				        else if (this.Sprite.scale.x == -1)
				        {
				        	this.weapon.trackSprite(this.Sprite, -80, 30, false);
				        	// this.weapon.bulletGravity.x = -250;
							this.weapon.fireAngle = Phaser.ANGLE_LEFT;
					        this.weapon.fire();

				        }
				        setTimeout(function()
				    	{
				           		
				           	fire = false;

						}, 100);

					}
				}
				
			}


			this.fireWalk = function()
			{

				if(this.name == "friteBoy")
				{
					
				    if(!fire)
					{
						fire = true;
						this.Sprite.play('fireWalkFrite');
				        rocketAudio.play();
				        this.weapon.bulletSpeed = 1000;
						if(this.Sprite.scale.x == 1)
				        {
				            // this.weapon.bulletGravity.x = 250;
				            this.weapon.trackSprite(this.Sprite, 80, 30, false);
							this.weapon.fireAngle = Phaser.ANGLE_RIGHT;
					        this.weapon.fire();
				        }

				        else if (this.Sprite.scale.x == -1)
				        {
				        	// this.weapon.bulletGravity.x = -250;
				        	this.weapon.trackSprite(this.Sprite, -80, 30, false);
							this.weapon.fireAngle = Phaser.ANGLE_LEFT;
					        this.weapon.fire();

				        }
				        setTimeout(function()
				    	{
				           		
				           	fire = false;

						}, 500);

					}

				}

				else{
					
					if (!fire)
					{
						fire = true;
						this.Sprite.play('fireWalk');
				        this.fireAudio.play();
						if(this.Sprite.scale.x == 1)
				        {
				            // this.weapon.bulletGravity.x = 250;
				            this.weapon.trackSprite(this.Sprite, 80, 30, false);
							this.weapon.fireAngle = Phaser.ANGLE_RIGHT;
					        this.weapon.fire();
				        }

				        else if (this.Sprite.scale.x == -1)
				        {
				        	// this.weapon.bulletGravity.x = -250;
				        	this.weapon.trackSprite(this.Sprite, -80, 30, false);
							this.weapon.fireAngle = Phaser.ANGLE_LEFT;
					        this.weapon.fire();

				        }
				        setTimeout(function()
				    	{
				           		
				           	fire = false;

						}, 100);

					}
				
				}
			}
			
			var cry = false;
			this.characterHit = function()
			{
				if(!cry)
				{
					cry = true;
					this.Sprite.play('hit');
					this.Sprite.tint =  '0xE50F00';
					this.health -=5;
					var _self = this;
					setTimeout(function()
			    	{
			    	   _self.Sprite.tint = "0xffffff";
			           cry = false;
					}, 600);
				}
			}

			this.eatGirlUsingMine = function()
			{
				if(this.name == "eatGirl")
				{
					if(!usingMines)
					{

						usingMines = true;
						mine = game.add.sprite(this.Sprite.body.position.x,(this.Sprite.body.position.y+55),"mine");
	    				game.physics.arcade.enable( mine );	
	    				// mine.body.gravity.set(0,200);
	    				mine.body.gravity.y = 600;
	    				bonusOnGround.push(mine);
	    				
	    				mine.scale.set(0.65);
	    				mine.anchor.set(0.5);
	    				
	    				minePosition.play();
	    				mine.animations.add('usingMine', [0,1], 10, true);
	    				mine.play('usingMine');
	    				setTimeout(function()
					    {
					           		
					        usingMines = false;

						}, 3000);
					}
					
					
				}
			}
			



	}

	update()
	{
		// gamePadControls();
		// console.log(this);
		this.myHealthBar.setPercent(this.health);
		game.physics.arcade.collide(layerCollision, this.Sprite);
		this.Sprite.body.velocity.x = 0;
		this.Sprite.body.setSize(60, 80, 15, 30);

		/*     Fire angle     */
			
		

		// this.weaponAngle();

		switch(this.state)
		{
			case "idle":
				this.Sprite.play('idle');
				break;
    				
    			

			case "walkingLeft":
				this.scaleLeft();
		        this.Sprite.body.velocity.x = - this.vx;
		        if(this.Sprite.key == "friteMan" )
		        {
		        	this.Sprite.play('friteWalk');
		        }
		        else
		        {
		        	this.Sprite.play('walk');
		        }
		    	
		    	break;

		    case "walkingRight":
		    	this.scaleRight();
	    		this.Sprite.body.velocity.x = this.vx;

		    	if(this.Sprite.key == "friteMan" )
		        {
		        	this.Sprite.play('friteWalk');
		        }
		        else
		        {
		        	this.Sprite.play('walk');
		        }

		    	break;
		    case "leftFire":
			    this.scaleLeft();
		        this.Sprite.body.velocity.x = -this.vx;
		        this.fireWalk();

		    	break;
		    case "rightFire":

			    this.scaleRight();
		       	this.Sprite.body.velocity.x = this.vx;
		       	this.fireWalk();

		    	break;
		    case "down":
	        	this.Sprite.play('getDown');
	        	this.Sprite.body.setSize(60, 55, 15, 50);
	     		break;

	     	case "fire":

	     		this.fireCheck();
	     		break;

	     	case "usingBonus":

	     		this.eatGirlUsingMine();
	     		break;
	     	case "hit":
	     		this.characterHit();

	     		
		    	break;
		    default:
		    	"idle";

		   
		    
		}

		for (let i = 0; i < pads.length; i++) 
		{
			
			// for (var c = 0; c < mainCharacterArray.length; c++) 
			// {
				
				// console.log(pads.length);

				if(mainCharacterArray[i] === undefined)
		            {
		                break;
		            }
			
				if ((jumpButton.isDown || pads[i].isDown(Phaser.Gamepad.XBOX360_A)) && game.time.now > this.jumpTimer)
		        {

			        if(mainCharacterArray[i].Sprite.body.blocked.down)
		        	{
			            
		                mainCharacterArray[i].Sprite.body.velocity.y = -450;
		                mainCharacterArray[i].jumpTimer = game.time.now + 650;
		                
			        }
			       
		        }
		       
		    // }
	    }








	}
}


