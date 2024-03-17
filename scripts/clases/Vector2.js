/**
 * This object is responsible of storing the cordinates information of an object in a 2D environment.
 */
export class Vector2{
    #x
    #y
    
    constructor(vectorX, vectorY){
        this.X=vectorX;
        this.Y=vectorY;
    }

    get X(){
        return this.#x;
    }
    get Y(){
        return this.#y;
    }
    set X(value){
        this.#x=value
    }
    set Y(value){
        this.#y=value
    }
    /**
     * It returns a string containing the parsed information of the cell using the JSON format.
     * @returns {string}
     */
    toJSON(){
        return `{
            "x":"${this.X}",
            "y":"${this.Y}"
        }`;
    }
}