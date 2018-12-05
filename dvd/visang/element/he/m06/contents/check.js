'use strict';
window.addEventListener("DOMContentLoaded", function(){	
	
	// 체크박스, 스마일
	check_init();
	
});

function check_init(){
	var checkWrap = document.getElementsByClassName("checkBtnList");
	var chkEle, chkEleTmp;
	
	for(var i=0, iLen=checkWrap.length; i<iLen; i++){
		chkEle = checkWrap[i].getElementsByTagName("input");
		for(var j=0, jLen=chkEle.length; j<jLen; j++){
			chkEleTmp = chkEle[j];
			if(chkEleTmp.type==="checkbox"){
				chkEleTmp.addEventListener("click", function(){
					var parentsEle, duplication, inputEle, inputEleTmp;
					
					// 디지털교과서 사용자 데이터 삭제
					if(global_dt){
						if(this.checked===false){
							if(typeof parent.API_ANNOTATION_INPUT_DELETE==="function"){
								parent.API_ANNOTATION_INPUT_DELETE(this.getAttribute("id"));	
							}
						}
					}
					
					parentsEle = this;
					while(!parentsEle.classList.contains("checkBtnList")){
						parentsEle = parentsEle.parentNode;
					}
					
					duplication = parentsEle.getAttribute("data-duplication");
					if(duplication!=="true"){
						inputEle = parentsEle.getElementsByTagName("input");
						for(var x=0, xLen=inputEle.length; x<xLen; x++){
							inputEleTmp = inputEle[x];
							if(inputEleTmp.type==="checkbox" && inputEle[x]!==this){
								inputEleTmp.checked = false;
							}
						}
					}
				});
			}
		}
	}
}