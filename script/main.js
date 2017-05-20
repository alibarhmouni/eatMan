var game = new Phaser.Game(1600,900,Phaser.AUTO,'game',
		{preload:preload,create:create,update:update,render:render});

function preload(){
	
	// game.load.image('circle', 'img/meatBoy.png');
    game.load.tilemap('map', 'map.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tileMap', 'img/map.png');
    game.load.image('platform', 'img/platform.png');
    game.load.image('plante1', 'img/plants1.png');
    game.load.image('plante2', 'img/plants2.png');
    game.load.audio('fireBullet', 'audio/fireBullet.mp3');
    game.load.spritesheet('eatMan', 'img/meatSpriteSheet.png', 80, 110, 28);
	game.load.spritesheet('bullet', 'img/meatBullet.png', 10, 10, 1);
    game.load.spritesheet('flowerSprite', 'img/flowerSprite.png', 192/3, 64, 3);
    game.load.spritesheet('treeSprite', 'img/treeSpriteSheet.png', 1350/3, 678, 3);
    game.load.spritesheet('ennemi', 'img/spriteSheetEnemis.png', 240/3, 220/2, 3);

};
var map;
var mainCharacter;

// var idle = true;


var jumpButton;
var flower;

// var weapon;
var fireAudio;
function create(){

	map = game.add.tilemap('map');
    map.addTilesetImage('tileset','tileMap');
    map.addTilesetImage('platform','platform');
     game.stage.backgroundColor = "#0B5D73";
    

    
 


    tree = game.add.sprite(700,200,'treeSprite');
    tree.animations.add('treeDance', [0,1,2], 2, true);
    tree.animations.play('treeDance');





     
    layer = map.createLayer('fond');
    layerCollision = map.createLayer('collisions');
    layerCollision.alpha = 0;
    map.setCollisionBetween(0, 101,true,layerCollision);
    game.physics.startSystem(Phaser.Physics.arcade);


	mainCharacter = new Player(5,"eatMan",10,100,100,200,0,0.5,600);
	
	plante1 = game.add.sprite(600,805,'plante1');
	plante2 = game.add.sprite(200,805,'plante2');
	

	/*    ENNEMY     */


	ennemi = game.add.sprite(900,756,'ennemi');
    ennemi.animations.add('ennemiWalk', [0,1,2,1], 5, true);
    ennemi.animations.play('ennemiWalk');
    game.physics.arcade.enable( ennemi );
    


    game.world.setBounds(0, 0, 16000, 896);
    
         // weapon    

    
    


      /* Flower animations */
    flower = game.add.sprite(1000,805,'flowerSprite');
    flower.animations.add('danse', [0,1,2,1], 3, true);
    flower.animations.play('danse');

   
   
    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.A);



};


function update(){

	mainCharacter.update();


    
    game.physics.arcade.collide(layerCollision, ennemi);
    game.physics.arcade.collide(Player.Sprite, ennemi);
    game.physics.arcade.collide(Player.weapon, ennemi);
    ennemi.body.velocity.x = -250;
    
    // setTimeout(function(){
	    
	   //  ennemi.body.velocity.x *= -1 ;
	   //  console.log(ennemi.body.velocity.x);
    // },1000);




	// function overlapFunction(item1, item2) 
	// {
	// 	console.log('test');
	// 	item1.kill();
	// }

	// 	// game.physics.arcade.overlap(weapon.bullets.hash,ennemi, overlapFunction, null, this);
	// 	// game.physics.arcade.overlap(eatMan, ennemi, overlapFunction, null, this);

};

function render(){
	
// game.debug.body(eatMan);
// game.debug.body(ennemi);
// game.debug.body(weapon);
};