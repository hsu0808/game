class PreloadScene extends Phaser.Scene{
    constructor(){
        super('PreloadScene');
    }

    preload()
    {
        this.load.tilemapTiledJSON('map','assets/map.json');
        //tile sets
        this.load.image('tiles-1','assets/main_lev_build.png');
        this.load.image('player','assets/player/idle01.png');
        
    }

    create()
    {
        
      this.scene.start('SceneMain');

    }

    

}