window.onload = function () {
    backgroundGradientGen();
    makeDropTargets();
}

function backgroundGradientGen() {
    var colors = ["#e2dffd", "#ffed68", "#ffe5cf", "#a5f1d3", "#dffdf3", "#fecf97", "#f4f5a2", "#f5fdc3", "#abe7e4"];
    var randColor = colors[Math.floor(Math.random() * colors.length)];
    var NewColor = LightenDarkenColor(randColor, -90);

    document.body.style.background = "radial-gradient(ellipse at top, " + randColor + ", " + NewColor + ")";
}

function LightenDarkenColor(col, amt) {

    var usePound = false;

    if (col[0] == "#") {
        col = col.slice(1);
        usePound = true;
    }

    var num = parseInt(col, 16);

    var r = (num >> 16) + amt;

    if (r > 255) r = 255;
    else if (r < 0) r = 0;

    var b = ((num >> 8) & 0x00FF) + amt;

    if (b > 255) b = 255;
    else if (b < 0) b = 0;

    var g = (num & 0x0000FF) + amt;

    if (g > 255) g = 255;
    else if (g < 0) g = 0;

    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);

}

function widgetsPage() {
    document.getElementById('widgetsGrid').style.display = "flex";
    document.getElementById('pinBoard').style.display = "none";

    document.getElementById('pageLabel').innerText = "Widgets (DEMO)"
}

function shapesPage() {
    document.getElementById('pinBoard').style.display = "flex";
    document.getElementById('widgetsGrid').style.display = "none";

    document.getElementById('pageLabel').innerText = "Shapes (Pinboard)"
}

// ==================

var lastY;
var rect = document.querySelector('.progress');
rect.addEventListener('mousedown', function (event) {
    if (event.which == 1) {
        lastY = event.pageY;
        addEventListener('mousemove', moved);
        event.preventDefault(); // Prevent selection
    }
});

function buttonPressed(event) {
    // not all browsers support event.which for mousemove, but
    // all major browsers support buttons or which
    if (event.buttons == null)
        return event.which != 0;
    else
        return event.buttons != 0;
}
function moved(event) {
    if (!buttonPressed(event)) {
        removeEventListener('mousemove', moved);
    } else {
        var dist = event.pageY - lastY;
        var newHeight = Math.max(rect.offsetHeight - dist);
        rect.style.height = newHeight + 'px';
        lastY = event.pageY;
    }
}

// =============

var lastX;
var rect2 = document.querySelector('.line');
rect2.addEventListener('mousedown', function (event) {
    if (event.which == 1) {
        lastX = event.pageX;
        addEventListener('mousemove', moved2);
        event.preventDefault(); // Prevent selection
    }
});

function buttonPressed2(event) {
    // not all browsers support event.which for mousemove, but
    // all major browsers support buttons or which
    if (event.buttons == null)
        return event.which != 0;
    else
        return event.buttons != 0;
}
function moved2(event) {
    if (!buttonPressed2(event)) {
        removeEventListener('mousemove', moved2);
    } else {
        var dist2 = event.pageX - lastX;
        var newWidth2 = Math.max(10, rect2.offsetWidth + dist2);
        rect2.style.width = newWidth2 + 'px';
        lastX = event.pageX;
    }
}

// ==============

setInterval(() => {
    d = new Date(); //object of date()
    hr = d.getHours();
    min = d.getMinutes();
    sec = d.getSeconds();
    hr_rotation = 30 * hr + min / 2; //converting current time
    min_rotation = 6 * min;
    sec_rotation = 6 * sec;

    hour.style.transform = `rotate(${hr_rotation}deg)`;
    minute.style.transform = `rotate(${min_rotation}deg)`;
    second.style.transform = `rotate(${sec_rotation}deg)`;
}, 1000);

// ===========

var playPauseBtn = document.getElementById('playPause');
var playingLine = document.getElementById('playingLine');
var root = document.querySelector(':root');
playing = true;

playPauseBtn.onclick = function () {
    if (playing == true) {
        playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        root.style.setProperty('--flatLine', "black");
        playingLine.style.backgroundImage = "unset";
        playing = !playing;
    } else {
        playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        root.style.setProperty('--flatLine', "transparent");
        playingLine.style.backgroundImage = 'url("https://ewebdesign.com/wp-content/themes/ewebdesign/assets/img/wave.svg")';
        playing = !playing;
    }
}