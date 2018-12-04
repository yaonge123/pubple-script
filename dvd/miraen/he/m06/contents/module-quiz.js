"use strict";

var pubple;
if (typeof require !== "undefined") {
    pubple = require("./module-base.js").PUBPLE;
}

$(document).ready(
    function () {
        // 공통
        var isSolve = true; // 문제 풀기 활성화
        var isInputDiable = true; // 정답 확인시 입력 불가
        var isFeed = false;
        var feedCnt = 0;
        var ansFeedCnt;

        //미래엔
        
        // 객관식
        var selectChoice;
        // 정답 확인
        var $btnCheck = $(".btn_answer");
        var chkAnswer;
        //퀴즈 캐릭터
        var $quizChar = $(".answer_check");
        var charLeftPos = $quizChar.css("left");
        //다음,이전 문제 버튼
        var $btnNext = $(".btn_quiz_next");
        var $btnPrev = $(".btn_quiz_prev");
        var nextCont, prevCont;
        //효과음 재생
        var playFeedSound;

        /**
         * 객관식 문제 풀기
         * 단수형, 복수형, 진위형, 레이어 선택형
         */
        selectChoice = function (e) {
            var $clickedPoint = $(this);
            var $checkItem = $clickedPoint.parents(".checkItem");
            var $input = $checkItem.find("input");
            var $assessmentItem = $checkItem.parents(".quizType");
            var qid = $assessmentItem.data("qid");
            var $btnCheck = $(".btn_replay[data-target='" + qid + "']");
            var $assessmentInput = $assessmentItem.find("input");
            var responseType = $assessmentItem.data("response-type");
            var $layerBox = $assessmentItem.find(".layerBox");
            var $layerItem = $assessmentItem.find(".layerItem");
            var isOn = false; // 이미 선택한 항목 여부
            var isCheckedToggle = true; // 선택한 항목 토글 여부
            var isDuplicate = true; // 레이어 아이템 중복 선택 가능 여부
            var isBtnCheck = $assessmentItem.data("answerBtn") ? true : true; // 정답 확인 버튼 유무
            var isChkAns = $btnCheck.hasClass("on"); // 정답 확인 여부
            var inputLayerItem; // 레이어 항목 선택 핸들러
            
            var $btnAnswer = $(".btn_answer[data-target='" + qid + "']")
            var charLeft = parseInt(charLeftPos); //퀴즈 캐릭터 left 위치
            var layerBoxPos, checkItemOn, left; 

            var chkChoice = function() {
                $checkItem.addClass("on");
                $input.prop("checked", true);
                $btnAnswer.prop("disabled", true);
                $btnAnswer.addClass("show");
                $quizChar.removeClass("left");
                $quizChar.css("left", charLeftPos);

                moveChar();
            }

            var removeAllChk = function() {
                $checkItem.parent().find(".checkItem.on").removeClass("on");
                $assessmentInput.prop("disabled", true).prop("checked", false);

                $quizChar.css("left", charLeftPos);
            }

            var removeChk = function() {
                $checkItem.removeClass("on");
                $input.prop("checked", false);
            }

            var moveChar = function() {
                //캐릭터 애니메이션
                checkItemOn = $(".checkItem.on");
                left = parseInt(checkItemOn.css("left"));

                if (left > charLeft) {
                    $quizChar.stop().animate({
                        left: "+=" + (left - charLeft - 250)
                    }, 1500, function() {
                        $btnAnswer.prop("disabled", false);
                    });
                } else { 
                    $quizChar.addClass("left");
                    $quizChar.stop().animate({
                        left: "-=" + (charLeft - left - 200)
                    }, 1500, function() {
                        $btnAnswer.prop("disabled", false);
                    });
                }
            }

            // 정답 확인 시 입력 가능 여부
            if (isInputDiable && isChkAns) {
                $assessmentInput.prop("disabled", true);
                return;
            } else {
                $assessmentInput.prop("disabled", false);
            }

            isOn = $clickedPoint.hasClass("on");
            
            if (responseType === "singleChoice") { // 단수형
                removeAllChk();
                if (!isOn || !isCheckedToggle) {
                    chkChoice();
                }
            } else if (responseType === "multipleChoice") { // 복수형
                if (!isOn) {
                    chkChoice();
                } else if (isCheckedToggle) {
                    removeChk();
                } else {
                    return;
                }
            } else if (responseType === "trueFalse") { // 진위형
                removeAllChk();
                if (!isOn || !isCheckedToggle) {
                    chkChoice();
                }
            } else { // 레이어 선택형
                inputLayerItem = function () {
                    var $this = $(this);
                    var valChoice = $this.text();
                    var $chkItemParent = $checkItem.parent();
                    var $input = $clickedPoint.find("input");

                    if (!isDuplicate) {
                        if ($input.val() === valChoice) { // 같은 보기 선택시 입력 값 제거
                            $input.val("");
                            $checkItem.removeClass("on");
                            $layerBox.hide();
                            return;
                        }
                        $assessmentInput.each(function() {
                            if (this.value === valChoice) {
                                this.value = "";
                                $(this).parents(".checkItem").removeClass("on");
                            }
                        });
                    }
                    $input.val(valChoice);
                    $checkItem.addClass("on");
                    $layerBox.hide();

                    // 정답 버튼 없는 경우, 바로 정답 확인
                    if (!isBtnCheck && $chkItemParent.find(".checkItem.on").length === $chkItemParent.find(".checkItem").length) {
                        chkAnswer(e, $btnCheck);
                    }
                }
                
                if ($layerBox.css("display") === "none") {
                    layerBoxPos = $input.data("position").split(" ");
                    $layerBox.css({left: layerBoxPos[0] + "px", top: layerBoxPos[1] + "px"})
                    $layerBox.show();
                    $layerItem.off("click").on("click", inputLayerItem);
                } else {
                    $layerBox.hide();
                }
            }

            // 정답 버튼 없는 경우, 바로 정답 확인
            if (!isBtnCheck && responseType !== "etc") {
                chkAnswer(e, $btnCheck);
            }
        }

        /**
         * 정답 확인
         */
        chkAnswer = function(e, btnCheck, allCheck) {
            var $btnCheck = $(this);
            var $btnReplay = $btnCheck.parent().find(".btnReplay");
            var qid = $btnCheck.data("target");
            var isAnsOn = $btnCheck.hasClass("on"); // 정답 표시 여부
            var $assessmentItem = $("[data-qid='" + qid + "']");
            var $checkItem = $assessmentItem.find(".checkItem");
            var $quizEssay = $assessmentItem.find(".quizEssay");
            var $essayWrite = $quizEssay.find(".essayWrite");
            var $quizMark = $(".quizMarking[data-marking='" + qid + "']");
            var $returnTxt = $assessmentItem.find(".returnTxt");
            var responseType = $assessmentItem.data("response-type");
            var feedMsgNum = 0;
            var chanceCnt = $assessmentItem.data("chance"); // 오답시 다시 풀수 있는 기회
            var isMark = $assessmentItem.data("marking") ? true : false; // 마킹 여부
            var isAnsToggle = true; // 정답 확인 토글
            var isRemoveChk = false; // 정답 확인 시 입력 값 제거 여부
            var isReomveChkT = false; // 정답 확인 토글 시 입력 값 제거 여부
            var isInput = false; // 정답 입력 여부
            
            var isAllChk = allCheck;
            var $chkItemParent;
            var $returnResult;

            var checkItemOn = $assessmentItem.find(".checkItem.on");
            var isCharCorrect; //정답 맞췄는지 여부 : 미래엔
            /**
             * 사용자 입력 값 제거
             */
            var removeUserChk = function () {
                if (responseType === "singleChoice" || responseType === "multipleChoice") {
                    $checkItem.removeClass("on");
                    $checkItem.find("input").prop("checked", false);
                } else if (responseType === "etc") {
                    $checkItem.find("input").val("");
                } else {
                    $essayWrite.val("");
                }
            }

            /**
             * 객관식 정답 확인
             * @param {number} option 피드백 제공에 대한 옵션 - 0. 정답 체크
             */
            var chkChoiceAns = function(option) {
                var isChkAns = false; // 정답 체크 여부
                var $answerCorrect = $assessmentItem.find(".answerCorrect");

                if (option === 0 && !isAllChk || isMark) {
                    isChkAns = true;
                }

                $answerCorrect.each(function(idx) {
                    var $this = $(this);
                    var $itembody = $this.parent();
                    var $checkItem = $itembody.find(".checkItem");
                    var i = 0;
                    var answerArr = $this.text().split("\/\/");
                    var answerArrLen = answerArr.length;
                    var inputValArr = []; // 선택한 보기 배열
                    var $returnTxt = $itembody.find(".returnTxt");
                    var $ansCheckItem;
                    var $returnResult;

                    // 정답 확인 피드백
                    if (isChkAns) {
                        $itembody.find(".checkItem.on").each(function () {
                            if (responseType !== "etc") {
                                inputValArr.push($checkItem.index(this) + 1);
                            } else {
                                inputValArr.push($(this).find("input").val());
                            }
                        });
                        
                        showFeedback("choice", answerArr, inputValArr, $itembody, idx);

                        if (!feedMsgNum) {
                            return;
                        } else if (feedMsgNum === 3) {
                            return false;
                        }
                    }
                    
                    if (feedMsgNum || !isFeed || feedCnt) {
                        $btnCheck.addClass("on");
                        $btnReplay.addClass("on");
                        // 입력 값 제거
                        if (isRemoveChk) {
                            removeUserChk();
                        }
                    }

                    // 정답 표시
                    for (; i < answerArrLen; i++) {
                        if (responseType === "etc") {
                            $checkItem.find(".layerAnswer").show();
                        } else {
                            if (!answerArr[i]) {
                                continue;
                            }
                            $ansCheckItem = $checkItem.eq(answerArr[i] - 1);
                            $ansCheckItem.addClass("answer");
                            // 텍스트 반환이 존재하는 경우
                            if ($returnTxt.length) {
                                $returnResult = $(".returnResult[data-target='" + $returnTxt.data("target") + "']");

                                if ($returnResult[0].tagName === "input") {
                                    $returnResult.val($ansCheckItem.find(".returnTxt").text()).addClass("answer");
                                } else {
                                    $returnResult.text($ansCheckItem.find(".returnTxt").text()).addClass("answer");
                                }
                            }
                        }
                    }
                });

                // 마킹
                if (isMark) {
                    showMarking();
                }

                //정오답에 따른 캐릭터 움직이기
                isCharCorrect = checkItemOn.hasClass("answer") ? true : false;
                chkCorrect(isCharCorrect);
                playFeedSound(isCharCorrect);

                $checkItem.find("input").prop("disabled", true);
                $btnNext.add($btnPrev).addClass("show");
            }

            /**
             * 주관식 정답 확인
             * @param {number} option 피드백 제공에 대한 옵션 - 0. 정답 체크
             */
            var chkEssayAns = function(option) {
                var isChkAns = false; // 정답 체크 여부
                var $essayAnswers = $assessmentItem.find(".essayAnswer");
                var answerArr = [];
                var inputValArr = [];

                if (option === 0 && !isAllChk) {
                    isChkAns = true;
                }

                // 정답 확인 피드백
                if (isChkAns) {
                    $essayWrite.each(function(i) {
                        var ansCorrect = $(this).nextAll(".answerCorrect");
                        if (ansCorrect.length) {
                            answerArr[i] = this.value;
                            inputValArr[i] = ansCorrect.text();
                        }

                    });
                    
                    showFeedback("essay", answerArr, inputValArr);

                    if (feedMsgNum === 3) {
                        return;
                    }
                }

                if (feedMsgNum || !isFeed || feedCnt) {
                    $btnCheck.addClass("on");
                    $btnReplay.addClass("on");
                    // 입력 값 제거
                    if (isRemoveChk) {
                        removeUserChk();
                    }
                }

                // 정답 표시
                $essayAnswers.addClass("show");

                // 마킹
                if (isMark) {
                    showMarking();
                }
            }

            // 채점 표시(마킹)
            var showMarking = function() {
                if (feedMsgNum === 1) {
                    $quizMark.addClass("correct");
                } else {
                    $quizMark.addClass("wrong");
                }
            }

            //정답 맞췄을 경우 캐릭터 움직이기
            var chkCorrect = function(isCharCorrect) {
                if (isCharCorrect) {
                    $quizChar.addClass("answer");
                    $btnCheck.prop("disabled", true);
                    setTimeout(function (){
                        $btnCheck.prop("disabled", false);
                    }, 1000)
                    $quizChar.animate({
                        top: "-=25"
                    },500);
                    $quizChar.animate({
                        top: "+=25"
                    },500);
                } else {
                    $quizChar.addClass("wrong");
                }
            }

            // 조건 값 설정
            isFeed = $assessmentItem.data("feedback") ? true : false; // 피드백 여부
            ansFeedCnt = $btnCheck.data("answer-feedcnt") ? $btnCheck.data("answer-feedcnt") : 0;
            feedCnt = $btnCheck.data("feedcnt") ? $btnCheck.data("feedcnt") : 0;
            chanceCnt = chanceCnt ? chanceCnt : 0;

            if (responseType === "singleChoice" || responseType === "multipleChoice" || responseType === "trueFalse" || responseType === "etc") {
                $chkItemParent = $assessmentItem.find(".checkItem").parent();
                if (isAnsOn) {
                    if (isAnsToggle) {
                        if (responseType === "etc") {
                            $checkItem.find(".layerAnswer").hide();
                            $checkItem.find(".answer_txt").removeClass("blind");
                        } else {
                            $checkItem.removeClass("answer");
                        }
                        $checkItem.removeClass("on chk");
                        $checkItem.find("input").prop("disabled", false);

                        $btnCheck.removeClass("on show");
                        $btnReplay.removeClass("on");
                        $btnCheck.data("feedcnt", 0);

                        $quizChar.removeClass("answer wrong left");
                        $quizChar.css("left", charLeftPos);

                        $btnNext.add($btnPrev).removeClass("show");
                        
                        // 텍스트 반환이 존재하는 경우
                        if ($returnTxt.length) {
                            $returnResult = $(".returnResult[data-target='" + $returnTxt.data("target") + "']")

                            if ($returnResult[0].tagName === "input") {
                                $returnResult.val($chkItemParent.find(".checkItem.on .returnTxt").text()).removeClass("answer");
                            } else {
                                $returnResult.text($chkItemParent.find(".checkItem.on .returnTxt").text()).removeClass("answer");
                            }
                        }
                        
                        if (isMark) {
                            if (feedMsgNum === 1) {
                                $quizMark.removeClass("correct");
                            } else {
                                $quizMark.removeClass("wrong");
                            }
                        }

                        if (isReomveChkT) {
                            removeUserChk();
                        }

                        isAnsToggle = false;
                    }
                } else {

                    if (isInput) {
                        if (isFeed) {
                            chkChoiceAns(0);
                        } else {
                            chkChoiceAns();
                        }
                    } else {
                        if (isFeed && !feedCnt) {
                            console.log(':::::::::문제를 풀어주세요');
                            $feedback.show();
                            $feedback.children().eq(0).show();
                            feedCnt++;
                            $btnCheck.data("feedcnt", feedCnt);
                        } else {
                            chkChoiceAns();
                        }
                    }
                }
            } 
        }

        playFeedSound = function(isCharCorrect) {
            var clickAudio;

            if (isCharCorrect) clickAudio = document.getElementsByClassName('feedOk')[0];
            else clickAudio = document.getElementsByClassName('feedNo')[0];

            if(!clickAudio.ended) {
                clickAudio.currentTime = 0;
             }
             clickAudio.play();
        }

        nextCont = function() {
            var $this = $(this);
            var $parent = $this.closest($("li"));
            var $checkItem = $parent.find($(".checkItem"));
            var $btnReplay = $parent.find($(".btn_replay"));
            var $next = $parent.next();

            console.log($btnPrev);
            
            $this.removeClass("show");
            $btnPrev.removeClass("show");
            $parent.removeClass("on");
            $next.addClass("on");

            $checkItem.removeClass("on answer");

            $btnReplay.addClass("btn_answer");
            $btnReplay.removeClass("btn_replay on show");

            $quizChar.removeClass("answer wrong left");
            $quizChar.css("left", charLeftPos);
        }

        prevCont = function() {
            var $this = $(this);
            var $parent = $this.closest($("li"));
            var $checkItem = $parent.find($(".checkItem"));
            var $btnReplay = $parent.find($(".btn_replay"));
            var $prev = $parent.prev();

            $this.removeClass("show");
            $btnNext.removeClass("show");
            $parent.removeClass("on");
            $prev.addClass("on");

            $checkItem.removeClass("on answer");

            $btnReplay.addClass("btn_answer");
            $btnReplay.removeClass("btn_replay on show");

            $quizChar.removeClass("answer wrong left");
            $quizChar.css("left", charLeftPos);
        }

        // 이벤트 핸들러 등록
        if (isSolve) {
            $(".check_num").on("click", selectChoice);
        }
        $btnCheck.on("click", chkAnswer);
        $btnNext.on("click", nextCont);
        $btnPrev.on("click", prevCont);
    }
);