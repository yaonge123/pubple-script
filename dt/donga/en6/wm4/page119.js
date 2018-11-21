$(document).ready(function(){
	// page js ↓ 
	// B번 : 사용자가 입력한 답 삭제
	var $btnCheck = $(".btnCheck[data-target='Quiz_B2']");
	var $assessmentItem = $(".quizType[data-qid='Quiz_B2']");
	var chkItem = $assessmentItem.find(".checkItem");

	$btnCheck.on("click", function() {
		chkItem.eq(0).addClass("answer");
		chkItem.removeClass("on");
	});
});