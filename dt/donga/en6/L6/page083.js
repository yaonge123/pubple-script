$(document).ready(function(){
    var ui = dev.ui;
    var target = "Quiz_A";
    var $btnReplay = $(".btnReplay[data-target='"+ target +"']");
    var $quizType = $(".quizType[data-qid='"+ target +"']");

    var $inputWrap = $quizType.find(".input_wrap");
    var $essayWrite = $quizType.find(".essayWrite");

    var $imgBox = $(".img_box");

    $essayWrite.each(function() {
        $(this).prop("disabled", true);
        $(this).css("pointer-events", "none");
    });

    $imgBox.on("click", function() {
        var $this = $(this);

        $this.next().addClass("show");
        $essayWrite.each(function(i) {
            $(this).prop("disabled", false);
            $(this).css("pointer-events", "");
        });
    });

    $btnReplay.on("click", function() {
        $imgBox.next().removeClass("show");
        
        $essayWrite.each(function() {
            $(this).prop("disabled", true);
            $(this).css("pointer-events", "none");
        });
    });

    $inputWrap.on("click", function() {
        if ($essayWrite.prop("disabled") && !$btnReplay.hasClass("on")) {
            ui.initFeedMsg("quiz", "Quiz_A", true);
        }
    }); 
});
