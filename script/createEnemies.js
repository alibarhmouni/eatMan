var createEnemies = function()
    {

        
            enemies[0] = new Enemy(0,"ennemy",5,100,7785,300,0,0.5,"idle");
            enemies[1] = new Enemy(0,"ennemy",5,1000,7785,300,0,0.5,"idle");
            enemies[0].Sprite.scale.x = -1.5;
            enemies[1].Sprite.scale.x = -1.5;
        

		  
		  
    }


var testCollisions = function(_game,_player)
{
	function overlapBulletEnemy(_bullet, _enemy) 
	{
        _enemy.animations.play('enemyCry');

        enemies[i].state = "hit";
        _bullet.kill();
        
        enemies[i].health -=1;

        if(enemies[i].health <= 0)
        {
            // enemy.state = "dead";
            enemies[i].Sprite.kill();
        }

        
	}

	function overlapEatmanEnemy(_character, _enemy) 
	{
		
        
        mainCharacter.state = "hit";
        if(mainCharacter.health <= 0)
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

        console.log(_player.health);
        _game.myHealthBar.setPercent(_player.health); 

         
	}


    for(i=0; i<2; i++)
    {
    	
        game.physics.arcade.collide(layerCollision,  enemies[i].Sprite);
        game.physics.arcade.collide(mainCharacter.Sprite, enemies[i].Sprite);
        game.physics.arcade.overlap(mainCharacter.weapon.bullets.hash,enemies[i].Sprite, overlapBulletEnemy, null, this);
        game.physics.arcade.overlap(mainCharacter.Sprite, enemies[i].Sprite, overlapEatmanEnemy, null, this);
        enemies[i].update();
    }

}

