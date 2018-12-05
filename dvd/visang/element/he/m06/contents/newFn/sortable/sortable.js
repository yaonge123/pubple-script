$(document).ready(function () {

    var click = {
        x: 0,
        y: 0
    };

    $('#_dropZone_1,#_dropZone_2,#_dropZone_3,#_dropZone_4').sortable({
        connectWith: "._dropZone",
        sort: function(e, ui) {

            var containerEl = document.getElementById("wrap");
            var windowW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            var windowH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            var hRatio = windowW / containerEl.clientWidth;
            var vRatio = windowH / containerEl.clientHeight;

            var changeLeft = ui.position.left - ui.originalPosition.left;
            var newLeft = ui.originalPosition.left + changeLeft / hRatio;
            var newTop = ui.position.top / vRatio;

            ui.helper.css({
                left: newLeft,
                top: newTop
            });
        }
    }).disableSelection();
});



