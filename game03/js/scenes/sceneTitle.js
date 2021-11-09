class SceneTitle extends Phaser.Scene{
    constructor(){
        super('SceneTitle');
    }
    preload()
    {
        this.load.image("title","assets/logo1.png");
        this.load.image("button1","assets/1.png");

    }
    create(){
        emitter=new Phaser.Events.EventEmitter();
        //controller = new Controller();
        
        
        console.log("SceneTitle");
        var title=this.add.image(400,200,'title');
        //Align.scaleToGameW(title,.8);
        var flatButton=new FlatButton({scene:this,key:'button1',text:'play',x:400,y:400,event:'start_game'});
        emitter.on('start_game',this.startGame,this);


    }
    startGame(){
        this.scene.start('SceneMain');
    }


    update(){

    }
}