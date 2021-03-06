'use strict';

/**
 * PUBPLE namespace
 * @namespace PUBPLE
 */
var PUBPLE = PUBPLE || {};

/**
 * 디지털 교과서 컨텐츠 여부 구분
 * @type {boolean}
 */
PUBPLE.isDt = false;

/**
 * 디지털 교과서 뷰어의 줌 값
 * @type {number}
 * @default 1
 */
PUBPLE.zoomVal = parent.ZOOMVALUE || 1;

/**
 * 터치 디바이스 여부 확인
 * @type {number}
 */
try {
    document.createEvent("TouchEvent");
    PUBPLE.isTouchDevice = true;
} catch (e) {
    PUBPLE.isTouchDevice = false;
}
/**
 * 새로운 namespace 생성
 * @method
 * @param {string} ns - namespace 이름
 * @returns {{}} - 생성 된 namespace
 */
PUBPLE.createNs = function(ns) {
    var parts = ns.split('.');
    var parent = PUBPLE;
    var partsLen;
    var i;

    if (parts[0] === 'PUBPLE') {
        parts = parts.slice(1);
    }

    partsLen = parts.length;
    for (i = 0; i < partsLen; i++) {
        if (typeof parent[parts[i]] === 'undefined') {
            parent[parts[i]] = {};
        }
        parent = parent[parts[i]];
    }

    return parent;
}