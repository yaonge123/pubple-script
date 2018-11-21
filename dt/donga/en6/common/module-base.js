"use strict";
/**
 * DEV namespace
 * @namespace DEV
 */
var DEV = DEV || {};
var dev;
var ZOOM_VALUE;

/**
 * 디지털 교과서 컨텐츠 여부 구분
 * @type {boolean}
 */
DEV.isDt = true;

/**
 * 새로운 namespace 생성
 * @method
 * @param {string} ns - namespace 이름
 * @returns {{}} - 생성 된 namespace
 */
DEV.createNs = function(ns) {
    var parts = ns.split(".");
    var parent = DEV;
    var partsLen;
    var i;

    if (parts[0] === "DEV") {
        parts = parts.slice(1);
    }

    partsLen = parts.length;
    for (i = 0; i < partsLen; i++) {
        if (typeof parent[parts[i]] === "undefined") {
            parent[parts[i]] = {};
        }
        parent = parent[parts[i]];
    }

    return parent;
}

if (typeof module !== "undefined") {
    module.exports = {
        DEV: DEV
    };
} else {
    dev = DEV;
}