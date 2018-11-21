"use strict";

var dev;
if (typeof require !== "undefined") {
    dev = require("./module-base.js").DEV;
}

$(document).ready(
    function () {
        // 공통
        var isSolve = true; // 문제 풀기 활성화
        var isInputDiable = true; // 정답 확인시 입력 불가
        var isFeed = false;
        var feedCnt;

        // 객관식
        var selectChoice;

        // 주관식
        var inputEssay;

        // 정답 확인
        var $btnCheck = $(".btnCheck");
        var $feedback = $(".feedMessage");
        var chkAnswer;
        var chkUserInput;

        // 전체 정답 확인
        var $btnChkAll = $(".allCheck");
        var chkAllAnswer;

        // 다시 하기
        var $btnReplay = $(".btnReplay");
        var initQuiz;

        // 전체 다시 하기
        var $btnAllReplay = $(".allReplay");
        var initAllQuiz;

        // 힌트
        var $btnHint = $(".btnHint");
        var isHint;
        var toggleHint;

        //정오답 효과음 플레이
        var playFeedSound;

        var createQuizChk;
        var checkArr = [];

        var pageNumber = parseInt(location.href.substring(location.href.indexOf("page") + 4));
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
            var $btnCheck = $(".btnCheck[data-target='" + qid + "']");
            var $btnScript = $btnCheck.parent().find(".btnScript");
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
            var layerBoxPos;
            var $btnAudio = $(".btnAudio[data-target*='"+ qid +"']"); //오디오 버튼
            var chkAudio = $btnAudio.hasClass("played"); //오디오 재생 여부
            var isAskTest = $assessmentItem.parents(".askQuizContent").length !== 0 ? false : true; // 스스로 & 마무리 해봐요
            var name = $input.attr("name");

            var chkChoice = function() {
                $checkItem.addClass("on");
                $input.prop("checked", true);
            }

            var removeAllChk = function() {
                $checkItem.parent().find(".checkItem.on").removeClass("on");
                $input.prop("disabled", true);
                $checkItem.parent().find("input").prop("checked", false);
            }

            var removeChk = function() {
                $checkItem.removeClass("on");
                $input.prop("checked", false);
            }

            var removeSameChk = function() {
                $assessmentItem.find("input[name='"+ name +"']").parent().removeClass("on");
                $checkItem.addClass("on");
                $input.prop("checked", true);
            }

            // 정답 확인 시 입력 가능 여부
            if (isInputDiable && isChkAns) {
                $assessmentInput.prop("disabled", true);
                return;
            }

            isOn = $checkItem.hasClass("on");
            
            if (responseType === "singleChoice") { // 단수형
                removeAllChk();
                if (!isOn || !isCheckedToggle) {
                    chkChoice();
                }
            } else if (responseType === "multipleChoice") { // 복수형
                if (name){
                    removeSameChk();
                } else if (!isOn) {
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
         * 주관식 문제 풀기
         */
        inputEssay = function(e) {
            var $inputArea = $(this);
            var isClear = false; // 입력 문자가 있는 경우 삭제 여부
            var $assessmentItem = $inputArea.parents(".quizType");
            var qid = $assessmentItem.data("qid");
            var $btnCheck = $(".btnCheck[data-target='" + qid + "']");
            var $btnReplay = $(".btnReplay[data-target='" + qid + "']");
            var $btnScript = $btnReplay.parent().find(".btnScript, .btnTran");
            var isChkAns = $btnCheck.hasClass("on");
            
            if (isClear && $inputArea.val() !== "") {
                $inputArea.val("");
            };

            // 정답 확인 시 입력 가능 여부
            if (isInputDiable && isChkAns) {
                $inputArea.prop("disabled", true);
            }

            // 키 입력 시 정답 확인 활성화
            // $inputArea.off("keyup.add").on("keyup.add", function(e) {
            //     var keycode = e.keyCode;
            //     var isFillAll = false;
                
            //     // 모두 체크
            //     $assessmentItem.find("input[type='text']").each(function() {
            //         if ($(this).val() === "") {
            //             $btnCheck.removeClass("show");
            //             $btnScript.removeClass("show");
            //             isFillAll = false;
            //             return false;
            //         } else {
            //             isFillAll = true;
            //         }
            //     });
                
            //     if (isFillAll) {
            //         $btnCheck.addClass("show");
            //         $btnScript.addClass("show");
            //     }
                
            //     $(this).off("keyup.remove").on("keyup.remove", function() {
            //         if (!$inputArea.val()) {
            //             $btnCheck.removeClass("show");
            //             $btnScript.removeClass("show");
            //         }
            //     });
            // });
        }

        /**
         * 다시 하기
         */
        initQuiz = function() {
            var $this = $(this);
            var qid = $this.data("target");
            var $assessmentItem = $("[data-qid='" + qid + "']");
            var $assessmentInput = $assessmentItem.find("input, textarea");
            var responseType = $assessmentItem.data("response-type");
            var $btnCheck = $this.parent().find(".btnCheck");
            var $btnScript = $this.parent().find(".btnScript, .btnTran");
            var $returnTxt = $assessmentItem.find(".returnTxt");
            var $quizMark = $(".quizMarking[data-marking='" + qid + "']");
            var $btnAudio = $(".btnAudio[data-target='"+ qid +"']");
            var $returnResult;
            
            // 다시풀기 버튼 비활성화인 경우(정답 확인시에만 다시풀기 가능)
            // if (!$this.hasClass("on")) {
            //     return;
            // }
            resetAllMediaPlayer();
            
            // 퀴즈 마킹 있는 경우
            if ($quizMark.length) $quizMark.removeClass("correct wrong");

            // 오디오 버튼 있는 경우
            //if ($btnAudio.length) $btnAudio.removeClass("played");
            
            if (responseType === "singleChoice" || responseType === "multipleChoice" || responseType === "trueFalse") {
                // 저장된 사용자 입력 데이터 삭제
                if (parent !== window) {
                    $assessmentInput.each(function () {
                        var inputId = $(this).attr("id");
                        parent.API_ANNOTATION_INPUT_DELETE(inputId);
                    });
                }

                $assessmentInput.prop("disabled", false).prop("checked", false);

                // 텍스트 반환이 존재하는 경우
                if ($returnTxt.length) {
                    $returnResult = $(".returnResult[data-target='" + $returnTxt.data("target") + "']");

                    if ($returnResult[0].tagName === "input") {
                        $returnResult.val("").removeClass("answer");
                    } else {
                        $returnResult.text("").removeClass("answer");
                    }
                }
            } else {
                // 저장된 사용자 입력 데이터 삭제
                if (parent !== window) {
                    $assessmentInput.each(function () {
                        var inputId = $(this).attr("id");
                        parent.API_ANNOTATION_INPUT_DELETE(inputId);
                    });
                }
                
                $assessmentInput.val("");
                $assessmentInput.prop("disabled", false);
                $assessmentInput.css("pointer-events", "");
                
                if (responseType === "etc") {
                    $assessmentItem.find(".layerAnswer").hide();
                } else { // 주관식
                    $assessmentItem.find(".essayAnswer").removeClass("show");
                }
            }
            $this.removeClass("on");
            $assessmentItem.find(".checkItem").removeClass("on answer");
            $assessmentItem.find(".quizMarking").removeClass("correct wrong");
            $btnCheck.removeClass("on");
            $btnCheck.data("feedCnt", 0);
            if (isHint) {
                toggleHint(false);
            }
            $assessmentItem.find(".layerBox").hide();
            $btnScript.removeClass("show");

            // 음성 재생 비활성화
            if ($assessmentItem.hasClass("quizSoundCheck")) {
                $assessmentItem.find(".neutralize").each(function () {
                    var mpId = this.id;
                    setNeutralize(mpId, 'mpText', true);
                    $(this).css("cursor", "default");
                });
            }

            // Get Ready 다시풀기
            $this.parents(".active_area.n1").find(".answer_container .ansMsg").removeClass("show");
        }

        /**
         * 전체 다시 하기
         */
        initAllQuiz = function() {
            var target = $(this).data("target");
            var $totalQuiz = $("[data-qid='" + target + "']");
            var $btnReplay = $totalQuiz.find(".btnReplay");
            var $quizChkAll = $totalQuiz.find(".quizCheck");

            resetAllMediaPlayer();
            
            $btnReplay.trigger("click", [$btnReplay, true]);
            $quizChkAll.text("");
            checkArr = [];
        }

        /**
         * 정답 확인
         */
        chkAnswer = function(e, btnCheck, allCheck) {
            var $btnCheck = !$(e.target).hasClass("checkPoint") ? $(this) : btnCheck;
            var $btnReplay = $btnCheck.parent().find(".btnReplay");
            var qid = $btnCheck.data("target");
            var isAnsOn = $btnCheck.hasClass("on"); // 정답 표시 여부
            var $assessmentItem = $("[data-qid='" + qid + "']");
            var $checkItem = $assessmentItem.find(".checkItem");
            var $quizEssay = $assessmentItem.find(".quizEssay");
            var $assessmentInput = $assessmentItem.find("input, textarea");
            var $essayWrite = $quizEssay.find(".essayWrite");
            var $quizMark = $(".quizMarking[data-marking='" + qid + "']");
            var $returnTxt = $assessmentItem.find(".returnTxt");
            var responseType = $assessmentItem.data("response-type");
            var feedMsgNum = 0;
            var chanceCnt = $assessmentItem.data("chance"); // 오답시 다시 풀수 있는 기회
            var isMark = $assessmentItem.data("marking") ? true : false; // 마킹 여부
            var isAskTest = $assessmentItem.parents(".askQuizContent").length ? true : false; // 스스로 해봐요 문제 확인\
            var isAskGoal = $assessmentItem.parents(".askQuizContent").hasClass("my_goal");
            var chkSound = $assessmentItem.data("sound") ? true : false; //예외적으로 정오답 피드백 사운드 재생
            var multi = $assessmentItem.data("question-multi") ? true : false;
            var $quizChk = $assessmentItem.find(".quizCheck");
            var isAnsToggle = true; // 정답 확인 토글
            var isRemoveChk = false; // 정답 확인 시 입력 값 제거 여부
            var isReomveChkT = false; // 정답 확인 토글 시 입력 값 제거 여부
            var isInput = false; // 정답 입력 여부
            var efCheck = true; //정답 여부에 따른 효과음 재생
            var isFeedSound = !$btnCheck.hasClass("noFeedSound");
            var isCorrect = true; // 정오답 마킹
            var isAllChk = allCheck;
            var $chkItemParent;
            var $returnResult;

            var noSound = $assessmentItem.parents().hasClass("toastPopup") || $assessmentItem.parent().prev().data("bullet") === "F" || $assessmentItem.parents(".pop_container").attr("id") === "pop_practice_01" 
                || $assessmentItem.find(".icon").data("icon") === "ex_text" || $assessmentItem.parents().hasClass("intro_quest");

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

                if (option === 0 && !isAllChk) {
                    isChkAns = true;
                }

                $answerCorrect.each(function(idx) {
                    var $this = $(this);
                    var $itembody = $this.parent();
                    var itembodyLen = $answerCorrect.length;
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
                        
                        showFeedback("choice", answerArr, inputValArr, itembodyLen, idx);

                        if (!feedMsgNum) {
                            return;
                        } else if (feedMsgNum === 3) {
                            return false;
                        }
                    }
                    
                    if (feedMsgNum || !isFeed) {
                        $btnCheck.addClass("on").removeClass("show");
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
                            if (!$ansCheckItem.hasClass("on")) $ansCheckItem.addClass("answer");

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

                var $checkItemOn = $assessmentItem.find(".checkItem.on");

                // 정답 확인
                if (responseType !== "etc" && $btnCheck.hasClass("on")) {
                    if (noSound && !chkSound) return;

                    if (!$checkItemOn.length) {
                        isCorrect = false;
                        efCheck = false;
                    }
                    
                    $checkItem.each(function(i, ele) {
                        var $item = $(this);
                        var choiceBox = $item.parent();
                        var chkItem = choiceBox.find(".checkItem");

                        if ($item.hasClass("answer")) {
                            isCorrect = false;
                            efCheck = false;
                            return;
                        }
                    });

                    if (responseType === "multipleChoice"){
                        var answers = $answerCorrect.text().split("\/\/");
                        var answerLen = answers.length;
                        var chkItem = [];
                        
                        if ($checkItemOn.length !== answerLen) {
                            isCorrect = false;
                            efCheck = false;
                        }
                        
                        $checkItem.each(function(i) {
                            chkItem.push(i);
                        });

                        for (var j = 0; j < answerLen; j++){
                            var answer = answers[j] - 1;
                            for (var k = 0; k < chkItem.length; k++){
                                var chkIdx = chkItem[k];
                                if (chkIdx === answer) chkItem.splice(k, 1);
                            }
                        }
                        
                        for (var k = 0; k < chkItem.length; k++){
                            $checkItem.eq(chkItem[k]).removeClass("on");
                        }
                    }

                    if (!isAskTest){
                        if (multi){
                            if (isCorrect) $quizChk.text("true");
                            else $quizChk.text("false");
                        } else {
                            if (isFeedSound) playFeedSound(efCheck); // 정오답 효과음
                            showMarking(isCorrect); // 마킹
                        }
                    } else {
                        if (isAskGoal){
                            if (multi){
                                if (isCorrect) $quizChk.text("true");
                                else $quizChk.text("false");
                            } else showMarking(isCorrect); // 마킹
                        } else {
                            if (isFeedSound) playFeedSound(efCheck); // 정오답 효과음
                            showMarking(isCorrect); // 마킹
                        }
                    }
                    
                    DTCaliperSensor.fire({
                        correct: isCorrect, // 정답 여부입력 true, false 중에서 택일
                        itemObject: $assessmentItem[0], // 해당 문항 객체
                        value: $assessmentItem.find(".answerCorrect").text(), // 실제 정답 데이터 입력 <correctResponse>에 입력된 값과 동일,
                        userValue: $assessmentItem.find(".checkItem.on").index() + 1, // 사용자가 실제로 입력한 값
                        description: "", // 문항에 대한 설명
                        pageNumber: pageNumber // 교과서 페이지 번호 값
                    });
                }

                $checkItem.find("input").prop("disabled", true);

                // 음성 재생 활성화
                if ($assessmentItem.hasClass("quizSoundCheck")) {
                    $assessmentItem.find(".neutralize").each(function () {
                        var mpId = this.id;
                        setNeutralize(mpId, 'mpText', false);
                        $(this).css("cursor", "pointer");
                    });
                }
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
                var regExp = /[\,\"]/gi;
                var apExp = /[\'\’]/gi;
                var allAnsStr = "";
                var allUserVal = "";
                var essayVal, essayAnsVal;

                // 음성 재생 활성화
                if ($assessmentItem.hasClass("quizSoundCheck")) {
                    $assessmentItem.find(".neutralize").each(function () {
                        var mpId = this.id;
                        setNeutralize(mpId, 'mpText', false);
                        $(this).css("cursor", "pointer");
                    });
                }
                
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

                if (feedMsgNum || !isFeed) {
                    $btnCheck.addClass("on").removeClass("show");
                    $btnReplay.addClass("on");
                    // 입력 값 제거
                    if (isRemoveChk) {
                        removeUserChk();
                    }
                }
                
                // 정답 표시 (토스트 팝업)
                $essayAnswers.addClass("show");
            
                // 정답 확인
                if ($btnCheck.hasClass("on") && $essayAnswers.length) {
                    // input 비활성화
                    $essayWrite.css("pointer-events", "none");
                    $essayWrite.blur();
                    
                    if (noSound && !chkSound) return;

                    // 정답 확인
                    $essayWrite.each(function(i) {
                        var $this = $(this);
                        var essay = $this.val().trim();
                        var essayAns = $this.next(".answerCorrect").text().trim();

                        if (essayAns.length === 0) essayAns = $this.parent().find(".answerCorrect").text().trim();
                        
                        essayVal = essay.replace(regExp, "").replace(apExp, "'");
                        essayAnsVal = essayAns.replace(regExp, "").replace(apExp, "'");

                        allAnsStr += essayAns;
                        allUserVal += essayVal;
                        if (i !== $essayWrite.length - 1) {
                            allAnsStr += ",";
                            allUserVal += ",";
                        }
                        
                        inputValArr[i] = essay;
                        answerArr[i] = essayAns;

                        if ($.isNumeric(essayAnsVal) && !$.isNumeric(essayVal)) {
                            var numArr = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven"];
                            essayAnsVal = numArr[essayAns - 1];
                        } 
                            
                        if (essayVal !== essayAnsVal) {
                            efCheck = false;
                            isCorrect = false;
                        }
                    });

                    if (!isAskTest){
                        if (inputValArr.length !== answerArr.length) {
                            efCheck = false;
                            isCorrect = false;
                        }
                    
                        if (multi){
                            if (isCorrect) $quizChk.text("true");
                            else $quizChk.text("false");
                        } else {
                            if (isFeedSound) playFeedSound(efCheck); // 정오답 효과음
                            showMarking(isCorrect); // 마킹
                        }
                    } else {
                        if (isAskGoal){
                            if (multi){
                                if (isCorrect) $quizChk.text("true");
                                else $quizChk.text("false");
                            } else showMarking(isCorrect); // 마킹
                        } else {
                            if (isFeedSound) playFeedSound(efCheck); // 정오답 효과음
                            showMarking(isCorrect); // 마킹
                        }
                    }

                    DTCaliperSensor.fire({
                        correct: isCorrect, // 정답 여부입력 true, false 중에서 택일
                        itemObject: $assessmentItem[0], // 해당 문항 객체
                        value: allAnsStr, // 실제 정답 데이터 입력 <correctResponse>에 입력된 값과 동일,
                        userValue: allUserVal, // 사용자가 실제로 입력한 값
                        description: "", // 문항에 대한 설명
                        pageNumber: pageNumber // 교과서 페이지 번호 값
                    });
                }
            }

            // 피드백 보여주기
            var showFeedback = function (type, answerArr, inputValArr, itembodyLen, idx) {
                if (answerArr.toString() === inputValArr.toString()) {
                    console.log(':::::::::정답입니다');
                    if (type === "choice" && (idx !== itembodyLen - 1 || feedMsgNum === 2)) {
                        console.log(':::::::::모두 정답은 아님');
                    } else {
                        feedMsgNum = 1;
                    }
                } else if (feedCnt < chanceCnt) {
                    console.log(':::::::::다시 풀어주세요');
                    feedCnt++;
                    $btnCheck.data("feedCnt", feedCnt);
                    feedMsgNum = 3;

                    if (isHint && !$btnHint.length) {
                        toggleHint(true);
                    }
                } else {
                    console.log(':::::::::오답입니다');
                    $btnCheck.data("feedCnt", 0);
                    feedMsgNum = 2;
                }
                
                if (feedMsgNum) {
                    $feedback.show();
                    $feedback.eq(feedMsgNum).show();
                }
            }

            // 채점 표시(마킹)
            var showMarking = function(isCorrect) {
                if (isMark) {
                    if (feedMsgNum !== 0) {
                        if (feedMsgNum === 1) {
                            $quizMark.addClass("correct");
                        } else {
                            $quizMark.addClass("wrong");
                        }
                    }

                    if (isCorrect){
                        $quizMark.addClass("correct");
                    } else {
                        $quizMark.addClass("wrong");
                    }
                }
            }

            // 미디어 플레이어 리셋
            resetAllMediaPlayer();

            // 조건 값 설정
            isFeed = $assessmentItem.data("feedback") ? true : false; // 피드백 여부
            feedCnt = $btnCheck.data("feedCnt");
            if (!feedCnt) {
                feedCnt = 0;
            }
            chanceCnt = chanceCnt ? chanceCnt : 1;
            isHint = $assessmentItem.data("hint") ? true : false; // 힌트 여부

            if ($btnCheck.hasClass("btnChkEssay")) return false;
            if ($btnCheck.hasClass("allCheck")){
                $btnCheck.addClass("on").removeClass("show");
                $btnReplay.addClass("on");
                return false;
            }

            if (responseType === "singleChoice" || responseType === "multipleChoice" || responseType === "trueFalse" || responseType === "etc") {
                $chkItemParent = $assessmentItem.find(".checkItem").parent();
                isInput = chkUserInput(responseType, $chkItemParent);

                if (isAnsOn) {
                    if (isAnsToggle) {
                        if (responseType === "etc") {
                            $checkItem.find(".layerAnswer").hide();
                        } else {
                            $checkItem.removeClass("answer");
                        }
                        $checkItem.find("input").prop("disabled", false);
                        $btnCheck.removeClass("on");
                        $btnReplay.removeClass("on");
                        
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
                        if (isFeed) {
                            console.log(':::::::::문제를 풀어주세요');
                            $feedback.show();
                            $feedback.eq(0).show();
                        } else {
                            chkChoiceAns();
                        }
                    }
                }
            } else { // 주관식
                isInput = chkUserInput(responseType, $quizEssay);
                
                if (isAnsOn) {
                    if (isAnsToggle) {
                        $assessmentInput.css("pointer-events", "");
                        $assessmentInput.prop("disabled", false);
                        $quizEssay.find(".essayAnswer").removeClass("show");
                        $btnCheck.removeClass("on");
                        $btnReplay.removeClass("on");

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
                        $assessmentInput.css("pointer-events", "none");
                        $assessmentInput.prop("disabled", true);

                        if (isFeed) {
                            chkEssayAns(0);
                        } else {
                            chkEssayAns();
                        }
                    } else {
                        if (isFeed) {
                            console.log(':::::::::문제를 풀어주세요');
                            $feedback.show();
                            $feedback.children().eq(0).show();
                        } else {
                            $assessmentInput.css("pointer-events", "none");
                            $assessmentInput.prop("disabled", true);
                            chkEssayAns();
                        }
                    }
                }
            }

            if (isAllChk && !noSound){
                var $totalQuiz = $assessmentItem.parent();
                var $btnCheckAll = $totalQuiz.find(".btnCheck");
                var $quizChkAll = $totalQuiz.find(".quizCheck");
                var length = $btnCheckAll.length;
                var totalQid;

                checkArr.push('check');

                if (length === checkArr.length) {
                    totalQid = $totalQuiz.data("qid");
                    $quizMark = $(".quizMarking[data-marking='"+ totalQid +"']");
                    isMark = $totalQuiz.data("marking") ? true : false; 

                    $quizChkAll.each(function() {
                        if ($(this).text() === "false"){
                            isCorrect = false;
                            efCheck = false;
                        }
                    });

                    if (responseType === "etc"){
                        var dropBox = $assessmentItem.find(".drop_container .dropBox");

                        dropBox.each(function() {
                            var $this = $(this);

                            if (!$this.attr("iscorrect") || $this.attr("iscorrect") === "false"){
                                isCorrect = false;
                                efCheck = false;
                            }
                        });
                    }

                    if (isAskGoal) {
                        showMarking(isCorrect);
                    } else {
                        showMarking(isCorrect);
                        playFeedSound(efCheck);
                    }
                }
            }
            // Get Ready 정답처리
            $btnCheck.parents(".active_area.n1").find(".answer_container .ansMsg").addClass("show");
        }

        /**
         * 전체 정답 확인
         */
        chkAllAnswer = function() {
            var target = $(this).data("target");
            var $totalQuiz = $("[data-qid='" + target + "']");
            var $btnCheck = $totalQuiz.find(".btnCheck");

            $btnCheck.trigger("click", [$btnCheck, true]);
        }

        /**
         * 값 입력 여부 확인
         * @param {string} type
         * @param {jQuery Object} $ele
         */
        chkUserInput = function(type, $ele) {
            var isInput = false;

            if (type !== "fillInTheBlank" && type !== "essay") {
                $ele.each(function () {
                    var $this = $(this);

                    if (type === "etc") {
                        if ($this.find(".checkItem").not(".on").length) {
                            isInput = false;
                            return false;
                        } else {
                            isInput = true;
                        };
                    } else {
                        isInput = $this.find(".checkItem").hasClass("on");
                        if (!isInput) {
                            return false;
                        }
                    }
                });
            } else {
                $ele.find("input, textarea").each(function () {
                    if (this.value !== "" || !$(this).nextAll(".answerCorrect").length) {
                        isInput = true;
                    } else {
                        isInput = false;
                        return false;
                    }
                });
            }

            return isInput;
        }

        /**
         * 힌트 토글
         */
        toggleHint = function() {
            var targetId = $(this).data("target");
            $("#" + targetId).find(".hintMessage").toggle();
        }
        
        //정오답 효과음 플레이
        playFeedSound = function(efCheck) {
            var clickAudio;

            if (efCheck) clickAudio = document.getElementsByClassName('feedOk')[0];
            else clickAudio = document.getElementsByClassName('feedNo')[0];

            if(!clickAudio.ended) {
                clickAudio.currentTime = 0;
             }
             clickAudio.play();
        }

        createQuizChk = function() {
            var $quizType = $(".quizType");

            $quizType.each(function() {
                $(this).append("<div class='quizCheck' style='display: none;'></div>")
            });
        }
        // 이벤트 핸들러 등록
        if (isSolve) {
            $(".checkPoint").on("click", selectChoice);
            $(".quizEssay").find("input, textarea").on("click", inputEssay);
            if ($btnChkAll.length) createQuizChk();
        }
        $btnReplay.on("click", initQuiz);
        $btnAllReplay.on("click", initAllQuiz);
        $btnCheck.on("click", chkAnswer);
        $btnChkAll.on("click", chkAllAnswer);
        $feedback.on("click", function() {
            var $this = $(this);
            $this.removeClass("showOn").hide();
            $this.children().hide();
        });
        $btnHint.on("click", toggleHint);
    }
);