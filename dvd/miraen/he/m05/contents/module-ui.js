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

    // 선긋기
    var storedLineObj = {};

    // 자가 테스트
    var selfScoreArr = [];

    // btnShow 초기화
    var initBtnShow = function(el) {
        var hideBoxes = el.getElementsByClassName("hideTxtBox");
        var hideBoxLen = hideBoxes.length;
        var chkAnswerBtn = el.querySelector(".btn_wrap button");
        var blindTxt = el.getElementsByClassName("p_blind");
        var i = 0;

        var $quizItem = $(".checkItem");
        var $quizChar = $(".answer_check");
        var $btnReplay = $(".btn_replay");
        var $btnPop = $(".popUp");

        var $quizLi = $(".summary_quiz li");
        var $btnCheck = $quizLi.find($(".checkQuizChoice"));
        var $btnNext = $quizLi.find($(".btn_quiz_next"));
        var $btnPrev = $quizLi.find($(".btn_quiz_prev"));

        if (!hideBoxLen) {
            return;
        }

        for (; i < hideBoxLen; i++) {
            hideBoxes[i].classList.remove("blind");
        }
        $btnReplay.removeClass("show");

        if (chkAnswerBtn) {
            chkAnswerBtn.classList.remove("btnReplay");
        }

        if (blindTxt) {
            for (var i = 0; i < blindTxt.length; i++) {
                blindTxt[i].style.opacity = '0';
                blindTxt[i].classList.remove("show");
            }
        }

        if ($quizItem.length){
            $quizItem.removeClass("on");
            $quizItem.removeClass("answer");

            $btnCheck.removeClass("show on");
            
            if ($btnCheck.hasClass("btn_replay")){
                $btnCheck.addClass("btn_answer");
                $btnCheck.removeClass("btn_replay");
            }

            $btnNext.removeClass("show");
            $btnPrev.removeClass("show");

            $quizLi.removeClass("on");
            $quizLi.eq(0).addClass("on");
        }

        if ($quizChar.length){
            $quizChar.removeClass("answer wrong left");
            $quizChar.finish().animate();
            $quizChar.removeAttr("style");
        }
        
        if ($btnPop.length) $btnPop.css("z-index", "");
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
        scaleValue: {
            x:1,
            y:1 
        },
        /**
         * 화면 스케일
         * @memberOf PUBPLE.ui
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
            
            this.scaleValue.x = hRatio;
            this.scaleValue.y = vRatio;
            // PUBPLE.ui.scaleValue = ratio;

            setTransform(containerEl, hRatio, vRatio);
        },
        initNav: function() {
            var $header = $('#header');
            var botNav = document.getElementById('botNav');
            var currFile = location.href.split("/").slice(-1)[0];
            var fileInfoArr = currFile.split("_");
            var chapter = +fileInfoArr[0].substr(2);
            var page = +fileInfoArr[1];
            var listInfo = DATA.listInfo;
            var topNav = '';
            var sectionList = '';
            var i = 0;
            var j = 0;
            var unitArr = listInfo[chapter - 1].unit;
            var unitLen = unitArr.length;
            var $btnPage, $btnData, $btnHome;
            var unit, sectionArr, sectionLen, section, sectionTitle, sectionDesc, prevSecTitle, prevSecDesc, nextSecTitle, file, subfile;
            var currPopNum, currSectionNum, currSecTitle, currUnit, currDesc;
            var $navList, $helperList;
        
            var navList = '<div class="navList" style="display:none;">' +
                '<div class="nav_title_wrap">' +
                '<div class="nav_tit_icon"></div>' +
                '<h1 class="nav_tit_top">학습 목차<span class="icon_ex"></span></h1>' +
                '<div class="btnClose"></div>' +
                '</div>' +
                '<div class="navListCont">' +
                '<li class="list_big">';
        
            var helper = '<div class="helperList">' +
                '<div class="helper_wrap">' +
                '<ul class="helper_cont">' +
                '<li>그리기</li>' +
                '<li id="timer">타이머</li>' +
                '<li id="selection">활동 시킴이</li>' +
                '<li id="Attention">주목</li>' +
                '</ul>' +
                '</div>' +
                '</div >';
        
            // 상단 내비게이션 버튼 생성
            topNav += '<div class="nav_btn_wrap">' +
                '<div class="navBtnPage nav_btn" title="페이지">' +
                '<span class="navIcon btn_page"></span>' +
                '교과서 ' + page + '쪽 바로가기' +
                '</div>' +
                '<div class="navBtnHome nav_btn" title="홈">' +
                '<span class="navIcon btn_home"></span>' +
                '홈' +
                '</div>' +
                '</div>';
        
            $header.append(topNav);
        
            // 이북에서 열어 하단 내비게이션 생성하지 않는 팝업이 존재함
            if (!botNav) return;
        
            // 하단 내비게이션 생성
            for (; i < unitLen; i++) {
                unit = unitArr[i];
                // 현재 unit 찾기
        
                if ((page >= unit.page && i === unitLen - 1) || (page >= unit.page && page < unitArr[i + 1].page)) {
                    // console.log('unit title:', unit.title);
                    sectionArr = unit.section;
                    sectionLen = sectionArr.length;
                    
                    for (j = 0; j < sectionLen; j++) {
                        // 학습 목차(navList) 및 각 section 버튼(navCenterBtn) 생성
                        section = sectionArr[j];
                        sectionTitle = section.title;
                        nextSecTitle = j + 1 < sectionLen ? sectionArr[j + 1].title : '';
                        sectionDesc = section.desc;
                        file = section.file;
                        subfile = section.subfile;
        
                        // 현재 섹션에 대한 데이터 찾기
                        if (currFile === file) {
                            currPopNum = j + 1;
                            currSectionNum = j;
                            currSecTitle = unit.section[j].title;
                            currUnit = unit;
                            currDesc = unit.section[j].desc;
                        }
        
                        // 동일한 섹션에 들어가는지 확인
                        if (sectionTitle === prevSecTitle) {
                            navList += '<li data-page="' + file + '">' + sectionDesc + '</li>';

                            if (prevSecDesc !== sectionDesc) {
                                sectionList += '<li data-page="' + file + '">' + sectionDesc + '</li>';
                            }

                        } else {
                            navList += '<li><div class="list_title_wrap"><div class="list_icon"></div>' + sectionTitle + '</div>' +
                                '<li class="list_sub"><li data-page="' + file + '">' + sectionDesc + '</li>';
                            if (currFile === file) {
                                sectionList += '<li class="on" data-page="' + file + '">' + sectionTitle + '<ul class="list_sub"><li data-page="' + file + '">' + sectionDesc + '</li>';
                            } else {
                                sectionList += '<li data-page="' + file + '">' + sectionTitle + '<ul class="list_sub"><li data-page="' + file + '">' + sectionDesc + '</li>';
                            }
                        }
        
                        if (sectionTitle !== nextSecTitle) {
                            navList += '</ul></li>';
                            sectionList += '</ul></li>';
                        }
        
                        prevSecTitle = sectionTitle;
                        prevSecDesc = sectionDesc;
                    }
                }
            }
        
            var navHtml = '<div class="nav_list_wrap">' +
                '<div class="navIcon"></div>' +
                '<div class="navListTit">학습 목차</div>' +
                '</div>' +
        
                '<div class="nav_center_wrap">' +
                '<ul class="navCenterBtn">' +
                sectionList +
                '</ul>' +
                '<div class="navBtnData">자료실</div>' +
                '<div class="classHelper">학습 도우미</div>' +
                '</div>' +
        
                '<div class="nav_page_wrap">' +
                '<ul class="navPage">' +
                '<li class="nav_prev"></li>' +
                '<li class="nav_page">' + currPopNum + '/' + sectionLen + '</li>' +
                '<li class="nav_next"></li>' +
                '</ul>';
        
            navList += '</l>' +
                '</div>' +
                '</div>';
        
            document.getElementById('botNav').insertAdjacentHTML('beforeend', navHtml);

            $btnPage = $('.navBtnPage');
            $btnHome = $('.navBtnHome');
            $btnData = $('.navBtnData');
        
            // 상단 내비 버튼 이벤트 바인딩
            $btnPage.on('click', function () {
                parent.viewer.link('close', '');
                parent.viewer.gotoPage(page - 4);
            });
        
            $btnHome.on('click', function () {
                parent.viewer.link('close', 'main');
            });
        
            $btnData.on('click', function () {
                window.open("../common/popup/data/data.html", "data");
            });

            //해당 페이지 버튼 활성화
            $(".list_sub li").each(function() {
                var $this = $(this);
                var page = $this.data("page");
                var $intro = $(".navCenterBtn > li").eq(0);
                
                if (page === currFile){
                    $this.addClass("on");
                    $this.parents("li").addClass("on");
                    return false;
                } else if (currSecTitle === "도입") { // 1단원 생각 열기 탭 수정 전 임시 예외 처리
                    $intro.addClass("on");
                    $intro.find("li").each(function() {
                        if ($(this).text() === "생각 열기") {
                            $(this).addClass("on");
                        }
                    });
                }
            });
            
            // 학습 목차 삽입
            $('#wrap').append(navList);
        
            // 학습도우미 삽입
            $('.classHelper').append(helper);
        
            // 현재 센셕 표시
            $('.navCenterBtn').find('li').each(function () {
                var $currSectionEl = $(this);
                var currSection = $currSectionEl.text();
        
                if (currSection === currSecTitle) {
                    $currSectionEl.addClass('on');
                }
            });
            
            if (util.detectUa() === "chrome" || util.detectUa() === "ie"){
                //하단 내비게이션 마우스 오버
                $('.navCenterBtn').find('li').on("mouseover",function() {
                    var $list = $(this).find($(".list_sub"));
                    $list.addClass("show");

                    $list.on("mouseout", function() {
                        $(this).hide();
                    });
                });

                $('.navCenterBtn').find('li').on("mouseout",function() {
                    var $list = $(this).find($(".list_sub"));
                    $list.removeClass("show");
                });
            }
        
            // 이전/다음 버튼 visible 처리
            if (!currSectionNum) {
                $('.nav_prev').css('visibility', 'hidden');
            } else if (currSectionNum === sectionLen - 1) {
                $('.nav_next').css('visibility', 'hidden');
            } else {
                $('.nav_prev').css('visibility', 'visible');
                $('.nav_next').css('visibility', 'visible');
            }
        
            // 학습 목차 선택시
            $navList = $('.navList');
            $('.nav_list_wrap').on('click', function () {
                //$navList.toggle();
				alert('정식 서비스에서 제공됩니다.');
            });
            $('#chapterInfo').on('click', function () {
               alert('정식 서비스에서 제공됩니다.');
            });
        
            // 학습 목차 섹션 선택시
            $('.list_sub').find('li').on('click', function () {
                var page = $(this).data('page');
                location.href = page;
            });
        
            // 학습 목차 닫기
            $navList.find('.btnClose').on('click', function () {
                $navList.hide();
            });
        
            // 각 섹션 선택시
            $('.navCenterBtn').find('li').on('click', function (e) {
                var page = $(e.target).data('page');
                location.href = page;
            });
        
            // 수업도우미 선택시
            $helperList = $('.helperList');
            $helperList.on('click', function (e) {
                var $target = $(e.target);
                var helperName = $target.text();
        
                if (!$target.hasClass('btnClose')) {
                    switch (helperName) {
                        case "그리기":
                            parent.viewer.openDrawer();
                            break;
                        case "타이머":
                            window.open("../common/popup/timer/Timer/Timer.html", "timer");
                            break;
                        case "스톱 워치":
                            window.open("../common/popup/StopWatch/StopWatch/StopWatch.html", "stopWatch");
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
                } else {
                    $helperList.hide();
                }
            });
        
            // 이전/다음 팝업 버튼 선택시
            $('.navPage').on('click', function (e) {
                // console.log('currSectionNum', currSectionNum);
                var $btnTarget = $(e.target);
        
                if ($(e.target).hasClass('nav_prev')) {
                    if (currSectionNum !== 0) {
                        location.href = currUnit.section[currSectionNum - 1].file;
                    } else {
                        return;
                    }
                } else if ($(e.target).hasClass('nav_next')) {
                    if (currSectionNum !== sectionLen - 1) {
                        location.href = currUnit.section[currSectionNum + 1].file;
                    } else {
                        return;
                    }
                }
            });
        },
        /**
         * 텍스트/이미지를 가리고 있는 영역 토글
         * @memberOf PUBPLE.ui
         */
        clickBtnShow: function() {
            var btnEls = document.getElementsByClassName("btnShow");
            var btnLen = btnEls.length;
            var $answerBtn = $(".btn_answer");
            var answerBtnLen = $answerBtn.length;
            var $againBtn = $(".btn_replay");
            var againBtnLen = $againBtn.length;
            var $pBlind = $(".p_blind");
            var pBlindLen = $pBlind.length;
            var $checkCont = $(".checkContent");
            var checkContLen = $checkCont.length;
            var $btnEx = $(".btn_ex");
            var btnExLen = $btnEx.length;
            var $btnPop = $(".btn_pop");
            var btnPopLen = $btnPop.length;
            var i;
            var btn, pBox;

            for (i = 0; i < btnLen; i++) {
                btn = btnEls[i];
                util.createEl("span", btn, "afterend", "hideTxtBox");

                btn.addEventListener("click", function() {
                    var hideTxtBox = $(this).next();
                    var $hideTxtBox = $(".hideTxtBox");

                    hideTxtBox.toggleClass("blind");

                    $hideTxtBox.each(function(i) {
                        var $boxEl = $($hideTxtBox[i]);
                        
                        if ($boxEl.hasClass("blind")) {
                            $againBtn.addClass("show"); 
                            return false;
                        }
                    });
                    
                    if (!$(".hideTxtBox.blind").length) {
                        $againBtn.removeClass("show");
                    }
                    
                    if (pBlindLen) {
                        pBox = $(this).prev(".p_blind");
                        
                        if (pBox.hasClass("show")) {
                            pBox.removeClass("show");
                            pBox.css("opacity", 0);
                        } else {
                            pBox.addClass("show");
                            pBox.css("opacity", 1);
                        }
                    }
                    
                    if (btnPopLen) {
                        if (hideTxtBox.hasClass("blind")) $btnPop.css("z-index", 15);
                        else $btnPop.css("z-index", "");
                    }
                });
            }

            // 정답 확인 버튼 있는 경우
            if (answerBtnLen) {
                $answerBtn.on("click", function() {
                    var $this = $(this);

                    if ($this.hasClass("btn_answer")){
                        $this.addClass("btn_replay");
                        $this.removeClass("btn_answer");
                    } else {
                        $this.addClass("btn_answer");
                        $this.removeClass("btn_replay");
                    }
                });
            }

            //다시 풀기 버튼 있는 경우
            if (againBtnLen) {
                $againBtn.on("click", function() {
                    var $hideTxtBox = $(".hideTxtBox");

                    $(this).removeClass("show");
                    $hideTxtBox.removeClass("blind");
                    $pBlind.removeClass("show");
                    $pBlind.css("opacity", 0);
                    $checkCont.find("input").prop("checked",false);
                    // 텍스트영역 초기화
                    $(".inputTxt").val("");
                    
                    $(".btn_pop").css("z-index", 0);
                    $(".word.on").removeClass("on");
                    $(".marking").removeClass("show");
                });
            }

            if (checkContLen) {
                var $checkBox = $checkCont.find("input");
                var $btnRe = $checkCont.parent().next().find(".btn_replay");

                if ($checkCont.parents(".scrollContent").length) {
                    $btnRe = $checkCont.parents(".scrollContent").next().find(".btn_replay");
                }
                
                $checkBox.change(function() {
                    if ($checkBox.is(":checked")) $btnRe.addClass("show");
                    else $btnRe.removeClass("show");
                })
            }

            if (btnExLen) {
                $btnEx.on("click", function() {
                    var $btnExCon = $(this).next();

                    if ($btnExCon.hasClass("show")) $btnExCon.removeClass("show");
                    else $btnExCon.addClass("show");
                });
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

            for (; i < slideContentsLen; i++) {
                slideContEl = slideContents[i];
                slideDetailEl = slideContEl.getElementsByClassName("slideDetail")[0];
                detailLists = slideDetailEl.querySelectorAll(".slideDetail > li");
                detailListLen = detailLists.length;

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
                            var selIdx = Number(this.getAttribute("data-pIdx"));
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
                    slideDottedEl.style.left = (slideContEl.clientWidth - slideDottedEl.clientWidth) / 2 + "px";
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
                        $(".p_blind").css("opacity", 0);
                        
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
                    $(".marking").removeClass("show");
                    $(".word.on").removeClass("on");
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

            if (!tabLen) {
                return;
            } else {
                tabs[activeIdx].classList.add("on");
                tabDetails[activeIdx].classList.add("on");

                var initChar = function() {
                    var quizchar = $(".answer_check");
                }
                for (; i < tabLen; i++) {
                    tabs[i].addEventListener("click", function(e) {
                        var target = e.target;
                        var targetParent = target.parentElement;
                        
                        if (!targetParent.classList.contains("tabMenu")) target = target.parentElement;

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
                    var popupShow = document.querySelector(".popWrap.show");
                    
                    if (popupShow && !this.closest(".popWrap")) {
                        popupShow.classList.remove("show");
                    }

                    popWrapEl.classList.add("show");
                });

                for (j = 0; j < closeBtnLen; j++) {
                    closeBtns[j].addEventListener("click", function () {
                        var popWrapEl = this.closest(".popWrap");

                        initBtnShow(popWrapEl);
                        popWrapEl.classList.remove("show");

                        resetAllMediaPlayer();
                    });
                }
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
            var $btnToast = $(".btnToastUp");
            var $btnReplay = $(".btnToastRe");
            var hideToast;

            var $classHelper = $(".classHelper");
            var $helperList = $(".helperList");
            var hideHelper;

            $classHelper.on("click", function(e) {
                var $this = $(this);

                if ($(e.target).hasClass('classHelper')) {
                    if (!$this.hasClass("on")) {
                        $this.addClass("on");
                        $helperList.addClass("show");
                    } else {
                        $this.removeClass("on");
                        $helperList.removeClass("show");
                    }

                    hideHelper = function(e) {
                        var target = $(e.target);
                        
                        if (!target.hasClass("classHelper on")){
                            $helperList.removeClass("show");
                            $this.removeClass("on");
                        }
                    }
                    $(document).off("click.helperOutside").on("click.helperOutside", hideHelper);
                }
            });

            $btnToast.on("click", function(e) {
            // $(document).on("click", ".btnToastUp", function(e) {
                var $this = $(this);
                var $toast = $this.next();
                var $onToast = $(".toastPopup.show");

                // e.stopPropagation();

                if ($toast[0] === $onToast[0]) {
                    $onToast.removeClass("show");
                    $(document).off("click.toastOutside");
                    $this.removeClass("toastOn");
                    return;
                } else {
                    $onToast.removeClass("show");
                    $toast.addClass("show");
                }

                // 토스트 외부 영역 클릭 시 닫기
                hideToast = function (e) {
                    var target = e.target;
                    var $onToast = $(".toastPopup.show");
                    
                    if ($onToast[0] && !$.contains($onToast[0], target) && !$(target).hasClass("btnToastUp") && $onToast[0] !== target) {
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

                var timeFormat = ((minute < 10) ? "0" + minute : minute)
                    + ":" + ((second < 10) ? "0" + second : second)
                    + ":" + ((millisecond < 10) ? "0" + millisecond : millisecond);

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
            var drawsets = document.getElementsByClassName("canvasArea");
            var setLen = drawsets.length;
            var isTouchDevice = false;
            var isManyToMany = false;
            var isOneToMany = false;
            var isAnswerShow = false;
            var startPObj = {};
            var endPObj = {};
            var i, drawSetEl, canvas, slideDetail, popWrap, ctx, canvasId;
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
                    this.classList.remove("btnReplay");
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
                        context.strokeStyle = "#f97f1e";
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
                popWrap = drawSetEl.closest(".popWrap");

                if (slideDetail) {
                    slideDetail.classList.add("show");
                    slideDetail.style.visibility = "hidden";
                }

                if (popWrap) {
                    popWrap.classList.add("show");
                    popWrap.style.visibility = "hidden";
                }

                canvas.width = drawSetEl.clientWidth;
                canvas.height = drawSetEl.clientHeight;

                ctx = canvas.getContext("2d");
                canvasId = "canvas" + i;
                canvas.setAttribute("id", canvasId);
                storedLineObj[canvasId] = [];

                // 선 스타일
                canvas.style.zIndex = 10;
                ctx.strokeStyle = "#f97f1e";
                ctx.lineWidth = 15;

                // 시작점 속성을 갖는 객체 생성
                startPoints = drawSetEl.getElementsByClassName("lineStart");
                startPLen = startPoints.length;
                startPObj[canvasId] = {};

                for (j = 0; j < startPLen; j++) {
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

                for (k = 0; k < endPLen; k++) {
                    endPObj[canvasId][k] = {};
                    endPObj[canvasId][k].width = endPonits[k].clientWidth;
                    endPObj[canvasId][k].height = endPonits[k].clientHeight;
                    endPObj[canvasId][k].top = endPonits[k].offsetTop;
                    endPObj[canvasId][k].left = endPonits[k].offsetLeft;
                    endPObj[canvasId][k].bottom = endPObj[canvasId][k].top + endPonits[k].clientHeight;
                    endPObj[canvasId][k].right = endPObj[canvasId][k].left + endPonits[k].clientWidth;
                    endPObj[canvasId][k].num = endPonits[k].getAttribute("data-num");
                }

                if (slideDetail) {
                    slideDetail.style.visibility = "";
                    slideDetail.classList.remove("show");
                }
                
                if (popWrap) {
                    popWrap.classList.remove("show");
                    popWrap.style.visibility = "";
                }
                // 이벤트 등록
                canvas.addEventListener(getEventType("down"), clickCanvas);
                
                util.getEl("qs", ".checkQuizLine").addEventListener("click", checkAnswer);
                //util.getEl("qs", ".resetDrawLine").addEventListener("click", resetDrawLine);
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

            for (; i < chkBtnLen; i++) {
                chkBtns[i].addEventListener("click", function () {
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

                for (i = 0; i < showBtnLen; i++) {
                    eachBtn = showMeanBtns[i];
                    korWordEl = eachBtn.parentElement.nextElementSibling;
                    
                    if (action === "add") {
                        korWordEl.classList.add("on");
                        eachBtn.classList.add("on");
                    } else {
                        korWordEl.classList.remove("on");
                        eachBtn.classList.remove("on");
                    }
                }
            }

            for (i = 0; i < showBtnLen; i++) {
                var eachBtn = showMeanBtns[i];
                
                eachBtn.addEventListener("click", function() {
                    var korWordEl = this.parentElement.nextElementSibling;
                    var j = 0;
                    var hasOn = true;

                    this.classList.toggle("on");
                    korWordEl.classList.toggle("on");

                    if (!allShowClasses.contains("on")) {
                        for (; j < showBtnLen; j++) {
                            if (!showMeanBtns[j].classList.contains("on")) {
                                hasOn = false;
                            }
                        }
                        if (hasOn) {
                            allShowClasses.add("on");
                        }
                    } else {
                        allShowClasses.remove("on");
                    }
                });
            }

            allShowBtn.addEventListener("click", function() {
                var btnClasses = this.classList;
                
                if (!btnClasses.contains("on")) {
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

            if (!transBtn) {
                return;
            }
            
            transBtn.addEventListener("click", function() {
                var targetId = this.getAttribute("data-target");
                var scriptWrapEl = document.getElementById(targetId);
                var korScripts = scriptWrapEl.getElementsByClassName("tKor");
                var korScriptLen = korScripts.length;
                var i = 0

                for (; i < korScriptLen; i++) {
                    korScripts[i].classList.toggle("on");

                }

                this.classList.toggle("on");
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
            var wordEl, btnHtml, wordPopupHtml, wordBtnWrap, wordBtnH;
            var word, btnLeft, btnTop, wordInfo, mean, eg, translation, file, sync;
            var btns, btnLen, closeBtns, closeBtnLen;
            var i, j, k, l;
            var showWordPopup;
            
            // 단어 팝업 버튼 및 팝업 요소 생성
            for (i = 0; i < wordLen; i++) {
                wordEl = words[i];
                word = wordEl.getAttribute("data-word");
                wordInfo = WORD[word];
                mean = wordInfo.mean;
                eg = wordInfo.eg;
                translation = wordInfo.translation;
                file = wordInfo.file;

                btnHtml = "<div class='wordMean reading_layer wordBtnWrap'>" +
                    "<div class='wordMeanBtn' data-word='" + word + "'></div>" +
                    "</div>";

                wordPopupHtml = "<div class='wordPopWrap'>" +
                    "<div id='" + word + "' class='rl_content'>" +
                    "<div class='inner'>" +
                    "<div class='word_t caption'>" +
                    "<div class='word_s tEng'>" + word + "</div>" +
                    "<div class='word_n'>" + mean + "</div>" +
                    "</div>" +
                    "<div class='word_d caption'>" +
                    "<div class='tEng'>" + eg + "</div>" +
                    "<div class='tKor active'>" + translation + "</div>" +
                    "</div>" +
                    "<div class='inner_mp3_wrap'>" +
                    "<div class='btn_mp_audio' media='" + file + "' compo='audio'></div>" +
                    "</div>" +
                    "</div>" +
                    "<button class='btnClose'></button>" +
                    "</div>" +
                    "</div >";

                scriptArea.insertAdjacentHTML("beforeend", btnHtml);
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
         * 애니메이션 추가
         * @memberOf PUBPLE.ui
         * * @param {string}
         */
        initAni: function(type) {
            
        },
        // 클릭 효과음
        setBtnAudio: function (url) {
            var btnArr = document.getElementsByTagName('button');
            var btnLen = btnArr.length;
            var audioEle = document.createElement('audio');
            var soundUrl = url || "../../contents/common/media/click.mp3";
            var playSound;
            audioEle.setAttribute('class', 'btnClick');
            audioEle.setAttribute('src', soundUrl);
            audioEle.setAttribute('type', 'audio/mpeg');

            var $btnAnswer = $(".btn_answer");

            playSound = function () {
                var clickAudio = document.getElementsByClassName('btnClick')[0];
                if (!clickAudio.ended) {
                    clickAudio.currentTime = 0;
                }
                clickAudio.play();
            }

            document.getElementById('wrap').appendChild(audioEle);
            for (var i = 0; i < btnLen; i++) {
                if (btnArr[i].getAttribute("id") == "learnIdxBtn") continue;
                btnArr[i].addEventListener('click', playSound, false);
            }

            $(".content").find(".popUp, .tabMenu li, .btnPrev, .btnNext, .btn_replay, .btn_example").each(function () {
                $(this).click(function () {
                    if ($(this).hasClass('off')) return;
                    playSound();
                });
            });
            
            $(".btn_ex").on("click", function() {
                playSound();
            });

            if ($btnAnswer.length){
                var soundUrl = [url  || "../../contents/common/media/feed_ok.mp3", url || "../../contents/common/media/feed_no.mp3"];
                var btnName = ['feedOk', 'feedNo'];

                for (var i = 0; i < soundUrl.length; i++){
                    var audioEle = document.createElement('audio');

                    audioEle.setAttribute('class', btnName[i]);
                    audioEle.setAttribute('src', soundUrl[i]);
                    audioEle.setAttribute('type', 'audio/mpeg');

                    $(".container").append(audioEle);
                }

                $(".checkItem").on("click", function() {
                    playSound();
                });


            }
        },
        /**
         * 다시 하기 버튼 노출
         * @memberOf PUBPLE.ui
         */
        showBtnReplay: function() {
            $(".inputTxt").keyup(function () {
                var $this = $(this);
                var $btnRe = $this.parents(".tabDetail").find(".btn_replay");

                if ($this.val()) {
                    $btnRe.addClass("show");
                } else {
                    $btnRe.removeClass("show");
                }
            });
        },
        /**
         * 드래그앤드랍
         * @memberOf PUBPLE.ui
         */
        initDraggable: function() {
            var self = this;
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

            // sessionStorage.clear("dragItemPosX");
            // sessionStorage.clear("dragItemPosY");

            if (isSavePos) {
                savedPosX = sessionStorage.getItem("dragItemPosX");
                savedPosY = sessionStorage.getItem("dragItemPosY");
                dragItem.style.top = savedPosY + "px";
                dragItem.style.left = savedPosX + "px";
            }

            var startDragItem = function (e) {
                // console.log('mousedown', savedPosX);
                var parentEle = this.parentElement;
                var assessmentItem = this.closest(".quizType");
                var dropBoxes = assessmentItem.querySelectorAll(".drop_container .dropBox");
                var dropBoxLen = dropBoxes.length;
                var i/* , j, ansBoxes, ansBoxLen */;

                e.preventDefault();

                // .dragBox가 .disabled를 갖고 있으면 동작X
                if (this.classList.contains("disabled")) return;

                // dragBox, dropBox z-index 처리
                this.style.zIndex = 10;
                for (i = 0; i < dropBoxLen; i++) {
                    dropBoxes[i].style.zIndex = 0;
                    // ansBoxes = dropBoxes[i].querySelectorAll(".ansBox");
                    // ansBoxLen = ansBoxes.length;
                    // for (j = 0; j < ansBoxLen; j++) {
                    //     ansBoxes[j].style.zIndex = 0;
                    // }
                }

                this.setAttribute("data-top", this.offsetTop);
                this.setAttribute("data-left", this.offsetLeft);
                dragItem = this;
                leftGap = 0;
                topGap = 0;

                // console.log('scaleX: ' + scaleX + ', scaleY' + scaleY );
                // 좌표 가져오기
                if (util.isTouchDevice) {
                    touchObj = e.touches[0];
                    posX = touchObj.clientX / self.scaleValue.x;
                    posY = touchObj.clientY / self.scaleValue.y;
                } else {
                    posX = e.clientX / self.scaleValue.x;
                    posY = e.clientY / self.scaleValue.y;
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

                document.addEventListener(util.getEventType("move"), moveDragItem);
                document.addEventListener(util.getEventType("up"), finishDragItem);
            }

            var moveDragItem = function (e) {
                // console.log('moveDragItem', );

                if (util.isTouchDevice) {
                    touchObj = e.touches[0];
                    newPosX = posX - touchObj.clientX / self.scaleValue.x;
                    newPosY = posY - touchObj.clientY / self.scaleValue.y;
                    posX = touchObj.clientX / self.scaleValue.x;
                    posY = touchObj.clientY / self.scaleValue.y;
                } else {
                    newPosX = posX - e.clientX / self.scaleValue.x;
                    newPosY = posY - e.clientY / self.scaleValue.y;
                    posX = e.clientX / self.scaleValue.x;
                    posY = e.clientY / self.scaleValue.y;
                }
                // console.log('posX', posX, 'posY', posY);
                // console.log('newPosX', newPosX, 'newPosY', newPosY);
                // console.log('offsetTop', dragItem.offsetTop, 'offsetLeft', dragItem.offsetLeft);
                dragItem.style.top = (dragItem.offsetTop - newPosY) + "px";
                dragItem.style.left = (dragItem.offsetLeft - newPosX) + "px";
            }

            var finishDragItem = function (e) {
                // console.log('finishDragItem', e);
                var changedX, changedY;
                if (util.isTouchDevice) {
                    touchObj = e.changedTouches[0];
                    changedX = touchObj.clientX / self.scaleValue.x;
                    changedY = touchObj.clientY / self.scaleValue.y;
                } else {
                    changedX = e.clientX;
                    changedY = e.clientY;
                }

                var assessmentItem = dragItem.closest(".quizType");
                var dropBoxes = assessmentItem.querySelectorAll(".drop_container .dropBox");
                var dropBoxLen = dropBoxes.length;
                var isSound = assessmentItem.getAttribute("data-sound");
                var isAskTest = assessmentItem.closest(".askQuizContent:not(.my_goal)");
                var isNoLimit = assessmentItem.getAttribute("data-nolimit");
                isNoAns = assessmentItem.getAttribute("data-noans");
                isCheck = assessmentItem.getAttribute("data-check");
                
                for (i = 0; i < dropBoxLen; i++) {
                    // if (dropBoxes[i].getAttribute('data-drag') && !isNoAns) continue;
                    dropBoxes[i].style.zIndex = 11;
                }
                var target = document.elementFromPoint(changedX, changedY);
                // console.log('target', target);
                for (i = 0; i < dropBoxLen; i++) {
                    if (!dropBoxes[i].classList.contains("highest")) {
                        dropBoxes[i].style.zIndex = "auto";
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
                var otherMsgs = assessmentItem.querySelector(".answer_container .ansMsg");
                var dragBoxes = assessmentItem.querySelectorAll(".drag_container .dragBox");
                var blindDragItem = assessmentItem.querySelector(".dragBox.blind");
                var isCorrect = false;
                var i = 0, j = 0, k = 0, count = 0;
                var efCheck = false;
                var dragItemId, dropBox, ansMsg, showMsg, cloneDropBox;
                //var dragBoxImg, dropBoxImg;
                var dragIdx, dragBox, dragBoxNum;
                var ansArr, ansArrLen;
                //var ansMsgTxt, ansMsgid, dragItemMd;

                // 현재 드래그한 요소 원래 자리로
                var initDragItemPos = function () {
                    dragItem.style.top = dragItem.getAttribute("data-top") + "px";
                    dragItem.style.left = dragItem.getAttribute("data-left") + "px";
                }

                for (; j < ansArrsLen; j++) {
                    if (ansArrs[j].classList.contains("essayAnswer")) continue;

                    ansArr = ansArrs[j].innerText.split("\/\/");
                    ansArrLen = ansArr.length;
                }

                if (isNoAns) { // 정답이 없는 경우
                    if (target.classList.contains("dropBox") || target.closest(".dropBox") || isNoLimit) {
                        target.setAttribute("data-drag", dragNum);
                        dragItem.setAttribute("data-drop", dropNum);

                        if (isSound) {
                            // playFeedSound(true);
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

                        } else { // dropBox가 여러개인 경우
                            if (!isNoLimit) {
                                for(; k < dragBoxes.length; k++){
                                    dragBox = dragBoxes[k];
                                    dragBoxNum = dragBox.getAttribute("data-drop");

                                    if (dragBoxNum) {
                                        if (dragBoxNum === dropNum) {
                                            count++;
                                            if (count > 5) {
                                                dragItem.setAttribute("data-drop", "");
                                                initDragItemPos();
                                            }
                                        }
                                    }
                                }
                            } else {
                                if (target.classList.contains("dropBox")) {
                                    target.querySelector(".ansMsg").classList.add("show");
                                    dragItem.classList.add("blind");
                                }
                            }
                            btnReplay.classList.add("show");
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
                                target.appendChild(cloneDropBox);
                            }

                            dragItem.classList.add("blind");
                            if (isAskTest) btnCheck.classList.add("ready");
                        } else {
                            initDragItemPos();
                        }
                    } else { // 드래그시 정오답 확인하는 경우
                        if (dropNum === ansArr[dragNum - 1]) {
                            isCorrect = true;
                            target.setAttribute("iscorrect", true);
                        }

                        if (!target.classList.contains("dropBox") || !isCorrect) {
                            efCheck = false;
                            initDragItemPos();
                        } else {
                            efCheck = true;
                            dragItem.classList.add("blind");

                            if (target.firstChild) {
                                ansMsg = target.firstElementChild;
                                ansMsg.classList.add("show");
                                // console.log(ansMsg.querySelector(".ansBox[data-box='" + dragNum + "']"))
                                ansMsg.querySelector(".ansBox[data-box='" + dragNum + "']").classList.add("show");
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
                                if (otherMsgs) otherMsgs.classList.add("show");
                            }

                            target.setAttribute("data-drag", dragNum);
                            dragItem.setAttribute("data-drop", dropNum);

                        }
                        self.playAudioEffect(efCheck);
                    }
                }
                //
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

                document.removeEventListener(util.getEventType("move"), moveDragItem);
                document.removeEventListener(util.getEventType("up"), finishDragItem);
            }

            for (i = 0; i < dragItemLen; i++) {
                dragItems[i].addEventListener(util.getEventType("down"), startDragItem);
            }

            // 정답 보기
            for (i = 0; i < btnCheckLen; i++) {
                btnChecks[i].addEventListener("click", function () {
                    var qid = this.getAttribute("data-target");
                    var quizMarking = this.closest(".quizMarking");
                    var assessmentItem = document.querySelector("[data-qid='" + qid + "']");
                    var dragBoxes = assessmentItem.querySelectorAll(".drag_container .dragBox");
                    var dropBoxes = assessmentItem.querySelectorAll(".drop_container .dropBox");
                    var dropBoxesLen = dropBoxes.length;
                    var isCheck = assessmentItem.getAttribute("data-check");
                    var multi = assessmentItem.getAttribute("data-question-multi");
                    var quizCheck = assessmentItem.querySelector(".quizCheck");
                    var isAskTest = assessmentItem.closest(".askQuizContent:not(.my_goal)");
                    var isCheckTest = assessmentItem.closest(".askQuizContent.my_goal");
                    var isCorrect = "correct";
                    var efCheck = true;
                    var btnReplay = document.querySelector(".resetDrag[data-target='" + qid + "']");
                    var ansArr = assessmentItem.querySelector(".answerCorrect:not(.essayAnswer)").innerText.split("\/\/");
                    var i, j, answers, ansMsgLen, dragBox;

                    if (isAskTest && !this.classList.contains("ready")) {
                        return;
                    } else if (this.classList.contains("on")) {
                        this.nextElementSibling.click();
                        this.classList.remove("on");
                        btnReplay.classList.remove("show");
                        return;
                    }

                    for (i = 0; i < dropBoxesLen; i++) {
                        answers = dropBoxes[i].querySelectorAll(".ansMsg");
                        ansMsgLen = answers.length;

                        if (!answers.length) { // ansMsg가 dropBox 밖에 있는 경우
                            answers = assessmentItem.querySelectorAll(".ansMsg");
                        }

                        [].forEach.call(answers, function (ansMsg, idx) {
                            var dropBox = ansMsg.parentElement;
                            var ansBoxes, ansBoxLen;

                            // if (!dropBox.hasAttribute("iscorrect") || dropBox.getAttribute("iscorrect") === "false") {
                                if (dropBoxesLen === 1) {
                                    answers[ansArr - 1].classList.add("show");
                                    ansMsg.classList.remove("show");
                                } else {
                                    dragBox = dropBox.querySelector(".dragBox");

                                    if (isCheckTest && dragBox) {
                                        dragBox.parentNode.removeChild(dragBox);
                                    }

                                    if (ansMsgLen > 1 && ansArr[i] - 1 === idx) {
                                        dropBox.children[ansArr[i] - 1].classList.add("show");
                                    } else if (ansMsgLen <= 1) {
                                        ansMsg.classList.add("show");
                                        ansBoxes = ansMsg.children;
                                        ansBoxLen = ansBoxes.length;

                                        for (j = 0; j < ansBoxLen; j++) {
                                            ansBoxes[j].classList.add("show");
                                        }
                                    }
                                }

                                if (isCheck) {
                                    isCorrect = "wrong";
                                    efCheck = false;
                                }
                            // };
                        });
                    }

                    [].forEach.call(dragBoxes, function (dragBox) {
                        dragBox.classList.add("blind");
                    });

                    if (isCheck) {
                        if (multi) {
                            if (efCheck) quizCheck.textContent = "true";
                            else quizCheck.textContent = "false";
                        } else {
                            if (quizMarking) quizMarking.classList.add(isCorrect);
                            // playFeedSound(efCheck);
                        }
                    }

                    this.classList.add("on");
                    this.classList.add("blind");
                    btnReplay.classList.add("show");
                    // btnReplay.click();
                });
            }

            // 다시 풀기
            for (i = 0; i < btnReplayLen; i++) {
                btnReplays[i].addEventListener("click", function () {
                    var btnReplay = this;
                    var quizMarking = this.closest(".quizMarking");
                    var qid = btnReplay.getAttribute("data-target");
                    var btnCheck = document.querySelector(".chkDragAns[data-target='" + qid + "']");
                    var clones = document.querySelectorAll("[data-qid='" + qid + "'] .clone");
                    var assessmentItem = document.querySelector("[data-qid='" + qid + "']");
                    var dropBoxes = assessmentItem.querySelectorAll(".drop_container .dropBox");
                    var dragBoxes = assessmentItem.querySelectorAll(".dragBox");
                    var otherMsgs = assessmentItem.querySelector(".answer_container .ansMsg");
                    var isCheck = assessmentItem.getAttribute("data-check");
                    var isNoAns = assessmentItem.getAttribute("data-noans");
                    //var multi = assessmentItem.getAttribute("data-question-multi");
                    var dropBox;

                    [].forEach.call(dragBoxes, function (dragBox) {
                        var onAnsMsg = assessmentItem.querySelectorAll(".ansMsg.show");
                        var onAnsLen = onAnsMsg.length;
                        var j, k, ansBoxes, ansBoxLen;

                        dragBox.style.top = dragBox.getAttribute("data-top") + "px";
                        dragBox.style.left = dragBox.getAttribute("data-left") + "px";
                        dragBox.classList.remove("blind");
                        btnReplay.classList.remove("show");

                        for (j = 0; j < onAnsLen; j++) {
                            onAnsMsg[j].classList.remove("show");
                            ansBoxes = onAnsMsg[j].querySelectorAll(".ansBox");
                            ansBoxLen = ansBoxes.length;

                            for (k = 0; k < ansBoxLen; k++) {
                                ansBoxes[k].classList.remove("show");
                            }
                        }
                    });

                    if (!isNoAns) {
                        for (var i = 0; i < dropBoxes.length; i++) {
                            dropBox = dropBoxes[i];
                            dropBox.removeAttribute("iscorrect");
                            dropBox.setAttribute("data-drag", "");
                        }
                    }

                    if (isCheck) {
                        if (quizMarking) quizMarking.classList.remove("correct", "wrong");

                        [].forEach.call(assessmentItem.querySelectorAll(".dropBox"), function (dropBox) {
                            var clone = dropBox.querySelector(".dragBox");
                            if (clone) {
                                dropBox.removeChild(clone);
                            }
                            dropBox.setAttribute("iscorrect", false);
                        });
                    }

                    if (btnCheck) {
                        btnCheck.classList.remove("on");
                        btnCheck.classList.remove("blind");
                    }
                });
            }
        },

        /**
         * 별점 주기
         * @memberOf PUBPLE.ui
         * class 기반 기능
         */
        initStarScore : function(){

            var scoreLayer = document.querySelectorAll('._starScore');


            if(!scoreLayer) return;



            var bindEvt = function(layer){

                var btns = layer.querySelectorAll('._star');
                for(var index = 0; btns.length > index; index++){
                    btns[index].setAttribute('data-index' , index);

                    btns[index].addEventListener('click' , function(){
                        var parentBtns = this.parentElement.querySelectorAll('._star');
                        var _index = Number(this.getAttribute('data-index'));

                        for(var j = 0; parentBtns.length > j; j++){
                            parentBtns[j].classList.remove('on');
                        }
                        for(var k = 0; _index >= k; k++){
                            parentBtns[k].classList.add('on');
                        }
                    });
                }

            };

            for(var i = 0; scoreLayer.length > i; i++){
                bindEvt(scoreLayer[i])
            }

        },

        /**
         * 테이블 점수 합산 기능
         * @memberOf PUBPLE.ui
         * class 기반 기능
         */
        initScoreTable :  function () {

            var score_table = document.querySelector('.score_table');

            if(!score_table) return ;

            var score_line = document.querySelectorAll('.score_line');
            var scoreBtn = document.querySelector('#_btn_score');
            var total_score_dom = score_table.querySelector('.total_score');
            var sumVal = 0;
            var popWrap = document.querySelectorAll('.popWrap');

            for(var index = 0; popWrap.length > index; index++){

                popWrap[index].querySelector('.btnClose').addEventListener('click' , function () {
                    this.closest('.popWrap').classList.remove('show');
                });
            }


            var checkSum  = function () {

                sumVal = 0;

                var onBtn = score_table.querySelectorAll('.__check.on');

                for(var index = 0; onBtn.length > index; index++){
                    sumVal = sumVal + Number(onBtn[index].innerText);
                }

                total_score_dom.innerText = sumVal + '점';
            };


            var bindEvt = function(layer){
                var btns = layer.querySelectorAll('.__check');
                for(var index = 0; btns.length > index; index++){

                    btns[index].addEventListener('click' , function(){
                        var parentBtns = this.closest('tr').querySelectorAll('.__check');
                        for(var j = 0; parentBtns.length > j; j++){
                            parentBtns[j].classList.remove('on');
                        }
                        this.classList.add('on');
                        checkSum();
                    });
                }
            };

            for( var i = 0; score_line.length > i; i++ ){
                bindEvt(score_line[i]);
            }

            scoreBtn.addEventListener('click' , function(){

                var onBtn = score_table.querySelectorAll('.__check.on');

                if(onBtn.length != 5) return;

                if(sumVal >= 5 && sumVal <= 7) {
                    document.getElementById('_pop3').classList.add('show');
                    return;
                }
                if(sumVal >= 8 && sumVal <= 12) {
                    document.getElementById('_pop2').classList.add('show');
                    return
                }

                if(sumVal >= 13) {
                    document.getElementById('_pop1').classList.add('show');
                    return
                }
            });

        },
        /**
         * 효과음 오디오 생성
         * @memberOf PUBPLE.ui
         */
        initAudioEffect: function() {
            var srcArr = ["../common/media/feed_ok.mp3", "../common/media/feed_no.mp3"];
            var classArr = ["feedOk", "feedNo"];
            var audioLen = srcArr.length;
            var i, audio;

            for (i = 0; i < audioLen; i++) {
                audio = document.createElement("audio");
                audio.setAttribute("src", srcArr[i]);
                audio.setAttribute("type", "audio/mpeg");
                audio.setAttribute("id", classArr[i]);
                document.getElementById("wrap").appendChild(audio);
            }
        },
        /**
         * 효과음 오디오 재생
         * @memberOf PUBPLE.ui
         */
        playAudioEffect: function(isCorrect) {
            var audio;

            if (isCorrect) {
                audio = document.getElementById("feedOk");
            } else {
                audio = document.getElementById("feedNo");
            }

            audio.pause();
            audio.currentTime = 0;
            audio.play();
        },
        /**
         * 체크박스 설정
         * @memberOf PUBPLE.ui
         */
        initCheckbox: function() {
            $(".checkBtnList").find(".chk_list").on("click", function() {
                var $chkList = $(this);
                var listWrap;

                if ($chkList.parents(".chk_list_wrap").length) {
                    listWrap = "chk_list_wrap";
                } else if ($chkList.parents(".smile_box").length) {
                    listWrap = "smile_box";
                }

                $chkList.parents("." + listWrap).find("input").each(function() {
                    if (this !== $chkList.find("input")[0]) {
                        $(this).prop("checked", false);
                    }
                });
            });
        }
    }
}());