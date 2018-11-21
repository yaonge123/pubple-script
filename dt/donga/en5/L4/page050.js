$(document).ready(function(){
	// page js ↓ 
	$(".bullBtn").on("click", function () {
		var _index = $(this).parent().index();
		$(".bullResult .inner").removeClass("show");
		$(".bullResult .inner").eq(_index).addClass("show");
		if(_index == 0){
			stopMediaPlayer("syncA_02");
			stopMediaPlayer("syncA_02");
		}else if(_index == 1){
			stopMediaPlayer("syncA_01");
		}else{
			stopMediaPlayer("syncA_01");
			stopMediaPlayer("syncA_02");
		}
	});

});