class SceneMain extends Phaser.Scene{
    constructor(){
        super('SceneMain');
    }

    preload()
    {
        this.load.image("road","images/road.jpg");
        this.load.spritesheet("cars","images/cars.png",
              {   frameWidth:60,
                  frameHeight:126
              });
            
        this.load.image("line","images/lines.png");   
        this.load.image("pcar1","images/pcar1.png");
        this.load.image("pcar2","images/pcar2.png");
        this.load.image("barrier","images/barrier.png");
        this.load.image("cone","images/cone.png");    
        
        //button
        this.load.image("button1","images/buttons/1.png");
        //button2
        //this.load.image("button2","images/buttons/5.png");
    }

    create()
    {
        //emitter=new Phaser.Events.EventEmitter();
        //controller = new Controller();

        //console.log("Ready!");
        this.road = new Road({scene:this});
        this.road.x=game.config.width/2;
        this.road.makeLines();

        //show score
        this.sb=new ScoreBox({scene:this});
        this.sb.x=game.config.width-50;
        this.sb.y=50;

        model.score=100;
        console.log(model.score);

        //set up the font size
        var fireText={color:'black',fontSize:30};

        //show button
        var flatButton=new FlatButton({scene:this,key:'button1',text:'Fire!',x:240,y:200,event:'button_pressed',params:'fire_lasers',textConfig:fireText});
        //button 2
        //var flatButton2=new FlatButton({scene:this,key:'button2',text:'Destruct!',x:240,y:450,event:'button_pressed',params:'self_descruct'});
        
        emitter.on('button_pressed', this.buttonPressed, this);
    }

    buttonPressed(params){
        console.log(params);
        this.scene.start("SceneOver");
    }

    update()
    {
        this.road.moveLines();

        this.road.moveObject();
        
    }

}