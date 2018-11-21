$(document).ready(function () {
	// page js ↓ 
	$(".bullBtn").on("click", function (e) {
		var _index = $(this).parent().index();
		$(".bullResult .inner").removeClass("show");
		$(".bullResult .inner").eq(_index).addClass("show");

		if (!$(e.target).hasClass("btnAudio")) {
			if (_index == 0) {
				stopMediaPlayer("syncA_02");
				stopMediaPlayer("syncA_02");
			} else if (_index == 1) {
				stopMediaPlayer("syncA_01");
				stopMediaPlayer("syncA_02");
			} else {
				stopMediaPlayer("syncA_01");
				stopMediaPlayer("syncA_02");
			}
		}
	});

	//Get Ready : 숨은 그림 찾기
	var activeArea = $(".active_area.n1");
	var $char = activeArea.find(".char > li");
	var $char_hid = $char.find(".hidden_picture");
	var $person = $(".pick_job");

	var $btnCheck = activeArea.find(".acitive_n1 .btnCheck");
	var $btnReplay = activeArea.find(".acitive_n1 .btnReplay");

	function showAnswer() {
		if ($(".hidden_picture.on").length === 6) {
			$(".ansMsg").addClass("show");
			// $(".hidden_picture").eq(0).css("z-index", 0);
			$btnCheck.addClass("on");
		}
	}

	$char_hid.on("click", function () {
		$(this).addClass("on");
		playFeedSound(true);
		showAnswer();
	});

	$person.on("click", function () {
		var $this = $(this);

		$this.addClass("on");
		$this.children().addClass("show").click();
		showAnswer();
	});

	$btnCheck.add($btnReplay).on("click", function () {
		$char_hid.addClass("on");
		$person.addClass("on");
		$person.children().addClass("show");
		// $(".hidden_picture").eq(0).css("z-index", 0);
	});
	
	$btnReplay.on("click", function () {
		$char_hid.removeClass("on");
		$person.removeClass("on");
		$person.children().removeClass("show");
		// $(".hidden_picture").eq(0).css("z-index", 10);
	});

});

//정오답 효과음 플레이
playFeedSound = function (isTrue) {
	var clickAudio;

	if (isTrue) clickAudio = document.getElementsByClassName('feedOk')[0];
	else clickAudio = document.getElementsByClassName('feedNo')[0];

	if (!clickAudio.ended) {
		clickAudio.currentTime = 0;
	}
	clickAudio.play();
}