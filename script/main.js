var game = new Phaser.Game(1800,920,Phaser.AUTO,'game',
		{preload:preload,create:create,update:update,render:render});

function preload(){
	
	// game.load.image('circle', 'img/meatBoy.png');
	game.load.spritesheet('eatMan', 'img/meatSpriteSheet.png', 80, 110, 28);
};
var eatMan;
var isWalking = false;
var isDown = false;

function create(){

	
	eatMan = game.add.sprite(320,770,'eatMan');
    eatMan.anchor.set(0.5);
    var walk = eatMan.animations.add('walk', [0,1,2,3], 10, true);
    var getDown = eatMan.animations.add('getDown', [6], 5, true);
    eatMan.animations.play('walk');
    game.physics.enable(eatMan, Phaser.Physics.ARCADE);
    cursors = game.input.keyboard.createCursorKeys();
};


function update(){

	eatMan.body.velocity.set(0);

    if (cursors.left.isDown)
    {
        // eatMan.body.velocity.x = -100;
        // eatMan.play('walk');
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
    	if(eatMan.scale.x == (-1))
    	{
    		eatMan.scale.x *= (-1);
    	}

		eatMan.body.velocity.x = 100;
    	eatMan.play('walk');
    	console.log(eatMan.scale.x);
       
    }
   
    else if (cursors.down.isDown)
    {
        // eatMan.body.velocity.y = 100;
        // eatMan.play('down');
        if(!isDown){
        	isDown = true;
        	if(isDown)
        	{
        		eatMan.play('getDown');
        	}
        	
        	isDown = false;
        }
    }
    else
    {
        eatMan.animations.stop();
	}

	if (cursors.up.isDown)
    {
        eatMan.body.velocity.y = -100;
        // eatMan.play('up');
    }
	

};

function render(){
	

};