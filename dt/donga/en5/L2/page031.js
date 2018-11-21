$(document).ready(function(){
	// page js ↓ 
	// Check Together
	$(".checkWrap").each(function(){
		var $state = $(this).data("type");
		if( $state == "smileCheck"){
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

	// STEP4 팝업 내 다시풀기 버튼 활성화
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
	// STEP4 팝업 내 다시풀기 버튼 활성화 - END
});