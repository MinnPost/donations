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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0cmlwZS5wYXltZW50LmpzIiwidGxpdGUubWluLmpzIiwidmFsaWQtZm9ybS5taW4uanMiLCJtaW5ucG9zdC5naXZpbmcuanMiXSwibmFtZXMiOlsiZiIsImV4cG9ydHMiLCJtb2R1bGUiLCJkZWZpbmUiLCJhbWQiLCJnIiwid2luZG93IiwiZ2xvYmFsIiwic2VsZiIsInBheW1lbnQiLCJqcyIsImUiLCJ0IiwibiIsInIiLCJzIiwibyIsInUiLCJhIiwicmVxdWlyZSIsImkiLCJFcnJvciIsImNvZGUiLCJsIiwiY2FsbCIsImxlbmd0aCIsIlFKIiwicnJldHVybiIsInJ0cmltIiwic2VsZWN0b3IiLCJpc0RPTUVsZW1lbnQiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJlbCIsIm5vZGVOYW1lIiwidHJpbSIsInRleHQiLCJyZXBsYWNlIiwidmFsIiwicmV0IiwiYXJndW1lbnRzIiwidmFsdWUiLCJwcmV2ZW50RGVmYXVsdCIsImV2ZW50T2JqZWN0IiwicmV0dXJuVmFsdWUiLCJub3JtYWxpemVFdmVudCIsIm9yaWdpbmFsIiwid2hpY2giLCJ0YXJnZXQiLCJzcmNFbGVtZW50Iiwib3JpZ2luYWxFdmVudCIsImRhdGEiLCJkZXRhaWwiLCJjaGFyQ29kZSIsImtleUNvZGUiLCJvbiIsImVsZW1lbnQiLCJldmVudE5hbWUiLCJjYWxsYmFjayIsImoiLCJsZW4iLCJsZW4xIiwibXVsdEV2ZW50TmFtZSIsIm9yaWdpbmFsQ2FsbGJhY2siLCJyZWYiLCJtYXRjaCIsInNwbGl0IiwiYWRkRXZlbnRMaXN0ZW5lciIsImF0dGFjaEV2ZW50IiwiYWRkQ2xhc3MiLCJjbGFzc05hbWUiLCJyZXN1bHRzIiwicHVzaCIsImNsYXNzTGlzdCIsImFkZCIsImhhc0NsYXNzIiwiY29udGFpbnMiLCJSZWdFeHAiLCJ0ZXN0IiwicmVtb3ZlQ2xhc3MiLCJjbHMiLCJyZW1vdmUiLCJqb2luIiwidG9nZ2xlQ2xhc3MiLCJib29sIiwiYXBwZW5kIiwidG9BcHBlbmQiLCJpbnNlcnRBZGphY2VudEhUTUwiLCJmaW5kIiwiTm9kZUxpc3QiLCJBcnJheSIsInRyaWdnZXIiLCJuYW1lIiwiZXJyb3IiLCJldiIsIkN1c3RvbUV2ZW50IiwiY3JlYXRlRXZlbnQiLCJpbml0Q3VzdG9tRXZlbnQiLCJpbml0RXZlbnQiLCJkaXNwYXRjaEV2ZW50IiwiUGF5bWVudCIsImNhcmRGcm9tTnVtYmVyIiwiY2FyZEZyb21UeXBlIiwiY2FyZHMiLCJkZWZhdWx0Rm9ybWF0IiwiZm9ybWF0QmFja0NhcmROdW1iZXIiLCJmb3JtYXRCYWNrRXhwaXJ5IiwiZm9ybWF0Q2FyZE51bWJlciIsImZvcm1hdEV4cGlyeSIsImZvcm1hdEZvcndhcmRFeHBpcnkiLCJmb3JtYXRGb3J3YXJkU2xhc2giLCJmb3JtYXRNb250aEV4cGlyeSIsImhhc1RleHRTZWxlY3RlZCIsImx1aG5DaGVjayIsInJlRm9ybWF0Q2FyZE51bWJlciIsInJlc3RyaWN0Q1ZDIiwicmVzdHJpY3RDYXJkTnVtYmVyIiwicmVzdHJpY3RDb21iaW5lZEV4cGlyeSIsInJlc3RyaWN0RXhwaXJ5IiwicmVzdHJpY3RNb250aEV4cGlyeSIsInJlc3RyaWN0TnVtZXJpYyIsInJlc3RyaWN0WWVhckV4cGlyeSIsInNldENhcmRUeXBlIiwiaW5kZXhPZiIsIml0ZW0iLCJ0eXBlIiwicGF0dGVybiIsImZvcm1hdCIsImN2Y0xlbmd0aCIsImx1aG4iLCJudW0iLCJjYXJkIiwiZGlnaXQiLCJkaWdpdHMiLCJvZGQiLCJzdW0iLCJyZXZlcnNlIiwicGFyc2VJbnQiLCJzZWxlY3Rpb25TdGFydCIsInNlbGVjdGlvbkVuZCIsInNlbGVjdGlvbiIsImNyZWF0ZVJhbmdlIiwic2V0VGltZW91dCIsIl90aGlzIiwiZm5zIiwicmUiLCJ1cHBlckxlbmd0aCIsIlN0cmluZyIsImZyb21DaGFyQ29kZSIsIm1ldGEiLCJzbGFzaCIsIm1ldGFLZXkiLCJpbnB1dCIsImN0cmxLZXkiLCJhbGxUeXBlcyIsImNhcmRUeXBlIiwiY2FyZEV4cGlyeVZhbCIsIm1vbnRoIiwicHJlZml4IiwieWVhciIsIkRhdGUiLCJnZXRGdWxsWWVhciIsInRvU3RyaW5nIiwic2xpY2UiLCJ2YWxpZGF0ZUNhcmROdW1iZXIiLCJ2YWxpZGF0ZUNhcmRFeHBpcnkiLCJjdXJyZW50VGltZSIsImV4cGlyeSIsInNldE1vbnRoIiwiZ2V0TW9udGgiLCJ2YWxpZGF0ZUNhcmRDVkMiLCJjdmMiLCJyZWYxIiwiZ3JvdXBzIiwiZXhlYyIsInNoaWZ0IiwiZm9ybWF0Q2FyZENWQyIsImZvcm1hdENhcmRFeHBpcnkiLCJmb3JtYXRDYXJkRXhwaXJ5TXVsdGlwbGUiLCJnZXRDYXJkQXJyYXkiLCJzZXRDYXJkQXJyYXkiLCJjYXJkQXJyYXkiLCJhZGRUb0NhcmRBcnJheSIsImNhcmRPYmplY3QiLCJyZW1vdmVGcm9tQ2FyZEFycmF5Iiwia2V5Iiwic3BsaWNlIiwidGxpdGUiLCJwYXJlbnRFbGVtZW50Iiwic2hvdyIsInRvb2x0aXAiLCJoaWRlIiwib2Zmc2V0VG9wIiwib2Zmc2V0TGVmdCIsIm9mZnNldFBhcmVudCIsIm9mZnNldFdpZHRoIiwib2Zmc2V0SGVpZ2h0IiwiZCIsInN0eWxlIiwidG9wIiwibGVmdCIsImNyZWF0ZUVsZW1lbnQiLCJncmF2IiwiZ2V0QXR0cmlidXRlIiwiaW5uZXJIVE1MIiwiYXBwZW5kQ2hpbGQiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJib3R0b20iLCJpbm5lckhlaWdodCIsInJpZ2h0IiwiaW5uZXJXaWR0aCIsInRpdGxlIiwic2V0QXR0cmlidXRlIiwiY2xlYXJUaW1lb3V0IiwicGFyZW50Tm9kZSIsInJlbW92ZUNoaWxkIiwiYyIsInAiLCJfdmFsaWRGb3JtIiwiX3ZhbGlkRm9ybTIiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0Iiwib2JqIiwiX19lc01vZHVsZSIsImRlZmF1bHQiLCJWYWxpZEZvcm0iLCJ0b2dnbGVJbnZhbGlkQ2xhc3MiLCJoYW5kbGVDdXN0b21NZXNzYWdlcyIsImhhbmRsZUN1c3RvbU1lc3NhZ2VEaXNwbGF5IiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJjbG9uZSIsImRlZmF1bHRzIiwiaW5zZXJ0QWZ0ZXIiLCJpbnNlcnRCZWZvcmUiLCJmb3JFYWNoIiwiZGVib3VuY2UiLCJjb3B5IiwiYXR0ciIsImhhc093blByb3BlcnR5IiwiZGVmYXVsdE9iamVjdCIsImsiLCJ1bmRlZmluZWQiLCJyZWZOb2RlIiwibm9kZVRvSW5zZXJ0Iiwic2libGluZyIsIm5leHRTaWJsaW5nIiwiX3BhcmVudCIsInBhcmVudCIsIml0ZW1zIiwiZm4iLCJtcyIsInRpbWVvdXQiLCJkZWJvdW5jZWRGbiIsInZhbGlkRm9ybSIsIl91dGlsIiwiaW52YWxpZENsYXNzIiwidmFsaWRpdHkiLCJ2YWxpZCIsImVycm9yUHJvcHMiLCJnZXRDdXN0b21NZXNzYWdlIiwiY3VzdG9tTWVzc2FnZXMiLCJsb2NhbEVycm9yUHJvcHMiLCJjb25jYXQiLCJwcm9wIiwiY2hlY2tWYWxpZGl0eSIsIm1lc3NhZ2UiLCJzZXRDdXN0b21WYWxpZGl0eSIsIm9wdGlvbnMiLCJ2YWxpZGF0aW9uRXJyb3JDbGFzcyIsInZhbGlkYXRpb25FcnJvclBhcmVudENsYXNzIiwiZXJyb3JQbGFjZW1lbnQiLCJpbnNlcnRFcnJvciIsImVycm9yTm9kZSIsInF1ZXJ5U2VsZWN0b3IiLCJ2YWxpZGF0aW9uTWVzc2FnZSIsInRleHRDb250ZW50IiwiZGVmYXVsdE9wdGlvbnMiLCJpbnB1dHMiLCJ0b0xvd2VyQ2FzZSIsImZvY3VzSW52YWxpZElucHV0IiwidmFsaWRGb3JtSW5wdXRzIiwiZm9ybSIsImZvY3VzRmlyc3QiLCJpbnZhbGlkTm9kZSIsImZvY3VzIiwiJCIsInBsdWdpbk5hbWUiLCJQbHVnaW4iLCJleHRlbmQiLCJfZGVmYXVsdHMiLCJfbmFtZSIsImluaXQiLCJwcm90b3R5cGUiLCJyZXNldCIsImFtb3VudCIsImRvY3VtZW50RWxlbWVudCIsInBhcnNlRmxvYXQiLCJsZXZlbF9hbW91bnRfc2VsZWN0b3IiLCJvcmlnaW5hbF9hbW91bnQiLCJvcmlnaW5hbF9hbW91bnRfc2VsZWN0b3IiLCJwcm9jZXNzaW5nX2ZlZSIsIk1hdGgiLCJyb3VuZCIsImZlZV9hbW91bnQiLCJwb3ciLCJ0b0ZpeGVkIiwicHJvY2Vzc2luZ19mZWVfdGV4dCIsImNyZWF0ZV9hY2NvdW50IiwiYnV0dG9uX3RleHQiLCJwYXlfYnV0dG9uX3NlbGVjdG9yIiwic3RyaXBlIiwiU3RyaXBlIiwic3RyaXBlX3B1Ymxpc2hhYmxlX2tleSIsImVsZW1lbnRzIiwiZm9udHMiLCJjc3NTcmMiLCJyZWZlcnJlciIsImRlYnVnIiwiYW5hbHl0aWNzVHJhY2tpbmciLCJhbW91bnRBc1JhZGlvIiwiYW1vdW50VXBkYXRlZCIsInBheV9jY19wcm9jZXNzaW5nX3NlbGVjdG9yIiwiY3JlZGl0Q2FyZFByb2Nlc3NpbmdGZWVzIiwiZG9uYXRlX2Zvcm1fc2VsZWN0b3IiLCJkb25hdGVBbm9ueW1vdXNseSIsImhvbm9yT3JNZW1vcnlUb2dnbGUiLCJvdXRzaWRlVW5pdGVkU3RhdGVzIiwic2hpcHBpbmdBZGRyZXNzIiwiYWxsb3dNaW5ucG9zdEFjY291bnQiLCJwYXltZW50UmVxdWVzdEJ1dHRvbiIsImNob29zZVBheW1lbnRNZXRob2QiLCJjcmVkaXRDYXJkRmllbGRzIiwidmFsaWRhdGVTZXR1cCIsImZvcm1TZXR1cCIsImNvbmZpcm1fZm9ybV9zZWxlY3RvciIsInNob3dOZXdzbGV0dGVyU2V0dGluZ3MiLCJjb25maXJtTWVzc2FnZVN1Ym1pdCIsImNvbnNvbGUiLCJsb2ciLCJkaXIiLCJwcm9ncmVzcyIsInByb2dyZXNzX3NlbGVjdG9yIiwic3RlcCIsIm5hdl9pdGVtX2NvdW50Iiwib3BwX2lkIiwib3BwX2lkX3NlbGVjdG9yIiwicG9zdF9wdXJjaGFzZSIsImluZGV4IiwiZmluaXNoX3NlY3Rpb25fc2VsZWN0b3IiLCJhbmFseXRpY3NUcmFja2luZ1N0ZXAiLCJpbnN0YWxsbWVudF9wZXJpb2QiLCJsZXZlbCIsInRoYXQiLCJpbnN0YWxsbWVudF9wZXJpb2Rfc2VsZWN0b3IiLCJhamF4IiwibWV0aG9kIiwidXJsIiwiZG9uZSIsImNoYXJBdCIsInRvVXBwZXJDYXNlIiwiZ2EiLCJwYWdlIiwibG9jYXRpb24iLCJwYXRobmFtZSIsInNldFJhZGlvQW1vdW50IiwiY2hhbmdlIiwiZmllbGQiLCJzdHJpcGVfcGF5bWVudF90eXBlIiwiZ2V0U3RyaXBlUGF5bWVudFR5cGUiLCJpcyIsImNhbGN1bGF0ZUZlZXMiLCJzZXRGYWlyTWFya2V0VmFsdWUiLCJhbW91bnRfc2VsZWN0b3JfZmFpcl9tYXJrZXQiLCJhZGRpdGlvbmFsX2Ftb3VudF9maWVsZCIsImdldFRvdGFsQW1vdW50IiwidG90YWxfYW1vdW50IiwiYWRkaXRpb25hbF9hbW91bnQiLCJhbW91bnRfc2VsZWN0b3IiLCJmYWlyX21hcmtldF92YWx1ZV9zZWxlY3RvciIsImZhaXJNYXJrZXRWYWx1ZSIsInNldFN0cmlwZVBheW1lbnRUeXBlIiwiZmVlcyIsImNyZWRpdENhcmRGZWVDaGVja2JveCIsImZ1bGxfYW1vdW50IiwiZnVsbF9hbW91bnRfc2VsZWN0b3IiLCJwYXltZW50UmVxdWVzdCIsInVwZGF0ZSIsInRvdGFsIiwibGFiZWwiLCJ0b2dnbGVBbm9ueW1vdXMiLCJhbm9ueW1vdXNfc2VsZWN0b3IiLCJuYW1lX3NlbGVjdG9yIiwiaG9ub3JPck1lbW9yeSIsImhvbm9yX29yX21lbW9yeV9jaG9vc2VyIiwiaG9ub3JfbWVtb3J5X2lucHV0X2dyb3VwIiwiaG9ub3JfdHlwZV9zZWxlY3RvciIsImhvbm9yX25hbWVfc2VsZWN0b3IiLCJzaG93X2JpbGxpbmdfY291bnRyeV9zZWxlY3RvciIsImNsaWNrIiwiY2hhbmdlRmllbGRzT3V0c2lkZVVTIiwic2hvd19zaGlwcGluZ19jb3VudHJ5X3NlbGVjdG9yIiwic2hpcHBpbmdfY291bnRyeV9zZWxlY3RvciIsImJpbGxpbmdfb3Jfc2hpcHBpbmciLCJ6aXBfcGFyZW50IiwiYmlsbGluZ196aXBfZmllbGRfc2VsZWN0b3IiLCJzdGF0ZV9wYXJlbnQiLCJiaWxsaW5nX3N0YXRlX2ZpZWxkX3NlbGVjdG9yIiwiYmlsbGluZ19jb3VudHJ5X3NlbGVjdG9yIiwic2hpcHBpbmdfemlwX2ZpZWxkX3NlbGVjdG9yIiwic2hpcHBpbmdfc3RhdGVfZmllbGRfc2VsZWN0b3IiLCJjaGFuZ2VGaWVsZHNJbnNpZGVVUyIsImh0bWwiLCJzaG93X3NoaXBwaW5nIiwidXNlX2Zvcl9zaGlwcGluZ19zZWxlY3RvciIsInNoaXBwaW5nX3NlbGVjdG9yIiwiYWNjb3VudF9leGlzdHMiLCJzaG93UGFzc3dvcmQiLCJzaG93UGFzc3dvcmRTdHJlbmd0aCIsInNwYW1FbWFpbCIsImVtYWlsX2ZpZWxkX3NlbGVjdG9yIiwidG9nZ2xlQWNjb3VudEZpZWxkcyIsImNyZWF0ZV9tcF9zZWxlY3RvciIsImRvbmVUeXBpbmciLCJlbWFpbCIsImNoZWNrTWlubnBvc3RBY2NvdW50IiwidHlwaW5nVGltZXIiLCJkb25lVHlwaW5nSW50ZXJ2YWwiLCJrZXl1cCIsImVtYWlsX2ZpZWxkIiwic3BhbUVycm9yQ29udGFpbmVyIiwiY3JlYXRlX2FjY291bnRfc2VsZWN0b3IiLCJiZWZvcmUiLCJwYXNzd29yZF9zZWxlY3RvciIsIiRzdWJtaXQiLCIkY29udGFpbmVyIiwiJGZpZWxkIiwic2hvd19wYXNzIiwiJHRvZ2dsZSIsImNoZWNrYm94IiwiJGJlZm9yZSIsImFmdGVyIiwiY2hlY2tQYXNzd29yZFN0cmVuZ3RoIiwiJHBhc3N3b3JkIiwiJHN0cmVuZ3RoTWV0ZXIiLCIkc3RyZW5ndGhUZXh0IiwicGFzc3dvcmQiLCJyZXN1bHQiLCJ6eGN2Ym4iLCJzdHJlbmd0aCIsInNjb3JlIiwidXNlciIsIm1pbm5wb3N0X3Jvb3QiLCJzdGF0dXMiLCJyZWFzb24iLCJjb3VudHJ5IiwiY3VycmVuY3kiLCJwckJ1dHRvbiIsImNyZWF0ZSIsInRoZW1lIiwiaGVpZ2h0IiwiY2FuTWFrZVBheW1lbnQiLCJ0aGVuIiwibW91bnQiLCJoaWRlUGF5bWVudFJlcXVlc3QiLCJldmVudCIsInN1cHBvcnRmb3JtIiwiZ2V0IiwicmVwb3J0VmFsaWRpdHkiLCJ0b2tlbkZpZWxkTmFtZSIsInRva2VuRmllbGQiLCJwYXltZW50TWV0aG9kIiwiaWQiLCJmb3JtUHJvY2Vzc29yIiwiaGlkZUVsZW1lbnQiLCJjaG9vc2VfcGF5bWVudCIsImNoZWNrZWRfaWQiLCJjaGVja2VkX3ZhbHVlIiwic2V0dXBQYXltZW50TWV0aG9kIiwiZWxlbWVudF9pZCIsImVsZW1lbnRfdmFsdWUiLCJhY2hGaWVsZHMiLCJyZW1vdmVBY2hGaWVsZHMiLCJwYXltZW50X21ldGhvZF9zZWxlY3RvciIsInBsYWlkX2xpbmsiLCJidXR0b25EaXNhYmxlZCIsImxpbmtIYW5kbGVyIiwiZGVzdHJveSIsImJhc2UiLCJpY29uQ29sb3IiLCJsaW5lSGVpZ2h0IiwiZm9udFdlaWdodCIsImZvbnRGYW1pbHkiLCJmb250U2l6ZSIsImludmFsaWQiLCJjb2xvciIsImNhcmROdW1iZXJFbGVtZW50Iiwic2hvd0ljb24iLCJjY19udW1fc2VsZWN0b3IiLCJjYXJkRXhwaXJ5RWxlbWVudCIsImNjX2V4cF9zZWxlY3RvciIsImNhcmRDdmNFbGVtZW50IiwiY2NfY3ZjX3NlbGVjdG9yIiwiYnJhbmQiLCJzdHJpcGVFcnJvckRpc3BsYXkiLCJidXR0b25TdGF0dXMiLCJzaG93U3Bpbm5lciIsImhpZGVTcGlubmVyIiwiYmFua1Rva2VuRmllbGROYW1lIiwiYmFua1Rva2VuRmllbGQiLCJQbGFpZCIsImNsaWVudE5hbWUiLCJlbnYiLCJwbGFpZF9lbnYiLCJwcm9kdWN0IiwidG9rZW4iLCJnZXRFbGVtZW50QnlJZCIsIm9uU3VjY2VzcyIsInB1YmxpY190b2tlbiIsIm1ldGFkYXRhIiwiSlNPTiIsInN0cmluZ2lmeSIsImFjY291bnRfaWQiLCJjb250ZW50VHlwZSIsInJlc3BvbnNlIiwic3RyaXBlX2JhbmtfYWNjb3VudF90b2tlbiIsInByZXBlbmQiLCJmYWlsIiwicmVzZXRGb3JtRXJyb3JzIiwib3BlbiIsImJ1dHRvbiIsImRpc2FibGVkIiwiYWNoX3dhc19pbml0aWFsaXplZCIsInJlbW92ZUF0dHIiLCJmb3JtcyIsImZvcm1fc2VsZWN0b3IiLCJzY3JvbGxUb0Zvcm1FcnJvciIsImZpcnN0IiwiZmlyc3RfaG9sZGVyIiwiZWxlbWVudE9mZnNldCIsIm9mZnNldCIsInBhZ2VPZmZzZXQiLCJwYWdlWU9mZnNldCIsInNjcm9sbFRvcCIsInN1Ym1pdCIsImJpbGxpbmdEZXRhaWxzIiwiZ2VuZXJhdGVCaWxsaW5nRGV0YWlscyIsImNyZWF0ZU1pbm5Qb3N0QWNjb3VudCIsInBheW1lbnRfdHlwZSIsImNyZWF0ZVBheW1lbnRNZXRob2QiLCJiYW5rVG9rZW5IYW5kbGVyIiwic3VibWl0Rm9ybU9ubHkiLCJ0aGlzX3NlbGVjdG9yIiwid2hpY2hfZXJyb3IiLCJlbXB0eSIsImFuaW1hdGUiLCJmaXJzdF9uYW1lIiwiZmlyc3RfbmFtZV9maWVsZF9zZWxlY3RvciIsImxhc3RfbmFtZSIsImxhc3RfbmFtZV9maWVsZF9zZWxlY3RvciIsInBhc3N3b3JkX2ZpZWxkX3NlbGVjdG9yIiwiY2l0eSIsImJpbGxpbmdfY2l0eV9maWVsZF9zZWxlY3RvciIsInN0YXRlIiwiemlwIiwiYWRkcmVzc0RldGFpbHMiLCJmdWxsX25hbWUiLCJzdHJlZXQiLCJiaWxsaW5nX3N0cmVldF9maWVsZF9zZWxlY3RvciIsImxpbmUxIiwicG9zdGFsX2NvZGUiLCJjb3VudHJ5X2ZpZWxkX3ZhbHVlIiwiYmlsbGluZ19jb3VudHJ5X2ZpZWxkX3NlbGVjdG9yIiwiYWRkcmVzcyIsImNhcmRFbGVtZW50IiwiYmlsbGluZ19kZXRhaWxzIiwiaGFuZGxlU2VydmVyRXJyb3IiLCJhamF4X3VybCIsImZldGNoIiwiaGVhZGVycyIsImJvZHkiLCJzZXJpYWxpemUiLCJqc29uIiwiaGFuZGxlU2VydmVyUmVzcG9uc2UiLCJjYWNoZSIsImVycm9ycyIsInJlcXVpcmVzX2FjdGlvbiIsInRoaXNfZmllbGQiLCJlYWNoIiwicGFyYW0iLCJkaXNwbGF5RXJyb3JNZXNzYWdlIiwic3RyaXBlRXJyb3JTZWxlY3RvciIsImZpZWxkUGFyZW50IiwicHJldiIsIm5ld3NsZXR0ZXJfZ3JvdXBfaHRtbCIsIm5ld3NsZXR0ZXJfZ3JvdXBfc2VsZWN0b3IiLCJnZXRfZGF0YSIsInNob3J0Y29kZSIsInBsYWNlbWVudCIsImdyb3VwX2ZpZWxkcyIsImNhdGVnb3J5IiwibWFpbGNoaW1wX3N0YXR1cyIsIm1haWxjaGltcF91c2VyX2lkIiwiZXhpc3RpbmdfbmV3c2xldHRlcl9zZXR0aW5ncyIsImNvbmZpcm1mb3JtIiwibmV3c2xldHRlcl9ncm91cHMiLCJuZXdfbmV3c2xldHRlcl9zZXR0aW5ncyIsInBvc3RfZGF0YSIsImdyb3Vwc19zdWJtaXR0ZWQiLCJncm91cHNfYXZhaWxhYmxlIiwiZ3JvdXAiLCJkYXRhVHlwZSIsInN1Y2Nlc3MiLCJqUXVlcnkiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxDQUFDLFVBQVNBLENBQVQsRUFBVztBQUFDLE1BQUcsUUFBT0MsT0FBUCx5Q0FBT0EsT0FBUCxPQUFpQixRQUFqQixJQUEyQixPQUFPQyxNQUFQLEtBQWdCLFdBQTlDLEVBQTBEO0FBQUNBLElBQUFBLE1BQU0sQ0FBQ0QsT0FBUCxHQUFlRCxDQUFDLEVBQWhCO0FBQW1CLEdBQTlFLE1BQW1GLElBQUcsT0FBT0csTUFBUCxLQUFnQixVQUFoQixJQUE0QkEsTUFBTSxDQUFDQyxHQUF0QyxFQUEwQztBQUFDRCxJQUFBQSxNQUFNLENBQUMsRUFBRCxFQUFJSCxDQUFKLENBQU47QUFBYSxHQUF4RCxNQUE0RDtBQUFDLFFBQUlLLENBQUo7O0FBQU0sUUFBRyxPQUFPQyxNQUFQLEtBQWdCLFdBQW5CLEVBQStCO0FBQUNELE1BQUFBLENBQUMsR0FBQ0MsTUFBRjtBQUFTLEtBQXpDLE1BQThDLElBQUcsT0FBT0MsTUFBUCxLQUFnQixXQUFuQixFQUErQjtBQUFDRixNQUFBQSxDQUFDLEdBQUNFLE1BQUY7QUFBUyxLQUF6QyxNQUE4QyxJQUFHLE9BQU9DLElBQVAsS0FBYyxXQUFqQixFQUE2QjtBQUFDSCxNQUFBQSxDQUFDLEdBQUNHLElBQUY7QUFBTyxLQUFyQyxNQUF5QztBQUFDSCxNQUFBQSxDQUFDLEdBQUMsSUFBRjtBQUFPOztB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aWYodHlwZW9mIGV4cG9ydHM9PT1cIm9iamVjdFwiJiZ0eXBlb2YgbW9kdWxlIT09XCJ1bmRlZmluZWRcIil7bW9kdWxlLmV4cG9ydHM9ZigpfWVsc2UgaWYodHlwZW9mIGRlZmluZT09PVwiZnVuY3Rpb25cIiYmZGVmaW5lLmFtZCl7ZGVmaW5lKFtdLGYpfWVsc2V7dmFyIGc7aWYodHlwZW9mIHdpbmRvdyE9PVwidW5kZWZpbmVkXCIpe2c9d2luZG93fWVsc2UgaWYodHlwZW9mIGdsb2JhbCE9PVwidW5kZWZpbmVkXCIpe2c9Z2xvYmFsfWVsc2UgaWYodHlwZW9mIHNlbGYhPT1cInVuZGVmaW5lZFwiKXtnPXNlbGZ9ZWxzZXtnPXRoaXN9KGcucGF5bWVudCB8fCAoZy5wYXltZW50ID0ge30pKS5qcyA9IGYoKX19KShmdW5jdGlvbigpe3ZhciBkZWZpbmUsbW9kdWxlLGV4cG9ydHM7cmV0dXJuIChmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pKHsxOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbnZhciBRSiwgcnJldHVybiwgcnRyaW07XG5cblFKID0gZnVuY3Rpb24oc2VsZWN0b3IpIHtcbiAgaWYgKFFKLmlzRE9NRWxlbWVudChzZWxlY3RvcikpIHtcbiAgICByZXR1cm4gc2VsZWN0b3I7XG4gIH1cbiAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xufTtcblxuUUouaXNET01FbGVtZW50ID0gZnVuY3Rpb24oZWwpIHtcbiAgcmV0dXJuIGVsICYmIChlbC5ub2RlTmFtZSAhPSBudWxsKTtcbn07XG5cbnJ0cmltID0gL15bXFxzXFx1RkVGRlxceEEwXSt8W1xcc1xcdUZFRkZcXHhBMF0rJC9nO1xuXG5RSi50cmltID0gZnVuY3Rpb24odGV4dCkge1xuICBpZiAodGV4dCA9PT0gbnVsbCkge1xuICAgIHJldHVybiBcIlwiO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAodGV4dCArIFwiXCIpLnJlcGxhY2UocnRyaW0sIFwiXCIpO1xuICB9XG59O1xuXG5ycmV0dXJuID0gL1xcci9nO1xuXG5RSi52YWwgPSBmdW5jdGlvbihlbCwgdmFsKSB7XG4gIHZhciByZXQ7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgIHJldHVybiBlbC52YWx1ZSA9IHZhbDtcbiAgfSBlbHNlIHtcbiAgICByZXQgPSBlbC52YWx1ZTtcbiAgICBpZiAodHlwZW9mIHJldCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgcmV0dXJuIHJldC5yZXBsYWNlKHJyZXR1cm4sIFwiXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAocmV0ID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cblFKLnByZXZlbnREZWZhdWx0ID0gZnVuY3Rpb24oZXZlbnRPYmplY3QpIHtcbiAgaWYgKHR5cGVvZiBldmVudE9iamVjdC5wcmV2ZW50RGVmYXVsdCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgZXZlbnRPYmplY3QucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm47XG4gIH1cbiAgZXZlbnRPYmplY3QucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuUUoubm9ybWFsaXplRXZlbnQgPSBmdW5jdGlvbihlKSB7XG4gIHZhciBvcmlnaW5hbDtcbiAgb3JpZ2luYWwgPSBlO1xuICBlID0ge1xuICAgIHdoaWNoOiBvcmlnaW5hbC53aGljaCAhPSBudWxsID8gb3JpZ2luYWwud2hpY2ggOiB2b2lkIDAsXG4gICAgdGFyZ2V0OiBvcmlnaW5hbC50YXJnZXQgfHwgb3JpZ2luYWwuc3JjRWxlbWVudCxcbiAgICBwcmV2ZW50RGVmYXVsdDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gUUoucHJldmVudERlZmF1bHQob3JpZ2luYWwpO1xuICAgIH0sXG4gICAgb3JpZ2luYWxFdmVudDogb3JpZ2luYWwsXG4gICAgZGF0YTogb3JpZ2luYWwuZGF0YSB8fCBvcmlnaW5hbC5kZXRhaWxcbiAgfTtcbiAgaWYgKGUud2hpY2ggPT0gbnVsbCkge1xuICAgIGUud2hpY2ggPSBvcmlnaW5hbC5jaGFyQ29kZSAhPSBudWxsID8gb3JpZ2luYWwuY2hhckNvZGUgOiBvcmlnaW5hbC5rZXlDb2RlO1xuICB9XG4gIHJldHVybiBlO1xufTtcblxuUUoub24gPSBmdW5jdGlvbihlbGVtZW50LCBldmVudE5hbWUsIGNhbGxiYWNrKSB7XG4gIHZhciBlbCwgaSwgaiwgbGVuLCBsZW4xLCBtdWx0RXZlbnROYW1lLCBvcmlnaW5hbENhbGxiYWNrLCByZWY7XG4gIGlmIChlbGVtZW50Lmxlbmd0aCkge1xuICAgIGZvciAoaSA9IDAsIGxlbiA9IGVsZW1lbnQubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGVsID0gZWxlbWVudFtpXTtcbiAgICAgIFFKLm9uKGVsLCBldmVudE5hbWUsIGNhbGxiYWNrKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChldmVudE5hbWUubWF0Y2goXCIgXCIpKSB7XG4gICAgcmVmID0gZXZlbnROYW1lLnNwbGl0KFwiIFwiKTtcbiAgICBmb3IgKGogPSAwLCBsZW4xID0gcmVmLmxlbmd0aDsgaiA8IGxlbjE7IGorKykge1xuICAgICAgbXVsdEV2ZW50TmFtZSA9IHJlZltqXTtcbiAgICAgIFFKLm9uKGVsZW1lbnQsIG11bHRFdmVudE5hbWUsIGNhbGxiYWNrKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG4gIG9yaWdpbmFsQ2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgY2FsbGJhY2sgPSBmdW5jdGlvbihlKSB7XG4gICAgZSA9IFFKLm5vcm1hbGl6ZUV2ZW50KGUpO1xuICAgIHJldHVybiBvcmlnaW5hbENhbGxiYWNrKGUpO1xuICB9O1xuICBpZiAoZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgcmV0dXJuIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGNhbGxiYWNrLCBmYWxzZSk7XG4gIH1cbiAgaWYgKGVsZW1lbnQuYXR0YWNoRXZlbnQpIHtcbiAgICBldmVudE5hbWUgPSBcIm9uXCIgKyBldmVudE5hbWU7XG4gICAgcmV0dXJuIGVsZW1lbnQuYXR0YWNoRXZlbnQoZXZlbnROYW1lLCBjYWxsYmFjayk7XG4gIH1cbiAgZWxlbWVudFsnb24nICsgZXZlbnROYW1lXSA9IGNhbGxiYWNrO1xufTtcblxuUUouYWRkQ2xhc3MgPSBmdW5jdGlvbihlbCwgY2xhc3NOYW1lKSB7XG4gIHZhciBlO1xuICBpZiAoZWwubGVuZ3RoKSB7XG4gICAgcmV0dXJuIChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBpLCBsZW4sIHJlc3VsdHM7XG4gICAgICByZXN1bHRzID0gW107XG4gICAgICBmb3IgKGkgPSAwLCBsZW4gPSBlbC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBlID0gZWxbaV07XG4gICAgICAgIHJlc3VsdHMucHVzaChRSi5hZGRDbGFzcyhlLCBjbGFzc05hbWUpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH0pKCk7XG4gIH1cbiAgaWYgKGVsLmNsYXNzTGlzdCkge1xuICAgIHJldHVybiBlbC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGVsLmNsYXNzTmFtZSArPSAnICcgKyBjbGFzc05hbWU7XG4gIH1cbn07XG5cblFKLmhhc0NsYXNzID0gZnVuY3Rpb24oZWwsIGNsYXNzTmFtZSkge1xuICB2YXIgZSwgaGFzQ2xhc3MsIGksIGxlbjtcbiAgaWYgKGVsLmxlbmd0aCkge1xuICAgIGhhc0NsYXNzID0gdHJ1ZTtcbiAgICBmb3IgKGkgPSAwLCBsZW4gPSBlbC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgZSA9IGVsW2ldO1xuICAgICAgaGFzQ2xhc3MgPSBoYXNDbGFzcyAmJiBRSi5oYXNDbGFzcyhlLCBjbGFzc05hbWUpO1xuICAgIH1cbiAgICByZXR1cm4gaGFzQ2xhc3M7XG4gIH1cbiAgaWYgKGVsLmNsYXNzTGlzdCkge1xuICAgIHJldHVybiBlbC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV3IFJlZ0V4cCgnKF58ICknICsgY2xhc3NOYW1lICsgJyggfCQpJywgJ2dpJykudGVzdChlbC5jbGFzc05hbWUpO1xuICB9XG59O1xuXG5RSi5yZW1vdmVDbGFzcyA9IGZ1bmN0aW9uKGVsLCBjbGFzc05hbWUpIHtcbiAgdmFyIGNscywgZSwgaSwgbGVuLCByZWYsIHJlc3VsdHM7XG4gIGlmIChlbC5sZW5ndGgpIHtcbiAgICByZXR1cm4gKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGksIGxlbiwgcmVzdWx0cztcbiAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgIGZvciAoaSA9IDAsIGxlbiA9IGVsLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGUgPSBlbFtpXTtcbiAgICAgICAgcmVzdWx0cy5wdXNoKFFKLnJlbW92ZUNsYXNzKGUsIGNsYXNzTmFtZSkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfSkoKTtcbiAgfVxuICBpZiAoZWwuY2xhc3NMaXN0KSB7XG4gICAgcmVmID0gY2xhc3NOYW1lLnNwbGl0KCcgJyk7XG4gICAgcmVzdWx0cyA9IFtdO1xuICAgIGZvciAoaSA9IDAsIGxlbiA9IHJlZi5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgY2xzID0gcmVmW2ldO1xuICAgICAgcmVzdWx0cy5wdXNoKGVsLmNsYXNzTGlzdC5yZW1vdmUoY2xzKSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRzO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBlbC5jbGFzc05hbWUgPSBlbC5jbGFzc05hbWUucmVwbGFjZShuZXcgUmVnRXhwKCcoXnxcXFxcYiknICsgY2xhc3NOYW1lLnNwbGl0KCcgJykuam9pbignfCcpICsgJyhcXFxcYnwkKScsICdnaScpLCAnICcpO1xuICB9XG59O1xuXG5RSi50b2dnbGVDbGFzcyA9IGZ1bmN0aW9uKGVsLCBjbGFzc05hbWUsIGJvb2wpIHtcbiAgdmFyIGU7XG4gIGlmIChlbC5sZW5ndGgpIHtcbiAgICByZXR1cm4gKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGksIGxlbiwgcmVzdWx0cztcbiAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgIGZvciAoaSA9IDAsIGxlbiA9IGVsLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGUgPSBlbFtpXTtcbiAgICAgICAgcmVzdWx0cy5wdXNoKFFKLnRvZ2dsZUNsYXNzKGUsIGNsYXNzTmFtZSwgYm9vbCkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfSkoKTtcbiAgfVxuICBpZiAoYm9vbCkge1xuICAgIGlmICghUUouaGFzQ2xhc3MoZWwsIGNsYXNzTmFtZSkpIHtcbiAgICAgIHJldHVybiBRSi5hZGRDbGFzcyhlbCwgY2xhc3NOYW1lKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIFFKLnJlbW92ZUNsYXNzKGVsLCBjbGFzc05hbWUpO1xuICB9XG59O1xuXG5RSi5hcHBlbmQgPSBmdW5jdGlvbihlbCwgdG9BcHBlbmQpIHtcbiAgdmFyIGU7XG4gIGlmIChlbC5sZW5ndGgpIHtcbiAgICByZXR1cm4gKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGksIGxlbiwgcmVzdWx0cztcbiAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgIGZvciAoaSA9IDAsIGxlbiA9IGVsLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGUgPSBlbFtpXTtcbiAgICAgICAgcmVzdWx0cy5wdXNoKFFKLmFwcGVuZChlLCB0b0FwcGVuZCkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfSkoKTtcbiAgfVxuICByZXR1cm4gZWwuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCB0b0FwcGVuZCk7XG59O1xuXG5RSi5maW5kID0gZnVuY3Rpb24oZWwsIHNlbGVjdG9yKSB7XG4gIGlmIChlbCBpbnN0YW5jZW9mIE5vZGVMaXN0IHx8IGVsIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICBlbCA9IGVsWzBdO1xuICB9XG4gIHJldHVybiBlbC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbn07XG5cblFKLnRyaWdnZXIgPSBmdW5jdGlvbihlbCwgbmFtZSwgZGF0YSkge1xuICB2YXIgZSwgZXJyb3IsIGV2O1xuICB0cnkge1xuICAgIGV2ID0gbmV3IEN1c3RvbUV2ZW50KG5hbWUsIHtcbiAgICAgIGRldGFpbDogZGF0YVxuICAgIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGUgPSBlcnJvcjtcbiAgICBldiA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuICAgIGlmIChldi5pbml0Q3VzdG9tRXZlbnQpIHtcbiAgICAgIGV2LmluaXRDdXN0b21FdmVudChuYW1lLCB0cnVlLCB0cnVlLCBkYXRhKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXYuaW5pdEV2ZW50KG5hbWUsIHRydWUsIHRydWUsIGRhdGEpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZWwuZGlzcGF0Y2hFdmVudChldik7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFFKO1xuXG5cbn0se31dLDI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuKGZ1bmN0aW9uIChnbG9iYWwpe1xudmFyIFBheW1lbnQsIFFKLCBjYXJkRnJvbU51bWJlciwgY2FyZEZyb21UeXBlLCBjYXJkcywgZGVmYXVsdEZvcm1hdCwgZm9ybWF0QmFja0NhcmROdW1iZXIsIGZvcm1hdEJhY2tFeHBpcnksIGZvcm1hdENhcmROdW1iZXIsIGZvcm1hdEV4cGlyeSwgZm9ybWF0Rm9yd2FyZEV4cGlyeSwgZm9ybWF0Rm9yd2FyZFNsYXNoLCBmb3JtYXRNb250aEV4cGlyeSwgaGFzVGV4dFNlbGVjdGVkLCBsdWhuQ2hlY2ssIHJlRm9ybWF0Q2FyZE51bWJlciwgcmVzdHJpY3RDVkMsIHJlc3RyaWN0Q2FyZE51bWJlciwgcmVzdHJpY3RDb21iaW5lZEV4cGlyeSwgcmVzdHJpY3RFeHBpcnksIHJlc3RyaWN0TW9udGhFeHBpcnksIHJlc3RyaWN0TnVtZXJpYywgcmVzdHJpY3RZZWFyRXhwaXJ5LCBzZXRDYXJkVHlwZSxcbiAgaW5kZXhPZiA9IFtdLmluZGV4T2YgfHwgZnVuY3Rpb24oaXRlbSkgeyBmb3IgKHZhciBpID0gMCwgbCA9IHRoaXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7IGlmIChpIGluIHRoaXMgJiYgdGhpc1tpXSA9PT0gaXRlbSkgcmV0dXJuIGk7IH0gcmV0dXJuIC0xOyB9O1xuXG5RSiA9IHJlcXVpcmUoJ3FqL3NyYy9xai5jb2ZmZWUnKTtcblxuZGVmYXVsdEZvcm1hdCA9IC8oXFxkezEsNH0pL2c7XG5cbmNhcmRzID0gW1xuICB7XG4gICAgdHlwZTogJ2FtZXgnLFxuICAgIHBhdHRlcm46IC9eM1s0N10vLFxuICAgIGZvcm1hdDogLyhcXGR7MSw0fSkoXFxkezEsNn0pPyhcXGR7MSw1fSk/LyxcbiAgICBsZW5ndGg6IFsxNV0sXG4gICAgY3ZjTGVuZ3RoOiBbNF0sXG4gICAgbHVobjogdHJ1ZVxuICB9LCB7XG4gICAgdHlwZTogJ2RhbmtvcnQnLFxuICAgIHBhdHRlcm46IC9eNTAxOS8sXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGxlbmd0aDogWzE2XSxcbiAgICBjdmNMZW5ndGg6IFszXSxcbiAgICBsdWhuOiB0cnVlXG4gIH0sIHtcbiAgICB0eXBlOiAnZGluZXJzY2x1YicsXG4gICAgcGF0dGVybjogL14oMzZ8Mzh8MzBbMC01XSkvLFxuICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICBsZW5ndGg6IFsxNF0sXG4gICAgY3ZjTGVuZ3RoOiBbM10sXG4gICAgbHVobjogdHJ1ZVxuICB9LCB7XG4gICAgdHlwZTogJ2Rpc2NvdmVyJyxcbiAgICBwYXR0ZXJuOiAvXig2MDExfDY1fDY0WzQtOV18NjIyKS8sXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGxlbmd0aDogWzE2XSxcbiAgICBjdmNMZW5ndGg6IFszXSxcbiAgICBsdWhuOiB0cnVlXG4gIH0sIHtcbiAgICB0eXBlOiAnamNiJyxcbiAgICBwYXR0ZXJuOiAvXjM1LyxcbiAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgbGVuZ3RoOiBbMTZdLFxuICAgIGN2Y0xlbmd0aDogWzNdLFxuICAgIGx1aG46IHRydWVcbiAgfSwge1xuICAgIHR5cGU6ICdsYXNlcicsXG4gICAgcGF0dGVybjogL14oNjcwNnw2NzcxfDY3MDkpLyxcbiAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgbGVuZ3RoOiBbMTYsIDE3LCAxOCwgMTldLFxuICAgIGN2Y0xlbmd0aDogWzNdLFxuICAgIGx1aG46IHRydWVcbiAgfSwge1xuICAgIHR5cGU6ICdtYWVzdHJvJyxcbiAgICBwYXR0ZXJuOiAvXig1MDE4fDUwMjB8NTAzOHw2MzA0fDY3MDN8Njc1OXw2NzZbMS0zXSkvLFxuICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICBsZW5ndGg6IFsxMiwgMTMsIDE0LCAxNSwgMTYsIDE3LCAxOCwgMTldLFxuICAgIGN2Y0xlbmd0aDogWzNdLFxuICAgIGx1aG46IHRydWVcbiAgfSwge1xuICAgIHR5cGU6ICdtYXN0ZXJjYXJkJyxcbiAgICBwYXR0ZXJuOiAvXjVbMS01XS8sXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGxlbmd0aDogWzE2XSxcbiAgICBjdmNMZW5ndGg6IFszXSxcbiAgICBsdWhuOiB0cnVlXG4gIH0sIHtcbiAgICB0eXBlOiAndW5pb25wYXknLFxuICAgIHBhdHRlcm46IC9eNjIvLFxuICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICBsZW5ndGg6IFsxNiwgMTcsIDE4LCAxOV0sXG4gICAgY3ZjTGVuZ3RoOiBbM10sXG4gICAgbHVobjogZmFsc2VcbiAgfSwge1xuICAgIHR5cGU6ICd2aXNhZWxlY3Ryb24nLFxuICAgIHBhdHRlcm46IC9eNCgwMjZ8MTc1MDB8NDA1fDUwOHw4NDR8OTFbMzddKS8sXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGxlbmd0aDogWzE2XSxcbiAgICBjdmNMZW5ndGg6IFszXSxcbiAgICBsdWhuOiB0cnVlXG4gIH0sIHtcbiAgICB0eXBlOiAndmlzYScsXG4gICAgcGF0dGVybjogL140LyxcbiAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgbGVuZ3RoOiBbMTMsIDE2XSxcbiAgICBjdmNMZW5ndGg6IFszXSxcbiAgICBsdWhuOiB0cnVlXG4gIH0sIHtcbiAgICB0eXBlOiAnZWxvJyxcbiAgICBwYXR0ZXJuOiAvXjQwMTF8NDM4OTM1fDQ1KDE0MTZ8NzYpfDUwKDQxNzV8NjY5OXw2N3w5MFs0LTddKXw2Myg2Mjk3fDYzNjgpLyxcbiAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgbGVuZ3RoOiBbMTZdLFxuICAgIGN2Y0xlbmd0aDogWzNdLFxuICAgIGx1aG46IHRydWVcbiAgfVxuXTtcblxuY2FyZEZyb21OdW1iZXIgPSBmdW5jdGlvbihudW0pIHtcbiAgdmFyIGNhcmQsIGksIGxlbjtcbiAgbnVtID0gKG51bSArICcnKS5yZXBsYWNlKC9cXEQvZywgJycpO1xuICBmb3IgKGkgPSAwLCBsZW4gPSBjYXJkcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGNhcmQgPSBjYXJkc1tpXTtcbiAgICBpZiAoY2FyZC5wYXR0ZXJuLnRlc3QobnVtKSkge1xuICAgICAgcmV0dXJuIGNhcmQ7XG4gICAgfVxuICB9XG59O1xuXG5jYXJkRnJvbVR5cGUgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciBjYXJkLCBpLCBsZW47XG4gIGZvciAoaSA9IDAsIGxlbiA9IGNhcmRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgY2FyZCA9IGNhcmRzW2ldO1xuICAgIGlmIChjYXJkLnR5cGUgPT09IHR5cGUpIHtcbiAgICAgIHJldHVybiBjYXJkO1xuICAgIH1cbiAgfVxufTtcblxubHVobkNoZWNrID0gZnVuY3Rpb24obnVtKSB7XG4gIHZhciBkaWdpdCwgZGlnaXRzLCBpLCBsZW4sIG9kZCwgc3VtO1xuICBvZGQgPSB0cnVlO1xuICBzdW0gPSAwO1xuICBkaWdpdHMgPSAobnVtICsgJycpLnNwbGl0KCcnKS5yZXZlcnNlKCk7XG4gIGZvciAoaSA9IDAsIGxlbiA9IGRpZ2l0cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGRpZ2l0ID0gZGlnaXRzW2ldO1xuICAgIGRpZ2l0ID0gcGFyc2VJbnQoZGlnaXQsIDEwKTtcbiAgICBpZiAoKG9kZCA9ICFvZGQpKSB7XG4gICAgICBkaWdpdCAqPSAyO1xuICAgIH1cbiAgICBpZiAoZGlnaXQgPiA5KSB7XG4gICAgICBkaWdpdCAtPSA5O1xuICAgIH1cbiAgICBzdW0gKz0gZGlnaXQ7XG4gIH1cbiAgcmV0dXJuIHN1bSAlIDEwID09PSAwO1xufTtcblxuaGFzVGV4dFNlbGVjdGVkID0gZnVuY3Rpb24odGFyZ2V0KSB7XG4gIHZhciByZWY7XG4gIGlmICgodGFyZ2V0LnNlbGVjdGlvblN0YXJ0ICE9IG51bGwpICYmIHRhcmdldC5zZWxlY3Rpb25TdGFydCAhPT0gdGFyZ2V0LnNlbGVjdGlvbkVuZCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmICgodHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiICYmIGRvY3VtZW50ICE9PSBudWxsID8gKHJlZiA9IGRvY3VtZW50LnNlbGVjdGlvbikgIT0gbnVsbCA/IHJlZi5jcmVhdGVSYW5nZSA6IHZvaWQgMCA6IHZvaWQgMCkgIT0gbnVsbCkge1xuICAgIGlmIChkb2N1bWVudC5zZWxlY3Rpb24uY3JlYXRlUmFuZ2UoKS50ZXh0KSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxucmVGb3JtYXRDYXJkTnVtYmVyID0gZnVuY3Rpb24oZSkge1xuICByZXR1cm4gc2V0VGltZW91dCgoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgdGFyZ2V0LCB2YWx1ZTtcbiAgICAgIHRhcmdldCA9IGUudGFyZ2V0O1xuICAgICAgdmFsdWUgPSBRSi52YWwodGFyZ2V0KTtcbiAgICAgIHZhbHVlID0gUGF5bWVudC5mbnMuZm9ybWF0Q2FyZE51bWJlcih2YWx1ZSk7XG4gICAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgdmFsdWUpO1xuICAgIH07XG4gIH0pKHRoaXMpKTtcbn07XG5cbmZvcm1hdENhcmROdW1iZXIgPSBmdW5jdGlvbihlKSB7XG4gIHZhciBjYXJkLCBkaWdpdCwgbGVuZ3RoLCByZSwgdGFyZ2V0LCB1cHBlckxlbmd0aCwgdmFsdWU7XG4gIGRpZ2l0ID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKTtcbiAgaWYgKCEvXlxcZCskLy50ZXN0KGRpZ2l0KSkge1xuICAgIHJldHVybjtcbiAgfVxuICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgdmFsdWUgPSBRSi52YWwodGFyZ2V0KTtcbiAgY2FyZCA9IGNhcmRGcm9tTnVtYmVyKHZhbHVlICsgZGlnaXQpO1xuICBsZW5ndGggPSAodmFsdWUucmVwbGFjZSgvXFxEL2csICcnKSArIGRpZ2l0KS5sZW5ndGg7XG4gIHVwcGVyTGVuZ3RoID0gMTY7XG4gIGlmIChjYXJkKSB7XG4gICAgdXBwZXJMZW5ndGggPSBjYXJkLmxlbmd0aFtjYXJkLmxlbmd0aC5sZW5ndGggLSAxXTtcbiAgfVxuICBpZiAobGVuZ3RoID49IHVwcGVyTGVuZ3RoKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICgodGFyZ2V0LnNlbGVjdGlvblN0YXJ0ICE9IG51bGwpICYmIHRhcmdldC5zZWxlY3Rpb25TdGFydCAhPT0gdmFsdWUubGVuZ3RoKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChjYXJkICYmIGNhcmQudHlwZSA9PT0gJ2FtZXgnKSB7XG4gICAgcmUgPSAvXihcXGR7NH18XFxkezR9XFxzXFxkezZ9KSQvO1xuICB9IGVsc2Uge1xuICAgIHJlID0gLyg/Ol58XFxzKShcXGR7NH0pJC87XG4gIH1cbiAgaWYgKHJlLnRlc3QodmFsdWUpKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCB2YWx1ZSArICcgJyArIGRpZ2l0KTtcbiAgfSBlbHNlIGlmIChyZS50ZXN0KHZhbHVlICsgZGlnaXQpKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCB2YWx1ZSArIGRpZ2l0ICsgJyAnKTtcbiAgfVxufTtcblxuZm9ybWF0QmFja0NhcmROdW1iZXIgPSBmdW5jdGlvbihlKSB7XG4gIHZhciB0YXJnZXQsIHZhbHVlO1xuICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgdmFsdWUgPSBRSi52YWwodGFyZ2V0KTtcbiAgaWYgKGUubWV0YSkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoZS53aGljaCAhPT0gOCkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoKHRhcmdldC5zZWxlY3Rpb25TdGFydCAhPSBudWxsKSAmJiB0YXJnZXQuc2VsZWN0aW9uU3RhcnQgIT09IHZhbHVlLmxlbmd0aCkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoL1xcZFxccyQvLnRlc3QodmFsdWUpKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCB2YWx1ZS5yZXBsYWNlKC9cXGRcXHMkLywgJycpKTtcbiAgfSBlbHNlIGlmICgvXFxzXFxkPyQvLnRlc3QodmFsdWUpKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCB2YWx1ZS5yZXBsYWNlKC9cXHNcXGQ/JC8sICcnKSk7XG4gIH1cbn07XG5cbmZvcm1hdEV4cGlyeSA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIGRpZ2l0LCB0YXJnZXQsIHZhbDtcbiAgZGlnaXQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpO1xuICBpZiAoIS9eXFxkKyQvLnRlc3QoZGlnaXQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRhcmdldCA9IGUudGFyZ2V0O1xuICB2YWwgPSBRSi52YWwodGFyZ2V0KSArIGRpZ2l0O1xuICBpZiAoL15cXGQkLy50ZXN0KHZhbCkgJiYgKHZhbCAhPT0gJzAnICYmIHZhbCAhPT0gJzEnKSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgXCIwXCIgKyB2YWwgKyBcIiAvIFwiKTtcbiAgfSBlbHNlIGlmICgvXlxcZFxcZCQvLnRlc3QodmFsKSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgdmFsICsgXCIgLyBcIik7XG4gIH1cbn07XG5cbmZvcm1hdE1vbnRoRXhwaXJ5ID0gZnVuY3Rpb24oZSkge1xuICB2YXIgZGlnaXQsIHRhcmdldCwgdmFsO1xuICBkaWdpdCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZS53aGljaCk7XG4gIGlmICghL15cXGQrJC8udGVzdChkaWdpdCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gIHZhbCA9IFFKLnZhbCh0YXJnZXQpICsgZGlnaXQ7XG4gIGlmICgvXlxcZCQvLnRlc3QodmFsKSAmJiAodmFsICE9PSAnMCcgJiYgdmFsICE9PSAnMScpKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCBcIjBcIiArIHZhbCk7XG4gIH0gZWxzZSBpZiAoL15cXGRcXGQkLy50ZXN0KHZhbCkpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIFwiXCIgKyB2YWwpO1xuICB9XG59O1xuXG5mb3JtYXRGb3J3YXJkRXhwaXJ5ID0gZnVuY3Rpb24oZSkge1xuICB2YXIgZGlnaXQsIHRhcmdldCwgdmFsO1xuICBkaWdpdCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZS53aGljaCk7XG4gIGlmICghL15cXGQrJC8udGVzdChkaWdpdCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gIHZhbCA9IFFKLnZhbCh0YXJnZXQpO1xuICBpZiAoL15cXGRcXGQkLy50ZXN0KHZhbCkpIHtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgdmFsICsgXCIgLyBcIik7XG4gIH1cbn07XG5cbmZvcm1hdEZvcndhcmRTbGFzaCA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIHNsYXNoLCB0YXJnZXQsIHZhbDtcbiAgc2xhc2ggPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpO1xuICBpZiAoc2xhc2ggIT09ICcvJykge1xuICAgIHJldHVybjtcbiAgfVxuICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgdmFsID0gUUoudmFsKHRhcmdldCk7XG4gIGlmICgvXlxcZCQvLnRlc3QodmFsKSAmJiB2YWwgIT09ICcwJykge1xuICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCBcIjBcIiArIHZhbCArIFwiIC8gXCIpO1xuICB9XG59O1xuXG5mb3JtYXRCYWNrRXhwaXJ5ID0gZnVuY3Rpb24oZSkge1xuICB2YXIgdGFyZ2V0LCB2YWx1ZTtcbiAgaWYgKGUubWV0YUtleSkge1xuICAgIHJldHVybjtcbiAgfVxuICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgdmFsdWUgPSBRSi52YWwodGFyZ2V0KTtcbiAgaWYgKGUud2hpY2ggIT09IDgpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKCh0YXJnZXQuc2VsZWN0aW9uU3RhcnQgIT0gbnVsbCkgJiYgdGFyZ2V0LnNlbGVjdGlvblN0YXJ0ICE9PSB2YWx1ZS5sZW5ndGgpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKC9cXGQoXFxzfFxcLykrJC8udGVzdCh2YWx1ZSkpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIHZhbHVlLnJlcGxhY2UoL1xcZChcXHN8XFwvKSokLywgJycpKTtcbiAgfSBlbHNlIGlmICgvXFxzXFwvXFxzP1xcZD8kLy50ZXN0KHZhbHVlKSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgdmFsdWUucmVwbGFjZSgvXFxzXFwvXFxzP1xcZD8kLywgJycpKTtcbiAgfVxufTtcblxucmVzdHJpY3ROdW1lcmljID0gZnVuY3Rpb24oZSkge1xuICB2YXIgaW5wdXQ7XG4gIGlmIChlLm1ldGFLZXkgfHwgZS5jdHJsS2V5KSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKGUud2hpY2ggPT09IDMyKSB7XG4gICAgcmV0dXJuIGUucHJldmVudERlZmF1bHQoKTtcbiAgfVxuICBpZiAoZS53aGljaCA9PT0gMCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmIChlLndoaWNoIDwgMzMpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpbnB1dCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZS53aGljaCk7XG4gIGlmICghL1tcXGRcXHNdLy50ZXN0KGlucHV0KSkge1xuICAgIHJldHVybiBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH1cbn07XG5cbnJlc3RyaWN0Q2FyZE51bWJlciA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIGNhcmQsIGRpZ2l0LCB0YXJnZXQsIHZhbHVlO1xuICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgZGlnaXQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpO1xuICBpZiAoIS9eXFxkKyQvLnRlc3QoZGlnaXQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChoYXNUZXh0U2VsZWN0ZWQodGFyZ2V0KSkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YWx1ZSA9IChRSi52YWwodGFyZ2V0KSArIGRpZ2l0KS5yZXBsYWNlKC9cXEQvZywgJycpO1xuICBjYXJkID0gY2FyZEZyb21OdW1iZXIodmFsdWUpO1xuICBpZiAoY2FyZCkge1xuICAgIGlmICghKHZhbHVlLmxlbmd0aCA8PSBjYXJkLmxlbmd0aFtjYXJkLmxlbmd0aC5sZW5ndGggLSAxXSkpIHtcbiAgICAgIHJldHVybiBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmICghKHZhbHVlLmxlbmd0aCA8PSAxNikpIHtcbiAgICAgIHJldHVybiBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG59O1xuXG5yZXN0cmljdEV4cGlyeSA9IGZ1bmN0aW9uKGUsIGxlbmd0aCkge1xuICB2YXIgZGlnaXQsIHRhcmdldCwgdmFsdWU7XG4gIHRhcmdldCA9IGUudGFyZ2V0O1xuICBkaWdpdCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZS53aGljaCk7XG4gIGlmICghL15cXGQrJC8udGVzdChkaWdpdCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGhhc1RleHRTZWxlY3RlZCh0YXJnZXQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhbHVlID0gUUoudmFsKHRhcmdldCkgKyBkaWdpdDtcbiAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9cXEQvZywgJycpO1xuICBpZiAodmFsdWUubGVuZ3RoID4gbGVuZ3RoKSB7XG4gICAgcmV0dXJuIGUucHJldmVudERlZmF1bHQoKTtcbiAgfVxufTtcblxucmVzdHJpY3RDb21iaW5lZEV4cGlyeSA9IGZ1bmN0aW9uKGUpIHtcbiAgcmV0dXJuIHJlc3RyaWN0RXhwaXJ5KGUsIDYpO1xufTtcblxucmVzdHJpY3RNb250aEV4cGlyeSA9IGZ1bmN0aW9uKGUpIHtcbiAgcmV0dXJuIHJlc3RyaWN0RXhwaXJ5KGUsIDIpO1xufTtcblxucmVzdHJpY3RZZWFyRXhwaXJ5ID0gZnVuY3Rpb24oZSkge1xuICByZXR1cm4gcmVzdHJpY3RFeHBpcnkoZSwgNCk7XG59O1xuXG5yZXN0cmljdENWQyA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIGRpZ2l0LCB0YXJnZXQsIHZhbDtcbiAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gIGRpZ2l0ID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKTtcbiAgaWYgKCEvXlxcZCskLy50ZXN0KGRpZ2l0KSkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoaGFzVGV4dFNlbGVjdGVkKHRhcmdldCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFsID0gUUoudmFsKHRhcmdldCkgKyBkaWdpdDtcbiAgaWYgKCEodmFsLmxlbmd0aCA8PSA0KSkge1xuICAgIHJldHVybiBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH1cbn07XG5cbnNldENhcmRUeXBlID0gZnVuY3Rpb24oZSkge1xuICB2YXIgYWxsVHlwZXMsIGNhcmQsIGNhcmRUeXBlLCB0YXJnZXQsIHZhbDtcbiAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gIHZhbCA9IFFKLnZhbCh0YXJnZXQpO1xuICBjYXJkVHlwZSA9IFBheW1lbnQuZm5zLmNhcmRUeXBlKHZhbCkgfHwgJ3Vua25vd24nO1xuICBpZiAoIVFKLmhhc0NsYXNzKHRhcmdldCwgY2FyZFR5cGUpKSB7XG4gICAgYWxsVHlwZXMgPSAoZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaSwgbGVuLCByZXN1bHRzO1xuICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgZm9yIChpID0gMCwgbGVuID0gY2FyZHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgY2FyZCA9IGNhcmRzW2ldO1xuICAgICAgICByZXN1bHRzLnB1c2goY2FyZC50eXBlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH0pKCk7XG4gICAgUUoucmVtb3ZlQ2xhc3ModGFyZ2V0LCAndW5rbm93bicpO1xuICAgIFFKLnJlbW92ZUNsYXNzKHRhcmdldCwgYWxsVHlwZXMuam9pbignICcpKTtcbiAgICBRSi5hZGRDbGFzcyh0YXJnZXQsIGNhcmRUeXBlKTtcbiAgICBRSi50b2dnbGVDbGFzcyh0YXJnZXQsICdpZGVudGlmaWVkJywgY2FyZFR5cGUgIT09ICd1bmtub3duJyk7XG4gICAgcmV0dXJuIFFKLnRyaWdnZXIodGFyZ2V0LCAncGF5bWVudC5jYXJkVHlwZScsIGNhcmRUeXBlKTtcbiAgfVxufTtcblxuUGF5bWVudCA9IChmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gUGF5bWVudCgpIHt9XG5cbiAgUGF5bWVudC5mbnMgPSB7XG4gICAgY2FyZEV4cGlyeVZhbDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHZhciBtb250aCwgcHJlZml4LCByZWYsIHllYXI7XG4gICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1xccy9nLCAnJyk7XG4gICAgICByZWYgPSB2YWx1ZS5zcGxpdCgnLycsIDIpLCBtb250aCA9IHJlZlswXSwgeWVhciA9IHJlZlsxXTtcbiAgICAgIGlmICgoeWVhciAhPSBudWxsID8geWVhci5sZW5ndGggOiB2b2lkIDApID09PSAyICYmIC9eXFxkKyQvLnRlc3QoeWVhcikpIHtcbiAgICAgICAgcHJlZml4ID0gKG5ldyBEYXRlKS5nZXRGdWxsWWVhcigpO1xuICAgICAgICBwcmVmaXggPSBwcmVmaXgudG9TdHJpbmcoKS5zbGljZSgwLCAyKTtcbiAgICAgICAgeWVhciA9IHByZWZpeCArIHllYXI7XG4gICAgICB9XG4gICAgICBtb250aCA9IHBhcnNlSW50KG1vbnRoLCAxMCk7XG4gICAgICB5ZWFyID0gcGFyc2VJbnQoeWVhciwgMTApO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbW9udGg6IG1vbnRoLFxuICAgICAgICB5ZWFyOiB5ZWFyXG4gICAgICB9O1xuICAgIH0sXG4gICAgdmFsaWRhdGVDYXJkTnVtYmVyOiBmdW5jdGlvbihudW0pIHtcbiAgICAgIHZhciBjYXJkLCByZWY7XG4gICAgICBudW0gPSAobnVtICsgJycpLnJlcGxhY2UoL1xccyt8LS9nLCAnJyk7XG4gICAgICBpZiAoIS9eXFxkKyQvLnRlc3QobnVtKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBjYXJkID0gY2FyZEZyb21OdW1iZXIobnVtKTtcbiAgICAgIGlmICghY2FyZCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gKHJlZiA9IG51bS5sZW5ndGgsIGluZGV4T2YuY2FsbChjYXJkLmxlbmd0aCwgcmVmKSA+PSAwKSAmJiAoY2FyZC5sdWhuID09PSBmYWxzZSB8fCBsdWhuQ2hlY2sobnVtKSk7XG4gICAgfSxcbiAgICB2YWxpZGF0ZUNhcmRFeHBpcnk6IGZ1bmN0aW9uKG1vbnRoLCB5ZWFyKSB7XG4gICAgICB2YXIgY3VycmVudFRpbWUsIGV4cGlyeSwgcHJlZml4LCByZWY7XG4gICAgICBpZiAodHlwZW9mIG1vbnRoID09PSAnb2JqZWN0JyAmJiAnbW9udGgnIGluIG1vbnRoKSB7XG4gICAgICAgIHJlZiA9IG1vbnRoLCBtb250aCA9IHJlZi5tb250aCwgeWVhciA9IHJlZi55ZWFyO1xuICAgICAgfVxuICAgICAgaWYgKCEobW9udGggJiYgeWVhcikpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgbW9udGggPSBRSi50cmltKG1vbnRoKTtcbiAgICAgIHllYXIgPSBRSi50cmltKHllYXIpO1xuICAgICAgaWYgKCEvXlxcZCskLy50ZXN0KG1vbnRoKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoIS9eXFxkKyQvLnRlc3QoeWVhcikpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKCEocGFyc2VJbnQobW9udGgsIDEwKSA8PSAxMikpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKHllYXIubGVuZ3RoID09PSAyKSB7XG4gICAgICAgIHByZWZpeCA9IChuZXcgRGF0ZSkuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgcHJlZml4ID0gcHJlZml4LnRvU3RyaW5nKCkuc2xpY2UoMCwgMik7XG4gICAgICAgIHllYXIgPSBwcmVmaXggKyB5ZWFyO1xuICAgICAgfVxuICAgICAgZXhwaXJ5ID0gbmV3IERhdGUoeWVhciwgbW9udGgpO1xuICAgICAgY3VycmVudFRpbWUgPSBuZXcgRGF0ZTtcbiAgICAgIGV4cGlyeS5zZXRNb250aChleHBpcnkuZ2V0TW9udGgoKSAtIDEpO1xuICAgICAgZXhwaXJ5LnNldE1vbnRoKGV4cGlyeS5nZXRNb250aCgpICsgMSwgMSk7XG4gICAgICByZXR1cm4gZXhwaXJ5ID4gY3VycmVudFRpbWU7XG4gICAgfSxcbiAgICB2YWxpZGF0ZUNhcmRDVkM6IGZ1bmN0aW9uKGN2YywgdHlwZSkge1xuICAgICAgdmFyIHJlZiwgcmVmMTtcbiAgICAgIGN2YyA9IFFKLnRyaW0oY3ZjKTtcbiAgICAgIGlmICghL15cXGQrJC8udGVzdChjdmMpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlICYmIGNhcmRGcm9tVHlwZSh0eXBlKSkge1xuICAgICAgICByZXR1cm4gcmVmID0gY3ZjLmxlbmd0aCwgaW5kZXhPZi5jYWxsKChyZWYxID0gY2FyZEZyb21UeXBlKHR5cGUpKSAhPSBudWxsID8gcmVmMS5jdmNMZW5ndGggOiB2b2lkIDAsIHJlZikgPj0gMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBjdmMubGVuZ3RoID49IDMgJiYgY3ZjLmxlbmd0aCA8PSA0O1xuICAgICAgfVxuICAgIH0sXG4gICAgY2FyZFR5cGU6IGZ1bmN0aW9uKG51bSkge1xuICAgICAgdmFyIHJlZjtcbiAgICAgIGlmICghbnVtKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgcmV0dXJuICgocmVmID0gY2FyZEZyb21OdW1iZXIobnVtKSkgIT0gbnVsbCA/IHJlZi50eXBlIDogdm9pZCAwKSB8fCBudWxsO1xuICAgIH0sXG4gICAgZm9ybWF0Q2FyZE51bWJlcjogZnVuY3Rpb24obnVtKSB7XG4gICAgICB2YXIgY2FyZCwgZ3JvdXBzLCByZWYsIHVwcGVyTGVuZ3RoO1xuICAgICAgY2FyZCA9IGNhcmRGcm9tTnVtYmVyKG51bSk7XG4gICAgICBpZiAoIWNhcmQpIHtcbiAgICAgICAgcmV0dXJuIG51bTtcbiAgICAgIH1cbiAgICAgIHVwcGVyTGVuZ3RoID0gY2FyZC5sZW5ndGhbY2FyZC5sZW5ndGgubGVuZ3RoIC0gMV07XG4gICAgICBudW0gPSBudW0ucmVwbGFjZSgvXFxEL2csICcnKTtcbiAgICAgIG51bSA9IG51bS5zbGljZSgwLCArdXBwZXJMZW5ndGggKyAxIHx8IDllOSk7XG4gICAgICBpZiAoY2FyZC5mb3JtYXQuZ2xvYmFsKSB7XG4gICAgICAgIHJldHVybiAocmVmID0gbnVtLm1hdGNoKGNhcmQuZm9ybWF0KSkgIT0gbnVsbCA/IHJlZi5qb2luKCcgJykgOiB2b2lkIDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBncm91cHMgPSBjYXJkLmZvcm1hdC5leGVjKG51bSk7XG4gICAgICAgIGlmIChncm91cHMgIT0gbnVsbCkge1xuICAgICAgICAgIGdyb3Vwcy5zaGlmdCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBncm91cHMgIT0gbnVsbCA/IGdyb3Vwcy5qb2luKCcgJykgOiB2b2lkIDA7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIFBheW1lbnQucmVzdHJpY3ROdW1lcmljID0gZnVuY3Rpb24oZWwpIHtcbiAgICByZXR1cm4gUUoub24oZWwsICdrZXlwcmVzcycsIHJlc3RyaWN0TnVtZXJpYyk7XG4gIH07XG5cbiAgUGF5bWVudC5jYXJkRXhwaXJ5VmFsID0gZnVuY3Rpb24oZWwpIHtcbiAgICByZXR1cm4gUGF5bWVudC5mbnMuY2FyZEV4cGlyeVZhbChRSi52YWwoZWwpKTtcbiAgfTtcblxuICBQYXltZW50LmZvcm1hdENhcmRDVkMgPSBmdW5jdGlvbihlbCkge1xuICAgIFBheW1lbnQucmVzdHJpY3ROdW1lcmljKGVsKTtcbiAgICBRSi5vbihlbCwgJ2tleXByZXNzJywgcmVzdHJpY3RDVkMpO1xuICAgIHJldHVybiBlbDtcbiAgfTtcblxuICBQYXltZW50LmZvcm1hdENhcmRFeHBpcnkgPSBmdW5jdGlvbihlbCkge1xuICAgIHZhciBtb250aCwgeWVhcjtcbiAgICBQYXltZW50LnJlc3RyaWN0TnVtZXJpYyhlbCk7XG4gICAgaWYgKGVsLmxlbmd0aCAmJiBlbC5sZW5ndGggPT09IDIpIHtcbiAgICAgIG1vbnRoID0gZWxbMF0sIHllYXIgPSBlbFsxXTtcbiAgICAgIHRoaXMuZm9ybWF0Q2FyZEV4cGlyeU11bHRpcGxlKG1vbnRoLCB5ZWFyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgUUoub24oZWwsICdrZXlwcmVzcycsIHJlc3RyaWN0Q29tYmluZWRFeHBpcnkpO1xuICAgICAgUUoub24oZWwsICdrZXlwcmVzcycsIGZvcm1hdEV4cGlyeSk7XG4gICAgICBRSi5vbihlbCwgJ2tleXByZXNzJywgZm9ybWF0Rm9yd2FyZFNsYXNoKTtcbiAgICAgIFFKLm9uKGVsLCAna2V5cHJlc3MnLCBmb3JtYXRGb3J3YXJkRXhwaXJ5KTtcbiAgICAgIFFKLm9uKGVsLCAna2V5ZG93bicsIGZvcm1hdEJhY2tFeHBpcnkpO1xuICAgIH1cbiAgICByZXR1cm4gZWw7XG4gIH07XG5cbiAgUGF5bWVudC5mb3JtYXRDYXJkRXhwaXJ5TXVsdGlwbGUgPSBmdW5jdGlvbihtb250aCwgeWVhcikge1xuICAgIFFKLm9uKG1vbnRoLCAna2V5cHJlc3MnLCByZXN0cmljdE1vbnRoRXhwaXJ5KTtcbiAgICBRSi5vbihtb250aCwgJ2tleXByZXNzJywgZm9ybWF0TW9udGhFeHBpcnkpO1xuICAgIHJldHVybiBRSi5vbih5ZWFyLCAna2V5cHJlc3MnLCByZXN0cmljdFllYXJFeHBpcnkpO1xuICB9O1xuXG4gIFBheW1lbnQuZm9ybWF0Q2FyZE51bWJlciA9IGZ1bmN0aW9uKGVsKSB7XG4gICAgUGF5bWVudC5yZXN0cmljdE51bWVyaWMoZWwpO1xuICAgIFFKLm9uKGVsLCAna2V5cHJlc3MnLCByZXN0cmljdENhcmROdW1iZXIpO1xuICAgIFFKLm9uKGVsLCAna2V5cHJlc3MnLCBmb3JtYXRDYXJkTnVtYmVyKTtcbiAgICBRSi5vbihlbCwgJ2tleWRvd24nLCBmb3JtYXRCYWNrQ2FyZE51bWJlcik7XG4gICAgUUoub24oZWwsICdrZXl1cCcsIHNldENhcmRUeXBlKTtcbiAgICBRSi5vbihlbCwgJ3Bhc3RlJywgcmVGb3JtYXRDYXJkTnVtYmVyKTtcbiAgICByZXR1cm4gZWw7XG4gIH07XG5cbiAgUGF5bWVudC5nZXRDYXJkQXJyYXkgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gY2FyZHM7XG4gIH07XG5cbiAgUGF5bWVudC5zZXRDYXJkQXJyYXkgPSBmdW5jdGlvbihjYXJkQXJyYXkpIHtcbiAgICBjYXJkcyA9IGNhcmRBcnJheTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICBQYXltZW50LmFkZFRvQ2FyZEFycmF5ID0gZnVuY3Rpb24oY2FyZE9iamVjdCkge1xuICAgIHJldHVybiBjYXJkcy5wdXNoKGNhcmRPYmplY3QpO1xuICB9O1xuXG4gIFBheW1lbnQucmVtb3ZlRnJvbUNhcmRBcnJheSA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgICB2YXIga2V5LCB2YWx1ZTtcbiAgICBmb3IgKGtleSBpbiBjYXJkcykge1xuICAgICAgdmFsdWUgPSBjYXJkc1trZXldO1xuICAgICAgaWYgKHZhbHVlLnR5cGUgPT09IHR5cGUpIHtcbiAgICAgICAgY2FyZHMuc3BsaWNlKGtleSwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIHJldHVybiBQYXltZW50O1xuXG59KSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBheW1lbnQ7XG5cbmdsb2JhbC5QYXltZW50ID0gUGF5bWVudDtcblxuXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbn0se1wicWovc3JjL3FqLmNvZmZlZVwiOjF9XX0se30sWzJdKSgyKVxufSk7IiwiZnVuY3Rpb24gdGxpdGUodCl7ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLGZ1bmN0aW9uKGUpe3ZhciBpPWUudGFyZ2V0LG49dChpKTtufHwobj0oaT1pLnBhcmVudEVsZW1lbnQpJiZ0KGkpKSxuJiZ0bGl0ZS5zaG93KGksbiwhMCl9KX10bGl0ZS5zaG93PWZ1bmN0aW9uKHQsZSxpKXt2YXIgbj1cImRhdGEtdGxpdGVcIjtlPWV8fHt9LCh0LnRvb2x0aXB8fGZ1bmN0aW9uKHQsZSl7ZnVuY3Rpb24gbygpe3RsaXRlLmhpZGUodCwhMCl9ZnVuY3Rpb24gbCgpe3J8fChyPWZ1bmN0aW9uKHQsZSxpKXtmdW5jdGlvbiBuKCl7by5jbGFzc05hbWU9XCJ0bGl0ZSB0bGl0ZS1cIityK3M7dmFyIGU9dC5vZmZzZXRUb3AsaT10Lm9mZnNldExlZnQ7by5vZmZzZXRQYXJlbnQ9PT10JiYoZT1pPTApO3ZhciBuPXQub2Zmc2V0V2lkdGgsbD10Lm9mZnNldEhlaWdodCxkPW8ub2Zmc2V0SGVpZ2h0LGY9by5vZmZzZXRXaWR0aCxhPWkrbi8yO28uc3R5bGUudG9wPShcInNcIj09PXI/ZS1kLTEwOlwiblwiPT09cj9lK2wrMTA6ZStsLzItZC8yKStcInB4XCIsby5zdHlsZS5sZWZ0PShcIndcIj09PXM/aTpcImVcIj09PXM/aStuLWY6XCJ3XCI9PT1yP2krbisxMDpcImVcIj09PXI/aS1mLTEwOmEtZi8yKStcInB4XCJ9dmFyIG89ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNwYW5cIiksbD1pLmdyYXZ8fHQuZ2V0QXR0cmlidXRlKFwiZGF0YS10bGl0ZVwiKXx8XCJuXCI7by5pbm5lckhUTUw9ZSx0LmFwcGVuZENoaWxkKG8pO3ZhciByPWxbMF18fFwiXCIscz1sWzFdfHxcIlwiO24oKTt2YXIgZD1vLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO3JldHVyblwic1wiPT09ciYmZC50b3A8MD8ocj1cIm5cIixuKCkpOlwiblwiPT09ciYmZC5ib3R0b20+d2luZG93LmlubmVySGVpZ2h0PyhyPVwic1wiLG4oKSk6XCJlXCI9PT1yJiZkLmxlZnQ8MD8ocj1cIndcIixuKCkpOlwid1wiPT09ciYmZC5yaWdodD53aW5kb3cuaW5uZXJXaWR0aCYmKHI9XCJlXCIsbigpKSxvLmNsYXNzTmFtZSs9XCIgdGxpdGUtdmlzaWJsZVwiLG99KHQsZCxlKSl9dmFyIHIscyxkO3JldHVybiB0LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWRvd25cIixvKSx0LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsbyksdC50b29sdGlwPXtzaG93OmZ1bmN0aW9uKCl7ZD10LnRpdGxlfHx0LmdldEF0dHJpYnV0ZShuKXx8ZCx0LnRpdGxlPVwiXCIsdC5zZXRBdHRyaWJ1dGUobixcIlwiKSxkJiYhcyYmKHM9c2V0VGltZW91dChsLGk/MTUwOjEpKX0saGlkZTpmdW5jdGlvbih0KXtpZihpPT09dCl7cz1jbGVhclRpbWVvdXQocyk7dmFyIGU9ciYmci5wYXJlbnROb2RlO2UmJmUucmVtb3ZlQ2hpbGQocikscj12b2lkIDB9fX19KHQsZSkpLnNob3coKX0sdGxpdGUuaGlkZT1mdW5jdGlvbih0LGUpe3QudG9vbHRpcCYmdC50b29sdGlwLmhpZGUoZSl9LFwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGUmJm1vZHVsZS5leHBvcnRzJiYobW9kdWxlLmV4cG9ydHM9dGxpdGUpOyIsIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkoezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1widXNlIHN0cmljdFwiO3ZhciBfdmFsaWRGb3JtPXJlcXVpcmUoXCIuL3NyYy92YWxpZC1mb3JtXCIpO3ZhciBfdmFsaWRGb3JtMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF92YWxpZEZvcm0pO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKXtyZXR1cm4gb2JqJiZvYmouX19lc01vZHVsZT9vYmo6e2RlZmF1bHQ6b2JqfX13aW5kb3cuVmFsaWRGb3JtPV92YWxpZEZvcm0yLmRlZmF1bHQ7d2luZG93LlZhbGlkRm9ybS50b2dnbGVJbnZhbGlkQ2xhc3M9X3ZhbGlkRm9ybS50b2dnbGVJbnZhbGlkQ2xhc3M7d2luZG93LlZhbGlkRm9ybS5oYW5kbGVDdXN0b21NZXNzYWdlcz1fdmFsaWRGb3JtLmhhbmRsZUN1c3RvbU1lc3NhZ2VzO3dpbmRvdy5WYWxpZEZvcm0uaGFuZGxlQ3VzdG9tTWVzc2FnZURpc3BsYXk9X3ZhbGlkRm9ybS5oYW5kbGVDdXN0b21NZXNzYWdlRGlzcGxheX0se1wiLi9zcmMvdmFsaWQtZm9ybVwiOjN9XSwyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6dHJ1ZX0pO2V4cG9ydHMuY2xvbmU9Y2xvbmU7ZXhwb3J0cy5kZWZhdWx0cz1kZWZhdWx0cztleHBvcnRzLmluc2VydEFmdGVyPWluc2VydEFmdGVyO2V4cG9ydHMuaW5zZXJ0QmVmb3JlPWluc2VydEJlZm9yZTtleHBvcnRzLmZvckVhY2g9Zm9yRWFjaDtleHBvcnRzLmRlYm91bmNlPWRlYm91bmNlO2Z1bmN0aW9uIGNsb25lKG9iail7dmFyIGNvcHk9e307Zm9yKHZhciBhdHRyIGluIG9iail7aWYob2JqLmhhc093blByb3BlcnR5KGF0dHIpKWNvcHlbYXR0cl09b2JqW2F0dHJdfXJldHVybiBjb3B5fWZ1bmN0aW9uIGRlZmF1bHRzKG9iaixkZWZhdWx0T2JqZWN0KXtvYmo9Y2xvbmUob2JqfHx7fSk7Zm9yKHZhciBrIGluIGRlZmF1bHRPYmplY3Qpe2lmKG9ialtrXT09PXVuZGVmaW5lZClvYmpba109ZGVmYXVsdE9iamVjdFtrXX1yZXR1cm4gb2JqfWZ1bmN0aW9uIGluc2VydEFmdGVyKHJlZk5vZGUsbm9kZVRvSW5zZXJ0KXt2YXIgc2libGluZz1yZWZOb2RlLm5leHRTaWJsaW5nO2lmKHNpYmxpbmcpe3ZhciBfcGFyZW50PXJlZk5vZGUucGFyZW50Tm9kZTtfcGFyZW50Lmluc2VydEJlZm9yZShub2RlVG9JbnNlcnQsc2libGluZyl9ZWxzZXtwYXJlbnQuYXBwZW5kQ2hpbGQobm9kZVRvSW5zZXJ0KX19ZnVuY3Rpb24gaW5zZXJ0QmVmb3JlKHJlZk5vZGUsbm9kZVRvSW5zZXJ0KXt2YXIgcGFyZW50PXJlZk5vZGUucGFyZW50Tm9kZTtwYXJlbnQuaW5zZXJ0QmVmb3JlKG5vZGVUb0luc2VydCxyZWZOb2RlKX1mdW5jdGlvbiBmb3JFYWNoKGl0ZW1zLGZuKXtpZighaXRlbXMpcmV0dXJuO2lmKGl0ZW1zLmZvckVhY2gpe2l0ZW1zLmZvckVhY2goZm4pfWVsc2V7Zm9yKHZhciBpPTA7aTxpdGVtcy5sZW5ndGg7aSsrKXtmbihpdGVtc1tpXSxpLGl0ZW1zKX19fWZ1bmN0aW9uIGRlYm91bmNlKG1zLGZuKXt2YXIgdGltZW91dD12b2lkIDA7dmFyIGRlYm91bmNlZEZuPWZ1bmN0aW9uIGRlYm91bmNlZEZuKCl7Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO3RpbWVvdXQ9c2V0VGltZW91dChmbixtcyl9O3JldHVybiBkZWJvdW5jZWRGbn19LHt9XSwzOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6dHJ1ZX0pO2V4cG9ydHMudG9nZ2xlSW52YWxpZENsYXNzPXRvZ2dsZUludmFsaWRDbGFzcztleHBvcnRzLmhhbmRsZUN1c3RvbU1lc3NhZ2VzPWhhbmRsZUN1c3RvbU1lc3NhZ2VzO2V4cG9ydHMuaGFuZGxlQ3VzdG9tTWVzc2FnZURpc3BsYXk9aGFuZGxlQ3VzdG9tTWVzc2FnZURpc3BsYXk7ZXhwb3J0cy5kZWZhdWx0PXZhbGlkRm9ybTt2YXIgX3V0aWw9cmVxdWlyZShcIi4vdXRpbFwiKTtmdW5jdGlvbiB0b2dnbGVJbnZhbGlkQ2xhc3MoaW5wdXQsaW52YWxpZENsYXNzKXtpbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiaW52YWxpZFwiLGZ1bmN0aW9uKCl7aW5wdXQuY2xhc3NMaXN0LmFkZChpbnZhbGlkQ2xhc3MpfSk7aW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsZnVuY3Rpb24oKXtpZihpbnB1dC52YWxpZGl0eS52YWxpZCl7aW5wdXQuY2xhc3NMaXN0LnJlbW92ZShpbnZhbGlkQ2xhc3MpfX0pfXZhciBlcnJvclByb3BzPVtcImJhZElucHV0XCIsXCJwYXR0ZXJuTWlzbWF0Y2hcIixcInJhbmdlT3ZlcmZsb3dcIixcInJhbmdlVW5kZXJmbG93XCIsXCJzdGVwTWlzbWF0Y2hcIixcInRvb0xvbmdcIixcInRvb1Nob3J0XCIsXCJ0eXBlTWlzbWF0Y2hcIixcInZhbHVlTWlzc2luZ1wiLFwiY3VzdG9tRXJyb3JcIl07ZnVuY3Rpb24gZ2V0Q3VzdG9tTWVzc2FnZShpbnB1dCxjdXN0b21NZXNzYWdlcyl7Y3VzdG9tTWVzc2FnZXM9Y3VzdG9tTWVzc2FnZXN8fHt9O3ZhciBsb2NhbEVycm9yUHJvcHM9W2lucHV0LnR5cGUrXCJNaXNtYXRjaFwiXS5jb25jYXQoZXJyb3JQcm9wcyk7dmFyIHZhbGlkaXR5PWlucHV0LnZhbGlkaXR5O2Zvcih2YXIgaT0wO2k8bG9jYWxFcnJvclByb3BzLmxlbmd0aDtpKyspe3ZhciBwcm9wPWxvY2FsRXJyb3JQcm9wc1tpXTtpZih2YWxpZGl0eVtwcm9wXSl7cmV0dXJuIGlucHV0LmdldEF0dHJpYnV0ZShcImRhdGEtXCIrcHJvcCl8fGN1c3RvbU1lc3NhZ2VzW3Byb3BdfX19ZnVuY3Rpb24gaGFuZGxlQ3VzdG9tTWVzc2FnZXMoaW5wdXQsY3VzdG9tTWVzc2FnZXMpe2Z1bmN0aW9uIGNoZWNrVmFsaWRpdHkoKXt2YXIgbWVzc2FnZT1pbnB1dC52YWxpZGl0eS52YWxpZD9udWxsOmdldEN1c3RvbU1lc3NhZ2UoaW5wdXQsY3VzdG9tTWVzc2FnZXMpO2lucHV0LnNldEN1c3RvbVZhbGlkaXR5KG1lc3NhZ2V8fFwiXCIpfWlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLGNoZWNrVmFsaWRpdHkpO2lucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnZhbGlkXCIsY2hlY2tWYWxpZGl0eSl9ZnVuY3Rpb24gaGFuZGxlQ3VzdG9tTWVzc2FnZURpc3BsYXkoaW5wdXQsb3B0aW9ucyl7dmFyIHZhbGlkYXRpb25FcnJvckNsYXNzPW9wdGlvbnMudmFsaWRhdGlvbkVycm9yQ2xhc3MsdmFsaWRhdGlvbkVycm9yUGFyZW50Q2xhc3M9b3B0aW9ucy52YWxpZGF0aW9uRXJyb3JQYXJlbnRDbGFzcyxlcnJvclBsYWNlbWVudD1vcHRpb25zLmVycm9yUGxhY2VtZW50O2Z1bmN0aW9uIGNoZWNrVmFsaWRpdHkob3B0aW9ucyl7dmFyIGluc2VydEVycm9yPW9wdGlvbnMuaW5zZXJ0RXJyb3I7dmFyIHBhcmVudE5vZGU9aW5wdXQucGFyZW50Tm9kZTt2YXIgZXJyb3JOb2RlPXBhcmVudE5vZGUucXVlcnlTZWxlY3RvcihcIi5cIit2YWxpZGF0aW9uRXJyb3JDbGFzcyl8fGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7aWYoIWlucHV0LnZhbGlkaXR5LnZhbGlkJiZpbnB1dC52YWxpZGF0aW9uTWVzc2FnZSl7ZXJyb3JOb2RlLmNsYXNzTmFtZT12YWxpZGF0aW9uRXJyb3JDbGFzcztlcnJvck5vZGUudGV4dENvbnRlbnQ9aW5wdXQudmFsaWRhdGlvbk1lc3NhZ2U7aWYoaW5zZXJ0RXJyb3Ipe2Vycm9yUGxhY2VtZW50PT09XCJiZWZvcmVcIj8oMCxfdXRpbC5pbnNlcnRCZWZvcmUpKGlucHV0LGVycm9yTm9kZSk6KDAsX3V0aWwuaW5zZXJ0QWZ0ZXIpKGlucHV0LGVycm9yTm9kZSk7cGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKHZhbGlkYXRpb25FcnJvclBhcmVudENsYXNzKX19ZWxzZXtwYXJlbnROb2RlLmNsYXNzTGlzdC5yZW1vdmUodmFsaWRhdGlvbkVycm9yUGFyZW50Q2xhc3MpO2Vycm9yTm9kZS5yZW1vdmUoKX19aW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsZnVuY3Rpb24oKXtjaGVja1ZhbGlkaXR5KHtpbnNlcnRFcnJvcjpmYWxzZX0pfSk7aW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImludmFsaWRcIixmdW5jdGlvbihlKXtlLnByZXZlbnREZWZhdWx0KCk7Y2hlY2tWYWxpZGl0eSh7aW5zZXJ0RXJyb3I6dHJ1ZX0pfSl9dmFyIGRlZmF1bHRPcHRpb25zPXtpbnZhbGlkQ2xhc3M6XCJpbnZhbGlkXCIsdmFsaWRhdGlvbkVycm9yQ2xhc3M6XCJ2YWxpZGF0aW9uLWVycm9yXCIsdmFsaWRhdGlvbkVycm9yUGFyZW50Q2xhc3M6XCJoYXMtdmFsaWRhdGlvbi1lcnJvclwiLGN1c3RvbU1lc3NhZ2VzOnt9LGVycm9yUGxhY2VtZW50OlwiYmVmb3JlXCJ9O2Z1bmN0aW9uIHZhbGlkRm9ybShlbGVtZW50LG9wdGlvbnMpe2lmKCFlbGVtZW50fHwhZWxlbWVudC5ub2RlTmFtZSl7dGhyb3cgbmV3IEVycm9yKFwiRmlyc3QgYXJnIHRvIHZhbGlkRm9ybSBtdXN0IGJlIGEgZm9ybSwgaW5wdXQsIHNlbGVjdCwgb3IgdGV4dGFyZWFcIil9dmFyIGlucHV0cz12b2lkIDA7dmFyIHR5cGU9ZWxlbWVudC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO29wdGlvbnM9KDAsX3V0aWwuZGVmYXVsdHMpKG9wdGlvbnMsZGVmYXVsdE9wdGlvbnMpO2lmKHR5cGU9PT1cImZvcm1cIil7aW5wdXRzPWVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChcImlucHV0LCBzZWxlY3QsIHRleHRhcmVhXCIpO2ZvY3VzSW52YWxpZElucHV0KGVsZW1lbnQsaW5wdXRzKX1lbHNlIGlmKHR5cGU9PT1cImlucHV0XCJ8fHR5cGU9PT1cInNlbGVjdFwifHx0eXBlPT09XCJ0ZXh0YXJlYVwiKXtpbnB1dHM9W2VsZW1lbnRdfWVsc2V7dGhyb3cgbmV3IEVycm9yKFwiT25seSBmb3JtLCBpbnB1dCwgc2VsZWN0LCBvciB0ZXh0YXJlYSBlbGVtZW50cyBhcmUgc3VwcG9ydGVkXCIpfXZhbGlkRm9ybUlucHV0cyhpbnB1dHMsb3B0aW9ucyl9ZnVuY3Rpb24gZm9jdXNJbnZhbGlkSW5wdXQoZm9ybSxpbnB1dHMpe3ZhciBmb2N1c0ZpcnN0PSgwLF91dGlsLmRlYm91bmNlKSgxMDAsZnVuY3Rpb24oKXt2YXIgaW52YWxpZE5vZGU9Zm9ybS5xdWVyeVNlbGVjdG9yKFwiOmludmFsaWRcIik7aWYoaW52YWxpZE5vZGUpaW52YWxpZE5vZGUuZm9jdXMoKX0pOygwLF91dGlsLmZvckVhY2gpKGlucHV0cyxmdW5jdGlvbihpbnB1dCl7cmV0dXJuIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnZhbGlkXCIsZm9jdXNGaXJzdCl9KX1mdW5jdGlvbiB2YWxpZEZvcm1JbnB1dHMoaW5wdXRzLG9wdGlvbnMpe3ZhciBpbnZhbGlkQ2xhc3M9b3B0aW9ucy5pbnZhbGlkQ2xhc3MsY3VzdG9tTWVzc2FnZXM9b3B0aW9ucy5jdXN0b21NZXNzYWdlczsoMCxfdXRpbC5mb3JFYWNoKShpbnB1dHMsZnVuY3Rpb24oaW5wdXQpe3RvZ2dsZUludmFsaWRDbGFzcyhpbnB1dCxpbnZhbGlkQ2xhc3MpO2hhbmRsZUN1c3RvbU1lc3NhZ2VzKGlucHV0LGN1c3RvbU1lc3NhZ2VzKTtoYW5kbGVDdXN0b21NZXNzYWdlRGlzcGxheShpbnB1dCxvcHRpb25zKX0pfX0se1wiLi91dGlsXCI6Mn1dfSx7fSxbMV0pOyIsIi8vIE1pbm5Qb3N0IEdpdmluZyBwbHVnaW5cbi8vIHRoZSBzZW1pLWNvbG9uIGJlZm9yZSBmdW5jdGlvbiBpbnZvY2F0aW9uIGlzIGEgc2FmZXR5IG5ldCBhZ2FpbnN0IGNvbmNhdGVuYXRlZFxuLy8gc2NyaXB0cyBhbmQvb3Igb3RoZXIgcGx1Z2lucyB3aGljaCBtYXkgbm90IGJlIGNsb3NlZCBwcm9wZXJseS5cbjsoZnVuY3Rpb24gKCAkLCB3aW5kb3csIGRvY3VtZW50LCB1bmRlZmluZWQgKSB7XG5cbiAgLy8gdW5kZWZpbmVkIGlzIHVzZWQgaGVyZSBhcyB0aGUgdW5kZWZpbmVkIGdsb2JhbCB2YXJpYWJsZSBpbiBFQ01BU2NyaXB0IDMgaXNcbiAgLy8gbXV0YWJsZSAoaWUuIGl0IGNhbiBiZSBjaGFuZ2VkIGJ5IHNvbWVvbmUgZWxzZSkuIHVuZGVmaW5lZCBpc24ndCByZWFsbHkgYmVpbmdcbiAgLy8gcGFzc2VkIGluIHNvIHdlIGNhbiBlbnN1cmUgdGhlIHZhbHVlIG9mIGl0IGlzIHRydWx5IHVuZGVmaW5lZC4gSW4gRVM1LCB1bmRlZmluZWRcbiAgLy8gY2FuIG5vIGxvbmdlciBiZSBtb2RpZmllZC5cblxuICAvLyB3aW5kb3cgYW5kIGRvY3VtZW50IGFyZSBwYXNzZWQgdGhyb3VnaCBhcyBsb2NhbCB2YXJpYWJsZSByYXRoZXIgdGhhbiBnbG9iYWxcbiAgLy8gYXMgdGhpcyAoc2xpZ2h0bHkpIHF1aWNrZW5zIHRoZSByZXNvbHV0aW9uIHByb2Nlc3MgYW5kIGNhbiBiZSBtb3JlIGVmZmljaWVudGx5XG4gIC8vIG1pbmlmaWVkIChlc3BlY2lhbGx5IHdoZW4gYm90aCBhcmUgcmVndWxhcmx5IHJlZmVyZW5jZWQgaW4geW91ciBwbHVnaW4pLlxuXG4gIC8vIENyZWF0ZSB0aGUgZGVmYXVsdHMgb25jZVxuICB2YXIgcGx1Z2luTmFtZSA9ICdtaW5ucG9zdF9naXZpbmcnLFxuICBkZWZhdWx0cyA9IHtcbiAgICAnZGVidWcnIDogZmFsc2UsIC8vIHRoaXMgY2FuIGJlIHNldCB0byB0cnVlIG9uIHBhZ2UgbGV2ZWwgb3B0aW9uc1xuICAgICdzdHJpcGVfcHVibGlzaGFibGVfa2V5JyA6ICcnLFxuICAgICdwbGFpZF9lbnYnIDogJycsXG4gICAgJ3BsYWlkX2xpbmsnIDogJyNhdXRob3JpemUtYWNoJyxcbiAgICAnbWlubnBvc3Rfcm9vdCcgOiAnaHR0cHM6Ly93d3cubWlubnBvc3QuY29tJyxcbiAgICAncHJvZ3Jlc3Nfc2VsZWN0b3InIDogJy5tLXN1cHBvcnQtcHJvZ3Jlc3MnLFxuICAgICdmb3JtX3NlbGVjdG9yJyA6ICcubS1mb3JtJyxcbiAgICAnZG9uYXRlX2Zvcm1fc2VsZWN0b3InOiAnI2RvbmF0ZScsXG4gICAgJ2NvbmZpcm1fZm9ybV9zZWxlY3RvcicgOiAnI2NvbmZpcm0nLFxuICAgICdmaW5pc2hfc2VjdGlvbl9zZWxlY3RvcicgOiAnI3BhbmVsLS1jb25maXJtYXRpb24nLFxuICAgICdwYXlfY2NfcHJvY2Vzc2luZ19zZWxlY3RvcicgOiAnaW5wdXRbbmFtZT1cInBheV9mZWVzXCJdJyxcbiAgICAnZmVlX2Ftb3VudCcgOiAnLnByb2Nlc3NpbmctYW1vdW50JyxcbiAgICAnbGV2ZWxfYW1vdW50X3NlbGVjdG9yJyA6ICcjcGFuZWwtLXBheSAuYW1vdW50IC5sZXZlbC1hbW91bnQnLCAvLyB3ZSBjYW4gbWF5YmUgZ2V0IHJpZCBvZiB0aGlzXG4gICAgJ29yaWdpbmFsX2Ftb3VudF9zZWxlY3RvcicgOiAnW25hbWU9XCJhbW91bnRcIl0nLFxuICAgICdmYWlyX21hcmtldF92YWx1ZV9zZWxlY3RvcicgOiAnI2ZhaXJfbWFya2V0X3ZhbHVlJyxcbiAgICAnZnVsbF9hbW91bnRfc2VsZWN0b3InIDogJy5mdWxsLWFtb3VudCcsXG4gICAgJ2luc3RhbGxtZW50X3BlcmlvZF9zZWxlY3RvcicgOiAnW25hbWU9XCJpbnN0YWxsbWVudF9wZXJpb2RcIl0nLFxuICAgICduYW1lX3NlbGVjdG9yJyA6ICcubS1mb3JtLWl0ZW0tZGlzcGxheS1uYW1lJyxcbiAgICAnaW5faG9ub3Jfb3JfbWVtb3J5X2ZpZWxkX3NlbGVjdG9yJyA6ICcubS1mb3JtLWl0ZW0taG9ub3ItbWVtb3J5JyxcbiAgICAnaG9ub3Jfb3JfbWVtb3J5X2Nob29zZXInIDogJ2lucHV0W25hbWU9XCJpbl9ob25vcl9vcl9tZW1vcnlcIl0nLCAvLyByYWRpbyBmaWVsZHNcbiAgICAnaG9ub3JfdHlwZV9zZWxlY3RvcicgOiAnLmEtaG9ub3ItdHlwZScsIC8vIHNwYW4gaW5zaWRlIGxhYmVsXG4gICAgJ2hvbm9yX21lbW9yeV9pbnB1dF9ncm91cCcgOiAnLmEtaG9ub3Itb3ItbWVtb3J5JywgLy8gaG9sZHMgdGhlIGZvcm0gZmllbGRcbiAgICAnYW5vbnltb3VzX3NlbGVjdG9yJyA6ICcjYW5vbnltb3VzJyxcbiAgICAnc2hvd19iaWxsaW5nX2NvdW50cnlfc2VsZWN0b3InIDogJyNiaWxsaW5nX3Nob3dfY291bnRyeScsXG4gICAgJ2JpbGxpbmdfY291bnRyeV9zZWxlY3RvcicgOiAnLm0tZm9ybS1pdGVtLWNvdW50cnknLFxuICAgICdzaG93X3NoaXBwaW5nX2NvdW50cnlfc2VsZWN0b3InIDogJyNzaGlwcGluZ19zaG93X2NvdW50cnknLFxuICAgICdzaGlwcGluZ19jb3VudHJ5X3NlbGVjdG9yJyA6ICcubS1mb3JtLWl0ZW0tc2hpcHBpbmctY291bnRyeScsXG4gICAgJ3NoaXBwaW5nX2FkZHJlc3Nfc2VsZWN0b3InIDogJy5tLWZvcm0taXRlbS1zaGlwcGluZy1hZGRyZXNzJyxcbiAgICAndXNlX2Zvcl9zaGlwcGluZ19zZWxlY3RvcicgOiAnI3VzZWZvcnNoaXBwaW5nJyxcbiAgICAnZW1haWxfZmllbGRfc2VsZWN0b3InIDogJyNlbWFpbCcsXG4gICAgJ3Bhc3N3b3JkX2ZpZWxkX3NlbGVjdG9yJyA6ICcjcGFzc3dvcmQnLFxuICAgICdmaXJzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yJyA6ICcjZmlyc3RfbmFtZScsXG4gICAgJ2xhc3RfbmFtZV9maWVsZF9zZWxlY3RvcicgOiAnI2xhc3RfbmFtZScsXG4gICAgJ2JpbGxpbmdfc3RyZWV0X2ZpZWxkX3NlbGVjdG9yJyA6ICcjYmlsbGluZ19zdHJlZXQnLFxuICAgICdiaWxsaW5nX2NpdHlfZmllbGRfc2VsZWN0b3InIDogJyNiaWxsaW5nX2NpdHknLFxuICAgICdiaWxsaW5nX3N0YXRlX2ZpZWxkX3NlbGVjdG9yJyA6ICcjYmlsbGluZ19zdGF0ZScsXG4gICAgJ2JpbGxpbmdfemlwX2ZpZWxkX3NlbGVjdG9yJzogJyNiaWxsaW5nX3ppcCcsXG4gICAgJ2JpbGxpbmdfY291bnRyeV9maWVsZF9zZWxlY3RvcicgOiAnI2JpbGxpbmdfY291bnRyeScsXG4gICAgJ3NoaXBwaW5nX3N0YXRlX2ZpZWxkX3NlbGVjdG9yJyA6ICcjc2hpcHBpbmdfc3RhdGUnLFxuICAgICdzaGlwcGluZ196aXBfZmllbGRfc2VsZWN0b3InOiAnI3NoaXBwaW5nX3ppcCcsXG4gICAgJ3NoaXBwaW5nX2NvdW50cnlfZmllbGRfc2VsZWN0b3InIDogJyNzaGlwcGluZ19jb3VudHJ5JyxcbiAgICAnY3JlYXRlX21wX3NlbGVjdG9yJyA6ICcjY3JlYXRlbXBhY2NvdW50JyxcbiAgICAncGFzc3dvcmRfc2VsZWN0b3InIDogJy5tLWZvcm0taXRlbS1wYXNzd29yZCcsXG4gICAgJ2FkZGl0aW9uYWxfYW1vdW50X2ZpZWxkJyA6ICcjYWRkaXRpb25hbF9kb25hdGlvbicsXG4gICAgJ3NoaXBwaW5nX3NlbGVjdG9yJyA6ICdmaWVsZHNldC5tLXNoaXBwaW5nLWluZm9ybWF0aW9uJyxcbiAgICAnY2hvb3NlX3BheW1lbnQnIDogJyNjaG9vc2UtcGF5bWVudC1tZXRob2QnLFxuICAgICdwYXltZW50X21ldGhvZF9zZWxlY3RvcicgOiAnLnBheW1lbnQtbWV0aG9kJyxcbiAgICAnY2NfbnVtX3NlbGVjdG9yJyA6ICcjY2FyZC1udW1iZXInLFxuICAgICdjY19leHBfc2VsZWN0b3InIDogJyNjYXJkLWV4cGlyeScsXG4gICAgJ2NjX2N2Y19zZWxlY3RvcicgOiAnI2NhcmQtY3ZjJyxcbiAgICAncGF5X2J1dHRvbl9zZWxlY3RvcicgOiAnLmEtYnV0dG9uLXBheScsXG4gICAgJ29wcF9pZF9zZWxlY3RvcicgOiAnI2xvY2tfa2V5JywgLy8gd2UgdXNlIHRoaXMgdmFsdWUgYXMgdGhlIEdvb2dsZSBBbmFseXRpY3MgdHJhbnNhY3Rpb24gSURcbiAgICAnbmV3c2xldHRlcl9ncm91cF9zZWxlY3RvcicgOiAnLnN1cHBvcnQtbmV3c2xldHRlcnMnXG4gIH07IC8vIGVuZCBkZWZhdWx0c1xuXG4gIC8vIFRoZSBhY3R1YWwgcGx1Z2luIGNvbnN0cnVjdG9yXG4gIGZ1bmN0aW9uIFBsdWdpbiggZWxlbWVudCwgb3B0aW9ucyApIHtcblxuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG5cbiAgICAvLyBqUXVlcnkgaGFzIGFuIGV4dGVuZCBtZXRob2Qgd2hpY2ggbWVyZ2VzIHRoZSBjb250ZW50cyBvZiB0d28gb3JcbiAgICAvLyBtb3JlIG9iamVjdHMsIHN0b3JpbmcgdGhlIHJlc3VsdCBpbiB0aGUgZmlyc3Qgb2JqZWN0LiBUaGUgZmlyc3Qgb2JqZWN0XG4gICAgLy8gaXMgZ2VuZXJhbGx5IGVtcHR5IGFzIHdlIGRvbid0IHdhbnQgdG8gYWx0ZXIgdGhlIGRlZmF1bHQgb3B0aW9ucyBmb3JcbiAgICAvLyBmdXR1cmUgaW5zdGFuY2VzIG9mIHRoZSBwbHVnaW5cbiAgICB0aGlzLm9wdGlvbnMgPSAkLmV4dGVuZCgge30sIGRlZmF1bHRzLCBvcHRpb25zICk7XG5cbiAgICB0aGlzLl9kZWZhdWx0cyA9IGRlZmF1bHRzO1xuICAgIHRoaXMuX25hbWUgPSBwbHVnaW5OYW1lO1xuXG4gICAgdGhpcy5pbml0KCk7XG4gIH0gLy8gZW5kIGNvbnN0cnVjdG9yXG5cbiAgUGx1Z2luLnByb3RvdHlwZSA9IHtcblxuICAgIGluaXQ6IGZ1bmN0aW9uKHJlc2V0LCBhbW91bnQpIHtcblxuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCAnbm8tanMnICk7XG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoICdqcycgKTtcblxuICAgICAgLy8gUGxhY2UgaW5pdGlhbGl6YXRpb24gbG9naWMgaGVyZVxuICAgICAgLy8gWW91IGFscmVhZHkgaGF2ZSBhY2Nlc3MgdG8gdGhlIERPTSBlbGVtZW50IGFuZFxuICAgICAgLy8gdGhlIG9wdGlvbnMgdmlhIHRoZSBpbnN0YW5jZSwgZS5nLiB0aGlzLmVsZW1lbnRcbiAgICAgIC8vIGFuZCB0aGlzLm9wdGlvbnNcbiAgICAgIC8vIHlvdSBjYW4gYWRkIG1vcmUgZnVuY3Rpb25zIGxpa2UgdGhlIG9uZSBiZWxvdyBhbmRcbiAgICAgIC8vIGNhbGwgdGhlbSBsaWtlIHNvOiB0aGlzLnlvdXJPdGhlckZ1bmN0aW9uKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKS5cblxuICAgICAgLy8gbW9kaWZ5IG9wdGlvbnMgYXMgbmVlZGVkXG4gICAgICAvL3ZhciB0aGlzLm9wdGlvbnMuYW1vdW50ID0gJyc7XG4gICAgICBpZiAocmVzZXQgIT09IHRydWUpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLmFtb3VudCA9IHBhcnNlRmxvYXQoJCh0aGlzLm9wdGlvbnMubGV2ZWxfYW1vdW50X3NlbGVjdG9yLCB0aGlzLmVsZW1lbnQpLnRleHQoKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm9wdGlvbnMuYW1vdW50ID0gYW1vdW50O1xuICAgICAgfVxuICAgICAgdGhpcy5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCAgICAgPSBwYXJzZUludCgkKHRoaXMub3B0aW9ucy5vcmlnaW5hbF9hbW91bnRfc2VsZWN0b3IsIHRoaXMuZWxlbWVudCkudmFsKCksIDEwKTtcbiAgICAgIHRoaXMub3B0aW9ucy5wcm9jZXNzaW5nX2ZlZSAgICAgID0gKE1hdGgucm91bmQocGFyc2VGbG9hdCh0aGlzLm9wdGlvbnMuZmVlX2Ftb3VudCkqTWF0aC5wb3coMTAsMikpL01hdGgucG93KDEwLDIpKS50b0ZpeGVkKDIpO1xuICAgICAgdGhpcy5vcHRpb25zLnByb2Nlc3NpbmdfZmVlX3RleHQgPSB0aGlzLm9wdGlvbnMucHJvY2Vzc2luZ19mZWU7XG4gICAgICB0aGlzLm9wdGlvbnMuY3JlYXRlX2FjY291bnQgICAgICA9IGZhbHNlO1xuXG4gICAgICB2YXIgYnV0dG9uX3RleHQgPSAkKHRoaXMub3B0aW9ucy5wYXlfYnV0dG9uX3NlbGVjdG9yKS50ZXh0KCk7XG4gICAgICB0aGlzLm9wdGlvbnMuYnV0dG9uX3RleHQgPSBidXR0b25fdGV4dDtcblxuICAgICAgdGhpcy5zdHJpcGUgPSBTdHJpcGUodGhpcy5vcHRpb25zLnN0cmlwZV9wdWJsaXNoYWJsZV9rZXkpO1xuICAgICAgdGhpcy5lbGVtZW50cyA9IHRoaXMuc3RyaXBlLmVsZW1lbnRzKHtcbiAgICAgICAgZm9udHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICAvLyBpbnRlZ3JhdGUgeW91ciBmb250IGludG8gc3RyaXBlXG4gICAgICAgICAgICBjc3NTcmM6ICdodHRwczovL3VzZS50eXBla2l0Lm5ldC9jeGo3ZnpnLmNzcycsXG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9KTtcblxuICAgICAgLy8gdXNlIGEgcmVmZXJyZXIgZm9yIGVkaXQgbGluayBpZiB3ZSBoYXZlIG9uZVxuICAgICAgaWYgKGRvY3VtZW50LnJlZmVycmVyICE9PSAnJykge1xuICAgICAgICAkKCcjZWRpdF91cmwnKS5wcm9wKCdocmVmJywgZG9jdW1lbnQucmVmZXJyZXIpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5vcHRpb25zLmRlYnVnID09PSB0cnVlKSB7XG4gICAgICAgIHRoaXMuZGVidWcodGhpcy5vcHRpb25zKTtcbiAgICAgICAgLy8gcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBjYWxsIGZ1bmN0aW9uc1xuICAgICAgdGhpcy5hbmFseXRpY3NUcmFja2luZyh0aGlzLm9wdGlvbnMpOyAvLyB0cmFjayBhbmFseXRpY3MgZXZlbnRzXG4gICAgICB0aGlzLmFtb3VudEFzUmFkaW8odGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBpZiB0aGUgYW1vdW50IGZpZWxkIGlzIGEgcmFkaW8gYnV0dG9uXG4gICAgICB0aGlzLmFtb3VudFVwZGF0ZWQodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBpZiB0aGUgYW1vdW50IHRleHQgZmllbGQgY2FuIGNoYW5nZVxuXG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMucGF5X2NjX3Byb2Nlc3Npbmdfc2VsZWN0b3IpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5jcmVkaXRDYXJkUHJvY2Vzc2luZ0ZlZXModGhpcy5vcHRpb25zKTsgLy8gcHJvY2Vzc2luZyBmZWVzXG4gICAgICB9XG4gICAgICBcbiAgICAgIC8vIHRoZSBtYWluIGZvcm0gSUQuIHRoaXMgaXMgbm90IHVzZWQgZm9yIGNhbmNlbGxpbmdcbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLmRvbmF0ZUFub255bW91c2x5KHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gYW5vbnltb3VzXG4gICAgICAgIHRoaXMuaG9ub3JPck1lbW9yeVRvZ2dsZSh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIGluIGhvbm9yIG9yIGluIG1lbW9yeSBvZiBzb21lb25lXG4gICAgICAgIHRoaXMub3V0c2lkZVVuaXRlZFN0YXRlcyh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIG91dHNpZGUgVVNcbiAgICAgICAgdGhpcy5zaGlwcGluZ0FkZHJlc3ModGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBzaGlwcGluZyBhZGRyZXNzXG4gICAgICAgIHRoaXMuYWxsb3dNaW5ucG9zdEFjY291bnQodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBvcHRpb24gZm9yIGNyZWF0aW5nIG1pbm5wb3N0IGFjY291bnRcbiAgICAgICAgdGhpcy5wYXltZW50UmVxdWVzdEJ1dHRvbih0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIGNyZWF0ZSBwYXltZW50cmVxdWVzdCBidXR0b25cbiAgICAgICAgdGhpcy5jaG9vc2VQYXltZW50TWV0aG9kKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gc3dpdGNoIGJldHdlZW4gY2FyZCBhbmQgYWNoXG4gICAgICAgIHRoaXMuY3JlZGl0Q2FyZEZpZWxkcyh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIGRvIHN0dWZmIHdpdGggdGhlIGNyZWRpdCBjYXJkIGZpZWxkc1xuICAgICAgICB0aGlzLnZhbGlkYXRlU2V0dXAodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBzZXR1cCBob3cgdmFsaWRhdGlvbiBlcnJvcnMgd29ya1xuICAgICAgICB0aGlzLmZvcm1TZXR1cCh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIHZhbGlkYXRlIGFuZCBzdWJtaXQgdGhlIGZvcm1cbiAgICAgIH1cblxuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmNvbmZpcm1fZm9ybV9zZWxlY3RvcikubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLnNob3dOZXdzbGV0dGVyU2V0dGluZ3ModGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpO1xuICAgICAgICB0aGlzLmNvbmZpcm1NZXNzYWdlU3VibWl0KHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gc3VibWl0IHRoZSBzdHVmZiBvbiB0aGUgY29uZmlybWF0aW9uIHBhZ2VcbiAgICAgIH1cblxuICAgIH0sIC8vIGluaXRcblxuICAgIGRlYnVnOiBmdW5jdGlvbihtZXNzYWdlKSB7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLmRlYnVnID09PSB0cnVlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgbWVzc2FnZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhtZXNzYWdlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmRpcihtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmRpcih0aGlzKTtcbiAgICAgIH1cbiAgICB9LCAvLyBkZWJ1Z1xuXG4gICAgYW5hbHl0aWNzVHJhY2tpbmc6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgIHZhciBwcm9ncmVzcyA9ICQob3B0aW9ucy5wcm9ncmVzc19zZWxlY3Rvcik7XG4gICAgICB2YXIgc3RlcDtcbiAgICAgIHZhciBuYXZfaXRlbV9jb3VudCA9IDA7XG4gICAgICB2YXIgb3BwX2lkID0gJChvcHRpb25zLm9wcF9pZF9zZWxlY3RvcikudmFsKCk7XG4gICAgICB2YXIgcG9zdF9wdXJjaGFzZSA9IGZhbHNlO1xuICAgICAgaWYgKHByb2dyZXNzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgbmF2X2l0ZW1fY291bnQgPSAkKCdsaScsIHByb2dyZXNzKS5sZW5ndGg7IC8vIGxlbmd0aCBpcyBub3QgemVybyBiYXNlZFxuICAgICAgICBzdGVwID0gJCgnbGkgLmFjdGl2ZScsIHByb2dyZXNzKS5wYXJlbnQoKS5pbmRleCgpICsgMTsgLy8gaW5kZXggaXMgemVybyBiYXNlZFxuICAgICAgfVxuICAgICAgLy8gdGhlcmUgaXMgYSBwcm9ncmVzcyBtZW51LCBBTkQgdGhlcmUgSVMgTk9UIGEgY29uZmlybSBmb3JtIHNlbGVjdG9yXG4gICAgICAvLyBpZiB0aGF0IGlzIHRoZSBjYXNlLCB3ZSdyZSBub3Qgb24gdGhlIHB1cmNoYXNlIHN0ZXBcbiAgICAgIGlmIChwcm9ncmVzcy5sZW5ndGggPiAwICYmICQob3B0aW9ucy5jb25maXJtX2Zvcm1fc2VsZWN0b3IpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAvLyB0aGUgYWN0aXZlIHRhYiBtYXRjaGVzIHRoZSBjb3VudCBvZiBpdGVtcyBBTkQgdGhlcmUgaXMgTk9UIGEgY29uZmlybSBmb3JtIHRvIGJlIHN1Ym1pdHRlZFxuICAgICAgICAvLyB0aGF0IG1lYW5zIHdlJ3JlIG9uIGEgcG9zdCBwdXJjaGFzZSBzdGVwLlxuICAgICAgICBpZiAoc3RlcCA9PT0gbmF2X2l0ZW1fY291bnQgJiYgJChvcHRpb25zLmNvbmZpcm1fZm9ybV9zZWxlY3RvcikubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgc3RlcCA9IHN0ZXAgKyAxO1xuICAgICAgICAgIHBvc3RfcHVyY2hhc2UgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHByb2dyZXNzLmxlbmd0aCA+IDAgJiYgJChvcHRpb25zLmNvbmZpcm1fZm9ybV9zZWxlY3RvcikubGVuZ3RoID4gMCB8fCAkKG9wdGlvbnMuZmluaXNoX3NlY3Rpb25fc2VsZWN0b3IpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgLy8gd2UgYXJlIG9uIHRoZSBjb25maXJtIGZvcm0gc2VsZWN0b3IgYW5kIHRoZXJlIGlzIGEgcHJvZ3Jlc3MgbWVhc3VyZVxuICAgICAgICAvLyBPUiwgd2UgYXJlIG9uIHRoZSBmaW5pc2ggc2VsZWN0b3IgYW5kIHRoZXJlIGlzIE5PVCBhIHByb2dyZXNzIG1lYXN1cmVcbiAgICAgICAgLy8gdGhlc2UgbWVhbiB0aGUgdXNlciBqdXN0IHB1cmNoYXNlZC5cbiAgICAgICAgc3RlcCA9ICdwdXJjaGFzZSc7XG4gICAgICB9IGVsc2UgaWYgKHByb2dyZXNzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLmRlYnVnKCAnc3RlcCBpcyAnICsgc3RlcCArICcgYW5kIG5hdiBpdGVtIGNvdW50IGlzICcgKyBuYXZfaXRlbV9jb3VudCArICcgYW5kIG9wcCBpZCBpcyAnICsgb3BwX2lkICsgJyBhbmQgcG9zdCBwdXJjaGFzZSBpcyAnICsgcG9zdF9wdXJjaGFzZSApO1xuICAgICAgdGhpcy5hbmFseXRpY3NUcmFja2luZ1N0ZXAoc3RlcCwgcG9zdF9wdXJjaGFzZSk7XG4gICAgfSwgLy8gYW5hbHl0aWNzVHJhY2tpbmdcblxuICAgIGFuYWx5dGljc1RyYWNraW5nU3RlcDogZnVuY3Rpb24oc3RlcCwgcG9zdF9wdXJjaGFzZSkge1xuICAgICAgdmFyIHByb2dyZXNzID0gJCh0aGlzLm9wdGlvbnMucHJvZ3Jlc3Nfc2VsZWN0b3IpO1xuICAgICAgdmFyIGFtb3VudCA9ICQodGhpcy5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudF9zZWxlY3RvcikudmFsKCk7XG4gICAgICB2YXIgb3BwX2lkID0gJCh0aGlzLm9wdGlvbnMub3BwX2lkX3NlbGVjdG9yKS52YWwoKTtcbiAgICAgIHZhciBpbnN0YWxsbWVudF9wZXJpb2QgPSAnb25lLXRpbWUnO1xuICAgICAgdmFyIGxldmVsO1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmluc3RhbGxtZW50X3BlcmlvZF9zZWxlY3RvcikubGVuZ3RoID4gMCApIHtcbiAgICAgICAgaW5zdGFsbG1lbnRfcGVyaW9kID0gJCh0aGlzLm9wdGlvbnMuaW5zdGFsbG1lbnRfcGVyaW9kX3NlbGVjdG9yKS52YWwoKTtcbiAgICAgIH1cbiAgICAgIC8vIGlmIHdlJ3JlIG5vdCBhZnRlciB0aGUgcHVyY2hhc2UsIHVzZSBhZGRQcm9kdWN0XG4gICAgICBpZiAocHJvZ3Jlc3MubGVuZ3RoID4gMCAmJiBwb3N0X3B1cmNoYXNlICE9PSB0cnVlKSB7XG4gICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgIGFtb3VudDogYW1vdW50LFxuICAgICAgICAgIGluc3RhbGxtZW50X3BlcmlvZDogaW5zdGFsbG1lbnRfcGVyaW9kXG4gICAgICAgIH07XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgdXJsOiAnL2NhbGN1bGF0ZS1tZW1iZXItbGV2ZWwvJyxcbiAgICAgICAgICBkYXRhOiBkYXRhXG4gICAgICAgIH0pLmRvbmUoZnVuY3Rpb24oIGRhdGEgKSB7XG4gICAgICAgICAgaWYgKCQoZGF0YS5sZXZlbCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGV2ZWwgPSBkYXRhLmxldmVsLmxldmVsO1xuICAgICAgICAgICAgdGhhdC5kZWJ1ZygnYWRkIHByb2R1Y3Q6IGlkIGlzICcgKyAnbWlubnBvc3RfJyArIGxldmVsLnRvTG93ZXJDYXNlKCkgKyAnX21lbWJlcnNoaXAnICsgJyBhbmQgbmFtZSBpcyAnICsgJ01pbm5Qb3N0ICcgKyBsZXZlbC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGxldmVsLnNsaWNlKDEpICsgJyBNZW1iZXJzaGlwJyArICcgYW5kIHZhcmlhbnQgaXMgJyArIGluc3RhbGxtZW50X3BlcmlvZC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGluc3RhbGxtZW50X3BlcmlvZC5zbGljZSgxKSk7XG4gICAgICAgICAgICBnYSgnZWM6YWRkUHJvZHVjdCcsIHtcbiAgICAgICAgICAgICAgJ2lkJzogJ21pbm5wb3N0XycgKyBsZXZlbC50b0xvd2VyQ2FzZSgpICsgJ19tZW1iZXJzaGlwJyxcbiAgICAgICAgICAgICAgJ25hbWUnOiAnTWlublBvc3QgJyArIGxldmVsLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgbGV2ZWwuc2xpY2UoMSkgKyAnIE1lbWJlcnNoaXAnLFxuICAgICAgICAgICAgICAnY2F0ZWdvcnknOiAnRG9uYXRpb24nLFxuICAgICAgICAgICAgICAnYnJhbmQnOiAnTWlublBvc3QnLFxuICAgICAgICAgICAgICAndmFyaWFudCc6IGluc3RhbGxtZW50X3BlcmlvZC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGluc3RhbGxtZW50X3BlcmlvZC5zbGljZSgxKSxcbiAgICAgICAgICAgICAgJ3ByaWNlJzogYW1vdW50LFxuICAgICAgICAgICAgICAncXVhbnRpdHknOiAxXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RlcCA9PT0gJ3B1cmNoYXNlJykge1xuICAgICAgICB0aGlzLmRlYnVnKCdhZGQgYSBwdXJjaGFzZSBhY3Rpb24uIHN0ZXAgaXMgJyArIHN0ZXApO1xuICAgICAgICBnYSgnZWM6c2V0QWN0aW9uJywgc3RlcCx7XG4gICAgICAgICAgJ2lkJzogb3BwX2lkLCAvLyBUcmFuc2FjdGlvbiBpZCAtIFR5cGU6IHN0cmluZ1xuICAgICAgICAgICdhZmZpbGlhdGlvbic6ICdNaW5uUG9zdCcsIC8vIFN0b3JlIG5hbWUgLSBUeXBlOiBzdHJpbmdcbiAgICAgICAgICAncmV2ZW51ZSc6IGFtb3VudCwgLy8gVG90YWwgUmV2ZW51ZSAtIFR5cGU6IG51bWVyaWNcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmRlYnVnKCdhZGQgYSBjaGVja291dCBhY3Rpb24uIHN0ZXAgaXMgJyArIHN0ZXApO1xuICAgICAgICBnYSgnZWM6c2V0QWN0aW9uJywnY2hlY2tvdXQnLCB7XG4gICAgICAgICAgJ3N0ZXAnOiBzdGVwLCAvLyBBIHZhbHVlIG9mIDEgaW5kaWNhdGVzIGZpcnN0IGNoZWNrb3V0IHN0ZXAuIFZhbHVlIG9mIDIgaW5kaWNhdGVzIHNlY29uZCBjaGVja291dCBzdGVwXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBnYSgnc2V0Jywge1xuICAgICAgICBwYWdlOiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUsXG4gICAgICAgIHRpdGxlOiBkb2N1bWVudC50aXRsZVxuICAgICAgfSk7XG4gICAgICBnYSgnc2VuZCcsICdwYWdldmlldycsIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSk7XG5cbiAgICB9LCAvLyBhbmFseXRpY3NUcmFja2luZ1N0ZXBcblxuICAgIGFtb3VudEFzUmFkaW86IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIC8vIHdoZW4gYW1vdW50IGZpZWxkIGlzIGEgcmFkaW8gYnV0dG9uLCB3ZSBuZWVkIHRvIGNoZWNrIGl0IHdoZW5ldmVyIGl0IGNoYW5nZXNcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHRoYXQuc2V0UmFkaW9BbW91bnQoJChvcHRpb25zLm9yaWdpbmFsX2Ftb3VudF9zZWxlY3RvciwgZWxlbWVudCksIGVsZW1lbnQsIG9wdGlvbnMpO1xuICAgICAgJChvcHRpb25zLm9yaWdpbmFsX2Ftb3VudF9zZWxlY3RvciwgZWxlbWVudCkuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGF0LnNldFJhZGlvQW1vdW50KCQodGhpcyksIGVsZW1lbnQsIG9wdGlvbnMpO1xuICAgICAgfSk7XG4gICAgfSwgLy8gYW1vdW50QXNSYWRpb1xuXG4gICAgc2V0UmFkaW9BbW91bnQ6IGZ1bmN0aW9uKGZpZWxkLCBlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB2YXIgc3RyaXBlX3BheW1lbnRfdHlwZSA9IHRoYXQuZ2V0U3RyaXBlUGF5bWVudFR5cGUoKTtcbiAgICAgIHZhciBhbW91bnQgPSAkKG9wdGlvbnMub3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yICsgJzpjaGVja2VkJywgZWxlbWVudCkudmFsKCk7XG4gICAgICBpZiAoZmllbGQuaXMoJzpyYWRpbycpICYmIHR5cGVvZiBhbW91bnQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIG9wdGlvbnMub3JpZ2luYWxfYW1vdW50ID0gcGFyc2VJbnQoYW1vdW50LCAxMCk7XG4gICAgICAgIHRoYXQuY2FsY3VsYXRlRmVlcyh0aGF0Lm9wdGlvbnMub3JpZ2luYWxfYW1vdW50LCBzdHJpcGVfcGF5bWVudF90eXBlKTtcbiAgICAgICAgdGhhdC5zZXRGYWlyTWFya2V0VmFsdWUoZmllbGQpO1xuICAgICAgfVxuICAgIH0sIC8vIHNldFJhZGlvQW1vdW50XG5cbiAgICBhbW91bnRVcGRhdGVkOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICAvLyB3aGVuIG5ldyBhbW91bnQgdGV4dCBmaWVsZCBjYW4gY2hhbmdlLCB3ZSBuZWVkIHRvIGNoYW5nZSB0aGUgaGlkZGVuIGZpZWxkXG4gICAgICAvLyB0aGVyZSBpcyBhbHNvIHBvdGVudGlhbGx5IGFuIGFkZGl0aW9uYWwgYW1vdW50IGZpZWxkIHZhbHVlIHRvIGFkZFxuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdmFyIHN0cmlwZV9wYXltZW50X3R5cGUgPSB0aGF0LmdldFN0cmlwZVBheW1lbnRUeXBlKCk7XG5cbiAgICAgIC8vIHNldCB0aGUgZmFpciBtYXJrZXQgdmFsdWUgaWYgYXBwbGljYWJsZVxuICAgICAgdmFyIGFtb3VudF9zZWxlY3Rvcl9mYWlyX21hcmtldCA9ICQob3B0aW9ucy5vcmlnaW5hbF9hbW91bnRfc2VsZWN0b3IsIGVsZW1lbnQpO1xuICAgICAgaWYgKGFtb3VudF9zZWxlY3Rvcl9mYWlyX21hcmtldC5pcygnOnJhZGlvJykpIHtcbiAgICAgICAgYW1vdW50X3NlbGVjdG9yX2ZhaXJfbWFya2V0ID0gJChvcHRpb25zLm9yaWdpbmFsX2Ftb3VudF9zZWxlY3RvciArICc6Y2hlY2tlZCcsIGVsZW1lbnQpO1xuICAgICAgfVxuICAgICAgdGhhdC5zZXRGYWlyTWFya2V0VmFsdWUoYW1vdW50X3NlbGVjdG9yX2ZhaXJfbWFya2V0KTtcblxuICAgICAgJChvcHRpb25zLm9yaWdpbmFsX2Ftb3VudF9zZWxlY3RvciwgZWxlbWVudCkuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGF0Lm9wdGlvbnMub3JpZ2luYWxfYW1vdW50ID0gcGFyc2VJbnQoJCh0aGlzLCBlbGVtZW50KS52YWwoKSwgMTApO1xuICAgICAgICB0aGF0LmNhbGN1bGF0ZUZlZXModGhhdC5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCwgc3RyaXBlX3BheW1lbnRfdHlwZSk7XG4gICAgICAgIHRoYXQuc2V0RmFpck1hcmtldFZhbHVlKCQodGhpcywgZWxlbWVudCkpO1xuICAgICAgfSk7XG4gICAgICAkKG9wdGlvbnMuYWRkaXRpb25hbF9hbW91bnRfZmllbGQsIGVsZW1lbnQpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgdGhhdC5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCA9IHBhcnNlSW50KCQob3B0aW9ucy5vcmlnaW5hbF9hbW91bnRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLCAxMCk7XG4gICAgICAgIHRoYXQuY2FsY3VsYXRlRmVlcyh0aGF0Lm9wdGlvbnMub3JpZ2luYWxfYW1vdW50LCBzdHJpcGVfcGF5bWVudF90eXBlKTtcbiAgICAgIH0pO1xuXG4gICAgfSwgLy8gYW1vdW50VXBkYXRlZFxuXG4gICAgZ2V0VG90YWxBbW91bnQ6IGZ1bmN0aW9uKGFtb3VudCkge1xuICAgICAgYW1vdW50ID0gKHR5cGVvZiBhbW91bnQgIT09ICd1bmRlZmluZWQnKSA/ICBhbW91bnQgOiB0aGlzLm9wdGlvbnMub3JpZ2luYWxfYW1vdW50O1xuICAgICAgdmFyIHRvdGFsX2Ftb3VudCA9IGFtb3VudDtcbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5hZGRpdGlvbmFsX2Ftb3VudF9maWVsZCkubGVuZ3RoID4gMCAmJiAkKHRoaXMub3B0aW9ucy5hZGRpdGlvbmFsX2Ftb3VudF9maWVsZCkudmFsKCkgPiAwKSB7XG4gICAgICAgIHZhciBhZGRpdGlvbmFsX2Ftb3VudCA9ICQodGhpcy5vcHRpb25zLmFkZGl0aW9uYWxfYW1vdW50X2ZpZWxkKS52YWwoKTtcbiAgICAgICAgdG90YWxfYW1vdW50ID0gcGFyc2VJbnQoYWRkaXRpb25hbF9hbW91bnQsIDEwKSArIHBhcnNlSW50KGFtb3VudCwgMTApOyBcbiAgICAgIH1cbiAgICAgIHJldHVybiB0b3RhbF9hbW91bnQ7XG4gICAgfSwgLy8gZ2V0VG90YWxBbW91bnRcblxuICAgIHNldEZhaXJNYXJrZXRWYWx1ZTogZnVuY3Rpb24oYW1vdW50X3NlbGVjdG9yKSB7XG4gICAgICAvLyBpZiB0aGVyZSBpcyBhIGZhaXIgbWFya2V0IHZhbHVlIGZpZWxkLCBjaGVjayBhbmQgc2VlIGlmIHdlIGNhbiBwb3B1bGF0ZSBpdFxuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmZhaXJfbWFya2V0X3ZhbHVlX3NlbGVjdG9yKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHZhciBmYWlyTWFya2V0VmFsdWUgPSBhbW91bnRfc2VsZWN0b3IuZGF0YSgnZmFpci1tYXJrZXQtdmFsdWUnKTtcbiAgICAgICAgJCh0aGlzLm9wdGlvbnMuZmFpcl9tYXJrZXRfdmFsdWVfc2VsZWN0b3IpLnZhbChmYWlyTWFya2V0VmFsdWUpO1xuICAgICAgfVxuICAgIH0sIC8vIHNldEZhaXJNYXJrZXRWYWx1ZVxuXG4gICAgY2FsY3VsYXRlRmVlczogZnVuY3Rpb24oYW1vdW50LCBzdHJpcGVfcGF5bWVudF90eXBlKSB7XG4gICAgICAvLyB0aGlzIHNlbmRzIHRoZSBhbW91bnQgYW5kIHN0cmlwZSBwYXltZW50IHR5cGUgdG8gcHl0aG9uOyBnZXQgdGhlIGZlZSBhbmQgZGlzcGxheSBpdCB0byB0aGUgdXNlciBvbiB0aGUgY2hlY2tib3ggbGFiZWxcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHZhciB0b3RhbF9hbW91bnQgPSB0aGF0LmdldFRvdGFsQW1vdW50KGFtb3VudCk7XG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgYW1vdW50OiB0b3RhbF9hbW91bnQsXG4gICAgICAgIHN0cmlwZV9wYXltZW50X3R5cGU6IHN0cmlwZV9wYXltZW50X3R5cGVcbiAgICAgIH07XG4gICAgICB0aGF0LnNldFN0cmlwZVBheW1lbnRUeXBlKHN0cmlwZV9wYXltZW50X3R5cGUpO1xuICAgICAgJC5hamF4KHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIHVybDogJy9jYWxjdWxhdGUtZmVlcy8nLFxuICAgICAgICBkYXRhOiBkYXRhXG4gICAgICB9KS5kb25lKGZ1bmN0aW9uKCBkYXRhICkge1xuICAgICAgICBpZiAoJChkYXRhLmZlZXMpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAkKHRoYXQub3B0aW9ucy5mZWVfYW1vdW50KS50ZXh0KHBhcnNlRmxvYXQoZGF0YS5mZWVzKS50b0ZpeGVkKDIpKTtcbiAgICAgICAgICB0aGF0LmNyZWRpdENhcmRGZWVDaGVja2JveCgkKHRoYXQub3B0aW9ucy5wYXlfY2NfcHJvY2Vzc2luZ19zZWxlY3RvcikpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LCAvLyBjYWxjdWxhdGVGZWVzXG5cbiAgICBjcmVkaXRDYXJkUHJvY2Vzc2luZ0ZlZXM6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgIC8vIHRoaXMgYWRkcyBvciBzdWJ0cmFjdHMgdGhlIGZlZSB0byB0aGUgb3JpZ2luYWwgYW1vdW50IHdoZW4gdGhlIHVzZXIgaW5kaWNhdGVzIHRoZXkgZG8gb3IgZG8gbm90IHdhbnQgdG8gcGF5IHRoZSBmZWVzXG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB0aGF0LmNyZWRpdENhcmRGZWVDaGVja2JveCgkKG9wdGlvbnMucGF5X2NjX3Byb2Nlc3Npbmdfc2VsZWN0b3IpKTtcbiAgICAgICQob3B0aW9ucy5wYXlfY2NfcHJvY2Vzc2luZ19zZWxlY3Rvcikub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB0aGF0LmNyZWRpdENhcmRGZWVDaGVja2JveCh0aGlzKTtcbiAgICAgIH0pO1xuICAgIH0sIC8vIGNyZWRpdENhcmRQcm9jZXNzaW5nRmVlc1xuXG4gICAgZ2V0U3RyaXBlUGF5bWVudFR5cGU6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHN0cmlwZV9wYXltZW50X3R5cGUgPSAnY2FyZCc7XG4gICAgICBpZiAoJCgnaW5wdXRbbmFtZT1cInN0cmlwZV9wYXltZW50X3R5cGVcIl0nKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHN0cmlwZV9wYXltZW50X3R5cGUgPSAkKCdpbnB1dFtuYW1lPVwic3RyaXBlX3BheW1lbnRfdHlwZVwiXScpLnZhbCgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN0cmlwZV9wYXltZW50X3R5cGU7XG4gICAgfSwgLy8gZ2V0U3RyaXBlUGF5bWVudFR5cGVcblxuICAgIHNldFN0cmlwZVBheW1lbnRUeXBlOiBmdW5jdGlvbihzdHJpcGVfcGF5bWVudF90eXBlKSB7XG4gICAgICBpZiAoJCgnaW5wdXRbbmFtZT1cInN0cmlwZV9wYXltZW50X3R5cGVcIl0nKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgJCh0aGlzLm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLmFwcGVuZCgnPGlucHV0IHR5cGU9XFxcImhpZGRlblxcXCIgbmFtZT1cXFwic3RyaXBlX3BheW1lbnRfdHlwZVxcXCI+Jyk7XG4gICAgICB9XG4gICAgICAkKCdpbnB1dFtuYW1lPVwic3RyaXBlX3BheW1lbnRfdHlwZVwiXScpLnZhbChzdHJpcGVfcGF5bWVudF90eXBlKTtcbiAgICAgIHJldHVybiBzdHJpcGVfcGF5bWVudF90eXBlO1xuICAgIH0sIC8vIHNldFN0cmlwZVBheW1lbnRUeXBlXG5cbiAgICBjcmVkaXRDYXJkRmVlQ2hlY2tib3g6IGZ1bmN0aW9uKGZpZWxkKSB7XG4gICAgICB2YXIgZnVsbF9hbW91bnQ7XG4gICAgICB2YXIgdG90YWxfYW1vdW50ID0gdGhpcy5nZXRUb3RhbEFtb3VudCgpO1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgaWYgKCQoZmllbGQpLmlzKCc6Y2hlY2tlZCcpIHx8ICQoZmllbGQpLnByb3AoJ2NoZWNrZWQnKSkge1xuICAgICAgICAkKCcuYW1vdW50IC5sZXZlbC1hbW91bnQnKS5hZGRDbGFzcygnZnVsbC1hbW91bnQnKTtcbiAgICAgICAgZnVsbF9hbW91bnQgPSAodG90YWxfYW1vdW50ICsgcGFyc2VGbG9hdCgkKHRoYXQub3B0aW9ucy5mZWVfYW1vdW50KS50ZXh0KCkpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZ1bGxfYW1vdW50ID0gdG90YWxfYW1vdW50O1xuICAgICAgfVxuICAgICAgZnVsbF9hbW91bnQgPSBwYXJzZUZsb2F0KGZ1bGxfYW1vdW50KS50b0ZpeGVkKDIpO1xuICAgICAgJCh0aGF0Lm9wdGlvbnMuZnVsbF9hbW91bnRfc2VsZWN0b3IpLnRleHQoZnVsbF9hbW91bnQpO1xuXG4gICAgICAvLyB1cGRhdGUgdGhlIHBheW1lbnQgcmVxdWVzdFxuICAgICAgaWYgKHRoaXMucGF5bWVudFJlcXVlc3QgJiYgZnVsbF9hbW91bnQpIHtcbiAgICAgICAgdGhpcy5wYXltZW50UmVxdWVzdC51cGRhdGUoe1xuICAgICAgICAgIHRvdGFsOiB7XG4gICAgICAgICAgICBsYWJlbDogXCJNaW5uUG9zdFwiLFxuICAgICAgICAgICAgYW1vdW50OiBmdWxsX2Ftb3VudCAqIDEwMFxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICB9LCAvLyBjcmVkaXRDYXJkRmVlQ2hlY2tib3hcblxuICAgIGRvbmF0ZUFub255bW91c2x5OiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB0aGF0LnRvZ2dsZUFub255bW91cygkKG9wdGlvbnMuYW5vbnltb3VzX3NlbGVjdG9yLCBlbGVtZW50KSk7XG4gICAgICAkKG9wdGlvbnMuYW5vbnltb3VzX3NlbGVjdG9yLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoYXQudG9nZ2xlQW5vbnltb3VzKCQodGhpcykpO1xuICAgICAgfSk7XG4gICAgfSwgLy8gZG9uYXRlQW5vbnltb3VzbHlcblxuICAgIHRvZ2dsZUFub255bW91czogZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgaWYgKGVsZW1lbnQuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgJCh0aGlzLm9wdGlvbnMubmFtZV9zZWxlY3RvciArICcgZGl2OmZpcnN0JywgdGhpcy5lbGVtZW50KS5oaWRlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkKHRoaXMub3B0aW9ucy5uYW1lX3NlbGVjdG9yICsgJyBkaXY6Zmlyc3QnLCB0aGlzLmVsZW1lbnQpLnNob3coKTtcbiAgICAgIH1cbiAgICB9LCAvLyB0b2dnbGVBbm9ueW1vdXNcblxuICAgIGhvbm9yT3JNZW1vcnk6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIGlmICgkKG9wdGlvbnMuaG9ub3Jfb3JfbWVtb3J5X2Nob29zZXIgKyAnOmNoZWNrZWQnKS52YWwoKSkge1xuICAgICAgICAkKG9wdGlvbnMuaG9ub3JfbWVtb3J5X2lucHV0X2dyb3VwLCBlbGVtZW50KS5zaG93KCk7XG4gICAgICAgICQob3B0aW9ucy5ob25vcl90eXBlX3NlbGVjdG9yKS50ZXh0KCQob3B0aW9ucy5ob25vcl9vcl9tZW1vcnlfY2hvb3NlciArICc6Y2hlY2tlZCcpLnZhbCgpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQob3B0aW9ucy5ob25vcl9tZW1vcnlfaW5wdXRfZ3JvdXAsIGVsZW1lbnQpLmhpZGUoKTtcbiAgICAgICAgJChvcHRpb25zLmhvbm9yX25hbWVfc2VsZWN0b3IgKyAnIGlucHV0JywgZWxlbWVudCkudmFsKCcnKTtcbiAgICAgIH1cbiAgICB9LCAvLyBob25vck9yTWVtb3J5XG5cbiAgICBob25vck9yTWVtb3J5VG9nZ2xlOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB0aGF0Lmhvbm9yT3JNZW1vcnkodGhhdC5lbGVtZW50LCB0aGF0Lm9wdGlvbnMpO1xuICAgICAgJChvcHRpb25zLmhvbm9yX29yX21lbW9yeV9jaG9vc2VyLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoYXQuaG9ub3JPck1lbW9yeSh0aGF0LmVsZW1lbnQsIHRoYXQub3B0aW9ucyk7XG4gICAgICB9KTtcbiAgICB9LCAvLyBob25vck9yTWVtb3J5VG9nZ2xlXG5cbiAgICBvdXRzaWRlVW5pdGVkU3RhdGVzOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAkKG9wdGlvbnMuc2hvd19iaWxsaW5nX2NvdW50cnlfc2VsZWN0b3IpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGF0LmNoYW5nZUZpZWxkc091dHNpZGVVUygnYmlsbGluZycsIGVsZW1lbnQsIG9wdGlvbnMpO1xuICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmhpZGUoKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSk7XG4gICAgICAkKG9wdGlvbnMuc2hvd19zaGlwcGluZ19jb3VudHJ5X3NlbGVjdG9yKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgJChvcHRpb25zLnNoaXBwaW5nX2NvdW50cnlfc2VsZWN0b3IpLnNob3coKTtcbiAgICAgICAgdGhhdC5jaGFuZ2VGaWVsZHNPdXRzaWRlVVMoJ3NoaXBwaW5nJywgZWxlbWVudCwgb3B0aW9ucyk7XG4gICAgICAgICQodGhpcykucGFyZW50KCkuaGlkZSgpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9LCAvLyBvdXRzaWRlVW5pdGVkU3RhdGVzXG5cbiAgICBjaGFuZ2VGaWVsZHNPdXRzaWRlVVM6IGZ1bmN0aW9uKGJpbGxpbmdfb3Jfc2hpcHBpbmcsIGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIGlmICggYmlsbGluZ19vcl9zaGlwcGluZyA9PT0gJ2JpbGxpbmcnICkge1xuICAgICAgICB2YXIgemlwX3BhcmVudCA9ICQob3B0aW9ucy5iaWxsaW5nX3ppcF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkucGFyZW50KCk7XG4gICAgICAgIHZhciBzdGF0ZV9wYXJlbnQgPSAkKG9wdGlvbnMuYmlsbGluZ19zdGF0ZV9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkucGFyZW50KCk7XG4gICAgICAgICQob3B0aW9ucy5iaWxsaW5nX2NvdW50cnlfc2VsZWN0b3IpLnNob3coKTtcbiAgICAgICAgJChvcHRpb25zLmJpbGxpbmdfemlwX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5hdHRyKCd0eXBlJywgJ3RleHQnKTtcbiAgICAgICAgJChvcHRpb25zLmJpbGxpbmdfemlwX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgICAgJChvcHRpb25zLmJpbGxpbmdfc3RhdGVfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuICAgICAgICAkKCdsYWJlbCcsIHppcF9wYXJlbnQpLnRleHQoJ1Bvc3RhbCBDb2RlOicpO1xuICAgICAgICAkKCdsYWJlbCcsIHN0YXRlX3BhcmVudCkudGV4dCgnUmVnaW9uOicpO1xuICAgICAgfSBlbHNlIGlmICggYmlsbGluZ19vcl9zaGlwcGluZyA9PT0gJ3NoaXBwaW5nJyApIHtcbiAgICAgICAgdmFyIHppcF9wYXJlbnQgPSAkKG9wdGlvbnMuc2hpcHBpbmdfemlwX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKTtcbiAgICAgICAgdmFyIHN0YXRlX3BhcmVudCA9ICQob3B0aW9ucy5zaGlwcGluZ19zdGF0ZV9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkucGFyZW50KCk7XG4gICAgICAgICQob3B0aW9ucy5zaGlwcGluZ19jb3VudHJ5X3NlbGVjdG9yKS5zaG93KCk7XG4gICAgICAgICQob3B0aW9ucy5zaGlwcGluZ196aXBfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLmF0dHIoJ3R5cGUnLCAndGV4dCcpO1xuICAgICAgICAkKG9wdGlvbnMuc2hpcHBpbmdfemlwX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgICAgJChvcHRpb25zLnNoaXBwaW5nX3N0YXRlX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgICAgJCgnbGFiZWwnLCB6aXBfcGFyZW50KS50ZXh0KCdTaGlwcGluZyBQb3N0YWwgQ29kZTonKTtcbiAgICAgICAgJCgnbGFiZWwnLCBzdGF0ZV9wYXJlbnQpLnRleHQoJ1NoaXBwaW5nIFJlZ2lvbjonKTtcbiAgICAgIH1cbiAgICB9LCAvLyBjaGFuZ2VGaWVsZHNPdXRzaWRlVVNcblxuICAgIGNoYW5nZUZpZWxkc0luc2lkZVVTOiBmdW5jdGlvbihiaWxsaW5nX29yX3NoaXBwaW5nLCBlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICBpZiAoIGJpbGxpbmdfb3Jfc2hpcHBpbmcgPT09ICdiaWxsaW5nJyApIHtcbiAgICAgICAgdmFyIHppcF9wYXJlbnQgPSAkKG9wdGlvbnMuYmlsbGluZ196aXBfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpO1xuICAgICAgICB2YXIgc3RhdGVfcGFyZW50ID0gJChvcHRpb25zLmJpbGxpbmdfc3RhdGVfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpO1xuICAgICAgICAkKG9wdGlvbnMuYmlsbGluZ19jb3VudHJ5X3NlbGVjdG9yKS5zaG93KCk7XG4gICAgICAgICQob3B0aW9ucy5iaWxsaW5nX3ppcF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkuYXR0cigndHlwZScsICd0ZWwnKTtcbiAgICAgICAgJChvcHRpb25zLmJpbGxpbmdfemlwX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5wcm9wKCdyZXF1aXJlZCcsIHRydWUpO1xuICAgICAgICAkKG9wdGlvbnMuYmlsbGluZ19zdGF0ZV9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkucHJvcCgncmVxdWlyZWQnLCB0cnVlKTtcbiAgICAgICAgJCgnbGFiZWwnLCB6aXBfcGFyZW50KS5odG1sKCdaaXAgQ29kZTogPHNwYW4gY2xhc3M9XCJhLWZvcm0taXRlbS1yZXF1aXJlZFwiIHRpdGxlPVwiVGhpcyBmaWVsZCBpcyByZXF1aXJlZC5cIj4qPC9zcGFuPicpO1xuICAgICAgICAkKCdsYWJlbCcsIHN0YXRlX3BhcmVudCkuaHRtbCgnU3RhdGU6IDxzcGFuIGNsYXNzPVwiYS1mb3JtLWl0ZW0tcmVxdWlyZWRcIiB0aXRsZT1cIlRoaXMgZmllbGQgaXMgcmVxdWlyZWQuXCI+Kjwvc3Bhbj4nKTtcbiAgICAgIH0gZWxzZSBpZiAoIGJpbGxpbmdfb3Jfc2hpcHBpbmcgPT09ICdzaGlwcGluZycgKSB7XG4gICAgICAgIHZhciB6aXBfcGFyZW50ID0gJChvcHRpb25zLnNoaXBwaW5nX3ppcF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkucGFyZW50KCk7XG4gICAgICAgIHZhciBzdGF0ZV9wYXJlbnQgPSAkKG9wdGlvbnMuc2hpcHBpbmdfc3RhdGVfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpO1xuICAgICAgICAkKG9wdGlvbnMuc2hpcHBpbmdfY291bnRyeV9zZWxlY3Rvcikuc2hvdygpO1xuICAgICAgICAkKG9wdGlvbnMuc2hpcHBpbmdfemlwX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5hdHRyKCd0eXBlJywgJ3RlbCcpO1xuICAgICAgICAkKG9wdGlvbnMuc2hpcHBpbmdfemlwX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5wcm9wKCdyZXF1aXJlZCcsIHRydWUpO1xuICAgICAgICAkKG9wdGlvbnMuc2hpcHBpbmdfc3RhdGVfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnByb3AoJ3JlcXVpcmVkJywgdHJ1ZSk7XG4gICAgICAgICQoJ2xhYmVsJywgemlwX3BhcmVudCkuaHRtbCgnU2hpcHBpbmcgWmlwIENvZGU6IDxzcGFuIGNsYXNzPVwiYS1mb3JtLWl0ZW0tcmVxdWlyZWRcIiB0aXRsZT1cIlRoaXMgZmllbGQgaXMgcmVxdWlyZWQuXCI+Kjwvc3Bhbj4nKTtcbiAgICAgICAgJCgnbGFiZWwnLCBzdGF0ZV9wYXJlbnQpLmh0bWwoJ1NoaXBwaW5nIFN0YXRlOiA8c3BhbiBjbGFzcz1cImEtZm9ybS1pdGVtLXJlcXVpcmVkXCIgdGl0bGU9XCJUaGlzIGZpZWxkIGlzIHJlcXVpcmVkLlwiPio8L3NwYW4+Jyk7XG4gICAgICB9XG4gICAgfSwgLy8gY2hhbmdlRmllbGRzT3V0c2lkZVVTXG5cbiAgICBzaGlwcGluZ0FkZHJlc3M6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHZhciBzaG93X3NoaXBwaW5nID0gZmFsc2U7XG4gICAgICBpZiAoJChvcHRpb25zLnVzZV9mb3Jfc2hpcHBpbmdfc2VsZWN0b3IpLmxlbmd0aCA+IDApIHsgLy8gd2UgaGF2ZSBhIHNoaXBwaW5nIGNoZWNrYm94XG4gICAgICAgIHNob3dfc2hpcHBpbmcgPSB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKHNob3dfc2hpcHBpbmcgPT09IHRydWUgKSB7XG4gICAgICAgICQob3B0aW9ucy51c2VfZm9yX3NoaXBwaW5nX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKS5zaG93KCk7XG4gICAgICAgIGlmICgkKG9wdGlvbnMudXNlX2Zvcl9zaGlwcGluZ19zZWxlY3RvciwgZWxlbWVudCkuaXMoJzpjaGVja2VkJykpIHsgLy8gdXNlIHNhbWUgYXMgYmlsbGluZ1xuICAgICAgICAgICQob3B0aW9ucy5zaGlwcGluZ19zZWxlY3RvcikuaGlkZSgpO1xuICAgICAgICB9IGVsc2UgeyAvLyBzZXBhcmF0ZSBzaGlwcGluZyBhbmQgYmlsbGluZ1xuICAgICAgICAgICQob3B0aW9ucy5zaGlwcGluZ19zZWxlY3Rvcikuc2hvdygpO1xuICAgICAgICB9XG4gICAgICAgICQob3B0aW9ucy51c2VfZm9yX3NoaXBwaW5nX3NlbGVjdG9yLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdGhhdC5zaGlwcGluZ0FkZHJlc3MoZWxlbWVudCwgb3B0aW9ucyk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgXG4gICAgfSwgLy8gc2hpcHBpbmdBZGRyZXNzXG5cbiAgICBhbGxvd01pbm5wb3N0QWNjb3VudDogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdmFyIGFjY291bnRfZXhpc3RzID0gZmFsc2U7XG5cbiAgICAgIC8vIHNob3cgcGFzc3dvcmQgYXMgdGV4dFxuICAgICAgdGhhdC5zaG93UGFzc3dvcmQoKTtcblxuICAgICAgLy8gY2FsY3VsYXRlIHBhc3N3b3JkIHN0cmVuZ3RoXG4gICAgICB0aGF0LnNob3dQYXNzd29yZFN0cmVuZ3RoKCk7XG4gICAgICBcbiAgICAgIHRoYXQuc3BhbUVtYWlsKCQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkpO1xuICAgICAgJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoYXQuc3BhbUVtYWlsKCQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoYXQudG9nZ2xlQWNjb3VudEZpZWxkcygkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KSk7XG4gICAgICAkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoYXQudG9nZ2xlQWNjb3VudEZpZWxkcygkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KSk7XG4gICAgICB9KTtcblxuICAgICAgZnVuY3Rpb24gZG9uZVR5cGluZyAoKSB7XG4gICAgICAgIHZhciBlbWFpbCA9ICQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCk7XG4gICAgICAgIGFjY291bnRfZXhpc3RzID0gdGhhdC5jaGVja01pbm5wb3N0QWNjb3VudChlbGVtZW50LCBvcHRpb25zLCBlbWFpbCk7XG4gICAgICB9XG5cbiAgICAgIC8vc2V0dXAgYmVmb3JlIGZ1bmN0aW9uc1xuICAgICAgdmFyIHR5cGluZ1RpbWVyOyAgICAgICAgICAgICAgICAvL3RpbWVyIGlkZW50aWZpZXJcbiAgICAgIHZhciBkb25lVHlwaW5nSW50ZXJ2YWwgPSA1MDAwOyAgLy90aW1lIGluIG1zLCA1IHNlY29uZCBmb3IgZXhhbXBsZVxuXG4gICAgICAvL29uIGtleXVwLCBzdGFydCB0aGUgY291bnRkb3duXG4gICAgICAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLmtleXVwKGZ1bmN0aW9uKCl7XG4gICAgICAgIGNsZWFyVGltZW91dCh0eXBpbmdUaW1lcik7XG4gICAgICAgIGlmICgkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCkge1xuICAgICAgICAgIHR5cGluZ1RpbWVyID0gc2V0VGltZW91dChkb25lVHlwaW5nLCBkb25lVHlwaW5nSW50ZXJ2YWwpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LCAvLyBhbGxvd01pbm5wb3N0QWNjb3VudFxuXG4gICAgc3BhbUVtYWlsOiBmdW5jdGlvbihlbWFpbF9maWVsZCkge1xuICAgICAgdmFyIHNwYW1FcnJvckNvbnRhaW5lciA9IGVtYWlsX2ZpZWxkLnBhcmVudCgpO1xuICAgICAgaWYgKCQoJy5hLXNwYW0tZW1haWwnLCBzcGFtRXJyb3JDb250YWluZXIpLmxlbmd0aCA9PT0gMCApIHtcbiAgICAgICAgc3BhbUVycm9yQ29udGFpbmVyLmFwcGVuZCgnPHAgY2xhc3M9XCJhLWZvcm0tY2FwdGlvbiBhLXZhbGlkYXRpb24tZXJyb3IgYS1zcGFtLWVtYWlsXCI+VGhpcyBlbWFpbCBhZGRyZXNzIGhhcyBiZWVuIGRldGVjdGVkIGFzIGEgc3BhbW1lci48L3A+Jyk7XG4gICAgICB9XG4gICAgICAkKCcuYS1zcGFtLWVtYWlsJywgc3BhbUVycm9yQ29udGFpbmVyKS5oaWRlKCk7XG4gICAgICBzcGFtRXJyb3JDb250YWluZXIucmVtb3ZlQ2xhc3MoJ2ludmFsaWQgYS1lcnJvcicpO1xuICAgIH0sIC8vIHNwYW1FbWFpbFxuXG4gICAgdG9nZ2xlQWNjb3VudEZpZWxkczogZnVuY3Rpb24oY3JlYXRlX2FjY291bnRfc2VsZWN0b3IpIHtcbiAgICAgIGlmIChjcmVhdGVfYWNjb3VudF9zZWxlY3Rvci5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICBjcmVhdGVfYWNjb3VudF9zZWxlY3Rvci5wYXJlbnQoKS5iZWZvcmUoJzxwIGNsYXNzPVwiYS1mb3JtLWNhcHRpb24gYS1hY2NvdW50LWV4aXN0cyBhLWFjY291bnQtZXhpc3RzLXN1Y2Nlc3NcIj5UaGVyZSBpcyBhbHJlYWR5IGEgTWlublBvc3QuY29tIGFjY291bnQgd2l0aCB0aGlzIGVtYWlsIGFkZHJlc3MuPC9wPicpO1xuICAgICAgICAkKCcuYS1hY2NvdW50LWV4aXN0cycpLmhpZGUoKTtcbiAgICAgICAgJCh0aGlzLm9wdGlvbnMucGFzc3dvcmRfc2VsZWN0b3IsIHRoaXMuZWxlbWVudCkuc2hvdygpO1xuICAgICAgICB0aGlzLm9wdGlvbnMuY3JlYXRlX2FjY291bnQgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJCh0aGlzLm9wdGlvbnMucGFzc3dvcmRfc2VsZWN0b3IsIHRoaXMuZWxlbWVudCkuaGlkZSgpO1xuICAgICAgfVxuICAgIH0sIC8vIHRvZ2dsZUFjY291bnRGaWVsZHNcblxuICAgIHNob3dQYXNzd29yZDogZnVuY3Rpb24oKSB7XG4gICAgICAvLyBDYWNoZSBvdXIganF1ZXJ5IGVsZW1lbnRzXG4gICAgICB2YXIgJHN1Ym1pdCA9ICQoJy5idG4tc3VibWl0Jyk7XG4gICAgICB2YXIgJGNvbnRhaW5lciA9ICQodGhpcy5vcHRpb25zLnBhc3N3b3JkX3NlbGVjdG9yLCB0aGlzLmVsZW1lbnQpO1xuICAgICAgdmFyICRmaWVsZCA9ICQoJ2lucHV0W25hbWU9XCJwYXNzd29yZFwiXScsICRjb250YWluZXIpO1xuICAgICAgJCgnLmEtYWNjb3VudC1leGlzdHMnKS5oaWRlKCk7XG4gICAgICB2YXIgc2hvd19wYXNzID0gJzxkaXYgY2xhc3M9XCJhLWZvcm0tc2hvdy1wYXNzd29yZCBhLWZvcm0tY2FwdGlvblwiPjxsYWJlbD48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgbmFtZT1cInNob3dfcGFzc3dvcmRcIiBpZD1cInNob3ctcGFzc3dvcmQtY2hlY2tib3hcIiB2YWx1ZT1cIjFcIj4gU2hvdyBwYXNzd29yZDwvbGFiZWw+PC9kaXY+JztcbiAgICAgIC8vIEluamVjdCB0aGUgdG9nZ2xlIGJ1dHRvbiBpbnRvIHRoZSBwYWdlXG4gICAgICAkY29udGFpbmVyLmFwcGVuZCggc2hvd19wYXNzICk7XG4gICAgICAvLyBDYWNoZSB0aGUgdG9nZ2xlIGJ1dHRvblxuICAgICAgdmFyICR0b2dnbGUgPSAkKCcjc2hvdy1wYXNzd29yZC1jaGVja2JveCcpO1xuICAgICAgLy8gVG9nZ2xlIHRoZSBmaWVsZCB0eXBlXG4gICAgICAkdG9nZ2xlLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgdmFyIGNoZWNrYm94ID0gJCh0aGlzKTtcbiAgICAgICAgaWYgKGNoZWNrYm94LmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgICAgJGZpZWxkLmF0dHIoJ3R5cGUnLCAndGV4dCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICRmaWVsZC5hdHRyKCd0eXBlJywgJ3Bhc3N3b3JkJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgLy8gU2V0IHRoZSBmb3JtIGZpZWxkIGJhY2sgdG8gYSByZWd1bGFyIHBhc3N3b3JkIGVsZW1lbnRcbiAgICAgICRzdWJtaXQub24oICdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgJGZpZWxkLmF0dHIoJ3R5cGUnLCAncGFzc3dvcmQnKTtcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBzaG93UGFzc3dvcmRTdHJlbmd0aDogZnVuY3Rpb24oKSB7XG4gICAgICAvLyBjaGVja1Bhc3N3b3JkU3RyZW5ndGhcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIGlmICgkKCcuYS1wYXNzd29yZC1zdHJlbmd0aCcpLmxlbmd0aCA+IDAgKSB7XG4gICAgICAgIHZhciAkYmVmb3JlID0gJCgnLmEtZm9ybS1zaG93LXBhc3N3b3JkJyk7XG4gICAgICAgICRiZWZvcmUuYWZ0ZXIoICQoJzxkaXYgY2xhc3M9XCJhLXBhc3N3b3JkLXN0cmVuZ3RoXCI+PG1ldGVyIG1heD1cIjRcIiBpZD1cInBhc3N3b3JkLXN0cmVuZ3RoXCI+PGRpdj48L2Rpdj48L21ldGVyPjxwIGNsYXNzPVwiYS1mb3JtLWNhcHRpb25cIiBpZD1cInBhc3N3b3JkLXN0cmVuZ3RoLXRleHRcIj48L3A+PC9kaXY+JykpO1xuICAgICAgICAkKCAnYm9keScgKS5vbiggJ2tleXVwJywgJ2lucHV0W25hbWU9cGFzc3dvcmRdJyxcbiAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoYXQuY2hlY2tQYXNzd29yZFN0cmVuZ3RoKFxuICAgICAgICAgICAgICAkKCdpbnB1dFtuYW1lPXBhc3N3b3JkXScpLCAvLyBQYXNzd29yZCBmaWVsZFxuICAgICAgICAgICAgICAkKCcjcGFzc3dvcmQtc3RyZW5ndGgnKSwgICAgICAgICAgIC8vIFN0cmVuZ3RoIG1ldGVyXG4gICAgICAgICAgICAgICQoJyNwYXNzd29yZC1zdHJlbmd0aC10ZXh0JykgICAgICAvLyBTdHJlbmd0aCB0ZXh0IGluZGljYXRvclxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSwgLy8gc2hvd1Bhc3N3b3JkU3RyZW5ndGhcblxuICAgIGNoZWNrUGFzc3dvcmRTdHJlbmd0aDogZnVuY3Rpb24oICRwYXNzd29yZCwgJHN0cmVuZ3RoTWV0ZXIsICRzdHJlbmd0aFRleHQgKSB7XG4gICAgICB2YXIgcGFzc3dvcmQgPSAkcGFzc3dvcmQudmFsKCk7XG4gICAgICAvLyBHZXQgdGhlIHBhc3N3b3JkIHN0cmVuZ3RoXG4gICAgICB2YXIgcmVzdWx0ID0genhjdmJuKHBhc3N3b3JkKTtcbiAgICAgIHZhciBzdHJlbmd0aCA9IHJlc3VsdC5zY29yZTtcblxuICAgICAgJHN0cmVuZ3RoVGV4dC5yZW1vdmVDbGFzcyggJ3Nob3J0IGJhZCBnb29kIHN0cm9uZycgKTtcblxuICAgICAgLy8gQWRkIHRoZSBzdHJlbmd0aCBtZXRlciByZXN1bHRzXG4gICAgICBzd2l0Y2ggKCBzdHJlbmd0aCApIHtcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICRzdHJlbmd0aFRleHQuYWRkQ2xhc3MoICdiYWQnICkuaHRtbCggJ1N0cmVuZ3RoOiA8c3Ryb25nPldlYWs8L3N0cm9uZz4nICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAkc3RyZW5ndGhUZXh0LmFkZENsYXNzKCAnZ29vZCcgKS5odG1sKCAnU3RyZW5ndGg6IDxzdHJvbmc+TWVkaXVtPC9zdHJvbmc+JyApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgJHN0cmVuZ3RoVGV4dC5hZGRDbGFzcyggJ3N0cm9uZycgKS5odG1sKCAnU3RyZW5ndGg6IDxzdHJvbmc+U3Ryb25nPC9zdHJvbmc+JyApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgJHN0cmVuZ3RoVGV4dC5hZGRDbGFzcyggJ3Nob3J0JyApLmh0bWwoICdTdHJlbmd0aDogPHN0cm9uZz5WZXJ5IHdlYWs8L3N0cm9uZz4nICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgJHN0cmVuZ3RoVGV4dC5hZGRDbGFzcyggJ3Nob3J0JyApLmh0bWwoICdTdHJlbmd0aDogPHN0cm9uZz5WZXJ5IHdlYWs8L3N0cm9uZz4nICk7XG4gICAgICB9XG4gICAgICAkc3RyZW5ndGhNZXRlci52YWwoc3RyZW5ndGgpO1xuICAgICAgcmV0dXJuIHN0cmVuZ3RoO1xuICAgIH0sIC8vIGNoZWNrUGFzc3dvcmRTdHJlbmd0aFxuXG4gICAgY2hlY2tNaW5ucG9zdEFjY291bnQ6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMsIGVtYWlsKSB7XG4gICAgICB2YXIgdXNlciA9IHtcbiAgICAgICAgZW1haWw6IGVtYWlsXG4gICAgICB9O1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgJC5hamF4KHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgdXJsOiBvcHRpb25zLm1pbm5wb3N0X3Jvb3QgKyAnL3dwLWpzb24vdXNlci1hY2NvdW50LW1hbmFnZW1lbnQvdjEvY2hlY2stYWNjb3VudCcsXG4gICAgICAgIGRhdGE6IHVzZXJcbiAgICAgIH0pLmRvbmUoZnVuY3Rpb24oIHJlc3VsdCApIHtcbiAgICAgICAgaWYgKHJlc3VsdC5zdGF0dXMgPT09ICdzdWNjZXNzJyAmJiByZXN1bHQucmVhc29uID09PSAndXNlciBleGlzdHMnKSB7IC8vIHVzZXIgZXhpc3RzXG4gICAgICAgICAgaWYgKCQob3B0aW9ucy5jcmVhdGVfbXBfc2VsZWN0b3IsIGVsZW1lbnQpLmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgICAgICAkKG9wdGlvbnMucGFzc3dvcmRfc2VsZWN0b3IsIGVsZW1lbnQpLmhpZGUoKTtcbiAgICAgICAgICAgICQob3B0aW9ucy5jcmVhdGVfbXBfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpLmhpZGUoKTtcbiAgICAgICAgICAgICQoJy5hLWFjY291bnQtZXhpc3RzJywgZWxlbWVudCkuc2hvdygpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KS5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgICAgICAgJChvcHRpb25zLnBhc3N3b3JkX3NlbGVjdG9yLCBlbGVtZW50KS5oaWRlKCk7XG4gICAgICAgICAgICAgICQob3B0aW9ucy5jcmVhdGVfbXBfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpLmhpZGUoKTtcbiAgICAgICAgICAgICAgJCgnLmEtYWNjb3VudC1leGlzdHMnLCBlbGVtZW50KS5zaG93KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoIHJlc3VsdC5zdGF0dXMgPT09ICdzcGFtJyApIHtcbiAgICAgICAgICAkKHRoYXQub3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvcikuYWRkQ2xhc3MoJ2ludmFsaWQgYS1lcnJvcicpO1xuICAgICAgICAgICQoICcuYS1zcGFtLWVtYWlsJykuc2hvdygpO1xuICAgICAgICB9IGVsc2UgeyAvLyB1c2VyIGRvZXMgbm90IGV4aXN0IG9yIGFqYXggY2FsbCBmYWlsZWRcbiAgICAgICAgICBpZiAoJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgICAgICQob3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgZWxlbWVudCkuc2hvdygpO1xuICAgICAgICAgICAgb3B0aW9ucy5jcmVhdGVfYWNjb3VudCA9IHRydWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQob3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgZWxlbWVudCkuaGlkZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAkKCcuYS1hY2NvdW50LWV4aXN0cycsIGVsZW1lbnQpLmhpZGUoKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sIC8vIGNoZWNrTWlubnBvc3RBY2NvdW50XG5cbiAgICBwYXltZW50UmVxdWVzdEJ1dHRvbjogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdmFyIHRvdGFsX2Ftb3VudCA9IHRoYXQuZ2V0VG90YWxBbW91bnQoKTtcbiAgICAgIHRoYXQucGF5bWVudFJlcXVlc3QgPSB0aGF0LnN0cmlwZS5wYXltZW50UmVxdWVzdCh7XG4gICAgICAgIGNvdW50cnk6ICdVUycsXG4gICAgICAgIGN1cnJlbmN5OiAndXNkJyxcbiAgICAgICAgdG90YWw6IHtcbiAgICAgICAgICBsYWJlbDogJ01pbm5Qb3N0JyxcbiAgICAgICAgICBhbW91bnQ6IHRvdGFsX2Ftb3VudCAqIDEwMCxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgICAgdGhhdC5wckJ1dHRvbiA9IHRoYXQuZWxlbWVudHMuY3JlYXRlKCdwYXltZW50UmVxdWVzdEJ1dHRvbicsIHtcbiAgICAgICAgcGF5bWVudFJlcXVlc3Q6IHRoYXQucGF5bWVudFJlcXVlc3QsXG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgcGF5bWVudFJlcXVlc3RCdXR0b246IHtcbiAgICAgICAgICAgIHR5cGU6ICdkb25hdGUnLFxuICAgICAgICAgICAgLy8gT25lIG9mICdkZWZhdWx0JywgJ2Jvb2snLCAnYnV5Jywgb3IgJ2RvbmF0ZSdcbiAgICAgICAgICAgIC8vIERlZmF1bHRzIHRvICdkZWZhdWx0J1xuICAgICAgXG4gICAgICAgICAgICB0aGVtZTogJ2RhcmsnLFxuICAgICAgICAgICAgLy8gT25lIG9mICdkYXJrJywgJ2xpZ2h0Jywgb3IgJ2xpZ2h0LW91dGxpbmUnXG4gICAgICAgICAgICAvLyBEZWZhdWx0cyB0byAnZGFyaydcbiAgICAgIFxuICAgICAgICAgICAgaGVpZ2h0OiAnNDhweCdcbiAgICAgICAgICAgIC8vIERlZmF1bHRzIHRvICc0MHB4Jy4gVGhlIHdpZHRoIGlzIGFsd2F5cyAnMTAwJScuXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgICAgXG4gICAgICAvLyBDaGVjayB0aGUgYXZhaWxhYmlsaXR5IG9mIHRoZSBQYXltZW50IFJlcXVlc3QgQVBJIGZpcnN0LlxuICAgICAgdGhhdC5wYXltZW50UmVxdWVzdC5jYW5NYWtlUGF5bWVudCgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAkKCcubS1wYXktd2l0aG91dC1wYXltZW50LXJlcXVlc3QnKS5oaWRlKCk7XG4gICAgICAgICAgdGhhdC5wckJ1dHRvbi5tb3VudCgnI3BheW1lbnQtcmVxdWVzdC1idXR0b24nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGF0LmhpZGVQYXltZW50UmVxdWVzdCggJCgnLm8tcGF5LXdpdGgtcGF5bWVudC1yZXF1ZXN0JykgKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgICQoJy5kZWNsaW5lLWFwcGxlLXBheSBhJykuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhhdC5oaWRlUGF5bWVudFJlcXVlc3QoICQoJy5vLXBheS13aXRoLXBheW1lbnQtcmVxdWVzdCAubS1mb3JtLWFjdGlvbnMtcGF5LWZlZXMnKSApO1xuICAgICAgfSk7XG5cbiAgICAgIHRoYXQucHJCdXR0b24ub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcblxuICAgICAgICAvLyBTZW5kIHBheW1lbnRNZXRob2QuaWQgdG8gc2VydmVyXG4gICAgICAgIHZhciBzdXBwb3J0Zm9ybSA9ICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKTtcblxuICAgICAgICAvLyBjaGVjayB2YWxpZGF0aW9uIG9mIGZvcm1cbiAgICAgICAgaWYgKCFzdXBwb3J0Zm9ybS5nZXQoMCkucmVwb3J0VmFsaWRpdHkoKSkge1xuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgdGhhdC5wYXltZW50UmVxdWVzdC5vbigncGF5bWVudG1ldGhvZCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cbiAgICAgICAgLy8gU2VuZCBwYXltZW50TWV0aG9kLmlkIHRvIHNlcnZlclxuICAgICAgICB2YXIgc3VwcG9ydGZvcm0gPSAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3Rvcik7XG4gICAgICAgIHZhciB0b2tlbkZpZWxkTmFtZSA9ICdwYXltZW50X21ldGhvZF9pZCc7XG4gICAgICAgIHZhciB0b2tlbkZpZWxkID0gJ2lucHV0W25hbWU9XCInICsgdG9rZW5GaWVsZE5hbWUgKyAnXCJdJztcblxuICAgICAgICAvLyBJbnNlcnQgdGhlIHBheW1lbnQgbWV0aG9kIElEIGludG8gdGhlIGZvcm0gc28gaXQgZ2V0cyBzdWJtaXR0ZWQgdG8gdGhlIHNlcnZlclxuICAgICAgICBpZiAoJCh0b2tlbkZpZWxkKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgJCh0b2tlbkZpZWxkKS52YWwoZXZlbnQucGF5bWVudE1ldGhvZC5pZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3VwcG9ydGZvcm0uYXBwZW5kKCQoJzxpbnB1dCB0eXBlPVxcXCJoaWRkZW5cXFwiIG5hbWU9XCInICsgdG9rZW5GaWVsZE5hbWUgKyAnXCI+JykudmFsKGV2ZW50LnBheW1lbnRNZXRob2QuaWQpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoYXQuZm9ybVByb2Nlc3Nvcih0aGF0LCAncGF5bWVudFJlcXVlc3QnKTtcblxuICAgICAgfSk7XG5cbiAgICB9LCAvLyBwYXltZW50UmVxdWVzdEJ1dHRvblxuXG4gICAgaGlkZVBheW1lbnRSZXF1ZXN0OiBmdW5jdGlvbiggaGlkZUVsZW1lbnQgKSB7XG4gICAgICBoaWRlRWxlbWVudC5oaWRlKCk7XG4gICAgICAkKCcuZGVjbGluZS1hcHBsZS1wYXkgYScpLmhpZGUoKTtcbiAgICAgICQoJy5tLXBheS13aXRob3V0LXBheW1lbnQtcmVxdWVzdCcpLnNob3coKTtcbiAgICAgICQoJy5hLWctcmVjYXB0Y2hhJykuaW5zZXJ0QWZ0ZXIoJy5tLXBheS13aXRob3V0LXBheW1lbnQtcmVxdWVzdCAubS1mb3JtLWFjdGlvbnMtcGF5LWZlZXMnKTtcbiAgICB9LCAvLyBoaWRlUGF5bWVudFJlcXVlc3RcblxuICAgIGNob29zZVBheW1lbnRNZXRob2Q6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcblxuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuXG4gICAgICBpZiAoJChvcHRpb25zLmNob29zZV9wYXltZW50KS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGlmICgkKG9wdGlvbnMuY2hvb3NlX3BheW1lbnQgKyAnIGlucHV0JykuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgICB2YXIgY2hlY2tlZF9pZCA9ICQob3B0aW9ucy5jaG9vc2VfcGF5bWVudCArICcgaW5wdXQ6Y2hlY2tlZCcpLmF0dHIoJ2lkJyk7XG4gICAgICAgICAgdmFyIGNoZWNrZWRfdmFsdWUgPSAkKG9wdGlvbnMuY2hvb3NlX3BheW1lbnQgKyAnIGlucHV0OmNoZWNrZWQnKS52YWwoKTtcbiAgICAgICAgICB0aGF0LnNldHVwUGF5bWVudE1ldGhvZChjaGVja2VkX2lkLCBjaGVja2VkX3ZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgICQob3B0aW9ucy5jaG9vc2VfcGF5bWVudCArICcgaW5wdXQnKS5jaGFuZ2UoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciBjaGVja2VkX2lkID0gdGhpcy5pZDtcbiAgICAgICAgICB2YXIgY2hlY2tlZF92YWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgICAgICAgdGhhdC5zZXR1cFBheW1lbnRNZXRob2QoY2hlY2tlZF9pZCwgY2hlY2tlZF92YWx1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICB9XG4gICAgfSwgLy8gY2hvb3NlUGF5bWVudE1ldGhvZFxuXG4gICAgc2V0dXBQYXltZW50TWV0aG9kOiBmdW5jdGlvbihlbGVtZW50X2lkLCBlbGVtZW50X3ZhbHVlKSB7XG4gICAgICB2YXIgc3RyaXBlX3BheW1lbnRfdHlwZSA9IHRoaXMuc2V0U3RyaXBlUGF5bWVudFR5cGUoZWxlbWVudF92YWx1ZSk7XG4gICAgICBpZiAoIGVsZW1lbnRfdmFsdWUgPT09ICdiYW5rX2FjY291bnQnICkge1xuICAgICAgICAkKCdpbnB1dFtuYW1lPVwicGF5bWVudF9tZXRob2RfaWRcIl0nLCAkKHRoaXMub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikpLnJlbW92ZSgpO1xuICAgICAgICB0aGlzLmFjaEZpZWxkcyh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlbW92ZUFjaEZpZWxkcyh0aGlzLm9wdGlvbnMpO1xuICAgICAgfVxuICAgICAgJCh0aGlzLm9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICQodGhpcy5vcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yICsgJy4nICsgZWxlbWVudF9pZCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgJCh0aGlzLm9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IgKyAnOm5vdCguYWN0aXZlKSBpbnB1dCcpLnZhbCgnJyk7XG4gICAgICB0aGlzLmNhbGN1bGF0ZUZlZXModGhpcy5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCwgc3RyaXBlX3BheW1lbnRfdHlwZSk7XG4gICAgfSwgLy8gc2V0dXBQYXltZW50TWV0aG9kXG5cbiAgICByZW1vdmVBY2hGaWVsZHM6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICQoJ2lucHV0W25hbWU9XCJwdWJsaWNfdG9rZW5cIl0nLCAkKG9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpKS5yZW1vdmUoKTtcbiAgICAgICQoJ2lucHV0W25hbWU9XCJhY2NvdW50X2lkXCJdJywgJChvcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKSkucmVtb3ZlKCk7XG4gICAgICAkKCdpbnB1dFtuYW1lPVwiYmFua1Rva2VuXCJdJywgJChvcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKSkucmVtb3ZlKCk7XG4gICAgICAkKG9wdGlvbnMucGxhaWRfbGluaykuaHRtbCgnPGEgaHJlZj1cIiNcIj5TaWduIGluIHRvIHlvdXIgYmFuayBhY2NvdW50PC9hPicpO1xuICAgICAgdGhpcy5idXR0b25EaXNhYmxlZChvcHRpb25zLCBmYWxzZSwgJycsICcnLCB0cnVlKTsgLy8gaWYgdGhlIGJ1dHRvbiB3YXMgZGlzYWJsZWQsIHJlLWVuYWJsZSBpdFxuICAgICAgaWYgKHR5cGVvZiB0aGlzLmxpbmtIYW5kbGVyICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aGlzLmxpbmtIYW5kbGVyLmRlc3Ryb3koKTtcbiAgICAgIH1cbiAgICB9LCAvLyByZW1vdmVBY2hGaWVsZHNcblxuICAgIGNyZWRpdENhcmRGaWVsZHM6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcblxuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuXG4gICAgICB2YXIgc3R5bGUgPSB7XG4gICAgICAgIGJhc2U6IHtcbiAgICAgICAgICBpY29uQ29sb3I6ICcjNjY2RUU4JyxcbiAgICAgICAgICBsaW5lSGVpZ2h0OiAnNDNweCcsXG4gICAgICAgICAgZm9udFdlaWdodDogNDAwLFxuICAgICAgICAgIGZvbnRGYW1pbHk6ICdmZi1tZXRhLXdlYi1wcm8nLFxuICAgICAgICAgIGZvbnRTaXplOiAnMjRweCcsXG4gICAgICAgICAgLy9saW5lSGVpZ2h0OiAnMzdweCcsXG4gICAgICAgICAgLy9mb250U2l6ZTogJzE2cHgnLFxuICAgICAgICB9LFxuICAgICAgICBpbnZhbGlkOiB7XG4gICAgICAgICAgY29sb3I6ICcjMWExODE4JyxcbiAgICAgICAgfSxcbiAgICAgIH07XG5cbiAgICAgIC8vIEFkZCBhbiBpbnN0YW5jZSBvZiB0aGUgY2FyZCBVSSBjb21wb25lbnQgaW50byB0aGUgYGNhcmQtZWxlbWVudGAgPGRpdj5cbiAgICAgIC8vY2FyZC5tb3VudCgnI2NhcmQtZWxlbWVudCcpO1xuICAgICAgaWYgKCAkKCcuY3JlZGl0LWNhcmQtZ3JvdXAnKS5sZW5ndGggPT09IDAgJiYgJCgnLnBheW1lbnQtbWV0aG9kLmNob29zZS1jYXJkJykubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoYXQuY2FyZE51bWJlckVsZW1lbnQgPSB0aGF0LmVsZW1lbnRzLmNyZWF0ZSgnY2FyZE51bWJlcicsIHtcbiAgICAgICAgc2hvd0ljb246IHRydWUsXG4gICAgICAgIHN0eWxlOiBzdHlsZVxuICAgICAgfSk7XG4gICAgICB0aGF0LmNhcmROdW1iZXJFbGVtZW50Lm1vdW50KG9wdGlvbnMuY2NfbnVtX3NlbGVjdG9yKTtcblxuICAgICAgdGhhdC5jYXJkRXhwaXJ5RWxlbWVudCA9IHRoYXQuZWxlbWVudHMuY3JlYXRlKCdjYXJkRXhwaXJ5Jywge1xuICAgICAgICBzdHlsZTogc3R5bGVcbiAgICAgIH0pO1xuICAgICAgdGhhdC5jYXJkRXhwaXJ5RWxlbWVudC5tb3VudChvcHRpb25zLmNjX2V4cF9zZWxlY3Rvcik7XG5cbiAgICAgIHRoYXQuY2FyZEN2Y0VsZW1lbnQgPSB0aGF0LmVsZW1lbnRzLmNyZWF0ZSgnY2FyZEN2YycsIHtcbiAgICAgICAgc3R5bGU6IHN0eWxlXG4gICAgICB9KTtcbiAgICAgIHRoYXQuY2FyZEN2Y0VsZW1lbnQubW91bnQob3B0aW9ucy5jY19jdmNfc2VsZWN0b3IpO1xuXG4gICAgICAvLyB2YWxpZGF0ZS9lcnJvciBoYW5kbGUgdGhlIGNhcmQgZmllbGRzXG4gICAgICB0aGF0LmNhcmROdW1iZXJFbGVtZW50Lm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICB2YXIgc3RyaXBlX3BheW1lbnRfdHlwZSA9ICdjYXJkJztcbiAgICAgICAgLy8gU3dpdGNoIHBheW1lbnQgdHlwZSBpZiBpdCdzIG9uZSB0aGF0IHdlIHJlY29nbml6ZSBhcyBkaXN0aW5jdFxuICAgICAgICBpZiAoZXZlbnQuYnJhbmQpIHtcbiAgICAgICAgICBpZiAoIGV2ZW50LmJyYW5kID09PSAnYW1leCcgKSB7XG4gICAgICAgICAgICBzdHJpcGVfcGF5bWVudF90eXBlID0gJ2FtZXgnO1xuICAgICAgICAgIH0gICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgLy8gZXJyb3IgaGFuZGxpbmdcbiAgICAgICAgdGhhdC5zdHJpcGVFcnJvckRpc3BsYXkoZXZlbnQuZXJyb3IsICQob3B0aW9ucy5jY19udW1fc2VsZWN0b3IsIGVsZW1lbnQpLCBlbGVtZW50LCBvcHRpb25zICk7XG4gICAgICAgIC8vIGlmIGl0IGNoYW5nZWQsIHJlc2V0IHRoZSBidXR0b25cbiAgICAgICAgdGhhdC5idXR0b25TdGF0dXMob3B0aW9ucywgJCh0aGF0Lm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLmZpbmQoJ2J1dHRvbicpLCBmYWxzZSk7XG4gICAgICAgIHRoYXQuY2FsY3VsYXRlRmVlcyh0aGF0Lm9wdGlvbnMub3JpZ2luYWxfYW1vdW50LCBzdHJpcGVfcGF5bWVudF90eXBlKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGF0LmNhcmRFeHBpcnlFbGVtZW50Lm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAvLyBlcnJvciBoYW5kbGluZ1xuICAgICAgICB0aGF0LnN0cmlwZUVycm9yRGlzcGxheShldmVudC5lcnJvciwgJChvcHRpb25zLmNjX2V4cF9zZWxlY3RvciwgZWxlbWVudCksIGVsZW1lbnQsIG9wdGlvbnMgKTtcbiAgICAgICAgLy8gaWYgaXQgY2hhbmdlZCwgcmVzZXQgdGhlIGJ1dHRvblxuICAgICAgICB0aGF0LmJ1dHRvblN0YXR1cyhvcHRpb25zLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIGZhbHNlKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGF0LmNhcmRDdmNFbGVtZW50Lm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAvLyBlcnJvciBoYW5kbGluZ1xuICAgICAgICB0aGF0LnN0cmlwZUVycm9yRGlzcGxheShldmVudC5lcnJvciwgJChvcHRpb25zLmNjX2N2Y19zZWxlY3RvciwgZWxlbWVudCksIGVsZW1lbnQsIG9wdGlvbnMgKTtcbiAgICAgICAgLy8gaWYgaXQgY2hhbmdlZCwgcmVzZXQgdGhlIGJ1dHRvblxuICAgICAgICB0aGF0LmJ1dHRvblN0YXR1cyhvcHRpb25zLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIGZhbHNlKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyB0aGlzIGlzIHRoZSBtZXRob2QgdG8gY3JlYXRlIGEgc2luZ2xlIGNhcmQgZmllbGQgYW5kIG1vdW50IGl0XG4gICAgICAvKnZhciBjYXJkID0gdGhhdC5lbGVtZW50cy5jcmVhdGUoXG4gICAgICAgICdjYXJkJyxcbiAgICAgICAge1xuICAgICAgICAgIGhpZGVQb3N0YWxDb2RlOiB0cnVlXG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgICAvLyBBZGQgYW4gaW5zdGFuY2Ugb2YgdGhlIGNhcmQgVUkgY29tcG9uZW50IGludG8gdGhlIGBjYXJkLWVsZW1lbnRgIDxkaXY+XG4gICAgICBjYXJkLm1vdW50KCcjY2FyZC1lbGVtZW50Jyk7Ki9cblxuICAgIH0sIC8vIGNyZWRpdENhcmRGaWVsZHNcblxuICAgIHNob3dTcGlubmVyOiBmdW5jdGlvbigpIHtcbiAgICAgICQodGhpcy5vcHRpb25zLnBsYWlkX2xpbmspLmhpZGUoKTtcbiAgICAgICQodGhpcy5vcHRpb25zLnBsYWlkX2xpbmspLmFmdGVyKCc8ZGl2IGNsYXNzPVwiYS1zcGlubmVyXCI+PGltZyBzcmM9XCJodHRwczovL3d3dy5taW5ucG9zdC5jb20vd3AtYWRtaW4vaW1hZ2VzL3NwaW5uZXIuZ2lmXCIgc3Jjc2V0PVwiaHR0cHM6Ly93d3cubWlubnBvc3QuY29tL3dwLWFkbWluL2ltYWdlcy9zcGlubmVyLmdpZiAxeCwgaHR0cHM6Ly93d3cubWlubnBvc3QuY29tL3dwLWFkbWluL2ltYWdlcy9zcGlubmVyLTJ4LmdpZiAyeCxcIj48L2Rpdj4nKTtcbiAgICB9LFxuXG4gICAgaGlkZVNwaW5uZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgJCh0aGlzLm9wdGlvbnMucGxhaWRfbGluaykuc2hvdygpO1xuICAgICAgJCgnLmEtc3Bpbm5lcicpLmhpZGUoKTtcbiAgICB9LFxuXG4gICAgYWNoRmllbGRzOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICB2YXIgYmFua1Rva2VuRmllbGROYW1lID0gJ2JhbmtUb2tlbic7XG4gICAgICB2YXIgYmFua1Rva2VuRmllbGQgPSAnaW5wdXRbbmFtZT1cIicgKyBiYW5rVG9rZW5GaWVsZE5hbWUgKyAnXCJdJztcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIC8vIHRoZSBidXR0b24gc2hvdWxkIG5vdCBiZSBjbGlja2FibGUgdW50aWwgdGhlIHVzZXIgaGFzIHNpZ25lZCBpblxuICAgICAgdGhhdC5idXR0b25EaXNhYmxlZChvcHRpb25zLCB0cnVlLCAnJywgJ1NpZ24gaW4gdG8geW91ciBiYW5rIGFjY291bnQgKGFib3ZlKSBmaXJzdCcpO1xuXG4gICAgICBpZiAodHlwZW9mIFBsYWlkICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aGF0LmxpbmtIYW5kbGVyID0gUGxhaWQuY3JlYXRlKHtcbiAgICAgICAgICBjbGllbnROYW1lOiAnTWlublBvc3QnLFxuICAgICAgICAgIGVudjogb3B0aW9ucy5wbGFpZF9lbnYsXG4gICAgICAgICAgcHJvZHVjdDogWydhdXRoJ10sXG4gICAgICAgICAgLy8gMS4gUGFzcyB0aGUgdG9rZW4gZ2VuZXJhdGVkIGluIHN0ZXAgMi5cbiAgICAgICAgICB0b2tlbjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYWlkX2xpbmtfdG9rZW4nKS52YWx1ZSxcbiAgICAgICAgICBvblN1Y2Nlc3M6IGZ1bmN0aW9uKHB1YmxpY190b2tlbiwgbWV0YWRhdGEpIHtcbiAgICAgICAgICAgIHRoYXQuc2hvd1NwaW5uZXIoKTtcbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgIHVybDonL2dldF9wbGFpZF9hY2Nlc3NfdG9rZW4vJyxcbiAgICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoeyBwdWJsaWNfdG9rZW46IHB1YmxpY190b2tlbiwgYWNjb3VudF9pZDogbWV0YWRhdGEuYWNjb3VudF9pZCB9KSxcbiAgICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZXNwb25zZS5lcnJvciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAvLyB0aGVyZSBpcyBhbiBlcnJvci5cbiAgICAgICAgICAgICAgICB0aGF0LmhpZGVTcGlubmVyKCk7XG4gICAgICAgICAgICAgICAgJChvcHRpb25zLnBsYWlkX2xpbmspLmJlZm9yZSgnPHAgY2xhc3M9XCJhLWVycm9yIGEtdmFsaWRhdGlvbi1lcnJvclwiPicgKyByZXNwb25zZS5lcnJvciArICc8L3A+Jyk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy90aGlzLmRlYnVnKCdwcmludCByZXNwb25zZSBoZXJlJyk7XG4gICAgICAgICAgICAgICAgLy90aGlzLmRlYnVnKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAvLyBhZGQgdGhlIGZpZWxkKHMpIHdlIG5lZWQgdG8gdGhlIGZvcm0gZm9yIHN1Ym1pdHRpbmdcbiAgICAgICAgICAgICAgICBpZiAoJChiYW5rVG9rZW5GaWVsZCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgJChiYW5rVG9rZW5GaWVsZCkudmFsKHJlc3BvbnNlLnN0cmlwZV9iYW5rX2FjY291bnRfdG9rZW4pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAkKG9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLnByZXBlbmQoJCgnPGlucHV0IHR5cGU9XFxcImhpZGRlblxcXCIgbmFtZT1cIicgKyBiYW5rVG9rZW5GaWVsZE5hbWUgKyAnXCI+JykudmFsKHJlc3BvbnNlLnN0cmlwZV9iYW5rX2FjY291bnRfdG9rZW4pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgJChvcHRpb25zLnBsYWlkX2xpbmssIGVsZW1lbnQpLmh0bWwoJzxzdHJvbmc+WW91ciBhY2NvdW50IHdhcyBzdWNjZXNzZnVsbHkgYXV0aG9yaXplZDwvc3Ryb25nPicpO1xuICAgICAgICAgICAgICAgIHRoYXQuaGlkZVNwaW5uZXIoKTtcbiAgICAgICAgICAgICAgICB0aGF0LmJ1dHRvbkRpc2FibGVkKG9wdGlvbnMsIGZhbHNlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgIHRoYXQuZGVidWcocmVzcG9uc2UpO1xuICAgICAgICAgICAgICB0aGF0LmhpZGVTcGlubmVyKCk7XG4gICAgICAgICAgICAgICQob3B0aW9ucy5wbGFpZF9saW5rKS5iZWZvcmUoJzxwIGNsYXNzPVwiYS1lcnJvciBhLXZhbGlkYXRpb24tZXJyb3JcIj4nICsgcmVzcG9uc2UuZXJyb3IgKyAnPC9wPicpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICAgICQob3B0aW9ucy5wbGFpZF9saW5rICsgJyBhJykuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHRoYXQucmVzZXRGb3JtRXJyb3JzKHRoYXQub3B0aW9ucywgdGhhdC5lbGVtZW50KTtcbiAgICAgICAgICAvLyQob3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvciArICcgLmEtZXJyb3InKS5yZW1vdmUoKTsgLy8gcmVtb3ZlIG1ldGhvZCBlcnJvciBtZXNzYWdlIGlmIGl0IGlzIHRoZXJlXG4gICAgICAgICAgdGhhdC5saW5rSGFuZGxlci5vcGVuKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sIC8vIGFjaEZpZWxkc1xuXG4gICAgYnV0dG9uU3RhdHVzOiBmdW5jdGlvbihvcHRpb25zLCBidXR0b24sIGRpc2FibGVkKSB7XG4gICAgICAvLyBtYWtlIHRoZSBidXR0b24gY2xpY2thYmxlIG9yIG5vdFxuICAgICAgdGhpcy5idXR0b25EaXNhYmxlZChvcHRpb25zLCBkaXNhYmxlZCwgYnV0dG9uKTtcbiAgICAgIGlmIChkaXNhYmxlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgYnV0dG9uLnRleHQob3B0aW9ucy5idXR0b25fdGV4dCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBidXR0b24udGV4dCgnUHJvY2Vzc2luZycpO1xuICAgICAgfVxuICAgIH0sIC8vIGJ1dHRvblN0YXR1c1xuXG4gICAgYnV0dG9uRGlzYWJsZWQ6IGZ1bmN0aW9uKG9wdGlvbnMsIGRpc2FibGVkLCBidXR0b24gPSAnJywgbWVzc2FnZSA9ICcnLCBhY2hfd2FzX2luaXRpYWxpemVkID0gZmFsc2UpIHtcbiAgICAgIGlmIChidXR0b24gPT09ICcnKSB7XG4gICAgICAgIGJ1dHRvbiA9ICQob3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyk7XG4gICAgICB9XG4gICAgICBidXR0b24ucHJvcCgnZGlzYWJsZWQnLCBkaXNhYmxlZCk7XG4gICAgICBpZiAobWVzc2FnZSAhPT0gJycpIHtcbiAgICAgICAgaWYgKGRpc2FibGVkID09PSB0cnVlKSB7XG4gICAgICAgICAgYnV0dG9uLmF0dHIoJ2RhdGEtdGxpdGUnLCBtZXNzYWdlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBidXR0b24ucmVtb3ZlQXR0ciggJ2RhdGEtdGxpdGUnICk7IC8vIHRoZXJlIHNob3VsZCBiZSBubyB0bGl0ZSB2YWx1ZSBpZiB0aGUgYnV0dG9uIGlzIGVuYWJsZWRcbiAgICAgICAgfVxuICAgICAgICBidXR0b24ub24oJ21vdXNlZW50ZXIgZm9jdXMnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIHRsaXRlLnNob3coICggdGhpcyApLCB7IGdyYXY6ICdudycgfSApO1xuICAgICAgICB9KTtcbiAgICAgICAgYnV0dG9uLm9uKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICB0bGl0ZS5oaWRlKCAoIHRoaXMgKSApO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJ1dHRvbi5yZW1vdmVBdHRyKCAnZGF0YS10bGl0ZScgKTtcbiAgICAgICAgaWYgKGFjaF93YXNfaW5pdGlhbGl6ZWQgPT09IHRydWUgKSB7XG4gICAgICAgICAgYnV0dG9uLm9uKCdtb3VzZWVudGVyIGZvY3VzJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIHRsaXRlLmhpZGUoICggdGhpcyApICk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYnV0dG9uLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIC8vIGJ1dHRvbkRpc2FibGVkXG5cbiAgICB2YWxpZGF0ZVNldHVwOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICB2YXIgZm9ybXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKG9wdGlvbnMuZm9ybV9zZWxlY3Rvcik7XG4gICAgICBmb3Jtcy5mb3JFYWNoKCBmdW5jdGlvbiAoIGZvcm0gKSB7XG4gICAgICAgIFZhbGlkRm9ybSggZm9ybSwge1xuICAgICAgICAgIHZhbGlkYXRpb25FcnJvclBhcmVudENsYXNzOiAnbS1oYXMtdmFsaWRhdGlvbi1lcnJvcicsXG4gICAgICAgICAgdmFsaWRhdGlvbkVycm9yQ2xhc3M6ICdhLXZhbGlkYXRpb24tZXJyb3InLFxuICAgICAgICAgIGludmFsaWRDbGFzczogJ2EtZXJyb3InLFxuICAgICAgICAgIGVycm9yUGxhY2VtZW50OiAnYWZ0ZXInXG4gICAgICAgIH0gKVxuICAgICAgfSApO1xuICAgICAgdGhpcy5zY3JvbGxUb0Zvcm1FcnJvcihvcHRpb25zKTtcbiAgICB9LCAvLyB2YWxpZGF0ZVNldHVwXG5cbiAgICBzY3JvbGxUb0Zvcm1FcnJvcjogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgdmFyIGZvcm0gPSAkKCBvcHRpb25zLmZvcm1fc2VsZWN0b3IgKTtcbiAgICAgIC8vIGxpc3RlbiBmb3IgYGludmFsaWRgIGV2ZW50cyBvbiBhbGwgZm9ybSBpbnB1dHNcbiAgICAgIGZvcm0uZmluZCggJzppbnB1dCcgKS5vbiggJ2ludmFsaWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyIGlucHV0ID0gJCggdGhpcyApO1xuICAgICAgICAgIC8vIHRoZSBmaXJzdCBpbnZhbGlkIGVsZW1lbnQgaW4gdGhlIGZvcm1cbiAgICAgICAgdmFyIGZpcnN0ID0gZm9ybS5maW5kKCAnLmEtZXJyb3InICkuZmlyc3QoKTtcbiAgICAgICAgLy8gdGhlIGZvcm0gaXRlbSB0aGF0IGNvbnRhaW5zIGl0XG4gICAgICAgIHZhciBmaXJzdF9ob2xkZXIgPSBmaXJzdC5wYXJlbnQoKTtcbiAgICAgICAgICAvLyBvbmx5IGhhbmRsZSBpZiB0aGlzIGlzIHRoZSBmaXJzdCBpbnZhbGlkIGlucHV0XG4gICAgICAgICAgaWYgKGlucHV0WzBdID09PSBmaXJzdFswXSkge1xuICAgICAgICAgICAgICAvLyBoZWlnaHQgb2YgdGhlIG5hdiBiYXIgcGx1cyBzb21lIHBhZGRpbmcgaWYgdGhlcmUncyBhIGZpeGVkIG5hdlxuICAgICAgICAgICAgICAvL3ZhciBuYXZiYXJIZWlnaHQgPSBuYXZiYXIuaGVpZ2h0KCkgKyA1MFxuXG4gICAgICAgICAgICAgIC8vIHRoZSBwb3NpdGlvbiB0byBzY3JvbGwgdG8gKGFjY291bnRpbmcgZm9yIHRoZSBuYXZiYXIgaWYgaXQgZXhpc3RzKVxuICAgICAgICAgICAgICB2YXIgZWxlbWVudE9mZnNldCA9IGZpcnN0X2hvbGRlci5vZmZzZXQoKS50b3A7XG5cbiAgICAgICAgICAgICAgLy8gdGhlIGN1cnJlbnQgc2Nyb2xsIHBvc2l0aW9uIChhY2NvdW50aW5nIGZvciB0aGUgbmF2YmFyKVxuICAgICAgICAgICAgICB2YXIgcGFnZU9mZnNldCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcblxuICAgICAgICAgICAgICAvLyBkb24ndCBzY3JvbGwgaWYgdGhlIGVsZW1lbnQgaXMgYWxyZWFkeSBpbiB2aWV3XG4gICAgICAgICAgICAgIGlmICggZWxlbWVudE9mZnNldCA+IHBhZ2VPZmZzZXQgJiYgZWxlbWVudE9mZnNldCA8IHBhZ2VPZmZzZXQgKyB3aW5kb3cuaW5uZXJIZWlnaHQgKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIC8vIG5vdGU6IGF2b2lkIHVzaW5nIGFuaW1hdGUsIGFzIGl0IHByZXZlbnRzIHRoZSB2YWxpZGF0aW9uIG1lc3NhZ2UgZGlzcGxheWluZyBjb3JyZWN0bHlcbiAgICAgICAgICAgICAgJCggJ2h0bWwsIGJvZHknICkuc2Nyb2xsVG9wKCBlbGVtZW50T2Zmc2V0ICk7XG4gICAgICAgICAgfVxuICAgICAgfSApO1xuICAgIH0sIC8vIHNjcm9sbFRvRm9ybUVycm9yXG5cbiAgICBmb3JtU2V0dXA6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcblxuICAgICAgJChvcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5zdWJtaXQoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhhdC5mb3JtUHJvY2Vzc29yKHRoYXQsICdzdWJtaXQnKTtcblxuICAgICAgfSk7XG4gICAgfSwgLy8gZm9ybVNldHVwXG5cbiAgICBmb3JtUHJvY2Vzc29yOiBmdW5jdGlvbih0aGF0LCB0eXBlKSB7XG5cbiAgICAgIC8vIDEuIHJlbW92ZSBwcmV2aW91cyBlcnJvcnMgYW5kIHJlc2V0IHRoZSBidXR0b25cbiAgICAgIHRoYXQucmVzZXRGb3JtRXJyb3JzKHRoYXQub3B0aW9ucywgdGhhdC5lbGVtZW50KTtcblxuICAgICAgLy8gMi4gc2V0IHVwIHRoZSBidXR0b24gaWYgaXQncyBhIGZvcm0gc3VibWl0XG4gICAgICBpZiAodHlwZSA9PT0gJ3N1Ym1pdCcpIHtcbiAgICAgICAgdGhhdC5idXR0b25TdGF0dXModGhhdC5vcHRpb25zLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIHRydWUpO1xuICAgICAgfVxuXG4gICAgICAvLyAzLiBnZW5lcmF0ZSBiaWxsaW5nIGFkZHJlc3MgZGV0YWlsc1xuICAgICAgdmFyIGJpbGxpbmdEZXRhaWxzID0gdGhhdC5nZW5lcmF0ZUJpbGxpbmdEZXRhaWxzKCk7XG5cbiAgICAgIC8vIDQuIGNyZWF0ZSBtaW5ucG9zdCB1c2VyIGFjY291bnRcbiAgICAgIHRoYXQuY3JlYXRlTWlublBvc3RBY2NvdW50KHRoYXQub3B0aW9ucywgdGhhdC5lbGVtZW50KTtcblxuICAgICAgLy8gNS4gZG8gdGhlIGNoYXJnaW5nIG9mIGNhcmQgb3IgYmFuayBhY2NvdW50IGlmIGl0J3MgYSBmb3JtIHN1Ym1pdFxuICAgICAgLy8gb3Igc3VibWl0IHRoZSBmb3JtIGlmIHRoaXMgaXMgYSBwYXltZW50IHJlcXVlc3QgYnV0dG9uXG4gICAgICBpZiAodHlwZSA9PT0gJ3N1Ym1pdCcpIHtcbiAgICAgICAgdmFyIHBheW1lbnRfdHlwZSA9ICQoJ2lucHV0W25hbWU9XCJzdHJpcGVfcGF5bWVudF90eXBlXCJdJykudmFsKCk7XG4gICAgICAgIGlmIChwYXltZW50X3R5cGUgIT09ICdiYW5rX2FjY291bnQnKSB7XG4gICAgICAgICAgLy8gZmluYWxseSwgZ2V0IGEgcGF5bWVudCBtZXRob2QgZnJvbSBzdHJpcGUsIGFuZCB0cnkgdG8gY2hhcmdlIGl0IGlmIGl0IGlzIG5vdCBhY2hcbiAgICAgICAgICB0aGF0LmNyZWF0ZVBheW1lbnRNZXRob2QodGhhdC5jYXJkTnVtYmVyRWxlbWVudCwgYmlsbGluZ0RldGFpbHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGlmIGl0IGlzIGFjaCwgd2UgYWxyZWFkeSBoYXZlIGEgdG9rZW4gc28gc3VibWl0IHRoZSBmb3JtXG4gICAgICAgICAgLy8gdG9kbzogdXBncmFkZSB0aGUgcGxhaWQgaW50ZWdyYXRpb25cbiAgICAgICAgICB0aGF0LmJhbmtUb2tlbkhhbmRsZXIoICQoJ2lucHV0W25hbWU9XCJiYW5rVG9rZW5cIl0nKS52YWwoKSwgJ2JhbmtfYWNjb3VudCcgKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhhdC5zdWJtaXRGb3JtT25seSgpO1xuICAgICAgfVxuICAgIH0sIC8vIGZvcm1Qcm9jZXNzb3JcblxuICAgIHN0cmlwZUVycm9yRGlzcGxheTogZnVuY3Rpb24oZXJyb3IsIHRoaXNfc2VsZWN0b3IsIGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIC8vIGxpc3RlbiBmb3IgZXJyb3JzIGFuZCBkaXNwbGF5L2hpZGUgZXJyb3IgbWVzc2FnZXNcbiAgICAgIHZhciB3aGljaF9lcnJvciA9IHRoaXNfc2VsZWN0b3IuYXR0cignaWQnKTtcbiAgICAgIC8vIHdoZW4gdGhpcyBmaWVsZCBjaGFuZ2VzLCByZXNldCBpdHMgZXJyb3JzXG4gICAgICAkKCcuYS1jYXJkLWluc3RydWN0aW9uLicgKyB3aGljaF9lcnJvcikucmVtb3ZlQ2xhc3MoJ2EtdmFsaWRhdGlvbi1lcnJvcicpO1xuICAgICAgJCgnLmEtY2FyZC1pbnN0cnVjdGlvbi4nICsgd2hpY2hfZXJyb3IpLmVtcHR5KCk7XG4gICAgICAkKHRoaXNfc2VsZWN0b3IpLnJlbW92ZUNsYXNzKCdhLWVycm9yJyk7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgaWYgKCQoJy5hLWNhcmQtaW5zdHJ1Y3Rpb24uJyArIHdoaWNoX2Vycm9yKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgJCgnLmEtY2FyZC1pbnN0cnVjdGlvbi4nICsgd2hpY2hfZXJyb3IpLnRleHQoZXJyb3IubWVzc2FnZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpc19zZWxlY3Rvci5wYXJlbnQoKS5hcHBlbmQoJzxwIGNsYXNzPVwiYS1jYXJkLWluc3RydWN0aW9uICcgKyB3aGljaF9lcnJvciArICdcIj4nICsgZXJyb3IubWVzc2FnZSArICc8L3A+Jyk7XG4gICAgICAgIH1cbiAgICAgICAgJCgnLmEtY2FyZC1pbnN0cnVjdGlvbi4nICsgd2hpY2hfZXJyb3IpLmFkZENsYXNzKCdhLXZhbGlkYXRpb24tZXJyb3InKTtcbiAgICAgICAgdGhpc19zZWxlY3Rvci5wYXJlbnQoKS5hZGRDbGFzcygnbS1oYXMtdmFsaWRhdGlvbi1lcnJvcicpO1xuICAgICAgICAkKHRoaXNfc2VsZWN0b3IpLmFkZENsYXNzKCdhLWVycm9yJyk7XG4gICAgICAgIGlmICh0aGlzX3NlbGVjdG9yLnBhcmVudCgpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgICBzY3JvbGxUb3A6IHRoaXNfc2VsZWN0b3IucGFyZW50KCkub2Zmc2V0KCkudG9wXG4gICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQodGhpc19zZWxlY3RvcikucmVtb3ZlQ2xhc3MoJ2EtZXJyb3InKTtcbiAgICAgICAgJCgnLmEtY2FyZC1pbnN0cnVjdGlvbi4nICsgd2hpY2hfZXJyb3IpLnJlbW92ZUNsYXNzKCdhLXZhbGlkYXRpb24tZXJyb3InKTtcbiAgICAgICAgJCgnLmEtY2FyZC1pbnN0cnVjdGlvbi4nICsgd2hpY2hfZXJyb3IpLmVtcHR5KCk7XG4gICAgICAgICQob3B0aW9ucy5jY19udW1fc2VsZWN0b3IsIGVsZW1lbnQpLnJlbW92ZUNsYXNzKCdhLXZhbGlkYXRpb24tZXJyb3InKTtcbiAgICAgICAgJChvcHRpb25zLmNjX2V4cF9zZWxlY3RvciwgZWxlbWVudCkucmVtb3ZlQ2xhc3MoJ2EtdmFsaWRhdGlvbi1lcnJvcicpO1xuICAgICAgICAkKG9wdGlvbnMuY2NfY3ZjX3NlbGVjdG9yLCBlbGVtZW50KS5yZW1vdmVDbGFzcygnYS12YWxpZGF0aW9uLWVycm9yJyk7XG4gICAgICAgICQob3B0aW9ucy5jY19udW1fc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdtLWhhcy12YWxpZGF0aW9uLWVycm9yJyk7XG4gICAgICAgICQob3B0aW9ucy5jY19leHBfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdtLWhhcy12YWxpZGF0aW9uLWVycm9yJyk7XG4gICAgICAgICQob3B0aW9ucy5jY19jdmNfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdtLWhhcy12YWxpZGF0aW9uLWVycm9yJyk7XG4gICAgICB9XG4gICAgfSwgLy8gc3RyaXBlRXJyb3JEaXNwbGF5XG5cbiAgICByZXNldEZvcm1FcnJvcnM6IGZ1bmN0aW9uKG9wdGlvbnMsIGVsZW1lbnQpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICQoJy5hLXZhbGlkYXRpb24tZXJyb3InKS5yZW1vdmUoKTtcbiAgICAgICQoJ2lucHV0LCBsYWJlbCwgZGl2JywgZWxlbWVudCkucmVtb3ZlQ2xhc3MoJ2EtZXJyb3InKTtcbiAgICAgICQoJ2xhYmVsJywgZWxlbWVudCkucmVtb3ZlQ2xhc3MoJ20taGFzLXZhbGlkYXRpb24tZXJyb3InKTtcbiAgICAgICQob3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvciwgZWxlbWVudCkucmVtb3ZlQ2xhc3MoJ2EtZXJyb3IgaW52YWxpZCcpO1xuICAgICAgJCgnLmEtdmFsaWRhdGlvbi1lcnJvcicpLnJlbW92ZSgpO1xuICAgICAgXG4gICAgICAkKG9wdGlvbnMuY2hvb3NlX3BheW1lbnQgKyAnIGlucHV0JykuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICAkKG9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IgKyAnIC5hLWVycm9yJykucmVtb3ZlKCk7IC8vIHJlbW92ZSBtZXRob2QgZXJyb3IgbWVzc2FnZSBpZiBpdCBpcyB0aGVyZVxuICAgICAgICAkKG9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IpLnBhcmVudCgpLmZpbmQoJy5hLXZhbGlkYXRpb24tZXJyb3InKS5yZW1vdmUoKTtcbiAgICAgICAgLy8gaWYgYSBwYXltZW50IGZpZWxkIGNoYW5nZWQsIHJlc2V0IHRoZSBidXR0b25cbiAgICAgICAgdGhhdC5idXR0b25TdGF0dXMob3B0aW9ucywgJChvcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKSwgZmFsc2UpO1xuICAgICAgfSk7XG4gICAgfSwgLy8gcmVzZXRGb3JtRXJyb3JzXG4gICAgXG4gICAgY3JlYXRlTWlublBvc3RBY2NvdW50OiBmdW5jdGlvbihvcHRpb25zLCBlbGVtZW50KSB7XG4gICAgICAvLyAyLiBjcmVhdGUgbWlubnBvc3QgYWNjb3VudCBpZiBzcGVjaWZpZWRcbiAgICAgIGlmIChvcHRpb25zLmNyZWF0ZV9hY2NvdW50ID09PSB0cnVlKSB7XG4gICAgICAgIHZhciB1c2VyID0ge1xuICAgICAgICAgIGVtYWlsOiAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgIGZpcnN0X25hbWU6ICQob3B0aW9ucy5maXJzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICBsYXN0X25hbWU6ICQob3B0aW9ucy5sYXN0X25hbWVfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgIHBhc3N3b3JkOiAkKG9wdGlvbnMucGFzc3dvcmRfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgIGNpdHk6ICQob3B0aW9ucy5iaWxsaW5nX2NpdHlfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgIHN0YXRlOiAkKG9wdGlvbnMuYmlsbGluZ19zdGF0ZV9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgemlwOiAkKG9wdGlvbnMuYmlsbGluZ196aXBfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICB9O1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIHVybDogb3B0aW9ucy5taW5ucG9zdF9yb290ICsgJy93cC1qc29uL3VzZXItYWNjb3VudC1tYW5hZ2VtZW50L3YxL2NyZWF0ZS11c2VyJyxcbiAgICAgICAgICBkYXRhOiB1c2VyXG4gICAgICAgIH0pLmRvbmUoZnVuY3Rpb24oIGRhdGEgKSB7XG4gICAgICAgICAgaWYgKGRhdGEuc3RhdHVzID09PSAnc3VjY2VzcycgJiYgZGF0YS5yZWFzb24gPT09ICduZXcgdXNlcicpIHtcbiAgICAgICAgICAgIC8vIHVzZXIgY3JlYXRlZCAtIHRoZXkgc2hvdWxkIHJlY2VpdmUgZW1haWxcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sIC8vIGNyZWF0ZU1pbm5Qb3N0QWNjb3VudFxuICAgIFxuICAgIGdlbmVyYXRlQmlsbGluZ0RldGFpbHM6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGJpbGxpbmdEZXRhaWxzID0ge307XG4gICAgICB2YXIgYWRkcmVzc0RldGFpbHMgPSB7fTtcblxuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yKS52YWwoKSAhPSAnJykge1xuICAgICAgICBiaWxsaW5nRGV0YWlscy5lbWFpbCA9ICQodGhpcy5vcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yKS52YWwoKTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgdmFyIGZ1bGxfbmFtZSA9ICcnO1xuICAgICAgaWYgKCQoJyNmdWxsX25hbWUnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGZ1bGxfbmFtZSA9ICQoJyNmdWxsX25hbWUnKS52YWwoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZ1bGxfbmFtZSA9ICQodGhpcy5vcHRpb25zLmZpcnN0X25hbWVfZmllbGRfc2VsZWN0b3IpLnZhbCgpICsgJyAnICsgJCh0aGlzLm9wdGlvbnMubGFzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yKS52YWwoKTtcbiAgICAgIH1cbiAgICAgIGJpbGxpbmdEZXRhaWxzLm5hbWUgPSBmdWxsX25hbWU7XG5cbiAgICAgIHZhciBzdHJlZXQgPSAnTm9uZSc7XG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuYmlsbGluZ19zdHJlZXRfZmllbGRfc2VsZWN0b3IpLnZhbCgpICE9ICcnKSB7XG4gICAgICAgIHN0cmVldCA9ICQodGhpcy5vcHRpb25zLmJpbGxpbmdfc3RyZWV0X2ZpZWxkX3NlbGVjdG9yKS52YWwoKTtcbiAgICAgICAgYWRkcmVzc0RldGFpbHMubGluZTEgPSBzdHJlZXQ7XG4gICAgICB9XG5cbiAgICAgIHZhciBjaXR5ID0gJ05vbmUnO1xuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmJpbGxpbmdfY2l0eV9maWVsZF9zZWxlY3RvcikudmFsKCkgIT0gJycpIHtcbiAgICAgICAgY2l0eSA9ICQodGhpcy5vcHRpb25zLmJpbGxpbmdfY2l0eV9maWVsZF9zZWxlY3RvcikudmFsKCk7XG4gICAgICAgIGFkZHJlc3NEZXRhaWxzLmNpdHkgPSBjaXR5O1xuICAgICAgfVxuXG4gICAgICB2YXIgc3RhdGUgPSAnTm9uZSc7XG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuYmlsbGluZ19zdGF0ZV9maWVsZF9zZWxlY3RvcikudmFsKCkgIT0gJycpIHtcbiAgICAgICAgc3RhdGUgPSAkKHRoaXMub3B0aW9ucy5iaWxsaW5nX3N0YXRlX2ZpZWxkX3NlbGVjdG9yKS52YWwoKTtcbiAgICAgICAgYWRkcmVzc0RldGFpbHMuc3RhdGUgPSBzdGF0ZTtcbiAgICAgIH1cblxuICAgICAgdmFyIHppcCA9ICdOb25lJztcbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5iaWxsaW5nX3ppcF9maWVsZF9zZWxlY3RvcikudmFsKCkgIT0gJycpIHtcbiAgICAgICAgemlwID0gJCh0aGlzLm9wdGlvbnMuYmlsbGluZ196aXBfZmllbGRfc2VsZWN0b3IpLnZhbCgpO1xuICAgICAgICBhZGRyZXNzRGV0YWlscy5wb3N0YWxfY29kZSA9IHppcDtcbiAgICAgIH1cblxuICAgICAgdmFyIGNvdW50cnkgPSAnVVMnO1xuICAgICAgdmFyIGNvdW50cnlfZmllbGRfdmFsdWUgPSAkKHRoaXMub3B0aW9ucy5iaWxsaW5nX2NvdW50cnlfZmllbGRfc2VsZWN0b3IpLnZhbCgpO1xuICAgICAgaWYgKGNvdW50cnlfZmllbGRfdmFsdWUgIT0gJycgJiYgY291bnRyeV9maWVsZF92YWx1ZSAhPSAnVW5pdGVkIFN0YXRlcycpIHtcbiAgICAgICAgY291bnRyeSA9IGNvdW50cnlfZmllbGRfdmFsdWU7XG4gICAgICB9XG4gICAgICBhZGRyZXNzRGV0YWlscy5jb3VudHJ5ID0gY291bnRyeTtcblxuICAgICAgaWYgKHN0cmVldCAhPT0gJ05vbmUnIHx8IGNpdHkgIT09ICdOb25lJyB8fCBzdGF0ZSAhPT0gJ05vbmUnIHx8IHppcCAhPT0gJ05vbmUnKSB7XG4gICAgICAgIGJpbGxpbmdEZXRhaWxzLmFkZHJlc3MgPSBhZGRyZXNzRGV0YWlscztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGJpbGxpbmdEZXRhaWxzO1xuICAgIH0sIC8vIGdlbmVyYXRlQmlsbGluZ0RldGFpbHNcblxuICAgIGNyZWF0ZVBheW1lbnRNZXRob2Q6IGZ1bmN0aW9uKGNhcmRFbGVtZW50LCBiaWxsaW5nRGV0YWlscykge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdGhhdC5zdHJpcGUuY3JlYXRlUGF5bWVudE1ldGhvZCh7XG4gICAgICAgIHR5cGU6ICdjYXJkJyxcbiAgICAgICAgY2FyZDogY2FyZEVsZW1lbnQsXG4gICAgICAgIGJpbGxpbmdfZGV0YWlsczogYmlsbGluZ0RldGFpbHNcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKHJlc3BvbnNlLmVycm9yKSB7XG4gICAgICAgICAgdGhhdC5oYW5kbGVTZXJ2ZXJFcnJvcihyZXNwb25zZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gU2VuZCBwYXltZW50TWV0aG9kLmlkIHRvIHNlcnZlclxuICAgICAgICAgIHZhciBzdXBwb3J0Zm9ybSA9ICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKTtcbiAgICAgICAgICB2YXIgYWpheF91cmwgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG4gICAgICAgICAgdmFyIHRva2VuRmllbGROYW1lID0gJ3BheW1lbnRfbWV0aG9kX2lkJztcbiAgICAgICAgICB2YXIgdG9rZW5GaWVsZCA9ICdpbnB1dFtuYW1lPVwiJyArIHRva2VuRmllbGROYW1lICsgJ1wiXSc7XG5cbiAgICAgICAgICAvLyBJbnNlcnQgdGhlIHBheW1lbnQgbWV0aG9kIElEIGludG8gdGhlIGZvcm0gc28gaXQgZ2V0cyBzdWJtaXR0ZWQgdG8gdGhlIHNlcnZlclxuICAgICAgICAgIGlmICgkKHRva2VuRmllbGQpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICQodG9rZW5GaWVsZCkudmFsKHJlc3BvbnNlLnBheW1lbnRNZXRob2QuaWQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdXBwb3J0Zm9ybS5hcHBlbmQoJCgnPGlucHV0IHR5cGU9XFxcImhpZGRlblxcXCIgbmFtZT1cIicgKyB0b2tlbkZpZWxkTmFtZSArICdcIj4nKS52YWwocmVzcG9uc2UucGF5bWVudE1ldGhvZC5pZCkpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGZldGNoKGFqYXhfdXJsLCB7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYm9keTogJChzdXBwb3J0Zm9ybSkuc2VyaWFsaXplKClcbiAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAvLyBIYW5kbGUgc2VydmVyIHJlc3BvbnNlIChzZWUgU3RlcCAzKVxuICAgICAgICAgICAgcmVzcG9uc2UuanNvbigpLnRoZW4oZnVuY3Rpb24oanNvbikge1xuICAgICAgICAgICAgICB0aGF0LmhhbmRsZVNlcnZlclJlc3BvbnNlKGpzb24pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSwgLy8gY3JlYXRlUGF5bWVudE1ldGhvZFxuXG4gICAgYmFua1Rva2VuSGFuZGxlcjogZnVuY3Rpb24odG9rZW4sIHR5cGUpIHtcbiAgICAgIHRoaXMuc2V0U3RyaXBlUGF5bWVudFR5cGUodHlwZSk7XG4gICAgICB0aGlzLnN1Ym1pdEZvcm1Pbmx5KCk7XG4gICAgfSwgLy8gYmFua1Rva2VuSGFuZGxlclxuXG4gICAgc3VibWl0Rm9ybU9ubHk6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdmFyIHN1cHBvcnRmb3JtID0gJCh0aGlzLm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpO1xuICAgICAgdmFyIGFqYXhfdXJsID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xuXG4gICAgICAvLyBTdWJtaXQgdGhlIGZvcm1cbiAgICAgIC8vIHRoZSB3YXkgaXQgd29ya3MgY3VycmVudGx5IGlzIHRoZSBmb3JtIHN1Ym1pdHMgYW4gYWpheCByZXF1ZXN0IHRvIGl0c2VsZlxuICAgICAgLy8gdGhlbiBpdCBzdWJtaXRzIGEgcG9zdCByZXF1ZXN0IHRvIHRoZSBmb3JtJ3MgYWN0aW9uIHVybFxuICAgICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBhamF4X3VybCxcbiAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICBkYXRhOiAkKHN1cHBvcnRmb3JtKS5zZXJpYWxpemUoKSxcbiAgICAgICAgdHlwZTogJ1BPU1QnXG4gICAgICB9KVxuICAgICAgLmRvbmUoZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKHR5cGVvZiByZXNwb25zZS5lcnJvcnMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgdGhhdC5oYW5kbGVTZXJ2ZXJFcnJvcihyZXNwb25zZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3VwcG9ydGZvcm0uZ2V0KDApLnN1Ym1pdCgpOyAvLyBjb250aW51ZSBzdWJtaXR0aW5nIHRoZSBmb3JtIGlmIHRoZSBhamF4IHdhcyBzdWNjZXNzZnVsXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAuZmFpbChmdW5jdGlvbigpIHtcbiAgICAgICAgdGhhdC5idXR0b25TdGF0dXModGhhdC5vcHRpb25zLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIGZhbHNlKTtcbiAgICAgIH0pO1xuICAgIH0sIC8vIHN1Ym1pdEZvcm1Pbmx5XG5cbiAgICBoYW5kbGVTZXJ2ZXJSZXNwb25zZTogZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgIHZhciBzdXBwb3J0Zm9ybSA9ICQodGhpcy5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKTtcbiAgICAgIGlmIChyZXNwb25zZS5lcnJvcnMpIHtcbiAgICAgICAgLy8gU2hvdyBlcnJvciBmcm9tIHNlcnZlciBvbiBwYXltZW50IGZvcm1cbiAgICAgICAgdGhpcy5oYW5kbGVTZXJ2ZXJFcnJvcihyZXNwb25zZSk7XG4gICAgICB9IGVsc2UgaWYgKHJlc3BvbnNlLnJlcXVpcmVzX2FjdGlvbikge1xuICAgICAgICAvLyBVc2UgU3RyaXBlLmpzIHRvIGhhbmRsZSByZXF1aXJlZCBjYXJkIGFjdGlvblxuICAgICAgICAvL2hhbmRsZUFjdGlvbihyZXNwb25zZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdXBwb3J0Zm9ybS5nZXQoMCkuc3VibWl0KCk7IC8vIGNvbnRpbnVlIHN1Ym1pdHRpbmcgdGhlIGZvcm0gaWYgdGhlIGFqYXggd2FzIHN1Y2Nlc3NmdWxcbiAgICAgIH1cbiAgICB9LCAvLyBoYW5kbGVTZXJ2ZXJSZXNwb25zZVxuXG4gICAgaGFuZGxlU2VydmVyRXJyb3I6IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB2YXIgdGhpc19maWVsZCA9ICcnO1xuICAgICAgLy8gZG8gbm90IHN1Ym1pdC4gdGhlcmUgaXMgYW4gZXJyb3IuXG4gICAgICB0aGF0LmJ1dHRvblN0YXR1cyh0aGF0Lm9wdGlvbnMsICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKSwgZmFsc2UpO1xuICAgICAgLy8gaGFuZGxlIGVycm9yIGRpc3BsYXlcbiAgICAgIGlmICh0eXBlb2YgcmVzcG9uc2UuZXJyb3JzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBpZiAodHlwZW9mIHJlc3BvbnNlLmVycm9yc1swXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICB0aGlzX2ZpZWxkID0gcmVzcG9uc2UuZXJyb3JzWzBdLmZpZWxkICsgJ19maWVsZF9zZWxlY3Rvcic7XG4gICAgICAgIH1cbiAgICAgICAgJC5lYWNoKHJlc3BvbnNlLmVycm9ycywgZnVuY3Rpb24oIGluZGV4LCBlcnJvciApIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGVycm9yLmZpZWxkICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdGhpc19maWVsZCA9IGVycm9yLmZpZWxkICsgJ19maWVsZF9zZWxlY3Rvcic7XG4gICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZXJyb3IucGFyYW0gIT09ICd1bmRlZmluZWQnICYmIGVycm9yLnBhcmFtICE9PSAnJykge1xuICAgICAgICAgICAgdGhpc19maWVsZCA9ICdjY18nICsgZXJyb3IucGFyYW0gKyAnX3NlbGVjdG9yJzsgIFxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGF0LmRpc3BsYXlFcnJvck1lc3NhZ2UoZXJyb3IsIHRoaXNfZmllbGQpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHJlc3BvbnNlLmVycm9yICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB2YXIgZXJyb3IgPSByZXNwb25zZS5lcnJvcjtcbiAgICAgICAgaWYgKHR5cGVvZiBlcnJvci5maWVsZCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICB0aGlzX2ZpZWxkID0gZXJyb3IuZmllbGQgKyAnX2ZpZWxkX3NlbGVjdG9yJztcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZXJyb3IucGFyYW0gIT09ICd1bmRlZmluZWQnICYmIGVycm9yLnBhcmFtICE9PSAnJykge1xuICAgICAgICAgIHRoaXNfZmllbGQgPSAnY2NfJyArIGVycm9yLnBhcmFtICsgJ19zZWxlY3Rvcic7ICBcbiAgICAgICAgfVxuICAgICAgICB0aGF0LmRpc3BsYXlFcnJvck1lc3NhZ2UoZXJyb3IsIHRoaXNfZmllbGQpO1xuICAgICAgfVxuICAgICAgaWYgKCQodGhhdC5vcHRpb25zW3RoaXNfZmllbGRdKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICBzY3JvbGxUb3A6ICQodGhhdC5vcHRpb25zW3RoaXNfZmllbGRdKS5wYXJlbnQoKS5vZmZzZXQoKS50b3BcbiAgICAgICAgfSwgMjAwMCk7XG4gICAgICB9XG4gICAgfSwgLy8gaGFuZGxlU2VydmVyRXJyb3JcblxuICAgIGRpc3BsYXlFcnJvck1lc3NhZ2UoZXJyb3IsIGZpZWxkKSB7XG4gICAgICB2YXIgbWVzc2FnZSA9ICcnO1xuICAgICAgdmFyIHN0cmlwZUVycm9yU2VsZWN0b3IgPSAnJztcbiAgICAgIHZhciBmaWVsZFBhcmVudCA9ICQodGhpcy5vcHRpb25zW2ZpZWxkXSkucGFyZW50KCk7XG4gICAgICBpZiAodHlwZW9mIGVycm9yLm1lc3NhZ2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIG1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWVzc2FnZSA9IGVycm9yLm1lc3NhZ2VbMF07XG4gICAgICB9XG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnNbZmllbGRdKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICQodGhpcy5vcHRpb25zW2ZpZWxkXSkuYWRkQ2xhc3MoJ2EtZXJyb3InKTtcbiAgICAgICAgJCh0aGlzLm9wdGlvbnNbZmllbGRdKS5wcmV2KCkuYWRkQ2xhc3MoJ2EtZXJyb3InKTtcbiAgICAgICAgaWYgKCQoJy5hLWNhcmQtaW5zdHJ1Y3Rpb24nLCBmaWVsZFBhcmVudCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICQoJy5hLWNhcmQtaW5zdHJ1Y3Rpb24nLCBmaWVsZFBhcmVudCkuYWRkQ2xhc3MoJ2EtdmFsaWRhdGlvbi1lcnJvcicpO1xuICAgICAgICAgICQoJy5hLWNhcmQtaW5zdHJ1Y3Rpb24nLCBmaWVsZFBhcmVudCkudGV4dChtZXNzYWdlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkKHRoaXMub3B0aW9uc1tmaWVsZF0pLmFmdGVyKCc8cCBjbGFzcz1cImEtY2FyZC1pbnN0cnVjdGlvbiBhLXZhbGlkYXRpb24tZXJyb3JcIj4nICsgbWVzc2FnZSArICc8L3A+Jyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGVycm9yICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aGlzLmJ1dHRvblN0YXR1cyh0aGlzLm9wdGlvbnMsICQodGhpcy5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKSwgZmFsc2UpO1xuICAgICAgICBpZiAoZXJyb3IuY29kZSA9PT0gJ2luY29tcGxldGVfbnVtYmVyJyB8fCBlcnJvci5jb2RlID09ICdpbnZhbGlkX251bWJlcicgfHwgZXJyb3IuY29kZSA9PSAnaW5jb3JyZWN0X251bWJlcicgfHwgZXJyb3IuY29kZSA9PSAnY2FyZF9kZWNsaW5lZCcgfHwgZXJyb3IuY29kZSA9PSAncHJvY2Vzc2luZ19lcnJvcicpIHtcbiAgICAgICAgICAvLyBlcnJvciBoYW5kbGluZ1xuICAgICAgICAgIHN0cmlwZUVycm9yU2VsZWN0b3IgPSAkKHRoaXMub3B0aW9ucy5jY19udW1fc2VsZWN0b3IpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJvci5jb2RlID09ICdpbnZhbGlkX2V4cGlyeV9tb250aCcgfHwgZXJyb3IuY29kZSA9PSAnaW52YWxpZF9leHBpcnlfeWVhcicgfHwgZXJyb3IuY29kZSA9PSAnZXhwaXJlZF9jYXJkJykge1xuICAgICAgICAgIC8vIGVycm9yIGhhbmRsaW5nXG4gICAgICAgICAgc3RyaXBlRXJyb3JTZWxlY3RvciA9ICQodGhpcy5vcHRpb25zLmNjX2V4cF9zZWxlY3Rvcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9yLmNvZGUgPT0gJ2ludmFsaWRfY3ZjJyB8fCBlcnJvci5jb2RlID09ICdpbmNvcnJlY3RfY3ZjJykge1xuICAgICAgICAgIC8vIGVycm9yIGhhbmRsaW5nXG4gICAgICAgICAgc3RyaXBlRXJyb3JTZWxlY3RvciA9ICQodGhpcy5vcHRpb25zLmNjX2N2Y19zZWxlY3Rvcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9yLmNvZGUgPT0gJ2VtYWlsX2ludmFsaWQnKSB7XG4gICAgICAgICAgLy8gZXJyb3IgaGFuZGxpbmdcbiAgICAgICAgICBzdHJpcGVFcnJvclNlbGVjdG9yID0gJCh0aGlzLm9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdHJpcGVFcnJvclNlbGVjdG9yICE9PSAnJykge1xuICAgICAgICAgIHRoaXMuc3RyaXBlRXJyb3JEaXNwbGF5KGVycm9yLCBzdHJpcGVFcnJvclNlbGVjdG9yLCB0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJvci50eXBlID09ICdtaXNzaW5nX3BheW1lbnQnICYmIHN0cmlwZUVycm9yU2VsZWN0b3IgPT09ICcnKSB7XG4gICAgICAgICAgJCh0aGlzLm9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IgKyAnLmFjdGl2ZScpLmFwcGVuZCgnPHAgY2xhc3M9XCJhLWZvcm0tY2FwdGlvbiBhLXZhbGlkYXRpb24tZXJyb3IgYS1taXNzaW5nLXBheW1lbnQtZXJyb3JcIj4nICsgZXJyb3IubWVzc2FnZSArICc8L3A+JylcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXJyb3IuZmllbGQgPT0gJ3JlY2FwdGNoYScpIHtcbiAgICAgICAgICAkKHRoaXMub3B0aW9ucy5wYXlfYnV0dG9uX3NlbGVjdG9yKS5iZWZvcmUoJzxwIGNsYXNzPVwiYS1mb3JtLWNhcHRpb24gYS12YWxpZGF0aW9uLWVycm9yIGEtcmVjYXB0Y2hhLWVycm9yXCI+JyArIG1lc3NhZ2UgKyAnPC9wPicpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9yLnR5cGUgPT0gJ2ludmFsaWRfcmVxdWVzdF9lcnJvcicgJiYgc3RyaXBlRXJyb3JTZWxlY3RvciA9PT0gJycpIHtcbiAgICAgICAgICAkKHRoaXMub3B0aW9ucy5wYXlfYnV0dG9uX3NlbGVjdG9yKS5iZWZvcmUoJzxwIGNsYXNzPVwiYS1mb3JtLWNhcHRpb24gYS12YWxpZGF0aW9uLWVycm9yIGEtaW52YWxpZC1yZXF1ZXN0LWVycm9yXCI+JyArIGVycm9yLm1lc3NhZ2UgKyAnPC9wPicpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCAvLyBkaXNwbGF5RXJyb3JNZXNzYWdlXG5cbiAgICBzaG93TmV3c2xldHRlclNldHRpbmdzOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG5cbiAgICAgIHZhciBuZXdzbGV0dGVyX2dyb3VwX2h0bWwgPSAnJztcbiAgICAgIGlmICgkKG9wdGlvbnMubmV3c2xldHRlcl9ncm91cF9zZWxlY3RvcikubGVuZ3RoID4gMCApIHtcbiAgICAgICAgdmFyIGdldF9kYXRhID0ge1xuICAgICAgICAgIHNob3J0Y29kZTogJ25ld3NsZXR0ZXJfZm9ybScsXG4gICAgICAgICAgcGxhY2VtZW50OiAndXNlcmFjY291bnQnXG4gICAgICAgIH07XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICB1cmw6IG9wdGlvbnMubWlubnBvc3Rfcm9vdCArICcvd3AtanNvbi9taW5ucG9zdC1hcGkvdjIvbWFpbGNoaW1wL2Zvcm0nLFxuICAgICAgICAgIGRhdGE6IGdldF9kYXRhXG4gICAgICAgIH0pLmRvbmUoZnVuY3Rpb24oIHJlc3VsdCApIHtcbiAgICAgICAgICBpZiAoIHR5cGVvZiByZXN1bHQuZ3JvdXBfZmllbGRzICE9PSAndW5kZWZpbmVkJyApIHtcbiAgICAgICAgICAgICQuZWFjaChyZXN1bHQuZ3JvdXBfZmllbGRzLCBmdW5jdGlvbiggaW5kZXgsIGNhdGVnb3J5ICkge1xuICAgICAgICAgICAgICBuZXdzbGV0dGVyX2dyb3VwX2h0bWwgKz0gJzxmaWVsZHNldCBjbGFzcz1cIm0tZm9ybS1pdGVtIHN1cHBvcnQtbmV3c2xldHRlciBtLWZvcm0taXRlbS0nICsgY2F0ZWdvcnkudHlwZSArICdcIj4nO1xuICAgICAgICAgICAgICBuZXdzbGV0dGVyX2dyb3VwX2h0bWwgKz0gJzxsYWJlbD4nICsgY2F0ZWdvcnkubmFtZSArICc6PC9sYWJlbD4nO1xuICAgICAgICAgICAgICBpZiAoIGNhdGVnb3J5LmNvbnRhaW5zLmxlbmd0aCA+IDAgKSB7XG4gICAgICAgICAgICAgICAgbmV3c2xldHRlcl9ncm91cF9odG1sICs9ICc8ZGl2IGNsYXNzPVwibS1mb3JtLWl0ZW0gbS1mb3JtLWl0ZW0tbmV3c2xldHRlclwiPic7XG4gICAgICAgICAgICAgICAgJC5lYWNoKGNhdGVnb3J5W2NhdGVnb3J5LmNvbnRhaW5zXSwgZnVuY3Rpb24oIGluZGV4LCBpdGVtICkge1xuICAgICAgICAgICAgICAgICAgbmV3c2xldHRlcl9ncm91cF9odG1sICs9ICc8bGFiZWw+PGlucHV0IG5hbWU9XCJncm91cHNfc3VibWl0dGVkXCIgdHlwZT1cImNoZWNrYm94XCIgdmFsdWU9XCInICsgaXRlbS5pZCArICdcIj4nICsgaXRlbS5uYW1lICsgJzwvbGFiZWw+JztcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBuZXdzbGV0dGVyX2dyb3VwX2h0bWwgKz0gJzwvZGl2Pic7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgbmV3c2xldHRlcl9ncm91cF9odG1sICs9ICc8L2ZpZWxkc2V0Pic7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICQob3B0aW9ucy5uZXdzbGV0dGVyX2dyb3VwX3NlbGVjdG9yKS5odG1sKG5ld3NsZXR0ZXJfZ3JvdXBfaHRtbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKCQob3B0aW9ucy5uZXdzbGV0dGVyX2dyb3VwX3NlbGVjdG9yKS5sZW5ndGggPiAwICYmIHR5cGVvZiAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB2YXIgZ2V0X2RhdGEgPSB7XG4gICAgICAgICAgZW1haWw6ICQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKClcbiAgICAgICAgfTtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgIHVybDogb3B0aW9ucy5taW5ucG9zdF9yb290ICsgJy93cC1qc29uL21pbm5wb3N0LWFwaS92Mi9tYWlsY2hpbXAvdXNlcicsXG4gICAgICAgICAgZGF0YTogZ2V0X2RhdGFcbiAgICAgICAgfSkuZG9uZShmdW5jdGlvbiggcmVzdWx0ICkge1xuICAgICAgICAgIGlmICggdHlwZW9mIHJlc3VsdC5tYWlsY2hpbXBfc3RhdHVzICE9PSAndW5kZWZpbmVkJyApIHtcbiAgICAgICAgICAgICQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkuYWZ0ZXIoJzxpbnB1dCBuYW1lPVwibWFpbGNoaW1wX3N0YXR1c1wiIHR5cGU9XCJoaWRkZW5cIiB2YWx1ZT1cIicgKyByZXN1bHQubWFpbGNoaW1wX3N0YXR1cyArICdcIj4nKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCB0eXBlb2YgcmVzdWx0Lm1haWxjaGltcF91c2VyX2lkICE9PSAndW5kZWZpbmVkJyApIHtcbiAgICAgICAgICAgICQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkuYWZ0ZXIoJzxpbnB1dCBuYW1lPVwibWFpbGNoaW1wX3VzZXJfaWRcIiB0eXBlPVwiaGlkZGVuXCIgdmFsdWU9XCInICsgcmVzdWx0Lm1haWxjaGltcF91c2VyX2lkICsgJ1wiPicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAocmVzdWx0Lm1haWxjaGltcF9zdGF0dXMgPT09ICdzdWJzY3JpYmVkJykge1xuICAgICAgICAgICAgLy8gdXNlciBjcmVhdGVkIC0gc2hvdyBhIHN1Y2Nlc3MgbWVzc2FnZVxuICAgICAgICAgICAgJCgnLmEtY29uZmlybS1pbnN0cnVjdGlvbnMnKS50ZXh0KCQoJy5hLWNvbmZpcm0taW5zdHJ1Y3Rpb25zJykuYXR0cignZGF0YS1rbm93bi11c2VyJykpO1xuICAgICAgICAgICAgdmFyIGdyb3VwcyA9IHJlc3VsdC5ncm91cHM7XG4gICAgICAgICAgICAkLmVhY2goZ3JvdXBzLCBmdW5jdGlvbiggaW5kZXgsIHZhbHVlICkge1xuICAgICAgICAgICAgICBpZiAoIHZhbHVlID09PSB0cnVlICkge1xuICAgICAgICAgICAgICAgICQoJzpjaGVja2JveFt2YWx1ZT1cIicgKyBpbmRleCArICdcIl0nKS5wcm9wKCdjaGVja2VkJyx0cnVlKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKCc6Y2hlY2tib3hbdmFsdWU9XCInICsgaW5kZXggKyAnXCJdJykucHJvcCgnY2hlY2tlZCcsZmFsc2UpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgfSwgLy8gc2hvd05ld3NsZXR0ZXJTZXR0aW5nc1xuXG4gICAgY29uZmlybU1lc3NhZ2VTdWJtaXQ6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcblxuICAgICAgdmFyIGV4aXN0aW5nX25ld3NsZXR0ZXJfc2V0dGluZ3MgPSAkKG9wdGlvbnMubmV3c2xldHRlcl9ncm91cF9zZWxlY3RvciArICcgaW5wdXQnKS5zZXJpYWxpemUoKTtcbiAgICAgIC8vdGhpcy5kZWJ1ZyhleGlzdGluZ19uZXdzbGV0dGVyX3NldHRpbmdzKTtcblxuICAgICAgJChvcHRpb25zLmNvbmZpcm1fZm9ybV9zZWxlY3Rvcikuc3VibWl0KGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgdmFyIGNvbmZpcm1mb3JtID0gJChvcHRpb25zLmNvbmZpcm1fZm9ybV9zZWxlY3Rvcik7XG4gICAgICAgIC8vIHN1Ym1pdCBzZXR0aW5ncyB0byBtYWlsY2hpbXBcbiAgICAgICAgLy8gbmVlZCB0byBnZXQgdXNlciBpbmZvIG9uIGEgaGlkZGVuIGZpZWxkIGhlcmVcblxuICAgICAgICB2YXIgbmV3c2xldHRlcl9ncm91cHMgPSAkKG9wdGlvbnMubmV3c2xldHRlcl9ncm91cF9zZWxlY3RvciArICcgaW5wdXQ6Y2hlY2tlZCcpO1xuICAgICAgICB2YXIgbmV3X25ld3NsZXR0ZXJfc2V0dGluZ3MgPSBuZXdzbGV0dGVyX2dyb3Vwcy5zZXJpYWxpemUoKTtcblxuICAgICAgICBpZiAoKGV4aXN0aW5nX25ld3NsZXR0ZXJfc2V0dGluZ3MgIT09IG5ld19uZXdzbGV0dGVyX3NldHRpbmdzKSAmJiAodHlwZW9mIG5ld3NsZXR0ZXJfZ3JvdXBzICE9PSAndW5kZWZpbmVkJykpIHtcbiAgICAgICAgICAvL2FkZCBvdXIgb3duIGFqYXggY2hlY2sgYXMgWC1SZXF1ZXN0ZWQtV2l0aCBpcyBub3QgYWx3YXlzIHJlbGlhYmxlXG4gICAgICAgICAgLy9hamF4X2Zvcm1fZGF0YSA9IG5ld19uZXdzbGV0dGVyX3NldHRpbmdzICsgJyZhamF4cmVxdWVzdD10cnVlJnN1YnNjcmliZSc7XG5cbiAgICAgICAgICB2YXIgcG9zdF9kYXRhID0ge1xuICAgICAgICAgICAgZW1haWw6ICQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgICBmaXJzdF9uYW1lOiAkKG9wdGlvbnMuZmlyc3RfbmFtZV9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgICBsYXN0X25hbWU6ICQob3B0aW9ucy5sYXN0X25hbWVfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgICAgZ3JvdXBzX3N1Ym1pdHRlZDoge31cbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgcG9zdF9kYXRhLmdyb3Vwc19hdmFpbGFibGUgPSAnYWxsJztcblxuICAgICAgICAgIGlmICggJCgnaW5wdXRbbmFtZT1cIm1haWxjaGltcF9zdGF0dXNcIl0nKS5sZW5ndGggPiAwICkge1xuICAgICAgICAgICAgcG9zdF9kYXRhLm1haWxjaGltcF9zdGF0dXMgPSAkKCdpbnB1dFtuYW1lPVwibWFpbGNoaW1wX3N0YXR1c1wiXScpLnZhbCgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICggJCgnaW5wdXRbbmFtZT1cIm1haWxjaGltcF91c2VyX2lkXCJdJykubGVuZ3RoID4gMCApIHtcbiAgICAgICAgICAgIHBvc3RfZGF0YS5tYWlsY2hpbXBfdXNlcl9pZCA9ICQoJ2lucHV0W25hbWU9XCJtYWlsY2hpbXBfdXNlcl9pZFwiXScpLnZhbCgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0eXBlb2YgbmV3c2xldHRlcl9ncm91cHMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAkLmVhY2gobmV3c2xldHRlcl9ncm91cHMsIGZ1bmN0aW9uKGluZGV4LCB2YWx1ZSkge1xuICAgICAgICAgICAgICB2YXIgZ3JvdXAgPSAkKHRoaXMpLnZhbCgpO1xuICAgICAgICAgICAgICBwb3N0X2RhdGEuZ3JvdXBzX3N1Ym1pdHRlZFtpbmRleF0gPSBncm91cDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IG9wdGlvbnMubWlubnBvc3Rfcm9vdCArICcvd3AtanNvbi9taW5ucG9zdC1hcGkvdjIvbWFpbGNoaW1wL3VzZXInLFxuICAgICAgICAgICAgdHlwZTogJ3Bvc3QnLFxuICAgICAgICAgICAgZGF0YVR5cGUgOiAnanNvbicsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkocG9zdF9kYXRhKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmRvbmUoZnVuY3Rpb24ocmVzcG9uc2UpIHsgLy8gcmVzcG9uc2UgZnJvbSB0aGUgUEhQIGFjdGlvblxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSAnJztcbiAgICAgICAgICAgIGlmICggcmVzcG9uc2Uuc3VjY2VzcyA9PT0gdHJ1ZSApIHtcbiAgICAgICAgICAgICAgLypzd2l0Y2ggKHJlc3BvbnNlLmRhdGEudXNlcl9zdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdleGlzdGluZyc6XG4gICAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ1RoYW5rcyBmb3IgdXBkYXRpbmcgeW91ciBlbWFpbCBwcmVmZXJlbmNlcy4gVGhleSB3aWxsIGdvIGludG8gZWZmZWN0IGltbWVkaWF0ZWx5Lic7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICduZXcnOlxuICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9ICdXZSBoYXZlIGFkZGVkIHlvdSB0byB0aGUgTWlublBvc3QgbWFpbGluZyBsaXN0Lic7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdwZW5kaW5nJzpcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnV2UgaGF2ZSBhZGRlZCB5b3UgdG8gdGhlIE1pbm5Qb3N0IG1haWxpbmcgbGlzdC4gWW91IHdpbGwgbmVlZCB0byBjbGljayB0aGUgY29uZmlybWF0aW9uIGxpbmsgaW4gdGhlIGVtYWlsIHdlIHNlbnQgdG8gYmVnaW4gcmVjZWl2aW5nIG1lc3NhZ2VzLic7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfSovXG4gICAgICAgICAgICAgIC8vY29uZmlybWZvcm0uZ2V0KDApLnN1Ym1pdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uZmlybWZvcm0uZ2V0KDApLnN1Ym1pdCgpO1xuICAgICAgICAgICAgLy8kKCcubS1ob2xkLW1lc3NhZ2UnKS5odG1sKCc8ZGl2IGNsYXNzPVwibS1mb3JtLW1lc3NhZ2UgbS1mb3JtLW1lc3NhZ2UtaW5mb1wiPicgKyBtZXNzYWdlICsgJzwvZGl2PicpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmZhaWwoZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIC8vIHdlIHNob3VsZCBwdXQgYW4gYWN0dWFsIGVycm9yIG1lc3NhZ2UgaGVyZSBzb21lZGF5LCBwcm9iYWJseVxuICAgICAgICAgICAgLy8kKCcubS1ob2xkLW1lc3NhZ2UnKS5odG1sKCc8ZGl2IGNsYXNzPVwibS1mb3JtLW1lc3NhZ2UgbS1mb3JtLW1lc3NhZ2UtaW5mb1wiPkFuIGVycm9yIGhhcyBvY2N1cmVkLiBQbGVhc2UgdHJ5IGFnYWluLjwvZGl2PicpO1xuICAgICAgICAgICAgY29uZmlybWZvcm0uZ2V0KDApLnN1Ym1pdCgpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0gZWxzZSB7IC8vIGVuZCBwYXJ0IHdoZXJlIHNldHRpbmdzIGNoYW5nZWRcbiAgICAgICAgICBjb25maXJtZm9ybS5nZXQoMCkuc3VibWl0KCk7XG4gICAgICAgIH1cblxuICAgICAgfSk7XG4gICAgICAvL3JldHVybiBmYWxzZTtcbiAgICB9LCAvLyBjb25maXJtTWVzc2FnZVN1Ym1pdFxuXG4gIH07IC8vIHBsdWdpbi5wcm90b3R5cGVcblxuICAvLyBBIHJlYWxseSBsaWdodHdlaWdodCBwbHVnaW4gd3JhcHBlciBhcm91bmQgdGhlIGNvbnN0cnVjdG9yLFxuICAvLyBwcmV2ZW50aW5nIGFnYWluc3QgbXVsdGlwbGUgaW5zdGFudGlhdGlvbnNcbiAgJC5mbltwbHVnaW5OYW1lXSA9IGZ1bmN0aW9uICggb3B0aW9ucyApIHtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICghJC5kYXRhKHRoaXMsICdwbHVnaW5fJyArIHBsdWdpbk5hbWUpKSB7XG4gICAgICAgICQuZGF0YSh0aGlzLCAncGx1Z2luXycgKyBwbHVnaW5OYW1lLCBuZXcgUGx1Z2luKCB0aGlzLCBvcHRpb25zICkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG59KSggalF1ZXJ5LCB3aW5kb3csIGRvY3VtZW50ICk7Il19
}(jQuery));
