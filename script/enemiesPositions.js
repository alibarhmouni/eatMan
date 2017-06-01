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

			__enemy.Sprite.body.velocity.x *= (-1);
		}
		else if(_direction == "right")
		{

			__enemy.Sprite.body.velocity.x *= 1;
		}
		
		
		
		if(__enemy.Sprite.body.blocked.right || __enemy.Sprite.body.blocked.left)
		{
			
			if(__enemy.Sprite.body.velocity.x > 0)
			{
				__enemy.Sprite.body.velocity.x *= -1;
			}
			else if(__enemy.Sprite.body.velocity.x < 0)
			{
				__enemy.Sprite.body.velocity.x *= -1;
			}
			
			if(__enemy.Sprite.scale.x == -1.5)
			{
				console.log('test');
				__enemy.Sprite.scale.x *= (-1);
			}
			else if(__enemy.Sprite.scale.x == 1.5)
			{
				__enemy.Sprite.scale.x *= (-1);
			}
		}

		// else if(__enemy.Sprite.body.blocked.left == true)
		// {
		// 	if(__enemy.Sprite.body.velocity.x < 0)
		// 	{
		// 		__enemy.Sprite.body.velocity.x *= -1;
		// 	}
			
		// 	if(__enemy.Sprite.scale.x == 1.5)
		// 	{
		// 		__enemy.Sprite.scale.x *= (-1);
		// 	}
			
		// 	// console.log(__enemy.Sprite.scale.x);
		// }

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