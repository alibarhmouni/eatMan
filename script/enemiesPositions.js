var enemiesPosition = function(_enemy)
{
	
	/* function that makes enemy move ad return
	* 
	* 1st arg: the enemy
	* sec arg: the highest x position where the enemy must return
	* thrd arg: the smallest x position where the enemy must return

	*/	

	var positions = function( __enemy, _direction)
	{
		if(_direction == "left")
		{
			// console.log(_direction);
			__enemy.Sprite.scale.set(1);
			__enemy.Sprite.body.velocity.x *= (-1);
			
		}
		else if(_direction == "right")
		{
			__enemy.Sprite.body.velocity.x *= 1;
		}
		
		
	

	}

	for (var i = 0; i < countEnemies; i++) 
	{
		
		positions(_enemy, _enemy.direction);
		// console.log(enemies[i].direction);
	}



	// positions(enemies[1],2400,100);
	// positions(enemies[2],2400,100);
	// positions(enemies[3],2400,100);
	// positions(enemies[4],2400,100);


	
	     		
}