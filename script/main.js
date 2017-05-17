var game = new Phaser.Game(1600,900,Phaser.AUTO,'game',
		{preload:preload,create:create,update:update,render:render});

function preload(){
	
	// game.load.image('circle', 'img/meatBoy.png');
    game.load.tilemap('map', 'map.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('tileMap', 'img/map.png');
    game.load.spritesheet('eatMan', 'img/meatSpriteSheet.png', 80, 110, 28);
	game.load.spritesheet('bullet', 'img/bullet.png', 96, 33, 3);
    game.load.spritesheet('flowerSprite', 'img/flowerSprite.png', 192/3, 64, 3);

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
    game.stage.backgroundColor = 'blue';
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 6000;

    layer = map.createLayer('fond');
    layerCollision = map.createLayer('collisions');
    layerCollision.alpha = 0;
    map.setCollisionBetween(0, 22,true,layerCollision);
	eatMan = game.add.sprite(320,770,'eatMan');
    
    eatMan.anchor.set(0.5);
    eatMan.animations.add('walk', [0,1,2,3], 10, true);
    game.physics.enable(eatMan, Phaser.Physics.ARCADE);
    // eatMan.body.gravity.set(0,600);

    weapon = game.add.weapon(10, 'bullet');
    // weapon.setBulletFrames(0, 0, true);
    weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
    weapon.bulletSpeed = 200;
    weapon.fireRate = 300;
    weapon.trackSprite(eatMan, 70, 0, true);


      /* Flower animations */
    flower = game.add.sprite(320,805,'flowerSprite');
    flower.animations.add('danse', [0,1,2], 2, true);
    flower.animations.play('danse');


    
    

    /* Adding animations */
    idle = eatMan.animations.add('idle', [8,9], 5, true);
    eatMan.animations.add('walk', [0,1,2,3], 10, true);
    eatMan.animations.add('getDown', [6], 5, true);
    eatMan.animations.add('fire', [10,11], 5, true);
    eatMan.animations.add('jump', [10,11], 5, true);
    eatMan.animations.play('walk');
   
    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
};


function update(){

    game.physics.arcade.collide(layerCollision, eatMan);

	eatMan.body.velocity.set(0);
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
            
             
                eatMan.body.velocity.y = -6000;
                jumpTimer = game.time.now + 750;
         }
     }

	

};

function render(){
	

};