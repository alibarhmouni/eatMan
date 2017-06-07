var interfaceMainMenu = function()
{
	game.paused = true;
    var buttonPlay = mainMenu.children[1];
    // console.log(mainMenu.children[1]);
    // buttonPlay.style.marginLeft = mainMenu.length/2;
    buttonPlay.addEventListener("click", function(e){
        game.paused = false;
	    if (game.scale.isFullScreen)
	    {
	        game.scale.stopFullScreen();
	    }
	    else
	    {
	        game.scale.startFullScreen(false);
	    }

    });
}