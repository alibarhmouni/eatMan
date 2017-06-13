var testCollisions = function(_game,_player)
{
	function overlapBulletEnemy(enemy, _index, _mainCharacter, _bullet, _enemy) 
	{
        _enemy.animations.play('enemyCry');

        _bullet.kill();
        
        enemy.health -= _mainCharacter.power;
        // console.log(_mainCharacter.power);
       
        
	}

   

    function overlapWorldEnemy(_world,_enemy)
    {
        console.log('touch');
        // _enemy.scale.x *= (-1);
        // enemies[i].vx *= (-1);
    }
    function overlapBonus(bonus, _index, _playerObject ,_player, _my_bonus)
    {
        // _playerObject.bonusCharacter[0] = bonusArray[Math.round(Math.random()*0)];

        _playerObject.health += 20;
        if(_playerObject.health > 100)
        {
            _playerObject.health = 100;
        }
        _my_bonus.destroy();
        bonus.splice(_index,1);
        bonusNumber --;

   
    }
    function overlapEnemyBonus(enemy, _bonusOnGroundArray, _index, _enemy, _bonusGround)
    {

            mineAudio.play();
            createExplosion(_bonusGround.body.position.x, _bonusGround.body.position.y, 1,"genkidama",10);
            game.camera.shake(0.05, 600);
            _bonusGround.destroy();
            _bonusOnGroundArray.splice(_index ,1);

    }

    function overlapEnemyExplosion(enemy, _index, _enemy, _explosion)
    {
        createExplosion2(_enemy.body.position.x, _enemy.body.position.y + (_enemy.body.height/2), 1, "explosion2",10);
        enemiesExplosion2.play();
        game.camera.shake(0.01, 400);
        _enemy.destroy();
        enemiesId --;
        decompteEnemies -=1;
        enemiesKilled+=1;
        enemies.splice(enemies.indexOf(enemy), 1);
       
    }

  


	function overlapEatmanEnemy( _mainCharacter, _character, _enemy) 
	{
		
        _mainCharacter.state = "hit";
        // console.log(_mainCharacter.state);

        if(_mainCharacter.health <= 0)
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
        


        

         
	}

    function overlapEnemyFactory( _factoryObject, _enemyGameObject, _enemy, _factory)
    {
        _factoryObject.state = "hit";
        _enemyGameObject.state = "enteringFactory";
        enterFactory = false;
        _enemyGameObject.health = 0;
        // decompteEnemies -=1;
        
          
    }

    // console.log(enemies);
    // console.log(mainCharacterArray);
    for(let i = 0; i < enemies.length; i++)
    {
        game.physics.arcade.collide(layerCollision,  enemies[i].Sprite);
        game.physics.arcade.collide(layerCollision, emitter.children);
        game.physics.arcade.collide(layerSideCollision,enemies[i].Sprite);
        for (let c = 0; c < mainCharacterArray.length; c++) {
            game.physics.arcade.overlap(mainCharacterArray[c].weapon.bullets.hash,enemies[i].Sprite, overlapBulletEnemy.bind(this, enemies[i],i,mainCharacterArray[c]));
            
            game.physics.arcade.overlap(mainCharacterArray[c].Sprite, enemies[i].Sprite, overlapEatmanEnemy.bind(this, mainCharacterArray[c]));
        }

        game.physics.arcade.overlap(enemies[i].Sprite, factory.Sprite, overlapEnemyFactory.bind(this,factory,enemies[i]));
        
        for (let j = 0; j < bonusOnGround.length; j++) 
        {

            game.physics.arcade.overlap(enemies[i].Sprite, bonusOnGround[j], overlapEnemyBonus.bind(this, enemies[i], bonusOnGround, j));
            game.physics.arcade.collide(layerCollision, bonusOnGround[j]);
        }


        game.physics.arcade.overlap(enemies[i].Sprite, explosion, overlapEnemyExplosion.bind(this, enemies[i],i));
        
         

        
        
    }

    for (var i = 0; i < bonus.length; i++) 
    {
         for (let c = 0; c < mainCharacterArray.length; c++) {
                game.physics.arcade.overlap(mainCharacterArray[c].Sprite, bonus[i], overlapBonus.bind(this,bonus,i, mainCharacterArray[c]));
                game.physics.arcade.collide(layerCollision,  bonus[i]);
            }
       
    }

   

}
