var game = new Phaser.Game(1600,900,Phaser.AUTO,'game',
		{preload:preload,create:create,update:update,render:render});

function preload(){
	
	// game.load.image('circle', 'img/meatBoy.png');
    game.load.tilemap('map', 'map.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tileMap', 'img/map.png');
    game.load.image('platform', 'img/platform.png');
    game.load.image('plante1', 'img/plants1.png');
    game.load.image('plante2', 'img/plants2.png');
    game.load.spritesheet('eatMan', 'img/meatSpriteSheet.png', 80, 110, 28);
	game.load.spritesheet('bullet', 'img/meatBullet.png', 10, 10, 1);
    game.load.spritesheet('flowerSprite', 'img/flowerSprite.png', 192/3, 64, 3);
    game.load.spritesheet('treeSprite', 'img/treeSpriteSheet.png', 1350/3, 678, 3);

};
var map;
var eatMan;
var isWalking = false;
var isDown = false;
var idle = true;
var fire = false;
var isJumping = false;
var jumpButton;
var flower;
var jumpTimer = 0;
var weapon;
function create(){

	map = game.add.tilemap('map');
    map.addTilesetImage('tileset','tileMap');
    map.addTilesetImage('platform','platform');
    game.stage.backgroundColor = 'blue';
   

    tree = game.add.sprite(700,200,'treeSprite');
    tree.animations.add('treeDance', [0,1,2], 3, true);
    tree.animations.play('treeDance');
     
    layer = map.createLayer('fond');
    layerCollision = map.createLayer('collisions');
    layerCollision.alpha = 0;
    map.setCollisionBetween(0, 101,true,layerCollision);
    game.physics.startSystem(Phaser.Physics.arcade);
	eatMan = game.add.sprite(320,770,'eatMan');
	plante1 = game.add.sprite(500,805,'plante1');
	plante2 = game.add.sprite(400,805,'plante2');
	
    
   
    eatMan.animations.add('walk', [0,1,2,3], 10, true);
    game.physics.arcade.enable( eatMan );
    eatMan.body.gravity.set(0, 600);
    eatMan.anchor.set(0.5);
    game.camera.follow(eatMan);

    game.world.setBounds(0, 0, 71680, 896);
    weapon = game.add.weapon(10, 'bullet');
    weapon.setBulletFrames(0, 0, true);
    weapon.bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS;
    weapon.bulletSpeed = 500;
    weapon.fireRate = 500;
    weapon.trackSprite(eatMan, 20, 15, true);


      /* Flower animations */
    flower = game.add.sprite(320,805,'flowerSprite');
    flower.animations.add('danse', [0,1,2,1], 3, true);
    flower.animations.play('danse');

   
    


    
    

    /* Adding animations */
    idle = eatMan.animations.add('idle', [8,9], 5, true);
    eatMan.animations.add('walk', [0,1,2,3], 10, true);
    eatMan.animations.add('getDown', [6], 5, true);
    eatMan.animations.add('fire', [5,11], 5, true);
    eatMan.animations.add('jump', [10,11], 5, true);
   
    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
};


function update(){

    game.physics.arcade.collide(layerCollision, eatMan);

	eatMan.body.velocity.x = 0;
	console.log(idle);
	if(idle)
	{
	    eatMan.play('idle');
	}

    if (cursors.left.isDown && !cursors.up.isDown)
    {
    	idle = false; 
    	isWalking = true;
        
        if(eatMan.scale.x == 1)
        {
        	eatMan.scale.x *= (-1);
        }
        eatMan.body.velocity.x = -200;
    	eatMan.play('walk');
    	console.log(eatMan.scale.x);

    }

    else if (cursors.right.isDown && !cursors.up.isDown)
    {
    	idle = false;
    	isWalking = true;
    	if(isWalking)
    	{
    		if(eatMan.scale.x == (-1))
    		{
	    		eatMan.scale.x *= (-1);
	    		
    		}
    		eatMan.body.velocity.x = 200;
	    	eatMan.play('walk');
	    	console.log(eatMan.scale.x);
    	}

    }

    else if (cursors.left.isDown && cursors.up.isDown)
    {
        if(eatMan.scale.x == 1)
        {
            eatMan.scale.x *= (-1);
                
        }

        idle = false;
        fire = true;
        if(fire)
        {
            eatMan.body.velocity.x = -200;
            eatMan.play('fire');
        }
    }

    else if (cursors.right.isDown && cursors.up.isDown)
    {
        if(eatMan.scale.x == (-1))
        {
            eatMan.scale.x *= (-1);
                
        }

        idle = false;
        fire = true;
        if(fire)
        {
            eatMan.body.velocity.x = 200;
            eatMan.play('fire');
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
      
        idle = false;
        fire = true;
        if(fire)
        {
            eatMan.play('fire');
            weapon.fire();
        }
        
    }
  
     if(eatMan.body.blocked.down)
    {
         if (jumpButton.isDown && game.time.now > jumpTimer)
         {
            
                eatMan.body.velocity.y = -400;
                jumpTimer = game.time.now + 750;
                
         }
     }

	

};

function render(){
	

};