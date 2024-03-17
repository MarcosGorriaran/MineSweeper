import { GameBoard } from "./GameBoard.js";
import {Player} from "./Player.js"
export class Driver{
    static #HiddenClassName = "Hidden";
    static #CellClassName = "Cell";
    static #RowClassName = "Row";
    static #BombMark = "X"
    static #FlagMark = "F";
    static #PlayerKey = "Player";
    static #InputDivClass = "input";
    static #GameBoardID = "GameBoard";
    static #FormID = "GameOpt"
    static #PlayerFormID = "PlayerData";
    static #PlayerBirthDate = "birthDate";
    static #PlayerNickID = "playerNick";
    static #GameFormID = "GameData";
    static #GameHeightInpID = "boardHeight";
    static #GameWidthInpID = "boardWidth";
    static #GameBombInpID = "boardBombs";
    static #MinAgeRequirement = "The user must be over 18";
    static #ValueMissingMSG = "This value can not be empty";
    static #ValueTypeIsWrong = "The value type is invalid, it must be of the following type: ";
    static #PatternEmailError = "The patern is wrong, it must be an email of the ITB (name.lastname@itb.cat)(name.lastname.7e7@itb.cat)";
    static #DoubleClickTime = 200;
    static #MinAge=18;
    static #PlayerForm = `
    <div>
        <label>Nickname: </label>
        <div class='input' id='playerNick'>
            <input type='text' required>
            <span></span>
        </div>
        <label>Name: </label>
        <div class='input'>
            <input type='text'>
            <span></span>
        </div>
        <label>Lastname: </label>
        <div class='input'>
            <input type='text'>
            <span></span>
        </div>
        <label>Birth Date:</label>
        <div class='input' id='birthDate'>
            <input type="date" required>
            <span></span>
        </div>
        <label>Email:</label>
        <div class='input'>
            <input type='email' pattern='^[\w]+.[\w]+(.[0-9][a-z][0-9])?@itb.cat$'>
            <span></span>
        </div>
    </div>
    `;
    static #GameForm = `
    <div>
        <label>Height: </label>
        <div class='input' id='boardHeight'>
            <input type='number' required>
            <span></span>
        </div>
    </div>
    <div>
        <label>Width: </label>
        <div class='input' id='boardWidth'>
            <input type='number' required>
            <span></span>
        </div>
        
    </div>
    <div>
        <label>AmountBombs</label>
        <div class='input' id='boardBombs'>
            <input type='number' required>
            <span></span>
        </div>
    </div>
    `
    static player;
    static element;
    static board;

    static init(){
        let form = document.getElementById(Driver.#FormID);
        let playerForm = form.querySelector("#"+Driver.#PlayerFormID);
        let gameForm = form.querySelector("#"+Driver.#GameFormID);
        let sendButton = document.createElement("input");
        let playerRetrived = localStorage.getItem(Driver.#PlayerKey);
        const AddZeroBefore = 10;
        Driver.element = document.getElementById(Driver.#GameBoardID);
        sendButton.setAttribute("type","submit");
        if(playerRetrived==null){
            Driver.Player=null;
            playerForm.innerHTML=Driver.#PlayerForm;
            
            let date = playerForm.querySelector("#"+Driver.#PlayerBirthDate).querySelector("input");
            let maxDate = new Date();
            
            maxDate.setFullYear(maxDate.getFullYear()-Driver.#MinAge);
            date.setAttribute("max",`${maxDate.getFullYear()}-${(maxDate.getMonth()+1)<AddZeroBefore ? "0"+(maxDate.getMonth()+1):(maxDate.getMonth()+1)}-${(maxDate.getDate())<AddZeroBefore ? "0"+maxDate.getDate():maxDate.getDate()}`);
        }else{
            
            Driver.player=(Player.JSONparse(playerRetrived));
            Driver.UpdatePlayerInfo();
        }
        gameForm.innerHTML=Driver.#GameForm;
        form.appendChild(sendButton);
        sendButton.addEventListener("click",function(Event){
            Event.preventDefault();
            let playerFormResult = Driver.player==null ? Driver.ValidatePlayerForm(playerForm):true;
            let gameFormResult = Driver.ValidateGameForm(gameForm);
            if(playerFormResult && gameFormResult) {
                if(Driver.player==null){
                    Driver.player=new Player(document.querySelector("#"+Driver.#PlayerNickID+">input").value,0);
                }
                

                Driver.UpdatePlayerInfo();
                
                
                Driver.UpdatePlayerSave();
                let height = Number.parseInt(gameForm.querySelector("#"+Driver.#GameHeightInpID+">input").value);
                let width = Number.parseInt(gameForm.querySelector("#"+Driver.#GameWidthInpID+">input").value);
                let bombs = Number.parseInt(gameForm.querySelector("#"+Driver.#GameBombInpID+">input").value);
                console.log(height, width, bombs);
                Driver.board=new GameBoard(height, width, bombs);
                Driver.CreateTableDOM();
                gameForm.innerHTML="";
                sendButton.remove();
            }
        });
    }
    static initGame(Event){
        console.log(localStorage.getItem("ss"));
        const DefHeight = 5;
        const DefWidth = 5;
        const DefElement = document.getElementById("GameBoard");
        const DefAmountBombs = 1;
        Driver.board=new GameBoard(DefHeight, DefWidth, DefAmountBombs);
        Driver.CreateTableDOM(DefElement);
    }
    static UpdatePlayerInfo(){
        let playerForm = document.getElementById(Driver.#PlayerFormID);
        playerForm.innerHTML=`<p>Welcome ${Driver.player.nick}</p>
                                    <p>Your HighScore is ${Driver.player.highScore}</p>`;
    }
    static UpdatePlayerSave(){
        localStorage.setItem(Driver.#PlayerKey,JSON.stringify(Driver.player));
    }
    static ValidatePlayerForm(formElement){
        let inputs = formElement.querySelectorAll("."+Driver.#InputDivClass);
        let returnVal = true;
        for(let element of inputs){
            let input = element.querySelector("input");
            let span = element.querySelector("span");
            if(input.validity.valueMissing){
                span.innerHTML=Driver.#ValueMissingMSG;
                returnVal = false;
            }else if(input.validity.typeMismatch){
                span.innerHTML=Driver.#ValueTypeIsWrong+input.getAttribute("type");
                returnVal = false;
            }else if(input.validity.patternMismatch){
                if(input.getAttribute("type")=="email"){
                    span.innerHTML=Driver.#PatternEmailError;
                }
                returnVal=false;
            }else if(input.validity.rangeOverflow){
                if(element.getAttribute("id")==Driver.#PlayerBirthDate){
                    span.innerHTML=Driver.#MinAgeRequirement;
                }
                returnVal=false;
            }else{
                span.innerHTML="";
            }

        }
        return returnVal;
    }
    static ValidateGameForm(formElement){
        let inputs = formElement.querySelectorAll("."+Driver.#InputDivClass);
        let height = document.getElementById(Driver.#GameHeightInpID);
        let width = document.getElementById(Driver.#GameWidthInpID);
        let bombs = document.getElementById(Driver.#GameBombInpID);
        let heightVal = height.querySelector("input").value;
        let widthVal = width.querySelector("input").value;
        let bombsVal = bombs.querySelector("input").value;
        let returnVal = true;
        for(let element of inputs){
            let input = element.querySelector("input");
            if(input.validity.valueMissing){
                element.querySelector("span").innerHTML=Driver.#ValueMissingMSG;
                returnVal = false;
            }else{
                element.querySelector("span").innerHTML="";
            }
        }
        if(returnVal){
            if((heightVal*widthVal)<=bombsVal){
                height.querySelector("span").innerHTML=GameBoard.TooManyBombsError;
                width.querySelector("span").innerHTML=GameBoard.TooManyBombsError;
                returnVal = false;
            }else{
                height.querySelector("span").innerHTML="";
                width.querySelector("span").innerHTML="";
            }
            if(bombsVal<=0){
                bombs.querySelector("span").innerHTML=GameBoard.NoBombsError;
                returnVal = false;
            }
        }
        
        return returnVal;
        
    }
    static CreateTableDOM(){

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
                        
                            let deleteEvents = Driver.board.RevealTile(i,j);
                            Driver.UpdateTableDOM();
                            if(deleteEvents==-1){
                                Driver.SetLostGame();
                            }else if(deleteEvents==1){
                                Driver.SetWinGame();
                            }
                            
                            actualTimeout=undefined;
                        },Driver.#DoubleClickTime);
                    }
                
                });
                Cells[j].addEventListener("dblclick",function(){
                    clearTimeout(actualTimeout);
                    actualTimeout=undefined;
                    let deleteEvents = Driver.board.InteractPlaceFlag(i,j);
                    if(deleteEvents==1){
                        Driver.SetWinGame()
                    }
                    Driver.UpdateTableDOM();
                });
                Cells[j].addEventListener("contextmenu",function(event){
                    event.preventDefault();
                    let deleteEvents = Driver.board.InteractPlaceFlag(i,j);
                    if(deleteEvents==1){
                        Driver.SetWinGame()
                    }
                    Driver.UpdateTableDOM();
                })
            }
        }
    }
    static SetLostGame(){
        console.log("You loose");
        Driver.DisableBoard();
    }
    static SetWinGame(){
        console.log("You win");
        if(Driver.player.highScore<Driver.board.score){
            Driver.player.highScore=Driver.board.score;
            Driver.UpdatePlayerInfo();
            Driver.UpdatePlayerSave();
        }
        
        Driver.DisableBoard();
    }
    static DisableBoard(){
        let clonedElement = Driver.element.cloneNode(true);
        Driver.element.parentNode.replaceChild(clonedElement,Driver.element);
    }
}