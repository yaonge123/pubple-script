$(document).ready(function(){
	// page js ↓ 
	// C번 : 음성 재생 시, 보기에 색자
	var $activeArea = $(".active_area.n3");
	var $inputWrap = $activeArea.find(".input_wrap");
	var exTxt = $(".txt_box").find(".mp_text");
	var arr = [1, 0, 2];
	var changeColor;
	var $btnRe = $(".btnReplay[data-target='Quiz_C']");
	
	$inputWrap.on("click", function() {
		var $this = $(this);
		var $clickChange = $this.parents(".clickChange");
		var ansIdx = $inputWrap.index($this);
		var idx = arr[ansIdx];

		if (!$btnRe.hasClass("on")) return;

		exTxt.css("color","");
		clearInterval(changeColor);

		$(exTxt[idx]).css("color", "#ff6900");

		changeColor = setInterval(function() {
			if (!$clickChange.hasClass("colorOn")) {
				$(exTxt[idx]).css("color", "");
				clearInterval(changeColor);
			}
		}, 100);
	});
});