var testCollisions = function(_game,_player)
{
	function overlapBulletEnemy(enemy, _index, _bullet, _enemy) 
	{
        console.log(_enemy);
        _enemy.animations.play('enemyCry');

        _bullet.kill();
        
        enemy.health -=1;

        if(enemy.health <= 0)
        {
            
            
            createExplosion(_enemy.body.position.x,_enemy.body.position.y);
            particleBurst(_enemy.body.position.x,_enemy.body.position.y);
            enemiesKilled +=1;
            randomBonus = Math.floor(Math.random()*5);
            
            if(randomBonus == 1)
            {   
                setTimeout(function(){

                    createBonus( _enemy.body.position.x, _enemy.body.position.y +75);
                },1000)
                
            }
            _enemy.kill();
            // enemiesId --;
            // enemies.splice(_index, 1);
            // enemies.length --;
            

            console.log("enemies killed: "+ enemiesKilled);
            
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

    function overlapEnemyExplosion(_enemy, _explosion)
    {
        enemies[i].health = 0;
        console.log("boum!");
        // createExplosion(_enemy.body.position.x,_enemy.body.position.y);
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

    // console.log(enemies);
    for(let i=0; i<enemies.length; i++)
    {

        game.physics.arcade.collide(layerCollision,  enemies[i].Sprite);
        // game.physics.arcade.collide(mainCharacter.Sprite, enemies[i].Sprite);
        game.physics.arcade.collide(layerCollision, emitter.children);

        game.physics.arcade.collide(mainCharacter.weapon.bullets.hash,enemies[i].Sprite, overlapBulletEnemy.bind(this, enemies[i],i));
        game.physics.arcade.overlap(mainCharacter.Sprite, enemies[i].Sprite, overlapEatmanEnemy, null, this);
        game.physics.arcade.overlap(enemies[i].Sprite, currentBonus, overlapEnemyBonus, null, this);
        game.physics.arcade.overlap(enemies[i].Sprite, explosion, overlapEnemyExplosion, null, this);
        game.physics.arcade.overlap(mainCharacter.Sprite, bonus, overlapBonus, null, this);
        
        enemies[i].update();
        

    }

}
