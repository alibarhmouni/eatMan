var createBonus = function(coordX,coordY)
    {
       
        bonus[bonusNumber] = game.add.sprite(coordX,coordY,'bonus');
        game.physics.arcade.enable(  bonus[bonusNumber] );
        bonus[bonusNumber].scale.setTo(0.25, 0.25);
        bonusNumber +=1;
    }