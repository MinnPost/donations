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
    'plaid_public_key': '',
    'plaid_link': '#authorize-ach',
    'minnpost_root': 'https://www.minnpost.com',
    'donate_form_selector': '#donate',
    'donate_step_selector': '#panel--pay',
    'confirm_form_selector': '#confirm',
    'confirm_step_selector': '#panel--confirmation',
    'active': 'panel--pay',
    'confirm': 'panel--confirmation',
    'query': 'step',
    'pay_cc_processing_selector': 'input[id="edit-pay-fees"]',
    'fee_amount': '.processing-amount',
    'level_amount_selector': '#panel--pay .amount .level-amount',
    'original_amount_selector': '#amount',
    'frequency_selector': '.frequency',
    'full_amount_selector': '.full-amount',
    'update_amount_selector': '#new-amount',
    'level_indicator_selector': 'h2.level',
    'level_name_selector': '.level-name',
    'name_selector': '.form-item--display-name',
    'in_honor_or_memory_field_selector': '.form-item--honor-memory',
    'honor_or_memory_chooser': 'input[name="in_honor_or_memory"]',
    // radio fields
    'honor_type_selector': '.honor_type',
    // span inside label
    'honor_memory_input_group': '.honor-or-memory',
    // holds the form field
    'notify_selector': '.notify_someone',
    'notify_field_selector': '.form-item--notify',
    'anonymous_selector': '#anonymous',
    'show_billing_country_selector': '#billing_show_country',
    'billing_country_selector': '.form-item--country',
    'show_shipping_country_selector': '#shipping_show_country',
    'shipping_country_selector': '.form-item--shipping-country',
    'shipping_address_selector': '.form-item--shipping-address',
    'use_for_shipping_selector': '#useforshipping',
    'email_field_selector': '#email',
    'password_field_selector': '#password',
    'first_name_field_selector': '#first_name',
    'last_name_field_selector': '#last_name',
    'account_city_selector': '#billing_city',
    'account_state_selector': '#billing_state',
    'account_zip_selector': '#billing_zip',
    'create_mp_selector': '#creatempaccount',
    'password_selector': '.form-item--password',
    'additional_amount_field': '#additional_donation',
    'additional_amount_selector': '.additional_donation',
    'has_additional_text_selector': '.has_additional',
    'billing_selector': 'fieldset.billing',
    'shipping_selector': 'fieldset.shipping',
    'credit_card_fieldset': '.payment-method-group',
    'choose_payment': '#choose-payment-method',
    'payment_method_selector': '.payment-method',
    'cc_num_selector': '#card-number',
    'cc_exp_selector': '#card-expiry',
    'cc_cvv_selector': '#card-cvc',
    'payment_button_selector': '#submit',
    'confirm_button_selector': '#finish',
    'opp_id_selector': '#flask_id',
    'recurring_selector': '#recurring',
    'newsletter_group_selector': '.support-newsletters',
    'reason_field_selector': '#reason_for_supporting',
    'share_reason_selector': '#reason_shareable',
    'confirm_top_selector': '.support--post-confirm',
    'existing_newsletter_settings': '',
    'levels': {
      1: {
        'name': 'bronze',
        'max': 60
      },
      2: {
        'name': 'silver',
        'min': 60,
        'max': 120
      },
      3: {
        'name': 'gold',
        'min': 120,
        'max': 240
      },
      4: {
        'name': 'platinum',
        'min': 240
      }
    }
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
      // Place initialization logic here
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
      this.options.frequency = parseFloat($(this.options.frequency_selector, this.element).attr('data-year-freq'));
      var recurring = $(this.options.recurring_selector, this.element).val();

      if (typeof recurring !== 'undefined') {
        this.options.recurring = recurring.charAt(0).toUpperCase() + recurring.slice(1);
      }

      this.options.processing_fee = (Math.round(parseFloat(this.options.fee_amount) * Math.pow(10, 2)) / Math.pow(10, 2)).toFixed(2);
      this.options.processing_fee_text = this.options.processing_fee;
      this.options.cardType = null;
      this.options.create_account = false;
      var button_text = $('button.give, input.give').text();
      this.options.button_text = button_text;
      this.stripe = Stripe(this.options.stripe_publishable_key);
      this.elements = this.stripe.elements(); // use a referrer for edit link if we have one

      if (document.referrer !== '') {
        $('#edit_url').prop('href', document.referrer);
      }

      if (this.options.debug === true) {
        this.debug(this.options); // return;
      } // tab stuff


      var query_panel = this.qs[this.options.query];

      if (typeof query_panel === 'undefined') {
        query_panel = this.options.active;
      } // call functions


      this.tabNavigation(query_panel); // navigating

      this.amountAsRadio(this.element, this.options); // if the amount field is a radio button

      this.amountUpdated(this.element, this.options); // if the amount text field can change

      if ($(this.options.pay_cc_processing_selector).length > 0) {
        this.creditCardProcessingFees(this.options, reset); // processing fees
      }

      if ($(this.options.donate_step_selector).length > 0) {
        this.options.level = this.checkLevel(this.element, this.options, 'name'); // check what level it is

        this.options.levelnum = this.checkLevel(this.element, this.options, 'num'); // check what level it is as a number

        this.donateAnonymously(this.element, this.options); // anonymous

        this.honorOrMemoryToggle(this.element, this.options); // in honor or in memory of someone

        this.outsideUnitedStates(this.element, this.options); // outside US

        this.shippingAddress(this.element, this.options); // shipping address

        this.allowMinnpostAccount(this.element, this.options, false); // option for creating minnpost account

        this.choosePaymentMethod(this.element, this.options); // switch between card and ach

        this.creditCardFields(this.element, this.options); // do stuff with the credit card fields

        this.achFields(this.element, this.options); // do stuff for ach payments, if applicable to the form

        this.validateAndSubmit(this.element, this.options); // validate and submit the form
      }

      if ($(this.options.confirm_step_selector).length > 0) {
        this.showNewsletterSettings(this.element, this.options);
        this.confirmMessageSubmit(this.element, this.options); // submit the stuff on the confirmation page
      }
    },
    // init
    qs: function (a) {
      if (a === '') {
        return {};
      }

      var b = {};

      for (var i = 0; i < a.length; ++i) {
        var p = a[i].split('=', 2);

        if (p.length === 1) {
          b[p[0]] = '';
        } else {
          b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, ' '));
        }
      }

      return b;
    }(window.location.search.substr(1).split('&')),
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
    getQueryStrings: function getQueryStrings(link) {
      if (typeof link === 'undefined' || link === '') {
        return {};
      } else {
        link = '?' + link.split('?')[1];
        link = link.substr(1).split('&');
      }

      var b = {};

      for (var i = 0; i < link.length; ++i) {
        var p = link[i].split('=', 2);

        if (p.length === 1) {
          b[p[0]] = '';
        } else {
          b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, ' '));
        }
      }

      return b;
    },
    // getQueryStrings
    tabNavigation: function tabNavigation(active) {
      var that = this;
      var title = 'MinnPost | Support Us | ';
      var page = $('.progress--donation li.' + active).text();
      var next = $('.progress--donation li.' + active).next().text();
      var step = $('.progress--donation li.' + active).index() + 1;
      var nav_item_count = $('.progress--donation li').length;
      var opp_id = $(this.options.opp_id_selector).val();
      var next_step = step + 1;
      var post_purchase = false; // we will have to update this because no more flask id

      this.debug('step is ' + step + ' and nav item count is ' + nav_item_count + ' and opp id is ' + opp_id + ' and next step is ' + next_step); // this is the last visible step

      if ($(this.options.confirm_step_selector).length > 0) {
        active = this.options.confirm;
        $('.progress--donation li.' + active + ' span').addClass('active');
        step = $('.progress--donation li.' + active).index() + 1; // there is a continuation of the main form on this page. there is a button to click
        // this means there is another step

        if ($(this.options.confirm_button_selector).length > 0) {
          nav_item_count += 1;
        }
      }

      if (step === nav_item_count - 1 && $(this.options.opp_id_selector).length > 0) {
        this.debug('this is a payment step but there is a step after it');
        step = 'purchase';
      } else if (step === nav_item_count && $(this.options.opp_id_selector).length > 0) {
        this.debug('this is a payment step and there is no step after it');
        step = 'purchase';
      } else if (step === nav_item_count && $(this.options.opp_id_selector).length === 0) {
        this.debug('this is a post-finish step. it does not have an id');
        step = step + 1;
        post_purchase = true;
      }

      document.title = title + page;
      this.analyticsTrackingStep(step, title, post_purchase); // activate the nav tabs

      if ($('.progress--donation li .active').length === 0) {
        $('#' + active).show();
        $('.progress--donation li.' + active + ' a').addClass('active');
      } else {
        active = $('.progress--donation li .active').parent().prop('class');
        $('#' + active).show();
      }
    },
    // tabNavigation
    analyticsTrackingStep: function analyticsTrackingStep(step, title, post_purchase) {
      var level = this.checkLevel(this.element, this.options, 'name'); // check what level it is

      var levelnum = this.checkLevel(this.element, this.options, 'num'); // check what level it is as a number

      var amount = $(this.options.original_amount_selector).val();
      var recurring = this.options.recurring;
      var opp_id = $(this.options.opp_id_selector).val(); // if we're not after the purchase, use addProduct

      if (post_purchase !== true) {
        ga('ec:addProduct', {
          'id': 'minnpost_' + level.toLowerCase() + '_membership',
          'name': 'MinnPost ' + level.charAt(0).toUpperCase() + level.slice(1) + ' Membership',
          'category': 'Donation',
          'brand': 'MinnPost',
          'variant': recurring,
          'price': amount,
          'quantity': 1
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
          'step': step // A value of 1 indicates first checkout step.Value of 2 indicates second checkout step

        });
      }

      ga('set', {
        page: window.location.pathname,
        title: title
      });
      ga('send', 'pageview', window.location.pathname);
    },
    // analyticsTrackingStep
    amountAsRadio: function amountAsRadio(element, options) {
      // when amount field is a radio button, we need to check it whenever it changes
      var that = this;
      $(options.original_amount_selector, element).change(function () {
        if ($(this).is(':radio')) {
          options.original_amount = parseInt($(options.original_amount_selector + ':checked', element).val(), 10);
        }
      });
    },
    // amountAsRadio
    amountUpdated: function amountUpdated(element, options) {
      // when new amount text field can change, we need to change the hidden field
      var that = this;
      var payment_type = $(options.choose_payment + ' input').val();
      $(options.update_amount_selector, element).change(function () {
        $(options.original_amount_selector, element).val($(this).val());
        options.original_amount = parseInt($(options.original_amount_selector, element).val(), 10);

        if (payment_type === 'ach') {
          that.calculateFees(that.options.original_amount, 'ach');
        } else {
          that.calculateFees(that.options.original_amount, 'visa');
        }
      });
    },
    // amountUpdated
    calculateFees: function calculateFees(amount, payment_type) {
      // this sends the amount and payment type to python; get the fee and display it to the user on the checkbox label
      var that = this;
      var data = {
        amount: amount,
        payment_type: payment_type
      };
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
    creditCardProcessingFees: function creditCardProcessingFees(options, reset) {
      // this adds or subtracts the fee to the original amount when the user indicates they do or do not want to pay the fees
      var that = this;
      that.creditCardFeeCheckbox($(this.options.pay_cc_processing_selector));
      $(this.options.pay_cc_processing_selector).on('change', function () {
        that.creditCardFeeCheckbox(this);
      });
    },
    // creditCardProcessingFees
    creditCardFeeCheckbox: function creditCardFeeCheckbox(field) {
      var full_amount;
      var that = this;

      if ($(field).is(':checked') || $(field).prop('checked')) {
        $('.amount .level-amount').addClass('full-amount');
        full_amount = that.options.original_amount + parseFloat($(that.options.fee_amount).text());
      } else {
        full_amount = that.options.original_amount;
      }

      $(that.options.full_amount_selector).text(parseFloat(full_amount).toFixed(2));
    },
    // creditCardFeeCheckbox
    donateAnonymously: function donateAnonymously(element, options) {
      if ($(options.anonymous_selector, element).is(':checked')) {
        $(options.name_selector + ' div:first', element).hide();
      } else {
        $(options.name_selector + ' div:first', element).show();
      }

      $(options.anonymous_selector, element).change(function () {
        if ($(this).is(':checked')) {
          $(options.name_selector + ' div:first', element).hide();
        } else {
          $(options.name_selector + ' div:first', element).show();
        }
      });
    },
    // donateAnonymously
    checkLevel: function checkLevel(element, options, returnvalue) {
      var level = '';
      var levelnum = 0;
      var levelclass = 'level level--';
      var amount_yearly;
      var frequency = options.frequency;
      var amount = options.original_amount;

      if (frequency === 12) {
        amount_yearly = amount * frequency;
      } else if (frequency === 1) {
        amount_yearly = amount;
      }

      $.each(options.levels, function (index, value) {
        var name = value.name;
        var num = index;
        var max = value.max;
        var min = value.min;

        if (typeof min !== 'undefined' && typeof max !== 'undefined') {
          if (amount_yearly >= min && amount_yearly < max) {
            level = name;
            levelnum = num;
            levelclass += num;
            return false;
          }
        } else if (typeof max !== 'undefined') {
          if (amount_yearly < max) {
            level = name;
            levelnum = num;
            levelclass += num;
            return false;
          }
        } else if (typeof min !== 'undefined') {
          if (amount_yearly >= min) {
            level = name;
            levelnum = num;
            levelclass += num;
            return false;
          }
        }
      });

      if (returnvalue === 'name') {
        return level;
      } else if (returnvalue === 'num') {
        return levelnum;
      }
    },
    // checkLevel
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
      } //      show_shipping = !!$(options.use_for_shipping_selector + ':checked', element).length;
      //      //this.debug('show is there');

      /*      $(options.use_for_shipping_selector, element).change(function() {
              that.shippingAddress(element, options);
              //this.debug('change it');
            });
      */


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
    allowMinnpostAccount: function allowMinnpostAccount(element, options, changed) {
      var that = this;
      var account_exists = false;
      $(options.email_field_selector, element).parent().append('<p class="error spam-email">This email address has been detected as a spammer.</p>');
      $('.spam-email').hide();
      $(options.email_field_selector, element).change(function () {
        $('.spam-email').hide();
        $(this).removeClass('invalid error');
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
      }); //user is "finished typing," do something

      if ($(options.create_mp_selector, element).is(':checked')) {
        $(options.password_selector, element).show();
        options.create_account = true;
      } else {
        $(options.password_selector, element).hide();
      }

      $(options.create_mp_selector, element).change(function () {
        that.allowMinnpostAccount(element, options, true);
      });

      if (changed === false) {
        // allow users to show plain text, or to see pw criteria
        $(options.password_selector, element).append('<div class="help-link"><span>Password help</span></div><div class="form-help">Password must be at least 6 characters.</div><label class="additional-option"><input type="checkbox" name="showpassword" id="showpassword"> Show password</label>');
        $(options.create_mp_selector, element).parent().before('<p class="account-exists success">There is already a MinnPost.com account with this email.</p>');
        $('.account-exists').hide();
        $('#showpassword').click(function () {
          if ($(this).is(':checked')) {
            $('#password').get(0).type = 'text';
          } else {
            $('#password').get(0).type = 'password';
          }
        });
        $('.form-item .form-help').hide();
      }

      $('.help-link').click(function () {
        $(this).next('.form-help').toggle();
        return false;
      });
    },
    // allowMinnpostAccount
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
            $('.account-exists', element).show();
          }

          $(options.create_mp_selector, element).on('change', function () {
            if ($(options.create_mp_selector, element).is(':checked')) {
              $(options.password_selector, element).hide();
              $(options.create_mp_selector, element).parent().hide();
              $('.account-exists', element).show();
            }
          });
        } else if (result.status === 'spam') {
          $(that.options.email_field_selector).addClass('invalid error');
          $('.spam-email').show();
        } else {
          // user does not exist or ajax call failed
          if ($(options.create_mp_selector, element).is(':checked')) {
            $(options.password_selector, element).show();
            options.create_account = true;
          } else {
            $(options.password_selector, element).hide();
          }

          $('.account-exists', element).hide();
          return false;
        }
      });
    },
    // checkMinnpostAccount
    choosePaymentMethod: function choosePaymentMethod(element, options) {
      var that = this;

      if ($(options.choose_payment).length > 0) {
        if ($(options.choose_payment + ' input').is(':checked')) {
          var checked = $(options.choose_payment + ' input:checked').attr('id');
          var checked_value = $(options.choose_payment + ' input:checked').val();
          $(options.payment_method_selector).removeClass('active');
          $(options.payment_method_selector + '.' + checked).addClass('active');
          $(options.payment_method_selector + ':not(.active) label').removeClass('required');
          $(options.payment_method_selector + ':not(.active) input').prop('required', false);
          $(options.payment_method_selector + '.active label').addClass('required');
          $(options.payment_method_selector + '.active input').prop('required', true);

          if (checked_value === 'ach') {
            that.calculateFees(that.options.original_amount, 'ach');
          } else {
            that.calculateFees(that.options.original_amount, 'visa');
          }
        }

        $(options.choose_payment + ' input').change(function (event) {
          $(options.payment_method_selector).removeClass('active');
          $(options.payment_method_selector + '.' + this.id).addClass('active');
          $(options.payment_method_selector + ':not(.active) label').removeClass('required');
          $(options.payment_method_selector + ':not(.active) input').prop('required', false);
          $(options.payment_method_selector + '.active label').addClass('required');
          $(options.payment_method_selector + '.active input').prop('required', true);
          $('#bankToken').remove();

          if (this.value === 'ach') {
            that.calculateFees(that.options.original_amount, 'ach');
          } else {
            that.calculateFees(that.options.original_amount, 'visa');
          }
        });
      }
    },
    // choosePaymentMethod
    creditCardFields: function creditCardFields(element, options) {
      var that = this;
      $(that.options.donate_form_selector).prepend('<input type="hidden" id="source" name="source" value="' + document.referrer + '" />');
      var style = {
        base: {
          iconColor: '#666EE8',
          lineHeight: '37px',
          fontWeight: 400,
          fontFamily: 'Georgia,Cambria,Times New Roman,Times,serif',
          fontSize: '16px'
        }
      }; // Add an instance of the card UI component into the `card-element` <div>
      //card.mount('#card-element');

      if ($('.credit-card-group').length === 0 && $('.payment-method.choose-card').length === 0) {
        return;
      }

      that.cardNumberElement = that.elements.create('cardNumber', {
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
      that.cardCvcElement.mount(options.cc_cvv_selector); // validate/error handle the card fields

      that.cardNumberElement.on('change', function (event) {
        // error handling
        that.stripeErrorDisplay(event, $(options.cc_num_selector, element), element, options); // if it changed, reset the button

        that.buttonStatus(options, $(that.options.donate_form_selector).find('button'), false); // Switch brand logo

        if (event.brand) {
          that.calculateFees(that.options.original_amount, event.brand);
          that.setBrandIcon(event.brand);
        } //setOutcome(event);

      });
      that.cardExpiryElement.on('change', function (event) {
        // error handling
        that.stripeErrorDisplay(event, $(options.cc_exp_selector, element), element, options); // if it changed, reset the button

        that.buttonStatus(options, $(that.options.donate_form_selector).find('button'), false);
      });
      that.cardCvcElement.on('change', function (event) {
        // error handling
        that.stripeErrorDisplay(event, $(options.cc_cvv_selector, element), element, options); // if it changed, reset the button

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
    setBrandIcon: function setBrandIcon(brand) {
      var cardBrandToPfClass = {
        'visa': 'pf-visa',
        'mastercard': 'pf-mastercard',
        'amex': 'pf-american-express',
        'discover': 'pf-discover',
        'diners': 'pf-diners',
        'jcb': 'pf-jcb',
        'unknown': 'pf-credit-card'
      };
      var brandIconElement = document.getElementById('brand-icon');
      var pfClass = 'pf-credit-card';

      if (brand in cardBrandToPfClass) {
        pfClass = cardBrandToPfClass[brand];
      }

      for (var i = brandIconElement.classList.length - 1; i >= 0; i--) {
        brandIconElement.classList.remove(brandIconElement.classList[i]);
      }

      brandIconElement.classList.add('pf');
      brandIconElement.classList.add(pfClass);
    },
    achFields: function achFields(element, options) {
      var that = this;

      if (options.plaid_env != '' && options.key != '' && typeof Plaid !== 'undefined') {
        var linkHandler = Plaid.create({
          selectAccount: true,
          apiVersion: 'v2',
          env: options.plaid_env,
          clientName: 'MinnPost',
          key: options.plaid_public_key,
          product: 'auth',
          onLoad: function onLoad() {// The Link module finished loading.
          },
          onSuccess: function onSuccess(public_token, metadata) {
            // The onSuccess function is called when the user has successfully
            // authenticated and selected an account to use.
            //
            // When called, you will send the public_token and the selected
            // account ID, metadata.account_id, to your backend app server.
            //
            // sendDataToBackendServer({
            //   public_token: public_token,
            //   account_id: metadata.account_id
            // });
            //this.debug('Public Token: ' + public_token);
            //this.debug('Customer-selected account ID: ' + metadata.account_id);
            var supportform = $(options.donate_form_selector); // response contains id and card, which contains additional card details
            // Insert the data into the form so it gets submitted to the server

            supportform.append($('<input type=\"hidden\" name=\"public_token\" />').val(public_token));
            supportform.append($('<input type=\"hidden\" name=\"account_id\" />').val(metadata.account_id)); // get the account validated by ajax

            $.ajax({
              url: '/plaid_token/',
              //cache: false,
              data: $(supportform).serialize(),
              type: 'POST'
            }).done(function (response) {
              if (typeof response.error !== 'undefined') {
                // there is an error.
                $(options.plaid_link).parent().after('<p class="error">' + response.error + '</p>');
              } else {
                //this.debug('print response here');
                //this.debug(response);
                $(options.donate_form_selector).prepend('<input type="hidden" id="bankToken" name="bankToken" value="' + response.stripe_bank_account_token + '" />');
                $(options.plaid_link, element).html('<strong>Your account was successfully authorized</strong>').contents().unwrap();
                that.calculateFees(that.options.original_amount, 'ach'); // calculate the ach fees
                // add the field(s) we need to the form for submitting
              }
            }).error(function (response) {
              $(options.plaid_link).parent().after('<p class="error">' + response.error + '</p>');
            });
          },
          onExit: function onExit(err, metadata) {// The user exited the Link flow.
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
    hasHtml5Validation: function hasHtml5Validation(element, options) {
      //this.debug('value is ' + typeof document.createElement('input').checkValidity === 'function');
      return typeof document.createElement('input').checkValidity === 'function';
    },
    buttonStatus: function buttonStatus(options, button, disabled) {
      // remove the old token so we can generate a new one
      var supportform = $(options.donate_form_selector);
      $('input[name="stripeToken"]', supportform).remove();
      $('input[name="payment_type"]', supportform).remove();
      button.prop('disabled', disabled);

      if (disabled === false) {
        button.text(options.button_text);
      } else {
        button.text('Processing');
      }
    },
    validateAndSubmit: function validateAndSubmit(element, options) {
      var that = this;
      $(options.donate_form_selector).submit(function (event) {
        event.preventDefault(); // do some fallback stuff for non-html5 browsers

        if (that.hasHtml5Validation(element, options)) {
          if (!this.checkValidity()) {
            $(this).addClass('invalid');
            $('html, body').animate({
              scrollTop: $(this).find('input:invalid').parent().offset().top
            }, 2000); //this.debug('top is ' + );

            $(this).find('input:invalid').parent().addClass('error');
          } else {
            $(this).removeClass('invalid');
            $(this).find('input:invalid').parent().removeClass('error');
          }
        } // validate and submit the form


        $('.check-field').remove();
        $('input, label', element).removeClass('error');
        var valid = true;
        var payment_method = 'card';

        if ($(that.options.choose_payment).length > 0) {
          payment_method = $(that.options.choose_payment + ' input:checked').val();
        }

        $(that.options.choose_payment + ' input').change(function () {
          $(that.options.payment_method_selector + ' .error').remove(); // remove method error message if it is there
        }); // if it changed, reset the button

        that.buttonStatus(options, $(that.options.donate_form_selector).find('button'), false);

        if (payment_method === 'ach') {
          if ($('input[name="bankToken"]').length === 0) {
            valid = false;
            $(that.options.payment_method_selector).prepend('<p class="error">You are required to enter credit card information, or to authorize MinnPost to charge your bank account, to make a payment.</p>');
          }
        }

        if (valid === true) {
          // 1. process donation to stripe
          that.buttonStatus(that.options, $(that.options.donate_form_selector).find('button'), true);
          var tokenData = that.generateTokenData(); // 2. create minnpost account if specified

          if (that.options.create_account === true) {
            var user = {
              email: $(that.options.email_field_selector, element).val(),
              first_name: $(that.options.first_name_field_selector, element).val(),
              last_name: $(that.options.last_name_field_selector, element).val(),
              password: $(that.options.password_field_selector, element).val(),
              city: $(that.options.account_city_selector, element).val(),
              state: $(that.options.account_state_selector, element).val(),
              zip: $(that.options.account_zip_selector, element).val()
            };
            $.ajax({
              method: 'POST',
              url: that.options.minnpost_root + '/wp-json/user-account-management/v1/create-user',
              data: user
            }).done(function (data) {
              grecaptcha.reset();

              if (data.status === 'success' && data.reason === 'new user') {// user created - they should receive email
                // submit the form
                //supportform.get(0).submit();
              } else {// user not created
                  // still submit the form
                  //supportform.get(0).submit();
                }
            });
          }

          if ($('input[name="bankToken"]').length == 0) {
            // finally, get a token from stripe, and try to charge it if it is not ach
            that.createToken(that.cardNumberElement, tokenData);
          } else {
            // if it is ach, we already have a token so pass it to stripe.
            that.stripeTokenHandler($('#bankToken').val(), 'ach');
          }
        } else {
          // this means valid is false
          that.buttonStatus(that.options, $(that.options.donate_form_selector).find('button'), false);
        }
      });
    },
    // validateAndSubmit
    stripeErrorDisplay: function stripeErrorDisplay(event, this_selector, element, options) {
      // listen for errors and display/hide error messages
      var which_error = this_selector.attr('id');

      if (event.error) {
        $('.card-instruction.' + which_error).text(event.error.message + ' Please try again.');
        $('.card-instruction.' + which_error).addClass('invalid');
        this_selector.parent().addClass('error');
      } else {
        $('.card-instruction.' + which_error).removeClass('invalid');
        $('.card-instruction.' + which_error).empty();
        $(options.cc_num_selector, element).removeClass('error');
        $(options.cc_exp_selector, element).removeClass('error');
        $(options.cc_cvv_selector, element).removeClass('error');
        $(options.cc_num_selector, element).parent().removeClass('error');
        $(options.cc_exp_selector, element).parent().removeClass('error');
        $(options.cc_cvv_selector, element).parent().removeClass('error');
      }
    },
    // stripeErrorDisplay
    generateTokenData: function generateTokenData() {
      var tokenData = {};
      var full_name = '';

      if ($('#full_name').length > 0) {
        full_name = $('#full_name').val();
      } else {
        full_name = $('#first_name').val() + ' ' + $('#last_name').val();
      }

      tokenData.name = full_name;
      var street = 'None';

      if ($('input[name="full_address"]').val() != '') {
        street = $('#full_address').val();

        if ($('input[name="billing_street"]').val() != '') {
          street = $('input[name="billing_street"]').val();
        }

        tokenData.address_line1 = street;
      }

      var city = 'None';

      if ($('input[name="billing_city"]').val() != '') {
        city = $('input[name="billing_city"]').val();
        tokenData.address_city = city;
      }

      var state = 'None';

      if ($('input[name="billing_state"]').val() != '') {
        state = $('input[name="billing_state"]').val();
        tokenData.address_state = state;
      }

      var zip = 'None';

      if ($('input[name="billing_zip"]').val() != '') {
        zip = $('input[name="billing_zip"]').val();
        tokenData.address_zip = zip;
      }

      var country = 'US';

      if ($('input[name="billing_country"]').val() != '') {
        country = $('input[name="billing_country"]').val();
      }

      tokenData.address_country = country;
      return tokenData;
    },
    // generateTokenData
    createToken: function createToken(card, tokenData) {
      var that = this;
      that.stripe.createToken(card, tokenData).then(function (result) {
        if (result.error) {
          // Show the errors on the form
          that.buttonStatus(that.options, $(that.options.donate_form_selector).find('button'), false);
          var field = result.error.field + '_field_selector';
          var message = '';

          if (typeof result.error.message === 'string') {
            message = result.error.message;
          } else {
            message = result.error.message[0];
          }

          if ($(field).length > 0) {
            $(that.options[field], element).addClass('error');
            $(that.options[field], element).prev().addClass('error');
            $(that.options[field], element).after('<span class="check-field invalid">' + message + '</span>');
          }
        } else {
          // Send the token to your server
          that.stripeTokenHandler(result.token, 'card');
        }
      });
    },
    // createToken
    stripeTokenHandler: function stripeTokenHandler(token, type) {
      var that = this;
      var supportform = $(this.options.donate_form_selector);
      var form_data_action = '';

      if (typeof $(supportform).data('action') !== 'undefined') {
        form_data_action = $(supportform).data('action');
      } else {
        form_data_action = window.location.pathname;
      } // Insert the token ID into the form so it gets submitted to the server


      if (type === 'card') {
        supportform.append($('<input type=\"hidden\" name=\"stripeToken\">').val(token.id));

        if ($('input[name="payment_type"]').length > 0) {
          $('input[name="payment_type"]').val(token.card.brand);
        } else {
          supportform.append($('<input type=\"hidden\" name=\"payment_type\" />').val(token.card.brand));
        }
      } else if (type === 'ach') {
        if ($('input[name="payment_type"]').length > 0) {
          $('input[name="payment_type"]').val(type);
        } else {
          supportform.append($('<input type=\"hidden\" name=\"payment_type\" />').val(type));
        }
      } // Submit the form


      $.ajax({
        url: form_data_action,
        cache: false,
        data: $(supportform).serialize(),
        type: 'POST'
      }).done(function (response) {
        if (typeof response.errors !== 'undefined') {
          // do not submit. there is an error.
          that.buttonStatus(that.options, $(that.options.donate_form_selector).find('button'), false); // add some error messages and styles

          $.each(response.errors, function (index, error) {
            var field = error.field + '_field_selector';
            var message = '';

            if (typeof error.message === 'string') {
              message = error.message;
            } else {
              message = error.message[0];
            }

            if ($(that.options[field]).length > 0) {
              $(that.options[field]).addClass('error');
              $(that.options[field]).prev().addClass('error');
              $(that.options[field]).after('<span class="check-field invalid">' + message + '</span>');
            }

            if (typeof error !== 'undefined') {
              that.buttonStatus(that.options, $(that.options.donate_form_selector).find('button'), false);

              if (error.code == 'invalid_number' || error.code == 'incorrect_number' || error.code == 'card_declined' || error.code == 'processing_error') {
                // error handling
                that.stripeErrorDisplay(response.errors, $(that.options.cc_num_selector), that.element, that.options);
              }

              if (error.code == 'invalid_expiry_month' || error.code == 'invalid_expiry_year' || error.code == 'expired_card') {
                // error handling
                that.stripeErrorDisplay(response.errors, $(that.options.cc_exp_selector), that.element, that.options);
              }

              if (error.code == 'invalid_cvc' || error.code == 'incorrect_cvc') {
                // error handling
                that.stripeErrorDisplay(response.errors, $(that.options.cc_cvv_selector), that.element, that.options);
              }

              if (error.field == 'recaptcha') {
                $('button.give').before('<p class="recaptcha-error">' + message + '</p>');
              }

              if (error.type == 'invalid_request_error') {
                $('button.give').before('<p class="error">' + error.message + '</p>');
              }
            }

            if (typeof response.errors[0] !== 'undefined') {
              var field = response.errors[0].field + '_field_selector';

              if ($(field).length > 0) {
                $('html, body').animate({
                  scrollTop: $(options[field]).parent().offset().top
                }, 2000);
              }
            }
          });
        } else {
          supportform.get(0).submit(); // continue submitting the form
        }
      }).error(function (response) {
        that.buttonStatus(that.options, $(that.options.donate_form_selector).find('button'), false);
      });
    },
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
                newsletter_group_html += '<div class="form-item form-item--newsletter">';
                $.each(category[category.contains], function (index, item) {
                  newsletter_group_html += '<label><input name="groups_submitted[]" type="checkbox" value="' + item.id + '">' + item.name + '</label>';
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
            $('.confirm-instructions').text($('.confirm-instructions').attr('data-known-user'));
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0cmlwZS5wYXltZW50LmpzIiwibWlubnBvc3QuZ2l2aW5nLmpzIl0sIm5hbWVzIjpbImYiLCJleHBvcnRzIiwibW9kdWxlIiwiZGVmaW5lIiwiYW1kIiwiZyIsIndpbmRvdyIsImdsb2JhbCIsInNlbGYiLCJwYXltZW50IiwianMiLCJlIiwidCIsIm4iLCJyIiwicyIsIm8iLCJ1IiwiYSIsInJlcXVpcmUiLCJpIiwiRXJyb3IiLCJjb2RlIiwibCIsImNhbGwiLCJsZW5ndGgiLCJRSiIsInJyZXR1cm4iLCJydHJpbSIsInNlbGVjdG9yIiwiaXNET01FbGVtZW50IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZWwiLCJub2RlTmFtZSIsInRyaW0iLCJ0ZXh0IiwicmVwbGFjZSIsInZhbCIsInJldCIsImFyZ3VtZW50cyIsInZhbHVlIiwicHJldmVudERlZmF1bHQiLCJldmVudE9iamVjdCIsInJldHVyblZhbHVlIiwibm9ybWFsaXplRXZlbnQiLCJvcmlnaW5hbCIsIndoaWNoIiwidGFyZ2V0Iiwic3JjRWxlbWVudCIsIm9yaWdpbmFsRXZlbnQiLCJkYXRhIiwiZGV0YWlsIiwiY2hhckNvZGUiLCJrZXlDb2RlIiwib24iLCJlbGVtZW50IiwiZXZlbnROYW1lIiwiY2FsbGJhY2siLCJqIiwibGVuIiwibGVuMSIsIm11bHRFdmVudE5hbWUiLCJvcmlnaW5hbENhbGxiYWNrIiwicmVmIiwibWF0Y2giLCJzcGxpdCIsImFkZEV2ZW50TGlzdGVuZXIiLCJhdHRhY2hFdmVudCIsImFkZENsYXNzIiwiY2xhc3NOYW1lIiwicmVzdWx0cyIsInB1c2giLCJjbGFzc0xpc3QiLCJhZGQiLCJoYXNDbGFzcyIsImNvbnRhaW5zIiwiUmVnRXhwIiwidGVzdCIsInJlbW92ZUNsYXNzIiwiY2xzIiwicmVtb3ZlIiwiam9pbiIsInRvZ2dsZUNsYXNzIiwiYm9vbCIsImFwcGVuZCIsInRvQXBwZW5kIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwiZmluZCIsIk5vZGVMaXN0IiwiQXJyYXkiLCJ0cmlnZ2VyIiwibmFtZSIsImVycm9yIiwiZXYiLCJDdXN0b21FdmVudCIsImNyZWF0ZUV2ZW50IiwiaW5pdEN1c3RvbUV2ZW50IiwiaW5pdEV2ZW50IiwiZGlzcGF0Y2hFdmVudCIsIlBheW1lbnQiLCJjYXJkRnJvbU51bWJlciIsImNhcmRGcm9tVHlwZSIsImNhcmRzIiwiZGVmYXVsdEZvcm1hdCIsImZvcm1hdEJhY2tDYXJkTnVtYmVyIiwiZm9ybWF0QmFja0V4cGlyeSIsImZvcm1hdENhcmROdW1iZXIiLCJmb3JtYXRFeHBpcnkiLCJmb3JtYXRGb3J3YXJkRXhwaXJ5IiwiZm9ybWF0Rm9yd2FyZFNsYXNoIiwiZm9ybWF0TW9udGhFeHBpcnkiLCJoYXNUZXh0U2VsZWN0ZWQiLCJsdWhuQ2hlY2siLCJyZUZvcm1hdENhcmROdW1iZXIiLCJyZXN0cmljdENWQyIsInJlc3RyaWN0Q2FyZE51bWJlciIsInJlc3RyaWN0Q29tYmluZWRFeHBpcnkiLCJyZXN0cmljdEV4cGlyeSIsInJlc3RyaWN0TW9udGhFeHBpcnkiLCJyZXN0cmljdE51bWVyaWMiLCJyZXN0cmljdFllYXJFeHBpcnkiLCJzZXRDYXJkVHlwZSIsImluZGV4T2YiLCJpdGVtIiwidHlwZSIsInBhdHRlcm4iLCJmb3JtYXQiLCJjdmNMZW5ndGgiLCJsdWhuIiwibnVtIiwiY2FyZCIsImRpZ2l0IiwiZGlnaXRzIiwib2RkIiwic3VtIiwicmV2ZXJzZSIsInBhcnNlSW50Iiwic2VsZWN0aW9uU3RhcnQiLCJzZWxlY3Rpb25FbmQiLCJzZWxlY3Rpb24iLCJjcmVhdGVSYW5nZSIsInNldFRpbWVvdXQiLCJfdGhpcyIsImZucyIsInJlIiwidXBwZXJMZW5ndGgiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJtZXRhIiwic2xhc2giLCJtZXRhS2V5IiwiaW5wdXQiLCJjdHJsS2V5IiwiYWxsVHlwZXMiLCJjYXJkVHlwZSIsImNhcmRFeHBpcnlWYWwiLCJtb250aCIsInByZWZpeCIsInllYXIiLCJEYXRlIiwiZ2V0RnVsbFllYXIiLCJ0b1N0cmluZyIsInNsaWNlIiwidmFsaWRhdGVDYXJkTnVtYmVyIiwidmFsaWRhdGVDYXJkRXhwaXJ5IiwiY3VycmVudFRpbWUiLCJleHBpcnkiLCJzZXRNb250aCIsImdldE1vbnRoIiwidmFsaWRhdGVDYXJkQ1ZDIiwiY3ZjIiwicmVmMSIsImdyb3VwcyIsImV4ZWMiLCJzaGlmdCIsImZvcm1hdENhcmRDVkMiLCJmb3JtYXRDYXJkRXhwaXJ5IiwiZm9ybWF0Q2FyZEV4cGlyeU11bHRpcGxlIiwiZ2V0Q2FyZEFycmF5Iiwic2V0Q2FyZEFycmF5IiwiY2FyZEFycmF5IiwiYWRkVG9DYXJkQXJyYXkiLCJjYXJkT2JqZWN0IiwicmVtb3ZlRnJvbUNhcmRBcnJheSIsImtleSIsInNwbGljZSIsIiQiLCJ1bmRlZmluZWQiLCJwbHVnaW5OYW1lIiwiZGVmYXVsdHMiLCJQbHVnaW4iLCJvcHRpb25zIiwiZXh0ZW5kIiwiX2RlZmF1bHRzIiwiX25hbWUiLCJpbml0IiwicHJvdG90eXBlIiwicmVzZXQiLCJhbW91bnQiLCJwYXJzZUZsb2F0IiwibGV2ZWxfYW1vdW50X3NlbGVjdG9yIiwib3JpZ2luYWxfYW1vdW50Iiwib3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yIiwiZnJlcXVlbmN5IiwiZnJlcXVlbmN5X3NlbGVjdG9yIiwiYXR0ciIsInJlY3VycmluZyIsInJlY3VycmluZ19zZWxlY3RvciIsImNoYXJBdCIsInRvVXBwZXJDYXNlIiwicHJvY2Vzc2luZ19mZWUiLCJNYXRoIiwicm91bmQiLCJmZWVfYW1vdW50IiwicG93IiwidG9GaXhlZCIsInByb2Nlc3NpbmdfZmVlX3RleHQiLCJjcmVhdGVfYWNjb3VudCIsImJ1dHRvbl90ZXh0Iiwic3RyaXBlIiwiU3RyaXBlIiwic3RyaXBlX3B1Ymxpc2hhYmxlX2tleSIsImVsZW1lbnRzIiwicmVmZXJyZXIiLCJwcm9wIiwiZGVidWciLCJxdWVyeV9wYW5lbCIsInFzIiwicXVlcnkiLCJhY3RpdmUiLCJ0YWJOYXZpZ2F0aW9uIiwiYW1vdW50QXNSYWRpbyIsImFtb3VudFVwZGF0ZWQiLCJwYXlfY2NfcHJvY2Vzc2luZ19zZWxlY3RvciIsImNyZWRpdENhcmRQcm9jZXNzaW5nRmVlcyIsImRvbmF0ZV9zdGVwX3NlbGVjdG9yIiwibGV2ZWwiLCJjaGVja0xldmVsIiwibGV2ZWxudW0iLCJkb25hdGVBbm9ueW1vdXNseSIsImhvbm9yT3JNZW1vcnlUb2dnbGUiLCJvdXRzaWRlVW5pdGVkU3RhdGVzIiwic2hpcHBpbmdBZGRyZXNzIiwiYWxsb3dNaW5ucG9zdEFjY291bnQiLCJjaG9vc2VQYXltZW50TWV0aG9kIiwiY3JlZGl0Q2FyZEZpZWxkcyIsImFjaEZpZWxkcyIsInZhbGlkYXRlQW5kU3VibWl0IiwiY29uZmlybV9zdGVwX3NlbGVjdG9yIiwic2hvd05ld3NsZXR0ZXJTZXR0aW5ncyIsImNvbmZpcm1NZXNzYWdlU3VibWl0IiwiYiIsInAiLCJkZWNvZGVVUklDb21wb25lbnQiLCJsb2NhdGlvbiIsInNlYXJjaCIsInN1YnN0ciIsIm1lc3NhZ2UiLCJjb25zb2xlIiwibG9nIiwiZGlyIiwiZ2V0UXVlcnlTdHJpbmdzIiwibGluayIsInRoYXQiLCJ0aXRsZSIsInBhZ2UiLCJuZXh0Iiwic3RlcCIsImluZGV4IiwibmF2X2l0ZW1fY291bnQiLCJvcHBfaWQiLCJvcHBfaWRfc2VsZWN0b3IiLCJuZXh0X3N0ZXAiLCJwb3N0X3B1cmNoYXNlIiwiY29uZmlybSIsImNvbmZpcm1fYnV0dG9uX3NlbGVjdG9yIiwiYW5hbHl0aWNzVHJhY2tpbmdTdGVwIiwic2hvdyIsInBhcmVudCIsImdhIiwidG9Mb3dlckNhc2UiLCJwYXRobmFtZSIsImNoYW5nZSIsImlzIiwicGF5bWVudF90eXBlIiwiY2hvb3NlX3BheW1lbnQiLCJ1cGRhdGVfYW1vdW50X3NlbGVjdG9yIiwiY2FsY3VsYXRlRmVlcyIsImFqYXgiLCJtZXRob2QiLCJ1cmwiLCJkb25lIiwiZmVlcyIsImNyZWRpdENhcmRGZWVDaGVja2JveCIsImZpZWxkIiwiZnVsbF9hbW91bnQiLCJmdWxsX2Ftb3VudF9zZWxlY3RvciIsImFub255bW91c19zZWxlY3RvciIsIm5hbWVfc2VsZWN0b3IiLCJoaWRlIiwicmV0dXJudmFsdWUiLCJsZXZlbGNsYXNzIiwiYW1vdW50X3llYXJseSIsImVhY2giLCJsZXZlbHMiLCJtYXgiLCJtaW4iLCJob25vck9yTWVtb3J5IiwiaG9ub3Jfb3JfbWVtb3J5X2Nob29zZXIiLCJob25vcl9tZW1vcnlfaW5wdXRfZ3JvdXAiLCJob25vcl90eXBlX3NlbGVjdG9yIiwiaG9ub3JfbmFtZV9zZWxlY3RvciIsInNob3dfYmlsbGluZ19jb3VudHJ5X3NlbGVjdG9yIiwiY2xpY2siLCJiaWxsaW5nX2NvdW50cnlfc2VsZWN0b3IiLCJzaG93X3NoaXBwaW5nX2NvdW50cnlfc2VsZWN0b3IiLCJzaGlwcGluZ19jb3VudHJ5X3NlbGVjdG9yIiwic2hvd19zaGlwcGluZyIsInVzZV9mb3Jfc2hpcHBpbmdfc2VsZWN0b3IiLCJzaGlwcGluZ19zZWxlY3RvciIsImNoYW5nZWQiLCJhY2NvdW50X2V4aXN0cyIsImVtYWlsX2ZpZWxkX3NlbGVjdG9yIiwiZG9uZVR5cGluZyIsImVtYWlsIiwiY2hlY2tNaW5ucG9zdEFjY291bnQiLCJ0eXBpbmdUaW1lciIsImRvbmVUeXBpbmdJbnRlcnZhbCIsImtleXVwIiwiY2xlYXJUaW1lb3V0IiwiY3JlYXRlX21wX3NlbGVjdG9yIiwicGFzc3dvcmRfc2VsZWN0b3IiLCJiZWZvcmUiLCJnZXQiLCJ0b2dnbGUiLCJ1c2VyIiwibWlubnBvc3Rfcm9vdCIsInJlc3VsdCIsInN0YXR1cyIsInJlYXNvbiIsImNoZWNrZWQiLCJjaGVja2VkX3ZhbHVlIiwicGF5bWVudF9tZXRob2Rfc2VsZWN0b3IiLCJldmVudCIsImlkIiwiZG9uYXRlX2Zvcm1fc2VsZWN0b3IiLCJwcmVwZW5kIiwic3R5bGUiLCJiYXNlIiwiaWNvbkNvbG9yIiwibGluZUhlaWdodCIsImZvbnRXZWlnaHQiLCJmb250RmFtaWx5IiwiZm9udFNpemUiLCJjYXJkTnVtYmVyRWxlbWVudCIsImNyZWF0ZSIsIm1vdW50IiwiY2NfbnVtX3NlbGVjdG9yIiwiY2FyZEV4cGlyeUVsZW1lbnQiLCJjY19leHBfc2VsZWN0b3IiLCJjYXJkQ3ZjRWxlbWVudCIsImNjX2N2dl9zZWxlY3RvciIsInN0cmlwZUVycm9yRGlzcGxheSIsImJ1dHRvblN0YXR1cyIsImJyYW5kIiwic2V0QnJhbmRJY29uIiwiY2FyZEJyYW5kVG9QZkNsYXNzIiwiYnJhbmRJY29uRWxlbWVudCIsImdldEVsZW1lbnRCeUlkIiwicGZDbGFzcyIsInBsYWlkX2VudiIsIlBsYWlkIiwibGlua0hhbmRsZXIiLCJzZWxlY3RBY2NvdW50IiwiYXBpVmVyc2lvbiIsImVudiIsImNsaWVudE5hbWUiLCJwbGFpZF9wdWJsaWNfa2V5IiwicHJvZHVjdCIsIm9uTG9hZCIsIm9uU3VjY2VzcyIsInB1YmxpY190b2tlbiIsIm1ldGFkYXRhIiwic3VwcG9ydGZvcm0iLCJhY2NvdW50X2lkIiwic2VyaWFsaXplIiwicmVzcG9uc2UiLCJwbGFpZF9saW5rIiwiYWZ0ZXIiLCJzdHJpcGVfYmFua19hY2NvdW50X3Rva2VuIiwiaHRtbCIsImNvbnRlbnRzIiwidW53cmFwIiwib25FeGl0IiwiZXJyIiwib3BlbiIsImhhc0h0bWw1VmFsaWRhdGlvbiIsImNyZWF0ZUVsZW1lbnQiLCJjaGVja1ZhbGlkaXR5IiwiYnV0dG9uIiwiZGlzYWJsZWQiLCJzdWJtaXQiLCJhbmltYXRlIiwic2Nyb2xsVG9wIiwib2Zmc2V0IiwidG9wIiwidmFsaWQiLCJwYXltZW50X21ldGhvZCIsInRva2VuRGF0YSIsImdlbmVyYXRlVG9rZW5EYXRhIiwiZmlyc3RfbmFtZSIsImZpcnN0X25hbWVfZmllbGRfc2VsZWN0b3IiLCJsYXN0X25hbWUiLCJsYXN0X25hbWVfZmllbGRfc2VsZWN0b3IiLCJwYXNzd29yZCIsInBhc3N3b3JkX2ZpZWxkX3NlbGVjdG9yIiwiY2l0eSIsImFjY291bnRfY2l0eV9zZWxlY3RvciIsInN0YXRlIiwiYWNjb3VudF9zdGF0ZV9zZWxlY3RvciIsInppcCIsImFjY291bnRfemlwX3NlbGVjdG9yIiwiZ3JlY2FwdGNoYSIsImNyZWF0ZVRva2VuIiwic3RyaXBlVG9rZW5IYW5kbGVyIiwidGhpc19zZWxlY3RvciIsIndoaWNoX2Vycm9yIiwiZW1wdHkiLCJmdWxsX25hbWUiLCJzdHJlZXQiLCJhZGRyZXNzX2xpbmUxIiwiYWRkcmVzc19jaXR5IiwiYWRkcmVzc19zdGF0ZSIsImFkZHJlc3NfemlwIiwiY291bnRyeSIsImFkZHJlc3NfY291bnRyeSIsInRoZW4iLCJwcmV2IiwidG9rZW4iLCJmb3JtX2RhdGFfYWN0aW9uIiwiY2FjaGUiLCJlcnJvcnMiLCJuZXdzbGV0dGVyX2dyb3VwX2h0bWwiLCJuZXdzbGV0dGVyX2dyb3VwX3NlbGVjdG9yIiwiZ2V0X2RhdGEiLCJzaG9ydGNvZGUiLCJwbGFjZW1lbnQiLCJncm91cF9maWVsZHMiLCJjYXRlZ29yeSIsIm1haWxjaGltcF9zdGF0dXMiLCJtYWlsY2hpbXBfdXNlcl9pZCIsImV4aXN0aW5nX25ld3NsZXR0ZXJfc2V0dGluZ3MiLCJjb25maXJtX2Zvcm1fc2VsZWN0b3IiLCJjb25maXJtZm9ybSIsIm5ld3NsZXR0ZXJfZ3JvdXBzIiwibmV3X25ld3NsZXR0ZXJfc2V0dGluZ3MiLCJwb3N0X2RhdGEiLCJncm91cHNfc3VibWl0dGVkIiwiZ3JvdXBzX2F2YWlsYWJsZSIsImdyb3VwIiwiZGF0YVR5cGUiLCJjb250ZW50VHlwZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJzdWNjZXNzIiwiZmFpbCIsImZuIiwialF1ZXJ5Il0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsQ0FBQyxVQUFTQSxDQUFULEVBQVc7QUFBQyxNQUFHLFFBQU9DLE9BQVAseUNBQU9BLE9BQVAsT0FBaUIsUUFBakIsSUFBMkIsT0FBT0MsTUFBUCxLQUFnQixXQUE5QyxFQUEwRDtBQUFDQSxJQUFBQSxNQUFNLENBQUNELE9BQVAsR0FBZUQsQ0FBQyxFQUFoQjtBQUFtQixHQUE5RSxNQUFtRixJQUFHLE9BQU9HLE1BQVAsS0FBZ0IsVUFBaEIsSUFBNEJBLE1BQU0sQ0FBQ0MsR0FB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LEVBQW1CO0FBQ3ZCO0FBQ0E7QUFDQW1FLFlBQUFBLFdBQVcsQ0FBQ3hILEdBQVosQ0FBZ0IsQ0FBaEIsRUFBbUJvRSxNQUFuQjtBQUNELFdBOUJEO0FBZ0NELFNBNURELE1BNERPO0FBQUU7QUFDUG9ELFVBQUFBLFdBQVcsQ0FBQ3hILEdBQVosQ0FBZ0IsQ0FBaEIsRUFBbUJvRSxNQUFuQjtBQUNEO0FBRUYsT0ExRUQsRUFMK0MsQ0FnRi9DO0FBQ0QsS0FscENnQixDQWtwQ2Q7O0FBbHBDYyxHQUFuQixDQXZINEMsQ0Eyd0N6QztBQUVIO0FBQ0E7O0FBQ0F2TixFQUFBQSxDQUFDLENBQUN3UixFQUFGLENBQUt0UixVQUFMLElBQW1CLFVBQVdHLE9BQVgsRUFBcUI7QUFDdEMsV0FBTyxLQUFLZ0gsSUFBTCxDQUFVLFlBQVk7QUFDM0IsVUFBSSxDQUFDckgsQ0FBQyxDQUFDeEksSUFBRixDQUFPLElBQVAsRUFBYSxZQUFZMEksVUFBekIsQ0FBTCxFQUEyQztBQUN6Q0YsUUFBQUEsQ0FBQyxDQUFDeEksSUFBRixDQUFPLElBQVAsRUFBYSxZQUFZMEksVUFBekIsRUFBcUMsSUFBSUUsTUFBSixDQUFZLElBQVosRUFBa0JDLE9BQWxCLENBQXJDO0FBQ0Q7QUFDRixLQUpNLENBQVA7QUFLRCxHQU5EO0FBUUQsQ0F2eENBLEVBdXhDR29SLE1BdnhDSCxFQXV4Q1c5YyxNQXZ4Q1gsRUF1eENtQnlCLFFBdnhDbkIiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbihmKXtpZih0eXBlb2YgZXhwb3J0cz09PVwib2JqZWN0XCImJnR5cGVvZiBtb2R1bGUhPT1cInVuZGVmaW5lZFwiKXttb2R1bGUuZXhwb3J0cz1mKCl9ZWxzZSBpZih0eXBlb2YgZGVmaW5lPT09XCJmdW5jdGlvblwiJiZkZWZpbmUuYW1kKXtkZWZpbmUoW10sZil9ZWxzZXt2YXIgZztpZih0eXBlb2Ygd2luZG93IT09XCJ1bmRlZmluZWRcIil7Zz13aW5kb3d9ZWxzZSBpZih0eXBlb2YgZ2xvYmFsIT09XCJ1bmRlZmluZWRcIil7Zz1nbG9iYWx9ZWxzZSBpZih0eXBlb2Ygc2VsZiE9PVwidW5kZWZpbmVkXCIpe2c9c2VsZn1lbHNle2c9dGhpc30oZy5wYXltZW50IHx8IChnLnBheW1lbnQgPSB7fSkpLmpzID0gZigpfX0pKGZ1bmN0aW9uKCl7dmFyIGRlZmluZSxtb2R1bGUsZXhwb3J0cztyZXR1cm4gKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkoezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xudmFyIFFKLCBycmV0dXJuLCBydHJpbTtcblxuUUogPSBmdW5jdGlvbihzZWxlY3Rvcikge1xuICBpZiAoUUouaXNET01FbGVtZW50KHNlbGVjdG9yKSkge1xuICAgIHJldHVybiBzZWxlY3RvcjtcbiAgfVxuICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG59O1xuXG5RSi5pc0RPTUVsZW1lbnQgPSBmdW5jdGlvbihlbCkge1xuICByZXR1cm4gZWwgJiYgKGVsLm5vZGVOYW1lICE9IG51bGwpO1xufTtcblxucnRyaW0gPSAvXltcXHNcXHVGRUZGXFx4QTBdK3xbXFxzXFx1RkVGRlxceEEwXSskL2c7XG5cblFKLnRyaW0gPSBmdW5jdGlvbih0ZXh0KSB7XG4gIGlmICh0ZXh0ID09PSBudWxsKSB7XG4gICAgcmV0dXJuIFwiXCI7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICh0ZXh0ICsgXCJcIikucmVwbGFjZShydHJpbSwgXCJcIik7XG4gIH1cbn07XG5cbnJyZXR1cm4gPSAvXFxyL2c7XG5cblFKLnZhbCA9IGZ1bmN0aW9uKGVsLCB2YWwpIHtcbiAgdmFyIHJldDtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgcmV0dXJuIGVsLnZhbHVlID0gdmFsO1xuICB9IGVsc2Uge1xuICAgIHJldCA9IGVsLnZhbHVlO1xuICAgIGlmICh0eXBlb2YgcmV0ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICByZXR1cm4gcmV0LnJlcGxhY2UocnJldHVybiwgXCJcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChyZXQgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuUUoucHJldmVudERlZmF1bHQgPSBmdW5jdGlvbihldmVudE9iamVjdCkge1xuICBpZiAodHlwZW9mIGV2ZW50T2JqZWN0LnByZXZlbnREZWZhdWx0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBldmVudE9iamVjdC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybjtcbiAgfVxuICBldmVudE9iamVjdC5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICByZXR1cm4gZmFsc2U7XG59O1xuXG5RSi5ub3JtYWxpemVFdmVudCA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIG9yaWdpbmFsO1xuICBvcmlnaW5hbCA9IGU7XG4gIGUgPSB7XG4gICAgd2hpY2g6IG9yaWdpbmFsLndoaWNoICE9IG51bGwgPyBvcmlnaW5hbC53aGljaCA6IHZvaWQgMCxcbiAgICB0YXJnZXQ6IG9yaWdpbmFsLnRhcmdldCB8fCBvcmlnaW5hbC5zcmNFbGVtZW50LFxuICAgIHByZXZlbnREZWZhdWx0OiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBRSi5wcmV2ZW50RGVmYXVsdChvcmlnaW5hbCk7XG4gICAgfSxcbiAgICBvcmlnaW5hbEV2ZW50OiBvcmlnaW5hbCxcbiAgICBkYXRhOiBvcmlnaW5hbC5kYXRhIHx8IG9yaWdpbmFsLmRldGFpbFxuICB9O1xuICBpZiAoZS53aGljaCA9PSBudWxsKSB7XG4gICAgZS53aGljaCA9IG9yaWdpbmFsLmNoYXJDb2RlICE9IG51bGwgPyBvcmlnaW5hbC5jaGFyQ29kZSA6IG9yaWdpbmFsLmtleUNvZGU7XG4gIH1cbiAgcmV0dXJuIGU7XG59O1xuXG5RSi5vbiA9IGZ1bmN0aW9uKGVsZW1lbnQsIGV2ZW50TmFtZSwgY2FsbGJhY2spIHtcbiAgdmFyIGVsLCBpLCBqLCBsZW4sIGxlbjEsIG11bHRFdmVudE5hbWUsIG9yaWdpbmFsQ2FsbGJhY2ssIHJlZjtcbiAgaWYgKGVsZW1lbnQubGVuZ3RoKSB7XG4gICAgZm9yIChpID0gMCwgbGVuID0gZWxlbWVudC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgZWwgPSBlbGVtZW50W2ldO1xuICAgICAgUUoub24oZWwsIGV2ZW50TmFtZSwgY2FsbGJhY2spO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGV2ZW50TmFtZS5tYXRjaChcIiBcIikpIHtcbiAgICByZWYgPSBldmVudE5hbWUuc3BsaXQoXCIgXCIpO1xuICAgIGZvciAoaiA9IDAsIGxlbjEgPSByZWYubGVuZ3RoOyBqIDwgbGVuMTsgaisrKSB7XG4gICAgICBtdWx0RXZlbnROYW1lID0gcmVmW2pdO1xuICAgICAgUUoub24oZWxlbWVudCwgbXVsdEV2ZW50TmFtZSwgY2FsbGJhY2spO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cbiAgb3JpZ2luYWxDYWxsYmFjayA9IGNhbGxiYWNrO1xuICBjYWxsYmFjayA9IGZ1bmN0aW9uKGUpIHtcbiAgICBlID0gUUoubm9ybWFsaXplRXZlbnQoZSk7XG4gICAgcmV0dXJuIG9yaWdpbmFsQ2FsbGJhY2soZSk7XG4gIH07XG4gIGlmIChlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICByZXR1cm4gZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgY2FsbGJhY2ssIGZhbHNlKTtcbiAgfVxuICBpZiAoZWxlbWVudC5hdHRhY2hFdmVudCkge1xuICAgIGV2ZW50TmFtZSA9IFwib25cIiArIGV2ZW50TmFtZTtcbiAgICByZXR1cm4gZWxlbWVudC5hdHRhY2hFdmVudChldmVudE5hbWUsIGNhbGxiYWNrKTtcbiAgfVxuICBlbGVtZW50WydvbicgKyBldmVudE5hbWVdID0gY2FsbGJhY2s7XG59O1xuXG5RSi5hZGRDbGFzcyA9IGZ1bmN0aW9uKGVsLCBjbGFzc05hbWUpIHtcbiAgdmFyIGU7XG4gIGlmIChlbC5sZW5ndGgpIHtcbiAgICByZXR1cm4gKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGksIGxlbiwgcmVzdWx0cztcbiAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgIGZvciAoaSA9IDAsIGxlbiA9IGVsLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGUgPSBlbFtpXTtcbiAgICAgICAgcmVzdWx0cy5wdXNoKFFKLmFkZENsYXNzKGUsIGNsYXNzTmFtZSkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfSkoKTtcbiAgfVxuICBpZiAoZWwuY2xhc3NMaXN0KSB7XG4gICAgcmV0dXJuIGVsLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZWwuY2xhc3NOYW1lICs9ICcgJyArIGNsYXNzTmFtZTtcbiAgfVxufTtcblxuUUouaGFzQ2xhc3MgPSBmdW5jdGlvbihlbCwgY2xhc3NOYW1lKSB7XG4gIHZhciBlLCBoYXNDbGFzcywgaSwgbGVuO1xuICBpZiAoZWwubGVuZ3RoKSB7XG4gICAgaGFzQ2xhc3MgPSB0cnVlO1xuICAgIGZvciAoaSA9IDAsIGxlbiA9IGVsLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBlID0gZWxbaV07XG4gICAgICBoYXNDbGFzcyA9IGhhc0NsYXNzICYmIFFKLmhhc0NsYXNzKGUsIGNsYXNzTmFtZSk7XG4gICAgfVxuICAgIHJldHVybiBoYXNDbGFzcztcbiAgfVxuICBpZiAoZWwuY2xhc3NMaXN0KSB7XG4gICAgcmV0dXJuIGVsLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgUmVnRXhwKCcoXnwgKScgKyBjbGFzc05hbWUgKyAnKCB8JCknLCAnZ2knKS50ZXN0KGVsLmNsYXNzTmFtZSk7XG4gIH1cbn07XG5cblFKLnJlbW92ZUNsYXNzID0gZnVuY3Rpb24oZWwsIGNsYXNzTmFtZSkge1xuICB2YXIgY2xzLCBlLCBpLCBsZW4sIHJlZiwgcmVzdWx0cztcbiAgaWYgKGVsLmxlbmd0aCkge1xuICAgIHJldHVybiAoZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaSwgbGVuLCByZXN1bHRzO1xuICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgZm9yIChpID0gMCwgbGVuID0gZWwubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgZSA9IGVsW2ldO1xuICAgICAgICByZXN1bHRzLnB1c2goUUoucmVtb3ZlQ2xhc3MoZSwgY2xhc3NOYW1lKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9KSgpO1xuICB9XG4gIGlmIChlbC5jbGFzc0xpc3QpIHtcbiAgICByZWYgPSBjbGFzc05hbWUuc3BsaXQoJyAnKTtcbiAgICByZXN1bHRzID0gW107XG4gICAgZm9yIChpID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBjbHMgPSByZWZbaV07XG4gICAgICByZXN1bHRzLnB1c2goZWwuY2xhc3NMaXN0LnJlbW92ZShjbHMpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGVsLmNsYXNzTmFtZSA9IGVsLmNsYXNzTmFtZS5yZXBsYWNlKG5ldyBSZWdFeHAoJyhefFxcXFxiKScgKyBjbGFzc05hbWUuc3BsaXQoJyAnKS5qb2luKCd8JykgKyAnKFxcXFxifCQpJywgJ2dpJyksICcgJyk7XG4gIH1cbn07XG5cblFKLnRvZ2dsZUNsYXNzID0gZnVuY3Rpb24oZWwsIGNsYXNzTmFtZSwgYm9vbCkge1xuICB2YXIgZTtcbiAgaWYgKGVsLmxlbmd0aCkge1xuICAgIHJldHVybiAoZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaSwgbGVuLCByZXN1bHRzO1xuICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgZm9yIChpID0gMCwgbGVuID0gZWwubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgZSA9IGVsW2ldO1xuICAgICAgICByZXN1bHRzLnB1c2goUUoudG9nZ2xlQ2xhc3MoZSwgY2xhc3NOYW1lLCBib29sKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9KSgpO1xuICB9XG4gIGlmIChib29sKSB7XG4gICAgaWYgKCFRSi5oYXNDbGFzcyhlbCwgY2xhc3NOYW1lKSkge1xuICAgICAgcmV0dXJuIFFKLmFkZENsYXNzKGVsLCBjbGFzc05hbWUpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gUUoucmVtb3ZlQ2xhc3MoZWwsIGNsYXNzTmFtZSk7XG4gIH1cbn07XG5cblFKLmFwcGVuZCA9IGZ1bmN0aW9uKGVsLCB0b0FwcGVuZCkge1xuICB2YXIgZTtcbiAgaWYgKGVsLmxlbmd0aCkge1xuICAgIHJldHVybiAoZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaSwgbGVuLCByZXN1bHRzO1xuICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgZm9yIChpID0gMCwgbGVuID0gZWwubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgZSA9IGVsW2ldO1xuICAgICAgICByZXN1bHRzLnB1c2goUUouYXBwZW5kKGUsIHRvQXBwZW5kKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9KSgpO1xuICB9XG4gIHJldHVybiBlbC5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIHRvQXBwZW5kKTtcbn07XG5cblFKLmZpbmQgPSBmdW5jdGlvbihlbCwgc2VsZWN0b3IpIHtcbiAgaWYgKGVsIGluc3RhbmNlb2YgTm9kZUxpc3QgfHwgZWwgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgIGVsID0gZWxbMF07XG4gIH1cbiAgcmV0dXJuIGVsLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xufTtcblxuUUoudHJpZ2dlciA9IGZ1bmN0aW9uKGVsLCBuYW1lLCBkYXRhKSB7XG4gIHZhciBlLCBlcnJvciwgZXY7XG4gIHRyeSB7XG4gICAgZXYgPSBuZXcgQ3VzdG9tRXZlbnQobmFtZSwge1xuICAgICAgZGV0YWlsOiBkYXRhXG4gICAgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgZSA9IGVycm9yO1xuICAgIGV2ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG4gICAgaWYgKGV2LmluaXRDdXN0b21FdmVudCkge1xuICAgICAgZXYuaW5pdEN1c3RvbUV2ZW50KG5hbWUsIHRydWUsIHRydWUsIGRhdGEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBldi5pbml0RXZlbnQobmFtZSwgdHJ1ZSwgdHJ1ZSwgZGF0YSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBlbC5kaXNwYXRjaEV2ZW50KGV2KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUUo7XG5cblxufSx7fV0sMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4oZnVuY3Rpb24gKGdsb2JhbCl7XG52YXIgUGF5bWVudCwgUUosIGNhcmRGcm9tTnVtYmVyLCBjYXJkRnJvbVR5cGUsIGNhcmRzLCBkZWZhdWx0Rm9ybWF0LCBmb3JtYXRCYWNrQ2FyZE51bWJlciwgZm9ybWF0QmFja0V4cGlyeSwgZm9ybWF0Q2FyZE51bWJlciwgZm9ybWF0RXhwaXJ5LCBmb3JtYXRGb3J3YXJkRXhwaXJ5LCBmb3JtYXRGb3J3YXJkU2xhc2gsIGZvcm1hdE1vbnRoRXhwaXJ5LCBoYXNUZXh0U2VsZWN0ZWQsIGx1aG5DaGVjaywgcmVGb3JtYXRDYXJkTnVtYmVyLCByZXN0cmljdENWQywgcmVzdHJpY3RDYXJkTnVtYmVyLCByZXN0cmljdENvbWJpbmVkRXhwaXJ5LCByZXN0cmljdEV4cGlyeSwgcmVzdHJpY3RNb250aEV4cGlyeSwgcmVzdHJpY3ROdW1lcmljLCByZXN0cmljdFllYXJFeHBpcnksIHNldENhcmRUeXBlLFxuICBpbmRleE9mID0gW10uaW5kZXhPZiB8fCBmdW5jdGlvbihpdGVtKSB7IGZvciAodmFyIGkgPSAwLCBsID0gdGhpcy5sZW5ndGg7IGkgPCBsOyBpKyspIHsgaWYgKGkgaW4gdGhpcyAmJiB0aGlzW2ldID09PSBpdGVtKSByZXR1cm4gaTsgfSByZXR1cm4gLTE7IH07XG5cblFKID0gcmVxdWlyZSgncWovc3JjL3FqLmNvZmZlZScpO1xuXG5kZWZhdWx0Rm9ybWF0ID0gLyhcXGR7MSw0fSkvZztcblxuY2FyZHMgPSBbXG4gIHtcbiAgICB0eXBlOiAnYW1leCcsXG4gICAgcGF0dGVybjogL14zWzQ3XS8sXG4gICAgZm9ybWF0OiAvKFxcZHsxLDR9KShcXGR7MSw2fSk/KFxcZHsxLDV9KT8vLFxuICAgIGxlbmd0aDogWzE1XSxcbiAgICBjdmNMZW5ndGg6IFs0XSxcbiAgICBsdWhuOiB0cnVlXG4gIH0sIHtcbiAgICB0eXBlOiAnZGFua29ydCcsXG4gICAgcGF0dGVybjogL141MDE5LyxcbiAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgbGVuZ3RoOiBbMTZdLFxuICAgIGN2Y0xlbmd0aDogWzNdLFxuICAgIGx1aG46IHRydWVcbiAgfSwge1xuICAgIHR5cGU6ICdkaW5lcnNjbHViJyxcbiAgICBwYXR0ZXJuOiAvXigzNnwzOHwzMFswLTVdKS8sXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGxlbmd0aDogWzE0XSxcbiAgICBjdmNMZW5ndGg6IFszXSxcbiAgICBsdWhuOiB0cnVlXG4gIH0sIHtcbiAgICB0eXBlOiAnZGlzY292ZXInLFxuICAgIHBhdHRlcm46IC9eKDYwMTF8NjV8NjRbNC05XXw2MjIpLyxcbiAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgbGVuZ3RoOiBbMTZdLFxuICAgIGN2Y0xlbmd0aDogWzNdLFxuICAgIGx1aG46IHRydWVcbiAgfSwge1xuICAgIHR5cGU6ICdqY2InLFxuICAgIHBhdHRlcm46IC9eMzUvLFxuICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICBsZW5ndGg6IFsxNl0sXG4gICAgY3ZjTGVuZ3RoOiBbM10sXG4gICAgbHVobjogdHJ1ZVxuICB9LCB7XG4gICAgdHlwZTogJ2xhc2VyJyxcbiAgICBwYXR0ZXJuOiAvXig2NzA2fDY3NzF8NjcwOSkvLFxuICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICBsZW5ndGg6IFsxNiwgMTcsIDE4LCAxOV0sXG4gICAgY3ZjTGVuZ3RoOiBbM10sXG4gICAgbHVobjogdHJ1ZVxuICB9LCB7XG4gICAgdHlwZTogJ21hZXN0cm8nLFxuICAgIHBhdHRlcm46IC9eKDUwMTh8NTAyMHw1MDM4fDYzMDR8NjcwM3w2NzU5fDY3NlsxLTNdKS8sXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGxlbmd0aDogWzEyLCAxMywgMTQsIDE1LCAxNiwgMTcsIDE4LCAxOV0sXG4gICAgY3ZjTGVuZ3RoOiBbM10sXG4gICAgbHVobjogdHJ1ZVxuICB9LCB7XG4gICAgdHlwZTogJ21hc3RlcmNhcmQnLFxuICAgIHBhdHRlcm46IC9eNVsxLTVdLyxcbiAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgbGVuZ3RoOiBbMTZdLFxuICAgIGN2Y0xlbmd0aDogWzNdLFxuICAgIGx1aG46IHRydWVcbiAgfSwge1xuICAgIHR5cGU6ICd1bmlvbnBheScsXG4gICAgcGF0dGVybjogL142Mi8sXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGxlbmd0aDogWzE2LCAxNywgMTgsIDE5XSxcbiAgICBjdmNMZW5ndGg6IFszXSxcbiAgICBsdWhuOiBmYWxzZVxuICB9LCB7XG4gICAgdHlwZTogJ3Zpc2FlbGVjdHJvbicsXG4gICAgcGF0dGVybjogL140KDAyNnwxNzUwMHw0MDV8NTA4fDg0NHw5MVszN10pLyxcbiAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgbGVuZ3RoOiBbMTZdLFxuICAgIGN2Y0xlbmd0aDogWzNdLFxuICAgIGx1aG46IHRydWVcbiAgfSwge1xuICAgIHR5cGU6ICd2aXNhJyxcbiAgICBwYXR0ZXJuOiAvXjQvLFxuICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICBsZW5ndGg6IFsxMywgMTZdLFxuICAgIGN2Y0xlbmd0aDogWzNdLFxuICAgIGx1aG46IHRydWVcbiAgfSwge1xuICAgIHR5cGU6ICdlbG8nLFxuICAgIHBhdHRlcm46IC9eNDAxMXw0Mzg5MzV8NDUoMTQxNnw3Nil8NTAoNDE3NXw2Njk5fDY3fDkwWzQtN10pfDYzKDYyOTd8NjM2OCkvLFxuICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICBsZW5ndGg6IFsxNl0sXG4gICAgY3ZjTGVuZ3RoOiBbM10sXG4gICAgbHVobjogdHJ1ZVxuICB9XG5dO1xuXG5jYXJkRnJvbU51bWJlciA9IGZ1bmN0aW9uKG51bSkge1xuICB2YXIgY2FyZCwgaSwgbGVuO1xuICBudW0gPSAobnVtICsgJycpLnJlcGxhY2UoL1xcRC9nLCAnJyk7XG4gIGZvciAoaSA9IDAsIGxlbiA9IGNhcmRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgY2FyZCA9IGNhcmRzW2ldO1xuICAgIGlmIChjYXJkLnBhdHRlcm4udGVzdChudW0pKSB7XG4gICAgICByZXR1cm4gY2FyZDtcbiAgICB9XG4gIH1cbn07XG5cbmNhcmRGcm9tVHlwZSA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIGNhcmQsIGksIGxlbjtcbiAgZm9yIChpID0gMCwgbGVuID0gY2FyZHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBjYXJkID0gY2FyZHNbaV07XG4gICAgaWYgKGNhcmQudHlwZSA9PT0gdHlwZSkge1xuICAgICAgcmV0dXJuIGNhcmQ7XG4gICAgfVxuICB9XG59O1xuXG5sdWhuQ2hlY2sgPSBmdW5jdGlvbihudW0pIHtcbiAgdmFyIGRpZ2l0LCBkaWdpdHMsIGksIGxlbiwgb2RkLCBzdW07XG4gIG9kZCA9IHRydWU7XG4gIHN1bSA9IDA7XG4gIGRpZ2l0cyA9IChudW0gKyAnJykuc3BsaXQoJycpLnJldmVyc2UoKTtcbiAgZm9yIChpID0gMCwgbGVuID0gZGlnaXRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgZGlnaXQgPSBkaWdpdHNbaV07XG4gICAgZGlnaXQgPSBwYXJzZUludChkaWdpdCwgMTApO1xuICAgIGlmICgob2RkID0gIW9kZCkpIHtcbiAgICAgIGRpZ2l0ICo9IDI7XG4gICAgfVxuICAgIGlmIChkaWdpdCA+IDkpIHtcbiAgICAgIGRpZ2l0IC09IDk7XG4gICAgfVxuICAgIHN1bSArPSBkaWdpdDtcbiAgfVxuICByZXR1cm4gc3VtICUgMTAgPT09IDA7XG59O1xuXG5oYXNUZXh0U2VsZWN0ZWQgPSBmdW5jdGlvbih0YXJnZXQpIHtcbiAgdmFyIHJlZjtcbiAgaWYgKCh0YXJnZXQuc2VsZWN0aW9uU3RhcnQgIT0gbnVsbCkgJiYgdGFyZ2V0LnNlbGVjdGlvblN0YXJ0ICE9PSB0YXJnZXQuc2VsZWN0aW9uRW5kKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKCh0eXBlb2YgZG9jdW1lbnQgIT09IFwidW5kZWZpbmVkXCIgJiYgZG9jdW1lbnQgIT09IG51bGwgPyAocmVmID0gZG9jdW1lbnQuc2VsZWN0aW9uKSAhPSBudWxsID8gcmVmLmNyZWF0ZVJhbmdlIDogdm9pZCAwIDogdm9pZCAwKSAhPSBudWxsKSB7XG4gICAgaWYgKGRvY3VtZW50LnNlbGVjdGlvbi5jcmVhdGVSYW5nZSgpLnRleHQpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuXG5yZUZvcm1hdENhcmROdW1iZXIgPSBmdW5jdGlvbihlKSB7XG4gIHJldHVybiBzZXRUaW1lb3V0KChmdW5jdGlvbihfdGhpcykge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciB0YXJnZXQsIHZhbHVlO1xuICAgICAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgICB2YWx1ZSA9IFFKLnZhbCh0YXJnZXQpO1xuICAgICAgdmFsdWUgPSBQYXltZW50LmZucy5mb3JtYXRDYXJkTnVtYmVyKHZhbHVlKTtcbiAgICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCB2YWx1ZSk7XG4gICAgfTtcbiAgfSkodGhpcykpO1xufTtcblxuZm9ybWF0Q2FyZE51bWJlciA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIGNhcmQsIGRpZ2l0LCBsZW5ndGgsIHJlLCB0YXJnZXQsIHVwcGVyTGVuZ3RoLCB2YWx1ZTtcbiAgZGlnaXQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpO1xuICBpZiAoIS9eXFxkKyQvLnRlc3QoZGlnaXQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRhcmdldCA9IGUudGFyZ2V0O1xuICB2YWx1ZSA9IFFKLnZhbCh0YXJnZXQpO1xuICBjYXJkID0gY2FyZEZyb21OdW1iZXIodmFsdWUgKyBkaWdpdCk7XG4gIGxlbmd0aCA9ICh2YWx1ZS5yZXBsYWNlKC9cXEQvZywgJycpICsgZGlnaXQpLmxlbmd0aDtcbiAgdXBwZXJMZW5ndGggPSAxNjtcbiAgaWYgKGNhcmQpIHtcbiAgICB1cHBlckxlbmd0aCA9IGNhcmQubGVuZ3RoW2NhcmQubGVuZ3RoLmxlbmd0aCAtIDFdO1xuICB9XG4gIGlmIChsZW5ndGggPj0gdXBwZXJMZW5ndGgpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKCh0YXJnZXQuc2VsZWN0aW9uU3RhcnQgIT0gbnVsbCkgJiYgdGFyZ2V0LnNlbGVjdGlvblN0YXJ0ICE9PSB2YWx1ZS5sZW5ndGgpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGNhcmQgJiYgY2FyZC50eXBlID09PSAnYW1leCcpIHtcbiAgICByZSA9IC9eKFxcZHs0fXxcXGR7NH1cXHNcXGR7Nn0pJC87XG4gIH0gZWxzZSB7XG4gICAgcmUgPSAvKD86XnxcXHMpKFxcZHs0fSkkLztcbiAgfVxuICBpZiAocmUudGVzdCh2YWx1ZSkpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIHZhbHVlICsgJyAnICsgZGlnaXQpO1xuICB9IGVsc2UgaWYgKHJlLnRlc3QodmFsdWUgKyBkaWdpdCkpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIHZhbHVlICsgZGlnaXQgKyAnICcpO1xuICB9XG59O1xuXG5mb3JtYXRCYWNrQ2FyZE51bWJlciA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIHRhcmdldCwgdmFsdWU7XG4gIHRhcmdldCA9IGUudGFyZ2V0O1xuICB2YWx1ZSA9IFFKLnZhbCh0YXJnZXQpO1xuICBpZiAoZS5tZXRhKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChlLndoaWNoICE9PSA4KSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICgodGFyZ2V0LnNlbGVjdGlvblN0YXJ0ICE9IG51bGwpICYmIHRhcmdldC5zZWxlY3Rpb25TdGFydCAhPT0gdmFsdWUubGVuZ3RoKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICgvXFxkXFxzJC8udGVzdCh2YWx1ZSkpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIHZhbHVlLnJlcGxhY2UoL1xcZFxccyQvLCAnJykpO1xuICB9IGVsc2UgaWYgKC9cXHNcXGQ/JC8udGVzdCh2YWx1ZSkpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIHZhbHVlLnJlcGxhY2UoL1xcc1xcZD8kLywgJycpKTtcbiAgfVxufTtcblxuZm9ybWF0RXhwaXJ5ID0gZnVuY3Rpb24oZSkge1xuICB2YXIgZGlnaXQsIHRhcmdldCwgdmFsO1xuICBkaWdpdCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZS53aGljaCk7XG4gIGlmICghL15cXGQrJC8udGVzdChkaWdpdCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gIHZhbCA9IFFKLnZhbCh0YXJnZXQpICsgZGlnaXQ7XG4gIGlmICgvXlxcZCQvLnRlc3QodmFsKSAmJiAodmFsICE9PSAnMCcgJiYgdmFsICE9PSAnMScpKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCBcIjBcIiArIHZhbCArIFwiIC8gXCIpO1xuICB9IGVsc2UgaWYgKC9eXFxkXFxkJC8udGVzdCh2YWwpKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCB2YWwgKyBcIiAvIFwiKTtcbiAgfVxufTtcblxuZm9ybWF0TW9udGhFeHBpcnkgPSBmdW5jdGlvbihlKSB7XG4gIHZhciBkaWdpdCwgdGFyZ2V0LCB2YWw7XG4gIGRpZ2l0ID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKTtcbiAgaWYgKCEvXlxcZCskLy50ZXN0KGRpZ2l0KSkge1xuICAgIHJldHVybjtcbiAgfVxuICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgdmFsID0gUUoudmFsKHRhcmdldCkgKyBkaWdpdDtcbiAgaWYgKC9eXFxkJC8udGVzdCh2YWwpICYmICh2YWwgIT09ICcwJyAmJiB2YWwgIT09ICcxJykpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIFwiMFwiICsgdmFsKTtcbiAgfSBlbHNlIGlmICgvXlxcZFxcZCQvLnRlc3QodmFsKSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgXCJcIiArIHZhbCk7XG4gIH1cbn07XG5cbmZvcm1hdEZvcndhcmRFeHBpcnkgPSBmdW5jdGlvbihlKSB7XG4gIHZhciBkaWdpdCwgdGFyZ2V0LCB2YWw7XG4gIGRpZ2l0ID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKTtcbiAgaWYgKCEvXlxcZCskLy50ZXN0KGRpZ2l0KSkge1xuICAgIHJldHVybjtcbiAgfVxuICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgdmFsID0gUUoudmFsKHRhcmdldCk7XG4gIGlmICgvXlxcZFxcZCQvLnRlc3QodmFsKSkge1xuICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCB2YWwgKyBcIiAvIFwiKTtcbiAgfVxufTtcblxuZm9ybWF0Rm9yd2FyZFNsYXNoID0gZnVuY3Rpb24oZSkge1xuICB2YXIgc2xhc2gsIHRhcmdldCwgdmFsO1xuICBzbGFzaCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZS53aGljaCk7XG4gIGlmIChzbGFzaCAhPT0gJy8nKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRhcmdldCA9IGUudGFyZ2V0O1xuICB2YWwgPSBRSi52YWwodGFyZ2V0KTtcbiAgaWYgKC9eXFxkJC8udGVzdCh2YWwpICYmIHZhbCAhPT0gJzAnKSB7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIFwiMFwiICsgdmFsICsgXCIgLyBcIik7XG4gIH1cbn07XG5cbmZvcm1hdEJhY2tFeHBpcnkgPSBmdW5jdGlvbihlKSB7XG4gIHZhciB0YXJnZXQsIHZhbHVlO1xuICBpZiAoZS5tZXRhS2V5KSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRhcmdldCA9IGUudGFyZ2V0O1xuICB2YWx1ZSA9IFFKLnZhbCh0YXJnZXQpO1xuICBpZiAoZS53aGljaCAhPT0gOCkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoKHRhcmdldC5zZWxlY3Rpb25TdGFydCAhPSBudWxsKSAmJiB0YXJnZXQuc2VsZWN0aW9uU3RhcnQgIT09IHZhbHVlLmxlbmd0aCkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoL1xcZChcXHN8XFwvKSskLy50ZXN0KHZhbHVlKSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgdmFsdWUucmVwbGFjZSgvXFxkKFxcc3xcXC8pKiQvLCAnJykpO1xuICB9IGVsc2UgaWYgKC9cXHNcXC9cXHM/XFxkPyQvLnRlc3QodmFsdWUpKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCB2YWx1ZS5yZXBsYWNlKC9cXHNcXC9cXHM/XFxkPyQvLCAnJykpO1xuICB9XG59O1xuXG5yZXN0cmljdE51bWVyaWMgPSBmdW5jdGlvbihlKSB7XG4gIHZhciBpbnB1dDtcbiAgaWYgKGUubWV0YUtleSB8fCBlLmN0cmxLZXkpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAoZS53aGljaCA9PT0gMzIpIHtcbiAgICByZXR1cm4gZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG4gIGlmIChlLndoaWNoID09PSAwKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKGUud2hpY2ggPCAzMykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlucHV0ID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKTtcbiAgaWYgKCEvW1xcZFxcc10vLnRlc3QoaW5wdXQpKSB7XG4gICAgcmV0dXJuIGUucHJldmVudERlZmF1bHQoKTtcbiAgfVxufTtcblxucmVzdHJpY3RDYXJkTnVtYmVyID0gZnVuY3Rpb24oZSkge1xuICB2YXIgY2FyZCwgZGlnaXQsIHRhcmdldCwgdmFsdWU7XG4gIHRhcmdldCA9IGUudGFyZ2V0O1xuICBkaWdpdCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZS53aGljaCk7XG4gIGlmICghL15cXGQrJC8udGVzdChkaWdpdCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGhhc1RleHRTZWxlY3RlZCh0YXJnZXQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhbHVlID0gKFFKLnZhbCh0YXJnZXQpICsgZGlnaXQpLnJlcGxhY2UoL1xcRC9nLCAnJyk7XG4gIGNhcmQgPSBjYXJkRnJvbU51bWJlcih2YWx1ZSk7XG4gIGlmIChjYXJkKSB7XG4gICAgaWYgKCEodmFsdWUubGVuZ3RoIDw9IGNhcmQubGVuZ3RoW2NhcmQubGVuZ3RoLmxlbmd0aCAtIDFdKSkge1xuICAgICAgcmV0dXJuIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKCEodmFsdWUubGVuZ3RoIDw9IDE2KSkge1xuICAgICAgcmV0dXJuIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH1cbn07XG5cbnJlc3RyaWN0RXhwaXJ5ID0gZnVuY3Rpb24oZSwgbGVuZ3RoKSB7XG4gIHZhciBkaWdpdCwgdGFyZ2V0LCB2YWx1ZTtcbiAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gIGRpZ2l0ID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKTtcbiAgaWYgKCEvXlxcZCskLy50ZXN0KGRpZ2l0KSkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoaGFzVGV4dFNlbGVjdGVkKHRhcmdldCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFsdWUgPSBRSi52YWwodGFyZ2V0KSArIGRpZ2l0O1xuICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1xcRC9nLCAnJyk7XG4gIGlmICh2YWx1ZS5sZW5ndGggPiBsZW5ndGgpIHtcbiAgICByZXR1cm4gZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG59O1xuXG5yZXN0cmljdENvbWJpbmVkRXhwaXJ5ID0gZnVuY3Rpb24oZSkge1xuICByZXR1cm4gcmVzdHJpY3RFeHBpcnkoZSwgNik7XG59O1xuXG5yZXN0cmljdE1vbnRoRXhwaXJ5ID0gZnVuY3Rpb24oZSkge1xuICByZXR1cm4gcmVzdHJpY3RFeHBpcnkoZSwgMik7XG59O1xuXG5yZXN0cmljdFllYXJFeHBpcnkgPSBmdW5jdGlvbihlKSB7XG4gIHJldHVybiByZXN0cmljdEV4cGlyeShlLCA0KTtcbn07XG5cbnJlc3RyaWN0Q1ZDID0gZnVuY3Rpb24oZSkge1xuICB2YXIgZGlnaXQsIHRhcmdldCwgdmFsO1xuICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgZGlnaXQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpO1xuICBpZiAoIS9eXFxkKyQvLnRlc3QoZGlnaXQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChoYXNUZXh0U2VsZWN0ZWQodGFyZ2V0KSkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YWwgPSBRSi52YWwodGFyZ2V0KSArIGRpZ2l0O1xuICBpZiAoISh2YWwubGVuZ3RoIDw9IDQpKSB7XG4gICAgcmV0dXJuIGUucHJldmVudERlZmF1bHQoKTtcbiAgfVxufTtcblxuc2V0Q2FyZFR5cGUgPSBmdW5jdGlvbihlKSB7XG4gIHZhciBhbGxUeXBlcywgY2FyZCwgY2FyZFR5cGUsIHRhcmdldCwgdmFsO1xuICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgdmFsID0gUUoudmFsKHRhcmdldCk7XG4gIGNhcmRUeXBlID0gUGF5bWVudC5mbnMuY2FyZFR5cGUodmFsKSB8fCAndW5rbm93bic7XG4gIGlmICghUUouaGFzQ2xhc3ModGFyZ2V0LCBjYXJkVHlwZSkpIHtcbiAgICBhbGxUeXBlcyA9IChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBpLCBsZW4sIHJlc3VsdHM7XG4gICAgICByZXN1bHRzID0gW107XG4gICAgICBmb3IgKGkgPSAwLCBsZW4gPSBjYXJkcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBjYXJkID0gY2FyZHNbaV07XG4gICAgICAgIHJlc3VsdHMucHVzaChjYXJkLnR5cGUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfSkoKTtcbiAgICBRSi5yZW1vdmVDbGFzcyh0YXJnZXQsICd1bmtub3duJyk7XG4gICAgUUoucmVtb3ZlQ2xhc3ModGFyZ2V0LCBhbGxUeXBlcy5qb2luKCcgJykpO1xuICAgIFFKLmFkZENsYXNzKHRhcmdldCwgY2FyZFR5cGUpO1xuICAgIFFKLnRvZ2dsZUNsYXNzKHRhcmdldCwgJ2lkZW50aWZpZWQnLCBjYXJkVHlwZSAhPT0gJ3Vua25vd24nKTtcbiAgICByZXR1cm4gUUoudHJpZ2dlcih0YXJnZXQsICdwYXltZW50LmNhcmRUeXBlJywgY2FyZFR5cGUpO1xuICB9XG59O1xuXG5QYXltZW50ID0gKGZ1bmN0aW9uKCkge1xuICBmdW5jdGlvbiBQYXltZW50KCkge31cblxuICBQYXltZW50LmZucyA9IHtcbiAgICBjYXJkRXhwaXJ5VmFsOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgdmFyIG1vbnRoLCBwcmVmaXgsIHJlZiwgeWVhcjtcbiAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvXFxzL2csICcnKTtcbiAgICAgIHJlZiA9IHZhbHVlLnNwbGl0KCcvJywgMiksIG1vbnRoID0gcmVmWzBdLCB5ZWFyID0gcmVmWzFdO1xuICAgICAgaWYgKCh5ZWFyICE9IG51bGwgPyB5ZWFyLmxlbmd0aCA6IHZvaWQgMCkgPT09IDIgJiYgL15cXGQrJC8udGVzdCh5ZWFyKSkge1xuICAgICAgICBwcmVmaXggPSAobmV3IERhdGUpLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgIHByZWZpeCA9IHByZWZpeC50b1N0cmluZygpLnNsaWNlKDAsIDIpO1xuICAgICAgICB5ZWFyID0gcHJlZml4ICsgeWVhcjtcbiAgICAgIH1cbiAgICAgIG1vbnRoID0gcGFyc2VJbnQobW9udGgsIDEwKTtcbiAgICAgIHllYXIgPSBwYXJzZUludCh5ZWFyLCAxMCk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBtb250aDogbW9udGgsXG4gICAgICAgIHllYXI6IHllYXJcbiAgICAgIH07XG4gICAgfSxcbiAgICB2YWxpZGF0ZUNhcmROdW1iZXI6IGZ1bmN0aW9uKG51bSkge1xuICAgICAgdmFyIGNhcmQsIHJlZjtcbiAgICAgIG51bSA9IChudW0gKyAnJykucmVwbGFjZSgvXFxzK3wtL2csICcnKTtcbiAgICAgIGlmICghL15cXGQrJC8udGVzdChudW0pKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGNhcmQgPSBjYXJkRnJvbU51bWJlcihudW0pO1xuICAgICAgaWYgKCFjYXJkKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAocmVmID0gbnVtLmxlbmd0aCwgaW5kZXhPZi5jYWxsKGNhcmQubGVuZ3RoLCByZWYpID49IDApICYmIChjYXJkLmx1aG4gPT09IGZhbHNlIHx8IGx1aG5DaGVjayhudW0pKTtcbiAgICB9LFxuICAgIHZhbGlkYXRlQ2FyZEV4cGlyeTogZnVuY3Rpb24obW9udGgsIHllYXIpIHtcbiAgICAgIHZhciBjdXJyZW50VGltZSwgZXhwaXJ5LCBwcmVmaXgsIHJlZjtcbiAgICAgIGlmICh0eXBlb2YgbW9udGggPT09ICdvYmplY3QnICYmICdtb250aCcgaW4gbW9udGgpIHtcbiAgICAgICAgcmVmID0gbW9udGgsIG1vbnRoID0gcmVmLm1vbnRoLCB5ZWFyID0gcmVmLnllYXI7XG4gICAgICB9XG4gICAgICBpZiAoIShtb250aCAmJiB5ZWFyKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBtb250aCA9IFFKLnRyaW0obW9udGgpO1xuICAgICAgeWVhciA9IFFKLnRyaW0oeWVhcik7XG4gICAgICBpZiAoIS9eXFxkKyQvLnRlc3QobW9udGgpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICghL15cXGQrJC8udGVzdCh5ZWFyKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoIShwYXJzZUludChtb250aCwgMTApIDw9IDEyKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoeWVhci5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgcHJlZml4ID0gKG5ldyBEYXRlKS5nZXRGdWxsWWVhcigpO1xuICAgICAgICBwcmVmaXggPSBwcmVmaXgudG9TdHJpbmcoKS5zbGljZSgwLCAyKTtcbiAgICAgICAgeWVhciA9IHByZWZpeCArIHllYXI7XG4gICAgICB9XG4gICAgICBleHBpcnkgPSBuZXcgRGF0ZSh5ZWFyLCBtb250aCk7XG4gICAgICBjdXJyZW50VGltZSA9IG5ldyBEYXRlO1xuICAgICAgZXhwaXJ5LnNldE1vbnRoKGV4cGlyeS5nZXRNb250aCgpIC0gMSk7XG4gICAgICBleHBpcnkuc2V0TW9udGgoZXhwaXJ5LmdldE1vbnRoKCkgKyAxLCAxKTtcbiAgICAgIHJldHVybiBleHBpcnkgPiBjdXJyZW50VGltZTtcbiAgICB9LFxuICAgIHZhbGlkYXRlQ2FyZENWQzogZnVuY3Rpb24oY3ZjLCB0eXBlKSB7XG4gICAgICB2YXIgcmVmLCByZWYxO1xuICAgICAgY3ZjID0gUUoudHJpbShjdmMpO1xuICAgICAgaWYgKCEvXlxcZCskLy50ZXN0KGN2YykpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGUgJiYgY2FyZEZyb21UeXBlKHR5cGUpKSB7XG4gICAgICAgIHJldHVybiByZWYgPSBjdmMubGVuZ3RoLCBpbmRleE9mLmNhbGwoKHJlZjEgPSBjYXJkRnJvbVR5cGUodHlwZSkpICE9IG51bGwgPyByZWYxLmN2Y0xlbmd0aCA6IHZvaWQgMCwgcmVmKSA+PSAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGN2Yy5sZW5ndGggPj0gMyAmJiBjdmMubGVuZ3RoIDw9IDQ7XG4gICAgICB9XG4gICAgfSxcbiAgICBjYXJkVHlwZTogZnVuY3Rpb24obnVtKSB7XG4gICAgICB2YXIgcmVmO1xuICAgICAgaWYgKCFudW0pIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICByZXR1cm4gKChyZWYgPSBjYXJkRnJvbU51bWJlcihudW0pKSAhPSBudWxsID8gcmVmLnR5cGUgOiB2b2lkIDApIHx8IG51bGw7XG4gICAgfSxcbiAgICBmb3JtYXRDYXJkTnVtYmVyOiBmdW5jdGlvbihudW0pIHtcbiAgICAgIHZhciBjYXJkLCBncm91cHMsIHJlZiwgdXBwZXJMZW5ndGg7XG4gICAgICBjYXJkID0gY2FyZEZyb21OdW1iZXIobnVtKTtcbiAgICAgIGlmICghY2FyZCkge1xuICAgICAgICByZXR1cm4gbnVtO1xuICAgICAgfVxuICAgICAgdXBwZXJMZW5ndGggPSBjYXJkLmxlbmd0aFtjYXJkLmxlbmd0aC5sZW5ndGggLSAxXTtcbiAgICAgIG51bSA9IG51bS5yZXBsYWNlKC9cXEQvZywgJycpO1xuICAgICAgbnVtID0gbnVtLnNsaWNlKDAsICt1cHBlckxlbmd0aCArIDEgfHwgOWU5KTtcbiAgICAgIGlmIChjYXJkLmZvcm1hdC5nbG9iYWwpIHtcbiAgICAgICAgcmV0dXJuIChyZWYgPSBudW0ubWF0Y2goY2FyZC5mb3JtYXQpKSAhPSBudWxsID8gcmVmLmpvaW4oJyAnKSA6IHZvaWQgMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGdyb3VwcyA9IGNhcmQuZm9ybWF0LmV4ZWMobnVtKTtcbiAgICAgICAgaWYgKGdyb3VwcyAhPSBudWxsKSB7XG4gICAgICAgICAgZ3JvdXBzLnNoaWZ0KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGdyb3VwcyAhPSBudWxsID8gZ3JvdXBzLmpvaW4oJyAnKSA6IHZvaWQgMDtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgUGF5bWVudC5yZXN0cmljdE51bWVyaWMgPSBmdW5jdGlvbihlbCkge1xuICAgIHJldHVybiBRSi5vbihlbCwgJ2tleXByZXNzJywgcmVzdHJpY3ROdW1lcmljKTtcbiAgfTtcblxuICBQYXltZW50LmNhcmRFeHBpcnlWYWwgPSBmdW5jdGlvbihlbCkge1xuICAgIHJldHVybiBQYXltZW50LmZucy5jYXJkRXhwaXJ5VmFsKFFKLnZhbChlbCkpO1xuICB9O1xuXG4gIFBheW1lbnQuZm9ybWF0Q2FyZENWQyA9IGZ1bmN0aW9uKGVsKSB7XG4gICAgUGF5bWVudC5yZXN0cmljdE51bWVyaWMoZWwpO1xuICAgIFFKLm9uKGVsLCAna2V5cHJlc3MnLCByZXN0cmljdENWQyk7XG4gICAgcmV0dXJuIGVsO1xuICB9O1xuXG4gIFBheW1lbnQuZm9ybWF0Q2FyZEV4cGlyeSA9IGZ1bmN0aW9uKGVsKSB7XG4gICAgdmFyIG1vbnRoLCB5ZWFyO1xuICAgIFBheW1lbnQucmVzdHJpY3ROdW1lcmljKGVsKTtcbiAgICBpZiAoZWwubGVuZ3RoICYmIGVsLmxlbmd0aCA9PT0gMikge1xuICAgICAgbW9udGggPSBlbFswXSwgeWVhciA9IGVsWzFdO1xuICAgICAgdGhpcy5mb3JtYXRDYXJkRXhwaXJ5TXVsdGlwbGUobW9udGgsIHllYXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBRSi5vbihlbCwgJ2tleXByZXNzJywgcmVzdHJpY3RDb21iaW5lZEV4cGlyeSk7XG4gICAgICBRSi5vbihlbCwgJ2tleXByZXNzJywgZm9ybWF0RXhwaXJ5KTtcbiAgICAgIFFKLm9uKGVsLCAna2V5cHJlc3MnLCBmb3JtYXRGb3J3YXJkU2xhc2gpO1xuICAgICAgUUoub24oZWwsICdrZXlwcmVzcycsIGZvcm1hdEZvcndhcmRFeHBpcnkpO1xuICAgICAgUUoub24oZWwsICdrZXlkb3duJywgZm9ybWF0QmFja0V4cGlyeSk7XG4gICAgfVxuICAgIHJldHVybiBlbDtcbiAgfTtcblxuICBQYXltZW50LmZvcm1hdENhcmRFeHBpcnlNdWx0aXBsZSA9IGZ1bmN0aW9uKG1vbnRoLCB5ZWFyKSB7XG4gICAgUUoub24obW9udGgsICdrZXlwcmVzcycsIHJlc3RyaWN0TW9udGhFeHBpcnkpO1xuICAgIFFKLm9uKG1vbnRoLCAna2V5cHJlc3MnLCBmb3JtYXRNb250aEV4cGlyeSk7XG4gICAgcmV0dXJuIFFKLm9uKHllYXIsICdrZXlwcmVzcycsIHJlc3RyaWN0WWVhckV4cGlyeSk7XG4gIH07XG5cbiAgUGF5bWVudC5mb3JtYXRDYXJkTnVtYmVyID0gZnVuY3Rpb24oZWwpIHtcbiAgICBQYXltZW50LnJlc3RyaWN0TnVtZXJpYyhlbCk7XG4gICAgUUoub24oZWwsICdrZXlwcmVzcycsIHJlc3RyaWN0Q2FyZE51bWJlcik7XG4gICAgUUoub24oZWwsICdrZXlwcmVzcycsIGZvcm1hdENhcmROdW1iZXIpO1xuICAgIFFKLm9uKGVsLCAna2V5ZG93bicsIGZvcm1hdEJhY2tDYXJkTnVtYmVyKTtcbiAgICBRSi5vbihlbCwgJ2tleXVwJywgc2V0Q2FyZFR5cGUpO1xuICAgIFFKLm9uKGVsLCAncGFzdGUnLCByZUZvcm1hdENhcmROdW1iZXIpO1xuICAgIHJldHVybiBlbDtcbiAgfTtcblxuICBQYXltZW50LmdldENhcmRBcnJheSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBjYXJkcztcbiAgfTtcblxuICBQYXltZW50LnNldENhcmRBcnJheSA9IGZ1bmN0aW9uKGNhcmRBcnJheSkge1xuICAgIGNhcmRzID0gY2FyZEFycmF5O1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIFBheW1lbnQuYWRkVG9DYXJkQXJyYXkgPSBmdW5jdGlvbihjYXJkT2JqZWN0KSB7XG4gICAgcmV0dXJuIGNhcmRzLnB1c2goY2FyZE9iamVjdCk7XG4gIH07XG5cbiAgUGF5bWVudC5yZW1vdmVGcm9tQ2FyZEFycmF5ID0gZnVuY3Rpb24odHlwZSkge1xuICAgIHZhciBrZXksIHZhbHVlO1xuICAgIGZvciAoa2V5IGluIGNhcmRzKSB7XG4gICAgICB2YWx1ZSA9IGNhcmRzW2tleV07XG4gICAgICBpZiAodmFsdWUudHlwZSA9PT0gdHlwZSkge1xuICAgICAgICBjYXJkcy5zcGxpY2Uoa2V5LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgcmV0dXJuIFBheW1lbnQ7XG5cbn0pKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gUGF5bWVudDtcblxuZ2xvYmFsLlBheW1lbnQgPSBQYXltZW50O1xuXG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxufSx7XCJxai9zcmMvcWouY29mZmVlXCI6MX1dfSx7fSxbMl0pKDIpXG59KTsiLCIvLyBNaW5uUG9zdCBHaXZpbmcgcGx1Z2luXG4vLyB0aGUgc2VtaS1jb2xvbiBiZWZvcmUgZnVuY3Rpb24gaW52b2NhdGlvbiBpcyBhIHNhZmV0eSBuZXQgYWdhaW5zdCBjb25jYXRlbmF0ZWRcbi8vIHNjcmlwdHMgYW5kL29yIG90aGVyIHBsdWdpbnMgd2hpY2ggbWF5IG5vdCBiZSBjbG9zZWQgcHJvcGVybHkuXG47KGZ1bmN0aW9uICggJCwgd2luZG93LCBkb2N1bWVudCwgdW5kZWZpbmVkICkge1xuXG4gIC8vIHVuZGVmaW5lZCBpcyB1c2VkIGhlcmUgYXMgdGhlIHVuZGVmaW5lZCBnbG9iYWwgdmFyaWFibGUgaW4gRUNNQVNjcmlwdCAzIGlzXG4gIC8vIG11dGFibGUgKGllLiBpdCBjYW4gYmUgY2hhbmdlZCBieSBzb21lb25lIGVsc2UpLiB1bmRlZmluZWQgaXNuJ3QgcmVhbGx5IGJlaW5nXG4gIC8vIHBhc3NlZCBpbiBzbyB3ZSBjYW4gZW5zdXJlIHRoZSB2YWx1ZSBvZiBpdCBpcyB0cnVseSB1bmRlZmluZWQuIEluIEVTNSwgdW5kZWZpbmVkXG4gIC8vIGNhbiBubyBsb25nZXIgYmUgbW9kaWZpZWQuXG5cbiAgLy8gd2luZG93IGFuZCBkb2N1bWVudCBhcmUgcGFzc2VkIHRocm91Z2ggYXMgbG9jYWwgdmFyaWFibGUgcmF0aGVyIHRoYW4gZ2xvYmFsXG4gIC8vIGFzIHRoaXMgKHNsaWdodGx5KSBxdWlja2VucyB0aGUgcmVzb2x1dGlvbiBwcm9jZXNzIGFuZCBjYW4gYmUgbW9yZSBlZmZpY2llbnRseVxuICAvLyBtaW5pZmllZCAoZXNwZWNpYWxseSB3aGVuIGJvdGggYXJlIHJlZ3VsYXJseSByZWZlcmVuY2VkIGluIHlvdXIgcGx1Z2luKS5cblxuICAvLyBDcmVhdGUgdGhlIGRlZmF1bHRzIG9uY2VcbiAgdmFyIHBsdWdpbk5hbWUgPSAnbWlubnBvc3RfZ2l2aW5nJyxcbiAgZGVmYXVsdHMgPSB7XG4gICAgJ2RlYnVnJyA6IGZhbHNlLCAvLyB0aGlzIGNhbiBiZSBzZXQgdG8gdHJ1ZSBvbiBwYWdlIGxldmVsIG9wdGlvbnNcbiAgICAnc3RyaXBlX3B1Ymxpc2hhYmxlX2tleScgOiAnJyxcbiAgICAncGxhaWRfZW52JyA6ICcnLFxuICAgICdwbGFpZF9wdWJsaWNfa2V5JyA6ICcnLFxuICAgICdwbGFpZF9saW5rJyA6ICcjYXV0aG9yaXplLWFjaCcsXG4gICAgJ21pbm5wb3N0X3Jvb3QnIDogJ2h0dHBzOi8vd3d3Lm1pbm5wb3N0LmNvbScsXG4gICAgJ2RvbmF0ZV9mb3JtX3NlbGVjdG9yJzogJyNkb25hdGUnLFxuICAgICdkb25hdGVfc3RlcF9zZWxlY3RvcicgOiAnI3BhbmVsLS1wYXknLFxuICAgICdjb25maXJtX2Zvcm1fc2VsZWN0b3InIDogJyNjb25maXJtJyxcbiAgICAnY29uZmlybV9zdGVwX3NlbGVjdG9yJyA6ICcjcGFuZWwtLWNvbmZpcm1hdGlvbicsXG4gICAgJ2FjdGl2ZScgOiAncGFuZWwtLXBheScsXG4gICAgJ2NvbmZpcm0nIDogJ3BhbmVsLS1jb25maXJtYXRpb24nLFxuICAgICdxdWVyeScgOiAnc3RlcCcsXG4gICAgJ3BheV9jY19wcm9jZXNzaW5nX3NlbGVjdG9yJyA6ICdpbnB1dFtpZD1cImVkaXQtcGF5LWZlZXNcIl0nLFxuICAgICdmZWVfYW1vdW50JyA6ICcucHJvY2Vzc2luZy1hbW91bnQnLFxuICAgICdsZXZlbF9hbW91bnRfc2VsZWN0b3InIDogJyNwYW5lbC0tcGF5IC5hbW91bnQgLmxldmVsLWFtb3VudCcsXG4gICAgJ29yaWdpbmFsX2Ftb3VudF9zZWxlY3RvcicgOiAnI2Ftb3VudCcsXG4gICAgJ2ZyZXF1ZW5jeV9zZWxlY3RvcicgOiAnLmZyZXF1ZW5jeScsXG4gICAgJ2Z1bGxfYW1vdW50X3NlbGVjdG9yJyA6ICcuZnVsbC1hbW91bnQnLFxuICAgICd1cGRhdGVfYW1vdW50X3NlbGVjdG9yJyA6ICcjbmV3LWFtb3VudCcsXG4gICAgJ2xldmVsX2luZGljYXRvcl9zZWxlY3RvcicgOiAnaDIubGV2ZWwnLFxuICAgICdsZXZlbF9uYW1lX3NlbGVjdG9yJyA6ICcubGV2ZWwtbmFtZScsXG4gICAgJ25hbWVfc2VsZWN0b3InIDogJy5mb3JtLWl0ZW0tLWRpc3BsYXktbmFtZScsXG4gICAgJ2luX2hvbm9yX29yX21lbW9yeV9maWVsZF9zZWxlY3RvcicgOiAnLmZvcm0taXRlbS0taG9ub3ItbWVtb3J5JyxcbiAgICAnaG9ub3Jfb3JfbWVtb3J5X2Nob29zZXInIDogJ2lucHV0W25hbWU9XCJpbl9ob25vcl9vcl9tZW1vcnlcIl0nLCAvLyByYWRpbyBmaWVsZHNcbiAgICAnaG9ub3JfdHlwZV9zZWxlY3RvcicgOiAnLmhvbm9yX3R5cGUnLCAvLyBzcGFuIGluc2lkZSBsYWJlbFxuICAgICdob25vcl9tZW1vcnlfaW5wdXRfZ3JvdXAnIDogJy5ob25vci1vci1tZW1vcnknLCAvLyBob2xkcyB0aGUgZm9ybSBmaWVsZFxuICAgICdub3RpZnlfc2VsZWN0b3InIDogJy5ub3RpZnlfc29tZW9uZScsXG4gICAgJ25vdGlmeV9maWVsZF9zZWxlY3RvcicgOiAnLmZvcm0taXRlbS0tbm90aWZ5JyxcbiAgICAnYW5vbnltb3VzX3NlbGVjdG9yJyA6ICcjYW5vbnltb3VzJyxcbiAgICAnc2hvd19iaWxsaW5nX2NvdW50cnlfc2VsZWN0b3InIDogJyNiaWxsaW5nX3Nob3dfY291bnRyeScsXG4gICAgJ2JpbGxpbmdfY291bnRyeV9zZWxlY3RvcicgOiAnLmZvcm0taXRlbS0tY291bnRyeScsXG4gICAgJ3Nob3dfc2hpcHBpbmdfY291bnRyeV9zZWxlY3RvcicgOiAnI3NoaXBwaW5nX3Nob3dfY291bnRyeScsXG4gICAgJ3NoaXBwaW5nX2NvdW50cnlfc2VsZWN0b3InIDogJy5mb3JtLWl0ZW0tLXNoaXBwaW5nLWNvdW50cnknLFxuICAgICdzaGlwcGluZ19hZGRyZXNzX3NlbGVjdG9yJyA6ICcuZm9ybS1pdGVtLS1zaGlwcGluZy1hZGRyZXNzJyxcbiAgICAndXNlX2Zvcl9zaGlwcGluZ19zZWxlY3RvcicgOiAnI3VzZWZvcnNoaXBwaW5nJyxcbiAgICAnZW1haWxfZmllbGRfc2VsZWN0b3InIDogJyNlbWFpbCcsXG4gICAgJ3Bhc3N3b3JkX2ZpZWxkX3NlbGVjdG9yJyA6ICcjcGFzc3dvcmQnLFxuICAgICdmaXJzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yJyA6ICcjZmlyc3RfbmFtZScsXG4gICAgJ2xhc3RfbmFtZV9maWVsZF9zZWxlY3RvcicgOiAnI2xhc3RfbmFtZScsXG4gICAgJ2FjY291bnRfY2l0eV9zZWxlY3RvcicgOiAnI2JpbGxpbmdfY2l0eScsXG4gICAgJ2FjY291bnRfc3RhdGVfc2VsZWN0b3InIDogJyNiaWxsaW5nX3N0YXRlJyxcbiAgICAnYWNjb3VudF96aXBfc2VsZWN0b3InIDogJyNiaWxsaW5nX3ppcCcsXG4gICAgJ2NyZWF0ZV9tcF9zZWxlY3RvcicgOiAnI2NyZWF0ZW1wYWNjb3VudCcsXG4gICAgJ3Bhc3N3b3JkX3NlbGVjdG9yJyA6ICcuZm9ybS1pdGVtLS1wYXNzd29yZCcsXG4gICAgJ2FkZGl0aW9uYWxfYW1vdW50X2ZpZWxkJyA6ICcjYWRkaXRpb25hbF9kb25hdGlvbicsXG4gICAgJ2FkZGl0aW9uYWxfYW1vdW50X3NlbGVjdG9yJyA6ICcuYWRkaXRpb25hbF9kb25hdGlvbicsXG4gICAgJ2hhc19hZGRpdGlvbmFsX3RleHRfc2VsZWN0b3InIDogJy5oYXNfYWRkaXRpb25hbCcsXG4gICAgJ2JpbGxpbmdfc2VsZWN0b3InIDogJ2ZpZWxkc2V0LmJpbGxpbmcnLFxuICAgICdzaGlwcGluZ19zZWxlY3RvcicgOiAnZmllbGRzZXQuc2hpcHBpbmcnLFxuICAgICdjcmVkaXRfY2FyZF9maWVsZHNldCcgOiAnLnBheW1lbnQtbWV0aG9kLWdyb3VwJyxcbiAgICAnY2hvb3NlX3BheW1lbnQnIDogJyNjaG9vc2UtcGF5bWVudC1tZXRob2QnLFxuICAgICdwYXltZW50X21ldGhvZF9zZWxlY3RvcicgOiAnLnBheW1lbnQtbWV0aG9kJyxcbiAgICAnY2NfbnVtX3NlbGVjdG9yJyA6ICcjY2FyZC1udW1iZXInLFxuICAgICdjY19leHBfc2VsZWN0b3InIDogJyNjYXJkLWV4cGlyeScsXG4gICAgJ2NjX2N2dl9zZWxlY3RvcicgOiAnI2NhcmQtY3ZjJyxcbiAgICAncGF5bWVudF9idXR0b25fc2VsZWN0b3InIDogJyNzdWJtaXQnLFxuICAgICdjb25maXJtX2J1dHRvbl9zZWxlY3RvcicgOiAnI2ZpbmlzaCcsXG4gICAgJ29wcF9pZF9zZWxlY3RvcicgOiAnI2ZsYXNrX2lkJyxcbiAgICAncmVjdXJyaW5nX3NlbGVjdG9yJyA6ICcjcmVjdXJyaW5nJyxcbiAgICAnbmV3c2xldHRlcl9ncm91cF9zZWxlY3RvcicgOiAnLnN1cHBvcnQtbmV3c2xldHRlcnMnLFxuICAgICdyZWFzb25fZmllbGRfc2VsZWN0b3InIDogJyNyZWFzb25fZm9yX3N1cHBvcnRpbmcnLFxuICAgICdzaGFyZV9yZWFzb25fc2VsZWN0b3InIDogJyNyZWFzb25fc2hhcmVhYmxlJyxcbiAgICAnY29uZmlybV90b3Bfc2VsZWN0b3InIDogJy5zdXBwb3J0LS1wb3N0LWNvbmZpcm0nLFxuICAgICdleGlzdGluZ19uZXdzbGV0dGVyX3NldHRpbmdzJyA6ICcnLFxuICAgICdsZXZlbHMnIDoge1xuICAgICAgMSA6IHtcbiAgICAgICAgJ25hbWUnIDogJ2Jyb256ZScsXG4gICAgICAgICdtYXgnIDogNjBcbiAgICAgIH0sXG4gICAgICAyIDoge1xuICAgICAgICAnbmFtZScgOiAnc2lsdmVyJyxcbiAgICAgICAgJ21pbicgOiA2MCxcbiAgICAgICAgJ21heCcgOiAxMjBcbiAgICAgIH0sXG4gICAgICAzIDoge1xuICAgICAgICAnbmFtZScgOiAnZ29sZCcsXG4gICAgICAgICdtaW4nIDogMTIwLFxuICAgICAgICAnbWF4JyA6IDI0MFxuICAgICAgfSxcbiAgICAgIDQgOiB7XG4gICAgICAgICduYW1lJyA6ICdwbGF0aW51bScsXG4gICAgICAgICdtaW4nIDogMjQwXG4gICAgICB9XG4gICAgfVxuXG4gIH07IC8vIGVuZCBkZWZhdWx0c1xuXG4gIC8vIFRoZSBhY3R1YWwgcGx1Z2luIGNvbnN0cnVjdG9yXG4gIGZ1bmN0aW9uIFBsdWdpbiggZWxlbWVudCwgb3B0aW9ucyApIHtcblxuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG5cbiAgICAvLyBqUXVlcnkgaGFzIGFuIGV4dGVuZCBtZXRob2Qgd2hpY2ggbWVyZ2VzIHRoZSBjb250ZW50cyBvZiB0d28gb3JcbiAgICAvLyBtb3JlIG9iamVjdHMsIHN0b3JpbmcgdGhlIHJlc3VsdCBpbiB0aGUgZmlyc3Qgb2JqZWN0LiBUaGUgZmlyc3Qgb2JqZWN0XG4gICAgLy8gaXMgZ2VuZXJhbGx5IGVtcHR5IGFzIHdlIGRvbid0IHdhbnQgdG8gYWx0ZXIgdGhlIGRlZmF1bHQgb3B0aW9ucyBmb3JcbiAgICAvLyBmdXR1cmUgaW5zdGFuY2VzIG9mIHRoZSBwbHVnaW5cbiAgICB0aGlzLm9wdGlvbnMgPSAkLmV4dGVuZCgge30sIGRlZmF1bHRzLCBvcHRpb25zICk7XG5cbiAgICB0aGlzLl9kZWZhdWx0cyA9IGRlZmF1bHRzO1xuICAgIHRoaXMuX25hbWUgPSBwbHVnaW5OYW1lO1xuXG4gICAgdGhpcy5pbml0KCk7XG4gIH0gLy8gZW5kIGNvbnN0cnVjdG9yXG5cbiAgUGx1Z2luLnByb3RvdHlwZSA9IHtcblxuICAgIGluaXQ6IGZ1bmN0aW9uKHJlc2V0LCBhbW91bnQpIHtcblxuICAgICAgLy8gUGxhY2UgaW5pdGlhbGl6YXRpb24gbG9naWMgaGVyZVxuICAgICAgLy8gWW91IGFscmVhZHkgaGF2ZSBhY2Nlc3MgdG8gdGhlIERPTSBlbGVtZW50IGFuZFxuICAgICAgLy8gdGhlIG9wdGlvbnMgdmlhIHRoZSBpbnN0YW5jZSwgZS5nLiB0aGlzLmVsZW1lbnRcbiAgICAgIC8vIGFuZCB0aGlzLm9wdGlvbnNcbiAgICAgIC8vIHlvdSBjYW4gYWRkIG1vcmUgZnVuY3Rpb25zIGxpa2UgdGhlIG9uZSBiZWxvdyBhbmRcbiAgICAgIC8vIGNhbGwgdGhlbSBsaWtlIHNvOiB0aGlzLnlvdXJPdGhlckZ1bmN0aW9uKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKS5cblxuICAgICAgLy8gbW9kaWZ5IG9wdGlvbnMgYXMgbmVlZGVkXG4gICAgICAvL3ZhciB0aGlzLm9wdGlvbnMuYW1vdW50ID0gJyc7XG4gICAgICBpZiAocmVzZXQgIT09IHRydWUpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLmFtb3VudCA9IHBhcnNlRmxvYXQoJCh0aGlzLm9wdGlvbnMubGV2ZWxfYW1vdW50X3NlbGVjdG9yLCB0aGlzLmVsZW1lbnQpLnRleHQoKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm9wdGlvbnMuYW1vdW50ID0gYW1vdW50O1xuICAgICAgfVxuICAgICAgdGhpcy5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCA9IHBhcnNlSW50KCQodGhpcy5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudF9zZWxlY3RvciwgdGhpcy5lbGVtZW50KS52YWwoKSwgMTApO1xuICAgICAgdGhpcy5vcHRpb25zLmZyZXF1ZW5jeSA9IHBhcnNlRmxvYXQoJCh0aGlzLm9wdGlvbnMuZnJlcXVlbmN5X3NlbGVjdG9yLCB0aGlzLmVsZW1lbnQpLmF0dHIoJ2RhdGEteWVhci1mcmVxJykpO1xuICAgICAgdmFyIHJlY3VycmluZyA9ICQodGhpcy5vcHRpb25zLnJlY3VycmluZ19zZWxlY3RvciwgdGhpcy5lbGVtZW50KS52YWwoKTtcbiAgICAgIGlmICh0eXBlb2YgcmVjdXJyaW5nICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aGlzLm9wdGlvbnMucmVjdXJyaW5nID0gcmVjdXJyaW5nLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgcmVjdXJyaW5nLnNsaWNlKDEpO1xuICAgICAgfVxuICAgICAgXG4gICAgICB0aGlzLm9wdGlvbnMucHJvY2Vzc2luZ19mZWUgPSAoTWF0aC5yb3VuZChwYXJzZUZsb2F0KHRoaXMub3B0aW9ucy5mZWVfYW1vdW50KSpNYXRoLnBvdygxMCwyKSkvTWF0aC5wb3coMTAsMikpLnRvRml4ZWQoMik7XG4gICAgICB0aGlzLm9wdGlvbnMucHJvY2Vzc2luZ19mZWVfdGV4dCA9IHRoaXMub3B0aW9ucy5wcm9jZXNzaW5nX2ZlZTtcbiAgICAgIFxuICAgICAgdGhpcy5vcHRpb25zLmNhcmRUeXBlID0gbnVsbDtcbiAgICAgIHRoaXMub3B0aW9ucy5jcmVhdGVfYWNjb3VudCA9IGZhbHNlO1xuXG4gICAgICB2YXIgYnV0dG9uX3RleHQgPSAkKCdidXR0b24uZ2l2ZSwgaW5wdXQuZ2l2ZScpLnRleHQoKTtcbiAgICAgIHRoaXMub3B0aW9ucy5idXR0b25fdGV4dCA9IGJ1dHRvbl90ZXh0O1xuXG4gICAgICB0aGlzLnN0cmlwZSA9IFN0cmlwZSh0aGlzLm9wdGlvbnMuc3RyaXBlX3B1Ymxpc2hhYmxlX2tleSk7XG4gICAgICB0aGlzLmVsZW1lbnRzID0gdGhpcy5zdHJpcGUuZWxlbWVudHMoKTtcblxuICAgICAgLy8gdXNlIGEgcmVmZXJyZXIgZm9yIGVkaXQgbGluayBpZiB3ZSBoYXZlIG9uZVxuICAgICAgaWYgKGRvY3VtZW50LnJlZmVycmVyICE9PSAnJykge1xuICAgICAgICAkKCcjZWRpdF91cmwnKS5wcm9wKCdocmVmJywgZG9jdW1lbnQucmVmZXJyZXIpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5vcHRpb25zLmRlYnVnID09PSB0cnVlKSB7XG4gICAgICAgIHRoaXMuZGVidWcodGhpcy5vcHRpb25zKTtcbiAgICAgICAgLy8gcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyB0YWIgc3R1ZmZcbiAgICAgIHZhciBxdWVyeV9wYW5lbCA9IHRoaXMucXNbdGhpcy5vcHRpb25zLnF1ZXJ5XTtcbiAgICAgIGlmICh0eXBlb2YgcXVlcnlfcGFuZWwgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHF1ZXJ5X3BhbmVsID0gdGhpcy5vcHRpb25zLmFjdGl2ZTtcbiAgICAgIH1cblxuICAgICAgLy8gY2FsbCBmdW5jdGlvbnNcblxuICAgICAgdGhpcy50YWJOYXZpZ2F0aW9uKHF1ZXJ5X3BhbmVsKTsgLy8gbmF2aWdhdGluZ1xuXG4gICAgICB0aGlzLmFtb3VudEFzUmFkaW8odGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBpZiB0aGUgYW1vdW50IGZpZWxkIGlzIGEgcmFkaW8gYnV0dG9uXG4gICAgICB0aGlzLmFtb3VudFVwZGF0ZWQodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBpZiB0aGUgYW1vdW50IHRleHQgZmllbGQgY2FuIGNoYW5nZVxuXG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMucGF5X2NjX3Byb2Nlc3Npbmdfc2VsZWN0b3IpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5jcmVkaXRDYXJkUHJvY2Vzc2luZ0ZlZXModGhpcy5vcHRpb25zLCByZXNldCk7IC8vIHByb2Nlc3NpbmcgZmVlc1xuICAgICAgfVxuICAgICAgXG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuZG9uYXRlX3N0ZXBfc2VsZWN0b3IpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLmxldmVsID0gdGhpcy5jaGVja0xldmVsKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zLCAnbmFtZScpOyAvLyBjaGVjayB3aGF0IGxldmVsIGl0IGlzXG4gICAgICAgIHRoaXMub3B0aW9ucy5sZXZlbG51bSA9IHRoaXMuY2hlY2tMZXZlbCh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucywgJ251bScpOyAvLyBjaGVjayB3aGF0IGxldmVsIGl0IGlzIGFzIGEgbnVtYmVyXG4gICAgICAgIHRoaXMuZG9uYXRlQW5vbnltb3VzbHkodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBhbm9ueW1vdXNcbiAgICAgICAgdGhpcy5ob25vck9yTWVtb3J5VG9nZ2xlKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gaW4gaG9ub3Igb3IgaW4gbWVtb3J5IG9mIHNvbWVvbmVcbiAgICAgICAgdGhpcy5vdXRzaWRlVW5pdGVkU3RhdGVzKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gb3V0c2lkZSBVU1xuICAgICAgICB0aGlzLnNoaXBwaW5nQWRkcmVzcyh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIHNoaXBwaW5nIGFkZHJlc3NcbiAgICAgICAgdGhpcy5hbGxvd01pbm5wb3N0QWNjb3VudCh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucywgZmFsc2UpOyAvLyBvcHRpb24gZm9yIGNyZWF0aW5nIG1pbm5wb3N0IGFjY291bnRcbiAgICAgICAgdGhpcy5jaG9vc2VQYXltZW50TWV0aG9kKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gc3dpdGNoIGJldHdlZW4gY2FyZCBhbmQgYWNoXG4gICAgICAgIHRoaXMuY3JlZGl0Q2FyZEZpZWxkcyh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIGRvIHN0dWZmIHdpdGggdGhlIGNyZWRpdCBjYXJkIGZpZWxkc1xuICAgICAgICB0aGlzLmFjaEZpZWxkcyh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIGRvIHN0dWZmIGZvciBhY2ggcGF5bWVudHMsIGlmIGFwcGxpY2FibGUgdG8gdGhlIGZvcm1cbiAgICAgICAgdGhpcy52YWxpZGF0ZUFuZFN1Ym1pdCh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIHZhbGlkYXRlIGFuZCBzdWJtaXQgdGhlIGZvcm1cbiAgICAgIH1cblxuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmNvbmZpcm1fc3RlcF9zZWxlY3RvcikubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLnNob3dOZXdzbGV0dGVyU2V0dGluZ3ModGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpO1xuICAgICAgICB0aGlzLmNvbmZpcm1NZXNzYWdlU3VibWl0KHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gc3VibWl0IHRoZSBzdHVmZiBvbiB0aGUgY29uZmlybWF0aW9uIHBhZ2VcbiAgICAgIH1cblxuICAgIH0sIC8vIGluaXRcblxuICAgIHFzOiAoZnVuY3Rpb24oYSkge1xuICAgICAgaWYgKGEgPT09ICcnKSB7XG4gICAgICAgIHJldHVybiB7fTtcbiAgICAgIH1cbiAgICAgIHZhciBiID0ge307XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGEubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIHA9YVtpXS5zcGxpdCgnPScsIDIpO1xuICAgICAgICBpZiAocC5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICBiW3BbMF1dID0gJyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYltwWzBdXSA9IGRlY29kZVVSSUNvbXBvbmVudChwWzFdLnJlcGxhY2UoL1xcKy9nLCAnICcpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGI7XG4gICAgfSkod2luZG93LmxvY2F0aW9uLnNlYXJjaC5zdWJzdHIoMSkuc3BsaXQoJyYnKSksXG5cbiAgICBkZWJ1ZzogZnVuY3Rpb24obWVzc2FnZSkge1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5kZWJ1ZyA9PT0gdHJ1ZSkge1xuICAgICAgICBpZiAodHlwZW9mIG1lc3NhZ2UgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgY29uc29sZS5sb2cobWVzc2FnZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5kaXIobWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5kaXIodGhpcyk7XG4gICAgICB9XG4gICAgfSwgLy8gZGVidWdcblxuICAgIGdldFF1ZXJ5U3RyaW5nczogZnVuY3Rpb24obGluaykge1xuICAgICAgaWYgKHR5cGVvZiBsaW5rID09PSAndW5kZWZpbmVkJyB8fCBsaW5rID09PSAnJykge1xuICAgICAgICByZXR1cm4ge307XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsaW5rID0gJz8nICsgbGluay5zcGxpdCgnPycpWzFdO1xuICAgICAgICBsaW5rID0gbGluay5zdWJzdHIoMSkuc3BsaXQoJyYnKTtcbiAgICAgIH1cbiAgICAgIHZhciBiID0ge307XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpbmsubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIHA9bGlua1tpXS5zcGxpdCgnPScsIDIpO1xuICAgICAgICBpZiAocC5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICBiW3BbMF1dID0gJyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYltwWzBdXSA9IGRlY29kZVVSSUNvbXBvbmVudChwWzFdLnJlcGxhY2UoL1xcKy9nLCAnICcpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGI7XG4gICAgfSwgLy8gZ2V0UXVlcnlTdHJpbmdzXG5cbiAgICB0YWJOYXZpZ2F0aW9uOiBmdW5jdGlvbihhY3RpdmUpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHZhciB0aXRsZSA9ICdNaW5uUG9zdCB8IFN1cHBvcnQgVXMgfCAnO1xuICAgICAgdmFyIHBhZ2UgPSAkKCcucHJvZ3Jlc3MtLWRvbmF0aW9uIGxpLicgKyBhY3RpdmUpLnRleHQoKTtcbiAgICAgIHZhciBuZXh0ID0gJCgnLnByb2dyZXNzLS1kb25hdGlvbiBsaS4nICsgYWN0aXZlKS5uZXh0KCkudGV4dCgpO1xuICAgICAgdmFyIHN0ZXAgPSAkKCcucHJvZ3Jlc3MtLWRvbmF0aW9uIGxpLicgKyBhY3RpdmUpLmluZGV4KCkgKyAxO1xuICAgICAgdmFyIG5hdl9pdGVtX2NvdW50ID0gJCgnLnByb2dyZXNzLS1kb25hdGlvbiBsaScpLmxlbmd0aDtcbiAgICAgIHZhciBvcHBfaWQgPSAkKHRoaXMub3B0aW9ucy5vcHBfaWRfc2VsZWN0b3IpLnZhbCgpO1xuICAgICAgdmFyIG5leHRfc3RlcCA9IHN0ZXAgKyAxO1xuICAgICAgdmFyIHBvc3RfcHVyY2hhc2UgPSBmYWxzZTtcblxuICAgICAgLy8gd2Ugd2lsbCBoYXZlIHRvIHVwZGF0ZSB0aGlzIGJlY2F1c2Ugbm8gbW9yZSBmbGFzayBpZFxuXG4gICAgICB0aGlzLmRlYnVnKCAnc3RlcCBpcyAnICsgc3RlcCArICcgYW5kIG5hdiBpdGVtIGNvdW50IGlzICcgKyBuYXZfaXRlbV9jb3VudCArICcgYW5kIG9wcCBpZCBpcyAnICsgb3BwX2lkICsgJyBhbmQgbmV4dCBzdGVwIGlzICcgKyBuZXh0X3N0ZXAgKTtcblxuICAgICAgLy8gdGhpcyBpcyB0aGUgbGFzdCB2aXNpYmxlIHN0ZXBcbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5jb25maXJtX3N0ZXBfc2VsZWN0b3IpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgYWN0aXZlID0gdGhpcy5vcHRpb25zLmNvbmZpcm07XG4gICAgICAgICQoJy5wcm9ncmVzcy0tZG9uYXRpb24gbGkuJyArIGFjdGl2ZSArICcgc3BhbicpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgc3RlcCA9ICQoJy5wcm9ncmVzcy0tZG9uYXRpb24gbGkuJyArIGFjdGl2ZSkuaW5kZXgoKSArIDE7XG4gICAgICAgIC8vIHRoZXJlIGlzIGEgY29udGludWF0aW9uIG9mIHRoZSBtYWluIGZvcm0gb24gdGhpcyBwYWdlLiB0aGVyZSBpcyBhIGJ1dHRvbiB0byBjbGlja1xuICAgICAgICAvLyB0aGlzIG1lYW5zIHRoZXJlIGlzIGFub3RoZXIgc3RlcFxuICAgICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuY29uZmlybV9idXR0b25fc2VsZWN0b3IpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBuYXZfaXRlbV9jb3VudCArPSAxO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGVwID09PSBuYXZfaXRlbV9jb3VudCAtIDEgJiYgJCh0aGlzLm9wdGlvbnMub3BwX2lkX3NlbGVjdG9yKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuZGVidWcoJ3RoaXMgaXMgYSBwYXltZW50IHN0ZXAgYnV0IHRoZXJlIGlzIGEgc3RlcCBhZnRlciBpdCcpO1xuICAgICAgICBzdGVwID0gJ3B1cmNoYXNlJztcbiAgICAgIH0gZWxzZSBpZiAoc3RlcCA9PT0gbmF2X2l0ZW1fY291bnQgJiYgJCh0aGlzLm9wdGlvbnMub3BwX2lkX3NlbGVjdG9yKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuZGVidWcoJ3RoaXMgaXMgYSBwYXltZW50IHN0ZXAgYW5kIHRoZXJlIGlzIG5vIHN0ZXAgYWZ0ZXIgaXQnKTtcbiAgICAgICAgc3RlcCA9ICdwdXJjaGFzZSc7XG4gICAgICB9IGVsc2UgaWYgKHN0ZXAgPT09IG5hdl9pdGVtX2NvdW50ICYmICQodGhpcy5vcHRpb25zLm9wcF9pZF9zZWxlY3RvcikubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHRoaXMuZGVidWcoJ3RoaXMgaXMgYSBwb3N0LWZpbmlzaCBzdGVwLiBpdCBkb2VzIG5vdCBoYXZlIGFuIGlkJyk7XG4gICAgICAgIHN0ZXAgPSBzdGVwICsgMTtcbiAgICAgICAgcG9zdF9wdXJjaGFzZSA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGRvY3VtZW50LnRpdGxlID0gdGl0bGUgKyBwYWdlO1xuICAgICAgdGhpcy5hbmFseXRpY3NUcmFja2luZ1N0ZXAoc3RlcCwgdGl0bGUsIHBvc3RfcHVyY2hhc2UpO1xuXG4gICAgICAvLyBhY3RpdmF0ZSB0aGUgbmF2IHRhYnNcbiAgICAgIGlmICgkKCcucHJvZ3Jlc3MtLWRvbmF0aW9uIGxpIC5hY3RpdmUnKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgJCgnIycgKyBhY3RpdmUpLnNob3coKTtcbiAgICAgICAgJCgnLnByb2dyZXNzLS1kb25hdGlvbiBsaS4nICsgYWN0aXZlICsgJyBhJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWN0aXZlID0gJCgnLnByb2dyZXNzLS1kb25hdGlvbiBsaSAuYWN0aXZlJykucGFyZW50KCkucHJvcCgnY2xhc3MnKTtcbiAgICAgICAgJCgnIycgKyBhY3RpdmUpLnNob3coKTtcbiAgICAgIH1cblxuICAgIH0sIC8vIHRhYk5hdmlnYXRpb25cblxuICAgIGFuYWx5dGljc1RyYWNraW5nU3RlcDogZnVuY3Rpb24oc3RlcCwgdGl0bGUsIHBvc3RfcHVyY2hhc2UpIHtcbiAgICAgIHZhciBsZXZlbCA9IHRoaXMuY2hlY2tMZXZlbCh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucywgJ25hbWUnKTsgLy8gY2hlY2sgd2hhdCBsZXZlbCBpdCBpc1xuICAgICAgdmFyIGxldmVsbnVtID0gdGhpcy5jaGVja0xldmVsKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zLCAnbnVtJyk7IC8vIGNoZWNrIHdoYXQgbGV2ZWwgaXQgaXMgYXMgYSBudW1iZXJcbiAgICAgIHZhciBhbW91bnQgPSAkKHRoaXMub3B0aW9ucy5vcmlnaW5hbF9hbW91bnRfc2VsZWN0b3IpLnZhbCgpO1xuICAgICAgdmFyIHJlY3VycmluZyA9IHRoaXMub3B0aW9ucy5yZWN1cnJpbmc7XG4gICAgICB2YXIgb3BwX2lkID0gJCh0aGlzLm9wdGlvbnMub3BwX2lkX3NlbGVjdG9yKS52YWwoKTtcblxuICAgICAgLy8gaWYgd2UncmUgbm90IGFmdGVyIHRoZSBwdXJjaGFzZSwgdXNlIGFkZFByb2R1Y3RcbiAgICAgIGlmICggcG9zdF9wdXJjaGFzZSAhPT0gdHJ1ZSApIHtcbiAgICAgICAgZ2EoJ2VjOmFkZFByb2R1Y3QnLCB7XG4gICAgICAgICAgJ2lkJzogJ21pbm5wb3N0XycgKyBsZXZlbC50b0xvd2VyQ2FzZSgpICsgJ19tZW1iZXJzaGlwJyxcbiAgICAgICAgICAnbmFtZSc6ICdNaW5uUG9zdCAnICsgbGV2ZWwuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBsZXZlbC5zbGljZSgxKSArICcgTWVtYmVyc2hpcCcsXG4gICAgICAgICAgJ2NhdGVnb3J5JzogJ0RvbmF0aW9uJyxcbiAgICAgICAgICAnYnJhbmQnOiAnTWlublBvc3QnLFxuICAgICAgICAgICd2YXJpYW50JzogIHJlY3VycmluZyxcbiAgICAgICAgICAncHJpY2UnOiBhbW91bnQsXG4gICAgICAgICAgJ3F1YW50aXR5JzogMVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0ZXAgPT09ICdwdXJjaGFzZScpIHtcbiAgICAgICAgdGhpcy5kZWJ1ZygnYWRkIGEgcHVyY2hhc2UgYWN0aW9uLiBzdGVwIGlzICcgKyBzdGVwKTtcbiAgICAgICAgZ2EoJ2VjOnNldEFjdGlvbicsIHN0ZXAse1xuICAgICAgICAgICdpZCc6IG9wcF9pZCwgLy8gVHJhbnNhY3Rpb24gaWQgLSBUeXBlOiBzdHJpbmdcbiAgICAgICAgICAnYWZmaWxpYXRpb24nOiAnTWlublBvc3QnLCAvLyBTdG9yZSBuYW1lIC0gVHlwZTogc3RyaW5nXG4gICAgICAgICAgJ3JldmVudWUnOiBhbW91bnQsIC8vIFRvdGFsIFJldmVudWUgLSBUeXBlOiBudW1lcmljXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5kZWJ1ZygnYWRkIGEgY2hlY2tvdXQgYWN0aW9uLiBzdGVwIGlzICcgKyBzdGVwKTtcbiAgICAgICAgZ2EoJ2VjOnNldEFjdGlvbicsJ2NoZWNrb3V0Jywge1xuICAgICAgICAgICdzdGVwJzogc3RlcCwgICAgICAgICAgICAvLyBBIHZhbHVlIG9mIDEgaW5kaWNhdGVzIGZpcnN0IGNoZWNrb3V0IHN0ZXAuVmFsdWUgb2YgMiBpbmRpY2F0ZXMgc2Vjb25kIGNoZWNrb3V0IHN0ZXBcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGdhKCdzZXQnLCB7XG4gICAgICAgIHBhZ2U6IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSxcbiAgICAgICAgdGl0bGU6IHRpdGxlXG4gICAgICB9KTtcbiAgICAgIGdhKCdzZW5kJywgJ3BhZ2V2aWV3Jywgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lKTtcblxuICAgIH0sIC8vIGFuYWx5dGljc1RyYWNraW5nU3RlcFxuXG4gICAgYW1vdW50QXNSYWRpbzogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgLy8gd2hlbiBhbW91bnQgZmllbGQgaXMgYSByYWRpbyBidXR0b24sIHdlIG5lZWQgdG8gY2hlY2sgaXQgd2hlbmV2ZXIgaXQgY2hhbmdlc1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgJChvcHRpb25zLm9yaWdpbmFsX2Ftb3VudF9zZWxlY3RvciwgZWxlbWVudCkuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoJCh0aGlzKS5pcygnOnJhZGlvJykpIHtcbiAgICAgICAgICAgIG9wdGlvbnMub3JpZ2luYWxfYW1vdW50ID0gcGFyc2VJbnQoJChvcHRpb25zLm9yaWdpbmFsX2Ftb3VudF9zZWxlY3RvciArICc6Y2hlY2tlZCcsIGVsZW1lbnQpLnZhbCgpLCAxMCk7XG4gICAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSwgLy8gYW1vdW50QXNSYWRpb1xuXG4gICAgYW1vdW50VXBkYXRlZDogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgLy8gd2hlbiBuZXcgYW1vdW50IHRleHQgZmllbGQgY2FuIGNoYW5nZSwgd2UgbmVlZCB0byBjaGFuZ2UgdGhlIGhpZGRlbiBmaWVsZFxuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdmFyIHBheW1lbnRfdHlwZSA9ICQob3B0aW9ucy5jaG9vc2VfcGF5bWVudCArICcgaW5wdXQnKS52YWwoKTtcbiAgICAgICQob3B0aW9ucy51cGRhdGVfYW1vdW50X3NlbGVjdG9yLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgICQob3B0aW9ucy5vcmlnaW5hbF9hbW91bnRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgkKHRoaXMpLnZhbCgpKTtcbiAgICAgICAgb3B0aW9ucy5vcmlnaW5hbF9hbW91bnQgPSBwYXJzZUludCgkKG9wdGlvbnMub3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSwgMTApO1xuICAgICAgICBpZiAoIHBheW1lbnRfdHlwZSA9PT0gJ2FjaCcgKSB7XG4gICAgICAgICAgdGhhdC5jYWxjdWxhdGVGZWVzKHRoYXQub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQsICdhY2gnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGF0LmNhbGN1bGF0ZUZlZXModGhhdC5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCwgJ3Zpc2EnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSwgLy8gYW1vdW50VXBkYXRlZFxuXG4gICAgY2FsY3VsYXRlRmVlczogZnVuY3Rpb24oYW1vdW50LCBwYXltZW50X3R5cGUpIHtcbiAgICAgIC8vIHRoaXMgc2VuZHMgdGhlIGFtb3VudCBhbmQgcGF5bWVudCB0eXBlIHRvIHB5dGhvbjsgZ2V0IHRoZSBmZWUgYW5kIGRpc3BsYXkgaXQgdG8gdGhlIHVzZXIgb24gdGhlIGNoZWNrYm94IGxhYmVsXG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgYW1vdW50OiBhbW91bnQsXG4gICAgICAgIHBheW1lbnRfdHlwZTogcGF5bWVudF90eXBlXG4gICAgICB9O1xuICAgICAgJC5hamF4KHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIHVybDogJy9jYWxjdWxhdGUtZmVlcy8nLFxuICAgICAgICBkYXRhOiBkYXRhXG4gICAgICB9KS5kb25lKGZ1bmN0aW9uKCBkYXRhICkge1xuICAgICAgICBpZiAoJChkYXRhLmZlZXMpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAkKHRoYXQub3B0aW9ucy5mZWVfYW1vdW50KS50ZXh0KHBhcnNlRmxvYXQoZGF0YS5mZWVzKS50b0ZpeGVkKDIpKTtcbiAgICAgICAgICB0aGF0LmNyZWRpdENhcmRGZWVDaGVja2JveCgkKHRoYXQub3B0aW9ucy5wYXlfY2NfcHJvY2Vzc2luZ19zZWxlY3RvcikpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LCAvLyBjYWxjdWxhdGVGZWVzXG5cbiAgICBjcmVkaXRDYXJkUHJvY2Vzc2luZ0ZlZXM6IGZ1bmN0aW9uKG9wdGlvbnMsIHJlc2V0KSB7XG4gICAgICAvLyB0aGlzIGFkZHMgb3Igc3VidHJhY3RzIHRoZSBmZWUgdG8gdGhlIG9yaWdpbmFsIGFtb3VudCB3aGVuIHRoZSB1c2VyIGluZGljYXRlcyB0aGV5IGRvIG9yIGRvIG5vdCB3YW50IHRvIHBheSB0aGUgZmVlc1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdGhhdC5jcmVkaXRDYXJkRmVlQ2hlY2tib3goJCh0aGlzLm9wdGlvbnMucGF5X2NjX3Byb2Nlc3Npbmdfc2VsZWN0b3IpKTtcbiAgICAgICQodGhpcy5vcHRpb25zLnBheV9jY19wcm9jZXNzaW5nX3NlbGVjdG9yKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHRoYXQuY3JlZGl0Q2FyZEZlZUNoZWNrYm94KHRoaXMpO1xuICAgICAgfSk7XG4gICAgfSwgLy8gY3JlZGl0Q2FyZFByb2Nlc3NpbmdGZWVzXG5cbiAgICBjcmVkaXRDYXJkRmVlQ2hlY2tib3g6IGZ1bmN0aW9uKGZpZWxkKSB7XG4gICAgICB2YXIgZnVsbF9hbW91bnQ7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICBpZiAoJChmaWVsZCkuaXMoJzpjaGVja2VkJykgfHwgJChmaWVsZCkucHJvcCgnY2hlY2tlZCcpKSB7XG4gICAgICAgICQoJy5hbW91bnQgLmxldmVsLWFtb3VudCcpLmFkZENsYXNzKCdmdWxsLWFtb3VudCcpO1xuICAgICAgICBmdWxsX2Ftb3VudCA9ICh0aGF0Lm9wdGlvbnMub3JpZ2luYWxfYW1vdW50ICsgcGFyc2VGbG9hdCgkKHRoYXQub3B0aW9ucy5mZWVfYW1vdW50KS50ZXh0KCkpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZ1bGxfYW1vdW50ID0gdGhhdC5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudDtcbiAgICAgIH1cbiAgICAgICQodGhhdC5vcHRpb25zLmZ1bGxfYW1vdW50X3NlbGVjdG9yKS50ZXh0KHBhcnNlRmxvYXQoZnVsbF9hbW91bnQpLnRvRml4ZWQoMikpO1xuICAgIH0sIC8vIGNyZWRpdENhcmRGZWVDaGVja2JveFxuXG4gICAgZG9uYXRlQW5vbnltb3VzbHk6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIGlmICgkKG9wdGlvbnMuYW5vbnltb3VzX3NlbGVjdG9yLCBlbGVtZW50KS5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICAkKG9wdGlvbnMubmFtZV9zZWxlY3RvciArICcgZGl2OmZpcnN0JywgZWxlbWVudCkuaGlkZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJChvcHRpb25zLm5hbWVfc2VsZWN0b3IgKyAnIGRpdjpmaXJzdCcsIGVsZW1lbnQpLnNob3coKTtcbiAgICAgIH1cblxuICAgICAgJChvcHRpb25zLmFub255bW91c19zZWxlY3RvciwgZWxlbWVudCkuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoJCh0aGlzKS5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICAgICQob3B0aW9ucy5uYW1lX3NlbGVjdG9yICsgJyBkaXY6Zmlyc3QnLCBlbGVtZW50KS5oaWRlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJChvcHRpb25zLm5hbWVfc2VsZWN0b3IgKyAnIGRpdjpmaXJzdCcsIGVsZW1lbnQpLnNob3coKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSwgLy8gZG9uYXRlQW5vbnltb3VzbHlcblxuICAgIGNoZWNrTGV2ZWw6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMsIHJldHVybnZhbHVlKSB7XG4gICAgICB2YXIgbGV2ZWwgPSAnJztcbiAgICAgIHZhciBsZXZlbG51bSA9IDA7XG4gICAgICB2YXIgbGV2ZWxjbGFzcyA9ICdsZXZlbCBsZXZlbC0tJztcbiAgICAgIHZhciBhbW91bnRfeWVhcmx5O1xuICAgICAgdmFyIGZyZXF1ZW5jeSA9IG9wdGlvbnMuZnJlcXVlbmN5O1xuICAgICAgdmFyIGFtb3VudCA9IG9wdGlvbnMub3JpZ2luYWxfYW1vdW50O1xuXG4gICAgICBpZiAoZnJlcXVlbmN5ID09PSAxMikge1xuICAgICAgICBhbW91bnRfeWVhcmx5ID0gYW1vdW50ICogZnJlcXVlbmN5O1xuICAgICAgfSBlbHNlIGlmIChmcmVxdWVuY3kgPT09IDEpIHtcbiAgICAgICAgYW1vdW50X3llYXJseSA9IGFtb3VudDtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgJC5lYWNoKG9wdGlvbnMubGV2ZWxzLCBmdW5jdGlvbihpbmRleCwgdmFsdWUpIHtcbiAgICAgICAgdmFyIG5hbWUgPSB2YWx1ZS5uYW1lO1xuICAgICAgICB2YXIgbnVtID0gaW5kZXg7XG4gICAgICAgIHZhciBtYXggPSB2YWx1ZS5tYXg7XG4gICAgICAgIHZhciBtaW4gPSB2YWx1ZS5taW47XG4gICAgICAgIGlmICh0eXBlb2YgbWluICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgbWF4ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGlmIChhbW91bnRfeWVhcmx5ID49IG1pbiAmJiBhbW91bnRfeWVhcmx5IDwgbWF4KSB7XG4gICAgICAgICAgICBsZXZlbCA9IG5hbWU7XG4gICAgICAgICAgICBsZXZlbG51bSA9IG51bTtcbiAgICAgICAgICAgIGxldmVsY2xhc3MgKz0gbnVtO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbWF4ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGlmIChhbW91bnRfeWVhcmx5IDwgbWF4KSB7XG4gICAgICAgICAgICBsZXZlbCA9IG5hbWU7XG4gICAgICAgICAgICBsZXZlbG51bSA9IG51bTtcbiAgICAgICAgICAgIGxldmVsY2xhc3MgKz0gbnVtO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbWluICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGlmIChhbW91bnRfeWVhcmx5ID49IG1pbikge1xuICAgICAgICAgICAgbGV2ZWwgPSBuYW1lO1xuICAgICAgICAgICAgbGV2ZWxudW0gPSBudW07XG4gICAgICAgICAgICBsZXZlbGNsYXNzICs9IG51bTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgaWYgKHJldHVybnZhbHVlID09PSAnbmFtZScpIHtcbiAgICAgICAgcmV0dXJuIGxldmVsO1xuICAgICAgfSBlbHNlIGlmIChyZXR1cm52YWx1ZSA9PT0gJ251bScpIHtcbiAgICAgICAgcmV0dXJuIGxldmVsbnVtOyAgXG4gICAgICB9XG4gICAgfSwgLy8gY2hlY2tMZXZlbFxuXG4gICAgaG9ub3JPck1lbW9yeTogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgaWYgKCQob3B0aW9ucy5ob25vcl9vcl9tZW1vcnlfY2hvb3NlciArICc6Y2hlY2tlZCcpLnZhbCgpKSB7XG4gICAgICAgICQob3B0aW9ucy5ob25vcl9tZW1vcnlfaW5wdXRfZ3JvdXAsIGVsZW1lbnQpLnNob3coKTtcbiAgICAgICAgJChvcHRpb25zLmhvbm9yX3R5cGVfc2VsZWN0b3IpLnRleHQoJChvcHRpb25zLmhvbm9yX29yX21lbW9yeV9jaG9vc2VyICsgJzpjaGVja2VkJykudmFsKCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJChvcHRpb25zLmhvbm9yX21lbW9yeV9pbnB1dF9ncm91cCwgZWxlbWVudCkuaGlkZSgpO1xuICAgICAgICAkKG9wdGlvbnMuaG9ub3JfbmFtZV9zZWxlY3RvciArICcgaW5wdXQnLCBlbGVtZW50KS52YWwoJycpO1xuICAgICAgfVxuICAgIH0sIC8vIGhvbm9yT3JNZW1vcnlcblxuICAgIGhvbm9yT3JNZW1vcnlUb2dnbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHRoYXQuaG9ub3JPck1lbW9yeSh0aGF0LmVsZW1lbnQsIHRoYXQub3B0aW9ucyk7XG4gICAgICAkKG9wdGlvbnMuaG9ub3Jfb3JfbWVtb3J5X2Nob29zZXIsIGVsZW1lbnQpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgdGhhdC5ob25vck9yTWVtb3J5KHRoYXQuZWxlbWVudCwgdGhhdC5vcHRpb25zKTtcbiAgICAgIH0pO1xuICAgIH0sIC8vIGhvbm9yT3JNZW1vcnlUb2dnbGVcblxuICAgIG91dHNpZGVVbml0ZWRTdGF0ZXM6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgICQob3B0aW9ucy5zaG93X2JpbGxpbmdfY291bnRyeV9zZWxlY3RvcikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICQob3B0aW9ucy5iaWxsaW5nX2NvdW50cnlfc2VsZWN0b3IpLnNob3coKTtcbiAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5oaWRlKCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuICAgICAgJChvcHRpb25zLnNob3dfc2hpcHBpbmdfY291bnRyeV9zZWxlY3RvcikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICQob3B0aW9ucy5zaGlwcGluZ19jb3VudHJ5X3NlbGVjdG9yKS5zaG93KCk7XG4gICAgICAgICQodGhpcykucGFyZW50KCkuaGlkZSgpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9LCAvLyBvdXRzaWRlVW5pdGVkU3RhdGVzXG5cbiAgICBzaGlwcGluZ0FkZHJlc3M6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHZhciBzaG93X3NoaXBwaW5nID0gZmFsc2U7XG4gICAgICBpZiAoJChvcHRpb25zLnVzZV9mb3Jfc2hpcHBpbmdfc2VsZWN0b3IpLmxlbmd0aCA+IDApIHsgLy8gd2UgaGF2ZSBhIHNoaXBwaW5nIGNoZWNrYm94XG4gICAgICAgIHNob3dfc2hpcHBpbmcgPSB0cnVlO1xuICAgICAgfVxuLy8gICAgICBzaG93X3NoaXBwaW5nID0gISEkKG9wdGlvbnMudXNlX2Zvcl9zaGlwcGluZ19zZWxlY3RvciArICc6Y2hlY2tlZCcsIGVsZW1lbnQpLmxlbmd0aDtcbi8vICAgICAgLy90aGlzLmRlYnVnKCdzaG93IGlzIHRoZXJlJyk7XG5cbi8qICAgICAgJChvcHRpb25zLnVzZV9mb3Jfc2hpcHBpbmdfc2VsZWN0b3IsIGVsZW1lbnQpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgdGhhdC5zaGlwcGluZ0FkZHJlc3MoZWxlbWVudCwgb3B0aW9ucyk7XG4gICAgICAgIC8vdGhpcy5kZWJ1ZygnY2hhbmdlIGl0Jyk7XG4gICAgICB9KTtcbiovXG4gICAgICBpZiAoc2hvd19zaGlwcGluZyA9PT0gdHJ1ZSApIHtcbiAgICAgICAgJChvcHRpb25zLnVzZV9mb3Jfc2hpcHBpbmdfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpLnNob3coKTtcbiAgICAgICAgaWYgKCQob3B0aW9ucy51c2VfZm9yX3NoaXBwaW5nX3NlbGVjdG9yLCBlbGVtZW50KS5pcygnOmNoZWNrZWQnKSkgeyAvLyB1c2Ugc2FtZSBhcyBiaWxsaW5nXG4gICAgICAgICAgJChvcHRpb25zLnNoaXBwaW5nX3NlbGVjdG9yKS5oaWRlKCk7XG4gICAgICAgIH0gZWxzZSB7IC8vIHNlcGFyYXRlIHNoaXBwaW5nIGFuZCBiaWxsaW5nXG4gICAgICAgICAgJChvcHRpb25zLnNoaXBwaW5nX3NlbGVjdG9yKS5zaG93KCk7XG4gICAgICAgIH1cbiAgICAgICAgJChvcHRpb25zLnVzZV9mb3Jfc2hpcHBpbmdfc2VsZWN0b3IsIGVsZW1lbnQpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgICB0aGF0LnNoaXBwaW5nQWRkcmVzcyhlbGVtZW50LCBvcHRpb25zKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBcbiAgICB9LCAvLyBzaGlwcGluZ0FkZHJlc3NcblxuICAgIGFsbG93TWlubnBvc3RBY2NvdW50OiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zLCBjaGFuZ2VkKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB2YXIgYWNjb3VudF9leGlzdHMgPSBmYWxzZTtcblxuICAgICAgJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKS5hcHBlbmQoJzxwIGNsYXNzPVwiZXJyb3Igc3BhbS1lbWFpbFwiPlRoaXMgZW1haWwgYWRkcmVzcyBoYXMgYmVlbiBkZXRlY3RlZCBhcyBhIHNwYW1tZXIuPC9wPicpO1xuICAgICAgJCgnLnNwYW0tZW1haWwnKS5oaWRlKCk7XG5cbiAgICAgICQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCcuc3BhbS1lbWFpbCcpLmhpZGUoKTtcbiAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaW52YWxpZCBlcnJvcicpO1xuICAgICAgfSk7XG5cbiAgICAgIGZ1bmN0aW9uIGRvbmVUeXBpbmcgKCkge1xuICAgICAgICB2YXIgZW1haWwgPSAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpO1xuICAgICAgICBhY2NvdW50X2V4aXN0cyA9IHRoYXQuY2hlY2tNaW5ucG9zdEFjY291bnQoZWxlbWVudCwgb3B0aW9ucywgZW1haWwpO1xuICAgICAgfVxuXG4gICAgICAvL3NldHVwIGJlZm9yZSBmdW5jdGlvbnNcbiAgICAgIHZhciB0eXBpbmdUaW1lcjsgICAgICAgICAgICAgICAgLy90aW1lciBpZGVudGlmaWVyXG4gICAgICB2YXIgZG9uZVR5cGluZ0ludGVydmFsID0gNTAwMDsgIC8vdGltZSBpbiBtcywgNSBzZWNvbmQgZm9yIGV4YW1wbGVcblxuICAgICAgLy9vbiBrZXl1cCwgc3RhcnQgdGhlIGNvdW50ZG93blxuICAgICAgJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5rZXl1cChmdW5jdGlvbigpe1xuICAgICAgICBjbGVhclRpbWVvdXQodHlwaW5nVGltZXIpO1xuICAgICAgICBpZiAoJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwpIHtcbiAgICAgICAgICB0eXBpbmdUaW1lciA9IHNldFRpbWVvdXQoZG9uZVR5cGluZywgZG9uZVR5cGluZ0ludGVydmFsKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIC8vdXNlciBpcyBcImZpbmlzaGVkIHR5cGluZyxcIiBkbyBzb21ldGhpbmdcblxuICAgICAgaWYgKCQob3B0aW9ucy5jcmVhdGVfbXBfc2VsZWN0b3IsIGVsZW1lbnQpLmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgICQob3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgZWxlbWVudCkuc2hvdygpO1xuICAgICAgICBvcHRpb25zLmNyZWF0ZV9hY2NvdW50ID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQob3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgZWxlbWVudCkuaGlkZSgpO1xuICAgICAgfVxuXG4gICAgICAkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoYXQuYWxsb3dNaW5ucG9zdEFjY291bnQoZWxlbWVudCwgb3B0aW9ucywgdHJ1ZSk7XG4gICAgICB9KTtcblxuICAgICAgaWYgKGNoYW5nZWQgPT09IGZhbHNlKSB7XG4gICAgICAgIC8vIGFsbG93IHVzZXJzIHRvIHNob3cgcGxhaW4gdGV4dCwgb3IgdG8gc2VlIHB3IGNyaXRlcmlhXG4gICAgICAgICQob3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgZWxlbWVudCkuYXBwZW5kKCc8ZGl2IGNsYXNzPVwiaGVscC1saW5rXCI+PHNwYW4+UGFzc3dvcmQgaGVscDwvc3Bhbj48L2Rpdj48ZGl2IGNsYXNzPVwiZm9ybS1oZWxwXCI+UGFzc3dvcmQgbXVzdCBiZSBhdCBsZWFzdCA2IGNoYXJhY3RlcnMuPC9kaXY+PGxhYmVsIGNsYXNzPVwiYWRkaXRpb25hbC1vcHRpb25cIj48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgbmFtZT1cInNob3dwYXNzd29yZFwiIGlkPVwic2hvd3Bhc3N3b3JkXCI+IFNob3cgcGFzc3dvcmQ8L2xhYmVsPicpO1xuICAgICAgICAkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKS5iZWZvcmUoJzxwIGNsYXNzPVwiYWNjb3VudC1leGlzdHMgc3VjY2Vzc1wiPlRoZXJlIGlzIGFscmVhZHkgYSBNaW5uUG9zdC5jb20gYWNjb3VudCB3aXRoIHRoaXMgZW1haWwuPC9wPicpO1xuICAgICAgICAkKCcuYWNjb3VudC1leGlzdHMnKS5oaWRlKCk7XG4gICAgICAgICQoJyNzaG93cGFzc3dvcmQnKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAoJCh0aGlzKS5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICAgICAgJCgnI3Bhc3N3b3JkJykuZ2V0KDApLnR5cGUgPSAndGV4dCc7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoJyNwYXNzd29yZCcpLmdldCgwKS50eXBlID0gJ3Bhc3N3b3JkJztcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5mb3JtLWl0ZW0gLmZvcm0taGVscCcpLmhpZGUoKTtcbiAgICAgIH1cbiAgICAgICQoJy5oZWxwLWxpbmsnKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKS5uZXh0KCcuZm9ybS1oZWxwJykudG9nZ2xlKCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuICAgIH0sIC8vIGFsbG93TWlubnBvc3RBY2NvdW50XG5cbiAgICBjaGVja01pbm5wb3N0QWNjb3VudDogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucywgZW1haWwpIHtcbiAgICAgIHZhciB1c2VyID0ge1xuICAgICAgICBlbWFpbDogZW1haWxcbiAgICAgIH07XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAkLmFqYXgoe1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICB1cmw6IG9wdGlvbnMubWlubnBvc3Rfcm9vdCArICcvd3AtanNvbi91c2VyLWFjY291bnQtbWFuYWdlbWVudC92MS9jaGVjay1hY2NvdW50JyxcbiAgICAgICAgZGF0YTogdXNlclxuICAgICAgfSkuZG9uZShmdW5jdGlvbiggcmVzdWx0ICkge1xuICAgICAgICBpZiAocmVzdWx0LnN0YXR1cyA9PT0gJ3N1Y2Nlc3MnICYmIHJlc3VsdC5yZWFzb24gPT09ICd1c2VyIGV4aXN0cycpIHsgLy8gdXNlciBleGlzdHNcbiAgICAgICAgICBpZiAoJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgICAgICQob3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgZWxlbWVudCkuaGlkZSgpO1xuICAgICAgICAgICAgJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkucGFyZW50KCkuaGlkZSgpO1xuICAgICAgICAgICAgJCgnLmFjY291bnQtZXhpc3RzJywgZWxlbWVudCkuc2hvdygpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KS5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgICAgICAgJChvcHRpb25zLnBhc3N3b3JkX3NlbGVjdG9yLCBlbGVtZW50KS5oaWRlKCk7XG4gICAgICAgICAgICAgICQob3B0aW9ucy5jcmVhdGVfbXBfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpLmhpZGUoKTtcbiAgICAgICAgICAgICAgJCgnLmFjY291bnQtZXhpc3RzJywgZWxlbWVudCkuc2hvdygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKCByZXN1bHQuc3RhdHVzID09PSAnc3BhbScgKSB7XG4gICAgICAgICAgJCh0aGF0Lm9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IpLmFkZENsYXNzKCdpbnZhbGlkIGVycm9yJyk7XG4gICAgICAgICAgJCggJy5zcGFtLWVtYWlsJykuc2hvdygpO1xuICAgICAgICB9IGVsc2UgeyAvLyB1c2VyIGRvZXMgbm90IGV4aXN0IG9yIGFqYXggY2FsbCBmYWlsZWRcbiAgICAgICAgICBpZiAoJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgICAgICQob3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgZWxlbWVudCkuc2hvdygpO1xuICAgICAgICAgICAgb3B0aW9ucy5jcmVhdGVfYWNjb3VudCA9IHRydWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQob3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgZWxlbWVudCkuaGlkZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAkKCcuYWNjb3VudC1leGlzdHMnLCBlbGVtZW50KS5oaWRlKCk7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LCAvLyBjaGVja01pbm5wb3N0QWNjb3VudFxuXG4gICAgY2hvb3NlUGF5bWVudE1ldGhvZDogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuXG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG5cbiAgICAgIGlmICgkKG9wdGlvbnMuY2hvb3NlX3BheW1lbnQpLmxlbmd0aCA+IDApIHsgICAgICBcbiAgICAgICAgaWYgKCQob3B0aW9ucy5jaG9vc2VfcGF5bWVudCArICcgaW5wdXQnKS5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICAgIHZhciBjaGVja2VkID0gJChvcHRpb25zLmNob29zZV9wYXltZW50ICsgJyBpbnB1dDpjaGVja2VkJykuYXR0cignaWQnKTtcbiAgICAgICAgICB2YXIgY2hlY2tlZF92YWx1ZSA9ICQob3B0aW9ucy5jaG9vc2VfcGF5bWVudCArICcgaW5wdXQ6Y2hlY2tlZCcpLnZhbCgpO1xuICAgICAgICAgICQob3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvcikucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICQob3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvciArICcuJyArIGNoZWNrZWQpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAkKG9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IgKyAnOm5vdCguYWN0aXZlKSBsYWJlbCcpLnJlbW92ZUNsYXNzKCdyZXF1aXJlZCcpO1xuICAgICAgICAgICQob3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvciArICc6bm90KC5hY3RpdmUpIGlucHV0JykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICAgICAgJChvcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yICsgJy5hY3RpdmUgbGFiZWwnKS5hZGRDbGFzcygncmVxdWlyZWQnKTtcbiAgICAgICAgICAkKG9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IgKyAnLmFjdGl2ZSBpbnB1dCcpLnByb3AoJ3JlcXVpcmVkJywgdHJ1ZSk7XG4gICAgICAgICAgaWYgKCBjaGVja2VkX3ZhbHVlID09PSAnYWNoJyApIHtcbiAgICAgICAgICAgIHRoYXQuY2FsY3VsYXRlRmVlcyh0aGF0Lm9wdGlvbnMub3JpZ2luYWxfYW1vdW50LCAnYWNoJyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoYXQuY2FsY3VsYXRlRmVlcyh0aGF0Lm9wdGlvbnMub3JpZ2luYWxfYW1vdW50LCAndmlzYScpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICQob3B0aW9ucy5jaG9vc2VfcGF5bWVudCArICcgaW5wdXQnKS5jaGFuZ2UoZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgJChvcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgJChvcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yICsgJy4nICsgdGhpcy5pZCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICQob3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvciArICc6bm90KC5hY3RpdmUpIGxhYmVsJykucmVtb3ZlQ2xhc3MoJ3JlcXVpcmVkJyk7XG4gICAgICAgICAgJChvcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yICsgJzpub3QoLmFjdGl2ZSkgaW5wdXQnKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgICAgICAkKG9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IgKyAnLmFjdGl2ZSBsYWJlbCcpLmFkZENsYXNzKCdyZXF1aXJlZCcpO1xuICAgICAgICAgICQob3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvciArICcuYWN0aXZlIGlucHV0JykucHJvcCgncmVxdWlyZWQnLCB0cnVlKTtcbiAgICAgICAgICAkKCcjYmFua1Rva2VuJykucmVtb3ZlKCk7XG4gICAgICAgICAgaWYgKCB0aGlzLnZhbHVlID09PSAnYWNoJyApIHtcbiAgICAgICAgICAgIHRoYXQuY2FsY3VsYXRlRmVlcyh0aGF0Lm9wdGlvbnMub3JpZ2luYWxfYW1vdW50LCAnYWNoJyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoYXQuY2FsY3VsYXRlRmVlcyh0aGF0Lm9wdGlvbnMub3JpZ2luYWxfYW1vdW50LCAndmlzYScpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSwgLy8gY2hvb3NlUGF5bWVudE1ldGhvZFxuXG4gICAgY3JlZGl0Q2FyZEZpZWxkczogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuXG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG5cbiAgICAgICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5wcmVwZW5kKCc8aW5wdXQgdHlwZT1cImhpZGRlblwiIGlkPVwic291cmNlXCIgbmFtZT1cInNvdXJjZVwiIHZhbHVlPVwiJyArIGRvY3VtZW50LnJlZmVycmVyICsgJ1wiIC8+Jyk7XG5cbiAgICAgIHZhciBzdHlsZSA9IHtcbiAgICAgICAgYmFzZToge1xuICAgICAgICAgIGljb25Db2xvcjogJyM2NjZFRTgnLFxuICAgICAgICAgIGxpbmVIZWlnaHQ6ICczN3B4JyxcbiAgICAgICAgICBmb250V2VpZ2h0OiA0MDAsXG4gICAgICAgICAgZm9udEZhbWlseTogJ0dlb3JnaWEsQ2FtYnJpYSxUaW1lcyBOZXcgUm9tYW4sVGltZXMsc2VyaWYnLFxuICAgICAgICAgIGZvbnRTaXplOiAnMTZweCcsXG4gICAgICAgIH0sXG4gICAgICB9O1xuXG4gICAgICAvLyBBZGQgYW4gaW5zdGFuY2Ugb2YgdGhlIGNhcmQgVUkgY29tcG9uZW50IGludG8gdGhlIGBjYXJkLWVsZW1lbnRgIDxkaXY+XG4gICAgICAvL2NhcmQubW91bnQoJyNjYXJkLWVsZW1lbnQnKTtcbiAgICAgIGlmICggJCgnLmNyZWRpdC1jYXJkLWdyb3VwJykubGVuZ3RoID09PSAwICYmICQoJy5wYXltZW50LW1ldGhvZC5jaG9vc2UtY2FyZCcpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGF0LmNhcmROdW1iZXJFbGVtZW50ID0gdGhhdC5lbGVtZW50cy5jcmVhdGUoJ2NhcmROdW1iZXInLCB7XG4gICAgICAgIHN0eWxlOiBzdHlsZVxuICAgICAgfSk7XG4gICAgICB0aGF0LmNhcmROdW1iZXJFbGVtZW50Lm1vdW50KG9wdGlvbnMuY2NfbnVtX3NlbGVjdG9yKTtcblxuICAgICAgdGhhdC5jYXJkRXhwaXJ5RWxlbWVudCA9IHRoYXQuZWxlbWVudHMuY3JlYXRlKCdjYXJkRXhwaXJ5Jywge1xuICAgICAgICBzdHlsZTogc3R5bGVcbiAgICAgIH0pO1xuICAgICAgdGhhdC5jYXJkRXhwaXJ5RWxlbWVudC5tb3VudChvcHRpb25zLmNjX2V4cF9zZWxlY3Rvcik7XG5cbiAgICAgIHRoYXQuY2FyZEN2Y0VsZW1lbnQgPSB0aGF0LmVsZW1lbnRzLmNyZWF0ZSgnY2FyZEN2YycsIHtcbiAgICAgICAgc3R5bGU6IHN0eWxlXG4gICAgICB9KTtcbiAgICAgIHRoYXQuY2FyZEN2Y0VsZW1lbnQubW91bnQob3B0aW9ucy5jY19jdnZfc2VsZWN0b3IpO1xuXG4gICAgICAvLyB2YWxpZGF0ZS9lcnJvciBoYW5kbGUgdGhlIGNhcmQgZmllbGRzXG4gICAgICB0aGF0LmNhcmROdW1iZXJFbGVtZW50Lm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAvLyBlcnJvciBoYW5kbGluZ1xuICAgICAgICB0aGF0LnN0cmlwZUVycm9yRGlzcGxheShldmVudCwgJChvcHRpb25zLmNjX251bV9zZWxlY3RvciwgZWxlbWVudCksIGVsZW1lbnQsIG9wdGlvbnMgKTtcbiAgICAgICAgLy8gaWYgaXQgY2hhbmdlZCwgcmVzZXQgdGhlIGJ1dHRvblxuICAgICAgICB0aGF0LmJ1dHRvblN0YXR1cyhvcHRpb25zLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIGZhbHNlKTtcbiAgICAgICAgLy8gU3dpdGNoIGJyYW5kIGxvZ29cbiAgICAgICAgaWYgKGV2ZW50LmJyYW5kKSB7XG4gICAgICAgICAgdGhhdC5jYWxjdWxhdGVGZWVzKHRoYXQub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQsIGV2ZW50LmJyYW5kKTtcbiAgICAgICAgICB0aGF0LnNldEJyYW5kSWNvbihldmVudC5icmFuZCk7XG4gICAgICAgIH1cbiAgICAgICAgLy9zZXRPdXRjb21lKGV2ZW50KTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGF0LmNhcmRFeHBpcnlFbGVtZW50Lm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAvLyBlcnJvciBoYW5kbGluZ1xuICAgICAgICB0aGF0LnN0cmlwZUVycm9yRGlzcGxheShldmVudCwgJChvcHRpb25zLmNjX2V4cF9zZWxlY3RvciwgZWxlbWVudCksIGVsZW1lbnQsIG9wdGlvbnMgKTtcbiAgICAgICAgLy8gaWYgaXQgY2hhbmdlZCwgcmVzZXQgdGhlIGJ1dHRvblxuICAgICAgICB0aGF0LmJ1dHRvblN0YXR1cyhvcHRpb25zLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIGZhbHNlKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGF0LmNhcmRDdmNFbGVtZW50Lm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAvLyBlcnJvciBoYW5kbGluZ1xuICAgICAgICB0aGF0LnN0cmlwZUVycm9yRGlzcGxheShldmVudCwgJChvcHRpb25zLmNjX2N2dl9zZWxlY3RvciwgZWxlbWVudCksIGVsZW1lbnQsIG9wdGlvbnMgKTtcbiAgICAgICAgLy8gaWYgaXQgY2hhbmdlZCwgcmVzZXQgdGhlIGJ1dHRvblxuICAgICAgICB0aGF0LmJ1dHRvblN0YXR1cyhvcHRpb25zLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIGZhbHNlKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyB0aGlzIGlzIHRoZSBtZXRob2QgdG8gY3JlYXRlIGEgc2luZ2xlIGNhcmQgZmllbGQgYW5kIG1vdW50IGl0XG4gICAgICAvKnZhciBjYXJkID0gdGhhdC5lbGVtZW50cy5jcmVhdGUoXG4gICAgICAgICdjYXJkJyxcbiAgICAgICAge1xuICAgICAgICAgIGhpZGVQb3N0YWxDb2RlOiB0cnVlXG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgICAvLyBBZGQgYW4gaW5zdGFuY2Ugb2YgdGhlIGNhcmQgVUkgY29tcG9uZW50IGludG8gdGhlIGBjYXJkLWVsZW1lbnRgIDxkaXY+XG4gICAgICBjYXJkLm1vdW50KCcjY2FyZC1lbGVtZW50Jyk7Ki9cblxuICAgIH0sIC8vIGNyZWRpdENhcmRGaWVsZHNcblxuICAgIHNldEJyYW5kSWNvbjogZnVuY3Rpb24oYnJhbmQpIHtcbiAgICAgIHZhciBjYXJkQnJhbmRUb1BmQ2xhc3MgPSB7XG4gICAgICAgICd2aXNhJzogJ3BmLXZpc2EnLFxuICAgICAgICAnbWFzdGVyY2FyZCc6ICdwZi1tYXN0ZXJjYXJkJyxcbiAgICAgICAgJ2FtZXgnOiAncGYtYW1lcmljYW4tZXhwcmVzcycsXG4gICAgICAgICdkaXNjb3Zlcic6ICdwZi1kaXNjb3ZlcicsXG4gICAgICAgICdkaW5lcnMnOiAncGYtZGluZXJzJyxcbiAgICAgICAgJ2pjYic6ICdwZi1qY2InLFxuICAgICAgICAndW5rbm93bic6ICdwZi1jcmVkaXQtY2FyZCcsXG4gICAgICB9XG4gICAgICB2YXIgYnJhbmRJY29uRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdicmFuZC1pY29uJyk7XG4gICAgICB2YXIgcGZDbGFzcyA9ICdwZi1jcmVkaXQtY2FyZCc7XG4gICAgICBpZiAoYnJhbmQgaW4gY2FyZEJyYW5kVG9QZkNsYXNzKSB7XG4gICAgICAgIHBmQ2xhc3MgPSBjYXJkQnJhbmRUb1BmQ2xhc3NbYnJhbmRdO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIgaSA9IGJyYW5kSWNvbkVsZW1lbnQuY2xhc3NMaXN0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIGJyYW5kSWNvbkVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShicmFuZEljb25FbGVtZW50LmNsYXNzTGlzdFtpXSk7XG4gICAgICB9XG4gICAgICBicmFuZEljb25FbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3BmJyk7XG4gICAgICBicmFuZEljb25FbGVtZW50LmNsYXNzTGlzdC5hZGQocGZDbGFzcyk7XG4gICAgfSxcblxuICAgIGFjaEZpZWxkczogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgaWYgKG9wdGlvbnMucGxhaWRfZW52ICE9ICcnICYmIG9wdGlvbnMua2V5ICE9ICcnICYmIHR5cGVvZiBQbGFpZCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdmFyIGxpbmtIYW5kbGVyID0gUGxhaWQuY3JlYXRlKHtcbiAgICAgICAgICBzZWxlY3RBY2NvdW50OiB0cnVlLFxuICAgICAgICAgIGFwaVZlcnNpb246ICd2MicsXG4gICAgICAgICAgZW52OiBvcHRpb25zLnBsYWlkX2VudixcbiAgICAgICAgICBjbGllbnROYW1lOiAnTWlublBvc3QnLFxuICAgICAgICAgIGtleTogb3B0aW9ucy5wbGFpZF9wdWJsaWNfa2V5LFxuICAgICAgICAgIHByb2R1Y3Q6ICdhdXRoJyxcbiAgICAgICAgICBvbkxvYWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy8gVGhlIExpbmsgbW9kdWxlIGZpbmlzaGVkIGxvYWRpbmcuXG4gICAgICAgICAgfSxcbiAgICAgICAgICBvblN1Y2Nlc3M6IGZ1bmN0aW9uKHB1YmxpY190b2tlbiwgbWV0YWRhdGEpIHtcbiAgICAgICAgICAgIC8vIFRoZSBvblN1Y2Nlc3MgZnVuY3Rpb24gaXMgY2FsbGVkIHdoZW4gdGhlIHVzZXIgaGFzIHN1Y2Nlc3NmdWxseVxuICAgICAgICAgICAgLy8gYXV0aGVudGljYXRlZCBhbmQgc2VsZWN0ZWQgYW4gYWNjb3VudCB0byB1c2UuXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gV2hlbiBjYWxsZWQsIHlvdSB3aWxsIHNlbmQgdGhlIHB1YmxpY190b2tlbiBhbmQgdGhlIHNlbGVjdGVkXG4gICAgICAgICAgICAvLyBhY2NvdW50IElELCBtZXRhZGF0YS5hY2NvdW50X2lkLCB0byB5b3VyIGJhY2tlbmQgYXBwIHNlcnZlci5cbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyBzZW5kRGF0YVRvQmFja2VuZFNlcnZlcih7XG4gICAgICAgICAgICAvLyAgIHB1YmxpY190b2tlbjogcHVibGljX3Rva2VuLFxuICAgICAgICAgICAgLy8gICBhY2NvdW50X2lkOiBtZXRhZGF0YS5hY2NvdW50X2lkXG4gICAgICAgICAgICAvLyB9KTtcblxuICAgICAgICAgICAgLy90aGlzLmRlYnVnKCdQdWJsaWMgVG9rZW46ICcgKyBwdWJsaWNfdG9rZW4pO1xuICAgICAgICAgICAgLy90aGlzLmRlYnVnKCdDdXN0b21lci1zZWxlY3RlZCBhY2NvdW50IElEOiAnICsgbWV0YWRhdGEuYWNjb3VudF9pZCk7XG5cbiAgICAgICAgICAgIHZhciBzdXBwb3J0Zm9ybSA9ICQob3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3Rvcik7XG5cbiAgICAgICAgICAgIC8vIHJlc3BvbnNlIGNvbnRhaW5zIGlkIGFuZCBjYXJkLCB3aGljaCBjb250YWlucyBhZGRpdGlvbmFsIGNhcmQgZGV0YWlsc1xuICAgICAgICAgICAgLy8gSW5zZXJ0IHRoZSBkYXRhIGludG8gdGhlIGZvcm0gc28gaXQgZ2V0cyBzdWJtaXR0ZWQgdG8gdGhlIHNlcnZlclxuICAgICAgICAgICAgc3VwcG9ydGZvcm0uYXBwZW5kKCQoJzxpbnB1dCB0eXBlPVxcXCJoaWRkZW5cXFwiIG5hbWU9XFxcInB1YmxpY190b2tlblxcXCIgLz4nKS52YWwocHVibGljX3Rva2VuKSk7XG4gICAgICAgICAgICBzdXBwb3J0Zm9ybS5hcHBlbmQoJCgnPGlucHV0IHR5cGU9XFxcImhpZGRlblxcXCIgbmFtZT1cXFwiYWNjb3VudF9pZFxcXCIgLz4nKS52YWwobWV0YWRhdGEuYWNjb3VudF9pZCkpO1xuXG4gICAgICAgICAgICAvLyBnZXQgdGhlIGFjY291bnQgdmFsaWRhdGVkIGJ5IGFqYXhcbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgIHVybDonL3BsYWlkX3Rva2VuLycsXG4gICAgICAgICAgICAgIC8vY2FjaGU6IGZhbHNlLFxuICAgICAgICAgICAgICBkYXRhOiAkKHN1cHBvcnRmb3JtKS5zZXJpYWxpemUoKSxcbiAgICAgICAgICAgICAgdHlwZTogJ1BPU1QnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZXNwb25zZS5lcnJvciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAvLyB0aGVyZSBpcyBhbiBlcnJvci5cbiAgICAgICAgICAgICAgICAkKG9wdGlvbnMucGxhaWRfbGluaykucGFyZW50KCkuYWZ0ZXIoJzxwIGNsYXNzPVwiZXJyb3JcIj4nICsgcmVzcG9uc2UuZXJyb3IgKyAnPC9wPicpXG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy90aGlzLmRlYnVnKCdwcmludCByZXNwb25zZSBoZXJlJyk7XG4gICAgICAgICAgICAgICAgLy90aGlzLmRlYnVnKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAkKG9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLnByZXBlbmQoJzxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgaWQ9XCJiYW5rVG9rZW5cIiBuYW1lPVwiYmFua1Rva2VuXCIgdmFsdWU9XCInICsgcmVzcG9uc2Uuc3RyaXBlX2JhbmtfYWNjb3VudF90b2tlbiArICdcIiAvPicpO1xuICAgICAgICAgICAgICAgICQob3B0aW9ucy5wbGFpZF9saW5rLCBlbGVtZW50KS5odG1sKCc8c3Ryb25nPllvdXIgYWNjb3VudCB3YXMgc3VjY2Vzc2Z1bGx5IGF1dGhvcml6ZWQ8L3N0cm9uZz4nKS5jb250ZW50cygpLnVud3JhcCgpO1xuICAgICAgICAgICAgICAgIHRoYXQuY2FsY3VsYXRlRmVlcyh0aGF0Lm9wdGlvbnMub3JpZ2luYWxfYW1vdW50LCAnYWNoJyk7IC8vIGNhbGN1bGF0ZSB0aGUgYWNoIGZlZXNcbiAgICAgICAgICAgICAgICAvLyBhZGQgdGhlIGZpZWxkKHMpIHdlIG5lZWQgdG8gdGhlIGZvcm0gZm9yIHN1Ym1pdHRpbmdcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5lcnJvcihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAkKG9wdGlvbnMucGxhaWRfbGluaykucGFyZW50KCkuYWZ0ZXIoJzxwIGNsYXNzPVwiZXJyb3JcIj4nICsgcmVzcG9uc2UuZXJyb3IgKyAnPC9wPicpXG4gICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICBcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9uRXhpdDogZnVuY3Rpb24oZXJyLCBtZXRhZGF0YSkge1xuICAgICAgICAgICAgLy8gVGhlIHVzZXIgZXhpdGVkIHRoZSBMaW5rIGZsb3cuXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICAgICQob3B0aW9ucy5wbGFpZF9saW5rLCBlbGVtZW50KS5jbGljayhmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgJChvcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yICsgJyAuZXJyb3InKS5yZW1vdmUoKTsgLy8gcmVtb3ZlIG1ldGhvZCBlcnJvciBtZXNzYWdlIGlmIGl0IGlzIHRoZXJlXG4gICAgICAgICAgbGlua0hhbmRsZXIub3BlbigpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LCAvLyBhY2hGaWVsZHNcblxuICAgIGhhc0h0bWw1VmFsaWRhdGlvbjogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgLy90aGlzLmRlYnVnKCd2YWx1ZSBpcyAnICsgdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykuY2hlY2tWYWxpZGl0eSA9PT0gJ2Z1bmN0aW9uJyk7XG4gICAgICByZXR1cm4gdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykuY2hlY2tWYWxpZGl0eSA9PT0gJ2Z1bmN0aW9uJztcbiAgICB9LFxuXG4gICAgYnV0dG9uU3RhdHVzOiBmdW5jdGlvbihvcHRpb25zLCBidXR0b24sIGRpc2FibGVkKSB7XG4gICAgICAvLyByZW1vdmUgdGhlIG9sZCB0b2tlbiBzbyB3ZSBjYW4gZ2VuZXJhdGUgYSBuZXcgb25lXG4gICAgICB2YXIgc3VwcG9ydGZvcm0gPSAkKG9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpO1xuICAgICAgJCgnaW5wdXRbbmFtZT1cInN0cmlwZVRva2VuXCJdJywgc3VwcG9ydGZvcm0pLnJlbW92ZSgpO1xuICAgICAgJCgnaW5wdXRbbmFtZT1cInBheW1lbnRfdHlwZVwiXScsIHN1cHBvcnRmb3JtKS5yZW1vdmUoKTtcbiAgICAgIGJ1dHRvbi5wcm9wKCdkaXNhYmxlZCcsIGRpc2FibGVkKTtcbiAgICAgIGlmIChkaXNhYmxlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgYnV0dG9uLnRleHQob3B0aW9ucy5idXR0b25fdGV4dCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBidXR0b24udGV4dCgnUHJvY2Vzc2luZycpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICB2YWxpZGF0ZUFuZFN1Ym1pdDogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgJChvcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5zdWJtaXQoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAvLyBkbyBzb21lIGZhbGxiYWNrIHN0dWZmIGZvciBub24taHRtbDUgYnJvd3NlcnNcbiAgICAgICAgaWYgKHRoYXQuaGFzSHRtbDVWYWxpZGF0aW9uKGVsZW1lbnQsIG9wdGlvbnMpKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuY2hlY2tWYWxpZGl0eSgpKSB7XG4gICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2ludmFsaWQnKTtcbiAgICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogJCh0aGlzKS5maW5kKCdpbnB1dDppbnZhbGlkJykucGFyZW50KCkub2Zmc2V0KCkudG9wXG4gICAgICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICAgICAgICAvL3RoaXMuZGVidWcoJ3RvcCBpcyAnICsgKTtcbiAgICAgICAgICAgICAgJCh0aGlzKS5maW5kKCdpbnB1dDppbnZhbGlkJykucGFyZW50KCkuYWRkQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpbnZhbGlkJyk7XG4gICAgICAgICAgICAgICQodGhpcykuZmluZCgnaW5wdXQ6aW52YWxpZCcpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdlcnJvcicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gdmFsaWRhdGUgYW5kIHN1Ym1pdCB0aGUgZm9ybVxuICAgICAgICAkKCcuY2hlY2stZmllbGQnKS5yZW1vdmUoKTtcbiAgICAgICAgJCgnaW5wdXQsIGxhYmVsJywgZWxlbWVudCkucmVtb3ZlQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgIHZhciB2YWxpZCA9IHRydWU7XG4gICAgICAgIHZhciBwYXltZW50X21ldGhvZCA9ICdjYXJkJztcbiAgICAgICAgaWYgKCQodGhhdC5vcHRpb25zLmNob29zZV9wYXltZW50KS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgcGF5bWVudF9tZXRob2QgPSAkKHRoYXQub3B0aW9ucy5jaG9vc2VfcGF5bWVudCArICcgaW5wdXQ6Y2hlY2tlZCcpLnZhbCgpO1xuICAgICAgICB9XG4gICAgICAgICQodGhhdC5vcHRpb25zLmNob29zZV9wYXltZW50ICsgJyBpbnB1dCcpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAkKHRoYXQub3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvciArICcgLmVycm9yJykucmVtb3ZlKCk7IC8vIHJlbW92ZSBtZXRob2QgZXJyb3IgbWVzc2FnZSBpZiBpdCBpcyB0aGVyZVxuICAgICAgICB9KTtcbiAgICAgICAgLy8gaWYgaXQgY2hhbmdlZCwgcmVzZXQgdGhlIGJ1dHRvblxuICAgICAgICB0aGF0LmJ1dHRvblN0YXR1cyhvcHRpb25zLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIGZhbHNlKTtcblxuICAgICAgICBpZiAocGF5bWVudF9tZXRob2QgPT09ICdhY2gnKSB7XG4gICAgICAgICAgaWYgKCQoJ2lucHV0W25hbWU9XCJiYW5rVG9rZW5cIl0nKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAkKHRoYXQub3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvcikucHJlcGVuZCgnPHAgY2xhc3M9XCJlcnJvclwiPllvdSBhcmUgcmVxdWlyZWQgdG8gZW50ZXIgY3JlZGl0IGNhcmQgaW5mb3JtYXRpb24sIG9yIHRvIGF1dGhvcml6ZSBNaW5uUG9zdCB0byBjaGFyZ2UgeW91ciBiYW5rIGFjY291bnQsIHRvIG1ha2UgYSBwYXltZW50LjwvcD4nKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsaWQgPT09IHRydWUpIHtcbiAgICAgICAgICAvLyAxLiBwcm9jZXNzIGRvbmF0aW9uIHRvIHN0cmlwZVxuICAgICAgICAgIHRoYXQuYnV0dG9uU3RhdHVzKHRoYXQub3B0aW9ucywgJCh0aGF0Lm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLmZpbmQoJ2J1dHRvbicpLCB0cnVlKTtcblxuICAgICAgICAgIHZhciB0b2tlbkRhdGEgPSB0aGF0LmdlbmVyYXRlVG9rZW5EYXRhKCk7XG5cbiAgICAgICAgICAvLyAyLiBjcmVhdGUgbWlubnBvc3QgYWNjb3VudCBpZiBzcGVjaWZpZWRcbiAgICAgICAgICBpZiAodGhhdC5vcHRpb25zLmNyZWF0ZV9hY2NvdW50ID09PSB0cnVlKSB7XG4gICAgICAgICAgICB2YXIgdXNlciA9IHtcbiAgICAgICAgICAgICAgZW1haWw6ICQodGhhdC5vcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICAgICAgZmlyc3RfbmFtZTogJCh0aGF0Lm9wdGlvbnMuZmlyc3RfbmFtZV9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgICAgIGxhc3RfbmFtZTogJCh0aGF0Lm9wdGlvbnMubGFzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICAgICAgcGFzc3dvcmQ6ICQodGhhdC5vcHRpb25zLnBhc3N3b3JkX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICAgICAgY2l0eTogJCh0aGF0Lm9wdGlvbnMuYWNjb3VudF9jaXR5X3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICAgICAgc3RhdGU6ICQodGhhdC5vcHRpb25zLmFjY291bnRfc3RhdGVfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgICAgICB6aXA6ICQodGhhdC5vcHRpb25zLmFjY291bnRfemlwX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgdXJsOiB0aGF0Lm9wdGlvbnMubWlubnBvc3Rfcm9vdCArICcvd3AtanNvbi91c2VyLWFjY291bnQtbWFuYWdlbWVudC92MS9jcmVhdGUtdXNlcicsXG4gICAgICAgICAgICAgIGRhdGE6IHVzZXJcbiAgICAgICAgICAgIH0pLmRvbmUoZnVuY3Rpb24oIGRhdGEgKSB7XG4gICAgICAgICAgICAgIGdyZWNhcHRjaGEucmVzZXQoKTtcbiAgICAgICAgICAgICAgaWYgKGRhdGEuc3RhdHVzID09PSAnc3VjY2VzcycgJiYgZGF0YS5yZWFzb24gPT09ICduZXcgdXNlcicpIHtcbiAgICAgICAgICAgICAgICAvLyB1c2VyIGNyZWF0ZWQgLSB0aGV5IHNob3VsZCByZWNlaXZlIGVtYWlsXG4gICAgICAgICAgICAgICAgLy8gc3VibWl0IHRoZSBmb3JtXG4gICAgICAgICAgICAgICAgLy9zdXBwb3J0Zm9ybS5nZXQoMCkuc3VibWl0KCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gdXNlciBub3QgY3JlYXRlZFxuICAgICAgICAgICAgICAgIC8vIHN0aWxsIHN1Ym1pdCB0aGUgZm9ybVxuICAgICAgICAgICAgICAgIC8vc3VwcG9ydGZvcm0uZ2V0KDApLnN1Ym1pdCgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoJCgnaW5wdXRbbmFtZT1cImJhbmtUb2tlblwiXScpLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAvLyBmaW5hbGx5LCBnZXQgYSB0b2tlbiBmcm9tIHN0cmlwZSwgYW5kIHRyeSB0byBjaGFyZ2UgaXQgaWYgaXQgaXMgbm90IGFjaFxuICAgICAgICAgICAgdGhhdC5jcmVhdGVUb2tlbih0aGF0LmNhcmROdW1iZXJFbGVtZW50LCB0b2tlbkRhdGEpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBpZiBpdCBpcyBhY2gsIHdlIGFscmVhZHkgaGF2ZSBhIHRva2VuIHNvIHBhc3MgaXQgdG8gc3RyaXBlLlxuICAgICAgICAgICAgdGhhdC5zdHJpcGVUb2tlbkhhbmRsZXIoICQoJyNiYW5rVG9rZW4nKS52YWwoKSwgJ2FjaCcgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gdGhpcyBtZWFucyB2YWxpZCBpcyBmYWxzZVxuICAgICAgICAgIHRoYXQuYnV0dG9uU3RhdHVzKHRoYXQub3B0aW9ucywgJCh0aGF0Lm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLmZpbmQoJ2J1dHRvbicpLCBmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgfSk7XG4gICAgfSwgLy8gdmFsaWRhdGVBbmRTdWJtaXRcblxuICAgIHN0cmlwZUVycm9yRGlzcGxheTogZnVuY3Rpb24oZXZlbnQsIHRoaXNfc2VsZWN0b3IsIGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIC8vIGxpc3RlbiBmb3IgZXJyb3JzIGFuZCBkaXNwbGF5L2hpZGUgZXJyb3IgbWVzc2FnZXNcbiAgICAgIHZhciB3aGljaF9lcnJvciA9IHRoaXNfc2VsZWN0b3IuYXR0cignaWQnKTtcbiAgICAgIGlmIChldmVudC5lcnJvcikge1xuICAgICAgICAkKCcuY2FyZC1pbnN0cnVjdGlvbi4nICsgd2hpY2hfZXJyb3IpLnRleHQoZXZlbnQuZXJyb3IubWVzc2FnZSArICcgUGxlYXNlIHRyeSBhZ2Fpbi4nKTtcbiAgICAgICAgJCgnLmNhcmQtaW5zdHJ1Y3Rpb24uJyArIHdoaWNoX2Vycm9yKS5hZGRDbGFzcygnaW52YWxpZCcpO1xuICAgICAgICB0aGlzX3NlbGVjdG9yLnBhcmVudCgpLmFkZENsYXNzKCdlcnJvcicpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJCgnLmNhcmQtaW5zdHJ1Y3Rpb24uJyArIHdoaWNoX2Vycm9yKS5yZW1vdmVDbGFzcygnaW52YWxpZCcpO1xuICAgICAgICAkKCcuY2FyZC1pbnN0cnVjdGlvbi4nICsgd2hpY2hfZXJyb3IpLmVtcHR5KCk7XG4gICAgICAgICQob3B0aW9ucy5jY19udW1fc2VsZWN0b3IsIGVsZW1lbnQpLnJlbW92ZUNsYXNzKCdlcnJvcicpO1xuICAgICAgICAkKG9wdGlvbnMuY2NfZXhwX3NlbGVjdG9yLCBlbGVtZW50KS5yZW1vdmVDbGFzcygnZXJyb3InKTtcbiAgICAgICAgJChvcHRpb25zLmNjX2N2dl9zZWxlY3RvciwgZWxlbWVudCkucmVtb3ZlQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICQob3B0aW9ucy5jY19udW1fc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdlcnJvcicpO1xuICAgICAgICAkKG9wdGlvbnMuY2NfZXhwX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnZXJyb3InKTtcbiAgICAgICAgJChvcHRpb25zLmNjX2N2dl9zZWxlY3RvciwgZWxlbWVudCkucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICB9XG4gICAgfSwgLy8gc3RyaXBlRXJyb3JEaXNwbGF5XG5cbiAgICBnZW5lcmF0ZVRva2VuRGF0YTogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgdG9rZW5EYXRhID0ge307XG5cbiAgICAgIHZhciBmdWxsX25hbWUgPSAnJztcbiAgICAgIGlmICgkKCcjZnVsbF9uYW1lJykubGVuZ3RoID4gMCkge1xuICAgICAgICBmdWxsX25hbWUgPSAkKCcjZnVsbF9uYW1lJykudmFsKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmdWxsX25hbWUgPSAkKCcjZmlyc3RfbmFtZScpLnZhbCgpICsgJyAnICsgJCgnI2xhc3RfbmFtZScpLnZhbCgpO1xuICAgICAgfVxuICAgICAgdG9rZW5EYXRhLm5hbWUgPSBmdWxsX25hbWU7XG5cbiAgICAgIHZhciBzdHJlZXQgPSAnTm9uZSc7XG4gICAgICBpZiAoJCgnaW5wdXRbbmFtZT1cImZ1bGxfYWRkcmVzc1wiXScpLnZhbCgpICE9ICcnKSB7XG4gICAgICAgIHN0cmVldCA9ICQoJyNmdWxsX2FkZHJlc3MnKS52YWwoKTtcbiAgICAgICAgaWYgKCQoJ2lucHV0W25hbWU9XCJiaWxsaW5nX3N0cmVldFwiXScpLnZhbCgpICE9ICcnKSB7XG4gICAgICAgICAgc3RyZWV0ID0gJCgnaW5wdXRbbmFtZT1cImJpbGxpbmdfc3RyZWV0XCJdJykudmFsKCk7XG4gICAgICAgIH1cbiAgICAgICAgdG9rZW5EYXRhLmFkZHJlc3NfbGluZTEgPSBzdHJlZXQ7XG4gICAgICB9XG5cbiAgICAgIHZhciBjaXR5ID0gJ05vbmUnO1xuICAgICAgaWYgKCQoJ2lucHV0W25hbWU9XCJiaWxsaW5nX2NpdHlcIl0nKS52YWwoKSAhPSAnJykge1xuICAgICAgICBjaXR5ID0gJCgnaW5wdXRbbmFtZT1cImJpbGxpbmdfY2l0eVwiXScpLnZhbCgpO1xuICAgICAgICB0b2tlbkRhdGEuYWRkcmVzc19jaXR5ID0gY2l0eTtcbiAgICAgIH1cblxuICAgICAgdmFyIHN0YXRlID0gJ05vbmUnO1xuICAgICAgaWYgKCQoJ2lucHV0W25hbWU9XCJiaWxsaW5nX3N0YXRlXCJdJykudmFsKCkgIT0gJycpIHtcbiAgICAgICAgc3RhdGUgPSAkKCdpbnB1dFtuYW1lPVwiYmlsbGluZ19zdGF0ZVwiXScpLnZhbCgpO1xuICAgICAgICB0b2tlbkRhdGEuYWRkcmVzc19zdGF0ZSA9IHN0YXRlO1xuICAgICAgfVxuXG4gICAgICB2YXIgemlwID0gJ05vbmUnO1xuICAgICAgaWYgKCQoJ2lucHV0W25hbWU9XCJiaWxsaW5nX3ppcFwiXScpLnZhbCgpICE9ICcnKSB7XG4gICAgICAgIHppcCA9ICQoJ2lucHV0W25hbWU9XCJiaWxsaW5nX3ppcFwiXScpLnZhbCgpO1xuICAgICAgICB0b2tlbkRhdGEuYWRkcmVzc196aXAgPSB6aXA7XG4gICAgICB9XG5cbiAgICAgIHZhciBjb3VudHJ5ID0gJ1VTJztcbiAgICAgIGlmICgkKCdpbnB1dFtuYW1lPVwiYmlsbGluZ19jb3VudHJ5XCJdJykudmFsKCkgIT0gJycpIHtcbiAgICAgICAgY291bnRyeSA9ICQoJ2lucHV0W25hbWU9XCJiaWxsaW5nX2NvdW50cnlcIl0nKS52YWwoKTtcbiAgICAgIH1cbiAgICAgIHRva2VuRGF0YS5hZGRyZXNzX2NvdW50cnkgPSBjb3VudHJ5O1xuXG4gICAgICByZXR1cm4gdG9rZW5EYXRhO1xuICAgIH0sIC8vIGdlbmVyYXRlVG9rZW5EYXRhXG5cbiAgICBjcmVhdGVUb2tlbjogZnVuY3Rpb24oY2FyZCwgdG9rZW5EYXRhKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB0aGF0LnN0cmlwZS5jcmVhdGVUb2tlbihjYXJkLCB0b2tlbkRhdGEpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgIGlmIChyZXN1bHQuZXJyb3IpIHtcbiAgICAgICAgICAvLyBTaG93IHRoZSBlcnJvcnMgb24gdGhlIGZvcm1cbiAgICAgICAgICB0aGF0LmJ1dHRvblN0YXR1cyh0aGF0Lm9wdGlvbnMsICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKSwgZmFsc2UpO1xuICAgICAgICAgIHZhciBmaWVsZCA9IHJlc3VsdC5lcnJvci5maWVsZCArICdfZmllbGRfc2VsZWN0b3InO1xuICAgICAgICAgIHZhciBtZXNzYWdlID0gJyc7XG4gICAgICAgICAgaWYgKHR5cGVvZiByZXN1bHQuZXJyb3IubWVzc2FnZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIG1lc3NhZ2UgPSByZXN1bHQuZXJyb3IubWVzc2FnZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWVzc2FnZSA9IHJlc3VsdC5lcnJvci5tZXNzYWdlWzBdO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoJChmaWVsZCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgJCh0aGF0Lm9wdGlvbnNbZmllbGRdLCBlbGVtZW50KS5hZGRDbGFzcygnZXJyb3InKTtcbiAgICAgICAgICAgICQodGhhdC5vcHRpb25zW2ZpZWxkXSwgZWxlbWVudCkucHJldigpLmFkZENsYXNzKCdlcnJvcicpO1xuICAgICAgICAgICAgJCh0aGF0Lm9wdGlvbnNbZmllbGRdLCBlbGVtZW50KS5hZnRlcignPHNwYW4gY2xhc3M9XCJjaGVjay1maWVsZCBpbnZhbGlkXCI+JyArIG1lc3NhZ2UgKyAnPC9zcGFuPicpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBTZW5kIHRoZSB0b2tlbiB0byB5b3VyIHNlcnZlclxuICAgICAgICAgIHRoYXQuc3RyaXBlVG9rZW5IYW5kbGVyKHJlc3VsdC50b2tlbiwgJ2NhcmQnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSwgLy8gY3JlYXRlVG9rZW5cblxuICAgIHN0cmlwZVRva2VuSGFuZGxlcjogZnVuY3Rpb24odG9rZW4sIHR5cGUpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHZhciBzdXBwb3J0Zm9ybSA9ICQodGhpcy5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKTtcbiAgICAgIHZhciBmb3JtX2RhdGFfYWN0aW9uID0gJyc7XG4gICAgICBpZiAodHlwZW9mICQoc3VwcG9ydGZvcm0pLmRhdGEoJ2FjdGlvbicpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBmb3JtX2RhdGFfYWN0aW9uID0gJChzdXBwb3J0Zm9ybSkuZGF0YSgnYWN0aW9uJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3JtX2RhdGFfYWN0aW9uID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xuICAgICAgfVxuICAgICAgLy8gSW5zZXJ0IHRoZSB0b2tlbiBJRCBpbnRvIHRoZSBmb3JtIHNvIGl0IGdldHMgc3VibWl0dGVkIHRvIHRoZSBzZXJ2ZXJcbiAgICAgIGlmICggdHlwZSA9PT0gJ2NhcmQnICkge1xuICAgICAgICBzdXBwb3J0Zm9ybS5hcHBlbmQoJCgnPGlucHV0IHR5cGU9XFxcImhpZGRlblxcXCIgbmFtZT1cXFwic3RyaXBlVG9rZW5cXFwiPicpLnZhbCh0b2tlbi5pZCkpO1xuICAgICAgICBpZiAoJCgnaW5wdXRbbmFtZT1cInBheW1lbnRfdHlwZVwiXScpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAkKCdpbnB1dFtuYW1lPVwicGF5bWVudF90eXBlXCJdJykudmFsKHRva2VuLmNhcmQuYnJhbmQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN1cHBvcnRmb3JtLmFwcGVuZCgkKCc8aW5wdXQgdHlwZT1cXFwiaGlkZGVuXFxcIiBuYW1lPVxcXCJwYXltZW50X3R5cGVcXFwiIC8+JykudmFsKHRva2VuLmNhcmQuYnJhbmQpKTsgIFxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKCB0eXBlID09PSAnYWNoJyApIHtcbiAgICAgICAgaWYgKCQoJ2lucHV0W25hbWU9XCJwYXltZW50X3R5cGVcIl0nKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgJCgnaW5wdXRbbmFtZT1cInBheW1lbnRfdHlwZVwiXScpLnZhbCh0eXBlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdXBwb3J0Zm9ybS5hcHBlbmQoJCgnPGlucHV0IHR5cGU9XFxcImhpZGRlblxcXCIgbmFtZT1cXFwicGF5bWVudF90eXBlXFxcIiAvPicpLnZhbCh0eXBlKSk7ICBcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBTdWJtaXQgdGhlIGZvcm1cbiAgICAgICQuYWpheCh7XG4gICAgICAgIHVybDogZm9ybV9kYXRhX2FjdGlvbixcbiAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICBkYXRhOiAkKHN1cHBvcnRmb3JtKS5zZXJpYWxpemUoKSxcbiAgICAgICAgdHlwZTogJ1BPU1QnXG4gICAgICB9KVxuICAgICAgLmRvbmUoZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKHR5cGVvZiByZXNwb25zZS5lcnJvcnMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgLy8gZG8gbm90IHN1Ym1pdC4gdGhlcmUgaXMgYW4gZXJyb3IuXG4gICAgICAgICAgdGhhdC5idXR0b25TdGF0dXModGhhdC5vcHRpb25zLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIGZhbHNlKTtcbiAgICAgICAgICAvLyBhZGQgc29tZSBlcnJvciBtZXNzYWdlcyBhbmQgc3R5bGVzXG4gICAgICAgICAgJC5lYWNoKHJlc3BvbnNlLmVycm9ycywgZnVuY3Rpb24oIGluZGV4LCBlcnJvciApIHtcbiAgICAgICAgICAgIHZhciBmaWVsZCA9IGVycm9yLmZpZWxkICsgJ19maWVsZF9zZWxlY3Rvcic7XG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9ICcnO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBlcnJvci5tZXNzYWdlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICBtZXNzYWdlID0gZXJyb3IubWVzc2FnZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIG1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlWzBdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCQodGhhdC5vcHRpb25zW2ZpZWxkXSkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAkKHRoYXQub3B0aW9uc1tmaWVsZF0pLmFkZENsYXNzKCdlcnJvcicpO1xuICAgICAgICAgICAgICAkKHRoYXQub3B0aW9uc1tmaWVsZF0pLnByZXYoKS5hZGRDbGFzcygnZXJyb3InKTtcbiAgICAgICAgICAgICAgJCh0aGF0Lm9wdGlvbnNbZmllbGRdKS5hZnRlcignPHNwYW4gY2xhc3M9XCJjaGVjay1maWVsZCBpbnZhbGlkXCI+JyArIG1lc3NhZ2UgKyAnPC9zcGFuPicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGVycm9yICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICB0aGF0LmJ1dHRvblN0YXR1cyh0aGF0Lm9wdGlvbnMsICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKSwgZmFsc2UpO1xuICAgICAgICAgICAgICBpZiAoZXJyb3IuY29kZSA9PSAnaW52YWxpZF9udW1iZXInIHx8IGVycm9yLmNvZGUgPT0gJ2luY29ycmVjdF9udW1iZXInIHx8IGVycm9yLmNvZGUgPT0gJ2NhcmRfZGVjbGluZWQnIHx8IGVycm9yLmNvZGUgPT0gJ3Byb2Nlc3NpbmdfZXJyb3InKSB7XG4gICAgICAgICAgICAgICAgLy8gZXJyb3IgaGFuZGxpbmdcbiAgICAgICAgICAgICAgICB0aGF0LnN0cmlwZUVycm9yRGlzcGxheShyZXNwb25zZS5lcnJvcnMsICQodGhhdC5vcHRpb25zLmNjX251bV9zZWxlY3RvciksIHRoYXQuZWxlbWVudCwgdGhhdC5vcHRpb25zICk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAoZXJyb3IuY29kZSA9PSAnaW52YWxpZF9leHBpcnlfbW9udGgnIHx8IGVycm9yLmNvZGUgPT0gJ2ludmFsaWRfZXhwaXJ5X3llYXInIHx8IGVycm9yLmNvZGUgPT0gJ2V4cGlyZWRfY2FyZCcpIHtcbiAgICAgICAgICAgICAgICAvLyBlcnJvciBoYW5kbGluZ1xuICAgICAgICAgICAgICAgIHRoYXQuc3RyaXBlRXJyb3JEaXNwbGF5KHJlc3BvbnNlLmVycm9ycywgJCh0aGF0Lm9wdGlvbnMuY2NfZXhwX3NlbGVjdG9yKSwgdGhhdC5lbGVtZW50LCB0aGF0Lm9wdGlvbnMgKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmIChlcnJvci5jb2RlID09ICdpbnZhbGlkX2N2YycgfHwgZXJyb3IuY29kZSA9PSAnaW5jb3JyZWN0X2N2YycpIHtcbiAgICAgICAgICAgICAgICAvLyBlcnJvciBoYW5kbGluZ1xuICAgICAgICAgICAgICAgIHRoYXQuc3RyaXBlRXJyb3JEaXNwbGF5KHJlc3BvbnNlLmVycm9ycywgJCh0aGF0Lm9wdGlvbnMuY2NfY3Z2X3NlbGVjdG9yKSwgdGhhdC5lbGVtZW50LCB0aGF0Lm9wdGlvbnMgKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmIChlcnJvci5maWVsZCA9PSAncmVjYXB0Y2hhJykge1xuICAgICAgICAgICAgICAgICQoJ2J1dHRvbi5naXZlJykuYmVmb3JlKCc8cCBjbGFzcz1cInJlY2FwdGNoYS1lcnJvclwiPicgKyBtZXNzYWdlICsgJzwvcD4nKVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKGVycm9yLnR5cGUgPT0gJ2ludmFsaWRfcmVxdWVzdF9lcnJvcicpIHtcbiAgICAgICAgICAgICAgICAkKCdidXR0b24uZ2l2ZScpLmJlZm9yZSgnPHAgY2xhc3M9XCJlcnJvclwiPicgKyBlcnJvci5tZXNzYWdlICsgJzwvcD4nKVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHR5cGVvZiByZXNwb25zZS5lcnJvcnNbMF0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgIHZhciBmaWVsZCA9IHJlc3BvbnNlLmVycm9yc1swXS5maWVsZCArICdfZmllbGRfc2VsZWN0b3InO1xuICAgICAgICAgICAgICBpZiAoJChmaWVsZCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogJChvcHRpb25zW2ZpZWxkXSkucGFyZW50KCkub2Zmc2V0KCkudG9wXG4gICAgICAgICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN1cHBvcnRmb3JtLmdldCgwKS5zdWJtaXQoKTsgLy8gY29udGludWUgc3VibWl0dGluZyB0aGUgZm9ybVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLmVycm9yKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgIHRoYXQuYnV0dG9uU3RhdHVzKHRoYXQub3B0aW9ucywgJCh0aGF0Lm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLmZpbmQoJ2J1dHRvbicpLCBmYWxzZSk7XG4gICAgICB9KTtcblxuICAgIH0sXG5cbiAgICBzaG93TmV3c2xldHRlclNldHRpbmdzOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG5cbiAgICAgIHZhciBuZXdzbGV0dGVyX2dyb3VwX2h0bWwgPSAnJztcbiAgICAgIGlmICgkKG9wdGlvbnMubmV3c2xldHRlcl9ncm91cF9zZWxlY3RvcikubGVuZ3RoID4gMCApIHtcbiAgICAgICAgdmFyIGdldF9kYXRhID0ge1xuICAgICAgICAgIHNob3J0Y29kZTogJ25ld3NsZXR0ZXJfZm9ybScsXG4gICAgICAgICAgcGxhY2VtZW50OiAndXNlcmFjY291bnQnXG4gICAgICAgIH07XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICB1cmw6IG9wdGlvbnMubWlubnBvc3Rfcm9vdCArICcvd3AtanNvbi9taW5ucG9zdC1hcGkvdjIvbWFpbGNoaW1wL2Zvcm0nLFxuICAgICAgICAgIGRhdGE6IGdldF9kYXRhXG4gICAgICAgIH0pLmRvbmUoZnVuY3Rpb24oIHJlc3VsdCApIHtcbiAgICAgICAgICBpZiAoIHR5cGVvZiByZXN1bHQuZ3JvdXBfZmllbGRzICE9PSAndW5kZWZpbmVkJyApIHtcbiAgICAgICAgICAgICQuZWFjaChyZXN1bHQuZ3JvdXBfZmllbGRzLCBmdW5jdGlvbiggaW5kZXgsIGNhdGVnb3J5ICkge1xuICAgICAgICAgICAgICBuZXdzbGV0dGVyX2dyb3VwX2h0bWwgKz0gJzxmaWVsZHNldCBjbGFzcz1cIm0tZm9ybS1pdGVtIHN1cHBvcnQtbmV3c2xldHRlciBtLWZvcm0taXRlbS0nICsgY2F0ZWdvcnkudHlwZSArICdcIj4nO1xuICAgICAgICAgICAgICBuZXdzbGV0dGVyX2dyb3VwX2h0bWwgKz0gJzxsYWJlbD4nICsgY2F0ZWdvcnkubmFtZSArICc6PC9sYWJlbD4nO1xuICAgICAgICAgICAgICBpZiAoIGNhdGVnb3J5LmNvbnRhaW5zLmxlbmd0aCA+IDAgKSB7XG4gICAgICAgICAgICAgICAgbmV3c2xldHRlcl9ncm91cF9odG1sICs9ICc8ZGl2IGNsYXNzPVwiZm9ybS1pdGVtIGZvcm0taXRlbS0tbmV3c2xldHRlclwiPic7XG4gICAgICAgICAgICAgICAgJC5lYWNoKGNhdGVnb3J5W2NhdGVnb3J5LmNvbnRhaW5zXSwgZnVuY3Rpb24oIGluZGV4LCBpdGVtICkge1xuICAgICAgICAgICAgICAgICAgbmV3c2xldHRlcl9ncm91cF9odG1sICs9ICc8bGFiZWw+PGlucHV0IG5hbWU9XCJncm91cHNfc3VibWl0dGVkW11cIiB0eXBlPVwiY2hlY2tib3hcIiB2YWx1ZT1cIicgKyBpdGVtLmlkICsgJ1wiPicgKyBpdGVtLm5hbWUgKyAnPC9sYWJlbD4nO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIG5ld3NsZXR0ZXJfZ3JvdXBfaHRtbCArPSAnPC9kaXY+JztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBuZXdzbGV0dGVyX2dyb3VwX2h0bWwgKz0gJzwvZmllbGRzZXQ+JztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJChvcHRpb25zLm5ld3NsZXR0ZXJfZ3JvdXBfc2VsZWN0b3IpLmh0bWwobmV3c2xldHRlcl9ncm91cF9odG1sKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoJChvcHRpb25zLm5ld3NsZXR0ZXJfZ3JvdXBfc2VsZWN0b3IpLmxlbmd0aCA+IDAgJiYgdHlwZW9mICQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHZhciBnZXRfZGF0YSA9IHtcbiAgICAgICAgICBlbWFpbDogJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKVxuICAgICAgICB9O1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgdXJsOiBvcHRpb25zLm1pbm5wb3N0X3Jvb3QgKyAnL3dwLWpzb24vbWlubnBvc3QtYXBpL3YyL21haWxjaGltcC91c2VyJyxcbiAgICAgICAgICBkYXRhOiBnZXRfZGF0YVxuICAgICAgICB9KS5kb25lKGZ1bmN0aW9uKCByZXN1bHQgKSB7XG4gICAgICAgICAgaWYgKCB0eXBlb2YgcmVzdWx0Lm1haWxjaGltcF9zdGF0dXMgIT09ICd1bmRlZmluZWQnICkge1xuICAgICAgICAgICAgJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5hZnRlcignPGlucHV0IG5hbWU9XCJtYWlsY2hpbXBfc3RhdHVzXCIgdHlwZT1cImhpZGRlblwiIHZhbHVlPVwiJyArIHJlc3VsdC5tYWlsY2hpbXBfc3RhdHVzICsgJ1wiPicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIHR5cGVvZiByZXN1bHQubWFpbGNoaW1wX3VzZXJfaWQgIT09ICd1bmRlZmluZWQnICkge1xuICAgICAgICAgICAgJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5hZnRlcignPGlucHV0IG5hbWU9XCJtYWlsY2hpbXBfdXNlcl9pZFwiIHR5cGU9XCJoaWRkZW5cIiB2YWx1ZT1cIicgKyByZXN1bHQubWFpbGNoaW1wX3VzZXJfaWQgKyAnXCI+Jyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChyZXN1bHQubWFpbGNoaW1wX3N0YXR1cyA9PT0gJ3N1YnNjcmliZWQnKSB7XG4gICAgICAgICAgICAvLyB1c2VyIGNyZWF0ZWQgLSBzaG93IGEgc3VjY2VzcyBtZXNzYWdlXG4gICAgICAgICAgICAkKCcuY29uZmlybS1pbnN0cnVjdGlvbnMnKS50ZXh0KCQoJy5jb25maXJtLWluc3RydWN0aW9ucycpLmF0dHIoJ2RhdGEta25vd24tdXNlcicpKTtcbiAgICAgICAgICAgIHZhciBncm91cHMgPSByZXN1bHQuZ3JvdXBzO1xuICAgICAgICAgICAgJC5lYWNoKGdyb3VwcywgZnVuY3Rpb24oIGluZGV4LCB2YWx1ZSApIHtcbiAgICAgICAgICAgICAgaWYgKCB2YWx1ZSA9PT0gdHJ1ZSApIHtcbiAgICAgICAgICAgICAgICAkKCc6Y2hlY2tib3hbdmFsdWU9XCInICsgaW5kZXggKyAnXCJdJykucHJvcCgnY2hlY2tlZCcsdHJ1ZSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJCgnOmNoZWNrYm94W3ZhbHVlPVwiJyArIGluZGV4ICsgJ1wiXScpLnByb3AoJ2NoZWNrZWQnLGZhbHNlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgIH0sIC8vIHNob3dOZXdzbGV0dGVyU2V0dGluZ3NcblxuICAgIGNvbmZpcm1NZXNzYWdlU3VibWl0OiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG5cbiAgICAgIHZhciBleGlzdGluZ19uZXdzbGV0dGVyX3NldHRpbmdzID0gJChvcHRpb25zLm5ld3NsZXR0ZXJfZ3JvdXBfc2VsZWN0b3IgKyAnIGlucHV0Jykuc2VyaWFsaXplKCk7XG4gICAgICAvL3RoaXMuZGVidWcoZXhpc3RpbmdfbmV3c2xldHRlcl9zZXR0aW5ncyk7XG5cbiAgICAgICQob3B0aW9ucy5jb25maXJtX2Zvcm1fc2VsZWN0b3IpLnN1Ym1pdChmdW5jdGlvbihldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIHZhciBjb25maXJtZm9ybSA9ICQob3B0aW9ucy5jb25maXJtX2Zvcm1fc2VsZWN0b3IpO1xuICAgICAgICAvLyBzdWJtaXQgc2V0dGluZ3MgdG8gbWFpbGNoaW1wXG4gICAgICAgIC8vIG5lZWQgdG8gZ2V0IHVzZXIgaW5mbyBvbiBhIGhpZGRlbiBmaWVsZCBoZXJlXG5cbiAgICAgICAgdmFyIG5ld3NsZXR0ZXJfZ3JvdXBzID0gJChvcHRpb25zLm5ld3NsZXR0ZXJfZ3JvdXBfc2VsZWN0b3IgKyAnIGlucHV0OmNoZWNrZWQnKTtcbiAgICAgICAgdmFyIG5ld19uZXdzbGV0dGVyX3NldHRpbmdzID0gbmV3c2xldHRlcl9ncm91cHMuc2VyaWFsaXplKCk7XG5cbiAgICAgICAgaWYgKChleGlzdGluZ19uZXdzbGV0dGVyX3NldHRpbmdzICE9PSBuZXdfbmV3c2xldHRlcl9zZXR0aW5ncykgJiYgKHR5cGVvZiBuZXdzbGV0dGVyX2dyb3VwcyAhPT0gJ3VuZGVmaW5lZCcpKSB7XG4gICAgICAgICAgLy9hZGQgb3VyIG93biBhamF4IGNoZWNrIGFzIFgtUmVxdWVzdGVkLVdpdGggaXMgbm90IGFsd2F5cyByZWxpYWJsZVxuICAgICAgICAgIC8vYWpheF9mb3JtX2RhdGEgPSBuZXdfbmV3c2xldHRlcl9zZXR0aW5ncyArICcmYWpheHJlcXVlc3Q9dHJ1ZSZzdWJzY3JpYmUnO1xuXG4gICAgICAgICAgdmFyIHBvc3RfZGF0YSA9IHtcbiAgICAgICAgICAgIGVtYWlsOiAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgICAgZmlyc3RfbmFtZTogJChvcHRpb25zLmZpcnN0X25hbWVfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgICAgbGFzdF9uYW1lOiAkKG9wdGlvbnMubGFzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICAgIGdyb3Vwc19zdWJtaXR0ZWQ6IHt9XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHBvc3RfZGF0YS5ncm91cHNfYXZhaWxhYmxlID0gJ2FsbCc7XG5cbiAgICAgICAgICBpZiAoICQoJ2lucHV0W25hbWU9XCJtYWlsY2hpbXBfc3RhdHVzXCJdJykubGVuZ3RoID4gMCApIHtcbiAgICAgICAgICAgIHBvc3RfZGF0YS5tYWlsY2hpbXBfc3RhdHVzID0gJCgnaW5wdXRbbmFtZT1cIm1haWxjaGltcF9zdGF0dXNcIl0nKS52YWwoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoICQoJ2lucHV0W25hbWU9XCJtYWlsY2hpbXBfdXNlcl9pZFwiXScpLmxlbmd0aCA+IDAgKSB7XG4gICAgICAgICAgICBwb3N0X2RhdGEubWFpbGNoaW1wX3VzZXJfaWQgPSAkKCdpbnB1dFtuYW1lPVwibWFpbGNoaW1wX3VzZXJfaWRcIl0nKS52YWwoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodHlwZW9mIG5ld3NsZXR0ZXJfZ3JvdXBzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgJC5lYWNoKG5ld3NsZXR0ZXJfZ3JvdXBzLCBmdW5jdGlvbihpbmRleCwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgdmFyIGdyb3VwID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgICAgICAgcG9zdF9kYXRhLmdyb3Vwc19zdWJtaXR0ZWRbaW5kZXhdID0gZ3JvdXA7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBvcHRpb25zLm1pbm5wb3N0X3Jvb3QgKyAnL3dwLWpzb24vbWlubnBvc3QtYXBpL3YyL21haWxjaGltcC91c2VyJyxcbiAgICAgICAgICAgIHR5cGU6ICdwb3N0JyxcbiAgICAgICAgICAgIGRhdGFUeXBlIDogJ2pzb24nLFxuICAgICAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04JyxcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHBvc3RfZGF0YSlcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5kb25lKGZ1bmN0aW9uKHJlc3BvbnNlKSB7IC8vIHJlc3BvbnNlIGZyb20gdGhlIFBIUCBhY3Rpb25cbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gJyc7XG4gICAgICAgICAgICBpZiAoIHJlc3BvbnNlLnN1Y2Nlc3MgPT09IHRydWUgKSB7XG4gICAgICAgICAgICAgIC8qc3dpdGNoIChyZXNwb25zZS5kYXRhLnVzZXJfc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnZXhpc3RpbmcnOlxuICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9ICdUaGFua3MgZm9yIHVwZGF0aW5nIHlvdXIgZW1haWwgcHJlZmVyZW5jZXMuIFRoZXkgd2lsbCBnbyBpbnRvIGVmZmVjdCBpbW1lZGlhdGVseS4nO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbmV3JzpcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnV2UgaGF2ZSBhZGRlZCB5b3UgdG8gdGhlIE1pbm5Qb3N0IG1haWxpbmcgbGlzdC4nO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncGVuZGluZyc6XG4gICAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ1dlIGhhdmUgYWRkZWQgeW91IHRvIHRoZSBNaW5uUG9zdCBtYWlsaW5nIGxpc3QuIFlvdSB3aWxsIG5lZWQgdG8gY2xpY2sgdGhlIGNvbmZpcm1hdGlvbiBsaW5rIGluIHRoZSBlbWFpbCB3ZSBzZW50IHRvIGJlZ2luIHJlY2VpdmluZyBtZXNzYWdlcy4nO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH0qL1xuICAgICAgICAgICAgICAvL2NvbmZpcm1mb3JtLmdldCgwKS5zdWJtaXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbmZpcm1mb3JtLmdldCgwKS5zdWJtaXQoKTtcbiAgICAgICAgICAgIC8vJCgnLm0taG9sZC1tZXNzYWdlJykuaHRtbCgnPGRpdiBjbGFzcz1cIm0tZm9ybS1tZXNzYWdlIG0tZm9ybS1tZXNzYWdlLWluZm9cIj4nICsgbWVzc2FnZSArICc8L2Rpdj4nKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAvLyB3ZSBzaG91bGQgcHV0IGFuIGFjdHVhbCBlcnJvciBtZXNzYWdlIGhlcmUgc29tZWRheSwgcHJvYmFibHlcbiAgICAgICAgICAgIC8vJCgnLm0taG9sZC1tZXNzYWdlJykuaHRtbCgnPGRpdiBjbGFzcz1cIm0tZm9ybS1tZXNzYWdlIG0tZm9ybS1tZXNzYWdlLWluZm9cIj5BbiBlcnJvciBoYXMgb2NjdXJlZC4gUGxlYXNlIHRyeSBhZ2Fpbi48L2Rpdj4nKTtcbiAgICAgICAgICAgIGNvbmZpcm1mb3JtLmdldCgwKS5zdWJtaXQoKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICB9IGVsc2UgeyAvLyBlbmQgcGFydCB3aGVyZSBzZXR0aW5ncyBjaGFuZ2VkXG4gICAgICAgICAgY29uZmlybWZvcm0uZ2V0KDApLnN1Ym1pdCgpO1xuICAgICAgICB9XG5cbiAgICAgIH0pO1xuICAgICAgLy9yZXR1cm4gZmFsc2U7XG4gICAgfSwgLy8gY29uZmlybU1lc3NhZ2VTdWJtaXRcblxuICB9OyAvLyBwbHVnaW4ucHJvdG90eXBlXG5cbiAgLy8gQSByZWFsbHkgbGlnaHR3ZWlnaHQgcGx1Z2luIHdyYXBwZXIgYXJvdW5kIHRoZSBjb25zdHJ1Y3RvcixcbiAgLy8gcHJldmVudGluZyBhZ2FpbnN0IG11bHRpcGxlIGluc3RhbnRpYXRpb25zXG4gICQuZm5bcGx1Z2luTmFtZV0gPSBmdW5jdGlvbiAoIG9wdGlvbnMgKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoISQuZGF0YSh0aGlzLCAncGx1Z2luXycgKyBwbHVnaW5OYW1lKSkge1xuICAgICAgICAkLmRhdGEodGhpcywgJ3BsdWdpbl8nICsgcGx1Z2luTmFtZSwgbmV3IFBsdWdpbiggdGhpcywgb3B0aW9ucyApKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxufSkoIGpRdWVyeSwgd2luZG93LCBkb2N1bWVudCApOyJdfQ==
