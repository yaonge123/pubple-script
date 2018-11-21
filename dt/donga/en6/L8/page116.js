$(document).ready(function(){
	// page js ↓ 
	// B번 : 주관식 입력 전 피드백 창 띄우기
	var ui = dev.ui;
	var $quizTot = $("[data-qid='Quiz_B_Total']");
	var $chkItem = $quizTot.find(".checkItem");
	var $checkPoint = $quizTot.find(".checkPoint");
	var $essayWrite = $quizTot.find(".essayWrite");
	var $btnReplay = $(".allReplay[data-target='Quiz_B_Total']");

	setTimeout(function() {
		if (!$essayWrite.val()) {
			$checkPoint.each(function() {
				$(this).prop("disabled", true);
				$(this).css("pointer-events", "none");
			});
		}
	}, 1500);

	$chkItem.on("click", function() {
		var chkPoint = $(this).find(".checkPoint");

		if (chkPoint.prop("disabled") && !$btnReplay.hasClass("on")) ui.initFeedMsg("quiz", "Quiz_B2");
	});

	$essayWrite.keyup(function() {
		$checkPoint.prop("disabled", false);
		$checkPoint.css("pointer-events", "");
	});

	$btnReplay.on("click", function() {
		$checkPoint.prop("disabled", true);
		$checkPoint.css("pointer-events", "none");
	});
});