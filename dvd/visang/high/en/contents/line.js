'use strict';
window.addEventListener("DOMContentLoaded", function(){
	
	// 선긋기 항목 선택 관련 내용
	checkQuizLine_init();
	// 선긋기 정답 확인
	checkQuizLine_correctBtn();
	
});

function checkQuizLine_init(){
	var quizPart = document.getElementsByClassName("lineClick");
	var selectItem;
	
	// 문제풀이 가능 여부
	if(global_solve){
		for(var j=0, jLen=quizPart.length; j<jLen; j++){
			selectItem = quizPart[j].getElementsByClassName("dot");
			
			for(var k=0, kLen=selectItem.length; k<kLen; k++){
				selectItem[k].addEventListener("click", function(){
					var dotEle, dotEleTmp, selEle;
					var correctYn, join, idxEle, index;
					var startX, startY, endX, endY, svgEle, lineEle;
					
					var dot = document.getElementsByClassName("dot")[0];
					var dotW = dot.offsetWidth / 2;
					var dotH = dot.offsetHeight / 2;
					
					var parentsEle = this;
					while(!parentsEle.classList.contains("lineClick")){
						parentsEle = parentsEle.parentNode;
					}
					
					if(this.classList.contains("sDot")){
						dotEle = parentsEle.getElementsByClassName("eDot");
						selClassRemove(parentsEle, "sDot");
					}else{
						dotEle = parentsEle.getElementsByClassName("sDot");
						selClassRemove(parentsEle, "eDot");
					}
					
					this.classList.add("sel");
					
					selEle = null;
					for(var d=0, dLen=dotEle.length; d<dLen; d++){
						dotEleTmp = dotEle[d];
						if(dotEleTmp.classList.contains("sel")){
							selEle = dotEleTmp;
							break;
						}
					}
					
					if(selEle!==null){
						correctYn = false;
						if(this.classList.contains("eDot")){
							join = selEle.getAttribute("data-join").split(" ");
							idxEle = parentsEle.getElementsByClassName("eDot");
							
							for(var x=0, xLen=idxEle.length; x<xLen; x++){
								if(this===idxEle[x]){
									index = x+1;
									correctYn = true;
									break;
								}
							}
							
						}else{
							join = this.getAttribute("data-join").split(" ");
							idxEle = parentsEle.getElementsByClassName("eDot");
							
							for(var x=0, xLen=idxEle.length; x<xLen; x++){
								if(selEle===idxEle[x]){
									index = x+1;
									correctYn = true;
									break;
								}
							}							
						}
						
						for(var y=0, yLen=join.length; y<yLen; y++){
							if(correctYn===true && parseInt(join[y])===index){
								startX = selEle.offsetLeft + dotW;
								startY = selEle.offsetTop + dotH;

								endX = this.offsetLeft + dotW;
								endY = this.offsetTop + dotH;

								svgEle = document.createElementNS("http://www.w3.org/2000/svg", "svg");
								svgEle.classList.add("draw_svg");
								
								lineEle = document.createElementNS("http://www.w3.org/2000/svg", "line");
								lineEle.setAttribute("x1", startX);
								lineEle.setAttribute("y1", startY);
								lineEle.setAttribute("x2", endX);
								lineEle.setAttribute("y2", endY);
								lineEle.classList.add("draw_line");

								svgEle.appendChild(lineEle);
								parentsEle.appendChild(svgEle);
								
								selClassRemove(parentsEle, "dot");
								
								selEle.classList.add("lineChk");
								this.classList.add("lineChk");
								
								break;
							}
						}
					}
				});
			}
		}
	}
}

function selClassRemove(scope, dot){
	var allDot = scope.getElementsByClassName(dot);
	for(var i=0, iLen=allDot.length; i<iLen; i++){
		allDot[i].classList.remove("sel");
	}
}

function checkQuizLine_correctBtn(){
	var quizBtn = document.getElementsByClassName("checkQuizLine");
	
	for(var i=0, iLen=quizBtn.length; i<iLen; i++){
		quizBtn[i].addEventListener("click", function(){
			var quiz = document.getElementsByClassName("quizType");
			var quizScope = this.getAttribute("data-target");
			var quizTmp, quizId, quizType;
			
			for(var j=0, jLen=quiz.length; j<jLen; j++){
				quizTmp = quiz[j];
				quizId = quizTmp.getAttribute("data-qid");
				quizType = quizTmp.getAttribute("data-question-type");
				
				if(quizId===quizScope && quizType==="drawQuiz"){
					// 문제풀이 가능 여부
					if(global_solve){
						// 정답 확인 실행
						checkQuizLine(quizTmp, quizScope);
					}else{
						// 정답 확인 실행
						checkQuizLine_noSolve(quizTmp, quizScope);
					}
				}
			}
		});
	}
}

function checkQuizLine(quizEle, quizScope){
	var quizPartTmp;
	var sDotEle, sDotEleTmp, lineCnt, join, joinTmp, svgCnt;
	var markingEle, markingEleTmp, dotEle, svgEle, removeEle, quizHint;
	var eDotEle, startX, startY, endX, endY, lineEle;
		
	var quizFeedYn = quizEle.getAttribute("data-feedBack");
	var quizFeedChance = quizEle.getAttribute("data-chance");

	var quizCheckingYn = quizEle.getAttribute("data-check");
	var quizMarkingYn = quizEle.getAttribute("data-marking");
	
	var quizHintYn = quizEle.getAttribute("data-hint");
	
	// 정답 확인 유무 판별
	var quizCheckYn = quizEle.classList.contains("quizChk");
	
	var quizPart = quizEle.getElementsByClassName("lineClick");
	var quizCheck = true;
	
	var dot = document.getElementsByClassName("dot")[0];
	var dotW = dot.offsetWidth / 2;
	var dotH = dot.offsetHeight / 2;

	// 피드백 제공		
	if(quizCheckYn===false && quizFeedYn==="true"){
		if(common_feedBackCheck(quizEle)){
			common_feedBackText(1);
			return false;
		}
	}
	
	var feedCnt =  parseInt(quizEle.getAttribute("data-feedCnt")) || 1;
	// 힌트 제공
	if(quizCheckYn===false && quizHintYn==="true" && feedCnt===1){
		common_hintBtn(quizScope, true);	
	}
	
	// 정답 확인
	if(quizCheckingYn==="true" || quizMarkingYn==="true"){
		sDotEle = quizEle.getElementsByClassName("sDot");
		lineCnt = 0;
		for(var y=0, yLen=sDotEle.length; y<yLen; y++){
			join = sDotEle[y].getAttribute("data-join").split(" ");
			lineCnt += join.length;
		}
		svgCnt = quizEle.getElementsByTagName("svg").length;
		if(lineCnt!==svgCnt){
			quizCheck = false;
		}
	}
	
	// 찬스 제공
	if(quizCheckYn===false && quizCheck===false && quizFeedChance>1){
		if(feedCnt<quizFeedChance){
			quizEle.setAttribute("data-feedCnt", parseInt(feedCnt)+1);
			common_feedBackText(4);
			return false;
		}
	}
	
	if(quizCheckYn){
		// 마킹 초기화
		if(quizMarkingYn==="true"){
			markingEle = document.getElementsByClassName("quizMarking");
			for(var x=0, xLen=markingEle.length; x<xLen; x++){
				markingEleTmp = markingEle[x];
				if(markingEleTmp.getAttribute("data-marking")===quizScope){
					markingEleTmp.classList.remove("correct");
					markingEleTmp.classList.remove("wrong");
				}
			}
		}
		
		// 입력 항목 초기화
		dotEle = quizEle.getElementsByClassName("dot");
		for(var x=0, xLen=dotEle.length; x<xLen; x++){
			dotEle[x].classList.remove("lineChk");
		}
		
		svgEle = quizEle.getElementsByTagName("svg");
		removeEle = svgEle[0];
		while(removeEle!==undefined){
			removeEle.parentNode.removeChild(removeEle);
			removeEle = svgEle[0];
		}

		// 버튼 토글
		common_btnToggle(quizScope);
		
		// 힌트 초기화
		common_hintBtn(quizScope, false);
		
		quizHint = quizEle.getElementsByClassName("hintMessage");
		for(var k=0, kLen=quizHint.length; k<kLen; k++){
			quizHint[k].classList.remove("show");
		}
		
		quizEle.classList.remove("quizChk");
		quizEle.classList.remove("quizHintChk");
		quizEle.classList.remove("correct");
		quizEle.classList.remove("wrong");
		quizEle.setAttribute("data-feedCnt", 1);
		
	}else{
		// 정답 표시
		for(var x=0, xLen=quizPart.length; x<xLen; x++){
			quizPartTmp = quizPart[x];
			sDotEle = quizPartTmp.getElementsByClassName("sDot");
			eDotEle = quizPartTmp.getElementsByClassName("eDot");
			
			for(var y=0, yLen=sDotEle.length; y<yLen; y++){
				sDotEleTmp = sDotEle[y];
				join = sDotEleTmp.getAttribute("data-join").split(" ");
				
				for(var d=0, dLen=join.length; d<dLen; d++){
					joinTmp = join[d]-1;

					startX = sDotEleTmp.offsetLeft + dotW;
					startY = sDotEleTmp.offsetTop + dotH;

					endX = eDotEle[joinTmp].offsetLeft + dotW;
					endY = eDotEle[joinTmp].offsetTop + dotH;

					svgEle = document.createElementNS("http://www.w3.org/2000/svg", "svg");
					svgEle.classList.add("draw_svg");
					
					lineEle = document.createElementNS("http://www.w3.org/2000/svg", "line");
					lineEle.setAttribute("x1", startX);
					lineEle.setAttribute("y1", startY);
					lineEle.setAttribute("x2", endX);
					lineEle.setAttribute("y2", endY);
					lineEle.classList.add("draw_line");

					svgEle.appendChild(lineEle);
					quizPartTmp.appendChild(svgEle);
					
					selClassRemove(quizPartTmp, "dot");
				}
			}
		}
		
		// 피드백 제공
		if(quizFeedYn==="true" && (quizCheckingYn==="true" || quizMarkingYn==="true")){
			if(quizCheck){
				common_feedBackText(2);
			}else{
				common_feedBackText(3);
			}
		}
		// 정오답 채점
		if(quizMarkingYn==="true"){
			markingEle = document.getElementsByClassName("quizMarking");
			for(var x=0, xLen=markingEle.length; x<xLen; x++){
				markingEleTmp = markingEle[x];
				if(markingEleTmp.getAttribute("data-marking")===quizScope){
					if(quizCheck){
						markingEleTmp.classList.add("correct");
					}else{
						markingEleTmp.classList.add("wrong");
					}
				}
			}
		}
		quizEle.classList.add("quizChk");
		
		if(quizCheck){
			quizEle.classList.add("correct");
		}else{
			quizEle.classList.add("wrong");
		}
		
		// 버튼 토글
		common_btnToggle(quizScope);
	}
}

function checkQuizLine_noSolve(quizEle, quizScope){
	var quizPartTmp;
	var sDotEle, sDotEleTmp, join;
	var dotEle, svgEle, removeEle;
	var eDotEle, dotW, dotH, startX, startY, endX, endY, lineEle;
	
	// 정답 확인 유무 판별
	var quizCheckYn = quizEle.classList.contains("quizChk");
	
	var quizPart = quizEle.getElementsByClassName("lineClick");
	
	if(quizCheckYn){
		// 입력 항목 초기화
		dotEle = quizEle.getElementsByClassName("dot");
		for(var x=0, xLen=dotEle.length; x<xLen; x++){
			dotEle[x].classList.remove("lineChk");
		}
		
		svgEle = quizEle.getElementsByTagName("svg");
		removeEle = svgEle[0];
		while(removeEle!==undefined){
			removeEle.parentNode.removeChild(removeEle);
			removeEle = svgEle[0];
		}

		// 버튼 토글
		common_btnToggle(quizScope);

		quizEle.classList.remove("quizChk");
		
	}else{
		// 정답 표시
		for(var x=0, xLen=quizPart.length; x<xLen; x++){
			quizPartTmp = quizPart[x];
			sDotEle = quizPartTmp.getElementsByClassName("sDot");
			eDotEle = quizPartTmp.getElementsByClassName("eDot");
			
			for(var y=0, yLen=sDotEle.length; y<yLen; y++){
				sDotEleTmp = sDotEle[y];
				join = sDotEleTmp.getAttribute("data-join").split(" ");
				
				for(var d=0, dLen=join.length; d<dLen; d++){
					joinTmp = join[d]-1;
					dotW = document.getElementsByClassName("dot")[0].offsetWidth / 2;
					dotH = document.getElementsByClassName("dot")[0].offsetWidth / 2;
					
					startX = sDotEleTmp.offsetLeft + dotW;
					startY = sDotEleTmp.offsetTop + dotH;

					endX = eDotEle[joinTmp].offsetLeft + dotW;
					endY = eDotEle[joinTmp].offsetTop + dotH;

					svgEle = document.createElementNS("http://www.w3.org/2000/svg", "svg");
					svgEle.classList.add("draw_svg");
					
					lineEle = document.createElementNS("http://www.w3.org/2000/svg", "line");
					lineEle.setAttribute("x1", startX);
					lineEle.setAttribute("y1", startY);
					lineEle.setAttribute("x2", endX);
					lineEle.setAttribute("y2", endY);
					lineEle.classList.add("draw_line");

					svgEle.appendChild(lineEle);
					quizPartTmp.appendChild(svgEle);
					
					selClassRemove(quizPartTmp, "dot");
				}
			}
		}
		
		quizEle.classList.add("quizChk");
		
		// 버튼 토글
		common_btnToggle(quizScope);
	}
}

