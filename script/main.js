var game = new Phaser.Game(1800,920,Phaser.AUTO,'game',
		{preload:preload,create:create,update:update,render:render});

function preload(){
	
	// game.load.image('circle', 'img/meatBoy.png');
	game.load.spritesheet('meatMan', 'img/meatSpriteSheet.png', 80, 110, 28);
};
var meatMan;


function create(){
	
	meatMan = game.add.sprite(320,770,'meatMan');
    meatMan.anchor.set(0.5);
    var walk = meatMan.animations.add('walkRight', [0,3], 10, true);
    meatMan.animations.play('walk');
    game.physics.enable(meatMan, Phaser.Physics.ARCADE);
    cursors = game.input.keyboard.createCursorKeys();
};


function update(){

	meatMan.body.velocity.set(0);

    if (cursors.left.isDown)
    {
        // meatMan.body.velocity.x = -100;
        // meatMan.play('walk');
    }
    else if (cursors.right.isDown)
    {
        meatMan.body.velocity.x = 100;
        meatMan.play('walkRight');
    }
    else if (cursors.up.isDown)
    {
        // meatMan.body.velocity.y = -100;
        // meatMan.play('up');
    }
    else if (cursors.down.isDown)
    {
        // meatMan.body.velocity.y = 100;
        // meatMan.play('down');
    }
    else
    {
        meatMan.animations.stop();
}
	

};

function render(){
	

};