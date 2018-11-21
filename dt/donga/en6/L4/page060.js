$(document).ready(function(){
    //Review A번 문제
    var target = "Quiz_A";
    var $quizType = $(".quizType[data-qid="+ target +"]");
    var $checkItem = $quizType.find(".checkItem");
    var $quizMulti = $quizType.find(".quiz_multiple");

    var $quizMarking = $(".quizMarking[data-marking='"+ target +"']")
    var $btnCheck = $(".btnCheck[data-target='"+ target +"']");

    $checkItem.on("click", function() {
        if ($btnCheck.hasClass("on")) return;

        var $this = $(this);
        var $checkWrap = $this.parent();
        var $inputAll = $checkWrap.find(".checkItem");
        var $inputIdx = $inputAll.index($this);
        
        $inputAll.removeClass("on");
        $inputAll.prop("checked", false);

        for(var i = 0; i < $inputIdx + 1; i++){
            $($inputAll[i]).addClass("on");
            $($inputAll[i]).prop("checked", true);
        }
    });

    $btnCheck.on("click", function() {
        var efCheck = true;
        var mark = "correct";
        var i = 0;

        $quizMulti.each(function() {
            var $this = $(this);
            var $chkItem = $this.find(".checkItem");
            var $chkItemOn = $this.find(".checkItem.on");
            var $answer = $this.next().text();

            if ($chkItemOn.length !== parseInt($answer)) {
                if ($chkItemOn.length > parseInt($answer)){
                    $chkItemOn.removeClass("on");

                    $chkItem.each(function(i) {
                        if (i < parseInt($answer)){
                            $(this).addClass("answer");
                        }
                    });
                } else {
                    $chkItem.each(function(i) {
                        if (i < parseInt($answer) && !$(this).hasClass("on")){
                            $(this).addClass("answer");
                        }
                    });
                }
                efCheck = false;
                mark = "wrong";
            }
        });

        playFeedSound(efCheck);
        $quizMarking.addClass(mark);
    });
});

function playFeedSound(efCheck) {
    var clickAudio;

    if (efCheck) clickAudio = document.getElementsByClassName('feedOk')[0];
    else clickAudio = document.getElementsByClassName('feedNo')[0];

    if(!clickAudio.ended) {
        clickAudio.currentTime = 0;
     }
     clickAudio.play();
}