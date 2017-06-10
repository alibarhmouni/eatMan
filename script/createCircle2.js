var createExplosion2 = function(_enemyX, _enemyY, _size, _type, _time)

   {
	   explosion2 = game.add.sprite(_enemyX,_enemyY,_type);
	   explosion2.scale.setTo(_size,_size);
      explosion2.anchor.set(0.5);
	   game.physics.arcade.enable( explosion2 );
	   explosion2.animations.add('explode', [0,1,2,2,1,0], _time, true);
   	explosion2.animations.play('explode');
      var _exp = explosion2;

   	    setTimeout(function(){
            // console.log('explosion destroy');
            // console.log(explosion); 
   	    	_exp.destroy();
   	    },500);
   }