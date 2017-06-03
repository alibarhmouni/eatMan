var createEnemies = function()
    {

            
                
                randomDirection = Math.floor(Math.random()*2);
                enemies.push(new Enemy(enemiesId,"ennemy",randomLife,100,600,300,0,0.5,"idle",enemiesDirections[randomDirection]));
                enemies[enemiesId].Sprite.scale.x = -1.5;
                enemiesPosition(enemies[enemiesId]);
                enemiesId +=1;

               
    }

    




