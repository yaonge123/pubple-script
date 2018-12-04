'use strict';

PUBPLE.createNs('util');

/**
 * 기능 구현 시 도움을 주기 위한 코드
 * @namespace util
 * @memberOf PUBPLE
 */
PUBPLE.util = (function() {
    return {
        /**
         * 터치 디바이스 여부 확인
         */
        isTouchDevice: "ontouchstart" in document.documentElement,
        /**
         * 브라우저 확인
         * @memberOf PUBPLE.util
         * @returns {string}
         */
        detectUa: function () {
            var ua = navigator.userAgent.toLowerCase();
            var ret;

            if (/trident/.test(ua)) { // ie
                ret = "ie";
            } else if (/chrome/.test(ua)) { // chrome
                ret = "chrome";
            } else if (/edge/.test(ua)) { // edge
                ret = "edge";
            } else if (/firefox/.test(ua)) { // firefox
                ret = "firefox";
            } else if (/safari/.test(ua)) {
                ret = "safari";
            } else if (/android/.test(ua)) { // android
                ret = "android";
            } else if (/iphone|ipad|ipod/.test(ua)) { // ios
                ret = "ios";
            }
            return ret;
        },
        /**
         * 이벤트 타입 반환
         * @memberOf PUBPLE.util
         * @param {string}
         * @returns {string} eventType
         */
        getEventType: function (eventType) {
            var ret;

            switch (eventType) {
                case "down":
                    ret = this.isTouchDevice ? "touchstart" : "mousedown";
                    break;
                case "move":
                    ret = this.isTouchDevice ? "touchmove" : "mousemove";
                    break;
                case "up":
                    ret = this.isTouchDevice ? "touchend" : "mouseup";
                    break;
                case "out":
                    ret = this.isTouchDevice ? "touchleave" : "mouseout";
                    break;
                default:
                    ret = "err";
                    break;
            }
            return ret;
        },
        /**
         * DOM 접근
         * @memberOf PUBPLE.util
         * @param {string} type - class | id | qs | qsa | tag
         * @param {string} sel - selector
         * @param {HTMLElement} targetEl - element
         * @returns {HTMLElement | HTMLCollection}
         */
        getEl: function(type, sel, targetEl) {
            var obj;
            var d;

            if(!targetEl) {
                d = document;
            } else {
                d = targetEl;
            }

            switch(type) {
                case 'class':
                    obj = d.getElementsByClassName(sel);
                    break;
                case 'id':
                    obj = d.getElementById(sel);
                    break;
                case 'qs':
                    obj = d.querySelector(sel);
                    break;
                case 'qsa':
                    obj = d.querySelectorAll(sel);
                    break;
                case 'tag':
                    obj = d.getElementsByTagName(sel);
                    break;
                //no default
            }

            return obj;
        },
        /**
         * element 생성
         * @memberOf PUBPLE.util
         * @param {string} tag - tag name
         * @param {HTMLElement} target
         * @param {string} pos - beforebegin | afterbegin | beforeend | afterend
         * @param {string} cls - 추가할 class
         * @returns {HTMLElement}
         */
        createEl: function(tag, target, pos, cls) {
            var newEl = document.createElement(tag);

            if(cls) {
                newEl.className = cls;
            }
            target.insertAdjacentElement(pos, newEl);

            return newEl;
        }
        /**
         * 클래스 추가
         * @deprecated
         */
        // addClass: function(t, str) {
        //     if(t.className) {
        //         t.className += ' ' + str;
        //     } else {
        //         t.className += str;
        //     }
        // },
        /**
         * 클래스 제거
         * @deprecated
         */
        // removeClass: function(t, str) {
        //     var reg = new RegExp('(\\s|^)' + str + '(\\s|$)');
        //     t.className = t.className.replace(reg,'');
        // },
        /**
         * 클래스 토글
         * @deprecated
         */
        // toggleClass: function(t, str) {
        //     var reg = new RegExp('(\\s|^)' + str + '(\\s|$)');
        //
        //     if(t.className.match(reg)) {
        //         this.removeClass(t, str);
        //     } else {
        //         this.addClass(t, str);
        //     }
        // },
        /**
         * 클래스 존재 확인
         * @deprecated
         */
        // hasClass: function(t, str) {
        //     var reg = new RegExp('(\\s|^)' + str + '(\\s|$)');
        //
        //     if(t.className.match(reg)) {
        //         return true;
        //     } else {
        //         return false;
        //     }
        // },
        /**
         * 부모 element 가져옴
         * @deprecated
         */
        // getParent: function(el, sel) {
        //     for(; el && el !== document; el = el.parentNode) {
        //         if(el.matches(sel)) {
        //             return el;
        //         }
        //     }
        //     return null;
        // },
        /**
         * 모든 부모 element 가져옴
         * @deprecated
         */
        // getParents: function(el, sel) {
        //     var parents = [];
        //
        //     for(; el && el !== document; el = el.parentNode) {
        //         if(sel) {
        //             if(el.matches(sel)) {
        //                 parents.push(el);
        //             }
        //
        //         } else {
        //             parents.push(el);
        //         }
        //     }
        //     return parents;
        // }
    }
}());