(function () {
  'use strict';
  var module = PUBPLE.modules;
  var dataPath = '../data/m03.json';

  module.requestData(dataPath, module.parseData, 'main');
  window.addEventListener('DOMContentLoaded', loadedContent, true);
  window.addEventListener('resize', module.setScale, true);

  function loadedContent() {
    console.log('::::::::DOMContentLoaded::::::::');
    module.setScale();
    module.setScroll();
    $('.contentsScroll').scrollbar();
  }
}());