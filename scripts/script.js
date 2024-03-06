//Declaración de constantes.
const MAX_INTENTOS = 10;
const MAX_COMBI_COLORES = 6;
const COLORS = ['white', 'blue', 'green', 'violet', 'yellow', 'red', 'orange', 'cyan'];
const GREY = "grey";
const GREYANSWER = -1;
const WHITE = "white";
const WHITEANSWER = 0;
const BLACK = "black";
const BLACKANSWER = 1;
const ROWRESULTID = "Result";
const SELECTED_CLASS = "selected";
const USERCHOICESELECTOR = ".rowResult:first-child .rowUserCombi>div>div";
const CIRCLERESULTSELECTOR = ".rowResult:first-child .rowCercleResult .cercleResult";
const USERCHOICEROWSELECTOR = ".rowResult:first-child .rowUserCombi";
const CIRCLERESULTROWSELECTOR = ".rowResult:first-child .rowCercleResult";
const SHOWRESULTBOXQUERY = "#master>div>div>div";
const SHOWRESULTBOXROWQUERY = "#master>div";
const OPTIONBOXQUERY = ".OptionBox";
const OPTIONSINGULARQUERY = ".OptionBox>div>div";
const RETRYCOUNTERID = "RetryAmounts";
const WINBOXID = "WinBox";
const LOSTBOXID = "LostBox";




//Declaración de variables globales.
let master;
let userCombi = [];
var intento = 0;
var aciertos = 0;
let selected 
function init() {
    document.getElementById(RETRYCOUNTERID).addEventListener("blur", (Event) =>{
        AlteredRetryCase();
    });
    document.getElementById(RETRYCOUNTERID).addEventListener("click", (Event) =>{
        AlteredRetryCase();
    });


    //1. Genera el código random del master
    master = PickSequence(COLORS, MAX_COMBI_COLORES);
    console.log("Has encontrado mi trampa para los curiosos");
    console.log(master);
    //2. Crea todas las filas según el número de intentos.
    ChangeCounter(MAX_INTENTOS);
    PlaceMasterShowBoxes(MAX_COMBI_COLORES);
    AddNewRowResult(document.getElementById(ROWRESULTID),MAX_COMBI_COLORES);
    AddSelectFunction(document.querySelectorAll(USERCHOICESELECTOR));
}



function ChangeCounter(retry){
    document.getElementById(RETRYCOUNTERID).value=retry;
    return retry;
}

function AddNewRowResult(element, combiOptions){
    let html = element.innerHTML;
    element.innerHTML = ROW_RESULT+html;
    let userChoiceRow = document.querySelector(USERCHOICEROWSELECTOR);
    let circleChoiceRow = document.querySelector(CIRCLERESULTROWSELECTOR);
    for(let i = 0; i<combiOptions; i++){
        userChoiceRow.innerHTML+=INTERACTIVEBOX;
        circleChoiceRow.innerHTML+=ANSWERSHOWER;
    }
}
function PlaceMasterShowBoxes(combiOptions){
    let masterRow = document.querySelector(SHOWRESULTBOXROWQUERY);

    for(let i = 0; i<combiOptions; i++){
        masterRow.innerHTML+=MASTERSHOWERBOX;
    }
}
function PlaceColorsOptions(){
    let optionBox = document.querySelector(OPTIONBOXQUERY);
    let 
    for(let element of COLORS){
        optionBox.innerHTML+=COLOROPTIONBOX;

    }
}
function AddSelectFunction(selections){
    for(let i = 0; i<selections.length; i++){
        selections[i].addEventListener("click", (Event) =>{
            if(Event.shiftKey){
                SelectedMultiple(selections[i]);
            }else{
                Selected(selections[i]);
            }
        });
    }
}
function RemoveSelectFunction(selections){
    let clone;
    for(let i = 0; i<selections.length; i++){
        selections[i].classList.remove(SELECTED_CLASS);
        clone = selections[i].cloneNode(true);
        selections[i].parentNode.replaceChild(clone, selections[i]);
    }
}
function RemoveRetryCountEVent(){
    let input = document.getElementById(RETRYCOUNTERID);
    let clone = input.cloneNode(true);
    input.parentNode.replaceChild(clone, input);
}
/* Llamaremos a esta función desde el botón HTML de la página para comprobar la propuesta de combinación que nos ha
introducido el usuario.
Informamos al usuario del resultado y del número de intentos que lleva*/
function Comprobar() {
    
    let copyMaster = [...master];
    let createNewBox;
    let result;
    let retries = document.getElementById(RETRYCOUNTERID).value;
    let userChoiceBoxes = document.querySelectorAll(USERCHOICESELECTOR);
    let resultShowBoxes = document.querySelectorAll(CIRCLERESULTSELECTOR);
    if(retries>0){
        RemoveSelectFunction(userChoiceBoxes);
        userCombi = GetUserCombi(userChoiceBoxes);
        result = GetFoundState(copyMaster, userCombi);
        createNewBox = !AreAllCorrect(result);
        result = TranslateGroupResultToColor(result);
        ShowAnswer(resultShowBoxes,result);
        if(createNewBox){
            retries--;
            ChangeCounter(retries);
            if(retries<=0){
                ShowBox(document.getElementById(LOSTBOXID));
            }else{
                AddNewRowResult(document.getElementById(ROWRESULTID),MAX_COMBI_COLORES);
                AddSelectFunction(document.querySelectorAll(USERCHOICESELECTOR));
            }
            
        }else{
            ShowBox(document.getElementById(WINBOXID));
            ShowAnswer(document.querySelectorAll(SHOWRESULTBOXQUERY),master);
            RemoveRetryCountEVent();
        }
    }
}
function AlteredRetryCase(){
    let retries = document.getElementById(RETRYCOUNTERID).value;
    let userChoiceBoxes = document.querySelectorAll(USERCHOICESELECTOR);
    if(retries>0){
        HideBox(document.getElementById(LOSTBOXID));
        AddSelectFunction(userChoiceBoxes);
    }else{
        ShowBox(document.getElementById(LOSTBOXID));
        RemoveSelectFunction(userChoiceBoxes);
    }
}

function ShowBox(element){
    element.removeAttribute("hidden");
}
function HideBox(element){
    element.setAttribute("hidden","");
}
function GetUserCombi(boxes){
    let combi = [];
    for(let element of boxes){
        combi.push(SearchColorClass(element));
    }
    return combi;
}
function SearchColorClass(searchTarget){
    for(let element of COLORS){
        if(searchTarget.classList.contains(element)){
            return element;
        }
    }
    return null;
}
function TranslateGroupResultToColor(answers){
    let translatedResult = Array(answers.length);
    for(let i in answers){
        translatedResult[i]=TranslateResultToColor(answers[i]);
    }
    return translatedResult;
}
function TranslateResultToColor(answer){
    switch(answer){
        case GREYANSWER:
            return GREY;
        case WHITEANSWER:
            return WHITE;
        case BLACKANSWER:
            return BLACK;
        default:
            return null;
    }
}
function ShowAnswer(elements, sequence){
    for(let i in sequence){
        elements[i].style.backgroundColor = sequence[i];
    }
}
/** Procedimiento que se ejecuta cada vez que el usuario selecciona un color, hasta el número máximo de colores permitidos en la combinación. */
function añadeColor(color) {
    let elements = document.querySelectorAll("."+SELECTED_CLASS);
    DeleteAllColors();
    for(let element of elements){
       element.classList.add(color);
    }
}
function DeleteAllColors(){
    for(let element of COLORS){
        DeleteColors(element);
    }
    DeleteColors(GREY);
}
function DeleteColors(color){
    let elements = document.querySelectorAll("."+SELECTED_CLASS);
    for(let element of elements){
        element.classList.remove(color);
    }
}

function Selected(docElement){
    let selected = document.querySelectorAll("."+SELECTED_CLASS);
    for(let element of selected){
        element.classList.remove(SELECTED_CLASS);
    }
    docElement.classList.add(SELECTED_CLASS);
}
function SelectedMultiple(docElement){
    docElement.classList.add(SELECTED_CLASS);
}
/** Template con el código HTML que corresponde a cada fila de juego/intento. */
const INTERACTIVEBOX = 
`<div class="w25">
    <div class="celUserCombi flex grey"></div>
</div>`;
const ANSWERSHOWER = 
`<div class="w40 h40">
    <div class="cercleResult flex"></div>
</div>`;
const ROW_RESULT = 
`<div class="rowResult w100 flex wrap">
    <div class="rowUserCombi w75 flex wrap">
    
    </div>
    <div class="rowCercleResult w25 flex wrap center">
    
    </div>
</div>`;
const MASTERSHOWERBOX = `
<div class="w25">
    <div class="cel flex"></div>
</div>`;
const COLOROPTIONBOX = `
<div class="w8">
    <div class="w100 cel flex"></div>
</div>
`;