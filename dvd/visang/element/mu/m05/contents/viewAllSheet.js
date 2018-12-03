$(document).ready(function () {
    //
    initViewAllMusicSheet();
});

function initViewAllMusicSheet() {
    var svgArray = new Array();     // contorller object array
    var loadedCnt = 0;              // svg load 확인용

    for (var i = 0; i < $('.notesSetWrap.type1').children('object').length; i++) {
        var obj = svgControllerInit('svg'+(i+1), 3, onStart);   // 가사의 수는 어디서 받아 올 것인가
        svgArray.push(obj);
    }

    function onStart() {
        loadedCnt++;
        if (loadedCnt >= svgArray.length) {
            console.log('viewAllSheet: svg object load complete'); // load complete
            for (var i=0; i<svgArray.length; i++) {
                // svgArray[i].showElement();          // 전체 악보 보기니까 pointer 표시
                //svgArray[i].showLyrics(2, false);   // 어떤 가사들을 보여줄 것인지
                //svgArray[i].lyricsMoveToY(2, 1);    // 어떤 가사를 얼마나 이동시켜 보여줄 것인지
            }
            if ($('#hidePointerTxt').length) {
                var root = $('#hidePointerTxt');
        
                var chkBox = root.find('.bsBtnCheck');
        
                root.off('click');
                root.on('click', function () {      // 악보만 보기 버튼 동작
                    if (chkBox.hasClass('on')) {
                        chkBox.removeClass('on');
                    } else {
                        chkBox.addClass('on');
                    }
                    onlyMusicSheet(chkBox.hasClass('on'));
                    
                    var clickAudio = document.getElementById('btnClick');
                    if(!clickAudio.ended) {
                      clickAudio.currentTime = 0;
                    }
                    clickAudio.play();
                });
            }
        }
    }
    function onlyMusicSheet(isOnly) {
        if (isOnly) {
            for (var i=0; i<svgArray.length; i++) {
                svgArray[i].showElement();
            }
        } else {
            for (var i=0; i<svgArray.length; i++) {
                svgArray[i].hideElement();
            }
        }
    }
}
