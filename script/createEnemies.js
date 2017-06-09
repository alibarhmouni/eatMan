var createEnemies = function(_maxEnemies, _speed)
    {
    	// console.log('vague');
    	

    	if(!isCreatingEnemies)
    	{
    		if(countEnemies < _maxEnemies)
		    {   
		        isCreatingEnemies = true;
		        randomDirection = Math.floor(Math.random()*2);
		      
		        console.log(enemiesId);
		        enemies.push(new Enemy(enemiesId,"ennemy",randomLife,740,0,_speed,0,0.5,"idle",enemiesDirections[randomDirection]));
		        enemies[enemiesId].Sprite.scale.x = -1;

		        setTimeout(function()
		        {
		            isCreatingEnemies = false;

		        },appearanceTimingEnemies);
		        enemiesPosition(enemies[enemiesId]);
		    }
		    enemiesId +=1;
		    countEnemies +=1;
		    
	    }
    }

    




