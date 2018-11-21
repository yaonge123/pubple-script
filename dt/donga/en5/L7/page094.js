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
	var $list = $(".checkWrap").find("li");
	var $btnCheck = $(".btnCheck");
	var mpTxt = $(".dropBox .mp_text")

	$list.on("click", function() {
		var $this = $(this);
		var idx = $this.index();

		$this.children().removeClass("hide");
		$(".dropBox").eq(idx).removeClass("hide");
		$this.addClass("on");
		$btnCheck.addClass("on");
		mpTxt.eq(idx).click();
		
		if ($(".checkWrap").find("li.on").length === 6) {
			$(".answer_container .ansMsg").addClass("show");
		}
	});

	$btnCheck.on("click", function() {
		$(".dropBox").removeClass("hide");
		$list.children().removeClass("hide");
	});

	$(".btnReplay").on("click", function () {
		$(".dropBox").addClass("hide");
		$list.removeClass("on");
		$list.children().addClass("hide");
	});
});