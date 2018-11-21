$(document).ready(function(){
	// page js ↓
	// Read and Do
	var ui = dev.ui;
	var qid = "Quiz_A";
	var $assessmentItem = $(".quizType[data-qid='"+ qid +"']");
	var $btnCheck = $(".btnCheck[data-target='"+ qid +"']");
	var $btnReplay = $(".btnReplay[data-target='"+ qid +"']");
	var $lines = $(".line_box > li");
	
	var $checkItem = $assessmentItem.find(".checkItem");
	var $checkPoint = $assessmentItem.find(".checkPoint");
	
	$checkPoint.each(function() {
		$(this).css("pointer-events", "none");
		$(this).prop("disabled", true);
	});
	
	$checkItem.on("click", function(){
		if ($checkPoint.prop("disabled")) ui.initFeedMsg("quiz", qid, false);
	});
	
	$(".ex_box").find("li").on("click", function() {
		var idx = $(this).index();

		$lines.css("z-index", 0);
		$lines.eq(idx).addClass("show").css("z-index", 1);

		$checkPoint.css("pointer-events", "");
		$checkPoint.prop("disabled", false);
	});
	
	$btnCheck.on("click", function() {
		$lines.addClass("show");
	});
	
	$btnReplay.on("click", function() {
		$lines.removeClass("show");
		
		$checkPoint.css("pointer-events", "none");
		$checkPoint.prop("disabled", true);
	});
});