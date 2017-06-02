   
   var createExplosion = function(_enemyX, _enemyY)

   {
	   	explosion = game.add.sprite(_enemyX,_enemyY,'explosion');
	    // explosion.scale.setTo(0.5,0.5);
	    game.physics.arcade.enable( explosion );
	    explosion.animations.add('explode', [0,1,2,1,0], 10, true);
   	    explosion.animations.play('explode');
   	    setTimeout(function(){
   	    	explosion.destroy();
   	    },500);
   }