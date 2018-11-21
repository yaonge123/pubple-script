$(document).ready(function(){
	// page js ↓ 
	// Get Ready
	var $checkWrap = $(".checkWrap");
	var $btnChkA = $(".btnCheck[data-target='Quiz_A']");
	var $btnReA = $(".btnReplay[data-target='Quiz_A']");
	var ansMsg = $(".answer_container .ansMsg");

	$checkWrap.find("li").on("click", function() {
		var $this = $(this);

		$this.find(".answer_img").addClass("show");
		$this.find("input").addClass("on").prop("checked", true);
		$btnReA.addClass("show");
		$btnChkA.addClass("blind");

		if ($checkWrap.find("input.on").length === 5) ansMsg.addClass("show");
	});

	$checkWrap.find('.checkBox').on("click", function(e) {
		e.stopPropagation();
		$(this).parents("li").find(".answer_img").toggleClass("show");
		var checkedLen = $(".answer_img.show").length;
		
		if (checkedLen) {
			$btnReA.addClass("show");
			$btnChkA.addClass("blind");
		} else {
			$btnReA.removeClass("show");
			$btnChkA.removeClass("blind on");
		}
		if (checkedLen < 5) ansMsg.removeClass("show");
	});

	$btnReA.on("click", function() {
		$(".answer_img").removeClass("show");
		// $checkWrap.find(".checkBox").css("pointer-events", "");
		$checkWrap.find("input").removeClass("on").prop("checked", false);
		$(this).removeClass("show");
		$btnChkA.removeClass("blind");
	});

	$btnChkA.on("click", function() {
		$checkWrap.find(".answer_img").addClass("show");
		// $checkWrap.find(".checkBox").css("pointer-events", "none");
		$checkWrap.find("input").addClass("on").prop("checked", true);
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