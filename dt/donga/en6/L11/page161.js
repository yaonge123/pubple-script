$(document).ready(function(){
	// 문제풀이와 달리 하나만 입력해도 버튼 노출
	var $inputStep = $(".writeForm_C input");
	var $btnReplay = $(".btnReplay[data-target='writeForm_C']");
	var $checkWrap = $(".writeForm_C .check_wrap");

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

		if ($checkWrap.length) {
			$checkWrap.find("input").prop("checked", false);
		}
	});

	// Try More - 저장 된 input 값 존재시 replay 버튼 노출
	var $inputTrymore = $(".writeForm_C").find("input");
	var showReBtn = setInterval(function () {
		$inputTrymore.each(function () {
			if ($(this).val()) {
				$btnReplay.addClass("show");
			}
		});
	}, 80);
	setTimeout(function () {
		clearInterval(showReBtn);
	}, 4000);
});