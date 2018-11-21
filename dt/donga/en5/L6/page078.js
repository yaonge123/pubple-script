$(document).ready(function(){
	// page js ↓ 
	// Get Ready
	var target = "Quiz_A";
	var $assessmentItme = $(".quizType[data-qid='"+ target +"']");
	var $btnCheck = $(".btnCheck[data-target='"+ target +"']");
	var $btnReplay = $(".btnReplay[data-target='"+ target +"']");
	
	var $btnShow = $assessmentItme.find(".btnShow");
	var $hideImgBox = $assessmentItme.find(".hideImgBox");
	var ansMsg = $(".answer_container .ansMsg");

	$btnShow.on("click", function() {
		var $this = $(this);
		var hideImg = $this.next();

		hideImg.addClass("disabled");
		$btnCheck.addClass("on");
		$btnReplay.addClass("on");

		var hideImgOn = $assessmentItme.find(".hideImgBox.show");

		if (hideImgOn.length === 6) ansMsg.addClass("show");
	});

	$btnCheck.on("click", function() {
		if ($(this).hasClass("on")) $hideImgBox.addClass("show disabled");
	});

	$btnReplay.on("click", function() {
		if (!$(this).hasClass("on")) $hideImgBox.removeClass("show disabled");
	});
	//Get Ready - End
	
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
});
