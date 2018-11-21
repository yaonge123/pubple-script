$(document).ready(function(){
	// page js ↓ 
	// 음성 재생 중복 막기
	var $btnPlay = $(".btnAudioBubble");
	var $mpTxt = $(".active_area.n1").find(".mp_text");

	$btnPlay.on("click", function() {
		resetAllMediaPlayer();
	});

	$mpTxt.on("click", function() {
		if ($btnPlay.hasClass("on")) $btnPlay.click();
	});

	// Step1 체크박스 체크시, 정답체크 -> 다시풀기
	var target = "Quiz_A";
	var $quizType = $(".quizType[data-qid='"+ target +"']");
	var $btnCheck = $(".btnCheck[data-target='"+ target +"']");
	var $btnRe = $(".btnReplay[data-target='"+ target +"']");

	var $checkItem = $quizType.find(".checkItem");
	var $checkPoint = $quizType.find(".checkPoint");

	$checkPoint.on("click", function() {
		if (!$checkItem.hasClass("on")) {
			$btnCheck.removeClass("blind");
			$btnRe.removeClass("show");
			return;
		}
		
		$btnCheck.addClass("blind");
		$btnRe.addClass("show");
	});

	$btnRe.on("click", function() {
		$(this).removeClass("show");
		$btnCheck.removeClass("blind");
	});

	// STEP2 팝업 내 다시풀기 버튼 활성화
	// 문제풀이와 달리 하나만 입력해도 버튼 노출
	var $inputStep4 = $(".writeForm_A input");
	var $btnReplay = $(".btnReplay[data-target='writeForm_A']");

	$inputStep4.on("click", function(e) {
		// 키 입력 시 정답 확인 활성화
		var $this = $(this);
		$this.off("keydown").on("keydown", function (e) {
			$btnReplay.addClass("show");
			$this.off("keyup").on("keyup", function() {
				var text = ""
				$inputStep4.each(function() {
					text += this.value;
				});

				if (!text) {
					$btnReplay.removeClass("show");
				}
			});
		});
	});

	$btnReplay.on("click", function() {
		$inputStep4.val("");
		$(this).removeClass("show");
		$(this).removeClass("show");
	});

	// STEP4 팝업 내 다시풀기 버튼 활성화
	var showReBtn = setInterval(function() {
		$inputStep4.each(function() {
			if ($(this).val()) {
				$btnReplay.addClass("show");
			}
		});
	});

	setTimeout(function() {
		clearInterval(showReBtn);
	}, 3000);
	// STEP2 팝업 내 다시풀기 버튼 활성화 - END
});