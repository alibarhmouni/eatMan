
var padInit = function()
{
    game.input.gamepad.start();

    // To listen to buttons from a specific pad listen directly on that pad game.input.gamepad.padX, where X = pad 1-4
    pad1 = game.input.gamepad.pad1;

    // game.input.onDown.add(dump, this);
}


var gamePadControls = function()
{
	
	if( (cursors.left.isDown && !fireButton.isDown) || (!pad1.isDown(Phaser.Gamepad.XBOX360_X) 
        && (pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1)) )
    {
        mainCharacter.state = "walkingLeft";
    }

    else if( (cursors.right.isDown && !fireButton.isDown) || (!pad1.isDown(Phaser.Gamepad.XBOX360_X) 
        && pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1)  )
    {
        mainCharacter.state = "walkingRight";
    }

    else if ((cursors.left.isDown && fireButton.isDown) || (pad1.isDown(Phaser.Gamepad.XBOX360_X) 
        &&(pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1)) )
    {
         mainCharacter.state = "leftFire";
    }

    else if ( (cursors.right.isDown && fireButton.isDown) || (pad1.isDown(Phaser.Gamepad.XBOX360_X) 
        && (pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1)) )
    {
         mainCharacter.state = "rightFire";
    }
    else if( (cursors.down.isDown) || pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_DOWN) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > 0.1)
    {
        mainCharacter.state = "down";
    }

    else if (fireButton.isDown || pad1.isDown(Phaser.Gamepad.XBOX360_X))
    {

        mainCharacter.state = "fire";
        
    }
    else if (bonusButton.isDown || pad1.isDown(Phaser.Gamepad.XBOX360_Y))
    {

        mainCharacter.state = "usingBonus";

    }
    else if (pad1.justPressed(Phaser.Gamepad.XBOX360_START))
    {
        if(!game.paused)
        {
            game.paused = true;
            console.log(game.paused);
        }
        else if(game.paused)
        {
             game.paused = false;
            console.log(game.paused);

        }
    }

    else
    {
        mainCharacter.state = "idle";
    }

}


