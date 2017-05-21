var game = new Phaser.Game(1600,900,Phaser.AUTO,'game',
		{preload:preload,create:create,update:update,render:render});

function preload(){
	
	// game.load.image('circle', 'img/meatBoy.png');
    game.load.tilemap('map', 'map.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tileMap', 'img/map.png');
    game.load.image('platform', 'img/platform.png');
    // game.load.image('sweet', 'img/sweetSpriteSheet.png');
    game.load.image('plante1', 'img/plants1.png');
    game.load.image('plante2', 'img/plants2.png');
    game.load.audio('fireBullet', 'audio/fireBullet.mp3');
    game.load.spritesheet('eatMan', 'img/meatSpriteSheet.png', 80, 110, 28);
	game.load.spritesheet('bullet', 'img/graisse.png', 10, 10, 2);
    game.load.spritesheet('flowerSprite', 'img/flowerSprite.png', 192/3, 64, 3);
    game.load.spritesheet('treeSprite', 'img/treeSpriteSheet.png', 1350/3, 678, 3);
    game.load.spritesheet('enemy', 'img/spriteSheetEnemy.png', 240/3, 220/2, 6);

};
var map;
var mainCharacter;
var enemy;
var jumpButton;
var flower;
var layer;
var layerCollision;
var arrierePlan;
var fireAudio;

function create(){

	map = game.add.tilemap('map');
    map.addTilesetImage('tileset','tileMap');
    map.addTilesetImage('platform','platform');
    // map.addTilesetImage('sweetSpriteSheet','sweet');
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

    game.stage.backgroundColor = "#0B5D73";

   

    layer = map.createLayer('fond');
    layerCollision = map.createLayer('collisions');
    // arrierePlan = map.createLayer('arrierePlan');
    layerCollision.alpha = 0;
    map.setCollisionBetween(0, 101,true,layerCollision);
    game.physics.startSystem(Phaser.Physics.arcade);

        /*     TREE     */
    tree = game.add.sprite(700,200,'treeSprite');
    tree.animations.add('treeDance', [0,1,2], 2, true);
    tree.animations.play('treeDance');


    /*     CHARACTERS     */
	mainCharacter = new Player(0,"eatMan",10,800,805,300,0,0.5,"idle");
    enemy = new Enemy(1,"ennemy",5,900,756,300,0,0.5,"idle");
	
	plante1 = game.add.sprite(600,805,'plante1');
	plante2 = game.add.sprite(200,805,'plante2');

    game.world.setBounds(0, 0, 16000, 896);
    
      /* Flower animations */
    flower = game.add.sprite(1000,807,'flowerSprite');
    flower.animations.add('danse', [0,1,2,1], 3, true);
    flower.animations.play('danse');

   
   
    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.A);
    game.input.onDown.add(gofull, this);
};

 function gofull() 
{

    if (game.scale.isFullScreen)
    {
        game.scale.stopFullScreen();
    }
    else
    {
        game.scale.startFullScreen(false);
    }

}


function update(){
    mainCharacter.update(); 

    if (cursors.left.isDown && !cursors.up.isDown)
    {
        mainCharacter.state = "walkingLeft";
    }

    else if (cursors.right.isDown && !cursors.up.isDown)
    {
        mainCharacter.state = "walkingRight";
    }

    else if (cursors.left.isDown && cursors.up.isDown)
    {
         mainCharacter.state = "leftFire";
    }
    else if (cursors.right.isDown && cursors.up.isDown)
    {
         mainCharacter.state = "rightFire";
    }
    else if (cursors.down.isDown)
    {
        mainCharacter.state = "down";
    }

    else if (cursors.up.isDown)
    {

        mainCharacter.state = "fire";
        
    }

    else
    {
        mainCharacter.state = "idle";
    }




	

    game.physics.arcade.collide(layerCollision, enemy.Sprite);
    game.physics.arcade.collide(Player.Sprite, enemy.Sprite);
    game.physics.arcade.collide(Player.weapon, enemy.Sprite);
    enemy.Sprite.body.velocity.x = -250;
    
    // setTimeout(function(){
	    
	   //  enemy.body.velocity.x *= -1 ;
	   //  console.log(enemy.body.velocity.x);
    // },1000);

    enemy.update();

	function overlapFunction(item1, item2) 
	{
		
        item2.animations.play('enemyCry');
        enemy.state = "hit"
        item1.kill();
        // console.log(enemy.lifePoints); 
        if(enemy.lifePoints <= 0)
        {
            // enemy.state = "dead";
            item2.kill();
        }
        
	}
	game.physics.arcade.overlap(mainCharacter.weapon.bullets.hash,enemy.Sprite, overlapFunction, null, this);
	// game.physics.arcade.overlap(mainCharacter, enemy, overlapFunction, null, this);

};

function render(){
	
game.debug.body(mainCharacter.Sprite);
game.debug.body(enemy.Sprite);
// game.debug.body(weapon);
};