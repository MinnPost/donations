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
    'progress_selector': '.m-support-progress',
    'donate_form_selector': '#donate',
    'confirm_form_selector': '#confirm',
    'finish_section_selector': '#panel--confirmation',
    'pay_cc_processing_selector': 'input[id="pay-fees"]',
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

        this.choosePaymentMethod(this.element, this.options); // switch between card and ach

        this.creditCardFields(this.element, this.options); // do stuff with the credit card fields

        this.achFields(this.element, this.options); // do stuff for ach payments, if applicable to the form

        this.validateAndSubmit(this.element, this.options); // validate and submit the form
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

        $('.a-validation-error').remove();
        $('input, label', element).removeClass('a-error');
        $(that.options.payment_method_selector, that.element).removeClass('a-error invalid');
        $('.a-validation-error').remove();
        var valid = true;
        var payment_type = $('input[name="stripe_payment_type"]').val();
        $(that.options.choose_payment + ' input').change(function () {
          $(that.options.payment_method_selector + ' .a-error').remove(); // remove method error message if it is there

          $(that.options.payment_method_selector).parent().find('.a-validation-error').remove(); // if a payment field changed, reset the button

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
          var billingDetails = that.generateBillingDetails(); // 2. create minnpost account if specified

          if (that.options.create_account === true) {
            var user = {
              email: $(that.options.email_field_selector, element).val(),
              first_name: $(that.options.first_name_field_selector, element).val(),
              last_name: $(that.options.last_name_field_selector, element).val(),
              password: $(that.options.password_field_selector, element).val(),
              city: $(that.options.billing_city_field_selector, element).val(),
              state: $(that.options.billing_state_field_selector, element).val(),
              zip: $(that.options.billing_zip_field_selector, element).val()
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
            // finally, get a payment method from stripe, and try to charge it if it is not ach
            that.createPaymentMethod(that.cardNumberElement, billingDetails);
          } else {
            console.log('we have a bank token. the value is ' + $('#bankToken').val()); // if it is ach, we already have a token so submit the form
            // todo: see if we can delete the token from this call

            that.bankTokenHandler($('#bankToken').val(), 'bank_account');
          }
        } else {
          // this means valid is false
          that.buttonStatus(that.options, $(that.options.donate_form_selector).find('button'), false);
        }
      });
    },
    // validateAndSubmit
    stripeErrorDisplay: function stripeErrorDisplay(error, this_selector, element, options) {
      // listen for errors and display/hide error messages
      var which_error = this_selector.attr('id'); // when this field changes, reset its errors

      $('.a-card-instruction.' + which_error).removeClass('a-validation-error');
      $('.a-card-instruction.' + which_error).empty();
      $(this_selector).removeClass('a-error');

      if (error) {
        $('.a-card-instruction.' + which_error).text(error.message + ' Please try again.');
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
      var that = this;
      var supportform = $(this.options.donate_form_selector);
      var ajax_url = window.location.pathname;
      that.setStripePaymentType(type); // Submit the form
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
      var field = ''; // do not submit. there is an error.

      that.buttonStatus(that.options, $(that.options.donate_form_selector).find('button'), false); // handle error display

      if (typeof response.errors !== 'undefined') {
        if (typeof response.errors[0] !== 'undefined') {
          field = response.errors[0].field + '_field_selector';
        }

        $.each(response.errors, function (index, error) {
          this_field = error.field + '_field_selector';
          that.displayErrorMessage(error, this_field);
        });
      }

      if ($(that.options[field]).length > 0) {
        $('html, body').animate({
          scrollTop: $(that.options[field]).parent().offset().top
        }, 2000);
      }
    },
    // handleServerError
    displayErrorMessage: function displayErrorMessage(error, field) {
      var message = '';
      var stripeErrorSelector = '';

      if (typeof error.message === 'string') {
        message = error.message;
      } else {
        message = error.message[0];
      }

      if ($(this.options[field]).length > 0) {
        $(this.options[field]).addClass('a-error');
        $(this.options[field]).prev().addClass('a-error');
        $(this.options[field]).after('<span class="a-validation-error invalid">' + message + '</span>');
      }

      if (typeof error !== 'undefined') {
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
          $(this.options.pay_button_selector).before('<p class="a-form-caption a-recaptcha-error">' + message + '</p>');
        }

        if (error.type == 'invalid_request_error') {
          $(this.options.pay_button_selector).before('<p class="error error-invalid-request">' + error.message + '</p>');
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0cmlwZS5wYXltZW50LmpzIiwidmFsaWQtZm9ybS5taW4uanMiLCJtaW5ucG9zdC5naXZpbmcuanMiXSwibmFtZXMiOlsiZiIsImV4cG9ydHMiLCJtb2R1bGUiLCJkZWZpbmUiLCJhbWQiLCJnIiwid2luZG93IiwiZ2xvYmFsIiwic2VsZiIsInBheW1lbnQiLCJqcyIsImUiLCJ0IiwibiIsInIiLCJzIiwibyIsInUiLCJhIiwicmVxdWlyZSIsImkiLCJFcnJvciIsImNvZGUiLCJsIiwiY2FsbCIsImxlbmd0aCIsIlFKIiwicnJldHVybiIsInJ0cmltIiwic2VsZWN0b3IiLCJpc0RPTUVsZW1lbnQiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJlbCIsIm5vZGVOYW1lIiwidHJpbSIsInRleHQiLCJyZXBsYWNlIiwidmFsIiwicmV0IiwiYXJndW1lbnRzIiwidmFsdWUiLCJwcmV2ZW50RGVmYXVsdCIsImV2ZW50T2JqZWN0IiwicmV0dXJuVmFsdWUiLCJub3JtYWxpemVFdmVudCIsIm9yaWdpbmFsIiwid2hpY2giLCJ0YXJnZXQiLCJzcmNFbGVtZW50Iiwib3JpZ2luYWxFdmVudCIsImRhdGEiLCJkZXRhaWwiLCJjaGFyQ29kZSIsImtleUNvZGUiLCJvbiIsImVsZW1lbnQiLCJldmVudE5hbWUiLCJjYWxsYmFjayIsImoiLCJsZW4iLCJsZW4xIiwibXVsdEV2ZW50TmFtZSIsIm9yaWdpbmFsQ2FsbGJhY2siLCJyZWYiLCJtYXRjaCIsInNwbGl0IiwiYWRkRXZlbnRMaXN0ZW5lciIsImF0dGFjaEV2ZW50IiwiYWRkQ2xhc3MiLCJjbGFzc05hbWUiLCJyZXN1bHRzIiwicHVzaCIsImNsYXNzTGlzdCIsImFkZCIsImhhc0NsYXNzIiwiY29udGFpbnMiLCJSZWdFeHAiLCJ0ZXN0IiwicmVtb3ZlQ2xhc3MiLCJjbHMiLCJyZW1vdmUiLCJqb2luIiwidG9nZ2xlQ2xhc3MiLCJib29sIiwiYXBwZW5kIiwidG9BcHBlbmQiLCJpbnNlcnRBZGphY2VudEhUTUwiLCJmaW5kIiwiTm9kZUxpc3QiLCJBcnJheSIsInRyaWdnZXIiLCJuYW1lIiwiZXJyb3IiLCJldiIsIkN1c3RvbUV2ZW50IiwiY3JlYXRlRXZlbnQiLCJpbml0Q3VzdG9tRXZlbnQiLCJpbml0RXZlbnQiLCJkaXNwYXRjaEV2ZW50IiwiUGF5bWVudCIsImNhcmRGcm9tTnVtYmVyIiwiY2FyZEZyb21UeXBlIiwiY2FyZHMiLCJkZWZhdWx0Rm9ybWF0IiwiZm9ybWF0QmFja0NhcmROdW1iZXIiLCJmb3JtYXRCYWNrRXhwaXJ5IiwiZm9ybWF0Q2FyZE51bWJlciIsImZvcm1hdEV4cGlyeSIsImZvcm1hdEZvcndhcmRFeHBpcnkiLCJmb3JtYXRGb3J3YXJkU2xhc2giLCJmb3JtYXRNb250aEV4cGlyeSIsImhhc1RleHRTZWxlY3RlZCIsImx1aG5DaGVjayIsInJlRm9ybWF0Q2FyZE51bWJlciIsInJlc3RyaWN0Q1ZDIiwicmVzdHJpY3RDYXJkTnVtYmVyIiwicmVzdHJpY3RDb21iaW5lZEV4cGlyeSIsInJlc3RyaWN0RXhwaXJ5IiwicmVzdHJpY3RNb250aEV4cGlyeSIsInJlc3RyaWN0TnVtZXJpYyIsInJlc3RyaWN0WWVhckV4cGlyeSIsInNldENhcmRUeXBlIiwiaW5kZXhPZiIsIml0ZW0iLCJ0eXBlIiwicGF0dGVybiIsImZvcm1hdCIsImN2Y0xlbmd0aCIsImx1aG4iLCJudW0iLCJjYXJkIiwiZGlnaXQiLCJkaWdpdHMiLCJvZGQiLCJzdW0iLCJyZXZlcnNlIiwicGFyc2VJbnQiLCJzZWxlY3Rpb25TdGFydCIsInNlbGVjdGlvbkVuZCIsInNlbGVjdGlvbiIsImNyZWF0ZVJhbmdlIiwic2V0VGltZW91dCIsIl90aGlzIiwiZm5zIiwicmUiLCJ1cHBlckxlbmd0aCIsIlN0cmluZyIsImZyb21DaGFyQ29kZSIsIm1ldGEiLCJzbGFzaCIsIm1ldGFLZXkiLCJpbnB1dCIsImN0cmxLZXkiLCJhbGxUeXBlcyIsImNhcmRUeXBlIiwiY2FyZEV4cGlyeVZhbCIsIm1vbnRoIiwicHJlZml4IiwieWVhciIsIkRhdGUiLCJnZXRGdWxsWWVhciIsInRvU3RyaW5nIiwic2xpY2UiLCJ2YWxpZGF0ZUNhcmROdW1iZXIiLCJ2YWxpZGF0ZUNhcmRFeHBpcnkiLCJjdXJyZW50VGltZSIsImV4cGlyeSIsInNldE1vbnRoIiwiZ2V0TW9udGgiLCJ2YWxpZGF0ZUNhcmRDVkMiLCJjdmMiLCJyZWYxIiwiZ3JvdXBzIiwiZXhlYyIsInNoaWZ0IiwiZm9ybWF0Q2FyZENWQyIsImZvcm1hdENhcmRFeHBpcnkiLCJmb3JtYXRDYXJkRXhwaXJ5TXVsdGlwbGUiLCJnZXRDYXJkQXJyYXkiLCJzZXRDYXJkQXJyYXkiLCJjYXJkQXJyYXkiLCJhZGRUb0NhcmRBcnJheSIsImNhcmRPYmplY3QiLCJyZW1vdmVGcm9tQ2FyZEFycmF5Iiwia2V5Iiwic3BsaWNlIiwiYyIsInAiLCJfdmFsaWRGb3JtIiwiX3ZhbGlkRm9ybTIiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0Iiwib2JqIiwiX19lc01vZHVsZSIsImRlZmF1bHQiLCJWYWxpZEZvcm0iLCJ0b2dnbGVJbnZhbGlkQ2xhc3MiLCJoYW5kbGVDdXN0b21NZXNzYWdlcyIsImhhbmRsZUN1c3RvbU1lc3NhZ2VEaXNwbGF5IiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJjbG9uZSIsImRlZmF1bHRzIiwiaW5zZXJ0QWZ0ZXIiLCJpbnNlcnRCZWZvcmUiLCJmb3JFYWNoIiwiZGVib3VuY2UiLCJjb3B5IiwiYXR0ciIsImhhc093blByb3BlcnR5IiwiZGVmYXVsdE9iamVjdCIsImsiLCJ1bmRlZmluZWQiLCJyZWZOb2RlIiwibm9kZVRvSW5zZXJ0Iiwic2libGluZyIsIm5leHRTaWJsaW5nIiwiX3BhcmVudCIsInBhcmVudE5vZGUiLCJwYXJlbnQiLCJhcHBlbmRDaGlsZCIsIml0ZW1zIiwiZm4iLCJtcyIsInRpbWVvdXQiLCJkZWJvdW5jZWRGbiIsImNsZWFyVGltZW91dCIsInZhbGlkRm9ybSIsIl91dGlsIiwiaW52YWxpZENsYXNzIiwidmFsaWRpdHkiLCJ2YWxpZCIsImVycm9yUHJvcHMiLCJnZXRDdXN0b21NZXNzYWdlIiwiY3VzdG9tTWVzc2FnZXMiLCJsb2NhbEVycm9yUHJvcHMiLCJjb25jYXQiLCJwcm9wIiwiZ2V0QXR0cmlidXRlIiwiY2hlY2tWYWxpZGl0eSIsIm1lc3NhZ2UiLCJzZXRDdXN0b21WYWxpZGl0eSIsIm9wdGlvbnMiLCJ2YWxpZGF0aW9uRXJyb3JDbGFzcyIsInZhbGlkYXRpb25FcnJvclBhcmVudENsYXNzIiwiZXJyb3JQbGFjZW1lbnQiLCJpbnNlcnRFcnJvciIsImVycm9yTm9kZSIsInF1ZXJ5U2VsZWN0b3IiLCJjcmVhdGVFbGVtZW50IiwidmFsaWRhdGlvbk1lc3NhZ2UiLCJ0ZXh0Q29udGVudCIsImRlZmF1bHRPcHRpb25zIiwiaW5wdXRzIiwidG9Mb3dlckNhc2UiLCJmb2N1c0ludmFsaWRJbnB1dCIsInZhbGlkRm9ybUlucHV0cyIsImZvcm0iLCJmb2N1c0ZpcnN0IiwiaW52YWxpZE5vZGUiLCJmb2N1cyIsIiQiLCJwbHVnaW5OYW1lIiwiUGx1Z2luIiwiZXh0ZW5kIiwiX2RlZmF1bHRzIiwiX25hbWUiLCJpbml0IiwicHJvdG90eXBlIiwicmVzZXQiLCJhbW91bnQiLCJkb2N1bWVudEVsZW1lbnQiLCJwYXJzZUZsb2F0IiwibGV2ZWxfYW1vdW50X3NlbGVjdG9yIiwib3JpZ2luYWxfYW1vdW50Iiwib3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yIiwicHJvY2Vzc2luZ19mZWUiLCJNYXRoIiwicm91bmQiLCJmZWVfYW1vdW50IiwicG93IiwidG9GaXhlZCIsInByb2Nlc3NpbmdfZmVlX3RleHQiLCJjcmVhdGVfYWNjb3VudCIsImJ1dHRvbl90ZXh0IiwicGF5X2J1dHRvbl9zZWxlY3RvciIsInN0cmlwZSIsIlN0cmlwZSIsInN0cmlwZV9wdWJsaXNoYWJsZV9rZXkiLCJlbGVtZW50cyIsImZvbnRzIiwiY3NzU3JjIiwicmVmZXJyZXIiLCJkZWJ1ZyIsImFuYWx5dGljc1RyYWNraW5nIiwiYW1vdW50QXNSYWRpbyIsImFtb3VudFVwZGF0ZWQiLCJwYXlfY2NfcHJvY2Vzc2luZ19zZWxlY3RvciIsImNyZWRpdENhcmRQcm9jZXNzaW5nRmVlcyIsImRvbmF0ZV9mb3JtX3NlbGVjdG9yIiwiZG9uYXRlQW5vbnltb3VzbHkiLCJob25vck9yTWVtb3J5VG9nZ2xlIiwib3V0c2lkZVVuaXRlZFN0YXRlcyIsInNoaXBwaW5nQWRkcmVzcyIsImFsbG93TWlubnBvc3RBY2NvdW50IiwiY2hvb3NlUGF5bWVudE1ldGhvZCIsImNyZWRpdENhcmRGaWVsZHMiLCJhY2hGaWVsZHMiLCJ2YWxpZGF0ZUFuZFN1Ym1pdCIsImNvbmZpcm1fZm9ybV9zZWxlY3RvciIsInNob3dOZXdzbGV0dGVyU2V0dGluZ3MiLCJjb25maXJtTWVzc2FnZVN1Ym1pdCIsImNvbnNvbGUiLCJsb2ciLCJkaXIiLCJwcm9ncmVzcyIsInByb2dyZXNzX3NlbGVjdG9yIiwic3RlcCIsIm5hdl9pdGVtX2NvdW50Iiwib3BwX2lkIiwib3BwX2lkX3NlbGVjdG9yIiwicG9zdF9wdXJjaGFzZSIsImluZGV4IiwiZmluaXNoX3NlY3Rpb25fc2VsZWN0b3IiLCJhbmFseXRpY3NUcmFja2luZ1N0ZXAiLCJpbnN0YWxsbWVudF9wZXJpb2QiLCJsZXZlbCIsInRoYXQiLCJpbnN0YWxsbWVudF9wZXJpb2Rfc2VsZWN0b3IiLCJhamF4IiwibWV0aG9kIiwidXJsIiwiZG9uZSIsImNoYXJBdCIsInRvVXBwZXJDYXNlIiwiZ2EiLCJwYWdlIiwibG9jYXRpb24iLCJwYXRobmFtZSIsInRpdGxlIiwiY2hhbmdlIiwiaXMiLCJzdHJpcGVfcGF5bWVudF90eXBlIiwiZ2V0U3RyaXBlUGF5bWVudFR5cGUiLCJhbW91bnRfc2VsZWN0b3JfZmFpcl9tYXJrZXQiLCJzZXRGYWlyTWFya2V0VmFsdWUiLCJjYWxjdWxhdGVGZWVzIiwiYWRkaXRpb25hbF9hbW91bnRfZmllbGQiLCJnZXRUb3RhbEFtb3VudCIsInRvdGFsX2Ftb3VudCIsImFkZGl0aW9uYWxfYW1vdW50IiwiYW1vdW50X3NlbGVjdG9yIiwiZmFpcl9tYXJrZXRfdmFsdWVfc2VsZWN0b3IiLCJmYWlyTWFya2V0VmFsdWUiLCJzZXRTdHJpcGVQYXltZW50VHlwZSIsImZlZXMiLCJjcmVkaXRDYXJkRmVlQ2hlY2tib3giLCJmaWVsZCIsImZ1bGxfYW1vdW50IiwiZnVsbF9hbW91bnRfc2VsZWN0b3IiLCJ0b2dnbGVBbm9ueW1vdXMiLCJhbm9ueW1vdXNfc2VsZWN0b3IiLCJuYW1lX3NlbGVjdG9yIiwiaGlkZSIsInNob3ciLCJob25vck9yTWVtb3J5IiwiaG9ub3Jfb3JfbWVtb3J5X2Nob29zZXIiLCJob25vcl9tZW1vcnlfaW5wdXRfZ3JvdXAiLCJob25vcl90eXBlX3NlbGVjdG9yIiwiaG9ub3JfbmFtZV9zZWxlY3RvciIsInNob3dfYmlsbGluZ19jb3VudHJ5X3NlbGVjdG9yIiwiY2xpY2siLCJiaWxsaW5nX2NvdW50cnlfc2VsZWN0b3IiLCJzaG93X3NoaXBwaW5nX2NvdW50cnlfc2VsZWN0b3IiLCJzaGlwcGluZ19jb3VudHJ5X3NlbGVjdG9yIiwic2hvd19zaGlwcGluZyIsInVzZV9mb3Jfc2hpcHBpbmdfc2VsZWN0b3IiLCJzaGlwcGluZ19zZWxlY3RvciIsImFjY291bnRfZXhpc3RzIiwic2hvd1Bhc3N3b3JkIiwic2hvd1Bhc3N3b3JkU3RyZW5ndGgiLCJzcGFtRW1haWwiLCJlbWFpbF9maWVsZF9zZWxlY3RvciIsInRvZ2dsZUFjY291bnRGaWVsZHMiLCJjcmVhdGVfbXBfc2VsZWN0b3IiLCJkb25lVHlwaW5nIiwiZW1haWwiLCJjaGVja01pbm5wb3N0QWNjb3VudCIsInR5cGluZ1RpbWVyIiwiZG9uZVR5cGluZ0ludGVydmFsIiwia2V5dXAiLCJlbWFpbF9maWVsZCIsInNwYW1FcnJvckNvbnRhaW5lciIsImNyZWF0ZV9hY2NvdW50X3NlbGVjdG9yIiwiYmVmb3JlIiwicGFzc3dvcmRfc2VsZWN0b3IiLCIkc3VibWl0IiwiJGNvbnRhaW5lciIsIiRmaWVsZCIsInNob3dfcGFzcyIsIiR0b2dnbGUiLCJjaGVja2JveCIsIiRiZWZvcmUiLCJhZnRlciIsImNoZWNrUGFzc3dvcmRTdHJlbmd0aCIsIiRwYXNzd29yZCIsIiRzdHJlbmd0aE1ldGVyIiwiJHN0cmVuZ3RoVGV4dCIsInBhc3N3b3JkIiwicmVzdWx0IiwienhjdmJuIiwic3RyZW5ndGgiLCJzY29yZSIsImh0bWwiLCJ1c2VyIiwibWlubnBvc3Rfcm9vdCIsInN0YXR1cyIsInJlYXNvbiIsImNob29zZV9wYXltZW50IiwiY2hlY2tlZF9pZCIsImNoZWNrZWRfdmFsdWUiLCJzZXR1cFBheW1lbnRNZXRob2QiLCJpZCIsImVsZW1lbnRfaWQiLCJlbGVtZW50X3ZhbHVlIiwicmVtb3ZlQWNoRmllbGRzIiwicGF5bWVudF9tZXRob2Rfc2VsZWN0b3IiLCJzdHlsZSIsImJhc2UiLCJpY29uQ29sb3IiLCJsaW5lSGVpZ2h0IiwiZm9udFdlaWdodCIsImZvbnRGYW1pbHkiLCJmb250U2l6ZSIsImludmFsaWQiLCJjb2xvciIsImNhcmROdW1iZXJFbGVtZW50IiwiY3JlYXRlIiwic2hvd0ljb24iLCJtb3VudCIsImNjX251bV9zZWxlY3RvciIsImNhcmRFeHBpcnlFbGVtZW50IiwiY2NfZXhwX3NlbGVjdG9yIiwiY2FyZEN2Y0VsZW1lbnQiLCJjY19jdmNfc2VsZWN0b3IiLCJldmVudCIsImJyYW5kIiwic3RyaXBlRXJyb3JEaXNwbGF5IiwiYnV0dG9uU3RhdHVzIiwiYmFua1Rva2VuRmllbGROYW1lIiwiYmFua1Rva2VuRmllbGQiLCJwbGFpZF9lbnYiLCJQbGFpZCIsImxpbmtIYW5kbGVyIiwic2VsZWN0QWNjb3VudCIsImFwaVZlcnNpb24iLCJlbnYiLCJjbGllbnROYW1lIiwicGxhaWRfcHVibGljX2tleSIsInByb2R1Y3QiLCJvbkxvYWQiLCJvblN1Y2Nlc3MiLCJwdWJsaWNfdG9rZW4iLCJtZXRhZGF0YSIsInN1cHBvcnRmb3JtIiwiYWNjb3VudF9pZCIsInNlcmlhbGl6ZSIsInJlc3BvbnNlIiwicGxhaWRfbGluayIsInN0cmlwZV9iYW5rX2FjY291bnRfdG9rZW4iLCJwcmVwZW5kIiwiY29udGVudHMiLCJ1bndyYXAiLCJvbkV4aXQiLCJlcnIiLCJvcGVuIiwiYnV0dG9uIiwiZGlzYWJsZWQiLCJzY3JvbGxUb0Zvcm1FcnJvciIsImZpcnN0IiwiZmlyc3RfaG9sZGVyIiwiZWxlbWVudE9mZnNldCIsIm9mZnNldCIsInRvcCIsInBhZ2VPZmZzZXQiLCJwYWdlWU9mZnNldCIsImlubmVySGVpZ2h0Iiwic2Nyb2xsVG9wIiwiZm9ybXMiLCJzdWJtaXQiLCJwYXltZW50X3R5cGUiLCJiaWxsaW5nRGV0YWlscyIsImdlbmVyYXRlQmlsbGluZ0RldGFpbHMiLCJmaXJzdF9uYW1lIiwiZmlyc3RfbmFtZV9maWVsZF9zZWxlY3RvciIsImxhc3RfbmFtZSIsImxhc3RfbmFtZV9maWVsZF9zZWxlY3RvciIsInBhc3N3b3JkX2ZpZWxkX3NlbGVjdG9yIiwiY2l0eSIsImJpbGxpbmdfY2l0eV9maWVsZF9zZWxlY3RvciIsInN0YXRlIiwiYmlsbGluZ19zdGF0ZV9maWVsZF9zZWxlY3RvciIsInppcCIsImJpbGxpbmdfemlwX2ZpZWxkX3NlbGVjdG9yIiwiY3JlYXRlUGF5bWVudE1ldGhvZCIsImJhbmtUb2tlbkhhbmRsZXIiLCJ0aGlzX3NlbGVjdG9yIiwid2hpY2hfZXJyb3IiLCJlbXB0eSIsImFkZHJlc3NEZXRhaWxzIiwiZnVsbF9uYW1lIiwic3RyZWV0IiwiYmlsbGluZ19zdHJlZXRfZmllbGRfc2VsZWN0b3IiLCJsaW5lMSIsImFjY291bnRfY2l0eV9zZWxlY3RvciIsImFjY291bnRfc3RhdGVfc2VsZWN0b3IiLCJhY2NvdW50X3ppcF9zZWxlY3RvciIsInBvc3RhbF9jb2RlIiwiY291bnRyeSIsImJpbGxpbmdfY291bnRyeV9maWVsZF9zZWxlY3RvciIsImFkZHJlc3MiLCJjYXJkRWxlbWVudCIsImJpbGxpbmdfZGV0YWlscyIsInRoZW4iLCJoYW5kbGVTZXJ2ZXJFcnJvciIsImFqYXhfdXJsIiwidG9rZW5GaWVsZE5hbWUiLCJ0b2tlbkZpZWxkIiwicGF5bWVudE1ldGhvZCIsImZldGNoIiwiaGVhZGVycyIsImJvZHkiLCJqc29uIiwiaGFuZGxlU2VydmVyUmVzcG9uc2UiLCJ0b2tlbiIsImNhY2hlIiwiZXJyb3JzIiwiZ2V0IiwicmVxdWlyZXNfYWN0aW9uIiwiZWFjaCIsInRoaXNfZmllbGQiLCJkaXNwbGF5RXJyb3JNZXNzYWdlIiwiYW5pbWF0ZSIsInN0cmlwZUVycm9yU2VsZWN0b3IiLCJwcmV2IiwibmV3c2xldHRlcl9ncm91cF9odG1sIiwibmV3c2xldHRlcl9ncm91cF9zZWxlY3RvciIsImdldF9kYXRhIiwic2hvcnRjb2RlIiwicGxhY2VtZW50IiwiZ3JvdXBfZmllbGRzIiwiY2F0ZWdvcnkiLCJtYWlsY2hpbXBfc3RhdHVzIiwibWFpbGNoaW1wX3VzZXJfaWQiLCJleGlzdGluZ19uZXdzbGV0dGVyX3NldHRpbmdzIiwiY29uZmlybWZvcm0iLCJuZXdzbGV0dGVyX2dyb3VwcyIsIm5ld19uZXdzbGV0dGVyX3NldHRpbmdzIiwicG9zdF9kYXRhIiwiZ3JvdXBzX3N1Ym1pdHRlZCIsImdyb3Vwc19hdmFpbGFibGUiLCJncm91cCIsImRhdGFUeXBlIiwiY29udGVudFR5cGUiLCJKU09OIiwic3RyaW5naWZ5Iiwic3VjY2VzcyIsImZhaWwiLCJqUXVlcnkiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxDQUFDLFVBQVNBLENBQVQsRUFBVztBQUFDLE1BQUcsUUFBT0MsT0FBUCx5Q0FBT0EsT0FBUCxPQUFpQixRQUFqQixJQUEyQixPQUFPQyxNQUFQLEtBQWdCLFdBQTlDLEVBQTBEO0FBQUNBLElBQUFBLE1BQU0sQ0FBQ0QsT0FBUCxHQUFlRCxDQUFDLEVBQWhCO0FBQW1CLEdBQTlFLE1BQW1GLElBQUcsT0FBT0csTUFBUCxLQUFnQixVQUFoQixJQUE0QkEsTUFBTSxDQUFDQyxHQUF0QyxFQUEwQztBQUFDRCxJQUFBQSxNQUFNLENBQUMsRUFBRCxFQUFJSCxDQUFKLENBQU47QUFBYSxHQUF4RCxNQUE0RDtBQUFDLFFBQUlLLENBQUo7O0FBQU0sUUFBRyxPQUFPQyxNQUFQLEtBQWdCLFdBQW5CLEVBQStCO0FB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QXF5Q21CeUIsUUFyeUNuQiIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKGYpe2lmKHR5cGVvZiBleHBvcnRzPT09XCJvYmplY3RcIiYmdHlwZW9mIG1vZHVsZSE9PVwidW5kZWZpbmVkXCIpe21vZHVsZS5leHBvcnRzPWYoKX1lbHNlIGlmKHR5cGVvZiBkZWZpbmU9PT1cImZ1bmN0aW9uXCImJmRlZmluZS5hbWQpe2RlZmluZShbXSxmKX1lbHNle3ZhciBnO2lmKHR5cGVvZiB3aW5kb3chPT1cInVuZGVmaW5lZFwiKXtnPXdpbmRvd31lbHNlIGlmKHR5cGVvZiBnbG9iYWwhPT1cInVuZGVmaW5lZFwiKXtnPWdsb2JhbH1lbHNlIGlmKHR5cGVvZiBzZWxmIT09XCJ1bmRlZmluZWRcIil7Zz1zZWxmfWVsc2V7Zz10aGlzfShnLnBheW1lbnQgfHwgKGcucGF5bWVudCA9IHt9KSkuanMgPSBmKCl9fSkoZnVuY3Rpb24oKXt2YXIgZGVmaW5lLG1vZHVsZSxleHBvcnRzO3JldHVybiAoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSh7MTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG52YXIgUUosIHJyZXR1cm4sIHJ0cmltO1xuXG5RSiA9IGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG4gIGlmIChRSi5pc0RPTUVsZW1lbnQoc2VsZWN0b3IpKSB7XG4gICAgcmV0dXJuIHNlbGVjdG9yO1xuICB9XG4gIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbn07XG5cblFKLmlzRE9NRWxlbWVudCA9IGZ1bmN0aW9uKGVsKSB7XG4gIHJldHVybiBlbCAmJiAoZWwubm9kZU5hbWUgIT0gbnVsbCk7XG59O1xuXG5ydHJpbSA9IC9eW1xcc1xcdUZFRkZcXHhBMF0rfFtcXHNcXHVGRUZGXFx4QTBdKyQvZztcblxuUUoudHJpbSA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgaWYgKHRleHQgPT09IG51bGwpIHtcbiAgICByZXR1cm4gXCJcIjtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gKHRleHQgKyBcIlwiKS5yZXBsYWNlKHJ0cmltLCBcIlwiKTtcbiAgfVxufTtcblxucnJldHVybiA9IC9cXHIvZztcblxuUUoudmFsID0gZnVuY3Rpb24oZWwsIHZhbCkge1xuICB2YXIgcmV0O1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICByZXR1cm4gZWwudmFsdWUgPSB2YWw7XG4gIH0gZWxzZSB7XG4gICAgcmV0ID0gZWwudmFsdWU7XG4gICAgaWYgKHR5cGVvZiByZXQgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHJldHVybiByZXQucmVwbGFjZShycmV0dXJuLCBcIlwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHJldCA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG5RSi5wcmV2ZW50RGVmYXVsdCA9IGZ1bmN0aW9uKGV2ZW50T2JqZWN0KSB7XG4gIGlmICh0eXBlb2YgZXZlbnRPYmplY3QucHJldmVudERlZmF1bHQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIGV2ZW50T2JqZWN0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGV2ZW50T2JqZWN0LnJldHVyblZhbHVlID0gZmFsc2U7XG4gIHJldHVybiBmYWxzZTtcbn07XG5cblFKLm5vcm1hbGl6ZUV2ZW50ID0gZnVuY3Rpb24oZSkge1xuICB2YXIgb3JpZ2luYWw7XG4gIG9yaWdpbmFsID0gZTtcbiAgZSA9IHtcbiAgICB3aGljaDogb3JpZ2luYWwud2hpY2ggIT0gbnVsbCA/IG9yaWdpbmFsLndoaWNoIDogdm9pZCAwLFxuICAgIHRhcmdldDogb3JpZ2luYWwudGFyZ2V0IHx8IG9yaWdpbmFsLnNyY0VsZW1lbnQsXG4gICAgcHJldmVudERlZmF1bHQ6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIFFKLnByZXZlbnREZWZhdWx0KG9yaWdpbmFsKTtcbiAgICB9LFxuICAgIG9yaWdpbmFsRXZlbnQ6IG9yaWdpbmFsLFxuICAgIGRhdGE6IG9yaWdpbmFsLmRhdGEgfHwgb3JpZ2luYWwuZGV0YWlsXG4gIH07XG4gIGlmIChlLndoaWNoID09IG51bGwpIHtcbiAgICBlLndoaWNoID0gb3JpZ2luYWwuY2hhckNvZGUgIT0gbnVsbCA/IG9yaWdpbmFsLmNoYXJDb2RlIDogb3JpZ2luYWwua2V5Q29kZTtcbiAgfVxuICByZXR1cm4gZTtcbn07XG5cblFKLm9uID0gZnVuY3Rpb24oZWxlbWVudCwgZXZlbnROYW1lLCBjYWxsYmFjaykge1xuICB2YXIgZWwsIGksIGosIGxlbiwgbGVuMSwgbXVsdEV2ZW50TmFtZSwgb3JpZ2luYWxDYWxsYmFjaywgcmVmO1xuICBpZiAoZWxlbWVudC5sZW5ndGgpIHtcbiAgICBmb3IgKGkgPSAwLCBsZW4gPSBlbGVtZW50Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBlbCA9IGVsZW1lbnRbaV07XG4gICAgICBRSi5vbihlbCwgZXZlbnROYW1lLCBjYWxsYmFjayk7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuICBpZiAoZXZlbnROYW1lLm1hdGNoKFwiIFwiKSkge1xuICAgIHJlZiA9IGV2ZW50TmFtZS5zcGxpdChcIiBcIik7XG4gICAgZm9yIChqID0gMCwgbGVuMSA9IHJlZi5sZW5ndGg7IGogPCBsZW4xOyBqKyspIHtcbiAgICAgIG11bHRFdmVudE5hbWUgPSByZWZbal07XG4gICAgICBRSi5vbihlbGVtZW50LCBtdWx0RXZlbnROYW1lLCBjYWxsYmFjayk7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuICBvcmlnaW5hbENhbGxiYWNrID0gY2FsbGJhY2s7XG4gIGNhbGxiYWNrID0gZnVuY3Rpb24oZSkge1xuICAgIGUgPSBRSi5ub3JtYWxpemVFdmVudChlKTtcbiAgICByZXR1cm4gb3JpZ2luYWxDYWxsYmFjayhlKTtcbiAgfTtcbiAgaWYgKGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgIHJldHVybiBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBjYWxsYmFjaywgZmFsc2UpO1xuICB9XG4gIGlmIChlbGVtZW50LmF0dGFjaEV2ZW50KSB7XG4gICAgZXZlbnROYW1lID0gXCJvblwiICsgZXZlbnROYW1lO1xuICAgIHJldHVybiBlbGVtZW50LmF0dGFjaEV2ZW50KGV2ZW50TmFtZSwgY2FsbGJhY2spO1xuICB9XG4gIGVsZW1lbnRbJ29uJyArIGV2ZW50TmFtZV0gPSBjYWxsYmFjaztcbn07XG5cblFKLmFkZENsYXNzID0gZnVuY3Rpb24oZWwsIGNsYXNzTmFtZSkge1xuICB2YXIgZTtcbiAgaWYgKGVsLmxlbmd0aCkge1xuICAgIHJldHVybiAoZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaSwgbGVuLCByZXN1bHRzO1xuICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgZm9yIChpID0gMCwgbGVuID0gZWwubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgZSA9IGVsW2ldO1xuICAgICAgICByZXN1bHRzLnB1c2goUUouYWRkQ2xhc3MoZSwgY2xhc3NOYW1lKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9KSgpO1xuICB9XG4gIGlmIChlbC5jbGFzc0xpc3QpIHtcbiAgICByZXR1cm4gZWwuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBlbC5jbGFzc05hbWUgKz0gJyAnICsgY2xhc3NOYW1lO1xuICB9XG59O1xuXG5RSi5oYXNDbGFzcyA9IGZ1bmN0aW9uKGVsLCBjbGFzc05hbWUpIHtcbiAgdmFyIGUsIGhhc0NsYXNzLCBpLCBsZW47XG4gIGlmIChlbC5sZW5ndGgpIHtcbiAgICBoYXNDbGFzcyA9IHRydWU7XG4gICAgZm9yIChpID0gMCwgbGVuID0gZWwubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGUgPSBlbFtpXTtcbiAgICAgIGhhc0NsYXNzID0gaGFzQ2xhc3MgJiYgUUouaGFzQ2xhc3MoZSwgY2xhc3NOYW1lKTtcbiAgICB9XG4gICAgcmV0dXJuIGhhc0NsYXNzO1xuICB9XG4gIGlmIChlbC5jbGFzc0xpc3QpIHtcbiAgICByZXR1cm4gZWwuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyBSZWdFeHAoJyhefCApJyArIGNsYXNzTmFtZSArICcoIHwkKScsICdnaScpLnRlc3QoZWwuY2xhc3NOYW1lKTtcbiAgfVxufTtcblxuUUoucmVtb3ZlQ2xhc3MgPSBmdW5jdGlvbihlbCwgY2xhc3NOYW1lKSB7XG4gIHZhciBjbHMsIGUsIGksIGxlbiwgcmVmLCByZXN1bHRzO1xuICBpZiAoZWwubGVuZ3RoKSB7XG4gICAgcmV0dXJuIChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBpLCBsZW4sIHJlc3VsdHM7XG4gICAgICByZXN1bHRzID0gW107XG4gICAgICBmb3IgKGkgPSAwLCBsZW4gPSBlbC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBlID0gZWxbaV07XG4gICAgICAgIHJlc3VsdHMucHVzaChRSi5yZW1vdmVDbGFzcyhlLCBjbGFzc05hbWUpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH0pKCk7XG4gIH1cbiAgaWYgKGVsLmNsYXNzTGlzdCkge1xuICAgIHJlZiA9IGNsYXNzTmFtZS5zcGxpdCgnICcpO1xuICAgIHJlc3VsdHMgPSBbXTtcbiAgICBmb3IgKGkgPSAwLCBsZW4gPSByZWYubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGNscyA9IHJlZltpXTtcbiAgICAgIHJlc3VsdHMucHVzaChlbC5jbGFzc0xpc3QucmVtb3ZlKGNscykpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZWwuY2xhc3NOYW1lID0gZWwuY2xhc3NOYW1lLnJlcGxhY2UobmV3IFJlZ0V4cCgnKF58XFxcXGIpJyArIGNsYXNzTmFtZS5zcGxpdCgnICcpLmpvaW4oJ3wnKSArICcoXFxcXGJ8JCknLCAnZ2knKSwgJyAnKTtcbiAgfVxufTtcblxuUUoudG9nZ2xlQ2xhc3MgPSBmdW5jdGlvbihlbCwgY2xhc3NOYW1lLCBib29sKSB7XG4gIHZhciBlO1xuICBpZiAoZWwubGVuZ3RoKSB7XG4gICAgcmV0dXJuIChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBpLCBsZW4sIHJlc3VsdHM7XG4gICAgICByZXN1bHRzID0gW107XG4gICAgICBmb3IgKGkgPSAwLCBsZW4gPSBlbC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBlID0gZWxbaV07XG4gICAgICAgIHJlc3VsdHMucHVzaChRSi50b2dnbGVDbGFzcyhlLCBjbGFzc05hbWUsIGJvb2wpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH0pKCk7XG4gIH1cbiAgaWYgKGJvb2wpIHtcbiAgICBpZiAoIVFKLmhhc0NsYXNzKGVsLCBjbGFzc05hbWUpKSB7XG4gICAgICByZXR1cm4gUUouYWRkQ2xhc3MoZWwsIGNsYXNzTmFtZSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBRSi5yZW1vdmVDbGFzcyhlbCwgY2xhc3NOYW1lKTtcbiAgfVxufTtcblxuUUouYXBwZW5kID0gZnVuY3Rpb24oZWwsIHRvQXBwZW5kKSB7XG4gIHZhciBlO1xuICBpZiAoZWwubGVuZ3RoKSB7XG4gICAgcmV0dXJuIChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBpLCBsZW4sIHJlc3VsdHM7XG4gICAgICByZXN1bHRzID0gW107XG4gICAgICBmb3IgKGkgPSAwLCBsZW4gPSBlbC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBlID0gZWxbaV07XG4gICAgICAgIHJlc3VsdHMucHVzaChRSi5hcHBlbmQoZSwgdG9BcHBlbmQpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH0pKCk7XG4gIH1cbiAgcmV0dXJuIGVsLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgdG9BcHBlbmQpO1xufTtcblxuUUouZmluZCA9IGZ1bmN0aW9uKGVsLCBzZWxlY3Rvcikge1xuICBpZiAoZWwgaW5zdGFuY2VvZiBOb2RlTGlzdCB8fCBlbCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgZWwgPSBlbFswXTtcbiAgfVxuICByZXR1cm4gZWwucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG59O1xuXG5RSi50cmlnZ2VyID0gZnVuY3Rpb24oZWwsIG5hbWUsIGRhdGEpIHtcbiAgdmFyIGUsIGVycm9yLCBldjtcbiAgdHJ5IHtcbiAgICBldiA9IG5ldyBDdXN0b21FdmVudChuYW1lLCB7XG4gICAgICBkZXRhaWw6IGRhdGFcbiAgICB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBlID0gZXJyb3I7XG4gICAgZXYgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcbiAgICBpZiAoZXYuaW5pdEN1c3RvbUV2ZW50KSB7XG4gICAgICBldi5pbml0Q3VzdG9tRXZlbnQobmFtZSwgdHJ1ZSwgdHJ1ZSwgZGF0YSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV2LmluaXRFdmVudChuYW1lLCB0cnVlLCB0cnVlLCBkYXRhKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGVsLmRpc3BhdGNoRXZlbnQoZXYpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBRSjtcblxuXG59LHt9XSwyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbihmdW5jdGlvbiAoZ2xvYmFsKXtcbnZhciBQYXltZW50LCBRSiwgY2FyZEZyb21OdW1iZXIsIGNhcmRGcm9tVHlwZSwgY2FyZHMsIGRlZmF1bHRGb3JtYXQsIGZvcm1hdEJhY2tDYXJkTnVtYmVyLCBmb3JtYXRCYWNrRXhwaXJ5LCBmb3JtYXRDYXJkTnVtYmVyLCBmb3JtYXRFeHBpcnksIGZvcm1hdEZvcndhcmRFeHBpcnksIGZvcm1hdEZvcndhcmRTbGFzaCwgZm9ybWF0TW9udGhFeHBpcnksIGhhc1RleHRTZWxlY3RlZCwgbHVobkNoZWNrLCByZUZvcm1hdENhcmROdW1iZXIsIHJlc3RyaWN0Q1ZDLCByZXN0cmljdENhcmROdW1iZXIsIHJlc3RyaWN0Q29tYmluZWRFeHBpcnksIHJlc3RyaWN0RXhwaXJ5LCByZXN0cmljdE1vbnRoRXhwaXJ5LCByZXN0cmljdE51bWVyaWMsIHJlc3RyaWN0WWVhckV4cGlyeSwgc2V0Q2FyZFR5cGUsXG4gIGluZGV4T2YgPSBbXS5pbmRleE9mIHx8IGZ1bmN0aW9uKGl0ZW0pIHsgZm9yICh2YXIgaSA9IDAsIGwgPSB0aGlzLmxlbmd0aDsgaSA8IGw7IGkrKykgeyBpZiAoaSBpbiB0aGlzICYmIHRoaXNbaV0gPT09IGl0ZW0pIHJldHVybiBpOyB9IHJldHVybiAtMTsgfTtcblxuUUogPSByZXF1aXJlKCdxai9zcmMvcWouY29mZmVlJyk7XG5cbmRlZmF1bHRGb3JtYXQgPSAvKFxcZHsxLDR9KS9nO1xuXG5jYXJkcyA9IFtcbiAge1xuICAgIHR5cGU6ICdhbWV4JyxcbiAgICBwYXR0ZXJuOiAvXjNbNDddLyxcbiAgICBmb3JtYXQ6IC8oXFxkezEsNH0pKFxcZHsxLDZ9KT8oXFxkezEsNX0pPy8sXG4gICAgbGVuZ3RoOiBbMTVdLFxuICAgIGN2Y0xlbmd0aDogWzRdLFxuICAgIGx1aG46IHRydWVcbiAgfSwge1xuICAgIHR5cGU6ICdkYW5rb3J0JyxcbiAgICBwYXR0ZXJuOiAvXjUwMTkvLFxuICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICBsZW5ndGg6IFsxNl0sXG4gICAgY3ZjTGVuZ3RoOiBbM10sXG4gICAgbHVobjogdHJ1ZVxuICB9LCB7XG4gICAgdHlwZTogJ2RpbmVyc2NsdWInLFxuICAgIHBhdHRlcm46IC9eKDM2fDM4fDMwWzAtNV0pLyxcbiAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgbGVuZ3RoOiBbMTRdLFxuICAgIGN2Y0xlbmd0aDogWzNdLFxuICAgIGx1aG46IHRydWVcbiAgfSwge1xuICAgIHR5cGU6ICdkaXNjb3ZlcicsXG4gICAgcGF0dGVybjogL14oNjAxMXw2NXw2NFs0LTldfDYyMikvLFxuICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICBsZW5ndGg6IFsxNl0sXG4gICAgY3ZjTGVuZ3RoOiBbM10sXG4gICAgbHVobjogdHJ1ZVxuICB9LCB7XG4gICAgdHlwZTogJ2pjYicsXG4gICAgcGF0dGVybjogL14zNS8sXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGxlbmd0aDogWzE2XSxcbiAgICBjdmNMZW5ndGg6IFszXSxcbiAgICBsdWhuOiB0cnVlXG4gIH0sIHtcbiAgICB0eXBlOiAnbGFzZXInLFxuICAgIHBhdHRlcm46IC9eKDY3MDZ8Njc3MXw2NzA5KS8sXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGxlbmd0aDogWzE2LCAxNywgMTgsIDE5XSxcbiAgICBjdmNMZW5ndGg6IFszXSxcbiAgICBsdWhuOiB0cnVlXG4gIH0sIHtcbiAgICB0eXBlOiAnbWFlc3RybycsXG4gICAgcGF0dGVybjogL14oNTAxOHw1MDIwfDUwMzh8NjMwNHw2NzAzfDY3NTl8Njc2WzEtM10pLyxcbiAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgbGVuZ3RoOiBbMTIsIDEzLCAxNCwgMTUsIDE2LCAxNywgMTgsIDE5XSxcbiAgICBjdmNMZW5ndGg6IFszXSxcbiAgICBsdWhuOiB0cnVlXG4gIH0sIHtcbiAgICB0eXBlOiAnbWFzdGVyY2FyZCcsXG4gICAgcGF0dGVybjogL141WzEtNV0vLFxuICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICBsZW5ndGg6IFsxNl0sXG4gICAgY3ZjTGVuZ3RoOiBbM10sXG4gICAgbHVobjogdHJ1ZVxuICB9LCB7XG4gICAgdHlwZTogJ3VuaW9ucGF5JyxcbiAgICBwYXR0ZXJuOiAvXjYyLyxcbiAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgbGVuZ3RoOiBbMTYsIDE3LCAxOCwgMTldLFxuICAgIGN2Y0xlbmd0aDogWzNdLFxuICAgIGx1aG46IGZhbHNlXG4gIH0sIHtcbiAgICB0eXBlOiAndmlzYWVsZWN0cm9uJyxcbiAgICBwYXR0ZXJuOiAvXjQoMDI2fDE3NTAwfDQwNXw1MDh8ODQ0fDkxWzM3XSkvLFxuICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICBsZW5ndGg6IFsxNl0sXG4gICAgY3ZjTGVuZ3RoOiBbM10sXG4gICAgbHVobjogdHJ1ZVxuICB9LCB7XG4gICAgdHlwZTogJ3Zpc2EnLFxuICAgIHBhdHRlcm46IC9eNC8sXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGxlbmd0aDogWzEzLCAxNl0sXG4gICAgY3ZjTGVuZ3RoOiBbM10sXG4gICAgbHVobjogdHJ1ZVxuICB9LCB7XG4gICAgdHlwZTogJ2VsbycsXG4gICAgcGF0dGVybjogL140MDExfDQzODkzNXw0NSgxNDE2fDc2KXw1MCg0MTc1fDY2OTl8Njd8OTBbNC03XSl8NjMoNjI5N3w2MzY4KS8sXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGxlbmd0aDogWzE2XSxcbiAgICBjdmNMZW5ndGg6IFszXSxcbiAgICBsdWhuOiB0cnVlXG4gIH1cbl07XG5cbmNhcmRGcm9tTnVtYmVyID0gZnVuY3Rpb24obnVtKSB7XG4gIHZhciBjYXJkLCBpLCBsZW47XG4gIG51bSA9IChudW0gKyAnJykucmVwbGFjZSgvXFxEL2csICcnKTtcbiAgZm9yIChpID0gMCwgbGVuID0gY2FyZHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBjYXJkID0gY2FyZHNbaV07XG4gICAgaWYgKGNhcmQucGF0dGVybi50ZXN0KG51bSkpIHtcbiAgICAgIHJldHVybiBjYXJkO1xuICAgIH1cbiAgfVxufTtcblxuY2FyZEZyb21UeXBlID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIgY2FyZCwgaSwgbGVuO1xuICBmb3IgKGkgPSAwLCBsZW4gPSBjYXJkcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGNhcmQgPSBjYXJkc1tpXTtcbiAgICBpZiAoY2FyZC50eXBlID09PSB0eXBlKSB7XG4gICAgICByZXR1cm4gY2FyZDtcbiAgICB9XG4gIH1cbn07XG5cbmx1aG5DaGVjayA9IGZ1bmN0aW9uKG51bSkge1xuICB2YXIgZGlnaXQsIGRpZ2l0cywgaSwgbGVuLCBvZGQsIHN1bTtcbiAgb2RkID0gdHJ1ZTtcbiAgc3VtID0gMDtcbiAgZGlnaXRzID0gKG51bSArICcnKS5zcGxpdCgnJykucmV2ZXJzZSgpO1xuICBmb3IgKGkgPSAwLCBsZW4gPSBkaWdpdHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBkaWdpdCA9IGRpZ2l0c1tpXTtcbiAgICBkaWdpdCA9IHBhcnNlSW50KGRpZ2l0LCAxMCk7XG4gICAgaWYgKChvZGQgPSAhb2RkKSkge1xuICAgICAgZGlnaXQgKj0gMjtcbiAgICB9XG4gICAgaWYgKGRpZ2l0ID4gOSkge1xuICAgICAgZGlnaXQgLT0gOTtcbiAgICB9XG4gICAgc3VtICs9IGRpZ2l0O1xuICB9XG4gIHJldHVybiBzdW0gJSAxMCA9PT0gMDtcbn07XG5cbmhhc1RleHRTZWxlY3RlZCA9IGZ1bmN0aW9uKHRhcmdldCkge1xuICB2YXIgcmVmO1xuICBpZiAoKHRhcmdldC5zZWxlY3Rpb25TdGFydCAhPSBudWxsKSAmJiB0YXJnZXQuc2VsZWN0aW9uU3RhcnQgIT09IHRhcmdldC5zZWxlY3Rpb25FbmQpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAoKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBkb2N1bWVudCAhPT0gbnVsbCA/IChyZWYgPSBkb2N1bWVudC5zZWxlY3Rpb24pICE9IG51bGwgPyByZWYuY3JlYXRlUmFuZ2UgOiB2b2lkIDAgOiB2b2lkIDApICE9IG51bGwpIHtcbiAgICBpZiAoZG9jdW1lbnQuc2VsZWN0aW9uLmNyZWF0ZVJhbmdlKCkudGV4dCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbnJlRm9ybWF0Q2FyZE51bWJlciA9IGZ1bmN0aW9uKGUpIHtcbiAgcmV0dXJuIHNldFRpbWVvdXQoKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHRhcmdldCwgdmFsdWU7XG4gICAgICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICAgIHZhbHVlID0gUUoudmFsKHRhcmdldCk7XG4gICAgICB2YWx1ZSA9IFBheW1lbnQuZm5zLmZvcm1hdENhcmROdW1iZXIodmFsdWUpO1xuICAgICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIHZhbHVlKTtcbiAgICB9O1xuICB9KSh0aGlzKSk7XG59O1xuXG5mb3JtYXRDYXJkTnVtYmVyID0gZnVuY3Rpb24oZSkge1xuICB2YXIgY2FyZCwgZGlnaXQsIGxlbmd0aCwgcmUsIHRhcmdldCwgdXBwZXJMZW5ndGgsIHZhbHVlO1xuICBkaWdpdCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZS53aGljaCk7XG4gIGlmICghL15cXGQrJC8udGVzdChkaWdpdCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gIHZhbHVlID0gUUoudmFsKHRhcmdldCk7XG4gIGNhcmQgPSBjYXJkRnJvbU51bWJlcih2YWx1ZSArIGRpZ2l0KTtcbiAgbGVuZ3RoID0gKHZhbHVlLnJlcGxhY2UoL1xcRC9nLCAnJykgKyBkaWdpdCkubGVuZ3RoO1xuICB1cHBlckxlbmd0aCA9IDE2O1xuICBpZiAoY2FyZCkge1xuICAgIHVwcGVyTGVuZ3RoID0gY2FyZC5sZW5ndGhbY2FyZC5sZW5ndGgubGVuZ3RoIC0gMV07XG4gIH1cbiAgaWYgKGxlbmd0aCA+PSB1cHBlckxlbmd0aCkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoKHRhcmdldC5zZWxlY3Rpb25TdGFydCAhPSBudWxsKSAmJiB0YXJnZXQuc2VsZWN0aW9uU3RhcnQgIT09IHZhbHVlLmxlbmd0aCkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoY2FyZCAmJiBjYXJkLnR5cGUgPT09ICdhbWV4Jykge1xuICAgIHJlID0gL14oXFxkezR9fFxcZHs0fVxcc1xcZHs2fSkkLztcbiAgfSBlbHNlIHtcbiAgICByZSA9IC8oPzpefFxccykoXFxkezR9KSQvO1xuICB9XG4gIGlmIChyZS50ZXN0KHZhbHVlKSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgdmFsdWUgKyAnICcgKyBkaWdpdCk7XG4gIH0gZWxzZSBpZiAocmUudGVzdCh2YWx1ZSArIGRpZ2l0KSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgdmFsdWUgKyBkaWdpdCArICcgJyk7XG4gIH1cbn07XG5cbmZvcm1hdEJhY2tDYXJkTnVtYmVyID0gZnVuY3Rpb24oZSkge1xuICB2YXIgdGFyZ2V0LCB2YWx1ZTtcbiAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gIHZhbHVlID0gUUoudmFsKHRhcmdldCk7XG4gIGlmIChlLm1ldGEpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGUud2hpY2ggIT09IDgpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKCh0YXJnZXQuc2VsZWN0aW9uU3RhcnQgIT0gbnVsbCkgJiYgdGFyZ2V0LnNlbGVjdGlvblN0YXJ0ICE9PSB2YWx1ZS5sZW5ndGgpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKC9cXGRcXHMkLy50ZXN0KHZhbHVlKSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgdmFsdWUucmVwbGFjZSgvXFxkXFxzJC8sICcnKSk7XG4gIH0gZWxzZSBpZiAoL1xcc1xcZD8kLy50ZXN0KHZhbHVlKSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgdmFsdWUucmVwbGFjZSgvXFxzXFxkPyQvLCAnJykpO1xuICB9XG59O1xuXG5mb3JtYXRFeHBpcnkgPSBmdW5jdGlvbihlKSB7XG4gIHZhciBkaWdpdCwgdGFyZ2V0LCB2YWw7XG4gIGRpZ2l0ID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKTtcbiAgaWYgKCEvXlxcZCskLy50ZXN0KGRpZ2l0KSkge1xuICAgIHJldHVybjtcbiAgfVxuICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgdmFsID0gUUoudmFsKHRhcmdldCkgKyBkaWdpdDtcbiAgaWYgKC9eXFxkJC8udGVzdCh2YWwpICYmICh2YWwgIT09ICcwJyAmJiB2YWwgIT09ICcxJykpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIFwiMFwiICsgdmFsICsgXCIgLyBcIik7XG4gIH0gZWxzZSBpZiAoL15cXGRcXGQkLy50ZXN0KHZhbCkpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIHZhbCArIFwiIC8gXCIpO1xuICB9XG59O1xuXG5mb3JtYXRNb250aEV4cGlyeSA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIGRpZ2l0LCB0YXJnZXQsIHZhbDtcbiAgZGlnaXQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpO1xuICBpZiAoIS9eXFxkKyQvLnRlc3QoZGlnaXQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRhcmdldCA9IGUudGFyZ2V0O1xuICB2YWwgPSBRSi52YWwodGFyZ2V0KSArIGRpZ2l0O1xuICBpZiAoL15cXGQkLy50ZXN0KHZhbCkgJiYgKHZhbCAhPT0gJzAnICYmIHZhbCAhPT0gJzEnKSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgXCIwXCIgKyB2YWwpO1xuICB9IGVsc2UgaWYgKC9eXFxkXFxkJC8udGVzdCh2YWwpKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCBcIlwiICsgdmFsKTtcbiAgfVxufTtcblxuZm9ybWF0Rm9yd2FyZEV4cGlyeSA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIGRpZ2l0LCB0YXJnZXQsIHZhbDtcbiAgZGlnaXQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpO1xuICBpZiAoIS9eXFxkKyQvLnRlc3QoZGlnaXQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRhcmdldCA9IGUudGFyZ2V0O1xuICB2YWwgPSBRSi52YWwodGFyZ2V0KTtcbiAgaWYgKC9eXFxkXFxkJC8udGVzdCh2YWwpKSB7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIHZhbCArIFwiIC8gXCIpO1xuICB9XG59O1xuXG5mb3JtYXRGb3J3YXJkU2xhc2ggPSBmdW5jdGlvbihlKSB7XG4gIHZhciBzbGFzaCwgdGFyZ2V0LCB2YWw7XG4gIHNsYXNoID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKTtcbiAgaWYgKHNsYXNoICE9PSAnLycpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gIHZhbCA9IFFKLnZhbCh0YXJnZXQpO1xuICBpZiAoL15cXGQkLy50ZXN0KHZhbCkgJiYgdmFsICE9PSAnMCcpIHtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgXCIwXCIgKyB2YWwgKyBcIiAvIFwiKTtcbiAgfVxufTtcblxuZm9ybWF0QmFja0V4cGlyeSA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIHRhcmdldCwgdmFsdWU7XG4gIGlmIChlLm1ldGFLZXkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gIHZhbHVlID0gUUoudmFsKHRhcmdldCk7XG4gIGlmIChlLndoaWNoICE9PSA4KSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICgodGFyZ2V0LnNlbGVjdGlvblN0YXJ0ICE9IG51bGwpICYmIHRhcmdldC5zZWxlY3Rpb25TdGFydCAhPT0gdmFsdWUubGVuZ3RoKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICgvXFxkKFxcc3xcXC8pKyQvLnRlc3QodmFsdWUpKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCB2YWx1ZS5yZXBsYWNlKC9cXGQoXFxzfFxcLykqJC8sICcnKSk7XG4gIH0gZWxzZSBpZiAoL1xcc1xcL1xccz9cXGQ/JC8udGVzdCh2YWx1ZSkpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIHZhbHVlLnJlcGxhY2UoL1xcc1xcL1xccz9cXGQ/JC8sICcnKSk7XG4gIH1cbn07XG5cbnJlc3RyaWN0TnVtZXJpYyA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIGlucHV0O1xuICBpZiAoZS5tZXRhS2V5IHx8IGUuY3RybEtleSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmIChlLndoaWNoID09PSAzMikge1xuICAgIHJldHVybiBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH1cbiAgaWYgKGUud2hpY2ggPT09IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAoZS53aGljaCA8IDMzKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaW5wdXQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpO1xuICBpZiAoIS9bXFxkXFxzXS8udGVzdChpbnB1dCkpIHtcbiAgICByZXR1cm4gZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG59O1xuXG5yZXN0cmljdENhcmROdW1iZXIgPSBmdW5jdGlvbihlKSB7XG4gIHZhciBjYXJkLCBkaWdpdCwgdGFyZ2V0LCB2YWx1ZTtcbiAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gIGRpZ2l0ID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKTtcbiAgaWYgKCEvXlxcZCskLy50ZXN0KGRpZ2l0KSkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoaGFzVGV4dFNlbGVjdGVkKHRhcmdldCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFsdWUgPSAoUUoudmFsKHRhcmdldCkgKyBkaWdpdCkucmVwbGFjZSgvXFxEL2csICcnKTtcbiAgY2FyZCA9IGNhcmRGcm9tTnVtYmVyKHZhbHVlKTtcbiAgaWYgKGNhcmQpIHtcbiAgICBpZiAoISh2YWx1ZS5sZW5ndGggPD0gY2FyZC5sZW5ndGhbY2FyZC5sZW5ndGgubGVuZ3RoIC0gMV0pKSB7XG4gICAgICByZXR1cm4gZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoISh2YWx1ZS5sZW5ndGggPD0gMTYpKSB7XG4gICAgICByZXR1cm4gZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfVxufTtcblxucmVzdHJpY3RFeHBpcnkgPSBmdW5jdGlvbihlLCBsZW5ndGgpIHtcbiAgdmFyIGRpZ2l0LCB0YXJnZXQsIHZhbHVlO1xuICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgZGlnaXQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpO1xuICBpZiAoIS9eXFxkKyQvLnRlc3QoZGlnaXQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChoYXNUZXh0U2VsZWN0ZWQodGFyZ2V0KSkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YWx1ZSA9IFFKLnZhbCh0YXJnZXQpICsgZGlnaXQ7XG4gIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvXFxEL2csICcnKTtcbiAgaWYgKHZhbHVlLmxlbmd0aCA+IGxlbmd0aCkge1xuICAgIHJldHVybiBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH1cbn07XG5cbnJlc3RyaWN0Q29tYmluZWRFeHBpcnkgPSBmdW5jdGlvbihlKSB7XG4gIHJldHVybiByZXN0cmljdEV4cGlyeShlLCA2KTtcbn07XG5cbnJlc3RyaWN0TW9udGhFeHBpcnkgPSBmdW5jdGlvbihlKSB7XG4gIHJldHVybiByZXN0cmljdEV4cGlyeShlLCAyKTtcbn07XG5cbnJlc3RyaWN0WWVhckV4cGlyeSA9IGZ1bmN0aW9uKGUpIHtcbiAgcmV0dXJuIHJlc3RyaWN0RXhwaXJ5KGUsIDQpO1xufTtcblxucmVzdHJpY3RDVkMgPSBmdW5jdGlvbihlKSB7XG4gIHZhciBkaWdpdCwgdGFyZ2V0LCB2YWw7XG4gIHRhcmdldCA9IGUudGFyZ2V0O1xuICBkaWdpdCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZS53aGljaCk7XG4gIGlmICghL15cXGQrJC8udGVzdChkaWdpdCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGhhc1RleHRTZWxlY3RlZCh0YXJnZXQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhbCA9IFFKLnZhbCh0YXJnZXQpICsgZGlnaXQ7XG4gIGlmICghKHZhbC5sZW5ndGggPD0gNCkpIHtcbiAgICByZXR1cm4gZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG59O1xuXG5zZXRDYXJkVHlwZSA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIGFsbFR5cGVzLCBjYXJkLCBjYXJkVHlwZSwgdGFyZ2V0LCB2YWw7XG4gIHRhcmdldCA9IGUudGFyZ2V0O1xuICB2YWwgPSBRSi52YWwodGFyZ2V0KTtcbiAgY2FyZFR5cGUgPSBQYXltZW50LmZucy5jYXJkVHlwZSh2YWwpIHx8ICd1bmtub3duJztcbiAgaWYgKCFRSi5oYXNDbGFzcyh0YXJnZXQsIGNhcmRUeXBlKSkge1xuICAgIGFsbFR5cGVzID0gKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGksIGxlbiwgcmVzdWx0cztcbiAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgIGZvciAoaSA9IDAsIGxlbiA9IGNhcmRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGNhcmQgPSBjYXJkc1tpXTtcbiAgICAgICAgcmVzdWx0cy5wdXNoKGNhcmQudHlwZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9KSgpO1xuICAgIFFKLnJlbW92ZUNsYXNzKHRhcmdldCwgJ3Vua25vd24nKTtcbiAgICBRSi5yZW1vdmVDbGFzcyh0YXJnZXQsIGFsbFR5cGVzLmpvaW4oJyAnKSk7XG4gICAgUUouYWRkQ2xhc3ModGFyZ2V0LCBjYXJkVHlwZSk7XG4gICAgUUoudG9nZ2xlQ2xhc3ModGFyZ2V0LCAnaWRlbnRpZmllZCcsIGNhcmRUeXBlICE9PSAndW5rbm93bicpO1xuICAgIHJldHVybiBRSi50cmlnZ2VyKHRhcmdldCwgJ3BheW1lbnQuY2FyZFR5cGUnLCBjYXJkVHlwZSk7XG4gIH1cbn07XG5cblBheW1lbnQgPSAoZnVuY3Rpb24oKSB7XG4gIGZ1bmN0aW9uIFBheW1lbnQoKSB7fVxuXG4gIFBheW1lbnQuZm5zID0ge1xuICAgIGNhcmRFeHBpcnlWYWw6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICB2YXIgbW9udGgsIHByZWZpeCwgcmVmLCB5ZWFyO1xuICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9cXHMvZywgJycpO1xuICAgICAgcmVmID0gdmFsdWUuc3BsaXQoJy8nLCAyKSwgbW9udGggPSByZWZbMF0sIHllYXIgPSByZWZbMV07XG4gICAgICBpZiAoKHllYXIgIT0gbnVsbCA/IHllYXIubGVuZ3RoIDogdm9pZCAwKSA9PT0gMiAmJiAvXlxcZCskLy50ZXN0KHllYXIpKSB7XG4gICAgICAgIHByZWZpeCA9IChuZXcgRGF0ZSkuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgcHJlZml4ID0gcHJlZml4LnRvU3RyaW5nKCkuc2xpY2UoMCwgMik7XG4gICAgICAgIHllYXIgPSBwcmVmaXggKyB5ZWFyO1xuICAgICAgfVxuICAgICAgbW9udGggPSBwYXJzZUludChtb250aCwgMTApO1xuICAgICAgeWVhciA9IHBhcnNlSW50KHllYXIsIDEwKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG1vbnRoOiBtb250aCxcbiAgICAgICAgeWVhcjogeWVhclxuICAgICAgfTtcbiAgICB9LFxuICAgIHZhbGlkYXRlQ2FyZE51bWJlcjogZnVuY3Rpb24obnVtKSB7XG4gICAgICB2YXIgY2FyZCwgcmVmO1xuICAgICAgbnVtID0gKG51bSArICcnKS5yZXBsYWNlKC9cXHMrfC0vZywgJycpO1xuICAgICAgaWYgKCEvXlxcZCskLy50ZXN0KG51bSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgY2FyZCA9IGNhcmRGcm9tTnVtYmVyKG51bSk7XG4gICAgICBpZiAoIWNhcmQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIChyZWYgPSBudW0ubGVuZ3RoLCBpbmRleE9mLmNhbGwoY2FyZC5sZW5ndGgsIHJlZikgPj0gMCkgJiYgKGNhcmQubHVobiA9PT0gZmFsc2UgfHwgbHVobkNoZWNrKG51bSkpO1xuICAgIH0sXG4gICAgdmFsaWRhdGVDYXJkRXhwaXJ5OiBmdW5jdGlvbihtb250aCwgeWVhcikge1xuICAgICAgdmFyIGN1cnJlbnRUaW1lLCBleHBpcnksIHByZWZpeCwgcmVmO1xuICAgICAgaWYgKHR5cGVvZiBtb250aCA9PT0gJ29iamVjdCcgJiYgJ21vbnRoJyBpbiBtb250aCkge1xuICAgICAgICByZWYgPSBtb250aCwgbW9udGggPSByZWYubW9udGgsIHllYXIgPSByZWYueWVhcjtcbiAgICAgIH1cbiAgICAgIGlmICghKG1vbnRoICYmIHllYXIpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIG1vbnRoID0gUUoudHJpbShtb250aCk7XG4gICAgICB5ZWFyID0gUUoudHJpbSh5ZWFyKTtcbiAgICAgIGlmICghL15cXGQrJC8udGVzdChtb250aCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKCEvXlxcZCskLy50ZXN0KHllYXIpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICghKHBhcnNlSW50KG1vbnRoLCAxMCkgPD0gMTIpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICh5ZWFyLmxlbmd0aCA9PT0gMikge1xuICAgICAgICBwcmVmaXggPSAobmV3IERhdGUpLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgIHByZWZpeCA9IHByZWZpeC50b1N0cmluZygpLnNsaWNlKDAsIDIpO1xuICAgICAgICB5ZWFyID0gcHJlZml4ICsgeWVhcjtcbiAgICAgIH1cbiAgICAgIGV4cGlyeSA9IG5ldyBEYXRlKHllYXIsIG1vbnRoKTtcbiAgICAgIGN1cnJlbnRUaW1lID0gbmV3IERhdGU7XG4gICAgICBleHBpcnkuc2V0TW9udGgoZXhwaXJ5LmdldE1vbnRoKCkgLSAxKTtcbiAgICAgIGV4cGlyeS5zZXRNb250aChleHBpcnkuZ2V0TW9udGgoKSArIDEsIDEpO1xuICAgICAgcmV0dXJuIGV4cGlyeSA+IGN1cnJlbnRUaW1lO1xuICAgIH0sXG4gICAgdmFsaWRhdGVDYXJkQ1ZDOiBmdW5jdGlvbihjdmMsIHR5cGUpIHtcbiAgICAgIHZhciByZWYsIHJlZjE7XG4gICAgICBjdmMgPSBRSi50cmltKGN2Yyk7XG4gICAgICBpZiAoIS9eXFxkKyQvLnRlc3QoY3ZjKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAodHlwZSAmJiBjYXJkRnJvbVR5cGUodHlwZSkpIHtcbiAgICAgICAgcmV0dXJuIHJlZiA9IGN2Yy5sZW5ndGgsIGluZGV4T2YuY2FsbCgocmVmMSA9IGNhcmRGcm9tVHlwZSh0eXBlKSkgIT0gbnVsbCA/IHJlZjEuY3ZjTGVuZ3RoIDogdm9pZCAwLCByZWYpID49IDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gY3ZjLmxlbmd0aCA+PSAzICYmIGN2Yy5sZW5ndGggPD0gNDtcbiAgICAgIH1cbiAgICB9LFxuICAgIGNhcmRUeXBlOiBmdW5jdGlvbihudW0pIHtcbiAgICAgIHZhciByZWY7XG4gICAgICBpZiAoIW51bSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIHJldHVybiAoKHJlZiA9IGNhcmRGcm9tTnVtYmVyKG51bSkpICE9IG51bGwgPyByZWYudHlwZSA6IHZvaWQgMCkgfHwgbnVsbDtcbiAgICB9LFxuICAgIGZvcm1hdENhcmROdW1iZXI6IGZ1bmN0aW9uKG51bSkge1xuICAgICAgdmFyIGNhcmQsIGdyb3VwcywgcmVmLCB1cHBlckxlbmd0aDtcbiAgICAgIGNhcmQgPSBjYXJkRnJvbU51bWJlcihudW0pO1xuICAgICAgaWYgKCFjYXJkKSB7XG4gICAgICAgIHJldHVybiBudW07XG4gICAgICB9XG4gICAgICB1cHBlckxlbmd0aCA9IGNhcmQubGVuZ3RoW2NhcmQubGVuZ3RoLmxlbmd0aCAtIDFdO1xuICAgICAgbnVtID0gbnVtLnJlcGxhY2UoL1xcRC9nLCAnJyk7XG4gICAgICBudW0gPSBudW0uc2xpY2UoMCwgK3VwcGVyTGVuZ3RoICsgMSB8fCA5ZTkpO1xuICAgICAgaWYgKGNhcmQuZm9ybWF0Lmdsb2JhbCkge1xuICAgICAgICByZXR1cm4gKHJlZiA9IG51bS5tYXRjaChjYXJkLmZvcm1hdCkpICE9IG51bGwgPyByZWYuam9pbignICcpIDogdm9pZCAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZ3JvdXBzID0gY2FyZC5mb3JtYXQuZXhlYyhudW0pO1xuICAgICAgICBpZiAoZ3JvdXBzICE9IG51bGwpIHtcbiAgICAgICAgICBncm91cHMuc2hpZnQoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZ3JvdXBzICE9IG51bGwgPyBncm91cHMuam9pbignICcpIDogdm9pZCAwO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBQYXltZW50LnJlc3RyaWN0TnVtZXJpYyA9IGZ1bmN0aW9uKGVsKSB7XG4gICAgcmV0dXJuIFFKLm9uKGVsLCAna2V5cHJlc3MnLCByZXN0cmljdE51bWVyaWMpO1xuICB9O1xuXG4gIFBheW1lbnQuY2FyZEV4cGlyeVZhbCA9IGZ1bmN0aW9uKGVsKSB7XG4gICAgcmV0dXJuIFBheW1lbnQuZm5zLmNhcmRFeHBpcnlWYWwoUUoudmFsKGVsKSk7XG4gIH07XG5cbiAgUGF5bWVudC5mb3JtYXRDYXJkQ1ZDID0gZnVuY3Rpb24oZWwpIHtcbiAgICBQYXltZW50LnJlc3RyaWN0TnVtZXJpYyhlbCk7XG4gICAgUUoub24oZWwsICdrZXlwcmVzcycsIHJlc3RyaWN0Q1ZDKTtcbiAgICByZXR1cm4gZWw7XG4gIH07XG5cbiAgUGF5bWVudC5mb3JtYXRDYXJkRXhwaXJ5ID0gZnVuY3Rpb24oZWwpIHtcbiAgICB2YXIgbW9udGgsIHllYXI7XG4gICAgUGF5bWVudC5yZXN0cmljdE51bWVyaWMoZWwpO1xuICAgIGlmIChlbC5sZW5ndGggJiYgZWwubGVuZ3RoID09PSAyKSB7XG4gICAgICBtb250aCA9IGVsWzBdLCB5ZWFyID0gZWxbMV07XG4gICAgICB0aGlzLmZvcm1hdENhcmRFeHBpcnlNdWx0aXBsZShtb250aCwgeWVhcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIFFKLm9uKGVsLCAna2V5cHJlc3MnLCByZXN0cmljdENvbWJpbmVkRXhwaXJ5KTtcbiAgICAgIFFKLm9uKGVsLCAna2V5cHJlc3MnLCBmb3JtYXRFeHBpcnkpO1xuICAgICAgUUoub24oZWwsICdrZXlwcmVzcycsIGZvcm1hdEZvcndhcmRTbGFzaCk7XG4gICAgICBRSi5vbihlbCwgJ2tleXByZXNzJywgZm9ybWF0Rm9yd2FyZEV4cGlyeSk7XG4gICAgICBRSi5vbihlbCwgJ2tleWRvd24nLCBmb3JtYXRCYWNrRXhwaXJ5KTtcbiAgICB9XG4gICAgcmV0dXJuIGVsO1xuICB9O1xuXG4gIFBheW1lbnQuZm9ybWF0Q2FyZEV4cGlyeU11bHRpcGxlID0gZnVuY3Rpb24obW9udGgsIHllYXIpIHtcbiAgICBRSi5vbihtb250aCwgJ2tleXByZXNzJywgcmVzdHJpY3RNb250aEV4cGlyeSk7XG4gICAgUUoub24obW9udGgsICdrZXlwcmVzcycsIGZvcm1hdE1vbnRoRXhwaXJ5KTtcbiAgICByZXR1cm4gUUoub24oeWVhciwgJ2tleXByZXNzJywgcmVzdHJpY3RZZWFyRXhwaXJ5KTtcbiAgfTtcblxuICBQYXltZW50LmZvcm1hdENhcmROdW1iZXIgPSBmdW5jdGlvbihlbCkge1xuICAgIFBheW1lbnQucmVzdHJpY3ROdW1lcmljKGVsKTtcbiAgICBRSi5vbihlbCwgJ2tleXByZXNzJywgcmVzdHJpY3RDYXJkTnVtYmVyKTtcbiAgICBRSi5vbihlbCwgJ2tleXByZXNzJywgZm9ybWF0Q2FyZE51bWJlcik7XG4gICAgUUoub24oZWwsICdrZXlkb3duJywgZm9ybWF0QmFja0NhcmROdW1iZXIpO1xuICAgIFFKLm9uKGVsLCAna2V5dXAnLCBzZXRDYXJkVHlwZSk7XG4gICAgUUoub24oZWwsICdwYXN0ZScsIHJlRm9ybWF0Q2FyZE51bWJlcik7XG4gICAgcmV0dXJuIGVsO1xuICB9O1xuXG4gIFBheW1lbnQuZ2V0Q2FyZEFycmF5ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGNhcmRzO1xuICB9O1xuXG4gIFBheW1lbnQuc2V0Q2FyZEFycmF5ID0gZnVuY3Rpb24oY2FyZEFycmF5KSB7XG4gICAgY2FyZHMgPSBjYXJkQXJyYXk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgUGF5bWVudC5hZGRUb0NhcmRBcnJheSA9IGZ1bmN0aW9uKGNhcmRPYmplY3QpIHtcbiAgICByZXR1cm4gY2FyZHMucHVzaChjYXJkT2JqZWN0KTtcbiAgfTtcblxuICBQYXltZW50LnJlbW92ZUZyb21DYXJkQXJyYXkgPSBmdW5jdGlvbih0eXBlKSB7XG4gICAgdmFyIGtleSwgdmFsdWU7XG4gICAgZm9yIChrZXkgaW4gY2FyZHMpIHtcbiAgICAgIHZhbHVlID0gY2FyZHNba2V5XTtcbiAgICAgIGlmICh2YWx1ZS50eXBlID09PSB0eXBlKSB7XG4gICAgICAgIGNhcmRzLnNwbGljZShrZXksIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICByZXR1cm4gUGF5bWVudDtcblxufSkoKTtcblxubW9kdWxlLmV4cG9ydHMgPSBQYXltZW50O1xuXG5nbG9iYWwuUGF5bWVudCA9IFBheW1lbnQ7XG5cblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG59LHtcInFqL3NyYy9xai5jb2ZmZWVcIjoxfV19LHt9LFsyXSkoMilcbn0pOyIsIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkoezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1widXNlIHN0cmljdFwiO3ZhciBfdmFsaWRGb3JtPXJlcXVpcmUoXCIuL3NyYy92YWxpZC1mb3JtXCIpO3ZhciBfdmFsaWRGb3JtMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF92YWxpZEZvcm0pO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKXtyZXR1cm4gb2JqJiZvYmouX19lc01vZHVsZT9vYmo6e2RlZmF1bHQ6b2JqfX13aW5kb3cuVmFsaWRGb3JtPV92YWxpZEZvcm0yLmRlZmF1bHQ7d2luZG93LlZhbGlkRm9ybS50b2dnbGVJbnZhbGlkQ2xhc3M9X3ZhbGlkRm9ybS50b2dnbGVJbnZhbGlkQ2xhc3M7d2luZG93LlZhbGlkRm9ybS5oYW5kbGVDdXN0b21NZXNzYWdlcz1fdmFsaWRGb3JtLmhhbmRsZUN1c3RvbU1lc3NhZ2VzO3dpbmRvdy5WYWxpZEZvcm0uaGFuZGxlQ3VzdG9tTWVzc2FnZURpc3BsYXk9X3ZhbGlkRm9ybS5oYW5kbGVDdXN0b21NZXNzYWdlRGlzcGxheX0se1wiLi9zcmMvdmFsaWQtZm9ybVwiOjN9XSwyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6dHJ1ZX0pO2V4cG9ydHMuY2xvbmU9Y2xvbmU7ZXhwb3J0cy5kZWZhdWx0cz1kZWZhdWx0cztleHBvcnRzLmluc2VydEFmdGVyPWluc2VydEFmdGVyO2V4cG9ydHMuaW5zZXJ0QmVmb3JlPWluc2VydEJlZm9yZTtleHBvcnRzLmZvckVhY2g9Zm9yRWFjaDtleHBvcnRzLmRlYm91bmNlPWRlYm91bmNlO2Z1bmN0aW9uIGNsb25lKG9iail7dmFyIGNvcHk9e307Zm9yKHZhciBhdHRyIGluIG9iail7aWYob2JqLmhhc093blByb3BlcnR5KGF0dHIpKWNvcHlbYXR0cl09b2JqW2F0dHJdfXJldHVybiBjb3B5fWZ1bmN0aW9uIGRlZmF1bHRzKG9iaixkZWZhdWx0T2JqZWN0KXtvYmo9Y2xvbmUob2JqfHx7fSk7Zm9yKHZhciBrIGluIGRlZmF1bHRPYmplY3Qpe2lmKG9ialtrXT09PXVuZGVmaW5lZClvYmpba109ZGVmYXVsdE9iamVjdFtrXX1yZXR1cm4gb2JqfWZ1bmN0aW9uIGluc2VydEFmdGVyKHJlZk5vZGUsbm9kZVRvSW5zZXJ0KXt2YXIgc2libGluZz1yZWZOb2RlLm5leHRTaWJsaW5nO2lmKHNpYmxpbmcpe3ZhciBfcGFyZW50PXJlZk5vZGUucGFyZW50Tm9kZTtfcGFyZW50Lmluc2VydEJlZm9yZShub2RlVG9JbnNlcnQsc2libGluZyl9ZWxzZXtwYXJlbnQuYXBwZW5kQ2hpbGQobm9kZVRvSW5zZXJ0KX19ZnVuY3Rpb24gaW5zZXJ0QmVmb3JlKHJlZk5vZGUsbm9kZVRvSW5zZXJ0KXt2YXIgcGFyZW50PXJlZk5vZGUucGFyZW50Tm9kZTtwYXJlbnQuaW5zZXJ0QmVmb3JlKG5vZGVUb0luc2VydCxyZWZOb2RlKX1mdW5jdGlvbiBmb3JFYWNoKGl0ZW1zLGZuKXtpZighaXRlbXMpcmV0dXJuO2lmKGl0ZW1zLmZvckVhY2gpe2l0ZW1zLmZvckVhY2goZm4pfWVsc2V7Zm9yKHZhciBpPTA7aTxpdGVtcy5sZW5ndGg7aSsrKXtmbihpdGVtc1tpXSxpLGl0ZW1zKX19fWZ1bmN0aW9uIGRlYm91bmNlKG1zLGZuKXt2YXIgdGltZW91dD12b2lkIDA7dmFyIGRlYm91bmNlZEZuPWZ1bmN0aW9uIGRlYm91bmNlZEZuKCl7Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO3RpbWVvdXQ9c2V0VGltZW91dChmbixtcyl9O3JldHVybiBkZWJvdW5jZWRGbn19LHt9XSwzOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6dHJ1ZX0pO2V4cG9ydHMudG9nZ2xlSW52YWxpZENsYXNzPXRvZ2dsZUludmFsaWRDbGFzcztleHBvcnRzLmhhbmRsZUN1c3RvbU1lc3NhZ2VzPWhhbmRsZUN1c3RvbU1lc3NhZ2VzO2V4cG9ydHMuaGFuZGxlQ3VzdG9tTWVzc2FnZURpc3BsYXk9aGFuZGxlQ3VzdG9tTWVzc2FnZURpc3BsYXk7ZXhwb3J0cy5kZWZhdWx0PXZhbGlkRm9ybTt2YXIgX3V0aWw9cmVxdWlyZShcIi4vdXRpbFwiKTtmdW5jdGlvbiB0b2dnbGVJbnZhbGlkQ2xhc3MoaW5wdXQsaW52YWxpZENsYXNzKXtpbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiaW52YWxpZFwiLGZ1bmN0aW9uKCl7aW5wdXQuY2xhc3NMaXN0LmFkZChpbnZhbGlkQ2xhc3MpfSk7aW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsZnVuY3Rpb24oKXtpZihpbnB1dC52YWxpZGl0eS52YWxpZCl7aW5wdXQuY2xhc3NMaXN0LnJlbW92ZShpbnZhbGlkQ2xhc3MpfX0pfXZhciBlcnJvclByb3BzPVtcImJhZElucHV0XCIsXCJwYXR0ZXJuTWlzbWF0Y2hcIixcInJhbmdlT3ZlcmZsb3dcIixcInJhbmdlVW5kZXJmbG93XCIsXCJzdGVwTWlzbWF0Y2hcIixcInRvb0xvbmdcIixcInRvb1Nob3J0XCIsXCJ0eXBlTWlzbWF0Y2hcIixcInZhbHVlTWlzc2luZ1wiLFwiY3VzdG9tRXJyb3JcIl07ZnVuY3Rpb24gZ2V0Q3VzdG9tTWVzc2FnZShpbnB1dCxjdXN0b21NZXNzYWdlcyl7Y3VzdG9tTWVzc2FnZXM9Y3VzdG9tTWVzc2FnZXN8fHt9O3ZhciBsb2NhbEVycm9yUHJvcHM9W2lucHV0LnR5cGUrXCJNaXNtYXRjaFwiXS5jb25jYXQoZXJyb3JQcm9wcyk7dmFyIHZhbGlkaXR5PWlucHV0LnZhbGlkaXR5O2Zvcih2YXIgaT0wO2k8bG9jYWxFcnJvclByb3BzLmxlbmd0aDtpKyspe3ZhciBwcm9wPWxvY2FsRXJyb3JQcm9wc1tpXTtpZih2YWxpZGl0eVtwcm9wXSl7cmV0dXJuIGlucHV0LmdldEF0dHJpYnV0ZShcImRhdGEtXCIrcHJvcCl8fGN1c3RvbU1lc3NhZ2VzW3Byb3BdfX19ZnVuY3Rpb24gaGFuZGxlQ3VzdG9tTWVzc2FnZXMoaW5wdXQsY3VzdG9tTWVzc2FnZXMpe2Z1bmN0aW9uIGNoZWNrVmFsaWRpdHkoKXt2YXIgbWVzc2FnZT1pbnB1dC52YWxpZGl0eS52YWxpZD9udWxsOmdldEN1c3RvbU1lc3NhZ2UoaW5wdXQsY3VzdG9tTWVzc2FnZXMpO2lucHV0LnNldEN1c3RvbVZhbGlkaXR5KG1lc3NhZ2V8fFwiXCIpfWlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLGNoZWNrVmFsaWRpdHkpO2lucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnZhbGlkXCIsY2hlY2tWYWxpZGl0eSl9ZnVuY3Rpb24gaGFuZGxlQ3VzdG9tTWVzc2FnZURpc3BsYXkoaW5wdXQsb3B0aW9ucyl7dmFyIHZhbGlkYXRpb25FcnJvckNsYXNzPW9wdGlvbnMudmFsaWRhdGlvbkVycm9yQ2xhc3MsdmFsaWRhdGlvbkVycm9yUGFyZW50Q2xhc3M9b3B0aW9ucy52YWxpZGF0aW9uRXJyb3JQYXJlbnRDbGFzcyxlcnJvclBsYWNlbWVudD1vcHRpb25zLmVycm9yUGxhY2VtZW50O2Z1bmN0aW9uIGNoZWNrVmFsaWRpdHkob3B0aW9ucyl7dmFyIGluc2VydEVycm9yPW9wdGlvbnMuaW5zZXJ0RXJyb3I7dmFyIHBhcmVudE5vZGU9aW5wdXQucGFyZW50Tm9kZTt2YXIgZXJyb3JOb2RlPXBhcmVudE5vZGUucXVlcnlTZWxlY3RvcihcIi5cIit2YWxpZGF0aW9uRXJyb3JDbGFzcyl8fGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7aWYoIWlucHV0LnZhbGlkaXR5LnZhbGlkJiZpbnB1dC52YWxpZGF0aW9uTWVzc2FnZSl7ZXJyb3JOb2RlLmNsYXNzTmFtZT12YWxpZGF0aW9uRXJyb3JDbGFzcztlcnJvck5vZGUudGV4dENvbnRlbnQ9aW5wdXQudmFsaWRhdGlvbk1lc3NhZ2U7aWYoaW5zZXJ0RXJyb3Ipe2Vycm9yUGxhY2VtZW50PT09XCJiZWZvcmVcIj8oMCxfdXRpbC5pbnNlcnRCZWZvcmUpKGlucHV0LGVycm9yTm9kZSk6KDAsX3V0aWwuaW5zZXJ0QWZ0ZXIpKGlucHV0LGVycm9yTm9kZSk7cGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKHZhbGlkYXRpb25FcnJvclBhcmVudENsYXNzKX19ZWxzZXtwYXJlbnROb2RlLmNsYXNzTGlzdC5yZW1vdmUodmFsaWRhdGlvbkVycm9yUGFyZW50Q2xhc3MpO2Vycm9yTm9kZS5yZW1vdmUoKX19aW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsZnVuY3Rpb24oKXtjaGVja1ZhbGlkaXR5KHtpbnNlcnRFcnJvcjpmYWxzZX0pfSk7aW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImludmFsaWRcIixmdW5jdGlvbihlKXtlLnByZXZlbnREZWZhdWx0KCk7Y2hlY2tWYWxpZGl0eSh7aW5zZXJ0RXJyb3I6dHJ1ZX0pfSl9dmFyIGRlZmF1bHRPcHRpb25zPXtpbnZhbGlkQ2xhc3M6XCJpbnZhbGlkXCIsdmFsaWRhdGlvbkVycm9yQ2xhc3M6XCJ2YWxpZGF0aW9uLWVycm9yXCIsdmFsaWRhdGlvbkVycm9yUGFyZW50Q2xhc3M6XCJoYXMtdmFsaWRhdGlvbi1lcnJvclwiLGN1c3RvbU1lc3NhZ2VzOnt9LGVycm9yUGxhY2VtZW50OlwiYmVmb3JlXCJ9O2Z1bmN0aW9uIHZhbGlkRm9ybShlbGVtZW50LG9wdGlvbnMpe2lmKCFlbGVtZW50fHwhZWxlbWVudC5ub2RlTmFtZSl7dGhyb3cgbmV3IEVycm9yKFwiRmlyc3QgYXJnIHRvIHZhbGlkRm9ybSBtdXN0IGJlIGEgZm9ybSwgaW5wdXQsIHNlbGVjdCwgb3IgdGV4dGFyZWFcIil9dmFyIGlucHV0cz12b2lkIDA7dmFyIHR5cGU9ZWxlbWVudC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO29wdGlvbnM9KDAsX3V0aWwuZGVmYXVsdHMpKG9wdGlvbnMsZGVmYXVsdE9wdGlvbnMpO2lmKHR5cGU9PT1cImZvcm1cIil7aW5wdXRzPWVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChcImlucHV0LCBzZWxlY3QsIHRleHRhcmVhXCIpO2ZvY3VzSW52YWxpZElucHV0KGVsZW1lbnQsaW5wdXRzKX1lbHNlIGlmKHR5cGU9PT1cImlucHV0XCJ8fHR5cGU9PT1cInNlbGVjdFwifHx0eXBlPT09XCJ0ZXh0YXJlYVwiKXtpbnB1dHM9W2VsZW1lbnRdfWVsc2V7dGhyb3cgbmV3IEVycm9yKFwiT25seSBmb3JtLCBpbnB1dCwgc2VsZWN0LCBvciB0ZXh0YXJlYSBlbGVtZW50cyBhcmUgc3VwcG9ydGVkXCIpfXZhbGlkRm9ybUlucHV0cyhpbnB1dHMsb3B0aW9ucyl9ZnVuY3Rpb24gZm9jdXNJbnZhbGlkSW5wdXQoZm9ybSxpbnB1dHMpe3ZhciBmb2N1c0ZpcnN0PSgwLF91dGlsLmRlYm91bmNlKSgxMDAsZnVuY3Rpb24oKXt2YXIgaW52YWxpZE5vZGU9Zm9ybS5xdWVyeVNlbGVjdG9yKFwiOmludmFsaWRcIik7aWYoaW52YWxpZE5vZGUpaW52YWxpZE5vZGUuZm9jdXMoKX0pOygwLF91dGlsLmZvckVhY2gpKGlucHV0cyxmdW5jdGlvbihpbnB1dCl7cmV0dXJuIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnZhbGlkXCIsZm9jdXNGaXJzdCl9KX1mdW5jdGlvbiB2YWxpZEZvcm1JbnB1dHMoaW5wdXRzLG9wdGlvbnMpe3ZhciBpbnZhbGlkQ2xhc3M9b3B0aW9ucy5pbnZhbGlkQ2xhc3MsY3VzdG9tTWVzc2FnZXM9b3B0aW9ucy5jdXN0b21NZXNzYWdlczsoMCxfdXRpbC5mb3JFYWNoKShpbnB1dHMsZnVuY3Rpb24oaW5wdXQpe3RvZ2dsZUludmFsaWRDbGFzcyhpbnB1dCxpbnZhbGlkQ2xhc3MpO2hhbmRsZUN1c3RvbU1lc3NhZ2VzKGlucHV0LGN1c3RvbU1lc3NhZ2VzKTtoYW5kbGVDdXN0b21NZXNzYWdlRGlzcGxheShpbnB1dCxvcHRpb25zKX0pfX0se1wiLi91dGlsXCI6Mn1dfSx7fSxbMV0pOyIsIi8vIE1pbm5Qb3N0IEdpdmluZyBwbHVnaW5cbi8vIHRoZSBzZW1pLWNvbG9uIGJlZm9yZSBmdW5jdGlvbiBpbnZvY2F0aW9uIGlzIGEgc2FmZXR5IG5ldCBhZ2FpbnN0IGNvbmNhdGVuYXRlZFxuLy8gc2NyaXB0cyBhbmQvb3Igb3RoZXIgcGx1Z2lucyB3aGljaCBtYXkgbm90IGJlIGNsb3NlZCBwcm9wZXJseS5cbjsoZnVuY3Rpb24gKCAkLCB3aW5kb3csIGRvY3VtZW50LCB1bmRlZmluZWQgKSB7XG5cbiAgLy8gdW5kZWZpbmVkIGlzIHVzZWQgaGVyZSBhcyB0aGUgdW5kZWZpbmVkIGdsb2JhbCB2YXJpYWJsZSBpbiBFQ01BU2NyaXB0IDMgaXNcbiAgLy8gbXV0YWJsZSAoaWUuIGl0IGNhbiBiZSBjaGFuZ2VkIGJ5IHNvbWVvbmUgZWxzZSkuIHVuZGVmaW5lZCBpc24ndCByZWFsbHkgYmVpbmdcbiAgLy8gcGFzc2VkIGluIHNvIHdlIGNhbiBlbnN1cmUgdGhlIHZhbHVlIG9mIGl0IGlzIHRydWx5IHVuZGVmaW5lZC4gSW4gRVM1LCB1bmRlZmluZWRcbiAgLy8gY2FuIG5vIGxvbmdlciBiZSBtb2RpZmllZC5cblxuICAvLyB3aW5kb3cgYW5kIGRvY3VtZW50IGFyZSBwYXNzZWQgdGhyb3VnaCBhcyBsb2NhbCB2YXJpYWJsZSByYXRoZXIgdGhhbiBnbG9iYWxcbiAgLy8gYXMgdGhpcyAoc2xpZ2h0bHkpIHF1aWNrZW5zIHRoZSByZXNvbHV0aW9uIHByb2Nlc3MgYW5kIGNhbiBiZSBtb3JlIGVmZmljaWVudGx5XG4gIC8vIG1pbmlmaWVkIChlc3BlY2lhbGx5IHdoZW4gYm90aCBhcmUgcmVndWxhcmx5IHJlZmVyZW5jZWQgaW4geW91ciBwbHVnaW4pLlxuXG4gIC8vIENyZWF0ZSB0aGUgZGVmYXVsdHMgb25jZVxuICB2YXIgcGx1Z2luTmFtZSA9ICdtaW5ucG9zdF9naXZpbmcnLFxuICBkZWZhdWx0cyA9IHtcbiAgICAnZGVidWcnIDogZmFsc2UsIC8vIHRoaXMgY2FuIGJlIHNldCB0byB0cnVlIG9uIHBhZ2UgbGV2ZWwgb3B0aW9uc1xuICAgICdzdHJpcGVfcHVibGlzaGFibGVfa2V5JyA6ICcnLFxuICAgICdwbGFpZF9lbnYnIDogJycsXG4gICAgJ3BsYWlkX3B1YmxpY19rZXknIDogJycsXG4gICAgJ3BsYWlkX2xpbmsnIDogJyNhdXRob3JpemUtYWNoJyxcbiAgICAnbWlubnBvc3Rfcm9vdCcgOiAnaHR0cHM6Ly93d3cubWlubnBvc3QuY29tJyxcbiAgICAncHJvZ3Jlc3Nfc2VsZWN0b3InIDogJy5tLXN1cHBvcnQtcHJvZ3Jlc3MnLFxuICAgICdkb25hdGVfZm9ybV9zZWxlY3Rvcic6ICcjZG9uYXRlJyxcbiAgICAnY29uZmlybV9mb3JtX3NlbGVjdG9yJyA6ICcjY29uZmlybScsXG4gICAgJ2ZpbmlzaF9zZWN0aW9uX3NlbGVjdG9yJyA6ICcjcGFuZWwtLWNvbmZpcm1hdGlvbicsXG4gICAgJ3BheV9jY19wcm9jZXNzaW5nX3NlbGVjdG9yJyA6ICdpbnB1dFtpZD1cInBheS1mZWVzXCJdJyxcbiAgICAnZmVlX2Ftb3VudCcgOiAnLnByb2Nlc3NpbmctYW1vdW50JyxcbiAgICAnbGV2ZWxfYW1vdW50X3NlbGVjdG9yJyA6ICcjcGFuZWwtLXBheSAuYW1vdW50IC5sZXZlbC1hbW91bnQnLCAvLyB3ZSBjYW4gbWF5YmUgZ2V0IHJpZCBvZiB0aGlzXG4gICAgJ29yaWdpbmFsX2Ftb3VudF9zZWxlY3RvcicgOiAnW25hbWU9XCJhbW91bnRcIl0nLFxuICAgICdmYWlyX21hcmtldF92YWx1ZV9zZWxlY3RvcicgOiAnI2ZhaXJfbWFya2V0X3ZhbHVlJyxcbiAgICAnZnVsbF9hbW91bnRfc2VsZWN0b3InIDogJy5mdWxsLWFtb3VudCcsXG4gICAgJ2luc3RhbGxtZW50X3BlcmlvZF9zZWxlY3RvcicgOiAnW25hbWU9XCJpbnN0YWxsbWVudF9wZXJpb2RcIl0nLFxuICAgICduYW1lX3NlbGVjdG9yJyA6ICcubS1mb3JtLWl0ZW0tZGlzcGxheS1uYW1lJyxcbiAgICAnaW5faG9ub3Jfb3JfbWVtb3J5X2ZpZWxkX3NlbGVjdG9yJyA6ICcubS1mb3JtLWl0ZW0taG9ub3ItbWVtb3J5JyxcbiAgICAnaG9ub3Jfb3JfbWVtb3J5X2Nob29zZXInIDogJ2lucHV0W25hbWU9XCJpbl9ob25vcl9vcl9tZW1vcnlcIl0nLCAvLyByYWRpbyBmaWVsZHNcbiAgICAnaG9ub3JfdHlwZV9zZWxlY3RvcicgOiAnLmEtaG9ub3ItdHlwZScsIC8vIHNwYW4gaW5zaWRlIGxhYmVsXG4gICAgJ2hvbm9yX21lbW9yeV9pbnB1dF9ncm91cCcgOiAnLmEtaG9ub3Itb3ItbWVtb3J5JywgLy8gaG9sZHMgdGhlIGZvcm0gZmllbGRcbiAgICAnYW5vbnltb3VzX3NlbGVjdG9yJyA6ICcjYW5vbnltb3VzJyxcbiAgICAnc2hvd19iaWxsaW5nX2NvdW50cnlfc2VsZWN0b3InIDogJyNiaWxsaW5nX3Nob3dfY291bnRyeScsXG4gICAgJ2JpbGxpbmdfY291bnRyeV9zZWxlY3RvcicgOiAnLm0tZm9ybS1pdGVtLWNvdW50cnknLFxuICAgICdzaG93X3NoaXBwaW5nX2NvdW50cnlfc2VsZWN0b3InIDogJyNzaGlwcGluZ19zaG93X2NvdW50cnknLFxuICAgICdzaGlwcGluZ19jb3VudHJ5X3NlbGVjdG9yJyA6ICcubS1mb3JtLWl0ZW0tc2hpcHBpbmctY291bnRyeScsXG4gICAgJ3NoaXBwaW5nX2FkZHJlc3Nfc2VsZWN0b3InIDogJy5tLWZvcm0taXRlbS1zaGlwcGluZy1hZGRyZXNzJyxcbiAgICAndXNlX2Zvcl9zaGlwcGluZ19zZWxlY3RvcicgOiAnI3VzZWZvcnNoaXBwaW5nJyxcbiAgICAnZW1haWxfZmllbGRfc2VsZWN0b3InIDogJyNlbWFpbCcsXG4gICAgJ3Bhc3N3b3JkX2ZpZWxkX3NlbGVjdG9yJyA6ICcjcGFzc3dvcmQnLFxuICAgICdmaXJzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yJyA6ICcjZmlyc3RfbmFtZScsXG4gICAgJ2xhc3RfbmFtZV9maWVsZF9zZWxlY3RvcicgOiAnI2xhc3RfbmFtZScsXG4gICAgJ2JpbGxpbmdfc3RyZWV0X2ZpZWxkX3NlbGVjdG9yJyA6ICcjYmlsbGluZ19zdHJlZXQnLFxuICAgICdiaWxsaW5nX2NpdHlfZmllbGRfc2VsZWN0b3InIDogJyNiaWxsaW5nX2NpdHknLFxuICAgICdiaWxsaW5nX3N0YXRlX2ZpZWxkX3NlbGVjdG9yJyA6ICcjYmlsbGluZ19zdGF0ZScsXG4gICAgJ2JpbGxpbmdfemlwX2ZpZWxkX3NlbGVjdG9yJzogJyNiaWxsaW5nX3ppcCcsXG4gICAgJ2JpbGxpbmdfY291bnRyeV9maWVsZF9zZWxlY3RvcicgOiAnI2JpbGxpbmdfY291bnRyeScsXG4gICAgJ2NyZWF0ZV9tcF9zZWxlY3RvcicgOiAnI2NyZWF0ZW1wYWNjb3VudCcsXG4gICAgJ3Bhc3N3b3JkX3NlbGVjdG9yJyA6ICcubS1mb3JtLWl0ZW0tcGFzc3dvcmQnLFxuICAgICdhZGRpdGlvbmFsX2Ftb3VudF9maWVsZCcgOiAnI2FkZGl0aW9uYWxfZG9uYXRpb24nLFxuICAgICdzaGlwcGluZ19zZWxlY3RvcicgOiAnZmllbGRzZXQubS1zaGlwcGluZy1pbmZvcm1hdGlvbicsXG4gICAgJ2Nob29zZV9wYXltZW50JyA6ICcjY2hvb3NlLXBheW1lbnQtbWV0aG9kJyxcbiAgICAncGF5bWVudF9tZXRob2Rfc2VsZWN0b3InIDogJy5wYXltZW50LW1ldGhvZCcsXG4gICAgJ2NjX251bV9zZWxlY3RvcicgOiAnI2NhcmQtbnVtYmVyJyxcbiAgICAnY2NfZXhwX3NlbGVjdG9yJyA6ICcjY2FyZC1leHBpcnknLFxuICAgICdjY19jdmNfc2VsZWN0b3InIDogJyNjYXJkLWN2YycsXG4gICAgJ3BheV9idXR0b25fc2VsZWN0b3InIDogJy5hLWJ1dHRvbi1wYXknLFxuICAgICdvcHBfaWRfc2VsZWN0b3InIDogJyNsb2NrX2tleScsIC8vIHdlIHVzZSB0aGlzIHZhbHVlIGFzIHRoZSBHb29nbGUgQW5hbHl0aWNzIHRyYW5zYWN0aW9uIElEXG4gICAgJ25ld3NsZXR0ZXJfZ3JvdXBfc2VsZWN0b3InIDogJy5zdXBwb3J0LW5ld3NsZXR0ZXJzJ1xuICB9OyAvLyBlbmQgZGVmYXVsdHNcblxuICAvLyBUaGUgYWN0dWFsIHBsdWdpbiBjb25zdHJ1Y3RvclxuICBmdW5jdGlvbiBQbHVnaW4oIGVsZW1lbnQsIG9wdGlvbnMgKSB7XG5cbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuXG4gICAgLy8galF1ZXJ5IGhhcyBhbiBleHRlbmQgbWV0aG9kIHdoaWNoIG1lcmdlcyB0aGUgY29udGVudHMgb2YgdHdvIG9yXG4gICAgLy8gbW9yZSBvYmplY3RzLCBzdG9yaW5nIHRoZSByZXN1bHQgaW4gdGhlIGZpcnN0IG9iamVjdC4gVGhlIGZpcnN0IG9iamVjdFxuICAgIC8vIGlzIGdlbmVyYWxseSBlbXB0eSBhcyB3ZSBkb24ndCB3YW50IHRvIGFsdGVyIHRoZSBkZWZhdWx0IG9wdGlvbnMgZm9yXG4gICAgLy8gZnV0dXJlIGluc3RhbmNlcyBvZiB0aGUgcGx1Z2luXG4gICAgdGhpcy5vcHRpb25zID0gJC5leHRlbmQoIHt9LCBkZWZhdWx0cywgb3B0aW9ucyApO1xuXG4gICAgdGhpcy5fZGVmYXVsdHMgPSBkZWZhdWx0cztcbiAgICB0aGlzLl9uYW1lID0gcGx1Z2luTmFtZTtcblxuICAgIHRoaXMuaW5pdCgpO1xuICB9IC8vIGVuZCBjb25zdHJ1Y3RvclxuXG4gIFBsdWdpbi5wcm90b3R5cGUgPSB7XG5cbiAgICBpbml0OiBmdW5jdGlvbihyZXNldCwgYW1vdW50KSB7XG5cbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSggJ25vLWpzJyApO1xuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCAnanMnICk7XG5cbiAgICAgIC8vIFBsYWNlIGluaXRpYWxpemF0aW9uIGxvZ2ljIGhlcmVcbiAgICAgIC8vIFlvdSBhbHJlYWR5IGhhdmUgYWNjZXNzIHRvIHRoZSBET00gZWxlbWVudCBhbmRcbiAgICAgIC8vIHRoZSBvcHRpb25zIHZpYSB0aGUgaW5zdGFuY2UsIGUuZy4gdGhpcy5lbGVtZW50XG4gICAgICAvLyBhbmQgdGhpcy5vcHRpb25zXG4gICAgICAvLyB5b3UgY2FuIGFkZCBtb3JlIGZ1bmN0aW9ucyBsaWtlIHRoZSBvbmUgYmVsb3cgYW5kXG4gICAgICAvLyBjYWxsIHRoZW0gbGlrZSBzbzogdGhpcy55b3VyT3RoZXJGdW5jdGlvbih0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucykuXG5cbiAgICAgIC8vIG1vZGlmeSBvcHRpb25zIGFzIG5lZWRlZFxuICAgICAgLy92YXIgdGhpcy5vcHRpb25zLmFtb3VudCA9ICcnO1xuICAgICAgaWYgKHJlc2V0ICE9PSB0cnVlKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5hbW91bnQgPSBwYXJzZUZsb2F0KCQodGhpcy5vcHRpb25zLmxldmVsX2Ftb3VudF9zZWxlY3RvciwgdGhpcy5lbGVtZW50KS50ZXh0KCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLmFtb3VudCA9IGFtb3VudDtcbiAgICAgIH1cbiAgICAgIHRoaXMub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQgICAgID0gcGFyc2VJbnQoJCh0aGlzLm9wdGlvbnMub3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yLCB0aGlzLmVsZW1lbnQpLnZhbCgpLCAxMCk7XG4gICAgICB0aGlzLm9wdGlvbnMucHJvY2Vzc2luZ19mZWUgICAgICA9IChNYXRoLnJvdW5kKHBhcnNlRmxvYXQodGhpcy5vcHRpb25zLmZlZV9hbW91bnQpKk1hdGgucG93KDEwLDIpKS9NYXRoLnBvdygxMCwyKSkudG9GaXhlZCgyKTtcbiAgICAgIHRoaXMub3B0aW9ucy5wcm9jZXNzaW5nX2ZlZV90ZXh0ID0gdGhpcy5vcHRpb25zLnByb2Nlc3NpbmdfZmVlO1xuICAgICAgdGhpcy5vcHRpb25zLmNyZWF0ZV9hY2NvdW50ICAgICAgPSBmYWxzZTtcblxuICAgICAgdmFyIGJ1dHRvbl90ZXh0ID0gJCh0aGlzLm9wdGlvbnMucGF5X2J1dHRvbl9zZWxlY3RvcikudGV4dCgpO1xuICAgICAgdGhpcy5vcHRpb25zLmJ1dHRvbl90ZXh0ID0gYnV0dG9uX3RleHQ7XG5cbiAgICAgIHRoaXMuc3RyaXBlID0gU3RyaXBlKHRoaXMub3B0aW9ucy5zdHJpcGVfcHVibGlzaGFibGVfa2V5KTtcbiAgICAgIHRoaXMuZWxlbWVudHMgPSB0aGlzLnN0cmlwZS5lbGVtZW50cyh7XG4gICAgICAgIGZvbnRzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgLy8gaW50ZWdyYXRlIHlvdXIgZm9udCBpbnRvIHN0cmlwZVxuICAgICAgICAgICAgY3NzU3JjOiAnaHR0cHM6Ly91c2UudHlwZWtpdC5uZXQvY3hqN2Z6Zy5jc3MnLFxuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfSk7XG5cbiAgICAgIC8vIHVzZSBhIHJlZmVycmVyIGZvciBlZGl0IGxpbmsgaWYgd2UgaGF2ZSBvbmVcbiAgICAgIGlmIChkb2N1bWVudC5yZWZlcnJlciAhPT0gJycpIHtcbiAgICAgICAgJCgnI2VkaXRfdXJsJykucHJvcCgnaHJlZicsIGRvY3VtZW50LnJlZmVycmVyKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5kZWJ1ZyA9PT0gdHJ1ZSkge1xuICAgICAgICB0aGlzLmRlYnVnKHRoaXMub3B0aW9ucyk7XG4gICAgICAgIC8vIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gY2FsbCBmdW5jdGlvbnNcbiAgICAgIHRoaXMuYW5hbHl0aWNzVHJhY2tpbmcodGhpcy5vcHRpb25zKTsgLy8gdHJhY2sgYW5hbHl0aWNzIGV2ZW50c1xuICAgICAgdGhpcy5hbW91bnRBc1JhZGlvKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gaWYgdGhlIGFtb3VudCBmaWVsZCBpcyBhIHJhZGlvIGJ1dHRvblxuICAgICAgdGhpcy5hbW91bnRVcGRhdGVkKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gaWYgdGhlIGFtb3VudCB0ZXh0IGZpZWxkIGNhbiBjaGFuZ2VcblxuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLnBheV9jY19wcm9jZXNzaW5nX3NlbGVjdG9yKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuY3JlZGl0Q2FyZFByb2Nlc3NpbmdGZWVzKHRoaXMub3B0aW9ucyk7IC8vIHByb2Nlc3NpbmcgZmVlc1xuICAgICAgfVxuICAgICAgXG4gICAgICAvLyB0aGUgbWFpbiBmb3JtIElELiB0aGlzIGlzIG5vdCB1c2VkIGZvciBjYW5jZWxsaW5nXG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5kb25hdGVBbm9ueW1vdXNseSh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIGFub255bW91c1xuICAgICAgICB0aGlzLmhvbm9yT3JNZW1vcnlUb2dnbGUodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBpbiBob25vciBvciBpbiBtZW1vcnkgb2Ygc29tZW9uZVxuICAgICAgICB0aGlzLm91dHNpZGVVbml0ZWRTdGF0ZXModGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBvdXRzaWRlIFVTXG4gICAgICAgIHRoaXMuc2hpcHBpbmdBZGRyZXNzKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gc2hpcHBpbmcgYWRkcmVzc1xuICAgICAgICB0aGlzLmFsbG93TWlubnBvc3RBY2NvdW50KHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gb3B0aW9uIGZvciBjcmVhdGluZyBtaW5ucG9zdCBhY2NvdW50XG4gICAgICAgIHRoaXMuY2hvb3NlUGF5bWVudE1ldGhvZCh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIHN3aXRjaCBiZXR3ZWVuIGNhcmQgYW5kIGFjaFxuICAgICAgICB0aGlzLmNyZWRpdENhcmRGaWVsZHModGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBkbyBzdHVmZiB3aXRoIHRoZSBjcmVkaXQgY2FyZCBmaWVsZHNcbiAgICAgICAgdGhpcy5hY2hGaWVsZHModGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBkbyBzdHVmZiBmb3IgYWNoIHBheW1lbnRzLCBpZiBhcHBsaWNhYmxlIHRvIHRoZSBmb3JtXG4gICAgICAgIHRoaXMudmFsaWRhdGVBbmRTdWJtaXQodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyB2YWxpZGF0ZSBhbmQgc3VibWl0IHRoZSBmb3JtXG4gICAgICB9XG5cbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5jb25maXJtX2Zvcm1fc2VsZWN0b3IpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5zaG93TmV3c2xldHRlclNldHRpbmdzKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTtcbiAgICAgICAgdGhpcy5jb25maXJtTWVzc2FnZVN1Ym1pdCh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIHN1Ym1pdCB0aGUgc3R1ZmYgb24gdGhlIGNvbmZpcm1hdGlvbiBwYWdlXG4gICAgICB9XG5cbiAgICB9LCAvLyBpbml0XG5cbiAgICBkZWJ1ZzogZnVuY3Rpb24obWVzc2FnZSkge1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5kZWJ1ZyA9PT0gdHJ1ZSkge1xuICAgICAgICBpZiAodHlwZW9mIG1lc3NhZ2UgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgY29uc29sZS5sb2cobWVzc2FnZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5kaXIobWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5kaXIodGhpcyk7XG4gICAgICB9XG4gICAgfSwgLy8gZGVidWdcblxuICAgIGFuYWx5dGljc1RyYWNraW5nOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICB2YXIgcHJvZ3Jlc3MgPSAkKG9wdGlvbnMucHJvZ3Jlc3Nfc2VsZWN0b3IpO1xuICAgICAgdmFyIHN0ZXA7XG4gICAgICB2YXIgbmF2X2l0ZW1fY291bnQgPSAwO1xuICAgICAgdmFyIG9wcF9pZCA9ICQob3B0aW9ucy5vcHBfaWRfc2VsZWN0b3IpLnZhbCgpO1xuICAgICAgdmFyIHBvc3RfcHVyY2hhc2UgPSBmYWxzZTtcbiAgICAgIGlmIChwcm9ncmVzcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIG5hdl9pdGVtX2NvdW50ID0gJCgnbGknLCBwcm9ncmVzcykubGVuZ3RoOyAvLyBsZW5ndGggaXMgbm90IHplcm8gYmFzZWRcbiAgICAgICAgc3RlcCA9ICQoJ2xpIC5hY3RpdmUnLCBwcm9ncmVzcykucGFyZW50KCkuaW5kZXgoKSArIDE7IC8vIGluZGV4IGlzIHplcm8gYmFzZWRcbiAgICAgIH1cbiAgICAgIC8vIHRoZXJlIGlzIGEgcHJvZ3Jlc3MgbWVudSwgQU5EIHRoZXJlIElTIE5PVCBhIGNvbmZpcm0gZm9ybSBzZWxlY3RvclxuICAgICAgLy8gaWYgdGhhdCBpcyB0aGUgY2FzZSwgd2UncmUgbm90IG9uIHRoZSBwdXJjaGFzZSBzdGVwXG4gICAgICBpZiAocHJvZ3Jlc3MubGVuZ3RoID4gMCAmJiAkKG9wdGlvbnMuY29uZmlybV9mb3JtX3NlbGVjdG9yKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgLy8gdGhlIGFjdGl2ZSB0YWIgbWF0Y2hlcyB0aGUgY291bnQgb2YgaXRlbXMgQU5EIHRoZXJlIGlzIE5PVCBhIGNvbmZpcm0gZm9ybSB0byBiZSBzdWJtaXR0ZWRcbiAgICAgICAgLy8gdGhhdCBtZWFucyB3ZSdyZSBvbiBhIHBvc3QgcHVyY2hhc2Ugc3RlcC5cbiAgICAgICAgaWYgKHN0ZXAgPT09IG5hdl9pdGVtX2NvdW50ICYmICQob3B0aW9ucy5jb25maXJtX2Zvcm1fc2VsZWN0b3IpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHN0ZXAgPSBzdGVwICsgMTtcbiAgICAgICAgICBwb3N0X3B1cmNoYXNlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChwcm9ncmVzcy5sZW5ndGggPiAwICYmICQob3B0aW9ucy5jb25maXJtX2Zvcm1fc2VsZWN0b3IpLmxlbmd0aCA+IDAgfHwgJChvcHRpb25zLmZpbmlzaF9zZWN0aW9uX3NlbGVjdG9yKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIC8vIHdlIGFyZSBvbiB0aGUgY29uZmlybSBmb3JtIHNlbGVjdG9yIGFuZCB0aGVyZSBpcyBhIHByb2dyZXNzIG1lYXN1cmVcbiAgICAgICAgLy8gT1IsIHdlIGFyZSBvbiB0aGUgZmluaXNoIHNlbGVjdG9yIGFuZCB0aGVyZSBpcyBOT1QgYSBwcm9ncmVzcyBtZWFzdXJlXG4gICAgICAgIC8vIHRoZXNlIG1lYW4gdGhlIHVzZXIganVzdCBwdXJjaGFzZWQuXG4gICAgICAgIHN0ZXAgPSAncHVyY2hhc2UnO1xuICAgICAgfSBlbHNlIGlmIChwcm9ncmVzcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5kZWJ1ZyggJ3N0ZXAgaXMgJyArIHN0ZXAgKyAnIGFuZCBuYXYgaXRlbSBjb3VudCBpcyAnICsgbmF2X2l0ZW1fY291bnQgKyAnIGFuZCBvcHAgaWQgaXMgJyArIG9wcF9pZCArICcgYW5kIHBvc3QgcHVyY2hhc2UgaXMgJyArIHBvc3RfcHVyY2hhc2UgKTtcbiAgICAgIHRoaXMuYW5hbHl0aWNzVHJhY2tpbmdTdGVwKHN0ZXAsIHBvc3RfcHVyY2hhc2UpO1xuICAgIH0sIC8vIGFuYWx5dGljc1RyYWNraW5nXG5cbiAgICBhbmFseXRpY3NUcmFja2luZ1N0ZXA6IGZ1bmN0aW9uKHN0ZXAsIHBvc3RfcHVyY2hhc2UpIHtcbiAgICAgIHZhciBwcm9ncmVzcyA9ICQodGhpcy5vcHRpb25zLnByb2dyZXNzX3NlbGVjdG9yKTtcbiAgICAgIHZhciBhbW91bnQgPSAkKHRoaXMub3B0aW9ucy5vcmlnaW5hbF9hbW91bnRfc2VsZWN0b3IpLnZhbCgpO1xuICAgICAgdmFyIG9wcF9pZCA9ICQodGhpcy5vcHRpb25zLm9wcF9pZF9zZWxlY3RvcikudmFsKCk7XG4gICAgICB2YXIgaW5zdGFsbG1lbnRfcGVyaW9kID0gJ29uZS10aW1lJztcbiAgICAgIHZhciBsZXZlbDtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5pbnN0YWxsbWVudF9wZXJpb2Rfc2VsZWN0b3IpLmxlbmd0aCA+IDAgKSB7XG4gICAgICAgIGluc3RhbGxtZW50X3BlcmlvZCA9ICQodGhpcy5vcHRpb25zLmluc3RhbGxtZW50X3BlcmlvZF9zZWxlY3RvcikudmFsKCk7XG4gICAgICB9XG4gICAgICAvLyBpZiB3ZSdyZSBub3QgYWZ0ZXIgdGhlIHB1cmNoYXNlLCB1c2UgYWRkUHJvZHVjdFxuICAgICAgaWYgKHByb2dyZXNzLmxlbmd0aCA+IDAgJiYgcG9zdF9wdXJjaGFzZSAhPT0gdHJ1ZSkge1xuICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICBhbW91bnQ6IGFtb3VudCxcbiAgICAgICAgICBpbnN0YWxsbWVudF9wZXJpb2Q6IGluc3RhbGxtZW50X3BlcmlvZFxuICAgICAgICB9O1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIHVybDogJy9jYWxjdWxhdGUtbWVtYmVyLWxldmVsLycsXG4gICAgICAgICAgZGF0YTogZGF0YVxuICAgICAgICB9KS5kb25lKGZ1bmN0aW9uKCBkYXRhICkge1xuICAgICAgICAgIGlmICgkKGRhdGEubGV2ZWwpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxldmVsID0gZGF0YS5sZXZlbC5sZXZlbDtcbiAgICAgICAgICAgIHRoYXQuZGVidWcoJ2FkZCBwcm9kdWN0OiBpZCBpcyAnICsgJ21pbm5wb3N0XycgKyBsZXZlbC50b0xvd2VyQ2FzZSgpICsgJ19tZW1iZXJzaGlwJyArICcgYW5kIG5hbWUgaXMgJyArICdNaW5uUG9zdCAnICsgbGV2ZWwuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBsZXZlbC5zbGljZSgxKSArICcgTWVtYmVyc2hpcCcgKyAnIGFuZCB2YXJpYW50IGlzICcgKyBpbnN0YWxsbWVudF9wZXJpb2QuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBpbnN0YWxsbWVudF9wZXJpb2Quc2xpY2UoMSkpO1xuICAgICAgICAgICAgZ2EoJ2VjOmFkZFByb2R1Y3QnLCB7XG4gICAgICAgICAgICAgICdpZCc6ICdtaW5ucG9zdF8nICsgbGV2ZWwudG9Mb3dlckNhc2UoKSArICdfbWVtYmVyc2hpcCcsXG4gICAgICAgICAgICAgICduYW1lJzogJ01pbm5Qb3N0ICcgKyBsZXZlbC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGxldmVsLnNsaWNlKDEpICsgJyBNZW1iZXJzaGlwJyxcbiAgICAgICAgICAgICAgJ2NhdGVnb3J5JzogJ0RvbmF0aW9uJyxcbiAgICAgICAgICAgICAgJ2JyYW5kJzogJ01pbm5Qb3N0JyxcbiAgICAgICAgICAgICAgJ3ZhcmlhbnQnOiBpbnN0YWxsbWVudF9wZXJpb2QuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBpbnN0YWxsbWVudF9wZXJpb2Quc2xpY2UoMSksXG4gICAgICAgICAgICAgICdwcmljZSc6IGFtb3VudCxcbiAgICAgICAgICAgICAgJ3F1YW50aXR5JzogMVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0ZXAgPT09ICdwdXJjaGFzZScpIHtcbiAgICAgICAgdGhpcy5kZWJ1ZygnYWRkIGEgcHVyY2hhc2UgYWN0aW9uLiBzdGVwIGlzICcgKyBzdGVwKTtcbiAgICAgICAgZ2EoJ2VjOnNldEFjdGlvbicsIHN0ZXAse1xuICAgICAgICAgICdpZCc6IG9wcF9pZCwgLy8gVHJhbnNhY3Rpb24gaWQgLSBUeXBlOiBzdHJpbmdcbiAgICAgICAgICAnYWZmaWxpYXRpb24nOiAnTWlublBvc3QnLCAvLyBTdG9yZSBuYW1lIC0gVHlwZTogc3RyaW5nXG4gICAgICAgICAgJ3JldmVudWUnOiBhbW91bnQsIC8vIFRvdGFsIFJldmVudWUgLSBUeXBlOiBudW1lcmljXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5kZWJ1ZygnYWRkIGEgY2hlY2tvdXQgYWN0aW9uLiBzdGVwIGlzICcgKyBzdGVwKTtcbiAgICAgICAgZ2EoJ2VjOnNldEFjdGlvbicsJ2NoZWNrb3V0Jywge1xuICAgICAgICAgICdzdGVwJzogc3RlcCwgLy8gQSB2YWx1ZSBvZiAxIGluZGljYXRlcyBmaXJzdCBjaGVja291dCBzdGVwLiBWYWx1ZSBvZiAyIGluZGljYXRlcyBzZWNvbmQgY2hlY2tvdXQgc3RlcFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgZ2EoJ3NldCcsIHtcbiAgICAgICAgcGFnZTogd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLFxuICAgICAgICB0aXRsZTogZG9jdW1lbnQudGl0bGVcbiAgICAgIH0pO1xuICAgICAgZ2EoJ3NlbmQnLCAncGFnZXZpZXcnLCB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUpO1xuXG4gICAgfSwgLy8gYW5hbHl0aWNzVHJhY2tpbmdTdGVwXG5cbiAgICBhbW91bnRBc1JhZGlvOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICAvLyB3aGVuIGFtb3VudCBmaWVsZCBpcyBhIHJhZGlvIGJ1dHRvbiwgd2UgbmVlZCB0byBjaGVjayBpdCB3aGVuZXZlciBpdCBjaGFuZ2VzXG4gICAgICAkKG9wdGlvbnMub3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICgkKHRoaXMpLmlzKCc6cmFkaW8nKSkge1xuICAgICAgICAgICAgb3B0aW9ucy5vcmlnaW5hbF9hbW91bnQgPSBwYXJzZUludCgkKG9wdGlvbnMub3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yICsgJzpjaGVja2VkJywgZWxlbWVudCkudmFsKCksIDEwKTtcbiAgICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LCAvLyBhbW91bnRBc1JhZGlvXG5cbiAgICBhbW91bnRVcGRhdGVkOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICAvLyB3aGVuIG5ldyBhbW91bnQgdGV4dCBmaWVsZCBjYW4gY2hhbmdlLCB3ZSBuZWVkIHRvIGNoYW5nZSB0aGUgaGlkZGVuIGZpZWxkXG4gICAgICAvLyB0aGVyZSBpcyBhbHNvIHBvdGVudGlhbGx5IGFuIGFkZGl0aW9uYWwgYW1vdW50IGZpZWxkIHZhbHVlIHRvIGFkZFxuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdmFyIHN0cmlwZV9wYXltZW50X3R5cGUgPSB0aGF0LmdldFN0cmlwZVBheW1lbnRUeXBlKCk7XG5cbiAgICAgIC8vIHNldCB0aGUgZmFpciBtYXJrZXQgdmFsdWUgaWYgYXBwbGljYWJsZVxuICAgICAgdmFyIGFtb3VudF9zZWxlY3Rvcl9mYWlyX21hcmtldCA9ICQob3B0aW9ucy5vcmlnaW5hbF9hbW91bnRfc2VsZWN0b3IsIGVsZW1lbnQpO1xuICAgICAgaWYgKGFtb3VudF9zZWxlY3Rvcl9mYWlyX21hcmtldC5pcygnOnJhZGlvJykpIHtcbiAgICAgICAgYW1vdW50X3NlbGVjdG9yX2ZhaXJfbWFya2V0ID0gJChvcHRpb25zLm9yaWdpbmFsX2Ftb3VudF9zZWxlY3RvciArICc6Y2hlY2tlZCcsIGVsZW1lbnQpO1xuICAgICAgfVxuICAgICAgdGhhdC5zZXRGYWlyTWFya2V0VmFsdWUoYW1vdW50X3NlbGVjdG9yX2ZhaXJfbWFya2V0KTtcblxuICAgICAgJChvcHRpb25zLm9yaWdpbmFsX2Ftb3VudF9zZWxlY3RvciwgZWxlbWVudCkuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGF0Lm9wdGlvbnMub3JpZ2luYWxfYW1vdW50ID0gcGFyc2VJbnQoJCh0aGlzLCBlbGVtZW50KS52YWwoKSwgMTApO1xuICAgICAgICB0aGF0LmNhbGN1bGF0ZUZlZXModGhhdC5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCwgc3RyaXBlX3BheW1lbnRfdHlwZSk7XG4gICAgICAgIHRoYXQuc2V0RmFpck1hcmtldFZhbHVlKCQodGhpcywgZWxlbWVudCkpO1xuICAgICAgfSk7XG4gICAgICAkKG9wdGlvbnMuYWRkaXRpb25hbF9hbW91bnRfZmllbGQsIGVsZW1lbnQpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgdGhhdC5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCA9IHBhcnNlSW50KCQob3B0aW9ucy5vcmlnaW5hbF9hbW91bnRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLCAxMCk7XG4gICAgICAgIHRoYXQuY2FsY3VsYXRlRmVlcyh0aGF0Lm9wdGlvbnMub3JpZ2luYWxfYW1vdW50LCBzdHJpcGVfcGF5bWVudF90eXBlKTtcbiAgICAgIH0pO1xuXG4gICAgfSwgLy8gYW1vdW50VXBkYXRlZFxuXG4gICAgZ2V0VG90YWxBbW91bnQ6IGZ1bmN0aW9uKGFtb3VudCkge1xuICAgICAgYW1vdW50ID0gKHR5cGVvZiBhbW91bnQgIT09ICd1bmRlZmluZWQnKSA/ICBhbW91bnQgOiB0aGlzLm9wdGlvbnMub3JpZ2luYWxfYW1vdW50O1xuICAgICAgdmFyIHRvdGFsX2Ftb3VudCA9IGFtb3VudDtcbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5hZGRpdGlvbmFsX2Ftb3VudF9maWVsZCkubGVuZ3RoID4gMCAmJiAkKHRoaXMub3B0aW9ucy5hZGRpdGlvbmFsX2Ftb3VudF9maWVsZCkudmFsKCkgPiAwKSB7XG4gICAgICAgIHZhciBhZGRpdGlvbmFsX2Ftb3VudCA9ICQodGhpcy5vcHRpb25zLmFkZGl0aW9uYWxfYW1vdW50X2ZpZWxkKS52YWwoKTtcbiAgICAgICAgdG90YWxfYW1vdW50ID0gcGFyc2VJbnQoYWRkaXRpb25hbF9hbW91bnQsIDEwKSArIHBhcnNlSW50KGFtb3VudCwgMTApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRvdGFsX2Ftb3VudDtcbiAgICB9LCAvLyBnZXRUb3RhbEFtb3VudFxuXG4gICAgc2V0RmFpck1hcmtldFZhbHVlOiBmdW5jdGlvbihhbW91bnRfc2VsZWN0b3IpIHtcbiAgICAgIC8vIGlmIHRoZXJlIGlzIGEgZmFpciBtYXJrZXQgdmFsdWUgZmllbGQsIGNoZWNrIGFuZCBzZWUgaWYgd2UgY2FuIHBvcHVsYXRlIGl0XG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuZmFpcl9tYXJrZXRfdmFsdWVfc2VsZWN0b3IpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdmFyIGZhaXJNYXJrZXRWYWx1ZSA9IGFtb3VudF9zZWxlY3Rvci5kYXRhKCdmYWlyLW1hcmtldC12YWx1ZScpO1xuICAgICAgICAkKHRoaXMub3B0aW9ucy5mYWlyX21hcmtldF92YWx1ZV9zZWxlY3RvcikudmFsKGZhaXJNYXJrZXRWYWx1ZSk7XG4gICAgICB9XG4gICAgfSwgLy8gc2V0RmFpck1hcmtldFZhbHVlXG5cbiAgICBjYWxjdWxhdGVGZWVzOiBmdW5jdGlvbihhbW91bnQsIHN0cmlwZV9wYXltZW50X3R5cGUpIHtcbiAgICAgIC8vIHRoaXMgc2VuZHMgdGhlIGFtb3VudCBhbmQgc3RyaXBlIHBheW1lbnQgdHlwZSB0byBweXRob247IGdldCB0aGUgZmVlIGFuZCBkaXNwbGF5IGl0IHRvIHRoZSB1c2VyIG9uIHRoZSBjaGVja2JveCBsYWJlbFxuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdmFyIHRvdGFsX2Ftb3VudCA9IHRoYXQuZ2V0VG90YWxBbW91bnQoYW1vdW50KTtcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICBhbW91bnQ6IHRvdGFsX2Ftb3VudCxcbiAgICAgICAgc3RyaXBlX3BheW1lbnRfdHlwZTogc3RyaXBlX3BheW1lbnRfdHlwZVxuICAgICAgfTtcbiAgICAgIHRoYXQuc2V0U3RyaXBlUGF5bWVudFR5cGUoc3RyaXBlX3BheW1lbnRfdHlwZSk7XG4gICAgICAkLmFqYXgoe1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgdXJsOiAnL2NhbGN1bGF0ZS1mZWVzLycsXG4gICAgICAgIGRhdGE6IGRhdGFcbiAgICAgIH0pLmRvbmUoZnVuY3Rpb24oIGRhdGEgKSB7XG4gICAgICAgIGlmICgkKGRhdGEuZmVlcykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICQodGhhdC5vcHRpb25zLmZlZV9hbW91bnQpLnRleHQocGFyc2VGbG9hdChkYXRhLmZlZXMpLnRvRml4ZWQoMikpO1xuICAgICAgICAgIHRoYXQuY3JlZGl0Q2FyZEZlZUNoZWNrYm94KCQodGhhdC5vcHRpb25zLnBheV9jY19wcm9jZXNzaW5nX3NlbGVjdG9yKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sIC8vIGNhbGN1bGF0ZUZlZXNcblxuICAgIGNyZWRpdENhcmRQcm9jZXNzaW5nRmVlczogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgLy8gdGhpcyBhZGRzIG9yIHN1YnRyYWN0cyB0aGUgZmVlIHRvIHRoZSBvcmlnaW5hbCBhbW91bnQgd2hlbiB0aGUgdXNlciBpbmRpY2F0ZXMgdGhleSBkbyBvciBkbyBub3Qgd2FudCB0byBwYXkgdGhlIGZlZXNcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHRoYXQuY3JlZGl0Q2FyZEZlZUNoZWNrYm94KCQob3B0aW9ucy5wYXlfY2NfcHJvY2Vzc2luZ19zZWxlY3RvcikpO1xuICAgICAgJChvcHRpb25zLnBheV9jY19wcm9jZXNzaW5nX3NlbGVjdG9yKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHRoYXQuY3JlZGl0Q2FyZEZlZUNoZWNrYm94KHRoaXMpO1xuICAgICAgfSk7XG4gICAgfSwgLy8gY3JlZGl0Q2FyZFByb2Nlc3NpbmdGZWVzXG5cbiAgICBnZXRTdHJpcGVQYXltZW50VHlwZTogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgc3RyaXBlX3BheW1lbnRfdHlwZSA9ICdjYXJkJztcbiAgICAgIGlmICgkKCdpbnB1dFtuYW1lPVwic3RyaXBlX3BheW1lbnRfdHlwZVwiXScpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgc3RyaXBlX3BheW1lbnRfdHlwZSA9ICQoJ2lucHV0W25hbWU9XCJzdHJpcGVfcGF5bWVudF90eXBlXCJdJykudmFsKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gc3RyaXBlX3BheW1lbnRfdHlwZTtcbiAgICB9LCAvLyBnZXRTdHJpcGVQYXltZW50VHlwZVxuXG4gICAgc2V0U3RyaXBlUGF5bWVudFR5cGU6IGZ1bmN0aW9uKHN0cmlwZV9wYXltZW50X3R5cGUpIHtcbiAgICAgIGlmICgkKCdpbnB1dFtuYW1lPVwic3RyaXBlX3BheW1lbnRfdHlwZVwiXScpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAkKHRoaXMub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuYXBwZW5kKCc8aW5wdXQgdHlwZT1cXFwiaGlkZGVuXFxcIiBuYW1lPVxcXCJzdHJpcGVfcGF5bWVudF90eXBlXFxcIj4nKTtcbiAgICAgIH1cbiAgICAgICQoJ2lucHV0W25hbWU9XCJzdHJpcGVfcGF5bWVudF90eXBlXCJdJykudmFsKHN0cmlwZV9wYXltZW50X3R5cGUpO1xuICAgICAgcmV0dXJuIHN0cmlwZV9wYXltZW50X3R5cGU7XG4gICAgfSwgLy8gc2V0U3RyaXBlUGF5bWVudFR5cGVcblxuICAgIGNyZWRpdENhcmRGZWVDaGVja2JveDogZnVuY3Rpb24oZmllbGQpIHtcbiAgICAgIHZhciBmdWxsX2Ftb3VudDtcbiAgICAgIHZhciB0b3RhbF9hbW91bnQgPSB0aGlzLmdldFRvdGFsQW1vdW50KCk7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICBpZiAoJChmaWVsZCkuaXMoJzpjaGVja2VkJykgfHwgJChmaWVsZCkucHJvcCgnY2hlY2tlZCcpKSB7XG4gICAgICAgICQoJy5hbW91bnQgLmxldmVsLWFtb3VudCcpLmFkZENsYXNzKCdmdWxsLWFtb3VudCcpO1xuICAgICAgICBmdWxsX2Ftb3VudCA9ICh0b3RhbF9hbW91bnQgKyBwYXJzZUZsb2F0KCQodGhhdC5vcHRpb25zLmZlZV9hbW91bnQpLnRleHQoKSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZnVsbF9hbW91bnQgPSB0b3RhbF9hbW91bnQ7XG4gICAgICB9XG4gICAgICAkKHRoYXQub3B0aW9ucy5mdWxsX2Ftb3VudF9zZWxlY3RvcikudGV4dChwYXJzZUZsb2F0KGZ1bGxfYW1vdW50KS50b0ZpeGVkKDIpKTtcbiAgICB9LCAvLyBjcmVkaXRDYXJkRmVlQ2hlY2tib3hcblxuICAgIGRvbmF0ZUFub255bW91c2x5OiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB0aGF0LnRvZ2dsZUFub255bW91cygkKG9wdGlvbnMuYW5vbnltb3VzX3NlbGVjdG9yLCBlbGVtZW50KSk7XG4gICAgICAkKG9wdGlvbnMuYW5vbnltb3VzX3NlbGVjdG9yLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoYXQudG9nZ2xlQW5vbnltb3VzKCQodGhpcykpO1xuICAgICAgfSk7XG4gICAgfSwgLy8gZG9uYXRlQW5vbnltb3VzbHlcblxuICAgIHRvZ2dsZUFub255bW91czogZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgaWYgKGVsZW1lbnQuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgJCh0aGlzLm9wdGlvbnMubmFtZV9zZWxlY3RvciArICcgZGl2OmZpcnN0JywgdGhpcy5lbGVtZW50KS5oaWRlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkKHRoaXMub3B0aW9ucy5uYW1lX3NlbGVjdG9yICsgJyBkaXY6Zmlyc3QnLCB0aGlzLmVsZW1lbnQpLnNob3coKTtcbiAgICAgIH1cbiAgICB9LCAvLyB0b2dnbGVBbm9ueW1vdXNcblxuICAgIGhvbm9yT3JNZW1vcnk6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIGlmICgkKG9wdGlvbnMuaG9ub3Jfb3JfbWVtb3J5X2Nob29zZXIgKyAnOmNoZWNrZWQnKS52YWwoKSkge1xuICAgICAgICAkKG9wdGlvbnMuaG9ub3JfbWVtb3J5X2lucHV0X2dyb3VwLCBlbGVtZW50KS5zaG93KCk7XG4gICAgICAgICQob3B0aW9ucy5ob25vcl90eXBlX3NlbGVjdG9yKS50ZXh0KCQob3B0aW9ucy5ob25vcl9vcl9tZW1vcnlfY2hvb3NlciArICc6Y2hlY2tlZCcpLnZhbCgpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQob3B0aW9ucy5ob25vcl9tZW1vcnlfaW5wdXRfZ3JvdXAsIGVsZW1lbnQpLmhpZGUoKTtcbiAgICAgICAgJChvcHRpb25zLmhvbm9yX25hbWVfc2VsZWN0b3IgKyAnIGlucHV0JywgZWxlbWVudCkudmFsKCcnKTtcbiAgICAgIH1cbiAgICB9LCAvLyBob25vck9yTWVtb3J5XG5cbiAgICBob25vck9yTWVtb3J5VG9nZ2xlOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB0aGF0Lmhvbm9yT3JNZW1vcnkodGhhdC5lbGVtZW50LCB0aGF0Lm9wdGlvbnMpO1xuICAgICAgJChvcHRpb25zLmhvbm9yX29yX21lbW9yeV9jaG9vc2VyLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoYXQuaG9ub3JPck1lbW9yeSh0aGF0LmVsZW1lbnQsIHRoYXQub3B0aW9ucyk7XG4gICAgICB9KTtcbiAgICB9LCAvLyBob25vck9yTWVtb3J5VG9nZ2xlXG5cbiAgICBvdXRzaWRlVW5pdGVkU3RhdGVzOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICAkKG9wdGlvbnMuc2hvd19iaWxsaW5nX2NvdW50cnlfc2VsZWN0b3IpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAkKG9wdGlvbnMuYmlsbGluZ19jb3VudHJ5X3NlbGVjdG9yKS5zaG93KCk7XG4gICAgICAgICQodGhpcykucGFyZW50KCkuaGlkZSgpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KTtcbiAgICAgICQob3B0aW9ucy5zaG93X3NoaXBwaW5nX2NvdW50cnlfc2VsZWN0b3IpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAkKG9wdGlvbnMuc2hpcHBpbmdfY291bnRyeV9zZWxlY3Rvcikuc2hvdygpO1xuICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmhpZGUoKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSk7XG4gICAgfSwgLy8gb3V0c2lkZVVuaXRlZFN0YXRlc1xuXG4gICAgc2hpcHBpbmdBZGRyZXNzOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB2YXIgc2hvd19zaGlwcGluZyA9IGZhbHNlO1xuICAgICAgaWYgKCQob3B0aW9ucy51c2VfZm9yX3NoaXBwaW5nX3NlbGVjdG9yKS5sZW5ndGggPiAwKSB7IC8vIHdlIGhhdmUgYSBzaGlwcGluZyBjaGVja2JveFxuICAgICAgICBzaG93X3NoaXBwaW5nID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmIChzaG93X3NoaXBwaW5nID09PSB0cnVlICkge1xuICAgICAgICAkKG9wdGlvbnMudXNlX2Zvcl9zaGlwcGluZ19zZWxlY3RvciwgZWxlbWVudCkucGFyZW50KCkuc2hvdygpO1xuICAgICAgICBpZiAoJChvcHRpb25zLnVzZV9mb3Jfc2hpcHBpbmdfc2VsZWN0b3IsIGVsZW1lbnQpLmlzKCc6Y2hlY2tlZCcpKSB7IC8vIHVzZSBzYW1lIGFzIGJpbGxpbmdcbiAgICAgICAgICAkKG9wdGlvbnMuc2hpcHBpbmdfc2VsZWN0b3IpLmhpZGUoKTtcbiAgICAgICAgfSBlbHNlIHsgLy8gc2VwYXJhdGUgc2hpcHBpbmcgYW5kIGJpbGxpbmdcbiAgICAgICAgICAkKG9wdGlvbnMuc2hpcHBpbmdfc2VsZWN0b3IpLnNob3coKTtcbiAgICAgICAgfVxuICAgICAgICAkKG9wdGlvbnMudXNlX2Zvcl9zaGlwcGluZ19zZWxlY3RvciwgZWxlbWVudCkuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHRoYXQuc2hpcHBpbmdBZGRyZXNzKGVsZW1lbnQsIG9wdGlvbnMpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIFxuICAgIH0sIC8vIHNoaXBwaW5nQWRkcmVzc1xuXG4gICAgYWxsb3dNaW5ucG9zdEFjY291bnQ6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHZhciBhY2NvdW50X2V4aXN0cyA9IGZhbHNlO1xuXG4gICAgICAvLyBzaG93IHBhc3N3b3JkIGFzIHRleHRcbiAgICAgIHRoYXQuc2hvd1Bhc3N3b3JkKCk7XG5cbiAgICAgIC8vIGNhbGN1bGF0ZSBwYXNzd29yZCBzdHJlbmd0aFxuICAgICAgdGhhdC5zaG93UGFzc3dvcmRTdHJlbmd0aCgpO1xuICAgICAgXG4gICAgICB0aGF0LnNwYW1FbWFpbCgkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpKTtcbiAgICAgICQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGF0LnNwYW1FbWFpbCgkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGF0LnRvZ2dsZUFjY291bnRGaWVsZHMoJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkpO1xuICAgICAgJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGF0LnRvZ2dsZUFjY291bnRGaWVsZHMoJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkpO1xuICAgICAgfSk7XG5cbiAgICAgIGZ1bmN0aW9uIGRvbmVUeXBpbmcgKCkge1xuICAgICAgICB2YXIgZW1haWwgPSAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpO1xuICAgICAgICBhY2NvdW50X2V4aXN0cyA9IHRoYXQuY2hlY2tNaW5ucG9zdEFjY291bnQoZWxlbWVudCwgb3B0aW9ucywgZW1haWwpO1xuICAgICAgfVxuXG4gICAgICAvL3NldHVwIGJlZm9yZSBmdW5jdGlvbnNcbiAgICAgIHZhciB0eXBpbmdUaW1lcjsgICAgICAgICAgICAgICAgLy90aW1lciBpZGVudGlmaWVyXG4gICAgICB2YXIgZG9uZVR5cGluZ0ludGVydmFsID0gNTAwMDsgIC8vdGltZSBpbiBtcywgNSBzZWNvbmQgZm9yIGV4YW1wbGVcblxuICAgICAgLy9vbiBrZXl1cCwgc3RhcnQgdGhlIGNvdW50ZG93blxuICAgICAgJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5rZXl1cChmdW5jdGlvbigpe1xuICAgICAgICBjbGVhclRpbWVvdXQodHlwaW5nVGltZXIpO1xuICAgICAgICBpZiAoJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwpIHtcbiAgICAgICAgICB0eXBpbmdUaW1lciA9IHNldFRpbWVvdXQoZG9uZVR5cGluZywgZG9uZVR5cGluZ0ludGVydmFsKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSwgLy8gYWxsb3dNaW5ucG9zdEFjY291bnRcblxuICAgIHNwYW1FbWFpbDogZnVuY3Rpb24oZW1haWxfZmllbGQpIHtcbiAgICAgIHZhciBzcGFtRXJyb3JDb250YWluZXIgPSBlbWFpbF9maWVsZC5wYXJlbnQoKTtcbiAgICAgIGlmICgkKCcuYS1zcGFtLWVtYWlsJywgc3BhbUVycm9yQ29udGFpbmVyKS5sZW5ndGggPT09IDAgKSB7XG4gICAgICAgIHNwYW1FcnJvckNvbnRhaW5lci5hcHBlbmQoJzxwIGNsYXNzPVwiYS1mb3JtLWNhcHRpb24gYS1lcnJvciBhLXNwYW0tZW1haWxcIj5UaGlzIGVtYWlsIGFkZHJlc3MgaGFzIGJlZW4gZGV0ZWN0ZWQgYXMgYSBzcGFtbWVyLjwvcD4nKTtcbiAgICAgIH1cbiAgICAgICQoJy5hLXNwYW0tZW1haWwnLCBzcGFtRXJyb3JDb250YWluZXIpLmhpZGUoKTtcbiAgICAgIHNwYW1FcnJvckNvbnRhaW5lci5yZW1vdmVDbGFzcygnaW52YWxpZCBhLWVycm9yJyk7XG4gICAgfSwgLy8gc3BhbUVtYWlsXG5cbiAgICB0b2dnbGVBY2NvdW50RmllbGRzOiBmdW5jdGlvbihjcmVhdGVfYWNjb3VudF9zZWxlY3Rvcikge1xuICAgICAgaWYgKGNyZWF0ZV9hY2NvdW50X3NlbGVjdG9yLmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgIGNyZWF0ZV9hY2NvdW50X3NlbGVjdG9yLnBhcmVudCgpLmJlZm9yZSgnPHAgY2xhc3M9XCJhLWZvcm0tY2FwdGlvbiBhLWFjY291bnQtZXhpc3RzIGEtYWNjb3VudC1leGlzdHMtc3VjY2Vzc1wiPlRoZXJlIGlzIGFscmVhZHkgYSBNaW5uUG9zdC5jb20gYWNjb3VudCB3aXRoIHRoaXMgZW1haWwgYWRkcmVzcy48L3A+Jyk7XG4gICAgICAgICQoJy5hLWFjY291bnQtZXhpc3RzJykuaGlkZSgpO1xuICAgICAgICAkKHRoaXMub3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgdGhpcy5lbGVtZW50KS5zaG93KCk7XG4gICAgICAgIHRoaXMub3B0aW9ucy5jcmVhdGVfYWNjb3VudCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkKHRoaXMub3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgdGhpcy5lbGVtZW50KS5oaWRlKCk7XG4gICAgICB9XG4gICAgfSwgLy8gdG9nZ2xlQWNjb3VudEZpZWxkc1xuXG4gICAgc2hvd1Bhc3N3b3JkOiBmdW5jdGlvbigpIHtcbiAgICAgIC8vIENhY2hlIG91ciBqcXVlcnkgZWxlbWVudHNcbiAgICAgIHZhciAkc3VibWl0ID0gJCgnLmJ0bi1zdWJtaXQnKTtcbiAgICAgIHZhciAkY29udGFpbmVyID0gJCh0aGlzLm9wdGlvbnMucGFzc3dvcmRfc2VsZWN0b3IsIHRoaXMuZWxlbWVudCk7XG4gICAgICB2YXIgJGZpZWxkID0gJCgnaW5wdXRbbmFtZT1cInBhc3N3b3JkXCJdJywgJGNvbnRhaW5lcik7XG4gICAgICAkKCcuYS1hY2NvdW50LWV4aXN0cycpLmhpZGUoKTtcbiAgICAgIHZhciBzaG93X3Bhc3MgPSAnPGRpdiBjbGFzcz1cImEtZm9ybS1zaG93LXBhc3N3b3JkIGEtZm9ybS1jYXB0aW9uXCI+PGxhYmVsPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBuYW1lPVwic2hvd19wYXNzd29yZFwiIGlkPVwic2hvdy1wYXNzd29yZC1jaGVja2JveFwiIHZhbHVlPVwiMVwiPiBTaG93IHBhc3N3b3JkPC9sYWJlbD48L2Rpdj4nO1xuICAgICAgLy8gSW5qZWN0IHRoZSB0b2dnbGUgYnV0dG9uIGludG8gdGhlIHBhZ2VcbiAgICAgICRjb250YWluZXIuYXBwZW5kKCBzaG93X3Bhc3MgKTtcbiAgICAgIC8vIENhY2hlIHRoZSB0b2dnbGUgYnV0dG9uXG4gICAgICB2YXIgJHRvZ2dsZSA9ICQoJyNzaG93LXBhc3N3b3JkLWNoZWNrYm94Jyk7XG4gICAgICAvLyBUb2dnbGUgdGhlIGZpZWxkIHR5cGVcbiAgICAgICR0b2dnbGUub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICB2YXIgY2hlY2tib3ggPSAkKHRoaXMpO1xuICAgICAgICBpZiAoY2hlY2tib3guaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgICAkZmllbGQuYXR0cigndHlwZScsICd0ZXh0Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJGZpZWxkLmF0dHIoJ3R5cGUnLCAncGFzc3dvcmQnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICAvLyBTZXQgdGhlIGZvcm0gZmllbGQgYmFjayB0byBhIHJlZ3VsYXIgcGFzc3dvcmQgZWxlbWVudFxuICAgICAgJHN1Ym1pdC5vbiggJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAkZmllbGQuYXR0cigndHlwZScsICdwYXNzd29yZCcpO1xuICAgICAgfSk7XG4gICAgfSxcblxuICAgIHNob3dQYXNzd29yZFN0cmVuZ3RoOiBmdW5jdGlvbigpIHtcbiAgICAgIC8vIGNoZWNrUGFzc3dvcmRTdHJlbmd0aFxuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgaWYgKCQoJy5hLXBhc3N3b3JkLXN0cmVuZ3RoJykubGVuZ3RoID4gMCApIHtcbiAgICAgICAgdmFyICRiZWZvcmUgPSAkKCcuYS1mb3JtLXNob3ctcGFzc3dvcmQnKTtcbiAgICAgICAgJGJlZm9yZS5hZnRlciggJCgnPGRpdiBjbGFzcz1cImEtcGFzc3dvcmQtc3RyZW5ndGhcIj48bWV0ZXIgbWF4PVwiNFwiIGlkPVwicGFzc3dvcmQtc3RyZW5ndGhcIj48ZGl2PjwvZGl2PjwvbWV0ZXI+PHAgY2xhc3M9XCJhLWZvcm0tY2FwdGlvblwiIGlkPVwicGFzc3dvcmQtc3RyZW5ndGgtdGV4dFwiPjwvcD48L2Rpdj4nKSk7XG4gICAgICAgICQoICdib2R5JyApLm9uKCAna2V5dXAnLCAnaW5wdXRbbmFtZT1wYXNzd29yZF0nLFxuICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhhdC5jaGVja1Bhc3N3b3JkU3RyZW5ndGgoXG4gICAgICAgICAgICAgICQoJ2lucHV0W25hbWU9cGFzc3dvcmRdJyksIC8vIFBhc3N3b3JkIGZpZWxkXG4gICAgICAgICAgICAgICQoJyNwYXNzd29yZC1zdHJlbmd0aCcpLCAgICAgICAgICAgLy8gU3RyZW5ndGggbWV0ZXJcbiAgICAgICAgICAgICAgJCgnI3Bhc3N3b3JkLXN0cmVuZ3RoLXRleHQnKSAgICAgIC8vIFN0cmVuZ3RoIHRleHQgaW5kaWNhdG9yXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9LCAvLyBzaG93UGFzc3dvcmRTdHJlbmd0aFxuXG4gICAgY2hlY2tQYXNzd29yZFN0cmVuZ3RoOiBmdW5jdGlvbiggJHBhc3N3b3JkLCAkc3RyZW5ndGhNZXRlciwgJHN0cmVuZ3RoVGV4dCApIHtcbiAgICAgIHZhciBwYXNzd29yZCA9ICRwYXNzd29yZC52YWwoKTtcbiAgICAgIC8vIEdldCB0aGUgcGFzc3dvcmQgc3RyZW5ndGhcbiAgICAgIHZhciByZXN1bHQgPSB6eGN2Ym4ocGFzc3dvcmQpO1xuICAgICAgdmFyIHN0cmVuZ3RoID0gcmVzdWx0LnNjb3JlO1xuXG4gICAgICAkc3RyZW5ndGhUZXh0LnJlbW92ZUNsYXNzKCAnc2hvcnQgYmFkIGdvb2Qgc3Ryb25nJyApO1xuXG4gICAgICAvLyBBZGQgdGhlIHN0cmVuZ3RoIG1ldGVyIHJlc3VsdHNcbiAgICAgIHN3aXRjaCAoIHN0cmVuZ3RoICkge1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgJHN0cmVuZ3RoVGV4dC5hZGRDbGFzcyggJ2JhZCcgKS5odG1sKCAnU3RyZW5ndGg6IDxzdHJvbmc+V2Vhazwvc3Ryb25nPicgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICRzdHJlbmd0aFRleHQuYWRkQ2xhc3MoICdnb29kJyApLmh0bWwoICdTdHJlbmd0aDogPHN0cm9uZz5NZWRpdW08L3N0cm9uZz4nICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAkc3RyZW5ndGhUZXh0LmFkZENsYXNzKCAnc3Ryb25nJyApLmh0bWwoICdTdHJlbmd0aDogPHN0cm9uZz5TdHJvbmc8L3N0cm9uZz4nICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAkc3RyZW5ndGhUZXh0LmFkZENsYXNzKCAnc2hvcnQnICkuaHRtbCggJ1N0cmVuZ3RoOiA8c3Ryb25nPlZlcnkgd2Vhazwvc3Ryb25nPicgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAkc3RyZW5ndGhUZXh0LmFkZENsYXNzKCAnc2hvcnQnICkuaHRtbCggJ1N0cmVuZ3RoOiA8c3Ryb25nPlZlcnkgd2Vhazwvc3Ryb25nPicgKTtcbiAgICAgIH1cbiAgICAgICRzdHJlbmd0aE1ldGVyLnZhbChzdHJlbmd0aCk7XG4gICAgICByZXR1cm4gc3RyZW5ndGg7XG4gICAgfSwgLy8gY2hlY2tQYXNzd29yZFN0cmVuZ3RoXG5cbiAgICBjaGVja01pbm5wb3N0QWNjb3VudDogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucywgZW1haWwpIHtcbiAgICAgIHZhciB1c2VyID0ge1xuICAgICAgICBlbWFpbDogZW1haWxcbiAgICAgIH07XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAkLmFqYXgoe1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICB1cmw6IG9wdGlvbnMubWlubnBvc3Rfcm9vdCArICcvd3AtanNvbi91c2VyLWFjY291bnQtbWFuYWdlbWVudC92MS9jaGVjay1hY2NvdW50JyxcbiAgICAgICAgZGF0YTogdXNlclxuICAgICAgfSkuZG9uZShmdW5jdGlvbiggcmVzdWx0ICkge1xuICAgICAgICBpZiAocmVzdWx0LnN0YXR1cyA9PT0gJ3N1Y2Nlc3MnICYmIHJlc3VsdC5yZWFzb24gPT09ICd1c2VyIGV4aXN0cycpIHsgLy8gdXNlciBleGlzdHNcbiAgICAgICAgICBpZiAoJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgICAgICQob3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgZWxlbWVudCkuaGlkZSgpO1xuICAgICAgICAgICAgJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkucGFyZW50KCkuaGlkZSgpO1xuICAgICAgICAgICAgJCgnLmEtYWNjb3VudC1leGlzdHMnLCBlbGVtZW50KS5zaG93KCk7XG4gICAgICAgICAgfVxuICAgICAgICAgICQob3B0aW9ucy5jcmVhdGVfbXBfc2VsZWN0b3IsIGVsZW1lbnQpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICgkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KS5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICAgICAgICAkKG9wdGlvbnMucGFzc3dvcmRfc2VsZWN0b3IsIGVsZW1lbnQpLmhpZGUoKTtcbiAgICAgICAgICAgICAgJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkucGFyZW50KCkuaGlkZSgpO1xuICAgICAgICAgICAgICAkKCcuYS1hY2NvdW50LWV4aXN0cycsIGVsZW1lbnQpLnNob3coKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmICggcmVzdWx0LnN0YXR1cyA9PT0gJ3NwYW0nICkge1xuICAgICAgICAgICQodGhhdC5vcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yKS5hZGRDbGFzcygnaW52YWxpZCBhLWVycm9yJyk7XG4gICAgICAgICAgJCggJy5hLXNwYW0tZW1haWwnKS5zaG93KCk7XG4gICAgICAgIH0gZWxzZSB7IC8vIHVzZXIgZG9lcyBub3QgZXhpc3Qgb3IgYWpheCBjYWxsIGZhaWxlZFxuICAgICAgICAgIGlmICgkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KS5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICAgICAgJChvcHRpb25zLnBhc3N3b3JkX3NlbGVjdG9yLCBlbGVtZW50KS5zaG93KCk7XG4gICAgICAgICAgICBvcHRpb25zLmNyZWF0ZV9hY2NvdW50ID0gdHJ1ZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJChvcHRpb25zLnBhc3N3b3JkX3NlbGVjdG9yLCBlbGVtZW50KS5oaWRlKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgICQoJy5hLWFjY291bnQtZXhpc3RzJywgZWxlbWVudCkuaGlkZSgpO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSwgLy8gY2hlY2tNaW5ucG9zdEFjY291bnRcblxuICAgIGNob29zZVBheW1lbnRNZXRob2Q6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcblxuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuXG4gICAgICBpZiAoJChvcHRpb25zLmNob29zZV9wYXltZW50KS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGlmICgkKG9wdGlvbnMuY2hvb3NlX3BheW1lbnQgKyAnIGlucHV0JykuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgICB2YXIgY2hlY2tlZF9pZCA9ICQob3B0aW9ucy5jaG9vc2VfcGF5bWVudCArICcgaW5wdXQ6Y2hlY2tlZCcpLmF0dHIoJ2lkJyk7XG4gICAgICAgICAgdmFyIGNoZWNrZWRfdmFsdWUgPSAkKG9wdGlvbnMuY2hvb3NlX3BheW1lbnQgKyAnIGlucHV0OmNoZWNrZWQnKS52YWwoKTtcbiAgICAgICAgICB0aGF0LnNldHVwUGF5bWVudE1ldGhvZChjaGVja2VkX2lkLCBjaGVja2VkX3ZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgICQob3B0aW9ucy5jaG9vc2VfcGF5bWVudCArICcgaW5wdXQnKS5jaGFuZ2UoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciBjaGVja2VkX2lkID0gdGhpcy5pZDtcbiAgICAgICAgICB2YXIgY2hlY2tlZF92YWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgICAgICAgdGhhdC5zZXR1cFBheW1lbnRNZXRob2QoY2hlY2tlZF9pZCwgY2hlY2tlZF92YWx1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICB9XG4gICAgfSwgLy8gY2hvb3NlUGF5bWVudE1ldGhvZFxuXG4gICAgc2V0dXBQYXltZW50TWV0aG9kOiBmdW5jdGlvbihlbGVtZW50X2lkLCBlbGVtZW50X3ZhbHVlKSB7XG4gICAgICB2YXIgc3RyaXBlX3BheW1lbnRfdHlwZSA9IHRoaXMuc2V0U3RyaXBlUGF5bWVudFR5cGUoZWxlbWVudF92YWx1ZSk7XG4gICAgICBpZiAoIGVsZW1lbnRfdmFsdWUgPT09ICdiYW5rX2FjY291bnQnICkge1xuICAgICAgICAkKCdpbnB1dFtuYW1lPVwicGF5bWVudF9tZXRob2RfaWRcIl0nLCAkKHRoaXMub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikpLnJlbW92ZSgpO1xuICAgICAgICB0aGlzLmFjaEZpZWxkcyh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlbW92ZUFjaEZpZWxkcyh0aGlzLm9wdGlvbnMpO1xuICAgICAgfVxuICAgICAgJCh0aGlzLm9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICQodGhpcy5vcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yICsgJy4nICsgZWxlbWVudF9pZCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgJCh0aGlzLm9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IgKyAnOm5vdCguYWN0aXZlKSBpbnB1dCcpLnZhbCgnJyk7XG4gICAgICB0aGlzLmNhbGN1bGF0ZUZlZXModGhpcy5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCwgc3RyaXBlX3BheW1lbnRfdHlwZSk7XG4gICAgfSwgLy8gc2V0dXBQYXltZW50TWV0aG9kXG5cbiAgICByZW1vdmVBY2hGaWVsZHM6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICQoJ2lucHV0W25hbWU9XCJwdWJsaWNfdG9rZW5cIl0nLCAkKG9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpKS5yZW1vdmUoKTtcbiAgICAgICQoJ2lucHV0W25hbWU9XCJhY2NvdW50X2lkXCJdJywgJChvcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKSkucmVtb3ZlKCk7XG4gICAgICAkKCdpbnB1dFtuYW1lPVwiYmFua1Rva2VuXCJdJywgJChvcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKSkucmVtb3ZlKCk7XG4gICAgfSwgLy8gcmVtb3ZlQWNoRmllbGRzXG5cbiAgICBjcmVkaXRDYXJkRmllbGRzOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG5cbiAgICAgIHZhciB0aGF0ID0gdGhpcztcblxuICAgICAgdmFyIHN0eWxlID0ge1xuICAgICAgICBiYXNlOiB7XG4gICAgICAgICAgaWNvbkNvbG9yOiAnIzY2NkVFOCcsXG4gICAgICAgICAgbGluZUhlaWdodDogJzQzcHgnLFxuICAgICAgICAgIGZvbnRXZWlnaHQ6IDQwMCxcbiAgICAgICAgICBmb250RmFtaWx5OiAnZmYtbWV0YS13ZWItcHJvJyxcbiAgICAgICAgICBmb250U2l6ZTogJzI0cHgnLFxuICAgICAgICAgIC8vbGluZUhlaWdodDogJzM3cHgnLFxuICAgICAgICAgIC8vZm9udFNpemU6ICcxNnB4JyxcbiAgICAgICAgfSxcbiAgICAgICAgaW52YWxpZDoge1xuICAgICAgICAgIGNvbG9yOiAnIzFhMTgxOCcsXG4gICAgICAgIH0sXG4gICAgICB9O1xuXG4gICAgICAvLyBBZGQgYW4gaW5zdGFuY2Ugb2YgdGhlIGNhcmQgVUkgY29tcG9uZW50IGludG8gdGhlIGBjYXJkLWVsZW1lbnRgIDxkaXY+XG4gICAgICAvL2NhcmQubW91bnQoJyNjYXJkLWVsZW1lbnQnKTtcbiAgICAgIGlmICggJCgnLmNyZWRpdC1jYXJkLWdyb3VwJykubGVuZ3RoID09PSAwICYmICQoJy5wYXltZW50LW1ldGhvZC5jaG9vc2UtY2FyZCcpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGF0LmNhcmROdW1iZXJFbGVtZW50ID0gdGhhdC5lbGVtZW50cy5jcmVhdGUoJ2NhcmROdW1iZXInLCB7XG4gICAgICAgIHNob3dJY29uOiB0cnVlLFxuICAgICAgICBzdHlsZTogc3R5bGVcbiAgICAgIH0pO1xuICAgICAgdGhhdC5jYXJkTnVtYmVyRWxlbWVudC5tb3VudChvcHRpb25zLmNjX251bV9zZWxlY3Rvcik7XG5cbiAgICAgIHRoYXQuY2FyZEV4cGlyeUVsZW1lbnQgPSB0aGF0LmVsZW1lbnRzLmNyZWF0ZSgnY2FyZEV4cGlyeScsIHtcbiAgICAgICAgc3R5bGU6IHN0eWxlXG4gICAgICB9KTtcbiAgICAgIHRoYXQuY2FyZEV4cGlyeUVsZW1lbnQubW91bnQob3B0aW9ucy5jY19leHBfc2VsZWN0b3IpO1xuXG4gICAgICB0aGF0LmNhcmRDdmNFbGVtZW50ID0gdGhhdC5lbGVtZW50cy5jcmVhdGUoJ2NhcmRDdmMnLCB7XG4gICAgICAgIHN0eWxlOiBzdHlsZVxuICAgICAgfSk7XG4gICAgICB0aGF0LmNhcmRDdmNFbGVtZW50Lm1vdW50KG9wdGlvbnMuY2NfY3ZjX3NlbGVjdG9yKTtcblxuICAgICAgLy8gdmFsaWRhdGUvZXJyb3IgaGFuZGxlIHRoZSBjYXJkIGZpZWxkc1xuICAgICAgdGhhdC5jYXJkTnVtYmVyRWxlbWVudC5vbignY2hhbmdlJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgdmFyIHN0cmlwZV9wYXltZW50X3R5cGUgPSAnY2FyZCc7XG4gICAgICAgIC8vIFN3aXRjaCBwYXltZW50IHR5cGUgaWYgaXQncyBvbmUgdGhhdCB3ZSByZWNvZ25pemUgYXMgZGlzdGluY3RcbiAgICAgICAgaWYgKGV2ZW50LmJyYW5kKSB7XG4gICAgICAgICAgaWYgKCBldmVudC5icmFuZCA9PT0gJ2FtZXgnICkge1xuICAgICAgICAgICAgc3RyaXBlX3BheW1lbnRfdHlwZSA9ICdhbWV4JztcbiAgICAgICAgICB9ICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIC8vIGVycm9yIGhhbmRsaW5nXG4gICAgICAgIHRoYXQuc3RyaXBlRXJyb3JEaXNwbGF5KGV2ZW50LmVycm9yLCAkKG9wdGlvbnMuY2NfbnVtX3NlbGVjdG9yLCBlbGVtZW50KSwgZWxlbWVudCwgb3B0aW9ucyApO1xuICAgICAgICAvLyBpZiBpdCBjaGFuZ2VkLCByZXNldCB0aGUgYnV0dG9uXG4gICAgICAgIHRoYXQuYnV0dG9uU3RhdHVzKG9wdGlvbnMsICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKSwgZmFsc2UpO1xuICAgICAgICB0aGF0LmNhbGN1bGF0ZUZlZXModGhhdC5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCwgc3RyaXBlX3BheW1lbnRfdHlwZSk7XG4gICAgICB9KTtcblxuICAgICAgdGhhdC5jYXJkRXhwaXJ5RWxlbWVudC5vbignY2hhbmdlJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgLy8gZXJyb3IgaGFuZGxpbmdcbiAgICAgICAgdGhhdC5zdHJpcGVFcnJvckRpc3BsYXkoZXZlbnQuZXJyb3IsICQob3B0aW9ucy5jY19leHBfc2VsZWN0b3IsIGVsZW1lbnQpLCBlbGVtZW50LCBvcHRpb25zICk7XG4gICAgICAgIC8vIGlmIGl0IGNoYW5nZWQsIHJlc2V0IHRoZSBidXR0b25cbiAgICAgICAgdGhhdC5idXR0b25TdGF0dXMob3B0aW9ucywgJCh0aGF0Lm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLmZpbmQoJ2J1dHRvbicpLCBmYWxzZSk7XG4gICAgICB9KTtcblxuICAgICAgdGhhdC5jYXJkQ3ZjRWxlbWVudC5vbignY2hhbmdlJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgLy8gZXJyb3IgaGFuZGxpbmdcbiAgICAgICAgdGhhdC5zdHJpcGVFcnJvckRpc3BsYXkoZXZlbnQuZXJyb3IsICQob3B0aW9ucy5jY19jdmNfc2VsZWN0b3IsIGVsZW1lbnQpLCBlbGVtZW50LCBvcHRpb25zICk7XG4gICAgICAgIC8vIGlmIGl0IGNoYW5nZWQsIHJlc2V0IHRoZSBidXR0b25cbiAgICAgICAgdGhhdC5idXR0b25TdGF0dXMob3B0aW9ucywgJCh0aGF0Lm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLmZpbmQoJ2J1dHRvbicpLCBmYWxzZSk7XG4gICAgICB9KTtcblxuICAgICAgLy8gdGhpcyBpcyB0aGUgbWV0aG9kIHRvIGNyZWF0ZSBhIHNpbmdsZSBjYXJkIGZpZWxkIGFuZCBtb3VudCBpdFxuICAgICAgLyp2YXIgY2FyZCA9IHRoYXQuZWxlbWVudHMuY3JlYXRlKFxuICAgICAgICAnY2FyZCcsXG4gICAgICAgIHtcbiAgICAgICAgICBoaWRlUG9zdGFsQ29kZTogdHJ1ZVxuICAgICAgICB9XG4gICAgICApO1xuICAgICAgLy8gQWRkIGFuIGluc3RhbmNlIG9mIHRoZSBjYXJkIFVJIGNvbXBvbmVudCBpbnRvIHRoZSBgY2FyZC1lbGVtZW50YCA8ZGl2PlxuICAgICAgY2FyZC5tb3VudCgnI2NhcmQtZWxlbWVudCcpOyovXG5cbiAgICB9LCAvLyBjcmVkaXRDYXJkRmllbGRzXG5cbiAgICBhY2hGaWVsZHM6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciBiYW5rVG9rZW5GaWVsZE5hbWUgPSAnYmFua1Rva2VuJztcbiAgICAgIHZhciBiYW5rVG9rZW5GaWVsZCA9ICdpbnB1dFtuYW1lPVwiJyArIGJhbmtUb2tlbkZpZWxkTmFtZSArICdcIl0nO1xuICAgICAgaWYgKG9wdGlvbnMucGxhaWRfZW52ICE9ICcnICYmIG9wdGlvbnMua2V5ICE9ICcnICYmIHR5cGVvZiBQbGFpZCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdmFyIGxpbmtIYW5kbGVyID0gUGxhaWQuY3JlYXRlKHtcbiAgICAgICAgICBzZWxlY3RBY2NvdW50OiB0cnVlLFxuICAgICAgICAgIGFwaVZlcnNpb246ICd2MicsXG4gICAgICAgICAgZW52OiBvcHRpb25zLnBsYWlkX2VudixcbiAgICAgICAgICBjbGllbnROYW1lOiAnTWlublBvc3QnLFxuICAgICAgICAgIGtleTogb3B0aW9ucy5wbGFpZF9wdWJsaWNfa2V5LFxuICAgICAgICAgIHByb2R1Y3Q6ICdhdXRoJyxcbiAgICAgICAgICBvbkxvYWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy8gVGhlIExpbmsgbW9kdWxlIGZpbmlzaGVkIGxvYWRpbmcuXG4gICAgICAgICAgfSxcbiAgICAgICAgICBvblN1Y2Nlc3M6IGZ1bmN0aW9uKHB1YmxpY190b2tlbiwgbWV0YWRhdGEpIHtcbiAgICAgICAgICAgIC8vIFRoZSBvblN1Y2Nlc3MgZnVuY3Rpb24gaXMgY2FsbGVkIHdoZW4gdGhlIHVzZXIgaGFzIHN1Y2Nlc3NmdWxseVxuICAgICAgICAgICAgLy8gYXV0aGVudGljYXRlZCBhbmQgc2VsZWN0ZWQgYW4gYWNjb3VudCB0byB1c2UuXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gV2hlbiBjYWxsZWQsIHlvdSB3aWxsIHNlbmQgdGhlIHB1YmxpY190b2tlbiBhbmQgdGhlIHNlbGVjdGVkXG4gICAgICAgICAgICAvLyBhY2NvdW50IElELCBtZXRhZGF0YS5hY2NvdW50X2lkLCB0byB5b3VyIGJhY2tlbmQgYXBwIHNlcnZlci5cbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyBzZW5kRGF0YVRvQmFja2VuZFNlcnZlcih7XG4gICAgICAgICAgICAvLyAgIHB1YmxpY190b2tlbjogcHVibGljX3Rva2VuLFxuICAgICAgICAgICAgLy8gICBhY2NvdW50X2lkOiBtZXRhZGF0YS5hY2NvdW50X2lkXG4gICAgICAgICAgICAvLyB9KTtcblxuICAgICAgICAgICAgLy90aGlzLmRlYnVnKCdQdWJsaWMgVG9rZW46ICcgKyBwdWJsaWNfdG9rZW4pO1xuICAgICAgICAgICAgLy90aGlzLmRlYnVnKCdDdXN0b21lci1zZWxlY3RlZCBhY2NvdW50IElEOiAnICsgbWV0YWRhdGEuYWNjb3VudF9pZCk7XG5cbiAgICAgICAgICAgIHZhciBzdXBwb3J0Zm9ybSA9ICQob3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3Rvcik7XG5cbiAgICAgICAgICAgIC8vIHJlc3BvbnNlIGNvbnRhaW5zIGlkIGFuZCBjYXJkLCB3aGljaCBjb250YWlucyBhZGRpdGlvbmFsIGNhcmQgZGV0YWlsc1xuICAgICAgICAgICAgLy8gSW5zZXJ0IHRoZSBkYXRhIGludG8gdGhlIGZvcm0gc28gaXQgZ2V0cyBzdWJtaXR0ZWQgdG8gdGhlIHNlcnZlclxuICAgICAgICAgICAgc3VwcG9ydGZvcm0uYXBwZW5kKCQoJzxpbnB1dCB0eXBlPVxcXCJoaWRkZW5cXFwiIG5hbWU9XFxcInB1YmxpY190b2tlblxcXCIgLz4nKS52YWwocHVibGljX3Rva2VuKSk7XG4gICAgICAgICAgICBzdXBwb3J0Zm9ybS5hcHBlbmQoJCgnPGlucHV0IHR5cGU9XFxcImhpZGRlblxcXCIgbmFtZT1cXFwiYWNjb3VudF9pZFxcXCIgLz4nKS52YWwobWV0YWRhdGEuYWNjb3VudF9pZCkpO1xuXG4gICAgICAgICAgICAvLyBnZXQgdGhlIGFjY291bnQgdmFsaWRhdGVkIGJ5IGFqYXhcbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgIHVybDonL3BsYWlkX3Rva2VuLycsXG4gICAgICAgICAgICAgIGRhdGE6ICQoc3VwcG9ydGZvcm0pLnNlcmlhbGl6ZSgpLFxuICAgICAgICAgICAgICB0eXBlOiAnUE9TVCdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZG9uZShmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICBpZiAodHlwZW9mIHJlc3BvbnNlLmVycm9yICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIC8vIHRoZXJlIGlzIGFuIGVycm9yLlxuICAgICAgICAgICAgICAgICQob3B0aW9ucy5wbGFpZF9saW5rKS5wYXJlbnQoKS5hZnRlcignPHAgY2xhc3M9XCJlcnJvclwiPicgKyByZXNwb25zZS5lcnJvciArICc8L3A+JylcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL3RoaXMuZGVidWcoJ3ByaW50IHJlc3BvbnNlIGhlcmUnKTtcbiAgICAgICAgICAgICAgICAvL3RoaXMuZGVidWcocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIC8vIGFkZCB0aGUgZmllbGQocykgd2UgbmVlZCB0byB0aGUgZm9ybSBmb3Igc3VibWl0dGluZ1xuICAgICAgICAgICAgICAgIGlmICgkKGJhbmtUb2tlbkZpZWxkKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAkKGJhbmtUb2tlbkZpZWxkKS52YWwocmVzcG9uc2Uuc3RyaXBlX2JhbmtfYWNjb3VudF90b2tlbik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICQob3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikucHJlcGVuZCgkKCc8aW5wdXQgdHlwZT1cXFwiaGlkZGVuXFxcIiBuYW1lPVwiJyArIGJhbmtUb2tlbkZpZWxkTmFtZSArICdcIj4nKS52YWwocmVzcG9uc2Uuc3RyaXBlX2JhbmtfYWNjb3VudF90b2tlbikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkKG9wdGlvbnMucGxhaWRfbGluaywgZWxlbWVudCkuaHRtbCgnPHN0cm9uZz5Zb3VyIGFjY291bnQgd2FzIHN1Y2Nlc3NmdWxseSBhdXRob3JpemVkPC9zdHJvbmc+JykuY29udGVudHMoKS51bndyYXAoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5lcnJvcihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAkKG9wdGlvbnMucGxhaWRfbGluaykucGFyZW50KCkuYWZ0ZXIoJzxwIGNsYXNzPVwiZXJyb3JcIj4nICsgcmVzcG9uc2UuZXJyb3IgKyAnPC9wPicpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9uRXhpdDogZnVuY3Rpb24oZXJyLCBtZXRhZGF0YSkge1xuICAgICAgICAgICAgLy8gVGhlIHVzZXIgZXhpdGVkIHRoZSBMaW5rIGZsb3cuXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICAgICQob3B0aW9ucy5wbGFpZF9saW5rLCBlbGVtZW50KS5jbGljayhmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgJChvcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yICsgJyAuZXJyb3InKS5yZW1vdmUoKTsgLy8gcmVtb3ZlIG1ldGhvZCBlcnJvciBtZXNzYWdlIGlmIGl0IGlzIHRoZXJlXG4gICAgICAgICAgbGlua0hhbmRsZXIub3BlbigpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LCAvLyBhY2hGaWVsZHNcblxuICAgIGJ1dHRvblN0YXR1czogZnVuY3Rpb24ob3B0aW9ucywgYnV0dG9uLCBkaXNhYmxlZCkge1xuICAgICAgLy8gbWFrZSB0aGUgYnV0dG9uIGNsaWNrYWJsZSBvciBub3RcbiAgICAgIGJ1dHRvbi5wcm9wKCdkaXNhYmxlZCcsIGRpc2FibGVkKTtcbiAgICAgIGlmIChkaXNhYmxlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgYnV0dG9uLnRleHQob3B0aW9ucy5idXR0b25fdGV4dCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBidXR0b24udGV4dCgnUHJvY2Vzc2luZycpO1xuICAgICAgfVxuICAgIH0sIC8vIGJ1dHRvblN0YXR1c1xuXG4gICAgc2Nyb2xsVG9Gb3JtRXJyb3I6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGZvcm0gPSAkKCAnLm0tZm9ybScgKTtcbiAgICAgIC8vIGxpc3RlbiBmb3IgYGludmFsaWRgIGV2ZW50cyBvbiBhbGwgZm9ybSBpbnB1dHNcbiAgICAgIGZvcm0uZmluZCggJzppbnB1dCcgKS5vbiggJ2ludmFsaWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyIGlucHV0ID0gJCggdGhpcyApO1xuICAgICAgICAgIC8vIHRoZSBmaXJzdCBpbnZhbGlkIGVsZW1lbnQgaW4gdGhlIGZvcm1cbiAgICAgICAgdmFyIGZpcnN0ID0gZm9ybS5maW5kKCAnLmEtZXJyb3InICkuZmlyc3QoKTtcbiAgICAgICAgLy8gdGhlIGZvcm0gaXRlbSB0aGF0IGNvbnRhaW5zIGl0XG4gICAgICAgIHZhciBmaXJzdF9ob2xkZXIgPSBmaXJzdC5wYXJlbnQoKTtcbiAgICAgICAgICAvLyBvbmx5IGhhbmRsZSBpZiB0aGlzIGlzIHRoZSBmaXJzdCBpbnZhbGlkIGlucHV0XG4gICAgICAgICAgaWYgKGlucHV0WzBdID09PSBmaXJzdFswXSkge1xuICAgICAgICAgICAgICAvLyBoZWlnaHQgb2YgdGhlIG5hdiBiYXIgcGx1cyBzb21lIHBhZGRpbmcgaWYgdGhlcmUncyBhIGZpeGVkIG5hdlxuICAgICAgICAgICAgICAvL3ZhciBuYXZiYXJIZWlnaHQgPSBuYXZiYXIuaGVpZ2h0KCkgKyA1MFxuXG4gICAgICAgICAgICAgIC8vIHRoZSBwb3NpdGlvbiB0byBzY3JvbGwgdG8gKGFjY291bnRpbmcgZm9yIHRoZSBuYXZiYXIgaWYgaXQgZXhpc3RzKVxuICAgICAgICAgICAgICB2YXIgZWxlbWVudE9mZnNldCA9IGZpcnN0X2hvbGRlci5vZmZzZXQoKS50b3A7XG5cbiAgICAgICAgICAgICAgLy8gdGhlIGN1cnJlbnQgc2Nyb2xsIHBvc2l0aW9uIChhY2NvdW50aW5nIGZvciB0aGUgbmF2YmFyKVxuICAgICAgICAgICAgICB2YXIgcGFnZU9mZnNldCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcblxuICAgICAgICAgICAgICAvLyBkb24ndCBzY3JvbGwgaWYgdGhlIGVsZW1lbnQgaXMgYWxyZWFkeSBpbiB2aWV3XG4gICAgICAgICAgICAgIGlmICggZWxlbWVudE9mZnNldCA+IHBhZ2VPZmZzZXQgJiYgZWxlbWVudE9mZnNldCA8IHBhZ2VPZmZzZXQgKyB3aW5kb3cuaW5uZXJIZWlnaHQgKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIC8vIG5vdGU6IGF2b2lkIHVzaW5nIGFuaW1hdGUsIGFzIGl0IHByZXZlbnRzIHRoZSB2YWxpZGF0aW9uIG1lc3NhZ2UgZGlzcGxheWluZyBjb3JyZWN0bHlcbiAgICAgICAgICAgICAgJCggJ2h0bWwsIGJvZHknICkuc2Nyb2xsVG9wKCBlbGVtZW50T2Zmc2V0ICk7XG4gICAgICAgICAgfVxuICAgICAgfSApO1xuICAgIH0sIC8vIHNjcm9sbFRvRm9ybUVycm9yXG5cbiAgICB2YWxpZGF0ZUFuZFN1Ym1pdDogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuXG4gICAgICB2YXIgZm9ybXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubS1mb3JtJyk7XG4gICAgICBmb3Jtcy5mb3JFYWNoKCBmdW5jdGlvbiAoIGZvcm0gKSB7XG4gICAgICAgIFZhbGlkRm9ybSggZm9ybSwge1xuICAgICAgICAgIHZhbGlkYXRpb25FcnJvclBhcmVudENsYXNzOiAnbS1oYXMtdmFsaWRhdGlvbi1lcnJvcicsXG4gICAgICAgICAgdmFsaWRhdGlvbkVycm9yQ2xhc3M6ICdhLXZhbGlkYXRpb24tZXJyb3InLFxuICAgICAgICAgIGludmFsaWRDbGFzczogJ2EtZXJyb3InLFxuICAgICAgICAgIGVycm9yUGxhY2VtZW50OiAnYWZ0ZXInXG4gICAgICAgIH0gKVxuICAgICAgfSApO1xuXG4gICAgICB0aGlzLnNjcm9sbFRvRm9ybUVycm9yKCk7XG5cbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICQob3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3Rvcikuc3VibWl0KGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgLy8gdmFsaWRhdGUgYW5kIHN1Ym1pdCB0aGUgZm9ybVxuICAgICAgICAkKCcuYS12YWxpZGF0aW9uLWVycm9yJykucmVtb3ZlKCk7XG4gICAgICAgICQoJ2lucHV0LCBsYWJlbCcsIGVsZW1lbnQpLnJlbW92ZUNsYXNzKCdhLWVycm9yJyk7XG4gICAgICAgICQodGhhdC5vcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yLCB0aGF0LmVsZW1lbnQpLnJlbW92ZUNsYXNzKCdhLWVycm9yIGludmFsaWQnKTtcbiAgICAgICAgJCgnLmEtdmFsaWRhdGlvbi1lcnJvcicpLnJlbW92ZSgpO1xuICAgICAgICB2YXIgdmFsaWQgPSB0cnVlO1xuICAgICAgICB2YXIgcGF5bWVudF90eXBlID0gJCgnaW5wdXRbbmFtZT1cInN0cmlwZV9wYXltZW50X3R5cGVcIl0nKS52YWwoKTtcbiAgICAgICAgJCh0aGF0Lm9wdGlvbnMuY2hvb3NlX3BheW1lbnQgKyAnIGlucHV0JykuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICQodGhhdC5vcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yICsgJyAuYS1lcnJvcicpLnJlbW92ZSgpOyAvLyByZW1vdmUgbWV0aG9kIGVycm9yIG1lc3NhZ2UgaWYgaXQgaXMgdGhlcmVcbiAgICAgICAgICAkKHRoYXQub3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvcikucGFyZW50KCkuZmluZCgnLmEtdmFsaWRhdGlvbi1lcnJvcicpLnJlbW92ZSgpO1xuICAgICAgICAgIC8vIGlmIGEgcGF5bWVudCBmaWVsZCBjaGFuZ2VkLCByZXNldCB0aGUgYnV0dG9uXG4gICAgICAgICAgdGhhdC5idXR0b25TdGF0dXMob3B0aW9ucywgJCh0aGF0Lm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLmZpbmQoJ2J1dHRvbicpLCBmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChwYXltZW50X3R5cGUgPT09ICdiYW5rX2FjY291bnQnKSB7XG4gICAgICAgICAgaWYgKCQoJ2lucHV0W25hbWU9XCJiYW5rVG9rZW5cIl0nKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAkKHRoYXQub3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvcikucHJlcGVuZCgnPHAgY2xhc3M9XCJlcnJvclwiPllvdSBhcmUgcmVxdWlyZWQgdG8gZW50ZXIgY3JlZGl0IGNhcmQgaW5mb3JtYXRpb24sIG9yIHRvIGF1dGhvcml6ZSBNaW5uUG9zdCB0byBjaGFyZ2UgeW91ciBiYW5rIGFjY291bnQsIHRvIG1ha2UgYSBwYXltZW50LjwvcD4nKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsaWQgPT09IHRydWUpIHtcbiAgICAgICAgICAvLyAxLiBzZXQgdXAgdGhlIGJ1dHRvbiBhbmQgcmVtb3ZlIHRoZSBoaWRkZW4gZmllbGRzIHdlIGRvbid0IG5lZWRcbiAgICAgICAgICB0aGF0LmJ1dHRvblN0YXR1cyh0aGF0Lm9wdGlvbnMsICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKSwgdHJ1ZSk7XG4gICAgICAgICAgdmFyIGJpbGxpbmdEZXRhaWxzID0gdGhhdC5nZW5lcmF0ZUJpbGxpbmdEZXRhaWxzKCk7XG5cbiAgICAgICAgICAvLyAyLiBjcmVhdGUgbWlubnBvc3QgYWNjb3VudCBpZiBzcGVjaWZpZWRcbiAgICAgICAgICBpZiAodGhhdC5vcHRpb25zLmNyZWF0ZV9hY2NvdW50ID09PSB0cnVlKSB7XG4gICAgICAgICAgICB2YXIgdXNlciA9IHtcbiAgICAgICAgICAgICAgZW1haWw6ICQodGhhdC5vcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICAgICAgZmlyc3RfbmFtZTogJCh0aGF0Lm9wdGlvbnMuZmlyc3RfbmFtZV9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgICAgIGxhc3RfbmFtZTogJCh0aGF0Lm9wdGlvbnMubGFzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICAgICAgcGFzc3dvcmQ6ICQodGhhdC5vcHRpb25zLnBhc3N3b3JkX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICAgICAgY2l0eTogJCh0aGF0Lm9wdGlvbnMuYmlsbGluZ19jaXR5X2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICAgICAgc3RhdGU6ICQodGhhdC5vcHRpb25zLmJpbGxpbmdfc3RhdGVfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgICAgICB6aXA6ICQodGhhdC5vcHRpb25zLmJpbGxpbmdfemlwX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgdXJsOiB0aGF0Lm9wdGlvbnMubWlubnBvc3Rfcm9vdCArICcvd3AtanNvbi91c2VyLWFjY291bnQtbWFuYWdlbWVudC92MS9jcmVhdGUtdXNlcicsXG4gICAgICAgICAgICAgIGRhdGE6IHVzZXJcbiAgICAgICAgICAgIH0pLmRvbmUoZnVuY3Rpb24oIGRhdGEgKSB7XG4gICAgICAgICAgICAgIGlmIChkYXRhLnN0YXR1cyA9PT0gJ3N1Y2Nlc3MnICYmIGRhdGEucmVhc29uID09PSAnbmV3IHVzZXInKSB7XG4gICAgICAgICAgICAgICAgLy8gdXNlciBjcmVhdGVkIC0gdGhleSBzaG91bGQgcmVjZWl2ZSBlbWFpbFxuICAgICAgICAgICAgICAgIC8vIHN1Ym1pdCB0aGUgZm9ybVxuICAgICAgICAgICAgICAgIC8vc3VwcG9ydGZvcm0uZ2V0KDApLnN1Ym1pdCgpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIHVzZXIgbm90IGNyZWF0ZWRcbiAgICAgICAgICAgICAgICAvLyBzdGlsbCBzdWJtaXQgdGhlIGZvcm1cbiAgICAgICAgICAgICAgICAvL3N1cHBvcnRmb3JtLmdldCgwKS5zdWJtaXQoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCQoJ2lucHV0W25hbWU9XCJiYW5rVG9rZW5cIl0nKS5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgLy8gZmluYWxseSwgZ2V0IGEgcGF5bWVudCBtZXRob2QgZnJvbSBzdHJpcGUsIGFuZCB0cnkgdG8gY2hhcmdlIGl0IGlmIGl0IGlzIG5vdCBhY2hcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlUGF5bWVudE1ldGhvZCh0aGF0LmNhcmROdW1iZXJFbGVtZW50LCBiaWxsaW5nRGV0YWlscyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCd3ZSBoYXZlIGEgYmFuayB0b2tlbi4gdGhlIHZhbHVlIGlzICcgKyAkKCcjYmFua1Rva2VuJykudmFsKCkgKTtcbiAgICAgICAgICAgIC8vIGlmIGl0IGlzIGFjaCwgd2UgYWxyZWFkeSBoYXZlIGEgdG9rZW4gc28gc3VibWl0IHRoZSBmb3JtXG4gICAgICAgICAgICAvLyB0b2RvOiBzZWUgaWYgd2UgY2FuIGRlbGV0ZSB0aGUgdG9rZW4gZnJvbSB0aGlzIGNhbGxcbiAgICAgICAgICAgIHRoYXQuYmFua1Rva2VuSGFuZGxlciggJCgnI2JhbmtUb2tlbicpLnZhbCgpLCAnYmFua19hY2NvdW50JyApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyB0aGlzIG1lYW5zIHZhbGlkIGlzIGZhbHNlXG4gICAgICAgICAgdGhhdC5idXR0b25TdGF0dXModGhhdC5vcHRpb25zLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICB9KTtcbiAgICB9LCAvLyB2YWxpZGF0ZUFuZFN1Ym1pdFxuXG4gICAgc3RyaXBlRXJyb3JEaXNwbGF5OiBmdW5jdGlvbihlcnJvciwgdGhpc19zZWxlY3RvciwgZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgLy8gbGlzdGVuIGZvciBlcnJvcnMgYW5kIGRpc3BsYXkvaGlkZSBlcnJvciBtZXNzYWdlc1xuICAgICAgdmFyIHdoaWNoX2Vycm9yID0gdGhpc19zZWxlY3Rvci5hdHRyKCdpZCcpO1xuICAgICAgLy8gd2hlbiB0aGlzIGZpZWxkIGNoYW5nZXMsIHJlc2V0IGl0cyBlcnJvcnNcbiAgICAgICQoJy5hLWNhcmQtaW5zdHJ1Y3Rpb24uJyArIHdoaWNoX2Vycm9yKS5yZW1vdmVDbGFzcygnYS12YWxpZGF0aW9uLWVycm9yJyk7XG4gICAgICAkKCcuYS1jYXJkLWluc3RydWN0aW9uLicgKyB3aGljaF9lcnJvcikuZW1wdHkoKTtcbiAgICAgICQodGhpc19zZWxlY3RvcikucmVtb3ZlQ2xhc3MoJ2EtZXJyb3InKTtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAkKCcuYS1jYXJkLWluc3RydWN0aW9uLicgKyB3aGljaF9lcnJvcikudGV4dChlcnJvci5tZXNzYWdlICsgJyBQbGVhc2UgdHJ5IGFnYWluLicpO1xuICAgICAgICAkKCcuYS1jYXJkLWluc3RydWN0aW9uLicgKyB3aGljaF9lcnJvcikuYWRkQ2xhc3MoJ2EtdmFsaWRhdGlvbi1lcnJvcicpO1xuICAgICAgICB0aGlzX3NlbGVjdG9yLnBhcmVudCgpLmFkZENsYXNzKCdtLWhhcy12YWxpZGF0aW9uLWVycm9yJyk7XG4gICAgICAgICQodGhpc19zZWxlY3RvcikuYWRkQ2xhc3MoJ2EtZXJyb3InKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQodGhpc19zZWxlY3RvcikucmVtb3ZlQ2xhc3MoJ2EtZXJyb3InKTtcbiAgICAgICAgJCgnLmEtY2FyZC1pbnN0cnVjdGlvbi4nICsgd2hpY2hfZXJyb3IpLnJlbW92ZUNsYXNzKCdhLXZhbGlkYXRpb24tZXJyb3InKTtcbiAgICAgICAgJCgnLmEtY2FyZC1pbnN0cnVjdGlvbi4nICsgd2hpY2hfZXJyb3IpLmVtcHR5KCk7XG4gICAgICAgICQob3B0aW9ucy5jY19udW1fc2VsZWN0b3IsIGVsZW1lbnQpLnJlbW92ZUNsYXNzKCdhLXZhbGlkYXRpb24tZXJyb3InKTtcbiAgICAgICAgJChvcHRpb25zLmNjX2V4cF9zZWxlY3RvciwgZWxlbWVudCkucmVtb3ZlQ2xhc3MoJ2EtdmFsaWRhdGlvbi1lcnJvcicpO1xuICAgICAgICAkKG9wdGlvbnMuY2NfY3ZjX3NlbGVjdG9yLCBlbGVtZW50KS5yZW1vdmVDbGFzcygnYS12YWxpZGF0aW9uLWVycm9yJyk7XG4gICAgICAgICQob3B0aW9ucy5jY19udW1fc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdtLWhhcy12YWxpZGF0aW9uLWVycm9yJyk7XG4gICAgICAgICQob3B0aW9ucy5jY19leHBfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdtLWhhcy12YWxpZGF0aW9uLWVycm9yJyk7XG4gICAgICAgICQob3B0aW9ucy5jY19jdmNfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdtLWhhcy12YWxpZGF0aW9uLWVycm9yJyk7XG4gICAgICB9XG4gICAgfSwgLy8gc3RyaXBlRXJyb3JEaXNwbGF5XG5cbiAgICBnZW5lcmF0ZUJpbGxpbmdEZXRhaWxzOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBiaWxsaW5nRGV0YWlscyA9IHt9O1xuICAgICAgdmFyIGFkZHJlc3NEZXRhaWxzID0ge307XG5cbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvcikudmFsKCkgIT0gJycpIHtcbiAgICAgICAgYmlsbGluZ0RldGFpbHMuZW1haWwgPSAkKHRoaXMub3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvcikudmFsKCk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIHZhciBmdWxsX25hbWUgPSAnJztcbiAgICAgIGlmICgkKCcjZnVsbF9uYW1lJykubGVuZ3RoID4gMCkge1xuICAgICAgICBmdWxsX25hbWUgPSAkKCcjZnVsbF9uYW1lJykudmFsKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmdWxsX25hbWUgPSAkKHRoaXMub3B0aW9ucy5maXJzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yKS52YWwoKSArICcgJyArICQodGhpcy5vcHRpb25zLmxhc3RfbmFtZV9maWVsZF9zZWxlY3RvcikudmFsKCk7XG4gICAgICB9XG4gICAgICBiaWxsaW5nRGV0YWlscy5uYW1lID0gZnVsbF9uYW1lO1xuXG4gICAgICB2YXIgc3RyZWV0ID0gJ05vbmUnO1xuICAgICAgaWYgKCQoJ2lucHV0W25hbWU9XCJmdWxsX2FkZHJlc3NcIl0nKS52YWwoKSAhPSAnJykge1xuICAgICAgICBzdHJlZXQgPSAkKCcjZnVsbF9hZGRyZXNzJykudmFsKCk7XG4gICAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5iaWxsaW5nX3N0cmVldF9maWVsZF9zZWxlY3RvcikudmFsKCkgIT0gJycpIHtcbiAgICAgICAgICBzdHJlZXQgPSAkKHRoaXMub3B0aW9ucy5iaWxsaW5nX3N0cmVldF9maWVsZF9zZWxlY3RvcikudmFsKCk7XG4gICAgICAgIH1cbiAgICAgICAgYWRkcmVzc0RldGFpbHMubGluZTEgPSBzdHJlZXQ7XG4gICAgICB9XG5cbiAgICAgIHZhciBjaXR5ID0gJ05vbmUnO1xuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmFjY291bnRfY2l0eV9zZWxlY3RvcikudmFsKCkgIT0gJycpIHtcbiAgICAgICAgY2l0eSA9ICQodGhpcy5vcHRpb25zLmFjY291bnRfY2l0eV9zZWxlY3RvcikudmFsKCk7XG4gICAgICAgIGFkZHJlc3NEZXRhaWxzLmNpdHkgPSBjaXR5O1xuICAgICAgfVxuXG4gICAgICB2YXIgc3RhdGUgPSAnTm9uZSc7XG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuYWNjb3VudF9zdGF0ZV9zZWxlY3RvcikudmFsKCkgIT0gJycpIHtcbiAgICAgICAgc3RhdGUgPSAkKHRoaXMub3B0aW9ucy5hY2NvdW50X3N0YXRlX3NlbGVjdG9yKS52YWwoKTtcbiAgICAgICAgYWRkcmVzc0RldGFpbHMuc3RhdGUgPSBzdGF0ZTtcbiAgICAgIH1cblxuICAgICAgdmFyIHppcCA9ICdOb25lJztcbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5hY2NvdW50X3ppcF9zZWxlY3RvcikudmFsKCkgIT0gJycpIHtcbiAgICAgICAgemlwID0gJCh0aGlzLm9wdGlvbnMuYWNjb3VudF96aXBfc2VsZWN0b3IpLnZhbCgpO1xuICAgICAgICBhZGRyZXNzRGV0YWlscy5wb3N0YWxfY29kZSA9IHppcDtcbiAgICAgIH1cblxuICAgICAgdmFyIGNvdW50cnkgPSAnVVMnO1xuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmJpbGxpbmdfY291bnRyeV9maWVsZF9zZWxlY3RvcikudmFsKCkgIT0gJycpIHtcbiAgICAgICAgY291bnRyeSA9ICQodGhpcy5vcHRpb25zLmJpbGxpbmdfY291bnRyeV9maWVsZF9zZWxlY3RvcikudmFsKCk7XG4gICAgICB9XG4gICAgICBhZGRyZXNzRGV0YWlscy5jb3VudHJ5ID0gY291bnRyeTtcblxuICAgICAgaWYgKHN0cmVldCAhPT0gJ05vbmUnIHx8IGNpdHkgIT09ICdOb25lJyB8fCBzdGF0ZSAhPT0gJ05vbmUnIHx8IHppcCAhPT0gJ05vbmUnKSB7XG4gICAgICAgIGJpbGxpbmdEZXRhaWxzLmFkZHJlc3MgPSBhZGRyZXNzRGV0YWlscztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGJpbGxpbmdEZXRhaWxzO1xuICAgIH0sIC8vIGdlbmVyYXRlQmlsbGluZ0RldGFpbHNcblxuICAgIGNyZWF0ZVBheW1lbnRNZXRob2Q6IGZ1bmN0aW9uKGNhcmRFbGVtZW50LCBiaWxsaW5nRGV0YWlscykge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdGhhdC5zdHJpcGUuY3JlYXRlUGF5bWVudE1ldGhvZCh7XG4gICAgICAgIHR5cGU6ICdjYXJkJyxcbiAgICAgICAgY2FyZDogY2FyZEVsZW1lbnQsXG4gICAgICAgIGJpbGxpbmdfZGV0YWlsczogYmlsbGluZ0RldGFpbHNcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKHJlc3BvbnNlLmVycm9yKSB7XG4gICAgICAgICAgdGhhdC5oYW5kbGVTZXJ2ZXJFcnJvcihyZXNwb25zZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gU2VuZCBwYXltZW50TWV0aG9kLmlkIHRvIHNlcnZlclxuICAgICAgICAgIHZhciBzdXBwb3J0Zm9ybSA9ICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKTtcbiAgICAgICAgICB2YXIgYWpheF91cmwgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG4gICAgICAgICAgdmFyIHRva2VuRmllbGROYW1lID0gJ3BheW1lbnRfbWV0aG9kX2lkJztcbiAgICAgICAgICB2YXIgdG9rZW5GaWVsZCA9ICdpbnB1dFtuYW1lPVwiJyArIHRva2VuRmllbGROYW1lICsgJ1wiXSc7XG5cbiAgICAgICAgICAvLyBJbnNlcnQgdGhlIHBheW1lbnQgbWV0aG9kIElEIGludG8gdGhlIGZvcm0gc28gaXQgZ2V0cyBzdWJtaXR0ZWQgdG8gdGhlIHNlcnZlclxuICAgICAgICAgIGlmICgkKHRva2VuRmllbGQpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICQodG9rZW5GaWVsZCkudmFsKHJlc3BvbnNlLnBheW1lbnRNZXRob2QuaWQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdXBwb3J0Zm9ybS5hcHBlbmQoJCgnPGlucHV0IHR5cGU9XFxcImhpZGRlblxcXCIgbmFtZT1cIicgKyB0b2tlbkZpZWxkTmFtZSArICdcIj4nKS52YWwocmVzcG9uc2UucGF5bWVudE1ldGhvZC5pZCkpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGZldGNoKGFqYXhfdXJsLCB7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYm9keTogJChzdXBwb3J0Zm9ybSkuc2VyaWFsaXplKClcbiAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAvLyBIYW5kbGUgc2VydmVyIHJlc3BvbnNlIChzZWUgU3RlcCAzKVxuICAgICAgICAgICAgcmVzcG9uc2UuanNvbigpLnRoZW4oZnVuY3Rpb24oanNvbikge1xuICAgICAgICAgICAgICB0aGF0LmhhbmRsZVNlcnZlclJlc3BvbnNlKGpzb24pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSwgLy8gY3JlYXRlUGF5bWVudE1ldGhvZFxuXG4gICAgYmFua1Rva2VuSGFuZGxlcjogZnVuY3Rpb24odG9rZW4sIHR5cGUpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHZhciBzdXBwb3J0Zm9ybSA9ICQodGhpcy5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKTtcbiAgICAgIHZhciBhamF4X3VybCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcblxuICAgICAgdGhhdC5zZXRTdHJpcGVQYXltZW50VHlwZSh0eXBlKTtcblxuICAgICAgLy8gU3VibWl0IHRoZSBmb3JtXG4gICAgICAvLyB0aGUgd2F5IGl0IHdvcmtzIGN1cnJlbnRseSBpcyB0aGUgZm9ybSBzdWJtaXRzIGFuIGFqYXggcmVxdWVzdCB0byBpdHNlbGZcbiAgICAgIC8vIHRoZW4gaXQgc3VibWl0cyBhIHBvc3QgcmVxdWVzdCB0byB0aGUgZm9ybSdzIGFjdGlvbiB1cmxcbiAgICAgICQuYWpheCh7XG4gICAgICAgIHVybDogYWpheF91cmwsXG4gICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgZGF0YTogJChzdXBwb3J0Zm9ybSkuc2VyaWFsaXplKCksXG4gICAgICAgIHR5cGU6ICdQT1NUJ1xuICAgICAgfSlcbiAgICAgIC5kb25lKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVzcG9uc2UuZXJyb3JzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIHRoYXQuaGFuZGxlU2VydmVyRXJyb3IocmVzcG9uc2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN1cHBvcnRmb3JtLmdldCgwKS5zdWJtaXQoKTsgLy8gY29udGludWUgc3VibWl0dGluZyB0aGUgZm9ybSBpZiB0aGUgYWpheCB3YXMgc3VjY2Vzc2Z1bFxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLmVycm9yKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgIHRoYXQuYnV0dG9uU3RhdHVzKHRoYXQub3B0aW9ucywgJCh0aGF0Lm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLmZpbmQoJ2J1dHRvbicpLCBmYWxzZSk7XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgaGFuZGxlU2VydmVyUmVzcG9uc2U6IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICB2YXIgc3VwcG9ydGZvcm0gPSAkKHRoaXMub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3Rvcik7XG4gICAgICBpZiAocmVzcG9uc2UuZXJyb3JzKSB7XG4gICAgICAgIC8vIFNob3cgZXJyb3IgZnJvbSBzZXJ2ZXIgb24gcGF5bWVudCBmb3JtXG4gICAgICAgIHRoaXMuaGFuZGxlU2VydmVyRXJyb3IocmVzcG9uc2UpO1xuICAgICAgfSBlbHNlIGlmIChyZXNwb25zZS5yZXF1aXJlc19hY3Rpb24pIHtcbiAgICAgICAgLy8gVXNlIFN0cmlwZS5qcyB0byBoYW5kbGUgcmVxdWlyZWQgY2FyZCBhY3Rpb25cbiAgICAgICAgLy9oYW5kbGVBY3Rpb24ocmVzcG9uc2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3VwcG9ydGZvcm0uZ2V0KDApLnN1Ym1pdCgpOyAvLyBjb250aW51ZSBzdWJtaXR0aW5nIHRoZSBmb3JtIGlmIHRoZSBhamF4IHdhcyBzdWNjZXNzZnVsXG4gICAgICB9XG4gICAgfSwgLy8gaGFuZGxlU2VydmVyUmVzcG9uc2VcblxuICAgIGhhbmRsZVNlcnZlckVycm9yOiBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdmFyIGZpZWxkID0gJyc7XG4gICAgICAvLyBkbyBub3Qgc3VibWl0LiB0aGVyZSBpcyBhbiBlcnJvci5cbiAgICAgIHRoYXQuYnV0dG9uU3RhdHVzKHRoYXQub3B0aW9ucywgJCh0aGF0Lm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLmZpbmQoJ2J1dHRvbicpLCBmYWxzZSk7XG4gICAgICAvLyBoYW5kbGUgZXJyb3IgZGlzcGxheVxuICAgICAgaWYgKHR5cGVvZiByZXNwb25zZS5lcnJvcnMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVzcG9uc2UuZXJyb3JzWzBdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGZpZWxkID0gcmVzcG9uc2UuZXJyb3JzWzBdLmZpZWxkICsgJ19maWVsZF9zZWxlY3Rvcic7XG4gICAgICAgIH1cbiAgICAgICAgJC5lYWNoKHJlc3BvbnNlLmVycm9ycywgZnVuY3Rpb24oIGluZGV4LCBlcnJvciApIHtcbiAgICAgICAgICB0aGlzX2ZpZWxkID0gZXJyb3IuZmllbGQgKyAnX2ZpZWxkX3NlbGVjdG9yJztcbiAgICAgICAgICB0aGF0LmRpc3BsYXlFcnJvck1lc3NhZ2UoZXJyb3IsIHRoaXNfZmllbGQpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmICgkKHRoYXQub3B0aW9uc1tmaWVsZF0pLmxlbmd0aCA+IDApIHtcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgIHNjcm9sbFRvcDogJCh0aGF0Lm9wdGlvbnNbZmllbGRdKS5wYXJlbnQoKS5vZmZzZXQoKS50b3BcbiAgICAgICAgfSwgMjAwMCk7XG4gICAgICB9XG4gICAgfSwgLy8gaGFuZGxlU2VydmVyRXJyb3JcblxuICAgIGRpc3BsYXlFcnJvck1lc3NhZ2UoZXJyb3IsIGZpZWxkKSB7XG4gICAgICB2YXIgbWVzc2FnZSA9ICcnO1xuICAgICAgdmFyIHN0cmlwZUVycm9yU2VsZWN0b3IgPSAnJztcbiAgICAgIGlmICh0eXBlb2YgZXJyb3IubWVzc2FnZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgbWVzc2FnZSA9IGVycm9yLm1lc3NhZ2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtZXNzYWdlID0gZXJyb3IubWVzc2FnZVswXTtcbiAgICAgIH1cbiAgICAgIGlmICgkKHRoaXMub3B0aW9uc1tmaWVsZF0pLmxlbmd0aCA+IDApIHtcbiAgICAgICAgJCh0aGlzLm9wdGlvbnNbZmllbGRdKS5hZGRDbGFzcygnYS1lcnJvcicpO1xuICAgICAgICAkKHRoaXMub3B0aW9uc1tmaWVsZF0pLnByZXYoKS5hZGRDbGFzcygnYS1lcnJvcicpO1xuICAgICAgICAkKHRoaXMub3B0aW9uc1tmaWVsZF0pLmFmdGVyKCc8c3BhbiBjbGFzcz1cImEtdmFsaWRhdGlvbi1lcnJvciBpbnZhbGlkXCI+JyArIG1lc3NhZ2UgKyAnPC9zcGFuPicpO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGVvZiBlcnJvciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhpcy5idXR0b25TdGF0dXModGhpcy5vcHRpb25zLCAkKHRoaXMub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIGZhbHNlKTtcbiAgICAgICAgaWYgKGVycm9yLmNvZGUgPT09ICdpbmNvbXBsZXRlX251bWJlcicgfHwgZXJyb3IuY29kZSA9PSAnaW52YWxpZF9udW1iZXInIHx8IGVycm9yLmNvZGUgPT0gJ2luY29ycmVjdF9udW1iZXInIHx8IGVycm9yLmNvZGUgPT0gJ2NhcmRfZGVjbGluZWQnIHx8IGVycm9yLmNvZGUgPT0gJ3Byb2Nlc3NpbmdfZXJyb3InKSB7XG4gICAgICAgICAgLy8gZXJyb3IgaGFuZGxpbmdcbiAgICAgICAgICBzdHJpcGVFcnJvclNlbGVjdG9yID0gJCh0aGlzLm9wdGlvbnMuY2NfbnVtX3NlbGVjdG9yKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXJyb3IuY29kZSA9PSAnaW52YWxpZF9leHBpcnlfbW9udGgnIHx8IGVycm9yLmNvZGUgPT0gJ2ludmFsaWRfZXhwaXJ5X3llYXInIHx8IGVycm9yLmNvZGUgPT0gJ2V4cGlyZWRfY2FyZCcpIHtcbiAgICAgICAgICAvLyBlcnJvciBoYW5kbGluZ1xuICAgICAgICAgIHN0cmlwZUVycm9yU2VsZWN0b3IgPSAkKHRoaXMub3B0aW9ucy5jY19leHBfc2VsZWN0b3IpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJvci5jb2RlID09ICdpbnZhbGlkX2N2YycgfHwgZXJyb3IuY29kZSA9PSAnaW5jb3JyZWN0X2N2YycpIHtcbiAgICAgICAgICAvLyBlcnJvciBoYW5kbGluZ1xuICAgICAgICAgIHN0cmlwZUVycm9yU2VsZWN0b3IgPSAkKHRoaXMub3B0aW9ucy5jY19jdmNfc2VsZWN0b3IpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdHJpcGVFcnJvclNlbGVjdG9yICE9PSAnJykge1xuICAgICAgICAgIHRoaXMuc3RyaXBlRXJyb3JEaXNwbGF5KGVycm9yLCBzdHJpcGVFcnJvclNlbGVjdG9yLCB0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJvci5maWVsZCA9PSAncmVjYXB0Y2hhJykge1xuICAgICAgICAgICQodGhpcy5vcHRpb25zLnBheV9idXR0b25fc2VsZWN0b3IpLmJlZm9yZSgnPHAgY2xhc3M9XCJhLWZvcm0tY2FwdGlvbiBhLXJlY2FwdGNoYS1lcnJvclwiPicgKyBtZXNzYWdlICsgJzwvcD4nKVxuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJvci50eXBlID09ICdpbnZhbGlkX3JlcXVlc3RfZXJyb3InKSB7XG4gICAgICAgICAgJCh0aGlzLm9wdGlvbnMucGF5X2J1dHRvbl9zZWxlY3RvcikuYmVmb3JlKCc8cCBjbGFzcz1cImVycm9yIGVycm9yLWludmFsaWQtcmVxdWVzdFwiPicgKyBlcnJvci5tZXNzYWdlICsgJzwvcD4nKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwgLy8gZGlzcGxheUVycm9yTWVzc2FnZVxuXG4gICAgc2hvd05ld3NsZXR0ZXJTZXR0aW5nczogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuXG4gICAgICB2YXIgbmV3c2xldHRlcl9ncm91cF9odG1sID0gJyc7XG4gICAgICBpZiAoJChvcHRpb25zLm5ld3NsZXR0ZXJfZ3JvdXBfc2VsZWN0b3IpLmxlbmd0aCA+IDAgKSB7XG4gICAgICAgIHZhciBnZXRfZGF0YSA9IHtcbiAgICAgICAgICBzaG9ydGNvZGU6ICduZXdzbGV0dGVyX2Zvcm0nLFxuICAgICAgICAgIHBsYWNlbWVudDogJ3VzZXJhY2NvdW50J1xuICAgICAgICB9O1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgdXJsOiBvcHRpb25zLm1pbm5wb3N0X3Jvb3QgKyAnL3dwLWpzb24vbWlubnBvc3QtYXBpL3YyL21haWxjaGltcC9mb3JtJyxcbiAgICAgICAgICBkYXRhOiBnZXRfZGF0YVxuICAgICAgICB9KS5kb25lKGZ1bmN0aW9uKCByZXN1bHQgKSB7XG4gICAgICAgICAgaWYgKCB0eXBlb2YgcmVzdWx0Lmdyb3VwX2ZpZWxkcyAhPT0gJ3VuZGVmaW5lZCcgKSB7XG4gICAgICAgICAgICAkLmVhY2gocmVzdWx0Lmdyb3VwX2ZpZWxkcywgZnVuY3Rpb24oIGluZGV4LCBjYXRlZ29yeSApIHtcbiAgICAgICAgICAgICAgbmV3c2xldHRlcl9ncm91cF9odG1sICs9ICc8ZmllbGRzZXQgY2xhc3M9XCJtLWZvcm0taXRlbSBzdXBwb3J0LW5ld3NsZXR0ZXIgbS1mb3JtLWl0ZW0tJyArIGNhdGVnb3J5LnR5cGUgKyAnXCI+JztcbiAgICAgICAgICAgICAgbmV3c2xldHRlcl9ncm91cF9odG1sICs9ICc8bGFiZWw+JyArIGNhdGVnb3J5Lm5hbWUgKyAnOjwvbGFiZWw+JztcbiAgICAgICAgICAgICAgaWYgKCBjYXRlZ29yeS5jb250YWlucy5sZW5ndGggPiAwICkge1xuICAgICAgICAgICAgICAgIG5ld3NsZXR0ZXJfZ3JvdXBfaHRtbCArPSAnPGRpdiBjbGFzcz1cIm0tZm9ybS1pdGVtIG0tZm9ybS1pdGVtLW5ld3NsZXR0ZXJcIj4nO1xuICAgICAgICAgICAgICAgICQuZWFjaChjYXRlZ29yeVtjYXRlZ29yeS5jb250YWluc10sIGZ1bmN0aW9uKCBpbmRleCwgaXRlbSApIHtcbiAgICAgICAgICAgICAgICAgIG5ld3NsZXR0ZXJfZ3JvdXBfaHRtbCArPSAnPGxhYmVsPjxpbnB1dCBuYW1lPVwiZ3JvdXBzX3N1Ym1pdHRlZFwiIHR5cGU9XCJjaGVja2JveFwiIHZhbHVlPVwiJyArIGl0ZW0uaWQgKyAnXCI+JyArIGl0ZW0ubmFtZSArICc8L2xhYmVsPic7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbmV3c2xldHRlcl9ncm91cF9odG1sICs9ICc8L2Rpdj4nO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIG5ld3NsZXR0ZXJfZ3JvdXBfaHRtbCArPSAnPC9maWVsZHNldD4nO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkKG9wdGlvbnMubmV3c2xldHRlcl9ncm91cF9zZWxlY3RvcikuaHRtbChuZXdzbGV0dGVyX2dyb3VwX2h0bWwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmICgkKG9wdGlvbnMubmV3c2xldHRlcl9ncm91cF9zZWxlY3RvcikubGVuZ3RoID4gMCAmJiB0eXBlb2YgJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdmFyIGdldF9kYXRhID0ge1xuICAgICAgICAgIGVtYWlsOiAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpXG4gICAgICAgIH07XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICB1cmw6IG9wdGlvbnMubWlubnBvc3Rfcm9vdCArICcvd3AtanNvbi9taW5ucG9zdC1hcGkvdjIvbWFpbGNoaW1wL3VzZXInLFxuICAgICAgICAgIGRhdGE6IGdldF9kYXRhXG4gICAgICAgIH0pLmRvbmUoZnVuY3Rpb24oIHJlc3VsdCApIHtcbiAgICAgICAgICBpZiAoIHR5cGVvZiByZXN1bHQubWFpbGNoaW1wX3N0YXR1cyAhPT0gJ3VuZGVmaW5lZCcgKSB7XG4gICAgICAgICAgICAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLmFmdGVyKCc8aW5wdXQgbmFtZT1cIm1haWxjaGltcF9zdGF0dXNcIiB0eXBlPVwiaGlkZGVuXCIgdmFsdWU9XCInICsgcmVzdWx0Lm1haWxjaGltcF9zdGF0dXMgKyAnXCI+Jyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICggdHlwZW9mIHJlc3VsdC5tYWlsY2hpbXBfdXNlcl9pZCAhPT0gJ3VuZGVmaW5lZCcgKSB7XG4gICAgICAgICAgICAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLmFmdGVyKCc8aW5wdXQgbmFtZT1cIm1haWxjaGltcF91c2VyX2lkXCIgdHlwZT1cImhpZGRlblwiIHZhbHVlPVwiJyArIHJlc3VsdC5tYWlsY2hpbXBfdXNlcl9pZCArICdcIj4nKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHJlc3VsdC5tYWlsY2hpbXBfc3RhdHVzID09PSAnc3Vic2NyaWJlZCcpIHtcbiAgICAgICAgICAgIC8vIHVzZXIgY3JlYXRlZCAtIHNob3cgYSBzdWNjZXNzIG1lc3NhZ2VcbiAgICAgICAgICAgICQoJy5hLWNvbmZpcm0taW5zdHJ1Y3Rpb25zJykudGV4dCgkKCcuYS1jb25maXJtLWluc3RydWN0aW9ucycpLmF0dHIoJ2RhdGEta25vd24tdXNlcicpKTtcbiAgICAgICAgICAgIHZhciBncm91cHMgPSByZXN1bHQuZ3JvdXBzO1xuICAgICAgICAgICAgJC5lYWNoKGdyb3VwcywgZnVuY3Rpb24oIGluZGV4LCB2YWx1ZSApIHtcbiAgICAgICAgICAgICAgaWYgKCB2YWx1ZSA9PT0gdHJ1ZSApIHtcbiAgICAgICAgICAgICAgICAkKCc6Y2hlY2tib3hbdmFsdWU9XCInICsgaW5kZXggKyAnXCJdJykucHJvcCgnY2hlY2tlZCcsdHJ1ZSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJCgnOmNoZWNrYm94W3ZhbHVlPVwiJyArIGluZGV4ICsgJ1wiXScpLnByb3AoJ2NoZWNrZWQnLGZhbHNlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgIH0sIC8vIHNob3dOZXdzbGV0dGVyU2V0dGluZ3NcblxuICAgIGNvbmZpcm1NZXNzYWdlU3VibWl0OiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG5cbiAgICAgIHZhciBleGlzdGluZ19uZXdzbGV0dGVyX3NldHRpbmdzID0gJChvcHRpb25zLm5ld3NsZXR0ZXJfZ3JvdXBfc2VsZWN0b3IgKyAnIGlucHV0Jykuc2VyaWFsaXplKCk7XG4gICAgICAvL3RoaXMuZGVidWcoZXhpc3RpbmdfbmV3c2xldHRlcl9zZXR0aW5ncyk7XG5cbiAgICAgICQob3B0aW9ucy5jb25maXJtX2Zvcm1fc2VsZWN0b3IpLnN1Ym1pdChmdW5jdGlvbihldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIHZhciBjb25maXJtZm9ybSA9ICQob3B0aW9ucy5jb25maXJtX2Zvcm1fc2VsZWN0b3IpO1xuICAgICAgICAvLyBzdWJtaXQgc2V0dGluZ3MgdG8gbWFpbGNoaW1wXG4gICAgICAgIC8vIG5lZWQgdG8gZ2V0IHVzZXIgaW5mbyBvbiBhIGhpZGRlbiBmaWVsZCBoZXJlXG5cbiAgICAgICAgdmFyIG5ld3NsZXR0ZXJfZ3JvdXBzID0gJChvcHRpb25zLm5ld3NsZXR0ZXJfZ3JvdXBfc2VsZWN0b3IgKyAnIGlucHV0OmNoZWNrZWQnKTtcbiAgICAgICAgdmFyIG5ld19uZXdzbGV0dGVyX3NldHRpbmdzID0gbmV3c2xldHRlcl9ncm91cHMuc2VyaWFsaXplKCk7XG5cbiAgICAgICAgaWYgKChleGlzdGluZ19uZXdzbGV0dGVyX3NldHRpbmdzICE9PSBuZXdfbmV3c2xldHRlcl9zZXR0aW5ncykgJiYgKHR5cGVvZiBuZXdzbGV0dGVyX2dyb3VwcyAhPT0gJ3VuZGVmaW5lZCcpKSB7XG4gICAgICAgICAgLy9hZGQgb3VyIG93biBhamF4IGNoZWNrIGFzIFgtUmVxdWVzdGVkLVdpdGggaXMgbm90IGFsd2F5cyByZWxpYWJsZVxuICAgICAgICAgIC8vYWpheF9mb3JtX2RhdGEgPSBuZXdfbmV3c2xldHRlcl9zZXR0aW5ncyArICcmYWpheHJlcXVlc3Q9dHJ1ZSZzdWJzY3JpYmUnO1xuXG4gICAgICAgICAgdmFyIHBvc3RfZGF0YSA9IHtcbiAgICAgICAgICAgIGVtYWlsOiAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgICAgZmlyc3RfbmFtZTogJChvcHRpb25zLmZpcnN0X25hbWVfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgICAgbGFzdF9uYW1lOiAkKG9wdGlvbnMubGFzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICAgIGdyb3Vwc19zdWJtaXR0ZWQ6IHt9XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHBvc3RfZGF0YS5ncm91cHNfYXZhaWxhYmxlID0gJ2FsbCc7XG5cbiAgICAgICAgICBpZiAoICQoJ2lucHV0W25hbWU9XCJtYWlsY2hpbXBfc3RhdHVzXCJdJykubGVuZ3RoID4gMCApIHtcbiAgICAgICAgICAgIHBvc3RfZGF0YS5tYWlsY2hpbXBfc3RhdHVzID0gJCgnaW5wdXRbbmFtZT1cIm1haWxjaGltcF9zdGF0dXNcIl0nKS52YWwoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoICQoJ2lucHV0W25hbWU9XCJtYWlsY2hpbXBfdXNlcl9pZFwiXScpLmxlbmd0aCA+IDAgKSB7XG4gICAgICAgICAgICBwb3N0X2RhdGEubWFpbGNoaW1wX3VzZXJfaWQgPSAkKCdpbnB1dFtuYW1lPVwibWFpbGNoaW1wX3VzZXJfaWRcIl0nKS52YWwoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodHlwZW9mIG5ld3NsZXR0ZXJfZ3JvdXBzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgJC5lYWNoKG5ld3NsZXR0ZXJfZ3JvdXBzLCBmdW5jdGlvbihpbmRleCwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgdmFyIGdyb3VwID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgICAgICAgcG9zdF9kYXRhLmdyb3Vwc19zdWJtaXR0ZWRbaW5kZXhdID0gZ3JvdXA7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBvcHRpb25zLm1pbm5wb3N0X3Jvb3QgKyAnL3dwLWpzb24vbWlubnBvc3QtYXBpL3YyL21haWxjaGltcC91c2VyJyxcbiAgICAgICAgICAgIHR5cGU6ICdwb3N0JyxcbiAgICAgICAgICAgIGRhdGFUeXBlIDogJ2pzb24nLFxuICAgICAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04JyxcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHBvc3RfZGF0YSlcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5kb25lKGZ1bmN0aW9uKHJlc3BvbnNlKSB7IC8vIHJlc3BvbnNlIGZyb20gdGhlIFBIUCBhY3Rpb25cbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gJyc7XG4gICAgICAgICAgICBpZiAoIHJlc3BvbnNlLnN1Y2Nlc3MgPT09IHRydWUgKSB7XG4gICAgICAgICAgICAgIC8qc3dpdGNoIChyZXNwb25zZS5kYXRhLnVzZXJfc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnZXhpc3RpbmcnOlxuICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9ICdUaGFua3MgZm9yIHVwZGF0aW5nIHlvdXIgZW1haWwgcHJlZmVyZW5jZXMuIFRoZXkgd2lsbCBnbyBpbnRvIGVmZmVjdCBpbW1lZGlhdGVseS4nO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbmV3JzpcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnV2UgaGF2ZSBhZGRlZCB5b3UgdG8gdGhlIE1pbm5Qb3N0IG1haWxpbmcgbGlzdC4nO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncGVuZGluZyc6XG4gICAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ1dlIGhhdmUgYWRkZWQgeW91IHRvIHRoZSBNaW5uUG9zdCBtYWlsaW5nIGxpc3QuIFlvdSB3aWxsIG5lZWQgdG8gY2xpY2sgdGhlIGNvbmZpcm1hdGlvbiBsaW5rIGluIHRoZSBlbWFpbCB3ZSBzZW50IHRvIGJlZ2luIHJlY2VpdmluZyBtZXNzYWdlcy4nO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH0qL1xuICAgICAgICAgICAgICAvL2NvbmZpcm1mb3JtLmdldCgwKS5zdWJtaXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbmZpcm1mb3JtLmdldCgwKS5zdWJtaXQoKTtcbiAgICAgICAgICAgIC8vJCgnLm0taG9sZC1tZXNzYWdlJykuaHRtbCgnPGRpdiBjbGFzcz1cIm0tZm9ybS1tZXNzYWdlIG0tZm9ybS1tZXNzYWdlLWluZm9cIj4nICsgbWVzc2FnZSArICc8L2Rpdj4nKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAvLyB3ZSBzaG91bGQgcHV0IGFuIGFjdHVhbCBlcnJvciBtZXNzYWdlIGhlcmUgc29tZWRheSwgcHJvYmFibHlcbiAgICAgICAgICAgIC8vJCgnLm0taG9sZC1tZXNzYWdlJykuaHRtbCgnPGRpdiBjbGFzcz1cIm0tZm9ybS1tZXNzYWdlIG0tZm9ybS1tZXNzYWdlLWluZm9cIj5BbiBlcnJvciBoYXMgb2NjdXJlZC4gUGxlYXNlIHRyeSBhZ2Fpbi48L2Rpdj4nKTtcbiAgICAgICAgICAgIGNvbmZpcm1mb3JtLmdldCgwKS5zdWJtaXQoKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICB9IGVsc2UgeyAvLyBlbmQgcGFydCB3aGVyZSBzZXR0aW5ncyBjaGFuZ2VkXG4gICAgICAgICAgY29uZmlybWZvcm0uZ2V0KDApLnN1Ym1pdCgpO1xuICAgICAgICB9XG5cbiAgICAgIH0pO1xuICAgICAgLy9yZXR1cm4gZmFsc2U7XG4gICAgfSwgLy8gY29uZmlybU1lc3NhZ2VTdWJtaXRcblxuICB9OyAvLyBwbHVnaW4ucHJvdG90eXBlXG5cbiAgLy8gQSByZWFsbHkgbGlnaHR3ZWlnaHQgcGx1Z2luIHdyYXBwZXIgYXJvdW5kIHRoZSBjb25zdHJ1Y3RvcixcbiAgLy8gcHJldmVudGluZyBhZ2FpbnN0IG11bHRpcGxlIGluc3RhbnRpYXRpb25zXG4gICQuZm5bcGx1Z2luTmFtZV0gPSBmdW5jdGlvbiAoIG9wdGlvbnMgKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoISQuZGF0YSh0aGlzLCAncGx1Z2luXycgKyBwbHVnaW5OYW1lKSkge1xuICAgICAgICAkLmRhdGEodGhpcywgJ3BsdWdpbl8nICsgcGx1Z2luTmFtZSwgbmV3IFBsdWdpbiggdGhpcywgb3B0aW9ucyApKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxufSkoIGpRdWVyeSwgd2luZG93LCBkb2N1bWVudCApOyJdfQ==
