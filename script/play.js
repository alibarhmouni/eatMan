 
		var map;
        var bonusNumber = 0;
        var usingMines = false;
        var enemy;
        var jumpButton;
        var ground;
        var layerCollision;
        var layerWorldCollision;
        var isJumping;
        var enemies = [];
        var emitter;
        var enemiesId = 0;
        var appearanceTimingEnemies = 1500;
        var enemiesKilled = 0;
        var enemiesDirections = ["left","right"];
        var randomDirection;
        var isCreatingEnemies = false;
        var randomLife = 5;
        var factory;
        var pvEnemies = 5;

        var bonus = [];
        var bonusOnGround = [];
        var bonusArray = ["mine","ketchup"];
        var currentBonus;
        var scoreText;
        var bmd;
        var innerCircle;
        var outerCircle;
        var explosion;
        var mineAudio;
        var minePosition;
        var ukulele;
        var enterFactory;
        var factoryText;
        var customers = 0;
        var customersPercent = 0;
        var pad1;
        var indicator;
        var plante;
        var mineBarPercent = 0;
        var mine;
        var mainCharacter;
        var mainCharacterArray = [];
        var explosionCount = 0;
        var waveEnemies = false;
        var countEnemies = 0;
        var nameCharactersArray = ['eatMan','eatGirl','friteBoy','eatGreen'];
        // var colorsCharacter = ['0xffffff','0xffffff','0x4696FF','0x52FF30'];
        var barPosX = 200;
        var barPosY = 55;
        var healthBarArray = [];


        // var maxEnemiesEasy = [5, 10, 15, 20, 25, 30];
        // var speedEnemiesEasy = [200, 300, 300, 350, 400];
        // var timeEnemiesEasy = [1400, 1300, 1200, 1100, 1000];

        // var maxEnemiesNormal = [15, 15, 20, 30, 35];
        // var speedEnemiesNormal = [400, 450, 500, 500, 500];
        // var timeEnemiesNormal = [900, 800, 700, 600, 500];

        // var maxEnemiesHard = [50, 60, 75, 90, 100, 110];
        // var speedEnemiesHard = [600, 650, 650, 700, 750];
        // var timeEnemiesHard = [500, 250, 200, 100, 50];

        var maxEnemies = 5;
        var speedEnemies = 300;

        var  randomEnemies = Math.round(Math.random()*5);
        decompteEnemies = maxEnemies;
        var stage = 1;
        






var playState = 
{
	
	

	create: function()
	{
        // console.log(playersInGame[0]);

	    game.physics.startSystem(Phaser.Physics.arcade);
	    game.world.setBounds(0,0,1600,900);
	    map = game.add.tilemap('map');
	    map.addTilesetImage('groundSheet','ground');
	    map.addTilesetImage('pavement','pavement');
	    map.addTilesetImage('pavement2','pavement2');
	    map.addTilesetImage('street','street');
	    map.addTilesetImage('street2','street2');
	    bmd = game.make.bitmapData(1600, 900);
	    bmd.addToWorld();
        plante = game.add.sprite(0,0,'backgroundGame');

	    particlesCreation();

	    

	    // this.myHealthBar.setFixedToCamera();
	    
	    

	    game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

	    // game.stage.backgroundColor = "0xD4DBC8";


	    ukulele = game.add.audio('songGame',1,true);
        enemiesExplosion = new Phaser.Sound(game,'enemiesExplosion',1,false);
        enemiesExplosion2 = new Phaser.Sound(game,'enemiesExplosion2',1,false);
        doorSound = new Phaser.Sound(game,'doorSound',1,false);
	    mineAudio = new Phaser.Sound(game,'mineAudio',1,false);
        mineBip = new Phaser.Sound(game,'mineBip',1,false);
	    rocketAudio = new Phaser.Sound(game,'rocketAudio',1,false);
	    minePosition = new Phaser.Sound(game,'minePosition',1,false);
	    ukulele.play();



        ground = map.createLayer('groundLayer');

	    layerCollision = map.createLayer('collisions');
	    layerSideCollision = map.createLayer('sideCollisions');
	    layerCollision.alpha = 0;
	    layerSideCollision.alpha = 0;
	    ground.resizeWorld();
	    map.setCollisionBetween(0, 501,true,layerCollision);
	    map.setCollisionBetween(0, 107,true,layerSideCollision);
	    
	    // plante = game.add.sprite(600,440,'plante');


	   
	     // /*     HEALTH BAR     */

      //    for (var i = 0; i < playersInGame[0] ; i++) 
      //      {
      //           this.barConfig = {x: barPosX, y: barPosY, width: 150, height: 10};
      //           this.myHealthBar = new HealthBar(this.game, this.barConfig);
      //           healthBarArray.push(this.myHealthBar);

      //           barPosX += 400;
      //      }
	
	   
	    // // game.camera.follow(mainCharacter.Sprite);


	    /*     FACTORY BAR     */

	    this.barConfigFactory = {x: 300, y: 55, width: 150, height: 10};
	    this.factoryHealthBar = new HealthBar(this.game, this.barConfigFactory);

	      /*     mine BAR     */
	    // this.mineBarConfig = {x: 1500, y: 55, width: 100, height: 5, bar: {color: "#1435BD"}};
	    // this.mineBar = new HealthBar(this.game, this.mineBarConfig);




	    cursors = game.input.keyboard.createCursorKeys();
	    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
	    bonusButton = game.input.keyboard.addKey(Phaser.Keyboard.UP);
	    game.input.onDown.add(gofull, this);

	    factory = new Factory("shop", 0,800,710,0.5,"idle");
	   
        
        // if(playersInGame < mainCharacterArray.length)
        // {
            mainCharacterArray.splice(playersInGame.length,(mainCharacterArray.length - playersInGame.length ));
        // }
         textInterface();
        for (var i = 0; i < playersInGame[0]; i++) 
        {
            // mainCharacterArray.length = playersInGame.length;
            mainCharacterArray[i] = new Player(i,nameCharactersArray[i],100,700,450,500,0,0.5,"idle");
            
        }
        

// console.log(mainCharacterArray.length);
 // console.log(mainCharacterArray);
  for (var i = 0; i < bonusOnGround.length; i++) {
                bonusOnGround[i].body.gravity.set(0,200);
            }

	    function particleBurst(_positionX, _positionY)
		{
		    emitter.x = _positionX;
		    emitter.y = _positionY + 50;
		    emitter.start(true, 2000, true, 10);
		}



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

    	padInit();
	},

		update: function()
		{
	 		updateScore();
            updateCustomers();

            for (let i = 0; i < mainCharacterArray.length; i++) 
            {
                // console.log(mainCharacterArray);
                mainCharacterArray[i].update();
                mainCharacterArray[i].state ="idle";
                
            }
            
            
            gamePadControls();
            // console.log(mainCharacterArray[0].state);
            factory.update();
            

            if(!waveEnemies)
            {   
                // maxEnemies = maxEnemiesHard[randomEnemies];
                // speedEnemies = speedEnemiesHard[randomEnemies];
                createEnemies(maxEnemies, speedEnemies, pvEnemies);

               
            }
             if(decompteEnemies <= 0)
                { 
                    if(mainCharacterArray.length == 1)
                    {
                        pvEnemies += 1;
                    }
                    else if(mainCharacterArray.length == 2)
                    {
                        pvEnemies += 2;
                    }
                    if(mainCharacterArray.length == 3)
                    {
                        pvEnemies += 3;
                    }
                    if(mainCharacterArray.length == 4)
                    {
                        pvEnemies += 4;
                    }
                    
                    stage +=1;
                    waveEnemies = true;  
                    enemiesId = 0;
                    countEnemies = 0;
                    maxEnemies+=5;
                    speedEnemies +=30;
                    decompteEnemies = maxEnemies;
                    while(appearanceTimingEnemies > 250)
                    {
                        appearanceTimingEnemies -= 250;
                    }

                    
                    setTimeout(function()
                    {
                        waveEnemies = false;
                    },5000)
                    
                }

            
            
            // console.log(stage);

            // console.log(waveEnemies);
            // console.log(decompteEnemies);

            
           

            // updateCustomerPercent();
            // scoreText += game.add.text(825, 32, enemiesKilled, { fontSize: '32px', fill: '#FF030D' });
            

           // for (var i = 0; i < playersInGame[0] ; i++) 
           // {
           //     this.myHealthBar.setPosition(barPosX, barPosY);
           //     barPosX += 200;
           // }

            
            // this.myHealthBar1.setPosition(600, 55);
            // this.myHealthBar2.setPosition(1000, 55);
            // this.myHealthBar3.setPosition(1400, 55);

            this.factoryHealthBar.setPosition(800,565);
            this.factoryHealthBar.setPercent(factory.health/10);
            // this.mineBar.setPercent(mineBarPercent);






            // if(mainCharacter.health <= 50)
            // {
            
            //     barConfig = {x: game.camera.x + 150, y: game.camera.y + 50, width: 250, bar: {color: "#FF9C27"}};
            //     this.myHealthBar.setupConfiguration(barConfig);
            //     this.myHealthBar.drawHealthBar();
            // }
            // else if(mainCharacter.health <= 20)
            // {
            //     barConfig = {x: game.camera.x + 150, y: game.camera.y + 50, width: 250, bar: {color: "#FF220D"}};
            //     this.myHealthBar.setupConfiguration(barConfig);
            //     this.myHealthBar.drawHealthBar();
            // }

            for (var i = 0; i < mainCharacterArray.length; i++) {
                testCollisions(this,mainCharacterArray[i]);
            }


            for (var i = 0; i < enemies.length; i++) 
            {
                enemies[i].update();


                if(enemies[i].Sprite.body.blocked.left)
                {

                    enemies[i].Sprite.body.velocity.x  = speedEnemies;
                    enemies[i].Sprite.scale.x = (-1);
                }
                else if(enemies[i].Sprite.body.blocked.right)
                {

                    enemies[i].Sprite.scale.x = 1;
                    enemies[i].Sprite.body.velocity.x = (-speedEnemies);
                }

                if(enemies[i].health <= 0)
                {
                    
                    decompteEnemies -=1;

                    if(enemies[i].state != "enteringFactory") 
                    {
                        enemiesExplosion.play();
                        createExplosion(enemies[i].Sprite.body.position.x, enemies[i].Sprite.body.position.y + (enemies[i].Sprite.body.height/2), 1, "explosion",10);
                        // particleBurst(enemies[i].Sprite.body.position.x, enemies[i].Sprite.body.position.y);

                        if( (Math.floor(Math.random()*9)) == 1)
                        {   
                            createBonus(enemies[i].Sprite.body.position.x, enemies[i].Sprite.body.position.y);

                        }
                        enemiesKilled +=1;
                       
                        

                    }

                    
                   

                    enemies[i].Sprite.destroy();
                    enemiesId -=1;
                    
                    
                    enemies.splice(enemies.indexOf(enemies[i]), 1);
                    // mineBarPercent += 10;

                    // console.log("enemies killed: "+ enemiesKilled);
                }

            }

           
                if( (factory.health == 1000))
                {

                    stage = 1;
                    enemies = [];
                    waveEnemies = false;  
                    enemiesId = 0;
                    countEnemies = 0;
                    maxEnemies = 5;
                    speedEnemies = 300;
                    decompteEnemies = maxEnemies;
                    pvEnemies = 5;

                    this.gameOver();
                }


            // console.log(mainCharacterArray[0].power);
            // console.log( factory.health );
            // console.log(mainCharacterArray);
            // console.log(mainCharacter.health);
            // console.log(enemies);
            // console.log("countEnemies: "+countEnemies);
            // console.log("decompteEnemies: "+decompteEnemies);
            // console.log("enemiesId: "+enemiesId);
            // console.log(bonusNumber);
            // console.log(bonusOnGround);
            // console.log(customers);
            // for (var i = 0; i < enemies.length; i++) {
            //     console.log(enemies[i].health);
            // }

            
        

        function updateScore() 
        {

            scoreText.setText(" SCORE: " + enemiesKilled);

        }

        function updateCustomers() 
        {

            factoryText.setText(" Invités: \n" + customers);

        }
    },

    gameOver: function()
    {
    	game.state.start('gameOver');

    }
	
}


