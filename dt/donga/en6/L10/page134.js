$(document).ready(function(){
	// page js ↓ 
	// Get Ready
	$(".draw_leave, .draw_arrival").find("li").on("click", function() {
		$(this).find(".ansMsg").addClass("show");
	});

	$(".checkQuizLine").on("click", function() {
		$(".ansMsg").addClass("show");
	});

	$(".resetDrawLine").on("click", function () {
		$(".ansMsg").removeClass("show");
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