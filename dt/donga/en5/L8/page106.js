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

	//Get Ready : 건강한 생활을 하는 사람 찾기
	var activeArea = $(".active_area.n1");
	var char = activeArea.find(".char").children();

	var $btnCheck = activeArea.find(".acitive_n1 .btnCheck");
	var $btnReplay = activeArea.find(".acitive_n1 .btnReplay");

	char.on("click", function() {
		var $this = $(this);
		var $ox = $this.find(".ox");
		var $mpTxt = $this.find(".mp_text");
		var index = $this.index();

		resetAllMediaPlayer();

		if ($this.hasClass("on")){
			$mpTxt.click();
			return;
		}


		playFeedSound(index);

		$this.addClass("on");
		// $ox.addClass("show");

		//181112 setTimeout 이벤트 제거
        // setTimeout(function(){
        $ox.removeClass("show");
        $mpTxt.click();
        // }, 1500);
		
		$btnCheck.addClass("on");
		$btnReplay.addClass("on");


        var active = $(".char li.on").length;

        $this.find("span").text(active);
		
		if (active === 6) {
			$btnCheck.addClass("on");
			$btnReplay.addClass("on");
			$(".ansMsg").addClass("show");
		}
	});

	$btnCheck.on("click", function() {
		char.addClass("on");
	});

	$btnReplay.on("click", function() {
		char.removeClass("on");
	});
});

//정오답 효과음 플레이
playFeedSound = function(index) {
    var clickAudio;

    if (index <= 1 || index === 3) clickAudio = document.getElementsByClassName('feedOk')[0];
    else clickAudio = document.getElementsByClassName('feedNo')[0];

    if(!clickAudio.ended) {
        clickAudio.currentTime = 0;
    }
    //clickAudio.play();
}