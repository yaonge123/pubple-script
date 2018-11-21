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

	// Get Ready : 달력에 스티커 붙이기
	$(".clickEvent .showAnsMsg").on("click", function (e) {
		var _index = $(this).index();
		var _target = $(".drop_container .dropBox").eq(_index).find(".ansMsg");
		if( _target.hasClass("active") ) {
			_target.removeClass("active");
		}else{
			_target.addClass("active");
		}
	});

	var $btnCheck = $(".btnCheck[data-target='dragQuiz_A_1']");
	//var $dragBox = $(".drag_container .dragBox");
	var $dropBox = $(".dropBox[data-drop='3']");
	//var ansMsg = $(".answer_container .ansMsg");
	//var check;

	$btnCheck.on("click", function() {
		if ($(this).hasClass("on")) {
			var img = $("<img>");
			img.attr("src", "images/page066/page066_01_drag_07.png");
			img.appendTo($dropBox);
		}
	});

	// $dragBox.on("mouseup", function() {
	// 	check = true;

	// 	setTimeout(function() {
	// 		$dragBox.each(function() {
	// 			if (!$(this).hasClass("blind")) check = false;
	// 		});
	// 		if (check) ansMsg.addClass("show");
	// 	}, 0);
	// });
});