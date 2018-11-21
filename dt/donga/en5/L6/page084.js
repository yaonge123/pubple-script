$(document).ready(function(){
	// page js ↓
	// Read and check : 색자 넣기
	var color = "#ff6900";
	var $btnCheck = $(".btnCheck[data-target='Quiz_A']");
	var $drawLeave = $(".draw_leave p.mp_text");
	var $drawArr = $(".draw_arrival p.mp_text");
	var array = [[2,3], [3,1], [1,2], [4,4]];
	var mpCheck;

	$drawLeave.on("click", function() {
		var $this = $(this);
		var idx = $drawLeave.index($this);
		
		if (!$btnCheck.hasClass("on")) return;

		clearInterval(mpCheck);
		$drawLeave.add($drawArr).css("color", "");
		$drawArr.eq(array[idx][0] - 1).css("color", color);

		mpCheck = setInterval(function() {
			if (!$this.hasClass("colorOn")) {
				$drawArr.eq(array[idx][0] - 1).css("color","");
				clearInterval(mpCheck);
			}
		}, 10);
	});

	$drawArr.on("click", function() {
		var $this = $(this);
		var idx = $drawArr.index($this);
		
		if (!$btnCheck.hasClass("on")) return;

		clearInterval(mpCheck);
		$drawLeave.add($drawArr).css("color", "");
		$drawLeave.eq(array[idx][1] - 1).css("color", color);

		mpCheck = setInterval(function() {
			if (!$this.hasClass("colorOn")) {
				$drawLeave.eq(array[idx][1] - 1).css("color","");
				clearInterval(mpCheck);
			}
		}, 10);
	});
});