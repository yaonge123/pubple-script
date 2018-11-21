$(document).ready(function(){
	// page js ↓
	// Read and Do : 선 클릭 시 색깔 부여
	var $clickEvt = $(".clickEvent");
	var $answerLine = $(".answer_line");
	var $btnCheck = $(".btnCheck[data-target='Quiz_A']");
	var $btnReplay = $(".btnReplay[data-target='Quiz_A']");

	$clickEvt.on("click", function() {
		var idx = $clickEvt.index($(this));

		$answerLine.eq(idx).addClass("on");
	});

	$btnCheck.on("click", function() {
		$answerLine.addClass("on");
	});

	$btnReplay.on("click", function() {
		$answerLine.removeClass("on");
	});
});