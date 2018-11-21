$(document).ready(function(){
    // page js
    // Review B번 : 정답 확인
    var qid = "Quiz_B";
    var $quizTypeB = $(".quizType[data-qid='"+ qid +"']");
    var $btnCheckB = $(".btnCheck[data-target='"+ qid +"']");
    var $essayWrite = $quizTypeB.find(".essayWrite");

    $btnCheckB.on("click", function() {
        var essay = $essayWrite.val();
        
        $essayWrite.val(essay.replace(/\s/gi,"").replace(/\,/gi, ", "));
    });

    $btnCheckB.each(function() {
		clickEvent = $._data(this, "events").click;

		eventSwap = clickEvent[0];
		clickEvent[0] = clickEvent[1];
		clickEvent[1] = eventSwap;
    });
    
    // Review C번 : 선택한 문장에 밑줄 긋기 & 정답 확인
    var target = "Quiz_C1";
    var $quizType = $(".quizType[data-qid='"+ target +"']");
    var $btnCheck = $(".btnCheck[data-target='"+ target +"']");
    var $btnReplay = $(".btnReplay[data-target='"+ target +"']");
    
    var clickLine = $quizType.find(".clickLine");
    var quizCheck = $quizType.find(".quizCheck");
    var ansCorrect = $quizType.find(".answerCorrect").text();

    clickLine.on("click", function() { 
        if ($(this).hasClass("disabled")) return;
        $(this).toggleClass("on"); 
    });

    $btnCheck.on("click", function() {
        var check = true;
        var onClickLine = $(".clickLine.on");

        clickLine.addClass("disabled");
        if (!onClickLine.length) check = false;

        onClickLine.each(function() {
            var line = $(this);
            var idx = clickLine.index(line);
            
            if (idx !== ansCorrect - 1) {
                line.removeClass("on");
                check = false;
            } else {
                line.addClass("correct");
            }
        });

        $(".clickLine").each(function(idx, ele) {
            if (idx === 3) {
                if (!$(ele).hasClass("on")) $(ele).addClass("wrong");
            }
        });

        quizCheck.text(check);
    });

    $btnReplay.on("click", function() {
        clickLine.removeClass("on disabled correct wrong")
    });
});