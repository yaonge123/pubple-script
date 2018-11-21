$(document).ready(function(){
	// page js ↓
	var $content = $(".content");

	// 퍼즐 퀴즈
	lineQuiz($content.eq(0));
});

function lineQuiz($content) {
	var ui = dev.ui;
	var $lineBox = $content.find(".title_box");

	var $quizLi = $content.find(".quizType");
	var $btnCheck = $content.find(".btnCheck");
	var $btnReplay = $content.find(".btnReplay");

	var $input = $quizLi.find("input");
	var $inputWrap = $quizLi.find(".input_wrap");

	$input.prop("disabled", true);
	$input.css("pointer-events", "none");

	//퍼즐 클릭시
	$lineBox.on("click", function() {
		$(this).addClass("on");
		$input.prop("disabled", false);
		$input.css("pointer-events", "");
	});

	//정답확인 버튼
	$btnCheck.on("click", function() {
		$lineBox.addClass("on");
	});

	//다시하기 버튼
	$btnReplay.on("click", function() {
		$lineBox.removeClass("on");
	});

	//메세지 노출
	$inputWrap.on("click", function() {
		if (!$lineBox.hasClass("on")){
			ui.initFeedMsg("quiz", "Quiz_A", true);
		}
	});
}