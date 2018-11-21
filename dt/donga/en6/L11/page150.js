$(document).ready(function(){
	// page js ↓ 
	// Get Ready
	var $btnCheck = $(".btnCheck[data-target='clickQuiz_A']");
	var $btnRe = $(".btnReplay[data-target='clickQuiz_A']");
	var $btnClick = $(".btnClick");
	var $marker = $(".move_pointer");
	var $ansMsg = $(".answer_container .ansMsg");

	$btnClick.on("click", function(e) {
		var $this = $(this);
		var $target = $(e.target);
		var markerNum = $marker.data("num");
		var curNum = markerNum ? markerNum : 0;
		var ansMsg = $this.find(".ansMsg");
		
		$marker.css("transition", "all 1.0s");
		
		if ($ansMsg.hasClass("show")) return;

		if (+this.className.match(/[0-9]/)[0] === curNum + 1 && curNum !== 6) {
			if (curNum < 6) {
				$marker.removeClass("a" + curNum);
			} else {
				return;
			}
			curNum++;
			$marker.data("num", curNum);
			$btnCheck.add($btnRe).addClass("on");
			
			$(".feedOk")[0].play();
			setNeutralize(this.id, "mpText", false);

			ansMsg.addClass("show");
			$this.addClass("done");
			$(".btnReplay[data-target='clickQuiz_A']").addClass("show");
			
			if (curNum < 7) {
				$marker.addClass("a" + curNum);
				if (curNum == 6) {
					$btnClick.each(function() {
						setNeutralize(this.id, "mpText", false);
					});
					$this.nextAll().addClass("done").find(".ansMsg").addClass("show");
					$ansMsg.addClass("show");
				}
			}
		} else {
			if ($target.hasClass("ansMsg")) {
				setNeutralize(this.id, "mpText", false);
			} else {
				if (!$this.hasClass("done")) {
					$(".feedNo")[0].play();
				}
				if (!$marker.hasClass("a6")) setNeutralize(this.id, "mpText", true);
			}
		}
	});

	// 정답 확인
	$btnCheck.on("click", function() {
		$marker.addClass("a6");
		
		$btnClick.each(function() {
			$(this).find(".ansMsg").addClass("show");
			setNeutralize(this.id, "mpText", false);
		});
	});

	// 다시 풀기
	$btnRe.on("click", function() {
		$(".ansMsg").removeClass("show");
		$marker.data("num", 0);
		$btnClick.removeClass("done");
		$(this).removeClass("show");
		$marker.css("transition", "none");
		$marker[0].className = "move_pointer";
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