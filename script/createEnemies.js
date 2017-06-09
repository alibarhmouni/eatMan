var createEnemies = function(_maxEnemies, _speed)
    {
    	if(!isCreatingEnemies)
    	{
    		if(countEnemies <= _maxEnemies)
		    {   
		        isCreatingEnemies = true;
		        randomDirection = Math.floor(Math.random()*2);
		        enemies.push(new Enemy(enemiesId,"ennemy",randomLife,740,0,_speed,0,0.5,"idle",enemiesDirections[randomDirection]));
		        enemies[enemiesId].Sprite.scale.x = -1;
		        enemiesPosition(enemies[enemiesId]);
		        enemiesId +=1;
		        setTimeout(function()
		        {
		            isCreatingEnemies = false;

		        },appearanceTimingEnemies);
		    }
		    countEnemies +=1;
	    }
    }

    




