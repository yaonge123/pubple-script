(function () {
  'use strict';
  var module = PUBPLE.modules;
  // var dataPath = '../../../data/m03.json';

  // module.requestData(dataPath, module.parseData);
  // module.loadScript('../../common/js/jquery.scrollbar.min.js');
  window.addEventListener('DOMContentLoaded', loadedContent, true);
  window.addEventListener('resize', module.setScale, true);

  function loadedContent() {

    module.appendNav();
    module.setScale();

    //페이지별 설정
    var popBtn = document.querySelector('.popBtn');
    if(popBtn !== null && popBtn !== undefined) {
      module.showLayerPop();
    }
    var showBtn = document.querySelector('.btnShow');
    var answerBtn = document.querySelector('.answerBtn');
    if((showBtn !== null && showBtn !== undefined) || (answerBtn !== null && answerBtn !== undefined)) {
      module.showText();
    }
    var inputTxt = document.querySelector('.inputTxt');
    if(inputTxt !== null && inputTxt !== undefined) {
      module.showInputText();
    }

    var setDownBtn = document.querySelector('.downBtn');
    if(setDownBtn !== null && setDownBtn !== undefined) {
      module.setDownBtn();
    }

    var smile = document.querySelector('.smileSet');
    if(smile !== null && smile !== undefined) {
      module.setSmile();
    }
    var tab = document.querySelector('.tabContent');
    if(tab !== null && tab !== undefined) {
      module.setTab();
    }

    module.setBtnAudio();
    module.addFeedSound();
    module.setBtnText();
    module.changePageStyle();
    module.controlLearnTab();

    if (PUBPLE.ui) {
      PUBPLE.ui.initLbPop();
      PUBPLE.ui.initSlide();
      PUBPLE.ui.initScroll('yx');
      PUBPLE.ui.initYoutube();
    }
  }
}());