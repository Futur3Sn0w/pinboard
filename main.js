var pinBoard = document.getElementById('pinBoard');
var pinBoardContainer = document.getElementById('pbCont');
var settings = document.getElementById('settings');
var pageLabel = document.getElementById('pageLabel');

var customShapeWindow = document.getElementById('customShapeWindow');

var savedGridState = localStorage.getItem('pbSet');
var root = document.querySelector(':root');

if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker
            .register("/serviceWorker.js")
            .then(res => console.log("service worker registered"))
            .catch(err => console.log("service worker not registered", err))
    })
}

window.onload = function () {
    backgroundGradientGen();
    checkPBLS();

    pinBoardContainer.style.alignItems = localStorage.getItem('setting-valign');
    pinBoard.innerHTML = savedGridState;
    movableWidgets();
    contextEdit();
    roundedCorners();
    reorderWidgets();
}

$(document).on("click", ".addWidget", function () {
    $(this).clone().appendTo('.pinBoard').removeClass('addWidget').addClass('pbWidget');

    $(".shapesGrid").removeClass('sgShow');
    $(".pinBoard").removeClass('defocus');

    checkPBLS();
    saveSettings();
});

$(document).on("click", ".csw-add", function () {

    customShapeWindow.style.display = "none";

    $(".pinBoard").removeClass('defocus');
    $('.pbAdd').removeClass('hide');

    $('.cswPreview').css('opacity', $('#csoo-opacity').val() + "%");
    $('.cswPreview').attr('data-opacity', $('#csoo-text').val());

    $('.cswPreview').clone().appendTo('.pinBoard').removeClass('cswPreview').addClass('pbWidget').addClass('contextEditPBW');
    $('.shapeOptions').clone().appendTo('.pbWidget');

    saveSettings();
    checkPBLS();
    resetCustomShapeWindow();
});

$(document).on("click", ".csw-cancel", function () {
    customShapeWindow.style.display = "none";
    $(".pinBoard").removeClass('defocus');
    $('.pbAdd').removeClass('hide');

    resetCustomShapeWindow();
    checkPBLS();
});

$(document).on("click", "#customShapeBtn", function () {
    customShapeWindow.style.display = "flex";
    $(".shapesGrid").removeClass('sgShow');
});

$(document).on("mousemove", "body", function () {
    updateCSW();
});

$(document).on("click", ".customShapeWindow", function () {
    updateCSW();
});

$(document).on("keyup", "#csoo-text", function () {
    updateCSW();
});

$(document).on("click", ".csoo-shape", function () {
    $('.cswPreview').attr('id', 'shape' + $(this).attr('data-shapeNo'));
});

$(document).on("click", ".sideNav .pageBtn:not(.pageBtn-sel)", function () {
    $('.pageBtn-sel').removeClass('pageBtn-sel');
    $(this).addClass('pageBtn-sel');
});

$(document).on("click", ".pbAdd", function () {
    customShapeWindow.style.display = "flex";
    $(".shapesGrid").removeClass('sgShow');
    // $(".shapesGrid").addClass('sgShow');
    $(".pinBoard").addClass('defocus');

    $('.pbEdit>i').addClass('fa-edit').removeClass('fa-check');
    $('.pinBoard').removeClass('pinBoard-EditMode');
    $('.pbEdit').addClass('hide');
    $('.pbAdd').addClass('hide');
});

$(document).on("click", ".defocus", function (event) {
    event.preventDefault();
});

$(document).on("click", ".pbEdit", function () {
    if ($('.pinBoard').hasClass('pinBoard-EditMode')) {
        $('.pinBoard').removeClass('pinBoard-EditMode');
        $('.pbEdit>i').addClass('fa-edit').removeClass('fa-check');
        checkPBLS();
    } else {
        $('.pinBoard').addClass('pinBoard-EditMode');
        $('.pbEdit>i').addClass('fa-check').removeClass('fa-edit');
        checkPBLS();
    }
    $('.shape').removeClass('selectedShape');
});

$(document).on("click", ".shop1", function () {
    $(this).parent().parent().remove();

    localStorage.setItem('pbSet', pinBoard.innerHTML);
    checkPBLS();
});

$(document).on("click", ".shop2", function () {
    // toggleMW();
    localStorage.setItem('pbSet', pinBoard.innerHTML);
    checkPBLS();
});

$(".pbWidget").on("taphold", function () {
    $('.pbEdit').click();
});

$(document).on("click", ".pbWidget", function () {
    if ($('.pinBoard').hasClass('pinBoard-EditMode')) {
        $('.shape').removeClass('selectedShape');
        $(this).toggleClass('selectedShape');
        checkPBLS();
    }
});

$(document).on("click", "#rp-reset", function () {
    window.localStorage.clear();
    alert('Pinboard has been reset. Page will now refresh!');
    location.reload();
});

$(document).on("click", ".pb-align", function () {
    var align = $(this).children('label').text().toLowerCase();

    if (align == "center") {
        document.getElementById('pbCont').style.alignItems = "center";
        localStorage.setItem('setting-valign', pinBoardContainer.style.alignItems);
        saveSettings();
    } else {
        document.getElementById('pbCont').style.alignItems = "flex-start";
        localStorage.setItem('setting-valign', pinBoardContainer.style.alignItems);
        saveSettings();
    }
});

$(document).on("click", "#mw-disable", function () {
    localStorage.setItem('movable-optin', 'n');
    location.reload();
});

$(document).on("click", "#mw-enable", function () {
    localStorage.setItem('movable-optin', 'y');
    location.reload();
});

$(document).on("click", "#ce-disable", function () {
    localStorage.setItem('ce-optin', 'n');
    location.reload();
});

$(document).on("click", "#ce-enable", function () {
    localStorage.setItem('ce-optin', 'y');
    location.reload();
});

$(document).on("click", "#rc-disable", function () {
    localStorage.setItem('rc-optin', 'n');
    location.reload();
});

$(document).on("click", "#rc-enable", function () {
    localStorage.setItem('rc-optin', 'y');
    location.reload();
});

$(document).on("click", "#ro-disable", function () {
    localStorage.setItem('ro-optin', 'n');
    location.reload();
});

$(document).on("click", "#ro-enable", function () {
    localStorage.setItem('ro-optin', 'y');
    location.reload();
});

$(document).on("click", ".setting-expandBtn", function () {
    if ($(this).parent().parent().hasClass('setting-expandedSetting')) {
        $('.setting').removeClass('setting-expandedSetting');
        $(this).parent().parent().removeClass('setting-expandedSetting');
    } else {
        $('.setting').removeClass('setting-expandedSetting');
        $(this).parent().parent().addClass('setting-expandedSetting');
    }
});

$(document).on("contextmenu", ".contextEditPBW", function (e) {
    e.preventDefault();
    $('.pbEdit').click();
    $(this).addClass('selectedShape');
});

$(document).on("click", ".contextEditPBC", function (e) {
    if (e.target.classList.contains('pbWidget')) {

    } else if (e.target.classList.contains('so-move')) {

    } else {
        $('.shape').removeClass('selectedShape');
        $('.pinBoard').removeClass('pinBoard-EditMode');
        checkPBLS();
    }
});

$(document).on("click", "#so-moveLeft", function () {
    $(this).parent().parent().insertBefore($(this).parent().parent().prev());
});

$(document).on("click", "#so-moveRight", function () {
    $(this).parent().parent().insertAfter($(this).parent().parent().next());
});

function showSmalls() {
    $('.shape-sml').removeClass('hide')
    $('.shape-med').addClass('hide')
    $('.csoo-size-label').text('Small')
}

function showWides() {
    $('.shape-med').removeClass('hide')
    $('.shape-sml').addClass('hide')
    $('.csoo-size-label').text('Wide')
}

function widgetSize() {
    $('.csoo-size-label').innerText = $(this).attr('data-sizeName');
}

function updateCSW() {
    $('.cswPreview').css('opacity', $('#csoo-opacity').val() + "%");
    $('.cswPreview').attr('data-opacity', $('#csoo-text').val());
}

function toggleMW() {
    var mw = false;
    let circle = document.querySelector('.selectedShape');

    const onMouseMove = (e) => {
        circle.style.left = (e.pageX - 90) + 'px';
        circle.style.top = (e.pageY - 110) + 'px';
    };

    if (mw = false) {
        document.removeEventListener('mousedown', onMouseMove);
        mw = !mw;
    } else if (mw = true) {
        document.addEventListener('mousedown', onMouseMove);
        mw = !mw;
    };

}

function movableWidgets() {
    if (localStorage.getItem('movable-optin') == "y") {
        $('.pbWidget').addClass('movable');

        $('.shop2').removeClass('hide');
        $('.pinBoard').css('height', "100%");
        $('.pbSubSet-valign').css('display', "none");

        $('#mw-enable').attr('checked', true);
        $('#mw-disable').attr('checked', false);
    } else {
        $('.pbWidget').removeClass('movable');

        $('.shop2').addClass('hide');
        $('.pinBoard').css('height', "fit-content");
        $('.pbSubSet-valign').css('display', "flex");

        $('#mw-disable').attr('checked', true);
        $('#mw-enable').attr('checked', false);
    }
}

function contextEdit() {
    if (localStorage.getItem('ce-optin') == "y") {
        $('.topNav').css('display', 'none');

        $('.pbWidget').addClass('contextEditPBW');
        $('.pbContainer').addClass('contextEditPBC');

        $('#ce-enable').attr('checked', true);
        $('#ce-disable').attr('checked', false);
    } else {
        $('.topNav').css('display', 'flex');

        $('.pbWidget').removeClass('contextEditPBW');
        $('.pbContainer').removeClass('contextEditPBC');

        $('#ce-disable').attr('checked', true);
        $('#ce-enable').attr('checked', false);
    }
}

function roundedCorners() {
    if (localStorage.getItem('rc-optin') == "y") {
        $('.contentView').addClass('rc');

        $('#rc-enable').attr('checked', true);
        $('#rc-disable').attr('checked', false);
    } else {
        $('.contentView').removeClass('rc');

        $('#rc-disable').attr('checked', true);
        $('#rc-enable').attr('checked', false);
    }
}

function reorderWidgets() {
    if (localStorage.getItem('ro-optin') == "y") {
        $('.so-move').removeClass('hide');

        $('#ro-enable').attr('checked', true);
        $('#ro-disable').attr('checked', false);
    } else {
        $('.so-move').addClass('hide');

        $('#ro-disable').attr('checked', true);
        $('#ro-enable').attr('checked', false);
    }
}

function resetCustomShapeWindow() {
    $('.cswPreview').attr('id', 'shape1');
    $('#csoo-opacity').val('50');
    $('#csoo-text').val('');
    $('.csoo-shape').prop('checked', false);
    showSmalls();
}

function saveSettings() {
    localStorage.setItem('pbSet', pinBoard.innerHTML);
}

function checkPBLS() {
    if (localStorage.getItem('pbSet') == "") {
        $(".blankBoard").removeClass('hide');
        $('.pbEdit').addClass('hide');
        $('.pinBoard').removeClass('pinBoard-EditMode');
        $('.pbEdit>i').addClass('fa-edit').removeClass('fa-check');
    } else {
        $(".blankBoard").addClass('hide');
        $('.pbEdit').removeClass('hide');
    }
}

function shapesPage() {
    pinBoard.style.display = "flex";
    settings.style.display = "none";

    $('.setting').removeClass('setting-expandedSetting')
    $(".shapesGrid").removeClass('sgShow');
    $(".topNav").removeClass('hide');
    $('.csw-cancel').click();
    $('.pbAdd').removeClass('hide');

    pageLabel.innerText = "Home"
}

function settingsPage() {
    settings.style.display = "flex";
    pinBoard.style.display = "none";

    $(".shapesGrid").removeClass('sgShow');
    $(".topNav").addClass('hide');
    $('.csw-cancel').click();
    $('.pbAdd').addClass('hide');

    pageLabel.innerText = "Settings"
}

function backgroundGradientGen() {
    var colors = ["#acbca4", "#e2dffd", "#ffed68", "#a5f1d3", "#fecf97", "#f4f5a2", "#abe7e4", "#c4acb3", "#a8ebdb", "#7cb3f7", "#ecfba4", "#faf083", "#e3a384", "#e4fb7c", "#f7d099", "#ebbcd0", "#f3e4bb", "#e4d3eb", "#f7f8c7", "#e4dcfb", "#a1a37e", "#74b0f2", "#a1aeb4", "#86bcf6", "#9cbeea", "#c2c6a3", "#d5dbc8"];
    var randColor = colors[Math.floor(Math.random() * colors.length)];
    var NewColor = LightenDarkenColor(randColor, -160);

    pinBoardContainer.style.backgroundColor = randColor;
    settings.style.backgroundColor = randColor;
    document.body.style.backgroundColor = "black";
    root.style.setProperty('--randColor', randColor);
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