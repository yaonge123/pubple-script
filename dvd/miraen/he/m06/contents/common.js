'use strict';

document.addEventListener("DOMContentLoaded", function () {
    var ui = PUBPLE.ui;
    var util = PUBPLE.util;

    if (util.detectUa() === "ios") {
        document.documentElement.style.cursor = "pointer";
    }

    ui.setScale();
    ui.initNav();
    ui.clickBtnShow();
    ui.initSlide();
    ui.initLbPop();
    ui.initTooltip();
    ui.initToast();
    ui.initScroll();
    ui.setBtnAudio();
    ui.initTab();
    ui.showBtnReplay();
    ui.initDrawLine();
    ui.initAudioEffect();
    ui.initCheckbox();
    // ui.loadPopupScript();

    // if (util.detector.isIe()) {
    //     ui.initWordPopup();
    // } else {
    //     document.fonts.ready.then(function () {
    // console.log('All fonts in use by visible text have loaded.');
    // console.log('Roboto loaded? ' + document.fonts.check('1em Roboto'));
    //     ui.initWordPopup();
    // });

    // document.fonts.onloadingdone = function (fontFaceSetEvent) {
    //     console.log("onloadingdone: " + fontFaceSetEvent.fontfaces.length + " font faces loaded");
    // ui.initWordPopup();
    // };
    // }

    //별점 기능
    ui.initStarScore();
    //점수 합산 테이블
    ui.initScoreTable();
});

window.addEventListener("resize", function() {
    PUBPLE.ui.setScale();
});