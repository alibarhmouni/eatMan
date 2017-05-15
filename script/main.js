var game = new Phaser.Game(1800,920,Phaser.AUTO,'game',
		{preload:preload,create:create,update:update,render:render});

function preload(){
	
	game.load.image('circle', 'img/test.png');
};


function create(){
	
	var i = game.add.image(290,290,'circle');
    i.anchor.set(0.5);
};


function update(){
	

};

function render(){
	

};