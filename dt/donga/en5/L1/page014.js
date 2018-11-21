$(document).ready(function(){
	// page js ↓
	// Read and Do : 미로 찾기
	var target = "Quiz_A";
	var $quizType = $(".quizType[data-qid='"+ target +"']");
	var $btnCheck = $(".btnCheck[data-target='"+ target +"']");
	var $btnReplay = $(".btnReplay[data-target='"+ target +"']");
	var $quizMark = $(".quizMarking[data-marking='"+ target +"']");

	var lineImg = $quizType.find(".line_img .line_pass");
	var startPoint = $quizType.find(".draw_leave .mp_text");
	var endPoint = $quizType.find(".draw_arrival .mp_text");

	var ansArr = ["draw_1_4", "draw_2_3", "draw_3_2", "draw_4_1"];

	startPoint.on("click", function() {
		var $this = $(this);

		startPoint.removeClass("click");
		$this.addClass("click");
	});

	endPoint.on("click", function() {
		if (!startPoint.hasClass("click") || $btnCheck.hasClass("on")) return;

		var endIdx = endPoint.index($(this));
		var startClick = $(".draw_leave .mp_text.click");
		var startIdx = startPoint.index(startClick);
		 
		var line = lineImg.eq(startIdx);
		var drawClass = line.attr("class").split(" ")[1];

		if (drawClass) line.removeClass(drawClass);
		line.addClass("draw_"+ (startIdx + 1) + "_" + (endIdx + 1));

		startPoint.removeClass("click");
	});

	$btnCheck.on("click", function() {
		var isCorrect = true;

		if (!$(this).hasClass("on")) {
			$(this).addClass("on");
			$btnReplay.addClass("on");
			lineImg.each(function(i) {
				var lineClass = this.classList[1];

				if (lineClass) {
					if (lineClass !== ansArr[i]) isCorrect = false;
					this.classList.remove(lineClass);
				} else isCorrect = false;

				this.classList.add("answer");
			});
			
			playFeedSound(isCorrect);
			if (isCorrect) $quizMark.addClass("correct");
			else $quizMark.addClass("wrong");
		}
	});

	$btnReplay.on("click", function() {
		lineImg.removeClass("answer");
		$quizMark.removeClass("correct wrong");
	});
});


//정오답 효과음 플레이
playFeedSound = function (isTrue) {
	var clickAudio;

	if (isTrue) clickAudio = document.getElementsByClassName('feedOk')[0];
	else clickAudio = document.getElementsByClassName('feedNo')[0];

	if (!clickAudio.ended) {
		clickAudio.currentTime = 0;
	}
	clickAudio.play();
}