var particlesCreation = function()
{
	 
    /*     PARTICLES     */
    emitter = game.add.emitter(0, 0, 1000);
    emitter.makeParticles('particles');
    emitter.maxParticleScale = 1;
    emitter.minParticleScale = 0.5;
    emitter.width = 100;
    emitter.height = 100;
    emitter.setRotation(0, 0);
    emitter.setYSpeed(1000, 1000);
    emitter.setScale(1, 1);
    
    

    /*     health particles     */
    // emitter.setRotation(0, 0);
    // emitter.setAlpha(0.3, 0.8);
    // emitter.setScale(0.5, 1);
    // emitter.gravity = -200;
}