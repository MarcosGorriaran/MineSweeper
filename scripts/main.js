import { GameBoard } from "./clases/GameBoard.js";



const CellClassName="Cell";
const RowClassName = "Row";
const GameBoardID = "GameBoard";

function CreateCell(cell){
    let cellElement = document.createElement("div");
    cellElement.setAttribute("class",CellClassName);
    if(cell.IsBomb){
        cellElement.innerHTML="<p>X</p>";
    }else if(cell.BombsAround>0){
        cellElement.innerHTML="<p>"+cell.BombsAround+"</p>";
    }
    return cellElement;
}

function SetRow(rowCells){
    let row = document.createElement('div');
    row.setAttribute("class",RowClassName);
    for(let i in rowCells){
        row.appendChild(CreateCell(rowCells[i]));
    }
    return row;
}

function GenerateGameBoard(gameBoard,pageBoard){
    for(let i in gameBoard.Cells){
        pageBoard.appendChild(SetRow(gameBoard.Cells[i]))
    }
}

function init(){
    let gameBoard=new GameBoard(10,10,10);
    let pageBoard = document.getElementById(GameBoardID);
    gameBoard.RevealAllBlanks(0,0);
    console.log(gameBoard);
    GenerateGameBoard(gameBoard,pageBoard);
}

window.addEventListener("load",init);