$(document).ready(function(){
	// page js ↓
	var $content = $(".content");

	// 퍼즐 퀴즈
	puzzleQuiz($content.eq(0));
});

function puzzleQuiz($content) {
	var ui = dev.ui;

	var $puzzleBox = $(".puzzle_box");
	var $puzzle = $puzzleBox.find(".puzzle");
	var $puzzleAns = $puzzleBox.find(".puzzle_anwer");

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
		var className = $(this).attr("class").split(" ");
		var $input = $quizLi.find("input");

		$puzzleAns.each(function(j) {
			puzzleAns = $($puzzleAns[j]);
			
			for(var i = 1; i < className.length; i++){
				if (puzzleAns.hasClass(className[i])) puzzleAns.addClass("show");
			}
		});

		if ($input.prop("disabled")) {
			$input.prop("disabled", false);
			$input.css("pointer-events", "");
		}
	});

	//정답확인 버튼
	$btnCheck.on("click", function() {
		var $this = $(this);

		$this.removeClass("show");
	});

	//다시하기 버튼
	$btnReplay.on("click", function() {
		var $this = $(this);
		var target = $this.data("target");
		var $quizLi = $content.find($(".quizType"));

		$quizLi.each(function(i, ele) {
			var list = $(ele);
			var qid = list.data("qid");

			if (target === qid){
				list.find("input").prop("disabled",true);
			}
		});

		$puzzleAns.removeClass("show");
		$input.prop("disabled", true);
		$input.css("pointer-events", "none");
	});

	//퍼즐 메세지 노출?
	$inputWrap.on("click", function() {
		var $this = $(this);
		var $input = $this.find("input");
		var isDisabled = $input.prop("disabled")? true : false;

		if (isDisabled && !$btnCheck.hasClass("on")){
			ui.initFeedMsg("custom", $puzzleBox, true);
		}
	});
}