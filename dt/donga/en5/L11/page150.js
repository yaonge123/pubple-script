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

	//Get Ready : 틀린 그림 찾기
	var activeArea = $(".active_area.n1");
	var char = activeArea.find(".char").children();

	var $btnCheck = activeArea.find(".btnCheck");
	var $btnReplay = activeArea.find(".btnReplay");
	var ansMsg = activeArea.find(".answer_container .ansMsg");
	var oxMark = activeArea.find(".ox");
	var clickAnsTimer, showAnsTimer;

	char.on("click", function() {
		var $this = $(this);
		var $ox = $this.find(".ox");
		var $obj = $this.find(".obj");

		resetAllMediaPlayer();
		oxMark.removeClass("show");

		if ($obj.hasClass("wrong")) playFeedSound(false);
		else playFeedSound(true);

		$this.addClass("on");
		$ox.addClass("show");

		clickAnsTimer = setTimeout(function(){
			$ox.removeClass("show");
		}, 1500);
		
		$btnCheck.addClass("on");
		$btnReplay.addClass("on");
		
		if (activeArea.find(".char").children(".on").length === 8) ansMsg.addClass("show");
	});

	$btnCheck.on("click", function() {
		char.toggleClass("on");
		oxMark.removeClass("show");
		clearTimeout(clickAnsTimer);
		clearTimeout(showAnsTimer);
		
		$(".obj").each(function() {
			if (!$(this).hasClass("wrong")) {
				$(this).next(".ox").addClass("show");
			}
		});

		showAnsTimer = setTimeout(function() {
			oxMark.removeClass("show");
		}, 1500);
	});

	$btnReplay.on("click", function() {
		clearTimeout(showAnsTimer);
		clearTimeout(clickAnsTimer);

		char.removeClass("on");
		oxMark.removeClass("show");
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