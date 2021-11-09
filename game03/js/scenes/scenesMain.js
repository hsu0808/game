class SceneMain extends Phaser.Scene{
    constructor(){
        super('SceneMain');
    }

    preload(){
        this.load.image('sky','assets/sky.png');
        this.load.audio('bgMusic','assets/background.mp3')
        this.load.image('ground','assets/platform.png');
        this.load.image('star','assets/star.png');
        this.load.image('bomb','assets/bomb.png');
    
        this.load.spritesheet('alien','assets/dude.png',{ frameWidth:32, frameHeight: 48});

        this.load.image('superstar','assets/superstar.png');
        this.load.image('strawberry','assets/strawberry.png');
        this.load.image("toggleBack","assets/toggles/1.png");
        this.load.image("sfx_off","assets/icons/sfx_off.png");
        this.load.image("sfx_on","assets/icons/sfx_on.png");
        this.load.image("music_on","assets/icons/music_on.png");
        this.load.image("music_off","assets/icons/music_off.png");
        this.load.audio('boom',["assets/boom.mp3","images/sounds/boom.ogg"]);
    }
    
    create(){
        this.add.image(400,300,'sky');
        
        platforms = this.physics.add.staticGroup();
        platforms.create(400, 568, 'ground').setScale(2).refreshBody();
        platforms.create(50, 250, 'ground');
        platforms.create(600, 400, 'ground');
        platforms.create(750, 220, 'ground');
    //part 3 加入主要腳色
        player = this.physics.add.sprite(100,450,"alien");
    
    //part 3.1 讓他是活在"有重力的環境下"
        player.setBounce(0.5); //反彈效果
        player.setCollideWorldBounds(true); 
        
    //讓平台與主角有物理意義
        this.physics.add.collider(player,platforms);
    
        this.anims.create({
        key:'left',
        frames: this.anims.generateFrameNumbers('alien', { start: 0, end: 3 }),  
        frameRate: 10, //每秒10個frame
        repeat: -1      //重複播放
        });
    
        this.anims.create({
        key:'right',
        frames: this.anims.generateFrameNumbers('alien', { start: 5, end: 8 }),  
        frameRate: 10, //每秒10個frame
        repeat: -1      //重複播放
        });
    
        this.anims.create({
        key:'turn',
        frames:[{key:'alien', frame:4}],
        frameRate:20
        });
    
        cursors = this.input.keyboard.createCursorKeys();
        
        //加入星星
        stars = this.physics.add.group({
            key:'star',
            repeat: 11,// 0~11 12個
            setXY:{x:12,y:0,stepX:70}
        })
    
        this.physics.add.collider(stars,platforms);
    
        // 讓星星有彈跳的感覺
        stars.children.iterate(function(child){
        child.setBounceY(Phaser.Math.FloatBetween(0.4,0.8));
        });
    
        this.physics.add.overlap(player,stars,this.CollectStar,null, this);
        //加入計分
        scoreText=this.add.text(16,16,'Score:0',{frontSize:'32px',fill:'#000'});
        
        //將障礙物加入
        bombs = this.physics.add.group();
    
        //障礙物與地形的物理關係
        this.physics.add.collider(bombs,platforms);
    
        //主角與障礙物的物理關係
        this.physics.add.collider(player, bombs, this.hitBomb, null, this);

        superstars = this.physics.add.group();
       
       
        //無敵星星與地形的物理關係
        this.physics.add.collider(superstars,platforms);
    
        //主角與無敵星星的物理關係
        this.physics.add.collider(player, superstars, this.hitSuperstar, null, this);

        strawberrys = this.physics.add.group();

    
        //草莓與地形的物理關係
        this.physics.add.collider(strawberrys,platforms);
    
        //主角與草莓的物理關係
        this.physics.add.collider(player, strawberrys, this.hitStrawberry, null, this);


        var mediaMananger=new MediaManager({scene:this});

        var toggleButton= new ToggleButton({scene:this,backKey:'toggleBack',onIcon:'sfx_on',offIcon:'sfx_off',event:'buttonPressed2',x:550,y:50});
        var backButton= new ToggleButton({scene:this,backKey:'toggleBack',onIcon:'music_on',offIcon:'music_off',event:'buttonPressed',x:700,y:50});
        emitter.on('buttonPressed',this.buttonPressed,this);
        emitter.on('buttonPressed2',this.buttonPressed2,this);
        var mediaMananger=new MediaManager({scene:this});     
        mediaMananger.setBackgroundMusic('bgMusic');
    }
    buttonPressed(params){
        console.log(params);
        //this.scene.start("SceneOver");
        model.musicOn=!model.musicOn;
    }
    buttonPressed2(params){
        console.log(params);
        //this.scene.start("SceneOver");
        model.soundOn=!model.soundOn;
    }
    exit(){
        this.scene.start('SceneOver');
        music.stop();
    }
    

    hitBomb(player, bomb){
        //this.physics.pause();
        //player.setTint(0xff0000);
        //player.anims.play('turn');
        score-=50;
        scoreText.setText('Score: '+score);
        emitter.emit(G.PLAY_SOUND,"boom");
        if(score<=0)
        {
            this.scene.start('SceneOver');
            model.musicOn=false;
            //music.stop();
            score = 0;
        }
    }
    hitSuperstar(player,superstar){
        //let the star dispear
        superstar.disableBody(true,true);
        //score ++
        score=score+50;
        scoreText.setText('Score: '+score);
    
    }
    hitStrawberry(player,strawberry){
        //let the star dispear
        strawberry.disableBody(true,true);
        //score ++
        score=score+20;
        scoreText.setText('Score: '+score);
    
    }    
    
    
    CollectStar(player,star){
        //let the star dispear
        star.disableBody(true,true);
        //score ++
        score=score+10;
        scoreText.setText('Score: '+score);
    
    }
    
    
    update(){
        //to right
        if(cursors.right.isDown){
            player.setVelocityX(160); //每秒 160 px 向右移動
            player.anims.play('right',true); //執行你在 create 中的動作
        }
        //to left
        else if(cursors.left.isDown){
        player.setVelocityX(-160); //每秒 160 px 向左移動
        player.anims.play('left',true); //執行你在 create 中的動作
        }
        //don't move
        else{
        player.setVelocityX(0);
        player.anims.play('turn');
        }
    
        //向上跳躍
        if (cursors.up.isDown && player.body.touching.down){
        player.setVelocityY(-350);
        }
        //星星狀態
        if(stars.countActive(true) == 0){
        //星星重置
        stars.children.iterate(function (child){
            child.enableBody(true, child.x, 0, true,true);
        });
    
        //判斷主角跟障礙物的位置關係
        var x = (player.x <400)? Phaser.Math.Between(400,800) : Phaser.Math.Between(0,400);
    
    
        //加入障礙物 的位置
        var bomb = bombs.create(x, 16,'bomb');
        //設定反彈係數
        bomb.setBounce(1);
        //是否撞到邊界
        bomb.setCollideWorldBounds(true);
        //設定x 速度 -200~200,y20
        bomb.setVelocity(Phaser.Math.Between(-200,200),20);
    
        //加入超級星星 的位置
        var superstar = superstars.create(x,16,'superstar');
        //設定反彈係數
        superstar.setBounce(1);
        //是否撞到邊界
        superstar.setCollideWorldBounds(true);
        //設定x 速度 -200~200,y20
        superstar.setVelocity(Phaser.Math.Between(-200,200),20);
    
        //加入草莓 的位置
        var strawberry = strawberrys.create(x,16,'strawberry');
        //設定反彈係數
        strawberry.setBounce(1);
        //是否撞到邊界
        strawberry.setCollideWorldBounds(true);
        //設定x 速度 -200~200,y20
        strawberry.setVelocity(Phaser.Math.Between(-200,200),20);
        
        }   
       
    }

}