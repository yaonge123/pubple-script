$(document).ready(function () {
  'use strict';
  var navList = DATA.chapterInfo;

  setScale();
  createChapter(navList);
  appendContents(navList);
  clickMenu(navList);
  pageMove(); // 견본 이동
  window.addEventListener("resize", setScale, true);

  document.getElementsByClassName("botIcon1")[0].parentNode.addEventListener("click", function () {
    parent.viewer.openProgress();
  });

  document.getElementsByClassName("botIcon2")[0].parentNode.addEventListener("click", function () {
    parent.viewer.openPDF();
  });

  document.getElementsByClassName("botIcon3")[0].parentNode.addEventListener("click", function () {
    // if(parent.viewer!=undefined && typeof parent.viewer.link!=="undefined")
    // 	parent.viewer.openDataStorage();
    // else
    window.open("../contents/common/popup/data/data.html", "");
  });

  document.getElementsByClassName("botIcon4")[0].parentNode.addEventListener("click", function () {
    // if(parent.viewer!=undefined && typeof parent.viewer.link!=="undefined")
    // 	parent.viewer.openPlayInstrument();
    // else
    //	window.open("../contents/common/popup/music/music.html", "");

    alert("정식 서비스에서 제공됩니다.");

  });

  document.getElementsByClassName("botIcon5")[0].parentNode.addEventListener("click", function () {
    // if(parent.viewer!=undefined && typeof parent.viewer.link!=="undefined")
    // 	parent.viewer.link("open", "http://www.m-teacher.co.kr");
    // else
    window.open("http://www.m-teacher.co.kr", "");
  });

  $('.nav3 ul li, .mainBottom ul li').hover(function () {
    $(this).find('.iconOver').stop().animate({ "opacity": "1" }, 300, function () {
      $(this).parent().css('background-size', 0);
    });
  }, function () {
    $(this).find('.iconOver').parent().css('background-size', '100%');
    $(this).find('.iconOver').stop().animate({ "opacity": "0" }, 300);
  });
});

function createChapter(navList) {
  var nav = $(".nav1");
  var chapEle = "<ul>";
  var i = 0;
  var chapter, sample;

  for (; i < navList.length; i++) {
    chapter = navList[i];
    sample = chapter.sample;

    chapEle += "<li>" + chapter.title;
    if (sample) chapEle += "<span class='sample'>샘플</span></li>";
    else chapEle += "</li>";
  }
  chapEle += "</ul>";
  nav.append(chapEle);
}

function appendContents(navList, idx) {
  var nav = $(".nav2");
  var liEle = "<div class='contentsScroll' data-scroll-size='400, 460'><div class='scrollDetail'>";
  var i = 0;
  var chapter, unit, section, sample, sec, j;

  if (idx) chapter = navList[idx].unit;
  else chapter = navList[0].unit;

  for (; i < chapter.length; i++) {
    unit = chapter[i];
    section = unit.section;
    j = 0;

    liEle += "<h2 class='pageMove on'";

    liEle += "data-page='" + unit.page + "'>" + unit.title + "</h2><ul>";

    for (; j < section.length; j++) {
      sec = section[j];
      sample = sec.sample;

      liEle += "<li class='pageMove' data-page='" + sec.page + "'><span class='pageNum'>" + sec.number + "P</span> " + sec.title;

      if (sample) liEle += "<span class='sample'>샘플</span></li>";
      else liEle += "</li>";
    }
    liEle += "</ul>";
  }

  liEle += "</div></div>";
  nav.append(liEle);
}

function clickMenu(navList) {
  var menu = $(".nav1 li");
  var nav = $(".nav2");

  menu.on("click", function () {
    var $this = $(this);
    var idx = menu.index($this);

    if ($this.hasClass("none")) return;
    else {
      nav.children().remove();
      appendContents(navList, idx);
    }
  });
}

function pageMove() {
  var defaultPage = "4"
  var defaultPopup = Number(defaultPage) + 4;

  $('.pageMove').on('click', function () {
    var pageNum = $(this).attr("data-page");

    defaultPage = pageNum;
    defaultPopup = Number(pageNum) + 4;

    $(".pageMove").removeClass("on");
    $(this).addClass("on");
  });

  $('#ebook').on('click', function () { // e-Book 수업 
    parent.viewer.gotoPage(defaultPage)
  });

  $('#ppt').on('click', function () { // 수업 PPT
    if (defaultPopup == 8) defaultPopup = "08"
    var popUrl = "../contents/m01/m01_" + defaultPopup + "_01.html"
    parent.viewer.link("popup", popUrl);
  });
}

function setScale() {
  var targetEle = document.getElementById("contentContainer");
  var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  var hRatio = windowWidth / targetEle.clientWidth;
  var vRatio = windowHeight / targetEle.clientHeight;

  setTransform(targetEle, hRatio, vRatio);
  function setTransform(targetEle, hRatio, vRatio) {
    targetEle.setAttribute("style", "-ms-transform: scale(" + hRatio + "," + vRatio + ");"
      + "-webkit-transform: scale(" + hRatio + "," + vRatio + ");" + "transform: scale(" + hRatio + "," + vRatio + ");"
      + "transform-origin: 0% 0%; -webkit-transform-origin: 0% 0%; -ms-transform-origin: 0% 0%;");
  }
}