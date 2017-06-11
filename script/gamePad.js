
var padInit = function()
{
    game.input.gamepad.start();

    // To listen to buttons from a specific pad listen directly on that pad game.input.gamepad.padX, where X = pad 1-4
    pads = game.input.gamepad._gamepads;

    // game.input.onDown.add(dump, this);
}


var gamePadControls = function()
{
    for (var i = 0; i < pads.length; i++) 
    {
        for (var c = 0; c < mainCharacterArray.length; c++) 
        {

            let pad = pads[i];
            if(pad.connected)
            {


                if( (cursors.left.isDown && !fireButton.isDown) || (!pad.isDown(Phaser.Gamepad.XBOX360_X) 
                    && (pad.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1)) )
                {

                    mainCharacterArray[c].state = "walkingLeft"; 
                }

                else if( (cursors.right.isDown && !fireButton.isDown) || (!pad.isDown(Phaser.Gamepad.XBOX360_X) 
                    && pad.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) || pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1)  )
                {
                    mainCharacterArray[c].state = "walkingRight";

                }

                else if ((cursors.left.isDown && fireButton.isDown) || (pad.isDown(Phaser.Gamepad.XBOX360_X) 
                    &&(pad.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1)) )
                {
                     mainCharacterArray[c].state = "leftFire";
                }

                else if ( (cursors.right.isDown && fireButton.isDown) || (pad.isDown(Phaser.Gamepad.XBOX360_X) 
                    && (pad.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) || pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1)) )
                {
                     mainCharacterArray[c].state = "rightFire";
                }
                else if( (cursors.down.isDown) || pad.isDown(Phaser.Gamepad.XBOX360_DPAD_DOWN) || pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > 0.1)
                {
                    mainCharacterArray[c].state = "down";
                }

                else if (fireButton.isDown || pad.isDown(Phaser.Gamepad.XBOX360_X))
                {

                    mainCharacterArray[c].state = "fire";
                    
                }
                else if (bonusButton.isDown || pad.isDown(Phaser.Gamepad.XBOX360_Y))
                {

                    mainCharacterArray[c].state = "usingBonus";

                }
                else if (pad.justPressed(Phaser.Gamepad.XBOX360_START))
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

                // else
                // {
                   // mainCharacterArray[c].state ="idle";
                   
                   
                //     // mainCharacter2.state = "idle";
                // }
            }
        }
	
	
    }
}


