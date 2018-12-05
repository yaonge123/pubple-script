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
         * 플랫폼 확인
         * @memberOf PUBPLE.util
         * @type {object}
         * @property {function} detector.isIos - iOS 여부 확인
         */
        detector: {
            ua: navigator.userAgent.toLowerCase(),

            isIe: function() {
                return /trident/.test(this.ua);
            },

            isChrome: function() {
                return /chrome/.test(this.ua);
            },

            isIos: function() {
                return /iphone|ipad|ipod/.test(this.ua);
            },
            
            isAndroid: function() {
                return /android/.test(this.ua);
            }
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