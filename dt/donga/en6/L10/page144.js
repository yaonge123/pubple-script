$(document).ready(function(){
	// page js ↓
	// Review A번 : 알럿창 띄우기
	var ui = dev.ui;
	var util = dev.util;

	var $quizTot = $("[data-qid='Quiz_A_Total']");
	var $chkItem = $quizTot.find(".checkItem");
	var $canvasArea = $quizTot.find(".canvasArea");
	var $btnReplay = $(".allReplay[data-target='Quiz_A_Total']");
	var canvas;

	if (util.isTouchDevice) {
        delayTime = 500;
    } else {
        delayTime = 2200;
	}
	
	setTimeout(function() {
		canvas = $quizTot.find("canvas");

		if (!$chkItem.hasClass("on")) {
			canvas.prop("disabled", true);
			canvas.css("pointer-events", "none");
		}

		$canvasArea.on("click", function() {
			if (canvas.prop("disabled") && !$btnReplay.hasClass("on")) ui.initFeedMsg("quiz", "Quiz_A1");
		});
	}, delayTime);

	$chkItem.on("click", function() {
		canvas.prop("disabled", false);
		canvas.css("pointer-events", "");
	});

	$btnReplay.on("click", function() {
		canvas.prop("disabled", true);
		canvas.css("pointer-events", "none");
	});

	// Review B번 : 정답 예외처리
	var target = "Quiz_B_Total";
	var $assessmentItem = $(".active_area.n2[data-qid='"+ target +"']");
	var $btnChkB = $(".btnCheck[data-target='Quiz_B2']");
	var $btnReB = $(".btnReplay[data-target='"+ target +"']");
	var $checkItemB = $assessmentItem.find(".checkItem");
	var $inputWrap = $assessmentItem.find(".input_wrap");
	var $essayWrite = $assessmentItem.find(".essayWrite");
	var valStr = "";

	setTimeout(function() {
		if (!$checkItemB.hasClass("on")) {
			$essayWrite.each(function() {
				$(this).prop("disabled", true);
				$(this).css("pointer-events", "none");
			});
		}
	}, 1500);
	
	$inputWrap.on("click", function() {
		var essay = $(this).find(".essayWrite");

		if (essay.prop("disabled") && !$btnReB.hasClass("on")) ui.initFeedMsg("quiz", "Quiz_B1");
	});

	$btnChkB.on("click", function() {
		$essayWrite.each(function(idx) {
			if (idx === 0 || idx === 2) {
				var essay = $(this);
				if (essay.val().trim() === "Shakespeare") {
					essay.val("He");
					valStr = "Shakespeare";
				}
			}
		});
	});

	$checkItemB.on("click", function() {
		$essayWrite.prop("disabled", false);
		$essayWrite.css("pointer-events", "");
	});

	$btnReB.on("click", function() {
		$essayWrite.prop("disabled", true);
		$essayWrite.css("pointer-events", "none");
	});

	$btnChkB.bind("click", function() {
		if (valStr) {
			$essayWrite.eq(0).val("Shakespeare");
			valStr = "";
		}
	});

	$btnChkB.each(function() {
		clickEvent = $._data(this, "events").click;

		eventSwap = clickEvent[0];
		clickEvent[0] = clickEvent[1];
		clickEvent[1] = eventSwap;
	});
});