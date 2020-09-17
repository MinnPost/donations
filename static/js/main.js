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
    'intent_secret_selector': '#intent',
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0cmlwZS5wYXltZW50LmpzIiwibWlubnBvc3QuZ2l2aW5nLmpzIl0sIm5hbWVzIjpbImYiLCJleHBvcnRzIiwibW9kdWxlIiwiZGVmaW5lIiwiYW1kIiwiZyIsIndpbmRvdyIsImdsb2JhbCIsInNlbGYiLCJwYXltZW50IiwianMiLCJlIiwidCIsIm4iLCJyIiwicyIsIm8iLCJ1IiwiYSIsInJlcXVpcmUiLCJpIiwiRXJyb3IiLCJjb2RlIiwibCIsImNhbGwiLCJsZW5ndGgiLCJRSiIsInJyZXR1cm4iLCJydHJpbSIsInNlbGVjdG9yIiwiaXNET01FbGVtZW50IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZWwiLCJub2RlTmFtZSIsInRyaW0iLCJ0ZXh0IiwicmVwbGFjZSIsInZhbCIsInJldCIsImFyZ3VtZW50cyIsInZhbHVlIiwicHJldmVudERlZmF1bHQiLCJldmVudE9iamVjdCIsInJldHVyblZhbHVlIiwibm9ybWFsaXplRXZlbnQiLCJvcmlnaW5hbCIsIndoaWNoIiwidGFyZ2V0Iiwic3JjRWxlbWVudCIsIm9yaWdpbmFsRXZlbnQiLCJkYXRhIiwiZGV0YWlsIiwiY2hhckNvZGUiLCJrZXlDb2RlIiwib24iLCJlbGVtZW50IiwiZXZlbnROYW1lIiwiY2FsbGJhY2siLCJqIiwibGVuIiwibGVuMSIsIm11bHRFdmVudE5hbWUiLCJvcmlnaW5hbENhbGxiYWNrIiwicmVmIiwibWF0Y2giLCJzcGxpdCIsImFkZEV2ZW50TGlzdGVuZXIiLCJhdHRhY2hFdmVudCIsImFkZENsYXNzIiwiY2xhc3NOYW1lIiwicmVzdWx0cyIsInB1c2giLCJjbGFzc0xpc3QiLCJhZGQiLCJoYXNDbGFzcyIsImNvbnRhaW5zIiwiUmVnRXhwIiwidGVzdCIsInJlbW92ZUNsYXNzIiwiY2xzIiwicmVtb3ZlIiwiam9pbiIsInRvZ2dsZUNsYXNzIiwiYm9vbCIsImFwcGVuZCIsInRvQXBwZW5kIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwiZmluZCIsIk5vZGVMaXN0IiwiQXJyYXkiLCJ0cmlnZ2VyIiwibmFtZSIsImVycm9yIiwiZXYiLCJDdXN0b21FdmVudCIsImNyZWF0ZUV2ZW50IiwiaW5pdEN1c3RvbUV2ZW50IiwiaW5pdEV2ZW50IiwiZGlzcGF0Y2hFdmVudCIsIlBheW1lbnQiLCJjYXJkRnJvbU51bWJlciIsImNhcmRGcm9tVHlwZSIsImNhcmRzIiwiZGVmYXVsdEZvcm1hdCIsImZvcm1hdEJhY2tDYXJkTnVtYmVyIiwiZm9ybWF0QmFja0V4cGlyeSIsImZvcm1hdENhcmROdW1iZXIiLCJmb3JtYXRFeHBpcnkiLCJmb3JtYXRGb3J3YXJkRXhwaXJ5IiwiZm9ybWF0Rm9yd2FyZFNsYXNoIiwiZm9ybWF0TW9udGhFeHBpcnkiLCJoYXNUZXh0U2VsZWN0ZWQiLCJsdWhuQ2hlY2siLCJyZUZvcm1hdENhcmROdW1iZXIiLCJyZXN0cmljdENWQyIsInJlc3RyaWN0Q2FyZE51bWJlciIsInJlc3RyaWN0Q29tYmluZWRFeHBpcnkiLCJyZXN0cmljdEV4cGlyeSIsInJlc3RyaWN0TW9udGhFeHBpcnkiLCJyZXN0cmljdE51bWVyaWMiLCJyZXN0cmljdFllYXJFeHBpcnkiLCJzZXRDYXJkVHlwZSIsImluZGV4T2YiLCJpdGVtIiwidHlwZSIsInBhdHRlcm4iLCJmb3JtYXQiLCJjdmNMZW5ndGgiLCJsdWhuIiwibnVtIiwiY2FyZCIsImRpZ2l0IiwiZGlnaXRzIiwib2RkIiwic3VtIiwicmV2ZXJzZSIsInBhcnNlSW50Iiwic2VsZWN0aW9uU3RhcnQiLCJzZWxlY3Rpb25FbmQiLCJzZWxlY3Rpb24iLCJjcmVhdGVSYW5nZSIsInNldFRpbWVvdXQiLCJfdGhpcyIsImZucyIsInJlIiwidXBwZXJMZW5ndGgiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJtZXRhIiwic2xhc2giLCJtZXRhS2V5IiwiaW5wdXQiLCJjdHJsS2V5IiwiYWxsVHlwZXMiLCJjYXJkVHlwZSIsImNhcmRFeHBpcnlWYWwiLCJtb250aCIsInByZWZpeCIsInllYXIiLCJEYXRlIiwiZ2V0RnVsbFllYXIiLCJ0b1N0cmluZyIsInNsaWNlIiwidmFsaWRhdGVDYXJkTnVtYmVyIiwidmFsaWRhdGVDYXJkRXhwaXJ5IiwiY3VycmVudFRpbWUiLCJleHBpcnkiLCJzZXRNb250aCIsImdldE1vbnRoIiwidmFsaWRhdGVDYXJkQ1ZDIiwiY3ZjIiwicmVmMSIsImdyb3VwcyIsImV4ZWMiLCJzaGlmdCIsImZvcm1hdENhcmRDVkMiLCJmb3JtYXRDYXJkRXhwaXJ5IiwiZm9ybWF0Q2FyZEV4cGlyeU11bHRpcGxlIiwiZ2V0Q2FyZEFycmF5Iiwic2V0Q2FyZEFycmF5IiwiY2FyZEFycmF5IiwiYWRkVG9DYXJkQXJyYXkiLCJjYXJkT2JqZWN0IiwicmVtb3ZlRnJvbUNhcmRBcnJheSIsImtleSIsInNwbGljZSIsIiQiLCJ1bmRlZmluZWQiLCJwbHVnaW5OYW1lIiwiZGVmYXVsdHMiLCJQbHVnaW4iLCJvcHRpb25zIiwiZXh0ZW5kIiwiX2RlZmF1bHRzIiwiX25hbWUiLCJpbml0IiwicHJvdG90eXBlIiwicmVzZXQiLCJhbW91bnQiLCJkb2N1bWVudEVsZW1lbnQiLCJwYXJzZUZsb2F0IiwibGV2ZWxfYW1vdW50X3NlbGVjdG9yIiwib3JpZ2luYWxfYW1vdW50Iiwib3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yIiwiZnJlcXVlbmN5IiwiZnJlcXVlbmN5X3NlbGVjdG9yIiwiYXR0ciIsInJlY3VycmluZyIsInJlY3VycmluZ19zZWxlY3RvciIsImNoYXJBdCIsInRvVXBwZXJDYXNlIiwicHJvY2Vzc2luZ19mZWUiLCJNYXRoIiwicm91bmQiLCJmZWVfYW1vdW50IiwicG93IiwidG9GaXhlZCIsInByb2Nlc3NpbmdfZmVlX3RleHQiLCJjcmVhdGVfYWNjb3VudCIsImJ1dHRvbl90ZXh0Iiwic3RyaXBlIiwiU3RyaXBlIiwic3RyaXBlX3B1Ymxpc2hhYmxlX2tleSIsImVsZW1lbnRzIiwicmVmZXJyZXIiLCJwcm9wIiwiZGVidWciLCJxdWVyeV9wYW5lbCIsInFzIiwicXVlcnkiLCJhY3RpdmUiLCJ0YWJOYXZpZ2F0aW9uIiwiYW1vdW50QXNSYWRpbyIsImFtb3VudFVwZGF0ZWQiLCJwYXlfY2NfcHJvY2Vzc2luZ19zZWxlY3RvciIsImNyZWRpdENhcmRQcm9jZXNzaW5nRmVlcyIsImRvbmF0ZV9zdGVwX3NlbGVjdG9yIiwibGV2ZWwiLCJjaGVja0xldmVsIiwibGV2ZWxudW0iLCJkb25hdGVBbm9ueW1vdXNseSIsImhvbm9yT3JNZW1vcnlUb2dnbGUiLCJvdXRzaWRlVW5pdGVkU3RhdGVzIiwic2hpcHBpbmdBZGRyZXNzIiwiYWxsb3dNaW5ucG9zdEFjY291bnQiLCJjaG9vc2VQYXltZW50TWV0aG9kIiwiY3JlZGl0Q2FyZEZpZWxkcyIsImFjaEZpZWxkcyIsInZhbGlkYXRlQW5kU3VibWl0IiwiY29uZmlybV9zdGVwX3NlbGVjdG9yIiwic2hvd05ld3NsZXR0ZXJTZXR0aW5ncyIsImNvbmZpcm1NZXNzYWdlU3VibWl0IiwiYiIsInAiLCJkZWNvZGVVUklDb21wb25lbnQiLCJsb2NhdGlvbiIsInNlYXJjaCIsInN1YnN0ciIsIm1lc3NhZ2UiLCJjb25zb2xlIiwibG9nIiwiZGlyIiwiZ2V0UXVlcnlTdHJpbmdzIiwibGluayIsInN0ZXAiLCJpbmRleCIsIm5hdl9pdGVtX2NvdW50Iiwib3BwX2lkIiwib3BwX2lkX3NlbGVjdG9yIiwibmV4dF9zdGVwIiwicG9zdF9wdXJjaGFzZSIsImNvbmZpcm0iLCJjb25maXJtX2J1dHRvbl9zZWxlY3RvciIsImFuYWx5dGljc1RyYWNraW5nU3RlcCIsInNob3ciLCJwYXJlbnQiLCJnYSIsInRvTG93ZXJDYXNlIiwicGFnZSIsInBhdGhuYW1lIiwidGl0bGUiLCJjaGFuZ2UiLCJpcyIsInRoYXQiLCJwYXltZW50X3R5cGUiLCJjaG9vc2VfcGF5bWVudCIsImFtb3VudF9zZWxlY3Rvcl9mYWlyX21hcmtldCIsInNldEZhaXJNYXJrZXRWYWx1ZSIsInNldFBheW1lbnRJbnRlbnQiLCJjYWxjdWxhdGVGZWVzIiwiYWRkaXRpb25hbF9hbW91bnRfZmllbGQiLCJnZXRUb3RhbEFtb3VudCIsInBheV9mZWVzIiwiZmllbGQiLCJpbnRlbnREYXRhIiwiY3VycmVuY3kiLCJhamF4IiwibWV0aG9kIiwidXJsIiwiZG9uZSIsInJlc3VsdCIsImludGVudF9zZWNyZXRfc2VsZWN0b3IiLCJjbGllbnRTZWNyZXQiLCJnZXRQYXltZW50SW50ZW50IiwiaW50ZW50IiwidG90YWxfYW1vdW50IiwiYWRkaXRpb25hbF9hbW91bnQiLCJhbW91bnRfc2VsZWN0b3IiLCJmYWlyX21hcmtldF92YWx1ZV9zZWxlY3RvciIsImZhaXJNYXJrZXRWYWx1ZSIsInN0cmlwZV9wYXltZW50X3R5cGUiLCJzZXRTdHJpcGVQYXltZW50VHlwZSIsImZlZXMiLCJjcmVkaXRDYXJkRmVlQ2hlY2tib3giLCJkb25hdGVfZm9ybV9zZWxlY3RvciIsImZ1bGxfYW1vdW50IiwiZnVsbF9hbW91bnRfc2VsZWN0b3IiLCJhbm9ueW1vdXNfc2VsZWN0b3IiLCJuYW1lX3NlbGVjdG9yIiwiaGlkZSIsInJldHVybnZhbHVlIiwiYW1vdW50X3llYXJseSIsImVhY2giLCJsZXZlbHMiLCJtYXgiLCJtaW4iLCJob25vck9yTWVtb3J5IiwiaG9ub3Jfb3JfbWVtb3J5X2Nob29zZXIiLCJob25vcl9tZW1vcnlfaW5wdXRfZ3JvdXAiLCJob25vcl90eXBlX3NlbGVjdG9yIiwiaG9ub3JfbmFtZV9zZWxlY3RvciIsInNob3dfYmlsbGluZ19jb3VudHJ5X3NlbGVjdG9yIiwiY2xpY2siLCJiaWxsaW5nX2NvdW50cnlfc2VsZWN0b3IiLCJzaG93X3NoaXBwaW5nX2NvdW50cnlfc2VsZWN0b3IiLCJzaGlwcGluZ19jb3VudHJ5X3NlbGVjdG9yIiwic2hvd19zaGlwcGluZyIsInVzZV9mb3Jfc2hpcHBpbmdfc2VsZWN0b3IiLCJzaGlwcGluZ19zZWxlY3RvciIsImNoYW5nZWQiLCJhY2NvdW50X2V4aXN0cyIsImVtYWlsX2ZpZWxkX3NlbGVjdG9yIiwiZG9uZVR5cGluZyIsImVtYWlsIiwiY2hlY2tNaW5ucG9zdEFjY291bnQiLCJ0eXBpbmdUaW1lciIsImRvbmVUeXBpbmdJbnRlcnZhbCIsImtleXVwIiwiY2xlYXJUaW1lb3V0IiwiY3JlYXRlX21wX3NlbGVjdG9yIiwicGFzc3dvcmRfc2VsZWN0b3IiLCJiZWZvcmUiLCJnZXQiLCJuZXh0IiwidG9nZ2xlIiwidXNlciIsIm1pbm5wb3N0X3Jvb3QiLCJzdGF0dXMiLCJyZWFzb24iLCJjaGVja2VkIiwiY2hlY2tlZF92YWx1ZSIsInNldHVwUGF5bWVudE1ldGhvZCIsImV2ZW50IiwiaWQiLCJwYXltZW50X21ldGhvZF9zZWxlY3RvciIsInN0eWxlIiwiYmFzZSIsImljb25Db2xvciIsImxpbmVIZWlnaHQiLCJmb250V2VpZ2h0IiwiZm9udEZhbWlseSIsImZvbnRTaXplIiwiY2FyZE51bWJlckVsZW1lbnQiLCJjcmVhdGUiLCJtb3VudCIsImNjX251bV9zZWxlY3RvciIsImNhcmRFeHBpcnlFbGVtZW50IiwiY2NfZXhwX3NlbGVjdG9yIiwiY2FyZEN2Y0VsZW1lbnQiLCJjY19jdnZfc2VsZWN0b3IiLCJzdHJpcGVFcnJvckRpc3BsYXkiLCJidXR0b25TdGF0dXMiLCJicmFuZCIsInNldEJyYW5kSWNvbiIsImNhcmRCcmFuZFRvUGZDbGFzcyIsImJyYW5kSWNvbkVsZW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInBmQ2xhc3MiLCJiYW5rVG9rZW5GaWVsZE5hbWUiLCJiYW5rVG9rZW5GaWVsZCIsInBsYWlkX2VudiIsIlBsYWlkIiwibGlua0hhbmRsZXIiLCJzZWxlY3RBY2NvdW50IiwiYXBpVmVyc2lvbiIsImVudiIsImNsaWVudE5hbWUiLCJwbGFpZF9wdWJsaWNfa2V5IiwicHJvZHVjdCIsIm9uTG9hZCIsIm9uU3VjY2VzcyIsInB1YmxpY190b2tlbiIsIm1ldGFkYXRhIiwic3VwcG9ydGZvcm0iLCJhY2NvdW50X2lkIiwic2VyaWFsaXplIiwicmVzcG9uc2UiLCJwbGFpZF9saW5rIiwiYWZ0ZXIiLCJzdHJpcGVfYmFua19hY2NvdW50X3Rva2VuIiwicHJlcGVuZCIsImh0bWwiLCJjb250ZW50cyIsInVud3JhcCIsIm9uRXhpdCIsImVyciIsIm9wZW4iLCJoYXNIdG1sNVZhbGlkYXRpb24iLCJjcmVhdGVFbGVtZW50IiwiY2hlY2tWYWxpZGl0eSIsImJ1dHRvbiIsImRpc2FibGVkIiwic3VibWl0IiwiYW5pbWF0ZSIsInNjcm9sbFRvcCIsIm9mZnNldCIsInRvcCIsInZhbGlkIiwidG9rZW5EYXRhIiwiZ2VuZXJhdGVUb2tlbkRhdGEiLCJmaXJzdF9uYW1lIiwiZmlyc3RfbmFtZV9maWVsZF9zZWxlY3RvciIsImxhc3RfbmFtZSIsImxhc3RfbmFtZV9maWVsZF9zZWxlY3RvciIsInBhc3N3b3JkIiwicGFzc3dvcmRfZmllbGRfc2VsZWN0b3IiLCJjaXR5IiwiYWNjb3VudF9jaXR5X3NlbGVjdG9yIiwic3RhdGUiLCJhY2NvdW50X3N0YXRlX3NlbGVjdG9yIiwiemlwIiwiYWNjb3VudF96aXBfc2VsZWN0b3IiLCJjb25maXJtQ2FyZFBheW1lbnQiLCJzdHJpcGVUb2tlbkhhbmRsZXIiLCJjYXJkRWxlbWVudCIsInBheW1lbnRfbWV0aG9kIiwidGhlbiIsInByZXYiLCJwYXltZW50SW50ZW50IiwidGhpc19zZWxlY3RvciIsIndoaWNoX2Vycm9yIiwiZW1wdHkiLCJmdWxsX25hbWUiLCJzdHJlZXQiLCJhZGRyZXNzX2xpbmUxIiwiYWRkcmVzc19jaXR5IiwiYWRkcmVzc19zdGF0ZSIsImFkZHJlc3NfemlwIiwiY291bnRyeSIsImFkZHJlc3NfY291bnRyeSIsImNyZWF0ZVRva2VuIiwidG9rZW4iLCJzdHJpcGVQYXltZW50SGFuZGxlciIsImFqYXhfdXJsIiwidG9rZW5GaWVsZE5hbWUiLCJ0b2tlbkZpZWxkIiwiY2FjaGUiLCJlcnJvcnMiLCJzdHJpcGVFcnJvclNlbGVjdG9yIiwibmV3c2xldHRlcl9ncm91cF9odG1sIiwibmV3c2xldHRlcl9ncm91cF9zZWxlY3RvciIsImdldF9kYXRhIiwic2hvcnRjb2RlIiwicGxhY2VtZW50IiwiZ3JvdXBfZmllbGRzIiwiY2F0ZWdvcnkiLCJtYWlsY2hpbXBfc3RhdHVzIiwibWFpbGNoaW1wX3VzZXJfaWQiLCJleGlzdGluZ19uZXdzbGV0dGVyX3NldHRpbmdzIiwiY29uZmlybV9mb3JtX3NlbGVjdG9yIiwiY29uZmlybWZvcm0iLCJuZXdzbGV0dGVyX2dyb3VwcyIsIm5ld19uZXdzbGV0dGVyX3NldHRpbmdzIiwicG9zdF9kYXRhIiwiZ3JvdXBzX3N1Ym1pdHRlZCIsImdyb3Vwc19hdmFpbGFibGUiLCJncm91cCIsImRhdGFUeXBlIiwiY29udGVudFR5cGUiLCJKU09OIiwic3RyaW5naWZ5Iiwic3VjY2VzcyIsImZhaWwiLCJmbiIsImpRdWVyeSJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLENBQUMsVUFBU0EsQ0FBVCxFQUFXO0FBQUMsTUFBRyxRQUFPQyxPQUFQLHlDQUFPQSxPQUFQLE9BQWlCLFFBQWpCLElBQTJCLE9BQU9DLE1BQVAsS0FBZ0IsV0FBOUMsRUFBMEQ7QUFBQ0EsSUFBQUEsTUFBTSxDQUFDRCxPQUFQLEdBQWVELENBQUMsRUFBaEI7QUFBbUIsR0FBOUUsTUFBbUYsSUFBRyxPQUFPRyxNQUFQLEtBQWdCLFVBQWhCLElBQTRCQSxNQUFNLENBQUNDLEdBQXRDLEVBQTBDO0FBQUNELElBQUFBLE1BQU0sQ0FBQyxFQUFELEVBQUlILENBQUosQ0FBTjtBQUFhLEdBQXhELE1BQTREO0FBQUMsUUFBSUssQ0FBSjs7QUFBTSxRQUFHLE9BQU9DLE1BQVAsS0FBZ0IsV0FBbkIsRUFBK0I7QUFBQ0QsTUFBQUEsQ0FBQyxHQUFDQyxNQUFGO0FBQVMsS0FBekMsTUFBOEMsSUFBRyxPQUFPQyxNQUFQLEtBQWdCLFdBQW5CLEVBQStCO0FBQUNGLE1BQUFBLENBQUMsR0FBQ0UsTUFBRjtBQUFTLEtBQXpDLE1BQThDLElBQUcsT0FBT0MsSUFBUCxLQUFjLFdBQWpCLEVBQTZCO0FBQUNILE1BQUFBLENBQUMsR0FBQ0csSUFBRjtBQUFPLEtBQXJDLE1BQXlDO0FBQUNILE1BQUFBLENBQUMsR0FBQyxJQUFGO0FBQU87O0FBQUEsS0FBQ0EsQ0FBQyxDQUFDSSxPQUFGLEtBQWNKLENB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QUFxQjtBQUN0QyxXQUFPLEtBQUttSSxJQUFMLENBQVUsWUFBWTtBQUMzQixVQUFJLENBQUN4SSxDQUFDLENBQUN4SSxJQUFGLENBQU8sSUFBUCxFQUFhLFlBQVkwSSxVQUF6QixDQUFMLEVBQTJDO0FBQ3pDRixRQUFBQSxDQUFDLENBQUN4SSxJQUFGLENBQU8sSUFBUCxFQUFhLFlBQVkwSSxVQUF6QixFQUFxQyxJQUFJRSxNQUFKLENBQVksSUFBWixFQUFrQkMsT0FBbEIsQ0FBckM7QUFDRDtBQUNGLEtBSk0sQ0FBUDtBQUtELEdBTkQ7QUFRRCxDQTc0Q0EsRUE2NENHK1MsTUE3NENILEVBNjRDV3plLE1BNzRDWCxFQTY0Q21CeUIsUUE3NENuQiIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKGYpe2lmKHR5cGVvZiBleHBvcnRzPT09XCJvYmplY3RcIiYmdHlwZW9mIG1vZHVsZSE9PVwidW5kZWZpbmVkXCIpe21vZHVsZS5leHBvcnRzPWYoKX1lbHNlIGlmKHR5cGVvZiBkZWZpbmU9PT1cImZ1bmN0aW9uXCImJmRlZmluZS5hbWQpe2RlZmluZShbXSxmKX1lbHNle3ZhciBnO2lmKHR5cGVvZiB3aW5kb3chPT1cInVuZGVmaW5lZFwiKXtnPXdpbmRvd31lbHNlIGlmKHR5cGVvZiBnbG9iYWwhPT1cInVuZGVmaW5lZFwiKXtnPWdsb2JhbH1lbHNlIGlmKHR5cGVvZiBzZWxmIT09XCJ1bmRlZmluZWRcIil7Zz1zZWxmfWVsc2V7Zz10aGlzfShnLnBheW1lbnQgfHwgKGcucGF5bWVudCA9IHt9KSkuanMgPSBmKCl9fSkoZnVuY3Rpb24oKXt2YXIgZGVmaW5lLG1vZHVsZSxleHBvcnRzO3JldHVybiAoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSh7MTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG52YXIgUUosIHJyZXR1cm4sIHJ0cmltO1xuXG5RSiA9IGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG4gIGlmIChRSi5pc0RPTUVsZW1lbnQoc2VsZWN0b3IpKSB7XG4gICAgcmV0dXJuIHNlbGVjdG9yO1xuICB9XG4gIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbn07XG5cblFKLmlzRE9NRWxlbWVudCA9IGZ1bmN0aW9uKGVsKSB7XG4gIHJldHVybiBlbCAmJiAoZWwubm9kZU5hbWUgIT0gbnVsbCk7XG59O1xuXG5ydHJpbSA9IC9eW1xcc1xcdUZFRkZcXHhBMF0rfFtcXHNcXHVGRUZGXFx4QTBdKyQvZztcblxuUUoudHJpbSA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgaWYgKHRleHQgPT09IG51bGwpIHtcbiAgICByZXR1cm4gXCJcIjtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gKHRleHQgKyBcIlwiKS5yZXBsYWNlKHJ0cmltLCBcIlwiKTtcbiAgfVxufTtcblxucnJldHVybiA9IC9cXHIvZztcblxuUUoudmFsID0gZnVuY3Rpb24oZWwsIHZhbCkge1xuICB2YXIgcmV0O1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICByZXR1cm4gZWwudmFsdWUgPSB2YWw7XG4gIH0gZWxzZSB7XG4gICAgcmV0ID0gZWwudmFsdWU7XG4gICAgaWYgKHR5cGVvZiByZXQgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHJldHVybiByZXQucmVwbGFjZShycmV0dXJuLCBcIlwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHJldCA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG5RSi5wcmV2ZW50RGVmYXVsdCA9IGZ1bmN0aW9uKGV2ZW50T2JqZWN0KSB7XG4gIGlmICh0eXBlb2YgZXZlbnRPYmplY3QucHJldmVudERlZmF1bHQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIGV2ZW50T2JqZWN0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGV2ZW50T2JqZWN0LnJldHVyblZhbHVlID0gZmFsc2U7XG4gIHJldHVybiBmYWxzZTtcbn07XG5cblFKLm5vcm1hbGl6ZUV2ZW50ID0gZnVuY3Rpb24oZSkge1xuICB2YXIgb3JpZ2luYWw7XG4gIG9yaWdpbmFsID0gZTtcbiAgZSA9IHtcbiAgICB3aGljaDogb3JpZ2luYWwud2hpY2ggIT0gbnVsbCA/IG9yaWdpbmFsLndoaWNoIDogdm9pZCAwLFxuICAgIHRhcmdldDogb3JpZ2luYWwudGFyZ2V0IHx8IG9yaWdpbmFsLnNyY0VsZW1lbnQsXG4gICAgcHJldmVudERlZmF1bHQ6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIFFKLnByZXZlbnREZWZhdWx0KG9yaWdpbmFsKTtcbiAgICB9LFxuICAgIG9yaWdpbmFsRXZlbnQ6IG9yaWdpbmFsLFxuICAgIGRhdGE6IG9yaWdpbmFsLmRhdGEgfHwgb3JpZ2luYWwuZGV0YWlsXG4gIH07XG4gIGlmIChlLndoaWNoID09IG51bGwpIHtcbiAgICBlLndoaWNoID0gb3JpZ2luYWwuY2hhckNvZGUgIT0gbnVsbCA/IG9yaWdpbmFsLmNoYXJDb2RlIDogb3JpZ2luYWwua2V5Q29kZTtcbiAgfVxuICByZXR1cm4gZTtcbn07XG5cblFKLm9uID0gZnVuY3Rpb24oZWxlbWVudCwgZXZlbnROYW1lLCBjYWxsYmFjaykge1xuICB2YXIgZWwsIGksIGosIGxlbiwgbGVuMSwgbXVsdEV2ZW50TmFtZSwgb3JpZ2luYWxDYWxsYmFjaywgcmVmO1xuICBpZiAoZWxlbWVudC5sZW5ndGgpIHtcbiAgICBmb3IgKGkgPSAwLCBsZW4gPSBlbGVtZW50Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBlbCA9IGVsZW1lbnRbaV07XG4gICAgICBRSi5vbihlbCwgZXZlbnROYW1lLCBjYWxsYmFjayk7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuICBpZiAoZXZlbnROYW1lLm1hdGNoKFwiIFwiKSkge1xuICAgIHJlZiA9IGV2ZW50TmFtZS5zcGxpdChcIiBcIik7XG4gICAgZm9yIChqID0gMCwgbGVuMSA9IHJlZi5sZW5ndGg7IGogPCBsZW4xOyBqKyspIHtcbiAgICAgIG11bHRFdmVudE5hbWUgPSByZWZbal07XG4gICAgICBRSi5vbihlbGVtZW50LCBtdWx0RXZlbnROYW1lLCBjYWxsYmFjayk7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuICBvcmlnaW5hbENhbGxiYWNrID0gY2FsbGJhY2s7XG4gIGNhbGxiYWNrID0gZnVuY3Rpb24oZSkge1xuICAgIGUgPSBRSi5ub3JtYWxpemVFdmVudChlKTtcbiAgICByZXR1cm4gb3JpZ2luYWxDYWxsYmFjayhlKTtcbiAgfTtcbiAgaWYgKGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgIHJldHVybiBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBjYWxsYmFjaywgZmFsc2UpO1xuICB9XG4gIGlmIChlbGVtZW50LmF0dGFjaEV2ZW50KSB7XG4gICAgZXZlbnROYW1lID0gXCJvblwiICsgZXZlbnROYW1lO1xuICAgIHJldHVybiBlbGVtZW50LmF0dGFjaEV2ZW50KGV2ZW50TmFtZSwgY2FsbGJhY2spO1xuICB9XG4gIGVsZW1lbnRbJ29uJyArIGV2ZW50TmFtZV0gPSBjYWxsYmFjaztcbn07XG5cblFKLmFkZENsYXNzID0gZnVuY3Rpb24oZWwsIGNsYXNzTmFtZSkge1xuICB2YXIgZTtcbiAgaWYgKGVsLmxlbmd0aCkge1xuICAgIHJldHVybiAoZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaSwgbGVuLCByZXN1bHRzO1xuICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgZm9yIChpID0gMCwgbGVuID0gZWwubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgZSA9IGVsW2ldO1xuICAgICAgICByZXN1bHRzLnB1c2goUUouYWRkQ2xhc3MoZSwgY2xhc3NOYW1lKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9KSgpO1xuICB9XG4gIGlmIChlbC5jbGFzc0xpc3QpIHtcbiAgICByZXR1cm4gZWwuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBlbC5jbGFzc05hbWUgKz0gJyAnICsgY2xhc3NOYW1lO1xuICB9XG59O1xuXG5RSi5oYXNDbGFzcyA9IGZ1bmN0aW9uKGVsLCBjbGFzc05hbWUpIHtcbiAgdmFyIGUsIGhhc0NsYXNzLCBpLCBsZW47XG4gIGlmIChlbC5sZW5ndGgpIHtcbiAgICBoYXNDbGFzcyA9IHRydWU7XG4gICAgZm9yIChpID0gMCwgbGVuID0gZWwubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGUgPSBlbFtpXTtcbiAgICAgIGhhc0NsYXNzID0gaGFzQ2xhc3MgJiYgUUouaGFzQ2xhc3MoZSwgY2xhc3NOYW1lKTtcbiAgICB9XG4gICAgcmV0dXJuIGhhc0NsYXNzO1xuICB9XG4gIGlmIChlbC5jbGFzc0xpc3QpIHtcbiAgICByZXR1cm4gZWwuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyBSZWdFeHAoJyhefCApJyArIGNsYXNzTmFtZSArICcoIHwkKScsICdnaScpLnRlc3QoZWwuY2xhc3NOYW1lKTtcbiAgfVxufTtcblxuUUoucmVtb3ZlQ2xhc3MgPSBmdW5jdGlvbihlbCwgY2xhc3NOYW1lKSB7XG4gIHZhciBjbHMsIGUsIGksIGxlbiwgcmVmLCByZXN1bHRzO1xuICBpZiAoZWwubGVuZ3RoKSB7XG4gICAgcmV0dXJuIChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBpLCBsZW4sIHJlc3VsdHM7XG4gICAgICByZXN1bHRzID0gW107XG4gICAgICBmb3IgKGkgPSAwLCBsZW4gPSBlbC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBlID0gZWxbaV07XG4gICAgICAgIHJlc3VsdHMucHVzaChRSi5yZW1vdmVDbGFzcyhlLCBjbGFzc05hbWUpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH0pKCk7XG4gIH1cbiAgaWYgKGVsLmNsYXNzTGlzdCkge1xuICAgIHJlZiA9IGNsYXNzTmFtZS5zcGxpdCgnICcpO1xuICAgIHJlc3VsdHMgPSBbXTtcbiAgICBmb3IgKGkgPSAwLCBsZW4gPSByZWYubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGNscyA9IHJlZltpXTtcbiAgICAgIHJlc3VsdHMucHVzaChlbC5jbGFzc0xpc3QucmVtb3ZlKGNscykpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZWwuY2xhc3NOYW1lID0gZWwuY2xhc3NOYW1lLnJlcGxhY2UobmV3IFJlZ0V4cCgnKF58XFxcXGIpJyArIGNsYXNzTmFtZS5zcGxpdCgnICcpLmpvaW4oJ3wnKSArICcoXFxcXGJ8JCknLCAnZ2knKSwgJyAnKTtcbiAgfVxufTtcblxuUUoudG9nZ2xlQ2xhc3MgPSBmdW5jdGlvbihlbCwgY2xhc3NOYW1lLCBib29sKSB7XG4gIHZhciBlO1xuICBpZiAoZWwubGVuZ3RoKSB7XG4gICAgcmV0dXJuIChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBpLCBsZW4sIHJlc3VsdHM7XG4gICAgICByZXN1bHRzID0gW107XG4gICAgICBmb3IgKGkgPSAwLCBsZW4gPSBlbC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBlID0gZWxbaV07XG4gICAgICAgIHJlc3VsdHMucHVzaChRSi50b2dnbGVDbGFzcyhlLCBjbGFzc05hbWUsIGJvb2wpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH0pKCk7XG4gIH1cbiAgaWYgKGJvb2wpIHtcbiAgICBpZiAoIVFKLmhhc0NsYXNzKGVsLCBjbGFzc05hbWUpKSB7XG4gICAgICByZXR1cm4gUUouYWRkQ2xhc3MoZWwsIGNsYXNzTmFtZSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBRSi5yZW1vdmVDbGFzcyhlbCwgY2xhc3NOYW1lKTtcbiAgfVxufTtcblxuUUouYXBwZW5kID0gZnVuY3Rpb24oZWwsIHRvQXBwZW5kKSB7XG4gIHZhciBlO1xuICBpZiAoZWwubGVuZ3RoKSB7XG4gICAgcmV0dXJuIChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBpLCBsZW4sIHJlc3VsdHM7XG4gICAgICByZXN1bHRzID0gW107XG4gICAgICBmb3IgKGkgPSAwLCBsZW4gPSBlbC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBlID0gZWxbaV07XG4gICAgICAgIHJlc3VsdHMucHVzaChRSi5hcHBlbmQoZSwgdG9BcHBlbmQpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH0pKCk7XG4gIH1cbiAgcmV0dXJuIGVsLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgdG9BcHBlbmQpO1xufTtcblxuUUouZmluZCA9IGZ1bmN0aW9uKGVsLCBzZWxlY3Rvcikge1xuICBpZiAoZWwgaW5zdGFuY2VvZiBOb2RlTGlzdCB8fCBlbCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgZWwgPSBlbFswXTtcbiAgfVxuICByZXR1cm4gZWwucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG59O1xuXG5RSi50cmlnZ2VyID0gZnVuY3Rpb24oZWwsIG5hbWUsIGRhdGEpIHtcbiAgdmFyIGUsIGVycm9yLCBldjtcbiAgdHJ5IHtcbiAgICBldiA9IG5ldyBDdXN0b21FdmVudChuYW1lLCB7XG4gICAgICBkZXRhaWw6IGRhdGFcbiAgICB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBlID0gZXJyb3I7XG4gICAgZXYgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcbiAgICBpZiAoZXYuaW5pdEN1c3RvbUV2ZW50KSB7XG4gICAgICBldi5pbml0Q3VzdG9tRXZlbnQobmFtZSwgdHJ1ZSwgdHJ1ZSwgZGF0YSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV2LmluaXRFdmVudChuYW1lLCB0cnVlLCB0cnVlLCBkYXRhKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGVsLmRpc3BhdGNoRXZlbnQoZXYpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBRSjtcblxuXG59LHt9XSwyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbihmdW5jdGlvbiAoZ2xvYmFsKXtcbnZhciBQYXltZW50LCBRSiwgY2FyZEZyb21OdW1iZXIsIGNhcmRGcm9tVHlwZSwgY2FyZHMsIGRlZmF1bHRGb3JtYXQsIGZvcm1hdEJhY2tDYXJkTnVtYmVyLCBmb3JtYXRCYWNrRXhwaXJ5LCBmb3JtYXRDYXJkTnVtYmVyLCBmb3JtYXRFeHBpcnksIGZvcm1hdEZvcndhcmRFeHBpcnksIGZvcm1hdEZvcndhcmRTbGFzaCwgZm9ybWF0TW9udGhFeHBpcnksIGhhc1RleHRTZWxlY3RlZCwgbHVobkNoZWNrLCByZUZvcm1hdENhcmROdW1iZXIsIHJlc3RyaWN0Q1ZDLCByZXN0cmljdENhcmROdW1iZXIsIHJlc3RyaWN0Q29tYmluZWRFeHBpcnksIHJlc3RyaWN0RXhwaXJ5LCByZXN0cmljdE1vbnRoRXhwaXJ5LCByZXN0cmljdE51bWVyaWMsIHJlc3RyaWN0WWVhckV4cGlyeSwgc2V0Q2FyZFR5cGUsXG4gIGluZGV4T2YgPSBbXS5pbmRleE9mIHx8IGZ1bmN0aW9uKGl0ZW0pIHsgZm9yICh2YXIgaSA9IDAsIGwgPSB0aGlzLmxlbmd0aDsgaSA8IGw7IGkrKykgeyBpZiAoaSBpbiB0aGlzICYmIHRoaXNbaV0gPT09IGl0ZW0pIHJldHVybiBpOyB9IHJldHVybiAtMTsgfTtcblxuUUogPSByZXF1aXJlKCdxai9zcmMvcWouY29mZmVlJyk7XG5cbmRlZmF1bHRGb3JtYXQgPSAvKFxcZHsxLDR9KS9nO1xuXG5jYXJkcyA9IFtcbiAge1xuICAgIHR5cGU6ICdhbWV4JyxcbiAgICBwYXR0ZXJuOiAvXjNbNDddLyxcbiAgICBmb3JtYXQ6IC8oXFxkezEsNH0pKFxcZHsxLDZ9KT8oXFxkezEsNX0pPy8sXG4gICAgbGVuZ3RoOiBbMTVdLFxuICAgIGN2Y0xlbmd0aDogWzRdLFxuICAgIGx1aG46IHRydWVcbiAgfSwge1xuICAgIHR5cGU6ICdkYW5rb3J0JyxcbiAgICBwYXR0ZXJuOiAvXjUwMTkvLFxuICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICBsZW5ndGg6IFsxNl0sXG4gICAgY3ZjTGVuZ3RoOiBbM10sXG4gICAgbHVobjogdHJ1ZVxuICB9LCB7XG4gICAgdHlwZTogJ2RpbmVyc2NsdWInLFxuICAgIHBhdHRlcm46IC9eKDM2fDM4fDMwWzAtNV0pLyxcbiAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgbGVuZ3RoOiBbMTRdLFxuICAgIGN2Y0xlbmd0aDogWzNdLFxuICAgIGx1aG46IHRydWVcbiAgfSwge1xuICAgIHR5cGU6ICdkaXNjb3ZlcicsXG4gICAgcGF0dGVybjogL14oNjAxMXw2NXw2NFs0LTldfDYyMikvLFxuICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICBsZW5ndGg6IFsxNl0sXG4gICAgY3ZjTGVuZ3RoOiBbM10sXG4gICAgbHVobjogdHJ1ZVxuICB9LCB7XG4gICAgdHlwZTogJ2pjYicsXG4gICAgcGF0dGVybjogL14zNS8sXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGxlbmd0aDogWzE2XSxcbiAgICBjdmNMZW5ndGg6IFszXSxcbiAgICBsdWhuOiB0cnVlXG4gIH0sIHtcbiAgICB0eXBlOiAnbGFzZXInLFxuICAgIHBhdHRlcm46IC9eKDY3MDZ8Njc3MXw2NzA5KS8sXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGxlbmd0aDogWzE2LCAxNywgMTgsIDE5XSxcbiAgICBjdmNMZW5ndGg6IFszXSxcbiAgICBsdWhuOiB0cnVlXG4gIH0sIHtcbiAgICB0eXBlOiAnbWFlc3RybycsXG4gICAgcGF0dGVybjogL14oNTAxOHw1MDIwfDUwMzh8NjMwNHw2NzAzfDY3NTl8Njc2WzEtM10pLyxcbiAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgbGVuZ3RoOiBbMTIsIDEzLCAxNCwgMTUsIDE2LCAxNywgMTgsIDE5XSxcbiAgICBjdmNMZW5ndGg6IFszXSxcbiAgICBsdWhuOiB0cnVlXG4gIH0sIHtcbiAgICB0eXBlOiAnbWFzdGVyY2FyZCcsXG4gICAgcGF0dGVybjogL141WzEtNV0vLFxuICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICBsZW5ndGg6IFsxNl0sXG4gICAgY3ZjTGVuZ3RoOiBbM10sXG4gICAgbHVobjogdHJ1ZVxuICB9LCB7XG4gICAgdHlwZTogJ3VuaW9ucGF5JyxcbiAgICBwYXR0ZXJuOiAvXjYyLyxcbiAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgbGVuZ3RoOiBbMTYsIDE3LCAxOCwgMTldLFxuICAgIGN2Y0xlbmd0aDogWzNdLFxuICAgIGx1aG46IGZhbHNlXG4gIH0sIHtcbiAgICB0eXBlOiAndmlzYWVsZWN0cm9uJyxcbiAgICBwYXR0ZXJuOiAvXjQoMDI2fDE3NTAwfDQwNXw1MDh8ODQ0fDkxWzM3XSkvLFxuICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICBsZW5ndGg6IFsxNl0sXG4gICAgY3ZjTGVuZ3RoOiBbM10sXG4gICAgbHVobjogdHJ1ZVxuICB9LCB7XG4gICAgdHlwZTogJ3Zpc2EnLFxuICAgIHBhdHRlcm46IC9eNC8sXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGxlbmd0aDogWzEzLCAxNl0sXG4gICAgY3ZjTGVuZ3RoOiBbM10sXG4gICAgbHVobjogdHJ1ZVxuICB9LCB7XG4gICAgdHlwZTogJ2VsbycsXG4gICAgcGF0dGVybjogL140MDExfDQzODkzNXw0NSgxNDE2fDc2KXw1MCg0MTc1fDY2OTl8Njd8OTBbNC03XSl8NjMoNjI5N3w2MzY4KS8sXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGxlbmd0aDogWzE2XSxcbiAgICBjdmNMZW5ndGg6IFszXSxcbiAgICBsdWhuOiB0cnVlXG4gIH1cbl07XG5cbmNhcmRGcm9tTnVtYmVyID0gZnVuY3Rpb24obnVtKSB7XG4gIHZhciBjYXJkLCBpLCBsZW47XG4gIG51bSA9IChudW0gKyAnJykucmVwbGFjZSgvXFxEL2csICcnKTtcbiAgZm9yIChpID0gMCwgbGVuID0gY2FyZHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBjYXJkID0gY2FyZHNbaV07XG4gICAgaWYgKGNhcmQucGF0dGVybi50ZXN0KG51bSkpIHtcbiAgICAgIHJldHVybiBjYXJkO1xuICAgIH1cbiAgfVxufTtcblxuY2FyZEZyb21UeXBlID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIgY2FyZCwgaSwgbGVuO1xuICBmb3IgKGkgPSAwLCBsZW4gPSBjYXJkcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGNhcmQgPSBjYXJkc1tpXTtcbiAgICBpZiAoY2FyZC50eXBlID09PSB0eXBlKSB7XG4gICAgICByZXR1cm4gY2FyZDtcbiAgICB9XG4gIH1cbn07XG5cbmx1aG5DaGVjayA9IGZ1bmN0aW9uKG51bSkge1xuICB2YXIgZGlnaXQsIGRpZ2l0cywgaSwgbGVuLCBvZGQsIHN1bTtcbiAgb2RkID0gdHJ1ZTtcbiAgc3VtID0gMDtcbiAgZGlnaXRzID0gKG51bSArICcnKS5zcGxpdCgnJykucmV2ZXJzZSgpO1xuICBmb3IgKGkgPSAwLCBsZW4gPSBkaWdpdHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBkaWdpdCA9IGRpZ2l0c1tpXTtcbiAgICBkaWdpdCA9IHBhcnNlSW50KGRpZ2l0LCAxMCk7XG4gICAgaWYgKChvZGQgPSAhb2RkKSkge1xuICAgICAgZGlnaXQgKj0gMjtcbiAgICB9XG4gICAgaWYgKGRpZ2l0ID4gOSkge1xuICAgICAgZGlnaXQgLT0gOTtcbiAgICB9XG4gICAgc3VtICs9IGRpZ2l0O1xuICB9XG4gIHJldHVybiBzdW0gJSAxMCA9PT0gMDtcbn07XG5cbmhhc1RleHRTZWxlY3RlZCA9IGZ1bmN0aW9uKHRhcmdldCkge1xuICB2YXIgcmVmO1xuICBpZiAoKHRhcmdldC5zZWxlY3Rpb25TdGFydCAhPSBudWxsKSAmJiB0YXJnZXQuc2VsZWN0aW9uU3RhcnQgIT09IHRhcmdldC5zZWxlY3Rpb25FbmQpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAoKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBkb2N1bWVudCAhPT0gbnVsbCA/IChyZWYgPSBkb2N1bWVudC5zZWxlY3Rpb24pICE9IG51bGwgPyByZWYuY3JlYXRlUmFuZ2UgOiB2b2lkIDAgOiB2b2lkIDApICE9IG51bGwpIHtcbiAgICBpZiAoZG9jdW1lbnQuc2VsZWN0aW9uLmNyZWF0ZVJhbmdlKCkudGV4dCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbnJlRm9ybWF0Q2FyZE51bWJlciA9IGZ1bmN0aW9uKGUpIHtcbiAgcmV0dXJuIHNldFRpbWVvdXQoKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHRhcmdldCwgdmFsdWU7XG4gICAgICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICAgIHZhbHVlID0gUUoudmFsKHRhcmdldCk7XG4gICAgICB2YWx1ZSA9IFBheW1lbnQuZm5zLmZvcm1hdENhcmROdW1iZXIodmFsdWUpO1xuICAgICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIHZhbHVlKTtcbiAgICB9O1xuICB9KSh0aGlzKSk7XG59O1xuXG5mb3JtYXRDYXJkTnVtYmVyID0gZnVuY3Rpb24oZSkge1xuICB2YXIgY2FyZCwgZGlnaXQsIGxlbmd0aCwgcmUsIHRhcmdldCwgdXBwZXJMZW5ndGgsIHZhbHVlO1xuICBkaWdpdCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZS53aGljaCk7XG4gIGlmICghL15cXGQrJC8udGVzdChkaWdpdCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gIHZhbHVlID0gUUoudmFsKHRhcmdldCk7XG4gIGNhcmQgPSBjYXJkRnJvbU51bWJlcih2YWx1ZSArIGRpZ2l0KTtcbiAgbGVuZ3RoID0gKHZhbHVlLnJlcGxhY2UoL1xcRC9nLCAnJykgKyBkaWdpdCkubGVuZ3RoO1xuICB1cHBlckxlbmd0aCA9IDE2O1xuICBpZiAoY2FyZCkge1xuICAgIHVwcGVyTGVuZ3RoID0gY2FyZC5sZW5ndGhbY2FyZC5sZW5ndGgubGVuZ3RoIC0gMV07XG4gIH1cbiAgaWYgKGxlbmd0aCA+PSB1cHBlckxlbmd0aCkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoKHRhcmdldC5zZWxlY3Rpb25TdGFydCAhPSBudWxsKSAmJiB0YXJnZXQuc2VsZWN0aW9uU3RhcnQgIT09IHZhbHVlLmxlbmd0aCkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoY2FyZCAmJiBjYXJkLnR5cGUgPT09ICdhbWV4Jykge1xuICAgIHJlID0gL14oXFxkezR9fFxcZHs0fVxcc1xcZHs2fSkkLztcbiAgfSBlbHNlIHtcbiAgICByZSA9IC8oPzpefFxccykoXFxkezR9KSQvO1xuICB9XG4gIGlmIChyZS50ZXN0KHZhbHVlKSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgdmFsdWUgKyAnICcgKyBkaWdpdCk7XG4gIH0gZWxzZSBpZiAocmUudGVzdCh2YWx1ZSArIGRpZ2l0KSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgdmFsdWUgKyBkaWdpdCArICcgJyk7XG4gIH1cbn07XG5cbmZvcm1hdEJhY2tDYXJkTnVtYmVyID0gZnVuY3Rpb24oZSkge1xuICB2YXIgdGFyZ2V0LCB2YWx1ZTtcbiAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gIHZhbHVlID0gUUoudmFsKHRhcmdldCk7XG4gIGlmIChlLm1ldGEpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGUud2hpY2ggIT09IDgpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKCh0YXJnZXQuc2VsZWN0aW9uU3RhcnQgIT0gbnVsbCkgJiYgdGFyZ2V0LnNlbGVjdGlvblN0YXJ0ICE9PSB2YWx1ZS5sZW5ndGgpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKC9cXGRcXHMkLy50ZXN0KHZhbHVlKSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgdmFsdWUucmVwbGFjZSgvXFxkXFxzJC8sICcnKSk7XG4gIH0gZWxzZSBpZiAoL1xcc1xcZD8kLy50ZXN0KHZhbHVlKSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgdmFsdWUucmVwbGFjZSgvXFxzXFxkPyQvLCAnJykpO1xuICB9XG59O1xuXG5mb3JtYXRFeHBpcnkgPSBmdW5jdGlvbihlKSB7XG4gIHZhciBkaWdpdCwgdGFyZ2V0LCB2YWw7XG4gIGRpZ2l0ID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKTtcbiAgaWYgKCEvXlxcZCskLy50ZXN0KGRpZ2l0KSkge1xuICAgIHJldHVybjtcbiAgfVxuICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgdmFsID0gUUoudmFsKHRhcmdldCkgKyBkaWdpdDtcbiAgaWYgKC9eXFxkJC8udGVzdCh2YWwpICYmICh2YWwgIT09ICcwJyAmJiB2YWwgIT09ICcxJykpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIFwiMFwiICsgdmFsICsgXCIgLyBcIik7XG4gIH0gZWxzZSBpZiAoL15cXGRcXGQkLy50ZXN0KHZhbCkpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIHZhbCArIFwiIC8gXCIpO1xuICB9XG59O1xuXG5mb3JtYXRNb250aEV4cGlyeSA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIGRpZ2l0LCB0YXJnZXQsIHZhbDtcbiAgZGlnaXQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpO1xuICBpZiAoIS9eXFxkKyQvLnRlc3QoZGlnaXQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRhcmdldCA9IGUudGFyZ2V0O1xuICB2YWwgPSBRSi52YWwodGFyZ2V0KSArIGRpZ2l0O1xuICBpZiAoL15cXGQkLy50ZXN0KHZhbCkgJiYgKHZhbCAhPT0gJzAnICYmIHZhbCAhPT0gJzEnKSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgXCIwXCIgKyB2YWwpO1xuICB9IGVsc2UgaWYgKC9eXFxkXFxkJC8udGVzdCh2YWwpKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCBcIlwiICsgdmFsKTtcbiAgfVxufTtcblxuZm9ybWF0Rm9yd2FyZEV4cGlyeSA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIGRpZ2l0LCB0YXJnZXQsIHZhbDtcbiAgZGlnaXQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpO1xuICBpZiAoIS9eXFxkKyQvLnRlc3QoZGlnaXQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRhcmdldCA9IGUudGFyZ2V0O1xuICB2YWwgPSBRSi52YWwodGFyZ2V0KTtcbiAgaWYgKC9eXFxkXFxkJC8udGVzdCh2YWwpKSB7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIHZhbCArIFwiIC8gXCIpO1xuICB9XG59O1xuXG5mb3JtYXRGb3J3YXJkU2xhc2ggPSBmdW5jdGlvbihlKSB7XG4gIHZhciBzbGFzaCwgdGFyZ2V0LCB2YWw7XG4gIHNsYXNoID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKTtcbiAgaWYgKHNsYXNoICE9PSAnLycpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gIHZhbCA9IFFKLnZhbCh0YXJnZXQpO1xuICBpZiAoL15cXGQkLy50ZXN0KHZhbCkgJiYgdmFsICE9PSAnMCcpIHtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgXCIwXCIgKyB2YWwgKyBcIiAvIFwiKTtcbiAgfVxufTtcblxuZm9ybWF0QmFja0V4cGlyeSA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIHRhcmdldCwgdmFsdWU7XG4gIGlmIChlLm1ldGFLZXkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gIHZhbHVlID0gUUoudmFsKHRhcmdldCk7XG4gIGlmIChlLndoaWNoICE9PSA4KSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICgodGFyZ2V0LnNlbGVjdGlvblN0YXJ0ICE9IG51bGwpICYmIHRhcmdldC5zZWxlY3Rpb25TdGFydCAhPT0gdmFsdWUubGVuZ3RoKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICgvXFxkKFxcc3xcXC8pKyQvLnRlc3QodmFsdWUpKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCB2YWx1ZS5yZXBsYWNlKC9cXGQoXFxzfFxcLykqJC8sICcnKSk7XG4gIH0gZWxzZSBpZiAoL1xcc1xcL1xccz9cXGQ/JC8udGVzdCh2YWx1ZSkpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIHZhbHVlLnJlcGxhY2UoL1xcc1xcL1xccz9cXGQ/JC8sICcnKSk7XG4gIH1cbn07XG5cbnJlc3RyaWN0TnVtZXJpYyA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIGlucHV0O1xuICBpZiAoZS5tZXRhS2V5IHx8IGUuY3RybEtleSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmIChlLndoaWNoID09PSAzMikge1xuICAgIHJldHVybiBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH1cbiAgaWYgKGUud2hpY2ggPT09IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAoZS53aGljaCA8IDMzKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaW5wdXQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpO1xuICBpZiAoIS9bXFxkXFxzXS8udGVzdChpbnB1dCkpIHtcbiAgICByZXR1cm4gZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG59O1xuXG5yZXN0cmljdENhcmROdW1iZXIgPSBmdW5jdGlvbihlKSB7XG4gIHZhciBjYXJkLCBkaWdpdCwgdGFyZ2V0LCB2YWx1ZTtcbiAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gIGRpZ2l0ID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKTtcbiAgaWYgKCEvXlxcZCskLy50ZXN0KGRpZ2l0KSkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoaGFzVGV4dFNlbGVjdGVkKHRhcmdldCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFsdWUgPSAoUUoudmFsKHRhcmdldCkgKyBkaWdpdCkucmVwbGFjZSgvXFxEL2csICcnKTtcbiAgY2FyZCA9IGNhcmRGcm9tTnVtYmVyKHZhbHVlKTtcbiAgaWYgKGNhcmQpIHtcbiAgICBpZiAoISh2YWx1ZS5sZW5ndGggPD0gY2FyZC5sZW5ndGhbY2FyZC5sZW5ndGgubGVuZ3RoIC0gMV0pKSB7XG4gICAgICByZXR1cm4gZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoISh2YWx1ZS5sZW5ndGggPD0gMTYpKSB7XG4gICAgICByZXR1cm4gZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfVxufTtcblxucmVzdHJpY3RFeHBpcnkgPSBmdW5jdGlvbihlLCBsZW5ndGgpIHtcbiAgdmFyIGRpZ2l0LCB0YXJnZXQsIHZhbHVlO1xuICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgZGlnaXQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpO1xuICBpZiAoIS9eXFxkKyQvLnRlc3QoZGlnaXQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChoYXNUZXh0U2VsZWN0ZWQodGFyZ2V0KSkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YWx1ZSA9IFFKLnZhbCh0YXJnZXQpICsgZGlnaXQ7XG4gIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvXFxEL2csICcnKTtcbiAgaWYgKHZhbHVlLmxlbmd0aCA+IGxlbmd0aCkge1xuICAgIHJldHVybiBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH1cbn07XG5cbnJlc3RyaWN0Q29tYmluZWRFeHBpcnkgPSBmdW5jdGlvbihlKSB7XG4gIHJldHVybiByZXN0cmljdEV4cGlyeShlLCA2KTtcbn07XG5cbnJlc3RyaWN0TW9udGhFeHBpcnkgPSBmdW5jdGlvbihlKSB7XG4gIHJldHVybiByZXN0cmljdEV4cGlyeShlLCAyKTtcbn07XG5cbnJlc3RyaWN0WWVhckV4cGlyeSA9IGZ1bmN0aW9uKGUpIHtcbiAgcmV0dXJuIHJlc3RyaWN0RXhwaXJ5KGUsIDQpO1xufTtcblxucmVzdHJpY3RDVkMgPSBmdW5jdGlvbihlKSB7XG4gIHZhciBkaWdpdCwgdGFyZ2V0LCB2YWw7XG4gIHRhcmdldCA9IGUudGFyZ2V0O1xuICBkaWdpdCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZS53aGljaCk7XG4gIGlmICghL15cXGQrJC8udGVzdChkaWdpdCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGhhc1RleHRTZWxlY3RlZCh0YXJnZXQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhbCA9IFFKLnZhbCh0YXJnZXQpICsgZGlnaXQ7XG4gIGlmICghKHZhbC5sZW5ndGggPD0gNCkpIHtcbiAgICByZXR1cm4gZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG59O1xuXG5zZXRDYXJkVHlwZSA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIGFsbFR5cGVzLCBjYXJkLCBjYXJkVHlwZSwgdGFyZ2V0LCB2YWw7XG4gIHRhcmdldCA9IGUudGFyZ2V0O1xuICB2YWwgPSBRSi52YWwodGFyZ2V0KTtcbiAgY2FyZFR5cGUgPSBQYXltZW50LmZucy5jYXJkVHlwZSh2YWwpIHx8ICd1bmtub3duJztcbiAgaWYgKCFRSi5oYXNDbGFzcyh0YXJnZXQsIGNhcmRUeXBlKSkge1xuICAgIGFsbFR5cGVzID0gKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGksIGxlbiwgcmVzdWx0cztcbiAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgIGZvciAoaSA9IDAsIGxlbiA9IGNhcmRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGNhcmQgPSBjYXJkc1tpXTtcbiAgICAgICAgcmVzdWx0cy5wdXNoKGNhcmQudHlwZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9KSgpO1xuICAgIFFKLnJlbW92ZUNsYXNzKHRhcmdldCwgJ3Vua25vd24nKTtcbiAgICBRSi5yZW1vdmVDbGFzcyh0YXJnZXQsIGFsbFR5cGVzLmpvaW4oJyAnKSk7XG4gICAgUUouYWRkQ2xhc3ModGFyZ2V0LCBjYXJkVHlwZSk7XG4gICAgUUoudG9nZ2xlQ2xhc3ModGFyZ2V0LCAnaWRlbnRpZmllZCcsIGNhcmRUeXBlICE9PSAndW5rbm93bicpO1xuICAgIHJldHVybiBRSi50cmlnZ2VyKHRhcmdldCwgJ3BheW1lbnQuY2FyZFR5cGUnLCBjYXJkVHlwZSk7XG4gIH1cbn07XG5cblBheW1lbnQgPSAoZnVuY3Rpb24oKSB7XG4gIGZ1bmN0aW9uIFBheW1lbnQoKSB7fVxuXG4gIFBheW1lbnQuZm5zID0ge1xuICAgIGNhcmRFeHBpcnlWYWw6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICB2YXIgbW9udGgsIHByZWZpeCwgcmVmLCB5ZWFyO1xuICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9cXHMvZywgJycpO1xuICAgICAgcmVmID0gdmFsdWUuc3BsaXQoJy8nLCAyKSwgbW9udGggPSByZWZbMF0sIHllYXIgPSByZWZbMV07XG4gICAgICBpZiAoKHllYXIgIT0gbnVsbCA/IHllYXIubGVuZ3RoIDogdm9pZCAwKSA9PT0gMiAmJiAvXlxcZCskLy50ZXN0KHllYXIpKSB7XG4gICAgICAgIHByZWZpeCA9IChuZXcgRGF0ZSkuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgcHJlZml4ID0gcHJlZml4LnRvU3RyaW5nKCkuc2xpY2UoMCwgMik7XG4gICAgICAgIHllYXIgPSBwcmVmaXggKyB5ZWFyO1xuICAgICAgfVxuICAgICAgbW9udGggPSBwYXJzZUludChtb250aCwgMTApO1xuICAgICAgeWVhciA9IHBhcnNlSW50KHllYXIsIDEwKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG1vbnRoOiBtb250aCxcbiAgICAgICAgeWVhcjogeWVhclxuICAgICAgfTtcbiAgICB9LFxuICAgIHZhbGlkYXRlQ2FyZE51bWJlcjogZnVuY3Rpb24obnVtKSB7XG4gICAgICB2YXIgY2FyZCwgcmVmO1xuICAgICAgbnVtID0gKG51bSArICcnKS5yZXBsYWNlKC9cXHMrfC0vZywgJycpO1xuICAgICAgaWYgKCEvXlxcZCskLy50ZXN0KG51bSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgY2FyZCA9IGNhcmRGcm9tTnVtYmVyKG51bSk7XG4gICAgICBpZiAoIWNhcmQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIChyZWYgPSBudW0ubGVuZ3RoLCBpbmRleE9mLmNhbGwoY2FyZC5sZW5ndGgsIHJlZikgPj0gMCkgJiYgKGNhcmQubHVobiA9PT0gZmFsc2UgfHwgbHVobkNoZWNrKG51bSkpO1xuICAgIH0sXG4gICAgdmFsaWRhdGVDYXJkRXhwaXJ5OiBmdW5jdGlvbihtb250aCwgeWVhcikge1xuICAgICAgdmFyIGN1cnJlbnRUaW1lLCBleHBpcnksIHByZWZpeCwgcmVmO1xuICAgICAgaWYgKHR5cGVvZiBtb250aCA9PT0gJ29iamVjdCcgJiYgJ21vbnRoJyBpbiBtb250aCkge1xuICAgICAgICByZWYgPSBtb250aCwgbW9udGggPSByZWYubW9udGgsIHllYXIgPSByZWYueWVhcjtcbiAgICAgIH1cbiAgICAgIGlmICghKG1vbnRoICYmIHllYXIpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIG1vbnRoID0gUUoudHJpbShtb250aCk7XG4gICAgICB5ZWFyID0gUUoudHJpbSh5ZWFyKTtcbiAgICAgIGlmICghL15cXGQrJC8udGVzdChtb250aCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKCEvXlxcZCskLy50ZXN0KHllYXIpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICghKHBhcnNlSW50KG1vbnRoLCAxMCkgPD0gMTIpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICh5ZWFyLmxlbmd0aCA9PT0gMikge1xuICAgICAgICBwcmVmaXggPSAobmV3IERhdGUpLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgIHByZWZpeCA9IHByZWZpeC50b1N0cmluZygpLnNsaWNlKDAsIDIpO1xuICAgICAgICB5ZWFyID0gcHJlZml4ICsgeWVhcjtcbiAgICAgIH1cbiAgICAgIGV4cGlyeSA9IG5ldyBEYXRlKHllYXIsIG1vbnRoKTtcbiAgICAgIGN1cnJlbnRUaW1lID0gbmV3IERhdGU7XG4gICAgICBleHBpcnkuc2V0TW9udGgoZXhwaXJ5LmdldE1vbnRoKCkgLSAxKTtcbiAgICAgIGV4cGlyeS5zZXRNb250aChleHBpcnkuZ2V0TW9udGgoKSArIDEsIDEpO1xuICAgICAgcmV0dXJuIGV4cGlyeSA+IGN1cnJlbnRUaW1lO1xuICAgIH0sXG4gICAgdmFsaWRhdGVDYXJkQ1ZDOiBmdW5jdGlvbihjdmMsIHR5cGUpIHtcbiAgICAgIHZhciByZWYsIHJlZjE7XG4gICAgICBjdmMgPSBRSi50cmltKGN2Yyk7XG4gICAgICBpZiAoIS9eXFxkKyQvLnRlc3QoY3ZjKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAodHlwZSAmJiBjYXJkRnJvbVR5cGUodHlwZSkpIHtcbiAgICAgICAgcmV0dXJuIHJlZiA9IGN2Yy5sZW5ndGgsIGluZGV4T2YuY2FsbCgocmVmMSA9IGNhcmRGcm9tVHlwZSh0eXBlKSkgIT0gbnVsbCA/IHJlZjEuY3ZjTGVuZ3RoIDogdm9pZCAwLCByZWYpID49IDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gY3ZjLmxlbmd0aCA+PSAzICYmIGN2Yy5sZW5ndGggPD0gNDtcbiAgICAgIH1cbiAgICB9LFxuICAgIGNhcmRUeXBlOiBmdW5jdGlvbihudW0pIHtcbiAgICAgIHZhciByZWY7XG4gICAgICBpZiAoIW51bSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIHJldHVybiAoKHJlZiA9IGNhcmRGcm9tTnVtYmVyKG51bSkpICE9IG51bGwgPyByZWYudHlwZSA6IHZvaWQgMCkgfHwgbnVsbDtcbiAgICB9LFxuICAgIGZvcm1hdENhcmROdW1iZXI6IGZ1bmN0aW9uKG51bSkge1xuICAgICAgdmFyIGNhcmQsIGdyb3VwcywgcmVmLCB1cHBlckxlbmd0aDtcbiAgICAgIGNhcmQgPSBjYXJkRnJvbU51bWJlcihudW0pO1xuICAgICAgaWYgKCFjYXJkKSB7XG4gICAgICAgIHJldHVybiBudW07XG4gICAgICB9XG4gICAgICB1cHBlckxlbmd0aCA9IGNhcmQubGVuZ3RoW2NhcmQubGVuZ3RoLmxlbmd0aCAtIDFdO1xuICAgICAgbnVtID0gbnVtLnJlcGxhY2UoL1xcRC9nLCAnJyk7XG4gICAgICBudW0gPSBudW0uc2xpY2UoMCwgK3VwcGVyTGVuZ3RoICsgMSB8fCA5ZTkpO1xuICAgICAgaWYgKGNhcmQuZm9ybWF0Lmdsb2JhbCkge1xuICAgICAgICByZXR1cm4gKHJlZiA9IG51bS5tYXRjaChjYXJkLmZvcm1hdCkpICE9IG51bGwgPyByZWYuam9pbignICcpIDogdm9pZCAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZ3JvdXBzID0gY2FyZC5mb3JtYXQuZXhlYyhudW0pO1xuICAgICAgICBpZiAoZ3JvdXBzICE9IG51bGwpIHtcbiAgICAgICAgICBncm91cHMuc2hpZnQoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZ3JvdXBzICE9IG51bGwgPyBncm91cHMuam9pbignICcpIDogdm9pZCAwO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBQYXltZW50LnJlc3RyaWN0TnVtZXJpYyA9IGZ1bmN0aW9uKGVsKSB7XG4gICAgcmV0dXJuIFFKLm9uKGVsLCAna2V5cHJlc3MnLCByZXN0cmljdE51bWVyaWMpO1xuICB9O1xuXG4gIFBheW1lbnQuY2FyZEV4cGlyeVZhbCA9IGZ1bmN0aW9uKGVsKSB7XG4gICAgcmV0dXJuIFBheW1lbnQuZm5zLmNhcmRFeHBpcnlWYWwoUUoudmFsKGVsKSk7XG4gIH07XG5cbiAgUGF5bWVudC5mb3JtYXRDYXJkQ1ZDID0gZnVuY3Rpb24oZWwpIHtcbiAgICBQYXltZW50LnJlc3RyaWN0TnVtZXJpYyhlbCk7XG4gICAgUUoub24oZWwsICdrZXlwcmVzcycsIHJlc3RyaWN0Q1ZDKTtcbiAgICByZXR1cm4gZWw7XG4gIH07XG5cbiAgUGF5bWVudC5mb3JtYXRDYXJkRXhwaXJ5ID0gZnVuY3Rpb24oZWwpIHtcbiAgICB2YXIgbW9udGgsIHllYXI7XG4gICAgUGF5bWVudC5yZXN0cmljdE51bWVyaWMoZWwpO1xuICAgIGlmIChlbC5sZW5ndGggJiYgZWwubGVuZ3RoID09PSAyKSB7XG4gICAgICBtb250aCA9IGVsWzBdLCB5ZWFyID0gZWxbMV07XG4gICAgICB0aGlzLmZvcm1hdENhcmRFeHBpcnlNdWx0aXBsZShtb250aCwgeWVhcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIFFKLm9uKGVsLCAna2V5cHJlc3MnLCByZXN0cmljdENvbWJpbmVkRXhwaXJ5KTtcbiAgICAgIFFKLm9uKGVsLCAna2V5cHJlc3MnLCBmb3JtYXRFeHBpcnkpO1xuICAgICAgUUoub24oZWwsICdrZXlwcmVzcycsIGZvcm1hdEZvcndhcmRTbGFzaCk7XG4gICAgICBRSi5vbihlbCwgJ2tleXByZXNzJywgZm9ybWF0Rm9yd2FyZEV4cGlyeSk7XG4gICAgICBRSi5vbihlbCwgJ2tleWRvd24nLCBmb3JtYXRCYWNrRXhwaXJ5KTtcbiAgICB9XG4gICAgcmV0dXJuIGVsO1xuICB9O1xuXG4gIFBheW1lbnQuZm9ybWF0Q2FyZEV4cGlyeU11bHRpcGxlID0gZnVuY3Rpb24obW9udGgsIHllYXIpIHtcbiAgICBRSi5vbihtb250aCwgJ2tleXByZXNzJywgcmVzdHJpY3RNb250aEV4cGlyeSk7XG4gICAgUUoub24obW9udGgsICdrZXlwcmVzcycsIGZvcm1hdE1vbnRoRXhwaXJ5KTtcbiAgICByZXR1cm4gUUoub24oeWVhciwgJ2tleXByZXNzJywgcmVzdHJpY3RZZWFyRXhwaXJ5KTtcbiAgfTtcblxuICBQYXltZW50LmZvcm1hdENhcmROdW1iZXIgPSBmdW5jdGlvbihlbCkge1xuICAgIFBheW1lbnQucmVzdHJpY3ROdW1lcmljKGVsKTtcbiAgICBRSi5vbihlbCwgJ2tleXByZXNzJywgcmVzdHJpY3RDYXJkTnVtYmVyKTtcbiAgICBRSi5vbihlbCwgJ2tleXByZXNzJywgZm9ybWF0Q2FyZE51bWJlcik7XG4gICAgUUoub24oZWwsICdrZXlkb3duJywgZm9ybWF0QmFja0NhcmROdW1iZXIpO1xuICAgIFFKLm9uKGVsLCAna2V5dXAnLCBzZXRDYXJkVHlwZSk7XG4gICAgUUoub24oZWwsICdwYXN0ZScsIHJlRm9ybWF0Q2FyZE51bWJlcik7XG4gICAgcmV0dXJuIGVsO1xuICB9O1xuXG4gIFBheW1lbnQuZ2V0Q2FyZEFycmF5ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGNhcmRzO1xuICB9O1xuXG4gIFBheW1lbnQuc2V0Q2FyZEFycmF5ID0gZnVuY3Rpb24oY2FyZEFycmF5KSB7XG4gICAgY2FyZHMgPSBjYXJkQXJyYXk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgUGF5bWVudC5hZGRUb0NhcmRBcnJheSA9IGZ1bmN0aW9uKGNhcmRPYmplY3QpIHtcbiAgICByZXR1cm4gY2FyZHMucHVzaChjYXJkT2JqZWN0KTtcbiAgfTtcblxuICBQYXltZW50LnJlbW92ZUZyb21DYXJkQXJyYXkgPSBmdW5jdGlvbih0eXBlKSB7XG4gICAgdmFyIGtleSwgdmFsdWU7XG4gICAgZm9yIChrZXkgaW4gY2FyZHMpIHtcbiAgICAgIHZhbHVlID0gY2FyZHNba2V5XTtcbiAgICAgIGlmICh2YWx1ZS50eXBlID09PSB0eXBlKSB7XG4gICAgICAgIGNhcmRzLnNwbGljZShrZXksIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICByZXR1cm4gUGF5bWVudDtcblxufSkoKTtcblxubW9kdWxlLmV4cG9ydHMgPSBQYXltZW50O1xuXG5nbG9iYWwuUGF5bWVudCA9IFBheW1lbnQ7XG5cblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG59LHtcInFqL3NyYy9xai5jb2ZmZWVcIjoxfV19LHt9LFsyXSkoMilcbn0pOyIsIi8vIE1pbm5Qb3N0IEdpdmluZyBwbHVnaW5cbi8vIHRoZSBzZW1pLWNvbG9uIGJlZm9yZSBmdW5jdGlvbiBpbnZvY2F0aW9uIGlzIGEgc2FmZXR5IG5ldCBhZ2FpbnN0IGNvbmNhdGVuYXRlZFxuLy8gc2NyaXB0cyBhbmQvb3Igb3RoZXIgcGx1Z2lucyB3aGljaCBtYXkgbm90IGJlIGNsb3NlZCBwcm9wZXJseS5cbjsoZnVuY3Rpb24gKCAkLCB3aW5kb3csIGRvY3VtZW50LCB1bmRlZmluZWQgKSB7XG5cbiAgLy8gdW5kZWZpbmVkIGlzIHVzZWQgaGVyZSBhcyB0aGUgdW5kZWZpbmVkIGdsb2JhbCB2YXJpYWJsZSBpbiBFQ01BU2NyaXB0IDMgaXNcbiAgLy8gbXV0YWJsZSAoaWUuIGl0IGNhbiBiZSBjaGFuZ2VkIGJ5IHNvbWVvbmUgZWxzZSkuIHVuZGVmaW5lZCBpc24ndCByZWFsbHkgYmVpbmdcbiAgLy8gcGFzc2VkIGluIHNvIHdlIGNhbiBlbnN1cmUgdGhlIHZhbHVlIG9mIGl0IGlzIHRydWx5IHVuZGVmaW5lZC4gSW4gRVM1LCB1bmRlZmluZWRcbiAgLy8gY2FuIG5vIGxvbmdlciBiZSBtb2RpZmllZC5cblxuICAvLyB3aW5kb3cgYW5kIGRvY3VtZW50IGFyZSBwYXNzZWQgdGhyb3VnaCBhcyBsb2NhbCB2YXJpYWJsZSByYXRoZXIgdGhhbiBnbG9iYWxcbiAgLy8gYXMgdGhpcyAoc2xpZ2h0bHkpIHF1aWNrZW5zIHRoZSByZXNvbHV0aW9uIHByb2Nlc3MgYW5kIGNhbiBiZSBtb3JlIGVmZmljaWVudGx5XG4gIC8vIG1pbmlmaWVkIChlc3BlY2lhbGx5IHdoZW4gYm90aCBhcmUgcmVndWxhcmx5IHJlZmVyZW5jZWQgaW4geW91ciBwbHVnaW4pLlxuXG4gIC8vIENyZWF0ZSB0aGUgZGVmYXVsdHMgb25jZVxuICB2YXIgcGx1Z2luTmFtZSA9ICdtaW5ucG9zdF9naXZpbmcnLFxuICBkZWZhdWx0cyA9IHtcbiAgICAnZGVidWcnIDogZmFsc2UsIC8vIHRoaXMgY2FuIGJlIHNldCB0byB0cnVlIG9uIHBhZ2UgbGV2ZWwgb3B0aW9uc1xuICAgICdzdHJpcGVfcHVibGlzaGFibGVfa2V5JyA6ICcnLFxuICAgICdwbGFpZF9lbnYnIDogJycsXG4gICAgJ3BsYWlkX3B1YmxpY19rZXknIDogJycsXG4gICAgJ3BsYWlkX2xpbmsnIDogJyNhdXRob3JpemUtYWNoJyxcbiAgICAnbWlubnBvc3Rfcm9vdCcgOiAnaHR0cHM6Ly93d3cubWlubnBvc3QuY29tJyxcbiAgICAnZG9uYXRlX2Zvcm1fc2VsZWN0b3InOiAnI2RvbmF0ZScsXG4gICAgJ2RvbmF0ZV9zdGVwX3NlbGVjdG9yJyA6ICcjcGFuZWwtLXBheScsXG4gICAgJ2NvbmZpcm1fZm9ybV9zZWxlY3RvcicgOiAnI2NvbmZpcm0nLFxuICAgICdjb25maXJtX3N0ZXBfc2VsZWN0b3InIDogJyNwYW5lbC0tY29uZmlybWF0aW9uJyxcbiAgICAnYWN0aXZlJyA6ICdwYW5lbC0tcGF5JyxcbiAgICAnY29uZmlybScgOiAncGFuZWwtLWNvbmZpcm1hdGlvbicsXG4gICAgJ3F1ZXJ5JyA6ICdzdGVwJyxcbiAgICAncGF5X2NjX3Byb2Nlc3Npbmdfc2VsZWN0b3InIDogJ2lucHV0W2lkPVwicGF5LWZlZXNcIl0nLFxuICAgICdmZWVfYW1vdW50JyA6ICcucHJvY2Vzc2luZy1hbW91bnQnLFxuICAgICdsZXZlbF9hbW91bnRfc2VsZWN0b3InIDogJyNwYW5lbC0tcGF5IC5hbW91bnQgLmxldmVsLWFtb3VudCcsIC8vIHdlIGNhbiBtYXliZSBnZXQgcmlkIG9mIHRoaXNcbiAgICAnb3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yJyA6ICdbbmFtZT1cImFtb3VudFwiXScsXG4gICAgJ2ludGVudF9zZWNyZXRfc2VsZWN0b3InIDogJyNpbnRlbnQnLFxuICAgICdmYWlyX21hcmtldF92YWx1ZV9zZWxlY3RvcicgOiAnI2ZhaXJfbWFya2V0X3ZhbHVlJyxcbiAgICAnZnJlcXVlbmN5X3NlbGVjdG9yJyA6ICcuZnJlcXVlbmN5JyxcbiAgICAnZnVsbF9hbW91bnRfc2VsZWN0b3InIDogJy5mdWxsLWFtb3VudCcsXG4gICAgJ25hbWVfc2VsZWN0b3InIDogJy5mb3JtLWl0ZW0tLWRpc3BsYXktbmFtZScsXG4gICAgJ2luX2hvbm9yX29yX21lbW9yeV9maWVsZF9zZWxlY3RvcicgOiAnLmZvcm0taXRlbS0taG9ub3ItbWVtb3J5JyxcbiAgICAnaG9ub3Jfb3JfbWVtb3J5X2Nob29zZXInIDogJ2lucHV0W25hbWU9XCJpbl9ob25vcl9vcl9tZW1vcnlcIl0nLCAvLyByYWRpbyBmaWVsZHNcbiAgICAnaG9ub3JfdHlwZV9zZWxlY3RvcicgOiAnLmhvbm9yX3R5cGUnLCAvLyBzcGFuIGluc2lkZSBsYWJlbFxuICAgICdob25vcl9tZW1vcnlfaW5wdXRfZ3JvdXAnIDogJy5ob25vci1vci1tZW1vcnknLCAvLyBob2xkcyB0aGUgZm9ybSBmaWVsZFxuICAgICdub3RpZnlfc2VsZWN0b3InIDogJy5ub3RpZnlfc29tZW9uZScsXG4gICAgJ25vdGlmeV9maWVsZF9zZWxlY3RvcicgOiAnLmZvcm0taXRlbS0tbm90aWZ5JyxcbiAgICAnYW5vbnltb3VzX3NlbGVjdG9yJyA6ICcjYW5vbnltb3VzJyxcbiAgICAnc2hvd19iaWxsaW5nX2NvdW50cnlfc2VsZWN0b3InIDogJyNiaWxsaW5nX3Nob3dfY291bnRyeScsXG4gICAgJ2JpbGxpbmdfY291bnRyeV9zZWxlY3RvcicgOiAnLmZvcm0taXRlbS0tY291bnRyeScsXG4gICAgJ3Nob3dfc2hpcHBpbmdfY291bnRyeV9zZWxlY3RvcicgOiAnI3NoaXBwaW5nX3Nob3dfY291bnRyeScsXG4gICAgJ3NoaXBwaW5nX2NvdW50cnlfc2VsZWN0b3InIDogJy5mb3JtLWl0ZW0tLXNoaXBwaW5nLWNvdW50cnknLFxuICAgICdzaGlwcGluZ19hZGRyZXNzX3NlbGVjdG9yJyA6ICcuZm9ybS1pdGVtLS1zaGlwcGluZy1hZGRyZXNzJyxcbiAgICAndXNlX2Zvcl9zaGlwcGluZ19zZWxlY3RvcicgOiAnI3VzZWZvcnNoaXBwaW5nJyxcbiAgICAnZW1haWxfZmllbGRfc2VsZWN0b3InIDogJyNlbWFpbCcsXG4gICAgJ3Bhc3N3b3JkX2ZpZWxkX3NlbGVjdG9yJyA6ICcjcGFzc3dvcmQnLFxuICAgICdmaXJzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yJyA6ICcjZmlyc3RfbmFtZScsXG4gICAgJ2xhc3RfbmFtZV9maWVsZF9zZWxlY3RvcicgOiAnI2xhc3RfbmFtZScsXG4gICAgJ2FjY291bnRfY2l0eV9zZWxlY3RvcicgOiAnI2JpbGxpbmdfY2l0eScsXG4gICAgJ2FjY291bnRfc3RhdGVfc2VsZWN0b3InIDogJyNiaWxsaW5nX3N0YXRlJyxcbiAgICAnYWNjb3VudF96aXBfc2VsZWN0b3InIDogJyNiaWxsaW5nX3ppcCcsXG4gICAgJ2NyZWF0ZV9tcF9zZWxlY3RvcicgOiAnI2NyZWF0ZW1wYWNjb3VudCcsXG4gICAgJ3Bhc3N3b3JkX3NlbGVjdG9yJyA6ICcuZm9ybS1pdGVtLS1wYXNzd29yZCcsXG4gICAgJ2FkZGl0aW9uYWxfYW1vdW50X2ZpZWxkJyA6ICcjYWRkaXRpb25hbF9kb25hdGlvbicsXG4gICAgJ2JpbGxpbmdfc2VsZWN0b3InIDogJ2ZpZWxkc2V0LmJpbGxpbmcnLFxuICAgICdzaGlwcGluZ19zZWxlY3RvcicgOiAnZmllbGRzZXQuc2hpcHBpbmcnLFxuICAgICdjcmVkaXRfY2FyZF9maWVsZHNldCcgOiAnLnBheW1lbnQtbWV0aG9kLWdyb3VwJyxcbiAgICAnY2hvb3NlX3BheW1lbnQnIDogJyNjaG9vc2UtcGF5bWVudC1tZXRob2QnLFxuICAgICdwYXltZW50X21ldGhvZF9zZWxlY3RvcicgOiAnLnBheW1lbnQtbWV0aG9kJyxcbiAgICAnY2NfbnVtX3NlbGVjdG9yJyA6ICcjY2FyZC1udW1iZXInLFxuICAgICdjY19leHBfc2VsZWN0b3InIDogJyNjYXJkLWV4cGlyeScsXG4gICAgJ2NjX2N2dl9zZWxlY3RvcicgOiAnI2NhcmQtY3ZjJyxcbiAgICAncGF5bWVudF9idXR0b25fc2VsZWN0b3InIDogJyNzdWJtaXQnLFxuICAgICdjb25maXJtX2J1dHRvbl9zZWxlY3RvcicgOiAnI2ZpbmlzaCcsXG4gICAgJ29wcF9pZF9zZWxlY3RvcicgOiAnI2xvY2tfa2V5JywgLy8gd2UgdXNlIHRoaXMgdmFsdWUgYXMgdGhlIEdvb2dsZSBBbmFseXRpY3MgdHJhbnNhY3Rpb24gSURcbiAgICAncmVjdXJyaW5nX3NlbGVjdG9yJyA6ICcjcmVjdXJyaW5nJyxcbiAgICAnbmV3c2xldHRlcl9ncm91cF9zZWxlY3RvcicgOiAnLnN1cHBvcnQtbmV3c2xldHRlcnMnLFxuICAgICdyZWFzb25fZmllbGRfc2VsZWN0b3InIDogJyNyZWFzb25fZm9yX3N1cHBvcnRpbmcnLFxuICAgICdzaGFyZV9yZWFzb25fc2VsZWN0b3InIDogJyNyZWFzb25fc2hhcmVhYmxlJyxcbiAgICAnY29uZmlybV90b3Bfc2VsZWN0b3InIDogJy5zdXBwb3J0LS1wb3N0LWNvbmZpcm0nLFxuICAgICdleGlzdGluZ19uZXdzbGV0dGVyX3NldHRpbmdzJyA6ICcnLFxuICAgICdsZXZlbHMnIDoge1xuICAgICAgMSA6IHtcbiAgICAgICAgJ25hbWUnIDogJ2Jyb256ZScsXG4gICAgICAgICdtYXgnIDogNjBcbiAgICAgIH0sXG4gICAgICAyIDoge1xuICAgICAgICAnbmFtZScgOiAnc2lsdmVyJyxcbiAgICAgICAgJ21pbicgOiA2MCxcbiAgICAgICAgJ21heCcgOiAxMjBcbiAgICAgIH0sXG4gICAgICAzIDoge1xuICAgICAgICAnbmFtZScgOiAnZ29sZCcsXG4gICAgICAgICdtaW4nIDogMTIwLFxuICAgICAgICAnbWF4JyA6IDI0MFxuICAgICAgfSxcbiAgICAgIDQgOiB7XG4gICAgICAgICduYW1lJyA6ICdwbGF0aW51bScsXG4gICAgICAgICdtaW4nIDogMjQwXG4gICAgICB9XG4gICAgfVxuXG4gIH07IC8vIGVuZCBkZWZhdWx0c1xuXG4gIC8vIFRoZSBhY3R1YWwgcGx1Z2luIGNvbnN0cnVjdG9yXG4gIGZ1bmN0aW9uIFBsdWdpbiggZWxlbWVudCwgb3B0aW9ucyApIHtcblxuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG5cbiAgICAvLyBqUXVlcnkgaGFzIGFuIGV4dGVuZCBtZXRob2Qgd2hpY2ggbWVyZ2VzIHRoZSBjb250ZW50cyBvZiB0d28gb3JcbiAgICAvLyBtb3JlIG9iamVjdHMsIHN0b3JpbmcgdGhlIHJlc3VsdCBpbiB0aGUgZmlyc3Qgb2JqZWN0LiBUaGUgZmlyc3Qgb2JqZWN0XG4gICAgLy8gaXMgZ2VuZXJhbGx5IGVtcHR5IGFzIHdlIGRvbid0IHdhbnQgdG8gYWx0ZXIgdGhlIGRlZmF1bHQgb3B0aW9ucyBmb3JcbiAgICAvLyBmdXR1cmUgaW5zdGFuY2VzIG9mIHRoZSBwbHVnaW5cbiAgICB0aGlzLm9wdGlvbnMgPSAkLmV4dGVuZCgge30sIGRlZmF1bHRzLCBvcHRpb25zICk7XG5cbiAgICB0aGlzLl9kZWZhdWx0cyA9IGRlZmF1bHRzO1xuICAgIHRoaXMuX25hbWUgPSBwbHVnaW5OYW1lO1xuXG4gICAgdGhpcy5pbml0KCk7XG4gIH0gLy8gZW5kIGNvbnN0cnVjdG9yXG5cbiAgUGx1Z2luLnByb3RvdHlwZSA9IHtcblxuICAgIGluaXQ6IGZ1bmN0aW9uKHJlc2V0LCBhbW91bnQpIHtcblxuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCAnbm8tanMnICk7XG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoICdqcycgKTtcblxuICAgICAgLy8gUGxhY2UgaW5pdGlhbGl6YXRpb24gbG9naWMgaGVyZVxuICAgICAgLy8gWW91IGFscmVhZHkgaGF2ZSBhY2Nlc3MgdG8gdGhlIERPTSBlbGVtZW50IGFuZFxuICAgICAgLy8gdGhlIG9wdGlvbnMgdmlhIHRoZSBpbnN0YW5jZSwgZS5nLiB0aGlzLmVsZW1lbnRcbiAgICAgIC8vIGFuZCB0aGlzLm9wdGlvbnNcbiAgICAgIC8vIHlvdSBjYW4gYWRkIG1vcmUgZnVuY3Rpb25zIGxpa2UgdGhlIG9uZSBiZWxvdyBhbmRcbiAgICAgIC8vIGNhbGwgdGhlbSBsaWtlIHNvOiB0aGlzLnlvdXJPdGhlckZ1bmN0aW9uKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKS5cblxuICAgICAgLy8gbW9kaWZ5IG9wdGlvbnMgYXMgbmVlZGVkXG4gICAgICAvL3ZhciB0aGlzLm9wdGlvbnMuYW1vdW50ID0gJyc7XG4gICAgICBpZiAocmVzZXQgIT09IHRydWUpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLmFtb3VudCA9IHBhcnNlRmxvYXQoJCh0aGlzLm9wdGlvbnMubGV2ZWxfYW1vdW50X3NlbGVjdG9yLCB0aGlzLmVsZW1lbnQpLnRleHQoKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm9wdGlvbnMuYW1vdW50ID0gYW1vdW50O1xuICAgICAgfVxuICAgICAgdGhpcy5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCA9IHBhcnNlSW50KCQodGhpcy5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudF9zZWxlY3RvciwgdGhpcy5lbGVtZW50KS52YWwoKSwgMTApO1xuICAgICAgdGhpcy5vcHRpb25zLmZyZXF1ZW5jeSA9IHBhcnNlRmxvYXQoJCh0aGlzLm9wdGlvbnMuZnJlcXVlbmN5X3NlbGVjdG9yLCB0aGlzLmVsZW1lbnQpLmF0dHIoJ2RhdGEteWVhci1mcmVxJykpO1xuICAgICAgdmFyIHJlY3VycmluZyA9ICQodGhpcy5vcHRpb25zLnJlY3VycmluZ19zZWxlY3RvciwgdGhpcy5lbGVtZW50KS52YWwoKTtcbiAgICAgIGlmICh0eXBlb2YgcmVjdXJyaW5nICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aGlzLm9wdGlvbnMucmVjdXJyaW5nID0gcmVjdXJyaW5nLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgcmVjdXJyaW5nLnNsaWNlKDEpO1xuICAgICAgfVxuICAgICAgXG4gICAgICB0aGlzLm9wdGlvbnMucHJvY2Vzc2luZ19mZWUgPSAoTWF0aC5yb3VuZChwYXJzZUZsb2F0KHRoaXMub3B0aW9ucy5mZWVfYW1vdW50KSpNYXRoLnBvdygxMCwyKSkvTWF0aC5wb3coMTAsMikpLnRvRml4ZWQoMik7XG4gICAgICB0aGlzLm9wdGlvbnMucHJvY2Vzc2luZ19mZWVfdGV4dCA9IHRoaXMub3B0aW9ucy5wcm9jZXNzaW5nX2ZlZTtcbiAgICAgIFxuICAgICAgdGhpcy5vcHRpb25zLmNhcmRUeXBlID0gbnVsbDtcbiAgICAgIHRoaXMub3B0aW9ucy5jcmVhdGVfYWNjb3VudCA9IGZhbHNlO1xuXG4gICAgICB2YXIgYnV0dG9uX3RleHQgPSAkKCdidXR0b24uZ2l2ZSwgaW5wdXQuZ2l2ZScpLnRleHQoKTtcbiAgICAgIHRoaXMub3B0aW9ucy5idXR0b25fdGV4dCA9IGJ1dHRvbl90ZXh0O1xuXG4gICAgICB0aGlzLnN0cmlwZSA9IFN0cmlwZSh0aGlzLm9wdGlvbnMuc3RyaXBlX3B1Ymxpc2hhYmxlX2tleSk7XG4gICAgICB0aGlzLmVsZW1lbnRzID0gdGhpcy5zdHJpcGUuZWxlbWVudHMoKTtcblxuICAgICAgLy8gdXNlIGEgcmVmZXJyZXIgZm9yIGVkaXQgbGluayBpZiB3ZSBoYXZlIG9uZVxuICAgICAgaWYgKGRvY3VtZW50LnJlZmVycmVyICE9PSAnJykge1xuICAgICAgICAkKCcjZWRpdF91cmwnKS5wcm9wKCdocmVmJywgZG9jdW1lbnQucmVmZXJyZXIpO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5vcHRpb25zLmRlYnVnID09PSB0cnVlKSB7XG4gICAgICAgIHRoaXMuZGVidWcodGhpcy5vcHRpb25zKTtcbiAgICAgICAgLy8gcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyB0YWIgc3R1ZmZcbiAgICAgIHZhciBxdWVyeV9wYW5lbCA9IHRoaXMucXNbdGhpcy5vcHRpb25zLnF1ZXJ5XTtcbiAgICAgIGlmICh0eXBlb2YgcXVlcnlfcGFuZWwgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHF1ZXJ5X3BhbmVsID0gdGhpcy5vcHRpb25zLmFjdGl2ZTtcbiAgICAgIH1cblxuICAgICAgLy8gY2FsbCBmdW5jdGlvbnNcblxuICAgICAgdGhpcy50YWJOYXZpZ2F0aW9uKHF1ZXJ5X3BhbmVsKTsgLy8gbmF2aWdhdGluZ1xuXG4gICAgICB0aGlzLmFtb3VudEFzUmFkaW8odGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBpZiB0aGUgYW1vdW50IGZpZWxkIGlzIGEgcmFkaW8gYnV0dG9uXG4gICAgICB0aGlzLmFtb3VudFVwZGF0ZWQodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBpZiB0aGUgYW1vdW50IHRleHQgZmllbGQgY2FuIGNoYW5nZVxuXG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMucGF5X2NjX3Byb2Nlc3Npbmdfc2VsZWN0b3IpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5jcmVkaXRDYXJkUHJvY2Vzc2luZ0ZlZXModGhpcy5vcHRpb25zLCByZXNldCk7IC8vIHByb2Nlc3NpbmcgZmVlc1xuICAgICAgfVxuICAgICAgXG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuZG9uYXRlX3N0ZXBfc2VsZWN0b3IpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLmxldmVsID0gdGhpcy5jaGVja0xldmVsKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zLCAnbmFtZScpOyAvLyBjaGVjayB3aGF0IGxldmVsIGl0IGlzXG4gICAgICAgIHRoaXMub3B0aW9ucy5sZXZlbG51bSA9IHRoaXMuY2hlY2tMZXZlbCh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucywgJ251bScpOyAvLyBjaGVjayB3aGF0IGxldmVsIGl0IGlzIGFzIGEgbnVtYmVyXG4gICAgICAgIHRoaXMuZG9uYXRlQW5vbnltb3VzbHkodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBhbm9ueW1vdXNcbiAgICAgICAgdGhpcy5ob25vck9yTWVtb3J5VG9nZ2xlKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gaW4gaG9ub3Igb3IgaW4gbWVtb3J5IG9mIHNvbWVvbmVcbiAgICAgICAgdGhpcy5vdXRzaWRlVW5pdGVkU3RhdGVzKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gb3V0c2lkZSBVU1xuICAgICAgICB0aGlzLnNoaXBwaW5nQWRkcmVzcyh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIHNoaXBwaW5nIGFkZHJlc3NcbiAgICAgICAgdGhpcy5hbGxvd01pbm5wb3N0QWNjb3VudCh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucywgZmFsc2UpOyAvLyBvcHRpb24gZm9yIGNyZWF0aW5nIG1pbm5wb3N0IGFjY291bnRcbiAgICAgICAgdGhpcy5jaG9vc2VQYXltZW50TWV0aG9kKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gc3dpdGNoIGJldHdlZW4gY2FyZCBhbmQgYWNoXG4gICAgICAgIHRoaXMuY3JlZGl0Q2FyZEZpZWxkcyh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIGRvIHN0dWZmIHdpdGggdGhlIGNyZWRpdCBjYXJkIGZpZWxkc1xuICAgICAgICB0aGlzLmFjaEZpZWxkcyh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIGRvIHN0dWZmIGZvciBhY2ggcGF5bWVudHMsIGlmIGFwcGxpY2FibGUgdG8gdGhlIGZvcm1cbiAgICAgICAgdGhpcy52YWxpZGF0ZUFuZFN1Ym1pdCh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIHZhbGlkYXRlIGFuZCBzdWJtaXQgdGhlIGZvcm1cbiAgICAgIH1cblxuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmNvbmZpcm1fc3RlcF9zZWxlY3RvcikubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLnNob3dOZXdzbGV0dGVyU2V0dGluZ3ModGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpO1xuICAgICAgICB0aGlzLmNvbmZpcm1NZXNzYWdlU3VibWl0KHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gc3VibWl0IHRoZSBzdHVmZiBvbiB0aGUgY29uZmlybWF0aW9uIHBhZ2VcbiAgICAgIH1cblxuICAgIH0sIC8vIGluaXRcblxuICAgIHFzOiAoZnVuY3Rpb24oYSkge1xuICAgICAgaWYgKGEgPT09ICcnKSB7XG4gICAgICAgIHJldHVybiB7fTtcbiAgICAgIH1cbiAgICAgIHZhciBiID0ge307XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGEubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIHA9YVtpXS5zcGxpdCgnPScsIDIpO1xuICAgICAgICBpZiAocC5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICBiW3BbMF1dID0gJyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYltwWzBdXSA9IGRlY29kZVVSSUNvbXBvbmVudChwWzFdLnJlcGxhY2UoL1xcKy9nLCAnICcpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGI7XG4gICAgfSkod2luZG93LmxvY2F0aW9uLnNlYXJjaC5zdWJzdHIoMSkuc3BsaXQoJyYnKSksXG5cbiAgICBkZWJ1ZzogZnVuY3Rpb24obWVzc2FnZSkge1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5kZWJ1ZyA9PT0gdHJ1ZSkge1xuICAgICAgICBpZiAodHlwZW9mIG1lc3NhZ2UgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgY29uc29sZS5sb2cobWVzc2FnZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5kaXIobWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5kaXIodGhpcyk7XG4gICAgICB9XG4gICAgfSwgLy8gZGVidWdcblxuICAgIGdldFF1ZXJ5U3RyaW5nczogZnVuY3Rpb24obGluaykge1xuICAgICAgaWYgKHR5cGVvZiBsaW5rID09PSAndW5kZWZpbmVkJyB8fCBsaW5rID09PSAnJykge1xuICAgICAgICByZXR1cm4ge307XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsaW5rID0gJz8nICsgbGluay5zcGxpdCgnPycpWzFdO1xuICAgICAgICBsaW5rID0gbGluay5zdWJzdHIoMSkuc3BsaXQoJyYnKTtcbiAgICAgIH1cbiAgICAgIHZhciBiID0ge307XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpbmsubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIHA9bGlua1tpXS5zcGxpdCgnPScsIDIpO1xuICAgICAgICBpZiAocC5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICBiW3BbMF1dID0gJyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYltwWzBdXSA9IGRlY29kZVVSSUNvbXBvbmVudChwWzFdLnJlcGxhY2UoL1xcKy9nLCAnICcpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGI7XG4gICAgfSwgLy8gZ2V0UXVlcnlTdHJpbmdzXG5cbiAgICB0YWJOYXZpZ2F0aW9uOiBmdW5jdGlvbihhY3RpdmUpIHtcbiAgICAgIHZhciBzdGVwID0gJCgnLnByb2dyZXNzLS1kb25hdGlvbiBsaS4nICsgYWN0aXZlKS5pbmRleCgpICsgMTtcbiAgICAgIHZhciBuYXZfaXRlbV9jb3VudCA9ICQoJy5wcm9ncmVzcy0tZG9uYXRpb24gbGknKS5sZW5ndGg7XG4gICAgICB2YXIgb3BwX2lkID0gJCh0aGlzLm9wdGlvbnMub3BwX2lkX3NlbGVjdG9yKS52YWwoKTtcbiAgICAgIHZhciBuZXh0X3N0ZXAgPSBzdGVwICsgMTtcbiAgICAgIHZhciBwb3N0X3B1cmNoYXNlID0gZmFsc2U7XG5cbiAgICAgIC8vIHdlIHdpbGwgaGF2ZSB0byB1cGRhdGUgdGhpcyBiZWNhdXNlIG5vIG1vcmUgZmxhc2sgaWRcblxuICAgICAgdGhpcy5kZWJ1ZyggJ3N0ZXAgaXMgJyArIHN0ZXAgKyAnIGFuZCBuYXYgaXRlbSBjb3VudCBpcyAnICsgbmF2X2l0ZW1fY291bnQgKyAnIGFuZCBvcHAgaWQgaXMgJyArIG9wcF9pZCArICcgYW5kIG5leHQgc3RlcCBpcyAnICsgbmV4dF9zdGVwICk7XG5cbiAgICAgIC8vIHRoaXMgaXMgdGhlIGxhc3QgdmlzaWJsZSBzdGVwXG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuY29uZmlybV9zdGVwX3NlbGVjdG9yKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGFjdGl2ZSA9IHRoaXMub3B0aW9ucy5jb25maXJtO1xuICAgICAgICAkKCcucHJvZ3Jlc3MtLWRvbmF0aW9uIGxpLicgKyBhY3RpdmUgKyAnIHNwYW4nKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIHN0ZXAgPSAkKCcucHJvZ3Jlc3MtLWRvbmF0aW9uIGxpLicgKyBhY3RpdmUpLmluZGV4KCkgKyAxO1xuICAgICAgICAvLyB0aGVyZSBpcyBhIGNvbnRpbnVhdGlvbiBvZiB0aGUgbWFpbiBmb3JtIG9uIHRoaXMgcGFnZS4gdGhlcmUgaXMgYSBidXR0b24gdG8gY2xpY2tcbiAgICAgICAgLy8gdGhpcyBtZWFucyB0aGVyZSBpcyBhbm90aGVyIHN0ZXBcbiAgICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmNvbmZpcm1fYnV0dG9uX3NlbGVjdG9yKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgbmF2X2l0ZW1fY291bnQgKz0gMTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3RlcCA9PT0gbmF2X2l0ZW1fY291bnQgLSAxICYmICQodGhpcy5vcHRpb25zLm9wcF9pZF9zZWxlY3RvcikubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLmRlYnVnKCd0aGlzIGlzIGEgcGF5bWVudCBzdGVwIGJ1dCB0aGVyZSBpcyBhIHN0ZXAgYWZ0ZXIgaXQnKTtcbiAgICAgICAgc3RlcCA9ICdwdXJjaGFzZSc7XG4gICAgICB9IGVsc2UgaWYgKHN0ZXAgPT09IG5hdl9pdGVtX2NvdW50ICYmICQodGhpcy5vcHRpb25zLm9wcF9pZF9zZWxlY3RvcikubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLmRlYnVnKCd0aGlzIGlzIGEgcGF5bWVudCBzdGVwIGFuZCB0aGVyZSBpcyBubyBzdGVwIGFmdGVyIGl0Jyk7XG4gICAgICAgIHN0ZXAgPSAncHVyY2hhc2UnO1xuICAgICAgfSBlbHNlIGlmIChzdGVwID09PSBuYXZfaXRlbV9jb3VudCAmJiAkKHRoaXMub3B0aW9ucy5vcHBfaWRfc2VsZWN0b3IpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aGlzLmRlYnVnKCd0aGlzIGlzIGEgcG9zdC1maW5pc2ggc3RlcC4gaXQgZG9lcyBub3QgaGF2ZSBhbiBpZCcpO1xuICAgICAgICBzdGVwID0gc3RlcCArIDE7XG4gICAgICAgIHBvc3RfcHVyY2hhc2UgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmFuYWx5dGljc1RyYWNraW5nU3RlcChzdGVwLCBwb3N0X3B1cmNoYXNlKTtcblxuICAgICAgLy8gYWN0aXZhdGUgdGhlIG5hdiB0YWJzXG4gICAgICBpZiAoJCgnLnByb2dyZXNzLS1kb25hdGlvbiBsaSAuYWN0aXZlJykubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICQoJyMnICsgYWN0aXZlKS5zaG93KCk7XG4gICAgICAgICQoJy5wcm9ncmVzcy0tZG9uYXRpb24gbGkuJyArIGFjdGl2ZSArICcgYScpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFjdGl2ZSA9ICQoJy5wcm9ncmVzcy0tZG9uYXRpb24gbGkgLmFjdGl2ZScpLnBhcmVudCgpLnByb3AoJ2NsYXNzJyk7XG4gICAgICAgICQoJyMnICsgYWN0aXZlKS5zaG93KCk7XG4gICAgICB9XG5cbiAgICB9LCAvLyB0YWJOYXZpZ2F0aW9uXG5cbiAgICBhbmFseXRpY3NUcmFja2luZ1N0ZXA6IGZ1bmN0aW9uKHN0ZXAsIHBvc3RfcHVyY2hhc2UpIHtcbiAgICAgIHZhciBsZXZlbCA9IHRoaXMuY2hlY2tMZXZlbCh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucywgJ25hbWUnKTsgLy8gY2hlY2sgd2hhdCBsZXZlbCBpdCBpc1xuICAgICAgdmFyIGFtb3VudCA9ICQodGhpcy5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudF9zZWxlY3RvcikudmFsKCk7XG4gICAgICB2YXIgcmVjdXJyaW5nID0gdGhpcy5vcHRpb25zLnJlY3VycmluZztcbiAgICAgIHZhciBvcHBfaWQgPSAkKHRoaXMub3B0aW9ucy5vcHBfaWRfc2VsZWN0b3IpLnZhbCgpO1xuXG4gICAgICAvLyBpZiB3ZSdyZSBub3QgYWZ0ZXIgdGhlIHB1cmNoYXNlLCB1c2UgYWRkUHJvZHVjdFxuICAgICAgaWYgKCBwb3N0X3B1cmNoYXNlICE9PSB0cnVlICkge1xuICAgICAgICBnYSgnZWM6YWRkUHJvZHVjdCcsIHtcbiAgICAgICAgICAnaWQnOiAnbWlubnBvc3RfJyArIGxldmVsLnRvTG93ZXJDYXNlKCkgKyAnX21lbWJlcnNoaXAnLFxuICAgICAgICAgICduYW1lJzogJ01pbm5Qb3N0ICcgKyBsZXZlbC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGxldmVsLnNsaWNlKDEpICsgJyBNZW1iZXJzaGlwJyxcbiAgICAgICAgICAnY2F0ZWdvcnknOiAnRG9uYXRpb24nLFxuICAgICAgICAgICdicmFuZCc6ICdNaW5uUG9zdCcsXG4gICAgICAgICAgJ3ZhcmlhbnQnOiAgcmVjdXJyaW5nLFxuICAgICAgICAgICdwcmljZSc6IGFtb3VudCxcbiAgICAgICAgICAncXVhbnRpdHknOiAxXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RlcCA9PT0gJ3B1cmNoYXNlJykge1xuICAgICAgICB0aGlzLmRlYnVnKCdhZGQgYSBwdXJjaGFzZSBhY3Rpb24uIHN0ZXAgaXMgJyArIHN0ZXApO1xuICAgICAgICBnYSgnZWM6c2V0QWN0aW9uJywgc3RlcCx7XG4gICAgICAgICAgJ2lkJzogb3BwX2lkLCAvLyBUcmFuc2FjdGlvbiBpZCAtIFR5cGU6IHN0cmluZ1xuICAgICAgICAgICdhZmZpbGlhdGlvbic6ICdNaW5uUG9zdCcsIC8vIFN0b3JlIG5hbWUgLSBUeXBlOiBzdHJpbmdcbiAgICAgICAgICAncmV2ZW51ZSc6IGFtb3VudCwgLy8gVG90YWwgUmV2ZW51ZSAtIFR5cGU6IG51bWVyaWNcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmRlYnVnKCdhZGQgYSBjaGVja291dCBhY3Rpb24uIHN0ZXAgaXMgJyArIHN0ZXApO1xuICAgICAgICBnYSgnZWM6c2V0QWN0aW9uJywnY2hlY2tvdXQnLCB7XG4gICAgICAgICAgJ3N0ZXAnOiBzdGVwLCAgICAgICAgICAgIC8vIEEgdmFsdWUgb2YgMSBpbmRpY2F0ZXMgZmlyc3QgY2hlY2tvdXQgc3RlcC5WYWx1ZSBvZiAyIGluZGljYXRlcyBzZWNvbmQgY2hlY2tvdXQgc3RlcFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgZ2EoJ3NldCcsIHtcbiAgICAgICAgcGFnZTogd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLFxuICAgICAgICB0aXRsZTogZG9jdW1lbnQudGl0bGVcbiAgICAgIH0pO1xuICAgICAgZ2EoJ3NlbmQnLCAncGFnZXZpZXcnLCB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUpO1xuXG4gICAgfSwgLy8gYW5hbHl0aWNzVHJhY2tpbmdTdGVwXG5cbiAgICBhbW91bnRBc1JhZGlvOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICAvLyB3aGVuIGFtb3VudCBmaWVsZCBpcyBhIHJhZGlvIGJ1dHRvbiwgd2UgbmVlZCB0byBjaGVjayBpdCB3aGVuZXZlciBpdCBjaGFuZ2VzXG4gICAgICAkKG9wdGlvbnMub3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICgkKHRoaXMpLmlzKCc6cmFkaW8nKSkge1xuICAgICAgICAgICAgb3B0aW9ucy5vcmlnaW5hbF9hbW91bnQgPSBwYXJzZUludCgkKG9wdGlvbnMub3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yICsgJzpjaGVja2VkJywgZWxlbWVudCkudmFsKCksIDEwKTtcbiAgICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LCAvLyBhbW91bnRBc1JhZGlvXG5cbiAgICBhbW91bnRVcGRhdGVkOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICAvLyB3aGVuIG5ldyBhbW91bnQgdGV4dCBmaWVsZCBjYW4gY2hhbmdlLCB3ZSBuZWVkIHRvIGNoYW5nZSB0aGUgaGlkZGVuIGZpZWxkXG4gICAgICAvLyB0aGVyZSBpcyBhbHNvIHBvdGVudGlhbGx5IGFuIGFkZGl0aW9uYWwgYW1vdW50IGZpZWxkIHZhbHVlIHRvIGFkZFxuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdmFyIHBheW1lbnRfdHlwZSA9ICQob3B0aW9ucy5jaG9vc2VfcGF5bWVudCArICcgaW5wdXQnKS52YWwoKTtcblxuICAgICAgLy8gc2V0IHRoZSBmYWlyIG1hcmtldCB2YWx1ZSBpZiBhcHBsaWNhYmxlXG4gICAgICB2YXIgYW1vdW50X3NlbGVjdG9yX2ZhaXJfbWFya2V0ID0gJChvcHRpb25zLm9yaWdpbmFsX2Ftb3VudF9zZWxlY3RvciwgZWxlbWVudCk7XG4gICAgICBpZiAoYW1vdW50X3NlbGVjdG9yX2ZhaXJfbWFya2V0LmlzKCc6cmFkaW8nKSkge1xuICAgICAgICBhbW91bnRfc2VsZWN0b3JfZmFpcl9tYXJrZXQgPSAkKG9wdGlvbnMub3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yICsgJzpjaGVja2VkJywgZWxlbWVudCk7XG4gICAgICB9XG4gICAgICB0aGF0LnNldEZhaXJNYXJrZXRWYWx1ZShhbW91bnRfc2VsZWN0b3JfZmFpcl9tYXJrZXQpO1xuICAgICAgdGhhdC5zZXRQYXltZW50SW50ZW50KCk7XG4gICAgICAkKG9wdGlvbnMub3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoYXQub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQgPSBwYXJzZUludCgkKHRoaXMsIGVsZW1lbnQpLnZhbCgpLCAxMCk7XG4gICAgICAgIGlmICggcGF5bWVudF90eXBlID09PSAnYmFua19hY2NvdW50JyApIHtcbiAgICAgICAgICB0aGF0LmNhbGN1bGF0ZUZlZXModGhhdC5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCwgJ2JhbmtfYWNjb3VudCcpO1xuICAgICAgICAgIHRoYXQuc2V0UGF5bWVudEludGVudCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoYXQuY2FsY3VsYXRlRmVlcyh0aGF0Lm9wdGlvbnMub3JpZ2luYWxfYW1vdW50LCAnY2FyZCcpO1xuICAgICAgICAgIHRoYXQuc2V0UGF5bWVudEludGVudCgpO1xuICAgICAgICB9XG4gICAgICAgIHRoYXQuc2V0RmFpck1hcmtldFZhbHVlKCQodGhpcywgZWxlbWVudCkpO1xuICAgICAgfSk7XG4gICAgICAkKG9wdGlvbnMuYWRkaXRpb25hbF9hbW91bnRfZmllbGQsIGVsZW1lbnQpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgdGhhdC5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCA9IHBhcnNlSW50KCQob3B0aW9ucy5vcmlnaW5hbF9hbW91bnRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLCAxMCk7XG4gICAgICAgIGlmICggcGF5bWVudF90eXBlID09PSAnYmFua19hY2NvdW50JyApIHtcbiAgICAgICAgICB0aGF0LmNhbGN1bGF0ZUZlZXModGhhdC5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCwgJ2JhbmtfYWNjb3VudCcpO1xuICAgICAgICAgIHRoYXQuc2V0UGF5bWVudEludGVudCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoYXQuY2FsY3VsYXRlRmVlcyh0aGF0Lm9wdGlvbnMub3JpZ2luYWxfYW1vdW50LCAnY2FyZCcpO1xuICAgICAgICAgIHRoYXQuc2V0UGF5bWVudEludGVudCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIH0sIC8vIGFtb3VudFVwZGF0ZWRcblxuICAgIHNldFBheW1lbnRJbnRlbnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGFtb3VudCA9IHRoaXMuZ2V0VG90YWxBbW91bnQoKTtcbiAgICAgIHZhciBwYXltZW50X3R5cGUgPSAkKHRoaXMub3B0aW9ucy5jaG9vc2VfcGF5bWVudCArICcgaW5wdXQnKS52YWwoKTtcbiAgICAgIHZhciBwYXlfZmVlcyA9IGZhbHNlO1xuICAgICAgdmFyIGZpZWxkID0gJCh0aGlzLm9wdGlvbnMucGF5X2NjX3Byb2Nlc3Npbmdfc2VsZWN0b3IpO1xuICAgICAgaWYgKCQoZmllbGQpLmlzKCc6Y2hlY2tlZCcpIHx8ICQoZmllbGQpLnByb3AoJ2NoZWNrZWQnKSkge1xuICAgICAgICBwYXlfZmVlcyA9IHRydWU7XG4gICAgICB9XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB2YXIgaW50ZW50RGF0YSA9IHtcbiAgICAgICAgYW1vdW50OiBhbW91bnQsXG4gICAgICAgIHBheW1lbnRfdHlwZTogcGF5bWVudF90eXBlLFxuICAgICAgICBwYXlfZmVlczogcGF5X2ZlZXMsXG4gICAgICAgIGN1cnJlbmN5OiAndXNkJ1xuICAgICAgfTtcbiAgICAgICQuYWpheCh7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICB1cmw6ICcvZ2V0LXBheW1lbnQtaW50ZW50LycsXG4gICAgICAgIGRhdGE6IGludGVudERhdGFcbiAgICAgIH0pLmRvbmUoZnVuY3Rpb24oIHJlc3VsdCApIHtcbiAgICAgICAgJCh0aGF0Lm9wdGlvbnMuaW50ZW50X3NlY3JldF9zZWxlY3RvcikudmFsKHJlc3VsdC5jbGllbnRTZWNyZXQpO1xuICAgICAgfSk7XG4gICAgfSwgLy8gc2V0UGF5bWVudEludGVudFxuXG4gICAgZ2V0UGF5bWVudEludGVudDogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaW50ZW50O1xuICAgICAgaW50ZW50ID0gJCh0aGlzLm9wdGlvbnMuaW50ZW50X3NlY3JldF9zZWxlY3RvcikudmFsKCk7XG4gICAgICByZXR1cm4gaW50ZW50O1xuICAgIH0sIC8vIGdldFBheW1lbnRJbnRlbnRcblxuICAgIGdldFRvdGFsQW1vdW50OiBmdW5jdGlvbihhbW91bnQpIHtcbiAgICAgIGFtb3VudCA9ICh0eXBlb2YgYW1vdW50ICE9PSAndW5kZWZpbmVkJykgPyAgYW1vdW50IDogdGhpcy5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudDtcbiAgICAgIHZhciB0b3RhbF9hbW91bnQgPSBhbW91bnQ7XG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuYWRkaXRpb25hbF9hbW91bnRfZmllbGQpLmxlbmd0aCA+IDAgJiYgJCh0aGlzLm9wdGlvbnMuYWRkaXRpb25hbF9hbW91bnRfZmllbGQpLnZhbCgpID4gMCkge1xuICAgICAgICB2YXIgYWRkaXRpb25hbF9hbW91bnQgPSAkKHRoaXMub3B0aW9ucy5hZGRpdGlvbmFsX2Ftb3VudF9maWVsZCkudmFsKCk7XG4gICAgICAgIHRvdGFsX2Ftb3VudCA9IHBhcnNlSW50KGFkZGl0aW9uYWxfYW1vdW50LCAxMCkgKyBwYXJzZUludChhbW91bnQsIDEwKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0b3RhbF9hbW91bnQ7XG4gICAgfSwgLy9nZXRUb3RhbEFtb3VudFxuXG4gICAgc2V0RmFpck1hcmtldFZhbHVlOiBmdW5jdGlvbihhbW91bnRfc2VsZWN0b3IpIHtcbiAgICAgIC8vIGlmIHRoZXJlIGlzIGEgZmFpciBtYXJrZXQgdmFsdWUgZmllbGQsIGNoZWNrIGFuZCBzZWUgaWYgd2UgY2FuIHBvcHVsYXRlIGl0XG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuZmFpcl9tYXJrZXRfdmFsdWVfc2VsZWN0b3IpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdmFyIGZhaXJNYXJrZXRWYWx1ZSA9IGFtb3VudF9zZWxlY3Rvci5kYXRhKCdmYWlyLW1hcmtldC12YWx1ZScpO1xuICAgICAgICAkKHRoaXMub3B0aW9ucy5mYWlyX21hcmtldF92YWx1ZV9zZWxlY3RvcikudmFsKGZhaXJNYXJrZXRWYWx1ZSk7XG4gICAgICB9XG4gICAgfSwgLy8gc2V0RmFpck1hcmtldFZhbHVlXG5cbiAgICBjYWxjdWxhdGVGZWVzOiBmdW5jdGlvbihhbW91bnQsIHN0cmlwZV9wYXltZW50X3R5cGUpIHtcbiAgICAgIC8vIHRoaXMgc2VuZHMgdGhlIGFtb3VudCBhbmQgc3RyaXBlIHBheW1lbnQgdHlwZSB0byBweXRob247IGdldCB0aGUgZmVlIGFuZCBkaXNwbGF5IGl0IHRvIHRoZSB1c2VyIG9uIHRoZSBjaGVja2JveCBsYWJlbFxuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdmFyIHRvdGFsX2Ftb3VudCA9IHRoYXQuZ2V0VG90YWxBbW91bnQoYW1vdW50KTtcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICBhbW91bnQ6IHRvdGFsX2Ftb3VudCxcbiAgICAgICAgc3RyaXBlX3BheW1lbnRfdHlwZTogc3RyaXBlX3BheW1lbnRfdHlwZVxuICAgICAgfTtcbiAgICAgIHRoYXQuc2V0U3RyaXBlUGF5bWVudFR5cGUoc3RyaXBlX3BheW1lbnRfdHlwZSk7XG4gICAgICAkLmFqYXgoe1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgdXJsOiAnL2NhbGN1bGF0ZS1mZWVzLycsXG4gICAgICAgIGRhdGE6IGRhdGFcbiAgICAgIH0pLmRvbmUoZnVuY3Rpb24oIGRhdGEgKSB7XG4gICAgICAgIGlmICgkKGRhdGEuZmVlcykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICQodGhhdC5vcHRpb25zLmZlZV9hbW91bnQpLnRleHQocGFyc2VGbG9hdChkYXRhLmZlZXMpLnRvRml4ZWQoMikpO1xuICAgICAgICAgIHRoYXQuY3JlZGl0Q2FyZEZlZUNoZWNrYm94KCQodGhhdC5vcHRpb25zLnBheV9jY19wcm9jZXNzaW5nX3NlbGVjdG9yKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sIC8vIGNhbGN1bGF0ZUZlZXNcblxuICAgIGNyZWRpdENhcmRQcm9jZXNzaW5nRmVlczogZnVuY3Rpb24ob3B0aW9ucywgcmVzZXQpIHtcbiAgICAgIC8vIHRoaXMgYWRkcyBvciBzdWJ0cmFjdHMgdGhlIGZlZSB0byB0aGUgb3JpZ2luYWwgYW1vdW50IHdoZW4gdGhlIHVzZXIgaW5kaWNhdGVzIHRoZXkgZG8gb3IgZG8gbm90IHdhbnQgdG8gcGF5IHRoZSBmZWVzXG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB0aGF0LmNyZWRpdENhcmRGZWVDaGVja2JveCgkKHRoaXMub3B0aW9ucy5wYXlfY2NfcHJvY2Vzc2luZ19zZWxlY3RvcikpO1xuICAgICAgJCh0aGlzLm9wdGlvbnMucGF5X2NjX3Byb2Nlc3Npbmdfc2VsZWN0b3IpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdGhhdC5jcmVkaXRDYXJkRmVlQ2hlY2tib3godGhpcyk7XG4gICAgICAgICAgdGhhdC5zZXRQYXltZW50SW50ZW50KCk7XG4gICAgICB9KTtcbiAgICB9LCAvLyBjcmVkaXRDYXJkUHJvY2Vzc2luZ0ZlZXNcblxuICAgIHNldFN0cmlwZVBheW1lbnRUeXBlOiBmdW5jdGlvbihzdHJpcGVfcGF5bWVudF90eXBlKSB7XG4gICAgICBpZiAoJCgnaW5wdXRbbmFtZT1cInN0cmlwZV9wYXltZW50X3R5cGVcIl0nKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgJCh0aGlzLm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLmFwcGVuZCgnPGlucHV0IHR5cGU9XFxcImhpZGRlblxcXCIgbmFtZT1cXFwic3RyaXBlX3BheW1lbnRfdHlwZVxcXCI+Jyk7XG4gICAgICB9XG4gICAgICAkKCdpbnB1dFtuYW1lPVwic3RyaXBlX3BheW1lbnRfdHlwZVwiXScpLnZhbChzdHJpcGVfcGF5bWVudF90eXBlKTtcbiAgICB9LCAvLyBzZXRTdHJpcGVQYXltZW50VHlwZVxuXG4gICAgY3JlZGl0Q2FyZEZlZUNoZWNrYm94OiBmdW5jdGlvbihmaWVsZCkge1xuICAgICAgdmFyIGZ1bGxfYW1vdW50O1xuICAgICAgdmFyIHRvdGFsX2Ftb3VudCA9IHRoaXMuZ2V0VG90YWxBbW91bnQoKTtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIGlmICgkKGZpZWxkKS5pcygnOmNoZWNrZWQnKSB8fCAkKGZpZWxkKS5wcm9wKCdjaGVja2VkJykpIHtcbiAgICAgICAgJCgnLmFtb3VudCAubGV2ZWwtYW1vdW50JykuYWRkQ2xhc3MoJ2Z1bGwtYW1vdW50Jyk7XG4gICAgICAgIGZ1bGxfYW1vdW50ID0gKHRvdGFsX2Ftb3VudCArIHBhcnNlRmxvYXQoJCh0aGF0Lm9wdGlvbnMuZmVlX2Ftb3VudCkudGV4dCgpKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmdWxsX2Ftb3VudCA9IHRvdGFsX2Ftb3VudDtcbiAgICAgIH1cbiAgICAgICQodGhhdC5vcHRpb25zLmZ1bGxfYW1vdW50X3NlbGVjdG9yKS50ZXh0KHBhcnNlRmxvYXQoZnVsbF9hbW91bnQpLnRvRml4ZWQoMikpO1xuICAgIH0sIC8vIGNyZWRpdENhcmRGZWVDaGVja2JveFxuXG4gICAgZG9uYXRlQW5vbnltb3VzbHk6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIGlmICgkKG9wdGlvbnMuYW5vbnltb3VzX3NlbGVjdG9yLCBlbGVtZW50KS5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICAkKG9wdGlvbnMubmFtZV9zZWxlY3RvciArICcgZGl2OmZpcnN0JywgZWxlbWVudCkuaGlkZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJChvcHRpb25zLm5hbWVfc2VsZWN0b3IgKyAnIGRpdjpmaXJzdCcsIGVsZW1lbnQpLnNob3coKTtcbiAgICAgIH1cblxuICAgICAgJChvcHRpb25zLmFub255bW91c19zZWxlY3RvciwgZWxlbWVudCkuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoJCh0aGlzKS5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICAgICQob3B0aW9ucy5uYW1lX3NlbGVjdG9yICsgJyBkaXY6Zmlyc3QnLCBlbGVtZW50KS5oaWRlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJChvcHRpb25zLm5hbWVfc2VsZWN0b3IgKyAnIGRpdjpmaXJzdCcsIGVsZW1lbnQpLnNob3coKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSwgLy8gZG9uYXRlQW5vbnltb3VzbHlcblxuICAgIGNoZWNrTGV2ZWw6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMsIHJldHVybnZhbHVlKSB7XG4gICAgICAvLyB3ZSBjb3VsZCBtYXliZSBnZXQgcmlkIG9mIHRoaXMgaWYgd2UgY291bGQgbW92ZSB0aGlzIHBhcnQgaW50byB3b3JkcHJlc3NcbiAgICAgIHZhciBsZXZlbCA9ICcnO1xuICAgICAgdmFyIGxldmVsbnVtID0gMDtcbiAgICAgIHZhciBhbW91bnRfeWVhcmx5O1xuICAgICAgdmFyIGZyZXF1ZW5jeSA9IG9wdGlvbnMuZnJlcXVlbmN5O1xuICAgICAgdmFyIGFtb3VudCA9IG9wdGlvbnMub3JpZ2luYWxfYW1vdW50O1xuXG4gICAgICBpZiAoZnJlcXVlbmN5ID09PSAxMikge1xuICAgICAgICBhbW91bnRfeWVhcmx5ID0gYW1vdW50ICogZnJlcXVlbmN5O1xuICAgICAgfSBlbHNlIGlmIChmcmVxdWVuY3kgPT09IDEpIHtcbiAgICAgICAgYW1vdW50X3llYXJseSA9IGFtb3VudDtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgJC5lYWNoKG9wdGlvbnMubGV2ZWxzLCBmdW5jdGlvbihpbmRleCwgdmFsdWUpIHtcbiAgICAgICAgdmFyIG5hbWUgPSB2YWx1ZS5uYW1lO1xuICAgICAgICB2YXIgbnVtID0gaW5kZXg7XG4gICAgICAgIHZhciBtYXggPSB2YWx1ZS5tYXg7XG4gICAgICAgIHZhciBtaW4gPSB2YWx1ZS5taW47XG4gICAgICAgIGlmICh0eXBlb2YgbWluICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgbWF4ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGlmIChhbW91bnRfeWVhcmx5ID49IG1pbiAmJiBhbW91bnRfeWVhcmx5IDwgbWF4KSB7XG4gICAgICAgICAgICBsZXZlbCA9IG5hbWU7XG4gICAgICAgICAgICBsZXZlbG51bSA9IG51bTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG1heCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBpZiAoYW1vdW50X3llYXJseSA8IG1heCkge1xuICAgICAgICAgICAgbGV2ZWwgPSBuYW1lO1xuICAgICAgICAgICAgbGV2ZWxudW0gPSBudW07XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBtaW4gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgaWYgKGFtb3VudF95ZWFybHkgPj0gbWluKSB7XG4gICAgICAgICAgICBsZXZlbCA9IG5hbWU7XG4gICAgICAgICAgICBsZXZlbG51bSA9IG51bTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgaWYgKHJldHVybnZhbHVlID09PSAnbmFtZScpIHtcbiAgICAgICAgcmV0dXJuIGxldmVsO1xuICAgICAgfSBlbHNlIGlmIChyZXR1cm52YWx1ZSA9PT0gJ251bScpIHtcbiAgICAgICAgcmV0dXJuIGxldmVsbnVtOyAgXG4gICAgICB9XG4gICAgfSwgLy8gY2hlY2tMZXZlbFxuXG4gICAgaG9ub3JPck1lbW9yeTogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgaWYgKCQob3B0aW9ucy5ob25vcl9vcl9tZW1vcnlfY2hvb3NlciArICc6Y2hlY2tlZCcpLnZhbCgpKSB7XG4gICAgICAgICQob3B0aW9ucy5ob25vcl9tZW1vcnlfaW5wdXRfZ3JvdXAsIGVsZW1lbnQpLnNob3coKTtcbiAgICAgICAgJChvcHRpb25zLmhvbm9yX3R5cGVfc2VsZWN0b3IpLnRleHQoJChvcHRpb25zLmhvbm9yX29yX21lbW9yeV9jaG9vc2VyICsgJzpjaGVja2VkJykudmFsKCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJChvcHRpb25zLmhvbm9yX21lbW9yeV9pbnB1dF9ncm91cCwgZWxlbWVudCkuaGlkZSgpO1xuICAgICAgICAkKG9wdGlvbnMuaG9ub3JfbmFtZV9zZWxlY3RvciArICcgaW5wdXQnLCBlbGVtZW50KS52YWwoJycpO1xuICAgICAgfVxuICAgIH0sIC8vIGhvbm9yT3JNZW1vcnlcblxuICAgIGhvbm9yT3JNZW1vcnlUb2dnbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHRoYXQuaG9ub3JPck1lbW9yeSh0aGF0LmVsZW1lbnQsIHRoYXQub3B0aW9ucyk7XG4gICAgICAkKG9wdGlvbnMuaG9ub3Jfb3JfbWVtb3J5X2Nob29zZXIsIGVsZW1lbnQpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgdGhhdC5ob25vck9yTWVtb3J5KHRoYXQuZWxlbWVudCwgdGhhdC5vcHRpb25zKTtcbiAgICAgIH0pO1xuICAgIH0sIC8vIGhvbm9yT3JNZW1vcnlUb2dnbGVcblxuICAgIG91dHNpZGVVbml0ZWRTdGF0ZXM6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgICQob3B0aW9ucy5zaG93X2JpbGxpbmdfY291bnRyeV9zZWxlY3RvcikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICQob3B0aW9ucy5iaWxsaW5nX2NvdW50cnlfc2VsZWN0b3IpLnNob3coKTtcbiAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5oaWRlKCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuICAgICAgJChvcHRpb25zLnNob3dfc2hpcHBpbmdfY291bnRyeV9zZWxlY3RvcikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICQob3B0aW9ucy5zaGlwcGluZ19jb3VudHJ5X3NlbGVjdG9yKS5zaG93KCk7XG4gICAgICAgICQodGhpcykucGFyZW50KCkuaGlkZSgpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9LCAvLyBvdXRzaWRlVW5pdGVkU3RhdGVzXG5cbiAgICBzaGlwcGluZ0FkZHJlc3M6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHZhciBzaG93X3NoaXBwaW5nID0gZmFsc2U7XG4gICAgICBpZiAoJChvcHRpb25zLnVzZV9mb3Jfc2hpcHBpbmdfc2VsZWN0b3IpLmxlbmd0aCA+IDApIHsgLy8gd2UgaGF2ZSBhIHNoaXBwaW5nIGNoZWNrYm94XG4gICAgICAgIHNob3dfc2hpcHBpbmcgPSB0cnVlO1xuICAgICAgfVxuLy8gICAgICBzaG93X3NoaXBwaW5nID0gISEkKG9wdGlvbnMudXNlX2Zvcl9zaGlwcGluZ19zZWxlY3RvciArICc6Y2hlY2tlZCcsIGVsZW1lbnQpLmxlbmd0aDtcbi8vICAgICAgLy90aGlzLmRlYnVnKCdzaG93IGlzIHRoZXJlJyk7XG5cbi8qICAgICAgJChvcHRpb25zLnVzZV9mb3Jfc2hpcHBpbmdfc2VsZWN0b3IsIGVsZW1lbnQpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgdGhhdC5zaGlwcGluZ0FkZHJlc3MoZWxlbWVudCwgb3B0aW9ucyk7XG4gICAgICAgIC8vdGhpcy5kZWJ1ZygnY2hhbmdlIGl0Jyk7XG4gICAgICB9KTtcbiovXG4gICAgICBpZiAoc2hvd19zaGlwcGluZyA9PT0gdHJ1ZSApIHtcbiAgICAgICAgJChvcHRpb25zLnVzZV9mb3Jfc2hpcHBpbmdfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpLnNob3coKTtcbiAgICAgICAgaWYgKCQob3B0aW9ucy51c2VfZm9yX3NoaXBwaW5nX3NlbGVjdG9yLCBlbGVtZW50KS5pcygnOmNoZWNrZWQnKSkgeyAvLyB1c2Ugc2FtZSBhcyBiaWxsaW5nXG4gICAgICAgICAgJChvcHRpb25zLnNoaXBwaW5nX3NlbGVjdG9yKS5oaWRlKCk7XG4gICAgICAgIH0gZWxzZSB7IC8vIHNlcGFyYXRlIHNoaXBwaW5nIGFuZCBiaWxsaW5nXG4gICAgICAgICAgJChvcHRpb25zLnNoaXBwaW5nX3NlbGVjdG9yKS5zaG93KCk7XG4gICAgICAgIH1cbiAgICAgICAgJChvcHRpb25zLnVzZV9mb3Jfc2hpcHBpbmdfc2VsZWN0b3IsIGVsZW1lbnQpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgICB0aGF0LnNoaXBwaW5nQWRkcmVzcyhlbGVtZW50LCBvcHRpb25zKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBcbiAgICB9LCAvLyBzaGlwcGluZ0FkZHJlc3NcblxuICAgIGFsbG93TWlubnBvc3RBY2NvdW50OiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zLCBjaGFuZ2VkKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB2YXIgYWNjb3VudF9leGlzdHMgPSBmYWxzZTtcblxuICAgICAgJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKS5hcHBlbmQoJzxwIGNsYXNzPVwiZXJyb3Igc3BhbS1lbWFpbFwiPlRoaXMgZW1haWwgYWRkcmVzcyBoYXMgYmVlbiBkZXRlY3RlZCBhcyBhIHNwYW1tZXIuPC9wPicpO1xuICAgICAgJCgnLnNwYW0tZW1haWwnKS5oaWRlKCk7XG5cbiAgICAgICQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCcuc3BhbS1lbWFpbCcpLmhpZGUoKTtcbiAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaW52YWxpZCBlcnJvcicpO1xuICAgICAgfSk7XG5cbiAgICAgIGZ1bmN0aW9uIGRvbmVUeXBpbmcgKCkge1xuICAgICAgICB2YXIgZW1haWwgPSAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpO1xuICAgICAgICBhY2NvdW50X2V4aXN0cyA9IHRoYXQuY2hlY2tNaW5ucG9zdEFjY291bnQoZWxlbWVudCwgb3B0aW9ucywgZW1haWwpO1xuICAgICAgfVxuXG4gICAgICAvL3NldHVwIGJlZm9yZSBmdW5jdGlvbnNcbiAgICAgIHZhciB0eXBpbmdUaW1lcjsgICAgICAgICAgICAgICAgLy90aW1lciBpZGVudGlmaWVyXG4gICAgICB2YXIgZG9uZVR5cGluZ0ludGVydmFsID0gNTAwMDsgIC8vdGltZSBpbiBtcywgNSBzZWNvbmQgZm9yIGV4YW1wbGVcblxuICAgICAgLy9vbiBrZXl1cCwgc3RhcnQgdGhlIGNvdW50ZG93blxuICAgICAgJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5rZXl1cChmdW5jdGlvbigpe1xuICAgICAgICBjbGVhclRpbWVvdXQodHlwaW5nVGltZXIpO1xuICAgICAgICBpZiAoJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwpIHtcbiAgICAgICAgICB0eXBpbmdUaW1lciA9IHNldFRpbWVvdXQoZG9uZVR5cGluZywgZG9uZVR5cGluZ0ludGVydmFsKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIC8vdXNlciBpcyBcImZpbmlzaGVkIHR5cGluZyxcIiBkbyBzb21ldGhpbmdcblxuICAgICAgaWYgKCQob3B0aW9ucy5jcmVhdGVfbXBfc2VsZWN0b3IsIGVsZW1lbnQpLmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgICQob3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgZWxlbWVudCkuc2hvdygpO1xuICAgICAgICBvcHRpb25zLmNyZWF0ZV9hY2NvdW50ID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQob3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgZWxlbWVudCkuaGlkZSgpO1xuICAgICAgfVxuXG4gICAgICAkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoYXQuYWxsb3dNaW5ucG9zdEFjY291bnQoZWxlbWVudCwgb3B0aW9ucywgdHJ1ZSk7XG4gICAgICB9KTtcblxuICAgICAgaWYgKGNoYW5nZWQgPT09IGZhbHNlKSB7XG4gICAgICAgIC8vIGFsbG93IHVzZXJzIHRvIHNob3cgcGxhaW4gdGV4dCwgb3IgdG8gc2VlIHB3IGNyaXRlcmlhXG4gICAgICAgICQob3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgZWxlbWVudCkuYXBwZW5kKCc8ZGl2IGNsYXNzPVwiaGVscC1saW5rXCI+PHNwYW4+UGFzc3dvcmQgaGVscDwvc3Bhbj48L2Rpdj48ZGl2IGNsYXNzPVwiZm9ybS1oZWxwXCI+UGFzc3dvcmQgbXVzdCBiZSBhdCBsZWFzdCA2IGNoYXJhY3RlcnMuPC9kaXY+PGxhYmVsIGNsYXNzPVwiYWRkaXRpb25hbC1vcHRpb25cIj48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgbmFtZT1cInNob3dwYXNzd29yZFwiIGlkPVwic2hvd3Bhc3N3b3JkXCI+IFNob3cgcGFzc3dvcmQ8L2xhYmVsPicpO1xuICAgICAgICAkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKS5iZWZvcmUoJzxwIGNsYXNzPVwiYWNjb3VudC1leGlzdHMgc3VjY2Vzc1wiPlRoZXJlIGlzIGFscmVhZHkgYSBNaW5uUG9zdC5jb20gYWNjb3VudCB3aXRoIHRoaXMgZW1haWwuPC9wPicpO1xuICAgICAgICAkKCcuYWNjb3VudC1leGlzdHMnKS5oaWRlKCk7XG4gICAgICAgICQoJyNzaG93cGFzc3dvcmQnKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAoJCh0aGlzKS5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICAgICAgJCgnI3Bhc3N3b3JkJykuZ2V0KDApLnR5cGUgPSAndGV4dCc7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoJyNwYXNzd29yZCcpLmdldCgwKS50eXBlID0gJ3Bhc3N3b3JkJztcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5mb3JtLWl0ZW0gLmZvcm0taGVscCcpLmhpZGUoKTtcbiAgICAgIH1cbiAgICAgICQoJy5oZWxwLWxpbmsnKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKS5uZXh0KCcuZm9ybS1oZWxwJykudG9nZ2xlKCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuICAgIH0sIC8vIGFsbG93TWlubnBvc3RBY2NvdW50XG5cbiAgICBjaGVja01pbm5wb3N0QWNjb3VudDogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucywgZW1haWwpIHtcbiAgICAgIHZhciB1c2VyID0ge1xuICAgICAgICBlbWFpbDogZW1haWxcbiAgICAgIH07XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAkLmFqYXgoe1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICB1cmw6IG9wdGlvbnMubWlubnBvc3Rfcm9vdCArICcvd3AtanNvbi91c2VyLWFjY291bnQtbWFuYWdlbWVudC92MS9jaGVjay1hY2NvdW50JyxcbiAgICAgICAgZGF0YTogdXNlclxuICAgICAgfSkuZG9uZShmdW5jdGlvbiggcmVzdWx0ICkge1xuICAgICAgICBpZiAocmVzdWx0LnN0YXR1cyA9PT0gJ3N1Y2Nlc3MnICYmIHJlc3VsdC5yZWFzb24gPT09ICd1c2VyIGV4aXN0cycpIHsgLy8gdXNlciBleGlzdHNcbiAgICAgICAgICBpZiAoJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgICAgICQob3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgZWxlbWVudCkuaGlkZSgpO1xuICAgICAgICAgICAgJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkucGFyZW50KCkuaGlkZSgpO1xuICAgICAgICAgICAgJCgnLmFjY291bnQtZXhpc3RzJywgZWxlbWVudCkuc2hvdygpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KS5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgICAgICAgJChvcHRpb25zLnBhc3N3b3JkX3NlbGVjdG9yLCBlbGVtZW50KS5oaWRlKCk7XG4gICAgICAgICAgICAgICQob3B0aW9ucy5jcmVhdGVfbXBfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpLmhpZGUoKTtcbiAgICAgICAgICAgICAgJCgnLmFjY291bnQtZXhpc3RzJywgZWxlbWVudCkuc2hvdygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKCByZXN1bHQuc3RhdHVzID09PSAnc3BhbScgKSB7XG4gICAgICAgICAgJCh0aGF0Lm9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IpLmFkZENsYXNzKCdpbnZhbGlkIGVycm9yJyk7XG4gICAgICAgICAgJCggJy5zcGFtLWVtYWlsJykuc2hvdygpO1xuICAgICAgICB9IGVsc2UgeyAvLyB1c2VyIGRvZXMgbm90IGV4aXN0IG9yIGFqYXggY2FsbCBmYWlsZWRcbiAgICAgICAgICBpZiAoJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgICAgICQob3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgZWxlbWVudCkuc2hvdygpO1xuICAgICAgICAgICAgb3B0aW9ucy5jcmVhdGVfYWNjb3VudCA9IHRydWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQob3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgZWxlbWVudCkuaGlkZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAkKCcuYWNjb3VudC1leGlzdHMnLCBlbGVtZW50KS5oaWRlKCk7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LCAvLyBjaGVja01pbm5wb3N0QWNjb3VudFxuXG4gICAgY2hvb3NlUGF5bWVudE1ldGhvZDogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuXG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG5cbiAgICAgIGlmICgkKG9wdGlvbnMuY2hvb3NlX3BheW1lbnQpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgaWYgKCQob3B0aW9ucy5jaG9vc2VfcGF5bWVudCArICcgaW5wdXQnKS5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICAgIHZhciBjaGVja2VkID0gJChvcHRpb25zLmNob29zZV9wYXltZW50ICsgJyBpbnB1dDpjaGVja2VkJykuYXR0cignaWQnKTtcbiAgICAgICAgICB2YXIgY2hlY2tlZF92YWx1ZSA9ICQob3B0aW9ucy5jaG9vc2VfcGF5bWVudCArICcgaW5wdXQ6Y2hlY2tlZCcpLnZhbCgpO1xuICAgICAgICAgIHRoYXQuc2V0dXBQYXltZW50TWV0aG9kKGNoZWNrZWQsIGNoZWNrZWRfdmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgJChvcHRpb25zLmNob29zZV9wYXltZW50ICsgJyBpbnB1dCcpLmNoYW5nZShmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICB0aGF0LnNldHVwUGF5bWVudE1ldGhvZCh0aGlzLmlkLCB0aGlzLnZhbHVlKTtcbiAgICAgICAgICB0aGF0LnNldFBheW1lbnRJbnRlbnQoKTtcbiAgICAgICAgICBpZiAoIHRoaXMudmFsdWUgPT09ICdiYW5rX2FjY291bnQnICkge1xuICAgICAgICAgICAgJCgnaW5wdXRbbmFtZT1cInN0cmlwZVRva2VuXCJdJywgJCh0aGF0Lm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpKS5yZW1vdmUoKTtcbiAgICAgICAgICAgIHRoYXQuYWNoRmllbGRzKHRoYXQuZWxlbWVudCwgdGhhdC5vcHRpb25zKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCgnaW5wdXRbbmFtZT1cInB1YmxpY190b2tlblwiXScsICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKSkucmVtb3ZlKCk7XG4gICAgICAgICAgICAkKCdpbnB1dFtuYW1lPVwiYWNjb3VudF9pZFwiXScsICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKSkucmVtb3ZlKCk7XG4gICAgICAgICAgICAkKCdpbnB1dFtuYW1lPVwiYmFua1Rva2VuXCJdJywgJCh0aGF0Lm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpKS5yZW1vdmUoKTtcbiAgICAgICAgICAgIHRoYXQuY2FsY3VsYXRlRmVlcyh0aGF0Lm9wdGlvbnMub3JpZ2luYWxfYW1vdW50LCAnY2FyZCcpOyAvLyB3ZSBjYW4ndCB1c2UgY3JlZGl0Y2FyZGZpZWxkcyBtZXRob2QgaGVyZVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgIH1cbiAgICB9LCAvLyBjaG9vc2VQYXltZW50TWV0aG9kXG5cbiAgICBzZXR1cFBheW1lbnRNZXRob2Q6IGZ1bmN0aW9uKGlkLCB2YWx1ZSkge1xuICAgICAgJCh0aGlzLm9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICQodGhpcy5vcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yICsgJy4nICsgaWQpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgIC8vJCh0aGlzLm9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IgKyAnOm5vdCguYWN0aXZlKSBsYWJlbCcpLnJlbW92ZUNsYXNzKCdyZXF1aXJlZCcpO1xuICAgICAgLy8kKHRoaXMub3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvciArICc6bm90KC5hY3RpdmUpIGlucHV0JykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICAkKHRoaXMub3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvciArICc6bm90KC5hY3RpdmUpIGlucHV0JykudmFsKCcnKTtcbiAgICAgIC8vJCh0aGlzLm9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IgKyAnLmFjdGl2ZSBsYWJlbCcpLmFkZENsYXNzKCdyZXF1aXJlZCcpO1xuICAgICAgLy8kKHRoaXMub3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvciArICcuYWN0aXZlIGlucHV0JykucHJvcCgncmVxdWlyZWQnLCB0cnVlKTtcbiAgICAgIGlmICggdmFsdWUgPT09ICdiYW5rX2FjY291bnQnICkge1xuICAgICAgICB0aGlzLmNhbGN1bGF0ZUZlZXModGhpcy5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCwgJ2JhbmtfYWNjb3VudCcpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVGZWVzKHRoaXMub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQsICdjYXJkJyk7XG4gICAgICB9XG4gICAgfSwgLy8gc2V0dXBQYXltZW50TWV0aG9kXG5cbiAgICBjcmVkaXRDYXJkRmllbGRzOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG5cbiAgICAgIHZhciB0aGF0ID0gdGhpcztcblxuICAgICAgdmFyIHN0eWxlID0ge1xuICAgICAgICBiYXNlOiB7XG4gICAgICAgICAgaWNvbkNvbG9yOiAnIzY2NkVFOCcsXG4gICAgICAgICAgbGluZUhlaWdodDogJzM3cHgnLFxuICAgICAgICAgIGZvbnRXZWlnaHQ6IDQwMCxcbiAgICAgICAgICBmb250RmFtaWx5OiAnR2VvcmdpYSxDYW1icmlhLFRpbWVzIE5ldyBSb21hbixUaW1lcyxzZXJpZicsXG4gICAgICAgICAgZm9udFNpemU6ICcxNnB4JyxcbiAgICAgICAgfSxcbiAgICAgIH07XG5cbiAgICAgIC8vIEFkZCBhbiBpbnN0YW5jZSBvZiB0aGUgY2FyZCBVSSBjb21wb25lbnQgaW50byB0aGUgYGNhcmQtZWxlbWVudGAgPGRpdj5cbiAgICAgIC8vY2FyZC5tb3VudCgnI2NhcmQtZWxlbWVudCcpO1xuICAgICAgaWYgKCAkKCcuY3JlZGl0LWNhcmQtZ3JvdXAnKS5sZW5ndGggPT09IDAgJiYgJCgnLnBheW1lbnQtbWV0aG9kLmNob29zZS1jYXJkJykubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoYXQuY2FyZE51bWJlckVsZW1lbnQgPSB0aGF0LmVsZW1lbnRzLmNyZWF0ZSgnY2FyZE51bWJlcicsIHtcbiAgICAgICAgc3R5bGU6IHN0eWxlXG4gICAgICB9KTtcbiAgICAgIHRoYXQuY2FyZE51bWJlckVsZW1lbnQubW91bnQob3B0aW9ucy5jY19udW1fc2VsZWN0b3IpO1xuXG4gICAgICB0aGF0LmNhcmRFeHBpcnlFbGVtZW50ID0gdGhhdC5lbGVtZW50cy5jcmVhdGUoJ2NhcmRFeHBpcnknLCB7XG4gICAgICAgIHN0eWxlOiBzdHlsZVxuICAgICAgfSk7XG4gICAgICB0aGF0LmNhcmRFeHBpcnlFbGVtZW50Lm1vdW50KG9wdGlvbnMuY2NfZXhwX3NlbGVjdG9yKTtcblxuICAgICAgdGhhdC5jYXJkQ3ZjRWxlbWVudCA9IHRoYXQuZWxlbWVudHMuY3JlYXRlKCdjYXJkQ3ZjJywge1xuICAgICAgICBzdHlsZTogc3R5bGVcbiAgICAgIH0pO1xuICAgICAgdGhhdC5jYXJkQ3ZjRWxlbWVudC5tb3VudChvcHRpb25zLmNjX2N2dl9zZWxlY3Rvcik7XG5cbiAgICAgIC8vIHZhbGlkYXRlL2Vycm9yIGhhbmRsZSB0aGUgY2FyZCBmaWVsZHNcbiAgICAgIHRoYXQuY2FyZE51bWJlckVsZW1lbnQub24oJ2NoYW5nZScsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIHZhciBzdHJpcGVfcGF5bWVudF90eXBlID0gJ2NhcmQnO1xuICAgICAgICAvLyBlcnJvciBoYW5kbGluZ1xuICAgICAgICB0aGF0LnN0cmlwZUVycm9yRGlzcGxheShldmVudCwgJChvcHRpb25zLmNjX251bV9zZWxlY3RvciwgZWxlbWVudCksIGVsZW1lbnQsIG9wdGlvbnMgKTtcbiAgICAgICAgLy8gaWYgaXQgY2hhbmdlZCwgcmVzZXQgdGhlIGJ1dHRvblxuICAgICAgICB0aGF0LmJ1dHRvblN0YXR1cyhvcHRpb25zLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIGZhbHNlKTtcbiAgICAgICAgLy8gU3dpdGNoIGJyYW5kIGxvZ29cbiAgICAgICAgaWYgKGV2ZW50LmJyYW5kKSB7XG4gICAgICAgICAgaWYgKCBldmVudC5icmFuZCA9PT0gJ2FtZXgnICkge1xuICAgICAgICAgICAgc3RyaXBlX3BheW1lbnRfdHlwZSA9ICdhbWV4JztcbiAgICAgICAgICB9ICAgICAgICAgIFxuICAgICAgICAgIHRoYXQuc2V0QnJhbmRJY29uKGV2ZW50LmJyYW5kKTtcbiAgICAgICAgfVxuICAgICAgICB0aGF0LmNhbGN1bGF0ZUZlZXModGhhdC5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCwgc3RyaXBlX3BheW1lbnRfdHlwZSk7XG4gICAgICAgIHRoYXQuc2V0UGF5bWVudEludGVudCgpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoYXQuY2FyZEV4cGlyeUVsZW1lbnQub24oJ2NoYW5nZScsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIC8vIGVycm9yIGhhbmRsaW5nXG4gICAgICAgIHRoYXQuc3RyaXBlRXJyb3JEaXNwbGF5KGV2ZW50LCAkKG9wdGlvbnMuY2NfZXhwX3NlbGVjdG9yLCBlbGVtZW50KSwgZWxlbWVudCwgb3B0aW9ucyApO1xuICAgICAgICAvLyBpZiBpdCBjaGFuZ2VkLCByZXNldCB0aGUgYnV0dG9uXG4gICAgICAgIHRoYXQuYnV0dG9uU3RhdHVzKG9wdGlvbnMsICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKSwgZmFsc2UpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoYXQuY2FyZEN2Y0VsZW1lbnQub24oJ2NoYW5nZScsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIC8vIGVycm9yIGhhbmRsaW5nXG4gICAgICAgIHRoYXQuc3RyaXBlRXJyb3JEaXNwbGF5KGV2ZW50LCAkKG9wdGlvbnMuY2NfY3Z2X3NlbGVjdG9yLCBlbGVtZW50KSwgZWxlbWVudCwgb3B0aW9ucyApO1xuICAgICAgICAvLyBpZiBpdCBjaGFuZ2VkLCByZXNldCB0aGUgYnV0dG9uXG4gICAgICAgIHRoYXQuYnV0dG9uU3RhdHVzKG9wdGlvbnMsICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKSwgZmFsc2UpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIHRoaXMgaXMgdGhlIG1ldGhvZCB0byBjcmVhdGUgYSBzaW5nbGUgY2FyZCBmaWVsZCBhbmQgbW91bnQgaXRcbiAgICAgIC8qdmFyIGNhcmQgPSB0aGF0LmVsZW1lbnRzLmNyZWF0ZShcbiAgICAgICAgJ2NhcmQnLFxuICAgICAgICB7XG4gICAgICAgICAgaGlkZVBvc3RhbENvZGU6IHRydWVcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICAgIC8vIEFkZCBhbiBpbnN0YW5jZSBvZiB0aGUgY2FyZCBVSSBjb21wb25lbnQgaW50byB0aGUgYGNhcmQtZWxlbWVudGAgPGRpdj5cbiAgICAgIGNhcmQubW91bnQoJyNjYXJkLWVsZW1lbnQnKTsqL1xuXG4gICAgfSwgLy8gY3JlZGl0Q2FyZEZpZWxkc1xuXG4gICAgc2V0QnJhbmRJY29uOiBmdW5jdGlvbihicmFuZCkge1xuICAgICAgdmFyIGNhcmRCcmFuZFRvUGZDbGFzcyA9IHtcbiAgICAgICAgJ3Zpc2EnOiAncGYtdmlzYScsXG4gICAgICAgICdtYXN0ZXJjYXJkJzogJ3BmLW1hc3RlcmNhcmQnLFxuICAgICAgICAnYW1leCc6ICdwZi1hbWVyaWNhbi1leHByZXNzJyxcbiAgICAgICAgJ2Rpc2NvdmVyJzogJ3BmLWRpc2NvdmVyJyxcbiAgICAgICAgJ2RpbmVycyc6ICdwZi1kaW5lcnMnLFxuICAgICAgICAnamNiJzogJ3BmLWpjYicsXG4gICAgICAgICd1bmtub3duJzogJ3BmLWNyZWRpdC1jYXJkJyxcbiAgICAgIH1cbiAgICAgIHZhciBicmFuZEljb25FbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JyYW5kLWljb24nKTtcbiAgICAgIHZhciBwZkNsYXNzID0gJ3BmLWNyZWRpdC1jYXJkJztcbiAgICAgIGlmIChicmFuZCBpbiBjYXJkQnJhbmRUb1BmQ2xhc3MpIHtcbiAgICAgICAgcGZDbGFzcyA9IGNhcmRCcmFuZFRvUGZDbGFzc1ticmFuZF07XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBpID0gYnJhbmRJY29uRWxlbWVudC5jbGFzc0xpc3QubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgYnJhbmRJY29uRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGJyYW5kSWNvbkVsZW1lbnQuY2xhc3NMaXN0W2ldKTtcbiAgICAgIH1cbiAgICAgIGJyYW5kSWNvbkVsZW1lbnQuY2xhc3NMaXN0LmFkZCgncGYnKTtcbiAgICAgIGJyYW5kSWNvbkVsZW1lbnQuY2xhc3NMaXN0LmFkZChwZkNsYXNzKTtcbiAgICB9LFxuXG4gICAgYWNoRmllbGRzOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICB2YXIgYmFua1Rva2VuRmllbGROYW1lID0gJ2JhbmtUb2tlbic7XG4gICAgICB2YXIgYmFua1Rva2VuRmllbGQgPSAnaW5wdXRbbmFtZT1cIicgKyBiYW5rVG9rZW5GaWVsZE5hbWUgKyAnXCJdJztcbiAgICAgIGlmIChvcHRpb25zLnBsYWlkX2VudiAhPSAnJyAmJiBvcHRpb25zLmtleSAhPSAnJyAmJiB0eXBlb2YgUGxhaWQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHZhciBsaW5rSGFuZGxlciA9IFBsYWlkLmNyZWF0ZSh7XG4gICAgICAgICAgc2VsZWN0QWNjb3VudDogdHJ1ZSxcbiAgICAgICAgICBhcGlWZXJzaW9uOiAndjInLFxuICAgICAgICAgIGVudjogb3B0aW9ucy5wbGFpZF9lbnYsXG4gICAgICAgICAgY2xpZW50TmFtZTogJ01pbm5Qb3N0JyxcbiAgICAgICAgICBrZXk6IG9wdGlvbnMucGxhaWRfcHVibGljX2tleSxcbiAgICAgICAgICBwcm9kdWN0OiAnYXV0aCcsXG4gICAgICAgICAgb25Mb2FkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vIFRoZSBMaW5rIG1vZHVsZSBmaW5pc2hlZCBsb2FkaW5nLlxuICAgICAgICAgIH0sXG4gICAgICAgICAgb25TdWNjZXNzOiBmdW5jdGlvbihwdWJsaWNfdG9rZW4sIG1ldGFkYXRhKSB7XG4gICAgICAgICAgICAvLyBUaGUgb25TdWNjZXNzIGZ1bmN0aW9uIGlzIGNhbGxlZCB3aGVuIHRoZSB1c2VyIGhhcyBzdWNjZXNzZnVsbHlcbiAgICAgICAgICAgIC8vIGF1dGhlbnRpY2F0ZWQgYW5kIHNlbGVjdGVkIGFuIGFjY291bnQgdG8gdXNlLlxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIFdoZW4gY2FsbGVkLCB5b3Ugd2lsbCBzZW5kIHRoZSBwdWJsaWNfdG9rZW4gYW5kIHRoZSBzZWxlY3RlZFxuICAgICAgICAgICAgLy8gYWNjb3VudCBJRCwgbWV0YWRhdGEuYWNjb3VudF9pZCwgdG8geW91ciBiYWNrZW5kIGFwcCBzZXJ2ZXIuXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gc2VuZERhdGFUb0JhY2tlbmRTZXJ2ZXIoe1xuICAgICAgICAgICAgLy8gICBwdWJsaWNfdG9rZW46IHB1YmxpY190b2tlbixcbiAgICAgICAgICAgIC8vICAgYWNjb3VudF9pZDogbWV0YWRhdGEuYWNjb3VudF9pZFxuICAgICAgICAgICAgLy8gfSk7XG5cbiAgICAgICAgICAgIC8vdGhpcy5kZWJ1ZygnUHVibGljIFRva2VuOiAnICsgcHVibGljX3Rva2VuKTtcbiAgICAgICAgICAgIC8vdGhpcy5kZWJ1ZygnQ3VzdG9tZXItc2VsZWN0ZWQgYWNjb3VudCBJRDogJyArIG1ldGFkYXRhLmFjY291bnRfaWQpO1xuXG4gICAgICAgICAgICB2YXIgc3VwcG9ydGZvcm0gPSAkKG9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpO1xuXG4gICAgICAgICAgICAvLyByZXNwb25zZSBjb250YWlucyBpZCBhbmQgY2FyZCwgd2hpY2ggY29udGFpbnMgYWRkaXRpb25hbCBjYXJkIGRldGFpbHNcbiAgICAgICAgICAgIC8vIEluc2VydCB0aGUgZGF0YSBpbnRvIHRoZSBmb3JtIHNvIGl0IGdldHMgc3VibWl0dGVkIHRvIHRoZSBzZXJ2ZXJcbiAgICAgICAgICAgIHN1cHBvcnRmb3JtLmFwcGVuZCgkKCc8aW5wdXQgdHlwZT1cXFwiaGlkZGVuXFxcIiBuYW1lPVxcXCJwdWJsaWNfdG9rZW5cXFwiIC8+JykudmFsKHB1YmxpY190b2tlbikpO1xuICAgICAgICAgICAgc3VwcG9ydGZvcm0uYXBwZW5kKCQoJzxpbnB1dCB0eXBlPVxcXCJoaWRkZW5cXFwiIG5hbWU9XFxcImFjY291bnRfaWRcXFwiIC8+JykudmFsKG1ldGFkYXRhLmFjY291bnRfaWQpKTtcblxuICAgICAgICAgICAgLy8gZ2V0IHRoZSBhY2NvdW50IHZhbGlkYXRlZCBieSBhamF4XG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICB1cmw6Jy9wbGFpZF90b2tlbi8nLFxuICAgICAgICAgICAgICAvL2NhY2hlOiBmYWxzZSxcbiAgICAgICAgICAgICAgZGF0YTogJChzdXBwb3J0Zm9ybSkuc2VyaWFsaXplKCksXG4gICAgICAgICAgICAgIHR5cGU6ICdQT1NUJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgIGlmICh0eXBlb2YgcmVzcG9uc2UuZXJyb3IgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgLy8gdGhlcmUgaXMgYW4gZXJyb3IuXG4gICAgICAgICAgICAgICAgJChvcHRpb25zLnBsYWlkX2xpbmspLnBhcmVudCgpLmFmdGVyKCc8cCBjbGFzcz1cImVycm9yXCI+JyArIHJlc3BvbnNlLmVycm9yICsgJzwvcD4nKVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vdGhpcy5kZWJ1ZygncHJpbnQgcmVzcG9uc2UgaGVyZScpO1xuICAgICAgICAgICAgICAgIC8vdGhpcy5kZWJ1ZyhyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgLy8gYWRkIHRoZSBmaWVsZChzKSB3ZSBuZWVkIHRvIHRoZSBmb3JtIGZvciBzdWJtaXR0aW5nXG4gICAgICAgICAgICAgICAgaWYgKCQoYmFua1Rva2VuRmllbGQpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICQoYmFua1Rva2VuRmllbGQpLnZhbChyZXNwb25zZS5zdHJpcGVfYmFua19hY2NvdW50X3Rva2VuKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgJChvcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5wcmVwZW5kKCQoJzxpbnB1dCB0eXBlPVxcXCJoaWRkZW5cXFwiIG5hbWU9XCInICsgYmFua1Rva2VuRmllbGROYW1lICsgJ1wiPicpLnZhbChyZXNwb25zZS5zdHJpcGVfYmFua19hY2NvdW50X3Rva2VuKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICQob3B0aW9ucy5wbGFpZF9saW5rLCBlbGVtZW50KS5odG1sKCc8c3Ryb25nPllvdXIgYWNjb3VudCB3YXMgc3VjY2Vzc2Z1bGx5IGF1dGhvcml6ZWQ8L3N0cm9uZz4nKS5jb250ZW50cygpLnVud3JhcCgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmVycm9yKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICQob3B0aW9ucy5wbGFpZF9saW5rKS5wYXJlbnQoKS5hZnRlcignPHAgY2xhc3M9XCJlcnJvclwiPicgKyByZXNwb25zZS5lcnJvciArICc8L3A+JylcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgb25FeGl0OiBmdW5jdGlvbihlcnIsIG1ldGFkYXRhKSB7XG4gICAgICAgICAgICAvLyBUaGUgdXNlciBleGl0ZWQgdGhlIExpbmsgZmxvdy5cbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgICAgJChvcHRpb25zLnBsYWlkX2xpbmssIGVsZW1lbnQpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAkKG9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IgKyAnIC5lcnJvcicpLnJlbW92ZSgpOyAvLyByZW1vdmUgbWV0aG9kIGVycm9yIG1lc3NhZ2UgaWYgaXQgaXMgdGhlcmVcbiAgICAgICAgICBsaW5rSGFuZGxlci5vcGVuKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sIC8vIGFjaEZpZWxkc1xuXG4gICAgaGFzSHRtbDVWYWxpZGF0aW9uOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICAvL3RoaXMuZGVidWcoJ3ZhbHVlIGlzICcgKyB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKS5jaGVja1ZhbGlkaXR5ID09PSAnZnVuY3Rpb24nKTtcbiAgICAgIHJldHVybiB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKS5jaGVja1ZhbGlkaXR5ID09PSAnZnVuY3Rpb24nO1xuICAgIH0sIC8vIGhhc0h0bWw1VmFsaWRhdGlvblxuXG4gICAgYnV0dG9uU3RhdHVzOiBmdW5jdGlvbihvcHRpb25zLCBidXR0b24sIGRpc2FibGVkKSB7XG4gICAgICAvLyBtYWtlIHRoZSBidXR0b24gY2xpY2thYmxlIG9yIG5vdFxuICAgICAgYnV0dG9uLnByb3AoJ2Rpc2FibGVkJywgZGlzYWJsZWQpO1xuICAgICAgaWYgKGRpc2FibGVkID09PSBmYWxzZSkge1xuICAgICAgICBidXR0b24udGV4dChvcHRpb25zLmJ1dHRvbl90ZXh0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJ1dHRvbi50ZXh0KCdQcm9jZXNzaW5nJyk7XG4gICAgICB9XG4gICAgfSwgLy8gYnV0dG9uU3RhdHVzXG5cbiAgICB2YWxpZGF0ZUFuZFN1Ym1pdDogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgJChvcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5zdWJtaXQoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAvLyBkbyBzb21lIGZhbGxiYWNrIHN0dWZmIGZvciBub24taHRtbDUgYnJvd3NlcnNcbiAgICAgICAgaWYgKHRoYXQuaGFzSHRtbDVWYWxpZGF0aW9uKGVsZW1lbnQsIG9wdGlvbnMpKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuY2hlY2tWYWxpZGl0eSgpKSB7XG4gICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2ludmFsaWQnKTtcbiAgICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogJCh0aGlzKS5maW5kKCdpbnB1dDppbnZhbGlkJykucGFyZW50KCkub2Zmc2V0KCkudG9wXG4gICAgICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICAgICAgICAvL3RoaXMuZGVidWcoJ3RvcCBpcyAnICsgKTtcbiAgICAgICAgICAgICAgJCh0aGlzKS5maW5kKCdpbnB1dDppbnZhbGlkJykucGFyZW50KCkuYWRkQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpbnZhbGlkJyk7XG4gICAgICAgICAgICAgICQodGhpcykuZmluZCgnaW5wdXQ6aW52YWxpZCcpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdlcnJvcicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gdmFsaWRhdGUgYW5kIHN1Ym1pdCB0aGUgZm9ybVxuICAgICAgICAkKCcuY2hlY2stZmllbGQnKS5yZW1vdmUoKTtcbiAgICAgICAgJCgnaW5wdXQsIGxhYmVsJywgZWxlbWVudCkucmVtb3ZlQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgIHZhciB2YWxpZCA9IHRydWU7XG4gICAgICAgIHZhciBwYXltZW50X3R5cGUgPSAkKCdpbnB1dFtuYW1lPVwic3RyaXBlX3BheW1lbnRfdHlwZVwiXScpLnZhbCgpO1xuICAgICAgICAkKHRoYXQub3B0aW9ucy5jaG9vc2VfcGF5bWVudCArICcgaW5wdXQnKS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJCh0aGF0Lm9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IgKyAnIC5lcnJvcicpLnJlbW92ZSgpOyAvLyByZW1vdmUgbWV0aG9kIGVycm9yIG1lc3NhZ2UgaWYgaXQgaXMgdGhlcmVcbiAgICAgICAgICAvLyBpZiBhIHBheW1lbnQgZmllbGQgY2hhbmdlZCwgcmVzZXQgdGhlIGJ1dHRvblxuICAgICAgICAgIHRoYXQuYnV0dG9uU3RhdHVzKG9wdGlvbnMsICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKSwgZmFsc2UpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAocGF5bWVudF90eXBlID09PSAnYmFua19hY2NvdW50Jykge1xuICAgICAgICAgIGlmICgkKCdpbnB1dFtuYW1lPVwiYmFua1Rva2VuXCJdJykubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB2YWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgJCh0aGF0Lm9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IpLnByZXBlbmQoJzxwIGNsYXNzPVwiZXJyb3JcIj5Zb3UgYXJlIHJlcXVpcmVkIHRvIGVudGVyIGNyZWRpdCBjYXJkIGluZm9ybWF0aW9uLCBvciB0byBhdXRob3JpemUgTWlublBvc3QgdG8gY2hhcmdlIHlvdXIgYmFuayBhY2NvdW50LCB0byBtYWtlIGEgcGF5bWVudC48L3A+Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbGlkID09PSB0cnVlKSB7XG4gICAgICAgICAgLy8gMS4gc2V0IHVwIHRoZSBidXR0b24gYW5kIHJlbW92ZSB0aGUgaGlkZGVuIGZpZWxkcyB3ZSBkb24ndCBuZWVkXG4gICAgICAgICAgdGhhdC5idXR0b25TdGF0dXModGhhdC5vcHRpb25zLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIHRydWUpO1xuICAgICAgICAgIHZhciB0b2tlbkRhdGEgPSB0aGF0LmdlbmVyYXRlVG9rZW5EYXRhKCk7XG5cbiAgICAgICAgICAvLyAyLiBjcmVhdGUgbWlubnBvc3QgYWNjb3VudCBpZiBzcGVjaWZpZWRcbiAgICAgICAgICBpZiAodGhhdC5vcHRpb25zLmNyZWF0ZV9hY2NvdW50ID09PSB0cnVlKSB7XG4gICAgICAgICAgICB2YXIgdXNlciA9IHtcbiAgICAgICAgICAgICAgZW1haWw6ICQodGhhdC5vcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICAgICAgZmlyc3RfbmFtZTogJCh0aGF0Lm9wdGlvbnMuZmlyc3RfbmFtZV9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgICAgIGxhc3RfbmFtZTogJCh0aGF0Lm9wdGlvbnMubGFzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICAgICAgcGFzc3dvcmQ6ICQodGhhdC5vcHRpb25zLnBhc3N3b3JkX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICAgICAgY2l0eTogJCh0aGF0Lm9wdGlvbnMuYWNjb3VudF9jaXR5X3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICAgICAgc3RhdGU6ICQodGhhdC5vcHRpb25zLmFjY291bnRfc3RhdGVfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgICAgICB6aXA6ICQodGhhdC5vcHRpb25zLmFjY291bnRfemlwX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgdXJsOiB0aGF0Lm9wdGlvbnMubWlubnBvc3Rfcm9vdCArICcvd3AtanNvbi91c2VyLWFjY291bnQtbWFuYWdlbWVudC92MS9jcmVhdGUtdXNlcicsXG4gICAgICAgICAgICAgIGRhdGE6IHVzZXJcbiAgICAgICAgICAgIH0pLmRvbmUoZnVuY3Rpb24oIGRhdGEgKSB7XG4gICAgICAgICAgICAgIGlmIChkYXRhLnN0YXR1cyA9PT0gJ3N1Y2Nlc3MnICYmIGRhdGEucmVhc29uID09PSAnbmV3IHVzZXInKSB7XG4gICAgICAgICAgICAgICAgLy8gdXNlciBjcmVhdGVkIC0gdGhleSBzaG91bGQgcmVjZWl2ZSBlbWFpbFxuICAgICAgICAgICAgICAgIC8vIHN1Ym1pdCB0aGUgZm9ybVxuICAgICAgICAgICAgICAgIC8vc3VwcG9ydGZvcm0uZ2V0KDApLnN1Ym1pdCgpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIHVzZXIgbm90IGNyZWF0ZWRcbiAgICAgICAgICAgICAgICAvLyBzdGlsbCBzdWJtaXQgdGhlIGZvcm1cbiAgICAgICAgICAgICAgICAvL3N1cHBvcnRmb3JtLmdldCgwKS5zdWJtaXQoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCQoJ2lucHV0W25hbWU9XCJiYW5rVG9rZW5cIl0nKS5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgLy8gZmluYWxseSwgdHJ5IHRvIGNoYXJnZSBpdCBpZiBpdCBpcyBub3QgYWNoXG4gICAgICAgICAgICB0aGF0LmNvbmZpcm1DYXJkUGF5bWVudCh0aGF0LmNhcmROdW1iZXJFbGVtZW50KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gaWYgaXQgaXMgYWNoLCB3ZSBhbHJlYWR5IGhhdmUgYSB0b2tlbiBzbyBwYXNzIGl0IHRvIHN0cmlwZS5cbiAgICAgICAgICAgIHRoYXQuc3RyaXBlVG9rZW5IYW5kbGVyKCAkKCcjYmFua1Rva2VuJykudmFsKCksICdiYW5rX2FjY291bnQnICk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIHRoaXMgbWVhbnMgdmFsaWQgaXMgZmFsc2VcbiAgICAgICAgICB0aGF0LmJ1dHRvblN0YXR1cyh0aGF0Lm9wdGlvbnMsICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKSwgZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgIH0pO1xuICAgIH0sIC8vIHZhbGlkYXRlQW5kU3VibWl0XG5cbiAgICBjb25maXJtQ2FyZFBheW1lbnQ6IGZ1bmN0aW9uKGNhcmRFbGVtZW50KSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB2YXIgc3VwcG9ydGZvcm0gPSAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3Rvcik7XG4gICAgICB2YXIgZmllbGQ7XG4gICAgICB2YXIgbWVzc2FnZTtcbiAgICAgIHZhciBwYXltZW50X21ldGhvZFxuICAgICAgaW50ZW50ID0gdGhhdC5nZXRQYXltZW50SW50ZW50KCk7XG4gICAgICB0aGF0LnN0cmlwZS5jb25maXJtQ2FyZFBheW1lbnQoXG4gICAgICAgIGludGVudCxcbiAgICAgICAge1xuICAgICAgICAgIHBheW1lbnRfbWV0aG9kOiB7Y2FyZDogY2FyZEVsZW1lbnR9XG4gICAgICAgIH1cbiAgICAgICkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgaWYgKHJlc3VsdC5lcnJvcikge1xuICAgICAgICAgIC8vIFNob3cgdGhlIGVycm9ycyBvbiB0aGUgZm9ybVxuICAgICAgICAgIHRoYXQuYnV0dG9uU3RhdHVzKHRoYXQub3B0aW9ucywgc3VwcG9ydGZvcm0uZmluZCgnYnV0dG9uJyksIGZhbHNlKTtcbiAgICAgICAgICBmaWVsZCA9IHJlc3VsdC5lcnJvci5maWVsZCArICdfZmllbGRfc2VsZWN0b3InO1xuICAgICAgICAgIG1lc3NhZ2UgPSAnJztcbiAgICAgICAgICBpZiAodHlwZW9mIHJlc3VsdC5lcnJvci5tZXNzYWdlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgbWVzc2FnZSA9IHJlc3VsdC5lcnJvci5tZXNzYWdlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtZXNzYWdlID0gcmVzdWx0LmVycm9yLm1lc3NhZ2VbMF07XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICgkKGZpZWxkKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAkKHRoYXQub3B0aW9uc1tmaWVsZF0sIGVsZW1lbnQpLmFkZENsYXNzKCdlcnJvcicpO1xuICAgICAgICAgICAgJCh0aGF0Lm9wdGlvbnNbZmllbGRdLCBlbGVtZW50KS5wcmV2KCkuYWRkQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICAgICAkKHRoYXQub3B0aW9uc1tmaWVsZF0sIGVsZW1lbnQpLmFmdGVyKCc8c3BhbiBjbGFzcz1cImNoZWNrLWZpZWxkIGludmFsaWRcIj4nICsgbWVzc2FnZSArICc8L3NwYW4+Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vdGhhdC5kZWJ1ZyhyZXN1bHQpO1xuICAgICAgICAgIHBheW1lbnRfbWV0aG9kID0gcmVzdWx0LnBheW1lbnRJbnRlbnQucGF5bWVudF9tZXRob2Q7XG4gICAgICAgICAgY29uc29sZS5kaXIocmVzdWx0KTtcbiAgICAgICAgICAvLyBTZW5kIHRoZSBwYXltZW50IG1ldGhvZCB0byB0aGUgc2VydmVyXG4gICAgICAgICAgLy90aGF0LnN0cmlwZVBheW1lbnRIYW5kbGVyKHBheW1lbnRfbWV0aG9kKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICB9LFxuXG4gICAgc3RyaXBlRXJyb3JEaXNwbGF5OiBmdW5jdGlvbihldmVudCwgdGhpc19zZWxlY3RvciwgZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgLy8gbGlzdGVuIGZvciBlcnJvcnMgYW5kIGRpc3BsYXkvaGlkZSBlcnJvciBtZXNzYWdlc1xuICAgICAgdmFyIHdoaWNoX2Vycm9yID0gdGhpc19zZWxlY3Rvci5hdHRyKCdpZCcpO1xuICAgICAgLy8gd2hlbiB0aGlzIGZpZWxkIGNoYW5nZXMsIHJlc2V0IGl0cyBlcnJvcnNcbiAgICAgICQoJy5jYXJkLWluc3RydWN0aW9uLicgKyB3aGljaF9lcnJvcikucmVtb3ZlQ2xhc3MoJ2ludmFsaWQnKTtcbiAgICAgICQoJy5jYXJkLWluc3RydWN0aW9uLicgKyB3aGljaF9lcnJvcikuZW1wdHkoKTtcbiAgICAgIGlmIChldmVudC5lcnJvcikge1xuICAgICAgICAkKCcuY2FyZC1pbnN0cnVjdGlvbi4nICsgd2hpY2hfZXJyb3IpLnRleHQoZXZlbnQuZXJyb3IubWVzc2FnZSArICcgUGxlYXNlIHRyeSBhZ2Fpbi4nKTtcbiAgICAgICAgJCgnLmNhcmQtaW5zdHJ1Y3Rpb24uJyArIHdoaWNoX2Vycm9yKS5hZGRDbGFzcygnaW52YWxpZCcpO1xuICAgICAgICB0aGlzX3NlbGVjdG9yLnBhcmVudCgpLmFkZENsYXNzKCdlcnJvcicpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJCgnLmNhcmQtaW5zdHJ1Y3Rpb24uJyArIHdoaWNoX2Vycm9yKS5yZW1vdmVDbGFzcygnaW52YWxpZCcpO1xuICAgICAgICAkKCcuY2FyZC1pbnN0cnVjdGlvbi4nICsgd2hpY2hfZXJyb3IpLmVtcHR5KCk7XG4gICAgICAgICQob3B0aW9ucy5jY19udW1fc2VsZWN0b3IsIGVsZW1lbnQpLnJlbW92ZUNsYXNzKCdlcnJvcicpO1xuICAgICAgICAkKG9wdGlvbnMuY2NfZXhwX3NlbGVjdG9yLCBlbGVtZW50KS5yZW1vdmVDbGFzcygnZXJyb3InKTtcbiAgICAgICAgJChvcHRpb25zLmNjX2N2dl9zZWxlY3RvciwgZWxlbWVudCkucmVtb3ZlQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICQob3B0aW9ucy5jY19udW1fc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdlcnJvcicpO1xuICAgICAgICAkKG9wdGlvbnMuY2NfZXhwX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnZXJyb3InKTtcbiAgICAgICAgJChvcHRpb25zLmNjX2N2dl9zZWxlY3RvciwgZWxlbWVudCkucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICB9XG4gICAgfSwgLy8gc3RyaXBlRXJyb3JEaXNwbGF5XG5cbiAgICBnZW5lcmF0ZVRva2VuRGF0YTogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgdG9rZW5EYXRhID0ge307XG4gICAgICB2YXIgZnVsbF9uYW1lID0gJyc7XG4gICAgICBpZiAoJCgnI2Z1bGxfbmFtZScpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZnVsbF9uYW1lID0gJCgnI2Z1bGxfbmFtZScpLnZhbCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZnVsbF9uYW1lID0gJCgnI2ZpcnN0X25hbWUnKS52YWwoKSArICcgJyArICQoJyNsYXN0X25hbWUnKS52YWwoKTtcbiAgICAgIH1cbiAgICAgIHRva2VuRGF0YS5uYW1lID0gZnVsbF9uYW1lO1xuXG4gICAgICB2YXIgc3RyZWV0ID0gJ05vbmUnO1xuICAgICAgaWYgKCQoJ2lucHV0W25hbWU9XCJmdWxsX2FkZHJlc3NcIl0nKS52YWwoKSAhPSAnJykge1xuICAgICAgICBzdHJlZXQgPSAkKCcjZnVsbF9hZGRyZXNzJykudmFsKCk7XG4gICAgICAgIGlmICgkKCdpbnB1dFtuYW1lPVwiYmlsbGluZ19zdHJlZXRcIl0nKS52YWwoKSAhPSAnJykge1xuICAgICAgICAgIHN0cmVldCA9ICQoJ2lucHV0W25hbWU9XCJiaWxsaW5nX3N0cmVldFwiXScpLnZhbCgpO1xuICAgICAgICB9XG4gICAgICAgIHRva2VuRGF0YS5hZGRyZXNzX2xpbmUxID0gc3RyZWV0O1xuICAgICAgfVxuXG4gICAgICB2YXIgY2l0eSA9ICdOb25lJztcbiAgICAgIGlmICgkKCdpbnB1dFtuYW1lPVwiYmlsbGluZ19jaXR5XCJdJykudmFsKCkgIT0gJycpIHtcbiAgICAgICAgY2l0eSA9ICQoJ2lucHV0W25hbWU9XCJiaWxsaW5nX2NpdHlcIl0nKS52YWwoKTtcbiAgICAgICAgdG9rZW5EYXRhLmFkZHJlc3NfY2l0eSA9IGNpdHk7XG4gICAgICB9XG5cbiAgICAgIHZhciBzdGF0ZSA9ICdOb25lJztcbiAgICAgIGlmICgkKCdpbnB1dFtuYW1lPVwiYmlsbGluZ19zdGF0ZVwiXScpLnZhbCgpICE9ICcnKSB7XG4gICAgICAgIHN0YXRlID0gJCgnaW5wdXRbbmFtZT1cImJpbGxpbmdfc3RhdGVcIl0nKS52YWwoKTtcbiAgICAgICAgdG9rZW5EYXRhLmFkZHJlc3Nfc3RhdGUgPSBzdGF0ZTtcbiAgICAgIH1cblxuICAgICAgdmFyIHppcCA9ICdOb25lJztcbiAgICAgIGlmICgkKCdpbnB1dFtuYW1lPVwiYmlsbGluZ196aXBcIl0nKS52YWwoKSAhPSAnJykge1xuICAgICAgICB6aXAgPSAkKCdpbnB1dFtuYW1lPVwiYmlsbGluZ196aXBcIl0nKS52YWwoKTtcbiAgICAgICAgdG9rZW5EYXRhLmFkZHJlc3NfemlwID0gemlwO1xuICAgICAgfVxuXG4gICAgICB2YXIgY291bnRyeSA9ICdVUyc7XG4gICAgICBpZiAoJCgnaW5wdXRbbmFtZT1cImJpbGxpbmdfY291bnRyeVwiXScpLnZhbCgpICE9ICcnKSB7XG4gICAgICAgIGNvdW50cnkgPSAkKCdpbnB1dFtuYW1lPVwiYmlsbGluZ19jb3VudHJ5XCJdJykudmFsKCk7XG4gICAgICB9XG4gICAgICB0b2tlbkRhdGEuYWRkcmVzc19jb3VudHJ5ID0gY291bnRyeTtcblxuICAgICAgcmV0dXJuIHRva2VuRGF0YTtcbiAgICB9LCAvLyBnZW5lcmF0ZVRva2VuRGF0YVxuXG4gICAgY3JlYXRlVG9rZW46IGZ1bmN0aW9uKGNhcmQsIHRva2VuRGF0YSkge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdGhhdC5zdHJpcGUuY3JlYXRlVG9rZW4oY2FyZCwgdG9rZW5EYXRhKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICBpZiAocmVzdWx0LmVycm9yKSB7XG4gICAgICAgICAgLy8gU2hvdyB0aGUgZXJyb3JzIG9uIHRoZSBmb3JtXG4gICAgICAgICAgdGhhdC5idXR0b25TdGF0dXModGhhdC5vcHRpb25zLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIGZhbHNlKTtcbiAgICAgICAgICB2YXIgZmllbGQgPSByZXN1bHQuZXJyb3IuZmllbGQgKyAnX2ZpZWxkX3NlbGVjdG9yJztcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9ICcnO1xuICAgICAgICAgIGlmICh0eXBlb2YgcmVzdWx0LmVycm9yLm1lc3NhZ2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBtZXNzYWdlID0gcmVzdWx0LmVycm9yLm1lc3NhZ2U7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1lc3NhZ2UgPSByZXN1bHQuZXJyb3IubWVzc2FnZVswXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCQoZmllbGQpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICQodGhhdC5vcHRpb25zW2ZpZWxkXSwgZWxlbWVudCkuYWRkQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICAgICAkKHRoYXQub3B0aW9uc1tmaWVsZF0sIGVsZW1lbnQpLnByZXYoKS5hZGRDbGFzcygnZXJyb3InKTtcbiAgICAgICAgICAgICQodGhhdC5vcHRpb25zW2ZpZWxkXSwgZWxlbWVudCkuYWZ0ZXIoJzxzcGFuIGNsYXNzPVwiY2hlY2stZmllbGQgaW52YWxpZFwiPicgKyBtZXNzYWdlICsgJzwvc3Bhbj4nKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gU2VuZCB0aGUgdG9rZW4gdG8geW91ciBzZXJ2ZXJcbiAgICAgICAgICB0aGF0LnN0cmlwZVRva2VuSGFuZGxlcihyZXN1bHQudG9rZW4sICdjYXJkJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sIC8vIGNyZWF0ZVRva2VuXG5cbiAgICBzdHJpcGVQYXltZW50SGFuZGxlcjogZnVuY3Rpb24ocGF5bWVudF9tZXRob2QsIHR5cGUpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHZhciBzdXBwb3J0Zm9ybSA9ICQodGhpcy5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKTtcbiAgICAgIHZhciBhamF4X3VybCA9ICcnO1xuICAgICAgdmFyIHRva2VuRmllbGROYW1lID0gJ3N0cmlwZVRva2VuJztcbiAgICAgIHZhciB0b2tlbkZpZWxkID0gJ2lucHV0W25hbWU9XCInICsgdG9rZW5GaWVsZE5hbWUgKyAnXCJdJztcbiAgICAgIGlmICh0eXBlb2YgJChzdXBwb3J0Zm9ybSkuZGF0YSgnYWN0aW9uJykgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGFqYXhfdXJsID0gJChzdXBwb3J0Zm9ybSkuZGF0YSgnYWN0aW9uJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhamF4X3VybCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcbiAgICAgIH1cbiAgICAgIC8vIEluc2VydCB0aGUgcGF5bWVudCBtZXRob2QgSUQgaW50byB0aGUgZm9ybSBzbyBpdCBnZXRzIHN1Ym1pdHRlZCB0byB0aGUgc2VydmVyXG4gICAgICBpZiAoIHR5cGUgPT09ICdjYXJkJyApIHtcbiAgICAgICAgaWYgKHRva2VuLmNhcmQuYnJhbmQubGVuZ3RoID4gMCAmJiB0b2tlbi5jYXJkLmJyYW5kID09PSAnQW1lcmljYW4gRXhwcmVzcycpIHtcbiAgICAgICAgICB0eXBlID0gJ2FtZXgnO1xuICAgICAgICB9XG4gICAgICAgIGlmICgkKHRva2VuRmllbGQpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAkKHRva2VuRmllbGQpLnZhbCh0b2tlbi5pZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3VwcG9ydGZvcm0uYXBwZW5kKCQoJzxpbnB1dCB0eXBlPVxcXCJoaWRkZW5cXFwiIG5hbWU9XCInICsgdG9rZW5GaWVsZE5hbWUgKyAnXCI+JykudmFsKHRva2VuLmlkKSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgJCgnaW5wdXRbbmFtZT1cInN0cmlwZV9wYXltZW50X3R5cGVcIl0nKS52YWwodHlwZSk7XG5cbiAgICAgIC8vIFN1Ym1pdCB0aGUgZm9ybVxuICAgICAgLy8gdGhlIHdheSBpdCB3b3JrcyBjdXJyZW50bHkgaXMgdGhlIGZvcm0gc3VibWl0cyBhbiBhamF4IHJlcXVlc3QgdG8gaXRzZWxmXG4gICAgICAvLyB0aGVuIGl0IHN1Ym1pdHMgYSBwb3N0IHJlcXVlc3QgdG8gdGhlIGZvcm0ncyBhY3Rpb24gdXJsXG4gICAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IGFqYXhfdXJsLFxuICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgIGRhdGE6ICQoc3VwcG9ydGZvcm0pLnNlcmlhbGl6ZSgpLFxuICAgICAgICB0eXBlOiAnUE9TVCdcbiAgICAgIH0pXG4gICAgICAuZG9uZShmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICBpZiAodHlwZW9mIHJlc3BvbnNlLmVycm9ycyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAvLyBkbyBub3Qgc3VibWl0LiB0aGVyZSBpcyBhbiBlcnJvci5cbiAgICAgICAgICB0aGF0LmJ1dHRvblN0YXR1cyh0aGF0Lm9wdGlvbnMsICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKSwgZmFsc2UpO1xuICAgICAgICAgIC8vIGFkZCBzb21lIGVycm9yIG1lc3NhZ2VzIGFuZCBzdHlsZXNcbiAgICAgICAgICAkLmVhY2gocmVzcG9uc2UuZXJyb3JzLCBmdW5jdGlvbiggaW5kZXgsIGVycm9yICkge1xuICAgICAgICAgICAgdmFyIGZpZWxkID0gZXJyb3IuZmllbGQgKyAnX2ZpZWxkX3NlbGVjdG9yJztcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gJyc7XG4gICAgICAgICAgICB2YXIgc3RyaXBlRXJyb3JTZWxlY3RvciA9ICcnO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBlcnJvci5tZXNzYWdlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICBtZXNzYWdlID0gZXJyb3IubWVzc2FnZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIG1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlWzBdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCQodGhhdC5vcHRpb25zW2ZpZWxkXSkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAkKHRoYXQub3B0aW9uc1tmaWVsZF0pLmFkZENsYXNzKCdlcnJvcicpO1xuICAgICAgICAgICAgICAkKHRoYXQub3B0aW9uc1tmaWVsZF0pLnByZXYoKS5hZGRDbGFzcygnZXJyb3InKTtcbiAgICAgICAgICAgICAgJCh0aGF0Lm9wdGlvbnNbZmllbGRdKS5hZnRlcignPHNwYW4gY2xhc3M9XCJjaGVjay1maWVsZCBpbnZhbGlkXCI+JyArIG1lc3NhZ2UgKyAnPC9zcGFuPicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGVycm9yICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICB0aGF0LmJ1dHRvblN0YXR1cyh0aGF0Lm9wdGlvbnMsICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKSwgZmFsc2UsICdjYXJkJyk7XG4gICAgICAgICAgICAgIGlmIChlcnJvci5jb2RlID09ICdpbnZhbGlkX251bWJlcicgfHwgZXJyb3IuY29kZSA9PSAnaW5jb3JyZWN0X251bWJlcicgfHwgZXJyb3IuY29kZSA9PSAnY2FyZF9kZWNsaW5lZCcgfHwgZXJyb3IuY29kZSA9PSAncHJvY2Vzc2luZ19lcnJvcicpIHtcbiAgICAgICAgICAgICAgICAvLyBlcnJvciBoYW5kbGluZ1xuICAgICAgICAgICAgICAgIHN0cmlwZUVycm9yU2VsZWN0b3IgPSAkKHRoYXQub3B0aW9ucy5jY19udW1fc2VsZWN0b3IpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKGVycm9yLmNvZGUgPT0gJ2ludmFsaWRfZXhwaXJ5X21vbnRoJyB8fCBlcnJvci5jb2RlID09ICdpbnZhbGlkX2V4cGlyeV95ZWFyJyB8fCBlcnJvci5jb2RlID09ICdleHBpcmVkX2NhcmQnKSB7XG4gICAgICAgICAgICAgICAgLy8gZXJyb3IgaGFuZGxpbmdcbiAgICAgICAgICAgICAgICBzdHJpcGVFcnJvclNlbGVjdG9yID0gJCh0aGF0Lm9wdGlvbnMuY2NfZXhwX3NlbGVjdG9yKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmIChlcnJvci5jb2RlID09ICdpbnZhbGlkX2N2YycgfHwgZXJyb3IuY29kZSA9PSAnaW5jb3JyZWN0X2N2YycpIHtcbiAgICAgICAgICAgICAgICAvLyBlcnJvciBoYW5kbGluZ1xuICAgICAgICAgICAgICAgIHN0cmlwZUVycm9yU2VsZWN0b3IgPSAkKHRoYXQub3B0aW9ucy5jY19jdnZfc2VsZWN0b3IpO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKHN0cmlwZUVycm9yU2VsZWN0b3IgIT09ICcnKSB7XG4gICAgICAgICAgICAgICAgdGhhdC5zdHJpcGVFcnJvckRpc3BsYXkocmVzcG9uc2UuZXJyb3JzLCBzdHJpcGVFcnJvclNlbGVjdG9yLCB0aGF0LmVsZW1lbnQsIHRoYXQub3B0aW9ucyApO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKGVycm9yLmZpZWxkID09ICdyZWNhcHRjaGEnKSB7XG4gICAgICAgICAgICAgICAgJCgnYnV0dG9uLmdpdmUnKS5iZWZvcmUoJzxwIGNsYXNzPVwicmVjYXB0Y2hhLWVycm9yXCI+JyArIG1lc3NhZ2UgKyAnPC9wPicpXG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAoZXJyb3IudHlwZSA9PSAnaW52YWxpZF9yZXF1ZXN0X2Vycm9yJykge1xuICAgICAgICAgICAgICAgICQoJ2J1dHRvbi5naXZlJykuYmVmb3JlKCc8cCBjbGFzcz1cImVycm9yIGVycm9yLWludmFsaWQtcmVxdWVzdFwiPicgKyBlcnJvci5tZXNzYWdlICsgJzwvcD4nKVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHR5cGVvZiByZXNwb25zZS5lcnJvcnNbMF0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgIHZhciBmaWVsZCA9IHJlc3BvbnNlLmVycm9yc1swXS5maWVsZCArICdfZmllbGRfc2VsZWN0b3InO1xuICAgICAgICAgICAgICBpZiAoJChmaWVsZCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogJChvcHRpb25zW2ZpZWxkXSkucGFyZW50KCkub2Zmc2V0KCkudG9wXG4gICAgICAgICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdXBwb3J0Zm9ybS5nZXQoMCkuc3VibWl0KCk7IC8vIGNvbnRpbnVlIHN1Ym1pdHRpbmcgdGhlIGZvcm0gaWYgdGhlIGFqYXggd2FzIHN1Y2Nlc3NmdWxcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5lcnJvcihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICB0aGF0LmJ1dHRvblN0YXR1cyh0aGF0Lm9wdGlvbnMsICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKSwgZmFsc2UpO1xuICAgICAgfSk7XG5cbiAgICB9LFxuXG4gICAgc2hvd05ld3NsZXR0ZXJTZXR0aW5nczogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuXG4gICAgICB2YXIgbmV3c2xldHRlcl9ncm91cF9odG1sID0gJyc7XG4gICAgICBpZiAoJChvcHRpb25zLm5ld3NsZXR0ZXJfZ3JvdXBfc2VsZWN0b3IpLmxlbmd0aCA+IDAgKSB7XG4gICAgICAgIHZhciBnZXRfZGF0YSA9IHtcbiAgICAgICAgICBzaG9ydGNvZGU6ICduZXdzbGV0dGVyX2Zvcm0nLFxuICAgICAgICAgIHBsYWNlbWVudDogJ3VzZXJhY2NvdW50J1xuICAgICAgICB9O1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgdXJsOiBvcHRpb25zLm1pbm5wb3N0X3Jvb3QgKyAnL3dwLWpzb24vbWlubnBvc3QtYXBpL3YyL21haWxjaGltcC9mb3JtJyxcbiAgICAgICAgICBkYXRhOiBnZXRfZGF0YVxuICAgICAgICB9KS5kb25lKGZ1bmN0aW9uKCByZXN1bHQgKSB7XG4gICAgICAgICAgaWYgKCB0eXBlb2YgcmVzdWx0Lmdyb3VwX2ZpZWxkcyAhPT0gJ3VuZGVmaW5lZCcgKSB7XG4gICAgICAgICAgICAkLmVhY2gocmVzdWx0Lmdyb3VwX2ZpZWxkcywgZnVuY3Rpb24oIGluZGV4LCBjYXRlZ29yeSApIHtcbiAgICAgICAgICAgICAgbmV3c2xldHRlcl9ncm91cF9odG1sICs9ICc8ZmllbGRzZXQgY2xhc3M9XCJtLWZvcm0taXRlbSBzdXBwb3J0LW5ld3NsZXR0ZXIgbS1mb3JtLWl0ZW0tJyArIGNhdGVnb3J5LnR5cGUgKyAnXCI+JztcbiAgICAgICAgICAgICAgbmV3c2xldHRlcl9ncm91cF9odG1sICs9ICc8bGFiZWw+JyArIGNhdGVnb3J5Lm5hbWUgKyAnOjwvbGFiZWw+JztcbiAgICAgICAgICAgICAgaWYgKCBjYXRlZ29yeS5jb250YWlucy5sZW5ndGggPiAwICkge1xuICAgICAgICAgICAgICAgIG5ld3NsZXR0ZXJfZ3JvdXBfaHRtbCArPSAnPGRpdiBjbGFzcz1cImZvcm0taXRlbSBmb3JtLWl0ZW0tLW5ld3NsZXR0ZXJcIj4nO1xuICAgICAgICAgICAgICAgICQuZWFjaChjYXRlZ29yeVtjYXRlZ29yeS5jb250YWluc10sIGZ1bmN0aW9uKCBpbmRleCwgaXRlbSApIHtcbiAgICAgICAgICAgICAgICAgIG5ld3NsZXR0ZXJfZ3JvdXBfaHRtbCArPSAnPGxhYmVsPjxpbnB1dCBuYW1lPVwiZ3JvdXBzX3N1Ym1pdHRlZFwiIHR5cGU9XCJjaGVja2JveFwiIHZhbHVlPVwiJyArIGl0ZW0uaWQgKyAnXCI+JyArIGl0ZW0ubmFtZSArICc8L2xhYmVsPic7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbmV3c2xldHRlcl9ncm91cF9odG1sICs9ICc8L2Rpdj4nO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIG5ld3NsZXR0ZXJfZ3JvdXBfaHRtbCArPSAnPC9maWVsZHNldD4nO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkKG9wdGlvbnMubmV3c2xldHRlcl9ncm91cF9zZWxlY3RvcikuaHRtbChuZXdzbGV0dGVyX2dyb3VwX2h0bWwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmICgkKG9wdGlvbnMubmV3c2xldHRlcl9ncm91cF9zZWxlY3RvcikubGVuZ3RoID4gMCAmJiB0eXBlb2YgJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdmFyIGdldF9kYXRhID0ge1xuICAgICAgICAgIGVtYWlsOiAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpXG4gICAgICAgIH07XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICB1cmw6IG9wdGlvbnMubWlubnBvc3Rfcm9vdCArICcvd3AtanNvbi9taW5ucG9zdC1hcGkvdjIvbWFpbGNoaW1wL3VzZXInLFxuICAgICAgICAgIGRhdGE6IGdldF9kYXRhXG4gICAgICAgIH0pLmRvbmUoZnVuY3Rpb24oIHJlc3VsdCApIHtcbiAgICAgICAgICBpZiAoIHR5cGVvZiByZXN1bHQubWFpbGNoaW1wX3N0YXR1cyAhPT0gJ3VuZGVmaW5lZCcgKSB7XG4gICAgICAgICAgICAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLmFmdGVyKCc8aW5wdXQgbmFtZT1cIm1haWxjaGltcF9zdGF0dXNcIiB0eXBlPVwiaGlkZGVuXCIgdmFsdWU9XCInICsgcmVzdWx0Lm1haWxjaGltcF9zdGF0dXMgKyAnXCI+Jyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICggdHlwZW9mIHJlc3VsdC5tYWlsY2hpbXBfdXNlcl9pZCAhPT0gJ3VuZGVmaW5lZCcgKSB7XG4gICAgICAgICAgICAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLmFmdGVyKCc8aW5wdXQgbmFtZT1cIm1haWxjaGltcF91c2VyX2lkXCIgdHlwZT1cImhpZGRlblwiIHZhbHVlPVwiJyArIHJlc3VsdC5tYWlsY2hpbXBfdXNlcl9pZCArICdcIj4nKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHJlc3VsdC5tYWlsY2hpbXBfc3RhdHVzID09PSAnc3Vic2NyaWJlZCcpIHtcbiAgICAgICAgICAgIC8vIHVzZXIgY3JlYXRlZCAtIHNob3cgYSBzdWNjZXNzIG1lc3NhZ2VcbiAgICAgICAgICAgICQoJy5jb25maXJtLWluc3RydWN0aW9ucycpLnRleHQoJCgnLmNvbmZpcm0taW5zdHJ1Y3Rpb25zJykuYXR0cignZGF0YS1rbm93bi11c2VyJykpO1xuICAgICAgICAgICAgdmFyIGdyb3VwcyA9IHJlc3VsdC5ncm91cHM7XG4gICAgICAgICAgICAkLmVhY2goZ3JvdXBzLCBmdW5jdGlvbiggaW5kZXgsIHZhbHVlICkge1xuICAgICAgICAgICAgICBpZiAoIHZhbHVlID09PSB0cnVlICkge1xuICAgICAgICAgICAgICAgICQoJzpjaGVja2JveFt2YWx1ZT1cIicgKyBpbmRleCArICdcIl0nKS5wcm9wKCdjaGVja2VkJyx0cnVlKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKCc6Y2hlY2tib3hbdmFsdWU9XCInICsgaW5kZXggKyAnXCJdJykucHJvcCgnY2hlY2tlZCcsZmFsc2UpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgfSwgLy8gc2hvd05ld3NsZXR0ZXJTZXR0aW5nc1xuXG4gICAgY29uZmlybU1lc3NhZ2VTdWJtaXQ6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcblxuICAgICAgdmFyIGV4aXN0aW5nX25ld3NsZXR0ZXJfc2V0dGluZ3MgPSAkKG9wdGlvbnMubmV3c2xldHRlcl9ncm91cF9zZWxlY3RvciArICcgaW5wdXQnKS5zZXJpYWxpemUoKTtcbiAgICAgIC8vdGhpcy5kZWJ1ZyhleGlzdGluZ19uZXdzbGV0dGVyX3NldHRpbmdzKTtcblxuICAgICAgJChvcHRpb25zLmNvbmZpcm1fZm9ybV9zZWxlY3Rvcikuc3VibWl0KGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgdmFyIGNvbmZpcm1mb3JtID0gJChvcHRpb25zLmNvbmZpcm1fZm9ybV9zZWxlY3Rvcik7XG4gICAgICAgIC8vIHN1Ym1pdCBzZXR0aW5ncyB0byBtYWlsY2hpbXBcbiAgICAgICAgLy8gbmVlZCB0byBnZXQgdXNlciBpbmZvIG9uIGEgaGlkZGVuIGZpZWxkIGhlcmVcblxuICAgICAgICB2YXIgbmV3c2xldHRlcl9ncm91cHMgPSAkKG9wdGlvbnMubmV3c2xldHRlcl9ncm91cF9zZWxlY3RvciArICcgaW5wdXQ6Y2hlY2tlZCcpO1xuICAgICAgICB2YXIgbmV3X25ld3NsZXR0ZXJfc2V0dGluZ3MgPSBuZXdzbGV0dGVyX2dyb3Vwcy5zZXJpYWxpemUoKTtcblxuICAgICAgICBpZiAoKGV4aXN0aW5nX25ld3NsZXR0ZXJfc2V0dGluZ3MgIT09IG5ld19uZXdzbGV0dGVyX3NldHRpbmdzKSAmJiAodHlwZW9mIG5ld3NsZXR0ZXJfZ3JvdXBzICE9PSAndW5kZWZpbmVkJykpIHtcbiAgICAgICAgICAvL2FkZCBvdXIgb3duIGFqYXggY2hlY2sgYXMgWC1SZXF1ZXN0ZWQtV2l0aCBpcyBub3QgYWx3YXlzIHJlbGlhYmxlXG4gICAgICAgICAgLy9hamF4X2Zvcm1fZGF0YSA9IG5ld19uZXdzbGV0dGVyX3NldHRpbmdzICsgJyZhamF4cmVxdWVzdD10cnVlJnN1YnNjcmliZSc7XG5cbiAgICAgICAgICB2YXIgcG9zdF9kYXRhID0ge1xuICAgICAgICAgICAgZW1haWw6ICQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgICBmaXJzdF9uYW1lOiAkKG9wdGlvbnMuZmlyc3RfbmFtZV9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgICBsYXN0X25hbWU6ICQob3B0aW9ucy5sYXN0X25hbWVfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgICAgZ3JvdXBzX3N1Ym1pdHRlZDoge31cbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgcG9zdF9kYXRhLmdyb3Vwc19hdmFpbGFibGUgPSAnYWxsJztcblxuICAgICAgICAgIGlmICggJCgnaW5wdXRbbmFtZT1cIm1haWxjaGltcF9zdGF0dXNcIl0nKS5sZW5ndGggPiAwICkge1xuICAgICAgICAgICAgcG9zdF9kYXRhLm1haWxjaGltcF9zdGF0dXMgPSAkKCdpbnB1dFtuYW1lPVwibWFpbGNoaW1wX3N0YXR1c1wiXScpLnZhbCgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICggJCgnaW5wdXRbbmFtZT1cIm1haWxjaGltcF91c2VyX2lkXCJdJykubGVuZ3RoID4gMCApIHtcbiAgICAgICAgICAgIHBvc3RfZGF0YS5tYWlsY2hpbXBfdXNlcl9pZCA9ICQoJ2lucHV0W25hbWU9XCJtYWlsY2hpbXBfdXNlcl9pZFwiXScpLnZhbCgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0eXBlb2YgbmV3c2xldHRlcl9ncm91cHMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAkLmVhY2gobmV3c2xldHRlcl9ncm91cHMsIGZ1bmN0aW9uKGluZGV4LCB2YWx1ZSkge1xuICAgICAgICAgICAgICB2YXIgZ3JvdXAgPSAkKHRoaXMpLnZhbCgpO1xuICAgICAgICAgICAgICBwb3N0X2RhdGEuZ3JvdXBzX3N1Ym1pdHRlZFtpbmRleF0gPSBncm91cDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IG9wdGlvbnMubWlubnBvc3Rfcm9vdCArICcvd3AtanNvbi9taW5ucG9zdC1hcGkvdjIvbWFpbGNoaW1wL3VzZXInLFxuICAgICAgICAgICAgdHlwZTogJ3Bvc3QnLFxuICAgICAgICAgICAgZGF0YVR5cGUgOiAnanNvbicsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkocG9zdF9kYXRhKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmRvbmUoZnVuY3Rpb24ocmVzcG9uc2UpIHsgLy8gcmVzcG9uc2UgZnJvbSB0aGUgUEhQIGFjdGlvblxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSAnJztcbiAgICAgICAgICAgIGlmICggcmVzcG9uc2Uuc3VjY2VzcyA9PT0gdHJ1ZSApIHtcbiAgICAgICAgICAgICAgLypzd2l0Y2ggKHJlc3BvbnNlLmRhdGEudXNlcl9zdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdleGlzdGluZyc6XG4gICAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ1RoYW5rcyBmb3IgdXBkYXRpbmcgeW91ciBlbWFpbCBwcmVmZXJlbmNlcy4gVGhleSB3aWxsIGdvIGludG8gZWZmZWN0IGltbWVkaWF0ZWx5Lic7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICduZXcnOlxuICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9ICdXZSBoYXZlIGFkZGVkIHlvdSB0byB0aGUgTWlublBvc3QgbWFpbGluZyBsaXN0Lic7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdwZW5kaW5nJzpcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnV2UgaGF2ZSBhZGRlZCB5b3UgdG8gdGhlIE1pbm5Qb3N0IG1haWxpbmcgbGlzdC4gWW91IHdpbGwgbmVlZCB0byBjbGljayB0aGUgY29uZmlybWF0aW9uIGxpbmsgaW4gdGhlIGVtYWlsIHdlIHNlbnQgdG8gYmVnaW4gcmVjZWl2aW5nIG1lc3NhZ2VzLic7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfSovXG4gICAgICAgICAgICAgIC8vY29uZmlybWZvcm0uZ2V0KDApLnN1Ym1pdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uZmlybWZvcm0uZ2V0KDApLnN1Ym1pdCgpO1xuICAgICAgICAgICAgLy8kKCcubS1ob2xkLW1lc3NhZ2UnKS5odG1sKCc8ZGl2IGNsYXNzPVwibS1mb3JtLW1lc3NhZ2UgbS1mb3JtLW1lc3NhZ2UtaW5mb1wiPicgKyBtZXNzYWdlICsgJzwvZGl2PicpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmZhaWwoZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIC8vIHdlIHNob3VsZCBwdXQgYW4gYWN0dWFsIGVycm9yIG1lc3NhZ2UgaGVyZSBzb21lZGF5LCBwcm9iYWJseVxuICAgICAgICAgICAgLy8kKCcubS1ob2xkLW1lc3NhZ2UnKS5odG1sKCc8ZGl2IGNsYXNzPVwibS1mb3JtLW1lc3NhZ2UgbS1mb3JtLW1lc3NhZ2UtaW5mb1wiPkFuIGVycm9yIGhhcyBvY2N1cmVkLiBQbGVhc2UgdHJ5IGFnYWluLjwvZGl2PicpO1xuICAgICAgICAgICAgY29uZmlybWZvcm0uZ2V0KDApLnN1Ym1pdCgpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0gZWxzZSB7IC8vIGVuZCBwYXJ0IHdoZXJlIHNldHRpbmdzIGNoYW5nZWRcbiAgICAgICAgICBjb25maXJtZm9ybS5nZXQoMCkuc3VibWl0KCk7XG4gICAgICAgIH1cblxuICAgICAgfSk7XG4gICAgICAvL3JldHVybiBmYWxzZTtcbiAgICB9LCAvLyBjb25maXJtTWVzc2FnZVN1Ym1pdFxuXG4gIH07IC8vIHBsdWdpbi5wcm90b3R5cGVcblxuICAvLyBBIHJlYWxseSBsaWdodHdlaWdodCBwbHVnaW4gd3JhcHBlciBhcm91bmQgdGhlIGNvbnN0cnVjdG9yLFxuICAvLyBwcmV2ZW50aW5nIGFnYWluc3QgbXVsdGlwbGUgaW5zdGFudGlhdGlvbnNcbiAgJC5mbltwbHVnaW5OYW1lXSA9IGZ1bmN0aW9uICggb3B0aW9ucyApIHtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICghJC5kYXRhKHRoaXMsICdwbHVnaW5fJyArIHBsdWdpbk5hbWUpKSB7XG4gICAgICAgICQuZGF0YSh0aGlzLCAncGx1Z2luXycgKyBwbHVnaW5OYW1lLCBuZXcgUGx1Z2luKCB0aGlzLCBvcHRpb25zICkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG59KSggalF1ZXJ5LCB3aW5kb3csIGRvY3VtZW50ICk7Il19
