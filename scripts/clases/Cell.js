import { Vector2 } from "./Vector2.js";
export class Cell{
    #revealed;
    #isBomb;
    #flaged
    #bombsAround;
    #cordinates;

    constructor(hasBomb,BombsAround, vectorCordinates){
        this.IsRevealed=false;
        this.IsBomb=hasBomb;
        this.IsFlaged=false;
        this.BombsAround=BombsAround;
        this.Cordinates=vectorCordinates;
    }
    /**
     * It will change the flag to true if it is false or false if it is true.
     */
    SwitchFlag(){
        this.#flaged= this.#flaged ? false : true;
    }

    get IsBomb(){
        return this.#isBomb
    }
    get IsRevealed(){
        return this.#revealed;
    }
    get IsFlaged(){
        return this.#flaged;
    }
    get BombsAround(){
        return this.#bombsAround;
    }
    get Cordinates(){
        return this.#cordinates;
    }
    set IsBomb(value){
        this.#isBomb=value;
    }
    set IsRevealed(value){
        this.#revealed=value;
    }
    set IsFlaged(value){
        this.#flaged=value;
    }
    set BombsAround(value){
        this.#bombsAround=value
    }
    set Cordinates(value){
        this.#cordinates=value;
    }
    /**
     * It returns a string containing the parsed information of the cell using the JSON format.
     * @returns {string}
     */
    toJSON(){
        return `
        {
            "revealed":"${this.IsRevealed}",
            "bomb":"${this.IsBomb}",
            "flaged":"${this.IsFlaged}",
            "bombsAround":"${this.BombsAround}";,
            "cordinates":"${this.Cordinates}"
        }
        `
    }
}