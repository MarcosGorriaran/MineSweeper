import { GameBoard } from "./clases/GameBoard.js";



const HiddenClassName = "Hidden";
const CellClassName = "Cell";
const RowClassName = "Row";
const BombMark = "X"
const FlagMark = "F";
let element;
let board;

function init(){
    const DefHeight = 10;
    const DefWidth = 10;
    const DefElement = document.getElementById("GameBoard");
    const DefAmountBombs = 10;
    CreateTableDOM(DefHeight, DefWidth, DefAmountBombs, DefElement);
}
function CreateTableDOM(height, width, amountBombs, buildElement){
    board=new GameBoard(height, width, amountBombs);
    element = buildElement;

    let htmlTextResult="";
    for(let elementx of board.Cells){
        let row = document.createElement("div");
        row.classList.add([RowClassName]);
        for(let elementy of elementx){
            let cell = document.createElement("div");
            let cellContent = document.createElement("p");
            cell.setAttribute("class",CellClassName+(elementy.IsRevealed ?  "": " "+HiddenClassName));

            if(elementy.IsRevealed){
                if(elementy.IsBomb){
                    cellContent.innerHTML+=BombMark;
                }else if(elementy.AmountBombs>0){
                    cellContent.innerHTML+=elementy.AmountBombs;
                }
            }else if(elementy.IsFlaged){
                cellContent.innerHTML+=FlagMark;
            }

            cell.appendChild(cellContent);
            row.appendChild(cell);
        }
        element.appendChild(row);
    }
    AddCellEventListener();
}
function UpdateTableDOM(){
    let rowList = document.getElementsByClassName(RowClassName);
    for(let i = 0; i< board.Cells.length; i++){
        let rowCells = rowList[i].getElementsByClassName(CellClassName);
        for(let j = 0; j<board.Cells[i].length; j++){
            let cellContent = rowCells[j].getElementsByTagName("p")[0];
            
            if(board.Cells[i][j].IsRevealed){
                rowCells[j].classList.remove([HiddenClassName]);
                if(board.Cells[i][j].IsBomb){
                    cellContent.innerHTML=BombMark;
                }else if(board.Cells[i][j].BombsAround>0){
                    cellContent.innerHTML=board.Cells[i][j].BombsAround;
                }
            }else if(board.Cells[i][j].IsFlaged){
                cellContent.innerHTML=FlagMark;
            }
        }
    }
    
}
function AddCellEventListener(){
    
    let rowList = element.getElementsByClassName(RowClassName);
    
    for(let i=0;i<rowList.length;i++){
        let Cells=rowList[i].getElementsByClassName(HiddenClassName);
        for(let j=0; j<Cells.length;j++){
            
            Cells[j].addEventListener("click",function(Event){
                if(Event.shiftKey){
                    board.Cells[i][j].SwitchFlag();
                }else{
                    let deleteEvents = !board.RevealTile(i,j);
                    UpdateTableDOM();
                    if(deleteEvents){
                        SetLostGame();
                    }
                }
            });
            
        }
    }
}
function SetLostGame(){
    let clonedElement = element.cloneNode(true);
    element.parentNode.replaceChild(clonedElement,element);
}
window.addEventListener("load",init);