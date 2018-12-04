$(document).ready(function(){
  $(window).on('resize', getScale);
  var scaleX, scaleY;
  getScale();

  function getScale() {
    var transformVal = $('#contentContainer').css('transform').split('(')[1];
    scaleX = transformVal.split(',')[0];
    scaleY = transformVal.split(',')[3];
  }

  $('.drag').draggable({
    // containment: '.dragEvent',
    helper : 'clone',
    opacity: 0.7,
    revert: 'invalid',
    scroll: false,
    // refreshPositions: true,
    // cursorAt: {top:0, left:0},
    start: function(event, ui) {
      //console.log('drag start!!!');
      ui.position.left = event.target.offsetLeft - parseInt($(event.target).css('margin-left'));
      ui.position.top = event.target.offsetTop - parseInt($(event.target).css('margin-top'));
      $('.dropArea').droppable('enable');

    },
    drag: function(event, ui) {
      ui.position.left = ui.position.left / scaleX + (parseInt($(event.target).css('margin-left')) / scaleX - parseInt($(event.target).css('margin-left')));
      ui.position.top = ui.position.top / scaleY + (parseInt($(event.target).css('margin-top')) / scaleY - parseInt($(event.target).css('margin-top')));
    }
  });

  $('.dropBox .dropArea').droppable({
    accept: '.drag.no1',
    tolerance: 'pointer',
    drop :  function(event, ui) {
      if(!$(ui.draggable).parents().hasClass('dropArea')){
        var sum = 0;
        var limit = $(this).data('limit');

        $(this).find('.guideTxt').css('display', 'none');
        $(this).find('.drag').each(function () {
          sum += parseFloat($(this).data('num'));
        });
        sum += parseFloat($(ui.draggable).data('num'));

        if (sum <= limit) {
          var cloned = $(ui.helper).clone();

          //.syncTable 예외처리
          var droppableOffset;
          var draggableH;
          if ($('.syncTable').length !== 0) {
            droppableOffset = $(this).parent().offset();
            if (document.querySelector('.dragEvent.namsaeng') !== null) { //m03_03_06_07.html
              draggableH = document.querySelector('.dropWrap .sync03_01').clientHeight;
            } else {
              draggableH = document.querySelector('.dropBox').clientHeight;
            }
          } else {
            if (document.querySelector('.dragEvent.multiCol') !== null) {
              if ($(this).parents('.noteRow').length !== 0) {
                droppableOffset = $(this).parents('.noteRow').offset();
              } else {
                droppableOffset = $(this).parents('.dropBox').offset();
              }
            } else {
              droppableOffset = $(this).parents('.dropWrap').offset();
            }
            draggableH = $(this).parents('.dragEvent').find('.dragWrap .drag.no1')[0].clientHeight;
          }
          // console.log('draggable', $(this).parents('.dragEvent').find('.dragWrap .drag.no1')[0]);
          // console.log('droppableOffset', droppableOffset);
          // console.log('draggableH', draggableH);
          // console.log('this.clientHeight', this.clientHeight);

          var draggableOffset = ui.helper.offset();
          var left = (draggableOffset.left - droppableOffset.left) / scaleX;
          // var top = (draggableOffset.top - droppableOffset.top) / scaleY;
          var top = this.clientHeight / 2 - (draggableH / 2);

          cloned.css({
            'position': 'absolute',
            'left': left,
            'top': top,
            'opacity': 1
          });

          //m03_03_09_07
          if($(cloned).data('inst') !== undefined) {
            var inst = $(cloned).data('inst');
            if($(this).children('.' + inst).length !== 0) {
              $('.feedAudio').trigger('play');
              return;
            }
          }

          $(this).append(cloned);
          cloned.addClass('dragged');

          cloned.draggable({
            // containment: '.dragEvent',
            opacity: 0.5,
            revert: 'invalid',
            scroll: false,
            start: function (event, ui) {
              $('.dropArea').droppable('enable');
            },
            drag: function (event, ui) {
              ui.position.left = ui.position.left / scaleX;
              // ui.position.top = ui.position.top / scaleY;
              ui.position.top = top;
            }
          });

          $('.dropArea').droppable({
            out: function (event, ui) {
              if ($(ui.helper).hasClass('dragged')) {
                // console.log('out!!!');
                $(ui.helper).remove();
                var sum = 0;
                $(this).find('.drag').each(function () {
                  sum += parseFloat($(this).data('num'));
                });
                if (sum === 0) {
                  $(this).find('.guideTxt').css('display', 'inline-block');
                }
                $('.dropArea').droppable('disable');
              }
            }
          });

          audioKill();

          if($(this).data('answer') !== $(cloned).data('helper')) { //정답 체크하는 경우
            $(cloned).remove();
            $('.feedAudio').trigger('play');
          } else {
            $('.feedAudio_ok').trigger('play');
          }
        } else {
          audioKill();
          $('.feedAudio').trigger('play');
        }
      }
    }
  });

  //다시 풀기 버튼 클릭
  $('.resetDrag').on('click', function() {
    $('.dragged').remove();
    $('.guideTxt').show();
  });

  if(document.querySelector('.instrumentBox') === null) {
    return;
  } else {
    $('.ibDropWrap .dropArea').droppable({
      accept: '.drag.no2',
      tolerance: 'pointer',
      drop :  function(event, ui){
        if(!$(ui.draggable).parents().hasClass('dropArea')){
          $(this).find('.guideTxt').css('display', 'none');
          var sum = 0;
          $(this).find('.drag').each(function(){
            sum += parseFloat($(this).data('num'));
          });
          sum += parseFloat($(ui.draggable).data('num'));
          if(sum <= 3){
            var cloned = $(ui.helper).clone();
            var draggableOffset = ui.helper.offset(),
              droppableOffset = $('.instrumentBox').offset(),
              left = (draggableOffset.left - droppableOffset.left) / scaleX,
              // top = (draggableOffset.top - droppableOffset.top) / scaleY;
              top = (this.clientHeight - document.querySelector('.drag.no2').clientHeight) / 2;
            cloned.css({
              'position': 'absolute',
              'left': left,
              'top': top,
              'opacity': 1
            });
            $(this).append(cloned);
            cloned.addClass('dragged');

            cloned.draggable({
              containment: '.dragEvent',
              opacity: 0.5,
              revert: 'invalid',
              scroll: false,
              start: function(event, ui) {
                $('.dropArea').droppable('enable');
              },
              drag: function(event, ui) {
                ui.position.left = ui.position.left / scaleX;
                // ui.position.top = ui.position.top / scaleY;
                ui.position.top = top;
              }
            });

            $('.dropArea').droppable({
              out: function(event, ui) {
                if($(ui.helper).hasClass('dragged')) {
                  // console.log('out!!!');
                  $(ui.helper).remove();
                  var sum = 0;
                  $(this).find('.drag').each(function(){
                    sum += parseFloat($(this).data('num'));
                  });
                  if(sum === 0) {
                    $(this).find('.guideTxt').css('display', 'inline-block');
                  }
                  $('.dropArea').droppable('disable');
                }
              }
            });
            audioKill();
            $('.feedAudio_ok').trigger('play');
          }else{
            audioKill();
            $('.feedAudio').trigger('play');
          }
        }
      }
    });
  }

});

function audioKill(){
  $('.feedAudio_ok').trigger('pause');
  $('.feedAudio_ok').prop('currentTime', 0);
  $('.feedAudio').trigger('pause');
  $('.feedAudio').prop('currentTime', 0);
}