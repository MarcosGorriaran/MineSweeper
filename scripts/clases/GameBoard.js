import { Cell } from "./Cell.js";
import { Vector2 } from "./Vector2.js";

/**
 * This class contains the information that a board of minesweeper would have,
 * tracks the score based on which tiles have been revealed and bombs have been flaged
 */
export class GameBoard{
    static #revealTileScore=50;
    static #flagBombScore=100;
    static TooManyBombsError = "The amount of bombs is greater or equal to the amount of tiles";
    static NoBombsError = "There needs to at least be one bomb";
    #cells;
    #amountBombs;
    #maxScore;
    #score;
    /**
     * The constructor will build a board based on how many columns(height), rows(width) and bombs(amountBombs).
     * It will also throw an error if no bombs are provided or the amount of bombs is superior to the amount of cells on the board.
     * @param {number} height 
     * @param {number} width 
     * @param {number} amountBombs 
     */
    constructor(height, width, amountBombs){
        if(amountBombs>=(height*width)){
            throw new Error(GameBoard.TooManyBombsError);
        }else if(amountBombs<=0){
            throw new Error(GameBoard.NoBombsError);
        }
        this.Cells=[...Array(height)].map(e => Array(width).fill(""));
        this.#amountBombs=amountBombs;
        this.#maxScore = (((height*width)-amountBombs)*GameBoard.#revealTileScore)+(amountBombs*GameBoard.#flagBombScore);
        this.#score = 0;
        for(let x = 0; x < this.Cells.length; x++){
            for(let y=0; y < this.Cells[x].length;y++){
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

    /**
     * It will remove or add a flag to a cell and return 0 if the game is not complete yet or 1
     * if the game is complete and victory has been achived.
     * @param {number} x 
     * @param {number} y 
     * @returns {number}
     */
    InteractPlaceFlag(x, y){
        this.Cells[x][y].SwitchFlag();
        if(this.Cells[x][y].IsBomb){
            if(this.Cells[x][y].IsFlaged){
                this.#score+=GameBoard.#flagBombScore;
            }else{
                this.#score-=GameBoard.#flagBombScore;
            }
        }
        return this.#IsGameWon() ? 1 : 0;
    }

    /**
     * This method will set the tile on the specified cordinates as revealed and it will return
     * -1 if the revealed tile is a bomb, a 0 if the game continues or 1 if the requirements for victory have been met by now.
     * If a tile is a blank one it will reveal all adyacent blank tiles and its tiles around it.
     * If a bomb is revealed all bombs on the board are set to be revealed.
     * @param {number} x 
     * @param {number} y 
     * @returns {number}
     */
    RevealTile(x, y){
        this.Cells[x][y].IsRevealed=true;
        if(this.Cells[x][y].IsBomb){
            this.#RevealAllBombs();
            return -1;
            
        }else if(this.Cells[x][y].BombsAround==0){
            this.#RevealAllBlanks(x, y);
            
        }
        this.#score+=GameBoard.#revealTileScore;
        return this.#IsGameWon() ? 1 : 0;
    }
    
    #RevealAllBlanks(x, y){
        for(let i=x-1; i<=x+1;i++){
            
                
            for(let j=y-1; j<=y+1;j++){
                
                try{GameBoard
                    if(this.Cells[i][j].BombsAround==0 && !(j==y && i==x) && !this.Cells[i][j].IsRevealed){
                        this.RevealTile(i,j);
                    }else if(!(j==y && i==x) && !this.Cells[i][j].IsRevealed){
                        this.#score+=GameBoard.#revealTileScore;
                    }
                    
                    this.Cells[i][j].IsRevealed=true;
                }catch(error){

                }
            }
                
                
        }
        return this.#IsGameWon() ? 1 : 0;
        
    }
    #IsGameWon(){
        
        return this.#score==this.#maxScore;
    }
    #RevealAllBombs(){
        for(let i = 0; i<this.Cells.length; i++){
            for(let j = 0; j<this.Cells.length; j++){
                if(this.Cells[i][j].IsBomb){
                    this.Cells[i][j].IsRevealed=true;
                    
                }
            }
        }
    }
    /**
     * It will retrive a Cell object which will contain all the info of the specified tile
     * @param {number} x 
     * @param {number} y 
     * @returns {number}
     */
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
    get score(){
        return this.#score;
    }
}