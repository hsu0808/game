//copy from the begiging
class SceneTitle extends Phaser.Scene{
    constructor(){
        super('SceneTitle');
    }
    preload()
    {
        this.load.image("title","images/logo.png");
        this.load.image("button1","images/buttons/1.png");

    }
    create()
    {
        emitter=new Phaser.Events.EventEmitter();
        controller = new Controller();
        var title=this.add.image(220,200,'title');
        Align.scaleToGameW(title,.8);
    
        //show button
        var flatButton=new FlatButton({scene:this,key:'button1',text:'Start!',x:220,y:400,event:'start_game'});
        
        emitter.on('start_game',this.startGame,this);

    }

    startGame(){
        this.scene.start('SceneMain');
    }
    update()
    {

    }
}