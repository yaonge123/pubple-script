$(document).ready(function(){
	// page js ↓
	// Think and Talk 
	// 캐릭터 선택에 따른 on 클래스 추가
	var wrap = $("#wrap");
	var $btnShow = wrap.find(".btnShow");
	var onArr = ["on1", "on2", "on3", "on4", "on5"];
	var changeChar;

	$btnShow.on("click", function() {
		var $this = $(this);
		var idx = $btnShow.index($this);

		for(var i = 0; i < onArr.length; i++) {
			if (wrap.hasClass(onArr[i])) return false;
		}

		changeChar = setInterval(function() {
			if (!$(".btnAudioBubble").hasClass("on")) {
				wrap.removeClass("on1 on2 on3 on4 on5");
				clearInterval(changeChar);
			}
		}, 100);
		wrap.addClass(onArr[idx]);
	});
	
	// 6학년 선택시
	$(".btnShow").on("click", function(e) {
		var $xy6 = $(".btnAudioBubble.xy6");
		var $btnToon = $(this).parent();

		if ($btnToon.hasClass("xy6")) {
			if ($btnToon.hasClass("on")) {
				$xy6.addClass("bg");
			} else if (!$(".btnAudioBubble").hasClass("on")) {
				$xy6.removeClass("bg");
			}
		} else {
			if (!$xy6.hasClass("on")) {
				$xy6.addClass("bg");
			}
		}

		if ($btnToon.hasClass("on")) {
			for (var j = 0; j < onArr.length; j++) {
				if (wrap.hasClass(onArr[j])) {
					$btnToon.click();
				}
			}
		}
	});
});