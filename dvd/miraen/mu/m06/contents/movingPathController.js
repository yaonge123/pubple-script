var movingPathController = function () {
  var paperW = $('#svgForTypeA').innerWidth();
  var paperH = $('#svgForTypeA').parent().innerHeight();
  var paper = new Raphael(document.getElementById('pathWrap'), paperW, paperH);
  paper.addGuides();

  var svgObj = document.getElementById('A_svg1');
  var pathObjArr = [];
  var pathObjArrLen;
  var marker;
  var handImgObj;
  var handWidth;
  var handHeight;
  var imgTop = 0;
  var imgLeft = 0;

  //svg에 접근하기 위해 이벤트리스너 등록
  svgObj.addEventListener('load', function() {
    var svg = svgObj.contentDocument;
    var pathList = svg.querySelectorAll('path');
    var allPathLen = pathList.length;
    var pathIdx = 0;

    handImgObj = svg.getElementById('hand').childNodes[1];
    //svg 파일 생성시 transform 속성 추가로 손가락 이미지 좌표와 크기가 설정됨
    var handScaleX = handImgObj.getAttribute('transform').replace(/[a-z]|\(|\)/g, '').split(' ')[0];
    var handScaleY = handImgObj.getAttribute('transform').replace(/[a-z]|\(|\)/g, '').split(' ')[3];
    handWidth = handImgObj.getAttribute('width') * handScaleX;
    handHeight = handImgObj.getAttribute('height') * handScaleY;

    for(var i = 0; i < allPathLen; i++) {
      var pathId = pathList[i].getAttribute('id');
      if(pathId !== null && pathId.indexOf('path') !== -1) {
        pathIdx++;
        var pathObj = {};
        var pathStr = svg.getElementById('path' + pathIdx).getAttribute('d');
        var path = paper.path(pathStr).attr({'opacity': 0, 'stroke-width': '1', 'stroke': 'blue'});
        var length = path.getTotalLength(pathStr);

        pathObj.pathStr = pathStr;
        pathObj.path = path;
        pathObj.length = length;

        pathObjArr.push(pathObj);
        pathObjArrLen = pathObjArr.length;
      }
    }
    // console.log(pathObjArr);
    if(!marker) {
      marker = paper.image('../../common/svg/hand.png', imgLeft, imgTop, handWidth, handHeight);
      marker.attr({'class': 'handMarker', 'opacity':'0'});
    }
  });

  return {
    moveTo: function(data) {
      var idx = data.idx;
      var start = data.start;
      var end = data.end;
      var duration = (end - start) * 1000;
      var movePath = pathObjArr[idx - 1].path;

      if(!marker) {
        marker = paper.image('../../common/svg/hand.png', imgLeft, imgTop, handWidth, handHeight);
        marker.attr('class', 'handMarker');
      }
      if(handImgObj.getAttribute('display') !== 'none') {
        handImgObj.setAttribute('display', 'none');
      }
      // console.log('movePath', movePath);

      marker.attr({guide: movePath, along: 0, opacity: 1})
        .animate({along: 1}, duration, 'linear',
          function() {
            if(idx === pathObjArrLen) {
              handImgObj.setAttribute('display', 'inline-block');
              marker.attr('opacity', 0);
            }
          });
    }
    /*reset: function() {
      $('.handMarker').hide();
      handImgObj.setAttribute('display', 'inline-block');
    }*/
  }
}