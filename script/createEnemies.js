var createEnemies = function(_maxEnemies, _speed, _HP)
    {
    	// console.log(stage);
    	
    	

    	if(!isCreatingEnemies)
    	{
    		if(countEnemies < _maxEnemies)
		    {   countEnemies +=1;
		        isCreatingEnemies = true;
		        randomDirection = Math.floor(Math.random()*2);
		      
		        // console.log(enemiesId);
		        enemies.push(new Enemy(enemiesId,"ennemy",_HP,740,0,_speed,0,0.5,"idle",enemiesDirections[randomDirection]));
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

    




