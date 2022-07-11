
var shapes = document.querySelectorAll('.shape');
var frontCount = 1;

function makeDropTargets() {
    var box = document.getElementById('pinBoard');
    var gridWidth = Math.round(window.innerWidth / 130);
    var gridHeight = Math.round(window.innerHeight / 130) - 1;
    var itemCount = gridHeight * gridWidth;

    document.getElementById('pinBoard').style.maxWidth = gridWidth * 130;
    document.getElementById('pinBoard').style.maxHeight = gridHeight * 130;
    document.getElementById('pinBoard').style.gridTemplateColumns = "repeat(" + gridWidth + ", 1fr)";
    document.getElementById('pinBoard').style.gridTemplateRows = "repeat(" + gridHeight + ", 1fr)";

    for (let step = 0; step < itemCount; step++) {
        const drop = document.createElement('div');

        drop.classList.add('drop');
        drop.id = "dt" + step;
        box.appendChild(drop);

        drop.onclick = e => {
            localStorage.setItem('selectedDrop', drop.id);
            // alert(localStorage.getItem('selectedDrop'));
            shapesGrid.style.bottom = 0;
            document.getElementById('shapesGrid').classList.add('sgShow');
            document.getElementById('pinBoard').classList.add('defocus');
        }
    }
}

var shapesGrid = document.getElementById('shapesGrid');
var shapes = document.querySelectorAll('shape');

function shapeClick(e) {
    var selectedDrop = document.getElementById(localStorage.getItem('selectedDrop'));
    var cloneShape = e.cloneNode(true);

    selectedDrop.replaceChildren(cloneShape);
    document.getElementById('shapesGrid').classList.remove('sgShow');
    document.getElementById('pinBoard').classList.remove('defocus');
}

// window.addEventListener('resize', function (event) {
//     var newWidth = window.innerWidth;
//     var newHeight = window.innerHeight;

//     console.log(newWidth);
// });