$(document).ready(function(){
    // page js ↓
	// B번 : 오답 동그라미 지우기
	// var targetB = "Quiz_B";
	// var $assessmentItemB = $(".quizType[data-qid='"+ targetB +"']");
	// var $btnCheckB = $(".btnCheck[data-target='"+ targetB +"']");
	// var $quizMulti = $assessmentItemB.find(".quiz_multiple");
	

	// $btnCheckB.on("click", function() {
	// 	$quizMulti.each(function() {
	// 		var chkItem = $(this).find(".checkItem");

	// 		if (chkItem.hasClass("answer")) chkItem.removeClass("on");
	// 	});	
	// });

	// C번 : 주관식 개별 정답 체크 기능 (대문자 -> 소문자)
	var targetC = "Quiz_C";
	var $assessmentItemC = $(".quizType[data-qid='"+ targetC +"']");
	var $btnCheckC = $(".btnCheck[data-target='"+ targetC +"']");
	var $essayWriteC = $assessmentItemC.find(".essayWrite");
	var eventSwap, clickEvent;

	$btnCheckC.on("click", function() {
		$essayWriteC.each(function() {
			this.value = this.value.toLowerCase();
		});
	});

	$btnCheckC.each(function() {
		clickEvent = $._data(this, "events").click;

		eventSwap = clickEvent[0];
		clickEvent[0] = clickEvent[1];
		clickEvent[1] = eventSwap;
	});
});