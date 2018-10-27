//Global Vaiable declarations
var blank = ["300px", "300px"]; //coordinates for blank position



window.onload = function(){
  var winning_state = start(), puzzle = getpieces();

document.getElementById("shufflebutton").onclick = function() {
  shuffle(puzzle);
}

  for (var i = 0; i < puzzle.length; i++) {
        puzzle[i].addEventListener("mouseover", function() {
            if (ismovable(this)) {
                this.className = "puzzlepiece movablepiece";
            }
        });

        puzzle[i].addEventListener("mouseleave", function() {
                  this.className = "puzzlepiece";
              });

      puzzle[i].addEventListener("click", function() {
            if (this.className.includes("movablepiece")) {
                swap(this, true, winning_state, puzzle);
            }
        });
      }
}

function getpieces() {
    return $(".puzzlepiece");
}

function start() {
    var puzzleArea = document.getElementById("puzzlearea").childNodes;
    var instate = [];
    var x = 0,y = 0,t = 0,l = 0,counter = 1;

    for (let k = 0; k < puzzleArea.length; k++) {
        if (puzzleArea[k].nodeName == "DIV") {
            instate.push([t.toString() + "px", l.toString() + "px"]);
            puzzleArea[k].className += "puzzlepiece";
            puzzleArea[k].setAttribute("style", `background-position: ${x}px ${y}px; top: ${t}px; left: ${l}px;`);
            x -= 100;
            l += 100;

            if (counter % 4 == 0) {
                y -= 100;
                t += 100;
                l = 0
            }
            counter += 1;

        }
    }

    return instate
}


function ismovable(piece) {
    return parseInt(piece.style.top) + 100 === parseInt(blank[0]) & parseInt(piece.style.left) === parseInt(blank[1]) | parseInt(piece.style.top) - 100 === parseInt(blank[0]) & parseInt(piece.style.left) === parseInt(blank[1]) | parseInt(piece.style.top) === parseInt(blank[0]) & parseInt(piece.style.left) - 100 === parseInt(blank[1]) | parseInt(piece.style.top) === parseInt(blank[0]) & parseInt(piece.style.left) + 100 === parseInt(blank[1])
}


function swap(piece, animate) {
    btop = piece.style.top;
    bleft = piece.style.left;

    if (animate) {
        var winning_state = arguments[2];
        var pieces = arguments[3];
        $(piece).animate({ "top": blank[0], "left": blank[1] }, "slow", "linear");

    } else {
        piece.style.top = blank[0];
        piece.style.left = blank[1];
    }
    blank = [btop,bleft];
}

function shuffle(pieces) {
    var Length = pieces.length;
    var piece;
    var rand;

    for (var i = 0; i < Length; i++) {
        rand = Math.floor(Math.random() * pieces.length);
        piece = pieces.splice(rand, 1);
        swap(piece[0], false);
    }
}
