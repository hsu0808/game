class SceneMain extends Phaser.Scene{
    constructor(){
        super('SceneMain');
    }


    create()
    {
        const map = this.createMap();
        const layers = this.createLayers(map);
        const player=this.createPlayer();       
        this.physics.add.collider(player,layers.platforms);
        
        this.physics.add.collider(player,layers.platformsColliders);

    }
    createMap(){
        const map =this.make.tilemap({key:'map'});
        map.addTilesetImage('main_lev_build','tiles-1');
        return map;
 
    }
    createLayers(map){
        const tileset1 = map.getTileset('main_lev_build');
        const platformsColliders = map.createStaticLayer('platforms_colliders',tileset1);
    const environment = map.createStaticLayer('environment',tileset1);
    const platforms = map.createStaticLayer('platforms',tileset1);
    platforms.setCollisionByExclusion(-1, true);
   


    return{environment,platforms};
    }
    createPlayer(){
        const player= this.physics.add.sprite(100,20,'player');      
        player.setCollideWorldBounds(true);
        return player;
    }
    

}