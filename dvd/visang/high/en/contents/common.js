"use strict";

function initNav() {
    var util = PUBPLE.util;
    var isAndroid = util.detector.isAndroid();
    var isIOs = util.detector.isIos();
    var isMobile = isAndroid || isIOs ? true : false;
    var wrap = document.getElementById("wrap");
    var header = document.getElementById("header");
    var btnNav = document.getElementById("nav");
    var filename = location.href.split("/").slice(-1)[0].split(".")[0];
    var popupInfoArr = filename.split("_");
    var lessonNum = parseInt(popupInfoArr[0].substr(1), 10);
    var lessonIdx = lessonNum - 1;
    var pageNum = parseInt(popupInfoArr[1], 10);
    var info = CONTENTS_INFO;
    var infoPage = info.pages;
    var lessonLen = infoPage.length;
    var title = info.titles[lessonIdx];
    var pageInfo = infoPage[lessonIdx]; 
    var unitLen = pageInfo.length;
    var titleList = "";
    var mouseover = "mouseover";
    var topNavHtml, unitList, onLesson, onUnit;
    var unit, i, j;
    var bookmark, titleWrap, titleEl, btnGo, toGoPage, lessonLists, lessonList, unitLists, unitList, unitListLen;
    var btnWrite, btnList, btnHome;
    var btnPrevNext, quickMenu, quickBtn, quickShow;

    // 팝업 페이지 이동
    var movePopup = function(lesson, page, popNum) {
        var currentHref = location.href;
        var page = ("00" + page).slice(-3);
        var targetPopup = "m0" + lesson + "_" + page + "_" + popNum + ".html";
        var newHref;

        if (lesson !== lessonNum) {
            newHref = currentHref.replace(/m\d\d/g, "m0" + lesson);
            newHref = newHref.replace(newHref.split("/").slice(-1)[0], targetPopup);
        } else {
            newHref = targetPopup;
        }

        location.href = newHref;
    }

    // html 생성
    for (i = 0; i < unitLen; i++) {
        if ((pageNum >= pageInfo[i] && pageNum < pageInfo[i + 1]) || (pageNum >= pageInfo[i] && i === unitLen - 1)) {
            unit = info.units[lessonIdx][i];
        }
    }

    for (i = 0; i < lessonLen; i++) {
        unitList = "";

        for (j = 0; j < unitLen; j++) {
            // if (i === lessonIdx && unit === info.units[i][j]) {
            //     onUnit = "over"
            // } else {
            //     onUnit = "";
            // }
            
            unitList += '<p>' + info.units[i][j] + '</p>';
        }

        // if (i === lessonIdx) {
        //     onLesson = "over";
        // } else {
        //     onLesson = "";
        // }

        titleList += '<li>' +
            '<div class="unitnum">Lesson ' + Number(i + 1) + '</div>' +
            '<p>' + info.titles[i] +
            '</p>' +
            '<div class="unitlist">' +
            unitList +
            '</div>' +
            '</li>';
    }

    topNavHtml = '<div class="nav_book_maker"></div>' +
        '<div class="inner">' +
        '<div class="title">Lesson ' + lessonNum + '</div>' +
        '<div class="subtitle">' + title + '</div>' +
        '<div class="unit">' + unit + '</div>' +

        '<div id="subtitleShow" class="subtitle_open">' +
        '<ul class="subtitlelist">' +
        titleList +
        '</ul>' +
        '</div>' +
        '<div class="top_page_wrap">' +
        '<input class="top_page" maxlength="3" value = "' + pageNum + '" />' +
        '<div class="top_page_go" title="이동">이동</div>' +
        '</div>' +
        '</div>' +

        '<div class="top_btn_wrap">' +
        '<div class="navBtnWrite top_btn" title="판서">판서</div>' +
        '<div class="navBtnList top_btn" title="내 목록">내 목록</div>' +
        '<div class="navBtnHome top_btn" title="닫기">닫기</div>' +
        '</div>';

    btnPrevNext = '<div class="nav_prev" title="이전">이전</div>' +
        '<div class="nav_next" title="다음">다음</div>' +
        '<div class="alertMess alert_prev">Lesson의 첫 페이지입니다.</div>' +
        '<div class="alertMess alert_next">Lesson의 마지막 페이지입니다.</div></div >'


    if (isMobile) {
        quickMenu = '<div id="quickMenu" class="thema_android">' +
            '<div id="quickBtn" class="aside_quick_btn" title="Quick"></div>' +
            '<div id="quickShow" class="aside_quick_open">' +
            '<ul>' +
            '<li><div class="aside_quick_over"></div><div id="asideBtnWord" class="aside_btn ab_word" title="단어장">단어장</div></li>' +
            '<li><div class="aside_quick_over"></div><div id="asideBtnData" class="aside_btn ab_data" title="자료실">자료실</div></li>' +
            '<li>' +
            '<div class="aside_quick_over"></div>' +
            '<div id="asideBtnTool" class="aside_btn ab_tool" title="활동 도우미">' +
            '활동 도우미' +
            '<ul class="aside_sub">' +
            '<li id="" class="aside_sub_btn" title="비상 체조">비상 체조</li>' +
            '<li id="" class="aside_sub_btn" title="스톱 워치">스톱 워치</li>' +
            '<li id="" class="aside_sub_btn" title="타이머">타이머</li>' +
            '<li id="" class="aside_sub_btn" title="활동 시킴이">활동 시킴이</li>' +
            '<li id="" class="aside_sub_btn" title="주목">주목</li>' +
            '</ul>' +
            '</div>' +

            '</li>' +
            '<li><div class="aside_quick_over"></div><div id="asideBtnViva" class="aside_btn ab_viva" title="비바샘">비바샘</div></li>' +
            '</ul>' +
            '</div>' +
            '</div>';
    } else {
        quickMenu = '<div id="quickMenu">' +
            '<div id="quickBtn" class="aside_quick_btn" title="Quick"></div>' +
            '<div id="quickShow" class="aside_quick_open">' +
            '<ul>' +
            '<li><div class="aside_quick_over"></div><div id="asideBtnWord" class="aside_btn ab_word" title="단어장">단어장</div></li>' +
            '<li><div class="aside_quick_over"></div><div id="asideBtnData" class="aside_btn ab_data" title="자료실">자료실</div></li>' +
            '<li>' +
            '<div class="aside_quick_over"></div>' +
            '<div id="asideBtnTool" class="aside_btn ab_tool" title="활동 도우미">' +
            '활동 도우미' +
            '<ul class="aside_sub">' +
            '<li id="" class="aside_sub_btn" title="비상 체조">비상 체조</li>' +
            '<li id="" class="aside_sub_btn" title="스톱 워치">스톱 워치</li>' +
            '<li id="" class="aside_sub_btn" title="타이머">타이머</li>' +
            '<li id="" class="aside_sub_btn" title="활동 시킴이">활동 시킴이</li>' +
            '<li id="" class="aside_sub_btn" title="주목">주목</li>' +
            '</ul>' +
            '</div>' +

            '</li>' +
            '<li><div class="aside_quick_over"></div><div id="asideBtnViva" class="aside_btn ab_viva" title="비바샘">비바샘</div></li>' +
            '</ul>' +
            '</div>' +
            '</div>';
    }

    header.insertAdjacentHTML("afterbegin", topNavHtml);
    btnNav.insertAdjacentHTML("afterbegin", btnPrevNext);
    wrap.insertAdjacentHTML("afterbegin", quickMenu);

    // 팝업 이동 버튼, 사이드버튼 위치, 크기 설정
    var getVideoController = setInterval(function() {
        var videoContent = document.getElementsByClassName("video_content")[0];
        var standEle = document.getElementsByClassName("videoControls")[0];

        if (standEle) {
            changeBtnPos(standEle);
            clearInterval(getVideoController);
        } else if (!videoContent) {
            standEle = document.getElementsByClassName("btn_wrap")[0];
            changeBtnPos(standEle);
            clearInterval(getVideoController);
        }
    })

    // 이벤트 바인딩
    titleWrap = document.getElementById("subtitleShow");
    titleEl = document.getElementsByClassName("subtitle")[0];
    btnGo = document.getElementsByClassName("top_page_go")[0];
    toGoPage = document.getElementsByClassName("top_page")[0];
    lessonLists = document.querySelectorAll(".subtitlelist li");
    unitLists = document.querySelectorAll(".unitlist p");
    unitListLen = unitLists.length;

    // 책갈피
    bookmark = document.getElementsByClassName("nav_book_maker")[0];
    bookmark.addEventListener("click", function() {
        // this.classList.toggle("on");
        document.querySelector(".alertMessage").className = "alertMessage show n1";
    });

    // 단원 마우스오버 / 선택시
    titleEl.addEventListener("click", function() {
        titleWrap.classList.toggle("on");
        this.classList.toggle("on");
    });

    for (i = 0; i < lessonLen; i++) {
        lessonList = lessonLists[i];

        if (isMobile) {
            mouseover = "click";
        }

        lessonList.addEventListener(mouseover, function () {
            this.classList.add("over");
        });

        lessonList.addEventListener(util.getEventType("out"), function () {
            this.classList.remove("over");
        });

    
        lessonList.addEventListener("click", function (e) {
            var lesson = this.firstElementChild.textContent.split(" ")[1];
            var page = infoPage[lesson - 1][0];
            var popNum = "01";

            if (lesson > 1) {
                // alert("1단원에서만 이동이 가능합니다.");
                document.querySelector(".alertMessage").className = "alertMessage show n5";
                this.classList.remove("over");
                return;
            }

            if (!isMobile) {
                movePopup(lesson, page, popNum);
            }
        });
    }

    // 소단원 마우스오버 / 선택시
    for (i = 0; i < unitListLen; i++) {
        unitList = unitLists[i];

        unitList.addEventListener("mouseover", function() {
            this.classList.add("over");
        });

        unitList.addEventListener(util.getEventType("out"), function() {
            this.classList.remove("over");
        });

        unitList.addEventListener("click", function(e) {
            e.stopPropagation();

            var unit = this.textContent;
            var lesson = this.closest("li").querySelector(".unitnum").textContent.split(" ")[1];
            var lessonIdx = lesson - 1;
            var unitIdx = info.units[lessonIdx].indexOf(unit);
            var page = infoPage[lessonIdx][unitIdx];
            var popNum = "01";

            if (lesson > 1) {
                document.querySelector(".alertMessage").className = "alertMessage show n5";
                return;
            }
            
            movePopup(lesson, page, popNum);
        });
    }

    // 페이지 입력 후 go 선택시
    btnGo.addEventListener("click", function() {
        // 해당 이북 페이지의 첫 팝업으로 이동
        var page = +toGoPage.value;
        var popupNum = "01";
        var compareLen = unitLen - 1;
        var i, j, lesson;
        
        if (page > 29 && page !== 150 && page !== 151) {
            document.querySelector(".alertMessage").className = "alertMessage show n5";
            return;
        }

        for (i = 0; i < lessonLen; i++) {
            for (j = 0; j < compareLen; j++) {
                if (page >= infoPage[i][j] && page < infoPage[i][j + 1] || page === infoPage[i][compareLen] || page === infoPage[i][compareLen] + 1) {
                    lesson = i + 1;
                }
            }
        }

        movePopup(lesson, page, popupNum);
    });
    // 페이지 입력 후 엔터 입력시에도 이동
    toGoPage.addEventListener("keyup", function(e) {
        if (e.keyCode === 13) {
            btnGo.click();
        }
    })
    // 숫자만 입력
    toGoPage.addEventListener("keypress", function(e) {
        var keycode = e.keyCode;

        if (keycode < 47 || keycode > 57) {
            return false;
        }
    });
    toGoPage.addEventListener("keyup", function(e) {
        var inputVal = this.value;

        this.value = (inputVal.replace(/[^0-9]/g, ""));
    });

    btnWrite = document.getElementsByClassName("navBtnWrite")[0];
    btnList = document.getElementsByClassName("navBtnList")[0];
    btnHome = document.getElementsByClassName("navBtnHome")[0];

    // 판서
    btnWrite.addEventListener("click", function () {
        document.querySelector(".alertMessage").className = "alertMessage show n1";
    });
    // 임시 alert 닫기
    document.getElementsByClassName("alertMessage")[0].addEventListener("click", function () {
        this.classList.remove("show");
    });

    // 내목록
    btnList.addEventListener("click", function () {
        // parent.viewer.openProgress();
        document.querySelector(".alertMessage").className = "alertMessage show n1";
    });

    // 닫기
    btnHome.addEventListener("click", function () {
        parent.viewer.link("close", "");
        parent.viewer.gotoPage(pageNum);
    });


    // 이전 / 다음 버튼 선택시
    btnNav.addEventListener("click", function(e) {
        var btnClass = e.target.classList;
        var popups = info.popups;
        var popupArr = popups[lessonIdx];
        var popupLen = popupArr.length;
        var alertPrevClass = document.getElementsByClassName("alert_prev")[0].classList;
        var alertNextClass = document.getElementsByClassName("alert_next")[0].classList;
        var idx, nextPopInfo;

        for (i = 0; i < popupLen; i++) {
            idx = popupArr.indexOf(filename);
            break;
        }

        if (btnClass.contains("nav_prev")) {
            if (!idx) {
                // console.log("Lesson의 첫 페이지입니다.");
                alertPrevClass.add("show");
                setTimeout(function() {
                    alertPrevClass.remove("show");
                }, 1000);

                if (!lessonIdx) {
                    return;
                }

                nextPopInfo = popups[lessonIdx - 1][lessonLen - 1].split("_");
                movePopup(lessonNum - 1, nextPopInfo[1], nextPopInfo[2]);
            } else {
                location.href = popupArr[idx - 1] + ".html";
            }
        } else {
            if (idx === popupLen - 1) {
                // console.log("Lesson의 마지막 페이지입니다.");
                alertNextClass.add("show");
                setTimeout(function () {
                    alertNextClass.remove("show");
                }, 1000);
                if (lessonIdx === lessonLen - 1) {
                    return;
                }

                nextPopInfo = popups[lessonIdx + 1][0].split("_");
                // movePopup(lessonNum + 1, nextPopInfo[1], nextPopInfo[2]);
            } else {
                location.href = popupArr[idx + 1] + ".html";
            }
        }
    });

    // 퀵 메뉴
    quickBtn = document.getElementById("quickBtn");
    quickShow = document.getElementById("quickShow");

    quickBtn.addEventListener("click", function() {
        var quickShowClass = document.getElementById("quickShow").classList;
        var quickBtnClass = this.classList;

        // 드래그시 열지 않음
        if (quickBtnClass.contains("onDrag")) {
            quickBtnClass.remove("onDrag");
            return;
        }

        if (!quickShowClass.contains("show")) {
            quickShowClass.add("show");
        } else {
            quickShowClass.remove("show");
        }

        this.classList.toggle("on");
    });

    // 퀵 메뉴 - 본문 검색
    //document.getElementById("asideBtnSearch").addEventListener("click", function() {
    //    document.querySelector(".alertMessage").className = "alertMessage show n1";
    //});
    // 퀵 메뉴 - 자료 링크
    //document.getElementById("asideBtnLink").addEventListener("click", function() {
    //    document.querySelector(".alertMessage").className = "alertMessage show n1";
    //});
    // 퀵 메뉴 - 드래그 캡쳐
    //if (isMobile) {
    //   document.getElementById("asideBtnCapture").addEventListener("click", function () {
    //       document.querySelector(".alertMessage").className = "alertMessage show n1";
    //   });
    //}
    // 퀵 메뉴 - 텍스트 선택
    //document.getElementById("asideBtnText").addEventListener("click", function() {
    //    document.querySelector(".alertMessage").className = "alertMessage show n1";
    //});
    // 퀵 메뉴 - 인쇄
    //document.getElementById("asideBtnPrint").addEventListener("click", function() {
    //    alert("기능 연결 예정입니다");
    //});
    // 퀵 메뉴 - 단어장
    document.getElementById("asideBtnWord").addEventListener("click", function() {
        // if (typeof parent.viewer !== "undefined" && typeof parent.viewer.link !== "undefined") {
        //     parent.viewer.link("popup", "http://link.visang.com/?id=SpdI-tyVkeHKgIAwj-BKVSHncNa9OtsOiGXjGu8rrkc=");
        // } else {
            parent.viewer.openWordbook();
        // }
    });
    // 퀵 메뉴 - 활동 도우미
    if (isMobile) {
        document.getElementById("asideBtnTool").addEventListener("click", function () {
            this.getElementsByClassName("aside_sub")[0].classList.toggle("show");
        });
    }
    
    document.getElementsByClassName("aside_sub")[0].addEventListener("click", function(e) {
        var title = e.target.title;

        switch (title) {
            case "비상 체조":
                window.open("../common/popup/visang_gym/visang_gym.html", "gym");
                break;
            case "스톱 워치":
                window.open("../common/popup/StopWatch/StopWatch/StopWatch.html", "stopWatch");
                break;
            case "타이머":
                window.open("../common/popup/timer/Timer/Timer.html", "timer");
                break;
            case "활동 시킴이":
                window.open("../common/popup/selection/Activity/Activity.html", "activity");
                break;
            case "주목":
                window.open("../common/popup/Attention/Attention/Attention.html", "attention");
                break;
            default:
                break;
        }
    });
    // 퀵 메뉴 - 자료실
    document.getElementById("asideBtnData").addEventListener("click", function () {
        parent.viewer.openPDS();
    });
    // 퀵 메뉴 - 비바샘
    document.getElementById("asideBtnViva").addEventListener("click", function () {
        // window.open("http://www.vivasam.com/", "");
        // parent.viewer.link("open", "http://www.vivasam.com/");
        parent.viewer.openVivasam();
    });
    // 퀵 메뉴 - 도움말
    //document.getElementById("asideBtnHelp").addEventListener("click", function () {
    //    document.querySelector(".alertMessage").className = "alertMessage show n1";
    //});
}

// 팝업 이동, 사이드 버튼 위치 및 크기 재설정
function changeBtnPos(standEle, prevScale) {
    var btnNav = document.getElementById("nav");
    var btnNavPrev = btnNav.getElementsByClassName("nav_prev")[0];
    // var btnNavNext = btnNav.getElementsByClassName("nav_next")[0];
    var btnRSideWrap = document.getElementById("asideRight");
    // var btnsRSideBWrap = btnRSideWrap.getElementsByClassName("ar_wrap");
    // var btnsRSide = btnRSideWrap.getElementsByClassName("ar_btn");
    // var btnsRSideLen = btnsRSide.length;
    var scale = PUBPLE.ui.scaleValue;
    var prevScale = prevScale ? prevScale : 1;
    // var i = 0;
    var btnNavW, btnNavH, btnNavStyle, btnPrevBgPosX, btnPrevBgSizeW, btnNavTop;
    // var btnRSide, btnRSideBWrap, btnRSideW, btnRSideH, btnRSideBgPosY, btnRSideStyle;
    // var rSideTit, rSideTitH, rSideTitT, rSideTitR, rSideTitFs, rSideTitLH;
    
    // 스타일 초기화
    // btnNavPrev.style.width = "";
    // btnNavPrev.style.height = "";
    // btnNavNext.style.width ="";
    // btnNavNext.style.height = "";
    // btnNavPrev.style.backgroundPosition = "";
    // btnNavPrev.style.backgroundSize = "";
    // btnNavNext.style.backgroundSize = "";

    // btnRSideWrap.style.width = "";
    // for (i = 0; i < btnsRSideLen; i++) {
    //     btnRSide = btnsRSide[i];
    //     btnRSideBWrap = btnsRSideBWrap[i];
        // rSideTit = btnRSideBWrap.getElementsByTagName("p")[0];

        // btnRSideBWrap.style.width = "";
        // btnRSideBWrap.style.height = "";

        // btnRSide.style.width = "";
        // btnRSide.style.height = "";
        // btnRSide.style.backgroundPosition = "";
        // btnRSide.style.backgroundSize = "";

        // rSideTit.style.height = "30px";
        // rSideTit.style.top = "20px";
        // rSideTit.style.right = "50px";
        // rSideTit.style.fontSize = "20px";
        // rSideTit.style.lineHeight = "30px";
    // }
    
    // btnNavStyle = window.getComputedStyle(btnNavPrev);
    // btnPrevBgSizeW = parseInt(btnNavStyle.getPropertyValue("background-size").split(" ")[0])  * scale;
    if (standEle.classList.contains("btn_wrap")) {
        btnNavTop = 880 * scale;
    } else {
        btnNavTop = (header.clientHeight + standEle.offsetTop) * scale - btnNavPrev.clientHeight;
    }

    // if (btnPrevBgSizeW) {
    //     btnNavW = btnNavPrev.clientWidth  * scale;
    //     btnNavH = btnNavPrev.clientHeight  * scale;
    //     btnPrevBgPosX = parseInt(btnNavStyle.getPropertyValue("background-position").split(" ")[0])  * scale;

    //     btnNavPrev.style.width = btnNavW + "px";
    //     btnNavPrev.style.height = btnNavH + "px";
    //     btnNavNext.style.width = btnNavW + "px";
    //     btnNavNext.style.height = btnNavH + "px";
    //     btnNavPrev.style.backgroundPosition = btnPrevBgPosX + "px 0px";
    //     btnNavPrev.style.backgroundSize = btnPrevBgSizeW + "px auto";
    //     btnNavNext.style.backgroundSize = btnPrevBgSizeW + "px auto";

    //     btnRSideW = btnRSideWrap.clientWidth * scale;
    //     for (i = 0; i < btnsRSideLen; i++) {
    //         btnRSide = btnsRSide[i];
    //         btnRSideBWrap =btnsRSideBWrap[i];
    //         rSideTit = btnRSideBWrap.getElementsByTagName("p")[0];

    //         btnRSideStyle = window.getComputedStyle(btnRSide);
    //         btnRSideH = btnRSide.clientHeight * scale;
    //         btnRSideBgPosY = parseInt(btnRSideStyle.getPropertyValue("background-position").split(" ")[1])  * scale;
            
    //         rSideTitH = parseInt(rSideTit.style.height) * scale;
    //         rSideTitT = parseInt(rSideTit.style.top) * scale;
    //         rSideTitR = parseInt(rSideTit.style.right) * scale;
    //         rSideTitFs = parseInt(rSideTit.style.fontSize) * scale;
    //         rSideTitLH = parseInt(rSideTit.style.lineHeight) * scale;

    //         btnRSideBWrap.style.width = btnRSideW + "px";
    //         btnRSideBWrap.style.height = btnRSideH + "px";
    //         btnRSideWrap.style.width = btnRSideW + "px";
    //         btnRSide.style.width = btnRSideW + "px";
    //         btnRSide.style.height = btnRSideH + "px";
    //         btnRSide.style.backgroundPosition = "0px " + btnRSideBgPosY + "px";
    //         btnRSide.style.backgroundSize = 70 * scale + "px " + 700 * scale + "px";
            
    //         rSideTit.style.height = rSideTitH + "px";
    //         rSideTit.style.top = rSideTitT + "px";
    //         rSideTit.style.right = rSideTitR + "px";
    //         rSideTit.style.fontSize = rSideTitFs + "px";
    //         rSideTit.style.lineHeight = rSideTitLH + "px";
    //     }
    // }

    btnNav.style.top = btnNavTop + "px";
    btnRSideWrap.style.top = btnNavTop - btnRSideWrap.clientHeight + "px";
}

document.addEventListener("DOMContentLoaded", function () {
    var ui = PUBPLE.ui;
    var util = PUBPLE.util;
    var canHover, selectors;
    // var loadScript = document.querySelector(".loadScript");

    if (util.detector.isIos()) {
        document.documentElement.style.cursor = "pointer";
    }

    ui.setScale();
    initNav();
    ui.initLbPop();
    ui.initToast();
    ui.initDownload();
    ui.initLinkBtn();
    ui.initTransBtn();
    ui.initDraggableItem();
    ui.initScroll();
    ui.removeHover();
    ui.initPreviewWord();
    ui.initSlide();
    ui.playBtnSound();
    ui.openExtraPopup();
    
    // html 파일을 로드하는 경우 스크롤 나중에 init
    // if (!loadScript) {
    //     ui.initScroll();
    // } else {
    //     ui.insertScript();
    // }

    if (util.detector.isIe()) {
        ui.initWordPopup();
    } else {
        document.fonts.ready.then(function () {
            // console.log('All fonts in use by visible text have loaded.');
            // console.log('Roboto loaded? ' + document.fonts.check('1em Roboto'));
            ui.initWordPopup();
        });

        // document.fonts.onloadingdone = function (fontFaceSetEvent) {
        //     console.log("onloadingdone: " + fontFaceSetEvent.fontfaces.length + " font faces loaded");
            // ui.initWordPopup();
        // };
    }

    // 임시 얼럿
    // 확대
    document.getElementsByClassName("btnZoom")[0].addEventListener("click", function() {
        document.querySelector(".alertMessage").className = "alertMessage show n3";
    });
    // 그리기앤쓰기
    document.getElementsByClassName("btnDraw")[0].addEventListener("click", function () {
        document.querySelector(".alertMessage").className = "alertMessage show n4";
    });
    
    // canHover 클래스 추가
    canHover = !(matchMedia("(hover: none)").matches);
    selectors = [".reading_link_btn", ".btn_each_replay", "#quickMenu", "#asideRight", ".tEng", ".mp_text", ".al_btn"];

    if (canHover) {
        selectors.forEach(function(val) {
            var targetEls =document.querySelectorAll(val);
            var targetElLen = targetEls.length;
            var i = 0;

            for (; i < targetElLen; i++) {
                targetEls[i].classList.add("canHover");
            }
        });
    }
});

window.addEventListener("resize", function() {
    var standEle = document.getElementsByClassName("videoControls")[0];
    var prevScale = PUBPLE.ui.scaleValue;

    PUBPLE.ui.setScale();
    if (!standEle) {
        standEle = document.getElementsByClassName("btn_wrap")[0];
    }
    changeBtnPos(standEle, prevScale);
});