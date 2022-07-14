var pinBoard = document.getElementById('pinBoard');

var gridWidth = Math.round(window.innerWidth / 130);
var gridHeight = Math.round(window.innerHeight / 130) - 1;

function makePinBoard() {
    pinBoard.style.maxWidth = gridWidth * 130;
    pinBoard.style.maxHeight = gridHeight * 130;
    pinBoard.style.gridTemplateColumns = "repeat(" + gridWidth + ", 1fr)";
    pinBoard.style.gridTemplateRows = "repeat(" + gridHeight + ", 1fr)";
}