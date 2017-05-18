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
	eatMan = game.add.sprite(100,810,'eatMan');
	plante1 = game.add.sprite(600,805,'plante1');
	plante2 = game.add.sprite(300,805,'plante2');
	// fireAudio = game.add.audio('fireBullet');
	fireAudio = new Phaser.Sound(game,'fireBullet',1,false);

	
    
   
    eatMan.animations.add('walk', [0,1,2,3], 10, true);
    game.physics.arcade.enable( eatMan );
    eatMan.body.gravity.set(0, 600);
    eatMan.anchor.set(0.5);
    game.camera.follow(eatMan);

    game.world.setBounds(0, 0, 16000, 896);
    weapon = game.add.weapon(10, 'bullet');
    weapon.trackSprite(eatMan, 0, 15, false);
    weapon.setBulletFrames(0, 0, true);
    weapon.bulletKillType = Phaser.Weapon.KILL_CAMERA_BOUNDS;
    weapon.bulletSpeed = 500;
    weapon.fireRate = 500;
    


      /* Flower animations */
    flower = game.add.sprite(1000,805,'flowerSprite');
    flower.animations.add('danse', [0,1,2,1], 3, true);
    flower.animations.play('danse');

   

    /* Adding animations */
    idle = eatMan.animations.add('idle', [8,9], 5, true);
    eatMan.animations.add('walk', [0,1,2,3], 10, true);
    eatMan.animations.add('getDown', [6], 5, true);
    eatMan.animations.add('fire', [5,11], 5, false);
    eatMan.animations.add('jump', [10,11], 5, true);
   
    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.A);



};


function update(){

    game.physics.arcade.collide(layerCollision, eatMan);
    game.physics.arcade.collide(layerCollision, weapon);

	eatMan.body.velocity.x = 0;

	if(eatMan.scale.x == 1)
	{
		weapon.fireAngle = Phaser.ANGLE_RIGHT;
	}
	else if (eatMan.scale.x == -1)
	{
		weapon.fireAngle = Phaser.ANGLE_LEFT;
	}


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
            fire = false;
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
            fire = false;

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
        	

    }
    else
	{
		
		idle = true;
	}

	/*        INPUTS          */

	// if (cursors.up.isDown)
 //    {
 //    	idle = false;
    	
		
 //        if(!fire)
 //        {

 //    		fire = true;
        	
        

 //            weapon.fire();
 //            console.log(weapon);
 //            if(weapon){
 //            		fireAudio.play();
 //            }
 //            eatMan.play('fire');
           
 //         	fire = false;
 //         	// console.log(eatMan.animations.currentAnim.isFinished);
         
			
 //        }
        
 //    }
    




  

  
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