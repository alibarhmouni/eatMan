var testCollisions = function(_game,_player)
{
	function overlapBulletEnemy(_bullet, _enemy) 
	{
        _enemy.animations.play('enemyCry');

        _bullet.kill();
        
        enemies[i].health -=1;

        if(enemies[i].health <= 0)
        {
            randomBonus = Math.floor(Math.random()*3);
            if(randomBonus == 1)
            {
                // console.log(randomBonus);
                createBonus( _enemy.body.position.x, _enemy.body.position.y +75);
                _enemy.kill();
                particleBurst(_enemy.body.position.x,_enemy.body.position.y);
                enemiesKilled +=1;
                console.log("enemies killed: "+ enemiesKilled);
            }
            
            
        }

        
	}

    function overlapWorldEnemy(_world,_enemy)
    {
        console.log('touch');
        // _enemy.scale.x *= (-1);
        // enemies[i].vx *= (-1);
    }
    function overlapBonus(_player,_bonus)
    {
        mainCharacter.bonusCharacter[0] = bonusArray[Math.round(Math.random()*1)];
        _bonus.kill();
   
    }
    function overlapEnemyBonus(_enemy, _currentBonus)
    {
        if(_currentBonus.key == "plante2")
        {
            _enemy.body.velocity.y = -600;
            _currentBonus.kill();
        }
        else if(_currentBonus.key == "ketchup")
        {
            // _enemy.animations.play('EnemySlip');
            enemies[i].state = "slip";
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

        _game.myHealthBar.setPercent(_player.health); 

         
	}


    for(i=0; i<enemiesId; i++)
    {
    	
        game.physics.arcade.collide(layerCollision,  enemies[i].Sprite);
        // game.physics.arcade.collide(mainCharacter.Sprite, enemies[i].Sprite);

        game.physics.arcade.overlap(mainCharacter.weapon.bullets.hash,enemies[i].Sprite, overlapBulletEnemy, null, this);
        game.physics.arcade.overlap(mainCharacter.Sprite, enemies[i].Sprite, overlapEatmanEnemy, null, this);
        game.physics.arcade.overlap(enemies[i].Sprite, currentBonus, overlapEnemyBonus, null, this);
        game.physics.arcade.overlap(mainCharacter.Sprite, bonus, overlapBonus, null, this);
        // game.physics.arcade.overlap(layerWorldCollision, enemies[i].Sprite, overlapWorldEnemy, null, this);
        enemies[i].update();
        

    }

}