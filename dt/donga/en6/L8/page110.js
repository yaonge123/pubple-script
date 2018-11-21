$(document).ready(function(){
	// page js ↓
	// Sing and Read
	$(".quiz_drag").find(".dropBox").on("click", function () {
		var $dragBox = $(this).find(".dragBox");
		var mpTextId, mpAudio;

		$(".quiz_drag").find(".dropBox .dragBox").removeClass("colorOn");

		if ($dragBox.length) {
			mpTextId = "#" + $dragBox.data("mpid");
			$(mpTextId).click();
			$dragBox.addClass("colorOn");
			mpAudio = $(mpTextId).find("audio")[0];

			if (!mpAudio) return;
			mpAudio.onended = function () {
				$dragBox.removeClass("colorOn");
			}

			mpAudio.onpause = function () {
				$dragBox.removeClass("colorOn");
			}
		}
	});
});