
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
        // for (var c = 0; c < mainCharacterArray.length; c++) 
        // {
            if(mainCharacterArray[i] === undefined)
            {
                break;
            }
            let pad = pads[i];
            if(pad.connected)
            {
                // console.log(pad);
                // console.log(game.input.gamepad.pad1);
                // console.log(game.input.gamepad.pad2);
                // console.log(game.input.gamepad.pad3);
                // console.log(game.input.gamepad.pad4);
                // console.log(mainCharacterArray.length);
                if( (cursors.left.isDown && !fireButton.isDown) || (!pad.isDown(Phaser.Gamepad.XBOX360_X) 
                    && (pad.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1)) )
                {
                    
                    mainCharacterArray[i].state = "walkingLeft"; 
                   
                }

                else if( (cursors.right.isDown && !fireButton.isDown) || (!pad.isDown(Phaser.Gamepad.XBOX360_X) 
                    && pad.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) || pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1)  )
                {
                    mainCharacterArray[i].state = "walkingRight";

                }

                else if ((cursors.left.isDown && fireButton.isDown) || (pad.isDown(Phaser.Gamepad.XBOX360_X) 
                    &&(pad.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1)) )
                {
                     mainCharacterArray[i].state = "leftFire";
                }

                else if ( (cursors.right.isDown && fireButton.isDown) || (pad.isDown(Phaser.Gamepad.XBOX360_X) 
                    && (pad.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) || pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1)) )
                {
                     mainCharacterArray[i].state = "rightFire";
                }
                else if( (cursors.down.isDown) || pad.isDown(Phaser.Gamepad.XBOX360_DPAD_DOWN) || pad.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > 0.1)
                {
                    mainCharacterArray[i].state = "down";
                }

                else if (fireButton.isDown || pad.isDown(Phaser.Gamepad.XBOX360_X))
                {

                    mainCharacterArray[i].state = "fire";
                    
                }
                else if (bonusButton.isDown || pad.isDown(Phaser.Gamepad.XBOX360_Y))
                {

                    mainCharacterArray[i].state = "usingBonus";

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
                   // mainCharacterArray[i].state ="idle";
                   
                   
                //     // mainCharacter2.state = "idle";
                // }
            }
        // }
	
	
    }
}


