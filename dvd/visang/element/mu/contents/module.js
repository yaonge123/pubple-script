//create namespace
var PUBPLE = PUBPLE || {};

//namespace metadata

var popupScaleX, popupScaleY;

PUBPLE.modules = function() {
  'use strict';
  //dependencies

  //private member
  var jsonObj = null;
  var pageFile = location.pathname.split('/').slice(-1)[0];
  var chapterNum = parseInt(pageFile.split('_')[1], 10) - 1;
  var sectionNum = parseInt(pageFile.split('_')[2], 10) - 1;
  var subNum = parseInt(pageFile.split('_')[3], 10) - 1;
  var appendix = 4;
  if(chapterNum==appendix) subNum = parseInt(pageFile.split('_')[4], 10) - 1;
  
  var subData = '';
  var totalPage = '';
  var curPage = '';

  var hRatio = 1;
  var vRatio =1;

  //public method
  function loadScript(url) {
    var scriptTag = '<script src=' + url + '></script>';
    $('head').append(scriptTag);
  }

  function setScale() {
    // console.log('call setScale');
    var targetEle = document.getElementById('wrap');
    var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    hRatio = windowWidth / targetEle.clientWidth;
    vRatio = windowHeight / targetEle.clientHeight;

    popupScaleX = hRatio;
    popupScaleY = vRatio;

    setTransform(targetEle, hRatio, vRatio);
    function setTransform(targetEle, hRatio, vRatio) {
      targetEle.setAttribute('style', '-ms-transform: scale(' + hRatio + ',' + vRatio + ');'
        + '-webkit-transform: scale(' + hRatio + ',' + vRatio + ');' + 'transform: scale(' + hRatio + ',' + vRatio + ');'
        + 'transform-origin: 0% 0%; -webkit-transform-origin: 0% 0%; -ms-transform-origin: 0% 0%;');
    }
  }

  function requestData(path, callback, options) {
    var url = path;
    var xhr;

    if (window.XMLHttpRequest) {
      xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
      try {
        xhr = new ActiveXObject("Msxml2.XMLHTTP");
      } catch (e) {
        console.log(e);
        try {
          xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }
        catch (e) {
          console.log(e);
        }
      }
    }

    xhr.onreadystatechange = function() {
      console.log('readyState: ' + this.readyState + ', status: ' + this.status + ', statusText: ' + this.statusText);
      if (this.readyState === 4 && this.status === 200) {
        callback.apply(this, [options]);
      } else {
        console.log('request error! readyState: ' + this.readyState);
      }
    };
    xhr.open('GET', url, false);  //false: sync
    xhr.send();
  }

  function parseData(options) {
    console.log('call parseData');
    jsonObj = JSON.parse(this.responseText);

    if (options === 'main') {
      setMainList();
    }
  }

  function setMainList() {
    console.log('call setMainList');
    var chapterData = null;
    var sectionData = null;
    var chapterEle = document.querySelector('#chapterList ul');
    var chapterLen = jsonObj.chapter.length;
    var secUlArr = document.querySelectorAll('#sectionList ul');
    var chapterList = '';
    var sectionTitle = '';
    var selChTitle = jsonObj.chapter[0].title;
    var selScTitle = jsonObj.chapter[0].section[0].secTitle;

    //create list
    for(var i = 0; i < chapterLen; i++) {
      var tmp = "";
      //if(i==appendix) tmp = " style='display:none;'";
       
      var liEle = '';
      var selected = i === 0 ? 'select1' : '';
      chapterData = jsonObj.chapter[i];
      var secLen = chapterData.section.length;
      var chapterTxt = chapterData.num + '. ' + '<span class="titleTxt">' + chapterData.title + '</span>';
      chapterList += '<li id="titleTxt' + i + '" class="' + selected + '"' + tmp + '>' + chapterTxt + '</li>';

      for(var j = 0; j < secLen; j++) {
        sectionData = chapterData.section[j];
        sectionTitle = sectionData.secTitle;
        selected = j === 0 ? 'selected' : '';

        if(sectionData.subTitle) {
          liEle +='<li class="' + selected + '"><span class="pageNum">' + sectionData.bookPage + 'P</span><span class="titleTxt">' + sectionTitle + '</span>'
            + ' <span class="pageSubtt">| ' + sectionData.subTitle + '</span></li>';
        } else {
          liEle +='<li class="' + selected + '"><span class="pageNum">' + sectionData.bookPage + 'P</span><span class="titleTxt">' + sectionTitle + '</span></li>';
        }
        secUlArr[i].innerHTML = liEle;
      }
    }
    chapterEle.innerHTML = chapterList;

    var sectionList = document.querySelectorAll('#sectionList ul li');
    var sectionLen = sectionList.length;
    var chpaterList = document.querySelectorAll('#chapterList ul li')
    var secDiplay = '';

    //bind chapter click event
    for(var i = 0; i < chapterLen; i++) {
      chpaterList[i].addEventListener('click' ,function(e) {
        var chapterId = this.getAttribute('id');
        var chapterNum = chapterId.replace(/[^0-9]/g, '');

        selChTitle = this.querySelector('.titleTxt').innerText;

        for(var j = 0; j < chapterLen; j++) {
          secDiplay = secUlArr[j].style.display;
          if(secDiplay === 'inline-block' || secDiplay === '') {
            secUlArr[j].style.display = 'none';
          }
          chapterEle.children[j].className = '';
        }
        secUlArr[chapterNum].style.display = 'inline-block';
        clearSelSec();
        if(secUlArr[chapterNum].children[0].className !== 'selected') {
          secUlArr[chapterNum].children[0].className += 'selected';
          selScTitle = secUlArr[chapterNum].children[0].children[1].innerText;
        }
        this.className += 'select1';
        $('.contentsScroll').scrollTop(0);
      });
    }

    //bind section click event
    for(var i = 0; i < sectionLen; i++) {
      sectionList[i].addEventListener('click', function() {
        selScTitle = this.querySelector('.titleTxt').innerText;
        clearSelSec();
        this.className += 'selected';
      })
    }
    //clear class 'selected' on section list
    function clearSelSec() {
      for(var i = 0; i < sectionLen; i++) {
        sectionList[i].className = '';
      }
    }
    //bind ebook click event
    document.getElementById('ebook').addEventListener('click', function () {
      alert('기능 개발 중입니다.');
    });

    //bind ppt click event
    document.getElementById('ppt').addEventListener('click', function () {
      var chapterArr = jsonObj.chapter;
      var currChapter = '';
      var filename = '';
      var i;
      for(i = 0; i < chapterLen; i++) {
        if(chapterArr[i].title === selChTitle) currChapter = chapterArr[i];
      }
      console.log('selChTitle: ' + selChTitle + ', selScTitle: ' + selScTitle);
      var sectionData = currChapter.section;
      var sectionLen = sectionData.length;
      for(i = 0; i < sectionLen; i++) {
        if(sectionData[i].secTitle === selScTitle) {
          filename = sectionData[i].sub[0].fileName;
        }
      }
      var href = getTargetPath(filename, 'index');
      location.href = href
    });
  }

  function appendNav() {
    // console.log('call appendNav');
    // document.getElementById('navWrap').innerHTML = this.responseText;
    var $header = $('#header');
    var currFile = location.href.split("/").slice(-1)[0];
    var fileInfoArr = currFile.split("_");
    var chapter = +fileInfoArr[0].substr(2);
    var page = +fileInfoArr[1];
    var topNav = '';

    var navList = '<div class="navList">' +
      '<div class="nav_title_wrap">' +
      '<div class="nav_tit_icon"></div>' +
      '<h1 class="nav_tit_top">학습 목차<span class="icon_ex"></span></h1>' +
      '<div class="btnClose"></div>' +
      '</div>' +
      '<div class="navListCont">' +
      '<ul class="list_big">';

    var subList = '';

    var sectionList = '';

    var helper = '<div class="helperList">' +
      '<h2 class="helper_tit">수업 도우미</h2>' +
      '<div class="helper_wrap">' +
      '<ul class="helper_cont">' +
      '<li id="MusicMaker">악보 그리기</li>' +
      '<li id="JanguMaker​">장단 만들기</li>' +
      '<li>그리기</li>' +
      '<li id="timer">타이머</li>' +
      '<li id="StopWatch">스톱 워치</li>' +
      '<li id="selection">활동 시킴이</li>' +
      '<li id="Attention">주목</li>' +
      '</ul>' +
      '</div>' +
      '<div class="btnClose"></div>' +
      '</div >';

    var listInfo = DATA.listInfo;
    var unitArr = listInfo[chapter - 1].unit;
    var unitLen = unitArr.length;
    var i = 0;
    var j = 0;
    var $btnPage, $btnData, $btnHome;
    var unit, sectionArr, sectionLen, section, sectionTitle, sectionDesc, prevSecTitle, nextSecTitle, file;
    var currPopNum, currSectionNum, currSecTitle, currUnit;
    var $navList, $helperList;
    

    // 상단 내비게이션 버튼 생성
    topNav += '<div class="nav_btn_wrap">' +
      '<div class="navBtnPage nav_btn" title="페이지">' +
      '<span class="navIcon btn_page"></span>' +
      '교과서 ' + page +  '쪽' +
      '</div>' +
      '<div class="navBtnHome nav_btn" title="홈">' +
      '<span class="navIcon btn_home"></span>' +
      '홈' +
      '</div>' +
      '<div id="data" class="navBtnData nav_btn" title="자료실">' +
      '<span class="navIcon btn_data"></span>' +
      '자료실' +
      '</div>' +
      '</div>';

    $header.append(topNav);

    $btnPage = $('.navBtnPage');
    $btnHome = $('.navBtnHome');
    $btnData = $('.navBtnData');

    // 상단 내비 버튼 이벤트 바인딩
    $btnPage.on('click', function() {
      parent.viewer.link('close', '');
      parent.viewer.gotoPage(page);
    });

    $btnHome.on('click', function () {
      parent.viewer.link('close', 'main');
      //parent.viewer.syncEventGA("팝업","홈","초등학교 음악5");
    });

    $btnData.on('click', function () {
      window.open("../common/popup/data/data.html", "data");
      //parent.viewer.syncEventGA("팝업","자료실","초등학교 음악5");
    });

    // 하단 내비게이션 생성
    for (; i < unitLen; i++) {
      unit = unitArr[i];
      // 현재 unit 찾기
      //i < unitLen - 1
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
            currSectionNum = j;
            currPopNum = j + 1;
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

    var navHtml = '<div id="botNav">' +
      '<div class="nav_list_wrap">' +
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
      '</ul>' +
      '</div>' +
      '</div>';

    navList += '</ul>' +
      '</div>' +
      '</div>';

    document.getElementById('wrap').insertAdjacentHTML('beforeend', navHtml);

    // 학습 목차 삽입
    $('#wrap').append(navList);

    // 학습도우미 삽입
    $('.classHelper').append(helper);

    // 현재 센셕 표시
    $('.navCenterBtn').find('li').each(function() {
      var $currSectionEl = $(this);
      var currSection = $currSectionEl.text();

      if (currSection === currSecTitle) {
        $currSectionEl.addClass('on');
        //parent.viewer.syncPageViewGA("팝업+초등학교 음악5+"+fileInfoArr[1] +"_"+ currSection + ".html");
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
    $('.nav_list_wrap').on('click', function() {
      $navList.toggle();
    });

    // 학습 목차 섹션 선택시
    $('.list_sub').find('li').on('click', function() {
      var page = $(this).data('page');

      location.href = page;
    });

    // 학습 목차 닫기
    $navList.find('.btnClose').on('click', function() {
      $navList.hide();
    });

    // 각 섹션 선택시
    $('.navCenterBtn').find('li').on('click', function(e) {
      var page = $(e.target).data('page');

      location.href = page;
    });

    // 수업도우미 선택시
    $helperList = $('.helperList');
    $('.classHelper').on('click', function(e) {
      if ($(e.target).hasClass('classHelper')) {
        $helperList.show();
      }
    });
    $helperList.on('click', function(e) {
      var $target = $(e.target);
      var helperName = $target.text();

      if (!$target.hasClass('btnClose')) {
        switch (helperName) {
          case "악보 그리기":
            window.open("../common/popup/MusicMaker/MusicMaker.html", "musicMaker");
            break;
          case "장단 만들기":
            window.open("../common/popup/JanguMaker/JanguMaker.html", "janguMaker");
            break;
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
    $('.navPage').on('click', function(e) {
      var $target = $(e.target);

      if ($target.hasClass('nav_prev')) {
        if (currSectionNum !== 0) {
          location.href = currUnit.section[currSectionNum - 1].file;
        } else {
          // alert('첫 페이지입니다.');
        }
      } else if ($target.hasClass('nav_next')) {
        if (currSectionNum !== sectionLen - 1) {
          location.href = currUnit.section[currSectionNum + 1].file;
        } else {
          // alert('마지막 페이지입니다.');
        }
      }
    });

  }

  function showLayerPop() {
    // console.log('call showLayerPop');
    var popBtn = document.querySelectorAll('.popBtn');
    var popCloseBtn = document.querySelectorAll('.popCloseBtn');
    var popWrapEle = document.getElementById('popupWrap');
    
    for(var i=0; i<popBtn.length; i++){
      popBtn[i].addEventListener('click', function(e) {
        var popId = $(e.target).data('popup');
        var popEle = document.getElementById(popId);
        var clientWidth= document.documentElement.clientWidth;
        var clientHeight = document.documentElement.clientHeight;

        if(popEle.getAttribute("data-width")==null) popEle.setAttribute("data-width", popEle.offsetWidth);
        if(popEle.getAttribute("data-height")==null) popEle.setAttribute("data-height", popEle.offsetHeight);
       
        var resizedW = popEle.getAttribute("data-width") * hRatio;
        var resizedH = popEle.getAttribute("data-height") * vRatio;
        var popTop = (clientHeight - resizedH) / 2 / vRatio;
        var popLeft = (clientWidth - resizedW) / 2 / hRatio;
        
        $('#' + popId).animate({
          'visibility': 'visible',
          'margin-top': 0
        });
        $('#pophelloMusic .helloMusicNote').show();
        popWrapEle.setAttribute('style', 'visibility:visible; z-index:1001');
        popEle.setAttribute('style', 'visibility:visible;top:' + popTop + 'px;left:' + popLeft + 'px');
        // select_motionObj("#" + popEle.getAttribute("id"));
        if (typeof resetAllMediaPlayer === 'function') resetAllMediaPlayer();
        $(".layerPopup .layerpopCloseBtn").click();
      });
    }

    for(var i=0; i<popCloseBtn.length; i++){
      popCloseBtn[i].addEventListener('click', function(e) {
        var secondary = false;  //팝업에서 다른 팝업 열었는지 확인하기 위한 flag
        var popSiblings = $(e.target).parents(".popupBg").siblings();
        var closeAll = false;

        popSiblings.each(function () {
          if($(this).css('visibility') === 'visible') {
            secondary = true;
            if($(e.target).parent().hasClass('fullpopUp')) closeAll = true;
          }
        });

        if(!secondary){
          popWrapEle.setAttribute('style', 'visibility: hidden; z-index:999');
        } else {
          if(closeAll) {
            $('.popupBg').css('visibility', 'hidden');
            popWrapEle.setAttribute('style', 'visibility: hidden; z-index:999');
          }
        }

        $(e.target).parents(".popupBg")[0].setAttribute('style', 'visibility: hidden;margin-top:20px');
        $('#pophelloMusic .helloMusicNote').hide();
        if (typeof resetAllMediaPlayer === 'function') resetAllMediaPlayer();

        // 슬라이드 초기화
        var $scope = $(e.target).parents(".popupBg");
        $scope.find(".slidePrev").addClass("off")
        $scope.find(".slideNext").removeClass("off")
        $scope.find(".slideContests > li").css("display", "none");
        $scope.find(".slideContests > li:eq(0)").css("display", "inline-block");
        $scope.find(".slideContests").data("imgNum", 1);
        $scope.find(".slideDotted li").removeClass("on");
        $scope.find(".slideDotted > li:eq(0)").addClass("on");
        quizReset($scope);
      });
    }
  }

  function showText() {
    var $showBtn = $('.btnShow');
    var $answerBtn = $('.answerBtn');
    var $replay = $('.replay');
    var targetId = '';

    $showBtn.each(function() {
      targetId = '#' + $(this).data('target');
      $(targetId).append('<span class="hideTxtBox"></span>');
    });
    var $hideTxtBox = $('.hideTxtBox');

    $showBtn.on('click', showTextBox);
    $hideTxtBox.on('click', showTextBox);
    if(!$showBtn.hasClass('answerBtn')) {
      $answerBtn.on('click', showTextBox);
    }

    function showTextBox(e) {
      var opacity;
      var target = e.target;
      var $target = $(target);
      var targetId = $target.data("target");
      var $targetPointer = $("#" + targetId);
      var $allMediaWrap = $(".audioWrap");
      var $mediaWrap = $targetPointer.find(".audioWrap");
      var textVal = $target.data("text");
      var $hideTxt = $('.hideTxtBox');
      var $onListTabTxt = $('.tabDetail li.on').find($('.hideTxtBox'));
      var hideTxtArray = [];
      var txtArray,  i;
      
      if($target.hasClass("answerBtn")){
    	$hideTxtBox = $("." +  $target.data("target") + " .hideTxtBox");
        //if($target.hasClass("replay")) $target.text(textVal);
        //else $target.text('다시 풀기');
        $target.toggleClass('replay');

        // 예시답안/다시풀기 버튼 사용하는 경우
        /*if ($(this).hasClass('btnEx')) {
          $target.addClass('replay');
        }*/

        if($(this).hasClass('btnEx')) {
          $target.toggleClass('btnRe');
        }else if($(this).hasClass('btnRe')) { 
          $target.removeClass('replay');
        }

        $('.popupTxtContent').toggleClass('on');
          opacity = $target.hasClass("replay") ? 0 : 1;
          if($allMediaWrap.length){
            if (opacity) {
              $allMediaWrap.css("z-index", 0);
              resetAllMediaPlayer();
            } else {
              $allMediaWrap.css("z-index", 20);
            }
          }
          
        }else{
    	    $hideTxtBox = $(this).parent().find('.hideTxtBox');
          opacity = parseInt($hideTxtBox.css('opacity'), 10);
          opacity = opacity ? 0 : 1;

          if($mediaWrap.length){
            if (opacity) {
              $mediaWrap.css("z-index", 0);
              resetAllMediaPlayer();
            } else {
              $mediaWrap.css("z-index", 20);
            }
          }
        }

      if($target.is("button")) $target.attr("disabled", true);
      else $target.off("click");

      if($hideTxtBox.length==0){
        setBtnEvent();
        
      }else{
        $hideTxtBox.each(function(index){
          $(this).animate({
              'opacity': opacity,
            },
            {
              duration: 300,
              complete: function(){
                for(i = 0; i < $hideTxt.length; i++){
                  hideTxtArray[i] = $hideTxt[i].style.opacity;
                }
                var txtArray = hideTxtArray.filter(hidetxtOpacityBool); 
                var txtArrayLen = txtArray.length;

                // 탭이 있는 경우 예시답안/다시풀기
                if($onListTabTxt.length){ 
                  if(txtArrayLen === $onListTabTxt.length){
                    $(".btnIntro1").addClass('btnRe');
                    $(".btnIntro2").addClass('btnRe');
                  }else if(txtArrayLen === 0){
                    $(".btnIntro1").removeClass('btnRe');
                    $(".btnIntro2").removeClass('btnRe');
                  } 
                }else{
                  if(txtArrayLen === $showBtn.length){
                    $(".btnIntro1").addClass('btnRe');
                  }else if(txtArrayLen === 0){
                    $(".btnIntro1").removeClass('btnRe');
                  } 
                }
                             
                if(!$target.hasClass("answerBtn")){
                  $(".answerBtn").each(function(){
                    var $answerBtn = $(this);
                    var $ele = $("." +  $(this).data("target") + " .hideTxtBox");
                    var btnCorrect = true;
                    var btnReplay = true;
                    $ele.each(function(){
                      if($(this).css('opacity')=="1") btnCorrect = false;
                      if($(this).css('opacity')=="0") btnReplay = false;
                    });
                    if(btnCorrect){
                      $answerBtn.addClass("replay");
                      $answerBtn.text("다시 풀기");
                    }
                    if(btnReplay){
                      $answerBtn.removeClass("replay");
                      $answerBtn.text($answerBtn.data("text"));
                    }
                  });
                }
                if(parseInt($hideTxtBox.length - 1) == index) {
                    setBtnEvent();
                    if($answerBtn.data("answer")!=undefined && $answerBtn.hasClass("replay")) Function("return " + $answerBtn.data("answer"))();
                    if($answerBtn.data("replay")!=undefined && !$answerBtn.hasClass("replay")) Function("return " + $answerBtn.data("replay"))();
                  }
              }
            });
        });
      }

      //음표 색상 변경 m03_02_02_04.html
      var withNote = $target.hasClass('withNote');
      if($target.hasClass('popSylcont') || $target.hasClass('answerNote') || withNote) {
        var note = target;
        var noteOp = !opacity;
        var noteIdx = parseInt($target.data('target').split('_')[1]);
        var noteId = '';
        var grayNoteOp = 0;

        if(withNote) {
          noteIdx += 8;
          noteId = '#pointerShow_' + noteIdx;
          note = '.popSyl ' + noteId + ' .popSylcont';
          grayNoteOp = $(note).siblings().css('opacity') == true ? 0 : 1;
          $(note).siblings().animate({'opacity': grayNoteOp}, {duration: 300});
        }

        if ($target.hasClass('answerNote')) note = '.popSylcont.btnShow';
        if($target.hasClass('popSylcont')) {
          noteIdx -= 8;
          noteId = '#pointerShow_0' + noteIdx;
          $(noteId).children('.hideTxtBox').animate({'opacity': !noteOp}, {duration: 300});
        }
        $(note).animate({'opacity': noteOp}, {duration: 300});
      }

      //음표 색상 변경
      function setBtnEvent(){
        if($target.is("button")){
          $target.attr("disabled", false);
        }else{
          $target.on('click', showTextBox);
          $target.on('click', playSound);
        }
      }

      //숨겨진 텍스트박스 opacity에 따른 true, false\
      function hidetxtOpacityBool(item){
        if(item){
          if(item == 0){
            return true;
          }        
        }
        return false;
      }
    }
  }

  function showInputText() {
    var opacity;
    var $inputShowBtn = $('.inputTxt');
    var $inputAnswerBtn = $('.inputBtn');

    $inputShowBtn.each(function() {
    	if($(this).data("answertxt")!=undefined) $(this).parents(".inputWrap").append("<div class='answerTxt' style='opacity:0'>" + $(this).data("answertxt") + "</div>");
    });
    var $hideTxtBox = $('.answerTxt');
    $inputAnswerBtn.on('click', showTextBox);
    
    function showTextBox(e) {
    	var $target = $(e.target);
    	$hideTxtBox = $("." +  $target.data("target") + " .answerTxt");
    	var textVal = $target.data("text");

    	if($target.hasClass("replay")){
    		$target.text(textVal);
    		opacity = 0;
    		$inputShowBtn.val("");
    		$hideTxtBox.css("display", "none");
    	}else{
    		$target.text('다시 풀기');
    		opacity = 1;
    		$hideTxtBox.css("display", "inline-block");
    	}
    	$target.toggleClass('replay');  	
    	$target.attr("disabled", true);
    	
    	$hideTxtBox.each(function(index){
    		$(this).animate({
    			'opacity': opacity
    		},
    		{
    			duration: 300,
    			complete: function(){
    				if(parseInt($hideTxtBox.length - 1) == index){
    					$target.attr("disabled", false);
    					if($target.data("answer")!=undefined && $target.hasClass("replay")) Function("return " + $target.data("answer"))();
    					if($target.data("replay")!=undefined && !$target.hasClass("replay")) Function("return " + $target.data("replay"))();
    				}
    			}
    		});
    	});
    }
  }

  function setScroll() {
    var scrollEleList = document.getElementsByClassName('contentsScroll');
    var scrollContLen = scrollEleList.length;
    var scrollContSize = null;
    var scrollW = 0;
    var scrollH = 0;
    var scrollDetailW = 0;

    for(var i = 0; i < scrollContLen; i++) {
      if(scrollEleList[i].querySelector('.infoMusic') === null) return;
      scrollContSize = scrollEleList[i].getAttribute('data-scroll-size');
      scrollW = scrollContSize.split(',')[0];
      scrollH = scrollContSize.split(',')[1];
      scrollDetailW = parseInt(scrollW - 40, 10);

      scrollEleList[i].setAttribute('style', 'width:' + scrollW + 'px;height:' + scrollH + 'px');
      if(document.querySelector('.typePreview') !== null) {
        document.querySelector('.typePreview .scrollDetail').setAttribute('style', 'width:' + scrollDetailW + 'px');
      }
    }
  }

  function setBtnAudio(url) {
      var btnArr = document.getElementsByTagName('button');
      var btnLen = btnArr.length;
      var audioEle = document.createElement('audio');
      var soundUrl =  url  || "../../common/media/click.mp3";
	    audioEle.setAttribute('id', 'btnClick');
	    audioEle.setAttribute('src', soundUrl);
      audioEle.setAttribute('type', 'audio/mpeg');

	    document.getElementById('container').appendChild(audioEle);
	    for(var i = 0; i < btnLen; i++) {
	      if(btnArr[i].getAttribute("id")=="learnIdxBtn") continue;
	      btnArr[i].addEventListener('click', playSound, false);
      }

	    $(".hideTxtBox").each(function(){
	      $(this).click(function(){
	        playSound();
	      });
	    });
  }

  function playSound(e) {
    var clickAudio = document.getElementById('btnClick');
    if(!clickAudio.ended) {
      clickAudio.currentTime = 0;
    }
    clickAudio.play();
  }

  function setDownBtn() {
    var btnEleList = document.querySelectorAll('.downBtn');
    var btnEleLen = btnEleList.length;
    var btnWrap = document.querySelector('.contentsBtnWrap');
    var tabLen = document.querySelectorAll('.tabMenu li').length;
    var tabEle = document.querySelectorAll('.tabDetail .motionSetWrap');
    var reg = /\/n/gi;
    
    if(tabLen === 0){
    	 tabLen = document.querySelectorAll('.slideContests .motionSetWrap').length;
    	 tabEle = document.querySelectorAll('.slideContests .motionSetWrap');
    }

    if(tabLen === 0 || btnEleLen <= 1) tabLen = 1;
    for(var j = 0; j < tabLen; j++) {
      if(tabLen > 1 && $(tabEle[j]).find('.downBtn').length !== 0) {
        btnEleList = tabEle[j].querySelectorAll('.downBtn');
        btnEleLen = btnEleList.length;
        btnWrap = tabEle[j].querySelector('.contentsBtnWrap');
      }

      for(var i = 0; i < btnEleLen; i++) {
        var tooltipVal = btnEleList[i].getAttribute('data-alt');
        tooltipVal = tooltipVal.replace(reg, '<br/>');
        var tooltipDiv = document.createElement('div');
        tooltipDiv.setAttribute('class', 'downloadAlt no' + i);
        tooltipDiv.innerHTML = tooltipVal;
        btnWrap.appendChild(tooltipDiv);
        var tooltipEle = btnWrap.querySelector('.downloadAlt.no' + i);
        var btnWidth = btnWrap.querySelector('.downBtn').clientWidth;
        var altWidth = tooltipEle.clientWidth;
        // console.log('altWidth', altWidth);
        // console.log('btnWidth', btnWidth);

        btnEleList[i].className += ' no' + i;
        var setTipStyle = function(e) {
          var btnClass = e.target.getAttribute('class');
          var btnNoStart = btnClass.indexOf('no');
          var btnNo = btnClass.substring(btnNoStart, btnNoStart + 3);

          if (document.getElementsByClassName('btnFix').length === 0) {
            var currTip = e.target.parentNode.querySelector('.downloadAlt.' + btnNo);
            var btnLeft = e.target.offsetLeft - 10;
          } else {
        	var ele = e.target;
        	while(!ele.classList.contains("contentsBtnWrap")){
        		ele = ele.parentNode;
        	}  
            var  currTip = ele.querySelector('.downloadAlt.' + btnNo);
            var btnLeft = e.target.parentNode.offsetLeft - 10;
          }
          btnLeft = btnLeft - altWidth / 2 + btnWidth / 2;
          var btnTop = '-' + currTip.clientHeight;

          if(e.type === 'mouseover') {
            currTip.setAttribute('style', 'visibility:visible; top:' + btnTop + 'px;' + ' left:' + btnLeft + 'px;');
          } else if (e.type === 'mouseout') {
            currTip.setAttribute('style', 'visibility:hidden');
          }
        }

        btnEleList[i].addEventListener('mouseover', setTipStyle);
        btnEleList[i].addEventListener('mouseout', setTipStyle);

        btnEleList[i].addEventListener('click', function (e) {
          var fileName = e.target.getAttribute('data-data');
          var filePath = 'down/' + fileName;
          var anchor = document.createElement('a');
          anchor.setAttribute('href', filePath);
          anchor.setAttribute('download', fileName);
          anchor.setAttribute('target', '_blank');
          anchor.classList.add("fileDown");
          var downEle = document.getElementsByClassName("fileDown");
          if(downEle[0]!=undefined) downEle[0].parentNode.removeChild(downEle[0]);
          document.getElementsByTagName("body")[0].appendChild(anchor);
          anchor.click();
        }, false);
      }
    }
  }

  function setSlide(){
    $(".slideWrap").each(function(index){
      var $scope = $(this);
      var motionCount = $scope.find(".slideContests > li").length;

      $(".slidePrev").addClass("off");
      if(motionCount==1) $(".slideNext").addClass("off")
      else $(".slideNext").removeClass("off")

      $scope.find(".slideContests > li:nth-child(1)").css("display", "inline-block");
      $scope.find(".slideContests").data("imgNum", 1);

      $(".slideWrap").append("<ul class='slideDotted'></ul>");

      for(var i=0; i<motionCount; i++){
        $(".slideDotted").append("<li class='on' data-num='" + (i+1) + "'></li>");
      }

      var width = $(".slideDotted").width();
      $(".slideDotted").css({"left":"50%", "margin-left":"-" + width / 2 + "px"});

      $(".slideDotted li").removeClass("on");
      $(".slideDotted li:nth-child(1)").addClass("on");

      $scope.find(".slideDotted > li").click(function(){
        var neviNum = $(this).data("num");
        if(neviNum==1) $scope.find(".slidePrev").addClass("off");
        else $scope.find(".slidePrev").removeClass("off")

        if(neviNum==motionCount) $scope.find(".slideNext").addClass("off");
        else $scope.find(".slideNext").removeClass("off");

        $(".slideDotted li").removeClass("on");
        $(this).addClass("on");
        $scope.find(".slideContests > li").css("display", "none");
        $scope.find(".slideContests > li:nth-child(" + neviNum + ")").css("display", "inline-block");
        $scope.find(".slideContests").data("imgNum", neviNum);
        // select_motionObj(".slideContests:eq(" + index + ") > li:nth-child(" + neviNum + ")");
        if (typeof resetAllMediaPlayer === 'function') resetAllMediaPlayer();
        quizReset($scope);
      });

      $scope.find(".slidePrev").click(function(){
        var imgNum = $scope.find(".slideContests").data("imgNum");
        if(imgNum>1){
          if(imgNum==2) $scope.find(".slidePrev").addClass("off")
          $scope.find(".slideNext").removeClass("off")
          $scope.find(".slideContests > li:nth-child(" + imgNum +")").css("display", "none");
          $scope.find(".slideContests > li:nth-child(" + (imgNum-1) + ")").css("display", "inline-block");
          $scope.find(".slideContests").data("imgNum", imgNum-1);
          $(".slideDotted li").removeClass("on");
          $scope.find(".slideDotted > li:nth-child(" + (imgNum-1) + ")").addClass("on");
          // select_motionObj(".slideContests:eq(" + index + ") > li:nth-child(" + (imgNum-1) + ")");
          if (typeof resetAllMediaPlayer === 'function') resetAllMediaPlayer();
          quizReset($scope);
        }
      });

      $scope.find(".slideNext").click(function(){
        var imgNum = $scope.find(".slideContests").data("imgNum");
        if(imgNum<motionCount){
          if(imgNum+1==motionCount) $scope.find(".slideNext").addClass("off")
          $scope.find(".slidePrev").removeClass("off")
          $scope.find(".slideContests > li:nth-child(" + imgNum +")").css("display", "none");
          $scope.find(".slideContests > li:nth-child(" + (imgNum+1) + ")").css("display", "inline-block");
          $scope.find(".slideContests").data("imgNum", imgNum+1);
          $(".slideDotted li").removeClass("on");
          $scope.find(".slideDotted > li:nth-child(" + (imgNum+1) + ")").addClass("on");
          // select_motionObj(".slideContests:eq(" + index + ") > li:nth-child(" + (imgNum+1) + ")");
          if (typeof resetAllMediaPlayer === 'function') resetAllMediaPlayer();
          quizReset($scope);
        }
      });
    });

    $(".slideDotted > li").click(function(e){
    	playSound();
    });
  }

  function setSmile(){
    var smileEle = document.getElementsByClassName("smileSet");
    for(var i=0; i<smileEle.length; i++){
      var ele = smileEle[i].getElementsByClassName("smileBtn");
      for(var j=0; j<ele.length; j++){
        ele[j].addEventListener("click", function(e){
          var child = e.target.parentNode.children;
          for(var x=0; x<child.length; x++){
            if(child[x]!=e.target) child[x].classList.remove("on");
          }
          if(e.target.classList.contains("on")){
        	  e.target.classList.remove("on");
          }else{
        	  e.target.classList.add("on");
        	  playSound();
          }
        });
      }
    }
  }
  
  function setTab(){
    var $tab = $(".tabMenu li");
    var $tabList = $(".tabDetail li");

    $tabList.eq(0).addClass("on");
    $tab.eq(0).addClass("on");

    $tab.click(function(){
      var index = $(this).index();

      $tabList.removeClass("on");
      $tabList.eq(index).addClass("on");
      
      playSound();
			$(this).parents(".tabContent").find(".tabDetail > li").css("display", "none");
			$(this).parents(".tabContent").find(".tabDetail > li:eq(" + index + ")").css("display", "inline-block");
      $(this).parents(".tabContent").find(".tabMenu > li").removeClass("on");
      //$(this).parents(".tabContent").find(".tabList").removeClass("on");
      $(this).addClass("on");
			// select_motionObj(".tabContent .tabDetail > li:eq(" + index + ")");
			if (typeof resetAllMediaPlayer === 'function') resetAllMediaPlayer();
      quizReset($(this).parents(".tabContent"));
      $tabList.find(".audioWrap").css("z-index", 0);
      
      // 팝업 닫기
      $('.popWrap').removeClass('show');
		});
  }
  
  function setLayerPop(){
	  	$(".layerClickBtn .btnHand").on("click", function(){
			var btnIndex = $(this).parent().index();
			var targetPopup = ".layerPopup"
			$(this).parent().find(".btnHand").show();
			$(this).hide();
			$(targetPopup).find("li").hide();
			$(targetPopup).find("li").eq(btnIndex).show();
			// select_motionObj(targetPopup);
			$(".popCloseBtn").click();
		});
		$(".layerPopup .layerpopCloseBtn").on("click", function(){
			var btnIndex = $(this).parent().index();
			$(this).parent().hide();
			$(".layerClickBtn .btnHand").eq(btnIndex).show();
      if (typeof resetAllMediaPlayer === 'function' && !$(this).hasClass('noStop')) resetAllMediaPlayer();
		});
  }
  
  function setNewPop(){
	  var paramEle = document.createElement("input");
	  paramEle.setAttribute("id", "popParam");
	  document.getElementsByTagName("body")[0].appendChild(paramEle);
	  var newPopEle = document.getElementsByClassName("newPopBtn");
	    for(var i=0; i<newPopEle.length; i++){
	    	newPopEle[i].addEventListener("click", function(e){
	    		var popParam = e.target.getAttribute("data-popup");
	    		window.open("../../common/popup/music/music.html", "");
	    		document.getElementById("popParam").value = popParam;
	    	});
	    }
  }

  function addFeedSound(){
    $("body").append("<audio class='feedAudio_ok'><source src='../../common/media/feed_ok.mp3' type='audio/mpeg'></source></audio>");
    $("body").append("<audio class='feedAudio'><source src='../../common/media/feed_no.mp3' type='audio/mpeg'></source></audio>");
  }

  function tempAlert() {
    document.addEventListener('click', function(e) {
      var targetId = $(e.target).attr('id');
      if(targetId === 'navBtnHome' || targetId === 'navBtnToolShow' || targetId === 'chapterTxt') {
        alert('샘플에서는 제공하지 않습니다.');
      }
    });
  }

  function setBtnText(){
    $(".answerBtn").add(".inputBtn").each(function(){
      $(this).data("text", $(this).text());
    });
  }

  function getTargetPath(fn, opt) {
    var root = location.href.split('/').slice(-1)[0] === 'index.html' ? '../' : '../../../../';
    var grade = fn.split('_')[0];
    var chapter = grade +  '_' + fn.split('_')[1];
    var section = chapter + '_' + fn.split('_')[2];
    if(opt === 'index') {
      var targetPath = root + 'contents/' + chapter + '/' + section + '/' + fn;
    } else {
      var targetPath = root + grade + '/contents/' + chapter + '/' + section + '/' + fn;
    }
    return targetPath;
  }

  function getJsonData() {
    var data = jsonObj;
    return data;
  }

  function changePageStyle() {
    if(window.name === 'showNote') {  //노래 익히기 악보 보기 탭 선택시
      $('#contentContainer').css('margin-top', '-45px');
      $('#contentsWrap .detailWrap').css('height', '820px');
      var scrollContH = parseInt($('.contentsScroll').css('max-height'));
      $('.contentsScroll').css('max-height', scrollContH + 40 + 'px');
    } else {
      return;
    }
  }
  
  function quizReset($scope){
	  $scope.find(".answerBtn").each(function(){
      $(this).removeClass("replay");
      $(this).removeClass("btnRe");
		  $(this).text($(this).data("text"));
	  });
	  $scope.find(".inputBtn").each(function(){
		  $(this).removeClass("replay");
		  $(this).text($(this).data("text"));
	  });
	  $scope.find(".hideTxtBox").css("opacity", "1");
	  $scope.find(".inputTxt").val("");
	  $scope.find(".answerTxt").css({"display":"none", "opacity":"0"});
  }

  // 노래 익히기 탭 제어
  function controlLearnTab() {
    var $noteNav = $('#noteNav');
    var $viewDetailWrap = $('.viewDetailWrap');
    var $tabNoteList = $('.notesTabBtn');

    // 탭 클릭
    $noteNav.on('click', function(e) {
      var $target = $(e.target);

      resetAllMediaPlayer();

      $('.notesContent').children().hide();
      $(this).children().removeClass('on');
      $target.addClass('on');

      if ($target.hasClass('showMusic')) {
        $('#notesDetail_Music').show();
        $viewDetailWrap.hide();
      } else if ($target.hasClass('showNote')) {
        $('#notesDetail_Note').show();
        $viewDetailWrap.show();
      } else if ($target.hasClass('showSpeak')) {
        $('#notesDetail_Speak').show();
        $('.notesTabBtn li').removeClass('on');
        $('.notesTabBtn li:first-child').addClass('on');
        $('.notesTabDetail li').removeClass('on');
        $('.notesTabDetail li:first-child').addClass('on');
        $viewDetailWrap.hide();
      }
    });

    // 발성 연습 장조/단음 클릭
    $tabNoteList.on('click', function(e) {
      var $target = $(e.target);
      var titleDot = $(this).prev().find('.title.dot');
      var prevKeyAudio = null;

      resetAllMediaPlayer();

      $(this).children().removeClass('on');
      $target.addClass('on');

      if ($target.text() === '단음') {
        titleDot.text('단음 연습');

        // 단음 연습 건반 이벤트
        $('.pianoBtn > li').on('click', function(e) {
          var $key = $(e.target);
          var src = $key.data('audio');
          var keyAudio = document.createElement('audio');

          keyAudio.src = src;

          if (prevKeyAudio) {
            prevKeyAudio.currentTime = 0;
            prevKeyAudio.pause();
          }
          keyAudio.play();
          prevKeyAudio = keyAudio;

          $(this).children().removeClass('on');
          $key.addClass('on');
          setTimeout(function() {
            $key.removeClass("on");
          }, 500);
        });
      } else {
        titleDot.text('장조 연습');
      }

      $('.notesTabDetail li').removeClass('on');
      $('.notesTabDetail li').eq($target.index()).addClass('on');
    })
  }

  return {
    //open api
    setScale: setScale,
    requestData: requestData,
    parseData: parseData,
    appendNav: appendNav,
    showLayerPop: showLayerPop,
    showText: showText,
    showInputText: showInputText,
    setScroll: setScroll,
    setBtnAudio: setBtnAudio,
    setDownBtn: setDownBtn,
    addFeedSound: addFeedSound,
    tempAlert: tempAlert,
    setBtnText: setBtnText,
    setSlide: setSlide,
    setSmile: setSmile,
    setTab: setTab,
    setLayerPop: setLayerPop,
    setNewPop: setNewPop,
    loadScript: loadScript,
    getJsonData: getJsonData,
    changePageStyle: changePageStyle,
    controlLearnTab: controlLearnTab
  };
}();
