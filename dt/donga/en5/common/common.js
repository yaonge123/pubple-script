$(document).ready(function() {
    /* 임시 얼랏창 */
    $(".btnPage").click(function () {
        alert("교과서 페이지 이동 기능은 통권 적용 예정입니다.");
    });

    /* 정답 확인 전 음성 재생 비활성화 */
    $(".quizSoundCheck").each(function() {
        var $this = $(this);
        //var $input = $this.find("input");

        //$input.prop("disabled", true);
        $this.find(".mp_text").each(function() {
            var $mpText = $(this);
            var randomId = Math.random().toString(36).substr(2, 9);

            // 예외 요소
            if ($mpText.hasClass("onSound")) return;

            if ($mpText.find("input").length) {
                $mpText.addClass("neutralize");
                $mpText.css("cursor", "default");
            }
            this.id = randomId;
        });
    });

    /* 해석 보기 버튼 */
    $(".btnTran").on("click", function() {
        var $btn = $(this);
        var targetId = $btn.data("target");

        if (targetId){
            var $tKor = $("#" + targetId).find(".tKor");

            $btn.toggleClass("on");
            $tKor.toggleClass("on");
        } else if ($btn.parent().hasClass("word_box")) {
            var $word = $btn.parent().find(".word_d");

            $btn.toggleClass("on");
            $word.toggleClass("show");
        }
    });

    /* 코너명들 모션 */
    $(".sco").each(function () {
        var _sco = $(this).data("sco");
        var _width = $(this).width();
        $(this).parent().find(".row").css("margin-left", _width);
        var _txt = "<span class='sco_copy' data-sco='" + _sco + "'>" + $(this).html() + "</span>"
        $(this).css("opacity", "0");
        $(this).before(_txt);

        $(".sco").on("click", function () {
            var _target = $(this).prev()
            _target.addClass("animated bounceIn");
            setTimeout(function () {
                _target.removeClass("animated bounceIn");
            }, 1000);
        });
    });

    /* 챕터명 모션 */
    $(".header .chapter").on("click", function () {
        var _target = $(this);
        if (_target.hasClass("mp_text")) {
            _target.removeClass("pageInMotion");
            _target.addClass("animated tada");
            setTimeout(function () {
                _target.removeClass("animated tada");
            }, 1000);
        }
    });

    /* 낱말 퀴즈 - 드랍 박스 내부 텍스트 음성 재생 */
    $("#pop_quiz_01").find(".dropBox").on("click", function() {
        var $dragBox = $(this).find(".dragBox");
        var mpTextId, mpAudio;
        
        $("#pop_quiz_01").find(".dropBox .dragBox").removeClass("colorOn");

        if ($dragBox.length) {
            mpTextId = "#" + $dragBox.data("mpid");
            $(mpTextId).click();
            $dragBox.addClass("colorOn");
            mpAudio = $(mpTextId).find("audio")[0];
            
            if (!mpAudio) return;
            mpAudio.onended = function() {
                $dragBox.removeClass("colorOn");
            }

            mpAudio.onpause = function () {
                $dragBox.removeClass("colorOn");
            }
        }
    });

    /* 단어 게임 아이콘 선택시 */
    $(".btnGame").on("click", function() {
        resetAllMediaPlayer();
    });

    /* Think and Talk 말풍선, 따라말하기 */
    if (!$(".animate_bubble").length) return;

    var tClassList = $(".animate_bubble")[0].className;
    var target = tClassList.slice(tClassList.indexOf("animateBubble"));
    var $bubleWrap = $("." + target);
    var $audio = $("<audio id='audio_" + target + "'></audio>");
    var $source = $("<source>");
    var $btnFollow = $(".btnFollow[data-target='" + target + "']");
    var $btnBubble = $(".btnAudioBubble");
    var $xy6 = $(".btnAudioBubble.bg");
    var $hideImgBox = $(".hideImgBox");
    var $bubbleTxtAll = $(".bubble_txt");
    var $resImg = $(".resImg");
    var bubbleIdx = 0;
    var characterOn = false;
    var isPlaying = false;
    var audio = $audio[0];
    var makeProgress, bubbleTimeout;
    var dialLen;
    var focusOrder, responseArr;

    $audio.append($source);
    $bubleWrap.parent().append($audio);

    // 버블 시작 버튼 선택
    $btnBubble.on("click", function(e) {
        var $this = $(this);
        var isToon = $this.hasClass("charter");
        var $focusImg, $btnShow, target, textArr, mediaArr, changeLen, i;
        var text;
        
        $(".fix_bubble").addClass("blind");
        dialLen = $this.data("dialogue");

        if (isToon) {
            $focusImg = $this.find(".hideImgBox");
            $btnShow = $this.find(".btnShow");
            target = $btnShow.data("target");
            textArr = $btnShow.data("text").split("\/\/");
            mediaArr = $btnShow.data("media").split("\/\/");
            changeLen = mediaArr.length;
            focusOrder = Number($btnShow.data("focus-order"));
            if ($btnShow.data("res")) responseArr = $btnShow.data("res").split(",");
        }

        e.stopPropagation();

        // 오디오 플레이 중 다른 캐릭 선택 못함, 플레이 중인 캐릭 다시 선택시 재생 정지
        if (isPlaying) {
            if (isToon) $focusImg.removeClass("show");
            if ($this.hasClass("on")) {
                stopBubble();
            }
            return;
        }

        // 포커스
        if (!$this.hasClass("on")) {
            $(".btnAudioBubble").removeClass("on");
        }
        $this.addClass("on");
        characterOn = true;
        
        // 데이터 및 스타일 설정
        if (isToon) {
            $(".hideImgBox").removeClass("show");
            $focusImg.addClass("show");

            for (i = 0; i < changeLen; i++) {
                if (textArr[i]) {
                    if (textArr[i].indexOf("\/n") !== -1) {
                        text = textArr[i].split(".");
                        
                        $("#rusultTxt_0" + (i + 1)).html(text[0]+ ".<br/>" + text[1].replace("\/n", "") + ".");
                    } else {
                        $("#rusultTxt_0" + (i + 1)).text(textArr[i]);
                    }
                }
                
                $("#rusultMp3_0" + (i + 1)).data("media", mediaArr[i]);
                $bubleWrap.attr("data-layout", target);
            }
        }
        
        // 재생
        if ($btnBubble.length && !characterOn || isPlaying) return;

        $bubbleTxtAll.css("visibility", "visible");
        playBubble();
    });

    // 따라 말하기 버튼
    $btnFollow.on("click", function() {
        if (isPlaying) {
            $(".hideImgBox").removeClass("show");
            stopBubble();
        };
        $(this).toggleClass("on");
    });

    // 팝업 열릴 때 초기화 처리
    $(".popUp").on("click", function() {
        $bubleWrap.find(".bubble_box").removeClass("show");
        $btnBubble.removeClass("on");
        $btnFollow.removeClass("on");
        isPlaying = false;
        bubbleIdx = 0;
                
        $xy6.addClass("bg");
        $hideImgBox.removeClass("show");
        if ($(".animate_bubble").length && $btnFollow.length) {
            stopBubble();
        }
    });

    function playBubble() {
        var $bubbleBoxes = $bubleWrap.find(".bubble_box");
        var $bubbleBox = $bubbleBoxes.eq(bubbleIdx);
        var bubbleLen = bubbleLen ? dialLen : $bubbleBoxes.length;
        var media = $bubbleBox.data("media");
        var hasTail = $bubbleBox.hasClass("tail");
        var bubbleBoxW, afterLeft, originX;
        
        if (hasTail) {
            bubbleBoxW = $bubbleBox.outerWidth();
            afterLeft = parseInt(window.getComputedStyle($bubbleBox[0], ':after').getPropertyValue('left'));
            originX = bubbleBoxW - afterLeft;
            // console.log('originX', originX, 'originY ', $bubbleBox.outerHeight());
            $bubbleBox.css("transform-origin", originX + " " + $bubbleBox.outerHeight());
        }

        $bubbleBox.addClass("show");

        if (responseArr && focusOrder === bubbleIdx) {
            responseArr.forEach(function(val) {
                $resImg.eq(val).addClass("show");
            });
        }

        $source[0].src = "media/audio/" + media + ".mp3";
        $source[0].type = "audio/mpeg";
        audio.load();
        audio.play();
        isPlaying = true;

        // 재싱 완료시
        audio.onended = function() {
            var delay = 0;
            var $progressBox = $bubbleBox.find(".progress_box");
            var $bubbleTxt = $bubbleBox.find(".bubble_txt");
            var $progress = $progressBox.children();
            var oldDate, curProgress, curTimeout;

            if (bubbleIdx < bubbleLen) {
                // 따라 말하기
                if ($btnFollow.hasClass("on")) {
                    delay =  this.duration * 1000 * 1.5;
                    // 프로그래스 바
                    $progressBox.addClass("show");
                    $bubbleTxt.css("visibility", "hidden");

                    oldDate = Date.now();
                    curProgress = setInterval(function() {
                        $progress.css("width", (Date.now() - oldDate) / delay * 100 + "%");
                    }, 10);
                    makeProgress =curProgress;
                }

                curTimeout = setTimeout(function() {
                    $bubbleBox.removeClass("show");
                    if ((!dialLen && bubbleIdx !== bubbleLen - 1) || (dialLen && bubbleIdx < dialLen - 1)) {
                        bubbleIdx++;
                        this.currentTime = 0;
                        playBubble();
                    } else {
                        $xy6.addClass("bg");
                        $(".hide_img.show").removeClass("show");
                        $(".btnAudioBubble.on").removeClass("on");
                        bubbleIdx = 0;
                        isPlaying = false;
                        $resImg.removeClass("show");
                    }

                    clearInterval(curProgress);
                    $progressBox.removeClass("show");
                    $progress.css("width", 0);
                }, delay);
                bubbleTimeout = curTimeout;

                // 디폴트 말풍선 대화 끝나면 다시 보여주기
                if (bubbleIdx === bubbleLen - 1) $(".fix_bubble").removeClass("blind");
            }
        };
    }

    function stopBubble() {
        isPlaying = false;
        bubbleIdx = 0;
        audio.pause();
        if (!isNaN(audio.duration)) {
            audio.currentTime = 0;
        }
        clearTimeout(bubbleTimeout);
        if (makeProgress) clearInterval(makeProgress);
        $bubleWrap.find(".bubble_box").removeClass("show");
        $bubleWrap.find(".bubble_txt").css("visibility", "visible");
        $btnBubble.removeClass("on");
        $bubleWrap.find(".progress_box").removeClass("show");
        $bubleWrap.find(".current").css("width", 0);
        $resImg.removeClass("show");
    }
    /* Think and Talk 말풍선, 따라말하기 End */
});