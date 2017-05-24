var createEnemies = function()
    {
        for (var i = 0; i < 1; i++)
        {
            enemies[i] = new Enemy(i,"ennemy",5,100,7670,800,0,0.5,"idle");
            
            tweenEnemy = game.add.tween(enemies[i].Sprite).to( { x:  800 }, 16000, "Quart.easeOut");
			tweenEnemy.start();
		
			
        }
		  
		  
        
    
    }


var testCollisions = function(_game, _lifePoints)
{
	function overlapBulletEnemy(_bullet, _enemy) 
	{
        _enemy.animations.play('enemyCry');

        enemies[i].state = "hit";
        _bullet.kill();
        
        enemies[i].lifePoints -=1;

        if(enemies[i].lifePoints <= 0)
        {
            // enemy.state = "dead";
            enemies[i].Sprite.kill();
        }

        
	}

	function overlapEatmanEnemy(_character, _enemy) 
	{
		
        
        mainCharacter.state = "hit";
        if(mainCharacter.lifePoints <= 0)
        {
           
            _character.kill();
        }

        if(_character.body.position.x <= _enemy.body.position.x)
        {	
        	if(!isJumping)
        	{
        		isJumping = true;
        		_character.body.velocity.x = -2000;
        		_character.body.velocity.y = -250;
        	}
        	setTimeout(function(){
        		isJumping = false;
        	},1000);
        	
        }

        if(_character.body.position.x > _enemy.body.position.x)
        {
        	if(!isJumping)
        	{
        		isJumping = true;
        		_character.body.velocity.x = 2000;
        		_character.body.velocity.y = -250;
        	}
        	setTimeout(function(){
        		isJumping = false;
        	},1000);
        }
        console.log(_game.myHealthBar);
        _game.myHealthBar.setPercent(_lifePoints); 

         
	}


    for(i=0; i<1; i++)
    {
    	// enemies[i].update();
        game.physics.arcade.collide(layerCollision,  enemies[i].Sprite);
        game.physics.arcade.collide(mainCharacter.Sprite, enemies[i].Sprite);
        game.physics.arcade.overlap(mainCharacter.weapon.bullets.hash,enemies[i].Sprite, overlapBulletEnemy, null, this);
        game.physics.arcade.overlap(mainCharacter.Sprite, enemies[i].Sprite, overlapEatmanEnemy, null, this);
    }

}