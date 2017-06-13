var createEnemies = function(_maxEnemies, _HP)
    {
    	// console.log(stage);
    	
        posEnemiesX = Math.round(Math.random() * (max - min) +min );
    	
        speedEnemies = Math.round(Math.random() * (maxSpeedEnemies - minSpeedEnemies) +minSpeedEnemies);
    	if(!isCreatingEnemies)
    	{
    		if(countEnemies < _maxEnemies)
		    {   countEnemies +=1;
		        isCreatingEnemies = true;
		        randomDirection = Math.floor(Math.random()*2);
		      
		        // console.log(enemiesId);
		        enemies.push(new Enemy(enemiesId,"ennemy",_HP,posEnemiesX,0,speedEnemies,0,0.5,"idle",enemiesDirections[randomDirection]));
		        enemies[enemiesId].Sprite.scale.x = -1;

		        if(enemies[enemiesId].direction == "left")
				{
					// console.log(_direction);
					enemies[enemiesId].Sprite.scale.set(1);
					enemies[enemiesId].Sprite.body.velocity.x *= (-1);
				}
				

		        setTimeout(function()
		        {
		            isCreatingEnemies = false;

		        },appearanceTimingEnemies);
		        
		       enemiesId +=1;
		       
		    }
		    
		    

		    
	    }
    }

    




