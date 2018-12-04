// version 1.0.12 : 가사 포커스 제어 기능 추가. 포커스 관련 디버그.
var svgControllerInit = function (svgid, lyricsSectionCount/* = 3*/, onloadCallback) {
        /**
         * @description note controller on svg file
         * @param {string} svgid svg id(s), array or not
         * @param {number} lyricsSectionCount section count, always more than 1, default value 3, fucking i.e.
         * @param {function} onloadCallback if svg file(s) loaded then, call this function
         */

        // 
        var dic_imitator = {}; // 흉내쟁이 딕셔너리

        //if (trace_controller == true) console.log('svgControllerInit');
        // variables
        var svgDoc                  // svg document array
        var isSVGLoaded = 0;        // loaded complete count
        var sectionCount/* = 3*/;   // section count (1~), default 3
        var yDistance = 15;         // lyrics move distance (y)
        var vSection = 1;           // visible section
        var lyricsVisible = true;   // lyrics visible flag
        var isLoadCompleted = false;
        var sId = svgid;
        var prevColor = '';
        // local logic
        /*sectionCount = lyricsSectionCount;*/
        (lyricsSectionCount === null || lyricsSectionCount === undefined || parseInt(lyricsSectionCount) < 0) ? sectionCount = 3 : sectionCount = parseInt(lyricsSectionCount);

        if (Array.isArray(svgid)) { // svgid is array true
                for (var i = 0; i < svgid.length; i++) {
                        document.getElementById(svgid[i]).addEventListener("load", function () { // add load event
                                if (isSVGLoaded === svgid.length) {
                                        isSVGLoaded = 0;
                                        svgDoc = new Array();
                                }
                                //if (trace_controller == true) console.log('svgControllerInit load Complete. svg id:'+svgid);
                                var obj = this.getSVGDocument();
                                obj.identifier = svgid;
                                svgDoc.push(obj); // push document to array
                                //if (trace_controller == true) console.log(this);
                                isSVGLoaded++;  // plus count
                                if (isSVGLoaded >= svgid.length) { // if loaded complete all svg and exist onloadCallback function
                                        isLoadCompleted = true;
                                        hideObject('pointer');
                                        hideNshowLyrics(vSection); // set lyrics 1st section
                                        if (typeof onloadCallback === 'function') onloadCallback(svgid);
                                }
                        });
                }
        } else {    // false
                var clickFunc = function () {
                        if (typeof onSvgClick === 'function') {
                                onSvgClick();
                        }
                };
                var loadFunc = function () {
                        try {
                                //if (trace_controller == true) console.log('svgControllerInit load Complete. svg id:'+svgid);
                                svgDoc = new Array();
                                //if (trace_controller == true) console.log(lyricsSectionCount);
                                var obj = this.getSVGDocument();
                                obj.identifier = svgid;
                                svgDoc.push(obj); // push document to array
                                //if (trace_controller == true) console.log(this);
                                isSVGLoaded++;  // plus count
                                isLoadCompleted = true;
                                hideObject('pointer');

                                // 계명 보여주기
                                if ($(this).hasClass("noteOn")) {
                                        vSection = 2;
                                }

                                hideNshowLyrics(vSection); // set lyrics 1st section
                                obj.removeEventListener("click", clickFunc);
                                obj.addEventListener("click", clickFunc);
                                if ((typeof onloadCallback === 'function')) {   // if loaded complete all svg and exist onloadCallback function
                                        //if (trace_controller == true) console.log('drop callback!');
                                        onloadCallback(svgid);
                                }
                        }
                        catch (e) {
                                console.log(e);
                        }
                };
                var intervalVar = setInterval(function () {
                        //
                        if (!document.getElementById(sId)) {
                                clearInterval(intervalVar);
                        }

                        if (document.getElementById(sId).getSVGDocument() !== null) {
                                try {
                                        //if (trace_controller == true) console.log('svgControllerInit load Complete. svg id:'+svgid);
                                        svgDoc = new Array();
                                        //if (trace_controller == true) console.log(lyricsSectionCount);
                                        var obj = document.getElementById(sId).getSVGDocument();
                                        //obj.identifier = sId;
                                        svgDoc.push(obj); // push document to array
                                        //if (trace_controller == true) console.log(this);
                                        isSVGLoaded++;  // plus count
                                        isLoadCompleted = true;
                                        hideObject('pointer');
                                        hideNshowLyrics(vSection); // set lyrics 1st section
                                        {
                                                $(document).find('#' + sId).off("load");
                                                $(document).find('#' + sId).on("load", loadFunc);
                                                obj.removeEventListener("click", clickFunc);
                                                obj.addEventListener("click", clickFunc);
                                        }
                                        if ((typeof onloadCallback === 'function')) {   // if loaded complete all svg and exist onloadCallback function
                                                //if (trace_controller == true) console.log('drop callback!');
                                                onloadCallback(svgid);

                                        }
                                        clearInterval(intervalVar);
                                }
                                catch (e) {
                                        console.log(e);
                                }
                        }
                }, 10);
        }
        // functions
        /**
         * @description show object function
         * @param {string} id target id
         */
        function showObject(id) {
                if (!isLoadCompleted) {
                        //if (trace_controller == true) console.log("Err> not load svg file! id:"+id);
                }
                var t = null;
                try {
                        for (var i = 0; i < svgDoc.length; i++) {   // find svg array
                                if ($(svgDoc[i].getElementById(id)).length) {   // find it!
                                        t = $(svgDoc[i].getElementById(id));    // go jquery
                                        t.css('display', 'block');//t.show();   // show!
                                }
                        }
                } catch (e) {
                        /*
                    if (trace_controller == true) console.log('Err> showObject(), e: ');
                    if (trace_controller == true) console.log(e);
                    if (trace_controller == true) console.log('Err> target: ');
                    if (trace_controller == true) console.log(t);
                    */
                }
                if (t === null) {   // i can't find it. ;(
                        //if (trace_controller == true) console.log("Err> showObject: Do not find id:"+id);
                        return;
                }
        };
        /**
         * @description hide object function
         * @param {string} id target id
         */
        function hideObject(id) {
                var t = null;
                try {
                        for (var i = 0; i < svgDoc.length; i++) {   // find svg array
                                if ($(svgDoc[i].getElementById(id)).length) {   // find it!
                                        t = $(svgDoc[i].getElementById(id));    // go jquery
                                        t.css('display', 'none');//t.hide();   // hide!
                                }
                        }
                } catch (e) {
                        /*
                    if (trace_controller == true) console.log('Err> hideObject(), e: ');
                    if (trace_controller == true) console.log(e);
                    if (trace_controller == true) console.log('Err> target: ');
                    if (trace_controller == true) console.log(t);
                    */
                }
                if (t === null) {   // is not exist..
                        //if (trace_controller == true) console.log("Err> hideObject: Do not find id:"+id);
                        return;
                }
        };
        /**
         * @description just one lyrics show
         * @param {number} s select section number
         */
        function hideNshowLyrics(s) {
                for (var i = 0; i < sectionCount; i++) {
                        var tid = 'lyrics' + (i + 1);
                        (i + 1) === s ? showObject(tid) : hideObject(tid);
                }
        };
        /**
         * @description target element bring to front on svg
         * @param {jQuery object} te target element
         */
        function bringToFront(te) {
                var p = te.parent();
                p.append(te);
        };
        /**
         * @description target element send to back on svg
         * @param {jQuery object} te target element
         */
        function sendToBack(te) {

                var p = te.parent();
                p.prepend(te);
        };
        /**
         * @description get all child element
         * @param {object} root root element
         * @param {Array} array data array
         */
        function getChildren(root, array) {
                try {
                        if ($(root).children().length > 0) {
                                for (var i = 0; i < $(root).children().length; i++) {
                                        getChildren($(root).children().get(i), array);
                                }
                        } else {
                                console.log('children() length is 0');
                                //console.log(root);
                                array.push($(root)[0]);
                        }
                } catch (e) {
                        console.log(e);
                        console.log(root);
                }
        };
        function checkNoteLayer(obj, tid) {
                if (typeof obj === "object") {
                        obj.each(function () {
                                if ($(this).children().length > 0) {
                                        console.log('Err> 해당 Object가 포함된 svg 파일을 확인해주세요. 음표 그룹은 자식 그룹을 가지면 On, Off 기능이 작동하지 않습니다.');
                                        console.log('     svg id: ' + svgid + ', Object id: ' + tid + ', Object 정보: ');
                                        console.log(obj);
                                } else {
                                }
                        });
                } else {
                        if ($(obj).children().length > 0) {
                                console.log('Err> 해당 Object가 포함된 svg 파일을 확인해주세요. 음표 그룹은 자식 그룹을 가지면 On, Off 기능이 작동하지 않습니다.');
                                console.log('     svg id: ' + svgid + ', Object id: ' + tid + ', Object 정보: ');
                                console.log(obj);
                        } else {
                        }
                }
        };
        return {
                // 흉내쟁이
                setImitator: function (target, imitator) { dic_imitator[target] = imitator; },
                chkImitator: function (head, idx, type, onoff, color) {
                        if (dic_imitator[head] != null) {
                                var ar = dic_imitator[head];
                                for (var ii = 0 ; ii < ar.length ; ii++) {
                                        if (onoff == true) { this.noteOn(ar[ii], idx, type, true, color); }
                                        else { this.noteOff(ar[ii], idx, type, true, color); }
                                }
                        }
                },

                // 노트 제어
                noteOn: function (head, idx, type, is_imitate, color) { // 0:note, 1:lyrics, 2:both
                        /**
                         * @description (head+idx) is target id (group or path or line)
                         * @param {string} head identifier, always lower case
                         * @param {number,string} idx index, this value always more than 0 and less than 1000
                         * @param {string} color color value, default color is red, value is e.g) black, red, #FFFF00, #000000, etc...
                         * @return {void}
                         */
                        
                        // 흉내쟁이
                        if (is_imitate == null && (type == 1 || type == 2)) { this.chkImitator(head, idx, type, true, color); }

                        // 조건검사
                        if (is_imitate == null && type == 1) { return; }

                        // 조건검사 및 문자열 정돈
                        if (svgDoc === undefined) { return; }
                        var tid = '' + head.toLowerCase();
                        if (isInteger(idx)) { // int 정돈
                                if (idx <= 0) { return; }
                                else if (idx > 999) { return; }
                                var addVal; // 문자열화
                                if (idx < 10) { addVal = '00' + idx; }
                                else if (idx < 100) { addVal = '0' + idx; }
                                else { addVal = '' + idx; }
                                tid += addVal;
                        } else {    // if index is string value
                                if (parseInt(idx) <= 0) { return; }
                                else if (parseInt(idx) > 999) { return; }
                                tid += idx;
                        }

                        // 대상 특정
                        var t = null;
                        for (var i = 0; i < svgDoc.length; i++) {
                                if ($(svgDoc[i].getElementById(tid)).length) {
                                        t = $(svgDoc[i].getElementById(tid));
                                        break;
                                }
                        }
                        if (t === null) { return; } // 대상 없음
                        bringToFront(t); // 레이어 심도 조정
                        if (t.children().length > 0) { t = t.children(); } // 하위 엘리먼트까지 포함
                        checkNoteLayer(t, tid);
                        color = color || 'red'; // 색

                        // svg 제어
                        t.each(function (index) {
                                if (this.tagName === 'path') {  // path tag
                                        if ($(this).css('stroke') !== 'none' && $(this).css('stroke') !== "") {
                                                prevColor = $(this).css('stroke');
                                                this.style.stroke = color;
                                        } else {
                                                prevColor = $(this).css('fill');
                                                this.style.fill = color;
                                        }
                                } else if (this.tagName === 'polygon') {  // polygon tag
                                        prevColor = $(this).css('fill');
                                        this.style.fill = color;
                                } else if (this.tagName === 'line') {    // line tag
                                        prevColor = $(this).css('stroke');
                                        this.style.stroke = color;
                                } else if (this.tagName === 'rect') {    // rect tag
                                        prevColor = $(this).css('fill');
                                        this.style.fill = color;
                                }
                        });
                },
                noteOff: function (head, idx, type, is_imitate, color) { // 0:note, 1:lyrics, 2:both
                        /**
                         * @description (head+idx) is target id (group or path or line)
                         * @param {string} head : identifier, always lower case
                         * @param {number,string} idx  : index, this value always more than 0
                         * @param {string} color color value, default color is black, value is e.g) black, red, #FFFF00, #000000, etc...
                         * @return {void}
                         */

                        // 흉내쟁이
                        if (is_imitate == null && (type == 1 || type == 2)) { this.chkImitator(head, idx, type, false, color); }

                        // 조건검사
                        if (is_imitate == null && type == 1) { return; }

                        // 조건검사 및 문자열 정돈
                        if (svgDoc === undefined) { return; }
                        var tid = '' + head.toLowerCase();
                        if (isInteger(idx)) { // int 정돈
                                if (idx <= 0) { return; }
                                else if (idx > 999) { return; }
                                var addVal; // 문자열화
                                if (idx < 10) { addVal = '00' + idx; }
                                else if (idx < 100) { addVal = '0' + idx; }
                                else { addVal = '' + idx; }
                                tid += addVal;
                        } else {    // if index is string value
                                if (parseInt(idx) <= 0) { return; }
                                else if (parseInt(idx) > 999) { return; }
                                tid += idx;
                        }

                        // 대상 특정
                        var t = null;
                        for (var i = 0; i < svgDoc.length; i++) {
                                if ($(svgDoc[i].getElementById(tid)).length) {
                                        t = $(svgDoc[i].getElementById(tid));
                                        break;
                                }
                        }
                        if (t === null) { return; } // 대상 없음
                        sendToBack(t);  // 레이어 심도 조정
                        if (t.children().length > 0) { t = t.children(); } // 하위 엘리먼트까지 포함
                        color = color || 'black'; // 색
                        if (prevColor !== '') { color = prevColor; prevColor = ''; }

                        // svg 제어
                        t.each(function (index) {
                                if (this.tagName === 'path') {  // path tag
                                        if ($(this).css('stroke') !== 'none' && $(this).css('stroke') !== "") {
                                                this.style.stroke = color;  // set stroke color
                                        } else {
                                                this.style.fill = color;    // set fill color
                                        }
                                } else if (this.tagName === 'polygon') {    // polygon tag
                                        this.style.fill = color;        // set fill color
                                } else if (this.tagName === 'line') {        // line tag
                                        this.style.stroke = color;      // set stroke color
                                } else if (this.tagName === 'rect') {    // rect tag
                                        this.style.fill = color;
                                }
                        });
                },
                /**
                 * @description show lyrics function
                 * @param {number} section lyrics section, another section is hide
                 * @param {boolean} isOnly is displayed only one lyrics? default value is true
                 * @return {void}
                 */
                showLyrics: function (section, isOnly/* = true*/) {
                        /*if (trace_controller == true) console.log(isInteger(section));
                        if (trace_controller == true) console.log(section);
                        if (trace_controller == true) console.log(sectionCount);*/
                        var ov;
                        (isOnly === null || isOnly === undefined) ? ov = true : ov = isOnly;
                        if (ov) {
                                vSection = section;
                                if (lyricsVisible) hideNshowLyrics(vSection);
                        }
                        else {
                                showObject('lyrics' + section);
                        }
                },
                /**
                 * @description set section count
                 * @param {number} count section count
                 * @return {void}
                 */
                setSectionCount: function (count) {
                        sectionCount = count;
                },
                /**
                 * @description show element by id
                 * @param {string} id target id, default value is 'pointer'
                 * @return {void}
                 */
                showElement: function (id/* = 'pointer'*/) {
                        //showObject(id);
                        (id === null || id === undefined || id === '') ? showObject('pointer') : showObject(id);
                },
                /**
                 * @description hide element by id
                 * @param {string} id target id, default value is 'pointer'
                 * @return {void}
                 */
                hideElement: function (id/* = 'pointer'*/) {
                        //hideObject(id);
                        (id === null || id === undefined || id === '') ? hideObject('pointer') : hideObject(id);
                },
                /**
                 * @description lyrics move to y
                 * @param {number} section  target lyrics
                 * @param {number} multiple lyrics move to y(distance * multiple), 0 is original position
                 * @param {void}
                 */
                lyricsMoveToY: function (section, multiple) {
                        var t = null;
                        var fid = 'lyrics' + section;
                        for (var i = 0; i < svgDoc.length; i++) {   // find svg array
                                if ($(svgDoc[i].getElementById(fid)).length) {   // find it!
                                        t = $(svgDoc[i].getElementById(fid));    // go jquery
                                        t.attr('transform', 'translate(0,' + (multiple * yDistance) + ')');   // move to y
                                }
                        }
                        if (t === null) {   // i can't find it. ;(
                                //if (trace_controller == true) console.log("Err> lyricsMoveToY: Do not find lyrics section: "+section);
                                return;
                        }
                },
                /**
                 * @description set move distance(y)
                 * @param {number} yd   y distance
                 * @return {void}
                 */
                setYDistance: function (yd) {
                        yDistance = yd;
                },
                /**
                 * @description set lyrics visibility
                 * @param {boolean} isVisible   true is visible, false is invisible
                 * @return {void}
                 */
                setVisibleLyrics: function (isVisible) {
                        lyricsVisible = isVisible;
                        lyricsVisible ? showObject('lyrics' + vSection) : hideObject('lyrics' + vSection);
                },
                reload: function () {
                        if (isLoadCompleted == false) { return; }

                        if ((typeof onloadCallback === 'function')) {   // if loaded complete all svg and exist onloadCallback function
                                //if (trace_controller == true) console.log('drop callback!');
                                onloadCallback(svgid);
                        }
                }
        }
}

/**
 * @description integer check
 * @param {number} num check value
 */
function isInteger(num) { return (num ^ 0) === num; }