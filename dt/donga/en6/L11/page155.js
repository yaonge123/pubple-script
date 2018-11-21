$(document).ready(function(){
	// page js ↓
	var ui = dev.ui;

	// A번 문제 : 알럿창 띄우기
	var targetA = "Quiz_A";
	var $quizTypeA = $(".quizType[data-qid='"+ targetA +"']");
	var $btnReplayA = $(".btnReplay[data-target='"+ targetA +"']");
	var $btnAudio = $(".btnAudio[data-target='"+ targetA +"']");
	
	var $inputWrap = $quizTypeA.find(".input_wrap");
	var $essayWriteA = $quizTypeA.find(".essayWrite");

	setTimeout(function() {
		if (!$btnAudio.hasClass("played") || !$essayWriteA.val()) {
			$essayWriteA.each(function() {
				$(this).prop("disabled", true);
				$(this).css("pointer-events", "none");
			});
		}
	}, 1500);

	$inputWrap.on("click", function() {
		var essay = $(this).find(".essayWrite");

		if (essay.prop("disabled") && !$btnReplayA.hasClass("on")) ui.initFeedMsg("sound", "Quiz_A");
	});

	$(".right_essay").on("click", function() {
		if ($(this).find(".essayWrite").prop("disabled") && !$btnReplayA.hasClass("on")) ui.initFeedMsg("sound", "Quiz_A");
	});

	$btnReplayA.on("click", function() {
		$essayWriteA.prop("disabled", true);
		$essayWriteA.css("pointer-events", "none");
		$btnAudio.removeClass("played");
	});

	$btnAudio.on("click", function() { 
		$(this).addClass("played"); 
		$essayWriteA.prop("disabled", false);
		$essayWriteA.css("pointer-events", "");
	});

	// B번 문제 : 클릭 시, 이미지에 X마킹
	var target = "Quiz_B";
	var $btnCheck = $(".btnCheck[data-target='"+ target +"']");
	var $btnReplay = $(".btnReplay[data-target='"+ target +"']");

	var $assessmentItem = $(".quizType[data-qid='"+ target +"']");
	var $btnShow = $assessmentItem.find(".btnShow");
	var $hideImg = $assessmentItem.find(".hideImgBox");
	var $hideInp = $assessmentItem.find("input.blind");

	var $essayWrite = $assessmentItem.find(".essayWrite");
	var $inputWrap = $assessmentItem.find(".input_wrap");
	
	$essayWrite.each(function() {
		$(this).prop("disabled", true);
		$(this).css("pointer-events", "none");
	});

	setTimeout(function() {
		$hideInp.each(function(){
			var $this = $(this);
			var $prevHideImg = $this.prev();
	
			if ($this.prop("checked")) $prevHideImg.addClass("show");
		});
	}, 1000);

	$btnCheck.on("click", function() {
		$btnShow.prop("disabled", true);
		$btnShow.css("pointer-events", "none");

		$hideImg.each(function() {
			if (!$(this).hasClass("show")) $(this).addClass("show answer");
		});

		$essayWrite.prop("disabled", false);
		$essayWrite.css("pointer-events", "");
	});

	$btnReplay.on("click", function() {
		$btnShow.prop("disabled", false);
		$btnShow.css("pointer-events", "");

		$hideImg.removeClass("show answer");
		$hideInp.each(function() {
			$(this).prop("checked", false);
		});
		
		$essayWrite.prop("disabled", true);
		$essayWrite.css("pointer-events", "none");
	});

	$btnShow.on("click", function() {
		var $this = $(this);
		var $input = $this.siblings("input");
		var $hideImg = $this.siblings(".hideImgBox");

		if (!$hideImg.hasClass("show")) $input.prop("checked", false);
		else {
			$input.prop("checked", true);
			playFeedSound(true);
		}

		if ($(".hideImgBox.show").length === 5) {
			$essayWrite.prop("disabled", false);
			$essayWrite.css("pointer-events", "");
		}
	});

	$inputWrap.on("click", function() {
		if ($essayWrite.prop("disabled") && !$(".essayAnswer").hasClass("show")) {
			ui.initFeedMsg("etc", $assessmentItem, true);
		}
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