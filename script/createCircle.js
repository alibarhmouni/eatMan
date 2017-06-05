   
   var createExplosion = function(_enemyX, _enemyY, _size, _type, _time)

   {
	   explosion = game.add.sprite(_enemyX,_enemyY,_type);
	   explosion.scale.setTo(_size,_size);
      explosion.anchor.set(0.5);
	   game.physics.arcade.enable( explosion );
	   explosion.animations.add('explode', [0,1,2,2,1,0], _time, true);
   	explosion.animations.play('explode');
      var _exp = explosion;

   	    setTimeout(function(){
            // console.log('explosion destroy');
            // console.log(explosion); 
   	    	_exp.destroy();
   	    },500);
   }