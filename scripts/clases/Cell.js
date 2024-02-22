import { Vector2 } from "./Vector2";
export class Cell{
    #revealed;
    #isBomb;
    #bombsAround;
    #cordinates;

    constructor(hasBomb,BombsAround, vectorCordinates){
        this.IsRevealed=false;
        this.IsBomb=hasBomb;
        this.BombsAround=BombsAround;
        this.Cordinates=vectorCordinates;
    }

    get IsBomb(){
        return this.#isBomb
    }
    get IsRevealed(){
        return this.#revealed;
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
    set BombsAround(value){
        this.#bombsAround=value
    }
    set Cordinates(value){
        this.#cordinates=value;
    }
}