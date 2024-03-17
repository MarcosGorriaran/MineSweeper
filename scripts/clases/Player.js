/**
 * A class design to sotre information of the player
 */
export class Player{
    nick;
    highScore;
    constructor(nick,highScore){
        this.nick = nick;
        this.highScore = highScore;
    }
    /**
     * This method returns a player object based on a JSON containing the parsed information of a player
     * @param {string} JSONText 
     * @returns {Player}
     */
    static JSONparse(JSONText){
        let genericObject = JSON.parse(JSONText);

        return new Player(genericObject.nick,genericObject.highScore);
    }
}