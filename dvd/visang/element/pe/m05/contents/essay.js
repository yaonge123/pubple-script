'use strict';
window.addEventListener("DOMContentLoaded", function(){
	
	// 주관식 입력 항목 관련 내용
	essayQuiz_init();
	// 주관식 정답 확인
	essayQuiz_correctBtn();
	// 주관식 가이드문구
	essayQuiz_guide();

});

function essayQuiz_init(){
	var quizPart = document.getElementsByClassName("essayWrite");
	
	// 문제풀이 가능 여부
	if(global_solve){
		// 디지털교과서 사용자 데이터 삭제
		if(global_dt){
			for(var i=0, iLen=quizPart.length; i<iLen; i++){
				quizPart[i].addEventListener("keydown", function(e){
					if(e.keyCode===8 && (this.value).length===1){
						if(typeof parent.API_ANNOTATION_INPUT_DELETE==="function"){
							parent.API_ANNOTATION_INPUT_DELETE(this.getAttribute("id"));	
						}
					}
				});
			}
		}
	}else{
		for(var i=0, iLen=quizPart.length; i<iLen; i++){
			quizPart[i].disabled = true;
		}
	}
}

function essayQuiz_correctBtn(){
	var quizBtn = document.getElementsByClassName("checkQuizEssay");
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
				
				if(quizId===quizScope && quizType==="essayQuiz"){
					// 문제풀이 가능 여부
					if(global_solve){
						// 정답 확인 실행
						essayQuiz(quizTmp, quizScope, totalQuiz);
					}else{
						// 정답 확인 실행
						essayQuiz_noSolve(quizTmp, quizScope, totalQuiz);
					}
				}
			}
		});
	}
	
    // each 버튼 이벤트
    for(var i=0, iLen=eachBtn.length; i<iLen; i++){
        eachBtn[i].addEventListener("click", function(){
            var quizId, quizType, preEle, quizChkYn;
            var targetEle, quizEachBtn, quizEachBtnTmp, childEle, childEleData, quizBtn, quizBtnData;
            var replayYn;
            var beforePreEle, l, targetEls, answerCnt;
            
            var parentsEle = this;
            while(!parentsEle.classList.contains("quizType")){
                parentsEle = parentsEle.parentNode;
            }
            
            quizId = parentsEle.getAttribute("data-qid");
            quizType = parentsEle.getAttribute("data-question-type");
            
            if(quizType==="essayQuiz"){
                preEle = this.previousElementSibling;
                quizChkYn = this.classList.contains("on");
                
                if (preEle.classList.contains("essayAnswer")){
                    targetEle = preEle;
                } else {
                    beforePreEle = preEle.previousElementSibling;

                    if (!beforePreEle || !beforePreEle.classList.contains('input_wrap')) {
                        childEle = preEle.children;
                        for (var j = 0, jLen = childEle.length; j < jLen; j++) {
                            childEleData = childEle[j];
                            if (childEleData.classList.contains("essayAnswer")) {
                                targetEle = childEleData;
                            }
                        }
                    } else {
                        targetEls = [];
                        answerCnt = 1;

                        targetEls[0] = preEle.getElementsByClassName("essayAnswer")[0];

                        do {
                            targetEls[answerCnt] = beforePreEle.getElementsByClassName("essayAnswer")[0];
                            beforePreEle = beforePreEle.previousElementSibling;
                            answerCnt++;

                            if (!beforePreEle) {
                                break;
                            }
                        } while (beforePreEle.classList.contains('input_wrap'))
                        
                    }
                }
                quizEachBtn = parentsEle.getElementsByClassName("eachBtn");

                if(!targetEls) {
                    targetEle.classList.toggle("show");
                } else {
                    for (l = 0; l < answerCnt; l++) {
                        targetEls[l].classList.toggle("show");
                    }
                }
                this.classList.toggle("on");
                
                replayYn = true;
                for(var k=0, kLen=quizEachBtn.length; k<kLen; k++){
                    if(!quizEachBtn[k].classList.contains("on")){
                        replayYn = false;
                        break;
                    }
                }
                
                quizBtn = document.getElementsByClassName("checkQuizEssay");
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

function essayQuiz(quizEle, quizScope, totalQuiz){
	var totalScope, totalScopeQuiz;
	var quizPartTmp;
	var markingEle, markingEleTmp, deleteStr, quizInpCorrect, quizHint, correct;
	
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
	
	var quizPart = quizEle.getElementsByClassName("essayWrite");
	var quizCheck = true;
	var quizCorrect = strCorrect.split("//");
		
	// 피드백 제공
	if(quizCheckYn===false && quizFeedYn==="true"){
		if(common_feedBackCheck(totalScope)){
			common_feedBackText(1);
			return "feedBack";
		}
	}
	
	var feedCnt = parseInt(totalScope.getAttribute("data-feedCnt")) || 1;
	
	// 힌트 제공
	if(quizCheckYn===false && quizHintYn==="true" && feedCnt===1){
		if(totalQuiz){
			common_hintBtn(quizScope, true, true);	
		}else{
			common_hintBtn(quizScope, true);	
		}
	}
	
	// 정답 확인
	if(strCorrect!=="" && (quizCheckingYn==="true" || quizMarkingYn==="true")){
		quizCheck = essayQuiz_correctCheck(quizEle);
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
			quizPartTmp.value = "";
			quizPartTmp.disabled = false;
			
			// 디지털교과서 사용자 데이터 삭제
			if(global_dt){
				deleteStr += quizPartTmp.getAttribute("id") + ",";	
			}
		}
		
		// 정답 항목 초기화
		quizInpCorrect = totalScope.getElementsByClassName("essayAnswer");
		for(var x=0, xLen=quizInpCorrect.length; x<xLen; x++){
			quizInpCorrect[x].classList.remove("show");
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
		// 정답 항목 표시
		quizInpCorrect = totalScope.getElementsByClassName("essayAnswer");
		for(var y=0, yLen=quizInpCorrect.length; y<yLen; y++){
			quizInpCorrect[y].classList.add("show");
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
		if(quizMarkingYn==="true" && strCorrect!==""){
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
		
		if(strCorrect===""){
			quizEle.classList.add("essay");
		}else{
			if(quizCheck){
				quizEle.classList.add("correct");
			}else{
				quizEle.classList.add("wrong");
			}
		}
		
		for(var k=0, kLen=quizPart.length; k<kLen; k++){
			quizPart[k].disabled = true;
		}
		
		// 버튼 토글
		common_btnToggle(quizScope);
		
		// 디지털교과서 캘리퍼센서 전송
		if(global_dt){
			correct = common_correctResult(quizCorrect);
			// 서술형 판별
			if(strCorrect===""){
				quizCheck = null;
				correct = "";
			}
			DTCaliperSensor.fire({
				correct: quizCheck,	 // 정답 여부입력 [true, false] 중에서 택일 
				itemObject: quizEle,	 // 해당 문항 객체 
				value: correct			 // 실제 정답 데이터 입력 <correctResponse>에 입력된 값이랑 동일
			});
		}
	}
}

function essayQuiz_noSolve(quizEle, quizScope){
	var quizInpCorrect;
	var quizEachBtn;
	
	// 정답 확인 유무 판별
	var quizCheckYn = quizEle.classList.contains("quizChk");
	
	var quizPart = quizEle.getElementsByClassName("essayWrite");
	
	if(quizCheckYn){
		// 입력 항목 초기화
		for(var k=0, kLen=quizPart.length; k<kLen; k++){
			quizPart[k].value = "";					
		}
		
		// 정답 항목 초기화
		quizInpCorrect = quizEle.getElementsByClassName("essayAnswer");
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
		quizInpCorrect = quizEle.getElementsByClassName("essayAnswer");
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

function essayQuiz_correctCheck(quizScope){
	var quizPart = quizScope.getElementsByClassName("essayWrite");
	var quizCheck = true;
	var quizCorrect = (quizScope.getElementsByClassName("answerCorrect")[0].innerText).split("//");
	var sQuizCorrect, answer, correct;
	
	for(var k=0, kLen=quizPart.length; k<kLen; k++){
		sQuizCorrect = quizCorrect[k].split("||");
		if(!quizCheck){
			break;
		}
		for(var z=0, zLen=sQuizCorrect.length; z<zLen; z++){
			answer = (quizPart[k].value).toLowerCase().replace(/[\s.,]/g, "");
			correct = (sQuizCorrect[z]).toLowerCase().replace(/[\s.,]/g, "");
			
			if(answer===correct){
				quizCheck = true;
				break;
			}else{
				quizCheck = false;
			}
		}
	}
	return quizCheck;
}

function essayQuiz_guide(){
	var inpGuide = document.getElementsByClassName("essayWrite");
	var guide;
	var inpGuideTmp;
	
	for(var i=0, iLen=inpGuide.length; i<iLen; i++){
		inpGuideTmp = inpGuide[i];
		guide = inpGuideTmp.getAttribute("data-guide") || "";
		inpGuideTmp.setAttribute("placeholder", guide);
		
		inpGuideTmp.addEventListener("focus", function(){
			this.setAttribute("placeholder", "");
		});
		inpGuideTmp.addEventListener("focusout", function(){
			this.setAttribute("placeholder", this.getAttribute("data-guide") || "");
		});
	}
}
