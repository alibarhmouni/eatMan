var game = new Phaser.Game(1600,900,Phaser.AUTO,'game',
		{preload:preload,create:create,update:update,render:render});

function preload(){
	
    game.load.tilemap('map', 'map.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('ground', 'img/groundSheet.png');
    game.load.image('pavement', 'img/pavement.png');
    game.load.image('pavement2', 'img/pavement2.png');
    game.load.image('street', 'img/street.png');
    game.load.image('street2', 'img/street2.png');
    game.load.image('bonus', 'img/bonus.png');
    game.load.image('particles', 'img/particle.png');
    game.load.image('ketchup', 'img/ketchup.png');
    game.load.image('factory', 'img/factory.png');
    game.load.image('plante', 'img/plants1.png');

    game.load.audio('ukulele', 'audio/bensound-ukulele.mp3');
    game.load.audio('fireBullet','audio/fireBullet.mp3' );
    game.load.audio('mineAudio','audio/Bomb2.mp3' );
    game.load.audio('minePosition','audio/mine.wav' );
    game.load.audio('mineBip','audio/bip.wav' );

    game.load.spritesheet('mine', 'img/steak.png', 110, 100, 2);
    game.load.spritesheet('shop', 'img/shop.png', 500, 224, 2);
    game.load.spritesheet('genkidama', 'img/genkidamaSheet.png', 1260/3, 420, 3);
    game.load.spritesheet('eatMan', 'img/meatSpriteSheet2.png', 80, 110, 28);
    game.load.spritesheet('explosion', 'img/explosionSheet.png', 416/3, 276/2, 3);
	game.load.spritesheet('bullet', 'img/meatBullet.png', 60, 25, 1);
    game.load.spritesheet('enemy', 'img/spriteSheetEnemy.png', 240/3, 220/2, 6);


    /*     INTERFACE MAIN MENU     */
    
            interfaceMainMenu();


     /*     INTERFACE MAIN MENU     */


};
var map;
var bonusNumber = 0;
var mainCharacter;
var enemy;
var jumpButton;
var ground;
var layerCollision;
var layerWorldCollision;
var isJumping;
var enemies = [];
var emitter;
var enemiesId = 0;
var countEnemies = 5;
var appearanceTimingEnemies = 5000;
var enemiesKilled = 0;
var enemiesDirections = ["left","right"];
var randomDirection;
var isCreatingEnemies = false;
var randomLife = 5;
var factory;

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

function create()
{

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
    particlesCreation();
    

    // this.myHealthBar.setFixedToCamera();
    
    

    game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

    game.stage.backgroundColor = "#0B5D73";

    ukulele = game.add.audio('ukulele',1,true);
    mineAudio = new Phaser.Sound(game,'mineAudio',1,false);
    mineBip = new Phaser.Sound(game,'mineBip',1,false);
    minePosition = new Phaser.Sound(game,'minePosition',1,false);
    // ukulele.play();
   


    ground = map.createLayer('groundLayer');
    layerCollision = map.createLayer('collisions');
    layerSideCollision = map.createLayer('sideCollisions');
    layerCollision.alpha = 0;
    layerSideCollision.alpha = 0;
    ground.resizeWorld();
    map.setCollisionBetween(0, 501,true,layerCollision);
    map.setCollisionBetween(0, 107,true,layerSideCollision);
    
    plante = game.add.sprite(600,440,'plante');
   
     /*     HEALTH BAR     */
    this.barConfig = {x: 300, y: 55, width: 250};
    this.myHealthBar = new HealthBar(this.game, this.barConfig);
    // game.camera.follow(mainCharacter.Sprite);

    /*     FACTORY BAR     */

    this.barConfigFactory = {x: 300, y: 55, width: 150, height: 10};
    this.factoryHealthBar = new HealthBar(this.game, this.barConfigFactory);




    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    bonusButton = game.input.keyboard.addKey(Phaser.Keyboard.UP);
    game.input.onDown.add(gofull, this);

    factory = new Factory("shop", 0,800,710,0.5,"idle");
    textInterface();

    mainCharacter = new Player(0,"eatMan",100,700,450,500,0,0.5,"idle");

    padInit();


    // factoryTextPercent =  game.add.text(599, 756, "full: ", {
    //     font: "20px Arial",
    //     fill: "#fb0000",
    //     align: "center"
    // });


};

// function dump() {

//     console.log(pad1._axes[0]);
//     console.log(pad1._rawPad.axes[0]);

// }



function particleBurst(_positionX, _positionY) {

    //  Position the emitter where the mouse/touch event was
    emitter.x = _positionX;
    emitter.y = _positionY + 50;
    emitter.start(true, 2000, true, 10);


    // //  The first parameter sets the effect to "explode" which means all particles are emitted at once
    // //  The second gives each particle a 2000ms lifespan
    // //  The third is ignored when using burst/explode mode
    // //  The final parameter (10) is how many particles will be emitted in this single burst
    // emitter.start(false, 1000, null, 100);
    // game.time.events.add(2000, destroyEmitter, this);

}
// function destroyEmitter() {

//     emitter.destroy();

// }


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


function update()
{
      
    updateScore();
    updateCustomers();
    mainCharacter.update();
    factory.update();
    gamePadControls();
   

    // updateCustomerPercent();
     // scoreText += game.add.text(825, 32, enemiesKilled, { fontSize: '32px', fill: '#FF030D' });
    

   

    this.myHealthBar.setPosition(300, 55);
    this.factoryHealthBar.setPosition(800,580);
    this.factoryHealthBar.setPercent(factory.health/10); 
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




   


    
   
    
    testCollisions(this,mainCharacter);


    for (var i = 0; i < enemies.length; i++) 
    {
        enemies[i].update();

        if(enemies[i].Sprite.body.blocked.left )
        {

            enemies[i].Sprite.body.velocity.x = 300;
            enemies[i].Sprite.scale.x = (-1);
        }
        else if(enemies[i].Sprite.body.blocked.right)
        {

            enemies[i].Sprite.scale.x = 1;
            enemies[i].Sprite.body.velocity.x = (-300);
        }

        if(enemies[i].health <= 0)
        {
            if(enemies[i].state != "enteringFactory") 
            {
                createExplosion(enemies[i].Sprite.body.position.x, enemies[i].Sprite.body.position.y + (enemies[i].Sprite.body.height/2), 1, "explosion",10);
                particleBurst(enemies[i].Sprite.body.position.x, enemies[i].Sprite.body.position.y);

                if( (Math.floor(Math.random()*2)) == 1)
                {   
                    createBonus(enemies[i].Sprite.body.position.x, enemies[i].Sprite.body.position.y);

                }
                enemiesKilled +=1;
            }
            

            
            enemies[i].Sprite.destroy();
            enemiesId --;
            enemies.splice(enemies.indexOf(enemies[i]), 1);

            // console.log("enemies killed: "+ enemiesKilled);
        }

        if(enemiesKilled > 50)
        {
            appearanceTimingEnemies = 500;
        }

        else if(enemiesKilled <= 50 && enemiesKilled > 40)
        {
            appearanceTimingEnemies = 1000;
        }
        else  if(enemiesKilled <= 40 && enemiesKilled > 30)
        {
            appearanceTimingEnemies = 2000;
        }
        else  if(enemiesKilled <= 30 && enemiesKilled > 20)
        {
            appearanceTimingEnemies = 3000;
        }
        else  if(enemiesKilled <= 20 && enemiesKilled > 10)
        {
            appearanceTimingEnemies = 4000;
        }
        else  if(enemiesKilled <= 10)
        {
            appearanceTimingEnemies = 5000;
        }
    }


    

    if(!isCreatingEnemies)
    {   
        isCreatingEnemies = true;
        createEnemies();

        setTimeout(function(){

            isCreatingEnemies = false;

        },appearanceTimingEnemies);
    }

    // console.log(bonus);
    // console.log(bonusNumber);
    // console.log(bonusOnGround);
    // console.log(customers);

	
};

function updateScore() {

    scoreText.setText(" SCORE: " + enemiesKilled);

}

function updateCustomers() {

    factoryText.setText(" Customers: \n" + customers);

}

// function updateCustomerPercent() {

//     factoryTextPercent.setText("( "+ customersPercent + " % )");

// }

function render(){
    // for(i = 0; i < bonus.length; i++)
    // {
    //     game.debug.body(bonus[i]);
    // }
// game.debug.body(factory.Sprite);
// game.debug.body(mainCharacter.Sprite);
// game.debug.body(enemies[0].Sprite);
// game.debug.body(explosion.Sprite);
// game.debug.body(mainCharacter.weapon.bullets.hash);
// if(bonusOnGround[0])
// {
//     game.debug.body(bonusOnGround[0]);
// }

};