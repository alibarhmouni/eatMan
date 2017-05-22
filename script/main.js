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
var fireAudio;
var isJumping;

function create(){

	map = game.add.tilemap('map');
    map.addTilesetImage('tileset','tileMap');
    map.addTilesetImage('platform','platform');
    // map.addTilesetImage('sweetSpriteSheet','sweet');
    game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

    game.stage.backgroundColor = "#0B5D73";

         /*     TREE     */
    tree = game.add.sprite(700,200,'treeSprite');
    tree.animations.add('treeDance', [0,1,2], 1, true);
    tree.animations.play('treeDance');

    layer = map.createLayer('fond');
    layerCollision = map.createLayer('collisions');
    // arrierePlan = map.createLayer('arrierePlan');
    layerCollision.alpha = 0;
    map.setCollisionBetween(0, 101,true,layerCollision);
    game.physics.startSystem(Phaser.Physics.arcade);

  
    /*     CHARACTERS     */
	mainCharacter = new Player(0,"eatMan",10,500,805,300,0,0.5,"idle");
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




	

    game.physics.arcade.collide(layerCollision, enemy.Sprite);
    game.physics.arcade.collide(Player.Sprite, enemy.Sprite);
    game.physics.arcade.collide(Player.weapon, enemy.Sprite);
    enemy.Sprite.body.velocity.x = -250;
    
    // setTimeout(function(){
	    
	   //  enemy.body.velocity.x *= -1 ;
	   //  console.log(enemy.body.velocity.x);
    // },1000);

    enemy.update();

	function overlapBulletEnemy(_bullet, _enemy) 
	{
		
        _enemy.animations.play('enemyCry');
        enemy.state = "hit"
        _bullet.kill();
        if(enemy.lifePoints <= 0)
        {
            // enemy.state = "dead";
            _enemy.kill();
        }
        
	}

	function overlapEatmanEnemy(_character, _enemy) 
	{
		
        
        mainCharacter.state = "hit";
        if(mainCharacter.lifePoints <= 0)
        {
           
            _character.kill();
        }
        console.log(mainCharacter.lifePoints);
        if(_character.body.position.x <= _enemy.body.position.x)
        {	
        	if(!isJumping)
        	{
        		isJumping = true;
        		_character.body.velocity.x = -2000;
        		_character.body.velocity.y = -250;
        	}
        	setTimeout(function(){
        		isJumping = false;
        	},1000);
        	
        }

        if(_character.body.position.x > _enemy.body.position.x)
        {
        	if(!isJumping)
        	{
        		isJumping = true;
        		_character.body.velocity.x = 2000;
        		_character.body.velocity.y = -250;
        	}
        	setTimeout(function(){
        		isJumping = false;
        	},1000);
        }
        
        
       
        
	}

	game.physics.arcade.overlap(mainCharacter.weapon.bullets.hash,enemy.Sprite, overlapBulletEnemy, null, this);
	game.physics.arcade.overlap(mainCharacter.Sprite, enemy.Sprite, overlapEatmanEnemy, null, this);

};

function render(){
	
// game.debug.body(mainCharacter.Sprite);
// game.debug.body(enemy.Sprite);
// game.debug.body(weapon);
};