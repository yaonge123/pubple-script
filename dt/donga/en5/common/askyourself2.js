$(document).ready(function(){
    // page js ↓
    // 마무리 해봐요
    var $askStart = $(".ask_start");
    var $askTest = $(".ask_test");
    var $askEnd = $(".ask_end"); 
    var $btnPopup = $(".mygoalBtn");
    var $btnClose = $(".btnPopupClose");
    var $askQuizAll = $(".ask_quiz");
    var $askQuizLi = $(".ask_quiz_page > li");

    var $btnCheck = $askTest.find(".btnCheck");
    var $btnReplay = $askTest.find(".btnReplay");
    var $btnEndQuiz = $askTest.find(".btnEndQuiz");
    var $btnNextQuiz = $askTest.find(".btnNextQuiz");
    var $btnAudio = $askTest.find(".btnAudio");

    var $checkItem = $askTest.find(".checkItem");
    var $inputWrap = $askTest.find(".input_wrap");
    var $dragBox = $askTest.find(".dragBox");
    var $dropBox = $askTest.find(".dropBox");

    var $btnStart = $askStart.find(".levelBtn");
    var $btnTest = $askTest.find(".levelBtn");
    var $btnLevel = $askEnd.find(".levelBtn");
    var $btnRe = $askEnd.find(".levelReplay");

    var $endQuiz = $askEnd.find(".sep").not(".score");
    var $score = $askEnd.find(".sep.score");
    var $endQuizMarking = $askEnd.find(".quizMarking");

    //공통 버튼 기능
    $btnStart
    .add($btnLevel)
    .add($btnRe)
    .add($btnPopup)
    .on("click", function(){
        var $this = $(this);
        var level = $this.data("level");

        $btnCheck.removeClass("show");
        $askQuizAll.each(function (){
            var $askQuiz = $(this);
            var $btnRe = $askQuiz.find(".btnReplay");

            if ($btnRe.hasClass("allReplay")) {
                $btnRe = $askQuiz.find(".btnReplay.allReplay");
                $btnRe.click();
            }
            else $btnRe.click();
        });
        $askStart.removeClass("show");
        $askEnd.removeClass("show");
        $askTest.addClass("show");

        $btnNextQuiz.removeClass("blind");
        $btnEndQuiz.addClass("blind").removeClass("on show");
        $askQuizLi.last().find(".btnEndQuiz").addClass("show").removeClass("blind");
        $endQuizMarking.removeClass("correct wrong");

        $checkItem.add($inputWrap).css("pointer-events", "");
        $checkItem.add($inputWrap).css("disabled", false);

        if ($btnAudio.length !== 0) {
            $btnAudio.removeClass("played");
            $btnAudio.prop("disabled", false);
            $btnAudio.css("pointer-events","");
        }

        $btnTest.removeClass("on");
        $btnTest.each(function(i) {
            var $btn = $($btnTest[i]);

            if ($btn.data("level") === level){
                $btn.addClass("on");
                return false;
            }
        });
        
        $askQuizAll.removeClass("show done");
        $askQuizAll.each(function() {
            var $askQuiz = $(this);

            if ($askQuiz.data("level") === level){
                $askQuiz.addClass("show");
                return false;
            }
        });

        // 드래그 초기화
        $dragBox.removeClass("blind disabled");
        $dragBox.each(function() {
            var $this = $(this);
            $this.css({
                "top": $this.data("top"),
                "left": $this.data("left")
            });
        })
        $dropBox.find(".ansMsg").removeClass("show");
    });

    //문제 난이도 버튼 (다 풀지 않았을 때)
    $btnTest.on("click", function() {
        var $this = $(this);
        var level = $this.data("level");

        resetAllMediaPlayer();

        $btnTest.removeClass("on");
        $this.addClass("on");
        $askQuizAll.each(function() {
            var $askQuiz = $(this);
            var $btnRe = $askQuiz.find(".btnReplay");
            
            if ($btnRe.hasClass("allReplay")) {
                $btnRe = $askQuiz.find(".btnReplay.allReplay");
                $btnRe.click();
            }
            else $btnRe.click();
        });
        $askQuizAll.removeClass("show done");
        $endQuizMarking.removeClass("correct wrong");

        $askQuizAll.each(function(i) {
            $askQuiz = $($askQuizAll[i]);

            if ($askQuiz.data("level") === level){
                $askQuiz.addClass("show");
                return false;
            }
        });

        $btnEndQuiz.addClass("blind").removeClass("on show");
        $btnNextQuiz.removeClass("blind");
        $askQuizLi.last().find(".btnEndQuiz").addClass("show").removeClass("blind");

        $checkItem.add($inputWrap).css("pointer-events", "");
        $checkItem.add($inputWrap).css("disabled", false);

        $dragBox.removeClass("blind");
    });

    //문제 난이도 버튼 (다 풀었을 때)
    $btnLevel.add($btnRe).on("click", function() {
        var $this = $(this);
        var level = $this.data("level");

        $btnLevel.removeClass("show");
        $btnRe.removeClass("show");

        $askQuizAll.removeClass("done");
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

    //다음 페이지 버튼 클릭 시
    $btnNextQuiz.on("click", function() {
        var $this = $(this);
        var $parent = $this.parents(".ask_quiz");
        var $btnChk = $parent.find(".btnCheck");
        var level = $parent.data("level");

        $parent.addClass("done");
        resetAllMediaPlayer();
        
        if ($btnChk.hasClass("allCheck")) {
            $btnChk = $parent.find(".btnCheck.allCheck");
            $btnChk.click();
        }
        else $btnChk.click();

        $askQuizAll.each(function(i) {
            $askQuiz = $($askQuizAll[i]);
    
            if (!$askQuiz.hasClass("done") && $askQuiz.data("level") === level){
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

    //전체 정답 확인 버튼 클릭 시
    $btnEndQuiz.on("click", function() {
        var $this = $(this);
        var $parent = $this.parents(".ask_quiz");

        resetAllMediaPlayer();

        if ($parent.hasClass("done")){
            $parent.removeClass("show");
            $askTest.removeClass("show");
            $askEnd.addClass("show");
        } else {
            $this.addClass("on");
            $askTest.removeClass("show");
            $parent.addClass("done").removeClass("show");
            $askEnd.addClass("show");
            
            var $btnChk = $parent.find(".btnCheck");
            var level = $parent.data("level");
            var $askQuizDone = $(".ask_quiz.done");
            var scoreArr = [];
            
            if ($btnChk.hasClass("allCheck")) {
                $btnChk = $parent.find(".btnCheck.allCheck");
                $btnChk.click();
            }
            else $btnChk.click();

            $btnNextQuiz.addClass("blind");
            $btnEndQuiz.removeClass("blind").addClass("show");

            $checkItem.add($inputWrap).css("pointer-events", "none");
            $checkItem.add($inputWrap).css("disabled", true);
            $dragBox.addClass("disabled");

            $askQuizDone.each(function() {
                var $askQuiz = $(this);
                var $allMarking = $askQuiz.find(".quizMarking");

                if ($allMarking.hasClass("correct")) scoreArr.push("correct");
                else scoreArr.push("wrong");
            });
            
            $score.each(function(i) {
                var $this = $(this);
                var $quizMarking = $this.find(".quizMarking");
    
                if (scoreArr[i] === "correct") $quizMarking.addClass("correct");
                else $quizMarking.addClass("wrong");
            });
    
            $btnLevel.add($btnRe).removeClass("show");
            $btnLevel.filter(function (i){
                if ($(this).data("level") === level) $($btnRe[i]).addClass("show");
                else $(this).addClass("show");
            });
        }
    });

    //채점표 문제 클릭 시
    $endQuiz.add($score).on("click", function() {
        var $this = $(this);
        var $askQuizDone = $(".ask_quiz.done");
        
        if ($this.hasClass("score")) var index = $score.index($this);
        else var index = $endQuiz.index($this);

        $btnNextQuiz.addClass("blind");
        $askTest.addClass("show");
        $askEnd.removeClass("show");
        $askQuizAll.removeClass("show");
    
        $btnAudio.css("pointer-events", "auto");
        $askQuizDone.each(function(quizIdx) {
            var $askQuiz = $(this);
            
            if (quizIdx === index) {
                $askQuiz.addClass("show");
                if ($askQuiz.find(".scrollContent")) {
                    $askQuiz.find(".scroll_draggerBar").css("visibility", "visible");
                    $askQuiz.find(".scroll_draggerRail").css("visibility", "visible");
                }
            }
        });
    });
});