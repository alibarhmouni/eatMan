var game = new Phaser.Game(1600,900,Phaser.AUTO,'game',
		{preload:preload,create:create,update:update,render:render});

function preload(){
	
    game.load.tilemap('map', 'map.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('ground', 'img/groundSheet.png');
    game.load.image('plante1', 'img/plants1.png');
    game.load.image('plante2', 'img/plants2.png');
    game.load.audio('fireBullet','audio/fireBullet.mp3' );
    game.load.spritesheet('eatMan', 'img/meatSpriteSheet2.png', 80, 110, 28);
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
var isJumping;
var barConfig;
var enemies = [];
var tweenEnemy;
function create()
{

    game.physics.startSystem(Phaser.Physics.arcade);
    game.world.setBounds(0,0,896,8000);
    map = game.add.tilemap('map');
    map.addTilesetImage('groundSheet','ground');

    game.camera.x = 0;
    game.camera.y = 7090;

   
    // this.myHealthBar.setFixedToCamera();


    game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

    game.stage.backgroundColor = "#0B5D73";

 

    layer = map.createLayer('fond');
    layerCollision = map.createLayer('collisions');
    arrierePlan = map.createLayer('arrierePlan');
    layerCollision.alpha = 0;
    layer.resizeWorld();
    map.setCollisionBetween(0, 68,true,layerCollision);

    mainCharacter = new Player(0,"eatMan",100,100,7770,700,0,0.5,"idle");

     /*     HEALTH BAR     */
    barConfig = {x: game.camera.x + 150, y: game.camera.y + 50, width: 250};
    this.myHealthBar = new HealthBar(this.game, barConfig);

    createEnemies();
	

	

	game.camera.follow(mainCharacter.Sprite);
	plante1 = game.add.sprite(100,605,'plante1');
	plante2 = game.add.sprite(300,605,'plante2');


    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
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
    this.myHealthBar.setPosition(game.camera.x + 150, game.camera.y + 50);


    if (cursors.left.isDown && !fireButton.isDown)
    {
        mainCharacter.state = "walkingLeft";
    }

    else if (cursors.right.isDown && !fireButton.isDown)
    {
        mainCharacter.state = "walkingRight";
    }

    else if (cursors.left.isDown && fireButton.isDown)
    {
         mainCharacter.state = "leftFire";
    }
    else if (cursors.right.isDown && fireButton.isDown)
    {
         mainCharacter.state = "rightFire";
    }
    else if (cursors.down.isDown)
    {
        mainCharacter.state = "down";
    }

    else if (fireButton.isDown)
    {

        mainCharacter.state = "fire";
        
    }

    else
    {
        mainCharacter.state = "idle";
    }


    game.physics.arcade.collide(Player.weapon, mainCharacter.Sprite);
    


    testCollisions(this,mainCharacter.lifePoints);
	
};

function render(){
	
// game.debug.body(mainCharacter.Sprite);
// game.debug.body(enemy.Sprite);
// game.debug.body(mainCharacter.weapon.bullets.hash);
};