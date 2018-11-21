$(document).ready(function(){
	// Tray More 다시풀기 버튼 활성화
	// 문제풀이와 달리 하나만 입력해도 버튼 노출
	var $inputStep = $(".writeForm_C input");
	var $btnReplay = $(".btnReplay[data-target='writeForm_C']");

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