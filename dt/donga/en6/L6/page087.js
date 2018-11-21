$(document).ready(function(){
	// page js ↓ 
	// STEP3
	$("[data-target='Quiz_A1']").on("click", function() {
		$(".ex_img").toggleClass("show");
	});
	
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
});