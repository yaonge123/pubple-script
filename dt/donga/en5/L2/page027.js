$(document).ready(function(){
    // page js ↓
    // Write A번 : 낱말 찾기 + 알럿창
	var $content = $(".content");

	// 퍼즐 퀴즈
	puzzleQuiz($content.eq(0));
});

function puzzleQuiz($content) {
	var ui = dev.ui;
	var $puzzle = $(".answer_line");

	var $quizLi = $content.find(".quizType");
	var $btnCheck = $content.find(".btnCheck");
	var $btnReplay = $content.find(".btnReplay");
	var $input = $quizLi.find(".essayWrite");
	var $inputWrap = $quizLi.find(".input_wrap");

	setTimeout(function() {
		if (!$input.val()) {
			$input.prop("disabled", true);
			$input.css("pointer-events", "none");
		}
	}, 1500);

	//퍼즐 클릭시
	$puzzle.on("click", function() {
        $(this).addClass("show");

		if ($input.prop("disabled")) {
			$input.prop("disabled", false);
			$input.css("pointer-events", "");
		}
	});

	//정답확인 버튼
	$btnCheck.on("click", function() {
		$puzzle.addClass("show");
	});

	//다시하기 버튼
	$btnReplay.on("click", function() {
        $puzzle.removeClass("show");
		$input.prop("disabled", true);
		$input.css("pointer-events", "none");
	});

	//퍼즐 메세지 노출?
	$inputWrap.on("click", function() {
		var $this = $(this);
		var $input = $this.find("input");
		var isDisabled = $input.prop("disabled")? true : false;

		if (isDisabled && !$btnCheck.hasClass("on")){
			ui.initFeedMsg("custom", $quizLi, true);
		}
	});
}