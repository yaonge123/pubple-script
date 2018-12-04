
$(document).ready(function(){
	lineClickEvent();
	
	$(".lineCheck").click(function(){
		if($(this).hasClass("answer")){
			$(".lineClick").find("svg").remove();
			lineClickEvent();
			$(this).removeClass("answer");
			
		}else{
			$(".lineStart").each(function(){
				var $click = $(this); 
				var scope = "." + $click.data("scope");
				var join = ($click.data("join")).toString().split(",");
				
				for(var i=0; i<join.length; i++){
					$(scope + " .lineEnd").each(function(){
						if(join[i]==$(this).data("num")){
							
							var dotW = $(".lineClick ul li").width() / 2;
							var dotH = $(".lineClick ul li").height() / 2;
							
							var startX = parseInt($click.css("left").replace("px", "")) + dotW;
							var startY = parseInt($click.css("top").replace("px", "")) + dotH;
							var endX = "";
							var endY = "";
							
							var matrix  = $('#contentContainer').css('transform').match(/-?[\d\.]+/g);
						    var hRatio = matrix[0];
						    var vRatio = matrix[3];
						    var agt = navigator.userAgent.toLowerCase();
							if (agt.indexOf("chrome") != -1){
								endX = parseInt($(this).css("left").replace("px", "")) + dotW;
								endY = parseInt($(this).css("top").replace("px", "")) + dotH;
							}else{
								endX = $(this).position().left / hRatio + dotW;
								endY = $(this).position().top / vRatio + dotH;
							}
							
							var svgEle = "<svg style='width:100%; height:100%; position:absolute; top:0; left:0;'>";
							svgEle += "<line x1='" + startX + "' y1='" + startY + "' x2='" + endX + "' y2='" + endY + "' style='stroke:rgb(255,0,0); stroke-width:2'/>";
							svgEle += "</svg>"
							
							$click.parents(".lineClick").append(svgEle);
						}
					});
				}
			});
			lineClickEventOff();
			$(this).addClass("answer");
		}
	});
});

function lineClickEvent(){
	$(".lineClick").each(function(){
		var $scope = $(this);
		$scope.find(".lineStart").click(function(){			
			if(!$(this).hasClass("lineEnd")){
				$scope.find(".lineStart").removeClass("click");
				$(this).addClass("click");
			}			
		});
		
		$scope.find(".lineEnd").click(function(){
			var $click = $scope.find(".lineStart.click");
			
			if($click.length==1 && $(this).parent("ul").hasClass($click.data("scope"))){
				var join = ($click.data("join")).toString().split(",");
				var thisNum = $(this).data("num");
				
				var tmp = false;
				for(var i=0; i<join.length; i++){
					if(join[i]==thisNum){
						tmp = true;
						break;
					} 
				}
				
				var dotW = $scope.find("ul li").width() / 2;
				var dotH = $scope.find("ul li").height() / 2;
				
				var startX = parseInt($click.css("left").replace("px", "")) + dotW;
				var startY = parseInt($click.css("top").replace("px", "")) + dotH;
				var endX = "";
				var endY = "";
				
				var matrix  = $('#contentContainer').css('transform').match(/-?[\d\.]+/g);
			    var hRatio = matrix[0];
			    var vRatio = matrix[3];
			    var agt = navigator.userAgent.toLowerCase();
				if (agt.indexOf("chrome") != -1){
					endX = parseInt($(this).css("left").replace("px", "")) + dotW;
					endY = parseInt($(this).css("top").replace("px", "")) + dotH;
				}else{
					endX = $(this).position().left / hRatio + dotW;
					endY = $(this).position().top / vRatio + dotH;
				}
				
				if(tmp){
					var svgEle = "<svg style='width:100%; height:100%; position:absolute; top:0; left:0;'>";
					svgEle += "<line x1='" + startX + "' y1='" + startY + "' x2='" + endX + "' y2='" + endY + "' style='stroke:rgb(255,0,0); stroke-width:2'/>";
					svgEle += "</svg>"
					$scope.append(svgEle);
					$scope.find(".lineStart").removeClass("click");
					$(this).addClass("click");
					
					audioKill();
					$(".feedAudio_ok").trigger("play");
					
				}else{
					audioKill();
					$(".feedAudio").trigger("play");
				}
			}else{
				$scope.find(".lineStart").removeClass("click");
				$(this).addClass("click");
			}
		});
	});
}

function lineClickEventOff(){
	$(".lineClick").each(function(){
		$(this).find(".lineStart").off("click");
		$(this).find(".lineEnd").off("click");
	});
}

function audioKill(){
	$(".feedAudio_ok").trigger("pause");
	$(".feedAudio_ok").prop("currentTime", 0);
	$(".feedAudio").trigger("pause");
	$(".feedAudio").prop("currentTime", 0);
}