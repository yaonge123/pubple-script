$(document).ready(function(){
	// page js ↓ 
	var $btn = $(this).find(".btnToastUp");
	var $dimm = $(".intro_toastDimm");
	$btn.on("click", function(e) {
		resetAllMediaPlayer();
		if( $btn.next().hasClass("show") ){
			$dimm.addClass("show");
		}else{
			$dimm.removeClass("show");
		}
	});

	$dimm.on("click", function(e) {
		resetAllMediaPlayer();
		$dimm.removeClass("show");
	});

	$(".toastContent.intro_bottom").on("click", function(e) {
		if ($(e.target).hasClass("intro_bottom") && $dimm.hasClass("show")) {
			resetAllMediaPlayer();
			$dimm.removeClass("show");
		}
	});
});