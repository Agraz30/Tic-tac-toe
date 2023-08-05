console.log("Welcome to the game !!")
let over = false;


let turn  = "X";

const changeTurn = ()=>{
    return turn === "X" ? "0":"X"
}



const check_win = ()=>{
    let btext = document.getElementsByClassName('text');
    let wins = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]

    ]

    wins.forEach(e =>{

             if((btext[e[0]].innerText!=='')&&(btext[e[0]].innerText===btext[e[1]].innerText)&&(btext[e[1]].innerText===btext[e[2]].innerText)&&(btext[e[0]].innerText===btext[e[2]].innerText)){
                document.getElementsByClassName("info")[0].innerText = btext[e[0]].innerText + " Wins";
                over = true;
             }
              
 
    })
}

document.getElementsByClassName("info")[0].innerText = "Turn for "+turn;
let boxes = document.getElementsByClassName("box");



Array.from(boxes).forEach(element =>{
        let btext = element.querySelector('.text');
        element.addEventListener('click',()=>{
        if(btext.innerText === ''){
            btext.innerText = turn;
            turn  = changeTurn();
            check_win();
            if(!over){
                      document.getElementsByClassName("info")[0].innerText = "Turn for "+turn;
                }
            }
        })
    })
    
    
    
function reset_grid(){
    Array.from(boxes).forEach(element =>{
        element.querySelector('.text').innerText = '';
    })
}
    
