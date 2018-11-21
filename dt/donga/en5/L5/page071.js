$(document).ready(function(){
    // page js
    // Write B번 : 알럿창 띄위기
	var ui = dev.ui;
	//var util = dev.util;
	var qid = "Quiz_B_Total";
	var $assessmentItem = $(".active_area.n2[data-qid='"+ qid +"']");
	var $btnReplay = $(".btnReplay[data-target='"+ qid +"']");

	var $essayWrite = $assessmentItem.find(".essayWrite");
	var $inputWrap = $assessmentItem.find(".input_wrap");
    var $checkPoint = $assessmentItem.find(".checkPoint");

	// if (util.isTouchDevice) {
    //     delayTime = 500;
    // } else {
    //     delayTime = 2200;
	// }
	
	setTimeout(function() {
		if (!$essayWrite.val()) {
			$essayWrite.prop("disabled", true);
			$essayWrite.css("pointer-events", "none");
		}
	}, 1500);

	$inputWrap.on("click", function(){
		if ($essayWrite.prop("disabled") && !$btnReplay.hasClass("on")) {
            ui.initFeedMsg("quiz", $(this).parents(".quizType").data("qid"));
        }
    });

    $checkPoint.on("click", function() {
        $essayWrite.css("pointer-events", "");
        $essayWrite.prop("disabled", false);
    });

	$btnReplay.on("click", function() {
		$essayWrite.css("pointer-events", "none");
		$essayWrite.prop("disabled", true);
	});
});
