$(document).ready(function(){
	// page js ↓ 
	// Get Ready
	var $checkWrap = $(".checkWrap");
	var $answerImg = $checkWrap.find(".answer_img");
	var otherMsgs = $(".answer_container .ansMsg");
	var $btnCheckA = $(".btnCheck[data-target='Quiz_A']");
	var $btnReA = $(".btnReplay[data-target='Quiz_A']");

	$checkWrap.find("li").on("click", function() {
		var $this = $(this);

		if ($answerImg.prop("disabled")) return;

		$this.find(".answer_img").addClass("show");
		$btnCheckA.add($btnReA).addClass("on");
		if ($checkWrap.find(".answer_img.show").length === 5) otherMsgs.addClass("show");
	});

	$btnCheckA.on("click", function() {
		$checkWrap.find(".answer_img").addClass("show");
		$answerImg.css("pointer-events", "none");
		$answerImg.prop("disabled", true);
	});

	$btnReA.on("click", function() {
		$answerImg.removeClass("show");
		$answerImg.css("pointer-events", "");
		$answerImg.prop("disabled", false);
	});
	// Get Ready - END

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