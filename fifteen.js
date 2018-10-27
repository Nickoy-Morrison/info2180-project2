window.onload = function(){
  var winning_state = start();
  var puzzle_pieces = getpieces();

  for (var i = 0; i < puzzle_pieces.length; i++) {
        puzzle_pieces[i].addEventListener("mouseover", function() {
            if (ismovable(this)) {
                this.className = "puzzlepiece movablepiece";
            }
        });
      }
}
//Global Vaiable declarations
var blank = ["300px", "300px"]; //coordinates for blank position

function getpieces() {
    return $(".puzzlepiece");
}

function start() {
    var puzzleArea = document.getElementById("puzzlearea").childNodes;
    var instate = [];

    var x = 0,
        y = 0,
        t = 0,
        l = 0,
        counter = 1;

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
