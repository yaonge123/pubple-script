/**
 * JavaScript UI Library
 * @author PUBPLE
 * @copyright PUBPLE 2018
 */

"use strict";

PUBPLE.createNs("ui");

/**
 * UI 기능 코드
 * @namespace ui
 * @memberOf PUBPLE
 */
PUBPLE.ui = (function() {
    // dependency
    var util = PUBPLE.util;

    // variables
    var curDir = location.href.split("/").slice(-2)[0]; // e.g. m01

    // 팝업 내 슬라이드 페이지 연결
    var slideNum;
    
    // 선긋기
    var storedLineObj = {};
    
    // 이벤트 타입 반환
    var getEventType = function(eventType) {
        var ret;

        switch (eventType) {
            case "down":
                ret = PUBPLE.isTouchDevice ? "touchstart" : "mousedown";
                break;
            case "move":
                ret = PUBPLE.isTouchDevice ? "touchmove" : "mousemove";
                break;
            case "up":
                ret = PUBPLE.isTouchDevice ? "touchend" : "mouseup";
                break;
            case "out":
                ret = PUBPLE.isTouchDevice ? "touchleave" : "mouseout";
                break;
            default:
                ret = "err";
                break;
        }
        return ret;
    }

    // 자가 테스트
    var selfScoreArr = [];

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

    // 슬라이드 초기화
    var resetSlide = function(tArea) {
        var targetArea = tArea ? tArea : document;
        var onSlide = targetArea.querySelector(".detailList.on");
        var firstSlide = targetArea.getElementsByClassName("detailList")[0];
        var onDot = targetArea.querySelector(".slideDotted li.on");
        var firstDot = targetArea.querySelector(".slideDotted li");

        if (onSlide) {
            onSlide.classList.remove("on");
            firstSlide.classList.add("on");
            onDot.classList.remove("on");
            firstDot.classList.add("on");
        }
    }

    // 해석 보기 초기화
    var resetBtnTran = function(tArea) {
        // 스크립트 해석 보기 초기화
        var targetArea = tArea ? tArea.closest(".pop_content") : document;
        var btnTran = targetArea.getElementsByClassName("btnTran")[0];
        var btnTranShow = targetArea.getElementsByClassName("btnTranShow")[0];
        var tKorBtns = targetArea.getElementsByClassName("tKor");
        var tKorBtnLen = tKorBtns.length;
        var i = 0;
        var tKorClass;

        if (btnTran) {
            for (i = 0; i < tKorBtnLen; i++) {
                tKorClass = tKorBtns[i].classList;
                tKorClass.remove("on");
                tKorClass.remove("active");
            }

            btnTran.classList.remove("on");
            btnTranShow.classList.remove("on");
        }
    }

    // 선긋기 초기화
    var resetDrawLine = function(ele) {
        var currPage = ele ? ele : document;
        var canvasAll = document.getElementsByTagName("canvas");
        var canvasLen = canvasAll.length;
        var hasDoneEls = document.querySelectorAll(".done");
        var hasDoneLen = hasDoneEls.length;
        var chkAnswerBtn = currPage.querySelector(".checkQuizLine");
        var i = 0;
        var j = 0;
        var canvasEl;
        var context;

        if (!chkAnswerBtn) {
            return;
        }

        for (; i < canvasLen; i++) {
            canvasEl = canvasAll[i];
            context = canvasEl.getContext("2d");
            context.clearRect(0, 0, canvasEl.width, canvasEl.height);
            storedLineObj[canvasEl.id] = [];
        }

        for (; j < hasDoneLen; j++) {
            hasDoneEls[j].classList.remove("done");
        }

        if (chkAnswerBtn && currPage) {
            chkAnswerBtn.classList.remove("btnReplay");
        }

    }

    return {
        /**
         * 스케일 값
         * @memberOf PUBPLE.ui
         */
        scaleValue: 1,
        /**
         * 화면 스케일
         * @memberOf PUBPLE.ui
         */
        setScale: function() {
            var containerEl = document.getElementById("container");
            var windowW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            var windowH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            var hRatio = windowW / containerEl.clientWidth;
            var vRatio = windowH / containerEl.clientHeight;
            var ratio = (hRatio < vRatio) ? hRatio : vRatio
            var left = windowW / 2 - containerEl.clientWidth / 2 * ratio + 'px';

            this.scaleValue = ratio;

            function setTransform(containerEl, hRatio, vRatio) {
                containerEl.setAttribute("style", "transform: scale(" + hRatio + "," + vRatio + ");"
                    + "-ms-transform: scale(" + hRatio + "," + vRatio + ");"
                    + "-webkit-transform: scale(" + hRatio + "," + vRatio + ");"
                    + "transform-origin: 0% 0%; -ms-transform-origin: 0% 0%; -webkit-transform-origin: 0% 0%;"
                    + 'left:' + left);
            }

            // setTransform(containerEl, hRatio, vRatio);
            setTransform(containerEl, ratio, ratio);
        },
        /**
         * 텍스트/이미지를 가리고 있는 영역 토글
         * @memberOf PUBPLE.ui
         */
        clickBtnShow: function() {
            var btnEls = document.getElementsByClassName("btnShow");
            var btnLen = btnEls.length;
            var answerBtns = document.getElementsByClassName("btnAllShow");
            var answerBtnLen = answerBtns.length;
            var i = 0;
            var btn;

            for (; i < btnLen; i++) {
                btn = btnEls[i];
                util.createEl("span", btn, "afterend", "hideTxtBox");

                btn.addEventListener("click", function() {
                    var hideTxtBox = this.nextElementSibling;
                    var btnContainerEl = this.closest("[id^='allShow']");
                    var btnContainerId, chkAnswerBtn, hideBoxEl;
                    var isBlindArr;

                    hideTxtBox.classList.toggle("blind");

                    if (btnContainerEl) {
                        btnContainerId = btnContainerEl.getAttribute("id");
                        chkAnswerBtn = document.querySelector("[data-target=" + btnContainerId + "]");
                    } else {
                        btnContainerEl = this.closest(".content");
                        chkAnswerBtn = btnContainerEl.querySelector(".btnAllShow");
                    }

                    // 정답 확인 버튼이 있는 경우
                    if (chkAnswerBtn) {
                        btnEls = btnContainerEl.getElementsByClassName("btnShow");
                        btnLen = btnEls.length;
                        isBlindArr = [];

                        for (i = 0; i < btnLen; i++) {
                            hideBoxEl = btnEls[i].nextElementSibling;
                            isBlindArr[i] = hideBoxEl.classList.contains("blind");
                        }

                        if (isBlindArr.indexOf(false) === -1) {
                            chkAnswerBtn.classList.toggle("btnReplay");
                        } else if (chkAnswerBtn.classList.contains("btnReplay")) {
                            chkAnswerBtn.classList.remove("btnReplay");
                        }
                    }
                });
            }

            // 정답 확인 버튼 있는 경우
            if (answerBtnLen) {
                for (var j = 0; j < answerBtnLen; j++) {
                    answerBtns[j].addEventListener("click", function() {
                        var targetAreaId = this.getAttribute("data-target");
                        var targetAreaEl = document.getElementById("targetAreaId");
                        var targetBtns = targetAreaEl.getElementsByClassName("btnShow");
                        var targetBtnLen = targetBtns.length;
                        var i = 0;
                        var hideBoxEl;

                        for (; i < targetBtnLen; i++) {
                            hideBoxEl = targetBtns[i].nextElementSibling;
                            if (!this.classList.contains("btnReplay")) {
                                hideBoxEl.classList.add("blind");
                            } else {
                                hideBoxEl.classList.remove("blind");
                            }
                        }
                        this.classList.toggle("btnReplay");
                    });
                }
            }
        },
        /**
         * 슬라이드 생성
         * @memberOf PUBPLE.ui
         */
        initSlide: function() {
            var slideContents = document.getElementsByClassName("slideContent");
            var slideContentsLen = slideContents.length;
            var i = 0;
            var isCircuit = false;
            var isPagination = false;
            var j, slideContEl, slideDetailEl, detailLists, detailListLen;
            var firstPageEl, moveBtnWrap, prevEl, nextEl;
            var slideDottedEl, k, onClass, dotEl;
            var popWrapClass;

            for (; i < slideContentsLen; i++) {
                slideContEl = slideContents[i];
                slideDetailEl = slideContEl.getElementsByClassName("slideDetail")[0];
                detailLists = slideDetailEl.querySelectorAll(".slideDetail > li");
                detailListLen = detailLists.length;
                popWrapClass = slideContEl.closest(".popWrap").classList;

                for (j = 0; j < detailListLen; j++) {
                    detailLists[j].classList.add("detailList");
                }

                firstPageEl = slideDetailEl.firstElementChild;
                firstPageEl.classList.add("on");
                isCircuit = slideContEl.getAttribute("data-circulation");
                isPagination = slideContEl.getAttribute("data-navigation");

                // 다음/이전 버튼 생성
                moveBtnWrap = util.createEl("div", slideContEl, "beforeend");
                prevEl = util.createEl("div", moveBtnWrap, "beforeend", "btnPrev");
                nextEl = util.createEl("div", moveBtnWrap, "beforeend", "btnNext");

                if (!isCircuit) {
                    prevEl.classList.add("off");
                }

                // pagination 생성
                if (isPagination) {
                    slideDottedEl = util.createEl("ul", slideContEl, "beforeend", "slideDotted");

                    for (k = 0; k < detailListLen; k++) {
                        onClass = "";

                        if (k === 0) {
                            onClass = "on";
                        }
                        
                        dotEl = util.createEl("li", slideDottedEl, "beforeend", onClass);
                        dotEl.setAttribute("data-pIdx", k);

                        // pagination 버튼 이벤트 등록
                        dotEl.addEventListener("click", function() {
                            var targetSlide = this.closest(".slideContent");
                            var detailEl = targetSlide.querySelector(".slideDetail");
                            var prevPageEl = targetSlide.querySelector(".detailList.on");
                            var dotWrapEl = this.parentElement;
                            var prevDotEl = dotWrapEl.querySelector(".on");
                            var selIdx = slideNum ? slideNum : Number(this.getAttribute("data-pIdx"));
                            var targetPage = detailEl.children[selIdx];;
                            var isCircuit = targetSlide.getAttribute("data-circulation");
                            var slideLists, pageNum, nextBtnEl, prevBtnEl;
                            var mpControl, mpEle, file_name, data_ref, subtitle_ref;

                            prevPageEl.classList.remove("on");
                            prevDotEl.classList.remove("on");
                            targetPage.classList.add("on");
                            this.classList.add("on");

                            initBtnShow(prevPageEl);
                            resetDrawLine(prevPageEl);
                            resetBtnTran(prevPageEl);
                            resetAllMediaPlayer();

                            // 미디어 플레이어 참조값 변경
                            mpControl = targetSlide.closest(".popWrap").getElementsByClassName("word_mp_01")[0];
                            if (mpControl) {
                                mpEle = targetPage.getElementsByClassName("btn_mp_audio")[0];
                                file_name = mpEle.getAttribute("media");
                                data_ref = targetPage.id.replace("subtitle_", "");;
                                
                                subtitle_ref = targetPage.id.replace("subtitle_", "");
                                // console.log('data_ref: ', data_ref, ', subtitle_ref: ', subtitle_ref);

                                changeMedia("S_01_popup", file_name, data_ref, subtitle_ref);
                            }

                            if (!isCircuit) {
                                slideLists = detailEl.querySelectorAll(".slideDetail > li");
                                pageNum = slideLists.length;
                                nextBtnEl = targetSlide.querySelector(".btnNext");
                                prevBtnEl = targetSlide.querySelector(".btnPrev");

                                if (selIdx) {
                                    prevBtnEl.classList.remove("off");

                                    if (selIdx === (pageNum - 1)) {
                                        nextBtnEl.classList.add("off");
                                    } else {
                                        nextBtnEl.classList.remove("off");
                                    }
                                } else {
                                    prevBtnEl.classList.add("off");
                                    nextBtnEl.classList.remove("off");
                                }
                            }
                        });
                    }
                    // pagiantion 중앙 정렬
                    popWrapClass.add("show");
                    slideDottedEl.style.left = (slideContEl.clientWidth - slideDottedEl.clientWidth) / 2 + "px";
                    popWrapClass.remove("show");
                }

                // 다음/이전 버튼 이벤트 등록
                moveBtnWrap.addEventListener("click", function(e) {
                    var target = e.target;
                    var targetSlide = target.closest(".slideContent");
                    var detailEl = targetSlide.querySelector(".slideDetail");
                    var isCircuit = targetSlide.getAttribute("data-circulation");
                    var isPagination = targetSlide.getAttribute("data-navigation");
                    var currPageEl = targetSlide.querySelector(".slideDetail > li.on");
                    var btnClass = target.classList;
                    var nextPageEl, nextBtnClass, prevBtnClass;
                    var k, pages, pageLen, slideDotWrap, nextIdx, currDotEl, nextDotEl;

                    if (btnClass.contains("btnPrev")) {
                        nextPageEl = currPageEl.previousElementSibling;
                        nextBtnClass = target.nextSibling.classList;

                        if (!isCircuit) {
                            if (nextPageEl) {
                                if (!nextPageEl.previousElementSibling) {
                                    btnClass.add("off");
                                }
                                nextBtnClass.remove("off");
                            } else {
                                return;
                            }
                        } else {
                            if (!nextPageEl) {
                                nextPageEl = detailEl.lastElementChild;
                            }
                        }
                    } else {
                        nextPageEl = currPageEl.nextElementSibling;
                        prevBtnClass = target.previousSibling.classList;

                        if (!isCircuit) {
                            if (nextPageEl) {
                                if (!nextPageEl.nextElementSibling) {
                                    btnClass.add("off");
                                }
                                prevBtnClass.remove("off");
                            } else {
                                return;
                            }
                        } else {
                            if (!nextPageEl) {
                                nextPageEl = detailEl.firstElementChild;
                            }
                        }
                    }

                    currPageEl.classList.remove("on");
                    nextPageEl.classList.add("on");

                    initBtnShow(currPageEl);
                    resetDrawLine(currPageEl);

                    // 슬라이드 pagination 사용하는 경우
                    if (isPagination) {
                        k = 0;
                        pages = detailEl.querySelectorAll(".detailList");
                        pageLen = pages.length;
                        slideDotWrap = targetSlide.querySelector(".slideDotted");
                        
                        for (; k < pageLen; k++) {
                            if (pages[k] === nextPageEl) {
                                nextIdx = k;
                            }
                        }

                        currDotEl = slideDotWrap.querySelector(".on");
                        currDotEl.classList.remove("on");
                        nextDotEl = slideDotWrap.children[nextIdx];
                        nextDotEl.classList.add("on");
                    }

                    currPageEl = nextPageEl;
                });
            }
        },
        /**
         * 탭 설정
         * @memberOf PUBPLE.ui
         */
        initTab: function() {
            var tabs = document.querySelectorAll(".tabMenu > li");
            var tabLen = tabs.length;
            var tabDetails = document.querySelectorAll(".tabDetail > li");
            var i = 0;
            var activeIdx = 0; // 뷰어 연동시 다시 초기화

            if(!tabLen) {
                return;
            } else {
                tabs[activeIdx].classList.add("on");
                tabDetails[activeIdx].classList.add("on");

                for (; i < tabLen; i++) {
                    tabs[i].addEventListener("click", function(e) {
                        var target = e.target;
                        var currTabEl = document.querySelector(".tabMenu > .on");
                        var currDetail = document.querySelector(".tabDetail > .on");
                        var tabsArr = [].slice.call(tabs);
                        var tabIdx = tabsArr.indexOf(target);

                        currTabEl.classList.remove("on");
                        target.classList.add("on");

                        currDetail.classList.remove("on");
                        tabDetails[tabIdx].classList.add("on");

                        initBtnShow(currDetail);
                        resetDrawLine(currDetail);
                    });
                }
            }
        },
        /**
         * 고정형 라이트박스 팝업
         * @memberOf PUBPLE.ui
         */
        initLbPop: function() {
            var popBtns = document.getElementsByClassName("popUp");
            var popBtnLen = popBtns.length;
            var closeBtns = document.querySelectorAll(".popWrap .btnClose");
            var closeBtnLen = closeBtns.length;
            var i, j;
            
            for (i = 0; i < popBtnLen; i++) {
                popBtns[i].addEventListener("click", function() {
                    var popId = this.getAttribute("data-popup");
                    var popContainer = document.getElementById(popId);
                    var popWrapEl = popContainer.parentElement;
                    var contentEl = popContainer.firstElementChild;
                    var btnClasses = this.classList;
                    var popupShow = document.querySelector(".popWrap.show");
                    var transBtn, btnShowKor, korScripts, korScriptLen, j, mediaId, popMediaId, targetPopId, popCloseBtn, btnAllShow;
                    var containerW, containerH, popupW, popupH;
                    var slideNum;

                    // 드래그시에는 팝업 열지 않음
                    if (btnClasses.contains("onDrag")) {
                        btnClasses.remove("onDrag");
                        return;
                    }

                    if (popupShow) {
                        popupShow.classList.remove("show");
                    }
                    
                    popWrapEl.classList.add("show");

                    // 슬라이드 페이지 연결
                    slideNum = this.getAttribute("data-slideNum");
                    if (slideNum) {
                        contentEl.querySelector(".slideDotted > li:nth-child(" + slideNum + ")").click();
                    }
                    
                    // 가운데 정렬
                    if (btnClasses.contains("alignCenter")) {
                        containerW = popContainer.clientWidth;
                        containerH = popContainer.clientHeight;
                        popupW = contentEl.clientWidth;
                        popupH = contentEl.clientHeight;


                        contentEl.style.left = (containerW - popupW) / 2 + "px";
                        contentEl.style.top = (containerH - popupH) / 2 + "px";
                    }

                    // 스크립트 팝업 설정
                    if (btnClasses.contains("btnScript") || btnClasses.contains("btnSentence") || btnClasses.contains("ar_prew")) {
                        // 스크립트 해석 보기 초기화
                        transBtn = document.getElementsByClassName("btnTran")[0];
                        btnAllShow = document.getElementsByClassName("btnTranShow")[0];
                        btnShowKor = document.querySelector(".btnTranShow.p_ex");
                        korScripts = popContainer.getElementsByClassName("tKor");
                        korScriptLen = korScripts.length;

                        for (j = 0; j < korScriptLen; j++) {
                            korScripts[j].classList.remove("on");
                            korScripts[j].classList.remove("active");
                        }

                        if (transBtn) {
                            transBtn.classList.remove("on");
                            btnAllShow.classList.remove("on");
                        } else if (btnShowKor){
                            btnShowKor.classList.remove("on");
                        }

                        // 미디어플레이어 연동
                        // mediaId = this.getAttribute("data-mediaId");
                        // popMediaId = mediaId + "_pop";
                        // targetPopId = this.getAttribute("data-popup");
                        // popCloseBtn = document.querySelector("#" + targetPopId + " .btnClose");

                        // moveMedia(mediaId, popMediaId);

                        // popCloseBtn.addEventListener("click", function () {
                        //     moveMedia(popMediaId, mediaId);
                        // });
                    }

                    // 미디어 플레이어 정지
                    resetAllMediaPlayer();
                });
            }

            for (j = 0; j < closeBtnLen; j++) {
                closeBtns[j].addEventListener("click", function () {
                    var popWrapEl = this.closest(".popWrap");
                    var quizInputs = popWrapEl.getElementsByClassName("essayWrite");
                    var quizInputLen = quizInputs.length;
                    var mediaEl = popWrapEl.getElementsByClassName("mp_audio")[0];
                    var mediaId;
                    var i = 0;

                    popWrapEl.classList.remove("show");

                    // 문제 초기화
                    for (; i < quizInputLen; i++) {
                        // 주관식
                        quizInputs[i].value = "";
                        quizInputs[i].disabled = false;
                        quizInputs[i].nextElementSibling.classList.remove("show");
                    }

                    //미디어플레이어 재생 정지
                    resetAllMediaPlayer();

                    // 슬라이드 초기화
                    resetSlide(popWrapEl);
                });
            }
        },
        /**
         * 레이어 팝업 설정
         * @memberOf PUBPLE.ui
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
         * @memberOf PUBPLE.ui
         */
        initToast: function() {
            var toastBtns = document.getElementsByClassName("btnToastUp");
            var btnToastLen = toastBtns.length;
            var i, btnToast;

            for (i = 0; i < btnToastLen; i++) {
                btnToast = toastBtns[i];

                btnToast.addEventListener("click", function(e) {
                    var toastPopup = this.nextElementSibling;
                    var onToastEl = document.querySelector(".toastPopup.show");
                    var btnClose;

                    if (toastPopup === onToastEl) {
                        return;
                    } else {
                        if (onToastEl) {
                            onToastEl.classList.remove("show");
                        }
                        toastPopup.classList.add("show");
                    }

                    btnClose = toastPopup.getElementsByClassName("btnClose")[0];

                    e.stopPropagation();
                    document.addEventListener("click", function hideToast(e) {
                        if (!toastPopup.contains(e.target)) {
                            toastPopup.classList.remove("show");
                            document.removeEventListener("click", hideToast);
                        }
                    });

                    btnClose.addEventListener("click", function() {
                        toastPopup.classList.remove("show");

                        // 미디어플레이어 재생 정지
                        resetAllMediaPlayer();
                    });
                });
            }
        },
        /**
         * 툴팁 설정
         * @memberOf PUBPLE.ui
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
         * @memberOf PUBPLE.ui
         * @param {string} axis - x | y
         */
        initScroll: function(axis) {
            var scrollContEls = document.getElementsByClassName("scrollContent");
            var scorllContLen = scrollContEls.length;
            var axis = axis || "y";
            var i;
            
            if(!scrollContEls.length) {
                return;
            }

            for (i = 0; i < scorllContLen; i++) {
                if (axis === "y") {
                    scrollContEls[i].classList.add("scroll_vertical");
                } else {
                    scrollContEls[i].classList.add("scroll_horizontal");
                }
            }

            $(".scrollContent").mCustomScrollbar({
                axis: axis, // 스크롤 축
                autoDraggerLength: false, // 스크롤바 사이즈 고정,
                autoExpandScrollbar: false, // 스크롤바에 커서가 올라가거나 드래그시 자동 확장 미사용
                scrollInertia: 0, // ms당 스크롤 애니메이션
                mouseWheel: {
                    // scrollAmount: 1000 // 휠 스크롤 양(default: auto)
                },
                advanced: {
                    autoScrollOnFocus: false // 포커스시 자동 스크롤
                },
                live: "on",
                liveSelector: ".scrollContent"
            });
        },
        /**
         * 파일 다운로드 설정
         * @memberOf PUBPLE.ui
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
         * @memberOf PUBPLE.ui
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
         * @memberOf PUBPLE.ui
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
         * @memberOf PUBPLE.ui
         * @param {number} caseNum - 일대다: 0, 다대다: 1
         */
        initDrawLine: function(caseNum) {
            var drawsets = document.getElementsByClassName("draw_set");
            var setLen = drawsets.length;
            var isManyToMany = false;
            var isOneToMany = false;
            var isAnswerShow = false;
            var startPObj = {};
            var endPObj = {};
            var i, drawSetEl, canvas, slideDetail, ctx, canvasId;
            var startPoints, startPLen, j, endPonits, endPLen, k;
            var currCvs, currCvsId, currCtx;
            var mouseX, mouseY;
            var startPoint, startDataNum;
            var startX, startY;

            // 선긋기 시작
            var clickCanvas = function(e) {
                currCvs = this;
                currCvsId = currCvs.id;
                currCtx = currCvs.getContext("2d");

                var spObj = startPObj[currCvsId];
                var spLen = Object.keys(spObj).length;
                var i, spAttrs, spClasses;

                e.preventDefault();
                getMousePoint(e);

                for (i = 0; i < spLen; i++) {
                    spAttrs = spObj[i];

                    if (mouseX > spAttrs.left && mouseX < spAttrs.right && mouseY > spAttrs.top && mouseY < spAttrs.bottom) {
                        startPoint = this.parentElement.querySelector(".lineStart:nth-child(" + (i + 1) + ")");
                        spClasses = startPoint.classList;
                        startDataNum = spAttrs.num;

                        if (isAnswerShow) {
                            document.getElementsByClassName("checkQuizLine")[0].classList.remove("btnReplay");
                            resetDrawLine();
                            isAnswerShow = false;
                        }

                        if (!spClasses.contains("done") || isManyToMany) {
                            spClasses.add("done");
                        } else {
                            storedLineObj[currCvsId].filter(removePreLine);
                        }

                        spClasses.add("on");
                        startX = spAttrs.left + spAttrs.width / 2;
                        startY = spAttrs.top + spAttrs.height / 2;

                        currCvs.addEventListener(getEventType("move"), drawLine);
                        currCvs.addEventListener(getEventType("up"), finishDrawing);
                        currCvs.addEventListener(getEventType("out"), cancelDrawing);
                    }
                }
            }

            // 이벤트 좌표 값 구하기
            var getMousePoint = function(e) {
                var zoom = PUBPLE.zoomVal;
                var rect, touchObj;

                if (PUBPLE.isTouchDevice) {
                    rect = e.target.getBoundingClientRect();
                    touchObj = e.touches[0];
                    mouseX = parseInt(touchObj.clientX - rect.left) / zoom;
                    mouseY = parseInt(touchObj.clientY - rect.top) / zoom;
                } else {
                    mouseX = e.offsetX / zoom;
                    mouseY = e.offsetY / zoom;
                }
            }

            // 이미 그려진 선 제거
            var removePreLine = function(val, idx, arr) {
                if (val.startNum === startDataNum) {
                    arr.splice(idx, 1);
                    document.querySelector(".lineEnd[data-num='" + val.endNum + "']").classList.remove("done");
                }
            }

            // 선 그리기
            var drawLine = function(e) {
                e.preventDefault();
                getMousePoint(e);
                redrawStoredLines();

                currCtx.beginPath();
                currCtx.moveTo(startX, startY);
                currCtx.lineTo(mouseX, mouseY);
                currCtx.stroke();
            }

            // 저장 된 선 그리기
            var redrawStoredLines = function() {
                var currStoredLine = storedLineObj[currCvsId];
                var storedLineLen = currStoredLine.length

                currCtx.clearRect(0, 0, currCvs.width, currCvs.height);

                for (var i = 0; i < storedLineLen; i++) {
                    currCtx.beginPath();
                    currCtx.moveTo(currStoredLine[i].x1, currStoredLine[i].y1);
                    currCtx.lineTo(currStoredLine[i].x2, currStoredLine[i].y2);
                    currCtx.stroke();
                }
            }

            // 선긋기 그리기 종료
            var finishDrawing = function() {
                var epObj = endPObj[currCvsId];
                var epLen = Object.keys(epObj).length;
                var i, endPoint, epAttrs, epClasses, endDataNum, endX, endY;

                for (i = 0; i < epLen; i++) {
                    epAttrs = epObj[i];

                    if (mouseX > epAttrs.left && mouseX < epAttrs.right && mouseY > epAttrs.top && mouseY < epAttrs.bottom) {
                        endPoint = this.parentElement.querySelector(".lineEnd:nth-child(" + (i + 1) + ")");
                        epClasses = endPoint.classList;
                        endDataNum = epAttrs.num;
                        endX = epAttrs.left + epAttrs.width / 2;
                        endY = epAttrs.top + epAttrs.height / 2;

                        if (!epClasses.contains("done") || isOneToMany || isManyToMany) {
                            epClasses.add("done");

                            storedLineObj[currCvsId].push({
                                startNum: startDataNum,
                                endNum: endDataNum,
                                x1: startX,
                                y1: startY,
                                x2: endX,
                                y2: endY
                            });
                        }
                    }
                }

                startPoint.classList.remove("on");
                redrawStoredLines();

                currCvs.removeEventListener(getEventType("move"), drawLine);
                currCvs.removeEventListener(getEventType("up"), finishDrawing);
                currCvs.removeEventListener(getEventType("out"), cancelDrawing);
            }

            // 그리기 취소
            var cancelDrawing = function() {
                redrawStoredLines();
                startPoint.classList.remove("on");

                currCvs.removeEventListener("mousemove", drawLine);
                currCvs.removeEventListener("mouseout", cancelDrawing);
            }

            // 정답 확인
            var checkAnswer = function() {
                var canvasAll = document.getElementsByTagName("canvas");
                var canvasLen = canvasAll.length;
                var answerArr = document.getElementsByClassName("answerCorrect")[0].textContent.split("\/\/");
                var answerIdx = 0;
                var i, j, context, sPointX, sPointY, answer, ePointX, ePointY, spAttr, epAttr;

                resetDrawLine();
                if (isAnswerShow) {
                    isAnswerShow = false;
                    return;
                }
                if (!this.classList.contains("btnReplay")) {
                    this.classList.add("btnReplay");
                } else {
                    this.classList.remove("btnReplay");
                    return;
                }

                for (i = 0; i < canvasLen; i++) {
                    context = canvasAll[i].getContext("2d");

                    for (j = 0; j < startPLen; j++) {
                        spAttr = startPObj["canvas" + i][j];
                        sPointX = spAttr.left + spAttr.width / 2;
                        sPointY = spAttr.top + spAttr.height / 2;
                        answer = answerArr[answerIdx];

                        if (answer > endPLen) {
                            answer -= endPLen;
                        }

                        epAttr = endPObj["canvas" + i][answer - 1];
                        ePointX = epAttr.left + epAttr.width / 2;
                        ePointY = epAttr.top + epAttr.height / 2;
                        answerIdx += 1;

                        context.strokeStyle = "#ed1c24";
                        context.beginPath();
                        context.moveTo(sPointX, sPointY);
                        context.lineTo(ePointX, ePointY);
                        context.stroke();
                        context.strokeStyle = "#422ffb";
                    }
                }

                isAnswerShow = true;
            }

            if (caseNum === 0) {
                isOneToMany = true;
            } else if (caseNum === 1) {
                isManyToMany = true;
            }

            for (i = 0; i < setLen; i++) {
                // 캔버스 생성
                drawSetEl = drawsets[i];
                canvas = util.createEl("canvas", drawSetEl, "beforeend");
                slideDetail = drawSetEl.closest("li");

                if(slideDetail) {
                    slideDetail.classList.add("show");
                    slideDetail.style.visibility = "hidden";
                }

                canvas.width = drawSetEl.clientWidth;
                canvas.height = drawSetEl.clientHeight;

                ctx = canvas.getContext("2d");
                canvasId = "canvas" + i;
                canvas.setAttribute("id", canvasId);
                storedLineObj[canvasId] = [];

                // 선 스타일
                canvas.style.zIndex = 10;
                ctx.strokeStyle = "#422ffb";
                ctx.lineWidth = 2;

                // 시작점 속성을 갖는 객체 생성
                startPoints = drawSetEl.getElementsByClassName("lineStart");
                startPLen = startPoints.length;
                startPObj[canvasId] = {};

                for(j = 0; j < startPLen; j++) {
                    startPObj[canvasId][j] = {};
                    startPObj[canvasId][j].width = startPoints[j].clientWidth;
                    startPObj[canvasId][j].height = startPoints[j].clientHeight;
                    startPObj[canvasId][j].top = startPoints[j].offsetTop;
                    startPObj[canvasId][j].left = startPoints[j].offsetLeft;
                    startPObj[canvasId][j].bottom = startPObj[canvasId][j].top + startPoints[j].clientHeight;
                    startPObj[canvasId][j].right = startPObj[canvasId][j].left + startPoints[j].clientWidth;
                    startPObj[canvasId][j].num = startPoints[j].getAttribute("data-num");
                }

                // 끝점 속성을 갖는 객체 생성
                endPonits = drawSetEl.getElementsByClassName("lineEnd");
                endPLen = endPonits.length;
                endPObj[canvasId] = {};

                for(k = 0; k < endPLen; k++) {
                    endPObj[canvasId][k] = {};
                    endPObj[canvasId][k].width = endPonits[k].clientWidth;
                    endPObj[canvasId][k].height = endPonits[k].clientHeight;
                    endPObj[canvasId][k].top = endPonits[k].offsetTop;
                    endPObj[canvasId][k].left = endPonits[k].offsetLeft;
                    endPObj[canvasId][k].bottom = endPObj[canvasId][k].top + endPonits[k].clientHeight;
                    endPObj[canvasId][k].right = endPObj[canvasId][k].left + endPonits[k].clientWidth;
                    endPObj[canvasId][k].num = endPonits[k].getAttribute("data-num");
                }

                if(slideDetail) {
                    slideDetail.style.visibility = "";
                    slideDetail.classList.remove("show");
                }

                // 이벤트 등록
                canvas.addEventListener(getEventType("down"), clickCanvas);

                util.getEl("qs", ".checkQuizLine").addEventListener("click", checkAnswer);
            }
        },
        // 자가 진단 테스트
        /**
         * 자가 진단 테스트 설정
         * @memberOf PUBPLE.ui
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
                        btn.classList.remove("on");btns[i];
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
         * @memberOf PUBPLE.ui
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
         * @memberOf PUBPLE.ui
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
         * @memberOf PUBPLE.ui
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
         * @memberOf PUBPLE.ui
         */
        initWordPopup: function() {
            var content = document.getElementsByClassName("content")[0];
            var contentW = content.clientWidth;
            var contentH = content.clientHeight;
            var innerWrap = document.getElementsByClassName("inner_wrap")[0];
            var scriptArea = document.querySelector(".readingArea .scriptArea");
            var words = document.querySelectorAll(".readingArea .wordMean");
            var wordLen = words.length;
            var wordGrammars = document.getElementsByClassName("wordGrammar");
            var wordGrammarLen = wordGrammars.length;

            var grammarBtnHtml = "<div class='wordGrammar reading_layer'>" +
                "<div class='wordGrammarnBtn'></div>";

            var wordEl, wordBtnHtml, wordPopupHtml, wordBtnWrap, wordBtnH;
            var wordKey, word, btnLeft, btnTop, wordInfo, id, subtitleId, mean, eg, translation, file, sync;
            var btns, btnLen, closeBtns, closeBtnLen;
            var i, j, k, l, m, n;
            var showWordPopup;
            var tEng, tEngLen, mpId, start, end, btnMpAudio, btnMpAudioLen;
            var grammarBtns, grammarBtnLeft, grammarBtnTop;
            
            // 단어 팝업 버튼 및 팝업 요소 생성
            for (i = 0; i < wordLen; i++) {
                wordEl = words[i];
                wordKey = wordEl.getAttribute("data-word");
                wordInfo = WORD[curDir][wordKey];
                id = "S_" + wordKey;
                subtitleId = "subtitle_S_" + wordKey;
                // subtitleId = "subtitle_S_word_mean";
                mean = wordInfo.mean;
                eg = wordInfo.eg;
                eg = eg.replace(/\/c/gi, "<span class='color'>");
                eg = eg.replace(/\/ec/gi, "</span>");
                translation = wordInfo.translation;
                file = wordInfo.file;
                
                if (wordInfo.word) {
                    word = wordInfo.word;
                } else {
                    word = wordKey.replace(/\_/gi, " ");
                }

                wordBtnHtml = "<div class='wordMean reading_layer wordBtnWrap'>" +
                    "<div class='wordMeanBtn' data-word='" + wordKey + "'></div>" +
                    "</div>";

                wordPopupHtml = "<div class='wordPopWrap'>" +
                    "<div id='" + wordKey + "' class='rl_content'>" +
                    "<div class='inner' id='" + subtitleId + "'>" +
                    "<div class='word_t caption'>" +
                    "<div class='word_s tEng'>" + word + "</div>" +
                    "<div class='word_n'>" + mean + "</div>" +
                    "</div>" +
                    "<div class='word_d caption'>" +
                    "<div class='tEng'>" + eg + "</div>" +
                    "<div class='tKor active'>" + translation + "</div>" +
                    "</div>" +
                    "<div class='inner_mp3_wrap'>" +
                    "<div class='btn_mp_audio'  id='" + id + "' media='" + file + "'></div>" +
                    "</div>" +
                    "</div>" +
                    "<button class='btnClose'></button>" +
                    "</div>" +
                    "</div >";

                scriptArea.insertAdjacentHTML("beforeend", wordBtnHtml);
                innerWrap.insertAdjacentHTML("beforeend", wordPopupHtml);

                wordBtnWrap = document.getElementsByClassName("wordBtnWrap")[i];
                wordBtnH = document.getElementsByClassName("wordMeanBtn")[0].clientHeight;

                btnLeft = wordEl.offsetLeft + "px";
                btnTop = wordEl.offsetTop - wordBtnH + "px";
                wordBtnWrap.setAttribute("style", "left:" + btnLeft + ";top:" + btnTop);
            }

            // 단어 팝업 버튼 이벤트 바인딩
            btns = document.getElementsByClassName("wordMeanBtn");
            btnLen = btns.length;
            closeBtns = document.querySelectorAll(".wordPopWrap .btnClose");
            closeBtnLen = closeBtns.length;

            showWordPopup = function(e) {
                var btnClass = e.target.classList;
                var popupId = this.getAttribute("data-word");
                var wordPopup = document.getElementById(popupId);
                var wordPopWrap = wordPopup.parentElement;
                var mpEle = wordPopWrap.getElementsByClassName("btn_mp_audio")[0];
                var file_name, wordSyncData, wordData;
                
                // 팝업 닫기
                var hideWordPop = function(e) {
                    // console.log('wordPopup ', wordPopup);
                    if (!wordPopup.contains(e.target)) {
                        wordPopWrap.classList.remove("show");
                        document.removeEventListener("click", hideWordPop);
                        resetAllMediaPlayer();
                    }
                }

                resetAllMediaPlayer();

                if (mpEle) {
                    // <<< 단어 읽기용 미디어플레이어
                    file_name = mpEle.getAttribute("media"); // 팝업을 열 때 관련 파라미터를 준비하여 changeMedia 연결해둠
                    // var file_name = "m01/008_01_01"; // 팝업을 열 때 관련 파라미터를 준비하여 changeMedia 연결해둠
                    // var data_ref = "S_01"; // 데이터 참조값
                    // var subtitle_ref = "S_01"; // 자막 DIV 참조값
                    wordSyncData = mp_data.data_word_mean.subtitle;
                    wordData = WORD[curDir][popupId];

                    wordSyncData[0] = wordData.sync[0];
                    wordSyncData[1] = wordData.sync[1];

                    changeMedia("word_mean", file_name, "word_mean", "S_" + popupId);
                    // >>>
                }

                wordPopWrap.classList.toggle("show");
                wordPopup.style.top = contentH / 2 - wordPopup.clientHeight / 2 + "px";
                wordPopup.style.left = contentW / 2 - wordPopup.clientWidth / 2 + "px";
                
                // 팝업 닫기 버튼
                for (k = 0; k < closeBtnLen; k++) {
                    closeBtns[k].addEventListener("click", function() {
                        var targetPop = this.closest(".wordPopWrap");

                        targetPop.classList.remove("show");
                        document.removeEventListener("click", hideWordPop);
                        resetAllMediaPlayer();
                    });
                }
                
                // 팝업 외부 클릭
                e.stopPropagation();
                document.addEventListener("click", hideWordPop);
            }

            for (j = 0; j < btnLen; j++) {
                btns[j].addEventListener("click", showWordPopup);
            }


            //  문법 해설 팝업 이벤트 바인딩
            for (l = 0; l < wordGrammarLen; l++) {
                scriptArea.insertAdjacentHTML("beforeend", grammarBtnHtml);

                grammarBtns = document.querySelectorAll(".wordGrammar.reading_layer");

                grammarBtnLeft = wordGrammars[l].offsetLeft + "px";
                grammarBtnTop = wordGrammars[l].offsetTop - wordBtnH + "px";

                grammarBtns[l].setAttribute("style", "left:" + grammarBtnLeft + ";top:" + grammarBtnTop);
                grammarBtns[l].setAttribute("data-word", wordGrammars[l].getAttribute("data-word"));

                // 클릭
                grammarBtns[l].addEventListener("click", showWordPopup);
            }


            // 미디어 플레이어 연결 -START
            tEng = document.querySelectorAll(".wordPopWrap .tEng");
            tEngLen = tEng.length;

            for (m = 0; m < tEngLen; m++) {
                tEng[m].addEventListener("click", function() {
                    var content = this.closest(".rl_content");
                    var word = content.id;
                    var syncArr = WORD[curDir][word].sync;
                    var syncOrder = +!this.classList.contains("word_s");

                    // mpId = content.getElementsByClassName("mp_audio")[0].id;
                    start = syncArr[syncOrder][0];
                    end = syncArr[syncOrder][1];

                    // console.log('mpId: ', mpId, 'start: ', start, ', end: ', end);
                        // <<< 단어 읽기용 미디어플레이어
                    playMediaPlayer("word_mean", start, end); // 닭어 읽이용 미디어플레이어의 파일을 갈아치우고, 항상 이 미디어플레이어를 호출
                        // >>>
                });
            }

            // btn_mp_audio
            btnMpAudio = document.querySelectorAll(".wordPopWrap .btn_mp_audio");
            btnMpAudioLen = btnMpAudio.length;

            for (n = 0; n < btnMpAudioLen; n++) {
                btnMpAudio[n].addEventListener("click", function() {
                    var syncId = this.id;
                    var content = this.closest("#" + syncId.replace("S_", ""));
                    var word = content.id;
                    var syncArr = WORD[curDir][word].sync;

                    start = syncArr[0][0];
                    end = syncArr[1][1];
                    
                    playMediaPlayer("word_mean", start, end);
                });
            }
            // 미디어 플레이어 연결 -END
        },
        /**
         * html파일 로드 대본 삽입
         * @memberOf PUBPLE.ui
         */
        insertScript: function () {
            var $target = $(".loadScript");
            var url = $target.data("target");

            $(window).on("load", function () {
                $target.load(url, function (data) {
                    console.log('load script success::::: ', url);
                    $target.html($(this).find(".scrollContent"));
                    PUBPLE.ui.initScroll();

                    // setupMediaPlayer();
                });
            });
        },
        /**
         * 페이지 이동 버튼 설정
         * @memberOf PUBPLE.ui
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
         * @memberOf PUBPLE.ui
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
         * @memberOf PUBPLE.ui
         */
        initDraggableItem: function() {
            var quickMenu = document.getElementById("quickMenu");
            var asideRight = document.getElementById("asideRight");
            var dragItems = [quickMenu, asideRight];
            var dragItemLen = dragItems.length;
            var i = 0;
            var posX = 0, posY = 0, newPosX = 0, newPosY = 0;
            var savedPosX = sessionStorage.getItem("quickMenuPosX");
            var savedPosY = sessionStorage.getItem("quickMenuPosY");
            var dragItem, touchObj, dragOnEle;
            var firstPosX, firstPosY;

            // sessionStorage.clear("quickMenuPosX");
            // sessionStorage.clear("quickMenuPosY");

            quickMenu.style.top = savedPosY + "px";
            quickMenu.style.left = savedPosX + "px";

            var startDragItem = function(e) {
                // console.log('mousedown', savedPosX);
                dragItem = this;

                if (dragItem.id === "quickBtn") {
                    dragOnEle = document.getElementById("quickBtn");
                } else {
                    dragOnEle = e.target;
                }

                if (PUBPLE.isTouchDevice) {
                    touchObj = e.touches[0];
                    posX = touchObj.clientX;
                    posY = touchObj.clientY;
                } else {
                    posX = e.clientX;
                    posY = e.clientY;
                }

                document.addEventListener(getEventType("move"), draggingItem);
                document.addEventListener(getEventType("up"), finishDragItem);
            }

            var draggingItem = function(e) {
                // console.log('draggingItem', );
                if (!firstPosX || !firstPosY) {
                    firstPosX = posX;
                    firstPosY = posY;
                }

                if (PUBPLE.isTouchDevice) {
                    touchObj = e.touches[0];
                    newPosX = posX - touchObj.clientX;
                    newPosY = posY - touchObj.clientY;
                    posX = touchObj.clientX;
                    posY = touchObj.clientY;
                } else {
                    newPosX = posX - e.clientX;
                    newPosY = posY - e.clientY;
                    posX = e.clientX;
                    posY = e.clientY;
                }

                if (Math.abs(posX - firstPosX) > 50 || Math.abs(posY - firstPosY) > 50) {
                    dragOnEle.classList.add("onDrag");
                }
                
                dragItem.style.top = (dragItem.offsetTop - newPosY) + "px";
                dragItem.style.left = (dragItem.offsetLeft - newPosX) + "px";
            }

            var finishDragItem = function(e) {
                // console.log('finishDragItem', );
                firstPosX = 0;
                firstPosY = 0;

                sessionStorage.setItem("quickMenuPosX", (quickMenu.offsetLeft - newPosX));
                sessionStorage.setItem("quickMenuPosY", (quickMenu.offsetTop - newPosY));
                
                document.removeEventListener(getEventType("move"), draggingItem);
                document.removeEventListener(getEventType("up"), finishDragItem);
            }

            for (i = 0; i < dragItemLen; i++) {
                dragItems[i].addEventListener(getEventType("down"), startDragItem);
            }
        },
        /**
         * 개별 정답 버튼에 마우스오버 시 문장에 호버 스타일 미적용
         * @memberOf PUBPLE.ui
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
         * @memberOf PUBPLE.ui
         */
        openExtraPopup: function() {
            var targetClass = location.href.split("?")[1];
            var targetEle = document.getElementsByClassName(targetClass)[0];

            if (targetEle) {
                targetEle.click();
            }
        }
    }
}());