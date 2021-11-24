var game;

window.onload=function(){
    var config = {
        type: Phaser.AUTO,
        width: 1280,
        height: 600,
        physics:{
            default: 'arcade', //default is Arcade physics
            arcade: {
                gravity: { y: 300 },
                debug: false
                    }    
                },
        parent: 'phaser-game',
        scene: [PreloadScene,SceneMain]
    };
   
    game = new Phaser.Game(config);
}