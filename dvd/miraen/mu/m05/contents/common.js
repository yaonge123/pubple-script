(function () {
  'use strict';
  var module = PUBPLE.modules;
  // var dataPath = '../../../data/m05.json';

  // module.requestData(dataPath, module.parseData);
  module.loadScript('../../common/js/jquery.scrollbar.min.js');
  window.addEventListener('DOMContentLoaded', loadedContent, true);
  window.addEventListener('resize', module.setScale, true); 

  function loadedContent() {
    // var path = '../../../common/main_nav.html';
    // var callback = module.appendNav;

    module.setScale();
    // module.tempAlert();//임시
    //링크 클릭시 네비게이션 임시 처리
    var openerPath = '';
    try {
      openerPath = window.opener.location.pathname;
    }catch(e) {
      openerPath = 'other';
    }



    //나중에 주석 처리 - 종민
    module.appendNav();

    // if(window.opener === null || openerPath === 'other') {
    //   // module.requestData(path, callback);
    //   module.appendNav();
    // }



    //링크 클릭시 네비게이션 임시 처리

    //페이지별 설정
    var popBtn = document.querySelector('.popBtn');
    if(popBtn !== null && popBtn !== undefined) {
      module.showLayerPop();
    }
    var showBtn = document.querySelector('.showBtn');
    var answerBtn = document.querySelector('.answerBtn');
    if((showBtn !== null && showBtn !== undefined) || (answerBtn !== null && answerBtn !== undefined)) {
      module.showText();
    }
    var inputTxt = document.querySelector('.inputTxt');
    if(inputTxt !== null && inputTxt !== undefined) {
      module.showInputText();
    }
    var contentsScroll = document.querySelector('.contentsScroll');
    if(contentsScroll !== null && contentsScroll !== undefined) {
      try{
          module.setScroll();
          $('.contentsScroll').scrollbar();
      }catch (e) {
        console.error('e ::::: ' + e);
      }
    }
    var setDownBtn = document.querySelector('.downBtn');
    if(setDownBtn !== null && setDownBtn !== undefined) {
      module.setDownBtn();
    }
    var slide = document.querySelector('.slideContests');
    if(slide !== null && slide !== undefined) {
      module.setSlide();
    }
    var smile = document.querySelector('.smileSet');
    if(smile !== null && smile !== undefined) {
      module.setSmile();
    }
    var tab = document.querySelector('.tabContent');
    if(tab !== null && tab !== undefined) {
      module.setTab();
    }
    var layerPop = document.querySelector('.layerClickBtn');
    if(layerPop !== null && layerPop !== undefined) {
      module.setLayerPop();
    }
    var newPop = document.querySelector('.newPopBtn');
    if(newPop !== null && newPop !== undefined) {
      module.setNewPop();
    }

    module.setBtnAudio();
    module.addFeedSound();
    module.setBtnText();
    module.changePageStyle();
  }
}());