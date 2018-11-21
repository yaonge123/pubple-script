$(document).ready(function(){
	// page js ↓ 
	$(".bullBtn").on("click", function (e) {
		var _index = $(this).parent().index();
		$(".bullResult .inner").removeClass("show");
		$(".bullResult .inner").eq(_index).addClass("show");
		
		if (!$(e.target).hasClass("btnAudio")) {
			if(_index == 0){
				stopMediaPlayer("syncA_02");
				stopMediaPlayer("syncA_02");
			}else if(_index == 1){
				stopMediaPlayer("syncA_01");
				stopMediaPlayer("syncA_02");
			}else{
				stopMediaPlayer("syncA_01");
				stopMediaPlayer("syncA_02");
			}
		}
	});

	// Get Ready : 정답확인 시, 말풍선 띄우기
	var $btnCheck = $(".btnCheck[data-target='Quiz_A']");
	var $btnReplay = $(".btnReplay[data-target='Quiz_A']");
	var ansMsg = $(".draw_leave .ansMsg");

	$btnCheck.on("click", function() {
		ansMsg.addClass("show");
	});

	$btnReplay.on("click", function() {
		ansMsg.removeClass("show");
	});
});