$(document).ready(function(){
	// page js ↓ 
	// Get Ready
	var $btn = $(".click_event_btn");
	var movePoint = $(".move_pointer");
	var $btnCheck = $(".btnCheck[data-target='Quiz_A_1']");
	var $btnReplay = $(".btnReplay[data-target='Quiz_A_1']")

	$btn.on("click", function(e) {
		var $this = $(this);

		movePoint.css("transition", "all 1.0s");
		
		if ($this.hasClass("n8") || $this.hasClass("n9")) {
			if (!$this.prev().find(".ansMsg").hasClass("show")) {
				e.stopImmediatePropagation();
				return;
			}

			if ($this.hasClass("n9") && !$btnCheck.hasClass("on")) $btnCheck.click();
		}

		if ($this.hasClass("answer") || $this.hasClass("wrong_1") || $this.hasClass("wrong_2")) {
			$this.addClass("on");
			if ($this.hasClass("answer")) {
				if (!$btnCheck.hasClass("on")) $btnCheck.trigger("click");
				playFeedSound(true);
			} else {
				playFeedSound(false);
			}
		}

		$this.find(".ansMsg").addClass("show");
	});

	$(".click_event_btn.n7").on("click", function() {
		movePoint.addClass("a1");
	});

	$(".click_event_btn.n8").on("click", function() {
		movePoint.addClass("a2");
	});

	$btnCheck.on("click", function (e) {
		$(".click_event_btn.answer").addClass("on");
		$(".n7, .n8, .n9").find(".ansMsg").addClass("show");
		movePoint.css("transition", "none").addClass("a2");
	});

	$btnReplay.on("click", function() {
		$btn.removeClass("on");
		$btn.find(".ansMsg").removeClass("show");
		movePoint.css("transition", "none").removeClass("a1 a2 blind");
	});
	
	//
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

//정오답 효과음 플레이
playFeedSound = function(efCheck) {
    var clickAudio;

    if (efCheck) clickAudio = document.getElementsByClassName('feedOk')[0];
    else clickAudio = document.getElementsByClassName('feedNo')[0];

    if(!clickAudio.ended) {
        clickAudio.currentTime = 0;
    }
    clickAudio.play();
}