$(document).ready(function(){
	// page js ↓
	var $content = $(".content");

	// 낱말 퀴즈
	WordQuiz($content.eq(0));
});

function WordQuiz($content) {
	var ui = dev.ui;
	var zoomVal = dev.zoomVal;

	var $wordBox = $(".img_box");
	var $word = $wordBox.find(".click_event");

	var $quizLi = $content.find(".quizType");
	var $btnCheck = $content.find(".btnCheck");
	var $btnReplay = $content.find(".btnReplay");
	var $input = $quizLi.find("input");
	var $inputWrap = $quizLi.find(".input_wrap");

    $input.prop("disabled", true);
    $input.css("pointer-events", "none");

	//퍼즐 클릭시
	$word.on("click", function() {
		if ($(this).hasClass("no")) return;

		$(this).addClass("on");
		if ($input.prop("disabled")) {
            $input.prop("disabled", false);
            $input.css("pointer-events", "");
        }
	});
	
	//정답체크 버튼 : Write It A번 수정해야 할 수도 있음
	$btnCheck.on("click", function() {
		$word.addClass("on");
	});

	//다시하기 버튼
	$btnReplay.on("click", function() {
        $word.removeClass("on");
		$input.prop("disabled", true);
        $input.css("pointer-events", "none");

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
            ui.initFeedMsg("custom", $wordBox, true);
		}
	});
}
