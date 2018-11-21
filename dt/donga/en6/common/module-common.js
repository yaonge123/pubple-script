"use strict";

var dev;
var global_lesson = parseInt(location.href.split("/").slice(-2)[0].substring(6));
var global_strokeStyle;

if (typeof require !== "undefined") {
    dev = require("./module-base.js").DEV;
}

document.addEventListener("DOMContentLoaded", function() {
    var ui = dev.ui;
    var util = dev.util;
    var delayTime;

    if (isNaN(global_lesson)) {
        global_lesson = parseInt(document.getElementsByClassName("page_txt")[0].textContent.split(" ")[1]);
    }
    
    setTimeout(function() {
        ZOOM_VALUE = parent.ZOOMVALUE || 1;
    }, 1500);
    
    if (util.detectUa() === "ios") {
        document.documentElement.style.cursor = "pointer";
    }

    ui.clickBtnShow();
    ui.initLbPop();
    ui.initTab();
    ui.initSlide();
    ui.initToast();
    ui.initScroll();

    ui.initCheckbox();
    ui.appendContents();
    ui.chkInputVal();
    // ui.initWordPopup();
    ui.initDraggable();
    ui.setBtnAudio();
    ui.initFeedMsg();
    // ui.initPlaySection();
    
    if (util.isTouchDevice) {
        delayTime = 500;
    } else {
        delayTime = 2200;
    }
    setTimeout(function () {
        ui.initDrawLine();
    }, delayTime);
    
    if (!dev.isDt) {
        window.addEventListener("resize", function() {
            dev.ui.setScale();
            ZOOM_VALUE = parent.ZOOMVALUE || 1;
        });
    }
});

