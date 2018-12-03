
document.addEventListener("DOMContentLoaded", initMain);

function initMain() {
    var lesson = $(".middle_menu .detail");
    var chapter = $(".unit_over li");
    var unitCont = $(".unit_content .list_detail");
    var data = DATA.listInfo;
    var subject = "초등학교 음악6";

    setScale();
    setChapter(0, "type1");
    parent.viewer.syncPageViewGA("메인+"+ subject);
    window.addEventListener("resize", setScale, true);

    // 차시별 수업
    $(".top_btn_01").on("click", function () {
        $(".popWrap").addClass("show");
        parent.viewer.syncEventGA("메인","차시별 수업",subject);
    });

    // 진도 바로가기
    $(".top_btn_02").on("click", function () {
        parent.viewer.syncEventGA("메인","진도 바로가기",subject);
        parent.viewer.openProgress();
    });

    // 즐거운 수업
    $(".top_btn_03").on("click", function() {
        parent.viewer.syncEventGA("메인","즐거운 수업",subject);
        window.open("../data/enjoy_study.pdf", "_blank");
    });

    // 자료실
    $(".top_btn_04").on("click", function() {
        parent.viewer.syncEventGA("메인","자료실",subject);
        window.open("../contents/common/popup/data/data.html", "");
        // parent.viewer.openDataStorage();
    });

    // 비바샘 바로가기
    $(".top_btn_shortcut ").on("click", function () {
        window.open("http://www.vivasam.com/", "");
        parent.viewer.syncEventGA("메인","비바샘",subject);
    });

    // 사용 설명서
    $(".top_btn_manual").on("click", function() {
        $(".alertMessage").addClass("show");
        parent.viewer.syncEventGA("메인","사용 설명서",subject);
    });

    // 업데이트
    $(".top_btn_update").on("click", function() {
        $(".alertMessage").addClass("show");
        parent.viewer.syncEventGA("메인","업데이트",subject);
    });

    // 페이지 이동
    $(".go").on("click", function() {
        var page = $(".cur").val();
        parent.viewer.gotoPage(page);
    });

    // 페이지 입력 후 엔터 입력
    $(".cur").on("keyup", function (e) {
        if (e.keyCode === 13) {
            $(".go").trigger("click");
        }
    });

    // 숫자만 입력
    $(".cur").on("keypress", function (e) {
        var keycode = e.keyCode;

        if (keycode < 47 || keycode > 57) {
            return false;
        }
    });

    // 숫자외 제거
    $(".cur").on("keyup", function (e) {
        var $this = $(this);
        var inputVal = $this.val();

        $this.val(inputVal.replace(/[^0-9]/gi, ""));

        if (inputVal > 121) {
            alert("존재하지 않는 페이지입니다.");
            $this.val("");
        }
    });

    // 팝업창 닫기
    $(".popWrap .btnClose").on("click", function () {
        $(".popWrap").removeClass("show");
    });


    // 단원 선택
    $(".middle_list li").on("click", function() {
        var list = $(this);
        var lessonTitle = list.text();
        var idx = $(".middle_list li").index(list);

        $(".middle_list li.on").removeClass("on");
        list.addClass("on");
        lesson.hide();
        lesson.eq(idx).find(".title").text(lessonTitle);
        lesson.eq(idx).show();
    });

    // 버튼 클릭시, arrow 에 on 클래스 추가
    $(".unit_list_btn").on("click", function() {
        var $this = $(this);
        var $unitOver = $this.next(".unit_over");
        var arrowLi = $this.find(".unit_list_arrow");

        if (arrowLi.hasClass("on")) {
            arrowLi.removeClass("on");
            $unitOver.removeClass("show");
        } else {
            $(".unit_list_arrow.on").removeClass("on");
            $(".unit_over").removeClass("show");

            arrowLi.addClass("on");
            $unitOver.addClass("show");
        }
    });

    // 소단원 선택
    $(".list li").on("click", pageMove);

    //리스트 클릭 시, 페이지 이동
    chapter.on("click", changeChapter);

    function changeChapter() {
        var list = $(this);
        var menuTxt = list.text();
        var unitList = list.parents(".unit_list");
        var unitTxt = unitList.find(".unit_list_txt");
        var unitOver = unitList.find(".unit_over li");
        var chapIdx, unitIdx;

        unitList.find(".unit_over").removeClass("show");
        unitList.find(".unit_list_arrow").removeClass("on");
        unitTxt.text(menuTxt);

        if (unitList.hasClass("type1")) {
            unitOver.removeClass("on");
            list.addClass("on");
            chapIdx = unitOver.index(list);

            setChapter(chapIdx, "type1");
        } else if (unitList.hasClass("type2")){
            chapIdx = $(".unit_over li.on").index();
            unitIdx = unitOver.index(list);
            
            setChapter(chapIdx, unitIdx);
        }
    }

    function setChapter(idx, op) {
        var chapter, unit, section, sec, secTitle;
        var chapTxt = $(".unit_list_txt").eq(1);
        var title = "", content ="", sen = "";
        var i = 0; j = 0, k = 0, listNum = 0;

        unitCont.children().remove();
        
        for(; i < data.length; i++) {
            if (idx === i){
                chapter = data[i];
                unit = chapter.unit;

                if (op === "type1") {
                    list = $(".unit_over").eq(1);
                    
                    list.find("li").remove();
                    section = unit[0].section;

                    chapTxt.text("1. " + unit[0].title);
                    if (unit) {
                        for (; j < unit.length; j++) {
                            title += "<li>" + (j + 1) + ". " + unit[j].title + "</li>";
                        }
                    }
                    list.append(title);
                    list.find("li").bind("click", changeChapter);
                } else {
                    section = unit[op].section;
                }

                if (section) {
                    for(; k < section.length; k++) {
                        sec = section[k];

                        if (k === 1) sen = "</ul></li>";

                        if (secTitle === sec.title) {
                            if (section[k + 1] && secTitle !== section[k + 1].title) content += "<li data-page='"+ sec.file +"'>" + sec.desc + "</li>";
                            else content += "<li data-page='"+ sec.file +"'>"+ sec.desc +"</li>";
                        } else {
                            content += sen + "<li><div class='unit_list_icon'>"+ sec.title +"</div><ul class='list_detail_txt'><li data-page='"+ sec.file +"'>" + sec.desc + "</li>";
                        }

                        secTitle = sec.title;
                    }
                }
            }
        }
        
        unitCont.append(content);
        unitCont.find(".list_detail_txt li").bind("click", pageMove);
    }

    function pageMove () {
        var page = $(this).attr("data-page");

        if (page) {
            if ($.isNumeric(page)) {
                var clickLi = $(this);
                var $detail = clickLi.parents(".detail");
                var title = $detail.find(".title").text();

                parent.viewer.gotoPage(page);
                parent.viewer.syncEventGA("메인","목차",subject +"+"+ title +"+"+ clickLi.text());
            } else {
                $(".popWrap").removeClass("show");
                parent.viewer.link("popup", "../contents/"+ page.split("_")[0] + "/" + page);
            }
        }
    }

    function setScale() {
        var targetEle = document.getElementById("wrap");
        var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        hRatio = windowWidth / targetEle.clientWidth;
        vRatio = windowHeight / targetEle.clientHeight;

        setTransform(targetEle, hRatio, vRatio);
        function setTransform(targetEle, hRatio, vRatio) {
            targetEle.setAttribute("style", "-ms-transform: scale(" + hRatio + "," + vRatio + ");"
                + "-webkit-transform: scale(" + hRatio + "," + vRatio + ");" + "transform: scale(" + hRatio + "," + vRatio + ");"
                + "transform-origin: 0% 0%; -webkit-transform-origin: 0% 0%; -ms-transform-origin: 0% 0%;");
        }
    }
}
