/**
 * JavaScript UI Library
 * @author DEV
 * @copyright DEV 2018
 */

"use strict";

var dev;
if (typeof require !== "undefined") {
    dev = require("./module-base.js").DEV;
}
dev.createNs('ui');

/**
 * UI 기능 코드
 * @namespace ui
 * @memberOf DEV
 */
dev.ui = (function() {
    // dependency
    var util = dev.util;

    // variables
    var curDir = location.href.split("/").slice(-2)[0]; // e.g. m01

    // 팝업 내 슬라이드 페이지 연결
    // var slideNum;
    
    // 선긋기
    var storedLineObj = {};
    var resetDrawLine;
    
    // 자가 테스트
    var selfScoreArr = [];

    // 피드백 메세지
    var msgTimer;

    // btnShow 초기화
    var initBtnShow = function(el) {
        var hideBoxes = el.getElementsByClassName("hideTxtBox");
        var hideBoxLen = hideBoxes.length;
        var chkAnswerBtn = el.querySelector(".btn_wrap button");
        var i = 0;

        if (!hideBoxLen) {
            return;
        }

        for (; i < hideBoxLen; i++) {
            hideBoxes[i].classList.remove("blind");
        }

        if (chkAnswerBtn) {
            chkAnswerBtn.classList.remove("btnReplay");
        }
    }
    // 슬라이드 페이지 퀴즈 초기화
    var resetSlideQuiz = function(tSlide) {
        var $slideCont = tSlide ? tSlide : $("slideContent");
        var $onSlide = $slideCont.find(".slideList.on");
        var $btnCheck = $onSlide.find(".btnCheck");
        var $btnReplay = $onSlide.find(".btnReplay");
        var $btnScript = $onSlide.find(".btnScript");
        var $quizMarking = $onSlide.find(".quizMarking");
        var $assessmentItem = $onSlide.find(".quizType");
        var type = $assessmentItem.data("response-type");
        var $essayWrite = $assessmentItem.find(".essayWrite");
        var $answer = $assessmentItem.find(".answerCorrect");
        var $checkItem = $assessmentItem.find(".checkItem");
        var canvas, context, $lineStart, $lineEnd;
        
        // 퀴즈 입력 값 초기화
        if (type === "fillInTheBlank") {
            $essayWrite.val("");
            $answer.removeClass("show");
        } else if (type === "singleChoice") {
            $checkItem.removeClass("on answer");
            $checkItem .find("input").prop("checked", false);
        } else if (typeof type === "undefined") {
            $onSlide.find("input, textarea").val("");
        } else {
            if ($checkItem.length){ $checkItem.removeClass("on answer"); }
            // 선긋기
            canvas = $assessmentItem.find("canvas")[0];
            if (canvas) {
                context = canvas.getContext("2d");
                context.clearRect(0, 0, canvas.width, canvas.height);
                $(canvas).data("isAnsShow", false);
                storedLineObj[canvas.id] = [];

                $lineStart = $assessmentItem.find(".lineStart");
                $lineEnd = $assessmentItem.find(".lineEnd");
                $lineStart.removeClass("done");
                $lineEnd.removeClass("done");
            }
            // 아직 슬라이드 내 드래그 존재하는 경우 없음
            // var $drawSet = $assessmentItem.find(".draw_set");
            // var $dragContainer = $assessmentItem.find(".quiz_drag");

            // if ($drawSet.length) {
            //     var $lineStart = $drawSet.find(".lineStart");
            //     var $lineEnd = $drawSet.find(".lineEnd");

            //     $lineStart.removeClass("done");
            //     $lineEnd.removeClass("done");
            //     $lineStart.removeAttr("data-target");
            // }

            // if ($dragContainer.length) {
            //     var $dragBox = $dragContainer.find(".dragBox");
            //     var $dropBox = $assessmentItem.find(".dropBox");
            //     var $ansMsg = $dropBox.find(".ansMsg");

            //     $dragBox.removeClass("blind");
            //     $dragBox.removeAttr("data-drag data-top data-left data-drop style");

            //     $dropBox.removeAttr("data-drag");
            //     $ansMsg.removeClass("show");
            // }
        }

        // 음성 재생 비활성화
        $assessmentItem.find(".neutralize").each(function () {
            var mpId = this.id;
            setNeutralize(mpId, 'mpText', true);
            $(this).css("cursor", "default");
        });
        
        
        // 버튼, 마킹 숨김
        $btnCheck.removeClass("on show");
        $btnReplay.removeClass("on show");
        $btnScript.removeClass("show");
        $quizMarking.removeClass("correct wrong");

    }

    // 해석 보기 초기화
    // var resetBtnTran = function(tArea) {
    //     // 스크립트 해석 보기 초기화
    //     var targetArea = tArea ? tArea.closest(".pop_content") : document;
    //     var btnTran = targetArea.getElementsByClassName("btnTran")[0];
    //     var btnTranShow = targetArea.getElementsByClassName("btnTranShow")[0];
    //     var tKorBtns = targetArea.getElementsByClassName("tKor");
    //     var tKorBtnLen = tKorBtns.length;
    //     var i = 0;
    //     var tKorClass;

    //     if (btnTran) {
    //         for (i = 0; i < tKorBtnLen; i++) {
    //             tKorClass = tKorBtns[i].classList;
    //             tKorClass.remove("on");
    //             tKorClass.remove("active");
    //         }

    //         btnTran.classList.remove("on");
    //         btnTranShow.classList.remove("on");
    //     }
    // }

    // 모든 오디오 요소 정지
    var stopAllAudio = function() {
        var $audio = $("audio");

        $audio.each(function() {
            var target = this.id.substring(6);
            var $btnPlay = $(".btnAudioBubble[data-target='" + target + "']");

            this.pause();
            if (!isNaN(this.duration)){
                this.currentTime = 0;
            }
            $btnPlay.removeClass("on");
        });
    }

    return {
        /**
         * 스케일 값
         * @memberOf DEV.ui
         */
        scaleVal: {
            x: 1,
            y:1 
        },
        /**
         * 화면 스케일
         * @memberOf DEV.ui
         */
        setScale: function() {
            var containerEl = document.getElementById("wrap");
            var windowW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            var windowH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            var hRatio = windowW / containerEl.clientWidth;
            var vRatio = windowH / containerEl.clientHeight;
            var isFull = true; // 풀사이즈 / 정비율
            var ratio, left;

            var setTransform = function (containerEl, hRatio, vRatio) {
                containerEl.setAttribute("style", "transform: scale(" + hRatio + "," + vRatio + ");"
                    + "-ms-transform: scale(" + hRatio + "," + vRatio + ");"
                    + "-webkit-transform: scale(" + hRatio + "," + vRatio + ");"
                    + "transform-origin: 0% 0%; -ms-transform-origin: 0% 0%; -webkit-transform-origin: 0% 0%;"
                    + "left:" + left);
            }

            if (isFull) {
                left = 0;
            } else {
                ratio = (hRatio < vRatio) ? hRatio : vRatio
                left = windowW / 2 - containerEl.clientWidth / 2 * ratio + "px";
                hRatio = ratio;
                vRatio = ratio;
            }

            this.scaleVal.x = hRatio;
            this.scaleVal.y = vRatio;

            setTransform(containerEl, hRatio, vRatio);
        },
        /**
         * 텍스트/이미지를 가리고 있는 영역 토글
         * @memberOf DEV.ui
         */
        clickBtnShow: function() {
            var $btnShow = $(".btnShow");
            var $btnAnswer = $(".btnAllShow");

            // hideTxtBox 생성
            $btnShow.each(function(i, btn) {
                if (!$(btn).data("layout")) {
                    util.createEl("span", btn, "afterend", "hideTxtBox");
                }
            });

            $btnShow.on("click", function() {
                var $btn = $(this);
                var $hideBox = $btn.next();
                var targetId = $btn.data("target");
                var $targetCont = $("#" + targetId);
                var $btnAns = $(".btnAllShow[data-target='" + targetId + "']");

                if ($hideBox.hasClass("disabled")) return;
                if ($btn.data("layout")) {
                    $hideBox.toggleClass("show");
                } else {
                    $hideBox.toggleClass("blind");
                }

                // 정답 확인 버튼이 있는 경우
                if ($btnAns.length) {
                    if ($targetCont.find(".hideTxtBox").hasClass("blind")) {
                        $btnAns.addClass("btnReplay");
                    } else {
                        $btnAns.removeClass("btnReplay");
                    }
                }
            });

            $btnAnswer.on("click", function() {
                var $btnAns = $(this);
                var targetId = $btnAns.data("target");
                var targetCont = $("#" + targetId);
                var $hideBox = targetCont.find(".hideTxtBox");
                
                if (!$btnAns.hasClass("btnReplay")) {
                    $hideBox.addClass("blind");
                } else {
                    $hideBox.removeClass("blind");
                }
                $btnAns.toggleClass("btnReplay");
            });

            // 다시 풀기 버튼 있는 경우

        },
        /**
         * 슬라이드 생성
         * @memberOf DEV.ui
         */
        initSlide: function() {
            var $slideConts = $(".slideContent");
            var slideContsLen = $slideConts.length;
            var isPagination = false;
            var isCircuit = false;
            var i = 0, j = 0;
            var $slideCont, $slideDetail, $slideList, slideListLen;
            var $firstPage;
            var $btnPrev, $btnNext;
            var $slideDot, $dotList, onClass;
            var $frag;
            var $popWrap;

            for (; i < slideContsLen; i++) {
                $slideCont = $($slideConts[i]);
                $slideDetail = $slideCont.find(".slideDetail");
                $slideList = $slideDetail.find("> li").addClass("slideList");
                slideListLen = $slideList.length;
                isPagination = $slideCont.data("navigation");
                isCircuit = $slideCont.data("circulation");
                $firstPage = $slideList.first().addClass("on");
                $popWrap = $slideCont.parents(".popWrap");

                // 다음/이전 버튼 생성
                $slideCont.append("<div id='slideBtnWrap'><div class='btnPrev'></div><div class='btnNext'></div></div>");
                $btnPrev = $slideCont.find(".btnPrev");
                $btnNext = $slideCont.find(".btnNext");

                if (!isCircuit) {
                    // 이전 버튼 비활성화
                    $btnPrev.addClass("off");
                }

                // 이전/다음 버튼 클릭
                $btnPrev.parent().on("click", function(e) {
                    var $btn = $(e.target);
                    var $targetSlide = $btn.parents(".slideContent");
                    var $slideDetail = $targetSlide.find(".slideDetail");
                    var $slideList = $slideDetail.find("> li");
                    var $curPage = $slideDetail.find("> .on");
                    var isCircuit = $targetSlide.data("circulation");
                    var isPagination = $targetSlide.data("navigation");
                    var $nextPage;
                    var $slideDot, idx;
                    
                    if ($btn.hasClass("off")) {
                        return;
                    }

                    // 초기화
                    resetAllMediaPlayer();
                    // resetSlideQuiz($targetSlide);
                    // initBtnShow(currPageEl);
                    // resetDrawLine(currPageEl);

                    if ($btn.hasClass("btnPrev")) {
                        $nextPage = $curPage.prev();

                        if (!isCircuit) {
                            if (!$nextPage.prev().length) {
                                $btn.addClass("off");
                            }
                            $btn.next().removeClass("off");
                        } else {
                            if (!$nextPage.length) {
                                $nextPage = $slideList.last();
                            }
                        }
                    } else {
                        $nextPage = $curPage.next();

                        if (!isCircuit) {
                            if (!$nextPage.next().length) {
                                $btn.addClass("off");
                            }
                            $btn.prev().removeClass("off");
                        } else {
                            if (!$nextPage.length) {
                                $nextPage = $slideList.first();
                            }
                        }
                    }

                    $curPage.removeClass("on");
                    $nextPage.addClass("on");
                    
                    // 모션(제거)
                    $nextPage.removeClass("prev");
                    if( $nextPage.index() > $curPage.index() ) $curPage.addClass("prev");

                    // pagination 연동
                    if (isPagination) {
                        $slideDot = $targetSlide.find(".slideDotted");
                        idx = $nextPage.index();

                        $slideDot.find(".on").removeClass("on");
                        $slideDot.find("li").eq(idx).addClass("on");
                    }
                });

                if (isPagination) {
                    // pagination 생성
                    $slideCont.append("<ul class='slideDotted'></ul>");
                    $slideDot = $slideCont.find(".slideDotted");
                    $frag = $(document.createDocumentFragment());

                    for (j = 0; j < slideListLen; j++) {
                        onClass = !j ? "on" : "";
                        $frag.append("<li class='" + onClass + "'></li>");
                    }
                    $slideDot.append($frag);
                    $dotList = $slideDot.find("li");
                    
                    // pagiantion 중앙 정렬 - 뷰어에서 수치를 바로 가져오지 못해서 우선 css 처리
                    // if ($popWrap.length) {
                    //     $popWrap.add("show");
                    //     $slideDot.css("left", (parseInt($slideCont.css("width")) - parseInt($slideDot.css("width"))) / 2);
                    //     $popWrap.remove("show");
                    // } else {
                    //     $slideDot.css("left", (parseInt($slideCont.css("width")) - parseInt($slideDot.css("width"))) / 2);
                    // }

                    // pagination 이벤트 등록
                    $dotList.on("click", function() {
                        var $this = $(this);
                        var $targetSlide = $this.parents(".slideContent");
                        var $slideDetail = $targetSlide.find(".slideDetail");
                        var $slideList = $slideDetail.find("> li");
                        var listLen = $slideList.length;
                        var $curPage = $slideDetail.find("> .on");
                        var $curDot = $this.parent().find(".on");
                        var curIdx = $this.index();
                        var $targetPage = $slideList.eq(curIdx);
                        var isCircuit = $targetSlide.data("circulation");
                        var $btnNext = $targetSlide.find(".btnNext");
                        var $btnPrev = $targetSlide.find(".btnPrev");

                        // 초기화
                        resetAllMediaPlayer();
                        // resetSlideQuiz($targetSlide);
                        // initBtnShow($curPage);
                        // resetDrawLine($curPage);
                        // resetBtnTran($curPage);

                        $curPage.removeClass("on");
                        $targetPage.addClass("on");
                        $curDot.removeClass("on");
                        $this.addClass("on");
                        
                        // 모션
                        $targetPage.removeClass("prev");
                        if( $targetPage.index() > $curPage.index() ) $curPage.addClass("prev");

                        if (!isCircuit) {
                            if (curIdx) {
                                $btnPrev.removeClass("off");
                                if (curIdx === (listLen - 1)) {
                                    $btnNext.addClass("off");
                                } else {
                                    $btnNext.removeClass("off");
                                }
                            } else {
                                $btnPrev.addClass("off");
                                $btnNext.removeClass("off");
                            }
                        }
                    });
                }
            }
        },
        /**
         * 탭 설정
         * @memberOf DEV.ui
         */
        initTab: function() {
            var $tabContents = $(".tabContent");
            
            $tabContents.each(function() {
                var $this = $(this);
                var $tabs = $this.find(".tabMenu li");
                var $tabDetails = $this.find(".tabDetail > li");


                $tabs.eq(0).addClass("on");
                $tabDetails.eq(0).addClass("on");

                $tabs.on("click", function() {
                    var $this = $(this);
                    var tabIdx = $this.index();
    
                    $tabs.removeClass("on");
                    $tabDetails.removeClass("on");
                    $this.addClass("on");
                    $tabDetails.eq(tabIdx).addClass("on");
    
                    // 초기화
                    resetAllMediaPlayer();
                    // 디교는 문제풀이 초기화 안함
                    // initBtnShow(currDetail);
                    // resetDrawLine(currDetail);
                });
            });
            
            
            

        },
        /**
         * 라이트박스 팝업
         * @memberOf DEV.ui
         */
        initLbPop: function() {
            var $popBtn = $(".popUp");
            
            $popBtn.on("click", function(e) {
                var $this = $(this);
                var isAutoplay = $this.hasClass("autoplay");
                var popId = $this.data("popup");
                var isOverlap = $this.data("overlap");
                var $popContainer = $("#" + popId);
                var popType = $popContainer.data("type");
                var $popWrap = $popContainer.parent();
                var $btnClose = $popContainer.find(".btnPopupClose");
                var posData = $this.data("pos")
                var posArr = posData ? posData.split(" ") : [];
                var left = posArr[0];
                var top = posArr[1];
                var $slideList = $popContainer.find(".slideList");
                var slideNum;
                var popWrapW, popWrapH, popContW, popContH;
                var $btnPrev, $btnNext;

                var closePopup = function() {
                    var $popCont = $(this);
                    var $popWrap = $popCont.parents(".popWrap");

                    $popWrap.removeClass("show");
                    resetAllMediaPlayer();
                    stopAllAudio();
                    $(document).off("click.pop");

                    // 따라 말하기 버튼 초기화
                    $(".popUp[data-popup='" + popId + "']").siblings(".btnFollow").removeClass("on");

                    // 낱말읽기 디폴트
                    if ($this.hasClass("btnReadWord")) {
                        $popWrap.find(".word_d").removeClass("on");
                        $popWrap.find(".btnTran").removeClass("on");
                    }
                    
                    // 본문 연습하기 초기화
                    if ($this.hasClass("btnPen") || $this.hasClass("btnPractice")) {
                        $popWrap.find(".btnReplay").click();
                        $popWrap.find(".essayWrite").val("");
                    }
                    // 슬라이드 초기화
                    // resetSlide(popWrapEl);

                    // 초기화
                    // 디교는 문제풀이 초기화 안함
                }

                e.stopPropagation();

                // 미디어플레이어 요청
                // if (onPopupToMediaPlayer) onPopupToMediaPlayer();

                // 다른 팝업 모두 닫기
                if (!isOverlap && !$this.parents(".popWrap").length) {
                    $(".popWrap").removeClass("show");
                }

                // 토스트 닫기
                $(".btnToastUp").each(function () {
                    var $this = $(this);
                    $this.removeClass("toastOn");
                    $this.next().removeClass("show");
                });
                
                // 팝업 토글, 버튼이 드래그 가능한 경우, 드래그시 팝업 열지 않음
                if (!$this.hasClass("onDrag")) {
                    $popWrap.toggleClass("show");
                }

                if (!isAutoplay) {
                    resetAllMediaPlayer();
                    stopAllAudio();
                }

                // 팝업 위치 설정
                if (posData) {
                    $popContainer.css("top", top + "px");
                    $popContainer.css("left", left + "px");
                } else if (popType !== "Full") {
                    popWrapW = parseInt($popWrap.css("width"));
                    popWrapH = parseInt($popWrap.css("height"));
                    popContW = parseInt($popContainer.css("width"));
                    popContH = parseInt($popContainer.css("height"));

                    $popContainer.css("top", (popWrapH - popContH) / 2);
                    $popContainer.css("left", (popWrapW - popContW) / 2);
                }

                // 팝업 닫기 버튼
                $btnClose.off("click.lbPop").on("click.lbPop", closePopup);

                // 팝업 외부 클릭 시 닫기
                $(document).on("click.pop", function(e) {
                    var target = e.target;
                    if (!$.contains($popContainer[0], target) && $popContainer[0] !== target && !$(target).parents(".popWrap").length) {
                        closePopup.call($popContainer[0]);
                        $(document).off("click.pop");
                        stopAllAudio();
                    }
                });

                // 슬라이드 연동
                if ($slideList.length) {
                    $btnPrev = $popContainer.find(".btnPrev");
                    $btnNext = $popContainer.find(".btnNext");
                    slideNum = $this.data("slide") ? $this.data("slide") : 0;
                    $slideList.removeClass("on");
                    $slideList.eq(slideNum).addClass("on");

                    if (slideNum) {
                        $btnPrev.removeClass("off");
                        $btnNext.removeClass("off");
                    } else {
                        $popContainer.find(".btnPrev").addClass("off");
                        $popContainer.find(".btnNext").removeClass("off");
                    }

                    if (slideNum === $slideList.length - 1) {
                        $btnNext.addClass("off");
                    }

                    // 슬라이드 애니메애션 관련
                    $slideList.removeClass("prev");
                    for (var i = slideNum - 1; i >= 0; i--) {
                        $slideList.eq(i).addClass("prev");
                    }

                    // pagination 연동
                }

                // 대본 보기 팝업 설정
            });
            
            // var transBtn, btnShowKor, korScripts, korScriptLen, btnAllShow;
            // var containerW, containerH, popupW, popupH;
            // var slideNum;

            // // 슬라이드 페이지 연결
            // slideNum = this.getAttribute("data-slideNum");
            // if (slideNum) {
            //     contentEl.querySelector(".slideDotted > li:nth-child(" + slideNum + ")").click();
            // }
            
            // 대본 보기 팝업 설정
            // if (btnClasses.contains("btnScript") || btnClasses.contains("btnSentence") || btnClasses.contains("ar_prew")) {
            //     // 스크립트 해석 보기 초기화
            //     transBtn = document.getElementsByClassName("btnTran")[0];
            //     btnAllShow = document.getElementsByClassName("btnTranShow")[0];
            //     btnShowKor = document.querySelector(".btnTranShow.p_ex");
            //     korScripts = popContainer.getElementsByClassName("tKor");
            //     korScriptLen = korScripts.length;

            //     for (j = 0; j < korScriptLen; j++) {
            //         korScripts[j].classList.remove("on");
            //         korScripts[j].classList.remove("active");
            //     }

            //     if (transBtn) {
            //         transBtn.classList.remove("on");
            //         btnAllShow.classList.remove("on");
            //     } else if (btnShowKor){
            //         btnShowKor.classList.remove("on");
            //     }
            // }

        },
        /**
         * 레이어 팝업 설정
         * @memberOf DEV.ui
         */
        initLayerPop: function() {
            var btnSets = document.getElementsByClassName("layerBtnSet");
            var setLen = btnSets.length;
            var i, j, btns, btnLen;

            for (i = 0; i < setLen; i++) {
                btns = btnSets[i].getElementsByClassName("layerPopUpBtn");
                btnLen = btns.length;

                for (j = 0; j < btnLen; j++) {
                    btns[j].addEventListener("click", function (e) {
                        var btnSetEl = this.closest(".layerBtnSet");
                        var popId = btnSetEl.getAttribute("data-popup");
                        var popWrapEl = document.getElementById(popId).parentElement;
                        var popups = popWrapEl.querySelectorAll(".layerPopup > li");
                        var btnEls = btnSetEl.getElementsByClassName("layerPopUpBtn");
                        var btnElsArr = [].slice.call(btnEls);
                        var popIdx = btnElsArr.indexOf(this);
                        var selPop = popups[popIdx];

                        popWrapEl.classList.add("show");
                        selPop.classList.add("show");

                        e.stopPropagation();
                        document.addEventListener("click", function hideLayerPop(e) {
                            if (!selPop.contains(e.target)) {
                                popWrapEl.classList.remove("show");
                                selPop.classList.remove("show");
                                document.removeEventListener("click", hideLayerPop);
                            }
                        });
                    });
                }
            }
        },
        /**
         * 토스트 설정
         * @memberOf DEV.ui
         */
        initToast: function() {
            var $btnToast = $(".btnToastUp");
            var $btnReplay = $(".btnToastRe");
            var hideToast;

            $btnToast.on("click", function(e) {
            // $(document).on("click", ".btnToastUp", function(e) {
                var $this = $(this);
                var $toast = $this.next();
                var $onToast = $(".toastPopup.show");
                var $btnRe = $toast.find(".btnReplay");

                // e.stopPropagation();
                // 위치 설정
                if ($toast.hasClass("center")) {
                    $toast.css("margin-left", -$toast.outerWidth() / 2);
                }

                if ($toast[0] === $onToast[0]) {
                    $onToast.removeClass("show");
                    $(document).off("click.toastOutside");
                    $this.removeClass("toastOn");
                    resetAllMediaPlayer();
                    return;
                } else {
                    $onToast.removeClass("show");
                    $toast.addClass("show");
                }

                // 토스트 외부 영역 클릭 시 닫기
                hideToast = function (e) {
                    var target = e.target;
                    var $onToast = $(".toastPopup.show");
                    
                    if ($onToast[0] && target !== $onToast[0] && !$.contains($onToast[0], target) && !$(target).hasClass("btnToastUp") && !$.contains($onToast.prev()[0], target)) {
                        if ($this.hasClass("btnTest") || $this.hasClass("btnMoreStudy")) $btnRe.click();
                        $onToast.removeClass("show");
                        $onToast.prev().removeClass("toastOn");
                        $(document).off("click.toastOutside");
                        // 미디어 플레이어 리셋
                        // resetAllMediaPlayer();
                    }
                }
                
                $(document).off("click.toastOutside").on("click.toastOutside", hideToast);
            
                $this.toggleClass("toastOn");
            });

            $btnReplay.on("click", function(e) {
                e.stopPropagation();
                $(this).parent().find(".toastPopup").removeClass("show");
                $btnToast.removeClass("toastOn");
                $(document).off("click.toastOutside");
                // 미디어 플레이어 리셋
                // resetAllMediaPlayer();
            });
        },
        /**
         * 툴팁 설정
         * @memberOf DEV.ui
         */
        initTooltip: function() {
            var bubbleTips = document.getElementsByClassName("bubbleTip");
            var tipLen = bubbleTips.length;
            var i, tipEl, tipBtn, eType, pos, str, bubbleEl;

            for (i = 0; i < tipLen; i++) {
                tipEl = bubbleTips[i];
                tipBtn = tipEl.getElementsByClassName("bubbleTipBtn")[0];
                eType = tipBtn.getAttribute("data-event");
                pos = tipBtn.getAttribute("data-pos");
                str = tipBtn.getAttribute("data-text");
                bubbleEl = util.createEl("div", tipEl, "beforeend", "bubbleTipArrow " + pos);
                bubbleEl.textContent = str;
                
                tipBtn.addEventListener(eType, function(e) {
                    var event = e.type;
                    var bubbleEl = this.nextElementSibling;

                    if (event === "mouseover") {
                        bubbleEl.classList.add("show");
                        
                        this.addEventListener("mouseout", function () {
                            bubbleEl.classList.remove("show");
                        });
                    } else if (event === "click") {
                        bubbleEl.classList.toggle("show");
                    }
                });
            }
        },
        /**
         * 스크롤 설정
         * @memberOf DEV.ui
         * @param {string} axis - x | y
         */
        initScroll: function(axis) {
            var scrollContent = document.getElementsByClassName("scrollContent");
            var scContLen = scrollContent.length;
            var i = 0;
            var scIdx = 0;
            var initIdx = 0;
            var content, container, scrollBar, scrollRail;
            var setScrollbar;
            var event, params;
            var prevScrollH;

            for (; i < scContLen; i++) {
                container = document.createElement("div");
                container.setAttribute("class", "scroll_draggerContainer");
                scrollContent[i].insertAdjacentElement("afterbegin", container);

                scrollBar = document.createElement("div");
                scrollBar.setAttribute("class", "scroll_draggerBar");
                container.appendChild(scrollBar);

                scrollRail = document.createElement("div");
                scrollRail.setAttribute("class", "scroll_draggerRail");
                container.appendChild(scrollRail);

                content = scrollContent[i].getElementsByClassName("scroll_detail")[0];

                setScrollbar = function(initIdx) {
                    var target = this ? this : scrollContent[initIdx].getElementsByClassName("scroll_detail")[0];
                    var container = target.previousElementSibling;
                    var content = target;
                    var containerH = container.clientHeight;
                    var contentH = content.clientHeight;
                    var contentScH = content.scrollHeight;
                    var scrollBar = container.firstElementChild;
                    
                    scrollBar.style.height = containerH * contentH / contentScH + "px";
                    scrollBar.style.backgroundSize = "8px " + containerH * contentH / contentScH + "px";
                    scrollBar.style.top = containerH * content.scrollTop / contentScH + "px";
                    prevScrollH = contentScH;

                    // 스크롤 감추기
                    if (scrollRail.offsetHeight === scrollBar.offsetHeight) {
                        scrollBar.style.visibility = "hidden";
                        scrollRail.style.visibility = "hidden";
                    } else {
                        scrollBar.style.visibility = "visible";
                        scrollRail.style.visibility = "visible";
                    }
                }

                setInterval(function () {
                    var containerH, contentH, contentScH;
                    // scrollHeihgt 변경시
                    if (!prevScrollH) {
                        content = scrollContent[0].getElementsByClassName("scroll_detail")[0];
                    } else {
                        content = scrollContent[initIdx].getElementsByClassName("scroll_detail")[0];
                    }
                    if (content.scrollHeight !== prevScrollH) {
                        setScrollbar(initIdx);
                        initIdx++;
                        if (initIdx >= scContLen) initIdx = 0;
                    }
                }, 40);
                
                if (typeof window.CustomEvent === "function") {
                    event = new Event("scroll");
                    content.dispatchEvent(event);
                } else {
                    params = params || { bubbles: false, cancelable: false, detail: undefined };
                    event = document.createEvent("Event");
                    event.initEvent("scroll", params.bubbles, params.cancelable, params.detail);
                    content.dispatchEvent(event);
                }
                
                content.addEventListener("scroll", setScrollbar);

                scrollBar.addEventListener("mousedown", function(start) {
                    var scrollBar = start.target;
                    var scrollContent = scrollBar.closest(".scrollContent");
                    var container = scrollContent.querySelector(".scroll_draggerContainer");
                    var content = scrollContent.querySelector(".scroll_detail");
                    var y = scrollBar.offsetTop;
                    
                    var onMove = function (end) {
                        var delta = end.pageY - start.pageY;
                        scrollBar.style.top = Math.min(container.clientHeight - scrollBar.clientHeight, Math.max(0, y + delta)) + "px";
                        content.scrollTop = (content.scrollHeight * scrollBar.offsetTop / content.clientHeight);
                    };

                    start.preventDefault();

                    document.addEventListener("mousemove", onMove);
                    document.addEventListener("mouseup", function () {
                        document.removeEventListener("mousemove", onMove);
                    });
                });
            }
        },
        /**
         * 파일 다운로드 설정
         * @memberOf DEV.ui
         */
        initDownload: function() {
            var downBtns = document.getElementsByClassName("btnDown");
            var downBtnLen = downBtns.length;
            var downBtn, downAlt, i;
            
            for (i = 0; i < downBtnLen; i++) {
            	downBtn = downBtns[i];
                downAlt = util.createEl("div", downBtn, "beforebegin", "downloadAlt");
                downAlt.textContent = downBtn.getAttribute("data-alt");

                downBtn.addEventListener("mouseover", function() {
                    var targetAlt = this.previousElementSibling;
                    targetAlt.classList.add("show");
                    
                    var altLeft = this.offsetLeft - (targetAlt.offsetWidth - this.offsetWidth) / 2;
                    var altTop = this.offsetTop - targetAlt.offsetHeight;

                    targetAlt.setAttribute("style", "left:" + altLeft + "px;top:" + altTop + "px;");
                });

                downBtn.addEventListener("mouseout", function() {
                    var targetAlt = this.previousElementSibling;
                    targetAlt.classList.remove("show");
                });

                downBtn.addEventListener("click", function() {
                    var fileName = this.getAttribute("data-file");
                    var chapter = location.href.split("/").slice(-2)[0];
                    var src = "contents/" + chapter + "/down/" + fileName;
                    var downEle = util.createEl("a", this, "afterend");

                    // 드래그시에는 팝업 열지 않음
                    if (this.classList.contains("onDrag")) {
                        this.classList.remove("onDrag");
                        return;
                    }
                    
                    // downEle.setAttribute("href", src);
                    // downEle.setAttribute("target", "_blank");
                    // downEle.setAttribute("download", fileName);
                    // downEle.click();
                    // downEle.parentNode.removeChild(downEle);

                    parent.viewer.link("document", src);
                });
            }
        },
        /**
         * 타이머 설정
         * @memberOf DEV.ui
         */
        initTimer: function() {
            var startBtn = document.getElementById("timerStart");
            var pauseBtn = document.getElementById("timerPause");
            var resetBtn = document.getElementById("timerReset");
            var timerEl = document.getElementById("timer");
            var start = 0;
            var isReset = false;
            var timer;

            var setTimer = function() {
                var timeD = Date.now() - start;
                var millisecond = timeD % 1000;
                var second = (timeD - millisecond) / 1000 % 60;
                var minute = (timeD - millisecond - second * 1000) / 60000 % 60;
                var hour = (timeD - millisecond - second * 1000 - minute * 1000 * 60) / 3600000;
                
                millisecond = Math.round(millisecond / 10);
                
                var timeFormat = ((minute<10) ? "0" + minute : minute)
                            + ":" + ((second<10) ? "0" + second : second)
                            + ":" + ((millisecond<10) ? "0" + millisecond : millisecond);

                timerEl.textContent = timeFormat;
            }

            startBtn.addEventListener("click", function() {
                if (pauseBtn.disabled && !isReset) {
                    start = Date.now() - parseInt(pauseBtn.getAttribute("data-pause"));
                } else {
                    start = Date.now();
                }
                
                timer = setInterval(setTimer, 1);
                
                pauseBtn.disabled = false;
                resetBtn.disabled = false;
                this.disabled = true;
                isReset = false;
            });

            pauseBtn.addEventListener("click", function() {
                clearInterval(timer);
                this.setAttribute("data-pause", Date.now() - start);
                startBtn.disabled = false;
                resetBtn.disabled = false;
                this.disabled = true;
            });

            resetBtn.addEventListener("click", function() {
                clearInterval(timer);
                timerEl.textContent = "00:00:00";
                startBtn.disabled = false;
                pauseBtn.disabled = false;
                this.disabled = true;
                isReset = true;
            });
        },
        /**
         * png Loop 설정
         * @memberOf DEV.ui
         */
        initPngLoop: function() {
            var loopBtns = document.getElementsByClassName("loopBtn");
            var btnLen = loopBtns.length;
            var i = 0;
            
            for (; i < btnLen; i++) {
                loopBtns[i].addEventListener("click", function() {
                    var targetId = this.getAttribute("data-target");
                    var endNum = Number(this.getAttribute("data-endNum"));
                    var imgEle = document.getElementById(targetId);
                    var clearId = this.getAttribute("data-clearId");
                    var num = 1;

                    if (clearId) {
                        clearInterval(clearId);
                    }
                    
                    clearId = setInterval(function() {
                        if (num === endNum) {
                            clearInterval(clearId);
                        }
                        
                        imgEle.src = "images/n_10_2_ani_" + (num < 10 ? "0" + num : num) + ".png";
                        num++;

                    }, 80);
                    
                    this.setAttribute("data-clearId", clearId);
                });
            }
        },
        /**
         * 선긋기(canvas) 설정
         * @memberOf DEV.ui
         */
        initDrawLine: function() {
            var isAnsShow = false; // 정답 확인 여부 
            var $canvasArea = $(".canvasArea");
            var startPObj = {};
            var endPObj = {};
            var lineCnt = 0;
            var curCvsArea, curCvs, curCvsId, curCtx;
            var mouseX, mouseY;
            var startPoint, startPointNum;
            var startX, startY, startMatch, endMatch;
            var connectType; // mtom: 다대다, otom: 일대다
            //var isAskTest = $canvasArea.closest(".ask_quiz").length ? true : false; // 스스로 해봐요 확인

            // 캔버스 클릭 핸들러
            var clickCanvas = function(e) {
                var spObj = startPObj[this.id];
                var spLen = Object.keys(spObj).length;
                var i, spAttrs, spClasses;

                e.preventDefault();
                
                if ($(this).data("isAnsShow")) {
                    return;
                }
                
                connectType = $(this).parents(".quizType").data("contype");

                curCvs = this;
                curCvsId = curCvs.id;
                curCvsArea = this.parentElement;
                curCtx = curCvs.getContext("2d");

                getMousePoint(e);

                for (i = 0; i < spLen; i++) {
                    spAttrs = spObj[i];

                    if (mouseX > spAttrs.left && mouseX < spAttrs.right && mouseY > spAttrs.top && mouseY < spAttrs.bottom) {
                        startPoint = curCvsArea.querySelectorAll(".lineStart")[i];
                        startMatch = startPoint.getAttribute("data-match");
                        spClasses = startPoint.classList;
                        startPointNum = spAttrs.num;

                        // 정답 확인 중이면 다시 풀기 동작
                        // if (isAnsShow) {
                        //     document.getElementsByClassName("checkQuizLine")[0].classList.remove("btnReplay");
                        //     resetDrawLine();
                        //     isAnsShow = false;
                        // }

                        if (!spClasses.contains("done") || connectType === "mtom") {
                            // spClasses.add("done");
                        } else {
                            storedLineObj[curCvsId].filter(removePreLine);
                            lineCnt--;
                        }

                        spClasses.add("on");
                        startX = spAttrs.left + spAttrs.width / 2;
                        if (spAttrs.pos === "bottom") {
                            startY = spAttrs.top + spAttrs.height;
                        } else {
                            startY = spAttrs.top + spAttrs.height / 2;
                        }

                        curCvs.addEventListener(util.getEventType("move"), drawLine);
                        curCvs.addEventListener(util.getEventType("up"), finishDrawing);
                        curCvs.addEventListener(util.getEventType("out"), cancelDrawing);
                    }
                }
            }

            // 이벤트 좌표 값 구하기
            var getMousePoint = function(e) {
                var rect, firstTouches;
                
                if (util.isTouchDevice) {
                    rect = e.target.getBoundingClientRect();
                    firstTouches = e.touches[0];
                    mouseX = parseInt(firstTouches.clientX - rect.left) / ZOOM_VALUE;
                    mouseY = parseInt(firstTouches.clientY - rect.top) / ZOOM_VALUE;
                } else {
                    mouseX = e.offsetX;
                    mouseY = e.offsetY;
                }
            }

            // 이미 그려진 선 제거
            var removePreLine = function(val, idx, arr) {
                if (val.startNum === startPointNum) {
                    arr.splice(idx, 1);
                    curCvsArea.querySelector(".lineEnd[data-num='" + val.endNum + "']").classList.remove("done");
                }
            }

            // 선 그리기
            var drawLine = function(e) {
                var qid = this.closest(".quizType").getAttribute("data-qid");
                var btnCheck = document.querySelector(".btnCheck[data-target='" + qid + "']") || document.querySelector(".btnReplay[data-target='"+ qid +"']");
                var btnScript = btnCheck.parentElement.querySelector(".btnScript");

                e.preventDefault();
                
                //정답 보기 버튼 숨김
                // if (btnCheck.classList.contains("show")){
                //     btnCheck.classList.remove("show");
                //     if (btnScript) {
                //         btnScript.classList.remove("show");
                //     }
                // }
                
                getMousePoint(e);
                redrawStoredLines();

                curCtx.beginPath();
                curCtx.moveTo(startX, startY);
                curCtx.lineTo(mouseX, mouseY);
                if (global_strokeStyle) curCtx.strokeStyle = global_strokeStyle;
                curCtx.stroke();
            }

            // 저장 된 선 그리기
            var redrawStoredLines = function(option) {
                var currStoredLine = storedLineObj[curCvsId];
                var storedLineLen = currStoredLine.length;
                var drawLine;

                curCtx.clearRect(0, 0, curCvs.width, curCvs.height);

                for (var i = 0; i < storedLineLen; i++) {
                    drawLine = function() {
                        curCtx.beginPath();
                        curCtx.moveTo(currStoredLine[i].x1, currStoredLine[i].y1);
                        curCtx.lineTo(currStoredLine[i].x2, currStoredLine[i].y2);
                        if (currStoredLine[i].color) curCtx.strokeStyle = currStoredLine[i].color;
                        curCtx.stroke();
                    }
                    if (option === "checkAnswer") {
                        if (currStoredLine[i].isCorrect) {
                            curCtx.strokeStyle = "#422ffb";
                            drawLine();
                        } else {
                            // 오답은 다시 그리지 않음
                            // curCtx.strokeStyle = "#422ffb";
                        }
                    } else {
                        drawLine();
                    }
                }
            }

            // 선긋기 그리기 종료
            var finishDrawing = function() {
                var epObj = endPObj[curCvsId];
                var epLen = Object.keys(epObj).length;
                var qid = this.closest(".quizType").getAttribute("data-qid");
                var assessmentItem = document.querySelector("[data-qid='" + qid + "']");
                var answerArr = assessmentItem.querySelector(".answerCorrect").textContent.split("\/\/");
                var anscheck = assessmentItem.getAttribute("data-anschk");
                var otherMsgs = assessmentItem.querySelector(".answer_container .ansMsg");
                var lineMsgs = assessmentItem.querySelectorAll(".draw_leave .ansMsg");
                var lineEndMsgs = assessmentItem.querySelectorAll(".draw_arrival .ansMsg");
                var btnCheck = document.querySelector(".btnCheck[data-target='" + qid + "']");
                var btnReplay = document.querySelector(".btnReplay[data-target='"+ qid +"']");
                var btnWrap = btnCheck ? btnCheck.parentElement : btnReplay.parentElement;
                var btnScript = btnWrap.querySelector(".btnScript");
                var i, endPoint, epAttrs, epClasses, endDataNum, endX, endY, startPointArr;
                var efCheck, answer;
                var lineDraws, lineStart;
                var spAnsColor, spNum, epNum, isCorrect;

                for (i = 0; i < epLen; i++) {
                    epAttrs = epObj[i];

                    if (mouseX > epAttrs.left && mouseX < epAttrs.right && mouseY > epAttrs.top && mouseY < epAttrs.bottom) {
                        endPoint = this.parentElement.querySelectorAll(".lineEnd")[i];

                        // 시작점과 끝점 매칭포인트 확인
                        endMatch = endPoint.getAttribute("data-match");
                        if (startMatch !== endMatch) {
                            startPoint.removeAttribute("data-target");
                            startPoint.classList.remove("done");
                            break;
                        }

                        epClasses = endPoint.classList;
                        endDataNum = epAttrs.num;
                        endX = epAttrs.left + epAttrs.width / 2;
                        endY = epAttrs.top + epAttrs.height / 2;

                        if (!epClasses.contains("done") || connectType) {
                            if (!btnCheck || anscheck) {
                                answer = answerArr[startPointNum] - 1;

                                if (answer === parseInt(endDataNum)) {
                                    startPoint.classList.add("done");
                                    epClasses.add("done");
                                    startPoint.setAttribute("data-target", endPoint.getAttribute("data-num"));
                                    lineCnt++;
        
                                    // .lindeDraw에 .done 추가
                                    lineDraws = assessmentItem.querySelectorAll(".lineDraw");
                                    if (lineDraws.length) {
                                        lineDraws[+startPoint.getAttribute("data-num")].classList.add("done");
                                    }
        
                                    storedLineObj[curCvsId].push({
                                        startNum: startPointNum,
                                        endNum: endDataNum,
                                        x1: startX,
                                        y1: startY,
                                        x2: endX,
                                        y2: endY
                                    });

                                    efCheck = "ok";
                                    playFeedSound(efCheck);

                                    if (!btnCheck) btnReplay.classList.add("show");
                                    else {
                                        btnCheck.classList.add("blind");
                                        btnReplay.classList.add("show");
                                    }
                                    
                                    if (lineMsgs.length) lineMsgs[startPointNum].classList.add("show");
                                    if (lineEndMsgs.length) lineEndMsgs[endDataNum].classList.add("show");
                                } else {
                                    efCheck = "no";
                                    playFeedSound(efCheck);
                                }
                            } else {
                                startPoint.classList.add("done");
                                epClasses.add("done");

                                // 특수 예외 처리
                                spAnsColor = startPoint.getAttribute("data-ansColor");
                                spNum = startPoint.getAttribute("data-num");
                                epNum = endPoint.getAttribute("data-num");
                                
                                if (spAnsColor && spNum > epNum) {
                                    if (!endPoint.getAttribute("data-target")) {
                                        endPoint.setAttribute("data-target", +spNum + 1);
                                    } else {
                                        endPoint.setAttribute("data-target", +endPoint.getAttribute("data-target") + "," + (+spNum + 1));
                                    }
                                    if (endPoint.getAttribute("data-ansColor").indexOf(curCtx.strokeStyle) === -1) isCorrect = false;
                                    else isCorrect = true;
                                    endPoint.setAttribute("data-isCorrect", isCorrect);
                                } else if (spAnsColor) {
                                    if (!startPoint.getAttribute("data-target")) {
                                        startPoint.setAttribute("data-target", +epNum + 1);
                                    } else {
                                        startPoint.setAttribute("data-target", +startPoint.getAttribute("data-target") + "," + (+epNum + 1));
                                    }
                                    if (spAnsColor.indexOf(curCtx.strokeStyle) === -1) isCorrect = false;
                                    else isCorrect = true;
                                    startPoint.setAttribute("data-isCorrect", isCorrect);
                                } else { // 기본
                                    if (!startPoint.getAttribute("data-target")) {
                                        startPoint.setAttribute("data-target", epNum);
                                    } else {
                                        startPoint.setAttribute("data-target", startPoint.getAttribute("data-target") + "," + epNum);
                                    }
                                }

                                lineCnt++;
    
                                // .lindeDraw에 .done 추가
                                lineDraws = assessmentItem.querySelectorAll(".lineDraw");
                                if (lineDraws.length) {
                                    lineDraws[+startPoint.getAttribute("data-num")].classList.add("done");
                                }
    
                                storedLineObj[curCvsId].push({
                                    startNum: startPointNum,
                                    endNum: endDataNum,
                                    x1: startX,
                                    y1: startY,
                                    x2: endX,
                                    y2: endY,
                                    color: curCtx.strokeStyle
                                });
                            }
                            
                            if (otherMsgs) {
                                lineStart = assessmentItem.querySelectorAll(".lineStart.done");
                                if (lineStart.length === answerArr.length) otherMsgs.classList.add("show");
                            }
                        }

                        // 정답 보기 버튼 활성화 
                        // startPointArr = this.closest(".quizType").querySelectorAll(".lineEnd.done");
                        // if (answerArr.length === startPointArr.length){
                        //     btnCheck.classList.add("show");
                        //     if (btnScript) {
                        //         btnScript.classList.add("show");
                        //     }
                        // }
                        
                        break;
                    } else {
                        if (!startPoint.getAttribute("data-ansColor") && connectType !== "mtom") {
                            startPoint.removeAttribute("data-target");
                        }
                        startPoint.classList.remove("done");
                    }
                }

                startPoint.classList.remove("on");
                redrawStoredLines();
                if (!startPoint.classList.contains("done")) playFeedSound(efCheck);

                curCvs.removeEventListener(util.getEventType("move"), drawLine);
                curCvs.removeEventListener(util.getEventType("up"), finishDrawing);
                curCvs.removeEventListener(util.getEventType("out"), cancelDrawing);
            }

            // 그리기 취소
            var cancelDrawing = function() {
                redrawStoredLines();
                startPoint.classList.remove("on");
                startPoint.classList.remove("done");
                startPoint.removeAttribute("data-target");

                curCvs.removeEventListener("mousemove", drawLine);
                curCvs.removeEventListener("mouseout", cancelDrawing);
            }

            // 정답 확인
            var checkAnswer = function(e) {
                var isToggle = false; // 정답 토글 여부
                var $this = $(this);
                var qid = this.getAttribute("data-target");
                var $assessmentItem = $("[data-qid='" + qid + "']");
                var $canvas = $assessmentItem.find("canvas");
                var canvas = $canvas[0];
                var canvasId = canvas.id;
                var context = canvas.getContext("2d");
                var curSPObj = startPObj[canvasId];
                var curEPObj = endPObj[canvasId];
                var $startPoint = $assessmentItem.find(".lineStart");
                var $endPoint = $assessmentItem.find(".lineEnd");
                var startPLen = $startPoint.length;
                var endPLen = $endPoint.length;
                var totalAnsArr = $assessmentItem.find(".answerCorrect").text().split("\/\/");
                var $quizMarking = $(".quizMarking[data-marking='"+ qid +"']");
                var $quizChk = $assessmentItem.find(".quizCheck");
                var lineDraws = $assessmentItem.find(".lineDraw");
                var isAskTest = $assessmentItem.closest(".askQuizContent:not(.my_goal)").length;
                var isAskGoal = $assessmentItem.parents(".askQuizContent").hasClass("my_goal");
                var multi = $assessmentItem.data("question-multi") ? true : false;
                var noSound = $this.hasClass("noFeedSound");
                var answerLen = 1;
                var isCorrect = true;
                var corAnsArr = [];
                var i, sPointX, sPointY, answer, ePointX, ePointY, spAttr, epAttr;
                var efCheck;
                var arrIdx, corSpArr;
                var answerArr, targetArr;

                curCvs = canvas;
                curCvsId = canvasId;
                curCtx = context;

                if (isAskTest && $quizMarking.length === 0) {
                    $quizMarking = $assessmentItem.prev();
                }
                
                if ($canvas.data("isAnsShow")) {
                    resetDrawLine(e, true);
                    redrawStoredLines();
                    return;
                }
                
                // resetDrawLine(e);

                if (isToggle) {
                    $this.toggleClass("btnReplay");
                }
                if (lineDraws.length) lineDraws.addClass("done");

                // 저장 된 선 배열 그려진 순서에서 시작점 순서대로 정렬
                storedLineObj[canvasId].sort(function (a, b) {
                    return a.startNum < b.startNum ? -1 : 1;
                });

                // 정답/오답 확인
                corSpArr = [];
                
                // if (multi) $quizChk.text("true");
                // else $quizMarking.addClass("correct");
                
                for (i = 0; i < startPLen; i++) {
                    answer = totalAnsArr[i];
                    if (answer === "0") {
                        if ($startPoint[i].classList.contains("done") && connectType !== "mtom") isCorrect = false;
                        continue;
                    }

                    if (parseInt($startPoint[i].getAttribute("data-target")) === (answer - 1) && !$startPoint[i].getAttribute("data-ansColor")) {
                        storedLineObj[canvasId].forEach(function(val, idx) {
                            if (+val.startNum === i) {
                                arrIdx = idx;
                                corSpArr.push(val.startNum);
                            }
                        });
                        storedLineObj[canvasId][arrIdx]["isCorrect"] = true;
                    } else if ($startPoint[i].getAttribute("data-ansColor")) { // 특수 예외 처리
                        if ($startPoint[i].getAttribute("data-target")) {
                            targetArr = $startPoint[i].getAttribute("data-target").split(",");
                            
                            answerArr = answer.split(",");
                            answerArr.forEach(function(val, idx, arr) {
                                if (targetArr.indexOf(val) === -1) isCorrect = false;
                            });
                        } else {
                            isCorrect = false;
                        }
                        if ($startPoint[i].getAttribute("data-isCorrect") === "false") isCorrect = false;
                    } else {
                        if (connectType === "mtom" && $startPoint[i].getAttribute("data-target")) { // mtom의 경우
                            targetArr = $startPoint[i].getAttribute("data-target").split(",");
                            corAnsArr.push(targetArr);

                            answerArr = answer.split(",");
                            answerArr.forEach(function (val, idx, arr) {
                                if (targetArr.indexOf((+val - 1).toString()) === -1) isCorrect = false;
                            });
                        } else {
                            isCorrect = false;
                        }
                    }
                }
                redrawStoredLines("checkAnswer");

                if (multi) $quizChk.text(isCorrect);
                else {
                    if (isCorrect) {
                        $quizMarking.addClass("correct");
                        efCheck = "ok";
                    } else {
                        $quizMarking.addClass("wrong");
                        efCheck = "no";
                    }
                }

                // 정답 선 그리기
                for (i = 0; i < startPLen; i++) {
                    if (corSpArr.indexOf(String(i)) !== -1) continue;
                    
                    answer = totalAnsArr[i];
                    spAttr = curSPObj[i];
                    sPointX = spAttr.left + spAttr.width / 2;

                    if (spAttr.pos === "bottom") {
                        sPointY = spAttr.top + spAttr.height;
                    } else {
                        sPointY = spAttr.top + spAttr.height / 2;
                    }
                    
                    answer.split(",").forEach(function(val, idx, arr) {
                        var userColor = false;
                        var strokeColor;

                        if (val === "0") return;

                        if (corAnsArr[i] && corAnsArr[i].indexOf((+val - 1).toString()) !== -1) {
                            corAnsArr[i].slice(idx + 1);
                            userColor = true;
                        }
                        
                        strokeColor = spAttr.ansColor;
                        epAttr = curEPObj[val - 1];
                        ePointX = epAttr.left + epAttr.width / 2;
                        ePointY = epAttr.top + epAttr.height / 2;

                        if (strokeColor) {
                            strokeColor = strokeColor.split(",")[idx];
                            context.strokeStyle = strokeColor;
                        } else if (userColor) {
                            context.strokeStyle = "#422ffb";
                        } else {
                            context.strokeStyle = "#ed1c24";
                        }
                        context.beginPath();
                        context.moveTo(sPointX, sPointY);
                        context.lineTo(ePointX, ePointY);
                        context.stroke();
                        context.strokeStyle = "#422ffb";
                    });
                }

                $canvas.data("isAnsShow", true);
                
                // 효과음 호출
                if (!noSound){
                    if (!multi && !isAskGoal) playFeedSound(efCheck);
                }
            }

            // 선긋기 초기화
            resetDrawLine = function (e, noClearStored) {
                var _this = this ? this : e.target;
                var qid = _this.getAttribute("data-target");
                var $assessmentItem = $("[data-qid='"+ qid +"']");
                var $btnCheck = $(".checkQuizLine[data-target='"+ qid +"']");
                var $canvas = $assessmentItem.find("canvas");
                var $checkedPoint = $assessmentItem.find(".done");
                var $startPoint = $assessmentItem.find(".lineStart");
                var $quizMarking = $assessmentItem.parent().prev();
                var ansCheck = $assessmentItem.data("anschk");
                var $askQuiz = $assessmentItem.closest(".ask_quiz");
                var isAskTest = $askQuiz.length;
                var btnCheckLen = $btnCheck.length;
                var btnCond = this && btnCheckLen && !ansCheck;
                var i = 0;
                var canvas, context;
                curCvs = $canvas[0];

                // 정답 확인안하면 다시 풀기 비활성화
                if (!$(curCvs).data("isAnsShow") && btnCond) {
                    return;
                }
                
                if (!isAskTest) {
                    _this.classList.remove("show");
                    $btnCheck.removeClass("blind");
                }
                
                canvas = $canvas[0];
                context = canvas.getContext("2d");
                curCtx = context;
                context.clearRect(0, 0, canvas.width, canvas.height);
                
                // 저장된 라인 배열 초기화
                if (!noClearStored || e.isTrigger){
                    storedLineObj[canvas.id] = [];
                    $checkedPoint.removeClass("done");
                        
                    $startPoint.each(function () {
                        this.removeAttribute("data-target");
                    });
                }

                $canvas.data("isAnsShow", false);

                if (storedLineObj[curCvsId]){
                    storedLineObj[curCvsId].forEach(function(ele) {
                        ele.isCorrect = false;
                    });
                }

                // 채점 표시
                $quizMarking.removeClass("correct wrong");

                lineCnt = 0;
            }
            
            $canvasArea.each(function(i, canvasArea) {
                var $this = $(this);
                var $startPoint = $this.find(".lineStart");
                var $endPoint = $this.find(".lineEnd");
                var $popWrap = $this.parents(".popWrap");
                var $slideCont = $this.parents(".slideContent");
                var $slideLen = $slideCont.length;
                var $slideList = $this.parents(".slideList");
                var $askTest = $this.parents(".ask_test");
                var $askTestLen = $askTest.length;
                var $assessmentItem = $this.parents(".quizType");
                var qid = $assessmentItem.data("qid");
                var $btnAudio = $(".btnAudio[data-target='"+ qid +"']");
                var $bntAudioLen = $btnAudio.length;
                var canvas, ctx, canvasId, askIdx;
                
                // 캔버스 생성
                canvas = util.createEl("canvas", this, "beforeend");

                // 팝업이나 슬라이드 안에 있는 경우 display:none 제거하고 hidden 속성 추가
                // if ($popWrap.length) {
                //     $popWrap.addClass("show");
                //     $popWrap.css("visibility", "hidden");
                // } 
                if ($slideLen) {
                    $slideCont.addClass("show");
                    $slideCont.css("visibility", "hidden");
                    $slideList.addClass("show");
                }
                if ($askTestLen) {
                    if ($askTest.hasClass("show")) askIdx = $askTest.find(".ask_quiz.show").index();
                    $askTest.addClass("show");
                    $askTest.find(".ask_quiz").addClass("show");
                }

                // 캔버스 설정
                ctx = canvas.getContext("2d");
                canvasId = "canvas" + i;
                canvas.id = canvasId;
                canvas.width = canvasArea.clientWidth;
                canvas.height = canvasArea.clientHeight;

                canvas.addEventListener("touchmove", function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                });

                // 선 스타일 설정
                ctx.strokeStyle = "#422ffb";
                ctx.lineWidth = 4;
                ctx.lineCap = "round";
                // ctx.lineJoin = "round";


                // 시작점 정보를 갖는 객체 생성
                startPObj[canvasId] = {};
                $startPoint.each(function(i, ele) {
                    startPObj[canvasId][i] = {};
                    startPObj[canvasId][i].width = ele.clientWidth;
                    startPObj[canvasId][i].height = ele.clientHeight;
                    startPObj[canvasId][i].top = ele.offsetTop;
                    startPObj[canvasId][i].left = ele.offsetLeft;
                    startPObj[canvasId][i].bottom = startPObj[canvasId][i].top + ele.clientHeight;
                    startPObj[canvasId][i].right = startPObj[canvasId][i].left + ele.clientWidth;
                    startPObj[canvasId][i].num = ele.getAttribute("data-num");
                    startPObj[canvasId][i].pos = ele.getAttribute("data-pos");
                    startPObj[canvasId][i].ansColor = ele.getAttribute("data-ansColor");
                })
                
                // 목표점 정보를 갖는 객체 생성
                endPObj[canvasId] = {};
                $endPoint.each(function(i, ele) {
                    endPObj[canvasId][i] = {};
                    endPObj[canvasId][i] = {};
                    endPObj[canvasId][i].width = ele.clientWidth;
                    endPObj[canvasId][i].height = ele.clientHeight;
                    endPObj[canvasId][i].top = ele.offsetTop;
                    endPObj[canvasId][i].left = ele.offsetLeft;
                    endPObj[canvasId][i].bottom = endPObj[canvasId][i].top + ele.clientHeight;
                    endPObj[canvasId][i].right = endPObj[canvasId][i].left + ele.clientWidth;
                    endPObj[canvasId][i].num = ele.getAttribute("data-num");
                })
                
                storedLineObj[canvasId] = [];

                // 팝업이나 슬라이드 안에 있는 경우 다시 display:none으로 원복
                // if ($popWrap.length) {
                //     $popWrap.removeClass("show");
                //     $popWrap.css("visibility", "");
                // }
                if ($askTestLen) {
                    if ($askTest.hasClass("show") && askIdx){
                        $askTest.find(".ask_quiz").not(":eq("+ askIdx +")").removeClass("show");
                        return;
                    }
                    
                    $askTest.removeClass("show");
                    $askTest.find(".ask_quiz").removeClass("show");
                }
                if ($slideLen) {
                    $slideCont.removeClass("show");
                    $slideList.removeClass("show");
                    $slideCont.css("visibility", "");
                }
                // if ($bntAudioLen && !$askTestLen) {
                //     canvas.style.pointerEvents = "none";
                //     canvas.disabled = true;
                // }
            });

            // 정오답 효과음 추가
            var playFeedSound = function(efCheck) {
                var clickAudio;
    
                if (efCheck === "ok") clickAudio = document.getElementsByClassName('feedOk')[0];
                else if (efCheck === "no") clickAudio = document.getElementsByClassName('feedNo')[0];
                else clickAudio = document.getElementsByClassName('feedWrong')[0];
    
                if(!clickAudio.ended) {
                    clickAudio.currentTime = 0;
                 }
                 clickAudio.play();
            }

            // 이벤트 등록
            $("canvas").on(util.getEventType("down"), clickCanvas);
            $(".checkQuizLine").on("click", checkAnswer);
            $(".resetDrawLine").on("click", resetDrawLine);
        },
        // 자가 진단 테스트
        /**
         * 자가 진단 테스트 설정
         * @memberOf DEV.ui
         */
        initSelfTest: function() {
            var chkBtns = document.querySelectorAll(".chk_list .ico");
            var chkBtnLen = chkBtns.length;
            var i = 0;

            for(; i < chkBtnLen; i++) {
                chkBtns[i].addEventListener("click", function() {
                    var btns = this.closest(".checkBtnList").querySelectorAll(".ico");
                    var btnLen = btns.length;
                    var inputEl = this.previousSibling;
                    var inputId = inputEl.id;
                    var qNum = inputId.split(/check|_/)[1] - 1;
                    var score = Number(inputId.split("_")[1]);
                    var i = 0;
                    var totalScore = 0;
                    var btn, j, scoreArrLen, selectScore;

                    for (; i < btnLen; i++) {
                        btn = btns[i];
                        btn.classList.remove("on");
                        btn.previousSibling.checked = false;
                    }

                    this.classList.add("on");
                    inputEl.checked = true;
                    selfScores[qNum] = score;
                    scoreArrLen = selfScoreArr.length;
                    
                    for (j = 0; j < scoreArrLen; j++) {
                        selectScore = selfScoreArr[j];

                        if (selectScore) {
                            totalScore += selectScore;
                        }
                    }

                    document.getElementsByClassName("totalScore")[0].textContent = totalScore;
                });
            }
        },
        /**
         * 단어장 뜻 확인 설정
         * @memberOf DEV.ui
         */
        initVoca: function() {
            var showMeanBtns = document.getElementsByClassName("showMeaning");
            var showBtnLen, allShowBtn, allShowClasses, i;
            
            if (!showMeanBtns.length) {
                return;
            }

            showBtnLen = showMeanBtns.length;
            allShowBtn = document.getElementsByClassName("btnKormean")[0];
            allShowClasses = allShowBtn.classList;

            function toggleWord(action) {
                var i, eachBtn, korWordEl;

                for(i = 0; i < showBtnLen; i++) {
                    eachBtn = showMeanBtns[i];
                    korWordEl = eachBtn.parentElement.nextElementSibling;
                    
                    if(action === "add") {
                        korWordEl.classList.add("on");
                        eachBtn.classList.add("on");
                    } else {
                        korWordEl.classList.remove("on");
                        eachBtn.classList.remove("on");
                    }
                }
            }

            for(i = 0; i < showBtnLen; i++) {
                var eachBtn = showMeanBtns[i];
                
                eachBtn.addEventListener("click", function() {
                    var korWordEl = this.parentElement.nextElementSibling;
                    var j = 0;
                    var hasOn = true;

                    this.classList.toggle("on");
                    korWordEl.classList.toggle("on");

                    if (!allShowClasses.contains("on")) {
                        for (; j < showBtnLen; j++) {
                            if(!showMeanBtns[j].classList.contains("on")) {
                                hasOn = false;
                            }
                        }
                        if(hasOn) {
                            allShowClasses.add("on");
                        }
                    } else {
                        allShowClasses.remove("on");
                    }
                });
            }

            allShowBtn.addEventListener("click", function() {
                var btnClasses = this.classList;
                
                if(!btnClasses.contains("on")) {
                    btnClasses.add("on");
                    toggleWord("add");
                } else {
                    btnClasses.remove("on");
                    toggleWord("remove");
                }
            })
        },
        /**
         * 문장별 보기 팝업내 스크립트 요소 로드
         * @memberOf DEV.ui
         */
        loadPopupScript: function () {
            var scriptArea = document.getElementsByClassName("scriptArea")[0];
            var popScriptArea, scriptClone;

            if (!scriptArea) {
                return;
            }

            popScriptArea = document.querySelector(".pop_content .script_txt");
            scriptClone = scriptArea.cloneNode(true);
            popScriptArea.insertAdjacentElement("afterbegin", scriptClone);
        },
        /**
         * 해석 보기 버튼 설정
         * @memberOf DEV.ui
         */
        initTransBtn: function() {
            var transBtns = document.getElementsByClassName("btnTran");
            var transBtnLen = transBtns.length;
            var tranShowBtns = document.getElementsByClassName("btnTranShow");
            var tranShowBtnLen = tranShowBtns.length;
            var i, btnTran, btnTranShow, guideClass, korScripts, korScriptLen, tKor, onSlide, isBind;

            var getEls = function(e) {
                var target = e.target;
                var targetId, scriptWrapEl, guide;
                var previewWordWrap = target.closest(".pop_content");

                if (previewWordWrap.getElementsByClassName("pop_slide_word")[0]) {
                    scriptWrapEl = previewWordWrap;
                    onSlide = scriptWrapEl.querySelector(".slideDetail > li.on");
                    korScripts = onSlide.getElementsByClassName("tKor");
                } else {
                    targetId = target.getAttribute("data-target");
                    scriptWrapEl = document.getElementById(targetId);
                    korScripts = scriptWrapEl.getElementsByClassName("tKor");
                }

                btnTran = scriptWrapEl.getElementsByClassName("btnTran")[0];
                btnTranShow = scriptWrapEl.getElementsByClassName("btnTranShow")[0];
                guide = scriptWrapEl.getElementsByClassName("guide_tran")[0];
                guideClass = guide.classList;
                korScriptLen = korScripts.length;
            };

            // 문장별 해석보기 선택
            if (transBtnLen) {
                for (i = 0; i < transBtnLen; i++) {
                    btnTran = transBtns[i];
                    
                    btnTran.addEventListener("click", function (e) {
                        var btnClass = this.classList;
                        var i, guideTimeout;

                        getEls(e);

                        btnClass.toggle("on");

                        // 가이드 토스트 보여주기
                        if (btnClass.contains("on")) {
                            guideClass.add("show");
                            guideTimeout = setTimeout(function () {
                                guideClass.remove("show");
                            }, 3000);
                        } else {
                            guideClass.remove("show");
                            clearTimeout(guideTimeout);
                        }

                        for (i = 0; i < korScriptLen; i++) {
                            tKor = korScripts[i];

                            // 초기화
                            if (btnClass.contains("on")) {
                                tKor.classList.remove("on");
                                tKor.classList.remove("active");
                                btnTranShow.classList.remove("on");
                            } else {
                                tKor.classList.remove("active");
                            }

                            tKor.classList.toggle("on");

                            // 문장 해석 선택
                            isBind = !onSlide ? btnTran.getAttribute("data-isBind") : onSlide.getAttribute("data-isBind");
                            if (!isBind) {
                                tKor.addEventListener("click", function (e) {
                                    guideClass.remove("show");
                                    this.classList.toggle("active");

                                    if (!onSlide) {
                                        btnTran.setAttribute("data-isBind", true);
                                    } else {
                                        onSlide.setAttribute("data-isBind", true)
                                    }
                                });
                            }
                        }
                    });
                }
            }

            
            // 예문 해석 보기 선택
            if (tranShowBtnLen) {
                for (i = 0; i < tranShowBtnLen; i++) {
                    btnTranShow = tranShowBtns[i];

                    btnTranShow.addEventListener("click", function (e) {
                        var btnClass = this.classList;
                        var i, tKorClass;
                        var korEls, korLen, korClass;

                        btnClass.toggle("on");

                        getEls(e);

                        // 문장별 해석보기 버튼 변경
                        if (btnTran.classList.contains("on")) {
                            guideClass.remove("show");
                            btnTran.classList.remove("on");
                        }

                        for (i = 0; i < korScriptLen; i++) {

                            tKor = korScripts[i];
                            tKorClass = tKor.classList;

                            if (!btnClass.contains("on")) {
                                tKorClass.remove("on");
                                tKorClass.remove("active");
                            } else {
                                if (!tKorClass.contains("on")) {
                                    tKorClass.add("on");
                                    tKorClass.add("active");
                                } else {
                                    tKorClass.add("active");
                                }
                            }
                        }
                    });
                }
            }
        },
        /**
         * 단어 레이어 팝업
         * @memberOf DEV.ui
         */
        initWordPopup: function() {
            $.ajax({
                url: "./json/word.json",
                dataType: "json",
                success: function(data) {
                    var $btnWord = $(".btnNewWord");
                    var wordDataArr = data;
                    var newHtml = "";

                    $btnWord.each(function() {
                        var $this = $(this);
                        var word = $this.data("word");
                        var ko;
                        var $wordToast, wordWidth, toastWidth;

                        
                        wordDataArr.some(function (val, i, arr) {
                            ko = val.wordKo1;
                            return val.wordEn === word;
                        });

                        newHtml += '<div class="toastContent">' +
                            '<div class="btnNewWord noSound btnToastUp">Team</div>' +
                            '<div class="toastPopup tail down wordToast" data-type="new">' +
                            '<div class="inner"><div class="wordT">' + word + '</div><div class="wordD">' + ko + '</div></div>' +
                            '</div>' +
                            '</div>';

                        $this.replaceWith(newHtml);

                        // 토스트 left 설정
                        $wordToast = $(".wordToast")
                        wordWidth = $wordToast.prev().outerWidth();
                        toastWidth = $wordToast.outerWidth();
                        $wordToast.offset({left: (wordWidth - toastWidth) / 2});
                    });
                }
            });
        },
        // initWordPopup: function() {
        //     var content = document.getElementsByClassName("content")[0];
        //     var contentW = content.clientWidth;
        //     var contentH = content.clientHeight;
        //     var innerWrap = document.getElementsByClassName("inner_wrap")[0];
        //     var scriptArea = document.querySelector(".readingArea .scriptArea");
        //     var words = document.querySelectorAll(".readingArea .wordMean");
        //     var wordLen = words.length;
        //     var wordGrammars = document.getElementsByClassName("wordGrammar");
        //     var wordGrammarLen = wordGrammars.length;

        //     var grammarBtnHtml = "<div class='wordGrammar reading_layer'>" +
        //         "<div class='wordGrammarnBtn'></div>";

        //     var wordEl, wordBtnHtml, wordPopupHtml, wordBtnWrap, wordBtnH;
        //     var wordKey, word, btnLeft, btnTop, wordInfo, id, subtitleId, mean, eg, translation, file, sync;
        //     var btns, btnLen, closeBtns, closeBtnLen;
        //     var i, j, k, l, m, n;
        //     var showWordPopup;
        //     var tEng, tEngLen, mpId, start, end, btnMpAudio, btnMpAudioLen;
        //     var grammarBtns, grammarBtnLeft, grammarBtnTop;
            
        //     // 단어 팝업 버튼 및 팝업 요소 생성
        //     for (i = 0; i < wordLen; i++) {
        //         wordEl = words[i];
        //         wordKey = wordEl.getAttribute("data-word");
        //         wordInfo = WORD[curDir][wordKey];
        //         id = "S_" + wordKey;
        //         subtitleId = "subtitle_S_" + wordKey;
        //         // subtitleId = "subtitle_S_word_mean";
        //         mean = wordInfo.mean;
        //         eg = wordInfo.eg;
        //         eg = eg.replace(/\/c/gi, "<span class='color'>");
        //         eg = eg.replace(/\/ec/gi, "</span>");
        //         translation = wordInfo.translation;
        //         file = wordInfo.file;
                
        //         if (wordInfo.word) {
        //             word = wordInfo.word;
        //         } else {
        //             word = wordKey.replace(/\_/gi, " ");
        //         }

        //         wordBtnHtml = "<div class='wordMean reading_layer wordBtnWrap'>" +
        //             "<div class='wordMeanBtn' data-word='" + wordKey + "'></div>" +
        //             "</div>";

        //         wordPopupHtml = "<div class='wordPopWrap'>" +
        //             "<div id='" + wordKey + "' class='rl_content'>" +
        //             "<div class='inner' id='" + subtitleId + "'>" +
        //             "<div class='word_t caption'>" +
        //             "<div class='word_s tEng'>" + word + "</div>" +
        //             "<div class='word_n'>" + mean + "</div>" +
        //             "</div>" +
        //             "<div class='word_d caption'>" +
        //             "<div class='tEng'>" + eg + "</div>" +
        //             "<div class='tKor active'>" + translation + "</div>" +
        //             "</div>" +
        //             "<div class='inner_mp3_wrap'>" +
        //             "<div class='btn_mp_audio'  id='" + id + "' media='" + file + "'></div>" +
        //             "</div>" +
        //             "</div>" +
        //             "<button class='btnClose'></button>" +
        //             "</div>" +
        //             "</div >";

        //         scriptArea.insertAdjacentHTML("beforeend", wordBtnHtml);
        //         innerWrap.insertAdjacentHTML("beforeend", wordPopupHtml);

        //         wordBtnWrap = document.getElementsByClassName("wordBtnWrap")[i];
        //         wordBtnH = document.getElementsByClassName("wordMeanBtn")[0].clientHeight;

        //         btnLeft = wordEl.offsetLeft + "px";
        //         btnTop = wordEl.offsetTop - wordBtnH + "px";
        //         wordBtnWrap.setAttribute("style", "left:" + btnLeft + ";top:" + btnTop);
        //     }

        //     // 단어 팝업 버튼 이벤트 바인딩
        //     btns = document.getElementsByClassName("wordMeanBtn");
        //     btnLen = btns.length;
        //     closeBtns = document.querySelectorAll(".wordPopWrap .btnClose");
        //     closeBtnLen = closeBtns.length;

        //     showWordPopup = function(e) {
        //         var btnClass = e.target.classList;
        //         var popupId = this.getAttribute("data-word");
        //         var wordPopup = document.getElementById(popupId);
        //         var wordPopWrap = wordPopup.parentElement;
        //         var mpEle = wordPopWrap.getElementsByClassName("btn_mp_audio")[0];
        //         var file_name, wordSyncData, wordData;
                
        //         // 팝업 닫기
        //         var hideWordPop = function(e) {
        //             // console.log('wordPopup ', wordPopup);
        //             if (!wordPopup.contains(e.target)) {
        //                 wordPopWrap.classList.remove("show");
        //                 document.removeEventListener("click", hideWordPop);
        //                 resetAllMediaPlayer();
        //             }
        //         }

        //         resetAllMediaPlayer();

        //         if (mpEle) {
        //             // <<< 단어 읽기용 미디어플레이어
        //             file_name = mpEle.getAttribute("media"); // 팝업을 열 때 관련 파라미터를 준비하여 changeMedia 연결해둠
        //             // var file_name = "m01/008_01_01"; // 팝업을 열 때 관련 파라미터를 준비하여 changeMedia 연결해둠
        //             // var data_ref = "S_01"; // 데이터 참조값
        //             // var subtitle_ref = "S_01"; // 자막 DIV 참조값
        //             wordSyncData = mp_data.data_word_mean.subtitle;
        //             wordData = WORD[curDir][popupId];

        //             wordSyncData[0] = wordData.sync[0];
        //             wordSyncData[1] = wordData.sync[1];

        //             changeMedia("word_mean", file_name, "word_mean", "S_" + popupId);
        //             // >>>
        //         }

        //         wordPopWrap.classList.toggle("show");
        //         wordPopup.style.top = contentH / 2 - wordPopup.clientHeight / 2 + "px";
        //         wordPopup.style.left = contentW / 2 - wordPopup.clientWidth / 2 + "px";
                
        //         // 팝업 닫기 버튼
        //         for (k = 0; k < closeBtnLen; k++) {
        //             closeBtns[k].addEventListener("click", function() {
        //                 var targetPop = this.closest(".wordPopWrap");

        //                 targetPop.classList.remove("show");
        //                 document.removeEventListener("click", hideWordPop);
        //                 resetAllMediaPlayer();
        //             });
        //         }
                
        //         // 팝업 외부 클릭
        //         e.stopPropagation();
        //         document.addEventListener("click", hideWordPop);
        //     }

        //     for (j = 0; j < btnLen; j++) {
        //         btns[j].addEventListener("click", showWordPopup);
        //     }


        //     //  문법 해설 팝업 이벤트 바인딩
        //     for (l = 0; l < wordGrammarLen; l++) {
        //         scriptArea.insertAdjacentHTML("beforeend", grammarBtnHtml);

        //         grammarBtns = document.querySelectorAll(".wordGrammar.reading_layer");

        //         grammarBtnLeft = wordGrammars[l].offsetLeft + "px";
        //         grammarBtnTop = wordGrammars[l].offsetTop - wordBtnH + "px";

        //         grammarBtns[l].setAttribute("style", "left:" + grammarBtnLeft + ";top:" + grammarBtnTop);
        //         grammarBtns[l].setAttribute("data-word", wordGrammars[l].getAttribute("data-word"));

        //         // 클릭
        //         grammarBtns[l].addEventListener("click", showWordPopup);
        //     }


        //     // 미디어 플레이어 연결 -START
        //     tEng = document.querySelectorAll(".wordPopWrap .tEng");
        //     tEngLen = tEng.length;

        //     for (m = 0; m < tEngLen; m++) {
        //         tEng[m].addEventListener("click", function() {
        //             var content = this.closest(".rl_content");
        //             var word = content.id;
        //             var syncArr = WORD[curDir][word].sync;
        //             var syncOrder = +!this.classList.contains("word_s");

        //             // mpId = content.getElementsByClassName("mp_audio")[0].id;
        //             start = syncArr[syncOrder][0];
        //             end = syncArr[syncOrder][1];

        //             // console.log('mpId: ', mpId, 'start: ', start, ', end: ', end);
        //                 // <<< 단어 읽기용 미디어플레이어
        //             playMediaPlayer("word_mean", start, end); // 닭어 읽이용 미디어플레이어의 파일을 갈아치우고, 항상 이 미디어플레이어를 호출
        //                 // >>>
        //         });
        //     }

        //     // btn_mp_audio
        //     btnMpAudio = document.querySelectorAll(".wordPopWrap .btn_mp_audio");
        //     btnMpAudioLen = btnMpAudio.length;

        //     for (n = 0; n < btnMpAudioLen; n++) {
        //         btnMpAudio[n].addEventListener("click", function() {
        //             var syncId = this.id;
        //             var content = this.closest("#" + syncId.replace("S_", ""));
        //             var word = content.id;
        //             var syncArr = WORD[curDir][word].sync;

        //             start = syncArr[0][0];
        //             end = syncArr[1][1];
                    
        //             playMediaPlayer("word_mean", start, end);
        //         });
        //     }
        //     // 미디어 플레이어 연결 -END
        // },
        /**
         * html파일 로드 대본 삽입
         * @memberOf DEV.ui
         */
        insertScript: function () {
            var $target = $(".loadScript");
            var url = $target.data("target");

            $(window).on("load", function () {
                $target.load(url, function (data) {
                    console.log('load script success::::: ', url);
                    $target.html($(this).find(".scrollContent"));
                    dev.ui.initScroll();

                    // setupMediaPlayer();
                });
            });
        },
        /**
         * 페이지 이동 버튼 설정
         * @memberOf DEV.ui
         */
        initLinkBtn: function() {
            var linkBtns = document.getElementsByClassName("linkPage");
            var btnLen = linkBtns.length;
            var i, page;

            for (i = 0; i < btnLen; i++) {
                linkBtns[i].addEventListener("click", function() {
                    page = this.getAttribute("data-page");

                    location.href = page;
                });
            }
        },
        /**
         * 단어 미리보기 화면 생성
         * @memberOf DEV.ui
         */
        initPreviewWord: function() {
            var previewBtn = document.getElementsByClassName("ar_prew")[0];
            
            if (!previewBtn) {
                return;
            }
            
            var popId = previewBtn.getAttribute("data-popup");
            var popContainer = document.getElementById(popId);
            var slideLists = popContainer.querySelectorAll(".slideDetail > li");
            var slideLen = slideLists.length;
            var wordInfo = WORD[curDir];
            var keys = Object.keys(wordInfo);
            var wordLen = keys.length;
            var i = 0, j = 0;
            var wordBox = "";
            var subtitleId, wordKey, word, wordObj, mean, eg, translation, syncId, mediaFile;
            var slideIdx;
            var tEng, tEngLen, btnMpAudio, btnMpAudioLen;
            var wordBoxLen, syncCnt, id, dataKey;

            // html 생성
            for (i = 0; i < wordLen; i++) {
                wordKey = keys[i];
                wordObj = wordInfo[wordKey];
                mean = wordObj.mean;
                eg = wordObj.eg;
                eg = eg.replace(/\/c/gi, "<span class='color'>");
                eg = eg.replace(/\/ec/gi, "</span>");
                translation = wordObj.translation;
                mediaFile = wordObj.file;
                syncId = "S_" + wordKey;
                subtitleId = "subtitle_" + syncId;

                if (!wordObj.word) {
                    word = wordKey.replace(/\_/gi, " ");
                } else {
                    word = wordObj.word;
                }

                wordBox += '<div class="word_box" id="' + subtitleId + '" data-word="' + wordKey + '">' +
                    '<div class="word_t caption">' +
                    '<div class="word_s tEng">' + word + '</div>' +
                    '<div class="word_n">' + mean + '</div>' +
                    '</div>' +
                    '<div class="word_d caption">' +
                    '<div class="tEng">' + eg + '</div>' +
                    '<div class="tKor">' + translation + '</div>' +
                    '</div>' +
                    '<div class="inner_mp3_wrap">' +
                    '<div class="btn_mp_audio" id="' + syncId + '" media="' + mediaFile + '"></div>' +
                    '</div>' +
                    '</div>';

                if (!((i + 1) % 10)) {
                    slideIdx = ((i + 1) / 10) - 1;
                    slideLists[slideIdx].getElementsByClassName("scroll_detail")[0].insertAdjacentHTML("afterbegin", wordBox);
                    wordBox = "";
                }
            }

            // sync data 생성
            for (i = 0; i < slideLen; i++) {
                wordBox = slideLists[i].getElementsByClassName("word_box");
                wordBoxLen = wordBox.length;
                id = slideLists[i].id.replace("subtitle_", "");
                dataKey = "data_" + id;
                syncCnt = 0;

                mp_data[dataKey] = {};
                mp_data[dataKey].subtitle = [];

                for (j = 0; j < wordBoxLen; j++) {
                    word = wordBox[j].getAttribute("data-word").replace(/\s/g, "_");
                    // console.log('word', word);
                    mp_data[dataKey].subtitle[j + syncCnt] = wordInfo[word].sync[0];
                    syncCnt++;
                    mp_data[dataKey].subtitle[j + syncCnt] = wordInfo[word].sync[1];
                }
            }
            // console.log('mp_data:::::', mp_data);

            // 이벤트 연결
            tEng = popContainer.getElementsByClassName("tEng");
            tEngLen = tEng.length;

            for (i = 0; i < tEngLen; i++) {
                tEng[i].addEventListener("click", function() {
                    var id = document.querySelector(".word_mp_01 .mp_audio").id;
                    var word = this.closest(".word_box").getAttribute("data-word").replace(/\s/g, "_");
                    var syncArr = wordInfo[word].sync;
                    var syncOrder = +!this.classList.contains("word_s");
                    var start = syncArr[syncOrder][0];
                    var end = syncArr[syncOrder][1];

                    // console.log('id: ', id, 'start: ', start, ', end: ', end);
                    playMediaPlayer(id, start, end);
                });
            }

            btnMpAudio = popContainer.getElementsByClassName("btn_mp_audio");
            btnMpAudioLen = btnMpAudio.length;

            for (i = 0; i < btnMpAudioLen; i++) {
                btnMpAudio[i].addEventListener("click", function() {
                    var word = this.closest(".word_box").getAttribute("data-word").replace(/\s/g, "_");
                    var syncArr = wordInfo[word].sync;
                    var start = syncArr[0][0];
                    var end = syncArr[1][1];

                    // console.log('id: ', id, 'start: ', start, ', end: ', end);
                    playMediaPlayer("S_01_popup", start, end);
                });
            }
        },
        /**
         * 드래그 가능한 요소 설정(현재 퀵메뉴만 적용)
         * @memberOf DEV.ui
         */
        initDraggable: function() {
            var isSavePos = false; // 좌표 저장 여부
            var isClone = false; // 클론 생성 여부
            var isNoAns = false; // 정답 존재 여부
            var isCheck = false; // 정오답 확인 여부
            var dragItems = document.getElementsByClassName("dragBox");
            var dragItemLen = dragItems.length;
            var i = 0;
            var posX = 0, posY = 0, newPosX = 0, newPosY = 0;
            var savedPosX, savedPosY;
            var dragItem, cloneClass, touchObj;
            var leftGap, topGap;
            var btnReplays = document.getElementsByClassName("resetDrag");
            var btnReplayLen = btnReplays.length;
            var btnChecks = document.getElementsByClassName("chkDragAns");
            var btnCheckLen = btnChecks.length;
            var ansCnt = 0;
            var eventTarget;
            // var firstPosX, firstPosY;

            // sessionStorage.clear("dragItemPosX");
            // sessionStorage.clear("dragItemPosY");

            if (isSavePos) {
                savedPosX = sessionStorage.getItem("dragItemPosX");
                savedPosY = sessionStorage.getItem("dragItemPosY");
                dragItem.style.top = savedPosY + "px";
                dragItem.style.left = savedPosX + "px";
            }

            var startDragItem = function(e) {
                // console.log('mousedown', savedPosX);
                var parentEle = this.parentElement;
                var assessmentItem =this.closest(".quizType");
                var dropBoxes = assessmentItem.querySelectorAll(".drop_container .dropBox");
                var dropBoxLen = dropBoxes.length;
                var i;

                e.preventDefault();

                // .dragBox가 .disabled를 갖고 있으면 동작X
                if (this.classList.contains("disabled")) return;

                // dragBox, dropBox z-index 처리
                this.style.zIndex = 10;
                for (i = 0; i < dropBoxLen; i++) {
                    dropBoxes[i].style.zIndex = 0;
                }

                this.setAttribute("data-top", this.offsetTop);
                this.setAttribute("data-left", this.offsetLeft);
                dragItem = this;
                leftGap = 0;
                topGap = 0;

                // 좌표 가져오기
                if (util.isTouchDevice) {
                    touchObj = e.touches[0];
                    posX = touchObj.clientX / ZOOM_VALUE;
                    posY = touchObj.clientY / ZOOM_VALUE;
                    eventTarget = dragItem;
                } else {
                    posX = e.clientX / ZOOM_VALUE;
                    posY = e.clientY / ZOOM_VALUE;
                    eventTarget = document;
                }
                // console.log('posX', posX, 'posY', posY);
                
                // 드래그 아이템 복제 및 위치 설정
                if (isClone) {
                    dragItem = this.cloneNode(true);
                    cloneClass = dragItem.classList;
                    cloneClass.add("clone");
                    parentEle.insertAdjacentElement("beforeend", dragItem);

                    do {
                        leftGap += parentEle.offsetLeft;
                        topGap += parentEle.offsetTop;
                        parentEle = parentEle.parentElement;
                    } while (parentEle.classList.contains("drag_container"))

                    dragItem.style.left = posX - leftGap - (dragItem.clientWidth / 2) + "px";
                    dragItem.style.top = posY - topGap - (dragItem.clientHeight / 2) + "px";
                }

                eventTarget.addEventListener("touchmove", function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                });
                eventTarget.addEventListener(util.getEventType("move"), moveDragItem);
                eventTarget.addEventListener(util.getEventType("up"), finishDragItem);
            }

            var moveDragItem = function(e) {
                // console.log('moveDragItem', );
                // if (!firstPosX || !firstPosY) {
                //     firstPosX = posX;
                //     firstPosY = posY;
                // }

                if (util.isTouchDevice) {
                    touchObj = e.touches[0];
                    newPosX = posX - touchObj.clientX / ZOOM_VALUE;
                    newPosY = posY - touchObj.clientY / ZOOM_VALUE;
                    posX = touchObj.clientX / ZOOM_VALUE;
                    posY = touchObj.clientY / ZOOM_VALUE;
                } else {
                    newPosX = posX - e.clientX / ZOOM_VALUE;
                    newPosY = posY - e.clientY / ZOOM_VALUE;
                    posX = e.clientX / ZOOM_VALUE;
                    posY = e.clientY / ZOOM_VALUE;
                }

                // if (Math.abs(posX - firstPosX) > 50 || Math.abs(posY - firstPosY) > 50) {
                //     cloneClass.add("onDrag");
                // }
                
                dragItem.style.top = (dragItem.offsetTop - newPosY) + "px";
                dragItem.style.left = (dragItem.offsetLeft - newPosX) + "px";
            }

            var finishDragItem = function(e) {
                // console.log('finishDragItem', e);
                var changedX, changedY;
                if (util.isTouchDevice) {
                    touchObj = e.changedTouches[0];
                    changedX = touchObj.clientX;
                    changedY = touchObj.clientY;
                } else {
                    changedX = e.clientX;
                    changedY = e.clientY;
                }

                var assessmentItem = dragItem.closest(".quizType");
                var dropBoxes = assessmentItem.querySelectorAll(".drop_container .dropBox");
                var dropBoxLen = dropBoxes.length;
                var isSound = assessmentItem.getAttribute("data-sound");
                var isAskTest = assessmentItem.closest(".askQuizContent:not(.my_goal)");
                isNoAns = assessmentItem.getAttribute("data-noans");
                isCheck = assessmentItem.getAttribute("data-check");

                for (i = 0; i < dropBoxLen; i++) {
                    if (dropBoxes[i].getAttribute('data-drag') && !isNoAns) continue;
                    dropBoxes[i].style.zIndex = 11;
                }
                var target = document.elementFromPoint(changedX, changedY);
                for (i = 0; i < dropBoxLen; i++) {
                    if (!dropBoxes[i].classList.contains("highest")) {
                        dropBoxes[i].style.zIndex = 0;
                    } else {
                        dropBoxes[i].style.zIndex = 11;
                    }
                }
                
                var dropRect = target.getBoundingClientRect();
                var dropNum = target.getAttribute("data-drop");
                var dragNum = dragItem.getAttribute("data-drag");
                var qid = assessmentItem.getAttribute("data-qid");
                var btnReplay = document.querySelector(".resetDrag[data-target='" + qid + "']");
                var btnCheck = document.querySelector(".chkDragAns[data-target='" + qid + "']");
                var ansArrs = assessmentItem.querySelectorAll(".answerCorrect");
                var ansArrsLen = ansArrs.length;
                var otherMsgs = assessmentItem.querySelectorAll(".answer_container .ansMsg");
                var dragBoxes = assessmentItem.querySelectorAll(".drag_container .dragBox");
                var dragBoxLen = dragBoxes.length;
                var blindDragItem = assessmentItem.querySelector(".dragBox.blind");
                var ansMsgWrap = assessmentItem.querySelector(".ansMsg_wrap");
                var isCorrect = false;
                var i = 0, j = 0, k = 0, n = 0, m = 0, p = 0, dragDone = 0;
                var efCheck = false;
                var dragItemId, dragBoxId, dropBox, ansMsg, showMsg, cloneDropBox;
                var dragBoxImg, dropBoxImg, dragIdx, dragBox;
                var ansArr, ansArrLen;
                var ansMsgTxt, ansMsgid, dragItemMd;
                var anotherAns, dropBoxAns;

                // 현재 드래그한 요소 원래 자리로
                var initDragItemPos = function() {
                    dragItem.style.top = dragItem.getAttribute("data-top") + "px";
                    dragItem.style.left = dragItem.getAttribute("data-left") + "px";
                }

                for (; j < ansArrsLen; j++){
                    if (ansArrs[j].classList.contains("essayAnswer")) continue;

                    ansArr = ansArrs[j].innerText.split("\/\/");
                    ansArrLen = ansArr.length;
                }
                // firstPosX = 0;
                // firstPosY = 0;

                // 모바일에서 드래그 종료시 mp_text 재생 안됨
                if (util.isTouchDevice && dragItem.classList.contains("mp_text")) {
                    dragItem.click();
                }

                if (isNoAns) { // 정답이 없는 경우
                    if (target.classList.contains("dropBox") || target.closest(".dropBox")) {
                        if (isSound) {
                            playFeedSound(true);
                        }
                        if (dropBoxLen === 1) { // dropBox가 하나인 경우
                            dropBox = dropBoxes[0];
                            showMsg = dropBox.querySelector(".ansMsg.show");

                            if (showMsg && blindDragItem) {
                                showMsg.classList.remove("show");
                                blindDragItem.classList.remove("blind");
                                blindDragItem.style.top = blindDragItem.getAttribute("data-top") + "px";
                                blindDragItem.style.left = blindDragItem.getAttribute("data-left") + "px";
                            }

                            dragItem.classList.add("blind");
                            dropBox.children[dragNum - 1].classList.add("show");
                            btnReplay.classList.add("show");

                            // 오디오 재생 활성화
                            dragItemId = dragItem.id;
                            if (dragItemId) {
                                setNeutralize(dragItemId, 'mpText', false);
                            }
                        } else { // dropBox가 여러개인 경우
                            if (target.querySelector("img") || target.nodeName === "img"|| target.nodeName === "p"){ // dropBox 안에 이미지 있는 경우
                                target = target.closest(".dropBox");
                                dropBoxImg = target.querySelector("img");

                                if (dragItem.classList.contains("changeImg")) {
                                    target = target.querySelector(".ansMsg");
                                    dragIdx = target.getAttribute("data-drag");
                                }
                                
                                dragIdx = target.getAttribute("data-drag");
                                dragBox = dragBoxes[dragIdx - 1];
                                
                                dragBox.classList.remove("blind");
                                dragBox.style.top = dragBox.getAttribute("data-top") + "px";
                                dragBox.style.left = dragBox.getAttribute("data-left") + "px";
                            
                                dropBoxImg.parentNode.removeChild(dropBoxImg);
                            }

                            dragBoxImg = dragItem.querySelector("img");
                            cloneDropBox = dragBoxImg.cloneNode(true);

                            // 이미지 변경하는 경우
                            if (dragItem.classList.contains("changeImg")) {
                                cloneDropBox.src = cloneDropBox.src.replace("drag", "drag_answer");

                                ansMsgTxt = dragItem.getAttribute("data-txt");
                                showMsg = target.querySelector('p');
                                showMsg.textContent = ansMsgTxt;

                                ansMsgid = target.id;
                                dragItemMd = dragItem.getAttribute("data-media");
                                
                                //id에 따른 오디오 변경
                                changeMedia(ansMsgid, dragItemMd);
                                setNeutralize(ansMsgid, 'mpText', false);
                            }

                            cloneDropBox.setAttribute("style", "");
                            target.appendChild(cloneDropBox);

                            dragItem.classList.add("blind");
                            target.children[0].classList.add("show");
                            btnReplay.classList.add("show");
                        }
                        
                        btnCheck.classList.add("blind");
                        target.setAttribute("data-drag", dragNum);
                        dragItem.setAttribute("data-drop", dropNum);

                        if (otherMsgs) {
                            if (dragItem.classList.contains("changeImg")) {
                                dropBoxAns = assessmentItem.querySelectorAll(".dropBox .ansMsg");
                                
                                for (; n < dropBoxAns.length; n++) {
                                    if (dropBoxAns[n].getAttribute("data-drag")) {
                                        dragDone++;
                                    }
                                }
                            } else {
    
                            }

                            if (dragDone === dropBoxLen) {
                                for (; m < otherMsgs.length; m++) {
                                    otherMsgs[m].classList.add("show");
                                }
                            }
                        }
                    } else {
                        initDragItemPos();
                    }
                } else { // 정답이 있는 경우
                    if (isClone) cloneClass.remove("onDrag");

                    if (isCheck) { // 정답확인 버튼 클릭시 정오답 확인하는 경우
                        if (target.classList.contains("dropBox") || target.closest(".dropBox")) {
                            if (dropBoxLen === 1) { // dropBox가 하나인 경우
                                dropBox = dropBoxes[0];
                                showMsg = dropBox.querySelector(".ansMsg.show");
                                
                                if (showMsg && blindDragItem) {
                                    showMsg.classList.remove("show");
                                    blindDragItem.classList.remove("blind");
                                    blindDragItem.style.top = blindDragItem.getAttribute("data-top") + "px";
                                    blindDragItem.style.left = blindDragItem.getAttribute("data-left") + "px";
                                }
                                
                                dropBox.children[dragNum - 1].classList.add("show");

                                if (dragNum === ansArr[0]) isCorrect = true;
                                else isCorrect = false;
                                
                                if (target.querySelector("img") || target.nodeName === "img") target = target.closest(".dropBox");

                                target.setAttribute("iscorrect", isCorrect);
                            } else {
                                if (target.classList.contains("dragBox") || target.nodeName === "img") {
                                    target = target.closest(".dropBox");
                                    dropNum = target.getAttribute("data-drop");
                                }
                                if (target.querySelector(".dragBox")) {
                                    dragIdx = target.lastChild.getAttribute("data-drag");
                                    dragBox = dragBoxes[dragIdx - 1];

                                    dragBox.classList.remove("blind");
                                    dragBox.style.top = dragBox.getAttribute("data-top") + "px";
                                    dragBox.style.left = dragBox.getAttribute("data-left") + "px";
                                    target.removeChild(target.lastChild);
                                }

                                if (dropNum === ansArr[dragNum - 1]) {
                                    isCorrect = true;
                                    target.setAttribute("iscorrect", true);
                                } else {
                                    isCorrect = false;
                                    target.setAttribute("iscorrect", false);
                                }
                                cloneDropBox = dragItem.cloneNode(true);
                                if (cloneDropBox.id) { // id 존재시 중복되므로 데이터셋에 추가 후 제거
                                    cloneDropBox.setAttribute("data-mpid", cloneDropBox.id);
                                    cloneDropBox.removeAttribute("id");
                                }
                                cloneDropBox.classList.remove("colorOn");
                                target.appendChild(cloneDropBox);
                            }

                            dragItem.classList.add("blind");
                        } else {
                            initDragItemPos();
                        }
                    } else { // 드래그시 정오답 확인하는 경우
                        if (dropBoxLen >= dragBoxLen) {
                            if (dropNum === ansArr[dragNum - 1]) {
                                isCorrect = true;
                                target.setAttribute("iscorrect", true);
                            }
                        } else {
                            if (dropNum === dragNum) {
                                isCorrect = true;
                                target.setAttribute("iscorrect", true);
                            }
                        }

                        if (!target.classList.contains("dropBox") || !isCorrect) {
                            efCheck = false;
                            initDragItemPos();
                        } else {
                            efCheck = true;
                            dragItem.classList.add("blind");
                            
                            if (target.firstChild) {
                                ansMsg = target.firstChild;
                                ansMsg.classList.add("show");
                            } else {
                                ansMsg = target.closest(".quiz_drag").querySelector(".ansMsg:nth-child(" + dropNum + ")");
                                ansMsg.classList.add("show");
                            }
                            
                            ansCnt++;
        
                            btnReplay.classList.add("show");
                            
                            if (ansCnt === ansArrLen) {
                                for (; i < dropBoxLen; i++) {
                                    if (dropBoxes[i].querySelector(".ansMsg")) {
                                        dropBoxes[i].querySelector(".ansMsg").classList.add("show");
                                    }
                                }

                                for (; n < dragBoxLen; n++) {
                                    if (dragBoxes[n].classList.contains("neutralize")) {
                                        dragBoxId = dragBoxes[n].id;
                                        setNeutralize(dragBoxId, 'mpText', false);
                                    }
                                    dragBoxes[n].classList.add("disabled");
                                }

                                if (otherMsgs) {
                                    for (; k < otherMsgs.length; k++) {
                                        otherMsgs[k].classList.add("show");
                                    }
                                }
                            }

                            target.setAttribute("data-drag", dragNum);
                            dragItem.setAttribute("data-drop", dropNum);

                            // 사람 이미지 띄우기 (L3)
                            if (ansMsgWrap) {
                                anotherAns = ansMsgWrap.querySelectorAll(".ansMsg");
                                anotherAns[dropNum - 1].classList.add("show");
                            }
                            
                            // 오디오 재생 활성화
                            dragItemId = dragItem.id;
                            if (dragItemId) {
                                setNeutralize(dragItemId, 'mpText', false);
                            }
                            if(target.id) {
                                setNeutralize(target.id, 'mpText', false);
                            }
                            btnCheck.classList.add("blind");
                        }
                        playFeedSound(efCheck);
                    }
                }
                //if (isCheck && isNoAns) btnCheck.classList.add("blind");

                if (isClone) {
                    cloneClass.add("offDrag");
                    // 클론 위치 재설정
                    dragItem.style.left = dropRect.left - leftGap + "px";
                    dragItem.style.top = dropRect.top - topGap + "px";
                }

                if (isSavePos) {
                    sessionStorage.setItem("dragItemPosX", (dragItem.offsetLeft - newPosX));
                    sessionStorage.setItem("dragItemPosY", (dragItem.offsetTop - newPosY));
                }

                eventTarget.removeEventListener(util.getEventType("move"), moveDragItem);
                eventTarget.removeEventListener(util.getEventType("up"), finishDragItem);
            }

            for (i = 0; i < dragItemLen; i++) {
                dragItems[i].addEventListener(util.getEventType("down"), startDragItem);
            }

            // 정답 보기
            for (i = 0; i < btnCheckLen; i++) {
                btnChecks[i].addEventListener("click", function() {
                    var qid = this.getAttribute("data-target");
                    var quizMarking = this.closest(".quizMarking");
                    var assessmentItem = document.querySelector("[data-qid='" + qid + "']");
                    var dragBoxes = assessmentItem.querySelectorAll(".drag_container .dragBox");
                    var dropBoxes = assessmentItem.querySelectorAll(".drop_container .dropBox");
                    var otherMsgs = assessmentItem.querySelector(".answer_container .ansMsg");
                    var dropBoxesLen = dropBoxes.length;
                    var isCheck = assessmentItem.getAttribute("data-check");
                    var multi = assessmentItem.getAttribute("data-question-multi");
                    var quizCheck = assessmentItem.querySelector(".quizCheck");
                    var isAskTest = assessmentItem.closest(".askQuizContent:not(.my_goal)");
                    var isCheckTest = assessmentItem.closest(".askQuizContent.my_goal");
                    var isCorrect = "correct";
                    var efCheck = true;
                    var btnReplay = document.querySelector(".btnReplay[data-target='" + qid + "']");
                    var ansArr = assessmentItem.querySelector(".answerCorrect:not(.essayAnswer)").innerText.split("\/\/");
                    var noFeedSound = this.classList.contains("noFeedSound");
                    var ansMsgWrap = assessmentItem.querySelector(".ansMsg_wrap");
                    var i, answers, ansMsgLen, dragBox;

                    for (i = 0; i < dropBoxesLen; i++) {
                        answers = dropBoxes[i].querySelectorAll(".ansMsg");
                        ansMsgLen = answers.length;

                        if (!answers.length) { // ansMsg가 dropBox 밖에 있는 경우
                            answers = assessmentItem.querySelectorAll(".ansMsg");
                        }

                        [].forEach.call(answers, function (ansMsg, idx) {
                            var dropBox = ansMsg.parentElement;
                            if (!dropBox.hasAttribute("iscorrect") || dropBox.getAttribute("iscorrect") === "false") {
                                if (dropBoxesLen === 1) {
                                    if (answers.length === 1) {
                                        answers[0].classList.add("show");
                                    } else {
                                        answers[ansArr - 1].classList.add("show");
                                        ansMsg.classList.remove("show");
                                    }
                                } else {
                                    dragBox = dropBox.querySelector(".dragBox");

                                    if (isCheckTest && dragBox){
                                        dragBox.parentNode.removeChild(dragBox);
                                    }

                                    if (ansMsgLen > 1 && ansArr[i] - 1 === idx) {
                                        dropBox.children[ansArr[i] - 1].classList.add("show");
                                    } else if (ansMsgLen <= 1) {
                                        ansMsg.classList.add("show");
                                    }
                                }

                                if (isCheck) {
                                    isCorrect = "wrong";
                                    efCheck = false;
                                }
                            };
                        });
                    }

                    [].forEach.call(dragBoxes, function (dragBox) {
                        dragBox.classList.add("blind");
                    });

                    if (isCheck && !noFeedSound){
                        if (multi) {
                            if (efCheck) quizCheck.textContent = "true";
                            else quizCheck.textContent = "false";
                        } else {
                            if (quizMarking) quizMarking.classList.add(isCorrect);
                            playFeedSound(efCheck);
                        }
                    }

                    if (otherMsgs) otherMsgs.classList.add("show");
                    
                    if (ansMsgWrap) {
                        var anotherAns = ansMsgWrap.querySelectorAll(".ansMsg");
                        var j = 0;

                        for (j = 0; j < anotherAns.length; j++){
                            anotherAns[j].classList.add("show");
                        }
                    }
                });
            }
            
            // 다시 풀기
            for (i = 0; i < btnReplayLen; i++) {
                btnReplays[i].addEventListener("click", function() {
                    var btnReplay = this;
                    var quizMarking = this.closest(".quizMarking");
                    var qid = btnReplay.getAttribute("data-target");
                    var clones = document.querySelectorAll("[data-qid='" + qid + "'] .clone");
                    var btnCheck = document.querySelector(".chkDragAns[data-target='" + qid + "']");
                    var assessmentItem = document.querySelector("[data-qid='" + qid + "']");
                    var dropBoxes = assessmentItem.querySelectorAll(".drop_container .dropBox");
                    var dragBoxes = assessmentItem.querySelectorAll(".dragBox");
                    var otherMsgs = assessmentItem.querySelector(".answer_container .ansMsg");
                    var isCheck = assessmentItem.getAttribute("data-check");
                    var isNoAns = assessmentItem.getAttribute("data-noans");
                    var ansMsgs = assessmentItem.querySelectorAll(".dropBox .ansMsg");
                    //var multi = assessmentItem.getAttribute("data-question-multi");
                    var dropBox, ansMsg;
                    
                    [].forEach.call(dragBoxes, function(dragBox) {
                        var onAnsMsg = assessmentItem.querySelectorAll(".ansMsg.show");
                        var onAnsLen = onAnsMsg.length;
                        var j;

                        dragBox.style.top = dragBox.getAttribute("data-top") + "px";
                        dragBox.style.left = dragBox.getAttribute("data-left") + "px";
                        dragBox.classList.remove("blind");
                        dragBox.classList.remove("disabled");
                        btnReplay.classList.remove("show");

                        for (var j = 0; j < onAnsLen; j++) {
                            onAnsMsg[j].classList.remove("show");
                        }
                    });
                    //otherMsgs.classList.remove("show");
                    ansCnt = 0;

                    [].forEach.call(clones, function(clone) {
                        clone.parentElement.removeChild(clone);
                    });

                    if (isNoAns && dropBoxes.length > 1){
                        [].forEach.call(assessmentItem.querySelectorAll(".dropBox"), function(dropBox) {
                            var clone = dropBox.querySelector("img");
                            var txt = dropBox.querySelector("p");

                            if (clone) {
                                clone.parentNode.removeChild(clone);
                            }
                            if (txt) {
                                txt.textContent = "";
                            }
                        });
                    }

                    if (!isNoAns){
                        for (var i = 0; i < dropBoxes.length; i++) {
                            dropBox = dropBoxes[i];
                            dropBox.removeAttribute("iscorrect");
                            dropBox.setAttribute("data-drag", "");
                        }
                    }

                    for (var i = 0; i < ansMsgs.length; i++) {
                        ansMsg = ansMsgs[i];
                        ansMsg.removeAttribute("data-drag");
                    }

                    if (isCheck){
                        if(quizMarking) quizMarking.classList.remove("correct", "wrong");
                        
                        [].forEach.call(assessmentItem.querySelectorAll(".dropBox"), function(dropBox) {
                            var clone = dropBox.querySelector(".dragBox");
                            if (clone) {
                                dropBox.removeChild(clone);
                            }
                            dropBox.setAttribute("iscorrect", false);
                        });
                    }
                    if (btnCheck) btnCheck.classList.remove("blind");
                });
            }

            // 정오답 효과음 추가
            var playFeedSound = function(efCheck) {
                var clickAudio;
                
                if (efCheck) clickAudio = document.getElementsByClassName('feedOk')[0];
                else clickAudio = document.getElementsByClassName('feedNo')[0];
                
                if(!clickAudio.ended) {
                    clickAudio.currentTime = 0;
                }
                clickAudio.play();
            }
        },
        /**
         * 개별 정답 버튼에 마우스오버 시 문장에 호버 스타일 미적용
         * @memberOf DEV.ui
         */
        removeHover: function() {
            var eachBtns = document.getElementsByClassName("eachBtn");
            var eachBtnLen = eachBtns.length;
            var inputTxts = document.getElementsByClassName("input_txt");
            var inputTxtLen = inputTxts.length;
            var i = 0;
            var eachBtn, tEng, inputTxt;

            var addNoHover = function() {
                var tEng = this.closest(".tEng");
                var mpText = this.closest(".mp_text");

                if (tEng) {
                    tEng.classList.add("noHover");
                } else if (mpText) {
                    mpText.classList.add("noHover");
                }
            }

            var removeNoHover = function () {
                var tEng = this.closest(".tEng");
                var mpText = this.closest(".mp_text");

                if (tEng) {
                    tEng.classList.remove("noHover");
                } else if (mpText) {
                    mpText.classList.remove("noHover");
                }
            }

            for (; i < eachBtnLen; i++) {
                eachBtn = eachBtns[i];

                eachBtn.addEventListener("mouseover", addNoHover);
                eachBtn.addEventListener("mouseout", removeNoHover);
            }

            for (i = 0; i < inputTxtLen; i++) {
                inputTxt = inputTxts[i];

                inputTxt.addEventListener("mouseover", addNoHover);
                inputTxt.addEventListener("mouseout", removeNoHover);
            }
        },

        //버튼 효과음 재생
        playBtnSound: function() {
            //버튼 효과음 붙이기
            $("body").append("<audio class='feedAudio_ok'><source src='../common/media/feed_ok.mp3' type='audio/mpeg'></source></audio>");
            $("body").append("<audio class='feedAudio'><source src='../common/media/feed_no.mp3' type='audio/mpeg'></source></audio>");
            
            var correctSound = document.getElementsByClassName('feedAudio_ok')[0];
            var wrongSound = document.getElementsByClassName('feedAudio')[0];
            var btn = document.querySelectorAll("[class*='btn']");
            var btnLen = btn.length;

            for (var i = 0; i < btnLen; i++){
                if (btn[i].classList.contains("btnReplay")){
                    btn[i].addEventListener("click", function() {
                        correctSound.pause();
                        wrongSound.currentTime = 0;
                        wrongSound.pause();
                        wrongSound.play();
                    });
                } else if (btn[i].classList.contains("btnCheck")){
                    btn[i].addEventListener("click", function() {
                        wrongSound.pause();
                        correctSound.currentTime = 0;
                        correctSound.pause();
                        correctSound.play();
                    });
                } /* else if (btn[i].classList.contains("btn_each")){
                    btn[i].addEventListener("click", function() {
                        if(this.classList.contains("on")){
                            correctSound.pause();
                            wrongSound.currentTime = 0;
                            wrongSound.pause();
                            wrongSound.play();
                        } else {
                            wrongSound.pause();
                            correctSound.currentTime = 0;
                            correctSound.pause();
                            correctSound.play();
                        }
                    });
                } */
            }
        },
        /**
         * 이북 버튼 선택시 콘텐츠 내 팝업 바로 열기(단어미리보기, 팝업)
         * @memberOf DEV.ui
         */
        openExtraPopup: function() {
            var targetClass = location.href.split("?")[1];
            var targetEle = document.getElementsByClassName(targetClass)[0];

            if (targetEle) {
                targetEle.click();
            }
        },
        /**
         * 체크박스 설정
         * @memberOf DEV.ui
         */
        initCheckbox: function() {
            var $checkbox = $(".checkBox");
            var $btnReplay = $(".btnReplay.resetCheck");
            
            $checkbox.on("click", function() {
                var $this = $(this);
                var $input = $this.prev();
                var $checkWrap = $input.parents(".checkWrap");

                if ($input.prop("type") === "radio") {
                    $checkWrap.find("input").each(function(i, ele) {
                        if (ele !== $input[0]) {
                            $(ele).removeClass("on");
                        }
                    });
                }

                if (!$input.hasClass("on")) {
                    $input.prop("disabled", false);
                } else {
                    $input.prop("disabled", true).prop("checked", false);
                }

                $input.toggleClass("on");
            });

            $btnReplay.on("click", function() {
                var $this = $(this);
                var id = $this.data("target");

                $("#" + id).find("input").prop("checked", false).removeClass("on");
            });
        },
        /**
         * 선택한 요소 내 콘텐츠(텍스트/이미지)를 타겟 요소에 추가
         * @memberOf DEV.ui
         */
        appendContents: function () {
            $(".returnClick").on("click", function(e) {
                var $content = $(this);
                var isDuplicate = $content.parents(".checkWrap").data("duplication");
                var $textEle = $content.find(".returnTxt");
                var $imgEle = $content.find(".returnImg");

                // 정답 확인 중인 경우
                if ($content.parents(".quizType").find(".checkItem.answer").length) {
                    return;
                }
                // 체크박스가 있는 경우
                if ($content.find(".checkPoint").length) {
                    if (!$(e.target).hasClass("checkPoint")) {
                        return;
                    }
                }

                $textEle.each(function() {
                    var $this = $(this);
                    var targetData = $this.data("target");
                    var $target = $(".returnResult[data-target='" + targetData + "']");
                    var str = $this.text();
                    
                    if ($target[0].tagName === "input") {
                        if (!$this.parents(".checkItem").find("input").prop("checked")) {
                            $target.val("");
                        } else {
                            $target.val(str);
                        }
                    } else {
                        if (!$this.parents(".checkItem").find("input").prop("checked")) {
                            $target.text("");
                        } else {
                            $target.text(str);
                        }
                    }

                    if (!isDuplicate) {
                        $content.remove();
                    }
                });

                $imgEle.each(function() {
                    var $this = $(this);
                    var targetData = $this.data("target");
                    var $target = $(".returnResult[data-target='" + targetData + "']");
                    var $imgClone;
                    
                    if (!$target.hasClass("appended")) {
                        if (isDuplicate) {
                            $imgClone = $this.clone();
                            $target.append($imgClone);
                            $target.addClass("appended");
                        } else {
                            $this.appendTo($target);
                        }
                    }
                });
            });
        },
        /**
         * 뷰어에서 input 값을 받았는지 체크한 후 기능 처리
         * @memberOf DEV.ui
         */
        chkInputVal: function () {
            if (parent === window) return;
            
            var $quizInput = $(".quizType").find("input, textarea");
            var idArr = [];

            var interval = setInterval(function () {
                $quizInput.each(function () {
                    var $this = $(this);
                    var $assessmentItem = $this.parents(".quizType");
                    var qid = $assessmentItem.data("qid");
                    var responseType = $assessmentItem.data("response-type");
                    var $checkItem = $this.parents(".checkItem");
                    var $btnCheck = $(".btnCheck[data-target='" + qid + "']");
                    var $btnScript = $btnCheck.parent().find(".btnScript, .btnTran");
                    var $btnAudio = $(".btnAudio[data-target='" + qid + "']");
                    var isAllInput;

                    if ($this.parents("#pop_askpop").length) return; // 스스로 해봐요 제외

                    // if (!this.id) return;

                    // if (idArr.indexOf(this.id) !== -1) {
                    //     clearInterval(interval);
                    // }

                    if (responseType === "singleChoice" || responseType === "multipleChoice" || responseType === "trueFalse") {
                        if ($this.prop("checked")) {
                            $checkItem.addClass("on");
                            // idArr.push(this.id);
                            // $btnCheck.addClass("show");
                            // $btnScript.addClass("show");
                            // 오디오 재생 버튼이 존재하는 경우
                            // if ($btnAudio.length) {
                            //     $btnAudio.addClass("played");
                            //     $this.css("pointer-events", "");
                            //     $this.prop("disabled", false);
                            // }
                        }
                    } else {
                        if ($this.val()) {
                            $this.parents("itemBody").find(".input_wrap").each(function() {
                                if (!$(this).find("input").val()) {
                                    isAllInput = false;
                                    return false;
                                } else {
                                    isAllInput = true;
                                }
                            });

                            // idArr.push(this.id);
                            // 한 문제내 모든 input 값이 존재해야 버튼 노출
                            // if (isAllInput) {
                            //     $btnCheck.addClass("show");
                            //     $btnScript.addClass("show");
                            //     // 오디오 재생 버튼이 존재하는 경우
                            //     if ($btnAudio.length) {
                            //         $btnAudio.addClass("played");
                            //         $this.css("pointer-events", "");
                            //         $this.prop("disabled", false);
                            //     }
                            // }
                        }
                    }
                    // idArr.push(this.id);
                }, 40);
            });
            // 뷰어에서 input value를 너무 늦게 줌
            setTimeout(function() {
                clearInterval(interval);
            }, 10000);
        },
        // 정오답 효과음
        setBtnAudio: function (url) {
            var soundUrl = [url  || "./media/effect/true.mp3", url || "./media/effect/false.mp3", url || "./media/effect/wrong.mp3"];
            var btnName = ['feedOk', 'feedNo', 'feedWrong'];

            for (var i = 0; i < soundUrl.length; i++){
                var audioEle = document.createElement('audio');

                audioEle.setAttribute('class', btnName[i]);
                audioEle.setAttribute('src', soundUrl[i]);
                audioEle.setAttribute('type', 'audio/mpeg');

                $("body").append(audioEle);
            }
        },
        /**
         * 영상 구간 재생 버튼 설정
         * @memberOf DEV.ui
         */
        initPlaySection: function() {
            var $btnTimeMove = $(".btnTimeMove");

            $btnTimeMove.on("click", function() {
                var $btn = $(this);
                var timeArr = $btn.data("secTime").split(",");
                var startTime = timeArr[0];
                var endTime = timeArr[1];

                if (!$btn.hasClass("on")) {
                    // 구간 재생
                    playMediaPlayer("syncV_P_2", startTime, endTime);
                    // 버튼 .on 추가
                    $btnTimeMove.removeClass("on");
                    $btn.addClass("on");
                } else {
                    // 플레이어 초기화
                    resetAllMediaPlayer();
                    // 버튼 .on 제거
                    $btn.removeClass("on");
                }
            });
            
            // 팝업 닫을 시 버튼 초기화
            $btnTimeMove.parents(".popWrap").find(".btnPopupClose").on("click", function() {
                $btnTimeMove.removeClass("on");
            });
        },

        //음성 재생 후 문제 풀이 알럿창 생성
        initFeedMsg: function(typeFeed, feedCont, efCheck) {
            var $quizType = $(".quizType");
            var quizLen = $quizType.length;
            
            if (!quizLen) return;

            if (quizLen && typeFeed === undefined) {
                $quizType.append("<div class='feedMessage feedMotion' style='display: none;'></div>");
            } else {
                $quizType = $(".quizType[data-qid='"+ feedCont +"']");
                var target = event.target || event.srcElement;
                var $feedMsg = $quizType.find(".feedMessage");
                //var clickAudio = document.getElementsByClassName('feedNo')[0];

                $feedMsg.removeClass("n1 n2");

                if (typeFeed === "sound") $feedMsg.addClass("n1");
                else if (typeFeed === "quiz") $feedMsg.addClass("n2");
                else $feedMsg = feedCont.find(".feedMessage");
                
                clearTimeout(msgTimer);

                $feedMsg.css("display", "inline-block");
                $feedMsg.addClass("showOn");

                msgTimer = setTimeout(function(){
                    $feedMsg.css("display", "none");
                    $feedMsg.removeClass("n1 n2 showOn");
                }, 2000);

                // if(!clickAudio.ended) {
                //     clickAudio.currentTime = 0;
                // }
                // clickAudio.play();
            }
        },

        /**
         * 이미지 확대
         * @memberOf DEV.ui
         */
        // enlargeImg: function () {
        //     var $btnZoom = $(".btnZoom");

        //     $btnZoom.on("click", function() {
        //         var zoomEl = $(this);
        //         var zoomBtn = $(this).find(".btn_zoom");
        //         var zoomImg = $(this).find("img");
        //         var widthImg = zoomImg.attr("width");
        //         var width, height;

        //         // 배율
        //         // 위치

        //         if (!zoomBtn.hasClass("on")) {
        //             zoomBtn.addClass("on");
        //             imgBlind.show();
        //             zoomEl.after("<div style='position: relative; width: " + widthImg + "px; height: 1px; display: inline-block;'></div>");

        //             zoomImg.css({
        //                 "position": "absolute",
        //                 "width": "500"
        //             });
        //             height = zoomImg.css("height");
        //             width = zoomImg.css("width");

        //             zoomEl.css({
        //                 "position": "absolute",
        //                 "z-index": "5",
        //                 "width": width,
        //                 "height": height,
        //                 "left": 100,
        //                 "top": 170
        //             });
        //         } else {
        //             zoomBtn.removeClass("on");
        //             imgBlind.hide();
        //             zoomEl.next().remove();

        //             zoomImg.css({
        //                 "position": "",
        //                 "width": widthImg
        //             });

        //             zoomEl.css({
        //                 "position": "",
        //                 "z-index": "",
        //                 "width": "",
        //                 "height": "",
        //                 "left": "",
        //                 "top": ""
        //             });
        //         }
        //     });
        // },
    }
}());
