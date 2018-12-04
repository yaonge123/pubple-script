//create namespace
var PUBPLE = PUBPLE || {};

//namespace metadata


PUBPLE.modules = function() {
  'use strict';
  //dependencies

  //private member
  var jsonObj = dataObj;
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

  var isTouchDevice = "ontouchstart" in document.documentElement;

  //public method
  function loadScript(url) {
    var scriptTag = '<script src=' + url + '></script>';
    $('head').append(scriptTag);
  }

  function setScale() {
    console.log('call setScale');
    var targetEle = document.getElementById('contentContainer');
    var windowWidth = window.parent.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var windowHeight = window.parent.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    hRatio = windowWidth / targetEle.clientWidth;
    vRatio = windowHeight / targetEle.clientHeight;

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
    var navHtml = '<div id="topNav">' +
      '<div id="chapterInfo">' +
        '<p id="chapterTxt"></p>' +
        '<p id="subchapterTxt"></p>' +
      '</div>' +

      '<div id="navPageInfo">' +
        '<div id="navPageTxt"></div>' +
        '<button id="navBtnHome">홈</button>' +
      '</div>' +
    '</div>' +

      '<div id="bookIdx" class="idxBox">' +
        '<div class="idxBoxTitle">제재곡</div>' +
        '<div class="contentsScroll" data-scroll-size="725, 980">' +
          '<ul class="depth1 scrollDetail">' +
          '</ul>' +
        '</div>' +
        '<button id="bICloseBtn" class="idxBoxClose" title="닫기">닫기</button>' +
      '</div>' +

      '<div id="learnIdxWrap">' +
        '<button id="learnIdxBtn">학습 목차</button>' +
        '<div id="learnIdx" class="idxBox">' +
          '<div class="idxBoxTitle">학습 목차</div>' +
          '<div class="contentsScroll" data-scroll-size="725, 980">' +
            '<ul class="depth1 scrollDetail">' +
            '</ul>' +
          '</div>' +
          '<button id="lICloseBtn" class="idxBoxClose" title="닫기">닫기</button>' +
        '</div>' +
      '</div>' +

      '<div id="bottomNav">' +
        '<div id="navIndexWrap">' +
          '<ul id="navIndexList">' +
          '</ul>' +
        '</div>' +
        '<div id="navToolDataWrap">' +
          '<button id="navBtnToolData" title="자료실">자료실</button>' +
        '</div>' +
        '<div id="navToolWrap">' +
          '<button id="navBtnToolShow">학습 도우미</button>' +
          '<div id="navToolShow">' +
            '<ul id="navToolBtn">' +
              '<li><button id="navBtnToolMusic" title="악기 연주법">악기 연주법</button></li>' +
              '<li><button id="navBtnToolPen" title="그리기">그리기</button></li>' +
              '<!--<li><button id="navBtnToolWrite" title="판서">판서</button></li>-->' +
                '<li><button id="navBtnToolTimer" title="타이머">타이머</button></li>' +
              '<li><button id="navBtnToolHelp" title="발표 도우미">발표 도우미</button></li>' +
              '<li><button id="navBtnToolFocus" title="주목">주목</button></li>' +
              '<!--<li><button id="navBtnToolPrint" title="인쇄">인쇄</button></li>-->' +
            '</ul>' +
          '</div>' +
        '</div>' +
        '<div id="navPageWrap">' +
          '<button id="navBtnPrev" class="pagemoveBtn" title="이전">이전</button>' +
          '<div id="pageNum"><span id="curPage">1</span>/<span id="totalPage">5</span></div>' +
          '<button id="navBtnNext" class="pagemoveBtn" title="다음">다음</button>' +
        '</div>' +
      '</div>';
    // document.getElementById('navWrap').innerHTML = this.responseText;
    document.getElementById('navWrap').innerHTML = navHtml;

    setNav();
    
    document.getElementById("navPageTxt").addEventListener("click", function () {
      parent.viewer.link('close', '');
      // parent.viewer.gotoPage(parseInt(this.innerText.substring(4, 6)));
      parent.viewer.gotoPage(4);
    });
    
    document.getElementById("navBtnHome").addEventListener("click", function(){
      parent.viewer.link('close', 'main');
    });
    
    document.getElementById("navBtnToolData").addEventListener("click", function(){
      window.open("../../common/popup/data/data.html", "");
    });
    
    document.getElementById("navBtnToolMusic").addEventListener("click", function(){
    	window.open("../../common/popup/music/music.html", "");
    });
    
    document.getElementById("navBtnToolPen").addEventListener("click", function(){
      document.getElementById('navToolShow').style.display = 'none';
      parent.viewer.openDrawer();
    });

    // document.getElementById("navBtnToolWrite").addEventListener("click", function(){
    // 	alert("뷰어 기능으로 제공예정입니다.");
    // });
    
    document.getElementById("navBtnToolTimer").addEventListener("click", function(){
    	window.open("../../common/popup/timer/timer.html", "");
    });
    
    document.getElementById("navBtnToolHelp").addEventListener("click", function(){
    	window.open("../../common/popup/makedo/sikimi.html", "");
    });
    
    document.getElementById("navBtnToolFocus").addEventListener("click", function(){
    	window.open("../../common/popup/focus/helper.html", "");
    });
    
    // document.getElementById("navBtnToolPrint").addEventListener("click", function(){
    // 	alert("뷰어 기능으로 제공예정입니다.");
    // });
  }

  function setNav() {
    var chDataArr = jsonObj.chapter;
    var chapterLen = chDataArr.length;
    var secDataArr = [];
    var sectionLen = 0;
    var curChData = jsonObj.chapter[chapterNum];
    var sectionData = curChData.section[sectionNum];
    var curChTitle = curChData.title;
    var curSecTitle = sectionData.secTitle;
    var bookPageTxt = "";

    subData = sectionData.sub;
    totalPage = sectionData.totalPage;
    curPage = sectionData.sub[subNum].curPage;

    if(chapterNum==appendix) bookPageTxt = '교과서 ' + sectionData.sub[subNum].page + '쪽 가기';
    else bookPageTxt = '교과서 ' + sectionData.bookPage + '~' + (sectionData.bookPage + 1) + '쪽 가기';

    var chTitle = '', secTitle = '';
    var bookDepEle1 = document.querySelector('#bookIdx .depth1');
    var bookDepEle2, chList;
    var filename = '', targetPath = '';
    var addOn = '', displayOn = '';
    var navIdxLen = sectionData.navIdxLen;
    var navIdxList = '';
    var subTitle = '';
    var learnDep1 = document.querySelector('#learnIdx .depth1');
    var subLen = subData.length;
    var tmpIdx, descCnt, learnDep2, desc;
    var descArr = [];
    var subTitleArr = [];
    var targetPathArr = [];
    var subDataLen = subData.length;
    var bookIdxEle = document.getElementById('bookIdx');
    var learnIdxEle = document.getElementById('learnIdx');
    var navToolEle = document.getElementById('navToolShow');


    //append text to navigation bar
    if(curChTitle === '부록') document.getElementById('chapterTxt').innerText = curChTitle + ' - ' + curSecTitle;
    //else document.getElementById('chapterTxt').innerText = curChData.num + '단원. ' + curChTitle; 
	  else document.getElementById('chapterTxt').innerText = '2단원 - ' + curChTitle; // - 최종경 : 견본 단원명 고정 

    if(curChTitle === '부록') document.getElementById('subchapterTxt').innerHTML = sectionData.sub[subNum].subTitle;
    else document.getElementById('subchapterTxt').innerHTML = curSecTitle;
    document.getElementById('navPageTxt').innerText = bookPageTxt;
    document.getElementById('totalPage').innerText = totalPage;
    document.getElementById('curPage').innerText = curPage;

	//  - 최종경 : 견본 주석 처리  
  //   //create index table
  //   for(var i = 0; i < chapterLen; i++) {
  //     var tmp = "";
  //     // if(i==appendix) tmp = " style='display:none;'";
  //     secDataArr = chDataArr[i].section;
  //     sectionLen = secDataArr.length;
  //     // addOn = chapterNum === i ? 'on' : '';
  //     // displayOn = chapterNum === i ? 'inline-block' : 'none;';
  //     if(i === appendix) {
  //       var apxSec = chDataArr[i].section;
  //       var apxSecLen = apxSec.length;
  //       for(var l = 0; l < apxSecLen; l++) {
  //         chTitle = chDataArr[i].title + ' - ' + apxSec[l].secTitle;
  //         bookDepEle1.innerHTML += '<li' + tmp + '><a href="#">' + chTitle +'</a><div class="depth2" style="display:' + displayOn +'"><ul></ul></div></li>';
  //       }
  //     } else {
  //       chTitle = (i + 1) + '단원. ' + chDataArr[i].title;
  //       bookDepEle1.innerHTML += '<li' + tmp + '><a href="#">' + chTitle +'</a><div class="depth2" style="display:' + displayOn +'"><ul></ul></div></li>';
  //     }
  //     bookDepEle2 = bookDepEle1.querySelectorAll('ul');

  //     for(var j = 0; j < sectionLen; j++) {
  //       // addOn = chapterNum === i && sectionNum === j ? 'on' : '';
  //       if(chDataArr[i].title === '부록') {
  //         var apxSubLen = secDataArr[j].sub.length;
  //         for(var m = 0; m < apxSubLen; m++) {
  //           secTitle = secDataArr[j].sub[m].subTitle;
  //           filename = secDataArr[j].sub[m].fileName;
  //           targetPath = getTargetPath(filename);
  //           bookDepEle2[i + j].innerHTML += '<li><a href="' + targetPath + '">' + secTitle + '</a></li>';
  //         }
  //       } else {
  //         secTitle = secDataArr[j].secTitle;
  //         filename = secDataArr[j].sub[0].fileName;
  //         targetPath = getTargetPath(filename);
  //         bookDepEle2[i].innerHTML += '<li><a href="' + targetPath + '">' + secTitle + '</a></li>';
  //       }
  //     }
  //   }
    document.getElementById('chapterTxt').addEventListener('click', function() {
        // bookIdxEle.style.display = 'inline-block';
        // playSound();
      alert('정식 서비스에서 제공됩니다.');
    });
  //   document.getElementById('bICloseBtn').addEventListener('click', function() {
  //     bookIdxEle.style.display = 'none';
  //   });

    //create list element for bottom navigation
    for(var i = 0; i < subDataLen; i++) {
      subTitle = subData[i].subTitle;
      filename = subData[i].fileName;
      if(i !== 0 && subTitle === subData[i - 1].subTitle) {
        continue;
      }
      subTitleArr.push(subTitle);
      targetPathArr.push(filename);
    }
    
    var kk = 0;
    var tmp = "";
    var listSub = '';

    if(chapterNum==appendix) tmp = " style='display:none;'";
	
    for(var i = 0; i < navIdxLen; i++) {
      targetPath = getTargetPath(targetPathArr[i]);

      // 전개의 경우 서브리스트 생성
      if (subTitleArr[i] === "전개") {
        for (var n = 0; n <= totalPage - navIdxLen; n++) {
          listSub += '<li>전개' + (n + 1) + '</li>';
        }
        navIdxList += '<li' + tmp + '>' + subTitleArr[i] + '<ul id="navIndexListSub">' + listSub + '</ul></li>';
      } else {
        navIdxList += '<li' + tmp + '>' + subTitleArr[i] + '</li>';
      }
      
      document.getElementById('navIndexList').innerHTML = navIdxList;

      //create learning index
      learnDep1.innerHTML += '<li><a href="' + targetPathArr[i]  +'">' + subTitleArr[i] +'</a><div class="depth2"><ul></ul></div></li>';
      descCnt = 0;
      learnDep2 = learnDep1.querySelectorAll('ul');
      for(var j = 0; j < subLen; j++) {
        if(subData[j].subTitle === subTitleArr[i]) {
          descCnt++;
        }
        descArr[j] = subData[j].desc;
      }
      tmpIdx = i;

      for(var k = 0; k < descCnt; k++) {
        tmpIdx = tmpIdx === navIdxLen - 1 ? subLen - 1 : tmpIdx;
        desc = descArr[k + kk];
        filename = subData[k + kk].fileName;
        targetPath = getTargetPath(filename);
        addOn = (k + kk) === (curPage - 1) ? 'on' : '';
        learnDep2[i].innerHTML += '<li><a href="' + targetPath + '" class="' + addOn + '">' + desc + '</a></li>';
      }
      kk += descCnt;
    }
    document.getElementById('learnIdxBtn').addEventListener('click', function() {
        // learnIdxEle.style.display = 'inline-block';
      alert('정식 서비스에서 제공됩니다.');
    });
    document.getElementById('lICloseBtn').addEventListener('click', function() {
      learnIdxEle.style.display = 'none';
    });

    //bind click handler for bottom navigation
    var navIndexList = document.querySelectorAll('#navIndexList > li');
    var indexListArr = [];
    var targetIdx = 0;
    var targetFile = '';
    var curFile = location.href.split('/').slice(-1)[0];

    for(var i = 0; i < navIdxLen; i++) {
      indexListArr[i] = navIndexList[i];
      // 전개 마우스오버
      if (!isTouchDevice && navIndexList[i].firstElementChild) {
        navIndexList[i].addEventListener('mouseover', function() {
          this.firstElementChild.style.display = "inline-block";
        });
        navIndexList[i].addEventListener('mouseout', function () {
          this.firstElementChild.style.display = "none";
        });
      } else {
        navIndexList[i].addEventListener('click', function () {
          var subDisplay = this.firstElementChild.style.display;
          if (subDisplay === "none" || !subDisplay) {
            this.firstElementChild.style.display = "inline-block";
          } else {
            this.firstElementChild.style.display = "none";
          }
        });
      }
      
      navIndexList[i].addEventListener('click', function(e) {
        var target = e.target;

        if (target.textContent.indexOf("전개") !== -1) return;

        targetIdx = indexListArr.indexOf(target);
        if(targetIdx === navIdxLen - 1) {
          targetIdx = subData.length - 1;
        }
        tmpIdx = targetIdx;
        while(target.innerText !== subData[tmpIdx].subTitle) {
          tmpIdx++;
        }
        targetIdx = tmpIdx;
        targetFile = subData[targetIdx].fileName;
        location.href = location.href.replace(curFile, targetFile);
      });
    }
    subTitle = subData[curPage - 1].subTitle;
    for(var i = 0; i < navIdxLen; i++) {
      
      if (navIndexList[i].innerText === subTitle || (navIndexList[i].innerText.indexOf("전개") !== -1 && subTitle === "전개")) {
        navIndexList[i].className += " " + 'on';

        if (subTitle === "전개") {
          var curSub = curPage - i;
          navIndexList[i].querySelector("li:nth-of-type(" + curSub + ")").className = "on";
        }
      }
    }

    // 전개 하위 목록 클릭
    var courseSubList = document.getElementById("navIndexListSub");
    courseSubList.addEventListener("click", function(e) {
      var target = e.target;
      var idx = target.innerText.substring(2) - 1;
      var subDataObj;
      var targetPage, firstPage, firstFile;
      
      if (target.id === "navIndexListSub") {
        idx = 0;
      }
      
      for (var i = 0; i < totalPage; i++) {
        subDataObj = subData[i];
        if (subDataObj.subTitle === "전개") {
          firstPage = subDataObj.curPage;
          firstFile = subDataObj.fileName;
          break;
        }
      }

      targetPage = firstFile.replace(firstPage + ".html", firstPage + idx + ".html");
      location.href = location.href.replace(curFile, targetPage);
    });

    //bind click handler for Learning assistant
    document.getElementById('navBtnToolShow').addEventListener('click', function() {
      if(navToolEle.style.display === 'inline-block') {
        navToolEle.style.display = 'none';
      } else {
      navToolEle.style.display = 'inline-block';
      }
    });

    //bind click prev/next button
    var pagemoveBtn = document.querySelectorAll('.pagemoveBtn');
    for(var i = 0; i < 2; i++) {
      pagemoveBtn[i].addEventListener('click', function (e) {
        var id = e.target.id;
        pageMove(id);
      });
    }
  }

  function pageMove(id) {
    // console.log('call pageMove curPage: ' + curPage + ' / totalPage: ' + totalPage);
    var curHref =  location.href;
    var curFilename = subData[curPage - 1].fileName;
    var moveFilename = '';

    if(id === 'navBtnNext') {
      if(curPage === totalPage) {
        return;
      } else {
        curPage += 1;
        moveFilename = subData[curPage - 1].fileName;
        location.href = curHref.replace(curFilename, moveFilename);
      }
    } else {
      if(curPage === 1) {
        return;
      } else {
        curPage -= 1;
        moveFilename = subData[curPage - 1].fileName;
        location.href = curHref.replace(curFilename, moveFilename);
      }
    }
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
        var svgObj = popEle.querySelector('.note_svg');

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
        select_motionObj("#" + popEle.getAttribute("id"));
        if (typeof resetAllMediaPlayer === 'function') resetAllMediaPlayer();
        $(".layerPopup .layerpopCloseBtn").click();

        // svg object display 처리
        if (svgObj) {
          svgObj.parentElement.style.display = 'inline-block';
        }
      });
    }

    for(var i=0; i<popCloseBtn.length; i++){
      popCloseBtn[i].addEventListener('click', function(e) {
        var secondary = false;  //팝업에서 다른 팝업 열었는지 확인하기 위한 flag
        var popSiblings = $(e.target).parents(".popupBg").siblings();
        var closeAll = false;
        var svgObj = this.parentElement.querySelector('.note_svg');

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
        $(".slideDotted li").removeClass("on");
        $scope.find(".slideDotted > li:eq(0)").addClass("on");
        quizReset($scope);

        // svg object display 처리
        if (svgObj) {
          svgObj.parentElement.style.display = 'none';
        }
      });
    }
  }

  function showText() {
    var $showBtn = $('.showBtn');
    var $answerBtn = $('.answerBtn');
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
      var textVal = $target.data("text");

      if($target.hasClass("answerBtn")){
    	$hideTxtBox = $("." +  $target.data("target") + " .hideTxtBox");
        if($target.hasClass("replay")) $target.text(textVal);
        else $target.text('다시 풀기');
        $target.toggleClass('replay');
        $('.popupTxtContent').toggleClass('on');
        opacity = $target.hasClass("replay") ? 0 : 1;
        
      }else{
    	$hideTxtBox = $(this).parent().find('.hideTxtBox');
        opacity = parseInt($hideTxtBox.css('opacity'), 10);
        opacity = opacity ? 0 : 1;
      }

      if($target.is("button")) $target.attr("disabled", true);
      else $target.off("click");

      if($hideTxtBox.length==0){
        setBtnEvent();
      }else{
        $hideTxtBox.each(function(index){
          $(this).animate({
              'opacity': opacity
            },
            {
              duration: 300,
              complete: function(){
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

        if($target.hasClass('answerNote')) note = '.popSylcont.showBtn';
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

	    document.getElementById('contentContainer').appendChild(audioEle);
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
        select_motionObj(".slideContests:eq(" + index + ") > li:nth-child(" + neviNum + ")");
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
          select_motionObj(".slideContests:eq(" + index + ") > li:nth-child(" + (imgNum-1) + ")");
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
          select_motionObj(".slideContests:eq(" + index + ") > li:nth-child(" + (imgNum+1) + ")");
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
	  $(".tabMenu li").click(function(){
		  	playSound();
			var index = $(this).index();
			$(this).parents(".tabContent").find(".tabDetail > li").css("display", "none");
			$(this).parents(".tabContent").find(".tabDetail > li:eq(" + index + ")").css("display", "inline-block");
			$(this).parents(".tabContent").find(".tabMenu > li").removeClass("on");
			$(this).addClass("on");
			select_motionObj(".tabContent .tabDetail > li:eq(" + index + ")");
			if (typeof resetAllMediaPlayer === 'function') resetAllMediaPlayer();
			quizReset($(this).parents(".tabContent"));
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
			select_motionObj(targetPopup);
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
      $('#contentsWrap .detailWrap').css('height', '960px');
      var scrollContH = parseInt($('.contentsScroll').css('max-height'));
      $('.contentsScroll').css('max-height', scrollContH + 40 + 'px');
    } else {
      return;
    }
  }
  
  function quizReset($scope){
	  $scope.find(".answerBtn").each(function(){
		  $(this).removeClass("replay");
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

  function getDeviceType(){
    return isTouchDevice;
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
    getDeviceType: getDeviceType
  };
}();