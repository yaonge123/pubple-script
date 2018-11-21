$(document).ready(function(){
	// page js ↓ 
	// Check Together
	$(".checkWrap").each(function(){
		var $state = $(this).data("type");
		if( $state == "smileCheck"){
			var $smilebox = $(".checkBox");

			$smilebox.on("click", function(e) {
				e.preventDefault();

				var $this = $(this);
				var $input = $this.prev();
				var $checkWrap = $input.parents(".checkWrap");
				var $inputAll = $checkWrap.find("input");
				var $inputIdx = $inputAll.index($input);

				$inputAll.removeClass("on");
				$inputAll.prop("checked", false);

				for(var i = 0; i < $inputIdx + 1; i++){
					$($inputAll[i]).addClass("on");
					$($inputAll[i]).prop("checked", true);
				}
			});
		}
	});

	// Step 3 : 친구 얼굴 보여주기
	$(".btnCheck[data-target='Quiz_A']").on("click", function() {
		$(".quiz_hide_img").addClass("show");
	});
	$(".btnReplay[data-target='Quiz_A']").on("click", function() {
		$(".quiz_hide_img").removeClass("show");
	});
});