
document.addEventListener("DOMContentLoaded", initMain);

function initMain() {
    var lesson = $(".middle_menu .detail");
    var unitOver = $(".unit_over");
    var chapter = $(".unit_over li");
    var unitCont = $(".unit_content .list_detail");
    var data = DATA.listInfo;
    var subject = "초등학교 체육5";

    setScale();
    setChapter(0, "main");
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
        parent.viewer.openProgress();
        parent.viewer.syncEventGA("메인","진도 바로가기",subject);
    });

    // 즐거운 수업
    $(".top_btn_03").on("click", function() {
        window.open("../data/enjoy_study.pdf", "_blank");
        parent.viewer.syncEventGA("메인","즐거운 수업",subject);
    });

    // 자료실
    $(".top_btn_04").on("click", function() {
        window.open("../contents/common/popup/data/data.html", "");
        parent.viewer.syncEventGA("메인","자료실",subject);
        parent.viewer.openDataStorage();
    });

    // 비바샘 바로가기
    $(".top_btn_shortcut ").on("click", function () {
        window.open("http://www.vivasam.com/", "");
        parent.viewer.syncEventGA("메인","비바샘",subject);
    });

    // 사용 설명서
    $(".top_btn_manual").on("click", function() {
        parent.viewer.syncEventGA("메인","사용 설명서",subject);
        alert("스마트 교수자료 정식 버전에서 제공할 예정입니다.");
    });

    // 업데이트
    $(".top_btn_update").on("click", function() {
        parent.viewer.syncEventGA("메인","업데이트",subject);
        alert("스마트 교수자료 정식 버전에서 제공할 예정입니다.");
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
        var subTitleArr = ["[성장과 건강 체력]", "[거리 도전]", "[필드형 경쟁]", "[민속 표현]", "[응급 처치와 빙상·설상 안전]"];

        $(".middle_list li.on").removeClass("on");
        list.addClass("on");
        lesson.find(".title").text(lessonTitle + " " + subTitleArr[idx]);
        setChapter(idx, "main");
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
        var unitOverLi = unitList.find(".unit_over li");
        var chapIdx, unitIdx, subIdx;

        unitList.find(".unit_over").removeClass("show");
        unitList.find(".unit_list_arrow").removeClass("on");
        unitTxt.text(menuTxt);

        if (unitList.hasClass("type1")) {
            unitOverLi.removeClass("on");
            list.addClass("on");
            chapIdx = unitOverLi.index(list);

            setChapter(chapIdx, "type1");
        } else if (unitList.hasClass("type2")){
            chapIdx = unitOver.eq(0).find("li.on").index();
            unitIdx = unitOverLi.index(list);

            unitOverLi.removeClass("on");
            list.addClass("on");
            
            setChapter(chapIdx, "type2", unitIdx);
        } else {
            chapIdx = unitOver.eq(0).find("li.on").index();
            unitIdx = unitOver.eq(1).find("li.on").index();
            subIdx = unitOverLi.index(list);

            setChapter(chapIdx, "type3", unitIdx, subIdx);
        }
    }

    function setChapter(dataIdx, op, unitIdx, subIdx) {
        var chapter, unit, category, section, sec, secTitle;
        var sub, subSection;
        var chapTxt = $(".unit_list_txt").eq(1);
        var subTxt = $(".unit_list_txt").eq(2);
        var title = "", subTitle ="", content ="", sen = "";
        var i = 0; j = 0, k = 0, n = 0, m = 0, listNum = 0; 
        var list, subList;
        var li, file, pageNum, event;

        unitCont.children().remove();
        
        for(; i < data.length; i++) {
            if (dataIdx === i){
                chapter = data[i];
                unit = chapter.unit;

                if (op === "type1" || op === "main") {
                    if (op === "main") list = $(".detail .list");
                    else list = $(".unit_over").eq(1);

                    list.find("li").remove();
                    sub = unit[0].sub;
                    section = unit[0].sub[0].section;

                    if (unit) {
                        for (; j < unit.length; j++) {
                            category = unit[j];

                            if (j === 0 && op === "type1") title += "<li class='on'>" + (j + 1) + ". " + category.title + "</li>";
                            else title += "<li>" + (j + 1) + ". " + category.title + "</li>";
                        }
                    }

                    if (list.hasClass("list")) {
                        list.append(title);
                        list.find("li").each(function(k) {
                            li = $(this);
                            file = unit[k].sub[0].section[0].file;
                            pageNum = file.split("_")[1];

                            if (pageNum.charAt(0) === "0") pageNum = pageNum.substring(1);
                            
                            li.attr("data-page", pageNum);
                        });
                        event = pageMove;
                    } else {
                        subList = $(".unit_over").eq(2);
                        subList.find("li").remove();

                        chapTxt.text("1. " + unit[0].title);
                        subTxt.text("1. " + sub[0].title);

                        if (sub) {
                            for(; k < sub.length; k++){
                                subSection = sub[k];
                                subTitle += "<li>"+ (k + 1) + ". " + subSection.title +"</li>";
                            }
                        }

                        list.append(title);
                        subList.append(subTitle);
                        event = changeChapter;
                    }

                    list.find("li").bind("click", event);
                    if (subList) subList.find("li").bind("click", event);
                } else if (op === "type2") {
                    list = $(".unit_over").eq(2);
                    sub = unit[unitIdx].sub;
                    section = sub[0].section;

                    subTxt.text("1. " + sub[0].title);
                    list.find("li").remove();

                    for(; n < sub.length; n++){
                        subSection = sub[n];
                        subTitle += "<li>"+ (n + 1) + ". " + subSection.title +"</li>";
                    }

                    list.append(subTitle);
                    list.find("li").bind("click", changeChapter);
                } else {
                    sub = unit[unitIdx].sub;
                    section = sub[subIdx].section;
                }

                if (section) {
                    for(; m < section.length; m++) {
                        sec = section[m];
                        
                        if (m === 1) sen = "</ul></li>";

                        if (secTitle === sec.title) {
                            if (section[m + 1] && secTitle !== section[m + 1].title) content += "<li data-page='"+ sec.file +"'>" + sec.desc + "</li>";
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

    function pageMove() {
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
