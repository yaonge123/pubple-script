$(document).ready(function(){
	// page js ↓
	var $content = $(".content");

	// 퍼즐 퀴즈
	puzzleQuiz($content.eq(0));


	// STEP4 팝업 내 다시풀기 버튼 활성화
	// 문제풀이와 달리 하나만 입력해도 버튼 노출
	var $inputStep4 = $(".writeForm_A input");
	var $btnReplay4 = $(".btnReplay[data-target='writeForm_A']");

	$inputStep4.on("click", function(e) {
		// 키 입력 시 정답 확인 활성화
		var $this = $(this);
		$this.off("keydown").on("keydown", function (e) {
			$btnReplay4.addClass("show");
			$this.off("keyup").on("keyup", function() {
				var text = ""
				$inputStep4.each(function() {
					text += this.value;
				});

				if (!text) {
					$btnReplay4.removeClass("show");
				}
			});
		});
	});

	$btnReplay4.on("click", function() {
		$inputStep4.val("");
		$(this).removeClass("show");
	});

	// STEP4 팝업 내 다시풀기 버튼 활성화
	var showReBtn = setInterval(function() {
		$inputStep4.each(function() {
			if ($(this).val()) {
				$btnReplay4.addClass("show");
			}
		});
	});

	setTimeout(function() {
		clearInterval(showReBtn);
	}, 3000);
	// STEP4 팝업 내 다시풀기 버튼 활성화 - END
});

function puzzleQuiz($content) {
	var ui = dev.ui;
	var zoomVal = dev.zoomVal;

	var $puzzleBox = $(".puzzle_box");
	var $puzzle = $puzzleBox.find(".puzzle");
	var $puzzleAns = $puzzleBox.find(".puzzle_anwer");

	var $quizLi = $content.find(".quizType");
	var $btnCheck = $content.find(".btnCheck");
	var $btnReplay = $content.find(".btnReplay");
	var $input = $quizLi.find("input");
	var $inputWrap = $quizLi.find(".input_wrap");

	$input.prop("disabled", true);
	if (zoomVal !== 1){
		$input.css("z-index", -10);
	}

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

		if ($input.prop("disabled")) $input.prop("disabled", false);
		if (zoomVal !== 1) $input.css("z-index", "");
	});

	//정답확인 버튼
	$btnCheck.on("click", function() {
		var $this = $(this);

		$this.removeClass("show");
		$input.prop("disabled", true);
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
		if (zoomVal !== 1){
			$input.css("z-index", -10);
		}
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