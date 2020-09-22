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
    'pay_cc_processing_selector': 'input[id="pay-fees"]',
    'fee_amount': '.processing-amount',
    'level_amount_selector': '#panel--pay .amount .level-amount',
    // we can maybe get rid of this
    'original_amount_selector': '[name="amount"]',
    'intent_secret_selector': '#intent',
    'fair_market_value_selector': '#fair_market_value',
    'frequency_selector': '.frequency',
    'full_amount_selector': '.full-amount',
    'name_selector': '.m-form-item-display-name',
    'in_honor_or_memory_field_selector': '.m-form-item-honor-memory',
    'honor_or_memory_chooser': 'input[name="in_honor_or_memory"]',
    // radio fields
    'honor_type_selector': '.a-honor-type',
    // span inside label
    'honor_memory_input_group': '.a-honor-or-memory',
    // holds the form field
    'notify_selector': '.notify_someone',
    'notify_field_selector': '.m-form-item-notify',
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
    'account_city_selector': '#billing_city',
    'account_state_selector': '#billing_state',
    'account_zip_selector': '#billing_zip',
    'create_mp_selector': '#creatempaccount',
    'password_selector': '.m-form-item-password',
    'additional_amount_field': '#additional_donation',
    'billing_selector': 'fieldset.m-billing-information',
    'shipping_selector': 'fieldset.m-shipping-information',
    'credit_card_fieldset': '.m-form-group-payment',
    'choose_payment': '#choose-payment-method',
    'payment_method_selector': '.payment-method',
    'cc_num_selector': '#card-number',
    'cc_exp_selector': '#card-expiry',
    'cc_cvv_selector': '#card-cvc',
    'confirm_button_selector': '#finish',
    'pay_button_selector': '.a-button-pay',
    'opp_id_selector': '#lock_key',
    // we use this value as the Google Analytics transaction ID
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
      this.options.frequency = parseFloat($(this.options.frequency_selector, this.element).attr('data-year-freq'));
      var recurring = $(this.options.recurring_selector, this.element).val();

      if (typeof recurring !== 'undefined') {
        this.options.recurring = recurring.charAt(0).toUpperCase() + recurring.slice(1);
      }

      this.options.processing_fee = (Math.round(parseFloat(this.options.fee_amount) * Math.pow(10, 2)) / Math.pow(10, 2)).toFixed(2);
      this.options.processing_fee_text = this.options.processing_fee;
      this.options.cardType = null;
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

        this.allowMinnpostAccount(this.element, this.options); // option for creating minnpost account

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

      this.analyticsTrackingStep(step, post_purchase); // activate the nav tabs

      if ($('.progress--donation li .active').length === 0) {
        $('#' + active).show();
        $('.progress--donation li.' + active + ' a').addClass('active');
      } else {
        active = $('.progress--donation li .active').parent().prop('class');
        $('#' + active).show();
      }
    },
    // tabNavigation
    analyticsTrackingStep: function analyticsTrackingStep(step, post_purchase) {
      var level = this.checkLevel(this.element, this.options, 'name'); // check what level it is

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
      var payment_type = $(options.choose_payment + ' input').val(); // set the fair market value if applicable

      var amount_selector_fair_market = $(options.original_amount_selector, element);

      if (amount_selector_fair_market.is(':radio')) {
        amount_selector_fair_market = $(options.original_amount_selector + ':checked', element);
      }

      that.setFairMarketValue(amount_selector_fair_market);
      that.setPaymentIntent();
      $(options.original_amount_selector, element).change(function () {
        that.options.original_amount = parseInt($(this, element).val(), 10);

        if (payment_type === 'bank_account') {
          that.calculateFees(that.options.original_amount, 'bank_account');
          that.setPaymentIntent();
        } else {
          that.calculateFees(that.options.original_amount, 'card');
          that.setPaymentIntent();
        }

        that.setFairMarketValue($(this, element));
      });
      $(options.additional_amount_field, element).change(function () {
        that.options.original_amount = parseInt($(options.original_amount_selector, element).val(), 10);

        if (payment_type === 'bank_account') {
          that.calculateFees(that.options.original_amount, 'bank_account');
          that.setPaymentIntent();
        } else {
          that.calculateFees(that.options.original_amount, 'card');
          that.setPaymentIntent();
        }
      });
    },
    // amountUpdated
    setPaymentIntent: function setPaymentIntent() {
      var amount = this.getTotalAmount();
      var payment_type = $(this.options.choose_payment + ' input').val();
      var pay_fees = false;
      var field = $(this.options.pay_cc_processing_selector);

      if ($(field).is(':checked') || $(field).prop('checked')) {
        pay_fees = true;
      }

      var that = this;
      var intentData = {
        amount: amount,
        payment_type: payment_type,
        pay_fees: pay_fees,
        currency: 'usd'
      };
      $.ajax({
        method: 'POST',
        url: '/get-payment-intent/',
        data: intentData
      }).done(function (result) {
        $(that.options.intent_secret_selector).val(result.clientSecret);
      });
    },
    // setPaymentIntent
    getPaymentIntent: function getPaymentIntent() {
      var intent;
      intent = $(this.options.intent_secret_selector).val();
      return intent;
    },
    // getPaymentIntent
    getTotalAmount: function getTotalAmount(amount) {
      amount = typeof amount !== 'undefined' ? amount : this.options.original_amount;
      var total_amount = amount;

      if ($(this.options.additional_amount_field).length > 0 && $(this.options.additional_amount_field).val() > 0) {
        var additional_amount = $(this.options.additional_amount_field).val();
        total_amount = parseInt(additional_amount, 10) + parseInt(amount, 10);
      }

      return total_amount;
    },
    //getTotalAmount
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
    creditCardProcessingFees: function creditCardProcessingFees(options, reset) {
      // this adds or subtracts the fee to the original amount when the user indicates they do or do not want to pay the fees
      var that = this;
      that.creditCardFeeCheckbox($(this.options.pay_cc_processing_selector));
      $(this.options.pay_cc_processing_selector).on('change', function () {
        that.creditCardFeeCheckbox(this);
        that.setPaymentIntent();
      });
    },
    // creditCardProcessingFees
    setStripePaymentType: function setStripePaymentType(stripe_payment_type) {
      if ($('input[name="stripe_payment_type"]').length === 0) {
        $(this.options.donate_form_selector).append('<input type=\"hidden\" name=\"stripe_payment_type\">');
      }

      $('input[name="stripe_payment_type"]').val(stripe_payment_type);
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

      $(that.options.full_amount_selector).text(parseFloat(full_amount).toFixed(2));
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
    checkLevel: function checkLevel(element, options, returnvalue) {
      // we could maybe get rid of this if we could move this part into wordpress
      var level = '';
      var levelnum = 0;
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
            return false;
          }
        } else if (typeof max !== 'undefined') {
          if (amount_yearly < max) {
            level = name;
            levelnum = num;
            return false;
          }
        } else if (typeof min !== 'undefined') {
          if (amount_yearly >= min) {
            level = name;
            levelnum = num;
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
    choosePaymentMethod: function choosePaymentMethod(element, options) {
      var that = this;

      if ($(options.choose_payment).length > 0) {
        if ($(options.choose_payment + ' input').is(':checked')) {
          var checked = $(options.choose_payment + ' input:checked').attr('id');
          var checked_value = $(options.choose_payment + ' input:checked').val();
          that.setupPaymentMethod(checked, checked_value);
        }

        $(options.choose_payment + ' input').change(function (event) {
          that.setupPaymentMethod(this.id, this.value);
          that.setPaymentIntent();

          if (this.value === 'bank_account') {
            $('input[name="stripeToken"]', $(that.options.donate_form_selector)).remove();
            that.achFields(that.element, that.options);
          } else {
            $('input[name="public_token"]', $(that.options.donate_form_selector)).remove();
            $('input[name="account_id"]', $(that.options.donate_form_selector)).remove();
            $('input[name="bankToken"]', $(that.options.donate_form_selector)).remove();
            that.calculateFees(that.options.original_amount, 'card'); // we can't use creditcardfields method here
          }
        });
      }
    },
    // choosePaymentMethod
    setupPaymentMethod: function setupPaymentMethod(id, value) {
      $(this.options.payment_method_selector).removeClass('active');
      $(this.options.payment_method_selector + '.' + id).addClass('active'); //$(this.options.payment_method_selector + ':not(.active) label').removeClass('required');
      //$(this.options.payment_method_selector + ':not(.active) input').prop('required', false);

      $(this.options.payment_method_selector + ':not(.active) input').val(''); //$(this.options.payment_method_selector + '.active label').addClass('required');
      //$(this.options.payment_method_selector + '.active input').prop('required', true);

      if (value === 'bank_account') {
        this.calculateFees(this.options.original_amount, 'bank_account');
      } else {
        this.calculateFees(this.options.original_amount, 'card');
      }
    },
    // setupPaymentMethod
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
        var stripe_payment_type = 'card'; // error handling

        that.stripeErrorDisplay(event, $(options.cc_num_selector, element), element, options); // if it changed, reset the button

        that.buttonStatus(options, $(that.options.donate_form_selector).find('button'), false); // Switch brand logo

        if (event.brand) {
          if (event.brand === 'amex') {
            stripe_payment_type = 'amex';
          }

          that.setBrandIcon(event.brand);
        }

        that.calculateFees(that.options.original_amount, stripe_payment_type);
        that.setPaymentIntent();
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
      var bankTokenFieldName = 'bankToken';
      var bankTokenField = 'input[name="' + bankTokenFieldName + '"]';

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
    scrollToFormError: function scrollToFormError() {
      var form = $('.m-form'); // listen for `invalid` events on all form inputs

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
    validateAndSubmit: function validateAndSubmit(element, options) {
      var forms = document.querySelectorAll('.m-form');
      forms.forEach(function (form) {
        ValidForm(form, {
          validationErrorParentClass: 'm-has-validation-error',
          validationErrorClass: 'a-validation-error',
          invalidClass: 'a-error',
          errorPlacement: 'after'
        });
      });
      this.scrollToFormError();
      var that = this;
      $(options.donate_form_selector).submit(function (event) {
        event.preventDefault(); // validate and submit the form

        $('.a-check-field').remove();
        $('input, label', element).removeClass('a-error');
        var valid = true;
        var payment_type = $('input[name="stripe_payment_type"]').val();
        $(that.options.choose_payment + ' input').change(function () {
          $(that.options.payment_method_selector + ' .error').remove(); // remove method error message if it is there
          // if a payment field changed, reset the button

          that.buttonStatus(options, $(that.options.donate_form_selector).find('button'), false);
        });

        if (payment_type === 'bank_account') {
          if ($('input[name="bankToken"]').length === 0) {
            valid = false;
            $(that.options.payment_method_selector).prepend('<p class="error">You are required to enter credit card information, or to authorize MinnPost to charge your bank account, to make a payment.</p>');
          }
        }

        if (valid === true) {
          // 1. set up the button and remove the hidden fields we don't need
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
            // finally, try to charge it if it is not ach
            that.confirmCardPayment(that.cardNumberElement);
          } else {
            // if it is ach, we already have a token so pass it to stripe.
            that.stripeTokenHandler($('#bankToken').val(), 'bank_account');
          }
        } else {
          // this means valid is false
          that.buttonStatus(that.options, $(that.options.donate_form_selector).find('button'), false);
        }
      });
    },
    // validateAndSubmit
    confirmCardPayment: function confirmCardPayment(cardElement) {
      var that = this;
      var supportform = $(that.options.donate_form_selector);
      var field;
      var message;
      var payment_method;
      intent = that.getPaymentIntent();
      that.stripe.confirmCardPayment(intent, {
        payment_method: {
          card: cardElement
        }
      }).then(function (result) {
        if (result.error) {
          // Show the errors on the form
          that.buttonStatus(that.options, supportform.find('button'), false);
          field = result.error.field + '_field_selector';
          message = '';

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
          //that.debug(result);
          payment_method = result.paymentIntent.payment_method;
          console.dir(result); // Send the payment method to the server
          //that.stripePaymentHandler(payment_method);
        }
      });
    },
    // confirmCardPayment
    stripeErrorDisplay: function stripeErrorDisplay(event, this_selector, element, options) {
      // listen for errors and display/hide error messages
      var which_error = this_selector.attr('id'); // when this field changes, reset its errors

      $('.a-card-instruction.' + which_error).removeClass('a-error');
      $('.a-card-instruction.' + which_error).empty();

      if (event.error) {
        $('.a-card-instruction.' + which_error).text(event.error.message + ' Please try again.');
        $('.a-card-instruction.' + which_error).addClass('a-error');
        this_selector.parent().addClass('a-error');
      } else {
        $('.a-card-instruction.' + which_error).removeClass('a-error');
        $('.a-card-instruction.' + which_error).empty();
        $(options.cc_num_selector, element).removeClass('a-error');
        $(options.cc_exp_selector, element).removeClass('a-rror');
        $(options.cc_cvv_selector, element).removeClass('a-error');
        $(options.cc_num_selector, element).parent().removeClass('a-error');
        $(options.cc_exp_selector, element).parent().removeClass('a-error');
        $(options.cc_cvv_selector, element).parent().removeClass('a-error');
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
            $(that.options[field], element).addClass('a-error');
            $(that.options[field], element).prev().addClass('a-error');
            $(that.options[field], element).after('<span class="a-check-field invalid">' + message + '</span>');
          }
        } else {
          // Send the token to your server
          that.stripeTokenHandler(result.token, 'card');
        }
      });
    },
    // createToken
    stripePaymentHandler: function stripePaymentHandler(payment_method, type) {
      var that = this;
      var supportform = $(this.options.donate_form_selector);
      var ajax_url = '';
      var tokenFieldName = 'stripeToken';
      var tokenField = 'input[name="' + tokenFieldName + '"]';

      if (typeof $(supportform).data('action') !== 'undefined') {
        ajax_url = $(supportform).data('action');
      } else {
        ajax_url = window.location.pathname;
      } // Insert the payment method ID into the form so it gets submitted to the server


      if (type === 'card') {
        if (token.card.brand.length > 0 && token.card.brand === 'American Express') {
          type = 'amex';
        }

        if ($(tokenField).length > 0) {
          $(tokenField).val(token.id);
        } else {
          supportform.append($('<input type=\"hidden\" name="' + tokenFieldName + '">').val(token.id));
        }
      }

      $('input[name="stripe_payment_type"]').val(type); // Submit the form
      // the way it works currently is the form submits an ajax request to itself
      // then it submits a post request to the form's action url

      $.ajax({
        url: ajax_url,
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
            var stripeErrorSelector = '';

            if (typeof error.message === 'string') {
              message = error.message;
            } else {
              message = error.message[0];
            }

            if ($(that.options[field]).length > 0) {
              $(that.options[field]).addClass('a-error');
              $(that.options[field]).prev().addClass('a-error');
              $(that.options[field]).after('<span class="a-check-field invalid">' + message + '</span>');
            }

            if (typeof error !== 'undefined') {
              that.buttonStatus(that.options, $(that.options.donate_form_selector).find('button'), false, 'card');

              if (error.code == 'invalid_number' || error.code == 'incorrect_number' || error.code == 'card_declined' || error.code == 'processing_error') {
                // error handling
                stripeErrorSelector = $(that.options.cc_num_selector);
              }

              if (error.code == 'invalid_expiry_month' || error.code == 'invalid_expiry_year' || error.code == 'expired_card') {
                // error handling
                stripeErrorSelector = $(that.options.cc_exp_selector);
              }

              if (error.code == 'invalid_cvc' || error.code == 'incorrect_cvc') {
                // error handling
                stripeErrorSelector = $(that.options.cc_cvv_selector);
              }

              if (stripeErrorSelector !== '') {
                that.stripeErrorDisplay(response.errors, stripeErrorSelector, that.element, that.options);
              }

              if (error.field == 'recaptcha') {
                $(that.options.pay_button_selector).before('<p class="a-form-caption a-recaptcha-error">' + message + '</p>');
              }

              if (error.type == 'invalid_request_error') {
                $(that.options.pay_button_selector).before('<p class="error error-invalid-request">' + error.message + '</p>');
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
          supportform.get(0).submit(); // continue submitting the form if the ajax was successful
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0cmlwZS5wYXltZW50LmpzIiwidmFsaWQtZm9ybS5taW4uanMiLCJtaW5ucG9zdC5naXZpbmcuanMiXSwibmFtZXMiOlsiZiIsImV4cG9ydHMiLCJtb2R1bGUiLCJkZWZpbmUiLCJhbWQiLCJnIiwid2luZG93IiwiZ2xvYmFsIiwic2VsZiIsInBheW1lbnQiLCJqcyIsImUiLCJ0IiwibiIsInIiLCJzIiwibyIsInUiLCJhIiwicmVxdWlyZSIsImkiLCJFcnJvciIsImNvZGUiLCJsIiwiY2FsbCIsImxlbmd0aCIsIlFKIiwicnJldHVybiIsInJ0cmltIiwic2VsZWN0b3IiLCJpc0RPTUVsZW1lbnQiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJlbCIsIm5vZGVOYW1lIiwidHJpbSIsInRleHQiLCJyZXBsYWNlIiwidmFsIiwicmV0IiwiYXJndW1lbnRzIiwidmFsdWUiLCJwcmV2ZW50RGVmYXVsdCIsImV2ZW50T2JqZWN0IiwicmV0dXJuVmFsdWUiLCJub3JtYWxpemVFdmVudCIsIm9yaWdpbmFsIiwid2hpY2giLCJ0YXJnZXQiLCJzcmNFbGVtZW50Iiwib3JpZ2luYWxFdmVudCIsImRhdGEiLCJkZXRhaWwiLCJjaGFyQ29kZSIsImtleUNvZGUiLCJvbiIsImVsZW1lbnQiLCJldmVudE5hbWUiLCJjYWxsYmFjayIsImoiLCJsZW4iLCJsZW4xIiwibXVsdEV2ZW50TmFtZSIsIm9yaWdpbmFsQ2FsbGJhY2siLCJyZWYiLCJtYXRjaCIsInNwbGl0IiwiYWRkRXZlbnRMaXN0ZW5lciIsImF0dGFjaEV2ZW50IiwiYWRkQ2xhc3MiLCJjbGFzc05hbWUiLCJyZXN1bHRzIiwicHVzaCIsImNsYXNzTGlzdCIsImFkZCIsImhhc0NsYXNzIiwiY29udGFpbnMiLCJSZWdFeHAiLCJ0ZXN0IiwicmVtb3ZlQ2xhc3MiLCJjbHMiLCJyZW1vdmUiLCJqb2luIiwidG9nZ2xlQ2xhc3MiLCJib29sIiwiYXBwZW5kIiwidG9BcHBlbmQiLCJpbnNlcnRBZGphY2VudEhUTUwiLCJmaW5kIiwiTm9kZUxpc3QiLCJBcnJheSIsInRyaWdnZXIiLCJuYW1lIiwiZXJyb3IiLCJldiIsIkN1c3RvbUV2ZW50IiwiY3JlYXRlRXZlbnQiLCJpbml0Q3VzdG9tRXZlbnQiLCJpbml0RXZlbnQiLCJkaXNwYXRjaEV2ZW50IiwiUGF5bWVudCIsImNhcmRGcm9tTnVtYmVyIiwiY2FyZEZyb21UeXBlIiwiY2FyZHMiLCJkZWZhdWx0Rm9ybWF0IiwiZm9ybWF0QmFja0NhcmROdW1iZXIiLCJmb3JtYXRCYWNrRXhwaXJ5IiwiZm9ybWF0Q2FyZE51bWJlciIsImZvcm1hdEV4cGlyeSIsImZvcm1hdEZvcndhcmRFeHBpcnkiLCJmb3JtYXRGb3J3YXJkU2xhc2giLCJmb3JtYXRNb250aEV4cGlyeSIsImhhc1RleHRTZWxlY3RlZCIsImx1aG5DaGVjayIsInJlRm9ybWF0Q2FyZE51bWJlciIsInJlc3RyaWN0Q1ZDIiwicmVzdHJpY3RDYXJkTnVtYmVyIiwicmVzdHJpY3RDb21iaW5lZEV4cGlyeSIsInJlc3RyaWN0RXhwaXJ5IiwicmVzdHJpY3RNb250aEV4cGlyeSIsInJlc3RyaWN0TnVtZXJpYyIsInJlc3RyaWN0WWVhckV4cGlyeSIsInNldENhcmRUeXBlIiwiaW5kZXhPZiIsIml0ZW0iLCJ0eXBlIiwicGF0dGVybiIsImZvcm1hdCIsImN2Y0xlbmd0aCIsImx1aG4iLCJudW0iLCJjYXJkIiwiZGlnaXQiLCJkaWdpdHMiLCJvZGQiLCJzdW0iLCJyZXZlcnNlIiwicGFyc2VJbnQiLCJzZWxlY3Rpb25TdGFydCIsInNlbGVjdGlvbkVuZCIsInNlbGVjdGlvbiIsImNyZWF0ZVJhbmdlIiwic2V0VGltZW91dCIsIl90aGlzIiwiZm5zIiwicmUiLCJ1cHBlckxlbmd0aCIsIlN0cmluZyIsImZyb21DaGFyQ29kZSIsIm1ldGEiLCJzbGFzaCIsIm1ldGFLZXkiLCJpbnB1dCIsImN0cmxLZXkiLCJhbGxUeXBlcyIsImNhcmRUeXBlIiwiY2FyZEV4cGlyeVZhbCIsIm1vbnRoIiwicHJlZml4IiwieWVhciIsIkRhdGUiLCJnZXRGdWxsWWVhciIsInRvU3RyaW5nIiwic2xpY2UiLCJ2YWxpZGF0ZUNhcmROdW1iZXIiLCJ2YWxpZGF0ZUNhcmRFeHBpcnkiLCJjdXJyZW50VGltZSIsImV4cGlyeSIsInNldE1vbnRoIiwiZ2V0TW9udGgiLCJ2YWxpZGF0ZUNhcmRDVkMiLCJjdmMiLCJyZWYxIiwiZ3JvdXBzIiwiZXhlYyIsInNoaWZ0IiwiZm9ybWF0Q2FyZENWQyIsImZvcm1hdENhcmRFeHBpcnkiLCJmb3JtYXRDYXJkRXhwaXJ5TXVsdGlwbGUiLCJnZXRDYXJkQXJyYXkiLCJzZXRDYXJkQXJyYXkiLCJjYXJkQXJyYXkiLCJhZGRUb0NhcmRBcnJheSIsImNhcmRPYmplY3QiLCJyZW1vdmVGcm9tQ2FyZEFycmF5Iiwia2V5Iiwic3BsaWNlIiwiYyIsInAiLCJfdmFsaWRGb3JtIiwiX3ZhbGlkRm9ybTIiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0Iiwib2JqIiwiX19lc01vZHVsZSIsImRlZmF1bHQiLCJWYWxpZEZvcm0iLCJ0b2dnbGVJbnZhbGlkQ2xhc3MiLCJoYW5kbGVDdXN0b21NZXNzYWdlcyIsImhhbmRsZUN1c3RvbU1lc3NhZ2VEaXNwbGF5IiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJjbG9uZSIsImRlZmF1bHRzIiwiaW5zZXJ0QWZ0ZXIiLCJpbnNlcnRCZWZvcmUiLCJmb3JFYWNoIiwiZGVib3VuY2UiLCJjb3B5IiwiYXR0ciIsImhhc093blByb3BlcnR5IiwiZGVmYXVsdE9iamVjdCIsImsiLCJ1bmRlZmluZWQiLCJyZWZOb2RlIiwibm9kZVRvSW5zZXJ0Iiwic2libGluZyIsIm5leHRTaWJsaW5nIiwiX3BhcmVudCIsInBhcmVudE5vZGUiLCJwYXJlbnQiLCJhcHBlbmRDaGlsZCIsIml0ZW1zIiwiZm4iLCJtcyIsInRpbWVvdXQiLCJkZWJvdW5jZWRGbiIsImNsZWFyVGltZW91dCIsInZhbGlkRm9ybSIsIl91dGlsIiwiaW52YWxpZENsYXNzIiwidmFsaWRpdHkiLCJ2YWxpZCIsImVycm9yUHJvcHMiLCJnZXRDdXN0b21NZXNzYWdlIiwiY3VzdG9tTWVzc2FnZXMiLCJsb2NhbEVycm9yUHJvcHMiLCJjb25jYXQiLCJwcm9wIiwiZ2V0QXR0cmlidXRlIiwiY2hlY2tWYWxpZGl0eSIsIm1lc3NhZ2UiLCJzZXRDdXN0b21WYWxpZGl0eSIsIm9wdGlvbnMiLCJ2YWxpZGF0aW9uRXJyb3JDbGFzcyIsInZhbGlkYXRpb25FcnJvclBhcmVudENsYXNzIiwiZXJyb3JQbGFjZW1lbnQiLCJpbnNlcnRFcnJvciIsImVycm9yTm9kZSIsInF1ZXJ5U2VsZWN0b3IiLCJjcmVhdGVFbGVtZW50IiwidmFsaWRhdGlvbk1lc3NhZ2UiLCJ0ZXh0Q29udGVudCIsImRlZmF1bHRPcHRpb25zIiwiaW5wdXRzIiwidG9Mb3dlckNhc2UiLCJmb2N1c0ludmFsaWRJbnB1dCIsInZhbGlkRm9ybUlucHV0cyIsImZvcm0iLCJmb2N1c0ZpcnN0IiwiaW52YWxpZE5vZGUiLCJmb2N1cyIsIiQiLCJwbHVnaW5OYW1lIiwiUGx1Z2luIiwiZXh0ZW5kIiwiX2RlZmF1bHRzIiwiX25hbWUiLCJpbml0IiwicHJvdG90eXBlIiwicmVzZXQiLCJhbW91bnQiLCJkb2N1bWVudEVsZW1lbnQiLCJwYXJzZUZsb2F0IiwibGV2ZWxfYW1vdW50X3NlbGVjdG9yIiwib3JpZ2luYWxfYW1vdW50Iiwib3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yIiwiZnJlcXVlbmN5IiwiZnJlcXVlbmN5X3NlbGVjdG9yIiwicmVjdXJyaW5nIiwicmVjdXJyaW5nX3NlbGVjdG9yIiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJwcm9jZXNzaW5nX2ZlZSIsIk1hdGgiLCJyb3VuZCIsImZlZV9hbW91bnQiLCJwb3ciLCJ0b0ZpeGVkIiwicHJvY2Vzc2luZ19mZWVfdGV4dCIsImNyZWF0ZV9hY2NvdW50IiwiYnV0dG9uX3RleHQiLCJwYXlfYnV0dG9uX3NlbGVjdG9yIiwic3RyaXBlIiwiU3RyaXBlIiwic3RyaXBlX3B1Ymxpc2hhYmxlX2tleSIsImVsZW1lbnRzIiwiZm9udHMiLCJjc3NTcmMiLCJyZWZlcnJlciIsImRlYnVnIiwicXVlcnlfcGFuZWwiLCJxcyIsInF1ZXJ5IiwiYWN0aXZlIiwidGFiTmF2aWdhdGlvbiIsImFtb3VudEFzUmFkaW8iLCJhbW91bnRVcGRhdGVkIiwicGF5X2NjX3Byb2Nlc3Npbmdfc2VsZWN0b3IiLCJjcmVkaXRDYXJkUHJvY2Vzc2luZ0ZlZXMiLCJkb25hdGVfc3RlcF9zZWxlY3RvciIsImxldmVsIiwiY2hlY2tMZXZlbCIsImxldmVsbnVtIiwiZG9uYXRlQW5vbnltb3VzbHkiLCJob25vck9yTWVtb3J5VG9nZ2xlIiwib3V0c2lkZVVuaXRlZFN0YXRlcyIsInNoaXBwaW5nQWRkcmVzcyIsImFsbG93TWlubnBvc3RBY2NvdW50IiwiY2hvb3NlUGF5bWVudE1ldGhvZCIsImNyZWRpdENhcmRGaWVsZHMiLCJhY2hGaWVsZHMiLCJ2YWxpZGF0ZUFuZFN1Ym1pdCIsImNvbmZpcm1fc3RlcF9zZWxlY3RvciIsInNob3dOZXdzbGV0dGVyU2V0dGluZ3MiLCJjb25maXJtTWVzc2FnZVN1Ym1pdCIsImIiLCJkZWNvZGVVUklDb21wb25lbnQiLCJsb2NhdGlvbiIsInNlYXJjaCIsInN1YnN0ciIsImNvbnNvbGUiLCJsb2ciLCJkaXIiLCJnZXRRdWVyeVN0cmluZ3MiLCJsaW5rIiwic3RlcCIsImluZGV4IiwibmF2X2l0ZW1fY291bnQiLCJvcHBfaWQiLCJvcHBfaWRfc2VsZWN0b3IiLCJuZXh0X3N0ZXAiLCJwb3N0X3B1cmNoYXNlIiwiY29uZmlybSIsImNvbmZpcm1fYnV0dG9uX3NlbGVjdG9yIiwiYW5hbHl0aWNzVHJhY2tpbmdTdGVwIiwic2hvdyIsImdhIiwicGFnZSIsInBhdGhuYW1lIiwidGl0bGUiLCJjaGFuZ2UiLCJpcyIsInRoYXQiLCJwYXltZW50X3R5cGUiLCJjaG9vc2VfcGF5bWVudCIsImFtb3VudF9zZWxlY3Rvcl9mYWlyX21hcmtldCIsInNldEZhaXJNYXJrZXRWYWx1ZSIsInNldFBheW1lbnRJbnRlbnQiLCJjYWxjdWxhdGVGZWVzIiwiYWRkaXRpb25hbF9hbW91bnRfZmllbGQiLCJnZXRUb3RhbEFtb3VudCIsInBheV9mZWVzIiwiZmllbGQiLCJpbnRlbnREYXRhIiwiY3VycmVuY3kiLCJhamF4IiwibWV0aG9kIiwidXJsIiwiZG9uZSIsInJlc3VsdCIsImludGVudF9zZWNyZXRfc2VsZWN0b3IiLCJjbGllbnRTZWNyZXQiLCJnZXRQYXltZW50SW50ZW50IiwiaW50ZW50IiwidG90YWxfYW1vdW50IiwiYWRkaXRpb25hbF9hbW91bnQiLCJhbW91bnRfc2VsZWN0b3IiLCJmYWlyX21hcmtldF92YWx1ZV9zZWxlY3RvciIsImZhaXJNYXJrZXRWYWx1ZSIsInN0cmlwZV9wYXltZW50X3R5cGUiLCJzZXRTdHJpcGVQYXltZW50VHlwZSIsImZlZXMiLCJjcmVkaXRDYXJkRmVlQ2hlY2tib3giLCJkb25hdGVfZm9ybV9zZWxlY3RvciIsImZ1bGxfYW1vdW50IiwiZnVsbF9hbW91bnRfc2VsZWN0b3IiLCJ0b2dnbGVBbm9ueW1vdXMiLCJhbm9ueW1vdXNfc2VsZWN0b3IiLCJuYW1lX3NlbGVjdG9yIiwiaGlkZSIsInJldHVybnZhbHVlIiwiYW1vdW50X3llYXJseSIsImVhY2giLCJsZXZlbHMiLCJtYXgiLCJtaW4iLCJob25vck9yTWVtb3J5IiwiaG9ub3Jfb3JfbWVtb3J5X2Nob29zZXIiLCJob25vcl9tZW1vcnlfaW5wdXRfZ3JvdXAiLCJob25vcl90eXBlX3NlbGVjdG9yIiwiaG9ub3JfbmFtZV9zZWxlY3RvciIsInNob3dfYmlsbGluZ19jb3VudHJ5X3NlbGVjdG9yIiwiY2xpY2siLCJiaWxsaW5nX2NvdW50cnlfc2VsZWN0b3IiLCJzaG93X3NoaXBwaW5nX2NvdW50cnlfc2VsZWN0b3IiLCJzaGlwcGluZ19jb3VudHJ5X3NlbGVjdG9yIiwic2hvd19zaGlwcGluZyIsInVzZV9mb3Jfc2hpcHBpbmdfc2VsZWN0b3IiLCJzaGlwcGluZ19zZWxlY3RvciIsImFjY291bnRfZXhpc3RzIiwic2hvd1Bhc3N3b3JkIiwic2hvd1Bhc3N3b3JkU3RyZW5ndGgiLCJzcGFtRW1haWwiLCJlbWFpbF9maWVsZF9zZWxlY3RvciIsInRvZ2dsZUFjY291bnRGaWVsZHMiLCJjcmVhdGVfbXBfc2VsZWN0b3IiLCJkb25lVHlwaW5nIiwiZW1haWwiLCJjaGVja01pbm5wb3N0QWNjb3VudCIsInR5cGluZ1RpbWVyIiwiZG9uZVR5cGluZ0ludGVydmFsIiwia2V5dXAiLCJlbWFpbF9maWVsZCIsInNwYW1FcnJvckNvbnRhaW5lciIsImNyZWF0ZV9hY2NvdW50X3NlbGVjdG9yIiwiYmVmb3JlIiwicGFzc3dvcmRfc2VsZWN0b3IiLCIkc3VibWl0IiwiJGNvbnRhaW5lciIsIiRmaWVsZCIsInNob3dfcGFzcyIsIiR0b2dnbGUiLCJjaGVja2JveCIsIiRiZWZvcmUiLCJhZnRlciIsImNoZWNrUGFzc3dvcmRTdHJlbmd0aCIsIiRwYXNzd29yZCIsIiRzdHJlbmd0aE1ldGVyIiwiJHN0cmVuZ3RoVGV4dCIsInBhc3N3b3JkIiwienhjdmJuIiwic3RyZW5ndGgiLCJzY29yZSIsImh0bWwiLCJ1c2VyIiwibWlubnBvc3Rfcm9vdCIsInN0YXR1cyIsInJlYXNvbiIsImNoZWNrZWQiLCJjaGVja2VkX3ZhbHVlIiwic2V0dXBQYXltZW50TWV0aG9kIiwiZXZlbnQiLCJpZCIsInBheW1lbnRfbWV0aG9kX3NlbGVjdG9yIiwic3R5bGUiLCJiYXNlIiwiaWNvbkNvbG9yIiwibGluZUhlaWdodCIsImZvbnRXZWlnaHQiLCJmb250RmFtaWx5IiwiZm9udFNpemUiLCJpbnZhbGlkIiwiY29sb3IiLCJjYXJkTnVtYmVyRWxlbWVudCIsImNyZWF0ZSIsIm1vdW50IiwiY2NfbnVtX3NlbGVjdG9yIiwiY2FyZEV4cGlyeUVsZW1lbnQiLCJjY19leHBfc2VsZWN0b3IiLCJjYXJkQ3ZjRWxlbWVudCIsImNjX2N2dl9zZWxlY3RvciIsInN0cmlwZUVycm9yRGlzcGxheSIsImJ1dHRvblN0YXR1cyIsImJyYW5kIiwic2V0QnJhbmRJY29uIiwiY2FyZEJyYW5kVG9QZkNsYXNzIiwiYnJhbmRJY29uRWxlbWVudCIsImdldEVsZW1lbnRCeUlkIiwicGZDbGFzcyIsImJhbmtUb2tlbkZpZWxkTmFtZSIsImJhbmtUb2tlbkZpZWxkIiwicGxhaWRfZW52IiwiUGxhaWQiLCJsaW5rSGFuZGxlciIsInNlbGVjdEFjY291bnQiLCJhcGlWZXJzaW9uIiwiZW52IiwiY2xpZW50TmFtZSIsInBsYWlkX3B1YmxpY19rZXkiLCJwcm9kdWN0Iiwib25Mb2FkIiwib25TdWNjZXNzIiwicHVibGljX3Rva2VuIiwibWV0YWRhdGEiLCJzdXBwb3J0Zm9ybSIsImFjY291bnRfaWQiLCJzZXJpYWxpemUiLCJyZXNwb25zZSIsInBsYWlkX2xpbmsiLCJzdHJpcGVfYmFua19hY2NvdW50X3Rva2VuIiwicHJlcGVuZCIsImNvbnRlbnRzIiwidW53cmFwIiwib25FeGl0IiwiZXJyIiwib3BlbiIsImJ1dHRvbiIsImRpc2FibGVkIiwic2Nyb2xsVG9Gb3JtRXJyb3IiLCJmaXJzdCIsImZpcnN0X2hvbGRlciIsImVsZW1lbnRPZmZzZXQiLCJvZmZzZXQiLCJ0b3AiLCJwYWdlT2Zmc2V0IiwicGFnZVlPZmZzZXQiLCJpbm5lckhlaWdodCIsInNjcm9sbFRvcCIsImZvcm1zIiwic3VibWl0IiwidG9rZW5EYXRhIiwiZ2VuZXJhdGVUb2tlbkRhdGEiLCJmaXJzdF9uYW1lIiwiZmlyc3RfbmFtZV9maWVsZF9zZWxlY3RvciIsImxhc3RfbmFtZSIsImxhc3RfbmFtZV9maWVsZF9zZWxlY3RvciIsInBhc3N3b3JkX2ZpZWxkX3NlbGVjdG9yIiwiY2l0eSIsImFjY291bnRfY2l0eV9zZWxlY3RvciIsInN0YXRlIiwiYWNjb3VudF9zdGF0ZV9zZWxlY3RvciIsInppcCIsImFjY291bnRfemlwX3NlbGVjdG9yIiwiY29uZmlybUNhcmRQYXltZW50Iiwic3RyaXBlVG9rZW5IYW5kbGVyIiwiY2FyZEVsZW1lbnQiLCJwYXltZW50X21ldGhvZCIsInRoZW4iLCJwcmV2IiwicGF5bWVudEludGVudCIsInRoaXNfc2VsZWN0b3IiLCJ3aGljaF9lcnJvciIsImVtcHR5IiwiZnVsbF9uYW1lIiwic3RyZWV0IiwiYWRkcmVzc19saW5lMSIsImFkZHJlc3NfY2l0eSIsImFkZHJlc3Nfc3RhdGUiLCJhZGRyZXNzX3ppcCIsImNvdW50cnkiLCJhZGRyZXNzX2NvdW50cnkiLCJjcmVhdGVUb2tlbiIsInRva2VuIiwic3RyaXBlUGF5bWVudEhhbmRsZXIiLCJhamF4X3VybCIsInRva2VuRmllbGROYW1lIiwidG9rZW5GaWVsZCIsImNhY2hlIiwiZXJyb3JzIiwic3RyaXBlRXJyb3JTZWxlY3RvciIsImFuaW1hdGUiLCJnZXQiLCJuZXdzbGV0dGVyX2dyb3VwX2h0bWwiLCJuZXdzbGV0dGVyX2dyb3VwX3NlbGVjdG9yIiwiZ2V0X2RhdGEiLCJzaG9ydGNvZGUiLCJwbGFjZW1lbnQiLCJncm91cF9maWVsZHMiLCJjYXRlZ29yeSIsIm1haWxjaGltcF9zdGF0dXMiLCJtYWlsY2hpbXBfdXNlcl9pZCIsImV4aXN0aW5nX25ld3NsZXR0ZXJfc2V0dGluZ3MiLCJjb25maXJtX2Zvcm1fc2VsZWN0b3IiLCJjb25maXJtZm9ybSIsIm5ld3NsZXR0ZXJfZ3JvdXBzIiwibmV3X25ld3NsZXR0ZXJfc2V0dGluZ3MiLCJwb3N0X2RhdGEiLCJncm91cHNfc3VibWl0dGVkIiwiZ3JvdXBzX2F2YWlsYWJsZSIsImdyb3VwIiwiZGF0YVR5cGUiLCJjb250ZW50VHlwZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJzdWNjZXNzIiwiZmFpbCIsImpRdWVyeSJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLENBQUMsVUFBU0EsQ0FBVCxFQUFXO0FBQUMsTUFBRyxRQUFPQyxPQUFQLHlDQUFPQSxPQUFQLE9BQWlCLFFBQWpCLElBQTJCLE9BQU9DLE1BQVAsS0FBZ0IsV0FBOUMsRUFBMEQ7QUFBQ0EsSUFBQUEsTUFBTSxDQUFDRCxPQUFQLEdBQWVELENBQUMsRUFBaEI7QUFBbUIsR0FBOUUsTUFBbUYsSUFBRyxPQUFPRyxNQUFQLEtBQWdCLFVBQWhCLElBQTRCQSxNQUFNLENBQUNDLEdBQXRDLEVB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LFlBQVltTixVQUF6QixDQUFMLEVBQTJDO0FBQ3pDRCxRQUFBQSxDQUFDLENBQUNsTixJQUFGLENBQU8sSUFBUCxFQUFhLFlBQVltTixVQUF6QixFQUFxQyxJQUFJQyxNQUFKLENBQVksSUFBWixFQUFrQnJCLE9BQWxCLENBQXJDO0FBQ0Q7QUFDRixLQUpNLENBQVA7QUFLRCxHQU5EO0FBUUQsQ0F0L0NBLEVBcy9DR3dWLE1BdC9DSCxFQXMvQ1dwa0IsTUF0L0NYLEVBcy9DbUJ5QixRQXQvQ25CIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oZil7aWYodHlwZW9mIGV4cG9ydHM9PT1cIm9iamVjdFwiJiZ0eXBlb2YgbW9kdWxlIT09XCJ1bmRlZmluZWRcIil7bW9kdWxlLmV4cG9ydHM9ZigpfWVsc2UgaWYodHlwZW9mIGRlZmluZT09PVwiZnVuY3Rpb25cIiYmZGVmaW5lLmFtZCl7ZGVmaW5lKFtdLGYpfWVsc2V7dmFyIGc7aWYodHlwZW9mIHdpbmRvdyE9PVwidW5kZWZpbmVkXCIpe2c9d2luZG93fWVsc2UgaWYodHlwZW9mIGdsb2JhbCE9PVwidW5kZWZpbmVkXCIpe2c9Z2xvYmFsfWVsc2UgaWYodHlwZW9mIHNlbGYhPT1cInVuZGVmaW5lZFwiKXtnPXNlbGZ9ZWxzZXtnPXRoaXN9KGcucGF5bWVudCB8fCAoZy5wYXltZW50ID0ge30pKS5qcyA9IGYoKX19KShmdW5jdGlvbigpe3ZhciBkZWZpbmUsbW9kdWxlLGV4cG9ydHM7cmV0dXJuIChmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pKHsxOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbnZhciBRSiwgcnJldHVybiwgcnRyaW07XG5cblFKID0gZnVuY3Rpb24oc2VsZWN0b3IpIHtcbiAgaWYgKFFKLmlzRE9NRWxlbWVudChzZWxlY3RvcikpIHtcbiAgICByZXR1cm4gc2VsZWN0b3I7XG4gIH1cbiAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xufTtcblxuUUouaXNET01FbGVtZW50ID0gZnVuY3Rpb24oZWwpIHtcbiAgcmV0dXJuIGVsICYmIChlbC5ub2RlTmFtZSAhPSBudWxsKTtcbn07XG5cbnJ0cmltID0gL15bXFxzXFx1RkVGRlxceEEwXSt8W1xcc1xcdUZFRkZcXHhBMF0rJC9nO1xuXG5RSi50cmltID0gZnVuY3Rpb24odGV4dCkge1xuICBpZiAodGV4dCA9PT0gbnVsbCkge1xuICAgIHJldHVybiBcIlwiO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAodGV4dCArIFwiXCIpLnJlcGxhY2UocnRyaW0sIFwiXCIpO1xuICB9XG59O1xuXG5ycmV0dXJuID0gL1xcci9nO1xuXG5RSi52YWwgPSBmdW5jdGlvbihlbCwgdmFsKSB7XG4gIHZhciByZXQ7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgIHJldHVybiBlbC52YWx1ZSA9IHZhbDtcbiAgfSBlbHNlIHtcbiAgICByZXQgPSBlbC52YWx1ZTtcbiAgICBpZiAodHlwZW9mIHJldCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgcmV0dXJuIHJldC5yZXBsYWNlKHJyZXR1cm4sIFwiXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAocmV0ID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cblFKLnByZXZlbnREZWZhdWx0ID0gZnVuY3Rpb24oZXZlbnRPYmplY3QpIHtcbiAgaWYgKHR5cGVvZiBldmVudE9iamVjdC5wcmV2ZW50RGVmYXVsdCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgZXZlbnRPYmplY3QucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm47XG4gIH1cbiAgZXZlbnRPYmplY3QucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuUUoubm9ybWFsaXplRXZlbnQgPSBmdW5jdGlvbihlKSB7XG4gIHZhciBvcmlnaW5hbDtcbiAgb3JpZ2luYWwgPSBlO1xuICBlID0ge1xuICAgIHdoaWNoOiBvcmlnaW5hbC53aGljaCAhPSBudWxsID8gb3JpZ2luYWwud2hpY2ggOiB2b2lkIDAsXG4gICAgdGFyZ2V0OiBvcmlnaW5hbC50YXJnZXQgfHwgb3JpZ2luYWwuc3JjRWxlbWVudCxcbiAgICBwcmV2ZW50RGVmYXVsdDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gUUoucHJldmVudERlZmF1bHQob3JpZ2luYWwpO1xuICAgIH0sXG4gICAgb3JpZ2luYWxFdmVudDogb3JpZ2luYWwsXG4gICAgZGF0YTogb3JpZ2luYWwuZGF0YSB8fCBvcmlnaW5hbC5kZXRhaWxcbiAgfTtcbiAgaWYgKGUud2hpY2ggPT0gbnVsbCkge1xuICAgIGUud2hpY2ggPSBvcmlnaW5hbC5jaGFyQ29kZSAhPSBudWxsID8gb3JpZ2luYWwuY2hhckNvZGUgOiBvcmlnaW5hbC5rZXlDb2RlO1xuICB9XG4gIHJldHVybiBlO1xufTtcblxuUUoub24gPSBmdW5jdGlvbihlbGVtZW50LCBldmVudE5hbWUsIGNhbGxiYWNrKSB7XG4gIHZhciBlbCwgaSwgaiwgbGVuLCBsZW4xLCBtdWx0RXZlbnROYW1lLCBvcmlnaW5hbENhbGxiYWNrLCByZWY7XG4gIGlmIChlbGVtZW50Lmxlbmd0aCkge1xuICAgIGZvciAoaSA9IDAsIGxlbiA9IGVsZW1lbnQubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGVsID0gZWxlbWVudFtpXTtcbiAgICAgIFFKLm9uKGVsLCBldmVudE5hbWUsIGNhbGxiYWNrKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChldmVudE5hbWUubWF0Y2goXCIgXCIpKSB7XG4gICAgcmVmID0gZXZlbnROYW1lLnNwbGl0KFwiIFwiKTtcbiAgICBmb3IgKGogPSAwLCBsZW4xID0gcmVmLmxlbmd0aDsgaiA8IGxlbjE7IGorKykge1xuICAgICAgbXVsdEV2ZW50TmFtZSA9IHJlZltqXTtcbiAgICAgIFFKLm9uKGVsZW1lbnQsIG11bHRFdmVudE5hbWUsIGNhbGxiYWNrKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG4gIG9yaWdpbmFsQ2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgY2FsbGJhY2sgPSBmdW5jdGlvbihlKSB7XG4gICAgZSA9IFFKLm5vcm1hbGl6ZUV2ZW50KGUpO1xuICAgIHJldHVybiBvcmlnaW5hbENhbGxiYWNrKGUpO1xuICB9O1xuICBpZiAoZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgcmV0dXJuIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGNhbGxiYWNrLCBmYWxzZSk7XG4gIH1cbiAgaWYgKGVsZW1lbnQuYXR0YWNoRXZlbnQpIHtcbiAgICBldmVudE5hbWUgPSBcIm9uXCIgKyBldmVudE5hbWU7XG4gICAgcmV0dXJuIGVsZW1lbnQuYXR0YWNoRXZlbnQoZXZlbnROYW1lLCBjYWxsYmFjayk7XG4gIH1cbiAgZWxlbWVudFsnb24nICsgZXZlbnROYW1lXSA9IGNhbGxiYWNrO1xufTtcblxuUUouYWRkQ2xhc3MgPSBmdW5jdGlvbihlbCwgY2xhc3NOYW1lKSB7XG4gIHZhciBlO1xuICBpZiAoZWwubGVuZ3RoKSB7XG4gICAgcmV0dXJuIChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBpLCBsZW4sIHJlc3VsdHM7XG4gICAgICByZXN1bHRzID0gW107XG4gICAgICBmb3IgKGkgPSAwLCBsZW4gPSBlbC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBlID0gZWxbaV07XG4gICAgICAgIHJlc3VsdHMucHVzaChRSi5hZGRDbGFzcyhlLCBjbGFzc05hbWUpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH0pKCk7XG4gIH1cbiAgaWYgKGVsLmNsYXNzTGlzdCkge1xuICAgIHJldHVybiBlbC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGVsLmNsYXNzTmFtZSArPSAnICcgKyBjbGFzc05hbWU7XG4gIH1cbn07XG5cblFKLmhhc0NsYXNzID0gZnVuY3Rpb24oZWwsIGNsYXNzTmFtZSkge1xuICB2YXIgZSwgaGFzQ2xhc3MsIGksIGxlbjtcbiAgaWYgKGVsLmxlbmd0aCkge1xuICAgIGhhc0NsYXNzID0gdHJ1ZTtcbiAgICBmb3IgKGkgPSAwLCBsZW4gPSBlbC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgZSA9IGVsW2ldO1xuICAgICAgaGFzQ2xhc3MgPSBoYXNDbGFzcyAmJiBRSi5oYXNDbGFzcyhlLCBjbGFzc05hbWUpO1xuICAgIH1cbiAgICByZXR1cm4gaGFzQ2xhc3M7XG4gIH1cbiAgaWYgKGVsLmNsYXNzTGlzdCkge1xuICAgIHJldHVybiBlbC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV3IFJlZ0V4cCgnKF58ICknICsgY2xhc3NOYW1lICsgJyggfCQpJywgJ2dpJykudGVzdChlbC5jbGFzc05hbWUpO1xuICB9XG59O1xuXG5RSi5yZW1vdmVDbGFzcyA9IGZ1bmN0aW9uKGVsLCBjbGFzc05hbWUpIHtcbiAgdmFyIGNscywgZSwgaSwgbGVuLCByZWYsIHJlc3VsdHM7XG4gIGlmIChlbC5sZW5ndGgpIHtcbiAgICByZXR1cm4gKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGksIGxlbiwgcmVzdWx0cztcbiAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgIGZvciAoaSA9IDAsIGxlbiA9IGVsLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGUgPSBlbFtpXTtcbiAgICAgICAgcmVzdWx0cy5wdXNoKFFKLnJlbW92ZUNsYXNzKGUsIGNsYXNzTmFtZSkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfSkoKTtcbiAgfVxuICBpZiAoZWwuY2xhc3NMaXN0KSB7XG4gICAgcmVmID0gY2xhc3NOYW1lLnNwbGl0KCcgJyk7XG4gICAgcmVzdWx0cyA9IFtdO1xuICAgIGZvciAoaSA9IDAsIGxlbiA9IHJlZi5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgY2xzID0gcmVmW2ldO1xuICAgICAgcmVzdWx0cy5wdXNoKGVsLmNsYXNzTGlzdC5yZW1vdmUoY2xzKSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRzO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBlbC5jbGFzc05hbWUgPSBlbC5jbGFzc05hbWUucmVwbGFjZShuZXcgUmVnRXhwKCcoXnxcXFxcYiknICsgY2xhc3NOYW1lLnNwbGl0KCcgJykuam9pbignfCcpICsgJyhcXFxcYnwkKScsICdnaScpLCAnICcpO1xuICB9XG59O1xuXG5RSi50b2dnbGVDbGFzcyA9IGZ1bmN0aW9uKGVsLCBjbGFzc05hbWUsIGJvb2wpIHtcbiAgdmFyIGU7XG4gIGlmIChlbC5sZW5ndGgpIHtcbiAgICByZXR1cm4gKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGksIGxlbiwgcmVzdWx0cztcbiAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgIGZvciAoaSA9IDAsIGxlbiA9IGVsLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGUgPSBlbFtpXTtcbiAgICAgICAgcmVzdWx0cy5wdXNoKFFKLnRvZ2dsZUNsYXNzKGUsIGNsYXNzTmFtZSwgYm9vbCkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfSkoKTtcbiAgfVxuICBpZiAoYm9vbCkge1xuICAgIGlmICghUUouaGFzQ2xhc3MoZWwsIGNsYXNzTmFtZSkpIHtcbiAgICAgIHJldHVybiBRSi5hZGRDbGFzcyhlbCwgY2xhc3NOYW1lKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIFFKLnJlbW92ZUNsYXNzKGVsLCBjbGFzc05hbWUpO1xuICB9XG59O1xuXG5RSi5hcHBlbmQgPSBmdW5jdGlvbihlbCwgdG9BcHBlbmQpIHtcbiAgdmFyIGU7XG4gIGlmIChlbC5sZW5ndGgpIHtcbiAgICByZXR1cm4gKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGksIGxlbiwgcmVzdWx0cztcbiAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgIGZvciAoaSA9IDAsIGxlbiA9IGVsLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGUgPSBlbFtpXTtcbiAgICAgICAgcmVzdWx0cy5wdXNoKFFKLmFwcGVuZChlLCB0b0FwcGVuZCkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfSkoKTtcbiAgfVxuICByZXR1cm4gZWwuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCB0b0FwcGVuZCk7XG59O1xuXG5RSi5maW5kID0gZnVuY3Rpb24oZWwsIHNlbGVjdG9yKSB7XG4gIGlmIChlbCBpbnN0YW5jZW9mIE5vZGVMaXN0IHx8IGVsIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICBlbCA9IGVsWzBdO1xuICB9XG4gIHJldHVybiBlbC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbn07XG5cblFKLnRyaWdnZXIgPSBmdW5jdGlvbihlbCwgbmFtZSwgZGF0YSkge1xuICB2YXIgZSwgZXJyb3IsIGV2O1xuICB0cnkge1xuICAgIGV2ID0gbmV3IEN1c3RvbUV2ZW50KG5hbWUsIHtcbiAgICAgIGRldGFpbDogZGF0YVxuICAgIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGUgPSBlcnJvcjtcbiAgICBldiA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuICAgIGlmIChldi5pbml0Q3VzdG9tRXZlbnQpIHtcbiAgICAgIGV2LmluaXRDdXN0b21FdmVudChuYW1lLCB0cnVlLCB0cnVlLCBkYXRhKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXYuaW5pdEV2ZW50KG5hbWUsIHRydWUsIHRydWUsIGRhdGEpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZWwuZGlzcGF0Y2hFdmVudChldik7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFFKO1xuXG5cbn0se31dLDI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuKGZ1bmN0aW9uIChnbG9iYWwpe1xudmFyIFBheW1lbnQsIFFKLCBjYXJkRnJvbU51bWJlciwgY2FyZEZyb21UeXBlLCBjYXJkcywgZGVmYXVsdEZvcm1hdCwgZm9ybWF0QmFja0NhcmROdW1iZXIsIGZvcm1hdEJhY2tFeHBpcnksIGZvcm1hdENhcmROdW1iZXIsIGZvcm1hdEV4cGlyeSwgZm9ybWF0Rm9yd2FyZEV4cGlyeSwgZm9ybWF0Rm9yd2FyZFNsYXNoLCBmb3JtYXRNb250aEV4cGlyeSwgaGFzVGV4dFNlbGVjdGVkLCBsdWhuQ2hlY2ssIHJlRm9ybWF0Q2FyZE51bWJlciwgcmVzdHJpY3RDVkMsIHJlc3RyaWN0Q2FyZE51bWJlciwgcmVzdHJpY3RDb21iaW5lZEV4cGlyeSwgcmVzdHJpY3RFeHBpcnksIHJlc3RyaWN0TW9udGhFeHBpcnksIHJlc3RyaWN0TnVtZXJpYywgcmVzdHJpY3RZZWFyRXhwaXJ5LCBzZXRDYXJkVHlwZSxcbiAgaW5kZXhPZiA9IFtdLmluZGV4T2YgfHwgZnVuY3Rpb24oaXRlbSkgeyBmb3IgKHZhciBpID0gMCwgbCA9IHRoaXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7IGlmIChpIGluIHRoaXMgJiYgdGhpc1tpXSA9PT0gaXRlbSkgcmV0dXJuIGk7IH0gcmV0dXJuIC0xOyB9O1xuXG5RSiA9IHJlcXVpcmUoJ3FqL3NyYy9xai5jb2ZmZWUnKTtcblxuZGVmYXVsdEZvcm1hdCA9IC8oXFxkezEsNH0pL2c7XG5cbmNhcmRzID0gW1xuICB7XG4gICAgdHlwZTogJ2FtZXgnLFxuICAgIHBhdHRlcm46IC9eM1s0N10vLFxuICAgIGZvcm1hdDogLyhcXGR7MSw0fSkoXFxkezEsNn0pPyhcXGR7MSw1fSk/LyxcbiAgICBsZW5ndGg6IFsxNV0sXG4gICAgY3ZjTGVuZ3RoOiBbNF0sXG4gICAgbHVobjogdHJ1ZVxuICB9LCB7XG4gICAgdHlwZTogJ2RhbmtvcnQnLFxuICAgIHBhdHRlcm46IC9eNTAxOS8sXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGxlbmd0aDogWzE2XSxcbiAgICBjdmNMZW5ndGg6IFszXSxcbiAgICBsdWhuOiB0cnVlXG4gIH0sIHtcbiAgICB0eXBlOiAnZGluZXJzY2x1YicsXG4gICAgcGF0dGVybjogL14oMzZ8Mzh8MzBbMC01XSkvLFxuICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICBsZW5ndGg6IFsxNF0sXG4gICAgY3ZjTGVuZ3RoOiBbM10sXG4gICAgbHVobjogdHJ1ZVxuICB9LCB7XG4gICAgdHlwZTogJ2Rpc2NvdmVyJyxcbiAgICBwYXR0ZXJuOiAvXig2MDExfDY1fDY0WzQtOV18NjIyKS8sXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGxlbmd0aDogWzE2XSxcbiAgICBjdmNMZW5ndGg6IFszXSxcbiAgICBsdWhuOiB0cnVlXG4gIH0sIHtcbiAgICB0eXBlOiAnamNiJyxcbiAgICBwYXR0ZXJuOiAvXjM1LyxcbiAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgbGVuZ3RoOiBbMTZdLFxuICAgIGN2Y0xlbmd0aDogWzNdLFxuICAgIGx1aG46IHRydWVcbiAgfSwge1xuICAgIHR5cGU6ICdsYXNlcicsXG4gICAgcGF0dGVybjogL14oNjcwNnw2NzcxfDY3MDkpLyxcbiAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgbGVuZ3RoOiBbMTYsIDE3LCAxOCwgMTldLFxuICAgIGN2Y0xlbmd0aDogWzNdLFxuICAgIGx1aG46IHRydWVcbiAgfSwge1xuICAgIHR5cGU6ICdtYWVzdHJvJyxcbiAgICBwYXR0ZXJuOiAvXig1MDE4fDUwMjB8NTAzOHw2MzA0fDY3MDN8Njc1OXw2NzZbMS0zXSkvLFxuICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICBsZW5ndGg6IFsxMiwgMTMsIDE0LCAxNSwgMTYsIDE3LCAxOCwgMTldLFxuICAgIGN2Y0xlbmd0aDogWzNdLFxuICAgIGx1aG46IHRydWVcbiAgfSwge1xuICAgIHR5cGU6ICdtYXN0ZXJjYXJkJyxcbiAgICBwYXR0ZXJuOiAvXjVbMS01XS8sXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGxlbmd0aDogWzE2XSxcbiAgICBjdmNMZW5ndGg6IFszXSxcbiAgICBsdWhuOiB0cnVlXG4gIH0sIHtcbiAgICB0eXBlOiAndW5pb25wYXknLFxuICAgIHBhdHRlcm46IC9eNjIvLFxuICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICBsZW5ndGg6IFsxNiwgMTcsIDE4LCAxOV0sXG4gICAgY3ZjTGVuZ3RoOiBbM10sXG4gICAgbHVobjogZmFsc2VcbiAgfSwge1xuICAgIHR5cGU6ICd2aXNhZWxlY3Ryb24nLFxuICAgIHBhdHRlcm46IC9eNCgwMjZ8MTc1MDB8NDA1fDUwOHw4NDR8OTFbMzddKS8sXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGxlbmd0aDogWzE2XSxcbiAgICBjdmNMZW5ndGg6IFszXSxcbiAgICBsdWhuOiB0cnVlXG4gIH0sIHtcbiAgICB0eXBlOiAndmlzYScsXG4gICAgcGF0dGVybjogL140LyxcbiAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgbGVuZ3RoOiBbMTMsIDE2XSxcbiAgICBjdmNMZW5ndGg6IFszXSxcbiAgICBsdWhuOiB0cnVlXG4gIH0sIHtcbiAgICB0eXBlOiAnZWxvJyxcbiAgICBwYXR0ZXJuOiAvXjQwMTF8NDM4OTM1fDQ1KDE0MTZ8NzYpfDUwKDQxNzV8NjY5OXw2N3w5MFs0LTddKXw2Myg2Mjk3fDYzNjgpLyxcbiAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgbGVuZ3RoOiBbMTZdLFxuICAgIGN2Y0xlbmd0aDogWzNdLFxuICAgIGx1aG46IHRydWVcbiAgfVxuXTtcblxuY2FyZEZyb21OdW1iZXIgPSBmdW5jdGlvbihudW0pIHtcbiAgdmFyIGNhcmQsIGksIGxlbjtcbiAgbnVtID0gKG51bSArICcnKS5yZXBsYWNlKC9cXEQvZywgJycpO1xuICBmb3IgKGkgPSAwLCBsZW4gPSBjYXJkcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGNhcmQgPSBjYXJkc1tpXTtcbiAgICBpZiAoY2FyZC5wYXR0ZXJuLnRlc3QobnVtKSkge1xuICAgICAgcmV0dXJuIGNhcmQ7XG4gICAgfVxuICB9XG59O1xuXG5jYXJkRnJvbVR5cGUgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciBjYXJkLCBpLCBsZW47XG4gIGZvciAoaSA9IDAsIGxlbiA9IGNhcmRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgY2FyZCA9IGNhcmRzW2ldO1xuICAgIGlmIChjYXJkLnR5cGUgPT09IHR5cGUpIHtcbiAgICAgIHJldHVybiBjYXJkO1xuICAgIH1cbiAgfVxufTtcblxubHVobkNoZWNrID0gZnVuY3Rpb24obnVtKSB7XG4gIHZhciBkaWdpdCwgZGlnaXRzLCBpLCBsZW4sIG9kZCwgc3VtO1xuICBvZGQgPSB0cnVlO1xuICBzdW0gPSAwO1xuICBkaWdpdHMgPSAobnVtICsgJycpLnNwbGl0KCcnKS5yZXZlcnNlKCk7XG4gIGZvciAoaSA9IDAsIGxlbiA9IGRpZ2l0cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGRpZ2l0ID0gZGlnaXRzW2ldO1xuICAgIGRpZ2l0ID0gcGFyc2VJbnQoZGlnaXQsIDEwKTtcbiAgICBpZiAoKG9kZCA9ICFvZGQpKSB7XG4gICAgICBkaWdpdCAqPSAyO1xuICAgIH1cbiAgICBpZiAoZGlnaXQgPiA5KSB7XG4gICAgICBkaWdpdCAtPSA5O1xuICAgIH1cbiAgICBzdW0gKz0gZGlnaXQ7XG4gIH1cbiAgcmV0dXJuIHN1bSAlIDEwID09PSAwO1xufTtcblxuaGFzVGV4dFNlbGVjdGVkID0gZnVuY3Rpb24odGFyZ2V0KSB7XG4gIHZhciByZWY7XG4gIGlmICgodGFyZ2V0LnNlbGVjdGlvblN0YXJ0ICE9IG51bGwpICYmIHRhcmdldC5zZWxlY3Rpb25TdGFydCAhPT0gdGFyZ2V0LnNlbGVjdGlvbkVuZCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmICgodHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiICYmIGRvY3VtZW50ICE9PSBudWxsID8gKHJlZiA9IGRvY3VtZW50LnNlbGVjdGlvbikgIT0gbnVsbCA/IHJlZi5jcmVhdGVSYW5nZSA6IHZvaWQgMCA6IHZvaWQgMCkgIT0gbnVsbCkge1xuICAgIGlmIChkb2N1bWVudC5zZWxlY3Rpb24uY3JlYXRlUmFuZ2UoKS50ZXh0KSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxucmVGb3JtYXRDYXJkTnVtYmVyID0gZnVuY3Rpb24oZSkge1xuICByZXR1cm4gc2V0VGltZW91dCgoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgdGFyZ2V0LCB2YWx1ZTtcbiAgICAgIHRhcmdldCA9IGUudGFyZ2V0O1xuICAgICAgdmFsdWUgPSBRSi52YWwodGFyZ2V0KTtcbiAgICAgIHZhbHVlID0gUGF5bWVudC5mbnMuZm9ybWF0Q2FyZE51bWJlcih2YWx1ZSk7XG4gICAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgdmFsdWUpO1xuICAgIH07XG4gIH0pKHRoaXMpKTtcbn07XG5cbmZvcm1hdENhcmROdW1iZXIgPSBmdW5jdGlvbihlKSB7XG4gIHZhciBjYXJkLCBkaWdpdCwgbGVuZ3RoLCByZSwgdGFyZ2V0LCB1cHBlckxlbmd0aCwgdmFsdWU7XG4gIGRpZ2l0ID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKTtcbiAgaWYgKCEvXlxcZCskLy50ZXN0KGRpZ2l0KSkge1xuICAgIHJldHVybjtcbiAgfVxuICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgdmFsdWUgPSBRSi52YWwodGFyZ2V0KTtcbiAgY2FyZCA9IGNhcmRGcm9tTnVtYmVyKHZhbHVlICsgZGlnaXQpO1xuICBsZW5ndGggPSAodmFsdWUucmVwbGFjZSgvXFxEL2csICcnKSArIGRpZ2l0KS5sZW5ndGg7XG4gIHVwcGVyTGVuZ3RoID0gMTY7XG4gIGlmIChjYXJkKSB7XG4gICAgdXBwZXJMZW5ndGggPSBjYXJkLmxlbmd0aFtjYXJkLmxlbmd0aC5sZW5ndGggLSAxXTtcbiAgfVxuICBpZiAobGVuZ3RoID49IHVwcGVyTGVuZ3RoKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICgodGFyZ2V0LnNlbGVjdGlvblN0YXJ0ICE9IG51bGwpICYmIHRhcmdldC5zZWxlY3Rpb25TdGFydCAhPT0gdmFsdWUubGVuZ3RoKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChjYXJkICYmIGNhcmQudHlwZSA9PT0gJ2FtZXgnKSB7XG4gICAgcmUgPSAvXihcXGR7NH18XFxkezR9XFxzXFxkezZ9KSQvO1xuICB9IGVsc2Uge1xuICAgIHJlID0gLyg/Ol58XFxzKShcXGR7NH0pJC87XG4gIH1cbiAgaWYgKHJlLnRlc3QodmFsdWUpKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCB2YWx1ZSArICcgJyArIGRpZ2l0KTtcbiAgfSBlbHNlIGlmIChyZS50ZXN0KHZhbHVlICsgZGlnaXQpKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCB2YWx1ZSArIGRpZ2l0ICsgJyAnKTtcbiAgfVxufTtcblxuZm9ybWF0QmFja0NhcmROdW1iZXIgPSBmdW5jdGlvbihlKSB7XG4gIHZhciB0YXJnZXQsIHZhbHVlO1xuICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgdmFsdWUgPSBRSi52YWwodGFyZ2V0KTtcbiAgaWYgKGUubWV0YSkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoZS53aGljaCAhPT0gOCkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoKHRhcmdldC5zZWxlY3Rpb25TdGFydCAhPSBudWxsKSAmJiB0YXJnZXQuc2VsZWN0aW9uU3RhcnQgIT09IHZhbHVlLmxlbmd0aCkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoL1xcZFxccyQvLnRlc3QodmFsdWUpKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCB2YWx1ZS5yZXBsYWNlKC9cXGRcXHMkLywgJycpKTtcbiAgfSBlbHNlIGlmICgvXFxzXFxkPyQvLnRlc3QodmFsdWUpKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCB2YWx1ZS5yZXBsYWNlKC9cXHNcXGQ/JC8sICcnKSk7XG4gIH1cbn07XG5cbmZvcm1hdEV4cGlyeSA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIGRpZ2l0LCB0YXJnZXQsIHZhbDtcbiAgZGlnaXQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpO1xuICBpZiAoIS9eXFxkKyQvLnRlc3QoZGlnaXQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRhcmdldCA9IGUudGFyZ2V0O1xuICB2YWwgPSBRSi52YWwodGFyZ2V0KSArIGRpZ2l0O1xuICBpZiAoL15cXGQkLy50ZXN0KHZhbCkgJiYgKHZhbCAhPT0gJzAnICYmIHZhbCAhPT0gJzEnKSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgXCIwXCIgKyB2YWwgKyBcIiAvIFwiKTtcbiAgfSBlbHNlIGlmICgvXlxcZFxcZCQvLnRlc3QodmFsKSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgdmFsICsgXCIgLyBcIik7XG4gIH1cbn07XG5cbmZvcm1hdE1vbnRoRXhwaXJ5ID0gZnVuY3Rpb24oZSkge1xuICB2YXIgZGlnaXQsIHRhcmdldCwgdmFsO1xuICBkaWdpdCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZS53aGljaCk7XG4gIGlmICghL15cXGQrJC8udGVzdChkaWdpdCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gIHZhbCA9IFFKLnZhbCh0YXJnZXQpICsgZGlnaXQ7XG4gIGlmICgvXlxcZCQvLnRlc3QodmFsKSAmJiAodmFsICE9PSAnMCcgJiYgdmFsICE9PSAnMScpKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCBcIjBcIiArIHZhbCk7XG4gIH0gZWxzZSBpZiAoL15cXGRcXGQkLy50ZXN0KHZhbCkpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIFwiXCIgKyB2YWwpO1xuICB9XG59O1xuXG5mb3JtYXRGb3J3YXJkRXhwaXJ5ID0gZnVuY3Rpb24oZSkge1xuICB2YXIgZGlnaXQsIHRhcmdldCwgdmFsO1xuICBkaWdpdCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZS53aGljaCk7XG4gIGlmICghL15cXGQrJC8udGVzdChkaWdpdCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gIHZhbCA9IFFKLnZhbCh0YXJnZXQpO1xuICBpZiAoL15cXGRcXGQkLy50ZXN0KHZhbCkpIHtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgdmFsICsgXCIgLyBcIik7XG4gIH1cbn07XG5cbmZvcm1hdEZvcndhcmRTbGFzaCA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIHNsYXNoLCB0YXJnZXQsIHZhbDtcbiAgc2xhc2ggPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpO1xuICBpZiAoc2xhc2ggIT09ICcvJykge1xuICAgIHJldHVybjtcbiAgfVxuICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgdmFsID0gUUoudmFsKHRhcmdldCk7XG4gIGlmICgvXlxcZCQvLnRlc3QodmFsKSAmJiB2YWwgIT09ICcwJykge1xuICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCBcIjBcIiArIHZhbCArIFwiIC8gXCIpO1xuICB9XG59O1xuXG5mb3JtYXRCYWNrRXhwaXJ5ID0gZnVuY3Rpb24oZSkge1xuICB2YXIgdGFyZ2V0LCB2YWx1ZTtcbiAgaWYgKGUubWV0YUtleSkge1xuICAgIHJldHVybjtcbiAgfVxuICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgdmFsdWUgPSBRSi52YWwodGFyZ2V0KTtcbiAgaWYgKGUud2hpY2ggIT09IDgpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKCh0YXJnZXQuc2VsZWN0aW9uU3RhcnQgIT0gbnVsbCkgJiYgdGFyZ2V0LnNlbGVjdGlvblN0YXJ0ICE9PSB2YWx1ZS5sZW5ndGgpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKC9cXGQoXFxzfFxcLykrJC8udGVzdCh2YWx1ZSkpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIHZhbHVlLnJlcGxhY2UoL1xcZChcXHN8XFwvKSokLywgJycpKTtcbiAgfSBlbHNlIGlmICgvXFxzXFwvXFxzP1xcZD8kLy50ZXN0KHZhbHVlKSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgdmFsdWUucmVwbGFjZSgvXFxzXFwvXFxzP1xcZD8kLywgJycpKTtcbiAgfVxufTtcblxucmVzdHJpY3ROdW1lcmljID0gZnVuY3Rpb24oZSkge1xuICB2YXIgaW5wdXQ7XG4gIGlmIChlLm1ldGFLZXkgfHwgZS5jdHJsS2V5KSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKGUud2hpY2ggPT09IDMyKSB7XG4gICAgcmV0dXJuIGUucHJldmVudERlZmF1bHQoKTtcbiAgfVxuICBpZiAoZS53aGljaCA9PT0gMCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmIChlLndoaWNoIDwgMzMpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpbnB1dCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZS53aGljaCk7XG4gIGlmICghL1tcXGRcXHNdLy50ZXN0KGlucHV0KSkge1xuICAgIHJldHVybiBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH1cbn07XG5cbnJlc3RyaWN0Q2FyZE51bWJlciA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIGNhcmQsIGRpZ2l0LCB0YXJnZXQsIHZhbHVlO1xuICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgZGlnaXQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpO1xuICBpZiAoIS9eXFxkKyQvLnRlc3QoZGlnaXQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChoYXNUZXh0U2VsZWN0ZWQodGFyZ2V0KSkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YWx1ZSA9IChRSi52YWwodGFyZ2V0KSArIGRpZ2l0KS5yZXBsYWNlKC9cXEQvZywgJycpO1xuICBjYXJkID0gY2FyZEZyb21OdW1iZXIodmFsdWUpO1xuICBpZiAoY2FyZCkge1xuICAgIGlmICghKHZhbHVlLmxlbmd0aCA8PSBjYXJkLmxlbmd0aFtjYXJkLmxlbmd0aC5sZW5ndGggLSAxXSkpIHtcbiAgICAgIHJldHVybiBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmICghKHZhbHVlLmxlbmd0aCA8PSAxNikpIHtcbiAgICAgIHJldHVybiBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG59O1xuXG5yZXN0cmljdEV4cGlyeSA9IGZ1bmN0aW9uKGUsIGxlbmd0aCkge1xuICB2YXIgZGlnaXQsIHRhcmdldCwgdmFsdWU7XG4gIHRhcmdldCA9IGUudGFyZ2V0O1xuICBkaWdpdCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZS53aGljaCk7XG4gIGlmICghL15cXGQrJC8udGVzdChkaWdpdCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGhhc1RleHRTZWxlY3RlZCh0YXJnZXQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhbHVlID0gUUoudmFsKHRhcmdldCkgKyBkaWdpdDtcbiAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9cXEQvZywgJycpO1xuICBpZiAodmFsdWUubGVuZ3RoID4gbGVuZ3RoKSB7XG4gICAgcmV0dXJuIGUucHJldmVudERlZmF1bHQoKTtcbiAgfVxufTtcblxucmVzdHJpY3RDb21iaW5lZEV4cGlyeSA9IGZ1bmN0aW9uKGUpIHtcbiAgcmV0dXJuIHJlc3RyaWN0RXhwaXJ5KGUsIDYpO1xufTtcblxucmVzdHJpY3RNb250aEV4cGlyeSA9IGZ1bmN0aW9uKGUpIHtcbiAgcmV0dXJuIHJlc3RyaWN0RXhwaXJ5KGUsIDIpO1xufTtcblxucmVzdHJpY3RZZWFyRXhwaXJ5ID0gZnVuY3Rpb24oZSkge1xuICByZXR1cm4gcmVzdHJpY3RFeHBpcnkoZSwgNCk7XG59O1xuXG5yZXN0cmljdENWQyA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIGRpZ2l0LCB0YXJnZXQsIHZhbDtcbiAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gIGRpZ2l0ID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKTtcbiAgaWYgKCEvXlxcZCskLy50ZXN0KGRpZ2l0KSkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoaGFzVGV4dFNlbGVjdGVkKHRhcmdldCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFsID0gUUoudmFsKHRhcmdldCkgKyBkaWdpdDtcbiAgaWYgKCEodmFsLmxlbmd0aCA8PSA0KSkge1xuICAgIHJldHVybiBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH1cbn07XG5cbnNldENhcmRUeXBlID0gZnVuY3Rpb24oZSkge1xuICB2YXIgYWxsVHlwZXMsIGNhcmQsIGNhcmRUeXBlLCB0YXJnZXQsIHZhbDtcbiAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gIHZhbCA9IFFKLnZhbCh0YXJnZXQpO1xuICBjYXJkVHlwZSA9IFBheW1lbnQuZm5zLmNhcmRUeXBlKHZhbCkgfHwgJ3Vua25vd24nO1xuICBpZiAoIVFKLmhhc0NsYXNzKHRhcmdldCwgY2FyZFR5cGUpKSB7XG4gICAgYWxsVHlwZXMgPSAoZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaSwgbGVuLCByZXN1bHRzO1xuICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgZm9yIChpID0gMCwgbGVuID0gY2FyZHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgY2FyZCA9IGNhcmRzW2ldO1xuICAgICAgICByZXN1bHRzLnB1c2goY2FyZC50eXBlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH0pKCk7XG4gICAgUUoucmVtb3ZlQ2xhc3ModGFyZ2V0LCAndW5rbm93bicpO1xuICAgIFFKLnJlbW92ZUNsYXNzKHRhcmdldCwgYWxsVHlwZXMuam9pbignICcpKTtcbiAgICBRSi5hZGRDbGFzcyh0YXJnZXQsIGNhcmRUeXBlKTtcbiAgICBRSi50b2dnbGVDbGFzcyh0YXJnZXQsICdpZGVudGlmaWVkJywgY2FyZFR5cGUgIT09ICd1bmtub3duJyk7XG4gICAgcmV0dXJuIFFKLnRyaWdnZXIodGFyZ2V0LCAncGF5bWVudC5jYXJkVHlwZScsIGNhcmRUeXBlKTtcbiAgfVxufTtcblxuUGF5bWVudCA9IChmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gUGF5bWVudCgpIHt9XG5cbiAgUGF5bWVudC5mbnMgPSB7XG4gICAgY2FyZEV4cGlyeVZhbDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHZhciBtb250aCwgcHJlZml4LCByZWYsIHllYXI7XG4gICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1xccy9nLCAnJyk7XG4gICAgICByZWYgPSB2YWx1ZS5zcGxpdCgnLycsIDIpLCBtb250aCA9IHJlZlswXSwgeWVhciA9IHJlZlsxXTtcbiAgICAgIGlmICgoeWVhciAhPSBudWxsID8geWVhci5sZW5ndGggOiB2b2lkIDApID09PSAyICYmIC9eXFxkKyQvLnRlc3QoeWVhcikpIHtcbiAgICAgICAgcHJlZml4ID0gKG5ldyBEYXRlKS5nZXRGdWxsWWVhcigpO1xuICAgICAgICBwcmVmaXggPSBwcmVmaXgudG9TdHJpbmcoKS5zbGljZSgwLCAyKTtcbiAgICAgICAgeWVhciA9IHByZWZpeCArIHllYXI7XG4gICAgICB9XG4gICAgICBtb250aCA9IHBhcnNlSW50KG1vbnRoLCAxMCk7XG4gICAgICB5ZWFyID0gcGFyc2VJbnQoeWVhciwgMTApO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbW9udGg6IG1vbnRoLFxuICAgICAgICB5ZWFyOiB5ZWFyXG4gICAgICB9O1xuICAgIH0sXG4gICAgdmFsaWRhdGVDYXJkTnVtYmVyOiBmdW5jdGlvbihudW0pIHtcbiAgICAgIHZhciBjYXJkLCByZWY7XG4gICAgICBudW0gPSAobnVtICsgJycpLnJlcGxhY2UoL1xccyt8LS9nLCAnJyk7XG4gICAgICBpZiAoIS9eXFxkKyQvLnRlc3QobnVtKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBjYXJkID0gY2FyZEZyb21OdW1iZXIobnVtKTtcbiAgICAgIGlmICghY2FyZCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gKHJlZiA9IG51bS5sZW5ndGgsIGluZGV4T2YuY2FsbChjYXJkLmxlbmd0aCwgcmVmKSA+PSAwKSAmJiAoY2FyZC5sdWhuID09PSBmYWxzZSB8fCBsdWhuQ2hlY2sobnVtKSk7XG4gICAgfSxcbiAgICB2YWxpZGF0ZUNhcmRFeHBpcnk6IGZ1bmN0aW9uKG1vbnRoLCB5ZWFyKSB7XG4gICAgICB2YXIgY3VycmVudFRpbWUsIGV4cGlyeSwgcHJlZml4LCByZWY7XG4gICAgICBpZiAodHlwZW9mIG1vbnRoID09PSAnb2JqZWN0JyAmJiAnbW9udGgnIGluIG1vbnRoKSB7XG4gICAgICAgIHJlZiA9IG1vbnRoLCBtb250aCA9IHJlZi5tb250aCwgeWVhciA9IHJlZi55ZWFyO1xuICAgICAgfVxuICAgICAgaWYgKCEobW9udGggJiYgeWVhcikpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgbW9udGggPSBRSi50cmltKG1vbnRoKTtcbiAgICAgIHllYXIgPSBRSi50cmltKHllYXIpO1xuICAgICAgaWYgKCEvXlxcZCskLy50ZXN0KG1vbnRoKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoIS9eXFxkKyQvLnRlc3QoeWVhcikpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKCEocGFyc2VJbnQobW9udGgsIDEwKSA8PSAxMikpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKHllYXIubGVuZ3RoID09PSAyKSB7XG4gICAgICAgIHByZWZpeCA9IChuZXcgRGF0ZSkuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgcHJlZml4ID0gcHJlZml4LnRvU3RyaW5nKCkuc2xpY2UoMCwgMik7XG4gICAgICAgIHllYXIgPSBwcmVmaXggKyB5ZWFyO1xuICAgICAgfVxuICAgICAgZXhwaXJ5ID0gbmV3IERhdGUoeWVhciwgbW9udGgpO1xuICAgICAgY3VycmVudFRpbWUgPSBuZXcgRGF0ZTtcbiAgICAgIGV4cGlyeS5zZXRNb250aChleHBpcnkuZ2V0TW9udGgoKSAtIDEpO1xuICAgICAgZXhwaXJ5LnNldE1vbnRoKGV4cGlyeS5nZXRNb250aCgpICsgMSwgMSk7XG4gICAgICByZXR1cm4gZXhwaXJ5ID4gY3VycmVudFRpbWU7XG4gICAgfSxcbiAgICB2YWxpZGF0ZUNhcmRDVkM6IGZ1bmN0aW9uKGN2YywgdHlwZSkge1xuICAgICAgdmFyIHJlZiwgcmVmMTtcbiAgICAgIGN2YyA9IFFKLnRyaW0oY3ZjKTtcbiAgICAgIGlmICghL15cXGQrJC8udGVzdChjdmMpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlICYmIGNhcmRGcm9tVHlwZSh0eXBlKSkge1xuICAgICAgICByZXR1cm4gcmVmID0gY3ZjLmxlbmd0aCwgaW5kZXhPZi5jYWxsKChyZWYxID0gY2FyZEZyb21UeXBlKHR5cGUpKSAhPSBudWxsID8gcmVmMS5jdmNMZW5ndGggOiB2b2lkIDAsIHJlZikgPj0gMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBjdmMubGVuZ3RoID49IDMgJiYgY3ZjLmxlbmd0aCA8PSA0O1xuICAgICAgfVxuICAgIH0sXG4gICAgY2FyZFR5cGU6IGZ1bmN0aW9uKG51bSkge1xuICAgICAgdmFyIHJlZjtcbiAgICAgIGlmICghbnVtKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgcmV0dXJuICgocmVmID0gY2FyZEZyb21OdW1iZXIobnVtKSkgIT0gbnVsbCA/IHJlZi50eXBlIDogdm9pZCAwKSB8fCBudWxsO1xuICAgIH0sXG4gICAgZm9ybWF0Q2FyZE51bWJlcjogZnVuY3Rpb24obnVtKSB7XG4gICAgICB2YXIgY2FyZCwgZ3JvdXBzLCByZWYsIHVwcGVyTGVuZ3RoO1xuICAgICAgY2FyZCA9IGNhcmRGcm9tTnVtYmVyKG51bSk7XG4gICAgICBpZiAoIWNhcmQpIHtcbiAgICAgICAgcmV0dXJuIG51bTtcbiAgICAgIH1cbiAgICAgIHVwcGVyTGVuZ3RoID0gY2FyZC5sZW5ndGhbY2FyZC5sZW5ndGgubGVuZ3RoIC0gMV07XG4gICAgICBudW0gPSBudW0ucmVwbGFjZSgvXFxEL2csICcnKTtcbiAgICAgIG51bSA9IG51bS5zbGljZSgwLCArdXBwZXJMZW5ndGggKyAxIHx8IDllOSk7XG4gICAgICBpZiAoY2FyZC5mb3JtYXQuZ2xvYmFsKSB7XG4gICAgICAgIHJldHVybiAocmVmID0gbnVtLm1hdGNoKGNhcmQuZm9ybWF0KSkgIT0gbnVsbCA/IHJlZi5qb2luKCcgJykgOiB2b2lkIDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBncm91cHMgPSBjYXJkLmZvcm1hdC5leGVjKG51bSk7XG4gICAgICAgIGlmIChncm91cHMgIT0gbnVsbCkge1xuICAgICAgICAgIGdyb3Vwcy5zaGlmdCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBncm91cHMgIT0gbnVsbCA/IGdyb3Vwcy5qb2luKCcgJykgOiB2b2lkIDA7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIFBheW1lbnQucmVzdHJpY3ROdW1lcmljID0gZnVuY3Rpb24oZWwpIHtcbiAgICByZXR1cm4gUUoub24oZWwsICdrZXlwcmVzcycsIHJlc3RyaWN0TnVtZXJpYyk7XG4gIH07XG5cbiAgUGF5bWVudC5jYXJkRXhwaXJ5VmFsID0gZnVuY3Rpb24oZWwpIHtcbiAgICByZXR1cm4gUGF5bWVudC5mbnMuY2FyZEV4cGlyeVZhbChRSi52YWwoZWwpKTtcbiAgfTtcblxuICBQYXltZW50LmZvcm1hdENhcmRDVkMgPSBmdW5jdGlvbihlbCkge1xuICAgIFBheW1lbnQucmVzdHJpY3ROdW1lcmljKGVsKTtcbiAgICBRSi5vbihlbCwgJ2tleXByZXNzJywgcmVzdHJpY3RDVkMpO1xuICAgIHJldHVybiBlbDtcbiAgfTtcblxuICBQYXltZW50LmZvcm1hdENhcmRFeHBpcnkgPSBmdW5jdGlvbihlbCkge1xuICAgIHZhciBtb250aCwgeWVhcjtcbiAgICBQYXltZW50LnJlc3RyaWN0TnVtZXJpYyhlbCk7XG4gICAgaWYgKGVsLmxlbmd0aCAmJiBlbC5sZW5ndGggPT09IDIpIHtcbiAgICAgIG1vbnRoID0gZWxbMF0sIHllYXIgPSBlbFsxXTtcbiAgICAgIHRoaXMuZm9ybWF0Q2FyZEV4cGlyeU11bHRpcGxlKG1vbnRoLCB5ZWFyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgUUoub24oZWwsICdrZXlwcmVzcycsIHJlc3RyaWN0Q29tYmluZWRFeHBpcnkpO1xuICAgICAgUUoub24oZWwsICdrZXlwcmVzcycsIGZvcm1hdEV4cGlyeSk7XG4gICAgICBRSi5vbihlbCwgJ2tleXByZXNzJywgZm9ybWF0Rm9yd2FyZFNsYXNoKTtcbiAgICAgIFFKLm9uKGVsLCAna2V5cHJlc3MnLCBmb3JtYXRGb3J3YXJkRXhwaXJ5KTtcbiAgICAgIFFKLm9uKGVsLCAna2V5ZG93bicsIGZvcm1hdEJhY2tFeHBpcnkpO1xuICAgIH1cbiAgICByZXR1cm4gZWw7XG4gIH07XG5cbiAgUGF5bWVudC5mb3JtYXRDYXJkRXhwaXJ5TXVsdGlwbGUgPSBmdW5jdGlvbihtb250aCwgeWVhcikge1xuICAgIFFKLm9uKG1vbnRoLCAna2V5cHJlc3MnLCByZXN0cmljdE1vbnRoRXhwaXJ5KTtcbiAgICBRSi5vbihtb250aCwgJ2tleXByZXNzJywgZm9ybWF0TW9udGhFeHBpcnkpO1xuICAgIHJldHVybiBRSi5vbih5ZWFyLCAna2V5cHJlc3MnLCByZXN0cmljdFllYXJFeHBpcnkpO1xuICB9O1xuXG4gIFBheW1lbnQuZm9ybWF0Q2FyZE51bWJlciA9IGZ1bmN0aW9uKGVsKSB7XG4gICAgUGF5bWVudC5yZXN0cmljdE51bWVyaWMoZWwpO1xuICAgIFFKLm9uKGVsLCAna2V5cHJlc3MnLCByZXN0cmljdENhcmROdW1iZXIpO1xuICAgIFFKLm9uKGVsLCAna2V5cHJlc3MnLCBmb3JtYXRDYXJkTnVtYmVyKTtcbiAgICBRSi5vbihlbCwgJ2tleWRvd24nLCBmb3JtYXRCYWNrQ2FyZE51bWJlcik7XG4gICAgUUoub24oZWwsICdrZXl1cCcsIHNldENhcmRUeXBlKTtcbiAgICBRSi5vbihlbCwgJ3Bhc3RlJywgcmVGb3JtYXRDYXJkTnVtYmVyKTtcbiAgICByZXR1cm4gZWw7XG4gIH07XG5cbiAgUGF5bWVudC5nZXRDYXJkQXJyYXkgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gY2FyZHM7XG4gIH07XG5cbiAgUGF5bWVudC5zZXRDYXJkQXJyYXkgPSBmdW5jdGlvbihjYXJkQXJyYXkpIHtcbiAgICBjYXJkcyA9IGNhcmRBcnJheTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICBQYXltZW50LmFkZFRvQ2FyZEFycmF5ID0gZnVuY3Rpb24oY2FyZE9iamVjdCkge1xuICAgIHJldHVybiBjYXJkcy5wdXNoKGNhcmRPYmplY3QpO1xuICB9O1xuXG4gIFBheW1lbnQucmVtb3ZlRnJvbUNhcmRBcnJheSA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgICB2YXIga2V5LCB2YWx1ZTtcbiAgICBmb3IgKGtleSBpbiBjYXJkcykge1xuICAgICAgdmFsdWUgPSBjYXJkc1trZXldO1xuICAgICAgaWYgKHZhbHVlLnR5cGUgPT09IHR5cGUpIHtcbiAgICAgICAgY2FyZHMuc3BsaWNlKGtleSwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIHJldHVybiBQYXltZW50O1xuXG59KSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBheW1lbnQ7XG5cbmdsb2JhbC5QYXltZW50ID0gUGF5bWVudDtcblxuXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbn0se1wicWovc3JjL3FqLmNvZmZlZVwiOjF9XX0se30sWzJdKSgyKVxufSk7IiwiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSh7MTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XCJ1c2Ugc3RyaWN0XCI7dmFyIF92YWxpZEZvcm09cmVxdWlyZShcIi4vc3JjL3ZhbGlkLWZvcm1cIik7dmFyIF92YWxpZEZvcm0yPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3ZhbGlkRm9ybSk7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmope3JldHVybiBvYmomJm9iai5fX2VzTW9kdWxlP29iajp7ZGVmYXVsdDpvYmp9fXdpbmRvdy5WYWxpZEZvcm09X3ZhbGlkRm9ybTIuZGVmYXVsdDt3aW5kb3cuVmFsaWRGb3JtLnRvZ2dsZUludmFsaWRDbGFzcz1fdmFsaWRGb3JtLnRvZ2dsZUludmFsaWRDbGFzczt3aW5kb3cuVmFsaWRGb3JtLmhhbmRsZUN1c3RvbU1lc3NhZ2VzPV92YWxpZEZvcm0uaGFuZGxlQ3VzdG9tTWVzc2FnZXM7d2luZG93LlZhbGlkRm9ybS5oYW5kbGVDdXN0b21NZXNzYWdlRGlzcGxheT1fdmFsaWRGb3JtLmhhbmRsZUN1c3RvbU1lc3NhZ2VEaXNwbGF5fSx7XCIuL3NyYy92YWxpZC1mb3JtXCI6M31dLDI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1widXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTp0cnVlfSk7ZXhwb3J0cy5jbG9uZT1jbG9uZTtleHBvcnRzLmRlZmF1bHRzPWRlZmF1bHRzO2V4cG9ydHMuaW5zZXJ0QWZ0ZXI9aW5zZXJ0QWZ0ZXI7ZXhwb3J0cy5pbnNlcnRCZWZvcmU9aW5zZXJ0QmVmb3JlO2V4cG9ydHMuZm9yRWFjaD1mb3JFYWNoO2V4cG9ydHMuZGVib3VuY2U9ZGVib3VuY2U7ZnVuY3Rpb24gY2xvbmUob2JqKXt2YXIgY29weT17fTtmb3IodmFyIGF0dHIgaW4gb2JqKXtpZihvYmouaGFzT3duUHJvcGVydHkoYXR0cikpY29weVthdHRyXT1vYmpbYXR0cl19cmV0dXJuIGNvcHl9ZnVuY3Rpb24gZGVmYXVsdHMob2JqLGRlZmF1bHRPYmplY3Qpe29iaj1jbG9uZShvYmp8fHt9KTtmb3IodmFyIGsgaW4gZGVmYXVsdE9iamVjdCl7aWYob2JqW2tdPT09dW5kZWZpbmVkKW9ialtrXT1kZWZhdWx0T2JqZWN0W2tdfXJldHVybiBvYmp9ZnVuY3Rpb24gaW5zZXJ0QWZ0ZXIocmVmTm9kZSxub2RlVG9JbnNlcnQpe3ZhciBzaWJsaW5nPXJlZk5vZGUubmV4dFNpYmxpbmc7aWYoc2libGluZyl7dmFyIF9wYXJlbnQ9cmVmTm9kZS5wYXJlbnROb2RlO19wYXJlbnQuaW5zZXJ0QmVmb3JlKG5vZGVUb0luc2VydCxzaWJsaW5nKX1lbHNle3BhcmVudC5hcHBlbmRDaGlsZChub2RlVG9JbnNlcnQpfX1mdW5jdGlvbiBpbnNlcnRCZWZvcmUocmVmTm9kZSxub2RlVG9JbnNlcnQpe3ZhciBwYXJlbnQ9cmVmTm9kZS5wYXJlbnROb2RlO3BhcmVudC5pbnNlcnRCZWZvcmUobm9kZVRvSW5zZXJ0LHJlZk5vZGUpfWZ1bmN0aW9uIGZvckVhY2goaXRlbXMsZm4pe2lmKCFpdGVtcylyZXR1cm47aWYoaXRlbXMuZm9yRWFjaCl7aXRlbXMuZm9yRWFjaChmbil9ZWxzZXtmb3IodmFyIGk9MDtpPGl0ZW1zLmxlbmd0aDtpKyspe2ZuKGl0ZW1zW2ldLGksaXRlbXMpfX19ZnVuY3Rpb24gZGVib3VuY2UobXMsZm4pe3ZhciB0aW1lb3V0PXZvaWQgMDt2YXIgZGVib3VuY2VkRm49ZnVuY3Rpb24gZGVib3VuY2VkRm4oKXtjbGVhclRpbWVvdXQodGltZW91dCk7dGltZW91dD1zZXRUaW1lb3V0KGZuLG1zKX07cmV0dXJuIGRlYm91bmNlZEZufX0se31dLDM6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1widXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTp0cnVlfSk7ZXhwb3J0cy50b2dnbGVJbnZhbGlkQ2xhc3M9dG9nZ2xlSW52YWxpZENsYXNzO2V4cG9ydHMuaGFuZGxlQ3VzdG9tTWVzc2FnZXM9aGFuZGxlQ3VzdG9tTWVzc2FnZXM7ZXhwb3J0cy5oYW5kbGVDdXN0b21NZXNzYWdlRGlzcGxheT1oYW5kbGVDdXN0b21NZXNzYWdlRGlzcGxheTtleHBvcnRzLmRlZmF1bHQ9dmFsaWRGb3JtO3ZhciBfdXRpbD1yZXF1aXJlKFwiLi91dGlsXCIpO2Z1bmN0aW9uIHRvZ2dsZUludmFsaWRDbGFzcyhpbnB1dCxpbnZhbGlkQ2xhc3Mpe2lucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnZhbGlkXCIsZnVuY3Rpb24oKXtpbnB1dC5jbGFzc0xpc3QuYWRkKGludmFsaWRDbGFzcyl9KTtpbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIixmdW5jdGlvbigpe2lmKGlucHV0LnZhbGlkaXR5LnZhbGlkKXtpbnB1dC5jbGFzc0xpc3QucmVtb3ZlKGludmFsaWRDbGFzcyl9fSl9dmFyIGVycm9yUHJvcHM9W1wiYmFkSW5wdXRcIixcInBhdHRlcm5NaXNtYXRjaFwiLFwicmFuZ2VPdmVyZmxvd1wiLFwicmFuZ2VVbmRlcmZsb3dcIixcInN0ZXBNaXNtYXRjaFwiLFwidG9vTG9uZ1wiLFwidG9vU2hvcnRcIixcInR5cGVNaXNtYXRjaFwiLFwidmFsdWVNaXNzaW5nXCIsXCJjdXN0b21FcnJvclwiXTtmdW5jdGlvbiBnZXRDdXN0b21NZXNzYWdlKGlucHV0LGN1c3RvbU1lc3NhZ2VzKXtjdXN0b21NZXNzYWdlcz1jdXN0b21NZXNzYWdlc3x8e307dmFyIGxvY2FsRXJyb3JQcm9wcz1baW5wdXQudHlwZStcIk1pc21hdGNoXCJdLmNvbmNhdChlcnJvclByb3BzKTt2YXIgdmFsaWRpdHk9aW5wdXQudmFsaWRpdHk7Zm9yKHZhciBpPTA7aTxsb2NhbEVycm9yUHJvcHMubGVuZ3RoO2krKyl7dmFyIHByb3A9bG9jYWxFcnJvclByb3BzW2ldO2lmKHZhbGlkaXR5W3Byb3BdKXtyZXR1cm4gaW5wdXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1cIitwcm9wKXx8Y3VzdG9tTWVzc2FnZXNbcHJvcF19fX1mdW5jdGlvbiBoYW5kbGVDdXN0b21NZXNzYWdlcyhpbnB1dCxjdXN0b21NZXNzYWdlcyl7ZnVuY3Rpb24gY2hlY2tWYWxpZGl0eSgpe3ZhciBtZXNzYWdlPWlucHV0LnZhbGlkaXR5LnZhbGlkP251bGw6Z2V0Q3VzdG9tTWVzc2FnZShpbnB1dCxjdXN0b21NZXNzYWdlcyk7aW5wdXQuc2V0Q3VzdG9tVmFsaWRpdHkobWVzc2FnZXx8XCJcIil9aW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsY2hlY2tWYWxpZGl0eSk7aW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImludmFsaWRcIixjaGVja1ZhbGlkaXR5KX1mdW5jdGlvbiBoYW5kbGVDdXN0b21NZXNzYWdlRGlzcGxheShpbnB1dCxvcHRpb25zKXt2YXIgdmFsaWRhdGlvbkVycm9yQ2xhc3M9b3B0aW9ucy52YWxpZGF0aW9uRXJyb3JDbGFzcyx2YWxpZGF0aW9uRXJyb3JQYXJlbnRDbGFzcz1vcHRpb25zLnZhbGlkYXRpb25FcnJvclBhcmVudENsYXNzLGVycm9yUGxhY2VtZW50PW9wdGlvbnMuZXJyb3JQbGFjZW1lbnQ7ZnVuY3Rpb24gY2hlY2tWYWxpZGl0eShvcHRpb25zKXt2YXIgaW5zZXJ0RXJyb3I9b3B0aW9ucy5pbnNlcnRFcnJvcjt2YXIgcGFyZW50Tm9kZT1pbnB1dC5wYXJlbnROb2RlO3ZhciBlcnJvck5vZGU9cGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKFwiLlwiK3ZhbGlkYXRpb25FcnJvckNsYXNzKXx8ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtpZighaW5wdXQudmFsaWRpdHkudmFsaWQmJmlucHV0LnZhbGlkYXRpb25NZXNzYWdlKXtlcnJvck5vZGUuY2xhc3NOYW1lPXZhbGlkYXRpb25FcnJvckNsYXNzO2Vycm9yTm9kZS50ZXh0Q29udGVudD1pbnB1dC52YWxpZGF0aW9uTWVzc2FnZTtpZihpbnNlcnRFcnJvcil7ZXJyb3JQbGFjZW1lbnQ9PT1cImJlZm9yZVwiPygwLF91dGlsLmluc2VydEJlZm9yZSkoaW5wdXQsZXJyb3JOb2RlKTooMCxfdXRpbC5pbnNlcnRBZnRlcikoaW5wdXQsZXJyb3JOb2RlKTtwYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQodmFsaWRhdGlvbkVycm9yUGFyZW50Q2xhc3MpfX1lbHNle3BhcmVudE5vZGUuY2xhc3NMaXN0LnJlbW92ZSh2YWxpZGF0aW9uRXJyb3JQYXJlbnRDbGFzcyk7ZXJyb3JOb2RlLnJlbW92ZSgpfX1pbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIixmdW5jdGlvbigpe2NoZWNrVmFsaWRpdHkoe2luc2VydEVycm9yOmZhbHNlfSl9KTtpbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiaW52YWxpZFwiLGZ1bmN0aW9uKGUpe2UucHJldmVudERlZmF1bHQoKTtjaGVja1ZhbGlkaXR5KHtpbnNlcnRFcnJvcjp0cnVlfSl9KX12YXIgZGVmYXVsdE9wdGlvbnM9e2ludmFsaWRDbGFzczpcImludmFsaWRcIix2YWxpZGF0aW9uRXJyb3JDbGFzczpcInZhbGlkYXRpb24tZXJyb3JcIix2YWxpZGF0aW9uRXJyb3JQYXJlbnRDbGFzczpcImhhcy12YWxpZGF0aW9uLWVycm9yXCIsY3VzdG9tTWVzc2FnZXM6e30sZXJyb3JQbGFjZW1lbnQ6XCJiZWZvcmVcIn07ZnVuY3Rpb24gdmFsaWRGb3JtKGVsZW1lbnQsb3B0aW9ucyl7aWYoIWVsZW1lbnR8fCFlbGVtZW50Lm5vZGVOYW1lKXt0aHJvdyBuZXcgRXJyb3IoXCJGaXJzdCBhcmcgdG8gdmFsaWRGb3JtIG11c3QgYmUgYSBmb3JtLCBpbnB1dCwgc2VsZWN0LCBvciB0ZXh0YXJlYVwiKX12YXIgaW5wdXRzPXZvaWQgMDt2YXIgdHlwZT1lbGVtZW50Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7b3B0aW9ucz0oMCxfdXRpbC5kZWZhdWx0cykob3B0aW9ucyxkZWZhdWx0T3B0aW9ucyk7aWYodHlwZT09PVwiZm9ybVwiKXtpbnB1dHM9ZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXQsIHNlbGVjdCwgdGV4dGFyZWFcIik7Zm9jdXNJbnZhbGlkSW5wdXQoZWxlbWVudCxpbnB1dHMpfWVsc2UgaWYodHlwZT09PVwiaW5wdXRcInx8dHlwZT09PVwic2VsZWN0XCJ8fHR5cGU9PT1cInRleHRhcmVhXCIpe2lucHV0cz1bZWxlbWVudF19ZWxzZXt0aHJvdyBuZXcgRXJyb3IoXCJPbmx5IGZvcm0sIGlucHV0LCBzZWxlY3QsIG9yIHRleHRhcmVhIGVsZW1lbnRzIGFyZSBzdXBwb3J0ZWRcIil9dmFsaWRGb3JtSW5wdXRzKGlucHV0cyxvcHRpb25zKX1mdW5jdGlvbiBmb2N1c0ludmFsaWRJbnB1dChmb3JtLGlucHV0cyl7dmFyIGZvY3VzRmlyc3Q9KDAsX3V0aWwuZGVib3VuY2UpKDEwMCxmdW5jdGlvbigpe3ZhciBpbnZhbGlkTm9kZT1mb3JtLnF1ZXJ5U2VsZWN0b3IoXCI6aW52YWxpZFwiKTtpZihpbnZhbGlkTm9kZSlpbnZhbGlkTm9kZS5mb2N1cygpfSk7KDAsX3V0aWwuZm9yRWFjaCkoaW5wdXRzLGZ1bmN0aW9uKGlucHV0KXtyZXR1cm4gaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImludmFsaWRcIixmb2N1c0ZpcnN0KX0pfWZ1bmN0aW9uIHZhbGlkRm9ybUlucHV0cyhpbnB1dHMsb3B0aW9ucyl7dmFyIGludmFsaWRDbGFzcz1vcHRpb25zLmludmFsaWRDbGFzcyxjdXN0b21NZXNzYWdlcz1vcHRpb25zLmN1c3RvbU1lc3NhZ2VzOygwLF91dGlsLmZvckVhY2gpKGlucHV0cyxmdW5jdGlvbihpbnB1dCl7dG9nZ2xlSW52YWxpZENsYXNzKGlucHV0LGludmFsaWRDbGFzcyk7aGFuZGxlQ3VzdG9tTWVzc2FnZXMoaW5wdXQsY3VzdG9tTWVzc2FnZXMpO2hhbmRsZUN1c3RvbU1lc3NhZ2VEaXNwbGF5KGlucHV0LG9wdGlvbnMpfSl9fSx7XCIuL3V0aWxcIjoyfV19LHt9LFsxXSk7IiwiLy8gTWlublBvc3QgR2l2aW5nIHBsdWdpblxuLy8gdGhlIHNlbWktY29sb24gYmVmb3JlIGZ1bmN0aW9uIGludm9jYXRpb24gaXMgYSBzYWZldHkgbmV0IGFnYWluc3QgY29uY2F0ZW5hdGVkXG4vLyBzY3JpcHRzIGFuZC9vciBvdGhlciBwbHVnaW5zIHdoaWNoIG1heSBub3QgYmUgY2xvc2VkIHByb3Blcmx5LlxuOyhmdW5jdGlvbiAoICQsIHdpbmRvdywgZG9jdW1lbnQsIHVuZGVmaW5lZCApIHtcblxuICAvLyB1bmRlZmluZWQgaXMgdXNlZCBoZXJlIGFzIHRoZSB1bmRlZmluZWQgZ2xvYmFsIHZhcmlhYmxlIGluIEVDTUFTY3JpcHQgMyBpc1xuICAvLyBtdXRhYmxlIChpZS4gaXQgY2FuIGJlIGNoYW5nZWQgYnkgc29tZW9uZSBlbHNlKS4gdW5kZWZpbmVkIGlzbid0IHJlYWxseSBiZWluZ1xuICAvLyBwYXNzZWQgaW4gc28gd2UgY2FuIGVuc3VyZSB0aGUgdmFsdWUgb2YgaXQgaXMgdHJ1bHkgdW5kZWZpbmVkLiBJbiBFUzUsIHVuZGVmaW5lZFxuICAvLyBjYW4gbm8gbG9uZ2VyIGJlIG1vZGlmaWVkLlxuXG4gIC8vIHdpbmRvdyBhbmQgZG9jdW1lbnQgYXJlIHBhc3NlZCB0aHJvdWdoIGFzIGxvY2FsIHZhcmlhYmxlIHJhdGhlciB0aGFuIGdsb2JhbFxuICAvLyBhcyB0aGlzIChzbGlnaHRseSkgcXVpY2tlbnMgdGhlIHJlc29sdXRpb24gcHJvY2VzcyBhbmQgY2FuIGJlIG1vcmUgZWZmaWNpZW50bHlcbiAgLy8gbWluaWZpZWQgKGVzcGVjaWFsbHkgd2hlbiBib3RoIGFyZSByZWd1bGFybHkgcmVmZXJlbmNlZCBpbiB5b3VyIHBsdWdpbikuXG5cbiAgLy8gQ3JlYXRlIHRoZSBkZWZhdWx0cyBvbmNlXG4gIHZhciBwbHVnaW5OYW1lID0gJ21pbm5wb3N0X2dpdmluZycsXG4gIGRlZmF1bHRzID0ge1xuICAgICdkZWJ1ZycgOiBmYWxzZSwgLy8gdGhpcyBjYW4gYmUgc2V0IHRvIHRydWUgb24gcGFnZSBsZXZlbCBvcHRpb25zXG4gICAgJ3N0cmlwZV9wdWJsaXNoYWJsZV9rZXknIDogJycsXG4gICAgJ3BsYWlkX2VudicgOiAnJyxcbiAgICAncGxhaWRfcHVibGljX2tleScgOiAnJyxcbiAgICAncGxhaWRfbGluaycgOiAnI2F1dGhvcml6ZS1hY2gnLFxuICAgICdtaW5ucG9zdF9yb290JyA6ICdodHRwczovL3d3dy5taW5ucG9zdC5jb20nLFxuICAgICdkb25hdGVfZm9ybV9zZWxlY3Rvcic6ICcjZG9uYXRlJyxcbiAgICAnZG9uYXRlX3N0ZXBfc2VsZWN0b3InIDogJyNwYW5lbC0tcGF5JyxcbiAgICAnY29uZmlybV9mb3JtX3NlbGVjdG9yJyA6ICcjY29uZmlybScsXG4gICAgJ2NvbmZpcm1fc3RlcF9zZWxlY3RvcicgOiAnI3BhbmVsLS1jb25maXJtYXRpb24nLFxuICAgICdhY3RpdmUnIDogJ3BhbmVsLS1wYXknLFxuICAgICdjb25maXJtJyA6ICdwYW5lbC0tY29uZmlybWF0aW9uJyxcbiAgICAncXVlcnknIDogJ3N0ZXAnLFxuICAgICdwYXlfY2NfcHJvY2Vzc2luZ19zZWxlY3RvcicgOiAnaW5wdXRbaWQ9XCJwYXktZmVlc1wiXScsXG4gICAgJ2ZlZV9hbW91bnQnIDogJy5wcm9jZXNzaW5nLWFtb3VudCcsXG4gICAgJ2xldmVsX2Ftb3VudF9zZWxlY3RvcicgOiAnI3BhbmVsLS1wYXkgLmFtb3VudCAubGV2ZWwtYW1vdW50JywgLy8gd2UgY2FuIG1heWJlIGdldCByaWQgb2YgdGhpc1xuICAgICdvcmlnaW5hbF9hbW91bnRfc2VsZWN0b3InIDogJ1tuYW1lPVwiYW1vdW50XCJdJyxcbiAgICAnaW50ZW50X3NlY3JldF9zZWxlY3RvcicgOiAnI2ludGVudCcsXG4gICAgJ2ZhaXJfbWFya2V0X3ZhbHVlX3NlbGVjdG9yJyA6ICcjZmFpcl9tYXJrZXRfdmFsdWUnLFxuICAgICdmcmVxdWVuY3lfc2VsZWN0b3InIDogJy5mcmVxdWVuY3knLFxuICAgICdmdWxsX2Ftb3VudF9zZWxlY3RvcicgOiAnLmZ1bGwtYW1vdW50JyxcbiAgICAnbmFtZV9zZWxlY3RvcicgOiAnLm0tZm9ybS1pdGVtLWRpc3BsYXktbmFtZScsXG4gICAgJ2luX2hvbm9yX29yX21lbW9yeV9maWVsZF9zZWxlY3RvcicgOiAnLm0tZm9ybS1pdGVtLWhvbm9yLW1lbW9yeScsXG4gICAgJ2hvbm9yX29yX21lbW9yeV9jaG9vc2VyJyA6ICdpbnB1dFtuYW1lPVwiaW5faG9ub3Jfb3JfbWVtb3J5XCJdJywgLy8gcmFkaW8gZmllbGRzXG4gICAgJ2hvbm9yX3R5cGVfc2VsZWN0b3InIDogJy5hLWhvbm9yLXR5cGUnLCAvLyBzcGFuIGluc2lkZSBsYWJlbFxuICAgICdob25vcl9tZW1vcnlfaW5wdXRfZ3JvdXAnIDogJy5hLWhvbm9yLW9yLW1lbW9yeScsIC8vIGhvbGRzIHRoZSBmb3JtIGZpZWxkXG4gICAgJ25vdGlmeV9zZWxlY3RvcicgOiAnLm5vdGlmeV9zb21lb25lJyxcbiAgICAnbm90aWZ5X2ZpZWxkX3NlbGVjdG9yJyA6ICcubS1mb3JtLWl0ZW0tbm90aWZ5JyxcbiAgICAnYW5vbnltb3VzX3NlbGVjdG9yJyA6ICcjYW5vbnltb3VzJyxcbiAgICAnc2hvd19iaWxsaW5nX2NvdW50cnlfc2VsZWN0b3InIDogJyNiaWxsaW5nX3Nob3dfY291bnRyeScsXG4gICAgJ2JpbGxpbmdfY291bnRyeV9zZWxlY3RvcicgOiAnLm0tZm9ybS1pdGVtLWNvdW50cnknLFxuICAgICdzaG93X3NoaXBwaW5nX2NvdW50cnlfc2VsZWN0b3InIDogJyNzaGlwcGluZ19zaG93X2NvdW50cnknLFxuICAgICdzaGlwcGluZ19jb3VudHJ5X3NlbGVjdG9yJyA6ICcubS1mb3JtLWl0ZW0tc2hpcHBpbmctY291bnRyeScsXG4gICAgJ3NoaXBwaW5nX2FkZHJlc3Nfc2VsZWN0b3InIDogJy5tLWZvcm0taXRlbS1zaGlwcGluZy1hZGRyZXNzJyxcbiAgICAndXNlX2Zvcl9zaGlwcGluZ19zZWxlY3RvcicgOiAnI3VzZWZvcnNoaXBwaW5nJyxcbiAgICAnZW1haWxfZmllbGRfc2VsZWN0b3InIDogJyNlbWFpbCcsXG4gICAgJ3Bhc3N3b3JkX2ZpZWxkX3NlbGVjdG9yJyA6ICcjcGFzc3dvcmQnLFxuICAgICdmaXJzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yJyA6ICcjZmlyc3RfbmFtZScsXG4gICAgJ2xhc3RfbmFtZV9maWVsZF9zZWxlY3RvcicgOiAnI2xhc3RfbmFtZScsXG4gICAgJ2FjY291bnRfY2l0eV9zZWxlY3RvcicgOiAnI2JpbGxpbmdfY2l0eScsXG4gICAgJ2FjY291bnRfc3RhdGVfc2VsZWN0b3InIDogJyNiaWxsaW5nX3N0YXRlJyxcbiAgICAnYWNjb3VudF96aXBfc2VsZWN0b3InIDogJyNiaWxsaW5nX3ppcCcsXG4gICAgJ2NyZWF0ZV9tcF9zZWxlY3RvcicgOiAnI2NyZWF0ZW1wYWNjb3VudCcsXG4gICAgJ3Bhc3N3b3JkX3NlbGVjdG9yJyA6ICcubS1mb3JtLWl0ZW0tcGFzc3dvcmQnLFxuICAgICdhZGRpdGlvbmFsX2Ftb3VudF9maWVsZCcgOiAnI2FkZGl0aW9uYWxfZG9uYXRpb24nLFxuICAgICdiaWxsaW5nX3NlbGVjdG9yJyA6ICdmaWVsZHNldC5tLWJpbGxpbmctaW5mb3JtYXRpb24nLFxuICAgICdzaGlwcGluZ19zZWxlY3RvcicgOiAnZmllbGRzZXQubS1zaGlwcGluZy1pbmZvcm1hdGlvbicsXG4gICAgJ2NyZWRpdF9jYXJkX2ZpZWxkc2V0JyA6ICcubS1mb3JtLWdyb3VwLXBheW1lbnQnLFxuICAgICdjaG9vc2VfcGF5bWVudCcgOiAnI2Nob29zZS1wYXltZW50LW1ldGhvZCcsXG4gICAgJ3BheW1lbnRfbWV0aG9kX3NlbGVjdG9yJyA6ICcucGF5bWVudC1tZXRob2QnLFxuICAgICdjY19udW1fc2VsZWN0b3InIDogJyNjYXJkLW51bWJlcicsXG4gICAgJ2NjX2V4cF9zZWxlY3RvcicgOiAnI2NhcmQtZXhwaXJ5JyxcbiAgICAnY2NfY3Z2X3NlbGVjdG9yJyA6ICcjY2FyZC1jdmMnLFxuICAgICdjb25maXJtX2J1dHRvbl9zZWxlY3RvcicgOiAnI2ZpbmlzaCcsXG4gICAgJ3BheV9idXR0b25fc2VsZWN0b3InIDogJy5hLWJ1dHRvbi1wYXknLFxuICAgICdvcHBfaWRfc2VsZWN0b3InIDogJyNsb2NrX2tleScsIC8vIHdlIHVzZSB0aGlzIHZhbHVlIGFzIHRoZSBHb29nbGUgQW5hbHl0aWNzIHRyYW5zYWN0aW9uIElEXG4gICAgJ3JlY3VycmluZ19zZWxlY3RvcicgOiAnI3JlY3VycmluZycsXG4gICAgJ25ld3NsZXR0ZXJfZ3JvdXBfc2VsZWN0b3InIDogJy5zdXBwb3J0LW5ld3NsZXR0ZXJzJyxcbiAgICAncmVhc29uX2ZpZWxkX3NlbGVjdG9yJyA6ICcjcmVhc29uX2Zvcl9zdXBwb3J0aW5nJyxcbiAgICAnc2hhcmVfcmVhc29uX3NlbGVjdG9yJyA6ICcjcmVhc29uX3NoYXJlYWJsZScsXG4gICAgJ2NvbmZpcm1fdG9wX3NlbGVjdG9yJyA6ICcuc3VwcG9ydC0tcG9zdC1jb25maXJtJyxcbiAgICAnZXhpc3RpbmdfbmV3c2xldHRlcl9zZXR0aW5ncycgOiAnJyxcbiAgICAnbGV2ZWxzJyA6IHtcbiAgICAgIDEgOiB7XG4gICAgICAgICduYW1lJyA6ICdicm9uemUnLFxuICAgICAgICAnbWF4JyA6IDYwXG4gICAgICB9LFxuICAgICAgMiA6IHtcbiAgICAgICAgJ25hbWUnIDogJ3NpbHZlcicsXG4gICAgICAgICdtaW4nIDogNjAsXG4gICAgICAgICdtYXgnIDogMTIwXG4gICAgICB9LFxuICAgICAgMyA6IHtcbiAgICAgICAgJ25hbWUnIDogJ2dvbGQnLFxuICAgICAgICAnbWluJyA6IDEyMCxcbiAgICAgICAgJ21heCcgOiAyNDBcbiAgICAgIH0sXG4gICAgICA0IDoge1xuICAgICAgICAnbmFtZScgOiAncGxhdGludW0nLFxuICAgICAgICAnbWluJyA6IDI0MFxuICAgICAgfVxuICAgIH1cblxuICB9OyAvLyBlbmQgZGVmYXVsdHNcblxuICAvLyBUaGUgYWN0dWFsIHBsdWdpbiBjb25zdHJ1Y3RvclxuICBmdW5jdGlvbiBQbHVnaW4oIGVsZW1lbnQsIG9wdGlvbnMgKSB7XG5cbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuXG4gICAgLy8galF1ZXJ5IGhhcyBhbiBleHRlbmQgbWV0aG9kIHdoaWNoIG1lcmdlcyB0aGUgY29udGVudHMgb2YgdHdvIG9yXG4gICAgLy8gbW9yZSBvYmplY3RzLCBzdG9yaW5nIHRoZSByZXN1bHQgaW4gdGhlIGZpcnN0IG9iamVjdC4gVGhlIGZpcnN0IG9iamVjdFxuICAgIC8vIGlzIGdlbmVyYWxseSBlbXB0eSBhcyB3ZSBkb24ndCB3YW50IHRvIGFsdGVyIHRoZSBkZWZhdWx0IG9wdGlvbnMgZm9yXG4gICAgLy8gZnV0dXJlIGluc3RhbmNlcyBvZiB0aGUgcGx1Z2luXG4gICAgdGhpcy5vcHRpb25zID0gJC5leHRlbmQoIHt9LCBkZWZhdWx0cywgb3B0aW9ucyApO1xuXG4gICAgdGhpcy5fZGVmYXVsdHMgPSBkZWZhdWx0cztcbiAgICB0aGlzLl9uYW1lID0gcGx1Z2luTmFtZTtcblxuICAgIHRoaXMuaW5pdCgpO1xuICB9IC8vIGVuZCBjb25zdHJ1Y3RvclxuXG4gIFBsdWdpbi5wcm90b3R5cGUgPSB7XG5cbiAgICBpbml0OiBmdW5jdGlvbihyZXNldCwgYW1vdW50KSB7XG5cbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSggJ25vLWpzJyApO1xuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCAnanMnICk7XG5cbiAgICAgIC8vIFBsYWNlIGluaXRpYWxpemF0aW9uIGxvZ2ljIGhlcmVcbiAgICAgIC8vIFlvdSBhbHJlYWR5IGhhdmUgYWNjZXNzIHRvIHRoZSBET00gZWxlbWVudCBhbmRcbiAgICAgIC8vIHRoZSBvcHRpb25zIHZpYSB0aGUgaW5zdGFuY2UsIGUuZy4gdGhpcy5lbGVtZW50XG4gICAgICAvLyBhbmQgdGhpcy5vcHRpb25zXG4gICAgICAvLyB5b3UgY2FuIGFkZCBtb3JlIGZ1bmN0aW9ucyBsaWtlIHRoZSBvbmUgYmVsb3cgYW5kXG4gICAgICAvLyBjYWxsIHRoZW0gbGlrZSBzbzogdGhpcy55b3VyT3RoZXJGdW5jdGlvbih0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucykuXG5cbiAgICAgIC8vIG1vZGlmeSBvcHRpb25zIGFzIG5lZWRlZFxuICAgICAgLy92YXIgdGhpcy5vcHRpb25zLmFtb3VudCA9ICcnO1xuICAgICAgaWYgKHJlc2V0ICE9PSB0cnVlKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5hbW91bnQgPSBwYXJzZUZsb2F0KCQodGhpcy5vcHRpb25zLmxldmVsX2Ftb3VudF9zZWxlY3RvciwgdGhpcy5lbGVtZW50KS50ZXh0KCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLmFtb3VudCA9IGFtb3VudDtcbiAgICAgIH1cbiAgICAgIHRoaXMub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQgPSBwYXJzZUludCgkKHRoaXMub3B0aW9ucy5vcmlnaW5hbF9hbW91bnRfc2VsZWN0b3IsIHRoaXMuZWxlbWVudCkudmFsKCksIDEwKTtcbiAgICAgIHRoaXMub3B0aW9ucy5mcmVxdWVuY3kgPSBwYXJzZUZsb2F0KCQodGhpcy5vcHRpb25zLmZyZXF1ZW5jeV9zZWxlY3RvciwgdGhpcy5lbGVtZW50KS5hdHRyKCdkYXRhLXllYXItZnJlcScpKTtcbiAgICAgIHZhciByZWN1cnJpbmcgPSAkKHRoaXMub3B0aW9ucy5yZWN1cnJpbmdfc2VsZWN0b3IsIHRoaXMuZWxlbWVudCkudmFsKCk7XG4gICAgICBpZiAodHlwZW9mIHJlY3VycmluZyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLnJlY3VycmluZyA9IHJlY3VycmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHJlY3VycmluZy5zbGljZSgxKTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgdGhpcy5vcHRpb25zLnByb2Nlc3NpbmdfZmVlID0gKE1hdGgucm91bmQocGFyc2VGbG9hdCh0aGlzLm9wdGlvbnMuZmVlX2Ftb3VudCkqTWF0aC5wb3coMTAsMikpL01hdGgucG93KDEwLDIpKS50b0ZpeGVkKDIpO1xuICAgICAgdGhpcy5vcHRpb25zLnByb2Nlc3NpbmdfZmVlX3RleHQgPSB0aGlzLm9wdGlvbnMucHJvY2Vzc2luZ19mZWU7XG4gICAgICBcbiAgICAgIHRoaXMub3B0aW9ucy5jYXJkVHlwZSA9IG51bGw7XG4gICAgICB0aGlzLm9wdGlvbnMuY3JlYXRlX2FjY291bnQgPSBmYWxzZTtcblxuICAgICAgdmFyIGJ1dHRvbl90ZXh0ID0gJCh0aGlzLm9wdGlvbnMucGF5X2J1dHRvbl9zZWxlY3RvcikudGV4dCgpO1xuICAgICAgdGhpcy5vcHRpb25zLmJ1dHRvbl90ZXh0ID0gYnV0dG9uX3RleHQ7XG5cbiAgICAgIHRoaXMuc3RyaXBlID0gU3RyaXBlKHRoaXMub3B0aW9ucy5zdHJpcGVfcHVibGlzaGFibGVfa2V5KTtcbiAgICAgIHRoaXMuZWxlbWVudHMgPSB0aGlzLnN0cmlwZS5lbGVtZW50cyh7XG4gICAgICAgIGZvbnRzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgLy8gaW50ZWdyYXRlIHlvdXIgZm9udCBpbnRvIHN0cmlwZVxuICAgICAgICAgICAgY3NzU3JjOiAnaHR0cHM6Ly91c2UudHlwZWtpdC5uZXQvY3hqN2Z6Zy5jc3MnLFxuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfSk7XG5cbiAgICAgIC8vIHVzZSBhIHJlZmVycmVyIGZvciBlZGl0IGxpbmsgaWYgd2UgaGF2ZSBvbmVcbiAgICAgIGlmIChkb2N1bWVudC5yZWZlcnJlciAhPT0gJycpIHtcbiAgICAgICAgJCgnI2VkaXRfdXJsJykucHJvcCgnaHJlZicsIGRvY3VtZW50LnJlZmVycmVyKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5kZWJ1ZyA9PT0gdHJ1ZSkge1xuICAgICAgICB0aGlzLmRlYnVnKHRoaXMub3B0aW9ucyk7XG4gICAgICAgIC8vIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gdGFiIHN0dWZmXG4gICAgICB2YXIgcXVlcnlfcGFuZWwgPSB0aGlzLnFzW3RoaXMub3B0aW9ucy5xdWVyeV07XG4gICAgICBpZiAodHlwZW9mIHF1ZXJ5X3BhbmVsID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBxdWVyeV9wYW5lbCA9IHRoaXMub3B0aW9ucy5hY3RpdmU7XG4gICAgICB9XG5cbiAgICAgIC8vIGNhbGwgZnVuY3Rpb25zXG5cbiAgICAgIHRoaXMudGFiTmF2aWdhdGlvbihxdWVyeV9wYW5lbCk7IC8vIG5hdmlnYXRpbmdcblxuICAgICAgdGhpcy5hbW91bnRBc1JhZGlvKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gaWYgdGhlIGFtb3VudCBmaWVsZCBpcyBhIHJhZGlvIGJ1dHRvblxuICAgICAgdGhpcy5hbW91bnRVcGRhdGVkKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gaWYgdGhlIGFtb3VudCB0ZXh0IGZpZWxkIGNhbiBjaGFuZ2VcblxuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLnBheV9jY19wcm9jZXNzaW5nX3NlbGVjdG9yKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuY3JlZGl0Q2FyZFByb2Nlc3NpbmdGZWVzKHRoaXMub3B0aW9ucywgcmVzZXQpOyAvLyBwcm9jZXNzaW5nIGZlZXNcbiAgICAgIH1cbiAgICAgIFxuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmRvbmF0ZV9zdGVwX3NlbGVjdG9yKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5sZXZlbCA9IHRoaXMuY2hlY2tMZXZlbCh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucywgJ25hbWUnKTsgLy8gY2hlY2sgd2hhdCBsZXZlbCBpdCBpc1xuICAgICAgICB0aGlzLm9wdGlvbnMubGV2ZWxudW0gPSB0aGlzLmNoZWNrTGV2ZWwodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMsICdudW0nKTsgLy8gY2hlY2sgd2hhdCBsZXZlbCBpdCBpcyBhcyBhIG51bWJlclxuICAgICAgICB0aGlzLmRvbmF0ZUFub255bW91c2x5KHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gYW5vbnltb3VzXG4gICAgICAgIHRoaXMuaG9ub3JPck1lbW9yeVRvZ2dsZSh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIGluIGhvbm9yIG9yIGluIG1lbW9yeSBvZiBzb21lb25lXG4gICAgICAgIHRoaXMub3V0c2lkZVVuaXRlZFN0YXRlcyh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIG91dHNpZGUgVVNcbiAgICAgICAgdGhpcy5zaGlwcGluZ0FkZHJlc3ModGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBzaGlwcGluZyBhZGRyZXNzXG4gICAgICAgIHRoaXMuYWxsb3dNaW5ucG9zdEFjY291bnQodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBvcHRpb24gZm9yIGNyZWF0aW5nIG1pbm5wb3N0IGFjY291bnRcbiAgICAgICAgdGhpcy5jaG9vc2VQYXltZW50TWV0aG9kKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gc3dpdGNoIGJldHdlZW4gY2FyZCBhbmQgYWNoXG4gICAgICAgIHRoaXMuY3JlZGl0Q2FyZEZpZWxkcyh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIGRvIHN0dWZmIHdpdGggdGhlIGNyZWRpdCBjYXJkIGZpZWxkc1xuICAgICAgICB0aGlzLmFjaEZpZWxkcyh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIGRvIHN0dWZmIGZvciBhY2ggcGF5bWVudHMsIGlmIGFwcGxpY2FibGUgdG8gdGhlIGZvcm1cbiAgICAgICAgdGhpcy52YWxpZGF0ZUFuZFN1Ym1pdCh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIHZhbGlkYXRlIGFuZCBzdWJtaXQgdGhlIGZvcm1cbiAgICAgIH1cblxuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmNvbmZpcm1fc3RlcF9zZWxlY3RvcikubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLnNob3dOZXdzbGV0dGVyU2V0dGluZ3ModGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpO1xuICAgICAgICB0aGlzLmNvbmZpcm1NZXNzYWdlU3VibWl0KHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gc3VibWl0IHRoZSBzdHVmZiBvbiB0aGUgY29uZmlybWF0aW9uIHBhZ2VcbiAgICAgIH1cblxuICAgIH0sIC8vIGluaXRcblxuICAgIHFzOiAoZnVuY3Rpb24oYSkge1xuICAgICAgaWYgKGEgPT09ICcnKSB7XG4gICAgICAgIHJldHVybiB7fTtcbiAgICAgIH1cbiAgICAgIHZhciBiID0ge307XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGEubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIHA9YVtpXS5zcGxpdCgnPScsIDIpO1xuICAgICAgICBpZiAocC5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICBiW3BbMF1dID0gJyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYltwWzBdXSA9IGRlY29kZVVSSUNvbXBvbmVudChwWzFdLnJlcGxhY2UoL1xcKy9nLCAnICcpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGI7XG4gICAgfSkod2luZG93LmxvY2F0aW9uLnNlYXJjaC5zdWJzdHIoMSkuc3BsaXQoJyYnKSksXG5cbiAgICBkZWJ1ZzogZnVuY3Rpb24obWVzc2FnZSkge1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5kZWJ1ZyA9PT0gdHJ1ZSkge1xuICAgICAgICBpZiAodHlwZW9mIG1lc3NhZ2UgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgY29uc29sZS5sb2cobWVzc2FnZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5kaXIobWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5kaXIodGhpcyk7XG4gICAgICB9XG4gICAgfSwgLy8gZGVidWdcblxuICAgIGdldFF1ZXJ5U3RyaW5nczogZnVuY3Rpb24obGluaykge1xuICAgICAgaWYgKHR5cGVvZiBsaW5rID09PSAndW5kZWZpbmVkJyB8fCBsaW5rID09PSAnJykge1xuICAgICAgICByZXR1cm4ge307XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsaW5rID0gJz8nICsgbGluay5zcGxpdCgnPycpWzFdO1xuICAgICAgICBsaW5rID0gbGluay5zdWJzdHIoMSkuc3BsaXQoJyYnKTtcbiAgICAgIH1cbiAgICAgIHZhciBiID0ge307XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpbmsubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIHA9bGlua1tpXS5zcGxpdCgnPScsIDIpO1xuICAgICAgICBpZiAocC5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICBiW3BbMF1dID0gJyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYltwWzBdXSA9IGRlY29kZVVSSUNvbXBvbmVudChwWzFdLnJlcGxhY2UoL1xcKy9nLCAnICcpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGI7XG4gICAgfSwgLy8gZ2V0UXVlcnlTdHJpbmdzXG5cbiAgICB0YWJOYXZpZ2F0aW9uOiBmdW5jdGlvbihhY3RpdmUpIHtcbiAgICAgIHZhciBzdGVwID0gJCgnLnByb2dyZXNzLS1kb25hdGlvbiBsaS4nICsgYWN0aXZlKS5pbmRleCgpICsgMTtcbiAgICAgIHZhciBuYXZfaXRlbV9jb3VudCA9ICQoJy5wcm9ncmVzcy0tZG9uYXRpb24gbGknKS5sZW5ndGg7XG4gICAgICB2YXIgb3BwX2lkID0gJCh0aGlzLm9wdGlvbnMub3BwX2lkX3NlbGVjdG9yKS52YWwoKTtcbiAgICAgIHZhciBuZXh0X3N0ZXAgPSBzdGVwICsgMTtcbiAgICAgIHZhciBwb3N0X3B1cmNoYXNlID0gZmFsc2U7XG5cbiAgICAgIC8vIHdlIHdpbGwgaGF2ZSB0byB1cGRhdGUgdGhpcyBiZWNhdXNlIG5vIG1vcmUgZmxhc2sgaWRcblxuICAgICAgdGhpcy5kZWJ1ZyggJ3N0ZXAgaXMgJyArIHN0ZXAgKyAnIGFuZCBuYXYgaXRlbSBjb3VudCBpcyAnICsgbmF2X2l0ZW1fY291bnQgKyAnIGFuZCBvcHAgaWQgaXMgJyArIG9wcF9pZCArICcgYW5kIG5leHQgc3RlcCBpcyAnICsgbmV4dF9zdGVwICk7XG5cbiAgICAgIC8vIHRoaXMgaXMgdGhlIGxhc3QgdmlzaWJsZSBzdGVwXG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuY29uZmlybV9zdGVwX3NlbGVjdG9yKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGFjdGl2ZSA9IHRoaXMub3B0aW9ucy5jb25maXJtO1xuICAgICAgICAkKCcucHJvZ3Jlc3MtLWRvbmF0aW9uIGxpLicgKyBhY3RpdmUgKyAnIHNwYW4nKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIHN0ZXAgPSAkKCcucHJvZ3Jlc3MtLWRvbmF0aW9uIGxpLicgKyBhY3RpdmUpLmluZGV4KCkgKyAxO1xuICAgICAgICAvLyB0aGVyZSBpcyBhIGNvbnRpbnVhdGlvbiBvZiB0aGUgbWFpbiBmb3JtIG9uIHRoaXMgcGFnZS4gdGhlcmUgaXMgYSBidXR0b24gdG8gY2xpY2tcbiAgICAgICAgLy8gdGhpcyBtZWFucyB0aGVyZSBpcyBhbm90aGVyIHN0ZXBcbiAgICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmNvbmZpcm1fYnV0dG9uX3NlbGVjdG9yKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgbmF2X2l0ZW1fY291bnQgKz0gMTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3RlcCA9PT0gbmF2X2l0ZW1fY291bnQgLSAxICYmICQodGhpcy5vcHRpb25zLm9wcF9pZF9zZWxlY3RvcikubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLmRlYnVnKCd0aGlzIGlzIGEgcGF5bWVudCBzdGVwIGJ1dCB0aGVyZSBpcyBhIHN0ZXAgYWZ0ZXIgaXQnKTtcbiAgICAgICAgc3RlcCA9ICdwdXJjaGFzZSc7XG4gICAgICB9IGVsc2UgaWYgKHN0ZXAgPT09IG5hdl9pdGVtX2NvdW50ICYmICQodGhpcy5vcHRpb25zLm9wcF9pZF9zZWxlY3RvcikubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLmRlYnVnKCd0aGlzIGlzIGEgcGF5bWVudCBzdGVwIGFuZCB0aGVyZSBpcyBubyBzdGVwIGFmdGVyIGl0Jyk7XG4gICAgICAgIHN0ZXAgPSAncHVyY2hhc2UnO1xuICAgICAgfSBlbHNlIGlmIChzdGVwID09PSBuYXZfaXRlbV9jb3VudCAmJiAkKHRoaXMub3B0aW9ucy5vcHBfaWRfc2VsZWN0b3IpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aGlzLmRlYnVnKCd0aGlzIGlzIGEgcG9zdC1maW5pc2ggc3RlcC4gaXQgZG9lcyBub3QgaGF2ZSBhbiBpZCcpO1xuICAgICAgICBzdGVwID0gc3RlcCArIDE7XG4gICAgICAgIHBvc3RfcHVyY2hhc2UgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmFuYWx5dGljc1RyYWNraW5nU3RlcChzdGVwLCBwb3N0X3B1cmNoYXNlKTtcblxuICAgICAgLy8gYWN0aXZhdGUgdGhlIG5hdiB0YWJzXG4gICAgICBpZiAoJCgnLnByb2dyZXNzLS1kb25hdGlvbiBsaSAuYWN0aXZlJykubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICQoJyMnICsgYWN0aXZlKS5zaG93KCk7XG4gICAgICAgICQoJy5wcm9ncmVzcy0tZG9uYXRpb24gbGkuJyArIGFjdGl2ZSArICcgYScpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFjdGl2ZSA9ICQoJy5wcm9ncmVzcy0tZG9uYXRpb24gbGkgLmFjdGl2ZScpLnBhcmVudCgpLnByb3AoJ2NsYXNzJyk7XG4gICAgICAgICQoJyMnICsgYWN0aXZlKS5zaG93KCk7XG4gICAgICB9XG5cbiAgICB9LCAvLyB0YWJOYXZpZ2F0aW9uXG5cbiAgICBhbmFseXRpY3NUcmFja2luZ1N0ZXA6IGZ1bmN0aW9uKHN0ZXAsIHBvc3RfcHVyY2hhc2UpIHtcbiAgICAgIHZhciBsZXZlbCA9IHRoaXMuY2hlY2tMZXZlbCh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucywgJ25hbWUnKTsgLy8gY2hlY2sgd2hhdCBsZXZlbCBpdCBpc1xuICAgICAgdmFyIGFtb3VudCA9ICQodGhpcy5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudF9zZWxlY3RvcikudmFsKCk7XG4gICAgICB2YXIgcmVjdXJyaW5nID0gdGhpcy5vcHRpb25zLnJlY3VycmluZztcbiAgICAgIHZhciBvcHBfaWQgPSAkKHRoaXMub3B0aW9ucy5vcHBfaWRfc2VsZWN0b3IpLnZhbCgpO1xuXG4gICAgICAvLyBpZiB3ZSdyZSBub3QgYWZ0ZXIgdGhlIHB1cmNoYXNlLCB1c2UgYWRkUHJvZHVjdFxuICAgICAgaWYgKCBwb3N0X3B1cmNoYXNlICE9PSB0cnVlICkge1xuICAgICAgICBnYSgnZWM6YWRkUHJvZHVjdCcsIHtcbiAgICAgICAgICAnaWQnOiAnbWlubnBvc3RfJyArIGxldmVsLnRvTG93ZXJDYXNlKCkgKyAnX21lbWJlcnNoaXAnLFxuICAgICAgICAgICduYW1lJzogJ01pbm5Qb3N0ICcgKyBsZXZlbC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGxldmVsLnNsaWNlKDEpICsgJyBNZW1iZXJzaGlwJyxcbiAgICAgICAgICAnY2F0ZWdvcnknOiAnRG9uYXRpb24nLFxuICAgICAgICAgICdicmFuZCc6ICdNaW5uUG9zdCcsXG4gICAgICAgICAgJ3ZhcmlhbnQnOiAgcmVjdXJyaW5nLFxuICAgICAgICAgICdwcmljZSc6IGFtb3VudCxcbiAgICAgICAgICAncXVhbnRpdHknOiAxXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RlcCA9PT0gJ3B1cmNoYXNlJykge1xuICAgICAgICB0aGlzLmRlYnVnKCdhZGQgYSBwdXJjaGFzZSBhY3Rpb24uIHN0ZXAgaXMgJyArIHN0ZXApO1xuICAgICAgICBnYSgnZWM6c2V0QWN0aW9uJywgc3RlcCx7XG4gICAgICAgICAgJ2lkJzogb3BwX2lkLCAvLyBUcmFuc2FjdGlvbiBpZCAtIFR5cGU6IHN0cmluZ1xuICAgICAgICAgICdhZmZpbGlhdGlvbic6ICdNaW5uUG9zdCcsIC8vIFN0b3JlIG5hbWUgLSBUeXBlOiBzdHJpbmdcbiAgICAgICAgICAncmV2ZW51ZSc6IGFtb3VudCwgLy8gVG90YWwgUmV2ZW51ZSAtIFR5cGU6IG51bWVyaWNcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmRlYnVnKCdhZGQgYSBjaGVja291dCBhY3Rpb24uIHN0ZXAgaXMgJyArIHN0ZXApO1xuICAgICAgICBnYSgnZWM6c2V0QWN0aW9uJywnY2hlY2tvdXQnLCB7XG4gICAgICAgICAgJ3N0ZXAnOiBzdGVwLCAgICAgICAgICAgIC8vIEEgdmFsdWUgb2YgMSBpbmRpY2F0ZXMgZmlyc3QgY2hlY2tvdXQgc3RlcC5WYWx1ZSBvZiAyIGluZGljYXRlcyBzZWNvbmQgY2hlY2tvdXQgc3RlcFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgZ2EoJ3NldCcsIHtcbiAgICAgICAgcGFnZTogd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLFxuICAgICAgICB0aXRsZTogZG9jdW1lbnQudGl0bGVcbiAgICAgIH0pO1xuICAgICAgZ2EoJ3NlbmQnLCAncGFnZXZpZXcnLCB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUpO1xuXG4gICAgfSwgLy8gYW5hbHl0aWNzVHJhY2tpbmdTdGVwXG5cbiAgICBhbW91bnRBc1JhZGlvOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICAvLyB3aGVuIGFtb3VudCBmaWVsZCBpcyBhIHJhZGlvIGJ1dHRvbiwgd2UgbmVlZCB0byBjaGVjayBpdCB3aGVuZXZlciBpdCBjaGFuZ2VzXG4gICAgICAkKG9wdGlvbnMub3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICgkKHRoaXMpLmlzKCc6cmFkaW8nKSkge1xuICAgICAgICAgICAgb3B0aW9ucy5vcmlnaW5hbF9hbW91bnQgPSBwYXJzZUludCgkKG9wdGlvbnMub3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yICsgJzpjaGVja2VkJywgZWxlbWVudCkudmFsKCksIDEwKTtcbiAgICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LCAvLyBhbW91bnRBc1JhZGlvXG5cbiAgICBhbW91bnRVcGRhdGVkOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICAvLyB3aGVuIG5ldyBhbW91bnQgdGV4dCBmaWVsZCBjYW4gY2hhbmdlLCB3ZSBuZWVkIHRvIGNoYW5nZSB0aGUgaGlkZGVuIGZpZWxkXG4gICAgICAvLyB0aGVyZSBpcyBhbHNvIHBvdGVudGlhbGx5IGFuIGFkZGl0aW9uYWwgYW1vdW50IGZpZWxkIHZhbHVlIHRvIGFkZFxuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdmFyIHBheW1lbnRfdHlwZSA9ICQob3B0aW9ucy5jaG9vc2VfcGF5bWVudCArICcgaW5wdXQnKS52YWwoKTtcblxuICAgICAgLy8gc2V0IHRoZSBmYWlyIG1hcmtldCB2YWx1ZSBpZiBhcHBsaWNhYmxlXG4gICAgICB2YXIgYW1vdW50X3NlbGVjdG9yX2ZhaXJfbWFya2V0ID0gJChvcHRpb25zLm9yaWdpbmFsX2Ftb3VudF9zZWxlY3RvciwgZWxlbWVudCk7XG4gICAgICBpZiAoYW1vdW50X3NlbGVjdG9yX2ZhaXJfbWFya2V0LmlzKCc6cmFkaW8nKSkge1xuICAgICAgICBhbW91bnRfc2VsZWN0b3JfZmFpcl9tYXJrZXQgPSAkKG9wdGlvbnMub3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yICsgJzpjaGVja2VkJywgZWxlbWVudCk7XG4gICAgICB9XG4gICAgICB0aGF0LnNldEZhaXJNYXJrZXRWYWx1ZShhbW91bnRfc2VsZWN0b3JfZmFpcl9tYXJrZXQpO1xuICAgICAgdGhhdC5zZXRQYXltZW50SW50ZW50KCk7XG4gICAgICAkKG9wdGlvbnMub3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoYXQub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQgPSBwYXJzZUludCgkKHRoaXMsIGVsZW1lbnQpLnZhbCgpLCAxMCk7XG4gICAgICAgIGlmICggcGF5bWVudF90eXBlID09PSAnYmFua19hY2NvdW50JyApIHtcbiAgICAgICAgICB0aGF0LmNhbGN1bGF0ZUZlZXModGhhdC5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCwgJ2JhbmtfYWNjb3VudCcpO1xuICAgICAgICAgIHRoYXQuc2V0UGF5bWVudEludGVudCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoYXQuY2FsY3VsYXRlRmVlcyh0aGF0Lm9wdGlvbnMub3JpZ2luYWxfYW1vdW50LCAnY2FyZCcpO1xuICAgICAgICAgIHRoYXQuc2V0UGF5bWVudEludGVudCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoYXQuc2V0RmFpck1hcmtldFZhbHVlKCQodGhpcywgZWxlbWVudCkpO1xuICAgICAgfSk7XG4gICAgICAkKG9wdGlvbnMuYWRkaXRpb25hbF9hbW91bnRfZmllbGQsIGVsZW1lbnQpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgdGhhdC5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCA9IHBhcnNlSW50KCQob3B0aW9ucy5vcmlnaW5hbF9hbW91bnRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLCAxMCk7XG4gICAgICAgIGlmICggcGF5bWVudF90eXBlID09PSAnYmFua19hY2NvdW50JyApIHtcbiAgICAgICAgICB0aGF0LmNhbGN1bGF0ZUZlZXModGhhdC5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCwgJ2JhbmtfYWNjb3VudCcpO1xuICAgICAgICAgIHRoYXQuc2V0UGF5bWVudEludGVudCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoYXQuY2FsY3VsYXRlRmVlcyh0aGF0Lm9wdGlvbnMub3JpZ2luYWxfYW1vdW50LCAnY2FyZCcpO1xuICAgICAgICAgIHRoYXQuc2V0UGF5bWVudEludGVudCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIH0sIC8vIGFtb3VudFVwZGF0ZWRcblxuICAgIHNldFBheW1lbnRJbnRlbnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGFtb3VudCA9IHRoaXMuZ2V0VG90YWxBbW91bnQoKTtcbiAgICAgIHZhciBwYXltZW50X3R5cGUgPSAkKHRoaXMub3B0aW9ucy5jaG9vc2VfcGF5bWVudCArICcgaW5wdXQnKS52YWwoKTtcbiAgICAgIHZhciBwYXlfZmVlcyA9IGZhbHNlO1xuICAgICAgdmFyIGZpZWxkID0gJCh0aGlzLm9wdGlvbnMucGF5X2NjX3Byb2Nlc3Npbmdfc2VsZWN0b3IpO1xuICAgICAgaWYgKCQoZmllbGQpLmlzKCc6Y2hlY2tlZCcpIHx8ICQoZmllbGQpLnByb3AoJ2NoZWNrZWQnKSkge1xuICAgICAgICBwYXlfZmVlcyA9IHRydWU7XG4gICAgICB9XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB2YXIgaW50ZW50RGF0YSA9IHtcbiAgICAgICAgYW1vdW50OiBhbW91bnQsXG4gICAgICAgIHBheW1lbnRfdHlwZTogcGF5bWVudF90eXBlLFxuICAgICAgICBwYXlfZmVlczogcGF5X2ZlZXMsXG4gICAgICAgIGN1cnJlbmN5OiAndXNkJ1xuICAgICAgfTtcbiAgICAgICQuYWpheCh7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICB1cmw6ICcvZ2V0LXBheW1lbnQtaW50ZW50LycsXG4gICAgICAgIGRhdGE6IGludGVudERhdGFcbiAgICAgIH0pLmRvbmUoZnVuY3Rpb24oIHJlc3VsdCApIHtcbiAgICAgICAgJCh0aGF0Lm9wdGlvbnMuaW50ZW50X3NlY3JldF9zZWxlY3RvcikudmFsKHJlc3VsdC5jbGllbnRTZWNyZXQpO1xuICAgICAgfSk7XG4gICAgfSwgLy8gc2V0UGF5bWVudEludGVudFxuXG4gICAgZ2V0UGF5bWVudEludGVudDogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaW50ZW50O1xuICAgICAgaW50ZW50ID0gJCh0aGlzLm9wdGlvbnMuaW50ZW50X3NlY3JldF9zZWxlY3RvcikudmFsKCk7XG4gICAgICByZXR1cm4gaW50ZW50O1xuICAgIH0sIC8vIGdldFBheW1lbnRJbnRlbnRcblxuICAgIGdldFRvdGFsQW1vdW50OiBmdW5jdGlvbihhbW91bnQpIHtcbiAgICAgIGFtb3VudCA9ICh0eXBlb2YgYW1vdW50ICE9PSAndW5kZWZpbmVkJykgPyAgYW1vdW50IDogdGhpcy5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudDtcbiAgICAgIHZhciB0b3RhbF9hbW91bnQgPSBhbW91bnQ7XG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuYWRkaXRpb25hbF9hbW91bnRfZmllbGQpLmxlbmd0aCA+IDAgJiYgJCh0aGlzLm9wdGlvbnMuYWRkaXRpb25hbF9hbW91bnRfZmllbGQpLnZhbCgpID4gMCkge1xuICAgICAgICB2YXIgYWRkaXRpb25hbF9hbW91bnQgPSAkKHRoaXMub3B0aW9ucy5hZGRpdGlvbmFsX2Ftb3VudF9maWVsZCkudmFsKCk7XG4gICAgICAgIHRvdGFsX2Ftb3VudCA9IHBhcnNlSW50KGFkZGl0aW9uYWxfYW1vdW50LCAxMCkgKyBwYXJzZUludChhbW91bnQsIDEwKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0b3RhbF9hbW91bnQ7XG4gICAgfSwgLy9nZXRUb3RhbEFtb3VudFxuXG4gICAgc2V0RmFpck1hcmtldFZhbHVlOiBmdW5jdGlvbihhbW91bnRfc2VsZWN0b3IpIHtcbiAgICAgIC8vIGlmIHRoZXJlIGlzIGEgZmFpciBtYXJrZXQgdmFsdWUgZmllbGQsIGNoZWNrIGFuZCBzZWUgaWYgd2UgY2FuIHBvcHVsYXRlIGl0XG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuZmFpcl9tYXJrZXRfdmFsdWVfc2VsZWN0b3IpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdmFyIGZhaXJNYXJrZXRWYWx1ZSA9IGFtb3VudF9zZWxlY3Rvci5kYXRhKCdmYWlyLW1hcmtldC12YWx1ZScpO1xuICAgICAgICAkKHRoaXMub3B0aW9ucy5mYWlyX21hcmtldF92YWx1ZV9zZWxlY3RvcikudmFsKGZhaXJNYXJrZXRWYWx1ZSk7XG4gICAgICB9XG4gICAgfSwgLy8gc2V0RmFpck1hcmtldFZhbHVlXG5cbiAgICBjYWxjdWxhdGVGZWVzOiBmdW5jdGlvbihhbW91bnQsIHN0cmlwZV9wYXltZW50X3R5cGUpIHtcbiAgICAgIC8vIHRoaXMgc2VuZHMgdGhlIGFtb3VudCBhbmQgc3RyaXBlIHBheW1lbnQgdHlwZSB0byBweXRob247IGdldCB0aGUgZmVlIGFuZCBkaXNwbGF5IGl0IHRvIHRoZSB1c2VyIG9uIHRoZSBjaGVja2JveCBsYWJlbFxuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdmFyIHRvdGFsX2Ftb3VudCA9IHRoYXQuZ2V0VG90YWxBbW91bnQoYW1vdW50KTtcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICBhbW91bnQ6IHRvdGFsX2Ftb3VudCxcbiAgICAgICAgc3RyaXBlX3BheW1lbnRfdHlwZTogc3RyaXBlX3BheW1lbnRfdHlwZVxuICAgICAgfTtcbiAgICAgIHRoYXQuc2V0U3RyaXBlUGF5bWVudFR5cGUoc3RyaXBlX3BheW1lbnRfdHlwZSk7XG4gICAgICAkLmFqYXgoe1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgdXJsOiAnL2NhbGN1bGF0ZS1mZWVzLycsXG4gICAgICAgIGRhdGE6IGRhdGFcbiAgICAgIH0pLmRvbmUoZnVuY3Rpb24oIGRhdGEgKSB7XG4gICAgICAgIGlmICgkKGRhdGEuZmVlcykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICQodGhhdC5vcHRpb25zLmZlZV9hbW91bnQpLnRleHQocGFyc2VGbG9hdChkYXRhLmZlZXMpLnRvRml4ZWQoMikpO1xuICAgICAgICAgIHRoYXQuY3JlZGl0Q2FyZEZlZUNoZWNrYm94KCQodGhhdC5vcHRpb25zLnBheV9jY19wcm9jZXNzaW5nX3NlbGVjdG9yKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sIC8vIGNhbGN1bGF0ZUZlZXNcblxuICAgIGNyZWRpdENhcmRQcm9jZXNzaW5nRmVlczogZnVuY3Rpb24ob3B0aW9ucywgcmVzZXQpIHtcbiAgICAgIC8vIHRoaXMgYWRkcyBvciBzdWJ0cmFjdHMgdGhlIGZlZSB0byB0aGUgb3JpZ2luYWwgYW1vdW50IHdoZW4gdGhlIHVzZXIgaW5kaWNhdGVzIHRoZXkgZG8gb3IgZG8gbm90IHdhbnQgdG8gcGF5IHRoZSBmZWVzXG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB0aGF0LmNyZWRpdENhcmRGZWVDaGVja2JveCgkKHRoaXMub3B0aW9ucy5wYXlfY2NfcHJvY2Vzc2luZ19zZWxlY3RvcikpO1xuICAgICAgJCh0aGlzLm9wdGlvbnMucGF5X2NjX3Byb2Nlc3Npbmdfc2VsZWN0b3IpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdGhhdC5jcmVkaXRDYXJkRmVlQ2hlY2tib3godGhpcyk7XG4gICAgICAgICAgdGhhdC5zZXRQYXltZW50SW50ZW50KCk7XG4gICAgICB9KTtcbiAgICB9LCAvLyBjcmVkaXRDYXJkUHJvY2Vzc2luZ0ZlZXNcblxuICAgIHNldFN0cmlwZVBheW1lbnRUeXBlOiBmdW5jdGlvbihzdHJpcGVfcGF5bWVudF90eXBlKSB7XG4gICAgICBpZiAoJCgnaW5wdXRbbmFtZT1cInN0cmlwZV9wYXltZW50X3R5cGVcIl0nKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgJCh0aGlzLm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLmFwcGVuZCgnPGlucHV0IHR5cGU9XFxcImhpZGRlblxcXCIgbmFtZT1cXFwic3RyaXBlX3BheW1lbnRfdHlwZVxcXCI+Jyk7XG4gICAgICB9XG4gICAgICAkKCdpbnB1dFtuYW1lPVwic3RyaXBlX3BheW1lbnRfdHlwZVwiXScpLnZhbChzdHJpcGVfcGF5bWVudF90eXBlKTtcbiAgICB9LCAvLyBzZXRTdHJpcGVQYXltZW50VHlwZVxuXG4gICAgY3JlZGl0Q2FyZEZlZUNoZWNrYm94OiBmdW5jdGlvbihmaWVsZCkge1xuICAgICAgdmFyIGZ1bGxfYW1vdW50O1xuICAgICAgdmFyIHRvdGFsX2Ftb3VudCA9IHRoaXMuZ2V0VG90YWxBbW91bnQoKTtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIGlmICgkKGZpZWxkKS5pcygnOmNoZWNrZWQnKSB8fCAkKGZpZWxkKS5wcm9wKCdjaGVja2VkJykpIHtcbiAgICAgICAgJCgnLmFtb3VudCAubGV2ZWwtYW1vdW50JykuYWRkQ2xhc3MoJ2Z1bGwtYW1vdW50Jyk7XG4gICAgICAgIGZ1bGxfYW1vdW50ID0gKHRvdGFsX2Ftb3VudCArIHBhcnNlRmxvYXQoJCh0aGF0Lm9wdGlvbnMuZmVlX2Ftb3VudCkudGV4dCgpKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmdWxsX2Ftb3VudCA9IHRvdGFsX2Ftb3VudDtcbiAgICAgIH1cbiAgICAgICQodGhhdC5vcHRpb25zLmZ1bGxfYW1vdW50X3NlbGVjdG9yKS50ZXh0KHBhcnNlRmxvYXQoZnVsbF9hbW91bnQpLnRvRml4ZWQoMikpO1xuICAgIH0sIC8vIGNyZWRpdENhcmRGZWVDaGVja2JveFxuXG4gICAgZG9uYXRlQW5vbnltb3VzbHk6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHRoYXQudG9nZ2xlQW5vbnltb3VzKCQob3B0aW9ucy5hbm9ueW1vdXNfc2VsZWN0b3IsIGVsZW1lbnQpKTtcbiAgICAgICQob3B0aW9ucy5hbm9ueW1vdXNfc2VsZWN0b3IsIGVsZW1lbnQpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgdGhhdC50b2dnbGVBbm9ueW1vdXMoJCh0aGlzKSk7XG4gICAgICB9KTtcbiAgICB9LCAvLyBkb25hdGVBbm9ueW1vdXNseVxuXG4gICAgdG9nZ2xlQW5vbnltb3VzOiBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICBpZiAoZWxlbWVudC5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICAkKHRoaXMub3B0aW9ucy5uYW1lX3NlbGVjdG9yICsgJyBkaXY6Zmlyc3QnLCB0aGlzLmVsZW1lbnQpLmhpZGUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQodGhpcy5vcHRpb25zLm5hbWVfc2VsZWN0b3IgKyAnIGRpdjpmaXJzdCcsIHRoaXMuZWxlbWVudCkuc2hvdygpO1xuICAgICAgfVxuICAgIH0sIC8vIHRvZ2dsZUFub255bW91c1xuXG4gICAgY2hlY2tMZXZlbDogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucywgcmV0dXJudmFsdWUpIHtcbiAgICAgIC8vIHdlIGNvdWxkIG1heWJlIGdldCByaWQgb2YgdGhpcyBpZiB3ZSBjb3VsZCBtb3ZlIHRoaXMgcGFydCBpbnRvIHdvcmRwcmVzc1xuICAgICAgdmFyIGxldmVsID0gJyc7XG4gICAgICB2YXIgbGV2ZWxudW0gPSAwO1xuICAgICAgdmFyIGFtb3VudF95ZWFybHk7XG4gICAgICB2YXIgZnJlcXVlbmN5ID0gb3B0aW9ucy5mcmVxdWVuY3k7XG4gICAgICB2YXIgYW1vdW50ID0gb3B0aW9ucy5vcmlnaW5hbF9hbW91bnQ7XG5cbiAgICAgIGlmIChmcmVxdWVuY3kgPT09IDEyKSB7XG4gICAgICAgIGFtb3VudF95ZWFybHkgPSBhbW91bnQgKiBmcmVxdWVuY3k7XG4gICAgICB9IGVsc2UgaWYgKGZyZXF1ZW5jeSA9PT0gMSkge1xuICAgICAgICBhbW91bnRfeWVhcmx5ID0gYW1vdW50O1xuICAgICAgfVxuICAgICAgXG4gICAgICAkLmVhY2gob3B0aW9ucy5sZXZlbHMsIGZ1bmN0aW9uKGluZGV4LCB2YWx1ZSkge1xuICAgICAgICB2YXIgbmFtZSA9IHZhbHVlLm5hbWU7XG4gICAgICAgIHZhciBudW0gPSBpbmRleDtcbiAgICAgICAgdmFyIG1heCA9IHZhbHVlLm1heDtcbiAgICAgICAgdmFyIG1pbiA9IHZhbHVlLm1pbjtcbiAgICAgICAgaWYgKHR5cGVvZiBtaW4gIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBtYXggIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgaWYgKGFtb3VudF95ZWFybHkgPj0gbWluICYmIGFtb3VudF95ZWFybHkgPCBtYXgpIHtcbiAgICAgICAgICAgIGxldmVsID0gbmFtZTtcbiAgICAgICAgICAgIGxldmVsbnVtID0gbnVtO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbWF4ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGlmIChhbW91bnRfeWVhcmx5IDwgbWF4KSB7XG4gICAgICAgICAgICBsZXZlbCA9IG5hbWU7XG4gICAgICAgICAgICBsZXZlbG51bSA9IG51bTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG1pbiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBpZiAoYW1vdW50X3llYXJseSA+PSBtaW4pIHtcbiAgICAgICAgICAgIGxldmVsID0gbmFtZTtcbiAgICAgICAgICAgIGxldmVsbnVtID0gbnVtO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBpZiAocmV0dXJudmFsdWUgPT09ICduYW1lJykge1xuICAgICAgICByZXR1cm4gbGV2ZWw7XG4gICAgICB9IGVsc2UgaWYgKHJldHVybnZhbHVlID09PSAnbnVtJykge1xuICAgICAgICByZXR1cm4gbGV2ZWxudW07ICBcbiAgICAgIH1cbiAgICB9LCAvLyBjaGVja0xldmVsXG5cbiAgICBob25vck9yTWVtb3J5OiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICBpZiAoJChvcHRpb25zLmhvbm9yX29yX21lbW9yeV9jaG9vc2VyICsgJzpjaGVja2VkJykudmFsKCkpIHtcbiAgICAgICAgJChvcHRpb25zLmhvbm9yX21lbW9yeV9pbnB1dF9ncm91cCwgZWxlbWVudCkuc2hvdygpO1xuICAgICAgICAkKG9wdGlvbnMuaG9ub3JfdHlwZV9zZWxlY3RvcikudGV4dCgkKG9wdGlvbnMuaG9ub3Jfb3JfbWVtb3J5X2Nob29zZXIgKyAnOmNoZWNrZWQnKS52YWwoKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkKG9wdGlvbnMuaG9ub3JfbWVtb3J5X2lucHV0X2dyb3VwLCBlbGVtZW50KS5oaWRlKCk7XG4gICAgICAgICQob3B0aW9ucy5ob25vcl9uYW1lX3NlbGVjdG9yICsgJyBpbnB1dCcsIGVsZW1lbnQpLnZhbCgnJyk7XG4gICAgICB9XG4gICAgfSwgLy8gaG9ub3JPck1lbW9yeVxuXG4gICAgaG9ub3JPck1lbW9yeVRvZ2dsZTogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdGhhdC5ob25vck9yTWVtb3J5KHRoYXQuZWxlbWVudCwgdGhhdC5vcHRpb25zKTtcbiAgICAgICQob3B0aW9ucy5ob25vcl9vcl9tZW1vcnlfY2hvb3NlciwgZWxlbWVudCkuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGF0Lmhvbm9yT3JNZW1vcnkodGhhdC5lbGVtZW50LCB0aGF0Lm9wdGlvbnMpO1xuICAgICAgfSk7XG4gICAgfSwgLy8gaG9ub3JPck1lbW9yeVRvZ2dsZVxuXG4gICAgb3V0c2lkZVVuaXRlZFN0YXRlczogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgJChvcHRpb25zLnNob3dfYmlsbGluZ19jb3VudHJ5X3NlbGVjdG9yKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgJChvcHRpb25zLmJpbGxpbmdfY291bnRyeV9zZWxlY3Rvcikuc2hvdygpO1xuICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmhpZGUoKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSk7XG4gICAgICAkKG9wdGlvbnMuc2hvd19zaGlwcGluZ19jb3VudHJ5X3NlbGVjdG9yKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgJChvcHRpb25zLnNoaXBwaW5nX2NvdW50cnlfc2VsZWN0b3IpLnNob3coKTtcbiAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5oaWRlKCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuICAgIH0sIC8vIG91dHNpZGVVbml0ZWRTdGF0ZXNcblxuICAgIHNoaXBwaW5nQWRkcmVzczogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdmFyIHNob3dfc2hpcHBpbmcgPSBmYWxzZTtcbiAgICAgIGlmICgkKG9wdGlvbnMudXNlX2Zvcl9zaGlwcGluZ19zZWxlY3RvcikubGVuZ3RoID4gMCkgeyAvLyB3ZSBoYXZlIGEgc2hpcHBpbmcgY2hlY2tib3hcbiAgICAgICAgc2hvd19zaGlwcGluZyA9IHRydWU7XG4gICAgICB9XG4vLyAgICAgIHNob3dfc2hpcHBpbmcgPSAhISQob3B0aW9ucy51c2VfZm9yX3NoaXBwaW5nX3NlbGVjdG9yICsgJzpjaGVja2VkJywgZWxlbWVudCkubGVuZ3RoO1xuLy8gICAgICAvL3RoaXMuZGVidWcoJ3Nob3cgaXMgdGhlcmUnKTtcblxuLyogICAgICAkKG9wdGlvbnMudXNlX2Zvcl9zaGlwcGluZ19zZWxlY3RvciwgZWxlbWVudCkuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGF0LnNoaXBwaW5nQWRkcmVzcyhlbGVtZW50LCBvcHRpb25zKTtcbiAgICAgICAgLy90aGlzLmRlYnVnKCdjaGFuZ2UgaXQnKTtcbiAgICAgIH0pO1xuKi9cbiAgICAgIGlmIChzaG93X3NoaXBwaW5nID09PSB0cnVlICkge1xuICAgICAgICAkKG9wdGlvbnMudXNlX2Zvcl9zaGlwcGluZ19zZWxlY3RvciwgZWxlbWVudCkucGFyZW50KCkuc2hvdygpO1xuICAgICAgICBpZiAoJChvcHRpb25zLnVzZV9mb3Jfc2hpcHBpbmdfc2VsZWN0b3IsIGVsZW1lbnQpLmlzKCc6Y2hlY2tlZCcpKSB7IC8vIHVzZSBzYW1lIGFzIGJpbGxpbmdcbiAgICAgICAgICAkKG9wdGlvbnMuc2hpcHBpbmdfc2VsZWN0b3IpLmhpZGUoKTtcbiAgICAgICAgfSBlbHNlIHsgLy8gc2VwYXJhdGUgc2hpcHBpbmcgYW5kIGJpbGxpbmdcbiAgICAgICAgICAkKG9wdGlvbnMuc2hpcHBpbmdfc2VsZWN0b3IpLnNob3coKTtcbiAgICAgICAgfVxuICAgICAgICAkKG9wdGlvbnMudXNlX2Zvcl9zaGlwcGluZ19zZWxlY3RvciwgZWxlbWVudCkuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHRoYXQuc2hpcHBpbmdBZGRyZXNzKGVsZW1lbnQsIG9wdGlvbnMpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIFxuICAgIH0sIC8vIHNoaXBwaW5nQWRkcmVzc1xuXG4gICAgYWxsb3dNaW5ucG9zdEFjY291bnQ6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHZhciBhY2NvdW50X2V4aXN0cyA9IGZhbHNlO1xuXG4gICAgICAvLyBzaG93IHBhc3N3b3JkIGFzIHRleHRcbiAgICAgIHRoYXQuc2hvd1Bhc3N3b3JkKCk7XG5cbiAgICAgIC8vIGNhbGN1bGF0ZSBwYXNzd29yZCBzdHJlbmd0aFxuICAgICAgdGhhdC5zaG93UGFzc3dvcmRTdHJlbmd0aCgpO1xuICAgICAgXG4gICAgICB0aGF0LnNwYW1FbWFpbCgkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpKTtcbiAgICAgICQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGF0LnNwYW1FbWFpbCgkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGF0LnRvZ2dsZUFjY291bnRGaWVsZHMoJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkpO1xuICAgICAgJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGF0LnRvZ2dsZUFjY291bnRGaWVsZHMoJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkpO1xuICAgICAgfSk7XG5cbiAgICAgIGZ1bmN0aW9uIGRvbmVUeXBpbmcgKCkge1xuICAgICAgICB2YXIgZW1haWwgPSAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpO1xuICAgICAgICBhY2NvdW50X2V4aXN0cyA9IHRoYXQuY2hlY2tNaW5ucG9zdEFjY291bnQoZWxlbWVudCwgb3B0aW9ucywgZW1haWwpO1xuICAgICAgfVxuXG4gICAgICAvL3NldHVwIGJlZm9yZSBmdW5jdGlvbnNcbiAgICAgIHZhciB0eXBpbmdUaW1lcjsgICAgICAgICAgICAgICAgLy90aW1lciBpZGVudGlmaWVyXG4gICAgICB2YXIgZG9uZVR5cGluZ0ludGVydmFsID0gNTAwMDsgIC8vdGltZSBpbiBtcywgNSBzZWNvbmQgZm9yIGV4YW1wbGVcblxuICAgICAgLy9vbiBrZXl1cCwgc3RhcnQgdGhlIGNvdW50ZG93blxuICAgICAgJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5rZXl1cChmdW5jdGlvbigpe1xuICAgICAgICBjbGVhclRpbWVvdXQodHlwaW5nVGltZXIpO1xuICAgICAgICBpZiAoJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwpIHtcbiAgICAgICAgICB0eXBpbmdUaW1lciA9IHNldFRpbWVvdXQoZG9uZVR5cGluZywgZG9uZVR5cGluZ0ludGVydmFsKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSwgLy8gYWxsb3dNaW5ucG9zdEFjY291bnRcblxuICAgIHNwYW1FbWFpbDogZnVuY3Rpb24oZW1haWxfZmllbGQpIHtcbiAgICAgIHZhciBzcGFtRXJyb3JDb250YWluZXIgPSBlbWFpbF9maWVsZC5wYXJlbnQoKTtcbiAgICAgIGlmICgkKCcuYS1zcGFtLWVtYWlsJywgc3BhbUVycm9yQ29udGFpbmVyKS5sZW5ndGggPT09IDAgKSB7XG4gICAgICAgIHNwYW1FcnJvckNvbnRhaW5lci5hcHBlbmQoJzxwIGNsYXNzPVwiYS1mb3JtLWNhcHRpb24gYS1lcnJvciBhLXNwYW0tZW1haWxcIj5UaGlzIGVtYWlsIGFkZHJlc3MgaGFzIGJlZW4gZGV0ZWN0ZWQgYXMgYSBzcGFtbWVyLjwvcD4nKTtcbiAgICAgIH1cbiAgICAgICQoJy5hLXNwYW0tZW1haWwnLCBzcGFtRXJyb3JDb250YWluZXIpLmhpZGUoKTtcbiAgICAgIHNwYW1FcnJvckNvbnRhaW5lci5yZW1vdmVDbGFzcygnaW52YWxpZCBhLWVycm9yJyk7XG4gICAgfSwgLy8gc3BhbUVtYWlsXG5cbiAgICB0b2dnbGVBY2NvdW50RmllbGRzOiBmdW5jdGlvbihjcmVhdGVfYWNjb3VudF9zZWxlY3Rvcikge1xuICAgICAgaWYgKGNyZWF0ZV9hY2NvdW50X3NlbGVjdG9yLmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgIGNyZWF0ZV9hY2NvdW50X3NlbGVjdG9yLnBhcmVudCgpLmJlZm9yZSgnPHAgY2xhc3M9XCJhLWZvcm0tY2FwdGlvbiBhLWFjY291bnQtZXhpc3RzIGEtYWNjb3VudC1leGlzdHMtc3VjY2Vzc1wiPlRoZXJlIGlzIGFscmVhZHkgYSBNaW5uUG9zdC5jb20gYWNjb3VudCB3aXRoIHRoaXMgZW1haWwgYWRkcmVzcy48L3A+Jyk7XG4gICAgICAgICQoJy5hLWFjY291bnQtZXhpc3RzJykuaGlkZSgpO1xuICAgICAgICAkKHRoaXMub3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgdGhpcy5lbGVtZW50KS5zaG93KCk7XG4gICAgICAgIHRoaXMub3B0aW9ucy5jcmVhdGVfYWNjb3VudCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkKHRoaXMub3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgdGhpcy5lbGVtZW50KS5oaWRlKCk7XG4gICAgICB9XG4gICAgfSwgLy8gdG9nZ2xlQWNjb3VudEZpZWxkc1xuXG4gICAgc2hvd1Bhc3N3b3JkOiBmdW5jdGlvbigpIHtcbiAgICAgIC8vIENhY2hlIG91ciBqcXVlcnkgZWxlbWVudHNcbiAgICAgIHZhciAkc3VibWl0ID0gJCgnLmJ0bi1zdWJtaXQnKTtcbiAgICAgIHZhciAkY29udGFpbmVyID0gJCh0aGlzLm9wdGlvbnMucGFzc3dvcmRfc2VsZWN0b3IsIHRoaXMuZWxlbWVudCk7XG4gICAgICB2YXIgJGZpZWxkID0gJCgnaW5wdXRbbmFtZT1cInBhc3N3b3JkXCJdJywgJGNvbnRhaW5lcik7XG4gICAgICAkKCcuYS1hY2NvdW50LWV4aXN0cycpLmhpZGUoKTtcbiAgICAgIHZhciBzaG93X3Bhc3MgPSAnPGRpdiBjbGFzcz1cImEtZm9ybS1zaG93LXBhc3N3b3JkIGEtZm9ybS1jYXB0aW9uXCI+PGxhYmVsPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBuYW1lPVwic2hvd19wYXNzd29yZFwiIGlkPVwic2hvdy1wYXNzd29yZC1jaGVja2JveFwiIHZhbHVlPVwiMVwiPiBTaG93IHBhc3N3b3JkPC9sYWJlbD48L2Rpdj4nO1xuICAgICAgLy8gSW5qZWN0IHRoZSB0b2dnbGUgYnV0dG9uIGludG8gdGhlIHBhZ2VcbiAgICAgICRjb250YWluZXIuYXBwZW5kKCBzaG93X3Bhc3MgKTtcbiAgICAgIC8vIENhY2hlIHRoZSB0b2dnbGUgYnV0dG9uXG4gICAgICB2YXIgJHRvZ2dsZSA9ICQoJyNzaG93LXBhc3N3b3JkLWNoZWNrYm94Jyk7XG4gICAgICAvLyBUb2dnbGUgdGhlIGZpZWxkIHR5cGVcbiAgICAgICR0b2dnbGUub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICB2YXIgY2hlY2tib3ggPSAkKHRoaXMpO1xuICAgICAgICBpZiAoY2hlY2tib3guaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgICAkZmllbGQuYXR0cigndHlwZScsICd0ZXh0Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJGZpZWxkLmF0dHIoJ3R5cGUnLCAncGFzc3dvcmQnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICAvLyBTZXQgdGhlIGZvcm0gZmllbGQgYmFjayB0byBhIHJlZ3VsYXIgcGFzc3dvcmQgZWxlbWVudFxuICAgICAgJHN1Ym1pdC5vbiggJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAkZmllbGQuYXR0cigndHlwZScsICdwYXNzd29yZCcpO1xuICAgICAgfSk7XG4gICAgfSxcblxuICAgIHNob3dQYXNzd29yZFN0cmVuZ3RoOiBmdW5jdGlvbigpIHtcbiAgICAgIC8vIGNoZWNrUGFzc3dvcmRTdHJlbmd0aFxuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgaWYgKCQoJy5hLXBhc3N3b3JkLXN0cmVuZ3RoJykubGVuZ3RoID4gMCApIHtcbiAgICAgICAgdmFyICRiZWZvcmUgPSAkKCcuYS1mb3JtLXNob3ctcGFzc3dvcmQnKTtcbiAgICAgICAgJGJlZm9yZS5hZnRlciggJCgnPGRpdiBjbGFzcz1cImEtcGFzc3dvcmQtc3RyZW5ndGhcIj48bWV0ZXIgbWF4PVwiNFwiIGlkPVwicGFzc3dvcmQtc3RyZW5ndGhcIj48ZGl2PjwvZGl2PjwvbWV0ZXI+PHAgY2xhc3M9XCJhLWZvcm0tY2FwdGlvblwiIGlkPVwicGFzc3dvcmQtc3RyZW5ndGgtdGV4dFwiPjwvcD48L2Rpdj4nKSk7XG4gICAgICAgICQoICdib2R5JyApLm9uKCAna2V5dXAnLCAnaW5wdXRbbmFtZT1wYXNzd29yZF0nLFxuICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhhdC5jaGVja1Bhc3N3b3JkU3RyZW5ndGgoXG4gICAgICAgICAgICAgICQoJ2lucHV0W25hbWU9cGFzc3dvcmRdJyksIC8vIFBhc3N3b3JkIGZpZWxkXG4gICAgICAgICAgICAgICQoJyNwYXNzd29yZC1zdHJlbmd0aCcpLCAgICAgICAgICAgLy8gU3RyZW5ndGggbWV0ZXJcbiAgICAgICAgICAgICAgJCgnI3Bhc3N3b3JkLXN0cmVuZ3RoLXRleHQnKSAgICAgIC8vIFN0cmVuZ3RoIHRleHQgaW5kaWNhdG9yXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9LCAvLyBzaG93UGFzc3dvcmRTdHJlbmd0aFxuXG4gICAgY2hlY2tQYXNzd29yZFN0cmVuZ3RoOiBmdW5jdGlvbiggJHBhc3N3b3JkLCAkc3RyZW5ndGhNZXRlciwgJHN0cmVuZ3RoVGV4dCApIHtcbiAgICAgIHZhciBwYXNzd29yZCA9ICRwYXNzd29yZC52YWwoKTtcbiAgICAgIC8vIEdldCB0aGUgcGFzc3dvcmQgc3RyZW5ndGhcbiAgICAgIHZhciByZXN1bHQgPSB6eGN2Ym4ocGFzc3dvcmQpO1xuICAgICAgdmFyIHN0cmVuZ3RoID0gcmVzdWx0LnNjb3JlO1xuXG4gICAgICAkc3RyZW5ndGhUZXh0LnJlbW92ZUNsYXNzKCAnc2hvcnQgYmFkIGdvb2Qgc3Ryb25nJyApO1xuXG4gICAgICAvLyBBZGQgdGhlIHN0cmVuZ3RoIG1ldGVyIHJlc3VsdHNcbiAgICAgIHN3aXRjaCAoIHN0cmVuZ3RoICkge1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgJHN0cmVuZ3RoVGV4dC5hZGRDbGFzcyggJ2JhZCcgKS5odG1sKCAnU3RyZW5ndGg6IDxzdHJvbmc+V2Vhazwvc3Ryb25nPicgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICRzdHJlbmd0aFRleHQuYWRkQ2xhc3MoICdnb29kJyApLmh0bWwoICdTdHJlbmd0aDogPHN0cm9uZz5NZWRpdW08L3N0cm9uZz4nICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAkc3RyZW5ndGhUZXh0LmFkZENsYXNzKCAnc3Ryb25nJyApLmh0bWwoICdTdHJlbmd0aDogPHN0cm9uZz5TdHJvbmc8L3N0cm9uZz4nICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAkc3RyZW5ndGhUZXh0LmFkZENsYXNzKCAnc2hvcnQnICkuaHRtbCggJ1N0cmVuZ3RoOiA8c3Ryb25nPlZlcnkgd2Vhazwvc3Ryb25nPicgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAkc3RyZW5ndGhUZXh0LmFkZENsYXNzKCAnc2hvcnQnICkuaHRtbCggJ1N0cmVuZ3RoOiA8c3Ryb25nPlZlcnkgd2Vhazwvc3Ryb25nPicgKTtcbiAgICAgIH1cbiAgICAgICRzdHJlbmd0aE1ldGVyLnZhbChzdHJlbmd0aCk7XG4gICAgICByZXR1cm4gc3RyZW5ndGg7XG4gICAgfSwgLy8gY2hlY2tQYXNzd29yZFN0cmVuZ3RoXG5cbiAgICBjaGVja01pbm5wb3N0QWNjb3VudDogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucywgZW1haWwpIHtcbiAgICAgIHZhciB1c2VyID0ge1xuICAgICAgICBlbWFpbDogZW1haWxcbiAgICAgIH07XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAkLmFqYXgoe1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICB1cmw6IG9wdGlvbnMubWlubnBvc3Rfcm9vdCArICcvd3AtanNvbi91c2VyLWFjY291bnQtbWFuYWdlbWVudC92MS9jaGVjay1hY2NvdW50JyxcbiAgICAgICAgZGF0YTogdXNlclxuICAgICAgfSkuZG9uZShmdW5jdGlvbiggcmVzdWx0ICkge1xuICAgICAgICBpZiAocmVzdWx0LnN0YXR1cyA9PT0gJ3N1Y2Nlc3MnICYmIHJlc3VsdC5yZWFzb24gPT09ICd1c2VyIGV4aXN0cycpIHsgLy8gdXNlciBleGlzdHNcbiAgICAgICAgICBpZiAoJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgICAgICQob3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgZWxlbWVudCkuaGlkZSgpO1xuICAgICAgICAgICAgJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkucGFyZW50KCkuaGlkZSgpO1xuICAgICAgICAgICAgJCgnLmEtYWNjb3VudC1leGlzdHMnLCBlbGVtZW50KS5zaG93KCk7XG4gICAgICAgICAgfVxuICAgICAgICAgICQob3B0aW9ucy5jcmVhdGVfbXBfc2VsZWN0b3IsIGVsZW1lbnQpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICgkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KS5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICAgICAgICAkKG9wdGlvbnMucGFzc3dvcmRfc2VsZWN0b3IsIGVsZW1lbnQpLmhpZGUoKTtcbiAgICAgICAgICAgICAgJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkucGFyZW50KCkuaGlkZSgpO1xuICAgICAgICAgICAgICAkKCcuYS1hY2NvdW50LWV4aXN0cycsIGVsZW1lbnQpLnNob3coKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmICggcmVzdWx0LnN0YXR1cyA9PT0gJ3NwYW0nICkge1xuICAgICAgICAgICQodGhhdC5vcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yKS5hZGRDbGFzcygnaW52YWxpZCBhLWVycm9yJyk7XG4gICAgICAgICAgJCggJy5hLXNwYW0tZW1haWwnKS5zaG93KCk7XG4gICAgICAgIH0gZWxzZSB7IC8vIHVzZXIgZG9lcyBub3QgZXhpc3Qgb3IgYWpheCBjYWxsIGZhaWxlZFxuICAgICAgICAgIGlmICgkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KS5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICAgICAgJChvcHRpb25zLnBhc3N3b3JkX3NlbGVjdG9yLCBlbGVtZW50KS5zaG93KCk7XG4gICAgICAgICAgICBvcHRpb25zLmNyZWF0ZV9hY2NvdW50ID0gdHJ1ZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJChvcHRpb25zLnBhc3N3b3JkX3NlbGVjdG9yLCBlbGVtZW50KS5oaWRlKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgICQoJy5hLWFjY291bnQtZXhpc3RzJywgZWxlbWVudCkuaGlkZSgpO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSwgLy8gY2hlY2tNaW5ucG9zdEFjY291bnRcblxuICAgIGNob29zZVBheW1lbnRNZXRob2Q6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcblxuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuXG4gICAgICBpZiAoJChvcHRpb25zLmNob29zZV9wYXltZW50KS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGlmICgkKG9wdGlvbnMuY2hvb3NlX3BheW1lbnQgKyAnIGlucHV0JykuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgICB2YXIgY2hlY2tlZCA9ICQob3B0aW9ucy5jaG9vc2VfcGF5bWVudCArICcgaW5wdXQ6Y2hlY2tlZCcpLmF0dHIoJ2lkJyk7XG4gICAgICAgICAgdmFyIGNoZWNrZWRfdmFsdWUgPSAkKG9wdGlvbnMuY2hvb3NlX3BheW1lbnQgKyAnIGlucHV0OmNoZWNrZWQnKS52YWwoKTtcbiAgICAgICAgICB0aGF0LnNldHVwUGF5bWVudE1ldGhvZChjaGVja2VkLCBjaGVja2VkX3ZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgICQob3B0aW9ucy5jaG9vc2VfcGF5bWVudCArICcgaW5wdXQnKS5jaGFuZ2UoZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgdGhhdC5zZXR1cFBheW1lbnRNZXRob2QodGhpcy5pZCwgdGhpcy52YWx1ZSk7XG4gICAgICAgICAgdGhhdC5zZXRQYXltZW50SW50ZW50KCk7XG4gICAgICAgICAgaWYgKCB0aGlzLnZhbHVlID09PSAnYmFua19hY2NvdW50JyApIHtcbiAgICAgICAgICAgICQoJ2lucHV0W25hbWU9XCJzdHJpcGVUb2tlblwiXScsICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKSkucmVtb3ZlKCk7XG4gICAgICAgICAgICB0aGF0LmFjaEZpZWxkcyh0aGF0LmVsZW1lbnQsIHRoYXQub3B0aW9ucyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoJ2lucHV0W25hbWU9XCJwdWJsaWNfdG9rZW5cIl0nLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikpLnJlbW92ZSgpO1xuICAgICAgICAgICAgJCgnaW5wdXRbbmFtZT1cImFjY291bnRfaWRcIl0nLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikpLnJlbW92ZSgpO1xuICAgICAgICAgICAgJCgnaW5wdXRbbmFtZT1cImJhbmtUb2tlblwiXScsICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKSkucmVtb3ZlKCk7XG4gICAgICAgICAgICB0aGF0LmNhbGN1bGF0ZUZlZXModGhhdC5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCwgJ2NhcmQnKTsgLy8gd2UgY2FuJ3QgdXNlIGNyZWRpdGNhcmRmaWVsZHMgbWV0aG9kIGhlcmVcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICB9XG4gICAgfSwgLy8gY2hvb3NlUGF5bWVudE1ldGhvZFxuXG4gICAgc2V0dXBQYXltZW50TWV0aG9kOiBmdW5jdGlvbihpZCwgdmFsdWUpIHtcbiAgICAgICQodGhpcy5vcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAkKHRoaXMub3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvciArICcuJyArIGlkKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAvLyQodGhpcy5vcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yICsgJzpub3QoLmFjdGl2ZSkgbGFiZWwnKS5yZW1vdmVDbGFzcygncmVxdWlyZWQnKTtcbiAgICAgIC8vJCh0aGlzLm9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IgKyAnOm5vdCguYWN0aXZlKSBpbnB1dCcpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuICAgICAgJCh0aGlzLm9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IgKyAnOm5vdCguYWN0aXZlKSBpbnB1dCcpLnZhbCgnJyk7XG4gICAgICAvLyQodGhpcy5vcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yICsgJy5hY3RpdmUgbGFiZWwnKS5hZGRDbGFzcygncmVxdWlyZWQnKTtcbiAgICAgIC8vJCh0aGlzLm9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IgKyAnLmFjdGl2ZSBpbnB1dCcpLnByb3AoJ3JlcXVpcmVkJywgdHJ1ZSk7XG4gICAgICBpZiAoIHZhbHVlID09PSAnYmFua19hY2NvdW50JyApIHtcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVGZWVzKHRoaXMub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQsICdiYW5rX2FjY291bnQnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY2FsY3VsYXRlRmVlcyh0aGlzLm9wdGlvbnMub3JpZ2luYWxfYW1vdW50LCAnY2FyZCcpO1xuICAgICAgfVxuICAgIH0sIC8vIHNldHVwUGF5bWVudE1ldGhvZFxuXG4gICAgY3JlZGl0Q2FyZEZpZWxkczogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuXG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG5cbiAgICAgIHZhciBzdHlsZSA9IHtcbiAgICAgICAgYmFzZToge1xuICAgICAgICAgIGljb25Db2xvcjogJyM2NjZFRTgnLFxuICAgICAgICAgIGxpbmVIZWlnaHQ6ICc0M3B4JyxcbiAgICAgICAgICBmb250V2VpZ2h0OiA0MDAsXG4gICAgICAgICAgZm9udEZhbWlseTogJ2ZmLW1ldGEtd2ViLXBybycsXG4gICAgICAgICAgZm9udFNpemU6ICcyNHB4JyxcbiAgICAgICAgICAvL2xpbmVIZWlnaHQ6ICczN3B4JyxcbiAgICAgICAgICAvL2ZvbnRTaXplOiAnMTZweCcsXG4gICAgICAgIH0sXG4gICAgICAgIGludmFsaWQ6IHtcbiAgICAgICAgICBjb2xvcjogJyMxYTE4MTgnLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICAgIFxuXG4gICAgICAvLyBBZGQgYW4gaW5zdGFuY2Ugb2YgdGhlIGNhcmQgVUkgY29tcG9uZW50IGludG8gdGhlIGBjYXJkLWVsZW1lbnRgIDxkaXY+XG4gICAgICAvL2NhcmQubW91bnQoJyNjYXJkLWVsZW1lbnQnKTtcbiAgICAgIGlmICggJCgnLmNyZWRpdC1jYXJkLWdyb3VwJykubGVuZ3RoID09PSAwICYmICQoJy5wYXltZW50LW1ldGhvZC5jaG9vc2UtY2FyZCcpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGF0LmNhcmROdW1iZXJFbGVtZW50ID0gdGhhdC5lbGVtZW50cy5jcmVhdGUoJ2NhcmROdW1iZXInLCB7XG4gICAgICAgIHN0eWxlOiBzdHlsZVxuICAgICAgfSk7XG4gICAgICB0aGF0LmNhcmROdW1iZXJFbGVtZW50Lm1vdW50KG9wdGlvbnMuY2NfbnVtX3NlbGVjdG9yKTtcblxuICAgICAgdGhhdC5jYXJkRXhwaXJ5RWxlbWVudCA9IHRoYXQuZWxlbWVudHMuY3JlYXRlKCdjYXJkRXhwaXJ5Jywge1xuICAgICAgICBzdHlsZTogc3R5bGVcbiAgICAgIH0pO1xuICAgICAgdGhhdC5jYXJkRXhwaXJ5RWxlbWVudC5tb3VudChvcHRpb25zLmNjX2V4cF9zZWxlY3Rvcik7XG5cbiAgICAgIHRoYXQuY2FyZEN2Y0VsZW1lbnQgPSB0aGF0LmVsZW1lbnRzLmNyZWF0ZSgnY2FyZEN2YycsIHtcbiAgICAgICAgc3R5bGU6IHN0eWxlXG4gICAgICB9KTtcbiAgICAgIHRoYXQuY2FyZEN2Y0VsZW1lbnQubW91bnQob3B0aW9ucy5jY19jdnZfc2VsZWN0b3IpO1xuXG4gICAgICAvLyB2YWxpZGF0ZS9lcnJvciBoYW5kbGUgdGhlIGNhcmQgZmllbGRzXG4gICAgICB0aGF0LmNhcmROdW1iZXJFbGVtZW50Lm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICB2YXIgc3RyaXBlX3BheW1lbnRfdHlwZSA9ICdjYXJkJztcbiAgICAgICAgLy8gZXJyb3IgaGFuZGxpbmdcbiAgICAgICAgdGhhdC5zdHJpcGVFcnJvckRpc3BsYXkoZXZlbnQsICQob3B0aW9ucy5jY19udW1fc2VsZWN0b3IsIGVsZW1lbnQpLCBlbGVtZW50LCBvcHRpb25zICk7XG4gICAgICAgIC8vIGlmIGl0IGNoYW5nZWQsIHJlc2V0IHRoZSBidXR0b25cbiAgICAgICAgdGhhdC5idXR0b25TdGF0dXMob3B0aW9ucywgJCh0aGF0Lm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLmZpbmQoJ2J1dHRvbicpLCBmYWxzZSk7XG4gICAgICAgIC8vIFN3aXRjaCBicmFuZCBsb2dvXG4gICAgICAgIGlmIChldmVudC5icmFuZCkge1xuICAgICAgICAgIGlmICggZXZlbnQuYnJhbmQgPT09ICdhbWV4JyApIHtcbiAgICAgICAgICAgIHN0cmlwZV9wYXltZW50X3R5cGUgPSAnYW1leCc7XG4gICAgICAgICAgfSAgICAgICAgICBcbiAgICAgICAgICB0aGF0LnNldEJyYW5kSWNvbihldmVudC5icmFuZCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhhdC5jYWxjdWxhdGVGZWVzKHRoYXQub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQsIHN0cmlwZV9wYXltZW50X3R5cGUpO1xuICAgICAgICB0aGF0LnNldFBheW1lbnRJbnRlbnQoKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGF0LmNhcmRFeHBpcnlFbGVtZW50Lm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAvLyBlcnJvciBoYW5kbGluZ1xuICAgICAgICB0aGF0LnN0cmlwZUVycm9yRGlzcGxheShldmVudCwgJChvcHRpb25zLmNjX2V4cF9zZWxlY3RvciwgZWxlbWVudCksIGVsZW1lbnQsIG9wdGlvbnMgKTtcbiAgICAgICAgLy8gaWYgaXQgY2hhbmdlZCwgcmVzZXQgdGhlIGJ1dHRvblxuICAgICAgICB0aGF0LmJ1dHRvblN0YXR1cyhvcHRpb25zLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIGZhbHNlKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGF0LmNhcmRDdmNFbGVtZW50Lm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAvLyBlcnJvciBoYW5kbGluZ1xuICAgICAgICB0aGF0LnN0cmlwZUVycm9yRGlzcGxheShldmVudCwgJChvcHRpb25zLmNjX2N2dl9zZWxlY3RvciwgZWxlbWVudCksIGVsZW1lbnQsIG9wdGlvbnMgKTtcbiAgICAgICAgLy8gaWYgaXQgY2hhbmdlZCwgcmVzZXQgdGhlIGJ1dHRvblxuICAgICAgICB0aGF0LmJ1dHRvblN0YXR1cyhvcHRpb25zLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIGZhbHNlKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyB0aGlzIGlzIHRoZSBtZXRob2QgdG8gY3JlYXRlIGEgc2luZ2xlIGNhcmQgZmllbGQgYW5kIG1vdW50IGl0XG4gICAgICAvKnZhciBjYXJkID0gdGhhdC5lbGVtZW50cy5jcmVhdGUoXG4gICAgICAgICdjYXJkJyxcbiAgICAgICAge1xuICAgICAgICAgIGhpZGVQb3N0YWxDb2RlOiB0cnVlXG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgICAvLyBBZGQgYW4gaW5zdGFuY2Ugb2YgdGhlIGNhcmQgVUkgY29tcG9uZW50IGludG8gdGhlIGBjYXJkLWVsZW1lbnRgIDxkaXY+XG4gICAgICBjYXJkLm1vdW50KCcjY2FyZC1lbGVtZW50Jyk7Ki9cblxuICAgIH0sIC8vIGNyZWRpdENhcmRGaWVsZHNcblxuICAgIHNldEJyYW5kSWNvbjogZnVuY3Rpb24oYnJhbmQpIHtcbiAgICAgIHZhciBjYXJkQnJhbmRUb1BmQ2xhc3MgPSB7XG4gICAgICAgICd2aXNhJzogJ3BmLXZpc2EnLFxuICAgICAgICAnbWFzdGVyY2FyZCc6ICdwZi1tYXN0ZXJjYXJkJyxcbiAgICAgICAgJ2FtZXgnOiAncGYtYW1lcmljYW4tZXhwcmVzcycsXG4gICAgICAgICdkaXNjb3Zlcic6ICdwZi1kaXNjb3ZlcicsXG4gICAgICAgICdkaW5lcnMnOiAncGYtZGluZXJzJyxcbiAgICAgICAgJ2pjYic6ICdwZi1qY2InLFxuICAgICAgICAndW5rbm93bic6ICdwZi1jcmVkaXQtY2FyZCcsXG4gICAgICB9XG4gICAgICB2YXIgYnJhbmRJY29uRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdicmFuZC1pY29uJyk7XG4gICAgICB2YXIgcGZDbGFzcyA9ICdwZi1jcmVkaXQtY2FyZCc7XG4gICAgICBpZiAoYnJhbmQgaW4gY2FyZEJyYW5kVG9QZkNsYXNzKSB7XG4gICAgICAgIHBmQ2xhc3MgPSBjYXJkQnJhbmRUb1BmQ2xhc3NbYnJhbmRdO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIgaSA9IGJyYW5kSWNvbkVsZW1lbnQuY2xhc3NMaXN0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIGJyYW5kSWNvbkVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShicmFuZEljb25FbGVtZW50LmNsYXNzTGlzdFtpXSk7XG4gICAgICB9XG4gICAgICBicmFuZEljb25FbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3BmJyk7XG4gICAgICBicmFuZEljb25FbGVtZW50LmNsYXNzTGlzdC5hZGQocGZDbGFzcyk7XG4gICAgfSxcblxuICAgIGFjaEZpZWxkczogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgdmFyIGJhbmtUb2tlbkZpZWxkTmFtZSA9ICdiYW5rVG9rZW4nO1xuICAgICAgdmFyIGJhbmtUb2tlbkZpZWxkID0gJ2lucHV0W25hbWU9XCInICsgYmFua1Rva2VuRmllbGROYW1lICsgJ1wiXSc7XG4gICAgICBpZiAob3B0aW9ucy5wbGFpZF9lbnYgIT0gJycgJiYgb3B0aW9ucy5rZXkgIT0gJycgJiYgdHlwZW9mIFBsYWlkICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB2YXIgbGlua0hhbmRsZXIgPSBQbGFpZC5jcmVhdGUoe1xuICAgICAgICAgIHNlbGVjdEFjY291bnQ6IHRydWUsXG4gICAgICAgICAgYXBpVmVyc2lvbjogJ3YyJyxcbiAgICAgICAgICBlbnY6IG9wdGlvbnMucGxhaWRfZW52LFxuICAgICAgICAgIGNsaWVudE5hbWU6ICdNaW5uUG9zdCcsXG4gICAgICAgICAga2V5OiBvcHRpb25zLnBsYWlkX3B1YmxpY19rZXksXG4gICAgICAgICAgcHJvZHVjdDogJ2F1dGgnLFxuICAgICAgICAgIG9uTG9hZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvLyBUaGUgTGluayBtb2R1bGUgZmluaXNoZWQgbG9hZGluZy5cbiAgICAgICAgICB9LFxuICAgICAgICAgIG9uU3VjY2VzczogZnVuY3Rpb24ocHVibGljX3Rva2VuLCBtZXRhZGF0YSkge1xuICAgICAgICAgICAgLy8gVGhlIG9uU3VjY2VzcyBmdW5jdGlvbiBpcyBjYWxsZWQgd2hlbiB0aGUgdXNlciBoYXMgc3VjY2Vzc2Z1bGx5XG4gICAgICAgICAgICAvLyBhdXRoZW50aWNhdGVkIGFuZCBzZWxlY3RlZCBhbiBhY2NvdW50IHRvIHVzZS5cbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyBXaGVuIGNhbGxlZCwgeW91IHdpbGwgc2VuZCB0aGUgcHVibGljX3Rva2VuIGFuZCB0aGUgc2VsZWN0ZWRcbiAgICAgICAgICAgIC8vIGFjY291bnQgSUQsIG1ldGFkYXRhLmFjY291bnRfaWQsIHRvIHlvdXIgYmFja2VuZCBhcHAgc2VydmVyLlxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIHNlbmREYXRhVG9CYWNrZW5kU2VydmVyKHtcbiAgICAgICAgICAgIC8vICAgcHVibGljX3Rva2VuOiBwdWJsaWNfdG9rZW4sXG4gICAgICAgICAgICAvLyAgIGFjY291bnRfaWQ6IG1ldGFkYXRhLmFjY291bnRfaWRcbiAgICAgICAgICAgIC8vIH0pO1xuXG4gICAgICAgICAgICAvL3RoaXMuZGVidWcoJ1B1YmxpYyBUb2tlbjogJyArIHB1YmxpY190b2tlbik7XG4gICAgICAgICAgICAvL3RoaXMuZGVidWcoJ0N1c3RvbWVyLXNlbGVjdGVkIGFjY291bnQgSUQ6ICcgKyBtZXRhZGF0YS5hY2NvdW50X2lkKTtcblxuICAgICAgICAgICAgdmFyIHN1cHBvcnRmb3JtID0gJChvcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKTtcblxuICAgICAgICAgICAgLy8gcmVzcG9uc2UgY29udGFpbnMgaWQgYW5kIGNhcmQsIHdoaWNoIGNvbnRhaW5zIGFkZGl0aW9uYWwgY2FyZCBkZXRhaWxzXG4gICAgICAgICAgICAvLyBJbnNlcnQgdGhlIGRhdGEgaW50byB0aGUgZm9ybSBzbyBpdCBnZXRzIHN1Ym1pdHRlZCB0byB0aGUgc2VydmVyXG4gICAgICAgICAgICBzdXBwb3J0Zm9ybS5hcHBlbmQoJCgnPGlucHV0IHR5cGU9XFxcImhpZGRlblxcXCIgbmFtZT1cXFwicHVibGljX3Rva2VuXFxcIiAvPicpLnZhbChwdWJsaWNfdG9rZW4pKTtcbiAgICAgICAgICAgIHN1cHBvcnRmb3JtLmFwcGVuZCgkKCc8aW5wdXQgdHlwZT1cXFwiaGlkZGVuXFxcIiBuYW1lPVxcXCJhY2NvdW50X2lkXFxcIiAvPicpLnZhbChtZXRhZGF0YS5hY2NvdW50X2lkKSk7XG5cbiAgICAgICAgICAgIC8vIGdldCB0aGUgYWNjb3VudCB2YWxpZGF0ZWQgYnkgYWpheFxuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgdXJsOicvcGxhaWRfdG9rZW4vJyxcbiAgICAgICAgICAgICAgLy9jYWNoZTogZmFsc2UsXG4gICAgICAgICAgICAgIGRhdGE6ICQoc3VwcG9ydGZvcm0pLnNlcmlhbGl6ZSgpLFxuICAgICAgICAgICAgICB0eXBlOiAnUE9TVCdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZG9uZShmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICBpZiAodHlwZW9mIHJlc3BvbnNlLmVycm9yICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIC8vIHRoZXJlIGlzIGFuIGVycm9yLlxuICAgICAgICAgICAgICAgICQob3B0aW9ucy5wbGFpZF9saW5rKS5wYXJlbnQoKS5hZnRlcignPHAgY2xhc3M9XCJlcnJvclwiPicgKyByZXNwb25zZS5lcnJvciArICc8L3A+JylcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL3RoaXMuZGVidWcoJ3ByaW50IHJlc3BvbnNlIGhlcmUnKTtcbiAgICAgICAgICAgICAgICAvL3RoaXMuZGVidWcocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIC8vIGFkZCB0aGUgZmllbGQocykgd2UgbmVlZCB0byB0aGUgZm9ybSBmb3Igc3VibWl0dGluZ1xuICAgICAgICAgICAgICAgIGlmICgkKGJhbmtUb2tlbkZpZWxkKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAkKGJhbmtUb2tlbkZpZWxkKS52YWwocmVzcG9uc2Uuc3RyaXBlX2JhbmtfYWNjb3VudF90b2tlbik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICQob3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikucHJlcGVuZCgkKCc8aW5wdXQgdHlwZT1cXFwiaGlkZGVuXFxcIiBuYW1lPVwiJyArIGJhbmtUb2tlbkZpZWxkTmFtZSArICdcIj4nKS52YWwocmVzcG9uc2Uuc3RyaXBlX2JhbmtfYWNjb3VudF90b2tlbikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkKG9wdGlvbnMucGxhaWRfbGluaywgZWxlbWVudCkuaHRtbCgnPHN0cm9uZz5Zb3VyIGFjY291bnQgd2FzIHN1Y2Nlc3NmdWxseSBhdXRob3JpemVkPC9zdHJvbmc+JykuY29udGVudHMoKS51bndyYXAoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5lcnJvcihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAkKG9wdGlvbnMucGxhaWRfbGluaykucGFyZW50KCkuYWZ0ZXIoJzxwIGNsYXNzPVwiZXJyb3JcIj4nICsgcmVzcG9uc2UuZXJyb3IgKyAnPC9wPicpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9uRXhpdDogZnVuY3Rpb24oZXJyLCBtZXRhZGF0YSkge1xuICAgICAgICAgICAgLy8gVGhlIHVzZXIgZXhpdGVkIHRoZSBMaW5rIGZsb3cuXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICAgICQob3B0aW9ucy5wbGFpZF9saW5rLCBlbGVtZW50KS5jbGljayhmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgJChvcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yICsgJyAuZXJyb3InKS5yZW1vdmUoKTsgLy8gcmVtb3ZlIG1ldGhvZCBlcnJvciBtZXNzYWdlIGlmIGl0IGlzIHRoZXJlXG4gICAgICAgICAgbGlua0hhbmRsZXIub3BlbigpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LCAvLyBhY2hGaWVsZHNcblxuICAgIGJ1dHRvblN0YXR1czogZnVuY3Rpb24ob3B0aW9ucywgYnV0dG9uLCBkaXNhYmxlZCkge1xuICAgICAgLy8gbWFrZSB0aGUgYnV0dG9uIGNsaWNrYWJsZSBvciBub3RcbiAgICAgIGJ1dHRvbi5wcm9wKCdkaXNhYmxlZCcsIGRpc2FibGVkKTtcbiAgICAgIGlmIChkaXNhYmxlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgYnV0dG9uLnRleHQob3B0aW9ucy5idXR0b25fdGV4dCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBidXR0b24udGV4dCgnUHJvY2Vzc2luZycpO1xuICAgICAgfVxuICAgIH0sIC8vIGJ1dHRvblN0YXR1c1xuXG4gICAgc2Nyb2xsVG9Gb3JtRXJyb3I6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGZvcm0gPSAkKCAnLm0tZm9ybScgKTtcbiAgICAgIC8vIGxpc3RlbiBmb3IgYGludmFsaWRgIGV2ZW50cyBvbiBhbGwgZm9ybSBpbnB1dHNcbiAgICAgIGZvcm0uZmluZCggJzppbnB1dCcgKS5vbiggJ2ludmFsaWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyIGlucHV0ID0gJCggdGhpcyApO1xuICAgICAgICAgIC8vIHRoZSBmaXJzdCBpbnZhbGlkIGVsZW1lbnQgaW4gdGhlIGZvcm1cbiAgICAgICAgdmFyIGZpcnN0ID0gZm9ybS5maW5kKCAnLmEtZXJyb3InICkuZmlyc3QoKTtcbiAgICAgICAgLy8gdGhlIGZvcm0gaXRlbSB0aGF0IGNvbnRhaW5zIGl0XG4gICAgICAgIHZhciBmaXJzdF9ob2xkZXIgPSBmaXJzdC5wYXJlbnQoKTtcbiAgICAgICAgICAvLyBvbmx5IGhhbmRsZSBpZiB0aGlzIGlzIHRoZSBmaXJzdCBpbnZhbGlkIGlucHV0XG4gICAgICAgICAgaWYgKGlucHV0WzBdID09PSBmaXJzdFswXSkge1xuICAgICAgICAgICAgICAvLyBoZWlnaHQgb2YgdGhlIG5hdiBiYXIgcGx1cyBzb21lIHBhZGRpbmcgaWYgdGhlcmUncyBhIGZpeGVkIG5hdlxuICAgICAgICAgICAgICAvL3ZhciBuYXZiYXJIZWlnaHQgPSBuYXZiYXIuaGVpZ2h0KCkgKyA1MFxuXG4gICAgICAgICAgICAgIC8vIHRoZSBwb3NpdGlvbiB0byBzY3JvbGwgdG8gKGFjY291bnRpbmcgZm9yIHRoZSBuYXZiYXIgaWYgaXQgZXhpc3RzKVxuICAgICAgICAgICAgICB2YXIgZWxlbWVudE9mZnNldCA9IGZpcnN0X2hvbGRlci5vZmZzZXQoKS50b3A7XG5cbiAgICAgICAgICAgICAgLy8gdGhlIGN1cnJlbnQgc2Nyb2xsIHBvc2l0aW9uIChhY2NvdW50aW5nIGZvciB0aGUgbmF2YmFyKVxuICAgICAgICAgICAgICB2YXIgcGFnZU9mZnNldCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcblxuICAgICAgICAgICAgICAvLyBkb24ndCBzY3JvbGwgaWYgdGhlIGVsZW1lbnQgaXMgYWxyZWFkeSBpbiB2aWV3XG4gICAgICAgICAgICAgIGlmICggZWxlbWVudE9mZnNldCA+IHBhZ2VPZmZzZXQgJiYgZWxlbWVudE9mZnNldCA8IHBhZ2VPZmZzZXQgKyB3aW5kb3cuaW5uZXJIZWlnaHQgKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIC8vIG5vdGU6IGF2b2lkIHVzaW5nIGFuaW1hdGUsIGFzIGl0IHByZXZlbnRzIHRoZSB2YWxpZGF0aW9uIG1lc3NhZ2UgZGlzcGxheWluZyBjb3JyZWN0bHlcbiAgICAgICAgICAgICAgJCggJ2h0bWwsIGJvZHknICkuc2Nyb2xsVG9wKCBlbGVtZW50T2Zmc2V0ICk7XG4gICAgICAgICAgfVxuICAgICAgfSApO1xuICAgIH0sIC8vIHNjcm9sbFRvRm9ybUVycm9yXG5cbiAgICB2YWxpZGF0ZUFuZFN1Ym1pdDogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuXG4gICAgICB2YXIgZm9ybXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubS1mb3JtJyk7XG4gICAgICBmb3Jtcy5mb3JFYWNoKCBmdW5jdGlvbiAoIGZvcm0gKSB7XG4gICAgICAgIFZhbGlkRm9ybSggZm9ybSwge1xuICAgICAgICAgIHZhbGlkYXRpb25FcnJvclBhcmVudENsYXNzOiAnbS1oYXMtdmFsaWRhdGlvbi1lcnJvcicsXG4gICAgICAgICAgdmFsaWRhdGlvbkVycm9yQ2xhc3M6ICdhLXZhbGlkYXRpb24tZXJyb3InLFxuICAgICAgICAgIGludmFsaWRDbGFzczogJ2EtZXJyb3InLFxuICAgICAgICAgIGVycm9yUGxhY2VtZW50OiAnYWZ0ZXInXG4gICAgICAgIH0gKVxuICAgICAgfSApO1xuXG4gICAgICB0aGlzLnNjcm9sbFRvRm9ybUVycm9yKCk7XG5cbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICQob3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3Rvcikuc3VibWl0KGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgLy8gdmFsaWRhdGUgYW5kIHN1Ym1pdCB0aGUgZm9ybVxuICAgICAgICAkKCcuYS1jaGVjay1maWVsZCcpLnJlbW92ZSgpO1xuICAgICAgICAkKCdpbnB1dCwgbGFiZWwnLCBlbGVtZW50KS5yZW1vdmVDbGFzcygnYS1lcnJvcicpO1xuICAgICAgICB2YXIgdmFsaWQgPSB0cnVlO1xuICAgICAgICB2YXIgcGF5bWVudF90eXBlID0gJCgnaW5wdXRbbmFtZT1cInN0cmlwZV9wYXltZW50X3R5cGVcIl0nKS52YWwoKTtcbiAgICAgICAgJCh0aGF0Lm9wdGlvbnMuY2hvb3NlX3BheW1lbnQgKyAnIGlucHV0JykuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICQodGhhdC5vcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yICsgJyAuZXJyb3InKS5yZW1vdmUoKTsgLy8gcmVtb3ZlIG1ldGhvZCBlcnJvciBtZXNzYWdlIGlmIGl0IGlzIHRoZXJlXG4gICAgICAgICAgLy8gaWYgYSBwYXltZW50IGZpZWxkIGNoYW5nZWQsIHJlc2V0IHRoZSBidXR0b25cbiAgICAgICAgICB0aGF0LmJ1dHRvblN0YXR1cyhvcHRpb25zLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHBheW1lbnRfdHlwZSA9PT0gJ2JhbmtfYWNjb3VudCcpIHtcbiAgICAgICAgICBpZiAoJCgnaW5wdXRbbmFtZT1cImJhbmtUb2tlblwiXScpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICQodGhhdC5vcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yKS5wcmVwZW5kKCc8cCBjbGFzcz1cImVycm9yXCI+WW91IGFyZSByZXF1aXJlZCB0byBlbnRlciBjcmVkaXQgY2FyZCBpbmZvcm1hdGlvbiwgb3IgdG8gYXV0aG9yaXplIE1pbm5Qb3N0IHRvIGNoYXJnZSB5b3VyIGJhbmsgYWNjb3VudCwgdG8gbWFrZSBhIHBheW1lbnQuPC9wPicpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWxpZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIC8vIDEuIHNldCB1cCB0aGUgYnV0dG9uIGFuZCByZW1vdmUgdGhlIGhpZGRlbiBmaWVsZHMgd2UgZG9uJ3QgbmVlZFxuICAgICAgICAgIHRoYXQuYnV0dG9uU3RhdHVzKHRoYXQub3B0aW9ucywgJCh0aGF0Lm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLmZpbmQoJ2J1dHRvbicpLCB0cnVlKTtcbiAgICAgICAgICB2YXIgdG9rZW5EYXRhID0gdGhhdC5nZW5lcmF0ZVRva2VuRGF0YSgpO1xuXG4gICAgICAgICAgLy8gMi4gY3JlYXRlIG1pbm5wb3N0IGFjY291bnQgaWYgc3BlY2lmaWVkXG4gICAgICAgICAgaWYgKHRoYXQub3B0aW9ucy5jcmVhdGVfYWNjb3VudCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdmFyIHVzZXIgPSB7XG4gICAgICAgICAgICAgIGVtYWlsOiAkKHRoYXQub3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgICAgIGZpcnN0X25hbWU6ICQodGhhdC5vcHRpb25zLmZpcnN0X25hbWVfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgICAgICBsYXN0X25hbWU6ICQodGhhdC5vcHRpb25zLmxhc3RfbmFtZV9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgICAgIHBhc3N3b3JkOiAkKHRoYXQub3B0aW9ucy5wYXNzd29yZF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgICAgIGNpdHk6ICQodGhhdC5vcHRpb25zLmFjY291bnRfY2l0eV9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgICAgIHN0YXRlOiAkKHRoYXQub3B0aW9ucy5hY2NvdW50X3N0YXRlX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICAgICAgemlwOiAkKHRoYXQub3B0aW9ucy5hY2NvdW50X3ppcF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgIHVybDogdGhhdC5vcHRpb25zLm1pbm5wb3N0X3Jvb3QgKyAnL3dwLWpzb24vdXNlci1hY2NvdW50LW1hbmFnZW1lbnQvdjEvY3JlYXRlLXVzZXInLFxuICAgICAgICAgICAgICBkYXRhOiB1c2VyXG4gICAgICAgICAgICB9KS5kb25lKGZ1bmN0aW9uKCBkYXRhICkge1xuICAgICAgICAgICAgICBpZiAoZGF0YS5zdGF0dXMgPT09ICdzdWNjZXNzJyAmJiBkYXRhLnJlYXNvbiA9PT0gJ25ldyB1c2VyJykge1xuICAgICAgICAgICAgICAgIC8vIHVzZXIgY3JlYXRlZCAtIHRoZXkgc2hvdWxkIHJlY2VpdmUgZW1haWxcbiAgICAgICAgICAgICAgICAvLyBzdWJtaXQgdGhlIGZvcm1cbiAgICAgICAgICAgICAgICAvL3N1cHBvcnRmb3JtLmdldCgwKS5zdWJtaXQoKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyB1c2VyIG5vdCBjcmVhdGVkXG4gICAgICAgICAgICAgICAgLy8gc3RpbGwgc3VibWl0IHRoZSBmb3JtXG4gICAgICAgICAgICAgICAgLy9zdXBwb3J0Zm9ybS5nZXQoMCkuc3VibWl0KCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICgkKCdpbnB1dFtuYW1lPVwiYmFua1Rva2VuXCJdJykubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgIC8vIGZpbmFsbHksIHRyeSB0byBjaGFyZ2UgaXQgaWYgaXQgaXMgbm90IGFjaFxuICAgICAgICAgICAgdGhhdC5jb25maXJtQ2FyZFBheW1lbnQodGhhdC5jYXJkTnVtYmVyRWxlbWVudCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGlmIGl0IGlzIGFjaCwgd2UgYWxyZWFkeSBoYXZlIGEgdG9rZW4gc28gcGFzcyBpdCB0byBzdHJpcGUuXG4gICAgICAgICAgICB0aGF0LnN0cmlwZVRva2VuSGFuZGxlciggJCgnI2JhbmtUb2tlbicpLnZhbCgpLCAnYmFua19hY2NvdW50JyApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyB0aGlzIG1lYW5zIHZhbGlkIGlzIGZhbHNlXG4gICAgICAgICAgdGhhdC5idXR0b25TdGF0dXModGhhdC5vcHRpb25zLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICB9KTtcbiAgICB9LCAvLyB2YWxpZGF0ZUFuZFN1Ym1pdFxuXG4gICAgY29uZmlybUNhcmRQYXltZW50OiBmdW5jdGlvbihjYXJkRWxlbWVudCkge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdmFyIHN1cHBvcnRmb3JtID0gJCh0aGF0Lm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpO1xuICAgICAgdmFyIGZpZWxkO1xuICAgICAgdmFyIG1lc3NhZ2U7XG4gICAgICB2YXIgcGF5bWVudF9tZXRob2Q7XG4gICAgICBpbnRlbnQgPSB0aGF0LmdldFBheW1lbnRJbnRlbnQoKTtcbiAgICAgIHRoYXQuc3RyaXBlLmNvbmZpcm1DYXJkUGF5bWVudChcbiAgICAgICAgaW50ZW50LFxuICAgICAgICB7XG4gICAgICAgICAgcGF5bWVudF9tZXRob2Q6IHtjYXJkOiBjYXJkRWxlbWVudH1cbiAgICAgICAgfVxuICAgICAgKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICBpZiAocmVzdWx0LmVycm9yKSB7XG4gICAgICAgICAgLy8gU2hvdyB0aGUgZXJyb3JzIG9uIHRoZSBmb3JtXG4gICAgICAgICAgdGhhdC5idXR0b25TdGF0dXModGhhdC5vcHRpb25zLCBzdXBwb3J0Zm9ybS5maW5kKCdidXR0b24nKSwgZmFsc2UpO1xuICAgICAgICAgIGZpZWxkID0gcmVzdWx0LmVycm9yLmZpZWxkICsgJ19maWVsZF9zZWxlY3Rvcic7XG4gICAgICAgICAgbWVzc2FnZSA9ICcnO1xuICAgICAgICAgIGlmICh0eXBlb2YgcmVzdWx0LmVycm9yLm1lc3NhZ2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBtZXNzYWdlID0gcmVzdWx0LmVycm9yLm1lc3NhZ2U7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1lc3NhZ2UgPSByZXN1bHQuZXJyb3IubWVzc2FnZVswXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCQoZmllbGQpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICQodGhhdC5vcHRpb25zW2ZpZWxkXSwgZWxlbWVudCkuYWRkQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICAgICAkKHRoYXQub3B0aW9uc1tmaWVsZF0sIGVsZW1lbnQpLnByZXYoKS5hZGRDbGFzcygnZXJyb3InKTtcbiAgICAgICAgICAgICQodGhhdC5vcHRpb25zW2ZpZWxkXSwgZWxlbWVudCkuYWZ0ZXIoJzxzcGFuIGNsYXNzPVwiY2hlY2stZmllbGQgaW52YWxpZFwiPicgKyBtZXNzYWdlICsgJzwvc3Bhbj4nKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy90aGF0LmRlYnVnKHJlc3VsdCk7XG4gICAgICAgICAgcGF5bWVudF9tZXRob2QgPSByZXN1bHQucGF5bWVudEludGVudC5wYXltZW50X21ldGhvZDtcbiAgICAgICAgICBjb25zb2xlLmRpcihyZXN1bHQpO1xuICAgICAgICAgIC8vIFNlbmQgdGhlIHBheW1lbnQgbWV0aG9kIHRvIHRoZSBzZXJ2ZXJcbiAgICAgICAgICAvL3RoYXQuc3RyaXBlUGF5bWVudEhhbmRsZXIocGF5bWVudF9tZXRob2QpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIH0sIC8vIGNvbmZpcm1DYXJkUGF5bWVudFxuXG4gICAgc3RyaXBlRXJyb3JEaXNwbGF5OiBmdW5jdGlvbihldmVudCwgdGhpc19zZWxlY3RvciwgZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgLy8gbGlzdGVuIGZvciBlcnJvcnMgYW5kIGRpc3BsYXkvaGlkZSBlcnJvciBtZXNzYWdlc1xuICAgICAgdmFyIHdoaWNoX2Vycm9yID0gdGhpc19zZWxlY3Rvci5hdHRyKCdpZCcpO1xuICAgICAgLy8gd2hlbiB0aGlzIGZpZWxkIGNoYW5nZXMsIHJlc2V0IGl0cyBlcnJvcnNcbiAgICAgICQoJy5hLWNhcmQtaW5zdHJ1Y3Rpb24uJyArIHdoaWNoX2Vycm9yKS5yZW1vdmVDbGFzcygnYS1lcnJvcicpO1xuICAgICAgJCgnLmEtY2FyZC1pbnN0cnVjdGlvbi4nICsgd2hpY2hfZXJyb3IpLmVtcHR5KCk7XG4gICAgICBpZiAoZXZlbnQuZXJyb3IpIHtcbiAgICAgICAgJCgnLmEtY2FyZC1pbnN0cnVjdGlvbi4nICsgd2hpY2hfZXJyb3IpLnRleHQoZXZlbnQuZXJyb3IubWVzc2FnZSArICcgUGxlYXNlIHRyeSBhZ2Fpbi4nKTtcbiAgICAgICAgJCgnLmEtY2FyZC1pbnN0cnVjdGlvbi4nICsgd2hpY2hfZXJyb3IpLmFkZENsYXNzKCdhLWVycm9yJyk7XG4gICAgICAgIHRoaXNfc2VsZWN0b3IucGFyZW50KCkuYWRkQ2xhc3MoJ2EtZXJyb3InKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQoJy5hLWNhcmQtaW5zdHJ1Y3Rpb24uJyArIHdoaWNoX2Vycm9yKS5yZW1vdmVDbGFzcygnYS1lcnJvcicpO1xuICAgICAgICAkKCcuYS1jYXJkLWluc3RydWN0aW9uLicgKyB3aGljaF9lcnJvcikuZW1wdHkoKTtcbiAgICAgICAgJChvcHRpb25zLmNjX251bV9zZWxlY3RvciwgZWxlbWVudCkucmVtb3ZlQ2xhc3MoJ2EtZXJyb3InKTtcbiAgICAgICAgJChvcHRpb25zLmNjX2V4cF9zZWxlY3RvciwgZWxlbWVudCkucmVtb3ZlQ2xhc3MoJ2EtcnJvcicpO1xuICAgICAgICAkKG9wdGlvbnMuY2NfY3Z2X3NlbGVjdG9yLCBlbGVtZW50KS5yZW1vdmVDbGFzcygnYS1lcnJvcicpO1xuICAgICAgICAkKG9wdGlvbnMuY2NfbnVtX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnYS1lcnJvcicpO1xuICAgICAgICAkKG9wdGlvbnMuY2NfZXhwX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnYS1lcnJvcicpO1xuICAgICAgICAkKG9wdGlvbnMuY2NfY3Z2X3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnYS1lcnJvcicpO1xuICAgICAgfVxuICAgIH0sIC8vIHN0cmlwZUVycm9yRGlzcGxheVxuXG4gICAgZ2VuZXJhdGVUb2tlbkRhdGE6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHRva2VuRGF0YSA9IHt9O1xuICAgICAgdmFyIGZ1bGxfbmFtZSA9ICcnO1xuICAgICAgaWYgKCQoJyNmdWxsX25hbWUnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGZ1bGxfbmFtZSA9ICQoJyNmdWxsX25hbWUnKS52YWwoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZ1bGxfbmFtZSA9ICQoJyNmaXJzdF9uYW1lJykudmFsKCkgKyAnICcgKyAkKCcjbGFzdF9uYW1lJykudmFsKCk7XG4gICAgICB9XG4gICAgICB0b2tlbkRhdGEubmFtZSA9IGZ1bGxfbmFtZTtcblxuICAgICAgdmFyIHN0cmVldCA9ICdOb25lJztcbiAgICAgIGlmICgkKCdpbnB1dFtuYW1lPVwiZnVsbF9hZGRyZXNzXCJdJykudmFsKCkgIT0gJycpIHtcbiAgICAgICAgc3RyZWV0ID0gJCgnI2Z1bGxfYWRkcmVzcycpLnZhbCgpO1xuICAgICAgICBpZiAoJCgnaW5wdXRbbmFtZT1cImJpbGxpbmdfc3RyZWV0XCJdJykudmFsKCkgIT0gJycpIHtcbiAgICAgICAgICBzdHJlZXQgPSAkKCdpbnB1dFtuYW1lPVwiYmlsbGluZ19zdHJlZXRcIl0nKS52YWwoKTtcbiAgICAgICAgfVxuICAgICAgICB0b2tlbkRhdGEuYWRkcmVzc19saW5lMSA9IHN0cmVldDtcbiAgICAgIH1cblxuICAgICAgdmFyIGNpdHkgPSAnTm9uZSc7XG4gICAgICBpZiAoJCgnaW5wdXRbbmFtZT1cImJpbGxpbmdfY2l0eVwiXScpLnZhbCgpICE9ICcnKSB7XG4gICAgICAgIGNpdHkgPSAkKCdpbnB1dFtuYW1lPVwiYmlsbGluZ19jaXR5XCJdJykudmFsKCk7XG4gICAgICAgIHRva2VuRGF0YS5hZGRyZXNzX2NpdHkgPSBjaXR5O1xuICAgICAgfVxuXG4gICAgICB2YXIgc3RhdGUgPSAnTm9uZSc7XG4gICAgICBpZiAoJCgnaW5wdXRbbmFtZT1cImJpbGxpbmdfc3RhdGVcIl0nKS52YWwoKSAhPSAnJykge1xuICAgICAgICBzdGF0ZSA9ICQoJ2lucHV0W25hbWU9XCJiaWxsaW5nX3N0YXRlXCJdJykudmFsKCk7XG4gICAgICAgIHRva2VuRGF0YS5hZGRyZXNzX3N0YXRlID0gc3RhdGU7XG4gICAgICB9XG5cbiAgICAgIHZhciB6aXAgPSAnTm9uZSc7XG4gICAgICBpZiAoJCgnaW5wdXRbbmFtZT1cImJpbGxpbmdfemlwXCJdJykudmFsKCkgIT0gJycpIHtcbiAgICAgICAgemlwID0gJCgnaW5wdXRbbmFtZT1cImJpbGxpbmdfemlwXCJdJykudmFsKCk7XG4gICAgICAgIHRva2VuRGF0YS5hZGRyZXNzX3ppcCA9IHppcDtcbiAgICAgIH1cblxuICAgICAgdmFyIGNvdW50cnkgPSAnVVMnO1xuICAgICAgaWYgKCQoJ2lucHV0W25hbWU9XCJiaWxsaW5nX2NvdW50cnlcIl0nKS52YWwoKSAhPSAnJykge1xuICAgICAgICBjb3VudHJ5ID0gJCgnaW5wdXRbbmFtZT1cImJpbGxpbmdfY291bnRyeVwiXScpLnZhbCgpO1xuICAgICAgfVxuICAgICAgdG9rZW5EYXRhLmFkZHJlc3NfY291bnRyeSA9IGNvdW50cnk7XG5cbiAgICAgIHJldHVybiB0b2tlbkRhdGE7XG4gICAgfSwgLy8gZ2VuZXJhdGVUb2tlbkRhdGFcblxuICAgIGNyZWF0ZVRva2VuOiBmdW5jdGlvbihjYXJkLCB0b2tlbkRhdGEpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHRoYXQuc3RyaXBlLmNyZWF0ZVRva2VuKGNhcmQsIHRva2VuRGF0YSkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgaWYgKHJlc3VsdC5lcnJvcikge1xuICAgICAgICAgIC8vIFNob3cgdGhlIGVycm9ycyBvbiB0aGUgZm9ybVxuICAgICAgICAgIHRoYXQuYnV0dG9uU3RhdHVzKHRoYXQub3B0aW9ucywgJCh0aGF0Lm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLmZpbmQoJ2J1dHRvbicpLCBmYWxzZSk7XG4gICAgICAgICAgdmFyIGZpZWxkID0gcmVzdWx0LmVycm9yLmZpZWxkICsgJ19maWVsZF9zZWxlY3Rvcic7XG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSAnJztcbiAgICAgICAgICBpZiAodHlwZW9mIHJlc3VsdC5lcnJvci5tZXNzYWdlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgbWVzc2FnZSA9IHJlc3VsdC5lcnJvci5tZXNzYWdlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtZXNzYWdlID0gcmVzdWx0LmVycm9yLm1lc3NhZ2VbMF07XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICgkKGZpZWxkKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAkKHRoYXQub3B0aW9uc1tmaWVsZF0sIGVsZW1lbnQpLmFkZENsYXNzKCdhLWVycm9yJyk7XG4gICAgICAgICAgICAkKHRoYXQub3B0aW9uc1tmaWVsZF0sIGVsZW1lbnQpLnByZXYoKS5hZGRDbGFzcygnYS1lcnJvcicpO1xuICAgICAgICAgICAgJCh0aGF0Lm9wdGlvbnNbZmllbGRdLCBlbGVtZW50KS5hZnRlcignPHNwYW4gY2xhc3M9XCJhLWNoZWNrLWZpZWxkIGludmFsaWRcIj4nICsgbWVzc2FnZSArICc8L3NwYW4+Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFNlbmQgdGhlIHRva2VuIHRvIHlvdXIgc2VydmVyXG4gICAgICAgICAgdGhhdC5zdHJpcGVUb2tlbkhhbmRsZXIocmVzdWx0LnRva2VuLCAnY2FyZCcpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LCAvLyBjcmVhdGVUb2tlblxuXG4gICAgc3RyaXBlUGF5bWVudEhhbmRsZXI6IGZ1bmN0aW9uKHBheW1lbnRfbWV0aG9kLCB0eXBlKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB2YXIgc3VwcG9ydGZvcm0gPSAkKHRoaXMub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3Rvcik7XG4gICAgICB2YXIgYWpheF91cmwgPSAnJztcbiAgICAgIHZhciB0b2tlbkZpZWxkTmFtZSA9ICdzdHJpcGVUb2tlbic7XG4gICAgICB2YXIgdG9rZW5GaWVsZCA9ICdpbnB1dFtuYW1lPVwiJyArIHRva2VuRmllbGROYW1lICsgJ1wiXSc7XG4gICAgICBpZiAodHlwZW9mICQoc3VwcG9ydGZvcm0pLmRhdGEoJ2FjdGlvbicpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBhamF4X3VybCA9ICQoc3VwcG9ydGZvcm0pLmRhdGEoJ2FjdGlvbicpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWpheF91cmwgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG4gICAgICB9XG4gICAgICAvLyBJbnNlcnQgdGhlIHBheW1lbnQgbWV0aG9kIElEIGludG8gdGhlIGZvcm0gc28gaXQgZ2V0cyBzdWJtaXR0ZWQgdG8gdGhlIHNlcnZlclxuICAgICAgaWYgKCB0eXBlID09PSAnY2FyZCcgKSB7XG4gICAgICAgIGlmICh0b2tlbi5jYXJkLmJyYW5kLmxlbmd0aCA+IDAgJiYgdG9rZW4uY2FyZC5icmFuZCA9PT0gJ0FtZXJpY2FuIEV4cHJlc3MnKSB7XG4gICAgICAgICAgdHlwZSA9ICdhbWV4JztcbiAgICAgICAgfVxuICAgICAgICBpZiAoJCh0b2tlbkZpZWxkKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgJCh0b2tlbkZpZWxkKS52YWwodG9rZW4uaWQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN1cHBvcnRmb3JtLmFwcGVuZCgkKCc8aW5wdXQgdHlwZT1cXFwiaGlkZGVuXFxcIiBuYW1lPVwiJyArIHRva2VuRmllbGROYW1lICsgJ1wiPicpLnZhbCh0b2tlbi5pZCkpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgICQoJ2lucHV0W25hbWU9XCJzdHJpcGVfcGF5bWVudF90eXBlXCJdJykudmFsKHR5cGUpO1xuXG4gICAgICAvLyBTdWJtaXQgdGhlIGZvcm1cbiAgICAgIC8vIHRoZSB3YXkgaXQgd29ya3MgY3VycmVudGx5IGlzIHRoZSBmb3JtIHN1Ym1pdHMgYW4gYWpheCByZXF1ZXN0IHRvIGl0c2VsZlxuICAgICAgLy8gdGhlbiBpdCBzdWJtaXRzIGEgcG9zdCByZXF1ZXN0IHRvIHRoZSBmb3JtJ3MgYWN0aW9uIHVybFxuICAgICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBhamF4X3VybCxcbiAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICBkYXRhOiAkKHN1cHBvcnRmb3JtKS5zZXJpYWxpemUoKSxcbiAgICAgICAgdHlwZTogJ1BPU1QnXG4gICAgICB9KVxuICAgICAgLmRvbmUoZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKHR5cGVvZiByZXNwb25zZS5lcnJvcnMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgLy8gZG8gbm90IHN1Ym1pdC4gdGhlcmUgaXMgYW4gZXJyb3IuXG4gICAgICAgICAgdGhhdC5idXR0b25TdGF0dXModGhhdC5vcHRpb25zLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIGZhbHNlKTtcbiAgICAgICAgICAvLyBhZGQgc29tZSBlcnJvciBtZXNzYWdlcyBhbmQgc3R5bGVzXG4gICAgICAgICAgJC5lYWNoKHJlc3BvbnNlLmVycm9ycywgZnVuY3Rpb24oIGluZGV4LCBlcnJvciApIHtcbiAgICAgICAgICAgIHZhciBmaWVsZCA9IGVycm9yLmZpZWxkICsgJ19maWVsZF9zZWxlY3Rvcic7XG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9ICcnO1xuICAgICAgICAgICAgdmFyIHN0cmlwZUVycm9yU2VsZWN0b3IgPSAnJztcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZXJyb3IubWVzc2FnZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgbWVzc2FnZSA9IGVycm9yLm1lc3NhZ2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBtZXNzYWdlID0gZXJyb3IubWVzc2FnZVswXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgkKHRoYXQub3B0aW9uc1tmaWVsZF0pLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgJCh0aGF0Lm9wdGlvbnNbZmllbGRdKS5hZGRDbGFzcygnYS1lcnJvcicpO1xuICAgICAgICAgICAgICAkKHRoYXQub3B0aW9uc1tmaWVsZF0pLnByZXYoKS5hZGRDbGFzcygnYS1lcnJvcicpO1xuICAgICAgICAgICAgICAkKHRoYXQub3B0aW9uc1tmaWVsZF0pLmFmdGVyKCc8c3BhbiBjbGFzcz1cImEtY2hlY2stZmllbGQgaW52YWxpZFwiPicgKyBtZXNzYWdlICsgJzwvc3Bhbj4nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBlcnJvciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgdGhhdC5idXR0b25TdGF0dXModGhhdC5vcHRpb25zLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIGZhbHNlLCAnY2FyZCcpO1xuICAgICAgICAgICAgICBpZiAoZXJyb3IuY29kZSA9PSAnaW52YWxpZF9udW1iZXInIHx8IGVycm9yLmNvZGUgPT0gJ2luY29ycmVjdF9udW1iZXInIHx8IGVycm9yLmNvZGUgPT0gJ2NhcmRfZGVjbGluZWQnIHx8IGVycm9yLmNvZGUgPT0gJ3Byb2Nlc3NpbmdfZXJyb3InKSB7XG4gICAgICAgICAgICAgICAgLy8gZXJyb3IgaGFuZGxpbmdcbiAgICAgICAgICAgICAgICBzdHJpcGVFcnJvclNlbGVjdG9yID0gJCh0aGF0Lm9wdGlvbnMuY2NfbnVtX3NlbGVjdG9yKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmIChlcnJvci5jb2RlID09ICdpbnZhbGlkX2V4cGlyeV9tb250aCcgfHwgZXJyb3IuY29kZSA9PSAnaW52YWxpZF9leHBpcnlfeWVhcicgfHwgZXJyb3IuY29kZSA9PSAnZXhwaXJlZF9jYXJkJykge1xuICAgICAgICAgICAgICAgIC8vIGVycm9yIGhhbmRsaW5nXG4gICAgICAgICAgICAgICAgc3RyaXBlRXJyb3JTZWxlY3RvciA9ICQodGhhdC5vcHRpb25zLmNjX2V4cF9zZWxlY3Rvcik7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAoZXJyb3IuY29kZSA9PSAnaW52YWxpZF9jdmMnIHx8IGVycm9yLmNvZGUgPT0gJ2luY29ycmVjdF9jdmMnKSB7XG4gICAgICAgICAgICAgICAgLy8gZXJyb3IgaGFuZGxpbmdcbiAgICAgICAgICAgICAgICBzdHJpcGVFcnJvclNlbGVjdG9yID0gJCh0aGF0Lm9wdGlvbnMuY2NfY3Z2X3NlbGVjdG9yKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmIChzdHJpcGVFcnJvclNlbGVjdG9yICE9PSAnJykge1xuICAgICAgICAgICAgICAgIHRoYXQuc3RyaXBlRXJyb3JEaXNwbGF5KHJlc3BvbnNlLmVycm9ycywgc3RyaXBlRXJyb3JTZWxlY3RvciwgdGhhdC5lbGVtZW50LCB0aGF0Lm9wdGlvbnMgKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmIChlcnJvci5maWVsZCA9PSAncmVjYXB0Y2hhJykge1xuICAgICAgICAgICAgICAgICQodGhhdC5vcHRpb25zLnBheV9idXR0b25fc2VsZWN0b3IpLmJlZm9yZSgnPHAgY2xhc3M9XCJhLWZvcm0tY2FwdGlvbiBhLXJlY2FwdGNoYS1lcnJvclwiPicgKyBtZXNzYWdlICsgJzwvcD4nKVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKGVycm9yLnR5cGUgPT0gJ2ludmFsaWRfcmVxdWVzdF9lcnJvcicpIHtcbiAgICAgICAgICAgICAgICAkKHRoYXQub3B0aW9ucy5wYXlfYnV0dG9uX3NlbGVjdG9yKS5iZWZvcmUoJzxwIGNsYXNzPVwiZXJyb3IgZXJyb3ItaW52YWxpZC1yZXF1ZXN0XCI+JyArIGVycm9yLm1lc3NhZ2UgKyAnPC9wPicpXG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHJlc3BvbnNlLmVycm9yc1swXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgdmFyIGZpZWxkID0gcmVzcG9uc2UuZXJyb3JzWzBdLmZpZWxkICsgJ19maWVsZF9zZWxlY3Rvcic7XG4gICAgICAgICAgICAgIGlmICgkKGZpZWxkKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAkKG9wdGlvbnNbZmllbGRdKS5wYXJlbnQoKS5vZmZzZXQoKS50b3BcbiAgICAgICAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN1cHBvcnRmb3JtLmdldCgwKS5zdWJtaXQoKTsgLy8gY29udGludWUgc3VibWl0dGluZyB0aGUgZm9ybSBpZiB0aGUgYWpheCB3YXMgc3VjY2Vzc2Z1bFxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLmVycm9yKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgIHRoYXQuYnV0dG9uU3RhdHVzKHRoYXQub3B0aW9ucywgJCh0aGF0Lm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLmZpbmQoJ2J1dHRvbicpLCBmYWxzZSk7XG4gICAgICB9KTtcblxuICAgIH0sXG5cbiAgICBzaG93TmV3c2xldHRlclNldHRpbmdzOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG5cbiAgICAgIHZhciBuZXdzbGV0dGVyX2dyb3VwX2h0bWwgPSAnJztcbiAgICAgIGlmICgkKG9wdGlvbnMubmV3c2xldHRlcl9ncm91cF9zZWxlY3RvcikubGVuZ3RoID4gMCApIHtcbiAgICAgICAgdmFyIGdldF9kYXRhID0ge1xuICAgICAgICAgIHNob3J0Y29kZTogJ25ld3NsZXR0ZXJfZm9ybScsXG4gICAgICAgICAgcGxhY2VtZW50OiAndXNlcmFjY291bnQnXG4gICAgICAgIH07XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICB1cmw6IG9wdGlvbnMubWlubnBvc3Rfcm9vdCArICcvd3AtanNvbi9taW5ucG9zdC1hcGkvdjIvbWFpbGNoaW1wL2Zvcm0nLFxuICAgICAgICAgIGRhdGE6IGdldF9kYXRhXG4gICAgICAgIH0pLmRvbmUoZnVuY3Rpb24oIHJlc3VsdCApIHtcbiAgICAgICAgICBpZiAoIHR5cGVvZiByZXN1bHQuZ3JvdXBfZmllbGRzICE9PSAndW5kZWZpbmVkJyApIHtcbiAgICAgICAgICAgICQuZWFjaChyZXN1bHQuZ3JvdXBfZmllbGRzLCBmdW5jdGlvbiggaW5kZXgsIGNhdGVnb3J5ICkge1xuICAgICAgICAgICAgICBuZXdzbGV0dGVyX2dyb3VwX2h0bWwgKz0gJzxmaWVsZHNldCBjbGFzcz1cIm0tZm9ybS1pdGVtIHN1cHBvcnQtbmV3c2xldHRlciBtLWZvcm0taXRlbS0nICsgY2F0ZWdvcnkudHlwZSArICdcIj4nO1xuICAgICAgICAgICAgICBuZXdzbGV0dGVyX2dyb3VwX2h0bWwgKz0gJzxsYWJlbD4nICsgY2F0ZWdvcnkubmFtZSArICc6PC9sYWJlbD4nO1xuICAgICAgICAgICAgICBpZiAoIGNhdGVnb3J5LmNvbnRhaW5zLmxlbmd0aCA+IDAgKSB7XG4gICAgICAgICAgICAgICAgbmV3c2xldHRlcl9ncm91cF9odG1sICs9ICc8ZGl2IGNsYXNzPVwibS1mb3JtLWl0ZW0gbS1mb3JtLWl0ZW0tbmV3c2xldHRlclwiPic7XG4gICAgICAgICAgICAgICAgJC5lYWNoKGNhdGVnb3J5W2NhdGVnb3J5LmNvbnRhaW5zXSwgZnVuY3Rpb24oIGluZGV4LCBpdGVtICkge1xuICAgICAgICAgICAgICAgICAgbmV3c2xldHRlcl9ncm91cF9odG1sICs9ICc8bGFiZWw+PGlucHV0IG5hbWU9XCJncm91cHNfc3VibWl0dGVkXCIgdHlwZT1cImNoZWNrYm94XCIgdmFsdWU9XCInICsgaXRlbS5pZCArICdcIj4nICsgaXRlbS5uYW1lICsgJzwvbGFiZWw+JztcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBuZXdzbGV0dGVyX2dyb3VwX2h0bWwgKz0gJzwvZGl2Pic7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgbmV3c2xldHRlcl9ncm91cF9odG1sICs9ICc8L2ZpZWxkc2V0Pic7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICQob3B0aW9ucy5uZXdzbGV0dGVyX2dyb3VwX3NlbGVjdG9yKS5odG1sKG5ld3NsZXR0ZXJfZ3JvdXBfaHRtbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKCQob3B0aW9ucy5uZXdzbGV0dGVyX2dyb3VwX3NlbGVjdG9yKS5sZW5ndGggPiAwICYmIHR5cGVvZiAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB2YXIgZ2V0X2RhdGEgPSB7XG4gICAgICAgICAgZW1haWw6ICQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKClcbiAgICAgICAgfTtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgIHVybDogb3B0aW9ucy5taW5ucG9zdF9yb290ICsgJy93cC1qc29uL21pbm5wb3N0LWFwaS92Mi9tYWlsY2hpbXAvdXNlcicsXG4gICAgICAgICAgZGF0YTogZ2V0X2RhdGFcbiAgICAgICAgfSkuZG9uZShmdW5jdGlvbiggcmVzdWx0ICkge1xuICAgICAgICAgIGlmICggdHlwZW9mIHJlc3VsdC5tYWlsY2hpbXBfc3RhdHVzICE9PSAndW5kZWZpbmVkJyApIHtcbiAgICAgICAgICAgICQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkuYWZ0ZXIoJzxpbnB1dCBuYW1lPVwibWFpbGNoaW1wX3N0YXR1c1wiIHR5cGU9XCJoaWRkZW5cIiB2YWx1ZT1cIicgKyByZXN1bHQubWFpbGNoaW1wX3N0YXR1cyArICdcIj4nKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCB0eXBlb2YgcmVzdWx0Lm1haWxjaGltcF91c2VyX2lkICE9PSAndW5kZWZpbmVkJyApIHtcbiAgICAgICAgICAgICQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkuYWZ0ZXIoJzxpbnB1dCBuYW1lPVwibWFpbGNoaW1wX3VzZXJfaWRcIiB0eXBlPVwiaGlkZGVuXCIgdmFsdWU9XCInICsgcmVzdWx0Lm1haWxjaGltcF91c2VyX2lkICsgJ1wiPicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAocmVzdWx0Lm1haWxjaGltcF9zdGF0dXMgPT09ICdzdWJzY3JpYmVkJykge1xuICAgICAgICAgICAgLy8gdXNlciBjcmVhdGVkIC0gc2hvdyBhIHN1Y2Nlc3MgbWVzc2FnZVxuICAgICAgICAgICAgJCgnLmEtY29uZmlybS1pbnN0cnVjdGlvbnMnKS50ZXh0KCQoJy5hLWNvbmZpcm0taW5zdHJ1Y3Rpb25zJykuYXR0cignZGF0YS1rbm93bi11c2VyJykpO1xuICAgICAgICAgICAgdmFyIGdyb3VwcyA9IHJlc3VsdC5ncm91cHM7XG4gICAgICAgICAgICAkLmVhY2goZ3JvdXBzLCBmdW5jdGlvbiggaW5kZXgsIHZhbHVlICkge1xuICAgICAgICAgICAgICBpZiAoIHZhbHVlID09PSB0cnVlICkge1xuICAgICAgICAgICAgICAgICQoJzpjaGVja2JveFt2YWx1ZT1cIicgKyBpbmRleCArICdcIl0nKS5wcm9wKCdjaGVja2VkJyx0cnVlKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKCc6Y2hlY2tib3hbdmFsdWU9XCInICsgaW5kZXggKyAnXCJdJykucHJvcCgnY2hlY2tlZCcsZmFsc2UpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgfSwgLy8gc2hvd05ld3NsZXR0ZXJTZXR0aW5nc1xuXG4gICAgY29uZmlybU1lc3NhZ2VTdWJtaXQ6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcblxuICAgICAgdmFyIGV4aXN0aW5nX25ld3NsZXR0ZXJfc2V0dGluZ3MgPSAkKG9wdGlvbnMubmV3c2xldHRlcl9ncm91cF9zZWxlY3RvciArICcgaW5wdXQnKS5zZXJpYWxpemUoKTtcbiAgICAgIC8vdGhpcy5kZWJ1ZyhleGlzdGluZ19uZXdzbGV0dGVyX3NldHRpbmdzKTtcblxuICAgICAgJChvcHRpb25zLmNvbmZpcm1fZm9ybV9zZWxlY3Rvcikuc3VibWl0KGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgdmFyIGNvbmZpcm1mb3JtID0gJChvcHRpb25zLmNvbmZpcm1fZm9ybV9zZWxlY3Rvcik7XG4gICAgICAgIC8vIHN1Ym1pdCBzZXR0aW5ncyB0byBtYWlsY2hpbXBcbiAgICAgICAgLy8gbmVlZCB0byBnZXQgdXNlciBpbmZvIG9uIGEgaGlkZGVuIGZpZWxkIGhlcmVcblxuICAgICAgICB2YXIgbmV3c2xldHRlcl9ncm91cHMgPSAkKG9wdGlvbnMubmV3c2xldHRlcl9ncm91cF9zZWxlY3RvciArICcgaW5wdXQ6Y2hlY2tlZCcpO1xuICAgICAgICB2YXIgbmV3X25ld3NsZXR0ZXJfc2V0dGluZ3MgPSBuZXdzbGV0dGVyX2dyb3Vwcy5zZXJpYWxpemUoKTtcblxuICAgICAgICBpZiAoKGV4aXN0aW5nX25ld3NsZXR0ZXJfc2V0dGluZ3MgIT09IG5ld19uZXdzbGV0dGVyX3NldHRpbmdzKSAmJiAodHlwZW9mIG5ld3NsZXR0ZXJfZ3JvdXBzICE9PSAndW5kZWZpbmVkJykpIHtcbiAgICAgICAgICAvL2FkZCBvdXIgb3duIGFqYXggY2hlY2sgYXMgWC1SZXF1ZXN0ZWQtV2l0aCBpcyBub3QgYWx3YXlzIHJlbGlhYmxlXG4gICAgICAgICAgLy9hamF4X2Zvcm1fZGF0YSA9IG5ld19uZXdzbGV0dGVyX3NldHRpbmdzICsgJyZhamF4cmVxdWVzdD10cnVlJnN1YnNjcmliZSc7XG5cbiAgICAgICAgICB2YXIgcG9zdF9kYXRhID0ge1xuICAgICAgICAgICAgZW1haWw6ICQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgICBmaXJzdF9uYW1lOiAkKG9wdGlvbnMuZmlyc3RfbmFtZV9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgICBsYXN0X25hbWU6ICQob3B0aW9ucy5sYXN0X25hbWVfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgICAgZ3JvdXBzX3N1Ym1pdHRlZDoge31cbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgcG9zdF9kYXRhLmdyb3Vwc19hdmFpbGFibGUgPSAnYWxsJztcblxuICAgICAgICAgIGlmICggJCgnaW5wdXRbbmFtZT1cIm1haWxjaGltcF9zdGF0dXNcIl0nKS5sZW5ndGggPiAwICkge1xuICAgICAgICAgICAgcG9zdF9kYXRhLm1haWxjaGltcF9zdGF0dXMgPSAkKCdpbnB1dFtuYW1lPVwibWFpbGNoaW1wX3N0YXR1c1wiXScpLnZhbCgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICggJCgnaW5wdXRbbmFtZT1cIm1haWxjaGltcF91c2VyX2lkXCJdJykubGVuZ3RoID4gMCApIHtcbiAgICAgICAgICAgIHBvc3RfZGF0YS5tYWlsY2hpbXBfdXNlcl9pZCA9ICQoJ2lucHV0W25hbWU9XCJtYWlsY2hpbXBfdXNlcl9pZFwiXScpLnZhbCgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0eXBlb2YgbmV3c2xldHRlcl9ncm91cHMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAkLmVhY2gobmV3c2xldHRlcl9ncm91cHMsIGZ1bmN0aW9uKGluZGV4LCB2YWx1ZSkge1xuICAgICAgICAgICAgICB2YXIgZ3JvdXAgPSAkKHRoaXMpLnZhbCgpO1xuICAgICAgICAgICAgICBwb3N0X2RhdGEuZ3JvdXBzX3N1Ym1pdHRlZFtpbmRleF0gPSBncm91cDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IG9wdGlvbnMubWlubnBvc3Rfcm9vdCArICcvd3AtanNvbi9taW5ucG9zdC1hcGkvdjIvbWFpbGNoaW1wL3VzZXInLFxuICAgICAgICAgICAgdHlwZTogJ3Bvc3QnLFxuICAgICAgICAgICAgZGF0YVR5cGUgOiAnanNvbicsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkocG9zdF9kYXRhKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmRvbmUoZnVuY3Rpb24ocmVzcG9uc2UpIHsgLy8gcmVzcG9uc2UgZnJvbSB0aGUgUEhQIGFjdGlvblxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSAnJztcbiAgICAgICAgICAgIGlmICggcmVzcG9uc2Uuc3VjY2VzcyA9PT0gdHJ1ZSApIHtcbiAgICAgICAgICAgICAgLypzd2l0Y2ggKHJlc3BvbnNlLmRhdGEudXNlcl9zdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdleGlzdGluZyc6XG4gICAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ1RoYW5rcyBmb3IgdXBkYXRpbmcgeW91ciBlbWFpbCBwcmVmZXJlbmNlcy4gVGhleSB3aWxsIGdvIGludG8gZWZmZWN0IGltbWVkaWF0ZWx5Lic7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICduZXcnOlxuICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9ICdXZSBoYXZlIGFkZGVkIHlvdSB0byB0aGUgTWlublBvc3QgbWFpbGluZyBsaXN0Lic7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdwZW5kaW5nJzpcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnV2UgaGF2ZSBhZGRlZCB5b3UgdG8gdGhlIE1pbm5Qb3N0IG1haWxpbmcgbGlzdC4gWW91IHdpbGwgbmVlZCB0byBjbGljayB0aGUgY29uZmlybWF0aW9uIGxpbmsgaW4gdGhlIGVtYWlsIHdlIHNlbnQgdG8gYmVnaW4gcmVjZWl2aW5nIG1lc3NhZ2VzLic7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfSovXG4gICAgICAgICAgICAgIC8vY29uZmlybWZvcm0uZ2V0KDApLnN1Ym1pdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uZmlybWZvcm0uZ2V0KDApLnN1Ym1pdCgpO1xuICAgICAgICAgICAgLy8kKCcubS1ob2xkLW1lc3NhZ2UnKS5odG1sKCc8ZGl2IGNsYXNzPVwibS1mb3JtLW1lc3NhZ2UgbS1mb3JtLW1lc3NhZ2UtaW5mb1wiPicgKyBtZXNzYWdlICsgJzwvZGl2PicpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmZhaWwoZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIC8vIHdlIHNob3VsZCBwdXQgYW4gYWN0dWFsIGVycm9yIG1lc3NhZ2UgaGVyZSBzb21lZGF5LCBwcm9iYWJseVxuICAgICAgICAgICAgLy8kKCcubS1ob2xkLW1lc3NhZ2UnKS5odG1sKCc8ZGl2IGNsYXNzPVwibS1mb3JtLW1lc3NhZ2UgbS1mb3JtLW1lc3NhZ2UtaW5mb1wiPkFuIGVycm9yIGhhcyBvY2N1cmVkLiBQbGVhc2UgdHJ5IGFnYWluLjwvZGl2PicpO1xuICAgICAgICAgICAgY29uZmlybWZvcm0uZ2V0KDApLnN1Ym1pdCgpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0gZWxzZSB7IC8vIGVuZCBwYXJ0IHdoZXJlIHNldHRpbmdzIGNoYW5nZWRcbiAgICAgICAgICBjb25maXJtZm9ybS5nZXQoMCkuc3VibWl0KCk7XG4gICAgICAgIH1cblxuICAgICAgfSk7XG4gICAgICAvL3JldHVybiBmYWxzZTtcbiAgICB9LCAvLyBjb25maXJtTWVzc2FnZVN1Ym1pdFxuXG4gIH07IC8vIHBsdWdpbi5wcm90b3R5cGVcblxuICAvLyBBIHJlYWxseSBsaWdodHdlaWdodCBwbHVnaW4gd3JhcHBlciBhcm91bmQgdGhlIGNvbnN0cnVjdG9yLFxuICAvLyBwcmV2ZW50aW5nIGFnYWluc3QgbXVsdGlwbGUgaW5zdGFudGlhdGlvbnNcbiAgJC5mbltwbHVnaW5OYW1lXSA9IGZ1bmN0aW9uICggb3B0aW9ucyApIHtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICghJC5kYXRhKHRoaXMsICdwbHVnaW5fJyArIHBsdWdpbk5hbWUpKSB7XG4gICAgICAgICQuZGF0YSh0aGlzLCAncGx1Z2luXycgKyBwbHVnaW5OYW1lLCBuZXcgUGx1Z2luKCB0aGlzLCBvcHRpb25zICkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG59KSggalF1ZXJ5LCB3aW5kb3csIGRvY3VtZW50ICk7Il19
