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
    function overlapBonus(bonus, _index, _player, _my_bonus)
    {
        mainCharacter.bonusCharacter[0] = bonusArray[Math.round(Math.random()*0)];
        _my_bonus.destroy();
        bonus.splice(_index,1);
        bonusNumber --;
   
    }
    function overlapEnemyBonus(enemy, _bonusOnGroundArray, _index, _enemy, _bonusGround)
    {
        if(_bonusGround.key == "mine")
        {
            mineAudio.play();
            createExplosion(_bonusGround.body.position.x, _bonusGround.body.position.y, 1,"genkidama",10);
            _bonusGround.destroy();
            _bonusOnGroundArray.splice(_index ,1);

        }
        else if(_bonusGround.key == "ketchup")
        {
            // _enemy.animations.play('EnemySlip');
            enemy.state = "slip";
        }
    }

    function overlapEnemyExplosion(enemy, _index, _enemy, _explosion)
    {
        enemy.health = 0;
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

    function overlapEnemyFactory( _factoryObject, _enemyGameObject, _enemy, _factory)
    {
        _factoryObject.state = "hit";
        console.log(_factoryObject.health);
        _enemyGameObject.state = "enteringFactory";
        enterFactory = false;
        _enemyGameObject.health = 0;
          

    }

    // console.log(enemies);
    for(let i = 0; i < enemies.length; i++)
    {

        game.physics.arcade.collide(layerCollision,  enemies[i].Sprite);
        game.physics.arcade.collide(layerCollision, emitter.children);

        game.physics.arcade.collide(layerSideCollision,enemies[i].Sprite);
        game.physics.arcade.overlap(mainCharacter.weapon.bullets.hash,enemies[i].Sprite, overlapBulletEnemy.bind(this, enemies[i],i));
        game.physics.arcade.overlap(mainCharacter.Sprite, enemies[i].Sprite, overlapEatmanEnemy);
        game.physics.arcade.overlap(enemies[i].Sprite, explosion, overlapEnemyExplosion.bind(this, enemies[i],i));
        game.physics.arcade.overlap(enemies[i].Sprite, factory.Sprite, overlapEnemyFactory.bind(this,factory,enemies[i]));
         

        for (let j = 0; j < bonusOnGround.length; j++) 
        {
            // console.log(bonusOnGround);

            game.physics.arcade.overlap(enemies[i].Sprite, bonusOnGround[j], overlapEnemyBonus.bind(this, enemies[i], bonusOnGround, j));
        }
        

    }

    for (var i = 0; i < bonus.length; i++) 
    {
        game.physics.arcade.overlap(mainCharacter.Sprite, bonus[i], overlapBonus.bind(this,bonus,i));
    }

}
