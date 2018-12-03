'use strict';

PUBPLE.createNs('util');

/**
 * 기능 구현 시 도움을 주기 위한 코드
 * @namespace util
 * @memberOf PUBPLE
 */
PUBPLE.util = (function() {
    return {
        // 플랫폼 확인
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
       
    }
}());