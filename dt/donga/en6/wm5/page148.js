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
});