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
    'pay_cc_processing_selector': 'input[id="pay-fees"]',
    'fee_amount': '.processing-amount',
    'level_amount_selector': '#panel--pay .amount .level-amount',
    // we can maybe get rid of this
    'original_amount_selector': '[name="amount"]',
    'fair_market_value_selector': '#fair_market_value',
    'frequency_selector': '.frequency',
    'full_amount_selector': '.full-amount',
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

        this.paymentRequestElement(this.element, this.options); // add paymentRequest element

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
    creditCardProcessingFees: function creditCardProcessingFees(options, reset) {
      // this adds or subtracts the fee to the original amount when the user indicates they do or do not want to pay the fees
      var that = this;
      that.creditCardFeeCheckbox($(this.options.pay_cc_processing_selector));
      $(this.options.pay_cc_processing_selector).on('change', function () {
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
    paymentRequestElement: function paymentRequestElement(element, options) {
      var that = this;
      var amount = that.options.amount;
      /**
       * Payment Request Element
       */

      var paymentRequest = that.stripe.paymentRequest({
        country: "US",
        currency: "usd",
        total: {
          amount: amount,
          label: "MinnPost"
        },
        requestPayerName: true,
        requestPayerEmail: true
        /*requestShipping: true,
        shippingOptions: [
          {
            id: "free-shipping",
            label: "Free shipping",
            detail: "Arrives in 5 to 7 days",
            amount: 0
          }
        ]*/

      });
      that.prButton = that.elements.create('paymentRequestButton', {
        paymentRequest: paymentRequest
      }); // Check the availability of the Payment Request API first.

      paymentRequest.canMakePayment().then(function (result) {
        if (result) {
          that.prButton.mount('#payment-request-button');
        } else {
          document.getElementById('payment-request-button').style.display = 'none';
        }
      });
      paymentRequest.on('token', function (event) {
        that.stripeTokenHandler(event, 'payment_request');
      });
    },
    // paymentRequestMethod
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
    hasHtml5Validation: function hasHtml5Validation(element, options) {
      //this.debug('value is ' + typeof document.createElement('input').checkValidity === 'function');
      return typeof document.createElement('input').checkValidity === 'function';
    },
    // hasHtml5Validation
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

      $('.card-instruction.' + which_error).removeClass('invalid');
      $('.card-instruction.' + which_error).empty();

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
      } else if (type === 'payment_request') {
        supportform.append($('<input type=\"hidden\" name=\"stripeToken\">').val(token.token.id));
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
        if (type === 'payment_request') {
          if (response.ok) {
            // Report to the browser that the payment was successful, prompting
            // it to close the browser payment interface.
            token.complete('success');
          } else {
            // Report to the browser that the payment failed, prompting it to
            // re-show the payment interface, or show an error message and close
            // the payment interface.
            token.complete('fail');
          }
        }

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
              $(that.options[field]).addClass('error');
              $(that.options[field]).prev().addClass('error');
              $(that.options[field]).after('<span class="check-field invalid">' + message + '</span>');
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
                $('button.give').before('<p class="recaptcha-error">' + message + '</p>');
              }

              if (error.type == 'invalid_request_error') {
                $('button.give').before('<p class="error error-invalid-request">' + error.message + '</p>');
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
                newsletter_group_html += '<div class="form-item form-item--newsletter">';
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0cmlwZS5wYXltZW50LmpzIiwibWlubnBvc3QuZ2l2aW5nLmpzIl0sIm5hbWVzIjpbImYiLCJleHBvcnRzIiwibW9kdWxlIiwiZGVmaW5lIiwiYW1kIiwiZyIsIndpbmRvdyIsImdsb2JhbCIsInNlbGYiLCJwYXltZW50IiwianMiLCJlIiwidCIsIm4iLCJyIiwicyIsIm8iLCJ1IiwiYSIsInJlcXVpcmUiLCJpIiwiRXJyb3IiLCJjb2RlIiwibCIsImNhbGwiLCJsZW5ndGgiLCJRSiIsInJyZXR1cm4iLCJydHJpbSIsInNlbGVjdG9yIiwiaXNET01FbGVtZW50IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZWwiLCJub2RlTmFtZSIsInRyaW0iLCJ0ZXh0IiwicmVwbGFjZSIsInZhbCIsInJldCIsImFyZ3VtZW50cyIsInZhbHVlIiwicHJldmVudERlZmF1bHQiLCJldmVudE9iamVjdCIsInJldHVyblZhbHVlIiwibm9ybWFsaXplRXZlbnQiLCJvcmlnaW5hbCIsIndoaWNoIiwidGFyZ2V0Iiwic3JjRWxlbWVudCIsIm9yaWdpbmFsRXZlbnQiLCJkYXRhIiwiZGV0YWlsIiwiY2hhckNvZGUiLCJrZXlDb2RlIiwib24iLCJlbGVtZW50IiwiZXZlbnROYW1lIiwiY2FsbGJhY2siLCJqIiwibGVuIiwibGVuMSIsIm11bHRFdmVudE5hbWUiLCJvcmlnaW5hbENhbGxiYWNrIiwicmVmIiwibWF0Y2giLCJzcGxpdCIsImFkZEV2ZW50TGlzdGVuZXIiLCJhdHRhY2hFdmVudCIsImFkZENsYXNzIiwiY2xhc3NOYW1lIiwicmVzdWx0cyIsInB1c2giLCJjbGFzc0xpc3QiLCJhZGQiLCJoYXNDbGFzcyIsImNvbnRhaW5zIiwiUmVnRXhwIiwidGVzdCIsInJlbW92ZUNsYXNzIiwiY2xzIiwicmVtb3ZlIiwiam9pbiIsInRvZ2dsZUNsYXNzIiwiYm9vbCIsImFwcGVuZCIsInRvQXBwZW5kIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwiZmluZCIsIk5vZGVMaXN0IiwiQXJyYXkiLCJ0cmlnZ2VyIiwibmFtZSIsImVycm9yIiwiZXYiLCJDdXN0b21FdmVudCIsImNyZWF0ZUV2ZW50IiwiaW5pdEN1c3RvbUV2ZW50IiwiaW5pdEV2ZW50IiwiZGlzcGF0Y2hFdmVudCIsIlBheW1lbnQiLCJjYXJkRnJvbU51bWJlciIsImNhcmRGcm9tVHlwZSIsImNhcmRzIiwiZGVmYXVsdEZvcm1hdCIsImZvcm1hdEJhY2tDYXJkTnVtYmVyIiwiZm9ybWF0QmFja0V4cGlyeSIsImZvcm1hdENhcmROdW1iZXIiLCJmb3JtYXRFeHBpcnkiLCJmb3JtYXRGb3J3YXJkRXhwaXJ5IiwiZm9ybWF0Rm9yd2FyZFNsYXNoIiwiZm9ybWF0TW9udGhFeHBpcnkiLCJoYXNUZXh0U2VsZWN0ZWQiLCJsdWhuQ2hlY2siLCJyZUZvcm1hdENhcmROdW1iZXIiLCJyZXN0cmljdENWQyIsInJlc3RyaWN0Q2FyZE51bWJlciIsInJlc3RyaWN0Q29tYmluZWRFeHBpcnkiLCJyZXN0cmljdEV4cGlyeSIsInJlc3RyaWN0TW9udGhFeHBpcnkiLCJyZXN0cmljdE51bWVyaWMiLCJyZXN0cmljdFllYXJFeHBpcnkiLCJzZXRDYXJkVHlwZSIsImluZGV4T2YiLCJpdGVtIiwidHlwZSIsInBhdHRlcm4iLCJmb3JtYXQiLCJjdmNMZW5ndGgiLCJsdWhuIiwibnVtIiwiY2FyZCIsImRpZ2l0IiwiZGlnaXRzIiwib2RkIiwic3VtIiwicmV2ZXJzZSIsInBhcnNlSW50Iiwic2VsZWN0aW9uU3RhcnQiLCJzZWxlY3Rpb25FbmQiLCJzZWxlY3Rpb24iLCJjcmVhdGVSYW5nZSIsInNldFRpbWVvdXQiLCJfdGhpcyIsImZucyIsInJlIiwidXBwZXJMZW5ndGgiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJtZXRhIiwic2xhc2giLCJtZXRhS2V5IiwiaW5wdXQiLCJjdHJsS2V5IiwiYWxsVHlwZXMiLCJjYXJkVHlwZSIsImNhcmRFeHBpcnlWYWwiLCJtb250aCIsInByZWZpeCIsInllYXIiLCJEYXRlIiwiZ2V0RnVsbFllYXIiLCJ0b1N0cmluZyIsInNsaWNlIiwidmFsaWRhdGVDYXJkTnVtYmVyIiwidmFsaWRhdGVDYXJkRXhwaXJ5IiwiY3VycmVudFRpbWUiLCJleHBpcnkiLCJzZXRNb250aCIsImdldE1vbnRoIiwidmFsaWRhdGVDYXJkQ1ZDIiwiY3ZjIiwicmVmMSIsImdyb3VwcyIsImV4ZWMiLCJzaGlmdCIsImZvcm1hdENhcmRDVkMiLCJmb3JtYXRDYXJkRXhwaXJ5IiwiZm9ybWF0Q2FyZEV4cGlyeU11bHRpcGxlIiwiZ2V0Q2FyZEFycmF5Iiwic2V0Q2FyZEFycmF5IiwiY2FyZEFycmF5IiwiYWRkVG9DYXJkQXJyYXkiLCJjYXJkT2JqZWN0IiwicmVtb3ZlRnJvbUNhcmRBcnJheSIsImtleSIsInNwbGljZSIsIiQiLCJ1bmRlZmluZWQiLCJwbHVnaW5OYW1lIiwiZGVmYXVsdHMiLCJQbHVnaW4iLCJvcHRpb25zIiwiZXh0ZW5kIiwiX2RlZmF1bHRzIiwiX25hbWUiLCJpbml0IiwicHJvdG90eXBlIiwicmVzZXQiLCJhbW91bnQiLCJkb2N1bWVudEVsZW1lbnQiLCJwYXJzZUZsb2F0IiwibGV2ZWxfYW1vdW50X3NlbGVjdG9yIiwib3JpZ2luYWxfYW1vdW50Iiwib3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yIiwiZnJlcXVlbmN5IiwiZnJlcXVlbmN5X3NlbGVjdG9yIiwiYXR0ciIsInJlY3VycmluZyIsInJlY3VycmluZ19zZWxlY3RvciIsImNoYXJBdCIsInRvVXBwZXJDYXNlIiwicHJvY2Vzc2luZ19mZWUiLCJNYXRoIiwicm91bmQiLCJmZWVfYW1vdW50IiwicG93IiwidG9GaXhlZCIsInByb2Nlc3NpbmdfZmVlX3RleHQiLCJjcmVhdGVfYWNjb3VudCIsImJ1dHRvbl90ZXh0Iiwic3RyaXBlIiwiU3RyaXBlIiwic3RyaXBlX3B1Ymxpc2hhYmxlX2tleSIsImVsZW1lbnRzIiwicmVmZXJyZXIiLCJwcm9wIiwiZGVidWciLCJxdWVyeV9wYW5lbCIsInFzIiwicXVlcnkiLCJhY3RpdmUiLCJ0YWJOYXZpZ2F0aW9uIiwiYW1vdW50QXNSYWRpbyIsImFtb3VudFVwZGF0ZWQiLCJwYXlfY2NfcHJvY2Vzc2luZ19zZWxlY3RvciIsImNyZWRpdENhcmRQcm9jZXNzaW5nRmVlcyIsImRvbmF0ZV9zdGVwX3NlbGVjdG9yIiwibGV2ZWwiLCJjaGVja0xldmVsIiwibGV2ZWxudW0iLCJkb25hdGVBbm9ueW1vdXNseSIsImhvbm9yT3JNZW1vcnlUb2dnbGUiLCJvdXRzaWRlVW5pdGVkU3RhdGVzIiwic2hpcHBpbmdBZGRyZXNzIiwiYWxsb3dNaW5ucG9zdEFjY291bnQiLCJjaG9vc2VQYXltZW50TWV0aG9kIiwicGF5bWVudFJlcXVlc3RFbGVtZW50IiwiY3JlZGl0Q2FyZEZpZWxkcyIsImFjaEZpZWxkcyIsInZhbGlkYXRlQW5kU3VibWl0IiwiY29uZmlybV9zdGVwX3NlbGVjdG9yIiwic2hvd05ld3NsZXR0ZXJTZXR0aW5ncyIsImNvbmZpcm1NZXNzYWdlU3VibWl0IiwiYiIsInAiLCJkZWNvZGVVUklDb21wb25lbnQiLCJsb2NhdGlvbiIsInNlYXJjaCIsInN1YnN0ciIsIm1lc3NhZ2UiLCJjb25zb2xlIiwibG9nIiwiZGlyIiwiZ2V0UXVlcnlTdHJpbmdzIiwibGluayIsInN0ZXAiLCJpbmRleCIsIm5hdl9pdGVtX2NvdW50Iiwib3BwX2lkIiwib3BwX2lkX3NlbGVjdG9yIiwibmV4dF9zdGVwIiwicG9zdF9wdXJjaGFzZSIsImNvbmZpcm0iLCJjb25maXJtX2J1dHRvbl9zZWxlY3RvciIsImFuYWx5dGljc1RyYWNraW5nU3RlcCIsInNob3ciLCJwYXJlbnQiLCJnYSIsInRvTG93ZXJDYXNlIiwicGFnZSIsInBhdGhuYW1lIiwidGl0bGUiLCJjaGFuZ2UiLCJpcyIsInRoYXQiLCJwYXltZW50X3R5cGUiLCJjaG9vc2VfcGF5bWVudCIsImFtb3VudF9zZWxlY3Rvcl9mYWlyX21hcmtldCIsInNldEZhaXJNYXJrZXRWYWx1ZSIsImNhbGN1bGF0ZUZlZXMiLCJhZGRpdGlvbmFsX2Ftb3VudF9maWVsZCIsImFtb3VudF9zZWxlY3RvciIsImZhaXJfbWFya2V0X3ZhbHVlX3NlbGVjdG9yIiwiZmFpck1hcmtldFZhbHVlIiwic3RyaXBlX3BheW1lbnRfdHlwZSIsInRvdGFsX2Ftb3VudCIsImFkZGl0aW9uYWxfYW1vdW50Iiwic2V0U3RyaXBlUGF5bWVudFR5cGUiLCJhamF4IiwibWV0aG9kIiwidXJsIiwiZG9uZSIsImZlZXMiLCJjcmVkaXRDYXJkRmVlQ2hlY2tib3giLCJkb25hdGVfZm9ybV9zZWxlY3RvciIsImZpZWxkIiwiZnVsbF9hbW91bnQiLCJmdWxsX2Ftb3VudF9zZWxlY3RvciIsImFub255bW91c19zZWxlY3RvciIsIm5hbWVfc2VsZWN0b3IiLCJoaWRlIiwicmV0dXJudmFsdWUiLCJhbW91bnRfeWVhcmx5IiwiZWFjaCIsImxldmVscyIsIm1heCIsIm1pbiIsImhvbm9yT3JNZW1vcnkiLCJob25vcl9vcl9tZW1vcnlfY2hvb3NlciIsImhvbm9yX21lbW9yeV9pbnB1dF9ncm91cCIsImhvbm9yX3R5cGVfc2VsZWN0b3IiLCJob25vcl9uYW1lX3NlbGVjdG9yIiwic2hvd19iaWxsaW5nX2NvdW50cnlfc2VsZWN0b3IiLCJjbGljayIsImJpbGxpbmdfY291bnRyeV9zZWxlY3RvciIsInNob3dfc2hpcHBpbmdfY291bnRyeV9zZWxlY3RvciIsInNoaXBwaW5nX2NvdW50cnlfc2VsZWN0b3IiLCJzaG93X3NoaXBwaW5nIiwidXNlX2Zvcl9zaGlwcGluZ19zZWxlY3RvciIsInNoaXBwaW5nX3NlbGVjdG9yIiwiY2hhbmdlZCIsImFjY291bnRfZXhpc3RzIiwiZW1haWxfZmllbGRfc2VsZWN0b3IiLCJkb25lVHlwaW5nIiwiZW1haWwiLCJjaGVja01pbm5wb3N0QWNjb3VudCIsInR5cGluZ1RpbWVyIiwiZG9uZVR5cGluZ0ludGVydmFsIiwia2V5dXAiLCJjbGVhclRpbWVvdXQiLCJjcmVhdGVfbXBfc2VsZWN0b3IiLCJwYXNzd29yZF9zZWxlY3RvciIsImJlZm9yZSIsImdldCIsIm5leHQiLCJ0b2dnbGUiLCJ1c2VyIiwibWlubnBvc3Rfcm9vdCIsInJlc3VsdCIsInN0YXR1cyIsInJlYXNvbiIsImNoZWNrZWQiLCJjaGVja2VkX3ZhbHVlIiwic2V0dXBQYXltZW50TWV0aG9kIiwiZXZlbnQiLCJpZCIsInBheW1lbnRSZXF1ZXN0IiwiY291bnRyeSIsImN1cnJlbmN5IiwidG90YWwiLCJsYWJlbCIsInJlcXVlc3RQYXllck5hbWUiLCJyZXF1ZXN0UGF5ZXJFbWFpbCIsInByQnV0dG9uIiwiY3JlYXRlIiwiY2FuTWFrZVBheW1lbnQiLCJ0aGVuIiwibW91bnQiLCJnZXRFbGVtZW50QnlJZCIsInN0eWxlIiwiZGlzcGxheSIsInN0cmlwZVRva2VuSGFuZGxlciIsInBheW1lbnRfbWV0aG9kX3NlbGVjdG9yIiwiYmFzZSIsImljb25Db2xvciIsImxpbmVIZWlnaHQiLCJmb250V2VpZ2h0IiwiZm9udEZhbWlseSIsImZvbnRTaXplIiwiY2FyZE51bWJlckVsZW1lbnQiLCJjY19udW1fc2VsZWN0b3IiLCJjYXJkRXhwaXJ5RWxlbWVudCIsImNjX2V4cF9zZWxlY3RvciIsImNhcmRDdmNFbGVtZW50IiwiY2NfY3Z2X3NlbGVjdG9yIiwic3RyaXBlRXJyb3JEaXNwbGF5IiwiYnV0dG9uU3RhdHVzIiwiYnJhbmQiLCJzZXRCcmFuZEljb24iLCJjYXJkQnJhbmRUb1BmQ2xhc3MiLCJicmFuZEljb25FbGVtZW50IiwicGZDbGFzcyIsImJhbmtUb2tlbkZpZWxkTmFtZSIsImJhbmtUb2tlbkZpZWxkIiwicGxhaWRfZW52IiwiUGxhaWQiLCJsaW5rSGFuZGxlciIsInNlbGVjdEFjY291bnQiLCJhcGlWZXJzaW9uIiwiZW52IiwiY2xpZW50TmFtZSIsInBsYWlkX3B1YmxpY19rZXkiLCJwcm9kdWN0Iiwib25Mb2FkIiwib25TdWNjZXNzIiwicHVibGljX3Rva2VuIiwibWV0YWRhdGEiLCJzdXBwb3J0Zm9ybSIsImFjY291bnRfaWQiLCJzZXJpYWxpemUiLCJyZXNwb25zZSIsInBsYWlkX2xpbmsiLCJhZnRlciIsInN0cmlwZV9iYW5rX2FjY291bnRfdG9rZW4iLCJwcmVwZW5kIiwiaHRtbCIsImNvbnRlbnRzIiwidW53cmFwIiwib25FeGl0IiwiZXJyIiwib3BlbiIsImhhc0h0bWw1VmFsaWRhdGlvbiIsImNyZWF0ZUVsZW1lbnQiLCJjaGVja1ZhbGlkaXR5IiwiYnV0dG9uIiwiZGlzYWJsZWQiLCJzdWJtaXQiLCJhbmltYXRlIiwic2Nyb2xsVG9wIiwib2Zmc2V0IiwidG9wIiwidmFsaWQiLCJ0b2tlbkRhdGEiLCJnZW5lcmF0ZVRva2VuRGF0YSIsImZpcnN0X25hbWUiLCJmaXJzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yIiwibGFzdF9uYW1lIiwibGFzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yIiwicGFzc3dvcmQiLCJwYXNzd29yZF9maWVsZF9zZWxlY3RvciIsImNpdHkiLCJhY2NvdW50X2NpdHlfc2VsZWN0b3IiLCJzdGF0ZSIsImFjY291bnRfc3RhdGVfc2VsZWN0b3IiLCJ6aXAiLCJhY2NvdW50X3ppcF9zZWxlY3RvciIsImNyZWF0ZVRva2VuIiwidGhpc19zZWxlY3RvciIsIndoaWNoX2Vycm9yIiwiZW1wdHkiLCJmdWxsX25hbWUiLCJzdHJlZXQiLCJhZGRyZXNzX2xpbmUxIiwiYWRkcmVzc19jaXR5IiwiYWRkcmVzc19zdGF0ZSIsImFkZHJlc3NfemlwIiwiYWRkcmVzc19jb3VudHJ5IiwicHJldiIsInRva2VuIiwiYWpheF91cmwiLCJ0b2tlbkZpZWxkTmFtZSIsInRva2VuRmllbGQiLCJjYWNoZSIsIm9rIiwiY29tcGxldGUiLCJlcnJvcnMiLCJzdHJpcGVFcnJvclNlbGVjdG9yIiwibmV3c2xldHRlcl9ncm91cF9odG1sIiwibmV3c2xldHRlcl9ncm91cF9zZWxlY3RvciIsImdldF9kYXRhIiwic2hvcnRjb2RlIiwicGxhY2VtZW50IiwiZ3JvdXBfZmllbGRzIiwiY2F0ZWdvcnkiLCJtYWlsY2hpbXBfc3RhdHVzIiwibWFpbGNoaW1wX3VzZXJfaWQiLCJleGlzdGluZ19uZXdzbGV0dGVyX3NldHRpbmdzIiwiY29uZmlybV9mb3JtX3NlbGVjdG9yIiwiY29uZmlybWZvcm0iLCJuZXdzbGV0dGVyX2dyb3VwcyIsIm5ld19uZXdzbGV0dGVyX3NldHRpbmdzIiwicG9zdF9kYXRhIiwiZ3JvdXBzX3N1Ym1pdHRlZCIsImdyb3Vwc19hdmFpbGFibGUiLCJncm91cCIsImRhdGFUeXBlIiwiY29udGVudFR5cGUiLCJKU09OIiwic3RyaW5naWZ5Iiwic3VjY2VzcyIsImZhaWwiLCJmbiIsImpRdWVyeSJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLENBQUMsVUFBU0EsQ0FBVCxFQUFXO0FBQUMsTUFBRyxRQUFPQyxPQUFQLHlDQUFPQSxPQUFQLE9BQWlCLFFBQWpCLElBQTJCLE9BQU9DLE1BQVAsS0FBZ0IsV0FBOUMsRUFBMEQ7QUFBQ0EsSUFBQUEsTUFBTSxDQUFDRCxPQUFQLEdBQWVELENBQUMsRUFBaEI7QUFBbUIsR0FBOUUsTUFBbUYsSUFBRyxPQUFPRyxNQUFQLEtBQWdCLFVBQWhCLElBQTRCQSxNQUFNLENBQUNDLEdBQXRDLEVBQTBDO0FBQUNELElBQUFBLE1BQU0sQ0FBQyxFQUFELEVBQUlILENBQUosQ0FBTjtBQUFhLEdBQXhELE1BQTREO0FBQUMsUUFBSUssQ0FBSjs7QUFBTSxRQUFHLE9BQU9DLE1BQVAsS0FBZ0IsV0FBbkIsRUFBK0I7QUFBQ0QsTUFBQUEsQ0FBQyxHQUFDQyxNQUFGO0FBQVMsS0FBekMsTUFBOEMsSUFBRyxPQUFPQyxNQUFQLEtBQWdCLFdBQW5CLEVBQStCO0FBQUNGLE1BQUFBLENBQUMsR0FBQ0UsTUFBRjtBQUFTLEtBQXpDLE1BQThDLElBQUcsT0FBT0MsSUFBUCxLQUFjLFdBQWpCLEVBQTZCO0FBQUNILE1BQUFBLENBQUMsR0FBQ0csSUFBRjtBQUFPLEtBQXJDLE1BQXlDO0FBQUNILE1BQUFBLENBQUMsR0FBQyxJQUFGO0FBQU87O0FBQUEsS0FBQ0EsQ0FBQyxDQUFDSSxPQUFGLEtBQWNKLENBQUMsQ0FBQ0ksT0FBRixHQUFZLEVBQTFCLENBQUQsRUFBZ0NDLEVBQWhDLEdBQXFDVixDQUFDLEVBQXRDO0FBQXlDO0FB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REQsTUE0RE87QUFBRTtBQUNQb0QsVUFBQUEsV0FBVyxDQUFDdkksR0FBWixDQUFnQixDQUFoQixFQUFtQm1GLE1BQW5CO0FBQ0Q7QUFFRixPQTFFRCxFQUwrQyxDQWdGL0M7QUFDRCxLQXh2Q2dCLENBd3ZDZDs7QUF4dkNjLEdBQW5CLENBbkg0QyxDQTYyQ3pDO0FBRUg7QUFDQTs7QUFDQWhQLEVBQUFBLENBQUMsQ0FBQ2lULEVBQUYsQ0FBSy9TLFVBQUwsSUFBbUIsVUFBV0csT0FBWCxFQUFxQjtBQUN0QyxXQUFPLEtBQUswSCxJQUFMLENBQVUsWUFBWTtBQUMzQixVQUFJLENBQUMvSCxDQUFDLENBQUN4SSxJQUFGLENBQU8sSUFBUCxFQUFhLFlBQVkwSSxVQUF6QixDQUFMLEVBQTJDO0FBQ3pDRixRQUFBQSxDQUFDLENBQUN4SSxJQUFGLENBQU8sSUFBUCxFQUFhLFlBQVkwSSxVQUF6QixFQUFxQyxJQUFJRSxNQUFKLENBQVksSUFBWixFQUFrQkMsT0FBbEIsQ0FBckM7QUFDRDtBQUNGLEtBSk0sQ0FBUDtBQUtELEdBTkQ7QUFRRCxDQXozQ0EsRUF5M0NHNlMsTUF6M0NILEVBeTNDV3ZlLE1BejNDWCxFQXkzQ21CeUIsUUF6M0NuQiIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKGYpe2lmKHR5cGVvZiBleHBvcnRzPT09XCJvYmplY3RcIiYmdHlwZW9mIG1vZHVsZSE9PVwidW5kZWZpbmVkXCIpe21vZHVsZS5leHBvcnRzPWYoKX1lbHNlIGlmKHR5cGVvZiBkZWZpbmU9PT1cImZ1bmN0aW9uXCImJmRlZmluZS5hbWQpe2RlZmluZShbXSxmKX1lbHNle3ZhciBnO2lmKHR5cGVvZiB3aW5kb3chPT1cInVuZGVmaW5lZFwiKXtnPXdpbmRvd31lbHNlIGlmKHR5cGVvZiBnbG9iYWwhPT1cInVuZGVmaW5lZFwiKXtnPWdsb2JhbH1lbHNlIGlmKHR5cGVvZiBzZWxmIT09XCJ1bmRlZmluZWRcIil7Zz1zZWxmfWVsc2V7Zz10aGlzfShnLnBheW1lbnQgfHwgKGcucGF5bWVudCA9IHt9KSkuanMgPSBmKCl9fSkoZnVuY3Rpb24oKXt2YXIgZGVmaW5lLG1vZHVsZSxleHBvcnRzO3JldHVybiAoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSh7MTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG52YXIgUUosIHJyZXR1cm4sIHJ0cmltO1xuXG5RSiA9IGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG4gIGlmIChRSi5pc0RPTUVsZW1lbnQoc2VsZWN0b3IpKSB7XG4gICAgcmV0dXJuIHNlbGVjdG9yO1xuICB9XG4gIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbn07XG5cblFKLmlzRE9NRWxlbWVudCA9IGZ1bmN0aW9uKGVsKSB7XG4gIHJldHVybiBlbCAmJiAoZWwubm9kZU5hbWUgIT0gbnVsbCk7XG59O1xuXG5ydHJpbSA9IC9eW1xcc1xcdUZFRkZcXHhBMF0rfFtcXHNcXHVGRUZGXFx4QTBdKyQvZztcblxuUUoudHJpbSA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgaWYgKHRleHQgPT09IG51bGwpIHtcbiAgICByZXR1cm4gXCJcIjtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gKHRleHQgKyBcIlwiKS5yZXBsYWNlKHJ0cmltLCBcIlwiKTtcbiAgfVxufTtcblxucnJldHVybiA9IC9cXHIvZztcblxuUUoudmFsID0gZnVuY3Rpb24oZWwsIHZhbCkge1xuICB2YXIgcmV0O1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICByZXR1cm4gZWwudmFsdWUgPSB2YWw7XG4gIH0gZWxzZSB7XG4gICAgcmV0ID0gZWwudmFsdWU7XG4gICAgaWYgKHR5cGVvZiByZXQgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHJldHVybiByZXQucmVwbGFjZShycmV0dXJuLCBcIlwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHJldCA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG5RSi5wcmV2ZW50RGVmYXVsdCA9IGZ1bmN0aW9uKGV2ZW50T2JqZWN0KSB7XG4gIGlmICh0eXBlb2YgZXZlbnRPYmplY3QucHJldmVudERlZmF1bHQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIGV2ZW50T2JqZWN0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGV2ZW50T2JqZWN0LnJldHVyblZhbHVlID0gZmFsc2U7XG4gIHJldHVybiBmYWxzZTtcbn07XG5cblFKLm5vcm1hbGl6ZUV2ZW50ID0gZnVuY3Rpb24oZSkge1xuICB2YXIgb3JpZ2luYWw7XG4gIG9yaWdpbmFsID0gZTtcbiAgZSA9IHtcbiAgICB3aGljaDogb3JpZ2luYWwud2hpY2ggIT0gbnVsbCA/IG9yaWdpbmFsLndoaWNoIDogdm9pZCAwLFxuICAgIHRhcmdldDogb3JpZ2luYWwudGFyZ2V0IHx8IG9yaWdpbmFsLnNyY0VsZW1lbnQsXG4gICAgcHJldmVudERlZmF1bHQ6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIFFKLnByZXZlbnREZWZhdWx0KG9yaWdpbmFsKTtcbiAgICB9LFxuICAgIG9yaWdpbmFsRXZlbnQ6IG9yaWdpbmFsLFxuICAgIGRhdGE6IG9yaWdpbmFsLmRhdGEgfHwgb3JpZ2luYWwuZGV0YWlsXG4gIH07XG4gIGlmIChlLndoaWNoID09IG51bGwpIHtcbiAgICBlLndoaWNoID0gb3JpZ2luYWwuY2hhckNvZGUgIT0gbnVsbCA/IG9yaWdpbmFsLmNoYXJDb2RlIDogb3JpZ2luYWwua2V5Q29kZTtcbiAgfVxuICByZXR1cm4gZTtcbn07XG5cblFKLm9uID0gZnVuY3Rpb24oZWxlbWVudCwgZXZlbnROYW1lLCBjYWxsYmFjaykge1xuICB2YXIgZWwsIGksIGosIGxlbiwgbGVuMSwgbXVsdEV2ZW50TmFtZSwgb3JpZ2luYWxDYWxsYmFjaywgcmVmO1xuICBpZiAoZWxlbWVudC5sZW5ndGgpIHtcbiAgICBmb3IgKGkgPSAwLCBsZW4gPSBlbGVtZW50Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBlbCA9IGVsZW1lbnRbaV07XG4gICAgICBRSi5vbihlbCwgZXZlbnROYW1lLCBjYWxsYmFjayk7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuICBpZiAoZXZlbnROYW1lLm1hdGNoKFwiIFwiKSkge1xuICAgIHJlZiA9IGV2ZW50TmFtZS5zcGxpdChcIiBcIik7XG4gICAgZm9yIChqID0gMCwgbGVuMSA9IHJlZi5sZW5ndGg7IGogPCBsZW4xOyBqKyspIHtcbiAgICAgIG11bHRFdmVudE5hbWUgPSByZWZbal07XG4gICAgICBRSi5vbihlbGVtZW50LCBtdWx0RXZlbnROYW1lLCBjYWxsYmFjayk7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuICBvcmlnaW5hbENhbGxiYWNrID0gY2FsbGJhY2s7XG4gIGNhbGxiYWNrID0gZnVuY3Rpb24oZSkge1xuICAgIGUgPSBRSi5ub3JtYWxpemVFdmVudChlKTtcbiAgICByZXR1cm4gb3JpZ2luYWxDYWxsYmFjayhlKTtcbiAgfTtcbiAgaWYgKGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgIHJldHVybiBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBjYWxsYmFjaywgZmFsc2UpO1xuICB9XG4gIGlmIChlbGVtZW50LmF0dGFjaEV2ZW50KSB7XG4gICAgZXZlbnROYW1lID0gXCJvblwiICsgZXZlbnROYW1lO1xuICAgIHJldHVybiBlbGVtZW50LmF0dGFjaEV2ZW50KGV2ZW50TmFtZSwgY2FsbGJhY2spO1xuICB9XG4gIGVsZW1lbnRbJ29uJyArIGV2ZW50TmFtZV0gPSBjYWxsYmFjaztcbn07XG5cblFKLmFkZENsYXNzID0gZnVuY3Rpb24oZWwsIGNsYXNzTmFtZSkge1xuICB2YXIgZTtcbiAgaWYgKGVsLmxlbmd0aCkge1xuICAgIHJldHVybiAoZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaSwgbGVuLCByZXN1bHRzO1xuICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgZm9yIChpID0gMCwgbGVuID0gZWwubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgZSA9IGVsW2ldO1xuICAgICAgICByZXN1bHRzLnB1c2goUUouYWRkQ2xhc3MoZSwgY2xhc3NOYW1lKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9KSgpO1xuICB9XG4gIGlmIChlbC5jbGFzc0xpc3QpIHtcbiAgICByZXR1cm4gZWwuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBlbC5jbGFzc05hbWUgKz0gJyAnICsgY2xhc3NOYW1lO1xuICB9XG59O1xuXG5RSi5oYXNDbGFzcyA9IGZ1bmN0aW9uKGVsLCBjbGFzc05hbWUpIHtcbiAgdmFyIGUsIGhhc0NsYXNzLCBpLCBsZW47XG4gIGlmIChlbC5sZW5ndGgpIHtcbiAgICBoYXNDbGFzcyA9IHRydWU7XG4gICAgZm9yIChpID0gMCwgbGVuID0gZWwubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGUgPSBlbFtpXTtcbiAgICAgIGhhc0NsYXNzID0gaGFzQ2xhc3MgJiYgUUouaGFzQ2xhc3MoZSwgY2xhc3NOYW1lKTtcbiAgICB9XG4gICAgcmV0dXJuIGhhc0NsYXNzO1xuICB9XG4gIGlmIChlbC5jbGFzc0xpc3QpIHtcbiAgICByZXR1cm4gZWwuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyBSZWdFeHAoJyhefCApJyArIGNsYXNzTmFtZSArICcoIHwkKScsICdnaScpLnRlc3QoZWwuY2xhc3NOYW1lKTtcbiAgfVxufTtcblxuUUoucmVtb3ZlQ2xhc3MgPSBmdW5jdGlvbihlbCwgY2xhc3NOYW1lKSB7XG4gIHZhciBjbHMsIGUsIGksIGxlbiwgcmVmLCByZXN1bHRzO1xuICBpZiAoZWwubGVuZ3RoKSB7XG4gICAgcmV0dXJuIChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBpLCBsZW4sIHJlc3VsdHM7XG4gICAgICByZXN1bHRzID0gW107XG4gICAgICBmb3IgKGkgPSAwLCBsZW4gPSBlbC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBlID0gZWxbaV07XG4gICAgICAgIHJlc3VsdHMucHVzaChRSi5yZW1vdmVDbGFzcyhlLCBjbGFzc05hbWUpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH0pKCk7XG4gIH1cbiAgaWYgKGVsLmNsYXNzTGlzdCkge1xuICAgIHJlZiA9IGNsYXNzTmFtZS5zcGxpdCgnICcpO1xuICAgIHJlc3VsdHMgPSBbXTtcbiAgICBmb3IgKGkgPSAwLCBsZW4gPSByZWYubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGNscyA9IHJlZltpXTtcbiAgICAgIHJlc3VsdHMucHVzaChlbC5jbGFzc0xpc3QucmVtb3ZlKGNscykpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZWwuY2xhc3NOYW1lID0gZWwuY2xhc3NOYW1lLnJlcGxhY2UobmV3IFJlZ0V4cCgnKF58XFxcXGIpJyArIGNsYXNzTmFtZS5zcGxpdCgnICcpLmpvaW4oJ3wnKSArICcoXFxcXGJ8JCknLCAnZ2knKSwgJyAnKTtcbiAgfVxufTtcblxuUUoudG9nZ2xlQ2xhc3MgPSBmdW5jdGlvbihlbCwgY2xhc3NOYW1lLCBib29sKSB7XG4gIHZhciBlO1xuICBpZiAoZWwubGVuZ3RoKSB7XG4gICAgcmV0dXJuIChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBpLCBsZW4sIHJlc3VsdHM7XG4gICAgICByZXN1bHRzID0gW107XG4gICAgICBmb3IgKGkgPSAwLCBsZW4gPSBlbC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBlID0gZWxbaV07XG4gICAgICAgIHJlc3VsdHMucHVzaChRSi50b2dnbGVDbGFzcyhlLCBjbGFzc05hbWUsIGJvb2wpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH0pKCk7XG4gIH1cbiAgaWYgKGJvb2wpIHtcbiAgICBpZiAoIVFKLmhhc0NsYXNzKGVsLCBjbGFzc05hbWUpKSB7XG4gICAgICByZXR1cm4gUUouYWRkQ2xhc3MoZWwsIGNsYXNzTmFtZSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBRSi5yZW1vdmVDbGFzcyhlbCwgY2xhc3NOYW1lKTtcbiAgfVxufTtcblxuUUouYXBwZW5kID0gZnVuY3Rpb24oZWwsIHRvQXBwZW5kKSB7XG4gIHZhciBlO1xuICBpZiAoZWwubGVuZ3RoKSB7XG4gICAgcmV0dXJuIChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBpLCBsZW4sIHJlc3VsdHM7XG4gICAgICByZXN1bHRzID0gW107XG4gICAgICBmb3IgKGkgPSAwLCBsZW4gPSBlbC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBlID0gZWxbaV07XG4gICAgICAgIHJlc3VsdHMucHVzaChRSi5hcHBlbmQoZSwgdG9BcHBlbmQpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH0pKCk7XG4gIH1cbiAgcmV0dXJuIGVsLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgdG9BcHBlbmQpO1xufTtcblxuUUouZmluZCA9IGZ1bmN0aW9uKGVsLCBzZWxlY3Rvcikge1xuICBpZiAoZWwgaW5zdGFuY2VvZiBOb2RlTGlzdCB8fCBlbCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgZWwgPSBlbFswXTtcbiAgfVxuICByZXR1cm4gZWwucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG59O1xuXG5RSi50cmlnZ2VyID0gZnVuY3Rpb24oZWwsIG5hbWUsIGRhdGEpIHtcbiAgdmFyIGUsIGVycm9yLCBldjtcbiAgdHJ5IHtcbiAgICBldiA9IG5ldyBDdXN0b21FdmVudChuYW1lLCB7XG4gICAgICBkZXRhaWw6IGRhdGFcbiAgICB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBlID0gZXJyb3I7XG4gICAgZXYgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcbiAgICBpZiAoZXYuaW5pdEN1c3RvbUV2ZW50KSB7XG4gICAgICBldi5pbml0Q3VzdG9tRXZlbnQobmFtZSwgdHJ1ZSwgdHJ1ZSwgZGF0YSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV2LmluaXRFdmVudChuYW1lLCB0cnVlLCB0cnVlLCBkYXRhKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGVsLmRpc3BhdGNoRXZlbnQoZXYpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBRSjtcblxuXG59LHt9XSwyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbihmdW5jdGlvbiAoZ2xvYmFsKXtcbnZhciBQYXltZW50LCBRSiwgY2FyZEZyb21OdW1iZXIsIGNhcmRGcm9tVHlwZSwgY2FyZHMsIGRlZmF1bHRGb3JtYXQsIGZvcm1hdEJhY2tDYXJkTnVtYmVyLCBmb3JtYXRCYWNrRXhwaXJ5LCBmb3JtYXRDYXJkTnVtYmVyLCBmb3JtYXRFeHBpcnksIGZvcm1hdEZvcndhcmRFeHBpcnksIGZvcm1hdEZvcndhcmRTbGFzaCwgZm9ybWF0TW9udGhFeHBpcnksIGhhc1RleHRTZWxlY3RlZCwgbHVobkNoZWNrLCByZUZvcm1hdENhcmROdW1iZXIsIHJlc3RyaWN0Q1ZDLCByZXN0cmljdENhcmROdW1iZXIsIHJlc3RyaWN0Q29tYmluZWRFeHBpcnksIHJlc3RyaWN0RXhwaXJ5LCByZXN0cmljdE1vbnRoRXhwaXJ5LCByZXN0cmljdE51bWVyaWMsIHJlc3RyaWN0WWVhckV4cGlyeSwgc2V0Q2FyZFR5cGUsXG4gIGluZGV4T2YgPSBbXS5pbmRleE9mIHx8IGZ1bmN0aW9uKGl0ZW0pIHsgZm9yICh2YXIgaSA9IDAsIGwgPSB0aGlzLmxlbmd0aDsgaSA8IGw7IGkrKykgeyBpZiAoaSBpbiB0aGlzICYmIHRoaXNbaV0gPT09IGl0ZW0pIHJldHVybiBpOyB9IHJldHVybiAtMTsgfTtcblxuUUogPSByZXF1aXJlKCdxai9zcmMvcWouY29mZmVlJyk7XG5cbmRlZmF1bHRGb3JtYXQgPSAvKFxcZHsxLDR9KS9nO1xuXG5jYXJkcyA9IFtcbiAge1xuICAgIHR5cGU6ICdhbWV4JyxcbiAgICBwYXR0ZXJuOiAvXjNbNDddLyxcbiAgICBmb3JtYXQ6IC8oXFxkezEsNH0pKFxcZHsxLDZ9KT8oXFxkezEsNX0pPy8sXG4gICAgbGVuZ3RoOiBbMTVdLFxuICAgIGN2Y0xlbmd0aDogWzRdLFxuICAgIGx1aG46IHRydWVcbiAgfSwge1xuICAgIHR5cGU6ICdkYW5rb3J0JyxcbiAgICBwYXR0ZXJuOiAvXjUwMTkvLFxuICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICBsZW5ndGg6IFsxNl0sXG4gICAgY3ZjTGVuZ3RoOiBbM10sXG4gICAgbHVobjogdHJ1ZVxuICB9LCB7XG4gICAgdHlwZTogJ2RpbmVyc2NsdWInLFxuICAgIHBhdHRlcm46IC9eKDM2fDM4fDMwWzAtNV0pLyxcbiAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgbGVuZ3RoOiBbMTRdLFxuICAgIGN2Y0xlbmd0aDogWzNdLFxuICAgIGx1aG46IHRydWVcbiAgfSwge1xuICAgIHR5cGU6ICdkaXNjb3ZlcicsXG4gICAgcGF0dGVybjogL14oNjAxMXw2NXw2NFs0LTldfDYyMikvLFxuICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICBsZW5ndGg6IFsxNl0sXG4gICAgY3ZjTGVuZ3RoOiBbM10sXG4gICAgbHVobjogdHJ1ZVxuICB9LCB7XG4gICAgdHlwZTogJ2pjYicsXG4gICAgcGF0dGVybjogL14zNS8sXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGxlbmd0aDogWzE2XSxcbiAgICBjdmNMZW5ndGg6IFszXSxcbiAgICBsdWhuOiB0cnVlXG4gIH0sIHtcbiAgICB0eXBlOiAnbGFzZXInLFxuICAgIHBhdHRlcm46IC9eKDY3MDZ8Njc3MXw2NzA5KS8sXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGxlbmd0aDogWzE2LCAxNywgMTgsIDE5XSxcbiAgICBjdmNMZW5ndGg6IFszXSxcbiAgICBsdWhuOiB0cnVlXG4gIH0sIHtcbiAgICB0eXBlOiAnbWFlc3RybycsXG4gICAgcGF0dGVybjogL14oNTAxOHw1MDIwfDUwMzh8NjMwNHw2NzAzfDY3NTl8Njc2WzEtM10pLyxcbiAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgbGVuZ3RoOiBbMTIsIDEzLCAxNCwgMTUsIDE2LCAxNywgMTgsIDE5XSxcbiAgICBjdmNMZW5ndGg6IFszXSxcbiAgICBsdWhuOiB0cnVlXG4gIH0sIHtcbiAgICB0eXBlOiAnbWFzdGVyY2FyZCcsXG4gICAgcGF0dGVybjogL141WzEtNV0vLFxuICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICBsZW5ndGg6IFsxNl0sXG4gICAgY3ZjTGVuZ3RoOiBbM10sXG4gICAgbHVobjogdHJ1ZVxuICB9LCB7XG4gICAgdHlwZTogJ3VuaW9ucGF5JyxcbiAgICBwYXR0ZXJuOiAvXjYyLyxcbiAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgbGVuZ3RoOiBbMTYsIDE3LCAxOCwgMTldLFxuICAgIGN2Y0xlbmd0aDogWzNdLFxuICAgIGx1aG46IGZhbHNlXG4gIH0sIHtcbiAgICB0eXBlOiAndmlzYWVsZWN0cm9uJyxcbiAgICBwYXR0ZXJuOiAvXjQoMDI2fDE3NTAwfDQwNXw1MDh8ODQ0fDkxWzM3XSkvLFxuICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICBsZW5ndGg6IFsxNl0sXG4gICAgY3ZjTGVuZ3RoOiBbM10sXG4gICAgbHVobjogdHJ1ZVxuICB9LCB7XG4gICAgdHlwZTogJ3Zpc2EnLFxuICAgIHBhdHRlcm46IC9eNC8sXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGxlbmd0aDogWzEzLCAxNl0sXG4gICAgY3ZjTGVuZ3RoOiBbM10sXG4gICAgbHVobjogdHJ1ZVxuICB9LCB7XG4gICAgdHlwZTogJ2VsbycsXG4gICAgcGF0dGVybjogL140MDExfDQzODkzNXw0NSgxNDE2fDc2KXw1MCg0MTc1fDY2OTl8Njd8OTBbNC03XSl8NjMoNjI5N3w2MzY4KS8sXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGxlbmd0aDogWzE2XSxcbiAgICBjdmNMZW5ndGg6IFszXSxcbiAgICBsdWhuOiB0cnVlXG4gIH1cbl07XG5cbmNhcmRGcm9tTnVtYmVyID0gZnVuY3Rpb24obnVtKSB7XG4gIHZhciBjYXJkLCBpLCBsZW47XG4gIG51bSA9IChudW0gKyAnJykucmVwbGFjZSgvXFxEL2csICcnKTtcbiAgZm9yIChpID0gMCwgbGVuID0gY2FyZHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBjYXJkID0gY2FyZHNbaV07XG4gICAgaWYgKGNhcmQucGF0dGVybi50ZXN0KG51bSkpIHtcbiAgICAgIHJldHVybiBjYXJkO1xuICAgIH1cbiAgfVxufTtcblxuY2FyZEZyb21UeXBlID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIgY2FyZCwgaSwgbGVuO1xuICBmb3IgKGkgPSAwLCBsZW4gPSBjYXJkcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGNhcmQgPSBjYXJkc1tpXTtcbiAgICBpZiAoY2FyZC50eXBlID09PSB0eXBlKSB7XG4gICAgICByZXR1cm4gY2FyZDtcbiAgICB9XG4gIH1cbn07XG5cbmx1aG5DaGVjayA9IGZ1bmN0aW9uKG51bSkge1xuICB2YXIgZGlnaXQsIGRpZ2l0cywgaSwgbGVuLCBvZGQsIHN1bTtcbiAgb2RkID0gdHJ1ZTtcbiAgc3VtID0gMDtcbiAgZGlnaXRzID0gKG51bSArICcnKS5zcGxpdCgnJykucmV2ZXJzZSgpO1xuICBmb3IgKGkgPSAwLCBsZW4gPSBkaWdpdHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBkaWdpdCA9IGRpZ2l0c1tpXTtcbiAgICBkaWdpdCA9IHBhcnNlSW50KGRpZ2l0LCAxMCk7XG4gICAgaWYgKChvZGQgPSAhb2RkKSkge1xuICAgICAgZGlnaXQgKj0gMjtcbiAgICB9XG4gICAgaWYgKGRpZ2l0ID4gOSkge1xuICAgICAgZGlnaXQgLT0gOTtcbiAgICB9XG4gICAgc3VtICs9IGRpZ2l0O1xuICB9XG4gIHJldHVybiBzdW0gJSAxMCA9PT0gMDtcbn07XG5cbmhhc1RleHRTZWxlY3RlZCA9IGZ1bmN0aW9uKHRhcmdldCkge1xuICB2YXIgcmVmO1xuICBpZiAoKHRhcmdldC5zZWxlY3Rpb25TdGFydCAhPSBudWxsKSAmJiB0YXJnZXQuc2VsZWN0aW9uU3RhcnQgIT09IHRhcmdldC5zZWxlY3Rpb25FbmQpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAoKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBkb2N1bWVudCAhPT0gbnVsbCA/IChyZWYgPSBkb2N1bWVudC5zZWxlY3Rpb24pICE9IG51bGwgPyByZWYuY3JlYXRlUmFuZ2UgOiB2b2lkIDAgOiB2b2lkIDApICE9IG51bGwpIHtcbiAgICBpZiAoZG9jdW1lbnQuc2VsZWN0aW9uLmNyZWF0ZVJhbmdlKCkudGV4dCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbnJlRm9ybWF0Q2FyZE51bWJlciA9IGZ1bmN0aW9uKGUpIHtcbiAgcmV0dXJuIHNldFRpbWVvdXQoKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHRhcmdldCwgdmFsdWU7XG4gICAgICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICAgIHZhbHVlID0gUUoudmFsKHRhcmdldCk7XG4gICAgICB2YWx1ZSA9IFBheW1lbnQuZm5zLmZvcm1hdENhcmROdW1iZXIodmFsdWUpO1xuICAgICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIHZhbHVlKTtcbiAgICB9O1xuICB9KSh0aGlzKSk7XG59O1xuXG5mb3JtYXRDYXJkTnVtYmVyID0gZnVuY3Rpb24oZSkge1xuICB2YXIgY2FyZCwgZGlnaXQsIGxlbmd0aCwgcmUsIHRhcmdldCwgdXBwZXJMZW5ndGgsIHZhbHVlO1xuICBkaWdpdCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZS53aGljaCk7XG4gIGlmICghL15cXGQrJC8udGVzdChkaWdpdCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gIHZhbHVlID0gUUoudmFsKHRhcmdldCk7XG4gIGNhcmQgPSBjYXJkRnJvbU51bWJlcih2YWx1ZSArIGRpZ2l0KTtcbiAgbGVuZ3RoID0gKHZhbHVlLnJlcGxhY2UoL1xcRC9nLCAnJykgKyBkaWdpdCkubGVuZ3RoO1xuICB1cHBlckxlbmd0aCA9IDE2O1xuICBpZiAoY2FyZCkge1xuICAgIHVwcGVyTGVuZ3RoID0gY2FyZC5sZW5ndGhbY2FyZC5sZW5ndGgubGVuZ3RoIC0gMV07XG4gIH1cbiAgaWYgKGxlbmd0aCA+PSB1cHBlckxlbmd0aCkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoKHRhcmdldC5zZWxlY3Rpb25TdGFydCAhPSBudWxsKSAmJiB0YXJnZXQuc2VsZWN0aW9uU3RhcnQgIT09IHZhbHVlLmxlbmd0aCkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoY2FyZCAmJiBjYXJkLnR5cGUgPT09ICdhbWV4Jykge1xuICAgIHJlID0gL14oXFxkezR9fFxcZHs0fVxcc1xcZHs2fSkkLztcbiAgfSBlbHNlIHtcbiAgICByZSA9IC8oPzpefFxccykoXFxkezR9KSQvO1xuICB9XG4gIGlmIChyZS50ZXN0KHZhbHVlKSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgdmFsdWUgKyAnICcgKyBkaWdpdCk7XG4gIH0gZWxzZSBpZiAocmUudGVzdCh2YWx1ZSArIGRpZ2l0KSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgdmFsdWUgKyBkaWdpdCArICcgJyk7XG4gIH1cbn07XG5cbmZvcm1hdEJhY2tDYXJkTnVtYmVyID0gZnVuY3Rpb24oZSkge1xuICB2YXIgdGFyZ2V0LCB2YWx1ZTtcbiAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gIHZhbHVlID0gUUoudmFsKHRhcmdldCk7XG4gIGlmIChlLm1ldGEpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGUud2hpY2ggIT09IDgpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKCh0YXJnZXQuc2VsZWN0aW9uU3RhcnQgIT0gbnVsbCkgJiYgdGFyZ2V0LnNlbGVjdGlvblN0YXJ0ICE9PSB2YWx1ZS5sZW5ndGgpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKC9cXGRcXHMkLy50ZXN0KHZhbHVlKSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgdmFsdWUucmVwbGFjZSgvXFxkXFxzJC8sICcnKSk7XG4gIH0gZWxzZSBpZiAoL1xcc1xcZD8kLy50ZXN0KHZhbHVlKSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgdmFsdWUucmVwbGFjZSgvXFxzXFxkPyQvLCAnJykpO1xuICB9XG59O1xuXG5mb3JtYXRFeHBpcnkgPSBmdW5jdGlvbihlKSB7XG4gIHZhciBkaWdpdCwgdGFyZ2V0LCB2YWw7XG4gIGRpZ2l0ID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKTtcbiAgaWYgKCEvXlxcZCskLy50ZXN0KGRpZ2l0KSkge1xuICAgIHJldHVybjtcbiAgfVxuICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgdmFsID0gUUoudmFsKHRhcmdldCkgKyBkaWdpdDtcbiAgaWYgKC9eXFxkJC8udGVzdCh2YWwpICYmICh2YWwgIT09ICcwJyAmJiB2YWwgIT09ICcxJykpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIFwiMFwiICsgdmFsICsgXCIgLyBcIik7XG4gIH0gZWxzZSBpZiAoL15cXGRcXGQkLy50ZXN0KHZhbCkpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIHZhbCArIFwiIC8gXCIpO1xuICB9XG59O1xuXG5mb3JtYXRNb250aEV4cGlyeSA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIGRpZ2l0LCB0YXJnZXQsIHZhbDtcbiAgZGlnaXQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpO1xuICBpZiAoIS9eXFxkKyQvLnRlc3QoZGlnaXQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRhcmdldCA9IGUudGFyZ2V0O1xuICB2YWwgPSBRSi52YWwodGFyZ2V0KSArIGRpZ2l0O1xuICBpZiAoL15cXGQkLy50ZXN0KHZhbCkgJiYgKHZhbCAhPT0gJzAnICYmIHZhbCAhPT0gJzEnKSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgXCIwXCIgKyB2YWwpO1xuICB9IGVsc2UgaWYgKC9eXFxkXFxkJC8udGVzdCh2YWwpKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCBcIlwiICsgdmFsKTtcbiAgfVxufTtcblxuZm9ybWF0Rm9yd2FyZEV4cGlyeSA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIGRpZ2l0LCB0YXJnZXQsIHZhbDtcbiAgZGlnaXQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpO1xuICBpZiAoIS9eXFxkKyQvLnRlc3QoZGlnaXQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRhcmdldCA9IGUudGFyZ2V0O1xuICB2YWwgPSBRSi52YWwodGFyZ2V0KTtcbiAgaWYgKC9eXFxkXFxkJC8udGVzdCh2YWwpKSB7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIHZhbCArIFwiIC8gXCIpO1xuICB9XG59O1xuXG5mb3JtYXRGb3J3YXJkU2xhc2ggPSBmdW5jdGlvbihlKSB7XG4gIHZhciBzbGFzaCwgdGFyZ2V0LCB2YWw7XG4gIHNsYXNoID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKTtcbiAgaWYgKHNsYXNoICE9PSAnLycpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gIHZhbCA9IFFKLnZhbCh0YXJnZXQpO1xuICBpZiAoL15cXGQkLy50ZXN0KHZhbCkgJiYgdmFsICE9PSAnMCcpIHtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgXCIwXCIgKyB2YWwgKyBcIiAvIFwiKTtcbiAgfVxufTtcblxuZm9ybWF0QmFja0V4cGlyeSA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIHRhcmdldCwgdmFsdWU7XG4gIGlmIChlLm1ldGFLZXkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gIHZhbHVlID0gUUoudmFsKHRhcmdldCk7XG4gIGlmIChlLndoaWNoICE9PSA4KSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICgodGFyZ2V0LnNlbGVjdGlvblN0YXJ0ICE9IG51bGwpICYmIHRhcmdldC5zZWxlY3Rpb25TdGFydCAhPT0gdmFsdWUubGVuZ3RoKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICgvXFxkKFxcc3xcXC8pKyQvLnRlc3QodmFsdWUpKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCB2YWx1ZS5yZXBsYWNlKC9cXGQoXFxzfFxcLykqJC8sICcnKSk7XG4gIH0gZWxzZSBpZiAoL1xcc1xcL1xccz9cXGQ/JC8udGVzdCh2YWx1ZSkpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIHZhbHVlLnJlcGxhY2UoL1xcc1xcL1xccz9cXGQ/JC8sICcnKSk7XG4gIH1cbn07XG5cbnJlc3RyaWN0TnVtZXJpYyA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIGlucHV0O1xuICBpZiAoZS5tZXRhS2V5IHx8IGUuY3RybEtleSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmIChlLndoaWNoID09PSAzMikge1xuICAgIHJldHVybiBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH1cbiAgaWYgKGUud2hpY2ggPT09IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAoZS53aGljaCA8IDMzKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaW5wdXQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpO1xuICBpZiAoIS9bXFxkXFxzXS8udGVzdChpbnB1dCkpIHtcbiAgICByZXR1cm4gZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG59O1xuXG5yZXN0cmljdENhcmROdW1iZXIgPSBmdW5jdGlvbihlKSB7XG4gIHZhciBjYXJkLCBkaWdpdCwgdGFyZ2V0LCB2YWx1ZTtcbiAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gIGRpZ2l0ID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKTtcbiAgaWYgKCEvXlxcZCskLy50ZXN0KGRpZ2l0KSkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoaGFzVGV4dFNlbGVjdGVkKHRhcmdldCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFsdWUgPSAoUUoudmFsKHRhcmdldCkgKyBkaWdpdCkucmVwbGFjZSgvXFxEL2csICcnKTtcbiAgY2FyZCA9IGNhcmRGcm9tTnVtYmVyKHZhbHVlKTtcbiAgaWYgKGNhcmQpIHtcbiAgICBpZiAoISh2YWx1ZS5sZW5ndGggPD0gY2FyZC5sZW5ndGhbY2FyZC5sZW5ndGgubGVuZ3RoIC0gMV0pKSB7XG4gICAgICByZXR1cm4gZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoISh2YWx1ZS5sZW5ndGggPD0gMTYpKSB7XG4gICAgICByZXR1cm4gZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfVxufTtcblxucmVzdHJpY3RFeHBpcnkgPSBmdW5jdGlvbihlLCBsZW5ndGgpIHtcbiAgdmFyIGRpZ2l0LCB0YXJnZXQsIHZhbHVlO1xuICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgZGlnaXQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpO1xuICBpZiAoIS9eXFxkKyQvLnRlc3QoZGlnaXQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChoYXNUZXh0U2VsZWN0ZWQodGFyZ2V0KSkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YWx1ZSA9IFFKLnZhbCh0YXJnZXQpICsgZGlnaXQ7XG4gIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvXFxEL2csICcnKTtcbiAgaWYgKHZhbHVlLmxlbmd0aCA+IGxlbmd0aCkge1xuICAgIHJldHVybiBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH1cbn07XG5cbnJlc3RyaWN0Q29tYmluZWRFeHBpcnkgPSBmdW5jdGlvbihlKSB7XG4gIHJldHVybiByZXN0cmljdEV4cGlyeShlLCA2KTtcbn07XG5cbnJlc3RyaWN0TW9udGhFeHBpcnkgPSBmdW5jdGlvbihlKSB7XG4gIHJldHVybiByZXN0cmljdEV4cGlyeShlLCAyKTtcbn07XG5cbnJlc3RyaWN0WWVhckV4cGlyeSA9IGZ1bmN0aW9uKGUpIHtcbiAgcmV0dXJuIHJlc3RyaWN0RXhwaXJ5KGUsIDQpO1xufTtcblxucmVzdHJpY3RDVkMgPSBmdW5jdGlvbihlKSB7XG4gIHZhciBkaWdpdCwgdGFyZ2V0LCB2YWw7XG4gIHRhcmdldCA9IGUudGFyZ2V0O1xuICBkaWdpdCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZS53aGljaCk7XG4gIGlmICghL15cXGQrJC8udGVzdChkaWdpdCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGhhc1RleHRTZWxlY3RlZCh0YXJnZXQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhbCA9IFFKLnZhbCh0YXJnZXQpICsgZGlnaXQ7XG4gIGlmICghKHZhbC5sZW5ndGggPD0gNCkpIHtcbiAgICByZXR1cm4gZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG59O1xuXG5zZXRDYXJkVHlwZSA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIGFsbFR5cGVzLCBjYXJkLCBjYXJkVHlwZSwgdGFyZ2V0LCB2YWw7XG4gIHRhcmdldCA9IGUudGFyZ2V0O1xuICB2YWwgPSBRSi52YWwodGFyZ2V0KTtcbiAgY2FyZFR5cGUgPSBQYXltZW50LmZucy5jYXJkVHlwZSh2YWwpIHx8ICd1bmtub3duJztcbiAgaWYgKCFRSi5oYXNDbGFzcyh0YXJnZXQsIGNhcmRUeXBlKSkge1xuICAgIGFsbFR5cGVzID0gKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGksIGxlbiwgcmVzdWx0cztcbiAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgIGZvciAoaSA9IDAsIGxlbiA9IGNhcmRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGNhcmQgPSBjYXJkc1tpXTtcbiAgICAgICAgcmVzdWx0cy5wdXNoKGNhcmQudHlwZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9KSgpO1xuICAgIFFKLnJlbW92ZUNsYXNzKHRhcmdldCwgJ3Vua25vd24nKTtcbiAgICBRSi5yZW1vdmVDbGFzcyh0YXJnZXQsIGFsbFR5cGVzLmpvaW4oJyAnKSk7XG4gICAgUUouYWRkQ2xhc3ModGFyZ2V0LCBjYXJkVHlwZSk7XG4gICAgUUoudG9nZ2xlQ2xhc3ModGFyZ2V0LCAnaWRlbnRpZmllZCcsIGNhcmRUeXBlICE9PSAndW5rbm93bicpO1xuICAgIHJldHVybiBRSi50cmlnZ2VyKHRhcmdldCwgJ3BheW1lbnQuY2FyZFR5cGUnLCBjYXJkVHlwZSk7XG4gIH1cbn07XG5cblBheW1lbnQgPSAoZnVuY3Rpb24oKSB7XG4gIGZ1bmN0aW9uIFBheW1lbnQoKSB7fVxuXG4gIFBheW1lbnQuZm5zID0ge1xuICAgIGNhcmRFeHBpcnlWYWw6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICB2YXIgbW9udGgsIHByZWZpeCwgcmVmLCB5ZWFyO1xuICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9cXHMvZywgJycpO1xuICAgICAgcmVmID0gdmFsdWUuc3BsaXQoJy8nLCAyKSwgbW9udGggPSByZWZbMF0sIHllYXIgPSByZWZbMV07XG4gICAgICBpZiAoKHllYXIgIT0gbnVsbCA/IHllYXIubGVuZ3RoIDogdm9pZCAwKSA9PT0gMiAmJiAvXlxcZCskLy50ZXN0KHllYXIpKSB7XG4gICAgICAgIHByZWZpeCA9IChuZXcgRGF0ZSkuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgcHJlZml4ID0gcHJlZml4LnRvU3RyaW5nKCkuc2xpY2UoMCwgMik7XG4gICAgICAgIHllYXIgPSBwcmVmaXggKyB5ZWFyO1xuICAgICAgfVxuICAgICAgbW9udGggPSBwYXJzZUludChtb250aCwgMTApO1xuICAgICAgeWVhciA9IHBhcnNlSW50KHllYXIsIDEwKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG1vbnRoOiBtb250aCxcbiAgICAgICAgeWVhcjogeWVhclxuICAgICAgfTtcbiAgICB9LFxuICAgIHZhbGlkYXRlQ2FyZE51bWJlcjogZnVuY3Rpb24obnVtKSB7XG4gICAgICB2YXIgY2FyZCwgcmVmO1xuICAgICAgbnVtID0gKG51bSArICcnKS5yZXBsYWNlKC9cXHMrfC0vZywgJycpO1xuICAgICAgaWYgKCEvXlxcZCskLy50ZXN0KG51bSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgY2FyZCA9IGNhcmRGcm9tTnVtYmVyKG51bSk7XG4gICAgICBpZiAoIWNhcmQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIChyZWYgPSBudW0ubGVuZ3RoLCBpbmRleE9mLmNhbGwoY2FyZC5sZW5ndGgsIHJlZikgPj0gMCkgJiYgKGNhcmQubHVobiA9PT0gZmFsc2UgfHwgbHVobkNoZWNrKG51bSkpO1xuICAgIH0sXG4gICAgdmFsaWRhdGVDYXJkRXhwaXJ5OiBmdW5jdGlvbihtb250aCwgeWVhcikge1xuICAgICAgdmFyIGN1cnJlbnRUaW1lLCBleHBpcnksIHByZWZpeCwgcmVmO1xuICAgICAgaWYgKHR5cGVvZiBtb250aCA9PT0gJ29iamVjdCcgJiYgJ21vbnRoJyBpbiBtb250aCkge1xuICAgICAgICByZWYgPSBtb250aCwgbW9udGggPSByZWYubW9udGgsIHllYXIgPSByZWYueWVhcjtcbiAgICAgIH1cbiAgICAgIGlmICghKG1vbnRoICYmIHllYXIpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIG1vbnRoID0gUUoudHJpbShtb250aCk7XG4gICAgICB5ZWFyID0gUUoudHJpbSh5ZWFyKTtcbiAgICAgIGlmICghL15cXGQrJC8udGVzdChtb250aCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKCEvXlxcZCskLy50ZXN0KHllYXIpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICghKHBhcnNlSW50KG1vbnRoLCAxMCkgPD0gMTIpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICh5ZWFyLmxlbmd0aCA9PT0gMikge1xuICAgICAgICBwcmVmaXggPSAobmV3IERhdGUpLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgIHByZWZpeCA9IHByZWZpeC50b1N0cmluZygpLnNsaWNlKDAsIDIpO1xuICAgICAgICB5ZWFyID0gcHJlZml4ICsgeWVhcjtcbiAgICAgIH1cbiAgICAgIGV4cGlyeSA9IG5ldyBEYXRlKHllYXIsIG1vbnRoKTtcbiAgICAgIGN1cnJlbnRUaW1lID0gbmV3IERhdGU7XG4gICAgICBleHBpcnkuc2V0TW9udGgoZXhwaXJ5LmdldE1vbnRoKCkgLSAxKTtcbiAgICAgIGV4cGlyeS5zZXRNb250aChleHBpcnkuZ2V0TW9udGgoKSArIDEsIDEpO1xuICAgICAgcmV0dXJuIGV4cGlyeSA+IGN1cnJlbnRUaW1lO1xuICAgIH0sXG4gICAgdmFsaWRhdGVDYXJkQ1ZDOiBmdW5jdGlvbihjdmMsIHR5cGUpIHtcbiAgICAgIHZhciByZWYsIHJlZjE7XG4gICAgICBjdmMgPSBRSi50cmltKGN2Yyk7XG4gICAgICBpZiAoIS9eXFxkKyQvLnRlc3QoY3ZjKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAodHlwZSAmJiBjYXJkRnJvbVR5cGUodHlwZSkpIHtcbiAgICAgICAgcmV0dXJuIHJlZiA9IGN2Yy5sZW5ndGgsIGluZGV4T2YuY2FsbCgocmVmMSA9IGNhcmRGcm9tVHlwZSh0eXBlKSkgIT0gbnVsbCA/IHJlZjEuY3ZjTGVuZ3RoIDogdm9pZCAwLCByZWYpID49IDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gY3ZjLmxlbmd0aCA+PSAzICYmIGN2Yy5sZW5ndGggPD0gNDtcbiAgICAgIH1cbiAgICB9LFxuICAgIGNhcmRUeXBlOiBmdW5jdGlvbihudW0pIHtcbiAgICAgIHZhciByZWY7XG4gICAgICBpZiAoIW51bSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIHJldHVybiAoKHJlZiA9IGNhcmRGcm9tTnVtYmVyKG51bSkpICE9IG51bGwgPyByZWYudHlwZSA6IHZvaWQgMCkgfHwgbnVsbDtcbiAgICB9LFxuICAgIGZvcm1hdENhcmROdW1iZXI6IGZ1bmN0aW9uKG51bSkge1xuICAgICAgdmFyIGNhcmQsIGdyb3VwcywgcmVmLCB1cHBlckxlbmd0aDtcbiAgICAgIGNhcmQgPSBjYXJkRnJvbU51bWJlcihudW0pO1xuICAgICAgaWYgKCFjYXJkKSB7XG4gICAgICAgIHJldHVybiBudW07XG4gICAgICB9XG4gICAgICB1cHBlckxlbmd0aCA9IGNhcmQubGVuZ3RoW2NhcmQubGVuZ3RoLmxlbmd0aCAtIDFdO1xuICAgICAgbnVtID0gbnVtLnJlcGxhY2UoL1xcRC9nLCAnJyk7XG4gICAgICBudW0gPSBudW0uc2xpY2UoMCwgK3VwcGVyTGVuZ3RoICsgMSB8fCA5ZTkpO1xuICAgICAgaWYgKGNhcmQuZm9ybWF0Lmdsb2JhbCkge1xuICAgICAgICByZXR1cm4gKHJlZiA9IG51bS5tYXRjaChjYXJkLmZvcm1hdCkpICE9IG51bGwgPyByZWYuam9pbignICcpIDogdm9pZCAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZ3JvdXBzID0gY2FyZC5mb3JtYXQuZXhlYyhudW0pO1xuICAgICAgICBpZiAoZ3JvdXBzICE9IG51bGwpIHtcbiAgICAgICAgICBncm91cHMuc2hpZnQoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZ3JvdXBzICE9IG51bGwgPyBncm91cHMuam9pbignICcpIDogdm9pZCAwO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBQYXltZW50LnJlc3RyaWN0TnVtZXJpYyA9IGZ1bmN0aW9uKGVsKSB7XG4gICAgcmV0dXJuIFFKLm9uKGVsLCAna2V5cHJlc3MnLCByZXN0cmljdE51bWVyaWMpO1xuICB9O1xuXG4gIFBheW1lbnQuY2FyZEV4cGlyeVZhbCA9IGZ1bmN0aW9uKGVsKSB7XG4gICAgcmV0dXJuIFBheW1lbnQuZm5zLmNhcmRFeHBpcnlWYWwoUUoudmFsKGVsKSk7XG4gIH07XG5cbiAgUGF5bWVudC5mb3JtYXRDYXJkQ1ZDID0gZnVuY3Rpb24oZWwpIHtcbiAgICBQYXltZW50LnJlc3RyaWN0TnVtZXJpYyhlbCk7XG4gICAgUUoub24oZWwsICdrZXlwcmVzcycsIHJlc3RyaWN0Q1ZDKTtcbiAgICByZXR1cm4gZWw7XG4gIH07XG5cbiAgUGF5bWVudC5mb3JtYXRDYXJkRXhwaXJ5ID0gZnVuY3Rpb24oZWwpIHtcbiAgICB2YXIgbW9udGgsIHllYXI7XG4gICAgUGF5bWVudC5yZXN0cmljdE51bWVyaWMoZWwpO1xuICAgIGlmIChlbC5sZW5ndGggJiYgZWwubGVuZ3RoID09PSAyKSB7XG4gICAgICBtb250aCA9IGVsWzBdLCB5ZWFyID0gZWxbMV07XG4gICAgICB0aGlzLmZvcm1hdENhcmRFeHBpcnlNdWx0aXBsZShtb250aCwgeWVhcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIFFKLm9uKGVsLCAna2V5cHJlc3MnLCByZXN0cmljdENvbWJpbmVkRXhwaXJ5KTtcbiAgICAgIFFKLm9uKGVsLCAna2V5cHJlc3MnLCBmb3JtYXRFeHBpcnkpO1xuICAgICAgUUoub24oZWwsICdrZXlwcmVzcycsIGZvcm1hdEZvcndhcmRTbGFzaCk7XG4gICAgICBRSi5vbihlbCwgJ2tleXByZXNzJywgZm9ybWF0Rm9yd2FyZEV4cGlyeSk7XG4gICAgICBRSi5vbihlbCwgJ2tleWRvd24nLCBmb3JtYXRCYWNrRXhwaXJ5KTtcbiAgICB9XG4gICAgcmV0dXJuIGVsO1xuICB9O1xuXG4gIFBheW1lbnQuZm9ybWF0Q2FyZEV4cGlyeU11bHRpcGxlID0gZnVuY3Rpb24obW9udGgsIHllYXIpIHtcbiAgICBRSi5vbihtb250aCwgJ2tleXByZXNzJywgcmVzdHJpY3RNb250aEV4cGlyeSk7XG4gICAgUUoub24obW9udGgsICdrZXlwcmVzcycsIGZvcm1hdE1vbnRoRXhwaXJ5KTtcbiAgICByZXR1cm4gUUoub24oeWVhciwgJ2tleXByZXNzJywgcmVzdHJpY3RZZWFyRXhwaXJ5KTtcbiAgfTtcblxuICBQYXltZW50LmZvcm1hdENhcmROdW1iZXIgPSBmdW5jdGlvbihlbCkge1xuICAgIFBheW1lbnQucmVzdHJpY3ROdW1lcmljKGVsKTtcbiAgICBRSi5vbihlbCwgJ2tleXByZXNzJywgcmVzdHJpY3RDYXJkTnVtYmVyKTtcbiAgICBRSi5vbihlbCwgJ2tleXByZXNzJywgZm9ybWF0Q2FyZE51bWJlcik7XG4gICAgUUoub24oZWwsICdrZXlkb3duJywgZm9ybWF0QmFja0NhcmROdW1iZXIpO1xuICAgIFFKLm9uKGVsLCAna2V5dXAnLCBzZXRDYXJkVHlwZSk7XG4gICAgUUoub24oZWwsICdwYXN0ZScsIHJlRm9ybWF0Q2FyZE51bWJlcik7XG4gICAgcmV0dXJuIGVsO1xuICB9O1xuXG4gIFBheW1lbnQuZ2V0Q2FyZEFycmF5ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGNhcmRzO1xuICB9O1xuXG4gIFBheW1lbnQuc2V0Q2FyZEFycmF5ID0gZnVuY3Rpb24oY2FyZEFycmF5KSB7XG4gICAgY2FyZHMgPSBjYXJkQXJyYXk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgUGF5bWVudC5hZGRUb0NhcmRBcnJheSA9IGZ1bmN0aW9uKGNhcmRPYmplY3QpIHtcbiAgICByZXR1cm4gY2FyZHMucHVzaChjYXJkT2JqZWN0KTtcbiAgfTtcblxuICBQYXltZW50LnJlbW92ZUZyb21DYXJkQXJyYXkgPSBmdW5jdGlvbih0eXBlKSB7XG4gICAgdmFyIGtleSwgdmFsdWU7XG4gICAgZm9yIChrZXkgaW4gY2FyZHMpIHtcbiAgICAgIHZhbHVlID0gY2FyZHNba2V5XTtcbiAgICAgIGlmICh2YWx1ZS50eXBlID09PSB0eXBlKSB7XG4gICAgICAgIGNhcmRzLnNwbGljZShrZXksIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICByZXR1cm4gUGF5bWVudDtcblxufSkoKTtcblxubW9kdWxlLmV4cG9ydHMgPSBQYXltZW50O1xuXG5nbG9iYWwuUGF5bWVudCA9IFBheW1lbnQ7XG5cblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG59LHtcInFqL3NyYy9xai5jb2ZmZWVcIjoxfV19LHt9LFsyXSkoMilcbn0pOyIsIi8vIE1pbm5Qb3N0IEdpdmluZyBwbHVnaW5cbi8vIHRoZSBzZW1pLWNvbG9uIGJlZm9yZSBmdW5jdGlvbiBpbnZvY2F0aW9uIGlzIGEgc2FmZXR5IG5ldCBhZ2FpbnN0IGNvbmNhdGVuYXRlZFxuLy8gc2NyaXB0cyBhbmQvb3Igb3RoZXIgcGx1Z2lucyB3aGljaCBtYXkgbm90IGJlIGNsb3NlZCBwcm9wZXJseS5cbjsoZnVuY3Rpb24gKCAkLCB3aW5kb3csIGRvY3VtZW50LCB1bmRlZmluZWQgKSB7XG5cbiAgLy8gdW5kZWZpbmVkIGlzIHVzZWQgaGVyZSBhcyB0aGUgdW5kZWZpbmVkIGdsb2JhbCB2YXJpYWJsZSBpbiBFQ01BU2NyaXB0IDMgaXNcbiAgLy8gbXV0YWJsZSAoaWUuIGl0IGNhbiBiZSBjaGFuZ2VkIGJ5IHNvbWVvbmUgZWxzZSkuIHVuZGVmaW5lZCBpc24ndCByZWFsbHkgYmVpbmdcbiAgLy8gcGFzc2VkIGluIHNvIHdlIGNhbiBlbnN1cmUgdGhlIHZhbHVlIG9mIGl0IGlzIHRydWx5IHVuZGVmaW5lZC4gSW4gRVM1LCB1bmRlZmluZWRcbiAgLy8gY2FuIG5vIGxvbmdlciBiZSBtb2RpZmllZC5cblxuICAvLyB3aW5kb3cgYW5kIGRvY3VtZW50IGFyZSBwYXNzZWQgdGhyb3VnaCBhcyBsb2NhbCB2YXJpYWJsZSByYXRoZXIgdGhhbiBnbG9iYWxcbiAgLy8gYXMgdGhpcyAoc2xpZ2h0bHkpIHF1aWNrZW5zIHRoZSByZXNvbHV0aW9uIHByb2Nlc3MgYW5kIGNhbiBiZSBtb3JlIGVmZmljaWVudGx5XG4gIC8vIG1pbmlmaWVkIChlc3BlY2lhbGx5IHdoZW4gYm90aCBhcmUgcmVndWxhcmx5IHJlZmVyZW5jZWQgaW4geW91ciBwbHVnaW4pLlxuXG4gIC8vIENyZWF0ZSB0aGUgZGVmYXVsdHMgb25jZVxuICB2YXIgcGx1Z2luTmFtZSA9ICdtaW5ucG9zdF9naXZpbmcnLFxuICBkZWZhdWx0cyA9IHtcbiAgICAnZGVidWcnIDogZmFsc2UsIC8vIHRoaXMgY2FuIGJlIHNldCB0byB0cnVlIG9uIHBhZ2UgbGV2ZWwgb3B0aW9uc1xuICAgICdzdHJpcGVfcHVibGlzaGFibGVfa2V5JyA6ICcnLFxuICAgICdwbGFpZF9lbnYnIDogJycsXG4gICAgJ3BsYWlkX3B1YmxpY19rZXknIDogJycsXG4gICAgJ3BsYWlkX2xpbmsnIDogJyNhdXRob3JpemUtYWNoJyxcbiAgICAnbWlubnBvc3Rfcm9vdCcgOiAnaHR0cHM6Ly93d3cubWlubnBvc3QuY29tJyxcbiAgICAnZG9uYXRlX2Zvcm1fc2VsZWN0b3InOiAnI2RvbmF0ZScsXG4gICAgJ2RvbmF0ZV9zdGVwX3NlbGVjdG9yJyA6ICcjcGFuZWwtLXBheScsXG4gICAgJ2NvbmZpcm1fZm9ybV9zZWxlY3RvcicgOiAnI2NvbmZpcm0nLFxuICAgICdjb25maXJtX3N0ZXBfc2VsZWN0b3InIDogJyNwYW5lbC0tY29uZmlybWF0aW9uJyxcbiAgICAnYWN0aXZlJyA6ICdwYW5lbC0tcGF5JyxcbiAgICAnY29uZmlybScgOiAncGFuZWwtLWNvbmZpcm1hdGlvbicsXG4gICAgJ3F1ZXJ5JyA6ICdzdGVwJyxcbiAgICAncGF5X2NjX3Byb2Nlc3Npbmdfc2VsZWN0b3InIDogJ2lucHV0W2lkPVwicGF5LWZlZXNcIl0nLFxuICAgICdmZWVfYW1vdW50JyA6ICcucHJvY2Vzc2luZy1hbW91bnQnLFxuICAgICdsZXZlbF9hbW91bnRfc2VsZWN0b3InIDogJyNwYW5lbC0tcGF5IC5hbW91bnQgLmxldmVsLWFtb3VudCcsIC8vIHdlIGNhbiBtYXliZSBnZXQgcmlkIG9mIHRoaXNcbiAgICAnb3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yJyA6ICdbbmFtZT1cImFtb3VudFwiXScsXG4gICAgJ2ZhaXJfbWFya2V0X3ZhbHVlX3NlbGVjdG9yJyA6ICcjZmFpcl9tYXJrZXRfdmFsdWUnLFxuICAgICdmcmVxdWVuY3lfc2VsZWN0b3InIDogJy5mcmVxdWVuY3knLFxuICAgICdmdWxsX2Ftb3VudF9zZWxlY3RvcicgOiAnLmZ1bGwtYW1vdW50JyxcbiAgICAnbmFtZV9zZWxlY3RvcicgOiAnLmZvcm0taXRlbS0tZGlzcGxheS1uYW1lJyxcbiAgICAnaW5faG9ub3Jfb3JfbWVtb3J5X2ZpZWxkX3NlbGVjdG9yJyA6ICcuZm9ybS1pdGVtLS1ob25vci1tZW1vcnknLFxuICAgICdob25vcl9vcl9tZW1vcnlfY2hvb3NlcicgOiAnaW5wdXRbbmFtZT1cImluX2hvbm9yX29yX21lbW9yeVwiXScsIC8vIHJhZGlvIGZpZWxkc1xuICAgICdob25vcl90eXBlX3NlbGVjdG9yJyA6ICcuaG9ub3JfdHlwZScsIC8vIHNwYW4gaW5zaWRlIGxhYmVsXG4gICAgJ2hvbm9yX21lbW9yeV9pbnB1dF9ncm91cCcgOiAnLmhvbm9yLW9yLW1lbW9yeScsIC8vIGhvbGRzIHRoZSBmb3JtIGZpZWxkXG4gICAgJ25vdGlmeV9zZWxlY3RvcicgOiAnLm5vdGlmeV9zb21lb25lJyxcbiAgICAnbm90aWZ5X2ZpZWxkX3NlbGVjdG9yJyA6ICcuZm9ybS1pdGVtLS1ub3RpZnknLFxuICAgICdhbm9ueW1vdXNfc2VsZWN0b3InIDogJyNhbm9ueW1vdXMnLFxuICAgICdzaG93X2JpbGxpbmdfY291bnRyeV9zZWxlY3RvcicgOiAnI2JpbGxpbmdfc2hvd19jb3VudHJ5JyxcbiAgICAnYmlsbGluZ19jb3VudHJ5X3NlbGVjdG9yJyA6ICcuZm9ybS1pdGVtLS1jb3VudHJ5JyxcbiAgICAnc2hvd19zaGlwcGluZ19jb3VudHJ5X3NlbGVjdG9yJyA6ICcjc2hpcHBpbmdfc2hvd19jb3VudHJ5JyxcbiAgICAnc2hpcHBpbmdfY291bnRyeV9zZWxlY3RvcicgOiAnLmZvcm0taXRlbS0tc2hpcHBpbmctY291bnRyeScsXG4gICAgJ3NoaXBwaW5nX2FkZHJlc3Nfc2VsZWN0b3InIDogJy5mb3JtLWl0ZW0tLXNoaXBwaW5nLWFkZHJlc3MnLFxuICAgICd1c2VfZm9yX3NoaXBwaW5nX3NlbGVjdG9yJyA6ICcjdXNlZm9yc2hpcHBpbmcnLFxuICAgICdlbWFpbF9maWVsZF9zZWxlY3RvcicgOiAnI2VtYWlsJyxcbiAgICAncGFzc3dvcmRfZmllbGRfc2VsZWN0b3InIDogJyNwYXNzd29yZCcsXG4gICAgJ2ZpcnN0X25hbWVfZmllbGRfc2VsZWN0b3InIDogJyNmaXJzdF9uYW1lJyxcbiAgICAnbGFzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yJyA6ICcjbGFzdF9uYW1lJyxcbiAgICAnYWNjb3VudF9jaXR5X3NlbGVjdG9yJyA6ICcjYmlsbGluZ19jaXR5JyxcbiAgICAnYWNjb3VudF9zdGF0ZV9zZWxlY3RvcicgOiAnI2JpbGxpbmdfc3RhdGUnLFxuICAgICdhY2NvdW50X3ppcF9zZWxlY3RvcicgOiAnI2JpbGxpbmdfemlwJyxcbiAgICAnY3JlYXRlX21wX3NlbGVjdG9yJyA6ICcjY3JlYXRlbXBhY2NvdW50JyxcbiAgICAncGFzc3dvcmRfc2VsZWN0b3InIDogJy5mb3JtLWl0ZW0tLXBhc3N3b3JkJyxcbiAgICAnYWRkaXRpb25hbF9hbW91bnRfZmllbGQnIDogJyNhZGRpdGlvbmFsX2RvbmF0aW9uJyxcbiAgICAnYmlsbGluZ19zZWxlY3RvcicgOiAnZmllbGRzZXQuYmlsbGluZycsXG4gICAgJ3NoaXBwaW5nX3NlbGVjdG9yJyA6ICdmaWVsZHNldC5zaGlwcGluZycsXG4gICAgJ2NyZWRpdF9jYXJkX2ZpZWxkc2V0JyA6ICcucGF5bWVudC1tZXRob2QtZ3JvdXAnLFxuICAgICdjaG9vc2VfcGF5bWVudCcgOiAnI2Nob29zZS1wYXltZW50LW1ldGhvZCcsXG4gICAgJ3BheW1lbnRfbWV0aG9kX3NlbGVjdG9yJyA6ICcucGF5bWVudC1tZXRob2QnLFxuICAgICdjY19udW1fc2VsZWN0b3InIDogJyNjYXJkLW51bWJlcicsXG4gICAgJ2NjX2V4cF9zZWxlY3RvcicgOiAnI2NhcmQtZXhwaXJ5JyxcbiAgICAnY2NfY3Z2X3NlbGVjdG9yJyA6ICcjY2FyZC1jdmMnLFxuICAgICdwYXltZW50X2J1dHRvbl9zZWxlY3RvcicgOiAnI3N1Ym1pdCcsXG4gICAgJ2NvbmZpcm1fYnV0dG9uX3NlbGVjdG9yJyA6ICcjZmluaXNoJyxcbiAgICAnb3BwX2lkX3NlbGVjdG9yJyA6ICcjbG9ja19rZXknLCAvLyB3ZSB1c2UgdGhpcyB2YWx1ZSBhcyB0aGUgR29vZ2xlIEFuYWx5dGljcyB0cmFuc2FjdGlvbiBJRFxuICAgICdyZWN1cnJpbmdfc2VsZWN0b3InIDogJyNyZWN1cnJpbmcnLFxuICAgICduZXdzbGV0dGVyX2dyb3VwX3NlbGVjdG9yJyA6ICcuc3VwcG9ydC1uZXdzbGV0dGVycycsXG4gICAgJ3JlYXNvbl9maWVsZF9zZWxlY3RvcicgOiAnI3JlYXNvbl9mb3Jfc3VwcG9ydGluZycsXG4gICAgJ3NoYXJlX3JlYXNvbl9zZWxlY3RvcicgOiAnI3JlYXNvbl9zaGFyZWFibGUnLFxuICAgICdjb25maXJtX3RvcF9zZWxlY3RvcicgOiAnLnN1cHBvcnQtLXBvc3QtY29uZmlybScsXG4gICAgJ2V4aXN0aW5nX25ld3NsZXR0ZXJfc2V0dGluZ3MnIDogJycsXG4gICAgJ2xldmVscycgOiB7XG4gICAgICAxIDoge1xuICAgICAgICAnbmFtZScgOiAnYnJvbnplJyxcbiAgICAgICAgJ21heCcgOiA2MFxuICAgICAgfSxcbiAgICAgIDIgOiB7XG4gICAgICAgICduYW1lJyA6ICdzaWx2ZXInLFxuICAgICAgICAnbWluJyA6IDYwLFxuICAgICAgICAnbWF4JyA6IDEyMFxuICAgICAgfSxcbiAgICAgIDMgOiB7XG4gICAgICAgICduYW1lJyA6ICdnb2xkJyxcbiAgICAgICAgJ21pbicgOiAxMjAsXG4gICAgICAgICdtYXgnIDogMjQwXG4gICAgICB9LFxuICAgICAgNCA6IHtcbiAgICAgICAgJ25hbWUnIDogJ3BsYXRpbnVtJyxcbiAgICAgICAgJ21pbicgOiAyNDBcbiAgICAgIH1cbiAgICB9XG5cbiAgfTsgLy8gZW5kIGRlZmF1bHRzXG5cbiAgLy8gVGhlIGFjdHVhbCBwbHVnaW4gY29uc3RydWN0b3JcbiAgZnVuY3Rpb24gUGx1Z2luKCBlbGVtZW50LCBvcHRpb25zICkge1xuXG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcblxuICAgIC8vIGpRdWVyeSBoYXMgYW4gZXh0ZW5kIG1ldGhvZCB3aGljaCBtZXJnZXMgdGhlIGNvbnRlbnRzIG9mIHR3byBvclxuICAgIC8vIG1vcmUgb2JqZWN0cywgc3RvcmluZyB0aGUgcmVzdWx0IGluIHRoZSBmaXJzdCBvYmplY3QuIFRoZSBmaXJzdCBvYmplY3RcbiAgICAvLyBpcyBnZW5lcmFsbHkgZW1wdHkgYXMgd2UgZG9uJ3Qgd2FudCB0byBhbHRlciB0aGUgZGVmYXVsdCBvcHRpb25zIGZvclxuICAgIC8vIGZ1dHVyZSBpbnN0YW5jZXMgb2YgdGhlIHBsdWdpblxuICAgIHRoaXMub3B0aW9ucyA9ICQuZXh0ZW5kKCB7fSwgZGVmYXVsdHMsIG9wdGlvbnMgKTtcblxuICAgIHRoaXMuX2RlZmF1bHRzID0gZGVmYXVsdHM7XG4gICAgdGhpcy5fbmFtZSA9IHBsdWdpbk5hbWU7XG5cbiAgICB0aGlzLmluaXQoKTtcbiAgfSAvLyBlbmQgY29uc3RydWN0b3JcblxuICBQbHVnaW4ucHJvdG90eXBlID0ge1xuXG4gICAgaW5pdDogZnVuY3Rpb24ocmVzZXQsIGFtb3VudCkge1xuXG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoICduby1qcycgKTtcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCggJ2pzJyApO1xuXG4gICAgICAvLyBQbGFjZSBpbml0aWFsaXphdGlvbiBsb2dpYyBoZXJlXG4gICAgICAvLyBZb3UgYWxyZWFkeSBoYXZlIGFjY2VzcyB0byB0aGUgRE9NIGVsZW1lbnQgYW5kXG4gICAgICAvLyB0aGUgb3B0aW9ucyB2aWEgdGhlIGluc3RhbmNlLCBlLmcuIHRoaXMuZWxlbWVudFxuICAgICAgLy8gYW5kIHRoaXMub3B0aW9uc1xuICAgICAgLy8geW91IGNhbiBhZGQgbW9yZSBmdW5jdGlvbnMgbGlrZSB0aGUgb25lIGJlbG93IGFuZFxuICAgICAgLy8gY2FsbCB0aGVtIGxpa2Ugc286IHRoaXMueW91ck90aGVyRnVuY3Rpb24odGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpLlxuXG4gICAgICAvLyBtb2RpZnkgb3B0aW9ucyBhcyBuZWVkZWRcbiAgICAgIC8vdmFyIHRoaXMub3B0aW9ucy5hbW91bnQgPSAnJztcbiAgICAgIGlmIChyZXNldCAhPT0gdHJ1ZSkge1xuICAgICAgICB0aGlzLm9wdGlvbnMuYW1vdW50ID0gcGFyc2VGbG9hdCgkKHRoaXMub3B0aW9ucy5sZXZlbF9hbW91bnRfc2VsZWN0b3IsIHRoaXMuZWxlbWVudCkudGV4dCgpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5hbW91bnQgPSBhbW91bnQ7XG4gICAgICB9XG4gICAgICB0aGlzLm9wdGlvbnMub3JpZ2luYWxfYW1vdW50ID0gcGFyc2VJbnQoJCh0aGlzLm9wdGlvbnMub3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yLCB0aGlzLmVsZW1lbnQpLnZhbCgpLCAxMCk7XG4gICAgICB0aGlzLm9wdGlvbnMuZnJlcXVlbmN5ID0gcGFyc2VGbG9hdCgkKHRoaXMub3B0aW9ucy5mcmVxdWVuY3lfc2VsZWN0b3IsIHRoaXMuZWxlbWVudCkuYXR0cignZGF0YS15ZWFyLWZyZXEnKSk7XG4gICAgICB2YXIgcmVjdXJyaW5nID0gJCh0aGlzLm9wdGlvbnMucmVjdXJyaW5nX3NlbGVjdG9yLCB0aGlzLmVsZW1lbnQpLnZhbCgpO1xuICAgICAgaWYgKHR5cGVvZiByZWN1cnJpbmcgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5yZWN1cnJpbmcgPSByZWN1cnJpbmcuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyByZWN1cnJpbmcuc2xpY2UoMSk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIHRoaXMub3B0aW9ucy5wcm9jZXNzaW5nX2ZlZSA9IChNYXRoLnJvdW5kKHBhcnNlRmxvYXQodGhpcy5vcHRpb25zLmZlZV9hbW91bnQpKk1hdGgucG93KDEwLDIpKS9NYXRoLnBvdygxMCwyKSkudG9GaXhlZCgyKTtcbiAgICAgIHRoaXMub3B0aW9ucy5wcm9jZXNzaW5nX2ZlZV90ZXh0ID0gdGhpcy5vcHRpb25zLnByb2Nlc3NpbmdfZmVlO1xuICAgICAgXG4gICAgICB0aGlzLm9wdGlvbnMuY2FyZFR5cGUgPSBudWxsO1xuICAgICAgdGhpcy5vcHRpb25zLmNyZWF0ZV9hY2NvdW50ID0gZmFsc2U7XG5cbiAgICAgIHZhciBidXR0b25fdGV4dCA9ICQoJ2J1dHRvbi5naXZlLCBpbnB1dC5naXZlJykudGV4dCgpO1xuICAgICAgdGhpcy5vcHRpb25zLmJ1dHRvbl90ZXh0ID0gYnV0dG9uX3RleHQ7XG5cbiAgICAgIHRoaXMuc3RyaXBlID0gU3RyaXBlKHRoaXMub3B0aW9ucy5zdHJpcGVfcHVibGlzaGFibGVfa2V5KTtcbiAgICAgIHRoaXMuZWxlbWVudHMgPSB0aGlzLnN0cmlwZS5lbGVtZW50cygpO1xuXG4gICAgICAvLyB1c2UgYSByZWZlcnJlciBmb3IgZWRpdCBsaW5rIGlmIHdlIGhhdmUgb25lXG4gICAgICBpZiAoZG9jdW1lbnQucmVmZXJyZXIgIT09ICcnKSB7XG4gICAgICAgICQoJyNlZGl0X3VybCcpLnByb3AoJ2hyZWYnLCBkb2N1bWVudC5yZWZlcnJlcik7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuZGVidWcgPT09IHRydWUpIHtcbiAgICAgICAgdGhpcy5kZWJ1Zyh0aGlzLm9wdGlvbnMpO1xuICAgICAgICAvLyByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIHRhYiBzdHVmZlxuICAgICAgdmFyIHF1ZXJ5X3BhbmVsID0gdGhpcy5xc1t0aGlzLm9wdGlvbnMucXVlcnldO1xuICAgICAgaWYgKHR5cGVvZiBxdWVyeV9wYW5lbCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcXVlcnlfcGFuZWwgPSB0aGlzLm9wdGlvbnMuYWN0aXZlO1xuICAgICAgfVxuXG4gICAgICAvLyBjYWxsIGZ1bmN0aW9uc1xuXG4gICAgICB0aGlzLnRhYk5hdmlnYXRpb24ocXVlcnlfcGFuZWwpOyAvLyBuYXZpZ2F0aW5nXG5cbiAgICAgIHRoaXMuYW1vdW50QXNSYWRpbyh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIGlmIHRoZSBhbW91bnQgZmllbGQgaXMgYSByYWRpbyBidXR0b25cbiAgICAgIHRoaXMuYW1vdW50VXBkYXRlZCh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIGlmIHRoZSBhbW91bnQgdGV4dCBmaWVsZCBjYW4gY2hhbmdlXG5cbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5wYXlfY2NfcHJvY2Vzc2luZ19zZWxlY3RvcikubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLmNyZWRpdENhcmRQcm9jZXNzaW5nRmVlcyh0aGlzLm9wdGlvbnMsIHJlc2V0KTsgLy8gcHJvY2Vzc2luZyBmZWVzXG4gICAgICB9XG4gICAgICBcbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5kb25hdGVfc3RlcF9zZWxlY3RvcikubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLm9wdGlvbnMubGV2ZWwgPSB0aGlzLmNoZWNrTGV2ZWwodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMsICduYW1lJyk7IC8vIGNoZWNrIHdoYXQgbGV2ZWwgaXQgaXNcbiAgICAgICAgdGhpcy5vcHRpb25zLmxldmVsbnVtID0gdGhpcy5jaGVja0xldmVsKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zLCAnbnVtJyk7IC8vIGNoZWNrIHdoYXQgbGV2ZWwgaXQgaXMgYXMgYSBudW1iZXJcbiAgICAgICAgdGhpcy5kb25hdGVBbm9ueW1vdXNseSh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIGFub255bW91c1xuICAgICAgICB0aGlzLmhvbm9yT3JNZW1vcnlUb2dnbGUodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBpbiBob25vciBvciBpbiBtZW1vcnkgb2Ygc29tZW9uZVxuICAgICAgICB0aGlzLm91dHNpZGVVbml0ZWRTdGF0ZXModGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBvdXRzaWRlIFVTXG4gICAgICAgIHRoaXMuc2hpcHBpbmdBZGRyZXNzKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gc2hpcHBpbmcgYWRkcmVzc1xuICAgICAgICB0aGlzLmFsbG93TWlubnBvc3RBY2NvdW50KHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zLCBmYWxzZSk7IC8vIG9wdGlvbiBmb3IgY3JlYXRpbmcgbWlubnBvc3QgYWNjb3VudFxuICAgICAgICB0aGlzLmNob29zZVBheW1lbnRNZXRob2QodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBzd2l0Y2ggYmV0d2VlbiBjYXJkIGFuZCBhY2hcbiAgICAgICAgdGhpcy5wYXltZW50UmVxdWVzdEVsZW1lbnQodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBhZGQgcGF5bWVudFJlcXVlc3QgZWxlbWVudFxuICAgICAgICB0aGlzLmNyZWRpdENhcmRGaWVsZHModGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBkbyBzdHVmZiB3aXRoIHRoZSBjcmVkaXQgY2FyZCBmaWVsZHNcbiAgICAgICAgdGhpcy5hY2hGaWVsZHModGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBkbyBzdHVmZiBmb3IgYWNoIHBheW1lbnRzLCBpZiBhcHBsaWNhYmxlIHRvIHRoZSBmb3JtXG4gICAgICAgIHRoaXMudmFsaWRhdGVBbmRTdWJtaXQodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyB2YWxpZGF0ZSBhbmQgc3VibWl0IHRoZSBmb3JtXG4gICAgICB9XG5cbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5jb25maXJtX3N0ZXBfc2VsZWN0b3IpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5zaG93TmV3c2xldHRlclNldHRpbmdzKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTtcbiAgICAgICAgdGhpcy5jb25maXJtTWVzc2FnZVN1Ym1pdCh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIHN1Ym1pdCB0aGUgc3R1ZmYgb24gdGhlIGNvbmZpcm1hdGlvbiBwYWdlXG4gICAgICB9XG5cbiAgICB9LCAvLyBpbml0XG5cbiAgICBxczogKGZ1bmN0aW9uKGEpIHtcbiAgICAgIGlmIChhID09PSAnJykge1xuICAgICAgICByZXR1cm4ge307XG4gICAgICB9XG4gICAgICB2YXIgYiA9IHt9O1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBwPWFbaV0uc3BsaXQoJz0nLCAyKTtcbiAgICAgICAgaWYgKHAubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgYltwWzBdXSA9ICcnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJbcFswXV0gPSBkZWNvZGVVUklDb21wb25lbnQocFsxXS5yZXBsYWNlKC9cXCsvZywgJyAnKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBiO1xuICAgIH0pKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3Vic3RyKDEpLnNwbGl0KCcmJykpLFxuXG4gICAgZGVidWc6IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuZGVidWcgPT09IHRydWUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZGlyKG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUuZGlyKHRoaXMpO1xuICAgICAgfVxuICAgIH0sIC8vIGRlYnVnXG5cbiAgICBnZXRRdWVyeVN0cmluZ3M6IGZ1bmN0aW9uKGxpbmspIHtcbiAgICAgIGlmICh0eXBlb2YgbGluayA9PT0gJ3VuZGVmaW5lZCcgfHwgbGluayA9PT0gJycpIHtcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGluayA9ICc/JyArIGxpbmsuc3BsaXQoJz8nKVsxXTtcbiAgICAgICAgbGluayA9IGxpbmsuc3Vic3RyKDEpLnNwbGl0KCcmJyk7XG4gICAgICB9XG4gICAgICB2YXIgYiA9IHt9O1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaW5rLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBwPWxpbmtbaV0uc3BsaXQoJz0nLCAyKTtcbiAgICAgICAgaWYgKHAubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgYltwWzBdXSA9ICcnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJbcFswXV0gPSBkZWNvZGVVUklDb21wb25lbnQocFsxXS5yZXBsYWNlKC9cXCsvZywgJyAnKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBiO1xuICAgIH0sIC8vIGdldFF1ZXJ5U3RyaW5nc1xuXG4gICAgdGFiTmF2aWdhdGlvbjogZnVuY3Rpb24oYWN0aXZlKSB7XG4gICAgICB2YXIgc3RlcCA9ICQoJy5wcm9ncmVzcy0tZG9uYXRpb24gbGkuJyArIGFjdGl2ZSkuaW5kZXgoKSArIDE7XG4gICAgICB2YXIgbmF2X2l0ZW1fY291bnQgPSAkKCcucHJvZ3Jlc3MtLWRvbmF0aW9uIGxpJykubGVuZ3RoO1xuICAgICAgdmFyIG9wcF9pZCA9ICQodGhpcy5vcHRpb25zLm9wcF9pZF9zZWxlY3RvcikudmFsKCk7XG4gICAgICB2YXIgbmV4dF9zdGVwID0gc3RlcCArIDE7XG4gICAgICB2YXIgcG9zdF9wdXJjaGFzZSA9IGZhbHNlO1xuXG4gICAgICAvLyB3ZSB3aWxsIGhhdmUgdG8gdXBkYXRlIHRoaXMgYmVjYXVzZSBubyBtb3JlIGZsYXNrIGlkXG5cbiAgICAgIHRoaXMuZGVidWcoICdzdGVwIGlzICcgKyBzdGVwICsgJyBhbmQgbmF2IGl0ZW0gY291bnQgaXMgJyArIG5hdl9pdGVtX2NvdW50ICsgJyBhbmQgb3BwIGlkIGlzICcgKyBvcHBfaWQgKyAnIGFuZCBuZXh0IHN0ZXAgaXMgJyArIG5leHRfc3RlcCApO1xuXG4gICAgICAvLyB0aGlzIGlzIHRoZSBsYXN0IHZpc2libGUgc3RlcFxuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmNvbmZpcm1fc3RlcF9zZWxlY3RvcikubGVuZ3RoID4gMCkge1xuICAgICAgICBhY3RpdmUgPSB0aGlzLm9wdGlvbnMuY29uZmlybTtcbiAgICAgICAgJCgnLnByb2dyZXNzLS1kb25hdGlvbiBsaS4nICsgYWN0aXZlICsgJyBzcGFuJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICBzdGVwID0gJCgnLnByb2dyZXNzLS1kb25hdGlvbiBsaS4nICsgYWN0aXZlKS5pbmRleCgpICsgMTtcbiAgICAgICAgLy8gdGhlcmUgaXMgYSBjb250aW51YXRpb24gb2YgdGhlIG1haW4gZm9ybSBvbiB0aGlzIHBhZ2UuIHRoZXJlIGlzIGEgYnV0dG9uIHRvIGNsaWNrXG4gICAgICAgIC8vIHRoaXMgbWVhbnMgdGhlcmUgaXMgYW5vdGhlciBzdGVwXG4gICAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5jb25maXJtX2J1dHRvbl9zZWxlY3RvcikubGVuZ3RoID4gMCkge1xuICAgICAgICAgIG5hdl9pdGVtX2NvdW50ICs9IDE7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKHN0ZXAgPT09IG5hdl9pdGVtX2NvdW50IC0gMSAmJiAkKHRoaXMub3B0aW9ucy5vcHBfaWRfc2VsZWN0b3IpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5kZWJ1ZygndGhpcyBpcyBhIHBheW1lbnQgc3RlcCBidXQgdGhlcmUgaXMgYSBzdGVwIGFmdGVyIGl0Jyk7XG4gICAgICAgIHN0ZXAgPSAncHVyY2hhc2UnO1xuICAgICAgfSBlbHNlIGlmIChzdGVwID09PSBuYXZfaXRlbV9jb3VudCAmJiAkKHRoaXMub3B0aW9ucy5vcHBfaWRfc2VsZWN0b3IpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5kZWJ1ZygndGhpcyBpcyBhIHBheW1lbnQgc3RlcCBhbmQgdGhlcmUgaXMgbm8gc3RlcCBhZnRlciBpdCcpO1xuICAgICAgICBzdGVwID0gJ3B1cmNoYXNlJztcbiAgICAgIH0gZWxzZSBpZiAoc3RlcCA9PT0gbmF2X2l0ZW1fY291bnQgJiYgJCh0aGlzLm9wdGlvbnMub3BwX2lkX3NlbGVjdG9yKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgdGhpcy5kZWJ1ZygndGhpcyBpcyBhIHBvc3QtZmluaXNoIHN0ZXAuIGl0IGRvZXMgbm90IGhhdmUgYW4gaWQnKTtcbiAgICAgICAgc3RlcCA9IHN0ZXAgKyAxO1xuICAgICAgICBwb3N0X3B1cmNoYXNlID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5hbmFseXRpY3NUcmFja2luZ1N0ZXAoc3RlcCwgcG9zdF9wdXJjaGFzZSk7XG5cbiAgICAgIC8vIGFjdGl2YXRlIHRoZSBuYXYgdGFic1xuICAgICAgaWYgKCQoJy5wcm9ncmVzcy0tZG9uYXRpb24gbGkgLmFjdGl2ZScpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAkKCcjJyArIGFjdGl2ZSkuc2hvdygpO1xuICAgICAgICAkKCcucHJvZ3Jlc3MtLWRvbmF0aW9uIGxpLicgKyBhY3RpdmUgKyAnIGEnKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhY3RpdmUgPSAkKCcucHJvZ3Jlc3MtLWRvbmF0aW9uIGxpIC5hY3RpdmUnKS5wYXJlbnQoKS5wcm9wKCdjbGFzcycpO1xuICAgICAgICAkKCcjJyArIGFjdGl2ZSkuc2hvdygpO1xuICAgICAgfVxuXG4gICAgfSwgLy8gdGFiTmF2aWdhdGlvblxuXG4gICAgYW5hbHl0aWNzVHJhY2tpbmdTdGVwOiBmdW5jdGlvbihzdGVwLCBwb3N0X3B1cmNoYXNlKSB7XG4gICAgICB2YXIgbGV2ZWwgPSB0aGlzLmNoZWNrTGV2ZWwodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMsICduYW1lJyk7IC8vIGNoZWNrIHdoYXQgbGV2ZWwgaXQgaXNcbiAgICAgIHZhciBhbW91bnQgPSAkKHRoaXMub3B0aW9ucy5vcmlnaW5hbF9hbW91bnRfc2VsZWN0b3IpLnZhbCgpO1xuICAgICAgdmFyIHJlY3VycmluZyA9IHRoaXMub3B0aW9ucy5yZWN1cnJpbmc7XG4gICAgICB2YXIgb3BwX2lkID0gJCh0aGlzLm9wdGlvbnMub3BwX2lkX3NlbGVjdG9yKS52YWwoKTtcblxuICAgICAgLy8gaWYgd2UncmUgbm90IGFmdGVyIHRoZSBwdXJjaGFzZSwgdXNlIGFkZFByb2R1Y3RcbiAgICAgIGlmICggcG9zdF9wdXJjaGFzZSAhPT0gdHJ1ZSApIHtcbiAgICAgICAgZ2EoJ2VjOmFkZFByb2R1Y3QnLCB7XG4gICAgICAgICAgJ2lkJzogJ21pbm5wb3N0XycgKyBsZXZlbC50b0xvd2VyQ2FzZSgpICsgJ19tZW1iZXJzaGlwJyxcbiAgICAgICAgICAnbmFtZSc6ICdNaW5uUG9zdCAnICsgbGV2ZWwuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBsZXZlbC5zbGljZSgxKSArICcgTWVtYmVyc2hpcCcsXG4gICAgICAgICAgJ2NhdGVnb3J5JzogJ0RvbmF0aW9uJyxcbiAgICAgICAgICAnYnJhbmQnOiAnTWlublBvc3QnLFxuICAgICAgICAgICd2YXJpYW50JzogIHJlY3VycmluZyxcbiAgICAgICAgICAncHJpY2UnOiBhbW91bnQsXG4gICAgICAgICAgJ3F1YW50aXR5JzogMVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHN0ZXAgPT09ICdwdXJjaGFzZScpIHtcbiAgICAgICAgdGhpcy5kZWJ1ZygnYWRkIGEgcHVyY2hhc2UgYWN0aW9uLiBzdGVwIGlzICcgKyBzdGVwKTtcbiAgICAgICAgZ2EoJ2VjOnNldEFjdGlvbicsIHN0ZXAse1xuICAgICAgICAgICdpZCc6IG9wcF9pZCwgLy8gVHJhbnNhY3Rpb24gaWQgLSBUeXBlOiBzdHJpbmdcbiAgICAgICAgICAnYWZmaWxpYXRpb24nOiAnTWlublBvc3QnLCAvLyBTdG9yZSBuYW1lIC0gVHlwZTogc3RyaW5nXG4gICAgICAgICAgJ3JldmVudWUnOiBhbW91bnQsIC8vIFRvdGFsIFJldmVudWUgLSBUeXBlOiBudW1lcmljXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5kZWJ1ZygnYWRkIGEgY2hlY2tvdXQgYWN0aW9uLiBzdGVwIGlzICcgKyBzdGVwKTtcbiAgICAgICAgZ2EoJ2VjOnNldEFjdGlvbicsJ2NoZWNrb3V0Jywge1xuICAgICAgICAgICdzdGVwJzogc3RlcCwgICAgICAgICAgICAvLyBBIHZhbHVlIG9mIDEgaW5kaWNhdGVzIGZpcnN0IGNoZWNrb3V0IHN0ZXAuVmFsdWUgb2YgMiBpbmRpY2F0ZXMgc2Vjb25kIGNoZWNrb3V0IHN0ZXBcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGdhKCdzZXQnLCB7XG4gICAgICAgIHBhZ2U6IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSxcbiAgICAgICAgdGl0bGU6IGRvY3VtZW50LnRpdGxlXG4gICAgICB9KTtcbiAgICAgIGdhKCdzZW5kJywgJ3BhZ2V2aWV3Jywgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lKTtcblxuICAgIH0sIC8vIGFuYWx5dGljc1RyYWNraW5nU3RlcFxuXG4gICAgYW1vdW50QXNSYWRpbzogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgLy8gd2hlbiBhbW91bnQgZmllbGQgaXMgYSByYWRpbyBidXR0b24sIHdlIG5lZWQgdG8gY2hlY2sgaXQgd2hlbmV2ZXIgaXQgY2hhbmdlc1xuICAgICAgJChvcHRpb25zLm9yaWdpbmFsX2Ftb3VudF9zZWxlY3RvciwgZWxlbWVudCkuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoJCh0aGlzKS5pcygnOnJhZGlvJykpIHtcbiAgICAgICAgICAgIG9wdGlvbnMub3JpZ2luYWxfYW1vdW50ID0gcGFyc2VJbnQoJChvcHRpb25zLm9yaWdpbmFsX2Ftb3VudF9zZWxlY3RvciArICc6Y2hlY2tlZCcsIGVsZW1lbnQpLnZhbCgpLCAxMCk7XG4gICAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSwgLy8gYW1vdW50QXNSYWRpb1xuXG4gICAgYW1vdW50VXBkYXRlZDogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgLy8gd2hlbiBuZXcgYW1vdW50IHRleHQgZmllbGQgY2FuIGNoYW5nZSwgd2UgbmVlZCB0byBjaGFuZ2UgdGhlIGhpZGRlbiBmaWVsZFxuICAgICAgLy8gdGhlcmUgaXMgYWxzbyBwb3RlbnRpYWxseSBhbiBhZGRpdGlvbmFsIGFtb3VudCBmaWVsZCB2YWx1ZSB0byBhZGRcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHZhciBwYXltZW50X3R5cGUgPSAkKG9wdGlvbnMuY2hvb3NlX3BheW1lbnQgKyAnIGlucHV0JykudmFsKCk7XG5cbiAgICAgIC8vIHNldCB0aGUgZmFpciBtYXJrZXQgdmFsdWUgaWYgYXBwbGljYWJsZVxuICAgICAgdmFyIGFtb3VudF9zZWxlY3Rvcl9mYWlyX21hcmtldCA9ICQob3B0aW9ucy5vcmlnaW5hbF9hbW91bnRfc2VsZWN0b3IsIGVsZW1lbnQpO1xuICAgICAgaWYgKGFtb3VudF9zZWxlY3Rvcl9mYWlyX21hcmtldC5pcygnOnJhZGlvJykpIHtcbiAgICAgICAgYW1vdW50X3NlbGVjdG9yX2ZhaXJfbWFya2V0ID0gJChvcHRpb25zLm9yaWdpbmFsX2Ftb3VudF9zZWxlY3RvciArICc6Y2hlY2tlZCcsIGVsZW1lbnQpO1xuICAgICAgfVxuICAgICAgdGhhdC5zZXRGYWlyTWFya2V0VmFsdWUoYW1vdW50X3NlbGVjdG9yX2ZhaXJfbWFya2V0KTtcblxuICAgICAgJChvcHRpb25zLm9yaWdpbmFsX2Ftb3VudF9zZWxlY3RvciwgZWxlbWVudCkuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGF0Lm9wdGlvbnMub3JpZ2luYWxfYW1vdW50ID0gcGFyc2VJbnQoJCh0aGlzLCBlbGVtZW50KS52YWwoKSwgMTApO1xuICAgICAgICBpZiAoIHBheW1lbnRfdHlwZSA9PT0gJ2JhbmtfYWNjb3VudCcgKSB7XG4gICAgICAgICAgdGhhdC5jYWxjdWxhdGVGZWVzKHRoYXQub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQsICdiYW5rX2FjY291bnQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGF0LmNhbGN1bGF0ZUZlZXModGhhdC5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCwgJ2NhcmQnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGF0LnNldEZhaXJNYXJrZXRWYWx1ZSgkKHRoaXMsIGVsZW1lbnQpKTtcbiAgICAgIH0pO1xuICAgICAgJChvcHRpb25zLmFkZGl0aW9uYWxfYW1vdW50X2ZpZWxkLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoYXQub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQgPSBwYXJzZUludCgkKG9wdGlvbnMub3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSwgMTApO1xuICAgICAgICBpZiAoIHBheW1lbnRfdHlwZSA9PT0gJ2JhbmtfYWNjb3VudCcgKSB7XG4gICAgICAgICAgdGhhdC5jYWxjdWxhdGVGZWVzKHRoYXQub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQsICdiYW5rX2FjY291bnQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGF0LmNhbGN1bGF0ZUZlZXModGhhdC5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCwgJ2NhcmQnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICB9LCAvLyBhbW91bnRVcGRhdGVkXG5cbiAgICBzZXRGYWlyTWFya2V0VmFsdWU6IGZ1bmN0aW9uKGFtb3VudF9zZWxlY3Rvcikge1xuICAgICAgLy8gaWYgdGhlcmUgaXMgYSBmYWlyIG1hcmtldCB2YWx1ZSBmaWVsZCwgY2hlY2sgYW5kIHNlZSBpZiB3ZSBjYW4gcG9wdWxhdGUgaXRcbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5mYWlyX21hcmtldF92YWx1ZV9zZWxlY3RvcikubGVuZ3RoID4gMCkge1xuICAgICAgICB2YXIgZmFpck1hcmtldFZhbHVlID0gYW1vdW50X3NlbGVjdG9yLmRhdGEoJ2ZhaXItbWFya2V0LXZhbHVlJyk7XG4gICAgICAgICQodGhpcy5vcHRpb25zLmZhaXJfbWFya2V0X3ZhbHVlX3NlbGVjdG9yKS52YWwoZmFpck1hcmtldFZhbHVlKTtcbiAgICAgIH1cbiAgICB9LCAvLyBzZXRGYWlyTWFya2V0VmFsdWVcblxuICAgIGNhbGN1bGF0ZUZlZXM6IGZ1bmN0aW9uKGFtb3VudCwgc3RyaXBlX3BheW1lbnRfdHlwZSkge1xuICAgICAgLy8gdGhpcyBzZW5kcyB0aGUgYW1vdW50IGFuZCBzdHJpcGUgcGF5bWVudCB0eXBlIHRvIHB5dGhvbjsgZ2V0IHRoZSBmZWUgYW5kIGRpc3BsYXkgaXQgdG8gdGhlIHVzZXIgb24gdGhlIGNoZWNrYm94IGxhYmVsXG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB2YXIgdG90YWxfYW1vdW50ID0gYW1vdW50O1xuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmFkZGl0aW9uYWxfYW1vdW50X2ZpZWxkKS5sZW5ndGggPiAwICYmICQodGhpcy5vcHRpb25zLmFkZGl0aW9uYWxfYW1vdW50X2ZpZWxkKS52YWwoKSA+IDApIHtcbiAgICAgICAgdmFyIGFkZGl0aW9uYWxfYW1vdW50ID0gJCh0aGlzLm9wdGlvbnMuYWRkaXRpb25hbF9hbW91bnRfZmllbGQpLnZhbCgpO1xuICAgICAgICB0b3RhbF9hbW91bnQgPSBwYXJzZUludChhZGRpdGlvbmFsX2Ftb3VudCwgMTApICsgcGFyc2VJbnQoYW1vdW50LCAxMCk7XG4gICAgICB9XG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgYW1vdW50OiB0b3RhbF9hbW91bnQsXG4gICAgICAgIHN0cmlwZV9wYXltZW50X3R5cGU6IHN0cmlwZV9wYXltZW50X3R5cGVcbiAgICAgIH07XG4gICAgICB0aGF0LnNldFN0cmlwZVBheW1lbnRUeXBlKHN0cmlwZV9wYXltZW50X3R5cGUpO1xuICAgICAgJC5hamF4KHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIHVybDogJy9jYWxjdWxhdGUtZmVlcy8nLFxuICAgICAgICBkYXRhOiBkYXRhXG4gICAgICB9KS5kb25lKGZ1bmN0aW9uKCBkYXRhICkge1xuICAgICAgICBpZiAoJChkYXRhLmZlZXMpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAkKHRoYXQub3B0aW9ucy5mZWVfYW1vdW50KS50ZXh0KHBhcnNlRmxvYXQoZGF0YS5mZWVzKS50b0ZpeGVkKDIpKTtcbiAgICAgICAgICB0aGF0LmNyZWRpdENhcmRGZWVDaGVja2JveCgkKHRoYXQub3B0aW9ucy5wYXlfY2NfcHJvY2Vzc2luZ19zZWxlY3RvcikpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LCAvLyBjYWxjdWxhdGVGZWVzXG5cbiAgICBjcmVkaXRDYXJkUHJvY2Vzc2luZ0ZlZXM6IGZ1bmN0aW9uKG9wdGlvbnMsIHJlc2V0KSB7XG4gICAgICAvLyB0aGlzIGFkZHMgb3Igc3VidHJhY3RzIHRoZSBmZWUgdG8gdGhlIG9yaWdpbmFsIGFtb3VudCB3aGVuIHRoZSB1c2VyIGluZGljYXRlcyB0aGV5IGRvIG9yIGRvIG5vdCB3YW50IHRvIHBheSB0aGUgZmVlc1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdGhhdC5jcmVkaXRDYXJkRmVlQ2hlY2tib3goJCh0aGlzLm9wdGlvbnMucGF5X2NjX3Byb2Nlc3Npbmdfc2VsZWN0b3IpKTtcbiAgICAgICQodGhpcy5vcHRpb25zLnBheV9jY19wcm9jZXNzaW5nX3NlbGVjdG9yKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHRoYXQuY3JlZGl0Q2FyZEZlZUNoZWNrYm94KHRoaXMpO1xuICAgICAgfSk7XG4gICAgfSwgLy8gY3JlZGl0Q2FyZFByb2Nlc3NpbmdGZWVzXG5cbiAgICBzZXRTdHJpcGVQYXltZW50VHlwZTogZnVuY3Rpb24oc3RyaXBlX3BheW1lbnRfdHlwZSkge1xuICAgICAgaWYgKCQoJ2lucHV0W25hbWU9XCJzdHJpcGVfcGF5bWVudF90eXBlXCJdJykubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICQodGhpcy5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5hcHBlbmQoJzxpbnB1dCB0eXBlPVxcXCJoaWRkZW5cXFwiIG5hbWU9XFxcInN0cmlwZV9wYXltZW50X3R5cGVcXFwiPicpO1xuICAgICAgfVxuICAgICAgJCgnaW5wdXRbbmFtZT1cInN0cmlwZV9wYXltZW50X3R5cGVcIl0nKS52YWwoc3RyaXBlX3BheW1lbnRfdHlwZSk7XG4gICAgfSwgLy8gc2V0U3RyaXBlUGF5bWVudFR5cGVcblxuICAgIGNyZWRpdENhcmRGZWVDaGVja2JveDogZnVuY3Rpb24oZmllbGQpIHtcbiAgICAgIHZhciBmdWxsX2Ftb3VudDtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIGlmICgkKGZpZWxkKS5pcygnOmNoZWNrZWQnKSB8fCAkKGZpZWxkKS5wcm9wKCdjaGVja2VkJykpIHtcbiAgICAgICAgJCgnLmFtb3VudCAubGV2ZWwtYW1vdW50JykuYWRkQ2xhc3MoJ2Z1bGwtYW1vdW50Jyk7XG4gICAgICAgIGZ1bGxfYW1vdW50ID0gKHRoYXQub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQgKyBwYXJzZUZsb2F0KCQodGhhdC5vcHRpb25zLmZlZV9hbW91bnQpLnRleHQoKSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZnVsbF9hbW91bnQgPSB0aGF0Lm9wdGlvbnMub3JpZ2luYWxfYW1vdW50O1xuICAgICAgfVxuICAgICAgJCh0aGF0Lm9wdGlvbnMuZnVsbF9hbW91bnRfc2VsZWN0b3IpLnRleHQocGFyc2VGbG9hdChmdWxsX2Ftb3VudCkudG9GaXhlZCgyKSk7XG4gICAgfSwgLy8gY3JlZGl0Q2FyZEZlZUNoZWNrYm94XG5cbiAgICBkb25hdGVBbm9ueW1vdXNseTogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgaWYgKCQob3B0aW9ucy5hbm9ueW1vdXNfc2VsZWN0b3IsIGVsZW1lbnQpLmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgICQob3B0aW9ucy5uYW1lX3NlbGVjdG9yICsgJyBkaXY6Zmlyc3QnLCBlbGVtZW50KS5oaWRlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkKG9wdGlvbnMubmFtZV9zZWxlY3RvciArICcgZGl2OmZpcnN0JywgZWxlbWVudCkuc2hvdygpO1xuICAgICAgfVxuXG4gICAgICAkKG9wdGlvbnMuYW5vbnltb3VzX3NlbGVjdG9yLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICgkKHRoaXMpLmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgICAgJChvcHRpb25zLm5hbWVfc2VsZWN0b3IgKyAnIGRpdjpmaXJzdCcsIGVsZW1lbnQpLmhpZGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkKG9wdGlvbnMubmFtZV9zZWxlY3RvciArICcgZGl2OmZpcnN0JywgZWxlbWVudCkuc2hvdygpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LCAvLyBkb25hdGVBbm9ueW1vdXNseVxuXG4gICAgY2hlY2tMZXZlbDogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucywgcmV0dXJudmFsdWUpIHtcbiAgICAgIC8vIHdlIGNvdWxkIG1heWJlIGdldCByaWQgb2YgdGhpcyBpZiB3ZSBjb3VsZCBtb3ZlIHRoaXMgcGFydCBpbnRvIHdvcmRwcmVzc1xuICAgICAgdmFyIGxldmVsID0gJyc7XG4gICAgICB2YXIgbGV2ZWxudW0gPSAwO1xuICAgICAgdmFyIGFtb3VudF95ZWFybHk7XG4gICAgICB2YXIgZnJlcXVlbmN5ID0gb3B0aW9ucy5mcmVxdWVuY3k7XG4gICAgICB2YXIgYW1vdW50ID0gb3B0aW9ucy5vcmlnaW5hbF9hbW91bnQ7XG5cbiAgICAgIGlmIChmcmVxdWVuY3kgPT09IDEyKSB7XG4gICAgICAgIGFtb3VudF95ZWFybHkgPSBhbW91bnQgKiBmcmVxdWVuY3k7XG4gICAgICB9IGVsc2UgaWYgKGZyZXF1ZW5jeSA9PT0gMSkge1xuICAgICAgICBhbW91bnRfeWVhcmx5ID0gYW1vdW50O1xuICAgICAgfVxuICAgICAgXG4gICAgICAkLmVhY2gob3B0aW9ucy5sZXZlbHMsIGZ1bmN0aW9uKGluZGV4LCB2YWx1ZSkge1xuICAgICAgICB2YXIgbmFtZSA9IHZhbHVlLm5hbWU7XG4gICAgICAgIHZhciBudW0gPSBpbmRleDtcbiAgICAgICAgdmFyIG1heCA9IHZhbHVlLm1heDtcbiAgICAgICAgdmFyIG1pbiA9IHZhbHVlLm1pbjtcbiAgICAgICAgaWYgKHR5cGVvZiBtaW4gIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBtYXggIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgaWYgKGFtb3VudF95ZWFybHkgPj0gbWluICYmIGFtb3VudF95ZWFybHkgPCBtYXgpIHtcbiAgICAgICAgICAgIGxldmVsID0gbmFtZTtcbiAgICAgICAgICAgIGxldmVsbnVtID0gbnVtO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgbWF4ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGlmIChhbW91bnRfeWVhcmx5IDwgbWF4KSB7XG4gICAgICAgICAgICBsZXZlbCA9IG5hbWU7XG4gICAgICAgICAgICBsZXZlbG51bSA9IG51bTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG1pbiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBpZiAoYW1vdW50X3llYXJseSA+PSBtaW4pIHtcbiAgICAgICAgICAgIGxldmVsID0gbmFtZTtcbiAgICAgICAgICAgIGxldmVsbnVtID0gbnVtO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBpZiAocmV0dXJudmFsdWUgPT09ICduYW1lJykge1xuICAgICAgICByZXR1cm4gbGV2ZWw7XG4gICAgICB9IGVsc2UgaWYgKHJldHVybnZhbHVlID09PSAnbnVtJykge1xuICAgICAgICByZXR1cm4gbGV2ZWxudW07ICBcbiAgICAgIH1cbiAgICB9LCAvLyBjaGVja0xldmVsXG5cbiAgICBob25vck9yTWVtb3J5OiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICBpZiAoJChvcHRpb25zLmhvbm9yX29yX21lbW9yeV9jaG9vc2VyICsgJzpjaGVja2VkJykudmFsKCkpIHtcbiAgICAgICAgJChvcHRpb25zLmhvbm9yX21lbW9yeV9pbnB1dF9ncm91cCwgZWxlbWVudCkuc2hvdygpO1xuICAgICAgICAkKG9wdGlvbnMuaG9ub3JfdHlwZV9zZWxlY3RvcikudGV4dCgkKG9wdGlvbnMuaG9ub3Jfb3JfbWVtb3J5X2Nob29zZXIgKyAnOmNoZWNrZWQnKS52YWwoKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkKG9wdGlvbnMuaG9ub3JfbWVtb3J5X2lucHV0X2dyb3VwLCBlbGVtZW50KS5oaWRlKCk7XG4gICAgICAgICQob3B0aW9ucy5ob25vcl9uYW1lX3NlbGVjdG9yICsgJyBpbnB1dCcsIGVsZW1lbnQpLnZhbCgnJyk7XG4gICAgICB9XG4gICAgfSwgLy8gaG9ub3JPck1lbW9yeVxuXG4gICAgaG9ub3JPck1lbW9yeVRvZ2dsZTogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdGhhdC5ob25vck9yTWVtb3J5KHRoYXQuZWxlbWVudCwgdGhhdC5vcHRpb25zKTtcbiAgICAgICQob3B0aW9ucy5ob25vcl9vcl9tZW1vcnlfY2hvb3NlciwgZWxlbWVudCkuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGF0Lmhvbm9yT3JNZW1vcnkodGhhdC5lbGVtZW50LCB0aGF0Lm9wdGlvbnMpO1xuICAgICAgfSk7XG4gICAgfSwgLy8gaG9ub3JPck1lbW9yeVRvZ2dsZVxuXG4gICAgb3V0c2lkZVVuaXRlZFN0YXRlczogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgJChvcHRpb25zLnNob3dfYmlsbGluZ19jb3VudHJ5X3NlbGVjdG9yKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgJChvcHRpb25zLmJpbGxpbmdfY291bnRyeV9zZWxlY3Rvcikuc2hvdygpO1xuICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmhpZGUoKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSk7XG4gICAgICAkKG9wdGlvbnMuc2hvd19zaGlwcGluZ19jb3VudHJ5X3NlbGVjdG9yKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgJChvcHRpb25zLnNoaXBwaW5nX2NvdW50cnlfc2VsZWN0b3IpLnNob3coKTtcbiAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5oaWRlKCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuICAgIH0sIC8vIG91dHNpZGVVbml0ZWRTdGF0ZXNcblxuICAgIHNoaXBwaW5nQWRkcmVzczogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdmFyIHNob3dfc2hpcHBpbmcgPSBmYWxzZTtcbiAgICAgIGlmICgkKG9wdGlvbnMudXNlX2Zvcl9zaGlwcGluZ19zZWxlY3RvcikubGVuZ3RoID4gMCkgeyAvLyB3ZSBoYXZlIGEgc2hpcHBpbmcgY2hlY2tib3hcbiAgICAgICAgc2hvd19zaGlwcGluZyA9IHRydWU7XG4gICAgICB9XG4vLyAgICAgIHNob3dfc2hpcHBpbmcgPSAhISQob3B0aW9ucy51c2VfZm9yX3NoaXBwaW5nX3NlbGVjdG9yICsgJzpjaGVja2VkJywgZWxlbWVudCkubGVuZ3RoO1xuLy8gICAgICAvL3RoaXMuZGVidWcoJ3Nob3cgaXMgdGhlcmUnKTtcblxuLyogICAgICAkKG9wdGlvbnMudXNlX2Zvcl9zaGlwcGluZ19zZWxlY3RvciwgZWxlbWVudCkuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGF0LnNoaXBwaW5nQWRkcmVzcyhlbGVtZW50LCBvcHRpb25zKTtcbiAgICAgICAgLy90aGlzLmRlYnVnKCdjaGFuZ2UgaXQnKTtcbiAgICAgIH0pO1xuKi9cbiAgICAgIGlmIChzaG93X3NoaXBwaW5nID09PSB0cnVlICkge1xuICAgICAgICAkKG9wdGlvbnMudXNlX2Zvcl9zaGlwcGluZ19zZWxlY3RvciwgZWxlbWVudCkucGFyZW50KCkuc2hvdygpO1xuICAgICAgICBpZiAoJChvcHRpb25zLnVzZV9mb3Jfc2hpcHBpbmdfc2VsZWN0b3IsIGVsZW1lbnQpLmlzKCc6Y2hlY2tlZCcpKSB7IC8vIHVzZSBzYW1lIGFzIGJpbGxpbmdcbiAgICAgICAgICAkKG9wdGlvbnMuc2hpcHBpbmdfc2VsZWN0b3IpLmhpZGUoKTtcbiAgICAgICAgfSBlbHNlIHsgLy8gc2VwYXJhdGUgc2hpcHBpbmcgYW5kIGJpbGxpbmdcbiAgICAgICAgICAkKG9wdGlvbnMuc2hpcHBpbmdfc2VsZWN0b3IpLnNob3coKTtcbiAgICAgICAgfVxuICAgICAgICAkKG9wdGlvbnMudXNlX2Zvcl9zaGlwcGluZ19zZWxlY3RvciwgZWxlbWVudCkuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHRoYXQuc2hpcHBpbmdBZGRyZXNzKGVsZW1lbnQsIG9wdGlvbnMpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIFxuICAgIH0sIC8vIHNoaXBwaW5nQWRkcmVzc1xuXG4gICAgYWxsb3dNaW5ucG9zdEFjY291bnQ6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMsIGNoYW5nZWQpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHZhciBhY2NvdW50X2V4aXN0cyA9IGZhbHNlO1xuXG4gICAgICAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpLmFwcGVuZCgnPHAgY2xhc3M9XCJlcnJvciBzcGFtLWVtYWlsXCI+VGhpcyBlbWFpbCBhZGRyZXNzIGhhcyBiZWVuIGRldGVjdGVkIGFzIGEgc3BhbW1lci48L3A+Jyk7XG4gICAgICAkKCcuc3BhbS1lbWFpbCcpLmhpZGUoKTtcblxuICAgICAgJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgICQoJy5zcGFtLWVtYWlsJykuaGlkZSgpO1xuICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpbnZhbGlkIGVycm9yJyk7XG4gICAgICB9KTtcblxuICAgICAgZnVuY3Rpb24gZG9uZVR5cGluZyAoKSB7XG4gICAgICAgIHZhciBlbWFpbCA9ICQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCk7XG4gICAgICAgIGFjY291bnRfZXhpc3RzID0gdGhhdC5jaGVja01pbm5wb3N0QWNjb3VudChlbGVtZW50LCBvcHRpb25zLCBlbWFpbCk7XG4gICAgICB9XG5cbiAgICAgIC8vc2V0dXAgYmVmb3JlIGZ1bmN0aW9uc1xuICAgICAgdmFyIHR5cGluZ1RpbWVyOyAgICAgICAgICAgICAgICAvL3RpbWVyIGlkZW50aWZpZXJcbiAgICAgIHZhciBkb25lVHlwaW5nSW50ZXJ2YWwgPSA1MDAwOyAgLy90aW1lIGluIG1zLCA1IHNlY29uZCBmb3IgZXhhbXBsZVxuXG4gICAgICAvL29uIGtleXVwLCBzdGFydCB0aGUgY291bnRkb3duXG4gICAgICAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLmtleXVwKGZ1bmN0aW9uKCl7XG4gICAgICAgIGNsZWFyVGltZW91dCh0eXBpbmdUaW1lcik7XG4gICAgICAgIGlmICgkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCkge1xuICAgICAgICAgIHR5cGluZ1RpbWVyID0gc2V0VGltZW91dChkb25lVHlwaW5nLCBkb25lVHlwaW5nSW50ZXJ2YWwpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgLy91c2VyIGlzIFwiZmluaXNoZWQgdHlwaW5nLFwiIGRvIHNvbWV0aGluZ1xuXG4gICAgICBpZiAoJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgJChvcHRpb25zLnBhc3N3b3JkX3NlbGVjdG9yLCBlbGVtZW50KS5zaG93KCk7XG4gICAgICAgIG9wdGlvbnMuY3JlYXRlX2FjY291bnQgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJChvcHRpb25zLnBhc3N3b3JkX3NlbGVjdG9yLCBlbGVtZW50KS5oaWRlKCk7XG4gICAgICB9XG5cbiAgICAgICQob3B0aW9ucy5jcmVhdGVfbXBfc2VsZWN0b3IsIGVsZW1lbnQpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgdGhhdC5hbGxvd01pbm5wb3N0QWNjb3VudChlbGVtZW50LCBvcHRpb25zLCB0cnVlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoY2hhbmdlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgLy8gYWxsb3cgdXNlcnMgdG8gc2hvdyBwbGFpbiB0ZXh0LCBvciB0byBzZWUgcHcgY3JpdGVyaWFcbiAgICAgICAgJChvcHRpb25zLnBhc3N3b3JkX3NlbGVjdG9yLCBlbGVtZW50KS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJoZWxwLWxpbmtcIj48c3Bhbj5QYXNzd29yZCBoZWxwPC9zcGFuPjwvZGl2PjxkaXYgY2xhc3M9XCJmb3JtLWhlbHBcIj5QYXNzd29yZCBtdXN0IGJlIGF0IGxlYXN0IDYgY2hhcmFjdGVycy48L2Rpdj48bGFiZWwgY2xhc3M9XCJhZGRpdGlvbmFsLW9wdGlvblwiPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBuYW1lPVwic2hvd3Bhc3N3b3JkXCIgaWQ9XCJzaG93cGFzc3dvcmRcIj4gU2hvdyBwYXNzd29yZDwvbGFiZWw+Jyk7XG4gICAgICAgICQob3B0aW9ucy5jcmVhdGVfbXBfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpLmJlZm9yZSgnPHAgY2xhc3M9XCJhY2NvdW50LWV4aXN0cyBzdWNjZXNzXCI+VGhlcmUgaXMgYWxyZWFkeSBhIE1pbm5Qb3N0LmNvbSBhY2NvdW50IHdpdGggdGhpcyBlbWFpbC48L3A+Jyk7XG4gICAgICAgICQoJy5hY2NvdW50LWV4aXN0cycpLmhpZGUoKTtcbiAgICAgICAgJCgnI3Nob3dwYXNzd29yZCcpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICgkKHRoaXMpLmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgICAgICAkKCcjcGFzc3dvcmQnKS5nZXQoMCkudHlwZSA9ICd0ZXh0JztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCgnI3Bhc3N3b3JkJykuZ2V0KDApLnR5cGUgPSAncGFzc3dvcmQnO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnLmZvcm0taXRlbSAuZm9ybS1oZWxwJykuaGlkZSgpO1xuICAgICAgfVxuICAgICAgJCgnLmhlbHAtbGluaycpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpLm5leHQoJy5mb3JtLWhlbHAnKS50b2dnbGUoKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSk7XG4gICAgfSwgLy8gYWxsb3dNaW5ucG9zdEFjY291bnRcblxuICAgIGNoZWNrTWlubnBvc3RBY2NvdW50OiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zLCBlbWFpbCkge1xuICAgICAgdmFyIHVzZXIgPSB7XG4gICAgICAgIGVtYWlsOiBlbWFpbFxuICAgICAgfTtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICQuYWpheCh7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIHVybDogb3B0aW9ucy5taW5ucG9zdF9yb290ICsgJy93cC1qc29uL3VzZXItYWNjb3VudC1tYW5hZ2VtZW50L3YxL2NoZWNrLWFjY291bnQnLFxuICAgICAgICBkYXRhOiB1c2VyXG4gICAgICB9KS5kb25lKGZ1bmN0aW9uKCByZXN1bHQgKSB7XG4gICAgICAgIGlmIChyZXN1bHQuc3RhdHVzID09PSAnc3VjY2VzcycgJiYgcmVzdWx0LnJlYXNvbiA9PT0gJ3VzZXIgZXhpc3RzJykgeyAvLyB1c2VyIGV4aXN0c1xuICAgICAgICAgIGlmICgkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KS5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICAgICAgJChvcHRpb25zLnBhc3N3b3JkX3NlbGVjdG9yLCBlbGVtZW50KS5oaWRlKCk7XG4gICAgICAgICAgICAkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKS5oaWRlKCk7XG4gICAgICAgICAgICAkKCcuYWNjb3VudC1leGlzdHMnLCBlbGVtZW50KS5zaG93KCk7XG4gICAgICAgICAgfVxuICAgICAgICAgICQob3B0aW9ucy5jcmVhdGVfbXBfc2VsZWN0b3IsIGVsZW1lbnQpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICgkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KS5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICAgICAgICAkKG9wdGlvbnMucGFzc3dvcmRfc2VsZWN0b3IsIGVsZW1lbnQpLmhpZGUoKTtcbiAgICAgICAgICAgICAgJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkucGFyZW50KCkuaGlkZSgpO1xuICAgICAgICAgICAgICAkKCcuYWNjb3VudC1leGlzdHMnLCBlbGVtZW50KS5zaG93KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoIHJlc3VsdC5zdGF0dXMgPT09ICdzcGFtJyApIHtcbiAgICAgICAgICAkKHRoYXQub3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvcikuYWRkQ2xhc3MoJ2ludmFsaWQgZXJyb3InKTtcbiAgICAgICAgICAkKCAnLnNwYW0tZW1haWwnKS5zaG93KCk7XG4gICAgICAgIH0gZWxzZSB7IC8vIHVzZXIgZG9lcyBub3QgZXhpc3Qgb3IgYWpheCBjYWxsIGZhaWxlZFxuICAgICAgICAgIGlmICgkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KS5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICAgICAgJChvcHRpb25zLnBhc3N3b3JkX3NlbGVjdG9yLCBlbGVtZW50KS5zaG93KCk7XG4gICAgICAgICAgICBvcHRpb25zLmNyZWF0ZV9hY2NvdW50ID0gdHJ1ZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJChvcHRpb25zLnBhc3N3b3JkX3NlbGVjdG9yLCBlbGVtZW50KS5oaWRlKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgICQoJy5hY2NvdW50LWV4aXN0cycsIGVsZW1lbnQpLmhpZGUoKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sIC8vIGNoZWNrTWlubnBvc3RBY2NvdW50XG5cbiAgICBjaG9vc2VQYXltZW50TWV0aG9kOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG5cbiAgICAgIHZhciB0aGF0ID0gdGhpcztcblxuICAgICAgaWYgKCQob3B0aW9ucy5jaG9vc2VfcGF5bWVudCkubGVuZ3RoID4gMCkge1xuICAgICAgICBpZiAoJChvcHRpb25zLmNob29zZV9wYXltZW50ICsgJyBpbnB1dCcpLmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgICAgdmFyIGNoZWNrZWQgPSAkKG9wdGlvbnMuY2hvb3NlX3BheW1lbnQgKyAnIGlucHV0OmNoZWNrZWQnKS5hdHRyKCdpZCcpO1xuICAgICAgICAgIHZhciBjaGVja2VkX3ZhbHVlID0gJChvcHRpb25zLmNob29zZV9wYXltZW50ICsgJyBpbnB1dDpjaGVja2VkJykudmFsKCk7XG4gICAgICAgICAgdGhhdC5zZXR1cFBheW1lbnRNZXRob2QoY2hlY2tlZCwgY2hlY2tlZF92YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICAkKG9wdGlvbnMuY2hvb3NlX3BheW1lbnQgKyAnIGlucHV0JykuY2hhbmdlKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIHRoYXQuc2V0dXBQYXltZW50TWV0aG9kKHRoaXMuaWQsIHRoaXMudmFsdWUpO1xuXG4gICAgICAgICAgaWYgKCB0aGlzLnZhbHVlID09PSAnYmFua19hY2NvdW50JyApIHtcbiAgICAgICAgICAgICQoJ2lucHV0W25hbWU9XCJzdHJpcGVUb2tlblwiXScsICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKSkucmVtb3ZlKCk7XG4gICAgICAgICAgICB0aGF0LmFjaEZpZWxkcyh0aGF0LmVsZW1lbnQsIHRoYXQub3B0aW9ucyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoJ2lucHV0W25hbWU9XCJwdWJsaWNfdG9rZW5cIl0nLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikpLnJlbW92ZSgpO1xuICAgICAgICAgICAgJCgnaW5wdXRbbmFtZT1cImFjY291bnRfaWRcIl0nLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikpLnJlbW92ZSgpO1xuICAgICAgICAgICAgJCgnaW5wdXRbbmFtZT1cImJhbmtUb2tlblwiXScsICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKSkucmVtb3ZlKCk7XG4gICAgICAgICAgICB0aGF0LmNhbGN1bGF0ZUZlZXModGhhdC5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCwgJ2NhcmQnKTsgLy8gd2UgY2FuJ3QgdXNlIGNyZWRpdGNhcmRmaWVsZHMgbWV0aG9kIGhlcmVcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICB9XG4gICAgfSwgLy8gY2hvb3NlUGF5bWVudE1ldGhvZFxuXG4gICAgcGF5bWVudFJlcXVlc3RFbGVtZW50OiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB2YXIgYW1vdW50ID0gdGhhdC5vcHRpb25zLmFtb3VudDtcbiAgICAgIC8qKlxuICAgICAgICogUGF5bWVudCBSZXF1ZXN0IEVsZW1lbnRcbiAgICAgICAqL1xuICAgICAgdmFyIHBheW1lbnRSZXF1ZXN0ID0gdGhhdC5zdHJpcGUucGF5bWVudFJlcXVlc3Qoe1xuICAgICAgICBjb3VudHJ5OiBcIlVTXCIsXG4gICAgICAgIGN1cnJlbmN5OiBcInVzZFwiLFxuICAgICAgICB0b3RhbDoge1xuICAgICAgICAgIGFtb3VudDogYW1vdW50LFxuICAgICAgICAgIGxhYmVsOiBcIk1pbm5Qb3N0XCJcbiAgICAgICAgfSxcbiAgICAgICAgcmVxdWVzdFBheWVyTmFtZTogdHJ1ZSxcbiAgICAgICAgcmVxdWVzdFBheWVyRW1haWw6IHRydWVcbiAgICAgICAgLypyZXF1ZXN0U2hpcHBpbmc6IHRydWUsXG4gICAgICAgIHNoaXBwaW5nT3B0aW9uczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGlkOiBcImZyZWUtc2hpcHBpbmdcIixcbiAgICAgICAgICAgIGxhYmVsOiBcIkZyZWUgc2hpcHBpbmdcIixcbiAgICAgICAgICAgIGRldGFpbDogXCJBcnJpdmVzIGluIDUgdG8gNyBkYXlzXCIsXG4gICAgICAgICAgICBhbW91bnQ6IDBcbiAgICAgICAgICB9XG4gICAgICAgIF0qL1xuICAgICAgfSk7XG5cbiAgICAgIHRoYXQucHJCdXR0b24gPSB0aGF0LmVsZW1lbnRzLmNyZWF0ZSgncGF5bWVudFJlcXVlc3RCdXR0b24nLCB7XG4gICAgICAgIHBheW1lbnRSZXF1ZXN0OiBwYXltZW50UmVxdWVzdCxcbiAgICAgIH0pO1xuXG4gICAgICAvLyBDaGVjayB0aGUgYXZhaWxhYmlsaXR5IG9mIHRoZSBQYXltZW50IFJlcXVlc3QgQVBJIGZpcnN0LlxuICAgICAgcGF5bWVudFJlcXVlc3QuY2FuTWFrZVBheW1lbnQoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgdGhhdC5wckJ1dHRvbi5tb3VudCgnI3BheW1lbnQtcmVxdWVzdC1idXR0b24nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGF5bWVudC1yZXF1ZXN0LWJ1dHRvbicpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBwYXltZW50UmVxdWVzdC5vbigndG9rZW4nLCBmdW5jdGlvbihldmVudCkge1xuXG4gICAgICAgIHRoYXQuc3RyaXBlVG9rZW5IYW5kbGVyKGV2ZW50LCAncGF5bWVudF9yZXF1ZXN0Jyk7XG4gICAgICAgIFxuICAgICAgfSk7XG5cbiAgICB9LCAvLyBwYXltZW50UmVxdWVzdE1ldGhvZFxuICAgIHNldHVwUGF5bWVudE1ldGhvZDogZnVuY3Rpb24oaWQsIHZhbHVlKSB7XG4gICAgICAkKHRoaXMub3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvcikucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgJCh0aGlzLm9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IgKyAnLicgKyBpZCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgLy8kKHRoaXMub3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvciArICc6bm90KC5hY3RpdmUpIGxhYmVsJykucmVtb3ZlQ2xhc3MoJ3JlcXVpcmVkJyk7XG4gICAgICAvLyQodGhpcy5vcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yICsgJzpub3QoLmFjdGl2ZSkgaW5wdXQnKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgICQodGhpcy5vcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yICsgJzpub3QoLmFjdGl2ZSkgaW5wdXQnKS52YWwoJycpO1xuICAgICAgLy8kKHRoaXMub3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvciArICcuYWN0aXZlIGxhYmVsJykuYWRkQ2xhc3MoJ3JlcXVpcmVkJyk7XG4gICAgICAvLyQodGhpcy5vcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yICsgJy5hY3RpdmUgaW5wdXQnKS5wcm9wKCdyZXF1aXJlZCcsIHRydWUpO1xuICAgICAgaWYgKCB2YWx1ZSA9PT0gJ2JhbmtfYWNjb3VudCcgKSB7XG4gICAgICAgIHRoaXMuY2FsY3VsYXRlRmVlcyh0aGlzLm9wdGlvbnMub3JpZ2luYWxfYW1vdW50LCAnYmFua19hY2NvdW50Jyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNhbGN1bGF0ZUZlZXModGhpcy5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCwgJ2NhcmQnKTtcbiAgICAgIH1cbiAgICB9LCAvLyBzZXR1cFBheW1lbnRNZXRob2RcblxuICAgIGNyZWRpdENhcmRGaWVsZHM6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcblxuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuXG4gICAgICB2YXIgc3R5bGUgPSB7XG4gICAgICAgIGJhc2U6IHtcbiAgICAgICAgICBpY29uQ29sb3I6ICcjNjY2RUU4JyxcbiAgICAgICAgICBsaW5lSGVpZ2h0OiAnMzdweCcsXG4gICAgICAgICAgZm9udFdlaWdodDogNDAwLFxuICAgICAgICAgIGZvbnRGYW1pbHk6ICdHZW9yZ2lhLENhbWJyaWEsVGltZXMgTmV3IFJvbWFuLFRpbWVzLHNlcmlmJyxcbiAgICAgICAgICBmb250U2l6ZTogJzE2cHgnLFxuICAgICAgICB9LFxuICAgICAgfTtcblxuICAgICAgLy8gQWRkIGFuIGluc3RhbmNlIG9mIHRoZSBjYXJkIFVJIGNvbXBvbmVudCBpbnRvIHRoZSBgY2FyZC1lbGVtZW50YCA8ZGl2PlxuICAgICAgLy9jYXJkLm1vdW50KCcjY2FyZC1lbGVtZW50Jyk7XG4gICAgICBpZiAoICQoJy5jcmVkaXQtY2FyZC1ncm91cCcpLmxlbmd0aCA9PT0gMCAmJiAkKCcucGF5bWVudC1tZXRob2QuY2hvb3NlLWNhcmQnKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhhdC5jYXJkTnVtYmVyRWxlbWVudCA9IHRoYXQuZWxlbWVudHMuY3JlYXRlKCdjYXJkTnVtYmVyJywge1xuICAgICAgICBzdHlsZTogc3R5bGVcbiAgICAgIH0pO1xuICAgICAgdGhhdC5jYXJkTnVtYmVyRWxlbWVudC5tb3VudChvcHRpb25zLmNjX251bV9zZWxlY3Rvcik7XG5cbiAgICAgIHRoYXQuY2FyZEV4cGlyeUVsZW1lbnQgPSB0aGF0LmVsZW1lbnRzLmNyZWF0ZSgnY2FyZEV4cGlyeScsIHtcbiAgICAgICAgc3R5bGU6IHN0eWxlXG4gICAgICB9KTtcbiAgICAgIHRoYXQuY2FyZEV4cGlyeUVsZW1lbnQubW91bnQob3B0aW9ucy5jY19leHBfc2VsZWN0b3IpO1xuXG4gICAgICB0aGF0LmNhcmRDdmNFbGVtZW50ID0gdGhhdC5lbGVtZW50cy5jcmVhdGUoJ2NhcmRDdmMnLCB7XG4gICAgICAgIHN0eWxlOiBzdHlsZVxuICAgICAgfSk7XG4gICAgICB0aGF0LmNhcmRDdmNFbGVtZW50Lm1vdW50KG9wdGlvbnMuY2NfY3Z2X3NlbGVjdG9yKTtcblxuICAgICAgLy8gdmFsaWRhdGUvZXJyb3IgaGFuZGxlIHRoZSBjYXJkIGZpZWxkc1xuICAgICAgdGhhdC5jYXJkTnVtYmVyRWxlbWVudC5vbignY2hhbmdlJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgdmFyIHN0cmlwZV9wYXltZW50X3R5cGUgPSAnY2FyZCc7XG4gICAgICAgIC8vIGVycm9yIGhhbmRsaW5nXG4gICAgICAgIHRoYXQuc3RyaXBlRXJyb3JEaXNwbGF5KGV2ZW50LCAkKG9wdGlvbnMuY2NfbnVtX3NlbGVjdG9yLCBlbGVtZW50KSwgZWxlbWVudCwgb3B0aW9ucyApO1xuICAgICAgICAvLyBpZiBpdCBjaGFuZ2VkLCByZXNldCB0aGUgYnV0dG9uXG4gICAgICAgIHRoYXQuYnV0dG9uU3RhdHVzKG9wdGlvbnMsICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKSwgZmFsc2UpO1xuICAgICAgICAvLyBTd2l0Y2ggYnJhbmQgbG9nb1xuICAgICAgICBpZiAoZXZlbnQuYnJhbmQpIHtcbiAgICAgICAgICBpZiAoIGV2ZW50LmJyYW5kID09PSAnYW1leCcgKSB7XG4gICAgICAgICAgICBzdHJpcGVfcGF5bWVudF90eXBlID0gJ2FtZXgnO1xuICAgICAgICAgIH0gICAgICAgICAgXG4gICAgICAgICAgdGhhdC5zZXRCcmFuZEljb24oZXZlbnQuYnJhbmQpO1xuICAgICAgICB9XG4gICAgICAgIHRoYXQuY2FsY3VsYXRlRmVlcyh0aGF0Lm9wdGlvbnMub3JpZ2luYWxfYW1vdW50LCBzdHJpcGVfcGF5bWVudF90eXBlKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGF0LmNhcmRFeHBpcnlFbGVtZW50Lm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAvLyBlcnJvciBoYW5kbGluZ1xuICAgICAgICB0aGF0LnN0cmlwZUVycm9yRGlzcGxheShldmVudCwgJChvcHRpb25zLmNjX2V4cF9zZWxlY3RvciwgZWxlbWVudCksIGVsZW1lbnQsIG9wdGlvbnMgKTtcbiAgICAgICAgLy8gaWYgaXQgY2hhbmdlZCwgcmVzZXQgdGhlIGJ1dHRvblxuICAgICAgICB0aGF0LmJ1dHRvblN0YXR1cyhvcHRpb25zLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIGZhbHNlKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGF0LmNhcmRDdmNFbGVtZW50Lm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAvLyBlcnJvciBoYW5kbGluZ1xuICAgICAgICB0aGF0LnN0cmlwZUVycm9yRGlzcGxheShldmVudCwgJChvcHRpb25zLmNjX2N2dl9zZWxlY3RvciwgZWxlbWVudCksIGVsZW1lbnQsIG9wdGlvbnMgKTtcbiAgICAgICAgLy8gaWYgaXQgY2hhbmdlZCwgcmVzZXQgdGhlIGJ1dHRvblxuICAgICAgICB0aGF0LmJ1dHRvblN0YXR1cyhvcHRpb25zLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIGZhbHNlKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyB0aGlzIGlzIHRoZSBtZXRob2QgdG8gY3JlYXRlIGEgc2luZ2xlIGNhcmQgZmllbGQgYW5kIG1vdW50IGl0XG4gICAgICAvKnZhciBjYXJkID0gdGhhdC5lbGVtZW50cy5jcmVhdGUoXG4gICAgICAgICdjYXJkJyxcbiAgICAgICAge1xuICAgICAgICAgIGhpZGVQb3N0YWxDb2RlOiB0cnVlXG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgICAvLyBBZGQgYW4gaW5zdGFuY2Ugb2YgdGhlIGNhcmQgVUkgY29tcG9uZW50IGludG8gdGhlIGBjYXJkLWVsZW1lbnRgIDxkaXY+XG4gICAgICBjYXJkLm1vdW50KCcjY2FyZC1lbGVtZW50Jyk7Ki9cblxuICAgIH0sIC8vIGNyZWRpdENhcmRGaWVsZHNcblxuICAgIHNldEJyYW5kSWNvbjogZnVuY3Rpb24oYnJhbmQpIHtcbiAgICAgIHZhciBjYXJkQnJhbmRUb1BmQ2xhc3MgPSB7XG4gICAgICAgICd2aXNhJzogJ3BmLXZpc2EnLFxuICAgICAgICAnbWFzdGVyY2FyZCc6ICdwZi1tYXN0ZXJjYXJkJyxcbiAgICAgICAgJ2FtZXgnOiAncGYtYW1lcmljYW4tZXhwcmVzcycsXG4gICAgICAgICdkaXNjb3Zlcic6ICdwZi1kaXNjb3ZlcicsXG4gICAgICAgICdkaW5lcnMnOiAncGYtZGluZXJzJyxcbiAgICAgICAgJ2pjYic6ICdwZi1qY2InLFxuICAgICAgICAndW5rbm93bic6ICdwZi1jcmVkaXQtY2FyZCcsXG4gICAgICB9XG4gICAgICB2YXIgYnJhbmRJY29uRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdicmFuZC1pY29uJyk7XG4gICAgICB2YXIgcGZDbGFzcyA9ICdwZi1jcmVkaXQtY2FyZCc7XG4gICAgICBpZiAoYnJhbmQgaW4gY2FyZEJyYW5kVG9QZkNsYXNzKSB7XG4gICAgICAgIHBmQ2xhc3MgPSBjYXJkQnJhbmRUb1BmQ2xhc3NbYnJhbmRdO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIgaSA9IGJyYW5kSWNvbkVsZW1lbnQuY2xhc3NMaXN0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIGJyYW5kSWNvbkVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShicmFuZEljb25FbGVtZW50LmNsYXNzTGlzdFtpXSk7XG4gICAgICB9XG4gICAgICBicmFuZEljb25FbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3BmJyk7XG4gICAgICBicmFuZEljb25FbGVtZW50LmNsYXNzTGlzdC5hZGQocGZDbGFzcyk7XG4gICAgfSxcblxuICAgIGFjaEZpZWxkczogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgdmFyIGJhbmtUb2tlbkZpZWxkTmFtZSA9ICdiYW5rVG9rZW4nO1xuICAgICAgdmFyIGJhbmtUb2tlbkZpZWxkID0gJ2lucHV0W25hbWU9XCInICsgYmFua1Rva2VuRmllbGROYW1lICsgJ1wiXSc7XG4gICAgICBpZiAob3B0aW9ucy5wbGFpZF9lbnYgIT0gJycgJiYgb3B0aW9ucy5rZXkgIT0gJycgJiYgdHlwZW9mIFBsYWlkICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB2YXIgbGlua0hhbmRsZXIgPSBQbGFpZC5jcmVhdGUoe1xuICAgICAgICAgIHNlbGVjdEFjY291bnQ6IHRydWUsXG4gICAgICAgICAgYXBpVmVyc2lvbjogJ3YyJyxcbiAgICAgICAgICBlbnY6IG9wdGlvbnMucGxhaWRfZW52LFxuICAgICAgICAgIGNsaWVudE5hbWU6ICdNaW5uUG9zdCcsXG4gICAgICAgICAga2V5OiBvcHRpb25zLnBsYWlkX3B1YmxpY19rZXksXG4gICAgICAgICAgcHJvZHVjdDogJ2F1dGgnLFxuICAgICAgICAgIG9uTG9hZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvLyBUaGUgTGluayBtb2R1bGUgZmluaXNoZWQgbG9hZGluZy5cbiAgICAgICAgICB9LFxuICAgICAgICAgIG9uU3VjY2VzczogZnVuY3Rpb24ocHVibGljX3Rva2VuLCBtZXRhZGF0YSkge1xuICAgICAgICAgICAgLy8gVGhlIG9uU3VjY2VzcyBmdW5jdGlvbiBpcyBjYWxsZWQgd2hlbiB0aGUgdXNlciBoYXMgc3VjY2Vzc2Z1bGx5XG4gICAgICAgICAgICAvLyBhdXRoZW50aWNhdGVkIGFuZCBzZWxlY3RlZCBhbiBhY2NvdW50IHRvIHVzZS5cbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyBXaGVuIGNhbGxlZCwgeW91IHdpbGwgc2VuZCB0aGUgcHVibGljX3Rva2VuIGFuZCB0aGUgc2VsZWN0ZWRcbiAgICAgICAgICAgIC8vIGFjY291bnQgSUQsIG1ldGFkYXRhLmFjY291bnRfaWQsIHRvIHlvdXIgYmFja2VuZCBhcHAgc2VydmVyLlxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIHNlbmREYXRhVG9CYWNrZW5kU2VydmVyKHtcbiAgICAgICAgICAgIC8vICAgcHVibGljX3Rva2VuOiBwdWJsaWNfdG9rZW4sXG4gICAgICAgICAgICAvLyAgIGFjY291bnRfaWQ6IG1ldGFkYXRhLmFjY291bnRfaWRcbiAgICAgICAgICAgIC8vIH0pO1xuXG4gICAgICAgICAgICAvL3RoaXMuZGVidWcoJ1B1YmxpYyBUb2tlbjogJyArIHB1YmxpY190b2tlbik7XG4gICAgICAgICAgICAvL3RoaXMuZGVidWcoJ0N1c3RvbWVyLXNlbGVjdGVkIGFjY291bnQgSUQ6ICcgKyBtZXRhZGF0YS5hY2NvdW50X2lkKTtcblxuICAgICAgICAgICAgdmFyIHN1cHBvcnRmb3JtID0gJChvcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKTtcblxuICAgICAgICAgICAgLy8gcmVzcG9uc2UgY29udGFpbnMgaWQgYW5kIGNhcmQsIHdoaWNoIGNvbnRhaW5zIGFkZGl0aW9uYWwgY2FyZCBkZXRhaWxzXG4gICAgICAgICAgICAvLyBJbnNlcnQgdGhlIGRhdGEgaW50byB0aGUgZm9ybSBzbyBpdCBnZXRzIHN1Ym1pdHRlZCB0byB0aGUgc2VydmVyXG4gICAgICAgICAgICBzdXBwb3J0Zm9ybS5hcHBlbmQoJCgnPGlucHV0IHR5cGU9XFxcImhpZGRlblxcXCIgbmFtZT1cXFwicHVibGljX3Rva2VuXFxcIiAvPicpLnZhbChwdWJsaWNfdG9rZW4pKTtcbiAgICAgICAgICAgIHN1cHBvcnRmb3JtLmFwcGVuZCgkKCc8aW5wdXQgdHlwZT1cXFwiaGlkZGVuXFxcIiBuYW1lPVxcXCJhY2NvdW50X2lkXFxcIiAvPicpLnZhbChtZXRhZGF0YS5hY2NvdW50X2lkKSk7XG5cbiAgICAgICAgICAgIC8vIGdldCB0aGUgYWNjb3VudCB2YWxpZGF0ZWQgYnkgYWpheFxuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgdXJsOicvcGxhaWRfdG9rZW4vJyxcbiAgICAgICAgICAgICAgLy9jYWNoZTogZmFsc2UsXG4gICAgICAgICAgICAgIGRhdGE6ICQoc3VwcG9ydGZvcm0pLnNlcmlhbGl6ZSgpLFxuICAgICAgICAgICAgICB0eXBlOiAnUE9TVCdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZG9uZShmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICBpZiAodHlwZW9mIHJlc3BvbnNlLmVycm9yICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIC8vIHRoZXJlIGlzIGFuIGVycm9yLlxuICAgICAgICAgICAgICAgICQob3B0aW9ucy5wbGFpZF9saW5rKS5wYXJlbnQoKS5hZnRlcignPHAgY2xhc3M9XCJlcnJvclwiPicgKyByZXNwb25zZS5lcnJvciArICc8L3A+JylcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL3RoaXMuZGVidWcoJ3ByaW50IHJlc3BvbnNlIGhlcmUnKTtcbiAgICAgICAgICAgICAgICAvL3RoaXMuZGVidWcocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIC8vIGFkZCB0aGUgZmllbGQocykgd2UgbmVlZCB0byB0aGUgZm9ybSBmb3Igc3VibWl0dGluZ1xuICAgICAgICAgICAgICAgIGlmICgkKGJhbmtUb2tlbkZpZWxkKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAkKGJhbmtUb2tlbkZpZWxkKS52YWwocmVzcG9uc2Uuc3RyaXBlX2JhbmtfYWNjb3VudF90b2tlbik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICQob3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikucHJlcGVuZCgkKCc8aW5wdXQgdHlwZT1cXFwiaGlkZGVuXFxcIiBuYW1lPVwiJyArIGJhbmtUb2tlbkZpZWxkTmFtZSArICdcIj4nKS52YWwocmVzcG9uc2Uuc3RyaXBlX2JhbmtfYWNjb3VudF90b2tlbikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkKG9wdGlvbnMucGxhaWRfbGluaywgZWxlbWVudCkuaHRtbCgnPHN0cm9uZz5Zb3VyIGFjY291bnQgd2FzIHN1Y2Nlc3NmdWxseSBhdXRob3JpemVkPC9zdHJvbmc+JykuY29udGVudHMoKS51bndyYXAoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5lcnJvcihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAkKG9wdGlvbnMucGxhaWRfbGluaykucGFyZW50KCkuYWZ0ZXIoJzxwIGNsYXNzPVwiZXJyb3JcIj4nICsgcmVzcG9uc2UuZXJyb3IgKyAnPC9wPicpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9uRXhpdDogZnVuY3Rpb24oZXJyLCBtZXRhZGF0YSkge1xuICAgICAgICAgICAgLy8gVGhlIHVzZXIgZXhpdGVkIHRoZSBMaW5rIGZsb3cuXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICAgICQob3B0aW9ucy5wbGFpZF9saW5rLCBlbGVtZW50KS5jbGljayhmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgJChvcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yICsgJyAuZXJyb3InKS5yZW1vdmUoKTsgLy8gcmVtb3ZlIG1ldGhvZCBlcnJvciBtZXNzYWdlIGlmIGl0IGlzIHRoZXJlXG4gICAgICAgICAgbGlua0hhbmRsZXIub3BlbigpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LCAvLyBhY2hGaWVsZHNcblxuICAgIGhhc0h0bWw1VmFsaWRhdGlvbjogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgLy90aGlzLmRlYnVnKCd2YWx1ZSBpcyAnICsgdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykuY2hlY2tWYWxpZGl0eSA9PT0gJ2Z1bmN0aW9uJyk7XG4gICAgICByZXR1cm4gdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykuY2hlY2tWYWxpZGl0eSA9PT0gJ2Z1bmN0aW9uJztcbiAgICB9LCAvLyBoYXNIdG1sNVZhbGlkYXRpb25cblxuICAgIGJ1dHRvblN0YXR1czogZnVuY3Rpb24ob3B0aW9ucywgYnV0dG9uLCBkaXNhYmxlZCkge1xuICAgICAgLy8gbWFrZSB0aGUgYnV0dG9uIGNsaWNrYWJsZSBvciBub3RcbiAgICAgIGJ1dHRvbi5wcm9wKCdkaXNhYmxlZCcsIGRpc2FibGVkKTtcbiAgICAgIGlmIChkaXNhYmxlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgYnV0dG9uLnRleHQob3B0aW9ucy5idXR0b25fdGV4dCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBidXR0b24udGV4dCgnUHJvY2Vzc2luZycpO1xuICAgICAgfVxuICAgIH0sIC8vIGJ1dHRvblN0YXR1c1xuXG4gICAgdmFsaWRhdGVBbmRTdWJtaXQ6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICQob3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3Rvcikuc3VibWl0KGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgLy8gZG8gc29tZSBmYWxsYmFjayBzdHVmZiBmb3Igbm9uLWh0bWw1IGJyb3dzZXJzXG4gICAgICAgIGlmICh0aGF0Lmhhc0h0bWw1VmFsaWRhdGlvbihlbGVtZW50LCBvcHRpb25zKSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmNoZWNrVmFsaWRpdHkoKSkge1xuICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpbnZhbGlkJyk7XG4gICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICBzY3JvbGxUb3A6ICQodGhpcykuZmluZCgnaW5wdXQ6aW52YWxpZCcpLnBhcmVudCgpLm9mZnNldCgpLnRvcFxuICAgICAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgICAgICAgLy90aGlzLmRlYnVnKCd0b3AgaXMgJyArICk7XG4gICAgICAgICAgICAgICQodGhpcykuZmluZCgnaW5wdXQ6aW52YWxpZCcpLnBhcmVudCgpLmFkZENsYXNzKCdlcnJvcicpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaW52YWxpZCcpO1xuICAgICAgICAgICAgICAkKHRoaXMpLmZpbmQoJ2lucHV0OmludmFsaWQnKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnZXJyb3InKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHZhbGlkYXRlIGFuZCBzdWJtaXQgdGhlIGZvcm1cbiAgICAgICAgJCgnLmNoZWNrLWZpZWxkJykucmVtb3ZlKCk7XG4gICAgICAgICQoJ2lucHV0LCBsYWJlbCcsIGVsZW1lbnQpLnJlbW92ZUNsYXNzKCdlcnJvcicpO1xuICAgICAgICB2YXIgdmFsaWQgPSB0cnVlO1xuICAgICAgICB2YXIgcGF5bWVudF90eXBlID0gJCgnaW5wdXRbbmFtZT1cInN0cmlwZV9wYXltZW50X3R5cGVcIl0nKS52YWwoKTtcbiAgICAgICAgJCh0aGF0Lm9wdGlvbnMuY2hvb3NlX3BheW1lbnQgKyAnIGlucHV0JykuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICQodGhhdC5vcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yICsgJyAuZXJyb3InKS5yZW1vdmUoKTsgLy8gcmVtb3ZlIG1ldGhvZCBlcnJvciBtZXNzYWdlIGlmIGl0IGlzIHRoZXJlXG4gICAgICAgICAgLy8gaWYgYSBwYXltZW50IGZpZWxkIGNoYW5nZWQsIHJlc2V0IHRoZSBidXR0b25cbiAgICAgICAgICB0aGF0LmJ1dHRvblN0YXR1cyhvcHRpb25zLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHBheW1lbnRfdHlwZSA9PT0gJ2JhbmtfYWNjb3VudCcpIHtcbiAgICAgICAgICBpZiAoJCgnaW5wdXRbbmFtZT1cImJhbmtUb2tlblwiXScpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICQodGhhdC5vcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yKS5wcmVwZW5kKCc8cCBjbGFzcz1cImVycm9yXCI+WW91IGFyZSByZXF1aXJlZCB0byBlbnRlciBjcmVkaXQgY2FyZCBpbmZvcm1hdGlvbiwgb3IgdG8gYXV0aG9yaXplIE1pbm5Qb3N0IHRvIGNoYXJnZSB5b3VyIGJhbmsgYWNjb3VudCwgdG8gbWFrZSBhIHBheW1lbnQuPC9wPicpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWxpZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIC8vIDEuIHNldCB1cCB0aGUgYnV0dG9uIGFuZCByZW1vdmUgdGhlIGhpZGRlbiBmaWVsZHMgd2UgZG9uJ3QgbmVlZFxuICAgICAgICAgIHRoYXQuYnV0dG9uU3RhdHVzKHRoYXQub3B0aW9ucywgJCh0aGF0Lm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLmZpbmQoJ2J1dHRvbicpLCB0cnVlKTtcbiAgICAgICAgICB2YXIgdG9rZW5EYXRhID0gdGhhdC5nZW5lcmF0ZVRva2VuRGF0YSgpO1xuXG4gICAgICAgICAgLy8gMi4gY3JlYXRlIG1pbm5wb3N0IGFjY291bnQgaWYgc3BlY2lmaWVkXG4gICAgICAgICAgaWYgKHRoYXQub3B0aW9ucy5jcmVhdGVfYWNjb3VudCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdmFyIHVzZXIgPSB7XG4gICAgICAgICAgICAgIGVtYWlsOiAkKHRoYXQub3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgICAgIGZpcnN0X25hbWU6ICQodGhhdC5vcHRpb25zLmZpcnN0X25hbWVfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgICAgICBsYXN0X25hbWU6ICQodGhhdC5vcHRpb25zLmxhc3RfbmFtZV9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgICAgIHBhc3N3b3JkOiAkKHRoYXQub3B0aW9ucy5wYXNzd29yZF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgICAgIGNpdHk6ICQodGhhdC5vcHRpb25zLmFjY291bnRfY2l0eV9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgICAgIHN0YXRlOiAkKHRoYXQub3B0aW9ucy5hY2NvdW50X3N0YXRlX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICAgICAgemlwOiAkKHRoYXQub3B0aW9ucy5hY2NvdW50X3ppcF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgIHVybDogdGhhdC5vcHRpb25zLm1pbm5wb3N0X3Jvb3QgKyAnL3dwLWpzb24vdXNlci1hY2NvdW50LW1hbmFnZW1lbnQvdjEvY3JlYXRlLXVzZXInLFxuICAgICAgICAgICAgICBkYXRhOiB1c2VyXG4gICAgICAgICAgICB9KS5kb25lKGZ1bmN0aW9uKCBkYXRhICkge1xuICAgICAgICAgICAgICBpZiAoZGF0YS5zdGF0dXMgPT09ICdzdWNjZXNzJyAmJiBkYXRhLnJlYXNvbiA9PT0gJ25ldyB1c2VyJykge1xuICAgICAgICAgICAgICAgIC8vIHVzZXIgY3JlYXRlZCAtIHRoZXkgc2hvdWxkIHJlY2VpdmUgZW1haWxcbiAgICAgICAgICAgICAgICAvLyBzdWJtaXQgdGhlIGZvcm1cbiAgICAgICAgICAgICAgICAvL3N1cHBvcnRmb3JtLmdldCgwKS5zdWJtaXQoKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyB1c2VyIG5vdCBjcmVhdGVkXG4gICAgICAgICAgICAgICAgLy8gc3RpbGwgc3VibWl0IHRoZSBmb3JtXG4gICAgICAgICAgICAgICAgLy9zdXBwb3J0Zm9ybS5nZXQoMCkuc3VibWl0KCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICgkKCdpbnB1dFtuYW1lPVwiYmFua1Rva2VuXCJdJykubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgIC8vIGZpbmFsbHksIGdldCBhIHRva2VuIGZyb20gc3RyaXBlLCBhbmQgdHJ5IHRvIGNoYXJnZSBpdCBpZiBpdCBpcyBub3QgYWNoXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZVRva2VuKHRoYXQuY2FyZE51bWJlckVsZW1lbnQsIHRva2VuRGF0YSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGlmIGl0IGlzIGFjaCwgd2UgYWxyZWFkeSBoYXZlIGEgdG9rZW4gc28gcGFzcyBpdCB0byBzdHJpcGUuXG4gICAgICAgICAgICB0aGF0LnN0cmlwZVRva2VuSGFuZGxlciggJCgnI2JhbmtUb2tlbicpLnZhbCgpLCAnYmFua19hY2NvdW50JyApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyB0aGlzIG1lYW5zIHZhbGlkIGlzIGZhbHNlXG4gICAgICAgICAgdGhhdC5idXR0b25TdGF0dXModGhhdC5vcHRpb25zLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICB9KTtcbiAgICB9LCAvLyB2YWxpZGF0ZUFuZFN1Ym1pdFxuXG4gICAgc3RyaXBlRXJyb3JEaXNwbGF5OiBmdW5jdGlvbihldmVudCwgdGhpc19zZWxlY3RvciwgZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgLy8gbGlzdGVuIGZvciBlcnJvcnMgYW5kIGRpc3BsYXkvaGlkZSBlcnJvciBtZXNzYWdlc1xuICAgICAgdmFyIHdoaWNoX2Vycm9yID0gdGhpc19zZWxlY3Rvci5hdHRyKCdpZCcpO1xuICAgICAgLy8gd2hlbiB0aGlzIGZpZWxkIGNoYW5nZXMsIHJlc2V0IGl0cyBlcnJvcnNcbiAgICAgICQoJy5jYXJkLWluc3RydWN0aW9uLicgKyB3aGljaF9lcnJvcikucmVtb3ZlQ2xhc3MoJ2ludmFsaWQnKTtcbiAgICAgICQoJy5jYXJkLWluc3RydWN0aW9uLicgKyB3aGljaF9lcnJvcikuZW1wdHkoKTtcbiAgICAgIGlmIChldmVudC5lcnJvcikge1xuICAgICAgICAkKCcuY2FyZC1pbnN0cnVjdGlvbi4nICsgd2hpY2hfZXJyb3IpLnRleHQoZXZlbnQuZXJyb3IubWVzc2FnZSArICcgUGxlYXNlIHRyeSBhZ2Fpbi4nKTtcbiAgICAgICAgJCgnLmNhcmQtaW5zdHJ1Y3Rpb24uJyArIHdoaWNoX2Vycm9yKS5hZGRDbGFzcygnaW52YWxpZCcpO1xuICAgICAgICB0aGlzX3NlbGVjdG9yLnBhcmVudCgpLmFkZENsYXNzKCdlcnJvcicpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJCgnLmNhcmQtaW5zdHJ1Y3Rpb24uJyArIHdoaWNoX2Vycm9yKS5yZW1vdmVDbGFzcygnaW52YWxpZCcpO1xuICAgICAgICAkKCcuY2FyZC1pbnN0cnVjdGlvbi4nICsgd2hpY2hfZXJyb3IpLmVtcHR5KCk7XG4gICAgICAgICQob3B0aW9ucy5jY19udW1fc2VsZWN0b3IsIGVsZW1lbnQpLnJlbW92ZUNsYXNzKCdlcnJvcicpO1xuICAgICAgICAkKG9wdGlvbnMuY2NfZXhwX3NlbGVjdG9yLCBlbGVtZW50KS5yZW1vdmVDbGFzcygnZXJyb3InKTtcbiAgICAgICAgJChvcHRpb25zLmNjX2N2dl9zZWxlY3RvciwgZWxlbWVudCkucmVtb3ZlQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICQob3B0aW9ucy5jY19udW1fc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdlcnJvcicpO1xuICAgICAgICAkKG9wdGlvbnMuY2NfZXhwX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnZXJyb3InKTtcbiAgICAgICAgJChvcHRpb25zLmNjX2N2dl9zZWxlY3RvciwgZWxlbWVudCkucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICB9XG4gICAgfSwgLy8gc3RyaXBlRXJyb3JEaXNwbGF5XG5cbiAgICBnZW5lcmF0ZVRva2VuRGF0YTogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgdG9rZW5EYXRhID0ge307XG4gICAgICB2YXIgZnVsbF9uYW1lID0gJyc7XG4gICAgICBpZiAoJCgnI2Z1bGxfbmFtZScpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZnVsbF9uYW1lID0gJCgnI2Z1bGxfbmFtZScpLnZhbCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZnVsbF9uYW1lID0gJCgnI2ZpcnN0X25hbWUnKS52YWwoKSArICcgJyArICQoJyNsYXN0X25hbWUnKS52YWwoKTtcbiAgICAgIH1cbiAgICAgIHRva2VuRGF0YS5uYW1lID0gZnVsbF9uYW1lO1xuXG4gICAgICB2YXIgc3RyZWV0ID0gJ05vbmUnO1xuICAgICAgaWYgKCQoJ2lucHV0W25hbWU9XCJmdWxsX2FkZHJlc3NcIl0nKS52YWwoKSAhPSAnJykge1xuICAgICAgICBzdHJlZXQgPSAkKCcjZnVsbF9hZGRyZXNzJykudmFsKCk7XG4gICAgICAgIGlmICgkKCdpbnB1dFtuYW1lPVwiYmlsbGluZ19zdHJlZXRcIl0nKS52YWwoKSAhPSAnJykge1xuICAgICAgICAgIHN0cmVldCA9ICQoJ2lucHV0W25hbWU9XCJiaWxsaW5nX3N0cmVldFwiXScpLnZhbCgpO1xuICAgICAgICB9XG4gICAgICAgIHRva2VuRGF0YS5hZGRyZXNzX2xpbmUxID0gc3RyZWV0O1xuICAgICAgfVxuXG4gICAgICB2YXIgY2l0eSA9ICdOb25lJztcbiAgICAgIGlmICgkKCdpbnB1dFtuYW1lPVwiYmlsbGluZ19jaXR5XCJdJykudmFsKCkgIT0gJycpIHtcbiAgICAgICAgY2l0eSA9ICQoJ2lucHV0W25hbWU9XCJiaWxsaW5nX2NpdHlcIl0nKS52YWwoKTtcbiAgICAgICAgdG9rZW5EYXRhLmFkZHJlc3NfY2l0eSA9IGNpdHk7XG4gICAgICB9XG5cbiAgICAgIHZhciBzdGF0ZSA9ICdOb25lJztcbiAgICAgIGlmICgkKCdpbnB1dFtuYW1lPVwiYmlsbGluZ19zdGF0ZVwiXScpLnZhbCgpICE9ICcnKSB7XG4gICAgICAgIHN0YXRlID0gJCgnaW5wdXRbbmFtZT1cImJpbGxpbmdfc3RhdGVcIl0nKS52YWwoKTtcbiAgICAgICAgdG9rZW5EYXRhLmFkZHJlc3Nfc3RhdGUgPSBzdGF0ZTtcbiAgICAgIH1cblxuICAgICAgdmFyIHppcCA9ICdOb25lJztcbiAgICAgIGlmICgkKCdpbnB1dFtuYW1lPVwiYmlsbGluZ196aXBcIl0nKS52YWwoKSAhPSAnJykge1xuICAgICAgICB6aXAgPSAkKCdpbnB1dFtuYW1lPVwiYmlsbGluZ196aXBcIl0nKS52YWwoKTtcbiAgICAgICAgdG9rZW5EYXRhLmFkZHJlc3NfemlwID0gemlwO1xuICAgICAgfVxuXG4gICAgICB2YXIgY291bnRyeSA9ICdVUyc7XG4gICAgICBpZiAoJCgnaW5wdXRbbmFtZT1cImJpbGxpbmdfY291bnRyeVwiXScpLnZhbCgpICE9ICcnKSB7XG4gICAgICAgIGNvdW50cnkgPSAkKCdpbnB1dFtuYW1lPVwiYmlsbGluZ19jb3VudHJ5XCJdJykudmFsKCk7XG4gICAgICB9XG4gICAgICB0b2tlbkRhdGEuYWRkcmVzc19jb3VudHJ5ID0gY291bnRyeTtcblxuICAgICAgcmV0dXJuIHRva2VuRGF0YTtcbiAgICB9LCAvLyBnZW5lcmF0ZVRva2VuRGF0YVxuXG4gICAgY3JlYXRlVG9rZW46IGZ1bmN0aW9uKGNhcmQsIHRva2VuRGF0YSkge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdGhhdC5zdHJpcGUuY3JlYXRlVG9rZW4oY2FyZCwgdG9rZW5EYXRhKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICBpZiAocmVzdWx0LmVycm9yKSB7XG4gICAgICAgICAgLy8gU2hvdyB0aGUgZXJyb3JzIG9uIHRoZSBmb3JtXG4gICAgICAgICAgdGhhdC5idXR0b25TdGF0dXModGhhdC5vcHRpb25zLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIGZhbHNlKTtcbiAgICAgICAgICB2YXIgZmllbGQgPSByZXN1bHQuZXJyb3IuZmllbGQgKyAnX2ZpZWxkX3NlbGVjdG9yJztcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9ICcnO1xuICAgICAgICAgIGlmICh0eXBlb2YgcmVzdWx0LmVycm9yLm1lc3NhZ2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBtZXNzYWdlID0gcmVzdWx0LmVycm9yLm1lc3NhZ2U7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1lc3NhZ2UgPSByZXN1bHQuZXJyb3IubWVzc2FnZVswXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCQoZmllbGQpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICQodGhhdC5vcHRpb25zW2ZpZWxkXSwgZWxlbWVudCkuYWRkQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICAgICAkKHRoYXQub3B0aW9uc1tmaWVsZF0sIGVsZW1lbnQpLnByZXYoKS5hZGRDbGFzcygnZXJyb3InKTtcbiAgICAgICAgICAgICQodGhhdC5vcHRpb25zW2ZpZWxkXSwgZWxlbWVudCkuYWZ0ZXIoJzxzcGFuIGNsYXNzPVwiY2hlY2stZmllbGQgaW52YWxpZFwiPicgKyBtZXNzYWdlICsgJzwvc3Bhbj4nKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gU2VuZCB0aGUgdG9rZW4gdG8geW91ciBzZXJ2ZXJcbiAgICAgICAgICB0aGF0LnN0cmlwZVRva2VuSGFuZGxlcihyZXN1bHQudG9rZW4sICdjYXJkJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sIC8vIGNyZWF0ZVRva2VuXG5cbiAgICBzdHJpcGVUb2tlbkhhbmRsZXI6IGZ1bmN0aW9uKHRva2VuLCB0eXBlKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB2YXIgc3VwcG9ydGZvcm0gPSAkKHRoaXMub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3Rvcik7XG4gICAgICB2YXIgYWpheF91cmwgPSAnJztcbiAgICAgIHZhciB0b2tlbkZpZWxkTmFtZSA9ICdzdHJpcGVUb2tlbic7XG4gICAgICB2YXIgdG9rZW5GaWVsZCA9ICdpbnB1dFtuYW1lPVwiJyArIHRva2VuRmllbGROYW1lICsgJ1wiXSc7XG4gICAgICBpZiAodHlwZW9mICQoc3VwcG9ydGZvcm0pLmRhdGEoJ2FjdGlvbicpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBhamF4X3VybCA9ICQoc3VwcG9ydGZvcm0pLmRhdGEoJ2FjdGlvbicpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWpheF91cmwgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG4gICAgICB9XG4gICAgICAvLyBJbnNlcnQgdGhlIHRva2VuIElEIGludG8gdGhlIGZvcm0gc28gaXQgZ2V0cyBzdWJtaXR0ZWQgdG8gdGhlIHNlcnZlclxuICAgICAgaWYgKCB0eXBlID09PSAnY2FyZCcgKSB7XG4gICAgICAgIGlmICh0b2tlbi5jYXJkLmJyYW5kLmxlbmd0aCA+IDAgJiYgdG9rZW4uY2FyZC5icmFuZCA9PT0gJ0FtZXJpY2FuIEV4cHJlc3MnKSB7XG4gICAgICAgICAgdHlwZSA9ICdhbWV4JztcbiAgICAgICAgfVxuICAgICAgICBpZiAoJCh0b2tlbkZpZWxkKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgJCh0b2tlbkZpZWxkKS52YWwodG9rZW4uaWQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN1cHBvcnRmb3JtLmFwcGVuZCgkKCc8aW5wdXQgdHlwZT1cXFwiaGlkZGVuXFxcIiBuYW1lPVwiJyArIHRva2VuRmllbGROYW1lICsgJ1wiPicpLnZhbCh0b2tlbi5pZCkpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKCB0eXBlID09PSAncGF5bWVudF9yZXF1ZXN0JyApIHtcbiAgICAgICAgc3VwcG9ydGZvcm0uYXBwZW5kKCQoJzxpbnB1dCB0eXBlPVxcXCJoaWRkZW5cXFwiIG5hbWU9XFxcInN0cmlwZVRva2VuXFxcIj4nKS52YWwodG9rZW4udG9rZW4uaWQpKTtcbiAgICAgIH1cblxuICAgICAgJCgnaW5wdXRbbmFtZT1cInN0cmlwZV9wYXltZW50X3R5cGVcIl0nKS52YWwodHlwZSk7XG5cbiAgICAgIC8vIFN1Ym1pdCB0aGUgZm9ybVxuICAgICAgLy8gdGhlIHdheSBpdCB3b3JrcyBjdXJyZW50bHkgaXMgdGhlIGZvcm0gc3VibWl0cyBhbiBhamF4IHJlcXVlc3QgdG8gaXRzZWxmXG4gICAgICAvLyB0aGVuIGl0IHN1Ym1pdHMgYSBwb3N0IHJlcXVlc3QgdG8gdGhlIGZvcm0ncyBhY3Rpb24gdXJsXG4gICAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IGFqYXhfdXJsLFxuICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgIGRhdGE6ICQoc3VwcG9ydGZvcm0pLnNlcmlhbGl6ZSgpLFxuICAgICAgICB0eXBlOiAnUE9TVCdcbiAgICAgIH0pXG4gICAgICAuZG9uZShmdW5jdGlvbihyZXNwb25zZSkge1xuXG4gICAgICAgIGlmICggdHlwZSA9PT0gJ3BheW1lbnRfcmVxdWVzdCcgKSB7XG4gICAgICAgICAgaWYgKHJlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICAvLyBSZXBvcnQgdG8gdGhlIGJyb3dzZXIgdGhhdCB0aGUgcGF5bWVudCB3YXMgc3VjY2Vzc2Z1bCwgcHJvbXB0aW5nXG4gICAgICAgICAgICAvLyBpdCB0byBjbG9zZSB0aGUgYnJvd3NlciBwYXltZW50IGludGVyZmFjZS5cbiAgICAgICAgICAgIHRva2VuLmNvbXBsZXRlKCdzdWNjZXNzJyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFJlcG9ydCB0byB0aGUgYnJvd3NlciB0aGF0IHRoZSBwYXltZW50IGZhaWxlZCwgcHJvbXB0aW5nIGl0IHRvXG4gICAgICAgICAgICAvLyByZS1zaG93IHRoZSBwYXltZW50IGludGVyZmFjZSwgb3Igc2hvdyBhbiBlcnJvciBtZXNzYWdlIGFuZCBjbG9zZVxuICAgICAgICAgICAgLy8gdGhlIHBheW1lbnQgaW50ZXJmYWNlLlxuICAgICAgICAgICAgdG9rZW4uY29tcGxldGUoJ2ZhaWwnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodHlwZW9mIHJlc3BvbnNlLmVycm9ycyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAvLyBkbyBub3Qgc3VibWl0LiB0aGVyZSBpcyBhbiBlcnJvci5cbiAgICAgICAgICB0aGF0LmJ1dHRvblN0YXR1cyh0aGF0Lm9wdGlvbnMsICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKSwgZmFsc2UpO1xuICAgICAgICAgIC8vIGFkZCBzb21lIGVycm9yIG1lc3NhZ2VzIGFuZCBzdHlsZXNcbiAgICAgICAgICAkLmVhY2gocmVzcG9uc2UuZXJyb3JzLCBmdW5jdGlvbiggaW5kZXgsIGVycm9yICkge1xuICAgICAgICAgICAgdmFyIGZpZWxkID0gZXJyb3IuZmllbGQgKyAnX2ZpZWxkX3NlbGVjdG9yJztcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gJyc7XG4gICAgICAgICAgICB2YXIgc3RyaXBlRXJyb3JTZWxlY3RvciA9ICcnO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBlcnJvci5tZXNzYWdlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICBtZXNzYWdlID0gZXJyb3IubWVzc2FnZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIG1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlWzBdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCQodGhhdC5vcHRpb25zW2ZpZWxkXSkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAkKHRoYXQub3B0aW9uc1tmaWVsZF0pLmFkZENsYXNzKCdlcnJvcicpO1xuICAgICAgICAgICAgICAkKHRoYXQub3B0aW9uc1tmaWVsZF0pLnByZXYoKS5hZGRDbGFzcygnZXJyb3InKTtcbiAgICAgICAgICAgICAgJCh0aGF0Lm9wdGlvbnNbZmllbGRdKS5hZnRlcignPHNwYW4gY2xhc3M9XCJjaGVjay1maWVsZCBpbnZhbGlkXCI+JyArIG1lc3NhZ2UgKyAnPC9zcGFuPicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGVycm9yICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICB0aGF0LmJ1dHRvblN0YXR1cyh0aGF0Lm9wdGlvbnMsICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKSwgZmFsc2UsICdjYXJkJyk7XG4gICAgICAgICAgICAgIGlmIChlcnJvci5jb2RlID09ICdpbnZhbGlkX251bWJlcicgfHwgZXJyb3IuY29kZSA9PSAnaW5jb3JyZWN0X251bWJlcicgfHwgZXJyb3IuY29kZSA9PSAnY2FyZF9kZWNsaW5lZCcgfHwgZXJyb3IuY29kZSA9PSAncHJvY2Vzc2luZ19lcnJvcicpIHtcbiAgICAgICAgICAgICAgICAvLyBlcnJvciBoYW5kbGluZ1xuICAgICAgICAgICAgICAgIHN0cmlwZUVycm9yU2VsZWN0b3IgPSAkKHRoYXQub3B0aW9ucy5jY19udW1fc2VsZWN0b3IpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKGVycm9yLmNvZGUgPT0gJ2ludmFsaWRfZXhwaXJ5X21vbnRoJyB8fCBlcnJvci5jb2RlID09ICdpbnZhbGlkX2V4cGlyeV95ZWFyJyB8fCBlcnJvci5jb2RlID09ICdleHBpcmVkX2NhcmQnKSB7XG4gICAgICAgICAgICAgICAgLy8gZXJyb3IgaGFuZGxpbmdcbiAgICAgICAgICAgICAgICBzdHJpcGVFcnJvclNlbGVjdG9yID0gJCh0aGF0Lm9wdGlvbnMuY2NfZXhwX3NlbGVjdG9yKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmIChlcnJvci5jb2RlID09ICdpbnZhbGlkX2N2YycgfHwgZXJyb3IuY29kZSA9PSAnaW5jb3JyZWN0X2N2YycpIHtcbiAgICAgICAgICAgICAgICAvLyBlcnJvciBoYW5kbGluZ1xuICAgICAgICAgICAgICAgIHN0cmlwZUVycm9yU2VsZWN0b3IgPSAkKHRoYXQub3B0aW9ucy5jY19jdnZfc2VsZWN0b3IpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKHN0cmlwZUVycm9yU2VsZWN0b3IgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgdGhhdC5zdHJpcGVFcnJvckRpc3BsYXkocmVzcG9uc2UuZXJyb3JzLCBzdHJpcGVFcnJvclNlbGVjdG9yLCB0aGF0LmVsZW1lbnQsIHRoYXQub3B0aW9ucyApO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKGVycm9yLmZpZWxkID09ICdyZWNhcHRjaGEnKSB7XG4gICAgICAgICAgICAgICAgJCgnYnV0dG9uLmdpdmUnKS5iZWZvcmUoJzxwIGNsYXNzPVwicmVjYXB0Y2hhLWVycm9yXCI+JyArIG1lc3NhZ2UgKyAnPC9wPicpXG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAoZXJyb3IudHlwZSA9PSAnaW52YWxpZF9yZXF1ZXN0X2Vycm9yJykge1xuICAgICAgICAgICAgICAgICQoJ2J1dHRvbi5naXZlJykuYmVmb3JlKCc8cCBjbGFzcz1cImVycm9yIGVycm9yLWludmFsaWQtcmVxdWVzdFwiPicgKyBlcnJvci5tZXNzYWdlICsgJzwvcD4nKVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHR5cGVvZiByZXNwb25zZS5lcnJvcnNbMF0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgIHZhciBmaWVsZCA9IHJlc3BvbnNlLmVycm9yc1swXS5maWVsZCArICdfZmllbGRfc2VsZWN0b3InO1xuICAgICAgICAgICAgICBpZiAoJChmaWVsZCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogJChvcHRpb25zW2ZpZWxkXSkucGFyZW50KCkub2Zmc2V0KCkudG9wXG4gICAgICAgICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdXBwb3J0Zm9ybS5nZXQoMCkuc3VibWl0KCk7IC8vIGNvbnRpbnVlIHN1Ym1pdHRpbmcgdGhlIGZvcm0gaWYgdGhlIGFqYXggd2FzIHN1Y2Nlc3NmdWxcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5lcnJvcihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICB0aGF0LmJ1dHRvblN0YXR1cyh0aGF0Lm9wdGlvbnMsICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKSwgZmFsc2UpO1xuICAgICAgfSk7XG5cbiAgICB9LFxuXG4gICAgc2hvd05ld3NsZXR0ZXJTZXR0aW5nczogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuXG4gICAgICB2YXIgbmV3c2xldHRlcl9ncm91cF9odG1sID0gJyc7XG4gICAgICBpZiAoJChvcHRpb25zLm5ld3NsZXR0ZXJfZ3JvdXBfc2VsZWN0b3IpLmxlbmd0aCA+IDAgKSB7XG4gICAgICAgIHZhciBnZXRfZGF0YSA9IHtcbiAgICAgICAgICBzaG9ydGNvZGU6ICduZXdzbGV0dGVyX2Zvcm0nLFxuICAgICAgICAgIHBsYWNlbWVudDogJ3VzZXJhY2NvdW50J1xuICAgICAgICB9O1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgdXJsOiBvcHRpb25zLm1pbm5wb3N0X3Jvb3QgKyAnL3dwLWpzb24vbWlubnBvc3QtYXBpL3YyL21haWxjaGltcC9mb3JtJyxcbiAgICAgICAgICBkYXRhOiBnZXRfZGF0YVxuICAgICAgICB9KS5kb25lKGZ1bmN0aW9uKCByZXN1bHQgKSB7XG4gICAgICAgICAgaWYgKCB0eXBlb2YgcmVzdWx0Lmdyb3VwX2ZpZWxkcyAhPT0gJ3VuZGVmaW5lZCcgKSB7XG4gICAgICAgICAgICAkLmVhY2gocmVzdWx0Lmdyb3VwX2ZpZWxkcywgZnVuY3Rpb24oIGluZGV4LCBjYXRlZ29yeSApIHtcbiAgICAgICAgICAgICAgbmV3c2xldHRlcl9ncm91cF9odG1sICs9ICc8ZmllbGRzZXQgY2xhc3M9XCJtLWZvcm0taXRlbSBzdXBwb3J0LW5ld3NsZXR0ZXIgbS1mb3JtLWl0ZW0tJyArIGNhdGVnb3J5LnR5cGUgKyAnXCI+JztcbiAgICAgICAgICAgICAgbmV3c2xldHRlcl9ncm91cF9odG1sICs9ICc8bGFiZWw+JyArIGNhdGVnb3J5Lm5hbWUgKyAnOjwvbGFiZWw+JztcbiAgICAgICAgICAgICAgaWYgKCBjYXRlZ29yeS5jb250YWlucy5sZW5ndGggPiAwICkge1xuICAgICAgICAgICAgICAgIG5ld3NsZXR0ZXJfZ3JvdXBfaHRtbCArPSAnPGRpdiBjbGFzcz1cImZvcm0taXRlbSBmb3JtLWl0ZW0tLW5ld3NsZXR0ZXJcIj4nO1xuICAgICAgICAgICAgICAgICQuZWFjaChjYXRlZ29yeVtjYXRlZ29yeS5jb250YWluc10sIGZ1bmN0aW9uKCBpbmRleCwgaXRlbSApIHtcbiAgICAgICAgICAgICAgICAgIG5ld3NsZXR0ZXJfZ3JvdXBfaHRtbCArPSAnPGxhYmVsPjxpbnB1dCBuYW1lPVwiZ3JvdXBzX3N1Ym1pdHRlZFwiIHR5cGU9XCJjaGVja2JveFwiIHZhbHVlPVwiJyArIGl0ZW0uaWQgKyAnXCI+JyArIGl0ZW0ubmFtZSArICc8L2xhYmVsPic7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbmV3c2xldHRlcl9ncm91cF9odG1sICs9ICc8L2Rpdj4nO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIG5ld3NsZXR0ZXJfZ3JvdXBfaHRtbCArPSAnPC9maWVsZHNldD4nO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkKG9wdGlvbnMubmV3c2xldHRlcl9ncm91cF9zZWxlY3RvcikuaHRtbChuZXdzbGV0dGVyX2dyb3VwX2h0bWwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmICgkKG9wdGlvbnMubmV3c2xldHRlcl9ncm91cF9zZWxlY3RvcikubGVuZ3RoID4gMCAmJiB0eXBlb2YgJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdmFyIGdldF9kYXRhID0ge1xuICAgICAgICAgIGVtYWlsOiAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpXG4gICAgICAgIH07XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICB1cmw6IG9wdGlvbnMubWlubnBvc3Rfcm9vdCArICcvd3AtanNvbi9taW5ucG9zdC1hcGkvdjIvbWFpbGNoaW1wL3VzZXInLFxuICAgICAgICAgIGRhdGE6IGdldF9kYXRhXG4gICAgICAgIH0pLmRvbmUoZnVuY3Rpb24oIHJlc3VsdCApIHtcbiAgICAgICAgICBpZiAoIHR5cGVvZiByZXN1bHQubWFpbGNoaW1wX3N0YXR1cyAhPT0gJ3VuZGVmaW5lZCcgKSB7XG4gICAgICAgICAgICAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLmFmdGVyKCc8aW5wdXQgbmFtZT1cIm1haWxjaGltcF9zdGF0dXNcIiB0eXBlPVwiaGlkZGVuXCIgdmFsdWU9XCInICsgcmVzdWx0Lm1haWxjaGltcF9zdGF0dXMgKyAnXCI+Jyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICggdHlwZW9mIHJlc3VsdC5tYWlsY2hpbXBfdXNlcl9pZCAhPT0gJ3VuZGVmaW5lZCcgKSB7XG4gICAgICAgICAgICAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLmFmdGVyKCc8aW5wdXQgbmFtZT1cIm1haWxjaGltcF91c2VyX2lkXCIgdHlwZT1cImhpZGRlblwiIHZhbHVlPVwiJyArIHJlc3VsdC5tYWlsY2hpbXBfdXNlcl9pZCArICdcIj4nKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHJlc3VsdC5tYWlsY2hpbXBfc3RhdHVzID09PSAnc3Vic2NyaWJlZCcpIHtcbiAgICAgICAgICAgIC8vIHVzZXIgY3JlYXRlZCAtIHNob3cgYSBzdWNjZXNzIG1lc3NhZ2VcbiAgICAgICAgICAgICQoJy5jb25maXJtLWluc3RydWN0aW9ucycpLnRleHQoJCgnLmNvbmZpcm0taW5zdHJ1Y3Rpb25zJykuYXR0cignZGF0YS1rbm93bi11c2VyJykpO1xuICAgICAgICAgICAgdmFyIGdyb3VwcyA9IHJlc3VsdC5ncm91cHM7XG4gICAgICAgICAgICAkLmVhY2goZ3JvdXBzLCBmdW5jdGlvbiggaW5kZXgsIHZhbHVlICkge1xuICAgICAgICAgICAgICBpZiAoIHZhbHVlID09PSB0cnVlICkge1xuICAgICAgICAgICAgICAgICQoJzpjaGVja2JveFt2YWx1ZT1cIicgKyBpbmRleCArICdcIl0nKS5wcm9wKCdjaGVja2VkJyx0cnVlKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKCc6Y2hlY2tib3hbdmFsdWU9XCInICsgaW5kZXggKyAnXCJdJykucHJvcCgnY2hlY2tlZCcsZmFsc2UpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgfSwgLy8gc2hvd05ld3NsZXR0ZXJTZXR0aW5nc1xuXG4gICAgY29uZmlybU1lc3NhZ2VTdWJtaXQ6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcblxuICAgICAgdmFyIGV4aXN0aW5nX25ld3NsZXR0ZXJfc2V0dGluZ3MgPSAkKG9wdGlvbnMubmV3c2xldHRlcl9ncm91cF9zZWxlY3RvciArICcgaW5wdXQnKS5zZXJpYWxpemUoKTtcbiAgICAgIC8vdGhpcy5kZWJ1ZyhleGlzdGluZ19uZXdzbGV0dGVyX3NldHRpbmdzKTtcblxuICAgICAgJChvcHRpb25zLmNvbmZpcm1fZm9ybV9zZWxlY3Rvcikuc3VibWl0KGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgdmFyIGNvbmZpcm1mb3JtID0gJChvcHRpb25zLmNvbmZpcm1fZm9ybV9zZWxlY3Rvcik7XG4gICAgICAgIC8vIHN1Ym1pdCBzZXR0aW5ncyB0byBtYWlsY2hpbXBcbiAgICAgICAgLy8gbmVlZCB0byBnZXQgdXNlciBpbmZvIG9uIGEgaGlkZGVuIGZpZWxkIGhlcmVcblxuICAgICAgICB2YXIgbmV3c2xldHRlcl9ncm91cHMgPSAkKG9wdGlvbnMubmV3c2xldHRlcl9ncm91cF9zZWxlY3RvciArICcgaW5wdXQ6Y2hlY2tlZCcpO1xuICAgICAgICB2YXIgbmV3X25ld3NsZXR0ZXJfc2V0dGluZ3MgPSBuZXdzbGV0dGVyX2dyb3Vwcy5zZXJpYWxpemUoKTtcblxuICAgICAgICBpZiAoKGV4aXN0aW5nX25ld3NsZXR0ZXJfc2V0dGluZ3MgIT09IG5ld19uZXdzbGV0dGVyX3NldHRpbmdzKSAmJiAodHlwZW9mIG5ld3NsZXR0ZXJfZ3JvdXBzICE9PSAndW5kZWZpbmVkJykpIHtcbiAgICAgICAgICAvL2FkZCBvdXIgb3duIGFqYXggY2hlY2sgYXMgWC1SZXF1ZXN0ZWQtV2l0aCBpcyBub3QgYWx3YXlzIHJlbGlhYmxlXG4gICAgICAgICAgLy9hamF4X2Zvcm1fZGF0YSA9IG5ld19uZXdzbGV0dGVyX3NldHRpbmdzICsgJyZhamF4cmVxdWVzdD10cnVlJnN1YnNjcmliZSc7XG5cbiAgICAgICAgICB2YXIgcG9zdF9kYXRhID0ge1xuICAgICAgICAgICAgZW1haWw6ICQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgICBmaXJzdF9uYW1lOiAkKG9wdGlvbnMuZmlyc3RfbmFtZV9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgICBsYXN0X25hbWU6ICQob3B0aW9ucy5sYXN0X25hbWVfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgICAgZ3JvdXBzX3N1Ym1pdHRlZDoge31cbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgcG9zdF9kYXRhLmdyb3Vwc19hdmFpbGFibGUgPSAnYWxsJztcblxuICAgICAgICAgIGlmICggJCgnaW5wdXRbbmFtZT1cIm1haWxjaGltcF9zdGF0dXNcIl0nKS5sZW5ndGggPiAwICkge1xuICAgICAgICAgICAgcG9zdF9kYXRhLm1haWxjaGltcF9zdGF0dXMgPSAkKCdpbnB1dFtuYW1lPVwibWFpbGNoaW1wX3N0YXR1c1wiXScpLnZhbCgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICggJCgnaW5wdXRbbmFtZT1cIm1haWxjaGltcF91c2VyX2lkXCJdJykubGVuZ3RoID4gMCApIHtcbiAgICAgICAgICAgIHBvc3RfZGF0YS5tYWlsY2hpbXBfdXNlcl9pZCA9ICQoJ2lucHV0W25hbWU9XCJtYWlsY2hpbXBfdXNlcl9pZFwiXScpLnZhbCgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0eXBlb2YgbmV3c2xldHRlcl9ncm91cHMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAkLmVhY2gobmV3c2xldHRlcl9ncm91cHMsIGZ1bmN0aW9uKGluZGV4LCB2YWx1ZSkge1xuICAgICAgICAgICAgICB2YXIgZ3JvdXAgPSAkKHRoaXMpLnZhbCgpO1xuICAgICAgICAgICAgICBwb3N0X2RhdGEuZ3JvdXBzX3N1Ym1pdHRlZFtpbmRleF0gPSBncm91cDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IG9wdGlvbnMubWlubnBvc3Rfcm9vdCArICcvd3AtanNvbi9taW5ucG9zdC1hcGkvdjIvbWFpbGNoaW1wL3VzZXInLFxuICAgICAgICAgICAgdHlwZTogJ3Bvc3QnLFxuICAgICAgICAgICAgZGF0YVR5cGUgOiAnanNvbicsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkocG9zdF9kYXRhKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmRvbmUoZnVuY3Rpb24ocmVzcG9uc2UpIHsgLy8gcmVzcG9uc2UgZnJvbSB0aGUgUEhQIGFjdGlvblxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSAnJztcbiAgICAgICAgICAgIGlmICggcmVzcG9uc2Uuc3VjY2VzcyA9PT0gdHJ1ZSApIHtcbiAgICAgICAgICAgICAgLypzd2l0Y2ggKHJlc3BvbnNlLmRhdGEudXNlcl9zdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdleGlzdGluZyc6XG4gICAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ1RoYW5rcyBmb3IgdXBkYXRpbmcgeW91ciBlbWFpbCBwcmVmZXJlbmNlcy4gVGhleSB3aWxsIGdvIGludG8gZWZmZWN0IGltbWVkaWF0ZWx5Lic7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICduZXcnOlxuICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9ICdXZSBoYXZlIGFkZGVkIHlvdSB0byB0aGUgTWlublBvc3QgbWFpbGluZyBsaXN0Lic7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdwZW5kaW5nJzpcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnV2UgaGF2ZSBhZGRlZCB5b3UgdG8gdGhlIE1pbm5Qb3N0IG1haWxpbmcgbGlzdC4gWW91IHdpbGwgbmVlZCB0byBjbGljayB0aGUgY29uZmlybWF0aW9uIGxpbmsgaW4gdGhlIGVtYWlsIHdlIHNlbnQgdG8gYmVnaW4gcmVjZWl2aW5nIG1lc3NhZ2VzLic7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfSovXG4gICAgICAgICAgICAgIC8vY29uZmlybWZvcm0uZ2V0KDApLnN1Ym1pdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uZmlybWZvcm0uZ2V0KDApLnN1Ym1pdCgpO1xuICAgICAgICAgICAgLy8kKCcubS1ob2xkLW1lc3NhZ2UnKS5odG1sKCc8ZGl2IGNsYXNzPVwibS1mb3JtLW1lc3NhZ2UgbS1mb3JtLW1lc3NhZ2UtaW5mb1wiPicgKyBtZXNzYWdlICsgJzwvZGl2PicpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmZhaWwoZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIC8vIHdlIHNob3VsZCBwdXQgYW4gYWN0dWFsIGVycm9yIG1lc3NhZ2UgaGVyZSBzb21lZGF5LCBwcm9iYWJseVxuICAgICAgICAgICAgLy8kKCcubS1ob2xkLW1lc3NhZ2UnKS5odG1sKCc8ZGl2IGNsYXNzPVwibS1mb3JtLW1lc3NhZ2UgbS1mb3JtLW1lc3NhZ2UtaW5mb1wiPkFuIGVycm9yIGhhcyBvY2N1cmVkLiBQbGVhc2UgdHJ5IGFnYWluLjwvZGl2PicpO1xuICAgICAgICAgICAgY29uZmlybWZvcm0uZ2V0KDApLnN1Ym1pdCgpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0gZWxzZSB7IC8vIGVuZCBwYXJ0IHdoZXJlIHNldHRpbmdzIGNoYW5nZWRcbiAgICAgICAgICBjb25maXJtZm9ybS5nZXQoMCkuc3VibWl0KCk7XG4gICAgICAgIH1cblxuICAgICAgfSk7XG4gICAgICAvL3JldHVybiBmYWxzZTtcbiAgICB9LCAvLyBjb25maXJtTWVzc2FnZVN1Ym1pdFxuXG4gIH07IC8vIHBsdWdpbi5wcm90b3R5cGVcblxuICAvLyBBIHJlYWxseSBsaWdodHdlaWdodCBwbHVnaW4gd3JhcHBlciBhcm91bmQgdGhlIGNvbnN0cnVjdG9yLFxuICAvLyBwcmV2ZW50aW5nIGFnYWluc3QgbXVsdGlwbGUgaW5zdGFudGlhdGlvbnNcbiAgJC5mbltwbHVnaW5OYW1lXSA9IGZ1bmN0aW9uICggb3B0aW9ucyApIHtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICghJC5kYXRhKHRoaXMsICdwbHVnaW5fJyArIHBsdWdpbk5hbWUpKSB7XG4gICAgICAgICQuZGF0YSh0aGlzLCAncGx1Z2luXycgKyBwbHVnaW5OYW1lLCBuZXcgUGx1Z2luKCB0aGlzLCBvcHRpb25zICkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG59KSggalF1ZXJ5LCB3aW5kb3csIGRvY3VtZW50ICk7Il19
