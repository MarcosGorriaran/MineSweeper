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
        let previousCordinates=Array(amountBombs);

        for(let i = 0; i<amountBombs; i++){
            let repeated;
            //This may cause an infinite loop if the amount of bombs
            //is bigger than the amount of cells on the board.
            do{
                let cordinates = new Vector2((Math.random()*this.Cells.length),(Math.random()*this.Cells[0].length));
                repeated=!previousCordinates.some(element=>JSON.stringify(element)===JSON.stringify(cordinates));
            }while(repeated);
            
            previousCordinates[i]=cordinates;
            this.Cells[cordinates.X,cordinates.Y]=new Cell(true,0,cordinates);
        }
    }
    PlaceFlag(x, y){
        this.Cells[x,y].IsFlaged=true;
    }
    RemoveFLag
    
    SearchMines(Vector2){
        return this.SearchMines(Vector2.X, Vector2.Y);
    }
    SearchMines(x, y){
        let sumBombs = 0;
        for(let i=x-1; i<=x+1;i++){
            try{
                for(let j=y-1; j<=y+1; j++){
                    if(j!=y && i!=x && Cells[i,j].IsBomb){
                        sumBombs++;
                    }
                }
            }catch(error){

            }
            
        }
        return sumBombs;
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