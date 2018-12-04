"use strict";

var pubple;
if (typeof require !== "undefined") {
    pubple = require("./module-base.js").PUBPLE;
}

document.addEventListener("DOMContentLoaded", function() {
    var ui = pubple.ui;
    var util = pubple.util;
    
    // if (util.detectUa() === "ios") {
    //     document.documentElement.style.cursor = "pointer";
    // }

    ui.initNav();
    ui.clickBtnShow();
    ui.initLbPop();
    ui.initTab();
    ui.initSlide();
    ui.initToast();
    ui.initScroll();
    ui.initDrawLine();

    // ui.initCheckbox();
    // ui.appendContents();
    // ui.chkInputVal();
    // ui.initWordPopup();
    // ui.initDraggable();



    setTimeout(function() {
        ui.initDrawLine();
    }, 500);

    if (!pubple.isDt) {
        window.addEventListener("resize", function() {
            pubple.ui.setScale();
        });
    }
});

