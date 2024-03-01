import { Cell } from "./Cell.js";
import { Vector2 } from "./Vector2.js";

export class GameBoard{
    #cells;
    #amountBombs;
    constructor(height, width, amountBombs){
        this.Cells=[...Array(height)].map(e => Array(width).fill(""));
        this.#amountBombs=amountBombs
        
        for(let x in this.Cells){
            for(let y in this.Cells[x]){
                    this.Cells[x][y]=new Cell(false, 0,new Vector2(x,y));
            }
        }
        this.#SetRandomBombs(amountBombs);
    }
    
    #SetRandomBombs(amountBombs){
        let repeated;
        let cordinates;
        for(let i = 0; i<amountBombs; i++){
            //This may cause an infinite loop if the amount of bombs
            //is bigger than the amount of cells on the board.
            do{
                cordinates = new Vector2(Math.round((Math.random()*(this.Cells.length-1))),Math.round((Math.random()*(this.Cells[0].length-1))));
                repeated=this.CellInfo(cordinates.X,cordinates.Y).IsBomb;
            }while(repeated);
            this.Cells[cordinates.X][cordinates.Y].IsBomb=true;
            this.#SetAmountCellsAroundBomb(cordinates.X,cordinates.Y);
        }
    }
    #SetAmountCellsAroundBomb(x, y){
        let sumBombs = 0;
        for(let i=x-1; i<=x+1;i++){
            
                for(let j=y-1; j<=y+1; j++){
                    try{
                        this.Cells[i][j].BombsAround++;
                    }catch(error){

                    }
                }
            
            
        }
        return sumBombs;
    }
    InteractPlaceFlag(x, y){
        if(this.Cells[x,y].IsFlaged){
            this.Cells[x,y].IsFlaged=false;
        }else{
            this.Cells[x,y].IsFlaged=true;
        }
        
    }
    
    RevealAllBlanks(x, y){
        for(let i=x-1; i<=x+1;i++){
                for(let j=y-1; j<=y+1;j++){
                    
                        this.Cells[i][j].IsRevealed=true;
                    
                        if(this.Cells[i][j].BombsAround==0 && j!=y && i!=x){
                            
                            this.RevealAllBlanks(i,j)
                        }
                    
                        console.log(this.Cells[i][j]);
                }
        }
        
    }
    CellInfo(x, y){
        return this.Cells[x][y];
    }
    get Cells(){
        return this.#cells;
    }
    set Cells(value){
        this.#cells=value;
    }
    get AmountBombs(){
        return this.#amountBombs;
    }
}