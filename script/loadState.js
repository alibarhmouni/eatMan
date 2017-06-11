var loadState =
{
	
	preload: function()
	{
		// var loadingLabel = game.add.text(80,150, 'loading...',
		// 	{font: '30px Courier', fill: '#ffffff'});
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
        game.load.image('backgroundMenu', 'img/menuBackground');

        game.load.image('1Player', 'img/1Player.png');
        game.load.image('2Players', 'img/2Players.png');
        game.load.image('3Players', 'img/3Players.png');
        game.load.image('4Players', 'img/4Players.png');
        game.load.image('jouer', 'img/gameButton.png');
        game.load.image('regles', 'img/regles.png');
        


        game.load.audio('ukulele', 'audio/bensound-ukulele.mp3');
        game.load.audio('fireBullet','audio/fireBullet.mp3' );
        game.load.audio('mineAudio','audio/Bomb2.mp3' );
        game.load.audio('minePosition','audio/mine.wav' );
        game.load.audio('mineBip','audio/bip.wav' );

        game.load.spritesheet('mine', 'img/steak.png', 110, 100, 2);
        game.load.spritesheet('shop', 'img/shop.png', 500, 224, 2);
        game.load.spritesheet('genkidama', 'img/genkidamaSheet.png', 1260/3, 420, 3);
        game.load.spritesheet('eatGirl', 'img/meatSpriteSheetGirl.png', 80, 110, 28);
        game.load.spritesheet('eatMan', 'img/meatSpriteSheet2.png', 80, 110, 28);
        game.load.spritesheet('eatMan2', 'img/meatSpriteSheet2.png', 80, 110, 28);
        game.load.spritesheet('eatMan3', 'img/meatSpriteSheet2.png', 80, 110, 28);
        game.load.spritesheet('explosion', 'img/explosionSheet.png', 416/3, 276/2, 3);
        game.load.spritesheet('explosion2', 'img/explosionSheet2.png', 416/3, 276/2, 3);
        game.load.spritesheet('bullet', 'img/meatBullet.png', 60, 25, 1);
        game.load.spritesheet('enemy', 'img/spriteSheetEnemy.png', 240/3, 220/2, 6);
        game.load.spritesheet('fireBall', 'img/fireBallSheet.png', 150, 90, 3);


    /*     INTERFACE MAIN MENU     */
    
            // interfaceMainMenu();


     /*     INTERFACE MAIN MENU     */
	},
	create: function()
	{
		game.state.start('menu');
	}
}