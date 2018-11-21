$(document).ready(function(){
	// page js ↓ 
	// Get Ready
	var target = "Quiz_A";
	var $btnCheck = $(".btnCheck[data-target='"+ target +"']");
	var $btnReplay = $(".btnReplay[data-target='"+ target +"']");
	var $quizType = $(".quizType[data-qid='"+ target +"']");
	var ansMsg = $(".answer_container .ansMsg");

	var checkBox = $quizType.find(".t");
	var checkInp = $quizType.find("input[type='checkbox']");

	checkBox.on("click", function() {
		var checked = true;

		$btnCheck.add($btnReplay).addClass("on");
		setTimeout(function() {
			checkInp.each(function() {
				if (!$(this).prop("checked")) checked = false;
			});
			
			if (checked) ansMsg.addClass("show");
		}, 0);
	});

	$btnCheck.on("click", function() {
		checkInp.each(function() {
			$(this).prop("checked", true);
		});
	});

	$btnReplay.on("click", function() {
		checkInp.each(function () {
			$(this).prop("checked", false);
		});
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