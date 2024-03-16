export class Player{
    nick;
    highScore;
    constructor(nick,highScore){
        this.nick = nick;
        this.highScore = highScore;
    }
    static JSONparse(JSONText){
        let genericObject = JSON.parse(JSONText);

        return new Player(genericObject.nick,genericObject.highScore);
    }
}