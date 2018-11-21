$(document).ready(function(){
	// page js ↓
	// step1
	var $btnCheck = $(".btnCheck[data-target='Quiz_A']");
	var $btnReplay = $(".btnReplay[data-target='Quiz_A']");
	var $eachMark = $(".each_marking");

	$btnCheck.on("click", function() {
		$eachMark.addClass("show");
	});

	$btnReplay.on("click", function () {
		$eachMark.removeClass("show");
	});
});