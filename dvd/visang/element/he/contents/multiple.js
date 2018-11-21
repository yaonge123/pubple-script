'use strict';
window.addEventListener("DOMContentLoaded", function(){

	// 객관식 보기 항목 선택 관련 내용
	choiceQuiz_init();
	// 객관식 정답 확인
	choiceQuiz_correctBtn();
	
});

function choiceQuiz_init(){
	var quiz = document.getElementsByClassName("quizType");
	var quizTmp, quizType, strCorrect, multiYn;
	var quizPart, checkItem;
	
	// 문제풀이 가능 여부
	if(global_solve){
		for(var i=0, iLen=quiz.length; i<iLen; i++){
			quizTmp = quiz[i];
			quizType = quizTmp.getAttribute("data-question-type");
			strCorrect = quizTmp.getElementsByClassName("answerCorrect")[0].innerText;
			multiYn = (strCorrect.indexOf("&&")===-1) ? false : true;

			// 객관식 단일 선택 형
			if(quizType==="choiceQuiz"){
				quizPart = quizTmp.getElementsByClassName("choiceSelect");
				for(var j=0, jLen=quizPart.length; j<jLen; j++){
					checkItem = quizPart[j].getElementsByClassName("checkItem");
					for(var k=0, kLen=checkItem.length; k<kLen; k++){
						checkItem[k].addEventListener("click", function(){
							var multi;
							var ele, checkItemAll, radio, checkSelectAll;
							
							var parentsEle = this;
							while(!parentsEle.classList.contains("quizType")){
								parentsEle = parentsEle.parentNode;
							}
							
							if(multiYn){
								// 객관식 다중 선택 형
								if(!parentsEle.classList.contains("quizChk")){
									multi = this.getElementsByClassName("checkSelect")[0];
									if(multi.checked){
										this.classList.remove("on");
										multi.checked = false;
										
										// 디지털교과서 사용자 데이터 삭제
										if(global_dt){
											if(typeof parent.API_ANNOTATION_INPUT_DELETE==="function"){
												parent.API_ANNOTATION_INPUT_DELETE(multi.getAttribute("id"));	
											}
										}
									}else{
										this.classList.add("on");
										multi.checked = true;
									}
								}
							}else{
								// 객관식 단일 선택 형
								if(!parentsEle.classList.contains("quizChk")){
									ele = this;
									while(!ele.classList.contains("choiceSelect")){
										ele = ele.parentNode;
									}
									
									checkItemAll = ele.getElementsByClassName("checkItem");
									for(var x=0, xLen=checkItemAll.length; x<xLen; x++){
										checkItemAll[x].classList.remove("on");
									}	
									radio = this.getElementsByClassName("checkSelect")[0];
									if(radio.checked){
										radio.checked = false;
										
										// 디지털교과서 사용자 데이터 삭제
										if(global_dt){
											if(typeof parent.API_ANNOTATION_INPUT_DELETE==="function"){
												parent.API_ANNOTATION_INPUT_DELETE(radio.getAttribute("id"));	
											}
										}
										
									}else{
										this.classList.add("on");
										checkSelectAll = ele.getElementsByClassName("checkSelect");
										for(var y=0, yLen=checkSelectAll.length; y<yLen; y++){
											checkSelectAll[y].checked = false;
										}
										radio.checked = true;
									}
								}
							}
						});
					}
				}
			}
		}
	}
}

function choiceQuiz_correctBtn(){
	var quizBtn = document.getElementsByClassName("checkQuizChoice");
	var eachBtn = document.getElementsByClassName("eachBtn");
	
	for(var i=0, iLen=quizBtn.length; i<iLen; i++){
		quizBtn[i].addEventListener("click", function(){
			var quiz = document.getElementsByClassName("quizType");
			var quizScope = this.getAttribute("data-target");
			var quizTmp, quizId, quizType;
			var totalQuiz = false;
			
			for(var j=0, jLen=quiz.length; j<jLen; j++){
				quizTmp = quiz[j];
				quizId = quizTmp.getAttribute("data-qid");
				quizType = quizTmp.getAttribute("data-question-type");
				
				if(quizId===quizScope && quizType==="choiceQuiz"){
					// 문제풀이 가능 여부
					if(global_solve){
						// 정답 확인 실행
						choiceQuiz(quizTmp, quizScope, totalQuiz);
					}else{
						// 정답 확인 실행
						choiceQuiz_noSolve(quizTmp, quizScope, totalQuiz);
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
				
				if(quizType==="choiceQuiz"){
					preEle = this.previousElementSibling;
					quizChkYn = this.classList.contains("on");
					
					if(preEle.classList.contains("choiceSelect")){
						targetEle = preEle;
					}else{
						childEle = preEle.children;
						for(var j=0, jLen=childEle.length; j<jLen; j++){
							childEleData = childEle[j];
							if(childEleData.classList.contains("choiceSelect")){
								targetEle = childEleData;
							}
						}
					}
					
					quizEachBtn = parentsEle.getElementsByClassName("eachBtn");
					if(quizChkYn){
						choiceQuiz_correctMark(parentsEle, targetEle, true);
						this.classList.remove("on");
					}else{
						choiceQuiz_correctMark(parentsEle, targetEle, false);
						this.classList.add("on");
					}
					
					replayYn = true;
					for(var k=0, kLen=quizEachBtn.length; k<kLen; k++){
						if(!quizEachBtn[k].classList.contains("on")){
							replayYn = false;
							break;
						}
					}
					
					quizBtn = document.getElementsByClassName("checkQuizChoice");
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

// each 버튼 정답 항목 표시, 초기화
function choiceQuiz_correctMark(quiz, eachTarget, reset){
    var strCorrect = quiz.getElementsByClassName("answerCorrect")[0].innerText;
    var quizCorrect = strCorrect.split("//");
	var multiYn = (strCorrect.indexOf("&&")===-1) ? false : true;
	var mQuizChkSel, quizChkSel, quizChkSelTmp;
	
	var idxEle = quiz.getElementsByClassName("choiceSelect");
	var idx;
	for(var j=0, jLen=idxEle.length; j<jLen; j++){
		if(idxEle[j]===eachTarget){
			idx = j;
			break;
		}
	}
	if(reset){
		quizChkSel = eachTarget.getElementsByClassName("checkSelect");
		for(var y=0, yLen=quizChkSel.length; y<yLen; y++){
			quizChkSel[y].parentNode.classList.remove("answer");
		}
	}else{
		if(multiYn){
			// 다중선택 정답 항목 표시
			mQuizChkSel = quizCorrect[idx].split("&&");
			quizChkSel = eachTarget.getElementsByClassName("checkSelect");
			
			for(var y=0, yLen=quizChkSel.length; y<yLen; y++){
				quizChkSelTmp = quizChkSel[y];
				for(var z=0, zLen=mQuizChkSel.length; z<zLen; z++){
					if(quizChkSelTmp.value===mQuizChkSel[z]){
						quizChkSelTmp.parentNode.classList.add("answer");
					}
				}
			}
		}else{
			// 단일선택 정답 항목 표시
			quizChkSel = eachTarget.getElementsByClassName("checkSelect");
			for(var y=0, yLen=quizChkSel.length; y<yLen; y++){
				quizChkSelTmp = quizChkSel[y];
				if(quizCorrect[idx]===quizChkSelTmp.value){
					quizChkSelTmp.parentNode.classList.add("answer");
				}
			}

		}
	}
}

function choiceQuiz(quizEle, quizScope, totalQuiz){
	var totalScope, totalScopeQuiz;
	var quizPartTmp;
	var markingEle, markingEleTmp;
	var deleteStr, checkItemAll, checkItemAllTmp, checkSelectAll, checkSelectAllTmp;
	var quizHint, quizChkSel, quizChkSelTmp, mQuizChkSel, correct;
	
	if(totalQuiz){
		totalScope = common_totalScope(quizScope);
	}else{
		totalScope = quizEle;
	}
	
	var quizFeedYn = totalScope.getAttribute("data-feedBack");
	var quizFeedChance = totalScope.getAttribute("data-chance");

	var quizCheckingYn = totalScope.getAttribute("data-check");
	var quizMarkingYn = totalScope.getAttribute("data-marking");
	
	var quizHintYn = totalScope.getAttribute("data-hint");
	
	// 정답 확인 유무 판별
	var quizCheckYn = quizEle.classList.contains("quizChk");
	
	var strCorrect = quizEle.getElementsByClassName("answerCorrect")[0].innerText;
	var multiYn = (strCorrect.indexOf("&&")===-1) ? false : true;
	
	var quizCheck = true;
	var quizPart = quizEle.getElementsByClassName("choiceSelect");
	var quizCorrect = strCorrect.split("//");
		
	// 피드백 제공
	if(quizCheckYn===false && quizFeedYn==="true"){
		if(common_feedBackCheck(totalScope)){
			common_feedBackText(1);
			return "feedBack";
		}
	}
	
	var feedCnt =  parseInt(totalScope.getAttribute("data-feedCnt")) || 1;
	// 힌트 제공
	if(quizCheckYn===false && quizHintYn==="true" && feedCnt===1){
		if(totalQuiz){
			common_hintBtn(quizScope, true, true);	
		}else{
			common_hintBtn(quizScope, true);	
		}
	}
	
	if(quizCheckingYn==="true" || quizMarkingYn==="true"){
		if(multiYn){
			// 다중선택 정답 확인
			quizCheck = choiceQuiz_correctCheck(quizEle, true);
		}else{
			// 단일선택 정답 확인 
			quizCheck = choiceQuiz_correctCheck(quizEle);
		}
	}
	
	// 찬스 제공
	if(quizCheckYn===false && quizFeedChance>1){
		if(feedCnt<quizFeedChance){
			if(totalQuiz){
				totalScopeQuiz = totalScope.getElementsByClassName("quizType")
				if(!common_correctCheck(totalScopeQuiz)){
					common_feedBackText(4);
					return "chance";
				}
				
			}else if(!quizCheck){
				totalScope.setAttribute("data-feedCnt", parseInt(feedCnt)+1);
				common_feedBackText(4);
				return false;
			}
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
		deleteStr = "";
		for(var k=0, kLen=quizPart.length; k<kLen; k++){
			quizPartTmp = quizPart[k];
			checkItemAll = quizPartTmp.getElementsByClassName("checkItem");
			
			for(var x=0, xLen=checkItemAll.length; x<xLen; x++){
				checkItemAllTmp = checkItemAll[x];
				checkItemAllTmp.classList.remove("on");
				checkItemAllTmp.classList.remove("answer");
			}
			
			checkSelectAll = quizPartTmp.getElementsByClassName("checkSelect");
			for(var x=0, xLen=checkSelectAll.length; x<xLen; x++){
				checkSelectAllTmp = checkSelectAll[x];
				checkSelectAllTmp.checked = false;
				
				// 디지털교과서 사용자 데이터 삭제
				if(global_dt){
					deleteStr += checkSelectAllTmp.getAttribute("id") + ",";	
				}
			}
		}
		
		// 버튼 토글
		common_btnToggle(quizScope);
		
		// 힌트 초기화
		if(totalQuiz){
			common_hintBtn(quizScope, false, true);	
		}else{
			common_hintBtn(quizScope, false);	
		}
		quizHint = totalScope.getElementsByClassName("hintMessage");
		for(var k=0, kLen=quizHint.length; k<kLen; k++){
			quizHint[k].classList.remove("show");
		}
		
		quizEle.classList.remove("quizChk");
		quizEle.classList.remove("quizHintChk");
		quizEle.classList.remove("correct");
		quizEle.classList.remove("wrong");
		totalScope.setAttribute("data-feedCnt", 1);
		
		// 디지털교과서 사용자 데이터 삭제
		if(global_dt){
			deleteStr = deleteStr.replace(/,$/, "");
			if(typeof parent.API_ANNOTATION_INPUT_DELETE==="function"){
				parent.API_ANNOTATION_INPUT_DELETE(deleteStr);
			}
		}
		
	}else{
		if(multiYn){
			// 다중선택 정답 항목 표시
			for(var k=0, kLen=quizPart.length; k<kLen; k++){
				mQuizChkSel = quizCorrect[k].split("&&");
				quizChkSel = quizPart[k].getElementsByClassName("checkSelect");
				for(var y=0, yLen=quizChkSel.length; y<yLen; y++){
					quizChkSelTmp = quizChkSel[y];
					for(var z=0, zLen=mQuizChkSel.length; z<zLen; z++){
						if(quizChkSelTmp.value===mQuizChkSel[z]){
							quizChkSelTmp.parentNode.classList.add("answer");
						}
					}
				}
			}
		}else{
			// 단일선택 정답 항목 표시
			for(var k=0, kLen=quizPart.length; k<kLen; k++){
				quizChkSel = quizPart[k].getElementsByClassName("checkSelect");
				for(var y=0, yLen=quizChkSel.length; y<yLen; y++){
					quizChkSelTmp = quizChkSel[y];
					if(quizCorrect[k]===quizChkSelTmp.value){
						quizChkSelTmp.parentNode.classList.add("answer");
					}
				}
			}		
		}
		
		// 피드백 제공
		if(totalQuiz!==true && quizFeedYn==="true" && (quizCheckingYn==="true" || quizMarkingYn==="true")){
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
		
		// 디지털교과서 캘리퍼센서 전송
		if(global_dt){
			correct = common_correctResult(quizCorrect);
			DTCaliperSensor.fire({
				correct: quizCheck,	 // 정답 여부입력 [true, false] 중에서 택일 
				itemObject: quizEle,	 // 해당 문항 객체 
				value: correct			 // 실제 정답 데이터 입력 <correctResponse>에 입력된 값이랑 동일
			});
		}
	}
}

function choiceQuiz_noSolve(quizEle, quizScope){
	var checkItemAll, checkItemAllTmp, checkSelectAll;
	var quizPartTmp;
	var quizChkSel, quizChkSelTmp, mQuizChkSel;
	var quizEachBtn;

	// 정답 확인 유무 판별
	var quizCheckYn = quizEle.classList.contains("quizChk");
	
	var strCorrect = quizEle.getElementsByClassName("answerCorrect")[0].innerText;
	var multiYn = (strCorrect.indexOf("&&")===-1) ? false : true;
	
	var quizPart = quizEle.getElementsByClassName("choiceSelect");
	var quizCorrect = strCorrect.split("//");
		
	if(quizCheckYn){	
		// 입력 항목 초기화, 정답 항목 초기화			
		for(var k=0, kLen=quizPart.length; k<kLen; k++){
			quizPartTmp = quizPart[k];
			checkItemAll = quizPartTmp.getElementsByClassName("checkItem");
			for(var x=0, xLen=checkItemAll.length; x<xLen; x++){
				checkItemAllTmp = checkItemAll[x];
				checkItemAllTmp.classList.remove("on");
				checkItemAllTmp.classList.remove("answer");
			}
			
			checkSelectAll = quizPartTmp.getElementsByClassName("checkSelect");
			for(var x=0, xLen=checkSelectAll.length; x<xLen; x++){
				checkSelectAll[x].checked = false;
			}
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
		if(multiYn){
			// 다중선택 정답 항목 표시
			for(var k=0, kLen=quizPart.length; k<kLen; k++){
				mQuizChkSel = quizCorrect[k].split("&&");
				quizChkSel = quizPart[k].getElementsByClassName("checkSelect");
				for(var y=0, yLen=quizChkSel.length; y<yLen; y++){
					quizChkSelTmp = quizChkSel[y];
					for(var z=0, zLen=mQuizChkSel.length; z<zLen; z++){
						if(quizChkSelTmp.value===mQuizChkSel[z]){
							quizChkSelTmp.parentNode.classList.add("answer");
						}
					}
				}
			}
		}else{
			// 단일선택 정답 항목 표시
			for(var k=0, kLen=quizPart.length; k<kLen; k++){
				quizChkSel = quizPart[k].getElementsByClassName("checkSelect");
				for(var y=0, yLen=quizChkSel.length; y<yLen; y++){
					quizChkSelTmp = quizChkSel[y];
					if(quizCorrect[k]===quizChkSelTmp.value){
						quizChkSelTmp.parentNode.classList.add("answer");
					}
				}
			}
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

function choiceQuiz_correctCheck(quizScope, multiYn){
	var quizPart = quizScope.getElementsByClassName("choiceSelect");
	var quizPartTmp;
	var quizCheck = true;
	var quizCorrect = (quizScope.getElementsByClassName("answerCorrect")[0].innerText).split("//");
	var quizAnswer, quizRadio, quizRadioTmp, mQuizChkSel, quizMulti, quizMultiTmp, selCnt;
	
	for(var k=0, kLen=quizPart.length; k<kLen; k++){
		quizPartTmp = quizPart[k];
		if(multiYn){
			// 다중선택 정답 확인
			mQuizChkSel = quizCorrect[k].split("&&");
			quizMulti = quizPartTmp.getElementsByClassName("checkSelect");
			selCnt = 0;
			for(var y=0, yLen=quizMulti.length; y<yLen; y++){
				if(quizMulti[y].checked===true){
					selCnt++;
				}
			}
			for(var y=0, yLen=quizMulti.length; y<yLen; y++){
				quizMultiTmp = quizMulti[y];
				if(!quizCheck){
					break;
				}
				for(var z=0, zLen=mQuizChkSel.length; z<zLen; z++){
					if(quizMultiTmp.checked===true){
						if(quizMultiTmp.value===mQuizChkSel[z]){
							quizCheck = true;
							break;
						}else{
							quizCheck = false;
						}
					}
				}
			}
			if(selCnt!==mQuizChkSel.length){
				quizCheck = false;
			}
		}else{
			// 단일선택 정답 확인 
			quizAnswer = "";
			quizRadio = quizPartTmp.getElementsByClassName("checkSelect");
			for(var y=0, yLen=quizRadio.length; y<yLen; y++){
				quizRadioTmp = quizRadio[y];
				if(quizRadioTmp.checked===true){
					quizAnswer = quizRadioTmp.value;
				}
			}
			if(quizCorrect[k]!==quizAnswer){
				quizCheck = false;
			}
		}
	}
	return quizCheck;
}

