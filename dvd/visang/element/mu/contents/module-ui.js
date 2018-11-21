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

    // 팝업 내 슬라이드 페이지 연결
    var slideNum;
    
    // 선긋기
    var storedLineObj = {};

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

                            prevPageEl.classList.remove("on");
                            prevDotEl.classList.remove("on");
                            targetPage.classList.add("on");
                            this.classList.add("on");

                            initBtnShow(prevPageEl);
                            resetDrawLine(prevPageEl);

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
                    var transBtn, korScripts, korScriptLen, j, mediaId, popMediaId, targetPopId, popCloseBtn;
                    var containerW, containerH, popupW, popupH;
                    var slideNum;
                    // var previousEleRect;

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
                    
                    // 플러스 버튼 팝업 위치 설정
                    if (btnClasses.contains("tip_plus")) {
                        // console.log('title', this.previousElementSibling.getBoundingClientRect().left);
                        // console.log('title', this.previousElementSibling.getBoundingClientRect().top);
                        // previousEleRect = this.previousElementSibling.getBoundingClientRect();
                        // popWrapEl.style.top = previousEleRect.top + "px";
                        // popWrapEl.style.left = previousEleRect.left + "px";

                        if (!btnClasses.contains("fullSize")) {
                            // console.log('top', this.parentElement.offsetTop);
                            // console.log('left', this.parentElement.offsetLeft);
                            // console.log('height', this.parentElement.offsetHeight);
                            // console.log('width', this.parentElement.offsetWidth);

                            popWrapEl.style.top = this.parentElement.offsetHeight + "px";
                            popWrapEl.style.left = this.parentElement.offsetLeft + "px";
                        }
                    // 영상 버튼 팝업 위치 설정
                    } else if (btnClasses.contains("btnYtb")) {
                        // 버튼이 하단에 위치하는 경우
                        if (popWrapEl.querySelector(".pop_youtube_arrow.down")) {
                            // console.log('youtube btn top', this.offsetTop);
                            // console.log('youtube btn left', this.offsetLeft);
                            // console.log('popup width', popWrapEl.clientWidth);
                            // console.log('popup height', popWrapEl.clientHeight);

                            popWrapEl.style.top = -popWrapEl.clientHeight + "px";

                            // 버튼이 우측에 위치하는 경우
                            if (this.parentElement.offsetLeft > window.innerWidth / 2) {
                                console.log('rigth bottom');
                                popWrapEl.style.left = -popWrapEl.clientWidth + this.clientWidth + "px";
                            }
                        } else {
                            popWrapEl.style.top = this.parentElement.clientHeight + "px";
                            // 버튼이 우측에 위치하는 경우
                            if (this.parentElement.offsetLeft > window.innerWidth / 2) {
                                console.log('rigth bottom');
                                popWrapEl.style.left = -popWrapEl.clientWidth + this.clientWidth + "px";
                            }
                        }
                        
                    }

                    // 스크립트 팝업 설정
                    if (btnClasses.contains("btnScript") || btnClasses.contains("btnSentence")) {
                        // 스크립트 해석 보기 초기화
                        transBtn = document.getElementsByClassName("btnTran")[0];
                        korScripts = popContainer.getElementsByClassName("tKor");
                        korScriptLen = korScripts.length;

                        for (j = 0; j < korScriptLen; j++) {
                            korScripts[j].classList.remove("on");
                        }

                        transBtn.classList.remove("on");

                    }
                });
            }

            for (j = 0; j < closeBtnLen; j++) {
                closeBtns[j].addEventListener("click", function () {
                    var popWrapEl = this.closest(".popWrap");
                    popWrapEl.classList.remove("show");
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
            var $scrollCont = $(".scrollContent");
            var axis = axis || "y";
            var i;
            
            if(!scrollContEls.length) {
                return;
            }

            // for (i = 0; i < scorllContLen; i++) {
            //     if (axis === "y") {
            //         scrollContEls[i].classList.add("scroll_vertical");
            //     } else {
            //         scrollContEls[i].classList.add("scroll_horizontal");
            //     }
            // }

            $scrollCont.mCustomScrollbar({
                axis: axis, // 스크롤 축
                scrollInertia: 0, // ms당 스크롤 애니메이션
                autoDraggerLength: false, // 스크롤바 사이즈 고정,
                autoExpandScrollbar: false, // 스크롤바에 커서가 올라가거나 드래그시 자동 확장 미사용
                // mouseWheel: {
                    // scrollAmount: 1000, // 휠 스크롤 양(default: auto)
                // },
                advanced: {
                    autoScrollOnFocus: false, // 포커스시 자동 스크롤
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
                    var downEle = document.createElement("a");
                    var downEle = util.createEl("a", this, "afterend");
                    
                    downEle.setAttribute("href", "./down/" + fileName);
                    downEle.setAttribute("target", "_blank");
                    downEle.setAttribute("download", fileName);
                    downEle.click();
                    downEle.parentNode.removeChild(downEle);
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
            var isTouchDevice = false;
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

            // 이벤트 타입 반환
            var getEventType = function(eventType) {
                var ret;

                try {
                    document.createEvent("TouchEvent");
                    isTouchDevice = true;
                } catch (e) {
                    isTouchDevice = false;
                }

                switch (eventType) {
                    case "down":
                        ret = isTouchDevice ? "touchstart" : "mousedown";
                        break;
                    case "move":
                        ret = isTouchDevice ? "touchmove" : "mousemove";
                        break;
                    case "up":
                        ret = isTouchDevice ? "touchend" : "mouseup";
                        break;
                    case "out":
                        ret = isTouchDevice ? "touchleave" : "mouseout";
                        break;
                    default:
                        ret = "err";
                        break;
                }
                return ret;
            }

            // 이벤트 좌표 값 구하기
            var getMousePoint = function(e) {
                var zoom = PUBPLE.zoomVal;
                var rect, touchObj;

                if (isTouchDevice) {
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
            var transBtn = document.getElementsByClassName("btnTran")[0];
            var btnAllShow = document.getElementsByClassName("btnTranShow")[0];
            var guideClass, korScripts, korScriptLen, tKor, isBind;

            var getEls = function(e) {
                var target = e.target;
                var targetId, scriptWrapEl, guide

                targetId = target.getAttribute("data-target");
                scriptWrapEl = document.getElementById(targetId);
                guide = scriptWrapEl.getElementsByClassName("guide_tran")[0];
                guideClass = guide.classList;
                korScripts = scriptWrapEl.getElementsByClassName("tKor");
                korScriptLen = korScripts.length;
            };

            if (!transBtn) {
                return;
            }
            
            // 문장별 해석보기 선택
            transBtn.addEventListener("click", function(e) {
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
                        btnAllShow.classList.remove("on");
                    }

                    tKor.classList.toggle("on");

                    // 문장 해석 선택
                    if (!isBind) {
                        tKor.addEventListener("click", function (e) {
                            guideClass.remove("show");
                            this.classList.toggle("active");
                        });
                    }
                }
                isBind = true;
            });

            // 예문 해석 보기 선택
            btnAllShow.addEventListener("click", function (e) {
                var btnClass = this.classList;
                var i = 0;
                var tKorClass;

                btnClass.toggle("on");

                getEls(e);

                // 문장별 해석보기 버튼 변경
                if (transBtn.classList.contains("on")) {
                    guideClass.remove("show");
                    transBtn.classList.remove("on");
                }

                for (; i < korScriptLen; i++) {

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
            var grammarBtns = document.getElementsByClassName("wordGrammarnBtn");
            var grammrBtnLen = grammarBtns.length;
            var wordEl, btnHtml,wordPopupHtml, wordBtnWrap, wordBtnH;
            var word, btnLeft, btnTop, wordInfo, id, subtitleId, mean, eg, translation, file, sync;
            var btns, btnLen, closeBtns, closeBtnLen;
            var i, j, k, l, m;
            var showWordPopup;
            var tEng, tEngLen, mpId, start, end;
            
            // 단어 팝업 버튼 및 팝업 요소 생성
            for (i = 0; i < wordLen; i++) {
                wordEl = words[i];
                word = wordEl.getAttribute("data-word");
                wordInfo = WORD[word];
                id = "S_" + word;
                subtitleId = "subtitle_S_" + word;
                mean = wordInfo.mean;
                eg = wordInfo.eg;
                translation = wordInfo.translation;
                file = wordInfo.file;

                btnHtml = "<div class='wordMean reading_layer wordBtnWrap'>" +
                    "<div class='wordMeanBtn' data-word='" + word + "'></div>" +
                    "</div>";

                wordPopupHtml = "<div class='wordPopWrap'>" +
                    "<div id='" + word + "' class='rl_content'>" +
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
                    "<div class='btn_mp_audio mp_audio'  id='" + id + "' media='" + file + "' compo='btnonly subtitle'></div>" +
                    "</div>" +
                    "</div>" +
                    "<button class='btnClose'></button>" +
                    "</div>" +
                    "</div >";

                scriptArea.insertAdjacentHTML("beforeend", btnHtml);
                innerWrap.insertAdjacentHTML("beforeend",wordPopupHtml);

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

                wordPopWrap.classList.toggle("show");
                wordPopup.style.top = contentH / 2 - wordPopup.clientHeight / 2 + "px";
                wordPopup.style.left = contentW / 2 - wordPopup.clientWidth / 2 + "px";

                // 팝업 외부 클릭시 닫기
                e.stopPropagation();
                document.addEventListener("click", function hideWordPop(e) {
                    if (!wordPopup.contains(e.target)) {
                        wordPopWrap.classList.remove("show");
                        document.removeEventListener("click", hideWordPop);
                    }
                });
            }

            for (j = 0; j < btnLen; j++) {
                btns[j].addEventListener("click", showWordPopup);
            }

            for (k = 0; k < closeBtnLen; k++) {
                closeBtns[k].addEventListener("click", function() {
                    var targetPop = this.closest(".wordPopWrap");

                    targetPop.classList.remove("show");
                });
            }

            //  문법 해설 팝업 이벤트 바인딩
            for (l = 0; l < grammrBtnLen; l++) {
                grammarBtns[l].addEventListener("click", showWordPopup);
            }


            // 미디어 플레이어 연결
            tEng = document.querySelectorAll(".wordPopWrap .tEng");
            tEngLen = tEng.length;

            for (m = 0; m < tEngLen; m++) {
                tEng[m].addEventListener("click", function() {
                    var parent = this.closest(".rl_content");
                    var word = parent.id;
                    var syncArr = WORD[word].sync;
                    var syncOrder = +this.classList.contains("word_s");

                    mpId = parent.getElementsByClassName("mp_audio")[0].id;

                    start = syncArr[syncOrder][0];
                    end = syncArr[syncOrder][1];

                    console.log('mpId:', mpId);
                    console.log('start', start);
                    console.log('end', end);
                    playMediaPlayer(mpId, start, end);
                });
            }
        },
        /**
         * html파일 로드 대본 삽입
         * @memberOf PUBPLE.ui
         */
        insertScript: function() {
            var $target = $(".loadScript");
            var url = $target.data("target");
            
            $(window).on("load", function () {
                $target.load(url, function (data) {
                // console.log("load success!!!");
                $target.html($(this).find(".scrollContent"));
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
            var previewBtn = document.getElementsByClassName("wordPreview")[0];
            var popId = previewBtn.getAttribute("data-popup");
            var popContainer = document.getElementById(popId);
        },
        /**
         * 유투브 새창 열기
         * @memberOf PUBPLE.ui
         */
        initYoutube: function() {
            var playBtns = document.getElementsByClassName("btnPlay");
            var btnPlayLen = playBtns.length;
            var i = 0;
            var src;

            for (; i < btnPlayLen; i++) {
                playBtns[i].addEventListener("click", function() {
                    src = this.getAttribute("data-src");
                    window.open(src, "youtube");
                })
            }
        }
    }
}());