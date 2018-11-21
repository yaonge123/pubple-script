$(document).ready(function(){
	// page js ↓
	// Read and Do : 주관식 알럿창 띄우기
	var ui = dev.ui;
	var $quizTypeTot = $("[data-qid='Quiz_A_Total']");
	var $essayWrite = $quizTypeTot.find(".essayWrite");
	var $canvasArea = $quizTypeTot.find(".canvasArea");
	var $btnReplay = $(".btnReplay[data-target='Quiz_A2']");
	var $feedMsg = $(".quizType[data-qid='Quiz_A2']").find(".feedMessage");

	$essayWrite.each(function() {
		$(this).prop("disabled", true);
		$(this).css("pointer-events", "none");
	});

	$canvasArea.on("mouseup touchend", function() {
		var dot = $canvasArea.find(".lineStart, .lineEnd");
		
		if (dot.hasClass("done")) {
			$essayWrite.each(function() {
				$(this).prop("disabled", false);
				$(this).css("pointer-events", "");
			});
		}
	});

	$essayWrite.parent().on("click", function() {
		var dot = $canvasArea.find(".lineStart, .lineEnd");

		if (!dot.hasClass("done") && !$btnReplay.hasClass("on")) {
			ui.initFeedMsg("etc", $(".quizType[data-qid='Quiz_A2'] itemBody"));
			$feedMsg.css("z-index", 100);
		}
	});

	$btnReplay.on("click", function() {
		$essayWrite.each(function() {
			$(this).prop("disabled", true);
			$(this).css("pointer-events", "none");
		});
	});
});