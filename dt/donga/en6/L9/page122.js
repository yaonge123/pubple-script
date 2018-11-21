$(document).ready(function(){
	// page js ↓ 
	// Get Ready
	var $btnCheck = $(".btnCheck[data-target='dragQuiz_A_1']");
	var $btnReplay = $(".btnReplay[data-target='dragQuiz_A_1']");

	$(".obj").on("click", function() {
		var $this = $(this);
		var okAudio = $(".feedOk")[0];
		var index = $(".obj").index($this);

		if ($this.hasClass("answer")) {
			if ($this.siblings(".ox").hasClass("on")) {
				$this.siblings(".mp_text").click();
			} else {
				$this.siblings(".sign, .mp_text, .ox").addClass("on");
				okAudio.pause();
				okAudio.currentTime = 0;
				okAudio.play();
				$this.siblings(".mp_text").click();
				$btnReplay.addClass("show");
				
				if (index === 6) $(".answer_txt").addClass("show");
			}
			if ($(".ox.on").length === 4) $(".answer_container .ansMsg").addClass("show");

			$btnCheck.addClass("on");
			$btnReplay.addClass("on");
		} else {
			$(".feedNo")[0].play();
		}
	});

	$btnCheck.on("click", function() {
		$(".sign, .mp_text, .ox").addClass("on");
		$(".answer_txt").addClass("show");
	});

	$btnReplay.on("click", function() {
		$(".sign, .mp_text, .ox").removeClass("on");
		$(this).removeClass("show");
		$(".answer_txt").removeClass("show");
		$(".answer_container .ansMsg").removeClass("show");
	})
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