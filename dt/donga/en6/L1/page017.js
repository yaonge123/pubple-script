$(document).ready(function(){
	// page js ↓ 
	// B번 문제 : 정답 확인시 hide_img에 blind 추가
	var $btnCheck = $(".active_area.n1").find(".btnCheck");
	var $btnReplay = $(".btnReplay[data-target='Quiz_A3']");
	var $quizHideImg = $(".quiz_hide_img");
	var $slideBtnWrap = $("#slideBtnWrap");
	var $quizMarking = $(".quizMarking[data-bullet='B']");
	var $slideList = $(".slideList");
	var markArr = ["", ""];
	var btn;

	$btnCheck.on("click", function() {
		var slideOn = $(".slideList.on");
		var idx = $slideList.index(slideOn);

		$quizHideImg.addClass("blind");
		markArr[idx] = $quizMarking.attr("class").split(' ')[2];
	});

	$btnReplay.on("click", function() {
		$quizHideImg.removeClass("blind");	
	});

	$slideBtnWrap.on("click", function(e) {
		var slideOn = $(".slideList.on");
		var btnChk = slideOn.find(".btnCheck");
		var idx = $slideList.index(slideOn);
		var marking = $quizMarking.attr("data-marking");

		if (idx === 0 && btn && btn.hasClass("off") && marking === "Quiz_A1") return;
		
		$quizMarking.attr("data-marking", btnChk.data("target"));
		$quizMarking.removeClass("wrong correct");

		if (btnChk.hasClass("on")) {
			setTimeout(function() {
				$quizMarking.addClass(markArr[idx]);
			}, 0);
		} else {
			if ($quizHideImg.hasClass("blind")) $quizHideImg.removeClass("blind");
		}

		btn = $(e.target);
	});
});