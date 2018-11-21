$(document).ready(function(){
	// Check Together
	// Read and Check : 답에서 공백 제거
	var target = "Quiz_Z";
	var $quizType = $(".quizType[data-qid='"+ target +"']");
	var $btnCheck = $(".btnCheck[data-target='"+ target +"']");
	var $btnReplay = $(".btnReplay[data-target='"+ target +"']");
	var $quizMark = $(".quizMarking[data-marking='"+ target +"']");

	var $essayWrite = $quizType.find(".essayWrite");
	var $essayAnswer = $quizType.find(".answerCorrect");
	var ansVal;

	$btnCheck.off();
	$btnCheck.on("click", function() {
		if ($(this).hasClass("on")) return;
		var isCorrect = true;
		var allAnsStr = "", allUserVal = "";

		$essayWrite.each(function(i) {
			var essay = $(this).val();
			var essayAns = $(this).next(".answerCorrect").text();

			allAnsStr += essay.replace(/\s/gi, ",");
			allUserVal += essayAns;
			if (i !== $essayWrite.length - 1) {
				allAnsStr += ",";
				allUserVal += ",";
			}

			if (essay.split(",").length === 1) {
				essay = essay.replace(/\s/gi,"");
				ansVal = essayAns.replace(/\s/gi, "").replace(/\,/gi, "");
			} else {
				essay = essay.replace(/\s/gi, "");
				ansVal = essayAns.replace(/\s/gi, "");
			}

			if (essay !== ansVal) isCorrect = false;
		});
		
		playFeedSound(isCorrect);
		if (isCorrect) $quizMark.addClass("correct");
		else $quizMark.addClass("wrong");

		$essayAnswer.addClass("show");
		$(this).add($btnReplay).addClass("on");

		DTCaliperSensor.fire({
			correct: isCorrect, // 정답 여부입력 true, false 중에서 택일
			itemObject: $quizType[0], // 해당 문항 객체
			value: allAnsStr, // 실제 정답 데이터 입력 <correctResponse>에 입력된 값과 동일,
			userValue: allUserVal, // 사용자가 실제로 입력한 값
			description: "", // 문항에 대한 설명
			pageNumber: 156 // 교과서 페이지 번호 값
		});
	});
});

//정오답 효과음 플레이
playFeedSound = function (isCorrect) {
    var clickAudio;

	if (isCorrect) clickAudio = document.getElementsByClassName('feedOk')[0];
    else clickAudio = document.getElementsByClassName('feedNo')[0];

    if(!clickAudio.ended) {
        clickAudio.currentTime = 0;
    }
    clickAudio.play();
}