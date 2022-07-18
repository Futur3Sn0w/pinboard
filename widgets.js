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

// ====================