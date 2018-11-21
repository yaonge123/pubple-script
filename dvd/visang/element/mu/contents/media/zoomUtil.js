//
var zoomUtil = function (svgArr, gageBar, zoomInBtn, zoomOutBtn, scaleRatio, gageBarRatio) {
    this.svgArr = $(svgArr) || null;            // svg를 data로 하는 object tag 들을 자식으로 갖는 (div or other) tag
    this.gageBar = $(gageBar) || null;          // 게이지 바
    this.zoomInBtn = $(zoomInBtn) || null;      // zoom in button
    this.zoomOutBtn = $(zoomOutBtn) || null;    // zoom out button
    this.scaleRatio = scaleRatio || 0.1;        // 크기 증감 비율 (0.0 - infinity)
    this.gageBarRatio = gageBarRatio || 10;     // 게이지 증감 비율 (min 0 - max 100)

    var scaleVal = 1.0;
    var gageBarWidth = 50;  // default value

    // 스크롤 관련 변수
    var $scrollDetail = $('.scroll_detail');
    var scrollDetailW = parseInt($scrollDetail.css('width'), 10);
    var scrollDetailH = parseInt($scrollDetail.css('height'), 10);

    // 객체 여부 확인, 없다면 return null
    if (!svgArr || !svgArr.length || !svgArr.children() || !svgArr.children().length || !zoomInBtn || !zoomInBtn.length || !zoomOutBtn || !zoomOutBtn.length) {
        //console.log("svg 객체 혹은 확대 축소 버튼이 없습니다.");
        return null;
    }

    /**
     * Zoom In
     */
    var zoomIn = function () {
        if (!(gageBarWidth >= 100)) {   // 게이지 바의 크기는 100%를 초과하지 못하도록
            scaleVal += scaleRatio;
            gageBarWidth += gageBarRatio;
            setSVGScale(scaleVal);
            setGageBarWidth(gageBarWidth);
            setScrollCont(scaleVal);
        }
    };
    /**
     * Zoom Out
     */
    var zoomOut = function () {
        if (!(gageBarWidth <= 0)) {     // 게이지 바의 크기는 0% 미만이 되지 못하도록
            scaleVal -= scaleRatio;
            gageBarWidth -= gageBarRatio;
            setSVGScale(scaleVal);
            setGageBarWidth(gageBarWidth);
            setScrollCont(scaleVal);
        }
    };
    /**
     * 크기값 재설정, 기본 크기 1.0배, 게이지바 50%
     */
    var resetScale = function () {
        scaleVal = 1.0;
        gageBarWidth = 50;
        setSVGScale(scaleVal);
        setGageBarWidth(gageBarWidth);
    };
    /**
     * SVG 크기 설정 (0.0-infinity)
     * @param {number} scale 배율값
     */
    var setSVGScale = function (scale) {
        for (var i=0,size=svgArr.children().length;i<size;i++) {
            //console.log(svgArr.children()[i]);
            $(svgArr.children()[i]).css({
                'transform':'scale('+scale+')',
                '-ms-transform':'scale('+scale+')',
                '-webkit-transform':'scale('+scale+')',
                'transform-origin': '0% 0%',
                '-ms-transform-origin': '0% 0%',
                '-webkit-transform-origin': '0% 0%'
            });
        }
    };
    /**
     * 게이지바 크기 설정 (0-100 %)
     * @param {number} width 크기 값
     */
    var setGageBarWidth = function (width) {
        if (gageBar) {
            gageBar.css('width', width + '%');
        }
    };
    /**
     * 스크롤바 컨텐츠 영역 사이즈 설정
     * @param {number} scale 배율값
     */
    var setScrollCont = function(scale) {
        if (!scrollDetailW || !scrollDetailH) {
            scrollDetailW = parseInt($scrollDetail.css('width'), 10);
            scrollDetailH = parseInt($scrollDetail.css('height'), 10);
        }

        $scrollDetail.css({
            'width': scrollDetailW * scale + 'px',
            'height': scrollDetailH * scale + 'px'
        });
    }

    // zoom in out button add click event listener
    zoomInBtn.off('click').on('click', function () {
        //console.log("zoom in");
        zoomIn();
    });
    zoomOutBtn.off('click').on('click', function () {
        //console.log("zoom out");
        zoomOut();
    });
    
    resetScale();
    //console.log("Ready to zoom function");

    var isDragging = false;
    var prevX=0;
    var prevY=0;

    $(function() {
        //console.log('test');

        for (var i=0,size=svgArr.children().length;i<size;i++) {
            $(svgArr.children()[i]).off('mousedown').on('mousedown', function () {
                console.log("mousedown", $scrollDetail);
                isDragging = true;
                console.log($scrollDetail.scrollTop);
                //$scrollDetail.scrollTop(0);
                $('.mCSB_container').css('top', '0px');
                $('.mCSB_dragger').css('top', '0px');
            }).off('mousemove').on('mousemove', function (e) {
                if (isDragging) {
                    //console.log(e);
                    console.log(prevX, e.clientX);
                    console.log(e.clientX, e.clientY);
                    //prevX = e.clientX; prevY = e.clientY;
                }
            }).off('mouseup').on('mouseup', function () {
                console.log("mouseup");
                isDragging = false;
            });
        }
    });
};

$(function() {
    // parameter info: object tag들을 감싼 tag, gage bar, zoom in button, zoom out button, svg scale ratio (default 0.1), gage bar ratio (default 10%)
    zoomUtil($('#notesDetail_Note .notesSetWrap'), $('.notesZoomWrap .notesBar .notesGage'), $('.notesZoomWrap .notesZoom'), $('.notesZoomWrap .notesOut'), 0.1, 10);
});