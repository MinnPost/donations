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
    'account_city_selector': '#billing_city',
    'account_state_selector': '#billing_state',
    'account_zip_selector': '#billing_zip',
    'create_mp_selector': '#creatempaccount',
    'password_selector': '.m-form-item-password',
    'additional_amount_field': '#additional_donation',
    'shipping_selector': 'fieldset.m-shipping-information',
    'choose_payment': '#choose-payment-method',
    'payment_method_selector': '.payment-method',
    'cc_num_selector': '#card-number',
    'cc_exp_selector': '#card-expiry',
    'cc_cvv_selector': '#card-cvc',
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
      var payment_type = $(options.choose_payment + ' input').val(); // set the fair market value if applicable

      var amount_selector_fair_market = $(options.original_amount_selector, element);

      if (amount_selector_fair_market.is(':radio')) {
        amount_selector_fair_market = $(options.original_amount_selector + ':checked', element);
      }

      that.setFairMarketValue(amount_selector_fair_market);
      $(options.original_amount_selector, element).change(function () {
        that.options.original_amount = parseInt($(this, element).val(), 10);

        if (payment_type === 'bank_account') {
          that.calculateFees(that.options.original_amount, 'bank_account');
        } else {
          that.calculateFees(that.options.original_amount, 'card');
        }

        that.setFairMarketValue($(this, element));
      });
      $(options.additional_amount_field, element).change(function () {
        that.options.original_amount = parseInt($(options.original_amount_selector, element).val(), 10);

        if (payment_type === 'bank_account') {
          that.calculateFees(that.options.original_amount, 'bank_account');
        } else {
          that.calculateFees(that.options.original_amount, 'card');
        }
      });
    },
    // amountUpdated
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
      var total_amount = amount;

      if ($(this.options.additional_amount_field).length > 0 && $(this.options.additional_amount_field).val() > 0) {
        var additional_amount = $(this.options.additional_amount_field).val();
        total_amount = parseInt(additional_amount, 10) + parseInt(amount, 10);
      }

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
    setStripePaymentType: function setStripePaymentType(stripe_payment_type) {
      if ($('input[name="stripe_payment_type"]').length === 0) {
        $(this.options.donate_form_selector).append('<input type=\"hidden\" name=\"stripe_payment_type\">');
      }

      $('input[name="stripe_payment_type"]').val(stripe_payment_type);
    },
    // setStripePaymentType
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
          var checked = $(options.choose_payment + ' input:checked').attr('id');
          var checked_value = $(options.choose_payment + ' input:checked').val();
          that.setupPaymentMethod(checked, checked_value);
        }

        $(options.choose_payment + ' input').change(function (event) {
          that.setupPaymentMethod(this.id, this.value);

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
            // finally, get a token from stripe, and try to charge it if it is not ach
            that.createToken(that.cardNumberElement, tokenData);
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
    stripeTokenHandler: function stripeTokenHandler(token, type) {
      var that = this;
      var supportform = $(this.options.donate_form_selector);
      var ajax_url = '';
      var tokenFieldName = 'stripeToken';
      var tokenField = 'input[name="' + tokenFieldName + '"]';

      if (typeof $(supportform).data('action') !== 'undefined') {
        ajax_url = $(supportform).data('action');
      } else {
        ajax_url = window.location.pathname;
      } // Insert the token ID into the form so it gets submitted to the server


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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0cmlwZS5wYXltZW50LmpzIiwidmFsaWQtZm9ybS5taW4uanMiLCJtaW5ucG9zdC5naXZpbmcuanMiXSwibmFtZXMiOlsiZiIsImV4cG9ydHMiLCJtb2R1bGUiLCJkZWZpbmUiLCJhbWQiLCJnIiwid2luZG93IiwiZ2xvYmFsIiwic2VsZiIsInBheW1lbnQiLCJqcyIsImUiLCJ0IiwibiIsInIiLCJzIiwibyIsInUiLCJhIiwicmVxdWlyZSIsImkiLCJFcnJvciIsImNvZGUiLCJsIiwiY2FsbCIsImxlbmd0aCIsIlFKIiwicnJldHVybiIsInJ0cmltIiwic2VsZWN0b3IiLCJpc0RPTUVsZW1lbnQiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJlbCIsIm5vZGVOYW1lIiwidHJpbSIsInRleHQiLCJyZXBsYWNlIiwidmFsIiwicmV0IiwiYXJndW1lbnRzIiwidmFsdWUiLCJwcmV2ZW50RGVmYXVsdCIsImV2ZW50T2JqZWN0IiwicmV0dXJuVmFsdWUiLCJub3JtYWxpemVFdmVudCIsIm9yaWdpbmFsIiwid2hpY2giLCJ0YXJnZXQiLCJzcmNFbGVtZW50Iiwib3JpZ2luYWxFdmVudCIsImRhdGEiLCJkZXRhaWwiLCJjaGFyQ29kZSIsImtleUNvZGUiLCJvbiIsImVsZW1lbnQiLCJldmVudE5hbWUiLCJjYWxsYmFjayIsImoiLCJsZW4iLCJsZW4xIiwibXVsdEV2ZW50TmFtZSIsIm9yaWdpbmFsQ2FsbGJhY2siLCJyZWYiLCJtYXRjaCIsInNwbGl0IiwiYWRkRXZlbnRMaXN0ZW5lciIsImF0dGFjaEV2ZW50IiwiYWRkQ2xhc3MiLCJjbGFzc05hbWUiLCJyZXN1bHRzIiwicHVzaCIsImNsYXNzTGlzdCIsImFkZCIsImhhc0NsYXNzIiwiY29udGFpbnMiLCJSZWdFeHAiLCJ0ZXN0IiwicmVtb3ZlQ2xhc3MiLCJjbHMiLCJyZW1vdmUiLCJqb2luIiwidG9nZ2xlQ2xhc3MiLCJib29sIiwiYXBwZW5kIiwidG9BcHBlbmQiLCJpbnNlcnRBZGphY2VudEhUTUwiLCJmaW5kIiwiTm9kZUxpc3QiLCJBcnJheSIsInRyaWdnZXIiLCJuYW1lIiwiZXJyb3IiLCJldiIsIkN1c3RvbUV2ZW50IiwiY3JlYXRlRXZlbnQiLCJpbml0Q3VzdG9tRXZlbnQiLCJpbml0RXZlbnQiLCJkaXNwYXRjaEV2ZW50IiwiUGF5bWVudCIsImNhcmRGcm9tTnVtYmVyIiwiY2FyZEZyb21UeXBlIiwiY2FyZHMiLCJkZWZhdWx0Rm9ybWF0IiwiZm9ybWF0QmFja0NhcmROdW1iZXIiLCJmb3JtYXRCYWNrRXhwaXJ5IiwiZm9ybWF0Q2FyZE51bWJlciIsImZvcm1hdEV4cGlyeSIsImZvcm1hdEZvcndhcmRFeHBpcnkiLCJmb3JtYXRGb3J3YXJkU2xhc2giLCJmb3JtYXRNb250aEV4cGlyeSIsImhhc1RleHRTZWxlY3RlZCIsImx1aG5DaGVjayIsInJlRm9ybWF0Q2FyZE51bWJlciIsInJlc3RyaWN0Q1ZDIiwicmVzdHJpY3RDYXJkTnVtYmVyIiwicmVzdHJpY3RDb21iaW5lZEV4cGlyeSIsInJlc3RyaWN0RXhwaXJ5IiwicmVzdHJpY3RNb250aEV4cGlyeSIsInJlc3RyaWN0TnVtZXJpYyIsInJlc3RyaWN0WWVhckV4cGlyeSIsInNldENhcmRUeXBlIiwiaW5kZXhPZiIsIml0ZW0iLCJ0eXBlIiwicGF0dGVybiIsImZvcm1hdCIsImN2Y0xlbmd0aCIsImx1aG4iLCJudW0iLCJjYXJkIiwiZGlnaXQiLCJkaWdpdHMiLCJvZGQiLCJzdW0iLCJyZXZlcnNlIiwicGFyc2VJbnQiLCJzZWxlY3Rpb25TdGFydCIsInNlbGVjdGlvbkVuZCIsInNlbGVjdGlvbiIsImNyZWF0ZVJhbmdlIiwic2V0VGltZW91dCIsIl90aGlzIiwiZm5zIiwicmUiLCJ1cHBlckxlbmd0aCIsIlN0cmluZyIsImZyb21DaGFyQ29kZSIsIm1ldGEiLCJzbGFzaCIsIm1ldGFLZXkiLCJpbnB1dCIsImN0cmxLZXkiLCJhbGxUeXBlcyIsImNhcmRUeXBlIiwiY2FyZEV4cGlyeVZhbCIsIm1vbnRoIiwicHJlZml4IiwieWVhciIsIkRhdGUiLCJnZXRGdWxsWWVhciIsInRvU3RyaW5nIiwic2xpY2UiLCJ2YWxpZGF0ZUNhcmROdW1iZXIiLCJ2YWxpZGF0ZUNhcmRFeHBpcnkiLCJjdXJyZW50VGltZSIsImV4cGlyeSIsInNldE1vbnRoIiwiZ2V0TW9udGgiLCJ2YWxpZGF0ZUNhcmRDVkMiLCJjdmMiLCJyZWYxIiwiZ3JvdXBzIiwiZXhlYyIsInNoaWZ0IiwiZm9ybWF0Q2FyZENWQyIsImZvcm1hdENhcmRFeHBpcnkiLCJmb3JtYXRDYXJkRXhwaXJ5TXVsdGlwbGUiLCJnZXRDYXJkQXJyYXkiLCJzZXRDYXJkQXJyYXkiLCJjYXJkQXJyYXkiLCJhZGRUb0NhcmRBcnJheSIsImNhcmRPYmplY3QiLCJyZW1vdmVGcm9tQ2FyZEFycmF5Iiwia2V5Iiwic3BsaWNlIiwiYyIsInAiLCJfdmFsaWRGb3JtIiwiX3ZhbGlkRm9ybTIiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0Iiwib2JqIiwiX19lc01vZHVsZSIsImRlZmF1bHQiLCJWYWxpZEZvcm0iLCJ0b2dnbGVJbnZhbGlkQ2xhc3MiLCJoYW5kbGVDdXN0b21NZXNzYWdlcyIsImhhbmRsZUN1c3RvbU1lc3NhZ2VEaXNwbGF5IiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJjbG9uZSIsImRlZmF1bHRzIiwiaW5zZXJ0QWZ0ZXIiLCJpbnNlcnRCZWZvcmUiLCJmb3JFYWNoIiwiZGVib3VuY2UiLCJjb3B5IiwiYXR0ciIsImhhc093blByb3BlcnR5IiwiZGVmYXVsdE9iamVjdCIsImsiLCJ1bmRlZmluZWQiLCJyZWZOb2RlIiwibm9kZVRvSW5zZXJ0Iiwic2libGluZyIsIm5leHRTaWJsaW5nIiwiX3BhcmVudCIsInBhcmVudE5vZGUiLCJwYXJlbnQiLCJhcHBlbmRDaGlsZCIsIml0ZW1zIiwiZm4iLCJtcyIsInRpbWVvdXQiLCJkZWJvdW5jZWRGbiIsImNsZWFyVGltZW91dCIsInZhbGlkRm9ybSIsIl91dGlsIiwiaW52YWxpZENsYXNzIiwidmFsaWRpdHkiLCJ2YWxpZCIsImVycm9yUHJvcHMiLCJnZXRDdXN0b21NZXNzYWdlIiwiY3VzdG9tTWVzc2FnZXMiLCJsb2NhbEVycm9yUHJvcHMiLCJjb25jYXQiLCJwcm9wIiwiZ2V0QXR0cmlidXRlIiwiY2hlY2tWYWxpZGl0eSIsIm1lc3NhZ2UiLCJzZXRDdXN0b21WYWxpZGl0eSIsIm9wdGlvbnMiLCJ2YWxpZGF0aW9uRXJyb3JDbGFzcyIsInZhbGlkYXRpb25FcnJvclBhcmVudENsYXNzIiwiZXJyb3JQbGFjZW1lbnQiLCJpbnNlcnRFcnJvciIsImVycm9yTm9kZSIsInF1ZXJ5U2VsZWN0b3IiLCJjcmVhdGVFbGVtZW50IiwidmFsaWRhdGlvbk1lc3NhZ2UiLCJ0ZXh0Q29udGVudCIsImRlZmF1bHRPcHRpb25zIiwiaW5wdXRzIiwidG9Mb3dlckNhc2UiLCJmb2N1c0ludmFsaWRJbnB1dCIsInZhbGlkRm9ybUlucHV0cyIsImZvcm0iLCJmb2N1c0ZpcnN0IiwiaW52YWxpZE5vZGUiLCJmb2N1cyIsIiQiLCJwbHVnaW5OYW1lIiwiUGx1Z2luIiwiZXh0ZW5kIiwiX2RlZmF1bHRzIiwiX25hbWUiLCJpbml0IiwicHJvdG90eXBlIiwicmVzZXQiLCJhbW91bnQiLCJkb2N1bWVudEVsZW1lbnQiLCJwYXJzZUZsb2F0IiwibGV2ZWxfYW1vdW50X3NlbGVjdG9yIiwib3JpZ2luYWxfYW1vdW50Iiwib3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yIiwicHJvY2Vzc2luZ19mZWUiLCJNYXRoIiwicm91bmQiLCJmZWVfYW1vdW50IiwicG93IiwidG9GaXhlZCIsInByb2Nlc3NpbmdfZmVlX3RleHQiLCJjcmVhdGVfYWNjb3VudCIsImJ1dHRvbl90ZXh0IiwicGF5X2J1dHRvbl9zZWxlY3RvciIsInN0cmlwZSIsIlN0cmlwZSIsInN0cmlwZV9wdWJsaXNoYWJsZV9rZXkiLCJlbGVtZW50cyIsImZvbnRzIiwiY3NzU3JjIiwicmVmZXJyZXIiLCJkZWJ1ZyIsImFuYWx5dGljc1RyYWNraW5nIiwiYW1vdW50QXNSYWRpbyIsImFtb3VudFVwZGF0ZWQiLCJwYXlfY2NfcHJvY2Vzc2luZ19zZWxlY3RvciIsImNyZWRpdENhcmRQcm9jZXNzaW5nRmVlcyIsImRvbmF0ZV9mb3JtX3NlbGVjdG9yIiwiZG9uYXRlQW5vbnltb3VzbHkiLCJob25vck9yTWVtb3J5VG9nZ2xlIiwib3V0c2lkZVVuaXRlZFN0YXRlcyIsInNoaXBwaW5nQWRkcmVzcyIsImFsbG93TWlubnBvc3RBY2NvdW50IiwiY2hvb3NlUGF5bWVudE1ldGhvZCIsImNyZWRpdENhcmRGaWVsZHMiLCJhY2hGaWVsZHMiLCJ2YWxpZGF0ZUFuZFN1Ym1pdCIsImNvbmZpcm1fZm9ybV9zZWxlY3RvciIsInNob3dOZXdzbGV0dGVyU2V0dGluZ3MiLCJjb25maXJtTWVzc2FnZVN1Ym1pdCIsImNvbnNvbGUiLCJsb2ciLCJkaXIiLCJwcm9ncmVzcyIsInByb2dyZXNzX3NlbGVjdG9yIiwic3RlcCIsIm5hdl9pdGVtX2NvdW50Iiwib3BwX2lkIiwib3BwX2lkX3NlbGVjdG9yIiwicG9zdF9wdXJjaGFzZSIsImluZGV4IiwiZmluaXNoX3NlY3Rpb25fc2VsZWN0b3IiLCJhbmFseXRpY3NUcmFja2luZ1N0ZXAiLCJpbnN0YWxsbWVudF9wZXJpb2QiLCJsZXZlbCIsInRoYXQiLCJpbnN0YWxsbWVudF9wZXJpb2Rfc2VsZWN0b3IiLCJhamF4IiwibWV0aG9kIiwidXJsIiwiZG9uZSIsImNoYXJBdCIsInRvVXBwZXJDYXNlIiwiZ2EiLCJwYWdlIiwibG9jYXRpb24iLCJwYXRobmFtZSIsInRpdGxlIiwiY2hhbmdlIiwiaXMiLCJwYXltZW50X3R5cGUiLCJjaG9vc2VfcGF5bWVudCIsImFtb3VudF9zZWxlY3Rvcl9mYWlyX21hcmtldCIsInNldEZhaXJNYXJrZXRWYWx1ZSIsImNhbGN1bGF0ZUZlZXMiLCJhZGRpdGlvbmFsX2Ftb3VudF9maWVsZCIsImFtb3VudF9zZWxlY3RvciIsImZhaXJfbWFya2V0X3ZhbHVlX3NlbGVjdG9yIiwiZmFpck1hcmtldFZhbHVlIiwic3RyaXBlX3BheW1lbnRfdHlwZSIsInRvdGFsX2Ftb3VudCIsImFkZGl0aW9uYWxfYW1vdW50Iiwic2V0U3RyaXBlUGF5bWVudFR5cGUiLCJmZWVzIiwiY3JlZGl0Q2FyZEZlZUNoZWNrYm94IiwiZmllbGQiLCJmdWxsX2Ftb3VudCIsImZ1bGxfYW1vdW50X3NlbGVjdG9yIiwidG9nZ2xlQW5vbnltb3VzIiwiYW5vbnltb3VzX3NlbGVjdG9yIiwibmFtZV9zZWxlY3RvciIsImhpZGUiLCJzaG93IiwiaG9ub3JPck1lbW9yeSIsImhvbm9yX29yX21lbW9yeV9jaG9vc2VyIiwiaG9ub3JfbWVtb3J5X2lucHV0X2dyb3VwIiwiaG9ub3JfdHlwZV9zZWxlY3RvciIsImhvbm9yX25hbWVfc2VsZWN0b3IiLCJzaG93X2JpbGxpbmdfY291bnRyeV9zZWxlY3RvciIsImNsaWNrIiwiYmlsbGluZ19jb3VudHJ5X3NlbGVjdG9yIiwic2hvd19zaGlwcGluZ19jb3VudHJ5X3NlbGVjdG9yIiwic2hpcHBpbmdfY291bnRyeV9zZWxlY3RvciIsInNob3dfc2hpcHBpbmciLCJ1c2VfZm9yX3NoaXBwaW5nX3NlbGVjdG9yIiwic2hpcHBpbmdfc2VsZWN0b3IiLCJhY2NvdW50X2V4aXN0cyIsInNob3dQYXNzd29yZCIsInNob3dQYXNzd29yZFN0cmVuZ3RoIiwic3BhbUVtYWlsIiwiZW1haWxfZmllbGRfc2VsZWN0b3IiLCJ0b2dnbGVBY2NvdW50RmllbGRzIiwiY3JlYXRlX21wX3NlbGVjdG9yIiwiZG9uZVR5cGluZyIsImVtYWlsIiwiY2hlY2tNaW5ucG9zdEFjY291bnQiLCJ0eXBpbmdUaW1lciIsImRvbmVUeXBpbmdJbnRlcnZhbCIsImtleXVwIiwiZW1haWxfZmllbGQiLCJzcGFtRXJyb3JDb250YWluZXIiLCJjcmVhdGVfYWNjb3VudF9zZWxlY3RvciIsImJlZm9yZSIsInBhc3N3b3JkX3NlbGVjdG9yIiwiJHN1Ym1pdCIsIiRjb250YWluZXIiLCIkZmllbGQiLCJzaG93X3Bhc3MiLCIkdG9nZ2xlIiwiY2hlY2tib3giLCIkYmVmb3JlIiwiYWZ0ZXIiLCJjaGVja1Bhc3N3b3JkU3RyZW5ndGgiLCIkcGFzc3dvcmQiLCIkc3RyZW5ndGhNZXRlciIsIiRzdHJlbmd0aFRleHQiLCJwYXNzd29yZCIsInJlc3VsdCIsInp4Y3ZibiIsInN0cmVuZ3RoIiwic2NvcmUiLCJodG1sIiwidXNlciIsIm1pbm5wb3N0X3Jvb3QiLCJzdGF0dXMiLCJyZWFzb24iLCJjaGVja2VkIiwiY2hlY2tlZF92YWx1ZSIsInNldHVwUGF5bWVudE1ldGhvZCIsImV2ZW50IiwiaWQiLCJwYXltZW50X21ldGhvZF9zZWxlY3RvciIsInN0eWxlIiwiYmFzZSIsImljb25Db2xvciIsImxpbmVIZWlnaHQiLCJmb250V2VpZ2h0IiwiZm9udEZhbWlseSIsImZvbnRTaXplIiwiaW52YWxpZCIsImNvbG9yIiwiY2FyZE51bWJlckVsZW1lbnQiLCJjcmVhdGUiLCJtb3VudCIsImNjX251bV9zZWxlY3RvciIsImNhcmRFeHBpcnlFbGVtZW50IiwiY2NfZXhwX3NlbGVjdG9yIiwiY2FyZEN2Y0VsZW1lbnQiLCJjY19jdnZfc2VsZWN0b3IiLCJzdHJpcGVFcnJvckRpc3BsYXkiLCJidXR0b25TdGF0dXMiLCJicmFuZCIsInNldEJyYW5kSWNvbiIsImNhcmRCcmFuZFRvUGZDbGFzcyIsImJyYW5kSWNvbkVsZW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInBmQ2xhc3MiLCJiYW5rVG9rZW5GaWVsZE5hbWUiLCJiYW5rVG9rZW5GaWVsZCIsInBsYWlkX2VudiIsIlBsYWlkIiwibGlua0hhbmRsZXIiLCJzZWxlY3RBY2NvdW50IiwiYXBpVmVyc2lvbiIsImVudiIsImNsaWVudE5hbWUiLCJwbGFpZF9wdWJsaWNfa2V5IiwicHJvZHVjdCIsIm9uTG9hZCIsIm9uU3VjY2VzcyIsInB1YmxpY190b2tlbiIsIm1ldGFkYXRhIiwic3VwcG9ydGZvcm0iLCJhY2NvdW50X2lkIiwic2VyaWFsaXplIiwicmVzcG9uc2UiLCJwbGFpZF9saW5rIiwic3RyaXBlX2JhbmtfYWNjb3VudF90b2tlbiIsInByZXBlbmQiLCJjb250ZW50cyIsInVud3JhcCIsIm9uRXhpdCIsImVyciIsIm9wZW4iLCJidXR0b24iLCJkaXNhYmxlZCIsInNjcm9sbFRvRm9ybUVycm9yIiwiZmlyc3QiLCJmaXJzdF9ob2xkZXIiLCJlbGVtZW50T2Zmc2V0Iiwib2Zmc2V0IiwidG9wIiwicGFnZU9mZnNldCIsInBhZ2VZT2Zmc2V0IiwiaW5uZXJIZWlnaHQiLCJzY3JvbGxUb3AiLCJmb3JtcyIsInN1Ym1pdCIsInRva2VuRGF0YSIsImdlbmVyYXRlVG9rZW5EYXRhIiwiZmlyc3RfbmFtZSIsImZpcnN0X25hbWVfZmllbGRfc2VsZWN0b3IiLCJsYXN0X25hbWUiLCJsYXN0X25hbWVfZmllbGRfc2VsZWN0b3IiLCJwYXNzd29yZF9maWVsZF9zZWxlY3RvciIsImNpdHkiLCJhY2NvdW50X2NpdHlfc2VsZWN0b3IiLCJzdGF0ZSIsImFjY291bnRfc3RhdGVfc2VsZWN0b3IiLCJ6aXAiLCJhY2NvdW50X3ppcF9zZWxlY3RvciIsImNyZWF0ZVRva2VuIiwic3RyaXBlVG9rZW5IYW5kbGVyIiwidGhpc19zZWxlY3RvciIsIndoaWNoX2Vycm9yIiwiZW1wdHkiLCJmdWxsX25hbWUiLCJzdHJlZXQiLCJhZGRyZXNzX2xpbmUxIiwiYWRkcmVzc19jaXR5IiwiYWRkcmVzc19zdGF0ZSIsImFkZHJlc3NfemlwIiwiY291bnRyeSIsImFkZHJlc3NfY291bnRyeSIsInRoZW4iLCJwcmV2IiwidG9rZW4iLCJhamF4X3VybCIsInRva2VuRmllbGROYW1lIiwidG9rZW5GaWVsZCIsImNhY2hlIiwiZXJyb3JzIiwiZWFjaCIsInN0cmlwZUVycm9yU2VsZWN0b3IiLCJhbmltYXRlIiwiZ2V0IiwibmV3c2xldHRlcl9ncm91cF9odG1sIiwibmV3c2xldHRlcl9ncm91cF9zZWxlY3RvciIsImdldF9kYXRhIiwic2hvcnRjb2RlIiwicGxhY2VtZW50IiwiZ3JvdXBfZmllbGRzIiwiY2F0ZWdvcnkiLCJtYWlsY2hpbXBfc3RhdHVzIiwibWFpbGNoaW1wX3VzZXJfaWQiLCJleGlzdGluZ19uZXdzbGV0dGVyX3NldHRpbmdzIiwiY29uZmlybWZvcm0iLCJuZXdzbGV0dGVyX2dyb3VwcyIsIm5ld19uZXdzbGV0dGVyX3NldHRpbmdzIiwicG9zdF9kYXRhIiwiZ3JvdXBzX3N1Ym1pdHRlZCIsImdyb3Vwc19hdmFpbGFibGUiLCJncm91cCIsImRhdGFUeXBlIiwiY29udGVudFR5cGUiLCJKU09OIiwic3RyaW5naWZ5Iiwic3VjY2VzcyIsImZhaWwiLCJqUXVlcnkiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxDQUFDLFVBQVNBLENBQVQsRUFBVztBQUFDLE1BQUcsUUFBT0MsT0FBUCx5Q0FBT0EsT0FBUCxPQUFpQixRQUFqQixJQUEyQixPQUFPQyxNQUFQLEtBQWdCLFdBQTlDLEVBQTBEO0FBQUNBLElBQUFBLE1BQU0sQ0FBQ0QsT0FBUCxHQUFlRCxDQUFDLEVBQWhCO0FBQW1CLEdBQTlFLE1BQW1GLElBQUcsT0FBT0csTUFBUCxLQUFnQixVQUFoQixJQUE0QkEsTUFBTSxDQUFDQyxHQUF0QyxFQUEwQztBQUFDRCxJQUFBQSxNQUFNLENBQUMsRUFBRCxFQUFJSCxDQUFKLENBQU47QUFBYSxHQUF4RCxNQUE0RDtBQUFDLFFBQUlLLENBQUo7O0FBQU0sUUFBRyxPQUFPQyxNQUFQLEtBQWdCLFdBQW5CLEVBQStCO0FBQUNELE1BQUFBLENBQUMsR0FBQ0MsTUFBRjtBQUFTLEtBQXpDLE1BQThDLElBQUcsT0FBT0MsTUFBUCxLQUFnQixXQUFuQixFQUErQjtBQUFDRixNQUFBQSxDQUFDLEdBQUNFLE1BQUY7QUFBUyxLQUF6QyxNQUE4QyxJQUFHLE9BQU9DLElBQVAsS0FBYyxXQUFqQixFQUE2QjtBQUFDSCxNQUFBQSxDQUFDLEdBQUNHLElBQUY7QUFBTyxLQUFyQyxNQUF5QztBQUFDSCxNQUFBQSxDQUFDLEdBQUMsSUFBRjtBQUFPOztBQUFBLEtBQUNBLENBQUMsQ0FBQ0ksT0FBRixLQUFjSixDQUFDLENBQUNJLE9BQUYsR0FBWSxFQUExQixDQUFELEVBQWdDQyxFQUFoQyxHQUFxQ1YsQ0FBQyxFQUF0QztBQUF5QztB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UUFBQUEsQ0FBQyxDQUFDbE4sSUFBRixDQUFPLElBQVAsRUFBYSxZQUFZbU4sVUFBekIsRUFBcUMsSUFBSUMsTUFBSixDQUFZLElBQVosRUFBa0JyQixPQUFsQixDQUFyQztBQUNEO0FBQ0YsS0FKTSxDQUFQO0FBS0QsR0FORDtBQVFELENBeHhDQSxFQXd4Q0dxVCxNQXh4Q0gsRUF3eENXamlCLE1BeHhDWCxFQXd4Q21CeUIsUUF4eENuQiIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKGYpe2lmKHR5cGVvZiBleHBvcnRzPT09XCJvYmplY3RcIiYmdHlwZW9mIG1vZHVsZSE9PVwidW5kZWZpbmVkXCIpe21vZHVsZS5leHBvcnRzPWYoKX1lbHNlIGlmKHR5cGVvZiBkZWZpbmU9PT1cImZ1bmN0aW9uXCImJmRlZmluZS5hbWQpe2RlZmluZShbXSxmKX1lbHNle3ZhciBnO2lmKHR5cGVvZiB3aW5kb3chPT1cInVuZGVmaW5lZFwiKXtnPXdpbmRvd31lbHNlIGlmKHR5cGVvZiBnbG9iYWwhPT1cInVuZGVmaW5lZFwiKXtnPWdsb2JhbH1lbHNlIGlmKHR5cGVvZiBzZWxmIT09XCJ1bmRlZmluZWRcIil7Zz1zZWxmfWVsc2V7Zz10aGlzfShnLnBheW1lbnQgfHwgKGcucGF5bWVudCA9IHt9KSkuanMgPSBmKCl9fSkoZnVuY3Rpb24oKXt2YXIgZGVmaW5lLG1vZHVsZSxleHBvcnRzO3JldHVybiAoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSh7MTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG52YXIgUUosIHJyZXR1cm4sIHJ0cmltO1xuXG5RSiA9IGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG4gIGlmIChRSi5pc0RPTUVsZW1lbnQoc2VsZWN0b3IpKSB7XG4gICAgcmV0dXJuIHNlbGVjdG9yO1xuICB9XG4gIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbn07XG5cblFKLmlzRE9NRWxlbWVudCA9IGZ1bmN0aW9uKGVsKSB7XG4gIHJldHVybiBlbCAmJiAoZWwubm9kZU5hbWUgIT0gbnVsbCk7XG59O1xuXG5ydHJpbSA9IC9eW1xcc1xcdUZFRkZcXHhBMF0rfFtcXHNcXHVGRUZGXFx4QTBdKyQvZztcblxuUUoudHJpbSA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgaWYgKHRleHQgPT09IG51bGwpIHtcbiAgICByZXR1cm4gXCJcIjtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gKHRleHQgKyBcIlwiKS5yZXBsYWNlKHJ0cmltLCBcIlwiKTtcbiAgfVxufTtcblxucnJldHVybiA9IC9cXHIvZztcblxuUUoudmFsID0gZnVuY3Rpb24oZWwsIHZhbCkge1xuICB2YXIgcmV0O1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICByZXR1cm4gZWwudmFsdWUgPSB2YWw7XG4gIH0gZWxzZSB7XG4gICAgcmV0ID0gZWwudmFsdWU7XG4gICAgaWYgKHR5cGVvZiByZXQgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHJldHVybiByZXQucmVwbGFjZShycmV0dXJuLCBcIlwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHJldCA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG5RSi5wcmV2ZW50RGVmYXVsdCA9IGZ1bmN0aW9uKGV2ZW50T2JqZWN0KSB7XG4gIGlmICh0eXBlb2YgZXZlbnRPYmplY3QucHJldmVudERlZmF1bHQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIGV2ZW50T2JqZWN0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGV2ZW50T2JqZWN0LnJldHVyblZhbHVlID0gZmFsc2U7XG4gIHJldHVybiBmYWxzZTtcbn07XG5cblFKLm5vcm1hbGl6ZUV2ZW50ID0gZnVuY3Rpb24oZSkge1xuICB2YXIgb3JpZ2luYWw7XG4gIG9yaWdpbmFsID0gZTtcbiAgZSA9IHtcbiAgICB3aGljaDogb3JpZ2luYWwud2hpY2ggIT0gbnVsbCA/IG9yaWdpbmFsLndoaWNoIDogdm9pZCAwLFxuICAgIHRhcmdldDogb3JpZ2luYWwudGFyZ2V0IHx8IG9yaWdpbmFsLnNyY0VsZW1lbnQsXG4gICAgcHJldmVudERlZmF1bHQ6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIFFKLnByZXZlbnREZWZhdWx0KG9yaWdpbmFsKTtcbiAgICB9LFxuICAgIG9yaWdpbmFsRXZlbnQ6IG9yaWdpbmFsLFxuICAgIGRhdGE6IG9yaWdpbmFsLmRhdGEgfHwgb3JpZ2luYWwuZGV0YWlsXG4gIH07XG4gIGlmIChlLndoaWNoID09IG51bGwpIHtcbiAgICBlLndoaWNoID0gb3JpZ2luYWwuY2hhckNvZGUgIT0gbnVsbCA/IG9yaWdpbmFsLmNoYXJDb2RlIDogb3JpZ2luYWwua2V5Q29kZTtcbiAgfVxuICByZXR1cm4gZTtcbn07XG5cblFKLm9uID0gZnVuY3Rpb24oZWxlbWVudCwgZXZlbnROYW1lLCBjYWxsYmFjaykge1xuICB2YXIgZWwsIGksIGosIGxlbiwgbGVuMSwgbXVsdEV2ZW50TmFtZSwgb3JpZ2luYWxDYWxsYmFjaywgcmVmO1xuICBpZiAoZWxlbWVudC5sZW5ndGgpIHtcbiAgICBmb3IgKGkgPSAwLCBsZW4gPSBlbGVtZW50Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBlbCA9IGVsZW1lbnRbaV07XG4gICAgICBRSi5vbihlbCwgZXZlbnROYW1lLCBjYWxsYmFjayk7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuICBpZiAoZXZlbnROYW1lLm1hdGNoKFwiIFwiKSkge1xuICAgIHJlZiA9IGV2ZW50TmFtZS5zcGxpdChcIiBcIik7XG4gICAgZm9yIChqID0gMCwgbGVuMSA9IHJlZi5sZW5ndGg7IGogPCBsZW4xOyBqKyspIHtcbiAgICAgIG11bHRFdmVudE5hbWUgPSByZWZbal07XG4gICAgICBRSi5vbihlbGVtZW50LCBtdWx0RXZlbnROYW1lLCBjYWxsYmFjayk7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuICBvcmlnaW5hbENhbGxiYWNrID0gY2FsbGJhY2s7XG4gIGNhbGxiYWNrID0gZnVuY3Rpb24oZSkge1xuICAgIGUgPSBRSi5ub3JtYWxpemVFdmVudChlKTtcbiAgICByZXR1cm4gb3JpZ2luYWxDYWxsYmFjayhlKTtcbiAgfTtcbiAgaWYgKGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgIHJldHVybiBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBjYWxsYmFjaywgZmFsc2UpO1xuICB9XG4gIGlmIChlbGVtZW50LmF0dGFjaEV2ZW50KSB7XG4gICAgZXZlbnROYW1lID0gXCJvblwiICsgZXZlbnROYW1lO1xuICAgIHJldHVybiBlbGVtZW50LmF0dGFjaEV2ZW50KGV2ZW50TmFtZSwgY2FsbGJhY2spO1xuICB9XG4gIGVsZW1lbnRbJ29uJyArIGV2ZW50TmFtZV0gPSBjYWxsYmFjaztcbn07XG5cblFKLmFkZENsYXNzID0gZnVuY3Rpb24oZWwsIGNsYXNzTmFtZSkge1xuICB2YXIgZTtcbiAgaWYgKGVsLmxlbmd0aCkge1xuICAgIHJldHVybiAoZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaSwgbGVuLCByZXN1bHRzO1xuICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgZm9yIChpID0gMCwgbGVuID0gZWwubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgZSA9IGVsW2ldO1xuICAgICAgICByZXN1bHRzLnB1c2goUUouYWRkQ2xhc3MoZSwgY2xhc3NOYW1lKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9KSgpO1xuICB9XG4gIGlmIChlbC5jbGFzc0xpc3QpIHtcbiAgICByZXR1cm4gZWwuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBlbC5jbGFzc05hbWUgKz0gJyAnICsgY2xhc3NOYW1lO1xuICB9XG59O1xuXG5RSi5oYXNDbGFzcyA9IGZ1bmN0aW9uKGVsLCBjbGFzc05hbWUpIHtcbiAgdmFyIGUsIGhhc0NsYXNzLCBpLCBsZW47XG4gIGlmIChlbC5sZW5ndGgpIHtcbiAgICBoYXNDbGFzcyA9IHRydWU7XG4gICAgZm9yIChpID0gMCwgbGVuID0gZWwubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGUgPSBlbFtpXTtcbiAgICAgIGhhc0NsYXNzID0gaGFzQ2xhc3MgJiYgUUouaGFzQ2xhc3MoZSwgY2xhc3NOYW1lKTtcbiAgICB9XG4gICAgcmV0dXJuIGhhc0NsYXNzO1xuICB9XG4gIGlmIChlbC5jbGFzc0xpc3QpIHtcbiAgICByZXR1cm4gZWwuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyBSZWdFeHAoJyhefCApJyArIGNsYXNzTmFtZSArICcoIHwkKScsICdnaScpLnRlc3QoZWwuY2xhc3NOYW1lKTtcbiAgfVxufTtcblxuUUoucmVtb3ZlQ2xhc3MgPSBmdW5jdGlvbihlbCwgY2xhc3NOYW1lKSB7XG4gIHZhciBjbHMsIGUsIGksIGxlbiwgcmVmLCByZXN1bHRzO1xuICBpZiAoZWwubGVuZ3RoKSB7XG4gICAgcmV0dXJuIChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBpLCBsZW4sIHJlc3VsdHM7XG4gICAgICByZXN1bHRzID0gW107XG4gICAgICBmb3IgKGkgPSAwLCBsZW4gPSBlbC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBlID0gZWxbaV07XG4gICAgICAgIHJlc3VsdHMucHVzaChRSi5yZW1vdmVDbGFzcyhlLCBjbGFzc05hbWUpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH0pKCk7XG4gIH1cbiAgaWYgKGVsLmNsYXNzTGlzdCkge1xuICAgIHJlZiA9IGNsYXNzTmFtZS5zcGxpdCgnICcpO1xuICAgIHJlc3VsdHMgPSBbXTtcbiAgICBmb3IgKGkgPSAwLCBsZW4gPSByZWYubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGNscyA9IHJlZltpXTtcbiAgICAgIHJlc3VsdHMucHVzaChlbC5jbGFzc0xpc3QucmVtb3ZlKGNscykpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZWwuY2xhc3NOYW1lID0gZWwuY2xhc3NOYW1lLnJlcGxhY2UobmV3IFJlZ0V4cCgnKF58XFxcXGIpJyArIGNsYXNzTmFtZS5zcGxpdCgnICcpLmpvaW4oJ3wnKSArICcoXFxcXGJ8JCknLCAnZ2knKSwgJyAnKTtcbiAgfVxufTtcblxuUUoudG9nZ2xlQ2xhc3MgPSBmdW5jdGlvbihlbCwgY2xhc3NOYW1lLCBib29sKSB7XG4gIHZhciBlO1xuICBpZiAoZWwubGVuZ3RoKSB7XG4gICAgcmV0dXJuIChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBpLCBsZW4sIHJlc3VsdHM7XG4gICAgICByZXN1bHRzID0gW107XG4gICAgICBmb3IgKGkgPSAwLCBsZW4gPSBlbC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBlID0gZWxbaV07XG4gICAgICAgIHJlc3VsdHMucHVzaChRSi50b2dnbGVDbGFzcyhlLCBjbGFzc05hbWUsIGJvb2wpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH0pKCk7XG4gIH1cbiAgaWYgKGJvb2wpIHtcbiAgICBpZiAoIVFKLmhhc0NsYXNzKGVsLCBjbGFzc05hbWUpKSB7XG4gICAgICByZXR1cm4gUUouYWRkQ2xhc3MoZWwsIGNsYXNzTmFtZSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBRSi5yZW1vdmVDbGFzcyhlbCwgY2xhc3NOYW1lKTtcbiAgfVxufTtcblxuUUouYXBwZW5kID0gZnVuY3Rpb24oZWwsIHRvQXBwZW5kKSB7XG4gIHZhciBlO1xuICBpZiAoZWwubGVuZ3RoKSB7XG4gICAgcmV0dXJuIChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBpLCBsZW4sIHJlc3VsdHM7XG4gICAgICByZXN1bHRzID0gW107XG4gICAgICBmb3IgKGkgPSAwLCBsZW4gPSBlbC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBlID0gZWxbaV07XG4gICAgICAgIHJlc3VsdHMucHVzaChRSi5hcHBlbmQoZSwgdG9BcHBlbmQpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH0pKCk7XG4gIH1cbiAgcmV0dXJuIGVsLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgdG9BcHBlbmQpO1xufTtcblxuUUouZmluZCA9IGZ1bmN0aW9uKGVsLCBzZWxlY3Rvcikge1xuICBpZiAoZWwgaW5zdGFuY2VvZiBOb2RlTGlzdCB8fCBlbCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgZWwgPSBlbFswXTtcbiAgfVxuICByZXR1cm4gZWwucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG59O1xuXG5RSi50cmlnZ2VyID0gZnVuY3Rpb24oZWwsIG5hbWUsIGRhdGEpIHtcbiAgdmFyIGUsIGVycm9yLCBldjtcbiAgdHJ5IHtcbiAgICBldiA9IG5ldyBDdXN0b21FdmVudChuYW1lLCB7XG4gICAgICBkZXRhaWw6IGRhdGFcbiAgICB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBlID0gZXJyb3I7XG4gICAgZXYgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcbiAgICBpZiAoZXYuaW5pdEN1c3RvbUV2ZW50KSB7XG4gICAgICBldi5pbml0Q3VzdG9tRXZlbnQobmFtZSwgdHJ1ZSwgdHJ1ZSwgZGF0YSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV2LmluaXRFdmVudChuYW1lLCB0cnVlLCB0cnVlLCBkYXRhKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGVsLmRpc3BhdGNoRXZlbnQoZXYpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBRSjtcblxuXG59LHt9XSwyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbihmdW5jdGlvbiAoZ2xvYmFsKXtcbnZhciBQYXltZW50LCBRSiwgY2FyZEZyb21OdW1iZXIsIGNhcmRGcm9tVHlwZSwgY2FyZHMsIGRlZmF1bHRGb3JtYXQsIGZvcm1hdEJhY2tDYXJkTnVtYmVyLCBmb3JtYXRCYWNrRXhwaXJ5LCBmb3JtYXRDYXJkTnVtYmVyLCBmb3JtYXRFeHBpcnksIGZvcm1hdEZvcndhcmRFeHBpcnksIGZvcm1hdEZvcndhcmRTbGFzaCwgZm9ybWF0TW9udGhFeHBpcnksIGhhc1RleHRTZWxlY3RlZCwgbHVobkNoZWNrLCByZUZvcm1hdENhcmROdW1iZXIsIHJlc3RyaWN0Q1ZDLCByZXN0cmljdENhcmROdW1iZXIsIHJlc3RyaWN0Q29tYmluZWRFeHBpcnksIHJlc3RyaWN0RXhwaXJ5LCByZXN0cmljdE1vbnRoRXhwaXJ5LCByZXN0cmljdE51bWVyaWMsIHJlc3RyaWN0WWVhckV4cGlyeSwgc2V0Q2FyZFR5cGUsXG4gIGluZGV4T2YgPSBbXS5pbmRleE9mIHx8IGZ1bmN0aW9uKGl0ZW0pIHsgZm9yICh2YXIgaSA9IDAsIGwgPSB0aGlzLmxlbmd0aDsgaSA8IGw7IGkrKykgeyBpZiAoaSBpbiB0aGlzICYmIHRoaXNbaV0gPT09IGl0ZW0pIHJldHVybiBpOyB9IHJldHVybiAtMTsgfTtcblxuUUogPSByZXF1aXJlKCdxai9zcmMvcWouY29mZmVlJyk7XG5cbmRlZmF1bHRGb3JtYXQgPSAvKFxcZHsxLDR9KS9nO1xuXG5jYXJkcyA9IFtcbiAge1xuICAgIHR5cGU6ICdhbWV4JyxcbiAgICBwYXR0ZXJuOiAvXjNbNDddLyxcbiAgICBmb3JtYXQ6IC8oXFxkezEsNH0pKFxcZHsxLDZ9KT8oXFxkezEsNX0pPy8sXG4gICAgbGVuZ3RoOiBbMTVdLFxuICAgIGN2Y0xlbmd0aDogWzRdLFxuICAgIGx1aG46IHRydWVcbiAgfSwge1xuICAgIHR5cGU6ICdkYW5rb3J0JyxcbiAgICBwYXR0ZXJuOiAvXjUwMTkvLFxuICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICBsZW5ndGg6IFsxNl0sXG4gICAgY3ZjTGVuZ3RoOiBbM10sXG4gICAgbHVobjogdHJ1ZVxuICB9LCB7XG4gICAgdHlwZTogJ2RpbmVyc2NsdWInLFxuICAgIHBhdHRlcm46IC9eKDM2fDM4fDMwWzAtNV0pLyxcbiAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgbGVuZ3RoOiBbMTRdLFxuICAgIGN2Y0xlbmd0aDogWzNdLFxuICAgIGx1aG46IHRydWVcbiAgfSwge1xuICAgIHR5cGU6ICdkaXNjb3ZlcicsXG4gICAgcGF0dGVybjogL14oNjAxMXw2NXw2NFs0LTldfDYyMikvLFxuICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICBsZW5ndGg6IFsxNl0sXG4gICAgY3ZjTGVuZ3RoOiBbM10sXG4gICAgbHVobjogdHJ1ZVxuICB9LCB7XG4gICAgdHlwZTogJ2pjYicsXG4gICAgcGF0dGVybjogL14zNS8sXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGxlbmd0aDogWzE2XSxcbiAgICBjdmNMZW5ndGg6IFszXSxcbiAgICBsdWhuOiB0cnVlXG4gIH0sIHtcbiAgICB0eXBlOiAnbGFzZXInLFxuICAgIHBhdHRlcm46IC9eKDY3MDZ8Njc3MXw2NzA5KS8sXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGxlbmd0aDogWzE2LCAxNywgMTgsIDE5XSxcbiAgICBjdmNMZW5ndGg6IFszXSxcbiAgICBsdWhuOiB0cnVlXG4gIH0sIHtcbiAgICB0eXBlOiAnbWFlc3RybycsXG4gICAgcGF0dGVybjogL14oNTAxOHw1MDIwfDUwMzh8NjMwNHw2NzAzfDY3NTl8Njc2WzEtM10pLyxcbiAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgbGVuZ3RoOiBbMTIsIDEzLCAxNCwgMTUsIDE2LCAxNywgMTgsIDE5XSxcbiAgICBjdmNMZW5ndGg6IFszXSxcbiAgICBsdWhuOiB0cnVlXG4gIH0sIHtcbiAgICB0eXBlOiAnbWFzdGVyY2FyZCcsXG4gICAgcGF0dGVybjogL141WzEtNV0vLFxuICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICBsZW5ndGg6IFsxNl0sXG4gICAgY3ZjTGVuZ3RoOiBbM10sXG4gICAgbHVobjogdHJ1ZVxuICB9LCB7XG4gICAgdHlwZTogJ3VuaW9ucGF5JyxcbiAgICBwYXR0ZXJuOiAvXjYyLyxcbiAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgbGVuZ3RoOiBbMTYsIDE3LCAxOCwgMTldLFxuICAgIGN2Y0xlbmd0aDogWzNdLFxuICAgIGx1aG46IGZhbHNlXG4gIH0sIHtcbiAgICB0eXBlOiAndmlzYWVsZWN0cm9uJyxcbiAgICBwYXR0ZXJuOiAvXjQoMDI2fDE3NTAwfDQwNXw1MDh8ODQ0fDkxWzM3XSkvLFxuICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICBsZW5ndGg6IFsxNl0sXG4gICAgY3ZjTGVuZ3RoOiBbM10sXG4gICAgbHVobjogdHJ1ZVxuICB9LCB7XG4gICAgdHlwZTogJ3Zpc2EnLFxuICAgIHBhdHRlcm46IC9eNC8sXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGxlbmd0aDogWzEzLCAxNl0sXG4gICAgY3ZjTGVuZ3RoOiBbM10sXG4gICAgbHVobjogdHJ1ZVxuICB9LCB7XG4gICAgdHlwZTogJ2VsbycsXG4gICAgcGF0dGVybjogL140MDExfDQzODkzNXw0NSgxNDE2fDc2KXw1MCg0MTc1fDY2OTl8Njd8OTBbNC03XSl8NjMoNjI5N3w2MzY4KS8sXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGxlbmd0aDogWzE2XSxcbiAgICBjdmNMZW5ndGg6IFszXSxcbiAgICBsdWhuOiB0cnVlXG4gIH1cbl07XG5cbmNhcmRGcm9tTnVtYmVyID0gZnVuY3Rpb24obnVtKSB7XG4gIHZhciBjYXJkLCBpLCBsZW47XG4gIG51bSA9IChudW0gKyAnJykucmVwbGFjZSgvXFxEL2csICcnKTtcbiAgZm9yIChpID0gMCwgbGVuID0gY2FyZHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBjYXJkID0gY2FyZHNbaV07XG4gICAgaWYgKGNhcmQucGF0dGVybi50ZXN0KG51bSkpIHtcbiAgICAgIHJldHVybiBjYXJkO1xuICAgIH1cbiAgfVxufTtcblxuY2FyZEZyb21UeXBlID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIgY2FyZCwgaSwgbGVuO1xuICBmb3IgKGkgPSAwLCBsZW4gPSBjYXJkcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGNhcmQgPSBjYXJkc1tpXTtcbiAgICBpZiAoY2FyZC50eXBlID09PSB0eXBlKSB7XG4gICAgICByZXR1cm4gY2FyZDtcbiAgICB9XG4gIH1cbn07XG5cbmx1aG5DaGVjayA9IGZ1bmN0aW9uKG51bSkge1xuICB2YXIgZGlnaXQsIGRpZ2l0cywgaSwgbGVuLCBvZGQsIHN1bTtcbiAgb2RkID0gdHJ1ZTtcbiAgc3VtID0gMDtcbiAgZGlnaXRzID0gKG51bSArICcnKS5zcGxpdCgnJykucmV2ZXJzZSgpO1xuICBmb3IgKGkgPSAwLCBsZW4gPSBkaWdpdHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBkaWdpdCA9IGRpZ2l0c1tpXTtcbiAgICBkaWdpdCA9IHBhcnNlSW50KGRpZ2l0LCAxMCk7XG4gICAgaWYgKChvZGQgPSAhb2RkKSkge1xuICAgICAgZGlnaXQgKj0gMjtcbiAgICB9XG4gICAgaWYgKGRpZ2l0ID4gOSkge1xuICAgICAgZGlnaXQgLT0gOTtcbiAgICB9XG4gICAgc3VtICs9IGRpZ2l0O1xuICB9XG4gIHJldHVybiBzdW0gJSAxMCA9PT0gMDtcbn07XG5cbmhhc1RleHRTZWxlY3RlZCA9IGZ1bmN0aW9uKHRhcmdldCkge1xuICB2YXIgcmVmO1xuICBpZiAoKHRhcmdldC5zZWxlY3Rpb25TdGFydCAhPSBudWxsKSAmJiB0YXJnZXQuc2VsZWN0aW9uU3RhcnQgIT09IHRhcmdldC5zZWxlY3Rpb25FbmQpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAoKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBkb2N1bWVudCAhPT0gbnVsbCA/IChyZWYgPSBkb2N1bWVudC5zZWxlY3Rpb24pICE9IG51bGwgPyByZWYuY3JlYXRlUmFuZ2UgOiB2b2lkIDAgOiB2b2lkIDApICE9IG51bGwpIHtcbiAgICBpZiAoZG9jdW1lbnQuc2VsZWN0aW9uLmNyZWF0ZVJhbmdlKCkudGV4dCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbnJlRm9ybWF0Q2FyZE51bWJlciA9IGZ1bmN0aW9uKGUpIHtcbiAgcmV0dXJuIHNldFRpbWVvdXQoKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHRhcmdldCwgdmFsdWU7XG4gICAgICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICAgIHZhbHVlID0gUUoudmFsKHRhcmdldCk7XG4gICAgICB2YWx1ZSA9IFBheW1lbnQuZm5zLmZvcm1hdENhcmROdW1iZXIodmFsdWUpO1xuICAgICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIHZhbHVlKTtcbiAgICB9O1xuICB9KSh0aGlzKSk7XG59O1xuXG5mb3JtYXRDYXJkTnVtYmVyID0gZnVuY3Rpb24oZSkge1xuICB2YXIgY2FyZCwgZGlnaXQsIGxlbmd0aCwgcmUsIHRhcmdldCwgdXBwZXJMZW5ndGgsIHZhbHVlO1xuICBkaWdpdCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZS53aGljaCk7XG4gIGlmICghL15cXGQrJC8udGVzdChkaWdpdCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gIHZhbHVlID0gUUoudmFsKHRhcmdldCk7XG4gIGNhcmQgPSBjYXJkRnJvbU51bWJlcih2YWx1ZSArIGRpZ2l0KTtcbiAgbGVuZ3RoID0gKHZhbHVlLnJlcGxhY2UoL1xcRC9nLCAnJykgKyBkaWdpdCkubGVuZ3RoO1xuICB1cHBlckxlbmd0aCA9IDE2O1xuICBpZiAoY2FyZCkge1xuICAgIHVwcGVyTGVuZ3RoID0gY2FyZC5sZW5ndGhbY2FyZC5sZW5ndGgubGVuZ3RoIC0gMV07XG4gIH1cbiAgaWYgKGxlbmd0aCA+PSB1cHBlckxlbmd0aCkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoKHRhcmdldC5zZWxlY3Rpb25TdGFydCAhPSBudWxsKSAmJiB0YXJnZXQuc2VsZWN0aW9uU3RhcnQgIT09IHZhbHVlLmxlbmd0aCkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoY2FyZCAmJiBjYXJkLnR5cGUgPT09ICdhbWV4Jykge1xuICAgIHJlID0gL14oXFxkezR9fFxcZHs0fVxcc1xcZHs2fSkkLztcbiAgfSBlbHNlIHtcbiAgICByZSA9IC8oPzpefFxccykoXFxkezR9KSQvO1xuICB9XG4gIGlmIChyZS50ZXN0KHZhbHVlKSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgdmFsdWUgKyAnICcgKyBkaWdpdCk7XG4gIH0gZWxzZSBpZiAocmUudGVzdCh2YWx1ZSArIGRpZ2l0KSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgdmFsdWUgKyBkaWdpdCArICcgJyk7XG4gIH1cbn07XG5cbmZvcm1hdEJhY2tDYXJkTnVtYmVyID0gZnVuY3Rpb24oZSkge1xuICB2YXIgdGFyZ2V0LCB2YWx1ZTtcbiAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gIHZhbHVlID0gUUoudmFsKHRhcmdldCk7XG4gIGlmIChlLm1ldGEpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGUud2hpY2ggIT09IDgpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKCh0YXJnZXQuc2VsZWN0aW9uU3RhcnQgIT0gbnVsbCkgJiYgdGFyZ2V0LnNlbGVjdGlvblN0YXJ0ICE9PSB2YWx1ZS5sZW5ndGgpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKC9cXGRcXHMkLy50ZXN0KHZhbHVlKSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgdmFsdWUucmVwbGFjZSgvXFxkXFxzJC8sICcnKSk7XG4gIH0gZWxzZSBpZiAoL1xcc1xcZD8kLy50ZXN0KHZhbHVlKSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgdmFsdWUucmVwbGFjZSgvXFxzXFxkPyQvLCAnJykpO1xuICB9XG59O1xuXG5mb3JtYXRFeHBpcnkgPSBmdW5jdGlvbihlKSB7XG4gIHZhciBkaWdpdCwgdGFyZ2V0LCB2YWw7XG4gIGRpZ2l0ID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKTtcbiAgaWYgKCEvXlxcZCskLy50ZXN0KGRpZ2l0KSkge1xuICAgIHJldHVybjtcbiAgfVxuICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgdmFsID0gUUoudmFsKHRhcmdldCkgKyBkaWdpdDtcbiAgaWYgKC9eXFxkJC8udGVzdCh2YWwpICYmICh2YWwgIT09ICcwJyAmJiB2YWwgIT09ICcxJykpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIFwiMFwiICsgdmFsICsgXCIgLyBcIik7XG4gIH0gZWxzZSBpZiAoL15cXGRcXGQkLy50ZXN0KHZhbCkpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIHZhbCArIFwiIC8gXCIpO1xuICB9XG59O1xuXG5mb3JtYXRNb250aEV4cGlyeSA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIGRpZ2l0LCB0YXJnZXQsIHZhbDtcbiAgZGlnaXQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpO1xuICBpZiAoIS9eXFxkKyQvLnRlc3QoZGlnaXQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRhcmdldCA9IGUudGFyZ2V0O1xuICB2YWwgPSBRSi52YWwodGFyZ2V0KSArIGRpZ2l0O1xuICBpZiAoL15cXGQkLy50ZXN0KHZhbCkgJiYgKHZhbCAhPT0gJzAnICYmIHZhbCAhPT0gJzEnKSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgXCIwXCIgKyB2YWwpO1xuICB9IGVsc2UgaWYgKC9eXFxkXFxkJC8udGVzdCh2YWwpKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCBcIlwiICsgdmFsKTtcbiAgfVxufTtcblxuZm9ybWF0Rm9yd2FyZEV4cGlyeSA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIGRpZ2l0LCB0YXJnZXQsIHZhbDtcbiAgZGlnaXQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpO1xuICBpZiAoIS9eXFxkKyQvLnRlc3QoZGlnaXQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRhcmdldCA9IGUudGFyZ2V0O1xuICB2YWwgPSBRSi52YWwodGFyZ2V0KTtcbiAgaWYgKC9eXFxkXFxkJC8udGVzdCh2YWwpKSB7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIHZhbCArIFwiIC8gXCIpO1xuICB9XG59O1xuXG5mb3JtYXRGb3J3YXJkU2xhc2ggPSBmdW5jdGlvbihlKSB7XG4gIHZhciBzbGFzaCwgdGFyZ2V0LCB2YWw7XG4gIHNsYXNoID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKTtcbiAgaWYgKHNsYXNoICE9PSAnLycpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gIHZhbCA9IFFKLnZhbCh0YXJnZXQpO1xuICBpZiAoL15cXGQkLy50ZXN0KHZhbCkgJiYgdmFsICE9PSAnMCcpIHtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgXCIwXCIgKyB2YWwgKyBcIiAvIFwiKTtcbiAgfVxufTtcblxuZm9ybWF0QmFja0V4cGlyeSA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIHRhcmdldCwgdmFsdWU7XG4gIGlmIChlLm1ldGFLZXkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gIHZhbHVlID0gUUoudmFsKHRhcmdldCk7XG4gIGlmIChlLndoaWNoICE9PSA4KSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICgodGFyZ2V0LnNlbGVjdGlvblN0YXJ0ICE9IG51bGwpICYmIHRhcmdldC5zZWxlY3Rpb25TdGFydCAhPT0gdmFsdWUubGVuZ3RoKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICgvXFxkKFxcc3xcXC8pKyQvLnRlc3QodmFsdWUpKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCB2YWx1ZS5yZXBsYWNlKC9cXGQoXFxzfFxcLykqJC8sICcnKSk7XG4gIH0gZWxzZSBpZiAoL1xcc1xcL1xccz9cXGQ/JC8udGVzdCh2YWx1ZSkpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIHZhbHVlLnJlcGxhY2UoL1xcc1xcL1xccz9cXGQ/JC8sICcnKSk7XG4gIH1cbn07XG5cbnJlc3RyaWN0TnVtZXJpYyA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIGlucHV0O1xuICBpZiAoZS5tZXRhS2V5IHx8IGUuY3RybEtleSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmIChlLndoaWNoID09PSAzMikge1xuICAgIHJldHVybiBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH1cbiAgaWYgKGUud2hpY2ggPT09IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAoZS53aGljaCA8IDMzKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaW5wdXQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpO1xuICBpZiAoIS9bXFxkXFxzXS8udGVzdChpbnB1dCkpIHtcbiAgICByZXR1cm4gZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG59O1xuXG5yZXN0cmljdENhcmROdW1iZXIgPSBmdW5jdGlvbihlKSB7XG4gIHZhciBjYXJkLCBkaWdpdCwgdGFyZ2V0LCB2YWx1ZTtcbiAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gIGRpZ2l0ID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKTtcbiAgaWYgKCEvXlxcZCskLy50ZXN0KGRpZ2l0KSkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoaGFzVGV4dFNlbGVjdGVkKHRhcmdldCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFsdWUgPSAoUUoudmFsKHRhcmdldCkgKyBkaWdpdCkucmVwbGFjZSgvXFxEL2csICcnKTtcbiAgY2FyZCA9IGNhcmRGcm9tTnVtYmVyKHZhbHVlKTtcbiAgaWYgKGNhcmQpIHtcbiAgICBpZiAoISh2YWx1ZS5sZW5ndGggPD0gY2FyZC5sZW5ndGhbY2FyZC5sZW5ndGgubGVuZ3RoIC0gMV0pKSB7XG4gICAgICByZXR1cm4gZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoISh2YWx1ZS5sZW5ndGggPD0gMTYpKSB7XG4gICAgICByZXR1cm4gZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfVxufTtcblxucmVzdHJpY3RFeHBpcnkgPSBmdW5jdGlvbihlLCBsZW5ndGgpIHtcbiAgdmFyIGRpZ2l0LCB0YXJnZXQsIHZhbHVlO1xuICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgZGlnaXQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpO1xuICBpZiAoIS9eXFxkKyQvLnRlc3QoZGlnaXQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChoYXNUZXh0U2VsZWN0ZWQodGFyZ2V0KSkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YWx1ZSA9IFFKLnZhbCh0YXJnZXQpICsgZGlnaXQ7XG4gIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvXFxEL2csICcnKTtcbiAgaWYgKHZhbHVlLmxlbmd0aCA+IGxlbmd0aCkge1xuICAgIHJldHVybiBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH1cbn07XG5cbnJlc3RyaWN0Q29tYmluZWRFeHBpcnkgPSBmdW5jdGlvbihlKSB7XG4gIHJldHVybiByZXN0cmljdEV4cGlyeShlLCA2KTtcbn07XG5cbnJlc3RyaWN0TW9udGhFeHBpcnkgPSBmdW5jdGlvbihlKSB7XG4gIHJldHVybiByZXN0cmljdEV4cGlyeShlLCAyKTtcbn07XG5cbnJlc3RyaWN0WWVhckV4cGlyeSA9IGZ1bmN0aW9uKGUpIHtcbiAgcmV0dXJuIHJlc3RyaWN0RXhwaXJ5KGUsIDQpO1xufTtcblxucmVzdHJpY3RDVkMgPSBmdW5jdGlvbihlKSB7XG4gIHZhciBkaWdpdCwgdGFyZ2V0LCB2YWw7XG4gIHRhcmdldCA9IGUudGFyZ2V0O1xuICBkaWdpdCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZS53aGljaCk7XG4gIGlmICghL15cXGQrJC8udGVzdChkaWdpdCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGhhc1RleHRTZWxlY3RlZCh0YXJnZXQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhbCA9IFFKLnZhbCh0YXJnZXQpICsgZGlnaXQ7XG4gIGlmICghKHZhbC5sZW5ndGggPD0gNCkpIHtcbiAgICByZXR1cm4gZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG59O1xuXG5zZXRDYXJkVHlwZSA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIGFsbFR5cGVzLCBjYXJkLCBjYXJkVHlwZSwgdGFyZ2V0LCB2YWw7XG4gIHRhcmdldCA9IGUudGFyZ2V0O1xuICB2YWwgPSBRSi52YWwodGFyZ2V0KTtcbiAgY2FyZFR5cGUgPSBQYXltZW50LmZucy5jYXJkVHlwZSh2YWwpIHx8ICd1bmtub3duJztcbiAgaWYgKCFRSi5oYXNDbGFzcyh0YXJnZXQsIGNhcmRUeXBlKSkge1xuICAgIGFsbFR5cGVzID0gKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGksIGxlbiwgcmVzdWx0cztcbiAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgIGZvciAoaSA9IDAsIGxlbiA9IGNhcmRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGNhcmQgPSBjYXJkc1tpXTtcbiAgICAgICAgcmVzdWx0cy5wdXNoKGNhcmQudHlwZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9KSgpO1xuICAgIFFKLnJlbW92ZUNsYXNzKHRhcmdldCwgJ3Vua25vd24nKTtcbiAgICBRSi5yZW1vdmVDbGFzcyh0YXJnZXQsIGFsbFR5cGVzLmpvaW4oJyAnKSk7XG4gICAgUUouYWRkQ2xhc3ModGFyZ2V0LCBjYXJkVHlwZSk7XG4gICAgUUoudG9nZ2xlQ2xhc3ModGFyZ2V0LCAnaWRlbnRpZmllZCcsIGNhcmRUeXBlICE9PSAndW5rbm93bicpO1xuICAgIHJldHVybiBRSi50cmlnZ2VyKHRhcmdldCwgJ3BheW1lbnQuY2FyZFR5cGUnLCBjYXJkVHlwZSk7XG4gIH1cbn07XG5cblBheW1lbnQgPSAoZnVuY3Rpb24oKSB7XG4gIGZ1bmN0aW9uIFBheW1lbnQoKSB7fVxuXG4gIFBheW1lbnQuZm5zID0ge1xuICAgIGNhcmRFeHBpcnlWYWw6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICB2YXIgbW9udGgsIHByZWZpeCwgcmVmLCB5ZWFyO1xuICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9cXHMvZywgJycpO1xuICAgICAgcmVmID0gdmFsdWUuc3BsaXQoJy8nLCAyKSwgbW9udGggPSByZWZbMF0sIHllYXIgPSByZWZbMV07XG4gICAgICBpZiAoKHllYXIgIT0gbnVsbCA/IHllYXIubGVuZ3RoIDogdm9pZCAwKSA9PT0gMiAmJiAvXlxcZCskLy50ZXN0KHllYXIpKSB7XG4gICAgICAgIHByZWZpeCA9IChuZXcgRGF0ZSkuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgcHJlZml4ID0gcHJlZml4LnRvU3RyaW5nKCkuc2xpY2UoMCwgMik7XG4gICAgICAgIHllYXIgPSBwcmVmaXggKyB5ZWFyO1xuICAgICAgfVxuICAgICAgbW9udGggPSBwYXJzZUludChtb250aCwgMTApO1xuICAgICAgeWVhciA9IHBhcnNlSW50KHllYXIsIDEwKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG1vbnRoOiBtb250aCxcbiAgICAgICAgeWVhcjogeWVhclxuICAgICAgfTtcbiAgICB9LFxuICAgIHZhbGlkYXRlQ2FyZE51bWJlcjogZnVuY3Rpb24obnVtKSB7XG4gICAgICB2YXIgY2FyZCwgcmVmO1xuICAgICAgbnVtID0gKG51bSArICcnKS5yZXBsYWNlKC9cXHMrfC0vZywgJycpO1xuICAgICAgaWYgKCEvXlxcZCskLy50ZXN0KG51bSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgY2FyZCA9IGNhcmRGcm9tTnVtYmVyKG51bSk7XG4gICAgICBpZiAoIWNhcmQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIChyZWYgPSBudW0ubGVuZ3RoLCBpbmRleE9mLmNhbGwoY2FyZC5sZW5ndGgsIHJlZikgPj0gMCkgJiYgKGNhcmQubHVobiA9PT0gZmFsc2UgfHwgbHVobkNoZWNrKG51bSkpO1xuICAgIH0sXG4gICAgdmFsaWRhdGVDYXJkRXhwaXJ5OiBmdW5jdGlvbihtb250aCwgeWVhcikge1xuICAgICAgdmFyIGN1cnJlbnRUaW1lLCBleHBpcnksIHByZWZpeCwgcmVmO1xuICAgICAgaWYgKHR5cGVvZiBtb250aCA9PT0gJ29iamVjdCcgJiYgJ21vbnRoJyBpbiBtb250aCkge1xuICAgICAgICByZWYgPSBtb250aCwgbW9udGggPSByZWYubW9udGgsIHllYXIgPSByZWYueWVhcjtcbiAgICAgIH1cbiAgICAgIGlmICghKG1vbnRoICYmIHllYXIpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIG1vbnRoID0gUUoudHJpbShtb250aCk7XG4gICAgICB5ZWFyID0gUUoudHJpbSh5ZWFyKTtcbiAgICAgIGlmICghL15cXGQrJC8udGVzdChtb250aCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKCEvXlxcZCskLy50ZXN0KHllYXIpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICghKHBhcnNlSW50KG1vbnRoLCAxMCkgPD0gMTIpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICh5ZWFyLmxlbmd0aCA9PT0gMikge1xuICAgICAgICBwcmVmaXggPSAobmV3IERhdGUpLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgIHByZWZpeCA9IHByZWZpeC50b1N0cmluZygpLnNsaWNlKDAsIDIpO1xuICAgICAgICB5ZWFyID0gcHJlZml4ICsgeWVhcjtcbiAgICAgIH1cbiAgICAgIGV4cGlyeSA9IG5ldyBEYXRlKHllYXIsIG1vbnRoKTtcbiAgICAgIGN1cnJlbnRUaW1lID0gbmV3IERhdGU7XG4gICAgICBleHBpcnkuc2V0TW9udGgoZXhwaXJ5LmdldE1vbnRoKCkgLSAxKTtcbiAgICAgIGV4cGlyeS5zZXRNb250aChleHBpcnkuZ2V0TW9udGgoKSArIDEsIDEpO1xuICAgICAgcmV0dXJuIGV4cGlyeSA+IGN1cnJlbnRUaW1lO1xuICAgIH0sXG4gICAgdmFsaWRhdGVDYXJkQ1ZDOiBmdW5jdGlvbihjdmMsIHR5cGUpIHtcbiAgICAgIHZhciByZWYsIHJlZjE7XG4gICAgICBjdmMgPSBRSi50cmltKGN2Yyk7XG4gICAgICBpZiAoIS9eXFxkKyQvLnRlc3QoY3ZjKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAodHlwZSAmJiBjYXJkRnJvbVR5cGUodHlwZSkpIHtcbiAgICAgICAgcmV0dXJuIHJlZiA9IGN2Yy5sZW5ndGgsIGluZGV4T2YuY2FsbCgocmVmMSA9IGNhcmRGcm9tVHlwZSh0eXBlKSkgIT0gbnVsbCA/IHJlZjEuY3ZjTGVuZ3RoIDogdm9pZCAwLCByZWYpID49IDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gY3ZjLmxlbmd0aCA+PSAzICYmIGN2Yy5sZW5ndGggPD0gNDtcbiAgICAgIH1cbiAgICB9LFxuICAgIGNhcmRUeXBlOiBmdW5jdGlvbihudW0pIHtcbiAgICAgIHZhciByZWY7XG4gICAgICBpZiAoIW51bSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIHJldHVybiAoKHJlZiA9IGNhcmRGcm9tTnVtYmVyKG51bSkpICE9IG51bGwgPyByZWYudHlwZSA6IHZvaWQgMCkgfHwgbnVsbDtcbiAgICB9LFxuICAgIGZvcm1hdENhcmROdW1iZXI6IGZ1bmN0aW9uKG51bSkge1xuICAgICAgdmFyIGNhcmQsIGdyb3VwcywgcmVmLCB1cHBlckxlbmd0aDtcbiAgICAgIGNhcmQgPSBjYXJkRnJvbU51bWJlcihudW0pO1xuICAgICAgaWYgKCFjYXJkKSB7XG4gICAgICAgIHJldHVybiBudW07XG4gICAgICB9XG4gICAgICB1cHBlckxlbmd0aCA9IGNhcmQubGVuZ3RoW2NhcmQubGVuZ3RoLmxlbmd0aCAtIDFdO1xuICAgICAgbnVtID0gbnVtLnJlcGxhY2UoL1xcRC9nLCAnJyk7XG4gICAgICBudW0gPSBudW0uc2xpY2UoMCwgK3VwcGVyTGVuZ3RoICsgMSB8fCA5ZTkpO1xuICAgICAgaWYgKGNhcmQuZm9ybWF0Lmdsb2JhbCkge1xuICAgICAgICByZXR1cm4gKHJlZiA9IG51bS5tYXRjaChjYXJkLmZvcm1hdCkpICE9IG51bGwgPyByZWYuam9pbignICcpIDogdm9pZCAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZ3JvdXBzID0gY2FyZC5mb3JtYXQuZXhlYyhudW0pO1xuICAgICAgICBpZiAoZ3JvdXBzICE9IG51bGwpIHtcbiAgICAgICAgICBncm91cHMuc2hpZnQoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZ3JvdXBzICE9IG51bGwgPyBncm91cHMuam9pbignICcpIDogdm9pZCAwO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBQYXltZW50LnJlc3RyaWN0TnVtZXJpYyA9IGZ1bmN0aW9uKGVsKSB7XG4gICAgcmV0dXJuIFFKLm9uKGVsLCAna2V5cHJlc3MnLCByZXN0cmljdE51bWVyaWMpO1xuICB9O1xuXG4gIFBheW1lbnQuY2FyZEV4cGlyeVZhbCA9IGZ1bmN0aW9uKGVsKSB7XG4gICAgcmV0dXJuIFBheW1lbnQuZm5zLmNhcmRFeHBpcnlWYWwoUUoudmFsKGVsKSk7XG4gIH07XG5cbiAgUGF5bWVudC5mb3JtYXRDYXJkQ1ZDID0gZnVuY3Rpb24oZWwpIHtcbiAgICBQYXltZW50LnJlc3RyaWN0TnVtZXJpYyhlbCk7XG4gICAgUUoub24oZWwsICdrZXlwcmVzcycsIHJlc3RyaWN0Q1ZDKTtcbiAgICByZXR1cm4gZWw7XG4gIH07XG5cbiAgUGF5bWVudC5mb3JtYXRDYXJkRXhwaXJ5ID0gZnVuY3Rpb24oZWwpIHtcbiAgICB2YXIgbW9udGgsIHllYXI7XG4gICAgUGF5bWVudC5yZXN0cmljdE51bWVyaWMoZWwpO1xuICAgIGlmIChlbC5sZW5ndGggJiYgZWwubGVuZ3RoID09PSAyKSB7XG4gICAgICBtb250aCA9IGVsWzBdLCB5ZWFyID0gZWxbMV07XG4gICAgICB0aGlzLmZvcm1hdENhcmRFeHBpcnlNdWx0aXBsZShtb250aCwgeWVhcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIFFKLm9uKGVsLCAna2V5cHJlc3MnLCByZXN0cmljdENvbWJpbmVkRXhwaXJ5KTtcbiAgICAgIFFKLm9uKGVsLCAna2V5cHJlc3MnLCBmb3JtYXRFeHBpcnkpO1xuICAgICAgUUoub24oZWwsICdrZXlwcmVzcycsIGZvcm1hdEZvcndhcmRTbGFzaCk7XG4gICAgICBRSi5vbihlbCwgJ2tleXByZXNzJywgZm9ybWF0Rm9yd2FyZEV4cGlyeSk7XG4gICAgICBRSi5vbihlbCwgJ2tleWRvd24nLCBmb3JtYXRCYWNrRXhwaXJ5KTtcbiAgICB9XG4gICAgcmV0dXJuIGVsO1xuICB9O1xuXG4gIFBheW1lbnQuZm9ybWF0Q2FyZEV4cGlyeU11bHRpcGxlID0gZnVuY3Rpb24obW9udGgsIHllYXIpIHtcbiAgICBRSi5vbihtb250aCwgJ2tleXByZXNzJywgcmVzdHJpY3RNb250aEV4cGlyeSk7XG4gICAgUUoub24obW9udGgsICdrZXlwcmVzcycsIGZvcm1hdE1vbnRoRXhwaXJ5KTtcbiAgICByZXR1cm4gUUoub24oeWVhciwgJ2tleXByZXNzJywgcmVzdHJpY3RZZWFyRXhwaXJ5KTtcbiAgfTtcblxuICBQYXltZW50LmZvcm1hdENhcmROdW1iZXIgPSBmdW5jdGlvbihlbCkge1xuICAgIFBheW1lbnQucmVzdHJpY3ROdW1lcmljKGVsKTtcbiAgICBRSi5vbihlbCwgJ2tleXByZXNzJywgcmVzdHJpY3RDYXJkTnVtYmVyKTtcbiAgICBRSi5vbihlbCwgJ2tleXByZXNzJywgZm9ybWF0Q2FyZE51bWJlcik7XG4gICAgUUoub24oZWwsICdrZXlkb3duJywgZm9ybWF0QmFja0NhcmROdW1iZXIpO1xuICAgIFFKLm9uKGVsLCAna2V5dXAnLCBzZXRDYXJkVHlwZSk7XG4gICAgUUoub24oZWwsICdwYXN0ZScsIHJlRm9ybWF0Q2FyZE51bWJlcik7XG4gICAgcmV0dXJuIGVsO1xuICB9O1xuXG4gIFBheW1lbnQuZ2V0Q2FyZEFycmF5ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGNhcmRzO1xuICB9O1xuXG4gIFBheW1lbnQuc2V0Q2FyZEFycmF5ID0gZnVuY3Rpb24oY2FyZEFycmF5KSB7XG4gICAgY2FyZHMgPSBjYXJkQXJyYXk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgUGF5bWVudC5hZGRUb0NhcmRBcnJheSA9IGZ1bmN0aW9uKGNhcmRPYmplY3QpIHtcbiAgICByZXR1cm4gY2FyZHMucHVzaChjYXJkT2JqZWN0KTtcbiAgfTtcblxuICBQYXltZW50LnJlbW92ZUZyb21DYXJkQXJyYXkgPSBmdW5jdGlvbih0eXBlKSB7XG4gICAgdmFyIGtleSwgdmFsdWU7XG4gICAgZm9yIChrZXkgaW4gY2FyZHMpIHtcbiAgICAgIHZhbHVlID0gY2FyZHNba2V5XTtcbiAgICAgIGlmICh2YWx1ZS50eXBlID09PSB0eXBlKSB7XG4gICAgICAgIGNhcmRzLnNwbGljZShrZXksIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICByZXR1cm4gUGF5bWVudDtcblxufSkoKTtcblxubW9kdWxlLmV4cG9ydHMgPSBQYXltZW50O1xuXG5nbG9iYWwuUGF5bWVudCA9IFBheW1lbnQ7XG5cblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG59LHtcInFqL3NyYy9xai5jb2ZmZWVcIjoxfV19LHt9LFsyXSkoMilcbn0pOyIsIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkoezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1widXNlIHN0cmljdFwiO3ZhciBfdmFsaWRGb3JtPXJlcXVpcmUoXCIuL3NyYy92YWxpZC1mb3JtXCIpO3ZhciBfdmFsaWRGb3JtMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF92YWxpZEZvcm0pO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKXtyZXR1cm4gb2JqJiZvYmouX19lc01vZHVsZT9vYmo6e2RlZmF1bHQ6b2JqfX13aW5kb3cuVmFsaWRGb3JtPV92YWxpZEZvcm0yLmRlZmF1bHQ7d2luZG93LlZhbGlkRm9ybS50b2dnbGVJbnZhbGlkQ2xhc3M9X3ZhbGlkRm9ybS50b2dnbGVJbnZhbGlkQ2xhc3M7d2luZG93LlZhbGlkRm9ybS5oYW5kbGVDdXN0b21NZXNzYWdlcz1fdmFsaWRGb3JtLmhhbmRsZUN1c3RvbU1lc3NhZ2VzO3dpbmRvdy5WYWxpZEZvcm0uaGFuZGxlQ3VzdG9tTWVzc2FnZURpc3BsYXk9X3ZhbGlkRm9ybS5oYW5kbGVDdXN0b21NZXNzYWdlRGlzcGxheX0se1wiLi9zcmMvdmFsaWQtZm9ybVwiOjN9XSwyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6dHJ1ZX0pO2V4cG9ydHMuY2xvbmU9Y2xvbmU7ZXhwb3J0cy5kZWZhdWx0cz1kZWZhdWx0cztleHBvcnRzLmluc2VydEFmdGVyPWluc2VydEFmdGVyO2V4cG9ydHMuaW5zZXJ0QmVmb3JlPWluc2VydEJlZm9yZTtleHBvcnRzLmZvckVhY2g9Zm9yRWFjaDtleHBvcnRzLmRlYm91bmNlPWRlYm91bmNlO2Z1bmN0aW9uIGNsb25lKG9iail7dmFyIGNvcHk9e307Zm9yKHZhciBhdHRyIGluIG9iail7aWYob2JqLmhhc093blByb3BlcnR5KGF0dHIpKWNvcHlbYXR0cl09b2JqW2F0dHJdfXJldHVybiBjb3B5fWZ1bmN0aW9uIGRlZmF1bHRzKG9iaixkZWZhdWx0T2JqZWN0KXtvYmo9Y2xvbmUob2JqfHx7fSk7Zm9yKHZhciBrIGluIGRlZmF1bHRPYmplY3Qpe2lmKG9ialtrXT09PXVuZGVmaW5lZClvYmpba109ZGVmYXVsdE9iamVjdFtrXX1yZXR1cm4gb2JqfWZ1bmN0aW9uIGluc2VydEFmdGVyKHJlZk5vZGUsbm9kZVRvSW5zZXJ0KXt2YXIgc2libGluZz1yZWZOb2RlLm5leHRTaWJsaW5nO2lmKHNpYmxpbmcpe3ZhciBfcGFyZW50PXJlZk5vZGUucGFyZW50Tm9kZTtfcGFyZW50Lmluc2VydEJlZm9yZShub2RlVG9JbnNlcnQsc2libGluZyl9ZWxzZXtwYXJlbnQuYXBwZW5kQ2hpbGQobm9kZVRvSW5zZXJ0KX19ZnVuY3Rpb24gaW5zZXJ0QmVmb3JlKHJlZk5vZGUsbm9kZVRvSW5zZXJ0KXt2YXIgcGFyZW50PXJlZk5vZGUucGFyZW50Tm9kZTtwYXJlbnQuaW5zZXJ0QmVmb3JlKG5vZGVUb0luc2VydCxyZWZOb2RlKX1mdW5jdGlvbiBmb3JFYWNoKGl0ZW1zLGZuKXtpZighaXRlbXMpcmV0dXJuO2lmKGl0ZW1zLmZvckVhY2gpe2l0ZW1zLmZvckVhY2goZm4pfWVsc2V7Zm9yKHZhciBpPTA7aTxpdGVtcy5sZW5ndGg7aSsrKXtmbihpdGVtc1tpXSxpLGl0ZW1zKX19fWZ1bmN0aW9uIGRlYm91bmNlKG1zLGZuKXt2YXIgdGltZW91dD12b2lkIDA7dmFyIGRlYm91bmNlZEZuPWZ1bmN0aW9uIGRlYm91bmNlZEZuKCl7Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO3RpbWVvdXQ9c2V0VGltZW91dChmbixtcyl9O3JldHVybiBkZWJvdW5jZWRGbn19LHt9XSwzOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6dHJ1ZX0pO2V4cG9ydHMudG9nZ2xlSW52YWxpZENsYXNzPXRvZ2dsZUludmFsaWRDbGFzcztleHBvcnRzLmhhbmRsZUN1c3RvbU1lc3NhZ2VzPWhhbmRsZUN1c3RvbU1lc3NhZ2VzO2V4cG9ydHMuaGFuZGxlQ3VzdG9tTWVzc2FnZURpc3BsYXk9aGFuZGxlQ3VzdG9tTWVzc2FnZURpc3BsYXk7ZXhwb3J0cy5kZWZhdWx0PXZhbGlkRm9ybTt2YXIgX3V0aWw9cmVxdWlyZShcIi4vdXRpbFwiKTtmdW5jdGlvbiB0b2dnbGVJbnZhbGlkQ2xhc3MoaW5wdXQsaW52YWxpZENsYXNzKXtpbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiaW52YWxpZFwiLGZ1bmN0aW9uKCl7aW5wdXQuY2xhc3NMaXN0LmFkZChpbnZhbGlkQ2xhc3MpfSk7aW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsZnVuY3Rpb24oKXtpZihpbnB1dC52YWxpZGl0eS52YWxpZCl7aW5wdXQuY2xhc3NMaXN0LnJlbW92ZShpbnZhbGlkQ2xhc3MpfX0pfXZhciBlcnJvclByb3BzPVtcImJhZElucHV0XCIsXCJwYXR0ZXJuTWlzbWF0Y2hcIixcInJhbmdlT3ZlcmZsb3dcIixcInJhbmdlVW5kZXJmbG93XCIsXCJzdGVwTWlzbWF0Y2hcIixcInRvb0xvbmdcIixcInRvb1Nob3J0XCIsXCJ0eXBlTWlzbWF0Y2hcIixcInZhbHVlTWlzc2luZ1wiLFwiY3VzdG9tRXJyb3JcIl07ZnVuY3Rpb24gZ2V0Q3VzdG9tTWVzc2FnZShpbnB1dCxjdXN0b21NZXNzYWdlcyl7Y3VzdG9tTWVzc2FnZXM9Y3VzdG9tTWVzc2FnZXN8fHt9O3ZhciBsb2NhbEVycm9yUHJvcHM9W2lucHV0LnR5cGUrXCJNaXNtYXRjaFwiXS5jb25jYXQoZXJyb3JQcm9wcyk7dmFyIHZhbGlkaXR5PWlucHV0LnZhbGlkaXR5O2Zvcih2YXIgaT0wO2k8bG9jYWxFcnJvclByb3BzLmxlbmd0aDtpKyspe3ZhciBwcm9wPWxvY2FsRXJyb3JQcm9wc1tpXTtpZih2YWxpZGl0eVtwcm9wXSl7cmV0dXJuIGlucHV0LmdldEF0dHJpYnV0ZShcImRhdGEtXCIrcHJvcCl8fGN1c3RvbU1lc3NhZ2VzW3Byb3BdfX19ZnVuY3Rpb24gaGFuZGxlQ3VzdG9tTWVzc2FnZXMoaW5wdXQsY3VzdG9tTWVzc2FnZXMpe2Z1bmN0aW9uIGNoZWNrVmFsaWRpdHkoKXt2YXIgbWVzc2FnZT1pbnB1dC52YWxpZGl0eS52YWxpZD9udWxsOmdldEN1c3RvbU1lc3NhZ2UoaW5wdXQsY3VzdG9tTWVzc2FnZXMpO2lucHV0LnNldEN1c3RvbVZhbGlkaXR5KG1lc3NhZ2V8fFwiXCIpfWlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLGNoZWNrVmFsaWRpdHkpO2lucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnZhbGlkXCIsY2hlY2tWYWxpZGl0eSl9ZnVuY3Rpb24gaGFuZGxlQ3VzdG9tTWVzc2FnZURpc3BsYXkoaW5wdXQsb3B0aW9ucyl7dmFyIHZhbGlkYXRpb25FcnJvckNsYXNzPW9wdGlvbnMudmFsaWRhdGlvbkVycm9yQ2xhc3MsdmFsaWRhdGlvbkVycm9yUGFyZW50Q2xhc3M9b3B0aW9ucy52YWxpZGF0aW9uRXJyb3JQYXJlbnRDbGFzcyxlcnJvclBsYWNlbWVudD1vcHRpb25zLmVycm9yUGxhY2VtZW50O2Z1bmN0aW9uIGNoZWNrVmFsaWRpdHkob3B0aW9ucyl7dmFyIGluc2VydEVycm9yPW9wdGlvbnMuaW5zZXJ0RXJyb3I7dmFyIHBhcmVudE5vZGU9aW5wdXQucGFyZW50Tm9kZTt2YXIgZXJyb3JOb2RlPXBhcmVudE5vZGUucXVlcnlTZWxlY3RvcihcIi5cIit2YWxpZGF0aW9uRXJyb3JDbGFzcyl8fGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7aWYoIWlucHV0LnZhbGlkaXR5LnZhbGlkJiZpbnB1dC52YWxpZGF0aW9uTWVzc2FnZSl7ZXJyb3JOb2RlLmNsYXNzTmFtZT12YWxpZGF0aW9uRXJyb3JDbGFzcztlcnJvck5vZGUudGV4dENvbnRlbnQ9aW5wdXQudmFsaWRhdGlvbk1lc3NhZ2U7aWYoaW5zZXJ0RXJyb3Ipe2Vycm9yUGxhY2VtZW50PT09XCJiZWZvcmVcIj8oMCxfdXRpbC5pbnNlcnRCZWZvcmUpKGlucHV0LGVycm9yTm9kZSk6KDAsX3V0aWwuaW5zZXJ0QWZ0ZXIpKGlucHV0LGVycm9yTm9kZSk7cGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKHZhbGlkYXRpb25FcnJvclBhcmVudENsYXNzKX19ZWxzZXtwYXJlbnROb2RlLmNsYXNzTGlzdC5yZW1vdmUodmFsaWRhdGlvbkVycm9yUGFyZW50Q2xhc3MpO2Vycm9yTm9kZS5yZW1vdmUoKX19aW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsZnVuY3Rpb24oKXtjaGVja1ZhbGlkaXR5KHtpbnNlcnRFcnJvcjpmYWxzZX0pfSk7aW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImludmFsaWRcIixmdW5jdGlvbihlKXtlLnByZXZlbnREZWZhdWx0KCk7Y2hlY2tWYWxpZGl0eSh7aW5zZXJ0RXJyb3I6dHJ1ZX0pfSl9dmFyIGRlZmF1bHRPcHRpb25zPXtpbnZhbGlkQ2xhc3M6XCJpbnZhbGlkXCIsdmFsaWRhdGlvbkVycm9yQ2xhc3M6XCJ2YWxpZGF0aW9uLWVycm9yXCIsdmFsaWRhdGlvbkVycm9yUGFyZW50Q2xhc3M6XCJoYXMtdmFsaWRhdGlvbi1lcnJvclwiLGN1c3RvbU1lc3NhZ2VzOnt9LGVycm9yUGxhY2VtZW50OlwiYmVmb3JlXCJ9O2Z1bmN0aW9uIHZhbGlkRm9ybShlbGVtZW50LG9wdGlvbnMpe2lmKCFlbGVtZW50fHwhZWxlbWVudC5ub2RlTmFtZSl7dGhyb3cgbmV3IEVycm9yKFwiRmlyc3QgYXJnIHRvIHZhbGlkRm9ybSBtdXN0IGJlIGEgZm9ybSwgaW5wdXQsIHNlbGVjdCwgb3IgdGV4dGFyZWFcIil9dmFyIGlucHV0cz12b2lkIDA7dmFyIHR5cGU9ZWxlbWVudC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO29wdGlvbnM9KDAsX3V0aWwuZGVmYXVsdHMpKG9wdGlvbnMsZGVmYXVsdE9wdGlvbnMpO2lmKHR5cGU9PT1cImZvcm1cIil7aW5wdXRzPWVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChcImlucHV0LCBzZWxlY3QsIHRleHRhcmVhXCIpO2ZvY3VzSW52YWxpZElucHV0KGVsZW1lbnQsaW5wdXRzKX1lbHNlIGlmKHR5cGU9PT1cImlucHV0XCJ8fHR5cGU9PT1cInNlbGVjdFwifHx0eXBlPT09XCJ0ZXh0YXJlYVwiKXtpbnB1dHM9W2VsZW1lbnRdfWVsc2V7dGhyb3cgbmV3IEVycm9yKFwiT25seSBmb3JtLCBpbnB1dCwgc2VsZWN0LCBvciB0ZXh0YXJlYSBlbGVtZW50cyBhcmUgc3VwcG9ydGVkXCIpfXZhbGlkRm9ybUlucHV0cyhpbnB1dHMsb3B0aW9ucyl9ZnVuY3Rpb24gZm9jdXNJbnZhbGlkSW5wdXQoZm9ybSxpbnB1dHMpe3ZhciBmb2N1c0ZpcnN0PSgwLF91dGlsLmRlYm91bmNlKSgxMDAsZnVuY3Rpb24oKXt2YXIgaW52YWxpZE5vZGU9Zm9ybS5xdWVyeVNlbGVjdG9yKFwiOmludmFsaWRcIik7aWYoaW52YWxpZE5vZGUpaW52YWxpZE5vZGUuZm9jdXMoKX0pOygwLF91dGlsLmZvckVhY2gpKGlucHV0cyxmdW5jdGlvbihpbnB1dCl7cmV0dXJuIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnZhbGlkXCIsZm9jdXNGaXJzdCl9KX1mdW5jdGlvbiB2YWxpZEZvcm1JbnB1dHMoaW5wdXRzLG9wdGlvbnMpe3ZhciBpbnZhbGlkQ2xhc3M9b3B0aW9ucy5pbnZhbGlkQ2xhc3MsY3VzdG9tTWVzc2FnZXM9b3B0aW9ucy5jdXN0b21NZXNzYWdlczsoMCxfdXRpbC5mb3JFYWNoKShpbnB1dHMsZnVuY3Rpb24oaW5wdXQpe3RvZ2dsZUludmFsaWRDbGFzcyhpbnB1dCxpbnZhbGlkQ2xhc3MpO2hhbmRsZUN1c3RvbU1lc3NhZ2VzKGlucHV0LGN1c3RvbU1lc3NhZ2VzKTtoYW5kbGVDdXN0b21NZXNzYWdlRGlzcGxheShpbnB1dCxvcHRpb25zKX0pfX0se1wiLi91dGlsXCI6Mn1dfSx7fSxbMV0pOyIsIi8vIE1pbm5Qb3N0IEdpdmluZyBwbHVnaW5cbi8vIHRoZSBzZW1pLWNvbG9uIGJlZm9yZSBmdW5jdGlvbiBpbnZvY2F0aW9uIGlzIGEgc2FmZXR5IG5ldCBhZ2FpbnN0IGNvbmNhdGVuYXRlZFxuLy8gc2NyaXB0cyBhbmQvb3Igb3RoZXIgcGx1Z2lucyB3aGljaCBtYXkgbm90IGJlIGNsb3NlZCBwcm9wZXJseS5cbjsoZnVuY3Rpb24gKCAkLCB3aW5kb3csIGRvY3VtZW50LCB1bmRlZmluZWQgKSB7XG5cbiAgLy8gdW5kZWZpbmVkIGlzIHVzZWQgaGVyZSBhcyB0aGUgdW5kZWZpbmVkIGdsb2JhbCB2YXJpYWJsZSBpbiBFQ01BU2NyaXB0IDMgaXNcbiAgLy8gbXV0YWJsZSAoaWUuIGl0IGNhbiBiZSBjaGFuZ2VkIGJ5IHNvbWVvbmUgZWxzZSkuIHVuZGVmaW5lZCBpc24ndCByZWFsbHkgYmVpbmdcbiAgLy8gcGFzc2VkIGluIHNvIHdlIGNhbiBlbnN1cmUgdGhlIHZhbHVlIG9mIGl0IGlzIHRydWx5IHVuZGVmaW5lZC4gSW4gRVM1LCB1bmRlZmluZWRcbiAgLy8gY2FuIG5vIGxvbmdlciBiZSBtb2RpZmllZC5cblxuICAvLyB3aW5kb3cgYW5kIGRvY3VtZW50IGFyZSBwYXNzZWQgdGhyb3VnaCBhcyBsb2NhbCB2YXJpYWJsZSByYXRoZXIgdGhhbiBnbG9iYWxcbiAgLy8gYXMgdGhpcyAoc2xpZ2h0bHkpIHF1aWNrZW5zIHRoZSByZXNvbHV0aW9uIHByb2Nlc3MgYW5kIGNhbiBiZSBtb3JlIGVmZmljaWVudGx5XG4gIC8vIG1pbmlmaWVkIChlc3BlY2lhbGx5IHdoZW4gYm90aCBhcmUgcmVndWxhcmx5IHJlZmVyZW5jZWQgaW4geW91ciBwbHVnaW4pLlxuXG4gIC8vIENyZWF0ZSB0aGUgZGVmYXVsdHMgb25jZVxuICB2YXIgcGx1Z2luTmFtZSA9ICdtaW5ucG9zdF9naXZpbmcnLFxuICBkZWZhdWx0cyA9IHtcbiAgICAnZGVidWcnIDogZmFsc2UsIC8vIHRoaXMgY2FuIGJlIHNldCB0byB0cnVlIG9uIHBhZ2UgbGV2ZWwgb3B0aW9uc1xuICAgICdzdHJpcGVfcHVibGlzaGFibGVfa2V5JyA6ICcnLFxuICAgICdwbGFpZF9lbnYnIDogJycsXG4gICAgJ3BsYWlkX3B1YmxpY19rZXknIDogJycsXG4gICAgJ3BsYWlkX2xpbmsnIDogJyNhdXRob3JpemUtYWNoJyxcbiAgICAnbWlubnBvc3Rfcm9vdCcgOiAnaHR0cHM6Ly93d3cubWlubnBvc3QuY29tJyxcbiAgICAncHJvZ3Jlc3Nfc2VsZWN0b3InIDogJy5tLXN1cHBvcnQtcHJvZ3Jlc3MnLFxuICAgICdkb25hdGVfZm9ybV9zZWxlY3Rvcic6ICcjZG9uYXRlJyxcbiAgICAnY29uZmlybV9mb3JtX3NlbGVjdG9yJyA6ICcjY29uZmlybScsXG4gICAgJ2ZpbmlzaF9zZWN0aW9uX3NlbGVjdG9yJyA6ICcjcGFuZWwtLWNvbmZpcm1hdGlvbicsXG4gICAgJ3BheV9jY19wcm9jZXNzaW5nX3NlbGVjdG9yJyA6ICdpbnB1dFtpZD1cInBheS1mZWVzXCJdJyxcbiAgICAnZmVlX2Ftb3VudCcgOiAnLnByb2Nlc3NpbmctYW1vdW50JyxcbiAgICAnbGV2ZWxfYW1vdW50X3NlbGVjdG9yJyA6ICcjcGFuZWwtLXBheSAuYW1vdW50IC5sZXZlbC1hbW91bnQnLCAvLyB3ZSBjYW4gbWF5YmUgZ2V0IHJpZCBvZiB0aGlzXG4gICAgJ29yaWdpbmFsX2Ftb3VudF9zZWxlY3RvcicgOiAnW25hbWU9XCJhbW91bnRcIl0nLFxuICAgICdmYWlyX21hcmtldF92YWx1ZV9zZWxlY3RvcicgOiAnI2ZhaXJfbWFya2V0X3ZhbHVlJyxcbiAgICAnZnVsbF9hbW91bnRfc2VsZWN0b3InIDogJy5mdWxsLWFtb3VudCcsXG4gICAgJ2luc3RhbGxtZW50X3BlcmlvZF9zZWxlY3RvcicgOiAnW25hbWU9XCJpbnN0YWxsbWVudF9wZXJpb2RcIl0nLFxuICAgICduYW1lX3NlbGVjdG9yJyA6ICcubS1mb3JtLWl0ZW0tZGlzcGxheS1uYW1lJyxcbiAgICAnaW5faG9ub3Jfb3JfbWVtb3J5X2ZpZWxkX3NlbGVjdG9yJyA6ICcubS1mb3JtLWl0ZW0taG9ub3ItbWVtb3J5JyxcbiAgICAnaG9ub3Jfb3JfbWVtb3J5X2Nob29zZXInIDogJ2lucHV0W25hbWU9XCJpbl9ob25vcl9vcl9tZW1vcnlcIl0nLCAvLyByYWRpbyBmaWVsZHNcbiAgICAnaG9ub3JfdHlwZV9zZWxlY3RvcicgOiAnLmEtaG9ub3ItdHlwZScsIC8vIHNwYW4gaW5zaWRlIGxhYmVsXG4gICAgJ2hvbm9yX21lbW9yeV9pbnB1dF9ncm91cCcgOiAnLmEtaG9ub3Itb3ItbWVtb3J5JywgLy8gaG9sZHMgdGhlIGZvcm0gZmllbGRcbiAgICAnYW5vbnltb3VzX3NlbGVjdG9yJyA6ICcjYW5vbnltb3VzJyxcbiAgICAnc2hvd19iaWxsaW5nX2NvdW50cnlfc2VsZWN0b3InIDogJyNiaWxsaW5nX3Nob3dfY291bnRyeScsXG4gICAgJ2JpbGxpbmdfY291bnRyeV9zZWxlY3RvcicgOiAnLm0tZm9ybS1pdGVtLWNvdW50cnknLFxuICAgICdzaG93X3NoaXBwaW5nX2NvdW50cnlfc2VsZWN0b3InIDogJyNzaGlwcGluZ19zaG93X2NvdW50cnknLFxuICAgICdzaGlwcGluZ19jb3VudHJ5X3NlbGVjdG9yJyA6ICcubS1mb3JtLWl0ZW0tc2hpcHBpbmctY291bnRyeScsXG4gICAgJ3NoaXBwaW5nX2FkZHJlc3Nfc2VsZWN0b3InIDogJy5tLWZvcm0taXRlbS1zaGlwcGluZy1hZGRyZXNzJyxcbiAgICAndXNlX2Zvcl9zaGlwcGluZ19zZWxlY3RvcicgOiAnI3VzZWZvcnNoaXBwaW5nJyxcbiAgICAnZW1haWxfZmllbGRfc2VsZWN0b3InIDogJyNlbWFpbCcsXG4gICAgJ3Bhc3N3b3JkX2ZpZWxkX3NlbGVjdG9yJyA6ICcjcGFzc3dvcmQnLFxuICAgICdmaXJzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yJyA6ICcjZmlyc3RfbmFtZScsXG4gICAgJ2xhc3RfbmFtZV9maWVsZF9zZWxlY3RvcicgOiAnI2xhc3RfbmFtZScsXG4gICAgJ2FjY291bnRfY2l0eV9zZWxlY3RvcicgOiAnI2JpbGxpbmdfY2l0eScsXG4gICAgJ2FjY291bnRfc3RhdGVfc2VsZWN0b3InIDogJyNiaWxsaW5nX3N0YXRlJyxcbiAgICAnYWNjb3VudF96aXBfc2VsZWN0b3InIDogJyNiaWxsaW5nX3ppcCcsXG4gICAgJ2NyZWF0ZV9tcF9zZWxlY3RvcicgOiAnI2NyZWF0ZW1wYWNjb3VudCcsXG4gICAgJ3Bhc3N3b3JkX3NlbGVjdG9yJyA6ICcubS1mb3JtLWl0ZW0tcGFzc3dvcmQnLFxuICAgICdhZGRpdGlvbmFsX2Ftb3VudF9maWVsZCcgOiAnI2FkZGl0aW9uYWxfZG9uYXRpb24nLFxuICAgICdzaGlwcGluZ19zZWxlY3RvcicgOiAnZmllbGRzZXQubS1zaGlwcGluZy1pbmZvcm1hdGlvbicsXG4gICAgJ2Nob29zZV9wYXltZW50JyA6ICcjY2hvb3NlLXBheW1lbnQtbWV0aG9kJyxcbiAgICAncGF5bWVudF9tZXRob2Rfc2VsZWN0b3InIDogJy5wYXltZW50LW1ldGhvZCcsXG4gICAgJ2NjX251bV9zZWxlY3RvcicgOiAnI2NhcmQtbnVtYmVyJyxcbiAgICAnY2NfZXhwX3NlbGVjdG9yJyA6ICcjY2FyZC1leHBpcnknLFxuICAgICdjY19jdnZfc2VsZWN0b3InIDogJyNjYXJkLWN2YycsXG4gICAgJ3BheV9idXR0b25fc2VsZWN0b3InIDogJy5hLWJ1dHRvbi1wYXknLFxuICAgICdvcHBfaWRfc2VsZWN0b3InIDogJyNsb2NrX2tleScsIC8vIHdlIHVzZSB0aGlzIHZhbHVlIGFzIHRoZSBHb29nbGUgQW5hbHl0aWNzIHRyYW5zYWN0aW9uIElEXG4gICAgJ25ld3NsZXR0ZXJfZ3JvdXBfc2VsZWN0b3InIDogJy5zdXBwb3J0LW5ld3NsZXR0ZXJzJ1xuICB9OyAvLyBlbmQgZGVmYXVsdHNcblxuICAvLyBUaGUgYWN0dWFsIHBsdWdpbiBjb25zdHJ1Y3RvclxuICBmdW5jdGlvbiBQbHVnaW4oIGVsZW1lbnQsIG9wdGlvbnMgKSB7XG5cbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuXG4gICAgLy8galF1ZXJ5IGhhcyBhbiBleHRlbmQgbWV0aG9kIHdoaWNoIG1lcmdlcyB0aGUgY29udGVudHMgb2YgdHdvIG9yXG4gICAgLy8gbW9yZSBvYmplY3RzLCBzdG9yaW5nIHRoZSByZXN1bHQgaW4gdGhlIGZpcnN0IG9iamVjdC4gVGhlIGZpcnN0IG9iamVjdFxuICAgIC8vIGlzIGdlbmVyYWxseSBlbXB0eSBhcyB3ZSBkb24ndCB3YW50IHRvIGFsdGVyIHRoZSBkZWZhdWx0IG9wdGlvbnMgZm9yXG4gICAgLy8gZnV0dXJlIGluc3RhbmNlcyBvZiB0aGUgcGx1Z2luXG4gICAgdGhpcy5vcHRpb25zID0gJC5leHRlbmQoIHt9LCBkZWZhdWx0cywgb3B0aW9ucyApO1xuXG4gICAgdGhpcy5fZGVmYXVsdHMgPSBkZWZhdWx0cztcbiAgICB0aGlzLl9uYW1lID0gcGx1Z2luTmFtZTtcblxuICAgIHRoaXMuaW5pdCgpO1xuICB9IC8vIGVuZCBjb25zdHJ1Y3RvclxuXG4gIFBsdWdpbi5wcm90b3R5cGUgPSB7XG5cbiAgICBpbml0OiBmdW5jdGlvbihyZXNldCwgYW1vdW50KSB7XG5cbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSggJ25vLWpzJyApO1xuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCAnanMnICk7XG5cbiAgICAgIC8vIFBsYWNlIGluaXRpYWxpemF0aW9uIGxvZ2ljIGhlcmVcbiAgICAgIC8vIFlvdSBhbHJlYWR5IGhhdmUgYWNjZXNzIHRvIHRoZSBET00gZWxlbWVudCBhbmRcbiAgICAgIC8vIHRoZSBvcHRpb25zIHZpYSB0aGUgaW5zdGFuY2UsIGUuZy4gdGhpcy5lbGVtZW50XG4gICAgICAvLyBhbmQgdGhpcy5vcHRpb25zXG4gICAgICAvLyB5b3UgY2FuIGFkZCBtb3JlIGZ1bmN0aW9ucyBsaWtlIHRoZSBvbmUgYmVsb3cgYW5kXG4gICAgICAvLyBjYWxsIHRoZW0gbGlrZSBzbzogdGhpcy55b3VyT3RoZXJGdW5jdGlvbih0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucykuXG5cbiAgICAgIC8vIG1vZGlmeSBvcHRpb25zIGFzIG5lZWRlZFxuICAgICAgLy92YXIgdGhpcy5vcHRpb25zLmFtb3VudCA9ICcnO1xuICAgICAgaWYgKHJlc2V0ICE9PSB0cnVlKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5hbW91bnQgPSBwYXJzZUZsb2F0KCQodGhpcy5vcHRpb25zLmxldmVsX2Ftb3VudF9zZWxlY3RvciwgdGhpcy5lbGVtZW50KS50ZXh0KCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLmFtb3VudCA9IGFtb3VudDtcbiAgICAgIH1cbiAgICAgIHRoaXMub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQgICAgID0gcGFyc2VJbnQoJCh0aGlzLm9wdGlvbnMub3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yLCB0aGlzLmVsZW1lbnQpLnZhbCgpLCAxMCk7XG4gICAgICB0aGlzLm9wdGlvbnMucHJvY2Vzc2luZ19mZWUgICAgICA9IChNYXRoLnJvdW5kKHBhcnNlRmxvYXQodGhpcy5vcHRpb25zLmZlZV9hbW91bnQpKk1hdGgucG93KDEwLDIpKS9NYXRoLnBvdygxMCwyKSkudG9GaXhlZCgyKTtcbiAgICAgIHRoaXMub3B0aW9ucy5wcm9jZXNzaW5nX2ZlZV90ZXh0ID0gdGhpcy5vcHRpb25zLnByb2Nlc3NpbmdfZmVlO1xuICAgICAgdGhpcy5vcHRpb25zLmNyZWF0ZV9hY2NvdW50ICAgICAgPSBmYWxzZTtcblxuICAgICAgdmFyIGJ1dHRvbl90ZXh0ID0gJCh0aGlzLm9wdGlvbnMucGF5X2J1dHRvbl9zZWxlY3RvcikudGV4dCgpO1xuICAgICAgdGhpcy5vcHRpb25zLmJ1dHRvbl90ZXh0ID0gYnV0dG9uX3RleHQ7XG5cbiAgICAgIHRoaXMuc3RyaXBlID0gU3RyaXBlKHRoaXMub3B0aW9ucy5zdHJpcGVfcHVibGlzaGFibGVfa2V5KTtcbiAgICAgIHRoaXMuZWxlbWVudHMgPSB0aGlzLnN0cmlwZS5lbGVtZW50cyh7XG4gICAgICAgIGZvbnRzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgLy8gaW50ZWdyYXRlIHlvdXIgZm9udCBpbnRvIHN0cmlwZVxuICAgICAgICAgICAgY3NzU3JjOiAnaHR0cHM6Ly91c2UudHlwZWtpdC5uZXQvY3hqN2Z6Zy5jc3MnLFxuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfSk7XG5cbiAgICAgIC8vIHVzZSBhIHJlZmVycmVyIGZvciBlZGl0IGxpbmsgaWYgd2UgaGF2ZSBvbmVcbiAgICAgIGlmIChkb2N1bWVudC5yZWZlcnJlciAhPT0gJycpIHtcbiAgICAgICAgJCgnI2VkaXRfdXJsJykucHJvcCgnaHJlZicsIGRvY3VtZW50LnJlZmVycmVyKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5kZWJ1ZyA9PT0gdHJ1ZSkge1xuICAgICAgICB0aGlzLmRlYnVnKHRoaXMub3B0aW9ucyk7XG4gICAgICAgIC8vIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gY2FsbCBmdW5jdGlvbnNcbiAgICAgIHRoaXMuYW5hbHl0aWNzVHJhY2tpbmcodGhpcy5vcHRpb25zKTsgLy8gdHJhY2sgYW5hbHl0aWNzIGV2ZW50c1xuICAgICAgdGhpcy5hbW91bnRBc1JhZGlvKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gaWYgdGhlIGFtb3VudCBmaWVsZCBpcyBhIHJhZGlvIGJ1dHRvblxuICAgICAgdGhpcy5hbW91bnRVcGRhdGVkKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gaWYgdGhlIGFtb3VudCB0ZXh0IGZpZWxkIGNhbiBjaGFuZ2VcblxuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLnBheV9jY19wcm9jZXNzaW5nX3NlbGVjdG9yKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuY3JlZGl0Q2FyZFByb2Nlc3NpbmdGZWVzKHRoaXMub3B0aW9ucyk7IC8vIHByb2Nlc3NpbmcgZmVlc1xuICAgICAgfVxuICAgICAgXG4gICAgICAvLyB0aGUgbWFpbiBmb3JtIElELiB0aGlzIGlzIG5vdCB1c2VkIGZvciBjYW5jZWxsaW5nXG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5kb25hdGVBbm9ueW1vdXNseSh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIGFub255bW91c1xuICAgICAgICB0aGlzLmhvbm9yT3JNZW1vcnlUb2dnbGUodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBpbiBob25vciBvciBpbiBtZW1vcnkgb2Ygc29tZW9uZVxuICAgICAgICB0aGlzLm91dHNpZGVVbml0ZWRTdGF0ZXModGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBvdXRzaWRlIFVTXG4gICAgICAgIHRoaXMuc2hpcHBpbmdBZGRyZXNzKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gc2hpcHBpbmcgYWRkcmVzc1xuICAgICAgICB0aGlzLmFsbG93TWlubnBvc3RBY2NvdW50KHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gb3B0aW9uIGZvciBjcmVhdGluZyBtaW5ucG9zdCBhY2NvdW50XG4gICAgICAgIHRoaXMuY2hvb3NlUGF5bWVudE1ldGhvZCh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIHN3aXRjaCBiZXR3ZWVuIGNhcmQgYW5kIGFjaFxuICAgICAgICB0aGlzLmNyZWRpdENhcmRGaWVsZHModGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBkbyBzdHVmZiB3aXRoIHRoZSBjcmVkaXQgY2FyZCBmaWVsZHNcbiAgICAgICAgdGhpcy5hY2hGaWVsZHModGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBkbyBzdHVmZiBmb3IgYWNoIHBheW1lbnRzLCBpZiBhcHBsaWNhYmxlIHRvIHRoZSBmb3JtXG4gICAgICAgIHRoaXMudmFsaWRhdGVBbmRTdWJtaXQodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyB2YWxpZGF0ZSBhbmQgc3VibWl0IHRoZSBmb3JtXG4gICAgICB9XG5cbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5jb25maXJtX2Zvcm1fc2VsZWN0b3IpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5zaG93TmV3c2xldHRlclNldHRpbmdzKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTtcbiAgICAgICAgdGhpcy5jb25maXJtTWVzc2FnZVN1Ym1pdCh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIHN1Ym1pdCB0aGUgc3R1ZmYgb24gdGhlIGNvbmZpcm1hdGlvbiBwYWdlXG4gICAgICB9XG5cbiAgICB9LCAvLyBpbml0XG5cbiAgICBkZWJ1ZzogZnVuY3Rpb24obWVzc2FnZSkge1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5kZWJ1ZyA9PT0gdHJ1ZSkge1xuICAgICAgICBpZiAodHlwZW9mIG1lc3NhZ2UgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgY29uc29sZS5sb2cobWVzc2FnZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5kaXIobWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5kaXIodGhpcyk7XG4gICAgICB9XG4gICAgfSwgLy8gZGVidWdcblxuICAgIGFuYWx5dGljc1RyYWNraW5nOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICB2YXIgcHJvZ3Jlc3MgPSAkKG9wdGlvbnMucHJvZ3Jlc3Nfc2VsZWN0b3IpO1xuICAgICAgdmFyIHN0ZXA7XG4gICAgICB2YXIgbmF2X2l0ZW1fY291bnQgPSAwO1xuICAgICAgdmFyIG9wcF9pZCA9ICQob3B0aW9ucy5vcHBfaWRfc2VsZWN0b3IpLnZhbCgpO1xuICAgICAgdmFyIHBvc3RfcHVyY2hhc2UgPSBmYWxzZTtcbiAgICAgIGlmIChwcm9ncmVzcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIG5hdl9pdGVtX2NvdW50ID0gJCgnbGknLCBwcm9ncmVzcykubGVuZ3RoOyAvLyBsZW5ndGggaXMgbm90IHplcm8gYmFzZWRcbiAgICAgICAgc3RlcCA9ICQoJ2xpIC5hY3RpdmUnLCBwcm9ncmVzcykucGFyZW50KCkuaW5kZXgoKSArIDE7IC8vIGluZGV4IGlzIHplcm8gYmFzZWRcbiAgICAgIH1cbiAgICAgIC8vIHRoZXJlIGlzIGEgcHJvZ3Jlc3MgbWVudSwgQU5EIHRoZXJlIElTIE5PVCBhIGNvbmZpcm0gZm9ybSBzZWxlY3RvclxuICAgICAgLy8gaWYgdGhhdCBpcyB0aGUgY2FzZSwgd2UncmUgbm90IG9uIHRoZSBwdXJjaGFzZSBzdGVwXG4gICAgICBpZiAocHJvZ3Jlc3MubGVuZ3RoID4gMCAmJiAkKG9wdGlvbnMuY29uZmlybV9mb3JtX3NlbGVjdG9yKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgLy8gdGhlIGFjdGl2ZSB0YWIgbWF0Y2hlcyB0aGUgY291bnQgb2YgaXRlbXMgQU5EIHRoZXJlIGlzIE5PVCBhIGNvbmZpcm0gZm9ybSB0byBiZSBzdWJtaXR0ZWRcbiAgICAgICAgLy8gdGhhdCBtZWFucyB3ZSdyZSBvbiBhIHBvc3QgcHVyY2hhc2Ugc3RlcC5cbiAgICAgICAgaWYgKHN0ZXAgPT09IG5hdl9pdGVtX2NvdW50ICYmICQob3B0aW9ucy5jb25maXJtX2Zvcm1fc2VsZWN0b3IpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHN0ZXAgPSBzdGVwICsgMTtcbiAgICAgICAgICBwb3N0X3B1cmNoYXNlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChwcm9ncmVzcy5sZW5ndGggPiAwICYmICQob3B0aW9ucy5jb25maXJtX2Zvcm1fc2VsZWN0b3IpLmxlbmd0aCA+IDAgfHwgJChvcHRpb25zLmZpbmlzaF9zZWN0aW9uX3NlbGVjdG9yKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIC8vIHdlIGFyZSBvbiB0aGUgY29uZmlybSBmb3JtIHNlbGVjdG9yIGFuZCB0aGVyZSBpcyBhIHByb2dyZXNzIG1lYXN1cmVcbiAgICAgICAgLy8gT1IsIHdlIGFyZSBvbiB0aGUgZmluaXNoIHNlbGVjdG9yIGFuZCB0aGVyZSBpcyBOT1QgYSBwcm9ncmVzcyBtZWFzdXJlXG4gICAgICAgIC8vIHRoZXNlIG1lYW4gdGhlIHVzZXIganVzdCBwdXJjaGFzZWQuXG4gICAgICAgIHN0ZXAgPSAncHVyY2hhc2UnO1xuICAgICAgfSBlbHNlIGlmIChwcm9ncmVzcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5kZWJ1ZyggJ3N0ZXAgaXMgJyArIHN0ZXAgKyAnIGFuZCBuYXYgaXRlbSBjb3VudCBpcyAnICsgbmF2X2l0ZW1fY291bnQgKyAnIGFuZCBvcHAgaWQgaXMgJyArIG9wcF9pZCArICcgYW5kIHBvc3QgcHVyY2hhc2UgaXMgJyArIHBvc3RfcHVyY2hhc2UgKTtcbiAgICAgIHRoaXMuYW5hbHl0aWNzVHJhY2tpbmdTdGVwKHN0ZXAsIHBvc3RfcHVyY2hhc2UpO1xuICAgIH0sIC8vIGFuYWx5dGljc1RyYWNraW5nXG5cbiAgICBhbmFseXRpY3NUcmFja2luZ1N0ZXA6IGZ1bmN0aW9uKHN0ZXAsIHBvc3RfcHVyY2hhc2UpIHtcbiAgICAgIHZhciBwcm9ncmVzcyA9ICQodGhpcy5vcHRpb25zLnByb2dyZXNzX3NlbGVjdG9yKTtcbiAgICAgIHZhciBhbW91bnQgPSAkKHRoaXMub3B0aW9ucy5vcmlnaW5hbF9hbW91bnRfc2VsZWN0b3IpLnZhbCgpO1xuICAgICAgdmFyIG9wcF9pZCA9ICQodGhpcy5vcHRpb25zLm9wcF9pZF9zZWxlY3RvcikudmFsKCk7XG4gICAgICB2YXIgaW5zdGFsbG1lbnRfcGVyaW9kID0gJ29uZS10aW1lJztcbiAgICAgIHZhciBsZXZlbDtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5pbnN0YWxsbWVudF9wZXJpb2Rfc2VsZWN0b3IpLmxlbmd0aCA+IDAgKSB7XG4gICAgICAgIGluc3RhbGxtZW50X3BlcmlvZCA9ICQodGhpcy5vcHRpb25zLmluc3RhbGxtZW50X3BlcmlvZF9zZWxlY3RvcikudmFsKCk7XG4gICAgICB9XG4gICAgICAvLyBpZiB3ZSdyZSBub3QgYWZ0ZXIgdGhlIHB1cmNoYXNlLCB1c2UgYWRkUHJvZHVjdFxuICAgICAgaWYgKHByb2dyZXNzLmxlbmd0aCA+IDAgJiYgcG9zdF9wdXJjaGFzZSAhPT0gdHJ1ZSkge1xuICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICBhbW91bnQ6IGFtb3VudCxcbiAgICAgICAgICBpbnN0YWxsbWVudF9wZXJpb2Q6IGluc3RhbGxtZW50X3BlcmlvZFxuICAgICAgICB9O1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIHVybDogJy9jYWxjdWxhdGUtbWVtYmVyLWxldmVsLycsXG4gICAgICAgICAgZGF0YTogZGF0YVxuICAgICAgICB9KS5kb25lKGZ1bmN0aW9uKCBkYXRhICkge1xuICAgICAgICAgIGlmICgkKGRhdGEubGV2ZWwpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxldmVsID0gZGF0YS5sZXZlbC5sZXZlbDtcbiAgICAgICAgICAgIHRoYXQuZGVidWcoJ2FkZCBwcm9kdWN0OiBpZCBpcyAnICsgJ21pbm5wb3N0XycgKyBsZXZlbC50b0xvd2VyQ2FzZSgpICsgJ19tZW1iZXJzaGlwJyArICcgYW5kIG5hbWUgaXMgJyArICdNaW5uUG9zdCAnICsgbGV2ZWwuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBsZXZlbC5zbGljZSgxKSArICcgTWVtYmVyc2hpcCcgKyAnIGFuZCB2YXJpYW50IGlzICcgKyBpbnN0YWxsbWVudF9wZXJpb2QuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBpbnN0YWxsbWVudF9wZXJpb2Quc2xpY2UoMSkpO1xuICAgICAgICAgICAgZ2EoJ2VjOmFkZFByb2R1Y3QnLCB7XG4gICAgICAgICAgICAgICdpZCc6ICdtaW5ucG9zdF8nICsgbGV2ZWwudG9Mb3dlckNhc2UoKSArICdfbWVtYmVyc2hpcCcsXG4gICAgICAgICAgICAgICduYW1lJzogJ01pbm5Qb3N0ICcgKyBsZXZlbC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGxldmVsLnNsaWNlKDEpICsgJyBNZW1iZXJzaGlwJyxcbiAgICAgICAgICAgICAgJ2NhdGVnb3J5JzogJ0RvbmF0aW9uJyxcbiAgICAgICAgICAgICAgJ2JyYW5kJzogJ01pbm5Qb3N0JyxcbiAgICAgICAgICAgICAgJ3ZhcmlhbnQnOiBpbnN0YWxsbWVudF9wZXJpb2QuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBpbnN0YWxsbWVudF9wZXJpb2Quc2xpY2UoMSksXG4gICAgICAgICAgICAgICdwcmljZSc6IGFtb3VudCxcbiAgICAgICAgICAgICAgJ3F1YW50aXR5JzogMVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0ZXAgPT09ICdwdXJjaGFzZScpIHtcbiAgICAgICAgdGhpcy5kZWJ1ZygnYWRkIGEgcHVyY2hhc2UgYWN0aW9uLiBzdGVwIGlzICcgKyBzdGVwKTtcbiAgICAgICAgZ2EoJ2VjOnNldEFjdGlvbicsIHN0ZXAse1xuICAgICAgICAgICdpZCc6IG9wcF9pZCwgLy8gVHJhbnNhY3Rpb24gaWQgLSBUeXBlOiBzdHJpbmdcbiAgICAgICAgICAnYWZmaWxpYXRpb24nOiAnTWlublBvc3QnLCAvLyBTdG9yZSBuYW1lIC0gVHlwZTogc3RyaW5nXG4gICAgICAgICAgJ3JldmVudWUnOiBhbW91bnQsIC8vIFRvdGFsIFJldmVudWUgLSBUeXBlOiBudW1lcmljXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5kZWJ1ZygnYWRkIGEgY2hlY2tvdXQgYWN0aW9uLiBzdGVwIGlzICcgKyBzdGVwKTtcbiAgICAgICAgZ2EoJ2VjOnNldEFjdGlvbicsJ2NoZWNrb3V0Jywge1xuICAgICAgICAgICdzdGVwJzogc3RlcCwgLy8gQSB2YWx1ZSBvZiAxIGluZGljYXRlcyBmaXJzdCBjaGVja291dCBzdGVwLiBWYWx1ZSBvZiAyIGluZGljYXRlcyBzZWNvbmQgY2hlY2tvdXQgc3RlcFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgZ2EoJ3NldCcsIHtcbiAgICAgICAgcGFnZTogd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLFxuICAgICAgICB0aXRsZTogZG9jdW1lbnQudGl0bGVcbiAgICAgIH0pO1xuICAgICAgZ2EoJ3NlbmQnLCAncGFnZXZpZXcnLCB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUpO1xuXG4gICAgfSwgLy8gYW5hbHl0aWNzVHJhY2tpbmdTdGVwXG5cbiAgICBhbW91bnRBc1JhZGlvOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICAvLyB3aGVuIGFtb3VudCBmaWVsZCBpcyBhIHJhZGlvIGJ1dHRvbiwgd2UgbmVlZCB0byBjaGVjayBpdCB3aGVuZXZlciBpdCBjaGFuZ2VzXG4gICAgICAkKG9wdGlvbnMub3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICgkKHRoaXMpLmlzKCc6cmFkaW8nKSkge1xuICAgICAgICAgICAgb3B0aW9ucy5vcmlnaW5hbF9hbW91bnQgPSBwYXJzZUludCgkKG9wdGlvbnMub3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yICsgJzpjaGVja2VkJywgZWxlbWVudCkudmFsKCksIDEwKTtcbiAgICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LCAvLyBhbW91bnRBc1JhZGlvXG5cbiAgICBhbW91bnRVcGRhdGVkOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICAvLyB3aGVuIG5ldyBhbW91bnQgdGV4dCBmaWVsZCBjYW4gY2hhbmdlLCB3ZSBuZWVkIHRvIGNoYW5nZSB0aGUgaGlkZGVuIGZpZWxkXG4gICAgICAvLyB0aGVyZSBpcyBhbHNvIHBvdGVudGlhbGx5IGFuIGFkZGl0aW9uYWwgYW1vdW50IGZpZWxkIHZhbHVlIHRvIGFkZFxuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdmFyIHBheW1lbnRfdHlwZSA9ICQob3B0aW9ucy5jaG9vc2VfcGF5bWVudCArICcgaW5wdXQnKS52YWwoKTtcblxuICAgICAgLy8gc2V0IHRoZSBmYWlyIG1hcmtldCB2YWx1ZSBpZiBhcHBsaWNhYmxlXG4gICAgICB2YXIgYW1vdW50X3NlbGVjdG9yX2ZhaXJfbWFya2V0ID0gJChvcHRpb25zLm9yaWdpbmFsX2Ftb3VudF9zZWxlY3RvciwgZWxlbWVudCk7XG4gICAgICBpZiAoYW1vdW50X3NlbGVjdG9yX2ZhaXJfbWFya2V0LmlzKCc6cmFkaW8nKSkge1xuICAgICAgICBhbW91bnRfc2VsZWN0b3JfZmFpcl9tYXJrZXQgPSAkKG9wdGlvbnMub3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yICsgJzpjaGVja2VkJywgZWxlbWVudCk7XG4gICAgICB9XG4gICAgICB0aGF0LnNldEZhaXJNYXJrZXRWYWx1ZShhbW91bnRfc2VsZWN0b3JfZmFpcl9tYXJrZXQpO1xuXG4gICAgICAkKG9wdGlvbnMub3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoYXQub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQgPSBwYXJzZUludCgkKHRoaXMsIGVsZW1lbnQpLnZhbCgpLCAxMCk7XG4gICAgICAgIGlmICggcGF5bWVudF90eXBlID09PSAnYmFua19hY2NvdW50JyApIHtcbiAgICAgICAgICB0aGF0LmNhbGN1bGF0ZUZlZXModGhhdC5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCwgJ2JhbmtfYWNjb3VudCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoYXQuY2FsY3VsYXRlRmVlcyh0aGF0Lm9wdGlvbnMub3JpZ2luYWxfYW1vdW50LCAnY2FyZCcpO1xuICAgICAgICB9XG4gICAgICAgIHRoYXQuc2V0RmFpck1hcmtldFZhbHVlKCQodGhpcywgZWxlbWVudCkpO1xuICAgICAgfSk7XG4gICAgICAkKG9wdGlvbnMuYWRkaXRpb25hbF9hbW91bnRfZmllbGQsIGVsZW1lbnQpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgdGhhdC5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCA9IHBhcnNlSW50KCQob3B0aW9ucy5vcmlnaW5hbF9hbW91bnRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLCAxMCk7XG4gICAgICAgIGlmICggcGF5bWVudF90eXBlID09PSAnYmFua19hY2NvdW50JyApIHtcbiAgICAgICAgICB0aGF0LmNhbGN1bGF0ZUZlZXModGhhdC5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCwgJ2JhbmtfYWNjb3VudCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoYXQuY2FsY3VsYXRlRmVlcyh0aGF0Lm9wdGlvbnMub3JpZ2luYWxfYW1vdW50LCAnY2FyZCcpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIH0sIC8vIGFtb3VudFVwZGF0ZWRcblxuICAgIHNldEZhaXJNYXJrZXRWYWx1ZTogZnVuY3Rpb24oYW1vdW50X3NlbGVjdG9yKSB7XG4gICAgICAvLyBpZiB0aGVyZSBpcyBhIGZhaXIgbWFya2V0IHZhbHVlIGZpZWxkLCBjaGVjayBhbmQgc2VlIGlmIHdlIGNhbiBwb3B1bGF0ZSBpdFxuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmZhaXJfbWFya2V0X3ZhbHVlX3NlbGVjdG9yKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHZhciBmYWlyTWFya2V0VmFsdWUgPSBhbW91bnRfc2VsZWN0b3IuZGF0YSgnZmFpci1tYXJrZXQtdmFsdWUnKTtcbiAgICAgICAgJCh0aGlzLm9wdGlvbnMuZmFpcl9tYXJrZXRfdmFsdWVfc2VsZWN0b3IpLnZhbChmYWlyTWFya2V0VmFsdWUpO1xuICAgICAgfVxuICAgIH0sIC8vIHNldEZhaXJNYXJrZXRWYWx1ZVxuXG4gICAgY2FsY3VsYXRlRmVlczogZnVuY3Rpb24oYW1vdW50LCBzdHJpcGVfcGF5bWVudF90eXBlKSB7XG4gICAgICAvLyB0aGlzIHNlbmRzIHRoZSBhbW91bnQgYW5kIHN0cmlwZSBwYXltZW50IHR5cGUgdG8gcHl0aG9uOyBnZXQgdGhlIGZlZSBhbmQgZGlzcGxheSBpdCB0byB0aGUgdXNlciBvbiB0aGUgY2hlY2tib3ggbGFiZWxcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHZhciB0b3RhbF9hbW91bnQgPSBhbW91bnQ7XG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuYWRkaXRpb25hbF9hbW91bnRfZmllbGQpLmxlbmd0aCA+IDAgJiYgJCh0aGlzLm9wdGlvbnMuYWRkaXRpb25hbF9hbW91bnRfZmllbGQpLnZhbCgpID4gMCkge1xuICAgICAgICB2YXIgYWRkaXRpb25hbF9hbW91bnQgPSAkKHRoaXMub3B0aW9ucy5hZGRpdGlvbmFsX2Ftb3VudF9maWVsZCkudmFsKCk7XG4gICAgICAgIHRvdGFsX2Ftb3VudCA9IHBhcnNlSW50KGFkZGl0aW9uYWxfYW1vdW50LCAxMCkgKyBwYXJzZUludChhbW91bnQsIDEwKTtcbiAgICAgIH1cbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICBhbW91bnQ6IHRvdGFsX2Ftb3VudCxcbiAgICAgICAgc3RyaXBlX3BheW1lbnRfdHlwZTogc3RyaXBlX3BheW1lbnRfdHlwZVxuICAgICAgfTtcbiAgICAgIHRoYXQuc2V0U3RyaXBlUGF5bWVudFR5cGUoc3RyaXBlX3BheW1lbnRfdHlwZSk7XG4gICAgICAkLmFqYXgoe1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgdXJsOiAnL2NhbGN1bGF0ZS1mZWVzLycsXG4gICAgICAgIGRhdGE6IGRhdGFcbiAgICAgIH0pLmRvbmUoZnVuY3Rpb24oIGRhdGEgKSB7XG4gICAgICAgIGlmICgkKGRhdGEuZmVlcykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICQodGhhdC5vcHRpb25zLmZlZV9hbW91bnQpLnRleHQocGFyc2VGbG9hdChkYXRhLmZlZXMpLnRvRml4ZWQoMikpO1xuICAgICAgICAgIHRoYXQuY3JlZGl0Q2FyZEZlZUNoZWNrYm94KCQodGhhdC5vcHRpb25zLnBheV9jY19wcm9jZXNzaW5nX3NlbGVjdG9yKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sIC8vIGNhbGN1bGF0ZUZlZXNcblxuICAgIGNyZWRpdENhcmRQcm9jZXNzaW5nRmVlczogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgLy8gdGhpcyBhZGRzIG9yIHN1YnRyYWN0cyB0aGUgZmVlIHRvIHRoZSBvcmlnaW5hbCBhbW91bnQgd2hlbiB0aGUgdXNlciBpbmRpY2F0ZXMgdGhleSBkbyBvciBkbyBub3Qgd2FudCB0byBwYXkgdGhlIGZlZXNcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHRoYXQuY3JlZGl0Q2FyZEZlZUNoZWNrYm94KCQob3B0aW9ucy5wYXlfY2NfcHJvY2Vzc2luZ19zZWxlY3RvcikpO1xuICAgICAgJChvcHRpb25zLnBheV9jY19wcm9jZXNzaW5nX3NlbGVjdG9yKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHRoYXQuY3JlZGl0Q2FyZEZlZUNoZWNrYm94KHRoaXMpO1xuICAgICAgfSk7XG4gICAgfSwgLy8gY3JlZGl0Q2FyZFByb2Nlc3NpbmdGZWVzXG5cbiAgICBzZXRTdHJpcGVQYXltZW50VHlwZTogZnVuY3Rpb24oc3RyaXBlX3BheW1lbnRfdHlwZSkge1xuICAgICAgaWYgKCQoJ2lucHV0W25hbWU9XCJzdHJpcGVfcGF5bWVudF90eXBlXCJdJykubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICQodGhpcy5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5hcHBlbmQoJzxpbnB1dCB0eXBlPVxcXCJoaWRkZW5cXFwiIG5hbWU9XFxcInN0cmlwZV9wYXltZW50X3R5cGVcXFwiPicpO1xuICAgICAgfVxuICAgICAgJCgnaW5wdXRbbmFtZT1cInN0cmlwZV9wYXltZW50X3R5cGVcIl0nKS52YWwoc3RyaXBlX3BheW1lbnRfdHlwZSk7XG4gICAgfSwgLy8gc2V0U3RyaXBlUGF5bWVudFR5cGVcblxuICAgIGNyZWRpdENhcmRGZWVDaGVja2JveDogZnVuY3Rpb24oZmllbGQpIHtcbiAgICAgIHZhciBmdWxsX2Ftb3VudDtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIGlmICgkKGZpZWxkKS5pcygnOmNoZWNrZWQnKSB8fCAkKGZpZWxkKS5wcm9wKCdjaGVja2VkJykpIHtcbiAgICAgICAgJCgnLmFtb3VudCAubGV2ZWwtYW1vdW50JykuYWRkQ2xhc3MoJ2Z1bGwtYW1vdW50Jyk7XG4gICAgICAgIGZ1bGxfYW1vdW50ID0gKHRoYXQub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQgKyBwYXJzZUZsb2F0KCQodGhhdC5vcHRpb25zLmZlZV9hbW91bnQpLnRleHQoKSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZnVsbF9hbW91bnQgPSB0aGF0Lm9wdGlvbnMub3JpZ2luYWxfYW1vdW50O1xuICAgICAgfVxuICAgICAgJCh0aGF0Lm9wdGlvbnMuZnVsbF9hbW91bnRfc2VsZWN0b3IpLnRleHQocGFyc2VGbG9hdChmdWxsX2Ftb3VudCkudG9GaXhlZCgyKSk7XG4gICAgfSwgLy8gY3JlZGl0Q2FyZEZlZUNoZWNrYm94XG5cbiAgICBkb25hdGVBbm9ueW1vdXNseTogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdGhhdC50b2dnbGVBbm9ueW1vdXMoJChvcHRpb25zLmFub255bW91c19zZWxlY3RvciwgZWxlbWVudCkpO1xuICAgICAgJChvcHRpb25zLmFub255bW91c19zZWxlY3RvciwgZWxlbWVudCkuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGF0LnRvZ2dsZUFub255bW91cygkKHRoaXMpKTtcbiAgICAgIH0pO1xuICAgIH0sIC8vIGRvbmF0ZUFub255bW91c2x5XG5cbiAgICB0b2dnbGVBbm9ueW1vdXM6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICAgIGlmIChlbGVtZW50LmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgICQodGhpcy5vcHRpb25zLm5hbWVfc2VsZWN0b3IgKyAnIGRpdjpmaXJzdCcsIHRoaXMuZWxlbWVudCkuaGlkZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJCh0aGlzLm9wdGlvbnMubmFtZV9zZWxlY3RvciArICcgZGl2OmZpcnN0JywgdGhpcy5lbGVtZW50KS5zaG93KCk7XG4gICAgICB9XG4gICAgfSwgLy8gdG9nZ2xlQW5vbnltb3VzXG5cbiAgICBob25vck9yTWVtb3J5OiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICBpZiAoJChvcHRpb25zLmhvbm9yX29yX21lbW9yeV9jaG9vc2VyICsgJzpjaGVja2VkJykudmFsKCkpIHtcbiAgICAgICAgJChvcHRpb25zLmhvbm9yX21lbW9yeV9pbnB1dF9ncm91cCwgZWxlbWVudCkuc2hvdygpO1xuICAgICAgICAkKG9wdGlvbnMuaG9ub3JfdHlwZV9zZWxlY3RvcikudGV4dCgkKG9wdGlvbnMuaG9ub3Jfb3JfbWVtb3J5X2Nob29zZXIgKyAnOmNoZWNrZWQnKS52YWwoKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkKG9wdGlvbnMuaG9ub3JfbWVtb3J5X2lucHV0X2dyb3VwLCBlbGVtZW50KS5oaWRlKCk7XG4gICAgICAgICQob3B0aW9ucy5ob25vcl9uYW1lX3NlbGVjdG9yICsgJyBpbnB1dCcsIGVsZW1lbnQpLnZhbCgnJyk7XG4gICAgICB9XG4gICAgfSwgLy8gaG9ub3JPck1lbW9yeVxuXG4gICAgaG9ub3JPck1lbW9yeVRvZ2dsZTogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdGhhdC5ob25vck9yTWVtb3J5KHRoYXQuZWxlbWVudCwgdGhhdC5vcHRpb25zKTtcbiAgICAgICQob3B0aW9ucy5ob25vcl9vcl9tZW1vcnlfY2hvb3NlciwgZWxlbWVudCkuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGF0Lmhvbm9yT3JNZW1vcnkodGhhdC5lbGVtZW50LCB0aGF0Lm9wdGlvbnMpO1xuICAgICAgfSk7XG4gICAgfSwgLy8gaG9ub3JPck1lbW9yeVRvZ2dsZVxuXG4gICAgb3V0c2lkZVVuaXRlZFN0YXRlczogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgJChvcHRpb25zLnNob3dfYmlsbGluZ19jb3VudHJ5X3NlbGVjdG9yKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgJChvcHRpb25zLmJpbGxpbmdfY291bnRyeV9zZWxlY3Rvcikuc2hvdygpO1xuICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmhpZGUoKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSk7XG4gICAgICAkKG9wdGlvbnMuc2hvd19zaGlwcGluZ19jb3VudHJ5X3NlbGVjdG9yKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgJChvcHRpb25zLnNoaXBwaW5nX2NvdW50cnlfc2VsZWN0b3IpLnNob3coKTtcbiAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5oaWRlKCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuICAgIH0sIC8vIG91dHNpZGVVbml0ZWRTdGF0ZXNcblxuICAgIHNoaXBwaW5nQWRkcmVzczogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdmFyIHNob3dfc2hpcHBpbmcgPSBmYWxzZTtcbiAgICAgIGlmICgkKG9wdGlvbnMudXNlX2Zvcl9zaGlwcGluZ19zZWxlY3RvcikubGVuZ3RoID4gMCkgeyAvLyB3ZSBoYXZlIGEgc2hpcHBpbmcgY2hlY2tib3hcbiAgICAgICAgc2hvd19zaGlwcGluZyA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZiAoc2hvd19zaGlwcGluZyA9PT0gdHJ1ZSApIHtcbiAgICAgICAgJChvcHRpb25zLnVzZV9mb3Jfc2hpcHBpbmdfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpLnNob3coKTtcbiAgICAgICAgaWYgKCQob3B0aW9ucy51c2VfZm9yX3NoaXBwaW5nX3NlbGVjdG9yLCBlbGVtZW50KS5pcygnOmNoZWNrZWQnKSkgeyAvLyB1c2Ugc2FtZSBhcyBiaWxsaW5nXG4gICAgICAgICAgJChvcHRpb25zLnNoaXBwaW5nX3NlbGVjdG9yKS5oaWRlKCk7XG4gICAgICAgIH0gZWxzZSB7IC8vIHNlcGFyYXRlIHNoaXBwaW5nIGFuZCBiaWxsaW5nXG4gICAgICAgICAgJChvcHRpb25zLnNoaXBwaW5nX3NlbGVjdG9yKS5zaG93KCk7XG4gICAgICAgIH1cbiAgICAgICAgJChvcHRpb25zLnVzZV9mb3Jfc2hpcHBpbmdfc2VsZWN0b3IsIGVsZW1lbnQpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgICB0aGF0LnNoaXBwaW5nQWRkcmVzcyhlbGVtZW50LCBvcHRpb25zKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBcbiAgICB9LCAvLyBzaGlwcGluZ0FkZHJlc3NcblxuICAgIGFsbG93TWlubnBvc3RBY2NvdW50OiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB2YXIgYWNjb3VudF9leGlzdHMgPSBmYWxzZTtcblxuICAgICAgLy8gc2hvdyBwYXNzd29yZCBhcyB0ZXh0XG4gICAgICB0aGF0LnNob3dQYXNzd29yZCgpO1xuXG4gICAgICAvLyBjYWxjdWxhdGUgcGFzc3dvcmQgc3RyZW5ndGhcbiAgICAgIHRoYXQuc2hvd1Bhc3N3b3JkU3RyZW5ndGgoKTtcbiAgICAgIFxuICAgICAgdGhhdC5zcGFtRW1haWwoJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KSk7XG4gICAgICAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgdGhhdC5zcGFtRW1haWwoJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KSk7XG4gICAgICB9KTtcblxuICAgICAgdGhhdC50b2dnbGVBY2NvdW50RmllbGRzKCQob3B0aW9ucy5jcmVhdGVfbXBfc2VsZWN0b3IsIGVsZW1lbnQpKTtcbiAgICAgICQob3B0aW9ucy5jcmVhdGVfbXBfc2VsZWN0b3IsIGVsZW1lbnQpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgdGhhdC50b2dnbGVBY2NvdW50RmllbGRzKCQob3B0aW9ucy5jcmVhdGVfbXBfc2VsZWN0b3IsIGVsZW1lbnQpKTtcbiAgICAgIH0pO1xuXG4gICAgICBmdW5jdGlvbiBkb25lVHlwaW5nICgpIHtcbiAgICAgICAgdmFyIGVtYWlsID0gJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKTtcbiAgICAgICAgYWNjb3VudF9leGlzdHMgPSB0aGF0LmNoZWNrTWlubnBvc3RBY2NvdW50KGVsZW1lbnQsIG9wdGlvbnMsIGVtYWlsKTtcbiAgICAgIH1cblxuICAgICAgLy9zZXR1cCBiZWZvcmUgZnVuY3Rpb25zXG4gICAgICB2YXIgdHlwaW5nVGltZXI7ICAgICAgICAgICAgICAgIC8vdGltZXIgaWRlbnRpZmllclxuICAgICAgdmFyIGRvbmVUeXBpbmdJbnRlcnZhbCA9IDUwMDA7ICAvL3RpbWUgaW4gbXMsIDUgc2Vjb25kIGZvciBleGFtcGxlXG5cbiAgICAgIC8vb24ga2V5dXAsIHN0YXJ0IHRoZSBjb3VudGRvd25cbiAgICAgICQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkua2V5dXAoZnVuY3Rpb24oKXtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHR5cGluZ1RpbWVyKTtcbiAgICAgICAgaWYgKCQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKSB7XG4gICAgICAgICAgdHlwaW5nVGltZXIgPSBzZXRUaW1lb3V0KGRvbmVUeXBpbmcsIGRvbmVUeXBpbmdJbnRlcnZhbCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sIC8vIGFsbG93TWlubnBvc3RBY2NvdW50XG5cbiAgICBzcGFtRW1haWw6IGZ1bmN0aW9uKGVtYWlsX2ZpZWxkKSB7XG4gICAgICB2YXIgc3BhbUVycm9yQ29udGFpbmVyID0gZW1haWxfZmllbGQucGFyZW50KCk7XG4gICAgICBpZiAoJCgnLmEtc3BhbS1lbWFpbCcsIHNwYW1FcnJvckNvbnRhaW5lcikubGVuZ3RoID09PSAwICkge1xuICAgICAgICBzcGFtRXJyb3JDb250YWluZXIuYXBwZW5kKCc8cCBjbGFzcz1cImEtZm9ybS1jYXB0aW9uIGEtZXJyb3IgYS1zcGFtLWVtYWlsXCI+VGhpcyBlbWFpbCBhZGRyZXNzIGhhcyBiZWVuIGRldGVjdGVkIGFzIGEgc3BhbW1lci48L3A+Jyk7XG4gICAgICB9XG4gICAgICAkKCcuYS1zcGFtLWVtYWlsJywgc3BhbUVycm9yQ29udGFpbmVyKS5oaWRlKCk7XG4gICAgICBzcGFtRXJyb3JDb250YWluZXIucmVtb3ZlQ2xhc3MoJ2ludmFsaWQgYS1lcnJvcicpO1xuICAgIH0sIC8vIHNwYW1FbWFpbFxuXG4gICAgdG9nZ2xlQWNjb3VudEZpZWxkczogZnVuY3Rpb24oY3JlYXRlX2FjY291bnRfc2VsZWN0b3IpIHtcbiAgICAgIGlmIChjcmVhdGVfYWNjb3VudF9zZWxlY3Rvci5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICBjcmVhdGVfYWNjb3VudF9zZWxlY3Rvci5wYXJlbnQoKS5iZWZvcmUoJzxwIGNsYXNzPVwiYS1mb3JtLWNhcHRpb24gYS1hY2NvdW50LWV4aXN0cyBhLWFjY291bnQtZXhpc3RzLXN1Y2Nlc3NcIj5UaGVyZSBpcyBhbHJlYWR5IGEgTWlublBvc3QuY29tIGFjY291bnQgd2l0aCB0aGlzIGVtYWlsIGFkZHJlc3MuPC9wPicpO1xuICAgICAgICAkKCcuYS1hY2NvdW50LWV4aXN0cycpLmhpZGUoKTtcbiAgICAgICAgJCh0aGlzLm9wdGlvbnMucGFzc3dvcmRfc2VsZWN0b3IsIHRoaXMuZWxlbWVudCkuc2hvdygpO1xuICAgICAgICB0aGlzLm9wdGlvbnMuY3JlYXRlX2FjY291bnQgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJCh0aGlzLm9wdGlvbnMucGFzc3dvcmRfc2VsZWN0b3IsIHRoaXMuZWxlbWVudCkuaGlkZSgpO1xuICAgICAgfVxuICAgIH0sIC8vIHRvZ2dsZUFjY291bnRGaWVsZHNcblxuICAgIHNob3dQYXNzd29yZDogZnVuY3Rpb24oKSB7XG4gICAgICAvLyBDYWNoZSBvdXIganF1ZXJ5IGVsZW1lbnRzXG4gICAgICB2YXIgJHN1Ym1pdCA9ICQoJy5idG4tc3VibWl0Jyk7XG4gICAgICB2YXIgJGNvbnRhaW5lciA9ICQodGhpcy5vcHRpb25zLnBhc3N3b3JkX3NlbGVjdG9yLCB0aGlzLmVsZW1lbnQpO1xuICAgICAgdmFyICRmaWVsZCA9ICQoJ2lucHV0W25hbWU9XCJwYXNzd29yZFwiXScsICRjb250YWluZXIpO1xuICAgICAgJCgnLmEtYWNjb3VudC1leGlzdHMnKS5oaWRlKCk7XG4gICAgICB2YXIgc2hvd19wYXNzID0gJzxkaXYgY2xhc3M9XCJhLWZvcm0tc2hvdy1wYXNzd29yZCBhLWZvcm0tY2FwdGlvblwiPjxsYWJlbD48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgbmFtZT1cInNob3dfcGFzc3dvcmRcIiBpZD1cInNob3ctcGFzc3dvcmQtY2hlY2tib3hcIiB2YWx1ZT1cIjFcIj4gU2hvdyBwYXNzd29yZDwvbGFiZWw+PC9kaXY+JztcbiAgICAgIC8vIEluamVjdCB0aGUgdG9nZ2xlIGJ1dHRvbiBpbnRvIHRoZSBwYWdlXG4gICAgICAkY29udGFpbmVyLmFwcGVuZCggc2hvd19wYXNzICk7XG4gICAgICAvLyBDYWNoZSB0aGUgdG9nZ2xlIGJ1dHRvblxuICAgICAgdmFyICR0b2dnbGUgPSAkKCcjc2hvdy1wYXNzd29yZC1jaGVja2JveCcpO1xuICAgICAgLy8gVG9nZ2xlIHRoZSBmaWVsZCB0eXBlXG4gICAgICAkdG9nZ2xlLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgdmFyIGNoZWNrYm94ID0gJCh0aGlzKTtcbiAgICAgICAgaWYgKGNoZWNrYm94LmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgICAgJGZpZWxkLmF0dHIoJ3R5cGUnLCAndGV4dCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICRmaWVsZC5hdHRyKCd0eXBlJywgJ3Bhc3N3b3JkJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgLy8gU2V0IHRoZSBmb3JtIGZpZWxkIGJhY2sgdG8gYSByZWd1bGFyIHBhc3N3b3JkIGVsZW1lbnRcbiAgICAgICRzdWJtaXQub24oICdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgJGZpZWxkLmF0dHIoJ3R5cGUnLCAncGFzc3dvcmQnKTtcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBzaG93UGFzc3dvcmRTdHJlbmd0aDogZnVuY3Rpb24oKSB7XG4gICAgICAvLyBjaGVja1Bhc3N3b3JkU3RyZW5ndGhcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIGlmICgkKCcuYS1wYXNzd29yZC1zdHJlbmd0aCcpLmxlbmd0aCA+IDAgKSB7XG4gICAgICAgIHZhciAkYmVmb3JlID0gJCgnLmEtZm9ybS1zaG93LXBhc3N3b3JkJyk7XG4gICAgICAgICRiZWZvcmUuYWZ0ZXIoICQoJzxkaXYgY2xhc3M9XCJhLXBhc3N3b3JkLXN0cmVuZ3RoXCI+PG1ldGVyIG1heD1cIjRcIiBpZD1cInBhc3N3b3JkLXN0cmVuZ3RoXCI+PGRpdj48L2Rpdj48L21ldGVyPjxwIGNsYXNzPVwiYS1mb3JtLWNhcHRpb25cIiBpZD1cInBhc3N3b3JkLXN0cmVuZ3RoLXRleHRcIj48L3A+PC9kaXY+JykpO1xuICAgICAgICAkKCAnYm9keScgKS5vbiggJ2tleXVwJywgJ2lucHV0W25hbWU9cGFzc3dvcmRdJyxcbiAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoYXQuY2hlY2tQYXNzd29yZFN0cmVuZ3RoKFxuICAgICAgICAgICAgICAkKCdpbnB1dFtuYW1lPXBhc3N3b3JkXScpLCAvLyBQYXNzd29yZCBmaWVsZFxuICAgICAgICAgICAgICAkKCcjcGFzc3dvcmQtc3RyZW5ndGgnKSwgICAgICAgICAgIC8vIFN0cmVuZ3RoIG1ldGVyXG4gICAgICAgICAgICAgICQoJyNwYXNzd29yZC1zdHJlbmd0aC10ZXh0JykgICAgICAvLyBTdHJlbmd0aCB0ZXh0IGluZGljYXRvclxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSwgLy8gc2hvd1Bhc3N3b3JkU3RyZW5ndGhcblxuICAgIGNoZWNrUGFzc3dvcmRTdHJlbmd0aDogZnVuY3Rpb24oICRwYXNzd29yZCwgJHN0cmVuZ3RoTWV0ZXIsICRzdHJlbmd0aFRleHQgKSB7XG4gICAgICB2YXIgcGFzc3dvcmQgPSAkcGFzc3dvcmQudmFsKCk7XG4gICAgICAvLyBHZXQgdGhlIHBhc3N3b3JkIHN0cmVuZ3RoXG4gICAgICB2YXIgcmVzdWx0ID0genhjdmJuKHBhc3N3b3JkKTtcbiAgICAgIHZhciBzdHJlbmd0aCA9IHJlc3VsdC5zY29yZTtcblxuICAgICAgJHN0cmVuZ3RoVGV4dC5yZW1vdmVDbGFzcyggJ3Nob3J0IGJhZCBnb29kIHN0cm9uZycgKTtcblxuICAgICAgLy8gQWRkIHRoZSBzdHJlbmd0aCBtZXRlciByZXN1bHRzXG4gICAgICBzd2l0Y2ggKCBzdHJlbmd0aCApIHtcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICRzdHJlbmd0aFRleHQuYWRkQ2xhc3MoICdiYWQnICkuaHRtbCggJ1N0cmVuZ3RoOiA8c3Ryb25nPldlYWs8L3N0cm9uZz4nICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAkc3RyZW5ndGhUZXh0LmFkZENsYXNzKCAnZ29vZCcgKS5odG1sKCAnU3RyZW5ndGg6IDxzdHJvbmc+TWVkaXVtPC9zdHJvbmc+JyApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgJHN0cmVuZ3RoVGV4dC5hZGRDbGFzcyggJ3N0cm9uZycgKS5odG1sKCAnU3RyZW5ndGg6IDxzdHJvbmc+U3Ryb25nPC9zdHJvbmc+JyApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgJHN0cmVuZ3RoVGV4dC5hZGRDbGFzcyggJ3Nob3J0JyApLmh0bWwoICdTdHJlbmd0aDogPHN0cm9uZz5WZXJ5IHdlYWs8L3N0cm9uZz4nICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgJHN0cmVuZ3RoVGV4dC5hZGRDbGFzcyggJ3Nob3J0JyApLmh0bWwoICdTdHJlbmd0aDogPHN0cm9uZz5WZXJ5IHdlYWs8L3N0cm9uZz4nICk7XG4gICAgICB9XG4gICAgICAkc3RyZW5ndGhNZXRlci52YWwoc3RyZW5ndGgpO1xuICAgICAgcmV0dXJuIHN0cmVuZ3RoO1xuICAgIH0sIC8vIGNoZWNrUGFzc3dvcmRTdHJlbmd0aFxuXG4gICAgY2hlY2tNaW5ucG9zdEFjY291bnQ6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMsIGVtYWlsKSB7XG4gICAgICB2YXIgdXNlciA9IHtcbiAgICAgICAgZW1haWw6IGVtYWlsXG4gICAgICB9O1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgJC5hamF4KHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgdXJsOiBvcHRpb25zLm1pbm5wb3N0X3Jvb3QgKyAnL3dwLWpzb24vdXNlci1hY2NvdW50LW1hbmFnZW1lbnQvdjEvY2hlY2stYWNjb3VudCcsXG4gICAgICAgIGRhdGE6IHVzZXJcbiAgICAgIH0pLmRvbmUoZnVuY3Rpb24oIHJlc3VsdCApIHtcbiAgICAgICAgaWYgKHJlc3VsdC5zdGF0dXMgPT09ICdzdWNjZXNzJyAmJiByZXN1bHQucmVhc29uID09PSAndXNlciBleGlzdHMnKSB7IC8vIHVzZXIgZXhpc3RzXG4gICAgICAgICAgaWYgKCQob3B0aW9ucy5jcmVhdGVfbXBfc2VsZWN0b3IsIGVsZW1lbnQpLmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgICAgICAkKG9wdGlvbnMucGFzc3dvcmRfc2VsZWN0b3IsIGVsZW1lbnQpLmhpZGUoKTtcbiAgICAgICAgICAgICQob3B0aW9ucy5jcmVhdGVfbXBfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpLmhpZGUoKTtcbiAgICAgICAgICAgICQoJy5hLWFjY291bnQtZXhpc3RzJywgZWxlbWVudCkuc2hvdygpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KS5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgICAgICAgJChvcHRpb25zLnBhc3N3b3JkX3NlbGVjdG9yLCBlbGVtZW50KS5oaWRlKCk7XG4gICAgICAgICAgICAgICQob3B0aW9ucy5jcmVhdGVfbXBfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpLmhpZGUoKTtcbiAgICAgICAgICAgICAgJCgnLmEtYWNjb3VudC1leGlzdHMnLCBlbGVtZW50KS5zaG93KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoIHJlc3VsdC5zdGF0dXMgPT09ICdzcGFtJyApIHtcbiAgICAgICAgICAkKHRoYXQub3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvcikuYWRkQ2xhc3MoJ2ludmFsaWQgYS1lcnJvcicpO1xuICAgICAgICAgICQoICcuYS1zcGFtLWVtYWlsJykuc2hvdygpO1xuICAgICAgICB9IGVsc2UgeyAvLyB1c2VyIGRvZXMgbm90IGV4aXN0IG9yIGFqYXggY2FsbCBmYWlsZWRcbiAgICAgICAgICBpZiAoJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgICAgICQob3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgZWxlbWVudCkuc2hvdygpO1xuICAgICAgICAgICAgb3B0aW9ucy5jcmVhdGVfYWNjb3VudCA9IHRydWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQob3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgZWxlbWVudCkuaGlkZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAkKCcuYS1hY2NvdW50LWV4aXN0cycsIGVsZW1lbnQpLmhpZGUoKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sIC8vIGNoZWNrTWlubnBvc3RBY2NvdW50XG5cbiAgICBjaG9vc2VQYXltZW50TWV0aG9kOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG5cbiAgICAgIHZhciB0aGF0ID0gdGhpcztcblxuICAgICAgaWYgKCQob3B0aW9ucy5jaG9vc2VfcGF5bWVudCkubGVuZ3RoID4gMCkge1xuICAgICAgICBpZiAoJChvcHRpb25zLmNob29zZV9wYXltZW50ICsgJyBpbnB1dCcpLmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgICAgdmFyIGNoZWNrZWQgPSAkKG9wdGlvbnMuY2hvb3NlX3BheW1lbnQgKyAnIGlucHV0OmNoZWNrZWQnKS5hdHRyKCdpZCcpO1xuICAgICAgICAgIHZhciBjaGVja2VkX3ZhbHVlID0gJChvcHRpb25zLmNob29zZV9wYXltZW50ICsgJyBpbnB1dDpjaGVja2VkJykudmFsKCk7XG4gICAgICAgICAgdGhhdC5zZXR1cFBheW1lbnRNZXRob2QoY2hlY2tlZCwgY2hlY2tlZF92YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICAkKG9wdGlvbnMuY2hvb3NlX3BheW1lbnQgKyAnIGlucHV0JykuY2hhbmdlKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIHRoYXQuc2V0dXBQYXltZW50TWV0aG9kKHRoaXMuaWQsIHRoaXMudmFsdWUpO1xuXG4gICAgICAgICAgaWYgKCB0aGlzLnZhbHVlID09PSAnYmFua19hY2NvdW50JyApIHtcbiAgICAgICAgICAgICQoJ2lucHV0W25hbWU9XCJzdHJpcGVUb2tlblwiXScsICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKSkucmVtb3ZlKCk7XG4gICAgICAgICAgICB0aGF0LmFjaEZpZWxkcyh0aGF0LmVsZW1lbnQsIHRoYXQub3B0aW9ucyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoJ2lucHV0W25hbWU9XCJwdWJsaWNfdG9rZW5cIl0nLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikpLnJlbW92ZSgpO1xuICAgICAgICAgICAgJCgnaW5wdXRbbmFtZT1cImFjY291bnRfaWRcIl0nLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikpLnJlbW92ZSgpO1xuICAgICAgICAgICAgJCgnaW5wdXRbbmFtZT1cImJhbmtUb2tlblwiXScsICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKSkucmVtb3ZlKCk7XG4gICAgICAgICAgICB0aGF0LmNhbGN1bGF0ZUZlZXModGhhdC5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCwgJ2NhcmQnKTsgLy8gd2UgY2FuJ3QgdXNlIGNyZWRpdGNhcmRmaWVsZHMgbWV0aG9kIGhlcmVcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICB9XG4gICAgfSwgLy8gY2hvb3NlUGF5bWVudE1ldGhvZFxuXG4gICAgc2V0dXBQYXltZW50TWV0aG9kOiBmdW5jdGlvbihpZCwgdmFsdWUpIHtcbiAgICAgICQodGhpcy5vcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAkKHRoaXMub3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvciArICcuJyArIGlkKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAvLyQodGhpcy5vcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yICsgJzpub3QoLmFjdGl2ZSkgbGFiZWwnKS5yZW1vdmVDbGFzcygncmVxdWlyZWQnKTtcbiAgICAgIC8vJCh0aGlzLm9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IgKyAnOm5vdCguYWN0aXZlKSBpbnB1dCcpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuICAgICAgJCh0aGlzLm9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IgKyAnOm5vdCguYWN0aXZlKSBpbnB1dCcpLnZhbCgnJyk7XG4gICAgICAvLyQodGhpcy5vcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yICsgJy5hY3RpdmUgbGFiZWwnKS5hZGRDbGFzcygncmVxdWlyZWQnKTtcbiAgICAgIC8vJCh0aGlzLm9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IgKyAnLmFjdGl2ZSBpbnB1dCcpLnByb3AoJ3JlcXVpcmVkJywgdHJ1ZSk7XG4gICAgICBpZiAoIHZhbHVlID09PSAnYmFua19hY2NvdW50JyApIHtcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVGZWVzKHRoaXMub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQsICdiYW5rX2FjY291bnQnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuY2FsY3VsYXRlRmVlcyh0aGlzLm9wdGlvbnMub3JpZ2luYWxfYW1vdW50LCAnY2FyZCcpO1xuICAgICAgfVxuICAgIH0sIC8vIHNldHVwUGF5bWVudE1ldGhvZFxuXG4gICAgY3JlZGl0Q2FyZEZpZWxkczogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuXG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG5cbiAgICAgIHZhciBzdHlsZSA9IHtcbiAgICAgICAgYmFzZToge1xuICAgICAgICAgIGljb25Db2xvcjogJyM2NjZFRTgnLFxuICAgICAgICAgIGxpbmVIZWlnaHQ6ICc0M3B4JyxcbiAgICAgICAgICBmb250V2VpZ2h0OiA0MDAsXG4gICAgICAgICAgZm9udEZhbWlseTogJ2ZmLW1ldGEtd2ViLXBybycsXG4gICAgICAgICAgZm9udFNpemU6ICcyNHB4JyxcbiAgICAgICAgICAvL2xpbmVIZWlnaHQ6ICczN3B4JyxcbiAgICAgICAgICAvL2ZvbnRTaXplOiAnMTZweCcsXG4gICAgICAgIH0sXG4gICAgICAgIGludmFsaWQ6IHtcbiAgICAgICAgICBjb2xvcjogJyMxYTE4MTgnLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICAgIFxuXG4gICAgICAvLyBBZGQgYW4gaW5zdGFuY2Ugb2YgdGhlIGNhcmQgVUkgY29tcG9uZW50IGludG8gdGhlIGBjYXJkLWVsZW1lbnRgIDxkaXY+XG4gICAgICAvL2NhcmQubW91bnQoJyNjYXJkLWVsZW1lbnQnKTtcbiAgICAgIGlmICggJCgnLmNyZWRpdC1jYXJkLWdyb3VwJykubGVuZ3RoID09PSAwICYmICQoJy5wYXltZW50LW1ldGhvZC5jaG9vc2UtY2FyZCcpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGF0LmNhcmROdW1iZXJFbGVtZW50ID0gdGhhdC5lbGVtZW50cy5jcmVhdGUoJ2NhcmROdW1iZXInLCB7XG4gICAgICAgIHN0eWxlOiBzdHlsZVxuICAgICAgfSk7XG4gICAgICB0aGF0LmNhcmROdW1iZXJFbGVtZW50Lm1vdW50KG9wdGlvbnMuY2NfbnVtX3NlbGVjdG9yKTtcblxuICAgICAgdGhhdC5jYXJkRXhwaXJ5RWxlbWVudCA9IHRoYXQuZWxlbWVudHMuY3JlYXRlKCdjYXJkRXhwaXJ5Jywge1xuICAgICAgICBzdHlsZTogc3R5bGVcbiAgICAgIH0pO1xuICAgICAgdGhhdC5jYXJkRXhwaXJ5RWxlbWVudC5tb3VudChvcHRpb25zLmNjX2V4cF9zZWxlY3Rvcik7XG5cbiAgICAgIHRoYXQuY2FyZEN2Y0VsZW1lbnQgPSB0aGF0LmVsZW1lbnRzLmNyZWF0ZSgnY2FyZEN2YycsIHtcbiAgICAgICAgc3R5bGU6IHN0eWxlXG4gICAgICB9KTtcbiAgICAgIHRoYXQuY2FyZEN2Y0VsZW1lbnQubW91bnQob3B0aW9ucy5jY19jdnZfc2VsZWN0b3IpO1xuXG4gICAgICAvLyB2YWxpZGF0ZS9lcnJvciBoYW5kbGUgdGhlIGNhcmQgZmllbGRzXG4gICAgICB0aGF0LmNhcmROdW1iZXJFbGVtZW50Lm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICB2YXIgc3RyaXBlX3BheW1lbnRfdHlwZSA9ICdjYXJkJztcbiAgICAgICAgLy8gZXJyb3IgaGFuZGxpbmdcbiAgICAgICAgdGhhdC5zdHJpcGVFcnJvckRpc3BsYXkoZXZlbnQsICQob3B0aW9ucy5jY19udW1fc2VsZWN0b3IsIGVsZW1lbnQpLCBlbGVtZW50LCBvcHRpb25zICk7XG4gICAgICAgIC8vIGlmIGl0IGNoYW5nZWQsIHJlc2V0IHRoZSBidXR0b25cbiAgICAgICAgdGhhdC5idXR0b25TdGF0dXMob3B0aW9ucywgJCh0aGF0Lm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLmZpbmQoJ2J1dHRvbicpLCBmYWxzZSk7XG4gICAgICAgIC8vIFN3aXRjaCBicmFuZCBsb2dvXG4gICAgICAgIGlmIChldmVudC5icmFuZCkge1xuICAgICAgICAgIGlmICggZXZlbnQuYnJhbmQgPT09ICdhbWV4JyApIHtcbiAgICAgICAgICAgIHN0cmlwZV9wYXltZW50X3R5cGUgPSAnYW1leCc7XG4gICAgICAgICAgfSAgICAgICAgICBcbiAgICAgICAgICB0aGF0LnNldEJyYW5kSWNvbihldmVudC5icmFuZCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhhdC5jYWxjdWxhdGVGZWVzKHRoYXQub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQsIHN0cmlwZV9wYXltZW50X3R5cGUpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoYXQuY2FyZEV4cGlyeUVsZW1lbnQub24oJ2NoYW5nZScsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIC8vIGVycm9yIGhhbmRsaW5nXG4gICAgICAgIHRoYXQuc3RyaXBlRXJyb3JEaXNwbGF5KGV2ZW50LCAkKG9wdGlvbnMuY2NfZXhwX3NlbGVjdG9yLCBlbGVtZW50KSwgZWxlbWVudCwgb3B0aW9ucyApO1xuICAgICAgICAvLyBpZiBpdCBjaGFuZ2VkLCByZXNldCB0aGUgYnV0dG9uXG4gICAgICAgIHRoYXQuYnV0dG9uU3RhdHVzKG9wdGlvbnMsICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKSwgZmFsc2UpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoYXQuY2FyZEN2Y0VsZW1lbnQub24oJ2NoYW5nZScsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIC8vIGVycm9yIGhhbmRsaW5nXG4gICAgICAgIHRoYXQuc3RyaXBlRXJyb3JEaXNwbGF5KGV2ZW50LCAkKG9wdGlvbnMuY2NfY3Z2X3NlbGVjdG9yLCBlbGVtZW50KSwgZWxlbWVudCwgb3B0aW9ucyApO1xuICAgICAgICAvLyBpZiBpdCBjaGFuZ2VkLCByZXNldCB0aGUgYnV0dG9uXG4gICAgICAgIHRoYXQuYnV0dG9uU3RhdHVzKG9wdGlvbnMsICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKSwgZmFsc2UpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIHRoaXMgaXMgdGhlIG1ldGhvZCB0byBjcmVhdGUgYSBzaW5nbGUgY2FyZCBmaWVsZCBhbmQgbW91bnQgaXRcbiAgICAgIC8qdmFyIGNhcmQgPSB0aGF0LmVsZW1lbnRzLmNyZWF0ZShcbiAgICAgICAgJ2NhcmQnLFxuICAgICAgICB7XG4gICAgICAgICAgaGlkZVBvc3RhbENvZGU6IHRydWVcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICAgIC8vIEFkZCBhbiBpbnN0YW5jZSBvZiB0aGUgY2FyZCBVSSBjb21wb25lbnQgaW50byB0aGUgYGNhcmQtZWxlbWVudGAgPGRpdj5cbiAgICAgIGNhcmQubW91bnQoJyNjYXJkLWVsZW1lbnQnKTsqL1xuXG4gICAgfSwgLy8gY3JlZGl0Q2FyZEZpZWxkc1xuXG4gICAgc2V0QnJhbmRJY29uOiBmdW5jdGlvbihicmFuZCkge1xuICAgICAgdmFyIGNhcmRCcmFuZFRvUGZDbGFzcyA9IHtcbiAgICAgICAgJ3Zpc2EnOiAncGYtdmlzYScsXG4gICAgICAgICdtYXN0ZXJjYXJkJzogJ3BmLW1hc3RlcmNhcmQnLFxuICAgICAgICAnYW1leCc6ICdwZi1hbWVyaWNhbi1leHByZXNzJyxcbiAgICAgICAgJ2Rpc2NvdmVyJzogJ3BmLWRpc2NvdmVyJyxcbiAgICAgICAgJ2RpbmVycyc6ICdwZi1kaW5lcnMnLFxuICAgICAgICAnamNiJzogJ3BmLWpjYicsXG4gICAgICAgICd1bmtub3duJzogJ3BmLWNyZWRpdC1jYXJkJyxcbiAgICAgIH1cbiAgICAgIHZhciBicmFuZEljb25FbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JyYW5kLWljb24nKTtcbiAgICAgIHZhciBwZkNsYXNzID0gJ3BmLWNyZWRpdC1jYXJkJztcbiAgICAgIGlmIChicmFuZCBpbiBjYXJkQnJhbmRUb1BmQ2xhc3MpIHtcbiAgICAgICAgcGZDbGFzcyA9IGNhcmRCcmFuZFRvUGZDbGFzc1ticmFuZF07XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBpID0gYnJhbmRJY29uRWxlbWVudC5jbGFzc0xpc3QubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgYnJhbmRJY29uRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGJyYW5kSWNvbkVsZW1lbnQuY2xhc3NMaXN0W2ldKTtcbiAgICAgIH1cbiAgICAgIGJyYW5kSWNvbkVsZW1lbnQuY2xhc3NMaXN0LmFkZCgncGYnKTtcbiAgICAgIGJyYW5kSWNvbkVsZW1lbnQuY2xhc3NMaXN0LmFkZChwZkNsYXNzKTtcbiAgICB9LFxuXG4gICAgYWNoRmllbGRzOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICB2YXIgYmFua1Rva2VuRmllbGROYW1lID0gJ2JhbmtUb2tlbic7XG4gICAgICB2YXIgYmFua1Rva2VuRmllbGQgPSAnaW5wdXRbbmFtZT1cIicgKyBiYW5rVG9rZW5GaWVsZE5hbWUgKyAnXCJdJztcbiAgICAgIGlmIChvcHRpb25zLnBsYWlkX2VudiAhPSAnJyAmJiBvcHRpb25zLmtleSAhPSAnJyAmJiB0eXBlb2YgUGxhaWQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHZhciBsaW5rSGFuZGxlciA9IFBsYWlkLmNyZWF0ZSh7XG4gICAgICAgICAgc2VsZWN0QWNjb3VudDogdHJ1ZSxcbiAgICAgICAgICBhcGlWZXJzaW9uOiAndjInLFxuICAgICAgICAgIGVudjogb3B0aW9ucy5wbGFpZF9lbnYsXG4gICAgICAgICAgY2xpZW50TmFtZTogJ01pbm5Qb3N0JyxcbiAgICAgICAgICBrZXk6IG9wdGlvbnMucGxhaWRfcHVibGljX2tleSxcbiAgICAgICAgICBwcm9kdWN0OiAnYXV0aCcsXG4gICAgICAgICAgb25Mb2FkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vIFRoZSBMaW5rIG1vZHVsZSBmaW5pc2hlZCBsb2FkaW5nLlxuICAgICAgICAgIH0sXG4gICAgICAgICAgb25TdWNjZXNzOiBmdW5jdGlvbihwdWJsaWNfdG9rZW4sIG1ldGFkYXRhKSB7XG4gICAgICAgICAgICAvLyBUaGUgb25TdWNjZXNzIGZ1bmN0aW9uIGlzIGNhbGxlZCB3aGVuIHRoZSB1c2VyIGhhcyBzdWNjZXNzZnVsbHlcbiAgICAgICAgICAgIC8vIGF1dGhlbnRpY2F0ZWQgYW5kIHNlbGVjdGVkIGFuIGFjY291bnQgdG8gdXNlLlxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIFdoZW4gY2FsbGVkLCB5b3Ugd2lsbCBzZW5kIHRoZSBwdWJsaWNfdG9rZW4gYW5kIHRoZSBzZWxlY3RlZFxuICAgICAgICAgICAgLy8gYWNjb3VudCBJRCwgbWV0YWRhdGEuYWNjb3VudF9pZCwgdG8geW91ciBiYWNrZW5kIGFwcCBzZXJ2ZXIuXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gc2VuZERhdGFUb0JhY2tlbmRTZXJ2ZXIoe1xuICAgICAgICAgICAgLy8gICBwdWJsaWNfdG9rZW46IHB1YmxpY190b2tlbixcbiAgICAgICAgICAgIC8vICAgYWNjb3VudF9pZDogbWV0YWRhdGEuYWNjb3VudF9pZFxuICAgICAgICAgICAgLy8gfSk7XG5cbiAgICAgICAgICAgIC8vdGhpcy5kZWJ1ZygnUHVibGljIFRva2VuOiAnICsgcHVibGljX3Rva2VuKTtcbiAgICAgICAgICAgIC8vdGhpcy5kZWJ1ZygnQ3VzdG9tZXItc2VsZWN0ZWQgYWNjb3VudCBJRDogJyArIG1ldGFkYXRhLmFjY291bnRfaWQpO1xuXG4gICAgICAgICAgICB2YXIgc3VwcG9ydGZvcm0gPSAkKG9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpO1xuXG4gICAgICAgICAgICAvLyByZXNwb25zZSBjb250YWlucyBpZCBhbmQgY2FyZCwgd2hpY2ggY29udGFpbnMgYWRkaXRpb25hbCBjYXJkIGRldGFpbHNcbiAgICAgICAgICAgIC8vIEluc2VydCB0aGUgZGF0YSBpbnRvIHRoZSBmb3JtIHNvIGl0IGdldHMgc3VibWl0dGVkIHRvIHRoZSBzZXJ2ZXJcbiAgICAgICAgICAgIHN1cHBvcnRmb3JtLmFwcGVuZCgkKCc8aW5wdXQgdHlwZT1cXFwiaGlkZGVuXFxcIiBuYW1lPVxcXCJwdWJsaWNfdG9rZW5cXFwiIC8+JykudmFsKHB1YmxpY190b2tlbikpO1xuICAgICAgICAgICAgc3VwcG9ydGZvcm0uYXBwZW5kKCQoJzxpbnB1dCB0eXBlPVxcXCJoaWRkZW5cXFwiIG5hbWU9XFxcImFjY291bnRfaWRcXFwiIC8+JykudmFsKG1ldGFkYXRhLmFjY291bnRfaWQpKTtcblxuICAgICAgICAgICAgLy8gZ2V0IHRoZSBhY2NvdW50IHZhbGlkYXRlZCBieSBhamF4XG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICB1cmw6Jy9wbGFpZF90b2tlbi8nLFxuICAgICAgICAgICAgICAvL2NhY2hlOiBmYWxzZSxcbiAgICAgICAgICAgICAgZGF0YTogJChzdXBwb3J0Zm9ybSkuc2VyaWFsaXplKCksXG4gICAgICAgICAgICAgIHR5cGU6ICdQT1NUJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgIGlmICh0eXBlb2YgcmVzcG9uc2UuZXJyb3IgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgLy8gdGhlcmUgaXMgYW4gZXJyb3IuXG4gICAgICAgICAgICAgICAgJChvcHRpb25zLnBsYWlkX2xpbmspLnBhcmVudCgpLmFmdGVyKCc8cCBjbGFzcz1cImVycm9yXCI+JyArIHJlc3BvbnNlLmVycm9yICsgJzwvcD4nKVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vdGhpcy5kZWJ1ZygncHJpbnQgcmVzcG9uc2UgaGVyZScpO1xuICAgICAgICAgICAgICAgIC8vdGhpcy5kZWJ1ZyhyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgLy8gYWRkIHRoZSBmaWVsZChzKSB3ZSBuZWVkIHRvIHRoZSBmb3JtIGZvciBzdWJtaXR0aW5nXG4gICAgICAgICAgICAgICAgaWYgKCQoYmFua1Rva2VuRmllbGQpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICQoYmFua1Rva2VuRmllbGQpLnZhbChyZXNwb25zZS5zdHJpcGVfYmFua19hY2NvdW50X3Rva2VuKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgJChvcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5wcmVwZW5kKCQoJzxpbnB1dCB0eXBlPVxcXCJoaWRkZW5cXFwiIG5hbWU9XCInICsgYmFua1Rva2VuRmllbGROYW1lICsgJ1wiPicpLnZhbChyZXNwb25zZS5zdHJpcGVfYmFua19hY2NvdW50X3Rva2VuKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICQob3B0aW9ucy5wbGFpZF9saW5rLCBlbGVtZW50KS5odG1sKCc8c3Ryb25nPllvdXIgYWNjb3VudCB3YXMgc3VjY2Vzc2Z1bGx5IGF1dGhvcml6ZWQ8L3N0cm9uZz4nKS5jb250ZW50cygpLnVud3JhcCgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmVycm9yKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICQob3B0aW9ucy5wbGFpZF9saW5rKS5wYXJlbnQoKS5hZnRlcignPHAgY2xhc3M9XCJlcnJvclwiPicgKyByZXNwb25zZS5lcnJvciArICc8L3A+JylcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgb25FeGl0OiBmdW5jdGlvbihlcnIsIG1ldGFkYXRhKSB7XG4gICAgICAgICAgICAvLyBUaGUgdXNlciBleGl0ZWQgdGhlIExpbmsgZmxvdy5cbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgICAgJChvcHRpb25zLnBsYWlkX2xpbmssIGVsZW1lbnQpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAkKG9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IgKyAnIC5lcnJvcicpLnJlbW92ZSgpOyAvLyByZW1vdmUgbWV0aG9kIGVycm9yIG1lc3NhZ2UgaWYgaXQgaXMgdGhlcmVcbiAgICAgICAgICBsaW5rSGFuZGxlci5vcGVuKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sIC8vIGFjaEZpZWxkc1xuXG4gICAgYnV0dG9uU3RhdHVzOiBmdW5jdGlvbihvcHRpb25zLCBidXR0b24sIGRpc2FibGVkKSB7XG4gICAgICAvLyBtYWtlIHRoZSBidXR0b24gY2xpY2thYmxlIG9yIG5vdFxuICAgICAgYnV0dG9uLnByb3AoJ2Rpc2FibGVkJywgZGlzYWJsZWQpO1xuICAgICAgaWYgKGRpc2FibGVkID09PSBmYWxzZSkge1xuICAgICAgICBidXR0b24udGV4dChvcHRpb25zLmJ1dHRvbl90ZXh0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJ1dHRvbi50ZXh0KCdQcm9jZXNzaW5nJyk7XG4gICAgICB9XG4gICAgfSwgLy8gYnV0dG9uU3RhdHVzXG5cbiAgICBzY3JvbGxUb0Zvcm1FcnJvcjogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgZm9ybSA9ICQoICcubS1mb3JtJyApO1xuICAgICAgLy8gbGlzdGVuIGZvciBgaW52YWxpZGAgZXZlbnRzIG9uIGFsbCBmb3JtIGlucHV0c1xuICAgICAgZm9ybS5maW5kKCAnOmlucHV0JyApLm9uKCAnaW52YWxpZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgaW5wdXQgPSAkKCB0aGlzICk7XG4gICAgICAgICAgLy8gdGhlIGZpcnN0IGludmFsaWQgZWxlbWVudCBpbiB0aGUgZm9ybVxuICAgICAgICB2YXIgZmlyc3QgPSBmb3JtLmZpbmQoICcuYS1lcnJvcicgKS5maXJzdCgpO1xuICAgICAgICAvLyB0aGUgZm9ybSBpdGVtIHRoYXQgY29udGFpbnMgaXRcbiAgICAgICAgdmFyIGZpcnN0X2hvbGRlciA9IGZpcnN0LnBhcmVudCgpO1xuICAgICAgICAgIC8vIG9ubHkgaGFuZGxlIGlmIHRoaXMgaXMgdGhlIGZpcnN0IGludmFsaWQgaW5wdXRcbiAgICAgICAgICBpZiAoaW5wdXRbMF0gPT09IGZpcnN0WzBdKSB7XG4gICAgICAgICAgICAgIC8vIGhlaWdodCBvZiB0aGUgbmF2IGJhciBwbHVzIHNvbWUgcGFkZGluZyBpZiB0aGVyZSdzIGEgZml4ZWQgbmF2XG4gICAgICAgICAgICAgIC8vdmFyIG5hdmJhckhlaWdodCA9IG5hdmJhci5oZWlnaHQoKSArIDUwXG5cbiAgICAgICAgICAgICAgLy8gdGhlIHBvc2l0aW9uIHRvIHNjcm9sbCB0byAoYWNjb3VudGluZyBmb3IgdGhlIG5hdmJhciBpZiBpdCBleGlzdHMpXG4gICAgICAgICAgICAgIHZhciBlbGVtZW50T2Zmc2V0ID0gZmlyc3RfaG9sZGVyLm9mZnNldCgpLnRvcDtcblxuICAgICAgICAgICAgICAvLyB0aGUgY3VycmVudCBzY3JvbGwgcG9zaXRpb24gKGFjY291bnRpbmcgZm9yIHRoZSBuYXZiYXIpXG4gICAgICAgICAgICAgIHZhciBwYWdlT2Zmc2V0ID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xuXG4gICAgICAgICAgICAgIC8vIGRvbid0IHNjcm9sbCBpZiB0aGUgZWxlbWVudCBpcyBhbHJlYWR5IGluIHZpZXdcbiAgICAgICAgICAgICAgaWYgKCBlbGVtZW50T2Zmc2V0ID4gcGFnZU9mZnNldCAmJiBlbGVtZW50T2Zmc2V0IDwgcGFnZU9mZnNldCArIHdpbmRvdy5pbm5lckhlaWdodCApIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgLy8gbm90ZTogYXZvaWQgdXNpbmcgYW5pbWF0ZSwgYXMgaXQgcHJldmVudHMgdGhlIHZhbGlkYXRpb24gbWVzc2FnZSBkaXNwbGF5aW5nIGNvcnJlY3RseVxuICAgICAgICAgICAgICAkKCAnaHRtbCwgYm9keScgKS5zY3JvbGxUb3AoIGVsZW1lbnRPZmZzZXQgKTtcbiAgICAgICAgICB9XG4gICAgICB9ICk7XG4gICAgfSwgLy8gc2Nyb2xsVG9Gb3JtRXJyb3JcblxuICAgIHZhbGlkYXRlQW5kU3VibWl0OiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG5cbiAgICAgIHZhciBmb3JtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tLWZvcm0nKTtcbiAgICAgIGZvcm1zLmZvckVhY2goIGZ1bmN0aW9uICggZm9ybSApIHtcbiAgICAgICAgVmFsaWRGb3JtKCBmb3JtLCB7XG4gICAgICAgICAgdmFsaWRhdGlvbkVycm9yUGFyZW50Q2xhc3M6ICdtLWhhcy12YWxpZGF0aW9uLWVycm9yJyxcbiAgICAgICAgICB2YWxpZGF0aW9uRXJyb3JDbGFzczogJ2EtdmFsaWRhdGlvbi1lcnJvcicsXG4gICAgICAgICAgaW52YWxpZENsYXNzOiAnYS1lcnJvcicsXG4gICAgICAgICAgZXJyb3JQbGFjZW1lbnQ6ICdhZnRlcidcbiAgICAgICAgfSApXG4gICAgICB9ICk7XG5cbiAgICAgIHRoaXMuc2Nyb2xsVG9Gb3JtRXJyb3IoKTtcblxuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgJChvcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5zdWJtaXQoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAvLyB2YWxpZGF0ZSBhbmQgc3VibWl0IHRoZSBmb3JtXG4gICAgICAgICQoJy5hLWNoZWNrLWZpZWxkJykucmVtb3ZlKCk7XG4gICAgICAgICQoJ2lucHV0LCBsYWJlbCcsIGVsZW1lbnQpLnJlbW92ZUNsYXNzKCdhLWVycm9yJyk7XG4gICAgICAgIHZhciB2YWxpZCA9IHRydWU7XG4gICAgICAgIHZhciBwYXltZW50X3R5cGUgPSAkKCdpbnB1dFtuYW1lPVwic3RyaXBlX3BheW1lbnRfdHlwZVwiXScpLnZhbCgpO1xuICAgICAgICAkKHRoYXQub3B0aW9ucy5jaG9vc2VfcGF5bWVudCArICcgaW5wdXQnKS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJCh0aGF0Lm9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IgKyAnIC5lcnJvcicpLnJlbW92ZSgpOyAvLyByZW1vdmUgbWV0aG9kIGVycm9yIG1lc3NhZ2UgaWYgaXQgaXMgdGhlcmVcbiAgICAgICAgICAvLyBpZiBhIHBheW1lbnQgZmllbGQgY2hhbmdlZCwgcmVzZXQgdGhlIGJ1dHRvblxuICAgICAgICAgIHRoYXQuYnV0dG9uU3RhdHVzKG9wdGlvbnMsICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKSwgZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAocGF5bWVudF90eXBlID09PSAnYmFua19hY2NvdW50Jykge1xuICAgICAgICAgIGlmICgkKCdpbnB1dFtuYW1lPVwiYmFua1Rva2VuXCJdJykubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB2YWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgJCh0aGF0Lm9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IpLnByZXBlbmQoJzxwIGNsYXNzPVwiZXJyb3JcIj5Zb3UgYXJlIHJlcXVpcmVkIHRvIGVudGVyIGNyZWRpdCBjYXJkIGluZm9ybWF0aW9uLCBvciB0byBhdXRob3JpemUgTWlublBvc3QgdG8gY2hhcmdlIHlvdXIgYmFuayBhY2NvdW50LCB0byBtYWtlIGEgcGF5bWVudC48L3A+Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbGlkID09PSB0cnVlKSB7XG4gICAgICAgICAgLy8gMS4gc2V0IHVwIHRoZSBidXR0b24gYW5kIHJlbW92ZSB0aGUgaGlkZGVuIGZpZWxkcyB3ZSBkb24ndCBuZWVkXG4gICAgICAgICAgdGhhdC5idXR0b25TdGF0dXModGhhdC5vcHRpb25zLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIHRydWUpO1xuICAgICAgICAgIHZhciB0b2tlbkRhdGEgPSB0aGF0LmdlbmVyYXRlVG9rZW5EYXRhKCk7XG5cbiAgICAgICAgICAvLyAyLiBjcmVhdGUgbWlubnBvc3QgYWNjb3VudCBpZiBzcGVjaWZpZWRcbiAgICAgICAgICBpZiAodGhhdC5vcHRpb25zLmNyZWF0ZV9hY2NvdW50ID09PSB0cnVlKSB7XG4gICAgICAgICAgICB2YXIgdXNlciA9IHtcbiAgICAgICAgICAgICAgZW1haWw6ICQodGhhdC5vcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICAgICAgZmlyc3RfbmFtZTogJCh0aGF0Lm9wdGlvbnMuZmlyc3RfbmFtZV9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgICAgIGxhc3RfbmFtZTogJCh0aGF0Lm9wdGlvbnMubGFzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICAgICAgcGFzc3dvcmQ6ICQodGhhdC5vcHRpb25zLnBhc3N3b3JkX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICAgICAgY2l0eTogJCh0aGF0Lm9wdGlvbnMuYWNjb3VudF9jaXR5X3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICAgICAgc3RhdGU6ICQodGhhdC5vcHRpb25zLmFjY291bnRfc3RhdGVfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgICAgICB6aXA6ICQodGhhdC5vcHRpb25zLmFjY291bnRfemlwX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgdXJsOiB0aGF0Lm9wdGlvbnMubWlubnBvc3Rfcm9vdCArICcvd3AtanNvbi91c2VyLWFjY291bnQtbWFuYWdlbWVudC92MS9jcmVhdGUtdXNlcicsXG4gICAgICAgICAgICAgIGRhdGE6IHVzZXJcbiAgICAgICAgICAgIH0pLmRvbmUoZnVuY3Rpb24oIGRhdGEgKSB7XG4gICAgICAgICAgICAgIGlmIChkYXRhLnN0YXR1cyA9PT0gJ3N1Y2Nlc3MnICYmIGRhdGEucmVhc29uID09PSAnbmV3IHVzZXInKSB7XG4gICAgICAgICAgICAgICAgLy8gdXNlciBjcmVhdGVkIC0gdGhleSBzaG91bGQgcmVjZWl2ZSBlbWFpbFxuICAgICAgICAgICAgICAgIC8vIHN1Ym1pdCB0aGUgZm9ybVxuICAgICAgICAgICAgICAgIC8vc3VwcG9ydGZvcm0uZ2V0KDApLnN1Ym1pdCgpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIHVzZXIgbm90IGNyZWF0ZWRcbiAgICAgICAgICAgICAgICAvLyBzdGlsbCBzdWJtaXQgdGhlIGZvcm1cbiAgICAgICAgICAgICAgICAvL3N1cHBvcnRmb3JtLmdldCgwKS5zdWJtaXQoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCQoJ2lucHV0W25hbWU9XCJiYW5rVG9rZW5cIl0nKS5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgLy8gZmluYWxseSwgZ2V0IGEgdG9rZW4gZnJvbSBzdHJpcGUsIGFuZCB0cnkgdG8gY2hhcmdlIGl0IGlmIGl0IGlzIG5vdCBhY2hcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlVG9rZW4odGhhdC5jYXJkTnVtYmVyRWxlbWVudCwgdG9rZW5EYXRhKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gaWYgaXQgaXMgYWNoLCB3ZSBhbHJlYWR5IGhhdmUgYSB0b2tlbiBzbyBwYXNzIGl0IHRvIHN0cmlwZS5cbiAgICAgICAgICAgIHRoYXQuc3RyaXBlVG9rZW5IYW5kbGVyKCAkKCcjYmFua1Rva2VuJykudmFsKCksICdiYW5rX2FjY291bnQnICk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIHRoaXMgbWVhbnMgdmFsaWQgaXMgZmFsc2VcbiAgICAgICAgICB0aGF0LmJ1dHRvblN0YXR1cyh0aGF0Lm9wdGlvbnMsICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKSwgZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgIH0pO1xuICAgIH0sIC8vIHZhbGlkYXRlQW5kU3VibWl0XG5cbiAgICBzdHJpcGVFcnJvckRpc3BsYXk6IGZ1bmN0aW9uKGV2ZW50LCB0aGlzX3NlbGVjdG9yLCBlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICAvLyBsaXN0ZW4gZm9yIGVycm9ycyBhbmQgZGlzcGxheS9oaWRlIGVycm9yIG1lc3NhZ2VzXG4gICAgICB2YXIgd2hpY2hfZXJyb3IgPSB0aGlzX3NlbGVjdG9yLmF0dHIoJ2lkJyk7XG4gICAgICAvLyB3aGVuIHRoaXMgZmllbGQgY2hhbmdlcywgcmVzZXQgaXRzIGVycm9yc1xuICAgICAgJCgnLmEtY2FyZC1pbnN0cnVjdGlvbi4nICsgd2hpY2hfZXJyb3IpLnJlbW92ZUNsYXNzKCdhLWVycm9yJyk7XG4gICAgICAkKCcuYS1jYXJkLWluc3RydWN0aW9uLicgKyB3aGljaF9lcnJvcikuZW1wdHkoKTtcbiAgICAgIGlmIChldmVudC5lcnJvcikge1xuICAgICAgICAkKCcuYS1jYXJkLWluc3RydWN0aW9uLicgKyB3aGljaF9lcnJvcikudGV4dChldmVudC5lcnJvci5tZXNzYWdlICsgJyBQbGVhc2UgdHJ5IGFnYWluLicpO1xuICAgICAgICAkKCcuYS1jYXJkLWluc3RydWN0aW9uLicgKyB3aGljaF9lcnJvcikuYWRkQ2xhc3MoJ2EtZXJyb3InKTtcbiAgICAgICAgdGhpc19zZWxlY3Rvci5wYXJlbnQoKS5hZGRDbGFzcygnYS1lcnJvcicpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJCgnLmEtY2FyZC1pbnN0cnVjdGlvbi4nICsgd2hpY2hfZXJyb3IpLnJlbW92ZUNsYXNzKCdhLWVycm9yJyk7XG4gICAgICAgICQoJy5hLWNhcmQtaW5zdHJ1Y3Rpb24uJyArIHdoaWNoX2Vycm9yKS5lbXB0eSgpO1xuICAgICAgICAkKG9wdGlvbnMuY2NfbnVtX3NlbGVjdG9yLCBlbGVtZW50KS5yZW1vdmVDbGFzcygnYS1lcnJvcicpO1xuICAgICAgICAkKG9wdGlvbnMuY2NfZXhwX3NlbGVjdG9yLCBlbGVtZW50KS5yZW1vdmVDbGFzcygnYS1ycm9yJyk7XG4gICAgICAgICQob3B0aW9ucy5jY19jdnZfc2VsZWN0b3IsIGVsZW1lbnQpLnJlbW92ZUNsYXNzKCdhLWVycm9yJyk7XG4gICAgICAgICQob3B0aW9ucy5jY19udW1fc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdhLWVycm9yJyk7XG4gICAgICAgICQob3B0aW9ucy5jY19leHBfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdhLWVycm9yJyk7XG4gICAgICAgICQob3B0aW9ucy5jY19jdnZfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdhLWVycm9yJyk7XG4gICAgICB9XG4gICAgfSwgLy8gc3RyaXBlRXJyb3JEaXNwbGF5XG5cbiAgICBnZW5lcmF0ZVRva2VuRGF0YTogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgdG9rZW5EYXRhID0ge307XG4gICAgICB2YXIgZnVsbF9uYW1lID0gJyc7XG4gICAgICBpZiAoJCgnI2Z1bGxfbmFtZScpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZnVsbF9uYW1lID0gJCgnI2Z1bGxfbmFtZScpLnZhbCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZnVsbF9uYW1lID0gJCgnI2ZpcnN0X25hbWUnKS52YWwoKSArICcgJyArICQoJyNsYXN0X25hbWUnKS52YWwoKTtcbiAgICAgIH1cbiAgICAgIHRva2VuRGF0YS5uYW1lID0gZnVsbF9uYW1lO1xuXG4gICAgICB2YXIgc3RyZWV0ID0gJ05vbmUnO1xuICAgICAgaWYgKCQoJ2lucHV0W25hbWU9XCJmdWxsX2FkZHJlc3NcIl0nKS52YWwoKSAhPSAnJykge1xuICAgICAgICBzdHJlZXQgPSAkKCcjZnVsbF9hZGRyZXNzJykudmFsKCk7XG4gICAgICAgIGlmICgkKCdpbnB1dFtuYW1lPVwiYmlsbGluZ19zdHJlZXRcIl0nKS52YWwoKSAhPSAnJykge1xuICAgICAgICAgIHN0cmVldCA9ICQoJ2lucHV0W25hbWU9XCJiaWxsaW5nX3N0cmVldFwiXScpLnZhbCgpO1xuICAgICAgICB9XG4gICAgICAgIHRva2VuRGF0YS5hZGRyZXNzX2xpbmUxID0gc3RyZWV0O1xuICAgICAgfVxuXG4gICAgICB2YXIgY2l0eSA9ICdOb25lJztcbiAgICAgIGlmICgkKCdpbnB1dFtuYW1lPVwiYmlsbGluZ19jaXR5XCJdJykudmFsKCkgIT0gJycpIHtcbiAgICAgICAgY2l0eSA9ICQoJ2lucHV0W25hbWU9XCJiaWxsaW5nX2NpdHlcIl0nKS52YWwoKTtcbiAgICAgICAgdG9rZW5EYXRhLmFkZHJlc3NfY2l0eSA9IGNpdHk7XG4gICAgICB9XG5cbiAgICAgIHZhciBzdGF0ZSA9ICdOb25lJztcbiAgICAgIGlmICgkKCdpbnB1dFtuYW1lPVwiYmlsbGluZ19zdGF0ZVwiXScpLnZhbCgpICE9ICcnKSB7XG4gICAgICAgIHN0YXRlID0gJCgnaW5wdXRbbmFtZT1cImJpbGxpbmdfc3RhdGVcIl0nKS52YWwoKTtcbiAgICAgICAgdG9rZW5EYXRhLmFkZHJlc3Nfc3RhdGUgPSBzdGF0ZTtcbiAgICAgIH1cblxuICAgICAgdmFyIHppcCA9ICdOb25lJztcbiAgICAgIGlmICgkKCdpbnB1dFtuYW1lPVwiYmlsbGluZ196aXBcIl0nKS52YWwoKSAhPSAnJykge1xuICAgICAgICB6aXAgPSAkKCdpbnB1dFtuYW1lPVwiYmlsbGluZ196aXBcIl0nKS52YWwoKTtcbiAgICAgICAgdG9rZW5EYXRhLmFkZHJlc3NfemlwID0gemlwO1xuICAgICAgfVxuXG4gICAgICB2YXIgY291bnRyeSA9ICdVUyc7XG4gICAgICBpZiAoJCgnaW5wdXRbbmFtZT1cImJpbGxpbmdfY291bnRyeVwiXScpLnZhbCgpICE9ICcnKSB7XG4gICAgICAgIGNvdW50cnkgPSAkKCdpbnB1dFtuYW1lPVwiYmlsbGluZ19jb3VudHJ5XCJdJykudmFsKCk7XG4gICAgICB9XG4gICAgICB0b2tlbkRhdGEuYWRkcmVzc19jb3VudHJ5ID0gY291bnRyeTtcblxuICAgICAgcmV0dXJuIHRva2VuRGF0YTtcbiAgICB9LCAvLyBnZW5lcmF0ZVRva2VuRGF0YVxuXG4gICAgY3JlYXRlVG9rZW46IGZ1bmN0aW9uKGNhcmQsIHRva2VuRGF0YSkge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdGhhdC5zdHJpcGUuY3JlYXRlVG9rZW4oY2FyZCwgdG9rZW5EYXRhKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICBpZiAocmVzdWx0LmVycm9yKSB7XG4gICAgICAgICAgLy8gU2hvdyB0aGUgZXJyb3JzIG9uIHRoZSBmb3JtXG4gICAgICAgICAgdGhhdC5idXR0b25TdGF0dXModGhhdC5vcHRpb25zLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIGZhbHNlKTtcbiAgICAgICAgICB2YXIgZmllbGQgPSByZXN1bHQuZXJyb3IuZmllbGQgKyAnX2ZpZWxkX3NlbGVjdG9yJztcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9ICcnO1xuICAgICAgICAgIGlmICh0eXBlb2YgcmVzdWx0LmVycm9yLm1lc3NhZ2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBtZXNzYWdlID0gcmVzdWx0LmVycm9yLm1lc3NhZ2U7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1lc3NhZ2UgPSByZXN1bHQuZXJyb3IubWVzc2FnZVswXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCQoZmllbGQpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICQodGhhdC5vcHRpb25zW2ZpZWxkXSwgZWxlbWVudCkuYWRkQ2xhc3MoJ2EtZXJyb3InKTtcbiAgICAgICAgICAgICQodGhhdC5vcHRpb25zW2ZpZWxkXSwgZWxlbWVudCkucHJldigpLmFkZENsYXNzKCdhLWVycm9yJyk7XG4gICAgICAgICAgICAkKHRoYXQub3B0aW9uc1tmaWVsZF0sIGVsZW1lbnQpLmFmdGVyKCc8c3BhbiBjbGFzcz1cImEtY2hlY2stZmllbGQgaW52YWxpZFwiPicgKyBtZXNzYWdlICsgJzwvc3Bhbj4nKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gU2VuZCB0aGUgdG9rZW4gdG8geW91ciBzZXJ2ZXJcbiAgICAgICAgICB0aGF0LnN0cmlwZVRva2VuSGFuZGxlcihyZXN1bHQudG9rZW4sICdjYXJkJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sIC8vIGNyZWF0ZVRva2VuXG5cbiAgICBzdHJpcGVUb2tlbkhhbmRsZXI6IGZ1bmN0aW9uKHRva2VuLCB0eXBlKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB2YXIgc3VwcG9ydGZvcm0gPSAkKHRoaXMub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3Rvcik7XG4gICAgICB2YXIgYWpheF91cmwgPSAnJztcbiAgICAgIHZhciB0b2tlbkZpZWxkTmFtZSA9ICdzdHJpcGVUb2tlbic7XG4gICAgICB2YXIgdG9rZW5GaWVsZCA9ICdpbnB1dFtuYW1lPVwiJyArIHRva2VuRmllbGROYW1lICsgJ1wiXSc7XG4gICAgICBpZiAodHlwZW9mICQoc3VwcG9ydGZvcm0pLmRhdGEoJ2FjdGlvbicpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBhamF4X3VybCA9ICQoc3VwcG9ydGZvcm0pLmRhdGEoJ2FjdGlvbicpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWpheF91cmwgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG4gICAgICB9XG4gICAgICAvLyBJbnNlcnQgdGhlIHRva2VuIElEIGludG8gdGhlIGZvcm0gc28gaXQgZ2V0cyBzdWJtaXR0ZWQgdG8gdGhlIHNlcnZlclxuICAgICAgaWYgKCB0eXBlID09PSAnY2FyZCcgKSB7XG4gICAgICAgIGlmICh0b2tlbi5jYXJkLmJyYW5kLmxlbmd0aCA+IDAgJiYgdG9rZW4uY2FyZC5icmFuZCA9PT0gJ0FtZXJpY2FuIEV4cHJlc3MnKSB7XG4gICAgICAgICAgdHlwZSA9ICdhbWV4JztcbiAgICAgICAgfVxuICAgICAgICBpZiAoJCh0b2tlbkZpZWxkKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgJCh0b2tlbkZpZWxkKS52YWwodG9rZW4uaWQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN1cHBvcnRmb3JtLmFwcGVuZCgkKCc8aW5wdXQgdHlwZT1cXFwiaGlkZGVuXFxcIiBuYW1lPVwiJyArIHRva2VuRmllbGROYW1lICsgJ1wiPicpLnZhbCh0b2tlbi5pZCkpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgICQoJ2lucHV0W25hbWU9XCJzdHJpcGVfcGF5bWVudF90eXBlXCJdJykudmFsKHR5cGUpO1xuXG4gICAgICAvLyBTdWJtaXQgdGhlIGZvcm1cbiAgICAgIC8vIHRoZSB3YXkgaXQgd29ya3MgY3VycmVudGx5IGlzIHRoZSBmb3JtIHN1Ym1pdHMgYW4gYWpheCByZXF1ZXN0IHRvIGl0c2VsZlxuICAgICAgLy8gdGhlbiBpdCBzdWJtaXRzIGEgcG9zdCByZXF1ZXN0IHRvIHRoZSBmb3JtJ3MgYWN0aW9uIHVybFxuICAgICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBhamF4X3VybCxcbiAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICBkYXRhOiAkKHN1cHBvcnRmb3JtKS5zZXJpYWxpemUoKSxcbiAgICAgICAgdHlwZTogJ1BPU1QnXG4gICAgICB9KVxuICAgICAgLmRvbmUoZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKHR5cGVvZiByZXNwb25zZS5lcnJvcnMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgLy8gZG8gbm90IHN1Ym1pdC4gdGhlcmUgaXMgYW4gZXJyb3IuXG4gICAgICAgICAgdGhhdC5idXR0b25TdGF0dXModGhhdC5vcHRpb25zLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIGZhbHNlKTtcbiAgICAgICAgICAvLyBhZGQgc29tZSBlcnJvciBtZXNzYWdlcyBhbmQgc3R5bGVzXG4gICAgICAgICAgJC5lYWNoKHJlc3BvbnNlLmVycm9ycywgZnVuY3Rpb24oIGluZGV4LCBlcnJvciApIHtcbiAgICAgICAgICAgIHZhciBmaWVsZCA9IGVycm9yLmZpZWxkICsgJ19maWVsZF9zZWxlY3Rvcic7XG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9ICcnO1xuICAgICAgICAgICAgdmFyIHN0cmlwZUVycm9yU2VsZWN0b3IgPSAnJztcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZXJyb3IubWVzc2FnZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgbWVzc2FnZSA9IGVycm9yLm1lc3NhZ2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBtZXNzYWdlID0gZXJyb3IubWVzc2FnZVswXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgkKHRoYXQub3B0aW9uc1tmaWVsZF0pLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgJCh0aGF0Lm9wdGlvbnNbZmllbGRdKS5hZGRDbGFzcygnYS1lcnJvcicpO1xuICAgICAgICAgICAgICAkKHRoYXQub3B0aW9uc1tmaWVsZF0pLnByZXYoKS5hZGRDbGFzcygnYS1lcnJvcicpO1xuICAgICAgICAgICAgICAkKHRoYXQub3B0aW9uc1tmaWVsZF0pLmFmdGVyKCc8c3BhbiBjbGFzcz1cImEtY2hlY2stZmllbGQgaW52YWxpZFwiPicgKyBtZXNzYWdlICsgJzwvc3Bhbj4nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBlcnJvciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgdGhhdC5idXR0b25TdGF0dXModGhhdC5vcHRpb25zLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIGZhbHNlLCAnY2FyZCcpO1xuICAgICAgICAgICAgICBpZiAoZXJyb3IuY29kZSA9PSAnaW52YWxpZF9udW1iZXInIHx8IGVycm9yLmNvZGUgPT0gJ2luY29ycmVjdF9udW1iZXInIHx8IGVycm9yLmNvZGUgPT0gJ2NhcmRfZGVjbGluZWQnIHx8IGVycm9yLmNvZGUgPT0gJ3Byb2Nlc3NpbmdfZXJyb3InKSB7XG4gICAgICAgICAgICAgICAgLy8gZXJyb3IgaGFuZGxpbmdcbiAgICAgICAgICAgICAgICBzdHJpcGVFcnJvclNlbGVjdG9yID0gJCh0aGF0Lm9wdGlvbnMuY2NfbnVtX3NlbGVjdG9yKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmIChlcnJvci5jb2RlID09ICdpbnZhbGlkX2V4cGlyeV9tb250aCcgfHwgZXJyb3IuY29kZSA9PSAnaW52YWxpZF9leHBpcnlfeWVhcicgfHwgZXJyb3IuY29kZSA9PSAnZXhwaXJlZF9jYXJkJykge1xuICAgICAgICAgICAgICAgIC8vIGVycm9yIGhhbmRsaW5nXG4gICAgICAgICAgICAgICAgc3RyaXBlRXJyb3JTZWxlY3RvciA9ICQodGhhdC5vcHRpb25zLmNjX2V4cF9zZWxlY3Rvcik7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAoZXJyb3IuY29kZSA9PSAnaW52YWxpZF9jdmMnIHx8IGVycm9yLmNvZGUgPT0gJ2luY29ycmVjdF9jdmMnKSB7XG4gICAgICAgICAgICAgICAgLy8gZXJyb3IgaGFuZGxpbmdcbiAgICAgICAgICAgICAgICBzdHJpcGVFcnJvclNlbGVjdG9yID0gJCh0aGF0Lm9wdGlvbnMuY2NfY3Z2X3NlbGVjdG9yKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmIChzdHJpcGVFcnJvclNlbGVjdG9yICE9PSAnJykge1xuICAgICAgICAgICAgICAgIHRoYXQuc3RyaXBlRXJyb3JEaXNwbGF5KHJlc3BvbnNlLmVycm9ycywgc3RyaXBlRXJyb3JTZWxlY3RvciwgdGhhdC5lbGVtZW50LCB0aGF0Lm9wdGlvbnMgKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmIChlcnJvci5maWVsZCA9PSAncmVjYXB0Y2hhJykge1xuICAgICAgICAgICAgICAgICQodGhhdC5vcHRpb25zLnBheV9idXR0b25fc2VsZWN0b3IpLmJlZm9yZSgnPHAgY2xhc3M9XCJhLWZvcm0tY2FwdGlvbiBhLXJlY2FwdGNoYS1lcnJvclwiPicgKyBtZXNzYWdlICsgJzwvcD4nKVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKGVycm9yLnR5cGUgPT0gJ2ludmFsaWRfcmVxdWVzdF9lcnJvcicpIHtcbiAgICAgICAgICAgICAgICAkKHRoYXQub3B0aW9ucy5wYXlfYnV0dG9uX3NlbGVjdG9yKS5iZWZvcmUoJzxwIGNsYXNzPVwiZXJyb3IgZXJyb3ItaW52YWxpZC1yZXF1ZXN0XCI+JyArIGVycm9yLm1lc3NhZ2UgKyAnPC9wPicpXG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHJlc3BvbnNlLmVycm9yc1swXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgdmFyIGZpZWxkID0gcmVzcG9uc2UuZXJyb3JzWzBdLmZpZWxkICsgJ19maWVsZF9zZWxlY3Rvcic7XG4gICAgICAgICAgICAgIGlmICgkKGZpZWxkKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAkKG9wdGlvbnNbZmllbGRdKS5wYXJlbnQoKS5vZmZzZXQoKS50b3BcbiAgICAgICAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN1cHBvcnRmb3JtLmdldCgwKS5zdWJtaXQoKTsgLy8gY29udGludWUgc3VibWl0dGluZyB0aGUgZm9ybSBpZiB0aGUgYWpheCB3YXMgc3VjY2Vzc2Z1bFxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLmVycm9yKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgIHRoYXQuYnV0dG9uU3RhdHVzKHRoYXQub3B0aW9ucywgJCh0aGF0Lm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLmZpbmQoJ2J1dHRvbicpLCBmYWxzZSk7XG4gICAgICB9KTtcblxuICAgIH0sXG5cbiAgICBzaG93TmV3c2xldHRlclNldHRpbmdzOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG5cbiAgICAgIHZhciBuZXdzbGV0dGVyX2dyb3VwX2h0bWwgPSAnJztcbiAgICAgIGlmICgkKG9wdGlvbnMubmV3c2xldHRlcl9ncm91cF9zZWxlY3RvcikubGVuZ3RoID4gMCApIHtcbiAgICAgICAgdmFyIGdldF9kYXRhID0ge1xuICAgICAgICAgIHNob3J0Y29kZTogJ25ld3NsZXR0ZXJfZm9ybScsXG4gICAgICAgICAgcGxhY2VtZW50OiAndXNlcmFjY291bnQnXG4gICAgICAgIH07XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICB1cmw6IG9wdGlvbnMubWlubnBvc3Rfcm9vdCArICcvd3AtanNvbi9taW5ucG9zdC1hcGkvdjIvbWFpbGNoaW1wL2Zvcm0nLFxuICAgICAgICAgIGRhdGE6IGdldF9kYXRhXG4gICAgICAgIH0pLmRvbmUoZnVuY3Rpb24oIHJlc3VsdCApIHtcbiAgICAgICAgICBpZiAoIHR5cGVvZiByZXN1bHQuZ3JvdXBfZmllbGRzICE9PSAndW5kZWZpbmVkJyApIHtcbiAgICAgICAgICAgICQuZWFjaChyZXN1bHQuZ3JvdXBfZmllbGRzLCBmdW5jdGlvbiggaW5kZXgsIGNhdGVnb3J5ICkge1xuICAgICAgICAgICAgICBuZXdzbGV0dGVyX2dyb3VwX2h0bWwgKz0gJzxmaWVsZHNldCBjbGFzcz1cIm0tZm9ybS1pdGVtIHN1cHBvcnQtbmV3c2xldHRlciBtLWZvcm0taXRlbS0nICsgY2F0ZWdvcnkudHlwZSArICdcIj4nO1xuICAgICAgICAgICAgICBuZXdzbGV0dGVyX2dyb3VwX2h0bWwgKz0gJzxsYWJlbD4nICsgY2F0ZWdvcnkubmFtZSArICc6PC9sYWJlbD4nO1xuICAgICAgICAgICAgICBpZiAoIGNhdGVnb3J5LmNvbnRhaW5zLmxlbmd0aCA+IDAgKSB7XG4gICAgICAgICAgICAgICAgbmV3c2xldHRlcl9ncm91cF9odG1sICs9ICc8ZGl2IGNsYXNzPVwibS1mb3JtLWl0ZW0gbS1mb3JtLWl0ZW0tbmV3c2xldHRlclwiPic7XG4gICAgICAgICAgICAgICAgJC5lYWNoKGNhdGVnb3J5W2NhdGVnb3J5LmNvbnRhaW5zXSwgZnVuY3Rpb24oIGluZGV4LCBpdGVtICkge1xuICAgICAgICAgICAgICAgICAgbmV3c2xldHRlcl9ncm91cF9odG1sICs9ICc8bGFiZWw+PGlucHV0IG5hbWU9XCJncm91cHNfc3VibWl0dGVkXCIgdHlwZT1cImNoZWNrYm94XCIgdmFsdWU9XCInICsgaXRlbS5pZCArICdcIj4nICsgaXRlbS5uYW1lICsgJzwvbGFiZWw+JztcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBuZXdzbGV0dGVyX2dyb3VwX2h0bWwgKz0gJzwvZGl2Pic7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgbmV3c2xldHRlcl9ncm91cF9odG1sICs9ICc8L2ZpZWxkc2V0Pic7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICQob3B0aW9ucy5uZXdzbGV0dGVyX2dyb3VwX3NlbGVjdG9yKS5odG1sKG5ld3NsZXR0ZXJfZ3JvdXBfaHRtbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKCQob3B0aW9ucy5uZXdzbGV0dGVyX2dyb3VwX3NlbGVjdG9yKS5sZW5ndGggPiAwICYmIHR5cGVvZiAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB2YXIgZ2V0X2RhdGEgPSB7XG4gICAgICAgICAgZW1haWw6ICQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKClcbiAgICAgICAgfTtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgIHVybDogb3B0aW9ucy5taW5ucG9zdF9yb290ICsgJy93cC1qc29uL21pbm5wb3N0LWFwaS92Mi9tYWlsY2hpbXAvdXNlcicsXG4gICAgICAgICAgZGF0YTogZ2V0X2RhdGFcbiAgICAgICAgfSkuZG9uZShmdW5jdGlvbiggcmVzdWx0ICkge1xuICAgICAgICAgIGlmICggdHlwZW9mIHJlc3VsdC5tYWlsY2hpbXBfc3RhdHVzICE9PSAndW5kZWZpbmVkJyApIHtcbiAgICAgICAgICAgICQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkuYWZ0ZXIoJzxpbnB1dCBuYW1lPVwibWFpbGNoaW1wX3N0YXR1c1wiIHR5cGU9XCJoaWRkZW5cIiB2YWx1ZT1cIicgKyByZXN1bHQubWFpbGNoaW1wX3N0YXR1cyArICdcIj4nKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCB0eXBlb2YgcmVzdWx0Lm1haWxjaGltcF91c2VyX2lkICE9PSAndW5kZWZpbmVkJyApIHtcbiAgICAgICAgICAgICQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkuYWZ0ZXIoJzxpbnB1dCBuYW1lPVwibWFpbGNoaW1wX3VzZXJfaWRcIiB0eXBlPVwiaGlkZGVuXCIgdmFsdWU9XCInICsgcmVzdWx0Lm1haWxjaGltcF91c2VyX2lkICsgJ1wiPicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAocmVzdWx0Lm1haWxjaGltcF9zdGF0dXMgPT09ICdzdWJzY3JpYmVkJykge1xuICAgICAgICAgICAgLy8gdXNlciBjcmVhdGVkIC0gc2hvdyBhIHN1Y2Nlc3MgbWVzc2FnZVxuICAgICAgICAgICAgJCgnLmEtY29uZmlybS1pbnN0cnVjdGlvbnMnKS50ZXh0KCQoJy5hLWNvbmZpcm0taW5zdHJ1Y3Rpb25zJykuYXR0cignZGF0YS1rbm93bi11c2VyJykpO1xuICAgICAgICAgICAgdmFyIGdyb3VwcyA9IHJlc3VsdC5ncm91cHM7XG4gICAgICAgICAgICAkLmVhY2goZ3JvdXBzLCBmdW5jdGlvbiggaW5kZXgsIHZhbHVlICkge1xuICAgICAgICAgICAgICBpZiAoIHZhbHVlID09PSB0cnVlICkge1xuICAgICAgICAgICAgICAgICQoJzpjaGVja2JveFt2YWx1ZT1cIicgKyBpbmRleCArICdcIl0nKS5wcm9wKCdjaGVja2VkJyx0cnVlKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKCc6Y2hlY2tib3hbdmFsdWU9XCInICsgaW5kZXggKyAnXCJdJykucHJvcCgnY2hlY2tlZCcsZmFsc2UpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgfSwgLy8gc2hvd05ld3NsZXR0ZXJTZXR0aW5nc1xuXG4gICAgY29uZmlybU1lc3NhZ2VTdWJtaXQ6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcblxuICAgICAgdmFyIGV4aXN0aW5nX25ld3NsZXR0ZXJfc2V0dGluZ3MgPSAkKG9wdGlvbnMubmV3c2xldHRlcl9ncm91cF9zZWxlY3RvciArICcgaW5wdXQnKS5zZXJpYWxpemUoKTtcbiAgICAgIC8vdGhpcy5kZWJ1ZyhleGlzdGluZ19uZXdzbGV0dGVyX3NldHRpbmdzKTtcblxuICAgICAgJChvcHRpb25zLmNvbmZpcm1fZm9ybV9zZWxlY3Rvcikuc3VibWl0KGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgdmFyIGNvbmZpcm1mb3JtID0gJChvcHRpb25zLmNvbmZpcm1fZm9ybV9zZWxlY3Rvcik7XG4gICAgICAgIC8vIHN1Ym1pdCBzZXR0aW5ncyB0byBtYWlsY2hpbXBcbiAgICAgICAgLy8gbmVlZCB0byBnZXQgdXNlciBpbmZvIG9uIGEgaGlkZGVuIGZpZWxkIGhlcmVcblxuICAgICAgICB2YXIgbmV3c2xldHRlcl9ncm91cHMgPSAkKG9wdGlvbnMubmV3c2xldHRlcl9ncm91cF9zZWxlY3RvciArICcgaW5wdXQ6Y2hlY2tlZCcpO1xuICAgICAgICB2YXIgbmV3X25ld3NsZXR0ZXJfc2V0dGluZ3MgPSBuZXdzbGV0dGVyX2dyb3Vwcy5zZXJpYWxpemUoKTtcblxuICAgICAgICBpZiAoKGV4aXN0aW5nX25ld3NsZXR0ZXJfc2V0dGluZ3MgIT09IG5ld19uZXdzbGV0dGVyX3NldHRpbmdzKSAmJiAodHlwZW9mIG5ld3NsZXR0ZXJfZ3JvdXBzICE9PSAndW5kZWZpbmVkJykpIHtcbiAgICAgICAgICAvL2FkZCBvdXIgb3duIGFqYXggY2hlY2sgYXMgWC1SZXF1ZXN0ZWQtV2l0aCBpcyBub3QgYWx3YXlzIHJlbGlhYmxlXG4gICAgICAgICAgLy9hamF4X2Zvcm1fZGF0YSA9IG5ld19uZXdzbGV0dGVyX3NldHRpbmdzICsgJyZhamF4cmVxdWVzdD10cnVlJnN1YnNjcmliZSc7XG5cbiAgICAgICAgICB2YXIgcG9zdF9kYXRhID0ge1xuICAgICAgICAgICAgZW1haWw6ICQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgICBmaXJzdF9uYW1lOiAkKG9wdGlvbnMuZmlyc3RfbmFtZV9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgICBsYXN0X25hbWU6ICQob3B0aW9ucy5sYXN0X25hbWVfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgICAgZ3JvdXBzX3N1Ym1pdHRlZDoge31cbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgcG9zdF9kYXRhLmdyb3Vwc19hdmFpbGFibGUgPSAnYWxsJztcblxuICAgICAgICAgIGlmICggJCgnaW5wdXRbbmFtZT1cIm1haWxjaGltcF9zdGF0dXNcIl0nKS5sZW5ndGggPiAwICkge1xuICAgICAgICAgICAgcG9zdF9kYXRhLm1haWxjaGltcF9zdGF0dXMgPSAkKCdpbnB1dFtuYW1lPVwibWFpbGNoaW1wX3N0YXR1c1wiXScpLnZhbCgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICggJCgnaW5wdXRbbmFtZT1cIm1haWxjaGltcF91c2VyX2lkXCJdJykubGVuZ3RoID4gMCApIHtcbiAgICAgICAgICAgIHBvc3RfZGF0YS5tYWlsY2hpbXBfdXNlcl9pZCA9ICQoJ2lucHV0W25hbWU9XCJtYWlsY2hpbXBfdXNlcl9pZFwiXScpLnZhbCgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0eXBlb2YgbmV3c2xldHRlcl9ncm91cHMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAkLmVhY2gobmV3c2xldHRlcl9ncm91cHMsIGZ1bmN0aW9uKGluZGV4LCB2YWx1ZSkge1xuICAgICAgICAgICAgICB2YXIgZ3JvdXAgPSAkKHRoaXMpLnZhbCgpO1xuICAgICAgICAgICAgICBwb3N0X2RhdGEuZ3JvdXBzX3N1Ym1pdHRlZFtpbmRleF0gPSBncm91cDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IG9wdGlvbnMubWlubnBvc3Rfcm9vdCArICcvd3AtanNvbi9taW5ucG9zdC1hcGkvdjIvbWFpbGNoaW1wL3VzZXInLFxuICAgICAgICAgICAgdHlwZTogJ3Bvc3QnLFxuICAgICAgICAgICAgZGF0YVR5cGUgOiAnanNvbicsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkocG9zdF9kYXRhKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmRvbmUoZnVuY3Rpb24ocmVzcG9uc2UpIHsgLy8gcmVzcG9uc2UgZnJvbSB0aGUgUEhQIGFjdGlvblxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSAnJztcbiAgICAgICAgICAgIGlmICggcmVzcG9uc2Uuc3VjY2VzcyA9PT0gdHJ1ZSApIHtcbiAgICAgICAgICAgICAgLypzd2l0Y2ggKHJlc3BvbnNlLmRhdGEudXNlcl9zdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdleGlzdGluZyc6XG4gICAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ1RoYW5rcyBmb3IgdXBkYXRpbmcgeW91ciBlbWFpbCBwcmVmZXJlbmNlcy4gVGhleSB3aWxsIGdvIGludG8gZWZmZWN0IGltbWVkaWF0ZWx5Lic7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICduZXcnOlxuICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9ICdXZSBoYXZlIGFkZGVkIHlvdSB0byB0aGUgTWlublBvc3QgbWFpbGluZyBsaXN0Lic7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdwZW5kaW5nJzpcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnV2UgaGF2ZSBhZGRlZCB5b3UgdG8gdGhlIE1pbm5Qb3N0IG1haWxpbmcgbGlzdC4gWW91IHdpbGwgbmVlZCB0byBjbGljayB0aGUgY29uZmlybWF0aW9uIGxpbmsgaW4gdGhlIGVtYWlsIHdlIHNlbnQgdG8gYmVnaW4gcmVjZWl2aW5nIG1lc3NhZ2VzLic7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfSovXG4gICAgICAgICAgICAgIC8vY29uZmlybWZvcm0uZ2V0KDApLnN1Ym1pdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uZmlybWZvcm0uZ2V0KDApLnN1Ym1pdCgpO1xuICAgICAgICAgICAgLy8kKCcubS1ob2xkLW1lc3NhZ2UnKS5odG1sKCc8ZGl2IGNsYXNzPVwibS1mb3JtLW1lc3NhZ2UgbS1mb3JtLW1lc3NhZ2UtaW5mb1wiPicgKyBtZXNzYWdlICsgJzwvZGl2PicpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmZhaWwoZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIC8vIHdlIHNob3VsZCBwdXQgYW4gYWN0dWFsIGVycm9yIG1lc3NhZ2UgaGVyZSBzb21lZGF5LCBwcm9iYWJseVxuICAgICAgICAgICAgLy8kKCcubS1ob2xkLW1lc3NhZ2UnKS5odG1sKCc8ZGl2IGNsYXNzPVwibS1mb3JtLW1lc3NhZ2UgbS1mb3JtLW1lc3NhZ2UtaW5mb1wiPkFuIGVycm9yIGhhcyBvY2N1cmVkLiBQbGVhc2UgdHJ5IGFnYWluLjwvZGl2PicpO1xuICAgICAgICAgICAgY29uZmlybWZvcm0uZ2V0KDApLnN1Ym1pdCgpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0gZWxzZSB7IC8vIGVuZCBwYXJ0IHdoZXJlIHNldHRpbmdzIGNoYW5nZWRcbiAgICAgICAgICBjb25maXJtZm9ybS5nZXQoMCkuc3VibWl0KCk7XG4gICAgICAgIH1cblxuICAgICAgfSk7XG4gICAgICAvL3JldHVybiBmYWxzZTtcbiAgICB9LCAvLyBjb25maXJtTWVzc2FnZVN1Ym1pdFxuXG4gIH07IC8vIHBsdWdpbi5wcm90b3R5cGVcblxuICAvLyBBIHJlYWxseSBsaWdodHdlaWdodCBwbHVnaW4gd3JhcHBlciBhcm91bmQgdGhlIGNvbnN0cnVjdG9yLFxuICAvLyBwcmV2ZW50aW5nIGFnYWluc3QgbXVsdGlwbGUgaW5zdGFudGlhdGlvbnNcbiAgJC5mbltwbHVnaW5OYW1lXSA9IGZ1bmN0aW9uICggb3B0aW9ucyApIHtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICghJC5kYXRhKHRoaXMsICdwbHVnaW5fJyArIHBsdWdpbk5hbWUpKSB7XG4gICAgICAgICQuZGF0YSh0aGlzLCAncGx1Z2luXycgKyBwbHVnaW5OYW1lLCBuZXcgUGx1Z2luKCB0aGlzLCBvcHRpb25zICkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG59KSggalF1ZXJ5LCB3aW5kb3csIGRvY3VtZW50ICk7Il19
