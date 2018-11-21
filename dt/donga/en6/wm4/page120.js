$(document).ready(function(){
	// page js ↓
	// 음성 재생 중복 막기
	var $btnPlay = $(".btnAudioBubble");
	var $mpTxt = $(".chapter.mp_text");
	var $icon = $(".icon.mp_text");
	
	$btnPlay.on("click", function() {
		resetAllMediaPlayer();
	});
	
	$mpTxt.add($icon).on("click", function() {
		if ($btnPlay.hasClass("on")) $btnPlay.click();
	});
	
	var target = "Quiz_A";
	var $btnCheck = $(".btnCheck[data-target='"+ target +"']");
	var $btnReplay = $(".btnReplay[data-target='"+ target +"']");
	var $quizType = $(".quizType[data-qid='"+ target +"']");
	var $checkWrap = $quizType.find(".checkWrap");

	$checkWrap.each(function(){
		var $state = $(this).data("type");
		if( $state == "startCheck"){
			var $smilebox = $(".checkBox");

			$smilebox.on("click", function(e) {
				e.preventDefault();

				var $this = $(this);
				var $input = $this.prev();
				var $checkWrap = $input.parents(".checkWrap");
				var $inputAll = $checkWrap.find("input");
				var $inputIdx = $inputAll.index($input);

				$inputAll.removeClass("on");
				$inputAll.prop("checked", false);

				for(var i = 0; i < $inputIdx + 1; i++){
					$($inputAll[i]).addClass("on");
					$($inputAll[i]).prop("checked", true);
				}
			});
		}
	});

	$btnReplay.on("click", function() {
		var $inputAll = $checkWrap.find("input");

		$inputAll.removeClass("on");
		$inputAll.prop("checked", false);
	});


	$btnCheck.on("click", function() {
		$checkWrap.each(function(){
			var $answer = $(this).data("answer");
			var $inputAll = $(this).find("input");
			for(var i = 0; i < $answer; i++){
				$($inputAll[i]).addClass("on");
				$($inputAll[i]).prop("checked", true);
			}
		});
	});
});