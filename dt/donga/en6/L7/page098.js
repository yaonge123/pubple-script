$(document).ready(function(){
	// page js ↓
	// 주관식 개별 정답 체크 기능 (대문자 -> 소문자)
	var target = "Quiz_A";
	var $assessmentItem = $(".quizType[data-qid='"+ target +"']");
	var $btnCheck = $(".btnCheck[data-target='"+ target +"']");
	var $essayWrite = $assessmentItem.find(".essayWrite");
	var eventSwap, clickEvent;

	$btnCheck.on("click", function() {
		$essayWrite.each(function() {
			this.value = this.value.toLowerCase();
		});
	});

	$btnCheck.each(function() {
		clickEvent = $._data(this, "events").click;

		eventSwap = clickEvent[0];
		clickEvent[0] = clickEvent[1];
		clickEvent[1] = eventSwap;
	});
});