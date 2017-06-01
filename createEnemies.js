var createEnemies = function()
    {

            
                
                randomDirection = Math.floor(Math.random()*2);
                enemies[enemiesId] = new Enemy(enemiesId,"ennemy",5,700,0,300,0,0.5,"idle",enemiesDirections[randomDirection]);
                enemies[enemiesId].Sprite.scale.x = -1.5;
                // console.log(enemies[enemiesId].Sprite.body.blocked.left);
                
                enemiesPosition(enemies[enemiesId]);
                enemiesId +=1;

               
    }




