$(document).ready(function () {
    initNavigationController();
});

function initNavigationController() {
    var $noteNav = $('#noteNav');

    // 탭 클릭
    $noteNav.on('click', function (e) {
        var $target = $(e.target);

        resetAllMediaPlayer();

        $('#noteInfo').hide();

        $target.parent().children().removeClass('on');

        if ($target.hasClass('showMusic')) {
            $('#notesDetail_Speak').hide();
            $('#notesDetail_Music').show();

            $('.notesContent').children().hide();
            $('#notesDetail_Music').show();

            if ($target.hasClass('noteNavSubMenu')) {
                $target.addClass('on');

            } else {
                $target.addClass('on');

                $target.parent().find('.mSubBtn').removeClass('on');
                $target.parent().find('.mSubBtn').children().removeClass('on');

                $target.find('.mSubBtn').addClass('on');
                $target.find('.mSubBtn .noteNavSubMenu').eq(0).addClass('on');
            }

        } else if ($target.hasClass('showNote')) {
            $target.parent().find('.mSubBtn').removeClass('on');
            $target.addClass("on");

            $('#notesDetail_Speak , #notesDetail_Music').hide();
            $('#noteInfo').show();

            return false;

            // var jsonData = PUBPLE.modules.getJsonData();
            // var currFile = location.href.split('/').slice(-1)[0];
            // var chp = parseInt(currFile.split('_')[1]);
            // var sec = parseInt(currFile.split('_')[2]);
            // var sub = parseInt(currFile.split('_')[3]);
            // var page = parseInt(currFile.split('_')[4]);
            // var secData = jsonData.chapter[chp - 1].section[sec - 1];
            // var songName = secData.sub[sub - 1].desc.split('-')[1];
            // var subDataLen = secData.sub.length;
            // var target = '';
            //
            // if (jsonData.chapter[chp - 1].title === '부록') {
            //     target = secData.sub[page - 2].fileName;
            // } else {
            //     for (var i = 0; i < subDataLen; i++) {
            //         if (secData.sub[i].desc === '곡 소개 -' + songName) break;
            //     }
            //     target = secData.sub[i].fileName;
            // }
            // window.open(target, 'showNote');

        } else if ($target.hasClass('showSpeak')) {
            $('#notesDetail_Speak').show();
            $('#notesDetail_Music').hide();
            $('#noteInfo').hide();
            $('.mSubBtn').removeClass('on');
            $('.mSubBtn .noteNavSubMenu').removeClass('on');
            $target.addClass("on");
        }
    });
}