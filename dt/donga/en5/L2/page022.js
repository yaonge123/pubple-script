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

	// Get Ready
	var target = "dragQuiz_A_1";
	var $quizType = $(".quizType[data-qid='"+ target +"']");
	var $btnCheck = $(".btnCheck[data-target='"+ target +"']");
	var $btnReplay = $(".btnReplay[data-target='"+ target +"']");

	var $ansMsg = $quizType.find(".ansMsg.mp_text");
	var $dragBoxes = $quizType.find(".drag_container .dragBox");

	$btnCheck.on("click", function() {
		$dragBoxes.each(function() {
			$(this).removeClass("blind");
			$(this).addClass("disabled");
		});
	});

	$btnReplay.on("click", function() {
		$ansMsg.each(function() {
			var id = this.id;
			var txt = $(this).find("p");

			txt.text("");
			setNeutralize(id, 'mpText', true);
		});
	});
});