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
        spamErrorContainer.append('<p class="a-form-caption a-error a-spam-email">This email address has been detected as a spammer.</p>');
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
        var supportform = $(that.options.donate_form_selector);
        console.log('this valid is ' + supportform.get(0).reportValidity()); // check validation of form

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
      $('#authorize-ach').html('<img src="https://www.minnpost.com/wp-admin/images/spinner.gif" srcset="https://www.minnpost.com/wp-admin/images/spinner.gif 1x, https://www.minnpost.com/wp-admin/images/spinner-2x.gif 2x,">');
    },
    achFields: function achFields(element, options) {
      var bankTokenFieldName = 'bankToken';
      var bankTokenField = 'input[name="' + bankTokenFieldName + '"]';
      var that = this;

      if (typeof Plaid !== 'undefined') {
        var linkHandler = Plaid.create({
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
                $(options.plaid_link).parent().after('<p class="error">' + response.error + '</p>');
              } else {
                //this.debug('print response here');
                //this.debug(response);
                // add the field(s) we need to the form for submitting
                if ($(bankTokenField).length > 0) {
                  $(bankTokenField).val(response.stripe_bank_account_token);
                } else {
                  $(options.donate_form_selector).prepend($('<input type=\"hidden\" name="' + bankTokenFieldName + '">').val(response.stripe_bank_account_token));
                }

                $(options.plaid_link, element).html('<strong>Your account was successfully authorized</strong>').contents().unwrap();
              }
            }).error(function (response) {
              $(options.plaid_link).parent().after('<p class="error">' + response.error + '</p>');
            });
          }
        });
        $(options.plaid_link, element).click(function (event) {
          event.preventDefault();
          $(options.payment_method_selector + ' .error').remove(); // remove method error message if it is there

          linkHandler.open();
        });
      }
    },
    // achFields
    buttonStatus: function buttonStatus(options, button, disabled) {
      // make the button clickable or not
      button.prop('disabled', disabled);

      if (disabled === false) {
        button.text(options.button_text);
      } else {
        button.text('Processing');
      }
    },
    // buttonStatus
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
        $('.a-card-instruction.' + which_error).text(error.message);
        $('.a-card-instruction.' + which_error).addClass('a-validation-error');
        this_selector.parent().addClass('m-has-validation-error');
        $(this_selector).addClass('a-error');
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
      $('.a-validation-error').remove();
      $('input, label, div', element).removeClass('a-error');
      $('label', element).removeClass('m-has-validation-error');
      $(options.payment_method_selector, element).removeClass('a-error invalid');
      $('.a-validation-error').remove();
      $(options.choose_payment + ' input').change(function () {
        $(options.payment_method_selector + ' .a-error').remove(); // remove method error message if it is there

        $(options.payment_method_selector).parent().find('.a-validation-error').remove(); // if a payment field changed, reset the button

        buttonStatus(options, $(options.donate_form_selector).find('button'), false);
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

      if ($('input[name="full_address"]').val() != '') {
        street = $('#full_address').val();

        if ($(this.options.billing_street_field_selector).val() != '') {
          street = $(this.options.billing_street_field_selector).val();
        }

        addressDetails.line1 = street;
      }

      var city = 'None';

      if ($(this.options.account_city_selector).val() != '') {
        city = $(this.options.account_city_selector).val();
        addressDetails.city = city;
      }

      var state = 'None';

      if ($(this.options.account_state_selector).val() != '') {
        state = $(this.options.account_state_selector).val();
        addressDetails.state = state;
      }

      var zip = 'None';

      if ($(this.options.account_zip_selector).val() != '') {
        zip = $(this.options.account_zip_selector).val();
        addressDetails.postal_code = zip;
      }

      var country = 'US';

      if ($(this.options.billing_country_field_selector).val() != '') {
        country = $(this.options.billing_country_field_selector).val();
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
      that.setStripePaymentType(type);
      that.submitFormOnly();
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

        if (stripeErrorSelector !== '') {
          this.stripeErrorDisplay(error, stripeErrorSelector, this.element, this.options);
        }

        if (error.field == 'recaptcha') {
          $(this.options.pay_button_selector).before('<p class="a-form-caption a-validation-error a-recaptcha-error">' + message + '</p>');
        }

        if (error.type == 'invalid_request_error') {
          $(this.options.pay_button_selector).before('<p class="a-form-caption a-validation-error">' + error.message + '</p>');
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0cmlwZS5wYXltZW50LmpzIiwidmFsaWQtZm9ybS5taW4uanMiLCJtaW5ucG9zdC5naXZpbmcuanMiXSwibmFtZXMiOlsiZiIsImV4cG9ydHMiLCJtb2R1bGUiLCJkZWZpbmUiLCJhbWQiLCJnIiwid2luZG93IiwiZ2xvYmFsIiwic2VsZiIsInBheW1lbnQiLCJqcyIsImUiLCJ0IiwibiIsInIiLCJzIiwibyIsInUiLCJhIiwicmVxdWlyZSIsImkiLCJFcnJvciIsImNvZGUiLCJsIiwiY2FsbCIsImxlbmd0aCIsIlFKIiwicnJldHVybiIsInJ0cmltIiwic2VsZWN0b3IiLCJpc0RPTUVsZW1lbnQiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJlbCIsIm5vZGVOYW1lIiwidHJpbSIsInRleHQiLCJyZXBsYWNlIiwidmFsIiwicmV0IiwiYXJndW1lbnRzIiwidmFsdWUiLCJwcmV2ZW50RGVmYXVsdCIsImV2ZW50T2JqZWN0IiwicmV0dXJuVmFsdWUiLCJub3JtYWxpemVFdmVudCIsIm9yaWdpbmFsIiwid2hpY2giLCJ0YXJnZXQiLCJzcmNFbGVtZW50Iiwib3JpZ2luYWxFdmVudCIsImRhdGEiLCJkZXRhaWwiLCJjaGFyQ29kZSIsImtleUNvZGUiLCJvbiIsImVsZW1lbnQiLCJldmVudE5hbWUiLCJjYWxsYmFjayIsImoiLCJsZW4iLCJsZW4xIiwibXVsdEV2ZW50TmFtZSIsIm9yaWdpbmFsQ2FsbGJhY2siLCJyZWYiLCJtYXRjaCIsInNwbGl0IiwiYWRkRXZlbnRMaXN0ZW5lciIsImF0dGFjaEV2ZW50IiwiYWRkQ2xhc3MiLCJjbGFzc05hbWUiLCJyZXN1bHRzIiwicHVzaCIsImNsYXNzTGlzdCIsImFkZCIsImhhc0NsYXNzIiwiY29udGFpbnMiLCJSZWdFeHAiLCJ0ZXN0IiwicmVtb3ZlQ2xhc3MiLCJjbHMiLCJyZW1vdmUiLCJqb2luIiwidG9nZ2xlQ2xhc3MiLCJib29sIiwiYXBwZW5kIiwidG9BcHBlbmQiLCJpbnNlcnRBZGphY2VudEhUTUwiLCJmaW5kIiwiTm9kZUxpc3QiLCJBcnJheSIsInRyaWdnZXIiLCJuYW1lIiwiZXJyb3IiLCJldiIsIkN1c3RvbUV2ZW50IiwiY3JlYXRlRXZlbnQiLCJpbml0Q3VzdG9tRXZlbnQiLCJpbml0RXZlbnQiLCJkaXNwYXRjaEV2ZW50IiwiUGF5bWVudCIsImNhcmRGcm9tTnVtYmVyIiwiY2FyZEZyb21UeXBlIiwiY2FyZHMiLCJkZWZhdWx0Rm9ybWF0IiwiZm9ybWF0QmFja0NhcmROdW1iZXIiLCJmb3JtYXRCYWNrRXhwaXJ5IiwiZm9ybWF0Q2FyZE51bWJlciIsImZvcm1hdEV4cGlyeSIsImZvcm1hdEZvcndhcmRFeHBpcnkiLCJmb3JtYXRGb3J3YXJkU2xhc2giLCJmb3JtYXRNb250aEV4cGlyeSIsImhhc1RleHRTZWxlY3RlZCIsImx1aG5DaGVjayIsInJlRm9ybWF0Q2FyZE51bWJlciIsInJlc3RyaWN0Q1ZDIiwicmVzdHJpY3RDYXJkTnVtYmVyIiwicmVzdHJpY3RDb21iaW5lZEV4cGlyeSIsInJlc3RyaWN0RXhwaXJ5IiwicmVzdHJpY3RNb250aEV4cGlyeSIsInJlc3RyaWN0TnVtZXJpYyIsInJlc3RyaWN0WWVhckV4cGlyeSIsInNldENhcmRUeXBlIiwiaW5kZXhPZiIsIml0ZW0iLCJ0eXBlIiwicGF0dGVybiIsImZvcm1hdCIsImN2Y0xlbmd0aCIsImx1aG4iLCJudW0iLCJjYXJkIiwiZGlnaXQiLCJkaWdpdHMiLCJvZGQiLCJzdW0iLCJyZXZlcnNlIiwicGFyc2VJbnQiLCJzZWxlY3Rpb25TdGFydCIsInNlbGVjdGlvbkVuZCIsInNlbGVjdGlvbiIsImNyZWF0ZVJhbmdlIiwic2V0VGltZW91dCIsIl90aGlzIiwiZm5zIiwicmUiLCJ1cHBlckxlbmd0aCIsIlN0cmluZyIsImZyb21DaGFyQ29kZSIsIm1ldGEiLCJzbGFzaCIsIm1ldGFLZXkiLCJpbnB1dCIsImN0cmxLZXkiLCJhbGxUeXBlcyIsImNhcmRUeXBlIiwiY2FyZEV4cGlyeVZhbCIsIm1vbnRoIiwicHJlZml4IiwieWVhciIsIkRhdGUiLCJnZXRGdWxsWWVhciIsInRvU3RyaW5nIiwic2xpY2UiLCJ2YWxpZGF0ZUNhcmROdW1iZXIiLCJ2YWxpZGF0ZUNhcmRFeHBpcnkiLCJjdXJyZW50VGltZSIsImV4cGlyeSIsInNldE1vbnRoIiwiZ2V0TW9udGgiLCJ2YWxpZGF0ZUNhcmRDVkMiLCJjdmMiLCJyZWYxIiwiZ3JvdXBzIiwiZXhlYyIsInNoaWZ0IiwiZm9ybWF0Q2FyZENWQyIsImZvcm1hdENhcmRFeHBpcnkiLCJmb3JtYXRDYXJkRXhwaXJ5TXVsdGlwbGUiLCJnZXRDYXJkQXJyYXkiLCJzZXRDYXJkQXJyYXkiLCJjYXJkQXJyYXkiLCJhZGRUb0NhcmRBcnJheSIsImNhcmRPYmplY3QiLCJyZW1vdmVGcm9tQ2FyZEFycmF5Iiwia2V5Iiwic3BsaWNlIiwiYyIsInAiLCJfdmFsaWRGb3JtIiwiX3ZhbGlkRm9ybTIiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0Iiwib2JqIiwiX19lc01vZHVsZSIsImRlZmF1bHQiLCJWYWxpZEZvcm0iLCJ0b2dnbGVJbnZhbGlkQ2xhc3MiLCJoYW5kbGVDdXN0b21NZXNzYWdlcyIsImhhbmRsZUN1c3RvbU1lc3NhZ2VEaXNwbGF5IiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJjbG9uZSIsImRlZmF1bHRzIiwiaW5zZXJ0QWZ0ZXIiLCJpbnNlcnRCZWZvcmUiLCJmb3JFYWNoIiwiZGVib3VuY2UiLCJjb3B5IiwiYXR0ciIsImhhc093blByb3BlcnR5IiwiZGVmYXVsdE9iamVjdCIsImsiLCJ1bmRlZmluZWQiLCJyZWZOb2RlIiwibm9kZVRvSW5zZXJ0Iiwic2libGluZyIsIm5leHRTaWJsaW5nIiwiX3BhcmVudCIsInBhcmVudE5vZGUiLCJwYXJlbnQiLCJhcHBlbmRDaGlsZCIsIml0ZW1zIiwiZm4iLCJtcyIsInRpbWVvdXQiLCJkZWJvdW5jZWRGbiIsImNsZWFyVGltZW91dCIsInZhbGlkRm9ybSIsIl91dGlsIiwiaW52YWxpZENsYXNzIiwidmFsaWRpdHkiLCJ2YWxpZCIsImVycm9yUHJvcHMiLCJnZXRDdXN0b21NZXNzYWdlIiwiY3VzdG9tTWVzc2FnZXMiLCJsb2NhbEVycm9yUHJvcHMiLCJjb25jYXQiLCJwcm9wIiwiZ2V0QXR0cmlidXRlIiwiY2hlY2tWYWxpZGl0eSIsIm1lc3NhZ2UiLCJzZXRDdXN0b21WYWxpZGl0eSIsIm9wdGlvbnMiLCJ2YWxpZGF0aW9uRXJyb3JDbGFzcyIsInZhbGlkYXRpb25FcnJvclBhcmVudENsYXNzIiwiZXJyb3JQbGFjZW1lbnQiLCJpbnNlcnRFcnJvciIsImVycm9yTm9kZSIsInF1ZXJ5U2VsZWN0b3IiLCJjcmVhdGVFbGVtZW50IiwidmFsaWRhdGlvbk1lc3NhZ2UiLCJ0ZXh0Q29udGVudCIsImRlZmF1bHRPcHRpb25zIiwiaW5wdXRzIiwidG9Mb3dlckNhc2UiLCJmb2N1c0ludmFsaWRJbnB1dCIsInZhbGlkRm9ybUlucHV0cyIsImZvcm0iLCJmb2N1c0ZpcnN0IiwiaW52YWxpZE5vZGUiLCJmb2N1cyIsIiQiLCJwbHVnaW5OYW1lIiwiUGx1Z2luIiwiZXh0ZW5kIiwiX2RlZmF1bHRzIiwiX25hbWUiLCJpbml0IiwicHJvdG90eXBlIiwicmVzZXQiLCJhbW91bnQiLCJkb2N1bWVudEVsZW1lbnQiLCJwYXJzZUZsb2F0IiwibGV2ZWxfYW1vdW50X3NlbGVjdG9yIiwib3JpZ2luYWxfYW1vdW50Iiwib3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yIiwicHJvY2Vzc2luZ19mZWUiLCJNYXRoIiwicm91bmQiLCJmZWVfYW1vdW50IiwicG93IiwidG9GaXhlZCIsInByb2Nlc3NpbmdfZmVlX3RleHQiLCJjcmVhdGVfYWNjb3VudCIsImJ1dHRvbl90ZXh0IiwicGF5X2J1dHRvbl9zZWxlY3RvciIsInN0cmlwZSIsIlN0cmlwZSIsInN0cmlwZV9wdWJsaXNoYWJsZV9rZXkiLCJlbGVtZW50cyIsImZvbnRzIiwiY3NzU3JjIiwicmVmZXJyZXIiLCJkZWJ1ZyIsImFuYWx5dGljc1RyYWNraW5nIiwiYW1vdW50QXNSYWRpbyIsImFtb3VudFVwZGF0ZWQiLCJwYXlfY2NfcHJvY2Vzc2luZ19zZWxlY3RvciIsImNyZWRpdENhcmRQcm9jZXNzaW5nRmVlcyIsImRvbmF0ZV9mb3JtX3NlbGVjdG9yIiwiZG9uYXRlQW5vbnltb3VzbHkiLCJob25vck9yTWVtb3J5VG9nZ2xlIiwib3V0c2lkZVVuaXRlZFN0YXRlcyIsInNoaXBwaW5nQWRkcmVzcyIsImFsbG93TWlubnBvc3RBY2NvdW50IiwicGF5bWVudFJlcXVlc3RCdXR0b24iLCJjaG9vc2VQYXltZW50TWV0aG9kIiwiY3JlZGl0Q2FyZEZpZWxkcyIsInZhbGlkYXRlU2V0dXAiLCJmb3JtU2V0dXAiLCJjb25maXJtX2Zvcm1fc2VsZWN0b3IiLCJzaG93TmV3c2xldHRlclNldHRpbmdzIiwiY29uZmlybU1lc3NhZ2VTdWJtaXQiLCJjb25zb2xlIiwibG9nIiwiZGlyIiwicHJvZ3Jlc3MiLCJwcm9ncmVzc19zZWxlY3RvciIsInN0ZXAiLCJuYXZfaXRlbV9jb3VudCIsIm9wcF9pZCIsIm9wcF9pZF9zZWxlY3RvciIsInBvc3RfcHVyY2hhc2UiLCJpbmRleCIsImZpbmlzaF9zZWN0aW9uX3NlbGVjdG9yIiwiYW5hbHl0aWNzVHJhY2tpbmdTdGVwIiwiaW5zdGFsbG1lbnRfcGVyaW9kIiwibGV2ZWwiLCJ0aGF0IiwiaW5zdGFsbG1lbnRfcGVyaW9kX3NlbGVjdG9yIiwiYWpheCIsIm1ldGhvZCIsInVybCIsImRvbmUiLCJjaGFyQXQiLCJ0b1VwcGVyQ2FzZSIsImdhIiwicGFnZSIsImxvY2F0aW9uIiwicGF0aG5hbWUiLCJ0aXRsZSIsImNoYW5nZSIsImlzIiwic3RyaXBlX3BheW1lbnRfdHlwZSIsImdldFN0cmlwZVBheW1lbnRUeXBlIiwiYW1vdW50X3NlbGVjdG9yX2ZhaXJfbWFya2V0Iiwic2V0RmFpck1hcmtldFZhbHVlIiwiY2FsY3VsYXRlRmVlcyIsImFkZGl0aW9uYWxfYW1vdW50X2ZpZWxkIiwiZ2V0VG90YWxBbW91bnQiLCJ0b3RhbF9hbW91bnQiLCJhZGRpdGlvbmFsX2Ftb3VudCIsImFtb3VudF9zZWxlY3RvciIsImZhaXJfbWFya2V0X3ZhbHVlX3NlbGVjdG9yIiwiZmFpck1hcmtldFZhbHVlIiwic2V0U3RyaXBlUGF5bWVudFR5cGUiLCJmZWVzIiwiY3JlZGl0Q2FyZEZlZUNoZWNrYm94IiwiZmllbGQiLCJmdWxsX2Ftb3VudCIsImZ1bGxfYW1vdW50X3NlbGVjdG9yIiwicGF5bWVudFJlcXVlc3QiLCJ1cGRhdGUiLCJ0b3RhbCIsImxhYmVsIiwidG9nZ2xlQW5vbnltb3VzIiwiYW5vbnltb3VzX3NlbGVjdG9yIiwibmFtZV9zZWxlY3RvciIsImhpZGUiLCJzaG93IiwiaG9ub3JPck1lbW9yeSIsImhvbm9yX29yX21lbW9yeV9jaG9vc2VyIiwiaG9ub3JfbWVtb3J5X2lucHV0X2dyb3VwIiwiaG9ub3JfdHlwZV9zZWxlY3RvciIsImhvbm9yX25hbWVfc2VsZWN0b3IiLCJzaG93X2JpbGxpbmdfY291bnRyeV9zZWxlY3RvciIsImNsaWNrIiwiYmlsbGluZ19jb3VudHJ5X3NlbGVjdG9yIiwic2hvd19zaGlwcGluZ19jb3VudHJ5X3NlbGVjdG9yIiwic2hpcHBpbmdfY291bnRyeV9zZWxlY3RvciIsInNob3dfc2hpcHBpbmciLCJ1c2VfZm9yX3NoaXBwaW5nX3NlbGVjdG9yIiwic2hpcHBpbmdfc2VsZWN0b3IiLCJhY2NvdW50X2V4aXN0cyIsInNob3dQYXNzd29yZCIsInNob3dQYXNzd29yZFN0cmVuZ3RoIiwic3BhbUVtYWlsIiwiZW1haWxfZmllbGRfc2VsZWN0b3IiLCJ0b2dnbGVBY2NvdW50RmllbGRzIiwiY3JlYXRlX21wX3NlbGVjdG9yIiwiZG9uZVR5cGluZyIsImVtYWlsIiwiY2hlY2tNaW5ucG9zdEFjY291bnQiLCJ0eXBpbmdUaW1lciIsImRvbmVUeXBpbmdJbnRlcnZhbCIsImtleXVwIiwiZW1haWxfZmllbGQiLCJzcGFtRXJyb3JDb250YWluZXIiLCJjcmVhdGVfYWNjb3VudF9zZWxlY3RvciIsImJlZm9yZSIsInBhc3N3b3JkX3NlbGVjdG9yIiwiJHN1Ym1pdCIsIiRjb250YWluZXIiLCIkZmllbGQiLCJzaG93X3Bhc3MiLCIkdG9nZ2xlIiwiY2hlY2tib3giLCIkYmVmb3JlIiwiYWZ0ZXIiLCJjaGVja1Bhc3N3b3JkU3RyZW5ndGgiLCIkcGFzc3dvcmQiLCIkc3RyZW5ndGhNZXRlciIsIiRzdHJlbmd0aFRleHQiLCJwYXNzd29yZCIsInJlc3VsdCIsInp4Y3ZibiIsInN0cmVuZ3RoIiwic2NvcmUiLCJodG1sIiwidXNlciIsIm1pbm5wb3N0X3Jvb3QiLCJzdGF0dXMiLCJyZWFzb24iLCJjb3VudHJ5IiwiY3VycmVuY3kiLCJwckJ1dHRvbiIsImNyZWF0ZSIsInN0eWxlIiwidGhlbWUiLCJoZWlnaHQiLCJjYW5NYWtlUGF5bWVudCIsInRoZW4iLCJtb3VudCIsImV2ZW50Iiwic3VwcG9ydGZvcm0iLCJnZXQiLCJyZXBvcnRWYWxpZGl0eSIsInRva2VuRmllbGROYW1lIiwidG9rZW5GaWVsZCIsInBheW1lbnRNZXRob2QiLCJpZCIsImZvcm1Qcm9jZXNzb3IiLCJjaG9vc2VfcGF5bWVudCIsImNoZWNrZWRfaWQiLCJjaGVja2VkX3ZhbHVlIiwic2V0dXBQYXltZW50TWV0aG9kIiwiZWxlbWVudF9pZCIsImVsZW1lbnRfdmFsdWUiLCJhY2hGaWVsZHMiLCJyZW1vdmVBY2hGaWVsZHMiLCJwYXltZW50X21ldGhvZF9zZWxlY3RvciIsImJhc2UiLCJpY29uQ29sb3IiLCJsaW5lSGVpZ2h0IiwiZm9udFdlaWdodCIsImZvbnRGYW1pbHkiLCJmb250U2l6ZSIsImludmFsaWQiLCJjb2xvciIsImNhcmROdW1iZXJFbGVtZW50Iiwic2hvd0ljb24iLCJjY19udW1fc2VsZWN0b3IiLCJjYXJkRXhwaXJ5RWxlbWVudCIsImNjX2V4cF9zZWxlY3RvciIsImNhcmRDdmNFbGVtZW50IiwiY2NfY3ZjX3NlbGVjdG9yIiwiYnJhbmQiLCJzdHJpcGVFcnJvckRpc3BsYXkiLCJidXR0b25TdGF0dXMiLCJzaG93U3Bpbm5lciIsImJhbmtUb2tlbkZpZWxkTmFtZSIsImJhbmtUb2tlbkZpZWxkIiwiUGxhaWQiLCJsaW5rSGFuZGxlciIsImNsaWVudE5hbWUiLCJlbnYiLCJwbGFpZF9lbnYiLCJwcm9kdWN0IiwidG9rZW4iLCJnZXRFbGVtZW50QnlJZCIsIm9uU3VjY2VzcyIsInB1YmxpY190b2tlbiIsIm1ldGFkYXRhIiwiSlNPTiIsInN0cmluZ2lmeSIsImFjY291bnRfaWQiLCJjb250ZW50VHlwZSIsInJlc3BvbnNlIiwicGxhaWRfbGluayIsInN0cmlwZV9iYW5rX2FjY291bnRfdG9rZW4iLCJwcmVwZW5kIiwiY29udGVudHMiLCJ1bndyYXAiLCJvcGVuIiwiYnV0dG9uIiwiZGlzYWJsZWQiLCJmb3JtcyIsImZvcm1fc2VsZWN0b3IiLCJzY3JvbGxUb0Zvcm1FcnJvciIsImZpcnN0IiwiZmlyc3RfaG9sZGVyIiwiZWxlbWVudE9mZnNldCIsIm9mZnNldCIsInRvcCIsInBhZ2VPZmZzZXQiLCJwYWdlWU9mZnNldCIsImlubmVySGVpZ2h0Iiwic2Nyb2xsVG9wIiwic3VibWl0IiwicmVzZXRGb3JtRXJyb3JzIiwiYmlsbGluZ0RldGFpbHMiLCJnZW5lcmF0ZUJpbGxpbmdEZXRhaWxzIiwiY3JlYXRlTWlublBvc3RBY2NvdW50IiwicGF5bWVudF90eXBlIiwiY3JlYXRlUGF5bWVudE1ldGhvZCIsImJhbmtUb2tlbkhhbmRsZXIiLCJzdWJtaXRGb3JtT25seSIsInRoaXNfc2VsZWN0b3IiLCJ3aGljaF9lcnJvciIsImVtcHR5IiwiZmlyc3RfbmFtZSIsImZpcnN0X25hbWVfZmllbGRfc2VsZWN0b3IiLCJsYXN0X25hbWUiLCJsYXN0X25hbWVfZmllbGRfc2VsZWN0b3IiLCJwYXNzd29yZF9maWVsZF9zZWxlY3RvciIsImNpdHkiLCJiaWxsaW5nX2NpdHlfZmllbGRfc2VsZWN0b3IiLCJzdGF0ZSIsImJpbGxpbmdfc3RhdGVfZmllbGRfc2VsZWN0b3IiLCJ6aXAiLCJiaWxsaW5nX3ppcF9maWVsZF9zZWxlY3RvciIsImFkZHJlc3NEZXRhaWxzIiwiZnVsbF9uYW1lIiwic3RyZWV0IiwiYmlsbGluZ19zdHJlZXRfZmllbGRfc2VsZWN0b3IiLCJsaW5lMSIsImFjY291bnRfY2l0eV9zZWxlY3RvciIsImFjY291bnRfc3RhdGVfc2VsZWN0b3IiLCJhY2NvdW50X3ppcF9zZWxlY3RvciIsInBvc3RhbF9jb2RlIiwiYmlsbGluZ19jb3VudHJ5X2ZpZWxkX3NlbGVjdG9yIiwiYWRkcmVzcyIsImNhcmRFbGVtZW50IiwiYmlsbGluZ19kZXRhaWxzIiwiaGFuZGxlU2VydmVyRXJyb3IiLCJhamF4X3VybCIsImZldGNoIiwiaGVhZGVycyIsImJvZHkiLCJzZXJpYWxpemUiLCJqc29uIiwiaGFuZGxlU2VydmVyUmVzcG9uc2UiLCJjYWNoZSIsImVycm9ycyIsInJlcXVpcmVzX2FjdGlvbiIsInRoaXNfZmllbGQiLCJlYWNoIiwicGFyYW0iLCJkaXNwbGF5RXJyb3JNZXNzYWdlIiwiYW5pbWF0ZSIsInN0cmlwZUVycm9yU2VsZWN0b3IiLCJmaWVsZFBhcmVudCIsInByZXYiLCJuZXdzbGV0dGVyX2dyb3VwX2h0bWwiLCJuZXdzbGV0dGVyX2dyb3VwX3NlbGVjdG9yIiwiZ2V0X2RhdGEiLCJzaG9ydGNvZGUiLCJwbGFjZW1lbnQiLCJncm91cF9maWVsZHMiLCJjYXRlZ29yeSIsIm1haWxjaGltcF9zdGF0dXMiLCJtYWlsY2hpbXBfdXNlcl9pZCIsImV4aXN0aW5nX25ld3NsZXR0ZXJfc2V0dGluZ3MiLCJjb25maXJtZm9ybSIsIm5ld3NsZXR0ZXJfZ3JvdXBzIiwibmV3X25ld3NsZXR0ZXJfc2V0dGluZ3MiLCJwb3N0X2RhdGEiLCJncm91cHNfc3VibWl0dGVkIiwiZ3JvdXBzX2F2YWlsYWJsZSIsImdyb3VwIiwiZGF0YVR5cGUiLCJzdWNjZXNzIiwiZmFpbCIsImpRdWVyeSJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLENBQUMsVUFBU0EsQ0FBVCxFQUFXO0FBQUMsTUFBRyxRQUFPQyxPQUFQLHlDQUFPQSxPQUFQLE9BQWlCLFFBQWpCLElBQTJCLE9BQU9DLE1BQVAsS0FBZ0IsV0FBOUMsRUFBMEQ7QUFBQ0EsSUFBQUEsTUFBTSxDQUFD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QTV4Q2MsR0FBbkIsQ0FuRjRDLENBaTNDekM7QUFFSDtBQUNBOztBQUNBdlAsRUFBQUEsQ0FBQyxDQUFDdkMsRUFBRixDQUFLd0MsVUFBTCxJQUFtQixVQUFXcEIsT0FBWCxFQUFxQjtBQUN0QyxXQUFPLEtBQUswVCxJQUFMLENBQVUsWUFBWTtBQUMzQixVQUFJLENBQUN2UyxDQUFDLENBQUNsTixJQUFGLENBQU8sSUFBUCxFQUFhLFlBQVltTixVQUF6QixDQUFMLEVBQTJDO0FBQ3pDRCxRQUFBQSxDQUFDLENBQUNsTixJQUFGLENBQU8sSUFBUCxFQUFhLFlBQVltTixVQUF6QixFQUFxQyxJQUFJQyxNQUFKLENBQVksSUFBWixFQUFrQnJCLE9BQWxCLENBQXJDO0FBQ0Q7QUFDRixLQUpNLENBQVA7QUFLRCxHQU5EO0FBUUQsQ0E3M0NBLEVBNjNDR3FWLE1BNzNDSCxFQTYzQ1dqa0IsTUE3M0NYLEVBNjNDbUJ5QixRQTczQ25CIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oZil7aWYodHlwZW9mIGV4cG9ydHM9PT1cIm9iamVjdFwiJiZ0eXBlb2YgbW9kdWxlIT09XCJ1bmRlZmluZWRcIil7bW9kdWxlLmV4cG9ydHM9ZigpfWVsc2UgaWYodHlwZW9mIGRlZmluZT09PVwiZnVuY3Rpb25cIiYmZGVmaW5lLmFtZCl7ZGVmaW5lKFtdLGYpfWVsc2V7dmFyIGc7aWYodHlwZW9mIHdpbmRvdyE9PVwidW5kZWZpbmVkXCIpe2c9d2luZG93fWVsc2UgaWYodHlwZW9mIGdsb2JhbCE9PVwidW5kZWZpbmVkXCIpe2c9Z2xvYmFsfWVsc2UgaWYodHlwZW9mIHNlbGYhPT1cInVuZGVmaW5lZFwiKXtnPXNlbGZ9ZWxzZXtnPXRoaXN9KGcucGF5bWVudCB8fCAoZy5wYXltZW50ID0ge30pKS5qcyA9IGYoKX19KShmdW5jdGlvbigpe3ZhciBkZWZpbmUsbW9kdWxlLGV4cG9ydHM7cmV0dXJuIChmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pKHsxOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbnZhciBRSiwgcnJldHVybiwgcnRyaW07XG5cblFKID0gZnVuY3Rpb24oc2VsZWN0b3IpIHtcbiAgaWYgKFFKLmlzRE9NRWxlbWVudChzZWxlY3RvcikpIHtcbiAgICByZXR1cm4gc2VsZWN0b3I7XG4gIH1cbiAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xufTtcblxuUUouaXNET01FbGVtZW50ID0gZnVuY3Rpb24oZWwpIHtcbiAgcmV0dXJuIGVsICYmIChlbC5ub2RlTmFtZSAhPSBudWxsKTtcbn07XG5cbnJ0cmltID0gL15bXFxzXFx1RkVGRlxceEEwXSt8W1xcc1xcdUZFRkZcXHhBMF0rJC9nO1xuXG5RSi50cmltID0gZnVuY3Rpb24odGV4dCkge1xuICBpZiAodGV4dCA9PT0gbnVsbCkge1xuICAgIHJldHVybiBcIlwiO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAodGV4dCArIFwiXCIpLnJlcGxhY2UocnRyaW0sIFwiXCIpO1xuICB9XG59O1xuXG5ycmV0dXJuID0gL1xcci9nO1xuXG5RSi52YWwgPSBmdW5jdGlvbihlbCwgdmFsKSB7XG4gIHZhciByZXQ7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgIHJldHVybiBlbC52YWx1ZSA9IHZhbDtcbiAgfSBlbHNlIHtcbiAgICByZXQgPSBlbC52YWx1ZTtcbiAgICBpZiAodHlwZW9mIHJldCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgcmV0dXJuIHJldC5yZXBsYWNlKHJyZXR1cm4sIFwiXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAocmV0ID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cblFKLnByZXZlbnREZWZhdWx0ID0gZnVuY3Rpb24oZXZlbnRPYmplY3QpIHtcbiAgaWYgKHR5cGVvZiBldmVudE9iamVjdC5wcmV2ZW50RGVmYXVsdCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgZXZlbnRPYmplY3QucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm47XG4gIH1cbiAgZXZlbnRPYmplY3QucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuUUoubm9ybWFsaXplRXZlbnQgPSBmdW5jdGlvbihlKSB7XG4gIHZhciBvcmlnaW5hbDtcbiAgb3JpZ2luYWwgPSBlO1xuICBlID0ge1xuICAgIHdoaWNoOiBvcmlnaW5hbC53aGljaCAhPSBudWxsID8gb3JpZ2luYWwud2hpY2ggOiB2b2lkIDAsXG4gICAgdGFyZ2V0OiBvcmlnaW5hbC50YXJnZXQgfHwgb3JpZ2luYWwuc3JjRWxlbWVudCxcbiAgICBwcmV2ZW50RGVmYXVsdDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gUUoucHJldmVudERlZmF1bHQob3JpZ2luYWwpO1xuICAgIH0sXG4gICAgb3JpZ2luYWxFdmVudDogb3JpZ2luYWwsXG4gICAgZGF0YTogb3JpZ2luYWwuZGF0YSB8fCBvcmlnaW5hbC5kZXRhaWxcbiAgfTtcbiAgaWYgKGUud2hpY2ggPT0gbnVsbCkge1xuICAgIGUud2hpY2ggPSBvcmlnaW5hbC5jaGFyQ29kZSAhPSBudWxsID8gb3JpZ2luYWwuY2hhckNvZGUgOiBvcmlnaW5hbC5rZXlDb2RlO1xuICB9XG4gIHJldHVybiBlO1xufTtcblxuUUoub24gPSBmdW5jdGlvbihlbGVtZW50LCBldmVudE5hbWUsIGNhbGxiYWNrKSB7XG4gIHZhciBlbCwgaSwgaiwgbGVuLCBsZW4xLCBtdWx0RXZlbnROYW1lLCBvcmlnaW5hbENhbGxiYWNrLCByZWY7XG4gIGlmIChlbGVtZW50Lmxlbmd0aCkge1xuICAgIGZvciAoaSA9IDAsIGxlbiA9IGVsZW1lbnQubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGVsID0gZWxlbWVudFtpXTtcbiAgICAgIFFKLm9uKGVsLCBldmVudE5hbWUsIGNhbGxiYWNrKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChldmVudE5hbWUubWF0Y2goXCIgXCIpKSB7XG4gICAgcmVmID0gZXZlbnROYW1lLnNwbGl0KFwiIFwiKTtcbiAgICBmb3IgKGogPSAwLCBsZW4xID0gcmVmLmxlbmd0aDsgaiA8IGxlbjE7IGorKykge1xuICAgICAgbXVsdEV2ZW50TmFtZSA9IHJlZltqXTtcbiAgICAgIFFKLm9uKGVsZW1lbnQsIG11bHRFdmVudE5hbWUsIGNhbGxiYWNrKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG4gIG9yaWdpbmFsQ2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgY2FsbGJhY2sgPSBmdW5jdGlvbihlKSB7XG4gICAgZSA9IFFKLm5vcm1hbGl6ZUV2ZW50KGUpO1xuICAgIHJldHVybiBvcmlnaW5hbENhbGxiYWNrKGUpO1xuICB9O1xuICBpZiAoZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgcmV0dXJuIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGNhbGxiYWNrLCBmYWxzZSk7XG4gIH1cbiAgaWYgKGVsZW1lbnQuYXR0YWNoRXZlbnQpIHtcbiAgICBldmVudE5hbWUgPSBcIm9uXCIgKyBldmVudE5hbWU7XG4gICAgcmV0dXJuIGVsZW1lbnQuYXR0YWNoRXZlbnQoZXZlbnROYW1lLCBjYWxsYmFjayk7XG4gIH1cbiAgZWxlbWVudFsnb24nICsgZXZlbnROYW1lXSA9IGNhbGxiYWNrO1xufTtcblxuUUouYWRkQ2xhc3MgPSBmdW5jdGlvbihlbCwgY2xhc3NOYW1lKSB7XG4gIHZhciBlO1xuICBpZiAoZWwubGVuZ3RoKSB7XG4gICAgcmV0dXJuIChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBpLCBsZW4sIHJlc3VsdHM7XG4gICAgICByZXN1bHRzID0gW107XG4gICAgICBmb3IgKGkgPSAwLCBsZW4gPSBlbC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBlID0gZWxbaV07XG4gICAgICAgIHJlc3VsdHMucHVzaChRSi5hZGRDbGFzcyhlLCBjbGFzc05hbWUpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH0pKCk7XG4gIH1cbiAgaWYgKGVsLmNsYXNzTGlzdCkge1xuICAgIHJldHVybiBlbC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGVsLmNsYXNzTmFtZSArPSAnICcgKyBjbGFzc05hbWU7XG4gIH1cbn07XG5cblFKLmhhc0NsYXNzID0gZnVuY3Rpb24oZWwsIGNsYXNzTmFtZSkge1xuICB2YXIgZSwgaGFzQ2xhc3MsIGksIGxlbjtcbiAgaWYgKGVsLmxlbmd0aCkge1xuICAgIGhhc0NsYXNzID0gdHJ1ZTtcbiAgICBmb3IgKGkgPSAwLCBsZW4gPSBlbC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgZSA9IGVsW2ldO1xuICAgICAgaGFzQ2xhc3MgPSBoYXNDbGFzcyAmJiBRSi5oYXNDbGFzcyhlLCBjbGFzc05hbWUpO1xuICAgIH1cbiAgICByZXR1cm4gaGFzQ2xhc3M7XG4gIH1cbiAgaWYgKGVsLmNsYXNzTGlzdCkge1xuICAgIHJldHVybiBlbC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV3IFJlZ0V4cCgnKF58ICknICsgY2xhc3NOYW1lICsgJyggfCQpJywgJ2dpJykudGVzdChlbC5jbGFzc05hbWUpO1xuICB9XG59O1xuXG5RSi5yZW1vdmVDbGFzcyA9IGZ1bmN0aW9uKGVsLCBjbGFzc05hbWUpIHtcbiAgdmFyIGNscywgZSwgaSwgbGVuLCByZWYsIHJlc3VsdHM7XG4gIGlmIChlbC5sZW5ndGgpIHtcbiAgICByZXR1cm4gKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGksIGxlbiwgcmVzdWx0cztcbiAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgIGZvciAoaSA9IDAsIGxlbiA9IGVsLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGUgPSBlbFtpXTtcbiAgICAgICAgcmVzdWx0cy5wdXNoKFFKLnJlbW92ZUNsYXNzKGUsIGNsYXNzTmFtZSkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfSkoKTtcbiAgfVxuICBpZiAoZWwuY2xhc3NMaXN0KSB7XG4gICAgcmVmID0gY2xhc3NOYW1lLnNwbGl0KCcgJyk7XG4gICAgcmVzdWx0cyA9IFtdO1xuICAgIGZvciAoaSA9IDAsIGxlbiA9IHJlZi5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgY2xzID0gcmVmW2ldO1xuICAgICAgcmVzdWx0cy5wdXNoKGVsLmNsYXNzTGlzdC5yZW1vdmUoY2xzKSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRzO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBlbC5jbGFzc05hbWUgPSBlbC5jbGFzc05hbWUucmVwbGFjZShuZXcgUmVnRXhwKCcoXnxcXFxcYiknICsgY2xhc3NOYW1lLnNwbGl0KCcgJykuam9pbignfCcpICsgJyhcXFxcYnwkKScsICdnaScpLCAnICcpO1xuICB9XG59O1xuXG5RSi50b2dnbGVDbGFzcyA9IGZ1bmN0aW9uKGVsLCBjbGFzc05hbWUsIGJvb2wpIHtcbiAgdmFyIGU7XG4gIGlmIChlbC5sZW5ndGgpIHtcbiAgICByZXR1cm4gKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGksIGxlbiwgcmVzdWx0cztcbiAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgIGZvciAoaSA9IDAsIGxlbiA9IGVsLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGUgPSBlbFtpXTtcbiAgICAgICAgcmVzdWx0cy5wdXNoKFFKLnRvZ2dsZUNsYXNzKGUsIGNsYXNzTmFtZSwgYm9vbCkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfSkoKTtcbiAgfVxuICBpZiAoYm9vbCkge1xuICAgIGlmICghUUouaGFzQ2xhc3MoZWwsIGNsYXNzTmFtZSkpIHtcbiAgICAgIHJldHVybiBRSi5hZGRDbGFzcyhlbCwgY2xhc3NOYW1lKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIFFKLnJlbW92ZUNsYXNzKGVsLCBjbGFzc05hbWUpO1xuICB9XG59O1xuXG5RSi5hcHBlbmQgPSBmdW5jdGlvbihlbCwgdG9BcHBlbmQpIHtcbiAgdmFyIGU7XG4gIGlmIChlbC5sZW5ndGgpIHtcbiAgICByZXR1cm4gKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGksIGxlbiwgcmVzdWx0cztcbiAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgIGZvciAoaSA9IDAsIGxlbiA9IGVsLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGUgPSBlbFtpXTtcbiAgICAgICAgcmVzdWx0cy5wdXNoKFFKLmFwcGVuZChlLCB0b0FwcGVuZCkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfSkoKTtcbiAgfVxuICByZXR1cm4gZWwuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCB0b0FwcGVuZCk7XG59O1xuXG5RSi5maW5kID0gZnVuY3Rpb24oZWwsIHNlbGVjdG9yKSB7XG4gIGlmIChlbCBpbnN0YW5jZW9mIE5vZGVMaXN0IHx8IGVsIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICBlbCA9IGVsWzBdO1xuICB9XG4gIHJldHVybiBlbC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbn07XG5cblFKLnRyaWdnZXIgPSBmdW5jdGlvbihlbCwgbmFtZSwgZGF0YSkge1xuICB2YXIgZSwgZXJyb3IsIGV2O1xuICB0cnkge1xuICAgIGV2ID0gbmV3IEN1c3RvbUV2ZW50KG5hbWUsIHtcbiAgICAgIGRldGFpbDogZGF0YVxuICAgIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGUgPSBlcnJvcjtcbiAgICBldiA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuICAgIGlmIChldi5pbml0Q3VzdG9tRXZlbnQpIHtcbiAgICAgIGV2LmluaXRDdXN0b21FdmVudChuYW1lLCB0cnVlLCB0cnVlLCBkYXRhKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXYuaW5pdEV2ZW50KG5hbWUsIHRydWUsIHRydWUsIGRhdGEpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZWwuZGlzcGF0Y2hFdmVudChldik7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFFKO1xuXG5cbn0se31dLDI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuKGZ1bmN0aW9uIChnbG9iYWwpe1xudmFyIFBheW1lbnQsIFFKLCBjYXJkRnJvbU51bWJlciwgY2FyZEZyb21UeXBlLCBjYXJkcywgZGVmYXVsdEZvcm1hdCwgZm9ybWF0QmFja0NhcmROdW1iZXIsIGZvcm1hdEJhY2tFeHBpcnksIGZvcm1hdENhcmROdW1iZXIsIGZvcm1hdEV4cGlyeSwgZm9ybWF0Rm9yd2FyZEV4cGlyeSwgZm9ybWF0Rm9yd2FyZFNsYXNoLCBmb3JtYXRNb250aEV4cGlyeSwgaGFzVGV4dFNlbGVjdGVkLCBsdWhuQ2hlY2ssIHJlRm9ybWF0Q2FyZE51bWJlciwgcmVzdHJpY3RDVkMsIHJlc3RyaWN0Q2FyZE51bWJlciwgcmVzdHJpY3RDb21iaW5lZEV4cGlyeSwgcmVzdHJpY3RFeHBpcnksIHJlc3RyaWN0TW9udGhFeHBpcnksIHJlc3RyaWN0TnVtZXJpYywgcmVzdHJpY3RZZWFyRXhwaXJ5LCBzZXRDYXJkVHlwZSxcbiAgaW5kZXhPZiA9IFtdLmluZGV4T2YgfHwgZnVuY3Rpb24oaXRlbSkgeyBmb3IgKHZhciBpID0gMCwgbCA9IHRoaXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7IGlmIChpIGluIHRoaXMgJiYgdGhpc1tpXSA9PT0gaXRlbSkgcmV0dXJuIGk7IH0gcmV0dXJuIC0xOyB9O1xuXG5RSiA9IHJlcXVpcmUoJ3FqL3NyYy9xai5jb2ZmZWUnKTtcblxuZGVmYXVsdEZvcm1hdCA9IC8oXFxkezEsNH0pL2c7XG5cbmNhcmRzID0gW1xuICB7XG4gICAgdHlwZTogJ2FtZXgnLFxuICAgIHBhdHRlcm46IC9eM1s0N10vLFxuICAgIGZvcm1hdDogLyhcXGR7MSw0fSkoXFxkezEsNn0pPyhcXGR7MSw1fSk/LyxcbiAgICBsZW5ndGg6IFsxNV0sXG4gICAgY3ZjTGVuZ3RoOiBbNF0sXG4gICAgbHVobjogdHJ1ZVxuICB9LCB7XG4gICAgdHlwZTogJ2RhbmtvcnQnLFxuICAgIHBhdHRlcm46IC9eNTAxOS8sXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGxlbmd0aDogWzE2XSxcbiAgICBjdmNMZW5ndGg6IFszXSxcbiAgICBsdWhuOiB0cnVlXG4gIH0sIHtcbiAgICB0eXBlOiAnZGluZXJzY2x1YicsXG4gICAgcGF0dGVybjogL14oMzZ8Mzh8MzBbMC01XSkvLFxuICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICBsZW5ndGg6IFsxNF0sXG4gICAgY3ZjTGVuZ3RoOiBbM10sXG4gICAgbHVobjogdHJ1ZVxuICB9LCB7XG4gICAgdHlwZTogJ2Rpc2NvdmVyJyxcbiAgICBwYXR0ZXJuOiAvXig2MDExfDY1fDY0WzQtOV18NjIyKS8sXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGxlbmd0aDogWzE2XSxcbiAgICBjdmNMZW5ndGg6IFszXSxcbiAgICBsdWhuOiB0cnVlXG4gIH0sIHtcbiAgICB0eXBlOiAnamNiJyxcbiAgICBwYXR0ZXJuOiAvXjM1LyxcbiAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgbGVuZ3RoOiBbMTZdLFxuICAgIGN2Y0xlbmd0aDogWzNdLFxuICAgIGx1aG46IHRydWVcbiAgfSwge1xuICAgIHR5cGU6ICdsYXNlcicsXG4gICAgcGF0dGVybjogL14oNjcwNnw2NzcxfDY3MDkpLyxcbiAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgbGVuZ3RoOiBbMTYsIDE3LCAxOCwgMTldLFxuICAgIGN2Y0xlbmd0aDogWzNdLFxuICAgIGx1aG46IHRydWVcbiAgfSwge1xuICAgIHR5cGU6ICdtYWVzdHJvJyxcbiAgICBwYXR0ZXJuOiAvXig1MDE4fDUwMjB8NTAzOHw2MzA0fDY3MDN8Njc1OXw2NzZbMS0zXSkvLFxuICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICBsZW5ndGg6IFsxMiwgMTMsIDE0LCAxNSwgMTYsIDE3LCAxOCwgMTldLFxuICAgIGN2Y0xlbmd0aDogWzNdLFxuICAgIGx1aG46IHRydWVcbiAgfSwge1xuICAgIHR5cGU6ICdtYXN0ZXJjYXJkJyxcbiAgICBwYXR0ZXJuOiAvXjVbMS01XS8sXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGxlbmd0aDogWzE2XSxcbiAgICBjdmNMZW5ndGg6IFszXSxcbiAgICBsdWhuOiB0cnVlXG4gIH0sIHtcbiAgICB0eXBlOiAndW5pb25wYXknLFxuICAgIHBhdHRlcm46IC9eNjIvLFxuICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICBsZW5ndGg6IFsxNiwgMTcsIDE4LCAxOV0sXG4gICAgY3ZjTGVuZ3RoOiBbM10sXG4gICAgbHVobjogZmFsc2VcbiAgfSwge1xuICAgIHR5cGU6ICd2aXNhZWxlY3Ryb24nLFxuICAgIHBhdHRlcm46IC9eNCgwMjZ8MTc1MDB8NDA1fDUwOHw4NDR8OTFbMzddKS8sXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGxlbmd0aDogWzE2XSxcbiAgICBjdmNMZW5ndGg6IFszXSxcbiAgICBsdWhuOiB0cnVlXG4gIH0sIHtcbiAgICB0eXBlOiAndmlzYScsXG4gICAgcGF0dGVybjogL140LyxcbiAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgbGVuZ3RoOiBbMTMsIDE2XSxcbiAgICBjdmNMZW5ndGg6IFszXSxcbiAgICBsdWhuOiB0cnVlXG4gIH0sIHtcbiAgICB0eXBlOiAnZWxvJyxcbiAgICBwYXR0ZXJuOiAvXjQwMTF8NDM4OTM1fDQ1KDE0MTZ8NzYpfDUwKDQxNzV8NjY5OXw2N3w5MFs0LTddKXw2Myg2Mjk3fDYzNjgpLyxcbiAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgbGVuZ3RoOiBbMTZdLFxuICAgIGN2Y0xlbmd0aDogWzNdLFxuICAgIGx1aG46IHRydWVcbiAgfVxuXTtcblxuY2FyZEZyb21OdW1iZXIgPSBmdW5jdGlvbihudW0pIHtcbiAgdmFyIGNhcmQsIGksIGxlbjtcbiAgbnVtID0gKG51bSArICcnKS5yZXBsYWNlKC9cXEQvZywgJycpO1xuICBmb3IgKGkgPSAwLCBsZW4gPSBjYXJkcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGNhcmQgPSBjYXJkc1tpXTtcbiAgICBpZiAoY2FyZC5wYXR0ZXJuLnRlc3QobnVtKSkge1xuICAgICAgcmV0dXJuIGNhcmQ7XG4gICAgfVxuICB9XG59O1xuXG5jYXJkRnJvbVR5cGUgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciBjYXJkLCBpLCBsZW47XG4gIGZvciAoaSA9IDAsIGxlbiA9IGNhcmRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgY2FyZCA9IGNhcmRzW2ldO1xuICAgIGlmIChjYXJkLnR5cGUgPT09IHR5cGUpIHtcbiAgICAgIHJldHVybiBjYXJkO1xuICAgIH1cbiAgfVxufTtcblxubHVobkNoZWNrID0gZnVuY3Rpb24obnVtKSB7XG4gIHZhciBkaWdpdCwgZGlnaXRzLCBpLCBsZW4sIG9kZCwgc3VtO1xuICBvZGQgPSB0cnVlO1xuICBzdW0gPSAwO1xuICBkaWdpdHMgPSAobnVtICsgJycpLnNwbGl0KCcnKS5yZXZlcnNlKCk7XG4gIGZvciAoaSA9IDAsIGxlbiA9IGRpZ2l0cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGRpZ2l0ID0gZGlnaXRzW2ldO1xuICAgIGRpZ2l0ID0gcGFyc2VJbnQoZGlnaXQsIDEwKTtcbiAgICBpZiAoKG9kZCA9ICFvZGQpKSB7XG4gICAgICBkaWdpdCAqPSAyO1xuICAgIH1cbiAgICBpZiAoZGlnaXQgPiA5KSB7XG4gICAgICBkaWdpdCAtPSA5O1xuICAgIH1cbiAgICBzdW0gKz0gZGlnaXQ7XG4gIH1cbiAgcmV0dXJuIHN1bSAlIDEwID09PSAwO1xufTtcblxuaGFzVGV4dFNlbGVjdGVkID0gZnVuY3Rpb24odGFyZ2V0KSB7XG4gIHZhciByZWY7XG4gIGlmICgodGFyZ2V0LnNlbGVjdGlvblN0YXJ0ICE9IG51bGwpICYmIHRhcmdldC5zZWxlY3Rpb25TdGFydCAhPT0gdGFyZ2V0LnNlbGVjdGlvbkVuZCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmICgodHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiICYmIGRvY3VtZW50ICE9PSBudWxsID8gKHJlZiA9IGRvY3VtZW50LnNlbGVjdGlvbikgIT0gbnVsbCA/IHJlZi5jcmVhdGVSYW5nZSA6IHZvaWQgMCA6IHZvaWQgMCkgIT0gbnVsbCkge1xuICAgIGlmIChkb2N1bWVudC5zZWxlY3Rpb24uY3JlYXRlUmFuZ2UoKS50ZXh0KSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxucmVGb3JtYXRDYXJkTnVtYmVyID0gZnVuY3Rpb24oZSkge1xuICByZXR1cm4gc2V0VGltZW91dCgoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgdGFyZ2V0LCB2YWx1ZTtcbiAgICAgIHRhcmdldCA9IGUudGFyZ2V0O1xuICAgICAgdmFsdWUgPSBRSi52YWwodGFyZ2V0KTtcbiAgICAgIHZhbHVlID0gUGF5bWVudC5mbnMuZm9ybWF0Q2FyZE51bWJlcih2YWx1ZSk7XG4gICAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgdmFsdWUpO1xuICAgIH07XG4gIH0pKHRoaXMpKTtcbn07XG5cbmZvcm1hdENhcmROdW1iZXIgPSBmdW5jdGlvbihlKSB7XG4gIHZhciBjYXJkLCBkaWdpdCwgbGVuZ3RoLCByZSwgdGFyZ2V0LCB1cHBlckxlbmd0aCwgdmFsdWU7XG4gIGRpZ2l0ID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKTtcbiAgaWYgKCEvXlxcZCskLy50ZXN0KGRpZ2l0KSkge1xuICAgIHJldHVybjtcbiAgfVxuICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgdmFsdWUgPSBRSi52YWwodGFyZ2V0KTtcbiAgY2FyZCA9IGNhcmRGcm9tTnVtYmVyKHZhbHVlICsgZGlnaXQpO1xuICBsZW5ndGggPSAodmFsdWUucmVwbGFjZSgvXFxEL2csICcnKSArIGRpZ2l0KS5sZW5ndGg7XG4gIHVwcGVyTGVuZ3RoID0gMTY7XG4gIGlmIChjYXJkKSB7XG4gICAgdXBwZXJMZW5ndGggPSBjYXJkLmxlbmd0aFtjYXJkLmxlbmd0aC5sZW5ndGggLSAxXTtcbiAgfVxuICBpZiAobGVuZ3RoID49IHVwcGVyTGVuZ3RoKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICgodGFyZ2V0LnNlbGVjdGlvblN0YXJ0ICE9IG51bGwpICYmIHRhcmdldC5zZWxlY3Rpb25TdGFydCAhPT0gdmFsdWUubGVuZ3RoKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChjYXJkICYmIGNhcmQudHlwZSA9PT0gJ2FtZXgnKSB7XG4gICAgcmUgPSAvXihcXGR7NH18XFxkezR9XFxzXFxkezZ9KSQvO1xuICB9IGVsc2Uge1xuICAgIHJlID0gLyg/Ol58XFxzKShcXGR7NH0pJC87XG4gIH1cbiAgaWYgKHJlLnRlc3QodmFsdWUpKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCB2YWx1ZSArICcgJyArIGRpZ2l0KTtcbiAgfSBlbHNlIGlmIChyZS50ZXN0KHZhbHVlICsgZGlnaXQpKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCB2YWx1ZSArIGRpZ2l0ICsgJyAnKTtcbiAgfVxufTtcblxuZm9ybWF0QmFja0NhcmROdW1iZXIgPSBmdW5jdGlvbihlKSB7XG4gIHZhciB0YXJnZXQsIHZhbHVlO1xuICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgdmFsdWUgPSBRSi52YWwodGFyZ2V0KTtcbiAgaWYgKGUubWV0YSkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoZS53aGljaCAhPT0gOCkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoKHRhcmdldC5zZWxlY3Rpb25TdGFydCAhPSBudWxsKSAmJiB0YXJnZXQuc2VsZWN0aW9uU3RhcnQgIT09IHZhbHVlLmxlbmd0aCkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoL1xcZFxccyQvLnRlc3QodmFsdWUpKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCB2YWx1ZS5yZXBsYWNlKC9cXGRcXHMkLywgJycpKTtcbiAgfSBlbHNlIGlmICgvXFxzXFxkPyQvLnRlc3QodmFsdWUpKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCB2YWx1ZS5yZXBsYWNlKC9cXHNcXGQ/JC8sICcnKSk7XG4gIH1cbn07XG5cbmZvcm1hdEV4cGlyeSA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIGRpZ2l0LCB0YXJnZXQsIHZhbDtcbiAgZGlnaXQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpO1xuICBpZiAoIS9eXFxkKyQvLnRlc3QoZGlnaXQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRhcmdldCA9IGUudGFyZ2V0O1xuICB2YWwgPSBRSi52YWwodGFyZ2V0KSArIGRpZ2l0O1xuICBpZiAoL15cXGQkLy50ZXN0KHZhbCkgJiYgKHZhbCAhPT0gJzAnICYmIHZhbCAhPT0gJzEnKSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgXCIwXCIgKyB2YWwgKyBcIiAvIFwiKTtcbiAgfSBlbHNlIGlmICgvXlxcZFxcZCQvLnRlc3QodmFsKSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgdmFsICsgXCIgLyBcIik7XG4gIH1cbn07XG5cbmZvcm1hdE1vbnRoRXhwaXJ5ID0gZnVuY3Rpb24oZSkge1xuICB2YXIgZGlnaXQsIHRhcmdldCwgdmFsO1xuICBkaWdpdCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZS53aGljaCk7XG4gIGlmICghL15cXGQrJC8udGVzdChkaWdpdCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gIHZhbCA9IFFKLnZhbCh0YXJnZXQpICsgZGlnaXQ7XG4gIGlmICgvXlxcZCQvLnRlc3QodmFsKSAmJiAodmFsICE9PSAnMCcgJiYgdmFsICE9PSAnMScpKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCBcIjBcIiArIHZhbCk7XG4gIH0gZWxzZSBpZiAoL15cXGRcXGQkLy50ZXN0KHZhbCkpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIFwiXCIgKyB2YWwpO1xuICB9XG59O1xuXG5mb3JtYXRGb3J3YXJkRXhwaXJ5ID0gZnVuY3Rpb24oZSkge1xuICB2YXIgZGlnaXQsIHRhcmdldCwgdmFsO1xuICBkaWdpdCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZS53aGljaCk7XG4gIGlmICghL15cXGQrJC8udGVzdChkaWdpdCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gIHZhbCA9IFFKLnZhbCh0YXJnZXQpO1xuICBpZiAoL15cXGRcXGQkLy50ZXN0KHZhbCkpIHtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgdmFsICsgXCIgLyBcIik7XG4gIH1cbn07XG5cbmZvcm1hdEZvcndhcmRTbGFzaCA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIHNsYXNoLCB0YXJnZXQsIHZhbDtcbiAgc2xhc2ggPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpO1xuICBpZiAoc2xhc2ggIT09ICcvJykge1xuICAgIHJldHVybjtcbiAgfVxuICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgdmFsID0gUUoudmFsKHRhcmdldCk7XG4gIGlmICgvXlxcZCQvLnRlc3QodmFsKSAmJiB2YWwgIT09ICcwJykge1xuICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCBcIjBcIiArIHZhbCArIFwiIC8gXCIpO1xuICB9XG59O1xuXG5mb3JtYXRCYWNrRXhwaXJ5ID0gZnVuY3Rpb24oZSkge1xuICB2YXIgdGFyZ2V0LCB2YWx1ZTtcbiAgaWYgKGUubWV0YUtleSkge1xuICAgIHJldHVybjtcbiAgfVxuICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgdmFsdWUgPSBRSi52YWwodGFyZ2V0KTtcbiAgaWYgKGUud2hpY2ggIT09IDgpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKCh0YXJnZXQuc2VsZWN0aW9uU3RhcnQgIT0gbnVsbCkgJiYgdGFyZ2V0LnNlbGVjdGlvblN0YXJ0ICE9PSB2YWx1ZS5sZW5ndGgpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKC9cXGQoXFxzfFxcLykrJC8udGVzdCh2YWx1ZSkpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIHZhbHVlLnJlcGxhY2UoL1xcZChcXHN8XFwvKSokLywgJycpKTtcbiAgfSBlbHNlIGlmICgvXFxzXFwvXFxzP1xcZD8kLy50ZXN0KHZhbHVlKSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgdmFsdWUucmVwbGFjZSgvXFxzXFwvXFxzP1xcZD8kLywgJycpKTtcbiAgfVxufTtcblxucmVzdHJpY3ROdW1lcmljID0gZnVuY3Rpb24oZSkge1xuICB2YXIgaW5wdXQ7XG4gIGlmIChlLm1ldGFLZXkgfHwgZS5jdHJsS2V5KSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKGUud2hpY2ggPT09IDMyKSB7XG4gICAgcmV0dXJuIGUucHJldmVudERlZmF1bHQoKTtcbiAgfVxuICBpZiAoZS53aGljaCA9PT0gMCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmIChlLndoaWNoIDwgMzMpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpbnB1dCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZS53aGljaCk7XG4gIGlmICghL1tcXGRcXHNdLy50ZXN0KGlucHV0KSkge1xuICAgIHJldHVybiBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH1cbn07XG5cbnJlc3RyaWN0Q2FyZE51bWJlciA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIGNhcmQsIGRpZ2l0LCB0YXJnZXQsIHZhbHVlO1xuICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgZGlnaXQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpO1xuICBpZiAoIS9eXFxkKyQvLnRlc3QoZGlnaXQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChoYXNUZXh0U2VsZWN0ZWQodGFyZ2V0KSkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YWx1ZSA9IChRSi52YWwodGFyZ2V0KSArIGRpZ2l0KS5yZXBsYWNlKC9cXEQvZywgJycpO1xuICBjYXJkID0gY2FyZEZyb21OdW1iZXIodmFsdWUpO1xuICBpZiAoY2FyZCkge1xuICAgIGlmICghKHZhbHVlLmxlbmd0aCA8PSBjYXJkLmxlbmd0aFtjYXJkLmxlbmd0aC5sZW5ndGggLSAxXSkpIHtcbiAgICAgIHJldHVybiBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmICghKHZhbHVlLmxlbmd0aCA8PSAxNikpIHtcbiAgICAgIHJldHVybiBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG59O1xuXG5yZXN0cmljdEV4cGlyeSA9IGZ1bmN0aW9uKGUsIGxlbmd0aCkge1xuICB2YXIgZGlnaXQsIHRhcmdldCwgdmFsdWU7XG4gIHRhcmdldCA9IGUudGFyZ2V0O1xuICBkaWdpdCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZS53aGljaCk7XG4gIGlmICghL15cXGQrJC8udGVzdChkaWdpdCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGhhc1RleHRTZWxlY3RlZCh0YXJnZXQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhbHVlID0gUUoudmFsKHRhcmdldCkgKyBkaWdpdDtcbiAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9cXEQvZywgJycpO1xuICBpZiAodmFsdWUubGVuZ3RoID4gbGVuZ3RoKSB7XG4gICAgcmV0dXJuIGUucHJldmVudERlZmF1bHQoKTtcbiAgfVxufTtcblxucmVzdHJpY3RDb21iaW5lZEV4cGlyeSA9IGZ1bmN0aW9uKGUpIHtcbiAgcmV0dXJuIHJlc3RyaWN0RXhwaXJ5KGUsIDYpO1xufTtcblxucmVzdHJpY3RNb250aEV4cGlyeSA9IGZ1bmN0aW9uKGUpIHtcbiAgcmV0dXJuIHJlc3RyaWN0RXhwaXJ5KGUsIDIpO1xufTtcblxucmVzdHJpY3RZZWFyRXhwaXJ5ID0gZnVuY3Rpb24oZSkge1xuICByZXR1cm4gcmVzdHJpY3RFeHBpcnkoZSwgNCk7XG59O1xuXG5yZXN0cmljdENWQyA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIGRpZ2l0LCB0YXJnZXQsIHZhbDtcbiAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gIGRpZ2l0ID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKTtcbiAgaWYgKCEvXlxcZCskLy50ZXN0KGRpZ2l0KSkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoaGFzVGV4dFNlbGVjdGVkKHRhcmdldCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFsID0gUUoudmFsKHRhcmdldCkgKyBkaWdpdDtcbiAgaWYgKCEodmFsLmxlbmd0aCA8PSA0KSkge1xuICAgIHJldHVybiBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH1cbn07XG5cbnNldENhcmRUeXBlID0gZnVuY3Rpb24oZSkge1xuICB2YXIgYWxsVHlwZXMsIGNhcmQsIGNhcmRUeXBlLCB0YXJnZXQsIHZhbDtcbiAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gIHZhbCA9IFFKLnZhbCh0YXJnZXQpO1xuICBjYXJkVHlwZSA9IFBheW1lbnQuZm5zLmNhcmRUeXBlKHZhbCkgfHwgJ3Vua25vd24nO1xuICBpZiAoIVFKLmhhc0NsYXNzKHRhcmdldCwgY2FyZFR5cGUpKSB7XG4gICAgYWxsVHlwZXMgPSAoZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaSwgbGVuLCByZXN1bHRzO1xuICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgZm9yIChpID0gMCwgbGVuID0gY2FyZHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgY2FyZCA9IGNhcmRzW2ldO1xuICAgICAgICByZXN1bHRzLnB1c2goY2FyZC50eXBlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH0pKCk7XG4gICAgUUoucmVtb3ZlQ2xhc3ModGFyZ2V0LCAndW5rbm93bicpO1xuICAgIFFKLnJlbW92ZUNsYXNzKHRhcmdldCwgYWxsVHlwZXMuam9pbignICcpKTtcbiAgICBRSi5hZGRDbGFzcyh0YXJnZXQsIGNhcmRUeXBlKTtcbiAgICBRSi50b2dnbGVDbGFzcyh0YXJnZXQsICdpZGVudGlmaWVkJywgY2FyZFR5cGUgIT09ICd1bmtub3duJyk7XG4gICAgcmV0dXJuIFFKLnRyaWdnZXIodGFyZ2V0LCAncGF5bWVudC5jYXJkVHlwZScsIGNhcmRUeXBlKTtcbiAgfVxufTtcblxuUGF5bWVudCA9IChmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gUGF5bWVudCgpIHt9XG5cbiAgUGF5bWVudC5mbnMgPSB7XG4gICAgY2FyZEV4cGlyeVZhbDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHZhciBtb250aCwgcHJlZml4LCByZWYsIHllYXI7XG4gICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1xccy9nLCAnJyk7XG4gICAgICByZWYgPSB2YWx1ZS5zcGxpdCgnLycsIDIpLCBtb250aCA9IHJlZlswXSwgeWVhciA9IHJlZlsxXTtcbiAgICAgIGlmICgoeWVhciAhPSBudWxsID8geWVhci5sZW5ndGggOiB2b2lkIDApID09PSAyICYmIC9eXFxkKyQvLnRlc3QoeWVhcikpIHtcbiAgICAgICAgcHJlZml4ID0gKG5ldyBEYXRlKS5nZXRGdWxsWWVhcigpO1xuICAgICAgICBwcmVmaXggPSBwcmVmaXgudG9TdHJpbmcoKS5zbGljZSgwLCAyKTtcbiAgICAgICAgeWVhciA9IHByZWZpeCArIHllYXI7XG4gICAgICB9XG4gICAgICBtb250aCA9IHBhcnNlSW50KG1vbnRoLCAxMCk7XG4gICAgICB5ZWFyID0gcGFyc2VJbnQoeWVhciwgMTApO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbW9udGg6IG1vbnRoLFxuICAgICAgICB5ZWFyOiB5ZWFyXG4gICAgICB9O1xuICAgIH0sXG4gICAgdmFsaWRhdGVDYXJkTnVtYmVyOiBmdW5jdGlvbihudW0pIHtcbiAgICAgIHZhciBjYXJkLCByZWY7XG4gICAgICBudW0gPSAobnVtICsgJycpLnJlcGxhY2UoL1xccyt8LS9nLCAnJyk7XG4gICAgICBpZiAoIS9eXFxkKyQvLnRlc3QobnVtKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBjYXJkID0gY2FyZEZyb21OdW1iZXIobnVtKTtcbiAgICAgIGlmICghY2FyZCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gKHJlZiA9IG51bS5sZW5ndGgsIGluZGV4T2YuY2FsbChjYXJkLmxlbmd0aCwgcmVmKSA+PSAwKSAmJiAoY2FyZC5sdWhuID09PSBmYWxzZSB8fCBsdWhuQ2hlY2sobnVtKSk7XG4gICAgfSxcbiAgICB2YWxpZGF0ZUNhcmRFeHBpcnk6IGZ1bmN0aW9uKG1vbnRoLCB5ZWFyKSB7XG4gICAgICB2YXIgY3VycmVudFRpbWUsIGV4cGlyeSwgcHJlZml4LCByZWY7XG4gICAgICBpZiAodHlwZW9mIG1vbnRoID09PSAnb2JqZWN0JyAmJiAnbW9udGgnIGluIG1vbnRoKSB7XG4gICAgICAgIHJlZiA9IG1vbnRoLCBtb250aCA9IHJlZi5tb250aCwgeWVhciA9IHJlZi55ZWFyO1xuICAgICAgfVxuICAgICAgaWYgKCEobW9udGggJiYgeWVhcikpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgbW9udGggPSBRSi50cmltKG1vbnRoKTtcbiAgICAgIHllYXIgPSBRSi50cmltKHllYXIpO1xuICAgICAgaWYgKCEvXlxcZCskLy50ZXN0KG1vbnRoKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoIS9eXFxkKyQvLnRlc3QoeWVhcikpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKCEocGFyc2VJbnQobW9udGgsIDEwKSA8PSAxMikpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKHllYXIubGVuZ3RoID09PSAyKSB7XG4gICAgICAgIHByZWZpeCA9IChuZXcgRGF0ZSkuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgcHJlZml4ID0gcHJlZml4LnRvU3RyaW5nKCkuc2xpY2UoMCwgMik7XG4gICAgICAgIHllYXIgPSBwcmVmaXggKyB5ZWFyO1xuICAgICAgfVxuICAgICAgZXhwaXJ5ID0gbmV3IERhdGUoeWVhciwgbW9udGgpO1xuICAgICAgY3VycmVudFRpbWUgPSBuZXcgRGF0ZTtcbiAgICAgIGV4cGlyeS5zZXRNb250aChleHBpcnkuZ2V0TW9udGgoKSAtIDEpO1xuICAgICAgZXhwaXJ5LnNldE1vbnRoKGV4cGlyeS5nZXRNb250aCgpICsgMSwgMSk7XG4gICAgICByZXR1cm4gZXhwaXJ5ID4gY3VycmVudFRpbWU7XG4gICAgfSxcbiAgICB2YWxpZGF0ZUNhcmRDVkM6IGZ1bmN0aW9uKGN2YywgdHlwZSkge1xuICAgICAgdmFyIHJlZiwgcmVmMTtcbiAgICAgIGN2YyA9IFFKLnRyaW0oY3ZjKTtcbiAgICAgIGlmICghL15cXGQrJC8udGVzdChjdmMpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlICYmIGNhcmRGcm9tVHlwZSh0eXBlKSkge1xuICAgICAgICByZXR1cm4gcmVmID0gY3ZjLmxlbmd0aCwgaW5kZXhPZi5jYWxsKChyZWYxID0gY2FyZEZyb21UeXBlKHR5cGUpKSAhPSBudWxsID8gcmVmMS5jdmNMZW5ndGggOiB2b2lkIDAsIHJlZikgPj0gMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBjdmMubGVuZ3RoID49IDMgJiYgY3ZjLmxlbmd0aCA8PSA0O1xuICAgICAgfVxuICAgIH0sXG4gICAgY2FyZFR5cGU6IGZ1bmN0aW9uKG51bSkge1xuICAgICAgdmFyIHJlZjtcbiAgICAgIGlmICghbnVtKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgcmV0dXJuICgocmVmID0gY2FyZEZyb21OdW1iZXIobnVtKSkgIT0gbnVsbCA/IHJlZi50eXBlIDogdm9pZCAwKSB8fCBudWxsO1xuICAgIH0sXG4gICAgZm9ybWF0Q2FyZE51bWJlcjogZnVuY3Rpb24obnVtKSB7XG4gICAgICB2YXIgY2FyZCwgZ3JvdXBzLCByZWYsIHVwcGVyTGVuZ3RoO1xuICAgICAgY2FyZCA9IGNhcmRGcm9tTnVtYmVyKG51bSk7XG4gICAgICBpZiAoIWNhcmQpIHtcbiAgICAgICAgcmV0dXJuIG51bTtcbiAgICAgIH1cbiAgICAgIHVwcGVyTGVuZ3RoID0gY2FyZC5sZW5ndGhbY2FyZC5sZW5ndGgubGVuZ3RoIC0gMV07XG4gICAgICBudW0gPSBudW0ucmVwbGFjZSgvXFxEL2csICcnKTtcbiAgICAgIG51bSA9IG51bS5zbGljZSgwLCArdXBwZXJMZW5ndGggKyAxIHx8IDllOSk7XG4gICAgICBpZiAoY2FyZC5mb3JtYXQuZ2xvYmFsKSB7XG4gICAgICAgIHJldHVybiAocmVmID0gbnVtLm1hdGNoKGNhcmQuZm9ybWF0KSkgIT0gbnVsbCA/IHJlZi5qb2luKCcgJykgOiB2b2lkIDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBncm91cHMgPSBjYXJkLmZvcm1hdC5leGVjKG51bSk7XG4gICAgICAgIGlmIChncm91cHMgIT0gbnVsbCkge1xuICAgICAgICAgIGdyb3Vwcy5zaGlmdCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBncm91cHMgIT0gbnVsbCA/IGdyb3Vwcy5qb2luKCcgJykgOiB2b2lkIDA7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIFBheW1lbnQucmVzdHJpY3ROdW1lcmljID0gZnVuY3Rpb24oZWwpIHtcbiAgICByZXR1cm4gUUoub24oZWwsICdrZXlwcmVzcycsIHJlc3RyaWN0TnVtZXJpYyk7XG4gIH07XG5cbiAgUGF5bWVudC5jYXJkRXhwaXJ5VmFsID0gZnVuY3Rpb24oZWwpIHtcbiAgICByZXR1cm4gUGF5bWVudC5mbnMuY2FyZEV4cGlyeVZhbChRSi52YWwoZWwpKTtcbiAgfTtcblxuICBQYXltZW50LmZvcm1hdENhcmRDVkMgPSBmdW5jdGlvbihlbCkge1xuICAgIFBheW1lbnQucmVzdHJpY3ROdW1lcmljKGVsKTtcbiAgICBRSi5vbihlbCwgJ2tleXByZXNzJywgcmVzdHJpY3RDVkMpO1xuICAgIHJldHVybiBlbDtcbiAgfTtcblxuICBQYXltZW50LmZvcm1hdENhcmRFeHBpcnkgPSBmdW5jdGlvbihlbCkge1xuICAgIHZhciBtb250aCwgeWVhcjtcbiAgICBQYXltZW50LnJlc3RyaWN0TnVtZXJpYyhlbCk7XG4gICAgaWYgKGVsLmxlbmd0aCAmJiBlbC5sZW5ndGggPT09IDIpIHtcbiAgICAgIG1vbnRoID0gZWxbMF0sIHllYXIgPSBlbFsxXTtcbiAgICAgIHRoaXMuZm9ybWF0Q2FyZEV4cGlyeU11bHRpcGxlKG1vbnRoLCB5ZWFyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgUUoub24oZWwsICdrZXlwcmVzcycsIHJlc3RyaWN0Q29tYmluZWRFeHBpcnkpO1xuICAgICAgUUoub24oZWwsICdrZXlwcmVzcycsIGZvcm1hdEV4cGlyeSk7XG4gICAgICBRSi5vbihlbCwgJ2tleXByZXNzJywgZm9ybWF0Rm9yd2FyZFNsYXNoKTtcbiAgICAgIFFKLm9uKGVsLCAna2V5cHJlc3MnLCBmb3JtYXRGb3J3YXJkRXhwaXJ5KTtcbiAgICAgIFFKLm9uKGVsLCAna2V5ZG93bicsIGZvcm1hdEJhY2tFeHBpcnkpO1xuICAgIH1cbiAgICByZXR1cm4gZWw7XG4gIH07XG5cbiAgUGF5bWVudC5mb3JtYXRDYXJkRXhwaXJ5TXVsdGlwbGUgPSBmdW5jdGlvbihtb250aCwgeWVhcikge1xuICAgIFFKLm9uKG1vbnRoLCAna2V5cHJlc3MnLCByZXN0cmljdE1vbnRoRXhwaXJ5KTtcbiAgICBRSi5vbihtb250aCwgJ2tleXByZXNzJywgZm9ybWF0TW9udGhFeHBpcnkpO1xuICAgIHJldHVybiBRSi5vbih5ZWFyLCAna2V5cHJlc3MnLCByZXN0cmljdFllYXJFeHBpcnkpO1xuICB9O1xuXG4gIFBheW1lbnQuZm9ybWF0Q2FyZE51bWJlciA9IGZ1bmN0aW9uKGVsKSB7XG4gICAgUGF5bWVudC5yZXN0cmljdE51bWVyaWMoZWwpO1xuICAgIFFKLm9uKGVsLCAna2V5cHJlc3MnLCByZXN0cmljdENhcmROdW1iZXIpO1xuICAgIFFKLm9uKGVsLCAna2V5cHJlc3MnLCBmb3JtYXRDYXJkTnVtYmVyKTtcbiAgICBRSi5vbihlbCwgJ2tleWRvd24nLCBmb3JtYXRCYWNrQ2FyZE51bWJlcik7XG4gICAgUUoub24oZWwsICdrZXl1cCcsIHNldENhcmRUeXBlKTtcbiAgICBRSi5vbihlbCwgJ3Bhc3RlJywgcmVGb3JtYXRDYXJkTnVtYmVyKTtcbiAgICByZXR1cm4gZWw7XG4gIH07XG5cbiAgUGF5bWVudC5nZXRDYXJkQXJyYXkgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gY2FyZHM7XG4gIH07XG5cbiAgUGF5bWVudC5zZXRDYXJkQXJyYXkgPSBmdW5jdGlvbihjYXJkQXJyYXkpIHtcbiAgICBjYXJkcyA9IGNhcmRBcnJheTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICBQYXltZW50LmFkZFRvQ2FyZEFycmF5ID0gZnVuY3Rpb24oY2FyZE9iamVjdCkge1xuICAgIHJldHVybiBjYXJkcy5wdXNoKGNhcmRPYmplY3QpO1xuICB9O1xuXG4gIFBheW1lbnQucmVtb3ZlRnJvbUNhcmRBcnJheSA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgICB2YXIga2V5LCB2YWx1ZTtcbiAgICBmb3IgKGtleSBpbiBjYXJkcykge1xuICAgICAgdmFsdWUgPSBjYXJkc1trZXldO1xuICAgICAgaWYgKHZhbHVlLnR5cGUgPT09IHR5cGUpIHtcbiAgICAgICAgY2FyZHMuc3BsaWNlKGtleSwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIHJldHVybiBQYXltZW50O1xuXG59KSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBheW1lbnQ7XG5cbmdsb2JhbC5QYXltZW50ID0gUGF5bWVudDtcblxuXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbn0se1wicWovc3JjL3FqLmNvZmZlZVwiOjF9XX0se30sWzJdKSgyKVxufSk7IiwiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSh7MTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XCJ1c2Ugc3RyaWN0XCI7dmFyIF92YWxpZEZvcm09cmVxdWlyZShcIi4vc3JjL3ZhbGlkLWZvcm1cIik7dmFyIF92YWxpZEZvcm0yPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3ZhbGlkRm9ybSk7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmope3JldHVybiBvYmomJm9iai5fX2VzTW9kdWxlP29iajp7ZGVmYXVsdDpvYmp9fXdpbmRvdy5WYWxpZEZvcm09X3ZhbGlkRm9ybTIuZGVmYXVsdDt3aW5kb3cuVmFsaWRGb3JtLnRvZ2dsZUludmFsaWRDbGFzcz1fdmFsaWRGb3JtLnRvZ2dsZUludmFsaWRDbGFzczt3aW5kb3cuVmFsaWRGb3JtLmhhbmRsZUN1c3RvbU1lc3NhZ2VzPV92YWxpZEZvcm0uaGFuZGxlQ3VzdG9tTWVzc2FnZXM7d2luZG93LlZhbGlkRm9ybS5oYW5kbGVDdXN0b21NZXNzYWdlRGlzcGxheT1fdmFsaWRGb3JtLmhhbmRsZUN1c3RvbU1lc3NhZ2VEaXNwbGF5fSx7XCIuL3NyYy92YWxpZC1mb3JtXCI6M31dLDI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1widXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTp0cnVlfSk7ZXhwb3J0cy5jbG9uZT1jbG9uZTtleHBvcnRzLmRlZmF1bHRzPWRlZmF1bHRzO2V4cG9ydHMuaW5zZXJ0QWZ0ZXI9aW5zZXJ0QWZ0ZXI7ZXhwb3J0cy5pbnNlcnRCZWZvcmU9aW5zZXJ0QmVmb3JlO2V4cG9ydHMuZm9yRWFjaD1mb3JFYWNoO2V4cG9ydHMuZGVib3VuY2U9ZGVib3VuY2U7ZnVuY3Rpb24gY2xvbmUob2JqKXt2YXIgY29weT17fTtmb3IodmFyIGF0dHIgaW4gb2JqKXtpZihvYmouaGFzT3duUHJvcGVydHkoYXR0cikpY29weVthdHRyXT1vYmpbYXR0cl19cmV0dXJuIGNvcHl9ZnVuY3Rpb24gZGVmYXVsdHMob2JqLGRlZmF1bHRPYmplY3Qpe29iaj1jbG9uZShvYmp8fHt9KTtmb3IodmFyIGsgaW4gZGVmYXVsdE9iamVjdCl7aWYob2JqW2tdPT09dW5kZWZpbmVkKW9ialtrXT1kZWZhdWx0T2JqZWN0W2tdfXJldHVybiBvYmp9ZnVuY3Rpb24gaW5zZXJ0QWZ0ZXIocmVmTm9kZSxub2RlVG9JbnNlcnQpe3ZhciBzaWJsaW5nPXJlZk5vZGUubmV4dFNpYmxpbmc7aWYoc2libGluZyl7dmFyIF9wYXJlbnQ9cmVmTm9kZS5wYXJlbnROb2RlO19wYXJlbnQuaW5zZXJ0QmVmb3JlKG5vZGVUb0luc2VydCxzaWJsaW5nKX1lbHNle3BhcmVudC5hcHBlbmRDaGlsZChub2RlVG9JbnNlcnQpfX1mdW5jdGlvbiBpbnNlcnRCZWZvcmUocmVmTm9kZSxub2RlVG9JbnNlcnQpe3ZhciBwYXJlbnQ9cmVmTm9kZS5wYXJlbnROb2RlO3BhcmVudC5pbnNlcnRCZWZvcmUobm9kZVRvSW5zZXJ0LHJlZk5vZGUpfWZ1bmN0aW9uIGZvckVhY2goaXRlbXMsZm4pe2lmKCFpdGVtcylyZXR1cm47aWYoaXRlbXMuZm9yRWFjaCl7aXRlbXMuZm9yRWFjaChmbil9ZWxzZXtmb3IodmFyIGk9MDtpPGl0ZW1zLmxlbmd0aDtpKyspe2ZuKGl0ZW1zW2ldLGksaXRlbXMpfX19ZnVuY3Rpb24gZGVib3VuY2UobXMsZm4pe3ZhciB0aW1lb3V0PXZvaWQgMDt2YXIgZGVib3VuY2VkRm49ZnVuY3Rpb24gZGVib3VuY2VkRm4oKXtjbGVhclRpbWVvdXQodGltZW91dCk7dGltZW91dD1zZXRUaW1lb3V0KGZuLG1zKX07cmV0dXJuIGRlYm91bmNlZEZufX0se31dLDM6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1widXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTp0cnVlfSk7ZXhwb3J0cy50b2dnbGVJbnZhbGlkQ2xhc3M9dG9nZ2xlSW52YWxpZENsYXNzO2V4cG9ydHMuaGFuZGxlQ3VzdG9tTWVzc2FnZXM9aGFuZGxlQ3VzdG9tTWVzc2FnZXM7ZXhwb3J0cy5oYW5kbGVDdXN0b21NZXNzYWdlRGlzcGxheT1oYW5kbGVDdXN0b21NZXNzYWdlRGlzcGxheTtleHBvcnRzLmRlZmF1bHQ9dmFsaWRGb3JtO3ZhciBfdXRpbD1yZXF1aXJlKFwiLi91dGlsXCIpO2Z1bmN0aW9uIHRvZ2dsZUludmFsaWRDbGFzcyhpbnB1dCxpbnZhbGlkQ2xhc3Mpe2lucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnZhbGlkXCIsZnVuY3Rpb24oKXtpbnB1dC5jbGFzc0xpc3QuYWRkKGludmFsaWRDbGFzcyl9KTtpbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIixmdW5jdGlvbigpe2lmKGlucHV0LnZhbGlkaXR5LnZhbGlkKXtpbnB1dC5jbGFzc0xpc3QucmVtb3ZlKGludmFsaWRDbGFzcyl9fSl9dmFyIGVycm9yUHJvcHM9W1wiYmFkSW5wdXRcIixcInBhdHRlcm5NaXNtYXRjaFwiLFwicmFuZ2VPdmVyZmxvd1wiLFwicmFuZ2VVbmRlcmZsb3dcIixcInN0ZXBNaXNtYXRjaFwiLFwidG9vTG9uZ1wiLFwidG9vU2hvcnRcIixcInR5cGVNaXNtYXRjaFwiLFwidmFsdWVNaXNzaW5nXCIsXCJjdXN0b21FcnJvclwiXTtmdW5jdGlvbiBnZXRDdXN0b21NZXNzYWdlKGlucHV0LGN1c3RvbU1lc3NhZ2VzKXtjdXN0b21NZXNzYWdlcz1jdXN0b21NZXNzYWdlc3x8e307dmFyIGxvY2FsRXJyb3JQcm9wcz1baW5wdXQudHlwZStcIk1pc21hdGNoXCJdLmNvbmNhdChlcnJvclByb3BzKTt2YXIgdmFsaWRpdHk9aW5wdXQudmFsaWRpdHk7Zm9yKHZhciBpPTA7aTxsb2NhbEVycm9yUHJvcHMubGVuZ3RoO2krKyl7dmFyIHByb3A9bG9jYWxFcnJvclByb3BzW2ldO2lmKHZhbGlkaXR5W3Byb3BdKXtyZXR1cm4gaW5wdXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1cIitwcm9wKXx8Y3VzdG9tTWVzc2FnZXNbcHJvcF19fX1mdW5jdGlvbiBoYW5kbGVDdXN0b21NZXNzYWdlcyhpbnB1dCxjdXN0b21NZXNzYWdlcyl7ZnVuY3Rpb24gY2hlY2tWYWxpZGl0eSgpe3ZhciBtZXNzYWdlPWlucHV0LnZhbGlkaXR5LnZhbGlkP251bGw6Z2V0Q3VzdG9tTWVzc2FnZShpbnB1dCxjdXN0b21NZXNzYWdlcyk7aW5wdXQuc2V0Q3VzdG9tVmFsaWRpdHkobWVzc2FnZXx8XCJcIil9aW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsY2hlY2tWYWxpZGl0eSk7aW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImludmFsaWRcIixjaGVja1ZhbGlkaXR5KX1mdW5jdGlvbiBoYW5kbGVDdXN0b21NZXNzYWdlRGlzcGxheShpbnB1dCxvcHRpb25zKXt2YXIgdmFsaWRhdGlvbkVycm9yQ2xhc3M9b3B0aW9ucy52YWxpZGF0aW9uRXJyb3JDbGFzcyx2YWxpZGF0aW9uRXJyb3JQYXJlbnRDbGFzcz1vcHRpb25zLnZhbGlkYXRpb25FcnJvclBhcmVudENsYXNzLGVycm9yUGxhY2VtZW50PW9wdGlvbnMuZXJyb3JQbGFjZW1lbnQ7ZnVuY3Rpb24gY2hlY2tWYWxpZGl0eShvcHRpb25zKXt2YXIgaW5zZXJ0RXJyb3I9b3B0aW9ucy5pbnNlcnRFcnJvcjt2YXIgcGFyZW50Tm9kZT1pbnB1dC5wYXJlbnROb2RlO3ZhciBlcnJvck5vZGU9cGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKFwiLlwiK3ZhbGlkYXRpb25FcnJvckNsYXNzKXx8ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtpZighaW5wdXQudmFsaWRpdHkudmFsaWQmJmlucHV0LnZhbGlkYXRpb25NZXNzYWdlKXtlcnJvck5vZGUuY2xhc3NOYW1lPXZhbGlkYXRpb25FcnJvckNsYXNzO2Vycm9yTm9kZS50ZXh0Q29udGVudD1pbnB1dC52YWxpZGF0aW9uTWVzc2FnZTtpZihpbnNlcnRFcnJvcil7ZXJyb3JQbGFjZW1lbnQ9PT1cImJlZm9yZVwiPygwLF91dGlsLmluc2VydEJlZm9yZSkoaW5wdXQsZXJyb3JOb2RlKTooMCxfdXRpbC5pbnNlcnRBZnRlcikoaW5wdXQsZXJyb3JOb2RlKTtwYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQodmFsaWRhdGlvbkVycm9yUGFyZW50Q2xhc3MpfX1lbHNle3BhcmVudE5vZGUuY2xhc3NMaXN0LnJlbW92ZSh2YWxpZGF0aW9uRXJyb3JQYXJlbnRDbGFzcyk7ZXJyb3JOb2RlLnJlbW92ZSgpfX1pbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIixmdW5jdGlvbigpe2NoZWNrVmFsaWRpdHkoe2luc2VydEVycm9yOmZhbHNlfSl9KTtpbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiaW52YWxpZFwiLGZ1bmN0aW9uKGUpe2UucHJldmVudERlZmF1bHQoKTtjaGVja1ZhbGlkaXR5KHtpbnNlcnRFcnJvcjp0cnVlfSl9KX12YXIgZGVmYXVsdE9wdGlvbnM9e2ludmFsaWRDbGFzczpcImludmFsaWRcIix2YWxpZGF0aW9uRXJyb3JDbGFzczpcInZhbGlkYXRpb24tZXJyb3JcIix2YWxpZGF0aW9uRXJyb3JQYXJlbnRDbGFzczpcImhhcy12YWxpZGF0aW9uLWVycm9yXCIsY3VzdG9tTWVzc2FnZXM6e30sZXJyb3JQbGFjZW1lbnQ6XCJiZWZvcmVcIn07ZnVuY3Rpb24gdmFsaWRGb3JtKGVsZW1lbnQsb3B0aW9ucyl7aWYoIWVsZW1lbnR8fCFlbGVtZW50Lm5vZGVOYW1lKXt0aHJvdyBuZXcgRXJyb3IoXCJGaXJzdCBhcmcgdG8gdmFsaWRGb3JtIG11c3QgYmUgYSBmb3JtLCBpbnB1dCwgc2VsZWN0LCBvciB0ZXh0YXJlYVwiKX12YXIgaW5wdXRzPXZvaWQgMDt2YXIgdHlwZT1lbGVtZW50Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7b3B0aW9ucz0oMCxfdXRpbC5kZWZhdWx0cykob3B0aW9ucyxkZWZhdWx0T3B0aW9ucyk7aWYodHlwZT09PVwiZm9ybVwiKXtpbnB1dHM9ZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXQsIHNlbGVjdCwgdGV4dGFyZWFcIik7Zm9jdXNJbnZhbGlkSW5wdXQoZWxlbWVudCxpbnB1dHMpfWVsc2UgaWYodHlwZT09PVwiaW5wdXRcInx8dHlwZT09PVwic2VsZWN0XCJ8fHR5cGU9PT1cInRleHRhcmVhXCIpe2lucHV0cz1bZWxlbWVudF19ZWxzZXt0aHJvdyBuZXcgRXJyb3IoXCJPbmx5IGZvcm0sIGlucHV0LCBzZWxlY3QsIG9yIHRleHRhcmVhIGVsZW1lbnRzIGFyZSBzdXBwb3J0ZWRcIil9dmFsaWRGb3JtSW5wdXRzKGlucHV0cyxvcHRpb25zKX1mdW5jdGlvbiBmb2N1c0ludmFsaWRJbnB1dChmb3JtLGlucHV0cyl7dmFyIGZvY3VzRmlyc3Q9KDAsX3V0aWwuZGVib3VuY2UpKDEwMCxmdW5jdGlvbigpe3ZhciBpbnZhbGlkTm9kZT1mb3JtLnF1ZXJ5U2VsZWN0b3IoXCI6aW52YWxpZFwiKTtpZihpbnZhbGlkTm9kZSlpbnZhbGlkTm9kZS5mb2N1cygpfSk7KDAsX3V0aWwuZm9yRWFjaCkoaW5wdXRzLGZ1bmN0aW9uKGlucHV0KXtyZXR1cm4gaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImludmFsaWRcIixmb2N1c0ZpcnN0KX0pfWZ1bmN0aW9uIHZhbGlkRm9ybUlucHV0cyhpbnB1dHMsb3B0aW9ucyl7dmFyIGludmFsaWRDbGFzcz1vcHRpb25zLmludmFsaWRDbGFzcyxjdXN0b21NZXNzYWdlcz1vcHRpb25zLmN1c3RvbU1lc3NhZ2VzOygwLF91dGlsLmZvckVhY2gpKGlucHV0cyxmdW5jdGlvbihpbnB1dCl7dG9nZ2xlSW52YWxpZENsYXNzKGlucHV0LGludmFsaWRDbGFzcyk7aGFuZGxlQ3VzdG9tTWVzc2FnZXMoaW5wdXQsY3VzdG9tTWVzc2FnZXMpO2hhbmRsZUN1c3RvbU1lc3NhZ2VEaXNwbGF5KGlucHV0LG9wdGlvbnMpfSl9fSx7XCIuL3V0aWxcIjoyfV19LHt9LFsxXSk7IiwiLy8gTWlublBvc3QgR2l2aW5nIHBsdWdpblxuLy8gdGhlIHNlbWktY29sb24gYmVmb3JlIGZ1bmN0aW9uIGludm9jYXRpb24gaXMgYSBzYWZldHkgbmV0IGFnYWluc3QgY29uY2F0ZW5hdGVkXG4vLyBzY3JpcHRzIGFuZC9vciBvdGhlciBwbHVnaW5zIHdoaWNoIG1heSBub3QgYmUgY2xvc2VkIHByb3Blcmx5LlxuOyhmdW5jdGlvbiAoICQsIHdpbmRvdywgZG9jdW1lbnQsIHVuZGVmaW5lZCApIHtcblxuICAvLyB1bmRlZmluZWQgaXMgdXNlZCBoZXJlIGFzIHRoZSB1bmRlZmluZWQgZ2xvYmFsIHZhcmlhYmxlIGluIEVDTUFTY3JpcHQgMyBpc1xuICAvLyBtdXRhYmxlIChpZS4gaXQgY2FuIGJlIGNoYW5nZWQgYnkgc29tZW9uZSBlbHNlKS4gdW5kZWZpbmVkIGlzbid0IHJlYWxseSBiZWluZ1xuICAvLyBwYXNzZWQgaW4gc28gd2UgY2FuIGVuc3VyZSB0aGUgdmFsdWUgb2YgaXQgaXMgdHJ1bHkgdW5kZWZpbmVkLiBJbiBFUzUsIHVuZGVmaW5lZFxuICAvLyBjYW4gbm8gbG9uZ2VyIGJlIG1vZGlmaWVkLlxuXG4gIC8vIHdpbmRvdyBhbmQgZG9jdW1lbnQgYXJlIHBhc3NlZCB0aHJvdWdoIGFzIGxvY2FsIHZhcmlhYmxlIHJhdGhlciB0aGFuIGdsb2JhbFxuICAvLyBhcyB0aGlzIChzbGlnaHRseSkgcXVpY2tlbnMgdGhlIHJlc29sdXRpb24gcHJvY2VzcyBhbmQgY2FuIGJlIG1vcmUgZWZmaWNpZW50bHlcbiAgLy8gbWluaWZpZWQgKGVzcGVjaWFsbHkgd2hlbiBib3RoIGFyZSByZWd1bGFybHkgcmVmZXJlbmNlZCBpbiB5b3VyIHBsdWdpbikuXG5cbiAgLy8gQ3JlYXRlIHRoZSBkZWZhdWx0cyBvbmNlXG4gIHZhciBwbHVnaW5OYW1lID0gJ21pbm5wb3N0X2dpdmluZycsXG4gIGRlZmF1bHRzID0ge1xuICAgICdkZWJ1ZycgOiBmYWxzZSwgLy8gdGhpcyBjYW4gYmUgc2V0IHRvIHRydWUgb24gcGFnZSBsZXZlbCBvcHRpb25zXG4gICAgJ3N0cmlwZV9wdWJsaXNoYWJsZV9rZXknIDogJycsXG4gICAgJ3BsYWlkX2VudicgOiAnJyxcbiAgICAncGxhaWRfbGluaycgOiAnI2F1dGhvcml6ZS1hY2gnLFxuICAgICdtaW5ucG9zdF9yb290JyA6ICdodHRwczovL3d3dy5taW5ucG9zdC5jb20nLFxuICAgICdwcm9ncmVzc19zZWxlY3RvcicgOiAnLm0tc3VwcG9ydC1wcm9ncmVzcycsXG4gICAgJ2Zvcm1fc2VsZWN0b3InIDogJy5tLWZvcm0nLFxuICAgICdkb25hdGVfZm9ybV9zZWxlY3Rvcic6ICcjZG9uYXRlJyxcbiAgICAnY29uZmlybV9mb3JtX3NlbGVjdG9yJyA6ICcjY29uZmlybScsXG4gICAgJ2ZpbmlzaF9zZWN0aW9uX3NlbGVjdG9yJyA6ICcjcGFuZWwtLWNvbmZpcm1hdGlvbicsXG4gICAgJ3BheV9jY19wcm9jZXNzaW5nX3NlbGVjdG9yJyA6ICdpbnB1dFtuYW1lPVwicGF5X2ZlZXNcIl0nLFxuICAgICdmZWVfYW1vdW50JyA6ICcucHJvY2Vzc2luZy1hbW91bnQnLFxuICAgICdsZXZlbF9hbW91bnRfc2VsZWN0b3InIDogJyNwYW5lbC0tcGF5IC5hbW91bnQgLmxldmVsLWFtb3VudCcsIC8vIHdlIGNhbiBtYXliZSBnZXQgcmlkIG9mIHRoaXNcbiAgICAnb3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yJyA6ICdbbmFtZT1cImFtb3VudFwiXScsXG4gICAgJ2ZhaXJfbWFya2V0X3ZhbHVlX3NlbGVjdG9yJyA6ICcjZmFpcl9tYXJrZXRfdmFsdWUnLFxuICAgICdmdWxsX2Ftb3VudF9zZWxlY3RvcicgOiAnLmZ1bGwtYW1vdW50JyxcbiAgICAnaW5zdGFsbG1lbnRfcGVyaW9kX3NlbGVjdG9yJyA6ICdbbmFtZT1cImluc3RhbGxtZW50X3BlcmlvZFwiXScsXG4gICAgJ25hbWVfc2VsZWN0b3InIDogJy5tLWZvcm0taXRlbS1kaXNwbGF5LW5hbWUnLFxuICAgICdpbl9ob25vcl9vcl9tZW1vcnlfZmllbGRfc2VsZWN0b3InIDogJy5tLWZvcm0taXRlbS1ob25vci1tZW1vcnknLFxuICAgICdob25vcl9vcl9tZW1vcnlfY2hvb3NlcicgOiAnaW5wdXRbbmFtZT1cImluX2hvbm9yX29yX21lbW9yeVwiXScsIC8vIHJhZGlvIGZpZWxkc1xuICAgICdob25vcl90eXBlX3NlbGVjdG9yJyA6ICcuYS1ob25vci10eXBlJywgLy8gc3BhbiBpbnNpZGUgbGFiZWxcbiAgICAnaG9ub3JfbWVtb3J5X2lucHV0X2dyb3VwJyA6ICcuYS1ob25vci1vci1tZW1vcnknLCAvLyBob2xkcyB0aGUgZm9ybSBmaWVsZFxuICAgICdhbm9ueW1vdXNfc2VsZWN0b3InIDogJyNhbm9ueW1vdXMnLFxuICAgICdzaG93X2JpbGxpbmdfY291bnRyeV9zZWxlY3RvcicgOiAnI2JpbGxpbmdfc2hvd19jb3VudHJ5JyxcbiAgICAnYmlsbGluZ19jb3VudHJ5X3NlbGVjdG9yJyA6ICcubS1mb3JtLWl0ZW0tY291bnRyeScsXG4gICAgJ3Nob3dfc2hpcHBpbmdfY291bnRyeV9zZWxlY3RvcicgOiAnI3NoaXBwaW5nX3Nob3dfY291bnRyeScsXG4gICAgJ3NoaXBwaW5nX2NvdW50cnlfc2VsZWN0b3InIDogJy5tLWZvcm0taXRlbS1zaGlwcGluZy1jb3VudHJ5JyxcbiAgICAnc2hpcHBpbmdfYWRkcmVzc19zZWxlY3RvcicgOiAnLm0tZm9ybS1pdGVtLXNoaXBwaW5nLWFkZHJlc3MnLFxuICAgICd1c2VfZm9yX3NoaXBwaW5nX3NlbGVjdG9yJyA6ICcjdXNlZm9yc2hpcHBpbmcnLFxuICAgICdlbWFpbF9maWVsZF9zZWxlY3RvcicgOiAnI2VtYWlsJyxcbiAgICAncGFzc3dvcmRfZmllbGRfc2VsZWN0b3InIDogJyNwYXNzd29yZCcsXG4gICAgJ2ZpcnN0X25hbWVfZmllbGRfc2VsZWN0b3InIDogJyNmaXJzdF9uYW1lJyxcbiAgICAnbGFzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yJyA6ICcjbGFzdF9uYW1lJyxcbiAgICAnYmlsbGluZ19zdHJlZXRfZmllbGRfc2VsZWN0b3InIDogJyNiaWxsaW5nX3N0cmVldCcsXG4gICAgJ2JpbGxpbmdfY2l0eV9maWVsZF9zZWxlY3RvcicgOiAnI2JpbGxpbmdfY2l0eScsXG4gICAgJ2JpbGxpbmdfc3RhdGVfZmllbGRfc2VsZWN0b3InIDogJyNiaWxsaW5nX3N0YXRlJyxcbiAgICAnYmlsbGluZ196aXBfZmllbGRfc2VsZWN0b3InOiAnI2JpbGxpbmdfemlwJyxcbiAgICAnYmlsbGluZ19jb3VudHJ5X2ZpZWxkX3NlbGVjdG9yJyA6ICcjYmlsbGluZ19jb3VudHJ5JyxcbiAgICAnY3JlYXRlX21wX3NlbGVjdG9yJyA6ICcjY3JlYXRlbXBhY2NvdW50JyxcbiAgICAncGFzc3dvcmRfc2VsZWN0b3InIDogJy5tLWZvcm0taXRlbS1wYXNzd29yZCcsXG4gICAgJ2FkZGl0aW9uYWxfYW1vdW50X2ZpZWxkJyA6ICcjYWRkaXRpb25hbF9kb25hdGlvbicsXG4gICAgJ3NoaXBwaW5nX3NlbGVjdG9yJyA6ICdmaWVsZHNldC5tLXNoaXBwaW5nLWluZm9ybWF0aW9uJyxcbiAgICAnY2hvb3NlX3BheW1lbnQnIDogJyNjaG9vc2UtcGF5bWVudC1tZXRob2QnLFxuICAgICdwYXltZW50X21ldGhvZF9zZWxlY3RvcicgOiAnLnBheW1lbnQtbWV0aG9kJyxcbiAgICAnY2NfbnVtX3NlbGVjdG9yJyA6ICcjY2FyZC1udW1iZXInLFxuICAgICdjY19leHBfc2VsZWN0b3InIDogJyNjYXJkLWV4cGlyeScsXG4gICAgJ2NjX2N2Y19zZWxlY3RvcicgOiAnI2NhcmQtY3ZjJyxcbiAgICAncGF5X2J1dHRvbl9zZWxlY3RvcicgOiAnLmEtYnV0dG9uLXBheScsXG4gICAgJ29wcF9pZF9zZWxlY3RvcicgOiAnI2xvY2tfa2V5JywgLy8gd2UgdXNlIHRoaXMgdmFsdWUgYXMgdGhlIEdvb2dsZSBBbmFseXRpY3MgdHJhbnNhY3Rpb24gSURcbiAgICAnbmV3c2xldHRlcl9ncm91cF9zZWxlY3RvcicgOiAnLnN1cHBvcnQtbmV3c2xldHRlcnMnXG4gIH07IC8vIGVuZCBkZWZhdWx0c1xuXG4gIC8vIFRoZSBhY3R1YWwgcGx1Z2luIGNvbnN0cnVjdG9yXG4gIGZ1bmN0aW9uIFBsdWdpbiggZWxlbWVudCwgb3B0aW9ucyApIHtcblxuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG5cbiAgICAvLyBqUXVlcnkgaGFzIGFuIGV4dGVuZCBtZXRob2Qgd2hpY2ggbWVyZ2VzIHRoZSBjb250ZW50cyBvZiB0d28gb3JcbiAgICAvLyBtb3JlIG9iamVjdHMsIHN0b3JpbmcgdGhlIHJlc3VsdCBpbiB0aGUgZmlyc3Qgb2JqZWN0LiBUaGUgZmlyc3Qgb2JqZWN0XG4gICAgLy8gaXMgZ2VuZXJhbGx5IGVtcHR5IGFzIHdlIGRvbid0IHdhbnQgdG8gYWx0ZXIgdGhlIGRlZmF1bHQgb3B0aW9ucyBmb3JcbiAgICAvLyBmdXR1cmUgaW5zdGFuY2VzIG9mIHRoZSBwbHVnaW5cbiAgICB0aGlzLm9wdGlvbnMgPSAkLmV4dGVuZCgge30sIGRlZmF1bHRzLCBvcHRpb25zICk7XG5cbiAgICB0aGlzLl9kZWZhdWx0cyA9IGRlZmF1bHRzO1xuICAgIHRoaXMuX25hbWUgPSBwbHVnaW5OYW1lO1xuXG4gICAgdGhpcy5pbml0KCk7XG4gIH0gLy8gZW5kIGNvbnN0cnVjdG9yXG5cbiAgUGx1Z2luLnByb3RvdHlwZSA9IHtcblxuICAgIGluaXQ6IGZ1bmN0aW9uKHJlc2V0LCBhbW91bnQpIHtcblxuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCAnbm8tanMnICk7XG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoICdqcycgKTtcblxuICAgICAgLy8gUGxhY2UgaW5pdGlhbGl6YXRpb24gbG9naWMgaGVyZVxuICAgICAgLy8gWW91IGFscmVhZHkgaGF2ZSBhY2Nlc3MgdG8gdGhlIERPTSBlbGVtZW50IGFuZFxuICAgICAgLy8gdGhlIG9wdGlvbnMgdmlhIHRoZSBpbnN0YW5jZSwgZS5nLiB0aGlzLmVsZW1lbnRcbiAgICAgIC8vIGFuZCB0aGlzLm9wdGlvbnNcbiAgICAgIC8vIHlvdSBjYW4gYWRkIG1vcmUgZnVuY3Rpb25zIGxpa2UgdGhlIG9uZSBiZWxvdyBhbmRcbiAgICAgIC8vIGNhbGwgdGhlbSBsaWtlIHNvOiB0aGlzLnlvdXJPdGhlckZ1bmN0aW9uKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKS5cblxuICAgICAgLy8gbW9kaWZ5IG9wdGlvbnMgYXMgbmVlZGVkXG4gICAgICAvL3ZhciB0aGlzLm9wdGlvbnMuYW1vdW50ID0gJyc7XG4gICAgICBpZiAocmVzZXQgIT09IHRydWUpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLmFtb3VudCA9IHBhcnNlRmxvYXQoJCh0aGlzLm9wdGlvbnMubGV2ZWxfYW1vdW50X3NlbGVjdG9yLCB0aGlzLmVsZW1lbnQpLnRleHQoKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm9wdGlvbnMuYW1vdW50ID0gYW1vdW50O1xuICAgICAgfVxuICAgICAgdGhpcy5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCAgICAgPSBwYXJzZUludCgkKHRoaXMub3B0aW9ucy5vcmlnaW5hbF9hbW91bnRfc2VsZWN0b3IsIHRoaXMuZWxlbWVudCkudmFsKCksIDEwKTtcbiAgICAgIHRoaXMub3B0aW9ucy5wcm9jZXNzaW5nX2ZlZSAgICAgID0gKE1hdGgucm91bmQocGFyc2VGbG9hdCh0aGlzLm9wdGlvbnMuZmVlX2Ftb3VudCkqTWF0aC5wb3coMTAsMikpL01hdGgucG93KDEwLDIpKS50b0ZpeGVkKDIpO1xuICAgICAgdGhpcy5vcHRpb25zLnByb2Nlc3NpbmdfZmVlX3RleHQgPSB0aGlzLm9wdGlvbnMucHJvY2Vzc2luZ19mZWU7XG4gICAgICB0aGlzLm9wdGlvbnMuY3JlYXRlX2FjY291bnQgICAgICA9IGZhbHNlO1xuXG4gICAgICB2YXIgYnV0dG9uX3RleHQgPSAkKHRoaXMub3B0aW9ucy5wYXlfYnV0dG9uX3NlbGVjdG9yKS50ZXh0KCk7XG4gICAgICB0aGlzLm9wdGlvbnMuYnV0dG9uX3RleHQgPSBidXR0b25fdGV4dDtcblxuICAgICAgdGhpcy5zdHJpcGUgPSBTdHJpcGUodGhpcy5vcHRpb25zLnN0cmlwZV9wdWJsaXNoYWJsZV9rZXkpO1xuICAgICAgdGhpcy5lbGVtZW50cyA9IHRoaXMuc3RyaXBlLmVsZW1lbnRzKHtcbiAgICAgICAgZm9udHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICAvLyBpbnRlZ3JhdGUgeW91ciBmb250IGludG8gc3RyaXBlXG4gICAgICAgICAgICBjc3NTcmM6ICdodHRwczovL3VzZS50eXBla2l0Lm5ldC9jeGo3ZnpnLmNzcycsXG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9KTtcblxuICAgICAgLy8gdXNlIGEgcmVmZXJyZXIgZm9yIGVkaXQgbGluayBpZiB3ZSBoYXZlIG9uZVxuICAgICAgaWYgKGRvY3VtZW50LnJlZmVycmVyICE9PSAnJykge1xuICAgICAgICAkKCcjZWRpdF91cmwnKS5wcm9wKCdocmVmJywgZG9jdW1lbnQucmVmZXJyZXIpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5vcHRpb25zLmRlYnVnID09PSB0cnVlKSB7XG4gICAgICAgIHRoaXMuZGVidWcodGhpcy5vcHRpb25zKTtcbiAgICAgICAgLy8gcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBjYWxsIGZ1bmN0aW9uc1xuICAgICAgdGhpcy5hbmFseXRpY3NUcmFja2luZyh0aGlzLm9wdGlvbnMpOyAvLyB0cmFjayBhbmFseXRpY3MgZXZlbnRzXG4gICAgICB0aGlzLmFtb3VudEFzUmFkaW8odGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBpZiB0aGUgYW1vdW50IGZpZWxkIGlzIGEgcmFkaW8gYnV0dG9uXG4gICAgICB0aGlzLmFtb3VudFVwZGF0ZWQodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBpZiB0aGUgYW1vdW50IHRleHQgZmllbGQgY2FuIGNoYW5nZVxuXG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMucGF5X2NjX3Byb2Nlc3Npbmdfc2VsZWN0b3IpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5jcmVkaXRDYXJkUHJvY2Vzc2luZ0ZlZXModGhpcy5vcHRpb25zKTsgLy8gcHJvY2Vzc2luZyBmZWVzXG4gICAgICB9XG4gICAgICBcbiAgICAgIC8vIHRoZSBtYWluIGZvcm0gSUQuIHRoaXMgaXMgbm90IHVzZWQgZm9yIGNhbmNlbGxpbmdcbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLmRvbmF0ZUFub255bW91c2x5KHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gYW5vbnltb3VzXG4gICAgICAgIHRoaXMuaG9ub3JPck1lbW9yeVRvZ2dsZSh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIGluIGhvbm9yIG9yIGluIG1lbW9yeSBvZiBzb21lb25lXG4gICAgICAgIHRoaXMub3V0c2lkZVVuaXRlZFN0YXRlcyh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIG91dHNpZGUgVVNcbiAgICAgICAgdGhpcy5zaGlwcGluZ0FkZHJlc3ModGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBzaGlwcGluZyBhZGRyZXNzXG4gICAgICAgIHRoaXMuYWxsb3dNaW5ucG9zdEFjY291bnQodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBvcHRpb24gZm9yIGNyZWF0aW5nIG1pbm5wb3N0IGFjY291bnRcbiAgICAgICAgdGhpcy5wYXltZW50UmVxdWVzdEJ1dHRvbih0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIGNyZWF0ZSBwYXltZW50cmVxdWVzdCBidXR0b25cbiAgICAgICAgdGhpcy5jaG9vc2VQYXltZW50TWV0aG9kKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gc3dpdGNoIGJldHdlZW4gY2FyZCBhbmQgYWNoXG4gICAgICAgIHRoaXMuY3JlZGl0Q2FyZEZpZWxkcyh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIGRvIHN0dWZmIHdpdGggdGhlIGNyZWRpdCBjYXJkIGZpZWxkc1xuICAgICAgICB0aGlzLnZhbGlkYXRlU2V0dXAodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBzZXR1cCBob3cgdmFsaWRhdGlvbiBlcnJvcnMgd29ya1xuICAgICAgICB0aGlzLmZvcm1TZXR1cCh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIHZhbGlkYXRlIGFuZCBzdWJtaXQgdGhlIGZvcm1cbiAgICAgIH1cblxuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmNvbmZpcm1fZm9ybV9zZWxlY3RvcikubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLnNob3dOZXdzbGV0dGVyU2V0dGluZ3ModGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpO1xuICAgICAgICB0aGlzLmNvbmZpcm1NZXNzYWdlU3VibWl0KHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gc3VibWl0IHRoZSBzdHVmZiBvbiB0aGUgY29uZmlybWF0aW9uIHBhZ2VcbiAgICAgIH1cblxuICAgIH0sIC8vIGluaXRcblxuICAgIGRlYnVnOiBmdW5jdGlvbihtZXNzYWdlKSB7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLmRlYnVnID09PSB0cnVlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgbWVzc2FnZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhtZXNzYWdlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmRpcihtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmRpcih0aGlzKTtcbiAgICAgIH1cbiAgICB9LCAvLyBkZWJ1Z1xuXG4gICAgYW5hbHl0aWNzVHJhY2tpbmc6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgIHZhciBwcm9ncmVzcyA9ICQob3B0aW9ucy5wcm9ncmVzc19zZWxlY3Rvcik7XG4gICAgICB2YXIgc3RlcDtcbiAgICAgIHZhciBuYXZfaXRlbV9jb3VudCA9IDA7XG4gICAgICB2YXIgb3BwX2lkID0gJChvcHRpb25zLm9wcF9pZF9zZWxlY3RvcikudmFsKCk7XG4gICAgICB2YXIgcG9zdF9wdXJjaGFzZSA9IGZhbHNlO1xuICAgICAgaWYgKHByb2dyZXNzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgbmF2X2l0ZW1fY291bnQgPSAkKCdsaScsIHByb2dyZXNzKS5sZW5ndGg7IC8vIGxlbmd0aCBpcyBub3QgemVybyBiYXNlZFxuICAgICAgICBzdGVwID0gJCgnbGkgLmFjdGl2ZScsIHByb2dyZXNzKS5wYXJlbnQoKS5pbmRleCgpICsgMTsgLy8gaW5kZXggaXMgemVybyBiYXNlZFxuICAgICAgfVxuICAgICAgLy8gdGhlcmUgaXMgYSBwcm9ncmVzcyBtZW51LCBBTkQgdGhlcmUgSVMgTk9UIGEgY29uZmlybSBmb3JtIHNlbGVjdG9yXG4gICAgICAvLyBpZiB0aGF0IGlzIHRoZSBjYXNlLCB3ZSdyZSBub3Qgb24gdGhlIHB1cmNoYXNlIHN0ZXBcbiAgICAgIGlmIChwcm9ncmVzcy5sZW5ndGggPiAwICYmICQob3B0aW9ucy5jb25maXJtX2Zvcm1fc2VsZWN0b3IpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAvLyB0aGUgYWN0aXZlIHRhYiBtYXRjaGVzIHRoZSBjb3VudCBvZiBpdGVtcyBBTkQgdGhlcmUgaXMgTk9UIGEgY29uZmlybSBmb3JtIHRvIGJlIHN1Ym1pdHRlZFxuICAgICAgICAvLyB0aGF0IG1lYW5zIHdlJ3JlIG9uIGEgcG9zdCBwdXJjaGFzZSBzdGVwLlxuICAgICAgICBpZiAoc3RlcCA9PT0gbmF2X2l0ZW1fY291bnQgJiYgJChvcHRpb25zLmNvbmZpcm1fZm9ybV9zZWxlY3RvcikubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgc3RlcCA9IHN0ZXAgKyAxO1xuICAgICAgICAgIHBvc3RfcHVyY2hhc2UgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHByb2dyZXNzLmxlbmd0aCA+IDAgJiYgJChvcHRpb25zLmNvbmZpcm1fZm9ybV9zZWxlY3RvcikubGVuZ3RoID4gMCB8fCAkKG9wdGlvbnMuZmluaXNoX3NlY3Rpb25fc2VsZWN0b3IpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgLy8gd2UgYXJlIG9uIHRoZSBjb25maXJtIGZvcm0gc2VsZWN0b3IgYW5kIHRoZXJlIGlzIGEgcHJvZ3Jlc3MgbWVhc3VyZVxuICAgICAgICAvLyBPUiwgd2UgYXJlIG9uIHRoZSBmaW5pc2ggc2VsZWN0b3IgYW5kIHRoZXJlIGlzIE5PVCBhIHByb2dyZXNzIG1lYXN1cmVcbiAgICAgICAgLy8gdGhlc2UgbWVhbiB0aGUgdXNlciBqdXN0IHB1cmNoYXNlZC5cbiAgICAgICAgc3RlcCA9ICdwdXJjaGFzZSc7XG4gICAgICB9IGVsc2UgaWYgKHByb2dyZXNzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLmRlYnVnKCAnc3RlcCBpcyAnICsgc3RlcCArICcgYW5kIG5hdiBpdGVtIGNvdW50IGlzICcgKyBuYXZfaXRlbV9jb3VudCArICcgYW5kIG9wcCBpZCBpcyAnICsgb3BwX2lkICsgJyBhbmQgcG9zdCBwdXJjaGFzZSBpcyAnICsgcG9zdF9wdXJjaGFzZSApO1xuICAgICAgdGhpcy5hbmFseXRpY3NUcmFja2luZ1N0ZXAoc3RlcCwgcG9zdF9wdXJjaGFzZSk7XG4gICAgfSwgLy8gYW5hbHl0aWNzVHJhY2tpbmdcblxuICAgIGFuYWx5dGljc1RyYWNraW5nU3RlcDogZnVuY3Rpb24oc3RlcCwgcG9zdF9wdXJjaGFzZSkge1xuICAgICAgdmFyIHByb2dyZXNzID0gJCh0aGlzLm9wdGlvbnMucHJvZ3Jlc3Nfc2VsZWN0b3IpO1xuICAgICAgdmFyIGFtb3VudCA9ICQodGhpcy5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudF9zZWxlY3RvcikudmFsKCk7XG4gICAgICB2YXIgb3BwX2lkID0gJCh0aGlzLm9wdGlvbnMub3BwX2lkX3NlbGVjdG9yKS52YWwoKTtcbiAgICAgIHZhciBpbnN0YWxsbWVudF9wZXJpb2QgPSAnb25lLXRpbWUnO1xuICAgICAgdmFyIGxldmVsO1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmluc3RhbGxtZW50X3BlcmlvZF9zZWxlY3RvcikubGVuZ3RoID4gMCApIHtcbiAgICAgICAgaW5zdGFsbG1lbnRfcGVyaW9kID0gJCh0aGlzLm9wdGlvbnMuaW5zdGFsbG1lbnRfcGVyaW9kX3NlbGVjdG9yKS52YWwoKTtcbiAgICAgIH1cbiAgICAgIC8vIGlmIHdlJ3JlIG5vdCBhZnRlciB0aGUgcHVyY2hhc2UsIHVzZSBhZGRQcm9kdWN0XG4gICAgICBpZiAocHJvZ3Jlc3MubGVuZ3RoID4gMCAmJiBwb3N0X3B1cmNoYXNlICE9PSB0cnVlKSB7XG4gICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgIGFtb3VudDogYW1vdW50LFxuICAgICAgICAgIGluc3RhbGxtZW50X3BlcmlvZDogaW5zdGFsbG1lbnRfcGVyaW9kXG4gICAgICAgIH07XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgdXJsOiAnL2NhbGN1bGF0ZS1tZW1iZXItbGV2ZWwvJyxcbiAgICAgICAgICBkYXRhOiBkYXRhXG4gICAgICAgIH0pLmRvbmUoZnVuY3Rpb24oIGRhdGEgKSB7XG4gICAgICAgICAgaWYgKCQoZGF0YS5sZXZlbCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGV2ZWwgPSBkYXRhLmxldmVsLmxldmVsO1xuICAgICAgICAgICAgdGhhdC5kZWJ1ZygnYWRkIHByb2R1Y3Q6IGlkIGlzICcgKyAnbWlubnBvc3RfJyArIGxldmVsLnRvTG93ZXJDYXNlKCkgKyAnX21lbWJlcnNoaXAnICsgJyBhbmQgbmFtZSBpcyAnICsgJ01pbm5Qb3N0ICcgKyBsZXZlbC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGxldmVsLnNsaWNlKDEpICsgJyBNZW1iZXJzaGlwJyArICcgYW5kIHZhcmlhbnQgaXMgJyArIGluc3RhbGxtZW50X3BlcmlvZC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGluc3RhbGxtZW50X3BlcmlvZC5zbGljZSgxKSk7XG4gICAgICAgICAgICBnYSgnZWM6YWRkUHJvZHVjdCcsIHtcbiAgICAgICAgICAgICAgJ2lkJzogJ21pbm5wb3N0XycgKyBsZXZlbC50b0xvd2VyQ2FzZSgpICsgJ19tZW1iZXJzaGlwJyxcbiAgICAgICAgICAgICAgJ25hbWUnOiAnTWlublBvc3QgJyArIGxldmVsLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgbGV2ZWwuc2xpY2UoMSkgKyAnIE1lbWJlcnNoaXAnLFxuICAgICAgICAgICAgICAnY2F0ZWdvcnknOiAnRG9uYXRpb24nLFxuICAgICAgICAgICAgICAnYnJhbmQnOiAnTWlublBvc3QnLFxuICAgICAgICAgICAgICAndmFyaWFudCc6IGluc3RhbGxtZW50X3BlcmlvZC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGluc3RhbGxtZW50X3BlcmlvZC5zbGljZSgxKSxcbiAgICAgICAgICAgICAgJ3ByaWNlJzogYW1vdW50LFxuICAgICAgICAgICAgICAncXVhbnRpdHknOiAxXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RlcCA9PT0gJ3B1cmNoYXNlJykge1xuICAgICAgICB0aGlzLmRlYnVnKCdhZGQgYSBwdXJjaGFzZSBhY3Rpb24uIHN0ZXAgaXMgJyArIHN0ZXApO1xuICAgICAgICBnYSgnZWM6c2V0QWN0aW9uJywgc3RlcCx7XG4gICAgICAgICAgJ2lkJzogb3BwX2lkLCAvLyBUcmFuc2FjdGlvbiBpZCAtIFR5cGU6IHN0cmluZ1xuICAgICAgICAgICdhZmZpbGlhdGlvbic6ICdNaW5uUG9zdCcsIC8vIFN0b3JlIG5hbWUgLSBUeXBlOiBzdHJpbmdcbiAgICAgICAgICAncmV2ZW51ZSc6IGFtb3VudCwgLy8gVG90YWwgUmV2ZW51ZSAtIFR5cGU6IG51bWVyaWNcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmRlYnVnKCdhZGQgYSBjaGVja291dCBhY3Rpb24uIHN0ZXAgaXMgJyArIHN0ZXApO1xuICAgICAgICBnYSgnZWM6c2V0QWN0aW9uJywnY2hlY2tvdXQnLCB7XG4gICAgICAgICAgJ3N0ZXAnOiBzdGVwLCAvLyBBIHZhbHVlIG9mIDEgaW5kaWNhdGVzIGZpcnN0IGNoZWNrb3V0IHN0ZXAuIFZhbHVlIG9mIDIgaW5kaWNhdGVzIHNlY29uZCBjaGVja291dCBzdGVwXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBnYSgnc2V0Jywge1xuICAgICAgICBwYWdlOiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUsXG4gICAgICAgIHRpdGxlOiBkb2N1bWVudC50aXRsZVxuICAgICAgfSk7XG4gICAgICBnYSgnc2VuZCcsICdwYWdldmlldycsIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSk7XG5cbiAgICB9LCAvLyBhbmFseXRpY3NUcmFja2luZ1N0ZXBcblxuICAgIGFtb3VudEFzUmFkaW86IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIC8vIHdoZW4gYW1vdW50IGZpZWxkIGlzIGEgcmFkaW8gYnV0dG9uLCB3ZSBuZWVkIHRvIGNoZWNrIGl0IHdoZW5ldmVyIGl0IGNoYW5nZXNcbiAgICAgICQob3B0aW9ucy5vcmlnaW5hbF9hbW91bnRfc2VsZWN0b3IsIGVsZW1lbnQpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCQodGhpcykuaXMoJzpyYWRpbycpKSB7XG4gICAgICAgICAgICBvcHRpb25zLm9yaWdpbmFsX2Ftb3VudCA9IHBhcnNlSW50KCQob3B0aW9ucy5vcmlnaW5hbF9hbW91bnRfc2VsZWN0b3IgKyAnOmNoZWNrZWQnLCBlbGVtZW50KS52YWwoKSwgMTApO1xuICAgICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sIC8vIGFtb3VudEFzUmFkaW9cblxuICAgIGFtb3VudFVwZGF0ZWQ6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIC8vIHdoZW4gbmV3IGFtb3VudCB0ZXh0IGZpZWxkIGNhbiBjaGFuZ2UsIHdlIG5lZWQgdG8gY2hhbmdlIHRoZSBoaWRkZW4gZmllbGRcbiAgICAgIC8vIHRoZXJlIGlzIGFsc28gcG90ZW50aWFsbHkgYW4gYWRkaXRpb25hbCBhbW91bnQgZmllbGQgdmFsdWUgdG8gYWRkXG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB2YXIgc3RyaXBlX3BheW1lbnRfdHlwZSA9IHRoYXQuZ2V0U3RyaXBlUGF5bWVudFR5cGUoKTtcblxuICAgICAgLy8gc2V0IHRoZSBmYWlyIG1hcmtldCB2YWx1ZSBpZiBhcHBsaWNhYmxlXG4gICAgICB2YXIgYW1vdW50X3NlbGVjdG9yX2ZhaXJfbWFya2V0ID0gJChvcHRpb25zLm9yaWdpbmFsX2Ftb3VudF9zZWxlY3RvciwgZWxlbWVudCk7XG4gICAgICBpZiAoYW1vdW50X3NlbGVjdG9yX2ZhaXJfbWFya2V0LmlzKCc6cmFkaW8nKSkge1xuICAgICAgICBhbW91bnRfc2VsZWN0b3JfZmFpcl9tYXJrZXQgPSAkKG9wdGlvbnMub3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yICsgJzpjaGVja2VkJywgZWxlbWVudCk7XG4gICAgICB9XG4gICAgICB0aGF0LnNldEZhaXJNYXJrZXRWYWx1ZShhbW91bnRfc2VsZWN0b3JfZmFpcl9tYXJrZXQpO1xuXG4gICAgICAkKG9wdGlvbnMub3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoYXQub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQgPSBwYXJzZUludCgkKHRoaXMsIGVsZW1lbnQpLnZhbCgpLCAxMCk7XG4gICAgICAgIHRoYXQuY2FsY3VsYXRlRmVlcyh0aGF0Lm9wdGlvbnMub3JpZ2luYWxfYW1vdW50LCBzdHJpcGVfcGF5bWVudF90eXBlKTtcbiAgICAgICAgdGhhdC5zZXRGYWlyTWFya2V0VmFsdWUoJCh0aGlzLCBlbGVtZW50KSk7XG4gICAgICB9KTtcbiAgICAgICQob3B0aW9ucy5hZGRpdGlvbmFsX2Ftb3VudF9maWVsZCwgZWxlbWVudCkuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGF0Lm9wdGlvbnMub3JpZ2luYWxfYW1vdW50ID0gcGFyc2VJbnQoJChvcHRpb25zLm9yaWdpbmFsX2Ftb3VudF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksIDEwKTtcbiAgICAgICAgdGhhdC5jYWxjdWxhdGVGZWVzKHRoYXQub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQsIHN0cmlwZV9wYXltZW50X3R5cGUpO1xuICAgICAgfSk7XG5cbiAgICB9LCAvLyBhbW91bnRVcGRhdGVkXG5cbiAgICBnZXRUb3RhbEFtb3VudDogZnVuY3Rpb24oYW1vdW50KSB7XG4gICAgICBhbW91bnQgPSAodHlwZW9mIGFtb3VudCAhPT0gJ3VuZGVmaW5lZCcpID8gIGFtb3VudCA6IHRoaXMub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQ7XG4gICAgICB2YXIgdG90YWxfYW1vdW50ID0gYW1vdW50O1xuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmFkZGl0aW9uYWxfYW1vdW50X2ZpZWxkKS5sZW5ndGggPiAwICYmICQodGhpcy5vcHRpb25zLmFkZGl0aW9uYWxfYW1vdW50X2ZpZWxkKS52YWwoKSA+IDApIHtcbiAgICAgICAgdmFyIGFkZGl0aW9uYWxfYW1vdW50ID0gJCh0aGlzLm9wdGlvbnMuYWRkaXRpb25hbF9hbW91bnRfZmllbGQpLnZhbCgpO1xuICAgICAgICB0b3RhbF9hbW91bnQgPSBwYXJzZUludChhZGRpdGlvbmFsX2Ftb3VudCwgMTApICsgcGFyc2VJbnQoYW1vdW50LCAxMCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdG90YWxfYW1vdW50O1xuICAgIH0sIC8vIGdldFRvdGFsQW1vdW50XG5cbiAgICBzZXRGYWlyTWFya2V0VmFsdWU6IGZ1bmN0aW9uKGFtb3VudF9zZWxlY3Rvcikge1xuICAgICAgLy8gaWYgdGhlcmUgaXMgYSBmYWlyIG1hcmtldCB2YWx1ZSBmaWVsZCwgY2hlY2sgYW5kIHNlZSBpZiB3ZSBjYW4gcG9wdWxhdGUgaXRcbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5mYWlyX21hcmtldF92YWx1ZV9zZWxlY3RvcikubGVuZ3RoID4gMCkge1xuICAgICAgICB2YXIgZmFpck1hcmtldFZhbHVlID0gYW1vdW50X3NlbGVjdG9yLmRhdGEoJ2ZhaXItbWFya2V0LXZhbHVlJyk7XG4gICAgICAgICQodGhpcy5vcHRpb25zLmZhaXJfbWFya2V0X3ZhbHVlX3NlbGVjdG9yKS52YWwoZmFpck1hcmtldFZhbHVlKTtcbiAgICAgIH1cbiAgICB9LCAvLyBzZXRGYWlyTWFya2V0VmFsdWVcblxuICAgIGNhbGN1bGF0ZUZlZXM6IGZ1bmN0aW9uKGFtb3VudCwgc3RyaXBlX3BheW1lbnRfdHlwZSkge1xuICAgICAgLy8gdGhpcyBzZW5kcyB0aGUgYW1vdW50IGFuZCBzdHJpcGUgcGF5bWVudCB0eXBlIHRvIHB5dGhvbjsgZ2V0IHRoZSBmZWUgYW5kIGRpc3BsYXkgaXQgdG8gdGhlIHVzZXIgb24gdGhlIGNoZWNrYm94IGxhYmVsXG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB2YXIgdG90YWxfYW1vdW50ID0gdGhhdC5nZXRUb3RhbEFtb3VudChhbW91bnQpO1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIGFtb3VudDogdG90YWxfYW1vdW50LFxuICAgICAgICBzdHJpcGVfcGF5bWVudF90eXBlOiBzdHJpcGVfcGF5bWVudF90eXBlXG4gICAgICB9O1xuICAgICAgdGhhdC5zZXRTdHJpcGVQYXltZW50VHlwZShzdHJpcGVfcGF5bWVudF90eXBlKTtcbiAgICAgICQuYWpheCh7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICB1cmw6ICcvY2FsY3VsYXRlLWZlZXMvJyxcbiAgICAgICAgZGF0YTogZGF0YVxuICAgICAgfSkuZG9uZShmdW5jdGlvbiggZGF0YSApIHtcbiAgICAgICAgaWYgKCQoZGF0YS5mZWVzKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgJCh0aGF0Lm9wdGlvbnMuZmVlX2Ftb3VudCkudGV4dChwYXJzZUZsb2F0KGRhdGEuZmVlcykudG9GaXhlZCgyKSk7XG4gICAgICAgICAgdGhhdC5jcmVkaXRDYXJkRmVlQ2hlY2tib3goJCh0aGF0Lm9wdGlvbnMucGF5X2NjX3Byb2Nlc3Npbmdfc2VsZWN0b3IpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSwgLy8gY2FsY3VsYXRlRmVlc1xuXG4gICAgY3JlZGl0Q2FyZFByb2Nlc3NpbmdGZWVzOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAvLyB0aGlzIGFkZHMgb3Igc3VidHJhY3RzIHRoZSBmZWUgdG8gdGhlIG9yaWdpbmFsIGFtb3VudCB3aGVuIHRoZSB1c2VyIGluZGljYXRlcyB0aGV5IGRvIG9yIGRvIG5vdCB3YW50IHRvIHBheSB0aGUgZmVlc1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdGhhdC5jcmVkaXRDYXJkRmVlQ2hlY2tib3goJChvcHRpb25zLnBheV9jY19wcm9jZXNzaW5nX3NlbGVjdG9yKSk7XG4gICAgICAkKG9wdGlvbnMucGF5X2NjX3Byb2Nlc3Npbmdfc2VsZWN0b3IpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdGhhdC5jcmVkaXRDYXJkRmVlQ2hlY2tib3godGhpcyk7XG4gICAgICB9KTtcbiAgICB9LCAvLyBjcmVkaXRDYXJkUHJvY2Vzc2luZ0ZlZXNcblxuICAgIGdldFN0cmlwZVBheW1lbnRUeXBlOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBzdHJpcGVfcGF5bWVudF90eXBlID0gJ2NhcmQnO1xuICAgICAgaWYgKCQoJ2lucHV0W25hbWU9XCJzdHJpcGVfcGF5bWVudF90eXBlXCJdJykubGVuZ3RoID4gMCkge1xuICAgICAgICBzdHJpcGVfcGF5bWVudF90eXBlID0gJCgnaW5wdXRbbmFtZT1cInN0cmlwZV9wYXltZW50X3R5cGVcIl0nKS52YWwoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdHJpcGVfcGF5bWVudF90eXBlO1xuICAgIH0sIC8vIGdldFN0cmlwZVBheW1lbnRUeXBlXG5cbiAgICBzZXRTdHJpcGVQYXltZW50VHlwZTogZnVuY3Rpb24oc3RyaXBlX3BheW1lbnRfdHlwZSkge1xuICAgICAgaWYgKCQoJ2lucHV0W25hbWU9XCJzdHJpcGVfcGF5bWVudF90eXBlXCJdJykubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICQodGhpcy5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5hcHBlbmQoJzxpbnB1dCB0eXBlPVxcXCJoaWRkZW5cXFwiIG5hbWU9XFxcInN0cmlwZV9wYXltZW50X3R5cGVcXFwiPicpO1xuICAgICAgfVxuICAgICAgJCgnaW5wdXRbbmFtZT1cInN0cmlwZV9wYXltZW50X3R5cGVcIl0nKS52YWwoc3RyaXBlX3BheW1lbnRfdHlwZSk7XG4gICAgICByZXR1cm4gc3RyaXBlX3BheW1lbnRfdHlwZTtcbiAgICB9LCAvLyBzZXRTdHJpcGVQYXltZW50VHlwZVxuXG4gICAgY3JlZGl0Q2FyZEZlZUNoZWNrYm94OiBmdW5jdGlvbihmaWVsZCkge1xuICAgICAgdmFyIGZ1bGxfYW1vdW50O1xuICAgICAgdmFyIHRvdGFsX2Ftb3VudCA9IHRoaXMuZ2V0VG90YWxBbW91bnQoKTtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIGlmICgkKGZpZWxkKS5pcygnOmNoZWNrZWQnKSB8fCAkKGZpZWxkKS5wcm9wKCdjaGVja2VkJykpIHtcbiAgICAgICAgJCgnLmFtb3VudCAubGV2ZWwtYW1vdW50JykuYWRkQ2xhc3MoJ2Z1bGwtYW1vdW50Jyk7XG4gICAgICAgIGZ1bGxfYW1vdW50ID0gKHRvdGFsX2Ftb3VudCArIHBhcnNlRmxvYXQoJCh0aGF0Lm9wdGlvbnMuZmVlX2Ftb3VudCkudGV4dCgpKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmdWxsX2Ftb3VudCA9IHRvdGFsX2Ftb3VudDtcbiAgICAgIH1cbiAgICAgICQodGhhdC5vcHRpb25zLmZ1bGxfYW1vdW50X3NlbGVjdG9yKS50ZXh0KHBhcnNlRmxvYXQoZnVsbF9hbW91bnQpLnRvRml4ZWQoMikpO1xuXG4gICAgICAvLyB1cGRhdGUgdGhlIHBheW1lbnQgcmVxdWVzdFxuICAgICAgaWYgKHRoaXMucGF5bWVudFJlcXVlc3QgJiYgZnVsbF9hbW91bnQpIHtcbiAgICAgICAgdGhpcy5wYXltZW50UmVxdWVzdC51cGRhdGUoe1xuICAgICAgICAgIHRvdGFsOiB7XG4gICAgICAgICAgICBsYWJlbDogXCJNaW5uUG9zdFwiLFxuICAgICAgICAgICAgYW1vdW50OiBmdWxsX2Ftb3VudCAqIDEwMFxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICB9LCAvLyBjcmVkaXRDYXJkRmVlQ2hlY2tib3hcblxuICAgIGRvbmF0ZUFub255bW91c2x5OiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB0aGF0LnRvZ2dsZUFub255bW91cygkKG9wdGlvbnMuYW5vbnltb3VzX3NlbGVjdG9yLCBlbGVtZW50KSk7XG4gICAgICAkKG9wdGlvbnMuYW5vbnltb3VzX3NlbGVjdG9yLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoYXQudG9nZ2xlQW5vbnltb3VzKCQodGhpcykpO1xuICAgICAgfSk7XG4gICAgfSwgLy8gZG9uYXRlQW5vbnltb3VzbHlcblxuICAgIHRvZ2dsZUFub255bW91czogZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgaWYgKGVsZW1lbnQuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgJCh0aGlzLm9wdGlvbnMubmFtZV9zZWxlY3RvciArICcgZGl2OmZpcnN0JywgdGhpcy5lbGVtZW50KS5oaWRlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkKHRoaXMub3B0aW9ucy5uYW1lX3NlbGVjdG9yICsgJyBkaXY6Zmlyc3QnLCB0aGlzLmVsZW1lbnQpLnNob3coKTtcbiAgICAgIH1cbiAgICB9LCAvLyB0b2dnbGVBbm9ueW1vdXNcblxuICAgIGhvbm9yT3JNZW1vcnk6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIGlmICgkKG9wdGlvbnMuaG9ub3Jfb3JfbWVtb3J5X2Nob29zZXIgKyAnOmNoZWNrZWQnKS52YWwoKSkge1xuICAgICAgICAkKG9wdGlvbnMuaG9ub3JfbWVtb3J5X2lucHV0X2dyb3VwLCBlbGVtZW50KS5zaG93KCk7XG4gICAgICAgICQob3B0aW9ucy5ob25vcl90eXBlX3NlbGVjdG9yKS50ZXh0KCQob3B0aW9ucy5ob25vcl9vcl9tZW1vcnlfY2hvb3NlciArICc6Y2hlY2tlZCcpLnZhbCgpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQob3B0aW9ucy5ob25vcl9tZW1vcnlfaW5wdXRfZ3JvdXAsIGVsZW1lbnQpLmhpZGUoKTtcbiAgICAgICAgJChvcHRpb25zLmhvbm9yX25hbWVfc2VsZWN0b3IgKyAnIGlucHV0JywgZWxlbWVudCkudmFsKCcnKTtcbiAgICAgIH1cbiAgICB9LCAvLyBob25vck9yTWVtb3J5XG5cbiAgICBob25vck9yTWVtb3J5VG9nZ2xlOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB0aGF0Lmhvbm9yT3JNZW1vcnkodGhhdC5lbGVtZW50LCB0aGF0Lm9wdGlvbnMpO1xuICAgICAgJChvcHRpb25zLmhvbm9yX29yX21lbW9yeV9jaG9vc2VyLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoYXQuaG9ub3JPck1lbW9yeSh0aGF0LmVsZW1lbnQsIHRoYXQub3B0aW9ucyk7XG4gICAgICB9KTtcbiAgICB9LCAvLyBob25vck9yTWVtb3J5VG9nZ2xlXG5cbiAgICBvdXRzaWRlVW5pdGVkU3RhdGVzOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICAkKG9wdGlvbnMuc2hvd19iaWxsaW5nX2NvdW50cnlfc2VsZWN0b3IpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAkKG9wdGlvbnMuYmlsbGluZ19jb3VudHJ5X3NlbGVjdG9yKS5zaG93KCk7XG4gICAgICAgICQodGhpcykucGFyZW50KCkuaGlkZSgpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KTtcbiAgICAgICQob3B0aW9ucy5zaG93X3NoaXBwaW5nX2NvdW50cnlfc2VsZWN0b3IpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAkKG9wdGlvbnMuc2hpcHBpbmdfY291bnRyeV9zZWxlY3Rvcikuc2hvdygpO1xuICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmhpZGUoKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSk7XG4gICAgfSwgLy8gb3V0c2lkZVVuaXRlZFN0YXRlc1xuXG4gICAgc2hpcHBpbmdBZGRyZXNzOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB2YXIgc2hvd19zaGlwcGluZyA9IGZhbHNlO1xuICAgICAgaWYgKCQob3B0aW9ucy51c2VfZm9yX3NoaXBwaW5nX3NlbGVjdG9yKS5sZW5ndGggPiAwKSB7IC8vIHdlIGhhdmUgYSBzaGlwcGluZyBjaGVja2JveFxuICAgICAgICBzaG93X3NoaXBwaW5nID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmIChzaG93X3NoaXBwaW5nID09PSB0cnVlICkge1xuICAgICAgICAkKG9wdGlvbnMudXNlX2Zvcl9zaGlwcGluZ19zZWxlY3RvciwgZWxlbWVudCkucGFyZW50KCkuc2hvdygpO1xuICAgICAgICBpZiAoJChvcHRpb25zLnVzZV9mb3Jfc2hpcHBpbmdfc2VsZWN0b3IsIGVsZW1lbnQpLmlzKCc6Y2hlY2tlZCcpKSB7IC8vIHVzZSBzYW1lIGFzIGJpbGxpbmdcbiAgICAgICAgICAkKG9wdGlvbnMuc2hpcHBpbmdfc2VsZWN0b3IpLmhpZGUoKTtcbiAgICAgICAgfSBlbHNlIHsgLy8gc2VwYXJhdGUgc2hpcHBpbmcgYW5kIGJpbGxpbmdcbiAgICAgICAgICAkKG9wdGlvbnMuc2hpcHBpbmdfc2VsZWN0b3IpLnNob3coKTtcbiAgICAgICAgfVxuICAgICAgICAkKG9wdGlvbnMudXNlX2Zvcl9zaGlwcGluZ19zZWxlY3RvciwgZWxlbWVudCkuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHRoYXQuc2hpcHBpbmdBZGRyZXNzKGVsZW1lbnQsIG9wdGlvbnMpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIFxuICAgIH0sIC8vIHNoaXBwaW5nQWRkcmVzc1xuXG4gICAgYWxsb3dNaW5ucG9zdEFjY291bnQ6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHZhciBhY2NvdW50X2V4aXN0cyA9IGZhbHNlO1xuXG4gICAgICAvLyBzaG93IHBhc3N3b3JkIGFzIHRleHRcbiAgICAgIHRoYXQuc2hvd1Bhc3N3b3JkKCk7XG5cbiAgICAgIC8vIGNhbGN1bGF0ZSBwYXNzd29yZCBzdHJlbmd0aFxuICAgICAgdGhhdC5zaG93UGFzc3dvcmRTdHJlbmd0aCgpO1xuICAgICAgXG4gICAgICB0aGF0LnNwYW1FbWFpbCgkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpKTtcbiAgICAgICQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGF0LnNwYW1FbWFpbCgkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGF0LnRvZ2dsZUFjY291bnRGaWVsZHMoJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkpO1xuICAgICAgJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGF0LnRvZ2dsZUFjY291bnRGaWVsZHMoJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkpO1xuICAgICAgfSk7XG5cbiAgICAgIGZ1bmN0aW9uIGRvbmVUeXBpbmcgKCkge1xuICAgICAgICB2YXIgZW1haWwgPSAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpO1xuICAgICAgICBhY2NvdW50X2V4aXN0cyA9IHRoYXQuY2hlY2tNaW5ucG9zdEFjY291bnQoZWxlbWVudCwgb3B0aW9ucywgZW1haWwpO1xuICAgICAgfVxuXG4gICAgICAvL3NldHVwIGJlZm9yZSBmdW5jdGlvbnNcbiAgICAgIHZhciB0eXBpbmdUaW1lcjsgICAgICAgICAgICAgICAgLy90aW1lciBpZGVudGlmaWVyXG4gICAgICB2YXIgZG9uZVR5cGluZ0ludGVydmFsID0gNTAwMDsgIC8vdGltZSBpbiBtcywgNSBzZWNvbmQgZm9yIGV4YW1wbGVcblxuICAgICAgLy9vbiBrZXl1cCwgc3RhcnQgdGhlIGNvdW50ZG93blxuICAgICAgJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5rZXl1cChmdW5jdGlvbigpe1xuICAgICAgICBjbGVhclRpbWVvdXQodHlwaW5nVGltZXIpO1xuICAgICAgICBpZiAoJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwpIHtcbiAgICAgICAgICB0eXBpbmdUaW1lciA9IHNldFRpbWVvdXQoZG9uZVR5cGluZywgZG9uZVR5cGluZ0ludGVydmFsKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSwgLy8gYWxsb3dNaW5ucG9zdEFjY291bnRcblxuICAgIHNwYW1FbWFpbDogZnVuY3Rpb24oZW1haWxfZmllbGQpIHtcbiAgICAgIHZhciBzcGFtRXJyb3JDb250YWluZXIgPSBlbWFpbF9maWVsZC5wYXJlbnQoKTtcbiAgICAgIGlmICgkKCcuYS1zcGFtLWVtYWlsJywgc3BhbUVycm9yQ29udGFpbmVyKS5sZW5ndGggPT09IDAgKSB7XG4gICAgICAgIHNwYW1FcnJvckNvbnRhaW5lci5hcHBlbmQoJzxwIGNsYXNzPVwiYS1mb3JtLWNhcHRpb24gYS1lcnJvciBhLXNwYW0tZW1haWxcIj5UaGlzIGVtYWlsIGFkZHJlc3MgaGFzIGJlZW4gZGV0ZWN0ZWQgYXMgYSBzcGFtbWVyLjwvcD4nKTtcbiAgICAgIH1cbiAgICAgICQoJy5hLXNwYW0tZW1haWwnLCBzcGFtRXJyb3JDb250YWluZXIpLmhpZGUoKTtcbiAgICAgIHNwYW1FcnJvckNvbnRhaW5lci5yZW1vdmVDbGFzcygnaW52YWxpZCBhLWVycm9yJyk7XG4gICAgfSwgLy8gc3BhbUVtYWlsXG5cbiAgICB0b2dnbGVBY2NvdW50RmllbGRzOiBmdW5jdGlvbihjcmVhdGVfYWNjb3VudF9zZWxlY3Rvcikge1xuICAgICAgaWYgKGNyZWF0ZV9hY2NvdW50X3NlbGVjdG9yLmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgIGNyZWF0ZV9hY2NvdW50X3NlbGVjdG9yLnBhcmVudCgpLmJlZm9yZSgnPHAgY2xhc3M9XCJhLWZvcm0tY2FwdGlvbiBhLWFjY291bnQtZXhpc3RzIGEtYWNjb3VudC1leGlzdHMtc3VjY2Vzc1wiPlRoZXJlIGlzIGFscmVhZHkgYSBNaW5uUG9zdC5jb20gYWNjb3VudCB3aXRoIHRoaXMgZW1haWwgYWRkcmVzcy48L3A+Jyk7XG4gICAgICAgICQoJy5hLWFjY291bnQtZXhpc3RzJykuaGlkZSgpO1xuICAgICAgICAkKHRoaXMub3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgdGhpcy5lbGVtZW50KS5zaG93KCk7XG4gICAgICAgIHRoaXMub3B0aW9ucy5jcmVhdGVfYWNjb3VudCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkKHRoaXMub3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgdGhpcy5lbGVtZW50KS5oaWRlKCk7XG4gICAgICB9XG4gICAgfSwgLy8gdG9nZ2xlQWNjb3VudEZpZWxkc1xuXG4gICAgc2hvd1Bhc3N3b3JkOiBmdW5jdGlvbigpIHtcbiAgICAgIC8vIENhY2hlIG91ciBqcXVlcnkgZWxlbWVudHNcbiAgICAgIHZhciAkc3VibWl0ID0gJCgnLmJ0bi1zdWJtaXQnKTtcbiAgICAgIHZhciAkY29udGFpbmVyID0gJCh0aGlzLm9wdGlvbnMucGFzc3dvcmRfc2VsZWN0b3IsIHRoaXMuZWxlbWVudCk7XG4gICAgICB2YXIgJGZpZWxkID0gJCgnaW5wdXRbbmFtZT1cInBhc3N3b3JkXCJdJywgJGNvbnRhaW5lcik7XG4gICAgICAkKCcuYS1hY2NvdW50LWV4aXN0cycpLmhpZGUoKTtcbiAgICAgIHZhciBzaG93X3Bhc3MgPSAnPGRpdiBjbGFzcz1cImEtZm9ybS1zaG93LXBhc3N3b3JkIGEtZm9ybS1jYXB0aW9uXCI+PGxhYmVsPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBuYW1lPVwic2hvd19wYXNzd29yZFwiIGlkPVwic2hvdy1wYXNzd29yZC1jaGVja2JveFwiIHZhbHVlPVwiMVwiPiBTaG93IHBhc3N3b3JkPC9sYWJlbD48L2Rpdj4nO1xuICAgICAgLy8gSW5qZWN0IHRoZSB0b2dnbGUgYnV0dG9uIGludG8gdGhlIHBhZ2VcbiAgICAgICRjb250YWluZXIuYXBwZW5kKCBzaG93X3Bhc3MgKTtcbiAgICAgIC8vIENhY2hlIHRoZSB0b2dnbGUgYnV0dG9uXG4gICAgICB2YXIgJHRvZ2dsZSA9ICQoJyNzaG93LXBhc3N3b3JkLWNoZWNrYm94Jyk7XG4gICAgICAvLyBUb2dnbGUgdGhlIGZpZWxkIHR5cGVcbiAgICAgICR0b2dnbGUub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICB2YXIgY2hlY2tib3ggPSAkKHRoaXMpO1xuICAgICAgICBpZiAoY2hlY2tib3guaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgICAkZmllbGQuYXR0cigndHlwZScsICd0ZXh0Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJGZpZWxkLmF0dHIoJ3R5cGUnLCAncGFzc3dvcmQnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICAvLyBTZXQgdGhlIGZvcm0gZmllbGQgYmFjayB0byBhIHJlZ3VsYXIgcGFzc3dvcmQgZWxlbWVudFxuICAgICAgJHN1Ym1pdC5vbiggJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAkZmllbGQuYXR0cigndHlwZScsICdwYXNzd29yZCcpO1xuICAgICAgfSk7XG4gICAgfSxcblxuICAgIHNob3dQYXNzd29yZFN0cmVuZ3RoOiBmdW5jdGlvbigpIHtcbiAgICAgIC8vIGNoZWNrUGFzc3dvcmRTdHJlbmd0aFxuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgaWYgKCQoJy5hLXBhc3N3b3JkLXN0cmVuZ3RoJykubGVuZ3RoID4gMCApIHtcbiAgICAgICAgdmFyICRiZWZvcmUgPSAkKCcuYS1mb3JtLXNob3ctcGFzc3dvcmQnKTtcbiAgICAgICAgJGJlZm9yZS5hZnRlciggJCgnPGRpdiBjbGFzcz1cImEtcGFzc3dvcmQtc3RyZW5ndGhcIj48bWV0ZXIgbWF4PVwiNFwiIGlkPVwicGFzc3dvcmQtc3RyZW5ndGhcIj48ZGl2PjwvZGl2PjwvbWV0ZXI+PHAgY2xhc3M9XCJhLWZvcm0tY2FwdGlvblwiIGlkPVwicGFzc3dvcmQtc3RyZW5ndGgtdGV4dFwiPjwvcD48L2Rpdj4nKSk7XG4gICAgICAgICQoICdib2R5JyApLm9uKCAna2V5dXAnLCAnaW5wdXRbbmFtZT1wYXNzd29yZF0nLFxuICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhhdC5jaGVja1Bhc3N3b3JkU3RyZW5ndGgoXG4gICAgICAgICAgICAgICQoJ2lucHV0W25hbWU9cGFzc3dvcmRdJyksIC8vIFBhc3N3b3JkIGZpZWxkXG4gICAgICAgICAgICAgICQoJyNwYXNzd29yZC1zdHJlbmd0aCcpLCAgICAgICAgICAgLy8gU3RyZW5ndGggbWV0ZXJcbiAgICAgICAgICAgICAgJCgnI3Bhc3N3b3JkLXN0cmVuZ3RoLXRleHQnKSAgICAgIC8vIFN0cmVuZ3RoIHRleHQgaW5kaWNhdG9yXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9LCAvLyBzaG93UGFzc3dvcmRTdHJlbmd0aFxuXG4gICAgY2hlY2tQYXNzd29yZFN0cmVuZ3RoOiBmdW5jdGlvbiggJHBhc3N3b3JkLCAkc3RyZW5ndGhNZXRlciwgJHN0cmVuZ3RoVGV4dCApIHtcbiAgICAgIHZhciBwYXNzd29yZCA9ICRwYXNzd29yZC52YWwoKTtcbiAgICAgIC8vIEdldCB0aGUgcGFzc3dvcmQgc3RyZW5ndGhcbiAgICAgIHZhciByZXN1bHQgPSB6eGN2Ym4ocGFzc3dvcmQpO1xuICAgICAgdmFyIHN0cmVuZ3RoID0gcmVzdWx0LnNjb3JlO1xuXG4gICAgICAkc3RyZW5ndGhUZXh0LnJlbW92ZUNsYXNzKCAnc2hvcnQgYmFkIGdvb2Qgc3Ryb25nJyApO1xuXG4gICAgICAvLyBBZGQgdGhlIHN0cmVuZ3RoIG1ldGVyIHJlc3VsdHNcbiAgICAgIHN3aXRjaCAoIHN0cmVuZ3RoICkge1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgJHN0cmVuZ3RoVGV4dC5hZGRDbGFzcyggJ2JhZCcgKS5odG1sKCAnU3RyZW5ndGg6IDxzdHJvbmc+V2Vhazwvc3Ryb25nPicgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICRzdHJlbmd0aFRleHQuYWRkQ2xhc3MoICdnb29kJyApLmh0bWwoICdTdHJlbmd0aDogPHN0cm9uZz5NZWRpdW08L3N0cm9uZz4nICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAkc3RyZW5ndGhUZXh0LmFkZENsYXNzKCAnc3Ryb25nJyApLmh0bWwoICdTdHJlbmd0aDogPHN0cm9uZz5TdHJvbmc8L3N0cm9uZz4nICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAkc3RyZW5ndGhUZXh0LmFkZENsYXNzKCAnc2hvcnQnICkuaHRtbCggJ1N0cmVuZ3RoOiA8c3Ryb25nPlZlcnkgd2Vhazwvc3Ryb25nPicgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAkc3RyZW5ndGhUZXh0LmFkZENsYXNzKCAnc2hvcnQnICkuaHRtbCggJ1N0cmVuZ3RoOiA8c3Ryb25nPlZlcnkgd2Vhazwvc3Ryb25nPicgKTtcbiAgICAgIH1cbiAgICAgICRzdHJlbmd0aE1ldGVyLnZhbChzdHJlbmd0aCk7XG4gICAgICByZXR1cm4gc3RyZW5ndGg7XG4gICAgfSwgLy8gY2hlY2tQYXNzd29yZFN0cmVuZ3RoXG5cbiAgICBjaGVja01pbm5wb3N0QWNjb3VudDogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucywgZW1haWwpIHtcbiAgICAgIHZhciB1c2VyID0ge1xuICAgICAgICBlbWFpbDogZW1haWxcbiAgICAgIH07XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAkLmFqYXgoe1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICB1cmw6IG9wdGlvbnMubWlubnBvc3Rfcm9vdCArICcvd3AtanNvbi91c2VyLWFjY291bnQtbWFuYWdlbWVudC92MS9jaGVjay1hY2NvdW50JyxcbiAgICAgICAgZGF0YTogdXNlclxuICAgICAgfSkuZG9uZShmdW5jdGlvbiggcmVzdWx0ICkge1xuICAgICAgICBpZiAocmVzdWx0LnN0YXR1cyA9PT0gJ3N1Y2Nlc3MnICYmIHJlc3VsdC5yZWFzb24gPT09ICd1c2VyIGV4aXN0cycpIHsgLy8gdXNlciBleGlzdHNcbiAgICAgICAgICBpZiAoJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgICAgICQob3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgZWxlbWVudCkuaGlkZSgpO1xuICAgICAgICAgICAgJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkucGFyZW50KCkuaGlkZSgpO1xuICAgICAgICAgICAgJCgnLmEtYWNjb3VudC1leGlzdHMnLCBlbGVtZW50KS5zaG93KCk7XG4gICAgICAgICAgfVxuICAgICAgICAgICQob3B0aW9ucy5jcmVhdGVfbXBfc2VsZWN0b3IsIGVsZW1lbnQpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICgkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KS5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICAgICAgICAkKG9wdGlvbnMucGFzc3dvcmRfc2VsZWN0b3IsIGVsZW1lbnQpLmhpZGUoKTtcbiAgICAgICAgICAgICAgJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkucGFyZW50KCkuaGlkZSgpO1xuICAgICAgICAgICAgICAkKCcuYS1hY2NvdW50LWV4aXN0cycsIGVsZW1lbnQpLnNob3coKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmICggcmVzdWx0LnN0YXR1cyA9PT0gJ3NwYW0nICkge1xuICAgICAgICAgICQodGhhdC5vcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yKS5hZGRDbGFzcygnaW52YWxpZCBhLWVycm9yJyk7XG4gICAgICAgICAgJCggJy5hLXNwYW0tZW1haWwnKS5zaG93KCk7XG4gICAgICAgIH0gZWxzZSB7IC8vIHVzZXIgZG9lcyBub3QgZXhpc3Qgb3IgYWpheCBjYWxsIGZhaWxlZFxuICAgICAgICAgIGlmICgkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KS5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICAgICAgJChvcHRpb25zLnBhc3N3b3JkX3NlbGVjdG9yLCBlbGVtZW50KS5zaG93KCk7XG4gICAgICAgICAgICBvcHRpb25zLmNyZWF0ZV9hY2NvdW50ID0gdHJ1ZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJChvcHRpb25zLnBhc3N3b3JkX3NlbGVjdG9yLCBlbGVtZW50KS5oaWRlKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgICQoJy5hLWFjY291bnQtZXhpc3RzJywgZWxlbWVudCkuaGlkZSgpO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSwgLy8gY2hlY2tNaW5ucG9zdEFjY291bnRcblxuICAgIHBheW1lbnRSZXF1ZXN0QnV0dG9uOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB2YXIgdG90YWxfYW1vdW50ID0gdGhhdC5nZXRUb3RhbEFtb3VudCgpO1xuICAgICAgdGhhdC5wYXltZW50UmVxdWVzdCA9IHRoYXQuc3RyaXBlLnBheW1lbnRSZXF1ZXN0KHtcbiAgICAgICAgY291bnRyeTogJ1VTJyxcbiAgICAgICAgY3VycmVuY3k6ICd1c2QnLFxuICAgICAgICB0b3RhbDoge1xuICAgICAgICAgIGxhYmVsOiAnTWlublBvc3QnLFxuICAgICAgICAgIGFtb3VudDogdG90YWxfYW1vdW50ICogMTAwLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgICB0aGF0LnByQnV0dG9uID0gdGhhdC5lbGVtZW50cy5jcmVhdGUoJ3BheW1lbnRSZXF1ZXN0QnV0dG9uJywge1xuICAgICAgICBwYXltZW50UmVxdWVzdDogdGhhdC5wYXltZW50UmVxdWVzdCxcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICBwYXltZW50UmVxdWVzdEJ1dHRvbjoge1xuICAgICAgICAgICAgdHlwZTogJ2RvbmF0ZScsXG4gICAgICAgICAgICAvLyBPbmUgb2YgJ2RlZmF1bHQnLCAnYm9vaycsICdidXknLCBvciAnZG9uYXRlJ1xuICAgICAgICAgICAgLy8gRGVmYXVsdHMgdG8gJ2RlZmF1bHQnXG4gICAgICBcbiAgICAgICAgICAgIHRoZW1lOiAnZGFyaycsXG4gICAgICAgICAgICAvLyBPbmUgb2YgJ2RhcmsnLCAnbGlnaHQnLCBvciAnbGlnaHQtb3V0bGluZSdcbiAgICAgICAgICAgIC8vIERlZmF1bHRzIHRvICdkYXJrJ1xuICAgICAgXG4gICAgICAgICAgICBoZWlnaHQ6ICc0OHB4J1xuICAgICAgICAgICAgLy8gRGVmYXVsdHMgdG8gJzQwcHgnLiBUaGUgd2lkdGggaXMgYWx3YXlzICcxMDAlJy5cbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgICBcbiAgICAgIC8vIENoZWNrIHRoZSBhdmFpbGFiaWxpdHkgb2YgdGhlIFBheW1lbnQgUmVxdWVzdCBBUEkgZmlyc3QuXG4gICAgICB0aGF0LnBheW1lbnRSZXF1ZXN0LmNhbk1ha2VQYXltZW50KCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICQoJy5tLXBheS13aXRob3V0LXBheW1lbnQtcmVxdWVzdCcpLmhpZGUoKTtcbiAgICAgICAgICB0aGF0LnByQnV0dG9uLm1vdW50KCcjcGF5bWVudC1yZXF1ZXN0LWJ1dHRvbicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICQoJy5vLXBheS13aXRoLXBheW1lbnQtcmVxdWVzdCcpLmhpZGUoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgICQoJy5kZWNsaW5lLWFwcGxlLXBheSBhJykuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJCh0aGlzKS5oaWRlKCk7XG4gICAgICAgICQoJy5tLXBheS13aXRob3V0LXBheW1lbnQtcmVxdWVzdCcpLnNob3coKTtcbiAgICAgICAgJCgnLm8tcGF5LXdpdGgtcGF5bWVudC1yZXF1ZXN0IC5tLWZvcm0tYWN0aW9ucy1wYXktZmVlcycpLmhpZGUoKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGF0LnByQnV0dG9uLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cbiAgICAgICAgLy8gU2VuZCBwYXltZW50TWV0aG9kLmlkIHRvIHNlcnZlclxuICAgICAgICB2YXIgc3VwcG9ydGZvcm0gPSAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3Rvcik7XG5cbiAgICAgICAgY29uc29sZS5sb2coJ3RoaXMgdmFsaWQgaXMgJyArIHN1cHBvcnRmb3JtLmdldCgwKS5yZXBvcnRWYWxpZGl0eSgpICk7XG5cbiAgICAgICAgLy8gY2hlY2sgdmFsaWRhdGlvbiBvZiBmb3JtXG4gICAgICAgIGlmICghc3VwcG9ydGZvcm0uZ2V0KDApLnJlcG9ydFZhbGlkaXR5KCkpIHtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHRoYXQucGF5bWVudFJlcXVlc3Qub24oJ3BheW1lbnRtZXRob2QnLCBmdW5jdGlvbihldmVudCkge1xuXG4gICAgICAgIC8vIFNlbmQgcGF5bWVudE1ldGhvZC5pZCB0byBzZXJ2ZXJcbiAgICAgICAgdmFyIHN1cHBvcnRmb3JtID0gJCh0aGF0Lm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpO1xuICAgICAgICB2YXIgdG9rZW5GaWVsZE5hbWUgPSAncGF5bWVudF9tZXRob2RfaWQnO1xuICAgICAgICB2YXIgdG9rZW5GaWVsZCA9ICdpbnB1dFtuYW1lPVwiJyArIHRva2VuRmllbGROYW1lICsgJ1wiXSc7XG5cbiAgICAgICAgLy8gSW5zZXJ0IHRoZSBwYXltZW50IG1ldGhvZCBJRCBpbnRvIHRoZSBmb3JtIHNvIGl0IGdldHMgc3VibWl0dGVkIHRvIHRoZSBzZXJ2ZXJcbiAgICAgICAgaWYgKCQodG9rZW5GaWVsZCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICQodG9rZW5GaWVsZCkudmFsKGV2ZW50LnBheW1lbnRNZXRob2QuaWQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN1cHBvcnRmb3JtLmFwcGVuZCgkKCc8aW5wdXQgdHlwZT1cXFwiaGlkZGVuXFxcIiBuYW1lPVwiJyArIHRva2VuRmllbGROYW1lICsgJ1wiPicpLnZhbChldmVudC5wYXltZW50TWV0aG9kLmlkKSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGF0LmZvcm1Qcm9jZXNzb3IodGhhdCwgJ3BheW1lbnRSZXF1ZXN0Jyk7XG5cbiAgICAgIH0pO1xuXG4gICAgfSwgLy8gcGF5bWVudFJlcXVlc3RCdXR0b25cblxuICAgIGNob29zZVBheW1lbnRNZXRob2Q6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcblxuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuXG4gICAgICBpZiAoJChvcHRpb25zLmNob29zZV9wYXltZW50KS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGlmICgkKG9wdGlvbnMuY2hvb3NlX3BheW1lbnQgKyAnIGlucHV0JykuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgICB2YXIgY2hlY2tlZF9pZCA9ICQob3B0aW9ucy5jaG9vc2VfcGF5bWVudCArICcgaW5wdXQ6Y2hlY2tlZCcpLmF0dHIoJ2lkJyk7XG4gICAgICAgICAgdmFyIGNoZWNrZWRfdmFsdWUgPSAkKG9wdGlvbnMuY2hvb3NlX3BheW1lbnQgKyAnIGlucHV0OmNoZWNrZWQnKS52YWwoKTtcbiAgICAgICAgICB0aGF0LnNldHVwUGF5bWVudE1ldGhvZChjaGVja2VkX2lkLCBjaGVja2VkX3ZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgICQob3B0aW9ucy5jaG9vc2VfcGF5bWVudCArICcgaW5wdXQnKS5jaGFuZ2UoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciBjaGVja2VkX2lkID0gdGhpcy5pZDtcbiAgICAgICAgICB2YXIgY2hlY2tlZF92YWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgICAgICAgdGhhdC5zZXR1cFBheW1lbnRNZXRob2QoY2hlY2tlZF9pZCwgY2hlY2tlZF92YWx1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICB9XG4gICAgfSwgLy8gY2hvb3NlUGF5bWVudE1ldGhvZFxuXG4gICAgc2V0dXBQYXltZW50TWV0aG9kOiBmdW5jdGlvbihlbGVtZW50X2lkLCBlbGVtZW50X3ZhbHVlKSB7XG4gICAgICB2YXIgc3RyaXBlX3BheW1lbnRfdHlwZSA9IHRoaXMuc2V0U3RyaXBlUGF5bWVudFR5cGUoZWxlbWVudF92YWx1ZSk7XG4gICAgICBpZiAoIGVsZW1lbnRfdmFsdWUgPT09ICdiYW5rX2FjY291bnQnICkge1xuICAgICAgICAkKCdpbnB1dFtuYW1lPVwicGF5bWVudF9tZXRob2RfaWRcIl0nLCAkKHRoaXMub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikpLnJlbW92ZSgpO1xuICAgICAgICB0aGlzLmFjaEZpZWxkcyh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlbW92ZUFjaEZpZWxkcyh0aGlzLm9wdGlvbnMpO1xuICAgICAgfVxuICAgICAgJCh0aGlzLm9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICQodGhpcy5vcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yICsgJy4nICsgZWxlbWVudF9pZCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgJCh0aGlzLm9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IgKyAnOm5vdCguYWN0aXZlKSBpbnB1dCcpLnZhbCgnJyk7XG4gICAgICB0aGlzLmNhbGN1bGF0ZUZlZXModGhpcy5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCwgc3RyaXBlX3BheW1lbnRfdHlwZSk7XG4gICAgfSwgLy8gc2V0dXBQYXltZW50TWV0aG9kXG5cbiAgICByZW1vdmVBY2hGaWVsZHM6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICQoJ2lucHV0W25hbWU9XCJwdWJsaWNfdG9rZW5cIl0nLCAkKG9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpKS5yZW1vdmUoKTtcbiAgICAgICQoJ2lucHV0W25hbWU9XCJhY2NvdW50X2lkXCJdJywgJChvcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKSkucmVtb3ZlKCk7XG4gICAgICAkKCdpbnB1dFtuYW1lPVwiYmFua1Rva2VuXCJdJywgJChvcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKSkucmVtb3ZlKCk7XG4gICAgfSwgLy8gcmVtb3ZlQWNoRmllbGRzXG5cbiAgICBjcmVkaXRDYXJkRmllbGRzOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG5cbiAgICAgIHZhciB0aGF0ID0gdGhpcztcblxuICAgICAgdmFyIHN0eWxlID0ge1xuICAgICAgICBiYXNlOiB7XG4gICAgICAgICAgaWNvbkNvbG9yOiAnIzY2NkVFOCcsXG4gICAgICAgICAgbGluZUhlaWdodDogJzQzcHgnLFxuICAgICAgICAgIGZvbnRXZWlnaHQ6IDQwMCxcbiAgICAgICAgICBmb250RmFtaWx5OiAnZmYtbWV0YS13ZWItcHJvJyxcbiAgICAgICAgICBmb250U2l6ZTogJzI0cHgnLFxuICAgICAgICAgIC8vbGluZUhlaWdodDogJzM3cHgnLFxuICAgICAgICAgIC8vZm9udFNpemU6ICcxNnB4JyxcbiAgICAgICAgfSxcbiAgICAgICAgaW52YWxpZDoge1xuICAgICAgICAgIGNvbG9yOiAnIzFhMTgxOCcsXG4gICAgICAgIH0sXG4gICAgICB9O1xuXG4gICAgICAvLyBBZGQgYW4gaW5zdGFuY2Ugb2YgdGhlIGNhcmQgVUkgY29tcG9uZW50IGludG8gdGhlIGBjYXJkLWVsZW1lbnRgIDxkaXY+XG4gICAgICAvL2NhcmQubW91bnQoJyNjYXJkLWVsZW1lbnQnKTtcbiAgICAgIGlmICggJCgnLmNyZWRpdC1jYXJkLWdyb3VwJykubGVuZ3RoID09PSAwICYmICQoJy5wYXltZW50LW1ldGhvZC5jaG9vc2UtY2FyZCcpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGF0LmNhcmROdW1iZXJFbGVtZW50ID0gdGhhdC5lbGVtZW50cy5jcmVhdGUoJ2NhcmROdW1iZXInLCB7XG4gICAgICAgIHNob3dJY29uOiB0cnVlLFxuICAgICAgICBzdHlsZTogc3R5bGVcbiAgICAgIH0pO1xuICAgICAgdGhhdC5jYXJkTnVtYmVyRWxlbWVudC5tb3VudChvcHRpb25zLmNjX251bV9zZWxlY3Rvcik7XG5cbiAgICAgIHRoYXQuY2FyZEV4cGlyeUVsZW1lbnQgPSB0aGF0LmVsZW1lbnRzLmNyZWF0ZSgnY2FyZEV4cGlyeScsIHtcbiAgICAgICAgc3R5bGU6IHN0eWxlXG4gICAgICB9KTtcbiAgICAgIHRoYXQuY2FyZEV4cGlyeUVsZW1lbnQubW91bnQob3B0aW9ucy5jY19leHBfc2VsZWN0b3IpO1xuXG4gICAgICB0aGF0LmNhcmRDdmNFbGVtZW50ID0gdGhhdC5lbGVtZW50cy5jcmVhdGUoJ2NhcmRDdmMnLCB7XG4gICAgICAgIHN0eWxlOiBzdHlsZVxuICAgICAgfSk7XG4gICAgICB0aGF0LmNhcmRDdmNFbGVtZW50Lm1vdW50KG9wdGlvbnMuY2NfY3ZjX3NlbGVjdG9yKTtcblxuICAgICAgLy8gdmFsaWRhdGUvZXJyb3IgaGFuZGxlIHRoZSBjYXJkIGZpZWxkc1xuICAgICAgdGhhdC5jYXJkTnVtYmVyRWxlbWVudC5vbignY2hhbmdlJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgdmFyIHN0cmlwZV9wYXltZW50X3R5cGUgPSAnY2FyZCc7XG4gICAgICAgIC8vIFN3aXRjaCBwYXltZW50IHR5cGUgaWYgaXQncyBvbmUgdGhhdCB3ZSByZWNvZ25pemUgYXMgZGlzdGluY3RcbiAgICAgICAgaWYgKGV2ZW50LmJyYW5kKSB7XG4gICAgICAgICAgaWYgKCBldmVudC5icmFuZCA9PT0gJ2FtZXgnICkge1xuICAgICAgICAgICAgc3RyaXBlX3BheW1lbnRfdHlwZSA9ICdhbWV4JztcbiAgICAgICAgICB9ICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIC8vIGVycm9yIGhhbmRsaW5nXG4gICAgICAgIHRoYXQuc3RyaXBlRXJyb3JEaXNwbGF5KGV2ZW50LmVycm9yLCAkKG9wdGlvbnMuY2NfbnVtX3NlbGVjdG9yLCBlbGVtZW50KSwgZWxlbWVudCwgb3B0aW9ucyApO1xuICAgICAgICAvLyBpZiBpdCBjaGFuZ2VkLCByZXNldCB0aGUgYnV0dG9uXG4gICAgICAgIHRoYXQuYnV0dG9uU3RhdHVzKG9wdGlvbnMsICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKSwgZmFsc2UpO1xuICAgICAgICB0aGF0LmNhbGN1bGF0ZUZlZXModGhhdC5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCwgc3RyaXBlX3BheW1lbnRfdHlwZSk7XG4gICAgICB9KTtcblxuICAgICAgdGhhdC5jYXJkRXhwaXJ5RWxlbWVudC5vbignY2hhbmdlJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgLy8gZXJyb3IgaGFuZGxpbmdcbiAgICAgICAgdGhhdC5zdHJpcGVFcnJvckRpc3BsYXkoZXZlbnQuZXJyb3IsICQob3B0aW9ucy5jY19leHBfc2VsZWN0b3IsIGVsZW1lbnQpLCBlbGVtZW50LCBvcHRpb25zICk7XG4gICAgICAgIC8vIGlmIGl0IGNoYW5nZWQsIHJlc2V0IHRoZSBidXR0b25cbiAgICAgICAgdGhhdC5idXR0b25TdGF0dXMob3B0aW9ucywgJCh0aGF0Lm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLmZpbmQoJ2J1dHRvbicpLCBmYWxzZSk7XG4gICAgICB9KTtcblxuICAgICAgdGhhdC5jYXJkQ3ZjRWxlbWVudC5vbignY2hhbmdlJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgLy8gZXJyb3IgaGFuZGxpbmdcbiAgICAgICAgdGhhdC5zdHJpcGVFcnJvckRpc3BsYXkoZXZlbnQuZXJyb3IsICQob3B0aW9ucy5jY19jdmNfc2VsZWN0b3IsIGVsZW1lbnQpLCBlbGVtZW50LCBvcHRpb25zICk7XG4gICAgICAgIC8vIGlmIGl0IGNoYW5nZWQsIHJlc2V0IHRoZSBidXR0b25cbiAgICAgICAgdGhhdC5idXR0b25TdGF0dXMob3B0aW9ucywgJCh0aGF0Lm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLmZpbmQoJ2J1dHRvbicpLCBmYWxzZSk7XG4gICAgICB9KTtcblxuICAgICAgLy8gdGhpcyBpcyB0aGUgbWV0aG9kIHRvIGNyZWF0ZSBhIHNpbmdsZSBjYXJkIGZpZWxkIGFuZCBtb3VudCBpdFxuICAgICAgLyp2YXIgY2FyZCA9IHRoYXQuZWxlbWVudHMuY3JlYXRlKFxuICAgICAgICAnY2FyZCcsXG4gICAgICAgIHtcbiAgICAgICAgICBoaWRlUG9zdGFsQ29kZTogdHJ1ZVxuICAgICAgICB9XG4gICAgICApO1xuICAgICAgLy8gQWRkIGFuIGluc3RhbmNlIG9mIHRoZSBjYXJkIFVJIGNvbXBvbmVudCBpbnRvIHRoZSBgY2FyZC1lbGVtZW50YCA8ZGl2PlxuICAgICAgY2FyZC5tb3VudCgnI2NhcmQtZWxlbWVudCcpOyovXG5cbiAgICB9LCAvLyBjcmVkaXRDYXJkRmllbGRzXG5cbiAgICBzaG93U3Bpbm5lcjogZnVuY3Rpb24oKSB7XG4gICAgICAkKCcjYXV0aG9yaXplLWFjaCcpLmh0bWwoJzxpbWcgc3JjPVwiaHR0cHM6Ly93d3cubWlubnBvc3QuY29tL3dwLWFkbWluL2ltYWdlcy9zcGlubmVyLmdpZlwiIHNyY3NldD1cImh0dHBzOi8vd3d3Lm1pbm5wb3N0LmNvbS93cC1hZG1pbi9pbWFnZXMvc3Bpbm5lci5naWYgMXgsIGh0dHBzOi8vd3d3Lm1pbm5wb3N0LmNvbS93cC1hZG1pbi9pbWFnZXMvc3Bpbm5lci0yeC5naWYgMngsXCI+Jyk7XG4gICAgfSxcblxuICAgIGFjaEZpZWxkczogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgdmFyIGJhbmtUb2tlbkZpZWxkTmFtZSA9ICdiYW5rVG9rZW4nO1xuICAgICAgdmFyIGJhbmtUb2tlbkZpZWxkID0gJ2lucHV0W25hbWU9XCInICsgYmFua1Rva2VuRmllbGROYW1lICsgJ1wiXSc7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICBpZiAodHlwZW9mIFBsYWlkICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB2YXIgbGlua0hhbmRsZXIgPSBQbGFpZC5jcmVhdGUoe1xuICAgICAgICAgIGNsaWVudE5hbWU6ICdNaW5uUG9zdCcsXG4gICAgICAgICAgZW52OiBvcHRpb25zLnBsYWlkX2VudixcbiAgICAgICAgICBwcm9kdWN0OiBbJ2F1dGgnXSxcbiAgICAgICAgICAvLyAxLiBQYXNzIHRoZSB0b2tlbiBnZW5lcmF0ZWQgaW4gc3RlcCAyLlxuICAgICAgICAgIHRva2VuOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxhaWRfbGlua190b2tlbicpLnZhbHVlLFxuICAgICAgICAgIG9uU3VjY2VzczogZnVuY3Rpb24ocHVibGljX3Rva2VuLCBtZXRhZGF0YSkge1xuICAgICAgICAgICAgdGhhdC5zaG93U3Bpbm5lcigpO1xuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgdXJsOicvZ2V0X3BsYWlkX2FjY2Vzc190b2tlbi8nLFxuICAgICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7IHB1YmxpY190b2tlbjogcHVibGljX3Rva2VuLCBhY2NvdW50X2lkOiBtZXRhZGF0YS5hY2NvdW50X2lkIH0pLFxuICAgICAgICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZG9uZShmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICBpZiAodHlwZW9mIHJlc3BvbnNlLmVycm9yICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIC8vIHRoZXJlIGlzIGFuIGVycm9yLlxuICAgICAgICAgICAgICAgICQob3B0aW9ucy5wbGFpZF9saW5rKS5wYXJlbnQoKS5hZnRlcignPHAgY2xhc3M9XCJlcnJvclwiPicgKyByZXNwb25zZS5lcnJvciArICc8L3A+JylcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL3RoaXMuZGVidWcoJ3ByaW50IHJlc3BvbnNlIGhlcmUnKTtcbiAgICAgICAgICAgICAgICAvL3RoaXMuZGVidWcocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIC8vIGFkZCB0aGUgZmllbGQocykgd2UgbmVlZCB0byB0aGUgZm9ybSBmb3Igc3VibWl0dGluZ1xuICAgICAgICAgICAgICAgIGlmICgkKGJhbmtUb2tlbkZpZWxkKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAkKGJhbmtUb2tlbkZpZWxkKS52YWwocmVzcG9uc2Uuc3RyaXBlX2JhbmtfYWNjb3VudF90b2tlbik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICQob3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikucHJlcGVuZCgkKCc8aW5wdXQgdHlwZT1cXFwiaGlkZGVuXFxcIiBuYW1lPVwiJyArIGJhbmtUb2tlbkZpZWxkTmFtZSArICdcIj4nKS52YWwocmVzcG9uc2Uuc3RyaXBlX2JhbmtfYWNjb3VudF90b2tlbikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkKG9wdGlvbnMucGxhaWRfbGluaywgZWxlbWVudCkuaHRtbCgnPHN0cm9uZz5Zb3VyIGFjY291bnQgd2FzIHN1Y2Nlc3NmdWxseSBhdXRob3JpemVkPC9zdHJvbmc+JykuY29udGVudHMoKS51bndyYXAoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5lcnJvcihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAkKG9wdGlvbnMucGxhaWRfbGluaykucGFyZW50KCkuYWZ0ZXIoJzxwIGNsYXNzPVwiZXJyb3JcIj4nICsgcmVzcG9uc2UuZXJyb3IgKyAnPC9wPicpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgICAgJChvcHRpb25zLnBsYWlkX2xpbmssIGVsZW1lbnQpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAkKG9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IgKyAnIC5lcnJvcicpLnJlbW92ZSgpOyAvLyByZW1vdmUgbWV0aG9kIGVycm9yIG1lc3NhZ2UgaWYgaXQgaXMgdGhlcmVcbiAgICAgICAgICBsaW5rSGFuZGxlci5vcGVuKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sIC8vIGFjaEZpZWxkc1xuXG4gICAgYnV0dG9uU3RhdHVzOiBmdW5jdGlvbihvcHRpb25zLCBidXR0b24sIGRpc2FibGVkKSB7XG4gICAgICAvLyBtYWtlIHRoZSBidXR0b24gY2xpY2thYmxlIG9yIG5vdFxuICAgICAgYnV0dG9uLnByb3AoJ2Rpc2FibGVkJywgZGlzYWJsZWQpO1xuICAgICAgaWYgKGRpc2FibGVkID09PSBmYWxzZSkge1xuICAgICAgICBidXR0b24udGV4dChvcHRpb25zLmJ1dHRvbl90ZXh0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJ1dHRvbi50ZXh0KCdQcm9jZXNzaW5nJyk7XG4gICAgICB9XG4gICAgfSwgLy8gYnV0dG9uU3RhdHVzXG5cbiAgICB2YWxpZGF0ZVNldHVwOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICB2YXIgZm9ybXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKG9wdGlvbnMuZm9ybV9zZWxlY3Rvcik7XG4gICAgICBmb3Jtcy5mb3JFYWNoKCBmdW5jdGlvbiAoIGZvcm0gKSB7XG4gICAgICAgIFZhbGlkRm9ybSggZm9ybSwge1xuICAgICAgICAgIHZhbGlkYXRpb25FcnJvclBhcmVudENsYXNzOiAnbS1oYXMtdmFsaWRhdGlvbi1lcnJvcicsXG4gICAgICAgICAgdmFsaWRhdGlvbkVycm9yQ2xhc3M6ICdhLXZhbGlkYXRpb24tZXJyb3InLFxuICAgICAgICAgIGludmFsaWRDbGFzczogJ2EtZXJyb3InLFxuICAgICAgICAgIGVycm9yUGxhY2VtZW50OiAnYWZ0ZXInXG4gICAgICAgIH0gKVxuICAgICAgfSApO1xuICAgICAgdGhpcy5zY3JvbGxUb0Zvcm1FcnJvcihvcHRpb25zKTtcbiAgICB9LCAvLyB2YWxpZGF0ZVNldHVwXG5cbiAgICBzY3JvbGxUb0Zvcm1FcnJvcjogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgdmFyIGZvcm0gPSAkKCBvcHRpb25zLmZvcm1fc2VsZWN0b3IgKTtcbiAgICAgIC8vIGxpc3RlbiBmb3IgYGludmFsaWRgIGV2ZW50cyBvbiBhbGwgZm9ybSBpbnB1dHNcbiAgICAgIGZvcm0uZmluZCggJzppbnB1dCcgKS5vbiggJ2ludmFsaWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyIGlucHV0ID0gJCggdGhpcyApO1xuICAgICAgICAgIC8vIHRoZSBmaXJzdCBpbnZhbGlkIGVsZW1lbnQgaW4gdGhlIGZvcm1cbiAgICAgICAgdmFyIGZpcnN0ID0gZm9ybS5maW5kKCAnLmEtZXJyb3InICkuZmlyc3QoKTtcbiAgICAgICAgLy8gdGhlIGZvcm0gaXRlbSB0aGF0IGNvbnRhaW5zIGl0XG4gICAgICAgIHZhciBmaXJzdF9ob2xkZXIgPSBmaXJzdC5wYXJlbnQoKTtcbiAgICAgICAgICAvLyBvbmx5IGhhbmRsZSBpZiB0aGlzIGlzIHRoZSBmaXJzdCBpbnZhbGlkIGlucHV0XG4gICAgICAgICAgaWYgKGlucHV0WzBdID09PSBmaXJzdFswXSkge1xuICAgICAgICAgICAgICAvLyBoZWlnaHQgb2YgdGhlIG5hdiBiYXIgcGx1cyBzb21lIHBhZGRpbmcgaWYgdGhlcmUncyBhIGZpeGVkIG5hdlxuICAgICAgICAgICAgICAvL3ZhciBuYXZiYXJIZWlnaHQgPSBuYXZiYXIuaGVpZ2h0KCkgKyA1MFxuXG4gICAgICAgICAgICAgIC8vIHRoZSBwb3NpdGlvbiB0byBzY3JvbGwgdG8gKGFjY291bnRpbmcgZm9yIHRoZSBuYXZiYXIgaWYgaXQgZXhpc3RzKVxuICAgICAgICAgICAgICB2YXIgZWxlbWVudE9mZnNldCA9IGZpcnN0X2hvbGRlci5vZmZzZXQoKS50b3A7XG5cbiAgICAgICAgICAgICAgLy8gdGhlIGN1cnJlbnQgc2Nyb2xsIHBvc2l0aW9uIChhY2NvdW50aW5nIGZvciB0aGUgbmF2YmFyKVxuICAgICAgICAgICAgICB2YXIgcGFnZU9mZnNldCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcblxuICAgICAgICAgICAgICAvLyBkb24ndCBzY3JvbGwgaWYgdGhlIGVsZW1lbnQgaXMgYWxyZWFkeSBpbiB2aWV3XG4gICAgICAgICAgICAgIGlmICggZWxlbWVudE9mZnNldCA+IHBhZ2VPZmZzZXQgJiYgZWxlbWVudE9mZnNldCA8IHBhZ2VPZmZzZXQgKyB3aW5kb3cuaW5uZXJIZWlnaHQgKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIC8vIG5vdGU6IGF2b2lkIHVzaW5nIGFuaW1hdGUsIGFzIGl0IHByZXZlbnRzIHRoZSB2YWxpZGF0aW9uIG1lc3NhZ2UgZGlzcGxheWluZyBjb3JyZWN0bHlcbiAgICAgICAgICAgICAgJCggJ2h0bWwsIGJvZHknICkuc2Nyb2xsVG9wKCBlbGVtZW50T2Zmc2V0ICk7XG4gICAgICAgICAgfVxuICAgICAgfSApO1xuICAgIH0sIC8vIHNjcm9sbFRvRm9ybUVycm9yXG5cbiAgICBmb3JtU2V0dXA6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcblxuICAgICAgJChvcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5zdWJtaXQoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhhdC5mb3JtUHJvY2Vzc29yKHRoYXQsICdzdWJtaXQnKTtcblxuICAgICAgfSk7XG4gICAgfSwgLy8gZm9ybVNldHVwXG5cbiAgICBmb3JtUHJvY2Vzc29yOiBmdW5jdGlvbih0aGF0LCB0eXBlKSB7XG5cbiAgICAgIC8vIDEuIHJlbW92ZSBwcmV2aW91cyBlcnJvcnMgYW5kIHJlc2V0IHRoZSBidXR0b25cbiAgICAgIHRoYXQucmVzZXRGb3JtRXJyb3JzKHRoYXQub3B0aW9ucywgdGhhdC5lbGVtZW50KTtcblxuICAgICAgLy8gMi4gc2V0IHVwIHRoZSBidXR0b24gaWYgaXQncyBhIGZvcm0gc3VibWl0XG4gICAgICBpZiAodHlwZSA9PT0gJ3N1Ym1pdCcpIHtcbiAgICAgICAgdGhhdC5idXR0b25TdGF0dXModGhhdC5vcHRpb25zLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIHRydWUpO1xuICAgICAgfVxuXG4gICAgICAvLyAzLiBnZW5lcmF0ZSBiaWxsaW5nIGFkZHJlc3MgZGV0YWlsc1xuICAgICAgdmFyIGJpbGxpbmdEZXRhaWxzID0gdGhhdC5nZW5lcmF0ZUJpbGxpbmdEZXRhaWxzKCk7XG5cbiAgICAgIC8vIDQuIGNyZWF0ZSBtaW5ucG9zdCB1c2VyIGFjY291bnRcbiAgICAgIHRoYXQuY3JlYXRlTWlublBvc3RBY2NvdW50KHRoYXQub3B0aW9ucywgdGhhdC5lbGVtZW50KTtcblxuICAgICAgLy8gNS4gZG8gdGhlIGNoYXJnaW5nIG9mIGNhcmQgb3IgYmFuayBhY2NvdW50IGlmIGl0J3MgYSBmb3JtIHN1Ym1pdFxuICAgICAgLy8gb3Igc3VibWl0IHRoZSBmb3JtIGlmIHRoaXMgaXMgYSBwYXltZW50IHJlcXVlc3QgYnV0dG9uXG4gICAgICBpZiAodHlwZSA9PT0gJ3N1Ym1pdCcpIHtcbiAgICAgICAgdmFyIHBheW1lbnRfdHlwZSA9ICQoJ2lucHV0W25hbWU9XCJzdHJpcGVfcGF5bWVudF90eXBlXCJdJykudmFsKCk7XG4gICAgICAgIGlmIChwYXltZW50X3R5cGUgIT09ICdiYW5rX2FjY291bnQnKSB7XG4gICAgICAgICAgLy8gZmluYWxseSwgZ2V0IGEgcGF5bWVudCBtZXRob2QgZnJvbSBzdHJpcGUsIGFuZCB0cnkgdG8gY2hhcmdlIGl0IGlmIGl0IGlzIG5vdCBhY2hcbiAgICAgICAgICB0aGF0LmNyZWF0ZVBheW1lbnRNZXRob2QodGhhdC5jYXJkTnVtYmVyRWxlbWVudCwgYmlsbGluZ0RldGFpbHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGlmIGl0IGlzIGFjaCwgd2UgYWxyZWFkeSBoYXZlIGEgdG9rZW4gc28gc3VibWl0IHRoZSBmb3JtXG4gICAgICAgICAgLy8gdG9kbzogdXBncmFkZSB0aGUgcGxhaWQgaW50ZWdyYXRpb25cbiAgICAgICAgICB0aGF0LmJhbmtUb2tlbkhhbmRsZXIoICQoJ2lucHV0W25hbWU9XCJiYW5rVG9rZW5cIl0nKS52YWwoKSwgJ2JhbmtfYWNjb3VudCcgKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhhdC5zdWJtaXRGb3JtT25seSgpO1xuICAgICAgfVxuICAgIH0sIC8vIGZvcm1Qcm9jZXNzb3JcblxuICAgIHN0cmlwZUVycm9yRGlzcGxheTogZnVuY3Rpb24oZXJyb3IsIHRoaXNfc2VsZWN0b3IsIGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIC8vIGxpc3RlbiBmb3IgZXJyb3JzIGFuZCBkaXNwbGF5L2hpZGUgZXJyb3IgbWVzc2FnZXNcbiAgICAgIHZhciB3aGljaF9lcnJvciA9IHRoaXNfc2VsZWN0b3IuYXR0cignaWQnKTtcbiAgICAgIC8vIHdoZW4gdGhpcyBmaWVsZCBjaGFuZ2VzLCByZXNldCBpdHMgZXJyb3JzXG4gICAgICAkKCcuYS1jYXJkLWluc3RydWN0aW9uLicgKyB3aGljaF9lcnJvcikucmVtb3ZlQ2xhc3MoJ2EtdmFsaWRhdGlvbi1lcnJvcicpO1xuICAgICAgJCgnLmEtY2FyZC1pbnN0cnVjdGlvbi4nICsgd2hpY2hfZXJyb3IpLmVtcHR5KCk7XG4gICAgICAkKHRoaXNfc2VsZWN0b3IpLnJlbW92ZUNsYXNzKCdhLWVycm9yJyk7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgJCgnLmEtY2FyZC1pbnN0cnVjdGlvbi4nICsgd2hpY2hfZXJyb3IpLnRleHQoZXJyb3IubWVzc2FnZSk7XG4gICAgICAgICQoJy5hLWNhcmQtaW5zdHJ1Y3Rpb24uJyArIHdoaWNoX2Vycm9yKS5hZGRDbGFzcygnYS12YWxpZGF0aW9uLWVycm9yJyk7XG4gICAgICAgIHRoaXNfc2VsZWN0b3IucGFyZW50KCkuYWRkQ2xhc3MoJ20taGFzLXZhbGlkYXRpb24tZXJyb3InKTtcbiAgICAgICAgJCh0aGlzX3NlbGVjdG9yKS5hZGRDbGFzcygnYS1lcnJvcicpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJCh0aGlzX3NlbGVjdG9yKS5yZW1vdmVDbGFzcygnYS1lcnJvcicpO1xuICAgICAgICAkKCcuYS1jYXJkLWluc3RydWN0aW9uLicgKyB3aGljaF9lcnJvcikucmVtb3ZlQ2xhc3MoJ2EtdmFsaWRhdGlvbi1lcnJvcicpO1xuICAgICAgICAkKCcuYS1jYXJkLWluc3RydWN0aW9uLicgKyB3aGljaF9lcnJvcikuZW1wdHkoKTtcbiAgICAgICAgJChvcHRpb25zLmNjX251bV9zZWxlY3RvciwgZWxlbWVudCkucmVtb3ZlQ2xhc3MoJ2EtdmFsaWRhdGlvbi1lcnJvcicpO1xuICAgICAgICAkKG9wdGlvbnMuY2NfZXhwX3NlbGVjdG9yLCBlbGVtZW50KS5yZW1vdmVDbGFzcygnYS12YWxpZGF0aW9uLWVycm9yJyk7XG4gICAgICAgICQob3B0aW9ucy5jY19jdmNfc2VsZWN0b3IsIGVsZW1lbnQpLnJlbW92ZUNsYXNzKCdhLXZhbGlkYXRpb24tZXJyb3InKTtcbiAgICAgICAgJChvcHRpb25zLmNjX251bV9zZWxlY3RvciwgZWxlbWVudCkucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ20taGFzLXZhbGlkYXRpb24tZXJyb3InKTtcbiAgICAgICAgJChvcHRpb25zLmNjX2V4cF9zZWxlY3RvciwgZWxlbWVudCkucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ20taGFzLXZhbGlkYXRpb24tZXJyb3InKTtcbiAgICAgICAgJChvcHRpb25zLmNjX2N2Y19zZWxlY3RvciwgZWxlbWVudCkucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ20taGFzLXZhbGlkYXRpb24tZXJyb3InKTtcbiAgICAgIH1cbiAgICB9LCAvLyBzdHJpcGVFcnJvckRpc3BsYXlcblxuICAgIHJlc2V0Rm9ybUVycm9yczogZnVuY3Rpb24ob3B0aW9ucywgZWxlbWVudCkge1xuICAgICAgJCgnLmEtdmFsaWRhdGlvbi1lcnJvcicpLnJlbW92ZSgpO1xuICAgICAgJCgnaW5wdXQsIGxhYmVsLCBkaXYnLCBlbGVtZW50KS5yZW1vdmVDbGFzcygnYS1lcnJvcicpO1xuICAgICAgJCgnbGFiZWwnLCBlbGVtZW50KS5yZW1vdmVDbGFzcygnbS1oYXMtdmFsaWRhdGlvbi1lcnJvcicpO1xuICAgICAgJChvcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yLCBlbGVtZW50KS5yZW1vdmVDbGFzcygnYS1lcnJvciBpbnZhbGlkJyk7XG4gICAgICAkKCcuYS12YWxpZGF0aW9uLWVycm9yJykucmVtb3ZlKCk7XG4gICAgICBcbiAgICAgICQob3B0aW9ucy5jaG9vc2VfcGF5bWVudCArICcgaW5wdXQnKS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgICQob3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvciArICcgLmEtZXJyb3InKS5yZW1vdmUoKTsgLy8gcmVtb3ZlIG1ldGhvZCBlcnJvciBtZXNzYWdlIGlmIGl0IGlzIHRoZXJlXG4gICAgICAgICQob3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvcikucGFyZW50KCkuZmluZCgnLmEtdmFsaWRhdGlvbi1lcnJvcicpLnJlbW92ZSgpO1xuICAgICAgICAvLyBpZiBhIHBheW1lbnQgZmllbGQgY2hhbmdlZCwgcmVzZXQgdGhlIGJ1dHRvblxuICAgICAgICBidXR0b25TdGF0dXMob3B0aW9ucywgJChvcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKSwgZmFsc2UpO1xuICAgICAgfSk7XG4gICAgfSwgLy8gcmVzZXRGb3JtRXJyb3JzXG4gICAgXG4gICAgY3JlYXRlTWlublBvc3RBY2NvdW50OiBmdW5jdGlvbihvcHRpb25zLCBlbGVtZW50KSB7XG4gICAgICAvLyAyLiBjcmVhdGUgbWlubnBvc3QgYWNjb3VudCBpZiBzcGVjaWZpZWRcbiAgICAgIGlmIChvcHRpb25zLmNyZWF0ZV9hY2NvdW50ID09PSB0cnVlKSB7XG4gICAgICAgIHZhciB1c2VyID0ge1xuICAgICAgICAgIGVtYWlsOiAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgIGZpcnN0X25hbWU6ICQob3B0aW9ucy5maXJzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICBsYXN0X25hbWU6ICQob3B0aW9ucy5sYXN0X25hbWVfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgIHBhc3N3b3JkOiAkKG9wdGlvbnMucGFzc3dvcmRfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgIGNpdHk6ICQob3B0aW9ucy5iaWxsaW5nX2NpdHlfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgIHN0YXRlOiAkKG9wdGlvbnMuYmlsbGluZ19zdGF0ZV9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgemlwOiAkKG9wdGlvbnMuYmlsbGluZ196aXBfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICB9O1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIHVybDogb3B0aW9ucy5taW5ucG9zdF9yb290ICsgJy93cC1qc29uL3VzZXItYWNjb3VudC1tYW5hZ2VtZW50L3YxL2NyZWF0ZS11c2VyJyxcbiAgICAgICAgICBkYXRhOiB1c2VyXG4gICAgICAgIH0pLmRvbmUoZnVuY3Rpb24oIGRhdGEgKSB7XG4gICAgICAgICAgaWYgKGRhdGEuc3RhdHVzID09PSAnc3VjY2VzcycgJiYgZGF0YS5yZWFzb24gPT09ICduZXcgdXNlcicpIHtcbiAgICAgICAgICAgIC8vIHVzZXIgY3JlYXRlZCAtIHRoZXkgc2hvdWxkIHJlY2VpdmUgZW1haWxcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sIC8vIGNyZWF0ZU1pbm5Qb3N0QWNjb3VudFxuICAgIFxuICAgIGdlbmVyYXRlQmlsbGluZ0RldGFpbHM6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGJpbGxpbmdEZXRhaWxzID0ge307XG4gICAgICB2YXIgYWRkcmVzc0RldGFpbHMgPSB7fTtcblxuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yKS52YWwoKSAhPSAnJykge1xuICAgICAgICBiaWxsaW5nRGV0YWlscy5lbWFpbCA9ICQodGhpcy5vcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yKS52YWwoKTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgdmFyIGZ1bGxfbmFtZSA9ICcnO1xuICAgICAgaWYgKCQoJyNmdWxsX25hbWUnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGZ1bGxfbmFtZSA9ICQoJyNmdWxsX25hbWUnKS52YWwoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZ1bGxfbmFtZSA9ICQodGhpcy5vcHRpb25zLmZpcnN0X25hbWVfZmllbGRfc2VsZWN0b3IpLnZhbCgpICsgJyAnICsgJCh0aGlzLm9wdGlvbnMubGFzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yKS52YWwoKTtcbiAgICAgIH1cbiAgICAgIGJpbGxpbmdEZXRhaWxzLm5hbWUgPSBmdWxsX25hbWU7XG5cbiAgICAgIHZhciBzdHJlZXQgPSAnTm9uZSc7XG4gICAgICBpZiAoJCgnaW5wdXRbbmFtZT1cImZ1bGxfYWRkcmVzc1wiXScpLnZhbCgpICE9ICcnKSB7XG4gICAgICAgIHN0cmVldCA9ICQoJyNmdWxsX2FkZHJlc3MnKS52YWwoKTtcbiAgICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmJpbGxpbmdfc3RyZWV0X2ZpZWxkX3NlbGVjdG9yKS52YWwoKSAhPSAnJykge1xuICAgICAgICAgIHN0cmVldCA9ICQodGhpcy5vcHRpb25zLmJpbGxpbmdfc3RyZWV0X2ZpZWxkX3NlbGVjdG9yKS52YWwoKTtcbiAgICAgICAgfVxuICAgICAgICBhZGRyZXNzRGV0YWlscy5saW5lMSA9IHN0cmVldDtcbiAgICAgIH1cblxuICAgICAgdmFyIGNpdHkgPSAnTm9uZSc7XG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuYWNjb3VudF9jaXR5X3NlbGVjdG9yKS52YWwoKSAhPSAnJykge1xuICAgICAgICBjaXR5ID0gJCh0aGlzLm9wdGlvbnMuYWNjb3VudF9jaXR5X3NlbGVjdG9yKS52YWwoKTtcbiAgICAgICAgYWRkcmVzc0RldGFpbHMuY2l0eSA9IGNpdHk7XG4gICAgICB9XG5cbiAgICAgIHZhciBzdGF0ZSA9ICdOb25lJztcbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5hY2NvdW50X3N0YXRlX3NlbGVjdG9yKS52YWwoKSAhPSAnJykge1xuICAgICAgICBzdGF0ZSA9ICQodGhpcy5vcHRpb25zLmFjY291bnRfc3RhdGVfc2VsZWN0b3IpLnZhbCgpO1xuICAgICAgICBhZGRyZXNzRGV0YWlscy5zdGF0ZSA9IHN0YXRlO1xuICAgICAgfVxuXG4gICAgICB2YXIgemlwID0gJ05vbmUnO1xuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmFjY291bnRfemlwX3NlbGVjdG9yKS52YWwoKSAhPSAnJykge1xuICAgICAgICB6aXAgPSAkKHRoaXMub3B0aW9ucy5hY2NvdW50X3ppcF9zZWxlY3RvcikudmFsKCk7XG4gICAgICAgIGFkZHJlc3NEZXRhaWxzLnBvc3RhbF9jb2RlID0gemlwO1xuICAgICAgfVxuXG4gICAgICB2YXIgY291bnRyeSA9ICdVUyc7XG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuYmlsbGluZ19jb3VudHJ5X2ZpZWxkX3NlbGVjdG9yKS52YWwoKSAhPSAnJykge1xuICAgICAgICBjb3VudHJ5ID0gJCh0aGlzLm9wdGlvbnMuYmlsbGluZ19jb3VudHJ5X2ZpZWxkX3NlbGVjdG9yKS52YWwoKTtcbiAgICAgIH1cbiAgICAgIGFkZHJlc3NEZXRhaWxzLmNvdW50cnkgPSBjb3VudHJ5O1xuXG4gICAgICBpZiAoc3RyZWV0ICE9PSAnTm9uZScgfHwgY2l0eSAhPT0gJ05vbmUnIHx8IHN0YXRlICE9PSAnTm9uZScgfHwgemlwICE9PSAnTm9uZScpIHtcbiAgICAgICAgYmlsbGluZ0RldGFpbHMuYWRkcmVzcyA9IGFkZHJlc3NEZXRhaWxzO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gYmlsbGluZ0RldGFpbHM7XG4gICAgfSwgLy8gZ2VuZXJhdGVCaWxsaW5nRGV0YWlsc1xuXG4gICAgY3JlYXRlUGF5bWVudE1ldGhvZDogZnVuY3Rpb24oY2FyZEVsZW1lbnQsIGJpbGxpbmdEZXRhaWxzKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB0aGF0LnN0cmlwZS5jcmVhdGVQYXltZW50TWV0aG9kKHtcbiAgICAgICAgdHlwZTogJ2NhcmQnLFxuICAgICAgICBjYXJkOiBjYXJkRWxlbWVudCxcbiAgICAgICAgYmlsbGluZ19kZXRhaWxzOiBiaWxsaW5nRGV0YWlsc1xuICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICBpZiAocmVzcG9uc2UuZXJyb3IpIHtcbiAgICAgICAgICB0aGF0LmhhbmRsZVNlcnZlckVycm9yKHJlc3BvbnNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBTZW5kIHBheW1lbnRNZXRob2QuaWQgdG8gc2VydmVyXG4gICAgICAgICAgdmFyIHN1cHBvcnRmb3JtID0gJCh0aGF0Lm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpO1xuICAgICAgICAgIHZhciBhamF4X3VybCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcbiAgICAgICAgICB2YXIgdG9rZW5GaWVsZE5hbWUgPSAncGF5bWVudF9tZXRob2RfaWQnO1xuICAgICAgICAgIHZhciB0b2tlbkZpZWxkID0gJ2lucHV0W25hbWU9XCInICsgdG9rZW5GaWVsZE5hbWUgKyAnXCJdJztcblxuICAgICAgICAgIC8vIEluc2VydCB0aGUgcGF5bWVudCBtZXRob2QgSUQgaW50byB0aGUgZm9ybSBzbyBpdCBnZXRzIHN1Ym1pdHRlZCB0byB0aGUgc2VydmVyXG4gICAgICAgICAgaWYgKCQodG9rZW5GaWVsZCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgJCh0b2tlbkZpZWxkKS52YWwocmVzcG9uc2UucGF5bWVudE1ldGhvZC5pZCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN1cHBvcnRmb3JtLmFwcGVuZCgkKCc8aW5wdXQgdHlwZT1cXFwiaGlkZGVuXFxcIiBuYW1lPVwiJyArIHRva2VuRmllbGROYW1lICsgJ1wiPicpLnZhbChyZXNwb25zZS5wYXltZW50TWV0aG9kLmlkKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZmV0Y2goYWpheF91cmwsIHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBib2R5OiAkKHN1cHBvcnRmb3JtKS5zZXJpYWxpemUoKVxuICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIC8vIEhhbmRsZSBzZXJ2ZXIgcmVzcG9uc2UgKHNlZSBTdGVwIDMpXG4gICAgICAgICAgICByZXNwb25zZS5qc29uKCkudGhlbihmdW5jdGlvbihqc29uKSB7XG4gICAgICAgICAgICAgIHRoYXQuaGFuZGxlU2VydmVyUmVzcG9uc2UoanNvbik7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LCAvLyBjcmVhdGVQYXltZW50TWV0aG9kXG5cbiAgICBiYW5rVG9rZW5IYW5kbGVyOiBmdW5jdGlvbih0b2tlbiwgdHlwZSkge1xuICAgICAgdGhhdC5zZXRTdHJpcGVQYXltZW50VHlwZSh0eXBlKTtcbiAgICAgIHRoYXQuc3VibWl0Rm9ybU9ubHkoKTtcbiAgICB9LCAvLyBiYW5rVG9rZW5IYW5kbGVyXG5cbiAgICBzdWJtaXRGb3JtT25seTogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB2YXIgc3VwcG9ydGZvcm0gPSAkKHRoaXMub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3Rvcik7XG4gICAgICB2YXIgYWpheF91cmwgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG5cbiAgICAgIC8vIFN1Ym1pdCB0aGUgZm9ybVxuICAgICAgLy8gdGhlIHdheSBpdCB3b3JrcyBjdXJyZW50bHkgaXMgdGhlIGZvcm0gc3VibWl0cyBhbiBhamF4IHJlcXVlc3QgdG8gaXRzZWxmXG4gICAgICAvLyB0aGVuIGl0IHN1Ym1pdHMgYSBwb3N0IHJlcXVlc3QgdG8gdGhlIGZvcm0ncyBhY3Rpb24gdXJsXG4gICAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IGFqYXhfdXJsLFxuICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgIGRhdGE6ICQoc3VwcG9ydGZvcm0pLnNlcmlhbGl6ZSgpLFxuICAgICAgICB0eXBlOiAnUE9TVCdcbiAgICAgIH0pXG4gICAgICAuZG9uZShmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICBpZiAodHlwZW9mIHJlc3BvbnNlLmVycm9ycyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICB0aGF0LmhhbmRsZVNlcnZlckVycm9yKHJlc3BvbnNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdXBwb3J0Zm9ybS5nZXQoMCkuc3VibWl0KCk7IC8vIGNvbnRpbnVlIHN1Ym1pdHRpbmcgdGhlIGZvcm0gaWYgdGhlIGFqYXggd2FzIHN1Y2Nlc3NmdWxcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5lcnJvcihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICB0aGF0LmJ1dHRvblN0YXR1cyh0aGF0Lm9wdGlvbnMsICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKSwgZmFsc2UpO1xuICAgICAgfSk7XG4gICAgfSwgLy8gc3VibWl0Rm9ybU9ubHlcblxuICAgIGhhbmRsZVNlcnZlclJlc3BvbnNlOiBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgdmFyIHN1cHBvcnRmb3JtID0gJCh0aGlzLm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpO1xuICAgICAgaWYgKHJlc3BvbnNlLmVycm9ycykge1xuICAgICAgICAvLyBTaG93IGVycm9yIGZyb20gc2VydmVyIG9uIHBheW1lbnQgZm9ybVxuICAgICAgICB0aGlzLmhhbmRsZVNlcnZlckVycm9yKHJlc3BvbnNlKTtcbiAgICAgIH0gZWxzZSBpZiAocmVzcG9uc2UucmVxdWlyZXNfYWN0aW9uKSB7XG4gICAgICAgIC8vIFVzZSBTdHJpcGUuanMgdG8gaGFuZGxlIHJlcXVpcmVkIGNhcmQgYWN0aW9uXG4gICAgICAgIC8vaGFuZGxlQWN0aW9uKHJlc3BvbnNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN1cHBvcnRmb3JtLmdldCgwKS5zdWJtaXQoKTsgLy8gY29udGludWUgc3VibWl0dGluZyB0aGUgZm9ybSBpZiB0aGUgYWpheCB3YXMgc3VjY2Vzc2Z1bFxuICAgICAgfVxuICAgIH0sIC8vIGhhbmRsZVNlcnZlclJlc3BvbnNlXG5cbiAgICBoYW5kbGVTZXJ2ZXJFcnJvcjogZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHZhciB0aGlzX2ZpZWxkID0gJyc7XG4gICAgICAvLyBkbyBub3Qgc3VibWl0LiB0aGVyZSBpcyBhbiBlcnJvci5cbiAgICAgIHRoYXQuYnV0dG9uU3RhdHVzKHRoYXQub3B0aW9ucywgJCh0aGF0Lm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLmZpbmQoJ2J1dHRvbicpLCBmYWxzZSk7XG4gICAgICAvLyBoYW5kbGUgZXJyb3IgZGlzcGxheVxuICAgICAgaWYgKHR5cGVvZiByZXNwb25zZS5lcnJvcnMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVzcG9uc2UuZXJyb3JzWzBdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIHRoaXNfZmllbGQgPSByZXNwb25zZS5lcnJvcnNbMF0uZmllbGQgKyAnX2ZpZWxkX3NlbGVjdG9yJztcbiAgICAgICAgfVxuICAgICAgICAkLmVhY2gocmVzcG9uc2UuZXJyb3JzLCBmdW5jdGlvbiggaW5kZXgsIGVycm9yICkge1xuICAgICAgICAgIGlmICh0eXBlb2YgZXJyb3IuZmllbGQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB0aGlzX2ZpZWxkID0gZXJyb3IuZmllbGQgKyAnX2ZpZWxkX3NlbGVjdG9yJztcbiAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBlcnJvci5wYXJhbSAhPT0gJ3VuZGVmaW5lZCcgJiYgZXJyb3IucGFyYW0gIT09ICcnKSB7XG4gICAgICAgICAgICB0aGlzX2ZpZWxkID0gJ2NjXycgKyBlcnJvci5wYXJhbSArICdfc2VsZWN0b3InOyAgXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoYXQuZGlzcGxheUVycm9yTWVzc2FnZShlcnJvciwgdGhpc19maWVsZCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgaWYgKCQodGhhdC5vcHRpb25zW3RoaXNfZmllbGRdKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICBzY3JvbGxUb3A6ICQodGhhdC5vcHRpb25zW3RoaXNfZmllbGRdKS5wYXJlbnQoKS5vZmZzZXQoKS50b3BcbiAgICAgICAgfSwgMjAwMCk7XG4gICAgICB9XG4gICAgfSwgLy8gaGFuZGxlU2VydmVyRXJyb3JcblxuICAgIGRpc3BsYXlFcnJvck1lc3NhZ2UoZXJyb3IsIGZpZWxkKSB7XG4gICAgICB2YXIgbWVzc2FnZSA9ICcnO1xuICAgICAgdmFyIHN0cmlwZUVycm9yU2VsZWN0b3IgPSAnJztcbiAgICAgIHZhciBmaWVsZFBhcmVudCA9ICQodGhpcy5vcHRpb25zW2ZpZWxkXSkucGFyZW50KCk7XG4gICAgICBpZiAodHlwZW9mIGVycm9yLm1lc3NhZ2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIG1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWVzc2FnZSA9IGVycm9yLm1lc3NhZ2VbMF07XG4gICAgICB9XG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnNbZmllbGRdKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICQodGhpcy5vcHRpb25zW2ZpZWxkXSkuYWRkQ2xhc3MoJ2EtZXJyb3InKTtcbiAgICAgICAgJCh0aGlzLm9wdGlvbnNbZmllbGRdKS5wcmV2KCkuYWRkQ2xhc3MoJ2EtZXJyb3InKTtcbiAgICAgICAgaWYgKCQoJy5hLWNhcmQtaW5zdHJ1Y3Rpb24nLCBmaWVsZFBhcmVudCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICQoJy5hLWNhcmQtaW5zdHJ1Y3Rpb24nLCBmaWVsZFBhcmVudCkuYWRkQ2xhc3MoJ2EtdmFsaWRhdGlvbi1lcnJvcicpO1xuICAgICAgICAgICQoJy5hLWNhcmQtaW5zdHJ1Y3Rpb24nLCBmaWVsZFBhcmVudCkudGV4dChtZXNzYWdlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkKHRoaXMub3B0aW9uc1tmaWVsZF0pLmFmdGVyKCc8cCBjbGFzcz1cImEtY2FyZC1pbnN0cnVjdGlvbiBhLXZhbGlkYXRpb24tZXJyb3JcIj4nICsgbWVzc2FnZSArICc8L3A+Jyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGVycm9yICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aGlzLmJ1dHRvblN0YXR1cyh0aGlzLm9wdGlvbnMsICQodGhpcy5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKSwgZmFsc2UpO1xuICAgICAgICBpZiAoZXJyb3IuY29kZSA9PT0gJ2luY29tcGxldGVfbnVtYmVyJyB8fCBlcnJvci5jb2RlID09ICdpbnZhbGlkX251bWJlcicgfHwgZXJyb3IuY29kZSA9PSAnaW5jb3JyZWN0X251bWJlcicgfHwgZXJyb3IuY29kZSA9PSAnY2FyZF9kZWNsaW5lZCcgfHwgZXJyb3IuY29kZSA9PSAncHJvY2Vzc2luZ19lcnJvcicpIHtcbiAgICAgICAgICAvLyBlcnJvciBoYW5kbGluZ1xuICAgICAgICAgIHN0cmlwZUVycm9yU2VsZWN0b3IgPSAkKHRoaXMub3B0aW9ucy5jY19udW1fc2VsZWN0b3IpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJvci5jb2RlID09ICdpbnZhbGlkX2V4cGlyeV9tb250aCcgfHwgZXJyb3IuY29kZSA9PSAnaW52YWxpZF9leHBpcnlfeWVhcicgfHwgZXJyb3IuY29kZSA9PSAnZXhwaXJlZF9jYXJkJykge1xuICAgICAgICAgIC8vIGVycm9yIGhhbmRsaW5nXG4gICAgICAgICAgc3RyaXBlRXJyb3JTZWxlY3RvciA9ICQodGhpcy5vcHRpb25zLmNjX2V4cF9zZWxlY3Rvcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9yLmNvZGUgPT0gJ2ludmFsaWRfY3ZjJyB8fCBlcnJvci5jb2RlID09ICdpbmNvcnJlY3RfY3ZjJykge1xuICAgICAgICAgIC8vIGVycm9yIGhhbmRsaW5nXG4gICAgICAgICAgc3RyaXBlRXJyb3JTZWxlY3RvciA9ICQodGhpcy5vcHRpb25zLmNjX2N2Y19zZWxlY3Rvcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN0cmlwZUVycm9yU2VsZWN0b3IgIT09ICcnKSB7XG4gICAgICAgICAgdGhpcy5zdHJpcGVFcnJvckRpc3BsYXkoZXJyb3IsIHN0cmlwZUVycm9yU2VsZWN0b3IsIHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9yLmZpZWxkID09ICdyZWNhcHRjaGEnKSB7XG4gICAgICAgICAgJCh0aGlzLm9wdGlvbnMucGF5X2J1dHRvbl9zZWxlY3RvcikuYmVmb3JlKCc8cCBjbGFzcz1cImEtZm9ybS1jYXB0aW9uIGEtdmFsaWRhdGlvbi1lcnJvciBhLXJlY2FwdGNoYS1lcnJvclwiPicgKyBtZXNzYWdlICsgJzwvcD4nKVxuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJvci50eXBlID09ICdpbnZhbGlkX3JlcXVlc3RfZXJyb3InKSB7XG4gICAgICAgICAgJCh0aGlzLm9wdGlvbnMucGF5X2J1dHRvbl9zZWxlY3RvcikuYmVmb3JlKCc8cCBjbGFzcz1cImEtZm9ybS1jYXB0aW9uIGEtdmFsaWRhdGlvbi1lcnJvclwiPicgKyBlcnJvci5tZXNzYWdlICsgJzwvcD4nKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwgLy8gZGlzcGxheUVycm9yTWVzc2FnZVxuXG4gICAgc2hvd05ld3NsZXR0ZXJTZXR0aW5nczogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuXG4gICAgICB2YXIgbmV3c2xldHRlcl9ncm91cF9odG1sID0gJyc7XG4gICAgICBpZiAoJChvcHRpb25zLm5ld3NsZXR0ZXJfZ3JvdXBfc2VsZWN0b3IpLmxlbmd0aCA+IDAgKSB7XG4gICAgICAgIHZhciBnZXRfZGF0YSA9IHtcbiAgICAgICAgICBzaG9ydGNvZGU6ICduZXdzbGV0dGVyX2Zvcm0nLFxuICAgICAgICAgIHBsYWNlbWVudDogJ3VzZXJhY2NvdW50J1xuICAgICAgICB9O1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgdXJsOiBvcHRpb25zLm1pbm5wb3N0X3Jvb3QgKyAnL3dwLWpzb24vbWlubnBvc3QtYXBpL3YyL21haWxjaGltcC9mb3JtJyxcbiAgICAgICAgICBkYXRhOiBnZXRfZGF0YVxuICAgICAgICB9KS5kb25lKGZ1bmN0aW9uKCByZXN1bHQgKSB7XG4gICAgICAgICAgaWYgKCB0eXBlb2YgcmVzdWx0Lmdyb3VwX2ZpZWxkcyAhPT0gJ3VuZGVmaW5lZCcgKSB7XG4gICAgICAgICAgICAkLmVhY2gocmVzdWx0Lmdyb3VwX2ZpZWxkcywgZnVuY3Rpb24oIGluZGV4LCBjYXRlZ29yeSApIHtcbiAgICAgICAgICAgICAgbmV3c2xldHRlcl9ncm91cF9odG1sICs9ICc8ZmllbGRzZXQgY2xhc3M9XCJtLWZvcm0taXRlbSBzdXBwb3J0LW5ld3NsZXR0ZXIgbS1mb3JtLWl0ZW0tJyArIGNhdGVnb3J5LnR5cGUgKyAnXCI+JztcbiAgICAgICAgICAgICAgbmV3c2xldHRlcl9ncm91cF9odG1sICs9ICc8bGFiZWw+JyArIGNhdGVnb3J5Lm5hbWUgKyAnOjwvbGFiZWw+JztcbiAgICAgICAgICAgICAgaWYgKCBjYXRlZ29yeS5jb250YWlucy5sZW5ndGggPiAwICkge1xuICAgICAgICAgICAgICAgIG5ld3NsZXR0ZXJfZ3JvdXBfaHRtbCArPSAnPGRpdiBjbGFzcz1cIm0tZm9ybS1pdGVtIG0tZm9ybS1pdGVtLW5ld3NsZXR0ZXJcIj4nO1xuICAgICAgICAgICAgICAgICQuZWFjaChjYXRlZ29yeVtjYXRlZ29yeS5jb250YWluc10sIGZ1bmN0aW9uKCBpbmRleCwgaXRlbSApIHtcbiAgICAgICAgICAgICAgICAgIG5ld3NsZXR0ZXJfZ3JvdXBfaHRtbCArPSAnPGxhYmVsPjxpbnB1dCBuYW1lPVwiZ3JvdXBzX3N1Ym1pdHRlZFwiIHR5cGU9XCJjaGVja2JveFwiIHZhbHVlPVwiJyArIGl0ZW0uaWQgKyAnXCI+JyArIGl0ZW0ubmFtZSArICc8L2xhYmVsPic7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbmV3c2xldHRlcl9ncm91cF9odG1sICs9ICc8L2Rpdj4nO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIG5ld3NsZXR0ZXJfZ3JvdXBfaHRtbCArPSAnPC9maWVsZHNldD4nO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkKG9wdGlvbnMubmV3c2xldHRlcl9ncm91cF9zZWxlY3RvcikuaHRtbChuZXdzbGV0dGVyX2dyb3VwX2h0bWwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmICgkKG9wdGlvbnMubmV3c2xldHRlcl9ncm91cF9zZWxlY3RvcikubGVuZ3RoID4gMCAmJiB0eXBlb2YgJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdmFyIGdldF9kYXRhID0ge1xuICAgICAgICAgIGVtYWlsOiAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpXG4gICAgICAgIH07XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICB1cmw6IG9wdGlvbnMubWlubnBvc3Rfcm9vdCArICcvd3AtanNvbi9taW5ucG9zdC1hcGkvdjIvbWFpbGNoaW1wL3VzZXInLFxuICAgICAgICAgIGRhdGE6IGdldF9kYXRhXG4gICAgICAgIH0pLmRvbmUoZnVuY3Rpb24oIHJlc3VsdCApIHtcbiAgICAgICAgICBpZiAoIHR5cGVvZiByZXN1bHQubWFpbGNoaW1wX3N0YXR1cyAhPT0gJ3VuZGVmaW5lZCcgKSB7XG4gICAgICAgICAgICAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLmFmdGVyKCc8aW5wdXQgbmFtZT1cIm1haWxjaGltcF9zdGF0dXNcIiB0eXBlPVwiaGlkZGVuXCIgdmFsdWU9XCInICsgcmVzdWx0Lm1haWxjaGltcF9zdGF0dXMgKyAnXCI+Jyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICggdHlwZW9mIHJlc3VsdC5tYWlsY2hpbXBfdXNlcl9pZCAhPT0gJ3VuZGVmaW5lZCcgKSB7XG4gICAgICAgICAgICAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLmFmdGVyKCc8aW5wdXQgbmFtZT1cIm1haWxjaGltcF91c2VyX2lkXCIgdHlwZT1cImhpZGRlblwiIHZhbHVlPVwiJyArIHJlc3VsdC5tYWlsY2hpbXBfdXNlcl9pZCArICdcIj4nKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHJlc3VsdC5tYWlsY2hpbXBfc3RhdHVzID09PSAnc3Vic2NyaWJlZCcpIHtcbiAgICAgICAgICAgIC8vIHVzZXIgY3JlYXRlZCAtIHNob3cgYSBzdWNjZXNzIG1lc3NhZ2VcbiAgICAgICAgICAgICQoJy5hLWNvbmZpcm0taW5zdHJ1Y3Rpb25zJykudGV4dCgkKCcuYS1jb25maXJtLWluc3RydWN0aW9ucycpLmF0dHIoJ2RhdGEta25vd24tdXNlcicpKTtcbiAgICAgICAgICAgIHZhciBncm91cHMgPSByZXN1bHQuZ3JvdXBzO1xuICAgICAgICAgICAgJC5lYWNoKGdyb3VwcywgZnVuY3Rpb24oIGluZGV4LCB2YWx1ZSApIHtcbiAgICAgICAgICAgICAgaWYgKCB2YWx1ZSA9PT0gdHJ1ZSApIHtcbiAgICAgICAgICAgICAgICAkKCc6Y2hlY2tib3hbdmFsdWU9XCInICsgaW5kZXggKyAnXCJdJykucHJvcCgnY2hlY2tlZCcsdHJ1ZSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJCgnOmNoZWNrYm94W3ZhbHVlPVwiJyArIGluZGV4ICsgJ1wiXScpLnByb3AoJ2NoZWNrZWQnLGZhbHNlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgIH0sIC8vIHNob3dOZXdzbGV0dGVyU2V0dGluZ3NcblxuICAgIGNvbmZpcm1NZXNzYWdlU3VibWl0OiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG5cbiAgICAgIHZhciBleGlzdGluZ19uZXdzbGV0dGVyX3NldHRpbmdzID0gJChvcHRpb25zLm5ld3NsZXR0ZXJfZ3JvdXBfc2VsZWN0b3IgKyAnIGlucHV0Jykuc2VyaWFsaXplKCk7XG4gICAgICAvL3RoaXMuZGVidWcoZXhpc3RpbmdfbmV3c2xldHRlcl9zZXR0aW5ncyk7XG5cbiAgICAgICQob3B0aW9ucy5jb25maXJtX2Zvcm1fc2VsZWN0b3IpLnN1Ym1pdChmdW5jdGlvbihldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIHZhciBjb25maXJtZm9ybSA9ICQob3B0aW9ucy5jb25maXJtX2Zvcm1fc2VsZWN0b3IpO1xuICAgICAgICAvLyBzdWJtaXQgc2V0dGluZ3MgdG8gbWFpbGNoaW1wXG4gICAgICAgIC8vIG5lZWQgdG8gZ2V0IHVzZXIgaW5mbyBvbiBhIGhpZGRlbiBmaWVsZCBoZXJlXG5cbiAgICAgICAgdmFyIG5ld3NsZXR0ZXJfZ3JvdXBzID0gJChvcHRpb25zLm5ld3NsZXR0ZXJfZ3JvdXBfc2VsZWN0b3IgKyAnIGlucHV0OmNoZWNrZWQnKTtcbiAgICAgICAgdmFyIG5ld19uZXdzbGV0dGVyX3NldHRpbmdzID0gbmV3c2xldHRlcl9ncm91cHMuc2VyaWFsaXplKCk7XG5cbiAgICAgICAgaWYgKChleGlzdGluZ19uZXdzbGV0dGVyX3NldHRpbmdzICE9PSBuZXdfbmV3c2xldHRlcl9zZXR0aW5ncykgJiYgKHR5cGVvZiBuZXdzbGV0dGVyX2dyb3VwcyAhPT0gJ3VuZGVmaW5lZCcpKSB7XG4gICAgICAgICAgLy9hZGQgb3VyIG93biBhamF4IGNoZWNrIGFzIFgtUmVxdWVzdGVkLVdpdGggaXMgbm90IGFsd2F5cyByZWxpYWJsZVxuICAgICAgICAgIC8vYWpheF9mb3JtX2RhdGEgPSBuZXdfbmV3c2xldHRlcl9zZXR0aW5ncyArICcmYWpheHJlcXVlc3Q9dHJ1ZSZzdWJzY3JpYmUnO1xuXG4gICAgICAgICAgdmFyIHBvc3RfZGF0YSA9IHtcbiAgICAgICAgICAgIGVtYWlsOiAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgICAgZmlyc3RfbmFtZTogJChvcHRpb25zLmZpcnN0X25hbWVfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgICAgbGFzdF9uYW1lOiAkKG9wdGlvbnMubGFzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICAgIGdyb3Vwc19zdWJtaXR0ZWQ6IHt9XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHBvc3RfZGF0YS5ncm91cHNfYXZhaWxhYmxlID0gJ2FsbCc7XG5cbiAgICAgICAgICBpZiAoICQoJ2lucHV0W25hbWU9XCJtYWlsY2hpbXBfc3RhdHVzXCJdJykubGVuZ3RoID4gMCApIHtcbiAgICAgICAgICAgIHBvc3RfZGF0YS5tYWlsY2hpbXBfc3RhdHVzID0gJCgnaW5wdXRbbmFtZT1cIm1haWxjaGltcF9zdGF0dXNcIl0nKS52YWwoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoICQoJ2lucHV0W25hbWU9XCJtYWlsY2hpbXBfdXNlcl9pZFwiXScpLmxlbmd0aCA+IDAgKSB7XG4gICAgICAgICAgICBwb3N0X2RhdGEubWFpbGNoaW1wX3VzZXJfaWQgPSAkKCdpbnB1dFtuYW1lPVwibWFpbGNoaW1wX3VzZXJfaWRcIl0nKS52YWwoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodHlwZW9mIG5ld3NsZXR0ZXJfZ3JvdXBzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgJC5lYWNoKG5ld3NsZXR0ZXJfZ3JvdXBzLCBmdW5jdGlvbihpbmRleCwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgdmFyIGdyb3VwID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgICAgICAgcG9zdF9kYXRhLmdyb3Vwc19zdWJtaXR0ZWRbaW5kZXhdID0gZ3JvdXA7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBvcHRpb25zLm1pbm5wb3N0X3Jvb3QgKyAnL3dwLWpzb24vbWlubnBvc3QtYXBpL3YyL21haWxjaGltcC91c2VyJyxcbiAgICAgICAgICAgIHR5cGU6ICdwb3N0JyxcbiAgICAgICAgICAgIGRhdGFUeXBlIDogJ2pzb24nLFxuICAgICAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04JyxcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHBvc3RfZGF0YSlcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5kb25lKGZ1bmN0aW9uKHJlc3BvbnNlKSB7IC8vIHJlc3BvbnNlIGZyb20gdGhlIFBIUCBhY3Rpb25cbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gJyc7XG4gICAgICAgICAgICBpZiAoIHJlc3BvbnNlLnN1Y2Nlc3MgPT09IHRydWUgKSB7XG4gICAgICAgICAgICAgIC8qc3dpdGNoIChyZXNwb25zZS5kYXRhLnVzZXJfc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnZXhpc3RpbmcnOlxuICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9ICdUaGFua3MgZm9yIHVwZGF0aW5nIHlvdXIgZW1haWwgcHJlZmVyZW5jZXMuIFRoZXkgd2lsbCBnbyBpbnRvIGVmZmVjdCBpbW1lZGlhdGVseS4nO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbmV3JzpcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnV2UgaGF2ZSBhZGRlZCB5b3UgdG8gdGhlIE1pbm5Qb3N0IG1haWxpbmcgbGlzdC4nO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncGVuZGluZyc6XG4gICAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ1dlIGhhdmUgYWRkZWQgeW91IHRvIHRoZSBNaW5uUG9zdCBtYWlsaW5nIGxpc3QuIFlvdSB3aWxsIG5lZWQgdG8gY2xpY2sgdGhlIGNvbmZpcm1hdGlvbiBsaW5rIGluIHRoZSBlbWFpbCB3ZSBzZW50IHRvIGJlZ2luIHJlY2VpdmluZyBtZXNzYWdlcy4nO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH0qL1xuICAgICAgICAgICAgICAvL2NvbmZpcm1mb3JtLmdldCgwKS5zdWJtaXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbmZpcm1mb3JtLmdldCgwKS5zdWJtaXQoKTtcbiAgICAgICAgICAgIC8vJCgnLm0taG9sZC1tZXNzYWdlJykuaHRtbCgnPGRpdiBjbGFzcz1cIm0tZm9ybS1tZXNzYWdlIG0tZm9ybS1tZXNzYWdlLWluZm9cIj4nICsgbWVzc2FnZSArICc8L2Rpdj4nKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAvLyB3ZSBzaG91bGQgcHV0IGFuIGFjdHVhbCBlcnJvciBtZXNzYWdlIGhlcmUgc29tZWRheSwgcHJvYmFibHlcbiAgICAgICAgICAgIC8vJCgnLm0taG9sZC1tZXNzYWdlJykuaHRtbCgnPGRpdiBjbGFzcz1cIm0tZm9ybS1tZXNzYWdlIG0tZm9ybS1tZXNzYWdlLWluZm9cIj5BbiBlcnJvciBoYXMgb2NjdXJlZC4gUGxlYXNlIHRyeSBhZ2Fpbi48L2Rpdj4nKTtcbiAgICAgICAgICAgIGNvbmZpcm1mb3JtLmdldCgwKS5zdWJtaXQoKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICB9IGVsc2UgeyAvLyBlbmQgcGFydCB3aGVyZSBzZXR0aW5ncyBjaGFuZ2VkXG4gICAgICAgICAgY29uZmlybWZvcm0uZ2V0KDApLnN1Ym1pdCgpO1xuICAgICAgICB9XG5cbiAgICAgIH0pO1xuICAgICAgLy9yZXR1cm4gZmFsc2U7XG4gICAgfSwgLy8gY29uZmlybU1lc3NhZ2VTdWJtaXRcblxuICB9OyAvLyBwbHVnaW4ucHJvdG90eXBlXG5cbiAgLy8gQSByZWFsbHkgbGlnaHR3ZWlnaHQgcGx1Z2luIHdyYXBwZXIgYXJvdW5kIHRoZSBjb25zdHJ1Y3RvcixcbiAgLy8gcHJldmVudGluZyBhZ2FpbnN0IG11bHRpcGxlIGluc3RhbnRpYXRpb25zXG4gICQuZm5bcGx1Z2luTmFtZV0gPSBmdW5jdGlvbiAoIG9wdGlvbnMgKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoISQuZGF0YSh0aGlzLCAncGx1Z2luXycgKyBwbHVnaW5OYW1lKSkge1xuICAgICAgICAkLmRhdGEodGhpcywgJ3BsdWdpbl8nICsgcGx1Z2luTmFtZSwgbmV3IFBsdWdpbiggdGhpcywgb3B0aW9ucyApKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxufSkoIGpRdWVyeSwgd2luZG93LCBkb2N1bWVudCApOyJdfQ==
}(jQuery));
