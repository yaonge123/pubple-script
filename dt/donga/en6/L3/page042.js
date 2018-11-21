$(document).ready(function(){
	// page js ↓
	// Read and Do
	var ui = dev.ui;
	var target = "Quiz_A";
	var $quizType = $(".quizType[data-qid='"+ target +"']");
	var $btnCheck = $(".btnCheck[data-target='"+ target +"']");
	var $btnReplay = $(".btnReplay[data-target='"+ target +"']");

	var $checkItem = $quizType.find(".checkItem");
	var $checkPoint = $quizType.find(".checkPoint");
	var $ladders = $(".draw_lots_result").find("li");
	var $ladderBtn = $(".draw_lots_btn").find("li");

	$checkPoint.each(function() {
		$(this).css("pointer-events", "none");
		$(this).prop("disabled", true);
	});

	$checkItem.on("click", function() {
		if ($(this).find(".checkPoint").prop("disabled")) ui.initFeedMsg("quiz", "Quiz_A");
	});

	$ladderBtn.on("click", function() {
		var i = $(this).index();

		$ladders.css("z-index", 0);
		$ladders.eq(i).addClass("show").css("z-index", 1);

		$checkPoint.css("pointer-events", "");
		$checkPoint.prop("disabled", false);
	});

	$btnCheck.on("click", function() {
		$ladders.addClass("show");

		$ladderBtn.prop("disabled", true);
		$ladderBtn.css("pointer-events", "none");
	});

	$btnReplay.on("click", function() {
		$ladders.removeClass("show");
		$ladderBtn.prop("disabled", false);
		$ladderBtn.css("pointer-events", "");

		$checkPoint.prop("disabled", true);
		$checkPoint.css("pointer-events", "none");
	});
	//
});