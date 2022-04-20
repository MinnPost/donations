;(function($) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function (f) {
  if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object" && typeof module !== "undefined") {
    module.exports = f();
  } else if (typeof define === "function" && define.amd) {
    define([], f);
  } else {
    var g;

    if (typeof window !== "undefined") {
      g = window;
    } else if (typeof global !== "undefined") {
      g = global;
    } else if (typeof self !== "undefined") {
      g = self;
    } else {
      g = this;
    }

    (g.payment || (g.payment = {})).js = f();
  }
})(function () {
  var define, module, exports;
  return function e(t, n, r) {
    function s(o, u) {
      if (!n[o]) {
        if (!t[o]) {
          var a = typeof require == "function" && require;
          if (!u && a) return a(o, !0);
          if (i) return i(o, !0);
          var f = new Error("Cannot find module '" + o + "'");
          throw f.code = "MODULE_NOT_FOUND", f;
        }

        var l = n[o] = {
          exports: {}
        };
        t[o][0].call(l.exports, function (e) {
          var n = t[o][1][e];
          return s(n ? n : e);
        }, l, l.exports, e, t, n, r);
      }

      return n[o].exports;
    }

    var i = typeof require == "function" && require;

    for (var o = 0; o < r.length; o++) {
      s(r[o]);
    }

    return s;
  }({
    1: [function (require, module, exports) {
      var _QJ, rreturn, rtrim;

      _QJ = function QJ(selector) {
        if (_QJ.isDOMElement(selector)) {
          return selector;
        }

        return document.querySelectorAll(selector);
      };

      _QJ.isDOMElement = function (el) {
        return el && el.nodeName != null;
      };

      rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

      _QJ.trim = function (text) {
        if (text === null) {
          return "";
        } else {
          return (text + "").replace(rtrim, "");
        }
      };

      rreturn = /\r/g;

      _QJ.val = function (el, val) {
        var ret;

        if (arguments.length > 1) {
          return el.value = val;
        } else {
          ret = el.value;

          if (typeof ret === "string") {
            return ret.replace(rreturn, "");
          } else {
            if (ret === null) {
              return "";
            } else {
              return ret;
            }
          }
        }
      };

      _QJ.preventDefault = function (eventObject) {
        if (typeof eventObject.preventDefault === "function") {
          eventObject.preventDefault();
          return;
        }

        eventObject.returnValue = false;
        return false;
      };

      _QJ.normalizeEvent = function (e) {
        var original;
        original = e;
        e = {
          which: original.which != null ? original.which : void 0,
          target: original.target || original.srcElement,
          preventDefault: function preventDefault() {
            return _QJ.preventDefault(original);
          },
          originalEvent: original,
          data: original.data || original.detail
        };

        if (e.which == null) {
          e.which = original.charCode != null ? original.charCode : original.keyCode;
        }

        return e;
      };

      _QJ.on = function (element, eventName, callback) {
        var el, i, j, len, len1, multEventName, originalCallback, ref;

        if (element.length) {
          for (i = 0, len = element.length; i < len; i++) {
            el = element[i];

            _QJ.on(el, eventName, callback);
          }

          return;
        }

        if (eventName.match(" ")) {
          ref = eventName.split(" ");

          for (j = 0, len1 = ref.length; j < len1; j++) {
            multEventName = ref[j];

            _QJ.on(element, multEventName, callback);
          }

          return;
        }

        originalCallback = callback;

        callback = function callback(e) {
          e = _QJ.normalizeEvent(e);
          return originalCallback(e);
        };

        if (element.addEventListener) {
          return element.addEventListener(eventName, callback, false);
        }

        if (element.attachEvent) {
          eventName = "on" + eventName;
          return element.attachEvent(eventName, callback);
        }

        element['on' + eventName] = callback;
      };

      _QJ.addClass = function (el, className) {
        var e;

        if (el.length) {
          return function () {
            var i, len, results;
            results = [];

            for (i = 0, len = el.length; i < len; i++) {
              e = el[i];
              results.push(_QJ.addClass(e, className));
            }

            return results;
          }();
        }

        if (el.classList) {
          return el.classList.add(className);
        } else {
          return el.className += ' ' + className;
        }
      };

      _QJ.hasClass = function (el, className) {
        var e, hasClass, i, len;

        if (el.length) {
          hasClass = true;

          for (i = 0, len = el.length; i < len; i++) {
            e = el[i];
            hasClass = hasClass && _QJ.hasClass(e, className);
          }

          return hasClass;
        }

        if (el.classList) {
          return el.classList.contains(className);
        } else {
          return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
        }
      };

      _QJ.removeClass = function (el, className) {
        var cls, e, i, len, ref, results;

        if (el.length) {
          return function () {
            var i, len, results;
            results = [];

            for (i = 0, len = el.length; i < len; i++) {
              e = el[i];
              results.push(_QJ.removeClass(e, className));
            }

            return results;
          }();
        }

        if (el.classList) {
          ref = className.split(' ');
          results = [];

          for (i = 0, len = ref.length; i < len; i++) {
            cls = ref[i];
            results.push(el.classList.remove(cls));
          }

          return results;
        } else {
          return el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
      };

      _QJ.toggleClass = function (el, className, bool) {
        var e;

        if (el.length) {
          return function () {
            var i, len, results;
            results = [];

            for (i = 0, len = el.length; i < len; i++) {
              e = el[i];
              results.push(_QJ.toggleClass(e, className, bool));
            }

            return results;
          }();
        }

        if (bool) {
          if (!_QJ.hasClass(el, className)) {
            return _QJ.addClass(el, className);
          }
        } else {
          return _QJ.removeClass(el, className);
        }
      };

      _QJ.append = function (el, toAppend) {
        var e;

        if (el.length) {
          return function () {
            var i, len, results;
            results = [];

            for (i = 0, len = el.length; i < len; i++) {
              e = el[i];
              results.push(_QJ.append(e, toAppend));
            }

            return results;
          }();
        }

        return el.insertAdjacentHTML('beforeend', toAppend);
      };

      _QJ.find = function (el, selector) {
        if (el instanceof NodeList || el instanceof Array) {
          el = el[0];
        }

        return el.querySelectorAll(selector);
      };

      _QJ.trigger = function (el, name, data) {
        var e, error, ev;

        try {
          ev = new CustomEvent(name, {
            detail: data
          });
        } catch (error) {
          e = error;
          ev = document.createEvent('CustomEvent');

          if (ev.initCustomEvent) {
            ev.initCustomEvent(name, true, true, data);
          } else {
            ev.initEvent(name, true, true, data);
          }
        }

        return el.dispatchEvent(ev);
      };

      module.exports = _QJ;
    }, {}],
    2: [function (require, module, exports) {
      (function (global) {
        var Payment,
            QJ,
            cardFromNumber,
            cardFromType,
            cards,
            defaultFormat,
            formatBackCardNumber,
            formatBackExpiry,
            formatCardNumber,
            formatExpiry,
            formatForwardExpiry,
            formatForwardSlash,
            formatMonthExpiry,
            hasTextSelected,
            luhnCheck,
            reFormatCardNumber,
            restrictCVC,
            restrictCardNumber,
            restrictCombinedExpiry,
            restrictExpiry,
            restrictMonthExpiry,
            restrictNumeric,
            restrictYearExpiry,
            setCardType,
            indexOf = [].indexOf || function (item) {
          for (var i = 0, l = this.length; i < l; i++) {
            if (i in this && this[i] === item) return i;
          }

          return -1;
        };

        QJ = require('qj/src/qj.coffee');
        defaultFormat = /(\d{1,4})/g;
        cards = [{
          type: 'amex',
          pattern: /^3[47]/,
          format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
          length: [15],
          cvcLength: [4],
          luhn: true
        }, {
          type: 'dankort',
          pattern: /^5019/,
          format: defaultFormat,
          length: [16],
          cvcLength: [3],
          luhn: true
        }, {
          type: 'dinersclub',
          pattern: /^(36|38|30[0-5])/,
          format: defaultFormat,
          length: [14],
          cvcLength: [3],
          luhn: true
        }, {
          type: 'discover',
          pattern: /^(6011|65|64[4-9]|622)/,
          format: defaultFormat,
          length: [16],
          cvcLength: [3],
          luhn: true
        }, {
          type: 'jcb',
          pattern: /^35/,
          format: defaultFormat,
          length: [16],
          cvcLength: [3],
          luhn: true
        }, {
          type: 'laser',
          pattern: /^(6706|6771|6709)/,
          format: defaultFormat,
          length: [16, 17, 18, 19],
          cvcLength: [3],
          luhn: true
        }, {
          type: 'maestro',
          pattern: /^(5018|5020|5038|6304|6703|6759|676[1-3])/,
          format: defaultFormat,
          length: [12, 13, 14, 15, 16, 17, 18, 19],
          cvcLength: [3],
          luhn: true
        }, {
          type: 'mastercard',
          pattern: /^5[1-5]/,
          format: defaultFormat,
          length: [16],
          cvcLength: [3],
          luhn: true
        }, {
          type: 'unionpay',
          pattern: /^62/,
          format: defaultFormat,
          length: [16, 17, 18, 19],
          cvcLength: [3],
          luhn: false
        }, {
          type: 'visaelectron',
          pattern: /^4(026|17500|405|508|844|91[37])/,
          format: defaultFormat,
          length: [16],
          cvcLength: [3],
          luhn: true
        }, {
          type: 'visa',
          pattern: /^4/,
          format: defaultFormat,
          length: [13, 16],
          cvcLength: [3],
          luhn: true
        }, {
          type: 'elo',
          pattern: /^4011|438935|45(1416|76)|50(4175|6699|67|90[4-7])|63(6297|6368)/,
          format: defaultFormat,
          length: [16],
          cvcLength: [3],
          luhn: true
        }];

        cardFromNumber = function cardFromNumber(num) {
          var card, i, len;
          num = (num + '').replace(/\D/g, '');

          for (i = 0, len = cards.length; i < len; i++) {
            card = cards[i];

            if (card.pattern.test(num)) {
              return card;
            }
          }
        };

        cardFromType = function cardFromType(type) {
          var card, i, len;

          for (i = 0, len = cards.length; i < len; i++) {
            card = cards[i];

            if (card.type === type) {
              return card;
            }
          }
        };

        luhnCheck = function luhnCheck(num) {
          var digit, digits, i, len, odd, sum;
          odd = true;
          sum = 0;
          digits = (num + '').split('').reverse();

          for (i = 0, len = digits.length; i < len; i++) {
            digit = digits[i];
            digit = parseInt(digit, 10);

            if (odd = !odd) {
              digit *= 2;
            }

            if (digit > 9) {
              digit -= 9;
            }

            sum += digit;
          }

          return sum % 10 === 0;
        };

        hasTextSelected = function hasTextSelected(target) {
          var ref;

          if (target.selectionStart != null && target.selectionStart !== target.selectionEnd) {
            return true;
          }

          if ((typeof document !== "undefined" && document !== null ? (ref = document.selection) != null ? ref.createRange : void 0 : void 0) != null) {
            if (document.selection.createRange().text) {
              return true;
            }
          }

          return false;
        };

        reFormatCardNumber = function reFormatCardNumber(e) {
          return setTimeout(function (_this) {
            return function () {
              var target, value;
              target = e.target;
              value = QJ.val(target);
              value = Payment.fns.formatCardNumber(value);
              return QJ.val(target, value);
            };
          }(this));
        };

        formatCardNumber = function formatCardNumber(e) {
          var card, digit, length, re, target, upperLength, value;
          digit = String.fromCharCode(e.which);

          if (!/^\d+$/.test(digit)) {
            return;
          }

          target = e.target;
          value = QJ.val(target);
          card = cardFromNumber(value + digit);
          length = (value.replace(/\D/g, '') + digit).length;
          upperLength = 16;

          if (card) {
            upperLength = card.length[card.length.length - 1];
          }

          if (length >= upperLength) {
            return;
          }

          if (target.selectionStart != null && target.selectionStart !== value.length) {
            return;
          }

          if (card && card.type === 'amex') {
            re = /^(\d{4}|\d{4}\s\d{6})$/;
          } else {
            re = /(?:^|\s)(\d{4})$/;
          }

          if (re.test(value)) {
            e.preventDefault();
            return QJ.val(target, value + ' ' + digit);
          } else if (re.test(value + digit)) {
            e.preventDefault();
            return QJ.val(target, value + digit + ' ');
          }
        };

        formatBackCardNumber = function formatBackCardNumber(e) {
          var target, value;
          target = e.target;
          value = QJ.val(target);

          if (e.meta) {
            return;
          }

          if (e.which !== 8) {
            return;
          }

          if (target.selectionStart != null && target.selectionStart !== value.length) {
            return;
          }

          if (/\d\s$/.test(value)) {
            e.preventDefault();
            return QJ.val(target, value.replace(/\d\s$/, ''));
          } else if (/\s\d?$/.test(value)) {
            e.preventDefault();
            return QJ.val(target, value.replace(/\s\d?$/, ''));
          }
        };

        formatExpiry = function formatExpiry(e) {
          var digit, target, val;
          digit = String.fromCharCode(e.which);

          if (!/^\d+$/.test(digit)) {
            return;
          }

          target = e.target;
          val = QJ.val(target) + digit;

          if (/^\d$/.test(val) && val !== '0' && val !== '1') {
            e.preventDefault();
            return QJ.val(target, "0" + val + " / ");
          } else if (/^\d\d$/.test(val)) {
            e.preventDefault();
            return QJ.val(target, val + " / ");
          }
        };

        formatMonthExpiry = function formatMonthExpiry(e) {
          var digit, target, val;
          digit = String.fromCharCode(e.which);

          if (!/^\d+$/.test(digit)) {
            return;
          }

          target = e.target;
          val = QJ.val(target) + digit;

          if (/^\d$/.test(val) && val !== '0' && val !== '1') {
            e.preventDefault();
            return QJ.val(target, "0" + val);
          } else if (/^\d\d$/.test(val)) {
            e.preventDefault();
            return QJ.val(target, "" + val);
          }
        };

        formatForwardExpiry = function formatForwardExpiry(e) {
          var digit, target, val;
          digit = String.fromCharCode(e.which);

          if (!/^\d+$/.test(digit)) {
            return;
          }

          target = e.target;
          val = QJ.val(target);

          if (/^\d\d$/.test(val)) {
            return QJ.val(target, val + " / ");
          }
        };

        formatForwardSlash = function formatForwardSlash(e) {
          var slash, target, val;
          slash = String.fromCharCode(e.which);

          if (slash !== '/') {
            return;
          }

          target = e.target;
          val = QJ.val(target);

          if (/^\d$/.test(val) && val !== '0') {
            return QJ.val(target, "0" + val + " / ");
          }
        };

        formatBackExpiry = function formatBackExpiry(e) {
          var target, value;

          if (e.metaKey) {
            return;
          }

          target = e.target;
          value = QJ.val(target);

          if (e.which !== 8) {
            return;
          }

          if (target.selectionStart != null && target.selectionStart !== value.length) {
            return;
          }

          if (/\d(\s|\/)+$/.test(value)) {
            e.preventDefault();
            return QJ.val(target, value.replace(/\d(\s|\/)*$/, ''));
          } else if (/\s\/\s?\d?$/.test(value)) {
            e.preventDefault();
            return QJ.val(target, value.replace(/\s\/\s?\d?$/, ''));
          }
        };

        restrictNumeric = function restrictNumeric(e) {
          var input;

          if (e.metaKey || e.ctrlKey) {
            return true;
          }

          if (e.which === 32) {
            return e.preventDefault();
          }

          if (e.which === 0) {
            return true;
          }

          if (e.which < 33) {
            return true;
          }

          input = String.fromCharCode(e.which);

          if (!/[\d\s]/.test(input)) {
            return e.preventDefault();
          }
        };

        restrictCardNumber = function restrictCardNumber(e) {
          var card, digit, target, value;
          target = e.target;
          digit = String.fromCharCode(e.which);

          if (!/^\d+$/.test(digit)) {
            return;
          }

          if (hasTextSelected(target)) {
            return;
          }

          value = (QJ.val(target) + digit).replace(/\D/g, '');
          card = cardFromNumber(value);

          if (card) {
            if (!(value.length <= card.length[card.length.length - 1])) {
              return e.preventDefault();
            }
          } else {
            if (!(value.length <= 16)) {
              return e.preventDefault();
            }
          }
        };

        restrictExpiry = function restrictExpiry(e, length) {
          var digit, target, value;
          target = e.target;
          digit = String.fromCharCode(e.which);

          if (!/^\d+$/.test(digit)) {
            return;
          }

          if (hasTextSelected(target)) {
            return;
          }

          value = QJ.val(target) + digit;
          value = value.replace(/\D/g, '');

          if (value.length > length) {
            return e.preventDefault();
          }
        };

        restrictCombinedExpiry = function restrictCombinedExpiry(e) {
          return restrictExpiry(e, 6);
        };

        restrictMonthExpiry = function restrictMonthExpiry(e) {
          return restrictExpiry(e, 2);
        };

        restrictYearExpiry = function restrictYearExpiry(e) {
          return restrictExpiry(e, 4);
        };

        restrictCVC = function restrictCVC(e) {
          var digit, target, val;
          target = e.target;
          digit = String.fromCharCode(e.which);

          if (!/^\d+$/.test(digit)) {
            return;
          }

          if (hasTextSelected(target)) {
            return;
          }

          val = QJ.val(target) + digit;

          if (!(val.length <= 4)) {
            return e.preventDefault();
          }
        };

        setCardType = function setCardType(e) {
          var allTypes, card, cardType, target, val;
          target = e.target;
          val = QJ.val(target);
          cardType = Payment.fns.cardType(val) || 'unknown';

          if (!QJ.hasClass(target, cardType)) {
            allTypes = function () {
              var i, len, results;
              results = [];

              for (i = 0, len = cards.length; i < len; i++) {
                card = cards[i];
                results.push(card.type);
              }

              return results;
            }();

            QJ.removeClass(target, 'unknown');
            QJ.removeClass(target, allTypes.join(' '));
            QJ.addClass(target, cardType);
            QJ.toggleClass(target, 'identified', cardType !== 'unknown');
            return QJ.trigger(target, 'payment.cardType', cardType);
          }
        };

        Payment = function () {
          function Payment() {}

          Payment.fns = {
            cardExpiryVal: function cardExpiryVal(value) {
              var month, prefix, ref, year;
              value = value.replace(/\s/g, '');
              ref = value.split('/', 2), month = ref[0], year = ref[1];

              if ((year != null ? year.length : void 0) === 2 && /^\d+$/.test(year)) {
                prefix = new Date().getFullYear();
                prefix = prefix.toString().slice(0, 2);
                year = prefix + year;
              }

              month = parseInt(month, 10);
              year = parseInt(year, 10);
              return {
                month: month,
                year: year
              };
            },
            validateCardNumber: function validateCardNumber(num) {
              var card, ref;
              num = (num + '').replace(/\s+|-/g, '');

              if (!/^\d+$/.test(num)) {
                return false;
              }

              card = cardFromNumber(num);

              if (!card) {
                return false;
              }

              return (ref = num.length, indexOf.call(card.length, ref) >= 0) && (card.luhn === false || luhnCheck(num));
            },
            validateCardExpiry: function validateCardExpiry(month, year) {
              var currentTime, expiry, prefix, ref;

              if (_typeof(month) === 'object' && 'month' in month) {
                ref = month, month = ref.month, year = ref.year;
              }

              if (!(month && year)) {
                return false;
              }

              month = QJ.trim(month);
              year = QJ.trim(year);

              if (!/^\d+$/.test(month)) {
                return false;
              }

              if (!/^\d+$/.test(year)) {
                return false;
              }

              if (!(parseInt(month, 10) <= 12)) {
                return false;
              }

              if (year.length === 2) {
                prefix = new Date().getFullYear();
                prefix = prefix.toString().slice(0, 2);
                year = prefix + year;
              }

              expiry = new Date(year, month);
              currentTime = new Date();
              expiry.setMonth(expiry.getMonth() - 1);
              expiry.setMonth(expiry.getMonth() + 1, 1);
              return expiry > currentTime;
            },
            validateCardCVC: function validateCardCVC(cvc, type) {
              var ref, ref1;
              cvc = QJ.trim(cvc);

              if (!/^\d+$/.test(cvc)) {
                return false;
              }

              if (type && cardFromType(type)) {
                return ref = cvc.length, indexOf.call((ref1 = cardFromType(type)) != null ? ref1.cvcLength : void 0, ref) >= 0;
              } else {
                return cvc.length >= 3 && cvc.length <= 4;
              }
            },
            cardType: function cardType(num) {
              var ref;

              if (!num) {
                return null;
              }

              return ((ref = cardFromNumber(num)) != null ? ref.type : void 0) || null;
            },
            formatCardNumber: function formatCardNumber(num) {
              var card, groups, ref, upperLength;
              card = cardFromNumber(num);

              if (!card) {
                return num;
              }

              upperLength = card.length[card.length.length - 1];
              num = num.replace(/\D/g, '');
              num = num.slice(0, +upperLength + 1 || 9e9);

              if (card.format.global) {
                return (ref = num.match(card.format)) != null ? ref.join(' ') : void 0;
              } else {
                groups = card.format.exec(num);

                if (groups != null) {
                  groups.shift();
                }

                return groups != null ? groups.join(' ') : void 0;
              }
            }
          };

          Payment.restrictNumeric = function (el) {
            return QJ.on(el, 'keypress', restrictNumeric);
          };

          Payment.cardExpiryVal = function (el) {
            return Payment.fns.cardExpiryVal(QJ.val(el));
          };

          Payment.formatCardCVC = function (el) {
            Payment.restrictNumeric(el);
            QJ.on(el, 'keypress', restrictCVC);
            return el;
          };

          Payment.formatCardExpiry = function (el) {
            var month, year;
            Payment.restrictNumeric(el);

            if (el.length && el.length === 2) {
              month = el[0], year = el[1];
              this.formatCardExpiryMultiple(month, year);
            } else {
              QJ.on(el, 'keypress', restrictCombinedExpiry);
              QJ.on(el, 'keypress', formatExpiry);
              QJ.on(el, 'keypress', formatForwardSlash);
              QJ.on(el, 'keypress', formatForwardExpiry);
              QJ.on(el, 'keydown', formatBackExpiry);
            }

            return el;
          };

          Payment.formatCardExpiryMultiple = function (month, year) {
            QJ.on(month, 'keypress', restrictMonthExpiry);
            QJ.on(month, 'keypress', formatMonthExpiry);
            return QJ.on(year, 'keypress', restrictYearExpiry);
          };

          Payment.formatCardNumber = function (el) {
            Payment.restrictNumeric(el);
            QJ.on(el, 'keypress', restrictCardNumber);
            QJ.on(el, 'keypress', formatCardNumber);
            QJ.on(el, 'keydown', formatBackCardNumber);
            QJ.on(el, 'keyup', setCardType);
            QJ.on(el, 'paste', reFormatCardNumber);
            return el;
          };

          Payment.getCardArray = function () {
            return cards;
          };

          Payment.setCardArray = function (cardArray) {
            cards = cardArray;
            return true;
          };

          Payment.addToCardArray = function (cardObject) {
            return cards.push(cardObject);
          };

          Payment.removeFromCardArray = function (type) {
            var key, value;

            for (key in cards) {
              value = cards[key];

              if (value.type === type) {
                cards.splice(key, 1);
              }
            }

            return true;
          };

          return Payment;
        }();

        module.exports = Payment;
        global.Payment = Payment;
      }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
      "qj/src/qj.coffee": 1
    }]
  }, {}, [2])(2);
});
"use strict";

function tlite(t) {
  document.addEventListener("mouseover", function (e) {
    var i = e.target,
        n = t(i);
    n || (n = (i = i.parentElement) && t(i)), n && tlite.show(i, n, !0);
  });
}

tlite.show = function (t, e, i) {
  var n = "data-tlite";
  e = e || {}, (t.tooltip || function (t, e) {
    function o() {
      tlite.hide(t, !0);
    }

    function l() {
      r || (r = function (t, e, i) {
        function n() {
          o.className = "tlite tlite-" + r + s;
          var e = t.offsetTop,
              i = t.offsetLeft;
          o.offsetParent === t && (e = i = 0);
          var n = t.offsetWidth,
              l = t.offsetHeight,
              d = o.offsetHeight,
              f = o.offsetWidth,
              a = i + n / 2;
          o.style.top = ("s" === r ? e - d - 10 : "n" === r ? e + l + 10 : e + l / 2 - d / 2) + "px", o.style.left = ("w" === s ? i : "e" === s ? i + n - f : "w" === r ? i + n + 10 : "e" === r ? i - f - 10 : a - f / 2) + "px";
        }

        var o = document.createElement("span"),
            l = i.grav || t.getAttribute("data-tlite") || "n";
        o.innerHTML = e, t.appendChild(o);
        var r = l[0] || "",
            s = l[1] || "";
        n();
        var d = o.getBoundingClientRect();
        return "s" === r && d.top < 0 ? (r = "n", n()) : "n" === r && d.bottom > window.innerHeight ? (r = "s", n()) : "e" === r && d.left < 0 ? (r = "w", n()) : "w" === r && d.right > window.innerWidth && (r = "e", n()), o.className += " tlite-visible", o;
      }(t, d, e));
    }

    var r, s, d;
    return t.addEventListener("mousedown", o), t.addEventListener("mouseleave", o), t.tooltip = {
      show: function show() {
        d = t.title || t.getAttribute(n) || d, t.title = "", t.setAttribute(n, ""), d && !s && (s = setTimeout(l, i ? 150 : 1));
      },
      hide: function hide(t) {
        if (i === t) {
          s = clearTimeout(s);
          var e = r && r.parentNode;
          e && e.removeChild(r), r = void 0;
        }
      }
    };
  }(t, e)).show();
}, tlite.hide = function (t, e) {
  t.tooltip && t.tooltip.hide(e);
}, "undefined" != typeof module && module.exports && (module.exports = tlite);
"use strict";

(function () {
  function r(e, n, t) {
    function o(i, f) {
      if (!n[i]) {
        if (!e[i]) {
          var c = "function" == typeof require && require;
          if (!f && c) return c(i, !0);
          if (u) return u(i, !0);
          var a = new Error("Cannot find module '" + i + "'");
          throw a.code = "MODULE_NOT_FOUND", a;
        }

        var p = n[i] = {
          exports: {}
        };
        e[i][0].call(p.exports, function (r) {
          var n = e[i][1][r];
          return o(n || r);
        }, p, p.exports, r, e, n, t);
      }

      return n[i].exports;
    }

    for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) {
      o(t[i]);
    }

    return o;
  }

  return r;
})()({
  1: [function (require, module, exports) {
    "use strict";

    var _validForm = require("./src/valid-form");

    var _validForm2 = _interopRequireDefault(_validForm);

    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
        default: obj
      };
    }

    window.ValidForm = _validForm2.default;
    window.ValidForm.toggleInvalidClass = _validForm.toggleInvalidClass;
    window.ValidForm.handleCustomMessages = _validForm.handleCustomMessages;
    window.ValidForm.handleCustomMessageDisplay = _validForm.handleCustomMessageDisplay;
  }, {
    "./src/valid-form": 3
  }],
  2: [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.clone = clone;
    exports.defaults = defaults;
    exports.insertAfter = insertAfter;
    exports.insertBefore = insertBefore;
    exports.forEach = forEach;
    exports.debounce = debounce;

    function clone(obj) {
      var copy = {};

      for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
      }

      return copy;
    }

    function defaults(obj, defaultObject) {
      obj = clone(obj || {});

      for (var k in defaultObject) {
        if (obj[k] === undefined) obj[k] = defaultObject[k];
      }

      return obj;
    }

    function insertAfter(refNode, nodeToInsert) {
      var sibling = refNode.nextSibling;

      if (sibling) {
        var _parent = refNode.parentNode;

        _parent.insertBefore(nodeToInsert, sibling);
      } else {
        parent.appendChild(nodeToInsert);
      }
    }

    function insertBefore(refNode, nodeToInsert) {
      var parent = refNode.parentNode;
      parent.insertBefore(nodeToInsert, refNode);
    }

    function forEach(items, fn) {
      if (!items) return;

      if (items.forEach) {
        items.forEach(fn);
      } else {
        for (var i = 0; i < items.length; i++) {
          fn(items[i], i, items);
        }
      }
    }

    function debounce(ms, fn) {
      var timeout = void 0;

      var debouncedFn = function debouncedFn() {
        clearTimeout(timeout);
        timeout = setTimeout(fn, ms);
      };

      return debouncedFn;
    }
  }, {}],
  3: [function (require, module, exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.toggleInvalidClass = toggleInvalidClass;
    exports.handleCustomMessages = handleCustomMessages;
    exports.handleCustomMessageDisplay = handleCustomMessageDisplay;
    exports.default = validForm;

    var _util = require("./util");

    function toggleInvalidClass(input, invalidClass) {
      input.addEventListener("invalid", function () {
        input.classList.add(invalidClass);
      });
      input.addEventListener("input", function () {
        if (input.validity.valid) {
          input.classList.remove(invalidClass);
        }
      });
    }

    var errorProps = ["badInput", "patternMismatch", "rangeOverflow", "rangeUnderflow", "stepMismatch", "tooLong", "tooShort", "typeMismatch", "valueMissing", "customError"];

    function getCustomMessage(input, customMessages) {
      customMessages = customMessages || {};
      var localErrorProps = [input.type + "Mismatch"].concat(errorProps);
      var validity = input.validity;

      for (var i = 0; i < localErrorProps.length; i++) {
        var prop = localErrorProps[i];

        if (validity[prop]) {
          return input.getAttribute("data-" + prop) || customMessages[prop];
        }
      }
    }

    function handleCustomMessages(input, customMessages) {
      function checkValidity() {
        var message = input.validity.valid ? null : getCustomMessage(input, customMessages);
        input.setCustomValidity(message || "");
      }

      input.addEventListener("input", checkValidity);
      input.addEventListener("invalid", checkValidity);
    }

    function handleCustomMessageDisplay(input, options) {
      var validationErrorClass = options.validationErrorClass,
          validationErrorParentClass = options.validationErrorParentClass,
          errorPlacement = options.errorPlacement;

      function checkValidity(options) {
        var insertError = options.insertError;
        var parentNode = input.parentNode;
        var errorNode = parentNode.querySelector("." + validationErrorClass) || document.createElement("div");

        if (!input.validity.valid && input.validationMessage) {
          errorNode.className = validationErrorClass;
          errorNode.textContent = input.validationMessage;

          if (insertError) {
            errorPlacement === "before" ? (0, _util.insertBefore)(input, errorNode) : (0, _util.insertAfter)(input, errorNode);
            parentNode.classList.add(validationErrorParentClass);
          }
        } else {
          parentNode.classList.remove(validationErrorParentClass);
          errorNode.remove();
        }
      }

      input.addEventListener("input", function () {
        checkValidity({
          insertError: false
        });
      });
      input.addEventListener("invalid", function (e) {
        e.preventDefault();
        checkValidity({
          insertError: true
        });
      });
    }

    var defaultOptions = {
      invalidClass: "invalid",
      validationErrorClass: "validation-error",
      validationErrorParentClass: "has-validation-error",
      customMessages: {},
      errorPlacement: "before"
    };

    function validForm(element, options) {
      if (!element || !element.nodeName) {
        throw new Error("First arg to validForm must be a form, input, select, or textarea");
      }

      var inputs = void 0;
      var type = element.nodeName.toLowerCase();
      options = (0, _util.defaults)(options, defaultOptions);

      if (type === "form") {
        inputs = element.querySelectorAll("input, select, textarea");
        focusInvalidInput(element, inputs);
      } else if (type === "input" || type === "select" || type === "textarea") {
        inputs = [element];
      } else {
        throw new Error("Only form, input, select, or textarea elements are supported");
      }

      validFormInputs(inputs, options);
    }

    function focusInvalidInput(form, inputs) {
      var focusFirst = (0, _util.debounce)(100, function () {
        var invalidNode = form.querySelector(":invalid");
        if (invalidNode) invalidNode.focus();
      });
      (0, _util.forEach)(inputs, function (input) {
        return input.addEventListener("invalid", focusFirst);
      });
    }

    function validFormInputs(inputs, options) {
      var invalidClass = options.invalidClass,
          customMessages = options.customMessages;
      (0, _util.forEach)(inputs, function (input) {
        toggleInvalidClass(input, invalidClass);
        handleCustomMessages(input, customMessages);
        handleCustomMessageDisplay(input, options);
      });
    }
  }, {
    "./util": 2
  }]
}, {}, [1]);
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

// MinnPost Giving plugin
// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;

(function ($, window, document, undefined) {
  // undefined is used here as the undefined global variable in ECMAScript 3 is
  // mutable (ie. it can be changed by someone else). undefined isn't really being
  // passed in so we can ensure the value of it is truly undefined. In ES5, undefined
  // can no longer be modified.
  // window and document are passed through as local variable rather than global
  // as this (slightly) quickens the resolution process and can be more efficiently
  // minified (especially when both are regularly referenced in your plugin).
  // Create the defaults once
  var pluginName = 'minnpost_giving',
      defaults = {
    'debug': false,
    // this can be set to true on page level options
    'stripe_publishable_key': '',
    'plaid_env': '',
    'plaid_link': '#authorize-ach',
    'minnpost_root': 'https://www.minnpost.com',
    'analytics_type': '',
    'progress_selector': '.m-support-progress',
    'form_selector': '.m-form',
    'donate_form_selector': '#donate',
    'confirm_form_selector': '#confirm',
    'finish_section_selector': '#panel--confirmation',
    'pay_cc_processing_selector': 'input[name="pay_fees"]',
    'fee_amount': '.processing-amount',
    'level_amount_selector': '#panel--pay .amount .level-amount',
    // we can maybe get rid of this
    'original_amount_selector': '[name="amount"]',
    'fair_market_value_selector': '#fair_market_value',
    'full_amount_selector': '.full-amount',
    'installment_period_selector': '[name="installment_period"]',
    'name_selector': '.m-form-item-display-name',
    'in_honor_or_memory_field_selector': '.m-form-item-honor-memory',
    'honor_or_memory_chooser': 'input[name="in_honor_or_memory"]',
    // radio fields
    'honor_type_selector': '.a-honor-type',
    // span inside label
    'honor_memory_input_group': '.a-honor-or-memory',
    // holds the form field
    'anonymous_selector': '#anonymous',
    'show_billing_country_selector': '#billing_show_country',
    'billing_country_selector': '.m-form-item-country',
    'show_shipping_country_selector': '#shipping_show_country',
    'shipping_country_selector': '.m-form-item-shipping-country',
    'shipping_address_selector': '.m-form-item-shipping-address',
    'use_for_shipping_selector': '#useforshipping',
    'email_field_selector': '#email',
    'password_field_selector': '#password',
    'first_name_field_selector': '#first_name',
    'last_name_field_selector': '#last_name',
    'billing_street_field_selector': '#billing_street',
    'billing_city_field_selector': '#billing_city',
    'billing_state_field_selector': '#billing_state',
    'billing_zip_field_selector': '#billing_zip',
    'billing_country_field_selector': '#billing_country',
    'shipping_state_field_selector': '#shipping_state',
    'shipping_zip_field_selector': '#shipping_zip',
    'shipping_country_field_selector': '#shipping_country',
    'create_mp_selector': '#creatempaccount',
    'password_selector': '.m-form-item-password',
    'additional_amount_field': '#additional_donation',
    'shipping_selector': 'fieldset.m-shipping-information',
    'choose_payment': '#choose-payment-method',
    'payment_method_selector': '.payment-method',
    'cc_num_selector': '#card-number',
    'cc_exp_selector': '#card-expiry',
    'cc_cvc_selector': '#card-cvc',
    'pay_button_selector': '.a-button-pay',
    'opp_id_selector': '#lock_key',
    // we use this value as the Google Analytics transaction ID
    'newsletter_group_selector': '.support-newsletters'
  }; // end defaults
  // The actual plugin constructor

  function Plugin(element, options) {
    this.element = element; // jQuery has an extend method which merges the contents of two or
    // more objects, storing the result in the first object. The first object
    // is generally empty as we don't want to alter the default options for
    // future instances of the plugin

    this.options = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  } // end constructor


  Plugin.prototype = {
    init: function init(reset, amount) {
      document.documentElement.classList.remove('no-js');
      document.documentElement.classList.add('js'); // Place initialization logic here
      // You already have access to the DOM element and
      // the options via the instance, e.g. this.element
      // and this.options
      // you can add more functions like the one below and
      // call them like so: this.yourOtherFunction(this.element, this.options).
      // modify options as needed
      //var this.options.amount = '';

      if (reset !== true) {
        this.options.amount = parseFloat($(this.options.level_amount_selector, this.element).text());
      } else {
        this.options.amount = amount;
      }

      this.options.original_amount = parseInt($(this.options.original_amount_selector, this.element).val(), 10);
      this.options.processing_fee = (Math.round(parseFloat(this.options.fee_amount) * Math.pow(10, 2)) / Math.pow(10, 2)).toFixed(2);
      this.options.processing_fee_text = this.options.processing_fee;
      this.options.create_account = false;
      var button_text = $(this.options.pay_button_selector).text();
      this.options.button_text = button_text;
      this.stripe = Stripe(this.options.stripe_publishable_key);
      this.elements = this.stripe.elements({
        fonts: [{
          // integrate your font into stripe
          cssSrc: 'https://use.typekit.net/cxj7fzg.css'
        }]
      });

      if (this.options.debug === true) {
        this.debug(this.options); // return;
      } // call functions


      this.analyticsTracking(this.options); // track analytics events

      this.amountAsRadio(this.element, this.options); // if the amount field is a radio button

      this.amountUpdated(this.element, this.options); // if the amount text field can change

      if ($(this.options.pay_cc_processing_selector).length > 0) {
        this.creditCardProcessingFees(this.options); // processing fees
      } // the main form ID. this is not used for cancelling


      if ($(this.options.donate_form_selector).length > 0) {
        this.donateAnonymously(this.element, this.options); // anonymous

        this.honorOrMemoryToggle(this.element, this.options); // in honor or in memory of someone

        this.outsideUnitedStates(this.element, this.options); // outside US

        this.shippingAddress(this.element, this.options); // shipping address

        this.allowMinnpostAccount(this.element, this.options); // option for creating minnpost account

        this.paymentRequestButton(this.element, this.options); // create paymentrequest button

        this.choosePaymentMethod(this.element, this.options); // switch between card and ach

        this.creditCardFields(this.element, this.options); // do stuff with the credit card fields

        this.validateSetup(this.element, this.options); // setup how validation errors work

        this.formSetup(this.element, this.options); // validate and submit the form
      }

      if ($(this.options.confirm_form_selector).length > 0) {
        this.showNewsletterSettings(this.element, this.options);
        this.confirmMessageSubmit(this.element, this.options); // submit the stuff on the confirmation page
      }
    },
    // init
    debug: function debug(message) {
      if (this.options.debug === true) {
        if (_typeof(message) !== 'object') {
          console.log(message);
        } else {
          console.dir(message);
        }

        console.dir(this);
      }
    },
    // debug
    analyticsTracking: function analyticsTracking(options) {
      this.debug('analytics type is ' + options.analytics_type);
      var progress = $(options.progress_selector);
      var step;
      var action = 'checkout';
      var nav_item_count = 0;
      var opp_id = $(options.opp_id_selector).val();
      var post_purchase = false;

      if (options.analytics_type == 'analyticsjs') {
        ga('require', 'ec');
      }

      if (progress.length > 0) {
        nav_item_count = $('li', progress).length; // length is not zero based

        step = $('li .active', progress).parent().index() + 1; // index is zero based
      } // there is a progress menu, AND there IS NOT a confirm form selector
      // if that is the case, we're not on the purchase step


      if (progress.length > 0 && $(options.confirm_form_selector).length === 0) {
        // the active tab matches the count of items AND there is NOT a confirm form to be submitted
        // that means we're on a post purchase step.
        if (step === nav_item_count && $(options.confirm_form_selector).length === 0) {
          step = step + 1;
          post_purchase = true;
        }
      } else if (progress.length > 0 && $(options.confirm_form_selector).length > 0 || $(options.finish_section_selector).length > 0) {
        // we are on the confirm form selector and there is a progress measure
        // OR, we are on the finish selector and there is NOT a progress measure
        // these mean the user just purchased.
        action = 'purchase';
      } else if (progress.length === 0) {
        return;
      }

      this.debug('step is ' + step + ' and nav item count is ' + nav_item_count + ' and opp id is ' + opp_id + ' and post purchase is ' + post_purchase);
      this.analyticsTrackingStep(step, action, post_purchase);
    },
    // analyticsTracking
    analyticsTrackingStep: function analyticsTrackingStep(step, action, post_purchase) {
      var progress = $(this.options.progress_selector);
      var amount = $(this.options.original_amount_selector).val();
      var opp_id = $(this.options.opp_id_selector).val();
      var installment_period = 'one-time';
      var level;
      var that = this;

      if ($(this.options.installment_period_selector).length > 0) {
        installment_period = $(this.options.installment_period_selector).val();
      } // if we're not after the purchase, use addProduct
      //if (progress.length > 0 && post_purchase !== true) {


      if (progress.length > 0) {
        var data = {
          amount: amount,
          installment_period: installment_period
        };
        $.ajax({
          method: 'POST',
          url: '/calculate-member-level/',
          data: data
        }).done(function (data) {
          if ($(data.level).length > 0) {
            level = data.level.level;
            that.debug('create product object: id is ' + 'minnpost_' + level.toLowerCase() + '_membership' + ' and name is ' + 'MinnPost ' + level.charAt(0).toUpperCase() + level.slice(1) + ' Membership' + ' and variant is ' + installment_period.charAt(0).toUpperCase() + installment_period.slice(1));
            var product = {
              'id': 'minnpost_' + level.toLowerCase() + '_membership',
              'name': 'MinnPost ' + level.charAt(0).toUpperCase() + level.slice(1) + ' Membership',
              'category': 'Donation',
              'brand': 'MinnPost',
              'variant': installment_period.charAt(0).toUpperCase() + installment_period.slice(1),
              'price': that.getTotalAmount(amount),
              'quantity': 1
            };

            if (that.options.analytics_type == 'gtagjs') {
              gtag('event', 'checkout_progress', {
                "value": that.getTotalAmount(amount),
                "items": [product],
                "checkout_step": step,
                "checkout_option": action
              });
            } else if (that.options.analytics_type == 'analyticsjs') {
              ga('ec:addProduct', product);
            }

            if (action === 'purchase') {
              that.debug('add a purchase action. step is ' + step + ' and action is ' + action);

              if (that.options.analytics_type == 'gtagjs') {
                gtag('event', action, {
                  "transaction_id": opp_id,
                  // Transaction id - Type: string
                  "affiliation": 'MinnPost',
                  // Store name - Type: string
                  "value": that.getTotalAmount(amount),
                  // Total Revenue - Type: numeric
                  "currency": "USD",
                  "items": [product],
                  "checkout_step": step
                });
              } else if (that.options.analytics_type == 'analyticsjs') {
                ga('ec:setAction', action, {
                  'id': opp_id,
                  // Transaction id - Type: string
                  'affiliation': 'MinnPost',
                  // Store name - Type: string
                  'revenue': amount,
                  // Total Revenue - Type: numeric
                  'step': step
                });
              }
            }

            if (that.options.analytics_type == 'gtagjs') {
              gtag('event', 'page_view', {
                page_title: document.title,
                page_path: window.location.pathname
              });
            } else if (that.options.analytics_type == 'analyticsjs') {
              ga('set', {
                page: window.location.pathname,
                title: document.title
              });
              ga('send', 'pageview', window.location.pathname);
            }
          }
        });
      }
    },
    // analyticsTrackingStep
    amountAsRadio: function amountAsRadio(element, options) {
      // when amount field is a radio button, we need to check it whenever it changes
      var that = this;
      that.setRadioAmount($(options.original_amount_selector, element), element, options);
      $(options.original_amount_selector, element).change(function () {
        that.setRadioAmount($(this), element, options);
      });
    },
    // amountAsRadio
    setRadioAmount: function setRadioAmount(field, element, options) {
      var that = this;
      var stripe_payment_type = that.getStripePaymentType();
      var amount = $(options.original_amount_selector + ':checked', element).val();

      if (field.is(':radio') && typeof amount !== 'undefined') {
        options.original_amount = parseInt(amount, 10);
        that.calculateFees(that.options.original_amount, stripe_payment_type);
        that.setFairMarketValue(field);
      }
    },
    // setRadioAmount
    amountUpdated: function amountUpdated(element, options) {
      // when new amount text field can change, we need to change the hidden field
      // there is also potentially an additional amount field value to add
      var that = this;
      var stripe_payment_type = that.getStripePaymentType(); // set the fair market value if applicable

      var amount_selector_fair_market = $(options.original_amount_selector, element);

      if (amount_selector_fair_market.is(':radio')) {
        amount_selector_fair_market = $(options.original_amount_selector + ':checked', element);
      }

      that.setFairMarketValue(amount_selector_fair_market);
      $(options.original_amount_selector, element).change(function () {
        that.options.original_amount = parseInt($(this, element).val(), 10);
        that.calculateFees(that.options.original_amount, stripe_payment_type);
        that.setFairMarketValue($(this, element));
      });
      $(options.additional_amount_field, element).change(function () {
        that.options.original_amount = parseInt($(options.original_amount_selector, element).val(), 10);
        that.calculateFees(that.options.original_amount, stripe_payment_type);
      });
    },
    // amountUpdated
    getTotalAmount: function getTotalAmount(amount) {
      amount = typeof amount !== 'undefined' ? amount : this.options.original_amount;
      var total_amount = amount;

      if ($(this.options.additional_amount_field).length > 0 && $(this.options.additional_amount_field).val() > 0) {
        var additional_amount = $(this.options.additional_amount_field).val();
        total_amount = parseInt(additional_amount, 10) + parseInt(amount, 10);
      }

      return total_amount;
    },
    // getTotalAmount
    setFairMarketValue: function setFairMarketValue(amount_selector) {
      // if there is a fair market value field and there is a fair-market-value data attribute
      // check and see if we can populate the field with the data attribute
      if ($(this.options.fair_market_value_selector).length > 0 && typeof amount_selector.data('fair-market-value') !== 'undefined') {
        var fairMarketValue = amount_selector.data('fair-market-value');
        $(this.options.fair_market_value_selector).val(fairMarketValue);
      }
    },
    // setFairMarketValue
    calculateFees: function calculateFees(amount, stripe_payment_type) {
      // this sends the amount and stripe payment type to python; get the fee and display it to the user on the checkbox label
      var that = this;
      var total_amount = that.getTotalAmount(amount);
      var data = {
        amount: total_amount,
        stripe_payment_type: stripe_payment_type
      };
      that.setStripePaymentType(stripe_payment_type);
      $.ajax({
        method: 'POST',
        url: '/calculate-fees/',
        data: data
      }).done(function (data) {
        if ($(data.fees).length > 0) {
          $(that.options.fee_amount).text(parseFloat(data.fees).toFixed(2));
          that.creditCardFeeCheckbox($(that.options.pay_cc_processing_selector));
        }
      });
    },
    // calculateFees
    creditCardProcessingFees: function creditCardProcessingFees(options) {
      // this adds or subtracts the fee to the original amount when the user indicates they do or do not want to pay the fees
      var that = this;
      that.creditCardFeeCheckbox($(options.pay_cc_processing_selector));
      $(options.pay_cc_processing_selector).on('change', function () {
        that.creditCardFeeCheckbox(this);
      });
    },
    // creditCardProcessingFees
    getStripePaymentType: function getStripePaymentType() {
      var stripe_payment_type = 'card';

      if ($('input[name="stripe_payment_type"]').length > 0) {
        stripe_payment_type = $('input[name="stripe_payment_type"]').val();
      }

      return stripe_payment_type;
    },
    // getStripePaymentType
    setStripePaymentType: function setStripePaymentType(stripe_payment_type) {
      if ($('input[name="stripe_payment_type"]').length === 0) {
        $(this.options.donate_form_selector).append('<input type=\"hidden\" name=\"stripe_payment_type\">');
      }

      $('input[name="stripe_payment_type"]').val(stripe_payment_type);
      return stripe_payment_type;
    },
    // setStripePaymentType
    creditCardFeeCheckbox: function creditCardFeeCheckbox(field) {
      var full_amount;
      var total_amount = this.getTotalAmount();
      var that = this;

      if ($(field).is(':checked') || $(field).prop('checked')) {
        $('.amount .level-amount').addClass('full-amount');
        full_amount = total_amount + parseFloat($(that.options.fee_amount).text());
      } else {
        full_amount = total_amount;
      }

      full_amount = parseFloat(full_amount).toFixed(2);
      $(that.options.full_amount_selector).text(full_amount); // update the payment request

      if (this.paymentRequest && full_amount) {
        this.paymentRequest.update({
          total: {
            label: "MinnPost",
            amount: full_amount * 100
          }
        });
      }
    },
    // creditCardFeeCheckbox
    donateAnonymously: function donateAnonymously(element, options) {
      var that = this;
      that.toggleAnonymous($(options.anonymous_selector, element));
      $(options.anonymous_selector, element).change(function () {
        that.toggleAnonymous($(this));
      });
    },
    // donateAnonymously
    toggleAnonymous: function toggleAnonymous(element) {
      if (element.is(':checked')) {
        $(this.options.name_selector + ' div:first', this.element).hide();
      } else {
        $(this.options.name_selector + ' div:first', this.element).show();
      }
    },
    // toggleAnonymous
    honorOrMemory: function honorOrMemory(element, options) {
      if ($(options.honor_or_memory_chooser + ':checked').val()) {
        $(options.honor_memory_input_group, element).show();
        $(options.honor_type_selector).text($(options.honor_or_memory_chooser + ':checked').val());
      } else {
        $(options.honor_memory_input_group, element).hide();
        $(options.honor_name_selector + ' input', element).val('');
      }
    },
    // honorOrMemory
    honorOrMemoryToggle: function honorOrMemoryToggle(element, options) {
      var that = this;
      that.honorOrMemory(that.element, that.options);
      $(options.honor_or_memory_chooser, element).change(function () {
        that.honorOrMemory(that.element, that.options);
      });
    },
    // honorOrMemoryToggle
    outsideUnitedStates: function outsideUnitedStates(element, options) {
      var that = this;
      $(options.show_billing_country_selector).click(function () {
        that.changeFieldsOutsideUS('billing', element, options);
        $(this).parent().hide();
        return false;
      });
      $(options.show_shipping_country_selector).click(function () {
        $(options.shipping_country_selector).show();
        that.changeFieldsOutsideUS('shipping', element, options);
        $(this).parent().hide();
        return false;
      });
    },
    // outsideUnitedStates
    changeFieldsOutsideUS: function changeFieldsOutsideUS(billing_or_shipping, element, options) {
      if (billing_or_shipping === 'billing') {
        var zip_parent = $(options.billing_zip_field_selector, element).parent();
        var state_parent = $(options.billing_state_field_selector, element).parent();
        $(options.billing_country_selector).show();
        $(options.billing_zip_field_selector, element).attr('type', 'text');
        $(options.billing_zip_field_selector, element).prop('required', false);
        $(options.billing_state_field_selector, element).prop('required', false);
        $('label', zip_parent).text('Postal Code:');
        $('label', state_parent).text('Region:');
      } else if (billing_or_shipping === 'shipping') {
        var zip_parent = $(options.shipping_zip_field_selector, element).parent();
        var state_parent = $(options.shipping_state_field_selector, element).parent();
        $(options.shipping_country_selector).show();
        $(options.shipping_zip_field_selector, element).attr('type', 'text');
        $(options.shipping_zip_field_selector, element).prop('required', false);
        $(options.shipping_state_field_selector, element).prop('required', false);
        $('label', zip_parent).text('Shipping Postal Code:');
        $('label', state_parent).text('Shipping Region:');
      }
    },
    // changeFieldsOutsideUS
    changeFieldsInsideUS: function changeFieldsInsideUS(billing_or_shipping, element, options) {
      if (billing_or_shipping === 'billing') {
        var zip_parent = $(options.billing_zip_field_selector, element).parent();
        var state_parent = $(options.billing_state_field_selector, element).parent();
        $(options.billing_country_selector).show();
        $(options.billing_zip_field_selector, element).attr('type', 'tel');
        $(options.billing_zip_field_selector, element).prop('required', true);
        $(options.billing_state_field_selector, element).prop('required', true);
        $('label', zip_parent).html('Zip Code: <span class="a-form-item-required" title="This field is required.">*</span>');
        $('label', state_parent).html('State: <span class="a-form-item-required" title="This field is required.">*</span>');
      } else if (billing_or_shipping === 'shipping') {
        var zip_parent = $(options.shipping_zip_field_selector, element).parent();
        var state_parent = $(options.shipping_state_field_selector, element).parent();
        $(options.shipping_country_selector).show();
        $(options.shipping_zip_field_selector, element).attr('type', 'tel');
        $(options.shipping_zip_field_selector, element).prop('required', true);
        $(options.shipping_state_field_selector, element).prop('required', true);
        $('label', zip_parent).html('Shipping Zip Code: <span class="a-form-item-required" title="This field is required.">*</span>');
        $('label', state_parent).html('Shipping State: <span class="a-form-item-required" title="This field is required.">*</span>');
      }
    },
    // changeFieldsOutsideUS
    shippingAddress: function shippingAddress(element, options) {
      var that = this;
      var show_shipping = false;

      if ($(options.use_for_shipping_selector).length > 0) {
        // we have a shipping checkbox
        show_shipping = true;
      }

      if (show_shipping === true) {
        $(options.use_for_shipping_selector, element).parent().show();

        if ($(options.use_for_shipping_selector, element).is(':checked')) {
          // use same as billing
          $(options.shipping_selector).hide();
        } else {
          // separate shipping and billing
          $(options.shipping_selector).show();
        }

        $(options.use_for_shipping_selector, element).change(function () {
          that.shippingAddress(element, options);
        });
      }
    },
    // shippingAddress
    allowMinnpostAccount: function allowMinnpostAccount(element, options) {
      var that = this;
      var account_exists = false; // show password as text

      that.showPassword(); // calculate password strength

      that.showPasswordStrength();
      that.spamEmail($(options.email_field_selector, element));
      $(options.email_field_selector, element).change(function () {
        that.spamEmail($(options.email_field_selector, element));
      });
      that.toggleAccountFields($(options.create_mp_selector, element));
      $(options.create_mp_selector, element).change(function () {
        that.toggleAccountFields($(options.create_mp_selector, element));
      });

      function doneTyping() {
        var email = $(options.email_field_selector, element).val();
        account_exists = that.checkMinnpostAccount(element, options, email);
      } //setup before functions


      var typingTimer; //timer identifier

      var doneTypingInterval = 5000; //time in ms, 5 second for example
      //on keyup, start the countdown

      $(options.email_field_selector, element).keyup(function () {
        clearTimeout(typingTimer);

        if ($(options.email_field_selector, element).val) {
          typingTimer = setTimeout(doneTyping, doneTypingInterval);
        }
      });
    },
    // allowMinnpostAccount
    spamEmail: function spamEmail(email_field) {
      var spamErrorContainer = email_field.parent();

      if ($('.a-spam-email', spamErrorContainer).length === 0) {
        spamErrorContainer.append('<p class="a-form-caption a-validation-error a-spam-email">This email address has been detected as a spammer.</p>');
      }

      $('.a-spam-email', spamErrorContainer).hide();
      spamErrorContainer.removeClass('invalid a-error');
    },
    // spamEmail
    toggleAccountFields: function toggleAccountFields(create_account_selector) {
      if (create_account_selector.is(':checked')) {
        create_account_selector.parent().before('<p class="a-form-caption a-account-exists a-account-exists-success">There is already a MinnPost.com account with this email address.</p>');
        $('.a-account-exists').hide();
        $(this.options.password_selector, this.element).show();
        this.options.create_account = true;
      } else {
        $(this.options.password_selector, this.element).hide();
      }
    },
    // toggleAccountFields
    showPassword: function showPassword() {
      // Cache our jquery elements
      var $submit = $('.btn-submit');
      var $container = $(this.options.password_selector, this.element);
      var $field = $('input[name="password"]', $container);
      $('.a-account-exists').hide();
      var show_pass = '<div class="a-form-show-password a-form-caption"><label><input type="checkbox" name="show_password" id="show-password-checkbox" value="1"> Show password</label></div>'; // Inject the toggle button into the page

      $container.append(show_pass); // Cache the toggle button

      var $toggle = $('#show-password-checkbox'); // Toggle the field type

      $toggle.on('click', function (e) {
        var checkbox = $(this);

        if (checkbox.is(':checked')) {
          $field.attr('type', 'text');
        } else {
          $field.attr('type', 'password');
        }
      }); // Set the form field back to a regular password element

      $submit.on('click', function (e) {
        $field.attr('type', 'password');
      });
    },
    showPasswordStrength: function showPasswordStrength() {
      // checkPasswordStrength
      var that = this;

      if ($('.a-password-strength').length > 0) {
        var $before = $('.a-form-show-password');
        $before.after($('<div class="a-password-strength"><meter max="4" id="password-strength"><div></div></meter><p class="a-form-caption" id="password-strength-text"></p></div>'));
        $('body').on('keyup', 'input[name=password]', function () {
          that.checkPasswordStrength($('input[name=password]'), // Password field
          $('#password-strength'), // Strength meter
          $('#password-strength-text') // Strength text indicator
          );
        });
      }
    },
    // showPasswordStrength
    checkPasswordStrength: function checkPasswordStrength($password, $strengthMeter, $strengthText) {
      var password = $password.val(); // Get the password strength

      var result = zxcvbn(password);
      var strength = result.score;
      $strengthText.removeClass('short bad good strong'); // Add the strength meter results

      switch (strength) {
        case 2:
          $strengthText.addClass('bad').html('Strength: <strong>Weak</strong>');
          break;

        case 3:
          $strengthText.addClass('good').html('Strength: <strong>Medium</strong>');
          break;

        case 4:
          $strengthText.addClass('strong').html('Strength: <strong>Strong</strong>');
          break;

        case 5:
          $strengthText.addClass('short').html('Strength: <strong>Very weak</strong>');
          break;

        default:
          $strengthText.addClass('short').html('Strength: <strong>Very weak</strong>');
      }

      $strengthMeter.val(strength);
      return strength;
    },
    // checkPasswordStrength
    checkMinnpostAccount: function checkMinnpostAccount(element, options, email) {
      var user = {
        email: email
      };
      var that = this;
      $.ajax({
        method: 'GET',
        url: options.minnpost_root + '/wp-json/user-account-management/v1/check-account',
        data: user
      }).done(function (result) {
        if (result.status === 'success' && result.reason === 'user exists') {
          // user exists
          if ($(options.create_mp_selector, element).is(':checked')) {
            $(options.password_selector, element).hide();
            $(options.create_mp_selector, element).parent().hide();
            $('.a-account-exists', element).show();
          }

          $(options.create_mp_selector, element).on('change', function () {
            if ($(options.create_mp_selector, element).is(':checked')) {
              $(options.password_selector, element).hide();
              $(options.create_mp_selector, element).parent().hide();
              $('.a-account-exists', element).show();
            }
          });
        } else if (result.status === 'spam') {
          $(that.options.email_field_selector).addClass('invalid a-error');
          $('.a-spam-email').show();
        } else {
          // user does not exist or ajax call failed
          if ($(options.create_mp_selector, element).is(':checked')) {
            $(options.password_selector, element).show();
            options.create_account = true;
          } else {
            $(options.password_selector, element).hide();
          }

          $('.a-account-exists', element).hide();
          return false;
        }
      });
    },
    // checkMinnpostAccount
    paymentRequestButton: function paymentRequestButton(element, options) {
      var that = this;
      var total_amount = that.getTotalAmount();
      that.paymentRequest = that.stripe.paymentRequest({
        country: 'US',
        currency: 'usd',
        total: {
          label: 'MinnPost',
          amount: total_amount * 100
        }
      });
      that.prButton = that.elements.create('paymentRequestButton', {
        paymentRequest: that.paymentRequest,
        style: {
          paymentRequestButton: {
            type: 'donate',
            // One of 'default', 'book', 'buy', or 'donate'
            // Defaults to 'default'
            theme: 'dark',
            // One of 'dark', 'light', or 'light-outline'
            // Defaults to 'dark'
            height: '48px' // Defaults to '40px'. The width is always '100%'.

          }
        }
      }); // Check the availability of the Payment Request API first.

      that.paymentRequest.canMakePayment().then(function (result) {
        if (result) {
          $('.m-pay-without-payment-request').hide();
          that.prButton.mount('#payment-request-button');
        } else {
          that.hidePaymentRequest($('.o-pay-with-payment-request'));
        }
      });
      $('.decline-apple-pay a').click(function (event) {
        event.preventDefault();
        that.hidePaymentRequest($('.o-pay-with-payment-request .m-form-actions-pay-fees'));
      });
      that.prButton.on('click', function (event) {
        // Send paymentMethod.id to server
        var supportform = $(that.options.donate_form_selector); // check validation of form

        if (!supportform.get(0).reportValidity()) {
          event.preventDefault();
          return;
        }
      });
      that.paymentRequest.on('paymentmethod', function (event) {
        // Send paymentMethod.id to server
        var supportform = $(that.options.donate_form_selector);
        var tokenFieldName = 'payment_method_id';
        var tokenField = 'input[name="' + tokenFieldName + '"]'; // Insert the payment method ID into the form so it gets submitted to the server

        if ($(tokenField).length > 0) {
          $(tokenField).val(event.paymentMethod.id);
        } else {
          supportform.append($('<input type=\"hidden\" name="' + tokenFieldName + '">').val(event.paymentMethod.id));
        }

        that.formProcessor(that, 'paymentRequest');
      });
    },
    // paymentRequestButton
    hidePaymentRequest: function hidePaymentRequest(hideElement) {
      hideElement.hide();
      $('.decline-apple-pay a').hide();
      $('.m-pay-without-payment-request').show();
      $('.a-g-recaptcha').insertAfter('.m-pay-without-payment-request .m-form-actions-pay-fees');
    },
    // hidePaymentRequest
    choosePaymentMethod: function choosePaymentMethod(element, options) {
      var that = this;

      if ($(options.choose_payment).length > 0) {
        if ($(options.choose_payment + ' input').is(':checked')) {
          var checked_id = $(options.choose_payment + ' input:checked').attr('id');
          var checked_value = $(options.choose_payment + ' input:checked').val();
          that.setupPaymentMethod(checked_id, checked_value);
        }

        $(options.choose_payment + ' input').change(function () {
          var checked_id = this.id;
          var checked_value = this.value;
          that.setupPaymentMethod(checked_id, checked_value);
        });
      }
    },
    // choosePaymentMethod
    setupPaymentMethod: function setupPaymentMethod(element_id, element_value) {
      var stripe_payment_type = this.setStripePaymentType(element_value);

      if (element_value === 'bank_account') {
        $('input[name="payment_method_id"]', $(this.options.donate_form_selector)).remove();
        this.achFields(this.element, this.options);
      } else {
        this.removeAchFields(this.options);
      }

      $(this.options.payment_method_selector).removeClass('active');
      $(this.options.payment_method_selector + '.' + element_id).addClass('active');
      $(this.options.payment_method_selector + ':not(.active) input').val('');
      this.calculateFees(this.options.original_amount, stripe_payment_type);
    },
    // setupPaymentMethod
    removeAchFields: function removeAchFields(options) {
      $('input[name="public_token"]', $(options.donate_form_selector)).remove();
      $('input[name="account_id"]', $(options.donate_form_selector)).remove();
      $('input[name="bankToken"]', $(options.donate_form_selector)).remove();
      $(options.plaid_link).html('<a href="#">Sign in to your bank account</a>');
      this.buttonDisabled(options, false, '', '', true); // if the button was disabled, re-enable it

      if (typeof this.linkHandler !== 'undefined') {
        this.linkHandler.destroy();
      }
    },
    // removeAchFields
    creditCardFields: function creditCardFields(element, options) {
      var that = this;
      var style = {
        base: {
          iconColor: '#666EE8',
          lineHeight: '43px',
          fontWeight: 400,
          fontFamily: 'ff-meta-web-pro',
          fontSize: '24px' //lineHeight: '37px',
          //fontSize: '16px',

        },
        invalid: {
          color: '#1a1818'
        }
      }; // Add an instance of the card UI component into the `card-element` <div>
      //card.mount('#card-element');

      if ($('.credit-card-group').length === 0 && $('.payment-method.choose-card').length === 0) {
        return;
      }

      that.cardNumberElement = that.elements.create('cardNumber', {
        showIcon: true,
        style: style
      });
      that.cardNumberElement.mount(options.cc_num_selector);
      that.cardExpiryElement = that.elements.create('cardExpiry', {
        style: style
      });
      that.cardExpiryElement.mount(options.cc_exp_selector);
      that.cardCvcElement = that.elements.create('cardCvc', {
        style: style
      });
      that.cardCvcElement.mount(options.cc_cvc_selector); // validate/error handle the card fields

      that.cardNumberElement.on('change', function (event) {
        var stripe_payment_type = 'card'; // Switch payment type if it's one that we recognize as distinct

        if (event.brand) {
          if (event.brand === 'amex') {
            stripe_payment_type = 'amex';
          }
        } // error handling


        that.stripeErrorDisplay(event.error, $(options.cc_num_selector, element), element, options); // if it changed, reset the button

        that.buttonStatus(options, $(that.options.donate_form_selector).find('button'), false);
        that.calculateFees(that.options.original_amount, stripe_payment_type);
      });
      that.cardExpiryElement.on('change', function (event) {
        // error handling
        that.stripeErrorDisplay(event.error, $(options.cc_exp_selector, element), element, options); // if it changed, reset the button

        that.buttonStatus(options, $(that.options.donate_form_selector).find('button'), false);
      });
      that.cardCvcElement.on('change', function (event) {
        // error handling
        that.stripeErrorDisplay(event.error, $(options.cc_cvc_selector, element), element, options); // if it changed, reset the button

        that.buttonStatus(options, $(that.options.donate_form_selector).find('button'), false);
      }); // this is the method to create a single card field and mount it

      /*var card = that.elements.create(
        'card',
        {
          hidePostalCode: true
        }
      );
      // Add an instance of the card UI component into the `card-element` <div>
      card.mount('#card-element');*/
    },
    // creditCardFields
    showSpinner: function showSpinner() {
      $(this.options.plaid_link).hide();
      $(this.options.plaid_link).after('<div class="a-spinner"><img src="https://www.minnpost.com/wp-admin/images/spinner.gif" srcset="https://www.minnpost.com/wp-admin/images/spinner.gif 1x, https://www.minnpost.com/wp-admin/images/spinner-2x.gif 2x,"></div>');
    },
    hideSpinner: function hideSpinner() {
      $(this.options.plaid_link).show();
      $('.a-spinner').hide();
    },
    achFields: function achFields(element, options) {
      var bankTokenFieldName = 'bankToken';
      var bankTokenField = 'input[name="' + bankTokenFieldName + '"]';
      var that = this; // the button should not be clickable until the user has signed in

      that.buttonDisabled(options, true, '', 'Sign in to your bank account (above) first');

      if (typeof Plaid !== 'undefined') {
        that.linkHandler = Plaid.create({
          clientName: 'MinnPost',
          env: options.plaid_env,
          product: ['auth'],
          // 1. Pass the token generated in step 2.
          token: document.getElementById('plaid_link_token').value,
          onSuccess: function onSuccess(public_token, metadata) {
            that.showSpinner();
            $.ajax({
              url: '/get_plaid_access_token/',
              data: JSON.stringify({
                public_token: public_token,
                account_id: metadata.account_id
              }),
              type: 'POST',
              contentType: 'application/json; charset=utf-8'
            }).done(function (response) {
              if (typeof response.error !== 'undefined') {
                // there is an error.
                that.hideSpinner();
                $(options.plaid_link).before('<p class="a-error a-validation-error">' + response.error + '</p>');
              } else {
                //this.debug('print response here');
                //this.debug(response);
                // add the field(s) we need to the form for submitting
                if ($(bankTokenField).length > 0) {
                  $(bankTokenField).val(response.stripe_bank_account_token);
                } else {
                  $(options.donate_form_selector).prepend($('<input type=\"hidden\" name="' + bankTokenFieldName + '">').val(response.stripe_bank_account_token));
                }

                $(options.plaid_link, element).html('<strong>Your account was successfully authorized</strong>');
                that.hideSpinner();
                that.buttonDisabled(options, false);
              }
            }).fail(function (response) {
              that.debug(response);
              that.hideSpinner();
              $(options.plaid_link).before('<p class="a-error a-validation-error">' + response.error + '</p>');
            });
          }
        });
        $(options.plaid_link + ' a').click(function (event) {
          event.preventDefault();
          that.resetFormErrors(that.options, that.element); //$(options.payment_method_selector + ' .a-error').remove(); // remove method error message if it is there

          that.linkHandler.open();
        });
      }
    },
    // achFields
    buttonStatus: function buttonStatus(options, button, disabled) {
      // make the button clickable or not
      this.buttonDisabled(options, disabled, button);

      if (disabled === false) {
        button.text(options.button_text);
      } else {
        button.text('Processing');
      }
    },
    // buttonStatus
    buttonDisabled: function buttonDisabled(options, disabled) {
      var button = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var message = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
      var ach_was_initialized = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

      if (button === '') {
        button = $(options.donate_form_selector).find('button');
      }

      button.prop('disabled', disabled);

      if (message !== '') {
        if (disabled === true) {
          button.attr('data-tlite', message);
        } else {
          button.removeAttr('data-tlite'); // there should be no tlite value if the button is enabled
        }

        button.on('mouseenter focus', function (event) {
          tlite.show(this, {
            grav: 'nw'
          });
        });
        button.on('mouseleave', function (event) {
          tlite.hide(this);
        });
      } else {
        button.removeAttr('data-tlite');

        if (ach_was_initialized === true) {
          button.on('mouseenter focus', function (event) {
            tlite.hide(this);
          });
          button.click(function (event) {
            return true;
          });
        }
      }
    },
    // buttonDisabled
    validateSetup: function validateSetup(element, options) {
      var forms = document.querySelectorAll(options.form_selector);
      forms.forEach(function (form) {
        ValidForm(form, {
          validationErrorParentClass: 'm-has-validation-error',
          validationErrorClass: 'a-validation-error',
          invalidClass: 'a-error',
          errorPlacement: 'after'
        });
      });
      this.scrollToFormError(options);
    },
    // validateSetup
    scrollToFormError: function scrollToFormError(options) {
      var form = $(options.form_selector); // listen for `invalid` events on all form inputs

      form.find(':input').on('invalid', function () {
        var input = $(this); // the first invalid element in the form

        var first = form.find('.a-error').first(); // the form item that contains it

        var first_holder = first.parent(); // only handle if this is the first invalid input

        if (input[0] === first[0]) {
          // height of the nav bar plus some padding if there's a fixed nav
          //var navbarHeight = navbar.height() + 50
          // the position to scroll to (accounting for the navbar if it exists)
          var elementOffset = first_holder.offset().top; // the current scroll position (accounting for the navbar)

          var pageOffset = window.pageYOffset; // don't scroll if the element is already in view

          if (elementOffset > pageOffset && elementOffset < pageOffset + window.innerHeight) {
            return true;
          } // note: avoid using animate, as it prevents the validation message displaying correctly


          $('html, body').scrollTop(elementOffset);
        }
      });
    },
    // scrollToFormError
    formSetup: function formSetup(element, options) {
      var that = this;
      $(options.donate_form_selector).submit(function (event) {
        event.preventDefault();
        that.formProcessor(that, 'submit');
      });
    },
    // formSetup
    formProcessor: function formProcessor(that, type) {
      // 1. remove previous errors and reset the button
      that.resetFormErrors(that.options, that.element); // 2. set up the button if it's a form submit

      if (type === 'submit') {
        that.buttonStatus(that.options, $(that.options.donate_form_selector).find('button'), true);
      } // 3. generate billing address details


      var billingDetails = that.generateBillingDetails(); // 4. create minnpost user account

      that.createMinnPostAccount(that.options, that.element); // 5. do the charging of card or bank account if it's a form submit
      // or submit the form if this is a payment request button

      if (type === 'submit') {
        var payment_type = $('input[name="stripe_payment_type"]').val();

        if (payment_type !== 'bank_account') {
          // finally, get a payment method from stripe, and try to charge it if it is not ach
          that.createPaymentMethod(that.cardNumberElement, billingDetails);
        } else {
          // if it is ach, we already have a token so submit the form
          // todo: upgrade the plaid integration
          that.bankTokenHandler($('input[name="bankToken"]').val(), 'bank_account');
        }
      } else {
        that.submitFormOnly();
      }
    },
    // formProcessor
    stripeErrorDisplay: function stripeErrorDisplay(error, this_selector, element, options) {
      // listen for errors and display/hide error messages
      var which_error = this_selector.attr('id'); // when this field changes, reset its errors

      $('.a-card-instruction.' + which_error).removeClass('a-validation-error');
      $('.a-card-instruction.' + which_error).empty();
      $(this_selector).removeClass('a-error');

      if (error) {
        if ($('.a-card-instruction.' + which_error).length > 0) {
          $('.a-card-instruction.' + which_error).text(error.message);
        } else {
          this_selector.parent().append('<p class="a-card-instruction ' + which_error + '">' + error.message + '</p>');
        }

        $('.a-card-instruction.' + which_error).addClass('a-validation-error');
        this_selector.parent().addClass('m-has-validation-error');
        $(this_selector).addClass('a-error');

        if (this_selector.parent().length > 0) {
          $('html, body').animate({
            scrollTop: this_selector.parent().offset().top
          }, 2000);
        }
      } else {
        $(this_selector).removeClass('a-error');
        $('.a-card-instruction.' + which_error).removeClass('a-validation-error');
        $('.a-card-instruction.' + which_error).empty();
        $(options.cc_num_selector, element).removeClass('a-validation-error');
        $(options.cc_exp_selector, element).removeClass('a-validation-error');
        $(options.cc_cvc_selector, element).removeClass('a-validation-error');
        $(options.cc_num_selector, element).parent().removeClass('m-has-validation-error');
        $(options.cc_exp_selector, element).parent().removeClass('m-has-validation-error');
        $(options.cc_cvc_selector, element).parent().removeClass('m-has-validation-error');
      }
    },
    // stripeErrorDisplay
    resetFormErrors: function resetFormErrors(options, element) {
      var that = this;
      $('.a-validation-error').remove();
      $('input, label, div', element).removeClass('a-error');
      $('label', element).removeClass('m-has-validation-error');
      $(options.payment_method_selector, element).removeClass('a-error invalid');
      $('.a-validation-error').remove();
      $(options.choose_payment + ' input').change(function () {
        $(options.payment_method_selector + ' .a-error').remove(); // remove method error message if it is there

        $(options.payment_method_selector).parent().find('.a-validation-error').remove(); // if a payment field changed, reset the button

        that.buttonStatus(options, $(options.donate_form_selector).find('button'), false);
      });
    },
    // resetFormErrors
    createMinnPostAccount: function createMinnPostAccount(options, element) {
      // 2. create minnpost account if specified
      if (options.create_account === true) {
        var user = {
          email: $(options.email_field_selector, element).val(),
          first_name: $(options.first_name_field_selector, element).val(),
          last_name: $(options.last_name_field_selector, element).val(),
          password: $(options.password_field_selector, element).val(),
          city: $(options.billing_city_field_selector, element).val(),
          state: $(options.billing_state_field_selector, element).val(),
          zip: $(options.billing_zip_field_selector, element).val()
        };
        $.ajax({
          method: 'POST',
          url: options.minnpost_root + '/wp-json/user-account-management/v1/create-user',
          data: user
        }).done(function (data) {
          if (data.status === 'success' && data.reason === 'new user') {// user created - they should receive email
          }
        });
      }
    },
    // createMinnPostAccount
    generateBillingDetails: function generateBillingDetails() {
      var billingDetails = {};
      var addressDetails = {};

      if ($(this.options.email_field_selector).val() != '') {
        billingDetails.email = $(this.options.email_field_selector).val();
      }

      var full_name = '';

      if ($('#full_name').length > 0) {
        full_name = $('#full_name').val();
      } else {
        full_name = $(this.options.first_name_field_selector).val() + ' ' + $(this.options.last_name_field_selector).val();
      }

      billingDetails.name = full_name;
      var street = 'None';

      if ($(this.options.billing_street_field_selector).val() != '') {
        street = $(this.options.billing_street_field_selector).val();
        addressDetails.line1 = street;
      }

      var city = 'None';

      if ($(this.options.billing_city_field_selector).val() != '') {
        city = $(this.options.billing_city_field_selector).val();
        addressDetails.city = city;
      }

      var state = 'None';

      if ($(this.options.billing_state_field_selector).val() != '') {
        state = $(this.options.billing_state_field_selector).val();
        addressDetails.state = state;
      }

      var zip = 'None';

      if ($(this.options.billing_zip_field_selector).val() != '') {
        zip = $(this.options.billing_zip_field_selector).val();
        addressDetails.postal_code = zip;
      }

      var country = 'US';
      var country_field_value = $(this.options.billing_country_field_selector).val();

      if (country_field_value != '' && country_field_value != 'United States') {
        country = country_field_value;
      }

      addressDetails.country = country;

      if (street !== 'None' || city !== 'None' || state !== 'None' || zip !== 'None') {
        billingDetails.address = addressDetails;
      }

      return billingDetails;
    },
    // generateBillingDetails
    createPaymentMethod: function createPaymentMethod(cardElement, billingDetails) {
      var that = this;
      that.stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: billingDetails
      }).then(function (response) {
        if (response.error) {
          that.handleServerError(response);
        } else {
          // Send paymentMethod.id to server
          var supportform = $(that.options.donate_form_selector);
          var ajax_url = window.location.pathname;
          var tokenFieldName = 'payment_method_id';
          var tokenField = 'input[name="' + tokenFieldName + '"]'; // Insert the payment method ID into the form so it gets submitted to the server

          if ($(tokenField).length > 0) {
            $(tokenField).val(response.paymentMethod.id);
          } else {
            supportform.append($('<input type=\"hidden\" name="' + tokenFieldName + '">').val(response.paymentMethod.id));
          }

          fetch(ajax_url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: $(supportform).serialize()
          }).then(function (response) {
            // Handle server response (see Step 3)
            response.json().then(function (json) {
              that.handleServerResponse(json);
            });
          });
        }
      });
    },
    // createPaymentMethod
    bankTokenHandler: function bankTokenHandler(token, type) {
      this.setStripePaymentType(type);
      this.submitFormOnly();
    },
    // bankTokenHandler
    submitFormOnly: function submitFormOnly() {
      var that = this;
      var supportform = $(this.options.donate_form_selector);
      var ajax_url = window.location.pathname; // Submit the form
      // the way it works currently is the form submits an ajax request to itself
      // then it submits a post request to the form's action url

      $.ajax({
        url: ajax_url,
        cache: false,
        data: $(supportform).serialize(),
        type: 'POST'
      }).done(function (response) {
        if (typeof response.errors !== 'undefined') {
          that.handleServerError(response);
        } else {
          supportform.get(0).submit(); // continue submitting the form if the ajax was successful
        }
      }).fail(function () {
        that.buttonStatus(that.options, $(that.options.donate_form_selector).find('button'), false);
      });
    },
    // submitFormOnly
    handleServerResponse: function handleServerResponse(response) {
      var supportform = $(this.options.donate_form_selector);

      if (response.errors) {
        // Show error from server on payment form
        this.handleServerError(response);
      } else if (response.requires_action) {// Use Stripe.js to handle required card action
        //handleAction(response);
      } else {
        supportform.get(0).submit(); // continue submitting the form if the ajax was successful
      }
    },
    // handleServerResponse
    handleServerError: function handleServerError(response) {
      var that = this;
      var this_field = ''; // do not submit. there is an error.

      that.buttonStatus(that.options, $(that.options.donate_form_selector).find('button'), false); // handle error display

      if (typeof response.errors !== 'undefined') {
        if (typeof response.errors[0] !== 'undefined') {
          this_field = response.errors[0].field + '_field_selector';
        }

        $.each(response.errors, function (index, error) {
          if (typeof error.field !== 'undefined') {
            this_field = error.field + '_field_selector';
          } else if (typeof error.param !== 'undefined' && error.param !== '') {
            this_field = 'cc_' + error.param + '_selector';
          }

          that.displayErrorMessage(error, this_field);
        });
      } else if (typeof response.error !== 'undefined') {
        var error = response.error;

        if (typeof error.field !== 'undefined') {
          this_field = error.field + '_field_selector';
        } else if (typeof error.param !== 'undefined' && error.param !== '') {
          this_field = 'cc_' + error.param + '_selector';
        }

        that.displayErrorMessage(error, this_field);
      }

      if ($(that.options[this_field]).length > 0) {
        $('html, body').animate({
          scrollTop: $(that.options[this_field]).parent().offset().top
        }, 2000);
      }
    },
    // handleServerError
    displayErrorMessage: function displayErrorMessage(error, field) {
      var message = '';
      var stripeErrorSelector = '';
      var fieldParent = $(this.options[field]).parent();

      if (typeof error.message === 'string') {
        message = error.message;
      } else {
        message = error.message[0];
      }

      if ($(this.options[field]).length > 0) {
        $(this.options[field]).addClass('a-error');
        $(this.options[field]).prev().addClass('a-error');

        if ($('.a-card-instruction', fieldParent).length > 0) {
          $('.a-card-instruction', fieldParent).addClass('a-validation-error');
          $('.a-card-instruction', fieldParent).text(message);
        } else {
          $(this.options[field]).after('<p class="a-card-instruction a-validation-error">' + message + '</p>');
        }
      } else if (typeof error !== 'undefined') {
        this.buttonStatus(this.options, $(this.options.donate_form_selector).find('button'), false);

        if (error.code === 'incomplete_number' || error.code == 'invalid_number' || error.code == 'incorrect_number' || error.code == 'card_declined' || error.code == 'processing_error') {
          // error handling
          stripeErrorSelector = $(this.options.cc_num_selector);
        }

        if (error.code == 'invalid_expiry_month' || error.code == 'invalid_expiry_year' || error.code == 'expired_card') {
          // error handling
          stripeErrorSelector = $(this.options.cc_exp_selector);
        }

        if (error.code == 'invalid_cvc' || error.code == 'incorrect_cvc') {
          // error handling
          stripeErrorSelector = $(this.options.cc_cvc_selector);
        }

        if (error.code == 'email_invalid') {
          // error handling
          stripeErrorSelector = $(this.options.email_field_selector);
        }

        if (stripeErrorSelector !== '') {
          this.stripeErrorDisplay(error, stripeErrorSelector, this.element, this.options);
        }

        if (error.type == 'missing_payment' && stripeErrorSelector === '') {
          $(this.options.payment_method_selector + '.active').append('<p class="a-form-caption a-validation-error a-missing-payment-error">' + error.message + '</p>');
        }

        if (error.field == 'recaptcha') {
          $(this.options.pay_button_selector).before('<p class="a-form-caption a-validation-error a-recaptcha-error">' + message + '</p>');
        }

        if (error.type == 'invalid_request_error' && stripeErrorSelector === '') {
          $(this.options.pay_button_selector).before('<p class="a-form-caption a-validation-error a-invalid-request-error">' + error.message + '</p>');
        }
      }
    },
    // displayErrorMessage
    showNewsletterSettings: function showNewsletterSettings(element, options) {
      var that = this;
      var newsletter_group_html = '';

      if ($(options.newsletter_group_selector).length > 0) {
        var get_data = {
          shortcode: 'newsletter_form',
          placement: 'useraccount'
        };
        $.ajax({
          method: 'GET',
          url: options.minnpost_root + '/wp-json/minnpost-api/v2/mailchimp/form',
          data: get_data
        }).done(function (result) {
          if (typeof result.group_fields !== 'undefined') {
            $.each(result.group_fields, function (index, category) {
              newsletter_group_html += '<fieldset class="m-form-item support-newsletter m-form-item-' + category.type + '">';
              newsletter_group_html += '<label>' + category.name + ':</label>';

              if (category.contains.length > 0) {
                newsletter_group_html += '<div class="m-form-item m-form-item-newsletter">';
                $.each(category[category.contains], function (index, item) {
                  newsletter_group_html += '<label><input name="groups_submitted" type="checkbox" value="' + item.id + '">' + item.name + '</label>';
                });
                newsletter_group_html += '</div>';
              }

              newsletter_group_html += '</fieldset>';
            });
            $(options.newsletter_group_selector).html(newsletter_group_html);
          }
        });
      }

      if ($(options.newsletter_group_selector).length > 0 && typeof $(options.email_field_selector, element).val() !== 'undefined') {
        var get_data = {
          email: $(options.email_field_selector, element).val()
        };
        $.ajax({
          method: 'GET',
          url: options.minnpost_root + '/wp-json/minnpost-api/v2/mailchimp/user',
          data: get_data
        }).done(function (result) {
          if (typeof result.mailchimp_status !== 'undefined') {
            $(options.email_field_selector, element).after('<input name="mailchimp_status" type="hidden" value="' + result.mailchimp_status + '">');
          }

          if (typeof result.mailchimp_user_id !== 'undefined') {
            $(options.email_field_selector, element).after('<input name="mailchimp_user_id" type="hidden" value="' + result.mailchimp_user_id + '">');
          }

          if (result.mailchimp_status === 'subscribed') {
            // user created - show a success message
            $('.a-confirm-instructions').text($('.a-confirm-instructions').attr('data-known-user'));
            var groups = result.groups;
            $.each(groups, function (index, value) {
              if (value === true) {
                $(':checkbox[value="' + index + '"]').prop('checked', true);
              } else {
                $(':checkbox[value="' + index + '"]').prop('checked', false);
              }
            });
          }
        });
      }
    },
    // showNewsletterSettings
    confirmMessageSubmit: function confirmMessageSubmit(element, options) {
      var existing_newsletter_settings = $(options.newsletter_group_selector + ' input').serialize(); //this.debug(existing_newsletter_settings);

      $(options.confirm_form_selector).submit(function (event) {
        event.preventDefault();
        var confirmform = $(options.confirm_form_selector); // submit settings to mailchimp
        // need to get user info on a hidden field here

        var newsletter_groups = $(options.newsletter_group_selector + ' input:checked');
        var new_newsletter_settings = newsletter_groups.serialize();

        if (existing_newsletter_settings !== new_newsletter_settings && typeof newsletter_groups !== 'undefined') {
          //add our own ajax check as X-Requested-With is not always reliable
          //ajax_form_data = new_newsletter_settings + '&ajaxrequest=true&subscribe';
          var post_data = {
            email: $(options.email_field_selector, element).val(),
            first_name: $(options.first_name_field_selector, element).val(),
            last_name: $(options.last_name_field_selector, element).val(),
            groups_submitted: {}
          };
          post_data.groups_available = 'all';

          if ($('input[name="mailchimp_status"]').length > 0) {
            post_data.mailchimp_status = $('input[name="mailchimp_status"]').val();
          }

          if ($('input[name="mailchimp_user_id"]').length > 0) {
            post_data.mailchimp_user_id = $('input[name="mailchimp_user_id"]').val();
          }

          if (typeof newsletter_groups !== 'undefined') {
            $.each(newsletter_groups, function (index, value) {
              var group = $(this).val();
              post_data.groups_submitted[index] = group;
            });
          }

          $.ajax({
            url: options.minnpost_root + '/wp-json/minnpost-api/v2/mailchimp/user',
            type: 'post',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(post_data)
          }).done(function (response) {
            // response from the PHP action
            var message = '';

            if (response.success === true) {
              /*switch (response.data.user_status) {
                case 'existing':
                  message = 'Thanks for updating your email preferences. They will go into effect immediately.';
                  break;
                case 'new':
                  message = 'We have added you to the MinnPost mailing list.';
                  break;
                case 'pending':
                  message = 'We have added you to the MinnPost mailing list. You will need to click the confirmation link in the email we sent to begin receiving messages.';
                  break;
              }*/
              //confirmform.get(0).submit();
            }

            confirmform.get(0).submit(); //$('.m-hold-message').html('<div class="m-form-message m-form-message-info">' + message + '</div>');
          }).fail(function (response) {
            // we should put an actual error message here someday, probably
            //$('.m-hold-message').html('<div class="m-form-message m-form-message-info">An error has occured. Please try again.</div>');
            confirmform.get(0).submit();
          });
        } else {
          // end part where settings changed
          confirmform.get(0).submit();
        }
      }); //return false;
    } // confirmMessageSubmit

  }; // plugin.prototype
  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations

  $.fn[pluginName] = function (options) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new Plugin(this, options));
      }
    });
  };
})(jQuery, window, document);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0cmlwZS5wYXltZW50LmpzIiwidGxpdGUubWluLmpzIiwidmFsaWQtZm9ybS5taW4uanMiLCJtaW5ucG9zdC5naXZpbmcuanMiXSwibmFtZXMiOlsiZiIsImV4cG9ydHMiLCJtb2R1bGUiLCJkZWZpbmUiLCJhbWQiLCJnIiwid2luZG93IiwiZ2xvYmFsIiwic2VsZiIsInBheW1lbnQiLCJqcyIsImUiLCJ0IiwibiIsInIiLCJzIiwibyIsInUiLCJhIiwicmVxdWlyZSIsImkiLCJFcnJvciIsImNvZGUiLCJsIiwiY2FsbCIsImxlbmd0aCIsIlFKIiwicnJldHVybiIsInJ0cmltIiwic2VsZWN0b3IiLCJpc0RPTUVsZW1lbnQiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJlbCIsIm5vZGVOYW1lIiwidHJpbSIsInRleHQiLCJyZXBsYWNlIiwidmFsIiwicmV0IiwiYXJndW1lbnRzIiwidmFsdWUiLCJwcmV2ZW50RGVmYXVsdCIsImV2ZW50T2JqZWN0IiwicmV0dXJuVmFsdWUiLCJub3JtYWxpemVFdmVudCIsIm9yaWdpbmFsIiwid2hpY2giLCJ0YXJnZXQiLCJzcmNFbGVtZW50Iiwib3JpZ2luYWxFdmVudCIsImRhdGEiLCJkZXRhaWwiLCJjaGFyQ29kZSIsImtleUNvZGUiLCJvbiIsImVsZW1lbnQiLCJldmVudE5hbWUiLCJjYWxsYmFjayIsImoiLCJsZW4iLCJsZW4xIiwibXVsdEV2ZW50TmFtZSIsIm9yaWdpbmFsQ2FsbGJhY2siLCJyZWYiLCJtYXRjaCIsInNwbGl0IiwiYWRkRXZlbnRMaXN0ZW5lciIsImF0dGFjaEV2ZW50IiwiYWRkQ2xhc3MiLCJjbGFzc05hbWUiLCJyZXN1bHRzIiwicHVzaCIsImNsYXNzTGlzdCIsImFkZCIsImhhc0NsYXNzIiwiY29udGFpbnMiLCJSZWdFeHAiLCJ0ZXN0IiwicmVtb3ZlQ2xhc3MiLCJjbHMiLCJyZW1vdmUiLCJqb2luIiwidG9nZ2xlQ2xhc3MiLCJib29sIiwiYXBwZW5kIiwidG9BcHBlbmQiLCJpbnNlcnRBZGphY2VudEhUTUwiLCJmaW5kIiwiTm9kZUxpc3QiLCJBcnJheSIsInRyaWdnZXIiLCJuYW1lIiwiZXJyb3IiLCJldiIsIkN1c3RvbUV2ZW50IiwiY3JlYXRlRXZlbnQiLCJpbml0Q3VzdG9tRXZlbnQiLCJpbml0RXZlbnQiLCJkaXNwYXRjaEV2ZW50IiwiUGF5bWVudCIsImNhcmRGcm9tTnVtYmVyIiwiY2FyZEZyb21UeXBlIiwiY2FyZHMiLCJkZWZhdWx0Rm9ybWF0IiwiZm9ybWF0QmFja0NhcmROdW1iZXIiLCJmb3JtYXRCYWNrRXhwaXJ5IiwiZm9ybWF0Q2FyZE51bWJlciIsImZvcm1hdEV4cGlyeSIsImZvcm1hdEZvcndhcmRFeHBpcnkiLCJmb3JtYXRGb3J3YXJkU2xhc2giLCJmb3JtYXRNb250aEV4cGlyeSIsImhhc1RleHRTZWxlY3RlZCIsImx1aG5DaGVjayIsInJlRm9ybWF0Q2FyZE51bWJlciIsInJlc3RyaWN0Q1ZDIiwicmVzdHJpY3RDYXJkTnVtYmVyIiwicmVzdHJpY3RDb21iaW5lZEV4cGlyeSIsInJlc3RyaWN0RXhwaXJ5IiwicmVzdHJpY3RNb250aEV4cGlyeSIsInJlc3RyaWN0TnVtZXJpYyIsInJlc3RyaWN0WWVhckV4cGlyeSIsInNldENhcmRUeXBlIiwiaW5kZXhPZiIsIml0ZW0iLCJ0eXBlIiwicGF0dGVybiIsImZvcm1hdCIsImN2Y0xlbmd0aCIsImx1aG4iLCJudW0iLCJjYXJkIiwiZGlnaXQiLCJkaWdpdHMiLCJvZGQiLCJzdW0iLCJyZXZlcnNlIiwicGFyc2VJbnQiLCJzZWxlY3Rpb25TdGFydCIsInNlbGVjdGlvbkVuZCIsInNlbGVjdGlvbiIsImNyZWF0ZVJhbmdlIiwic2V0VGltZW91dCIsIl90aGlzIiwiZm5zIiwicmUiLCJ1cHBlckxlbmd0aCIsIlN0cmluZyIsImZyb21DaGFyQ29kZSIsIm1ldGEiLCJzbGFzaCIsIm1ldGFLZXkiLCJpbnB1dCIsImN0cmxLZXkiLCJhbGxUeXBlcyIsImNhcmRUeXBlIiwiY2FyZEV4cGlyeVZhbCIsIm1vbnRoIiwicHJlZml4IiwieWVhciIsIkRhdGUiLCJnZXRGdWxsWWVhciIsInRvU3RyaW5nIiwic2xpY2UiLCJ2YWxpZGF0ZUNhcmROdW1iZXIiLCJ2YWxpZGF0ZUNhcmRFeHBpcnkiLCJjdXJyZW50VGltZSIsImV4cGlyeSIsInNldE1vbnRoIiwiZ2V0TW9udGgiLCJ2YWxpZGF0ZUNhcmRDVkMiLCJjdmMiLCJyZWYxIiwiZ3JvdXBzIiwiZXhlYyIsInNoaWZ0IiwiZm9ybWF0Q2FyZENWQyIsImZvcm1hdENhcmRFeHBpcnkiLCJmb3JtYXRDYXJkRXhwaXJ5TXVsdGlwbGUiLCJnZXRDYXJkQXJyYXkiLCJzZXRDYXJkQXJyYXkiLCJjYXJkQXJyYXkiLCJhZGRUb0NhcmRBcnJheSIsImNhcmRPYmplY3QiLCJyZW1vdmVGcm9tQ2FyZEFycmF5Iiwia2V5Iiwic3BsaWNlIiwidGxpdGUiLCJwYXJlbnRFbGVtZW50Iiwic2hvdyIsInRvb2x0aXAiLCJoaWRlIiwib2Zmc2V0VG9wIiwib2Zmc2V0TGVmdCIsIm9mZnNldFBhcmVudCIsIm9mZnNldFdpZHRoIiwib2Zmc2V0SGVpZ2h0IiwiZCIsInN0eWxlIiwidG9wIiwibGVmdCIsImNyZWF0ZUVsZW1lbnQiLCJncmF2IiwiZ2V0QXR0cmlidXRlIiwiaW5uZXJIVE1MIiwiYXBwZW5kQ2hpbGQiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJib3R0b20iLCJpbm5lckhlaWdodCIsInJpZ2h0IiwiaW5uZXJXaWR0aCIsInRpdGxlIiwic2V0QXR0cmlidXRlIiwiY2xlYXJUaW1lb3V0IiwicGFyZW50Tm9kZSIsInJlbW92ZUNoaWxkIiwiYyIsInAiLCJfdmFsaWRGb3JtIiwiX3ZhbGlkRm9ybTIiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0Iiwib2JqIiwiX19lc01vZHVsZSIsImRlZmF1bHQiLCJWYWxpZEZvcm0iLCJ0b2dnbGVJbnZhbGlkQ2xhc3MiLCJoYW5kbGVDdXN0b21NZXNzYWdlcyIsImhhbmRsZUN1c3RvbU1lc3NhZ2VEaXNwbGF5IiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJjbG9uZSIsImRlZmF1bHRzIiwiaW5zZXJ0QWZ0ZXIiLCJpbnNlcnRCZWZvcmUiLCJmb3JFYWNoIiwiZGVib3VuY2UiLCJjb3B5IiwiYXR0ciIsImhhc093blByb3BlcnR5IiwiZGVmYXVsdE9iamVjdCIsImsiLCJ1bmRlZmluZWQiLCJyZWZOb2RlIiwibm9kZVRvSW5zZXJ0Iiwic2libGluZyIsIm5leHRTaWJsaW5nIiwiX3BhcmVudCIsInBhcmVudCIsIml0ZW1zIiwiZm4iLCJtcyIsInRpbWVvdXQiLCJkZWJvdW5jZWRGbiIsInZhbGlkRm9ybSIsIl91dGlsIiwiaW52YWxpZENsYXNzIiwidmFsaWRpdHkiLCJ2YWxpZCIsImVycm9yUHJvcHMiLCJnZXRDdXN0b21NZXNzYWdlIiwiY3VzdG9tTWVzc2FnZXMiLCJsb2NhbEVycm9yUHJvcHMiLCJjb25jYXQiLCJwcm9wIiwiY2hlY2tWYWxpZGl0eSIsIm1lc3NhZ2UiLCJzZXRDdXN0b21WYWxpZGl0eSIsIm9wdGlvbnMiLCJ2YWxpZGF0aW9uRXJyb3JDbGFzcyIsInZhbGlkYXRpb25FcnJvclBhcmVudENsYXNzIiwiZXJyb3JQbGFjZW1lbnQiLCJpbnNlcnRFcnJvciIsImVycm9yTm9kZSIsInF1ZXJ5U2VsZWN0b3IiLCJ2YWxpZGF0aW9uTWVzc2FnZSIsInRleHRDb250ZW50IiwiZGVmYXVsdE9wdGlvbnMiLCJpbnB1dHMiLCJ0b0xvd2VyQ2FzZSIsImZvY3VzSW52YWxpZElucHV0IiwidmFsaWRGb3JtSW5wdXRzIiwiZm9ybSIsImZvY3VzRmlyc3QiLCJpbnZhbGlkTm9kZSIsImZvY3VzIiwiJCIsInBsdWdpbk5hbWUiLCJQbHVnaW4iLCJleHRlbmQiLCJfZGVmYXVsdHMiLCJfbmFtZSIsImluaXQiLCJwcm90b3R5cGUiLCJyZXNldCIsImFtb3VudCIsImRvY3VtZW50RWxlbWVudCIsInBhcnNlRmxvYXQiLCJsZXZlbF9hbW91bnRfc2VsZWN0b3IiLCJvcmlnaW5hbF9hbW91bnQiLCJvcmlnaW5hbF9hbW91bnRfc2VsZWN0b3IiLCJwcm9jZXNzaW5nX2ZlZSIsIk1hdGgiLCJyb3VuZCIsImZlZV9hbW91bnQiLCJwb3ciLCJ0b0ZpeGVkIiwicHJvY2Vzc2luZ19mZWVfdGV4dCIsImNyZWF0ZV9hY2NvdW50IiwiYnV0dG9uX3RleHQiLCJwYXlfYnV0dG9uX3NlbGVjdG9yIiwic3RyaXBlIiwiU3RyaXBlIiwic3RyaXBlX3B1Ymxpc2hhYmxlX2tleSIsImVsZW1lbnRzIiwiZm9udHMiLCJjc3NTcmMiLCJkZWJ1ZyIsImFuYWx5dGljc1RyYWNraW5nIiwiYW1vdW50QXNSYWRpbyIsImFtb3VudFVwZGF0ZWQiLCJwYXlfY2NfcHJvY2Vzc2luZ19zZWxlY3RvciIsImNyZWRpdENhcmRQcm9jZXNzaW5nRmVlcyIsImRvbmF0ZV9mb3JtX3NlbGVjdG9yIiwiZG9uYXRlQW5vbnltb3VzbHkiLCJob25vck9yTWVtb3J5VG9nZ2xlIiwib3V0c2lkZVVuaXRlZFN0YXRlcyIsInNoaXBwaW5nQWRkcmVzcyIsImFsbG93TWlubnBvc3RBY2NvdW50IiwicGF5bWVudFJlcXVlc3RCdXR0b24iLCJjaG9vc2VQYXltZW50TWV0aG9kIiwiY3JlZGl0Q2FyZEZpZWxkcyIsInZhbGlkYXRlU2V0dXAiLCJmb3JtU2V0dXAiLCJjb25maXJtX2Zvcm1fc2VsZWN0b3IiLCJzaG93TmV3c2xldHRlclNldHRpbmdzIiwiY29uZmlybU1lc3NhZ2VTdWJtaXQiLCJjb25zb2xlIiwibG9nIiwiZGlyIiwiYW5hbHl0aWNzX3R5cGUiLCJwcm9ncmVzcyIsInByb2dyZXNzX3NlbGVjdG9yIiwic3RlcCIsImFjdGlvbiIsIm5hdl9pdGVtX2NvdW50Iiwib3BwX2lkIiwib3BwX2lkX3NlbGVjdG9yIiwicG9zdF9wdXJjaGFzZSIsImdhIiwiaW5kZXgiLCJmaW5pc2hfc2VjdGlvbl9zZWxlY3RvciIsImFuYWx5dGljc1RyYWNraW5nU3RlcCIsImluc3RhbGxtZW50X3BlcmlvZCIsImxldmVsIiwidGhhdCIsImluc3RhbGxtZW50X3BlcmlvZF9zZWxlY3RvciIsImFqYXgiLCJtZXRob2QiLCJ1cmwiLCJkb25lIiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJwcm9kdWN0IiwiZ2V0VG90YWxBbW91bnQiLCJndGFnIiwicGFnZV90aXRsZSIsInBhZ2VfcGF0aCIsImxvY2F0aW9uIiwicGF0aG5hbWUiLCJwYWdlIiwic2V0UmFkaW9BbW91bnQiLCJjaGFuZ2UiLCJmaWVsZCIsInN0cmlwZV9wYXltZW50X3R5cGUiLCJnZXRTdHJpcGVQYXltZW50VHlwZSIsImlzIiwiY2FsY3VsYXRlRmVlcyIsInNldEZhaXJNYXJrZXRWYWx1ZSIsImFtb3VudF9zZWxlY3Rvcl9mYWlyX21hcmtldCIsImFkZGl0aW9uYWxfYW1vdW50X2ZpZWxkIiwidG90YWxfYW1vdW50IiwiYWRkaXRpb25hbF9hbW91bnQiLCJhbW91bnRfc2VsZWN0b3IiLCJmYWlyX21hcmtldF92YWx1ZV9zZWxlY3RvciIsImZhaXJNYXJrZXRWYWx1ZSIsInNldFN0cmlwZVBheW1lbnRUeXBlIiwiZmVlcyIsImNyZWRpdENhcmRGZWVDaGVja2JveCIsImZ1bGxfYW1vdW50IiwiZnVsbF9hbW91bnRfc2VsZWN0b3IiLCJwYXltZW50UmVxdWVzdCIsInVwZGF0ZSIsInRvdGFsIiwibGFiZWwiLCJ0b2dnbGVBbm9ueW1vdXMiLCJhbm9ueW1vdXNfc2VsZWN0b3IiLCJuYW1lX3NlbGVjdG9yIiwiaG9ub3JPck1lbW9yeSIsImhvbm9yX29yX21lbW9yeV9jaG9vc2VyIiwiaG9ub3JfbWVtb3J5X2lucHV0X2dyb3VwIiwiaG9ub3JfdHlwZV9zZWxlY3RvciIsImhvbm9yX25hbWVfc2VsZWN0b3IiLCJzaG93X2JpbGxpbmdfY291bnRyeV9zZWxlY3RvciIsImNsaWNrIiwiY2hhbmdlRmllbGRzT3V0c2lkZVVTIiwic2hvd19zaGlwcGluZ19jb3VudHJ5X3NlbGVjdG9yIiwic2hpcHBpbmdfY291bnRyeV9zZWxlY3RvciIsImJpbGxpbmdfb3Jfc2hpcHBpbmciLCJ6aXBfcGFyZW50IiwiYmlsbGluZ196aXBfZmllbGRfc2VsZWN0b3IiLCJzdGF0ZV9wYXJlbnQiLCJiaWxsaW5nX3N0YXRlX2ZpZWxkX3NlbGVjdG9yIiwiYmlsbGluZ19jb3VudHJ5X3NlbGVjdG9yIiwic2hpcHBpbmdfemlwX2ZpZWxkX3NlbGVjdG9yIiwic2hpcHBpbmdfc3RhdGVfZmllbGRfc2VsZWN0b3IiLCJjaGFuZ2VGaWVsZHNJbnNpZGVVUyIsImh0bWwiLCJzaG93X3NoaXBwaW5nIiwidXNlX2Zvcl9zaGlwcGluZ19zZWxlY3RvciIsInNoaXBwaW5nX3NlbGVjdG9yIiwiYWNjb3VudF9leGlzdHMiLCJzaG93UGFzc3dvcmQiLCJzaG93UGFzc3dvcmRTdHJlbmd0aCIsInNwYW1FbWFpbCIsImVtYWlsX2ZpZWxkX3NlbGVjdG9yIiwidG9nZ2xlQWNjb3VudEZpZWxkcyIsImNyZWF0ZV9tcF9zZWxlY3RvciIsImRvbmVUeXBpbmciLCJlbWFpbCIsImNoZWNrTWlubnBvc3RBY2NvdW50IiwidHlwaW5nVGltZXIiLCJkb25lVHlwaW5nSW50ZXJ2YWwiLCJrZXl1cCIsImVtYWlsX2ZpZWxkIiwic3BhbUVycm9yQ29udGFpbmVyIiwiY3JlYXRlX2FjY291bnRfc2VsZWN0b3IiLCJiZWZvcmUiLCJwYXNzd29yZF9zZWxlY3RvciIsIiRzdWJtaXQiLCIkY29udGFpbmVyIiwiJGZpZWxkIiwic2hvd19wYXNzIiwiJHRvZ2dsZSIsImNoZWNrYm94IiwiJGJlZm9yZSIsImFmdGVyIiwiY2hlY2tQYXNzd29yZFN0cmVuZ3RoIiwiJHBhc3N3b3JkIiwiJHN0cmVuZ3RoTWV0ZXIiLCIkc3RyZW5ndGhUZXh0IiwicGFzc3dvcmQiLCJyZXN1bHQiLCJ6eGN2Ym4iLCJzdHJlbmd0aCIsInNjb3JlIiwidXNlciIsIm1pbm5wb3N0X3Jvb3QiLCJzdGF0dXMiLCJyZWFzb24iLCJjb3VudHJ5IiwiY3VycmVuY3kiLCJwckJ1dHRvbiIsImNyZWF0ZSIsInRoZW1lIiwiaGVpZ2h0IiwiY2FuTWFrZVBheW1lbnQiLCJ0aGVuIiwibW91bnQiLCJoaWRlUGF5bWVudFJlcXVlc3QiLCJldmVudCIsInN1cHBvcnRmb3JtIiwiZ2V0IiwicmVwb3J0VmFsaWRpdHkiLCJ0b2tlbkZpZWxkTmFtZSIsInRva2VuRmllbGQiLCJwYXltZW50TWV0aG9kIiwiaWQiLCJmb3JtUHJvY2Vzc29yIiwiaGlkZUVsZW1lbnQiLCJjaG9vc2VfcGF5bWVudCIsImNoZWNrZWRfaWQiLCJjaGVja2VkX3ZhbHVlIiwic2V0dXBQYXltZW50TWV0aG9kIiwiZWxlbWVudF9pZCIsImVsZW1lbnRfdmFsdWUiLCJhY2hGaWVsZHMiLCJyZW1vdmVBY2hGaWVsZHMiLCJwYXltZW50X21ldGhvZF9zZWxlY3RvciIsInBsYWlkX2xpbmsiLCJidXR0b25EaXNhYmxlZCIsImxpbmtIYW5kbGVyIiwiZGVzdHJveSIsImJhc2UiLCJpY29uQ29sb3IiLCJsaW5lSGVpZ2h0IiwiZm9udFdlaWdodCIsImZvbnRGYW1pbHkiLCJmb250U2l6ZSIsImludmFsaWQiLCJjb2xvciIsImNhcmROdW1iZXJFbGVtZW50Iiwic2hvd0ljb24iLCJjY19udW1fc2VsZWN0b3IiLCJjYXJkRXhwaXJ5RWxlbWVudCIsImNjX2V4cF9zZWxlY3RvciIsImNhcmRDdmNFbGVtZW50IiwiY2NfY3ZjX3NlbGVjdG9yIiwiYnJhbmQiLCJzdHJpcGVFcnJvckRpc3BsYXkiLCJidXR0b25TdGF0dXMiLCJzaG93U3Bpbm5lciIsImhpZGVTcGlubmVyIiwiYmFua1Rva2VuRmllbGROYW1lIiwiYmFua1Rva2VuRmllbGQiLCJQbGFpZCIsImNsaWVudE5hbWUiLCJlbnYiLCJwbGFpZF9lbnYiLCJ0b2tlbiIsImdldEVsZW1lbnRCeUlkIiwib25TdWNjZXNzIiwicHVibGljX3Rva2VuIiwibWV0YWRhdGEiLCJKU09OIiwic3RyaW5naWZ5IiwiYWNjb3VudF9pZCIsImNvbnRlbnRUeXBlIiwicmVzcG9uc2UiLCJzdHJpcGVfYmFua19hY2NvdW50X3Rva2VuIiwicHJlcGVuZCIsImZhaWwiLCJyZXNldEZvcm1FcnJvcnMiLCJvcGVuIiwiYnV0dG9uIiwiZGlzYWJsZWQiLCJhY2hfd2FzX2luaXRpYWxpemVkIiwicmVtb3ZlQXR0ciIsImZvcm1zIiwiZm9ybV9zZWxlY3RvciIsInNjcm9sbFRvRm9ybUVycm9yIiwiZmlyc3QiLCJmaXJzdF9ob2xkZXIiLCJlbGVtZW50T2Zmc2V0Iiwib2Zmc2V0IiwicGFnZU9mZnNldCIsInBhZ2VZT2Zmc2V0Iiwic2Nyb2xsVG9wIiwic3VibWl0IiwiYmlsbGluZ0RldGFpbHMiLCJnZW5lcmF0ZUJpbGxpbmdEZXRhaWxzIiwiY3JlYXRlTWlublBvc3RBY2NvdW50IiwicGF5bWVudF90eXBlIiwiY3JlYXRlUGF5bWVudE1ldGhvZCIsImJhbmtUb2tlbkhhbmRsZXIiLCJzdWJtaXRGb3JtT25seSIsInRoaXNfc2VsZWN0b3IiLCJ3aGljaF9lcnJvciIsImVtcHR5IiwiYW5pbWF0ZSIsImZpcnN0X25hbWUiLCJmaXJzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yIiwibGFzdF9uYW1lIiwibGFzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yIiwicGFzc3dvcmRfZmllbGRfc2VsZWN0b3IiLCJjaXR5IiwiYmlsbGluZ19jaXR5X2ZpZWxkX3NlbGVjdG9yIiwic3RhdGUiLCJ6aXAiLCJhZGRyZXNzRGV0YWlscyIsImZ1bGxfbmFtZSIsInN0cmVldCIsImJpbGxpbmdfc3RyZWV0X2ZpZWxkX3NlbGVjdG9yIiwibGluZTEiLCJwb3N0YWxfY29kZSIsImNvdW50cnlfZmllbGRfdmFsdWUiLCJiaWxsaW5nX2NvdW50cnlfZmllbGRfc2VsZWN0b3IiLCJhZGRyZXNzIiwiY2FyZEVsZW1lbnQiLCJiaWxsaW5nX2RldGFpbHMiLCJoYW5kbGVTZXJ2ZXJFcnJvciIsImFqYXhfdXJsIiwiZmV0Y2giLCJoZWFkZXJzIiwiYm9keSIsInNlcmlhbGl6ZSIsImpzb24iLCJoYW5kbGVTZXJ2ZXJSZXNwb25zZSIsImNhY2hlIiwiZXJyb3JzIiwicmVxdWlyZXNfYWN0aW9uIiwidGhpc19maWVsZCIsImVhY2giLCJwYXJhbSIsImRpc3BsYXlFcnJvck1lc3NhZ2UiLCJzdHJpcGVFcnJvclNlbGVjdG9yIiwiZmllbGRQYXJlbnQiLCJwcmV2IiwibmV3c2xldHRlcl9ncm91cF9odG1sIiwibmV3c2xldHRlcl9ncm91cF9zZWxlY3RvciIsImdldF9kYXRhIiwic2hvcnRjb2RlIiwicGxhY2VtZW50IiwiZ3JvdXBfZmllbGRzIiwiY2F0ZWdvcnkiLCJtYWlsY2hpbXBfc3RhdHVzIiwibWFpbGNoaW1wX3VzZXJfaWQiLCJleGlzdGluZ19uZXdzbGV0dGVyX3NldHRpbmdzIiwiY29uZmlybWZvcm0iLCJuZXdzbGV0dGVyX2dyb3VwcyIsIm5ld19uZXdzbGV0dGVyX3NldHRpbmdzIiwicG9zdF9kYXRhIiwiZ3JvdXBzX3N1Ym1pdHRlZCIsImdyb3Vwc19hdmFpbGFibGUiLCJncm91cCIsImRhdGFUeXBlIiwic3VjY2VzcyIsImpRdWVyeSJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLENBQUMsVUFBU0EsQ0FBVCxFQUFXO0FBQUMsTUFBRyxRQUFPQyxPQUFQLHlDQUFPQSxPQUFQLE9BQWlCLFFBQWpCLElBQTJCLE9BQU9DLE1BQVAsS0FBZ0IsV0FBOUMsRUFBMEQ7QUFBQ0EsSUFBQUEsTUFBTSxDQUFDRCxPQUFQLEdBQWVELENBQUMsRUFBaEI7QUFBbUIsR0FBOUUsTUFBbUYsSUFBRyxPQUFPRyxNQUFQLEtBQWdCLFVBQWhCLElBQTRCQSxNQUFNLENBQUNDLEdBQXRDLEVBQTBDO0FBQUNELElBQUFBLE1BQU0sQ0FBQyxFQUFELEVBQUlILENBQUosQ0FBTjtBQUFhLEdBQXhELE1BQTREO0FBQUMsUUFBSUssQ0FBSjs7QUFBTSxRQUFHLE9BQU9DLE1BQVAsS0FBZ0IsV0FBbkIsRUFBK0I7QUFBQ0QsTUFBQUEsQ0FBQyxHQUFDQyxNQUFGO0FBQVMsS0FBekMsTUFBOEMsSUFBRyxPQUFPQyxNQUFQLEtBQWdCLFdBQW5CLEVBQStCO0FBQUNGLE1BQUFBLENBQUMsR0FBQ0UsTUFBRjtBQUFTLEtBQXpDLE1BQThDLElBQUcsT0FBT0MsSUFBUCxLQUFjLFdBQWpCLEVBQTZCO0FBQUNILE1BQUFBLENBQUMsR0FBQ0csSUFBRjtBQUFPLEtBQXJDLE1BQXlDO0FBQUNILE1BQUFBLENBQUMsR0FBQyxJQUFGO0FBQU87O0FBQUEsS0FBQ0EsQ0FBQyxDQUFDSSxPQUFGLEtBQWNKLENBQUMsQ0FBQ0ksT0FBRixHQUFZLEVBQTFCLENBQUQsRUFBZ0NDLEVBQWhDLEdBQXFDVixDQUFDLEVBQXRDO0FBQXlDO0FBQUMsQ0FBMVYsRUFBNFYsWUFBVTtBQUFDLE1BQUlHLE1BQUosRUFBV0QsTUFBWCxFQUFrQkQsT0FBbEI7QUFBMEIsU0FBUSxTQUFTVSxDQUFULENBQVdDLENBQVgsRUFBYUMsQ0FBYixFQUFlQyxDQUFmLEVBQWlCO0FBQUMsYUFBU0MsQ0FBVCxDQUFXQyxDQUFYLEVBQWFDLENBQWIsRUFBZTtBQUFDLFVBQUcsQ0FBQ0osQ0FBQyxDQUFDRyxDQUFELENBQUwsRUFBUztBQUFDLFlBQUcsQ0FBQ0osQ0FBQyxDQUFDSSxDQUFELENBQUwsRUFBUztBQUFDLGNBQUlFLENBQUMsR0FBQyxPQUFPQyxPQUFQLElBQWdCLFVBQWhCLElBQTRCQSxPQUFsQztBQUEwQyxjQUFHLENBQUNGLENBQUQsSUFBSUMsQ0FBUCxFQUFTLE9BQU9BLENBQUMsQ0FBQ0YsQ0FBRCxFQUFHLENBQUMsQ0FBSixDQUFSO0FBQWUsY0FBR0ksQ0FBSCxFQUFLLE9BQU9BLENBQUMsQ0FBQ0osQ0FBRCxFQUFHLENBQUMsQ0FBSixDQUFSO0FBQWUsY0FBSWhCLENBQUMsR0FBQyxJQUFJcUIsS0FBSixDQUFVLHlCQUF1QkwsQ0FBdkIsR0FBeUIsR0FBbkMsQ0FBTjtBQUE4QyxnQkFBTWhCLENBQUMsQ0FBQ3NCLElBQUYsR0FBTyxrQkFBUCxFQUEwQnRCLENBQWhDO0FBQWtDOztBQUFBLFlBQUl1QixDQUFDLEdBQUNWLENBQUMsQ0FBQ0csQ0FBRCxDQUFELEdBQUs7QUFBQ2YsVUFBQUEsT0FBTyxFQUFDO0FBQVQsU0FBWDtBQUF3QlcsUUFBQUEsQ0FBQyxDQUFDSSxDQUFELENBQUQsQ0FBSyxDQUFMLEVBQVFRLElBQVIsQ0FBYUQsQ0FBQyxDQUFDdEIsT0FBZixFQUF1QixVQUFTVSxDQUFULEVBQVc7QUFBQyxjQUFJRSxDQUFDLEdBQUNELENBQUMsQ0FBQ0ksQ0FBRCxDQUFELENBQUssQ0FBTCxFQUFRTCxDQUFSLENBQU47QUFBaUIsaUJBQU9JLENBQUMsQ0FBQ0YsQ0FBQyxHQUFDQSxDQUFELEdBQUdGLENBQUwsQ0FBUjtBQUFnQixTQUFwRSxFQUFxRVksQ0FBckUsRUFBdUVBLENBQUMsQ0FBQ3RCLE9BQXpFLEVBQWlGVSxDQUFqRixFQUFtRkMsQ0FBbkYsRUFBcUZDLENBQXJGLEVBQXVGQyxDQUF2RjtBQUEwRjs7QUFBQSxhQUFPRCxDQUFDLENBQUNHLENBQUQsQ0FBRCxDQUFLZixPQUFaO0FBQW9COztBQUFBLFFBQUltQixDQUFDLEdBQUMsT0FBT0QsT0FBUCxJQUFnQixVQUFoQixJQUE0QkEsT0FBbEM7O0FBQTBDLFNBQUksSUFBSUgsQ0FBQyxHQUFDLENBQVYsRUFBWUEsQ0FBQyxHQUFDRixDQUFDLENBQUNXLE1BQWhCLEVBQXVCVCxDQUFDLEVBQXhCO0FBQTJCRCxNQUFBQSxDQUFDLENBQUNELENBQUMsQ0FBQ0UsQ0FBRCxDQUFGLENBQUQ7QUFBM0I7O0FBQW1DLFdBQU9ELENBQVA7QUFBUyxHQUF6YixDQUEyYjtBQUFDLE9BQUUsQ0FBQyxVQUFTSSxPQUFULEVBQWlCakIsTUFBakIsRUFBd0JELE9BQXhCLEVBQWdDO0FBQ3YyQixVQUFJeUIsR0FBSixFQUFRQyxPQUFSLEVBQWlCQyxLQUFqQjs7QUFFQUYsTUFBQUEsR0FBRSxHQUFHLFlBQVNHLFFBQVQsRUFBbUI7QUFDdEIsWUFBSUgsR0FBRSxDQUFDSSxZQUFILENBQWdCRCxRQUFoQixDQUFKLEVBQStCO0FBQzdCLGlCQUFPQSxRQUFQO0FBQ0Q7O0FBQ0QsZUFBT0UsUUFBUSxDQUFDQyxnQkFBVCxDQUEwQkgsUUFBMUIsQ0FBUDtBQUNELE9BTEQ7O0FBT0FILE1BQUFBLEdBQUUsQ0FBQ0ksWUFBSCxHQUFrQixVQUFTRyxFQUFULEVBQWE7QUFDN0IsZUFBT0EsRUFBRSxJQUFLQSxFQUFFLENBQUNDLFFBQUgsSUFBZSxJQUE3QjtBQUNELE9BRkQ7O0FBSUFOLE1BQUFBLEtBQUssR0FBRyxvQ0FBUjs7QUFFQUYsTUFBQUEsR0FBRSxDQUFDUyxJQUFILEdBQVUsVUFBU0MsSUFBVCxFQUFlO0FBQ3ZCLFlBQUlBLElBQUksS0FBSyxJQUFiLEVBQW1CO0FBQ2pCLGlCQUFPLEVBQVA7QUFDRCxTQUZELE1BRU87QUFDTCxpQkFBTyxDQUFDQSxJQUFJLEdBQUcsRUFBUixFQUFZQyxPQUFaLENBQW9CVCxLQUFwQixFQUEyQixFQUEzQixDQUFQO0FBQ0Q7QUFDRixPQU5EOztBQVFBRCxNQUFBQSxPQUFPLEdBQUcsS0FBVjs7QUFFQUQsTUFBQUEsR0FBRSxDQUFDWSxHQUFILEdBQVMsVUFBU0wsRUFBVCxFQUFhSyxHQUFiLEVBQWtCO0FBQ3pCLFlBQUlDLEdBQUo7O0FBQ0EsWUFBSUMsU0FBUyxDQUFDZixNQUFWLEdBQW1CLENBQXZCLEVBQTBCO0FBQ3hCLGlCQUFPUSxFQUFFLENBQUNRLEtBQUgsR0FBV0gsR0FBbEI7QUFDRCxTQUZELE1BRU87QUFDTEMsVUFBQUEsR0FBRyxHQUFHTixFQUFFLENBQUNRLEtBQVQ7O0FBQ0EsY0FBSSxPQUFPRixHQUFQLEtBQWUsUUFBbkIsRUFBNkI7QUFDM0IsbUJBQU9BLEdBQUcsQ0FBQ0YsT0FBSixDQUFZVixPQUFaLEVBQXFCLEVBQXJCLENBQVA7QUFDRCxXQUZELE1BRU87QUFDTCxnQkFBSVksR0FBRyxLQUFLLElBQVosRUFBa0I7QUFDaEIscUJBQU8sRUFBUDtBQUNELGFBRkQsTUFFTztBQUNMLHFCQUFPQSxHQUFQO0FBQ0Q7QUFDRjtBQUNGO0FBQ0YsT0FoQkQ7O0FBa0JBYixNQUFBQSxHQUFFLENBQUNnQixjQUFILEdBQW9CLFVBQVNDLFdBQVQsRUFBc0I7QUFDeEMsWUFBSSxPQUFPQSxXQUFXLENBQUNELGNBQW5CLEtBQXNDLFVBQTFDLEVBQXNEO0FBQ3BEQyxVQUFBQSxXQUFXLENBQUNELGNBQVo7QUFDQTtBQUNEOztBQUNEQyxRQUFBQSxXQUFXLENBQUNDLFdBQVosR0FBMEIsS0FBMUI7QUFDQSxlQUFPLEtBQVA7QUFDRCxPQVBEOztBQVNBbEIsTUFBQUEsR0FBRSxDQUFDbUIsY0FBSCxHQUFvQixVQUFTbEMsQ0FBVCxFQUFZO0FBQzlCLFlBQUltQyxRQUFKO0FBQ0FBLFFBQUFBLFFBQVEsR0FBR25DLENBQVg7QUFDQUEsUUFBQUEsQ0FBQyxHQUFHO0FBQ0ZvQyxVQUFBQSxLQUFLLEVBQUVELFFBQVEsQ0FBQ0MsS0FBVCxJQUFrQixJQUFsQixHQUF5QkQsUUFBUSxDQUFDQyxLQUFsQyxHQUEwQyxLQUFLLENBRHBEO0FBRUZDLFVBQUFBLE1BQU0sRUFBRUYsUUFBUSxDQUFDRSxNQUFULElBQW1CRixRQUFRLENBQUNHLFVBRmxDO0FBR0ZQLFVBQUFBLGNBQWMsRUFBRSwwQkFBVztBQUN6QixtQkFBT2hCLEdBQUUsQ0FBQ2dCLGNBQUgsQ0FBa0JJLFFBQWxCLENBQVA7QUFDRCxXQUxDO0FBTUZJLFVBQUFBLGFBQWEsRUFBRUosUUFOYjtBQU9GSyxVQUFBQSxJQUFJLEVBQUVMLFFBQVEsQ0FBQ0ssSUFBVCxJQUFpQkwsUUFBUSxDQUFDTTtBQVA5QixTQUFKOztBQVNBLFlBQUl6QyxDQUFDLENBQUNvQyxLQUFGLElBQVcsSUFBZixFQUFxQjtBQUNuQnBDLFVBQUFBLENBQUMsQ0FBQ29DLEtBQUYsR0FBVUQsUUFBUSxDQUFDTyxRQUFULElBQXFCLElBQXJCLEdBQTRCUCxRQUFRLENBQUNPLFFBQXJDLEdBQWdEUCxRQUFRLENBQUNRLE9BQW5FO0FBQ0Q7O0FBQ0QsZUFBTzNDLENBQVA7QUFDRCxPQWhCRDs7QUFrQkFlLE1BQUFBLEdBQUUsQ0FBQzZCLEVBQUgsR0FBUSxVQUFTQyxPQUFULEVBQWtCQyxTQUFsQixFQUE2QkMsUUFBN0IsRUFBdUM7QUFDN0MsWUFBSXpCLEVBQUosRUFBUWIsQ0FBUixFQUFXdUMsQ0FBWCxFQUFjQyxHQUFkLEVBQW1CQyxJQUFuQixFQUF5QkMsYUFBekIsRUFBd0NDLGdCQUF4QyxFQUEwREMsR0FBMUQ7O0FBQ0EsWUFBSVIsT0FBTyxDQUFDL0IsTUFBWixFQUFvQjtBQUNsQixlQUFLTCxDQUFDLEdBQUcsQ0FBSixFQUFPd0MsR0FBRyxHQUFHSixPQUFPLENBQUMvQixNQUExQixFQUFrQ0wsQ0FBQyxHQUFHd0MsR0FBdEMsRUFBMkN4QyxDQUFDLEVBQTVDLEVBQWdEO0FBQzlDYSxZQUFBQSxFQUFFLEdBQUd1QixPQUFPLENBQUNwQyxDQUFELENBQVo7O0FBQ0FNLFlBQUFBLEdBQUUsQ0FBQzZCLEVBQUgsQ0FBTXRCLEVBQU4sRUFBVXdCLFNBQVYsRUFBcUJDLFFBQXJCO0FBQ0Q7O0FBQ0Q7QUFDRDs7QUFDRCxZQUFJRCxTQUFTLENBQUNRLEtBQVYsQ0FBZ0IsR0FBaEIsQ0FBSixFQUEwQjtBQUN4QkQsVUFBQUEsR0FBRyxHQUFHUCxTQUFTLENBQUNTLEtBQVYsQ0FBZ0IsR0FBaEIsQ0FBTjs7QUFDQSxlQUFLUCxDQUFDLEdBQUcsQ0FBSixFQUFPRSxJQUFJLEdBQUdHLEdBQUcsQ0FBQ3ZDLE1BQXZCLEVBQStCa0MsQ0FBQyxHQUFHRSxJQUFuQyxFQUF5Q0YsQ0FBQyxFQUExQyxFQUE4QztBQUM1Q0csWUFBQUEsYUFBYSxHQUFHRSxHQUFHLENBQUNMLENBQUQsQ0FBbkI7O0FBQ0FqQyxZQUFBQSxHQUFFLENBQUM2QixFQUFILENBQU1DLE9BQU4sRUFBZU0sYUFBZixFQUE4QkosUUFBOUI7QUFDRDs7QUFDRDtBQUNEOztBQUNESyxRQUFBQSxnQkFBZ0IsR0FBR0wsUUFBbkI7O0FBQ0FBLFFBQUFBLFFBQVEsR0FBRyxrQkFBUy9DLENBQVQsRUFBWTtBQUNyQkEsVUFBQUEsQ0FBQyxHQUFHZSxHQUFFLENBQUNtQixjQUFILENBQWtCbEMsQ0FBbEIsQ0FBSjtBQUNBLGlCQUFPb0QsZ0JBQWdCLENBQUNwRCxDQUFELENBQXZCO0FBQ0QsU0FIRDs7QUFJQSxZQUFJNkMsT0FBTyxDQUFDVyxnQkFBWixFQUE4QjtBQUM1QixpQkFBT1gsT0FBTyxDQUFDVyxnQkFBUixDQUF5QlYsU0FBekIsRUFBb0NDLFFBQXBDLEVBQThDLEtBQTlDLENBQVA7QUFDRDs7QUFDRCxZQUFJRixPQUFPLENBQUNZLFdBQVosRUFBeUI7QUFDdkJYLFVBQUFBLFNBQVMsR0FBRyxPQUFPQSxTQUFuQjtBQUNBLGlCQUFPRCxPQUFPLENBQUNZLFdBQVIsQ0FBb0JYLFNBQXBCLEVBQStCQyxRQUEvQixDQUFQO0FBQ0Q7O0FBQ0RGLFFBQUFBLE9BQU8sQ0FBQyxPQUFPQyxTQUFSLENBQVAsR0FBNEJDLFFBQTVCO0FBQ0QsT0E5QkQ7O0FBZ0NBaEMsTUFBQUEsR0FBRSxDQUFDMkMsUUFBSCxHQUFjLFVBQVNwQyxFQUFULEVBQWFxQyxTQUFiLEVBQXdCO0FBQ3BDLFlBQUkzRCxDQUFKOztBQUNBLFlBQUlzQixFQUFFLENBQUNSLE1BQVAsRUFBZTtBQUNiLGlCQUFRLFlBQVc7QUFDakIsZ0JBQUlMLENBQUosRUFBT3dDLEdBQVAsRUFBWVcsT0FBWjtBQUNBQSxZQUFBQSxPQUFPLEdBQUcsRUFBVjs7QUFDQSxpQkFBS25ELENBQUMsR0FBRyxDQUFKLEVBQU93QyxHQUFHLEdBQUczQixFQUFFLENBQUNSLE1BQXJCLEVBQTZCTCxDQUFDLEdBQUd3QyxHQUFqQyxFQUFzQ3hDLENBQUMsRUFBdkMsRUFBMkM7QUFDekNULGNBQUFBLENBQUMsR0FBR3NCLEVBQUUsQ0FBQ2IsQ0FBRCxDQUFOO0FBQ0FtRCxjQUFBQSxPQUFPLENBQUNDLElBQVIsQ0FBYTlDLEdBQUUsQ0FBQzJDLFFBQUgsQ0FBWTFELENBQVosRUFBZTJELFNBQWYsQ0FBYjtBQUNEOztBQUNELG1CQUFPQyxPQUFQO0FBQ0QsV0FSTSxFQUFQO0FBU0Q7O0FBQ0QsWUFBSXRDLEVBQUUsQ0FBQ3dDLFNBQVAsRUFBa0I7QUFDaEIsaUJBQU94QyxFQUFFLENBQUN3QyxTQUFILENBQWFDLEdBQWIsQ0FBaUJKLFNBQWpCLENBQVA7QUFDRCxTQUZELE1BRU87QUFDTCxpQkFBT3JDLEVBQUUsQ0FBQ3FDLFNBQUgsSUFBZ0IsTUFBTUEsU0FBN0I7QUFDRDtBQUNGLE9BbEJEOztBQW9CQTVDLE1BQUFBLEdBQUUsQ0FBQ2lELFFBQUgsR0FBYyxVQUFTMUMsRUFBVCxFQUFhcUMsU0FBYixFQUF3QjtBQUNwQyxZQUFJM0QsQ0FBSixFQUFPZ0UsUUFBUCxFQUFpQnZELENBQWpCLEVBQW9Cd0MsR0FBcEI7O0FBQ0EsWUFBSTNCLEVBQUUsQ0FBQ1IsTUFBUCxFQUFlO0FBQ2JrRCxVQUFBQSxRQUFRLEdBQUcsSUFBWDs7QUFDQSxlQUFLdkQsQ0FBQyxHQUFHLENBQUosRUFBT3dDLEdBQUcsR0FBRzNCLEVBQUUsQ0FBQ1IsTUFBckIsRUFBNkJMLENBQUMsR0FBR3dDLEdBQWpDLEVBQXNDeEMsQ0FBQyxFQUF2QyxFQUEyQztBQUN6Q1QsWUFBQUEsQ0FBQyxHQUFHc0IsRUFBRSxDQUFDYixDQUFELENBQU47QUFDQXVELFlBQUFBLFFBQVEsR0FBR0EsUUFBUSxJQUFJakQsR0FBRSxDQUFDaUQsUUFBSCxDQUFZaEUsQ0FBWixFQUFlMkQsU0FBZixDQUF2QjtBQUNEOztBQUNELGlCQUFPSyxRQUFQO0FBQ0Q7O0FBQ0QsWUFBSTFDLEVBQUUsQ0FBQ3dDLFNBQVAsRUFBa0I7QUFDaEIsaUJBQU94QyxFQUFFLENBQUN3QyxTQUFILENBQWFHLFFBQWIsQ0FBc0JOLFNBQXRCLENBQVA7QUFDRCxTQUZELE1BRU87QUFDTCxpQkFBTyxJQUFJTyxNQUFKLENBQVcsVUFBVVAsU0FBVixHQUFzQixPQUFqQyxFQUEwQyxJQUExQyxFQUFnRFEsSUFBaEQsQ0FBcUQ3QyxFQUFFLENBQUNxQyxTQUF4RCxDQUFQO0FBQ0Q7QUFDRixPQWZEOztBQWlCQTVDLE1BQUFBLEdBQUUsQ0FBQ3FELFdBQUgsR0FBaUIsVUFBUzlDLEVBQVQsRUFBYXFDLFNBQWIsRUFBd0I7QUFDdkMsWUFBSVUsR0FBSixFQUFTckUsQ0FBVCxFQUFZUyxDQUFaLEVBQWV3QyxHQUFmLEVBQW9CSSxHQUFwQixFQUF5Qk8sT0FBekI7O0FBQ0EsWUFBSXRDLEVBQUUsQ0FBQ1IsTUFBUCxFQUFlO0FBQ2IsaUJBQVEsWUFBVztBQUNqQixnQkFBSUwsQ0FBSixFQUFPd0MsR0FBUCxFQUFZVyxPQUFaO0FBQ0FBLFlBQUFBLE9BQU8sR0FBRyxFQUFWOztBQUNBLGlCQUFLbkQsQ0FBQyxHQUFHLENBQUosRUFBT3dDLEdBQUcsR0FBRzNCLEVBQUUsQ0FBQ1IsTUFBckIsRUFBNkJMLENBQUMsR0FBR3dDLEdBQWpDLEVBQXNDeEMsQ0FBQyxFQUF2QyxFQUEyQztBQUN6Q1QsY0FBQUEsQ0FBQyxHQUFHc0IsRUFBRSxDQUFDYixDQUFELENBQU47QUFDQW1ELGNBQUFBLE9BQU8sQ0FBQ0MsSUFBUixDQUFhOUMsR0FBRSxDQUFDcUQsV0FBSCxDQUFlcEUsQ0FBZixFQUFrQjJELFNBQWxCLENBQWI7QUFDRDs7QUFDRCxtQkFBT0MsT0FBUDtBQUNELFdBUk0sRUFBUDtBQVNEOztBQUNELFlBQUl0QyxFQUFFLENBQUN3QyxTQUFQLEVBQWtCO0FBQ2hCVCxVQUFBQSxHQUFHLEdBQUdNLFNBQVMsQ0FBQ0osS0FBVixDQUFnQixHQUFoQixDQUFOO0FBQ0FLLFVBQUFBLE9BQU8sR0FBRyxFQUFWOztBQUNBLGVBQUtuRCxDQUFDLEdBQUcsQ0FBSixFQUFPd0MsR0FBRyxHQUFHSSxHQUFHLENBQUN2QyxNQUF0QixFQUE4QkwsQ0FBQyxHQUFHd0MsR0FBbEMsRUFBdUN4QyxDQUFDLEVBQXhDLEVBQTRDO0FBQzFDNEQsWUFBQUEsR0FBRyxHQUFHaEIsR0FBRyxDQUFDNUMsQ0FBRCxDQUFUO0FBQ0FtRCxZQUFBQSxPQUFPLENBQUNDLElBQVIsQ0FBYXZDLEVBQUUsQ0FBQ3dDLFNBQUgsQ0FBYVEsTUFBYixDQUFvQkQsR0FBcEIsQ0FBYjtBQUNEOztBQUNELGlCQUFPVCxPQUFQO0FBQ0QsU0FSRCxNQVFPO0FBQ0wsaUJBQU90QyxFQUFFLENBQUNxQyxTQUFILEdBQWVyQyxFQUFFLENBQUNxQyxTQUFILENBQWFqQyxPQUFiLENBQXFCLElBQUl3QyxNQUFKLENBQVcsWUFBWVAsU0FBUyxDQUFDSixLQUFWLENBQWdCLEdBQWhCLEVBQXFCZ0IsSUFBckIsQ0FBMEIsR0FBMUIsQ0FBWixHQUE2QyxTQUF4RCxFQUFtRSxJQUFuRSxDQUFyQixFQUErRixHQUEvRixDQUF0QjtBQUNEO0FBQ0YsT0F4QkQ7O0FBMEJBeEQsTUFBQUEsR0FBRSxDQUFDeUQsV0FBSCxHQUFpQixVQUFTbEQsRUFBVCxFQUFhcUMsU0FBYixFQUF3QmMsSUFBeEIsRUFBOEI7QUFDN0MsWUFBSXpFLENBQUo7O0FBQ0EsWUFBSXNCLEVBQUUsQ0FBQ1IsTUFBUCxFQUFlO0FBQ2IsaUJBQVEsWUFBVztBQUNqQixnQkFBSUwsQ0FBSixFQUFPd0MsR0FBUCxFQUFZVyxPQUFaO0FBQ0FBLFlBQUFBLE9BQU8sR0FBRyxFQUFWOztBQUNBLGlCQUFLbkQsQ0FBQyxHQUFHLENBQUosRUFBT3dDLEdBQUcsR0FBRzNCLEVBQUUsQ0FBQ1IsTUFBckIsRUFBNkJMLENBQUMsR0FBR3dDLEdBQWpDLEVBQXNDeEMsQ0FBQyxFQUF2QyxFQUEyQztBQUN6Q1QsY0FBQUEsQ0FBQyxHQUFHc0IsRUFBRSxDQUFDYixDQUFELENBQU47QUFDQW1ELGNBQUFBLE9BQU8sQ0FBQ0MsSUFBUixDQUFhOUMsR0FBRSxDQUFDeUQsV0FBSCxDQUFleEUsQ0FBZixFQUFrQjJELFNBQWxCLEVBQTZCYyxJQUE3QixDQUFiO0FBQ0Q7O0FBQ0QsbUJBQU9iLE9BQVA7QUFDRCxXQVJNLEVBQVA7QUFTRDs7QUFDRCxZQUFJYSxJQUFKLEVBQVU7QUFDUixjQUFJLENBQUMxRCxHQUFFLENBQUNpRCxRQUFILENBQVkxQyxFQUFaLEVBQWdCcUMsU0FBaEIsQ0FBTCxFQUFpQztBQUMvQixtQkFBTzVDLEdBQUUsQ0FBQzJDLFFBQUgsQ0FBWXBDLEVBQVosRUFBZ0JxQyxTQUFoQixDQUFQO0FBQ0Q7QUFDRixTQUpELE1BSU87QUFDTCxpQkFBTzVDLEdBQUUsQ0FBQ3FELFdBQUgsQ0FBZTlDLEVBQWYsRUFBbUJxQyxTQUFuQixDQUFQO0FBQ0Q7QUFDRixPQXBCRDs7QUFzQkE1QyxNQUFBQSxHQUFFLENBQUMyRCxNQUFILEdBQVksVUFBU3BELEVBQVQsRUFBYXFELFFBQWIsRUFBdUI7QUFDakMsWUFBSTNFLENBQUo7O0FBQ0EsWUFBSXNCLEVBQUUsQ0FBQ1IsTUFBUCxFQUFlO0FBQ2IsaUJBQVEsWUFBVztBQUNqQixnQkFBSUwsQ0FBSixFQUFPd0MsR0FBUCxFQUFZVyxPQUFaO0FBQ0FBLFlBQUFBLE9BQU8sR0FBRyxFQUFWOztBQUNBLGlCQUFLbkQsQ0FBQyxHQUFHLENBQUosRUFBT3dDLEdBQUcsR0FBRzNCLEVBQUUsQ0FBQ1IsTUFBckIsRUFBNkJMLENBQUMsR0FBR3dDLEdBQWpDLEVBQXNDeEMsQ0FBQyxFQUF2QyxFQUEyQztBQUN6Q1QsY0FBQUEsQ0FBQyxHQUFHc0IsRUFBRSxDQUFDYixDQUFELENBQU47QUFDQW1ELGNBQUFBLE9BQU8sQ0FBQ0MsSUFBUixDQUFhOUMsR0FBRSxDQUFDMkQsTUFBSCxDQUFVMUUsQ0FBVixFQUFhMkUsUUFBYixDQUFiO0FBQ0Q7O0FBQ0QsbUJBQU9mLE9BQVA7QUFDRCxXQVJNLEVBQVA7QUFTRDs7QUFDRCxlQUFPdEMsRUFBRSxDQUFDc0Qsa0JBQUgsQ0FBc0IsV0FBdEIsRUFBbUNELFFBQW5DLENBQVA7QUFDRCxPQWREOztBQWdCQTVELE1BQUFBLEdBQUUsQ0FBQzhELElBQUgsR0FBVSxVQUFTdkQsRUFBVCxFQUFhSixRQUFiLEVBQXVCO0FBQy9CLFlBQUlJLEVBQUUsWUFBWXdELFFBQWQsSUFBMEJ4RCxFQUFFLFlBQVl5RCxLQUE1QyxFQUFtRDtBQUNqRHpELFVBQUFBLEVBQUUsR0FBR0EsRUFBRSxDQUFDLENBQUQsQ0FBUDtBQUNEOztBQUNELGVBQU9BLEVBQUUsQ0FBQ0QsZ0JBQUgsQ0FBb0JILFFBQXBCLENBQVA7QUFDRCxPQUxEOztBQU9BSCxNQUFBQSxHQUFFLENBQUNpRSxPQUFILEdBQWEsVUFBUzFELEVBQVQsRUFBYTJELElBQWIsRUFBbUJ6QyxJQUFuQixFQUF5QjtBQUNwQyxZQUFJeEMsQ0FBSixFQUFPa0YsS0FBUCxFQUFjQyxFQUFkOztBQUNBLFlBQUk7QUFDRkEsVUFBQUEsRUFBRSxHQUFHLElBQUlDLFdBQUosQ0FBZ0JILElBQWhCLEVBQXNCO0FBQ3pCeEMsWUFBQUEsTUFBTSxFQUFFRDtBQURpQixXQUF0QixDQUFMO0FBR0QsU0FKRCxDQUlFLE9BQU8wQyxLQUFQLEVBQWM7QUFDZGxGLFVBQUFBLENBQUMsR0FBR2tGLEtBQUo7QUFDQUMsVUFBQUEsRUFBRSxHQUFHL0QsUUFBUSxDQUFDaUUsV0FBVCxDQUFxQixhQUFyQixDQUFMOztBQUNBLGNBQUlGLEVBQUUsQ0FBQ0csZUFBUCxFQUF3QjtBQUN0QkgsWUFBQUEsRUFBRSxDQUFDRyxlQUFILENBQW1CTCxJQUFuQixFQUF5QixJQUF6QixFQUErQixJQUEvQixFQUFxQ3pDLElBQXJDO0FBQ0QsV0FGRCxNQUVPO0FBQ0wyQyxZQUFBQSxFQUFFLENBQUNJLFNBQUgsQ0FBYU4sSUFBYixFQUFtQixJQUFuQixFQUF5QixJQUF6QixFQUErQnpDLElBQS9CO0FBQ0Q7QUFDRjs7QUFDRCxlQUFPbEIsRUFBRSxDQUFDa0UsYUFBSCxDQUFpQkwsRUFBakIsQ0FBUDtBQUNELE9BaEJEOztBQWtCQTVGLE1BQUFBLE1BQU0sQ0FBQ0QsT0FBUCxHQUFpQnlCLEdBQWpCO0FBR0MsS0F4T3EwQixFQXdPcDBCLEVBeE9vMEIsQ0FBSDtBQXdPN3pCLE9BQUUsQ0FBQyxVQUFTUCxPQUFULEVBQWlCakIsTUFBakIsRUFBd0JELE9BQXhCLEVBQWdDO0FBQ3pDLE9BQUMsVUFBVU0sTUFBVixFQUFpQjtBQUNsQixZQUFJNkYsT0FBSjtBQUFBLFlBQWExRSxFQUFiO0FBQUEsWUFBaUIyRSxjQUFqQjtBQUFBLFlBQWlDQyxZQUFqQztBQUFBLFlBQStDQyxLQUEvQztBQUFBLFlBQXNEQyxhQUF0RDtBQUFBLFlBQXFFQyxvQkFBckU7QUFBQSxZQUEyRkMsZ0JBQTNGO0FBQUEsWUFBNkdDLGdCQUE3RztBQUFBLFlBQStIQyxZQUEvSDtBQUFBLFlBQTZJQyxtQkFBN0k7QUFBQSxZQUFrS0Msa0JBQWxLO0FBQUEsWUFBc0xDLGlCQUF0TDtBQUFBLFlBQXlNQyxlQUF6TTtBQUFBLFlBQTBOQyxTQUExTjtBQUFBLFlBQXFPQyxrQkFBck87QUFBQSxZQUF5UEMsV0FBelA7QUFBQSxZQUFzUUMsa0JBQXRRO0FBQUEsWUFBMFJDLHNCQUExUjtBQUFBLFlBQWtUQyxjQUFsVDtBQUFBLFlBQWtVQyxtQkFBbFU7QUFBQSxZQUF1VkMsZUFBdlY7QUFBQSxZQUF3V0Msa0JBQXhXO0FBQUEsWUFBNFhDLFdBQTVYO0FBQUEsWUFDRUMsT0FBTyxHQUFHLEdBQUdBLE9BQUgsSUFBYyxVQUFTQyxJQUFULEVBQWU7QUFBRSxlQUFLLElBQUl4RyxDQUFDLEdBQUcsQ0FBUixFQUFXRyxDQUFDLEdBQUcsS0FBS0UsTUFBekIsRUFBaUNMLENBQUMsR0FBR0csQ0FBckMsRUFBd0NILENBQUMsRUFBekMsRUFBNkM7QUFBRSxnQkFBSUEsQ0FBQyxJQUFJLElBQUwsSUFBYSxLQUFLQSxDQUFMLE1BQVl3RyxJQUE3QixFQUFtQyxPQUFPeEcsQ0FBUDtBQUFXOztBQUFDLGlCQUFPLENBQUMsQ0FBUjtBQUFZLFNBRHJKOztBQUdBTSxRQUFBQSxFQUFFLEdBQUdQLE9BQU8sQ0FBQyxrQkFBRCxDQUFaO0FBRUFxRixRQUFBQSxhQUFhLEdBQUcsWUFBaEI7QUFFQUQsUUFBQUEsS0FBSyxHQUFHLENBQ047QUFDRXNCLFVBQUFBLElBQUksRUFBRSxNQURSO0FBRUVDLFVBQUFBLE9BQU8sRUFBRSxRQUZYO0FBR0VDLFVBQUFBLE1BQU0sRUFBRSwrQkFIVjtBQUlFdEcsVUFBQUEsTUFBTSxFQUFFLENBQUMsRUFBRCxDQUpWO0FBS0V1RyxVQUFBQSxTQUFTLEVBQUUsQ0FBQyxDQUFELENBTGI7QUFNRUMsVUFBQUEsSUFBSSxFQUFFO0FBTlIsU0FETSxFQVFIO0FBQ0RKLFVBQUFBLElBQUksRUFBRSxTQURMO0FBRURDLFVBQUFBLE9BQU8sRUFBRSxPQUZSO0FBR0RDLFVBQUFBLE1BQU0sRUFBRXZCLGFBSFA7QUFJRC9FLFVBQUFBLE1BQU0sRUFBRSxDQUFDLEVBQUQsQ0FKUDtBQUtEdUcsVUFBQUEsU0FBUyxFQUFFLENBQUMsQ0FBRCxDQUxWO0FBTURDLFVBQUFBLElBQUksRUFBRTtBQU5MLFNBUkcsRUFlSDtBQUNESixVQUFBQSxJQUFJLEVBQUUsWUFETDtBQUVEQyxVQUFBQSxPQUFPLEVBQUUsa0JBRlI7QUFHREMsVUFBQUEsTUFBTSxFQUFFdkIsYUFIUDtBQUlEL0UsVUFBQUEsTUFBTSxFQUFFLENBQUMsRUFBRCxDQUpQO0FBS0R1RyxVQUFBQSxTQUFTLEVBQUUsQ0FBQyxDQUFELENBTFY7QUFNREMsVUFBQUEsSUFBSSxFQUFFO0FBTkwsU0FmRyxFQXNCSDtBQUNESixVQUFBQSxJQUFJLEVBQUUsVUFETDtBQUVEQyxVQUFBQSxPQUFPLEVBQUUsd0JBRlI7QUFHREMsVUFBQUEsTUFBTSxFQUFFdkIsYUFIUDtBQUlEL0UsVUFBQUEsTUFBTSxFQUFFLENBQUMsRUFBRCxDQUpQO0FBS0R1RyxVQUFBQSxTQUFTLEVBQUUsQ0FBQyxDQUFELENBTFY7QUFNREMsVUFBQUEsSUFBSSxFQUFFO0FBTkwsU0F0QkcsRUE2Qkg7QUFDREosVUFBQUEsSUFBSSxFQUFFLEtBREw7QUFFREMsVUFBQUEsT0FBTyxFQUFFLEtBRlI7QUFHREMsVUFBQUEsTUFBTSxFQUFFdkIsYUFIUDtBQUlEL0UsVUFBQUEsTUFBTSxFQUFFLENBQUMsRUFBRCxDQUpQO0FBS0R1RyxVQUFBQSxTQUFTLEVBQUUsQ0FBQyxDQUFELENBTFY7QUFNREMsVUFBQUEsSUFBSSxFQUFFO0FBTkwsU0E3QkcsRUFvQ0g7QUFDREosVUFBQUEsSUFBSSxFQUFFLE9BREw7QUFFREMsVUFBQUEsT0FBTyxFQUFFLG1CQUZSO0FBR0RDLFVBQUFBLE1BQU0sRUFBRXZCLGFBSFA7QUFJRC9FLFVBQUFBLE1BQU0sRUFBRSxDQUFDLEVBQUQsRUFBSyxFQUFMLEVBQVMsRUFBVCxFQUFhLEVBQWIsQ0FKUDtBQUtEdUcsVUFBQUEsU0FBUyxFQUFFLENBQUMsQ0FBRCxDQUxWO0FBTURDLFVBQUFBLElBQUksRUFBRTtBQU5MLFNBcENHLEVBMkNIO0FBQ0RKLFVBQUFBLElBQUksRUFBRSxTQURMO0FBRURDLFVBQUFBLE9BQU8sRUFBRSwyQ0FGUjtBQUdEQyxVQUFBQSxNQUFNLEVBQUV2QixhQUhQO0FBSUQvRSxVQUFBQSxNQUFNLEVBQUUsQ0FBQyxFQUFELEVBQUssRUFBTCxFQUFTLEVBQVQsRUFBYSxFQUFiLEVBQWlCLEVBQWpCLEVBQXFCLEVBQXJCLEVBQXlCLEVBQXpCLEVBQTZCLEVBQTdCLENBSlA7QUFLRHVHLFVBQUFBLFNBQVMsRUFBRSxDQUFDLENBQUQsQ0FMVjtBQU1EQyxVQUFBQSxJQUFJLEVBQUU7QUFOTCxTQTNDRyxFQWtESDtBQUNESixVQUFBQSxJQUFJLEVBQUUsWUFETDtBQUVEQyxVQUFBQSxPQUFPLEVBQUUsU0FGUjtBQUdEQyxVQUFBQSxNQUFNLEVBQUV2QixhQUhQO0FBSUQvRSxVQUFBQSxNQUFNLEVBQUUsQ0FBQyxFQUFELENBSlA7QUFLRHVHLFVBQUFBLFNBQVMsRUFBRSxDQUFDLENBQUQsQ0FMVjtBQU1EQyxVQUFBQSxJQUFJLEVBQUU7QUFOTCxTQWxERyxFQXlESDtBQUNESixVQUFBQSxJQUFJLEVBQUUsVUFETDtBQUVEQyxVQUFBQSxPQUFPLEVBQUUsS0FGUjtBQUdEQyxVQUFBQSxNQUFNLEVBQUV2QixhQUhQO0FBSUQvRSxVQUFBQSxNQUFNLEVBQUUsQ0FBQyxFQUFELEVBQUssRUFBTCxFQUFTLEVBQVQsRUFBYSxFQUFiLENBSlA7QUFLRHVHLFVBQUFBLFNBQVMsRUFBRSxDQUFDLENBQUQsQ0FMVjtBQU1EQyxVQUFBQSxJQUFJLEVBQUU7QUFOTCxTQXpERyxFQWdFSDtBQUNESixVQUFBQSxJQUFJLEVBQUUsY0FETDtBQUVEQyxVQUFBQSxPQUFPLEVBQUUsa0NBRlI7QUFHREMsVUFBQUEsTUFBTSxFQUFFdkIsYUFIUDtBQUlEL0UsVUFBQUEsTUFBTSxFQUFFLENBQUMsRUFBRCxDQUpQO0FBS0R1RyxVQUFBQSxTQUFTLEVBQUUsQ0FBQyxDQUFELENBTFY7QUFNREMsVUFBQUEsSUFBSSxFQUFFO0FBTkwsU0FoRUcsRUF1RUg7QUFDREosVUFBQUEsSUFBSSxFQUFFLE1BREw7QUFFREMsVUFBQUEsT0FBTyxFQUFFLElBRlI7QUFHREMsVUFBQUEsTUFBTSxFQUFFdkIsYUFIUDtBQUlEL0UsVUFBQUEsTUFBTSxFQUFFLENBQUMsRUFBRCxFQUFLLEVBQUwsQ0FKUDtBQUtEdUcsVUFBQUEsU0FBUyxFQUFFLENBQUMsQ0FBRCxDQUxWO0FBTURDLFVBQUFBLElBQUksRUFBRTtBQU5MLFNBdkVHLEVBOEVIO0FBQ0RKLFVBQUFBLElBQUksRUFBRSxLQURMO0FBRURDLFVBQUFBLE9BQU8sRUFBRSxpRUFGUjtBQUdEQyxVQUFBQSxNQUFNLEVBQUV2QixhQUhQO0FBSUQvRSxVQUFBQSxNQUFNLEVBQUUsQ0FBQyxFQUFELENBSlA7QUFLRHVHLFVBQUFBLFNBQVMsRUFBRSxDQUFDLENBQUQsQ0FMVjtBQU1EQyxVQUFBQSxJQUFJLEVBQUU7QUFOTCxTQTlFRyxDQUFSOztBQXdGQTVCLFFBQUFBLGNBQWMsR0FBRyx3QkFBUzZCLEdBQVQsRUFBYztBQUM3QixjQUFJQyxJQUFKLEVBQVUvRyxDQUFWLEVBQWF3QyxHQUFiO0FBQ0FzRSxVQUFBQSxHQUFHLEdBQUcsQ0FBQ0EsR0FBRyxHQUFHLEVBQVAsRUFBVzdGLE9BQVgsQ0FBbUIsS0FBbkIsRUFBMEIsRUFBMUIsQ0FBTjs7QUFDQSxlQUFLakIsQ0FBQyxHQUFHLENBQUosRUFBT3dDLEdBQUcsR0FBRzJDLEtBQUssQ0FBQzlFLE1BQXhCLEVBQWdDTCxDQUFDLEdBQUd3QyxHQUFwQyxFQUF5Q3hDLENBQUMsRUFBMUMsRUFBOEM7QUFDNUMrRyxZQUFBQSxJQUFJLEdBQUc1QixLQUFLLENBQUNuRixDQUFELENBQVo7O0FBQ0EsZ0JBQUkrRyxJQUFJLENBQUNMLE9BQUwsQ0FBYWhELElBQWIsQ0FBa0JvRCxHQUFsQixDQUFKLEVBQTRCO0FBQzFCLHFCQUFPQyxJQUFQO0FBQ0Q7QUFDRjtBQUNGLFNBVEQ7O0FBV0E3QixRQUFBQSxZQUFZLEdBQUcsc0JBQVN1QixJQUFULEVBQWU7QUFDNUIsY0FBSU0sSUFBSixFQUFVL0csQ0FBVixFQUFhd0MsR0FBYjs7QUFDQSxlQUFLeEMsQ0FBQyxHQUFHLENBQUosRUFBT3dDLEdBQUcsR0FBRzJDLEtBQUssQ0FBQzlFLE1BQXhCLEVBQWdDTCxDQUFDLEdBQUd3QyxHQUFwQyxFQUF5Q3hDLENBQUMsRUFBMUMsRUFBOEM7QUFDNUMrRyxZQUFBQSxJQUFJLEdBQUc1QixLQUFLLENBQUNuRixDQUFELENBQVo7O0FBQ0EsZ0JBQUkrRyxJQUFJLENBQUNOLElBQUwsS0FBY0EsSUFBbEIsRUFBd0I7QUFDdEIscUJBQU9NLElBQVA7QUFDRDtBQUNGO0FBQ0YsU0FSRDs7QUFVQWxCLFFBQUFBLFNBQVMsR0FBRyxtQkFBU2lCLEdBQVQsRUFBYztBQUN4QixjQUFJRSxLQUFKLEVBQVdDLE1BQVgsRUFBbUJqSCxDQUFuQixFQUFzQndDLEdBQXRCLEVBQTJCMEUsR0FBM0IsRUFBZ0NDLEdBQWhDO0FBQ0FELFVBQUFBLEdBQUcsR0FBRyxJQUFOO0FBQ0FDLFVBQUFBLEdBQUcsR0FBRyxDQUFOO0FBQ0FGLFVBQUFBLE1BQU0sR0FBRyxDQUFDSCxHQUFHLEdBQUcsRUFBUCxFQUFXaEUsS0FBWCxDQUFpQixFQUFqQixFQUFxQnNFLE9BQXJCLEVBQVQ7O0FBQ0EsZUFBS3BILENBQUMsR0FBRyxDQUFKLEVBQU93QyxHQUFHLEdBQUd5RSxNQUFNLENBQUM1RyxNQUF6QixFQUFpQ0wsQ0FBQyxHQUFHd0MsR0FBckMsRUFBMEN4QyxDQUFDLEVBQTNDLEVBQStDO0FBQzdDZ0gsWUFBQUEsS0FBSyxHQUFHQyxNQUFNLENBQUNqSCxDQUFELENBQWQ7QUFDQWdILFlBQUFBLEtBQUssR0FBR0ssUUFBUSxDQUFDTCxLQUFELEVBQVEsRUFBUixDQUFoQjs7QUFDQSxnQkFBS0UsR0FBRyxHQUFHLENBQUNBLEdBQVosRUFBa0I7QUFDaEJGLGNBQUFBLEtBQUssSUFBSSxDQUFUO0FBQ0Q7O0FBQ0QsZ0JBQUlBLEtBQUssR0FBRyxDQUFaLEVBQWU7QUFDYkEsY0FBQUEsS0FBSyxJQUFJLENBQVQ7QUFDRDs7QUFDREcsWUFBQUEsR0FBRyxJQUFJSCxLQUFQO0FBQ0Q7O0FBQ0QsaUJBQU9HLEdBQUcsR0FBRyxFQUFOLEtBQWEsQ0FBcEI7QUFDRCxTQWpCRDs7QUFtQkF2QixRQUFBQSxlQUFlLEdBQUcseUJBQVNoRSxNQUFULEVBQWlCO0FBQ2pDLGNBQUlnQixHQUFKOztBQUNBLGNBQUtoQixNQUFNLENBQUMwRixjQUFQLElBQXlCLElBQTFCLElBQW1DMUYsTUFBTSxDQUFDMEYsY0FBUCxLQUEwQjFGLE1BQU0sQ0FBQzJGLFlBQXhFLEVBQXNGO0FBQ3BGLG1CQUFPLElBQVA7QUFDRDs7QUFDRCxjQUFJLENBQUMsT0FBTzVHLFFBQVAsS0FBb0IsV0FBcEIsSUFBbUNBLFFBQVEsS0FBSyxJQUFoRCxHQUF1RCxDQUFDaUMsR0FBRyxHQUFHakMsUUFBUSxDQUFDNkcsU0FBaEIsS0FBOEIsSUFBOUIsR0FBcUM1RSxHQUFHLENBQUM2RSxXQUF6QyxHQUF1RCxLQUFLLENBQW5ILEdBQXVILEtBQUssQ0FBN0gsS0FBbUksSUFBdkksRUFBNkk7QUFDM0ksZ0JBQUk5RyxRQUFRLENBQUM2RyxTQUFULENBQW1CQyxXQUFuQixHQUFpQ3pHLElBQXJDLEVBQTJDO0FBQ3pDLHFCQUFPLElBQVA7QUFDRDtBQUNGOztBQUNELGlCQUFPLEtBQVA7QUFDRCxTQVhEOztBQWFBOEUsUUFBQUEsa0JBQWtCLEdBQUcsNEJBQVN2RyxDQUFULEVBQVk7QUFDL0IsaUJBQU9tSSxVQUFVLENBQUUsVUFBU0MsS0FBVCxFQUFnQjtBQUNqQyxtQkFBTyxZQUFXO0FBQ2hCLGtCQUFJL0YsTUFBSixFQUFZUCxLQUFaO0FBQ0FPLGNBQUFBLE1BQU0sR0FBR3JDLENBQUMsQ0FBQ3FDLE1BQVg7QUFDQVAsY0FBQUEsS0FBSyxHQUFHZixFQUFFLENBQUNZLEdBQUgsQ0FBT1UsTUFBUCxDQUFSO0FBQ0FQLGNBQUFBLEtBQUssR0FBRzJELE9BQU8sQ0FBQzRDLEdBQVIsQ0FBWXJDLGdCQUFaLENBQTZCbEUsS0FBN0IsQ0FBUjtBQUNBLHFCQUFPZixFQUFFLENBQUNZLEdBQUgsQ0FBT1UsTUFBUCxFQUFlUCxLQUFmLENBQVA7QUFDRCxhQU5EO0FBT0QsV0FSaUIsQ0FRZixJQVJlLENBQUQsQ0FBakI7QUFTRCxTQVZEOztBQVlBa0UsUUFBQUEsZ0JBQWdCLEdBQUcsMEJBQVNoRyxDQUFULEVBQVk7QUFDN0IsY0FBSXdILElBQUosRUFBVUMsS0FBVixFQUFpQjNHLE1BQWpCLEVBQXlCd0gsRUFBekIsRUFBNkJqRyxNQUE3QixFQUFxQ2tHLFdBQXJDLEVBQWtEekcsS0FBbEQ7QUFDQTJGLFVBQUFBLEtBQUssR0FBR2UsTUFBTSxDQUFDQyxZQUFQLENBQW9CekksQ0FBQyxDQUFDb0MsS0FBdEIsQ0FBUjs7QUFDQSxjQUFJLENBQUMsUUFBUStCLElBQVIsQ0FBYXNELEtBQWIsQ0FBTCxFQUEwQjtBQUN4QjtBQUNEOztBQUNEcEYsVUFBQUEsTUFBTSxHQUFHckMsQ0FBQyxDQUFDcUMsTUFBWDtBQUNBUCxVQUFBQSxLQUFLLEdBQUdmLEVBQUUsQ0FBQ1ksR0FBSCxDQUFPVSxNQUFQLENBQVI7QUFDQW1GLFVBQUFBLElBQUksR0FBRzlCLGNBQWMsQ0FBQzVELEtBQUssR0FBRzJGLEtBQVQsQ0FBckI7QUFDQTNHLFVBQUFBLE1BQU0sR0FBRyxDQUFDZ0IsS0FBSyxDQUFDSixPQUFOLENBQWMsS0FBZCxFQUFxQixFQUFyQixJQUEyQitGLEtBQTVCLEVBQW1DM0csTUFBNUM7QUFDQXlILFVBQUFBLFdBQVcsR0FBRyxFQUFkOztBQUNBLGNBQUlmLElBQUosRUFBVTtBQUNSZSxZQUFBQSxXQUFXLEdBQUdmLElBQUksQ0FBQzFHLE1BQUwsQ0FBWTBHLElBQUksQ0FBQzFHLE1BQUwsQ0FBWUEsTUFBWixHQUFxQixDQUFqQyxDQUFkO0FBQ0Q7O0FBQ0QsY0FBSUEsTUFBTSxJQUFJeUgsV0FBZCxFQUEyQjtBQUN6QjtBQUNEOztBQUNELGNBQUtsRyxNQUFNLENBQUMwRixjQUFQLElBQXlCLElBQTFCLElBQW1DMUYsTUFBTSxDQUFDMEYsY0FBUCxLQUEwQmpHLEtBQUssQ0FBQ2hCLE1BQXZFLEVBQStFO0FBQzdFO0FBQ0Q7O0FBQ0QsY0FBSTBHLElBQUksSUFBSUEsSUFBSSxDQUFDTixJQUFMLEtBQWMsTUFBMUIsRUFBa0M7QUFDaENvQixZQUFBQSxFQUFFLEdBQUcsd0JBQUw7QUFDRCxXQUZELE1BRU87QUFDTEEsWUFBQUEsRUFBRSxHQUFHLGtCQUFMO0FBQ0Q7O0FBQ0QsY0FBSUEsRUFBRSxDQUFDbkUsSUFBSCxDQUFRckMsS0FBUixDQUFKLEVBQW9CO0FBQ2xCOUIsWUFBQUEsQ0FBQyxDQUFDK0IsY0FBRjtBQUNBLG1CQUFPaEIsRUFBRSxDQUFDWSxHQUFILENBQU9VLE1BQVAsRUFBZVAsS0FBSyxHQUFHLEdBQVIsR0FBYzJGLEtBQTdCLENBQVA7QUFDRCxXQUhELE1BR08sSUFBSWEsRUFBRSxDQUFDbkUsSUFBSCxDQUFRckMsS0FBSyxHQUFHMkYsS0FBaEIsQ0FBSixFQUE0QjtBQUNqQ3pILFlBQUFBLENBQUMsQ0FBQytCLGNBQUY7QUFDQSxtQkFBT2hCLEVBQUUsQ0FBQ1ksR0FBSCxDQUFPVSxNQUFQLEVBQWVQLEtBQUssR0FBRzJGLEtBQVIsR0FBZ0IsR0FBL0IsQ0FBUDtBQUNEO0FBQ0YsU0FoQ0Q7O0FBa0NBM0IsUUFBQUEsb0JBQW9CLEdBQUcsOEJBQVM5RixDQUFULEVBQVk7QUFDakMsY0FBSXFDLE1BQUosRUFBWVAsS0FBWjtBQUNBTyxVQUFBQSxNQUFNLEdBQUdyQyxDQUFDLENBQUNxQyxNQUFYO0FBQ0FQLFVBQUFBLEtBQUssR0FBR2YsRUFBRSxDQUFDWSxHQUFILENBQU9VLE1BQVAsQ0FBUjs7QUFDQSxjQUFJckMsQ0FBQyxDQUFDMEksSUFBTixFQUFZO0FBQ1Y7QUFDRDs7QUFDRCxjQUFJMUksQ0FBQyxDQUFDb0MsS0FBRixLQUFZLENBQWhCLEVBQW1CO0FBQ2pCO0FBQ0Q7O0FBQ0QsY0FBS0MsTUFBTSxDQUFDMEYsY0FBUCxJQUF5QixJQUExQixJQUFtQzFGLE1BQU0sQ0FBQzBGLGNBQVAsS0FBMEJqRyxLQUFLLENBQUNoQixNQUF2RSxFQUErRTtBQUM3RTtBQUNEOztBQUNELGNBQUksUUFBUXFELElBQVIsQ0FBYXJDLEtBQWIsQ0FBSixFQUF5QjtBQUN2QjlCLFlBQUFBLENBQUMsQ0FBQytCLGNBQUY7QUFDQSxtQkFBT2hCLEVBQUUsQ0FBQ1ksR0FBSCxDQUFPVSxNQUFQLEVBQWVQLEtBQUssQ0FBQ0osT0FBTixDQUFjLE9BQWQsRUFBdUIsRUFBdkIsQ0FBZixDQUFQO0FBQ0QsV0FIRCxNQUdPLElBQUksU0FBU3lDLElBQVQsQ0FBY3JDLEtBQWQsQ0FBSixFQUEwQjtBQUMvQjlCLFlBQUFBLENBQUMsQ0FBQytCLGNBQUY7QUFDQSxtQkFBT2hCLEVBQUUsQ0FBQ1ksR0FBSCxDQUFPVSxNQUFQLEVBQWVQLEtBQUssQ0FBQ0osT0FBTixDQUFjLFFBQWQsRUFBd0IsRUFBeEIsQ0FBZixDQUFQO0FBQ0Q7QUFDRixTQXBCRDs7QUFzQkF1RSxRQUFBQSxZQUFZLEdBQUcsc0JBQVNqRyxDQUFULEVBQVk7QUFDekIsY0FBSXlILEtBQUosRUFBV3BGLE1BQVgsRUFBbUJWLEdBQW5CO0FBQ0E4RixVQUFBQSxLQUFLLEdBQUdlLE1BQU0sQ0FBQ0MsWUFBUCxDQUFvQnpJLENBQUMsQ0FBQ29DLEtBQXRCLENBQVI7O0FBQ0EsY0FBSSxDQUFDLFFBQVErQixJQUFSLENBQWFzRCxLQUFiLENBQUwsRUFBMEI7QUFDeEI7QUFDRDs7QUFDRHBGLFVBQUFBLE1BQU0sR0FBR3JDLENBQUMsQ0FBQ3FDLE1BQVg7QUFDQVYsVUFBQUEsR0FBRyxHQUFHWixFQUFFLENBQUNZLEdBQUgsQ0FBT1UsTUFBUCxJQUFpQm9GLEtBQXZCOztBQUNBLGNBQUksT0FBT3RELElBQVAsQ0FBWXhDLEdBQVosS0FBcUJBLEdBQUcsS0FBSyxHQUFSLElBQWVBLEdBQUcsS0FBSyxHQUFoRCxFQUFzRDtBQUNwRDNCLFlBQUFBLENBQUMsQ0FBQytCLGNBQUY7QUFDQSxtQkFBT2hCLEVBQUUsQ0FBQ1ksR0FBSCxDQUFPVSxNQUFQLEVBQWUsTUFBTVYsR0FBTixHQUFZLEtBQTNCLENBQVA7QUFDRCxXQUhELE1BR08sSUFBSSxTQUFTd0MsSUFBVCxDQUFjeEMsR0FBZCxDQUFKLEVBQXdCO0FBQzdCM0IsWUFBQUEsQ0FBQyxDQUFDK0IsY0FBRjtBQUNBLG1CQUFPaEIsRUFBRSxDQUFDWSxHQUFILENBQU9VLE1BQVAsRUFBZVYsR0FBRyxHQUFHLEtBQXJCLENBQVA7QUFDRDtBQUNGLFNBZkQ7O0FBaUJBeUUsUUFBQUEsaUJBQWlCLEdBQUcsMkJBQVNwRyxDQUFULEVBQVk7QUFDOUIsY0FBSXlILEtBQUosRUFBV3BGLE1BQVgsRUFBbUJWLEdBQW5CO0FBQ0E4RixVQUFBQSxLQUFLLEdBQUdlLE1BQU0sQ0FBQ0MsWUFBUCxDQUFvQnpJLENBQUMsQ0FBQ29DLEtBQXRCLENBQVI7O0FBQ0EsY0FBSSxDQUFDLFFBQVErQixJQUFSLENBQWFzRCxLQUFiLENBQUwsRUFBMEI7QUFDeEI7QUFDRDs7QUFDRHBGLFVBQUFBLE1BQU0sR0FBR3JDLENBQUMsQ0FBQ3FDLE1BQVg7QUFDQVYsVUFBQUEsR0FBRyxHQUFHWixFQUFFLENBQUNZLEdBQUgsQ0FBT1UsTUFBUCxJQUFpQm9GLEtBQXZCOztBQUNBLGNBQUksT0FBT3RELElBQVAsQ0FBWXhDLEdBQVosS0FBcUJBLEdBQUcsS0FBSyxHQUFSLElBQWVBLEdBQUcsS0FBSyxHQUFoRCxFQUFzRDtBQUNwRDNCLFlBQUFBLENBQUMsQ0FBQytCLGNBQUY7QUFDQSxtQkFBT2hCLEVBQUUsQ0FBQ1ksR0FBSCxDQUFPVSxNQUFQLEVBQWUsTUFBTVYsR0FBckIsQ0FBUDtBQUNELFdBSEQsTUFHTyxJQUFJLFNBQVN3QyxJQUFULENBQWN4QyxHQUFkLENBQUosRUFBd0I7QUFDN0IzQixZQUFBQSxDQUFDLENBQUMrQixjQUFGO0FBQ0EsbUJBQU9oQixFQUFFLENBQUNZLEdBQUgsQ0FBT1UsTUFBUCxFQUFlLEtBQUtWLEdBQXBCLENBQVA7QUFDRDtBQUNGLFNBZkQ7O0FBaUJBdUUsUUFBQUEsbUJBQW1CLEdBQUcsNkJBQVNsRyxDQUFULEVBQVk7QUFDaEMsY0FBSXlILEtBQUosRUFBV3BGLE1BQVgsRUFBbUJWLEdBQW5CO0FBQ0E4RixVQUFBQSxLQUFLLEdBQUdlLE1BQU0sQ0FBQ0MsWUFBUCxDQUFvQnpJLENBQUMsQ0FBQ29DLEtBQXRCLENBQVI7O0FBQ0EsY0FBSSxDQUFDLFFBQVErQixJQUFSLENBQWFzRCxLQUFiLENBQUwsRUFBMEI7QUFDeEI7QUFDRDs7QUFDRHBGLFVBQUFBLE1BQU0sR0FBR3JDLENBQUMsQ0FBQ3FDLE1BQVg7QUFDQVYsVUFBQUEsR0FBRyxHQUFHWixFQUFFLENBQUNZLEdBQUgsQ0FBT1UsTUFBUCxDQUFOOztBQUNBLGNBQUksU0FBUzhCLElBQVQsQ0FBY3hDLEdBQWQsQ0FBSixFQUF3QjtBQUN0QixtQkFBT1osRUFBRSxDQUFDWSxHQUFILENBQU9VLE1BQVAsRUFBZVYsR0FBRyxHQUFHLEtBQXJCLENBQVA7QUFDRDtBQUNGLFNBWEQ7O0FBYUF3RSxRQUFBQSxrQkFBa0IsR0FBRyw0QkFBU25HLENBQVQsRUFBWTtBQUMvQixjQUFJMkksS0FBSixFQUFXdEcsTUFBWCxFQUFtQlYsR0FBbkI7QUFDQWdILFVBQUFBLEtBQUssR0FBR0gsTUFBTSxDQUFDQyxZQUFQLENBQW9CekksQ0FBQyxDQUFDb0MsS0FBdEIsQ0FBUjs7QUFDQSxjQUFJdUcsS0FBSyxLQUFLLEdBQWQsRUFBbUI7QUFDakI7QUFDRDs7QUFDRHRHLFVBQUFBLE1BQU0sR0FBR3JDLENBQUMsQ0FBQ3FDLE1BQVg7QUFDQVYsVUFBQUEsR0FBRyxHQUFHWixFQUFFLENBQUNZLEdBQUgsQ0FBT1UsTUFBUCxDQUFOOztBQUNBLGNBQUksT0FBTzhCLElBQVAsQ0FBWXhDLEdBQVosS0FBb0JBLEdBQUcsS0FBSyxHQUFoQyxFQUFxQztBQUNuQyxtQkFBT1osRUFBRSxDQUFDWSxHQUFILENBQU9VLE1BQVAsRUFBZSxNQUFNVixHQUFOLEdBQVksS0FBM0IsQ0FBUDtBQUNEO0FBQ0YsU0FYRDs7QUFhQW9FLFFBQUFBLGdCQUFnQixHQUFHLDBCQUFTL0YsQ0FBVCxFQUFZO0FBQzdCLGNBQUlxQyxNQUFKLEVBQVlQLEtBQVo7O0FBQ0EsY0FBSTlCLENBQUMsQ0FBQzRJLE9BQU4sRUFBZTtBQUNiO0FBQ0Q7O0FBQ0R2RyxVQUFBQSxNQUFNLEdBQUdyQyxDQUFDLENBQUNxQyxNQUFYO0FBQ0FQLFVBQUFBLEtBQUssR0FBR2YsRUFBRSxDQUFDWSxHQUFILENBQU9VLE1BQVAsQ0FBUjs7QUFDQSxjQUFJckMsQ0FBQyxDQUFDb0MsS0FBRixLQUFZLENBQWhCLEVBQW1CO0FBQ2pCO0FBQ0Q7O0FBQ0QsY0FBS0MsTUFBTSxDQUFDMEYsY0FBUCxJQUF5QixJQUExQixJQUFtQzFGLE1BQU0sQ0FBQzBGLGNBQVAsS0FBMEJqRyxLQUFLLENBQUNoQixNQUF2RSxFQUErRTtBQUM3RTtBQUNEOztBQUNELGNBQUksY0FBY3FELElBQWQsQ0FBbUJyQyxLQUFuQixDQUFKLEVBQStCO0FBQzdCOUIsWUFBQUEsQ0FBQyxDQUFDK0IsY0FBRjtBQUNBLG1CQUFPaEIsRUFBRSxDQUFDWSxHQUFILENBQU9VLE1BQVAsRUFBZVAsS0FBSyxDQUFDSixPQUFOLENBQWMsYUFBZCxFQUE2QixFQUE3QixDQUFmLENBQVA7QUFDRCxXQUhELE1BR08sSUFBSSxjQUFjeUMsSUFBZCxDQUFtQnJDLEtBQW5CLENBQUosRUFBK0I7QUFDcEM5QixZQUFBQSxDQUFDLENBQUMrQixjQUFGO0FBQ0EsbUJBQU9oQixFQUFFLENBQUNZLEdBQUgsQ0FBT1UsTUFBUCxFQUFlUCxLQUFLLENBQUNKLE9BQU4sQ0FBYyxhQUFkLEVBQTZCLEVBQTdCLENBQWYsQ0FBUDtBQUNEO0FBQ0YsU0FwQkQ7O0FBc0JBbUYsUUFBQUEsZUFBZSxHQUFHLHlCQUFTN0csQ0FBVCxFQUFZO0FBQzVCLGNBQUk2SSxLQUFKOztBQUNBLGNBQUk3SSxDQUFDLENBQUM0SSxPQUFGLElBQWE1SSxDQUFDLENBQUM4SSxPQUFuQixFQUE0QjtBQUMxQixtQkFBTyxJQUFQO0FBQ0Q7O0FBQ0QsY0FBSTlJLENBQUMsQ0FBQ29DLEtBQUYsS0FBWSxFQUFoQixFQUFvQjtBQUNsQixtQkFBT3BDLENBQUMsQ0FBQytCLGNBQUYsRUFBUDtBQUNEOztBQUNELGNBQUkvQixDQUFDLENBQUNvQyxLQUFGLEtBQVksQ0FBaEIsRUFBbUI7QUFDakIsbUJBQU8sSUFBUDtBQUNEOztBQUNELGNBQUlwQyxDQUFDLENBQUNvQyxLQUFGLEdBQVUsRUFBZCxFQUFrQjtBQUNoQixtQkFBTyxJQUFQO0FBQ0Q7O0FBQ0R5RyxVQUFBQSxLQUFLLEdBQUdMLE1BQU0sQ0FBQ0MsWUFBUCxDQUFvQnpJLENBQUMsQ0FBQ29DLEtBQXRCLENBQVI7O0FBQ0EsY0FBSSxDQUFDLFNBQVMrQixJQUFULENBQWMwRSxLQUFkLENBQUwsRUFBMkI7QUFDekIsbUJBQU83SSxDQUFDLENBQUMrQixjQUFGLEVBQVA7QUFDRDtBQUNGLFNBbEJEOztBQW9CQTBFLFFBQUFBLGtCQUFrQixHQUFHLDRCQUFTekcsQ0FBVCxFQUFZO0FBQy9CLGNBQUl3SCxJQUFKLEVBQVVDLEtBQVYsRUFBaUJwRixNQUFqQixFQUF5QlAsS0FBekI7QUFDQU8sVUFBQUEsTUFBTSxHQUFHckMsQ0FBQyxDQUFDcUMsTUFBWDtBQUNBb0YsVUFBQUEsS0FBSyxHQUFHZSxNQUFNLENBQUNDLFlBQVAsQ0FBb0J6SSxDQUFDLENBQUNvQyxLQUF0QixDQUFSOztBQUNBLGNBQUksQ0FBQyxRQUFRK0IsSUFBUixDQUFhc0QsS0FBYixDQUFMLEVBQTBCO0FBQ3hCO0FBQ0Q7O0FBQ0QsY0FBSXBCLGVBQWUsQ0FBQ2hFLE1BQUQsQ0FBbkIsRUFBNkI7QUFDM0I7QUFDRDs7QUFDRFAsVUFBQUEsS0FBSyxHQUFHLENBQUNmLEVBQUUsQ0FBQ1ksR0FBSCxDQUFPVSxNQUFQLElBQWlCb0YsS0FBbEIsRUFBeUIvRixPQUF6QixDQUFpQyxLQUFqQyxFQUF3QyxFQUF4QyxDQUFSO0FBQ0E4RixVQUFBQSxJQUFJLEdBQUc5QixjQUFjLENBQUM1RCxLQUFELENBQXJCOztBQUNBLGNBQUkwRixJQUFKLEVBQVU7QUFDUixnQkFBSSxFQUFFMUYsS0FBSyxDQUFDaEIsTUFBTixJQUFnQjBHLElBQUksQ0FBQzFHLE1BQUwsQ0FBWTBHLElBQUksQ0FBQzFHLE1BQUwsQ0FBWUEsTUFBWixHQUFxQixDQUFqQyxDQUFsQixDQUFKLEVBQTREO0FBQzFELHFCQUFPZCxDQUFDLENBQUMrQixjQUFGLEVBQVA7QUFDRDtBQUNGLFdBSkQsTUFJTztBQUNMLGdCQUFJLEVBQUVELEtBQUssQ0FBQ2hCLE1BQU4sSUFBZ0IsRUFBbEIsQ0FBSixFQUEyQjtBQUN6QixxQkFBT2QsQ0FBQyxDQUFDK0IsY0FBRixFQUFQO0FBQ0Q7QUFDRjtBQUNGLFNBckJEOztBQXVCQTRFLFFBQUFBLGNBQWMsR0FBRyx3QkFBUzNHLENBQVQsRUFBWWMsTUFBWixFQUFvQjtBQUNuQyxjQUFJMkcsS0FBSixFQUFXcEYsTUFBWCxFQUFtQlAsS0FBbkI7QUFDQU8sVUFBQUEsTUFBTSxHQUFHckMsQ0FBQyxDQUFDcUMsTUFBWDtBQUNBb0YsVUFBQUEsS0FBSyxHQUFHZSxNQUFNLENBQUNDLFlBQVAsQ0FBb0J6SSxDQUFDLENBQUNvQyxLQUF0QixDQUFSOztBQUNBLGNBQUksQ0FBQyxRQUFRK0IsSUFBUixDQUFhc0QsS0FBYixDQUFMLEVBQTBCO0FBQ3hCO0FBQ0Q7O0FBQ0QsY0FBSXBCLGVBQWUsQ0FBQ2hFLE1BQUQsQ0FBbkIsRUFBNkI7QUFDM0I7QUFDRDs7QUFDRFAsVUFBQUEsS0FBSyxHQUFHZixFQUFFLENBQUNZLEdBQUgsQ0FBT1UsTUFBUCxJQUFpQm9GLEtBQXpCO0FBQ0EzRixVQUFBQSxLQUFLLEdBQUdBLEtBQUssQ0FBQ0osT0FBTixDQUFjLEtBQWQsRUFBcUIsRUFBckIsQ0FBUjs7QUFDQSxjQUFJSSxLQUFLLENBQUNoQixNQUFOLEdBQWVBLE1BQW5CLEVBQTJCO0FBQ3pCLG1CQUFPZCxDQUFDLENBQUMrQixjQUFGLEVBQVA7QUFDRDtBQUNGLFNBZkQ7O0FBaUJBMkUsUUFBQUEsc0JBQXNCLEdBQUcsZ0NBQVMxRyxDQUFULEVBQVk7QUFDbkMsaUJBQU8yRyxjQUFjLENBQUMzRyxDQUFELEVBQUksQ0FBSixDQUFyQjtBQUNELFNBRkQ7O0FBSUE0RyxRQUFBQSxtQkFBbUIsR0FBRyw2QkFBUzVHLENBQVQsRUFBWTtBQUNoQyxpQkFBTzJHLGNBQWMsQ0FBQzNHLENBQUQsRUFBSSxDQUFKLENBQXJCO0FBQ0QsU0FGRDs7QUFJQThHLFFBQUFBLGtCQUFrQixHQUFHLDRCQUFTOUcsQ0FBVCxFQUFZO0FBQy9CLGlCQUFPMkcsY0FBYyxDQUFDM0csQ0FBRCxFQUFJLENBQUosQ0FBckI7QUFDRCxTQUZEOztBQUlBd0csUUFBQUEsV0FBVyxHQUFHLHFCQUFTeEcsQ0FBVCxFQUFZO0FBQ3hCLGNBQUl5SCxLQUFKLEVBQVdwRixNQUFYLEVBQW1CVixHQUFuQjtBQUNBVSxVQUFBQSxNQUFNLEdBQUdyQyxDQUFDLENBQUNxQyxNQUFYO0FBQ0FvRixVQUFBQSxLQUFLLEdBQUdlLE1BQU0sQ0FBQ0MsWUFBUCxDQUFvQnpJLENBQUMsQ0FBQ29DLEtBQXRCLENBQVI7O0FBQ0EsY0FBSSxDQUFDLFFBQVErQixJQUFSLENBQWFzRCxLQUFiLENBQUwsRUFBMEI7QUFDeEI7QUFDRDs7QUFDRCxjQUFJcEIsZUFBZSxDQUFDaEUsTUFBRCxDQUFuQixFQUE2QjtBQUMzQjtBQUNEOztBQUNEVixVQUFBQSxHQUFHLEdBQUdaLEVBQUUsQ0FBQ1ksR0FBSCxDQUFPVSxNQUFQLElBQWlCb0YsS0FBdkI7O0FBQ0EsY0FBSSxFQUFFOUYsR0FBRyxDQUFDYixNQUFKLElBQWMsQ0FBaEIsQ0FBSixFQUF3QjtBQUN0QixtQkFBT2QsQ0FBQyxDQUFDK0IsY0FBRixFQUFQO0FBQ0Q7QUFDRixTQWREOztBQWdCQWdGLFFBQUFBLFdBQVcsR0FBRyxxQkFBUy9HLENBQVQsRUFBWTtBQUN4QixjQUFJK0ksUUFBSixFQUFjdkIsSUFBZCxFQUFvQndCLFFBQXBCLEVBQThCM0csTUFBOUIsRUFBc0NWLEdBQXRDO0FBQ0FVLFVBQUFBLE1BQU0sR0FBR3JDLENBQUMsQ0FBQ3FDLE1BQVg7QUFDQVYsVUFBQUEsR0FBRyxHQUFHWixFQUFFLENBQUNZLEdBQUgsQ0FBT1UsTUFBUCxDQUFOO0FBQ0EyRyxVQUFBQSxRQUFRLEdBQUd2RCxPQUFPLENBQUM0QyxHQUFSLENBQVlXLFFBQVosQ0FBcUJySCxHQUFyQixLQUE2QixTQUF4Qzs7QUFDQSxjQUFJLENBQUNaLEVBQUUsQ0FBQ2lELFFBQUgsQ0FBWTNCLE1BQVosRUFBb0IyRyxRQUFwQixDQUFMLEVBQW9DO0FBQ2xDRCxZQUFBQSxRQUFRLEdBQUksWUFBVztBQUNyQixrQkFBSXRJLENBQUosRUFBT3dDLEdBQVAsRUFBWVcsT0FBWjtBQUNBQSxjQUFBQSxPQUFPLEdBQUcsRUFBVjs7QUFDQSxtQkFBS25ELENBQUMsR0FBRyxDQUFKLEVBQU93QyxHQUFHLEdBQUcyQyxLQUFLLENBQUM5RSxNQUF4QixFQUFnQ0wsQ0FBQyxHQUFHd0MsR0FBcEMsRUFBeUN4QyxDQUFDLEVBQTFDLEVBQThDO0FBQzVDK0csZ0JBQUFBLElBQUksR0FBRzVCLEtBQUssQ0FBQ25GLENBQUQsQ0FBWjtBQUNBbUQsZ0JBQUFBLE9BQU8sQ0FBQ0MsSUFBUixDQUFhMkQsSUFBSSxDQUFDTixJQUFsQjtBQUNEOztBQUNELHFCQUFPdEQsT0FBUDtBQUNELGFBUlUsRUFBWDs7QUFTQTdDLFlBQUFBLEVBQUUsQ0FBQ3FELFdBQUgsQ0FBZS9CLE1BQWYsRUFBdUIsU0FBdkI7QUFDQXRCLFlBQUFBLEVBQUUsQ0FBQ3FELFdBQUgsQ0FBZS9CLE1BQWYsRUFBdUIwRyxRQUFRLENBQUN4RSxJQUFULENBQWMsR0FBZCxDQUF2QjtBQUNBeEQsWUFBQUEsRUFBRSxDQUFDMkMsUUFBSCxDQUFZckIsTUFBWixFQUFvQjJHLFFBQXBCO0FBQ0FqSSxZQUFBQSxFQUFFLENBQUN5RCxXQUFILENBQWVuQyxNQUFmLEVBQXVCLFlBQXZCLEVBQXFDMkcsUUFBUSxLQUFLLFNBQWxEO0FBQ0EsbUJBQU9qSSxFQUFFLENBQUNpRSxPQUFILENBQVczQyxNQUFYLEVBQW1CLGtCQUFuQixFQUF1QzJHLFFBQXZDLENBQVA7QUFDRDtBQUNGLFNBckJEOztBQXVCQXZELFFBQUFBLE9BQU8sR0FBSSxZQUFXO0FBQ3BCLG1CQUFTQSxPQUFULEdBQW1CLENBQUU7O0FBRXJCQSxVQUFBQSxPQUFPLENBQUM0QyxHQUFSLEdBQWM7QUFDWlksWUFBQUEsYUFBYSxFQUFFLHVCQUFTbkgsS0FBVCxFQUFnQjtBQUM3QixrQkFBSW9ILEtBQUosRUFBV0MsTUFBWCxFQUFtQjlGLEdBQW5CLEVBQXdCK0YsSUFBeEI7QUFDQXRILGNBQUFBLEtBQUssR0FBR0EsS0FBSyxDQUFDSixPQUFOLENBQWMsS0FBZCxFQUFxQixFQUFyQixDQUFSO0FBQ0EyQixjQUFBQSxHQUFHLEdBQUd2QixLQUFLLENBQUN5QixLQUFOLENBQVksR0FBWixFQUFpQixDQUFqQixDQUFOLEVBQTJCMkYsS0FBSyxHQUFHN0YsR0FBRyxDQUFDLENBQUQsQ0FBdEMsRUFBMkMrRixJQUFJLEdBQUcvRixHQUFHLENBQUMsQ0FBRCxDQUFyRDs7QUFDQSxrQkFBSSxDQUFDK0YsSUFBSSxJQUFJLElBQVIsR0FBZUEsSUFBSSxDQUFDdEksTUFBcEIsR0FBNkIsS0FBSyxDQUFuQyxNQUEwQyxDQUExQyxJQUErQyxRQUFRcUQsSUFBUixDQUFhaUYsSUFBYixDQUFuRCxFQUF1RTtBQUNyRUQsZ0JBQUFBLE1BQU0sR0FBSSxJQUFJRSxJQUFKLEVBQUQsQ0FBV0MsV0FBWCxFQUFUO0FBQ0FILGdCQUFBQSxNQUFNLEdBQUdBLE1BQU0sQ0FBQ0ksUUFBUCxHQUFrQkMsS0FBbEIsQ0FBd0IsQ0FBeEIsRUFBMkIsQ0FBM0IsQ0FBVDtBQUNBSixnQkFBQUEsSUFBSSxHQUFHRCxNQUFNLEdBQUdDLElBQWhCO0FBQ0Q7O0FBQ0RGLGNBQUFBLEtBQUssR0FBR3BCLFFBQVEsQ0FBQ29CLEtBQUQsRUFBUSxFQUFSLENBQWhCO0FBQ0FFLGNBQUFBLElBQUksR0FBR3RCLFFBQVEsQ0FBQ3NCLElBQUQsRUFBTyxFQUFQLENBQWY7QUFDQSxxQkFBTztBQUNMRixnQkFBQUEsS0FBSyxFQUFFQSxLQURGO0FBRUxFLGdCQUFBQSxJQUFJLEVBQUVBO0FBRkQsZUFBUDtBQUlELGFBaEJXO0FBaUJaSyxZQUFBQSxrQkFBa0IsRUFBRSw0QkFBU2xDLEdBQVQsRUFBYztBQUNoQyxrQkFBSUMsSUFBSixFQUFVbkUsR0FBVjtBQUNBa0UsY0FBQUEsR0FBRyxHQUFHLENBQUNBLEdBQUcsR0FBRyxFQUFQLEVBQVc3RixPQUFYLENBQW1CLFFBQW5CLEVBQTZCLEVBQTdCLENBQU47O0FBQ0Esa0JBQUksQ0FBQyxRQUFReUMsSUFBUixDQUFhb0QsR0FBYixDQUFMLEVBQXdCO0FBQ3RCLHVCQUFPLEtBQVA7QUFDRDs7QUFDREMsY0FBQUEsSUFBSSxHQUFHOUIsY0FBYyxDQUFDNkIsR0FBRCxDQUFyQjs7QUFDQSxrQkFBSSxDQUFDQyxJQUFMLEVBQVc7QUFDVCx1QkFBTyxLQUFQO0FBQ0Q7O0FBQ0QscUJBQU8sQ0FBQ25FLEdBQUcsR0FBR2tFLEdBQUcsQ0FBQ3pHLE1BQVYsRUFBa0JrRyxPQUFPLENBQUNuRyxJQUFSLENBQWEyRyxJQUFJLENBQUMxRyxNQUFsQixFQUEwQnVDLEdBQTFCLEtBQWtDLENBQXJELE1BQTREbUUsSUFBSSxDQUFDRixJQUFMLEtBQWMsS0FBZCxJQUF1QmhCLFNBQVMsQ0FBQ2lCLEdBQUQsQ0FBNUYsQ0FBUDtBQUNELGFBNUJXO0FBNkJabUMsWUFBQUEsa0JBQWtCLEVBQUUsNEJBQVNSLEtBQVQsRUFBZ0JFLElBQWhCLEVBQXNCO0FBQ3hDLGtCQUFJTyxXQUFKLEVBQWlCQyxNQUFqQixFQUF5QlQsTUFBekIsRUFBaUM5RixHQUFqQzs7QUFDQSxrQkFBSSxRQUFPNkYsS0FBUCxNQUFpQixRQUFqQixJQUE2QixXQUFXQSxLQUE1QyxFQUFtRDtBQUNqRDdGLGdCQUFBQSxHQUFHLEdBQUc2RixLQUFOLEVBQWFBLEtBQUssR0FBRzdGLEdBQUcsQ0FBQzZGLEtBQXpCLEVBQWdDRSxJQUFJLEdBQUcvRixHQUFHLENBQUMrRixJQUEzQztBQUNEOztBQUNELGtCQUFJLEVBQUVGLEtBQUssSUFBSUUsSUFBWCxDQUFKLEVBQXNCO0FBQ3BCLHVCQUFPLEtBQVA7QUFDRDs7QUFDREYsY0FBQUEsS0FBSyxHQUFHbkksRUFBRSxDQUFDUyxJQUFILENBQVEwSCxLQUFSLENBQVI7QUFDQUUsY0FBQUEsSUFBSSxHQUFHckksRUFBRSxDQUFDUyxJQUFILENBQVE0SCxJQUFSLENBQVA7O0FBQ0Esa0JBQUksQ0FBQyxRQUFRakYsSUFBUixDQUFhK0UsS0FBYixDQUFMLEVBQTBCO0FBQ3hCLHVCQUFPLEtBQVA7QUFDRDs7QUFDRCxrQkFBSSxDQUFDLFFBQVEvRSxJQUFSLENBQWFpRixJQUFiLENBQUwsRUFBeUI7QUFDdkIsdUJBQU8sS0FBUDtBQUNEOztBQUNELGtCQUFJLEVBQUV0QixRQUFRLENBQUNvQixLQUFELEVBQVEsRUFBUixDQUFSLElBQXVCLEVBQXpCLENBQUosRUFBa0M7QUFDaEMsdUJBQU8sS0FBUDtBQUNEOztBQUNELGtCQUFJRSxJQUFJLENBQUN0SSxNQUFMLEtBQWdCLENBQXBCLEVBQXVCO0FBQ3JCcUksZ0JBQUFBLE1BQU0sR0FBSSxJQUFJRSxJQUFKLEVBQUQsQ0FBV0MsV0FBWCxFQUFUO0FBQ0FILGdCQUFBQSxNQUFNLEdBQUdBLE1BQU0sQ0FBQ0ksUUFBUCxHQUFrQkMsS0FBbEIsQ0FBd0IsQ0FBeEIsRUFBMkIsQ0FBM0IsQ0FBVDtBQUNBSixnQkFBQUEsSUFBSSxHQUFHRCxNQUFNLEdBQUdDLElBQWhCO0FBQ0Q7O0FBQ0RRLGNBQUFBLE1BQU0sR0FBRyxJQUFJUCxJQUFKLENBQVNELElBQVQsRUFBZUYsS0FBZixDQUFUO0FBQ0FTLGNBQUFBLFdBQVcsR0FBRyxJQUFJTixJQUFKLEVBQWQ7QUFDQU8sY0FBQUEsTUFBTSxDQUFDQyxRQUFQLENBQWdCRCxNQUFNLENBQUNFLFFBQVAsS0FBb0IsQ0FBcEM7QUFDQUYsY0FBQUEsTUFBTSxDQUFDQyxRQUFQLENBQWdCRCxNQUFNLENBQUNFLFFBQVAsS0FBb0IsQ0FBcEMsRUFBdUMsQ0FBdkM7QUFDQSxxQkFBT0YsTUFBTSxHQUFHRCxXQUFoQjtBQUNELGFBMURXO0FBMkRaSSxZQUFBQSxlQUFlLEVBQUUseUJBQVNDLEdBQVQsRUFBYzlDLElBQWQsRUFBb0I7QUFDbkMsa0JBQUk3RCxHQUFKLEVBQVM0RyxJQUFUO0FBQ0FELGNBQUFBLEdBQUcsR0FBR2pKLEVBQUUsQ0FBQ1MsSUFBSCxDQUFRd0ksR0FBUixDQUFOOztBQUNBLGtCQUFJLENBQUMsUUFBUTdGLElBQVIsQ0FBYTZGLEdBQWIsQ0FBTCxFQUF3QjtBQUN0Qix1QkFBTyxLQUFQO0FBQ0Q7O0FBQ0Qsa0JBQUk5QyxJQUFJLElBQUl2QixZQUFZLENBQUN1QixJQUFELENBQXhCLEVBQWdDO0FBQzlCLHVCQUFPN0QsR0FBRyxHQUFHMkcsR0FBRyxDQUFDbEosTUFBVixFQUFrQmtHLE9BQU8sQ0FBQ25HLElBQVIsQ0FBYSxDQUFDb0osSUFBSSxHQUFHdEUsWUFBWSxDQUFDdUIsSUFBRCxDQUFwQixLQUErQixJQUEvQixHQUFzQytDLElBQUksQ0FBQzVDLFNBQTNDLEdBQXVELEtBQUssQ0FBekUsRUFBNEVoRSxHQUE1RSxLQUFvRixDQUE3RztBQUNELGVBRkQsTUFFTztBQUNMLHVCQUFPMkcsR0FBRyxDQUFDbEosTUFBSixJQUFjLENBQWQsSUFBbUJrSixHQUFHLENBQUNsSixNQUFKLElBQWMsQ0FBeEM7QUFDRDtBQUNGLGFBdEVXO0FBdUVaa0ksWUFBQUEsUUFBUSxFQUFFLGtCQUFTekIsR0FBVCxFQUFjO0FBQ3RCLGtCQUFJbEUsR0FBSjs7QUFDQSxrQkFBSSxDQUFDa0UsR0FBTCxFQUFVO0FBQ1IsdUJBQU8sSUFBUDtBQUNEOztBQUNELHFCQUFPLENBQUMsQ0FBQ2xFLEdBQUcsR0FBR3FDLGNBQWMsQ0FBQzZCLEdBQUQsQ0FBckIsS0FBK0IsSUFBL0IsR0FBc0NsRSxHQUFHLENBQUM2RCxJQUExQyxHQUFpRCxLQUFLLENBQXZELEtBQTZELElBQXBFO0FBQ0QsYUE3RVc7QUE4RVpsQixZQUFBQSxnQkFBZ0IsRUFBRSwwQkFBU3VCLEdBQVQsRUFBYztBQUM5QixrQkFBSUMsSUFBSixFQUFVMEMsTUFBVixFQUFrQjdHLEdBQWxCLEVBQXVCa0YsV0FBdkI7QUFDQWYsY0FBQUEsSUFBSSxHQUFHOUIsY0FBYyxDQUFDNkIsR0FBRCxDQUFyQjs7QUFDQSxrQkFBSSxDQUFDQyxJQUFMLEVBQVc7QUFDVCx1QkFBT0QsR0FBUDtBQUNEOztBQUNEZ0IsY0FBQUEsV0FBVyxHQUFHZixJQUFJLENBQUMxRyxNQUFMLENBQVkwRyxJQUFJLENBQUMxRyxNQUFMLENBQVlBLE1BQVosR0FBcUIsQ0FBakMsQ0FBZDtBQUNBeUcsY0FBQUEsR0FBRyxHQUFHQSxHQUFHLENBQUM3RixPQUFKLENBQVksS0FBWixFQUFtQixFQUFuQixDQUFOO0FBQ0E2RixjQUFBQSxHQUFHLEdBQUdBLEdBQUcsQ0FBQ2lDLEtBQUosQ0FBVSxDQUFWLEVBQWEsQ0FBQ2pCLFdBQUQsR0FBZSxDQUFmLElBQW9CLEdBQWpDLENBQU47O0FBQ0Esa0JBQUlmLElBQUksQ0FBQ0osTUFBTCxDQUFZeEgsTUFBaEIsRUFBd0I7QUFDdEIsdUJBQU8sQ0FBQ3lELEdBQUcsR0FBR2tFLEdBQUcsQ0FBQ2pFLEtBQUosQ0FBVWtFLElBQUksQ0FBQ0osTUFBZixDQUFQLEtBQWtDLElBQWxDLEdBQXlDL0QsR0FBRyxDQUFDa0IsSUFBSixDQUFTLEdBQVQsQ0FBekMsR0FBeUQsS0FBSyxDQUFyRTtBQUNELGVBRkQsTUFFTztBQUNMMkYsZ0JBQUFBLE1BQU0sR0FBRzFDLElBQUksQ0FBQ0osTUFBTCxDQUFZK0MsSUFBWixDQUFpQjVDLEdBQWpCLENBQVQ7O0FBQ0Esb0JBQUkyQyxNQUFNLElBQUksSUFBZCxFQUFvQjtBQUNsQkEsa0JBQUFBLE1BQU0sQ0FBQ0UsS0FBUDtBQUNEOztBQUNELHVCQUFPRixNQUFNLElBQUksSUFBVixHQUFpQkEsTUFBTSxDQUFDM0YsSUFBUCxDQUFZLEdBQVosQ0FBakIsR0FBb0MsS0FBSyxDQUFoRDtBQUNEO0FBQ0Y7QUFoR1csV0FBZDs7QUFtR0FrQixVQUFBQSxPQUFPLENBQUNvQixlQUFSLEdBQTBCLFVBQVN2RixFQUFULEVBQWE7QUFDckMsbUJBQU9QLEVBQUUsQ0FBQzZCLEVBQUgsQ0FBTXRCLEVBQU4sRUFBVSxVQUFWLEVBQXNCdUYsZUFBdEIsQ0FBUDtBQUNELFdBRkQ7O0FBSUFwQixVQUFBQSxPQUFPLENBQUN3RCxhQUFSLEdBQXdCLFVBQVMzSCxFQUFULEVBQWE7QUFDbkMsbUJBQU9tRSxPQUFPLENBQUM0QyxHQUFSLENBQVlZLGFBQVosQ0FBMEJsSSxFQUFFLENBQUNZLEdBQUgsQ0FBT0wsRUFBUCxDQUExQixDQUFQO0FBQ0QsV0FGRDs7QUFJQW1FLFVBQUFBLE9BQU8sQ0FBQzRFLGFBQVIsR0FBd0IsVUFBUy9JLEVBQVQsRUFBYTtBQUNuQ21FLFlBQUFBLE9BQU8sQ0FBQ29CLGVBQVIsQ0FBd0J2RixFQUF4QjtBQUNBUCxZQUFBQSxFQUFFLENBQUM2QixFQUFILENBQU10QixFQUFOLEVBQVUsVUFBVixFQUFzQmtGLFdBQXRCO0FBQ0EsbUJBQU9sRixFQUFQO0FBQ0QsV0FKRDs7QUFNQW1FLFVBQUFBLE9BQU8sQ0FBQzZFLGdCQUFSLEdBQTJCLFVBQVNoSixFQUFULEVBQWE7QUFDdEMsZ0JBQUk0SCxLQUFKLEVBQVdFLElBQVg7QUFDQTNELFlBQUFBLE9BQU8sQ0FBQ29CLGVBQVIsQ0FBd0J2RixFQUF4Qjs7QUFDQSxnQkFBSUEsRUFBRSxDQUFDUixNQUFILElBQWFRLEVBQUUsQ0FBQ1IsTUFBSCxLQUFjLENBQS9CLEVBQWtDO0FBQ2hDb0ksY0FBQUEsS0FBSyxHQUFHNUgsRUFBRSxDQUFDLENBQUQsQ0FBVixFQUFlOEgsSUFBSSxHQUFHOUgsRUFBRSxDQUFDLENBQUQsQ0FBeEI7QUFDQSxtQkFBS2lKLHdCQUFMLENBQThCckIsS0FBOUIsRUFBcUNFLElBQXJDO0FBQ0QsYUFIRCxNQUdPO0FBQ0xySSxjQUFBQSxFQUFFLENBQUM2QixFQUFILENBQU10QixFQUFOLEVBQVUsVUFBVixFQUFzQm9GLHNCQUF0QjtBQUNBM0YsY0FBQUEsRUFBRSxDQUFDNkIsRUFBSCxDQUFNdEIsRUFBTixFQUFVLFVBQVYsRUFBc0IyRSxZQUF0QjtBQUNBbEYsY0FBQUEsRUFBRSxDQUFDNkIsRUFBSCxDQUFNdEIsRUFBTixFQUFVLFVBQVYsRUFBc0I2RSxrQkFBdEI7QUFDQXBGLGNBQUFBLEVBQUUsQ0FBQzZCLEVBQUgsQ0FBTXRCLEVBQU4sRUFBVSxVQUFWLEVBQXNCNEUsbUJBQXRCO0FBQ0FuRixjQUFBQSxFQUFFLENBQUM2QixFQUFILENBQU10QixFQUFOLEVBQVUsU0FBVixFQUFxQnlFLGdCQUFyQjtBQUNEOztBQUNELG1CQUFPekUsRUFBUDtBQUNELFdBZEQ7O0FBZ0JBbUUsVUFBQUEsT0FBTyxDQUFDOEUsd0JBQVIsR0FBbUMsVUFBU3JCLEtBQVQsRUFBZ0JFLElBQWhCLEVBQXNCO0FBQ3ZEckksWUFBQUEsRUFBRSxDQUFDNkIsRUFBSCxDQUFNc0csS0FBTixFQUFhLFVBQWIsRUFBeUJ0QyxtQkFBekI7QUFDQTdGLFlBQUFBLEVBQUUsQ0FBQzZCLEVBQUgsQ0FBTXNHLEtBQU4sRUFBYSxVQUFiLEVBQXlCOUMsaUJBQXpCO0FBQ0EsbUJBQU9yRixFQUFFLENBQUM2QixFQUFILENBQU13RyxJQUFOLEVBQVksVUFBWixFQUF3QnRDLGtCQUF4QixDQUFQO0FBQ0QsV0FKRDs7QUFNQXJCLFVBQUFBLE9BQU8sQ0FBQ08sZ0JBQVIsR0FBMkIsVUFBUzFFLEVBQVQsRUFBYTtBQUN0Q21FLFlBQUFBLE9BQU8sQ0FBQ29CLGVBQVIsQ0FBd0J2RixFQUF4QjtBQUNBUCxZQUFBQSxFQUFFLENBQUM2QixFQUFILENBQU10QixFQUFOLEVBQVUsVUFBVixFQUFzQm1GLGtCQUF0QjtBQUNBMUYsWUFBQUEsRUFBRSxDQUFDNkIsRUFBSCxDQUFNdEIsRUFBTixFQUFVLFVBQVYsRUFBc0IwRSxnQkFBdEI7QUFDQWpGLFlBQUFBLEVBQUUsQ0FBQzZCLEVBQUgsQ0FBTXRCLEVBQU4sRUFBVSxTQUFWLEVBQXFCd0Usb0JBQXJCO0FBQ0EvRSxZQUFBQSxFQUFFLENBQUM2QixFQUFILENBQU10QixFQUFOLEVBQVUsT0FBVixFQUFtQnlGLFdBQW5CO0FBQ0FoRyxZQUFBQSxFQUFFLENBQUM2QixFQUFILENBQU10QixFQUFOLEVBQVUsT0FBVixFQUFtQmlGLGtCQUFuQjtBQUNBLG1CQUFPakYsRUFBUDtBQUNELFdBUkQ7O0FBVUFtRSxVQUFBQSxPQUFPLENBQUMrRSxZQUFSLEdBQXVCLFlBQVc7QUFDaEMsbUJBQU81RSxLQUFQO0FBQ0QsV0FGRDs7QUFJQUgsVUFBQUEsT0FBTyxDQUFDZ0YsWUFBUixHQUF1QixVQUFTQyxTQUFULEVBQW9CO0FBQ3pDOUUsWUFBQUEsS0FBSyxHQUFHOEUsU0FBUjtBQUNBLG1CQUFPLElBQVA7QUFDRCxXQUhEOztBQUtBakYsVUFBQUEsT0FBTyxDQUFDa0YsY0FBUixHQUF5QixVQUFTQyxVQUFULEVBQXFCO0FBQzVDLG1CQUFPaEYsS0FBSyxDQUFDL0IsSUFBTixDQUFXK0csVUFBWCxDQUFQO0FBQ0QsV0FGRDs7QUFJQW5GLFVBQUFBLE9BQU8sQ0FBQ29GLG1CQUFSLEdBQThCLFVBQVMzRCxJQUFULEVBQWU7QUFDM0MsZ0JBQUk0RCxHQUFKLEVBQVNoSixLQUFUOztBQUNBLGlCQUFLZ0osR0FBTCxJQUFZbEYsS0FBWixFQUFtQjtBQUNqQjlELGNBQUFBLEtBQUssR0FBRzhELEtBQUssQ0FBQ2tGLEdBQUQsQ0FBYjs7QUFDQSxrQkFBSWhKLEtBQUssQ0FBQ29GLElBQU4sS0FBZUEsSUFBbkIsRUFBeUI7QUFDdkJ0QixnQkFBQUEsS0FBSyxDQUFDbUYsTUFBTixDQUFhRCxHQUFiLEVBQWtCLENBQWxCO0FBQ0Q7QUFDRjs7QUFDRCxtQkFBTyxJQUFQO0FBQ0QsV0FURDs7QUFXQSxpQkFBT3JGLE9BQVA7QUFFRCxTQTlLUyxFQUFWOztBQWdMQWxHLFFBQUFBLE1BQU0sQ0FBQ0QsT0FBUCxHQUFpQm1HLE9BQWpCO0FBRUE3RixRQUFBQSxNQUFNLENBQUM2RixPQUFQLEdBQWlCQSxPQUFqQjtBQUdDLE9BL2tCRCxFQStrQkc1RSxJQS9rQkgsQ0Era0JRLElBL2tCUixFQStrQmEsT0FBT2pCLE1BQVAsS0FBa0IsV0FBbEIsR0FBZ0NBLE1BQWhDLEdBQXlDLE9BQU9DLElBQVAsS0FBZ0IsV0FBaEIsR0FBOEJBLElBQTlCLEdBQXFDLE9BQU9GLE1BQVAsS0FBa0IsV0FBbEIsR0FBZ0NBLE1BQWhDLEdBQXlDLEVBL2tCcEk7QUFnbEJDLEtBamxCTyxFQWlsQk47QUFBQywwQkFBbUI7QUFBcEIsS0FqbEJNO0FBeE8yekIsR0FBM2IsRUF5ekI3VyxFQXp6QjZXLEVBeXpCMVcsQ0FBQyxDQUFELENBenpCMFcsRUF5ekJyVyxDQXp6QnFXLENBQVA7QUEwekJoWSxDQTF6QkQ7OztBQ0FBLFNBQVNxTCxLQUFULENBQWUvSyxDQUFmLEVBQWlCO0FBQUNtQixFQUFBQSxRQUFRLENBQUNvQyxnQkFBVCxDQUEwQixXQUExQixFQUFzQyxVQUFTeEQsQ0FBVCxFQUFXO0FBQUMsUUFBSVMsQ0FBQyxHQUFDVCxDQUFDLENBQUNxQyxNQUFSO0FBQUEsUUFBZW5DLENBQUMsR0FBQ0QsQ0FBQyxDQUFDUSxDQUFELENBQWxCO0FBQXNCUCxJQUFBQSxDQUFDLEtBQUdBLENBQUMsR0FBQyxDQUFDTyxDQUFDLEdBQUNBLENBQUMsQ0FBQ3dLLGFBQUwsS0FBcUJoTCxDQUFDLENBQUNRLENBQUQsQ0FBM0IsQ0FBRCxFQUFpQ1AsQ0FBQyxJQUFFOEssS0FBSyxDQUFDRSxJQUFOLENBQVd6SyxDQUFYLEVBQWFQLENBQWIsRUFBZSxDQUFDLENBQWhCLENBQXBDO0FBQXVELEdBQS9IO0FBQWlJOztBQUFBOEssS0FBSyxDQUFDRSxJQUFOLEdBQVcsVUFBU2pMLENBQVQsRUFBV0QsQ0FBWCxFQUFhUyxDQUFiLEVBQWU7QUFBQyxNQUFJUCxDQUFDLEdBQUMsWUFBTjtBQUFtQkYsRUFBQUEsQ0FBQyxHQUFDQSxDQUFDLElBQUUsRUFBTCxFQUFRLENBQUNDLENBQUMsQ0FBQ2tMLE9BQUYsSUFBVyxVQUFTbEwsQ0FBVCxFQUFXRCxDQUFYLEVBQWE7QUFBQyxhQUFTSyxDQUFULEdBQVk7QUFBQzJLLE1BQUFBLEtBQUssQ0FBQ0ksSUFBTixDQUFXbkwsQ0FBWCxFQUFhLENBQUMsQ0FBZDtBQUFpQjs7QUFBQSxhQUFTVyxDQUFULEdBQVk7QUFBQ1QsTUFBQUEsQ0FBQyxLQUFHQSxDQUFDLEdBQUMsVUFBU0YsQ0FBVCxFQUFXRCxDQUFYLEVBQWFTLENBQWIsRUFBZTtBQUFDLGlCQUFTUCxDQUFULEdBQVk7QUFBQ0csVUFBQUEsQ0FBQyxDQUFDc0QsU0FBRixHQUFZLGlCQUFleEQsQ0FBZixHQUFpQkMsQ0FBN0I7QUFBK0IsY0FBSUosQ0FBQyxHQUFDQyxDQUFDLENBQUNvTCxTQUFSO0FBQUEsY0FBa0I1SyxDQUFDLEdBQUNSLENBQUMsQ0FBQ3FMLFVBQXRCO0FBQWlDakwsVUFBQUEsQ0FBQyxDQUFDa0wsWUFBRixLQUFpQnRMLENBQWpCLEtBQXFCRCxDQUFDLEdBQUNTLENBQUMsR0FBQyxDQUF6QjtBQUE0QixjQUFJUCxDQUFDLEdBQUNELENBQUMsQ0FBQ3VMLFdBQVI7QUFBQSxjQUFvQjVLLENBQUMsR0FBQ1gsQ0FBQyxDQUFDd0wsWUFBeEI7QUFBQSxjQUFxQ0MsQ0FBQyxHQUFDckwsQ0FBQyxDQUFDb0wsWUFBekM7QUFBQSxjQUFzRHBNLENBQUMsR0FBQ2dCLENBQUMsQ0FBQ21MLFdBQTFEO0FBQUEsY0FBc0VqTCxDQUFDLEdBQUNFLENBQUMsR0FBQ1AsQ0FBQyxHQUFDLENBQTVFO0FBQThFRyxVQUFBQSxDQUFDLENBQUNzTCxLQUFGLENBQVFDLEdBQVIsR0FBWSxDQUFDLFFBQU16TCxDQUFOLEdBQVFILENBQUMsR0FBQzBMLENBQUYsR0FBSSxFQUFaLEdBQWUsUUFBTXZMLENBQU4sR0FBUUgsQ0FBQyxHQUFDWSxDQUFGLEdBQUksRUFBWixHQUFlWixDQUFDLEdBQUNZLENBQUMsR0FBQyxDQUFKLEdBQU04SyxDQUFDLEdBQUMsQ0FBdkMsSUFBMEMsSUFBdEQsRUFBMkRyTCxDQUFDLENBQUNzTCxLQUFGLENBQVFFLElBQVIsR0FBYSxDQUFDLFFBQU16TCxDQUFOLEdBQVFLLENBQVIsR0FBVSxRQUFNTCxDQUFOLEdBQVFLLENBQUMsR0FBQ1AsQ0FBRixHQUFJYixDQUFaLEdBQWMsUUFBTWMsQ0FBTixHQUFRTSxDQUFDLEdBQUNQLENBQUYsR0FBSSxFQUFaLEdBQWUsUUFBTUMsQ0FBTixHQUFRTSxDQUFDLEdBQUNwQixDQUFGLEdBQUksRUFBWixHQUFla0IsQ0FBQyxHQUFDbEIsQ0FBQyxHQUFDLENBQTNELElBQThELElBQXRJO0FBQTJJOztBQUFBLFlBQUlnQixDQUFDLEdBQUNlLFFBQVEsQ0FBQzBLLGFBQVQsQ0FBdUIsTUFBdkIsQ0FBTjtBQUFBLFlBQXFDbEwsQ0FBQyxHQUFDSCxDQUFDLENBQUNzTCxJQUFGLElBQVE5TCxDQUFDLENBQUMrTCxZQUFGLENBQWUsWUFBZixDQUFSLElBQXNDLEdBQTdFO0FBQWlGM0wsUUFBQUEsQ0FBQyxDQUFDNEwsU0FBRixHQUFZak0sQ0FBWixFQUFjQyxDQUFDLENBQUNpTSxXQUFGLENBQWM3TCxDQUFkLENBQWQ7QUFBK0IsWUFBSUYsQ0FBQyxHQUFDUyxDQUFDLENBQUMsQ0FBRCxDQUFELElBQU0sRUFBWjtBQUFBLFlBQWVSLENBQUMsR0FBQ1EsQ0FBQyxDQUFDLENBQUQsQ0FBRCxJQUFNLEVBQXZCO0FBQTBCVixRQUFBQSxDQUFDO0FBQUcsWUFBSXdMLENBQUMsR0FBQ3JMLENBQUMsQ0FBQzhMLHFCQUFGLEVBQU47QUFBZ0MsZUFBTSxRQUFNaE0sQ0FBTixJQUFTdUwsQ0FBQyxDQUFDRSxHQUFGLEdBQU0sQ0FBZixJQUFrQnpMLENBQUMsR0FBQyxHQUFGLEVBQU1ELENBQUMsRUFBekIsSUFBNkIsUUFBTUMsQ0FBTixJQUFTdUwsQ0FBQyxDQUFDVSxNQUFGLEdBQVN6TSxNQUFNLENBQUMwTSxXQUF6QixJQUFzQ2xNLENBQUMsR0FBQyxHQUFGLEVBQU1ELENBQUMsRUFBN0MsSUFBaUQsUUFBTUMsQ0FBTixJQUFTdUwsQ0FBQyxDQUFDRyxJQUFGLEdBQU8sQ0FBaEIsSUFBbUIxTCxDQUFDLEdBQUMsR0FBRixFQUFNRCxDQUFDLEVBQTFCLElBQThCLFFBQU1DLENBQU4sSUFBU3VMLENBQUMsQ0FBQ1ksS0FBRixHQUFRM00sTUFBTSxDQUFDNE0sVUFBeEIsS0FBcUNwTSxDQUFDLEdBQUMsR0FBRixFQUFNRCxDQUFDLEVBQTVDLENBQTVHLEVBQTRKRyxDQUFDLENBQUNzRCxTQUFGLElBQWEsZ0JBQXpLLEVBQTBMdEQsQ0FBaE07QUFBa00sT0FBbHNCLENBQW1zQkosQ0FBbnNCLEVBQXFzQnlMLENBQXJzQixFQUF1c0IxTCxDQUF2c0IsQ0FBTCxDQUFEO0FBQWl0Qjs7QUFBQSxRQUFJRyxDQUFKLEVBQU1DLENBQU4sRUFBUXNMLENBQVI7QUFBVSxXQUFPekwsQ0FBQyxDQUFDdUQsZ0JBQUYsQ0FBbUIsV0FBbkIsRUFBK0JuRCxDQUEvQixHQUFrQ0osQ0FBQyxDQUFDdUQsZ0JBQUYsQ0FBbUIsWUFBbkIsRUFBZ0NuRCxDQUFoQyxDQUFsQyxFQUFxRUosQ0FBQyxDQUFDa0wsT0FBRixHQUFVO0FBQUNELE1BQUFBLElBQUksRUFBQyxnQkFBVTtBQUFDUSxRQUFBQSxDQUFDLEdBQUN6TCxDQUFDLENBQUN1TSxLQUFGLElBQVN2TSxDQUFDLENBQUMrTCxZQUFGLENBQWU5TCxDQUFmLENBQVQsSUFBNEJ3TCxDQUE5QixFQUFnQ3pMLENBQUMsQ0FBQ3VNLEtBQUYsR0FBUSxFQUF4QyxFQUEyQ3ZNLENBQUMsQ0FBQ3dNLFlBQUYsQ0FBZXZNLENBQWYsRUFBaUIsRUFBakIsQ0FBM0MsRUFBZ0V3TCxDQUFDLElBQUUsQ0FBQ3RMLENBQUosS0FBUUEsQ0FBQyxHQUFDK0gsVUFBVSxDQUFDdkgsQ0FBRCxFQUFHSCxDQUFDLEdBQUMsR0FBRCxHQUFLLENBQVQsQ0FBcEIsQ0FBaEU7QUFBaUcsT0FBbEg7QUFBbUgySyxNQUFBQSxJQUFJLEVBQUMsY0FBU25MLENBQVQsRUFBVztBQUFDLFlBQUdRLENBQUMsS0FBR1IsQ0FBUCxFQUFTO0FBQUNHLFVBQUFBLENBQUMsR0FBQ3NNLFlBQVksQ0FBQ3RNLENBQUQsQ0FBZDtBQUFrQixjQUFJSixDQUFDLEdBQUNHLENBQUMsSUFBRUEsQ0FBQyxDQUFDd00sVUFBWDtBQUFzQjNNLFVBQUFBLENBQUMsSUFBRUEsQ0FBQyxDQUFDNE0sV0FBRixDQUFjek0sQ0FBZCxDQUFILEVBQW9CQSxDQUFDLEdBQUMsS0FBSyxDQUEzQjtBQUE2QjtBQUFDO0FBQXBOLEtBQXRGO0FBQTRTLEdBQWhrQyxDQUFpa0NGLENBQWprQyxFQUFta0NELENBQW5rQyxDQUFaLEVBQW1sQ2tMLElBQW5sQyxFQUFSO0FBQWttQyxDQUFocEMsRUFBaXBDRixLQUFLLENBQUNJLElBQU4sR0FBVyxVQUFTbkwsQ0FBVCxFQUFXRCxDQUFYLEVBQWE7QUFBQ0MsRUFBQUEsQ0FBQyxDQUFDa0wsT0FBRixJQUFXbEwsQ0FBQyxDQUFDa0wsT0FBRixDQUFVQyxJQUFWLENBQWVwTCxDQUFmLENBQVg7QUFBNkIsQ0FBdnNDLEVBQXdzQyxlQUFhLE9BQU9ULE1BQXBCLElBQTRCQSxNQUFNLENBQUNELE9BQW5DLEtBQTZDQyxNQUFNLENBQUNELE9BQVAsR0FBZTBMLEtBQTVELENBQXhzQzs7O0FDQW5KLENBQUMsWUFBVTtBQUFDLFdBQVM3SyxDQUFULENBQVdILENBQVgsRUFBYUUsQ0FBYixFQUFlRCxDQUFmLEVBQWlCO0FBQUMsYUFBU0ksQ0FBVCxDQUFXSSxDQUFYLEVBQWFwQixDQUFiLEVBQWU7QUFBQyxVQUFHLENBQUNhLENBQUMsQ0FBQ08sQ0FBRCxDQUFMLEVBQVM7QUFBQyxZQUFHLENBQUNULENBQUMsQ0FBQ1MsQ0FBRCxDQUFMLEVBQVM7QUFBQyxjQUFJb00sQ0FBQyxHQUFDLGNBQVksT0FBT3JNLE9BQW5CLElBQTRCQSxPQUFsQztBQUEwQyxjQUFHLENBQUNuQixDQUFELElBQUl3TixDQUFQLEVBQVMsT0FBT0EsQ0FBQyxDQUFDcE0sQ0FBRCxFQUFHLENBQUMsQ0FBSixDQUFSO0FBQWUsY0FBR0gsQ0FBSCxFQUFLLE9BQU9BLENBQUMsQ0FBQ0csQ0FBRCxFQUFHLENBQUMsQ0FBSixDQUFSO0FBQWUsY0FBSUYsQ0FBQyxHQUFDLElBQUlHLEtBQUosQ0FBVSx5QkFBdUJELENBQXZCLEdBQXlCLEdBQW5DLENBQU47QUFBOEMsZ0JBQU1GLENBQUMsQ0FBQ0ksSUFBRixHQUFPLGtCQUFQLEVBQTBCSixDQUFoQztBQUFrQzs7QUFBQSxZQUFJdU0sQ0FBQyxHQUFDNU0sQ0FBQyxDQUFDTyxDQUFELENBQUQsR0FBSztBQUFDbkIsVUFBQUEsT0FBTyxFQUFDO0FBQVQsU0FBWDtBQUF3QlUsUUFBQUEsQ0FBQyxDQUFDUyxDQUFELENBQUQsQ0FBSyxDQUFMLEVBQVFJLElBQVIsQ0FBYWlNLENBQUMsQ0FBQ3hOLE9BQWYsRUFBdUIsVUFBU2EsQ0FBVCxFQUFXO0FBQUMsY0FBSUQsQ0FBQyxHQUFDRixDQUFDLENBQUNTLENBQUQsQ0FBRCxDQUFLLENBQUwsRUFBUU4sQ0FBUixDQUFOO0FBQWlCLGlCQUFPRSxDQUFDLENBQUNILENBQUMsSUFBRUMsQ0FBSixDQUFSO0FBQWUsU0FBbkUsRUFBb0UyTSxDQUFwRSxFQUFzRUEsQ0FBQyxDQUFDeE4sT0FBeEUsRUFBZ0ZhLENBQWhGLEVBQWtGSCxDQUFsRixFQUFvRkUsQ0FBcEYsRUFBc0ZELENBQXRGO0FBQXlGOztBQUFBLGFBQU9DLENBQUMsQ0FBQ08sQ0FBRCxDQUFELENBQUtuQixPQUFaO0FBQW9COztBQUFBLFNBQUksSUFBSWdCLENBQUMsR0FBQyxjQUFZLE9BQU9FLE9BQW5CLElBQTRCQSxPQUFsQyxFQUEwQ0MsQ0FBQyxHQUFDLENBQWhELEVBQWtEQSxDQUFDLEdBQUNSLENBQUMsQ0FBQ2EsTUFBdEQsRUFBNkRMLENBQUMsRUFBOUQ7QUFBaUVKLE1BQUFBLENBQUMsQ0FBQ0osQ0FBQyxDQUFDUSxDQUFELENBQUYsQ0FBRDtBQUFqRTs7QUFBeUUsV0FBT0osQ0FBUDtBQUFTOztBQUFBLFNBQU9GLENBQVA7QUFBUyxDQUF4YyxJQUE0YztBQUFDLEtBQUUsQ0FBQyxVQUFTSyxPQUFULEVBQWlCakIsTUFBakIsRUFBd0JELE9BQXhCLEVBQWdDO0FBQUM7O0FBQWEsUUFBSXlOLFVBQVUsR0FBQ3ZNLE9BQU8sQ0FBQyxrQkFBRCxDQUF0Qjs7QUFBMkMsUUFBSXdNLFdBQVcsR0FBQ0Msc0JBQXNCLENBQUNGLFVBQUQsQ0FBdEM7O0FBQW1ELGFBQVNFLHNCQUFULENBQWdDQyxHQUFoQyxFQUFvQztBQUFDLGFBQU9BLEdBQUcsSUFBRUEsR0FBRyxDQUFDQyxVQUFULEdBQW9CRCxHQUFwQixHQUF3QjtBQUFDRSxRQUFBQSxPQUFPLEVBQUNGO0FBQVQsT0FBL0I7QUFBNkM7O0FBQUF2TixJQUFBQSxNQUFNLENBQUMwTixTQUFQLEdBQWlCTCxXQUFXLENBQUNJLE9BQTdCO0FBQXFDek4sSUFBQUEsTUFBTSxDQUFDME4sU0FBUCxDQUFpQkMsa0JBQWpCLEdBQW9DUCxVQUFVLENBQUNPLGtCQUEvQztBQUFrRTNOLElBQUFBLE1BQU0sQ0FBQzBOLFNBQVAsQ0FBaUJFLG9CQUFqQixHQUFzQ1IsVUFBVSxDQUFDUSxvQkFBakQ7QUFBc0U1TixJQUFBQSxNQUFNLENBQUMwTixTQUFQLENBQWlCRywwQkFBakIsR0FBNENULFVBQVUsQ0FBQ1MsMEJBQXZEO0FBQWtGLEdBQTlkLEVBQStkO0FBQUMsd0JBQW1CO0FBQXBCLEdBQS9kLENBQUg7QUFBMGYsS0FBRSxDQUFDLFVBQVNoTixPQUFULEVBQWlCakIsTUFBakIsRUFBd0JELE9BQXhCLEVBQWdDO0FBQUM7O0FBQWFtTyxJQUFBQSxNQUFNLENBQUNDLGNBQVAsQ0FBc0JwTyxPQUF0QixFQUE4QixZQUE5QixFQUEyQztBQUFDd0MsTUFBQUEsS0FBSyxFQUFDO0FBQVAsS0FBM0M7QUFBeUR4QyxJQUFBQSxPQUFPLENBQUNxTyxLQUFSLEdBQWNBLEtBQWQ7QUFBb0JyTyxJQUFBQSxPQUFPLENBQUNzTyxRQUFSLEdBQWlCQSxRQUFqQjtBQUEwQnRPLElBQUFBLE9BQU8sQ0FBQ3VPLFdBQVIsR0FBb0JBLFdBQXBCO0FBQWdDdk8sSUFBQUEsT0FBTyxDQUFDd08sWUFBUixHQUFxQkEsWUFBckI7QUFBa0N4TyxJQUFBQSxPQUFPLENBQUN5TyxPQUFSLEdBQWdCQSxPQUFoQjtBQUF3QnpPLElBQUFBLE9BQU8sQ0FBQzBPLFFBQVIsR0FBaUJBLFFBQWpCOztBQUEwQixhQUFTTCxLQUFULENBQWVULEdBQWYsRUFBbUI7QUFBQyxVQUFJZSxJQUFJLEdBQUMsRUFBVDs7QUFBWSxXQUFJLElBQUlDLElBQVIsSUFBZ0JoQixHQUFoQixFQUFvQjtBQUFDLFlBQUdBLEdBQUcsQ0FBQ2lCLGNBQUosQ0FBbUJELElBQW5CLENBQUgsRUFBNEJELElBQUksQ0FBQ0MsSUFBRCxDQUFKLEdBQVdoQixHQUFHLENBQUNnQixJQUFELENBQWQ7QUFBcUI7O0FBQUEsYUFBT0QsSUFBUDtBQUFZOztBQUFBLGFBQVNMLFFBQVQsQ0FBa0JWLEdBQWxCLEVBQXNCa0IsYUFBdEIsRUFBb0M7QUFBQ2xCLE1BQUFBLEdBQUcsR0FBQ1MsS0FBSyxDQUFDVCxHQUFHLElBQUUsRUFBTixDQUFUOztBQUFtQixXQUFJLElBQUltQixDQUFSLElBQWFELGFBQWIsRUFBMkI7QUFBQyxZQUFHbEIsR0FBRyxDQUFDbUIsQ0FBRCxDQUFILEtBQVNDLFNBQVosRUFBc0JwQixHQUFHLENBQUNtQixDQUFELENBQUgsR0FBT0QsYUFBYSxDQUFDQyxDQUFELENBQXBCO0FBQXdCOztBQUFBLGFBQU9uQixHQUFQO0FBQVc7O0FBQUEsYUFBU1csV0FBVCxDQUFxQlUsT0FBckIsRUFBNkJDLFlBQTdCLEVBQTBDO0FBQUMsVUFBSUMsT0FBTyxHQUFDRixPQUFPLENBQUNHLFdBQXBCOztBQUFnQyxVQUFHRCxPQUFILEVBQVc7QUFBQyxZQUFJRSxPQUFPLEdBQUNKLE9BQU8sQ0FBQzVCLFVBQXBCOztBQUErQmdDLFFBQUFBLE9BQU8sQ0FBQ2IsWUFBUixDQUFxQlUsWUFBckIsRUFBa0NDLE9BQWxDO0FBQTJDLE9BQXRGLE1BQTBGO0FBQUNHLFFBQUFBLE1BQU0sQ0FBQzFDLFdBQVAsQ0FBbUJzQyxZQUFuQjtBQUFpQztBQUFDOztBQUFBLGFBQVNWLFlBQVQsQ0FBc0JTLE9BQXRCLEVBQThCQyxZQUE5QixFQUEyQztBQUFDLFVBQUlJLE1BQU0sR0FBQ0wsT0FBTyxDQUFDNUIsVUFBbkI7QUFBOEJpQyxNQUFBQSxNQUFNLENBQUNkLFlBQVAsQ0FBb0JVLFlBQXBCLEVBQWlDRCxPQUFqQztBQUEwQzs7QUFBQSxhQUFTUixPQUFULENBQWlCYyxLQUFqQixFQUF1QkMsRUFBdkIsRUFBMEI7QUFBQyxVQUFHLENBQUNELEtBQUosRUFBVTs7QUFBTyxVQUFHQSxLQUFLLENBQUNkLE9BQVQsRUFBaUI7QUFBQ2MsUUFBQUEsS0FBSyxDQUFDZCxPQUFOLENBQWNlLEVBQWQ7QUFBa0IsT0FBcEMsTUFBd0M7QUFBQyxhQUFJLElBQUlyTyxDQUFDLEdBQUMsQ0FBVixFQUFZQSxDQUFDLEdBQUNvTyxLQUFLLENBQUMvTixNQUFwQixFQUEyQkwsQ0FBQyxFQUE1QixFQUErQjtBQUFDcU8sVUFBQUEsRUFBRSxDQUFDRCxLQUFLLENBQUNwTyxDQUFELENBQU4sRUFBVUEsQ0FBVixFQUFZb08sS0FBWixDQUFGO0FBQXFCO0FBQUM7QUFBQzs7QUFBQSxhQUFTYixRQUFULENBQWtCZSxFQUFsQixFQUFxQkQsRUFBckIsRUFBd0I7QUFBQyxVQUFJRSxPQUFPLEdBQUMsS0FBSyxDQUFqQjs7QUFBbUIsVUFBSUMsV0FBVyxHQUFDLFNBQVNBLFdBQVQsR0FBc0I7QUFBQ3ZDLFFBQUFBLFlBQVksQ0FBQ3NDLE9BQUQsQ0FBWjtBQUFzQkEsUUFBQUEsT0FBTyxHQUFDN0csVUFBVSxDQUFDMkcsRUFBRCxFQUFJQyxFQUFKLENBQWxCO0FBQTBCLE9BQXZGOztBQUF3RixhQUFPRSxXQUFQO0FBQW1CO0FBQUMsR0FBem1DLEVBQTBtQyxFQUExbUMsQ0FBNWY7QUFBMG1ELEtBQUUsQ0FBQyxVQUFTek8sT0FBVCxFQUFpQmpCLE1BQWpCLEVBQXdCRCxPQUF4QixFQUFnQztBQUFDOztBQUFhbU8sSUFBQUEsTUFBTSxDQUFDQyxjQUFQLENBQXNCcE8sT0FBdEIsRUFBOEIsWUFBOUIsRUFBMkM7QUFBQ3dDLE1BQUFBLEtBQUssRUFBQztBQUFQLEtBQTNDO0FBQXlEeEMsSUFBQUEsT0FBTyxDQUFDZ08sa0JBQVIsR0FBMkJBLGtCQUEzQjtBQUE4Q2hPLElBQUFBLE9BQU8sQ0FBQ2lPLG9CQUFSLEdBQTZCQSxvQkFBN0I7QUFBa0RqTyxJQUFBQSxPQUFPLENBQUNrTywwQkFBUixHQUFtQ0EsMEJBQW5DO0FBQThEbE8sSUFBQUEsT0FBTyxDQUFDOE4sT0FBUixHQUFnQjhCLFNBQWhCOztBQUEwQixRQUFJQyxLQUFLLEdBQUMzTyxPQUFPLENBQUMsUUFBRCxDQUFqQjs7QUFBNEIsYUFBUzhNLGtCQUFULENBQTRCekUsS0FBNUIsRUFBa0N1RyxZQUFsQyxFQUErQztBQUFDdkcsTUFBQUEsS0FBSyxDQUFDckYsZ0JBQU4sQ0FBdUIsU0FBdkIsRUFBaUMsWUFBVTtBQUFDcUYsUUFBQUEsS0FBSyxDQUFDL0UsU0FBTixDQUFnQkMsR0FBaEIsQ0FBb0JxTCxZQUFwQjtBQUFrQyxPQUE5RTtBQUFnRnZHLE1BQUFBLEtBQUssQ0FBQ3JGLGdCQUFOLENBQXVCLE9BQXZCLEVBQStCLFlBQVU7QUFBQyxZQUFHcUYsS0FBSyxDQUFDd0csUUFBTixDQUFlQyxLQUFsQixFQUF3QjtBQUFDekcsVUFBQUEsS0FBSyxDQUFDL0UsU0FBTixDQUFnQlEsTUFBaEIsQ0FBdUI4SyxZQUF2QjtBQUFxQztBQUFDLE9BQXpHO0FBQTJHOztBQUFBLFFBQUlHLFVBQVUsR0FBQyxDQUFDLFVBQUQsRUFBWSxpQkFBWixFQUE4QixlQUE5QixFQUE4QyxnQkFBOUMsRUFBK0QsY0FBL0QsRUFBOEUsU0FBOUUsRUFBd0YsVUFBeEYsRUFBbUcsY0FBbkcsRUFBa0gsY0FBbEgsRUFBaUksYUFBakksQ0FBZjs7QUFBK0osYUFBU0MsZ0JBQVQsQ0FBMEIzRyxLQUExQixFQUFnQzRHLGNBQWhDLEVBQStDO0FBQUNBLE1BQUFBLGNBQWMsR0FBQ0EsY0FBYyxJQUFFLEVBQS9CO0FBQWtDLFVBQUlDLGVBQWUsR0FBQyxDQUFDN0csS0FBSyxDQUFDM0IsSUFBTixHQUFXLFVBQVosRUFBd0J5SSxNQUF4QixDQUErQkosVUFBL0IsQ0FBcEI7QUFBK0QsVUFBSUYsUUFBUSxHQUFDeEcsS0FBSyxDQUFDd0csUUFBbkI7O0FBQTRCLFdBQUksSUFBSTVPLENBQUMsR0FBQyxDQUFWLEVBQVlBLENBQUMsR0FBQ2lQLGVBQWUsQ0FBQzVPLE1BQTlCLEVBQXFDTCxDQUFDLEVBQXRDLEVBQXlDO0FBQUMsWUFBSW1QLElBQUksR0FBQ0YsZUFBZSxDQUFDalAsQ0FBRCxDQUF4Qjs7QUFBNEIsWUFBRzRPLFFBQVEsQ0FBQ08sSUFBRCxDQUFYLEVBQWtCO0FBQUMsaUJBQU8vRyxLQUFLLENBQUNtRCxZQUFOLENBQW1CLFVBQVE0RCxJQUEzQixLQUFrQ0gsY0FBYyxDQUFDRyxJQUFELENBQXZEO0FBQThEO0FBQUM7QUFBQzs7QUFBQSxhQUFTckMsb0JBQVQsQ0FBOEIxRSxLQUE5QixFQUFvQzRHLGNBQXBDLEVBQW1EO0FBQUMsZUFBU0ksYUFBVCxHQUF3QjtBQUFDLFlBQUlDLE9BQU8sR0FBQ2pILEtBQUssQ0FBQ3dHLFFBQU4sQ0FBZUMsS0FBZixHQUFxQixJQUFyQixHQUEwQkUsZ0JBQWdCLENBQUMzRyxLQUFELEVBQU80RyxjQUFQLENBQXREO0FBQTZFNUcsUUFBQUEsS0FBSyxDQUFDa0gsaUJBQU4sQ0FBd0JELE9BQU8sSUFBRSxFQUFqQztBQUFxQzs7QUFBQWpILE1BQUFBLEtBQUssQ0FBQ3JGLGdCQUFOLENBQXVCLE9BQXZCLEVBQStCcU0sYUFBL0I7QUFBOENoSCxNQUFBQSxLQUFLLENBQUNyRixnQkFBTixDQUF1QixTQUF2QixFQUFpQ3FNLGFBQWpDO0FBQWdEOztBQUFBLGFBQVNyQywwQkFBVCxDQUFvQzNFLEtBQXBDLEVBQTBDbUgsT0FBMUMsRUFBa0Q7QUFBQyxVQUFJQyxvQkFBb0IsR0FBQ0QsT0FBTyxDQUFDQyxvQkFBakM7QUFBQSxVQUFzREMsMEJBQTBCLEdBQUNGLE9BQU8sQ0FBQ0UsMEJBQXpGO0FBQUEsVUFBb0hDLGNBQWMsR0FBQ0gsT0FBTyxDQUFDRyxjQUEzSTs7QUFBMEosZUFBU04sYUFBVCxDQUF1QkcsT0FBdkIsRUFBK0I7QUFBQyxZQUFJSSxXQUFXLEdBQUNKLE9BQU8sQ0FBQ0ksV0FBeEI7QUFBb0MsWUFBSXpELFVBQVUsR0FBQzlELEtBQUssQ0FBQzhELFVBQXJCO0FBQWdDLFlBQUkwRCxTQUFTLEdBQUMxRCxVQUFVLENBQUMyRCxhQUFYLENBQXlCLE1BQUlMLG9CQUE3QixLQUFvRDdPLFFBQVEsQ0FBQzBLLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBbEU7O0FBQWdHLFlBQUcsQ0FBQ2pELEtBQUssQ0FBQ3dHLFFBQU4sQ0FBZUMsS0FBaEIsSUFBdUJ6RyxLQUFLLENBQUMwSCxpQkFBaEMsRUFBa0Q7QUFBQ0YsVUFBQUEsU0FBUyxDQUFDMU0sU0FBVixHQUFvQnNNLG9CQUFwQjtBQUF5Q0ksVUFBQUEsU0FBUyxDQUFDRyxXQUFWLEdBQXNCM0gsS0FBSyxDQUFDMEgsaUJBQTVCOztBQUE4QyxjQUFHSCxXQUFILEVBQWU7QUFBQ0QsWUFBQUEsY0FBYyxLQUFHLFFBQWpCLEdBQTBCLENBQUMsR0FBRWhCLEtBQUssQ0FBQ3JCLFlBQVQsRUFBdUJqRixLQUF2QixFQUE2QndILFNBQTdCLENBQTFCLEdBQWtFLENBQUMsR0FBRWxCLEtBQUssQ0FBQ3RCLFdBQVQsRUFBc0JoRixLQUF0QixFQUE0QndILFNBQTVCLENBQWxFO0FBQXlHMUQsWUFBQUEsVUFBVSxDQUFDN0ksU0FBWCxDQUFxQkMsR0FBckIsQ0FBeUJtTSwwQkFBekI7QUFBcUQ7QUFBQyxTQUF6VCxNQUE2VDtBQUFDdkQsVUFBQUEsVUFBVSxDQUFDN0ksU0FBWCxDQUFxQlEsTUFBckIsQ0FBNEI0TCwwQkFBNUI7QUFBd0RHLFVBQUFBLFNBQVMsQ0FBQy9MLE1BQVY7QUFBbUI7QUFBQzs7QUFBQXVFLE1BQUFBLEtBQUssQ0FBQ3JGLGdCQUFOLENBQXVCLE9BQXZCLEVBQStCLFlBQVU7QUFBQ3FNLFFBQUFBLGFBQWEsQ0FBQztBQUFDTyxVQUFBQSxXQUFXLEVBQUM7QUFBYixTQUFELENBQWI7QUFBbUMsT0FBN0U7QUFBK0V2SCxNQUFBQSxLQUFLLENBQUNyRixnQkFBTixDQUF1QixTQUF2QixFQUFpQyxVQUFTeEQsQ0FBVCxFQUFXO0FBQUNBLFFBQUFBLENBQUMsQ0FBQytCLGNBQUY7QUFBbUI4TixRQUFBQSxhQUFhLENBQUM7QUFBQ08sVUFBQUEsV0FBVyxFQUFDO0FBQWIsU0FBRCxDQUFiO0FBQWtDLE9BQWxHO0FBQW9HOztBQUFBLFFBQUlLLGNBQWMsR0FBQztBQUFDckIsTUFBQUEsWUFBWSxFQUFDLFNBQWQ7QUFBd0JhLE1BQUFBLG9CQUFvQixFQUFDLGtCQUE3QztBQUFnRUMsTUFBQUEsMEJBQTBCLEVBQUMsc0JBQTNGO0FBQWtIVCxNQUFBQSxjQUFjLEVBQUMsRUFBakk7QUFBb0lVLE1BQUFBLGNBQWMsRUFBQztBQUFuSixLQUFuQjs7QUFBZ0wsYUFBU2pCLFNBQVQsQ0FBbUJyTSxPQUFuQixFQUEyQm1OLE9BQTNCLEVBQW1DO0FBQUMsVUFBRyxDQUFDbk4sT0FBRCxJQUFVLENBQUNBLE9BQU8sQ0FBQ3RCLFFBQXRCLEVBQStCO0FBQUMsY0FBTSxJQUFJYixLQUFKLENBQVUsbUVBQVYsQ0FBTjtBQUFxRjs7QUFBQSxVQUFJZ1EsTUFBTSxHQUFDLEtBQUssQ0FBaEI7QUFBa0IsVUFBSXhKLElBQUksR0FBQ3JFLE9BQU8sQ0FBQ3RCLFFBQVIsQ0FBaUJvUCxXQUFqQixFQUFUO0FBQXdDWCxNQUFBQSxPQUFPLEdBQUMsQ0FBQyxHQUFFYixLQUFLLENBQUN2QixRQUFULEVBQW1Cb0MsT0FBbkIsRUFBMkJTLGNBQTNCLENBQVI7O0FBQW1ELFVBQUd2SixJQUFJLEtBQUcsTUFBVixFQUFpQjtBQUFDd0osUUFBQUEsTUFBTSxHQUFDN04sT0FBTyxDQUFDeEIsZ0JBQVIsQ0FBeUIseUJBQXpCLENBQVA7QUFBMkR1UCxRQUFBQSxpQkFBaUIsQ0FBQy9OLE9BQUQsRUFBUzZOLE1BQVQsQ0FBakI7QUFBa0MsT0FBL0csTUFBb0gsSUFBR3hKLElBQUksS0FBRyxPQUFQLElBQWdCQSxJQUFJLEtBQUcsUUFBdkIsSUFBaUNBLElBQUksS0FBRyxVQUEzQyxFQUFzRDtBQUFDd0osUUFBQUEsTUFBTSxHQUFDLENBQUM3TixPQUFELENBQVA7QUFBaUIsT0FBeEUsTUFBNEU7QUFBQyxjQUFNLElBQUluQyxLQUFKLENBQVUsOERBQVYsQ0FBTjtBQUFnRjs7QUFBQW1RLE1BQUFBLGVBQWUsQ0FBQ0gsTUFBRCxFQUFRVixPQUFSLENBQWY7QUFBZ0M7O0FBQUEsYUFBU1ksaUJBQVQsQ0FBMkJFLElBQTNCLEVBQWdDSixNQUFoQyxFQUF1QztBQUFDLFVBQUlLLFVBQVUsR0FBQyxDQUFDLEdBQUU1QixLQUFLLENBQUNuQixRQUFULEVBQW1CLEdBQW5CLEVBQXVCLFlBQVU7QUFBQyxZQUFJZ0QsV0FBVyxHQUFDRixJQUFJLENBQUNSLGFBQUwsQ0FBbUIsVUFBbkIsQ0FBaEI7QUFBK0MsWUFBR1UsV0FBSCxFQUFlQSxXQUFXLENBQUNDLEtBQVo7QUFBb0IsT0FBcEgsQ0FBZjtBQUFxSSxPQUFDLEdBQUU5QixLQUFLLENBQUNwQixPQUFULEVBQWtCMkMsTUFBbEIsRUFBeUIsVUFBUzdILEtBQVQsRUFBZTtBQUFDLGVBQU9BLEtBQUssQ0FBQ3JGLGdCQUFOLENBQXVCLFNBQXZCLEVBQWlDdU4sVUFBakMsQ0FBUDtBQUFvRCxPQUE3RjtBQUErRjs7QUFBQSxhQUFTRixlQUFULENBQXlCSCxNQUF6QixFQUFnQ1YsT0FBaEMsRUFBd0M7QUFBQyxVQUFJWixZQUFZLEdBQUNZLE9BQU8sQ0FBQ1osWUFBekI7QUFBQSxVQUFzQ0ssY0FBYyxHQUFDTyxPQUFPLENBQUNQLGNBQTdEO0FBQTRFLE9BQUMsR0FBRU4sS0FBSyxDQUFDcEIsT0FBVCxFQUFrQjJDLE1BQWxCLEVBQXlCLFVBQVM3SCxLQUFULEVBQWU7QUFBQ3lFLFFBQUFBLGtCQUFrQixDQUFDekUsS0FBRCxFQUFPdUcsWUFBUCxDQUFsQjtBQUF1QzdCLFFBQUFBLG9CQUFvQixDQUFDMUUsS0FBRCxFQUFPNEcsY0FBUCxDQUFwQjtBQUEyQ2pDLFFBQUFBLDBCQUEwQixDQUFDM0UsS0FBRCxFQUFPbUgsT0FBUCxDQUExQjtBQUEwQyxPQUFySztBQUF1SztBQUFDLEdBQXZnSCxFQUF3Z0g7QUFBQyxjQUFTO0FBQVYsR0FBeGdIO0FBQTVtRCxDQUE1YyxFQUEra0wsRUFBL2tMLEVBQWtsTCxDQUFDLENBQUQsQ0FBbGxMOzs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBOztBQUFDLENBQUMsVUFBV2tCLENBQVgsRUFBY3ZSLE1BQWQsRUFBc0J5QixRQUF0QixFQUFnQ2tOLFNBQWhDLEVBQTRDO0FBRTVDO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBRUE7QUFDQSxNQUFJNkMsVUFBVSxHQUFHLGlCQUFqQjtBQUFBLE1BQ0F2RCxRQUFRLEdBQUc7QUFDVCxhQUFVLEtBREQ7QUFDUTtBQUNqQiw4QkFBMkIsRUFGbEI7QUFHVCxpQkFBYyxFQUhMO0FBSVQsa0JBQWUsZ0JBSk47QUFLVCxxQkFBa0IsMEJBTFQ7QUFNVCxzQkFBbUIsRUFOVjtBQU9ULHlCQUFzQixxQkFQYjtBQVFULHFCQUFrQixTQVJUO0FBU1QsNEJBQXdCLFNBVGY7QUFVVCw2QkFBMEIsVUFWakI7QUFXVCwrQkFBNEIsc0JBWG5CO0FBWVQsa0NBQStCLHdCQVp0QjtBQWFULGtCQUFlLG9CQWJOO0FBY1QsNkJBQTBCLG1DQWRqQjtBQWNzRDtBQUMvRCxnQ0FBNkIsaUJBZnBCO0FBZ0JULGtDQUErQixvQkFoQnRCO0FBaUJULDRCQUF5QixjQWpCaEI7QUFrQlQsbUNBQWdDLDZCQWxCdkI7QUFtQlQscUJBQWtCLDJCQW5CVDtBQW9CVCx5Q0FBc0MsMkJBcEI3QjtBQXFCVCwrQkFBNEIsa0NBckJuQjtBQXFCdUQ7QUFDaEUsMkJBQXdCLGVBdEJmO0FBc0JnQztBQUN6QyxnQ0FBNkIsb0JBdkJwQjtBQXVCMEM7QUFDbkQsMEJBQXVCLFlBeEJkO0FBeUJULHFDQUFrQyx1QkF6QnpCO0FBMEJULGdDQUE2QixzQkExQnBCO0FBMkJULHNDQUFtQyx3QkEzQjFCO0FBNEJULGlDQUE4QiwrQkE1QnJCO0FBNkJULGlDQUE4QiwrQkE3QnJCO0FBOEJULGlDQUE4QixpQkE5QnJCO0FBK0JULDRCQUF5QixRQS9CaEI7QUFnQ1QsK0JBQTRCLFdBaENuQjtBQWlDVCxpQ0FBOEIsYUFqQ3JCO0FBa0NULGdDQUE2QixZQWxDcEI7QUFtQ1QscUNBQWtDLGlCQW5DekI7QUFvQ1QsbUNBQWdDLGVBcEN2QjtBQXFDVCxvQ0FBaUMsZ0JBckN4QjtBQXNDVCxrQ0FBOEIsY0F0Q3JCO0FBdUNULHNDQUFtQyxrQkF2QzFCO0FBd0NULHFDQUFrQyxpQkF4Q3pCO0FBeUNULG1DQUErQixlQXpDdEI7QUEwQ1QsdUNBQW9DLG1CQTFDM0I7QUEyQ1QsMEJBQXVCLGtCQTNDZDtBQTRDVCx5QkFBc0IsdUJBNUNiO0FBNkNULCtCQUE0QixzQkE3Q25CO0FBOENULHlCQUFzQixpQ0E5Q2I7QUErQ1Qsc0JBQW1CLHdCQS9DVjtBQWdEVCwrQkFBNEIsaUJBaERuQjtBQWlEVCx1QkFBb0IsY0FqRFg7QUFrRFQsdUJBQW9CLGNBbERYO0FBbURULHVCQUFvQixXQW5EWDtBQW9EVCwyQkFBd0IsZUFwRGY7QUFxRFQsdUJBQW9CLFdBckRYO0FBcUR3QjtBQUNqQyxpQ0FBOEI7QUF0RHJCLEdBRFgsQ0FaNEMsQ0FvRXpDO0FBRUg7O0FBQ0EsV0FBU3dELE1BQVQsQ0FBaUJ2TyxPQUFqQixFQUEwQm1OLE9BQTFCLEVBQW9DO0FBRWxDLFNBQUtuTixPQUFMLEdBQWVBLE9BQWYsQ0FGa0MsQ0FJbEM7QUFDQTtBQUNBO0FBQ0E7O0FBQ0EsU0FBS21OLE9BQUwsR0FBZWtCLENBQUMsQ0FBQ0csTUFBRixDQUFVLEVBQVYsRUFBY3pELFFBQWQsRUFBd0JvQyxPQUF4QixDQUFmO0FBRUEsU0FBS3NCLFNBQUwsR0FBaUIxRCxRQUFqQjtBQUNBLFNBQUsyRCxLQUFMLEdBQWFKLFVBQWI7QUFFQSxTQUFLSyxJQUFMO0FBQ0QsR0FyRjJDLENBcUYxQzs7O0FBRUZKLEVBQUFBLE1BQU0sQ0FBQ0ssU0FBUCxHQUFtQjtBQUVqQkQsSUFBQUEsSUFBSSxFQUFFLGNBQVNFLEtBQVQsRUFBZ0JDLE1BQWhCLEVBQXdCO0FBRTlCdlEsTUFBQUEsUUFBUSxDQUFDd1EsZUFBVCxDQUF5QjlOLFNBQXpCLENBQW1DUSxNQUFuQyxDQUEyQyxPQUEzQztBQUNBbEQsTUFBQUEsUUFBUSxDQUFDd1EsZUFBVCxDQUF5QjlOLFNBQXpCLENBQW1DQyxHQUFuQyxDQUF3QyxJQUF4QyxFQUg4QixDQUs1QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBOztBQUNBLFVBQUkyTixLQUFLLEtBQUssSUFBZCxFQUFvQjtBQUNsQixhQUFLMUIsT0FBTCxDQUFhMkIsTUFBYixHQUFzQkUsVUFBVSxDQUFDWCxDQUFDLENBQUMsS0FBS2xCLE9BQUwsQ0FBYThCLHFCQUFkLEVBQXFDLEtBQUtqUCxPQUExQyxDQUFELENBQW9EcEIsSUFBcEQsRUFBRCxDQUFoQztBQUNELE9BRkQsTUFFTztBQUNMLGFBQUt1TyxPQUFMLENBQWEyQixNQUFiLEdBQXNCQSxNQUF0QjtBQUNEOztBQUNELFdBQUszQixPQUFMLENBQWErQixlQUFiLEdBQW1DakssUUFBUSxDQUFDb0osQ0FBQyxDQUFDLEtBQUtsQixPQUFMLENBQWFnQyx3QkFBZCxFQUF3QyxLQUFLblAsT0FBN0MsQ0FBRCxDQUF1RGxCLEdBQXZELEVBQUQsRUFBK0QsRUFBL0QsQ0FBM0M7QUFDQSxXQUFLcU8sT0FBTCxDQUFhaUMsY0FBYixHQUFtQyxDQUFDQyxJQUFJLENBQUNDLEtBQUwsQ0FBV04sVUFBVSxDQUFDLEtBQUs3QixPQUFMLENBQWFvQyxVQUFkLENBQVYsR0FBb0NGLElBQUksQ0FBQ0csR0FBTCxDQUFTLEVBQVQsRUFBWSxDQUFaLENBQS9DLElBQStESCxJQUFJLENBQUNHLEdBQUwsQ0FBUyxFQUFULEVBQVksQ0FBWixDQUFoRSxFQUFnRkMsT0FBaEYsQ0FBd0YsQ0FBeEYsQ0FBbkM7QUFDQSxXQUFLdEMsT0FBTCxDQUFhdUMsbUJBQWIsR0FBbUMsS0FBS3ZDLE9BQUwsQ0FBYWlDLGNBQWhEO0FBQ0EsV0FBS2pDLE9BQUwsQ0FBYXdDLGNBQWIsR0FBbUMsS0FBbkM7QUFFQSxVQUFJQyxXQUFXLEdBQUd2QixDQUFDLENBQUMsS0FBS2xCLE9BQUwsQ0FBYTBDLG1CQUFkLENBQUQsQ0FBb0NqUixJQUFwQyxFQUFsQjtBQUNBLFdBQUt1TyxPQUFMLENBQWF5QyxXQUFiLEdBQTJCQSxXQUEzQjtBQUVBLFdBQUtFLE1BQUwsR0FBY0MsTUFBTSxDQUFDLEtBQUs1QyxPQUFMLENBQWE2QyxzQkFBZCxDQUFwQjtBQUNBLFdBQUtDLFFBQUwsR0FBZ0IsS0FBS0gsTUFBTCxDQUFZRyxRQUFaLENBQXFCO0FBQ25DQyxRQUFBQSxLQUFLLEVBQUUsQ0FDTDtBQUNFO0FBQ0FDLFVBQUFBLE1BQU0sRUFBRTtBQUZWLFNBREs7QUFENEIsT0FBckIsQ0FBaEI7O0FBU0EsVUFBSSxLQUFLaEQsT0FBTCxDQUFhaUQsS0FBYixLQUF1QixJQUEzQixFQUFpQztBQUMvQixhQUFLQSxLQUFMLENBQVcsS0FBS2pELE9BQWhCLEVBRCtCLENBRS9CO0FBQ0QsT0F4QzJCLENBMEM1Qjs7O0FBQ0EsV0FBS2tELGlCQUFMLENBQXVCLEtBQUtsRCxPQUE1QixFQTNDNEIsQ0EyQ1U7O0FBQ3RDLFdBQUttRCxhQUFMLENBQW1CLEtBQUt0USxPQUF4QixFQUFpQyxLQUFLbU4sT0FBdEMsRUE1QzRCLENBNENvQjs7QUFDaEQsV0FBS29ELGFBQUwsQ0FBbUIsS0FBS3ZRLE9BQXhCLEVBQWlDLEtBQUttTixPQUF0QyxFQTdDNEIsQ0E2Q29COztBQUVoRCxVQUFJa0IsQ0FBQyxDQUFDLEtBQUtsQixPQUFMLENBQWFxRCwwQkFBZCxDQUFELENBQTJDdlMsTUFBM0MsR0FBb0QsQ0FBeEQsRUFBMkQ7QUFDekQsYUFBS3dTLHdCQUFMLENBQThCLEtBQUt0RCxPQUFuQyxFQUR5RCxDQUNaO0FBQzlDLE9BakQyQixDQW1ENUI7OztBQUNBLFVBQUlrQixDQUFDLENBQUMsS0FBS2xCLE9BQUwsQ0FBYXVELG9CQUFkLENBQUQsQ0FBcUN6UyxNQUFyQyxHQUE4QyxDQUFsRCxFQUFxRDtBQUNuRCxhQUFLMFMsaUJBQUwsQ0FBdUIsS0FBSzNRLE9BQTVCLEVBQXFDLEtBQUttTixPQUExQyxFQURtRCxDQUNDOztBQUNwRCxhQUFLeUQsbUJBQUwsQ0FBeUIsS0FBSzVRLE9BQTlCLEVBQXVDLEtBQUttTixPQUE1QyxFQUZtRCxDQUVHOztBQUN0RCxhQUFLMEQsbUJBQUwsQ0FBeUIsS0FBSzdRLE9BQTlCLEVBQXVDLEtBQUttTixPQUE1QyxFQUhtRCxDQUdHOztBQUN0RCxhQUFLMkQsZUFBTCxDQUFxQixLQUFLOVEsT0FBMUIsRUFBbUMsS0FBS21OLE9BQXhDLEVBSm1ELENBSUQ7O0FBQ2xELGFBQUs0RCxvQkFBTCxDQUEwQixLQUFLL1EsT0FBL0IsRUFBd0MsS0FBS21OLE9BQTdDLEVBTG1ELENBS0k7O0FBQ3ZELGFBQUs2RCxvQkFBTCxDQUEwQixLQUFLaFIsT0FBL0IsRUFBd0MsS0FBS21OLE9BQTdDLEVBTm1ELENBTUk7O0FBQ3ZELGFBQUs4RCxtQkFBTCxDQUF5QixLQUFLalIsT0FBOUIsRUFBdUMsS0FBS21OLE9BQTVDLEVBUG1ELENBT0c7O0FBQ3RELGFBQUsrRCxnQkFBTCxDQUFzQixLQUFLbFIsT0FBM0IsRUFBb0MsS0FBS21OLE9BQXpDLEVBUm1ELENBUUE7O0FBQ25ELGFBQUtnRSxhQUFMLENBQW1CLEtBQUtuUixPQUF4QixFQUFpQyxLQUFLbU4sT0FBdEMsRUFUbUQsQ0FTSDs7QUFDaEQsYUFBS2lFLFNBQUwsQ0FBZSxLQUFLcFIsT0FBcEIsRUFBNkIsS0FBS21OLE9BQWxDLEVBVm1ELENBVVA7QUFDN0M7O0FBRUQsVUFBSWtCLENBQUMsQ0FBQyxLQUFLbEIsT0FBTCxDQUFha0UscUJBQWQsQ0FBRCxDQUFzQ3BULE1BQXRDLEdBQStDLENBQW5ELEVBQXNEO0FBQ3BELGFBQUtxVCxzQkFBTCxDQUE0QixLQUFLdFIsT0FBakMsRUFBMEMsS0FBS21OLE9BQS9DO0FBQ0EsYUFBS29FLG9CQUFMLENBQTBCLEtBQUt2UixPQUEvQixFQUF3QyxLQUFLbU4sT0FBN0MsRUFGb0QsQ0FFRztBQUN4RDtBQUVGLEtBeEVnQjtBQXdFZDtBQUVIaUQsSUFBQUEsS0FBSyxFQUFFLGVBQVNuRCxPQUFULEVBQWtCO0FBQ3ZCLFVBQUksS0FBS0UsT0FBTCxDQUFhaUQsS0FBYixLQUF1QixJQUEzQixFQUFpQztBQUMvQixZQUFJLFFBQU9uRCxPQUFQLE1BQW1CLFFBQXZCLEVBQWlDO0FBQy9CdUUsVUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVl4RSxPQUFaO0FBQ0QsU0FGRCxNQUVPO0FBQ0x1RSxVQUFBQSxPQUFPLENBQUNFLEdBQVIsQ0FBWXpFLE9BQVo7QUFDRDs7QUFDRHVFLFFBQUFBLE9BQU8sQ0FBQ0UsR0FBUixDQUFZLElBQVo7QUFDRDtBQUNGLEtBbkZnQjtBQW1GZDtBQUVIckIsSUFBQUEsaUJBQWlCLEVBQUUsMkJBQVNsRCxPQUFULEVBQWtCO0FBQ25DLFdBQUtpRCxLQUFMLENBQVcsdUJBQXVCakQsT0FBTyxDQUFDd0UsY0FBMUM7QUFDQSxVQUFJQyxRQUFRLEdBQUd2RCxDQUFDLENBQUNsQixPQUFPLENBQUMwRSxpQkFBVCxDQUFoQjtBQUNBLFVBQUlDLElBQUo7QUFDQSxVQUFJQyxNQUFNLEdBQUcsVUFBYjtBQUNBLFVBQUlDLGNBQWMsR0FBRyxDQUFyQjtBQUNBLFVBQUlDLE1BQU0sR0FBRzVELENBQUMsQ0FBQ2xCLE9BQU8sQ0FBQytFLGVBQVQsQ0FBRCxDQUEyQnBULEdBQTNCLEVBQWI7QUFDQSxVQUFJcVQsYUFBYSxHQUFHLEtBQXBCOztBQUNBLFVBQUloRixPQUFPLENBQUN3RSxjQUFSLElBQTBCLGFBQTlCLEVBQTZDO0FBQzNDUyxRQUFBQSxFQUFFLENBQUUsU0FBRixFQUFhLElBQWIsQ0FBRjtBQUNEOztBQUNELFVBQUlSLFFBQVEsQ0FBQzNULE1BQVQsR0FBa0IsQ0FBdEIsRUFBeUI7QUFDdkIrVCxRQUFBQSxjQUFjLEdBQUczRCxDQUFDLENBQUMsSUFBRCxFQUFPdUQsUUFBUCxDQUFELENBQWtCM1QsTUFBbkMsQ0FEdUIsQ0FDb0I7O0FBQzNDNlQsUUFBQUEsSUFBSSxHQUFHekQsQ0FBQyxDQUFDLFlBQUQsRUFBZXVELFFBQWYsQ0FBRCxDQUEwQjdGLE1BQTFCLEdBQW1Dc0csS0FBbkMsS0FBNkMsQ0FBcEQsQ0FGdUIsQ0FFZ0M7QUFDeEQsT0Fka0MsQ0FlbkM7QUFDQTs7O0FBQ0EsVUFBSVQsUUFBUSxDQUFDM1QsTUFBVCxHQUFrQixDQUFsQixJQUF1Qm9RLENBQUMsQ0FBQ2xCLE9BQU8sQ0FBQ2tFLHFCQUFULENBQUQsQ0FBaUNwVCxNQUFqQyxLQUE0QyxDQUF2RSxFQUEwRTtBQUN4RTtBQUNBO0FBQ0EsWUFBSTZULElBQUksS0FBS0UsY0FBVCxJQUEyQjNELENBQUMsQ0FBQ2xCLE9BQU8sQ0FBQ2tFLHFCQUFULENBQUQsQ0FBaUNwVCxNQUFqQyxLQUE0QyxDQUEzRSxFQUE4RTtBQUM1RTZULFVBQUFBLElBQUksR0FBR0EsSUFBSSxHQUFHLENBQWQ7QUFDQUssVUFBQUEsYUFBYSxHQUFHLElBQWhCO0FBQ0Q7QUFDRixPQVBELE1BT08sSUFBSVAsUUFBUSxDQUFDM1QsTUFBVCxHQUFrQixDQUFsQixJQUF1Qm9RLENBQUMsQ0FBQ2xCLE9BQU8sQ0FBQ2tFLHFCQUFULENBQUQsQ0FBaUNwVCxNQUFqQyxHQUEwQyxDQUFqRSxJQUFzRW9RLENBQUMsQ0FBQ2xCLE9BQU8sQ0FBQ21GLHVCQUFULENBQUQsQ0FBbUNyVSxNQUFuQyxHQUE0QyxDQUF0SCxFQUF5SDtBQUM5SDtBQUNBO0FBQ0E7QUFDQThULFFBQUFBLE1BQU0sR0FBRyxVQUFUO0FBQ0QsT0FMTSxNQUtBLElBQUlILFFBQVEsQ0FBQzNULE1BQVQsS0FBb0IsQ0FBeEIsRUFBMkI7QUFDaEM7QUFDRDs7QUFDRCxXQUFLbVMsS0FBTCxDQUFZLGFBQWEwQixJQUFiLEdBQW9CLHlCQUFwQixHQUFnREUsY0FBaEQsR0FBaUUsaUJBQWpFLEdBQXFGQyxNQUFyRixHQUE4Rix3QkFBOUYsR0FBeUhFLGFBQXJJO0FBQ0EsV0FBS0kscUJBQUwsQ0FBMkJULElBQTNCLEVBQWlDQyxNQUFqQyxFQUF5Q0ksYUFBekM7QUFDRCxLQXZIZ0I7QUF1SGQ7QUFFSEksSUFBQUEscUJBQXFCLEVBQUUsK0JBQVNULElBQVQsRUFBZUMsTUFBZixFQUF1QkksYUFBdkIsRUFBc0M7QUFDM0QsVUFBSVAsUUFBUSxHQUFHdkQsQ0FBQyxDQUFDLEtBQUtsQixPQUFMLENBQWEwRSxpQkFBZCxDQUFoQjtBQUNBLFVBQUkvQyxNQUFNLEdBQUdULENBQUMsQ0FBQyxLQUFLbEIsT0FBTCxDQUFhZ0Msd0JBQWQsQ0FBRCxDQUF5Q3JRLEdBQXpDLEVBQWI7QUFDQSxVQUFJbVQsTUFBTSxHQUFHNUQsQ0FBQyxDQUFDLEtBQUtsQixPQUFMLENBQWErRSxlQUFkLENBQUQsQ0FBZ0NwVCxHQUFoQyxFQUFiO0FBQ0EsVUFBSTBULGtCQUFrQixHQUFHLFVBQXpCO0FBQ0EsVUFBSUMsS0FBSjtBQUNBLFVBQUlDLElBQUksR0FBRyxJQUFYOztBQUNBLFVBQUlyRSxDQUFDLENBQUMsS0FBS2xCLE9BQUwsQ0FBYXdGLDJCQUFkLENBQUQsQ0FBNEMxVSxNQUE1QyxHQUFxRCxDQUF6RCxFQUE2RDtBQUMzRHVVLFFBQUFBLGtCQUFrQixHQUFHbkUsQ0FBQyxDQUFDLEtBQUtsQixPQUFMLENBQWF3RiwyQkFBZCxDQUFELENBQTRDN1QsR0FBNUMsRUFBckI7QUFDRCxPQVQwRCxDQVUzRDtBQUNBOzs7QUFDQSxVQUFJOFMsUUFBUSxDQUFDM1QsTUFBVCxHQUFrQixDQUF0QixFQUF5QjtBQUN2QixZQUFJMEIsSUFBSSxHQUFHO0FBQ1RtUCxVQUFBQSxNQUFNLEVBQUVBLE1BREM7QUFFVDBELFVBQUFBLGtCQUFrQixFQUFFQTtBQUZYLFNBQVg7QUFJQW5FLFFBQUFBLENBQUMsQ0FBQ3VFLElBQUYsQ0FBTztBQUNMQyxVQUFBQSxNQUFNLEVBQUUsTUFESDtBQUVMQyxVQUFBQSxHQUFHLEVBQUUsMEJBRkE7QUFHTG5ULFVBQUFBLElBQUksRUFBRUE7QUFIRCxTQUFQLEVBSUdvVCxJQUpILENBSVEsVUFBVXBULElBQVYsRUFBaUI7QUFDdkIsY0FBSTBPLENBQUMsQ0FBQzFPLElBQUksQ0FBQzhTLEtBQU4sQ0FBRCxDQUFjeFUsTUFBZCxHQUF1QixDQUEzQixFQUE4QjtBQUM1QndVLFlBQUFBLEtBQUssR0FBRzlTLElBQUksQ0FBQzhTLEtBQUwsQ0FBV0EsS0FBbkI7QUFDQUMsWUFBQUEsSUFBSSxDQUFDdEMsS0FBTCxDQUFXLGtDQUFrQyxXQUFsQyxHQUFnRHFDLEtBQUssQ0FBQzNFLFdBQU4sRUFBaEQsR0FBc0UsYUFBdEUsR0FBc0YsZUFBdEYsR0FBd0csV0FBeEcsR0FBc0gyRSxLQUFLLENBQUNPLE1BQU4sQ0FBYSxDQUFiLEVBQWdCQyxXQUFoQixFQUF0SCxHQUFzSlIsS0FBSyxDQUFDOUwsS0FBTixDQUFZLENBQVosQ0FBdEosR0FBdUssYUFBdkssR0FBdUwsa0JBQXZMLEdBQTRNNkwsa0JBQWtCLENBQUNRLE1BQW5CLENBQTBCLENBQTFCLEVBQTZCQyxXQUE3QixFQUE1TSxHQUF5UFQsa0JBQWtCLENBQUM3TCxLQUFuQixDQUF5QixDQUF6QixDQUFwUTtBQUNBLGdCQUFJdU0sT0FBTyxHQUFHO0FBQ1osb0JBQU0sY0FBY1QsS0FBSyxDQUFDM0UsV0FBTixFQUFkLEdBQW9DLGFBRDlCO0FBRVosc0JBQVEsY0FBYzJFLEtBQUssQ0FBQ08sTUFBTixDQUFhLENBQWIsRUFBZ0JDLFdBQWhCLEVBQWQsR0FBOENSLEtBQUssQ0FBQzlMLEtBQU4sQ0FBWSxDQUFaLENBQTlDLEdBQStELGFBRjNEO0FBR1osMEJBQVksVUFIQTtBQUlaLHVCQUFTLFVBSkc7QUFLWix5QkFBVzZMLGtCQUFrQixDQUFDUSxNQUFuQixDQUEwQixDQUExQixFQUE2QkMsV0FBN0IsS0FBNkNULGtCQUFrQixDQUFDN0wsS0FBbkIsQ0FBeUIsQ0FBekIsQ0FMNUM7QUFNWix1QkFBUytMLElBQUksQ0FBQ1MsY0FBTCxDQUFvQnJFLE1BQXBCLENBTkc7QUFPWiwwQkFBWTtBQVBBLGFBQWQ7O0FBU0EsZ0JBQUk0RCxJQUFJLENBQUN2RixPQUFMLENBQWF3RSxjQUFiLElBQStCLFFBQW5DLEVBQTZDO0FBQzNDeUIsY0FBQUEsSUFBSSxDQUFDLE9BQUQsRUFBVSxtQkFBVixFQUErQjtBQUNqQyx5QkFBU1YsSUFBSSxDQUFDUyxjQUFMLENBQW9CckUsTUFBcEIsQ0FEd0I7QUFFakMseUJBQVMsQ0FBQ29FLE9BQUQsQ0FGd0I7QUFHakMsaUNBQWlCcEIsSUFIZ0I7QUFJakMsbUNBQW1CQztBQUpjLGVBQS9CLENBQUo7QUFNRCxhQVBELE1BT08sSUFBSVcsSUFBSSxDQUFDdkYsT0FBTCxDQUFhd0UsY0FBYixJQUErQixhQUFuQyxFQUFrRDtBQUN2RFMsY0FBQUEsRUFBRSxDQUFDLGVBQUQsRUFBa0JjLE9BQWxCLENBQUY7QUFDRDs7QUFFRCxnQkFBSW5CLE1BQU0sS0FBSyxVQUFmLEVBQTJCO0FBQ3pCVyxjQUFBQSxJQUFJLENBQUN0QyxLQUFMLENBQVcsb0NBQW9DMEIsSUFBcEMsR0FBMkMsaUJBQTNDLEdBQStEQyxNQUExRTs7QUFDQSxrQkFBSVcsSUFBSSxDQUFDdkYsT0FBTCxDQUFhd0UsY0FBYixJQUErQixRQUFuQyxFQUE2QztBQUMzQ3lCLGdCQUFBQSxJQUFJLENBQUMsT0FBRCxFQUFVckIsTUFBVixFQUFrQjtBQUNwQixvQ0FBa0JFLE1BREU7QUFDTTtBQUMxQixpQ0FBZSxVQUZLO0FBRU87QUFDM0IsMkJBQVNTLElBQUksQ0FBQ1MsY0FBTCxDQUFvQnJFLE1BQXBCLENBSFc7QUFHa0I7QUFDdEMsOEJBQVksS0FKUTtBQUtwQiwyQkFBUyxDQUFDb0UsT0FBRCxDQUxXO0FBTXBCLG1DQUFpQnBCO0FBTkcsaUJBQWxCLENBQUo7QUFRRCxlQVRELE1BU08sSUFBSVksSUFBSSxDQUFDdkYsT0FBTCxDQUFhd0UsY0FBYixJQUErQixhQUFuQyxFQUFrRDtBQUN2RFMsZ0JBQUFBLEVBQUUsQ0FBQyxjQUFELEVBQWlCTCxNQUFqQixFQUF5QjtBQUN6Qix3QkFBTUUsTUFEbUI7QUFDWDtBQUNkLGlDQUFlLFVBRlU7QUFFRTtBQUMzQiw2QkFBV25ELE1BSGM7QUFHTjtBQUNuQiwwQkFBUWdEO0FBSmlCLGlCQUF6QixDQUFGO0FBTUQ7QUFDRjs7QUFFRCxnQkFBSVksSUFBSSxDQUFDdkYsT0FBTCxDQUFhd0UsY0FBYixJQUErQixRQUFuQyxFQUE2QztBQUMzQ3lCLGNBQUFBLElBQUksQ0FBQyxPQUFELEVBQVUsV0FBVixFQUF1QjtBQUN6QkMsZ0JBQUFBLFVBQVUsRUFBRTlVLFFBQVEsQ0FBQ29MLEtBREk7QUFFekIySixnQkFBQUEsU0FBUyxFQUFFeFcsTUFBTSxDQUFDeVcsUUFBUCxDQUFnQkM7QUFGRixlQUF2QixDQUFKO0FBSUQsYUFMRCxNQUtPLElBQUlkLElBQUksQ0FBQ3ZGLE9BQUwsQ0FBYXdFLGNBQWIsSUFBK0IsYUFBbkMsRUFBa0Q7QUFDdkRTLGNBQUFBLEVBQUUsQ0FBQyxLQUFELEVBQVE7QUFDUnFCLGdCQUFBQSxJQUFJLEVBQUUzVyxNQUFNLENBQUN5VyxRQUFQLENBQWdCQyxRQURkO0FBRVI3SixnQkFBQUEsS0FBSyxFQUFFcEwsUUFBUSxDQUFDb0w7QUFGUixlQUFSLENBQUY7QUFJQXlJLGNBQUFBLEVBQUUsQ0FBQyxNQUFELEVBQVMsVUFBVCxFQUFxQnRWLE1BQU0sQ0FBQ3lXLFFBQVAsQ0FBZ0JDLFFBQXJDLENBQUY7QUFDRDtBQUVGO0FBQ0YsU0EvREQ7QUFnRUQ7QUFJRixLQTlNZ0I7QUE4TWQ7QUFFSGxELElBQUFBLGFBQWEsRUFBRSx1QkFBU3RRLE9BQVQsRUFBa0JtTixPQUFsQixFQUEyQjtBQUN4QztBQUNBLFVBQUl1RixJQUFJLEdBQUcsSUFBWDtBQUNBQSxNQUFBQSxJQUFJLENBQUNnQixjQUFMLENBQW9CckYsQ0FBQyxDQUFDbEIsT0FBTyxDQUFDZ0Msd0JBQVQsRUFBbUNuUCxPQUFuQyxDQUFyQixFQUFrRUEsT0FBbEUsRUFBMkVtTixPQUEzRTtBQUNBa0IsTUFBQUEsQ0FBQyxDQUFDbEIsT0FBTyxDQUFDZ0Msd0JBQVQsRUFBbUNuUCxPQUFuQyxDQUFELENBQTZDMlQsTUFBN0MsQ0FBb0QsWUFBVztBQUM3RGpCLFFBQUFBLElBQUksQ0FBQ2dCLGNBQUwsQ0FBb0JyRixDQUFDLENBQUMsSUFBRCxDQUFyQixFQUE2QnJPLE9BQTdCLEVBQXNDbU4sT0FBdEM7QUFDRCxPQUZEO0FBR0QsS0F2TmdCO0FBdU5kO0FBRUh1RyxJQUFBQSxjQUFjLEVBQUUsd0JBQVNFLEtBQVQsRUFBZ0I1VCxPQUFoQixFQUF5Qm1OLE9BQXpCLEVBQWtDO0FBQ2hELFVBQUl1RixJQUFJLEdBQUcsSUFBWDtBQUNBLFVBQUltQixtQkFBbUIsR0FBR25CLElBQUksQ0FBQ29CLG9CQUFMLEVBQTFCO0FBQ0EsVUFBSWhGLE1BQU0sR0FBR1QsQ0FBQyxDQUFDbEIsT0FBTyxDQUFDZ0Msd0JBQVIsR0FBbUMsVUFBcEMsRUFBZ0RuUCxPQUFoRCxDQUFELENBQTBEbEIsR0FBMUQsRUFBYjs7QUFDQSxVQUFJOFUsS0FBSyxDQUFDRyxFQUFOLENBQVMsUUFBVCxLQUFzQixPQUFPakYsTUFBUCxLQUFrQixXQUE1QyxFQUF5RDtBQUN2RDNCLFFBQUFBLE9BQU8sQ0FBQytCLGVBQVIsR0FBMEJqSyxRQUFRLENBQUM2SixNQUFELEVBQVMsRUFBVCxDQUFsQztBQUNBNEQsUUFBQUEsSUFBSSxDQUFDc0IsYUFBTCxDQUFtQnRCLElBQUksQ0FBQ3ZGLE9BQUwsQ0FBYStCLGVBQWhDLEVBQWlEMkUsbUJBQWpEO0FBQ0FuQixRQUFBQSxJQUFJLENBQUN1QixrQkFBTCxDQUF3QkwsS0FBeEI7QUFDRDtBQUNGLEtBbE9nQjtBQWtPZDtBQUVIckQsSUFBQUEsYUFBYSxFQUFFLHVCQUFTdlEsT0FBVCxFQUFrQm1OLE9BQWxCLEVBQTJCO0FBQ3hDO0FBQ0E7QUFDQSxVQUFJdUYsSUFBSSxHQUFHLElBQVg7QUFDQSxVQUFJbUIsbUJBQW1CLEdBQUduQixJQUFJLENBQUNvQixvQkFBTCxFQUExQixDQUp3QyxDQU14Qzs7QUFDQSxVQUFJSSwyQkFBMkIsR0FBRzdGLENBQUMsQ0FBQ2xCLE9BQU8sQ0FBQ2dDLHdCQUFULEVBQW1DblAsT0FBbkMsQ0FBbkM7O0FBQ0EsVUFBSWtVLDJCQUEyQixDQUFDSCxFQUE1QixDQUErQixRQUEvQixDQUFKLEVBQThDO0FBQzVDRyxRQUFBQSwyQkFBMkIsR0FBRzdGLENBQUMsQ0FBQ2xCLE9BQU8sQ0FBQ2dDLHdCQUFSLEdBQW1DLFVBQXBDLEVBQWdEblAsT0FBaEQsQ0FBL0I7QUFDRDs7QUFDRDBTLE1BQUFBLElBQUksQ0FBQ3VCLGtCQUFMLENBQXdCQywyQkFBeEI7QUFFQTdGLE1BQUFBLENBQUMsQ0FBQ2xCLE9BQU8sQ0FBQ2dDLHdCQUFULEVBQW1DblAsT0FBbkMsQ0FBRCxDQUE2QzJULE1BQTdDLENBQW9ELFlBQVc7QUFDN0RqQixRQUFBQSxJQUFJLENBQUN2RixPQUFMLENBQWErQixlQUFiLEdBQStCakssUUFBUSxDQUFDb0osQ0FBQyxDQUFDLElBQUQsRUFBT3JPLE9BQVAsQ0FBRCxDQUFpQmxCLEdBQWpCLEVBQUQsRUFBeUIsRUFBekIsQ0FBdkM7QUFDQTRULFFBQUFBLElBQUksQ0FBQ3NCLGFBQUwsQ0FBbUJ0QixJQUFJLENBQUN2RixPQUFMLENBQWErQixlQUFoQyxFQUFpRDJFLG1CQUFqRDtBQUNBbkIsUUFBQUEsSUFBSSxDQUFDdUIsa0JBQUwsQ0FBd0I1RixDQUFDLENBQUMsSUFBRCxFQUFPck8sT0FBUCxDQUF6QjtBQUNELE9BSkQ7QUFLQXFPLE1BQUFBLENBQUMsQ0FBQ2xCLE9BQU8sQ0FBQ2dILHVCQUFULEVBQWtDblUsT0FBbEMsQ0FBRCxDQUE0QzJULE1BQTVDLENBQW1ELFlBQVc7QUFDNURqQixRQUFBQSxJQUFJLENBQUN2RixPQUFMLENBQWErQixlQUFiLEdBQStCakssUUFBUSxDQUFDb0osQ0FBQyxDQUFDbEIsT0FBTyxDQUFDZ0Msd0JBQVQsRUFBbUNuUCxPQUFuQyxDQUFELENBQTZDbEIsR0FBN0MsRUFBRCxFQUFxRCxFQUFyRCxDQUF2QztBQUNBNFQsUUFBQUEsSUFBSSxDQUFDc0IsYUFBTCxDQUFtQnRCLElBQUksQ0FBQ3ZGLE9BQUwsQ0FBYStCLGVBQWhDLEVBQWlEMkUsbUJBQWpEO0FBQ0QsT0FIRDtBQUtELEtBM1BnQjtBQTJQZDtBQUVIVixJQUFBQSxjQUFjLEVBQUUsd0JBQVNyRSxNQUFULEVBQWlCO0FBQy9CQSxNQUFBQSxNQUFNLEdBQUksT0FBT0EsTUFBUCxLQUFrQixXQUFuQixHQUFtQ0EsTUFBbkMsR0FBNEMsS0FBSzNCLE9BQUwsQ0FBYStCLGVBQWxFO0FBQ0EsVUFBSWtGLFlBQVksR0FBR3RGLE1BQW5COztBQUNBLFVBQUlULENBQUMsQ0FBQyxLQUFLbEIsT0FBTCxDQUFhZ0gsdUJBQWQsQ0FBRCxDQUF3Q2xXLE1BQXhDLEdBQWlELENBQWpELElBQXNEb1EsQ0FBQyxDQUFDLEtBQUtsQixPQUFMLENBQWFnSCx1QkFBZCxDQUFELENBQXdDclYsR0FBeEMsS0FBZ0QsQ0FBMUcsRUFBNkc7QUFDM0csWUFBSXVWLGlCQUFpQixHQUFHaEcsQ0FBQyxDQUFDLEtBQUtsQixPQUFMLENBQWFnSCx1QkFBZCxDQUFELENBQXdDclYsR0FBeEMsRUFBeEI7QUFDQXNWLFFBQUFBLFlBQVksR0FBR25QLFFBQVEsQ0FBQ29QLGlCQUFELEVBQW9CLEVBQXBCLENBQVIsR0FBa0NwUCxRQUFRLENBQUM2SixNQUFELEVBQVMsRUFBVCxDQUF6RDtBQUNEOztBQUNELGFBQU9zRixZQUFQO0FBQ0QsS0FyUWdCO0FBcVFkO0FBRUhILElBQUFBLGtCQUFrQixFQUFFLDRCQUFTSyxlQUFULEVBQTBCO0FBQzVDO0FBQ0E7QUFDQSxVQUFJakcsQ0FBQyxDQUFDLEtBQUtsQixPQUFMLENBQWFvSCwwQkFBZCxDQUFELENBQTJDdFcsTUFBM0MsR0FBb0QsQ0FBcEQsSUFBeUQsT0FBT3FXLGVBQWUsQ0FBQzNVLElBQWhCLENBQXFCLG1CQUFyQixDQUFQLEtBQXFELFdBQWxILEVBQStIO0FBQzdILFlBQUk2VSxlQUFlLEdBQUdGLGVBQWUsQ0FBQzNVLElBQWhCLENBQXFCLG1CQUFyQixDQUF0QjtBQUNBME8sUUFBQUEsQ0FBQyxDQUFDLEtBQUtsQixPQUFMLENBQWFvSCwwQkFBZCxDQUFELENBQTJDelYsR0FBM0MsQ0FBK0MwVixlQUEvQztBQUNEO0FBQ0YsS0E5UWdCO0FBOFFkO0FBRUhSLElBQUFBLGFBQWEsRUFBRSx1QkFBU2xGLE1BQVQsRUFBaUIrRSxtQkFBakIsRUFBc0M7QUFDbkQ7QUFDQSxVQUFJbkIsSUFBSSxHQUFHLElBQVg7QUFDQSxVQUFJMEIsWUFBWSxHQUFHMUIsSUFBSSxDQUFDUyxjQUFMLENBQW9CckUsTUFBcEIsQ0FBbkI7QUFDQSxVQUFJblAsSUFBSSxHQUFHO0FBQ1RtUCxRQUFBQSxNQUFNLEVBQUVzRixZQURDO0FBRVRQLFFBQUFBLG1CQUFtQixFQUFFQTtBQUZaLE9BQVg7QUFJQW5CLE1BQUFBLElBQUksQ0FBQytCLG9CQUFMLENBQTBCWixtQkFBMUI7QUFDQXhGLE1BQUFBLENBQUMsQ0FBQ3VFLElBQUYsQ0FBTztBQUNMQyxRQUFBQSxNQUFNLEVBQUUsTUFESDtBQUVMQyxRQUFBQSxHQUFHLEVBQUUsa0JBRkE7QUFHTG5ULFFBQUFBLElBQUksRUFBRUE7QUFIRCxPQUFQLEVBSUdvVCxJQUpILENBSVEsVUFBVXBULElBQVYsRUFBaUI7QUFDdkIsWUFBSTBPLENBQUMsQ0FBQzFPLElBQUksQ0FBQytVLElBQU4sQ0FBRCxDQUFhelcsTUFBYixHQUFzQixDQUExQixFQUE2QjtBQUMzQm9RLFVBQUFBLENBQUMsQ0FBQ3FFLElBQUksQ0FBQ3ZGLE9BQUwsQ0FBYW9DLFVBQWQsQ0FBRCxDQUEyQjNRLElBQTNCLENBQWdDb1EsVUFBVSxDQUFDclAsSUFBSSxDQUFDK1UsSUFBTixDQUFWLENBQXNCakYsT0FBdEIsQ0FBOEIsQ0FBOUIsQ0FBaEM7QUFDQWlELFVBQUFBLElBQUksQ0FBQ2lDLHFCQUFMLENBQTJCdEcsQ0FBQyxDQUFDcUUsSUFBSSxDQUFDdkYsT0FBTCxDQUFhcUQsMEJBQWQsQ0FBNUI7QUFDRDtBQUNGLE9BVEQ7QUFVRCxLQW5TZ0I7QUFtU2Q7QUFFSEMsSUFBQUEsd0JBQXdCLEVBQUUsa0NBQVN0RCxPQUFULEVBQWtCO0FBQzFDO0FBQ0EsVUFBSXVGLElBQUksR0FBRyxJQUFYO0FBQ0FBLE1BQUFBLElBQUksQ0FBQ2lDLHFCQUFMLENBQTJCdEcsQ0FBQyxDQUFDbEIsT0FBTyxDQUFDcUQsMEJBQVQsQ0FBNUI7QUFDQW5DLE1BQUFBLENBQUMsQ0FBQ2xCLE9BQU8sQ0FBQ3FELDBCQUFULENBQUQsQ0FBc0N6USxFQUF0QyxDQUF5QyxRQUF6QyxFQUFtRCxZQUFZO0FBQzNEMlMsUUFBQUEsSUFBSSxDQUFDaUMscUJBQUwsQ0FBMkIsSUFBM0I7QUFDSCxPQUZEO0FBR0QsS0E1U2dCO0FBNFNkO0FBRUhiLElBQUFBLG9CQUFvQixFQUFFLGdDQUFXO0FBQy9CLFVBQUlELG1CQUFtQixHQUFHLE1BQTFCOztBQUNBLFVBQUl4RixDQUFDLENBQUMsbUNBQUQsQ0FBRCxDQUF1Q3BRLE1BQXZDLEdBQWdELENBQXBELEVBQXVEO0FBQ3JENFYsUUFBQUEsbUJBQW1CLEdBQUd4RixDQUFDLENBQUMsbUNBQUQsQ0FBRCxDQUF1Q3ZQLEdBQXZDLEVBQXRCO0FBQ0Q7O0FBQ0QsYUFBTytVLG1CQUFQO0FBQ0QsS0FwVGdCO0FBb1RkO0FBRUhZLElBQUFBLG9CQUFvQixFQUFFLDhCQUFTWixtQkFBVCxFQUE4QjtBQUNsRCxVQUFJeEYsQ0FBQyxDQUFDLG1DQUFELENBQUQsQ0FBdUNwUSxNQUF2QyxLQUFrRCxDQUF0RCxFQUF5RDtBQUN2RG9RLFFBQUFBLENBQUMsQ0FBQyxLQUFLbEIsT0FBTCxDQUFhdUQsb0JBQWQsQ0FBRCxDQUFxQzdPLE1BQXJDLENBQTRDLHNEQUE1QztBQUNEOztBQUNEd00sTUFBQUEsQ0FBQyxDQUFDLG1DQUFELENBQUQsQ0FBdUN2UCxHQUF2QyxDQUEyQytVLG1CQUEzQztBQUNBLGFBQU9BLG1CQUFQO0FBQ0QsS0E1VGdCO0FBNFRkO0FBRUhjLElBQUFBLHFCQUFxQixFQUFFLCtCQUFTZixLQUFULEVBQWdCO0FBQ3JDLFVBQUlnQixXQUFKO0FBQ0EsVUFBSVIsWUFBWSxHQUFHLEtBQUtqQixjQUFMLEVBQW5CO0FBQ0EsVUFBSVQsSUFBSSxHQUFHLElBQVg7O0FBQ0EsVUFBSXJFLENBQUMsQ0FBQ3VGLEtBQUQsQ0FBRCxDQUFTRyxFQUFULENBQVksVUFBWixLQUEyQjFGLENBQUMsQ0FBQ3VGLEtBQUQsQ0FBRCxDQUFTN0csSUFBVCxDQUFjLFNBQWQsQ0FBL0IsRUFBeUQ7QUFDdkRzQixRQUFBQSxDQUFDLENBQUMsdUJBQUQsQ0FBRCxDQUEyQnhOLFFBQTNCLENBQW9DLGFBQXBDO0FBQ0ErVCxRQUFBQSxXQUFXLEdBQUlSLFlBQVksR0FBR3BGLFVBQVUsQ0FBQ1gsQ0FBQyxDQUFDcUUsSUFBSSxDQUFDdkYsT0FBTCxDQUFhb0MsVUFBZCxDQUFELENBQTJCM1EsSUFBM0IsRUFBRCxDQUF4QztBQUNELE9BSEQsTUFHTztBQUNMZ1csUUFBQUEsV0FBVyxHQUFHUixZQUFkO0FBQ0Q7O0FBQ0RRLE1BQUFBLFdBQVcsR0FBRzVGLFVBQVUsQ0FBQzRGLFdBQUQsQ0FBVixDQUF3Qm5GLE9BQXhCLENBQWdDLENBQWhDLENBQWQ7QUFDQXBCLE1BQUFBLENBQUMsQ0FBQ3FFLElBQUksQ0FBQ3ZGLE9BQUwsQ0FBYTBILG9CQUFkLENBQUQsQ0FBcUNqVyxJQUFyQyxDQUEwQ2dXLFdBQTFDLEVBWHFDLENBYXJDOztBQUNBLFVBQUksS0FBS0UsY0FBTCxJQUF1QkYsV0FBM0IsRUFBd0M7QUFDdEMsYUFBS0UsY0FBTCxDQUFvQkMsTUFBcEIsQ0FBMkI7QUFDekJDLFVBQUFBLEtBQUssRUFBRTtBQUNMQyxZQUFBQSxLQUFLLEVBQUUsVUFERjtBQUVMbkcsWUFBQUEsTUFBTSxFQUFFOEYsV0FBVyxHQUFHO0FBRmpCO0FBRGtCLFNBQTNCO0FBTUQ7QUFFRixLQXJWZ0I7QUFxVmQ7QUFFSGpFLElBQUFBLGlCQUFpQixFQUFFLDJCQUFTM1EsT0FBVCxFQUFrQm1OLE9BQWxCLEVBQTJCO0FBQzVDLFVBQUl1RixJQUFJLEdBQUcsSUFBWDtBQUNBQSxNQUFBQSxJQUFJLENBQUN3QyxlQUFMLENBQXFCN0csQ0FBQyxDQUFDbEIsT0FBTyxDQUFDZ0ksa0JBQVQsRUFBNkJuVixPQUE3QixDQUF0QjtBQUNBcU8sTUFBQUEsQ0FBQyxDQUFDbEIsT0FBTyxDQUFDZ0ksa0JBQVQsRUFBNkJuVixPQUE3QixDQUFELENBQXVDMlQsTUFBdkMsQ0FBOEMsWUFBVztBQUN2RGpCLFFBQUFBLElBQUksQ0FBQ3dDLGVBQUwsQ0FBcUI3RyxDQUFDLENBQUMsSUFBRCxDQUF0QjtBQUNELE9BRkQ7QUFHRCxLQTdWZ0I7QUE2VmQ7QUFFSDZHLElBQUFBLGVBQWUsRUFBRSx5QkFBU2xWLE9BQVQsRUFBa0I7QUFDakMsVUFBSUEsT0FBTyxDQUFDK1QsRUFBUixDQUFXLFVBQVgsQ0FBSixFQUE0QjtBQUMxQjFGLFFBQUFBLENBQUMsQ0FBQyxLQUFLbEIsT0FBTCxDQUFhaUksYUFBYixHQUE2QixZQUE5QixFQUE0QyxLQUFLcFYsT0FBakQsQ0FBRCxDQUEyRHVJLElBQTNEO0FBQ0QsT0FGRCxNQUVPO0FBQ0w4RixRQUFBQSxDQUFDLENBQUMsS0FBS2xCLE9BQUwsQ0FBYWlJLGFBQWIsR0FBNkIsWUFBOUIsRUFBNEMsS0FBS3BWLE9BQWpELENBQUQsQ0FBMkRxSSxJQUEzRDtBQUNEO0FBQ0YsS0FyV2dCO0FBcVdkO0FBRUhnTixJQUFBQSxhQUFhLEVBQUUsdUJBQVNyVixPQUFULEVBQWtCbU4sT0FBbEIsRUFBMkI7QUFDeEMsVUFBSWtCLENBQUMsQ0FBQ2xCLE9BQU8sQ0FBQ21JLHVCQUFSLEdBQWtDLFVBQW5DLENBQUQsQ0FBZ0R4VyxHQUFoRCxFQUFKLEVBQTJEO0FBQ3pEdVAsUUFBQUEsQ0FBQyxDQUFDbEIsT0FBTyxDQUFDb0ksd0JBQVQsRUFBbUN2VixPQUFuQyxDQUFELENBQTZDcUksSUFBN0M7QUFDQWdHLFFBQUFBLENBQUMsQ0FBQ2xCLE9BQU8sQ0FBQ3FJLG1CQUFULENBQUQsQ0FBK0I1VyxJQUEvQixDQUFvQ3lQLENBQUMsQ0FBQ2xCLE9BQU8sQ0FBQ21JLHVCQUFSLEdBQWtDLFVBQW5DLENBQUQsQ0FBZ0R4VyxHQUFoRCxFQUFwQztBQUNELE9BSEQsTUFHTztBQUNMdVAsUUFBQUEsQ0FBQyxDQUFDbEIsT0FBTyxDQUFDb0ksd0JBQVQsRUFBbUN2VixPQUFuQyxDQUFELENBQTZDdUksSUFBN0M7QUFDQThGLFFBQUFBLENBQUMsQ0FBQ2xCLE9BQU8sQ0FBQ3NJLG1CQUFSLEdBQThCLFFBQS9CLEVBQXlDelYsT0FBekMsQ0FBRCxDQUFtRGxCLEdBQW5ELENBQXVELEVBQXZEO0FBQ0Q7QUFDRixLQS9XZ0I7QUErV2Q7QUFFSDhSLElBQUFBLG1CQUFtQixFQUFFLDZCQUFTNVEsT0FBVCxFQUFrQm1OLE9BQWxCLEVBQTJCO0FBQzlDLFVBQUl1RixJQUFJLEdBQUcsSUFBWDtBQUNBQSxNQUFBQSxJQUFJLENBQUMyQyxhQUFMLENBQW1CM0MsSUFBSSxDQUFDMVMsT0FBeEIsRUFBaUMwUyxJQUFJLENBQUN2RixPQUF0QztBQUNBa0IsTUFBQUEsQ0FBQyxDQUFDbEIsT0FBTyxDQUFDbUksdUJBQVQsRUFBa0N0VixPQUFsQyxDQUFELENBQTRDMlQsTUFBNUMsQ0FBbUQsWUFBVztBQUM1RGpCLFFBQUFBLElBQUksQ0FBQzJDLGFBQUwsQ0FBbUIzQyxJQUFJLENBQUMxUyxPQUF4QixFQUFpQzBTLElBQUksQ0FBQ3ZGLE9BQXRDO0FBQ0QsT0FGRDtBQUdELEtBdlhnQjtBQXVYZDtBQUVIMEQsSUFBQUEsbUJBQW1CLEVBQUUsNkJBQVM3USxPQUFULEVBQWtCbU4sT0FBbEIsRUFBMkI7QUFDOUMsVUFBSXVGLElBQUksR0FBRyxJQUFYO0FBQ0FyRSxNQUFBQSxDQUFDLENBQUNsQixPQUFPLENBQUN1SSw2QkFBVCxDQUFELENBQXlDQyxLQUF6QyxDQUErQyxZQUFXO0FBQ3hEakQsUUFBQUEsSUFBSSxDQUFDa0QscUJBQUwsQ0FBMkIsU0FBM0IsRUFBc0M1VixPQUF0QyxFQUErQ21OLE9BQS9DO0FBQ0FrQixRQUFBQSxDQUFDLENBQUMsSUFBRCxDQUFELENBQVF0QyxNQUFSLEdBQWlCeEQsSUFBakI7QUFDQSxlQUFPLEtBQVA7QUFDRCxPQUpEO0FBS0E4RixNQUFBQSxDQUFDLENBQUNsQixPQUFPLENBQUMwSSw4QkFBVCxDQUFELENBQTBDRixLQUExQyxDQUFnRCxZQUFXO0FBQ3pEdEgsUUFBQUEsQ0FBQyxDQUFDbEIsT0FBTyxDQUFDMkkseUJBQVQsQ0FBRCxDQUFxQ3pOLElBQXJDO0FBQ0FxSyxRQUFBQSxJQUFJLENBQUNrRCxxQkFBTCxDQUEyQixVQUEzQixFQUF1QzVWLE9BQXZDLEVBQWdEbU4sT0FBaEQ7QUFDQWtCLFFBQUFBLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUXRDLE1BQVIsR0FBaUJ4RCxJQUFqQjtBQUNBLGVBQU8sS0FBUDtBQUNELE9BTEQ7QUFNRCxLQXRZZ0I7QUFzWWQ7QUFFSHFOLElBQUFBLHFCQUFxQixFQUFFLCtCQUFTRyxtQkFBVCxFQUE4Qi9WLE9BQTlCLEVBQXVDbU4sT0FBdkMsRUFBZ0Q7QUFDckUsVUFBSzRJLG1CQUFtQixLQUFLLFNBQTdCLEVBQXlDO0FBQ3ZDLFlBQUlDLFVBQVUsR0FBRzNILENBQUMsQ0FBQ2xCLE9BQU8sQ0FBQzhJLDBCQUFULEVBQXFDalcsT0FBckMsQ0FBRCxDQUErQytMLE1BQS9DLEVBQWpCO0FBQ0EsWUFBSW1LLFlBQVksR0FBRzdILENBQUMsQ0FBQ2xCLE9BQU8sQ0FBQ2dKLDRCQUFULEVBQXVDblcsT0FBdkMsQ0FBRCxDQUFpRCtMLE1BQWpELEVBQW5CO0FBQ0FzQyxRQUFBQSxDQUFDLENBQUNsQixPQUFPLENBQUNpSix3QkFBVCxDQUFELENBQW9DL04sSUFBcEM7QUFDQWdHLFFBQUFBLENBQUMsQ0FBQ2xCLE9BQU8sQ0FBQzhJLDBCQUFULEVBQXFDalcsT0FBckMsQ0FBRCxDQUErQ3FMLElBQS9DLENBQW9ELE1BQXBELEVBQTRELE1BQTVEO0FBQ0FnRCxRQUFBQSxDQUFDLENBQUNsQixPQUFPLENBQUM4SSwwQkFBVCxFQUFxQ2pXLE9BQXJDLENBQUQsQ0FBK0MrTSxJQUEvQyxDQUFvRCxVQUFwRCxFQUFnRSxLQUFoRTtBQUNBc0IsUUFBQUEsQ0FBQyxDQUFDbEIsT0FBTyxDQUFDZ0osNEJBQVQsRUFBdUNuVyxPQUF2QyxDQUFELENBQWlEK00sSUFBakQsQ0FBc0QsVUFBdEQsRUFBa0UsS0FBbEU7QUFDQXNCLFFBQUFBLENBQUMsQ0FBQyxPQUFELEVBQVUySCxVQUFWLENBQUQsQ0FBdUJwWCxJQUF2QixDQUE0QixjQUE1QjtBQUNBeVAsUUFBQUEsQ0FBQyxDQUFDLE9BQUQsRUFBVTZILFlBQVYsQ0FBRCxDQUF5QnRYLElBQXpCLENBQThCLFNBQTlCO0FBQ0QsT0FURCxNQVNPLElBQUttWCxtQkFBbUIsS0FBSyxVQUE3QixFQUEwQztBQUMvQyxZQUFJQyxVQUFVLEdBQUczSCxDQUFDLENBQUNsQixPQUFPLENBQUNrSiwyQkFBVCxFQUFzQ3JXLE9BQXRDLENBQUQsQ0FBZ0QrTCxNQUFoRCxFQUFqQjtBQUNBLFlBQUltSyxZQUFZLEdBQUc3SCxDQUFDLENBQUNsQixPQUFPLENBQUNtSiw2QkFBVCxFQUF3Q3RXLE9BQXhDLENBQUQsQ0FBa0QrTCxNQUFsRCxFQUFuQjtBQUNBc0MsUUFBQUEsQ0FBQyxDQUFDbEIsT0FBTyxDQUFDMkkseUJBQVQsQ0FBRCxDQUFxQ3pOLElBQXJDO0FBQ0FnRyxRQUFBQSxDQUFDLENBQUNsQixPQUFPLENBQUNrSiwyQkFBVCxFQUFzQ3JXLE9BQXRDLENBQUQsQ0FBZ0RxTCxJQUFoRCxDQUFxRCxNQUFyRCxFQUE2RCxNQUE3RDtBQUNBZ0QsUUFBQUEsQ0FBQyxDQUFDbEIsT0FBTyxDQUFDa0osMkJBQVQsRUFBc0NyVyxPQUF0QyxDQUFELENBQWdEK00sSUFBaEQsQ0FBcUQsVUFBckQsRUFBaUUsS0FBakU7QUFDQXNCLFFBQUFBLENBQUMsQ0FBQ2xCLE9BQU8sQ0FBQ21KLDZCQUFULEVBQXdDdFcsT0FBeEMsQ0FBRCxDQUFrRCtNLElBQWxELENBQXVELFVBQXZELEVBQW1FLEtBQW5FO0FBQ0FzQixRQUFBQSxDQUFDLENBQUMsT0FBRCxFQUFVMkgsVUFBVixDQUFELENBQXVCcFgsSUFBdkIsQ0FBNEIsdUJBQTVCO0FBQ0F5UCxRQUFBQSxDQUFDLENBQUMsT0FBRCxFQUFVNkgsWUFBVixDQUFELENBQXlCdFgsSUFBekIsQ0FBOEIsa0JBQTlCO0FBQ0Q7QUFDRixLQTVaZ0I7QUE0WmQ7QUFFSDJYLElBQUFBLG9CQUFvQixFQUFFLDhCQUFTUixtQkFBVCxFQUE4Qi9WLE9BQTlCLEVBQXVDbU4sT0FBdkMsRUFBZ0Q7QUFDcEUsVUFBSzRJLG1CQUFtQixLQUFLLFNBQTdCLEVBQXlDO0FBQ3ZDLFlBQUlDLFVBQVUsR0FBRzNILENBQUMsQ0FBQ2xCLE9BQU8sQ0FBQzhJLDBCQUFULEVBQXFDalcsT0FBckMsQ0FBRCxDQUErQytMLE1BQS9DLEVBQWpCO0FBQ0EsWUFBSW1LLFlBQVksR0FBRzdILENBQUMsQ0FBQ2xCLE9BQU8sQ0FBQ2dKLDRCQUFULEVBQXVDblcsT0FBdkMsQ0FBRCxDQUFpRCtMLE1BQWpELEVBQW5CO0FBQ0FzQyxRQUFBQSxDQUFDLENBQUNsQixPQUFPLENBQUNpSix3QkFBVCxDQUFELENBQW9DL04sSUFBcEM7QUFDQWdHLFFBQUFBLENBQUMsQ0FBQ2xCLE9BQU8sQ0FBQzhJLDBCQUFULEVBQXFDalcsT0FBckMsQ0FBRCxDQUErQ3FMLElBQS9DLENBQW9ELE1BQXBELEVBQTRELEtBQTVEO0FBQ0FnRCxRQUFBQSxDQUFDLENBQUNsQixPQUFPLENBQUM4SSwwQkFBVCxFQUFxQ2pXLE9BQXJDLENBQUQsQ0FBK0MrTSxJQUEvQyxDQUFvRCxVQUFwRCxFQUFnRSxJQUFoRTtBQUNBc0IsUUFBQUEsQ0FBQyxDQUFDbEIsT0FBTyxDQUFDZ0osNEJBQVQsRUFBdUNuVyxPQUF2QyxDQUFELENBQWlEK00sSUFBakQsQ0FBc0QsVUFBdEQsRUFBa0UsSUFBbEU7QUFDQXNCLFFBQUFBLENBQUMsQ0FBQyxPQUFELEVBQVUySCxVQUFWLENBQUQsQ0FBdUJRLElBQXZCLENBQTRCLHVGQUE1QjtBQUNBbkksUUFBQUEsQ0FBQyxDQUFDLE9BQUQsRUFBVTZILFlBQVYsQ0FBRCxDQUF5Qk0sSUFBekIsQ0FBOEIsb0ZBQTlCO0FBQ0QsT0FURCxNQVNPLElBQUtULG1CQUFtQixLQUFLLFVBQTdCLEVBQTBDO0FBQy9DLFlBQUlDLFVBQVUsR0FBRzNILENBQUMsQ0FBQ2xCLE9BQU8sQ0FBQ2tKLDJCQUFULEVBQXNDclcsT0FBdEMsQ0FBRCxDQUFnRCtMLE1BQWhELEVBQWpCO0FBQ0EsWUFBSW1LLFlBQVksR0FBRzdILENBQUMsQ0FBQ2xCLE9BQU8sQ0FBQ21KLDZCQUFULEVBQXdDdFcsT0FBeEMsQ0FBRCxDQUFrRCtMLE1BQWxELEVBQW5CO0FBQ0FzQyxRQUFBQSxDQUFDLENBQUNsQixPQUFPLENBQUMySSx5QkFBVCxDQUFELENBQXFDek4sSUFBckM7QUFDQWdHLFFBQUFBLENBQUMsQ0FBQ2xCLE9BQU8sQ0FBQ2tKLDJCQUFULEVBQXNDclcsT0FBdEMsQ0FBRCxDQUFnRHFMLElBQWhELENBQXFELE1BQXJELEVBQTZELEtBQTdEO0FBQ0FnRCxRQUFBQSxDQUFDLENBQUNsQixPQUFPLENBQUNrSiwyQkFBVCxFQUFzQ3JXLE9BQXRDLENBQUQsQ0FBZ0QrTSxJQUFoRCxDQUFxRCxVQUFyRCxFQUFpRSxJQUFqRTtBQUNBc0IsUUFBQUEsQ0FBQyxDQUFDbEIsT0FBTyxDQUFDbUosNkJBQVQsRUFBd0N0VyxPQUF4QyxDQUFELENBQWtEK00sSUFBbEQsQ0FBdUQsVUFBdkQsRUFBbUUsSUFBbkU7QUFDQXNCLFFBQUFBLENBQUMsQ0FBQyxPQUFELEVBQVUySCxVQUFWLENBQUQsQ0FBdUJRLElBQXZCLENBQTRCLGdHQUE1QjtBQUNBbkksUUFBQUEsQ0FBQyxDQUFDLE9BQUQsRUFBVTZILFlBQVYsQ0FBRCxDQUF5Qk0sSUFBekIsQ0FBOEIsNkZBQTlCO0FBQ0Q7QUFDRixLQWxiZ0I7QUFrYmQ7QUFFSDFGLElBQUFBLGVBQWUsRUFBRSx5QkFBUzlRLE9BQVQsRUFBa0JtTixPQUFsQixFQUEyQjtBQUMxQyxVQUFJdUYsSUFBSSxHQUFHLElBQVg7QUFDQSxVQUFJK0QsYUFBYSxHQUFHLEtBQXBCOztBQUNBLFVBQUlwSSxDQUFDLENBQUNsQixPQUFPLENBQUN1Six5QkFBVCxDQUFELENBQXFDelksTUFBckMsR0FBOEMsQ0FBbEQsRUFBcUQ7QUFBRTtBQUNyRHdZLFFBQUFBLGFBQWEsR0FBRyxJQUFoQjtBQUNEOztBQUNELFVBQUlBLGFBQWEsS0FBSyxJQUF0QixFQUE2QjtBQUMzQnBJLFFBQUFBLENBQUMsQ0FBQ2xCLE9BQU8sQ0FBQ3VKLHlCQUFULEVBQW9DMVcsT0FBcEMsQ0FBRCxDQUE4QytMLE1BQTlDLEdBQXVEMUQsSUFBdkQ7O0FBQ0EsWUFBSWdHLENBQUMsQ0FBQ2xCLE9BQU8sQ0FBQ3VKLHlCQUFULEVBQW9DMVcsT0FBcEMsQ0FBRCxDQUE4QytULEVBQTlDLENBQWlELFVBQWpELENBQUosRUFBa0U7QUFBRTtBQUNsRTFGLFVBQUFBLENBQUMsQ0FBQ2xCLE9BQU8sQ0FBQ3dKLGlCQUFULENBQUQsQ0FBNkJwTyxJQUE3QjtBQUNELFNBRkQsTUFFTztBQUFFO0FBQ1A4RixVQUFBQSxDQUFDLENBQUNsQixPQUFPLENBQUN3SixpQkFBVCxDQUFELENBQTZCdE8sSUFBN0I7QUFDRDs7QUFDRGdHLFFBQUFBLENBQUMsQ0FBQ2xCLE9BQU8sQ0FBQ3VKLHlCQUFULEVBQW9DMVcsT0FBcEMsQ0FBRCxDQUE4QzJULE1BQTlDLENBQXFELFlBQVc7QUFDOURqQixVQUFBQSxJQUFJLENBQUM1QixlQUFMLENBQXFCOVEsT0FBckIsRUFBOEJtTixPQUE5QjtBQUNELFNBRkQ7QUFHRDtBQUVGLEtBdGNnQjtBQXNjZDtBQUVINEQsSUFBQUEsb0JBQW9CLEVBQUUsOEJBQVMvUSxPQUFULEVBQWtCbU4sT0FBbEIsRUFBMkI7QUFDL0MsVUFBSXVGLElBQUksR0FBRyxJQUFYO0FBQ0EsVUFBSWtFLGNBQWMsR0FBRyxLQUFyQixDQUYrQyxDQUkvQzs7QUFDQWxFLE1BQUFBLElBQUksQ0FBQ21FLFlBQUwsR0FMK0MsQ0FPL0M7O0FBQ0FuRSxNQUFBQSxJQUFJLENBQUNvRSxvQkFBTDtBQUVBcEUsTUFBQUEsSUFBSSxDQUFDcUUsU0FBTCxDQUFlMUksQ0FBQyxDQUFDbEIsT0FBTyxDQUFDNkosb0JBQVQsRUFBK0JoWCxPQUEvQixDQUFoQjtBQUNBcU8sTUFBQUEsQ0FBQyxDQUFDbEIsT0FBTyxDQUFDNkosb0JBQVQsRUFBK0JoWCxPQUEvQixDQUFELENBQXlDMlQsTUFBekMsQ0FBZ0QsWUFBVztBQUN6RGpCLFFBQUFBLElBQUksQ0FBQ3FFLFNBQUwsQ0FBZTFJLENBQUMsQ0FBQ2xCLE9BQU8sQ0FBQzZKLG9CQUFULEVBQStCaFgsT0FBL0IsQ0FBaEI7QUFDRCxPQUZEO0FBSUEwUyxNQUFBQSxJQUFJLENBQUN1RSxtQkFBTCxDQUF5QjVJLENBQUMsQ0FBQ2xCLE9BQU8sQ0FBQytKLGtCQUFULEVBQTZCbFgsT0FBN0IsQ0FBMUI7QUFDQXFPLE1BQUFBLENBQUMsQ0FBQ2xCLE9BQU8sQ0FBQytKLGtCQUFULEVBQTZCbFgsT0FBN0IsQ0FBRCxDQUF1QzJULE1BQXZDLENBQThDLFlBQVc7QUFDdkRqQixRQUFBQSxJQUFJLENBQUN1RSxtQkFBTCxDQUF5QjVJLENBQUMsQ0FBQ2xCLE9BQU8sQ0FBQytKLGtCQUFULEVBQTZCbFgsT0FBN0IsQ0FBMUI7QUFDRCxPQUZEOztBQUlBLGVBQVNtWCxVQUFULEdBQXVCO0FBQ3JCLFlBQUlDLEtBQUssR0FBRy9JLENBQUMsQ0FBQ2xCLE9BQU8sQ0FBQzZKLG9CQUFULEVBQStCaFgsT0FBL0IsQ0FBRCxDQUF5Q2xCLEdBQXpDLEVBQVo7QUFDQThYLFFBQUFBLGNBQWMsR0FBR2xFLElBQUksQ0FBQzJFLG9CQUFMLENBQTBCclgsT0FBMUIsRUFBbUNtTixPQUFuQyxFQUE0Q2lLLEtBQTVDLENBQWpCO0FBQ0QsT0F2QjhDLENBeUIvQzs7O0FBQ0EsVUFBSUUsV0FBSixDQTFCK0MsQ0EwQmY7O0FBQ2hDLFVBQUlDLGtCQUFrQixHQUFHLElBQXpCLENBM0IrQyxDQTJCZjtBQUVoQzs7QUFDQWxKLE1BQUFBLENBQUMsQ0FBQ2xCLE9BQU8sQ0FBQzZKLG9CQUFULEVBQStCaFgsT0FBL0IsQ0FBRCxDQUF5Q3dYLEtBQXpDLENBQStDLFlBQVU7QUFDdkQzTixRQUFBQSxZQUFZLENBQUN5TixXQUFELENBQVo7O0FBQ0EsWUFBSWpKLENBQUMsQ0FBQ2xCLE9BQU8sQ0FBQzZKLG9CQUFULEVBQStCaFgsT0FBL0IsQ0FBRCxDQUF5Q2xCLEdBQTdDLEVBQWtEO0FBQ2hEd1ksVUFBQUEsV0FBVyxHQUFHaFMsVUFBVSxDQUFDNlIsVUFBRCxFQUFhSSxrQkFBYixDQUF4QjtBQUNEO0FBQ0YsT0FMRDtBQU1ELEtBNWVnQjtBQTRlZDtBQUVIUixJQUFBQSxTQUFTLEVBQUUsbUJBQVNVLFdBQVQsRUFBc0I7QUFDL0IsVUFBSUMsa0JBQWtCLEdBQUdELFdBQVcsQ0FBQzFMLE1BQVosRUFBekI7O0FBQ0EsVUFBSXNDLENBQUMsQ0FBQyxlQUFELEVBQWtCcUosa0JBQWxCLENBQUQsQ0FBdUN6WixNQUF2QyxLQUFrRCxDQUF0RCxFQUEwRDtBQUN4RHlaLFFBQUFBLGtCQUFrQixDQUFDN1YsTUFBbkIsQ0FBMEIsa0hBQTFCO0FBQ0Q7O0FBQ0R3TSxNQUFBQSxDQUFDLENBQUMsZUFBRCxFQUFrQnFKLGtCQUFsQixDQUFELENBQXVDblAsSUFBdkM7QUFDQW1QLE1BQUFBLGtCQUFrQixDQUFDblcsV0FBbkIsQ0FBK0IsaUJBQS9CO0FBQ0QsS0FyZmdCO0FBcWZkO0FBRUgwVixJQUFBQSxtQkFBbUIsRUFBRSw2QkFBU1UsdUJBQVQsRUFBa0M7QUFDckQsVUFBSUEsdUJBQXVCLENBQUM1RCxFQUF4QixDQUEyQixVQUEzQixDQUFKLEVBQTRDO0FBQzFDNEQsUUFBQUEsdUJBQXVCLENBQUM1TCxNQUF4QixHQUFpQzZMLE1BQWpDLENBQXdDLDBJQUF4QztBQUNBdkosUUFBQUEsQ0FBQyxDQUFDLG1CQUFELENBQUQsQ0FBdUI5RixJQUF2QjtBQUNBOEYsUUFBQUEsQ0FBQyxDQUFDLEtBQUtsQixPQUFMLENBQWEwSyxpQkFBZCxFQUFpQyxLQUFLN1gsT0FBdEMsQ0FBRCxDQUFnRHFJLElBQWhEO0FBQ0EsYUFBSzhFLE9BQUwsQ0FBYXdDLGNBQWIsR0FBOEIsSUFBOUI7QUFDRCxPQUxELE1BS087QUFDTHRCLFFBQUFBLENBQUMsQ0FBQyxLQUFLbEIsT0FBTCxDQUFhMEssaUJBQWQsRUFBaUMsS0FBSzdYLE9BQXRDLENBQUQsQ0FBZ0R1SSxJQUFoRDtBQUNEO0FBQ0YsS0FoZ0JnQjtBQWdnQmQ7QUFFSHNPLElBQUFBLFlBQVksRUFBRSx3QkFBVztBQUN2QjtBQUNBLFVBQUlpQixPQUFPLEdBQUd6SixDQUFDLENBQUMsYUFBRCxDQUFmO0FBQ0EsVUFBSTBKLFVBQVUsR0FBRzFKLENBQUMsQ0FBQyxLQUFLbEIsT0FBTCxDQUFhMEssaUJBQWQsRUFBaUMsS0FBSzdYLE9BQXRDLENBQWxCO0FBQ0EsVUFBSWdZLE1BQU0sR0FBRzNKLENBQUMsQ0FBQyx3QkFBRCxFQUEyQjBKLFVBQTNCLENBQWQ7QUFDQTFKLE1BQUFBLENBQUMsQ0FBQyxtQkFBRCxDQUFELENBQXVCOUYsSUFBdkI7QUFDQSxVQUFJMFAsU0FBUyxHQUFHLHdLQUFoQixDQU51QixDQU92Qjs7QUFDQUYsTUFBQUEsVUFBVSxDQUFDbFcsTUFBWCxDQUFtQm9XLFNBQW5CLEVBUnVCLENBU3ZCOztBQUNBLFVBQUlDLE9BQU8sR0FBRzdKLENBQUMsQ0FBQyx5QkFBRCxDQUFmLENBVnVCLENBV3ZCOztBQUNBNkosTUFBQUEsT0FBTyxDQUFDblksRUFBUixDQUFXLE9BQVgsRUFBb0IsVUFBUzVDLENBQVQsRUFBWTtBQUM5QixZQUFJZ2IsUUFBUSxHQUFHOUosQ0FBQyxDQUFDLElBQUQsQ0FBaEI7O0FBQ0EsWUFBSThKLFFBQVEsQ0FBQ3BFLEVBQVQsQ0FBWSxVQUFaLENBQUosRUFBNkI7QUFDM0JpRSxVQUFBQSxNQUFNLENBQUMzTSxJQUFQLENBQVksTUFBWixFQUFvQixNQUFwQjtBQUNELFNBRkQsTUFFTztBQUNMMk0sVUFBQUEsTUFBTSxDQUFDM00sSUFBUCxDQUFZLE1BQVosRUFBb0IsVUFBcEI7QUFDRDtBQUNGLE9BUEQsRUFadUIsQ0FvQnZCOztBQUNBeU0sTUFBQUEsT0FBTyxDQUFDL1gsRUFBUixDQUFZLE9BQVosRUFBcUIsVUFBUzVDLENBQVQsRUFBWTtBQUMvQjZhLFFBQUFBLE1BQU0sQ0FBQzNNLElBQVAsQ0FBWSxNQUFaLEVBQW9CLFVBQXBCO0FBQ0QsT0FGRDtBQUdELEtBMWhCZ0I7QUE0aEJqQnlMLElBQUFBLG9CQUFvQixFQUFFLGdDQUFXO0FBQy9CO0FBQ0EsVUFBSXBFLElBQUksR0FBRyxJQUFYOztBQUNBLFVBQUlyRSxDQUFDLENBQUMsc0JBQUQsQ0FBRCxDQUEwQnBRLE1BQTFCLEdBQW1DLENBQXZDLEVBQTJDO0FBQ3pDLFlBQUltYSxPQUFPLEdBQUcvSixDQUFDLENBQUMsdUJBQUQsQ0FBZjtBQUNBK0osUUFBQUEsT0FBTyxDQUFDQyxLQUFSLENBQWVoSyxDQUFDLENBQUMsNEpBQUQsQ0FBaEI7QUFDQUEsUUFBQUEsQ0FBQyxDQUFFLE1BQUYsQ0FBRCxDQUFZdE8sRUFBWixDQUFnQixPQUFoQixFQUF5QixzQkFBekIsRUFDRSxZQUFXO0FBQ1QyUyxVQUFBQSxJQUFJLENBQUM0RixxQkFBTCxDQUNFakssQ0FBQyxDQUFDLHNCQUFELENBREgsRUFDNkI7QUFDM0JBLFVBQUFBLENBQUMsQ0FBQyxvQkFBRCxDQUZILEVBRXFDO0FBQ25DQSxVQUFBQSxDQUFDLENBQUMseUJBQUQsQ0FISCxDQUdvQztBQUhwQztBQUtELFNBUEg7QUFTRDtBQUNGLEtBNWlCZ0I7QUE0aUJkO0FBRUhpSyxJQUFBQSxxQkFBcUIsRUFBRSwrQkFBVUMsU0FBVixFQUFxQkMsY0FBckIsRUFBcUNDLGFBQXJDLEVBQXFEO0FBQzFFLFVBQUlDLFFBQVEsR0FBR0gsU0FBUyxDQUFDelosR0FBVixFQUFmLENBRDBFLENBRTFFOztBQUNBLFVBQUk2WixNQUFNLEdBQUdDLE1BQU0sQ0FBQ0YsUUFBRCxDQUFuQjtBQUNBLFVBQUlHLFFBQVEsR0FBR0YsTUFBTSxDQUFDRyxLQUF0QjtBQUVBTCxNQUFBQSxhQUFhLENBQUNsWCxXQUFkLENBQTJCLHVCQUEzQixFQU4wRSxDQVExRTs7QUFDQSxjQUFTc1gsUUFBVDtBQUNFLGFBQUssQ0FBTDtBQUNFSixVQUFBQSxhQUFhLENBQUM1WCxRQUFkLENBQXdCLEtBQXhCLEVBQWdDMlYsSUFBaEMsQ0FBc0MsaUNBQXRDO0FBQ0E7O0FBQ0YsYUFBSyxDQUFMO0FBQ0VpQyxVQUFBQSxhQUFhLENBQUM1WCxRQUFkLENBQXdCLE1BQXhCLEVBQWlDMlYsSUFBakMsQ0FBdUMsbUNBQXZDO0FBQ0E7O0FBQ0YsYUFBSyxDQUFMO0FBQ0VpQyxVQUFBQSxhQUFhLENBQUM1WCxRQUFkLENBQXdCLFFBQXhCLEVBQW1DMlYsSUFBbkMsQ0FBeUMsbUNBQXpDO0FBQ0E7O0FBQ0YsYUFBSyxDQUFMO0FBQ0VpQyxVQUFBQSxhQUFhLENBQUM1WCxRQUFkLENBQXdCLE9BQXhCLEVBQWtDMlYsSUFBbEMsQ0FBd0Msc0NBQXhDO0FBQ0E7O0FBQ0Y7QUFDRWlDLFVBQUFBLGFBQWEsQ0FBQzVYLFFBQWQsQ0FBd0IsT0FBeEIsRUFBa0MyVixJQUFsQyxDQUF3QyxzQ0FBeEM7QUFkSjs7QUFnQkFnQyxNQUFBQSxjQUFjLENBQUMxWixHQUFmLENBQW1CK1osUUFBbkI7QUFDQSxhQUFPQSxRQUFQO0FBQ0QsS0F6a0JnQjtBQXlrQmQ7QUFFSHhCLElBQUFBLG9CQUFvQixFQUFFLDhCQUFTclgsT0FBVCxFQUFrQm1OLE9BQWxCLEVBQTJCaUssS0FBM0IsRUFBa0M7QUFDdEQsVUFBSTJCLElBQUksR0FBRztBQUNUM0IsUUFBQUEsS0FBSyxFQUFFQTtBQURFLE9BQVg7QUFHQSxVQUFJMUUsSUFBSSxHQUFHLElBQVg7QUFDQXJFLE1BQUFBLENBQUMsQ0FBQ3VFLElBQUYsQ0FBTztBQUNMQyxRQUFBQSxNQUFNLEVBQUUsS0FESDtBQUVMQyxRQUFBQSxHQUFHLEVBQUUzRixPQUFPLENBQUM2TCxhQUFSLEdBQXdCLG1EQUZ4QjtBQUdMclosUUFBQUEsSUFBSSxFQUFFb1o7QUFIRCxPQUFQLEVBSUdoRyxJQUpILENBSVEsVUFBVTRGLE1BQVYsRUFBbUI7QUFDekIsWUFBSUEsTUFBTSxDQUFDTSxNQUFQLEtBQWtCLFNBQWxCLElBQStCTixNQUFNLENBQUNPLE1BQVAsS0FBa0IsYUFBckQsRUFBb0U7QUFBRTtBQUNwRSxjQUFJN0ssQ0FBQyxDQUFDbEIsT0FBTyxDQUFDK0osa0JBQVQsRUFBNkJsWCxPQUE3QixDQUFELENBQXVDK1QsRUFBdkMsQ0FBMEMsVUFBMUMsQ0FBSixFQUEyRDtBQUN6RDFGLFlBQUFBLENBQUMsQ0FBQ2xCLE9BQU8sQ0FBQzBLLGlCQUFULEVBQTRCN1gsT0FBNUIsQ0FBRCxDQUFzQ3VJLElBQXRDO0FBQ0E4RixZQUFBQSxDQUFDLENBQUNsQixPQUFPLENBQUMrSixrQkFBVCxFQUE2QmxYLE9BQTdCLENBQUQsQ0FBdUMrTCxNQUF2QyxHQUFnRHhELElBQWhEO0FBQ0E4RixZQUFBQSxDQUFDLENBQUMsbUJBQUQsRUFBc0JyTyxPQUF0QixDQUFELENBQWdDcUksSUFBaEM7QUFDRDs7QUFDRGdHLFVBQUFBLENBQUMsQ0FBQ2xCLE9BQU8sQ0FBQytKLGtCQUFULEVBQTZCbFgsT0FBN0IsQ0FBRCxDQUF1Q0QsRUFBdkMsQ0FBMEMsUUFBMUMsRUFBb0QsWUFBVztBQUM3RCxnQkFBSXNPLENBQUMsQ0FBQ2xCLE9BQU8sQ0FBQytKLGtCQUFULEVBQTZCbFgsT0FBN0IsQ0FBRCxDQUF1QytULEVBQXZDLENBQTBDLFVBQTFDLENBQUosRUFBMkQ7QUFDekQxRixjQUFBQSxDQUFDLENBQUNsQixPQUFPLENBQUMwSyxpQkFBVCxFQUE0QjdYLE9BQTVCLENBQUQsQ0FBc0N1SSxJQUF0QztBQUNBOEYsY0FBQUEsQ0FBQyxDQUFDbEIsT0FBTyxDQUFDK0osa0JBQVQsRUFBNkJsWCxPQUE3QixDQUFELENBQXVDK0wsTUFBdkMsR0FBZ0R4RCxJQUFoRDtBQUNBOEYsY0FBQUEsQ0FBQyxDQUFDLG1CQUFELEVBQXNCck8sT0FBdEIsQ0FBRCxDQUFnQ3FJLElBQWhDO0FBQ0Q7QUFDRixXQU5EO0FBT0QsU0FiRCxNQWFPLElBQUtzUSxNQUFNLENBQUNNLE1BQVAsS0FBa0IsTUFBdkIsRUFBZ0M7QUFDckM1SyxVQUFBQSxDQUFDLENBQUNxRSxJQUFJLENBQUN2RixPQUFMLENBQWE2SixvQkFBZCxDQUFELENBQXFDblcsUUFBckMsQ0FBOEMsaUJBQTlDO0FBQ0F3TixVQUFBQSxDQUFDLENBQUUsZUFBRixDQUFELENBQW9CaEcsSUFBcEI7QUFDRCxTQUhNLE1BR0E7QUFBRTtBQUNQLGNBQUlnRyxDQUFDLENBQUNsQixPQUFPLENBQUMrSixrQkFBVCxFQUE2QmxYLE9BQTdCLENBQUQsQ0FBdUMrVCxFQUF2QyxDQUEwQyxVQUExQyxDQUFKLEVBQTJEO0FBQ3pEMUYsWUFBQUEsQ0FBQyxDQUFDbEIsT0FBTyxDQUFDMEssaUJBQVQsRUFBNEI3WCxPQUE1QixDQUFELENBQXNDcUksSUFBdEM7QUFDQThFLFlBQUFBLE9BQU8sQ0FBQ3dDLGNBQVIsR0FBeUIsSUFBekI7QUFDRCxXQUhELE1BR087QUFDTHRCLFlBQUFBLENBQUMsQ0FBQ2xCLE9BQU8sQ0FBQzBLLGlCQUFULEVBQTRCN1gsT0FBNUIsQ0FBRCxDQUFzQ3VJLElBQXRDO0FBQ0Q7O0FBQ0Q4RixVQUFBQSxDQUFDLENBQUMsbUJBQUQsRUFBc0JyTyxPQUF0QixDQUFELENBQWdDdUksSUFBaEM7QUFDQSxpQkFBTyxLQUFQO0FBQ0Q7QUFDRixPQS9CRDtBQWdDRCxLQWhuQmdCO0FBZ25CZDtBQUVIeUksSUFBQUEsb0JBQW9CLEVBQUUsOEJBQVNoUixPQUFULEVBQWtCbU4sT0FBbEIsRUFBMkI7QUFDL0MsVUFBSXVGLElBQUksR0FBRyxJQUFYO0FBQ0EsVUFBSTBCLFlBQVksR0FBRzFCLElBQUksQ0FBQ1MsY0FBTCxFQUFuQjtBQUNBVCxNQUFBQSxJQUFJLENBQUNvQyxjQUFMLEdBQXNCcEMsSUFBSSxDQUFDNUMsTUFBTCxDQUFZZ0YsY0FBWixDQUEyQjtBQUMvQ3FFLFFBQUFBLE9BQU8sRUFBRSxJQURzQztBQUUvQ0MsUUFBQUEsUUFBUSxFQUFFLEtBRnFDO0FBRy9DcEUsUUFBQUEsS0FBSyxFQUFFO0FBQ0xDLFVBQUFBLEtBQUssRUFBRSxVQURGO0FBRUxuRyxVQUFBQSxNQUFNLEVBQUVzRixZQUFZLEdBQUc7QUFGbEI7QUFId0MsT0FBM0IsQ0FBdEI7QUFRQTFCLE1BQUFBLElBQUksQ0FBQzJHLFFBQUwsR0FBZ0IzRyxJQUFJLENBQUN6QyxRQUFMLENBQWNxSixNQUFkLENBQXFCLHNCQUFyQixFQUE2QztBQUMzRHhFLFFBQUFBLGNBQWMsRUFBRXBDLElBQUksQ0FBQ29DLGNBRHNDO0FBRTNEaE0sUUFBQUEsS0FBSyxFQUFFO0FBQ0xrSSxVQUFBQSxvQkFBb0IsRUFBRTtBQUNwQjNNLFlBQUFBLElBQUksRUFBRSxRQURjO0FBRXBCO0FBQ0E7QUFFQWtWLFlBQUFBLEtBQUssRUFBRSxNQUxhO0FBTXBCO0FBQ0E7QUFFQUMsWUFBQUEsTUFBTSxFQUFFLE1BVFksQ0FVcEI7O0FBVm9CO0FBRGpCO0FBRm9ELE9BQTdDLENBQWhCLENBWCtDLENBNkIvQzs7QUFDQTlHLE1BQUFBLElBQUksQ0FBQ29DLGNBQUwsQ0FBb0IyRSxjQUFwQixHQUFxQ0MsSUFBckMsQ0FBMEMsVUFBU2YsTUFBVCxFQUFpQjtBQUN6RCxZQUFJQSxNQUFKLEVBQVk7QUFDVnRLLFVBQUFBLENBQUMsQ0FBQyxnQ0FBRCxDQUFELENBQW9DOUYsSUFBcEM7QUFDQW1LLFVBQUFBLElBQUksQ0FBQzJHLFFBQUwsQ0FBY00sS0FBZCxDQUFvQix5QkFBcEI7QUFDRCxTQUhELE1BR087QUFDTGpILFVBQUFBLElBQUksQ0FBQ2tILGtCQUFMLENBQXlCdkwsQ0FBQyxDQUFDLDZCQUFELENBQTFCO0FBQ0Q7QUFDRixPQVBEO0FBU0FBLE1BQUFBLENBQUMsQ0FBQyxzQkFBRCxDQUFELENBQTBCc0gsS0FBMUIsQ0FBZ0MsVUFBU2tFLEtBQVQsRUFBZ0I7QUFDOUNBLFFBQUFBLEtBQUssQ0FBQzNhLGNBQU47QUFDQXdULFFBQUFBLElBQUksQ0FBQ2tILGtCQUFMLENBQXlCdkwsQ0FBQyxDQUFDLHNEQUFELENBQTFCO0FBQ0QsT0FIRDtBQUtBcUUsTUFBQUEsSUFBSSxDQUFDMkcsUUFBTCxDQUFjdFosRUFBZCxDQUFpQixPQUFqQixFQUEwQixVQUFTOFosS0FBVCxFQUFnQjtBQUV4QztBQUNBLFlBQUlDLFdBQVcsR0FBR3pMLENBQUMsQ0FBQ3FFLElBQUksQ0FBQ3ZGLE9BQUwsQ0FBYXVELG9CQUFkLENBQW5CLENBSHdDLENBS3hDOztBQUNBLFlBQUksQ0FBQ29KLFdBQVcsQ0FBQ0MsR0FBWixDQUFnQixDQUFoQixFQUFtQkMsY0FBbkIsRUFBTCxFQUEwQztBQUN4Q0gsVUFBQUEsS0FBSyxDQUFDM2EsY0FBTjtBQUNBO0FBQ0Q7QUFDRixPQVZEO0FBWUF3VCxNQUFBQSxJQUFJLENBQUNvQyxjQUFMLENBQW9CL1UsRUFBcEIsQ0FBdUIsZUFBdkIsRUFBd0MsVUFBUzhaLEtBQVQsRUFBZ0I7QUFFdEQ7QUFDQSxZQUFJQyxXQUFXLEdBQUd6TCxDQUFDLENBQUNxRSxJQUFJLENBQUN2RixPQUFMLENBQWF1RCxvQkFBZCxDQUFuQjtBQUNBLFlBQUl1SixjQUFjLEdBQUcsbUJBQXJCO0FBQ0EsWUFBSUMsVUFBVSxHQUFHLGlCQUFpQkQsY0FBakIsR0FBa0MsSUFBbkQsQ0FMc0QsQ0FPdEQ7O0FBQ0EsWUFBSTVMLENBQUMsQ0FBQzZMLFVBQUQsQ0FBRCxDQUFjamMsTUFBZCxHQUF1QixDQUEzQixFQUE4QjtBQUM1Qm9RLFVBQUFBLENBQUMsQ0FBQzZMLFVBQUQsQ0FBRCxDQUFjcGIsR0FBZCxDQUFrQithLEtBQUssQ0FBQ00sYUFBTixDQUFvQkMsRUFBdEM7QUFDRCxTQUZELE1BRU87QUFDTE4sVUFBQUEsV0FBVyxDQUFDalksTUFBWixDQUFtQndNLENBQUMsQ0FBQyxrQ0FBa0M0TCxjQUFsQyxHQUFtRCxJQUFwRCxDQUFELENBQTJEbmIsR0FBM0QsQ0FBK0QrYSxLQUFLLENBQUNNLGFBQU4sQ0FBb0JDLEVBQW5GLENBQW5CO0FBQ0Q7O0FBRUQxSCxRQUFBQSxJQUFJLENBQUMySCxhQUFMLENBQW1CM0gsSUFBbkIsRUFBeUIsZ0JBQXpCO0FBRUQsT0FoQkQ7QUFrQkQsS0E1ckJnQjtBQTRyQmQ7QUFFSGtILElBQUFBLGtCQUFrQixFQUFFLDRCQUFVVSxXQUFWLEVBQXdCO0FBQzFDQSxNQUFBQSxXQUFXLENBQUMvUixJQUFaO0FBQ0E4RixNQUFBQSxDQUFDLENBQUMsc0JBQUQsQ0FBRCxDQUEwQjlGLElBQTFCO0FBQ0E4RixNQUFBQSxDQUFDLENBQUMsZ0NBQUQsQ0FBRCxDQUFvQ2hHLElBQXBDO0FBQ0FnRyxNQUFBQSxDQUFDLENBQUMsZ0JBQUQsQ0FBRCxDQUFvQnJELFdBQXBCLENBQWdDLHlEQUFoQztBQUNELEtBbnNCZ0I7QUFtc0JkO0FBRUhpRyxJQUFBQSxtQkFBbUIsRUFBRSw2QkFBU2pSLE9BQVQsRUFBa0JtTixPQUFsQixFQUEyQjtBQUU5QyxVQUFJdUYsSUFBSSxHQUFHLElBQVg7O0FBRUEsVUFBSXJFLENBQUMsQ0FBQ2xCLE9BQU8sQ0FBQ29OLGNBQVQsQ0FBRCxDQUEwQnRjLE1BQTFCLEdBQW1DLENBQXZDLEVBQTBDO0FBQ3hDLFlBQUlvUSxDQUFDLENBQUNsQixPQUFPLENBQUNvTixjQUFSLEdBQXlCLFFBQTFCLENBQUQsQ0FBcUN4RyxFQUFyQyxDQUF3QyxVQUF4QyxDQUFKLEVBQXlEO0FBQ3ZELGNBQUl5RyxVQUFVLEdBQUduTSxDQUFDLENBQUNsQixPQUFPLENBQUNvTixjQUFSLEdBQXlCLGdCQUExQixDQUFELENBQTZDbFAsSUFBN0MsQ0FBa0QsSUFBbEQsQ0FBakI7QUFDQSxjQUFJb1AsYUFBYSxHQUFHcE0sQ0FBQyxDQUFDbEIsT0FBTyxDQUFDb04sY0FBUixHQUF5QixnQkFBMUIsQ0FBRCxDQUE2Q3piLEdBQTdDLEVBQXBCO0FBQ0E0VCxVQUFBQSxJQUFJLENBQUNnSSxrQkFBTCxDQUF3QkYsVUFBeEIsRUFBb0NDLGFBQXBDO0FBQ0Q7O0FBRURwTSxRQUFBQSxDQUFDLENBQUNsQixPQUFPLENBQUNvTixjQUFSLEdBQXlCLFFBQTFCLENBQUQsQ0FBcUM1RyxNQUFyQyxDQUE0QyxZQUFZO0FBQ3RELGNBQUk2RyxVQUFVLEdBQUcsS0FBS0osRUFBdEI7QUFDQSxjQUFJSyxhQUFhLEdBQUcsS0FBS3hiLEtBQXpCO0FBQ0F5VCxVQUFBQSxJQUFJLENBQUNnSSxrQkFBTCxDQUF3QkYsVUFBeEIsRUFBb0NDLGFBQXBDO0FBQ0QsU0FKRDtBQU1EO0FBQ0YsS0F2dEJnQjtBQXV0QmQ7QUFFSEMsSUFBQUEsa0JBQWtCLEVBQUUsNEJBQVNDLFVBQVQsRUFBcUJDLGFBQXJCLEVBQW9DO0FBQ3RELFVBQUkvRyxtQkFBbUIsR0FBRyxLQUFLWSxvQkFBTCxDQUEwQm1HLGFBQTFCLENBQTFCOztBQUNBLFVBQUtBLGFBQWEsS0FBSyxjQUF2QixFQUF3QztBQUN0Q3ZNLFFBQUFBLENBQUMsQ0FBQyxpQ0FBRCxFQUFvQ0EsQ0FBQyxDQUFDLEtBQUtsQixPQUFMLENBQWF1RCxvQkFBZCxDQUFyQyxDQUFELENBQTJFalAsTUFBM0U7QUFDQSxhQUFLb1osU0FBTCxDQUFlLEtBQUs3YSxPQUFwQixFQUE2QixLQUFLbU4sT0FBbEM7QUFDRCxPQUhELE1BR087QUFDTCxhQUFLMk4sZUFBTCxDQUFxQixLQUFLM04sT0FBMUI7QUFDRDs7QUFDRGtCLE1BQUFBLENBQUMsQ0FBQyxLQUFLbEIsT0FBTCxDQUFhNE4sdUJBQWQsQ0FBRCxDQUF3Q3haLFdBQXhDLENBQW9ELFFBQXBEO0FBQ0E4TSxNQUFBQSxDQUFDLENBQUMsS0FBS2xCLE9BQUwsQ0FBYTROLHVCQUFiLEdBQXVDLEdBQXZDLEdBQTZDSixVQUE5QyxDQUFELENBQTJEOVosUUFBM0QsQ0FBb0UsUUFBcEU7QUFDQXdOLE1BQUFBLENBQUMsQ0FBQyxLQUFLbEIsT0FBTCxDQUFhNE4sdUJBQWIsR0FBdUMscUJBQXhDLENBQUQsQ0FBZ0VqYyxHQUFoRSxDQUFvRSxFQUFwRTtBQUNBLFdBQUtrVixhQUFMLENBQW1CLEtBQUs3RyxPQUFMLENBQWErQixlQUFoQyxFQUFpRDJFLG1CQUFqRDtBQUNELEtBcnVCZ0I7QUFxdUJkO0FBRUhpSCxJQUFBQSxlQUFlLEVBQUUseUJBQVMzTixPQUFULEVBQWtCO0FBQ2pDa0IsTUFBQUEsQ0FBQyxDQUFDLDRCQUFELEVBQStCQSxDQUFDLENBQUNsQixPQUFPLENBQUN1RCxvQkFBVCxDQUFoQyxDQUFELENBQWlFalAsTUFBakU7QUFDQTRNLE1BQUFBLENBQUMsQ0FBQywwQkFBRCxFQUE2QkEsQ0FBQyxDQUFDbEIsT0FBTyxDQUFDdUQsb0JBQVQsQ0FBOUIsQ0FBRCxDQUErRGpQLE1BQS9EO0FBQ0E0TSxNQUFBQSxDQUFDLENBQUMseUJBQUQsRUFBNEJBLENBQUMsQ0FBQ2xCLE9BQU8sQ0FBQ3VELG9CQUFULENBQTdCLENBQUQsQ0FBOERqUCxNQUE5RDtBQUNBNE0sTUFBQUEsQ0FBQyxDQUFDbEIsT0FBTyxDQUFDNk4sVUFBVCxDQUFELENBQXNCeEUsSUFBdEIsQ0FBMkIsOENBQTNCO0FBQ0EsV0FBS3lFLGNBQUwsQ0FBb0I5TixPQUFwQixFQUE2QixLQUE3QixFQUFvQyxFQUFwQyxFQUF3QyxFQUF4QyxFQUE0QyxJQUE1QyxFQUxpQyxDQUtrQjs7QUFDbkQsVUFBSSxPQUFPLEtBQUsrTixXQUFaLEtBQTRCLFdBQWhDLEVBQTZDO0FBQzNDLGFBQUtBLFdBQUwsQ0FBaUJDLE9BQWpCO0FBQ0Q7QUFDRixLQWh2QmdCO0FBZ3ZCZDtBQUVIakssSUFBQUEsZ0JBQWdCLEVBQUUsMEJBQVNsUixPQUFULEVBQWtCbU4sT0FBbEIsRUFBMkI7QUFFM0MsVUFBSXVGLElBQUksR0FBRyxJQUFYO0FBRUEsVUFBSTVKLEtBQUssR0FBRztBQUNWc1MsUUFBQUEsSUFBSSxFQUFFO0FBQ0pDLFVBQUFBLFNBQVMsRUFBRSxTQURQO0FBRUpDLFVBQUFBLFVBQVUsRUFBRSxNQUZSO0FBR0pDLFVBQUFBLFVBQVUsRUFBRSxHQUhSO0FBSUpDLFVBQUFBLFVBQVUsRUFBRSxpQkFKUjtBQUtKQyxVQUFBQSxRQUFRLEVBQUUsTUFMTixDQU1KO0FBQ0E7O0FBUEksU0FESTtBQVVWQyxRQUFBQSxPQUFPLEVBQUU7QUFDUEMsVUFBQUEsS0FBSyxFQUFFO0FBREE7QUFWQyxPQUFaLENBSjJDLENBbUIzQztBQUNBOztBQUNBLFVBQUt0TixDQUFDLENBQUMsb0JBQUQsQ0FBRCxDQUF3QnBRLE1BQXhCLEtBQW1DLENBQW5DLElBQXdDb1EsQ0FBQyxDQUFDLDZCQUFELENBQUQsQ0FBaUNwUSxNQUFqQyxLQUE0QyxDQUF6RixFQUE0RjtBQUMxRjtBQUNEOztBQUNEeVUsTUFBQUEsSUFBSSxDQUFDa0osaUJBQUwsR0FBeUJsSixJQUFJLENBQUN6QyxRQUFMLENBQWNxSixNQUFkLENBQXFCLFlBQXJCLEVBQW1DO0FBQzFEdUMsUUFBQUEsUUFBUSxFQUFFLElBRGdEO0FBRTFEL1MsUUFBQUEsS0FBSyxFQUFFQTtBQUZtRCxPQUFuQyxDQUF6QjtBQUlBNEosTUFBQUEsSUFBSSxDQUFDa0osaUJBQUwsQ0FBdUJqQyxLQUF2QixDQUE2QnhNLE9BQU8sQ0FBQzJPLGVBQXJDO0FBRUFwSixNQUFBQSxJQUFJLENBQUNxSixpQkFBTCxHQUF5QnJKLElBQUksQ0FBQ3pDLFFBQUwsQ0FBY3FKLE1BQWQsQ0FBcUIsWUFBckIsRUFBbUM7QUFDMUR4USxRQUFBQSxLQUFLLEVBQUVBO0FBRG1ELE9BQW5DLENBQXpCO0FBR0E0SixNQUFBQSxJQUFJLENBQUNxSixpQkFBTCxDQUF1QnBDLEtBQXZCLENBQTZCeE0sT0FBTyxDQUFDNk8sZUFBckM7QUFFQXRKLE1BQUFBLElBQUksQ0FBQ3VKLGNBQUwsR0FBc0J2SixJQUFJLENBQUN6QyxRQUFMLENBQWNxSixNQUFkLENBQXFCLFNBQXJCLEVBQWdDO0FBQ3BEeFEsUUFBQUEsS0FBSyxFQUFFQTtBQUQ2QyxPQUFoQyxDQUF0QjtBQUdBNEosTUFBQUEsSUFBSSxDQUFDdUosY0FBTCxDQUFvQnRDLEtBQXBCLENBQTBCeE0sT0FBTyxDQUFDK08sZUFBbEMsRUF0QzJDLENBd0MzQzs7QUFDQXhKLE1BQUFBLElBQUksQ0FBQ2tKLGlCQUFMLENBQXVCN2IsRUFBdkIsQ0FBMEIsUUFBMUIsRUFBb0MsVUFBUzhaLEtBQVQsRUFBZ0I7QUFDbEQsWUFBSWhHLG1CQUFtQixHQUFHLE1BQTFCLENBRGtELENBRWxEOztBQUNBLFlBQUlnRyxLQUFLLENBQUNzQyxLQUFWLEVBQWlCO0FBQ2YsY0FBS3RDLEtBQUssQ0FBQ3NDLEtBQU4sS0FBZ0IsTUFBckIsRUFBOEI7QUFDNUJ0SSxZQUFBQSxtQkFBbUIsR0FBRyxNQUF0QjtBQUNEO0FBQ0YsU0FQaUQsQ0FRbEQ7OztBQUNBbkIsUUFBQUEsSUFBSSxDQUFDMEosa0JBQUwsQ0FBd0J2QyxLQUFLLENBQUN4WCxLQUE5QixFQUFxQ2dNLENBQUMsQ0FBQ2xCLE9BQU8sQ0FBQzJPLGVBQVQsRUFBMEI5YixPQUExQixDQUF0QyxFQUEwRUEsT0FBMUUsRUFBbUZtTixPQUFuRixFQVRrRCxDQVVsRDs7QUFDQXVGLFFBQUFBLElBQUksQ0FBQzJKLFlBQUwsQ0FBa0JsUCxPQUFsQixFQUEyQmtCLENBQUMsQ0FBQ3FFLElBQUksQ0FBQ3ZGLE9BQUwsQ0FBYXVELG9CQUFkLENBQUQsQ0FBcUMxTyxJQUFyQyxDQUEwQyxRQUExQyxDQUEzQixFQUFnRixLQUFoRjtBQUNBMFEsUUFBQUEsSUFBSSxDQUFDc0IsYUFBTCxDQUFtQnRCLElBQUksQ0FBQ3ZGLE9BQUwsQ0FBYStCLGVBQWhDLEVBQWlEMkUsbUJBQWpEO0FBQ0QsT0FiRDtBQWVBbkIsTUFBQUEsSUFBSSxDQUFDcUosaUJBQUwsQ0FBdUJoYyxFQUF2QixDQUEwQixRQUExQixFQUFvQyxVQUFTOFosS0FBVCxFQUFnQjtBQUNsRDtBQUNBbkgsUUFBQUEsSUFBSSxDQUFDMEosa0JBQUwsQ0FBd0J2QyxLQUFLLENBQUN4WCxLQUE5QixFQUFxQ2dNLENBQUMsQ0FBQ2xCLE9BQU8sQ0FBQzZPLGVBQVQsRUFBMEJoYyxPQUExQixDQUF0QyxFQUEwRUEsT0FBMUUsRUFBbUZtTixPQUFuRixFQUZrRCxDQUdsRDs7QUFDQXVGLFFBQUFBLElBQUksQ0FBQzJKLFlBQUwsQ0FBa0JsUCxPQUFsQixFQUEyQmtCLENBQUMsQ0FBQ3FFLElBQUksQ0FBQ3ZGLE9BQUwsQ0FBYXVELG9CQUFkLENBQUQsQ0FBcUMxTyxJQUFyQyxDQUEwQyxRQUExQyxDQUEzQixFQUFnRixLQUFoRjtBQUNELE9BTEQ7QUFPQTBRLE1BQUFBLElBQUksQ0FBQ3VKLGNBQUwsQ0FBb0JsYyxFQUFwQixDQUF1QixRQUF2QixFQUFpQyxVQUFTOFosS0FBVCxFQUFnQjtBQUMvQztBQUNBbkgsUUFBQUEsSUFBSSxDQUFDMEosa0JBQUwsQ0FBd0J2QyxLQUFLLENBQUN4WCxLQUE5QixFQUFxQ2dNLENBQUMsQ0FBQ2xCLE9BQU8sQ0FBQytPLGVBQVQsRUFBMEJsYyxPQUExQixDQUF0QyxFQUEwRUEsT0FBMUUsRUFBbUZtTixPQUFuRixFQUYrQyxDQUcvQzs7QUFDQXVGLFFBQUFBLElBQUksQ0FBQzJKLFlBQUwsQ0FBa0JsUCxPQUFsQixFQUEyQmtCLENBQUMsQ0FBQ3FFLElBQUksQ0FBQ3ZGLE9BQUwsQ0FBYXVELG9CQUFkLENBQUQsQ0FBcUMxTyxJQUFyQyxDQUEwQyxRQUExQyxDQUEzQixFQUFnRixLQUFoRjtBQUNELE9BTEQsRUEvRDJDLENBc0UzQzs7QUFDQTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUssS0FsMEJnQjtBQWswQmQ7QUFFSHNhLElBQUFBLFdBQVcsRUFBRSx1QkFBVztBQUN0QmpPLE1BQUFBLENBQUMsQ0FBQyxLQUFLbEIsT0FBTCxDQUFhNk4sVUFBZCxDQUFELENBQTJCelMsSUFBM0I7QUFDQThGLE1BQUFBLENBQUMsQ0FBQyxLQUFLbEIsT0FBTCxDQUFhNk4sVUFBZCxDQUFELENBQTJCM0MsS0FBM0IsQ0FBaUMsNk5BQWpDO0FBQ0QsS0F2MEJnQjtBQXkwQmpCa0UsSUFBQUEsV0FBVyxFQUFFLHVCQUFXO0FBQ3RCbE8sTUFBQUEsQ0FBQyxDQUFDLEtBQUtsQixPQUFMLENBQWE2TixVQUFkLENBQUQsQ0FBMkIzUyxJQUEzQjtBQUNBZ0csTUFBQUEsQ0FBQyxDQUFDLFlBQUQsQ0FBRCxDQUFnQjlGLElBQWhCO0FBQ0QsS0E1MEJnQjtBQTgwQmpCc1MsSUFBQUEsU0FBUyxFQUFFLG1CQUFTN2EsT0FBVCxFQUFrQm1OLE9BQWxCLEVBQTJCO0FBQ3BDLFVBQUlxUCxrQkFBa0IsR0FBRyxXQUF6QjtBQUNBLFVBQUlDLGNBQWMsR0FBRyxpQkFBaUJELGtCQUFqQixHQUFzQyxJQUEzRDtBQUNBLFVBQUk5SixJQUFJLEdBQUcsSUFBWCxDQUhvQyxDQUlwQzs7QUFDQUEsTUFBQUEsSUFBSSxDQUFDdUksY0FBTCxDQUFvQjlOLE9BQXBCLEVBQTZCLElBQTdCLEVBQW1DLEVBQW5DLEVBQXVDLDRDQUF2Qzs7QUFFQSxVQUFJLE9BQU91UCxLQUFQLEtBQWlCLFdBQXJCLEVBQWtDO0FBQ2hDaEssUUFBQUEsSUFBSSxDQUFDd0ksV0FBTCxHQUFtQndCLEtBQUssQ0FBQ3BELE1BQU4sQ0FBYTtBQUM5QnFELFVBQUFBLFVBQVUsRUFBRSxVQURrQjtBQUU5QkMsVUFBQUEsR0FBRyxFQUFFelAsT0FBTyxDQUFDMFAsU0FGaUI7QUFHOUIzSixVQUFBQSxPQUFPLEVBQUUsQ0FBQyxNQUFELENBSHFCO0FBSTlCO0FBQ0E0SixVQUFBQSxLQUFLLEVBQUV2ZSxRQUFRLENBQUN3ZSxjQUFULENBQXdCLGtCQUF4QixFQUE0QzlkLEtBTHJCO0FBTTlCK2QsVUFBQUEsU0FBUyxFQUFFLG1CQUFTQyxZQUFULEVBQXVCQyxRQUF2QixFQUFpQztBQUMxQ3hLLFlBQUFBLElBQUksQ0FBQzRKLFdBQUw7QUFDQWpPLFlBQUFBLENBQUMsQ0FBQ3VFLElBQUYsQ0FBTztBQUNMRSxjQUFBQSxHQUFHLEVBQUMsMEJBREM7QUFFTG5ULGNBQUFBLElBQUksRUFBRXdkLElBQUksQ0FBQ0MsU0FBTCxDQUFlO0FBQUVILGdCQUFBQSxZQUFZLEVBQUVBLFlBQWhCO0FBQThCSSxnQkFBQUEsVUFBVSxFQUFFSCxRQUFRLENBQUNHO0FBQW5ELGVBQWYsQ0FGRDtBQUdMaFosY0FBQUEsSUFBSSxFQUFFLE1BSEQ7QUFJTGlaLGNBQUFBLFdBQVcsRUFBRTtBQUpSLGFBQVAsRUFNQ3ZLLElBTkQsQ0FNTSxVQUFTd0ssUUFBVCxFQUFtQjtBQUN2QixrQkFBSSxPQUFPQSxRQUFRLENBQUNsYixLQUFoQixLQUEwQixXQUE5QixFQUEyQztBQUN6QztBQUNBcVEsZ0JBQUFBLElBQUksQ0FBQzZKLFdBQUw7QUFDQWxPLGdCQUFBQSxDQUFDLENBQUNsQixPQUFPLENBQUM2TixVQUFULENBQUQsQ0FBc0JwRCxNQUF0QixDQUE2QiwyQ0FBMkMyRixRQUFRLENBQUNsYixLQUFwRCxHQUE0RCxNQUF6RjtBQUNELGVBSkQsTUFJTztBQUNMO0FBQ0E7QUFDQTtBQUNBLG9CQUFJZ00sQ0FBQyxDQUFDb08sY0FBRCxDQUFELENBQWtCeGUsTUFBbEIsR0FBMkIsQ0FBL0IsRUFBa0M7QUFDaENvUSxrQkFBQUEsQ0FBQyxDQUFDb08sY0FBRCxDQUFELENBQWtCM2QsR0FBbEIsQ0FBc0J5ZSxRQUFRLENBQUNDLHlCQUEvQjtBQUNELGlCQUZELE1BRU87QUFDTG5QLGtCQUFBQSxDQUFDLENBQUNsQixPQUFPLENBQUN1RCxvQkFBVCxDQUFELENBQWdDK00sT0FBaEMsQ0FBd0NwUCxDQUFDLENBQUMsa0NBQWtDbU8sa0JBQWxDLEdBQXVELElBQXhELENBQUQsQ0FBK0QxZCxHQUEvRCxDQUFtRXllLFFBQVEsQ0FBQ0MseUJBQTVFLENBQXhDO0FBQ0Q7O0FBQ0RuUCxnQkFBQUEsQ0FBQyxDQUFDbEIsT0FBTyxDQUFDNk4sVUFBVCxFQUFxQmhiLE9BQXJCLENBQUQsQ0FBK0J3VyxJQUEvQixDQUFvQywyREFBcEM7QUFDQTlELGdCQUFBQSxJQUFJLENBQUM2SixXQUFMO0FBQ0E3SixnQkFBQUEsSUFBSSxDQUFDdUksY0FBTCxDQUFvQjlOLE9BQXBCLEVBQTZCLEtBQTdCO0FBQ0Q7QUFDRixhQXhCRCxFQXlCQ3VRLElBekJELENBeUJNLFVBQVNILFFBQVQsRUFBbUI7QUFDdkI3SyxjQUFBQSxJQUFJLENBQUN0QyxLQUFMLENBQVdtTixRQUFYO0FBQ0E3SyxjQUFBQSxJQUFJLENBQUM2SixXQUFMO0FBQ0FsTyxjQUFBQSxDQUFDLENBQUNsQixPQUFPLENBQUM2TixVQUFULENBQUQsQ0FBc0JwRCxNQUF0QixDQUE2QiwyQ0FBMkMyRixRQUFRLENBQUNsYixLQUFwRCxHQUE0RCxNQUF6RjtBQUNELGFBN0JEO0FBOEJEO0FBdEM2QixTQUFiLENBQW5CO0FBd0NBZ00sUUFBQUEsQ0FBQyxDQUFDbEIsT0FBTyxDQUFDNk4sVUFBUixHQUFxQixJQUF0QixDQUFELENBQTZCckYsS0FBN0IsQ0FBbUMsVUFBU2tFLEtBQVQsRUFBZ0I7QUFDakRBLFVBQUFBLEtBQUssQ0FBQzNhLGNBQU47QUFDQXdULFVBQUFBLElBQUksQ0FBQ2lMLGVBQUwsQ0FBcUJqTCxJQUFJLENBQUN2RixPQUExQixFQUFtQ3VGLElBQUksQ0FBQzFTLE9BQXhDLEVBRmlELENBR2pEOztBQUNBMFMsVUFBQUEsSUFBSSxDQUFDd0ksV0FBTCxDQUFpQjBDLElBQWpCO0FBQ0QsU0FMRDtBQU1EO0FBQ0YsS0FyNEJnQjtBQXE0QmQ7QUFFSHZCLElBQUFBLFlBQVksRUFBRSxzQkFBU2xQLE9BQVQsRUFBa0IwUSxNQUFsQixFQUEwQkMsUUFBMUIsRUFBb0M7QUFDaEQ7QUFDQSxXQUFLN0MsY0FBTCxDQUFvQjlOLE9BQXBCLEVBQTZCMlEsUUFBN0IsRUFBdUNELE1BQXZDOztBQUNBLFVBQUlDLFFBQVEsS0FBSyxLQUFqQixFQUF3QjtBQUN0QkQsUUFBQUEsTUFBTSxDQUFDamYsSUFBUCxDQUFZdU8sT0FBTyxDQUFDeUMsV0FBcEI7QUFDRCxPQUZELE1BRU87QUFDTGlPLFFBQUFBLE1BQU0sQ0FBQ2pmLElBQVAsQ0FBWSxZQUFaO0FBQ0Q7QUFDRixLQS80QmdCO0FBKzRCZDtBQUVIcWMsSUFBQUEsY0FBYyxFQUFFLHdCQUFTOU4sT0FBVCxFQUFrQjJRLFFBQWxCLEVBQW9GO0FBQUEsVUFBeERELE1BQXdELHVFQUEvQyxFQUErQztBQUFBLFVBQTNDNVEsT0FBMkMsdUVBQWpDLEVBQWlDO0FBQUEsVUFBN0I4USxtQkFBNkIsdUVBQVAsS0FBTzs7QUFDbEcsVUFBSUYsTUFBTSxLQUFLLEVBQWYsRUFBbUI7QUFDakJBLFFBQUFBLE1BQU0sR0FBR3hQLENBQUMsQ0FBQ2xCLE9BQU8sQ0FBQ3VELG9CQUFULENBQUQsQ0FBZ0MxTyxJQUFoQyxDQUFxQyxRQUFyQyxDQUFUO0FBQ0Q7O0FBQ0Q2YixNQUFBQSxNQUFNLENBQUM5USxJQUFQLENBQVksVUFBWixFQUF3QitRLFFBQXhCOztBQUNBLFVBQUk3USxPQUFPLEtBQUssRUFBaEIsRUFBb0I7QUFDbEIsWUFBSTZRLFFBQVEsS0FBSyxJQUFqQixFQUF1QjtBQUNyQkQsVUFBQUEsTUFBTSxDQUFDeFMsSUFBUCxDQUFZLFlBQVosRUFBMEI0QixPQUExQjtBQUNELFNBRkQsTUFFTztBQUNMNFEsVUFBQUEsTUFBTSxDQUFDRyxVQUFQLENBQW1CLFlBQW5CLEVBREssQ0FDOEI7QUFDcEM7O0FBQ0RILFFBQUFBLE1BQU0sQ0FBQzlkLEVBQVAsQ0FBVSxrQkFBVixFQUE4QixVQUFTOFosS0FBVCxFQUFnQjtBQUM1QzFSLFVBQUFBLEtBQUssQ0FBQ0UsSUFBTixDQUFjLElBQWQsRUFBc0I7QUFBRWEsWUFBQUEsSUFBSSxFQUFFO0FBQVIsV0FBdEI7QUFDRCxTQUZEO0FBR0EyVSxRQUFBQSxNQUFNLENBQUM5ZCxFQUFQLENBQVUsWUFBVixFQUF3QixVQUFTOFosS0FBVCxFQUFnQjtBQUN0QzFSLFVBQUFBLEtBQUssQ0FBQ0ksSUFBTixDQUFjLElBQWQ7QUFDRCxTQUZEO0FBR0QsT0FaRCxNQVlPO0FBQ0xzVixRQUFBQSxNQUFNLENBQUNHLFVBQVAsQ0FBbUIsWUFBbkI7O0FBQ0EsWUFBSUQsbUJBQW1CLEtBQUssSUFBNUIsRUFBbUM7QUFDakNGLFVBQUFBLE1BQU0sQ0FBQzlkLEVBQVAsQ0FBVSxrQkFBVixFQUE4QixVQUFTOFosS0FBVCxFQUFnQjtBQUM1QzFSLFlBQUFBLEtBQUssQ0FBQ0ksSUFBTixDQUFjLElBQWQ7QUFDRCxXQUZEO0FBR0FzVixVQUFBQSxNQUFNLENBQUNsSSxLQUFQLENBQWEsVUFBU2tFLEtBQVQsRUFBZ0I7QUFDM0IsbUJBQU8sSUFBUDtBQUNELFdBRkQ7QUFHRDtBQUNGO0FBQ0YsS0E3NkJnQjtBQTY2QmQ7QUFFSDFJLElBQUFBLGFBQWEsRUFBRSx1QkFBU25SLE9BQVQsRUFBa0JtTixPQUFsQixFQUEyQjtBQUN4QyxVQUFJOFEsS0FBSyxHQUFHMWYsUUFBUSxDQUFDQyxnQkFBVCxDQUEwQjJPLE9BQU8sQ0FBQytRLGFBQWxDLENBQVo7QUFDQUQsTUFBQUEsS0FBSyxDQUFDL1MsT0FBTixDQUFlLFVBQVcrQyxJQUFYLEVBQWtCO0FBQy9CekQsUUFBQUEsU0FBUyxDQUFFeUQsSUFBRixFQUFRO0FBQ2ZaLFVBQUFBLDBCQUEwQixFQUFFLHdCQURiO0FBRWZELFVBQUFBLG9CQUFvQixFQUFFLG9CQUZQO0FBR2ZiLFVBQUFBLFlBQVksRUFBRSxTQUhDO0FBSWZlLFVBQUFBLGNBQWMsRUFBRTtBQUpELFNBQVIsQ0FBVDtBQU1ELE9BUEQ7QUFRQSxXQUFLNlEsaUJBQUwsQ0FBdUJoUixPQUF2QjtBQUNELEtBMTdCZ0I7QUEwN0JkO0FBRUhnUixJQUFBQSxpQkFBaUIsRUFBRSwyQkFBU2hSLE9BQVQsRUFBa0I7QUFDbkMsVUFBSWMsSUFBSSxHQUFHSSxDQUFDLENBQUVsQixPQUFPLENBQUMrUSxhQUFWLENBQVosQ0FEbUMsQ0FFbkM7O0FBQ0FqUSxNQUFBQSxJQUFJLENBQUNqTSxJQUFMLENBQVcsUUFBWCxFQUFzQmpDLEVBQXRCLENBQTBCLFNBQTFCLEVBQXFDLFlBQVk7QUFDN0MsWUFBSWlHLEtBQUssR0FBR3FJLENBQUMsQ0FBRSxJQUFGLENBQWIsQ0FENkMsQ0FFN0M7O0FBQ0YsWUFBSStQLEtBQUssR0FBR25RLElBQUksQ0FBQ2pNLElBQUwsQ0FBVyxVQUFYLEVBQXdCb2MsS0FBeEIsRUFBWixDQUgrQyxDQUkvQzs7QUFDQSxZQUFJQyxZQUFZLEdBQUdELEtBQUssQ0FBQ3JTLE1BQU4sRUFBbkIsQ0FMK0MsQ0FNN0M7O0FBQ0EsWUFBSS9GLEtBQUssQ0FBQyxDQUFELENBQUwsS0FBYW9ZLEtBQUssQ0FBQyxDQUFELENBQXRCLEVBQTJCO0FBQ3ZCO0FBQ0E7QUFFQTtBQUNBLGNBQUlFLGFBQWEsR0FBR0QsWUFBWSxDQUFDRSxNQUFiLEdBQXNCeFYsR0FBMUMsQ0FMdUIsQ0FPdkI7O0FBQ0EsY0FBSXlWLFVBQVUsR0FBRzFoQixNQUFNLENBQUMyaEIsV0FBeEIsQ0FSdUIsQ0FVdkI7O0FBQ0EsY0FBS0gsYUFBYSxHQUFHRSxVQUFoQixJQUE4QkYsYUFBYSxHQUFHRSxVQUFVLEdBQUcxaEIsTUFBTSxDQUFDME0sV0FBdkUsRUFBcUY7QUFDakYsbUJBQU8sSUFBUDtBQUNILFdBYnNCLENBZXZCOzs7QUFDQTZFLFVBQUFBLENBQUMsQ0FBRSxZQUFGLENBQUQsQ0FBa0JxUSxTQUFsQixDQUE2QkosYUFBN0I7QUFDSDtBQUNKLE9BekJEO0FBMEJELEtBejlCZ0I7QUF5OUJkO0FBRUhsTixJQUFBQSxTQUFTLEVBQUUsbUJBQVNwUixPQUFULEVBQWtCbU4sT0FBbEIsRUFBMkI7QUFDcEMsVUFBSXVGLElBQUksR0FBRyxJQUFYO0FBRUFyRSxNQUFBQSxDQUFDLENBQUNsQixPQUFPLENBQUN1RCxvQkFBVCxDQUFELENBQWdDaU8sTUFBaEMsQ0FBdUMsVUFBUzlFLEtBQVQsRUFBZ0I7QUFDckRBLFFBQUFBLEtBQUssQ0FBQzNhLGNBQU47QUFDQXdULFFBQUFBLElBQUksQ0FBQzJILGFBQUwsQ0FBbUIzSCxJQUFuQixFQUF5QixRQUF6QjtBQUVELE9BSkQ7QUFLRCxLQW4rQmdCO0FBbStCZDtBQUVIMkgsSUFBQUEsYUFBYSxFQUFFLHVCQUFTM0gsSUFBVCxFQUFlck8sSUFBZixFQUFxQjtBQUVsQztBQUNBcU8sTUFBQUEsSUFBSSxDQUFDaUwsZUFBTCxDQUFxQmpMLElBQUksQ0FBQ3ZGLE9BQTFCLEVBQW1DdUYsSUFBSSxDQUFDMVMsT0FBeEMsRUFIa0MsQ0FLbEM7O0FBQ0EsVUFBSXFFLElBQUksS0FBSyxRQUFiLEVBQXVCO0FBQ3JCcU8sUUFBQUEsSUFBSSxDQUFDMkosWUFBTCxDQUFrQjNKLElBQUksQ0FBQ3ZGLE9BQXZCLEVBQWdDa0IsQ0FBQyxDQUFDcUUsSUFBSSxDQUFDdkYsT0FBTCxDQUFhdUQsb0JBQWQsQ0FBRCxDQUFxQzFPLElBQXJDLENBQTBDLFFBQTFDLENBQWhDLEVBQXFGLElBQXJGO0FBQ0QsT0FSaUMsQ0FVbEM7OztBQUNBLFVBQUk0YyxjQUFjLEdBQUdsTSxJQUFJLENBQUNtTSxzQkFBTCxFQUFyQixDQVhrQyxDQWFsQzs7QUFDQW5NLE1BQUFBLElBQUksQ0FBQ29NLHFCQUFMLENBQTJCcE0sSUFBSSxDQUFDdkYsT0FBaEMsRUFBeUN1RixJQUFJLENBQUMxUyxPQUE5QyxFQWRrQyxDQWdCbEM7QUFDQTs7QUFDQSxVQUFJcUUsSUFBSSxLQUFLLFFBQWIsRUFBdUI7QUFDckIsWUFBSTBhLFlBQVksR0FBRzFRLENBQUMsQ0FBQyxtQ0FBRCxDQUFELENBQXVDdlAsR0FBdkMsRUFBbkI7O0FBQ0EsWUFBSWlnQixZQUFZLEtBQUssY0FBckIsRUFBcUM7QUFDbkM7QUFDQXJNLFVBQUFBLElBQUksQ0FBQ3NNLG1CQUFMLENBQXlCdE0sSUFBSSxDQUFDa0osaUJBQTlCLEVBQWlEZ0QsY0FBakQ7QUFDRCxTQUhELE1BR087QUFDTDtBQUNBO0FBQ0FsTSxVQUFBQSxJQUFJLENBQUN1TSxnQkFBTCxDQUF1QjVRLENBQUMsQ0FBQyx5QkFBRCxDQUFELENBQTZCdlAsR0FBN0IsRUFBdkIsRUFBMkQsY0FBM0Q7QUFDRDtBQUNGLE9BVkQsTUFVTztBQUNMNFQsUUFBQUEsSUFBSSxDQUFDd00sY0FBTDtBQUNEO0FBQ0YsS0FwZ0NnQjtBQW9nQ2Q7QUFFSDlDLElBQUFBLGtCQUFrQixFQUFFLDRCQUFTL1osS0FBVCxFQUFnQjhjLGFBQWhCLEVBQStCbmYsT0FBL0IsRUFBd0NtTixPQUF4QyxFQUFpRDtBQUNuRTtBQUNBLFVBQUlpUyxXQUFXLEdBQUdELGFBQWEsQ0FBQzlULElBQWQsQ0FBbUIsSUFBbkIsQ0FBbEIsQ0FGbUUsQ0FHbkU7O0FBQ0FnRCxNQUFBQSxDQUFDLENBQUMseUJBQXlCK1EsV0FBMUIsQ0FBRCxDQUF3QzdkLFdBQXhDLENBQW9ELG9CQUFwRDtBQUNBOE0sTUFBQUEsQ0FBQyxDQUFDLHlCQUF5QitRLFdBQTFCLENBQUQsQ0FBd0NDLEtBQXhDO0FBQ0FoUixNQUFBQSxDQUFDLENBQUM4USxhQUFELENBQUQsQ0FBaUI1ZCxXQUFqQixDQUE2QixTQUE3Qjs7QUFDQSxVQUFJYyxLQUFKLEVBQVc7QUFDVCxZQUFJZ00sQ0FBQyxDQUFDLHlCQUF5QitRLFdBQTFCLENBQUQsQ0FBd0NuaEIsTUFBeEMsR0FBaUQsQ0FBckQsRUFBd0Q7QUFDdERvUSxVQUFBQSxDQUFDLENBQUMseUJBQXlCK1EsV0FBMUIsQ0FBRCxDQUF3Q3hnQixJQUF4QyxDQUE2Q3lELEtBQUssQ0FBQzRLLE9BQW5EO0FBQ0QsU0FGRCxNQUVPO0FBQ0xrUyxVQUFBQSxhQUFhLENBQUNwVCxNQUFkLEdBQXVCbEssTUFBdkIsQ0FBOEIsa0NBQWtDdWQsV0FBbEMsR0FBZ0QsSUFBaEQsR0FBdUQvYyxLQUFLLENBQUM0SyxPQUE3RCxHQUF1RSxNQUFyRztBQUNEOztBQUNEb0IsUUFBQUEsQ0FBQyxDQUFDLHlCQUF5QitRLFdBQTFCLENBQUQsQ0FBd0N2ZSxRQUF4QyxDQUFpRCxvQkFBakQ7QUFDQXNlLFFBQUFBLGFBQWEsQ0FBQ3BULE1BQWQsR0FBdUJsTCxRQUF2QixDQUFnQyx3QkFBaEM7QUFDQXdOLFFBQUFBLENBQUMsQ0FBQzhRLGFBQUQsQ0FBRCxDQUFpQnRlLFFBQWpCLENBQTBCLFNBQTFCOztBQUNBLFlBQUlzZSxhQUFhLENBQUNwVCxNQUFkLEdBQXVCOU4sTUFBdkIsR0FBZ0MsQ0FBcEMsRUFBdUM7QUFDckNvUSxVQUFBQSxDQUFDLENBQUMsWUFBRCxDQUFELENBQWdCaVIsT0FBaEIsQ0FBd0I7QUFDdEJaLFlBQUFBLFNBQVMsRUFBRVMsYUFBYSxDQUFDcFQsTUFBZCxHQUF1QndTLE1BQXZCLEdBQWdDeFY7QUFEckIsV0FBeEIsRUFFRyxJQUZIO0FBR0Q7QUFDRixPQWRELE1BY087QUFDTHNGLFFBQUFBLENBQUMsQ0FBQzhRLGFBQUQsQ0FBRCxDQUFpQjVkLFdBQWpCLENBQTZCLFNBQTdCO0FBQ0E4TSxRQUFBQSxDQUFDLENBQUMseUJBQXlCK1EsV0FBMUIsQ0FBRCxDQUF3QzdkLFdBQXhDLENBQW9ELG9CQUFwRDtBQUNBOE0sUUFBQUEsQ0FBQyxDQUFDLHlCQUF5QitRLFdBQTFCLENBQUQsQ0FBd0NDLEtBQXhDO0FBQ0FoUixRQUFBQSxDQUFDLENBQUNsQixPQUFPLENBQUMyTyxlQUFULEVBQTBCOWIsT0FBMUIsQ0FBRCxDQUFvQ3VCLFdBQXBDLENBQWdELG9CQUFoRDtBQUNBOE0sUUFBQUEsQ0FBQyxDQUFDbEIsT0FBTyxDQUFDNk8sZUFBVCxFQUEwQmhjLE9BQTFCLENBQUQsQ0FBb0N1QixXQUFwQyxDQUFnRCxvQkFBaEQ7QUFDQThNLFFBQUFBLENBQUMsQ0FBQ2xCLE9BQU8sQ0FBQytPLGVBQVQsRUFBMEJsYyxPQUExQixDQUFELENBQW9DdUIsV0FBcEMsQ0FBZ0Qsb0JBQWhEO0FBQ0E4TSxRQUFBQSxDQUFDLENBQUNsQixPQUFPLENBQUMyTyxlQUFULEVBQTBCOWIsT0FBMUIsQ0FBRCxDQUFvQytMLE1BQXBDLEdBQTZDeEssV0FBN0MsQ0FBeUQsd0JBQXpEO0FBQ0E4TSxRQUFBQSxDQUFDLENBQUNsQixPQUFPLENBQUM2TyxlQUFULEVBQTBCaGMsT0FBMUIsQ0FBRCxDQUFvQytMLE1BQXBDLEdBQTZDeEssV0FBN0MsQ0FBeUQsd0JBQXpEO0FBQ0E4TSxRQUFBQSxDQUFDLENBQUNsQixPQUFPLENBQUMrTyxlQUFULEVBQTBCbGMsT0FBMUIsQ0FBRCxDQUFvQytMLE1BQXBDLEdBQTZDeEssV0FBN0MsQ0FBeUQsd0JBQXpEO0FBQ0Q7QUFDRixLQXRpQ2dCO0FBc2lDZDtBQUVIb2MsSUFBQUEsZUFBZSxFQUFFLHlCQUFTeFEsT0FBVCxFQUFrQm5OLE9BQWxCLEVBQTJCO0FBQzFDLFVBQUkwUyxJQUFJLEdBQUcsSUFBWDtBQUNBckUsTUFBQUEsQ0FBQyxDQUFDLHFCQUFELENBQUQsQ0FBeUI1TSxNQUF6QjtBQUNBNE0sTUFBQUEsQ0FBQyxDQUFDLG1CQUFELEVBQXNCck8sT0FBdEIsQ0FBRCxDQUFnQ3VCLFdBQWhDLENBQTRDLFNBQTVDO0FBQ0E4TSxNQUFBQSxDQUFDLENBQUMsT0FBRCxFQUFVck8sT0FBVixDQUFELENBQW9CdUIsV0FBcEIsQ0FBZ0Msd0JBQWhDO0FBQ0E4TSxNQUFBQSxDQUFDLENBQUNsQixPQUFPLENBQUM0Tix1QkFBVCxFQUFrQy9hLE9BQWxDLENBQUQsQ0FBNEN1QixXQUE1QyxDQUF3RCxpQkFBeEQ7QUFDQThNLE1BQUFBLENBQUMsQ0FBQyxxQkFBRCxDQUFELENBQXlCNU0sTUFBekI7QUFFQTRNLE1BQUFBLENBQUMsQ0FBQ2xCLE9BQU8sQ0FBQ29OLGNBQVIsR0FBeUIsUUFBMUIsQ0FBRCxDQUFxQzVHLE1BQXJDLENBQTRDLFlBQVc7QUFDckR0RixRQUFBQSxDQUFDLENBQUNsQixPQUFPLENBQUM0Tix1QkFBUixHQUFrQyxXQUFuQyxDQUFELENBQWlEdFosTUFBakQsR0FEcUQsQ0FDTTs7QUFDM0Q0TSxRQUFBQSxDQUFDLENBQUNsQixPQUFPLENBQUM0Tix1QkFBVCxDQUFELENBQW1DaFAsTUFBbkMsR0FBNEMvSixJQUE1QyxDQUFpRCxxQkFBakQsRUFBd0VQLE1BQXhFLEdBRnFELENBR3JEOztBQUNBaVIsUUFBQUEsSUFBSSxDQUFDMkosWUFBTCxDQUFrQmxQLE9BQWxCLEVBQTJCa0IsQ0FBQyxDQUFDbEIsT0FBTyxDQUFDdUQsb0JBQVQsQ0FBRCxDQUFnQzFPLElBQWhDLENBQXFDLFFBQXJDLENBQTNCLEVBQTJFLEtBQTNFO0FBQ0QsT0FMRDtBQU1ELEtBdGpDZ0I7QUFzakNkO0FBRUg4YyxJQUFBQSxxQkFBcUIsRUFBRSwrQkFBUzNSLE9BQVQsRUFBa0JuTixPQUFsQixFQUEyQjtBQUNoRDtBQUNBLFVBQUltTixPQUFPLENBQUN3QyxjQUFSLEtBQTJCLElBQS9CLEVBQXFDO0FBQ25DLFlBQUlvSixJQUFJLEdBQUc7QUFDVDNCLFVBQUFBLEtBQUssRUFBRS9JLENBQUMsQ0FBQ2xCLE9BQU8sQ0FBQzZKLG9CQUFULEVBQStCaFgsT0FBL0IsQ0FBRCxDQUF5Q2xCLEdBQXpDLEVBREU7QUFFVHlnQixVQUFBQSxVQUFVLEVBQUVsUixDQUFDLENBQUNsQixPQUFPLENBQUNxUyx5QkFBVCxFQUFvQ3hmLE9BQXBDLENBQUQsQ0FBOENsQixHQUE5QyxFQUZIO0FBR1QyZ0IsVUFBQUEsU0FBUyxFQUFFcFIsQ0FBQyxDQUFDbEIsT0FBTyxDQUFDdVMsd0JBQVQsRUFBbUMxZixPQUFuQyxDQUFELENBQTZDbEIsR0FBN0MsRUFIRjtBQUlUNFosVUFBQUEsUUFBUSxFQUFFckssQ0FBQyxDQUFDbEIsT0FBTyxDQUFDd1MsdUJBQVQsRUFBa0MzZixPQUFsQyxDQUFELENBQTRDbEIsR0FBNUMsRUFKRDtBQUtUOGdCLFVBQUFBLElBQUksRUFBRXZSLENBQUMsQ0FBQ2xCLE9BQU8sQ0FBQzBTLDJCQUFULEVBQXNDN2YsT0FBdEMsQ0FBRCxDQUFnRGxCLEdBQWhELEVBTEc7QUFNVGdoQixVQUFBQSxLQUFLLEVBQUV6UixDQUFDLENBQUNsQixPQUFPLENBQUNnSiw0QkFBVCxFQUF1Q25XLE9BQXZDLENBQUQsQ0FBaURsQixHQUFqRCxFQU5FO0FBT1RpaEIsVUFBQUEsR0FBRyxFQUFFMVIsQ0FBQyxDQUFDbEIsT0FBTyxDQUFDOEksMEJBQVQsRUFBcUNqVyxPQUFyQyxDQUFELENBQStDbEIsR0FBL0M7QUFQSSxTQUFYO0FBU0F1UCxRQUFBQSxDQUFDLENBQUN1RSxJQUFGLENBQU87QUFDTEMsVUFBQUEsTUFBTSxFQUFFLE1BREg7QUFFTEMsVUFBQUEsR0FBRyxFQUFFM0YsT0FBTyxDQUFDNkwsYUFBUixHQUF3QixpREFGeEI7QUFHTHJaLFVBQUFBLElBQUksRUFBRW9aO0FBSEQsU0FBUCxFQUlHaEcsSUFKSCxDQUlRLFVBQVVwVCxJQUFWLEVBQWlCO0FBQ3ZCLGNBQUlBLElBQUksQ0FBQ3NaLE1BQUwsS0FBZ0IsU0FBaEIsSUFBNkJ0WixJQUFJLENBQUN1WixNQUFMLEtBQWdCLFVBQWpELEVBQTZELENBQzNEO0FBQ0Q7QUFDRixTQVJEO0FBU0Q7QUFDRixLQTlrQ2dCO0FBOGtDZDtBQUVIMkYsSUFBQUEsc0JBQXNCLEVBQUUsa0NBQVc7QUFDakMsVUFBSUQsY0FBYyxHQUFHLEVBQXJCO0FBQ0EsVUFBSW9CLGNBQWMsR0FBRyxFQUFyQjs7QUFFQSxVQUFJM1IsQ0FBQyxDQUFDLEtBQUtsQixPQUFMLENBQWE2SixvQkFBZCxDQUFELENBQXFDbFksR0FBckMsTUFBOEMsRUFBbEQsRUFBc0Q7QUFDcEQ4ZixRQUFBQSxjQUFjLENBQUN4SCxLQUFmLEdBQXVCL0ksQ0FBQyxDQUFDLEtBQUtsQixPQUFMLENBQWE2SixvQkFBZCxDQUFELENBQXFDbFksR0FBckMsRUFBdkI7QUFDRDs7QUFFRCxVQUFJbWhCLFNBQVMsR0FBRyxFQUFoQjs7QUFDQSxVQUFJNVIsQ0FBQyxDQUFDLFlBQUQsQ0FBRCxDQUFnQnBRLE1BQWhCLEdBQXlCLENBQTdCLEVBQWdDO0FBQzlCZ2lCLFFBQUFBLFNBQVMsR0FBRzVSLENBQUMsQ0FBQyxZQUFELENBQUQsQ0FBZ0J2UCxHQUFoQixFQUFaO0FBQ0QsT0FGRCxNQUVPO0FBQ0xtaEIsUUFBQUEsU0FBUyxHQUFHNVIsQ0FBQyxDQUFDLEtBQUtsQixPQUFMLENBQWFxUyx5QkFBZCxDQUFELENBQTBDMWdCLEdBQTFDLEtBQWtELEdBQWxELEdBQXdEdVAsQ0FBQyxDQUFDLEtBQUtsQixPQUFMLENBQWF1Uyx3QkFBZCxDQUFELENBQXlDNWdCLEdBQXpDLEVBQXBFO0FBQ0Q7O0FBQ0Q4ZixNQUFBQSxjQUFjLENBQUN4YyxJQUFmLEdBQXNCNmQsU0FBdEI7QUFFQSxVQUFJQyxNQUFNLEdBQUcsTUFBYjs7QUFDQSxVQUFJN1IsQ0FBQyxDQUFDLEtBQUtsQixPQUFMLENBQWFnVCw2QkFBZCxDQUFELENBQThDcmhCLEdBQTlDLE1BQXVELEVBQTNELEVBQStEO0FBQzdEb2hCLFFBQUFBLE1BQU0sR0FBRzdSLENBQUMsQ0FBQyxLQUFLbEIsT0FBTCxDQUFhZ1QsNkJBQWQsQ0FBRCxDQUE4Q3JoQixHQUE5QyxFQUFUO0FBQ0FraEIsUUFBQUEsY0FBYyxDQUFDSSxLQUFmLEdBQXVCRixNQUF2QjtBQUNEOztBQUVELFVBQUlOLElBQUksR0FBRyxNQUFYOztBQUNBLFVBQUl2UixDQUFDLENBQUMsS0FBS2xCLE9BQUwsQ0FBYTBTLDJCQUFkLENBQUQsQ0FBNEMvZ0IsR0FBNUMsTUFBcUQsRUFBekQsRUFBNkQ7QUFDM0Q4Z0IsUUFBQUEsSUFBSSxHQUFHdlIsQ0FBQyxDQUFDLEtBQUtsQixPQUFMLENBQWEwUywyQkFBZCxDQUFELENBQTRDL2dCLEdBQTVDLEVBQVA7QUFDQWtoQixRQUFBQSxjQUFjLENBQUNKLElBQWYsR0FBc0JBLElBQXRCO0FBQ0Q7O0FBRUQsVUFBSUUsS0FBSyxHQUFHLE1BQVo7O0FBQ0EsVUFBSXpSLENBQUMsQ0FBQyxLQUFLbEIsT0FBTCxDQUFhZ0osNEJBQWQsQ0FBRCxDQUE2Q3JYLEdBQTdDLE1BQXNELEVBQTFELEVBQThEO0FBQzVEZ2hCLFFBQUFBLEtBQUssR0FBR3pSLENBQUMsQ0FBQyxLQUFLbEIsT0FBTCxDQUFhZ0osNEJBQWQsQ0FBRCxDQUE2Q3JYLEdBQTdDLEVBQVI7QUFDQWtoQixRQUFBQSxjQUFjLENBQUNGLEtBQWYsR0FBdUJBLEtBQXZCO0FBQ0Q7O0FBRUQsVUFBSUMsR0FBRyxHQUFHLE1BQVY7O0FBQ0EsVUFBSTFSLENBQUMsQ0FBQyxLQUFLbEIsT0FBTCxDQUFhOEksMEJBQWQsQ0FBRCxDQUEyQ25YLEdBQTNDLE1BQW9ELEVBQXhELEVBQTREO0FBQzFEaWhCLFFBQUFBLEdBQUcsR0FBRzFSLENBQUMsQ0FBQyxLQUFLbEIsT0FBTCxDQUFhOEksMEJBQWQsQ0FBRCxDQUEyQ25YLEdBQTNDLEVBQU47QUFDQWtoQixRQUFBQSxjQUFjLENBQUNLLFdBQWYsR0FBNkJOLEdBQTdCO0FBQ0Q7O0FBRUQsVUFBSTVHLE9BQU8sR0FBRyxJQUFkO0FBQ0EsVUFBSW1ILG1CQUFtQixHQUFHalMsQ0FBQyxDQUFDLEtBQUtsQixPQUFMLENBQWFvVCw4QkFBZCxDQUFELENBQStDemhCLEdBQS9DLEVBQTFCOztBQUNBLFVBQUl3aEIsbUJBQW1CLElBQUksRUFBdkIsSUFBNkJBLG1CQUFtQixJQUFJLGVBQXhELEVBQXlFO0FBQ3ZFbkgsUUFBQUEsT0FBTyxHQUFHbUgsbUJBQVY7QUFDRDs7QUFDRE4sTUFBQUEsY0FBYyxDQUFDN0csT0FBZixHQUF5QkEsT0FBekI7O0FBRUEsVUFBSStHLE1BQU0sS0FBSyxNQUFYLElBQXFCTixJQUFJLEtBQUssTUFBOUIsSUFBd0NFLEtBQUssS0FBSyxNQUFsRCxJQUE0REMsR0FBRyxLQUFLLE1BQXhFLEVBQWdGO0FBQzlFbkIsUUFBQUEsY0FBYyxDQUFDNEIsT0FBZixHQUF5QlIsY0FBekI7QUFDRDs7QUFFRCxhQUFPcEIsY0FBUDtBQUNELEtBcG9DZ0I7QUFvb0NkO0FBRUhJLElBQUFBLG1CQUFtQixFQUFFLDZCQUFTeUIsV0FBVCxFQUFzQjdCLGNBQXRCLEVBQXNDO0FBQ3pELFVBQUlsTSxJQUFJLEdBQUcsSUFBWDtBQUNBQSxNQUFBQSxJQUFJLENBQUM1QyxNQUFMLENBQVlrUCxtQkFBWixDQUFnQztBQUM5QjNhLFFBQUFBLElBQUksRUFBRSxNQUR3QjtBQUU5Qk0sUUFBQUEsSUFBSSxFQUFFOGIsV0FGd0I7QUFHOUJDLFFBQUFBLGVBQWUsRUFBRTlCO0FBSGEsT0FBaEMsRUFJR2xGLElBSkgsQ0FJUSxVQUFTNkQsUUFBVCxFQUFtQjtBQUN6QixZQUFJQSxRQUFRLENBQUNsYixLQUFiLEVBQW9CO0FBQ2xCcVEsVUFBQUEsSUFBSSxDQUFDaU8saUJBQUwsQ0FBdUJwRCxRQUF2QjtBQUNELFNBRkQsTUFFTztBQUNMO0FBQ0EsY0FBSXpELFdBQVcsR0FBR3pMLENBQUMsQ0FBQ3FFLElBQUksQ0FBQ3ZGLE9BQUwsQ0FBYXVELG9CQUFkLENBQW5CO0FBQ0EsY0FBSWtRLFFBQVEsR0FBRzlqQixNQUFNLENBQUN5VyxRQUFQLENBQWdCQyxRQUEvQjtBQUNBLGNBQUl5RyxjQUFjLEdBQUcsbUJBQXJCO0FBQ0EsY0FBSUMsVUFBVSxHQUFHLGlCQUFpQkQsY0FBakIsR0FBa0MsSUFBbkQsQ0FMSyxDQU9MOztBQUNBLGNBQUk1TCxDQUFDLENBQUM2TCxVQUFELENBQUQsQ0FBY2pjLE1BQWQsR0FBdUIsQ0FBM0IsRUFBOEI7QUFDNUJvUSxZQUFBQSxDQUFDLENBQUM2TCxVQUFELENBQUQsQ0FBY3BiLEdBQWQsQ0FBa0J5ZSxRQUFRLENBQUNwRCxhQUFULENBQXVCQyxFQUF6QztBQUNELFdBRkQsTUFFTztBQUNMTixZQUFBQSxXQUFXLENBQUNqWSxNQUFaLENBQW1Cd00sQ0FBQyxDQUFDLGtDQUFrQzRMLGNBQWxDLEdBQW1ELElBQXBELENBQUQsQ0FBMkRuYixHQUEzRCxDQUErRHllLFFBQVEsQ0FBQ3BELGFBQVQsQ0FBdUJDLEVBQXRGLENBQW5CO0FBQ0Q7O0FBRUR5RyxVQUFBQSxLQUFLLENBQUNELFFBQUQsRUFBVztBQUNkL04sWUFBQUEsTUFBTSxFQUFFLE1BRE07QUFFZGlPLFlBQUFBLE9BQU8sRUFBRTtBQUNQLDhCQUFnQjtBQURULGFBRks7QUFLZEMsWUFBQUEsSUFBSSxFQUFFMVMsQ0FBQyxDQUFDeUwsV0FBRCxDQUFELENBQWVrSCxTQUFmO0FBTFEsV0FBWCxDQUFMLENBTUd0SCxJQU5ILENBTVEsVUFBUzZELFFBQVQsRUFBbUI7QUFDekI7QUFDQUEsWUFBQUEsUUFBUSxDQUFDMEQsSUFBVCxHQUFnQnZILElBQWhCLENBQXFCLFVBQVN1SCxJQUFULEVBQWU7QUFDbEN2TyxjQUFBQSxJQUFJLENBQUN3TyxvQkFBTCxDQUEwQkQsSUFBMUI7QUFDRCxhQUZEO0FBR0QsV0FYRDtBQVlEO0FBQ0YsT0FsQ0Q7QUFtQ0QsS0EzcUNnQjtBQTJxQ2Q7QUFFSGhDLElBQUFBLGdCQUFnQixFQUFFLDBCQUFTbkMsS0FBVCxFQUFnQnpZLElBQWhCLEVBQXNCO0FBQ3RDLFdBQUtvUSxvQkFBTCxDQUEwQnBRLElBQTFCO0FBQ0EsV0FBSzZhLGNBQUw7QUFDRCxLQWhyQ2dCO0FBZ3JDZDtBQUVIQSxJQUFBQSxjQUFjLEVBQUUsMEJBQVc7QUFDekIsVUFBSXhNLElBQUksR0FBRyxJQUFYO0FBQ0EsVUFBSW9ILFdBQVcsR0FBR3pMLENBQUMsQ0FBQyxLQUFLbEIsT0FBTCxDQUFhdUQsb0JBQWQsQ0FBbkI7QUFDQSxVQUFJa1EsUUFBUSxHQUFHOWpCLE1BQU0sQ0FBQ3lXLFFBQVAsQ0FBZ0JDLFFBQS9CLENBSHlCLENBS3pCO0FBQ0E7QUFDQTs7QUFDQW5GLE1BQUFBLENBQUMsQ0FBQ3VFLElBQUYsQ0FBTztBQUNMRSxRQUFBQSxHQUFHLEVBQUU4TixRQURBO0FBRUxPLFFBQUFBLEtBQUssRUFBRSxLQUZGO0FBR0x4aEIsUUFBQUEsSUFBSSxFQUFFME8sQ0FBQyxDQUFDeUwsV0FBRCxDQUFELENBQWVrSCxTQUFmLEVBSEQ7QUFJTDNjLFFBQUFBLElBQUksRUFBRTtBQUpELE9BQVAsRUFNQzBPLElBTkQsQ0FNTSxVQUFTd0ssUUFBVCxFQUFtQjtBQUN2QixZQUFJLE9BQU9BLFFBQVEsQ0FBQzZELE1BQWhCLEtBQTJCLFdBQS9CLEVBQTRDO0FBQzFDMU8sVUFBQUEsSUFBSSxDQUFDaU8saUJBQUwsQ0FBdUJwRCxRQUF2QjtBQUNELFNBRkQsTUFFTztBQUNMekQsVUFBQUEsV0FBVyxDQUFDQyxHQUFaLENBQWdCLENBQWhCLEVBQW1CNEUsTUFBbkIsR0FESyxDQUN3QjtBQUM5QjtBQUNGLE9BWkQsRUFhQ2pCLElBYkQsQ0FhTSxZQUFXO0FBQ2ZoTCxRQUFBQSxJQUFJLENBQUMySixZQUFMLENBQWtCM0osSUFBSSxDQUFDdkYsT0FBdkIsRUFBZ0NrQixDQUFDLENBQUNxRSxJQUFJLENBQUN2RixPQUFMLENBQWF1RCxvQkFBZCxDQUFELENBQXFDMU8sSUFBckMsQ0FBMEMsUUFBMUMsQ0FBaEMsRUFBcUYsS0FBckY7QUFDRCxPQWZEO0FBZ0JELEtBMXNDZ0I7QUEwc0NkO0FBRUhrZixJQUFBQSxvQkFBb0IsRUFBRSw4QkFBUzNELFFBQVQsRUFBbUI7QUFDdkMsVUFBSXpELFdBQVcsR0FBR3pMLENBQUMsQ0FBQyxLQUFLbEIsT0FBTCxDQUFhdUQsb0JBQWQsQ0FBbkI7O0FBQ0EsVUFBSTZNLFFBQVEsQ0FBQzZELE1BQWIsRUFBcUI7QUFDbkI7QUFDQSxhQUFLVCxpQkFBTCxDQUF1QnBELFFBQXZCO0FBQ0QsT0FIRCxNQUdPLElBQUlBLFFBQVEsQ0FBQzhELGVBQWIsRUFBOEIsQ0FDbkM7QUFDQTtBQUNELE9BSE0sTUFHQTtBQUNMdkgsUUFBQUEsV0FBVyxDQUFDQyxHQUFaLENBQWdCLENBQWhCLEVBQW1CNEUsTUFBbkIsR0FESyxDQUN3QjtBQUM5QjtBQUNGLEtBdnRDZ0I7QUF1dENkO0FBRUhnQyxJQUFBQSxpQkFBaUIsRUFBRSwyQkFBU3BELFFBQVQsRUFBbUI7QUFDcEMsVUFBSTdLLElBQUksR0FBRyxJQUFYO0FBQ0EsVUFBSTRPLFVBQVUsR0FBRyxFQUFqQixDQUZvQyxDQUdwQzs7QUFDQTVPLE1BQUFBLElBQUksQ0FBQzJKLFlBQUwsQ0FBa0IzSixJQUFJLENBQUN2RixPQUF2QixFQUFnQ2tCLENBQUMsQ0FBQ3FFLElBQUksQ0FBQ3ZGLE9BQUwsQ0FBYXVELG9CQUFkLENBQUQsQ0FBcUMxTyxJQUFyQyxDQUEwQyxRQUExQyxDQUFoQyxFQUFxRixLQUFyRixFQUpvQyxDQUtwQzs7QUFDQSxVQUFJLE9BQU91YixRQUFRLENBQUM2RCxNQUFoQixLQUEyQixXQUEvQixFQUE0QztBQUMxQyxZQUFJLE9BQU83RCxRQUFRLENBQUM2RCxNQUFULENBQWdCLENBQWhCLENBQVAsS0FBOEIsV0FBbEMsRUFBK0M7QUFDN0NFLFVBQUFBLFVBQVUsR0FBRy9ELFFBQVEsQ0FBQzZELE1BQVQsQ0FBZ0IsQ0FBaEIsRUFBbUJ4TixLQUFuQixHQUEyQixpQkFBeEM7QUFDRDs7QUFDRHZGLFFBQUFBLENBQUMsQ0FBQ2tULElBQUYsQ0FBT2hFLFFBQVEsQ0FBQzZELE1BQWhCLEVBQXdCLFVBQVUvTyxLQUFWLEVBQWlCaFEsS0FBakIsRUFBeUI7QUFDL0MsY0FBSSxPQUFPQSxLQUFLLENBQUN1UixLQUFiLEtBQXVCLFdBQTNCLEVBQXdDO0FBQ3RDME4sWUFBQUEsVUFBVSxHQUFHamYsS0FBSyxDQUFDdVIsS0FBTixHQUFjLGlCQUEzQjtBQUNELFdBRkQsTUFFTyxJQUFJLE9BQU92UixLQUFLLENBQUNtZixLQUFiLEtBQXVCLFdBQXZCLElBQXNDbmYsS0FBSyxDQUFDbWYsS0FBTixLQUFnQixFQUExRCxFQUE4RDtBQUNuRUYsWUFBQUEsVUFBVSxHQUFHLFFBQVFqZixLQUFLLENBQUNtZixLQUFkLEdBQXNCLFdBQW5DO0FBQ0Q7O0FBQ0Q5TyxVQUFBQSxJQUFJLENBQUMrTyxtQkFBTCxDQUF5QnBmLEtBQXpCLEVBQWdDaWYsVUFBaEM7QUFDRCxTQVBEO0FBUUQsT0FaRCxNQVlPLElBQUksT0FBTy9ELFFBQVEsQ0FBQ2xiLEtBQWhCLEtBQTBCLFdBQTlCLEVBQTJDO0FBQ2hELFlBQUlBLEtBQUssR0FBR2tiLFFBQVEsQ0FBQ2xiLEtBQXJCOztBQUNBLFlBQUksT0FBT0EsS0FBSyxDQUFDdVIsS0FBYixLQUF1QixXQUEzQixFQUF3QztBQUN0QzBOLFVBQUFBLFVBQVUsR0FBR2pmLEtBQUssQ0FBQ3VSLEtBQU4sR0FBYyxpQkFBM0I7QUFDRCxTQUZELE1BRU8sSUFBSSxPQUFPdlIsS0FBSyxDQUFDbWYsS0FBYixLQUF1QixXQUF2QixJQUFzQ25mLEtBQUssQ0FBQ21mLEtBQU4sS0FBZ0IsRUFBMUQsRUFBOEQ7QUFDbkVGLFVBQUFBLFVBQVUsR0FBRyxRQUFRamYsS0FBSyxDQUFDbWYsS0FBZCxHQUFzQixXQUFuQztBQUNEOztBQUNEOU8sUUFBQUEsSUFBSSxDQUFDK08sbUJBQUwsQ0FBeUJwZixLQUF6QixFQUFnQ2lmLFVBQWhDO0FBQ0Q7O0FBQ0QsVUFBSWpULENBQUMsQ0FBQ3FFLElBQUksQ0FBQ3ZGLE9BQUwsQ0FBYW1VLFVBQWIsQ0FBRCxDQUFELENBQTRCcmpCLE1BQTVCLEdBQXFDLENBQXpDLEVBQTRDO0FBQzFDb1EsUUFBQUEsQ0FBQyxDQUFDLFlBQUQsQ0FBRCxDQUFnQmlSLE9BQWhCLENBQXdCO0FBQ3RCWixVQUFBQSxTQUFTLEVBQUVyUSxDQUFDLENBQUNxRSxJQUFJLENBQUN2RixPQUFMLENBQWFtVSxVQUFiLENBQUQsQ0FBRCxDQUE0QnZWLE1BQTVCLEdBQXFDd1MsTUFBckMsR0FBOEN4VjtBQURuQyxTQUF4QixFQUVHLElBRkg7QUFHRDtBQUNGLEtBenZDZ0I7QUF5dkNkO0FBRUgwWSxJQUFBQSxtQkEzdkNpQiwrQkEydkNHcGYsS0EzdkNILEVBMnZDVXVSLEtBM3ZDVixFQTJ2Q2lCO0FBQ2hDLFVBQUkzRyxPQUFPLEdBQUcsRUFBZDtBQUNBLFVBQUl5VSxtQkFBbUIsR0FBRyxFQUExQjtBQUNBLFVBQUlDLFdBQVcsR0FBR3RULENBQUMsQ0FBQyxLQUFLbEIsT0FBTCxDQUFheUcsS0FBYixDQUFELENBQUQsQ0FBdUI3SCxNQUF2QixFQUFsQjs7QUFDQSxVQUFJLE9BQU8xSixLQUFLLENBQUM0SyxPQUFiLEtBQXlCLFFBQTdCLEVBQXVDO0FBQ3JDQSxRQUFBQSxPQUFPLEdBQUc1SyxLQUFLLENBQUM0SyxPQUFoQjtBQUNELE9BRkQsTUFFTztBQUNMQSxRQUFBQSxPQUFPLEdBQUc1SyxLQUFLLENBQUM0SyxPQUFOLENBQWMsQ0FBZCxDQUFWO0FBQ0Q7O0FBQ0QsVUFBSW9CLENBQUMsQ0FBQyxLQUFLbEIsT0FBTCxDQUFheUcsS0FBYixDQUFELENBQUQsQ0FBdUIzVixNQUF2QixHQUFnQyxDQUFwQyxFQUF1QztBQUNyQ29RLFFBQUFBLENBQUMsQ0FBQyxLQUFLbEIsT0FBTCxDQUFheUcsS0FBYixDQUFELENBQUQsQ0FBdUIvUyxRQUF2QixDQUFnQyxTQUFoQztBQUNBd04sUUFBQUEsQ0FBQyxDQUFDLEtBQUtsQixPQUFMLENBQWF5RyxLQUFiLENBQUQsQ0FBRCxDQUF1QmdPLElBQXZCLEdBQThCL2dCLFFBQTlCLENBQXVDLFNBQXZDOztBQUNBLFlBQUl3TixDQUFDLENBQUMscUJBQUQsRUFBd0JzVCxXQUF4QixDQUFELENBQXNDMWpCLE1BQXRDLEdBQStDLENBQW5ELEVBQXNEO0FBQ3BEb1EsVUFBQUEsQ0FBQyxDQUFDLHFCQUFELEVBQXdCc1QsV0FBeEIsQ0FBRCxDQUFzQzlnQixRQUF0QyxDQUErQyxvQkFBL0M7QUFDQXdOLFVBQUFBLENBQUMsQ0FBQyxxQkFBRCxFQUF3QnNULFdBQXhCLENBQUQsQ0FBc0MvaUIsSUFBdEMsQ0FBMkNxTyxPQUEzQztBQUNELFNBSEQsTUFHTztBQUNMb0IsVUFBQUEsQ0FBQyxDQUFDLEtBQUtsQixPQUFMLENBQWF5RyxLQUFiLENBQUQsQ0FBRCxDQUF1QnlFLEtBQXZCLENBQTZCLHNEQUFzRHBMLE9BQXRELEdBQWdFLE1BQTdGO0FBQ0Q7QUFDRixPQVRELE1BU08sSUFBSSxPQUFPNUssS0FBUCxLQUFpQixXQUFyQixFQUFrQztBQUN2QyxhQUFLZ2EsWUFBTCxDQUFrQixLQUFLbFAsT0FBdkIsRUFBZ0NrQixDQUFDLENBQUMsS0FBS2xCLE9BQUwsQ0FBYXVELG9CQUFkLENBQUQsQ0FBcUMxTyxJQUFyQyxDQUEwQyxRQUExQyxDQUFoQyxFQUFxRixLQUFyRjs7QUFDQSxZQUFJSyxLQUFLLENBQUN2RSxJQUFOLEtBQWUsbUJBQWYsSUFBc0N1RSxLQUFLLENBQUN2RSxJQUFOLElBQWMsZ0JBQXBELElBQXdFdUUsS0FBSyxDQUFDdkUsSUFBTixJQUFjLGtCQUF0RixJQUE0R3VFLEtBQUssQ0FBQ3ZFLElBQU4sSUFBYyxlQUExSCxJQUE2SXVFLEtBQUssQ0FBQ3ZFLElBQU4sSUFBYyxrQkFBL0osRUFBbUw7QUFDakw7QUFDQTRqQixVQUFBQSxtQkFBbUIsR0FBR3JULENBQUMsQ0FBQyxLQUFLbEIsT0FBTCxDQUFhMk8sZUFBZCxDQUF2QjtBQUNEOztBQUNELFlBQUl6WixLQUFLLENBQUN2RSxJQUFOLElBQWMsc0JBQWQsSUFBd0N1RSxLQUFLLENBQUN2RSxJQUFOLElBQWMscUJBQXRELElBQStFdUUsS0FBSyxDQUFDdkUsSUFBTixJQUFjLGNBQWpHLEVBQWlIO0FBQy9HO0FBQ0E0akIsVUFBQUEsbUJBQW1CLEdBQUdyVCxDQUFDLENBQUMsS0FBS2xCLE9BQUwsQ0FBYTZPLGVBQWQsQ0FBdkI7QUFDRDs7QUFDRCxZQUFJM1osS0FBSyxDQUFDdkUsSUFBTixJQUFjLGFBQWQsSUFBK0J1RSxLQUFLLENBQUN2RSxJQUFOLElBQWMsZUFBakQsRUFBa0U7QUFDaEU7QUFDQTRqQixVQUFBQSxtQkFBbUIsR0FBR3JULENBQUMsQ0FBQyxLQUFLbEIsT0FBTCxDQUFhK08sZUFBZCxDQUF2QjtBQUNEOztBQUNELFlBQUk3WixLQUFLLENBQUN2RSxJQUFOLElBQWMsZUFBbEIsRUFBbUM7QUFDakM7QUFDQTRqQixVQUFBQSxtQkFBbUIsR0FBR3JULENBQUMsQ0FBQyxLQUFLbEIsT0FBTCxDQUFhNkosb0JBQWQsQ0FBdkI7QUFDRDs7QUFDRCxZQUFJMEssbUJBQW1CLEtBQUssRUFBNUIsRUFBZ0M7QUFDOUIsZUFBS3RGLGtCQUFMLENBQXdCL1osS0FBeEIsRUFBK0JxZixtQkFBL0IsRUFBb0QsS0FBSzFoQixPQUF6RCxFQUFrRSxLQUFLbU4sT0FBdkU7QUFDRDs7QUFDRCxZQUFJOUssS0FBSyxDQUFDZ0MsSUFBTixJQUFjLGlCQUFkLElBQW1DcWQsbUJBQW1CLEtBQUssRUFBL0QsRUFBbUU7QUFDakVyVCxVQUFBQSxDQUFDLENBQUMsS0FBS2xCLE9BQUwsQ0FBYTROLHVCQUFiLEdBQXVDLFNBQXhDLENBQUQsQ0FBb0RsWixNQUFwRCxDQUEyRCwwRUFBMEVRLEtBQUssQ0FBQzRLLE9BQWhGLEdBQTBGLE1BQXJKO0FBQ0Q7O0FBQ0QsWUFBSTVLLEtBQUssQ0FBQ3VSLEtBQU4sSUFBZSxXQUFuQixFQUFnQztBQUM5QnZGLFVBQUFBLENBQUMsQ0FBQyxLQUFLbEIsT0FBTCxDQUFhMEMsbUJBQWQsQ0FBRCxDQUFvQytILE1BQXBDLENBQTJDLG9FQUFvRTNLLE9BQXBFLEdBQThFLE1BQXpIO0FBQ0Q7O0FBQ0QsWUFBSTVLLEtBQUssQ0FBQ2dDLElBQU4sSUFBYyx1QkFBZCxJQUF5Q3FkLG1CQUFtQixLQUFLLEVBQXJFLEVBQXlFO0FBQ3ZFclQsVUFBQUEsQ0FBQyxDQUFDLEtBQUtsQixPQUFMLENBQWEwQyxtQkFBZCxDQUFELENBQW9DK0gsTUFBcEMsQ0FBMkMsMEVBQTBFdlYsS0FBSyxDQUFDNEssT0FBaEYsR0FBMEYsTUFBckk7QUFDRDtBQUNGO0FBQ0YsS0E1eUNnQjtBQTR5Q2Q7QUFFSHFFLElBQUFBLHNCQUFzQixFQUFFLGdDQUFTdFIsT0FBVCxFQUFrQm1OLE9BQWxCLEVBQTJCO0FBQ2pELFVBQUl1RixJQUFJLEdBQUcsSUFBWDtBQUVBLFVBQUltUCxxQkFBcUIsR0FBRyxFQUE1Qjs7QUFDQSxVQUFJeFQsQ0FBQyxDQUFDbEIsT0FBTyxDQUFDMlUseUJBQVQsQ0FBRCxDQUFxQzdqQixNQUFyQyxHQUE4QyxDQUFsRCxFQUFzRDtBQUNwRCxZQUFJOGpCLFFBQVEsR0FBRztBQUNiQyxVQUFBQSxTQUFTLEVBQUUsaUJBREU7QUFFYkMsVUFBQUEsU0FBUyxFQUFFO0FBRkUsU0FBZjtBQUlBNVQsUUFBQUEsQ0FBQyxDQUFDdUUsSUFBRixDQUFPO0FBQ0xDLFVBQUFBLE1BQU0sRUFBRSxLQURIO0FBRUxDLFVBQUFBLEdBQUcsRUFBRTNGLE9BQU8sQ0FBQzZMLGFBQVIsR0FBd0IseUNBRnhCO0FBR0xyWixVQUFBQSxJQUFJLEVBQUVvaUI7QUFIRCxTQUFQLEVBSUdoUCxJQUpILENBSVEsVUFBVTRGLE1BQVYsRUFBbUI7QUFDekIsY0FBSyxPQUFPQSxNQUFNLENBQUN1SixZQUFkLEtBQStCLFdBQXBDLEVBQWtEO0FBQ2hEN1QsWUFBQUEsQ0FBQyxDQUFDa1QsSUFBRixDQUFPNUksTUFBTSxDQUFDdUosWUFBZCxFQUE0QixVQUFVN1AsS0FBVixFQUFpQjhQLFFBQWpCLEVBQTRCO0FBQ3RETixjQUFBQSxxQkFBcUIsSUFBSSxpRUFBaUVNLFFBQVEsQ0FBQzlkLElBQTFFLEdBQWlGLElBQTFHO0FBQ0F3ZCxjQUFBQSxxQkFBcUIsSUFBSSxZQUFZTSxRQUFRLENBQUMvZixJQUFyQixHQUE0QixXQUFyRDs7QUFDQSxrQkFBSytmLFFBQVEsQ0FBQy9nQixRQUFULENBQWtCbkQsTUFBbEIsR0FBMkIsQ0FBaEMsRUFBb0M7QUFDbEM0akIsZ0JBQUFBLHFCQUFxQixJQUFJLGtEQUF6QjtBQUNBeFQsZ0JBQUFBLENBQUMsQ0FBQ2tULElBQUYsQ0FBT1ksUUFBUSxDQUFDQSxRQUFRLENBQUMvZ0IsUUFBVixDQUFmLEVBQW9DLFVBQVVpUixLQUFWLEVBQWlCak8sSUFBakIsRUFBd0I7QUFDMUR5ZCxrQkFBQUEscUJBQXFCLElBQUksa0VBQWtFemQsSUFBSSxDQUFDZ1csRUFBdkUsR0FBNEUsSUFBNUUsR0FBbUZoVyxJQUFJLENBQUNoQyxJQUF4RixHQUErRixVQUF4SDtBQUNELGlCQUZEO0FBR0F5ZixnQkFBQUEscUJBQXFCLElBQUksUUFBekI7QUFDRDs7QUFDREEsY0FBQUEscUJBQXFCLElBQUksYUFBekI7QUFDRCxhQVhEO0FBWUF4VCxZQUFBQSxDQUFDLENBQUNsQixPQUFPLENBQUMyVSx5QkFBVCxDQUFELENBQXFDdEwsSUFBckMsQ0FBMENxTCxxQkFBMUM7QUFDRDtBQUNGLFNBcEJEO0FBcUJEOztBQUVELFVBQUl4VCxDQUFDLENBQUNsQixPQUFPLENBQUMyVSx5QkFBVCxDQUFELENBQXFDN2pCLE1BQXJDLEdBQThDLENBQTlDLElBQW1ELE9BQU9vUSxDQUFDLENBQUNsQixPQUFPLENBQUM2SixvQkFBVCxFQUErQmhYLE9BQS9CLENBQUQsQ0FBeUNsQixHQUF6QyxFQUFQLEtBQTBELFdBQWpILEVBQThIO0FBQzVILFlBQUlpakIsUUFBUSxHQUFHO0FBQ2IzSyxVQUFBQSxLQUFLLEVBQUUvSSxDQUFDLENBQUNsQixPQUFPLENBQUM2SixvQkFBVCxFQUErQmhYLE9BQS9CLENBQUQsQ0FBeUNsQixHQUF6QztBQURNLFNBQWY7QUFHQXVQLFFBQUFBLENBQUMsQ0FBQ3VFLElBQUYsQ0FBTztBQUNMQyxVQUFBQSxNQUFNLEVBQUUsS0FESDtBQUVMQyxVQUFBQSxHQUFHLEVBQUUzRixPQUFPLENBQUM2TCxhQUFSLEdBQXdCLHlDQUZ4QjtBQUdMclosVUFBQUEsSUFBSSxFQUFFb2lCO0FBSEQsU0FBUCxFQUlHaFAsSUFKSCxDQUlRLFVBQVU0RixNQUFWLEVBQW1CO0FBQ3pCLGNBQUssT0FBT0EsTUFBTSxDQUFDeUosZ0JBQWQsS0FBbUMsV0FBeEMsRUFBc0Q7QUFDcEQvVCxZQUFBQSxDQUFDLENBQUNsQixPQUFPLENBQUM2SixvQkFBVCxFQUErQmhYLE9BQS9CLENBQUQsQ0FBeUNxWSxLQUF6QyxDQUErQyx5REFBeURNLE1BQU0sQ0FBQ3lKLGdCQUFoRSxHQUFtRixJQUFsSTtBQUNEOztBQUNELGNBQUssT0FBT3pKLE1BQU0sQ0FBQzBKLGlCQUFkLEtBQW9DLFdBQXpDLEVBQXVEO0FBQ3JEaFUsWUFBQUEsQ0FBQyxDQUFDbEIsT0FBTyxDQUFDNkosb0JBQVQsRUFBK0JoWCxPQUEvQixDQUFELENBQXlDcVksS0FBekMsQ0FBK0MsMERBQTBETSxNQUFNLENBQUMwSixpQkFBakUsR0FBcUYsSUFBcEk7QUFDRDs7QUFDRCxjQUFJMUosTUFBTSxDQUFDeUosZ0JBQVAsS0FBNEIsWUFBaEMsRUFBOEM7QUFDNUM7QUFDQS9ULFlBQUFBLENBQUMsQ0FBQyx5QkFBRCxDQUFELENBQTZCelAsSUFBN0IsQ0FBa0N5UCxDQUFDLENBQUMseUJBQUQsQ0FBRCxDQUE2QmhELElBQTdCLENBQWtDLGlCQUFsQyxDQUFsQztBQUNBLGdCQUFJaEUsTUFBTSxHQUFHc1IsTUFBTSxDQUFDdFIsTUFBcEI7QUFDQWdILFlBQUFBLENBQUMsQ0FBQ2tULElBQUYsQ0FBT2xhLE1BQVAsRUFBZSxVQUFVZ0wsS0FBVixFQUFpQnBULEtBQWpCLEVBQXlCO0FBQ3RDLGtCQUFLQSxLQUFLLEtBQUssSUFBZixFQUFzQjtBQUNwQm9QLGdCQUFBQSxDQUFDLENBQUMsc0JBQXNCZ0UsS0FBdEIsR0FBOEIsSUFBL0IsQ0FBRCxDQUFzQ3RGLElBQXRDLENBQTJDLFNBQTNDLEVBQXFELElBQXJEO0FBQ0QsZUFGRCxNQUVPO0FBQ0xzQixnQkFBQUEsQ0FBQyxDQUFDLHNCQUFzQmdFLEtBQXRCLEdBQThCLElBQS9CLENBQUQsQ0FBc0N0RixJQUF0QyxDQUEyQyxTQUEzQyxFQUFxRCxLQUFyRDtBQUNEO0FBQ0YsYUFORDtBQU9EO0FBQ0YsU0F2QkQ7QUF3QkQ7QUFFRixLQTUyQ2dCO0FBNDJDZDtBQUVId0UsSUFBQUEsb0JBQW9CLEVBQUUsOEJBQVN2UixPQUFULEVBQWtCbU4sT0FBbEIsRUFBMkI7QUFFL0MsVUFBSW1WLDRCQUE0QixHQUFHalUsQ0FBQyxDQUFDbEIsT0FBTyxDQUFDMlUseUJBQVIsR0FBb0MsUUFBckMsQ0FBRCxDQUFnRGQsU0FBaEQsRUFBbkMsQ0FGK0MsQ0FHL0M7O0FBRUEzUyxNQUFBQSxDQUFDLENBQUNsQixPQUFPLENBQUNrRSxxQkFBVCxDQUFELENBQWlDc04sTUFBakMsQ0FBd0MsVUFBUzlFLEtBQVQsRUFBZ0I7QUFDdERBLFFBQUFBLEtBQUssQ0FBQzNhLGNBQU47QUFFQSxZQUFJcWpCLFdBQVcsR0FBR2xVLENBQUMsQ0FBQ2xCLE9BQU8sQ0FBQ2tFLHFCQUFULENBQW5CLENBSHNELENBSXREO0FBQ0E7O0FBRUEsWUFBSW1SLGlCQUFpQixHQUFHblUsQ0FBQyxDQUFDbEIsT0FBTyxDQUFDMlUseUJBQVIsR0FBb0MsZ0JBQXJDLENBQXpCO0FBQ0EsWUFBSVcsdUJBQXVCLEdBQUdELGlCQUFpQixDQUFDeEIsU0FBbEIsRUFBOUI7O0FBRUEsWUFBS3NCLDRCQUE0QixLQUFLRyx1QkFBbEMsSUFBK0QsT0FBT0QsaUJBQVAsS0FBNkIsV0FBaEcsRUFBOEc7QUFDNUc7QUFDQTtBQUVBLGNBQUlFLFNBQVMsR0FBRztBQUNkdEwsWUFBQUEsS0FBSyxFQUFFL0ksQ0FBQyxDQUFDbEIsT0FBTyxDQUFDNkosb0JBQVQsRUFBK0JoWCxPQUEvQixDQUFELENBQXlDbEIsR0FBekMsRUFETztBQUVkeWdCLFlBQUFBLFVBQVUsRUFBRWxSLENBQUMsQ0FBQ2xCLE9BQU8sQ0FBQ3FTLHlCQUFULEVBQW9DeGYsT0FBcEMsQ0FBRCxDQUE4Q2xCLEdBQTlDLEVBRkU7QUFHZDJnQixZQUFBQSxTQUFTLEVBQUVwUixDQUFDLENBQUNsQixPQUFPLENBQUN1Uyx3QkFBVCxFQUFtQzFmLE9BQW5DLENBQUQsQ0FBNkNsQixHQUE3QyxFQUhHO0FBSWQ2akIsWUFBQUEsZ0JBQWdCLEVBQUU7QUFKSixXQUFoQjtBQU9BRCxVQUFBQSxTQUFTLENBQUNFLGdCQUFWLEdBQTZCLEtBQTdCOztBQUVBLGNBQUt2VSxDQUFDLENBQUMsZ0NBQUQsQ0FBRCxDQUFvQ3BRLE1BQXBDLEdBQTZDLENBQWxELEVBQXNEO0FBQ3BEeWtCLFlBQUFBLFNBQVMsQ0FBQ04sZ0JBQVYsR0FBNkIvVCxDQUFDLENBQUMsZ0NBQUQsQ0FBRCxDQUFvQ3ZQLEdBQXBDLEVBQTdCO0FBQ0Q7O0FBRUQsY0FBS3VQLENBQUMsQ0FBQyxpQ0FBRCxDQUFELENBQXFDcFEsTUFBckMsR0FBOEMsQ0FBbkQsRUFBdUQ7QUFDckR5a0IsWUFBQUEsU0FBUyxDQUFDTCxpQkFBVixHQUE4QmhVLENBQUMsQ0FBQyxpQ0FBRCxDQUFELENBQXFDdlAsR0FBckMsRUFBOUI7QUFDRDs7QUFFRCxjQUFJLE9BQU8wakIsaUJBQVAsS0FBNkIsV0FBakMsRUFBOEM7QUFDNUNuVSxZQUFBQSxDQUFDLENBQUNrVCxJQUFGLENBQU9pQixpQkFBUCxFQUEwQixVQUFTblEsS0FBVCxFQUFnQnBULEtBQWhCLEVBQXVCO0FBQy9DLGtCQUFJNGpCLEtBQUssR0FBR3hVLENBQUMsQ0FBQyxJQUFELENBQUQsQ0FBUXZQLEdBQVIsRUFBWjtBQUNBNGpCLGNBQUFBLFNBQVMsQ0FBQ0MsZ0JBQVYsQ0FBMkJ0USxLQUEzQixJQUFvQ3dRLEtBQXBDO0FBQ0QsYUFIRDtBQUlEOztBQUVEeFUsVUFBQUEsQ0FBQyxDQUFDdUUsSUFBRixDQUFPO0FBQ0xFLFlBQUFBLEdBQUcsRUFBRTNGLE9BQU8sQ0FBQzZMLGFBQVIsR0FBd0IseUNBRHhCO0FBRUwzVSxZQUFBQSxJQUFJLEVBQUUsTUFGRDtBQUdMeWUsWUFBQUEsUUFBUSxFQUFHLE1BSE47QUFJTHhGLFlBQUFBLFdBQVcsRUFBRSxpQ0FKUjtBQUtMM2QsWUFBQUEsSUFBSSxFQUFFd2QsSUFBSSxDQUFDQyxTQUFMLENBQWVzRixTQUFmO0FBTEQsV0FBUCxFQU9DM1AsSUFQRCxDQU9NLFVBQVN3SyxRQUFULEVBQW1CO0FBQUU7QUFDekIsZ0JBQUl0USxPQUFPLEdBQUcsRUFBZDs7QUFDQSxnQkFBS3NRLFFBQVEsQ0FBQ3dGLE9BQVQsS0FBcUIsSUFBMUIsRUFBaUM7QUFDL0I7QUFDZDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNjO0FBQ0Q7O0FBQ0RSLFlBQUFBLFdBQVcsQ0FBQ3hJLEdBQVosQ0FBZ0IsQ0FBaEIsRUFBbUI0RSxNQUFuQixHQWhCdUIsQ0FpQnZCO0FBQ0QsV0F6QkQsRUEwQkNqQixJQTFCRCxDQTBCTSxVQUFTSCxRQUFULEVBQW1CO0FBQ3ZCO0FBQ0E7QUFDQWdGLFlBQUFBLFdBQVcsQ0FBQ3hJLEdBQVosQ0FBZ0IsQ0FBaEIsRUFBbUI0RSxNQUFuQjtBQUNELFdBOUJEO0FBZ0NELFNBNURELE1BNERPO0FBQUU7QUFDUDRELFVBQUFBLFdBQVcsQ0FBQ3hJLEdBQVosQ0FBZ0IsQ0FBaEIsRUFBbUI0RSxNQUFuQjtBQUNEO0FBRUYsT0ExRUQsRUFMK0MsQ0FnRi9DO0FBQ0QsS0EvN0NnQixDQSs3Q2Q7O0FBLzdDYyxHQUFuQixDQXZGNEMsQ0F3aER6QztBQUVIO0FBQ0E7O0FBQ0F0USxFQUFBQSxDQUFDLENBQUNwQyxFQUFGLENBQUtxQyxVQUFMLElBQW1CLFVBQVduQixPQUFYLEVBQXFCO0FBQ3RDLFdBQU8sS0FBS29VLElBQUwsQ0FBVSxZQUFZO0FBQzNCLFVBQUksQ0FBQ2xULENBQUMsQ0FBQzFPLElBQUYsQ0FBTyxJQUFQLEVBQWEsWUFBWTJPLFVBQXpCLENBQUwsRUFBMkM7QUFDekNELFFBQUFBLENBQUMsQ0FBQzFPLElBQUYsQ0FBTyxJQUFQLEVBQWEsWUFBWTJPLFVBQXpCLEVBQXFDLElBQUlDLE1BQUosQ0FBWSxJQUFaLEVBQWtCcEIsT0FBbEIsQ0FBckM7QUFDRDtBQUNGLEtBSk0sQ0FBUDtBQUtELEdBTkQ7QUFRRCxDQXBpREEsRUFvaURHNlYsTUFwaURILEVBb2lEV2xtQixNQXBpRFgsRUFvaURtQnlCLFFBcGlEbkIiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbihmKXtpZih0eXBlb2YgZXhwb3J0cz09PVwib2JqZWN0XCImJnR5cGVvZiBtb2R1bGUhPT1cInVuZGVmaW5lZFwiKXttb2R1bGUuZXhwb3J0cz1mKCl9ZWxzZSBpZih0eXBlb2YgZGVmaW5lPT09XCJmdW5jdGlvblwiJiZkZWZpbmUuYW1kKXtkZWZpbmUoW10sZil9ZWxzZXt2YXIgZztpZih0eXBlb2Ygd2luZG93IT09XCJ1bmRlZmluZWRcIil7Zz13aW5kb3d9ZWxzZSBpZih0eXBlb2YgZ2xvYmFsIT09XCJ1bmRlZmluZWRcIil7Zz1nbG9iYWx9ZWxzZSBpZih0eXBlb2Ygc2VsZiE9PVwidW5kZWZpbmVkXCIpe2c9c2VsZn1lbHNle2c9dGhpc30oZy5wYXltZW50IHx8IChnLnBheW1lbnQgPSB7fSkpLmpzID0gZigpfX0pKGZ1bmN0aW9uKCl7dmFyIGRlZmluZSxtb2R1bGUsZXhwb3J0cztyZXR1cm4gKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkoezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xudmFyIFFKLCBycmV0dXJuLCBydHJpbTtcblxuUUogPSBmdW5jdGlvbihzZWxlY3Rvcikge1xuICBpZiAoUUouaXNET01FbGVtZW50KHNlbGVjdG9yKSkge1xuICAgIHJldHVybiBzZWxlY3RvcjtcbiAgfVxuICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG59O1xuXG5RSi5pc0RPTUVsZW1lbnQgPSBmdW5jdGlvbihlbCkge1xuICByZXR1cm4gZWwgJiYgKGVsLm5vZGVOYW1lICE9IG51bGwpO1xufTtcblxucnRyaW0gPSAvXltcXHNcXHVGRUZGXFx4QTBdK3xbXFxzXFx1RkVGRlxceEEwXSskL2c7XG5cblFKLnRyaW0gPSBmdW5jdGlvbih0ZXh0KSB7XG4gIGlmICh0ZXh0ID09PSBudWxsKSB7XG4gICAgcmV0dXJuIFwiXCI7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICh0ZXh0ICsgXCJcIikucmVwbGFjZShydHJpbSwgXCJcIik7XG4gIH1cbn07XG5cbnJyZXR1cm4gPSAvXFxyL2c7XG5cblFKLnZhbCA9IGZ1bmN0aW9uKGVsLCB2YWwpIHtcbiAgdmFyIHJldDtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgcmV0dXJuIGVsLnZhbHVlID0gdmFsO1xuICB9IGVsc2Uge1xuICAgIHJldCA9IGVsLnZhbHVlO1xuICAgIGlmICh0eXBlb2YgcmV0ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICByZXR1cm4gcmV0LnJlcGxhY2UocnJldHVybiwgXCJcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChyZXQgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuUUoucHJldmVudERlZmF1bHQgPSBmdW5jdGlvbihldmVudE9iamVjdCkge1xuICBpZiAodHlwZW9mIGV2ZW50T2JqZWN0LnByZXZlbnREZWZhdWx0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBldmVudE9iamVjdC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybjtcbiAgfVxuICBldmVudE9iamVjdC5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICByZXR1cm4gZmFsc2U7XG59O1xuXG5RSi5ub3JtYWxpemVFdmVudCA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIG9yaWdpbmFsO1xuICBvcmlnaW5hbCA9IGU7XG4gIGUgPSB7XG4gICAgd2hpY2g6IG9yaWdpbmFsLndoaWNoICE9IG51bGwgPyBvcmlnaW5hbC53aGljaCA6IHZvaWQgMCxcbiAgICB0YXJnZXQ6IG9yaWdpbmFsLnRhcmdldCB8fCBvcmlnaW5hbC5zcmNFbGVtZW50LFxuICAgIHByZXZlbnREZWZhdWx0OiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBRSi5wcmV2ZW50RGVmYXVsdChvcmlnaW5hbCk7XG4gICAgfSxcbiAgICBvcmlnaW5hbEV2ZW50OiBvcmlnaW5hbCxcbiAgICBkYXRhOiBvcmlnaW5hbC5kYXRhIHx8IG9yaWdpbmFsLmRldGFpbFxuICB9O1xuICBpZiAoZS53aGljaCA9PSBudWxsKSB7XG4gICAgZS53aGljaCA9IG9yaWdpbmFsLmNoYXJDb2RlICE9IG51bGwgPyBvcmlnaW5hbC5jaGFyQ29kZSA6IG9yaWdpbmFsLmtleUNvZGU7XG4gIH1cbiAgcmV0dXJuIGU7XG59O1xuXG5RSi5vbiA9IGZ1bmN0aW9uKGVsZW1lbnQsIGV2ZW50TmFtZSwgY2FsbGJhY2spIHtcbiAgdmFyIGVsLCBpLCBqLCBsZW4sIGxlbjEsIG11bHRFdmVudE5hbWUsIG9yaWdpbmFsQ2FsbGJhY2ssIHJlZjtcbiAgaWYgKGVsZW1lbnQubGVuZ3RoKSB7XG4gICAgZm9yIChpID0gMCwgbGVuID0gZWxlbWVudC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgZWwgPSBlbGVtZW50W2ldO1xuICAgICAgUUoub24oZWwsIGV2ZW50TmFtZSwgY2FsbGJhY2spO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGV2ZW50TmFtZS5tYXRjaChcIiBcIikpIHtcbiAgICByZWYgPSBldmVudE5hbWUuc3BsaXQoXCIgXCIpO1xuICAgIGZvciAoaiA9IDAsIGxlbjEgPSByZWYubGVuZ3RoOyBqIDwgbGVuMTsgaisrKSB7XG4gICAgICBtdWx0RXZlbnROYW1lID0gcmVmW2pdO1xuICAgICAgUUoub24oZWxlbWVudCwgbXVsdEV2ZW50TmFtZSwgY2FsbGJhY2spO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cbiAgb3JpZ2luYWxDYWxsYmFjayA9IGNhbGxiYWNrO1xuICBjYWxsYmFjayA9IGZ1bmN0aW9uKGUpIHtcbiAgICBlID0gUUoubm9ybWFsaXplRXZlbnQoZSk7XG4gICAgcmV0dXJuIG9yaWdpbmFsQ2FsbGJhY2soZSk7XG4gIH07XG4gIGlmIChlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICByZXR1cm4gZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgY2FsbGJhY2ssIGZhbHNlKTtcbiAgfVxuICBpZiAoZWxlbWVudC5hdHRhY2hFdmVudCkge1xuICAgIGV2ZW50TmFtZSA9IFwib25cIiArIGV2ZW50TmFtZTtcbiAgICByZXR1cm4gZWxlbWVudC5hdHRhY2hFdmVudChldmVudE5hbWUsIGNhbGxiYWNrKTtcbiAgfVxuICBlbGVtZW50WydvbicgKyBldmVudE5hbWVdID0gY2FsbGJhY2s7XG59O1xuXG5RSi5hZGRDbGFzcyA9IGZ1bmN0aW9uKGVsLCBjbGFzc05hbWUpIHtcbiAgdmFyIGU7XG4gIGlmIChlbC5sZW5ndGgpIHtcbiAgICByZXR1cm4gKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGksIGxlbiwgcmVzdWx0cztcbiAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgIGZvciAoaSA9IDAsIGxlbiA9IGVsLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGUgPSBlbFtpXTtcbiAgICAgICAgcmVzdWx0cy5wdXNoKFFKLmFkZENsYXNzKGUsIGNsYXNzTmFtZSkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfSkoKTtcbiAgfVxuICBpZiAoZWwuY2xhc3NMaXN0KSB7XG4gICAgcmV0dXJuIGVsLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZWwuY2xhc3NOYW1lICs9ICcgJyArIGNsYXNzTmFtZTtcbiAgfVxufTtcblxuUUouaGFzQ2xhc3MgPSBmdW5jdGlvbihlbCwgY2xhc3NOYW1lKSB7XG4gIHZhciBlLCBoYXNDbGFzcywgaSwgbGVuO1xuICBpZiAoZWwubGVuZ3RoKSB7XG4gICAgaGFzQ2xhc3MgPSB0cnVlO1xuICAgIGZvciAoaSA9IDAsIGxlbiA9IGVsLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBlID0gZWxbaV07XG4gICAgICBoYXNDbGFzcyA9IGhhc0NsYXNzICYmIFFKLmhhc0NsYXNzKGUsIGNsYXNzTmFtZSk7XG4gICAgfVxuICAgIHJldHVybiBoYXNDbGFzcztcbiAgfVxuICBpZiAoZWwuY2xhc3NMaXN0KSB7XG4gICAgcmV0dXJuIGVsLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgUmVnRXhwKCcoXnwgKScgKyBjbGFzc05hbWUgKyAnKCB8JCknLCAnZ2knKS50ZXN0KGVsLmNsYXNzTmFtZSk7XG4gIH1cbn07XG5cblFKLnJlbW92ZUNsYXNzID0gZnVuY3Rpb24oZWwsIGNsYXNzTmFtZSkge1xuICB2YXIgY2xzLCBlLCBpLCBsZW4sIHJlZiwgcmVzdWx0cztcbiAgaWYgKGVsLmxlbmd0aCkge1xuICAgIHJldHVybiAoZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaSwgbGVuLCByZXN1bHRzO1xuICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgZm9yIChpID0gMCwgbGVuID0gZWwubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgZSA9IGVsW2ldO1xuICAgICAgICByZXN1bHRzLnB1c2goUUoucmVtb3ZlQ2xhc3MoZSwgY2xhc3NOYW1lKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9KSgpO1xuICB9XG4gIGlmIChlbC5jbGFzc0xpc3QpIHtcbiAgICByZWYgPSBjbGFzc05hbWUuc3BsaXQoJyAnKTtcbiAgICByZXN1bHRzID0gW107XG4gICAgZm9yIChpID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBjbHMgPSByZWZbaV07XG4gICAgICByZXN1bHRzLnB1c2goZWwuY2xhc3NMaXN0LnJlbW92ZShjbHMpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGVsLmNsYXNzTmFtZSA9IGVsLmNsYXNzTmFtZS5yZXBsYWNlKG5ldyBSZWdFeHAoJyhefFxcXFxiKScgKyBjbGFzc05hbWUuc3BsaXQoJyAnKS5qb2luKCd8JykgKyAnKFxcXFxifCQpJywgJ2dpJyksICcgJyk7XG4gIH1cbn07XG5cblFKLnRvZ2dsZUNsYXNzID0gZnVuY3Rpb24oZWwsIGNsYXNzTmFtZSwgYm9vbCkge1xuICB2YXIgZTtcbiAgaWYgKGVsLmxlbmd0aCkge1xuICAgIHJldHVybiAoZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaSwgbGVuLCByZXN1bHRzO1xuICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgZm9yIChpID0gMCwgbGVuID0gZWwubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgZSA9IGVsW2ldO1xuICAgICAgICByZXN1bHRzLnB1c2goUUoudG9nZ2xlQ2xhc3MoZSwgY2xhc3NOYW1lLCBib29sKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9KSgpO1xuICB9XG4gIGlmIChib29sKSB7XG4gICAgaWYgKCFRSi5oYXNDbGFzcyhlbCwgY2xhc3NOYW1lKSkge1xuICAgICAgcmV0dXJuIFFKLmFkZENsYXNzKGVsLCBjbGFzc05hbWUpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gUUoucmVtb3ZlQ2xhc3MoZWwsIGNsYXNzTmFtZSk7XG4gIH1cbn07XG5cblFKLmFwcGVuZCA9IGZ1bmN0aW9uKGVsLCB0b0FwcGVuZCkge1xuICB2YXIgZTtcbiAgaWYgKGVsLmxlbmd0aCkge1xuICAgIHJldHVybiAoZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaSwgbGVuLCByZXN1bHRzO1xuICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgZm9yIChpID0gMCwgbGVuID0gZWwubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgZSA9IGVsW2ldO1xuICAgICAgICByZXN1bHRzLnB1c2goUUouYXBwZW5kKGUsIHRvQXBwZW5kKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9KSgpO1xuICB9XG4gIHJldHVybiBlbC5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIHRvQXBwZW5kKTtcbn07XG5cblFKLmZpbmQgPSBmdW5jdGlvbihlbCwgc2VsZWN0b3IpIHtcbiAgaWYgKGVsIGluc3RhbmNlb2YgTm9kZUxpc3QgfHwgZWwgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgIGVsID0gZWxbMF07XG4gIH1cbiAgcmV0dXJuIGVsLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xufTtcblxuUUoudHJpZ2dlciA9IGZ1bmN0aW9uKGVsLCBuYW1lLCBkYXRhKSB7XG4gIHZhciBlLCBlcnJvciwgZXY7XG4gIHRyeSB7XG4gICAgZXYgPSBuZXcgQ3VzdG9tRXZlbnQobmFtZSwge1xuICAgICAgZGV0YWlsOiBkYXRhXG4gICAgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgZSA9IGVycm9yO1xuICAgIGV2ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG4gICAgaWYgKGV2LmluaXRDdXN0b21FdmVudCkge1xuICAgICAgZXYuaW5pdEN1c3RvbUV2ZW50KG5hbWUsIHRydWUsIHRydWUsIGRhdGEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBldi5pbml0RXZlbnQobmFtZSwgdHJ1ZSwgdHJ1ZSwgZGF0YSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBlbC5kaXNwYXRjaEV2ZW50KGV2KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUUo7XG5cblxufSx7fV0sMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4oZnVuY3Rpb24gKGdsb2JhbCl7XG52YXIgUGF5bWVudCwgUUosIGNhcmRGcm9tTnVtYmVyLCBjYXJkRnJvbVR5cGUsIGNhcmRzLCBkZWZhdWx0Rm9ybWF0LCBmb3JtYXRCYWNrQ2FyZE51bWJlciwgZm9ybWF0QmFja0V4cGlyeSwgZm9ybWF0Q2FyZE51bWJlciwgZm9ybWF0RXhwaXJ5LCBmb3JtYXRGb3J3YXJkRXhwaXJ5LCBmb3JtYXRGb3J3YXJkU2xhc2gsIGZvcm1hdE1vbnRoRXhwaXJ5LCBoYXNUZXh0U2VsZWN0ZWQsIGx1aG5DaGVjaywgcmVGb3JtYXRDYXJkTnVtYmVyLCByZXN0cmljdENWQywgcmVzdHJpY3RDYXJkTnVtYmVyLCByZXN0cmljdENvbWJpbmVkRXhwaXJ5LCByZXN0cmljdEV4cGlyeSwgcmVzdHJpY3RNb250aEV4cGlyeSwgcmVzdHJpY3ROdW1lcmljLCByZXN0cmljdFllYXJFeHBpcnksIHNldENhcmRUeXBlLFxuICBpbmRleE9mID0gW10uaW5kZXhPZiB8fCBmdW5jdGlvbihpdGVtKSB7IGZvciAodmFyIGkgPSAwLCBsID0gdGhpcy5sZW5ndGg7IGkgPCBsOyBpKyspIHsgaWYgKGkgaW4gdGhpcyAmJiB0aGlzW2ldID09PSBpdGVtKSByZXR1cm4gaTsgfSByZXR1cm4gLTE7IH07XG5cblFKID0gcmVxdWlyZSgncWovc3JjL3FqLmNvZmZlZScpO1xuXG5kZWZhdWx0Rm9ybWF0ID0gLyhcXGR7MSw0fSkvZztcblxuY2FyZHMgPSBbXG4gIHtcbiAgICB0eXBlOiAnYW1leCcsXG4gICAgcGF0dGVybjogL14zWzQ3XS8sXG4gICAgZm9ybWF0OiAvKFxcZHsxLDR9KShcXGR7MSw2fSk/KFxcZHsxLDV9KT8vLFxuICAgIGxlbmd0aDogWzE1XSxcbiAgICBjdmNMZW5ndGg6IFs0XSxcbiAgICBsdWhuOiB0cnVlXG4gIH0sIHtcbiAgICB0eXBlOiAnZGFua29ydCcsXG4gICAgcGF0dGVybjogL141MDE5LyxcbiAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgbGVuZ3RoOiBbMTZdLFxuICAgIGN2Y0xlbmd0aDogWzNdLFxuICAgIGx1aG46IHRydWVcbiAgfSwge1xuICAgIHR5cGU6ICdkaW5lcnNjbHViJyxcbiAgICBwYXR0ZXJuOiAvXigzNnwzOHwzMFswLTVdKS8sXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGxlbmd0aDogWzE0XSxcbiAgICBjdmNMZW5ndGg6IFszXSxcbiAgICBsdWhuOiB0cnVlXG4gIH0sIHtcbiAgICB0eXBlOiAnZGlzY292ZXInLFxuICAgIHBhdHRlcm46IC9eKDYwMTF8NjV8NjRbNC05XXw2MjIpLyxcbiAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgbGVuZ3RoOiBbMTZdLFxuICAgIGN2Y0xlbmd0aDogWzNdLFxuICAgIGx1aG46IHRydWVcbiAgfSwge1xuICAgIHR5cGU6ICdqY2InLFxuICAgIHBhdHRlcm46IC9eMzUvLFxuICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICBsZW5ndGg6IFsxNl0sXG4gICAgY3ZjTGVuZ3RoOiBbM10sXG4gICAgbHVobjogdHJ1ZVxuICB9LCB7XG4gICAgdHlwZTogJ2xhc2VyJyxcbiAgICBwYXR0ZXJuOiAvXig2NzA2fDY3NzF8NjcwOSkvLFxuICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICBsZW5ndGg6IFsxNiwgMTcsIDE4LCAxOV0sXG4gICAgY3ZjTGVuZ3RoOiBbM10sXG4gICAgbHVobjogdHJ1ZVxuICB9LCB7XG4gICAgdHlwZTogJ21hZXN0cm8nLFxuICAgIHBhdHRlcm46IC9eKDUwMTh8NTAyMHw1MDM4fDYzMDR8NjcwM3w2NzU5fDY3NlsxLTNdKS8sXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGxlbmd0aDogWzEyLCAxMywgMTQsIDE1LCAxNiwgMTcsIDE4LCAxOV0sXG4gICAgY3ZjTGVuZ3RoOiBbM10sXG4gICAgbHVobjogdHJ1ZVxuICB9LCB7XG4gICAgdHlwZTogJ21hc3RlcmNhcmQnLFxuICAgIHBhdHRlcm46IC9eNVsxLTVdLyxcbiAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgbGVuZ3RoOiBbMTZdLFxuICAgIGN2Y0xlbmd0aDogWzNdLFxuICAgIGx1aG46IHRydWVcbiAgfSwge1xuICAgIHR5cGU6ICd1bmlvbnBheScsXG4gICAgcGF0dGVybjogL142Mi8sXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGxlbmd0aDogWzE2LCAxNywgMTgsIDE5XSxcbiAgICBjdmNMZW5ndGg6IFszXSxcbiAgICBsdWhuOiBmYWxzZVxuICB9LCB7XG4gICAgdHlwZTogJ3Zpc2FlbGVjdHJvbicsXG4gICAgcGF0dGVybjogL140KDAyNnwxNzUwMHw0MDV8NTA4fDg0NHw5MVszN10pLyxcbiAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgbGVuZ3RoOiBbMTZdLFxuICAgIGN2Y0xlbmd0aDogWzNdLFxuICAgIGx1aG46IHRydWVcbiAgfSwge1xuICAgIHR5cGU6ICd2aXNhJyxcbiAgICBwYXR0ZXJuOiAvXjQvLFxuICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICBsZW5ndGg6IFsxMywgMTZdLFxuICAgIGN2Y0xlbmd0aDogWzNdLFxuICAgIGx1aG46IHRydWVcbiAgfSwge1xuICAgIHR5cGU6ICdlbG8nLFxuICAgIHBhdHRlcm46IC9eNDAxMXw0Mzg5MzV8NDUoMTQxNnw3Nil8NTAoNDE3NXw2Njk5fDY3fDkwWzQtN10pfDYzKDYyOTd8NjM2OCkvLFxuICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICBsZW5ndGg6IFsxNl0sXG4gICAgY3ZjTGVuZ3RoOiBbM10sXG4gICAgbHVobjogdHJ1ZVxuICB9XG5dO1xuXG5jYXJkRnJvbU51bWJlciA9IGZ1bmN0aW9uKG51bSkge1xuICB2YXIgY2FyZCwgaSwgbGVuO1xuICBudW0gPSAobnVtICsgJycpLnJlcGxhY2UoL1xcRC9nLCAnJyk7XG4gIGZvciAoaSA9IDAsIGxlbiA9IGNhcmRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgY2FyZCA9IGNhcmRzW2ldO1xuICAgIGlmIChjYXJkLnBhdHRlcm4udGVzdChudW0pKSB7XG4gICAgICByZXR1cm4gY2FyZDtcbiAgICB9XG4gIH1cbn07XG5cbmNhcmRGcm9tVHlwZSA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIGNhcmQsIGksIGxlbjtcbiAgZm9yIChpID0gMCwgbGVuID0gY2FyZHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBjYXJkID0gY2FyZHNbaV07XG4gICAgaWYgKGNhcmQudHlwZSA9PT0gdHlwZSkge1xuICAgICAgcmV0dXJuIGNhcmQ7XG4gICAgfVxuICB9XG59O1xuXG5sdWhuQ2hlY2sgPSBmdW5jdGlvbihudW0pIHtcbiAgdmFyIGRpZ2l0LCBkaWdpdHMsIGksIGxlbiwgb2RkLCBzdW07XG4gIG9kZCA9IHRydWU7XG4gIHN1bSA9IDA7XG4gIGRpZ2l0cyA9IChudW0gKyAnJykuc3BsaXQoJycpLnJldmVyc2UoKTtcbiAgZm9yIChpID0gMCwgbGVuID0gZGlnaXRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgZGlnaXQgPSBkaWdpdHNbaV07XG4gICAgZGlnaXQgPSBwYXJzZUludChkaWdpdCwgMTApO1xuICAgIGlmICgob2RkID0gIW9kZCkpIHtcbiAgICAgIGRpZ2l0ICo9IDI7XG4gICAgfVxuICAgIGlmIChkaWdpdCA+IDkpIHtcbiAgICAgIGRpZ2l0IC09IDk7XG4gICAgfVxuICAgIHN1bSArPSBkaWdpdDtcbiAgfVxuICByZXR1cm4gc3VtICUgMTAgPT09IDA7XG59O1xuXG5oYXNUZXh0U2VsZWN0ZWQgPSBmdW5jdGlvbih0YXJnZXQpIHtcbiAgdmFyIHJlZjtcbiAgaWYgKCh0YXJnZXQuc2VsZWN0aW9uU3RhcnQgIT0gbnVsbCkgJiYgdGFyZ2V0LnNlbGVjdGlvblN0YXJ0ICE9PSB0YXJnZXQuc2VsZWN0aW9uRW5kKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKCh0eXBlb2YgZG9jdW1lbnQgIT09IFwidW5kZWZpbmVkXCIgJiYgZG9jdW1lbnQgIT09IG51bGwgPyAocmVmID0gZG9jdW1lbnQuc2VsZWN0aW9uKSAhPSBudWxsID8gcmVmLmNyZWF0ZVJhbmdlIDogdm9pZCAwIDogdm9pZCAwKSAhPSBudWxsKSB7XG4gICAgaWYgKGRvY3VtZW50LnNlbGVjdGlvbi5jcmVhdGVSYW5nZSgpLnRleHQpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuXG5yZUZvcm1hdENhcmROdW1iZXIgPSBmdW5jdGlvbihlKSB7XG4gIHJldHVybiBzZXRUaW1lb3V0KChmdW5jdGlvbihfdGhpcykge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciB0YXJnZXQsIHZhbHVlO1xuICAgICAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgICB2YWx1ZSA9IFFKLnZhbCh0YXJnZXQpO1xuICAgICAgdmFsdWUgPSBQYXltZW50LmZucy5mb3JtYXRDYXJkTnVtYmVyKHZhbHVlKTtcbiAgICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCB2YWx1ZSk7XG4gICAgfTtcbiAgfSkodGhpcykpO1xufTtcblxuZm9ybWF0Q2FyZE51bWJlciA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIGNhcmQsIGRpZ2l0LCBsZW5ndGgsIHJlLCB0YXJnZXQsIHVwcGVyTGVuZ3RoLCB2YWx1ZTtcbiAgZGlnaXQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpO1xuICBpZiAoIS9eXFxkKyQvLnRlc3QoZGlnaXQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRhcmdldCA9IGUudGFyZ2V0O1xuICB2YWx1ZSA9IFFKLnZhbCh0YXJnZXQpO1xuICBjYXJkID0gY2FyZEZyb21OdW1iZXIodmFsdWUgKyBkaWdpdCk7XG4gIGxlbmd0aCA9ICh2YWx1ZS5yZXBsYWNlKC9cXEQvZywgJycpICsgZGlnaXQpLmxlbmd0aDtcbiAgdXBwZXJMZW5ndGggPSAxNjtcbiAgaWYgKGNhcmQpIHtcbiAgICB1cHBlckxlbmd0aCA9IGNhcmQubGVuZ3RoW2NhcmQubGVuZ3RoLmxlbmd0aCAtIDFdO1xuICB9XG4gIGlmIChsZW5ndGggPj0gdXBwZXJMZW5ndGgpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKCh0YXJnZXQuc2VsZWN0aW9uU3RhcnQgIT0gbnVsbCkgJiYgdGFyZ2V0LnNlbGVjdGlvblN0YXJ0ICE9PSB2YWx1ZS5sZW5ndGgpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGNhcmQgJiYgY2FyZC50eXBlID09PSAnYW1leCcpIHtcbiAgICByZSA9IC9eKFxcZHs0fXxcXGR7NH1cXHNcXGR7Nn0pJC87XG4gIH0gZWxzZSB7XG4gICAgcmUgPSAvKD86XnxcXHMpKFxcZHs0fSkkLztcbiAgfVxuICBpZiAocmUudGVzdCh2YWx1ZSkpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIHZhbHVlICsgJyAnICsgZGlnaXQpO1xuICB9IGVsc2UgaWYgKHJlLnRlc3QodmFsdWUgKyBkaWdpdCkpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIHZhbHVlICsgZGlnaXQgKyAnICcpO1xuICB9XG59O1xuXG5mb3JtYXRCYWNrQ2FyZE51bWJlciA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIHRhcmdldCwgdmFsdWU7XG4gIHRhcmdldCA9IGUudGFyZ2V0O1xuICB2YWx1ZSA9IFFKLnZhbCh0YXJnZXQpO1xuICBpZiAoZS5tZXRhKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChlLndoaWNoICE9PSA4KSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICgodGFyZ2V0LnNlbGVjdGlvblN0YXJ0ICE9IG51bGwpICYmIHRhcmdldC5zZWxlY3Rpb25TdGFydCAhPT0gdmFsdWUubGVuZ3RoKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICgvXFxkXFxzJC8udGVzdCh2YWx1ZSkpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIHZhbHVlLnJlcGxhY2UoL1xcZFxccyQvLCAnJykpO1xuICB9IGVsc2UgaWYgKC9cXHNcXGQ/JC8udGVzdCh2YWx1ZSkpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIHZhbHVlLnJlcGxhY2UoL1xcc1xcZD8kLywgJycpKTtcbiAgfVxufTtcblxuZm9ybWF0RXhwaXJ5ID0gZnVuY3Rpb24oZSkge1xuICB2YXIgZGlnaXQsIHRhcmdldCwgdmFsO1xuICBkaWdpdCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZS53aGljaCk7XG4gIGlmICghL15cXGQrJC8udGVzdChkaWdpdCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gIHZhbCA9IFFKLnZhbCh0YXJnZXQpICsgZGlnaXQ7XG4gIGlmICgvXlxcZCQvLnRlc3QodmFsKSAmJiAodmFsICE9PSAnMCcgJiYgdmFsICE9PSAnMScpKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCBcIjBcIiArIHZhbCArIFwiIC8gXCIpO1xuICB9IGVsc2UgaWYgKC9eXFxkXFxkJC8udGVzdCh2YWwpKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCB2YWwgKyBcIiAvIFwiKTtcbiAgfVxufTtcblxuZm9ybWF0TW9udGhFeHBpcnkgPSBmdW5jdGlvbihlKSB7XG4gIHZhciBkaWdpdCwgdGFyZ2V0LCB2YWw7XG4gIGRpZ2l0ID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKTtcbiAgaWYgKCEvXlxcZCskLy50ZXN0KGRpZ2l0KSkge1xuICAgIHJldHVybjtcbiAgfVxuICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgdmFsID0gUUoudmFsKHRhcmdldCkgKyBkaWdpdDtcbiAgaWYgKC9eXFxkJC8udGVzdCh2YWwpICYmICh2YWwgIT09ICcwJyAmJiB2YWwgIT09ICcxJykpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIFwiMFwiICsgdmFsKTtcbiAgfSBlbHNlIGlmICgvXlxcZFxcZCQvLnRlc3QodmFsKSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgXCJcIiArIHZhbCk7XG4gIH1cbn07XG5cbmZvcm1hdEZvcndhcmRFeHBpcnkgPSBmdW5jdGlvbihlKSB7XG4gIHZhciBkaWdpdCwgdGFyZ2V0LCB2YWw7XG4gIGRpZ2l0ID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKTtcbiAgaWYgKCEvXlxcZCskLy50ZXN0KGRpZ2l0KSkge1xuICAgIHJldHVybjtcbiAgfVxuICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgdmFsID0gUUoudmFsKHRhcmdldCk7XG4gIGlmICgvXlxcZFxcZCQvLnRlc3QodmFsKSkge1xuICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCB2YWwgKyBcIiAvIFwiKTtcbiAgfVxufTtcblxuZm9ybWF0Rm9yd2FyZFNsYXNoID0gZnVuY3Rpb24oZSkge1xuICB2YXIgc2xhc2gsIHRhcmdldCwgdmFsO1xuICBzbGFzaCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZS53aGljaCk7XG4gIGlmIChzbGFzaCAhPT0gJy8nKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRhcmdldCA9IGUudGFyZ2V0O1xuICB2YWwgPSBRSi52YWwodGFyZ2V0KTtcbiAgaWYgKC9eXFxkJC8udGVzdCh2YWwpICYmIHZhbCAhPT0gJzAnKSB7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIFwiMFwiICsgdmFsICsgXCIgLyBcIik7XG4gIH1cbn07XG5cbmZvcm1hdEJhY2tFeHBpcnkgPSBmdW5jdGlvbihlKSB7XG4gIHZhciB0YXJnZXQsIHZhbHVlO1xuICBpZiAoZS5tZXRhS2V5KSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRhcmdldCA9IGUudGFyZ2V0O1xuICB2YWx1ZSA9IFFKLnZhbCh0YXJnZXQpO1xuICBpZiAoZS53aGljaCAhPT0gOCkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoKHRhcmdldC5zZWxlY3Rpb25TdGFydCAhPSBudWxsKSAmJiB0YXJnZXQuc2VsZWN0aW9uU3RhcnQgIT09IHZhbHVlLmxlbmd0aCkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoL1xcZChcXHN8XFwvKSskLy50ZXN0KHZhbHVlKSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgdmFsdWUucmVwbGFjZSgvXFxkKFxcc3xcXC8pKiQvLCAnJykpO1xuICB9IGVsc2UgaWYgKC9cXHNcXC9cXHM/XFxkPyQvLnRlc3QodmFsdWUpKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCB2YWx1ZS5yZXBsYWNlKC9cXHNcXC9cXHM/XFxkPyQvLCAnJykpO1xuICB9XG59O1xuXG5yZXN0cmljdE51bWVyaWMgPSBmdW5jdGlvbihlKSB7XG4gIHZhciBpbnB1dDtcbiAgaWYgKGUubWV0YUtleSB8fCBlLmN0cmxLZXkpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAoZS53aGljaCA9PT0gMzIpIHtcbiAgICByZXR1cm4gZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG4gIGlmIChlLndoaWNoID09PSAwKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKGUud2hpY2ggPCAzMykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlucHV0ID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKTtcbiAgaWYgKCEvW1xcZFxcc10vLnRlc3QoaW5wdXQpKSB7XG4gICAgcmV0dXJuIGUucHJldmVudERlZmF1bHQoKTtcbiAgfVxufTtcblxucmVzdHJpY3RDYXJkTnVtYmVyID0gZnVuY3Rpb24oZSkge1xuICB2YXIgY2FyZCwgZGlnaXQsIHRhcmdldCwgdmFsdWU7XG4gIHRhcmdldCA9IGUudGFyZ2V0O1xuICBkaWdpdCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZS53aGljaCk7XG4gIGlmICghL15cXGQrJC8udGVzdChkaWdpdCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGhhc1RleHRTZWxlY3RlZCh0YXJnZXQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhbHVlID0gKFFKLnZhbCh0YXJnZXQpICsgZGlnaXQpLnJlcGxhY2UoL1xcRC9nLCAnJyk7XG4gIGNhcmQgPSBjYXJkRnJvbU51bWJlcih2YWx1ZSk7XG4gIGlmIChjYXJkKSB7XG4gICAgaWYgKCEodmFsdWUubGVuZ3RoIDw9IGNhcmQubGVuZ3RoW2NhcmQubGVuZ3RoLmxlbmd0aCAtIDFdKSkge1xuICAgICAgcmV0dXJuIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKCEodmFsdWUubGVuZ3RoIDw9IDE2KSkge1xuICAgICAgcmV0dXJuIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH1cbn07XG5cbnJlc3RyaWN0RXhwaXJ5ID0gZnVuY3Rpb24oZSwgbGVuZ3RoKSB7XG4gIHZhciBkaWdpdCwgdGFyZ2V0LCB2YWx1ZTtcbiAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gIGRpZ2l0ID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKTtcbiAgaWYgKCEvXlxcZCskLy50ZXN0KGRpZ2l0KSkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoaGFzVGV4dFNlbGVjdGVkKHRhcmdldCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFsdWUgPSBRSi52YWwodGFyZ2V0KSArIGRpZ2l0O1xuICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1xcRC9nLCAnJyk7XG4gIGlmICh2YWx1ZS5sZW5ndGggPiBsZW5ndGgpIHtcbiAgICByZXR1cm4gZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG59O1xuXG5yZXN0cmljdENvbWJpbmVkRXhwaXJ5ID0gZnVuY3Rpb24oZSkge1xuICByZXR1cm4gcmVzdHJpY3RFeHBpcnkoZSwgNik7XG59O1xuXG5yZXN0cmljdE1vbnRoRXhwaXJ5ID0gZnVuY3Rpb24oZSkge1xuICByZXR1cm4gcmVzdHJpY3RFeHBpcnkoZSwgMik7XG59O1xuXG5yZXN0cmljdFllYXJFeHBpcnkgPSBmdW5jdGlvbihlKSB7XG4gIHJldHVybiByZXN0cmljdEV4cGlyeShlLCA0KTtcbn07XG5cbnJlc3RyaWN0Q1ZDID0gZnVuY3Rpb24oZSkge1xuICB2YXIgZGlnaXQsIHRhcmdldCwgdmFsO1xuICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgZGlnaXQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpO1xuICBpZiAoIS9eXFxkKyQvLnRlc3QoZGlnaXQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChoYXNUZXh0U2VsZWN0ZWQodGFyZ2V0KSkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YWwgPSBRSi52YWwodGFyZ2V0KSArIGRpZ2l0O1xuICBpZiAoISh2YWwubGVuZ3RoIDw9IDQpKSB7XG4gICAgcmV0dXJuIGUucHJldmVudERlZmF1bHQoKTtcbiAgfVxufTtcblxuc2V0Q2FyZFR5cGUgPSBmdW5jdGlvbihlKSB7XG4gIHZhciBhbGxUeXBlcywgY2FyZCwgY2FyZFR5cGUsIHRhcmdldCwgdmFsO1xuICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgdmFsID0gUUoudmFsKHRhcmdldCk7XG4gIGNhcmRUeXBlID0gUGF5bWVudC5mbnMuY2FyZFR5cGUodmFsKSB8fCAndW5rbm93bic7XG4gIGlmICghUUouaGFzQ2xhc3ModGFyZ2V0LCBjYXJkVHlwZSkpIHtcbiAgICBhbGxUeXBlcyA9IChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBpLCBsZW4sIHJlc3VsdHM7XG4gICAgICByZXN1bHRzID0gW107XG4gICAgICBmb3IgKGkgPSAwLCBsZW4gPSBjYXJkcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBjYXJkID0gY2FyZHNbaV07XG4gICAgICAgIHJlc3VsdHMucHVzaChjYXJkLnR5cGUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfSkoKTtcbiAgICBRSi5yZW1vdmVDbGFzcyh0YXJnZXQsICd1bmtub3duJyk7XG4gICAgUUoucmVtb3ZlQ2xhc3ModGFyZ2V0LCBhbGxUeXBlcy5qb2luKCcgJykpO1xuICAgIFFKLmFkZENsYXNzKHRhcmdldCwgY2FyZFR5cGUpO1xuICAgIFFKLnRvZ2dsZUNsYXNzKHRhcmdldCwgJ2lkZW50aWZpZWQnLCBjYXJkVHlwZSAhPT0gJ3Vua25vd24nKTtcbiAgICByZXR1cm4gUUoudHJpZ2dlcih0YXJnZXQsICdwYXltZW50LmNhcmRUeXBlJywgY2FyZFR5cGUpO1xuICB9XG59O1xuXG5QYXltZW50ID0gKGZ1bmN0aW9uKCkge1xuICBmdW5jdGlvbiBQYXltZW50KCkge31cblxuICBQYXltZW50LmZucyA9IHtcbiAgICBjYXJkRXhwaXJ5VmFsOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgdmFyIG1vbnRoLCBwcmVmaXgsIHJlZiwgeWVhcjtcbiAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvXFxzL2csICcnKTtcbiAgICAgIHJlZiA9IHZhbHVlLnNwbGl0KCcvJywgMiksIG1vbnRoID0gcmVmWzBdLCB5ZWFyID0gcmVmWzFdO1xuICAgICAgaWYgKCh5ZWFyICE9IG51bGwgPyB5ZWFyLmxlbmd0aCA6IHZvaWQgMCkgPT09IDIgJiYgL15cXGQrJC8udGVzdCh5ZWFyKSkge1xuICAgICAgICBwcmVmaXggPSAobmV3IERhdGUpLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgIHByZWZpeCA9IHByZWZpeC50b1N0cmluZygpLnNsaWNlKDAsIDIpO1xuICAgICAgICB5ZWFyID0gcHJlZml4ICsgeWVhcjtcbiAgICAgIH1cbiAgICAgIG1vbnRoID0gcGFyc2VJbnQobW9udGgsIDEwKTtcbiAgICAgIHllYXIgPSBwYXJzZUludCh5ZWFyLCAxMCk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBtb250aDogbW9udGgsXG4gICAgICAgIHllYXI6IHllYXJcbiAgICAgIH07XG4gICAgfSxcbiAgICB2YWxpZGF0ZUNhcmROdW1iZXI6IGZ1bmN0aW9uKG51bSkge1xuICAgICAgdmFyIGNhcmQsIHJlZjtcbiAgICAgIG51bSA9IChudW0gKyAnJykucmVwbGFjZSgvXFxzK3wtL2csICcnKTtcbiAgICAgIGlmICghL15cXGQrJC8udGVzdChudW0pKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGNhcmQgPSBjYXJkRnJvbU51bWJlcihudW0pO1xuICAgICAgaWYgKCFjYXJkKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAocmVmID0gbnVtLmxlbmd0aCwgaW5kZXhPZi5jYWxsKGNhcmQubGVuZ3RoLCByZWYpID49IDApICYmIChjYXJkLmx1aG4gPT09IGZhbHNlIHx8IGx1aG5DaGVjayhudW0pKTtcbiAgICB9LFxuICAgIHZhbGlkYXRlQ2FyZEV4cGlyeTogZnVuY3Rpb24obW9udGgsIHllYXIpIHtcbiAgICAgIHZhciBjdXJyZW50VGltZSwgZXhwaXJ5LCBwcmVmaXgsIHJlZjtcbiAgICAgIGlmICh0eXBlb2YgbW9udGggPT09ICdvYmplY3QnICYmICdtb250aCcgaW4gbW9udGgpIHtcbiAgICAgICAgcmVmID0gbW9udGgsIG1vbnRoID0gcmVmLm1vbnRoLCB5ZWFyID0gcmVmLnllYXI7XG4gICAgICB9XG4gICAgICBpZiAoIShtb250aCAmJiB5ZWFyKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBtb250aCA9IFFKLnRyaW0obW9udGgpO1xuICAgICAgeWVhciA9IFFKLnRyaW0oeWVhcik7XG4gICAgICBpZiAoIS9eXFxkKyQvLnRlc3QobW9udGgpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICghL15cXGQrJC8udGVzdCh5ZWFyKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoIShwYXJzZUludChtb250aCwgMTApIDw9IDEyKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoeWVhci5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgcHJlZml4ID0gKG5ldyBEYXRlKS5nZXRGdWxsWWVhcigpO1xuICAgICAgICBwcmVmaXggPSBwcmVmaXgudG9TdHJpbmcoKS5zbGljZSgwLCAyKTtcbiAgICAgICAgeWVhciA9IHByZWZpeCArIHllYXI7XG4gICAgICB9XG4gICAgICBleHBpcnkgPSBuZXcgRGF0ZSh5ZWFyLCBtb250aCk7XG4gICAgICBjdXJyZW50VGltZSA9IG5ldyBEYXRlO1xuICAgICAgZXhwaXJ5LnNldE1vbnRoKGV4cGlyeS5nZXRNb250aCgpIC0gMSk7XG4gICAgICBleHBpcnkuc2V0TW9udGgoZXhwaXJ5LmdldE1vbnRoKCkgKyAxLCAxKTtcbiAgICAgIHJldHVybiBleHBpcnkgPiBjdXJyZW50VGltZTtcbiAgICB9LFxuICAgIHZhbGlkYXRlQ2FyZENWQzogZnVuY3Rpb24oY3ZjLCB0eXBlKSB7XG4gICAgICB2YXIgcmVmLCByZWYxO1xuICAgICAgY3ZjID0gUUoudHJpbShjdmMpO1xuICAgICAgaWYgKCEvXlxcZCskLy50ZXN0KGN2YykpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGUgJiYgY2FyZEZyb21UeXBlKHR5cGUpKSB7XG4gICAgICAgIHJldHVybiByZWYgPSBjdmMubGVuZ3RoLCBpbmRleE9mLmNhbGwoKHJlZjEgPSBjYXJkRnJvbVR5cGUodHlwZSkpICE9IG51bGwgPyByZWYxLmN2Y0xlbmd0aCA6IHZvaWQgMCwgcmVmKSA+PSAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGN2Yy5sZW5ndGggPj0gMyAmJiBjdmMubGVuZ3RoIDw9IDQ7XG4gICAgICB9XG4gICAgfSxcbiAgICBjYXJkVHlwZTogZnVuY3Rpb24obnVtKSB7XG4gICAgICB2YXIgcmVmO1xuICAgICAgaWYgKCFudW0pIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICByZXR1cm4gKChyZWYgPSBjYXJkRnJvbU51bWJlcihudW0pKSAhPSBudWxsID8gcmVmLnR5cGUgOiB2b2lkIDApIHx8IG51bGw7XG4gICAgfSxcbiAgICBmb3JtYXRDYXJkTnVtYmVyOiBmdW5jdGlvbihudW0pIHtcbiAgICAgIHZhciBjYXJkLCBncm91cHMsIHJlZiwgdXBwZXJMZW5ndGg7XG4gICAgICBjYXJkID0gY2FyZEZyb21OdW1iZXIobnVtKTtcbiAgICAgIGlmICghY2FyZCkge1xuICAgICAgICByZXR1cm4gbnVtO1xuICAgICAgfVxuICAgICAgdXBwZXJMZW5ndGggPSBjYXJkLmxlbmd0aFtjYXJkLmxlbmd0aC5sZW5ndGggLSAxXTtcbiAgICAgIG51bSA9IG51bS5yZXBsYWNlKC9cXEQvZywgJycpO1xuICAgICAgbnVtID0gbnVtLnNsaWNlKDAsICt1cHBlckxlbmd0aCArIDEgfHwgOWU5KTtcbiAgICAgIGlmIChjYXJkLmZvcm1hdC5nbG9iYWwpIHtcbiAgICAgICAgcmV0dXJuIChyZWYgPSBudW0ubWF0Y2goY2FyZC5mb3JtYXQpKSAhPSBudWxsID8gcmVmLmpvaW4oJyAnKSA6IHZvaWQgMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGdyb3VwcyA9IGNhcmQuZm9ybWF0LmV4ZWMobnVtKTtcbiAgICAgICAgaWYgKGdyb3VwcyAhPSBudWxsKSB7XG4gICAgICAgICAgZ3JvdXBzLnNoaWZ0KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGdyb3VwcyAhPSBudWxsID8gZ3JvdXBzLmpvaW4oJyAnKSA6IHZvaWQgMDtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgUGF5bWVudC5yZXN0cmljdE51bWVyaWMgPSBmdW5jdGlvbihlbCkge1xuICAgIHJldHVybiBRSi5vbihlbCwgJ2tleXByZXNzJywgcmVzdHJpY3ROdW1lcmljKTtcbiAgfTtcblxuICBQYXltZW50LmNhcmRFeHBpcnlWYWwgPSBmdW5jdGlvbihlbCkge1xuICAgIHJldHVybiBQYXltZW50LmZucy5jYXJkRXhwaXJ5VmFsKFFKLnZhbChlbCkpO1xuICB9O1xuXG4gIFBheW1lbnQuZm9ybWF0Q2FyZENWQyA9IGZ1bmN0aW9uKGVsKSB7XG4gICAgUGF5bWVudC5yZXN0cmljdE51bWVyaWMoZWwpO1xuICAgIFFKLm9uKGVsLCAna2V5cHJlc3MnLCByZXN0cmljdENWQyk7XG4gICAgcmV0dXJuIGVsO1xuICB9O1xuXG4gIFBheW1lbnQuZm9ybWF0Q2FyZEV4cGlyeSA9IGZ1bmN0aW9uKGVsKSB7XG4gICAgdmFyIG1vbnRoLCB5ZWFyO1xuICAgIFBheW1lbnQucmVzdHJpY3ROdW1lcmljKGVsKTtcbiAgICBpZiAoZWwubGVuZ3RoICYmIGVsLmxlbmd0aCA9PT0gMikge1xuICAgICAgbW9udGggPSBlbFswXSwgeWVhciA9IGVsWzFdO1xuICAgICAgdGhpcy5mb3JtYXRDYXJkRXhwaXJ5TXVsdGlwbGUobW9udGgsIHllYXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBRSi5vbihlbCwgJ2tleXByZXNzJywgcmVzdHJpY3RDb21iaW5lZEV4cGlyeSk7XG4gICAgICBRSi5vbihlbCwgJ2tleXByZXNzJywgZm9ybWF0RXhwaXJ5KTtcbiAgICAgIFFKLm9uKGVsLCAna2V5cHJlc3MnLCBmb3JtYXRGb3J3YXJkU2xhc2gpO1xuICAgICAgUUoub24oZWwsICdrZXlwcmVzcycsIGZvcm1hdEZvcndhcmRFeHBpcnkpO1xuICAgICAgUUoub24oZWwsICdrZXlkb3duJywgZm9ybWF0QmFja0V4cGlyeSk7XG4gICAgfVxuICAgIHJldHVybiBlbDtcbiAgfTtcblxuICBQYXltZW50LmZvcm1hdENhcmRFeHBpcnlNdWx0aXBsZSA9IGZ1bmN0aW9uKG1vbnRoLCB5ZWFyKSB7XG4gICAgUUoub24obW9udGgsICdrZXlwcmVzcycsIHJlc3RyaWN0TW9udGhFeHBpcnkpO1xuICAgIFFKLm9uKG1vbnRoLCAna2V5cHJlc3MnLCBmb3JtYXRNb250aEV4cGlyeSk7XG4gICAgcmV0dXJuIFFKLm9uKHllYXIsICdrZXlwcmVzcycsIHJlc3RyaWN0WWVhckV4cGlyeSk7XG4gIH07XG5cbiAgUGF5bWVudC5mb3JtYXRDYXJkTnVtYmVyID0gZnVuY3Rpb24oZWwpIHtcbiAgICBQYXltZW50LnJlc3RyaWN0TnVtZXJpYyhlbCk7XG4gICAgUUoub24oZWwsICdrZXlwcmVzcycsIHJlc3RyaWN0Q2FyZE51bWJlcik7XG4gICAgUUoub24oZWwsICdrZXlwcmVzcycsIGZvcm1hdENhcmROdW1iZXIpO1xuICAgIFFKLm9uKGVsLCAna2V5ZG93bicsIGZvcm1hdEJhY2tDYXJkTnVtYmVyKTtcbiAgICBRSi5vbihlbCwgJ2tleXVwJywgc2V0Q2FyZFR5cGUpO1xuICAgIFFKLm9uKGVsLCAncGFzdGUnLCByZUZvcm1hdENhcmROdW1iZXIpO1xuICAgIHJldHVybiBlbDtcbiAgfTtcblxuICBQYXltZW50LmdldENhcmRBcnJheSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBjYXJkcztcbiAgfTtcblxuICBQYXltZW50LnNldENhcmRBcnJheSA9IGZ1bmN0aW9uKGNhcmRBcnJheSkge1xuICAgIGNhcmRzID0gY2FyZEFycmF5O1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIFBheW1lbnQuYWRkVG9DYXJkQXJyYXkgPSBmdW5jdGlvbihjYXJkT2JqZWN0KSB7XG4gICAgcmV0dXJuIGNhcmRzLnB1c2goY2FyZE9iamVjdCk7XG4gIH07XG5cbiAgUGF5bWVudC5yZW1vdmVGcm9tQ2FyZEFycmF5ID0gZnVuY3Rpb24odHlwZSkge1xuICAgIHZhciBrZXksIHZhbHVlO1xuICAgIGZvciAoa2V5IGluIGNhcmRzKSB7XG4gICAgICB2YWx1ZSA9IGNhcmRzW2tleV07XG4gICAgICBpZiAodmFsdWUudHlwZSA9PT0gdHlwZSkge1xuICAgICAgICBjYXJkcy5zcGxpY2Uoa2V5LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgcmV0dXJuIFBheW1lbnQ7XG5cbn0pKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gUGF5bWVudDtcblxuZ2xvYmFsLlBheW1lbnQgPSBQYXltZW50O1xuXG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxufSx7XCJxai9zcmMvcWouY29mZmVlXCI6MX1dfSx7fSxbMl0pKDIpXG59KTsiLCJmdW5jdGlvbiB0bGl0ZSh0KXtkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsZnVuY3Rpb24oZSl7dmFyIGk9ZS50YXJnZXQsbj10KGkpO258fChuPShpPWkucGFyZW50RWxlbWVudCkmJnQoaSkpLG4mJnRsaXRlLnNob3coaSxuLCEwKX0pfXRsaXRlLnNob3c9ZnVuY3Rpb24odCxlLGkpe3ZhciBuPVwiZGF0YS10bGl0ZVwiO2U9ZXx8e30sKHQudG9vbHRpcHx8ZnVuY3Rpb24odCxlKXtmdW5jdGlvbiBvKCl7dGxpdGUuaGlkZSh0LCEwKX1mdW5jdGlvbiBsKCl7cnx8KHI9ZnVuY3Rpb24odCxlLGkpe2Z1bmN0aW9uIG4oKXtvLmNsYXNzTmFtZT1cInRsaXRlIHRsaXRlLVwiK3Irczt2YXIgZT10Lm9mZnNldFRvcCxpPXQub2Zmc2V0TGVmdDtvLm9mZnNldFBhcmVudD09PXQmJihlPWk9MCk7dmFyIG49dC5vZmZzZXRXaWR0aCxsPXQub2Zmc2V0SGVpZ2h0LGQ9by5vZmZzZXRIZWlnaHQsZj1vLm9mZnNldFdpZHRoLGE9aStuLzI7by5zdHlsZS50b3A9KFwic1wiPT09cj9lLWQtMTA6XCJuXCI9PT1yP2UrbCsxMDplK2wvMi1kLzIpK1wicHhcIixvLnN0eWxlLmxlZnQ9KFwid1wiPT09cz9pOlwiZVwiPT09cz9pK24tZjpcIndcIj09PXI/aStuKzEwOlwiZVwiPT09cj9pLWYtMTA6YS1mLzIpK1wicHhcIn12YXIgbz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKSxsPWkuZ3Jhdnx8dC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRsaXRlXCIpfHxcIm5cIjtvLmlubmVySFRNTD1lLHQuYXBwZW5kQ2hpbGQobyk7dmFyIHI9bFswXXx8XCJcIixzPWxbMV18fFwiXCI7bigpO3ZhciBkPW8uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7cmV0dXJuXCJzXCI9PT1yJiZkLnRvcDwwPyhyPVwiblwiLG4oKSk6XCJuXCI9PT1yJiZkLmJvdHRvbT53aW5kb3cuaW5uZXJIZWlnaHQ/KHI9XCJzXCIsbigpKTpcImVcIj09PXImJmQubGVmdDwwPyhyPVwid1wiLG4oKSk6XCJ3XCI9PT1yJiZkLnJpZ2h0PndpbmRvdy5pbm5lcldpZHRoJiYocj1cImVcIixuKCkpLG8uY2xhc3NOYW1lKz1cIiB0bGl0ZS12aXNpYmxlXCIsb30odCxkLGUpKX12YXIgcixzLGQ7cmV0dXJuIHQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLG8pLHQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIixvKSx0LnRvb2x0aXA9e3Nob3c6ZnVuY3Rpb24oKXtkPXQudGl0bGV8fHQuZ2V0QXR0cmlidXRlKG4pfHxkLHQudGl0bGU9XCJcIix0LnNldEF0dHJpYnV0ZShuLFwiXCIpLGQmJiFzJiYocz1zZXRUaW1lb3V0KGwsaT8xNTA6MSkpfSxoaWRlOmZ1bmN0aW9uKHQpe2lmKGk9PT10KXtzPWNsZWFyVGltZW91dChzKTt2YXIgZT1yJiZyLnBhcmVudE5vZGU7ZSYmZS5yZW1vdmVDaGlsZChyKSxyPXZvaWQgMH19fX0odCxlKSkuc2hvdygpfSx0bGl0ZS5oaWRlPWZ1bmN0aW9uKHQsZSl7dC50b29sdGlwJiZ0LnRvb2x0aXAuaGlkZShlKX0sXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZSYmbW9kdWxlLmV4cG9ydHMmJihtb2R1bGUuZXhwb3J0cz10bGl0ZSk7IiwiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSh7MTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XCJ1c2Ugc3RyaWN0XCI7dmFyIF92YWxpZEZvcm09cmVxdWlyZShcIi4vc3JjL3ZhbGlkLWZvcm1cIik7dmFyIF92YWxpZEZvcm0yPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3ZhbGlkRm9ybSk7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmope3JldHVybiBvYmomJm9iai5fX2VzTW9kdWxlP29iajp7ZGVmYXVsdDpvYmp9fXdpbmRvdy5WYWxpZEZvcm09X3ZhbGlkRm9ybTIuZGVmYXVsdDt3aW5kb3cuVmFsaWRGb3JtLnRvZ2dsZUludmFsaWRDbGFzcz1fdmFsaWRGb3JtLnRvZ2dsZUludmFsaWRDbGFzczt3aW5kb3cuVmFsaWRGb3JtLmhhbmRsZUN1c3RvbU1lc3NhZ2VzPV92YWxpZEZvcm0uaGFuZGxlQ3VzdG9tTWVzc2FnZXM7d2luZG93LlZhbGlkRm9ybS5oYW5kbGVDdXN0b21NZXNzYWdlRGlzcGxheT1fdmFsaWRGb3JtLmhhbmRsZUN1c3RvbU1lc3NhZ2VEaXNwbGF5fSx7XCIuL3NyYy92YWxpZC1mb3JtXCI6M31dLDI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1widXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTp0cnVlfSk7ZXhwb3J0cy5jbG9uZT1jbG9uZTtleHBvcnRzLmRlZmF1bHRzPWRlZmF1bHRzO2V4cG9ydHMuaW5zZXJ0QWZ0ZXI9aW5zZXJ0QWZ0ZXI7ZXhwb3J0cy5pbnNlcnRCZWZvcmU9aW5zZXJ0QmVmb3JlO2V4cG9ydHMuZm9yRWFjaD1mb3JFYWNoO2V4cG9ydHMuZGVib3VuY2U9ZGVib3VuY2U7ZnVuY3Rpb24gY2xvbmUob2JqKXt2YXIgY29weT17fTtmb3IodmFyIGF0dHIgaW4gb2JqKXtpZihvYmouaGFzT3duUHJvcGVydHkoYXR0cikpY29weVthdHRyXT1vYmpbYXR0cl19cmV0dXJuIGNvcHl9ZnVuY3Rpb24gZGVmYXVsdHMob2JqLGRlZmF1bHRPYmplY3Qpe29iaj1jbG9uZShvYmp8fHt9KTtmb3IodmFyIGsgaW4gZGVmYXVsdE9iamVjdCl7aWYob2JqW2tdPT09dW5kZWZpbmVkKW9ialtrXT1kZWZhdWx0T2JqZWN0W2tdfXJldHVybiBvYmp9ZnVuY3Rpb24gaW5zZXJ0QWZ0ZXIocmVmTm9kZSxub2RlVG9JbnNlcnQpe3ZhciBzaWJsaW5nPXJlZk5vZGUubmV4dFNpYmxpbmc7aWYoc2libGluZyl7dmFyIF9wYXJlbnQ9cmVmTm9kZS5wYXJlbnROb2RlO19wYXJlbnQuaW5zZXJ0QmVmb3JlKG5vZGVUb0luc2VydCxzaWJsaW5nKX1lbHNle3BhcmVudC5hcHBlbmRDaGlsZChub2RlVG9JbnNlcnQpfX1mdW5jdGlvbiBpbnNlcnRCZWZvcmUocmVmTm9kZSxub2RlVG9JbnNlcnQpe3ZhciBwYXJlbnQ9cmVmTm9kZS5wYXJlbnROb2RlO3BhcmVudC5pbnNlcnRCZWZvcmUobm9kZVRvSW5zZXJ0LHJlZk5vZGUpfWZ1bmN0aW9uIGZvckVhY2goaXRlbXMsZm4pe2lmKCFpdGVtcylyZXR1cm47aWYoaXRlbXMuZm9yRWFjaCl7aXRlbXMuZm9yRWFjaChmbil9ZWxzZXtmb3IodmFyIGk9MDtpPGl0ZW1zLmxlbmd0aDtpKyspe2ZuKGl0ZW1zW2ldLGksaXRlbXMpfX19ZnVuY3Rpb24gZGVib3VuY2UobXMsZm4pe3ZhciB0aW1lb3V0PXZvaWQgMDt2YXIgZGVib3VuY2VkRm49ZnVuY3Rpb24gZGVib3VuY2VkRm4oKXtjbGVhclRpbWVvdXQodGltZW91dCk7dGltZW91dD1zZXRUaW1lb3V0KGZuLG1zKX07cmV0dXJuIGRlYm91bmNlZEZufX0se31dLDM6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1widXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTp0cnVlfSk7ZXhwb3J0cy50b2dnbGVJbnZhbGlkQ2xhc3M9dG9nZ2xlSW52YWxpZENsYXNzO2V4cG9ydHMuaGFuZGxlQ3VzdG9tTWVzc2FnZXM9aGFuZGxlQ3VzdG9tTWVzc2FnZXM7ZXhwb3J0cy5oYW5kbGVDdXN0b21NZXNzYWdlRGlzcGxheT1oYW5kbGVDdXN0b21NZXNzYWdlRGlzcGxheTtleHBvcnRzLmRlZmF1bHQ9dmFsaWRGb3JtO3ZhciBfdXRpbD1yZXF1aXJlKFwiLi91dGlsXCIpO2Z1bmN0aW9uIHRvZ2dsZUludmFsaWRDbGFzcyhpbnB1dCxpbnZhbGlkQ2xhc3Mpe2lucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnZhbGlkXCIsZnVuY3Rpb24oKXtpbnB1dC5jbGFzc0xpc3QuYWRkKGludmFsaWRDbGFzcyl9KTtpbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIixmdW5jdGlvbigpe2lmKGlucHV0LnZhbGlkaXR5LnZhbGlkKXtpbnB1dC5jbGFzc0xpc3QucmVtb3ZlKGludmFsaWRDbGFzcyl9fSl9dmFyIGVycm9yUHJvcHM9W1wiYmFkSW5wdXRcIixcInBhdHRlcm5NaXNtYXRjaFwiLFwicmFuZ2VPdmVyZmxvd1wiLFwicmFuZ2VVbmRlcmZsb3dcIixcInN0ZXBNaXNtYXRjaFwiLFwidG9vTG9uZ1wiLFwidG9vU2hvcnRcIixcInR5cGVNaXNtYXRjaFwiLFwidmFsdWVNaXNzaW5nXCIsXCJjdXN0b21FcnJvclwiXTtmdW5jdGlvbiBnZXRDdXN0b21NZXNzYWdlKGlucHV0LGN1c3RvbU1lc3NhZ2VzKXtjdXN0b21NZXNzYWdlcz1jdXN0b21NZXNzYWdlc3x8e307dmFyIGxvY2FsRXJyb3JQcm9wcz1baW5wdXQudHlwZStcIk1pc21hdGNoXCJdLmNvbmNhdChlcnJvclByb3BzKTt2YXIgdmFsaWRpdHk9aW5wdXQudmFsaWRpdHk7Zm9yKHZhciBpPTA7aTxsb2NhbEVycm9yUHJvcHMubGVuZ3RoO2krKyl7dmFyIHByb3A9bG9jYWxFcnJvclByb3BzW2ldO2lmKHZhbGlkaXR5W3Byb3BdKXtyZXR1cm4gaW5wdXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1cIitwcm9wKXx8Y3VzdG9tTWVzc2FnZXNbcHJvcF19fX1mdW5jdGlvbiBoYW5kbGVDdXN0b21NZXNzYWdlcyhpbnB1dCxjdXN0b21NZXNzYWdlcyl7ZnVuY3Rpb24gY2hlY2tWYWxpZGl0eSgpe3ZhciBtZXNzYWdlPWlucHV0LnZhbGlkaXR5LnZhbGlkP251bGw6Z2V0Q3VzdG9tTWVzc2FnZShpbnB1dCxjdXN0b21NZXNzYWdlcyk7aW5wdXQuc2V0Q3VzdG9tVmFsaWRpdHkobWVzc2FnZXx8XCJcIil9aW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsY2hlY2tWYWxpZGl0eSk7aW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImludmFsaWRcIixjaGVja1ZhbGlkaXR5KX1mdW5jdGlvbiBoYW5kbGVDdXN0b21NZXNzYWdlRGlzcGxheShpbnB1dCxvcHRpb25zKXt2YXIgdmFsaWRhdGlvbkVycm9yQ2xhc3M9b3B0aW9ucy52YWxpZGF0aW9uRXJyb3JDbGFzcyx2YWxpZGF0aW9uRXJyb3JQYXJlbnRDbGFzcz1vcHRpb25zLnZhbGlkYXRpb25FcnJvclBhcmVudENsYXNzLGVycm9yUGxhY2VtZW50PW9wdGlvbnMuZXJyb3JQbGFjZW1lbnQ7ZnVuY3Rpb24gY2hlY2tWYWxpZGl0eShvcHRpb25zKXt2YXIgaW5zZXJ0RXJyb3I9b3B0aW9ucy5pbnNlcnRFcnJvcjt2YXIgcGFyZW50Tm9kZT1pbnB1dC5wYXJlbnROb2RlO3ZhciBlcnJvck5vZGU9cGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKFwiLlwiK3ZhbGlkYXRpb25FcnJvckNsYXNzKXx8ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtpZighaW5wdXQudmFsaWRpdHkudmFsaWQmJmlucHV0LnZhbGlkYXRpb25NZXNzYWdlKXtlcnJvck5vZGUuY2xhc3NOYW1lPXZhbGlkYXRpb25FcnJvckNsYXNzO2Vycm9yTm9kZS50ZXh0Q29udGVudD1pbnB1dC52YWxpZGF0aW9uTWVzc2FnZTtpZihpbnNlcnRFcnJvcil7ZXJyb3JQbGFjZW1lbnQ9PT1cImJlZm9yZVwiPygwLF91dGlsLmluc2VydEJlZm9yZSkoaW5wdXQsZXJyb3JOb2RlKTooMCxfdXRpbC5pbnNlcnRBZnRlcikoaW5wdXQsZXJyb3JOb2RlKTtwYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQodmFsaWRhdGlvbkVycm9yUGFyZW50Q2xhc3MpfX1lbHNle3BhcmVudE5vZGUuY2xhc3NMaXN0LnJlbW92ZSh2YWxpZGF0aW9uRXJyb3JQYXJlbnRDbGFzcyk7ZXJyb3JOb2RlLnJlbW92ZSgpfX1pbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIixmdW5jdGlvbigpe2NoZWNrVmFsaWRpdHkoe2luc2VydEVycm9yOmZhbHNlfSl9KTtpbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiaW52YWxpZFwiLGZ1bmN0aW9uKGUpe2UucHJldmVudERlZmF1bHQoKTtjaGVja1ZhbGlkaXR5KHtpbnNlcnRFcnJvcjp0cnVlfSl9KX12YXIgZGVmYXVsdE9wdGlvbnM9e2ludmFsaWRDbGFzczpcImludmFsaWRcIix2YWxpZGF0aW9uRXJyb3JDbGFzczpcInZhbGlkYXRpb24tZXJyb3JcIix2YWxpZGF0aW9uRXJyb3JQYXJlbnRDbGFzczpcImhhcy12YWxpZGF0aW9uLWVycm9yXCIsY3VzdG9tTWVzc2FnZXM6e30sZXJyb3JQbGFjZW1lbnQ6XCJiZWZvcmVcIn07ZnVuY3Rpb24gdmFsaWRGb3JtKGVsZW1lbnQsb3B0aW9ucyl7aWYoIWVsZW1lbnR8fCFlbGVtZW50Lm5vZGVOYW1lKXt0aHJvdyBuZXcgRXJyb3IoXCJGaXJzdCBhcmcgdG8gdmFsaWRGb3JtIG11c3QgYmUgYSBmb3JtLCBpbnB1dCwgc2VsZWN0LCBvciB0ZXh0YXJlYVwiKX12YXIgaW5wdXRzPXZvaWQgMDt2YXIgdHlwZT1lbGVtZW50Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7b3B0aW9ucz0oMCxfdXRpbC5kZWZhdWx0cykob3B0aW9ucyxkZWZhdWx0T3B0aW9ucyk7aWYodHlwZT09PVwiZm9ybVwiKXtpbnB1dHM9ZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXQsIHNlbGVjdCwgdGV4dGFyZWFcIik7Zm9jdXNJbnZhbGlkSW5wdXQoZWxlbWVudCxpbnB1dHMpfWVsc2UgaWYodHlwZT09PVwiaW5wdXRcInx8dHlwZT09PVwic2VsZWN0XCJ8fHR5cGU9PT1cInRleHRhcmVhXCIpe2lucHV0cz1bZWxlbWVudF19ZWxzZXt0aHJvdyBuZXcgRXJyb3IoXCJPbmx5IGZvcm0sIGlucHV0LCBzZWxlY3QsIG9yIHRleHRhcmVhIGVsZW1lbnRzIGFyZSBzdXBwb3J0ZWRcIil9dmFsaWRGb3JtSW5wdXRzKGlucHV0cyxvcHRpb25zKX1mdW5jdGlvbiBmb2N1c0ludmFsaWRJbnB1dChmb3JtLGlucHV0cyl7dmFyIGZvY3VzRmlyc3Q9KDAsX3V0aWwuZGVib3VuY2UpKDEwMCxmdW5jdGlvbigpe3ZhciBpbnZhbGlkTm9kZT1mb3JtLnF1ZXJ5U2VsZWN0b3IoXCI6aW52YWxpZFwiKTtpZihpbnZhbGlkTm9kZSlpbnZhbGlkTm9kZS5mb2N1cygpfSk7KDAsX3V0aWwuZm9yRWFjaCkoaW5wdXRzLGZ1bmN0aW9uKGlucHV0KXtyZXR1cm4gaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImludmFsaWRcIixmb2N1c0ZpcnN0KX0pfWZ1bmN0aW9uIHZhbGlkRm9ybUlucHV0cyhpbnB1dHMsb3B0aW9ucyl7dmFyIGludmFsaWRDbGFzcz1vcHRpb25zLmludmFsaWRDbGFzcyxjdXN0b21NZXNzYWdlcz1vcHRpb25zLmN1c3RvbU1lc3NhZ2VzOygwLF91dGlsLmZvckVhY2gpKGlucHV0cyxmdW5jdGlvbihpbnB1dCl7dG9nZ2xlSW52YWxpZENsYXNzKGlucHV0LGludmFsaWRDbGFzcyk7aGFuZGxlQ3VzdG9tTWVzc2FnZXMoaW5wdXQsY3VzdG9tTWVzc2FnZXMpO2hhbmRsZUN1c3RvbU1lc3NhZ2VEaXNwbGF5KGlucHV0LG9wdGlvbnMpfSl9fSx7XCIuL3V0aWxcIjoyfV19LHt9LFsxXSk7IiwiLy8gTWlublBvc3QgR2l2aW5nIHBsdWdpblxuLy8gdGhlIHNlbWktY29sb24gYmVmb3JlIGZ1bmN0aW9uIGludm9jYXRpb24gaXMgYSBzYWZldHkgbmV0IGFnYWluc3QgY29uY2F0ZW5hdGVkXG4vLyBzY3JpcHRzIGFuZC9vciBvdGhlciBwbHVnaW5zIHdoaWNoIG1heSBub3QgYmUgY2xvc2VkIHByb3Blcmx5LlxuOyhmdW5jdGlvbiAoICQsIHdpbmRvdywgZG9jdW1lbnQsIHVuZGVmaW5lZCApIHtcblxuICAvLyB1bmRlZmluZWQgaXMgdXNlZCBoZXJlIGFzIHRoZSB1bmRlZmluZWQgZ2xvYmFsIHZhcmlhYmxlIGluIEVDTUFTY3JpcHQgMyBpc1xuICAvLyBtdXRhYmxlIChpZS4gaXQgY2FuIGJlIGNoYW5nZWQgYnkgc29tZW9uZSBlbHNlKS4gdW5kZWZpbmVkIGlzbid0IHJlYWxseSBiZWluZ1xuICAvLyBwYXNzZWQgaW4gc28gd2UgY2FuIGVuc3VyZSB0aGUgdmFsdWUgb2YgaXQgaXMgdHJ1bHkgdW5kZWZpbmVkLiBJbiBFUzUsIHVuZGVmaW5lZFxuICAvLyBjYW4gbm8gbG9uZ2VyIGJlIG1vZGlmaWVkLlxuXG4gIC8vIHdpbmRvdyBhbmQgZG9jdW1lbnQgYXJlIHBhc3NlZCB0aHJvdWdoIGFzIGxvY2FsIHZhcmlhYmxlIHJhdGhlciB0aGFuIGdsb2JhbFxuICAvLyBhcyB0aGlzIChzbGlnaHRseSkgcXVpY2tlbnMgdGhlIHJlc29sdXRpb24gcHJvY2VzcyBhbmQgY2FuIGJlIG1vcmUgZWZmaWNpZW50bHlcbiAgLy8gbWluaWZpZWQgKGVzcGVjaWFsbHkgd2hlbiBib3RoIGFyZSByZWd1bGFybHkgcmVmZXJlbmNlZCBpbiB5b3VyIHBsdWdpbikuXG5cbiAgLy8gQ3JlYXRlIHRoZSBkZWZhdWx0cyBvbmNlXG4gIHZhciBwbHVnaW5OYW1lID0gJ21pbm5wb3N0X2dpdmluZycsXG4gIGRlZmF1bHRzID0ge1xuICAgICdkZWJ1ZycgOiBmYWxzZSwgLy8gdGhpcyBjYW4gYmUgc2V0IHRvIHRydWUgb24gcGFnZSBsZXZlbCBvcHRpb25zXG4gICAgJ3N0cmlwZV9wdWJsaXNoYWJsZV9rZXknIDogJycsXG4gICAgJ3BsYWlkX2VudicgOiAnJyxcbiAgICAncGxhaWRfbGluaycgOiAnI2F1dGhvcml6ZS1hY2gnLFxuICAgICdtaW5ucG9zdF9yb290JyA6ICdodHRwczovL3d3dy5taW5ucG9zdC5jb20nLFxuICAgICdhbmFseXRpY3NfdHlwZScgOiAnJyxcbiAgICAncHJvZ3Jlc3Nfc2VsZWN0b3InIDogJy5tLXN1cHBvcnQtcHJvZ3Jlc3MnLFxuICAgICdmb3JtX3NlbGVjdG9yJyA6ICcubS1mb3JtJyxcbiAgICAnZG9uYXRlX2Zvcm1fc2VsZWN0b3InOiAnI2RvbmF0ZScsXG4gICAgJ2NvbmZpcm1fZm9ybV9zZWxlY3RvcicgOiAnI2NvbmZpcm0nLFxuICAgICdmaW5pc2hfc2VjdGlvbl9zZWxlY3RvcicgOiAnI3BhbmVsLS1jb25maXJtYXRpb24nLFxuICAgICdwYXlfY2NfcHJvY2Vzc2luZ19zZWxlY3RvcicgOiAnaW5wdXRbbmFtZT1cInBheV9mZWVzXCJdJyxcbiAgICAnZmVlX2Ftb3VudCcgOiAnLnByb2Nlc3NpbmctYW1vdW50JyxcbiAgICAnbGV2ZWxfYW1vdW50X3NlbGVjdG9yJyA6ICcjcGFuZWwtLXBheSAuYW1vdW50IC5sZXZlbC1hbW91bnQnLCAvLyB3ZSBjYW4gbWF5YmUgZ2V0IHJpZCBvZiB0aGlzXG4gICAgJ29yaWdpbmFsX2Ftb3VudF9zZWxlY3RvcicgOiAnW25hbWU9XCJhbW91bnRcIl0nLFxuICAgICdmYWlyX21hcmtldF92YWx1ZV9zZWxlY3RvcicgOiAnI2ZhaXJfbWFya2V0X3ZhbHVlJyxcbiAgICAnZnVsbF9hbW91bnRfc2VsZWN0b3InIDogJy5mdWxsLWFtb3VudCcsXG4gICAgJ2luc3RhbGxtZW50X3BlcmlvZF9zZWxlY3RvcicgOiAnW25hbWU9XCJpbnN0YWxsbWVudF9wZXJpb2RcIl0nLFxuICAgICduYW1lX3NlbGVjdG9yJyA6ICcubS1mb3JtLWl0ZW0tZGlzcGxheS1uYW1lJyxcbiAgICAnaW5faG9ub3Jfb3JfbWVtb3J5X2ZpZWxkX3NlbGVjdG9yJyA6ICcubS1mb3JtLWl0ZW0taG9ub3ItbWVtb3J5JyxcbiAgICAnaG9ub3Jfb3JfbWVtb3J5X2Nob29zZXInIDogJ2lucHV0W25hbWU9XCJpbl9ob25vcl9vcl9tZW1vcnlcIl0nLCAvLyByYWRpbyBmaWVsZHNcbiAgICAnaG9ub3JfdHlwZV9zZWxlY3RvcicgOiAnLmEtaG9ub3ItdHlwZScsIC8vIHNwYW4gaW5zaWRlIGxhYmVsXG4gICAgJ2hvbm9yX21lbW9yeV9pbnB1dF9ncm91cCcgOiAnLmEtaG9ub3Itb3ItbWVtb3J5JywgLy8gaG9sZHMgdGhlIGZvcm0gZmllbGRcbiAgICAnYW5vbnltb3VzX3NlbGVjdG9yJyA6ICcjYW5vbnltb3VzJyxcbiAgICAnc2hvd19iaWxsaW5nX2NvdW50cnlfc2VsZWN0b3InIDogJyNiaWxsaW5nX3Nob3dfY291bnRyeScsXG4gICAgJ2JpbGxpbmdfY291bnRyeV9zZWxlY3RvcicgOiAnLm0tZm9ybS1pdGVtLWNvdW50cnknLFxuICAgICdzaG93X3NoaXBwaW5nX2NvdW50cnlfc2VsZWN0b3InIDogJyNzaGlwcGluZ19zaG93X2NvdW50cnknLFxuICAgICdzaGlwcGluZ19jb3VudHJ5X3NlbGVjdG9yJyA6ICcubS1mb3JtLWl0ZW0tc2hpcHBpbmctY291bnRyeScsXG4gICAgJ3NoaXBwaW5nX2FkZHJlc3Nfc2VsZWN0b3InIDogJy5tLWZvcm0taXRlbS1zaGlwcGluZy1hZGRyZXNzJyxcbiAgICAndXNlX2Zvcl9zaGlwcGluZ19zZWxlY3RvcicgOiAnI3VzZWZvcnNoaXBwaW5nJyxcbiAgICAnZW1haWxfZmllbGRfc2VsZWN0b3InIDogJyNlbWFpbCcsXG4gICAgJ3Bhc3N3b3JkX2ZpZWxkX3NlbGVjdG9yJyA6ICcjcGFzc3dvcmQnLFxuICAgICdmaXJzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yJyA6ICcjZmlyc3RfbmFtZScsXG4gICAgJ2xhc3RfbmFtZV9maWVsZF9zZWxlY3RvcicgOiAnI2xhc3RfbmFtZScsXG4gICAgJ2JpbGxpbmdfc3RyZWV0X2ZpZWxkX3NlbGVjdG9yJyA6ICcjYmlsbGluZ19zdHJlZXQnLFxuICAgICdiaWxsaW5nX2NpdHlfZmllbGRfc2VsZWN0b3InIDogJyNiaWxsaW5nX2NpdHknLFxuICAgICdiaWxsaW5nX3N0YXRlX2ZpZWxkX3NlbGVjdG9yJyA6ICcjYmlsbGluZ19zdGF0ZScsXG4gICAgJ2JpbGxpbmdfemlwX2ZpZWxkX3NlbGVjdG9yJzogJyNiaWxsaW5nX3ppcCcsXG4gICAgJ2JpbGxpbmdfY291bnRyeV9maWVsZF9zZWxlY3RvcicgOiAnI2JpbGxpbmdfY291bnRyeScsXG4gICAgJ3NoaXBwaW5nX3N0YXRlX2ZpZWxkX3NlbGVjdG9yJyA6ICcjc2hpcHBpbmdfc3RhdGUnLFxuICAgICdzaGlwcGluZ196aXBfZmllbGRfc2VsZWN0b3InOiAnI3NoaXBwaW5nX3ppcCcsXG4gICAgJ3NoaXBwaW5nX2NvdW50cnlfZmllbGRfc2VsZWN0b3InIDogJyNzaGlwcGluZ19jb3VudHJ5JyxcbiAgICAnY3JlYXRlX21wX3NlbGVjdG9yJyA6ICcjY3JlYXRlbXBhY2NvdW50JyxcbiAgICAncGFzc3dvcmRfc2VsZWN0b3InIDogJy5tLWZvcm0taXRlbS1wYXNzd29yZCcsXG4gICAgJ2FkZGl0aW9uYWxfYW1vdW50X2ZpZWxkJyA6ICcjYWRkaXRpb25hbF9kb25hdGlvbicsXG4gICAgJ3NoaXBwaW5nX3NlbGVjdG9yJyA6ICdmaWVsZHNldC5tLXNoaXBwaW5nLWluZm9ybWF0aW9uJyxcbiAgICAnY2hvb3NlX3BheW1lbnQnIDogJyNjaG9vc2UtcGF5bWVudC1tZXRob2QnLFxuICAgICdwYXltZW50X21ldGhvZF9zZWxlY3RvcicgOiAnLnBheW1lbnQtbWV0aG9kJyxcbiAgICAnY2NfbnVtX3NlbGVjdG9yJyA6ICcjY2FyZC1udW1iZXInLFxuICAgICdjY19leHBfc2VsZWN0b3InIDogJyNjYXJkLWV4cGlyeScsXG4gICAgJ2NjX2N2Y19zZWxlY3RvcicgOiAnI2NhcmQtY3ZjJyxcbiAgICAncGF5X2J1dHRvbl9zZWxlY3RvcicgOiAnLmEtYnV0dG9uLXBheScsXG4gICAgJ29wcF9pZF9zZWxlY3RvcicgOiAnI2xvY2tfa2V5JywgLy8gd2UgdXNlIHRoaXMgdmFsdWUgYXMgdGhlIEdvb2dsZSBBbmFseXRpY3MgdHJhbnNhY3Rpb24gSURcbiAgICAnbmV3c2xldHRlcl9ncm91cF9zZWxlY3RvcicgOiAnLnN1cHBvcnQtbmV3c2xldHRlcnMnXG4gIH07IC8vIGVuZCBkZWZhdWx0c1xuXG4gIC8vIFRoZSBhY3R1YWwgcGx1Z2luIGNvbnN0cnVjdG9yXG4gIGZ1bmN0aW9uIFBsdWdpbiggZWxlbWVudCwgb3B0aW9ucyApIHtcblxuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG5cbiAgICAvLyBqUXVlcnkgaGFzIGFuIGV4dGVuZCBtZXRob2Qgd2hpY2ggbWVyZ2VzIHRoZSBjb250ZW50cyBvZiB0d28gb3JcbiAgICAvLyBtb3JlIG9iamVjdHMsIHN0b3JpbmcgdGhlIHJlc3VsdCBpbiB0aGUgZmlyc3Qgb2JqZWN0LiBUaGUgZmlyc3Qgb2JqZWN0XG4gICAgLy8gaXMgZ2VuZXJhbGx5IGVtcHR5IGFzIHdlIGRvbid0IHdhbnQgdG8gYWx0ZXIgdGhlIGRlZmF1bHQgb3B0aW9ucyBmb3JcbiAgICAvLyBmdXR1cmUgaW5zdGFuY2VzIG9mIHRoZSBwbHVnaW5cbiAgICB0aGlzLm9wdGlvbnMgPSAkLmV4dGVuZCgge30sIGRlZmF1bHRzLCBvcHRpb25zICk7XG5cbiAgICB0aGlzLl9kZWZhdWx0cyA9IGRlZmF1bHRzO1xuICAgIHRoaXMuX25hbWUgPSBwbHVnaW5OYW1lO1xuXG4gICAgdGhpcy5pbml0KCk7XG4gIH0gLy8gZW5kIGNvbnN0cnVjdG9yXG5cbiAgUGx1Z2luLnByb3RvdHlwZSA9IHtcblxuICAgIGluaXQ6IGZ1bmN0aW9uKHJlc2V0LCBhbW91bnQpIHtcblxuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCAnbm8tanMnICk7XG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoICdqcycgKTtcblxuICAgICAgLy8gUGxhY2UgaW5pdGlhbGl6YXRpb24gbG9naWMgaGVyZVxuICAgICAgLy8gWW91IGFscmVhZHkgaGF2ZSBhY2Nlc3MgdG8gdGhlIERPTSBlbGVtZW50IGFuZFxuICAgICAgLy8gdGhlIG9wdGlvbnMgdmlhIHRoZSBpbnN0YW5jZSwgZS5nLiB0aGlzLmVsZW1lbnRcbiAgICAgIC8vIGFuZCB0aGlzLm9wdGlvbnNcbiAgICAgIC8vIHlvdSBjYW4gYWRkIG1vcmUgZnVuY3Rpb25zIGxpa2UgdGhlIG9uZSBiZWxvdyBhbmRcbiAgICAgIC8vIGNhbGwgdGhlbSBsaWtlIHNvOiB0aGlzLnlvdXJPdGhlckZ1bmN0aW9uKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKS5cblxuICAgICAgLy8gbW9kaWZ5IG9wdGlvbnMgYXMgbmVlZGVkXG4gICAgICAvL3ZhciB0aGlzLm9wdGlvbnMuYW1vdW50ID0gJyc7XG4gICAgICBpZiAocmVzZXQgIT09IHRydWUpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLmFtb3VudCA9IHBhcnNlRmxvYXQoJCh0aGlzLm9wdGlvbnMubGV2ZWxfYW1vdW50X3NlbGVjdG9yLCB0aGlzLmVsZW1lbnQpLnRleHQoKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm9wdGlvbnMuYW1vdW50ID0gYW1vdW50O1xuICAgICAgfVxuICAgICAgdGhpcy5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCAgICAgPSBwYXJzZUludCgkKHRoaXMub3B0aW9ucy5vcmlnaW5hbF9hbW91bnRfc2VsZWN0b3IsIHRoaXMuZWxlbWVudCkudmFsKCksIDEwKTtcbiAgICAgIHRoaXMub3B0aW9ucy5wcm9jZXNzaW5nX2ZlZSAgICAgID0gKE1hdGgucm91bmQocGFyc2VGbG9hdCh0aGlzLm9wdGlvbnMuZmVlX2Ftb3VudCkqTWF0aC5wb3coMTAsMikpL01hdGgucG93KDEwLDIpKS50b0ZpeGVkKDIpO1xuICAgICAgdGhpcy5vcHRpb25zLnByb2Nlc3NpbmdfZmVlX3RleHQgPSB0aGlzLm9wdGlvbnMucHJvY2Vzc2luZ19mZWU7XG4gICAgICB0aGlzLm9wdGlvbnMuY3JlYXRlX2FjY291bnQgICAgICA9IGZhbHNlO1xuXG4gICAgICB2YXIgYnV0dG9uX3RleHQgPSAkKHRoaXMub3B0aW9ucy5wYXlfYnV0dG9uX3NlbGVjdG9yKS50ZXh0KCk7XG4gICAgICB0aGlzLm9wdGlvbnMuYnV0dG9uX3RleHQgPSBidXR0b25fdGV4dDtcblxuICAgICAgdGhpcy5zdHJpcGUgPSBTdHJpcGUodGhpcy5vcHRpb25zLnN0cmlwZV9wdWJsaXNoYWJsZV9rZXkpO1xuICAgICAgdGhpcy5lbGVtZW50cyA9IHRoaXMuc3RyaXBlLmVsZW1lbnRzKHtcbiAgICAgICAgZm9udHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICAvLyBpbnRlZ3JhdGUgeW91ciBmb250IGludG8gc3RyaXBlXG4gICAgICAgICAgICBjc3NTcmM6ICdodHRwczovL3VzZS50eXBla2l0Lm5ldC9jeGo3ZnpnLmNzcycsXG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9KTtcblxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5kZWJ1ZyA9PT0gdHJ1ZSkge1xuICAgICAgICB0aGlzLmRlYnVnKHRoaXMub3B0aW9ucyk7XG4gICAgICAgIC8vIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gY2FsbCBmdW5jdGlvbnNcbiAgICAgIHRoaXMuYW5hbHl0aWNzVHJhY2tpbmcodGhpcy5vcHRpb25zKTsgLy8gdHJhY2sgYW5hbHl0aWNzIGV2ZW50c1xuICAgICAgdGhpcy5hbW91bnRBc1JhZGlvKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gaWYgdGhlIGFtb3VudCBmaWVsZCBpcyBhIHJhZGlvIGJ1dHRvblxuICAgICAgdGhpcy5hbW91bnRVcGRhdGVkKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gaWYgdGhlIGFtb3VudCB0ZXh0IGZpZWxkIGNhbiBjaGFuZ2VcblxuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLnBheV9jY19wcm9jZXNzaW5nX3NlbGVjdG9yKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuY3JlZGl0Q2FyZFByb2Nlc3NpbmdGZWVzKHRoaXMub3B0aW9ucyk7IC8vIHByb2Nlc3NpbmcgZmVlc1xuICAgICAgfVxuICAgICAgXG4gICAgICAvLyB0aGUgbWFpbiBmb3JtIElELiB0aGlzIGlzIG5vdCB1c2VkIGZvciBjYW5jZWxsaW5nXG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5kb25hdGVBbm9ueW1vdXNseSh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIGFub255bW91c1xuICAgICAgICB0aGlzLmhvbm9yT3JNZW1vcnlUb2dnbGUodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBpbiBob25vciBvciBpbiBtZW1vcnkgb2Ygc29tZW9uZVxuICAgICAgICB0aGlzLm91dHNpZGVVbml0ZWRTdGF0ZXModGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBvdXRzaWRlIFVTXG4gICAgICAgIHRoaXMuc2hpcHBpbmdBZGRyZXNzKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gc2hpcHBpbmcgYWRkcmVzc1xuICAgICAgICB0aGlzLmFsbG93TWlubnBvc3RBY2NvdW50KHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gb3B0aW9uIGZvciBjcmVhdGluZyBtaW5ucG9zdCBhY2NvdW50XG4gICAgICAgIHRoaXMucGF5bWVudFJlcXVlc3RCdXR0b24odGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBjcmVhdGUgcGF5bWVudHJlcXVlc3QgYnV0dG9uXG4gICAgICAgIHRoaXMuY2hvb3NlUGF5bWVudE1ldGhvZCh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIHN3aXRjaCBiZXR3ZWVuIGNhcmQgYW5kIGFjaFxuICAgICAgICB0aGlzLmNyZWRpdENhcmRGaWVsZHModGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBkbyBzdHVmZiB3aXRoIHRoZSBjcmVkaXQgY2FyZCBmaWVsZHNcbiAgICAgICAgdGhpcy52YWxpZGF0ZVNldHVwKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gc2V0dXAgaG93IHZhbGlkYXRpb24gZXJyb3JzIHdvcmtcbiAgICAgICAgdGhpcy5mb3JtU2V0dXAodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyB2YWxpZGF0ZSBhbmQgc3VibWl0IHRoZSBmb3JtXG4gICAgICB9XG5cbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5jb25maXJtX2Zvcm1fc2VsZWN0b3IpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5zaG93TmV3c2xldHRlclNldHRpbmdzKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTtcbiAgICAgICAgdGhpcy5jb25maXJtTWVzc2FnZVN1Ym1pdCh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIHN1Ym1pdCB0aGUgc3R1ZmYgb24gdGhlIGNvbmZpcm1hdGlvbiBwYWdlXG4gICAgICB9XG5cbiAgICB9LCAvLyBpbml0XG5cbiAgICBkZWJ1ZzogZnVuY3Rpb24obWVzc2FnZSkge1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5kZWJ1ZyA9PT0gdHJ1ZSkge1xuICAgICAgICBpZiAodHlwZW9mIG1lc3NhZ2UgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgY29uc29sZS5sb2cobWVzc2FnZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5kaXIobWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5kaXIodGhpcyk7XG4gICAgICB9XG4gICAgfSwgLy8gZGVidWdcblxuICAgIGFuYWx5dGljc1RyYWNraW5nOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICB0aGlzLmRlYnVnKCdhbmFseXRpY3MgdHlwZSBpcyAnICsgb3B0aW9ucy5hbmFseXRpY3NfdHlwZSk7XG4gICAgICB2YXIgcHJvZ3Jlc3MgPSAkKG9wdGlvbnMucHJvZ3Jlc3Nfc2VsZWN0b3IpO1xuICAgICAgdmFyIHN0ZXA7XG4gICAgICB2YXIgYWN0aW9uID0gJ2NoZWNrb3V0JztcbiAgICAgIHZhciBuYXZfaXRlbV9jb3VudCA9IDA7XG4gICAgICB2YXIgb3BwX2lkID0gJChvcHRpb25zLm9wcF9pZF9zZWxlY3RvcikudmFsKCk7XG4gICAgICB2YXIgcG9zdF9wdXJjaGFzZSA9IGZhbHNlO1xuICAgICAgaWYgKG9wdGlvbnMuYW5hbHl0aWNzX3R5cGUgPT0gJ2FuYWx5dGljc2pzJykge1xuICAgICAgICBnYSggJ3JlcXVpcmUnLCAnZWMnICk7XG4gICAgICB9XG4gICAgICBpZiAocHJvZ3Jlc3MubGVuZ3RoID4gMCkge1xuICAgICAgICBuYXZfaXRlbV9jb3VudCA9ICQoJ2xpJywgcHJvZ3Jlc3MpLmxlbmd0aDsgLy8gbGVuZ3RoIGlzIG5vdCB6ZXJvIGJhc2VkXG4gICAgICAgIHN0ZXAgPSAkKCdsaSAuYWN0aXZlJywgcHJvZ3Jlc3MpLnBhcmVudCgpLmluZGV4KCkgKyAxOyAvLyBpbmRleCBpcyB6ZXJvIGJhc2VkXG4gICAgICB9XG4gICAgICAvLyB0aGVyZSBpcyBhIHByb2dyZXNzIG1lbnUsIEFORCB0aGVyZSBJUyBOT1QgYSBjb25maXJtIGZvcm0gc2VsZWN0b3JcbiAgICAgIC8vIGlmIHRoYXQgaXMgdGhlIGNhc2UsIHdlJ3JlIG5vdCBvbiB0aGUgcHVyY2hhc2Ugc3RlcFxuICAgICAgaWYgKHByb2dyZXNzLmxlbmd0aCA+IDAgJiYgJChvcHRpb25zLmNvbmZpcm1fZm9ybV9zZWxlY3RvcikubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIC8vIHRoZSBhY3RpdmUgdGFiIG1hdGNoZXMgdGhlIGNvdW50IG9mIGl0ZW1zIEFORCB0aGVyZSBpcyBOT1QgYSBjb25maXJtIGZvcm0gdG8gYmUgc3VibWl0dGVkXG4gICAgICAgIC8vIHRoYXQgbWVhbnMgd2UncmUgb24gYSBwb3N0IHB1cmNoYXNlIHN0ZXAuXG4gICAgICAgIGlmIChzdGVwID09PSBuYXZfaXRlbV9jb3VudCAmJiAkKG9wdGlvbnMuY29uZmlybV9mb3JtX3NlbGVjdG9yKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBzdGVwID0gc3RlcCArIDE7XG4gICAgICAgICAgcG9zdF9wdXJjaGFzZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAocHJvZ3Jlc3MubGVuZ3RoID4gMCAmJiAkKG9wdGlvbnMuY29uZmlybV9mb3JtX3NlbGVjdG9yKS5sZW5ndGggPiAwIHx8ICQob3B0aW9ucy5maW5pc2hfc2VjdGlvbl9zZWxlY3RvcikubGVuZ3RoID4gMCkge1xuICAgICAgICAvLyB3ZSBhcmUgb24gdGhlIGNvbmZpcm0gZm9ybSBzZWxlY3RvciBhbmQgdGhlcmUgaXMgYSBwcm9ncmVzcyBtZWFzdXJlXG4gICAgICAgIC8vIE9SLCB3ZSBhcmUgb24gdGhlIGZpbmlzaCBzZWxlY3RvciBhbmQgdGhlcmUgaXMgTk9UIGEgcHJvZ3Jlc3MgbWVhc3VyZVxuICAgICAgICAvLyB0aGVzZSBtZWFuIHRoZSB1c2VyIGp1c3QgcHVyY2hhc2VkLlxuICAgICAgICBhY3Rpb24gPSAncHVyY2hhc2UnO1xuICAgICAgfSBlbHNlIGlmIChwcm9ncmVzcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5kZWJ1ZyggJ3N0ZXAgaXMgJyArIHN0ZXAgKyAnIGFuZCBuYXYgaXRlbSBjb3VudCBpcyAnICsgbmF2X2l0ZW1fY291bnQgKyAnIGFuZCBvcHAgaWQgaXMgJyArIG9wcF9pZCArICcgYW5kIHBvc3QgcHVyY2hhc2UgaXMgJyArIHBvc3RfcHVyY2hhc2UgKTtcbiAgICAgIHRoaXMuYW5hbHl0aWNzVHJhY2tpbmdTdGVwKHN0ZXAsIGFjdGlvbiwgcG9zdF9wdXJjaGFzZSk7XG4gICAgfSwgLy8gYW5hbHl0aWNzVHJhY2tpbmdcblxuICAgIGFuYWx5dGljc1RyYWNraW5nU3RlcDogZnVuY3Rpb24oc3RlcCwgYWN0aW9uLCBwb3N0X3B1cmNoYXNlKSB7XG4gICAgICB2YXIgcHJvZ3Jlc3MgPSAkKHRoaXMub3B0aW9ucy5wcm9ncmVzc19zZWxlY3Rvcik7XG4gICAgICB2YXIgYW1vdW50ID0gJCh0aGlzLm9wdGlvbnMub3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yKS52YWwoKTtcbiAgICAgIHZhciBvcHBfaWQgPSAkKHRoaXMub3B0aW9ucy5vcHBfaWRfc2VsZWN0b3IpLnZhbCgpO1xuICAgICAgdmFyIGluc3RhbGxtZW50X3BlcmlvZCA9ICdvbmUtdGltZSc7XG4gICAgICB2YXIgbGV2ZWw7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuaW5zdGFsbG1lbnRfcGVyaW9kX3NlbGVjdG9yKS5sZW5ndGggPiAwICkge1xuICAgICAgICBpbnN0YWxsbWVudF9wZXJpb2QgPSAkKHRoaXMub3B0aW9ucy5pbnN0YWxsbWVudF9wZXJpb2Rfc2VsZWN0b3IpLnZhbCgpO1xuICAgICAgfVxuICAgICAgLy8gaWYgd2UncmUgbm90IGFmdGVyIHRoZSBwdXJjaGFzZSwgdXNlIGFkZFByb2R1Y3RcbiAgICAgIC8vaWYgKHByb2dyZXNzLmxlbmd0aCA+IDAgJiYgcG9zdF9wdXJjaGFzZSAhPT0gdHJ1ZSkge1xuICAgICAgaWYgKHByb2dyZXNzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgYW1vdW50OiBhbW91bnQsXG4gICAgICAgICAgaW5zdGFsbG1lbnRfcGVyaW9kOiBpbnN0YWxsbWVudF9wZXJpb2RcbiAgICAgICAgfTtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICB1cmw6ICcvY2FsY3VsYXRlLW1lbWJlci1sZXZlbC8nLFxuICAgICAgICAgIGRhdGE6IGRhdGFcbiAgICAgICAgfSkuZG9uZShmdW5jdGlvbiggZGF0YSApIHtcbiAgICAgICAgICBpZiAoJChkYXRhLmxldmVsKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsZXZlbCA9IGRhdGEubGV2ZWwubGV2ZWw7XG4gICAgICAgICAgICB0aGF0LmRlYnVnKCdjcmVhdGUgcHJvZHVjdCBvYmplY3Q6IGlkIGlzICcgKyAnbWlubnBvc3RfJyArIGxldmVsLnRvTG93ZXJDYXNlKCkgKyAnX21lbWJlcnNoaXAnICsgJyBhbmQgbmFtZSBpcyAnICsgJ01pbm5Qb3N0ICcgKyBsZXZlbC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGxldmVsLnNsaWNlKDEpICsgJyBNZW1iZXJzaGlwJyArICcgYW5kIHZhcmlhbnQgaXMgJyArIGluc3RhbGxtZW50X3BlcmlvZC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGluc3RhbGxtZW50X3BlcmlvZC5zbGljZSgxKSk7XG4gICAgICAgICAgICB2YXIgcHJvZHVjdCA9IHtcbiAgICAgICAgICAgICAgJ2lkJzogJ21pbm5wb3N0XycgKyBsZXZlbC50b0xvd2VyQ2FzZSgpICsgJ19tZW1iZXJzaGlwJyxcbiAgICAgICAgICAgICAgJ25hbWUnOiAnTWlublBvc3QgJyArIGxldmVsLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgbGV2ZWwuc2xpY2UoMSkgKyAnIE1lbWJlcnNoaXAnLFxuICAgICAgICAgICAgICAnY2F0ZWdvcnknOiAnRG9uYXRpb24nLFxuICAgICAgICAgICAgICAnYnJhbmQnOiAnTWlublBvc3QnLFxuICAgICAgICAgICAgICAndmFyaWFudCc6IGluc3RhbGxtZW50X3BlcmlvZC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGluc3RhbGxtZW50X3BlcmlvZC5zbGljZSgxKSxcbiAgICAgICAgICAgICAgJ3ByaWNlJzogdGhhdC5nZXRUb3RhbEFtb3VudChhbW91bnQpLFxuICAgICAgICAgICAgICAncXVhbnRpdHknOiAxXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKHRoYXQub3B0aW9ucy5hbmFseXRpY3NfdHlwZSA9PSAnZ3RhZ2pzJykge1xuICAgICAgICAgICAgICBndGFnKCdldmVudCcsICdjaGVja291dF9wcm9ncmVzcycsIHtcbiAgICAgICAgICAgICAgICBcInZhbHVlXCI6IHRoYXQuZ2V0VG90YWxBbW91bnQoYW1vdW50KSxcbiAgICAgICAgICAgICAgICBcIml0ZW1zXCI6IFtwcm9kdWN0XSxcbiAgICAgICAgICAgICAgICBcImNoZWNrb3V0X3N0ZXBcIjogc3RlcCxcbiAgICAgICAgICAgICAgICBcImNoZWNrb3V0X29wdGlvblwiOiBhY3Rpb24sXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGF0Lm9wdGlvbnMuYW5hbHl0aWNzX3R5cGUgPT0gJ2FuYWx5dGljc2pzJykge1xuICAgICAgICAgICAgICBnYSgnZWM6YWRkUHJvZHVjdCcsIHByb2R1Y3QpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoYWN0aW9uID09PSAncHVyY2hhc2UnKSB7XG4gICAgICAgICAgICAgIHRoYXQuZGVidWcoJ2FkZCBhIHB1cmNoYXNlIGFjdGlvbi4gc3RlcCBpcyAnICsgc3RlcCArICcgYW5kIGFjdGlvbiBpcyAnICsgYWN0aW9uKTtcbiAgICAgICAgICAgICAgaWYgKHRoYXQub3B0aW9ucy5hbmFseXRpY3NfdHlwZSA9PSAnZ3RhZ2pzJykge1xuICAgICAgICAgICAgICAgIGd0YWcoJ2V2ZW50JywgYWN0aW9uLCB7XG4gICAgICAgICAgICAgICAgICBcInRyYW5zYWN0aW9uX2lkXCI6IG9wcF9pZCwgLy8gVHJhbnNhY3Rpb24gaWQgLSBUeXBlOiBzdHJpbmdcbiAgICAgICAgICAgICAgICAgIFwiYWZmaWxpYXRpb25cIjogJ01pbm5Qb3N0JywgLy8gU3RvcmUgbmFtZSAtIFR5cGU6IHN0cmluZ1xuICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiB0aGF0LmdldFRvdGFsQW1vdW50KGFtb3VudCksIC8vIFRvdGFsIFJldmVudWUgLSBUeXBlOiBudW1lcmljXG4gICAgICAgICAgICAgICAgICBcImN1cnJlbmN5XCI6IFwiVVNEXCIsXG4gICAgICAgICAgICAgICAgICBcIml0ZW1zXCI6IFtwcm9kdWN0XSxcbiAgICAgICAgICAgICAgICAgIFwiY2hlY2tvdXRfc3RlcFwiOiBzdGVwXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhhdC5vcHRpb25zLmFuYWx5dGljc190eXBlID09ICdhbmFseXRpY3NqcycpIHtcbiAgICAgICAgICAgICAgICBnYSgnZWM6c2V0QWN0aW9uJywgYWN0aW9uLCB7XG4gICAgICAgICAgICAgICAgICAnaWQnOiBvcHBfaWQsIC8vIFRyYW5zYWN0aW9uIGlkIC0gVHlwZTogc3RyaW5nXG4gICAgICAgICAgICAgICAgICAnYWZmaWxpYXRpb24nOiAnTWlublBvc3QnLCAvLyBTdG9yZSBuYW1lIC0gVHlwZTogc3RyaW5nXG4gICAgICAgICAgICAgICAgICAncmV2ZW51ZSc6IGFtb3VudCwgLy8gVG90YWwgUmV2ZW51ZSAtIFR5cGU6IG51bWVyaWNcbiAgICAgICAgICAgICAgICAgICdzdGVwJzogc3RlcFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgIFxuICAgICAgICAgICAgaWYgKHRoYXQub3B0aW9ucy5hbmFseXRpY3NfdHlwZSA9PSAnZ3RhZ2pzJykge1xuICAgICAgICAgICAgICBndGFnKCdldmVudCcsICdwYWdlX3ZpZXcnLCB7XG4gICAgICAgICAgICAgICAgcGFnZV90aXRsZTogZG9jdW1lbnQudGl0bGUsXG4gICAgICAgICAgICAgICAgcGFnZV9wYXRoOiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWVcbiAgICAgICAgICAgICAgfSkgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGF0Lm9wdGlvbnMuYW5hbHl0aWNzX3R5cGUgPT0gJ2FuYWx5dGljc2pzJykge1xuICAgICAgICAgICAgICBnYSgnc2V0Jywge1xuICAgICAgICAgICAgICAgIHBhZ2U6IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSxcbiAgICAgICAgICAgICAgICB0aXRsZTogZG9jdW1lbnQudGl0bGVcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIGdhKCdzZW5kJywgJ3BhZ2V2aWV3Jywgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIFxuXG4gICAgfSwgLy8gYW5hbHl0aWNzVHJhY2tpbmdTdGVwXG5cbiAgICBhbW91bnRBc1JhZGlvOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICAvLyB3aGVuIGFtb3VudCBmaWVsZCBpcyBhIHJhZGlvIGJ1dHRvbiwgd2UgbmVlZCB0byBjaGVjayBpdCB3aGVuZXZlciBpdCBjaGFuZ2VzXG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB0aGF0LnNldFJhZGlvQW1vdW50KCQob3B0aW9ucy5vcmlnaW5hbF9hbW91bnRfc2VsZWN0b3IsIGVsZW1lbnQpLCBlbGVtZW50LCBvcHRpb25zKTtcbiAgICAgICQob3B0aW9ucy5vcmlnaW5hbF9hbW91bnRfc2VsZWN0b3IsIGVsZW1lbnQpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgdGhhdC5zZXRSYWRpb0Ftb3VudCgkKHRoaXMpLCBlbGVtZW50LCBvcHRpb25zKTtcbiAgICAgIH0pO1xuICAgIH0sIC8vIGFtb3VudEFzUmFkaW9cblxuICAgIHNldFJhZGlvQW1vdW50OiBmdW5jdGlvbihmaWVsZCwgZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdmFyIHN0cmlwZV9wYXltZW50X3R5cGUgPSB0aGF0LmdldFN0cmlwZVBheW1lbnRUeXBlKCk7XG4gICAgICB2YXIgYW1vdW50ID0gJChvcHRpb25zLm9yaWdpbmFsX2Ftb3VudF9zZWxlY3RvciArICc6Y2hlY2tlZCcsIGVsZW1lbnQpLnZhbCgpO1xuICAgICAgaWYgKGZpZWxkLmlzKCc6cmFkaW8nKSAmJiB0eXBlb2YgYW1vdW50ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBvcHRpb25zLm9yaWdpbmFsX2Ftb3VudCA9IHBhcnNlSW50KGFtb3VudCwgMTApO1xuICAgICAgICB0aGF0LmNhbGN1bGF0ZUZlZXModGhhdC5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCwgc3RyaXBlX3BheW1lbnRfdHlwZSk7XG4gICAgICAgIHRoYXQuc2V0RmFpck1hcmtldFZhbHVlKGZpZWxkKTtcbiAgICAgIH1cbiAgICB9LCAvLyBzZXRSYWRpb0Ftb3VudFxuXG4gICAgYW1vdW50VXBkYXRlZDogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgLy8gd2hlbiBuZXcgYW1vdW50IHRleHQgZmllbGQgY2FuIGNoYW5nZSwgd2UgbmVlZCB0byBjaGFuZ2UgdGhlIGhpZGRlbiBmaWVsZFxuICAgICAgLy8gdGhlcmUgaXMgYWxzbyBwb3RlbnRpYWxseSBhbiBhZGRpdGlvbmFsIGFtb3VudCBmaWVsZCB2YWx1ZSB0byBhZGRcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHZhciBzdHJpcGVfcGF5bWVudF90eXBlID0gdGhhdC5nZXRTdHJpcGVQYXltZW50VHlwZSgpO1xuXG4gICAgICAvLyBzZXQgdGhlIGZhaXIgbWFya2V0IHZhbHVlIGlmIGFwcGxpY2FibGVcbiAgICAgIHZhciBhbW91bnRfc2VsZWN0b3JfZmFpcl9tYXJrZXQgPSAkKG9wdGlvbnMub3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yLCBlbGVtZW50KTtcbiAgICAgIGlmIChhbW91bnRfc2VsZWN0b3JfZmFpcl9tYXJrZXQuaXMoJzpyYWRpbycpKSB7XG4gICAgICAgIGFtb3VudF9zZWxlY3Rvcl9mYWlyX21hcmtldCA9ICQob3B0aW9ucy5vcmlnaW5hbF9hbW91bnRfc2VsZWN0b3IgKyAnOmNoZWNrZWQnLCBlbGVtZW50KTtcbiAgICAgIH1cbiAgICAgIHRoYXQuc2V0RmFpck1hcmtldFZhbHVlKGFtb3VudF9zZWxlY3Rvcl9mYWlyX21hcmtldCk7XG5cbiAgICAgICQob3B0aW9ucy5vcmlnaW5hbF9hbW91bnRfc2VsZWN0b3IsIGVsZW1lbnQpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgdGhhdC5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCA9IHBhcnNlSW50KCQodGhpcywgZWxlbWVudCkudmFsKCksIDEwKTtcbiAgICAgICAgdGhhdC5jYWxjdWxhdGVGZWVzKHRoYXQub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQsIHN0cmlwZV9wYXltZW50X3R5cGUpO1xuICAgICAgICB0aGF0LnNldEZhaXJNYXJrZXRWYWx1ZSgkKHRoaXMsIGVsZW1lbnQpKTtcbiAgICAgIH0pO1xuICAgICAgJChvcHRpb25zLmFkZGl0aW9uYWxfYW1vdW50X2ZpZWxkLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoYXQub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQgPSBwYXJzZUludCgkKG9wdGlvbnMub3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSwgMTApO1xuICAgICAgICB0aGF0LmNhbGN1bGF0ZUZlZXModGhhdC5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCwgc3RyaXBlX3BheW1lbnRfdHlwZSk7XG4gICAgICB9KTtcblxuICAgIH0sIC8vIGFtb3VudFVwZGF0ZWRcblxuICAgIGdldFRvdGFsQW1vdW50OiBmdW5jdGlvbihhbW91bnQpIHtcbiAgICAgIGFtb3VudCA9ICh0eXBlb2YgYW1vdW50ICE9PSAndW5kZWZpbmVkJykgPyAgYW1vdW50IDogdGhpcy5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudDtcbiAgICAgIHZhciB0b3RhbF9hbW91bnQgPSBhbW91bnQ7XG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuYWRkaXRpb25hbF9hbW91bnRfZmllbGQpLmxlbmd0aCA+IDAgJiYgJCh0aGlzLm9wdGlvbnMuYWRkaXRpb25hbF9hbW91bnRfZmllbGQpLnZhbCgpID4gMCkge1xuICAgICAgICB2YXIgYWRkaXRpb25hbF9hbW91bnQgPSAkKHRoaXMub3B0aW9ucy5hZGRpdGlvbmFsX2Ftb3VudF9maWVsZCkudmFsKCk7XG4gICAgICAgIHRvdGFsX2Ftb3VudCA9IHBhcnNlSW50KGFkZGl0aW9uYWxfYW1vdW50LCAxMCkgKyBwYXJzZUludChhbW91bnQsIDEwKTsgXG4gICAgICB9XG4gICAgICByZXR1cm4gdG90YWxfYW1vdW50O1xuICAgIH0sIC8vIGdldFRvdGFsQW1vdW50XG5cbiAgICBzZXRGYWlyTWFya2V0VmFsdWU6IGZ1bmN0aW9uKGFtb3VudF9zZWxlY3Rvcikge1xuICAgICAgLy8gaWYgdGhlcmUgaXMgYSBmYWlyIG1hcmtldCB2YWx1ZSBmaWVsZCBhbmQgdGhlcmUgaXMgYSBmYWlyLW1hcmtldC12YWx1ZSBkYXRhIGF0dHJpYnV0ZVxuICAgICAgLy8gY2hlY2sgYW5kIHNlZSBpZiB3ZSBjYW4gcG9wdWxhdGUgdGhlIGZpZWxkIHdpdGggdGhlIGRhdGEgYXR0cmlidXRlXG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuZmFpcl9tYXJrZXRfdmFsdWVfc2VsZWN0b3IpLmxlbmd0aCA+IDAgJiYgdHlwZW9mIGFtb3VudF9zZWxlY3Rvci5kYXRhKCdmYWlyLW1hcmtldC12YWx1ZScpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB2YXIgZmFpck1hcmtldFZhbHVlID0gYW1vdW50X3NlbGVjdG9yLmRhdGEoJ2ZhaXItbWFya2V0LXZhbHVlJyk7XG4gICAgICAgICQodGhpcy5vcHRpb25zLmZhaXJfbWFya2V0X3ZhbHVlX3NlbGVjdG9yKS52YWwoZmFpck1hcmtldFZhbHVlKTtcbiAgICAgIH1cbiAgICB9LCAvLyBzZXRGYWlyTWFya2V0VmFsdWVcblxuICAgIGNhbGN1bGF0ZUZlZXM6IGZ1bmN0aW9uKGFtb3VudCwgc3RyaXBlX3BheW1lbnRfdHlwZSkge1xuICAgICAgLy8gdGhpcyBzZW5kcyB0aGUgYW1vdW50IGFuZCBzdHJpcGUgcGF5bWVudCB0eXBlIHRvIHB5dGhvbjsgZ2V0IHRoZSBmZWUgYW5kIGRpc3BsYXkgaXQgdG8gdGhlIHVzZXIgb24gdGhlIGNoZWNrYm94IGxhYmVsXG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB2YXIgdG90YWxfYW1vdW50ID0gdGhhdC5nZXRUb3RhbEFtb3VudChhbW91bnQpO1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIGFtb3VudDogdG90YWxfYW1vdW50LFxuICAgICAgICBzdHJpcGVfcGF5bWVudF90eXBlOiBzdHJpcGVfcGF5bWVudF90eXBlXG4gICAgICB9O1xuICAgICAgdGhhdC5zZXRTdHJpcGVQYXltZW50VHlwZShzdHJpcGVfcGF5bWVudF90eXBlKTtcbiAgICAgICQuYWpheCh7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICB1cmw6ICcvY2FsY3VsYXRlLWZlZXMvJyxcbiAgICAgICAgZGF0YTogZGF0YVxuICAgICAgfSkuZG9uZShmdW5jdGlvbiggZGF0YSApIHtcbiAgICAgICAgaWYgKCQoZGF0YS5mZWVzKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgJCh0aGF0Lm9wdGlvbnMuZmVlX2Ftb3VudCkudGV4dChwYXJzZUZsb2F0KGRhdGEuZmVlcykudG9GaXhlZCgyKSk7XG4gICAgICAgICAgdGhhdC5jcmVkaXRDYXJkRmVlQ2hlY2tib3goJCh0aGF0Lm9wdGlvbnMucGF5X2NjX3Byb2Nlc3Npbmdfc2VsZWN0b3IpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSwgLy8gY2FsY3VsYXRlRmVlc1xuXG4gICAgY3JlZGl0Q2FyZFByb2Nlc3NpbmdGZWVzOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAvLyB0aGlzIGFkZHMgb3Igc3VidHJhY3RzIHRoZSBmZWUgdG8gdGhlIG9yaWdpbmFsIGFtb3VudCB3aGVuIHRoZSB1c2VyIGluZGljYXRlcyB0aGV5IGRvIG9yIGRvIG5vdCB3YW50IHRvIHBheSB0aGUgZmVlc1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdGhhdC5jcmVkaXRDYXJkRmVlQ2hlY2tib3goJChvcHRpb25zLnBheV9jY19wcm9jZXNzaW5nX3NlbGVjdG9yKSk7XG4gICAgICAkKG9wdGlvbnMucGF5X2NjX3Byb2Nlc3Npbmdfc2VsZWN0b3IpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdGhhdC5jcmVkaXRDYXJkRmVlQ2hlY2tib3godGhpcyk7XG4gICAgICB9KTtcbiAgICB9LCAvLyBjcmVkaXRDYXJkUHJvY2Vzc2luZ0ZlZXNcblxuICAgIGdldFN0cmlwZVBheW1lbnRUeXBlOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBzdHJpcGVfcGF5bWVudF90eXBlID0gJ2NhcmQnO1xuICAgICAgaWYgKCQoJ2lucHV0W25hbWU9XCJzdHJpcGVfcGF5bWVudF90eXBlXCJdJykubGVuZ3RoID4gMCkge1xuICAgICAgICBzdHJpcGVfcGF5bWVudF90eXBlID0gJCgnaW5wdXRbbmFtZT1cInN0cmlwZV9wYXltZW50X3R5cGVcIl0nKS52YWwoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdHJpcGVfcGF5bWVudF90eXBlO1xuICAgIH0sIC8vIGdldFN0cmlwZVBheW1lbnRUeXBlXG5cbiAgICBzZXRTdHJpcGVQYXltZW50VHlwZTogZnVuY3Rpb24oc3RyaXBlX3BheW1lbnRfdHlwZSkge1xuICAgICAgaWYgKCQoJ2lucHV0W25hbWU9XCJzdHJpcGVfcGF5bWVudF90eXBlXCJdJykubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICQodGhpcy5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5hcHBlbmQoJzxpbnB1dCB0eXBlPVxcXCJoaWRkZW5cXFwiIG5hbWU9XFxcInN0cmlwZV9wYXltZW50X3R5cGVcXFwiPicpO1xuICAgICAgfVxuICAgICAgJCgnaW5wdXRbbmFtZT1cInN0cmlwZV9wYXltZW50X3R5cGVcIl0nKS52YWwoc3RyaXBlX3BheW1lbnRfdHlwZSk7XG4gICAgICByZXR1cm4gc3RyaXBlX3BheW1lbnRfdHlwZTtcbiAgICB9LCAvLyBzZXRTdHJpcGVQYXltZW50VHlwZVxuXG4gICAgY3JlZGl0Q2FyZEZlZUNoZWNrYm94OiBmdW5jdGlvbihmaWVsZCkge1xuICAgICAgdmFyIGZ1bGxfYW1vdW50O1xuICAgICAgdmFyIHRvdGFsX2Ftb3VudCA9IHRoaXMuZ2V0VG90YWxBbW91bnQoKTtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIGlmICgkKGZpZWxkKS5pcygnOmNoZWNrZWQnKSB8fCAkKGZpZWxkKS5wcm9wKCdjaGVja2VkJykpIHtcbiAgICAgICAgJCgnLmFtb3VudCAubGV2ZWwtYW1vdW50JykuYWRkQ2xhc3MoJ2Z1bGwtYW1vdW50Jyk7XG4gICAgICAgIGZ1bGxfYW1vdW50ID0gKHRvdGFsX2Ftb3VudCArIHBhcnNlRmxvYXQoJCh0aGF0Lm9wdGlvbnMuZmVlX2Ftb3VudCkudGV4dCgpKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmdWxsX2Ftb3VudCA9IHRvdGFsX2Ftb3VudDtcbiAgICAgIH1cbiAgICAgIGZ1bGxfYW1vdW50ID0gcGFyc2VGbG9hdChmdWxsX2Ftb3VudCkudG9GaXhlZCgyKTtcbiAgICAgICQodGhhdC5vcHRpb25zLmZ1bGxfYW1vdW50X3NlbGVjdG9yKS50ZXh0KGZ1bGxfYW1vdW50KTtcblxuICAgICAgLy8gdXBkYXRlIHRoZSBwYXltZW50IHJlcXVlc3RcbiAgICAgIGlmICh0aGlzLnBheW1lbnRSZXF1ZXN0ICYmIGZ1bGxfYW1vdW50KSB7XG4gICAgICAgIHRoaXMucGF5bWVudFJlcXVlc3QudXBkYXRlKHtcbiAgICAgICAgICB0b3RhbDoge1xuICAgICAgICAgICAgbGFiZWw6IFwiTWlublBvc3RcIixcbiAgICAgICAgICAgIGFtb3VudDogZnVsbF9hbW91bnQgKiAxMDBcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgfSwgLy8gY3JlZGl0Q2FyZEZlZUNoZWNrYm94XG5cbiAgICBkb25hdGVBbm9ueW1vdXNseTogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdGhhdC50b2dnbGVBbm9ueW1vdXMoJChvcHRpb25zLmFub255bW91c19zZWxlY3RvciwgZWxlbWVudCkpO1xuICAgICAgJChvcHRpb25zLmFub255bW91c19zZWxlY3RvciwgZWxlbWVudCkuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGF0LnRvZ2dsZUFub255bW91cygkKHRoaXMpKTtcbiAgICAgIH0pO1xuICAgIH0sIC8vIGRvbmF0ZUFub255bW91c2x5XG5cbiAgICB0b2dnbGVBbm9ueW1vdXM6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICAgIGlmIChlbGVtZW50LmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgICQodGhpcy5vcHRpb25zLm5hbWVfc2VsZWN0b3IgKyAnIGRpdjpmaXJzdCcsIHRoaXMuZWxlbWVudCkuaGlkZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJCh0aGlzLm9wdGlvbnMubmFtZV9zZWxlY3RvciArICcgZGl2OmZpcnN0JywgdGhpcy5lbGVtZW50KS5zaG93KCk7XG4gICAgICB9XG4gICAgfSwgLy8gdG9nZ2xlQW5vbnltb3VzXG5cbiAgICBob25vck9yTWVtb3J5OiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICBpZiAoJChvcHRpb25zLmhvbm9yX29yX21lbW9yeV9jaG9vc2VyICsgJzpjaGVja2VkJykudmFsKCkpIHtcbiAgICAgICAgJChvcHRpb25zLmhvbm9yX21lbW9yeV9pbnB1dF9ncm91cCwgZWxlbWVudCkuc2hvdygpO1xuICAgICAgICAkKG9wdGlvbnMuaG9ub3JfdHlwZV9zZWxlY3RvcikudGV4dCgkKG9wdGlvbnMuaG9ub3Jfb3JfbWVtb3J5X2Nob29zZXIgKyAnOmNoZWNrZWQnKS52YWwoKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkKG9wdGlvbnMuaG9ub3JfbWVtb3J5X2lucHV0X2dyb3VwLCBlbGVtZW50KS5oaWRlKCk7XG4gICAgICAgICQob3B0aW9ucy5ob25vcl9uYW1lX3NlbGVjdG9yICsgJyBpbnB1dCcsIGVsZW1lbnQpLnZhbCgnJyk7XG4gICAgICB9XG4gICAgfSwgLy8gaG9ub3JPck1lbW9yeVxuXG4gICAgaG9ub3JPck1lbW9yeVRvZ2dsZTogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdGhhdC5ob25vck9yTWVtb3J5KHRoYXQuZWxlbWVudCwgdGhhdC5vcHRpb25zKTtcbiAgICAgICQob3B0aW9ucy5ob25vcl9vcl9tZW1vcnlfY2hvb3NlciwgZWxlbWVudCkuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGF0Lmhvbm9yT3JNZW1vcnkodGhhdC5lbGVtZW50LCB0aGF0Lm9wdGlvbnMpO1xuICAgICAgfSk7XG4gICAgfSwgLy8gaG9ub3JPck1lbW9yeVRvZ2dsZVxuXG4gICAgb3V0c2lkZVVuaXRlZFN0YXRlczogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgJChvcHRpb25zLnNob3dfYmlsbGluZ19jb3VudHJ5X3NlbGVjdG9yKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgdGhhdC5jaGFuZ2VGaWVsZHNPdXRzaWRlVVMoJ2JpbGxpbmcnLCBlbGVtZW50LCBvcHRpb25zKTtcbiAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5oaWRlKCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuICAgICAgJChvcHRpb25zLnNob3dfc2hpcHBpbmdfY291bnRyeV9zZWxlY3RvcikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICQob3B0aW9ucy5zaGlwcGluZ19jb3VudHJ5X3NlbGVjdG9yKS5zaG93KCk7XG4gICAgICAgIHRoYXQuY2hhbmdlRmllbGRzT3V0c2lkZVVTKCdzaGlwcGluZycsIGVsZW1lbnQsIG9wdGlvbnMpO1xuICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmhpZGUoKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSk7XG4gICAgfSwgLy8gb3V0c2lkZVVuaXRlZFN0YXRlc1xuXG4gICAgY2hhbmdlRmllbGRzT3V0c2lkZVVTOiBmdW5jdGlvbihiaWxsaW5nX29yX3NoaXBwaW5nLCBlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICBpZiAoIGJpbGxpbmdfb3Jfc2hpcHBpbmcgPT09ICdiaWxsaW5nJyApIHtcbiAgICAgICAgdmFyIHppcF9wYXJlbnQgPSAkKG9wdGlvbnMuYmlsbGluZ196aXBfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpO1xuICAgICAgICB2YXIgc3RhdGVfcGFyZW50ID0gJChvcHRpb25zLmJpbGxpbmdfc3RhdGVfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpO1xuICAgICAgICAkKG9wdGlvbnMuYmlsbGluZ19jb3VudHJ5X3NlbGVjdG9yKS5zaG93KCk7XG4gICAgICAgICQob3B0aW9ucy5iaWxsaW5nX3ppcF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkuYXR0cigndHlwZScsICd0ZXh0Jyk7XG4gICAgICAgICQob3B0aW9ucy5iaWxsaW5nX3ppcF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICAgICQob3B0aW9ucy5iaWxsaW5nX3N0YXRlX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgICAgJCgnbGFiZWwnLCB6aXBfcGFyZW50KS50ZXh0KCdQb3N0YWwgQ29kZTonKTtcbiAgICAgICAgJCgnbGFiZWwnLCBzdGF0ZV9wYXJlbnQpLnRleHQoJ1JlZ2lvbjonKTtcbiAgICAgIH0gZWxzZSBpZiAoIGJpbGxpbmdfb3Jfc2hpcHBpbmcgPT09ICdzaGlwcGluZycgKSB7XG4gICAgICAgIHZhciB6aXBfcGFyZW50ID0gJChvcHRpb25zLnNoaXBwaW5nX3ppcF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkucGFyZW50KCk7XG4gICAgICAgIHZhciBzdGF0ZV9wYXJlbnQgPSAkKG9wdGlvbnMuc2hpcHBpbmdfc3RhdGVfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpO1xuICAgICAgICAkKG9wdGlvbnMuc2hpcHBpbmdfY291bnRyeV9zZWxlY3Rvcikuc2hvdygpO1xuICAgICAgICAkKG9wdGlvbnMuc2hpcHBpbmdfemlwX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5hdHRyKCd0eXBlJywgJ3RleHQnKTtcbiAgICAgICAgJChvcHRpb25zLnNoaXBwaW5nX3ppcF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICAgICQob3B0aW9ucy5zaGlwcGluZ19zdGF0ZV9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICAgICQoJ2xhYmVsJywgemlwX3BhcmVudCkudGV4dCgnU2hpcHBpbmcgUG9zdGFsIENvZGU6Jyk7XG4gICAgICAgICQoJ2xhYmVsJywgc3RhdGVfcGFyZW50KS50ZXh0KCdTaGlwcGluZyBSZWdpb246Jyk7XG4gICAgICB9XG4gICAgfSwgLy8gY2hhbmdlRmllbGRzT3V0c2lkZVVTXG5cbiAgICBjaGFuZ2VGaWVsZHNJbnNpZGVVUzogZnVuY3Rpb24oYmlsbGluZ19vcl9zaGlwcGluZywgZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgaWYgKCBiaWxsaW5nX29yX3NoaXBwaW5nID09PSAnYmlsbGluZycgKSB7XG4gICAgICAgIHZhciB6aXBfcGFyZW50ID0gJChvcHRpb25zLmJpbGxpbmdfemlwX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKTtcbiAgICAgICAgdmFyIHN0YXRlX3BhcmVudCA9ICQob3B0aW9ucy5iaWxsaW5nX3N0YXRlX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKTtcbiAgICAgICAgJChvcHRpb25zLmJpbGxpbmdfY291bnRyeV9zZWxlY3Rvcikuc2hvdygpO1xuICAgICAgICAkKG9wdGlvbnMuYmlsbGluZ196aXBfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLmF0dHIoJ3R5cGUnLCAndGVsJyk7XG4gICAgICAgICQob3B0aW9ucy5iaWxsaW5nX3ppcF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkucHJvcCgncmVxdWlyZWQnLCB0cnVlKTtcbiAgICAgICAgJChvcHRpb25zLmJpbGxpbmdfc3RhdGVfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnByb3AoJ3JlcXVpcmVkJywgdHJ1ZSk7XG4gICAgICAgICQoJ2xhYmVsJywgemlwX3BhcmVudCkuaHRtbCgnWmlwIENvZGU6IDxzcGFuIGNsYXNzPVwiYS1mb3JtLWl0ZW0tcmVxdWlyZWRcIiB0aXRsZT1cIlRoaXMgZmllbGQgaXMgcmVxdWlyZWQuXCI+Kjwvc3Bhbj4nKTtcbiAgICAgICAgJCgnbGFiZWwnLCBzdGF0ZV9wYXJlbnQpLmh0bWwoJ1N0YXRlOiA8c3BhbiBjbGFzcz1cImEtZm9ybS1pdGVtLXJlcXVpcmVkXCIgdGl0bGU9XCJUaGlzIGZpZWxkIGlzIHJlcXVpcmVkLlwiPio8L3NwYW4+Jyk7XG4gICAgICB9IGVsc2UgaWYgKCBiaWxsaW5nX29yX3NoaXBwaW5nID09PSAnc2hpcHBpbmcnICkge1xuICAgICAgICB2YXIgemlwX3BhcmVudCA9ICQob3B0aW9ucy5zaGlwcGluZ196aXBfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpO1xuICAgICAgICB2YXIgc3RhdGVfcGFyZW50ID0gJChvcHRpb25zLnNoaXBwaW5nX3N0YXRlX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKTtcbiAgICAgICAgJChvcHRpb25zLnNoaXBwaW5nX2NvdW50cnlfc2VsZWN0b3IpLnNob3coKTtcbiAgICAgICAgJChvcHRpb25zLnNoaXBwaW5nX3ppcF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkuYXR0cigndHlwZScsICd0ZWwnKTtcbiAgICAgICAgJChvcHRpb25zLnNoaXBwaW5nX3ppcF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkucHJvcCgncmVxdWlyZWQnLCB0cnVlKTtcbiAgICAgICAgJChvcHRpb25zLnNoaXBwaW5nX3N0YXRlX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5wcm9wKCdyZXF1aXJlZCcsIHRydWUpO1xuICAgICAgICAkKCdsYWJlbCcsIHppcF9wYXJlbnQpLmh0bWwoJ1NoaXBwaW5nIFppcCBDb2RlOiA8c3BhbiBjbGFzcz1cImEtZm9ybS1pdGVtLXJlcXVpcmVkXCIgdGl0bGU9XCJUaGlzIGZpZWxkIGlzIHJlcXVpcmVkLlwiPio8L3NwYW4+Jyk7XG4gICAgICAgICQoJ2xhYmVsJywgc3RhdGVfcGFyZW50KS5odG1sKCdTaGlwcGluZyBTdGF0ZTogPHNwYW4gY2xhc3M9XCJhLWZvcm0taXRlbS1yZXF1aXJlZFwiIHRpdGxlPVwiVGhpcyBmaWVsZCBpcyByZXF1aXJlZC5cIj4qPC9zcGFuPicpO1xuICAgICAgfVxuICAgIH0sIC8vIGNoYW5nZUZpZWxkc091dHNpZGVVU1xuXG4gICAgc2hpcHBpbmdBZGRyZXNzOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB2YXIgc2hvd19zaGlwcGluZyA9IGZhbHNlO1xuICAgICAgaWYgKCQob3B0aW9ucy51c2VfZm9yX3NoaXBwaW5nX3NlbGVjdG9yKS5sZW5ndGggPiAwKSB7IC8vIHdlIGhhdmUgYSBzaGlwcGluZyBjaGVja2JveFxuICAgICAgICBzaG93X3NoaXBwaW5nID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmIChzaG93X3NoaXBwaW5nID09PSB0cnVlICkge1xuICAgICAgICAkKG9wdGlvbnMudXNlX2Zvcl9zaGlwcGluZ19zZWxlY3RvciwgZWxlbWVudCkucGFyZW50KCkuc2hvdygpO1xuICAgICAgICBpZiAoJChvcHRpb25zLnVzZV9mb3Jfc2hpcHBpbmdfc2VsZWN0b3IsIGVsZW1lbnQpLmlzKCc6Y2hlY2tlZCcpKSB7IC8vIHVzZSBzYW1lIGFzIGJpbGxpbmdcbiAgICAgICAgICAkKG9wdGlvbnMuc2hpcHBpbmdfc2VsZWN0b3IpLmhpZGUoKTtcbiAgICAgICAgfSBlbHNlIHsgLy8gc2VwYXJhdGUgc2hpcHBpbmcgYW5kIGJpbGxpbmdcbiAgICAgICAgICAkKG9wdGlvbnMuc2hpcHBpbmdfc2VsZWN0b3IpLnNob3coKTtcbiAgICAgICAgfVxuICAgICAgICAkKG9wdGlvbnMudXNlX2Zvcl9zaGlwcGluZ19zZWxlY3RvciwgZWxlbWVudCkuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHRoYXQuc2hpcHBpbmdBZGRyZXNzKGVsZW1lbnQsIG9wdGlvbnMpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIFxuICAgIH0sIC8vIHNoaXBwaW5nQWRkcmVzc1xuXG4gICAgYWxsb3dNaW5ucG9zdEFjY291bnQ6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHZhciBhY2NvdW50X2V4aXN0cyA9IGZhbHNlO1xuXG4gICAgICAvLyBzaG93IHBhc3N3b3JkIGFzIHRleHRcbiAgICAgIHRoYXQuc2hvd1Bhc3N3b3JkKCk7XG5cbiAgICAgIC8vIGNhbGN1bGF0ZSBwYXNzd29yZCBzdHJlbmd0aFxuICAgICAgdGhhdC5zaG93UGFzc3dvcmRTdHJlbmd0aCgpO1xuICAgICAgXG4gICAgICB0aGF0LnNwYW1FbWFpbCgkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpKTtcbiAgICAgICQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGF0LnNwYW1FbWFpbCgkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGF0LnRvZ2dsZUFjY291bnRGaWVsZHMoJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkpO1xuICAgICAgJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGF0LnRvZ2dsZUFjY291bnRGaWVsZHMoJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkpO1xuICAgICAgfSk7XG5cbiAgICAgIGZ1bmN0aW9uIGRvbmVUeXBpbmcgKCkge1xuICAgICAgICB2YXIgZW1haWwgPSAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpO1xuICAgICAgICBhY2NvdW50X2V4aXN0cyA9IHRoYXQuY2hlY2tNaW5ucG9zdEFjY291bnQoZWxlbWVudCwgb3B0aW9ucywgZW1haWwpO1xuICAgICAgfVxuXG4gICAgICAvL3NldHVwIGJlZm9yZSBmdW5jdGlvbnNcbiAgICAgIHZhciB0eXBpbmdUaW1lcjsgICAgICAgICAgICAgICAgLy90aW1lciBpZGVudGlmaWVyXG4gICAgICB2YXIgZG9uZVR5cGluZ0ludGVydmFsID0gNTAwMDsgIC8vdGltZSBpbiBtcywgNSBzZWNvbmQgZm9yIGV4YW1wbGVcblxuICAgICAgLy9vbiBrZXl1cCwgc3RhcnQgdGhlIGNvdW50ZG93blxuICAgICAgJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5rZXl1cChmdW5jdGlvbigpe1xuICAgICAgICBjbGVhclRpbWVvdXQodHlwaW5nVGltZXIpO1xuICAgICAgICBpZiAoJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwpIHtcbiAgICAgICAgICB0eXBpbmdUaW1lciA9IHNldFRpbWVvdXQoZG9uZVR5cGluZywgZG9uZVR5cGluZ0ludGVydmFsKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSwgLy8gYWxsb3dNaW5ucG9zdEFjY291bnRcblxuICAgIHNwYW1FbWFpbDogZnVuY3Rpb24oZW1haWxfZmllbGQpIHtcbiAgICAgIHZhciBzcGFtRXJyb3JDb250YWluZXIgPSBlbWFpbF9maWVsZC5wYXJlbnQoKTtcbiAgICAgIGlmICgkKCcuYS1zcGFtLWVtYWlsJywgc3BhbUVycm9yQ29udGFpbmVyKS5sZW5ndGggPT09IDAgKSB7XG4gICAgICAgIHNwYW1FcnJvckNvbnRhaW5lci5hcHBlbmQoJzxwIGNsYXNzPVwiYS1mb3JtLWNhcHRpb24gYS12YWxpZGF0aW9uLWVycm9yIGEtc3BhbS1lbWFpbFwiPlRoaXMgZW1haWwgYWRkcmVzcyBoYXMgYmVlbiBkZXRlY3RlZCBhcyBhIHNwYW1tZXIuPC9wPicpO1xuICAgICAgfVxuICAgICAgJCgnLmEtc3BhbS1lbWFpbCcsIHNwYW1FcnJvckNvbnRhaW5lcikuaGlkZSgpO1xuICAgICAgc3BhbUVycm9yQ29udGFpbmVyLnJlbW92ZUNsYXNzKCdpbnZhbGlkIGEtZXJyb3InKTtcbiAgICB9LCAvLyBzcGFtRW1haWxcblxuICAgIHRvZ2dsZUFjY291bnRGaWVsZHM6IGZ1bmN0aW9uKGNyZWF0ZV9hY2NvdW50X3NlbGVjdG9yKSB7XG4gICAgICBpZiAoY3JlYXRlX2FjY291bnRfc2VsZWN0b3IuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgY3JlYXRlX2FjY291bnRfc2VsZWN0b3IucGFyZW50KCkuYmVmb3JlKCc8cCBjbGFzcz1cImEtZm9ybS1jYXB0aW9uIGEtYWNjb3VudC1leGlzdHMgYS1hY2NvdW50LWV4aXN0cy1zdWNjZXNzXCI+VGhlcmUgaXMgYWxyZWFkeSBhIE1pbm5Qb3N0LmNvbSBhY2NvdW50IHdpdGggdGhpcyBlbWFpbCBhZGRyZXNzLjwvcD4nKTtcbiAgICAgICAgJCgnLmEtYWNjb3VudC1leGlzdHMnKS5oaWRlKCk7XG4gICAgICAgICQodGhpcy5vcHRpb25zLnBhc3N3b3JkX3NlbGVjdG9yLCB0aGlzLmVsZW1lbnQpLnNob3coKTtcbiAgICAgICAgdGhpcy5vcHRpb25zLmNyZWF0ZV9hY2NvdW50ID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQodGhpcy5vcHRpb25zLnBhc3N3b3JkX3NlbGVjdG9yLCB0aGlzLmVsZW1lbnQpLmhpZGUoKTtcbiAgICAgIH1cbiAgICB9LCAvLyB0b2dnbGVBY2NvdW50RmllbGRzXG5cbiAgICBzaG93UGFzc3dvcmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgLy8gQ2FjaGUgb3VyIGpxdWVyeSBlbGVtZW50c1xuICAgICAgdmFyICRzdWJtaXQgPSAkKCcuYnRuLXN1Ym1pdCcpO1xuICAgICAgdmFyICRjb250YWluZXIgPSAkKHRoaXMub3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgdGhpcy5lbGVtZW50KTtcbiAgICAgIHZhciAkZmllbGQgPSAkKCdpbnB1dFtuYW1lPVwicGFzc3dvcmRcIl0nLCAkY29udGFpbmVyKTtcbiAgICAgICQoJy5hLWFjY291bnQtZXhpc3RzJykuaGlkZSgpO1xuICAgICAgdmFyIHNob3dfcGFzcyA9ICc8ZGl2IGNsYXNzPVwiYS1mb3JtLXNob3ctcGFzc3dvcmQgYS1mb3JtLWNhcHRpb25cIj48bGFiZWw+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG5hbWU9XCJzaG93X3Bhc3N3b3JkXCIgaWQ9XCJzaG93LXBhc3N3b3JkLWNoZWNrYm94XCIgdmFsdWU9XCIxXCI+IFNob3cgcGFzc3dvcmQ8L2xhYmVsPjwvZGl2Pic7XG4gICAgICAvLyBJbmplY3QgdGhlIHRvZ2dsZSBidXR0b24gaW50byB0aGUgcGFnZVxuICAgICAgJGNvbnRhaW5lci5hcHBlbmQoIHNob3dfcGFzcyApO1xuICAgICAgLy8gQ2FjaGUgdGhlIHRvZ2dsZSBidXR0b25cbiAgICAgIHZhciAkdG9nZ2xlID0gJCgnI3Nob3ctcGFzc3dvcmQtY2hlY2tib3gnKTtcbiAgICAgIC8vIFRvZ2dsZSB0aGUgZmllbGQgdHlwZVxuICAgICAgJHRvZ2dsZS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIHZhciBjaGVja2JveCA9ICQodGhpcyk7XG4gICAgICAgIGlmIChjaGVja2JveC5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICAgICRmaWVsZC5hdHRyKCd0eXBlJywgJ3RleHQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkZmllbGQuYXR0cigndHlwZScsICdwYXNzd29yZCcpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIC8vIFNldCB0aGUgZm9ybSBmaWVsZCBiYWNrIHRvIGEgcmVndWxhciBwYXNzd29yZCBlbGVtZW50XG4gICAgICAkc3VibWl0Lm9uKCAnY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICRmaWVsZC5hdHRyKCd0eXBlJywgJ3Bhc3N3b3JkJyk7XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgc2hvd1Bhc3N3b3JkU3RyZW5ndGg6IGZ1bmN0aW9uKCkge1xuICAgICAgLy8gY2hlY2tQYXNzd29yZFN0cmVuZ3RoXG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICBpZiAoJCgnLmEtcGFzc3dvcmQtc3RyZW5ndGgnKS5sZW5ndGggPiAwICkge1xuICAgICAgICB2YXIgJGJlZm9yZSA9ICQoJy5hLWZvcm0tc2hvdy1wYXNzd29yZCcpO1xuICAgICAgICAkYmVmb3JlLmFmdGVyKCAkKCc8ZGl2IGNsYXNzPVwiYS1wYXNzd29yZC1zdHJlbmd0aFwiPjxtZXRlciBtYXg9XCI0XCIgaWQ9XCJwYXNzd29yZC1zdHJlbmd0aFwiPjxkaXY+PC9kaXY+PC9tZXRlcj48cCBjbGFzcz1cImEtZm9ybS1jYXB0aW9uXCIgaWQ9XCJwYXNzd29yZC1zdHJlbmd0aC10ZXh0XCI+PC9wPjwvZGl2PicpKTtcbiAgICAgICAgJCggJ2JvZHknICkub24oICdrZXl1cCcsICdpbnB1dFtuYW1lPXBhc3N3b3JkXScsXG4gICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGF0LmNoZWNrUGFzc3dvcmRTdHJlbmd0aChcbiAgICAgICAgICAgICAgJCgnaW5wdXRbbmFtZT1wYXNzd29yZF0nKSwgLy8gUGFzc3dvcmQgZmllbGRcbiAgICAgICAgICAgICAgJCgnI3Bhc3N3b3JkLXN0cmVuZ3RoJyksICAgICAgICAgICAvLyBTdHJlbmd0aCBtZXRlclxuICAgICAgICAgICAgICAkKCcjcGFzc3dvcmQtc3RyZW5ndGgtdGV4dCcpICAgICAgLy8gU3RyZW5ndGggdGV4dCBpbmRpY2F0b3JcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0sIC8vIHNob3dQYXNzd29yZFN0cmVuZ3RoXG5cbiAgICBjaGVja1Bhc3N3b3JkU3RyZW5ndGg6IGZ1bmN0aW9uKCAkcGFzc3dvcmQsICRzdHJlbmd0aE1ldGVyLCAkc3RyZW5ndGhUZXh0ICkge1xuICAgICAgdmFyIHBhc3N3b3JkID0gJHBhc3N3b3JkLnZhbCgpO1xuICAgICAgLy8gR2V0IHRoZSBwYXNzd29yZCBzdHJlbmd0aFxuICAgICAgdmFyIHJlc3VsdCA9IHp4Y3ZibihwYXNzd29yZCk7XG4gICAgICB2YXIgc3RyZW5ndGggPSByZXN1bHQuc2NvcmU7XG5cbiAgICAgICRzdHJlbmd0aFRleHQucmVtb3ZlQ2xhc3MoICdzaG9ydCBiYWQgZ29vZCBzdHJvbmcnICk7XG5cbiAgICAgIC8vIEFkZCB0aGUgc3RyZW5ndGggbWV0ZXIgcmVzdWx0c1xuICAgICAgc3dpdGNoICggc3RyZW5ndGggKSB7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAkc3RyZW5ndGhUZXh0LmFkZENsYXNzKCAnYmFkJyApLmh0bWwoICdTdHJlbmd0aDogPHN0cm9uZz5XZWFrPC9zdHJvbmc+JyApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgJHN0cmVuZ3RoVGV4dC5hZGRDbGFzcyggJ2dvb2QnICkuaHRtbCggJ1N0cmVuZ3RoOiA8c3Ryb25nPk1lZGl1bTwvc3Ryb25nPicgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICRzdHJlbmd0aFRleHQuYWRkQ2xhc3MoICdzdHJvbmcnICkuaHRtbCggJ1N0cmVuZ3RoOiA8c3Ryb25nPlN0cm9uZzwvc3Ryb25nPicgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICRzdHJlbmd0aFRleHQuYWRkQ2xhc3MoICdzaG9ydCcgKS5odG1sKCAnU3RyZW5ndGg6IDxzdHJvbmc+VmVyeSB3ZWFrPC9zdHJvbmc+JyApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICRzdHJlbmd0aFRleHQuYWRkQ2xhc3MoICdzaG9ydCcgKS5odG1sKCAnU3RyZW5ndGg6IDxzdHJvbmc+VmVyeSB3ZWFrPC9zdHJvbmc+JyApO1xuICAgICAgfVxuICAgICAgJHN0cmVuZ3RoTWV0ZXIudmFsKHN0cmVuZ3RoKTtcbiAgICAgIHJldHVybiBzdHJlbmd0aDtcbiAgICB9LCAvLyBjaGVja1Bhc3N3b3JkU3RyZW5ndGhcblxuICAgIGNoZWNrTWlubnBvc3RBY2NvdW50OiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zLCBlbWFpbCkge1xuICAgICAgdmFyIHVzZXIgPSB7XG4gICAgICAgIGVtYWlsOiBlbWFpbFxuICAgICAgfTtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICQuYWpheCh7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIHVybDogb3B0aW9ucy5taW5ucG9zdF9yb290ICsgJy93cC1qc29uL3VzZXItYWNjb3VudC1tYW5hZ2VtZW50L3YxL2NoZWNrLWFjY291bnQnLFxuICAgICAgICBkYXRhOiB1c2VyXG4gICAgICB9KS5kb25lKGZ1bmN0aW9uKCByZXN1bHQgKSB7XG4gICAgICAgIGlmIChyZXN1bHQuc3RhdHVzID09PSAnc3VjY2VzcycgJiYgcmVzdWx0LnJlYXNvbiA9PT0gJ3VzZXIgZXhpc3RzJykgeyAvLyB1c2VyIGV4aXN0c1xuICAgICAgICAgIGlmICgkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KS5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICAgICAgJChvcHRpb25zLnBhc3N3b3JkX3NlbGVjdG9yLCBlbGVtZW50KS5oaWRlKCk7XG4gICAgICAgICAgICAkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKS5oaWRlKCk7XG4gICAgICAgICAgICAkKCcuYS1hY2NvdW50LWV4aXN0cycsIGVsZW1lbnQpLnNob3coKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCQob3B0aW9ucy5jcmVhdGVfbXBfc2VsZWN0b3IsIGVsZW1lbnQpLmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgICAgICAgICQob3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgZWxlbWVudCkuaGlkZSgpO1xuICAgICAgICAgICAgICAkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKS5oaWRlKCk7XG4gICAgICAgICAgICAgICQoJy5hLWFjY291bnQtZXhpc3RzJywgZWxlbWVudCkuc2hvdygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKCByZXN1bHQuc3RhdHVzID09PSAnc3BhbScgKSB7XG4gICAgICAgICAgJCh0aGF0Lm9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IpLmFkZENsYXNzKCdpbnZhbGlkIGEtZXJyb3InKTtcbiAgICAgICAgICAkKCAnLmEtc3BhbS1lbWFpbCcpLnNob3coKTtcbiAgICAgICAgfSBlbHNlIHsgLy8gdXNlciBkb2VzIG5vdCBleGlzdCBvciBhamF4IGNhbGwgZmFpbGVkXG4gICAgICAgICAgaWYgKCQob3B0aW9ucy5jcmVhdGVfbXBfc2VsZWN0b3IsIGVsZW1lbnQpLmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgICAgICAkKG9wdGlvbnMucGFzc3dvcmRfc2VsZWN0b3IsIGVsZW1lbnQpLnNob3coKTtcbiAgICAgICAgICAgIG9wdGlvbnMuY3JlYXRlX2FjY291bnQgPSB0cnVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKG9wdGlvbnMucGFzc3dvcmRfc2VsZWN0b3IsIGVsZW1lbnQpLmhpZGUoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgJCgnLmEtYWNjb3VudC1leGlzdHMnLCBlbGVtZW50KS5oaWRlKCk7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LCAvLyBjaGVja01pbm5wb3N0QWNjb3VudFxuXG4gICAgcGF5bWVudFJlcXVlc3RCdXR0b246IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHZhciB0b3RhbF9hbW91bnQgPSB0aGF0LmdldFRvdGFsQW1vdW50KCk7XG4gICAgICB0aGF0LnBheW1lbnRSZXF1ZXN0ID0gdGhhdC5zdHJpcGUucGF5bWVudFJlcXVlc3Qoe1xuICAgICAgICBjb3VudHJ5OiAnVVMnLFxuICAgICAgICBjdXJyZW5jeTogJ3VzZCcsXG4gICAgICAgIHRvdGFsOiB7XG4gICAgICAgICAgbGFiZWw6ICdNaW5uUG9zdCcsXG4gICAgICAgICAgYW1vdW50OiB0b3RhbF9hbW91bnQgKiAxMDAsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICAgIHRoYXQucHJCdXR0b24gPSB0aGF0LmVsZW1lbnRzLmNyZWF0ZSgncGF5bWVudFJlcXVlc3RCdXR0b24nLCB7XG4gICAgICAgIHBheW1lbnRSZXF1ZXN0OiB0aGF0LnBheW1lbnRSZXF1ZXN0LFxuICAgICAgICBzdHlsZToge1xuICAgICAgICAgIHBheW1lbnRSZXF1ZXN0QnV0dG9uOiB7XG4gICAgICAgICAgICB0eXBlOiAnZG9uYXRlJyxcbiAgICAgICAgICAgIC8vIE9uZSBvZiAnZGVmYXVsdCcsICdib29rJywgJ2J1eScsIG9yICdkb25hdGUnXG4gICAgICAgICAgICAvLyBEZWZhdWx0cyB0byAnZGVmYXVsdCdcbiAgICAgIFxuICAgICAgICAgICAgdGhlbWU6ICdkYXJrJyxcbiAgICAgICAgICAgIC8vIE9uZSBvZiAnZGFyaycsICdsaWdodCcsIG9yICdsaWdodC1vdXRsaW5lJ1xuICAgICAgICAgICAgLy8gRGVmYXVsdHMgdG8gJ2RhcmsnXG4gICAgICBcbiAgICAgICAgICAgIGhlaWdodDogJzQ4cHgnXG4gICAgICAgICAgICAvLyBEZWZhdWx0cyB0byAnNDBweCcuIFRoZSB3aWR0aCBpcyBhbHdheXMgJzEwMCUnLlxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICAgIFxuICAgICAgLy8gQ2hlY2sgdGhlIGF2YWlsYWJpbGl0eSBvZiB0aGUgUGF5bWVudCBSZXF1ZXN0IEFQSSBmaXJzdC5cbiAgICAgIHRoYXQucGF5bWVudFJlcXVlc3QuY2FuTWFrZVBheW1lbnQoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgJCgnLm0tcGF5LXdpdGhvdXQtcGF5bWVudC1yZXF1ZXN0JykuaGlkZSgpO1xuICAgICAgICAgIHRoYXQucHJCdXR0b24ubW91bnQoJyNwYXltZW50LXJlcXVlc3QtYnV0dG9uJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhhdC5oaWRlUGF5bWVudFJlcXVlc3QoICQoJy5vLXBheS13aXRoLXBheW1lbnQtcmVxdWVzdCcpICk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAkKCcuZGVjbGluZS1hcHBsZS1wYXkgYScpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoYXQuaGlkZVBheW1lbnRSZXF1ZXN0KCAkKCcuby1wYXktd2l0aC1wYXltZW50LXJlcXVlc3QgLm0tZm9ybS1hY3Rpb25zLXBheS1mZWVzJykgKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGF0LnByQnV0dG9uLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cbiAgICAgICAgLy8gU2VuZCBwYXltZW50TWV0aG9kLmlkIHRvIHNlcnZlclxuICAgICAgICB2YXIgc3VwcG9ydGZvcm0gPSAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3Rvcik7XG5cbiAgICAgICAgLy8gY2hlY2sgdmFsaWRhdGlvbiBvZiBmb3JtXG4gICAgICAgIGlmICghc3VwcG9ydGZvcm0uZ2V0KDApLnJlcG9ydFZhbGlkaXR5KCkpIHtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHRoYXQucGF5bWVudFJlcXVlc3Qub24oJ3BheW1lbnRtZXRob2QnLCBmdW5jdGlvbihldmVudCkge1xuXG4gICAgICAgIC8vIFNlbmQgcGF5bWVudE1ldGhvZC5pZCB0byBzZXJ2ZXJcbiAgICAgICAgdmFyIHN1cHBvcnRmb3JtID0gJCh0aGF0Lm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpO1xuICAgICAgICB2YXIgdG9rZW5GaWVsZE5hbWUgPSAncGF5bWVudF9tZXRob2RfaWQnO1xuICAgICAgICB2YXIgdG9rZW5GaWVsZCA9ICdpbnB1dFtuYW1lPVwiJyArIHRva2VuRmllbGROYW1lICsgJ1wiXSc7XG5cbiAgICAgICAgLy8gSW5zZXJ0IHRoZSBwYXltZW50IG1ldGhvZCBJRCBpbnRvIHRoZSBmb3JtIHNvIGl0IGdldHMgc3VibWl0dGVkIHRvIHRoZSBzZXJ2ZXJcbiAgICAgICAgaWYgKCQodG9rZW5GaWVsZCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICQodG9rZW5GaWVsZCkudmFsKGV2ZW50LnBheW1lbnRNZXRob2QuaWQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN1cHBvcnRmb3JtLmFwcGVuZCgkKCc8aW5wdXQgdHlwZT1cXFwiaGlkZGVuXFxcIiBuYW1lPVwiJyArIHRva2VuRmllbGROYW1lICsgJ1wiPicpLnZhbChldmVudC5wYXltZW50TWV0aG9kLmlkKSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGF0LmZvcm1Qcm9jZXNzb3IodGhhdCwgJ3BheW1lbnRSZXF1ZXN0Jyk7XG5cbiAgICAgIH0pO1xuXG4gICAgfSwgLy8gcGF5bWVudFJlcXVlc3RCdXR0b25cblxuICAgIGhpZGVQYXltZW50UmVxdWVzdDogZnVuY3Rpb24oIGhpZGVFbGVtZW50ICkge1xuICAgICAgaGlkZUVsZW1lbnQuaGlkZSgpO1xuICAgICAgJCgnLmRlY2xpbmUtYXBwbGUtcGF5IGEnKS5oaWRlKCk7XG4gICAgICAkKCcubS1wYXktd2l0aG91dC1wYXltZW50LXJlcXVlc3QnKS5zaG93KCk7XG4gICAgICAkKCcuYS1nLXJlY2FwdGNoYScpLmluc2VydEFmdGVyKCcubS1wYXktd2l0aG91dC1wYXltZW50LXJlcXVlc3QgLm0tZm9ybS1hY3Rpb25zLXBheS1mZWVzJyk7XG4gICAgfSwgLy8gaGlkZVBheW1lbnRSZXF1ZXN0XG5cbiAgICBjaG9vc2VQYXltZW50TWV0aG9kOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG5cbiAgICAgIHZhciB0aGF0ID0gdGhpcztcblxuICAgICAgaWYgKCQob3B0aW9ucy5jaG9vc2VfcGF5bWVudCkubGVuZ3RoID4gMCkge1xuICAgICAgICBpZiAoJChvcHRpb25zLmNob29zZV9wYXltZW50ICsgJyBpbnB1dCcpLmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgICAgdmFyIGNoZWNrZWRfaWQgPSAkKG9wdGlvbnMuY2hvb3NlX3BheW1lbnQgKyAnIGlucHV0OmNoZWNrZWQnKS5hdHRyKCdpZCcpO1xuICAgICAgICAgIHZhciBjaGVja2VkX3ZhbHVlID0gJChvcHRpb25zLmNob29zZV9wYXltZW50ICsgJyBpbnB1dDpjaGVja2VkJykudmFsKCk7XG4gICAgICAgICAgdGhhdC5zZXR1cFBheW1lbnRNZXRob2QoY2hlY2tlZF9pZCwgY2hlY2tlZF92YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICAkKG9wdGlvbnMuY2hvb3NlX3BheW1lbnQgKyAnIGlucHV0JykuY2hhbmdlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgY2hlY2tlZF9pZCA9IHRoaXMuaWQ7XG4gICAgICAgICAgdmFyIGNoZWNrZWRfdmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgICAgICAgIHRoYXQuc2V0dXBQYXltZW50TWV0aG9kKGNoZWNrZWRfaWQsIGNoZWNrZWRfdmFsdWUpO1xuICAgICAgICB9KTtcblxuICAgICAgfVxuICAgIH0sIC8vIGNob29zZVBheW1lbnRNZXRob2RcblxuICAgIHNldHVwUGF5bWVudE1ldGhvZDogZnVuY3Rpb24oZWxlbWVudF9pZCwgZWxlbWVudF92YWx1ZSkge1xuICAgICAgdmFyIHN0cmlwZV9wYXltZW50X3R5cGUgPSB0aGlzLnNldFN0cmlwZVBheW1lbnRUeXBlKGVsZW1lbnRfdmFsdWUpO1xuICAgICAgaWYgKCBlbGVtZW50X3ZhbHVlID09PSAnYmFua19hY2NvdW50JyApIHtcbiAgICAgICAgJCgnaW5wdXRbbmFtZT1cInBheW1lbnRfbWV0aG9kX2lkXCJdJywgJCh0aGlzLm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpKS5yZW1vdmUoKTtcbiAgICAgICAgdGhpcy5hY2hGaWVsZHModGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yZW1vdmVBY2hGaWVsZHModGhpcy5vcHRpb25zKTtcbiAgICAgIH1cbiAgICAgICQodGhpcy5vcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAkKHRoaXMub3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvciArICcuJyArIGVsZW1lbnRfaWQpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICQodGhpcy5vcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yICsgJzpub3QoLmFjdGl2ZSkgaW5wdXQnKS52YWwoJycpO1xuICAgICAgdGhpcy5jYWxjdWxhdGVGZWVzKHRoaXMub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQsIHN0cmlwZV9wYXltZW50X3R5cGUpO1xuICAgIH0sIC8vIHNldHVwUGF5bWVudE1ldGhvZFxuXG4gICAgcmVtb3ZlQWNoRmllbGRzOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAkKCdpbnB1dFtuYW1lPVwicHVibGljX3Rva2VuXCJdJywgJChvcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKSkucmVtb3ZlKCk7XG4gICAgICAkKCdpbnB1dFtuYW1lPVwiYWNjb3VudF9pZFwiXScsICQob3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikpLnJlbW92ZSgpO1xuICAgICAgJCgnaW5wdXRbbmFtZT1cImJhbmtUb2tlblwiXScsICQob3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikpLnJlbW92ZSgpO1xuICAgICAgJChvcHRpb25zLnBsYWlkX2xpbmspLmh0bWwoJzxhIGhyZWY9XCIjXCI+U2lnbiBpbiB0byB5b3VyIGJhbmsgYWNjb3VudDwvYT4nKTtcbiAgICAgIHRoaXMuYnV0dG9uRGlzYWJsZWQob3B0aW9ucywgZmFsc2UsICcnLCAnJywgdHJ1ZSk7IC8vIGlmIHRoZSBidXR0b24gd2FzIGRpc2FibGVkLCByZS1lbmFibGUgaXRcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5saW5rSGFuZGxlciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhpcy5saW5rSGFuZGxlci5kZXN0cm95KCk7XG4gICAgICB9XG4gICAgfSwgLy8gcmVtb3ZlQWNoRmllbGRzXG5cbiAgICBjcmVkaXRDYXJkRmllbGRzOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG5cbiAgICAgIHZhciB0aGF0ID0gdGhpcztcblxuICAgICAgdmFyIHN0eWxlID0ge1xuICAgICAgICBiYXNlOiB7XG4gICAgICAgICAgaWNvbkNvbG9yOiAnIzY2NkVFOCcsXG4gICAgICAgICAgbGluZUhlaWdodDogJzQzcHgnLFxuICAgICAgICAgIGZvbnRXZWlnaHQ6IDQwMCxcbiAgICAgICAgICBmb250RmFtaWx5OiAnZmYtbWV0YS13ZWItcHJvJyxcbiAgICAgICAgICBmb250U2l6ZTogJzI0cHgnLFxuICAgICAgICAgIC8vbGluZUhlaWdodDogJzM3cHgnLFxuICAgICAgICAgIC8vZm9udFNpemU6ICcxNnB4JyxcbiAgICAgICAgfSxcbiAgICAgICAgaW52YWxpZDoge1xuICAgICAgICAgIGNvbG9yOiAnIzFhMTgxOCcsXG4gICAgICAgIH0sXG4gICAgICB9O1xuXG4gICAgICAvLyBBZGQgYW4gaW5zdGFuY2Ugb2YgdGhlIGNhcmQgVUkgY29tcG9uZW50IGludG8gdGhlIGBjYXJkLWVsZW1lbnRgIDxkaXY+XG4gICAgICAvL2NhcmQubW91bnQoJyNjYXJkLWVsZW1lbnQnKTtcbiAgICAgIGlmICggJCgnLmNyZWRpdC1jYXJkLWdyb3VwJykubGVuZ3RoID09PSAwICYmICQoJy5wYXltZW50LW1ldGhvZC5jaG9vc2UtY2FyZCcpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGF0LmNhcmROdW1iZXJFbGVtZW50ID0gdGhhdC5lbGVtZW50cy5jcmVhdGUoJ2NhcmROdW1iZXInLCB7XG4gICAgICAgIHNob3dJY29uOiB0cnVlLFxuICAgICAgICBzdHlsZTogc3R5bGVcbiAgICAgIH0pO1xuICAgICAgdGhhdC5jYXJkTnVtYmVyRWxlbWVudC5tb3VudChvcHRpb25zLmNjX251bV9zZWxlY3Rvcik7XG5cbiAgICAgIHRoYXQuY2FyZEV4cGlyeUVsZW1lbnQgPSB0aGF0LmVsZW1lbnRzLmNyZWF0ZSgnY2FyZEV4cGlyeScsIHtcbiAgICAgICAgc3R5bGU6IHN0eWxlXG4gICAgICB9KTtcbiAgICAgIHRoYXQuY2FyZEV4cGlyeUVsZW1lbnQubW91bnQob3B0aW9ucy5jY19leHBfc2VsZWN0b3IpO1xuXG4gICAgICB0aGF0LmNhcmRDdmNFbGVtZW50ID0gdGhhdC5lbGVtZW50cy5jcmVhdGUoJ2NhcmRDdmMnLCB7XG4gICAgICAgIHN0eWxlOiBzdHlsZVxuICAgICAgfSk7XG4gICAgICB0aGF0LmNhcmRDdmNFbGVtZW50Lm1vdW50KG9wdGlvbnMuY2NfY3ZjX3NlbGVjdG9yKTtcblxuICAgICAgLy8gdmFsaWRhdGUvZXJyb3IgaGFuZGxlIHRoZSBjYXJkIGZpZWxkc1xuICAgICAgdGhhdC5jYXJkTnVtYmVyRWxlbWVudC5vbignY2hhbmdlJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgdmFyIHN0cmlwZV9wYXltZW50X3R5cGUgPSAnY2FyZCc7XG4gICAgICAgIC8vIFN3aXRjaCBwYXltZW50IHR5cGUgaWYgaXQncyBvbmUgdGhhdCB3ZSByZWNvZ25pemUgYXMgZGlzdGluY3RcbiAgICAgICAgaWYgKGV2ZW50LmJyYW5kKSB7XG4gICAgICAgICAgaWYgKCBldmVudC5icmFuZCA9PT0gJ2FtZXgnICkge1xuICAgICAgICAgICAgc3RyaXBlX3BheW1lbnRfdHlwZSA9ICdhbWV4JztcbiAgICAgICAgICB9ICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIC8vIGVycm9yIGhhbmRsaW5nXG4gICAgICAgIHRoYXQuc3RyaXBlRXJyb3JEaXNwbGF5KGV2ZW50LmVycm9yLCAkKG9wdGlvbnMuY2NfbnVtX3NlbGVjdG9yLCBlbGVtZW50KSwgZWxlbWVudCwgb3B0aW9ucyApO1xuICAgICAgICAvLyBpZiBpdCBjaGFuZ2VkLCByZXNldCB0aGUgYnV0dG9uXG4gICAgICAgIHRoYXQuYnV0dG9uU3RhdHVzKG9wdGlvbnMsICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKSwgZmFsc2UpO1xuICAgICAgICB0aGF0LmNhbGN1bGF0ZUZlZXModGhhdC5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCwgc3RyaXBlX3BheW1lbnRfdHlwZSk7XG4gICAgICB9KTtcblxuICAgICAgdGhhdC5jYXJkRXhwaXJ5RWxlbWVudC5vbignY2hhbmdlJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgLy8gZXJyb3IgaGFuZGxpbmdcbiAgICAgICAgdGhhdC5zdHJpcGVFcnJvckRpc3BsYXkoZXZlbnQuZXJyb3IsICQob3B0aW9ucy5jY19leHBfc2VsZWN0b3IsIGVsZW1lbnQpLCBlbGVtZW50LCBvcHRpb25zICk7XG4gICAgICAgIC8vIGlmIGl0IGNoYW5nZWQsIHJlc2V0IHRoZSBidXR0b25cbiAgICAgICAgdGhhdC5idXR0b25TdGF0dXMob3B0aW9ucywgJCh0aGF0Lm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLmZpbmQoJ2J1dHRvbicpLCBmYWxzZSk7XG4gICAgICB9KTtcblxuICAgICAgdGhhdC5jYXJkQ3ZjRWxlbWVudC5vbignY2hhbmdlJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgLy8gZXJyb3IgaGFuZGxpbmdcbiAgICAgICAgdGhhdC5zdHJpcGVFcnJvckRpc3BsYXkoZXZlbnQuZXJyb3IsICQob3B0aW9ucy5jY19jdmNfc2VsZWN0b3IsIGVsZW1lbnQpLCBlbGVtZW50LCBvcHRpb25zICk7XG4gICAgICAgIC8vIGlmIGl0IGNoYW5nZWQsIHJlc2V0IHRoZSBidXR0b25cbiAgICAgICAgdGhhdC5idXR0b25TdGF0dXMob3B0aW9ucywgJCh0aGF0Lm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLmZpbmQoJ2J1dHRvbicpLCBmYWxzZSk7XG4gICAgICB9KTtcblxuICAgICAgLy8gdGhpcyBpcyB0aGUgbWV0aG9kIHRvIGNyZWF0ZSBhIHNpbmdsZSBjYXJkIGZpZWxkIGFuZCBtb3VudCBpdFxuICAgICAgLyp2YXIgY2FyZCA9IHRoYXQuZWxlbWVudHMuY3JlYXRlKFxuICAgICAgICAnY2FyZCcsXG4gICAgICAgIHtcbiAgICAgICAgICBoaWRlUG9zdGFsQ29kZTogdHJ1ZVxuICAgICAgICB9XG4gICAgICApO1xuICAgICAgLy8gQWRkIGFuIGluc3RhbmNlIG9mIHRoZSBjYXJkIFVJIGNvbXBvbmVudCBpbnRvIHRoZSBgY2FyZC1lbGVtZW50YCA8ZGl2PlxuICAgICAgY2FyZC5tb3VudCgnI2NhcmQtZWxlbWVudCcpOyovXG5cbiAgICB9LCAvLyBjcmVkaXRDYXJkRmllbGRzXG5cbiAgICBzaG93U3Bpbm5lcjogZnVuY3Rpb24oKSB7XG4gICAgICAkKHRoaXMub3B0aW9ucy5wbGFpZF9saW5rKS5oaWRlKCk7XG4gICAgICAkKHRoaXMub3B0aW9ucy5wbGFpZF9saW5rKS5hZnRlcignPGRpdiBjbGFzcz1cImEtc3Bpbm5lclwiPjxpbWcgc3JjPVwiaHR0cHM6Ly93d3cubWlubnBvc3QuY29tL3dwLWFkbWluL2ltYWdlcy9zcGlubmVyLmdpZlwiIHNyY3NldD1cImh0dHBzOi8vd3d3Lm1pbm5wb3N0LmNvbS93cC1hZG1pbi9pbWFnZXMvc3Bpbm5lci5naWYgMXgsIGh0dHBzOi8vd3d3Lm1pbm5wb3N0LmNvbS93cC1hZG1pbi9pbWFnZXMvc3Bpbm5lci0yeC5naWYgMngsXCI+PC9kaXY+Jyk7XG4gICAgfSxcblxuICAgIGhpZGVTcGlubmVyOiBmdW5jdGlvbigpIHtcbiAgICAgICQodGhpcy5vcHRpb25zLnBsYWlkX2xpbmspLnNob3coKTtcbiAgICAgICQoJy5hLXNwaW5uZXInKS5oaWRlKCk7XG4gICAgfSxcblxuICAgIGFjaEZpZWxkczogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgdmFyIGJhbmtUb2tlbkZpZWxkTmFtZSA9ICdiYW5rVG9rZW4nO1xuICAgICAgdmFyIGJhbmtUb2tlbkZpZWxkID0gJ2lucHV0W25hbWU9XCInICsgYmFua1Rva2VuRmllbGROYW1lICsgJ1wiXSc7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAvLyB0aGUgYnV0dG9uIHNob3VsZCBub3QgYmUgY2xpY2thYmxlIHVudGlsIHRoZSB1c2VyIGhhcyBzaWduZWQgaW5cbiAgICAgIHRoYXQuYnV0dG9uRGlzYWJsZWQob3B0aW9ucywgdHJ1ZSwgJycsICdTaWduIGluIHRvIHlvdXIgYmFuayBhY2NvdW50IChhYm92ZSkgZmlyc3QnKTtcblxuICAgICAgaWYgKHR5cGVvZiBQbGFpZCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhhdC5saW5rSGFuZGxlciA9IFBsYWlkLmNyZWF0ZSh7XG4gICAgICAgICAgY2xpZW50TmFtZTogJ01pbm5Qb3N0JyxcbiAgICAgICAgICBlbnY6IG9wdGlvbnMucGxhaWRfZW52LFxuICAgICAgICAgIHByb2R1Y3Q6IFsnYXV0aCddLFxuICAgICAgICAgIC8vIDEuIFBhc3MgdGhlIHRva2VuIGdlbmVyYXRlZCBpbiBzdGVwIDIuXG4gICAgICAgICAgdG9rZW46IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGFpZF9saW5rX3Rva2VuJykudmFsdWUsXG4gICAgICAgICAgb25TdWNjZXNzOiBmdW5jdGlvbihwdWJsaWNfdG9rZW4sIG1ldGFkYXRhKSB7XG4gICAgICAgICAgICB0aGF0LnNob3dTcGlubmVyKCk7XG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICB1cmw6Jy9nZXRfcGxhaWRfYWNjZXNzX3Rva2VuLycsXG4gICAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHsgcHVibGljX3Rva2VuOiBwdWJsaWNfdG9rZW4sIGFjY291bnRfaWQ6IG1ldGFkYXRhLmFjY291bnRfaWQgfSksXG4gICAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04J1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgIGlmICh0eXBlb2YgcmVzcG9uc2UuZXJyb3IgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgLy8gdGhlcmUgaXMgYW4gZXJyb3IuXG4gICAgICAgICAgICAgICAgdGhhdC5oaWRlU3Bpbm5lcigpO1xuICAgICAgICAgICAgICAgICQob3B0aW9ucy5wbGFpZF9saW5rKS5iZWZvcmUoJzxwIGNsYXNzPVwiYS1lcnJvciBhLXZhbGlkYXRpb24tZXJyb3JcIj4nICsgcmVzcG9uc2UuZXJyb3IgKyAnPC9wPicpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vdGhpcy5kZWJ1ZygncHJpbnQgcmVzcG9uc2UgaGVyZScpO1xuICAgICAgICAgICAgICAgIC8vdGhpcy5kZWJ1ZyhyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgLy8gYWRkIHRoZSBmaWVsZChzKSB3ZSBuZWVkIHRvIHRoZSBmb3JtIGZvciBzdWJtaXR0aW5nXG4gICAgICAgICAgICAgICAgaWYgKCQoYmFua1Rva2VuRmllbGQpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICQoYmFua1Rva2VuRmllbGQpLnZhbChyZXNwb25zZS5zdHJpcGVfYmFua19hY2NvdW50X3Rva2VuKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgJChvcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5wcmVwZW5kKCQoJzxpbnB1dCB0eXBlPVxcXCJoaWRkZW5cXFwiIG5hbWU9XCInICsgYmFua1Rva2VuRmllbGROYW1lICsgJ1wiPicpLnZhbChyZXNwb25zZS5zdHJpcGVfYmFua19hY2NvdW50X3Rva2VuKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICQob3B0aW9ucy5wbGFpZF9saW5rLCBlbGVtZW50KS5odG1sKCc8c3Ryb25nPllvdXIgYWNjb3VudCB3YXMgc3VjY2Vzc2Z1bGx5IGF1dGhvcml6ZWQ8L3N0cm9uZz4nKTtcbiAgICAgICAgICAgICAgICB0aGF0LmhpZGVTcGlubmVyKCk7XG4gICAgICAgICAgICAgICAgdGhhdC5idXR0b25EaXNhYmxlZChvcHRpb25zLCBmYWxzZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZmFpbChmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICB0aGF0LmRlYnVnKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgdGhhdC5oaWRlU3Bpbm5lcigpO1xuICAgICAgICAgICAgICAkKG9wdGlvbnMucGxhaWRfbGluaykuYmVmb3JlKCc8cCBjbGFzcz1cImEtZXJyb3IgYS12YWxpZGF0aW9uLWVycm9yXCI+JyArIHJlc3BvbnNlLmVycm9yICsgJzwvcD4nKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgICAkKG9wdGlvbnMucGxhaWRfbGluayArICcgYScpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB0aGF0LnJlc2V0Rm9ybUVycm9ycyh0aGF0Lm9wdGlvbnMsIHRoYXQuZWxlbWVudCk7XG4gICAgICAgICAgLy8kKG9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IgKyAnIC5hLWVycm9yJykucmVtb3ZlKCk7IC8vIHJlbW92ZSBtZXRob2QgZXJyb3IgbWVzc2FnZSBpZiBpdCBpcyB0aGVyZVxuICAgICAgICAgIHRoYXQubGlua0hhbmRsZXIub3BlbigpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LCAvLyBhY2hGaWVsZHNcblxuICAgIGJ1dHRvblN0YXR1czogZnVuY3Rpb24ob3B0aW9ucywgYnV0dG9uLCBkaXNhYmxlZCkge1xuICAgICAgLy8gbWFrZSB0aGUgYnV0dG9uIGNsaWNrYWJsZSBvciBub3RcbiAgICAgIHRoaXMuYnV0dG9uRGlzYWJsZWQob3B0aW9ucywgZGlzYWJsZWQsIGJ1dHRvbik7XG4gICAgICBpZiAoZGlzYWJsZWQgPT09IGZhbHNlKSB7XG4gICAgICAgIGJ1dHRvbi50ZXh0KG9wdGlvbnMuYnV0dG9uX3RleHQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnV0dG9uLnRleHQoJ1Byb2Nlc3NpbmcnKTtcbiAgICAgIH1cbiAgICB9LCAvLyBidXR0b25TdGF0dXNcblxuICAgIGJ1dHRvbkRpc2FibGVkOiBmdW5jdGlvbihvcHRpb25zLCBkaXNhYmxlZCwgYnV0dG9uID0gJycsIG1lc3NhZ2UgPSAnJywgYWNoX3dhc19pbml0aWFsaXplZCA9IGZhbHNlKSB7XG4gICAgICBpZiAoYnV0dG9uID09PSAnJykge1xuICAgICAgICBidXR0b24gPSAkKG9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLmZpbmQoJ2J1dHRvbicpO1xuICAgICAgfVxuICAgICAgYnV0dG9uLnByb3AoJ2Rpc2FibGVkJywgZGlzYWJsZWQpO1xuICAgICAgaWYgKG1lc3NhZ2UgIT09ICcnKSB7XG4gICAgICAgIGlmIChkaXNhYmxlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIGJ1dHRvbi5hdHRyKCdkYXRhLXRsaXRlJywgbWVzc2FnZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYnV0dG9uLnJlbW92ZUF0dHIoICdkYXRhLXRsaXRlJyApOyAvLyB0aGVyZSBzaG91bGQgYmUgbm8gdGxpdGUgdmFsdWUgaWYgdGhlIGJ1dHRvbiBpcyBlbmFibGVkXG4gICAgICAgIH1cbiAgICAgICAgYnV0dG9uLm9uKCdtb3VzZWVudGVyIGZvY3VzJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICB0bGl0ZS5zaG93KCAoIHRoaXMgKSwgeyBncmF2OiAnbncnIH0gKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGJ1dHRvbi5vbignbW91c2VsZWF2ZScsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgdGxpdGUuaGlkZSggKCB0aGlzICkgKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBidXR0b24ucmVtb3ZlQXR0ciggJ2RhdGEtdGxpdGUnICk7XG4gICAgICAgIGlmIChhY2hfd2FzX2luaXRpYWxpemVkID09PSB0cnVlICkge1xuICAgICAgICAgIGJ1dHRvbi5vbignbW91c2VlbnRlciBmb2N1cycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICB0bGl0ZS5oaWRlKCAoIHRoaXMgKSApO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGJ1dHRvbi5jbGljayhmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCAvLyBidXR0b25EaXNhYmxlZFxuXG4gICAgdmFsaWRhdGVTZXR1cDogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgdmFyIGZvcm1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChvcHRpb25zLmZvcm1fc2VsZWN0b3IpO1xuICAgICAgZm9ybXMuZm9yRWFjaCggZnVuY3Rpb24gKCBmb3JtICkge1xuICAgICAgICBWYWxpZEZvcm0oIGZvcm0sIHtcbiAgICAgICAgICB2YWxpZGF0aW9uRXJyb3JQYXJlbnRDbGFzczogJ20taGFzLXZhbGlkYXRpb24tZXJyb3InLFxuICAgICAgICAgIHZhbGlkYXRpb25FcnJvckNsYXNzOiAnYS12YWxpZGF0aW9uLWVycm9yJyxcbiAgICAgICAgICBpbnZhbGlkQ2xhc3M6ICdhLWVycm9yJyxcbiAgICAgICAgICBlcnJvclBsYWNlbWVudDogJ2FmdGVyJ1xuICAgICAgICB9IClcbiAgICAgIH0gKTtcbiAgICAgIHRoaXMuc2Nyb2xsVG9Gb3JtRXJyb3Iob3B0aW9ucyk7XG4gICAgfSwgLy8gdmFsaWRhdGVTZXR1cFxuXG4gICAgc2Nyb2xsVG9Gb3JtRXJyb3I6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgIHZhciBmb3JtID0gJCggb3B0aW9ucy5mb3JtX3NlbGVjdG9yICk7XG4gICAgICAvLyBsaXN0ZW4gZm9yIGBpbnZhbGlkYCBldmVudHMgb24gYWxsIGZvcm0gaW5wdXRzXG4gICAgICBmb3JtLmZpbmQoICc6aW5wdXQnICkub24oICdpbnZhbGlkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciBpbnB1dCA9ICQoIHRoaXMgKTtcbiAgICAgICAgICAvLyB0aGUgZmlyc3QgaW52YWxpZCBlbGVtZW50IGluIHRoZSBmb3JtXG4gICAgICAgIHZhciBmaXJzdCA9IGZvcm0uZmluZCggJy5hLWVycm9yJyApLmZpcnN0KCk7XG4gICAgICAgIC8vIHRoZSBmb3JtIGl0ZW0gdGhhdCBjb250YWlucyBpdFxuICAgICAgICB2YXIgZmlyc3RfaG9sZGVyID0gZmlyc3QucGFyZW50KCk7XG4gICAgICAgICAgLy8gb25seSBoYW5kbGUgaWYgdGhpcyBpcyB0aGUgZmlyc3QgaW52YWxpZCBpbnB1dFxuICAgICAgICAgIGlmIChpbnB1dFswXSA9PT0gZmlyc3RbMF0pIHtcbiAgICAgICAgICAgICAgLy8gaGVpZ2h0IG9mIHRoZSBuYXYgYmFyIHBsdXMgc29tZSBwYWRkaW5nIGlmIHRoZXJlJ3MgYSBmaXhlZCBuYXZcbiAgICAgICAgICAgICAgLy92YXIgbmF2YmFySGVpZ2h0ID0gbmF2YmFyLmhlaWdodCgpICsgNTBcblxuICAgICAgICAgICAgICAvLyB0aGUgcG9zaXRpb24gdG8gc2Nyb2xsIHRvIChhY2NvdW50aW5nIGZvciB0aGUgbmF2YmFyIGlmIGl0IGV4aXN0cylcbiAgICAgICAgICAgICAgdmFyIGVsZW1lbnRPZmZzZXQgPSBmaXJzdF9ob2xkZXIub2Zmc2V0KCkudG9wO1xuXG4gICAgICAgICAgICAgIC8vIHRoZSBjdXJyZW50IHNjcm9sbCBwb3NpdGlvbiAoYWNjb3VudGluZyBmb3IgdGhlIG5hdmJhcilcbiAgICAgICAgICAgICAgdmFyIHBhZ2VPZmZzZXQgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XG5cbiAgICAgICAgICAgICAgLy8gZG9uJ3Qgc2Nyb2xsIGlmIHRoZSBlbGVtZW50IGlzIGFscmVhZHkgaW4gdmlld1xuICAgICAgICAgICAgICBpZiAoIGVsZW1lbnRPZmZzZXQgPiBwYWdlT2Zmc2V0ICYmIGVsZW1lbnRPZmZzZXQgPCBwYWdlT2Zmc2V0ICsgd2luZG93LmlubmVySGVpZ2h0ICkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAvLyBub3RlOiBhdm9pZCB1c2luZyBhbmltYXRlLCBhcyBpdCBwcmV2ZW50cyB0aGUgdmFsaWRhdGlvbiBtZXNzYWdlIGRpc3BsYXlpbmcgY29ycmVjdGx5XG4gICAgICAgICAgICAgICQoICdodG1sLCBib2R5JyApLnNjcm9sbFRvcCggZWxlbWVudE9mZnNldCApO1xuICAgICAgICAgIH1cbiAgICAgIH0gKTtcbiAgICB9LCAvLyBzY3JvbGxUb0Zvcm1FcnJvclxuXG4gICAgZm9ybVNldHVwOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG5cbiAgICAgICQob3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3Rvcikuc3VibWl0KGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoYXQuZm9ybVByb2Nlc3Nvcih0aGF0LCAnc3VibWl0Jyk7XG5cbiAgICAgIH0pO1xuICAgIH0sIC8vIGZvcm1TZXR1cFxuXG4gICAgZm9ybVByb2Nlc3NvcjogZnVuY3Rpb24odGhhdCwgdHlwZSkge1xuXG4gICAgICAvLyAxLiByZW1vdmUgcHJldmlvdXMgZXJyb3JzIGFuZCByZXNldCB0aGUgYnV0dG9uXG4gICAgICB0aGF0LnJlc2V0Rm9ybUVycm9ycyh0aGF0Lm9wdGlvbnMsIHRoYXQuZWxlbWVudCk7XG5cbiAgICAgIC8vIDIuIHNldCB1cCB0aGUgYnV0dG9uIGlmIGl0J3MgYSBmb3JtIHN1Ym1pdFxuICAgICAgaWYgKHR5cGUgPT09ICdzdWJtaXQnKSB7XG4gICAgICAgIHRoYXQuYnV0dG9uU3RhdHVzKHRoYXQub3B0aW9ucywgJCh0aGF0Lm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLmZpbmQoJ2J1dHRvbicpLCB0cnVlKTtcbiAgICAgIH1cblxuICAgICAgLy8gMy4gZ2VuZXJhdGUgYmlsbGluZyBhZGRyZXNzIGRldGFpbHNcbiAgICAgIHZhciBiaWxsaW5nRGV0YWlscyA9IHRoYXQuZ2VuZXJhdGVCaWxsaW5nRGV0YWlscygpO1xuXG4gICAgICAvLyA0LiBjcmVhdGUgbWlubnBvc3QgdXNlciBhY2NvdW50XG4gICAgICB0aGF0LmNyZWF0ZU1pbm5Qb3N0QWNjb3VudCh0aGF0Lm9wdGlvbnMsIHRoYXQuZWxlbWVudCk7XG5cbiAgICAgIC8vIDUuIGRvIHRoZSBjaGFyZ2luZyBvZiBjYXJkIG9yIGJhbmsgYWNjb3VudCBpZiBpdCdzIGEgZm9ybSBzdWJtaXRcbiAgICAgIC8vIG9yIHN1Ym1pdCB0aGUgZm9ybSBpZiB0aGlzIGlzIGEgcGF5bWVudCByZXF1ZXN0IGJ1dHRvblxuICAgICAgaWYgKHR5cGUgPT09ICdzdWJtaXQnKSB7XG4gICAgICAgIHZhciBwYXltZW50X3R5cGUgPSAkKCdpbnB1dFtuYW1lPVwic3RyaXBlX3BheW1lbnRfdHlwZVwiXScpLnZhbCgpO1xuICAgICAgICBpZiAocGF5bWVudF90eXBlICE9PSAnYmFua19hY2NvdW50Jykge1xuICAgICAgICAgIC8vIGZpbmFsbHksIGdldCBhIHBheW1lbnQgbWV0aG9kIGZyb20gc3RyaXBlLCBhbmQgdHJ5IHRvIGNoYXJnZSBpdCBpZiBpdCBpcyBub3QgYWNoXG4gICAgICAgICAgdGhhdC5jcmVhdGVQYXltZW50TWV0aG9kKHRoYXQuY2FyZE51bWJlckVsZW1lbnQsIGJpbGxpbmdEZXRhaWxzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBpZiBpdCBpcyBhY2gsIHdlIGFscmVhZHkgaGF2ZSBhIHRva2VuIHNvIHN1Ym1pdCB0aGUgZm9ybVxuICAgICAgICAgIC8vIHRvZG86IHVwZ3JhZGUgdGhlIHBsYWlkIGludGVncmF0aW9uXG4gICAgICAgICAgdGhhdC5iYW5rVG9rZW5IYW5kbGVyKCAkKCdpbnB1dFtuYW1lPVwiYmFua1Rva2VuXCJdJykudmFsKCksICdiYW5rX2FjY291bnQnICk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoYXQuc3VibWl0Rm9ybU9ubHkoKTtcbiAgICAgIH1cbiAgICB9LCAvLyBmb3JtUHJvY2Vzc29yXG5cbiAgICBzdHJpcGVFcnJvckRpc3BsYXk6IGZ1bmN0aW9uKGVycm9yLCB0aGlzX3NlbGVjdG9yLCBlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICAvLyBsaXN0ZW4gZm9yIGVycm9ycyBhbmQgZGlzcGxheS9oaWRlIGVycm9yIG1lc3NhZ2VzXG4gICAgICB2YXIgd2hpY2hfZXJyb3IgPSB0aGlzX3NlbGVjdG9yLmF0dHIoJ2lkJyk7XG4gICAgICAvLyB3aGVuIHRoaXMgZmllbGQgY2hhbmdlcywgcmVzZXQgaXRzIGVycm9yc1xuICAgICAgJCgnLmEtY2FyZC1pbnN0cnVjdGlvbi4nICsgd2hpY2hfZXJyb3IpLnJlbW92ZUNsYXNzKCdhLXZhbGlkYXRpb24tZXJyb3InKTtcbiAgICAgICQoJy5hLWNhcmQtaW5zdHJ1Y3Rpb24uJyArIHdoaWNoX2Vycm9yKS5lbXB0eSgpO1xuICAgICAgJCh0aGlzX3NlbGVjdG9yKS5yZW1vdmVDbGFzcygnYS1lcnJvcicpO1xuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIGlmICgkKCcuYS1jYXJkLWluc3RydWN0aW9uLicgKyB3aGljaF9lcnJvcikubGVuZ3RoID4gMCkge1xuICAgICAgICAgICQoJy5hLWNhcmQtaW5zdHJ1Y3Rpb24uJyArIHdoaWNoX2Vycm9yKS50ZXh0KGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXNfc2VsZWN0b3IucGFyZW50KCkuYXBwZW5kKCc8cCBjbGFzcz1cImEtY2FyZC1pbnN0cnVjdGlvbiAnICsgd2hpY2hfZXJyb3IgKyAnXCI+JyArIGVycm9yLm1lc3NhZ2UgKyAnPC9wPicpO1xuICAgICAgICB9XG4gICAgICAgICQoJy5hLWNhcmQtaW5zdHJ1Y3Rpb24uJyArIHdoaWNoX2Vycm9yKS5hZGRDbGFzcygnYS12YWxpZGF0aW9uLWVycm9yJyk7XG4gICAgICAgIHRoaXNfc2VsZWN0b3IucGFyZW50KCkuYWRkQ2xhc3MoJ20taGFzLXZhbGlkYXRpb24tZXJyb3InKTtcbiAgICAgICAgJCh0aGlzX3NlbGVjdG9yKS5hZGRDbGFzcygnYS1lcnJvcicpO1xuICAgICAgICBpZiAodGhpc19zZWxlY3Rvci5wYXJlbnQoKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgICAgc2Nyb2xsVG9wOiB0aGlzX3NlbGVjdG9yLnBhcmVudCgpLm9mZnNldCgpLnRvcFxuICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkKHRoaXNfc2VsZWN0b3IpLnJlbW92ZUNsYXNzKCdhLWVycm9yJyk7XG4gICAgICAgICQoJy5hLWNhcmQtaW5zdHJ1Y3Rpb24uJyArIHdoaWNoX2Vycm9yKS5yZW1vdmVDbGFzcygnYS12YWxpZGF0aW9uLWVycm9yJyk7XG4gICAgICAgICQoJy5hLWNhcmQtaW5zdHJ1Y3Rpb24uJyArIHdoaWNoX2Vycm9yKS5lbXB0eSgpO1xuICAgICAgICAkKG9wdGlvbnMuY2NfbnVtX3NlbGVjdG9yLCBlbGVtZW50KS5yZW1vdmVDbGFzcygnYS12YWxpZGF0aW9uLWVycm9yJyk7XG4gICAgICAgICQob3B0aW9ucy5jY19leHBfc2VsZWN0b3IsIGVsZW1lbnQpLnJlbW92ZUNsYXNzKCdhLXZhbGlkYXRpb24tZXJyb3InKTtcbiAgICAgICAgJChvcHRpb25zLmNjX2N2Y19zZWxlY3RvciwgZWxlbWVudCkucmVtb3ZlQ2xhc3MoJ2EtdmFsaWRhdGlvbi1lcnJvcicpO1xuICAgICAgICAkKG9wdGlvbnMuY2NfbnVtX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnbS1oYXMtdmFsaWRhdGlvbi1lcnJvcicpO1xuICAgICAgICAkKG9wdGlvbnMuY2NfZXhwX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnbS1oYXMtdmFsaWRhdGlvbi1lcnJvcicpO1xuICAgICAgICAkKG9wdGlvbnMuY2NfY3ZjX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnbS1oYXMtdmFsaWRhdGlvbi1lcnJvcicpO1xuICAgICAgfVxuICAgIH0sIC8vIHN0cmlwZUVycm9yRGlzcGxheVxuXG4gICAgcmVzZXRGb3JtRXJyb3JzOiBmdW5jdGlvbihvcHRpb25zLCBlbGVtZW50KSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAkKCcuYS12YWxpZGF0aW9uLWVycm9yJykucmVtb3ZlKCk7XG4gICAgICAkKCdpbnB1dCwgbGFiZWwsIGRpdicsIGVsZW1lbnQpLnJlbW92ZUNsYXNzKCdhLWVycm9yJyk7XG4gICAgICAkKCdsYWJlbCcsIGVsZW1lbnQpLnJlbW92ZUNsYXNzKCdtLWhhcy12YWxpZGF0aW9uLWVycm9yJyk7XG4gICAgICAkKG9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IsIGVsZW1lbnQpLnJlbW92ZUNsYXNzKCdhLWVycm9yIGludmFsaWQnKTtcbiAgICAgICQoJy5hLXZhbGlkYXRpb24tZXJyb3InKS5yZW1vdmUoKTtcbiAgICAgIFxuICAgICAgJChvcHRpb25zLmNob29zZV9wYXltZW50ICsgJyBpbnB1dCcpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgJChvcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yICsgJyAuYS1lcnJvcicpLnJlbW92ZSgpOyAvLyByZW1vdmUgbWV0aG9kIGVycm9yIG1lc3NhZ2UgaWYgaXQgaXMgdGhlcmVcbiAgICAgICAgJChvcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yKS5wYXJlbnQoKS5maW5kKCcuYS12YWxpZGF0aW9uLWVycm9yJykucmVtb3ZlKCk7XG4gICAgICAgIC8vIGlmIGEgcGF5bWVudCBmaWVsZCBjaGFuZ2VkLCByZXNldCB0aGUgYnV0dG9uXG4gICAgICAgIHRoYXQuYnV0dG9uU3RhdHVzKG9wdGlvbnMsICQob3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIGZhbHNlKTtcbiAgICAgIH0pO1xuICAgIH0sIC8vIHJlc2V0Rm9ybUVycm9yc1xuICAgIFxuICAgIGNyZWF0ZU1pbm5Qb3N0QWNjb3VudDogZnVuY3Rpb24ob3B0aW9ucywgZWxlbWVudCkge1xuICAgICAgLy8gMi4gY3JlYXRlIG1pbm5wb3N0IGFjY291bnQgaWYgc3BlY2lmaWVkXG4gICAgICBpZiAob3B0aW9ucy5jcmVhdGVfYWNjb3VudCA9PT0gdHJ1ZSkge1xuICAgICAgICB2YXIgdXNlciA9IHtcbiAgICAgICAgICBlbWFpbDogJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICBmaXJzdF9uYW1lOiAkKG9wdGlvbnMuZmlyc3RfbmFtZV9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgbGFzdF9uYW1lOiAkKG9wdGlvbnMubGFzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICBwYXNzd29yZDogJChvcHRpb25zLnBhc3N3b3JkX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICBjaXR5OiAkKG9wdGlvbnMuYmlsbGluZ19jaXR5X2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICBzdGF0ZTogJChvcHRpb25zLmJpbGxpbmdfc3RhdGVfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgIHppcDogJChvcHRpb25zLmJpbGxpbmdfemlwX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgfTtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICB1cmw6IG9wdGlvbnMubWlubnBvc3Rfcm9vdCArICcvd3AtanNvbi91c2VyLWFjY291bnQtbWFuYWdlbWVudC92MS9jcmVhdGUtdXNlcicsXG4gICAgICAgICAgZGF0YTogdXNlclxuICAgICAgICB9KS5kb25lKGZ1bmN0aW9uKCBkYXRhICkge1xuICAgICAgICAgIGlmIChkYXRhLnN0YXR1cyA9PT0gJ3N1Y2Nlc3MnICYmIGRhdGEucmVhc29uID09PSAnbmV3IHVzZXInKSB7XG4gICAgICAgICAgICAvLyB1c2VyIGNyZWF0ZWQgLSB0aGV5IHNob3VsZCByZWNlaXZlIGVtYWlsXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LCAvLyBjcmVhdGVNaW5uUG9zdEFjY291bnRcbiAgICBcbiAgICBnZW5lcmF0ZUJpbGxpbmdEZXRhaWxzOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBiaWxsaW5nRGV0YWlscyA9IHt9O1xuICAgICAgdmFyIGFkZHJlc3NEZXRhaWxzID0ge307XG5cbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvcikudmFsKCkgIT0gJycpIHtcbiAgICAgICAgYmlsbGluZ0RldGFpbHMuZW1haWwgPSAkKHRoaXMub3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvcikudmFsKCk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIHZhciBmdWxsX25hbWUgPSAnJztcbiAgICAgIGlmICgkKCcjZnVsbF9uYW1lJykubGVuZ3RoID4gMCkge1xuICAgICAgICBmdWxsX25hbWUgPSAkKCcjZnVsbF9uYW1lJykudmFsKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmdWxsX25hbWUgPSAkKHRoaXMub3B0aW9ucy5maXJzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yKS52YWwoKSArICcgJyArICQodGhpcy5vcHRpb25zLmxhc3RfbmFtZV9maWVsZF9zZWxlY3RvcikudmFsKCk7XG4gICAgICB9XG4gICAgICBiaWxsaW5nRGV0YWlscy5uYW1lID0gZnVsbF9uYW1lO1xuXG4gICAgICB2YXIgc3RyZWV0ID0gJ05vbmUnO1xuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmJpbGxpbmdfc3RyZWV0X2ZpZWxkX3NlbGVjdG9yKS52YWwoKSAhPSAnJykge1xuICAgICAgICBzdHJlZXQgPSAkKHRoaXMub3B0aW9ucy5iaWxsaW5nX3N0cmVldF9maWVsZF9zZWxlY3RvcikudmFsKCk7XG4gICAgICAgIGFkZHJlc3NEZXRhaWxzLmxpbmUxID0gc3RyZWV0O1xuICAgICAgfVxuXG4gICAgICB2YXIgY2l0eSA9ICdOb25lJztcbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5iaWxsaW5nX2NpdHlfZmllbGRfc2VsZWN0b3IpLnZhbCgpICE9ICcnKSB7XG4gICAgICAgIGNpdHkgPSAkKHRoaXMub3B0aW9ucy5iaWxsaW5nX2NpdHlfZmllbGRfc2VsZWN0b3IpLnZhbCgpO1xuICAgICAgICBhZGRyZXNzRGV0YWlscy5jaXR5ID0gY2l0eTtcbiAgICAgIH1cblxuICAgICAgdmFyIHN0YXRlID0gJ05vbmUnO1xuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmJpbGxpbmdfc3RhdGVfZmllbGRfc2VsZWN0b3IpLnZhbCgpICE9ICcnKSB7XG4gICAgICAgIHN0YXRlID0gJCh0aGlzLm9wdGlvbnMuYmlsbGluZ19zdGF0ZV9maWVsZF9zZWxlY3RvcikudmFsKCk7XG4gICAgICAgIGFkZHJlc3NEZXRhaWxzLnN0YXRlID0gc3RhdGU7XG4gICAgICB9XG5cbiAgICAgIHZhciB6aXAgPSAnTm9uZSc7XG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuYmlsbGluZ196aXBfZmllbGRfc2VsZWN0b3IpLnZhbCgpICE9ICcnKSB7XG4gICAgICAgIHppcCA9ICQodGhpcy5vcHRpb25zLmJpbGxpbmdfemlwX2ZpZWxkX3NlbGVjdG9yKS52YWwoKTtcbiAgICAgICAgYWRkcmVzc0RldGFpbHMucG9zdGFsX2NvZGUgPSB6aXA7XG4gICAgICB9XG5cbiAgICAgIHZhciBjb3VudHJ5ID0gJ1VTJztcbiAgICAgIHZhciBjb3VudHJ5X2ZpZWxkX3ZhbHVlID0gJCh0aGlzLm9wdGlvbnMuYmlsbGluZ19jb3VudHJ5X2ZpZWxkX3NlbGVjdG9yKS52YWwoKTtcbiAgICAgIGlmIChjb3VudHJ5X2ZpZWxkX3ZhbHVlICE9ICcnICYmIGNvdW50cnlfZmllbGRfdmFsdWUgIT0gJ1VuaXRlZCBTdGF0ZXMnKSB7XG4gICAgICAgIGNvdW50cnkgPSBjb3VudHJ5X2ZpZWxkX3ZhbHVlO1xuICAgICAgfVxuICAgICAgYWRkcmVzc0RldGFpbHMuY291bnRyeSA9IGNvdW50cnk7XG5cbiAgICAgIGlmIChzdHJlZXQgIT09ICdOb25lJyB8fCBjaXR5ICE9PSAnTm9uZScgfHwgc3RhdGUgIT09ICdOb25lJyB8fCB6aXAgIT09ICdOb25lJykge1xuICAgICAgICBiaWxsaW5nRGV0YWlscy5hZGRyZXNzID0gYWRkcmVzc0RldGFpbHM7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBiaWxsaW5nRGV0YWlscztcbiAgICB9LCAvLyBnZW5lcmF0ZUJpbGxpbmdEZXRhaWxzXG5cbiAgICBjcmVhdGVQYXltZW50TWV0aG9kOiBmdW5jdGlvbihjYXJkRWxlbWVudCwgYmlsbGluZ0RldGFpbHMpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHRoYXQuc3RyaXBlLmNyZWF0ZVBheW1lbnRNZXRob2Qoe1xuICAgICAgICB0eXBlOiAnY2FyZCcsXG4gICAgICAgIGNhcmQ6IGNhcmRFbGVtZW50LFxuICAgICAgICBiaWxsaW5nX2RldGFpbHM6IGJpbGxpbmdEZXRhaWxzXG4gICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgIGlmIChyZXNwb25zZS5lcnJvcikge1xuICAgICAgICAgIHRoYXQuaGFuZGxlU2VydmVyRXJyb3IocmVzcG9uc2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFNlbmQgcGF5bWVudE1ldGhvZC5pZCB0byBzZXJ2ZXJcbiAgICAgICAgICB2YXIgc3VwcG9ydGZvcm0gPSAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3Rvcik7XG4gICAgICAgICAgdmFyIGFqYXhfdXJsID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xuICAgICAgICAgIHZhciB0b2tlbkZpZWxkTmFtZSA9ICdwYXltZW50X21ldGhvZF9pZCc7XG4gICAgICAgICAgdmFyIHRva2VuRmllbGQgPSAnaW5wdXRbbmFtZT1cIicgKyB0b2tlbkZpZWxkTmFtZSArICdcIl0nO1xuXG4gICAgICAgICAgLy8gSW5zZXJ0IHRoZSBwYXltZW50IG1ldGhvZCBJRCBpbnRvIHRoZSBmb3JtIHNvIGl0IGdldHMgc3VibWl0dGVkIHRvIHRoZSBzZXJ2ZXJcbiAgICAgICAgICBpZiAoJCh0b2tlbkZpZWxkKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAkKHRva2VuRmllbGQpLnZhbChyZXNwb25zZS5wYXltZW50TWV0aG9kLmlkKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3VwcG9ydGZvcm0uYXBwZW5kKCQoJzxpbnB1dCB0eXBlPVxcXCJoaWRkZW5cXFwiIG5hbWU9XCInICsgdG9rZW5GaWVsZE5hbWUgKyAnXCI+JykudmFsKHJlc3BvbnNlLnBheW1lbnRNZXRob2QuaWQpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmZXRjaChhamF4X3VybCwge1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJvZHk6ICQoc3VwcG9ydGZvcm0pLnNlcmlhbGl6ZSgpXG4gICAgICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgLy8gSGFuZGxlIHNlcnZlciByZXNwb25zZSAoc2VlIFN0ZXAgMylcbiAgICAgICAgICAgIHJlc3BvbnNlLmpzb24oKS50aGVuKGZ1bmN0aW9uKGpzb24pIHtcbiAgICAgICAgICAgICAgdGhhdC5oYW5kbGVTZXJ2ZXJSZXNwb25zZShqc29uKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sIC8vIGNyZWF0ZVBheW1lbnRNZXRob2RcblxuICAgIGJhbmtUb2tlbkhhbmRsZXI6IGZ1bmN0aW9uKHRva2VuLCB0eXBlKSB7XG4gICAgICB0aGlzLnNldFN0cmlwZVBheW1lbnRUeXBlKHR5cGUpO1xuICAgICAgdGhpcy5zdWJtaXRGb3JtT25seSgpO1xuICAgIH0sIC8vIGJhbmtUb2tlbkhhbmRsZXJcblxuICAgIHN1Ym1pdEZvcm1Pbmx5OiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHZhciBzdXBwb3J0Zm9ybSA9ICQodGhpcy5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKTtcbiAgICAgIHZhciBhamF4X3VybCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcblxuICAgICAgLy8gU3VibWl0IHRoZSBmb3JtXG4gICAgICAvLyB0aGUgd2F5IGl0IHdvcmtzIGN1cnJlbnRseSBpcyB0aGUgZm9ybSBzdWJtaXRzIGFuIGFqYXggcmVxdWVzdCB0byBpdHNlbGZcbiAgICAgIC8vIHRoZW4gaXQgc3VibWl0cyBhIHBvc3QgcmVxdWVzdCB0byB0aGUgZm9ybSdzIGFjdGlvbiB1cmxcbiAgICAgICQuYWpheCh7XG4gICAgICAgIHVybDogYWpheF91cmwsXG4gICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgZGF0YTogJChzdXBwb3J0Zm9ybSkuc2VyaWFsaXplKCksXG4gICAgICAgIHR5cGU6ICdQT1NUJ1xuICAgICAgfSlcbiAgICAgIC5kb25lKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVzcG9uc2UuZXJyb3JzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIHRoYXQuaGFuZGxlU2VydmVyRXJyb3IocmVzcG9uc2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN1cHBvcnRmb3JtLmdldCgwKS5zdWJtaXQoKTsgLy8gY29udGludWUgc3VibWl0dGluZyB0aGUgZm9ybSBpZiB0aGUgYWpheCB3YXMgc3VjY2Vzc2Z1bFxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLmZhaWwoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoYXQuYnV0dG9uU3RhdHVzKHRoYXQub3B0aW9ucywgJCh0aGF0Lm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLmZpbmQoJ2J1dHRvbicpLCBmYWxzZSk7XG4gICAgICB9KTtcbiAgICB9LCAvLyBzdWJtaXRGb3JtT25seVxuXG4gICAgaGFuZGxlU2VydmVyUmVzcG9uc2U6IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICB2YXIgc3VwcG9ydGZvcm0gPSAkKHRoaXMub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3Rvcik7XG4gICAgICBpZiAocmVzcG9uc2UuZXJyb3JzKSB7XG4gICAgICAgIC8vIFNob3cgZXJyb3IgZnJvbSBzZXJ2ZXIgb24gcGF5bWVudCBmb3JtXG4gICAgICAgIHRoaXMuaGFuZGxlU2VydmVyRXJyb3IocmVzcG9uc2UpO1xuICAgICAgfSBlbHNlIGlmIChyZXNwb25zZS5yZXF1aXJlc19hY3Rpb24pIHtcbiAgICAgICAgLy8gVXNlIFN0cmlwZS5qcyB0byBoYW5kbGUgcmVxdWlyZWQgY2FyZCBhY3Rpb25cbiAgICAgICAgLy9oYW5kbGVBY3Rpb24ocmVzcG9uc2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3VwcG9ydGZvcm0uZ2V0KDApLnN1Ym1pdCgpOyAvLyBjb250aW51ZSBzdWJtaXR0aW5nIHRoZSBmb3JtIGlmIHRoZSBhamF4IHdhcyBzdWNjZXNzZnVsXG4gICAgICB9XG4gICAgfSwgLy8gaGFuZGxlU2VydmVyUmVzcG9uc2VcblxuICAgIGhhbmRsZVNlcnZlckVycm9yOiBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdmFyIHRoaXNfZmllbGQgPSAnJztcbiAgICAgIC8vIGRvIG5vdCBzdWJtaXQuIHRoZXJlIGlzIGFuIGVycm9yLlxuICAgICAgdGhhdC5idXR0b25TdGF0dXModGhhdC5vcHRpb25zLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIGZhbHNlKTtcbiAgICAgIC8vIGhhbmRsZSBlcnJvciBkaXNwbGF5XG4gICAgICBpZiAodHlwZW9mIHJlc3BvbnNlLmVycm9ycyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgaWYgKHR5cGVvZiByZXNwb25zZS5lcnJvcnNbMF0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgdGhpc19maWVsZCA9IHJlc3BvbnNlLmVycm9yc1swXS5maWVsZCArICdfZmllbGRfc2VsZWN0b3InO1xuICAgICAgICB9XG4gICAgICAgICQuZWFjaChyZXNwb25zZS5lcnJvcnMsIGZ1bmN0aW9uKCBpbmRleCwgZXJyb3IgKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBlcnJvci5maWVsZCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRoaXNfZmllbGQgPSBlcnJvci5maWVsZCArICdfZmllbGRfc2VsZWN0b3InO1xuICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGVycm9yLnBhcmFtICE9PSAndW5kZWZpbmVkJyAmJiBlcnJvci5wYXJhbSAhPT0gJycpIHtcbiAgICAgICAgICAgIHRoaXNfZmllbGQgPSAnY2NfJyArIGVycm9yLnBhcmFtICsgJ19zZWxlY3Rvcic7ICBcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhhdC5kaXNwbGF5RXJyb3JNZXNzYWdlKGVycm9yLCB0aGlzX2ZpZWxkKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiByZXNwb25zZS5lcnJvciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdmFyIGVycm9yID0gcmVzcG9uc2UuZXJyb3I7XG4gICAgICAgIGlmICh0eXBlb2YgZXJyb3IuZmllbGQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgdGhpc19maWVsZCA9IGVycm9yLmZpZWxkICsgJ19maWVsZF9zZWxlY3Rvcic7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGVycm9yLnBhcmFtICE9PSAndW5kZWZpbmVkJyAmJiBlcnJvci5wYXJhbSAhPT0gJycpIHtcbiAgICAgICAgICB0aGlzX2ZpZWxkID0gJ2NjXycgKyBlcnJvci5wYXJhbSArICdfc2VsZWN0b3InOyAgXG4gICAgICAgIH1cbiAgICAgICAgdGhhdC5kaXNwbGF5RXJyb3JNZXNzYWdlKGVycm9yLCB0aGlzX2ZpZWxkKTtcbiAgICAgIH1cbiAgICAgIGlmICgkKHRoYXQub3B0aW9uc1t0aGlzX2ZpZWxkXSkubGVuZ3RoID4gMCkge1xuICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgc2Nyb2xsVG9wOiAkKHRoYXQub3B0aW9uc1t0aGlzX2ZpZWxkXSkucGFyZW50KCkub2Zmc2V0KCkudG9wXG4gICAgICAgIH0sIDIwMDApO1xuICAgICAgfVxuICAgIH0sIC8vIGhhbmRsZVNlcnZlckVycm9yXG5cbiAgICBkaXNwbGF5RXJyb3JNZXNzYWdlKGVycm9yLCBmaWVsZCkge1xuICAgICAgdmFyIG1lc3NhZ2UgPSAnJztcbiAgICAgIHZhciBzdHJpcGVFcnJvclNlbGVjdG9yID0gJyc7XG4gICAgICB2YXIgZmllbGRQYXJlbnQgPSAkKHRoaXMub3B0aW9uc1tmaWVsZF0pLnBhcmVudCgpO1xuICAgICAgaWYgKHR5cGVvZiBlcnJvci5tZXNzYWdlID09PSAnc3RyaW5nJykge1xuICAgICAgICBtZXNzYWdlID0gZXJyb3IubWVzc2FnZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlWzBdO1xuICAgICAgfVxuICAgICAgaWYgKCQodGhpcy5vcHRpb25zW2ZpZWxkXSkubGVuZ3RoID4gMCkge1xuICAgICAgICAkKHRoaXMub3B0aW9uc1tmaWVsZF0pLmFkZENsYXNzKCdhLWVycm9yJyk7XG4gICAgICAgICQodGhpcy5vcHRpb25zW2ZpZWxkXSkucHJldigpLmFkZENsYXNzKCdhLWVycm9yJyk7XG4gICAgICAgIGlmICgkKCcuYS1jYXJkLWluc3RydWN0aW9uJywgZmllbGRQYXJlbnQpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAkKCcuYS1jYXJkLWluc3RydWN0aW9uJywgZmllbGRQYXJlbnQpLmFkZENsYXNzKCdhLXZhbGlkYXRpb24tZXJyb3InKTtcbiAgICAgICAgICAkKCcuYS1jYXJkLWluc3RydWN0aW9uJywgZmllbGRQYXJlbnQpLnRleHQobWVzc2FnZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJCh0aGlzLm9wdGlvbnNbZmllbGRdKS5hZnRlcignPHAgY2xhc3M9XCJhLWNhcmQtaW5zdHJ1Y3Rpb24gYS12YWxpZGF0aW9uLWVycm9yXCI+JyArIG1lc3NhZ2UgKyAnPC9wPicpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBlcnJvciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhpcy5idXR0b25TdGF0dXModGhpcy5vcHRpb25zLCAkKHRoaXMub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIGZhbHNlKTtcbiAgICAgICAgaWYgKGVycm9yLmNvZGUgPT09ICdpbmNvbXBsZXRlX251bWJlcicgfHwgZXJyb3IuY29kZSA9PSAnaW52YWxpZF9udW1iZXInIHx8IGVycm9yLmNvZGUgPT0gJ2luY29ycmVjdF9udW1iZXInIHx8IGVycm9yLmNvZGUgPT0gJ2NhcmRfZGVjbGluZWQnIHx8IGVycm9yLmNvZGUgPT0gJ3Byb2Nlc3NpbmdfZXJyb3InKSB7XG4gICAgICAgICAgLy8gZXJyb3IgaGFuZGxpbmdcbiAgICAgICAgICBzdHJpcGVFcnJvclNlbGVjdG9yID0gJCh0aGlzLm9wdGlvbnMuY2NfbnVtX3NlbGVjdG9yKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXJyb3IuY29kZSA9PSAnaW52YWxpZF9leHBpcnlfbW9udGgnIHx8IGVycm9yLmNvZGUgPT0gJ2ludmFsaWRfZXhwaXJ5X3llYXInIHx8IGVycm9yLmNvZGUgPT0gJ2V4cGlyZWRfY2FyZCcpIHtcbiAgICAgICAgICAvLyBlcnJvciBoYW5kbGluZ1xuICAgICAgICAgIHN0cmlwZUVycm9yU2VsZWN0b3IgPSAkKHRoaXMub3B0aW9ucy5jY19leHBfc2VsZWN0b3IpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJvci5jb2RlID09ICdpbnZhbGlkX2N2YycgfHwgZXJyb3IuY29kZSA9PSAnaW5jb3JyZWN0X2N2YycpIHtcbiAgICAgICAgICAvLyBlcnJvciBoYW5kbGluZ1xuICAgICAgICAgIHN0cmlwZUVycm9yU2VsZWN0b3IgPSAkKHRoaXMub3B0aW9ucy5jY19jdmNfc2VsZWN0b3IpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJvci5jb2RlID09ICdlbWFpbF9pbnZhbGlkJykge1xuICAgICAgICAgIC8vIGVycm9yIGhhbmRsaW5nXG4gICAgICAgICAgc3RyaXBlRXJyb3JTZWxlY3RvciA9ICQodGhpcy5vcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RyaXBlRXJyb3JTZWxlY3RvciAhPT0gJycpIHtcbiAgICAgICAgICB0aGlzLnN0cmlwZUVycm9yRGlzcGxheShlcnJvciwgc3RyaXBlRXJyb3JTZWxlY3RvciwgdGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXJyb3IudHlwZSA9PSAnbWlzc2luZ19wYXltZW50JyAmJiBzdHJpcGVFcnJvclNlbGVjdG9yID09PSAnJykge1xuICAgICAgICAgICQodGhpcy5vcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yICsgJy5hY3RpdmUnKS5hcHBlbmQoJzxwIGNsYXNzPVwiYS1mb3JtLWNhcHRpb24gYS12YWxpZGF0aW9uLWVycm9yIGEtbWlzc2luZy1wYXltZW50LWVycm9yXCI+JyArIGVycm9yLm1lc3NhZ2UgKyAnPC9wPicpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9yLmZpZWxkID09ICdyZWNhcHRjaGEnKSB7XG4gICAgICAgICAgJCh0aGlzLm9wdGlvbnMucGF5X2J1dHRvbl9zZWxlY3RvcikuYmVmb3JlKCc8cCBjbGFzcz1cImEtZm9ybS1jYXB0aW9uIGEtdmFsaWRhdGlvbi1lcnJvciBhLXJlY2FwdGNoYS1lcnJvclwiPicgKyBtZXNzYWdlICsgJzwvcD4nKVxuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJvci50eXBlID09ICdpbnZhbGlkX3JlcXVlc3RfZXJyb3InICYmIHN0cmlwZUVycm9yU2VsZWN0b3IgPT09ICcnKSB7XG4gICAgICAgICAgJCh0aGlzLm9wdGlvbnMucGF5X2J1dHRvbl9zZWxlY3RvcikuYmVmb3JlKCc8cCBjbGFzcz1cImEtZm9ybS1jYXB0aW9uIGEtdmFsaWRhdGlvbi1lcnJvciBhLWludmFsaWQtcmVxdWVzdC1lcnJvclwiPicgKyBlcnJvci5tZXNzYWdlICsgJzwvcD4nKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwgLy8gZGlzcGxheUVycm9yTWVzc2FnZVxuXG4gICAgc2hvd05ld3NsZXR0ZXJTZXR0aW5nczogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuXG4gICAgICB2YXIgbmV3c2xldHRlcl9ncm91cF9odG1sID0gJyc7XG4gICAgICBpZiAoJChvcHRpb25zLm5ld3NsZXR0ZXJfZ3JvdXBfc2VsZWN0b3IpLmxlbmd0aCA+IDAgKSB7XG4gICAgICAgIHZhciBnZXRfZGF0YSA9IHtcbiAgICAgICAgICBzaG9ydGNvZGU6ICduZXdzbGV0dGVyX2Zvcm0nLFxuICAgICAgICAgIHBsYWNlbWVudDogJ3VzZXJhY2NvdW50J1xuICAgICAgICB9O1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgdXJsOiBvcHRpb25zLm1pbm5wb3N0X3Jvb3QgKyAnL3dwLWpzb24vbWlubnBvc3QtYXBpL3YyL21haWxjaGltcC9mb3JtJyxcbiAgICAgICAgICBkYXRhOiBnZXRfZGF0YVxuICAgICAgICB9KS5kb25lKGZ1bmN0aW9uKCByZXN1bHQgKSB7XG4gICAgICAgICAgaWYgKCB0eXBlb2YgcmVzdWx0Lmdyb3VwX2ZpZWxkcyAhPT0gJ3VuZGVmaW5lZCcgKSB7XG4gICAgICAgICAgICAkLmVhY2gocmVzdWx0Lmdyb3VwX2ZpZWxkcywgZnVuY3Rpb24oIGluZGV4LCBjYXRlZ29yeSApIHtcbiAgICAgICAgICAgICAgbmV3c2xldHRlcl9ncm91cF9odG1sICs9ICc8ZmllbGRzZXQgY2xhc3M9XCJtLWZvcm0taXRlbSBzdXBwb3J0LW5ld3NsZXR0ZXIgbS1mb3JtLWl0ZW0tJyArIGNhdGVnb3J5LnR5cGUgKyAnXCI+JztcbiAgICAgICAgICAgICAgbmV3c2xldHRlcl9ncm91cF9odG1sICs9ICc8bGFiZWw+JyArIGNhdGVnb3J5Lm5hbWUgKyAnOjwvbGFiZWw+JztcbiAgICAgICAgICAgICAgaWYgKCBjYXRlZ29yeS5jb250YWlucy5sZW5ndGggPiAwICkge1xuICAgICAgICAgICAgICAgIG5ld3NsZXR0ZXJfZ3JvdXBfaHRtbCArPSAnPGRpdiBjbGFzcz1cIm0tZm9ybS1pdGVtIG0tZm9ybS1pdGVtLW5ld3NsZXR0ZXJcIj4nO1xuICAgICAgICAgICAgICAgICQuZWFjaChjYXRlZ29yeVtjYXRlZ29yeS5jb250YWluc10sIGZ1bmN0aW9uKCBpbmRleCwgaXRlbSApIHtcbiAgICAgICAgICAgICAgICAgIG5ld3NsZXR0ZXJfZ3JvdXBfaHRtbCArPSAnPGxhYmVsPjxpbnB1dCBuYW1lPVwiZ3JvdXBzX3N1Ym1pdHRlZFwiIHR5cGU9XCJjaGVja2JveFwiIHZhbHVlPVwiJyArIGl0ZW0uaWQgKyAnXCI+JyArIGl0ZW0ubmFtZSArICc8L2xhYmVsPic7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbmV3c2xldHRlcl9ncm91cF9odG1sICs9ICc8L2Rpdj4nO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIG5ld3NsZXR0ZXJfZ3JvdXBfaHRtbCArPSAnPC9maWVsZHNldD4nO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkKG9wdGlvbnMubmV3c2xldHRlcl9ncm91cF9zZWxlY3RvcikuaHRtbChuZXdzbGV0dGVyX2dyb3VwX2h0bWwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmICgkKG9wdGlvbnMubmV3c2xldHRlcl9ncm91cF9zZWxlY3RvcikubGVuZ3RoID4gMCAmJiB0eXBlb2YgJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdmFyIGdldF9kYXRhID0ge1xuICAgICAgICAgIGVtYWlsOiAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpXG4gICAgICAgIH07XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICB1cmw6IG9wdGlvbnMubWlubnBvc3Rfcm9vdCArICcvd3AtanNvbi9taW5ucG9zdC1hcGkvdjIvbWFpbGNoaW1wL3VzZXInLFxuICAgICAgICAgIGRhdGE6IGdldF9kYXRhXG4gICAgICAgIH0pLmRvbmUoZnVuY3Rpb24oIHJlc3VsdCApIHtcbiAgICAgICAgICBpZiAoIHR5cGVvZiByZXN1bHQubWFpbGNoaW1wX3N0YXR1cyAhPT0gJ3VuZGVmaW5lZCcgKSB7XG4gICAgICAgICAgICAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLmFmdGVyKCc8aW5wdXQgbmFtZT1cIm1haWxjaGltcF9zdGF0dXNcIiB0eXBlPVwiaGlkZGVuXCIgdmFsdWU9XCInICsgcmVzdWx0Lm1haWxjaGltcF9zdGF0dXMgKyAnXCI+Jyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICggdHlwZW9mIHJlc3VsdC5tYWlsY2hpbXBfdXNlcl9pZCAhPT0gJ3VuZGVmaW5lZCcgKSB7XG4gICAgICAgICAgICAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLmFmdGVyKCc8aW5wdXQgbmFtZT1cIm1haWxjaGltcF91c2VyX2lkXCIgdHlwZT1cImhpZGRlblwiIHZhbHVlPVwiJyArIHJlc3VsdC5tYWlsY2hpbXBfdXNlcl9pZCArICdcIj4nKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHJlc3VsdC5tYWlsY2hpbXBfc3RhdHVzID09PSAnc3Vic2NyaWJlZCcpIHtcbiAgICAgICAgICAgIC8vIHVzZXIgY3JlYXRlZCAtIHNob3cgYSBzdWNjZXNzIG1lc3NhZ2VcbiAgICAgICAgICAgICQoJy5hLWNvbmZpcm0taW5zdHJ1Y3Rpb25zJykudGV4dCgkKCcuYS1jb25maXJtLWluc3RydWN0aW9ucycpLmF0dHIoJ2RhdGEta25vd24tdXNlcicpKTtcbiAgICAgICAgICAgIHZhciBncm91cHMgPSByZXN1bHQuZ3JvdXBzO1xuICAgICAgICAgICAgJC5lYWNoKGdyb3VwcywgZnVuY3Rpb24oIGluZGV4LCB2YWx1ZSApIHtcbiAgICAgICAgICAgICAgaWYgKCB2YWx1ZSA9PT0gdHJ1ZSApIHtcbiAgICAgICAgICAgICAgICAkKCc6Y2hlY2tib3hbdmFsdWU9XCInICsgaW5kZXggKyAnXCJdJykucHJvcCgnY2hlY2tlZCcsdHJ1ZSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJCgnOmNoZWNrYm94W3ZhbHVlPVwiJyArIGluZGV4ICsgJ1wiXScpLnByb3AoJ2NoZWNrZWQnLGZhbHNlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgIH0sIC8vIHNob3dOZXdzbGV0dGVyU2V0dGluZ3NcblxuICAgIGNvbmZpcm1NZXNzYWdlU3VibWl0OiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG5cbiAgICAgIHZhciBleGlzdGluZ19uZXdzbGV0dGVyX3NldHRpbmdzID0gJChvcHRpb25zLm5ld3NsZXR0ZXJfZ3JvdXBfc2VsZWN0b3IgKyAnIGlucHV0Jykuc2VyaWFsaXplKCk7XG4gICAgICAvL3RoaXMuZGVidWcoZXhpc3RpbmdfbmV3c2xldHRlcl9zZXR0aW5ncyk7XG5cbiAgICAgICQob3B0aW9ucy5jb25maXJtX2Zvcm1fc2VsZWN0b3IpLnN1Ym1pdChmdW5jdGlvbihldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIHZhciBjb25maXJtZm9ybSA9ICQob3B0aW9ucy5jb25maXJtX2Zvcm1fc2VsZWN0b3IpO1xuICAgICAgICAvLyBzdWJtaXQgc2V0dGluZ3MgdG8gbWFpbGNoaW1wXG4gICAgICAgIC8vIG5lZWQgdG8gZ2V0IHVzZXIgaW5mbyBvbiBhIGhpZGRlbiBmaWVsZCBoZXJlXG5cbiAgICAgICAgdmFyIG5ld3NsZXR0ZXJfZ3JvdXBzID0gJChvcHRpb25zLm5ld3NsZXR0ZXJfZ3JvdXBfc2VsZWN0b3IgKyAnIGlucHV0OmNoZWNrZWQnKTtcbiAgICAgICAgdmFyIG5ld19uZXdzbGV0dGVyX3NldHRpbmdzID0gbmV3c2xldHRlcl9ncm91cHMuc2VyaWFsaXplKCk7XG5cbiAgICAgICAgaWYgKChleGlzdGluZ19uZXdzbGV0dGVyX3NldHRpbmdzICE9PSBuZXdfbmV3c2xldHRlcl9zZXR0aW5ncykgJiYgKHR5cGVvZiBuZXdzbGV0dGVyX2dyb3VwcyAhPT0gJ3VuZGVmaW5lZCcpKSB7XG4gICAgICAgICAgLy9hZGQgb3VyIG93biBhamF4IGNoZWNrIGFzIFgtUmVxdWVzdGVkLVdpdGggaXMgbm90IGFsd2F5cyByZWxpYWJsZVxuICAgICAgICAgIC8vYWpheF9mb3JtX2RhdGEgPSBuZXdfbmV3c2xldHRlcl9zZXR0aW5ncyArICcmYWpheHJlcXVlc3Q9dHJ1ZSZzdWJzY3JpYmUnO1xuXG4gICAgICAgICAgdmFyIHBvc3RfZGF0YSA9IHtcbiAgICAgICAgICAgIGVtYWlsOiAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgICAgZmlyc3RfbmFtZTogJChvcHRpb25zLmZpcnN0X25hbWVfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgICAgbGFzdF9uYW1lOiAkKG9wdGlvbnMubGFzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICAgIGdyb3Vwc19zdWJtaXR0ZWQ6IHt9XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHBvc3RfZGF0YS5ncm91cHNfYXZhaWxhYmxlID0gJ2FsbCc7XG5cbiAgICAgICAgICBpZiAoICQoJ2lucHV0W25hbWU9XCJtYWlsY2hpbXBfc3RhdHVzXCJdJykubGVuZ3RoID4gMCApIHtcbiAgICAgICAgICAgIHBvc3RfZGF0YS5tYWlsY2hpbXBfc3RhdHVzID0gJCgnaW5wdXRbbmFtZT1cIm1haWxjaGltcF9zdGF0dXNcIl0nKS52YWwoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoICQoJ2lucHV0W25hbWU9XCJtYWlsY2hpbXBfdXNlcl9pZFwiXScpLmxlbmd0aCA+IDAgKSB7XG4gICAgICAgICAgICBwb3N0X2RhdGEubWFpbGNoaW1wX3VzZXJfaWQgPSAkKCdpbnB1dFtuYW1lPVwibWFpbGNoaW1wX3VzZXJfaWRcIl0nKS52YWwoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodHlwZW9mIG5ld3NsZXR0ZXJfZ3JvdXBzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgJC5lYWNoKG5ld3NsZXR0ZXJfZ3JvdXBzLCBmdW5jdGlvbihpbmRleCwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgdmFyIGdyb3VwID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgICAgICAgcG9zdF9kYXRhLmdyb3Vwc19zdWJtaXR0ZWRbaW5kZXhdID0gZ3JvdXA7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBvcHRpb25zLm1pbm5wb3N0X3Jvb3QgKyAnL3dwLWpzb24vbWlubnBvc3QtYXBpL3YyL21haWxjaGltcC91c2VyJyxcbiAgICAgICAgICAgIHR5cGU6ICdwb3N0JyxcbiAgICAgICAgICAgIGRhdGFUeXBlIDogJ2pzb24nLFxuICAgICAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04JyxcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHBvc3RfZGF0YSlcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5kb25lKGZ1bmN0aW9uKHJlc3BvbnNlKSB7IC8vIHJlc3BvbnNlIGZyb20gdGhlIFBIUCBhY3Rpb25cbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gJyc7XG4gICAgICAgICAgICBpZiAoIHJlc3BvbnNlLnN1Y2Nlc3MgPT09IHRydWUgKSB7XG4gICAgICAgICAgICAgIC8qc3dpdGNoIChyZXNwb25zZS5kYXRhLnVzZXJfc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnZXhpc3RpbmcnOlxuICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9ICdUaGFua3MgZm9yIHVwZGF0aW5nIHlvdXIgZW1haWwgcHJlZmVyZW5jZXMuIFRoZXkgd2lsbCBnbyBpbnRvIGVmZmVjdCBpbW1lZGlhdGVseS4nO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbmV3JzpcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnV2UgaGF2ZSBhZGRlZCB5b3UgdG8gdGhlIE1pbm5Qb3N0IG1haWxpbmcgbGlzdC4nO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncGVuZGluZyc6XG4gICAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ1dlIGhhdmUgYWRkZWQgeW91IHRvIHRoZSBNaW5uUG9zdCBtYWlsaW5nIGxpc3QuIFlvdSB3aWxsIG5lZWQgdG8gY2xpY2sgdGhlIGNvbmZpcm1hdGlvbiBsaW5rIGluIHRoZSBlbWFpbCB3ZSBzZW50IHRvIGJlZ2luIHJlY2VpdmluZyBtZXNzYWdlcy4nO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH0qL1xuICAgICAgICAgICAgICAvL2NvbmZpcm1mb3JtLmdldCgwKS5zdWJtaXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbmZpcm1mb3JtLmdldCgwKS5zdWJtaXQoKTtcbiAgICAgICAgICAgIC8vJCgnLm0taG9sZC1tZXNzYWdlJykuaHRtbCgnPGRpdiBjbGFzcz1cIm0tZm9ybS1tZXNzYWdlIG0tZm9ybS1tZXNzYWdlLWluZm9cIj4nICsgbWVzc2FnZSArICc8L2Rpdj4nKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAvLyB3ZSBzaG91bGQgcHV0IGFuIGFjdHVhbCBlcnJvciBtZXNzYWdlIGhlcmUgc29tZWRheSwgcHJvYmFibHlcbiAgICAgICAgICAgIC8vJCgnLm0taG9sZC1tZXNzYWdlJykuaHRtbCgnPGRpdiBjbGFzcz1cIm0tZm9ybS1tZXNzYWdlIG0tZm9ybS1tZXNzYWdlLWluZm9cIj5BbiBlcnJvciBoYXMgb2NjdXJlZC4gUGxlYXNlIHRyeSBhZ2Fpbi48L2Rpdj4nKTtcbiAgICAgICAgICAgIGNvbmZpcm1mb3JtLmdldCgwKS5zdWJtaXQoKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICB9IGVsc2UgeyAvLyBlbmQgcGFydCB3aGVyZSBzZXR0aW5ncyBjaGFuZ2VkXG4gICAgICAgICAgY29uZmlybWZvcm0uZ2V0KDApLnN1Ym1pdCgpO1xuICAgICAgICB9XG5cbiAgICAgIH0pO1xuICAgICAgLy9yZXR1cm4gZmFsc2U7XG4gICAgfSwgLy8gY29uZmlybU1lc3NhZ2VTdWJtaXRcblxuICB9OyAvLyBwbHVnaW4ucHJvdG90eXBlXG5cbiAgLy8gQSByZWFsbHkgbGlnaHR3ZWlnaHQgcGx1Z2luIHdyYXBwZXIgYXJvdW5kIHRoZSBjb25zdHJ1Y3RvcixcbiAgLy8gcHJldmVudGluZyBhZ2FpbnN0IG11bHRpcGxlIGluc3RhbnRpYXRpb25zXG4gICQuZm5bcGx1Z2luTmFtZV0gPSBmdW5jdGlvbiAoIG9wdGlvbnMgKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoISQuZGF0YSh0aGlzLCAncGx1Z2luXycgKyBwbHVnaW5OYW1lKSkge1xuICAgICAgICAkLmRhdGEodGhpcywgJ3BsdWdpbl8nICsgcGx1Z2luTmFtZSwgbmV3IFBsdWdpbiggdGhpcywgb3B0aW9ucyApKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxufSkoIGpRdWVyeSwgd2luZG93LCBkb2N1bWVudCApOyJdfQ==
}(jQuery));
