(function () {
  'use strict';
  var module = PUBPLE.modules;

  module.loadScript('../../js/jquery.scrollbar.min.js');
  window.addEventListener('DOMContentLoaded', loadedContent, true);
  window.addEventListener('resize', module.setScale, true);

  function loadedContent() {
    console.log('::::::::DOMContentLoaded::::::::');
    module.setScale();

    //페이지별 설정
    var popBtn = document.querySelector('.popBtn');
    if(popBtn !== null && popBtn !== undefined) {
      module.showLayerPop();
    }
    var contentsScroll = document.querySelector('.contentsScroll');
    if(contentsScroll !== null && contentsScroll !== undefined) {
      module.setScroll();
      $('.contentsScroll').scrollbar();
    }
    var slide = document.querySelector('.slideContests');
    if(slide !== null && slide !== undefined) {
      module.setSlide();
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

    module.setBtnAudio("../../media/click.mp3");
    module.changePageStyle();
  }
}());