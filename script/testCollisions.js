var testCollisions = function(_game,_player)
{
	function overlapBulletEnemy(enemy, _index, _bullet, _enemy) 
	{
        // console.log(_enemy);
        _enemy.animations.play('enemyCry');

        _bullet.kill();
        
        enemy.health -=1;
        // console.log(enemy.health);

        // if(enemy.health <= 0)
        // {
            
        //     createExplosion(_enemy.body.position.x, _enemy.body.position.y);
        //     particleBurst(_enemy.body.position.x, _enemy.body.position.y);
        //     enemiesKilled +=1;
            
            
        //     if( (Math.floor(Math.random()*2)) == 1)
        //     {   
        //         createBonus(_enemy.body.position.x, _enemy.body.position.y +75);
                              
        //     }

        //     _enemy.destroy();
        //     enemiesId --;
        //     enemies.splice(_index, 1);
        //     // enemies.length --;
            

        //     console.log("enemies killed: "+ enemiesKilled);
            
        // }

        
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
        _bonus.destroy();
   
    }
    function overlapEnemyBonus(enemy, _enemy, _currentBonus)
    {
        if(_currentBonus.key == "mine")
        {

            createExplosion(_currentBonus.body.position.x, _currentBonus.body.position.y, 1,"genkidama");
            _currentBonus.destroy();

        }
        else if(_currentBonus.key == "ketchup")
        {
            // _enemy.animations.play('EnemySlip');
            enemy.state = "slip";
        }
    }

    function overlapEnemyExplosion(enemy, _index, _enemy, _explosion)
    {
        enemy.health = 0;
        // createExplosion(_enemy.body.position.x, _enemy.body.position.y);
        // _enemy.destroy();
        // enemiesId --;
        // enemies.splice(_index, 1);
        // console.log("boum!");
    }

  


	function overlapEatmanEnemy(_character, _enemy) 
	{
		
        console.log('collision');
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

    // console.log(enemies);
    for(let i = 0; i < enemies.length; i++)
    {

        game.physics.arcade.collide(layerCollision,  enemies[i].Sprite);
        game.physics.arcade.collide(layerCollision, emitter.children);

        game.physics.arcade.overlap(mainCharacter.weapon.bullets.hash,enemies[i].Sprite, overlapBulletEnemy.bind(this, enemies[i],i));
        game.physics.arcade.overlap(mainCharacter.Sprite, enemies[i].Sprite, overlapEatmanEnemy);
        game.physics.arcade.overlap(enemies[i].Sprite, currentBonus, overlapEnemyBonus.bind(this, enemies[i]));
        game.physics.arcade.overlap(enemies[i].Sprite, explosion, overlapEnemyExplosion.bind(this, enemies[i],i));
        game.physics.arcade.overlap(mainCharacter.Sprite, bonus, overlapBonus);
        // console.log(enemies);
        
        
        // enemies[i].update();
        

    }

}
