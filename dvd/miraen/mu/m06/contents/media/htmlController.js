// version 1.0.14 : notes - html Àç¿¬°á
/**
 * @description note controller on html file
 * @param {string} contentid content div id(s), default value = contentsWrap
 * @param {function} onloadCallback always call this function
 */
var trace_controller = false;
var htmlControllerInit = function (contentid, onloadCallback) {
        if (trace_controller == true) console.log('htmlControllerInit');
        // variables
        var root = $('#' + contentid);    // content root element
        if (!root.length) {
                if (trace_controller == true) console.log('Err> htmlControllerInit, cannot find content, id: ' + contentid);
                return;
        }
        var sectionCount/* = 3*/;   // section count (1~), default 3
        var yDistance = 15;         // lyrics move distance (y)
        var vSection = 1;           // visible section
        var lyricsVisible = true;   // lyrics visible flag
        // functions
        /**
         * @description section count calculation
         */
        function calSectionCount() {
                sectionCount = 1;
                while (1) {
                        if ($('#lyrics' + sectionCount).length || $('.lyrics' + sectionCount).length) {
                                sectionCount++;
                        } else {
                                sectionCount--;
                                break;
                        }
                }
                if (trace_controller == true) console.log('htmlController> Html Section count: ' + sectionCount);
        }
        /**
         * @description show object function
         * @param {string} id target id or class
         */
        function showObject(id) {
                var t = null;
                try {
                        t = $('#' + id);
                        if (!t.length) {
                                if (trace_controller == true) console.log('showObject> it is not id');
                                t = $('.' + id);
                                if (!t.length) {
                                        if (trace_controller == true) console.log('showObject> it is not class. what the f...');
                                        if (trace_controller == true) console.log("Err> showObject: Do not find id(or class):" + id);
                                        return;
                                }
                        }
                        t.show();   // show!
                } catch (e) {
                        if (trace_controller == true) console.log('Err> showObject(), e: ');
                        if (trace_controller == true) console.log(e);
                        if (trace_controller == true) console.log('Err> id: ' + id + ', target: ');
                        if (trace_controller == true) console.log(t);
                }
        };
        /**
         * @description hide object function
         * @param {string} id target id or class
         */
        function hideObject(id) {
                var t = null;
                try {
                        t = $('#' + id);
                        if (!t.length) {
                                if (trace_controller == true) console.log('showObject> it is not id');
                                t = $('.' + id);
                                if (!t.length) {
                                        if (trace_controller == true) console.log('showObject> it is not class. what the f...');
                                        if (trace_controller == true) console.log("Err> showObject: Do not find id(or class):" + id);
                                        return;
                                }
                        }
                        t.hide();   // hide!
                } catch (e) {
                        if (trace_controller == true) console.log('Err> hideObject(), e: ');
                        if (trace_controller == true) console.log(e);
                        if (trace_controller == true) console.log('Err> id: ' + id + ', target: ');
                        if (trace_controller == true) console.log(t);
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
         * @description target element bring to front on html
         * @param {jQuery object} te target element
         */
        function bringToFront(te) {
                //var p = te.parent();
                //p.append(te);
                te.css('z-index', 10);
        };
        /**
         * @description target element send to back on html
         * @param {jQuery object} te target element
         */
        function sendToBack(te) {
                //var p = te.parent();
                //p.prepend(te);
                te.css('z-index', 0);
        };
        calSectionCount();
        if (typeof onloadCallback === 'function') onloadCallback();
        return {
                /**
                 * @description (head+idx) is target id (group or path or line)
                 * @param {string} head identifier, always lower case
                 * @param {number,string} idx index, this value always more than 0 and less than 1000
                 * @return {void}
                 */
                noteOn: function (head, idx) {
                        var tid = '' + head.toLowerCase();
                        if (isInteger(idx)) {    // if index is integer(number) value
                                if (idx <= 0) {
                                        if (trace_controller == true) console.log("Err> nodeOn: idx is equal or less than 0");
                                        return;
                                } else if (idx > 999) {
                                        if (trace_controller == true) console.log("Err> nodeOn: idx is more than 999");
                                        return;
                                }
                                var addVal;
                                if (idx < 10) {
                                        addVal = '00' + idx;
                                } else if (idx < 100) {
                                        addVal = '0' + idx;
                                } else {
                                        addVal = '' + idx;
                                }   // addVal length always 3
                                tid += addVal;
                        } else {    // if index is string value
                                if (parseInt(idx) <= 0) {
                                        if (trace_controller == true) console.log("Err> nodeOn: idx is equal or less than 0");
                                        return;
                                } else if (parseInt(idx) > 999) {
                                        if (trace_controller == true) console.log("Err> nodeOn: idx is more than 999");
                                        return;
                                }
                                tid += idx;
                        }
                        if (trace_controller == true) console.log('noteOn> id:' + tid);
                        var t = null;
                        t = $('#' + tid);
                        if (!t.length) {
                                if (trace_controller == true) console.log('showObject> it is not id');
                                t = $('.' + tid);
                                if (!t.length) {
                                        if (trace_controller == true) console.log('showObject> it is not class. what the f...');
                                        if (trace_controller == true) console.log("Err> showObject: Do not find id(or class):" + tid);
                                        return;
                                }
                        }
                        bringToFront(t);  // on target bring to front
                        if (!t.hasClass('on')) {
                                t.addClass('on');   // add on class
                        }
                },
                /**
                 * @description (head+idx) is target id (group or path or line)
                 * @param {string} head : identifier, always lower case
                 * @param {number,string} idx  : index, this value always more than 0
                 * @param {string} color color value, default color is black, value is e.g) black, red, #FFFF00, #000000, etc...
                 * @return {void}
                 */
                noteOff: function (head, idx, color/* = 'black'*/) {
                        var tid = '' + head.toLowerCase();
                        if (isInteger(idx)) {    // if index is integer(number) value
                                if (idx <= 0) {
                                        if (trace_controller == true) console.log("Err> nodeOff: idx is equal or less than 0");
                                        return;
                                } else if (idx > 999) {
                                        if (trace_controller == true) console.log("Err> nodeOff: idx is more than 999");
                                        return;
                                }
                                var addVal;
                                if (idx < 10) {
                                        addVal = '00' + idx;
                                } else if (idx < 100) {
                                        addVal = '0' + idx;
                                } else {
                                        addVal = '' + idx;
                                }
                                tid += addVal;
                        } else {    // if index is string value
                                if (parseInt(idx) <= 0) {
                                        if (trace_controller == true) console.log("Err> nodeOff: idx is equal or less than 0");
                                        return;
                                } else if (parseInt(idx) > 999) {
                                        if (trace_controller == true) console.log("Err> nodeOff: idx is more than 999");
                                        return;
                                }
                                tid += idx;
                        }
                        if (trace_controller == true) console.log('noteOff> id:' + tid);
                        var t = null;
                        t = $('#' + tid);
                        if (!t.length) {
                                if (trace_controller == true) console.log('showObject> it is not id');
                                t = $('.' + tid);
                                if (!t.length) {
                                        if (trace_controller == true) console.log('showObject> it is not class. what the f...');
                                        if (trace_controller == true) console.log("Err> showObject: Do not find id(or class):" + tid);
                                        return;
                                }
                        }
                        sendToBack(t);  // off target send to back
                        if (t.hasClass('on')) {
                                t.removeClass('on');   // remove on class
                        }
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

                        t = $('#' + fid);
                        if (!t.length) {
                                if (trace_controller == true) console.log('showObject> it is not id');
                                t = $('.' + fid);
                                if (!t.length) {
                                        if (trace_controller == true) console.log('showObject> it is not class. what the f...');
                                        if (trace_controller == true) console.log("Err> showObject: Do not find id(or class):" + fid);
                                        return;
                                }
                        }
                        // move move move!
                        var l1 = null;  // lyrics 1 is standard(?)
                        l1 = $('#lyrics1');
                        if (!l1.length) {
                                if (trace_controller == true) console.log('showObject> it is not id');
                                l1 = $('.lyrics1');
                                if (!l1.length) {
                                        if (trace_controller == true) console.log('showObject> it is not class. what the f...');
                                        if (trace_controller == true) console.log("Err> showObject: Do not find id(or class):lyrics1");
                                        return;
                                }
                        }
                        if (trace_controller == true) console.log(t);
                        if (trace_controller == true) console.log(l1);
                        if (trace_controller == true) console.log(l1.css('top'));
                        t.css('top', (parseInt(l1.css('top')) + (yDistance * multiple)) + 'px');
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
                        if (typeof onloadCallback === 'function') onloadCallback();
                }
        }
}

/**
 * @description integer check
 * @param {number} num check value
 */
function isInteger(num) {
        return (num ^ 0) === num;
}