'use strict';
// 디지털교과서 여부
var global_dt = false;
var global_solve = false;

window.addEventListener("DOMContentLoaded", function(){
	
	// 문제풀이 가능 여부
	if(global_solve){
		// 디지털교과서 뷰어에서 데이터 불러오는 시점 체크
		if(global_dt){
			var watch = setInterval(function(){
				// 객관식 사용자 데이터 값 설정
				var userData = document.getElementsByClassName("checkSelect");
				var userDataTmp;
				
				for(var i=0, iLen=userData.length; i<iLen; i++){
					if(userData[i].checked===true){
						for(var j=0, jLen=userData.length; j<jLen; j++){
							userDataTmp = userData[j];
							if(userDataTmp.checked===true){
								userDataTmp.parentNode.classList.add("on");
							}
						}
						clearInterval(watch);
						break;
					}
				}
			}, 100);
		}
		
		// 힌트 제공
		common_hint();
		
		// feedBack
		var feedBack01 = "문제를 풀어보세요.(피드백)";
		var feedBack02 = "정답입니다.";
		var feedBack03 = "오답입니다.";
		var feedBack04 = "다시 풀어주세요.(기회)";
		common_feedBack(feedBack01, feedBack02, feedBack03, feedBack04);
		
		// 복합형 정답 확인
		totalQuiz_correctBtn();
	}
	
});

function totalQuiz_correctBtn(){
	var quizBtn = document.getElementsByClassName("checkQuizTotal");
	
	for(var i=0, iLen=quizBtn.length; i<iLen; i++){
		quizBtn[i].addEventListener("click", function(){
			var quizScope = this.getAttribute("data-target");
			var quizTotal = document.getElementsByClassName("totalQuiz");
			var quizTotalTmp;
			var quiz, quizTmp, quizType, totalScope, chk, correctChk;
			var feedCnt, essayChance, choiceChance;
			var totalQuiz = true;
			
			for(var t=0, tLen=quizTotal.length; t<tLen; t++){
				quizTotalTmp = quizTotal[t];
				if(quizTotalTmp.getAttribute("data-total-quiz")===quizScope){
					totalScope = quizTotalTmp;
					quiz = totalScope.getElementsByClassName("quizType");
					break;
				}
			}
			
			feedCnt = parseInt(totalScope.getAttribute("data-feedCnt")) || 1;
			
			for(var j=0, jLen=quiz.length; j<jLen; j++){
				quizTmp = quiz[j];
				quizType = quizTmp.getAttribute("data-question-type");
				
				if(quizType==="essayQuiz"){
					// 정답 확인 실행
					essayChance = essayQuiz(quizTmp, quizScope, totalQuiz);
					if(essayChance==="feedBack"){
						break;
					}else if(essayChance==="chance"){
						totalScope.setAttribute("data-feedCnt", parseInt(feedCnt)+1);
						break;
					}
					
				}else if(quizType==="choiceQuiz"){
					// 정답 확인 실행
					choiceChance = choiceQuiz(quizTmp, quizScope, totalQuiz);
					if(choiceChance==="feedBack"){
						break;						
					}else if(choiceChance==="chance"){
						totalScope.setAttribute("data-feedCnt", parseInt(feedCnt)+1);
						break;
					}
				}
			}
			
			if(essayChance!=="feedBack" && choiceChance!=="feedBack"){
				if(essayChance!=="chance" && choiceChance!=="chance"){
					chk = totalScope.classList.toggle("chk");
					correctChk = true;
					
					for(var j=0, jLen=quiz.length; j<jLen; j++){
						if(quizTmp.classList.contains("wrong")){
							correctChk = false;
							break;
						}
					}
					if(chk){
						if(correctChk){
							common_feedBackText(2);
						}else{
							common_feedBackText(3);
						}
					}
					common_btnToggle(quizScope);
				}
			}
		});
	}
}

function common_correctCheck(quiz){
	var quizType, quizTmp, strCorrect, multiYn;
	
	for(var j=0, jLen=quiz.length; j<jLen; j++){
		quizTmp = quiz[j];
		quizType = quizTmp.getAttribute("data-question-type");
		strCorrect = quizTmp.getElementsByClassName("answerCorrect")[0].innerText;
		
		if(strCorrect!=="" && quizType==="essayQuiz"){
			return essayQuiz_correctCheck(quizTmp);
		}else if(quizType==="choiceQuiz"){
			multiYn = (strCorrect.indexOf("&&")===-1) ? false : true;
			return choiceQuiz_correctCheck(quizTmp, multiYn);
		}
	}
}

function common_hint(){
	var quizHintBtn = document.getElementsByClassName("hintBtn");

	for(var i=0, iLen=quizHintBtn.length; i<iLen; i++){
		quizHintBtn[i].addEventListener("click", function(){
			var quizHintScope = this.getAttribute("data-target");
			var totalQuiz = this.classList.contains("total");
			var quiz, quizTmp, totalScope, quizId;
			var quizHintYn, quizHint, quizHintTmp;
			
			if(totalQuiz){
				totalScope = common_totalScope(quizHintScope);
				quiz = totalScope.getElementsByClassName("quizType");
			}else{
				quiz = document.getElementsByClassName("quizType");
			}
			
			for(var j=0, jLen=quiz.length; j<jLen; j++){
				quizTmp = quiz[j];
				quizId = quizTmp.getAttribute("data-qid");
				quizHintYn = quizTmp.classList.contains("quizHintChk");
				
				if(totalQuiz || quizId===quizHintScope){
					quizHint = quizTmp.getElementsByClassName("hintMessage");
					for(var k=0, kLen=quizHint.length; k<kLen; k++){
						quizHintTmp = quizHint[k];
						quizHintYn = quizHintTmp.classList.contains("show"); 
						
						if(quizHintYn){
							quizHintTmp.classList.remove("show");
						}else{
							quizHintTmp.classList.add("show");
						}
					}
				}
			}
		});
	}
}

function common_feedBack(txt01, txt02, txt03, txt04){
	var feedBack = document.createElement("ul");
	feedBack.classList.add("feedMessage");
	document.getElementById("wrap").appendChild(feedBack);
	
	var feedBackText01 = document.createElement("li");
	feedBackText01.classList.add("feedMessage_txt");
	feedBackText01.classList.add("msg01");
	feedBackText01.innerText = txt01;
	feedBack.appendChild(feedBackText01);
	
	var feedBackText02 = document.createElement("li");
	feedBackText02.classList.add("feedMessage_txt");
	feedBackText02.classList.add("msg02");
	feedBackText02.innerText =txt02;
	feedBack.appendChild(feedBackText02);
	
	var feedBackText03 = document.createElement("li");
	feedBackText03.classList.add("feedMessage_txt");
	feedBackText03.classList.add("msg03");
	feedBackText03.innerText = txt03;
	feedBack.appendChild(feedBackText03);
	
	var feedBackText04 = document.createElement("li");
	feedBackText04.classList.add("feedMessage_txt");
	feedBackText04.classList.add("msg04");
	feedBackText04.innerText = txt04;
	feedBack.appendChild(feedBackText04);

	// 피드백 창 close
	document.getElementsByClassName("feedMessage")[0].addEventListener("click", function(){
		this.classList.remove("show");
	});
}

function common_feedBackText(num){
	var feedTxt = document.getElementsByClassName("feedMessage_txt");
	var feedTxtTmp;
	
	document.getElementsByClassName("feedMessage")[0].classList.add("show");
	
	for(var k=0, kLen=feedTxt.length; k<kLen; k++){
		feedTxtTmp = feedTxt[k];
		feedTxtTmp.classList.remove("show");
		
		if(feedTxtTmp.classList.contains("msg0" + num)){
			feedTxtTmp.classList.add("show");
		}
	}
}

function common_feedBackCheck(feedScope){
	var quizPart = feedScope.getElementsByClassName("essayWrite");
	var quizRadio, chkCnt;
	
	for(var k=0, kLen=quizPart.length; k<kLen; k++){
		if(quizPart[k].value===""){
			return true;
		}
	}
	
	quizPart = feedScope.getElementsByClassName("choiceSelect");
	for(var k=0, kLen=quizPart.length; k<kLen; k++){
		quizRadio = quizPart[k].getElementsByClassName("checkSelect");
		chkCnt = 0;
		
		for(var x=0, xLen=quizRadio.length; x<xLen; x++){
			if(quizRadio[x].checked){
				chkCnt++;
			}
		}
		if(chkCnt===0){
			return true;
		}
	}
	
	quizPart = feedScope.getElementsByClassName("layerWrite");
	for(var k=0, kLen=quizPart.length; k<kLen; k++){
		if(quizPart[k].value===""){
			return true;
		}
	}
	
	quizPart = feedScope.getElementsByClassName("dot");
	for(var k=0, kLen=quizPart.length; k<kLen; k++){
		if(!quizPart[k].classList.contains("lineChk")){
			return true;
		}
	}
}

function common_btnToggle(quizId){
	var btnEle = document.getElementsByClassName("btnCheck");
	var btnEleTmp;
	
	for(var x=0, xLen=btnEle.length; x<xLen; x++){
		btnEleTmp = btnEle[x];
		if(btnEleTmp.getAttribute("data-target")===quizId){
			if(btnEleTmp.classList.contains("replay")){
				btnEleTmp.innerText = "정답 확인";
			}else{
				btnEleTmp.innerText = "다시 풀기";
			}		
			btnEleTmp.classList.toggle("replay");
		}
	}
}

function common_hintBtn(quizId, chkOp, totalQuiz){
	var hintBtn = document.getElementsByClassName("hintBtn");
	var hintCnt = 0;
	var hintBtnTmp, quiz, quizTmp, quizHint, quizHintTmp, totalScope;
	
	for(var x=0, xLen=hintBtn.length; x<xLen; x++){
		hintBtnTmp = hintBtn[x];
		if(hintBtnTmp.getAttribute("data-target")===quizId){
			if(chkOp){
				hintBtnTmp.classList.add("show");
			}else{
				hintBtnTmp.classList.remove("show");
			}
			hintCnt++;
		}
	}
	
	if(hintCnt===0){
		if(totalQuiz){
			totalScope = common_totalScope(quizId);
			quiz = totalScope.getElementsByClassName("quizType");
		}else{
			quiz = document.getElementsByClassName("quizType");
		}
		
		for(var j=0, jLen=quiz.length; j<jLen; j++){
			quizTmp = quiz[j];
			if(totalQuiz || quizTmp.getAttribute("data-qid")===quizId){
				quizHint = quizTmp.getElementsByClassName("hintMessage");
				for(var k=0, kLen=quizHint.length; k<kLen; k++){
					quizHintTmp = quizHint[k];
					if(chkOp){
						quizHintTmp.classList.add("show");
					}else{
						quizHintTmp.classList.remove("show");
					}
				}
			}
		}
	}
}

function common_totalScope(quizScope){
	var quizTotal = document.getElementsByClassName("totalQuiz");
	var quizTotalTmp;
	
	for(var t=0, tLen=quizTotal.length; t<tLen; t++){
		quizTotalTmp = quizTotal[t];
		if(quizTotalTmp.getAttribute("data-total-quiz")===quizScope){
			return quizTotalTmp;
		}
	}
}

// 캘리퍼센서 서버 전송을 위한 정답 형식 변환
function common_correctResult(param){
	var result = "";
	var paramTmp;
	
	for(var i=0, iLen=param.length; i<iLen;  i++){
		paramTmp = param[i];
		if(i===(iLen-1)){
			result += " " + (i+1) + ")" + paramTmp;	
		}else{
			result += " " + (i+1) + ")" + paramTmp + " ";
		}
	}
	return result;	
}
