console.log("Welcome to the game !!")
let over = false;


let turn = 'X';

const changeTurn = () => {
    return turn === 'X' ? '0' : 'X';
}



function max(a, b) {
    if (a >= b) {
        return a;
    } else {
        return b;
    }
}
function min(a, b) {
    if (a <= b) {
        return a;
    } else {
        return b;
    }
}



const check_win = () => {
    let btext = document.getElementsByClassName('text');
    let wins = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]

    ]


    wins.forEach(e => {

        if ((btext[e[0]].innerText !== '') && (btext[e[0]].innerText === btext[e[1]].innerText) && (btext[e[1]].innerText === btext[e[2]].innerText) && (btext[e[0]].innerText === btext[e[2]].innerText)) {
            document.getElementsByClassName("info")[0].innerText = btext[e[0]].innerText + " Wins";
            over = true;
        }


    })
}






let boxes = document.getElementsByClassName("box");

let grid = [
    [' ', ' ', ' '],
    [' ', ' ', ' '],
    [' ', ' ', ' ']
]
let num = 1;

let ind1 = 5;
let ind2 = 5


let mp = {};
mp['X'] = 10;
mp['0'] = -10;
mp['B'] = 0;


bestchoice();
let index = (ind1 * 3) + ind2;
let mm = String.fromCharCode('0'.charCodeAt(0) + index);
document.getElementById(mm).innerText = turn;
turn = changeTurn();
document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;





Array.from(boxes).forEach(element => {
    let btext = element.querySelector('.text');
    element.addEventListener('click', () => {
        if (btext.innerText === '') {

            let ind = parseInt(btext.id);
            let x = parseInt(ind / 3);
            let y = parseInt(ind % 3);

            // console.log(x, y);
            grid[x][y] = turn;

            console.log(grid);


            btext.innerText = turn;
            turn = changeTurn();
            check_win();
            num++;


            bestchoice();
            let index = (ind1 * 3) + ind2;
            console.log(index);
            let mm = String.fromCharCode('0'.charCodeAt(0) + index);
            document.getElementById(mm).innerText = turn;
            check_win();
            turn = changeTurn();
            num++;

        //    console.log(num);  



            if (!over) {
                if (num == 9) {
                    document.getElementsByClassName("info")[0].innerText = "Draw";
                } else {
                    document.getElementsByClassName("info")[0].innerText = "Turn for " + turn;

                }
            }
        }




    })

})



function equals(a, b, c) {
  if (a === b && b === c && c !== ' ') {
    return true;
  } else {
    return false;
  }
}

function check_winner(vp) {
  let c = 'C';

  for (let i = 0; i < 3; i++) {
    if (equals(vp[i][0], vp[i][1], vp[i][2])) {
      c = vp[i][0];
    }
  }

  for (let i = 0; i < 3; i++) {
    if (equals(vp[0][i], vp[1][i], vp[2][i])) {
      c = vp[0][i];
    }
  }

  if (equals(vp[0][0], vp[1][1], vp[2][2])) {
    c = vp[0][0];
  }

  if (equals(vp[2][0], vp[1][1], vp[0][2])) {
    c = vp[2][0];
  }

  let openSpots = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (vp[i][j] === ' ') {
        openSpots++;
      }
    }
  }

  if (c === 'C' && openSpots === 0) {
    return 'B';
  } else {
    return c;
  }
}

function min_max(vp, par) {
  let c = check_winner(vp);
  if (c !== 'C') {
    return mp[c];
  }

  if (par) {
    let mx = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (vp[i][j] === ' ') {
          vp[i][j] = 'X';
          mx = Math.max(mx, min_max(vp, !par));
          vp[i][j] = ' ';
        }
      }
    }
    return mx;
  } else {
    let mn = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (vp[i][j] === ' ') {
          vp[i][j] = '0';
          mn = Math.min(mn, min_max(vp, !par));
          vp[i][j] = ' ';
        }
      }
    }
    return mn;
  }
}

function bestchoice() {
  mp['X'] = 10;
  mp['0'] = -10;
  mp['B'] = 0;

  let p;
  let mx = -Infinity;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[i][j] === ' ') {
        grid[i][j] = 'X';
        let num = min_max(grid, 0);
        grid[i][j] = ' ';
        if (num > mx) {
          mx = num;
          p = { i, j };
        }
      }
    }
  }
  ind1 = p.i;
  ind2 = p.j;
  grid[p.i][p.j] = 'X';
}



