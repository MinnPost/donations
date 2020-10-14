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
      $(options.plaid_link).html('<a href="#" id="authorize-ach">Sign in to your bank account</a>');

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
      $(this.options.plaid_link).html('<img src="https://www.minnpost.com/wp-admin/images/spinner.gif" srcset="https://www.minnpost.com/wp-admin/images/spinner.gif 1x, https://www.minnpost.com/wp-admin/images/spinner-2x.gif 2x,">');
    },
    achFields: function achFields(element, options) {
      var bankTokenFieldName = 'bankToken';
      var bankTokenField = 'input[name="' + bankTokenFieldName + '"]';
      var that = this;

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
                $(options.plaid_link).after('<p class="error">' + response.error + '</p>');
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
              }
            }).error(function (response) {
              $(options.plaid_link).after('<p class="error">' + response.error + '</p>');
            });
          }
        });
        $(options.plaid_link + ' a').click(function (event) {
          event.preventDefault();
          $(options.payment_method_selector + ' .error').remove(); // remove method error message if it is there

          that.linkHandler.open();
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0cmlwZS5wYXltZW50LmpzIiwidmFsaWQtZm9ybS5taW4uanMiLCJtaW5ucG9zdC5naXZpbmcuanMiXSwibmFtZXMiOlsiZiIsImV4cG9ydHMiLCJtb2R1bGUiLCJkZWZpbmUiLCJhbWQiLCJnIiwid2luZG93IiwiZ2xvYmFsIiwic2VsZiIsInBheW1lbnQiLCJqcyIsImUiLCJ0IiwibiIsInIiLCJzIiwibyIsInUiLCJhIiwicmVxdWlyZSIsImkiLCJFcnJvciIsImNvZGUiLCJsIiwiY2FsbCIsImxlbmd0aCIsIlFKIiwicnJldHVybiIsInJ0cmltIiwic2VsZWN0b3IiLCJpc0RPTUVsZW1lbnQiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJlbCIsIm5vZGVOYW1lIiwidHJpbSIsInRleHQiLCJyZXBsYWNlIiwidmFsIiwicmV0IiwiYXJndW1lbnRzIiwidmFsdWUiLCJwcmV2ZW50RGVmYXVsdCIsImV2ZW50T2JqZWN0IiwicmV0dXJuVmFsdWUiLCJub3JtYWxpemVFdmVudCIsIm9yaWdpbmFsIiwid2hpY2giLCJ0YXJnZXQiLCJzcmNFbGVtZW50Iiwib3JpZ2luYWxFdmVudCIsImRhdGEiLCJkZXRhaWwiLCJjaGFyQ29kZSIsImtleUNvZGUiLCJvbiIsImVsZW1lbnQiLCJldmVudE5hbWUiLCJjYWxsYmFjayIsImoiLCJsZW4iLCJsZW4xIiwibXVsdEV2ZW50TmFtZSIsIm9yaWdpbmFsQ2FsbGJhY2siLCJyZWYiLCJtYXRjaCIsInNwbGl0IiwiYWRkRXZlbnRMaXN0ZW5lciIsImF0dGFjaEV2ZW50IiwiYWRkQ2xhc3MiLCJjbGFzc05hbWUiLCJyZXN1bHRzIiwicHVzaCIsImNsYXNzTGlzdCIsImFkZCIsImhhc0NsYXNzIiwiY29udGFpbnMiLCJSZWdFeHAiLCJ0ZXN0IiwicmVtb3ZlQ2xhc3MiLCJjbHMiLCJyZW1vdmUiLCJqb2luIiwidG9nZ2xlQ2xhc3MiLCJib29sIiwiYXBwZW5kIiwidG9BcHBlbmQiLCJpbnNlcnRBZGphY2VudEhUTUwiLCJmaW5kIiwiTm9kZUxpc3QiLCJBcnJheSIsInRyaWdnZXIiLCJuYW1lIiwiZXJyb3IiLCJldiIsIkN1c3RvbUV2ZW50IiwiY3JlYXRlRXZlbnQiLCJpbml0Q3VzdG9tRXZlbnQiLCJpbml0RXZlbnQiLCJkaXNwYXRjaEV2ZW50IiwiUGF5bWVudCIsImNhcmRGcm9tTnVtYmVyIiwiY2FyZEZyb21UeXBlIiwiY2FyZHMiLCJkZWZhdWx0Rm9ybWF0IiwiZm9ybWF0QmFja0NhcmROdW1iZXIiLCJmb3JtYXRCYWNrRXhwaXJ5IiwiZm9ybWF0Q2FyZE51bWJlciIsImZvcm1hdEV4cGlyeSIsImZvcm1hdEZvcndhcmRFeHBpcnkiLCJmb3JtYXRGb3J3YXJkU2xhc2giLCJmb3JtYXRNb250aEV4cGlyeSIsImhhc1RleHRTZWxlY3RlZCIsImx1aG5DaGVjayIsInJlRm9ybWF0Q2FyZE51bWJlciIsInJlc3RyaWN0Q1ZDIiwicmVzdHJpY3RDYXJkTnVtYmVyIiwicmVzdHJpY3RDb21iaW5lZEV4cGlyeSIsInJlc3RyaWN0RXhwaXJ5IiwicmVzdHJpY3RNb250aEV4cGlyeSIsInJlc3RyaWN0TnVtZXJpYyIsInJlc3RyaWN0WWVhckV4cGlyeSIsInNldENhcmRUeXBlIiwiaW5kZXhPZiIsIml0ZW0iLCJ0eXBlIiwicGF0dGVybiIsImZvcm1hdCIsImN2Y0xlbmd0aCIsImx1aG4iLCJudW0iLCJjYXJkIiwiZGlnaXQiLCJkaWdpdHMiLCJvZGQiLCJzdW0iLCJyZXZlcnNlIiwicGFyc2VJbnQiLCJzZWxlY3Rpb25TdGFydCIsInNlbGVjdGlvbkVuZCIsInNlbGVjdGlvbiIsImNyZWF0ZVJhbmdlIiwic2V0VGltZW91dCIsIl90aGlzIiwiZm5zIiwicmUiLCJ1cHBlckxlbmd0aCIsIlN0cmluZyIsImZyb21DaGFyQ29kZSIsIm1ldGEiLCJzbGFzaCIsIm1ldGFLZXkiLCJpbnB1dCIsImN0cmxLZXkiLCJhbGxUeXBlcyIsImNhcmRUeXBlIiwiY2FyZEV4cGlyeVZhbCIsIm1vbnRoIiwicHJlZml4IiwieWVhciIsIkRhdGUiLCJnZXRGdWxsWWVhciIsInRvU3RyaW5nIiwic2xpY2UiLCJ2YWxpZGF0ZUNhcmROdW1iZXIiLCJ2YWxpZGF0ZUNhcmRFeHBpcnkiLCJjdXJyZW50VGltZSIsImV4cGlyeSIsInNldE1vbnRoIiwiZ2V0TW9udGgiLCJ2YWxpZGF0ZUNhcmRDVkMiLCJjdmMiLCJyZWYxIiwiZ3JvdXBzIiwiZXhlYyIsInNoaWZ0IiwiZm9ybWF0Q2FyZENWQyIsImZvcm1hdENhcmRFeHBpcnkiLCJmb3JtYXRDYXJkRXhwaXJ5TXVsdGlwbGUiLCJnZXRDYXJkQXJyYXkiLCJzZXRDYXJkQXJyYXkiLCJjYXJkQXJyYXkiLCJhZGRUb0NhcmRBcnJheSIsImNhcmRPYmplY3QiLCJyZW1vdmVGcm9tQ2FyZEFycmF5Iiwia2V5Iiwic3BsaWNlIiwiYyIsInAiLCJfdmFsaWRGb3JtIiwiX3ZhbGlkRm9ybTIiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0Iiwib2JqIiwiX19lc01vZHVsZSIsImRlZmF1bHQiLCJWYWxpZEZvcm0iLCJ0b2dnbGVJbnZhbGlkQ2xhc3MiLCJoYW5kbGVDdXN0b21NZXNzYWdlcyIsImhhbmRsZUN1c3RvbU1lc3NhZ2VEaXNwbGF5IiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJjbG9uZSIsImRlZmF1bHRzIiwiaW5zZXJ0QWZ0ZXIiLCJpbnNlcnRCZWZvcmUiLCJmb3JFYWNoIiwiZGVib3VuY2UiLCJjb3B5IiwiYXR0ciIsImhhc093blByb3BlcnR5IiwiZGVmYXVsdE9iamVjdCIsImsiLCJ1bmRlZmluZWQiLCJyZWZOb2RlIiwibm9kZVRvSW5zZXJ0Iiwic2libGluZyIsIm5leHRTaWJsaW5nIiwiX3BhcmVudCIsInBhcmVudE5vZGUiLCJwYXJlbnQiLCJhcHBlbmRDaGlsZCIsIml0ZW1zIiwiZm4iLCJtcyIsInRpbWVvdXQiLCJkZWJvdW5jZWRGbiIsImNsZWFyVGltZW91dCIsInZhbGlkRm9ybSIsIl91dGlsIiwiaW52YWxpZENsYXNzIiwidmFsaWRpdHkiLCJ2YWxpZCIsImVycm9yUHJvcHMiLCJnZXRDdXN0b21NZXNzYWdlIiwiY3VzdG9tTWVzc2FnZXMiLCJsb2NhbEVycm9yUHJvcHMiLCJjb25jYXQiLCJwcm9wIiwiZ2V0QXR0cmlidXRlIiwiY2hlY2tWYWxpZGl0eSIsIm1lc3NhZ2UiLCJzZXRDdXN0b21WYWxpZGl0eSIsIm9wdGlvbnMiLCJ2YWxpZGF0aW9uRXJyb3JDbGFzcyIsInZhbGlkYXRpb25FcnJvclBhcmVudENsYXNzIiwiZXJyb3JQbGFjZW1lbnQiLCJpbnNlcnRFcnJvciIsImVycm9yTm9kZSIsInF1ZXJ5U2VsZWN0b3IiLCJjcmVhdGVFbGVtZW50IiwidmFsaWRhdGlvbk1lc3NhZ2UiLCJ0ZXh0Q29udGVudCIsImRlZmF1bHRPcHRpb25zIiwiaW5wdXRzIiwidG9Mb3dlckNhc2UiLCJmb2N1c0ludmFsaWRJbnB1dCIsInZhbGlkRm9ybUlucHV0cyIsImZvcm0iLCJmb2N1c0ZpcnN0IiwiaW52YWxpZE5vZGUiLCJmb2N1cyIsIiQiLCJwbHVnaW5OYW1lIiwiUGx1Z2luIiwiZXh0ZW5kIiwiX2RlZmF1bHRzIiwiX25hbWUiLCJpbml0IiwicHJvdG90eXBlIiwicmVzZXQiLCJhbW91bnQiLCJkb2N1bWVudEVsZW1lbnQiLCJwYXJzZUZsb2F0IiwibGV2ZWxfYW1vdW50X3NlbGVjdG9yIiwib3JpZ2luYWxfYW1vdW50Iiwib3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yIiwicHJvY2Vzc2luZ19mZWUiLCJNYXRoIiwicm91bmQiLCJmZWVfYW1vdW50IiwicG93IiwidG9GaXhlZCIsInByb2Nlc3NpbmdfZmVlX3RleHQiLCJjcmVhdGVfYWNjb3VudCIsImJ1dHRvbl90ZXh0IiwicGF5X2J1dHRvbl9zZWxlY3RvciIsInN0cmlwZSIsIlN0cmlwZSIsInN0cmlwZV9wdWJsaXNoYWJsZV9rZXkiLCJlbGVtZW50cyIsImZvbnRzIiwiY3NzU3JjIiwicmVmZXJyZXIiLCJkZWJ1ZyIsImFuYWx5dGljc1RyYWNraW5nIiwiYW1vdW50QXNSYWRpbyIsImFtb3VudFVwZGF0ZWQiLCJwYXlfY2NfcHJvY2Vzc2luZ19zZWxlY3RvciIsImNyZWRpdENhcmRQcm9jZXNzaW5nRmVlcyIsImRvbmF0ZV9mb3JtX3NlbGVjdG9yIiwiZG9uYXRlQW5vbnltb3VzbHkiLCJob25vck9yTWVtb3J5VG9nZ2xlIiwib3V0c2lkZVVuaXRlZFN0YXRlcyIsInNoaXBwaW5nQWRkcmVzcyIsImFsbG93TWlubnBvc3RBY2NvdW50IiwicGF5bWVudFJlcXVlc3RCdXR0b24iLCJjaG9vc2VQYXltZW50TWV0aG9kIiwiY3JlZGl0Q2FyZEZpZWxkcyIsInZhbGlkYXRlU2V0dXAiLCJmb3JtU2V0dXAiLCJjb25maXJtX2Zvcm1fc2VsZWN0b3IiLCJzaG93TmV3c2xldHRlclNldHRpbmdzIiwiY29uZmlybU1lc3NhZ2VTdWJtaXQiLCJjb25zb2xlIiwibG9nIiwiZGlyIiwicHJvZ3Jlc3MiLCJwcm9ncmVzc19zZWxlY3RvciIsInN0ZXAiLCJuYXZfaXRlbV9jb3VudCIsIm9wcF9pZCIsIm9wcF9pZF9zZWxlY3RvciIsInBvc3RfcHVyY2hhc2UiLCJpbmRleCIsImZpbmlzaF9zZWN0aW9uX3NlbGVjdG9yIiwiYW5hbHl0aWNzVHJhY2tpbmdTdGVwIiwiaW5zdGFsbG1lbnRfcGVyaW9kIiwibGV2ZWwiLCJ0aGF0IiwiaW5zdGFsbG1lbnRfcGVyaW9kX3NlbGVjdG9yIiwiYWpheCIsIm1ldGhvZCIsInVybCIsImRvbmUiLCJjaGFyQXQiLCJ0b1VwcGVyQ2FzZSIsImdhIiwicGFnZSIsImxvY2F0aW9uIiwicGF0aG5hbWUiLCJ0aXRsZSIsImNoYW5nZSIsImlzIiwic3RyaXBlX3BheW1lbnRfdHlwZSIsImdldFN0cmlwZVBheW1lbnRUeXBlIiwiYW1vdW50X3NlbGVjdG9yX2ZhaXJfbWFya2V0Iiwic2V0RmFpck1hcmtldFZhbHVlIiwiY2FsY3VsYXRlRmVlcyIsImFkZGl0aW9uYWxfYW1vdW50X2ZpZWxkIiwiZ2V0VG90YWxBbW91bnQiLCJ0b3RhbF9hbW91bnQiLCJhZGRpdGlvbmFsX2Ftb3VudCIsImFtb3VudF9zZWxlY3RvciIsImZhaXJfbWFya2V0X3ZhbHVlX3NlbGVjdG9yIiwiZmFpck1hcmtldFZhbHVlIiwic2V0U3RyaXBlUGF5bWVudFR5cGUiLCJmZWVzIiwiY3JlZGl0Q2FyZEZlZUNoZWNrYm94IiwiZmllbGQiLCJmdWxsX2Ftb3VudCIsImZ1bGxfYW1vdW50X3NlbGVjdG9yIiwicGF5bWVudFJlcXVlc3QiLCJ1cGRhdGUiLCJ0b3RhbCIsImxhYmVsIiwidG9nZ2xlQW5vbnltb3VzIiwiYW5vbnltb3VzX3NlbGVjdG9yIiwibmFtZV9zZWxlY3RvciIsImhpZGUiLCJzaG93IiwiaG9ub3JPck1lbW9yeSIsImhvbm9yX29yX21lbW9yeV9jaG9vc2VyIiwiaG9ub3JfbWVtb3J5X2lucHV0X2dyb3VwIiwiaG9ub3JfdHlwZV9zZWxlY3RvciIsImhvbm9yX25hbWVfc2VsZWN0b3IiLCJzaG93X2JpbGxpbmdfY291bnRyeV9zZWxlY3RvciIsImNsaWNrIiwiYmlsbGluZ19jb3VudHJ5X3NlbGVjdG9yIiwic2hvd19zaGlwcGluZ19jb3VudHJ5X3NlbGVjdG9yIiwic2hpcHBpbmdfY291bnRyeV9zZWxlY3RvciIsInNob3dfc2hpcHBpbmciLCJ1c2VfZm9yX3NoaXBwaW5nX3NlbGVjdG9yIiwic2hpcHBpbmdfc2VsZWN0b3IiLCJhY2NvdW50X2V4aXN0cyIsInNob3dQYXNzd29yZCIsInNob3dQYXNzd29yZFN0cmVuZ3RoIiwic3BhbUVtYWlsIiwiZW1haWxfZmllbGRfc2VsZWN0b3IiLCJ0b2dnbGVBY2NvdW50RmllbGRzIiwiY3JlYXRlX21wX3NlbGVjdG9yIiwiZG9uZVR5cGluZyIsImVtYWlsIiwiY2hlY2tNaW5ucG9zdEFjY291bnQiLCJ0eXBpbmdUaW1lciIsImRvbmVUeXBpbmdJbnRlcnZhbCIsImtleXVwIiwiZW1haWxfZmllbGQiLCJzcGFtRXJyb3JDb250YWluZXIiLCJjcmVhdGVfYWNjb3VudF9zZWxlY3RvciIsImJlZm9yZSIsInBhc3N3b3JkX3NlbGVjdG9yIiwiJHN1Ym1pdCIsIiRjb250YWluZXIiLCIkZmllbGQiLCJzaG93X3Bhc3MiLCIkdG9nZ2xlIiwiY2hlY2tib3giLCIkYmVmb3JlIiwiYWZ0ZXIiLCJjaGVja1Bhc3N3b3JkU3RyZW5ndGgiLCIkcGFzc3dvcmQiLCIkc3RyZW5ndGhNZXRlciIsIiRzdHJlbmd0aFRleHQiLCJwYXNzd29yZCIsInJlc3VsdCIsInp4Y3ZibiIsInN0cmVuZ3RoIiwic2NvcmUiLCJodG1sIiwidXNlciIsIm1pbm5wb3N0X3Jvb3QiLCJzdGF0dXMiLCJyZWFzb24iLCJjb3VudHJ5IiwiY3VycmVuY3kiLCJwckJ1dHRvbiIsImNyZWF0ZSIsInN0eWxlIiwidGhlbWUiLCJoZWlnaHQiLCJjYW5NYWtlUGF5bWVudCIsInRoZW4iLCJtb3VudCIsImV2ZW50Iiwic3VwcG9ydGZvcm0iLCJnZXQiLCJyZXBvcnRWYWxpZGl0eSIsInRva2VuRmllbGROYW1lIiwidG9rZW5GaWVsZCIsInBheW1lbnRNZXRob2QiLCJpZCIsImZvcm1Qcm9jZXNzb3IiLCJjaG9vc2VfcGF5bWVudCIsImNoZWNrZWRfaWQiLCJjaGVja2VkX3ZhbHVlIiwic2V0dXBQYXltZW50TWV0aG9kIiwiZWxlbWVudF9pZCIsImVsZW1lbnRfdmFsdWUiLCJhY2hGaWVsZHMiLCJyZW1vdmVBY2hGaWVsZHMiLCJwYXltZW50X21ldGhvZF9zZWxlY3RvciIsInBsYWlkX2xpbmsiLCJsaW5rSGFuZGxlciIsImRlc3Ryb3kiLCJiYXNlIiwiaWNvbkNvbG9yIiwibGluZUhlaWdodCIsImZvbnRXZWlnaHQiLCJmb250RmFtaWx5IiwiZm9udFNpemUiLCJpbnZhbGlkIiwiY29sb3IiLCJjYXJkTnVtYmVyRWxlbWVudCIsInNob3dJY29uIiwiY2NfbnVtX3NlbGVjdG9yIiwiY2FyZEV4cGlyeUVsZW1lbnQiLCJjY19leHBfc2VsZWN0b3IiLCJjYXJkQ3ZjRWxlbWVudCIsImNjX2N2Y19zZWxlY3RvciIsImJyYW5kIiwic3RyaXBlRXJyb3JEaXNwbGF5IiwiYnV0dG9uU3RhdHVzIiwic2hvd1NwaW5uZXIiLCJiYW5rVG9rZW5GaWVsZE5hbWUiLCJiYW5rVG9rZW5GaWVsZCIsIlBsYWlkIiwiY2xpZW50TmFtZSIsImVudiIsInBsYWlkX2VudiIsInByb2R1Y3QiLCJ0b2tlbiIsImdldEVsZW1lbnRCeUlkIiwib25TdWNjZXNzIiwicHVibGljX3Rva2VuIiwibWV0YWRhdGEiLCJKU09OIiwic3RyaW5naWZ5IiwiYWNjb3VudF9pZCIsImNvbnRlbnRUeXBlIiwicmVzcG9uc2UiLCJzdHJpcGVfYmFua19hY2NvdW50X3Rva2VuIiwicHJlcGVuZCIsIm9wZW4iLCJidXR0b24iLCJkaXNhYmxlZCIsImZvcm1zIiwiZm9ybV9zZWxlY3RvciIsInNjcm9sbFRvRm9ybUVycm9yIiwiZmlyc3QiLCJmaXJzdF9ob2xkZXIiLCJlbGVtZW50T2Zmc2V0Iiwib2Zmc2V0IiwidG9wIiwicGFnZU9mZnNldCIsInBhZ2VZT2Zmc2V0IiwiaW5uZXJIZWlnaHQiLCJzY3JvbGxUb3AiLCJzdWJtaXQiLCJyZXNldEZvcm1FcnJvcnMiLCJiaWxsaW5nRGV0YWlscyIsImdlbmVyYXRlQmlsbGluZ0RldGFpbHMiLCJjcmVhdGVNaW5uUG9zdEFjY291bnQiLCJwYXltZW50X3R5cGUiLCJjcmVhdGVQYXltZW50TWV0aG9kIiwiYmFua1Rva2VuSGFuZGxlciIsInN1Ym1pdEZvcm1Pbmx5IiwidGhpc19zZWxlY3RvciIsIndoaWNoX2Vycm9yIiwiZW1wdHkiLCJmaXJzdF9uYW1lIiwiZmlyc3RfbmFtZV9maWVsZF9zZWxlY3RvciIsImxhc3RfbmFtZSIsImxhc3RfbmFtZV9maWVsZF9zZWxlY3RvciIsInBhc3N3b3JkX2ZpZWxkX3NlbGVjdG9yIiwiY2l0eSIsImJpbGxpbmdfY2l0eV9maWVsZF9zZWxlY3RvciIsInN0YXRlIiwiYmlsbGluZ19zdGF0ZV9maWVsZF9zZWxlY3RvciIsInppcCIsImJpbGxpbmdfemlwX2ZpZWxkX3NlbGVjdG9yIiwiYWRkcmVzc0RldGFpbHMiLCJmdWxsX25hbWUiLCJzdHJlZXQiLCJiaWxsaW5nX3N0cmVldF9maWVsZF9zZWxlY3RvciIsImxpbmUxIiwiYWNjb3VudF9jaXR5X3NlbGVjdG9yIiwiYWNjb3VudF9zdGF0ZV9zZWxlY3RvciIsImFjY291bnRfemlwX3NlbGVjdG9yIiwicG9zdGFsX2NvZGUiLCJiaWxsaW5nX2NvdW50cnlfZmllbGRfc2VsZWN0b3IiLCJhZGRyZXNzIiwiY2FyZEVsZW1lbnQiLCJiaWxsaW5nX2RldGFpbHMiLCJoYW5kbGVTZXJ2ZXJFcnJvciIsImFqYXhfdXJsIiwiZmV0Y2giLCJoZWFkZXJzIiwiYm9keSIsInNlcmlhbGl6ZSIsImpzb24iLCJoYW5kbGVTZXJ2ZXJSZXNwb25zZSIsImNhY2hlIiwiZXJyb3JzIiwicmVxdWlyZXNfYWN0aW9uIiwidGhpc19maWVsZCIsImVhY2giLCJwYXJhbSIsImRpc3BsYXlFcnJvck1lc3NhZ2UiLCJhbmltYXRlIiwic3RyaXBlRXJyb3JTZWxlY3RvciIsImZpZWxkUGFyZW50IiwicHJldiIsIm5ld3NsZXR0ZXJfZ3JvdXBfaHRtbCIsIm5ld3NsZXR0ZXJfZ3JvdXBfc2VsZWN0b3IiLCJnZXRfZGF0YSIsInNob3J0Y29kZSIsInBsYWNlbWVudCIsImdyb3VwX2ZpZWxkcyIsImNhdGVnb3J5IiwibWFpbGNoaW1wX3N0YXR1cyIsIm1haWxjaGltcF91c2VyX2lkIiwiZXhpc3RpbmdfbmV3c2xldHRlcl9zZXR0aW5ncyIsImNvbmZpcm1mb3JtIiwibmV3c2xldHRlcl9ncm91cHMiLCJuZXdfbmV3c2xldHRlcl9zZXR0aW5ncyIsInBvc3RfZGF0YSIsImdyb3Vwc19zdWJtaXR0ZWQiLCJncm91cHNfYXZhaWxhYmxlIiwiZ3JvdXAiLCJkYXRhVHlwZSIsInN1Y2Nlc3MiLCJmYWlsIiwialF1ZXJ5Il0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsQ0FBQyxVQUFTQSxDQUFULEVBQVc7QUFBQyxNQUFHLFFBQU9DLE9BQVAseUNBQU9BLE9BQVAsT0FBaUIsUUFBakIsSUFBMkIsT0FBT0MsTUFBUCxLQUFnQixXQUE5QyxFQUEwRDtBQUFDQSxJQUFBQSxNQUFNLENBQUNELE9BQVAsR0FB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QUU7QUFDUGlFLFVBQUFBLFdBQVcsQ0FBQ3pJLEdBQVosQ0FBZ0IsQ0FBaEIsRUFBbUJ3RSxNQUFuQjtBQUNEO0FBRUYsT0ExRUQsRUFMK0MsQ0FnRi9DO0FBQ0QsS0FoeUNnQixDQWd5Q2Q7O0FBaHlDYyxHQUFuQixDQW5GNEMsQ0FxM0N6QztBQUVIO0FBQ0E7O0FBQ0F0UCxFQUFBQSxDQUFDLENBQUN2QyxFQUFGLENBQUt3QyxVQUFMLElBQW1CLFVBQVdwQixPQUFYLEVBQXFCO0FBQ3RDLFdBQU8sS0FBS3lULElBQUwsQ0FBVSxZQUFZO0FBQzNCLFVBQUksQ0FBQ3RTLENBQUMsQ0FBQ2xOLElBQUYsQ0FBTyxJQUFQLEVBQWEsWUFBWW1OLFVBQXpCLENBQUwsRUFBMkM7QUFDekNELFFBQUFBLENBQUMsQ0FBQ2xOLElBQUYsQ0FBTyxJQUFQLEVBQWEsWUFBWW1OLFVBQXpCLEVBQXFDLElBQUlDLE1BQUosQ0FBWSxJQUFaLEVBQWtCckIsT0FBbEIsQ0FBckM7QUFDRDtBQUNGLEtBSk0sQ0FBUDtBQUtELEdBTkQ7QUFRRCxDQWo0Q0EsRUFpNENHb1YsTUFqNENILEVBaTRDV2hrQixNQWo0Q1gsRUFpNENtQnlCLFFBajRDbkIiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbihmKXtpZih0eXBlb2YgZXhwb3J0cz09PVwib2JqZWN0XCImJnR5cGVvZiBtb2R1bGUhPT1cInVuZGVmaW5lZFwiKXttb2R1bGUuZXhwb3J0cz1mKCl9ZWxzZSBpZih0eXBlb2YgZGVmaW5lPT09XCJmdW5jdGlvblwiJiZkZWZpbmUuYW1kKXtkZWZpbmUoW10sZil9ZWxzZXt2YXIgZztpZih0eXBlb2Ygd2luZG93IT09XCJ1bmRlZmluZWRcIil7Zz13aW5kb3d9ZWxzZSBpZih0eXBlb2YgZ2xvYmFsIT09XCJ1bmRlZmluZWRcIil7Zz1nbG9iYWx9ZWxzZSBpZih0eXBlb2Ygc2VsZiE9PVwidW5kZWZpbmVkXCIpe2c9c2VsZn1lbHNle2c9dGhpc30oZy5wYXltZW50IHx8IChnLnBheW1lbnQgPSB7fSkpLmpzID0gZigpfX0pKGZ1bmN0aW9uKCl7dmFyIGRlZmluZSxtb2R1bGUsZXhwb3J0cztyZXR1cm4gKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkoezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xudmFyIFFKLCBycmV0dXJuLCBydHJpbTtcblxuUUogPSBmdW5jdGlvbihzZWxlY3Rvcikge1xuICBpZiAoUUouaXNET01FbGVtZW50KHNlbGVjdG9yKSkge1xuICAgIHJldHVybiBzZWxlY3RvcjtcbiAgfVxuICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG59O1xuXG5RSi5pc0RPTUVsZW1lbnQgPSBmdW5jdGlvbihlbCkge1xuICByZXR1cm4gZWwgJiYgKGVsLm5vZGVOYW1lICE9IG51bGwpO1xufTtcblxucnRyaW0gPSAvXltcXHNcXHVGRUZGXFx4QTBdK3xbXFxzXFx1RkVGRlxceEEwXSskL2c7XG5cblFKLnRyaW0gPSBmdW5jdGlvbih0ZXh0KSB7XG4gIGlmICh0ZXh0ID09PSBudWxsKSB7XG4gICAgcmV0dXJuIFwiXCI7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICh0ZXh0ICsgXCJcIikucmVwbGFjZShydHJpbSwgXCJcIik7XG4gIH1cbn07XG5cbnJyZXR1cm4gPSAvXFxyL2c7XG5cblFKLnZhbCA9IGZ1bmN0aW9uKGVsLCB2YWwpIHtcbiAgdmFyIHJldDtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgcmV0dXJuIGVsLnZhbHVlID0gdmFsO1xuICB9IGVsc2Uge1xuICAgIHJldCA9IGVsLnZhbHVlO1xuICAgIGlmICh0eXBlb2YgcmV0ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICByZXR1cm4gcmV0LnJlcGxhY2UocnJldHVybiwgXCJcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChyZXQgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuUUoucHJldmVudERlZmF1bHQgPSBmdW5jdGlvbihldmVudE9iamVjdCkge1xuICBpZiAodHlwZW9mIGV2ZW50T2JqZWN0LnByZXZlbnREZWZhdWx0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBldmVudE9iamVjdC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybjtcbiAgfVxuICBldmVudE9iamVjdC5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICByZXR1cm4gZmFsc2U7XG59O1xuXG5RSi5ub3JtYWxpemVFdmVudCA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIG9yaWdpbmFsO1xuICBvcmlnaW5hbCA9IGU7XG4gIGUgPSB7XG4gICAgd2hpY2g6IG9yaWdpbmFsLndoaWNoICE9IG51bGwgPyBvcmlnaW5hbC53aGljaCA6IHZvaWQgMCxcbiAgICB0YXJnZXQ6IG9yaWdpbmFsLnRhcmdldCB8fCBvcmlnaW5hbC5zcmNFbGVtZW50LFxuICAgIHByZXZlbnREZWZhdWx0OiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBRSi5wcmV2ZW50RGVmYXVsdChvcmlnaW5hbCk7XG4gICAgfSxcbiAgICBvcmlnaW5hbEV2ZW50OiBvcmlnaW5hbCxcbiAgICBkYXRhOiBvcmlnaW5hbC5kYXRhIHx8IG9yaWdpbmFsLmRldGFpbFxuICB9O1xuICBpZiAoZS53aGljaCA9PSBudWxsKSB7XG4gICAgZS53aGljaCA9IG9yaWdpbmFsLmNoYXJDb2RlICE9IG51bGwgPyBvcmlnaW5hbC5jaGFyQ29kZSA6IG9yaWdpbmFsLmtleUNvZGU7XG4gIH1cbiAgcmV0dXJuIGU7XG59O1xuXG5RSi5vbiA9IGZ1bmN0aW9uKGVsZW1lbnQsIGV2ZW50TmFtZSwgY2FsbGJhY2spIHtcbiAgdmFyIGVsLCBpLCBqLCBsZW4sIGxlbjEsIG11bHRFdmVudE5hbWUsIG9yaWdpbmFsQ2FsbGJhY2ssIHJlZjtcbiAgaWYgKGVsZW1lbnQubGVuZ3RoKSB7XG4gICAgZm9yIChpID0gMCwgbGVuID0gZWxlbWVudC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgZWwgPSBlbGVtZW50W2ldO1xuICAgICAgUUoub24oZWwsIGV2ZW50TmFtZSwgY2FsbGJhY2spO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGV2ZW50TmFtZS5tYXRjaChcIiBcIikpIHtcbiAgICByZWYgPSBldmVudE5hbWUuc3BsaXQoXCIgXCIpO1xuICAgIGZvciAoaiA9IDAsIGxlbjEgPSByZWYubGVuZ3RoOyBqIDwgbGVuMTsgaisrKSB7XG4gICAgICBtdWx0RXZlbnROYW1lID0gcmVmW2pdO1xuICAgICAgUUoub24oZWxlbWVudCwgbXVsdEV2ZW50TmFtZSwgY2FsbGJhY2spO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cbiAgb3JpZ2luYWxDYWxsYmFjayA9IGNhbGxiYWNrO1xuICBjYWxsYmFjayA9IGZ1bmN0aW9uKGUpIHtcbiAgICBlID0gUUoubm9ybWFsaXplRXZlbnQoZSk7XG4gICAgcmV0dXJuIG9yaWdpbmFsQ2FsbGJhY2soZSk7XG4gIH07XG4gIGlmIChlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICByZXR1cm4gZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgY2FsbGJhY2ssIGZhbHNlKTtcbiAgfVxuICBpZiAoZWxlbWVudC5hdHRhY2hFdmVudCkge1xuICAgIGV2ZW50TmFtZSA9IFwib25cIiArIGV2ZW50TmFtZTtcbiAgICByZXR1cm4gZWxlbWVudC5hdHRhY2hFdmVudChldmVudE5hbWUsIGNhbGxiYWNrKTtcbiAgfVxuICBlbGVtZW50WydvbicgKyBldmVudE5hbWVdID0gY2FsbGJhY2s7XG59O1xuXG5RSi5hZGRDbGFzcyA9IGZ1bmN0aW9uKGVsLCBjbGFzc05hbWUpIHtcbiAgdmFyIGU7XG4gIGlmIChlbC5sZW5ndGgpIHtcbiAgICByZXR1cm4gKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGksIGxlbiwgcmVzdWx0cztcbiAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgIGZvciAoaSA9IDAsIGxlbiA9IGVsLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGUgPSBlbFtpXTtcbiAgICAgICAgcmVzdWx0cy5wdXNoKFFKLmFkZENsYXNzKGUsIGNsYXNzTmFtZSkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfSkoKTtcbiAgfVxuICBpZiAoZWwuY2xhc3NMaXN0KSB7XG4gICAgcmV0dXJuIGVsLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZWwuY2xhc3NOYW1lICs9ICcgJyArIGNsYXNzTmFtZTtcbiAgfVxufTtcblxuUUouaGFzQ2xhc3MgPSBmdW5jdGlvbihlbCwgY2xhc3NOYW1lKSB7XG4gIHZhciBlLCBoYXNDbGFzcywgaSwgbGVuO1xuICBpZiAoZWwubGVuZ3RoKSB7XG4gICAgaGFzQ2xhc3MgPSB0cnVlO1xuICAgIGZvciAoaSA9IDAsIGxlbiA9IGVsLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBlID0gZWxbaV07XG4gICAgICBoYXNDbGFzcyA9IGhhc0NsYXNzICYmIFFKLmhhc0NsYXNzKGUsIGNsYXNzTmFtZSk7XG4gICAgfVxuICAgIHJldHVybiBoYXNDbGFzcztcbiAgfVxuICBpZiAoZWwuY2xhc3NMaXN0KSB7XG4gICAgcmV0dXJuIGVsLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgUmVnRXhwKCcoXnwgKScgKyBjbGFzc05hbWUgKyAnKCB8JCknLCAnZ2knKS50ZXN0KGVsLmNsYXNzTmFtZSk7XG4gIH1cbn07XG5cblFKLnJlbW92ZUNsYXNzID0gZnVuY3Rpb24oZWwsIGNsYXNzTmFtZSkge1xuICB2YXIgY2xzLCBlLCBpLCBsZW4sIHJlZiwgcmVzdWx0cztcbiAgaWYgKGVsLmxlbmd0aCkge1xuICAgIHJldHVybiAoZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaSwgbGVuLCByZXN1bHRzO1xuICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgZm9yIChpID0gMCwgbGVuID0gZWwubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgZSA9IGVsW2ldO1xuICAgICAgICByZXN1bHRzLnB1c2goUUoucmVtb3ZlQ2xhc3MoZSwgY2xhc3NOYW1lKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9KSgpO1xuICB9XG4gIGlmIChlbC5jbGFzc0xpc3QpIHtcbiAgICByZWYgPSBjbGFzc05hbWUuc3BsaXQoJyAnKTtcbiAgICByZXN1bHRzID0gW107XG4gICAgZm9yIChpID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBjbHMgPSByZWZbaV07XG4gICAgICByZXN1bHRzLnB1c2goZWwuY2xhc3NMaXN0LnJlbW92ZShjbHMpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGVsLmNsYXNzTmFtZSA9IGVsLmNsYXNzTmFtZS5yZXBsYWNlKG5ldyBSZWdFeHAoJyhefFxcXFxiKScgKyBjbGFzc05hbWUuc3BsaXQoJyAnKS5qb2luKCd8JykgKyAnKFxcXFxifCQpJywgJ2dpJyksICcgJyk7XG4gIH1cbn07XG5cblFKLnRvZ2dsZUNsYXNzID0gZnVuY3Rpb24oZWwsIGNsYXNzTmFtZSwgYm9vbCkge1xuICB2YXIgZTtcbiAgaWYgKGVsLmxlbmd0aCkge1xuICAgIHJldHVybiAoZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaSwgbGVuLCByZXN1bHRzO1xuICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgZm9yIChpID0gMCwgbGVuID0gZWwubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgZSA9IGVsW2ldO1xuICAgICAgICByZXN1bHRzLnB1c2goUUoudG9nZ2xlQ2xhc3MoZSwgY2xhc3NOYW1lLCBib29sKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9KSgpO1xuICB9XG4gIGlmIChib29sKSB7XG4gICAgaWYgKCFRSi5oYXNDbGFzcyhlbCwgY2xhc3NOYW1lKSkge1xuICAgICAgcmV0dXJuIFFKLmFkZENsYXNzKGVsLCBjbGFzc05hbWUpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gUUoucmVtb3ZlQ2xhc3MoZWwsIGNsYXNzTmFtZSk7XG4gIH1cbn07XG5cblFKLmFwcGVuZCA9IGZ1bmN0aW9uKGVsLCB0b0FwcGVuZCkge1xuICB2YXIgZTtcbiAgaWYgKGVsLmxlbmd0aCkge1xuICAgIHJldHVybiAoZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaSwgbGVuLCByZXN1bHRzO1xuICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgZm9yIChpID0gMCwgbGVuID0gZWwubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgZSA9IGVsW2ldO1xuICAgICAgICByZXN1bHRzLnB1c2goUUouYXBwZW5kKGUsIHRvQXBwZW5kKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9KSgpO1xuICB9XG4gIHJldHVybiBlbC5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIHRvQXBwZW5kKTtcbn07XG5cblFKLmZpbmQgPSBmdW5jdGlvbihlbCwgc2VsZWN0b3IpIHtcbiAgaWYgKGVsIGluc3RhbmNlb2YgTm9kZUxpc3QgfHwgZWwgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgIGVsID0gZWxbMF07XG4gIH1cbiAgcmV0dXJuIGVsLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xufTtcblxuUUoudHJpZ2dlciA9IGZ1bmN0aW9uKGVsLCBuYW1lLCBkYXRhKSB7XG4gIHZhciBlLCBlcnJvciwgZXY7XG4gIHRyeSB7XG4gICAgZXYgPSBuZXcgQ3VzdG9tRXZlbnQobmFtZSwge1xuICAgICAgZGV0YWlsOiBkYXRhXG4gICAgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgZSA9IGVycm9yO1xuICAgIGV2ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG4gICAgaWYgKGV2LmluaXRDdXN0b21FdmVudCkge1xuICAgICAgZXYuaW5pdEN1c3RvbUV2ZW50KG5hbWUsIHRydWUsIHRydWUsIGRhdGEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBldi5pbml0RXZlbnQobmFtZSwgdHJ1ZSwgdHJ1ZSwgZGF0YSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBlbC5kaXNwYXRjaEV2ZW50KGV2KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUUo7XG5cblxufSx7fV0sMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4oZnVuY3Rpb24gKGdsb2JhbCl7XG52YXIgUGF5bWVudCwgUUosIGNhcmRGcm9tTnVtYmVyLCBjYXJkRnJvbVR5cGUsIGNhcmRzLCBkZWZhdWx0Rm9ybWF0LCBmb3JtYXRCYWNrQ2FyZE51bWJlciwgZm9ybWF0QmFja0V4cGlyeSwgZm9ybWF0Q2FyZE51bWJlciwgZm9ybWF0RXhwaXJ5LCBmb3JtYXRGb3J3YXJkRXhwaXJ5LCBmb3JtYXRGb3J3YXJkU2xhc2gsIGZvcm1hdE1vbnRoRXhwaXJ5LCBoYXNUZXh0U2VsZWN0ZWQsIGx1aG5DaGVjaywgcmVGb3JtYXRDYXJkTnVtYmVyLCByZXN0cmljdENWQywgcmVzdHJpY3RDYXJkTnVtYmVyLCByZXN0cmljdENvbWJpbmVkRXhwaXJ5LCByZXN0cmljdEV4cGlyeSwgcmVzdHJpY3RNb250aEV4cGlyeSwgcmVzdHJpY3ROdW1lcmljLCByZXN0cmljdFllYXJFeHBpcnksIHNldENhcmRUeXBlLFxuICBpbmRleE9mID0gW10uaW5kZXhPZiB8fCBmdW5jdGlvbihpdGVtKSB7IGZvciAodmFyIGkgPSAwLCBsID0gdGhpcy5sZW5ndGg7IGkgPCBsOyBpKyspIHsgaWYgKGkgaW4gdGhpcyAmJiB0aGlzW2ldID09PSBpdGVtKSByZXR1cm4gaTsgfSByZXR1cm4gLTE7IH07XG5cblFKID0gcmVxdWlyZSgncWovc3JjL3FqLmNvZmZlZScpO1xuXG5kZWZhdWx0Rm9ybWF0ID0gLyhcXGR7MSw0fSkvZztcblxuY2FyZHMgPSBbXG4gIHtcbiAgICB0eXBlOiAnYW1leCcsXG4gICAgcGF0dGVybjogL14zWzQ3XS8sXG4gICAgZm9ybWF0OiAvKFxcZHsxLDR9KShcXGR7MSw2fSk/KFxcZHsxLDV9KT8vLFxuICAgIGxlbmd0aDogWzE1XSxcbiAgICBjdmNMZW5ndGg6IFs0XSxcbiAgICBsdWhuOiB0cnVlXG4gIH0sIHtcbiAgICB0eXBlOiAnZGFua29ydCcsXG4gICAgcGF0dGVybjogL141MDE5LyxcbiAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgbGVuZ3RoOiBbMTZdLFxuICAgIGN2Y0xlbmd0aDogWzNdLFxuICAgIGx1aG46IHRydWVcbiAgfSwge1xuICAgIHR5cGU6ICdkaW5lcnNjbHViJyxcbiAgICBwYXR0ZXJuOiAvXigzNnwzOHwzMFswLTVdKS8sXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGxlbmd0aDogWzE0XSxcbiAgICBjdmNMZW5ndGg6IFszXSxcbiAgICBsdWhuOiB0cnVlXG4gIH0sIHtcbiAgICB0eXBlOiAnZGlzY292ZXInLFxuICAgIHBhdHRlcm46IC9eKDYwMTF8NjV8NjRbNC05XXw2MjIpLyxcbiAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgbGVuZ3RoOiBbMTZdLFxuICAgIGN2Y0xlbmd0aDogWzNdLFxuICAgIGx1aG46IHRydWVcbiAgfSwge1xuICAgIHR5cGU6ICdqY2InLFxuICAgIHBhdHRlcm46IC9eMzUvLFxuICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICBsZW5ndGg6IFsxNl0sXG4gICAgY3ZjTGVuZ3RoOiBbM10sXG4gICAgbHVobjogdHJ1ZVxuICB9LCB7XG4gICAgdHlwZTogJ2xhc2VyJyxcbiAgICBwYXR0ZXJuOiAvXig2NzA2fDY3NzF8NjcwOSkvLFxuICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICBsZW5ndGg6IFsxNiwgMTcsIDE4LCAxOV0sXG4gICAgY3ZjTGVuZ3RoOiBbM10sXG4gICAgbHVobjogdHJ1ZVxuICB9LCB7XG4gICAgdHlwZTogJ21hZXN0cm8nLFxuICAgIHBhdHRlcm46IC9eKDUwMTh8NTAyMHw1MDM4fDYzMDR8NjcwM3w2NzU5fDY3NlsxLTNdKS8sXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGxlbmd0aDogWzEyLCAxMywgMTQsIDE1LCAxNiwgMTcsIDE4LCAxOV0sXG4gICAgY3ZjTGVuZ3RoOiBbM10sXG4gICAgbHVobjogdHJ1ZVxuICB9LCB7XG4gICAgdHlwZTogJ21hc3RlcmNhcmQnLFxuICAgIHBhdHRlcm46IC9eNVsxLTVdLyxcbiAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgbGVuZ3RoOiBbMTZdLFxuICAgIGN2Y0xlbmd0aDogWzNdLFxuICAgIGx1aG46IHRydWVcbiAgfSwge1xuICAgIHR5cGU6ICd1bmlvbnBheScsXG4gICAgcGF0dGVybjogL142Mi8sXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGxlbmd0aDogWzE2LCAxNywgMTgsIDE5XSxcbiAgICBjdmNMZW5ndGg6IFszXSxcbiAgICBsdWhuOiBmYWxzZVxuICB9LCB7XG4gICAgdHlwZTogJ3Zpc2FlbGVjdHJvbicsXG4gICAgcGF0dGVybjogL140KDAyNnwxNzUwMHw0MDV8NTA4fDg0NHw5MVszN10pLyxcbiAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgbGVuZ3RoOiBbMTZdLFxuICAgIGN2Y0xlbmd0aDogWzNdLFxuICAgIGx1aG46IHRydWVcbiAgfSwge1xuICAgIHR5cGU6ICd2aXNhJyxcbiAgICBwYXR0ZXJuOiAvXjQvLFxuICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICBsZW5ndGg6IFsxMywgMTZdLFxuICAgIGN2Y0xlbmd0aDogWzNdLFxuICAgIGx1aG46IHRydWVcbiAgfSwge1xuICAgIHR5cGU6ICdlbG8nLFxuICAgIHBhdHRlcm46IC9eNDAxMXw0Mzg5MzV8NDUoMTQxNnw3Nil8NTAoNDE3NXw2Njk5fDY3fDkwWzQtN10pfDYzKDYyOTd8NjM2OCkvLFxuICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICBsZW5ndGg6IFsxNl0sXG4gICAgY3ZjTGVuZ3RoOiBbM10sXG4gICAgbHVobjogdHJ1ZVxuICB9XG5dO1xuXG5jYXJkRnJvbU51bWJlciA9IGZ1bmN0aW9uKG51bSkge1xuICB2YXIgY2FyZCwgaSwgbGVuO1xuICBudW0gPSAobnVtICsgJycpLnJlcGxhY2UoL1xcRC9nLCAnJyk7XG4gIGZvciAoaSA9IDAsIGxlbiA9IGNhcmRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgY2FyZCA9IGNhcmRzW2ldO1xuICAgIGlmIChjYXJkLnBhdHRlcm4udGVzdChudW0pKSB7XG4gICAgICByZXR1cm4gY2FyZDtcbiAgICB9XG4gIH1cbn07XG5cbmNhcmRGcm9tVHlwZSA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIGNhcmQsIGksIGxlbjtcbiAgZm9yIChpID0gMCwgbGVuID0gY2FyZHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBjYXJkID0gY2FyZHNbaV07XG4gICAgaWYgKGNhcmQudHlwZSA9PT0gdHlwZSkge1xuICAgICAgcmV0dXJuIGNhcmQ7XG4gICAgfVxuICB9XG59O1xuXG5sdWhuQ2hlY2sgPSBmdW5jdGlvbihudW0pIHtcbiAgdmFyIGRpZ2l0LCBkaWdpdHMsIGksIGxlbiwgb2RkLCBzdW07XG4gIG9kZCA9IHRydWU7XG4gIHN1bSA9IDA7XG4gIGRpZ2l0cyA9IChudW0gKyAnJykuc3BsaXQoJycpLnJldmVyc2UoKTtcbiAgZm9yIChpID0gMCwgbGVuID0gZGlnaXRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgZGlnaXQgPSBkaWdpdHNbaV07XG4gICAgZGlnaXQgPSBwYXJzZUludChkaWdpdCwgMTApO1xuICAgIGlmICgob2RkID0gIW9kZCkpIHtcbiAgICAgIGRpZ2l0ICo9IDI7XG4gICAgfVxuICAgIGlmIChkaWdpdCA+IDkpIHtcbiAgICAgIGRpZ2l0IC09IDk7XG4gICAgfVxuICAgIHN1bSArPSBkaWdpdDtcbiAgfVxuICByZXR1cm4gc3VtICUgMTAgPT09IDA7XG59O1xuXG5oYXNUZXh0U2VsZWN0ZWQgPSBmdW5jdGlvbih0YXJnZXQpIHtcbiAgdmFyIHJlZjtcbiAgaWYgKCh0YXJnZXQuc2VsZWN0aW9uU3RhcnQgIT0gbnVsbCkgJiYgdGFyZ2V0LnNlbGVjdGlvblN0YXJ0ICE9PSB0YXJnZXQuc2VsZWN0aW9uRW5kKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKCh0eXBlb2YgZG9jdW1lbnQgIT09IFwidW5kZWZpbmVkXCIgJiYgZG9jdW1lbnQgIT09IG51bGwgPyAocmVmID0gZG9jdW1lbnQuc2VsZWN0aW9uKSAhPSBudWxsID8gcmVmLmNyZWF0ZVJhbmdlIDogdm9pZCAwIDogdm9pZCAwKSAhPSBudWxsKSB7XG4gICAgaWYgKGRvY3VtZW50LnNlbGVjdGlvbi5jcmVhdGVSYW5nZSgpLnRleHQpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuXG5yZUZvcm1hdENhcmROdW1iZXIgPSBmdW5jdGlvbihlKSB7XG4gIHJldHVybiBzZXRUaW1lb3V0KChmdW5jdGlvbihfdGhpcykge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciB0YXJnZXQsIHZhbHVlO1xuICAgICAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgICB2YWx1ZSA9IFFKLnZhbCh0YXJnZXQpO1xuICAgICAgdmFsdWUgPSBQYXltZW50LmZucy5mb3JtYXRDYXJkTnVtYmVyKHZhbHVlKTtcbiAgICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCB2YWx1ZSk7XG4gICAgfTtcbiAgfSkodGhpcykpO1xufTtcblxuZm9ybWF0Q2FyZE51bWJlciA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIGNhcmQsIGRpZ2l0LCBsZW5ndGgsIHJlLCB0YXJnZXQsIHVwcGVyTGVuZ3RoLCB2YWx1ZTtcbiAgZGlnaXQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpO1xuICBpZiAoIS9eXFxkKyQvLnRlc3QoZGlnaXQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRhcmdldCA9IGUudGFyZ2V0O1xuICB2YWx1ZSA9IFFKLnZhbCh0YXJnZXQpO1xuICBjYXJkID0gY2FyZEZyb21OdW1iZXIodmFsdWUgKyBkaWdpdCk7XG4gIGxlbmd0aCA9ICh2YWx1ZS5yZXBsYWNlKC9cXEQvZywgJycpICsgZGlnaXQpLmxlbmd0aDtcbiAgdXBwZXJMZW5ndGggPSAxNjtcbiAgaWYgKGNhcmQpIHtcbiAgICB1cHBlckxlbmd0aCA9IGNhcmQubGVuZ3RoW2NhcmQubGVuZ3RoLmxlbmd0aCAtIDFdO1xuICB9XG4gIGlmIChsZW5ndGggPj0gdXBwZXJMZW5ndGgpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKCh0YXJnZXQuc2VsZWN0aW9uU3RhcnQgIT0gbnVsbCkgJiYgdGFyZ2V0LnNlbGVjdGlvblN0YXJ0ICE9PSB2YWx1ZS5sZW5ndGgpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGNhcmQgJiYgY2FyZC50eXBlID09PSAnYW1leCcpIHtcbiAgICByZSA9IC9eKFxcZHs0fXxcXGR7NH1cXHNcXGR7Nn0pJC87XG4gIH0gZWxzZSB7XG4gICAgcmUgPSAvKD86XnxcXHMpKFxcZHs0fSkkLztcbiAgfVxuICBpZiAocmUudGVzdCh2YWx1ZSkpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIHZhbHVlICsgJyAnICsgZGlnaXQpO1xuICB9IGVsc2UgaWYgKHJlLnRlc3QodmFsdWUgKyBkaWdpdCkpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIHZhbHVlICsgZGlnaXQgKyAnICcpO1xuICB9XG59O1xuXG5mb3JtYXRCYWNrQ2FyZE51bWJlciA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIHRhcmdldCwgdmFsdWU7XG4gIHRhcmdldCA9IGUudGFyZ2V0O1xuICB2YWx1ZSA9IFFKLnZhbCh0YXJnZXQpO1xuICBpZiAoZS5tZXRhKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChlLndoaWNoICE9PSA4KSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICgodGFyZ2V0LnNlbGVjdGlvblN0YXJ0ICE9IG51bGwpICYmIHRhcmdldC5zZWxlY3Rpb25TdGFydCAhPT0gdmFsdWUubGVuZ3RoKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICgvXFxkXFxzJC8udGVzdCh2YWx1ZSkpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIHZhbHVlLnJlcGxhY2UoL1xcZFxccyQvLCAnJykpO1xuICB9IGVsc2UgaWYgKC9cXHNcXGQ/JC8udGVzdCh2YWx1ZSkpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIHZhbHVlLnJlcGxhY2UoL1xcc1xcZD8kLywgJycpKTtcbiAgfVxufTtcblxuZm9ybWF0RXhwaXJ5ID0gZnVuY3Rpb24oZSkge1xuICB2YXIgZGlnaXQsIHRhcmdldCwgdmFsO1xuICBkaWdpdCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZS53aGljaCk7XG4gIGlmICghL15cXGQrJC8udGVzdChkaWdpdCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gIHZhbCA9IFFKLnZhbCh0YXJnZXQpICsgZGlnaXQ7XG4gIGlmICgvXlxcZCQvLnRlc3QodmFsKSAmJiAodmFsICE9PSAnMCcgJiYgdmFsICE9PSAnMScpKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCBcIjBcIiArIHZhbCArIFwiIC8gXCIpO1xuICB9IGVsc2UgaWYgKC9eXFxkXFxkJC8udGVzdCh2YWwpKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCB2YWwgKyBcIiAvIFwiKTtcbiAgfVxufTtcblxuZm9ybWF0TW9udGhFeHBpcnkgPSBmdW5jdGlvbihlKSB7XG4gIHZhciBkaWdpdCwgdGFyZ2V0LCB2YWw7XG4gIGRpZ2l0ID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKTtcbiAgaWYgKCEvXlxcZCskLy50ZXN0KGRpZ2l0KSkge1xuICAgIHJldHVybjtcbiAgfVxuICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgdmFsID0gUUoudmFsKHRhcmdldCkgKyBkaWdpdDtcbiAgaWYgKC9eXFxkJC8udGVzdCh2YWwpICYmICh2YWwgIT09ICcwJyAmJiB2YWwgIT09ICcxJykpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIFwiMFwiICsgdmFsKTtcbiAgfSBlbHNlIGlmICgvXlxcZFxcZCQvLnRlc3QodmFsKSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgXCJcIiArIHZhbCk7XG4gIH1cbn07XG5cbmZvcm1hdEZvcndhcmRFeHBpcnkgPSBmdW5jdGlvbihlKSB7XG4gIHZhciBkaWdpdCwgdGFyZ2V0LCB2YWw7XG4gIGRpZ2l0ID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKTtcbiAgaWYgKCEvXlxcZCskLy50ZXN0KGRpZ2l0KSkge1xuICAgIHJldHVybjtcbiAgfVxuICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgdmFsID0gUUoudmFsKHRhcmdldCk7XG4gIGlmICgvXlxcZFxcZCQvLnRlc3QodmFsKSkge1xuICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCB2YWwgKyBcIiAvIFwiKTtcbiAgfVxufTtcblxuZm9ybWF0Rm9yd2FyZFNsYXNoID0gZnVuY3Rpb24oZSkge1xuICB2YXIgc2xhc2gsIHRhcmdldCwgdmFsO1xuICBzbGFzaCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZS53aGljaCk7XG4gIGlmIChzbGFzaCAhPT0gJy8nKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRhcmdldCA9IGUudGFyZ2V0O1xuICB2YWwgPSBRSi52YWwodGFyZ2V0KTtcbiAgaWYgKC9eXFxkJC8udGVzdCh2YWwpICYmIHZhbCAhPT0gJzAnKSB7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIFwiMFwiICsgdmFsICsgXCIgLyBcIik7XG4gIH1cbn07XG5cbmZvcm1hdEJhY2tFeHBpcnkgPSBmdW5jdGlvbihlKSB7XG4gIHZhciB0YXJnZXQsIHZhbHVlO1xuICBpZiAoZS5tZXRhS2V5KSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRhcmdldCA9IGUudGFyZ2V0O1xuICB2YWx1ZSA9IFFKLnZhbCh0YXJnZXQpO1xuICBpZiAoZS53aGljaCAhPT0gOCkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoKHRhcmdldC5zZWxlY3Rpb25TdGFydCAhPSBudWxsKSAmJiB0YXJnZXQuc2VsZWN0aW9uU3RhcnQgIT09IHZhbHVlLmxlbmd0aCkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoL1xcZChcXHN8XFwvKSskLy50ZXN0KHZhbHVlKSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgdmFsdWUucmVwbGFjZSgvXFxkKFxcc3xcXC8pKiQvLCAnJykpO1xuICB9IGVsc2UgaWYgKC9cXHNcXC9cXHM/XFxkPyQvLnRlc3QodmFsdWUpKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCB2YWx1ZS5yZXBsYWNlKC9cXHNcXC9cXHM/XFxkPyQvLCAnJykpO1xuICB9XG59O1xuXG5yZXN0cmljdE51bWVyaWMgPSBmdW5jdGlvbihlKSB7XG4gIHZhciBpbnB1dDtcbiAgaWYgKGUubWV0YUtleSB8fCBlLmN0cmxLZXkpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAoZS53aGljaCA9PT0gMzIpIHtcbiAgICByZXR1cm4gZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG4gIGlmIChlLndoaWNoID09PSAwKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKGUud2hpY2ggPCAzMykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlucHV0ID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKTtcbiAgaWYgKCEvW1xcZFxcc10vLnRlc3QoaW5wdXQpKSB7XG4gICAgcmV0dXJuIGUucHJldmVudERlZmF1bHQoKTtcbiAgfVxufTtcblxucmVzdHJpY3RDYXJkTnVtYmVyID0gZnVuY3Rpb24oZSkge1xuICB2YXIgY2FyZCwgZGlnaXQsIHRhcmdldCwgdmFsdWU7XG4gIHRhcmdldCA9IGUudGFyZ2V0O1xuICBkaWdpdCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZS53aGljaCk7XG4gIGlmICghL15cXGQrJC8udGVzdChkaWdpdCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGhhc1RleHRTZWxlY3RlZCh0YXJnZXQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhbHVlID0gKFFKLnZhbCh0YXJnZXQpICsgZGlnaXQpLnJlcGxhY2UoL1xcRC9nLCAnJyk7XG4gIGNhcmQgPSBjYXJkRnJvbU51bWJlcih2YWx1ZSk7XG4gIGlmIChjYXJkKSB7XG4gICAgaWYgKCEodmFsdWUubGVuZ3RoIDw9IGNhcmQubGVuZ3RoW2NhcmQubGVuZ3RoLmxlbmd0aCAtIDFdKSkge1xuICAgICAgcmV0dXJuIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKCEodmFsdWUubGVuZ3RoIDw9IDE2KSkge1xuICAgICAgcmV0dXJuIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH1cbn07XG5cbnJlc3RyaWN0RXhwaXJ5ID0gZnVuY3Rpb24oZSwgbGVuZ3RoKSB7XG4gIHZhciBkaWdpdCwgdGFyZ2V0LCB2YWx1ZTtcbiAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gIGRpZ2l0ID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKTtcbiAgaWYgKCEvXlxcZCskLy50ZXN0KGRpZ2l0KSkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoaGFzVGV4dFNlbGVjdGVkKHRhcmdldCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFsdWUgPSBRSi52YWwodGFyZ2V0KSArIGRpZ2l0O1xuICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1xcRC9nLCAnJyk7XG4gIGlmICh2YWx1ZS5sZW5ndGggPiBsZW5ndGgpIHtcbiAgICByZXR1cm4gZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG59O1xuXG5yZXN0cmljdENvbWJpbmVkRXhwaXJ5ID0gZnVuY3Rpb24oZSkge1xuICByZXR1cm4gcmVzdHJpY3RFeHBpcnkoZSwgNik7XG59O1xuXG5yZXN0cmljdE1vbnRoRXhwaXJ5ID0gZnVuY3Rpb24oZSkge1xuICByZXR1cm4gcmVzdHJpY3RFeHBpcnkoZSwgMik7XG59O1xuXG5yZXN0cmljdFllYXJFeHBpcnkgPSBmdW5jdGlvbihlKSB7XG4gIHJldHVybiByZXN0cmljdEV4cGlyeShlLCA0KTtcbn07XG5cbnJlc3RyaWN0Q1ZDID0gZnVuY3Rpb24oZSkge1xuICB2YXIgZGlnaXQsIHRhcmdldCwgdmFsO1xuICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgZGlnaXQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpO1xuICBpZiAoIS9eXFxkKyQvLnRlc3QoZGlnaXQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChoYXNUZXh0U2VsZWN0ZWQodGFyZ2V0KSkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YWwgPSBRSi52YWwodGFyZ2V0KSArIGRpZ2l0O1xuICBpZiAoISh2YWwubGVuZ3RoIDw9IDQpKSB7XG4gICAgcmV0dXJuIGUucHJldmVudERlZmF1bHQoKTtcbiAgfVxufTtcblxuc2V0Q2FyZFR5cGUgPSBmdW5jdGlvbihlKSB7XG4gIHZhciBhbGxUeXBlcywgY2FyZCwgY2FyZFR5cGUsIHRhcmdldCwgdmFsO1xuICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgdmFsID0gUUoudmFsKHRhcmdldCk7XG4gIGNhcmRUeXBlID0gUGF5bWVudC5mbnMuY2FyZFR5cGUodmFsKSB8fCAndW5rbm93bic7XG4gIGlmICghUUouaGFzQ2xhc3ModGFyZ2V0LCBjYXJkVHlwZSkpIHtcbiAgICBhbGxUeXBlcyA9IChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBpLCBsZW4sIHJlc3VsdHM7XG4gICAgICByZXN1bHRzID0gW107XG4gICAgICBmb3IgKGkgPSAwLCBsZW4gPSBjYXJkcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBjYXJkID0gY2FyZHNbaV07XG4gICAgICAgIHJlc3VsdHMucHVzaChjYXJkLnR5cGUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfSkoKTtcbiAgICBRSi5yZW1vdmVDbGFzcyh0YXJnZXQsICd1bmtub3duJyk7XG4gICAgUUoucmVtb3ZlQ2xhc3ModGFyZ2V0LCBhbGxUeXBlcy5qb2luKCcgJykpO1xuICAgIFFKLmFkZENsYXNzKHRhcmdldCwgY2FyZFR5cGUpO1xuICAgIFFKLnRvZ2dsZUNsYXNzKHRhcmdldCwgJ2lkZW50aWZpZWQnLCBjYXJkVHlwZSAhPT0gJ3Vua25vd24nKTtcbiAgICByZXR1cm4gUUoudHJpZ2dlcih0YXJnZXQsICdwYXltZW50LmNhcmRUeXBlJywgY2FyZFR5cGUpO1xuICB9XG59O1xuXG5QYXltZW50ID0gKGZ1bmN0aW9uKCkge1xuICBmdW5jdGlvbiBQYXltZW50KCkge31cblxuICBQYXltZW50LmZucyA9IHtcbiAgICBjYXJkRXhwaXJ5VmFsOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgdmFyIG1vbnRoLCBwcmVmaXgsIHJlZiwgeWVhcjtcbiAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvXFxzL2csICcnKTtcbiAgICAgIHJlZiA9IHZhbHVlLnNwbGl0KCcvJywgMiksIG1vbnRoID0gcmVmWzBdLCB5ZWFyID0gcmVmWzFdO1xuICAgICAgaWYgKCh5ZWFyICE9IG51bGwgPyB5ZWFyLmxlbmd0aCA6IHZvaWQgMCkgPT09IDIgJiYgL15cXGQrJC8udGVzdCh5ZWFyKSkge1xuICAgICAgICBwcmVmaXggPSAobmV3IERhdGUpLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgIHByZWZpeCA9IHByZWZpeC50b1N0cmluZygpLnNsaWNlKDAsIDIpO1xuICAgICAgICB5ZWFyID0gcHJlZml4ICsgeWVhcjtcbiAgICAgIH1cbiAgICAgIG1vbnRoID0gcGFyc2VJbnQobW9udGgsIDEwKTtcbiAgICAgIHllYXIgPSBwYXJzZUludCh5ZWFyLCAxMCk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBtb250aDogbW9udGgsXG4gICAgICAgIHllYXI6IHllYXJcbiAgICAgIH07XG4gICAgfSxcbiAgICB2YWxpZGF0ZUNhcmROdW1iZXI6IGZ1bmN0aW9uKG51bSkge1xuICAgICAgdmFyIGNhcmQsIHJlZjtcbiAgICAgIG51bSA9IChudW0gKyAnJykucmVwbGFjZSgvXFxzK3wtL2csICcnKTtcbiAgICAgIGlmICghL15cXGQrJC8udGVzdChudW0pKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGNhcmQgPSBjYXJkRnJvbU51bWJlcihudW0pO1xuICAgICAgaWYgKCFjYXJkKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAocmVmID0gbnVtLmxlbmd0aCwgaW5kZXhPZi5jYWxsKGNhcmQubGVuZ3RoLCByZWYpID49IDApICYmIChjYXJkLmx1aG4gPT09IGZhbHNlIHx8IGx1aG5DaGVjayhudW0pKTtcbiAgICB9LFxuICAgIHZhbGlkYXRlQ2FyZEV4cGlyeTogZnVuY3Rpb24obW9udGgsIHllYXIpIHtcbiAgICAgIHZhciBjdXJyZW50VGltZSwgZXhwaXJ5LCBwcmVmaXgsIHJlZjtcbiAgICAgIGlmICh0eXBlb2YgbW9udGggPT09ICdvYmplY3QnICYmICdtb250aCcgaW4gbW9udGgpIHtcbiAgICAgICAgcmVmID0gbW9udGgsIG1vbnRoID0gcmVmLm1vbnRoLCB5ZWFyID0gcmVmLnllYXI7XG4gICAgICB9XG4gICAgICBpZiAoIShtb250aCAmJiB5ZWFyKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBtb250aCA9IFFKLnRyaW0obW9udGgpO1xuICAgICAgeWVhciA9IFFKLnRyaW0oeWVhcik7XG4gICAgICBpZiAoIS9eXFxkKyQvLnRlc3QobW9udGgpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICghL15cXGQrJC8udGVzdCh5ZWFyKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoIShwYXJzZUludChtb250aCwgMTApIDw9IDEyKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoeWVhci5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgcHJlZml4ID0gKG5ldyBEYXRlKS5nZXRGdWxsWWVhcigpO1xuICAgICAgICBwcmVmaXggPSBwcmVmaXgudG9TdHJpbmcoKS5zbGljZSgwLCAyKTtcbiAgICAgICAgeWVhciA9IHByZWZpeCArIHllYXI7XG4gICAgICB9XG4gICAgICBleHBpcnkgPSBuZXcgRGF0ZSh5ZWFyLCBtb250aCk7XG4gICAgICBjdXJyZW50VGltZSA9IG5ldyBEYXRlO1xuICAgICAgZXhwaXJ5LnNldE1vbnRoKGV4cGlyeS5nZXRNb250aCgpIC0gMSk7XG4gICAgICBleHBpcnkuc2V0TW9udGgoZXhwaXJ5LmdldE1vbnRoKCkgKyAxLCAxKTtcbiAgICAgIHJldHVybiBleHBpcnkgPiBjdXJyZW50VGltZTtcbiAgICB9LFxuICAgIHZhbGlkYXRlQ2FyZENWQzogZnVuY3Rpb24oY3ZjLCB0eXBlKSB7XG4gICAgICB2YXIgcmVmLCByZWYxO1xuICAgICAgY3ZjID0gUUoudHJpbShjdmMpO1xuICAgICAgaWYgKCEvXlxcZCskLy50ZXN0KGN2YykpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGUgJiYgY2FyZEZyb21UeXBlKHR5cGUpKSB7XG4gICAgICAgIHJldHVybiByZWYgPSBjdmMubGVuZ3RoLCBpbmRleE9mLmNhbGwoKHJlZjEgPSBjYXJkRnJvbVR5cGUodHlwZSkpICE9IG51bGwgPyByZWYxLmN2Y0xlbmd0aCA6IHZvaWQgMCwgcmVmKSA+PSAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGN2Yy5sZW5ndGggPj0gMyAmJiBjdmMubGVuZ3RoIDw9IDQ7XG4gICAgICB9XG4gICAgfSxcbiAgICBjYXJkVHlwZTogZnVuY3Rpb24obnVtKSB7XG4gICAgICB2YXIgcmVmO1xuICAgICAgaWYgKCFudW0pIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICByZXR1cm4gKChyZWYgPSBjYXJkRnJvbU51bWJlcihudW0pKSAhPSBudWxsID8gcmVmLnR5cGUgOiB2b2lkIDApIHx8IG51bGw7XG4gICAgfSxcbiAgICBmb3JtYXRDYXJkTnVtYmVyOiBmdW5jdGlvbihudW0pIHtcbiAgICAgIHZhciBjYXJkLCBncm91cHMsIHJlZiwgdXBwZXJMZW5ndGg7XG4gICAgICBjYXJkID0gY2FyZEZyb21OdW1iZXIobnVtKTtcbiAgICAgIGlmICghY2FyZCkge1xuICAgICAgICByZXR1cm4gbnVtO1xuICAgICAgfVxuICAgICAgdXBwZXJMZW5ndGggPSBjYXJkLmxlbmd0aFtjYXJkLmxlbmd0aC5sZW5ndGggLSAxXTtcbiAgICAgIG51bSA9IG51bS5yZXBsYWNlKC9cXEQvZywgJycpO1xuICAgICAgbnVtID0gbnVtLnNsaWNlKDAsICt1cHBlckxlbmd0aCArIDEgfHwgOWU5KTtcbiAgICAgIGlmIChjYXJkLmZvcm1hdC5nbG9iYWwpIHtcbiAgICAgICAgcmV0dXJuIChyZWYgPSBudW0ubWF0Y2goY2FyZC5mb3JtYXQpKSAhPSBudWxsID8gcmVmLmpvaW4oJyAnKSA6IHZvaWQgMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGdyb3VwcyA9IGNhcmQuZm9ybWF0LmV4ZWMobnVtKTtcbiAgICAgICAgaWYgKGdyb3VwcyAhPSBudWxsKSB7XG4gICAgICAgICAgZ3JvdXBzLnNoaWZ0KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGdyb3VwcyAhPSBudWxsID8gZ3JvdXBzLmpvaW4oJyAnKSA6IHZvaWQgMDtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgUGF5bWVudC5yZXN0cmljdE51bWVyaWMgPSBmdW5jdGlvbihlbCkge1xuICAgIHJldHVybiBRSi5vbihlbCwgJ2tleXByZXNzJywgcmVzdHJpY3ROdW1lcmljKTtcbiAgfTtcblxuICBQYXltZW50LmNhcmRFeHBpcnlWYWwgPSBmdW5jdGlvbihlbCkge1xuICAgIHJldHVybiBQYXltZW50LmZucy5jYXJkRXhwaXJ5VmFsKFFKLnZhbChlbCkpO1xuICB9O1xuXG4gIFBheW1lbnQuZm9ybWF0Q2FyZENWQyA9IGZ1bmN0aW9uKGVsKSB7XG4gICAgUGF5bWVudC5yZXN0cmljdE51bWVyaWMoZWwpO1xuICAgIFFKLm9uKGVsLCAna2V5cHJlc3MnLCByZXN0cmljdENWQyk7XG4gICAgcmV0dXJuIGVsO1xuICB9O1xuXG4gIFBheW1lbnQuZm9ybWF0Q2FyZEV4cGlyeSA9IGZ1bmN0aW9uKGVsKSB7XG4gICAgdmFyIG1vbnRoLCB5ZWFyO1xuICAgIFBheW1lbnQucmVzdHJpY3ROdW1lcmljKGVsKTtcbiAgICBpZiAoZWwubGVuZ3RoICYmIGVsLmxlbmd0aCA9PT0gMikge1xuICAgICAgbW9udGggPSBlbFswXSwgeWVhciA9IGVsWzFdO1xuICAgICAgdGhpcy5mb3JtYXRDYXJkRXhwaXJ5TXVsdGlwbGUobW9udGgsIHllYXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBRSi5vbihlbCwgJ2tleXByZXNzJywgcmVzdHJpY3RDb21iaW5lZEV4cGlyeSk7XG4gICAgICBRSi5vbihlbCwgJ2tleXByZXNzJywgZm9ybWF0RXhwaXJ5KTtcbiAgICAgIFFKLm9uKGVsLCAna2V5cHJlc3MnLCBmb3JtYXRGb3J3YXJkU2xhc2gpO1xuICAgICAgUUoub24oZWwsICdrZXlwcmVzcycsIGZvcm1hdEZvcndhcmRFeHBpcnkpO1xuICAgICAgUUoub24oZWwsICdrZXlkb3duJywgZm9ybWF0QmFja0V4cGlyeSk7XG4gICAgfVxuICAgIHJldHVybiBlbDtcbiAgfTtcblxuICBQYXltZW50LmZvcm1hdENhcmRFeHBpcnlNdWx0aXBsZSA9IGZ1bmN0aW9uKG1vbnRoLCB5ZWFyKSB7XG4gICAgUUoub24obW9udGgsICdrZXlwcmVzcycsIHJlc3RyaWN0TW9udGhFeHBpcnkpO1xuICAgIFFKLm9uKG1vbnRoLCAna2V5cHJlc3MnLCBmb3JtYXRNb250aEV4cGlyeSk7XG4gICAgcmV0dXJuIFFKLm9uKHllYXIsICdrZXlwcmVzcycsIHJlc3RyaWN0WWVhckV4cGlyeSk7XG4gIH07XG5cbiAgUGF5bWVudC5mb3JtYXRDYXJkTnVtYmVyID0gZnVuY3Rpb24oZWwpIHtcbiAgICBQYXltZW50LnJlc3RyaWN0TnVtZXJpYyhlbCk7XG4gICAgUUoub24oZWwsICdrZXlwcmVzcycsIHJlc3RyaWN0Q2FyZE51bWJlcik7XG4gICAgUUoub24oZWwsICdrZXlwcmVzcycsIGZvcm1hdENhcmROdW1iZXIpO1xuICAgIFFKLm9uKGVsLCAna2V5ZG93bicsIGZvcm1hdEJhY2tDYXJkTnVtYmVyKTtcbiAgICBRSi5vbihlbCwgJ2tleXVwJywgc2V0Q2FyZFR5cGUpO1xuICAgIFFKLm9uKGVsLCAncGFzdGUnLCByZUZvcm1hdENhcmROdW1iZXIpO1xuICAgIHJldHVybiBlbDtcbiAgfTtcblxuICBQYXltZW50LmdldENhcmRBcnJheSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBjYXJkcztcbiAgfTtcblxuICBQYXltZW50LnNldENhcmRBcnJheSA9IGZ1bmN0aW9uKGNhcmRBcnJheSkge1xuICAgIGNhcmRzID0gY2FyZEFycmF5O1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIFBheW1lbnQuYWRkVG9DYXJkQXJyYXkgPSBmdW5jdGlvbihjYXJkT2JqZWN0KSB7XG4gICAgcmV0dXJuIGNhcmRzLnB1c2goY2FyZE9iamVjdCk7XG4gIH07XG5cbiAgUGF5bWVudC5yZW1vdmVGcm9tQ2FyZEFycmF5ID0gZnVuY3Rpb24odHlwZSkge1xuICAgIHZhciBrZXksIHZhbHVlO1xuICAgIGZvciAoa2V5IGluIGNhcmRzKSB7XG4gICAgICB2YWx1ZSA9IGNhcmRzW2tleV07XG4gICAgICBpZiAodmFsdWUudHlwZSA9PT0gdHlwZSkge1xuICAgICAgICBjYXJkcy5zcGxpY2Uoa2V5LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgcmV0dXJuIFBheW1lbnQ7XG5cbn0pKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gUGF5bWVudDtcblxuZ2xvYmFsLlBheW1lbnQgPSBQYXltZW50O1xuXG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxufSx7XCJxai9zcmMvcWouY29mZmVlXCI6MX1dfSx7fSxbMl0pKDIpXG59KTsiLCIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpKHsxOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcInVzZSBzdHJpY3RcIjt2YXIgX3ZhbGlkRm9ybT1yZXF1aXJlKFwiLi9zcmMvdmFsaWQtZm9ybVwiKTt2YXIgX3ZhbGlkRm9ybTI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdmFsaWRGb3JtKTtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iail7cmV0dXJuIG9iaiYmb2JqLl9fZXNNb2R1bGU/b2JqOntkZWZhdWx0Om9ian19d2luZG93LlZhbGlkRm9ybT1fdmFsaWRGb3JtMi5kZWZhdWx0O3dpbmRvdy5WYWxpZEZvcm0udG9nZ2xlSW52YWxpZENsYXNzPV92YWxpZEZvcm0udG9nZ2xlSW52YWxpZENsYXNzO3dpbmRvdy5WYWxpZEZvcm0uaGFuZGxlQ3VzdG9tTWVzc2FnZXM9X3ZhbGlkRm9ybS5oYW5kbGVDdXN0b21NZXNzYWdlczt3aW5kb3cuVmFsaWRGb3JtLmhhbmRsZUN1c3RvbU1lc3NhZ2VEaXNwbGF5PV92YWxpZEZvcm0uaGFuZGxlQ3VzdG9tTWVzc2FnZURpc3BsYXl9LHtcIi4vc3JjL3ZhbGlkLWZvcm1cIjozfV0sMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOnRydWV9KTtleHBvcnRzLmNsb25lPWNsb25lO2V4cG9ydHMuZGVmYXVsdHM9ZGVmYXVsdHM7ZXhwb3J0cy5pbnNlcnRBZnRlcj1pbnNlcnRBZnRlcjtleHBvcnRzLmluc2VydEJlZm9yZT1pbnNlcnRCZWZvcmU7ZXhwb3J0cy5mb3JFYWNoPWZvckVhY2g7ZXhwb3J0cy5kZWJvdW5jZT1kZWJvdW5jZTtmdW5jdGlvbiBjbG9uZShvYmope3ZhciBjb3B5PXt9O2Zvcih2YXIgYXR0ciBpbiBvYmope2lmKG9iai5oYXNPd25Qcm9wZXJ0eShhdHRyKSljb3B5W2F0dHJdPW9ialthdHRyXX1yZXR1cm4gY29weX1mdW5jdGlvbiBkZWZhdWx0cyhvYmosZGVmYXVsdE9iamVjdCl7b2JqPWNsb25lKG9ianx8e30pO2Zvcih2YXIgayBpbiBkZWZhdWx0T2JqZWN0KXtpZihvYmpba109PT11bmRlZmluZWQpb2JqW2tdPWRlZmF1bHRPYmplY3Rba119cmV0dXJuIG9ian1mdW5jdGlvbiBpbnNlcnRBZnRlcihyZWZOb2RlLG5vZGVUb0luc2VydCl7dmFyIHNpYmxpbmc9cmVmTm9kZS5uZXh0U2libGluZztpZihzaWJsaW5nKXt2YXIgX3BhcmVudD1yZWZOb2RlLnBhcmVudE5vZGU7X3BhcmVudC5pbnNlcnRCZWZvcmUobm9kZVRvSW5zZXJ0LHNpYmxpbmcpfWVsc2V7cGFyZW50LmFwcGVuZENoaWxkKG5vZGVUb0luc2VydCl9fWZ1bmN0aW9uIGluc2VydEJlZm9yZShyZWZOb2RlLG5vZGVUb0luc2VydCl7dmFyIHBhcmVudD1yZWZOb2RlLnBhcmVudE5vZGU7cGFyZW50Lmluc2VydEJlZm9yZShub2RlVG9JbnNlcnQscmVmTm9kZSl9ZnVuY3Rpb24gZm9yRWFjaChpdGVtcyxmbil7aWYoIWl0ZW1zKXJldHVybjtpZihpdGVtcy5mb3JFYWNoKXtpdGVtcy5mb3JFYWNoKGZuKX1lbHNle2Zvcih2YXIgaT0wO2k8aXRlbXMubGVuZ3RoO2krKyl7Zm4oaXRlbXNbaV0saSxpdGVtcyl9fX1mdW5jdGlvbiBkZWJvdW5jZShtcyxmbil7dmFyIHRpbWVvdXQ9dm9pZCAwO3ZhciBkZWJvdW5jZWRGbj1mdW5jdGlvbiBkZWJvdW5jZWRGbigpe2NsZWFyVGltZW91dCh0aW1lb3V0KTt0aW1lb3V0PXNldFRpbWVvdXQoZm4sbXMpfTtyZXR1cm4gZGVib3VuY2VkRm59fSx7fV0sMzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOnRydWV9KTtleHBvcnRzLnRvZ2dsZUludmFsaWRDbGFzcz10b2dnbGVJbnZhbGlkQ2xhc3M7ZXhwb3J0cy5oYW5kbGVDdXN0b21NZXNzYWdlcz1oYW5kbGVDdXN0b21NZXNzYWdlcztleHBvcnRzLmhhbmRsZUN1c3RvbU1lc3NhZ2VEaXNwbGF5PWhhbmRsZUN1c3RvbU1lc3NhZ2VEaXNwbGF5O2V4cG9ydHMuZGVmYXVsdD12YWxpZEZvcm07dmFyIF91dGlsPXJlcXVpcmUoXCIuL3V0aWxcIik7ZnVuY3Rpb24gdG9nZ2xlSW52YWxpZENsYXNzKGlucHV0LGludmFsaWRDbGFzcyl7aW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImludmFsaWRcIixmdW5jdGlvbigpe2lucHV0LmNsYXNzTGlzdC5hZGQoaW52YWxpZENsYXNzKX0pO2lucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLGZ1bmN0aW9uKCl7aWYoaW5wdXQudmFsaWRpdHkudmFsaWQpe2lucHV0LmNsYXNzTGlzdC5yZW1vdmUoaW52YWxpZENsYXNzKX19KX12YXIgZXJyb3JQcm9wcz1bXCJiYWRJbnB1dFwiLFwicGF0dGVybk1pc21hdGNoXCIsXCJyYW5nZU92ZXJmbG93XCIsXCJyYW5nZVVuZGVyZmxvd1wiLFwic3RlcE1pc21hdGNoXCIsXCJ0b29Mb25nXCIsXCJ0b29TaG9ydFwiLFwidHlwZU1pc21hdGNoXCIsXCJ2YWx1ZU1pc3NpbmdcIixcImN1c3RvbUVycm9yXCJdO2Z1bmN0aW9uIGdldEN1c3RvbU1lc3NhZ2UoaW5wdXQsY3VzdG9tTWVzc2FnZXMpe2N1c3RvbU1lc3NhZ2VzPWN1c3RvbU1lc3NhZ2VzfHx7fTt2YXIgbG9jYWxFcnJvclByb3BzPVtpbnB1dC50eXBlK1wiTWlzbWF0Y2hcIl0uY29uY2F0KGVycm9yUHJvcHMpO3ZhciB2YWxpZGl0eT1pbnB1dC52YWxpZGl0eTtmb3IodmFyIGk9MDtpPGxvY2FsRXJyb3JQcm9wcy5sZW5ndGg7aSsrKXt2YXIgcHJvcD1sb2NhbEVycm9yUHJvcHNbaV07aWYodmFsaWRpdHlbcHJvcF0pe3JldHVybiBpbnB1dC5nZXRBdHRyaWJ1dGUoXCJkYXRhLVwiK3Byb3ApfHxjdXN0b21NZXNzYWdlc1twcm9wXX19fWZ1bmN0aW9uIGhhbmRsZUN1c3RvbU1lc3NhZ2VzKGlucHV0LGN1c3RvbU1lc3NhZ2VzKXtmdW5jdGlvbiBjaGVja1ZhbGlkaXR5KCl7dmFyIG1lc3NhZ2U9aW5wdXQudmFsaWRpdHkudmFsaWQ/bnVsbDpnZXRDdXN0b21NZXNzYWdlKGlucHV0LGN1c3RvbU1lc3NhZ2VzKTtpbnB1dC5zZXRDdXN0b21WYWxpZGl0eShtZXNzYWdlfHxcIlwiKX1pbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIixjaGVja1ZhbGlkaXR5KTtpbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiaW52YWxpZFwiLGNoZWNrVmFsaWRpdHkpfWZ1bmN0aW9uIGhhbmRsZUN1c3RvbU1lc3NhZ2VEaXNwbGF5KGlucHV0LG9wdGlvbnMpe3ZhciB2YWxpZGF0aW9uRXJyb3JDbGFzcz1vcHRpb25zLnZhbGlkYXRpb25FcnJvckNsYXNzLHZhbGlkYXRpb25FcnJvclBhcmVudENsYXNzPW9wdGlvbnMudmFsaWRhdGlvbkVycm9yUGFyZW50Q2xhc3MsZXJyb3JQbGFjZW1lbnQ9b3B0aW9ucy5lcnJvclBsYWNlbWVudDtmdW5jdGlvbiBjaGVja1ZhbGlkaXR5KG9wdGlvbnMpe3ZhciBpbnNlcnRFcnJvcj1vcHRpb25zLmluc2VydEVycm9yO3ZhciBwYXJlbnROb2RlPWlucHV0LnBhcmVudE5vZGU7dmFyIGVycm9yTm9kZT1wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoXCIuXCIrdmFsaWRhdGlvbkVycm9yQ2xhc3MpfHxkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO2lmKCFpbnB1dC52YWxpZGl0eS52YWxpZCYmaW5wdXQudmFsaWRhdGlvbk1lc3NhZ2Upe2Vycm9yTm9kZS5jbGFzc05hbWU9dmFsaWRhdGlvbkVycm9yQ2xhc3M7ZXJyb3JOb2RlLnRleHRDb250ZW50PWlucHV0LnZhbGlkYXRpb25NZXNzYWdlO2lmKGluc2VydEVycm9yKXtlcnJvclBsYWNlbWVudD09PVwiYmVmb3JlXCI/KDAsX3V0aWwuaW5zZXJ0QmVmb3JlKShpbnB1dCxlcnJvck5vZGUpOigwLF91dGlsLmluc2VydEFmdGVyKShpbnB1dCxlcnJvck5vZGUpO3BhcmVudE5vZGUuY2xhc3NMaXN0LmFkZCh2YWxpZGF0aW9uRXJyb3JQYXJlbnRDbGFzcyl9fWVsc2V7cGFyZW50Tm9kZS5jbGFzc0xpc3QucmVtb3ZlKHZhbGlkYXRpb25FcnJvclBhcmVudENsYXNzKTtlcnJvck5vZGUucmVtb3ZlKCl9fWlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLGZ1bmN0aW9uKCl7Y2hlY2tWYWxpZGl0eSh7aW5zZXJ0RXJyb3I6ZmFsc2V9KX0pO2lucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnZhbGlkXCIsZnVuY3Rpb24oZSl7ZS5wcmV2ZW50RGVmYXVsdCgpO2NoZWNrVmFsaWRpdHkoe2luc2VydEVycm9yOnRydWV9KX0pfXZhciBkZWZhdWx0T3B0aW9ucz17aW52YWxpZENsYXNzOlwiaW52YWxpZFwiLHZhbGlkYXRpb25FcnJvckNsYXNzOlwidmFsaWRhdGlvbi1lcnJvclwiLHZhbGlkYXRpb25FcnJvclBhcmVudENsYXNzOlwiaGFzLXZhbGlkYXRpb24tZXJyb3JcIixjdXN0b21NZXNzYWdlczp7fSxlcnJvclBsYWNlbWVudDpcImJlZm9yZVwifTtmdW5jdGlvbiB2YWxpZEZvcm0oZWxlbWVudCxvcHRpb25zKXtpZighZWxlbWVudHx8IWVsZW1lbnQubm9kZU5hbWUpe3Rocm93IG5ldyBFcnJvcihcIkZpcnN0IGFyZyB0byB2YWxpZEZvcm0gbXVzdCBiZSBhIGZvcm0sIGlucHV0LCBzZWxlY3QsIG9yIHRleHRhcmVhXCIpfXZhciBpbnB1dHM9dm9pZCAwO3ZhciB0eXBlPWVsZW1lbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtvcHRpb25zPSgwLF91dGlsLmRlZmF1bHRzKShvcHRpb25zLGRlZmF1bHRPcHRpb25zKTtpZih0eXBlPT09XCJmb3JtXCIpe2lucHV0cz1lbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbnB1dCwgc2VsZWN0LCB0ZXh0YXJlYVwiKTtmb2N1c0ludmFsaWRJbnB1dChlbGVtZW50LGlucHV0cyl9ZWxzZSBpZih0eXBlPT09XCJpbnB1dFwifHx0eXBlPT09XCJzZWxlY3RcInx8dHlwZT09PVwidGV4dGFyZWFcIil7aW5wdXRzPVtlbGVtZW50XX1lbHNle3Rocm93IG5ldyBFcnJvcihcIk9ubHkgZm9ybSwgaW5wdXQsIHNlbGVjdCwgb3IgdGV4dGFyZWEgZWxlbWVudHMgYXJlIHN1cHBvcnRlZFwiKX12YWxpZEZvcm1JbnB1dHMoaW5wdXRzLG9wdGlvbnMpfWZ1bmN0aW9uIGZvY3VzSW52YWxpZElucHV0KGZvcm0saW5wdXRzKXt2YXIgZm9jdXNGaXJzdD0oMCxfdXRpbC5kZWJvdW5jZSkoMTAwLGZ1bmN0aW9uKCl7dmFyIGludmFsaWROb2RlPWZvcm0ucXVlcnlTZWxlY3RvcihcIjppbnZhbGlkXCIpO2lmKGludmFsaWROb2RlKWludmFsaWROb2RlLmZvY3VzKCl9KTsoMCxfdXRpbC5mb3JFYWNoKShpbnB1dHMsZnVuY3Rpb24oaW5wdXQpe3JldHVybiBpbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiaW52YWxpZFwiLGZvY3VzRmlyc3QpfSl9ZnVuY3Rpb24gdmFsaWRGb3JtSW5wdXRzKGlucHV0cyxvcHRpb25zKXt2YXIgaW52YWxpZENsYXNzPW9wdGlvbnMuaW52YWxpZENsYXNzLGN1c3RvbU1lc3NhZ2VzPW9wdGlvbnMuY3VzdG9tTWVzc2FnZXM7KDAsX3V0aWwuZm9yRWFjaCkoaW5wdXRzLGZ1bmN0aW9uKGlucHV0KXt0b2dnbGVJbnZhbGlkQ2xhc3MoaW5wdXQsaW52YWxpZENsYXNzKTtoYW5kbGVDdXN0b21NZXNzYWdlcyhpbnB1dCxjdXN0b21NZXNzYWdlcyk7aGFuZGxlQ3VzdG9tTWVzc2FnZURpc3BsYXkoaW5wdXQsb3B0aW9ucyl9KX19LHtcIi4vdXRpbFwiOjJ9XX0se30sWzFdKTsiLCIvLyBNaW5uUG9zdCBHaXZpbmcgcGx1Z2luXG4vLyB0aGUgc2VtaS1jb2xvbiBiZWZvcmUgZnVuY3Rpb24gaW52b2NhdGlvbiBpcyBhIHNhZmV0eSBuZXQgYWdhaW5zdCBjb25jYXRlbmF0ZWRcbi8vIHNjcmlwdHMgYW5kL29yIG90aGVyIHBsdWdpbnMgd2hpY2ggbWF5IG5vdCBiZSBjbG9zZWQgcHJvcGVybHkuXG47KGZ1bmN0aW9uICggJCwgd2luZG93LCBkb2N1bWVudCwgdW5kZWZpbmVkICkge1xuXG4gIC8vIHVuZGVmaW5lZCBpcyB1c2VkIGhlcmUgYXMgdGhlIHVuZGVmaW5lZCBnbG9iYWwgdmFyaWFibGUgaW4gRUNNQVNjcmlwdCAzIGlzXG4gIC8vIG11dGFibGUgKGllLiBpdCBjYW4gYmUgY2hhbmdlZCBieSBzb21lb25lIGVsc2UpLiB1bmRlZmluZWQgaXNuJ3QgcmVhbGx5IGJlaW5nXG4gIC8vIHBhc3NlZCBpbiBzbyB3ZSBjYW4gZW5zdXJlIHRoZSB2YWx1ZSBvZiBpdCBpcyB0cnVseSB1bmRlZmluZWQuIEluIEVTNSwgdW5kZWZpbmVkXG4gIC8vIGNhbiBubyBsb25nZXIgYmUgbW9kaWZpZWQuXG5cbiAgLy8gd2luZG93IGFuZCBkb2N1bWVudCBhcmUgcGFzc2VkIHRocm91Z2ggYXMgbG9jYWwgdmFyaWFibGUgcmF0aGVyIHRoYW4gZ2xvYmFsXG4gIC8vIGFzIHRoaXMgKHNsaWdodGx5KSBxdWlja2VucyB0aGUgcmVzb2x1dGlvbiBwcm9jZXNzIGFuZCBjYW4gYmUgbW9yZSBlZmZpY2llbnRseVxuICAvLyBtaW5pZmllZCAoZXNwZWNpYWxseSB3aGVuIGJvdGggYXJlIHJlZ3VsYXJseSByZWZlcmVuY2VkIGluIHlvdXIgcGx1Z2luKS5cblxuICAvLyBDcmVhdGUgdGhlIGRlZmF1bHRzIG9uY2VcbiAgdmFyIHBsdWdpbk5hbWUgPSAnbWlubnBvc3RfZ2l2aW5nJyxcbiAgZGVmYXVsdHMgPSB7XG4gICAgJ2RlYnVnJyA6IGZhbHNlLCAvLyB0aGlzIGNhbiBiZSBzZXQgdG8gdHJ1ZSBvbiBwYWdlIGxldmVsIG9wdGlvbnNcbiAgICAnc3RyaXBlX3B1Ymxpc2hhYmxlX2tleScgOiAnJyxcbiAgICAncGxhaWRfZW52JyA6ICcnLFxuICAgICdwbGFpZF9saW5rJyA6ICcjYXV0aG9yaXplLWFjaCcsXG4gICAgJ21pbm5wb3N0X3Jvb3QnIDogJ2h0dHBzOi8vd3d3Lm1pbm5wb3N0LmNvbScsXG4gICAgJ3Byb2dyZXNzX3NlbGVjdG9yJyA6ICcubS1zdXBwb3J0LXByb2dyZXNzJyxcbiAgICAnZm9ybV9zZWxlY3RvcicgOiAnLm0tZm9ybScsXG4gICAgJ2RvbmF0ZV9mb3JtX3NlbGVjdG9yJzogJyNkb25hdGUnLFxuICAgICdjb25maXJtX2Zvcm1fc2VsZWN0b3InIDogJyNjb25maXJtJyxcbiAgICAnZmluaXNoX3NlY3Rpb25fc2VsZWN0b3InIDogJyNwYW5lbC0tY29uZmlybWF0aW9uJyxcbiAgICAncGF5X2NjX3Byb2Nlc3Npbmdfc2VsZWN0b3InIDogJ2lucHV0W25hbWU9XCJwYXlfZmVlc1wiXScsXG4gICAgJ2ZlZV9hbW91bnQnIDogJy5wcm9jZXNzaW5nLWFtb3VudCcsXG4gICAgJ2xldmVsX2Ftb3VudF9zZWxlY3RvcicgOiAnI3BhbmVsLS1wYXkgLmFtb3VudCAubGV2ZWwtYW1vdW50JywgLy8gd2UgY2FuIG1heWJlIGdldCByaWQgb2YgdGhpc1xuICAgICdvcmlnaW5hbF9hbW91bnRfc2VsZWN0b3InIDogJ1tuYW1lPVwiYW1vdW50XCJdJyxcbiAgICAnZmFpcl9tYXJrZXRfdmFsdWVfc2VsZWN0b3InIDogJyNmYWlyX21hcmtldF92YWx1ZScsXG4gICAgJ2Z1bGxfYW1vdW50X3NlbGVjdG9yJyA6ICcuZnVsbC1hbW91bnQnLFxuICAgICdpbnN0YWxsbWVudF9wZXJpb2Rfc2VsZWN0b3InIDogJ1tuYW1lPVwiaW5zdGFsbG1lbnRfcGVyaW9kXCJdJyxcbiAgICAnbmFtZV9zZWxlY3RvcicgOiAnLm0tZm9ybS1pdGVtLWRpc3BsYXktbmFtZScsXG4gICAgJ2luX2hvbm9yX29yX21lbW9yeV9maWVsZF9zZWxlY3RvcicgOiAnLm0tZm9ybS1pdGVtLWhvbm9yLW1lbW9yeScsXG4gICAgJ2hvbm9yX29yX21lbW9yeV9jaG9vc2VyJyA6ICdpbnB1dFtuYW1lPVwiaW5faG9ub3Jfb3JfbWVtb3J5XCJdJywgLy8gcmFkaW8gZmllbGRzXG4gICAgJ2hvbm9yX3R5cGVfc2VsZWN0b3InIDogJy5hLWhvbm9yLXR5cGUnLCAvLyBzcGFuIGluc2lkZSBsYWJlbFxuICAgICdob25vcl9tZW1vcnlfaW5wdXRfZ3JvdXAnIDogJy5hLWhvbm9yLW9yLW1lbW9yeScsIC8vIGhvbGRzIHRoZSBmb3JtIGZpZWxkXG4gICAgJ2Fub255bW91c19zZWxlY3RvcicgOiAnI2Fub255bW91cycsXG4gICAgJ3Nob3dfYmlsbGluZ19jb3VudHJ5X3NlbGVjdG9yJyA6ICcjYmlsbGluZ19zaG93X2NvdW50cnknLFxuICAgICdiaWxsaW5nX2NvdW50cnlfc2VsZWN0b3InIDogJy5tLWZvcm0taXRlbS1jb3VudHJ5JyxcbiAgICAnc2hvd19zaGlwcGluZ19jb3VudHJ5X3NlbGVjdG9yJyA6ICcjc2hpcHBpbmdfc2hvd19jb3VudHJ5JyxcbiAgICAnc2hpcHBpbmdfY291bnRyeV9zZWxlY3RvcicgOiAnLm0tZm9ybS1pdGVtLXNoaXBwaW5nLWNvdW50cnknLFxuICAgICdzaGlwcGluZ19hZGRyZXNzX3NlbGVjdG9yJyA6ICcubS1mb3JtLWl0ZW0tc2hpcHBpbmctYWRkcmVzcycsXG4gICAgJ3VzZV9mb3Jfc2hpcHBpbmdfc2VsZWN0b3InIDogJyN1c2Vmb3JzaGlwcGluZycsXG4gICAgJ2VtYWlsX2ZpZWxkX3NlbGVjdG9yJyA6ICcjZW1haWwnLFxuICAgICdwYXNzd29yZF9maWVsZF9zZWxlY3RvcicgOiAnI3Bhc3N3b3JkJyxcbiAgICAnZmlyc3RfbmFtZV9maWVsZF9zZWxlY3RvcicgOiAnI2ZpcnN0X25hbWUnLFxuICAgICdsYXN0X25hbWVfZmllbGRfc2VsZWN0b3InIDogJyNsYXN0X25hbWUnLFxuICAgICdiaWxsaW5nX3N0cmVldF9maWVsZF9zZWxlY3RvcicgOiAnI2JpbGxpbmdfc3RyZWV0JyxcbiAgICAnYmlsbGluZ19jaXR5X2ZpZWxkX3NlbGVjdG9yJyA6ICcjYmlsbGluZ19jaXR5JyxcbiAgICAnYmlsbGluZ19zdGF0ZV9maWVsZF9zZWxlY3RvcicgOiAnI2JpbGxpbmdfc3RhdGUnLFxuICAgICdiaWxsaW5nX3ppcF9maWVsZF9zZWxlY3Rvcic6ICcjYmlsbGluZ196aXAnLFxuICAgICdiaWxsaW5nX2NvdW50cnlfZmllbGRfc2VsZWN0b3InIDogJyNiaWxsaW5nX2NvdW50cnknLFxuICAgICdjcmVhdGVfbXBfc2VsZWN0b3InIDogJyNjcmVhdGVtcGFjY291bnQnLFxuICAgICdwYXNzd29yZF9zZWxlY3RvcicgOiAnLm0tZm9ybS1pdGVtLXBhc3N3b3JkJyxcbiAgICAnYWRkaXRpb25hbF9hbW91bnRfZmllbGQnIDogJyNhZGRpdGlvbmFsX2RvbmF0aW9uJyxcbiAgICAnc2hpcHBpbmdfc2VsZWN0b3InIDogJ2ZpZWxkc2V0Lm0tc2hpcHBpbmctaW5mb3JtYXRpb24nLFxuICAgICdjaG9vc2VfcGF5bWVudCcgOiAnI2Nob29zZS1wYXltZW50LW1ldGhvZCcsXG4gICAgJ3BheW1lbnRfbWV0aG9kX3NlbGVjdG9yJyA6ICcucGF5bWVudC1tZXRob2QnLFxuICAgICdjY19udW1fc2VsZWN0b3InIDogJyNjYXJkLW51bWJlcicsXG4gICAgJ2NjX2V4cF9zZWxlY3RvcicgOiAnI2NhcmQtZXhwaXJ5JyxcbiAgICAnY2NfY3ZjX3NlbGVjdG9yJyA6ICcjY2FyZC1jdmMnLFxuICAgICdwYXlfYnV0dG9uX3NlbGVjdG9yJyA6ICcuYS1idXR0b24tcGF5JyxcbiAgICAnb3BwX2lkX3NlbGVjdG9yJyA6ICcjbG9ja19rZXknLCAvLyB3ZSB1c2UgdGhpcyB2YWx1ZSBhcyB0aGUgR29vZ2xlIEFuYWx5dGljcyB0cmFuc2FjdGlvbiBJRFxuICAgICduZXdzbGV0dGVyX2dyb3VwX3NlbGVjdG9yJyA6ICcuc3VwcG9ydC1uZXdzbGV0dGVycydcbiAgfTsgLy8gZW5kIGRlZmF1bHRzXG5cbiAgLy8gVGhlIGFjdHVhbCBwbHVnaW4gY29uc3RydWN0b3JcbiAgZnVuY3Rpb24gUGx1Z2luKCBlbGVtZW50LCBvcHRpb25zICkge1xuXG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcblxuICAgIC8vIGpRdWVyeSBoYXMgYW4gZXh0ZW5kIG1ldGhvZCB3aGljaCBtZXJnZXMgdGhlIGNvbnRlbnRzIG9mIHR3byBvclxuICAgIC8vIG1vcmUgb2JqZWN0cywgc3RvcmluZyB0aGUgcmVzdWx0IGluIHRoZSBmaXJzdCBvYmplY3QuIFRoZSBmaXJzdCBvYmplY3RcbiAgICAvLyBpcyBnZW5lcmFsbHkgZW1wdHkgYXMgd2UgZG9uJ3Qgd2FudCB0byBhbHRlciB0aGUgZGVmYXVsdCBvcHRpb25zIGZvclxuICAgIC8vIGZ1dHVyZSBpbnN0YW5jZXMgb2YgdGhlIHBsdWdpblxuICAgIHRoaXMub3B0aW9ucyA9ICQuZXh0ZW5kKCB7fSwgZGVmYXVsdHMsIG9wdGlvbnMgKTtcblxuICAgIHRoaXMuX2RlZmF1bHRzID0gZGVmYXVsdHM7XG4gICAgdGhpcy5fbmFtZSA9IHBsdWdpbk5hbWU7XG5cbiAgICB0aGlzLmluaXQoKTtcbiAgfSAvLyBlbmQgY29uc3RydWN0b3JcblxuICBQbHVnaW4ucHJvdG90eXBlID0ge1xuXG4gICAgaW5pdDogZnVuY3Rpb24ocmVzZXQsIGFtb3VudCkge1xuXG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoICduby1qcycgKTtcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCggJ2pzJyApO1xuXG4gICAgICAvLyBQbGFjZSBpbml0aWFsaXphdGlvbiBsb2dpYyBoZXJlXG4gICAgICAvLyBZb3UgYWxyZWFkeSBoYXZlIGFjY2VzcyB0byB0aGUgRE9NIGVsZW1lbnQgYW5kXG4gICAgICAvLyB0aGUgb3B0aW9ucyB2aWEgdGhlIGluc3RhbmNlLCBlLmcuIHRoaXMuZWxlbWVudFxuICAgICAgLy8gYW5kIHRoaXMub3B0aW9uc1xuICAgICAgLy8geW91IGNhbiBhZGQgbW9yZSBmdW5jdGlvbnMgbGlrZSB0aGUgb25lIGJlbG93IGFuZFxuICAgICAgLy8gY2FsbCB0aGVtIGxpa2Ugc286IHRoaXMueW91ck90aGVyRnVuY3Rpb24odGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpLlxuXG4gICAgICAvLyBtb2RpZnkgb3B0aW9ucyBhcyBuZWVkZWRcbiAgICAgIC8vdmFyIHRoaXMub3B0aW9ucy5hbW91bnQgPSAnJztcbiAgICAgIGlmIChyZXNldCAhPT0gdHJ1ZSkge1xuICAgICAgICB0aGlzLm9wdGlvbnMuYW1vdW50ID0gcGFyc2VGbG9hdCgkKHRoaXMub3B0aW9ucy5sZXZlbF9hbW91bnRfc2VsZWN0b3IsIHRoaXMuZWxlbWVudCkudGV4dCgpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5hbW91bnQgPSBhbW91bnQ7XG4gICAgICB9XG4gICAgICB0aGlzLm9wdGlvbnMub3JpZ2luYWxfYW1vdW50ICAgICA9IHBhcnNlSW50KCQodGhpcy5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudF9zZWxlY3RvciwgdGhpcy5lbGVtZW50KS52YWwoKSwgMTApO1xuICAgICAgdGhpcy5vcHRpb25zLnByb2Nlc3NpbmdfZmVlICAgICAgPSAoTWF0aC5yb3VuZChwYXJzZUZsb2F0KHRoaXMub3B0aW9ucy5mZWVfYW1vdW50KSpNYXRoLnBvdygxMCwyKSkvTWF0aC5wb3coMTAsMikpLnRvRml4ZWQoMik7XG4gICAgICB0aGlzLm9wdGlvbnMucHJvY2Vzc2luZ19mZWVfdGV4dCA9IHRoaXMub3B0aW9ucy5wcm9jZXNzaW5nX2ZlZTtcbiAgICAgIHRoaXMub3B0aW9ucy5jcmVhdGVfYWNjb3VudCAgICAgID0gZmFsc2U7XG5cbiAgICAgIHZhciBidXR0b25fdGV4dCA9ICQodGhpcy5vcHRpb25zLnBheV9idXR0b25fc2VsZWN0b3IpLnRleHQoKTtcbiAgICAgIHRoaXMub3B0aW9ucy5idXR0b25fdGV4dCA9IGJ1dHRvbl90ZXh0O1xuXG4gICAgICB0aGlzLnN0cmlwZSA9IFN0cmlwZSh0aGlzLm9wdGlvbnMuc3RyaXBlX3B1Ymxpc2hhYmxlX2tleSk7XG4gICAgICB0aGlzLmVsZW1lbnRzID0gdGhpcy5zdHJpcGUuZWxlbWVudHMoe1xuICAgICAgICBmb250czogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIC8vIGludGVncmF0ZSB5b3VyIGZvbnQgaW50byBzdHJpcGVcbiAgICAgICAgICAgIGNzc1NyYzogJ2h0dHBzOi8vdXNlLnR5cGVraXQubmV0L2N4ajdmemcuY3NzJyxcbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH0pO1xuXG4gICAgICAvLyB1c2UgYSByZWZlcnJlciBmb3IgZWRpdCBsaW5rIGlmIHdlIGhhdmUgb25lXG4gICAgICBpZiAoZG9jdW1lbnQucmVmZXJyZXIgIT09ICcnKSB7XG4gICAgICAgICQoJyNlZGl0X3VybCcpLnByb3AoJ2hyZWYnLCBkb2N1bWVudC5yZWZlcnJlcik7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuZGVidWcgPT09IHRydWUpIHtcbiAgICAgICAgdGhpcy5kZWJ1Zyh0aGlzLm9wdGlvbnMpO1xuICAgICAgICAvLyByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIGNhbGwgZnVuY3Rpb25zXG4gICAgICB0aGlzLmFuYWx5dGljc1RyYWNraW5nKHRoaXMub3B0aW9ucyk7IC8vIHRyYWNrIGFuYWx5dGljcyBldmVudHNcbiAgICAgIHRoaXMuYW1vdW50QXNSYWRpbyh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIGlmIHRoZSBhbW91bnQgZmllbGQgaXMgYSByYWRpbyBidXR0b25cbiAgICAgIHRoaXMuYW1vdW50VXBkYXRlZCh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIGlmIHRoZSBhbW91bnQgdGV4dCBmaWVsZCBjYW4gY2hhbmdlXG5cbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5wYXlfY2NfcHJvY2Vzc2luZ19zZWxlY3RvcikubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLmNyZWRpdENhcmRQcm9jZXNzaW5nRmVlcyh0aGlzLm9wdGlvbnMpOyAvLyBwcm9jZXNzaW5nIGZlZXNcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLy8gdGhlIG1haW4gZm9ybSBJRC4gdGhpcyBpcyBub3QgdXNlZCBmb3IgY2FuY2VsbGluZ1xuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuZG9uYXRlQW5vbnltb3VzbHkodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBhbm9ueW1vdXNcbiAgICAgICAgdGhpcy5ob25vck9yTWVtb3J5VG9nZ2xlKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gaW4gaG9ub3Igb3IgaW4gbWVtb3J5IG9mIHNvbWVvbmVcbiAgICAgICAgdGhpcy5vdXRzaWRlVW5pdGVkU3RhdGVzKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gb3V0c2lkZSBVU1xuICAgICAgICB0aGlzLnNoaXBwaW5nQWRkcmVzcyh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIHNoaXBwaW5nIGFkZHJlc3NcbiAgICAgICAgdGhpcy5hbGxvd01pbm5wb3N0QWNjb3VudCh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIG9wdGlvbiBmb3IgY3JlYXRpbmcgbWlubnBvc3QgYWNjb3VudFxuICAgICAgICB0aGlzLnBheW1lbnRSZXF1ZXN0QnV0dG9uKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gY3JlYXRlIHBheW1lbnRyZXF1ZXN0IGJ1dHRvblxuICAgICAgICB0aGlzLmNob29zZVBheW1lbnRNZXRob2QodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBzd2l0Y2ggYmV0d2VlbiBjYXJkIGFuZCBhY2hcbiAgICAgICAgdGhpcy5jcmVkaXRDYXJkRmllbGRzKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gZG8gc3R1ZmYgd2l0aCB0aGUgY3JlZGl0IGNhcmQgZmllbGRzXG4gICAgICAgIHRoaXMudmFsaWRhdGVTZXR1cCh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIHNldHVwIGhvdyB2YWxpZGF0aW9uIGVycm9ycyB3b3JrXG4gICAgICAgIHRoaXMuZm9ybVNldHVwKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gdmFsaWRhdGUgYW5kIHN1Ym1pdCB0aGUgZm9ybVxuICAgICAgfVxuXG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuY29uZmlybV9mb3JtX3NlbGVjdG9yKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuc2hvd05ld3NsZXR0ZXJTZXR0aW5ncyh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7XG4gICAgICAgIHRoaXMuY29uZmlybU1lc3NhZ2VTdWJtaXQodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBzdWJtaXQgdGhlIHN0dWZmIG9uIHRoZSBjb25maXJtYXRpb24gcGFnZVxuICAgICAgfVxuXG4gICAgfSwgLy8gaW5pdFxuXG4gICAgZGVidWc6IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuZGVidWcgPT09IHRydWUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZGlyKG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUuZGlyKHRoaXMpO1xuICAgICAgfVxuICAgIH0sIC8vIGRlYnVnXG5cbiAgICBhbmFseXRpY3NUcmFja2luZzogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgdmFyIHByb2dyZXNzID0gJChvcHRpb25zLnByb2dyZXNzX3NlbGVjdG9yKTtcbiAgICAgIHZhciBzdGVwO1xuICAgICAgdmFyIG5hdl9pdGVtX2NvdW50ID0gMDtcbiAgICAgIHZhciBvcHBfaWQgPSAkKG9wdGlvbnMub3BwX2lkX3NlbGVjdG9yKS52YWwoKTtcbiAgICAgIHZhciBwb3N0X3B1cmNoYXNlID0gZmFsc2U7XG4gICAgICBpZiAocHJvZ3Jlc3MubGVuZ3RoID4gMCkge1xuICAgICAgICBuYXZfaXRlbV9jb3VudCA9ICQoJ2xpJywgcHJvZ3Jlc3MpLmxlbmd0aDsgLy8gbGVuZ3RoIGlzIG5vdCB6ZXJvIGJhc2VkXG4gICAgICAgIHN0ZXAgPSAkKCdsaSAuYWN0aXZlJywgcHJvZ3Jlc3MpLnBhcmVudCgpLmluZGV4KCkgKyAxOyAvLyBpbmRleCBpcyB6ZXJvIGJhc2VkXG4gICAgICB9XG4gICAgICAvLyB0aGVyZSBpcyBhIHByb2dyZXNzIG1lbnUsIEFORCB0aGVyZSBJUyBOT1QgYSBjb25maXJtIGZvcm0gc2VsZWN0b3JcbiAgICAgIC8vIGlmIHRoYXQgaXMgdGhlIGNhc2UsIHdlJ3JlIG5vdCBvbiB0aGUgcHVyY2hhc2Ugc3RlcFxuICAgICAgaWYgKHByb2dyZXNzLmxlbmd0aCA+IDAgJiYgJChvcHRpb25zLmNvbmZpcm1fZm9ybV9zZWxlY3RvcikubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIC8vIHRoZSBhY3RpdmUgdGFiIG1hdGNoZXMgdGhlIGNvdW50IG9mIGl0ZW1zIEFORCB0aGVyZSBpcyBOT1QgYSBjb25maXJtIGZvcm0gdG8gYmUgc3VibWl0dGVkXG4gICAgICAgIC8vIHRoYXQgbWVhbnMgd2UncmUgb24gYSBwb3N0IHB1cmNoYXNlIHN0ZXAuXG4gICAgICAgIGlmIChzdGVwID09PSBuYXZfaXRlbV9jb3VudCAmJiAkKG9wdGlvbnMuY29uZmlybV9mb3JtX3NlbGVjdG9yKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBzdGVwID0gc3RlcCArIDE7XG4gICAgICAgICAgcG9zdF9wdXJjaGFzZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAocHJvZ3Jlc3MubGVuZ3RoID4gMCAmJiAkKG9wdGlvbnMuY29uZmlybV9mb3JtX3NlbGVjdG9yKS5sZW5ndGggPiAwIHx8ICQob3B0aW9ucy5maW5pc2hfc2VjdGlvbl9zZWxlY3RvcikubGVuZ3RoID4gMCkge1xuICAgICAgICAvLyB3ZSBhcmUgb24gdGhlIGNvbmZpcm0gZm9ybSBzZWxlY3RvciBhbmQgdGhlcmUgaXMgYSBwcm9ncmVzcyBtZWFzdXJlXG4gICAgICAgIC8vIE9SLCB3ZSBhcmUgb24gdGhlIGZpbmlzaCBzZWxlY3RvciBhbmQgdGhlcmUgaXMgTk9UIGEgcHJvZ3Jlc3MgbWVhc3VyZVxuICAgICAgICAvLyB0aGVzZSBtZWFuIHRoZSB1c2VyIGp1c3QgcHVyY2hhc2VkLlxuICAgICAgICBzdGVwID0gJ3B1cmNoYXNlJztcbiAgICAgIH0gZWxzZSBpZiAocHJvZ3Jlc3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMuZGVidWcoICdzdGVwIGlzICcgKyBzdGVwICsgJyBhbmQgbmF2IGl0ZW0gY291bnQgaXMgJyArIG5hdl9pdGVtX2NvdW50ICsgJyBhbmQgb3BwIGlkIGlzICcgKyBvcHBfaWQgKyAnIGFuZCBwb3N0IHB1cmNoYXNlIGlzICcgKyBwb3N0X3B1cmNoYXNlICk7XG4gICAgICB0aGlzLmFuYWx5dGljc1RyYWNraW5nU3RlcChzdGVwLCBwb3N0X3B1cmNoYXNlKTtcbiAgICB9LCAvLyBhbmFseXRpY3NUcmFja2luZ1xuXG4gICAgYW5hbHl0aWNzVHJhY2tpbmdTdGVwOiBmdW5jdGlvbihzdGVwLCBwb3N0X3B1cmNoYXNlKSB7XG4gICAgICB2YXIgcHJvZ3Jlc3MgPSAkKHRoaXMub3B0aW9ucy5wcm9ncmVzc19zZWxlY3Rvcik7XG4gICAgICB2YXIgYW1vdW50ID0gJCh0aGlzLm9wdGlvbnMub3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yKS52YWwoKTtcbiAgICAgIHZhciBvcHBfaWQgPSAkKHRoaXMub3B0aW9ucy5vcHBfaWRfc2VsZWN0b3IpLnZhbCgpO1xuICAgICAgdmFyIGluc3RhbGxtZW50X3BlcmlvZCA9ICdvbmUtdGltZSc7XG4gICAgICB2YXIgbGV2ZWw7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuaW5zdGFsbG1lbnRfcGVyaW9kX3NlbGVjdG9yKS5sZW5ndGggPiAwICkge1xuICAgICAgICBpbnN0YWxsbWVudF9wZXJpb2QgPSAkKHRoaXMub3B0aW9ucy5pbnN0YWxsbWVudF9wZXJpb2Rfc2VsZWN0b3IpLnZhbCgpO1xuICAgICAgfVxuICAgICAgLy8gaWYgd2UncmUgbm90IGFmdGVyIHRoZSBwdXJjaGFzZSwgdXNlIGFkZFByb2R1Y3RcbiAgICAgIGlmIChwcm9ncmVzcy5sZW5ndGggPiAwICYmIHBvc3RfcHVyY2hhc2UgIT09IHRydWUpIHtcbiAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgYW1vdW50OiBhbW91bnQsXG4gICAgICAgICAgaW5zdGFsbG1lbnRfcGVyaW9kOiBpbnN0YWxsbWVudF9wZXJpb2RcbiAgICAgICAgfTtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICB1cmw6ICcvY2FsY3VsYXRlLW1lbWJlci1sZXZlbC8nLFxuICAgICAgICAgIGRhdGE6IGRhdGFcbiAgICAgICAgfSkuZG9uZShmdW5jdGlvbiggZGF0YSApIHtcbiAgICAgICAgICBpZiAoJChkYXRhLmxldmVsKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsZXZlbCA9IGRhdGEubGV2ZWwubGV2ZWw7XG4gICAgICAgICAgICB0aGF0LmRlYnVnKCdhZGQgcHJvZHVjdDogaWQgaXMgJyArICdtaW5ucG9zdF8nICsgbGV2ZWwudG9Mb3dlckNhc2UoKSArICdfbWVtYmVyc2hpcCcgKyAnIGFuZCBuYW1lIGlzICcgKyAnTWlublBvc3QgJyArIGxldmVsLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgbGV2ZWwuc2xpY2UoMSkgKyAnIE1lbWJlcnNoaXAnICsgJyBhbmQgdmFyaWFudCBpcyAnICsgaW5zdGFsbG1lbnRfcGVyaW9kLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgaW5zdGFsbG1lbnRfcGVyaW9kLnNsaWNlKDEpKTtcbiAgICAgICAgICAgIGdhKCdlYzphZGRQcm9kdWN0Jywge1xuICAgICAgICAgICAgICAnaWQnOiAnbWlubnBvc3RfJyArIGxldmVsLnRvTG93ZXJDYXNlKCkgKyAnX21lbWJlcnNoaXAnLFxuICAgICAgICAgICAgICAnbmFtZSc6ICdNaW5uUG9zdCAnICsgbGV2ZWwuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBsZXZlbC5zbGljZSgxKSArICcgTWVtYmVyc2hpcCcsXG4gICAgICAgICAgICAgICdjYXRlZ29yeSc6ICdEb25hdGlvbicsXG4gICAgICAgICAgICAgICdicmFuZCc6ICdNaW5uUG9zdCcsXG4gICAgICAgICAgICAgICd2YXJpYW50JzogaW5zdGFsbG1lbnRfcGVyaW9kLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgaW5zdGFsbG1lbnRfcGVyaW9kLnNsaWNlKDEpLFxuICAgICAgICAgICAgICAncHJpY2UnOiBhbW91bnQsXG4gICAgICAgICAgICAgICdxdWFudGl0eSc6IDFcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGVwID09PSAncHVyY2hhc2UnKSB7XG4gICAgICAgIHRoaXMuZGVidWcoJ2FkZCBhIHB1cmNoYXNlIGFjdGlvbi4gc3RlcCBpcyAnICsgc3RlcCk7XG4gICAgICAgIGdhKCdlYzpzZXRBY3Rpb24nLCBzdGVwLHtcbiAgICAgICAgICAnaWQnOiBvcHBfaWQsIC8vIFRyYW5zYWN0aW9uIGlkIC0gVHlwZTogc3RyaW5nXG4gICAgICAgICAgJ2FmZmlsaWF0aW9uJzogJ01pbm5Qb3N0JywgLy8gU3RvcmUgbmFtZSAtIFR5cGU6IHN0cmluZ1xuICAgICAgICAgICdyZXZlbnVlJzogYW1vdW50LCAvLyBUb3RhbCBSZXZlbnVlIC0gVHlwZTogbnVtZXJpY1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZGVidWcoJ2FkZCBhIGNoZWNrb3V0IGFjdGlvbi4gc3RlcCBpcyAnICsgc3RlcCk7XG4gICAgICAgIGdhKCdlYzpzZXRBY3Rpb24nLCdjaGVja291dCcsIHtcbiAgICAgICAgICAnc3RlcCc6IHN0ZXAsIC8vIEEgdmFsdWUgb2YgMSBpbmRpY2F0ZXMgZmlyc3QgY2hlY2tvdXQgc3RlcC4gVmFsdWUgb2YgMiBpbmRpY2F0ZXMgc2Vjb25kIGNoZWNrb3V0IHN0ZXBcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGdhKCdzZXQnLCB7XG4gICAgICAgIHBhZ2U6IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSxcbiAgICAgICAgdGl0bGU6IGRvY3VtZW50LnRpdGxlXG4gICAgICB9KTtcbiAgICAgIGdhKCdzZW5kJywgJ3BhZ2V2aWV3Jywgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lKTtcblxuICAgIH0sIC8vIGFuYWx5dGljc1RyYWNraW5nU3RlcFxuXG4gICAgYW1vdW50QXNSYWRpbzogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgLy8gd2hlbiBhbW91bnQgZmllbGQgaXMgYSByYWRpbyBidXR0b24sIHdlIG5lZWQgdG8gY2hlY2sgaXQgd2hlbmV2ZXIgaXQgY2hhbmdlc1xuICAgICAgJChvcHRpb25zLm9yaWdpbmFsX2Ftb3VudF9zZWxlY3RvciwgZWxlbWVudCkuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoJCh0aGlzKS5pcygnOnJhZGlvJykpIHtcbiAgICAgICAgICAgIG9wdGlvbnMub3JpZ2luYWxfYW1vdW50ID0gcGFyc2VJbnQoJChvcHRpb25zLm9yaWdpbmFsX2Ftb3VudF9zZWxlY3RvciArICc6Y2hlY2tlZCcsIGVsZW1lbnQpLnZhbCgpLCAxMCk7XG4gICAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSwgLy8gYW1vdW50QXNSYWRpb1xuXG4gICAgYW1vdW50VXBkYXRlZDogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgLy8gd2hlbiBuZXcgYW1vdW50IHRleHQgZmllbGQgY2FuIGNoYW5nZSwgd2UgbmVlZCB0byBjaGFuZ2UgdGhlIGhpZGRlbiBmaWVsZFxuICAgICAgLy8gdGhlcmUgaXMgYWxzbyBwb3RlbnRpYWxseSBhbiBhZGRpdGlvbmFsIGFtb3VudCBmaWVsZCB2YWx1ZSB0byBhZGRcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHZhciBzdHJpcGVfcGF5bWVudF90eXBlID0gdGhhdC5nZXRTdHJpcGVQYXltZW50VHlwZSgpO1xuXG4gICAgICAvLyBzZXQgdGhlIGZhaXIgbWFya2V0IHZhbHVlIGlmIGFwcGxpY2FibGVcbiAgICAgIHZhciBhbW91bnRfc2VsZWN0b3JfZmFpcl9tYXJrZXQgPSAkKG9wdGlvbnMub3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yLCBlbGVtZW50KTtcbiAgICAgIGlmIChhbW91bnRfc2VsZWN0b3JfZmFpcl9tYXJrZXQuaXMoJzpyYWRpbycpKSB7XG4gICAgICAgIGFtb3VudF9zZWxlY3Rvcl9mYWlyX21hcmtldCA9ICQob3B0aW9ucy5vcmlnaW5hbF9hbW91bnRfc2VsZWN0b3IgKyAnOmNoZWNrZWQnLCBlbGVtZW50KTtcbiAgICAgIH1cbiAgICAgIHRoYXQuc2V0RmFpck1hcmtldFZhbHVlKGFtb3VudF9zZWxlY3Rvcl9mYWlyX21hcmtldCk7XG5cbiAgICAgICQob3B0aW9ucy5vcmlnaW5hbF9hbW91bnRfc2VsZWN0b3IsIGVsZW1lbnQpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgdGhhdC5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCA9IHBhcnNlSW50KCQodGhpcywgZWxlbWVudCkudmFsKCksIDEwKTtcbiAgICAgICAgdGhhdC5jYWxjdWxhdGVGZWVzKHRoYXQub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQsIHN0cmlwZV9wYXltZW50X3R5cGUpO1xuICAgICAgICB0aGF0LnNldEZhaXJNYXJrZXRWYWx1ZSgkKHRoaXMsIGVsZW1lbnQpKTtcbiAgICAgIH0pO1xuICAgICAgJChvcHRpb25zLmFkZGl0aW9uYWxfYW1vdW50X2ZpZWxkLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoYXQub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQgPSBwYXJzZUludCgkKG9wdGlvbnMub3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSwgMTApO1xuICAgICAgICB0aGF0LmNhbGN1bGF0ZUZlZXModGhhdC5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCwgc3RyaXBlX3BheW1lbnRfdHlwZSk7XG4gICAgICB9KTtcblxuICAgIH0sIC8vIGFtb3VudFVwZGF0ZWRcblxuICAgIGdldFRvdGFsQW1vdW50OiBmdW5jdGlvbihhbW91bnQpIHtcbiAgICAgIGFtb3VudCA9ICh0eXBlb2YgYW1vdW50ICE9PSAndW5kZWZpbmVkJykgPyAgYW1vdW50IDogdGhpcy5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudDtcbiAgICAgIHZhciB0b3RhbF9hbW91bnQgPSBhbW91bnQ7XG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuYWRkaXRpb25hbF9hbW91bnRfZmllbGQpLmxlbmd0aCA+IDAgJiYgJCh0aGlzLm9wdGlvbnMuYWRkaXRpb25hbF9hbW91bnRfZmllbGQpLnZhbCgpID4gMCkge1xuICAgICAgICB2YXIgYWRkaXRpb25hbF9hbW91bnQgPSAkKHRoaXMub3B0aW9ucy5hZGRpdGlvbmFsX2Ftb3VudF9maWVsZCkudmFsKCk7XG4gICAgICAgIHRvdGFsX2Ftb3VudCA9IHBhcnNlSW50KGFkZGl0aW9uYWxfYW1vdW50LCAxMCkgKyBwYXJzZUludChhbW91bnQsIDEwKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0b3RhbF9hbW91bnQ7XG4gICAgfSwgLy8gZ2V0VG90YWxBbW91bnRcblxuICAgIHNldEZhaXJNYXJrZXRWYWx1ZTogZnVuY3Rpb24oYW1vdW50X3NlbGVjdG9yKSB7XG4gICAgICAvLyBpZiB0aGVyZSBpcyBhIGZhaXIgbWFya2V0IHZhbHVlIGZpZWxkLCBjaGVjayBhbmQgc2VlIGlmIHdlIGNhbiBwb3B1bGF0ZSBpdFxuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmZhaXJfbWFya2V0X3ZhbHVlX3NlbGVjdG9yKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHZhciBmYWlyTWFya2V0VmFsdWUgPSBhbW91bnRfc2VsZWN0b3IuZGF0YSgnZmFpci1tYXJrZXQtdmFsdWUnKTtcbiAgICAgICAgJCh0aGlzLm9wdGlvbnMuZmFpcl9tYXJrZXRfdmFsdWVfc2VsZWN0b3IpLnZhbChmYWlyTWFya2V0VmFsdWUpO1xuICAgICAgfVxuICAgIH0sIC8vIHNldEZhaXJNYXJrZXRWYWx1ZVxuXG4gICAgY2FsY3VsYXRlRmVlczogZnVuY3Rpb24oYW1vdW50LCBzdHJpcGVfcGF5bWVudF90eXBlKSB7XG4gICAgICAvLyB0aGlzIHNlbmRzIHRoZSBhbW91bnQgYW5kIHN0cmlwZSBwYXltZW50IHR5cGUgdG8gcHl0aG9uOyBnZXQgdGhlIGZlZSBhbmQgZGlzcGxheSBpdCB0byB0aGUgdXNlciBvbiB0aGUgY2hlY2tib3ggbGFiZWxcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHZhciB0b3RhbF9hbW91bnQgPSB0aGF0LmdldFRvdGFsQW1vdW50KGFtb3VudCk7XG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgYW1vdW50OiB0b3RhbF9hbW91bnQsXG4gICAgICAgIHN0cmlwZV9wYXltZW50X3R5cGU6IHN0cmlwZV9wYXltZW50X3R5cGVcbiAgICAgIH07XG4gICAgICB0aGF0LnNldFN0cmlwZVBheW1lbnRUeXBlKHN0cmlwZV9wYXltZW50X3R5cGUpO1xuICAgICAgJC5hamF4KHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIHVybDogJy9jYWxjdWxhdGUtZmVlcy8nLFxuICAgICAgICBkYXRhOiBkYXRhXG4gICAgICB9KS5kb25lKGZ1bmN0aW9uKCBkYXRhICkge1xuICAgICAgICBpZiAoJChkYXRhLmZlZXMpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAkKHRoYXQub3B0aW9ucy5mZWVfYW1vdW50KS50ZXh0KHBhcnNlRmxvYXQoZGF0YS5mZWVzKS50b0ZpeGVkKDIpKTtcbiAgICAgICAgICB0aGF0LmNyZWRpdENhcmRGZWVDaGVja2JveCgkKHRoYXQub3B0aW9ucy5wYXlfY2NfcHJvY2Vzc2luZ19zZWxlY3RvcikpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LCAvLyBjYWxjdWxhdGVGZWVzXG5cbiAgICBjcmVkaXRDYXJkUHJvY2Vzc2luZ0ZlZXM6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgIC8vIHRoaXMgYWRkcyBvciBzdWJ0cmFjdHMgdGhlIGZlZSB0byB0aGUgb3JpZ2luYWwgYW1vdW50IHdoZW4gdGhlIHVzZXIgaW5kaWNhdGVzIHRoZXkgZG8gb3IgZG8gbm90IHdhbnQgdG8gcGF5IHRoZSBmZWVzXG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB0aGF0LmNyZWRpdENhcmRGZWVDaGVja2JveCgkKG9wdGlvbnMucGF5X2NjX3Byb2Nlc3Npbmdfc2VsZWN0b3IpKTtcbiAgICAgICQob3B0aW9ucy5wYXlfY2NfcHJvY2Vzc2luZ19zZWxlY3Rvcikub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB0aGF0LmNyZWRpdENhcmRGZWVDaGVja2JveCh0aGlzKTtcbiAgICAgIH0pO1xuICAgIH0sIC8vIGNyZWRpdENhcmRQcm9jZXNzaW5nRmVlc1xuXG4gICAgZ2V0U3RyaXBlUGF5bWVudFR5cGU6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHN0cmlwZV9wYXltZW50X3R5cGUgPSAnY2FyZCc7XG4gICAgICBpZiAoJCgnaW5wdXRbbmFtZT1cInN0cmlwZV9wYXltZW50X3R5cGVcIl0nKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHN0cmlwZV9wYXltZW50X3R5cGUgPSAkKCdpbnB1dFtuYW1lPVwic3RyaXBlX3BheW1lbnRfdHlwZVwiXScpLnZhbCgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN0cmlwZV9wYXltZW50X3R5cGU7XG4gICAgfSwgLy8gZ2V0U3RyaXBlUGF5bWVudFR5cGVcblxuICAgIHNldFN0cmlwZVBheW1lbnRUeXBlOiBmdW5jdGlvbihzdHJpcGVfcGF5bWVudF90eXBlKSB7XG4gICAgICBpZiAoJCgnaW5wdXRbbmFtZT1cInN0cmlwZV9wYXltZW50X3R5cGVcIl0nKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgJCh0aGlzLm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLmFwcGVuZCgnPGlucHV0IHR5cGU9XFxcImhpZGRlblxcXCIgbmFtZT1cXFwic3RyaXBlX3BheW1lbnRfdHlwZVxcXCI+Jyk7XG4gICAgICB9XG4gICAgICAkKCdpbnB1dFtuYW1lPVwic3RyaXBlX3BheW1lbnRfdHlwZVwiXScpLnZhbChzdHJpcGVfcGF5bWVudF90eXBlKTtcbiAgICAgIHJldHVybiBzdHJpcGVfcGF5bWVudF90eXBlO1xuICAgIH0sIC8vIHNldFN0cmlwZVBheW1lbnRUeXBlXG5cbiAgICBjcmVkaXRDYXJkRmVlQ2hlY2tib3g6IGZ1bmN0aW9uKGZpZWxkKSB7XG4gICAgICB2YXIgZnVsbF9hbW91bnQ7XG4gICAgICB2YXIgdG90YWxfYW1vdW50ID0gdGhpcy5nZXRUb3RhbEFtb3VudCgpO1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgaWYgKCQoZmllbGQpLmlzKCc6Y2hlY2tlZCcpIHx8ICQoZmllbGQpLnByb3AoJ2NoZWNrZWQnKSkge1xuICAgICAgICAkKCcuYW1vdW50IC5sZXZlbC1hbW91bnQnKS5hZGRDbGFzcygnZnVsbC1hbW91bnQnKTtcbiAgICAgICAgZnVsbF9hbW91bnQgPSAodG90YWxfYW1vdW50ICsgcGFyc2VGbG9hdCgkKHRoYXQub3B0aW9ucy5mZWVfYW1vdW50KS50ZXh0KCkpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZ1bGxfYW1vdW50ID0gdG90YWxfYW1vdW50O1xuICAgICAgfVxuICAgICAgJCh0aGF0Lm9wdGlvbnMuZnVsbF9hbW91bnRfc2VsZWN0b3IpLnRleHQocGFyc2VGbG9hdChmdWxsX2Ftb3VudCkudG9GaXhlZCgyKSk7XG5cbiAgICAgIC8vIHVwZGF0ZSB0aGUgcGF5bWVudCByZXF1ZXN0XG4gICAgICBpZiAodGhpcy5wYXltZW50UmVxdWVzdCAmJiBmdWxsX2Ftb3VudCkge1xuICAgICAgICB0aGlzLnBheW1lbnRSZXF1ZXN0LnVwZGF0ZSh7XG4gICAgICAgICAgdG90YWw6IHtcbiAgICAgICAgICAgIGxhYmVsOiBcIk1pbm5Qb3N0XCIsXG4gICAgICAgICAgICBhbW91bnQ6IGZ1bGxfYW1vdW50ICogMTAwXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgIH0sIC8vIGNyZWRpdENhcmRGZWVDaGVja2JveFxuXG4gICAgZG9uYXRlQW5vbnltb3VzbHk6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHRoYXQudG9nZ2xlQW5vbnltb3VzKCQob3B0aW9ucy5hbm9ueW1vdXNfc2VsZWN0b3IsIGVsZW1lbnQpKTtcbiAgICAgICQob3B0aW9ucy5hbm9ueW1vdXNfc2VsZWN0b3IsIGVsZW1lbnQpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgdGhhdC50b2dnbGVBbm9ueW1vdXMoJCh0aGlzKSk7XG4gICAgICB9KTtcbiAgICB9LCAvLyBkb25hdGVBbm9ueW1vdXNseVxuXG4gICAgdG9nZ2xlQW5vbnltb3VzOiBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICBpZiAoZWxlbWVudC5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICAkKHRoaXMub3B0aW9ucy5uYW1lX3NlbGVjdG9yICsgJyBkaXY6Zmlyc3QnLCB0aGlzLmVsZW1lbnQpLmhpZGUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQodGhpcy5vcHRpb25zLm5hbWVfc2VsZWN0b3IgKyAnIGRpdjpmaXJzdCcsIHRoaXMuZWxlbWVudCkuc2hvdygpO1xuICAgICAgfVxuICAgIH0sIC8vIHRvZ2dsZUFub255bW91c1xuXG4gICAgaG9ub3JPck1lbW9yeTogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgaWYgKCQob3B0aW9ucy5ob25vcl9vcl9tZW1vcnlfY2hvb3NlciArICc6Y2hlY2tlZCcpLnZhbCgpKSB7XG4gICAgICAgICQob3B0aW9ucy5ob25vcl9tZW1vcnlfaW5wdXRfZ3JvdXAsIGVsZW1lbnQpLnNob3coKTtcbiAgICAgICAgJChvcHRpb25zLmhvbm9yX3R5cGVfc2VsZWN0b3IpLnRleHQoJChvcHRpb25zLmhvbm9yX29yX21lbW9yeV9jaG9vc2VyICsgJzpjaGVja2VkJykudmFsKCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJChvcHRpb25zLmhvbm9yX21lbW9yeV9pbnB1dF9ncm91cCwgZWxlbWVudCkuaGlkZSgpO1xuICAgICAgICAkKG9wdGlvbnMuaG9ub3JfbmFtZV9zZWxlY3RvciArICcgaW5wdXQnLCBlbGVtZW50KS52YWwoJycpO1xuICAgICAgfVxuICAgIH0sIC8vIGhvbm9yT3JNZW1vcnlcblxuICAgIGhvbm9yT3JNZW1vcnlUb2dnbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHRoYXQuaG9ub3JPck1lbW9yeSh0aGF0LmVsZW1lbnQsIHRoYXQub3B0aW9ucyk7XG4gICAgICAkKG9wdGlvbnMuaG9ub3Jfb3JfbWVtb3J5X2Nob29zZXIsIGVsZW1lbnQpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgdGhhdC5ob25vck9yTWVtb3J5KHRoYXQuZWxlbWVudCwgdGhhdC5vcHRpb25zKTtcbiAgICAgIH0pO1xuICAgIH0sIC8vIGhvbm9yT3JNZW1vcnlUb2dnbGVcblxuICAgIG91dHNpZGVVbml0ZWRTdGF0ZXM6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgICQob3B0aW9ucy5zaG93X2JpbGxpbmdfY291bnRyeV9zZWxlY3RvcikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICQob3B0aW9ucy5iaWxsaW5nX2NvdW50cnlfc2VsZWN0b3IpLnNob3coKTtcbiAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5oaWRlKCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuICAgICAgJChvcHRpb25zLnNob3dfc2hpcHBpbmdfY291bnRyeV9zZWxlY3RvcikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICQob3B0aW9ucy5zaGlwcGluZ19jb3VudHJ5X3NlbGVjdG9yKS5zaG93KCk7XG4gICAgICAgICQodGhpcykucGFyZW50KCkuaGlkZSgpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9LCAvLyBvdXRzaWRlVW5pdGVkU3RhdGVzXG5cbiAgICBzaGlwcGluZ0FkZHJlc3M6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHZhciBzaG93X3NoaXBwaW5nID0gZmFsc2U7XG4gICAgICBpZiAoJChvcHRpb25zLnVzZV9mb3Jfc2hpcHBpbmdfc2VsZWN0b3IpLmxlbmd0aCA+IDApIHsgLy8gd2UgaGF2ZSBhIHNoaXBwaW5nIGNoZWNrYm94XG4gICAgICAgIHNob3dfc2hpcHBpbmcgPSB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKHNob3dfc2hpcHBpbmcgPT09IHRydWUgKSB7XG4gICAgICAgICQob3B0aW9ucy51c2VfZm9yX3NoaXBwaW5nX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKS5zaG93KCk7XG4gICAgICAgIGlmICgkKG9wdGlvbnMudXNlX2Zvcl9zaGlwcGluZ19zZWxlY3RvciwgZWxlbWVudCkuaXMoJzpjaGVja2VkJykpIHsgLy8gdXNlIHNhbWUgYXMgYmlsbGluZ1xuICAgICAgICAgICQob3B0aW9ucy5zaGlwcGluZ19zZWxlY3RvcikuaGlkZSgpO1xuICAgICAgICB9IGVsc2UgeyAvLyBzZXBhcmF0ZSBzaGlwcGluZyBhbmQgYmlsbGluZ1xuICAgICAgICAgICQob3B0aW9ucy5zaGlwcGluZ19zZWxlY3Rvcikuc2hvdygpO1xuICAgICAgICB9XG4gICAgICAgICQob3B0aW9ucy51c2VfZm9yX3NoaXBwaW5nX3NlbGVjdG9yLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdGhhdC5zaGlwcGluZ0FkZHJlc3MoZWxlbWVudCwgb3B0aW9ucyk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgXG4gICAgfSwgLy8gc2hpcHBpbmdBZGRyZXNzXG5cbiAgICBhbGxvd01pbm5wb3N0QWNjb3VudDogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdmFyIGFjY291bnRfZXhpc3RzID0gZmFsc2U7XG5cbiAgICAgIC8vIHNob3cgcGFzc3dvcmQgYXMgdGV4dFxuICAgICAgdGhhdC5zaG93UGFzc3dvcmQoKTtcblxuICAgICAgLy8gY2FsY3VsYXRlIHBhc3N3b3JkIHN0cmVuZ3RoXG4gICAgICB0aGF0LnNob3dQYXNzd29yZFN0cmVuZ3RoKCk7XG4gICAgICBcbiAgICAgIHRoYXQuc3BhbUVtYWlsKCQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkpO1xuICAgICAgJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoYXQuc3BhbUVtYWlsKCQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoYXQudG9nZ2xlQWNjb3VudEZpZWxkcygkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KSk7XG4gICAgICAkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoYXQudG9nZ2xlQWNjb3VudEZpZWxkcygkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KSk7XG4gICAgICB9KTtcblxuICAgICAgZnVuY3Rpb24gZG9uZVR5cGluZyAoKSB7XG4gICAgICAgIHZhciBlbWFpbCA9ICQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCk7XG4gICAgICAgIGFjY291bnRfZXhpc3RzID0gdGhhdC5jaGVja01pbm5wb3N0QWNjb3VudChlbGVtZW50LCBvcHRpb25zLCBlbWFpbCk7XG4gICAgICB9XG5cbiAgICAgIC8vc2V0dXAgYmVmb3JlIGZ1bmN0aW9uc1xuICAgICAgdmFyIHR5cGluZ1RpbWVyOyAgICAgICAgICAgICAgICAvL3RpbWVyIGlkZW50aWZpZXJcbiAgICAgIHZhciBkb25lVHlwaW5nSW50ZXJ2YWwgPSA1MDAwOyAgLy90aW1lIGluIG1zLCA1IHNlY29uZCBmb3IgZXhhbXBsZVxuXG4gICAgICAvL29uIGtleXVwLCBzdGFydCB0aGUgY291bnRkb3duXG4gICAgICAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLmtleXVwKGZ1bmN0aW9uKCl7XG4gICAgICAgIGNsZWFyVGltZW91dCh0eXBpbmdUaW1lcik7XG4gICAgICAgIGlmICgkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCkge1xuICAgICAgICAgIHR5cGluZ1RpbWVyID0gc2V0VGltZW91dChkb25lVHlwaW5nLCBkb25lVHlwaW5nSW50ZXJ2YWwpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LCAvLyBhbGxvd01pbm5wb3N0QWNjb3VudFxuXG4gICAgc3BhbUVtYWlsOiBmdW5jdGlvbihlbWFpbF9maWVsZCkge1xuICAgICAgdmFyIHNwYW1FcnJvckNvbnRhaW5lciA9IGVtYWlsX2ZpZWxkLnBhcmVudCgpO1xuICAgICAgaWYgKCQoJy5hLXNwYW0tZW1haWwnLCBzcGFtRXJyb3JDb250YWluZXIpLmxlbmd0aCA9PT0gMCApIHtcbiAgICAgICAgc3BhbUVycm9yQ29udGFpbmVyLmFwcGVuZCgnPHAgY2xhc3M9XCJhLWZvcm0tY2FwdGlvbiBhLWVycm9yIGEtc3BhbS1lbWFpbFwiPlRoaXMgZW1haWwgYWRkcmVzcyBoYXMgYmVlbiBkZXRlY3RlZCBhcyBhIHNwYW1tZXIuPC9wPicpO1xuICAgICAgfVxuICAgICAgJCgnLmEtc3BhbS1lbWFpbCcsIHNwYW1FcnJvckNvbnRhaW5lcikuaGlkZSgpO1xuICAgICAgc3BhbUVycm9yQ29udGFpbmVyLnJlbW92ZUNsYXNzKCdpbnZhbGlkIGEtZXJyb3InKTtcbiAgICB9LCAvLyBzcGFtRW1haWxcblxuICAgIHRvZ2dsZUFjY291bnRGaWVsZHM6IGZ1bmN0aW9uKGNyZWF0ZV9hY2NvdW50X3NlbGVjdG9yKSB7XG4gICAgICBpZiAoY3JlYXRlX2FjY291bnRfc2VsZWN0b3IuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgY3JlYXRlX2FjY291bnRfc2VsZWN0b3IucGFyZW50KCkuYmVmb3JlKCc8cCBjbGFzcz1cImEtZm9ybS1jYXB0aW9uIGEtYWNjb3VudC1leGlzdHMgYS1hY2NvdW50LWV4aXN0cy1zdWNjZXNzXCI+VGhlcmUgaXMgYWxyZWFkeSBhIE1pbm5Qb3N0LmNvbSBhY2NvdW50IHdpdGggdGhpcyBlbWFpbCBhZGRyZXNzLjwvcD4nKTtcbiAgICAgICAgJCgnLmEtYWNjb3VudC1leGlzdHMnKS5oaWRlKCk7XG4gICAgICAgICQodGhpcy5vcHRpb25zLnBhc3N3b3JkX3NlbGVjdG9yLCB0aGlzLmVsZW1lbnQpLnNob3coKTtcbiAgICAgICAgdGhpcy5vcHRpb25zLmNyZWF0ZV9hY2NvdW50ID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQodGhpcy5vcHRpb25zLnBhc3N3b3JkX3NlbGVjdG9yLCB0aGlzLmVsZW1lbnQpLmhpZGUoKTtcbiAgICAgIH1cbiAgICB9LCAvLyB0b2dnbGVBY2NvdW50RmllbGRzXG5cbiAgICBzaG93UGFzc3dvcmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgLy8gQ2FjaGUgb3VyIGpxdWVyeSBlbGVtZW50c1xuICAgICAgdmFyICRzdWJtaXQgPSAkKCcuYnRuLXN1Ym1pdCcpO1xuICAgICAgdmFyICRjb250YWluZXIgPSAkKHRoaXMub3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgdGhpcy5lbGVtZW50KTtcbiAgICAgIHZhciAkZmllbGQgPSAkKCdpbnB1dFtuYW1lPVwicGFzc3dvcmRcIl0nLCAkY29udGFpbmVyKTtcbiAgICAgICQoJy5hLWFjY291bnQtZXhpc3RzJykuaGlkZSgpO1xuICAgICAgdmFyIHNob3dfcGFzcyA9ICc8ZGl2IGNsYXNzPVwiYS1mb3JtLXNob3ctcGFzc3dvcmQgYS1mb3JtLWNhcHRpb25cIj48bGFiZWw+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG5hbWU9XCJzaG93X3Bhc3N3b3JkXCIgaWQ9XCJzaG93LXBhc3N3b3JkLWNoZWNrYm94XCIgdmFsdWU9XCIxXCI+IFNob3cgcGFzc3dvcmQ8L2xhYmVsPjwvZGl2Pic7XG4gICAgICAvLyBJbmplY3QgdGhlIHRvZ2dsZSBidXR0b24gaW50byB0aGUgcGFnZVxuICAgICAgJGNvbnRhaW5lci5hcHBlbmQoIHNob3dfcGFzcyApO1xuICAgICAgLy8gQ2FjaGUgdGhlIHRvZ2dsZSBidXR0b25cbiAgICAgIHZhciAkdG9nZ2xlID0gJCgnI3Nob3ctcGFzc3dvcmQtY2hlY2tib3gnKTtcbiAgICAgIC8vIFRvZ2dsZSB0aGUgZmllbGQgdHlwZVxuICAgICAgJHRvZ2dsZS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIHZhciBjaGVja2JveCA9ICQodGhpcyk7XG4gICAgICAgIGlmIChjaGVja2JveC5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICAgICRmaWVsZC5hdHRyKCd0eXBlJywgJ3RleHQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkZmllbGQuYXR0cigndHlwZScsICdwYXNzd29yZCcpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIC8vIFNldCB0aGUgZm9ybSBmaWVsZCBiYWNrIHRvIGEgcmVndWxhciBwYXNzd29yZCBlbGVtZW50XG4gICAgICAkc3VibWl0Lm9uKCAnY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICRmaWVsZC5hdHRyKCd0eXBlJywgJ3Bhc3N3b3JkJyk7XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgc2hvd1Bhc3N3b3JkU3RyZW5ndGg6IGZ1bmN0aW9uKCkge1xuICAgICAgLy8gY2hlY2tQYXNzd29yZFN0cmVuZ3RoXG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICBpZiAoJCgnLmEtcGFzc3dvcmQtc3RyZW5ndGgnKS5sZW5ndGggPiAwICkge1xuICAgICAgICB2YXIgJGJlZm9yZSA9ICQoJy5hLWZvcm0tc2hvdy1wYXNzd29yZCcpO1xuICAgICAgICAkYmVmb3JlLmFmdGVyKCAkKCc8ZGl2IGNsYXNzPVwiYS1wYXNzd29yZC1zdHJlbmd0aFwiPjxtZXRlciBtYXg9XCI0XCIgaWQ9XCJwYXNzd29yZC1zdHJlbmd0aFwiPjxkaXY+PC9kaXY+PC9tZXRlcj48cCBjbGFzcz1cImEtZm9ybS1jYXB0aW9uXCIgaWQ9XCJwYXNzd29yZC1zdHJlbmd0aC10ZXh0XCI+PC9wPjwvZGl2PicpKTtcbiAgICAgICAgJCggJ2JvZHknICkub24oICdrZXl1cCcsICdpbnB1dFtuYW1lPXBhc3N3b3JkXScsXG4gICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGF0LmNoZWNrUGFzc3dvcmRTdHJlbmd0aChcbiAgICAgICAgICAgICAgJCgnaW5wdXRbbmFtZT1wYXNzd29yZF0nKSwgLy8gUGFzc3dvcmQgZmllbGRcbiAgICAgICAgICAgICAgJCgnI3Bhc3N3b3JkLXN0cmVuZ3RoJyksICAgICAgICAgICAvLyBTdHJlbmd0aCBtZXRlclxuICAgICAgICAgICAgICAkKCcjcGFzc3dvcmQtc3RyZW5ndGgtdGV4dCcpICAgICAgLy8gU3RyZW5ndGggdGV4dCBpbmRpY2F0b3JcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0sIC8vIHNob3dQYXNzd29yZFN0cmVuZ3RoXG5cbiAgICBjaGVja1Bhc3N3b3JkU3RyZW5ndGg6IGZ1bmN0aW9uKCAkcGFzc3dvcmQsICRzdHJlbmd0aE1ldGVyLCAkc3RyZW5ndGhUZXh0ICkge1xuICAgICAgdmFyIHBhc3N3b3JkID0gJHBhc3N3b3JkLnZhbCgpO1xuICAgICAgLy8gR2V0IHRoZSBwYXNzd29yZCBzdHJlbmd0aFxuICAgICAgdmFyIHJlc3VsdCA9IHp4Y3ZibihwYXNzd29yZCk7XG4gICAgICB2YXIgc3RyZW5ndGggPSByZXN1bHQuc2NvcmU7XG5cbiAgICAgICRzdHJlbmd0aFRleHQucmVtb3ZlQ2xhc3MoICdzaG9ydCBiYWQgZ29vZCBzdHJvbmcnICk7XG5cbiAgICAgIC8vIEFkZCB0aGUgc3RyZW5ndGggbWV0ZXIgcmVzdWx0c1xuICAgICAgc3dpdGNoICggc3RyZW5ndGggKSB7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAkc3RyZW5ndGhUZXh0LmFkZENsYXNzKCAnYmFkJyApLmh0bWwoICdTdHJlbmd0aDogPHN0cm9uZz5XZWFrPC9zdHJvbmc+JyApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgJHN0cmVuZ3RoVGV4dC5hZGRDbGFzcyggJ2dvb2QnICkuaHRtbCggJ1N0cmVuZ3RoOiA8c3Ryb25nPk1lZGl1bTwvc3Ryb25nPicgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICRzdHJlbmd0aFRleHQuYWRkQ2xhc3MoICdzdHJvbmcnICkuaHRtbCggJ1N0cmVuZ3RoOiA8c3Ryb25nPlN0cm9uZzwvc3Ryb25nPicgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICRzdHJlbmd0aFRleHQuYWRkQ2xhc3MoICdzaG9ydCcgKS5odG1sKCAnU3RyZW5ndGg6IDxzdHJvbmc+VmVyeSB3ZWFrPC9zdHJvbmc+JyApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICRzdHJlbmd0aFRleHQuYWRkQ2xhc3MoICdzaG9ydCcgKS5odG1sKCAnU3RyZW5ndGg6IDxzdHJvbmc+VmVyeSB3ZWFrPC9zdHJvbmc+JyApO1xuICAgICAgfVxuICAgICAgJHN0cmVuZ3RoTWV0ZXIudmFsKHN0cmVuZ3RoKTtcbiAgICAgIHJldHVybiBzdHJlbmd0aDtcbiAgICB9LCAvLyBjaGVja1Bhc3N3b3JkU3RyZW5ndGhcblxuICAgIGNoZWNrTWlubnBvc3RBY2NvdW50OiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zLCBlbWFpbCkge1xuICAgICAgdmFyIHVzZXIgPSB7XG4gICAgICAgIGVtYWlsOiBlbWFpbFxuICAgICAgfTtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICQuYWpheCh7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIHVybDogb3B0aW9ucy5taW5ucG9zdF9yb290ICsgJy93cC1qc29uL3VzZXItYWNjb3VudC1tYW5hZ2VtZW50L3YxL2NoZWNrLWFjY291bnQnLFxuICAgICAgICBkYXRhOiB1c2VyXG4gICAgICB9KS5kb25lKGZ1bmN0aW9uKCByZXN1bHQgKSB7XG4gICAgICAgIGlmIChyZXN1bHQuc3RhdHVzID09PSAnc3VjY2VzcycgJiYgcmVzdWx0LnJlYXNvbiA9PT0gJ3VzZXIgZXhpc3RzJykgeyAvLyB1c2VyIGV4aXN0c1xuICAgICAgICAgIGlmICgkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KS5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICAgICAgJChvcHRpb25zLnBhc3N3b3JkX3NlbGVjdG9yLCBlbGVtZW50KS5oaWRlKCk7XG4gICAgICAgICAgICAkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKS5oaWRlKCk7XG4gICAgICAgICAgICAkKCcuYS1hY2NvdW50LWV4aXN0cycsIGVsZW1lbnQpLnNob3coKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCQob3B0aW9ucy5jcmVhdGVfbXBfc2VsZWN0b3IsIGVsZW1lbnQpLmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgICAgICAgICQob3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgZWxlbWVudCkuaGlkZSgpO1xuICAgICAgICAgICAgICAkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKS5oaWRlKCk7XG4gICAgICAgICAgICAgICQoJy5hLWFjY291bnQtZXhpc3RzJywgZWxlbWVudCkuc2hvdygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKCByZXN1bHQuc3RhdHVzID09PSAnc3BhbScgKSB7XG4gICAgICAgICAgJCh0aGF0Lm9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IpLmFkZENsYXNzKCdpbnZhbGlkIGEtZXJyb3InKTtcbiAgICAgICAgICAkKCAnLmEtc3BhbS1lbWFpbCcpLnNob3coKTtcbiAgICAgICAgfSBlbHNlIHsgLy8gdXNlciBkb2VzIG5vdCBleGlzdCBvciBhamF4IGNhbGwgZmFpbGVkXG4gICAgICAgICAgaWYgKCQob3B0aW9ucy5jcmVhdGVfbXBfc2VsZWN0b3IsIGVsZW1lbnQpLmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgICAgICAkKG9wdGlvbnMucGFzc3dvcmRfc2VsZWN0b3IsIGVsZW1lbnQpLnNob3coKTtcbiAgICAgICAgICAgIG9wdGlvbnMuY3JlYXRlX2FjY291bnQgPSB0cnVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKG9wdGlvbnMucGFzc3dvcmRfc2VsZWN0b3IsIGVsZW1lbnQpLmhpZGUoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgJCgnLmEtYWNjb3VudC1leGlzdHMnLCBlbGVtZW50KS5oaWRlKCk7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LCAvLyBjaGVja01pbm5wb3N0QWNjb3VudFxuXG4gICAgcGF5bWVudFJlcXVlc3RCdXR0b246IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHZhciB0b3RhbF9hbW91bnQgPSB0aGF0LmdldFRvdGFsQW1vdW50KCk7XG4gICAgICB0aGF0LnBheW1lbnRSZXF1ZXN0ID0gdGhhdC5zdHJpcGUucGF5bWVudFJlcXVlc3Qoe1xuICAgICAgICBjb3VudHJ5OiAnVVMnLFxuICAgICAgICBjdXJyZW5jeTogJ3VzZCcsXG4gICAgICAgIHRvdGFsOiB7XG4gICAgICAgICAgbGFiZWw6ICdNaW5uUG9zdCcsXG4gICAgICAgICAgYW1vdW50OiB0b3RhbF9hbW91bnQgKiAxMDAsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICAgIHRoYXQucHJCdXR0b24gPSB0aGF0LmVsZW1lbnRzLmNyZWF0ZSgncGF5bWVudFJlcXVlc3RCdXR0b24nLCB7XG4gICAgICAgIHBheW1lbnRSZXF1ZXN0OiB0aGF0LnBheW1lbnRSZXF1ZXN0LFxuICAgICAgICBzdHlsZToge1xuICAgICAgICAgIHBheW1lbnRSZXF1ZXN0QnV0dG9uOiB7XG4gICAgICAgICAgICB0eXBlOiAnZG9uYXRlJyxcbiAgICAgICAgICAgIC8vIE9uZSBvZiAnZGVmYXVsdCcsICdib29rJywgJ2J1eScsIG9yICdkb25hdGUnXG4gICAgICAgICAgICAvLyBEZWZhdWx0cyB0byAnZGVmYXVsdCdcbiAgICAgIFxuICAgICAgICAgICAgdGhlbWU6ICdkYXJrJyxcbiAgICAgICAgICAgIC8vIE9uZSBvZiAnZGFyaycsICdsaWdodCcsIG9yICdsaWdodC1vdXRsaW5lJ1xuICAgICAgICAgICAgLy8gRGVmYXVsdHMgdG8gJ2RhcmsnXG4gICAgICBcbiAgICAgICAgICAgIGhlaWdodDogJzQ4cHgnXG4gICAgICAgICAgICAvLyBEZWZhdWx0cyB0byAnNDBweCcuIFRoZSB3aWR0aCBpcyBhbHdheXMgJzEwMCUnLlxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICAgIFxuICAgICAgLy8gQ2hlY2sgdGhlIGF2YWlsYWJpbGl0eSBvZiB0aGUgUGF5bWVudCBSZXF1ZXN0IEFQSSBmaXJzdC5cbiAgICAgIHRoYXQucGF5bWVudFJlcXVlc3QuY2FuTWFrZVBheW1lbnQoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgJCgnLm0tcGF5LXdpdGhvdXQtcGF5bWVudC1yZXF1ZXN0JykuaGlkZSgpO1xuICAgICAgICAgIHRoYXQucHJCdXR0b24ubW91bnQoJyNwYXltZW50LXJlcXVlc3QtYnV0dG9uJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJCgnLm8tcGF5LXdpdGgtcGF5bWVudC1yZXF1ZXN0JykuaGlkZSgpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgJCgnLmRlY2xpbmUtYXBwbGUtcGF5IGEnKS5jbGljayhmdW5jdGlvbihldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAkKHRoaXMpLmhpZGUoKTtcbiAgICAgICAgJCgnLm0tcGF5LXdpdGhvdXQtcGF5bWVudC1yZXF1ZXN0Jykuc2hvdygpO1xuICAgICAgICAkKCcuby1wYXktd2l0aC1wYXltZW50LXJlcXVlc3QgLm0tZm9ybS1hY3Rpb25zLXBheS1mZWVzJykuaGlkZSgpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoYXQucHJCdXR0b24ub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcblxuICAgICAgICAvLyBTZW5kIHBheW1lbnRNZXRob2QuaWQgdG8gc2VydmVyXG4gICAgICAgIHZhciBzdXBwb3J0Zm9ybSA9ICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKTtcblxuICAgICAgICBjb25zb2xlLmxvZygndGhpcyB2YWxpZCBpcyAnICsgc3VwcG9ydGZvcm0uZ2V0KDApLnJlcG9ydFZhbGlkaXR5KCkgKTtcblxuICAgICAgICAvLyBjaGVjayB2YWxpZGF0aW9uIG9mIGZvcm1cbiAgICAgICAgaWYgKCFzdXBwb3J0Zm9ybS5nZXQoMCkucmVwb3J0VmFsaWRpdHkoKSkge1xuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgdGhhdC5wYXltZW50UmVxdWVzdC5vbigncGF5bWVudG1ldGhvZCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cbiAgICAgICAgLy8gU2VuZCBwYXltZW50TWV0aG9kLmlkIHRvIHNlcnZlclxuICAgICAgICB2YXIgc3VwcG9ydGZvcm0gPSAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3Rvcik7XG4gICAgICAgIHZhciB0b2tlbkZpZWxkTmFtZSA9ICdwYXltZW50X21ldGhvZF9pZCc7XG4gICAgICAgIHZhciB0b2tlbkZpZWxkID0gJ2lucHV0W25hbWU9XCInICsgdG9rZW5GaWVsZE5hbWUgKyAnXCJdJztcblxuICAgICAgICAvLyBJbnNlcnQgdGhlIHBheW1lbnQgbWV0aG9kIElEIGludG8gdGhlIGZvcm0gc28gaXQgZ2V0cyBzdWJtaXR0ZWQgdG8gdGhlIHNlcnZlclxuICAgICAgICBpZiAoJCh0b2tlbkZpZWxkKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgJCh0b2tlbkZpZWxkKS52YWwoZXZlbnQucGF5bWVudE1ldGhvZC5pZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3VwcG9ydGZvcm0uYXBwZW5kKCQoJzxpbnB1dCB0eXBlPVxcXCJoaWRkZW5cXFwiIG5hbWU9XCInICsgdG9rZW5GaWVsZE5hbWUgKyAnXCI+JykudmFsKGV2ZW50LnBheW1lbnRNZXRob2QuaWQpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoYXQuZm9ybVByb2Nlc3Nvcih0aGF0LCAncGF5bWVudFJlcXVlc3QnKTtcblxuICAgICAgfSk7XG5cbiAgICB9LCAvLyBwYXltZW50UmVxdWVzdEJ1dHRvblxuXG4gICAgY2hvb3NlUGF5bWVudE1ldGhvZDogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuXG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG5cbiAgICAgIGlmICgkKG9wdGlvbnMuY2hvb3NlX3BheW1lbnQpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgaWYgKCQob3B0aW9ucy5jaG9vc2VfcGF5bWVudCArICcgaW5wdXQnKS5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICAgIHZhciBjaGVja2VkX2lkID0gJChvcHRpb25zLmNob29zZV9wYXltZW50ICsgJyBpbnB1dDpjaGVja2VkJykuYXR0cignaWQnKTtcbiAgICAgICAgICB2YXIgY2hlY2tlZF92YWx1ZSA9ICQob3B0aW9ucy5jaG9vc2VfcGF5bWVudCArICcgaW5wdXQ6Y2hlY2tlZCcpLnZhbCgpO1xuICAgICAgICAgIHRoYXQuc2V0dXBQYXltZW50TWV0aG9kKGNoZWNrZWRfaWQsIGNoZWNrZWRfdmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgJChvcHRpb25zLmNob29zZV9wYXltZW50ICsgJyBpbnB1dCcpLmNoYW5nZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyIGNoZWNrZWRfaWQgPSB0aGlzLmlkO1xuICAgICAgICAgIHZhciBjaGVja2VkX3ZhbHVlID0gdGhpcy52YWx1ZTtcbiAgICAgICAgICB0aGF0LnNldHVwUGF5bWVudE1ldGhvZChjaGVja2VkX2lkLCBjaGVja2VkX3ZhbHVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgIH1cbiAgICB9LCAvLyBjaG9vc2VQYXltZW50TWV0aG9kXG5cbiAgICBzZXR1cFBheW1lbnRNZXRob2Q6IGZ1bmN0aW9uKGVsZW1lbnRfaWQsIGVsZW1lbnRfdmFsdWUpIHtcbiAgICAgIHZhciBzdHJpcGVfcGF5bWVudF90eXBlID0gdGhpcy5zZXRTdHJpcGVQYXltZW50VHlwZShlbGVtZW50X3ZhbHVlKTtcbiAgICAgIGlmICggZWxlbWVudF92YWx1ZSA9PT0gJ2JhbmtfYWNjb3VudCcgKSB7XG4gICAgICAgICQoJ2lucHV0W25hbWU9XCJwYXltZW50X21ldGhvZF9pZFwiXScsICQodGhpcy5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKSkucmVtb3ZlKCk7XG4gICAgICAgIHRoaXMuYWNoRmllbGRzKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucmVtb3ZlQWNoRmllbGRzKHRoaXMub3B0aW9ucyk7XG4gICAgICB9XG4gICAgICAkKHRoaXMub3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvcikucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgJCh0aGlzLm9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IgKyAnLicgKyBlbGVtZW50X2lkKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAkKHRoaXMub3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvciArICc6bm90KC5hY3RpdmUpIGlucHV0JykudmFsKCcnKTtcbiAgICAgIHRoaXMuY2FsY3VsYXRlRmVlcyh0aGlzLm9wdGlvbnMub3JpZ2luYWxfYW1vdW50LCBzdHJpcGVfcGF5bWVudF90eXBlKTtcbiAgICB9LCAvLyBzZXR1cFBheW1lbnRNZXRob2RcblxuICAgIHJlbW92ZUFjaEZpZWxkczogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgJCgnaW5wdXRbbmFtZT1cInB1YmxpY190b2tlblwiXScsICQob3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikpLnJlbW92ZSgpO1xuICAgICAgJCgnaW5wdXRbbmFtZT1cImFjY291bnRfaWRcIl0nLCAkKG9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpKS5yZW1vdmUoKTtcbiAgICAgICQoJ2lucHV0W25hbWU9XCJiYW5rVG9rZW5cIl0nLCAkKG9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpKS5yZW1vdmUoKTtcbiAgICAgICQob3B0aW9ucy5wbGFpZF9saW5rKS5odG1sKCc8YSBocmVmPVwiI1wiIGlkPVwiYXV0aG9yaXplLWFjaFwiPlNpZ24gaW4gdG8geW91ciBiYW5rIGFjY291bnQ8L2E+Jyk7XG4gICAgICBpZiAodHlwZW9mIHRoaXMubGlua0hhbmRsZXIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRoaXMubGlua0hhbmRsZXIuZGVzdHJveSgpO1xuICAgICAgfVxuICAgIH0sIC8vIHJlbW92ZUFjaEZpZWxkc1xuXG4gICAgY3JlZGl0Q2FyZEZpZWxkczogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuXG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG5cbiAgICAgIHZhciBzdHlsZSA9IHtcbiAgICAgICAgYmFzZToge1xuICAgICAgICAgIGljb25Db2xvcjogJyM2NjZFRTgnLFxuICAgICAgICAgIGxpbmVIZWlnaHQ6ICc0M3B4JyxcbiAgICAgICAgICBmb250V2VpZ2h0OiA0MDAsXG4gICAgICAgICAgZm9udEZhbWlseTogJ2ZmLW1ldGEtd2ViLXBybycsXG4gICAgICAgICAgZm9udFNpemU6ICcyNHB4JyxcbiAgICAgICAgICAvL2xpbmVIZWlnaHQ6ICczN3B4JyxcbiAgICAgICAgICAvL2ZvbnRTaXplOiAnMTZweCcsXG4gICAgICAgIH0sXG4gICAgICAgIGludmFsaWQ6IHtcbiAgICAgICAgICBjb2xvcjogJyMxYTE4MTgnLFxuICAgICAgICB9LFxuICAgICAgfTtcblxuICAgICAgLy8gQWRkIGFuIGluc3RhbmNlIG9mIHRoZSBjYXJkIFVJIGNvbXBvbmVudCBpbnRvIHRoZSBgY2FyZC1lbGVtZW50YCA8ZGl2PlxuICAgICAgLy9jYXJkLm1vdW50KCcjY2FyZC1lbGVtZW50Jyk7XG4gICAgICBpZiAoICQoJy5jcmVkaXQtY2FyZC1ncm91cCcpLmxlbmd0aCA9PT0gMCAmJiAkKCcucGF5bWVudC1tZXRob2QuY2hvb3NlLWNhcmQnKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhhdC5jYXJkTnVtYmVyRWxlbWVudCA9IHRoYXQuZWxlbWVudHMuY3JlYXRlKCdjYXJkTnVtYmVyJywge1xuICAgICAgICBzaG93SWNvbjogdHJ1ZSxcbiAgICAgICAgc3R5bGU6IHN0eWxlXG4gICAgICB9KTtcbiAgICAgIHRoYXQuY2FyZE51bWJlckVsZW1lbnQubW91bnQob3B0aW9ucy5jY19udW1fc2VsZWN0b3IpO1xuXG4gICAgICB0aGF0LmNhcmRFeHBpcnlFbGVtZW50ID0gdGhhdC5lbGVtZW50cy5jcmVhdGUoJ2NhcmRFeHBpcnknLCB7XG4gICAgICAgIHN0eWxlOiBzdHlsZVxuICAgICAgfSk7XG4gICAgICB0aGF0LmNhcmRFeHBpcnlFbGVtZW50Lm1vdW50KG9wdGlvbnMuY2NfZXhwX3NlbGVjdG9yKTtcblxuICAgICAgdGhhdC5jYXJkQ3ZjRWxlbWVudCA9IHRoYXQuZWxlbWVudHMuY3JlYXRlKCdjYXJkQ3ZjJywge1xuICAgICAgICBzdHlsZTogc3R5bGVcbiAgICAgIH0pO1xuICAgICAgdGhhdC5jYXJkQ3ZjRWxlbWVudC5tb3VudChvcHRpb25zLmNjX2N2Y19zZWxlY3Rvcik7XG5cbiAgICAgIC8vIHZhbGlkYXRlL2Vycm9yIGhhbmRsZSB0aGUgY2FyZCBmaWVsZHNcbiAgICAgIHRoYXQuY2FyZE51bWJlckVsZW1lbnQub24oJ2NoYW5nZScsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIHZhciBzdHJpcGVfcGF5bWVudF90eXBlID0gJ2NhcmQnO1xuICAgICAgICAvLyBTd2l0Y2ggcGF5bWVudCB0eXBlIGlmIGl0J3Mgb25lIHRoYXQgd2UgcmVjb2duaXplIGFzIGRpc3RpbmN0XG4gICAgICAgIGlmIChldmVudC5icmFuZCkge1xuICAgICAgICAgIGlmICggZXZlbnQuYnJhbmQgPT09ICdhbWV4JyApIHtcbiAgICAgICAgICAgIHN0cmlwZV9wYXltZW50X3R5cGUgPSAnYW1leCc7XG4gICAgICAgICAgfSAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICAvLyBlcnJvciBoYW5kbGluZ1xuICAgICAgICB0aGF0LnN0cmlwZUVycm9yRGlzcGxheShldmVudC5lcnJvciwgJChvcHRpb25zLmNjX251bV9zZWxlY3RvciwgZWxlbWVudCksIGVsZW1lbnQsIG9wdGlvbnMgKTtcbiAgICAgICAgLy8gaWYgaXQgY2hhbmdlZCwgcmVzZXQgdGhlIGJ1dHRvblxuICAgICAgICB0aGF0LmJ1dHRvblN0YXR1cyhvcHRpb25zLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIGZhbHNlKTtcbiAgICAgICAgdGhhdC5jYWxjdWxhdGVGZWVzKHRoYXQub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQsIHN0cmlwZV9wYXltZW50X3R5cGUpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoYXQuY2FyZEV4cGlyeUVsZW1lbnQub24oJ2NoYW5nZScsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIC8vIGVycm9yIGhhbmRsaW5nXG4gICAgICAgIHRoYXQuc3RyaXBlRXJyb3JEaXNwbGF5KGV2ZW50LmVycm9yLCAkKG9wdGlvbnMuY2NfZXhwX3NlbGVjdG9yLCBlbGVtZW50KSwgZWxlbWVudCwgb3B0aW9ucyApO1xuICAgICAgICAvLyBpZiBpdCBjaGFuZ2VkLCByZXNldCB0aGUgYnV0dG9uXG4gICAgICAgIHRoYXQuYnV0dG9uU3RhdHVzKG9wdGlvbnMsICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKSwgZmFsc2UpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoYXQuY2FyZEN2Y0VsZW1lbnQub24oJ2NoYW5nZScsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIC8vIGVycm9yIGhhbmRsaW5nXG4gICAgICAgIHRoYXQuc3RyaXBlRXJyb3JEaXNwbGF5KGV2ZW50LmVycm9yLCAkKG9wdGlvbnMuY2NfY3ZjX3NlbGVjdG9yLCBlbGVtZW50KSwgZWxlbWVudCwgb3B0aW9ucyApO1xuICAgICAgICAvLyBpZiBpdCBjaGFuZ2VkLCByZXNldCB0aGUgYnV0dG9uXG4gICAgICAgIHRoYXQuYnV0dG9uU3RhdHVzKG9wdGlvbnMsICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKSwgZmFsc2UpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIHRoaXMgaXMgdGhlIG1ldGhvZCB0byBjcmVhdGUgYSBzaW5nbGUgY2FyZCBmaWVsZCBhbmQgbW91bnQgaXRcbiAgICAgIC8qdmFyIGNhcmQgPSB0aGF0LmVsZW1lbnRzLmNyZWF0ZShcbiAgICAgICAgJ2NhcmQnLFxuICAgICAgICB7XG4gICAgICAgICAgaGlkZVBvc3RhbENvZGU6IHRydWVcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICAgIC8vIEFkZCBhbiBpbnN0YW5jZSBvZiB0aGUgY2FyZCBVSSBjb21wb25lbnQgaW50byB0aGUgYGNhcmQtZWxlbWVudGAgPGRpdj5cbiAgICAgIGNhcmQubW91bnQoJyNjYXJkLWVsZW1lbnQnKTsqL1xuXG4gICAgfSwgLy8gY3JlZGl0Q2FyZEZpZWxkc1xuXG4gICAgc2hvd1NwaW5uZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgJCh0aGlzLm9wdGlvbnMucGxhaWRfbGluaykuaHRtbCgnPGltZyBzcmM9XCJodHRwczovL3d3dy5taW5ucG9zdC5jb20vd3AtYWRtaW4vaW1hZ2VzL3NwaW5uZXIuZ2lmXCIgc3Jjc2V0PVwiaHR0cHM6Ly93d3cubWlubnBvc3QuY29tL3dwLWFkbWluL2ltYWdlcy9zcGlubmVyLmdpZiAxeCwgaHR0cHM6Ly93d3cubWlubnBvc3QuY29tL3dwLWFkbWluL2ltYWdlcy9zcGlubmVyLTJ4LmdpZiAyeCxcIj4nKTtcbiAgICB9LFxuXG4gICAgYWNoRmllbGRzOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICB2YXIgYmFua1Rva2VuRmllbGROYW1lID0gJ2JhbmtUb2tlbic7XG4gICAgICB2YXIgYmFua1Rva2VuRmllbGQgPSAnaW5wdXRbbmFtZT1cIicgKyBiYW5rVG9rZW5GaWVsZE5hbWUgKyAnXCJdJztcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIGlmICh0eXBlb2YgUGxhaWQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRoYXQubGlua0hhbmRsZXIgPSBQbGFpZC5jcmVhdGUoe1xuICAgICAgICAgIGNsaWVudE5hbWU6ICdNaW5uUG9zdCcsXG4gICAgICAgICAgZW52OiBvcHRpb25zLnBsYWlkX2VudixcbiAgICAgICAgICBwcm9kdWN0OiBbJ2F1dGgnXSxcbiAgICAgICAgICAvLyAxLiBQYXNzIHRoZSB0b2tlbiBnZW5lcmF0ZWQgaW4gc3RlcCAyLlxuICAgICAgICAgIHRva2VuOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxhaWRfbGlua190b2tlbicpLnZhbHVlLFxuICAgICAgICAgIG9uU3VjY2VzczogZnVuY3Rpb24ocHVibGljX3Rva2VuLCBtZXRhZGF0YSkge1xuICAgICAgICAgICAgdGhhdC5zaG93U3Bpbm5lcigpO1xuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgdXJsOicvZ2V0X3BsYWlkX2FjY2Vzc190b2tlbi8nLFxuICAgICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7IHB1YmxpY190b2tlbjogcHVibGljX3Rva2VuLCBhY2NvdW50X2lkOiBtZXRhZGF0YS5hY2NvdW50X2lkIH0pLFxuICAgICAgICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZG9uZShmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICBpZiAodHlwZW9mIHJlc3BvbnNlLmVycm9yICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIC8vIHRoZXJlIGlzIGFuIGVycm9yLlxuICAgICAgICAgICAgICAgICQob3B0aW9ucy5wbGFpZF9saW5rKS5hZnRlcignPHAgY2xhc3M9XCJlcnJvclwiPicgKyByZXNwb25zZS5lcnJvciArICc8L3A+JylcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL3RoaXMuZGVidWcoJ3ByaW50IHJlc3BvbnNlIGhlcmUnKTtcbiAgICAgICAgICAgICAgICAvL3RoaXMuZGVidWcocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIC8vIGFkZCB0aGUgZmllbGQocykgd2UgbmVlZCB0byB0aGUgZm9ybSBmb3Igc3VibWl0dGluZ1xuICAgICAgICAgICAgICAgIGlmICgkKGJhbmtUb2tlbkZpZWxkKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAkKGJhbmtUb2tlbkZpZWxkKS52YWwocmVzcG9uc2Uuc3RyaXBlX2JhbmtfYWNjb3VudF90b2tlbik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICQob3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikucHJlcGVuZCgkKCc8aW5wdXQgdHlwZT1cXFwiaGlkZGVuXFxcIiBuYW1lPVwiJyArIGJhbmtUb2tlbkZpZWxkTmFtZSArICdcIj4nKS52YWwocmVzcG9uc2Uuc3RyaXBlX2JhbmtfYWNjb3VudF90b2tlbikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkKG9wdGlvbnMucGxhaWRfbGluaywgZWxlbWVudCkuaHRtbCgnPHN0cm9uZz5Zb3VyIGFjY291bnQgd2FzIHN1Y2Nlc3NmdWxseSBhdXRob3JpemVkPC9zdHJvbmc+Jyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZXJyb3IoZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgJChvcHRpb25zLnBsYWlkX2xpbmspLmFmdGVyKCc8cCBjbGFzcz1cImVycm9yXCI+JyArIHJlc3BvbnNlLmVycm9yICsgJzwvcD4nKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICAgICQob3B0aW9ucy5wbGFpZF9saW5rICsgJyBhJykuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICQob3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvciArICcgLmVycm9yJykucmVtb3ZlKCk7IC8vIHJlbW92ZSBtZXRob2QgZXJyb3IgbWVzc2FnZSBpZiBpdCBpcyB0aGVyZVxuICAgICAgICAgIHRoYXQubGlua0hhbmRsZXIub3BlbigpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LCAvLyBhY2hGaWVsZHNcblxuICAgIGJ1dHRvblN0YXR1czogZnVuY3Rpb24ob3B0aW9ucywgYnV0dG9uLCBkaXNhYmxlZCkge1xuICAgICAgLy8gbWFrZSB0aGUgYnV0dG9uIGNsaWNrYWJsZSBvciBub3RcbiAgICAgIGJ1dHRvbi5wcm9wKCdkaXNhYmxlZCcsIGRpc2FibGVkKTtcbiAgICAgIGlmIChkaXNhYmxlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgYnV0dG9uLnRleHQob3B0aW9ucy5idXR0b25fdGV4dCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBidXR0b24udGV4dCgnUHJvY2Vzc2luZycpO1xuICAgICAgfVxuICAgIH0sIC8vIGJ1dHRvblN0YXR1c1xuXG4gICAgdmFsaWRhdGVTZXR1cDogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgdmFyIGZvcm1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChvcHRpb25zLmZvcm1fc2VsZWN0b3IpO1xuICAgICAgZm9ybXMuZm9yRWFjaCggZnVuY3Rpb24gKCBmb3JtICkge1xuICAgICAgICBWYWxpZEZvcm0oIGZvcm0sIHtcbiAgICAgICAgICB2YWxpZGF0aW9uRXJyb3JQYXJlbnRDbGFzczogJ20taGFzLXZhbGlkYXRpb24tZXJyb3InLFxuICAgICAgICAgIHZhbGlkYXRpb25FcnJvckNsYXNzOiAnYS12YWxpZGF0aW9uLWVycm9yJyxcbiAgICAgICAgICBpbnZhbGlkQ2xhc3M6ICdhLWVycm9yJyxcbiAgICAgICAgICBlcnJvclBsYWNlbWVudDogJ2FmdGVyJ1xuICAgICAgICB9IClcbiAgICAgIH0gKTtcbiAgICAgIHRoaXMuc2Nyb2xsVG9Gb3JtRXJyb3Iob3B0aW9ucyk7XG4gICAgfSwgLy8gdmFsaWRhdGVTZXR1cFxuXG4gICAgc2Nyb2xsVG9Gb3JtRXJyb3I6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgIHZhciBmb3JtID0gJCggb3B0aW9ucy5mb3JtX3NlbGVjdG9yICk7XG4gICAgICAvLyBsaXN0ZW4gZm9yIGBpbnZhbGlkYCBldmVudHMgb24gYWxsIGZvcm0gaW5wdXRzXG4gICAgICBmb3JtLmZpbmQoICc6aW5wdXQnICkub24oICdpbnZhbGlkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciBpbnB1dCA9ICQoIHRoaXMgKTtcbiAgICAgICAgICAvLyB0aGUgZmlyc3QgaW52YWxpZCBlbGVtZW50IGluIHRoZSBmb3JtXG4gICAgICAgIHZhciBmaXJzdCA9IGZvcm0uZmluZCggJy5hLWVycm9yJyApLmZpcnN0KCk7XG4gICAgICAgIC8vIHRoZSBmb3JtIGl0ZW0gdGhhdCBjb250YWlucyBpdFxuICAgICAgICB2YXIgZmlyc3RfaG9sZGVyID0gZmlyc3QucGFyZW50KCk7XG4gICAgICAgICAgLy8gb25seSBoYW5kbGUgaWYgdGhpcyBpcyB0aGUgZmlyc3QgaW52YWxpZCBpbnB1dFxuICAgICAgICAgIGlmIChpbnB1dFswXSA9PT0gZmlyc3RbMF0pIHtcbiAgICAgICAgICAgICAgLy8gaGVpZ2h0IG9mIHRoZSBuYXYgYmFyIHBsdXMgc29tZSBwYWRkaW5nIGlmIHRoZXJlJ3MgYSBmaXhlZCBuYXZcbiAgICAgICAgICAgICAgLy92YXIgbmF2YmFySGVpZ2h0ID0gbmF2YmFyLmhlaWdodCgpICsgNTBcblxuICAgICAgICAgICAgICAvLyB0aGUgcG9zaXRpb24gdG8gc2Nyb2xsIHRvIChhY2NvdW50aW5nIGZvciB0aGUgbmF2YmFyIGlmIGl0IGV4aXN0cylcbiAgICAgICAgICAgICAgdmFyIGVsZW1lbnRPZmZzZXQgPSBmaXJzdF9ob2xkZXIub2Zmc2V0KCkudG9wO1xuXG4gICAgICAgICAgICAgIC8vIHRoZSBjdXJyZW50IHNjcm9sbCBwb3NpdGlvbiAoYWNjb3VudGluZyBmb3IgdGhlIG5hdmJhcilcbiAgICAgICAgICAgICAgdmFyIHBhZ2VPZmZzZXQgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XG5cbiAgICAgICAgICAgICAgLy8gZG9uJ3Qgc2Nyb2xsIGlmIHRoZSBlbGVtZW50IGlzIGFscmVhZHkgaW4gdmlld1xuICAgICAgICAgICAgICBpZiAoIGVsZW1lbnRPZmZzZXQgPiBwYWdlT2Zmc2V0ICYmIGVsZW1lbnRPZmZzZXQgPCBwYWdlT2Zmc2V0ICsgd2luZG93LmlubmVySGVpZ2h0ICkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAvLyBub3RlOiBhdm9pZCB1c2luZyBhbmltYXRlLCBhcyBpdCBwcmV2ZW50cyB0aGUgdmFsaWRhdGlvbiBtZXNzYWdlIGRpc3BsYXlpbmcgY29ycmVjdGx5XG4gICAgICAgICAgICAgICQoICdodG1sLCBib2R5JyApLnNjcm9sbFRvcCggZWxlbWVudE9mZnNldCApO1xuICAgICAgICAgIH1cbiAgICAgIH0gKTtcbiAgICB9LCAvLyBzY3JvbGxUb0Zvcm1FcnJvclxuXG4gICAgZm9ybVNldHVwOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG5cbiAgICAgICQob3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3Rvcikuc3VibWl0KGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoYXQuZm9ybVByb2Nlc3Nvcih0aGF0LCAnc3VibWl0Jyk7XG5cbiAgICAgIH0pO1xuICAgIH0sIC8vIGZvcm1TZXR1cFxuXG4gICAgZm9ybVByb2Nlc3NvcjogZnVuY3Rpb24odGhhdCwgdHlwZSkge1xuXG4gICAgICAvLyAxLiByZW1vdmUgcHJldmlvdXMgZXJyb3JzIGFuZCByZXNldCB0aGUgYnV0dG9uXG4gICAgICB0aGF0LnJlc2V0Rm9ybUVycm9ycyh0aGF0Lm9wdGlvbnMsIHRoYXQuZWxlbWVudCk7XG5cbiAgICAgIC8vIDIuIHNldCB1cCB0aGUgYnV0dG9uIGlmIGl0J3MgYSBmb3JtIHN1Ym1pdFxuICAgICAgaWYgKHR5cGUgPT09ICdzdWJtaXQnKSB7XG4gICAgICAgIHRoYXQuYnV0dG9uU3RhdHVzKHRoYXQub3B0aW9ucywgJCh0aGF0Lm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLmZpbmQoJ2J1dHRvbicpLCB0cnVlKTtcbiAgICAgIH1cblxuICAgICAgLy8gMy4gZ2VuZXJhdGUgYmlsbGluZyBhZGRyZXNzIGRldGFpbHNcbiAgICAgIHZhciBiaWxsaW5nRGV0YWlscyA9IHRoYXQuZ2VuZXJhdGVCaWxsaW5nRGV0YWlscygpO1xuXG4gICAgICAvLyA0LiBjcmVhdGUgbWlubnBvc3QgdXNlciBhY2NvdW50XG4gICAgICB0aGF0LmNyZWF0ZU1pbm5Qb3N0QWNjb3VudCh0aGF0Lm9wdGlvbnMsIHRoYXQuZWxlbWVudCk7XG5cbiAgICAgIC8vIDUuIGRvIHRoZSBjaGFyZ2luZyBvZiBjYXJkIG9yIGJhbmsgYWNjb3VudCBpZiBpdCdzIGEgZm9ybSBzdWJtaXRcbiAgICAgIC8vIG9yIHN1Ym1pdCB0aGUgZm9ybSBpZiB0aGlzIGlzIGEgcGF5bWVudCByZXF1ZXN0IGJ1dHRvblxuICAgICAgaWYgKHR5cGUgPT09ICdzdWJtaXQnKSB7XG4gICAgICAgIHZhciBwYXltZW50X3R5cGUgPSAkKCdpbnB1dFtuYW1lPVwic3RyaXBlX3BheW1lbnRfdHlwZVwiXScpLnZhbCgpO1xuICAgICAgICBpZiAocGF5bWVudF90eXBlICE9PSAnYmFua19hY2NvdW50Jykge1xuICAgICAgICAgIC8vIGZpbmFsbHksIGdldCBhIHBheW1lbnQgbWV0aG9kIGZyb20gc3RyaXBlLCBhbmQgdHJ5IHRvIGNoYXJnZSBpdCBpZiBpdCBpcyBub3QgYWNoXG4gICAgICAgICAgdGhhdC5jcmVhdGVQYXltZW50TWV0aG9kKHRoYXQuY2FyZE51bWJlckVsZW1lbnQsIGJpbGxpbmdEZXRhaWxzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBpZiBpdCBpcyBhY2gsIHdlIGFscmVhZHkgaGF2ZSBhIHRva2VuIHNvIHN1Ym1pdCB0aGUgZm9ybVxuICAgICAgICAgIC8vIHRvZG86IHVwZ3JhZGUgdGhlIHBsYWlkIGludGVncmF0aW9uXG4gICAgICAgICAgdGhhdC5iYW5rVG9rZW5IYW5kbGVyKCAkKCdpbnB1dFtuYW1lPVwiYmFua1Rva2VuXCJdJykudmFsKCksICdiYW5rX2FjY291bnQnICk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoYXQuc3VibWl0Rm9ybU9ubHkoKTtcbiAgICAgIH1cbiAgICB9LCAvLyBmb3JtUHJvY2Vzc29yXG5cbiAgICBzdHJpcGVFcnJvckRpc3BsYXk6IGZ1bmN0aW9uKGVycm9yLCB0aGlzX3NlbGVjdG9yLCBlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICAvLyBsaXN0ZW4gZm9yIGVycm9ycyBhbmQgZGlzcGxheS9oaWRlIGVycm9yIG1lc3NhZ2VzXG4gICAgICB2YXIgd2hpY2hfZXJyb3IgPSB0aGlzX3NlbGVjdG9yLmF0dHIoJ2lkJyk7XG4gICAgICAvLyB3aGVuIHRoaXMgZmllbGQgY2hhbmdlcywgcmVzZXQgaXRzIGVycm9yc1xuICAgICAgJCgnLmEtY2FyZC1pbnN0cnVjdGlvbi4nICsgd2hpY2hfZXJyb3IpLnJlbW92ZUNsYXNzKCdhLXZhbGlkYXRpb24tZXJyb3InKTtcbiAgICAgICQoJy5hLWNhcmQtaW5zdHJ1Y3Rpb24uJyArIHdoaWNoX2Vycm9yKS5lbXB0eSgpO1xuICAgICAgJCh0aGlzX3NlbGVjdG9yKS5yZW1vdmVDbGFzcygnYS1lcnJvcicpO1xuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICQoJy5hLWNhcmQtaW5zdHJ1Y3Rpb24uJyArIHdoaWNoX2Vycm9yKS50ZXh0KGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAkKCcuYS1jYXJkLWluc3RydWN0aW9uLicgKyB3aGljaF9lcnJvcikuYWRkQ2xhc3MoJ2EtdmFsaWRhdGlvbi1lcnJvcicpO1xuICAgICAgICB0aGlzX3NlbGVjdG9yLnBhcmVudCgpLmFkZENsYXNzKCdtLWhhcy12YWxpZGF0aW9uLWVycm9yJyk7XG4gICAgICAgICQodGhpc19zZWxlY3RvcikuYWRkQ2xhc3MoJ2EtZXJyb3InKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQodGhpc19zZWxlY3RvcikucmVtb3ZlQ2xhc3MoJ2EtZXJyb3InKTtcbiAgICAgICAgJCgnLmEtY2FyZC1pbnN0cnVjdGlvbi4nICsgd2hpY2hfZXJyb3IpLnJlbW92ZUNsYXNzKCdhLXZhbGlkYXRpb24tZXJyb3InKTtcbiAgICAgICAgJCgnLmEtY2FyZC1pbnN0cnVjdGlvbi4nICsgd2hpY2hfZXJyb3IpLmVtcHR5KCk7XG4gICAgICAgICQob3B0aW9ucy5jY19udW1fc2VsZWN0b3IsIGVsZW1lbnQpLnJlbW92ZUNsYXNzKCdhLXZhbGlkYXRpb24tZXJyb3InKTtcbiAgICAgICAgJChvcHRpb25zLmNjX2V4cF9zZWxlY3RvciwgZWxlbWVudCkucmVtb3ZlQ2xhc3MoJ2EtdmFsaWRhdGlvbi1lcnJvcicpO1xuICAgICAgICAkKG9wdGlvbnMuY2NfY3ZjX3NlbGVjdG9yLCBlbGVtZW50KS5yZW1vdmVDbGFzcygnYS12YWxpZGF0aW9uLWVycm9yJyk7XG4gICAgICAgICQob3B0aW9ucy5jY19udW1fc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdtLWhhcy12YWxpZGF0aW9uLWVycm9yJyk7XG4gICAgICAgICQob3B0aW9ucy5jY19leHBfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdtLWhhcy12YWxpZGF0aW9uLWVycm9yJyk7XG4gICAgICAgICQob3B0aW9ucy5jY19jdmNfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdtLWhhcy12YWxpZGF0aW9uLWVycm9yJyk7XG4gICAgICB9XG4gICAgfSwgLy8gc3RyaXBlRXJyb3JEaXNwbGF5XG5cbiAgICByZXNldEZvcm1FcnJvcnM6IGZ1bmN0aW9uKG9wdGlvbnMsIGVsZW1lbnQpIHtcbiAgICAgICQoJy5hLXZhbGlkYXRpb24tZXJyb3InKS5yZW1vdmUoKTtcbiAgICAgICQoJ2lucHV0LCBsYWJlbCwgZGl2JywgZWxlbWVudCkucmVtb3ZlQ2xhc3MoJ2EtZXJyb3InKTtcbiAgICAgICQoJ2xhYmVsJywgZWxlbWVudCkucmVtb3ZlQ2xhc3MoJ20taGFzLXZhbGlkYXRpb24tZXJyb3InKTtcbiAgICAgICQob3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvciwgZWxlbWVudCkucmVtb3ZlQ2xhc3MoJ2EtZXJyb3IgaW52YWxpZCcpO1xuICAgICAgJCgnLmEtdmFsaWRhdGlvbi1lcnJvcicpLnJlbW92ZSgpO1xuICAgICAgXG4gICAgICAkKG9wdGlvbnMuY2hvb3NlX3BheW1lbnQgKyAnIGlucHV0JykuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICAkKG9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IgKyAnIC5hLWVycm9yJykucmVtb3ZlKCk7IC8vIHJlbW92ZSBtZXRob2QgZXJyb3IgbWVzc2FnZSBpZiBpdCBpcyB0aGVyZVxuICAgICAgICAkKG9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IpLnBhcmVudCgpLmZpbmQoJy5hLXZhbGlkYXRpb24tZXJyb3InKS5yZW1vdmUoKTtcbiAgICAgICAgLy8gaWYgYSBwYXltZW50IGZpZWxkIGNoYW5nZWQsIHJlc2V0IHRoZSBidXR0b25cbiAgICAgICAgYnV0dG9uU3RhdHVzKG9wdGlvbnMsICQob3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIGZhbHNlKTtcbiAgICAgIH0pO1xuICAgIH0sIC8vIHJlc2V0Rm9ybUVycm9yc1xuICAgIFxuICAgIGNyZWF0ZU1pbm5Qb3N0QWNjb3VudDogZnVuY3Rpb24ob3B0aW9ucywgZWxlbWVudCkge1xuICAgICAgLy8gMi4gY3JlYXRlIG1pbm5wb3N0IGFjY291bnQgaWYgc3BlY2lmaWVkXG4gICAgICBpZiAob3B0aW9ucy5jcmVhdGVfYWNjb3VudCA9PT0gdHJ1ZSkge1xuICAgICAgICB2YXIgdXNlciA9IHtcbiAgICAgICAgICBlbWFpbDogJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICBmaXJzdF9uYW1lOiAkKG9wdGlvbnMuZmlyc3RfbmFtZV9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgbGFzdF9uYW1lOiAkKG9wdGlvbnMubGFzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICBwYXNzd29yZDogJChvcHRpb25zLnBhc3N3b3JkX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICBjaXR5OiAkKG9wdGlvbnMuYmlsbGluZ19jaXR5X2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICBzdGF0ZTogJChvcHRpb25zLmJpbGxpbmdfc3RhdGVfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgIHppcDogJChvcHRpb25zLmJpbGxpbmdfemlwX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgfTtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICB1cmw6IG9wdGlvbnMubWlubnBvc3Rfcm9vdCArICcvd3AtanNvbi91c2VyLWFjY291bnQtbWFuYWdlbWVudC92MS9jcmVhdGUtdXNlcicsXG4gICAgICAgICAgZGF0YTogdXNlclxuICAgICAgICB9KS5kb25lKGZ1bmN0aW9uKCBkYXRhICkge1xuICAgICAgICAgIGlmIChkYXRhLnN0YXR1cyA9PT0gJ3N1Y2Nlc3MnICYmIGRhdGEucmVhc29uID09PSAnbmV3IHVzZXInKSB7XG4gICAgICAgICAgICAvLyB1c2VyIGNyZWF0ZWQgLSB0aGV5IHNob3VsZCByZWNlaXZlIGVtYWlsXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LCAvLyBjcmVhdGVNaW5uUG9zdEFjY291bnRcbiAgICBcbiAgICBnZW5lcmF0ZUJpbGxpbmdEZXRhaWxzOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBiaWxsaW5nRGV0YWlscyA9IHt9O1xuICAgICAgdmFyIGFkZHJlc3NEZXRhaWxzID0ge307XG5cbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvcikudmFsKCkgIT0gJycpIHtcbiAgICAgICAgYmlsbGluZ0RldGFpbHMuZW1haWwgPSAkKHRoaXMub3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvcikudmFsKCk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIHZhciBmdWxsX25hbWUgPSAnJztcbiAgICAgIGlmICgkKCcjZnVsbF9uYW1lJykubGVuZ3RoID4gMCkge1xuICAgICAgICBmdWxsX25hbWUgPSAkKCcjZnVsbF9uYW1lJykudmFsKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmdWxsX25hbWUgPSAkKHRoaXMub3B0aW9ucy5maXJzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yKS52YWwoKSArICcgJyArICQodGhpcy5vcHRpb25zLmxhc3RfbmFtZV9maWVsZF9zZWxlY3RvcikudmFsKCk7XG4gICAgICB9XG4gICAgICBiaWxsaW5nRGV0YWlscy5uYW1lID0gZnVsbF9uYW1lO1xuXG4gICAgICB2YXIgc3RyZWV0ID0gJ05vbmUnO1xuICAgICAgaWYgKCQoJ2lucHV0W25hbWU9XCJmdWxsX2FkZHJlc3NcIl0nKS52YWwoKSAhPSAnJykge1xuICAgICAgICBzdHJlZXQgPSAkKCcjZnVsbF9hZGRyZXNzJykudmFsKCk7XG4gICAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5iaWxsaW5nX3N0cmVldF9maWVsZF9zZWxlY3RvcikudmFsKCkgIT0gJycpIHtcbiAgICAgICAgICBzdHJlZXQgPSAkKHRoaXMub3B0aW9ucy5iaWxsaW5nX3N0cmVldF9maWVsZF9zZWxlY3RvcikudmFsKCk7XG4gICAgICAgIH1cbiAgICAgICAgYWRkcmVzc0RldGFpbHMubGluZTEgPSBzdHJlZXQ7XG4gICAgICB9XG5cbiAgICAgIHZhciBjaXR5ID0gJ05vbmUnO1xuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmFjY291bnRfY2l0eV9zZWxlY3RvcikudmFsKCkgIT0gJycpIHtcbiAgICAgICAgY2l0eSA9ICQodGhpcy5vcHRpb25zLmFjY291bnRfY2l0eV9zZWxlY3RvcikudmFsKCk7XG4gICAgICAgIGFkZHJlc3NEZXRhaWxzLmNpdHkgPSBjaXR5O1xuICAgICAgfVxuXG4gICAgICB2YXIgc3RhdGUgPSAnTm9uZSc7XG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuYWNjb3VudF9zdGF0ZV9zZWxlY3RvcikudmFsKCkgIT0gJycpIHtcbiAgICAgICAgc3RhdGUgPSAkKHRoaXMub3B0aW9ucy5hY2NvdW50X3N0YXRlX3NlbGVjdG9yKS52YWwoKTtcbiAgICAgICAgYWRkcmVzc0RldGFpbHMuc3RhdGUgPSBzdGF0ZTtcbiAgICAgIH1cblxuICAgICAgdmFyIHppcCA9ICdOb25lJztcbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5hY2NvdW50X3ppcF9zZWxlY3RvcikudmFsKCkgIT0gJycpIHtcbiAgICAgICAgemlwID0gJCh0aGlzLm9wdGlvbnMuYWNjb3VudF96aXBfc2VsZWN0b3IpLnZhbCgpO1xuICAgICAgICBhZGRyZXNzRGV0YWlscy5wb3N0YWxfY29kZSA9IHppcDtcbiAgICAgIH1cblxuICAgICAgdmFyIGNvdW50cnkgPSAnVVMnO1xuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmJpbGxpbmdfY291bnRyeV9maWVsZF9zZWxlY3RvcikudmFsKCkgIT0gJycpIHtcbiAgICAgICAgY291bnRyeSA9ICQodGhpcy5vcHRpb25zLmJpbGxpbmdfY291bnRyeV9maWVsZF9zZWxlY3RvcikudmFsKCk7XG4gICAgICB9XG4gICAgICBhZGRyZXNzRGV0YWlscy5jb3VudHJ5ID0gY291bnRyeTtcblxuICAgICAgaWYgKHN0cmVldCAhPT0gJ05vbmUnIHx8IGNpdHkgIT09ICdOb25lJyB8fCBzdGF0ZSAhPT0gJ05vbmUnIHx8IHppcCAhPT0gJ05vbmUnKSB7XG4gICAgICAgIGJpbGxpbmdEZXRhaWxzLmFkZHJlc3MgPSBhZGRyZXNzRGV0YWlscztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGJpbGxpbmdEZXRhaWxzO1xuICAgIH0sIC8vIGdlbmVyYXRlQmlsbGluZ0RldGFpbHNcblxuICAgIGNyZWF0ZVBheW1lbnRNZXRob2Q6IGZ1bmN0aW9uKGNhcmRFbGVtZW50LCBiaWxsaW5nRGV0YWlscykge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdGhhdC5zdHJpcGUuY3JlYXRlUGF5bWVudE1ldGhvZCh7XG4gICAgICAgIHR5cGU6ICdjYXJkJyxcbiAgICAgICAgY2FyZDogY2FyZEVsZW1lbnQsXG4gICAgICAgIGJpbGxpbmdfZGV0YWlsczogYmlsbGluZ0RldGFpbHNcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKHJlc3BvbnNlLmVycm9yKSB7XG4gICAgICAgICAgdGhhdC5oYW5kbGVTZXJ2ZXJFcnJvcihyZXNwb25zZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gU2VuZCBwYXltZW50TWV0aG9kLmlkIHRvIHNlcnZlclxuICAgICAgICAgIHZhciBzdXBwb3J0Zm9ybSA9ICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKTtcbiAgICAgICAgICB2YXIgYWpheF91cmwgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG4gICAgICAgICAgdmFyIHRva2VuRmllbGROYW1lID0gJ3BheW1lbnRfbWV0aG9kX2lkJztcbiAgICAgICAgICB2YXIgdG9rZW5GaWVsZCA9ICdpbnB1dFtuYW1lPVwiJyArIHRva2VuRmllbGROYW1lICsgJ1wiXSc7XG5cbiAgICAgICAgICAvLyBJbnNlcnQgdGhlIHBheW1lbnQgbWV0aG9kIElEIGludG8gdGhlIGZvcm0gc28gaXQgZ2V0cyBzdWJtaXR0ZWQgdG8gdGhlIHNlcnZlclxuICAgICAgICAgIGlmICgkKHRva2VuRmllbGQpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICQodG9rZW5GaWVsZCkudmFsKHJlc3BvbnNlLnBheW1lbnRNZXRob2QuaWQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdXBwb3J0Zm9ybS5hcHBlbmQoJCgnPGlucHV0IHR5cGU9XFxcImhpZGRlblxcXCIgbmFtZT1cIicgKyB0b2tlbkZpZWxkTmFtZSArICdcIj4nKS52YWwocmVzcG9uc2UucGF5bWVudE1ldGhvZC5pZCkpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGZldGNoKGFqYXhfdXJsLCB7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYm9keTogJChzdXBwb3J0Zm9ybSkuc2VyaWFsaXplKClcbiAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAvLyBIYW5kbGUgc2VydmVyIHJlc3BvbnNlIChzZWUgU3RlcCAzKVxuICAgICAgICAgICAgcmVzcG9uc2UuanNvbigpLnRoZW4oZnVuY3Rpb24oanNvbikge1xuICAgICAgICAgICAgICB0aGF0LmhhbmRsZVNlcnZlclJlc3BvbnNlKGpzb24pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSwgLy8gY3JlYXRlUGF5bWVudE1ldGhvZFxuXG4gICAgYmFua1Rva2VuSGFuZGxlcjogZnVuY3Rpb24odG9rZW4sIHR5cGUpIHtcbiAgICAgIHRoaXMuc2V0U3RyaXBlUGF5bWVudFR5cGUodHlwZSk7XG4gICAgICB0aGlzLnN1Ym1pdEZvcm1Pbmx5KCk7XG4gICAgfSwgLy8gYmFua1Rva2VuSGFuZGxlclxuXG4gICAgc3VibWl0Rm9ybU9ubHk6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdmFyIHN1cHBvcnRmb3JtID0gJCh0aGlzLm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpO1xuICAgICAgdmFyIGFqYXhfdXJsID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xuXG4gICAgICAvLyBTdWJtaXQgdGhlIGZvcm1cbiAgICAgIC8vIHRoZSB3YXkgaXQgd29ya3MgY3VycmVudGx5IGlzIHRoZSBmb3JtIHN1Ym1pdHMgYW4gYWpheCByZXF1ZXN0IHRvIGl0c2VsZlxuICAgICAgLy8gdGhlbiBpdCBzdWJtaXRzIGEgcG9zdCByZXF1ZXN0IHRvIHRoZSBmb3JtJ3MgYWN0aW9uIHVybFxuICAgICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBhamF4X3VybCxcbiAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICBkYXRhOiAkKHN1cHBvcnRmb3JtKS5zZXJpYWxpemUoKSxcbiAgICAgICAgdHlwZTogJ1BPU1QnXG4gICAgICB9KVxuICAgICAgLmRvbmUoZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKHR5cGVvZiByZXNwb25zZS5lcnJvcnMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgdGhhdC5oYW5kbGVTZXJ2ZXJFcnJvcihyZXNwb25zZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3VwcG9ydGZvcm0uZ2V0KDApLnN1Ym1pdCgpOyAvLyBjb250aW51ZSBzdWJtaXR0aW5nIHRoZSBmb3JtIGlmIHRoZSBhamF4IHdhcyBzdWNjZXNzZnVsXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAuZXJyb3IoZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgdGhhdC5idXR0b25TdGF0dXModGhhdC5vcHRpb25zLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIGZhbHNlKTtcbiAgICAgIH0pO1xuICAgIH0sIC8vIHN1Ym1pdEZvcm1Pbmx5XG5cbiAgICBoYW5kbGVTZXJ2ZXJSZXNwb25zZTogZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgIHZhciBzdXBwb3J0Zm9ybSA9ICQodGhpcy5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKTtcbiAgICAgIGlmIChyZXNwb25zZS5lcnJvcnMpIHtcbiAgICAgICAgLy8gU2hvdyBlcnJvciBmcm9tIHNlcnZlciBvbiBwYXltZW50IGZvcm1cbiAgICAgICAgdGhpcy5oYW5kbGVTZXJ2ZXJFcnJvcihyZXNwb25zZSk7XG4gICAgICB9IGVsc2UgaWYgKHJlc3BvbnNlLnJlcXVpcmVzX2FjdGlvbikge1xuICAgICAgICAvLyBVc2UgU3RyaXBlLmpzIHRvIGhhbmRsZSByZXF1aXJlZCBjYXJkIGFjdGlvblxuICAgICAgICAvL2hhbmRsZUFjdGlvbihyZXNwb25zZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdXBwb3J0Zm9ybS5nZXQoMCkuc3VibWl0KCk7IC8vIGNvbnRpbnVlIHN1Ym1pdHRpbmcgdGhlIGZvcm0gaWYgdGhlIGFqYXggd2FzIHN1Y2Nlc3NmdWxcbiAgICAgIH1cbiAgICB9LCAvLyBoYW5kbGVTZXJ2ZXJSZXNwb25zZVxuXG4gICAgaGFuZGxlU2VydmVyRXJyb3I6IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB2YXIgdGhpc19maWVsZCA9ICcnO1xuICAgICAgLy8gZG8gbm90IHN1Ym1pdC4gdGhlcmUgaXMgYW4gZXJyb3IuXG4gICAgICB0aGF0LmJ1dHRvblN0YXR1cyh0aGF0Lm9wdGlvbnMsICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKSwgZmFsc2UpO1xuICAgICAgLy8gaGFuZGxlIGVycm9yIGRpc3BsYXlcbiAgICAgIGlmICh0eXBlb2YgcmVzcG9uc2UuZXJyb3JzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBpZiAodHlwZW9mIHJlc3BvbnNlLmVycm9yc1swXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICB0aGlzX2ZpZWxkID0gcmVzcG9uc2UuZXJyb3JzWzBdLmZpZWxkICsgJ19maWVsZF9zZWxlY3Rvcic7XG4gICAgICAgIH1cbiAgICAgICAgJC5lYWNoKHJlc3BvbnNlLmVycm9ycywgZnVuY3Rpb24oIGluZGV4LCBlcnJvciApIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGVycm9yLmZpZWxkICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdGhpc19maWVsZCA9IGVycm9yLmZpZWxkICsgJ19maWVsZF9zZWxlY3Rvcic7XG4gICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZXJyb3IucGFyYW0gIT09ICd1bmRlZmluZWQnICYmIGVycm9yLnBhcmFtICE9PSAnJykge1xuICAgICAgICAgICAgdGhpc19maWVsZCA9ICdjY18nICsgZXJyb3IucGFyYW0gKyAnX3NlbGVjdG9yJzsgIFxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGF0LmRpc3BsYXlFcnJvck1lc3NhZ2UoZXJyb3IsIHRoaXNfZmllbGQpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmICgkKHRoYXQub3B0aW9uc1t0aGlzX2ZpZWxkXSkubGVuZ3RoID4gMCkge1xuICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgc2Nyb2xsVG9wOiAkKHRoYXQub3B0aW9uc1t0aGlzX2ZpZWxkXSkucGFyZW50KCkub2Zmc2V0KCkudG9wXG4gICAgICAgIH0sIDIwMDApO1xuICAgICAgfVxuICAgIH0sIC8vIGhhbmRsZVNlcnZlckVycm9yXG5cbiAgICBkaXNwbGF5RXJyb3JNZXNzYWdlKGVycm9yLCBmaWVsZCkge1xuICAgICAgdmFyIG1lc3NhZ2UgPSAnJztcbiAgICAgIHZhciBzdHJpcGVFcnJvclNlbGVjdG9yID0gJyc7XG4gICAgICB2YXIgZmllbGRQYXJlbnQgPSAkKHRoaXMub3B0aW9uc1tmaWVsZF0pLnBhcmVudCgpO1xuICAgICAgaWYgKHR5cGVvZiBlcnJvci5tZXNzYWdlID09PSAnc3RyaW5nJykge1xuICAgICAgICBtZXNzYWdlID0gZXJyb3IubWVzc2FnZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlWzBdO1xuICAgICAgfVxuICAgICAgaWYgKCQodGhpcy5vcHRpb25zW2ZpZWxkXSkubGVuZ3RoID4gMCkge1xuICAgICAgICAkKHRoaXMub3B0aW9uc1tmaWVsZF0pLmFkZENsYXNzKCdhLWVycm9yJyk7XG4gICAgICAgICQodGhpcy5vcHRpb25zW2ZpZWxkXSkucHJldigpLmFkZENsYXNzKCdhLWVycm9yJyk7XG4gICAgICAgIGlmICgkKCcuYS1jYXJkLWluc3RydWN0aW9uJywgZmllbGRQYXJlbnQpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAkKCcuYS1jYXJkLWluc3RydWN0aW9uJywgZmllbGRQYXJlbnQpLmFkZENsYXNzKCdhLXZhbGlkYXRpb24tZXJyb3InKTtcbiAgICAgICAgICAkKCcuYS1jYXJkLWluc3RydWN0aW9uJywgZmllbGRQYXJlbnQpLnRleHQobWVzc2FnZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJCh0aGlzLm9wdGlvbnNbZmllbGRdKS5hZnRlcignPHAgY2xhc3M9XCJhLWNhcmQtaW5zdHJ1Y3Rpb24gYS12YWxpZGF0aW9uLWVycm9yXCI+JyArIG1lc3NhZ2UgKyAnPC9wPicpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBlcnJvciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhpcy5idXR0b25TdGF0dXModGhpcy5vcHRpb25zLCAkKHRoaXMub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIGZhbHNlKTtcbiAgICAgICAgaWYgKGVycm9yLmNvZGUgPT09ICdpbmNvbXBsZXRlX251bWJlcicgfHwgZXJyb3IuY29kZSA9PSAnaW52YWxpZF9udW1iZXInIHx8IGVycm9yLmNvZGUgPT0gJ2luY29ycmVjdF9udW1iZXInIHx8IGVycm9yLmNvZGUgPT0gJ2NhcmRfZGVjbGluZWQnIHx8IGVycm9yLmNvZGUgPT0gJ3Byb2Nlc3NpbmdfZXJyb3InKSB7XG4gICAgICAgICAgLy8gZXJyb3IgaGFuZGxpbmdcbiAgICAgICAgICBzdHJpcGVFcnJvclNlbGVjdG9yID0gJCh0aGlzLm9wdGlvbnMuY2NfbnVtX3NlbGVjdG9yKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXJyb3IuY29kZSA9PSAnaW52YWxpZF9leHBpcnlfbW9udGgnIHx8IGVycm9yLmNvZGUgPT0gJ2ludmFsaWRfZXhwaXJ5X3llYXInIHx8IGVycm9yLmNvZGUgPT0gJ2V4cGlyZWRfY2FyZCcpIHtcbiAgICAgICAgICAvLyBlcnJvciBoYW5kbGluZ1xuICAgICAgICAgIHN0cmlwZUVycm9yU2VsZWN0b3IgPSAkKHRoaXMub3B0aW9ucy5jY19leHBfc2VsZWN0b3IpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJvci5jb2RlID09ICdpbnZhbGlkX2N2YycgfHwgZXJyb3IuY29kZSA9PSAnaW5jb3JyZWN0X2N2YycpIHtcbiAgICAgICAgICAvLyBlcnJvciBoYW5kbGluZ1xuICAgICAgICAgIHN0cmlwZUVycm9yU2VsZWN0b3IgPSAkKHRoaXMub3B0aW9ucy5jY19jdmNfc2VsZWN0b3IpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdHJpcGVFcnJvclNlbGVjdG9yICE9PSAnJykge1xuICAgICAgICAgIHRoaXMuc3RyaXBlRXJyb3JEaXNwbGF5KGVycm9yLCBzdHJpcGVFcnJvclNlbGVjdG9yLCB0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJvci5maWVsZCA9PSAncmVjYXB0Y2hhJykge1xuICAgICAgICAgICQodGhpcy5vcHRpb25zLnBheV9idXR0b25fc2VsZWN0b3IpLmJlZm9yZSgnPHAgY2xhc3M9XCJhLWZvcm0tY2FwdGlvbiBhLXZhbGlkYXRpb24tZXJyb3IgYS1yZWNhcHRjaGEtZXJyb3JcIj4nICsgbWVzc2FnZSArICc8L3A+JylcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXJyb3IudHlwZSA9PSAnaW52YWxpZF9yZXF1ZXN0X2Vycm9yJykge1xuICAgICAgICAgICQodGhpcy5vcHRpb25zLnBheV9idXR0b25fc2VsZWN0b3IpLmJlZm9yZSgnPHAgY2xhc3M9XCJhLWZvcm0tY2FwdGlvbiBhLXZhbGlkYXRpb24tZXJyb3JcIj4nICsgZXJyb3IubWVzc2FnZSArICc8L3A+JylcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIC8vIGRpc3BsYXlFcnJvck1lc3NhZ2VcblxuICAgIHNob3dOZXdzbGV0dGVyU2V0dGluZ3M6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcblxuICAgICAgdmFyIG5ld3NsZXR0ZXJfZ3JvdXBfaHRtbCA9ICcnO1xuICAgICAgaWYgKCQob3B0aW9ucy5uZXdzbGV0dGVyX2dyb3VwX3NlbGVjdG9yKS5sZW5ndGggPiAwICkge1xuICAgICAgICB2YXIgZ2V0X2RhdGEgPSB7XG4gICAgICAgICAgc2hvcnRjb2RlOiAnbmV3c2xldHRlcl9mb3JtJyxcbiAgICAgICAgICBwbGFjZW1lbnQ6ICd1c2VyYWNjb3VudCdcbiAgICAgICAgfTtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgIHVybDogb3B0aW9ucy5taW5ucG9zdF9yb290ICsgJy93cC1qc29uL21pbm5wb3N0LWFwaS92Mi9tYWlsY2hpbXAvZm9ybScsXG4gICAgICAgICAgZGF0YTogZ2V0X2RhdGFcbiAgICAgICAgfSkuZG9uZShmdW5jdGlvbiggcmVzdWx0ICkge1xuICAgICAgICAgIGlmICggdHlwZW9mIHJlc3VsdC5ncm91cF9maWVsZHMgIT09ICd1bmRlZmluZWQnICkge1xuICAgICAgICAgICAgJC5lYWNoKHJlc3VsdC5ncm91cF9maWVsZHMsIGZ1bmN0aW9uKCBpbmRleCwgY2F0ZWdvcnkgKSB7XG4gICAgICAgICAgICAgIG5ld3NsZXR0ZXJfZ3JvdXBfaHRtbCArPSAnPGZpZWxkc2V0IGNsYXNzPVwibS1mb3JtLWl0ZW0gc3VwcG9ydC1uZXdzbGV0dGVyIG0tZm9ybS1pdGVtLScgKyBjYXRlZ29yeS50eXBlICsgJ1wiPic7XG4gICAgICAgICAgICAgIG5ld3NsZXR0ZXJfZ3JvdXBfaHRtbCArPSAnPGxhYmVsPicgKyBjYXRlZ29yeS5uYW1lICsgJzo8L2xhYmVsPic7XG4gICAgICAgICAgICAgIGlmICggY2F0ZWdvcnkuY29udGFpbnMubGVuZ3RoID4gMCApIHtcbiAgICAgICAgICAgICAgICBuZXdzbGV0dGVyX2dyb3VwX2h0bWwgKz0gJzxkaXYgY2xhc3M9XCJtLWZvcm0taXRlbSBtLWZvcm0taXRlbS1uZXdzbGV0dGVyXCI+JztcbiAgICAgICAgICAgICAgICAkLmVhY2goY2F0ZWdvcnlbY2F0ZWdvcnkuY29udGFpbnNdLCBmdW5jdGlvbiggaW5kZXgsIGl0ZW0gKSB7XG4gICAgICAgICAgICAgICAgICBuZXdzbGV0dGVyX2dyb3VwX2h0bWwgKz0gJzxsYWJlbD48aW5wdXQgbmFtZT1cImdyb3Vwc19zdWJtaXR0ZWRcIiB0eXBlPVwiY2hlY2tib3hcIiB2YWx1ZT1cIicgKyBpdGVtLmlkICsgJ1wiPicgKyBpdGVtLm5hbWUgKyAnPC9sYWJlbD4nO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIG5ld3NsZXR0ZXJfZ3JvdXBfaHRtbCArPSAnPC9kaXY+JztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBuZXdzbGV0dGVyX2dyb3VwX2h0bWwgKz0gJzwvZmllbGRzZXQ+JztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJChvcHRpb25zLm5ld3NsZXR0ZXJfZ3JvdXBfc2VsZWN0b3IpLmh0bWwobmV3c2xldHRlcl9ncm91cF9odG1sKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoJChvcHRpb25zLm5ld3NsZXR0ZXJfZ3JvdXBfc2VsZWN0b3IpLmxlbmd0aCA+IDAgJiYgdHlwZW9mICQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHZhciBnZXRfZGF0YSA9IHtcbiAgICAgICAgICBlbWFpbDogJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKVxuICAgICAgICB9O1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgdXJsOiBvcHRpb25zLm1pbm5wb3N0X3Jvb3QgKyAnL3dwLWpzb24vbWlubnBvc3QtYXBpL3YyL21haWxjaGltcC91c2VyJyxcbiAgICAgICAgICBkYXRhOiBnZXRfZGF0YVxuICAgICAgICB9KS5kb25lKGZ1bmN0aW9uKCByZXN1bHQgKSB7XG4gICAgICAgICAgaWYgKCB0eXBlb2YgcmVzdWx0Lm1haWxjaGltcF9zdGF0dXMgIT09ICd1bmRlZmluZWQnICkge1xuICAgICAgICAgICAgJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5hZnRlcignPGlucHV0IG5hbWU9XCJtYWlsY2hpbXBfc3RhdHVzXCIgdHlwZT1cImhpZGRlblwiIHZhbHVlPVwiJyArIHJlc3VsdC5tYWlsY2hpbXBfc3RhdHVzICsgJ1wiPicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIHR5cGVvZiByZXN1bHQubWFpbGNoaW1wX3VzZXJfaWQgIT09ICd1bmRlZmluZWQnICkge1xuICAgICAgICAgICAgJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5hZnRlcignPGlucHV0IG5hbWU9XCJtYWlsY2hpbXBfdXNlcl9pZFwiIHR5cGU9XCJoaWRkZW5cIiB2YWx1ZT1cIicgKyByZXN1bHQubWFpbGNoaW1wX3VzZXJfaWQgKyAnXCI+Jyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChyZXN1bHQubWFpbGNoaW1wX3N0YXR1cyA9PT0gJ3N1YnNjcmliZWQnKSB7XG4gICAgICAgICAgICAvLyB1c2VyIGNyZWF0ZWQgLSBzaG93IGEgc3VjY2VzcyBtZXNzYWdlXG4gICAgICAgICAgICAkKCcuYS1jb25maXJtLWluc3RydWN0aW9ucycpLnRleHQoJCgnLmEtY29uZmlybS1pbnN0cnVjdGlvbnMnKS5hdHRyKCdkYXRhLWtub3duLXVzZXInKSk7XG4gICAgICAgICAgICB2YXIgZ3JvdXBzID0gcmVzdWx0Lmdyb3VwcztcbiAgICAgICAgICAgICQuZWFjaChncm91cHMsIGZ1bmN0aW9uKCBpbmRleCwgdmFsdWUgKSB7XG4gICAgICAgICAgICAgIGlmICggdmFsdWUgPT09IHRydWUgKSB7XG4gICAgICAgICAgICAgICAgJCgnOmNoZWNrYm94W3ZhbHVlPVwiJyArIGluZGV4ICsgJ1wiXScpLnByb3AoJ2NoZWNrZWQnLHRydWUpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQoJzpjaGVja2JveFt2YWx1ZT1cIicgKyBpbmRleCArICdcIl0nKS5wcm9wKCdjaGVja2VkJyxmYWxzZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICB9LCAvLyBzaG93TmV3c2xldHRlclNldHRpbmdzXG5cbiAgICBjb25maXJtTWVzc2FnZVN1Ym1pdDogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuXG4gICAgICB2YXIgZXhpc3RpbmdfbmV3c2xldHRlcl9zZXR0aW5ncyA9ICQob3B0aW9ucy5uZXdzbGV0dGVyX2dyb3VwX3NlbGVjdG9yICsgJyBpbnB1dCcpLnNlcmlhbGl6ZSgpO1xuICAgICAgLy90aGlzLmRlYnVnKGV4aXN0aW5nX25ld3NsZXR0ZXJfc2V0dGluZ3MpO1xuXG4gICAgICAkKG9wdGlvbnMuY29uZmlybV9mb3JtX3NlbGVjdG9yKS5zdWJtaXQoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB2YXIgY29uZmlybWZvcm0gPSAkKG9wdGlvbnMuY29uZmlybV9mb3JtX3NlbGVjdG9yKTtcbiAgICAgICAgLy8gc3VibWl0IHNldHRpbmdzIHRvIG1haWxjaGltcFxuICAgICAgICAvLyBuZWVkIHRvIGdldCB1c2VyIGluZm8gb24gYSBoaWRkZW4gZmllbGQgaGVyZVxuXG4gICAgICAgIHZhciBuZXdzbGV0dGVyX2dyb3VwcyA9ICQob3B0aW9ucy5uZXdzbGV0dGVyX2dyb3VwX3NlbGVjdG9yICsgJyBpbnB1dDpjaGVja2VkJyk7XG4gICAgICAgIHZhciBuZXdfbmV3c2xldHRlcl9zZXR0aW5ncyA9IG5ld3NsZXR0ZXJfZ3JvdXBzLnNlcmlhbGl6ZSgpO1xuXG4gICAgICAgIGlmICgoZXhpc3RpbmdfbmV3c2xldHRlcl9zZXR0aW5ncyAhPT0gbmV3X25ld3NsZXR0ZXJfc2V0dGluZ3MpICYmICh0eXBlb2YgbmV3c2xldHRlcl9ncm91cHMgIT09ICd1bmRlZmluZWQnKSkge1xuICAgICAgICAgIC8vYWRkIG91ciBvd24gYWpheCBjaGVjayBhcyBYLVJlcXVlc3RlZC1XaXRoIGlzIG5vdCBhbHdheXMgcmVsaWFibGVcbiAgICAgICAgICAvL2FqYXhfZm9ybV9kYXRhID0gbmV3X25ld3NsZXR0ZXJfc2V0dGluZ3MgKyAnJmFqYXhyZXF1ZXN0PXRydWUmc3Vic2NyaWJlJztcblxuICAgICAgICAgIHZhciBwb3N0X2RhdGEgPSB7XG4gICAgICAgICAgICBlbWFpbDogJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICAgIGZpcnN0X25hbWU6ICQob3B0aW9ucy5maXJzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICAgIGxhc3RfbmFtZTogJChvcHRpb25zLmxhc3RfbmFtZV9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgICBncm91cHNfc3VibWl0dGVkOiB7fVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICBwb3N0X2RhdGEuZ3JvdXBzX2F2YWlsYWJsZSA9ICdhbGwnO1xuXG4gICAgICAgICAgaWYgKCAkKCdpbnB1dFtuYW1lPVwibWFpbGNoaW1wX3N0YXR1c1wiXScpLmxlbmd0aCA+IDAgKSB7XG4gICAgICAgICAgICBwb3N0X2RhdGEubWFpbGNoaW1wX3N0YXR1cyA9ICQoJ2lucHV0W25hbWU9XCJtYWlsY2hpbXBfc3RhdHVzXCJdJykudmFsKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCAkKCdpbnB1dFtuYW1lPVwibWFpbGNoaW1wX3VzZXJfaWRcIl0nKS5sZW5ndGggPiAwICkge1xuICAgICAgICAgICAgcG9zdF9kYXRhLm1haWxjaGltcF91c2VyX2lkID0gJCgnaW5wdXRbbmFtZT1cIm1haWxjaGltcF91c2VyX2lkXCJdJykudmFsKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHR5cGVvZiBuZXdzbGV0dGVyX2dyb3VwcyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICQuZWFjaChuZXdzbGV0dGVyX2dyb3VwcywgZnVuY3Rpb24oaW5kZXgsIHZhbHVlKSB7XG4gICAgICAgICAgICAgIHZhciBncm91cCA9ICQodGhpcykudmFsKCk7XG4gICAgICAgICAgICAgIHBvc3RfZGF0YS5ncm91cHNfc3VibWl0dGVkW2luZGV4XSA9IGdyb3VwO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogb3B0aW9ucy5taW5ucG9zdF9yb290ICsgJy93cC1qc29uL21pbm5wb3N0LWFwaS92Mi9tYWlsY2hpbXAvdXNlcicsXG4gICAgICAgICAgICB0eXBlOiAncG9zdCcsXG4gICAgICAgICAgICBkYXRhVHlwZSA6ICdqc29uJyxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShwb3N0X2RhdGEpXG4gICAgICAgICAgfSlcbiAgICAgICAgICAuZG9uZShmdW5jdGlvbihyZXNwb25zZSkgeyAvLyByZXNwb25zZSBmcm9tIHRoZSBQSFAgYWN0aW9uXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9ICcnO1xuICAgICAgICAgICAgaWYgKCByZXNwb25zZS5zdWNjZXNzID09PSB0cnVlICkge1xuICAgICAgICAgICAgICAvKnN3aXRjaCAocmVzcG9uc2UuZGF0YS51c2VyX3N0YXR1cykge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2V4aXN0aW5nJzpcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnVGhhbmtzIGZvciB1cGRhdGluZyB5b3VyIGVtYWlsIHByZWZlcmVuY2VzLiBUaGV5IHdpbGwgZ28gaW50byBlZmZlY3QgaW1tZWRpYXRlbHkuJztcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ25ldyc6XG4gICAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ1dlIGhhdmUgYWRkZWQgeW91IHRvIHRoZSBNaW5uUG9zdCBtYWlsaW5nIGxpc3QuJztcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3BlbmRpbmcnOlxuICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9ICdXZSBoYXZlIGFkZGVkIHlvdSB0byB0aGUgTWlublBvc3QgbWFpbGluZyBsaXN0LiBZb3Ugd2lsbCBuZWVkIHRvIGNsaWNrIHRoZSBjb25maXJtYXRpb24gbGluayBpbiB0aGUgZW1haWwgd2Ugc2VudCB0byBiZWdpbiByZWNlaXZpbmcgbWVzc2FnZXMuJztcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9Ki9cbiAgICAgICAgICAgICAgLy9jb25maXJtZm9ybS5nZXQoMCkuc3VibWl0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25maXJtZm9ybS5nZXQoMCkuc3VibWl0KCk7XG4gICAgICAgICAgICAvLyQoJy5tLWhvbGQtbWVzc2FnZScpLmh0bWwoJzxkaXYgY2xhc3M9XCJtLWZvcm0tbWVzc2FnZSBtLWZvcm0tbWVzc2FnZS1pbmZvXCI+JyArIG1lc3NhZ2UgKyAnPC9kaXY+Jyk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuZmFpbChmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgLy8gd2Ugc2hvdWxkIHB1dCBhbiBhY3R1YWwgZXJyb3IgbWVzc2FnZSBoZXJlIHNvbWVkYXksIHByb2JhYmx5XG4gICAgICAgICAgICAvLyQoJy5tLWhvbGQtbWVzc2FnZScpLmh0bWwoJzxkaXYgY2xhc3M9XCJtLWZvcm0tbWVzc2FnZSBtLWZvcm0tbWVzc2FnZS1pbmZvXCI+QW4gZXJyb3IgaGFzIG9jY3VyZWQuIFBsZWFzZSB0cnkgYWdhaW4uPC9kaXY+Jyk7XG4gICAgICAgICAgICBjb25maXJtZm9ybS5nZXQoMCkuc3VibWl0KCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgfSBlbHNlIHsgLy8gZW5kIHBhcnQgd2hlcmUgc2V0dGluZ3MgY2hhbmdlZFxuICAgICAgICAgIGNvbmZpcm1mb3JtLmdldCgwKS5zdWJtaXQoKTtcbiAgICAgICAgfVxuXG4gICAgICB9KTtcbiAgICAgIC8vcmV0dXJuIGZhbHNlO1xuICAgIH0sIC8vIGNvbmZpcm1NZXNzYWdlU3VibWl0XG5cbiAgfTsgLy8gcGx1Z2luLnByb3RvdHlwZVxuXG4gIC8vIEEgcmVhbGx5IGxpZ2h0d2VpZ2h0IHBsdWdpbiB3cmFwcGVyIGFyb3VuZCB0aGUgY29uc3RydWN0b3IsXG4gIC8vIHByZXZlbnRpbmcgYWdhaW5zdCBtdWx0aXBsZSBpbnN0YW50aWF0aW9uc1xuICAkLmZuW3BsdWdpbk5hbWVdID0gZnVuY3Rpb24gKCBvcHRpb25zICkge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKCEkLmRhdGEodGhpcywgJ3BsdWdpbl8nICsgcGx1Z2luTmFtZSkpIHtcbiAgICAgICAgJC5kYXRhKHRoaXMsICdwbHVnaW5fJyArIHBsdWdpbk5hbWUsIG5ldyBQbHVnaW4oIHRoaXMsIG9wdGlvbnMgKSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbn0pKCBqUXVlcnksIHdpbmRvdywgZG9jdW1lbnQgKTsiXX0=
}(jQuery));
