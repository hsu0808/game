var game;
var cursors;
var platforms;
var music;
var player;
var stars;
var bombs;
var superstars;
var strawberrys;
var score=0;
var scoreText;
var emitter;
var G; 

window.onload=function(){
    var config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,

        physics:
        {
            default:'arcade',
            arcade:{
            gravity:{y:300},
            debug:false
            }
        },

        parent: 'phaser-game',
        scene: [SceneTitle,SceneMain,SceneOver]
    };
    G=new Constants();
    model = new Model();
    game = new Phaser.Game(config);
}