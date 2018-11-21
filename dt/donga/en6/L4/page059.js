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

	// 음성 재생 중복 막기
	var $btnPlay = $(".btnAudioBubble");
	var $mpTxt = $(".active_area.n1").find(".mp_text");

	$btnPlay.on("click", function() {
		resetAllMediaPlayer();
	});

	$mpTxt.on("click", function() {
		if ($btnPlay.hasClass("on")) $btnPlay.click();
	});
});