$(document).ready(function(){
	// page js ↓ 
	// Get Ready
	$(".dragBox").on("mouseup touchend", function() {
		if ($(".dropBox").find(".ansMsg.show").length === 4) {
			$(".answer_container").find(".ansMsg").addClass("show");
		}
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