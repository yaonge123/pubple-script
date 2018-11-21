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
	
	//Get Ready : 정답확인 시, 정답 제외하고 dragBox blind 제거
	$(".btnCheck[data-target='dragQuiz_A_1']").on("click", function() {
		$(".dragBox").each(function(i) {
			$(this).addClass("disabled");
			if (i === 3) return;
			$(this).removeClass("blind");
		});
	});

	$(".btnReplay[data-target='dragQuiz_A_1']").on("click", function() {
		$(".dragBox").each(function(i) {
			$(this).removeClass("disabled");
		});
	});
});