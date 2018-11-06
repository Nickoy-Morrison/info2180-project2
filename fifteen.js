/*Additional features:
- Animations and/or transitions
- Multiple backgrounds (Grade)
*/


//Global Vaiable declarations
var blank = ["300px", "300px"]; //coordinates for blank position

window.onload = function(){
    var state = start();
    var puzzle = getpieces();
    seletor();
    var items = $("form")[0].elements;

    for (var i = 0; i < items.length; i++) {
        items[i].addEventListener("click", function(){
            make_change(this.value)
        });
    }

    document.getElementById("shufflebutton").onclick = function() {
        shuffle(puzzle);
        image_shuffle();
        puzzle = getpieces();

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
                swap(this, true, state, puzzle);
                moves++;
            }
        });
    }
}

//Checks if the puzzle piece is movable
function start(){
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

//Checks if the puzzle piece is movable
function ismovable(piece) {
    return parseInt(piece.style.top) + 100 === parseInt(blank[0]) & parseInt(piece.style.left) === parseInt(blank[1]) | parseInt(piece.style.top) - 100 === parseInt(blank[0]) & parseInt(piece.style.left) === parseInt(blank[1]) | parseInt(piece.style.top) === parseInt(blank[0]) & parseInt(piece.style.left) - 100 === parseInt(blank[1]) | parseInt(piece.style.top) === parseInt(blank[0]) & parseInt(piece.style.left) + 100 === parseInt(blank[1])
}


//switches piece with blank space
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
    blank = [btop, bleft];
}

//shuffle the maze pieces
function shuffle(pieces) {
    var pLength = pieces.length;
    var piece;
    var rand;

    for (var index = 0; index < pLength; index++) {
        rand = Math.floor(Math.random() * pieces.length);
        piece = pieces.splice(rand, 1);
        swap(piece[0], false);
    }
}

//Returns all maze pieces
function getpieces() {
    return $(".puzzlepiece");
}

//give the option to select a image
function seletor() {
    var form = "<form align='left'>\
    <p align='left'>Select a background image<p>\
    <div class='custom-select' style='width:200px'>\
      <select>\
        <option value=''>Erza (Fairy Tail)</option>\
        <option value='1'>tokyo ghoul: re</option>\
        <option value='2'>Black Clover</option>\
        <option value='3'>Attack on Titan </option>\
        <option value='4'>Violet Evergarden</option>\
      </select>\
    </div>\
    </form>";

    $("#overall").before(form);

}

//accept the image to be change
function make_change(value) {
    var p = getpieces();

    for (var i = 0; i < p.length; i++){
        p[i].style.backgroundImage = `url('background${value}.jpg')`;
    }
}

//shuffle the image that was selected
function image_shuffle(){
    var value = Math.floor(Math.random()*4)
    if(value === 0){
        value = "";
    }
    make_change(value);
}
