var game = new Phaser.Game(1800,920,Phaser.AUTO,'game',
		{preload:preload,create:create,update:update,render:render});

function preload(){
	
	// game.load.image('circle', 'img/meatBoy.png');
	game.load.spritesheet('eatMan', 'img/meatSpriteSheet.png', 80, 110, 28);
};
var eatMan;
var isWalking = false;
var isDown = false;
var idle = true;
function create(){

	
	eatMan = game.add.sprite(320,770,'eatMan');
    eatMan.anchor.set(0.5);eatMan.animations.add('walk', [0,1,2,3], 10, true);
    var idle = eatMan.animations.add('idle', [8,9], 5, true);
    var walk = eatMan.animations.add('walk', [0,1,2,3], 10, true);
    var getDown = eatMan.animations.add('getDown', [6], 5, true);
    eatMan.animations.play('walk');
    game.physics.enable(eatMan, Phaser.Physics.ARCADE);
    cursors = game.input.keyboard.createCursorKeys();
};


function update(){

	eatMan.body.velocity.set(0);
	console.log(idle);
	if(idle)
	{
	    eatMan.play('idle');
	}


	

    if (cursors.left.isDown)
    {
    	idle = false; 
    	isWalking = true;
        
        if(eatMan.scale.x == 1)
        {
        	eatMan.scale.x *= (-1);
        }
        eatMan.body.velocity.x = -100;
    	eatMan.play('walk');
    	console.log(eatMan.scale.x);

    }

    else if (cursors.right.isDown)
    {
    	idle = false;
    	isWalking = true;
    	if(isWalking)
    	{
    		if(eatMan.scale.x == (-1))
    		{
	    		eatMan.scale.x *= (-1);
	    		
    		}
    		eatMan.body.velocity.x = 100;
	    	eatMan.play('walk');
	    	console.log(eatMan.scale.x);
    	}

    }
   
    else if (cursors.down.isDown)
    {
        idle = false;
        
        
        // console.log(isDown);
        
        	isDown = true;
        	if(isDown)
        	{
        		eatMan.play('getDown');
        		
        	}
        	idle = true;

    }
    else
	{
		isWalking = false;
		idle = true;
	}





	if (cursors.up.isDown)
    {
        eatMan.body.velocity.y = -100;
        // eatMan.play('up');
    }
	

};

function render(){
	

};