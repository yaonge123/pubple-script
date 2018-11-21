$(document).ready(function(){
	// page js ↓
	// Think and Talk 6학년 선택시
	var $txt = $(".active_area.n1 .txt_box .txt").last();
	var changeTxt;

	$(".btnShow").on("click", function() {
		var $xy6 = $(".btnAudioBubble.xy6");
		var $btnToon = $(this).parent();

		if ($btnToon.hasClass("xy6")) {
			if ($btnToon.hasClass("on")) {
				$xy6.addClass("bg");
				$txt.removeClass("on");
				
				clearInterval(changeTxt);
			} else if (!$(".btnAudioBubble").hasClass("on")) {
				$xy6.removeClass("bg");
				$txt.addClass("on");
				changeTxt = setInterval(function() {
					if (!$btnToon.hasClass("on")) {
						$txt.removeClass("on");
						clearInterval(changeTxt);
					}
				}, 100);
			}
		} else {
			if (!$xy6.hasClass("on")) {
				$xy6.addClass("bg");
				$txt.removeClass("on");
				clearInterval(changeTxt);
			}
		}
	});

	// Play Together : 다시풀기 버튼 노출
	var $inputStep = $(".write_box input");
	var $btnReplay = $(".btnReplay[data-target='write_box']");

	$inputStep.on("click", function(e) {
		// 키 입력 시 정답 확인 활성화
		var $this = $(this);
		$this.off("keydown").on("keydown", function (e) {
			$btnReplay.addClass("show");
			$this.off("keyup").on("keyup", function() {
				var text = ""
				$inputStep.each(function() {
					text += this.value;
				});

				if (!text) {
					$btnReplay.removeClass("show");
				}
			});
		});
	});

	$btnReplay.on("click", function() {
		$inputStep.val("");
		$(this).removeClass("show");
	});

	// STEP4 팝업 내 다시풀기 버튼 활성화
	var showReBtn = setInterval(function() {
		$inputStep.each(function() {
			if ($(this).val()) {
				$btnReplay.addClass("show");
			}
		});
	});

	setTimeout(function() {
		clearInterval(showReBtn);
	}, 3000);
	// STEP4 팝업 내 다시풀기 버튼 활성화 - END
});