$(document).ready(function(){
	// page js ↓
	// Think and Talk 6학년 선택시
	$(".btnShow").on("click", function() {
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
	});
});