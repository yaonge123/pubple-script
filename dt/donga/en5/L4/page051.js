$(document).ready(function(){
	// page js ↓
	// Play Together : 다시풀기 버튼 노출
	var $inputStep = $(".writeForm_A input");
	var $btnReplay = $(".btnReplay[data-target='writeForm_A']");

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