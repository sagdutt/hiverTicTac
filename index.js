/**
 * This program is a boliler plate code for the famous tic tac toe game
 * Here box represents one placeholder for either X or a 0
 * We have a 2D array to represent the arrangement of X or O is a grid
 * 0 -> empty box
 * 1 -> box with X
 * 2 -> box with O
 * 
 * Below are the tasks which needs to be completed
 * Imagine you are playing with Computer so every alternate move should be by Computer
 * X -> player
 * O -> Computer
 * 
 * Winner has to be decided and has to be flashed
 * 
 * Extra points will be given for the Creativity
 * 
 * Use of Google is not encouraged
 * 
 */
const grid = [];
const GRID_LENGTH = 3;
let turn = 'X';

function initializeGrid() {
    for (let colIdx = 0;colIdx < GRID_LENGTH; colIdx++) {
        const tempArray = [];
        for (let rowidx = 0; rowidx < GRID_LENGTH;rowidx++) {
            tempArray.push(0);
        }
        grid.push(tempArray);
    }
}

function getRowBoxes(colIdx) {
    let rowDivs = '';
    
    for(let rowIdx=0; rowIdx < GRID_LENGTH ; rowIdx++ ) {
        let additionalClass = 'darkBackground';
        let content = '';
        const sum = colIdx + rowIdx;
        if (sum%2 === 0) {
            additionalClass = 'lightBackground'
        }
        const gridValue = grid[colIdx][rowIdx];
        if(gridValue === 1) {
            content = '<span class="cross">X</span>';
        }
        else if (gridValue === 2) {
            content = '<span class="cross">O</span>';
        }
        rowDivs = rowDivs + '<div colIdx="'+ colIdx +'" rowIdx="' + rowIdx + '" class="box ' +
            additionalClass + '">' + content + '</div>';
    }
    return rowDivs;
}

function getColumns() {
    let columnDivs = '';
    for(let colIdx=0; colIdx < GRID_LENGTH; colIdx++) {
        let coldiv = getRowBoxes(colIdx);
        coldiv = '<div class="rowStyle">' + coldiv + '</div>';
        columnDivs = columnDivs + coldiv;
    }
    return columnDivs;
}

function renderMainGrid() {
    const parent = document.getElementById("grid");
    const columnDivs = getColumns();
    parent.innerHTML = '<div class="columnsStyle">' + columnDivs + '</div>';
}

function onBoxClick() {
    var rowIdx = this.getAttribute("rowIdx");
    var colIdx = this.getAttribute("colIdx");
    if(grid[colIdx][rowIdx] === 0){
        let newValue = 1;
        grid[colIdx][rowIdx] = newValue;
        renderMainGrid();
        let result = checkWin(colIdx, rowIdx, 1);
        if(result === 0){
            displayBanner("Computer's Turn");
            setTimeout(computerTurn, 1000);
        }else{
            showWinMessage(result);
        }
    }
}

function computerTurn(){
    for(let i = 0; i<GRID_LENGTH; i++){
        for(let j = 0; j<GRID_LENGTH; j++){
            if(grid[i][j] == 0){
                grid[i][j] = 2;
                renderMainGrid();
                let result = checkWin(i, j, 2);
                if(result === 0){
                    displayBanner("Your Turn");
                    addClickHandlers();
                }else{
                    showWinMessage(result);
                }
                return;
            }
        }
    }
}

function displayBanner(message){
    document.getElementById("message").innerHTML = message;
}

function showWinMessage(result){
    let banner = document.getElementById("message");
    if(result === 1){
        banner.innerHTML = "You won! :)";
    }else if(result === 2){
        banner.innerHTML = "You've lost.. :(";
    }
    banner.classList.add('end-game');
}

function checkWin(x, y, val){
    let rowCheck = true;
    let colCheck = true;
    let diagCheck = true;
    let oppDiagCheck = true;
    for(let i=0; i<GRID_LENGTH; i++){
        if(grid[x][i] !== val){
            rowCheck = false;
            break;
        }            
    }

    for(let i=0; i<GRID_LENGTH; i++){
        if(grid[i][y] !== val){
            colCheck = false;
            break;
        }            
    }

    for(let i=0; i<GRID_LENGTH; i++){
        if(grid[i][i] !== val){
            diagCheck = false;
            break;
        } 
    }

    for(let i=0; i<GRID_LENGTH; i++){
        if(grid[i][GRID_LENGTH-1-i] !== val){
            oppDiagCheck = false;
            break;
        } 
    }

    if(rowCheck || colCheck || diagCheck || oppDiagCheck){
        return val;
    }

    return 0;
}

function addClickHandlers() {
    var boxes = document.getElementsByClassName("box");
    for (var idx = 0; idx < boxes.length; idx++) {
        boxes[idx].addEventListener('click', onBoxClick, false);
    }
}



initializeGrid();
renderMainGrid();
addClickHandlers();
