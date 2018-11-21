$(document).ready(function(){
	// page js ↓
	// Read and Do : 주관식 한글, 영어 채점
	var qid = "Quiz_A";
	var $quizType = $(".quizType[data-qid='"+ qid +"']");
	var $quizMark = $(".quizMarking[data-marking='"+ qid +"']");
	
	var $btnCheck = $(".btnCheck");
	var $btnReplay = $(".btnReplay");

	var $essayWrite = $quizType.find(".essayWrite");
	var $ansCorrect = $quizType.find(".answerCorrect");

	$btnCheck.on("click", function() {
		var essayVal = $essayWrite.val();

		$ansCorrect.addClass("show");
		if (essayVal === "유미" || essayVal === "Yumi") {
			$quizMark.addClass("correct");
			playFeedSound(true);
		} else {
			$quizMark.addClass("wrong");
			playFeedSound(false);
		}
	});

	$btnReplay.on("click", function() {
		$quizMark.removeClass("correct wrong");
		$ansCorrect.removeClass("show");
		$essayWrite.val("");
	});
});

//정오답 효과음 플레이
function playFeedSound (efCheck) {
	var clickAudio;

	if (efCheck) clickAudio = document.getElementsByClassName('feedOk')[0];
	else clickAudio = document.getElementsByClassName('feedNo')[0];

	if(!clickAudio.ended) {
		clickAudio.currentTime = 0;
	}
	clickAudio.play();
}