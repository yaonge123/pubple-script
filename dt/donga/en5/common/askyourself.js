$(document).ready(function(){
    // page js ↓
    // 스스로 해봐요
    var $askStart = $(".ask_start");
    var $askTest = $(".ask_test");
    var $askEnd = $(".ask_end"); 
    var $btnPopup = $(".btn_ask_go");
    var $btnClose = $(".btnPopupClose");
    var $askQuizAll = $(".ask_quiz");

    var $btnCheck = $askTest.find(".btnCheck");
    var $btnReplay = $askTest.find(".btnReplay");
    var $btnNextQuiz = $askTest.find(".btnNextQuiz");
    var $btnAudio = $askTest.find(".btnAudio");

    var $checkItem = $askTest.find(".checkItem");
    var $quizMark = $askTest.find(".quizMarking");
    var $input = $askTest.find(".essayWrite");
    var $essayAns = $askTest.find(".answerCorrect");
    
    var $btnStart = $askStart.find(".levelBtn");
    var $btnTest = $askTest.find(".levelBtn");
    var $btnLevel = $askEnd.find(".levelBtn");
    var $btnRe = $askEnd.find(".levelReplay");

    var $checkQuizLine = $askTest.find(".checkQuizLine");
    var $chkDragAns = $askTest.find(".chkDragAns");
    var icon = $(".icon_check"); // 스스로 해봐요 학습확인 체크박스

    var regExp = /[\,\"]/gi;
    var apExp = /[\'\’]/gi;

    // 스스로 해봐요 학습확인 체크
    $btnPopup.on("click", function() {
        icon.addClass("on");
    });

    //선긋기 문제 있는 경우
    if ($askTest.find(".canvasArea")) {
        var $canvasArea = $askTest.find(".canvasArea");

        var $lineStart = $canvasArea.find(".lineStart");
        var $lineEnd = $canvasArea.find(".lineEnd");

        $askTest.css("display", "inline-block");
        $askQuizAll.css("display", "inline-block");
        
        $canvasArea.attr("width", $canvasArea.width());
        $canvasArea.attr("height", $canvasArea.height());

        $lineStart.add($lineEnd).each(function(i, ele){
            $(ele).attr("width", ele.clientWidth);
            $(ele).attr("height", ele.clientHeight);
            $(ele).attr("top", ele.offsetTop);
            $(ele).attr("left", ele.offsetLeft);
        });
        
        $askTest.css("display", "");
        $askQuizAll.css("display", "");
    }

    //공통 버튼 기능
    $btnStart
    .add($btnLevel)
    .add($btnRe)
    .add($btnPopup)
    .on("click", function(){
        var $this = $(this);
        var level = $this.data("level");

        $askStart.removeClass("show");
        $askEnd.removeClass("show");
        $askTest.addClass("show");

        if ($checkQuizLine.length) {
            $checkQuizLine.each(function() {
                var $this = $(this);
                var $resetDrawLine = $this.next();
                
                $resetDrawLine.click();
            });
        }

        if ($chkDragAns.length){
            $chkDragAns.each(function() {
                var $this = $(this);
                var $resetDrag = $this.next();
                
                $resetDrag.click();
            });
        }

        if ($btnAudio.length !== 0) {
            $btnAudio.removeClass("played");
            $btnAudio.prop("disabled", false);
            $btnAudio.css("pointer-events","");
        }

        $btnCheck.removeClass("on");
        $btnReplay.removeClass("on");
        $btnNextQuiz.removeClass("on");
        $quizMark.removeClass("correct wrong");

        $checkItem.removeClass("on answer");
        $essayAns.removeClass("show");
        $input.val("");
        $input.css("pointer-events", "");
        $input.prop("disabled", false);
        
        $btnTest.removeClass("on");
        $btnTest.each(function(i) {
            var $btn = $($btnTest[i]);

            if ($btn.data("level") === level){
                $btn.addClass("on");
                return false;
            }
        });
        
        $askQuizAll.removeClass("show");
        $askQuizAll.each(function(i) {
            var $askQuiz = $($askQuizAll[i]);

            if ($askQuiz.data("level") === level){
                $askQuiz.addClass("show");
                return false;
            }
        });
    });

    //문제 난이도 버튼 (다 풀지 않았을 때)
    $btnTest.on("click", function() {
        var $this = $(this);
        var level = $this.data("level");

        resetAllMediaPlayer();

        $btnTest.removeClass("on");
        $this.addClass("on");

        if ($checkQuizLine.length) {
            $checkQuizLine.each(function() {
                var $this = $(this);
                var $resetDrawLine = $this.next();
                
                $resetDrawLine.click();
            });
        }
        
        if ($chkDragAns.length){
            $chkDragAns.each(function() {
                var $this = $(this);
                var $resetDrag = $this.next();
                
                $resetDrag.click();
            });
        }

        if ($btnAudio.length !== 0) {
            $btnAudio.removeClass("played");
            $btnAudio.prop("disabled", false);
            $btnAudio.css("pointer-events","");
        }
        $btnCheck.removeClass("on");
        $btnReplay.removeClass("on");
        $btnNextQuiz.removeClass("on");
        
        $checkItem.removeClass("on answer");
        $quizMark.removeClass("correct wrong");
        $essayAns.removeClass("show");
        $input.val("");
        
        $askQuizAll.removeClass("show");
        $askQuizAll.each(function(i) {
            $askQuiz = $($askQuizAll[i]);

            if ($askQuiz.data("level") === level){
                $askQuiz.addClass("show");
                return false;
            }
        });
    });

    //문제 난이도 버튼 (다 풀었을 때)
    $btnLevel.add($btnRe).on("click", function() {
        var $this = $(this);
        var level = $this.data("level");

        $btnLevel.removeClass("show");
        $btnRe.removeClass("show");

        $askQuizAll.each(function(i) {
            $askQuiz = $($askQuizAll[i]);

            if ($askQuiz.data("level") === level){
                $askQuiz.addClass("show");
                return false;
            }
        });
    });

    //팝업창 닫았을 때
    $btnClose.add($btnPopup).on("click", function() {
        $askStart.addClass("show");
        $askTest.removeClass("show");
        $askEnd.removeClass("show");
    });

    // 정답 확인 버튼 클릭 시
    $btnCheck.on("click", function(e) {
        var $this = $(this);
        var target = $this.data("target");
        var $parent = $this.parents(".ask_quiz");
        var $currBtnNext = $parent.find(".btnNextQuiz");
        var $quizMarking = $parent.find(".quizMarking");

        var $chkItem = $parent.find(".checkItem");
        var $quizType = $parent.find(".quizType");
        var questionType = $quizType.data("question-type");

        var $currBtnAudio = $parent.find(".btnAudio[data-target='"+ target +"']");
        
        resetAllMediaPlayer();

        $currBtnNext.addClass("on");
        if ($currBtnAudio.length) {
            $currBtnAudio.prop("disabled", true);
            $currBtnAudio.css("pointer-events","none"); // IE 11 이상, Chrome
        }

        // 객관식
        if (questionType === "choiceQuiz") {
            if ($chkItem.hasClass("answer")) $quizMarking.addClass("wrong");
            else $quizMarking.addClass("correct");
        } else if (questionType === "essayQuiz") { // 주관식
            var $currInp = $parent.find(".essayWrite");

            $currInp.each(function() {
                var $this = $(this);
                var essay = $this.val().trim().replace(regExp, "").replace(apExp, "'");
                var essayAns = $this.next(".answerCorrect").text().trim().replace(regExp, "").replace(apExp, "'");
    
                if (essay !== essayAns){
                    $quizMarking.addClass("wrong");
                    return;
                }
            });
    
            $quizMarking.addClass("correct");
        } else { //기타
            var $dropBox = $quizType.find(".drop_container .dropBox");

            if ($dropBox.length) {
                $dropBox.each(function() {
                    var $this = $(this);
                    if ($this.attr("iscorrect") === "false"){
                        $quizMarking.addClass("wrong");
                        return;
                    }
                });
    
                $quizMarking.addClass("correct");
            }

        }
    });

    // 다시풀기 버튼을 클릭 시
    $btnReplay.on("click", function() {
        var $this = $(this);
        var target = $this.data("target");
        var $parent = $this.parents(".ask_quiz");

        var $currBtnNext = $parent.find(".btnNextQuiz");
        var $quizMarking = $parent.find(".quizMarking");

        var $currbtnAudio = $parent.find(".btnAudio[data-target='"+ target +"']");

        if ($currbtnAudio.length) {
            $currbtnAudio.prop("disabled", false);
            $currbtnAudio.css("pointer-events",""); // IE 11 이상, Chrome
        }

        $currBtnNext.removeClass("on");
        $quizMarking.removeClass("correct wrong");
    });

    //다음 페이지 버튼 클릭 시
    $btnNextQuiz.on("click", function() {
        var $this = $(this);
        var $parent = $this.parents(".ask_quiz");
        var $nextLi = $this.parents(".ask_quiz_page > li").next();
        var level = $parent.data("level");

        resetAllMediaPlayer();

        if (!$nextLi.length) {
            $askTest.removeClass("show");
            $askEnd.addClass("show");
            $askQuizAll.removeClass("ok");

            $btnLevel.add($btnRe).removeClass("show");
            $btnLevel.filter(function (i){
                if ($(this).data("level") === level) $($btnRe[i]).addClass("show");
                else $(this).addClass("show");
            });
            return;
        }

        $askQuizAll.each(function(i) {
            $askQuiz = $($askQuizAll[i]);

            if (!$askQuiz.hasClass("show") && $askQuiz.data("level") === level){
                $parent.removeClass("show");
                $askQuiz.addClass("show");
                if ($askQuiz.find(".scrollContent")) {
                    $askQuiz.find(".scroll_draggerBar").css("visibility", "visible");
                    $askQuiz.find(".scroll_draggerRail").css("visibility", "visible");
                }
                return false;
            }
        });
    });
});