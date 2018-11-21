(function() {
    // Element.matches()
    if(!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype.msMatchesSelector ||
            Element.prototype.webkitMatchesSelector;
    }

    // Element.closest()
    if(!Element.prototype.closest) {
        Element.prototype.closest = function(s) {
            var el = this;
            if (!document.documentElement.contains(el)) return null;
            do {
                if (el.matches(s)) return el;
                el = el.parentElement || el.parentNode;
            } while (el !== null && el.nodeType === 1);
            return null;
        };
    }

    // Element.classList
    // helpers
    var regExp = function(name) {
        return new RegExp('(^| )'+ name +'( |$)');
    };
    var forEach = function(list, fn, scope) {
        for (var i = 0; i < list.length; i++) {
            fn.call(scope, list[i]);
        }
    };
    // class list object with basic methods
    function ClassList(element) {
        this.element = element;
    }

    ClassList.prototype = {
        add: function() {
            forEach(arguments, function(name) {
                if (!this.contains(name)) {
                    this.element.className += this.element.className.length > 0 ? ' ' + name : name;
                }
            }, this);
        },
        remove: function() {
            forEach(arguments, function(name) {
                this.element.className =
                    this.element.className.replace(regExp(name), '');
            }, this);
        },
        toggle: function(name) {
            return this.contains(name)
                ? (this.remove(name), false) : (this.add(name), true);
        },
        contains: function(name) {
            return regExp(name).test(this.element.className);
        },
        // bonus
        replace: function(oldName, newName) {
            this.remove(oldName), this.add(newName);
        }
    };
    // IE8/9, Safari
    if (!('classList' in Element.prototype)) {
        Object.defineProperty(Element.prototype, 'classList', {
            get: function() {
                return new ClassList(this);
            }
        });
    }
    // replace() support for others
    if (window.DOMTokenList && DOMTokenList.prototype.replace == null) {
        DOMTokenList.prototype.replace = ClassList.prototype.replace;
    }

    // Array fill
    if (!Array.prototype.fill) {
        Array.prototype.fill = function(value) {

        // Steps 1-2.
        if (this == null) {
          throw new TypeError('this is null or not defined');
        }

        var O = Object(this);

        // Steps 3-5.
        var len = O.length >>> 0;

        // Steps 6-7.
        var start = arguments[1];
        var relativeStart = start >> 0;

        // Step 8.
        var k = relativeStart < 0 ?
          Math.max(len + relativeStart, 0) :
          Math.min(relativeStart, len);

        // Steps 9-10.
        var end = arguments[2];
        var relativeEnd = end === undefined ?
          len : end >> 0;

        // Step 11.
        var final = relativeEnd < 0 ?
          Math.max(len + relativeEnd, 0) :
          Math.min(relativeEnd, len);

        // Step 12.
        while (k < final) {
          O[k] = value;
          k++;
        }

        // Step 13.
        return O;
      };
    }

    // https://tc39.github.io/ecma262/#sec-array.prototype.includes
    if (!Array.prototype.includes) {
      Object.defineProperty(Array.prototype, 'includes', {
        value: function(searchElement, fromIndex) {

          if (this == null) {
            throw new TypeError('"this" is null or not defined');
          }

          // 1. Let O be ? ToObject(this value).
          var o = Object(this);

          // 2. Let len be ? ToLength(? Get(O, "length")).
          var len = o.length >>> 0;

          // 3. If len is 0, return false.
          if (len === 0) {
            return false;
          }

          // 4. Let n be ? ToInteger(fromIndex).
          //    (If fromIndex is undefined, this step produces the value 0.)
          var n = fromIndex | 0;

          // 5. If n กร 0, then
          //  a. Let k be n.
          // 6. Else n < 0,
          //  a. Let k be len + n.
          //  b. If k < 0, let k be 0.
          var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

          function sameValueZero(x, y) {
            return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
          }

          // 7. Repeat, while k < len
          while (k < len) {
            // a. Let elementK be the result of ? Get(O, ! ToString(k)).
            // b. If SameValueZero(searchElement, elementK) is true, return true.
            if (sameValueZero(o[k], searchElement)) {
              return true;
            }
            // c. Increase k by 1. 
            k++;
          }

          // 8. Return false
          return false;
        }
      });
    }
}());