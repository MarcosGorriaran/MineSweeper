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
    toJSON(){
        return `{
            "x":"${this.X}",
            "y":"${this.Y}"
        }`;
    }
}