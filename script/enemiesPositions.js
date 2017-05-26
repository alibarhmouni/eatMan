var enemiesPosition = function()
{
	
	/* function that makes enemy move ad return
	* 
	* 1st arg: the enemy
	* sec arg: the highest x position where the enemy must return
	* thrd arg: the smallest x position where the enemy must return

	*/

	var positions = function( _enemy, _alertX, _alertX2)
	{
		
		if(_enemy.Sprite.body.position.x >= _alertX)
		{
			
			if(_enemy.Sprite.body.velocity.x > 0)
			{
				_enemy.Sprite.body.velocity.x *= -1;
			}
			
			if(_enemy.Sprite.scale.x == -1.5)
			{

				_enemy.Sprite.scale.x *= (-1);
			}
		}

		else if(_enemy.Sprite.body.position.x <= _alertX2)
		{
			if(_enemy.Sprite.body.velocity.x < 0)
			{
				_enemy.Sprite.body.velocity.x *= -1;
			}
			
			if(_enemy.Sprite.scale.x == 1.5)
			{
				_enemy.Sprite.scale.x *= (-1);
			}
			
			// console.log(_enemy.Sprite.scale.x);
		}

	}

	positions(enemies[0],470,50);
	positions(enemies[1],1400,900);

	
	     		
}