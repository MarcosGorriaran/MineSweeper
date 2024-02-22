import { Cell } from "./Cell";
import { Vector2 } from "./Vector2";

export class GameBoard{
    #cells;
    #amountBombs;
    constructor(height, width, amountBombs){
        this.Cells=[...Array(height)].map(e => Array(width).fill(undefined));
        this.#SetRandomBombs(amountBombs);
    }
    
    #SetRandomBombs(amountBombs){
        for(let i = 0; i<amountBombs; i++){
            
        }
    }
    CellInfo(x, y){
        return this.Cells[x,y];
    }
    get Cells(){
        return this.#cells;
    }
    set Cells(value){
        this.#cells=value;
    }
}