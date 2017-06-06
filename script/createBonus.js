var createBonus = function(coordX,coordY)
    {
        bonus[bonusNumber] = game.add.sprite(coordX,coordY,'bonus');
        game.physics.arcade.enable(  bonus[bonusNumber] );
        bonus[bonusNumber].body.gravity.set(0,600);
        bonusNumber ++;
    }