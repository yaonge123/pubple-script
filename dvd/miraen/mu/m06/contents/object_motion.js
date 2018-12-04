$(document).ready(function(){
  if($('#noteNavWrap').length === 1) {
    //$("#contentsWrap").css("opacity", "1");
  }
	$("#titleWrap").each(function(){
		// $("#contentsWrap").css("opacity", "0");
		$("#titleWrap").css({/*"opacity":"0", */"margin-left":"54px"});
		$("#titleWrap").stop().animate({"margin-left" : "40px", "opacity" : "1"}, 500, function(){
			// $("#contentsWrap").css("opacity", "0");
			$("#contentsWrap").animate({"opacity":1}, 400);
		});
	});
	$("#noteNavWrap").each(function(){
		$("#noteNavWrap").stop().animate({"opacity" : "1"}, 500, function(){
			$("#contentsWrap").animate({"opacity":1}, 400);
		});
	});
	select_motionObj("#pageMotion1");
});

function select_motionObj(motionId){
	var $scope = $(motionId + " .mSync");
	$scope.stop(true);
	$scope.css("opacity","0");
	$scope.each(function(){
		var $tmpScope = $(this);
		var sync =  $tmpScope.data("motion-sync");
		var position =  $tmpScope.data("motion-position");
		
		var time = 400;
		var setTime = 400;
		var startPosition;
		var endPosition;
		
		var tabYn = $(motionId).parents().find(".tabContent").length;
		if($("#titleWrap").length==0 || (motionId!="#pageMotion1" && tabYn==1)){
			if(sync==1) setTime = 1;
			else sync = sync -1;
		}

		if(position=="top"){
			if($tmpScope.data("endPosition")==undefined) $tmpScope.data("endPosition", $tmpScope.css("margin-top").replace("px", ""));
			endPosition = $tmpScope.data("endPosition");
			startPosition =  parseInt(endPosition) - 20;
			$tmpScope.css("margin-top", startPosition + "px");
			
			setTimeout(function(){
				$tmpScope.animate({"margin-top":endPosition + "px", "opacity":1}, time);
			}, setTime * sync);
			
		}else if(position=="bottom"){
			if($tmpScope.data("endPosition")==undefined) $tmpScope.data("endPosition", $tmpScope.css("margin-top").replace("px", ""));
			endPosition = $tmpScope.data("endPosition");
			startPosition =  parseInt(endPosition) + 20;
			$tmpScope.css("margin-top", startPosition + "px");

			setTimeout(function(){
				$tmpScope.animate({"margin-top":endPosition + "px", "opacity":1}, time);
			}, setTime * sync);
			
		}else if(position=="left"){
			if($tmpScope.data("endPosition")==undefined) $tmpScope.data("endPosition", $tmpScope.css("margin-left").replace("px", ""));
			endPosition = $tmpScope.data("endPosition");
			startPosition =  parseInt(endPosition) - 20;
			$tmpScope.css("margin-left", startPosition + "px");
			
			setTimeout(function(){
				$tmpScope.animate({"margin-left":endPosition + "px", "opacity":1}, time);
			}, setTime * sync);
			
		}else if(position=="right"){
			if($tmpScope.data("endPosition")==undefined) $tmpScope.data("endPosition", $tmpScope.css("margin-left").replace("px", ""));
			endPosition = $tmpScope.data("endPosition");
			startPosition =  parseInt(endPosition) + 20;
			$tmpScope.css("margin-left", startPosition + "px");

			setTimeout(function(){
				$tmpScope.animate({"margin-left":endPosition + "px", "opacity":1}, time);
			}, setTime * sync);
			
		}
	});
}