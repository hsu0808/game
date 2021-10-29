class Controller{
    constructor(){
        //listening to the emitter
        emitter.on(G.SET_SCORE,this.setScore);
        emitter.on(G.UP_POINTS,this.upPoints);        
    }
    setScore(score)
    {
        model.score=score;
    }
    upPoints(points)
    {
        console.log("Into upPoints!");
        var score = model.score;
        score += points;
        model.score=score;
        console.log("upPoints! Success");
    }
}