class FlatButton extends Phaser.GameObjects.Container
{
    constructor(config)
    {
        if(!config.scene)
        {
            console.log("missing scene!");
            return;
        }
        if(!config.key){
            console.log("missing key");
            return;
        }
        super(config.scene);
        this.config=config;

        this.scene=config.scene;
        this.back=this.scene.add.image(0,0,config.key);

        this.add(this.back);

        if(config.text){
            this.text1=this.scene.add.text(0,0,config.text);
            this.text1.setOrigin(0.5,0.5);
            this.add(this.text1);
        }

        this.scene.add.existing(this);

        if(config.x){
            this.x=config.x;
         }
         
         if(config.y){
             this.y=config.y;
         }

         if(config.event){
            this.back.setInteractive();
            this.back.on('pointerdown',this.pressed,this);
        }
    }
    pressed(){
        
        if(this.config.params){
            emitter.emit(this.config.event, this.config.params);
        }
        else{
            emitter.emit(this.config.event);
        }
        
    }
    

}