$(document).ready(function(){
	// page js ↓
	// 주관식 개별 정답 체크 기능 (소문자 -> 대문자)
	var target = "Quiz_A";
	var $assessmentItem = $(".quizType[data-qid='"+ target +"']");
	var $btnCheck = $(".btnCheck[data-target='"+ target +"']");
	var $essayWrite = $assessmentItem.find(".essayWrite");
	var eventSwap, clickEvent;

	$btnCheck.on("click", function() {
		$essayWrite.each(function() {
			this.value = this.value.toUpperCase();
		});
	});

	$btnCheck.each(function() {
		clickEvent = $._data(this, "events").click;

		eventSwap = clickEvent[0];
		clickEvent[0] = clickEvent[1];
		clickEvent[1] = eventSwap;
	});

	// 낱말퀴즈 : 사다리타기 + 드래그 앤 드롭
	var target = "Quiz_P_D";
	var $quizType = $(".quizType[data-qid='"+ target +"']");
	var $btnCheck = $(".btnCheck[data-target='"+ target +"']");
	var $btnReplay = $(".btnReplay[data-target='"+ target +"']");

	var dragBox = $quizType.find(".drag_container .dragBox");
	var startBtn = $quizType.find(".draw_lots_btn li");
	var line = $quizType.find(".draw_lots_result li");
	
	// dragBox.each(function() {
	// 	$(this).prop("disabled", true);
	// 	$(this).css("pointer-events", "none");	
	// });
	
	startBtn.on("click", function() {
		var index = $(this).index();
		var lineOn = line.eq(index);
		
		lineOn.addClass("show");

		dragBox.prop("disabled", false);
		dragBox.css("pointer-events", "");
	});

	$btnCheck.on("click", function() {
		line.addClass("show");
	});

	$btnReplay.on("click", function() {
		line.removeClass("show");

		// dragBox.prop("disabled", true);
		// dragBox.css("pointer-events", "none");
	});
});