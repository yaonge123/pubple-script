'use strict';


function initNav() {
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
    var $btnPage, $btnData, $btnHome, $btnGold;
    var unit, sectionArr, sectionLen, section, sectionTitle, sectionDesc, prevSecTitle, nextSecTitle, file;
    var currPopNum, currSectionNum, currSecTitle, currUnit;
    var $navList, $helperList;
    var subject = "초등학교 체육6";

    var navList = '<div class="navList" style="display:none;">' +
        '<div class="nav_title_wrap">' +
        '<div class="nav_tit_icon"></div>' +
        '<h1 class="nav_tit_top">학습 목차<span class="icon_ex"></span></h1>' +
        '<div class="btnClose"></div>' +
        '</div>' +
        '<div class="navListCont">' +
        '<ul class="list_big">';

    var helper = '<div class="helperList">' +
        '<h2 class="helper_tit">수업 도우미</h2>' +
        '<div class="helper_wrap">' +
        '<ul class="helper_cont">' +
        '<li>그리기</li>' +
        '<li id="timer">타이머</li>' +
        '<li id="StopWatch">스톱 워치</li>' +
        '<li id="selection">활동 시킴이</li>' +
        '<li id="Attention">주목</li>' +
        '</ul>' +
        '</div>' +
        '<div class="btnClose"></div>' +
        '</div >';

    // 상단 내비게이션 버튼 생성
    topNav += '<div class="nav_btn_wrap">' +
        '<div class="navBtnPage nav_btn" title="페이지">' +
        '<span class="navIcon btn_page"></span>' +
        '교과서 ' + page + '쪽' +
        '</div>' +
        '<div class="navBtnHome nav_btn" title="홈">' +
        '<span class="navIcon btn_home"></span>' +
        '홈' +
        '</div>' +
        '<div class="navBtnData nav_btn" title="자료실">' +
        '<span class="navIcon btn_data"></span>' +
        '자료실' +
        '</div>' +
        '</div>';

    $header.append(topNav);

    $btnPage = $('.navBtnPage');
    $btnHome = $('.navBtnHome');
    $btnData = $('.navBtnData');
    $btnGold = $('.gold_finish_btn');

    // 상단 내비 버튼 이벤트 바인딩
    $btnPage.on('click', function () {
        if (parent.viewer) parent.viewer.link('close', '');
        if (parent.viewer) parent.viewer.gotoPage(page);
    });

    $btnHome.on('click', function () {
        if (parent.viewer) parent.viewer.syncEventGA("팝업","홈",subject);
        if (parent.viewer) parent.viewer.link('close', 'main');
    });

    $btnGold.on('click', function () {
        if (parent.viewer) parent.viewer.link('close', '');
        if (parent.viewer) parent.viewer.gotoPage(page);
    });

    $btnData.on('click', function () {
        if (parent.viewer) parent.viewer.syncEventGA("팝업","자료실",subject);
        if (parent.viewer) parent.viewer.openDataStorage();
    });

    // 이북에서 열어 하단 내비게이션 생성하지 않는 팝업이 존재함
    if (!botNav) {
        if (viewer) parent.viewer.syncPageViewGA("팝업+"+ subject +"+"+ currFile.substring(4));
        return;
    }

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

                // 현재 섹션에 대한 데이터 찾기
                if (currFile === file) {
                    currPopNum = j + 1;
                    currSectionNum = j;
                    currSecTitle = unit.section[j].title;
                    currUnit = unit;
                }

                // 동일한 섹션에 들어가는지 확인
                if (sectionTitle === prevSecTitle) {
                    navList += '<li data-page="' + file + '">' + sectionDesc + '</li>';
                } else {
                    navList += '<li><div class="list_title_wrap"><div class="list_icon"></div>' + sectionTitle + '</div>' +
                        '<ul class="list_sub"><li data-page="' + file + '">' + sectionDesc + '</li>';

                    sectionList += '<li data-page="' + file + '">' + sectionTitle + '</li>';
                }

                if (sectionTitle !== nextSecTitle) {
                    navList += '</ul></li>';
                }

                prevSecTitle = sectionTitle;
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
        '<div class="classHelper">수업 도우미</div>' +
        '</div>' +

        '<div class="nav_page_wrap">' +
        '<ul class="navPage">' +
        '<li class="nav_prev"></li>' +
        '<li class="nav_page">' + currPopNum + '/' + sectionLen + '</li>' +
        '<li class="nav_next"></li>' +
        '</ul>';

    navList += '</ul>' +
        '</div>' +
        '</div>';

    document.getElementById('botNav').insertAdjacentHTML('beforeend', navHtml);

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
            if (parent.viewer) parent.viewer.syncPageViewGA("팝업+"+ subject +"+"+ fileInfoArr[1] +"_"+ currSection + ".html");
        }
    });

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
        if (parent.viewer) parent.viewer.syncEventGA("팝업","단원 목차",subject);
        $navList.toggle();
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
    $('.classHelper').on('click', function (e) {
        if ($(e.target).hasClass('classHelper')) {
            $helperList.show();
        }
    });
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
}

document.addEventListener("DOMContentLoaded", function () {
    var ui = PUBPLE.ui;
    var util = PUBPLE.util;

    if (util.detector.isIos()) {
        document.documentElement.style.cursor = "pointer";
    }

    ui.setScale();
    initNav();
    ui.clickBtnShow();



    try{
        if(_initSlideFlag){
            ui.initSlide();
        }
    }catch(e){
        ui.initSlide();
    }

    ui.initLbPop();
    ui.initTooltip();
    ui.initToast();
    ui.initScroll();
    ui.setBtnAudio();
    // ui.loadPopupScript();

    // if (util.detector.isIe()) {
    //     ui.initWordPopup();
    // } else {
    //     document.fonts.ready.then(function () {
    // console.log('All fonts in use by visible text have loaded.');
    // console.log('Roboto loaded? ' + document.fonts.check('1em Roboto'));
    //     ui.initWordPopup();
    // });

    // document.fonts.onloadingdone = function (fontFaceSetEvent) {
    //     console.log("onloadingdone: " + fontFaceSetEvent.fontfaces.length + " font faces loaded");
    // ui.initWordPopup();
    // };
    // }
});

window.addEventListener("resize", PUBPLE.ui.setScale);