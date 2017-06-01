var game = new Phaser.Game(1600,900,Phaser.AUTO,'game',
		{preload:preload,create:create,update:update,render:render});

function preload(){
	
    game.load.tilemap('map', 'map.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('ground', 'img/groundSheet.png');
    game.load.image('plante2', 'img/plants2.png');
    game.load.image('bonus', 'img/bonus.png');
    game.load.image('ketchup', 'img/ketchup.png');
    game.load.audio('fireBullet','audio/fireBullet.mp3' );
    game.load.spritesheet('eatMan', 'img/meatSpriteSheet2.png', 80, 110, 28);
	game.load.spritesheet('bullet', 'img/meatBullet.png', 60, 25, 1);
    game.load.spritesheet('flowerSprite', 'img/flowerSprite.png', 192/3, 64, 3);
    game.load.spritesheet('treeSprite', 'img/treeSpriteSheet.png', 1350/3, 678, 3);
    game.load.spritesheet('enemy', 'img/spriteSheetEnemy.png', 240/3, 220/2, 6);

};
var map;
var bonusNumber = 0;
var mainCharacter;
var randomBonus;
var enemy;
var jumpButton;
var flower;
var ground;
var layerCollision;
var layerWorldCollision;
var platforms;
var isJumping;
var enemies = [];
var enemiesId = 0;
var tweenEnemy;
var countEnemies = 5;
var appearanceTimingEnemies = 5000;
var enemiesKilled = 0;
var enemiesDirections = ["left","right"];
var randomDirection;
var isCreatingEnemies = false;
var randomLife = 5;
var coordonees =
{
    x:[900,300,900,1200],
    y:[2430,2020,2210,1850]
}
var randomCoordonees;

var bonus = [];
var bonusArray = ["plante2","ketchup","shoot_x2"];
var currentBonus;
var scoreText;

function create()
{

    game.physics.startSystem(Phaser.Physics.arcade);
    game.world.setBounds(0,0,896,8000);
    map = game.add.tilemap('map');
    map.addTilesetImage('groundSheet','ground');

    /*     INTERFACE     */


    scoreText =  game.add.text(700, 57, " SCORE : ", {
        font: "25px Arial",
        fill: "#FFFFFF",
        align: "center"
    });

   

    



    HealthText =  game.add.text(25, 40, " HEALTH : ", {
        font: "25px Arial",
        fill: "#FFFFFF",
        align: "center"
    });

    scoreText.anchor.setTo(0.5, 0.5);
    scoreText.anchor.setTo(0.5, 0.5);



    
  
 
   
    // this.myHealthBar.setFixedToCamera();


    game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

    game.stage.backgroundColor = "#0B5D73";

 

    ground = map.createLayer('groundLayer');
    layerCollision = map.createLayer('collisions');
    layerCollision.alpha = 0;
    ground.resizeWorld();
    map.setCollisionBetween(0, 644,true,layerCollision);
    

    mainCharacter = new Player(0,"eatMan",100,700,650,500,0,0.5,"idle");

     /*     HEALTH BAR     */
    this.barConfig = {x: 300, y: 55, width: 250};
    this.myHealthBar = new HealthBar(this.game, this.barConfig);
    game.camera.follow(mainCharacter.Sprite);
    

    // randomCoordonees = Math.round(Math.random()*3);    
    // createBonus(coordonees.x[randomCoordonees],coordonees.y[randomCoordonees]);

	




    cursors = game.input.keyboard.createCursorKeys();
    jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    fireButton = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    bonusButton = game.input.keyboard.addKey(Phaser.Keyboard.UP);
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


function update()
{
    // scoreText += game.add.text(825, 32, enemiesKilled, { fontSize: '32px', fill: '#FF030D' });
   updateScore();

    mainCharacter.update();



    
    if(!isCreatingEnemies)
    {   
        isCreatingEnemies = true;
        createEnemies();

        setTimeout(function(){

            isCreatingEnemies = false;

        },appearanceTimingEnemies);
    }




    for(i=0; i < enemies.length; i++)
    {
        if(enemies[i].Sprite.body.blocked.left )
        {

            enemies[i].Sprite.body.velocity.x = 300;
            enemies[i].Sprite.scale.x = (-1.5);
        }
        else if(enemies[i].Sprite.body.blocked.right)
        {

            enemies[i].Sprite.scale.x = 1.5;
            enemies[i].Sprite.body.velocity.x = (-300);
        }

    }
    

    this.myHealthBar.setPosition(300, 55);
   
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
    else if (bonusButton.isDown)
    {

        mainCharacter.state = "usingBonus";
        
    }

    else
    {
        mainCharacter.state = "idle";
    }


    game.physics.arcade.collide(Player.weapon, mainCharacter.Sprite);
    
   
    
    testCollisions(this,mainCharacter);

    // console.log(enemies);
    // console.log(mainCharacter.bonusCharacter);

	
};

function updateScore() {

    scoreText.setText(" SCORE: " + enemiesKilled);

}

function render(){
    // for(i = 0; i < bonus.length; i++)
    // {
    //     game.debug.body(bonus[i]);
    // }

// game.debug.body(mainCharacter.Sprite);
// game.debug.body(enemies[0].Sprite);
// game.debug.body(mainCharacter.weapon.bullets.hash);
};