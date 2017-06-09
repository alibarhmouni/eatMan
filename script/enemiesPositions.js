var enemiesPosition = function(_enemy)
{
	if(_enemy.direction == "left")
	{
		// console.log(_direction);
		_enemy.Sprite.scale.set(1);
		_enemy.Sprite.body.velocity.x *= (-1);
		
	}
	else if(_enemy.direction == "right")
	{
		_enemy.Sprite.body.velocity.x *= 1;
	}		
}