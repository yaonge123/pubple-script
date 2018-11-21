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

	//Get Ready : 사고 싶은 물건 고르기
	var content = $(".active_area.n1");
	var $layer = content.find(".layer");
	var $bubbleBox = content.find(".bubble_box");
	
	var $btnCheck = content.find(".btnCheck");
	var $btnReplay = content.find(".btnReplay");
	var ansMsg = content.find(".answer_container .ansMsg");
	var mpTxt = content.find(".bubble_txt.mp_text");

	$layer.on("click", function() {
		var idx = $layer.index($(this));

		$(this).addClass("on");
		$bubbleBox.eq(idx).addClass("show");
		$btnCheck.add($btnReplay).addClass("on");
		mpTxt.eq(idx).click();
		
		if ($(".layer.on").length === 8) ansMsg.addClass("show");
	});

	$btnCheck.on("click", function() {
		$layer.addClass("on");
		$bubbleBox.addClass("show");
	});
	
	$btnReplay.on("click", function() {
		$layer.removeClass("on");
		$bubbleBox.removeClass("show");
	});
});