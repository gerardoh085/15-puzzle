let timer;
let seconds = 0;
let status;
var flag = false;

function board() {
    const row = 4;
    const col = 4;
    let count = 1;
    var board_id = document.getElementById("board-game");
    var table = document.createElement('table');
    table.className = "table-container";
    var tbody = document.createElement('tbody');
    for (let i = 0; i < row; i++) {
        var tr = document.createElement('tr');
        for (let j = 0; j < col; j++) {
            var td = document.createElement('td');
            td.className = "nums";
            var textNode = document.createTextNode((count).toString());
            if (count === 16) {
                textNode.textContent = ' ';
                // td.className = 'nums empty-space';
            }

            td.appendChild(textNode);
            tr.appendChild(td);
            count++;
        }
        tbody.appendChild(tr);
    }
    table.appendChild(tbody);
    board_id.appendChild(table);
    shuffle();
}

function userClick() {
    var cells = document.getElementsByClassName("nums");

    for (let i = 0; i < cells.length; i++) {
        cells[i].addEventListener('click', () => {
            Transition(i, cells);
        });
    }
}


function Transition(index, cells) {

    //establish the valid coordinates for the transition 
    const left = -1;
    const right = 1;
    const top = 4;
    const bottom = -4;
    let dir_left = index + left;
    let dir_top = index + top;
    let dir_right = index + right;
    let dir_bottom = index + bottom;


    //left direction:
    if (index + left == -1 || index + left == 15) {

    } else {
        if (cells[index + left].innerHTML == ' ') {
            if (index === 4 || index === 8 || index === 12) {

            }
            else {
                let temp = cells[index].innerHTML;
                cells[index].innerHTML = cells[index + left].innerHTML;
                cells[index + left].innerHTML = temp;
            }
        }

    }

    if (index + right >= 16) {
    } else {
        if (cells[index + right].innerHTML == ' ') {
            if (index === 3 || index === 7 || index === 11) {

            }
            else {
                let temp = cells[index].innerHTML;
                cells[index].innerHTML = cells[index + right].innerHTML;
                cells[index + right].innerHTML = temp;
            }
        }
    }

    //top
    if (index + top >= 16 || index + top < 0) {
    } else {
        if (cells[index + top].innerHTML == ' ') {


            let temp = cells[index].innerHTML;
            cells[index].innerHTML = cells[index + top].innerHTML;
            cells[index + top].innerHTML = temp;

        }
    }
    //bottom 
    if (index + bottom > 16 || index + bottom < 0) {

    } else {
        if (cells[index + bottom].innerHTML == ' ') {

            let temp = cells[index].innerHTML;
            cells[index].innerHTML = cells[index + bottom].innerHTML;
            cells[index + bottom].innerHTML = temp;
        }
    }

    checkPlacement(cells);
}

function shuffle(){

    var cells = document.getElementsByClassName("nums");

    for(let i = 0; i < cells.length; i++){

        let randGen = Math.floor(Math.random()*(i+1));
            
        let temp = cells[i].innerHTML;
        cells[i].innerHTML = cells[randGen].innerHTML;
        cells[randGen].innerHTML = temp;
    }

    checkPlacement(cells);

}

function reset(){
    // let reset_btn = document.getElementsByClassName('reset'); 
    var cells = document.getElementsByClassName("nums");
    let count = 1;
    for(let i = 0; i < 16; i++){
        cells[i].innerHTML = count;
        if(count == 16){
            cells[i].innerHTML = ' ';
        }
        cells[i].className = 'nums reset';
        count++;
    }
    status = true; 
    TimerReset(status);
    // shuffle();
}

function checkPlacement(cells){
    // var cells = document.getElementsByClassName("nums");
    let count = 1;
    for(let i = 0; i < cells.length; i++){
        if(cells[15].innerHTML == ' '){
            cells[15].className= 'nums valid';
        }
        if(cells[i].innerHTML == i+1){
            cells[i].className= 'nums valid';
                
        }else{
            if(cells[i].innerHTML == ' '){
                cells[i].className = 'nums invalid empty-space'
            }else{
                cells[i].className = 'nums invalid';
            }
        }
        count++;   
    }
    WinStatus(cells);
}

function WinStatus(cells){
    
    // var cells = document.getElementsByClassName("nums");
    // let count = 1;
    // // flag = false;
    // // var cells2 = document.getElementsByClassName("empty-space");
    for(let i = 0; i < cells.length-1; i++){
        console.log(cells[i]);
        if(cells[i].innerHTML == i+1 && cells[15].innerHTML == ' '){
            console.log("YOU WON");
            
            break;
        }
    }
    
    // for(let i = 0; i < cells.length-1; i++){
    //     // cells[i].innerHTML == count ||
    //     if(cells[i].innerHTML != i+1){
    //         // if(cells[15].innerHTML == ' ' && cells[i].innerHTML == count){
    //         //     Alert(true);
    //         //     break;
    //         // }
    //         console.log("Nothing");
    //         // // flag = true;
    //         // Alert(true);
    //         // break;
    //     }
    //     else{
    //         console.log("Congrats! You've Won!");
    //         Alerts(true);
    //         break;
    //     }
    //     // count++;

    // }

}
// function Alerts(flag){
//     // if(flag == true){
//     //     alert("CONGRADULATIONS! YOU'VE WON!");
//     //     flag = false;        
//     //     // seconds = 0;
//     //     // shuffle();
//     // }
//     // this.flag = false;
// }

function TimerReset(status){
    if(status == true){
        seconds = 0;
    }
}

function Timer(){
    var ele = document.getElementById("time-box");
    seconds = 1;
    (function() {
        timer = setInterval(()=>{
            ele.innerHTML =  'Timer: ' + seconds++ + 's';
        }, 1000)

    })()
}

board();
// checkPlacement();
userClick();

Timer();

