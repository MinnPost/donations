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
      }); // use a referrer for edit link if we have one

      if (document.referrer !== '') {
        $('#edit_url').prop('href', document.referrer);
      }

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
      var progress = $(options.progress_selector);
      var step;
      var nav_item_count = 0;
      var opp_id = $(options.opp_id_selector).val();
      var post_purchase = false;

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
        step = 'purchase';
      } else if (progress.length === 0) {
        return;
      }

      this.debug('step is ' + step + ' and nav item count is ' + nav_item_count + ' and opp id is ' + opp_id + ' and post purchase is ' + post_purchase);
      this.analyticsTrackingStep(step, post_purchase);
    },
    // analyticsTracking
    analyticsTrackingStep: function analyticsTrackingStep(step, post_purchase) {
      var progress = $(this.options.progress_selector);
      var amount = $(this.options.original_amount_selector).val();
      var opp_id = $(this.options.opp_id_selector).val();
      var installment_period = 'one-time';
      var level;
      var that = this;

      if ($(this.options.installment_period_selector).length > 0) {
        installment_period = $(this.options.installment_period_selector).val();
      } // if we're not after the purchase, use addProduct


      if (progress.length > 0 && post_purchase !== true) {
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
            that.debug('add product: id is ' + 'minnpost_' + level.toLowerCase() + '_membership' + ' and name is ' + 'MinnPost ' + level.charAt(0).toUpperCase() + level.slice(1) + ' Membership' + ' and variant is ' + installment_period.charAt(0).toUpperCase() + installment_period.slice(1));
            ga('ec:addProduct', {
              'id': 'minnpost_' + level.toLowerCase() + '_membership',
              'name': 'MinnPost ' + level.charAt(0).toUpperCase() + level.slice(1) + ' Membership',
              'category': 'Donation',
              'brand': 'MinnPost',
              'variant': installment_period.charAt(0).toUpperCase() + installment_period.slice(1),
              'price': amount,
              'quantity': 1
            });
          }
        });
      }

      if (step === 'purchase') {
        this.debug('add a purchase action. step is ' + step);
        ga('ec:setAction', step, {
          'id': opp_id,
          // Transaction id - Type: string
          'affiliation': 'MinnPost',
          // Store name - Type: string
          'revenue': amount // Total Revenue - Type: numeric

        });
      } else {
        this.debug('add a checkout action. step is ' + step);
        ga('ec:setAction', 'checkout', {
          'step': step // A value of 1 indicates first checkout step. Value of 2 indicates second checkout step

        });
      }

      ga('set', {
        page: window.location.pathname,
        title: document.title
      });
      ga('send', 'pageview', window.location.pathname);
    },
    // analyticsTrackingStep
    amountAsRadio: function amountAsRadio(element, options) {
      // when amount field is a radio button, we need to check it whenever it changes
      $(options.original_amount_selector, element).change(function () {
        if ($(this).is(':radio')) {
          options.original_amount = parseInt($(options.original_amount_selector + ':checked', element).val(), 10);
        }
      });
    },
    // amountAsRadio
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
      // if there is a fair market value field, check and see if we can populate it
      if ($(this.options.fair_market_value_selector).length > 0) {
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

      $(that.options.full_amount_selector).text(parseFloat(full_amount).toFixed(2)); // update the payment request

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
      $(options.show_billing_country_selector).click(function () {
        $(options.billing_country_selector).show();
        $(this).parent().hide();
        return false;
      });
      $(options.show_shipping_country_selector).click(function () {
        $(options.shipping_country_selector).show();
        $(this).parent().hide();
        return false;
      });
    },
    // outsideUnitedStates
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
          $('.o-pay-with-payment-request').hide();
        }
      });
      $('.decline-apple-pay a').click(function (event) {
        event.preventDefault();
        $(this).hide();
        $('.m-pay-without-payment-request').show();
        $('.o-pay-with-payment-request .m-form-actions-pay-fees').hide();
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
            }).error(function (response) {
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
      }).error(function (response) {
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0cmlwZS5wYXltZW50LmpzIiwidGxpdGUubWluLmpzIiwidmFsaWQtZm9ybS5taW4uanMiLCJtaW5ucG9zdC5naXZpbmcuanMiXSwibmFtZXMiOlsiZiIsImV4cG9ydHMiLCJtb2R1bGUiLCJkZWZpbmUiLCJhbWQiLCJnIiwid2luZG93IiwiZ2xvYmFsIiwic2VsZiIsInBheW1lbnQiLCJqcyIsImUiLCJ0IiwibiIsInIiLCJzIiwibyIsInUiLCJhIiwicmVxdWlyZSIsImkiLCJFcnJvciIsImNvZGUiLCJsIiwiY2FsbCIsImxlbmd0aCIsIlFKIiwicnJldHVybiIsInJ0cmltIiwic2VsZWN0b3IiLCJpc0RPTUVsZW1lbnQiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJlbCIsIm5vZGVOYW1lIiwidHJpbSIsInRleHQiLCJyZXBsYWNlIiwidmFsIiwicmV0IiwiYXJndW1lbnRzIiwidmFsdWUiLCJwcmV2ZW50RGVmYXVsdCIsImV2ZW50T2JqZWN0IiwicmV0dXJuVmFsdWUiLCJub3JtYWxpemVFdmVudCIsIm9yaWdpbmFsIiwid2hpY2giLCJ0YXJnZXQiLCJzcmNFbGVtZW50Iiwib3JpZ2luYWxFdmVudCIsImRhdGEiLCJkZXRhaWwiLCJjaGFyQ29kZSIsImtleUNvZGUiLCJvbiIsImVsZW1lbnQiLCJldmVudE5hbWUiLCJjYWxsYmFjayIsImoiLCJsZW4iLCJsZW4xIiwibXVsdEV2ZW50TmFtZSIsIm9yaWdpbmFsQ2FsbGJhY2siLCJyZWYiLCJtYXRjaCIsInNwbGl0IiwiYWRkRXZlbnRMaXN0ZW5lciIsImF0dGFjaEV2ZW50IiwiYWRkQ2xhc3MiLCJjbGFzc05hbWUiLCJyZXN1bHRzIiwicHVzaCIsImNsYXNzTGlzdCIsImFkZCIsImhhc0NsYXNzIiwiY29udGFpbnMiLCJSZWdFeHAiLCJ0ZXN0IiwicmVtb3ZlQ2xhc3MiLCJjbHMiLCJyZW1vdmUiLCJqb2luIiwidG9nZ2xlQ2xhc3MiLCJib29sIiwiYXBwZW5kIiwidG9BcHBlbmQiLCJpbnNlcnRBZGphY2VudEhUTUwiLCJmaW5kIiwiTm9kZUxpc3QiLCJBcnJheSIsInRyaWdnZXIiLCJuYW1lIiwiZXJyb3IiLCJldiIsIkN1c3RvbUV2ZW50IiwiY3JlYXRlRXZlbnQiLCJpbml0Q3VzdG9tRXZlbnQiLCJpbml0RXZlbnQiLCJkaXNwYXRjaEV2ZW50IiwiUGF5bWVudCIsImNhcmRGcm9tTnVtYmVyIiwiY2FyZEZyb21UeXBlIiwiY2FyZHMiLCJkZWZhdWx0Rm9ybWF0IiwiZm9ybWF0QmFja0NhcmROdW1iZXIiLCJmb3JtYXRCYWNrRXhwaXJ5IiwiZm9ybWF0Q2FyZE51bWJlciIsImZvcm1hdEV4cGlyeSIsImZvcm1hdEZvcndhcmRFeHBpcnkiLCJmb3JtYXRGb3J3YXJkU2xhc2giLCJmb3JtYXRNb250aEV4cGlyeSIsImhhc1RleHRTZWxlY3RlZCIsImx1aG5DaGVjayIsInJlRm9ybWF0Q2FyZE51bWJlciIsInJlc3RyaWN0Q1ZDIiwicmVzdHJpY3RDYXJkTnVtYmVyIiwicmVzdHJpY3RDb21iaW5lZEV4cGlyeSIsInJlc3RyaWN0RXhwaXJ5IiwicmVzdHJpY3RNb250aEV4cGlyeSIsInJlc3RyaWN0TnVtZXJpYyIsInJlc3RyaWN0WWVhckV4cGlyeSIsInNldENhcmRUeXBlIiwiaW5kZXhPZiIsIml0ZW0iLCJ0eXBlIiwicGF0dGVybiIsImZvcm1hdCIsImN2Y0xlbmd0aCIsImx1aG4iLCJudW0iLCJjYXJkIiwiZGlnaXQiLCJkaWdpdHMiLCJvZGQiLCJzdW0iLCJyZXZlcnNlIiwicGFyc2VJbnQiLCJzZWxlY3Rpb25TdGFydCIsInNlbGVjdGlvbkVuZCIsInNlbGVjdGlvbiIsImNyZWF0ZVJhbmdlIiwic2V0VGltZW91dCIsIl90aGlzIiwiZm5zIiwicmUiLCJ1cHBlckxlbmd0aCIsIlN0cmluZyIsImZyb21DaGFyQ29kZSIsIm1ldGEiLCJzbGFzaCIsIm1ldGFLZXkiLCJpbnB1dCIsImN0cmxLZXkiLCJhbGxUeXBlcyIsImNhcmRUeXBlIiwiY2FyZEV4cGlyeVZhbCIsIm1vbnRoIiwicHJlZml4IiwieWVhciIsIkRhdGUiLCJnZXRGdWxsWWVhciIsInRvU3RyaW5nIiwic2xpY2UiLCJ2YWxpZGF0ZUNhcmROdW1iZXIiLCJ2YWxpZGF0ZUNhcmRFeHBpcnkiLCJjdXJyZW50VGltZSIsImV4cGlyeSIsInNldE1vbnRoIiwiZ2V0TW9udGgiLCJ2YWxpZGF0ZUNhcmRDVkMiLCJjdmMiLCJyZWYxIiwiZ3JvdXBzIiwiZXhlYyIsInNoaWZ0IiwiZm9ybWF0Q2FyZENWQyIsImZvcm1hdENhcmRFeHBpcnkiLCJmb3JtYXRDYXJkRXhwaXJ5TXVsdGlwbGUiLCJnZXRDYXJkQXJyYXkiLCJzZXRDYXJkQXJyYXkiLCJjYXJkQXJyYXkiLCJhZGRUb0NhcmRBcnJheSIsImNhcmRPYmplY3QiLCJyZW1vdmVGcm9tQ2FyZEFycmF5Iiwia2V5Iiwic3BsaWNlIiwidGxpdGUiLCJwYXJlbnRFbGVtZW50Iiwic2hvdyIsInRvb2x0aXAiLCJoaWRlIiwib2Zmc2V0VG9wIiwib2Zmc2V0TGVmdCIsIm9mZnNldFBhcmVudCIsIm9mZnNldFdpZHRoIiwib2Zmc2V0SGVpZ2h0IiwiZCIsInN0eWxlIiwidG9wIiwibGVmdCIsImNyZWF0ZUVsZW1lbnQiLCJncmF2IiwiZ2V0QXR0cmlidXRlIiwiaW5uZXJIVE1MIiwiYXBwZW5kQ2hpbGQiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJib3R0b20iLCJpbm5lckhlaWdodCIsInJpZ2h0IiwiaW5uZXJXaWR0aCIsInRpdGxlIiwic2V0QXR0cmlidXRlIiwiY2xlYXJUaW1lb3V0IiwicGFyZW50Tm9kZSIsInJlbW92ZUNoaWxkIiwiYyIsInAiLCJfdmFsaWRGb3JtIiwiX3ZhbGlkRm9ybTIiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0Iiwib2JqIiwiX19lc01vZHVsZSIsImRlZmF1bHQiLCJWYWxpZEZvcm0iLCJ0b2dnbGVJbnZhbGlkQ2xhc3MiLCJoYW5kbGVDdXN0b21NZXNzYWdlcyIsImhhbmRsZUN1c3RvbU1lc3NhZ2VEaXNwbGF5IiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJjbG9uZSIsImRlZmF1bHRzIiwiaW5zZXJ0QWZ0ZXIiLCJpbnNlcnRCZWZvcmUiLCJmb3JFYWNoIiwiZGVib3VuY2UiLCJjb3B5IiwiYXR0ciIsImhhc093blByb3BlcnR5IiwiZGVmYXVsdE9iamVjdCIsImsiLCJ1bmRlZmluZWQiLCJyZWZOb2RlIiwibm9kZVRvSW5zZXJ0Iiwic2libGluZyIsIm5leHRTaWJsaW5nIiwiX3BhcmVudCIsInBhcmVudCIsIml0ZW1zIiwiZm4iLCJtcyIsInRpbWVvdXQiLCJkZWJvdW5jZWRGbiIsInZhbGlkRm9ybSIsIl91dGlsIiwiaW52YWxpZENsYXNzIiwidmFsaWRpdHkiLCJ2YWxpZCIsImVycm9yUHJvcHMiLCJnZXRDdXN0b21NZXNzYWdlIiwiY3VzdG9tTWVzc2FnZXMiLCJsb2NhbEVycm9yUHJvcHMiLCJjb25jYXQiLCJwcm9wIiwiY2hlY2tWYWxpZGl0eSIsIm1lc3NhZ2UiLCJzZXRDdXN0b21WYWxpZGl0eSIsIm9wdGlvbnMiLCJ2YWxpZGF0aW9uRXJyb3JDbGFzcyIsInZhbGlkYXRpb25FcnJvclBhcmVudENsYXNzIiwiZXJyb3JQbGFjZW1lbnQiLCJpbnNlcnRFcnJvciIsImVycm9yTm9kZSIsInF1ZXJ5U2VsZWN0b3IiLCJ2YWxpZGF0aW9uTWVzc2FnZSIsInRleHRDb250ZW50IiwiZGVmYXVsdE9wdGlvbnMiLCJpbnB1dHMiLCJ0b0xvd2VyQ2FzZSIsImZvY3VzSW52YWxpZElucHV0IiwidmFsaWRGb3JtSW5wdXRzIiwiZm9ybSIsImZvY3VzRmlyc3QiLCJpbnZhbGlkTm9kZSIsImZvY3VzIiwiJCIsInBsdWdpbk5hbWUiLCJQbHVnaW4iLCJleHRlbmQiLCJfZGVmYXVsdHMiLCJfbmFtZSIsImluaXQiLCJwcm90b3R5cGUiLCJyZXNldCIsImFtb3VudCIsImRvY3VtZW50RWxlbWVudCIsInBhcnNlRmxvYXQiLCJsZXZlbF9hbW91bnRfc2VsZWN0b3IiLCJvcmlnaW5hbF9hbW91bnQiLCJvcmlnaW5hbF9hbW91bnRfc2VsZWN0b3IiLCJwcm9jZXNzaW5nX2ZlZSIsIk1hdGgiLCJyb3VuZCIsImZlZV9hbW91bnQiLCJwb3ciLCJ0b0ZpeGVkIiwicHJvY2Vzc2luZ19mZWVfdGV4dCIsImNyZWF0ZV9hY2NvdW50IiwiYnV0dG9uX3RleHQiLCJwYXlfYnV0dG9uX3NlbGVjdG9yIiwic3RyaXBlIiwiU3RyaXBlIiwic3RyaXBlX3B1Ymxpc2hhYmxlX2tleSIsImVsZW1lbnRzIiwiZm9udHMiLCJjc3NTcmMiLCJyZWZlcnJlciIsImRlYnVnIiwiYW5hbHl0aWNzVHJhY2tpbmciLCJhbW91bnRBc1JhZGlvIiwiYW1vdW50VXBkYXRlZCIsInBheV9jY19wcm9jZXNzaW5nX3NlbGVjdG9yIiwiY3JlZGl0Q2FyZFByb2Nlc3NpbmdGZWVzIiwiZG9uYXRlX2Zvcm1fc2VsZWN0b3IiLCJkb25hdGVBbm9ueW1vdXNseSIsImhvbm9yT3JNZW1vcnlUb2dnbGUiLCJvdXRzaWRlVW5pdGVkU3RhdGVzIiwic2hpcHBpbmdBZGRyZXNzIiwiYWxsb3dNaW5ucG9zdEFjY291bnQiLCJwYXltZW50UmVxdWVzdEJ1dHRvbiIsImNob29zZVBheW1lbnRNZXRob2QiLCJjcmVkaXRDYXJkRmllbGRzIiwidmFsaWRhdGVTZXR1cCIsImZvcm1TZXR1cCIsImNvbmZpcm1fZm9ybV9zZWxlY3RvciIsInNob3dOZXdzbGV0dGVyU2V0dGluZ3MiLCJjb25maXJtTWVzc2FnZVN1Ym1pdCIsImNvbnNvbGUiLCJsb2ciLCJkaXIiLCJwcm9ncmVzcyIsInByb2dyZXNzX3NlbGVjdG9yIiwic3RlcCIsIm5hdl9pdGVtX2NvdW50Iiwib3BwX2lkIiwib3BwX2lkX3NlbGVjdG9yIiwicG9zdF9wdXJjaGFzZSIsImluZGV4IiwiZmluaXNoX3NlY3Rpb25fc2VsZWN0b3IiLCJhbmFseXRpY3NUcmFja2luZ1N0ZXAiLCJpbnN0YWxsbWVudF9wZXJpb2QiLCJsZXZlbCIsInRoYXQiLCJpbnN0YWxsbWVudF9wZXJpb2Rfc2VsZWN0b3IiLCJhamF4IiwibWV0aG9kIiwidXJsIiwiZG9uZSIsImNoYXJBdCIsInRvVXBwZXJDYXNlIiwiZ2EiLCJwYWdlIiwibG9jYXRpb24iLCJwYXRobmFtZSIsImNoYW5nZSIsImlzIiwic3RyaXBlX3BheW1lbnRfdHlwZSIsImdldFN0cmlwZVBheW1lbnRUeXBlIiwiYW1vdW50X3NlbGVjdG9yX2ZhaXJfbWFya2V0Iiwic2V0RmFpck1hcmtldFZhbHVlIiwiY2FsY3VsYXRlRmVlcyIsImFkZGl0aW9uYWxfYW1vdW50X2ZpZWxkIiwiZ2V0VG90YWxBbW91bnQiLCJ0b3RhbF9hbW91bnQiLCJhZGRpdGlvbmFsX2Ftb3VudCIsImFtb3VudF9zZWxlY3RvciIsImZhaXJfbWFya2V0X3ZhbHVlX3NlbGVjdG9yIiwiZmFpck1hcmtldFZhbHVlIiwic2V0U3RyaXBlUGF5bWVudFR5cGUiLCJmZWVzIiwiY3JlZGl0Q2FyZEZlZUNoZWNrYm94IiwiZmllbGQiLCJmdWxsX2Ftb3VudCIsImZ1bGxfYW1vdW50X3NlbGVjdG9yIiwicGF5bWVudFJlcXVlc3QiLCJ1cGRhdGUiLCJ0b3RhbCIsImxhYmVsIiwidG9nZ2xlQW5vbnltb3VzIiwiYW5vbnltb3VzX3NlbGVjdG9yIiwibmFtZV9zZWxlY3RvciIsImhvbm9yT3JNZW1vcnkiLCJob25vcl9vcl9tZW1vcnlfY2hvb3NlciIsImhvbm9yX21lbW9yeV9pbnB1dF9ncm91cCIsImhvbm9yX3R5cGVfc2VsZWN0b3IiLCJob25vcl9uYW1lX3NlbGVjdG9yIiwic2hvd19iaWxsaW5nX2NvdW50cnlfc2VsZWN0b3IiLCJjbGljayIsImJpbGxpbmdfY291bnRyeV9zZWxlY3RvciIsInNob3dfc2hpcHBpbmdfY291bnRyeV9zZWxlY3RvciIsInNoaXBwaW5nX2NvdW50cnlfc2VsZWN0b3IiLCJzaG93X3NoaXBwaW5nIiwidXNlX2Zvcl9zaGlwcGluZ19zZWxlY3RvciIsInNoaXBwaW5nX3NlbGVjdG9yIiwiYWNjb3VudF9leGlzdHMiLCJzaG93UGFzc3dvcmQiLCJzaG93UGFzc3dvcmRTdHJlbmd0aCIsInNwYW1FbWFpbCIsImVtYWlsX2ZpZWxkX3NlbGVjdG9yIiwidG9nZ2xlQWNjb3VudEZpZWxkcyIsImNyZWF0ZV9tcF9zZWxlY3RvciIsImRvbmVUeXBpbmciLCJlbWFpbCIsImNoZWNrTWlubnBvc3RBY2NvdW50IiwidHlwaW5nVGltZXIiLCJkb25lVHlwaW5nSW50ZXJ2YWwiLCJrZXl1cCIsImVtYWlsX2ZpZWxkIiwic3BhbUVycm9yQ29udGFpbmVyIiwiY3JlYXRlX2FjY291bnRfc2VsZWN0b3IiLCJiZWZvcmUiLCJwYXNzd29yZF9zZWxlY3RvciIsIiRzdWJtaXQiLCIkY29udGFpbmVyIiwiJGZpZWxkIiwic2hvd19wYXNzIiwiJHRvZ2dsZSIsImNoZWNrYm94IiwiJGJlZm9yZSIsImFmdGVyIiwiY2hlY2tQYXNzd29yZFN0cmVuZ3RoIiwiJHBhc3N3b3JkIiwiJHN0cmVuZ3RoTWV0ZXIiLCIkc3RyZW5ndGhUZXh0IiwicGFzc3dvcmQiLCJyZXN1bHQiLCJ6eGN2Ym4iLCJzdHJlbmd0aCIsInNjb3JlIiwiaHRtbCIsInVzZXIiLCJtaW5ucG9zdF9yb290Iiwic3RhdHVzIiwicmVhc29uIiwiY291bnRyeSIsImN1cnJlbmN5IiwicHJCdXR0b24iLCJjcmVhdGUiLCJ0aGVtZSIsImhlaWdodCIsImNhbk1ha2VQYXltZW50IiwidGhlbiIsIm1vdW50IiwiZXZlbnQiLCJzdXBwb3J0Zm9ybSIsImdldCIsInJlcG9ydFZhbGlkaXR5IiwidG9rZW5GaWVsZE5hbWUiLCJ0b2tlbkZpZWxkIiwicGF5bWVudE1ldGhvZCIsImlkIiwiZm9ybVByb2Nlc3NvciIsImNob29zZV9wYXltZW50IiwiY2hlY2tlZF9pZCIsImNoZWNrZWRfdmFsdWUiLCJzZXR1cFBheW1lbnRNZXRob2QiLCJlbGVtZW50X2lkIiwiZWxlbWVudF92YWx1ZSIsImFjaEZpZWxkcyIsInJlbW92ZUFjaEZpZWxkcyIsInBheW1lbnRfbWV0aG9kX3NlbGVjdG9yIiwicGxhaWRfbGluayIsImJ1dHRvbkRpc2FibGVkIiwibGlua0hhbmRsZXIiLCJkZXN0cm95IiwiYmFzZSIsImljb25Db2xvciIsImxpbmVIZWlnaHQiLCJmb250V2VpZ2h0IiwiZm9udEZhbWlseSIsImZvbnRTaXplIiwiaW52YWxpZCIsImNvbG9yIiwiY2FyZE51bWJlckVsZW1lbnQiLCJzaG93SWNvbiIsImNjX251bV9zZWxlY3RvciIsImNhcmRFeHBpcnlFbGVtZW50IiwiY2NfZXhwX3NlbGVjdG9yIiwiY2FyZEN2Y0VsZW1lbnQiLCJjY19jdmNfc2VsZWN0b3IiLCJicmFuZCIsInN0cmlwZUVycm9yRGlzcGxheSIsImJ1dHRvblN0YXR1cyIsInNob3dTcGlubmVyIiwiaGlkZVNwaW5uZXIiLCJiYW5rVG9rZW5GaWVsZE5hbWUiLCJiYW5rVG9rZW5GaWVsZCIsIlBsYWlkIiwiY2xpZW50TmFtZSIsImVudiIsInBsYWlkX2VudiIsInByb2R1Y3QiLCJ0b2tlbiIsImdldEVsZW1lbnRCeUlkIiwib25TdWNjZXNzIiwicHVibGljX3Rva2VuIiwibWV0YWRhdGEiLCJKU09OIiwic3RyaW5naWZ5IiwiYWNjb3VudF9pZCIsImNvbnRlbnRUeXBlIiwicmVzcG9uc2UiLCJzdHJpcGVfYmFua19hY2NvdW50X3Rva2VuIiwicHJlcGVuZCIsInJlc2V0Rm9ybUVycm9ycyIsIm9wZW4iLCJidXR0b24iLCJkaXNhYmxlZCIsImFjaF93YXNfaW5pdGlhbGl6ZWQiLCJyZW1vdmVBdHRyIiwiZm9ybXMiLCJmb3JtX3NlbGVjdG9yIiwic2Nyb2xsVG9Gb3JtRXJyb3IiLCJmaXJzdCIsImZpcnN0X2hvbGRlciIsImVsZW1lbnRPZmZzZXQiLCJvZmZzZXQiLCJwYWdlT2Zmc2V0IiwicGFnZVlPZmZzZXQiLCJzY3JvbGxUb3AiLCJzdWJtaXQiLCJiaWxsaW5nRGV0YWlscyIsImdlbmVyYXRlQmlsbGluZ0RldGFpbHMiLCJjcmVhdGVNaW5uUG9zdEFjY291bnQiLCJwYXltZW50X3R5cGUiLCJjcmVhdGVQYXltZW50TWV0aG9kIiwiYmFua1Rva2VuSGFuZGxlciIsInN1Ym1pdEZvcm1Pbmx5IiwidGhpc19zZWxlY3RvciIsIndoaWNoX2Vycm9yIiwiZW1wdHkiLCJhbmltYXRlIiwiZmlyc3RfbmFtZSIsImZpcnN0X25hbWVfZmllbGRfc2VsZWN0b3IiLCJsYXN0X25hbWUiLCJsYXN0X25hbWVfZmllbGRfc2VsZWN0b3IiLCJwYXNzd29yZF9maWVsZF9zZWxlY3RvciIsImNpdHkiLCJiaWxsaW5nX2NpdHlfZmllbGRfc2VsZWN0b3IiLCJzdGF0ZSIsImJpbGxpbmdfc3RhdGVfZmllbGRfc2VsZWN0b3IiLCJ6aXAiLCJiaWxsaW5nX3ppcF9maWVsZF9zZWxlY3RvciIsImFkZHJlc3NEZXRhaWxzIiwiZnVsbF9uYW1lIiwic3RyZWV0IiwiYmlsbGluZ19zdHJlZXRfZmllbGRfc2VsZWN0b3IiLCJsaW5lMSIsInBvc3RhbF9jb2RlIiwiY291bnRyeV9maWVsZF92YWx1ZSIsImJpbGxpbmdfY291bnRyeV9maWVsZF9zZWxlY3RvciIsImFkZHJlc3MiLCJjYXJkRWxlbWVudCIsImJpbGxpbmdfZGV0YWlscyIsImhhbmRsZVNlcnZlckVycm9yIiwiYWpheF91cmwiLCJmZXRjaCIsImhlYWRlcnMiLCJib2R5Iiwic2VyaWFsaXplIiwianNvbiIsImhhbmRsZVNlcnZlclJlc3BvbnNlIiwiY2FjaGUiLCJlcnJvcnMiLCJyZXF1aXJlc19hY3Rpb24iLCJ0aGlzX2ZpZWxkIiwiZWFjaCIsInBhcmFtIiwiZGlzcGxheUVycm9yTWVzc2FnZSIsInN0cmlwZUVycm9yU2VsZWN0b3IiLCJmaWVsZFBhcmVudCIsInByZXYiLCJuZXdzbGV0dGVyX2dyb3VwX2h0bWwiLCJuZXdzbGV0dGVyX2dyb3VwX3NlbGVjdG9yIiwiZ2V0X2RhdGEiLCJzaG9ydGNvZGUiLCJwbGFjZW1lbnQiLCJncm91cF9maWVsZHMiLCJjYXRlZ29yeSIsIm1haWxjaGltcF9zdGF0dXMiLCJtYWlsY2hpbXBfdXNlcl9pZCIsImV4aXN0aW5nX25ld3NsZXR0ZXJfc2V0dGluZ3MiLCJjb25maXJtZm9ybSIsIm5ld3NsZXR0ZXJfZ3JvdXBzIiwibmV3X25ld3NsZXR0ZXJfc2V0dGluZ3MiLCJwb3N0X2RhdGEiLCJncm91cHNfc3VibWl0dGVkIiwiZ3JvdXBzX2F2YWlsYWJsZSIsImdyb3VwIiwiZGF0YVR5cGUiLCJzdWNjZXNzIiwiZmFpbCIsImpRdWVyeSJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLENBQUMsVUFBU0EsQ0FBVCxFQUFXO0FBQUMsTUFBRyxRQUFPQyxPQUFQLHlDQUFPQSxPQUFQLE9BQWlCLFFBQWpCLElBQTJCLE9BQU9DLE1BQVAsS0FBZ0IsV0FBOUMsRUFBMEQ7QUFBQ0EsSUFBQUEsTUFBTSxDQUFDRCxPQUFQLEdBQWVELENBQUMsRUFBaEI7QUFBbUIsR0FBOUUsTUFBbUYsSUFBRyxPQUFPRyxNQUFQLEtBQWdCLFVBQWhCLElBQTRCQSxNQUFNLENBQUNDLEdBQXRDLEVBQTBDO0FBQUNELElBQUFBLE1BQU0sQ0FBQyxFQUFELEVBQUlILENBQUosQ0FBTjtBQUFhLEdBQXhELE1BQTREO0FBQUMsUUFBSUssQ0FBSjs7QUFBTSxRQUFHLE9BQU9DLE1BQVAsS0FBZ0IsV0FBbkIsRUFBK0I7QUFBQ0QsTUFBQUEsQ0FBQyxHQUFDQyxNQUFGO0FBQVMsS0FBekMsTUFBOEMsSUFBRyxPQUFPQyxNQUFQLEtBQWdCLFdBQW5CLEVBQStCO0FBQUNGLE1BQUFBLENBQUMsR0FBQ0UsTUFBRjtBQUFTLEtBQXpDLE1BQThDLElBQUcsT0FBT0MsSUFBUCxLQUFjLFdBQWpCLEVBQTZCO0FBQUNILE1BQUFBLENBQUMsR0FBQ0csSUFBRjtBQUFPLEtBQXJDLE1BQXlDO0FBQUNILE1BQUFBLENBQUMsR0FBQyxJQUFGO0FBQU87O0FBQUEsS0FBQ0EsQ0FBQyxDQUFDSSxPQUFGLEtBQWNKLENBQUMsQ0FBQ0ksT0FBRixHQUFZLEVBQTFCLENBQUQsRUFBZ0NDLEVBQWhDLEdBQXFDVixDQUFDLEVBQXRDO0FBQXlDO0FBQUMsQ0FBMVYsRUFBNFYsWUFBVTtBQUFDLE1BQUlHLE1BQUosRUFBV0QsTUFBWCxFQUFrQkQsT0FBbEI7QUFBMEIsU0FBUSxTQUFTVSxDQUFULENBQVdDLENBQVgsRUFBYUMsQ0FBYixFQUFl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QUFBLENBQUMsQ0FBQzFPLElBQUYsQ0FBTyxJQUFQLEVBQWEsWUFBWTJPLFVBQXpCLEVBQXFDLElBQUlDLE1BQUosQ0FBWSxJQUFaLEVBQWtCcEIsT0FBbEIsQ0FBckM7QUFDRDtBQUNGLEtBSk0sQ0FBUDtBQUtELEdBTkQ7QUFRRCxDQXA4Q0EsRUFvOENHK1UsTUFwOENILEVBbzhDV3BsQixNQXA4Q1gsRUFvOENtQnlCLFFBcDhDbkIiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbihmKXtpZih0eXBlb2YgZXhwb3J0cz09PVwib2JqZWN0XCImJnR5cGVvZiBtb2R1bGUhPT1cInVuZGVmaW5lZFwiKXttb2R1bGUuZXhwb3J0cz1mKCl9ZWxzZSBpZih0eXBlb2YgZGVmaW5lPT09XCJmdW5jdGlvblwiJiZkZWZpbmUuYW1kKXtkZWZpbmUoW10sZil9ZWxzZXt2YXIgZztpZih0eXBlb2Ygd2luZG93IT09XCJ1bmRlZmluZWRcIil7Zz13aW5kb3d9ZWxzZSBpZih0eXBlb2YgZ2xvYmFsIT09XCJ1bmRlZmluZWRcIil7Zz1nbG9iYWx9ZWxzZSBpZih0eXBlb2Ygc2VsZiE9PVwidW5kZWZpbmVkXCIpe2c9c2VsZn1lbHNle2c9dGhpc30oZy5wYXltZW50IHx8IChnLnBheW1lbnQgPSB7fSkpLmpzID0gZigpfX0pKGZ1bmN0aW9uKCl7dmFyIGRlZmluZSxtb2R1bGUsZXhwb3J0cztyZXR1cm4gKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkoezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xudmFyIFFKLCBycmV0dXJuLCBydHJpbTtcblxuUUogPSBmdW5jdGlvbihzZWxlY3Rvcikge1xuICBpZiAoUUouaXNET01FbGVtZW50KHNlbGVjdG9yKSkge1xuICAgIHJldHVybiBzZWxlY3RvcjtcbiAgfVxuICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG59O1xuXG5RSi5pc0RPTUVsZW1lbnQgPSBmdW5jdGlvbihlbCkge1xuICByZXR1cm4gZWwgJiYgKGVsLm5vZGVOYW1lICE9IG51bGwpO1xufTtcblxucnRyaW0gPSAvXltcXHNcXHVGRUZGXFx4QTBdK3xbXFxzXFx1RkVGRlxceEEwXSskL2c7XG5cblFKLnRyaW0gPSBmdW5jdGlvbih0ZXh0KSB7XG4gIGlmICh0ZXh0ID09PSBudWxsKSB7XG4gICAgcmV0dXJuIFwiXCI7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICh0ZXh0ICsgXCJcIikucmVwbGFjZShydHJpbSwgXCJcIik7XG4gIH1cbn07XG5cbnJyZXR1cm4gPSAvXFxyL2c7XG5cblFKLnZhbCA9IGZ1bmN0aW9uKGVsLCB2YWwpIHtcbiAgdmFyIHJldDtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgcmV0dXJuIGVsLnZhbHVlID0gdmFsO1xuICB9IGVsc2Uge1xuICAgIHJldCA9IGVsLnZhbHVlO1xuICAgIGlmICh0eXBlb2YgcmV0ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICByZXR1cm4gcmV0LnJlcGxhY2UocnJldHVybiwgXCJcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChyZXQgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuUUoucHJldmVudERlZmF1bHQgPSBmdW5jdGlvbihldmVudE9iamVjdCkge1xuICBpZiAodHlwZW9mIGV2ZW50T2JqZWN0LnByZXZlbnREZWZhdWx0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBldmVudE9iamVjdC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybjtcbiAgfVxuICBldmVudE9iamVjdC5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICByZXR1cm4gZmFsc2U7XG59O1xuXG5RSi5ub3JtYWxpemVFdmVudCA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIG9yaWdpbmFsO1xuICBvcmlnaW5hbCA9IGU7XG4gIGUgPSB7XG4gICAgd2hpY2g6IG9yaWdpbmFsLndoaWNoICE9IG51bGwgPyBvcmlnaW5hbC53aGljaCA6IHZvaWQgMCxcbiAgICB0YXJnZXQ6IG9yaWdpbmFsLnRhcmdldCB8fCBvcmlnaW5hbC5zcmNFbGVtZW50LFxuICAgIHByZXZlbnREZWZhdWx0OiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBRSi5wcmV2ZW50RGVmYXVsdChvcmlnaW5hbCk7XG4gICAgfSxcbiAgICBvcmlnaW5hbEV2ZW50OiBvcmlnaW5hbCxcbiAgICBkYXRhOiBvcmlnaW5hbC5kYXRhIHx8IG9yaWdpbmFsLmRldGFpbFxuICB9O1xuICBpZiAoZS53aGljaCA9PSBudWxsKSB7XG4gICAgZS53aGljaCA9IG9yaWdpbmFsLmNoYXJDb2RlICE9IG51bGwgPyBvcmlnaW5hbC5jaGFyQ29kZSA6IG9yaWdpbmFsLmtleUNvZGU7XG4gIH1cbiAgcmV0dXJuIGU7XG59O1xuXG5RSi5vbiA9IGZ1bmN0aW9uKGVsZW1lbnQsIGV2ZW50TmFtZSwgY2FsbGJhY2spIHtcbiAgdmFyIGVsLCBpLCBqLCBsZW4sIGxlbjEsIG11bHRFdmVudE5hbWUsIG9yaWdpbmFsQ2FsbGJhY2ssIHJlZjtcbiAgaWYgKGVsZW1lbnQubGVuZ3RoKSB7XG4gICAgZm9yIChpID0gMCwgbGVuID0gZWxlbWVudC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgZWwgPSBlbGVtZW50W2ldO1xuICAgICAgUUoub24oZWwsIGV2ZW50TmFtZSwgY2FsbGJhY2spO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGV2ZW50TmFtZS5tYXRjaChcIiBcIikpIHtcbiAgICByZWYgPSBldmVudE5hbWUuc3BsaXQoXCIgXCIpO1xuICAgIGZvciAoaiA9IDAsIGxlbjEgPSByZWYubGVuZ3RoOyBqIDwgbGVuMTsgaisrKSB7XG4gICAgICBtdWx0RXZlbnROYW1lID0gcmVmW2pdO1xuICAgICAgUUoub24oZWxlbWVudCwgbXVsdEV2ZW50TmFtZSwgY2FsbGJhY2spO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cbiAgb3JpZ2luYWxDYWxsYmFjayA9IGNhbGxiYWNrO1xuICBjYWxsYmFjayA9IGZ1bmN0aW9uKGUpIHtcbiAgICBlID0gUUoubm9ybWFsaXplRXZlbnQoZSk7XG4gICAgcmV0dXJuIG9yaWdpbmFsQ2FsbGJhY2soZSk7XG4gIH07XG4gIGlmIChlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICByZXR1cm4gZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgY2FsbGJhY2ssIGZhbHNlKTtcbiAgfVxuICBpZiAoZWxlbWVudC5hdHRhY2hFdmVudCkge1xuICAgIGV2ZW50TmFtZSA9IFwib25cIiArIGV2ZW50TmFtZTtcbiAgICByZXR1cm4gZWxlbWVudC5hdHRhY2hFdmVudChldmVudE5hbWUsIGNhbGxiYWNrKTtcbiAgfVxuICBlbGVtZW50WydvbicgKyBldmVudE5hbWVdID0gY2FsbGJhY2s7XG59O1xuXG5RSi5hZGRDbGFzcyA9IGZ1bmN0aW9uKGVsLCBjbGFzc05hbWUpIHtcbiAgdmFyIGU7XG4gIGlmIChlbC5sZW5ndGgpIHtcbiAgICByZXR1cm4gKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGksIGxlbiwgcmVzdWx0cztcbiAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgIGZvciAoaSA9IDAsIGxlbiA9IGVsLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGUgPSBlbFtpXTtcbiAgICAgICAgcmVzdWx0cy5wdXNoKFFKLmFkZENsYXNzKGUsIGNsYXNzTmFtZSkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfSkoKTtcbiAgfVxuICBpZiAoZWwuY2xhc3NMaXN0KSB7XG4gICAgcmV0dXJuIGVsLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZWwuY2xhc3NOYW1lICs9ICcgJyArIGNsYXNzTmFtZTtcbiAgfVxufTtcblxuUUouaGFzQ2xhc3MgPSBmdW5jdGlvbihlbCwgY2xhc3NOYW1lKSB7XG4gIHZhciBlLCBoYXNDbGFzcywgaSwgbGVuO1xuICBpZiAoZWwubGVuZ3RoKSB7XG4gICAgaGFzQ2xhc3MgPSB0cnVlO1xuICAgIGZvciAoaSA9IDAsIGxlbiA9IGVsLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBlID0gZWxbaV07XG4gICAgICBoYXNDbGFzcyA9IGhhc0NsYXNzICYmIFFKLmhhc0NsYXNzKGUsIGNsYXNzTmFtZSk7XG4gICAgfVxuICAgIHJldHVybiBoYXNDbGFzcztcbiAgfVxuICBpZiAoZWwuY2xhc3NMaXN0KSB7XG4gICAgcmV0dXJuIGVsLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgUmVnRXhwKCcoXnwgKScgKyBjbGFzc05hbWUgKyAnKCB8JCknLCAnZ2knKS50ZXN0KGVsLmNsYXNzTmFtZSk7XG4gIH1cbn07XG5cblFKLnJlbW92ZUNsYXNzID0gZnVuY3Rpb24oZWwsIGNsYXNzTmFtZSkge1xuICB2YXIgY2xzLCBlLCBpLCBsZW4sIHJlZiwgcmVzdWx0cztcbiAgaWYgKGVsLmxlbmd0aCkge1xuICAgIHJldHVybiAoZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaSwgbGVuLCByZXN1bHRzO1xuICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgZm9yIChpID0gMCwgbGVuID0gZWwubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgZSA9IGVsW2ldO1xuICAgICAgICByZXN1bHRzLnB1c2goUUoucmVtb3ZlQ2xhc3MoZSwgY2xhc3NOYW1lKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9KSgpO1xuICB9XG4gIGlmIChlbC5jbGFzc0xpc3QpIHtcbiAgICByZWYgPSBjbGFzc05hbWUuc3BsaXQoJyAnKTtcbiAgICByZXN1bHRzID0gW107XG4gICAgZm9yIChpID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBjbHMgPSByZWZbaV07XG4gICAgICByZXN1bHRzLnB1c2goZWwuY2xhc3NMaXN0LnJlbW92ZShjbHMpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGVsLmNsYXNzTmFtZSA9IGVsLmNsYXNzTmFtZS5yZXBsYWNlKG5ldyBSZWdFeHAoJyhefFxcXFxiKScgKyBjbGFzc05hbWUuc3BsaXQoJyAnKS5qb2luKCd8JykgKyAnKFxcXFxifCQpJywgJ2dpJyksICcgJyk7XG4gIH1cbn07XG5cblFKLnRvZ2dsZUNsYXNzID0gZnVuY3Rpb24oZWwsIGNsYXNzTmFtZSwgYm9vbCkge1xuICB2YXIgZTtcbiAgaWYgKGVsLmxlbmd0aCkge1xuICAgIHJldHVybiAoZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaSwgbGVuLCByZXN1bHRzO1xuICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgZm9yIChpID0gMCwgbGVuID0gZWwubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgZSA9IGVsW2ldO1xuICAgICAgICByZXN1bHRzLnB1c2goUUoudG9nZ2xlQ2xhc3MoZSwgY2xhc3NOYW1lLCBib29sKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9KSgpO1xuICB9XG4gIGlmIChib29sKSB7XG4gICAgaWYgKCFRSi5oYXNDbGFzcyhlbCwgY2xhc3NOYW1lKSkge1xuICAgICAgcmV0dXJuIFFKLmFkZENsYXNzKGVsLCBjbGFzc05hbWUpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gUUoucmVtb3ZlQ2xhc3MoZWwsIGNsYXNzTmFtZSk7XG4gIH1cbn07XG5cblFKLmFwcGVuZCA9IGZ1bmN0aW9uKGVsLCB0b0FwcGVuZCkge1xuICB2YXIgZTtcbiAgaWYgKGVsLmxlbmd0aCkge1xuICAgIHJldHVybiAoZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaSwgbGVuLCByZXN1bHRzO1xuICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgZm9yIChpID0gMCwgbGVuID0gZWwubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgZSA9IGVsW2ldO1xuICAgICAgICByZXN1bHRzLnB1c2goUUouYXBwZW5kKGUsIHRvQXBwZW5kKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9KSgpO1xuICB9XG4gIHJldHVybiBlbC5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIHRvQXBwZW5kKTtcbn07XG5cblFKLmZpbmQgPSBmdW5jdGlvbihlbCwgc2VsZWN0b3IpIHtcbiAgaWYgKGVsIGluc3RhbmNlb2YgTm9kZUxpc3QgfHwgZWwgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgIGVsID0gZWxbMF07XG4gIH1cbiAgcmV0dXJuIGVsLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xufTtcblxuUUoudHJpZ2dlciA9IGZ1bmN0aW9uKGVsLCBuYW1lLCBkYXRhKSB7XG4gIHZhciBlLCBlcnJvciwgZXY7XG4gIHRyeSB7XG4gICAgZXYgPSBuZXcgQ3VzdG9tRXZlbnQobmFtZSwge1xuICAgICAgZGV0YWlsOiBkYXRhXG4gICAgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgZSA9IGVycm9yO1xuICAgIGV2ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG4gICAgaWYgKGV2LmluaXRDdXN0b21FdmVudCkge1xuICAgICAgZXYuaW5pdEN1c3RvbUV2ZW50KG5hbWUsIHRydWUsIHRydWUsIGRhdGEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBldi5pbml0RXZlbnQobmFtZSwgdHJ1ZSwgdHJ1ZSwgZGF0YSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBlbC5kaXNwYXRjaEV2ZW50KGV2KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUUo7XG5cblxufSx7fV0sMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4oZnVuY3Rpb24gKGdsb2JhbCl7XG52YXIgUGF5bWVudCwgUUosIGNhcmRGcm9tTnVtYmVyLCBjYXJkRnJvbVR5cGUsIGNhcmRzLCBkZWZhdWx0Rm9ybWF0LCBmb3JtYXRCYWNrQ2FyZE51bWJlciwgZm9ybWF0QmFja0V4cGlyeSwgZm9ybWF0Q2FyZE51bWJlciwgZm9ybWF0RXhwaXJ5LCBmb3JtYXRGb3J3YXJkRXhwaXJ5LCBmb3JtYXRGb3J3YXJkU2xhc2gsIGZvcm1hdE1vbnRoRXhwaXJ5LCBoYXNUZXh0U2VsZWN0ZWQsIGx1aG5DaGVjaywgcmVGb3JtYXRDYXJkTnVtYmVyLCByZXN0cmljdENWQywgcmVzdHJpY3RDYXJkTnVtYmVyLCByZXN0cmljdENvbWJpbmVkRXhwaXJ5LCByZXN0cmljdEV4cGlyeSwgcmVzdHJpY3RNb250aEV4cGlyeSwgcmVzdHJpY3ROdW1lcmljLCByZXN0cmljdFllYXJFeHBpcnksIHNldENhcmRUeXBlLFxuICBpbmRleE9mID0gW10uaW5kZXhPZiB8fCBmdW5jdGlvbihpdGVtKSB7IGZvciAodmFyIGkgPSAwLCBsID0gdGhpcy5sZW5ndGg7IGkgPCBsOyBpKyspIHsgaWYgKGkgaW4gdGhpcyAmJiB0aGlzW2ldID09PSBpdGVtKSByZXR1cm4gaTsgfSByZXR1cm4gLTE7IH07XG5cblFKID0gcmVxdWlyZSgncWovc3JjL3FqLmNvZmZlZScpO1xuXG5kZWZhdWx0Rm9ybWF0ID0gLyhcXGR7MSw0fSkvZztcblxuY2FyZHMgPSBbXG4gIHtcbiAgICB0eXBlOiAnYW1leCcsXG4gICAgcGF0dGVybjogL14zWzQ3XS8sXG4gICAgZm9ybWF0OiAvKFxcZHsxLDR9KShcXGR7MSw2fSk/KFxcZHsxLDV9KT8vLFxuICAgIGxlbmd0aDogWzE1XSxcbiAgICBjdmNMZW5ndGg6IFs0XSxcbiAgICBsdWhuOiB0cnVlXG4gIH0sIHtcbiAgICB0eXBlOiAnZGFua29ydCcsXG4gICAgcGF0dGVybjogL141MDE5LyxcbiAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgbGVuZ3RoOiBbMTZdLFxuICAgIGN2Y0xlbmd0aDogWzNdLFxuICAgIGx1aG46IHRydWVcbiAgfSwge1xuICAgIHR5cGU6ICdkaW5lcnNjbHViJyxcbiAgICBwYXR0ZXJuOiAvXigzNnwzOHwzMFswLTVdKS8sXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGxlbmd0aDogWzE0XSxcbiAgICBjdmNMZW5ndGg6IFszXSxcbiAgICBsdWhuOiB0cnVlXG4gIH0sIHtcbiAgICB0eXBlOiAnZGlzY292ZXInLFxuICAgIHBhdHRlcm46IC9eKDYwMTF8NjV8NjRbNC05XXw2MjIpLyxcbiAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgbGVuZ3RoOiBbMTZdLFxuICAgIGN2Y0xlbmd0aDogWzNdLFxuICAgIGx1aG46IHRydWVcbiAgfSwge1xuICAgIHR5cGU6ICdqY2InLFxuICAgIHBhdHRlcm46IC9eMzUvLFxuICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICBsZW5ndGg6IFsxNl0sXG4gICAgY3ZjTGVuZ3RoOiBbM10sXG4gICAgbHVobjogdHJ1ZVxuICB9LCB7XG4gICAgdHlwZTogJ2xhc2VyJyxcbiAgICBwYXR0ZXJuOiAvXig2NzA2fDY3NzF8NjcwOSkvLFxuICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICBsZW5ndGg6IFsxNiwgMTcsIDE4LCAxOV0sXG4gICAgY3ZjTGVuZ3RoOiBbM10sXG4gICAgbHVobjogdHJ1ZVxuICB9LCB7XG4gICAgdHlwZTogJ21hZXN0cm8nLFxuICAgIHBhdHRlcm46IC9eKDUwMTh8NTAyMHw1MDM4fDYzMDR8NjcwM3w2NzU5fDY3NlsxLTNdKS8sXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGxlbmd0aDogWzEyLCAxMywgMTQsIDE1LCAxNiwgMTcsIDE4LCAxOV0sXG4gICAgY3ZjTGVuZ3RoOiBbM10sXG4gICAgbHVobjogdHJ1ZVxuICB9LCB7XG4gICAgdHlwZTogJ21hc3RlcmNhcmQnLFxuICAgIHBhdHRlcm46IC9eNVsxLTVdLyxcbiAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgbGVuZ3RoOiBbMTZdLFxuICAgIGN2Y0xlbmd0aDogWzNdLFxuICAgIGx1aG46IHRydWVcbiAgfSwge1xuICAgIHR5cGU6ICd1bmlvbnBheScsXG4gICAgcGF0dGVybjogL142Mi8sXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGxlbmd0aDogWzE2LCAxNywgMTgsIDE5XSxcbiAgICBjdmNMZW5ndGg6IFszXSxcbiAgICBsdWhuOiBmYWxzZVxuICB9LCB7XG4gICAgdHlwZTogJ3Zpc2FlbGVjdHJvbicsXG4gICAgcGF0dGVybjogL140KDAyNnwxNzUwMHw0MDV8NTA4fDg0NHw5MVszN10pLyxcbiAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgbGVuZ3RoOiBbMTZdLFxuICAgIGN2Y0xlbmd0aDogWzNdLFxuICAgIGx1aG46IHRydWVcbiAgfSwge1xuICAgIHR5cGU6ICd2aXNhJyxcbiAgICBwYXR0ZXJuOiAvXjQvLFxuICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICBsZW5ndGg6IFsxMywgMTZdLFxuICAgIGN2Y0xlbmd0aDogWzNdLFxuICAgIGx1aG46IHRydWVcbiAgfSwge1xuICAgIHR5cGU6ICdlbG8nLFxuICAgIHBhdHRlcm46IC9eNDAxMXw0Mzg5MzV8NDUoMTQxNnw3Nil8NTAoNDE3NXw2Njk5fDY3fDkwWzQtN10pfDYzKDYyOTd8NjM2OCkvLFxuICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICBsZW5ndGg6IFsxNl0sXG4gICAgY3ZjTGVuZ3RoOiBbM10sXG4gICAgbHVobjogdHJ1ZVxuICB9XG5dO1xuXG5jYXJkRnJvbU51bWJlciA9IGZ1bmN0aW9uKG51bSkge1xuICB2YXIgY2FyZCwgaSwgbGVuO1xuICBudW0gPSAobnVtICsgJycpLnJlcGxhY2UoL1xcRC9nLCAnJyk7XG4gIGZvciAoaSA9IDAsIGxlbiA9IGNhcmRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgY2FyZCA9IGNhcmRzW2ldO1xuICAgIGlmIChjYXJkLnBhdHRlcm4udGVzdChudW0pKSB7XG4gICAgICByZXR1cm4gY2FyZDtcbiAgICB9XG4gIH1cbn07XG5cbmNhcmRGcm9tVHlwZSA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIGNhcmQsIGksIGxlbjtcbiAgZm9yIChpID0gMCwgbGVuID0gY2FyZHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBjYXJkID0gY2FyZHNbaV07XG4gICAgaWYgKGNhcmQudHlwZSA9PT0gdHlwZSkge1xuICAgICAgcmV0dXJuIGNhcmQ7XG4gICAgfVxuICB9XG59O1xuXG5sdWhuQ2hlY2sgPSBmdW5jdGlvbihudW0pIHtcbiAgdmFyIGRpZ2l0LCBkaWdpdHMsIGksIGxlbiwgb2RkLCBzdW07XG4gIG9kZCA9IHRydWU7XG4gIHN1bSA9IDA7XG4gIGRpZ2l0cyA9IChudW0gKyAnJykuc3BsaXQoJycpLnJldmVyc2UoKTtcbiAgZm9yIChpID0gMCwgbGVuID0gZGlnaXRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgZGlnaXQgPSBkaWdpdHNbaV07XG4gICAgZGlnaXQgPSBwYXJzZUludChkaWdpdCwgMTApO1xuICAgIGlmICgob2RkID0gIW9kZCkpIHtcbiAgICAgIGRpZ2l0ICo9IDI7XG4gICAgfVxuICAgIGlmIChkaWdpdCA+IDkpIHtcbiAgICAgIGRpZ2l0IC09IDk7XG4gICAgfVxuICAgIHN1bSArPSBkaWdpdDtcbiAgfVxuICByZXR1cm4gc3VtICUgMTAgPT09IDA7XG59O1xuXG5oYXNUZXh0U2VsZWN0ZWQgPSBmdW5jdGlvbih0YXJnZXQpIHtcbiAgdmFyIHJlZjtcbiAgaWYgKCh0YXJnZXQuc2VsZWN0aW9uU3RhcnQgIT0gbnVsbCkgJiYgdGFyZ2V0LnNlbGVjdGlvblN0YXJ0ICE9PSB0YXJnZXQuc2VsZWN0aW9uRW5kKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKCh0eXBlb2YgZG9jdW1lbnQgIT09IFwidW5kZWZpbmVkXCIgJiYgZG9jdW1lbnQgIT09IG51bGwgPyAocmVmID0gZG9jdW1lbnQuc2VsZWN0aW9uKSAhPSBudWxsID8gcmVmLmNyZWF0ZVJhbmdlIDogdm9pZCAwIDogdm9pZCAwKSAhPSBudWxsKSB7XG4gICAgaWYgKGRvY3VtZW50LnNlbGVjdGlvbi5jcmVhdGVSYW5nZSgpLnRleHQpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuXG5yZUZvcm1hdENhcmROdW1iZXIgPSBmdW5jdGlvbihlKSB7XG4gIHJldHVybiBzZXRUaW1lb3V0KChmdW5jdGlvbihfdGhpcykge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciB0YXJnZXQsIHZhbHVlO1xuICAgICAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgICB2YWx1ZSA9IFFKLnZhbCh0YXJnZXQpO1xuICAgICAgdmFsdWUgPSBQYXltZW50LmZucy5mb3JtYXRDYXJkTnVtYmVyKHZhbHVlKTtcbiAgICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCB2YWx1ZSk7XG4gICAgfTtcbiAgfSkodGhpcykpO1xufTtcblxuZm9ybWF0Q2FyZE51bWJlciA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIGNhcmQsIGRpZ2l0LCBsZW5ndGgsIHJlLCB0YXJnZXQsIHVwcGVyTGVuZ3RoLCB2YWx1ZTtcbiAgZGlnaXQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpO1xuICBpZiAoIS9eXFxkKyQvLnRlc3QoZGlnaXQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRhcmdldCA9IGUudGFyZ2V0O1xuICB2YWx1ZSA9IFFKLnZhbCh0YXJnZXQpO1xuICBjYXJkID0gY2FyZEZyb21OdW1iZXIodmFsdWUgKyBkaWdpdCk7XG4gIGxlbmd0aCA9ICh2YWx1ZS5yZXBsYWNlKC9cXEQvZywgJycpICsgZGlnaXQpLmxlbmd0aDtcbiAgdXBwZXJMZW5ndGggPSAxNjtcbiAgaWYgKGNhcmQpIHtcbiAgICB1cHBlckxlbmd0aCA9IGNhcmQubGVuZ3RoW2NhcmQubGVuZ3RoLmxlbmd0aCAtIDFdO1xuICB9XG4gIGlmIChsZW5ndGggPj0gdXBwZXJMZW5ndGgpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKCh0YXJnZXQuc2VsZWN0aW9uU3RhcnQgIT0gbnVsbCkgJiYgdGFyZ2V0LnNlbGVjdGlvblN0YXJ0ICE9PSB2YWx1ZS5sZW5ndGgpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGNhcmQgJiYgY2FyZC50eXBlID09PSAnYW1leCcpIHtcbiAgICByZSA9IC9eKFxcZHs0fXxcXGR7NH1cXHNcXGR7Nn0pJC87XG4gIH0gZWxzZSB7XG4gICAgcmUgPSAvKD86XnxcXHMpKFxcZHs0fSkkLztcbiAgfVxuICBpZiAocmUudGVzdCh2YWx1ZSkpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIHZhbHVlICsgJyAnICsgZGlnaXQpO1xuICB9IGVsc2UgaWYgKHJlLnRlc3QodmFsdWUgKyBkaWdpdCkpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIHZhbHVlICsgZGlnaXQgKyAnICcpO1xuICB9XG59O1xuXG5mb3JtYXRCYWNrQ2FyZE51bWJlciA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIHRhcmdldCwgdmFsdWU7XG4gIHRhcmdldCA9IGUudGFyZ2V0O1xuICB2YWx1ZSA9IFFKLnZhbCh0YXJnZXQpO1xuICBpZiAoZS5tZXRhKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChlLndoaWNoICE9PSA4KSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICgodGFyZ2V0LnNlbGVjdGlvblN0YXJ0ICE9IG51bGwpICYmIHRhcmdldC5zZWxlY3Rpb25TdGFydCAhPT0gdmFsdWUubGVuZ3RoKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICgvXFxkXFxzJC8udGVzdCh2YWx1ZSkpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIHZhbHVlLnJlcGxhY2UoL1xcZFxccyQvLCAnJykpO1xuICB9IGVsc2UgaWYgKC9cXHNcXGQ/JC8udGVzdCh2YWx1ZSkpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIHZhbHVlLnJlcGxhY2UoL1xcc1xcZD8kLywgJycpKTtcbiAgfVxufTtcblxuZm9ybWF0RXhwaXJ5ID0gZnVuY3Rpb24oZSkge1xuICB2YXIgZGlnaXQsIHRhcmdldCwgdmFsO1xuICBkaWdpdCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZS53aGljaCk7XG4gIGlmICghL15cXGQrJC8udGVzdChkaWdpdCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gIHZhbCA9IFFKLnZhbCh0YXJnZXQpICsgZGlnaXQ7XG4gIGlmICgvXlxcZCQvLnRlc3QodmFsKSAmJiAodmFsICE9PSAnMCcgJiYgdmFsICE9PSAnMScpKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCBcIjBcIiArIHZhbCArIFwiIC8gXCIpO1xuICB9IGVsc2UgaWYgKC9eXFxkXFxkJC8udGVzdCh2YWwpKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCB2YWwgKyBcIiAvIFwiKTtcbiAgfVxufTtcblxuZm9ybWF0TW9udGhFeHBpcnkgPSBmdW5jdGlvbihlKSB7XG4gIHZhciBkaWdpdCwgdGFyZ2V0LCB2YWw7XG4gIGRpZ2l0ID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKTtcbiAgaWYgKCEvXlxcZCskLy50ZXN0KGRpZ2l0KSkge1xuICAgIHJldHVybjtcbiAgfVxuICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgdmFsID0gUUoudmFsKHRhcmdldCkgKyBkaWdpdDtcbiAgaWYgKC9eXFxkJC8udGVzdCh2YWwpICYmICh2YWwgIT09ICcwJyAmJiB2YWwgIT09ICcxJykpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIFwiMFwiICsgdmFsKTtcbiAgfSBlbHNlIGlmICgvXlxcZFxcZCQvLnRlc3QodmFsKSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgXCJcIiArIHZhbCk7XG4gIH1cbn07XG5cbmZvcm1hdEZvcndhcmRFeHBpcnkgPSBmdW5jdGlvbihlKSB7XG4gIHZhciBkaWdpdCwgdGFyZ2V0LCB2YWw7XG4gIGRpZ2l0ID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKTtcbiAgaWYgKCEvXlxcZCskLy50ZXN0KGRpZ2l0KSkge1xuICAgIHJldHVybjtcbiAgfVxuICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgdmFsID0gUUoudmFsKHRhcmdldCk7XG4gIGlmICgvXlxcZFxcZCQvLnRlc3QodmFsKSkge1xuICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCB2YWwgKyBcIiAvIFwiKTtcbiAgfVxufTtcblxuZm9ybWF0Rm9yd2FyZFNsYXNoID0gZnVuY3Rpb24oZSkge1xuICB2YXIgc2xhc2gsIHRhcmdldCwgdmFsO1xuICBzbGFzaCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZS53aGljaCk7XG4gIGlmIChzbGFzaCAhPT0gJy8nKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRhcmdldCA9IGUudGFyZ2V0O1xuICB2YWwgPSBRSi52YWwodGFyZ2V0KTtcbiAgaWYgKC9eXFxkJC8udGVzdCh2YWwpICYmIHZhbCAhPT0gJzAnKSB7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIFwiMFwiICsgdmFsICsgXCIgLyBcIik7XG4gIH1cbn07XG5cbmZvcm1hdEJhY2tFeHBpcnkgPSBmdW5jdGlvbihlKSB7XG4gIHZhciB0YXJnZXQsIHZhbHVlO1xuICBpZiAoZS5tZXRhS2V5KSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRhcmdldCA9IGUudGFyZ2V0O1xuICB2YWx1ZSA9IFFKLnZhbCh0YXJnZXQpO1xuICBpZiAoZS53aGljaCAhPT0gOCkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoKHRhcmdldC5zZWxlY3Rpb25TdGFydCAhPSBudWxsKSAmJiB0YXJnZXQuc2VsZWN0aW9uU3RhcnQgIT09IHZhbHVlLmxlbmd0aCkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoL1xcZChcXHN8XFwvKSskLy50ZXN0KHZhbHVlKSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgdmFsdWUucmVwbGFjZSgvXFxkKFxcc3xcXC8pKiQvLCAnJykpO1xuICB9IGVsc2UgaWYgKC9cXHNcXC9cXHM/XFxkPyQvLnRlc3QodmFsdWUpKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCB2YWx1ZS5yZXBsYWNlKC9cXHNcXC9cXHM/XFxkPyQvLCAnJykpO1xuICB9XG59O1xuXG5yZXN0cmljdE51bWVyaWMgPSBmdW5jdGlvbihlKSB7XG4gIHZhciBpbnB1dDtcbiAgaWYgKGUubWV0YUtleSB8fCBlLmN0cmxLZXkpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAoZS53aGljaCA9PT0gMzIpIHtcbiAgICByZXR1cm4gZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG4gIGlmIChlLndoaWNoID09PSAwKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKGUud2hpY2ggPCAzMykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlucHV0ID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKTtcbiAgaWYgKCEvW1xcZFxcc10vLnRlc3QoaW5wdXQpKSB7XG4gICAgcmV0dXJuIGUucHJldmVudERlZmF1bHQoKTtcbiAgfVxufTtcblxucmVzdHJpY3RDYXJkTnVtYmVyID0gZnVuY3Rpb24oZSkge1xuICB2YXIgY2FyZCwgZGlnaXQsIHRhcmdldCwgdmFsdWU7XG4gIHRhcmdldCA9IGUudGFyZ2V0O1xuICBkaWdpdCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZS53aGljaCk7XG4gIGlmICghL15cXGQrJC8udGVzdChkaWdpdCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGhhc1RleHRTZWxlY3RlZCh0YXJnZXQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhbHVlID0gKFFKLnZhbCh0YXJnZXQpICsgZGlnaXQpLnJlcGxhY2UoL1xcRC9nLCAnJyk7XG4gIGNhcmQgPSBjYXJkRnJvbU51bWJlcih2YWx1ZSk7XG4gIGlmIChjYXJkKSB7XG4gICAgaWYgKCEodmFsdWUubGVuZ3RoIDw9IGNhcmQubGVuZ3RoW2NhcmQubGVuZ3RoLmxlbmd0aCAtIDFdKSkge1xuICAgICAgcmV0dXJuIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKCEodmFsdWUubGVuZ3RoIDw9IDE2KSkge1xuICAgICAgcmV0dXJuIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH1cbn07XG5cbnJlc3RyaWN0RXhwaXJ5ID0gZnVuY3Rpb24oZSwgbGVuZ3RoKSB7XG4gIHZhciBkaWdpdCwgdGFyZ2V0LCB2YWx1ZTtcbiAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gIGRpZ2l0ID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKTtcbiAgaWYgKCEvXlxcZCskLy50ZXN0KGRpZ2l0KSkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoaGFzVGV4dFNlbGVjdGVkKHRhcmdldCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFsdWUgPSBRSi52YWwodGFyZ2V0KSArIGRpZ2l0O1xuICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1xcRC9nLCAnJyk7XG4gIGlmICh2YWx1ZS5sZW5ndGggPiBsZW5ndGgpIHtcbiAgICByZXR1cm4gZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG59O1xuXG5yZXN0cmljdENvbWJpbmVkRXhwaXJ5ID0gZnVuY3Rpb24oZSkge1xuICByZXR1cm4gcmVzdHJpY3RFeHBpcnkoZSwgNik7XG59O1xuXG5yZXN0cmljdE1vbnRoRXhwaXJ5ID0gZnVuY3Rpb24oZSkge1xuICByZXR1cm4gcmVzdHJpY3RFeHBpcnkoZSwgMik7XG59O1xuXG5yZXN0cmljdFllYXJFeHBpcnkgPSBmdW5jdGlvbihlKSB7XG4gIHJldHVybiByZXN0cmljdEV4cGlyeShlLCA0KTtcbn07XG5cbnJlc3RyaWN0Q1ZDID0gZnVuY3Rpb24oZSkge1xuICB2YXIgZGlnaXQsIHRhcmdldCwgdmFsO1xuICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgZGlnaXQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpO1xuICBpZiAoIS9eXFxkKyQvLnRlc3QoZGlnaXQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChoYXNUZXh0U2VsZWN0ZWQodGFyZ2V0KSkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YWwgPSBRSi52YWwodGFyZ2V0KSArIGRpZ2l0O1xuICBpZiAoISh2YWwubGVuZ3RoIDw9IDQpKSB7XG4gICAgcmV0dXJuIGUucHJldmVudERlZmF1bHQoKTtcbiAgfVxufTtcblxuc2V0Q2FyZFR5cGUgPSBmdW5jdGlvbihlKSB7XG4gIHZhciBhbGxUeXBlcywgY2FyZCwgY2FyZFR5cGUsIHRhcmdldCwgdmFsO1xuICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgdmFsID0gUUoudmFsKHRhcmdldCk7XG4gIGNhcmRUeXBlID0gUGF5bWVudC5mbnMuY2FyZFR5cGUodmFsKSB8fCAndW5rbm93bic7XG4gIGlmICghUUouaGFzQ2xhc3ModGFyZ2V0LCBjYXJkVHlwZSkpIHtcbiAgICBhbGxUeXBlcyA9IChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBpLCBsZW4sIHJlc3VsdHM7XG4gICAgICByZXN1bHRzID0gW107XG4gICAgICBmb3IgKGkgPSAwLCBsZW4gPSBjYXJkcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBjYXJkID0gY2FyZHNbaV07XG4gICAgICAgIHJlc3VsdHMucHVzaChjYXJkLnR5cGUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfSkoKTtcbiAgICBRSi5yZW1vdmVDbGFzcyh0YXJnZXQsICd1bmtub3duJyk7XG4gICAgUUoucmVtb3ZlQ2xhc3ModGFyZ2V0LCBhbGxUeXBlcy5qb2luKCcgJykpO1xuICAgIFFKLmFkZENsYXNzKHRhcmdldCwgY2FyZFR5cGUpO1xuICAgIFFKLnRvZ2dsZUNsYXNzKHRhcmdldCwgJ2lkZW50aWZpZWQnLCBjYXJkVHlwZSAhPT0gJ3Vua25vd24nKTtcbiAgICByZXR1cm4gUUoudHJpZ2dlcih0YXJnZXQsICdwYXltZW50LmNhcmRUeXBlJywgY2FyZFR5cGUpO1xuICB9XG59O1xuXG5QYXltZW50ID0gKGZ1bmN0aW9uKCkge1xuICBmdW5jdGlvbiBQYXltZW50KCkge31cblxuICBQYXltZW50LmZucyA9IHtcbiAgICBjYXJkRXhwaXJ5VmFsOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgdmFyIG1vbnRoLCBwcmVmaXgsIHJlZiwgeWVhcjtcbiAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvXFxzL2csICcnKTtcbiAgICAgIHJlZiA9IHZhbHVlLnNwbGl0KCcvJywgMiksIG1vbnRoID0gcmVmWzBdLCB5ZWFyID0gcmVmWzFdO1xuICAgICAgaWYgKCh5ZWFyICE9IG51bGwgPyB5ZWFyLmxlbmd0aCA6IHZvaWQgMCkgPT09IDIgJiYgL15cXGQrJC8udGVzdCh5ZWFyKSkge1xuICAgICAgICBwcmVmaXggPSAobmV3IERhdGUpLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgIHByZWZpeCA9IHByZWZpeC50b1N0cmluZygpLnNsaWNlKDAsIDIpO1xuICAgICAgICB5ZWFyID0gcHJlZml4ICsgeWVhcjtcbiAgICAgIH1cbiAgICAgIG1vbnRoID0gcGFyc2VJbnQobW9udGgsIDEwKTtcbiAgICAgIHllYXIgPSBwYXJzZUludCh5ZWFyLCAxMCk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBtb250aDogbW9udGgsXG4gICAgICAgIHllYXI6IHllYXJcbiAgICAgIH07XG4gICAgfSxcbiAgICB2YWxpZGF0ZUNhcmROdW1iZXI6IGZ1bmN0aW9uKG51bSkge1xuICAgICAgdmFyIGNhcmQsIHJlZjtcbiAgICAgIG51bSA9IChudW0gKyAnJykucmVwbGFjZSgvXFxzK3wtL2csICcnKTtcbiAgICAgIGlmICghL15cXGQrJC8udGVzdChudW0pKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGNhcmQgPSBjYXJkRnJvbU51bWJlcihudW0pO1xuICAgICAgaWYgKCFjYXJkKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAocmVmID0gbnVtLmxlbmd0aCwgaW5kZXhPZi5jYWxsKGNhcmQubGVuZ3RoLCByZWYpID49IDApICYmIChjYXJkLmx1aG4gPT09IGZhbHNlIHx8IGx1aG5DaGVjayhudW0pKTtcbiAgICB9LFxuICAgIHZhbGlkYXRlQ2FyZEV4cGlyeTogZnVuY3Rpb24obW9udGgsIHllYXIpIHtcbiAgICAgIHZhciBjdXJyZW50VGltZSwgZXhwaXJ5LCBwcmVmaXgsIHJlZjtcbiAgICAgIGlmICh0eXBlb2YgbW9udGggPT09ICdvYmplY3QnICYmICdtb250aCcgaW4gbW9udGgpIHtcbiAgICAgICAgcmVmID0gbW9udGgsIG1vbnRoID0gcmVmLm1vbnRoLCB5ZWFyID0gcmVmLnllYXI7XG4gICAgICB9XG4gICAgICBpZiAoIShtb250aCAmJiB5ZWFyKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBtb250aCA9IFFKLnRyaW0obW9udGgpO1xuICAgICAgeWVhciA9IFFKLnRyaW0oeWVhcik7XG4gICAgICBpZiAoIS9eXFxkKyQvLnRlc3QobW9udGgpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICghL15cXGQrJC8udGVzdCh5ZWFyKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoIShwYXJzZUludChtb250aCwgMTApIDw9IDEyKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoeWVhci5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgcHJlZml4ID0gKG5ldyBEYXRlKS5nZXRGdWxsWWVhcigpO1xuICAgICAgICBwcmVmaXggPSBwcmVmaXgudG9TdHJpbmcoKS5zbGljZSgwLCAyKTtcbiAgICAgICAgeWVhciA9IHByZWZpeCArIHllYXI7XG4gICAgICB9XG4gICAgICBleHBpcnkgPSBuZXcgRGF0ZSh5ZWFyLCBtb250aCk7XG4gICAgICBjdXJyZW50VGltZSA9IG5ldyBEYXRlO1xuICAgICAgZXhwaXJ5LnNldE1vbnRoKGV4cGlyeS5nZXRNb250aCgpIC0gMSk7XG4gICAgICBleHBpcnkuc2V0TW9udGgoZXhwaXJ5LmdldE1vbnRoKCkgKyAxLCAxKTtcbiAgICAgIHJldHVybiBleHBpcnkgPiBjdXJyZW50VGltZTtcbiAgICB9LFxuICAgIHZhbGlkYXRlQ2FyZENWQzogZnVuY3Rpb24oY3ZjLCB0eXBlKSB7XG4gICAgICB2YXIgcmVmLCByZWYxO1xuICAgICAgY3ZjID0gUUoudHJpbShjdmMpO1xuICAgICAgaWYgKCEvXlxcZCskLy50ZXN0KGN2YykpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGUgJiYgY2FyZEZyb21UeXBlKHR5cGUpKSB7XG4gICAgICAgIHJldHVybiByZWYgPSBjdmMubGVuZ3RoLCBpbmRleE9mLmNhbGwoKHJlZjEgPSBjYXJkRnJvbVR5cGUodHlwZSkpICE9IG51bGwgPyByZWYxLmN2Y0xlbmd0aCA6IHZvaWQgMCwgcmVmKSA+PSAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGN2Yy5sZW5ndGggPj0gMyAmJiBjdmMubGVuZ3RoIDw9IDQ7XG4gICAgICB9XG4gICAgfSxcbiAgICBjYXJkVHlwZTogZnVuY3Rpb24obnVtKSB7XG4gICAgICB2YXIgcmVmO1xuICAgICAgaWYgKCFudW0pIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICByZXR1cm4gKChyZWYgPSBjYXJkRnJvbU51bWJlcihudW0pKSAhPSBudWxsID8gcmVmLnR5cGUgOiB2b2lkIDApIHx8IG51bGw7XG4gICAgfSxcbiAgICBmb3JtYXRDYXJkTnVtYmVyOiBmdW5jdGlvbihudW0pIHtcbiAgICAgIHZhciBjYXJkLCBncm91cHMsIHJlZiwgdXBwZXJMZW5ndGg7XG4gICAgICBjYXJkID0gY2FyZEZyb21OdW1iZXIobnVtKTtcbiAgICAgIGlmICghY2FyZCkge1xuICAgICAgICByZXR1cm4gbnVtO1xuICAgICAgfVxuICAgICAgdXBwZXJMZW5ndGggPSBjYXJkLmxlbmd0aFtjYXJkLmxlbmd0aC5sZW5ndGggLSAxXTtcbiAgICAgIG51bSA9IG51bS5yZXBsYWNlKC9cXEQvZywgJycpO1xuICAgICAgbnVtID0gbnVtLnNsaWNlKDAsICt1cHBlckxlbmd0aCArIDEgfHwgOWU5KTtcbiAgICAgIGlmIChjYXJkLmZvcm1hdC5nbG9iYWwpIHtcbiAgICAgICAgcmV0dXJuIChyZWYgPSBudW0ubWF0Y2goY2FyZC5mb3JtYXQpKSAhPSBudWxsID8gcmVmLmpvaW4oJyAnKSA6IHZvaWQgMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGdyb3VwcyA9IGNhcmQuZm9ybWF0LmV4ZWMobnVtKTtcbiAgICAgICAgaWYgKGdyb3VwcyAhPSBudWxsKSB7XG4gICAgICAgICAgZ3JvdXBzLnNoaWZ0KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGdyb3VwcyAhPSBudWxsID8gZ3JvdXBzLmpvaW4oJyAnKSA6IHZvaWQgMDtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgUGF5bWVudC5yZXN0cmljdE51bWVyaWMgPSBmdW5jdGlvbihlbCkge1xuICAgIHJldHVybiBRSi5vbihlbCwgJ2tleXByZXNzJywgcmVzdHJpY3ROdW1lcmljKTtcbiAgfTtcblxuICBQYXltZW50LmNhcmRFeHBpcnlWYWwgPSBmdW5jdGlvbihlbCkge1xuICAgIHJldHVybiBQYXltZW50LmZucy5jYXJkRXhwaXJ5VmFsKFFKLnZhbChlbCkpO1xuICB9O1xuXG4gIFBheW1lbnQuZm9ybWF0Q2FyZENWQyA9IGZ1bmN0aW9uKGVsKSB7XG4gICAgUGF5bWVudC5yZXN0cmljdE51bWVyaWMoZWwpO1xuICAgIFFKLm9uKGVsLCAna2V5cHJlc3MnLCByZXN0cmljdENWQyk7XG4gICAgcmV0dXJuIGVsO1xuICB9O1xuXG4gIFBheW1lbnQuZm9ybWF0Q2FyZEV4cGlyeSA9IGZ1bmN0aW9uKGVsKSB7XG4gICAgdmFyIG1vbnRoLCB5ZWFyO1xuICAgIFBheW1lbnQucmVzdHJpY3ROdW1lcmljKGVsKTtcbiAgICBpZiAoZWwubGVuZ3RoICYmIGVsLmxlbmd0aCA9PT0gMikge1xuICAgICAgbW9udGggPSBlbFswXSwgeWVhciA9IGVsWzFdO1xuICAgICAgdGhpcy5mb3JtYXRDYXJkRXhwaXJ5TXVsdGlwbGUobW9udGgsIHllYXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBRSi5vbihlbCwgJ2tleXByZXNzJywgcmVzdHJpY3RDb21iaW5lZEV4cGlyeSk7XG4gICAgICBRSi5vbihlbCwgJ2tleXByZXNzJywgZm9ybWF0RXhwaXJ5KTtcbiAgICAgIFFKLm9uKGVsLCAna2V5cHJlc3MnLCBmb3JtYXRGb3J3YXJkU2xhc2gpO1xuICAgICAgUUoub24oZWwsICdrZXlwcmVzcycsIGZvcm1hdEZvcndhcmRFeHBpcnkpO1xuICAgICAgUUoub24oZWwsICdrZXlkb3duJywgZm9ybWF0QmFja0V4cGlyeSk7XG4gICAgfVxuICAgIHJldHVybiBlbDtcbiAgfTtcblxuICBQYXltZW50LmZvcm1hdENhcmRFeHBpcnlNdWx0aXBsZSA9IGZ1bmN0aW9uKG1vbnRoLCB5ZWFyKSB7XG4gICAgUUoub24obW9udGgsICdrZXlwcmVzcycsIHJlc3RyaWN0TW9udGhFeHBpcnkpO1xuICAgIFFKLm9uKG1vbnRoLCAna2V5cHJlc3MnLCBmb3JtYXRNb250aEV4cGlyeSk7XG4gICAgcmV0dXJuIFFKLm9uKHllYXIsICdrZXlwcmVzcycsIHJlc3RyaWN0WWVhckV4cGlyeSk7XG4gIH07XG5cbiAgUGF5bWVudC5mb3JtYXRDYXJkTnVtYmVyID0gZnVuY3Rpb24oZWwpIHtcbiAgICBQYXltZW50LnJlc3RyaWN0TnVtZXJpYyhlbCk7XG4gICAgUUoub24oZWwsICdrZXlwcmVzcycsIHJlc3RyaWN0Q2FyZE51bWJlcik7XG4gICAgUUoub24oZWwsICdrZXlwcmVzcycsIGZvcm1hdENhcmROdW1iZXIpO1xuICAgIFFKLm9uKGVsLCAna2V5ZG93bicsIGZvcm1hdEJhY2tDYXJkTnVtYmVyKTtcbiAgICBRSi5vbihlbCwgJ2tleXVwJywgc2V0Q2FyZFR5cGUpO1xuICAgIFFKLm9uKGVsLCAncGFzdGUnLCByZUZvcm1hdENhcmROdW1iZXIpO1xuICAgIHJldHVybiBlbDtcbiAgfTtcblxuICBQYXltZW50LmdldENhcmRBcnJheSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBjYXJkcztcbiAgfTtcblxuICBQYXltZW50LnNldENhcmRBcnJheSA9IGZ1bmN0aW9uKGNhcmRBcnJheSkge1xuICAgIGNhcmRzID0gY2FyZEFycmF5O1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIFBheW1lbnQuYWRkVG9DYXJkQXJyYXkgPSBmdW5jdGlvbihjYXJkT2JqZWN0KSB7XG4gICAgcmV0dXJuIGNhcmRzLnB1c2goY2FyZE9iamVjdCk7XG4gIH07XG5cbiAgUGF5bWVudC5yZW1vdmVGcm9tQ2FyZEFycmF5ID0gZnVuY3Rpb24odHlwZSkge1xuICAgIHZhciBrZXksIHZhbHVlO1xuICAgIGZvciAoa2V5IGluIGNhcmRzKSB7XG4gICAgICB2YWx1ZSA9IGNhcmRzW2tleV07XG4gICAgICBpZiAodmFsdWUudHlwZSA9PT0gdHlwZSkge1xuICAgICAgICBjYXJkcy5zcGxpY2Uoa2V5LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgcmV0dXJuIFBheW1lbnQ7XG5cbn0pKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gUGF5bWVudDtcblxuZ2xvYmFsLlBheW1lbnQgPSBQYXltZW50O1xuXG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxufSx7XCJxai9zcmMvcWouY29mZmVlXCI6MX1dfSx7fSxbMl0pKDIpXG59KTsiLCJmdW5jdGlvbiB0bGl0ZSh0KXtkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VvdmVyXCIsZnVuY3Rpb24oZSl7dmFyIGk9ZS50YXJnZXQsbj10KGkpO258fChuPShpPWkucGFyZW50RWxlbWVudCkmJnQoaSkpLG4mJnRsaXRlLnNob3coaSxuLCEwKX0pfXRsaXRlLnNob3c9ZnVuY3Rpb24odCxlLGkpe3ZhciBuPVwiZGF0YS10bGl0ZVwiO2U9ZXx8e30sKHQudG9vbHRpcHx8ZnVuY3Rpb24odCxlKXtmdW5jdGlvbiBvKCl7dGxpdGUuaGlkZSh0LCEwKX1mdW5jdGlvbiBsKCl7cnx8KHI9ZnVuY3Rpb24odCxlLGkpe2Z1bmN0aW9uIG4oKXtvLmNsYXNzTmFtZT1cInRsaXRlIHRsaXRlLVwiK3Irczt2YXIgZT10Lm9mZnNldFRvcCxpPXQub2Zmc2V0TGVmdDtvLm9mZnNldFBhcmVudD09PXQmJihlPWk9MCk7dmFyIG49dC5vZmZzZXRXaWR0aCxsPXQub2Zmc2V0SGVpZ2h0LGQ9by5vZmZzZXRIZWlnaHQsZj1vLm9mZnNldFdpZHRoLGE9aStuLzI7by5zdHlsZS50b3A9KFwic1wiPT09cj9lLWQtMTA6XCJuXCI9PT1yP2UrbCsxMDplK2wvMi1kLzIpK1wicHhcIixvLnN0eWxlLmxlZnQ9KFwid1wiPT09cz9pOlwiZVwiPT09cz9pK24tZjpcIndcIj09PXI/aStuKzEwOlwiZVwiPT09cj9pLWYtMTA6YS1mLzIpK1wicHhcIn12YXIgbz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3BhblwiKSxsPWkuZ3Jhdnx8dC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRsaXRlXCIpfHxcIm5cIjtvLmlubmVySFRNTD1lLHQuYXBwZW5kQ2hpbGQobyk7dmFyIHI9bFswXXx8XCJcIixzPWxbMV18fFwiXCI7bigpO3ZhciBkPW8uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7cmV0dXJuXCJzXCI9PT1yJiZkLnRvcDwwPyhyPVwiblwiLG4oKSk6XCJuXCI9PT1yJiZkLmJvdHRvbT53aW5kb3cuaW5uZXJIZWlnaHQ/KHI9XCJzXCIsbigpKTpcImVcIj09PXImJmQubGVmdDwwPyhyPVwid1wiLG4oKSk6XCJ3XCI9PT1yJiZkLnJpZ2h0PndpbmRvdy5pbm5lcldpZHRoJiYocj1cImVcIixuKCkpLG8uY2xhc3NOYW1lKz1cIiB0bGl0ZS12aXNpYmxlXCIsb30odCxkLGUpKX12YXIgcixzLGQ7cmV0dXJuIHQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZG93blwiLG8pLHQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIixvKSx0LnRvb2x0aXA9e3Nob3c6ZnVuY3Rpb24oKXtkPXQudGl0bGV8fHQuZ2V0QXR0cmlidXRlKG4pfHxkLHQudGl0bGU9XCJcIix0LnNldEF0dHJpYnV0ZShuLFwiXCIpLGQmJiFzJiYocz1zZXRUaW1lb3V0KGwsaT8xNTA6MSkpfSxoaWRlOmZ1bmN0aW9uKHQpe2lmKGk9PT10KXtzPWNsZWFyVGltZW91dChzKTt2YXIgZT1yJiZyLnBhcmVudE5vZGU7ZSYmZS5yZW1vdmVDaGlsZChyKSxyPXZvaWQgMH19fX0odCxlKSkuc2hvdygpfSx0bGl0ZS5oaWRlPWZ1bmN0aW9uKHQsZSl7dC50b29sdGlwJiZ0LnRvb2x0aXAuaGlkZShlKX0sXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZSYmbW9kdWxlLmV4cG9ydHMmJihtb2R1bGUuZXhwb3J0cz10bGl0ZSk7IiwiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSh7MTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XCJ1c2Ugc3RyaWN0XCI7dmFyIF92YWxpZEZvcm09cmVxdWlyZShcIi4vc3JjL3ZhbGlkLWZvcm1cIik7dmFyIF92YWxpZEZvcm0yPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3ZhbGlkRm9ybSk7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmope3JldHVybiBvYmomJm9iai5fX2VzTW9kdWxlP29iajp7ZGVmYXVsdDpvYmp9fXdpbmRvdy5WYWxpZEZvcm09X3ZhbGlkRm9ybTIuZGVmYXVsdDt3aW5kb3cuVmFsaWRGb3JtLnRvZ2dsZUludmFsaWRDbGFzcz1fdmFsaWRGb3JtLnRvZ2dsZUludmFsaWRDbGFzczt3aW5kb3cuVmFsaWRGb3JtLmhhbmRsZUN1c3RvbU1lc3NhZ2VzPV92YWxpZEZvcm0uaGFuZGxlQ3VzdG9tTWVzc2FnZXM7d2luZG93LlZhbGlkRm9ybS5oYW5kbGVDdXN0b21NZXNzYWdlRGlzcGxheT1fdmFsaWRGb3JtLmhhbmRsZUN1c3RvbU1lc3NhZ2VEaXNwbGF5fSx7XCIuL3NyYy92YWxpZC1mb3JtXCI6M31dLDI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1widXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTp0cnVlfSk7ZXhwb3J0cy5jbG9uZT1jbG9uZTtleHBvcnRzLmRlZmF1bHRzPWRlZmF1bHRzO2V4cG9ydHMuaW5zZXJ0QWZ0ZXI9aW5zZXJ0QWZ0ZXI7ZXhwb3J0cy5pbnNlcnRCZWZvcmU9aW5zZXJ0QmVmb3JlO2V4cG9ydHMuZm9yRWFjaD1mb3JFYWNoO2V4cG9ydHMuZGVib3VuY2U9ZGVib3VuY2U7ZnVuY3Rpb24gY2xvbmUob2JqKXt2YXIgY29weT17fTtmb3IodmFyIGF0dHIgaW4gb2JqKXtpZihvYmouaGFzT3duUHJvcGVydHkoYXR0cikpY29weVthdHRyXT1vYmpbYXR0cl19cmV0dXJuIGNvcHl9ZnVuY3Rpb24gZGVmYXVsdHMob2JqLGRlZmF1bHRPYmplY3Qpe29iaj1jbG9uZShvYmp8fHt9KTtmb3IodmFyIGsgaW4gZGVmYXVsdE9iamVjdCl7aWYob2JqW2tdPT09dW5kZWZpbmVkKW9ialtrXT1kZWZhdWx0T2JqZWN0W2tdfXJldHVybiBvYmp9ZnVuY3Rpb24gaW5zZXJ0QWZ0ZXIocmVmTm9kZSxub2RlVG9JbnNlcnQpe3ZhciBzaWJsaW5nPXJlZk5vZGUubmV4dFNpYmxpbmc7aWYoc2libGluZyl7dmFyIF9wYXJlbnQ9cmVmTm9kZS5wYXJlbnROb2RlO19wYXJlbnQuaW5zZXJ0QmVmb3JlKG5vZGVUb0luc2VydCxzaWJsaW5nKX1lbHNle3BhcmVudC5hcHBlbmRDaGlsZChub2RlVG9JbnNlcnQpfX1mdW5jdGlvbiBpbnNlcnRCZWZvcmUocmVmTm9kZSxub2RlVG9JbnNlcnQpe3ZhciBwYXJlbnQ9cmVmTm9kZS5wYXJlbnROb2RlO3BhcmVudC5pbnNlcnRCZWZvcmUobm9kZVRvSW5zZXJ0LHJlZk5vZGUpfWZ1bmN0aW9uIGZvckVhY2goaXRlbXMsZm4pe2lmKCFpdGVtcylyZXR1cm47aWYoaXRlbXMuZm9yRWFjaCl7aXRlbXMuZm9yRWFjaChmbil9ZWxzZXtmb3IodmFyIGk9MDtpPGl0ZW1zLmxlbmd0aDtpKyspe2ZuKGl0ZW1zW2ldLGksaXRlbXMpfX19ZnVuY3Rpb24gZGVib3VuY2UobXMsZm4pe3ZhciB0aW1lb3V0PXZvaWQgMDt2YXIgZGVib3VuY2VkRm49ZnVuY3Rpb24gZGVib3VuY2VkRm4oKXtjbGVhclRpbWVvdXQodGltZW91dCk7dGltZW91dD1zZXRUaW1lb3V0KGZuLG1zKX07cmV0dXJuIGRlYm91bmNlZEZufX0se31dLDM6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1widXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTp0cnVlfSk7ZXhwb3J0cy50b2dnbGVJbnZhbGlkQ2xhc3M9dG9nZ2xlSW52YWxpZENsYXNzO2V4cG9ydHMuaGFuZGxlQ3VzdG9tTWVzc2FnZXM9aGFuZGxlQ3VzdG9tTWVzc2FnZXM7ZXhwb3J0cy5oYW5kbGVDdXN0b21NZXNzYWdlRGlzcGxheT1oYW5kbGVDdXN0b21NZXNzYWdlRGlzcGxheTtleHBvcnRzLmRlZmF1bHQ9dmFsaWRGb3JtO3ZhciBfdXRpbD1yZXF1aXJlKFwiLi91dGlsXCIpO2Z1bmN0aW9uIHRvZ2dsZUludmFsaWRDbGFzcyhpbnB1dCxpbnZhbGlkQ2xhc3Mpe2lucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnZhbGlkXCIsZnVuY3Rpb24oKXtpbnB1dC5jbGFzc0xpc3QuYWRkKGludmFsaWRDbGFzcyl9KTtpbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIixmdW5jdGlvbigpe2lmKGlucHV0LnZhbGlkaXR5LnZhbGlkKXtpbnB1dC5jbGFzc0xpc3QucmVtb3ZlKGludmFsaWRDbGFzcyl9fSl9dmFyIGVycm9yUHJvcHM9W1wiYmFkSW5wdXRcIixcInBhdHRlcm5NaXNtYXRjaFwiLFwicmFuZ2VPdmVyZmxvd1wiLFwicmFuZ2VVbmRlcmZsb3dcIixcInN0ZXBNaXNtYXRjaFwiLFwidG9vTG9uZ1wiLFwidG9vU2hvcnRcIixcInR5cGVNaXNtYXRjaFwiLFwidmFsdWVNaXNzaW5nXCIsXCJjdXN0b21FcnJvclwiXTtmdW5jdGlvbiBnZXRDdXN0b21NZXNzYWdlKGlucHV0LGN1c3RvbU1lc3NhZ2VzKXtjdXN0b21NZXNzYWdlcz1jdXN0b21NZXNzYWdlc3x8e307dmFyIGxvY2FsRXJyb3JQcm9wcz1baW5wdXQudHlwZStcIk1pc21hdGNoXCJdLmNvbmNhdChlcnJvclByb3BzKTt2YXIgdmFsaWRpdHk9aW5wdXQudmFsaWRpdHk7Zm9yKHZhciBpPTA7aTxsb2NhbEVycm9yUHJvcHMubGVuZ3RoO2krKyl7dmFyIHByb3A9bG9jYWxFcnJvclByb3BzW2ldO2lmKHZhbGlkaXR5W3Byb3BdKXtyZXR1cm4gaW5wdXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1cIitwcm9wKXx8Y3VzdG9tTWVzc2FnZXNbcHJvcF19fX1mdW5jdGlvbiBoYW5kbGVDdXN0b21NZXNzYWdlcyhpbnB1dCxjdXN0b21NZXNzYWdlcyl7ZnVuY3Rpb24gY2hlY2tWYWxpZGl0eSgpe3ZhciBtZXNzYWdlPWlucHV0LnZhbGlkaXR5LnZhbGlkP251bGw6Z2V0Q3VzdG9tTWVzc2FnZShpbnB1dCxjdXN0b21NZXNzYWdlcyk7aW5wdXQuc2V0Q3VzdG9tVmFsaWRpdHkobWVzc2FnZXx8XCJcIil9aW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsY2hlY2tWYWxpZGl0eSk7aW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImludmFsaWRcIixjaGVja1ZhbGlkaXR5KX1mdW5jdGlvbiBoYW5kbGVDdXN0b21NZXNzYWdlRGlzcGxheShpbnB1dCxvcHRpb25zKXt2YXIgdmFsaWRhdGlvbkVycm9yQ2xhc3M9b3B0aW9ucy52YWxpZGF0aW9uRXJyb3JDbGFzcyx2YWxpZGF0aW9uRXJyb3JQYXJlbnRDbGFzcz1vcHRpb25zLnZhbGlkYXRpb25FcnJvclBhcmVudENsYXNzLGVycm9yUGxhY2VtZW50PW9wdGlvbnMuZXJyb3JQbGFjZW1lbnQ7ZnVuY3Rpb24gY2hlY2tWYWxpZGl0eShvcHRpb25zKXt2YXIgaW5zZXJ0RXJyb3I9b3B0aW9ucy5pbnNlcnRFcnJvcjt2YXIgcGFyZW50Tm9kZT1pbnB1dC5wYXJlbnROb2RlO3ZhciBlcnJvck5vZGU9cGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKFwiLlwiK3ZhbGlkYXRpb25FcnJvckNsYXNzKXx8ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtpZighaW5wdXQudmFsaWRpdHkudmFsaWQmJmlucHV0LnZhbGlkYXRpb25NZXNzYWdlKXtlcnJvck5vZGUuY2xhc3NOYW1lPXZhbGlkYXRpb25FcnJvckNsYXNzO2Vycm9yTm9kZS50ZXh0Q29udGVudD1pbnB1dC52YWxpZGF0aW9uTWVzc2FnZTtpZihpbnNlcnRFcnJvcil7ZXJyb3JQbGFjZW1lbnQ9PT1cImJlZm9yZVwiPygwLF91dGlsLmluc2VydEJlZm9yZSkoaW5wdXQsZXJyb3JOb2RlKTooMCxfdXRpbC5pbnNlcnRBZnRlcikoaW5wdXQsZXJyb3JOb2RlKTtwYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQodmFsaWRhdGlvbkVycm9yUGFyZW50Q2xhc3MpfX1lbHNle3BhcmVudE5vZGUuY2xhc3NMaXN0LnJlbW92ZSh2YWxpZGF0aW9uRXJyb3JQYXJlbnRDbGFzcyk7ZXJyb3JOb2RlLnJlbW92ZSgpfX1pbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIixmdW5jdGlvbigpe2NoZWNrVmFsaWRpdHkoe2luc2VydEVycm9yOmZhbHNlfSl9KTtpbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiaW52YWxpZFwiLGZ1bmN0aW9uKGUpe2UucHJldmVudERlZmF1bHQoKTtjaGVja1ZhbGlkaXR5KHtpbnNlcnRFcnJvcjp0cnVlfSl9KX12YXIgZGVmYXVsdE9wdGlvbnM9e2ludmFsaWRDbGFzczpcImludmFsaWRcIix2YWxpZGF0aW9uRXJyb3JDbGFzczpcInZhbGlkYXRpb24tZXJyb3JcIix2YWxpZGF0aW9uRXJyb3JQYXJlbnRDbGFzczpcImhhcy12YWxpZGF0aW9uLWVycm9yXCIsY3VzdG9tTWVzc2FnZXM6e30sZXJyb3JQbGFjZW1lbnQ6XCJiZWZvcmVcIn07ZnVuY3Rpb24gdmFsaWRGb3JtKGVsZW1lbnQsb3B0aW9ucyl7aWYoIWVsZW1lbnR8fCFlbGVtZW50Lm5vZGVOYW1lKXt0aHJvdyBuZXcgRXJyb3IoXCJGaXJzdCBhcmcgdG8gdmFsaWRGb3JtIG11c3QgYmUgYSBmb3JtLCBpbnB1dCwgc2VsZWN0LCBvciB0ZXh0YXJlYVwiKX12YXIgaW5wdXRzPXZvaWQgMDt2YXIgdHlwZT1lbGVtZW50Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7b3B0aW9ucz0oMCxfdXRpbC5kZWZhdWx0cykob3B0aW9ucyxkZWZhdWx0T3B0aW9ucyk7aWYodHlwZT09PVwiZm9ybVwiKXtpbnB1dHM9ZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXQsIHNlbGVjdCwgdGV4dGFyZWFcIik7Zm9jdXNJbnZhbGlkSW5wdXQoZWxlbWVudCxpbnB1dHMpfWVsc2UgaWYodHlwZT09PVwiaW5wdXRcInx8dHlwZT09PVwic2VsZWN0XCJ8fHR5cGU9PT1cInRleHRhcmVhXCIpe2lucHV0cz1bZWxlbWVudF19ZWxzZXt0aHJvdyBuZXcgRXJyb3IoXCJPbmx5IGZvcm0sIGlucHV0LCBzZWxlY3QsIG9yIHRleHRhcmVhIGVsZW1lbnRzIGFyZSBzdXBwb3J0ZWRcIil9dmFsaWRGb3JtSW5wdXRzKGlucHV0cyxvcHRpb25zKX1mdW5jdGlvbiBmb2N1c0ludmFsaWRJbnB1dChmb3JtLGlucHV0cyl7dmFyIGZvY3VzRmlyc3Q9KDAsX3V0aWwuZGVib3VuY2UpKDEwMCxmdW5jdGlvbigpe3ZhciBpbnZhbGlkTm9kZT1mb3JtLnF1ZXJ5U2VsZWN0b3IoXCI6aW52YWxpZFwiKTtpZihpbnZhbGlkTm9kZSlpbnZhbGlkTm9kZS5mb2N1cygpfSk7KDAsX3V0aWwuZm9yRWFjaCkoaW5wdXRzLGZ1bmN0aW9uKGlucHV0KXtyZXR1cm4gaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImludmFsaWRcIixmb2N1c0ZpcnN0KX0pfWZ1bmN0aW9uIHZhbGlkRm9ybUlucHV0cyhpbnB1dHMsb3B0aW9ucyl7dmFyIGludmFsaWRDbGFzcz1vcHRpb25zLmludmFsaWRDbGFzcyxjdXN0b21NZXNzYWdlcz1vcHRpb25zLmN1c3RvbU1lc3NhZ2VzOygwLF91dGlsLmZvckVhY2gpKGlucHV0cyxmdW5jdGlvbihpbnB1dCl7dG9nZ2xlSW52YWxpZENsYXNzKGlucHV0LGludmFsaWRDbGFzcyk7aGFuZGxlQ3VzdG9tTWVzc2FnZXMoaW5wdXQsY3VzdG9tTWVzc2FnZXMpO2hhbmRsZUN1c3RvbU1lc3NhZ2VEaXNwbGF5KGlucHV0LG9wdGlvbnMpfSl9fSx7XCIuL3V0aWxcIjoyfV19LHt9LFsxXSk7IiwiLy8gTWlublBvc3QgR2l2aW5nIHBsdWdpblxuLy8gdGhlIHNlbWktY29sb24gYmVmb3JlIGZ1bmN0aW9uIGludm9jYXRpb24gaXMgYSBzYWZldHkgbmV0IGFnYWluc3QgY29uY2F0ZW5hdGVkXG4vLyBzY3JpcHRzIGFuZC9vciBvdGhlciBwbHVnaW5zIHdoaWNoIG1heSBub3QgYmUgY2xvc2VkIHByb3Blcmx5LlxuOyhmdW5jdGlvbiAoICQsIHdpbmRvdywgZG9jdW1lbnQsIHVuZGVmaW5lZCApIHtcblxuICAvLyB1bmRlZmluZWQgaXMgdXNlZCBoZXJlIGFzIHRoZSB1bmRlZmluZWQgZ2xvYmFsIHZhcmlhYmxlIGluIEVDTUFTY3JpcHQgMyBpc1xuICAvLyBtdXRhYmxlIChpZS4gaXQgY2FuIGJlIGNoYW5nZWQgYnkgc29tZW9uZSBlbHNlKS4gdW5kZWZpbmVkIGlzbid0IHJlYWxseSBiZWluZ1xuICAvLyBwYXNzZWQgaW4gc28gd2UgY2FuIGVuc3VyZSB0aGUgdmFsdWUgb2YgaXQgaXMgdHJ1bHkgdW5kZWZpbmVkLiBJbiBFUzUsIHVuZGVmaW5lZFxuICAvLyBjYW4gbm8gbG9uZ2VyIGJlIG1vZGlmaWVkLlxuXG4gIC8vIHdpbmRvdyBhbmQgZG9jdW1lbnQgYXJlIHBhc3NlZCB0aHJvdWdoIGFzIGxvY2FsIHZhcmlhYmxlIHJhdGhlciB0aGFuIGdsb2JhbFxuICAvLyBhcyB0aGlzIChzbGlnaHRseSkgcXVpY2tlbnMgdGhlIHJlc29sdXRpb24gcHJvY2VzcyBhbmQgY2FuIGJlIG1vcmUgZWZmaWNpZW50bHlcbiAgLy8gbWluaWZpZWQgKGVzcGVjaWFsbHkgd2hlbiBib3RoIGFyZSByZWd1bGFybHkgcmVmZXJlbmNlZCBpbiB5b3VyIHBsdWdpbikuXG5cbiAgLy8gQ3JlYXRlIHRoZSBkZWZhdWx0cyBvbmNlXG4gIHZhciBwbHVnaW5OYW1lID0gJ21pbm5wb3N0X2dpdmluZycsXG4gIGRlZmF1bHRzID0ge1xuICAgICdkZWJ1ZycgOiBmYWxzZSwgLy8gdGhpcyBjYW4gYmUgc2V0IHRvIHRydWUgb24gcGFnZSBsZXZlbCBvcHRpb25zXG4gICAgJ3N0cmlwZV9wdWJsaXNoYWJsZV9rZXknIDogJycsXG4gICAgJ3BsYWlkX2VudicgOiAnJyxcbiAgICAncGxhaWRfbGluaycgOiAnI2F1dGhvcml6ZS1hY2gnLFxuICAgICdtaW5ucG9zdF9yb290JyA6ICdodHRwczovL3d3dy5taW5ucG9zdC5jb20nLFxuICAgICdwcm9ncmVzc19zZWxlY3RvcicgOiAnLm0tc3VwcG9ydC1wcm9ncmVzcycsXG4gICAgJ2Zvcm1fc2VsZWN0b3InIDogJy5tLWZvcm0nLFxuICAgICdkb25hdGVfZm9ybV9zZWxlY3Rvcic6ICcjZG9uYXRlJyxcbiAgICAnY29uZmlybV9mb3JtX3NlbGVjdG9yJyA6ICcjY29uZmlybScsXG4gICAgJ2ZpbmlzaF9zZWN0aW9uX3NlbGVjdG9yJyA6ICcjcGFuZWwtLWNvbmZpcm1hdGlvbicsXG4gICAgJ3BheV9jY19wcm9jZXNzaW5nX3NlbGVjdG9yJyA6ICdpbnB1dFtuYW1lPVwicGF5X2ZlZXNcIl0nLFxuICAgICdmZWVfYW1vdW50JyA6ICcucHJvY2Vzc2luZy1hbW91bnQnLFxuICAgICdsZXZlbF9hbW91bnRfc2VsZWN0b3InIDogJyNwYW5lbC0tcGF5IC5hbW91bnQgLmxldmVsLWFtb3VudCcsIC8vIHdlIGNhbiBtYXliZSBnZXQgcmlkIG9mIHRoaXNcbiAgICAnb3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yJyA6ICdbbmFtZT1cImFtb3VudFwiXScsXG4gICAgJ2ZhaXJfbWFya2V0X3ZhbHVlX3NlbGVjdG9yJyA6ICcjZmFpcl9tYXJrZXRfdmFsdWUnLFxuICAgICdmdWxsX2Ftb3VudF9zZWxlY3RvcicgOiAnLmZ1bGwtYW1vdW50JyxcbiAgICAnaW5zdGFsbG1lbnRfcGVyaW9kX3NlbGVjdG9yJyA6ICdbbmFtZT1cImluc3RhbGxtZW50X3BlcmlvZFwiXScsXG4gICAgJ25hbWVfc2VsZWN0b3InIDogJy5tLWZvcm0taXRlbS1kaXNwbGF5LW5hbWUnLFxuICAgICdpbl9ob25vcl9vcl9tZW1vcnlfZmllbGRfc2VsZWN0b3InIDogJy5tLWZvcm0taXRlbS1ob25vci1tZW1vcnknLFxuICAgICdob25vcl9vcl9tZW1vcnlfY2hvb3NlcicgOiAnaW5wdXRbbmFtZT1cImluX2hvbm9yX29yX21lbW9yeVwiXScsIC8vIHJhZGlvIGZpZWxkc1xuICAgICdob25vcl90eXBlX3NlbGVjdG9yJyA6ICcuYS1ob25vci10eXBlJywgLy8gc3BhbiBpbnNpZGUgbGFiZWxcbiAgICAnaG9ub3JfbWVtb3J5X2lucHV0X2dyb3VwJyA6ICcuYS1ob25vci1vci1tZW1vcnknLCAvLyBob2xkcyB0aGUgZm9ybSBmaWVsZFxuICAgICdhbm9ueW1vdXNfc2VsZWN0b3InIDogJyNhbm9ueW1vdXMnLFxuICAgICdzaG93X2JpbGxpbmdfY291bnRyeV9zZWxlY3RvcicgOiAnI2JpbGxpbmdfc2hvd19jb3VudHJ5JyxcbiAgICAnYmlsbGluZ19jb3VudHJ5X3NlbGVjdG9yJyA6ICcubS1mb3JtLWl0ZW0tY291bnRyeScsXG4gICAgJ3Nob3dfc2hpcHBpbmdfY291bnRyeV9zZWxlY3RvcicgOiAnI3NoaXBwaW5nX3Nob3dfY291bnRyeScsXG4gICAgJ3NoaXBwaW5nX2NvdW50cnlfc2VsZWN0b3InIDogJy5tLWZvcm0taXRlbS1zaGlwcGluZy1jb3VudHJ5JyxcbiAgICAnc2hpcHBpbmdfYWRkcmVzc19zZWxlY3RvcicgOiAnLm0tZm9ybS1pdGVtLXNoaXBwaW5nLWFkZHJlc3MnLFxuICAgICd1c2VfZm9yX3NoaXBwaW5nX3NlbGVjdG9yJyA6ICcjdXNlZm9yc2hpcHBpbmcnLFxuICAgICdlbWFpbF9maWVsZF9zZWxlY3RvcicgOiAnI2VtYWlsJyxcbiAgICAncGFzc3dvcmRfZmllbGRfc2VsZWN0b3InIDogJyNwYXNzd29yZCcsXG4gICAgJ2ZpcnN0X25hbWVfZmllbGRfc2VsZWN0b3InIDogJyNmaXJzdF9uYW1lJyxcbiAgICAnbGFzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yJyA6ICcjbGFzdF9uYW1lJyxcbiAgICAnYmlsbGluZ19zdHJlZXRfZmllbGRfc2VsZWN0b3InIDogJyNiaWxsaW5nX3N0cmVldCcsXG4gICAgJ2JpbGxpbmdfY2l0eV9maWVsZF9zZWxlY3RvcicgOiAnI2JpbGxpbmdfY2l0eScsXG4gICAgJ2JpbGxpbmdfc3RhdGVfZmllbGRfc2VsZWN0b3InIDogJyNiaWxsaW5nX3N0YXRlJyxcbiAgICAnYmlsbGluZ196aXBfZmllbGRfc2VsZWN0b3InOiAnI2JpbGxpbmdfemlwJyxcbiAgICAnYmlsbGluZ19jb3VudHJ5X2ZpZWxkX3NlbGVjdG9yJyA6ICcjYmlsbGluZ19jb3VudHJ5JyxcbiAgICAnY3JlYXRlX21wX3NlbGVjdG9yJyA6ICcjY3JlYXRlbXBhY2NvdW50JyxcbiAgICAncGFzc3dvcmRfc2VsZWN0b3InIDogJy5tLWZvcm0taXRlbS1wYXNzd29yZCcsXG4gICAgJ2FkZGl0aW9uYWxfYW1vdW50X2ZpZWxkJyA6ICcjYWRkaXRpb25hbF9kb25hdGlvbicsXG4gICAgJ3NoaXBwaW5nX3NlbGVjdG9yJyA6ICdmaWVsZHNldC5tLXNoaXBwaW5nLWluZm9ybWF0aW9uJyxcbiAgICAnY2hvb3NlX3BheW1lbnQnIDogJyNjaG9vc2UtcGF5bWVudC1tZXRob2QnLFxuICAgICdwYXltZW50X21ldGhvZF9zZWxlY3RvcicgOiAnLnBheW1lbnQtbWV0aG9kJyxcbiAgICAnY2NfbnVtX3NlbGVjdG9yJyA6ICcjY2FyZC1udW1iZXInLFxuICAgICdjY19leHBfc2VsZWN0b3InIDogJyNjYXJkLWV4cGlyeScsXG4gICAgJ2NjX2N2Y19zZWxlY3RvcicgOiAnI2NhcmQtY3ZjJyxcbiAgICAncGF5X2J1dHRvbl9zZWxlY3RvcicgOiAnLmEtYnV0dG9uLXBheScsXG4gICAgJ29wcF9pZF9zZWxlY3RvcicgOiAnI2xvY2tfa2V5JywgLy8gd2UgdXNlIHRoaXMgdmFsdWUgYXMgdGhlIEdvb2dsZSBBbmFseXRpY3MgdHJhbnNhY3Rpb24gSURcbiAgICAnbmV3c2xldHRlcl9ncm91cF9zZWxlY3RvcicgOiAnLnN1cHBvcnQtbmV3c2xldHRlcnMnXG4gIH07IC8vIGVuZCBkZWZhdWx0c1xuXG4gIC8vIFRoZSBhY3R1YWwgcGx1Z2luIGNvbnN0cnVjdG9yXG4gIGZ1bmN0aW9uIFBsdWdpbiggZWxlbWVudCwgb3B0aW9ucyApIHtcblxuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG5cbiAgICAvLyBqUXVlcnkgaGFzIGFuIGV4dGVuZCBtZXRob2Qgd2hpY2ggbWVyZ2VzIHRoZSBjb250ZW50cyBvZiB0d28gb3JcbiAgICAvLyBtb3JlIG9iamVjdHMsIHN0b3JpbmcgdGhlIHJlc3VsdCBpbiB0aGUgZmlyc3Qgb2JqZWN0LiBUaGUgZmlyc3Qgb2JqZWN0XG4gICAgLy8gaXMgZ2VuZXJhbGx5IGVtcHR5IGFzIHdlIGRvbid0IHdhbnQgdG8gYWx0ZXIgdGhlIGRlZmF1bHQgb3B0aW9ucyBmb3JcbiAgICAvLyBmdXR1cmUgaW5zdGFuY2VzIG9mIHRoZSBwbHVnaW5cbiAgICB0aGlzLm9wdGlvbnMgPSAkLmV4dGVuZCgge30sIGRlZmF1bHRzLCBvcHRpb25zICk7XG5cbiAgICB0aGlzLl9kZWZhdWx0cyA9IGRlZmF1bHRzO1xuICAgIHRoaXMuX25hbWUgPSBwbHVnaW5OYW1lO1xuXG4gICAgdGhpcy5pbml0KCk7XG4gIH0gLy8gZW5kIGNvbnN0cnVjdG9yXG5cbiAgUGx1Z2luLnByb3RvdHlwZSA9IHtcblxuICAgIGluaXQ6IGZ1bmN0aW9uKHJlc2V0LCBhbW91bnQpIHtcblxuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCAnbm8tanMnICk7XG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoICdqcycgKTtcblxuICAgICAgLy8gUGxhY2UgaW5pdGlhbGl6YXRpb24gbG9naWMgaGVyZVxuICAgICAgLy8gWW91IGFscmVhZHkgaGF2ZSBhY2Nlc3MgdG8gdGhlIERPTSBlbGVtZW50IGFuZFxuICAgICAgLy8gdGhlIG9wdGlvbnMgdmlhIHRoZSBpbnN0YW5jZSwgZS5nLiB0aGlzLmVsZW1lbnRcbiAgICAgIC8vIGFuZCB0aGlzLm9wdGlvbnNcbiAgICAgIC8vIHlvdSBjYW4gYWRkIG1vcmUgZnVuY3Rpb25zIGxpa2UgdGhlIG9uZSBiZWxvdyBhbmRcbiAgICAgIC8vIGNhbGwgdGhlbSBsaWtlIHNvOiB0aGlzLnlvdXJPdGhlckZ1bmN0aW9uKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKS5cblxuICAgICAgLy8gbW9kaWZ5IG9wdGlvbnMgYXMgbmVlZGVkXG4gICAgICAvL3ZhciB0aGlzLm9wdGlvbnMuYW1vdW50ID0gJyc7XG4gICAgICBpZiAocmVzZXQgIT09IHRydWUpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLmFtb3VudCA9IHBhcnNlRmxvYXQoJCh0aGlzLm9wdGlvbnMubGV2ZWxfYW1vdW50X3NlbGVjdG9yLCB0aGlzLmVsZW1lbnQpLnRleHQoKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm9wdGlvbnMuYW1vdW50ID0gYW1vdW50O1xuICAgICAgfVxuICAgICAgdGhpcy5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCAgICAgPSBwYXJzZUludCgkKHRoaXMub3B0aW9ucy5vcmlnaW5hbF9hbW91bnRfc2VsZWN0b3IsIHRoaXMuZWxlbWVudCkudmFsKCksIDEwKTtcbiAgICAgIHRoaXMub3B0aW9ucy5wcm9jZXNzaW5nX2ZlZSAgICAgID0gKE1hdGgucm91bmQocGFyc2VGbG9hdCh0aGlzLm9wdGlvbnMuZmVlX2Ftb3VudCkqTWF0aC5wb3coMTAsMikpL01hdGgucG93KDEwLDIpKS50b0ZpeGVkKDIpO1xuICAgICAgdGhpcy5vcHRpb25zLnByb2Nlc3NpbmdfZmVlX3RleHQgPSB0aGlzLm9wdGlvbnMucHJvY2Vzc2luZ19mZWU7XG4gICAgICB0aGlzLm9wdGlvbnMuY3JlYXRlX2FjY291bnQgICAgICA9IGZhbHNlO1xuXG4gICAgICB2YXIgYnV0dG9uX3RleHQgPSAkKHRoaXMub3B0aW9ucy5wYXlfYnV0dG9uX3NlbGVjdG9yKS50ZXh0KCk7XG4gICAgICB0aGlzLm9wdGlvbnMuYnV0dG9uX3RleHQgPSBidXR0b25fdGV4dDtcblxuICAgICAgdGhpcy5zdHJpcGUgPSBTdHJpcGUodGhpcy5vcHRpb25zLnN0cmlwZV9wdWJsaXNoYWJsZV9rZXkpO1xuICAgICAgdGhpcy5lbGVtZW50cyA9IHRoaXMuc3RyaXBlLmVsZW1lbnRzKHtcbiAgICAgICAgZm9udHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICAvLyBpbnRlZ3JhdGUgeW91ciBmb250IGludG8gc3RyaXBlXG4gICAgICAgICAgICBjc3NTcmM6ICdodHRwczovL3VzZS50eXBla2l0Lm5ldC9jeGo3ZnpnLmNzcycsXG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9KTtcblxuICAgICAgLy8gdXNlIGEgcmVmZXJyZXIgZm9yIGVkaXQgbGluayBpZiB3ZSBoYXZlIG9uZVxuICAgICAgaWYgKGRvY3VtZW50LnJlZmVycmVyICE9PSAnJykge1xuICAgICAgICAkKCcjZWRpdF91cmwnKS5wcm9wKCdocmVmJywgZG9jdW1lbnQucmVmZXJyZXIpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5vcHRpb25zLmRlYnVnID09PSB0cnVlKSB7XG4gICAgICAgIHRoaXMuZGVidWcodGhpcy5vcHRpb25zKTtcbiAgICAgICAgLy8gcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBjYWxsIGZ1bmN0aW9uc1xuICAgICAgdGhpcy5hbmFseXRpY3NUcmFja2luZyh0aGlzLm9wdGlvbnMpOyAvLyB0cmFjayBhbmFseXRpY3MgZXZlbnRzXG4gICAgICB0aGlzLmFtb3VudEFzUmFkaW8odGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBpZiB0aGUgYW1vdW50IGZpZWxkIGlzIGEgcmFkaW8gYnV0dG9uXG4gICAgICB0aGlzLmFtb3VudFVwZGF0ZWQodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBpZiB0aGUgYW1vdW50IHRleHQgZmllbGQgY2FuIGNoYW5nZVxuXG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMucGF5X2NjX3Byb2Nlc3Npbmdfc2VsZWN0b3IpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5jcmVkaXRDYXJkUHJvY2Vzc2luZ0ZlZXModGhpcy5vcHRpb25zKTsgLy8gcHJvY2Vzc2luZyBmZWVzXG4gICAgICB9XG4gICAgICBcbiAgICAgIC8vIHRoZSBtYWluIGZvcm0gSUQuIHRoaXMgaXMgbm90IHVzZWQgZm9yIGNhbmNlbGxpbmdcbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLmRvbmF0ZUFub255bW91c2x5KHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gYW5vbnltb3VzXG4gICAgICAgIHRoaXMuaG9ub3JPck1lbW9yeVRvZ2dsZSh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIGluIGhvbm9yIG9yIGluIG1lbW9yeSBvZiBzb21lb25lXG4gICAgICAgIHRoaXMub3V0c2lkZVVuaXRlZFN0YXRlcyh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIG91dHNpZGUgVVNcbiAgICAgICAgdGhpcy5zaGlwcGluZ0FkZHJlc3ModGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBzaGlwcGluZyBhZGRyZXNzXG4gICAgICAgIHRoaXMuYWxsb3dNaW5ucG9zdEFjY291bnQodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBvcHRpb24gZm9yIGNyZWF0aW5nIG1pbm5wb3N0IGFjY291bnRcbiAgICAgICAgdGhpcy5wYXltZW50UmVxdWVzdEJ1dHRvbih0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIGNyZWF0ZSBwYXltZW50cmVxdWVzdCBidXR0b25cbiAgICAgICAgdGhpcy5jaG9vc2VQYXltZW50TWV0aG9kKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gc3dpdGNoIGJldHdlZW4gY2FyZCBhbmQgYWNoXG4gICAgICAgIHRoaXMuY3JlZGl0Q2FyZEZpZWxkcyh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIGRvIHN0dWZmIHdpdGggdGhlIGNyZWRpdCBjYXJkIGZpZWxkc1xuICAgICAgICB0aGlzLnZhbGlkYXRlU2V0dXAodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBzZXR1cCBob3cgdmFsaWRhdGlvbiBlcnJvcnMgd29ya1xuICAgICAgICB0aGlzLmZvcm1TZXR1cCh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIHZhbGlkYXRlIGFuZCBzdWJtaXQgdGhlIGZvcm1cbiAgICAgIH1cblxuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmNvbmZpcm1fZm9ybV9zZWxlY3RvcikubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLnNob3dOZXdzbGV0dGVyU2V0dGluZ3ModGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpO1xuICAgICAgICB0aGlzLmNvbmZpcm1NZXNzYWdlU3VibWl0KHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gc3VibWl0IHRoZSBzdHVmZiBvbiB0aGUgY29uZmlybWF0aW9uIHBhZ2VcbiAgICAgIH1cblxuICAgIH0sIC8vIGluaXRcblxuICAgIGRlYnVnOiBmdW5jdGlvbihtZXNzYWdlKSB7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLmRlYnVnID09PSB0cnVlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgbWVzc2FnZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhtZXNzYWdlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmRpcihtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmRpcih0aGlzKTtcbiAgICAgIH1cbiAgICB9LCAvLyBkZWJ1Z1xuXG4gICAgYW5hbHl0aWNzVHJhY2tpbmc6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgIHZhciBwcm9ncmVzcyA9ICQob3B0aW9ucy5wcm9ncmVzc19zZWxlY3Rvcik7XG4gICAgICB2YXIgc3RlcDtcbiAgICAgIHZhciBuYXZfaXRlbV9jb3VudCA9IDA7XG4gICAgICB2YXIgb3BwX2lkID0gJChvcHRpb25zLm9wcF9pZF9zZWxlY3RvcikudmFsKCk7XG4gICAgICB2YXIgcG9zdF9wdXJjaGFzZSA9IGZhbHNlO1xuICAgICAgaWYgKHByb2dyZXNzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgbmF2X2l0ZW1fY291bnQgPSAkKCdsaScsIHByb2dyZXNzKS5sZW5ndGg7IC8vIGxlbmd0aCBpcyBub3QgemVybyBiYXNlZFxuICAgICAgICBzdGVwID0gJCgnbGkgLmFjdGl2ZScsIHByb2dyZXNzKS5wYXJlbnQoKS5pbmRleCgpICsgMTsgLy8gaW5kZXggaXMgemVybyBiYXNlZFxuICAgICAgfVxuICAgICAgLy8gdGhlcmUgaXMgYSBwcm9ncmVzcyBtZW51LCBBTkQgdGhlcmUgSVMgTk9UIGEgY29uZmlybSBmb3JtIHNlbGVjdG9yXG4gICAgICAvLyBpZiB0aGF0IGlzIHRoZSBjYXNlLCB3ZSdyZSBub3Qgb24gdGhlIHB1cmNoYXNlIHN0ZXBcbiAgICAgIGlmIChwcm9ncmVzcy5sZW5ndGggPiAwICYmICQob3B0aW9ucy5jb25maXJtX2Zvcm1fc2VsZWN0b3IpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAvLyB0aGUgYWN0aXZlIHRhYiBtYXRjaGVzIHRoZSBjb3VudCBvZiBpdGVtcyBBTkQgdGhlcmUgaXMgTk9UIGEgY29uZmlybSBmb3JtIHRvIGJlIHN1Ym1pdHRlZFxuICAgICAgICAvLyB0aGF0IG1lYW5zIHdlJ3JlIG9uIGEgcG9zdCBwdXJjaGFzZSBzdGVwLlxuICAgICAgICBpZiAoc3RlcCA9PT0gbmF2X2l0ZW1fY291bnQgJiYgJChvcHRpb25zLmNvbmZpcm1fZm9ybV9zZWxlY3RvcikubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgc3RlcCA9IHN0ZXAgKyAxO1xuICAgICAgICAgIHBvc3RfcHVyY2hhc2UgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHByb2dyZXNzLmxlbmd0aCA+IDAgJiYgJChvcHRpb25zLmNvbmZpcm1fZm9ybV9zZWxlY3RvcikubGVuZ3RoID4gMCB8fCAkKG9wdGlvbnMuZmluaXNoX3NlY3Rpb25fc2VsZWN0b3IpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgLy8gd2UgYXJlIG9uIHRoZSBjb25maXJtIGZvcm0gc2VsZWN0b3IgYW5kIHRoZXJlIGlzIGEgcHJvZ3Jlc3MgbWVhc3VyZVxuICAgICAgICAvLyBPUiwgd2UgYXJlIG9uIHRoZSBmaW5pc2ggc2VsZWN0b3IgYW5kIHRoZXJlIGlzIE5PVCBhIHByb2dyZXNzIG1lYXN1cmVcbiAgICAgICAgLy8gdGhlc2UgbWVhbiB0aGUgdXNlciBqdXN0IHB1cmNoYXNlZC5cbiAgICAgICAgc3RlcCA9ICdwdXJjaGFzZSc7XG4gICAgICB9IGVsc2UgaWYgKHByb2dyZXNzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLmRlYnVnKCAnc3RlcCBpcyAnICsgc3RlcCArICcgYW5kIG5hdiBpdGVtIGNvdW50IGlzICcgKyBuYXZfaXRlbV9jb3VudCArICcgYW5kIG9wcCBpZCBpcyAnICsgb3BwX2lkICsgJyBhbmQgcG9zdCBwdXJjaGFzZSBpcyAnICsgcG9zdF9wdXJjaGFzZSApO1xuICAgICAgdGhpcy5hbmFseXRpY3NUcmFja2luZ1N0ZXAoc3RlcCwgcG9zdF9wdXJjaGFzZSk7XG4gICAgfSwgLy8gYW5hbHl0aWNzVHJhY2tpbmdcblxuICAgIGFuYWx5dGljc1RyYWNraW5nU3RlcDogZnVuY3Rpb24oc3RlcCwgcG9zdF9wdXJjaGFzZSkge1xuICAgICAgdmFyIHByb2dyZXNzID0gJCh0aGlzLm9wdGlvbnMucHJvZ3Jlc3Nfc2VsZWN0b3IpO1xuICAgICAgdmFyIGFtb3VudCA9ICQodGhpcy5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudF9zZWxlY3RvcikudmFsKCk7XG4gICAgICB2YXIgb3BwX2lkID0gJCh0aGlzLm9wdGlvbnMub3BwX2lkX3NlbGVjdG9yKS52YWwoKTtcbiAgICAgIHZhciBpbnN0YWxsbWVudF9wZXJpb2QgPSAnb25lLXRpbWUnO1xuICAgICAgdmFyIGxldmVsO1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmluc3RhbGxtZW50X3BlcmlvZF9zZWxlY3RvcikubGVuZ3RoID4gMCApIHtcbiAgICAgICAgaW5zdGFsbG1lbnRfcGVyaW9kID0gJCh0aGlzLm9wdGlvbnMuaW5zdGFsbG1lbnRfcGVyaW9kX3NlbGVjdG9yKS52YWwoKTtcbiAgICAgIH1cbiAgICAgIC8vIGlmIHdlJ3JlIG5vdCBhZnRlciB0aGUgcHVyY2hhc2UsIHVzZSBhZGRQcm9kdWN0XG4gICAgICBpZiAocHJvZ3Jlc3MubGVuZ3RoID4gMCAmJiBwb3N0X3B1cmNoYXNlICE9PSB0cnVlKSB7XG4gICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgIGFtb3VudDogYW1vdW50LFxuICAgICAgICAgIGluc3RhbGxtZW50X3BlcmlvZDogaW5zdGFsbG1lbnRfcGVyaW9kXG4gICAgICAgIH07XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgdXJsOiAnL2NhbGN1bGF0ZS1tZW1iZXItbGV2ZWwvJyxcbiAgICAgICAgICBkYXRhOiBkYXRhXG4gICAgICAgIH0pLmRvbmUoZnVuY3Rpb24oIGRhdGEgKSB7XG4gICAgICAgICAgaWYgKCQoZGF0YS5sZXZlbCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGV2ZWwgPSBkYXRhLmxldmVsLmxldmVsO1xuICAgICAgICAgICAgdGhhdC5kZWJ1ZygnYWRkIHByb2R1Y3Q6IGlkIGlzICcgKyAnbWlubnBvc3RfJyArIGxldmVsLnRvTG93ZXJDYXNlKCkgKyAnX21lbWJlcnNoaXAnICsgJyBhbmQgbmFtZSBpcyAnICsgJ01pbm5Qb3N0ICcgKyBsZXZlbC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGxldmVsLnNsaWNlKDEpICsgJyBNZW1iZXJzaGlwJyArICcgYW5kIHZhcmlhbnQgaXMgJyArIGluc3RhbGxtZW50X3BlcmlvZC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGluc3RhbGxtZW50X3BlcmlvZC5zbGljZSgxKSk7XG4gICAgICAgICAgICBnYSgnZWM6YWRkUHJvZHVjdCcsIHtcbiAgICAgICAgICAgICAgJ2lkJzogJ21pbm5wb3N0XycgKyBsZXZlbC50b0xvd2VyQ2FzZSgpICsgJ19tZW1iZXJzaGlwJyxcbiAgICAgICAgICAgICAgJ25hbWUnOiAnTWlublBvc3QgJyArIGxldmVsLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgbGV2ZWwuc2xpY2UoMSkgKyAnIE1lbWJlcnNoaXAnLFxuICAgICAgICAgICAgICAnY2F0ZWdvcnknOiAnRG9uYXRpb24nLFxuICAgICAgICAgICAgICAnYnJhbmQnOiAnTWlublBvc3QnLFxuICAgICAgICAgICAgICAndmFyaWFudCc6IGluc3RhbGxtZW50X3BlcmlvZC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGluc3RhbGxtZW50X3BlcmlvZC5zbGljZSgxKSxcbiAgICAgICAgICAgICAgJ3ByaWNlJzogYW1vdW50LFxuICAgICAgICAgICAgICAncXVhbnRpdHknOiAxXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RlcCA9PT0gJ3B1cmNoYXNlJykge1xuICAgICAgICB0aGlzLmRlYnVnKCdhZGQgYSBwdXJjaGFzZSBhY3Rpb24uIHN0ZXAgaXMgJyArIHN0ZXApO1xuICAgICAgICBnYSgnZWM6c2V0QWN0aW9uJywgc3RlcCx7XG4gICAgICAgICAgJ2lkJzogb3BwX2lkLCAvLyBUcmFuc2FjdGlvbiBpZCAtIFR5cGU6IHN0cmluZ1xuICAgICAgICAgICdhZmZpbGlhdGlvbic6ICdNaW5uUG9zdCcsIC8vIFN0b3JlIG5hbWUgLSBUeXBlOiBzdHJpbmdcbiAgICAgICAgICAncmV2ZW51ZSc6IGFtb3VudCwgLy8gVG90YWwgUmV2ZW51ZSAtIFR5cGU6IG51bWVyaWNcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmRlYnVnKCdhZGQgYSBjaGVja291dCBhY3Rpb24uIHN0ZXAgaXMgJyArIHN0ZXApO1xuICAgICAgICBnYSgnZWM6c2V0QWN0aW9uJywnY2hlY2tvdXQnLCB7XG4gICAgICAgICAgJ3N0ZXAnOiBzdGVwLCAvLyBBIHZhbHVlIG9mIDEgaW5kaWNhdGVzIGZpcnN0IGNoZWNrb3V0IHN0ZXAuIFZhbHVlIG9mIDIgaW5kaWNhdGVzIHNlY29uZCBjaGVja291dCBzdGVwXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBnYSgnc2V0Jywge1xuICAgICAgICBwYWdlOiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUsXG4gICAgICAgIHRpdGxlOiBkb2N1bWVudC50aXRsZVxuICAgICAgfSk7XG4gICAgICBnYSgnc2VuZCcsICdwYWdldmlldycsIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSk7XG5cbiAgICB9LCAvLyBhbmFseXRpY3NUcmFja2luZ1N0ZXBcblxuICAgIGFtb3VudEFzUmFkaW86IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIC8vIHdoZW4gYW1vdW50IGZpZWxkIGlzIGEgcmFkaW8gYnV0dG9uLCB3ZSBuZWVkIHRvIGNoZWNrIGl0IHdoZW5ldmVyIGl0IGNoYW5nZXNcbiAgICAgICQob3B0aW9ucy5vcmlnaW5hbF9hbW91bnRfc2VsZWN0b3IsIGVsZW1lbnQpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCQodGhpcykuaXMoJzpyYWRpbycpKSB7XG4gICAgICAgICAgICBvcHRpb25zLm9yaWdpbmFsX2Ftb3VudCA9IHBhcnNlSW50KCQob3B0aW9ucy5vcmlnaW5hbF9hbW91bnRfc2VsZWN0b3IgKyAnOmNoZWNrZWQnLCBlbGVtZW50KS52YWwoKSwgMTApO1xuICAgICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sIC8vIGFtb3VudEFzUmFkaW9cblxuICAgIGFtb3VudFVwZGF0ZWQ6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIC8vIHdoZW4gbmV3IGFtb3VudCB0ZXh0IGZpZWxkIGNhbiBjaGFuZ2UsIHdlIG5lZWQgdG8gY2hhbmdlIHRoZSBoaWRkZW4gZmllbGRcbiAgICAgIC8vIHRoZXJlIGlzIGFsc28gcG90ZW50aWFsbHkgYW4gYWRkaXRpb25hbCBhbW91bnQgZmllbGQgdmFsdWUgdG8gYWRkXG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB2YXIgc3RyaXBlX3BheW1lbnRfdHlwZSA9IHRoYXQuZ2V0U3RyaXBlUGF5bWVudFR5cGUoKTtcblxuICAgICAgLy8gc2V0IHRoZSBmYWlyIG1hcmtldCB2YWx1ZSBpZiBhcHBsaWNhYmxlXG4gICAgICB2YXIgYW1vdW50X3NlbGVjdG9yX2ZhaXJfbWFya2V0ID0gJChvcHRpb25zLm9yaWdpbmFsX2Ftb3VudF9zZWxlY3RvciwgZWxlbWVudCk7XG4gICAgICBpZiAoYW1vdW50X3NlbGVjdG9yX2ZhaXJfbWFya2V0LmlzKCc6cmFkaW8nKSkge1xuICAgICAgICBhbW91bnRfc2VsZWN0b3JfZmFpcl9tYXJrZXQgPSAkKG9wdGlvbnMub3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yICsgJzpjaGVja2VkJywgZWxlbWVudCk7XG4gICAgICB9XG4gICAgICB0aGF0LnNldEZhaXJNYXJrZXRWYWx1ZShhbW91bnRfc2VsZWN0b3JfZmFpcl9tYXJrZXQpO1xuXG4gICAgICAkKG9wdGlvbnMub3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoYXQub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQgPSBwYXJzZUludCgkKHRoaXMsIGVsZW1lbnQpLnZhbCgpLCAxMCk7XG4gICAgICAgIHRoYXQuY2FsY3VsYXRlRmVlcyh0aGF0Lm9wdGlvbnMub3JpZ2luYWxfYW1vdW50LCBzdHJpcGVfcGF5bWVudF90eXBlKTtcbiAgICAgICAgdGhhdC5zZXRGYWlyTWFya2V0VmFsdWUoJCh0aGlzLCBlbGVtZW50KSk7XG4gICAgICB9KTtcbiAgICAgICQob3B0aW9ucy5hZGRpdGlvbmFsX2Ftb3VudF9maWVsZCwgZWxlbWVudCkuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGF0Lm9wdGlvbnMub3JpZ2luYWxfYW1vdW50ID0gcGFyc2VJbnQoJChvcHRpb25zLm9yaWdpbmFsX2Ftb3VudF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksIDEwKTtcbiAgICAgICAgdGhhdC5jYWxjdWxhdGVGZWVzKHRoYXQub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQsIHN0cmlwZV9wYXltZW50X3R5cGUpO1xuICAgICAgfSk7XG5cbiAgICB9LCAvLyBhbW91bnRVcGRhdGVkXG5cbiAgICBnZXRUb3RhbEFtb3VudDogZnVuY3Rpb24oYW1vdW50KSB7XG4gICAgICBhbW91bnQgPSAodHlwZW9mIGFtb3VudCAhPT0gJ3VuZGVmaW5lZCcpID8gIGFtb3VudCA6IHRoaXMub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQ7XG4gICAgICB2YXIgdG90YWxfYW1vdW50ID0gYW1vdW50O1xuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmFkZGl0aW9uYWxfYW1vdW50X2ZpZWxkKS5sZW5ndGggPiAwICYmICQodGhpcy5vcHRpb25zLmFkZGl0aW9uYWxfYW1vdW50X2ZpZWxkKS52YWwoKSA+IDApIHtcbiAgICAgICAgdmFyIGFkZGl0aW9uYWxfYW1vdW50ID0gJCh0aGlzLm9wdGlvbnMuYWRkaXRpb25hbF9hbW91bnRfZmllbGQpLnZhbCgpO1xuICAgICAgICB0b3RhbF9hbW91bnQgPSBwYXJzZUludChhZGRpdGlvbmFsX2Ftb3VudCwgMTApICsgcGFyc2VJbnQoYW1vdW50LCAxMCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdG90YWxfYW1vdW50O1xuICAgIH0sIC8vIGdldFRvdGFsQW1vdW50XG5cbiAgICBzZXRGYWlyTWFya2V0VmFsdWU6IGZ1bmN0aW9uKGFtb3VudF9zZWxlY3Rvcikge1xuICAgICAgLy8gaWYgdGhlcmUgaXMgYSBmYWlyIG1hcmtldCB2YWx1ZSBmaWVsZCwgY2hlY2sgYW5kIHNlZSBpZiB3ZSBjYW4gcG9wdWxhdGUgaXRcbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5mYWlyX21hcmtldF92YWx1ZV9zZWxlY3RvcikubGVuZ3RoID4gMCkge1xuICAgICAgICB2YXIgZmFpck1hcmtldFZhbHVlID0gYW1vdW50X3NlbGVjdG9yLmRhdGEoJ2ZhaXItbWFya2V0LXZhbHVlJyk7XG4gICAgICAgICQodGhpcy5vcHRpb25zLmZhaXJfbWFya2V0X3ZhbHVlX3NlbGVjdG9yKS52YWwoZmFpck1hcmtldFZhbHVlKTtcbiAgICAgIH1cbiAgICB9LCAvLyBzZXRGYWlyTWFya2V0VmFsdWVcblxuICAgIGNhbGN1bGF0ZUZlZXM6IGZ1bmN0aW9uKGFtb3VudCwgc3RyaXBlX3BheW1lbnRfdHlwZSkge1xuICAgICAgLy8gdGhpcyBzZW5kcyB0aGUgYW1vdW50IGFuZCBzdHJpcGUgcGF5bWVudCB0eXBlIHRvIHB5dGhvbjsgZ2V0IHRoZSBmZWUgYW5kIGRpc3BsYXkgaXQgdG8gdGhlIHVzZXIgb24gdGhlIGNoZWNrYm94IGxhYmVsXG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB2YXIgdG90YWxfYW1vdW50ID0gdGhhdC5nZXRUb3RhbEFtb3VudChhbW91bnQpO1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIGFtb3VudDogdG90YWxfYW1vdW50LFxuICAgICAgICBzdHJpcGVfcGF5bWVudF90eXBlOiBzdHJpcGVfcGF5bWVudF90eXBlXG4gICAgICB9O1xuICAgICAgdGhhdC5zZXRTdHJpcGVQYXltZW50VHlwZShzdHJpcGVfcGF5bWVudF90eXBlKTtcbiAgICAgICQuYWpheCh7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICB1cmw6ICcvY2FsY3VsYXRlLWZlZXMvJyxcbiAgICAgICAgZGF0YTogZGF0YVxuICAgICAgfSkuZG9uZShmdW5jdGlvbiggZGF0YSApIHtcbiAgICAgICAgaWYgKCQoZGF0YS5mZWVzKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgJCh0aGF0Lm9wdGlvbnMuZmVlX2Ftb3VudCkudGV4dChwYXJzZUZsb2F0KGRhdGEuZmVlcykudG9GaXhlZCgyKSk7XG4gICAgICAgICAgdGhhdC5jcmVkaXRDYXJkRmVlQ2hlY2tib3goJCh0aGF0Lm9wdGlvbnMucGF5X2NjX3Byb2Nlc3Npbmdfc2VsZWN0b3IpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSwgLy8gY2FsY3VsYXRlRmVlc1xuXG4gICAgY3JlZGl0Q2FyZFByb2Nlc3NpbmdGZWVzOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAvLyB0aGlzIGFkZHMgb3Igc3VidHJhY3RzIHRoZSBmZWUgdG8gdGhlIG9yaWdpbmFsIGFtb3VudCB3aGVuIHRoZSB1c2VyIGluZGljYXRlcyB0aGV5IGRvIG9yIGRvIG5vdCB3YW50IHRvIHBheSB0aGUgZmVlc1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdGhhdC5jcmVkaXRDYXJkRmVlQ2hlY2tib3goJChvcHRpb25zLnBheV9jY19wcm9jZXNzaW5nX3NlbGVjdG9yKSk7XG4gICAgICAkKG9wdGlvbnMucGF5X2NjX3Byb2Nlc3Npbmdfc2VsZWN0b3IpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdGhhdC5jcmVkaXRDYXJkRmVlQ2hlY2tib3godGhpcyk7XG4gICAgICB9KTtcbiAgICB9LCAvLyBjcmVkaXRDYXJkUHJvY2Vzc2luZ0ZlZXNcblxuICAgIGdldFN0cmlwZVBheW1lbnRUeXBlOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBzdHJpcGVfcGF5bWVudF90eXBlID0gJ2NhcmQnO1xuICAgICAgaWYgKCQoJ2lucHV0W25hbWU9XCJzdHJpcGVfcGF5bWVudF90eXBlXCJdJykubGVuZ3RoID4gMCkge1xuICAgICAgICBzdHJpcGVfcGF5bWVudF90eXBlID0gJCgnaW5wdXRbbmFtZT1cInN0cmlwZV9wYXltZW50X3R5cGVcIl0nKS52YWwoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdHJpcGVfcGF5bWVudF90eXBlO1xuICAgIH0sIC8vIGdldFN0cmlwZVBheW1lbnRUeXBlXG5cbiAgICBzZXRTdHJpcGVQYXltZW50VHlwZTogZnVuY3Rpb24oc3RyaXBlX3BheW1lbnRfdHlwZSkge1xuICAgICAgaWYgKCQoJ2lucHV0W25hbWU9XCJzdHJpcGVfcGF5bWVudF90eXBlXCJdJykubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICQodGhpcy5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5hcHBlbmQoJzxpbnB1dCB0eXBlPVxcXCJoaWRkZW5cXFwiIG5hbWU9XFxcInN0cmlwZV9wYXltZW50X3R5cGVcXFwiPicpO1xuICAgICAgfVxuICAgICAgJCgnaW5wdXRbbmFtZT1cInN0cmlwZV9wYXltZW50X3R5cGVcIl0nKS52YWwoc3RyaXBlX3BheW1lbnRfdHlwZSk7XG4gICAgICByZXR1cm4gc3RyaXBlX3BheW1lbnRfdHlwZTtcbiAgICB9LCAvLyBzZXRTdHJpcGVQYXltZW50VHlwZVxuXG4gICAgY3JlZGl0Q2FyZEZlZUNoZWNrYm94OiBmdW5jdGlvbihmaWVsZCkge1xuICAgICAgdmFyIGZ1bGxfYW1vdW50O1xuICAgICAgdmFyIHRvdGFsX2Ftb3VudCA9IHRoaXMuZ2V0VG90YWxBbW91bnQoKTtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIGlmICgkKGZpZWxkKS5pcygnOmNoZWNrZWQnKSB8fCAkKGZpZWxkKS5wcm9wKCdjaGVja2VkJykpIHtcbiAgICAgICAgJCgnLmFtb3VudCAubGV2ZWwtYW1vdW50JykuYWRkQ2xhc3MoJ2Z1bGwtYW1vdW50Jyk7XG4gICAgICAgIGZ1bGxfYW1vdW50ID0gKHRvdGFsX2Ftb3VudCArIHBhcnNlRmxvYXQoJCh0aGF0Lm9wdGlvbnMuZmVlX2Ftb3VudCkudGV4dCgpKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmdWxsX2Ftb3VudCA9IHRvdGFsX2Ftb3VudDtcbiAgICAgIH1cbiAgICAgICQodGhhdC5vcHRpb25zLmZ1bGxfYW1vdW50X3NlbGVjdG9yKS50ZXh0KHBhcnNlRmxvYXQoZnVsbF9hbW91bnQpLnRvRml4ZWQoMikpO1xuXG4gICAgICAvLyB1cGRhdGUgdGhlIHBheW1lbnQgcmVxdWVzdFxuICAgICAgaWYgKHRoaXMucGF5bWVudFJlcXVlc3QgJiYgZnVsbF9hbW91bnQpIHtcbiAgICAgICAgdGhpcy5wYXltZW50UmVxdWVzdC51cGRhdGUoe1xuICAgICAgICAgIHRvdGFsOiB7XG4gICAgICAgICAgICBsYWJlbDogXCJNaW5uUG9zdFwiLFxuICAgICAgICAgICAgYW1vdW50OiBmdWxsX2Ftb3VudCAqIDEwMFxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICB9LCAvLyBjcmVkaXRDYXJkRmVlQ2hlY2tib3hcblxuICAgIGRvbmF0ZUFub255bW91c2x5OiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB0aGF0LnRvZ2dsZUFub255bW91cygkKG9wdGlvbnMuYW5vbnltb3VzX3NlbGVjdG9yLCBlbGVtZW50KSk7XG4gICAgICAkKG9wdGlvbnMuYW5vbnltb3VzX3NlbGVjdG9yLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoYXQudG9nZ2xlQW5vbnltb3VzKCQodGhpcykpO1xuICAgICAgfSk7XG4gICAgfSwgLy8gZG9uYXRlQW5vbnltb3VzbHlcblxuICAgIHRvZ2dsZUFub255bW91czogZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgaWYgKGVsZW1lbnQuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgJCh0aGlzLm9wdGlvbnMubmFtZV9zZWxlY3RvciArICcgZGl2OmZpcnN0JywgdGhpcy5lbGVtZW50KS5oaWRlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkKHRoaXMub3B0aW9ucy5uYW1lX3NlbGVjdG9yICsgJyBkaXY6Zmlyc3QnLCB0aGlzLmVsZW1lbnQpLnNob3coKTtcbiAgICAgIH1cbiAgICB9LCAvLyB0b2dnbGVBbm9ueW1vdXNcblxuICAgIGhvbm9yT3JNZW1vcnk6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIGlmICgkKG9wdGlvbnMuaG9ub3Jfb3JfbWVtb3J5X2Nob29zZXIgKyAnOmNoZWNrZWQnKS52YWwoKSkge1xuICAgICAgICAkKG9wdGlvbnMuaG9ub3JfbWVtb3J5X2lucHV0X2dyb3VwLCBlbGVtZW50KS5zaG93KCk7XG4gICAgICAgICQob3B0aW9ucy5ob25vcl90eXBlX3NlbGVjdG9yKS50ZXh0KCQob3B0aW9ucy5ob25vcl9vcl9tZW1vcnlfY2hvb3NlciArICc6Y2hlY2tlZCcpLnZhbCgpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQob3B0aW9ucy5ob25vcl9tZW1vcnlfaW5wdXRfZ3JvdXAsIGVsZW1lbnQpLmhpZGUoKTtcbiAgICAgICAgJChvcHRpb25zLmhvbm9yX25hbWVfc2VsZWN0b3IgKyAnIGlucHV0JywgZWxlbWVudCkudmFsKCcnKTtcbiAgICAgIH1cbiAgICB9LCAvLyBob25vck9yTWVtb3J5XG5cbiAgICBob25vck9yTWVtb3J5VG9nZ2xlOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB0aGF0Lmhvbm9yT3JNZW1vcnkodGhhdC5lbGVtZW50LCB0aGF0Lm9wdGlvbnMpO1xuICAgICAgJChvcHRpb25zLmhvbm9yX29yX21lbW9yeV9jaG9vc2VyLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoYXQuaG9ub3JPck1lbW9yeSh0aGF0LmVsZW1lbnQsIHRoYXQub3B0aW9ucyk7XG4gICAgICB9KTtcbiAgICB9LCAvLyBob25vck9yTWVtb3J5VG9nZ2xlXG5cbiAgICBvdXRzaWRlVW5pdGVkU3RhdGVzOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICAkKG9wdGlvbnMuc2hvd19iaWxsaW5nX2NvdW50cnlfc2VsZWN0b3IpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAkKG9wdGlvbnMuYmlsbGluZ19jb3VudHJ5X3NlbGVjdG9yKS5zaG93KCk7XG4gICAgICAgICQodGhpcykucGFyZW50KCkuaGlkZSgpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KTtcbiAgICAgICQob3B0aW9ucy5zaG93X3NoaXBwaW5nX2NvdW50cnlfc2VsZWN0b3IpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAkKG9wdGlvbnMuc2hpcHBpbmdfY291bnRyeV9zZWxlY3Rvcikuc2hvdygpO1xuICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmhpZGUoKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSk7XG4gICAgfSwgLy8gb3V0c2lkZVVuaXRlZFN0YXRlc1xuXG4gICAgc2hpcHBpbmdBZGRyZXNzOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB2YXIgc2hvd19zaGlwcGluZyA9IGZhbHNlO1xuICAgICAgaWYgKCQob3B0aW9ucy51c2VfZm9yX3NoaXBwaW5nX3NlbGVjdG9yKS5sZW5ndGggPiAwKSB7IC8vIHdlIGhhdmUgYSBzaGlwcGluZyBjaGVja2JveFxuICAgICAgICBzaG93X3NoaXBwaW5nID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmIChzaG93X3NoaXBwaW5nID09PSB0cnVlICkge1xuICAgICAgICAkKG9wdGlvbnMudXNlX2Zvcl9zaGlwcGluZ19zZWxlY3RvciwgZWxlbWVudCkucGFyZW50KCkuc2hvdygpO1xuICAgICAgICBpZiAoJChvcHRpb25zLnVzZV9mb3Jfc2hpcHBpbmdfc2VsZWN0b3IsIGVsZW1lbnQpLmlzKCc6Y2hlY2tlZCcpKSB7IC8vIHVzZSBzYW1lIGFzIGJpbGxpbmdcbiAgICAgICAgICAkKG9wdGlvbnMuc2hpcHBpbmdfc2VsZWN0b3IpLmhpZGUoKTtcbiAgICAgICAgfSBlbHNlIHsgLy8gc2VwYXJhdGUgc2hpcHBpbmcgYW5kIGJpbGxpbmdcbiAgICAgICAgICAkKG9wdGlvbnMuc2hpcHBpbmdfc2VsZWN0b3IpLnNob3coKTtcbiAgICAgICAgfVxuICAgICAgICAkKG9wdGlvbnMudXNlX2Zvcl9zaGlwcGluZ19zZWxlY3RvciwgZWxlbWVudCkuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHRoYXQuc2hpcHBpbmdBZGRyZXNzKGVsZW1lbnQsIG9wdGlvbnMpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIFxuICAgIH0sIC8vIHNoaXBwaW5nQWRkcmVzc1xuXG4gICAgYWxsb3dNaW5ucG9zdEFjY291bnQ6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHZhciBhY2NvdW50X2V4aXN0cyA9IGZhbHNlO1xuXG4gICAgICAvLyBzaG93IHBhc3N3b3JkIGFzIHRleHRcbiAgICAgIHRoYXQuc2hvd1Bhc3N3b3JkKCk7XG5cbiAgICAgIC8vIGNhbGN1bGF0ZSBwYXNzd29yZCBzdHJlbmd0aFxuICAgICAgdGhhdC5zaG93UGFzc3dvcmRTdHJlbmd0aCgpO1xuICAgICAgXG4gICAgICB0aGF0LnNwYW1FbWFpbCgkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpKTtcbiAgICAgICQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGF0LnNwYW1FbWFpbCgkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGF0LnRvZ2dsZUFjY291bnRGaWVsZHMoJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkpO1xuICAgICAgJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGF0LnRvZ2dsZUFjY291bnRGaWVsZHMoJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkpO1xuICAgICAgfSk7XG5cbiAgICAgIGZ1bmN0aW9uIGRvbmVUeXBpbmcgKCkge1xuICAgICAgICB2YXIgZW1haWwgPSAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpO1xuICAgICAgICBhY2NvdW50X2V4aXN0cyA9IHRoYXQuY2hlY2tNaW5ucG9zdEFjY291bnQoZWxlbWVudCwgb3B0aW9ucywgZW1haWwpO1xuICAgICAgfVxuXG4gICAgICAvL3NldHVwIGJlZm9yZSBmdW5jdGlvbnNcbiAgICAgIHZhciB0eXBpbmdUaW1lcjsgICAgICAgICAgICAgICAgLy90aW1lciBpZGVudGlmaWVyXG4gICAgICB2YXIgZG9uZVR5cGluZ0ludGVydmFsID0gNTAwMDsgIC8vdGltZSBpbiBtcywgNSBzZWNvbmQgZm9yIGV4YW1wbGVcblxuICAgICAgLy9vbiBrZXl1cCwgc3RhcnQgdGhlIGNvdW50ZG93blxuICAgICAgJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5rZXl1cChmdW5jdGlvbigpe1xuICAgICAgICBjbGVhclRpbWVvdXQodHlwaW5nVGltZXIpO1xuICAgICAgICBpZiAoJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwpIHtcbiAgICAgICAgICB0eXBpbmdUaW1lciA9IHNldFRpbWVvdXQoZG9uZVR5cGluZywgZG9uZVR5cGluZ0ludGVydmFsKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSwgLy8gYWxsb3dNaW5ucG9zdEFjY291bnRcblxuICAgIHNwYW1FbWFpbDogZnVuY3Rpb24oZW1haWxfZmllbGQpIHtcbiAgICAgIHZhciBzcGFtRXJyb3JDb250YWluZXIgPSBlbWFpbF9maWVsZC5wYXJlbnQoKTtcbiAgICAgIGlmICgkKCcuYS1zcGFtLWVtYWlsJywgc3BhbUVycm9yQ29udGFpbmVyKS5sZW5ndGggPT09IDAgKSB7XG4gICAgICAgIHNwYW1FcnJvckNvbnRhaW5lci5hcHBlbmQoJzxwIGNsYXNzPVwiYS1mb3JtLWNhcHRpb24gYS12YWxpZGF0aW9uLWVycm9yIGEtc3BhbS1lbWFpbFwiPlRoaXMgZW1haWwgYWRkcmVzcyBoYXMgYmVlbiBkZXRlY3RlZCBhcyBhIHNwYW1tZXIuPC9wPicpO1xuICAgICAgfVxuICAgICAgJCgnLmEtc3BhbS1lbWFpbCcsIHNwYW1FcnJvckNvbnRhaW5lcikuaGlkZSgpO1xuICAgICAgc3BhbUVycm9yQ29udGFpbmVyLnJlbW92ZUNsYXNzKCdpbnZhbGlkIGEtZXJyb3InKTtcbiAgICB9LCAvLyBzcGFtRW1haWxcblxuICAgIHRvZ2dsZUFjY291bnRGaWVsZHM6IGZ1bmN0aW9uKGNyZWF0ZV9hY2NvdW50X3NlbGVjdG9yKSB7XG4gICAgICBpZiAoY3JlYXRlX2FjY291bnRfc2VsZWN0b3IuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgY3JlYXRlX2FjY291bnRfc2VsZWN0b3IucGFyZW50KCkuYmVmb3JlKCc8cCBjbGFzcz1cImEtZm9ybS1jYXB0aW9uIGEtYWNjb3VudC1leGlzdHMgYS1hY2NvdW50LWV4aXN0cy1zdWNjZXNzXCI+VGhlcmUgaXMgYWxyZWFkeSBhIE1pbm5Qb3N0LmNvbSBhY2NvdW50IHdpdGggdGhpcyBlbWFpbCBhZGRyZXNzLjwvcD4nKTtcbiAgICAgICAgJCgnLmEtYWNjb3VudC1leGlzdHMnKS5oaWRlKCk7XG4gICAgICAgICQodGhpcy5vcHRpb25zLnBhc3N3b3JkX3NlbGVjdG9yLCB0aGlzLmVsZW1lbnQpLnNob3coKTtcbiAgICAgICAgdGhpcy5vcHRpb25zLmNyZWF0ZV9hY2NvdW50ID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQodGhpcy5vcHRpb25zLnBhc3N3b3JkX3NlbGVjdG9yLCB0aGlzLmVsZW1lbnQpLmhpZGUoKTtcbiAgICAgIH1cbiAgICB9LCAvLyB0b2dnbGVBY2NvdW50RmllbGRzXG5cbiAgICBzaG93UGFzc3dvcmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgLy8gQ2FjaGUgb3VyIGpxdWVyeSBlbGVtZW50c1xuICAgICAgdmFyICRzdWJtaXQgPSAkKCcuYnRuLXN1Ym1pdCcpO1xuICAgICAgdmFyICRjb250YWluZXIgPSAkKHRoaXMub3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgdGhpcy5lbGVtZW50KTtcbiAgICAgIHZhciAkZmllbGQgPSAkKCdpbnB1dFtuYW1lPVwicGFzc3dvcmRcIl0nLCAkY29udGFpbmVyKTtcbiAgICAgICQoJy5hLWFjY291bnQtZXhpc3RzJykuaGlkZSgpO1xuICAgICAgdmFyIHNob3dfcGFzcyA9ICc8ZGl2IGNsYXNzPVwiYS1mb3JtLXNob3ctcGFzc3dvcmQgYS1mb3JtLWNhcHRpb25cIj48bGFiZWw+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG5hbWU9XCJzaG93X3Bhc3N3b3JkXCIgaWQ9XCJzaG93LXBhc3N3b3JkLWNoZWNrYm94XCIgdmFsdWU9XCIxXCI+IFNob3cgcGFzc3dvcmQ8L2xhYmVsPjwvZGl2Pic7XG4gICAgICAvLyBJbmplY3QgdGhlIHRvZ2dsZSBidXR0b24gaW50byB0aGUgcGFnZVxuICAgICAgJGNvbnRhaW5lci5hcHBlbmQoIHNob3dfcGFzcyApO1xuICAgICAgLy8gQ2FjaGUgdGhlIHRvZ2dsZSBidXR0b25cbiAgICAgIHZhciAkdG9nZ2xlID0gJCgnI3Nob3ctcGFzc3dvcmQtY2hlY2tib3gnKTtcbiAgICAgIC8vIFRvZ2dsZSB0aGUgZmllbGQgdHlwZVxuICAgICAgJHRvZ2dsZS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIHZhciBjaGVja2JveCA9ICQodGhpcyk7XG4gICAgICAgIGlmIChjaGVja2JveC5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICAgICRmaWVsZC5hdHRyKCd0eXBlJywgJ3RleHQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkZmllbGQuYXR0cigndHlwZScsICdwYXNzd29yZCcpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIC8vIFNldCB0aGUgZm9ybSBmaWVsZCBiYWNrIHRvIGEgcmVndWxhciBwYXNzd29yZCBlbGVtZW50XG4gICAgICAkc3VibWl0Lm9uKCAnY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICRmaWVsZC5hdHRyKCd0eXBlJywgJ3Bhc3N3b3JkJyk7XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgc2hvd1Bhc3N3b3JkU3RyZW5ndGg6IGZ1bmN0aW9uKCkge1xuICAgICAgLy8gY2hlY2tQYXNzd29yZFN0cmVuZ3RoXG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICBpZiAoJCgnLmEtcGFzc3dvcmQtc3RyZW5ndGgnKS5sZW5ndGggPiAwICkge1xuICAgICAgICB2YXIgJGJlZm9yZSA9ICQoJy5hLWZvcm0tc2hvdy1wYXNzd29yZCcpO1xuICAgICAgICAkYmVmb3JlLmFmdGVyKCAkKCc8ZGl2IGNsYXNzPVwiYS1wYXNzd29yZC1zdHJlbmd0aFwiPjxtZXRlciBtYXg9XCI0XCIgaWQ9XCJwYXNzd29yZC1zdHJlbmd0aFwiPjxkaXY+PC9kaXY+PC9tZXRlcj48cCBjbGFzcz1cImEtZm9ybS1jYXB0aW9uXCIgaWQ9XCJwYXNzd29yZC1zdHJlbmd0aC10ZXh0XCI+PC9wPjwvZGl2PicpKTtcbiAgICAgICAgJCggJ2JvZHknICkub24oICdrZXl1cCcsICdpbnB1dFtuYW1lPXBhc3N3b3JkXScsXG4gICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGF0LmNoZWNrUGFzc3dvcmRTdHJlbmd0aChcbiAgICAgICAgICAgICAgJCgnaW5wdXRbbmFtZT1wYXNzd29yZF0nKSwgLy8gUGFzc3dvcmQgZmllbGRcbiAgICAgICAgICAgICAgJCgnI3Bhc3N3b3JkLXN0cmVuZ3RoJyksICAgICAgICAgICAvLyBTdHJlbmd0aCBtZXRlclxuICAgICAgICAgICAgICAkKCcjcGFzc3dvcmQtc3RyZW5ndGgtdGV4dCcpICAgICAgLy8gU3RyZW5ndGggdGV4dCBpbmRpY2F0b3JcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0sIC8vIHNob3dQYXNzd29yZFN0cmVuZ3RoXG5cbiAgICBjaGVja1Bhc3N3b3JkU3RyZW5ndGg6IGZ1bmN0aW9uKCAkcGFzc3dvcmQsICRzdHJlbmd0aE1ldGVyLCAkc3RyZW5ndGhUZXh0ICkge1xuICAgICAgdmFyIHBhc3N3b3JkID0gJHBhc3N3b3JkLnZhbCgpO1xuICAgICAgLy8gR2V0IHRoZSBwYXNzd29yZCBzdHJlbmd0aFxuICAgICAgdmFyIHJlc3VsdCA9IHp4Y3ZibihwYXNzd29yZCk7XG4gICAgICB2YXIgc3RyZW5ndGggPSByZXN1bHQuc2NvcmU7XG5cbiAgICAgICRzdHJlbmd0aFRleHQucmVtb3ZlQ2xhc3MoICdzaG9ydCBiYWQgZ29vZCBzdHJvbmcnICk7XG5cbiAgICAgIC8vIEFkZCB0aGUgc3RyZW5ndGggbWV0ZXIgcmVzdWx0c1xuICAgICAgc3dpdGNoICggc3RyZW5ndGggKSB7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAkc3RyZW5ndGhUZXh0LmFkZENsYXNzKCAnYmFkJyApLmh0bWwoICdTdHJlbmd0aDogPHN0cm9uZz5XZWFrPC9zdHJvbmc+JyApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgJHN0cmVuZ3RoVGV4dC5hZGRDbGFzcyggJ2dvb2QnICkuaHRtbCggJ1N0cmVuZ3RoOiA8c3Ryb25nPk1lZGl1bTwvc3Ryb25nPicgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICRzdHJlbmd0aFRleHQuYWRkQ2xhc3MoICdzdHJvbmcnICkuaHRtbCggJ1N0cmVuZ3RoOiA8c3Ryb25nPlN0cm9uZzwvc3Ryb25nPicgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICRzdHJlbmd0aFRleHQuYWRkQ2xhc3MoICdzaG9ydCcgKS5odG1sKCAnU3RyZW5ndGg6IDxzdHJvbmc+VmVyeSB3ZWFrPC9zdHJvbmc+JyApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICRzdHJlbmd0aFRleHQuYWRkQ2xhc3MoICdzaG9ydCcgKS5odG1sKCAnU3RyZW5ndGg6IDxzdHJvbmc+VmVyeSB3ZWFrPC9zdHJvbmc+JyApO1xuICAgICAgfVxuICAgICAgJHN0cmVuZ3RoTWV0ZXIudmFsKHN0cmVuZ3RoKTtcbiAgICAgIHJldHVybiBzdHJlbmd0aDtcbiAgICB9LCAvLyBjaGVja1Bhc3N3b3JkU3RyZW5ndGhcblxuICAgIGNoZWNrTWlubnBvc3RBY2NvdW50OiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zLCBlbWFpbCkge1xuICAgICAgdmFyIHVzZXIgPSB7XG4gICAgICAgIGVtYWlsOiBlbWFpbFxuICAgICAgfTtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICQuYWpheCh7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIHVybDogb3B0aW9ucy5taW5ucG9zdF9yb290ICsgJy93cC1qc29uL3VzZXItYWNjb3VudC1tYW5hZ2VtZW50L3YxL2NoZWNrLWFjY291bnQnLFxuICAgICAgICBkYXRhOiB1c2VyXG4gICAgICB9KS5kb25lKGZ1bmN0aW9uKCByZXN1bHQgKSB7XG4gICAgICAgIGlmIChyZXN1bHQuc3RhdHVzID09PSAnc3VjY2VzcycgJiYgcmVzdWx0LnJlYXNvbiA9PT0gJ3VzZXIgZXhpc3RzJykgeyAvLyB1c2VyIGV4aXN0c1xuICAgICAgICAgIGlmICgkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KS5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICAgICAgJChvcHRpb25zLnBhc3N3b3JkX3NlbGVjdG9yLCBlbGVtZW50KS5oaWRlKCk7XG4gICAgICAgICAgICAkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKS5oaWRlKCk7XG4gICAgICAgICAgICAkKCcuYS1hY2NvdW50LWV4aXN0cycsIGVsZW1lbnQpLnNob3coKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCQob3B0aW9ucy5jcmVhdGVfbXBfc2VsZWN0b3IsIGVsZW1lbnQpLmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgICAgICAgICQob3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgZWxlbWVudCkuaGlkZSgpO1xuICAgICAgICAgICAgICAkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKS5oaWRlKCk7XG4gICAgICAgICAgICAgICQoJy5hLWFjY291bnQtZXhpc3RzJywgZWxlbWVudCkuc2hvdygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKCByZXN1bHQuc3RhdHVzID09PSAnc3BhbScgKSB7XG4gICAgICAgICAgJCh0aGF0Lm9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IpLmFkZENsYXNzKCdpbnZhbGlkIGEtZXJyb3InKTtcbiAgICAgICAgICAkKCAnLmEtc3BhbS1lbWFpbCcpLnNob3coKTtcbiAgICAgICAgfSBlbHNlIHsgLy8gdXNlciBkb2VzIG5vdCBleGlzdCBvciBhamF4IGNhbGwgZmFpbGVkXG4gICAgICAgICAgaWYgKCQob3B0aW9ucy5jcmVhdGVfbXBfc2VsZWN0b3IsIGVsZW1lbnQpLmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgICAgICAkKG9wdGlvbnMucGFzc3dvcmRfc2VsZWN0b3IsIGVsZW1lbnQpLnNob3coKTtcbiAgICAgICAgICAgIG9wdGlvbnMuY3JlYXRlX2FjY291bnQgPSB0cnVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKG9wdGlvbnMucGFzc3dvcmRfc2VsZWN0b3IsIGVsZW1lbnQpLmhpZGUoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgJCgnLmEtYWNjb3VudC1leGlzdHMnLCBlbGVtZW50KS5oaWRlKCk7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LCAvLyBjaGVja01pbm5wb3N0QWNjb3VudFxuXG4gICAgcGF5bWVudFJlcXVlc3RCdXR0b246IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHZhciB0b3RhbF9hbW91bnQgPSB0aGF0LmdldFRvdGFsQW1vdW50KCk7XG4gICAgICB0aGF0LnBheW1lbnRSZXF1ZXN0ID0gdGhhdC5zdHJpcGUucGF5bWVudFJlcXVlc3Qoe1xuICAgICAgICBjb3VudHJ5OiAnVVMnLFxuICAgICAgICBjdXJyZW5jeTogJ3VzZCcsXG4gICAgICAgIHRvdGFsOiB7XG4gICAgICAgICAgbGFiZWw6ICdNaW5uUG9zdCcsXG4gICAgICAgICAgYW1vdW50OiB0b3RhbF9hbW91bnQgKiAxMDAsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICAgIHRoYXQucHJCdXR0b24gPSB0aGF0LmVsZW1lbnRzLmNyZWF0ZSgncGF5bWVudFJlcXVlc3RCdXR0b24nLCB7XG4gICAgICAgIHBheW1lbnRSZXF1ZXN0OiB0aGF0LnBheW1lbnRSZXF1ZXN0LFxuICAgICAgICBzdHlsZToge1xuICAgICAgICAgIHBheW1lbnRSZXF1ZXN0QnV0dG9uOiB7XG4gICAgICAgICAgICB0eXBlOiAnZG9uYXRlJyxcbiAgICAgICAgICAgIC8vIE9uZSBvZiAnZGVmYXVsdCcsICdib29rJywgJ2J1eScsIG9yICdkb25hdGUnXG4gICAgICAgICAgICAvLyBEZWZhdWx0cyB0byAnZGVmYXVsdCdcbiAgICAgIFxuICAgICAgICAgICAgdGhlbWU6ICdkYXJrJyxcbiAgICAgICAgICAgIC8vIE9uZSBvZiAnZGFyaycsICdsaWdodCcsIG9yICdsaWdodC1vdXRsaW5lJ1xuICAgICAgICAgICAgLy8gRGVmYXVsdHMgdG8gJ2RhcmsnXG4gICAgICBcbiAgICAgICAgICAgIGhlaWdodDogJzQ4cHgnXG4gICAgICAgICAgICAvLyBEZWZhdWx0cyB0byAnNDBweCcuIFRoZSB3aWR0aCBpcyBhbHdheXMgJzEwMCUnLlxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICAgIFxuICAgICAgLy8gQ2hlY2sgdGhlIGF2YWlsYWJpbGl0eSBvZiB0aGUgUGF5bWVudCBSZXF1ZXN0IEFQSSBmaXJzdC5cbiAgICAgIHRoYXQucGF5bWVudFJlcXVlc3QuY2FuTWFrZVBheW1lbnQoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgJCgnLm0tcGF5LXdpdGhvdXQtcGF5bWVudC1yZXF1ZXN0JykuaGlkZSgpO1xuICAgICAgICAgIHRoYXQucHJCdXR0b24ubW91bnQoJyNwYXltZW50LXJlcXVlc3QtYnV0dG9uJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJCgnLm8tcGF5LXdpdGgtcGF5bWVudC1yZXF1ZXN0JykuaGlkZSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgJCgnLmRlY2xpbmUtYXBwbGUtcGF5IGEnKS5jbGljayhmdW5jdGlvbihldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAkKHRoaXMpLmhpZGUoKTtcbiAgICAgICAgJCgnLm0tcGF5LXdpdGhvdXQtcGF5bWVudC1yZXF1ZXN0Jykuc2hvdygpO1xuICAgICAgICAkKCcuby1wYXktd2l0aC1wYXltZW50LXJlcXVlc3QgLm0tZm9ybS1hY3Rpb25zLXBheS1mZWVzJykuaGlkZSgpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoYXQucHJCdXR0b24ub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcblxuICAgICAgICAvLyBTZW5kIHBheW1lbnRNZXRob2QuaWQgdG8gc2VydmVyXG4gICAgICAgIHZhciBzdXBwb3J0Zm9ybSA9ICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKTtcblxuICAgICAgICAvLyBjaGVjayB2YWxpZGF0aW9uIG9mIGZvcm1cbiAgICAgICAgaWYgKCFzdXBwb3J0Zm9ybS5nZXQoMCkucmVwb3J0VmFsaWRpdHkoKSkge1xuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgdGhhdC5wYXltZW50UmVxdWVzdC5vbigncGF5bWVudG1ldGhvZCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cbiAgICAgICAgLy8gU2VuZCBwYXltZW50TWV0aG9kLmlkIHRvIHNlcnZlclxuICAgICAgICB2YXIgc3VwcG9ydGZvcm0gPSAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3Rvcik7XG4gICAgICAgIHZhciB0b2tlbkZpZWxkTmFtZSA9ICdwYXltZW50X21ldGhvZF9pZCc7XG4gICAgICAgIHZhciB0b2tlbkZpZWxkID0gJ2lucHV0W25hbWU9XCInICsgdG9rZW5GaWVsZE5hbWUgKyAnXCJdJztcblxuICAgICAgICAvLyBJbnNlcnQgdGhlIHBheW1lbnQgbWV0aG9kIElEIGludG8gdGhlIGZvcm0gc28gaXQgZ2V0cyBzdWJtaXR0ZWQgdG8gdGhlIHNlcnZlclxuICAgICAgICBpZiAoJCh0b2tlbkZpZWxkKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgJCh0b2tlbkZpZWxkKS52YWwoZXZlbnQucGF5bWVudE1ldGhvZC5pZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3VwcG9ydGZvcm0uYXBwZW5kKCQoJzxpbnB1dCB0eXBlPVxcXCJoaWRkZW5cXFwiIG5hbWU9XCInICsgdG9rZW5GaWVsZE5hbWUgKyAnXCI+JykudmFsKGV2ZW50LnBheW1lbnRNZXRob2QuaWQpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoYXQuZm9ybVByb2Nlc3Nvcih0aGF0LCAncGF5bWVudFJlcXVlc3QnKTtcblxuICAgICAgfSk7XG5cbiAgICB9LCAvLyBwYXltZW50UmVxdWVzdEJ1dHRvblxuXG4gICAgY2hvb3NlUGF5bWVudE1ldGhvZDogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuXG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG5cbiAgICAgIGlmICgkKG9wdGlvbnMuY2hvb3NlX3BheW1lbnQpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgaWYgKCQob3B0aW9ucy5jaG9vc2VfcGF5bWVudCArICcgaW5wdXQnKS5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICAgIHZhciBjaGVja2VkX2lkID0gJChvcHRpb25zLmNob29zZV9wYXltZW50ICsgJyBpbnB1dDpjaGVja2VkJykuYXR0cignaWQnKTtcbiAgICAgICAgICB2YXIgY2hlY2tlZF92YWx1ZSA9ICQob3B0aW9ucy5jaG9vc2VfcGF5bWVudCArICcgaW5wdXQ6Y2hlY2tlZCcpLnZhbCgpO1xuICAgICAgICAgIHRoYXQuc2V0dXBQYXltZW50TWV0aG9kKGNoZWNrZWRfaWQsIGNoZWNrZWRfdmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgJChvcHRpb25zLmNob29zZV9wYXltZW50ICsgJyBpbnB1dCcpLmNoYW5nZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyIGNoZWNrZWRfaWQgPSB0aGlzLmlkO1xuICAgICAgICAgIHZhciBjaGVja2VkX3ZhbHVlID0gdGhpcy52YWx1ZTtcbiAgICAgICAgICB0aGF0LnNldHVwUGF5bWVudE1ldGhvZChjaGVja2VkX2lkLCBjaGVja2VkX3ZhbHVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgIH1cbiAgICB9LCAvLyBjaG9vc2VQYXltZW50TWV0aG9kXG5cbiAgICBzZXR1cFBheW1lbnRNZXRob2Q6IGZ1bmN0aW9uKGVsZW1lbnRfaWQsIGVsZW1lbnRfdmFsdWUpIHtcbiAgICAgIHZhciBzdHJpcGVfcGF5bWVudF90eXBlID0gdGhpcy5zZXRTdHJpcGVQYXltZW50VHlwZShlbGVtZW50X3ZhbHVlKTtcbiAgICAgIGlmICggZWxlbWVudF92YWx1ZSA9PT0gJ2JhbmtfYWNjb3VudCcgKSB7XG4gICAgICAgICQoJ2lucHV0W25hbWU9XCJwYXltZW50X21ldGhvZF9pZFwiXScsICQodGhpcy5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKSkucmVtb3ZlKCk7XG4gICAgICAgIHRoaXMuYWNoRmllbGRzKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucmVtb3ZlQWNoRmllbGRzKHRoaXMub3B0aW9ucyk7XG4gICAgICB9XG4gICAgICAkKHRoaXMub3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvcikucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgJCh0aGlzLm9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IgKyAnLicgKyBlbGVtZW50X2lkKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAkKHRoaXMub3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvciArICc6bm90KC5hY3RpdmUpIGlucHV0JykudmFsKCcnKTtcbiAgICAgIHRoaXMuY2FsY3VsYXRlRmVlcyh0aGlzLm9wdGlvbnMub3JpZ2luYWxfYW1vdW50LCBzdHJpcGVfcGF5bWVudF90eXBlKTtcbiAgICB9LCAvLyBzZXR1cFBheW1lbnRNZXRob2RcblxuICAgIHJlbW92ZUFjaEZpZWxkczogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgJCgnaW5wdXRbbmFtZT1cInB1YmxpY190b2tlblwiXScsICQob3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikpLnJlbW92ZSgpO1xuICAgICAgJCgnaW5wdXRbbmFtZT1cImFjY291bnRfaWRcIl0nLCAkKG9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpKS5yZW1vdmUoKTtcbiAgICAgICQoJ2lucHV0W25hbWU9XCJiYW5rVG9rZW5cIl0nLCAkKG9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpKS5yZW1vdmUoKTtcbiAgICAgICQob3B0aW9ucy5wbGFpZF9saW5rKS5odG1sKCc8YSBocmVmPVwiI1wiPlNpZ24gaW4gdG8geW91ciBiYW5rIGFjY291bnQ8L2E+Jyk7XG4gICAgICB0aGlzLmJ1dHRvbkRpc2FibGVkKG9wdGlvbnMsIGZhbHNlLCAnJywgJycsIHRydWUpOyAvLyBpZiB0aGUgYnV0dG9uIHdhcyBkaXNhYmxlZCwgcmUtZW5hYmxlIGl0XG4gICAgICBpZiAodHlwZW9mIHRoaXMubGlua0hhbmRsZXIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRoaXMubGlua0hhbmRsZXIuZGVzdHJveSgpO1xuICAgICAgfVxuICAgIH0sIC8vIHJlbW92ZUFjaEZpZWxkc1xuXG4gICAgY3JlZGl0Q2FyZEZpZWxkczogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuXG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG5cbiAgICAgIHZhciBzdHlsZSA9IHtcbiAgICAgICAgYmFzZToge1xuICAgICAgICAgIGljb25Db2xvcjogJyM2NjZFRTgnLFxuICAgICAgICAgIGxpbmVIZWlnaHQ6ICc0M3B4JyxcbiAgICAgICAgICBmb250V2VpZ2h0OiA0MDAsXG4gICAgICAgICAgZm9udEZhbWlseTogJ2ZmLW1ldGEtd2ViLXBybycsXG4gICAgICAgICAgZm9udFNpemU6ICcyNHB4JyxcbiAgICAgICAgICAvL2xpbmVIZWlnaHQ6ICczN3B4JyxcbiAgICAgICAgICAvL2ZvbnRTaXplOiAnMTZweCcsXG4gICAgICAgIH0sXG4gICAgICAgIGludmFsaWQ6IHtcbiAgICAgICAgICBjb2xvcjogJyMxYTE4MTgnLFxuICAgICAgICB9LFxuICAgICAgfTtcblxuICAgICAgLy8gQWRkIGFuIGluc3RhbmNlIG9mIHRoZSBjYXJkIFVJIGNvbXBvbmVudCBpbnRvIHRoZSBgY2FyZC1lbGVtZW50YCA8ZGl2PlxuICAgICAgLy9jYXJkLm1vdW50KCcjY2FyZC1lbGVtZW50Jyk7XG4gICAgICBpZiAoICQoJy5jcmVkaXQtY2FyZC1ncm91cCcpLmxlbmd0aCA9PT0gMCAmJiAkKCcucGF5bWVudC1tZXRob2QuY2hvb3NlLWNhcmQnKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhhdC5jYXJkTnVtYmVyRWxlbWVudCA9IHRoYXQuZWxlbWVudHMuY3JlYXRlKCdjYXJkTnVtYmVyJywge1xuICAgICAgICBzaG93SWNvbjogdHJ1ZSxcbiAgICAgICAgc3R5bGU6IHN0eWxlXG4gICAgICB9KTtcbiAgICAgIHRoYXQuY2FyZE51bWJlckVsZW1lbnQubW91bnQob3B0aW9ucy5jY19udW1fc2VsZWN0b3IpO1xuXG4gICAgICB0aGF0LmNhcmRFeHBpcnlFbGVtZW50ID0gdGhhdC5lbGVtZW50cy5jcmVhdGUoJ2NhcmRFeHBpcnknLCB7XG4gICAgICAgIHN0eWxlOiBzdHlsZVxuICAgICAgfSk7XG4gICAgICB0aGF0LmNhcmRFeHBpcnlFbGVtZW50Lm1vdW50KG9wdGlvbnMuY2NfZXhwX3NlbGVjdG9yKTtcblxuICAgICAgdGhhdC5jYXJkQ3ZjRWxlbWVudCA9IHRoYXQuZWxlbWVudHMuY3JlYXRlKCdjYXJkQ3ZjJywge1xuICAgICAgICBzdHlsZTogc3R5bGVcbiAgICAgIH0pO1xuICAgICAgdGhhdC5jYXJkQ3ZjRWxlbWVudC5tb3VudChvcHRpb25zLmNjX2N2Y19zZWxlY3Rvcik7XG5cbiAgICAgIC8vIHZhbGlkYXRlL2Vycm9yIGhhbmRsZSB0aGUgY2FyZCBmaWVsZHNcbiAgICAgIHRoYXQuY2FyZE51bWJlckVsZW1lbnQub24oJ2NoYW5nZScsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIHZhciBzdHJpcGVfcGF5bWVudF90eXBlID0gJ2NhcmQnO1xuICAgICAgICAvLyBTd2l0Y2ggcGF5bWVudCB0eXBlIGlmIGl0J3Mgb25lIHRoYXQgd2UgcmVjb2duaXplIGFzIGRpc3RpbmN0XG4gICAgICAgIGlmIChldmVudC5icmFuZCkge1xuICAgICAgICAgIGlmICggZXZlbnQuYnJhbmQgPT09ICdhbWV4JyApIHtcbiAgICAgICAgICAgIHN0cmlwZV9wYXltZW50X3R5cGUgPSAnYW1leCc7XG4gICAgICAgICAgfSAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICAvLyBlcnJvciBoYW5kbGluZ1xuICAgICAgICB0aGF0LnN0cmlwZUVycm9yRGlzcGxheShldmVudC5lcnJvciwgJChvcHRpb25zLmNjX251bV9zZWxlY3RvciwgZWxlbWVudCksIGVsZW1lbnQsIG9wdGlvbnMgKTtcbiAgICAgICAgLy8gaWYgaXQgY2hhbmdlZCwgcmVzZXQgdGhlIGJ1dHRvblxuICAgICAgICB0aGF0LmJ1dHRvblN0YXR1cyhvcHRpb25zLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIGZhbHNlKTtcbiAgICAgICAgdGhhdC5jYWxjdWxhdGVGZWVzKHRoYXQub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQsIHN0cmlwZV9wYXltZW50X3R5cGUpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoYXQuY2FyZEV4cGlyeUVsZW1lbnQub24oJ2NoYW5nZScsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIC8vIGVycm9yIGhhbmRsaW5nXG4gICAgICAgIHRoYXQuc3RyaXBlRXJyb3JEaXNwbGF5KGV2ZW50LmVycm9yLCAkKG9wdGlvbnMuY2NfZXhwX3NlbGVjdG9yLCBlbGVtZW50KSwgZWxlbWVudCwgb3B0aW9ucyApO1xuICAgICAgICAvLyBpZiBpdCBjaGFuZ2VkLCByZXNldCB0aGUgYnV0dG9uXG4gICAgICAgIHRoYXQuYnV0dG9uU3RhdHVzKG9wdGlvbnMsICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKSwgZmFsc2UpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoYXQuY2FyZEN2Y0VsZW1lbnQub24oJ2NoYW5nZScsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIC8vIGVycm9yIGhhbmRsaW5nXG4gICAgICAgIHRoYXQuc3RyaXBlRXJyb3JEaXNwbGF5KGV2ZW50LmVycm9yLCAkKG9wdGlvbnMuY2NfY3ZjX3NlbGVjdG9yLCBlbGVtZW50KSwgZWxlbWVudCwgb3B0aW9ucyApO1xuICAgICAgICAvLyBpZiBpdCBjaGFuZ2VkLCByZXNldCB0aGUgYnV0dG9uXG4gICAgICAgIHRoYXQuYnV0dG9uU3RhdHVzKG9wdGlvbnMsICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKSwgZmFsc2UpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIHRoaXMgaXMgdGhlIG1ldGhvZCB0byBjcmVhdGUgYSBzaW5nbGUgY2FyZCBmaWVsZCBhbmQgbW91bnQgaXRcbiAgICAgIC8qdmFyIGNhcmQgPSB0aGF0LmVsZW1lbnRzLmNyZWF0ZShcbiAgICAgICAgJ2NhcmQnLFxuICAgICAgICB7XG4gICAgICAgICAgaGlkZVBvc3RhbENvZGU6IHRydWVcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICAgIC8vIEFkZCBhbiBpbnN0YW5jZSBvZiB0aGUgY2FyZCBVSSBjb21wb25lbnQgaW50byB0aGUgYGNhcmQtZWxlbWVudGAgPGRpdj5cbiAgICAgIGNhcmQubW91bnQoJyNjYXJkLWVsZW1lbnQnKTsqL1xuXG4gICAgfSwgLy8gY3JlZGl0Q2FyZEZpZWxkc1xuXG4gICAgc2hvd1NwaW5uZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgJCh0aGlzLm9wdGlvbnMucGxhaWRfbGluaykuaGlkZSgpO1xuICAgICAgJCh0aGlzLm9wdGlvbnMucGxhaWRfbGluaykuYWZ0ZXIoJzxkaXYgY2xhc3M9XCJhLXNwaW5uZXJcIj48aW1nIHNyYz1cImh0dHBzOi8vd3d3Lm1pbm5wb3N0LmNvbS93cC1hZG1pbi9pbWFnZXMvc3Bpbm5lci5naWZcIiBzcmNzZXQ9XCJodHRwczovL3d3dy5taW5ucG9zdC5jb20vd3AtYWRtaW4vaW1hZ2VzL3NwaW5uZXIuZ2lmIDF4LCBodHRwczovL3d3dy5taW5ucG9zdC5jb20vd3AtYWRtaW4vaW1hZ2VzL3NwaW5uZXItMnguZ2lmIDJ4LFwiPjwvZGl2PicpO1xuICAgIH0sXG5cbiAgICBoaWRlU3Bpbm5lcjogZnVuY3Rpb24oKSB7XG4gICAgICAkKHRoaXMub3B0aW9ucy5wbGFpZF9saW5rKS5zaG93KCk7XG4gICAgICAkKCcuYS1zcGlubmVyJykuaGlkZSgpO1xuICAgIH0sXG5cbiAgICBhY2hGaWVsZHM6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciBiYW5rVG9rZW5GaWVsZE5hbWUgPSAnYmFua1Rva2VuJztcbiAgICAgIHZhciBiYW5rVG9rZW5GaWVsZCA9ICdpbnB1dFtuYW1lPVwiJyArIGJhbmtUb2tlbkZpZWxkTmFtZSArICdcIl0nO1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgLy8gdGhlIGJ1dHRvbiBzaG91bGQgbm90IGJlIGNsaWNrYWJsZSB1bnRpbCB0aGUgdXNlciBoYXMgc2lnbmVkIGluXG4gICAgICB0aGF0LmJ1dHRvbkRpc2FibGVkKG9wdGlvbnMsIHRydWUsICcnLCAnU2lnbiBpbiB0byB5b3VyIGJhbmsgYWNjb3VudCAoYWJvdmUpIGZpcnN0Jyk7XG5cbiAgICAgIGlmICh0eXBlb2YgUGxhaWQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRoYXQubGlua0hhbmRsZXIgPSBQbGFpZC5jcmVhdGUoe1xuICAgICAgICAgIGNsaWVudE5hbWU6ICdNaW5uUG9zdCcsXG4gICAgICAgICAgZW52OiBvcHRpb25zLnBsYWlkX2VudixcbiAgICAgICAgICBwcm9kdWN0OiBbJ2F1dGgnXSxcbiAgICAgICAgICAvLyAxLiBQYXNzIHRoZSB0b2tlbiBnZW5lcmF0ZWQgaW4gc3RlcCAyLlxuICAgICAgICAgIHRva2VuOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxhaWRfbGlua190b2tlbicpLnZhbHVlLFxuICAgICAgICAgIG9uU3VjY2VzczogZnVuY3Rpb24ocHVibGljX3Rva2VuLCBtZXRhZGF0YSkge1xuICAgICAgICAgICAgdGhhdC5zaG93U3Bpbm5lcigpO1xuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgdXJsOicvZ2V0X3BsYWlkX2FjY2Vzc190b2tlbi8nLFxuICAgICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7IHB1YmxpY190b2tlbjogcHVibGljX3Rva2VuLCBhY2NvdW50X2lkOiBtZXRhZGF0YS5hY2NvdW50X2lkIH0pLFxuICAgICAgICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZG9uZShmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICBpZiAodHlwZW9mIHJlc3BvbnNlLmVycm9yICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIC8vIHRoZXJlIGlzIGFuIGVycm9yLlxuICAgICAgICAgICAgICAgIHRoYXQuaGlkZVNwaW5uZXIoKTtcbiAgICAgICAgICAgICAgICAkKG9wdGlvbnMucGxhaWRfbGluaykuYmVmb3JlKCc8cCBjbGFzcz1cImEtZXJyb3IgYS12YWxpZGF0aW9uLWVycm9yXCI+JyArIHJlc3BvbnNlLmVycm9yICsgJzwvcD4nKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL3RoaXMuZGVidWcoJ3ByaW50IHJlc3BvbnNlIGhlcmUnKTtcbiAgICAgICAgICAgICAgICAvL3RoaXMuZGVidWcocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIC8vIGFkZCB0aGUgZmllbGQocykgd2UgbmVlZCB0byB0aGUgZm9ybSBmb3Igc3VibWl0dGluZ1xuICAgICAgICAgICAgICAgIGlmICgkKGJhbmtUb2tlbkZpZWxkKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAkKGJhbmtUb2tlbkZpZWxkKS52YWwocmVzcG9uc2Uuc3RyaXBlX2JhbmtfYWNjb3VudF90b2tlbik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICQob3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikucHJlcGVuZCgkKCc8aW5wdXQgdHlwZT1cXFwiaGlkZGVuXFxcIiBuYW1lPVwiJyArIGJhbmtUb2tlbkZpZWxkTmFtZSArICdcIj4nKS52YWwocmVzcG9uc2Uuc3RyaXBlX2JhbmtfYWNjb3VudF90b2tlbikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkKG9wdGlvbnMucGxhaWRfbGluaywgZWxlbWVudCkuaHRtbCgnPHN0cm9uZz5Zb3VyIGFjY291bnQgd2FzIHN1Y2Nlc3NmdWxseSBhdXRob3JpemVkPC9zdHJvbmc+Jyk7XG4gICAgICAgICAgICAgICAgdGhhdC5oaWRlU3Bpbm5lcigpO1xuICAgICAgICAgICAgICAgIHRoYXQuYnV0dG9uRGlzYWJsZWQob3B0aW9ucywgZmFsc2UpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmVycm9yKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgIHRoYXQuZGVidWcocmVzcG9uc2UpO1xuICAgICAgICAgICAgICB0aGF0LmhpZGVTcGlubmVyKCk7XG4gICAgICAgICAgICAgICQob3B0aW9ucy5wbGFpZF9saW5rKS5iZWZvcmUoJzxwIGNsYXNzPVwiYS1lcnJvciBhLXZhbGlkYXRpb24tZXJyb3JcIj4nICsgcmVzcG9uc2UuZXJyb3IgKyAnPC9wPicpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICAgICQob3B0aW9ucy5wbGFpZF9saW5rICsgJyBhJykuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHRoYXQucmVzZXRGb3JtRXJyb3JzKHRoYXQub3B0aW9ucywgdGhhdC5lbGVtZW50KTtcbiAgICAgICAgICAvLyQob3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvciArICcgLmEtZXJyb3InKS5yZW1vdmUoKTsgLy8gcmVtb3ZlIG1ldGhvZCBlcnJvciBtZXNzYWdlIGlmIGl0IGlzIHRoZXJlXG4gICAgICAgICAgdGhhdC5saW5rSGFuZGxlci5vcGVuKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sIC8vIGFjaEZpZWxkc1xuXG4gICAgYnV0dG9uU3RhdHVzOiBmdW5jdGlvbihvcHRpb25zLCBidXR0b24sIGRpc2FibGVkKSB7XG4gICAgICAvLyBtYWtlIHRoZSBidXR0b24gY2xpY2thYmxlIG9yIG5vdFxuICAgICAgdGhpcy5idXR0b25EaXNhYmxlZChvcHRpb25zLCBkaXNhYmxlZCwgYnV0dG9uKTtcbiAgICAgIGlmIChkaXNhYmxlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgYnV0dG9uLnRleHQob3B0aW9ucy5idXR0b25fdGV4dCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBidXR0b24udGV4dCgnUHJvY2Vzc2luZycpO1xuICAgICAgfVxuICAgIH0sIC8vIGJ1dHRvblN0YXR1c1xuXG4gICAgYnV0dG9uRGlzYWJsZWQ6IGZ1bmN0aW9uKG9wdGlvbnMsIGRpc2FibGVkLCBidXR0b24gPSAnJywgbWVzc2FnZSA9ICcnLCBhY2hfd2FzX2luaXRpYWxpemVkID0gZmFsc2UpIHtcbiAgICAgIGlmIChidXR0b24gPT09ICcnKSB7XG4gICAgICAgIGJ1dHRvbiA9ICQob3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyk7XG4gICAgICB9XG4gICAgICBidXR0b24ucHJvcCgnZGlzYWJsZWQnLCBkaXNhYmxlZCk7XG4gICAgICBpZiAobWVzc2FnZSAhPT0gJycpIHtcbiAgICAgICAgaWYgKGRpc2FibGVkID09PSB0cnVlKSB7XG4gICAgICAgICAgYnV0dG9uLmF0dHIoJ2RhdGEtdGxpdGUnLCBtZXNzYWdlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBidXR0b24ucmVtb3ZlQXR0ciggJ2RhdGEtdGxpdGUnICk7IC8vIHRoZXJlIHNob3VsZCBiZSBubyB0bGl0ZSB2YWx1ZSBpZiB0aGUgYnV0dG9uIGlzIGVuYWJsZWRcbiAgICAgICAgfVxuICAgICAgICBidXR0b24ub24oJ21vdXNlZW50ZXIgZm9jdXMnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIHRsaXRlLnNob3coICggdGhpcyApLCB7IGdyYXY6ICdudycgfSApO1xuICAgICAgICB9KTtcbiAgICAgICAgYnV0dG9uLm9uKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICB0bGl0ZS5oaWRlKCAoIHRoaXMgKSApO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJ1dHRvbi5yZW1vdmVBdHRyKCAnZGF0YS10bGl0ZScgKTtcbiAgICAgICAgaWYgKGFjaF93YXNfaW5pdGlhbGl6ZWQgPT09IHRydWUgKSB7XG4gICAgICAgICAgYnV0dG9uLm9uKCdtb3VzZWVudGVyIGZvY3VzJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIHRsaXRlLmhpZGUoICggdGhpcyApICk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYnV0dG9uLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIC8vIGJ1dHRvbkRpc2FibGVkXG5cbiAgICB2YWxpZGF0ZVNldHVwOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICB2YXIgZm9ybXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKG9wdGlvbnMuZm9ybV9zZWxlY3Rvcik7XG4gICAgICBmb3Jtcy5mb3JFYWNoKCBmdW5jdGlvbiAoIGZvcm0gKSB7XG4gICAgICAgIFZhbGlkRm9ybSggZm9ybSwge1xuICAgICAgICAgIHZhbGlkYXRpb25FcnJvclBhcmVudENsYXNzOiAnbS1oYXMtdmFsaWRhdGlvbi1lcnJvcicsXG4gICAgICAgICAgdmFsaWRhdGlvbkVycm9yQ2xhc3M6ICdhLXZhbGlkYXRpb24tZXJyb3InLFxuICAgICAgICAgIGludmFsaWRDbGFzczogJ2EtZXJyb3InLFxuICAgICAgICAgIGVycm9yUGxhY2VtZW50OiAnYWZ0ZXInXG4gICAgICAgIH0gKVxuICAgICAgfSApO1xuICAgICAgdGhpcy5zY3JvbGxUb0Zvcm1FcnJvcihvcHRpb25zKTtcbiAgICB9LCAvLyB2YWxpZGF0ZVNldHVwXG5cbiAgICBzY3JvbGxUb0Zvcm1FcnJvcjogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgdmFyIGZvcm0gPSAkKCBvcHRpb25zLmZvcm1fc2VsZWN0b3IgKTtcbiAgICAgIC8vIGxpc3RlbiBmb3IgYGludmFsaWRgIGV2ZW50cyBvbiBhbGwgZm9ybSBpbnB1dHNcbiAgICAgIGZvcm0uZmluZCggJzppbnB1dCcgKS5vbiggJ2ludmFsaWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyIGlucHV0ID0gJCggdGhpcyApO1xuICAgICAgICAgIC8vIHRoZSBmaXJzdCBpbnZhbGlkIGVsZW1lbnQgaW4gdGhlIGZvcm1cbiAgICAgICAgdmFyIGZpcnN0ID0gZm9ybS5maW5kKCAnLmEtZXJyb3InICkuZmlyc3QoKTtcbiAgICAgICAgLy8gdGhlIGZvcm0gaXRlbSB0aGF0IGNvbnRhaW5zIGl0XG4gICAgICAgIHZhciBmaXJzdF9ob2xkZXIgPSBmaXJzdC5wYXJlbnQoKTtcbiAgICAgICAgICAvLyBvbmx5IGhhbmRsZSBpZiB0aGlzIGlzIHRoZSBmaXJzdCBpbnZhbGlkIGlucHV0XG4gICAgICAgICAgaWYgKGlucHV0WzBdID09PSBmaXJzdFswXSkge1xuICAgICAgICAgICAgICAvLyBoZWlnaHQgb2YgdGhlIG5hdiBiYXIgcGx1cyBzb21lIHBhZGRpbmcgaWYgdGhlcmUncyBhIGZpeGVkIG5hdlxuICAgICAgICAgICAgICAvL3ZhciBuYXZiYXJIZWlnaHQgPSBuYXZiYXIuaGVpZ2h0KCkgKyA1MFxuXG4gICAgICAgICAgICAgIC8vIHRoZSBwb3NpdGlvbiB0byBzY3JvbGwgdG8gKGFjY291bnRpbmcgZm9yIHRoZSBuYXZiYXIgaWYgaXQgZXhpc3RzKVxuICAgICAgICAgICAgICB2YXIgZWxlbWVudE9mZnNldCA9IGZpcnN0X2hvbGRlci5vZmZzZXQoKS50b3A7XG5cbiAgICAgICAgICAgICAgLy8gdGhlIGN1cnJlbnQgc2Nyb2xsIHBvc2l0aW9uIChhY2NvdW50aW5nIGZvciB0aGUgbmF2YmFyKVxuICAgICAgICAgICAgICB2YXIgcGFnZU9mZnNldCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcblxuICAgICAgICAgICAgICAvLyBkb24ndCBzY3JvbGwgaWYgdGhlIGVsZW1lbnQgaXMgYWxyZWFkeSBpbiB2aWV3XG4gICAgICAgICAgICAgIGlmICggZWxlbWVudE9mZnNldCA+IHBhZ2VPZmZzZXQgJiYgZWxlbWVudE9mZnNldCA8IHBhZ2VPZmZzZXQgKyB3aW5kb3cuaW5uZXJIZWlnaHQgKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIC8vIG5vdGU6IGF2b2lkIHVzaW5nIGFuaW1hdGUsIGFzIGl0IHByZXZlbnRzIHRoZSB2YWxpZGF0aW9uIG1lc3NhZ2UgZGlzcGxheWluZyBjb3JyZWN0bHlcbiAgICAgICAgICAgICAgJCggJ2h0bWwsIGJvZHknICkuc2Nyb2xsVG9wKCBlbGVtZW50T2Zmc2V0ICk7XG4gICAgICAgICAgfVxuICAgICAgfSApO1xuICAgIH0sIC8vIHNjcm9sbFRvRm9ybUVycm9yXG5cbiAgICBmb3JtU2V0dXA6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcblxuICAgICAgJChvcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5zdWJtaXQoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhhdC5mb3JtUHJvY2Vzc29yKHRoYXQsICdzdWJtaXQnKTtcblxuICAgICAgfSk7XG4gICAgfSwgLy8gZm9ybVNldHVwXG5cbiAgICBmb3JtUHJvY2Vzc29yOiBmdW5jdGlvbih0aGF0LCB0eXBlKSB7XG5cbiAgICAgIC8vIDEuIHJlbW92ZSBwcmV2aW91cyBlcnJvcnMgYW5kIHJlc2V0IHRoZSBidXR0b25cbiAgICAgIHRoYXQucmVzZXRGb3JtRXJyb3JzKHRoYXQub3B0aW9ucywgdGhhdC5lbGVtZW50KTtcblxuICAgICAgLy8gMi4gc2V0IHVwIHRoZSBidXR0b24gaWYgaXQncyBhIGZvcm0gc3VibWl0XG4gICAgICBpZiAodHlwZSA9PT0gJ3N1Ym1pdCcpIHtcbiAgICAgICAgdGhhdC5idXR0b25TdGF0dXModGhhdC5vcHRpb25zLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIHRydWUpO1xuICAgICAgfVxuXG4gICAgICAvLyAzLiBnZW5lcmF0ZSBiaWxsaW5nIGFkZHJlc3MgZGV0YWlsc1xuICAgICAgdmFyIGJpbGxpbmdEZXRhaWxzID0gdGhhdC5nZW5lcmF0ZUJpbGxpbmdEZXRhaWxzKCk7XG5cbiAgICAgIC8vIDQuIGNyZWF0ZSBtaW5ucG9zdCB1c2VyIGFjY291bnRcbiAgICAgIHRoYXQuY3JlYXRlTWlublBvc3RBY2NvdW50KHRoYXQub3B0aW9ucywgdGhhdC5lbGVtZW50KTtcblxuICAgICAgLy8gNS4gZG8gdGhlIGNoYXJnaW5nIG9mIGNhcmQgb3IgYmFuayBhY2NvdW50IGlmIGl0J3MgYSBmb3JtIHN1Ym1pdFxuICAgICAgLy8gb3Igc3VibWl0IHRoZSBmb3JtIGlmIHRoaXMgaXMgYSBwYXltZW50IHJlcXVlc3QgYnV0dG9uXG4gICAgICBpZiAodHlwZSA9PT0gJ3N1Ym1pdCcpIHtcbiAgICAgICAgdmFyIHBheW1lbnRfdHlwZSA9ICQoJ2lucHV0W25hbWU9XCJzdHJpcGVfcGF5bWVudF90eXBlXCJdJykudmFsKCk7XG4gICAgICAgIGlmIChwYXltZW50X3R5cGUgIT09ICdiYW5rX2FjY291bnQnKSB7XG4gICAgICAgICAgLy8gZmluYWxseSwgZ2V0IGEgcGF5bWVudCBtZXRob2QgZnJvbSBzdHJpcGUsIGFuZCB0cnkgdG8gY2hhcmdlIGl0IGlmIGl0IGlzIG5vdCBhY2hcbiAgICAgICAgICB0aGF0LmNyZWF0ZVBheW1lbnRNZXRob2QodGhhdC5jYXJkTnVtYmVyRWxlbWVudCwgYmlsbGluZ0RldGFpbHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGlmIGl0IGlzIGFjaCwgd2UgYWxyZWFkeSBoYXZlIGEgdG9rZW4gc28gc3VibWl0IHRoZSBmb3JtXG4gICAgICAgICAgLy8gdG9kbzogdXBncmFkZSB0aGUgcGxhaWQgaW50ZWdyYXRpb25cbiAgICAgICAgICB0aGF0LmJhbmtUb2tlbkhhbmRsZXIoICQoJ2lucHV0W25hbWU9XCJiYW5rVG9rZW5cIl0nKS52YWwoKSwgJ2JhbmtfYWNjb3VudCcgKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhhdC5zdWJtaXRGb3JtT25seSgpO1xuICAgICAgfVxuICAgIH0sIC8vIGZvcm1Qcm9jZXNzb3JcblxuICAgIHN0cmlwZUVycm9yRGlzcGxheTogZnVuY3Rpb24oZXJyb3IsIHRoaXNfc2VsZWN0b3IsIGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIC8vIGxpc3RlbiBmb3IgZXJyb3JzIGFuZCBkaXNwbGF5L2hpZGUgZXJyb3IgbWVzc2FnZXNcbiAgICAgIHZhciB3aGljaF9lcnJvciA9IHRoaXNfc2VsZWN0b3IuYXR0cignaWQnKTtcbiAgICAgIC8vIHdoZW4gdGhpcyBmaWVsZCBjaGFuZ2VzLCByZXNldCBpdHMgZXJyb3JzXG4gICAgICAkKCcuYS1jYXJkLWluc3RydWN0aW9uLicgKyB3aGljaF9lcnJvcikucmVtb3ZlQ2xhc3MoJ2EtdmFsaWRhdGlvbi1lcnJvcicpO1xuICAgICAgJCgnLmEtY2FyZC1pbnN0cnVjdGlvbi4nICsgd2hpY2hfZXJyb3IpLmVtcHR5KCk7XG4gICAgICAkKHRoaXNfc2VsZWN0b3IpLnJlbW92ZUNsYXNzKCdhLWVycm9yJyk7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgaWYgKCQoJy5hLWNhcmQtaW5zdHJ1Y3Rpb24uJyArIHdoaWNoX2Vycm9yKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgJCgnLmEtY2FyZC1pbnN0cnVjdGlvbi4nICsgd2hpY2hfZXJyb3IpLnRleHQoZXJyb3IubWVzc2FnZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpc19zZWxlY3Rvci5wYXJlbnQoKS5hcHBlbmQoJzxwIGNsYXNzPVwiYS1jYXJkLWluc3RydWN0aW9uICcgKyB3aGljaF9lcnJvciArICdcIj4nICsgZXJyb3IubWVzc2FnZSArICc8L3A+Jyk7XG4gICAgICAgIH1cbiAgICAgICAgJCgnLmEtY2FyZC1pbnN0cnVjdGlvbi4nICsgd2hpY2hfZXJyb3IpLmFkZENsYXNzKCdhLXZhbGlkYXRpb24tZXJyb3InKTtcbiAgICAgICAgdGhpc19zZWxlY3Rvci5wYXJlbnQoKS5hZGRDbGFzcygnbS1oYXMtdmFsaWRhdGlvbi1lcnJvcicpO1xuICAgICAgICAkKHRoaXNfc2VsZWN0b3IpLmFkZENsYXNzKCdhLWVycm9yJyk7XG4gICAgICAgIGlmICh0aGlzX3NlbGVjdG9yLnBhcmVudCgpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgICBzY3JvbGxUb3A6IHRoaXNfc2VsZWN0b3IucGFyZW50KCkub2Zmc2V0KCkudG9wXG4gICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQodGhpc19zZWxlY3RvcikucmVtb3ZlQ2xhc3MoJ2EtZXJyb3InKTtcbiAgICAgICAgJCgnLmEtY2FyZC1pbnN0cnVjdGlvbi4nICsgd2hpY2hfZXJyb3IpLnJlbW92ZUNsYXNzKCdhLXZhbGlkYXRpb24tZXJyb3InKTtcbiAgICAgICAgJCgnLmEtY2FyZC1pbnN0cnVjdGlvbi4nICsgd2hpY2hfZXJyb3IpLmVtcHR5KCk7XG4gICAgICAgICQob3B0aW9ucy5jY19udW1fc2VsZWN0b3IsIGVsZW1lbnQpLnJlbW92ZUNsYXNzKCdhLXZhbGlkYXRpb24tZXJyb3InKTtcbiAgICAgICAgJChvcHRpb25zLmNjX2V4cF9zZWxlY3RvciwgZWxlbWVudCkucmVtb3ZlQ2xhc3MoJ2EtdmFsaWRhdGlvbi1lcnJvcicpO1xuICAgICAgICAkKG9wdGlvbnMuY2NfY3ZjX3NlbGVjdG9yLCBlbGVtZW50KS5yZW1vdmVDbGFzcygnYS12YWxpZGF0aW9uLWVycm9yJyk7XG4gICAgICAgICQob3B0aW9ucy5jY19udW1fc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdtLWhhcy12YWxpZGF0aW9uLWVycm9yJyk7XG4gICAgICAgICQob3B0aW9ucy5jY19leHBfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdtLWhhcy12YWxpZGF0aW9uLWVycm9yJyk7XG4gICAgICAgICQob3B0aW9ucy5jY19jdmNfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdtLWhhcy12YWxpZGF0aW9uLWVycm9yJyk7XG4gICAgICB9XG4gICAgfSwgLy8gc3RyaXBlRXJyb3JEaXNwbGF5XG5cbiAgICByZXNldEZvcm1FcnJvcnM6IGZ1bmN0aW9uKG9wdGlvbnMsIGVsZW1lbnQpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICQoJy5hLXZhbGlkYXRpb24tZXJyb3InKS5yZW1vdmUoKTtcbiAgICAgICQoJ2lucHV0LCBsYWJlbCwgZGl2JywgZWxlbWVudCkucmVtb3ZlQ2xhc3MoJ2EtZXJyb3InKTtcbiAgICAgICQoJ2xhYmVsJywgZWxlbWVudCkucmVtb3ZlQ2xhc3MoJ20taGFzLXZhbGlkYXRpb24tZXJyb3InKTtcbiAgICAgICQob3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvciwgZWxlbWVudCkucmVtb3ZlQ2xhc3MoJ2EtZXJyb3IgaW52YWxpZCcpO1xuICAgICAgJCgnLmEtdmFsaWRhdGlvbi1lcnJvcicpLnJlbW92ZSgpO1xuICAgICAgXG4gICAgICAkKG9wdGlvbnMuY2hvb3NlX3BheW1lbnQgKyAnIGlucHV0JykuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICAkKG9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IgKyAnIC5hLWVycm9yJykucmVtb3ZlKCk7IC8vIHJlbW92ZSBtZXRob2QgZXJyb3IgbWVzc2FnZSBpZiBpdCBpcyB0aGVyZVxuICAgICAgICAkKG9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IpLnBhcmVudCgpLmZpbmQoJy5hLXZhbGlkYXRpb24tZXJyb3InKS5yZW1vdmUoKTtcbiAgICAgICAgLy8gaWYgYSBwYXltZW50IGZpZWxkIGNoYW5nZWQsIHJlc2V0IHRoZSBidXR0b25cbiAgICAgICAgdGhhdC5idXR0b25TdGF0dXMob3B0aW9ucywgJChvcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKSwgZmFsc2UpO1xuICAgICAgfSk7XG4gICAgfSwgLy8gcmVzZXRGb3JtRXJyb3JzXG4gICAgXG4gICAgY3JlYXRlTWlublBvc3RBY2NvdW50OiBmdW5jdGlvbihvcHRpb25zLCBlbGVtZW50KSB7XG4gICAgICAvLyAyLiBjcmVhdGUgbWlubnBvc3QgYWNjb3VudCBpZiBzcGVjaWZpZWRcbiAgICAgIGlmIChvcHRpb25zLmNyZWF0ZV9hY2NvdW50ID09PSB0cnVlKSB7XG4gICAgICAgIHZhciB1c2VyID0ge1xuICAgICAgICAgIGVtYWlsOiAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgIGZpcnN0X25hbWU6ICQob3B0aW9ucy5maXJzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICBsYXN0X25hbWU6ICQob3B0aW9ucy5sYXN0X25hbWVfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgIHBhc3N3b3JkOiAkKG9wdGlvbnMucGFzc3dvcmRfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgIGNpdHk6ICQob3B0aW9ucy5iaWxsaW5nX2NpdHlfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgIHN0YXRlOiAkKG9wdGlvbnMuYmlsbGluZ19zdGF0ZV9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgemlwOiAkKG9wdGlvbnMuYmlsbGluZ196aXBfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICB9O1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIHVybDogb3B0aW9ucy5taW5ucG9zdF9yb290ICsgJy93cC1qc29uL3VzZXItYWNjb3VudC1tYW5hZ2VtZW50L3YxL2NyZWF0ZS11c2VyJyxcbiAgICAgICAgICBkYXRhOiB1c2VyXG4gICAgICAgIH0pLmRvbmUoZnVuY3Rpb24oIGRhdGEgKSB7XG4gICAgICAgICAgaWYgKGRhdGEuc3RhdHVzID09PSAnc3VjY2VzcycgJiYgZGF0YS5yZWFzb24gPT09ICduZXcgdXNlcicpIHtcbiAgICAgICAgICAgIC8vIHVzZXIgY3JlYXRlZCAtIHRoZXkgc2hvdWxkIHJlY2VpdmUgZW1haWxcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sIC8vIGNyZWF0ZU1pbm5Qb3N0QWNjb3VudFxuICAgIFxuICAgIGdlbmVyYXRlQmlsbGluZ0RldGFpbHM6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGJpbGxpbmdEZXRhaWxzID0ge307XG4gICAgICB2YXIgYWRkcmVzc0RldGFpbHMgPSB7fTtcblxuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yKS52YWwoKSAhPSAnJykge1xuICAgICAgICBiaWxsaW5nRGV0YWlscy5lbWFpbCA9ICQodGhpcy5vcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yKS52YWwoKTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgdmFyIGZ1bGxfbmFtZSA9ICcnO1xuICAgICAgaWYgKCQoJyNmdWxsX25hbWUnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGZ1bGxfbmFtZSA9ICQoJyNmdWxsX25hbWUnKS52YWwoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZ1bGxfbmFtZSA9ICQodGhpcy5vcHRpb25zLmZpcnN0X25hbWVfZmllbGRfc2VsZWN0b3IpLnZhbCgpICsgJyAnICsgJCh0aGlzLm9wdGlvbnMubGFzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yKS52YWwoKTtcbiAgICAgIH1cbiAgICAgIGJpbGxpbmdEZXRhaWxzLm5hbWUgPSBmdWxsX25hbWU7XG5cbiAgICAgIHZhciBzdHJlZXQgPSAnTm9uZSc7XG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuYmlsbGluZ19zdHJlZXRfZmllbGRfc2VsZWN0b3IpLnZhbCgpICE9ICcnKSB7XG4gICAgICAgIHN0cmVldCA9ICQodGhpcy5vcHRpb25zLmJpbGxpbmdfc3RyZWV0X2ZpZWxkX3NlbGVjdG9yKS52YWwoKTtcbiAgICAgICAgYWRkcmVzc0RldGFpbHMubGluZTEgPSBzdHJlZXQ7XG4gICAgICB9XG5cbiAgICAgIHZhciBjaXR5ID0gJ05vbmUnO1xuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmJpbGxpbmdfY2l0eV9maWVsZF9zZWxlY3RvcikudmFsKCkgIT0gJycpIHtcbiAgICAgICAgY2l0eSA9ICQodGhpcy5vcHRpb25zLmJpbGxpbmdfY2l0eV9maWVsZF9zZWxlY3RvcikudmFsKCk7XG4gICAgICAgIGFkZHJlc3NEZXRhaWxzLmNpdHkgPSBjaXR5O1xuICAgICAgfVxuXG4gICAgICB2YXIgc3RhdGUgPSAnTm9uZSc7XG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuYmlsbGluZ19zdGF0ZV9maWVsZF9zZWxlY3RvcikudmFsKCkgIT0gJycpIHtcbiAgICAgICAgc3RhdGUgPSAkKHRoaXMub3B0aW9ucy5iaWxsaW5nX3N0YXRlX2ZpZWxkX3NlbGVjdG9yKS52YWwoKTtcbiAgICAgICAgYWRkcmVzc0RldGFpbHMuc3RhdGUgPSBzdGF0ZTtcbiAgICAgIH1cblxuICAgICAgdmFyIHppcCA9ICdOb25lJztcbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5iaWxsaW5nX3ppcF9maWVsZF9zZWxlY3RvcikudmFsKCkgIT0gJycpIHtcbiAgICAgICAgemlwID0gJCh0aGlzLm9wdGlvbnMuYmlsbGluZ196aXBfZmllbGRfc2VsZWN0b3IpLnZhbCgpO1xuICAgICAgICBhZGRyZXNzRGV0YWlscy5wb3N0YWxfY29kZSA9IHppcDtcbiAgICAgIH1cblxuICAgICAgdmFyIGNvdW50cnkgPSAnVVMnO1xuICAgICAgdmFyIGNvdW50cnlfZmllbGRfdmFsdWUgPSAkKHRoaXMub3B0aW9ucy5iaWxsaW5nX2NvdW50cnlfZmllbGRfc2VsZWN0b3IpLnZhbCgpO1xuICAgICAgaWYgKGNvdW50cnlfZmllbGRfdmFsdWUgIT0gJycgJiYgY291bnRyeV9maWVsZF92YWx1ZSAhPSAnVW5pdGVkIFN0YXRlcycpIHtcbiAgICAgICAgY291bnRyeSA9IGNvdW50cnlfZmllbGRfdmFsdWU7XG4gICAgICB9XG4gICAgICBhZGRyZXNzRGV0YWlscy5jb3VudHJ5ID0gY291bnRyeTtcblxuICAgICAgaWYgKHN0cmVldCAhPT0gJ05vbmUnIHx8IGNpdHkgIT09ICdOb25lJyB8fCBzdGF0ZSAhPT0gJ05vbmUnIHx8IHppcCAhPT0gJ05vbmUnKSB7XG4gICAgICAgIGJpbGxpbmdEZXRhaWxzLmFkZHJlc3MgPSBhZGRyZXNzRGV0YWlscztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGJpbGxpbmdEZXRhaWxzO1xuICAgIH0sIC8vIGdlbmVyYXRlQmlsbGluZ0RldGFpbHNcblxuICAgIGNyZWF0ZVBheW1lbnRNZXRob2Q6IGZ1bmN0aW9uKGNhcmRFbGVtZW50LCBiaWxsaW5nRGV0YWlscykge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdGhhdC5zdHJpcGUuY3JlYXRlUGF5bWVudE1ldGhvZCh7XG4gICAgICAgIHR5cGU6ICdjYXJkJyxcbiAgICAgICAgY2FyZDogY2FyZEVsZW1lbnQsXG4gICAgICAgIGJpbGxpbmdfZGV0YWlsczogYmlsbGluZ0RldGFpbHNcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKHJlc3BvbnNlLmVycm9yKSB7XG4gICAgICAgICAgdGhhdC5oYW5kbGVTZXJ2ZXJFcnJvcihyZXNwb25zZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gU2VuZCBwYXltZW50TWV0aG9kLmlkIHRvIHNlcnZlclxuICAgICAgICAgIHZhciBzdXBwb3J0Zm9ybSA9ICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKTtcbiAgICAgICAgICB2YXIgYWpheF91cmwgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG4gICAgICAgICAgdmFyIHRva2VuRmllbGROYW1lID0gJ3BheW1lbnRfbWV0aG9kX2lkJztcbiAgICAgICAgICB2YXIgdG9rZW5GaWVsZCA9ICdpbnB1dFtuYW1lPVwiJyArIHRva2VuRmllbGROYW1lICsgJ1wiXSc7XG5cbiAgICAgICAgICAvLyBJbnNlcnQgdGhlIHBheW1lbnQgbWV0aG9kIElEIGludG8gdGhlIGZvcm0gc28gaXQgZ2V0cyBzdWJtaXR0ZWQgdG8gdGhlIHNlcnZlclxuICAgICAgICAgIGlmICgkKHRva2VuRmllbGQpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICQodG9rZW5GaWVsZCkudmFsKHJlc3BvbnNlLnBheW1lbnRNZXRob2QuaWQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdXBwb3J0Zm9ybS5hcHBlbmQoJCgnPGlucHV0IHR5cGU9XFxcImhpZGRlblxcXCIgbmFtZT1cIicgKyB0b2tlbkZpZWxkTmFtZSArICdcIj4nKS52YWwocmVzcG9uc2UucGF5bWVudE1ldGhvZC5pZCkpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGZldGNoKGFqYXhfdXJsLCB7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYm9keTogJChzdXBwb3J0Zm9ybSkuc2VyaWFsaXplKClcbiAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAvLyBIYW5kbGUgc2VydmVyIHJlc3BvbnNlIChzZWUgU3RlcCAzKVxuICAgICAgICAgICAgcmVzcG9uc2UuanNvbigpLnRoZW4oZnVuY3Rpb24oanNvbikge1xuICAgICAgICAgICAgICB0aGF0LmhhbmRsZVNlcnZlclJlc3BvbnNlKGpzb24pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSwgLy8gY3JlYXRlUGF5bWVudE1ldGhvZFxuXG4gICAgYmFua1Rva2VuSGFuZGxlcjogZnVuY3Rpb24odG9rZW4sIHR5cGUpIHtcbiAgICAgIHRoaXMuc2V0U3RyaXBlUGF5bWVudFR5cGUodHlwZSk7XG4gICAgICB0aGlzLnN1Ym1pdEZvcm1Pbmx5KCk7XG4gICAgfSwgLy8gYmFua1Rva2VuSGFuZGxlclxuXG4gICAgc3VibWl0Rm9ybU9ubHk6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdmFyIHN1cHBvcnRmb3JtID0gJCh0aGlzLm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpO1xuICAgICAgdmFyIGFqYXhfdXJsID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xuXG4gICAgICAvLyBTdWJtaXQgdGhlIGZvcm1cbiAgICAgIC8vIHRoZSB3YXkgaXQgd29ya3MgY3VycmVudGx5IGlzIHRoZSBmb3JtIHN1Ym1pdHMgYW4gYWpheCByZXF1ZXN0IHRvIGl0c2VsZlxuICAgICAgLy8gdGhlbiBpdCBzdWJtaXRzIGEgcG9zdCByZXF1ZXN0IHRvIHRoZSBmb3JtJ3MgYWN0aW9uIHVybFxuICAgICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBhamF4X3VybCxcbiAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICBkYXRhOiAkKHN1cHBvcnRmb3JtKS5zZXJpYWxpemUoKSxcbiAgICAgICAgdHlwZTogJ1BPU1QnXG4gICAgICB9KVxuICAgICAgLmRvbmUoZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKHR5cGVvZiByZXNwb25zZS5lcnJvcnMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgdGhhdC5oYW5kbGVTZXJ2ZXJFcnJvcihyZXNwb25zZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3VwcG9ydGZvcm0uZ2V0KDApLnN1Ym1pdCgpOyAvLyBjb250aW51ZSBzdWJtaXR0aW5nIHRoZSBmb3JtIGlmIHRoZSBhamF4IHdhcyBzdWNjZXNzZnVsXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAuZXJyb3IoZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgdGhhdC5idXR0b25TdGF0dXModGhhdC5vcHRpb25zLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIGZhbHNlKTtcbiAgICAgIH0pO1xuICAgIH0sIC8vIHN1Ym1pdEZvcm1Pbmx5XG5cbiAgICBoYW5kbGVTZXJ2ZXJSZXNwb25zZTogZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgIHZhciBzdXBwb3J0Zm9ybSA9ICQodGhpcy5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKTtcbiAgICAgIGlmIChyZXNwb25zZS5lcnJvcnMpIHtcbiAgICAgICAgLy8gU2hvdyBlcnJvciBmcm9tIHNlcnZlciBvbiBwYXltZW50IGZvcm1cbiAgICAgICAgdGhpcy5oYW5kbGVTZXJ2ZXJFcnJvcihyZXNwb25zZSk7XG4gICAgICB9IGVsc2UgaWYgKHJlc3BvbnNlLnJlcXVpcmVzX2FjdGlvbikge1xuICAgICAgICAvLyBVc2UgU3RyaXBlLmpzIHRvIGhhbmRsZSByZXF1aXJlZCBjYXJkIGFjdGlvblxuICAgICAgICAvL2hhbmRsZUFjdGlvbihyZXNwb25zZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdXBwb3J0Zm9ybS5nZXQoMCkuc3VibWl0KCk7IC8vIGNvbnRpbnVlIHN1Ym1pdHRpbmcgdGhlIGZvcm0gaWYgdGhlIGFqYXggd2FzIHN1Y2Nlc3NmdWxcbiAgICAgIH1cbiAgICB9LCAvLyBoYW5kbGVTZXJ2ZXJSZXNwb25zZVxuXG4gICAgaGFuZGxlU2VydmVyRXJyb3I6IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB2YXIgdGhpc19maWVsZCA9ICcnO1xuICAgICAgLy8gZG8gbm90IHN1Ym1pdC4gdGhlcmUgaXMgYW4gZXJyb3IuXG4gICAgICB0aGF0LmJ1dHRvblN0YXR1cyh0aGF0Lm9wdGlvbnMsICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKSwgZmFsc2UpO1xuICAgICAgLy8gaGFuZGxlIGVycm9yIGRpc3BsYXlcbiAgICAgIGlmICh0eXBlb2YgcmVzcG9uc2UuZXJyb3JzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBpZiAodHlwZW9mIHJlc3BvbnNlLmVycm9yc1swXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICB0aGlzX2ZpZWxkID0gcmVzcG9uc2UuZXJyb3JzWzBdLmZpZWxkICsgJ19maWVsZF9zZWxlY3Rvcic7XG4gICAgICAgIH1cbiAgICAgICAgJC5lYWNoKHJlc3BvbnNlLmVycm9ycywgZnVuY3Rpb24oIGluZGV4LCBlcnJvciApIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGVycm9yLmZpZWxkICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdGhpc19maWVsZCA9IGVycm9yLmZpZWxkICsgJ19maWVsZF9zZWxlY3Rvcic7XG4gICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZXJyb3IucGFyYW0gIT09ICd1bmRlZmluZWQnICYmIGVycm9yLnBhcmFtICE9PSAnJykge1xuICAgICAgICAgICAgdGhpc19maWVsZCA9ICdjY18nICsgZXJyb3IucGFyYW0gKyAnX3NlbGVjdG9yJzsgIFxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGF0LmRpc3BsYXlFcnJvck1lc3NhZ2UoZXJyb3IsIHRoaXNfZmllbGQpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHJlc3BvbnNlLmVycm9yICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB2YXIgZXJyb3IgPSByZXNwb25zZS5lcnJvcjtcbiAgICAgICAgaWYgKHR5cGVvZiBlcnJvci5maWVsZCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICB0aGlzX2ZpZWxkID0gZXJyb3IuZmllbGQgKyAnX2ZpZWxkX3NlbGVjdG9yJztcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZXJyb3IucGFyYW0gIT09ICd1bmRlZmluZWQnICYmIGVycm9yLnBhcmFtICE9PSAnJykge1xuICAgICAgICAgIHRoaXNfZmllbGQgPSAnY2NfJyArIGVycm9yLnBhcmFtICsgJ19zZWxlY3Rvcic7ICBcbiAgICAgICAgfVxuICAgICAgICB0aGF0LmRpc3BsYXlFcnJvck1lc3NhZ2UoZXJyb3IsIHRoaXNfZmllbGQpO1xuICAgICAgfVxuICAgICAgaWYgKCQodGhhdC5vcHRpb25zW3RoaXNfZmllbGRdKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICBzY3JvbGxUb3A6ICQodGhhdC5vcHRpb25zW3RoaXNfZmllbGRdKS5wYXJlbnQoKS5vZmZzZXQoKS50b3BcbiAgICAgICAgfSwgMjAwMCk7XG4gICAgICB9XG4gICAgfSwgLy8gaGFuZGxlU2VydmVyRXJyb3JcblxuICAgIGRpc3BsYXlFcnJvck1lc3NhZ2UoZXJyb3IsIGZpZWxkKSB7XG4gICAgICB2YXIgbWVzc2FnZSA9ICcnO1xuICAgICAgdmFyIHN0cmlwZUVycm9yU2VsZWN0b3IgPSAnJztcbiAgICAgIHZhciBmaWVsZFBhcmVudCA9ICQodGhpcy5vcHRpb25zW2ZpZWxkXSkucGFyZW50KCk7XG4gICAgICBpZiAodHlwZW9mIGVycm9yLm1lc3NhZ2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIG1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWVzc2FnZSA9IGVycm9yLm1lc3NhZ2VbMF07XG4gICAgICB9XG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnNbZmllbGRdKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICQodGhpcy5vcHRpb25zW2ZpZWxkXSkuYWRkQ2xhc3MoJ2EtZXJyb3InKTtcbiAgICAgICAgJCh0aGlzLm9wdGlvbnNbZmllbGRdKS5wcmV2KCkuYWRkQ2xhc3MoJ2EtZXJyb3InKTtcbiAgICAgICAgaWYgKCQoJy5hLWNhcmQtaW5zdHJ1Y3Rpb24nLCBmaWVsZFBhcmVudCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICQoJy5hLWNhcmQtaW5zdHJ1Y3Rpb24nLCBmaWVsZFBhcmVudCkuYWRkQ2xhc3MoJ2EtdmFsaWRhdGlvbi1lcnJvcicpO1xuICAgICAgICAgICQoJy5hLWNhcmQtaW5zdHJ1Y3Rpb24nLCBmaWVsZFBhcmVudCkudGV4dChtZXNzYWdlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkKHRoaXMub3B0aW9uc1tmaWVsZF0pLmFmdGVyKCc8cCBjbGFzcz1cImEtY2FyZC1pbnN0cnVjdGlvbiBhLXZhbGlkYXRpb24tZXJyb3JcIj4nICsgbWVzc2FnZSArICc8L3A+Jyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGVycm9yICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aGlzLmJ1dHRvblN0YXR1cyh0aGlzLm9wdGlvbnMsICQodGhpcy5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKSwgZmFsc2UpO1xuICAgICAgICBpZiAoZXJyb3IuY29kZSA9PT0gJ2luY29tcGxldGVfbnVtYmVyJyB8fCBlcnJvci5jb2RlID09ICdpbnZhbGlkX251bWJlcicgfHwgZXJyb3IuY29kZSA9PSAnaW5jb3JyZWN0X251bWJlcicgfHwgZXJyb3IuY29kZSA9PSAnY2FyZF9kZWNsaW5lZCcgfHwgZXJyb3IuY29kZSA9PSAncHJvY2Vzc2luZ19lcnJvcicpIHtcbiAgICAgICAgICAvLyBlcnJvciBoYW5kbGluZ1xuICAgICAgICAgIHN0cmlwZUVycm9yU2VsZWN0b3IgPSAkKHRoaXMub3B0aW9ucy5jY19udW1fc2VsZWN0b3IpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJvci5jb2RlID09ICdpbnZhbGlkX2V4cGlyeV9tb250aCcgfHwgZXJyb3IuY29kZSA9PSAnaW52YWxpZF9leHBpcnlfeWVhcicgfHwgZXJyb3IuY29kZSA9PSAnZXhwaXJlZF9jYXJkJykge1xuICAgICAgICAgIC8vIGVycm9yIGhhbmRsaW5nXG4gICAgICAgICAgc3RyaXBlRXJyb3JTZWxlY3RvciA9ICQodGhpcy5vcHRpb25zLmNjX2V4cF9zZWxlY3Rvcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9yLmNvZGUgPT0gJ2ludmFsaWRfY3ZjJyB8fCBlcnJvci5jb2RlID09ICdpbmNvcnJlY3RfY3ZjJykge1xuICAgICAgICAgIC8vIGVycm9yIGhhbmRsaW5nXG4gICAgICAgICAgc3RyaXBlRXJyb3JTZWxlY3RvciA9ICQodGhpcy5vcHRpb25zLmNjX2N2Y19zZWxlY3Rvcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9yLmNvZGUgPT0gJ2VtYWlsX2ludmFsaWQnKSB7XG4gICAgICAgICAgLy8gZXJyb3IgaGFuZGxpbmdcbiAgICAgICAgICBzdHJpcGVFcnJvclNlbGVjdG9yID0gJCh0aGlzLm9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdHJpcGVFcnJvclNlbGVjdG9yICE9PSAnJykge1xuICAgICAgICAgIHRoaXMuc3RyaXBlRXJyb3JEaXNwbGF5KGVycm9yLCBzdHJpcGVFcnJvclNlbGVjdG9yLCB0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJvci50eXBlID09ICdtaXNzaW5nX3BheW1lbnQnICYmIHN0cmlwZUVycm9yU2VsZWN0b3IgPT09ICcnKSB7XG4gICAgICAgICAgJCh0aGlzLm9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IgKyAnLmFjdGl2ZScpLmFwcGVuZCgnPHAgY2xhc3M9XCJhLWZvcm0tY2FwdGlvbiBhLXZhbGlkYXRpb24tZXJyb3IgYS1taXNzaW5nLXBheW1lbnQtZXJyb3JcIj4nICsgZXJyb3IubWVzc2FnZSArICc8L3A+JylcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXJyb3IuZmllbGQgPT0gJ3JlY2FwdGNoYScpIHtcbiAgICAgICAgICAkKHRoaXMub3B0aW9ucy5wYXlfYnV0dG9uX3NlbGVjdG9yKS5iZWZvcmUoJzxwIGNsYXNzPVwiYS1mb3JtLWNhcHRpb24gYS12YWxpZGF0aW9uLWVycm9yIGEtcmVjYXB0Y2hhLWVycm9yXCI+JyArIG1lc3NhZ2UgKyAnPC9wPicpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9yLnR5cGUgPT0gJ2ludmFsaWRfcmVxdWVzdF9lcnJvcicgJiYgc3RyaXBlRXJyb3JTZWxlY3RvciA9PT0gJycpIHtcbiAgICAgICAgICAkKHRoaXMub3B0aW9ucy5wYXlfYnV0dG9uX3NlbGVjdG9yKS5iZWZvcmUoJzxwIGNsYXNzPVwiYS1mb3JtLWNhcHRpb24gYS12YWxpZGF0aW9uLWVycm9yIGEtaW52YWxpZC1yZXF1ZXN0LWVycm9yXCI+JyArIGVycm9yLm1lc3NhZ2UgKyAnPC9wPicpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCAvLyBkaXNwbGF5RXJyb3JNZXNzYWdlXG5cbiAgICBzaG93TmV3c2xldHRlclNldHRpbmdzOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG5cbiAgICAgIHZhciBuZXdzbGV0dGVyX2dyb3VwX2h0bWwgPSAnJztcbiAgICAgIGlmICgkKG9wdGlvbnMubmV3c2xldHRlcl9ncm91cF9zZWxlY3RvcikubGVuZ3RoID4gMCApIHtcbiAgICAgICAgdmFyIGdldF9kYXRhID0ge1xuICAgICAgICAgIHNob3J0Y29kZTogJ25ld3NsZXR0ZXJfZm9ybScsXG4gICAgICAgICAgcGxhY2VtZW50OiAndXNlcmFjY291bnQnXG4gICAgICAgIH07XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICB1cmw6IG9wdGlvbnMubWlubnBvc3Rfcm9vdCArICcvd3AtanNvbi9taW5ucG9zdC1hcGkvdjIvbWFpbGNoaW1wL2Zvcm0nLFxuICAgICAgICAgIGRhdGE6IGdldF9kYXRhXG4gICAgICAgIH0pLmRvbmUoZnVuY3Rpb24oIHJlc3VsdCApIHtcbiAgICAgICAgICBpZiAoIHR5cGVvZiByZXN1bHQuZ3JvdXBfZmllbGRzICE9PSAndW5kZWZpbmVkJyApIHtcbiAgICAgICAgICAgICQuZWFjaChyZXN1bHQuZ3JvdXBfZmllbGRzLCBmdW5jdGlvbiggaW5kZXgsIGNhdGVnb3J5ICkge1xuICAgICAgICAgICAgICBuZXdzbGV0dGVyX2dyb3VwX2h0bWwgKz0gJzxmaWVsZHNldCBjbGFzcz1cIm0tZm9ybS1pdGVtIHN1cHBvcnQtbmV3c2xldHRlciBtLWZvcm0taXRlbS0nICsgY2F0ZWdvcnkudHlwZSArICdcIj4nO1xuICAgICAgICAgICAgICBuZXdzbGV0dGVyX2dyb3VwX2h0bWwgKz0gJzxsYWJlbD4nICsgY2F0ZWdvcnkubmFtZSArICc6PC9sYWJlbD4nO1xuICAgICAgICAgICAgICBpZiAoIGNhdGVnb3J5LmNvbnRhaW5zLmxlbmd0aCA+IDAgKSB7XG4gICAgICAgICAgICAgICAgbmV3c2xldHRlcl9ncm91cF9odG1sICs9ICc8ZGl2IGNsYXNzPVwibS1mb3JtLWl0ZW0gbS1mb3JtLWl0ZW0tbmV3c2xldHRlclwiPic7XG4gICAgICAgICAgICAgICAgJC5lYWNoKGNhdGVnb3J5W2NhdGVnb3J5LmNvbnRhaW5zXSwgZnVuY3Rpb24oIGluZGV4LCBpdGVtICkge1xuICAgICAgICAgICAgICAgICAgbmV3c2xldHRlcl9ncm91cF9odG1sICs9ICc8bGFiZWw+PGlucHV0IG5hbWU9XCJncm91cHNfc3VibWl0dGVkXCIgdHlwZT1cImNoZWNrYm94XCIgdmFsdWU9XCInICsgaXRlbS5pZCArICdcIj4nICsgaXRlbS5uYW1lICsgJzwvbGFiZWw+JztcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBuZXdzbGV0dGVyX2dyb3VwX2h0bWwgKz0gJzwvZGl2Pic7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgbmV3c2xldHRlcl9ncm91cF9odG1sICs9ICc8L2ZpZWxkc2V0Pic7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICQob3B0aW9ucy5uZXdzbGV0dGVyX2dyb3VwX3NlbGVjdG9yKS5odG1sKG5ld3NsZXR0ZXJfZ3JvdXBfaHRtbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKCQob3B0aW9ucy5uZXdzbGV0dGVyX2dyb3VwX3NlbGVjdG9yKS5sZW5ndGggPiAwICYmIHR5cGVvZiAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB2YXIgZ2V0X2RhdGEgPSB7XG4gICAgICAgICAgZW1haWw6ICQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKClcbiAgICAgICAgfTtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgIHVybDogb3B0aW9ucy5taW5ucG9zdF9yb290ICsgJy93cC1qc29uL21pbm5wb3N0LWFwaS92Mi9tYWlsY2hpbXAvdXNlcicsXG4gICAgICAgICAgZGF0YTogZ2V0X2RhdGFcbiAgICAgICAgfSkuZG9uZShmdW5jdGlvbiggcmVzdWx0ICkge1xuICAgICAgICAgIGlmICggdHlwZW9mIHJlc3VsdC5tYWlsY2hpbXBfc3RhdHVzICE9PSAndW5kZWZpbmVkJyApIHtcbiAgICAgICAgICAgICQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkuYWZ0ZXIoJzxpbnB1dCBuYW1lPVwibWFpbGNoaW1wX3N0YXR1c1wiIHR5cGU9XCJoaWRkZW5cIiB2YWx1ZT1cIicgKyByZXN1bHQubWFpbGNoaW1wX3N0YXR1cyArICdcIj4nKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCB0eXBlb2YgcmVzdWx0Lm1haWxjaGltcF91c2VyX2lkICE9PSAndW5kZWZpbmVkJyApIHtcbiAgICAgICAgICAgICQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkuYWZ0ZXIoJzxpbnB1dCBuYW1lPVwibWFpbGNoaW1wX3VzZXJfaWRcIiB0eXBlPVwiaGlkZGVuXCIgdmFsdWU9XCInICsgcmVzdWx0Lm1haWxjaGltcF91c2VyX2lkICsgJ1wiPicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAocmVzdWx0Lm1haWxjaGltcF9zdGF0dXMgPT09ICdzdWJzY3JpYmVkJykge1xuICAgICAgICAgICAgLy8gdXNlciBjcmVhdGVkIC0gc2hvdyBhIHN1Y2Nlc3MgbWVzc2FnZVxuICAgICAgICAgICAgJCgnLmEtY29uZmlybS1pbnN0cnVjdGlvbnMnKS50ZXh0KCQoJy5hLWNvbmZpcm0taW5zdHJ1Y3Rpb25zJykuYXR0cignZGF0YS1rbm93bi11c2VyJykpO1xuICAgICAgICAgICAgdmFyIGdyb3VwcyA9IHJlc3VsdC5ncm91cHM7XG4gICAgICAgICAgICAkLmVhY2goZ3JvdXBzLCBmdW5jdGlvbiggaW5kZXgsIHZhbHVlICkge1xuICAgICAgICAgICAgICBpZiAoIHZhbHVlID09PSB0cnVlICkge1xuICAgICAgICAgICAgICAgICQoJzpjaGVja2JveFt2YWx1ZT1cIicgKyBpbmRleCArICdcIl0nKS5wcm9wKCdjaGVja2VkJyx0cnVlKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKCc6Y2hlY2tib3hbdmFsdWU9XCInICsgaW5kZXggKyAnXCJdJykucHJvcCgnY2hlY2tlZCcsZmFsc2UpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgfSwgLy8gc2hvd05ld3NsZXR0ZXJTZXR0aW5nc1xuXG4gICAgY29uZmlybU1lc3NhZ2VTdWJtaXQ6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcblxuICAgICAgdmFyIGV4aXN0aW5nX25ld3NsZXR0ZXJfc2V0dGluZ3MgPSAkKG9wdGlvbnMubmV3c2xldHRlcl9ncm91cF9zZWxlY3RvciArICcgaW5wdXQnKS5zZXJpYWxpemUoKTtcbiAgICAgIC8vdGhpcy5kZWJ1ZyhleGlzdGluZ19uZXdzbGV0dGVyX3NldHRpbmdzKTtcblxuICAgICAgJChvcHRpb25zLmNvbmZpcm1fZm9ybV9zZWxlY3Rvcikuc3VibWl0KGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgdmFyIGNvbmZpcm1mb3JtID0gJChvcHRpb25zLmNvbmZpcm1fZm9ybV9zZWxlY3Rvcik7XG4gICAgICAgIC8vIHN1Ym1pdCBzZXR0aW5ncyB0byBtYWlsY2hpbXBcbiAgICAgICAgLy8gbmVlZCB0byBnZXQgdXNlciBpbmZvIG9uIGEgaGlkZGVuIGZpZWxkIGhlcmVcblxuICAgICAgICB2YXIgbmV3c2xldHRlcl9ncm91cHMgPSAkKG9wdGlvbnMubmV3c2xldHRlcl9ncm91cF9zZWxlY3RvciArICcgaW5wdXQ6Y2hlY2tlZCcpO1xuICAgICAgICB2YXIgbmV3X25ld3NsZXR0ZXJfc2V0dGluZ3MgPSBuZXdzbGV0dGVyX2dyb3Vwcy5zZXJpYWxpemUoKTtcblxuICAgICAgICBpZiAoKGV4aXN0aW5nX25ld3NsZXR0ZXJfc2V0dGluZ3MgIT09IG5ld19uZXdzbGV0dGVyX3NldHRpbmdzKSAmJiAodHlwZW9mIG5ld3NsZXR0ZXJfZ3JvdXBzICE9PSAndW5kZWZpbmVkJykpIHtcbiAgICAgICAgICAvL2FkZCBvdXIgb3duIGFqYXggY2hlY2sgYXMgWC1SZXF1ZXN0ZWQtV2l0aCBpcyBub3QgYWx3YXlzIHJlbGlhYmxlXG4gICAgICAgICAgLy9hamF4X2Zvcm1fZGF0YSA9IG5ld19uZXdzbGV0dGVyX3NldHRpbmdzICsgJyZhamF4cmVxdWVzdD10cnVlJnN1YnNjcmliZSc7XG5cbiAgICAgICAgICB2YXIgcG9zdF9kYXRhID0ge1xuICAgICAgICAgICAgZW1haWw6ICQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgICBmaXJzdF9uYW1lOiAkKG9wdGlvbnMuZmlyc3RfbmFtZV9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgICBsYXN0X25hbWU6ICQob3B0aW9ucy5sYXN0X25hbWVfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgICAgZ3JvdXBzX3N1Ym1pdHRlZDoge31cbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgcG9zdF9kYXRhLmdyb3Vwc19hdmFpbGFibGUgPSAnYWxsJztcblxuICAgICAgICAgIGlmICggJCgnaW5wdXRbbmFtZT1cIm1haWxjaGltcF9zdGF0dXNcIl0nKS5sZW5ndGggPiAwICkge1xuICAgICAgICAgICAgcG9zdF9kYXRhLm1haWxjaGltcF9zdGF0dXMgPSAkKCdpbnB1dFtuYW1lPVwibWFpbGNoaW1wX3N0YXR1c1wiXScpLnZhbCgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICggJCgnaW5wdXRbbmFtZT1cIm1haWxjaGltcF91c2VyX2lkXCJdJykubGVuZ3RoID4gMCApIHtcbiAgICAgICAgICAgIHBvc3RfZGF0YS5tYWlsY2hpbXBfdXNlcl9pZCA9ICQoJ2lucHV0W25hbWU9XCJtYWlsY2hpbXBfdXNlcl9pZFwiXScpLnZhbCgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0eXBlb2YgbmV3c2xldHRlcl9ncm91cHMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAkLmVhY2gobmV3c2xldHRlcl9ncm91cHMsIGZ1bmN0aW9uKGluZGV4LCB2YWx1ZSkge1xuICAgICAgICAgICAgICB2YXIgZ3JvdXAgPSAkKHRoaXMpLnZhbCgpO1xuICAgICAgICAgICAgICBwb3N0X2RhdGEuZ3JvdXBzX3N1Ym1pdHRlZFtpbmRleF0gPSBncm91cDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IG9wdGlvbnMubWlubnBvc3Rfcm9vdCArICcvd3AtanNvbi9taW5ucG9zdC1hcGkvdjIvbWFpbGNoaW1wL3VzZXInLFxuICAgICAgICAgICAgdHlwZTogJ3Bvc3QnLFxuICAgICAgICAgICAgZGF0YVR5cGUgOiAnanNvbicsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkocG9zdF9kYXRhKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmRvbmUoZnVuY3Rpb24ocmVzcG9uc2UpIHsgLy8gcmVzcG9uc2UgZnJvbSB0aGUgUEhQIGFjdGlvblxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSAnJztcbiAgICAgICAgICAgIGlmICggcmVzcG9uc2Uuc3VjY2VzcyA9PT0gdHJ1ZSApIHtcbiAgICAgICAgICAgICAgLypzd2l0Y2ggKHJlc3BvbnNlLmRhdGEudXNlcl9zdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdleGlzdGluZyc6XG4gICAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ1RoYW5rcyBmb3IgdXBkYXRpbmcgeW91ciBlbWFpbCBwcmVmZXJlbmNlcy4gVGhleSB3aWxsIGdvIGludG8gZWZmZWN0IGltbWVkaWF0ZWx5Lic7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICduZXcnOlxuICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9ICdXZSBoYXZlIGFkZGVkIHlvdSB0byB0aGUgTWlublBvc3QgbWFpbGluZyBsaXN0Lic7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdwZW5kaW5nJzpcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnV2UgaGF2ZSBhZGRlZCB5b3UgdG8gdGhlIE1pbm5Qb3N0IG1haWxpbmcgbGlzdC4gWW91IHdpbGwgbmVlZCB0byBjbGljayB0aGUgY29uZmlybWF0aW9uIGxpbmsgaW4gdGhlIGVtYWlsIHdlIHNlbnQgdG8gYmVnaW4gcmVjZWl2aW5nIG1lc3NhZ2VzLic7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfSovXG4gICAgICAgICAgICAgIC8vY29uZmlybWZvcm0uZ2V0KDApLnN1Ym1pdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uZmlybWZvcm0uZ2V0KDApLnN1Ym1pdCgpO1xuICAgICAgICAgICAgLy8kKCcubS1ob2xkLW1lc3NhZ2UnKS5odG1sKCc8ZGl2IGNsYXNzPVwibS1mb3JtLW1lc3NhZ2UgbS1mb3JtLW1lc3NhZ2UtaW5mb1wiPicgKyBtZXNzYWdlICsgJzwvZGl2PicpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmZhaWwoZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIC8vIHdlIHNob3VsZCBwdXQgYW4gYWN0dWFsIGVycm9yIG1lc3NhZ2UgaGVyZSBzb21lZGF5LCBwcm9iYWJseVxuICAgICAgICAgICAgLy8kKCcubS1ob2xkLW1lc3NhZ2UnKS5odG1sKCc8ZGl2IGNsYXNzPVwibS1mb3JtLW1lc3NhZ2UgbS1mb3JtLW1lc3NhZ2UtaW5mb1wiPkFuIGVycm9yIGhhcyBvY2N1cmVkLiBQbGVhc2UgdHJ5IGFnYWluLjwvZGl2PicpO1xuICAgICAgICAgICAgY29uZmlybWZvcm0uZ2V0KDApLnN1Ym1pdCgpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0gZWxzZSB7IC8vIGVuZCBwYXJ0IHdoZXJlIHNldHRpbmdzIGNoYW5nZWRcbiAgICAgICAgICBjb25maXJtZm9ybS5nZXQoMCkuc3VibWl0KCk7XG4gICAgICAgIH1cblxuICAgICAgfSk7XG4gICAgICAvL3JldHVybiBmYWxzZTtcbiAgICB9LCAvLyBjb25maXJtTWVzc2FnZVN1Ym1pdFxuXG4gIH07IC8vIHBsdWdpbi5wcm90b3R5cGVcblxuICAvLyBBIHJlYWxseSBsaWdodHdlaWdodCBwbHVnaW4gd3JhcHBlciBhcm91bmQgdGhlIGNvbnN0cnVjdG9yLFxuICAvLyBwcmV2ZW50aW5nIGFnYWluc3QgbXVsdGlwbGUgaW5zdGFudGlhdGlvbnNcbiAgJC5mbltwbHVnaW5OYW1lXSA9IGZ1bmN0aW9uICggb3B0aW9ucyApIHtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICghJC5kYXRhKHRoaXMsICdwbHVnaW5fJyArIHBsdWdpbk5hbWUpKSB7XG4gICAgICAgICQuZGF0YSh0aGlzLCAncGx1Z2luXycgKyBwbHVnaW5OYW1lLCBuZXcgUGx1Z2luKCB0aGlzLCBvcHRpb25zICkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG59KSggalF1ZXJ5LCB3aW5kb3csIGRvY3VtZW50ICk7Il19
}(jQuery));
