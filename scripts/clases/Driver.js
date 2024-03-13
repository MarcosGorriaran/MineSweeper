import { GameBoard } from "./GameBoard.js";
export class Driver{
    static #HiddenClassName = "Hidden";
    static #CellClassName = "Cell";
    static #RowClassName = "Row";
    static #BombMark = "X"
    static #FlagMark = "F";
    static #DoubleClickTime = 200;
    static startTime;
    static element;
    static board;

    static initGame(Event){
        Driver.startTime=Event.timeStamp;
        const DefHeight = 10;
        const DefWidth = 10;
        const DefElement = document.getElementById("GameBoard");
        const DefAmountBombs = 10;
        Driver.CreateTableDOM(DefHeight, DefWidth, DefAmountBombs, DefElement);
    }
    static CreateTableDOM(height, width, amountBombs, buildElement){
        Driver.board=new GameBoard(height, width, amountBombs);
        Driver.element = buildElement;

        for(let elementx of Driver.board.Cells){
            let row = document.createElement("div");
            row.classList.add([Driver.#RowClassName]);
            for(let elementy of elementx){
                let cell = document.createElement("div");
                let cellContent = document.createElement("p");
                cell.setAttribute("class",Driver.#CellClassName+(elementy.IsRevealed ?  "": " "+Driver.#HiddenClassName));

                if(elementy.IsRevealed){
                    if(elementy.IsBomb){
                        cellContent.innerHTML+=Driver.#BombMark;
                    }else if(elementy.AmountBombs>0){
                        cellContent.innerHTML+=elementy.AmountBombs;
                    }
                }else if(elementy.IsFlaged){
                    cellContent.innerHTML+=Driver.#FlagMark;
                }

                cell.appendChild(cellContent);
                row.appendChild(cell);
            }
            Driver.element.appendChild(row);
        }
        Driver.AddCellEventListener();
    }
    static UpdateTableDOM(){
        let rowList = document.getElementsByClassName(Driver.#RowClassName);
        for(let i = 0; i< Driver.board.Cells.length; i++){
            let rowCells = rowList[i].getElementsByClassName(Driver.#CellClassName);
            for(let j = 0; j<Driver.board.Cells[i].length; j++){
                let cellContent = rowCells[j].getElementsByTagName("p")[0];
                cellContent.innerHTML="";
                if(Driver.board.Cells[i][j].IsRevealed){
                    rowCells[j].classList.remove([Driver.#HiddenClassName]);
                    if(Driver.board.Cells[i][j].IsBomb){
                        cellContent.innerHTML=Driver.#BombMark;
                    }else if(Driver.board.Cells[i][j].BombsAround>0){
                        cellContent.innerHTML=Driver.board.Cells[i][j].BombsAround;
                    }
                }else if(Driver.board.Cells[i][j].IsFlaged){
                    cellContent.innerHTML=Driver.#FlagMark;
                }
            }
        }
        
    }
    static AddCellEventListener(){
        let actualTimeout;
        let rowList = Driver.element.getElementsByClassName(Driver.#RowClassName);
        for(let i=0;i<rowList.length;i++){
            let Cells=rowList[i].getElementsByClassName(Driver.#HiddenClassName);
            for(let j=0; j<Cells.length;j++){
                
                Cells[j].addEventListener("click",function(Event){
                    if(typeof actualTimeout=== "undefined"){
                        actualTimeout = setTimeout(function(){
                        
                            let deleteEvents = !Driver.board.RevealTile(i,j);
                            Driver.UpdateTableDOM();
                            if(deleteEvents){
                                Driver.SetLostGame();
                            }
                            actualTimeout=undefined;
                        },Driver.#DoubleClickTime);
                    }
                    
                    console.log(actualTimeout);
                });
                Cells[j].addEventListener("dblclick",function(){
                    console.log(actualTimeout);
                    clearTimeout(actualTimeout);
                    actualTimeout=undefined;
                    Driver.board.Cells[i][j].SwitchFlag();
                    Driver.UpdateTableDOM();
                });
            }
        }
    }
    static SetLostGame(){
        let clonedElement = Driver.element.cloneNode(true);
        Driver.element.parentNode.replaceChild(clonedElement,Driver.element);
    }
}