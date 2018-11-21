'use strict';
window.addEventListener("DOMContentLoaded", function(){
	// 레이어 퀴즈 입력 항목 관련 내용
	layerQuiz_init();
	// 레이어 퀴즈 정답 확인
	layerQuiz_correctBtn();
});

function layerQuiz_init(){
	var quizPart = document.getElementsByClassName("layerWrite");
	var quizPartLen = quizPart.length;
	var quizItem = document.getElementsByClassName("layerItem");
	var jLen = quizItem.length;
	var quizPartTmp;
	var quizBox, quizItemTmp;
	var quiz, quizType, quizCorrect, answerStr;
	var i, j;
	
	// 문제풀이 가능 여부
	if (global_solve) {
		for (i = 0; i < quizPartLen; i++) {
			quizPart[i].addEventListener("click", function() {
				var position = (this.getAttribute("data-position")).split(" ");
				var parentsEle = this.closest(".quizType");
				var layerBoxClone;
				var moveTarget = this.parentElement;
				
				if (!parentsEle.classList.contains("quizChk")) {
					quizBox = parentsEle.getElementsByClassName("layerBox")[0];
					quizBox.classList.add("show");
				
					// data-position이 0 0 인 경우, layerBox 요소 위치 이동
					if (position[0] === "0" && position[1] === "0") {
						layerBoxClone = quizBox.cloneNode(true);
						moveTarget.insertBefore(layerBoxClone, moveTarget.firstElementChild);
						// quizBox.remove();
						quizBox.parentElement.removeChild(quizBox);

					} else {
						quizBox.setAttribute("style", "top:" + position[0] + "px;left:" + position[1] + "px;");
					}

					this.classList.add("sel");

					// 레이어 버튼 선택시
					for (j = 0; j < jLen; j++) {
						quizItem[j].addEventListener("click", function () {
							var content = this.getAttribute("data-content") || this.textContent;
							var quizPart = document.getElementsByClassName("layerWrite");
							var i, quizPartTmp;

							for (i = 0; i < quizPartLen; i++) {
								quizPartTmp = quizPart[i];

								if (quizPartTmp.classList.contains("sel")) {
									if (quizPartTmp.value === content) {
										// 같은 답 선택시 비우기
										// content = "";
										if (global_dt) {
											if (typeof parent.API_ANNOTATION_INPUT_DELETE === "function") {
												parent.API_ANNOTATION_INPUT_DELETE(quizPartTmp.getAttribute("id"));
											}
										}
									}
									quizPartTmp.value = content;

									// 레이어 초기화
									layerQuiz_removeBox();
									this.parentNode.classList.remove("show");
								} else {
									// 중복 선택 가능하도록 주석 처리
									// if (quizPartTmp.value === content) {
									// 	quizPartTmp.value = "";
									// }
								}
							}
						});
					}	
				}
			});
		}
	}
	
	// data-content 속성이 없을 경우 답안, 입력값 동일하게 처리
	quiz = document.getElementsByClassName("quizType");
	for (var i=0, iLen=quiz.length; i<iLen; i++) {
		quizPartTmp = quiz[i];
		quizType = quizPartTmp.getAttribute("data-question-type");
		
		if (quizType==="layerQuiz") {
			quizPart = quizPartTmp.getElementsByClassName("layerAnswer");
			quizItem = quizPartTmp.getElementsByClassName("layerItem");
			answerStr = quizPartTmp.getElementsByClassName("answerCorrect")[0].textContent;
			quizCorrect = answerStr.split("//");

			if (!answerStr) {
				return;
			}

			for (var j=0, jLen=quizItem.length; j<jLen; j++) {
				quizItemTmp = quizItem[j];
				if (quizItemTmp.getAttribute("data-content") === null) {
					quizPart[quizCorrect[j]-1].textContent = quizItemTmp.textContent;
				}
			}
		}
	}
}

function layerQuiz_removeBox(){
	var quizPart = document.getElementsByClassName("layerWrite");
	var quizBox = document.getElementsByClassName("layerBox");
	
	for(var i=0, iLen=quizPart.length; i<iLen; i++){
		quizPart[i].classList.remove("sel");
	}
	
	for(var j=0, jLen=quizBox.length; j<jLen; j++){
		quizBox[j].classList.remove("show");
	}
}

function layerQuiz_correctBtn() {
	var quizBtn = document.getElementsByClassName("checkQuizLayer");
	var quizBtnLen = quizBtn.length;
	var eachBtn = document.getElementsByClassName("eachBtn");
	var i;

	for (i = 0; i < quizBtnLen; i++) {
		quizBtn[i].addEventListener("click", function(e) {
			var btn = e.target;
			// 레이어 초기화
			layerQuiz_removeBox();
			
			var quiz = document.getElementsByClassName("quizType");
			var quizScope = this.getAttribute("data-target");
			var quizTmp, quizId, quizType;
			
			for (var j=0, jLen=quiz.length; j<jLen; j++) {
				quizTmp = quiz[j];
				quizId = quizTmp.getAttribute("data-qid");
				quizType = quizTmp.getAttribute("data-question-type");
				
				if (quizId === quizScope && quizType === "layerQuiz") {
					// 문제풀이 가능 여부
					if (global_solve) {
						// 정답 확인 실행
						layerQuiz(quizTmp, quizScope, btn);
					} else {
						// 정답 확인 실행
						layerQuiz_noSolve(quizTmp, quizScope);
					}
				}
			}
		});
	}
	
	if(!global_solve){
		// each 버튼 이벤트
		for(var i=0, iLen=eachBtn.length; i<iLen; i++){
			eachBtn[i].addEventListener("click", function(){
				var quizId, quizType, preEle, quizChkYn;
				var targetEle, quizEachBtn, quizEachBtnTmp, childEle, childEleData, quizBtn, quizBtnData;
				var replayYn;
				
				var parentsEle = this;
				while(!parentsEle.classList.contains("quizType")){
					parentsEle = parentsEle.parentNode;
				}
				
				quizId = parentsEle.getAttribute("data-qid");
				quizType = parentsEle.getAttribute("data-question-type");
				
				if(quizType==="layerQuiz"){
					preEle = this.previousElementSibling;
					quizChkYn = this.classList.contains("on");
					
					if(preEle.classList.contains("layerAnswer")){
						targetEle = preEle;
					}else{
						childEle = preEle.children;
						for(var j=0, jLen=childEle.length; j<jLen; j++){
							childEleData = childEle[j];
							if(childEleData.classList.contains("layerAnswer")){
								targetEle = childEleData;
							}
						}
					}
					
					quizEachBtn = parentsEle.getElementsByClassName("eachBtn");
					if(quizChkYn){
						targetEle.classList.remove("show");
						this.classList.remove("on");
					}else{
						targetEle.classList.add("show");
						this.classList.add("on");
					}
					
					replayYn = true;
					for(var k=0, kLen=quizEachBtn.length; k<kLen; k++){
						if(!quizEachBtn[k].classList.contains("on")){
							replayYn = false;
							break;
						}
					}
					
					quizBtn = document.getElementsByClassName("checkQuizLayer");
					for(var x=0, xLen=quizBtn.length; x<xLen; x++){
						quizBtnData = quizBtn[x];
						if(quizBtnData.getAttribute("data-target")===quizId){
							if(replayYn && !quizBtnData.classList.contains("replay")){
								parentsEle.classList.add("quizChk");
								quizBtnData.classList.add("replay");
							}else if(!replayYn && quizBtnData.classList.contains("replay")){
								parentsEle.classList.remove("quizChk");
								quizBtnData.classList.remove("replay");
							}
						}
					}
				}
			});
		}
	}
}

function layerQuiz(quizEle, quizScope, btn) {
	var quizPartTmp;
	var markingEle, markingEleTmp, deleteStr, quizInpCorrect, quizHint;
	
	var quizFeedYn = quizEle.getAttribute("data-feedBack");
	var quizFeedChance = quizEle.getAttribute("data-chance");
	
	var quizCheckingYn = quizEle.getAttribute("data-check");
	var quizMarkingYn = quizEle.getAttribute("data-marking");
	
	var quizHintYn = quizEle.getAttribute("data-hint");
	
	// 정답 확인 유무 판별
	var quizCheckYn = quizEle.classList.contains("quizChk");
	
	var quizPart = quizEle.getElementsByClassName("layerWrite");
	var quizCheck = true;
	var answerStr = quizEle.getElementsByClassName("answerCorrect")[0].textContent;
	var quizCorrect = answerStr.split("//");
		
	var isReplay = btn.classList.contains("btnReplay");
	// 입력 항목 초기화만 실행
	var isNoMark = quizEle.classList.contains("noMark");

	var essayInputs, inputLen, i;

	var initQuiz = function(chkAnswer) {
		deleteStr = "";

		for (var k = 0, kLen = quizPart.length; k < kLen; k++) {
			quizPartTmp = quizPart[k];
			if (!chkAnswer) {
				quizPartTmp.value = "";
			}
			quizPartTmp.disabled = false;

			// 디지털교과서 사용자 데이터 삭제
			if (global_dt) {
				deleteStr += kData.getAttribute("id") + ",";
			}
		}

		quizInpCorrect = quizEle.getElementsByClassName("layerAnswer");
		for (var x = 0, xLen = quizInpCorrect.length; x < xLen; x++) {
			quizInpCorrect[x].classList.remove("show");
		}
		quizEle.classList.remove("quizChk");


		// 주관식이 함께 있는 경우
		essayInputs = document.getElementsByClassName("essayWrite");
		inputLen = essayInputs.length;

		for (i = 0; i < inputLen; i++) {
			essayInputs[i].value = "";
		}
	}

	if (isNoMark || isReplay) {
		initQuiz();
		return;
	}
	
	// 피드백 제공
	if(quizCheckYn===false && quizFeedYn==="true"){
		if(common_feedBackCheck(quizEle)){
			common_feedBackText(1);
			return false;
		}
	}

	var feedCnt = parseInt(quizEle.getAttribute("data-feedCnt")) || 1;
	// 힌트 제공
	if(quizCheckYn===false && quizHintYn==="true" && feedCnt===1){
		common_hintBtn(quizScope, true);	
	}
	
	// 정답 확인
	if(quizCheckingYn==="true" || quizMarkingYn==="true"){
		quizCheck = layerQuiz_correctCheck(quizEle);
	}
	
	// 찬스 제공
	if(quizCheckYn===false && quizCheck===false && quizFeedChance>1){
		if(feedCnt<quizFeedChance){
			quizEle.setAttribute("data-feedCnt", parseInt(feedCnt)+1);
			common_feedBackText(4);
			return false;
		}
	}
	
	if (quizCheckYn) {
		// 마킹 초기화
		if(quizMarkingYn==="true"){
			markingEle = document.getElementsByClassName("quizMarking");
			for (var x=0, xLen=markingEle.length; x<xLen; x++) {
				markingEleTmp = markingEle[x];
				if (markingEleTmp.getAttribute("data-marking")===quizScope) {
					markingEleTmp.classList.remove("correct");
					markingEleTmp.classList.remove("wrong");
				}
			}
		}
		
		// 입력 항목 초기화
		if (isReplay) {
			initQuiz();
		} else {
			initQuiz(true);
		}
		
		quizInpCorrect = quizEle.getElementsByClassName("layerAnswer");
		for(var x=0, xLen=quizInpCorrect.length; x<xLen; x++){
			quizInpCorrect[x].classList.remove("show");
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
		
		// 디지털교과서 사용자 데이터 삭제
		if(global_dt){
			deleteStr = deleteStr.replace(/,$/, "");
			if(typeof parent.API_ANNOTATION_INPUT_DELETE==="function"){
				parent.API_ANNOTATION_INPUT_DELETE(deleteStr);	
			}
		}
	} else {
		// 정답 항목 표시
		quizInpCorrect = quizEle.getElementsByClassName("layerAnswer");

		for (var y=0, yLen=quizInpCorrect.length; y<yLen; y++) {
			if (answerStr) {
				quizInpCorrect[y].classList.add("show");
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
		// quizEle.classList.add("quizChk");

		if(quizCheck){
			quizEle.classList.add("correct");
		}else{
			quizEle.classList.add("wrong");
		}
		
		for(var k=0, kLen=quizPart.length; k<kLen; k++){
			quizPart[k].disabled = true;
		}
		
		// 버튼 토글
		common_btnToggle(quizScope);
	}
}

function layerQuiz_noSolve(quizEle, quizScope){
	var quizInpCorrect;
	var quizEachBtn;
	
	// 정답 확인 유무 판별
	var quizCheckYn = quizEle.classList.contains("quizChk");
	
	var quizPart = quizEle.getElementsByClassName("layerWrite");
	
	if(quizCheckYn){
		// 입력 항목 초기화
		for(var k=0, kLen=quizPart.length; k<kLen; k++){
			quizPart[k].value = "";
		}
		
		// 정답 항목 초기화
		quizInpCorrect = quizEle.getElementsByClassName("layerAnswer");
		for(var x=0, xLen=quizInpCorrect.length; x<xLen; x++){
			quizInpCorrect[x].classList.remove("show");
		}
		
		// each 버튼 초기화
		quizEachBtn = quizEle.getElementsByClassName("eachBtn");
		for(var x=0, xLen=quizEachBtn.length; x<xLen; x++){
			quizEachBtn[x].classList.remove("on");
		}
		
		// 버튼 토글
		common_btnToggle(quizScope);
		
		quizEle.classList.remove("quizChk");
		
	}else{
		// 정답 항목 표시
		quizInpCorrect = quizEle.getElementsByClassName("layerAnswer");
		for(var y=0, yLen=quizInpCorrect.length; y<yLen; y++){
			quizInpCorrect[y].classList.add("show");
		}
		
		// each 버튼 정답 확인 처리
		quizEachBtn = quizEle.getElementsByClassName("eachBtn");
		for(var x=0, xLen=quizEachBtn.length; x<xLen; x++){
			quizEachBtn[x].classList.add("on");
		}
	
		quizEle.classList.add("quizChk");
		
		// 버튼 토글
		common_btnToggle(quizScope);
	}
}

function layerQuiz_correctCheck(quizScope){
	var quizPart = quizScope.getElementsByClassName("layerWrite");
	var quizCheck = true;
	var quizCorrect = (quizScope.getElementsByClassName("answerCorrect")[0].innerText).split("//");
	var correctIndx, quizCorrectTmp;
	var selCorrect = quizScope.getElementsByClassName("layerItem");
	
	for(var k=0, kLen=quizPart.length; k<kLen; k++){
		correctIndx = quizCorrect[k]-1;
		quizCorrectTmp = selCorrect[correctIndx].getAttribute("data-content") || selCorrect[correctIndx].innerText;
		if(quizPart[k].value!==quizCorrectTmp){
			quizCheck = false;
			break;
		}
	}
	return quizCheck;
}