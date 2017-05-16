var game = new Phaser.Game(1800,920,Phaser.AUTO,'game',
		{preload:preload,create:create,update:update,render:render});

function preload(){
	
	// game.load.image('circle', 'img/meatBoy.png');
	game.load.spritesheet('eatMan', 'img/meatSpriteSheet.png', 80, 110, 28);
};
var eatMan;


function create(){
	
	eatMan = game.add.sprite(320,770,'eatMan');
    eatMan.anchor.set(0.5);
    var walk = eatMan.animations.add('walkRight', [0,3], 10, true);
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
    }
    else if (cursors.right.isDown)
    {
        eatMan.body.velocity.x = 100;
        eatMan.play('walkRight');
    }
    else if (cursors.up.isDown)
    {
        // eatMan.body.velocity.y = -100;
        // eatMan.play('up');
    }
    else if (cursors.down.isDown)
    {
        // eatMan.body.velocity.y = 100;
        // eatMan.play('down');
    }
    else
    {
        eatMan.animations.stop();
}
	

};

function render(){
	

};