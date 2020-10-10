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

      $(that.options.full_amount_selector).text(parseFloat(full_amount).toFixed(2)); // update the payment request

      if (this.paymentRequest && full_amount) {
        this.paymentRequest.update({
          total: {
            label: "MinnPost Donation",
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
          label: 'MinnPost Donation',
          amount: total_amount * 100
        }
      });
      that.prButton = that.elements.create('paymentRequestButton', {
        paymentRequest: that.paymentRequest
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

        that.paymentRequestHandler();
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
        $('input, label, div', element).removeClass('a-error');
        $('label', element).removeClass('m-has-validation-error');
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
            // if it is ach, we already have a token so submit the form
            // todo: upgrade the plaid integration
            that.bankTokenHandler($('input[name="bankToken"]').val(), 'bank_account');
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
    // bankTokenHandler
    paymentRequestHandler: function paymentRequestHandler() {
      var that = this;
      var supportform = $(this.options.donate_form_selector);
      var ajax_url = window.location.pathname; // we should do some of the validation stuff here too though.
      // Submit the form
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
    // paymentRequestHandler
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0cmlwZS5wYXltZW50LmpzIiwidmFsaWQtZm9ybS5taW4uanMiLCJtaW5ucG9zdC5naXZpbmcuanMiXSwibmFtZXMiOlsiZiIsImV4cG9ydHMiLCJtb2R1bGUiLCJkZWZpbmUiLCJhbWQiLCJnIiwid2luZG93IiwiZ2xvYmFsIiwic2VsZiIsInBheW1lbnQiLCJqcyIsImUiLCJ0IiwibiIsInIiLCJzIiwibyIsInUiLCJhIiwicmVxdWlyZSIsImkiLCJFcnJvciIsImNvZGUiLCJsIiwiY2FsbCIsImxlbmd0aCIsIlFKIiwicnJldHVybiIsInJ0cmltIiwic2VsZWN0b3IiLCJpc0RPTUVsZW1lbnQiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJlbCIsIm5vZGVOYW1lIiwidHJpbSIsInRleHQiLCJyZXBsYWNlIiwidmFsIiwicmV0IiwiYXJndW1lbnRzIiwidmFsdWUiLCJwcmV2ZW50RGVmYXVsdCIsImV2ZW50T2JqZWN0IiwicmV0dXJuVmFsdWUiLCJub3JtYWxpemVFdmVudCIsIm9yaWdpbmFsIiwid2hpY2giLCJ0YXJnZXQiLCJzcmNFbGVtZW50Iiwib3JpZ2luYWxFdmVudCIsImRhdGEiLCJkZXRhaWwiLCJjaGFyQ29kZSIsImtleUNvZGUiLCJvbiIsImVsZW1lbnQiLCJldmVudE5hbWUiLCJjYWxsYmFjayIsImoiLCJsZW4iLCJsZW4xIiwibXVsdEV2ZW50TmFtZSIsIm9yaWdpbmFsQ2FsbGJhY2siLCJyZWYiLCJtYXRjaCIsInNwbGl0IiwiYWRkRXZlbnRMaXN0ZW5lciIsImF0dGFjaEV2ZW50IiwiYWRkQ2xhc3MiLCJjbGFzc05hbWUiLCJyZXN1bHRzIiwicHVzaCIsImNsYXNzTGlzdCIsImFkZCIsImhhc0NsYXNzIiwiY29udGFpbnMiLCJSZWdFeHAiLCJ0ZXN0IiwicmVtb3ZlQ2xhc3MiLCJjbHMiLCJyZW1vdmUiLCJqb2luIiwidG9nZ2xlQ2xhc3MiLCJib29sIiwiYXBwZW5kIiwidG9BcHBlbmQiLCJpbnNlcnRBZGphY2VudEhUTUwiLCJmaW5kIiwiTm9kZUxpc3QiLCJBcnJheSIsInRyaWdnZXIiLCJuYW1lIiwiZXJyb3IiLCJldiIsIkN1c3RvbUV2ZW50IiwiY3JlYXRlRXZlbnQiLCJpbml0Q3VzdG9tRXZlbnQiLCJpbml0RXZlbnQiLCJkaXNwYXRjaEV2ZW50IiwiUGF5bWVudCIsImNhcmRGcm9tTnVtYmVyIiwiY2FyZEZyb21UeXBlIiwiY2FyZHMiLCJkZWZhdWx0Rm9ybWF0IiwiZm9ybWF0QmFja0NhcmROdW1iZXIiLCJmb3JtYXRCYWNrRXhwaXJ5IiwiZm9ybWF0Q2FyZE51bWJlciIsImZvcm1hdEV4cGlyeSIsImZvcm1hdEZvcndhcmRFeHBpcnkiLCJmb3JtYXRGb3J3YXJkU2xhc2giLCJmb3JtYXRNb250aEV4cGlyeSIsImhhc1RleHRTZWxlY3RlZCIsImx1aG5DaGVjayIsInJlRm9ybWF0Q2FyZE51bWJlciIsInJlc3RyaWN0Q1ZDIiwicmVzdHJpY3RDYXJkTnVtYmVyIiwicmVzdHJpY3RDb21iaW5lZEV4cGlyeSIsInJlc3RyaWN0RXhwaXJ5IiwicmVzdHJpY3RNb250aEV4cGlyeSIsInJlc3RyaWN0TnVtZXJpYyIsInJlc3RyaWN0WWVhckV4cGlyeSIsInNldENhcmRUeXBlIiwiaW5kZXhPZiIsIml0ZW0iLCJ0eXBlIiwicGF0dGVybiIsImZvcm1hdCIsImN2Y0xlbmd0aCIsImx1aG4iLCJudW0iLCJjYXJkIiwiZGlnaXQiLCJkaWdpdHMiLCJvZGQiLCJzdW0iLCJyZXZlcnNlIiwicGFyc2VJbnQiLCJzZWxlY3Rpb25TdGFydCIsInNlbGVjdGlvbkVuZCIsInNlbGVjdGlvbiIsImNyZWF0ZVJhbmdlIiwic2V0VGltZW91dCIsIl90aGlzIiwiZm5zIiwicmUiLCJ1cHBlckxlbmd0aCIsIlN0cmluZyIsImZyb21DaGFyQ29kZSIsIm1ldGEiLCJzbGFzaCIsIm1ldGFLZXkiLCJpbnB1dCIsImN0cmxLZXkiLCJhbGxUeXBlcyIsImNhcmRUeXBlIiwiY2FyZEV4cGlyeVZhbCIsIm1vbnRoIiwicHJlZml4IiwieWVhciIsIkRhdGUiLCJnZXRGdWxsWWVhciIsInRvU3RyaW5nIiwic2xpY2UiLCJ2YWxpZGF0ZUNhcmROdW1iZXIiLCJ2YWxpZGF0ZUNhcmRFeHBpcnkiLCJjdXJyZW50VGltZSIsImV4cGlyeSIsInNldE1vbnRoIiwiZ2V0TW9udGgiLCJ2YWxpZGF0ZUNhcmRDVkMiLCJjdmMiLCJyZWYxIiwiZ3JvdXBzIiwiZXhlYyIsInNoaWZ0IiwiZm9ybWF0Q2FyZENWQyIsImZvcm1hdENhcmRFeHBpcnkiLCJmb3JtYXRDYXJkRXhwaXJ5TXVsdGlwbGUiLCJnZXRDYXJkQXJyYXkiLCJzZXRDYXJkQXJyYXkiLCJjYXJkQXJyYXkiLCJhZGRUb0NhcmRBcnJheSIsImNhcmRPYmplY3QiLCJyZW1vdmVGcm9tQ2FyZEFycmF5Iiwia2V5Iiwic3BsaWNlIiwiYyIsInAiLCJfdmFsaWRGb3JtIiwiX3ZhbGlkRm9ybTIiLCJfaW50ZXJvcFJlcXVpcmVEZWZhdWx0Iiwib2JqIiwiX19lc01vZHVsZSIsImRlZmF1bHQiLCJWYWxpZEZvcm0iLCJ0b2dnbGVJbnZhbGlkQ2xhc3MiLCJoYW5kbGVDdXN0b21NZXNzYWdlcyIsImhhbmRsZUN1c3RvbU1lc3NhZ2VEaXNwbGF5IiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJjbG9uZSIsImRlZmF1bHRzIiwiaW5zZXJ0QWZ0ZXIiLCJpbnNlcnRCZWZvcmUiLCJmb3JFYWNoIiwiZGVib3VuY2UiLCJjb3B5IiwiYXR0ciIsImhhc093blByb3BlcnR5IiwiZGVmYXVsdE9iamVjdCIsImsiLCJ1bmRlZmluZWQiLCJyZWZOb2RlIiwibm9kZVRvSW5zZXJ0Iiwic2libGluZyIsIm5leHRTaWJsaW5nIiwiX3BhcmVudCIsInBhcmVudE5vZGUiLCJwYXJlbnQiLCJhcHBlbmRDaGlsZCIsIml0ZW1zIiwiZm4iLCJtcyIsInRpbWVvdXQiLCJkZWJvdW5jZWRGbiIsImNsZWFyVGltZW91dCIsInZhbGlkRm9ybSIsIl91dGlsIiwiaW52YWxpZENsYXNzIiwidmFsaWRpdHkiLCJ2YWxpZCIsImVycm9yUHJvcHMiLCJnZXRDdXN0b21NZXNzYWdlIiwiY3VzdG9tTWVzc2FnZXMiLCJsb2NhbEVycm9yUHJvcHMiLCJjb25jYXQiLCJwcm9wIiwiZ2V0QXR0cmlidXRlIiwiY2hlY2tWYWxpZGl0eSIsIm1lc3NhZ2UiLCJzZXRDdXN0b21WYWxpZGl0eSIsIm9wdGlvbnMiLCJ2YWxpZGF0aW9uRXJyb3JDbGFzcyIsInZhbGlkYXRpb25FcnJvclBhcmVudENsYXNzIiwiZXJyb3JQbGFjZW1lbnQiLCJpbnNlcnRFcnJvciIsImVycm9yTm9kZSIsInF1ZXJ5U2VsZWN0b3IiLCJjcmVhdGVFbGVtZW50IiwidmFsaWRhdGlvbk1lc3NhZ2UiLCJ0ZXh0Q29udGVudCIsImRlZmF1bHRPcHRpb25zIiwiaW5wdXRzIiwidG9Mb3dlckNhc2UiLCJmb2N1c0ludmFsaWRJbnB1dCIsInZhbGlkRm9ybUlucHV0cyIsImZvcm0iLCJmb2N1c0ZpcnN0IiwiaW52YWxpZE5vZGUiLCJmb2N1cyIsIiQiLCJwbHVnaW5OYW1lIiwiUGx1Z2luIiwiZXh0ZW5kIiwiX2RlZmF1bHRzIiwiX25hbWUiLCJpbml0IiwicHJvdG90eXBlIiwicmVzZXQiLCJhbW91bnQiLCJkb2N1bWVudEVsZW1lbnQiLCJwYXJzZUZsb2F0IiwibGV2ZWxfYW1vdW50X3NlbGVjdG9yIiwib3JpZ2luYWxfYW1vdW50Iiwib3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yIiwicHJvY2Vzc2luZ19mZWUiLCJNYXRoIiwicm91bmQiLCJmZWVfYW1vdW50IiwicG93IiwidG9GaXhlZCIsInByb2Nlc3NpbmdfZmVlX3RleHQiLCJjcmVhdGVfYWNjb3VudCIsImJ1dHRvbl90ZXh0IiwicGF5X2J1dHRvbl9zZWxlY3RvciIsInN0cmlwZSIsIlN0cmlwZSIsInN0cmlwZV9wdWJsaXNoYWJsZV9rZXkiLCJlbGVtZW50cyIsImZvbnRzIiwiY3NzU3JjIiwicmVmZXJyZXIiLCJkZWJ1ZyIsImFuYWx5dGljc1RyYWNraW5nIiwiYW1vdW50QXNSYWRpbyIsImFtb3VudFVwZGF0ZWQiLCJwYXlfY2NfcHJvY2Vzc2luZ19zZWxlY3RvciIsImNyZWRpdENhcmRQcm9jZXNzaW5nRmVlcyIsImRvbmF0ZV9mb3JtX3NlbGVjdG9yIiwiZG9uYXRlQW5vbnltb3VzbHkiLCJob25vck9yTWVtb3J5VG9nZ2xlIiwib3V0c2lkZVVuaXRlZFN0YXRlcyIsInNoaXBwaW5nQWRkcmVzcyIsImFsbG93TWlubnBvc3RBY2NvdW50IiwicGF5bWVudFJlcXVlc3RCdXR0b24iLCJjaG9vc2VQYXltZW50TWV0aG9kIiwiY3JlZGl0Q2FyZEZpZWxkcyIsImFjaEZpZWxkcyIsInZhbGlkYXRlQW5kU3VibWl0IiwiY29uZmlybV9mb3JtX3NlbGVjdG9yIiwic2hvd05ld3NsZXR0ZXJTZXR0aW5ncyIsImNvbmZpcm1NZXNzYWdlU3VibWl0IiwiY29uc29sZSIsImxvZyIsImRpciIsInByb2dyZXNzIiwicHJvZ3Jlc3Nfc2VsZWN0b3IiLCJzdGVwIiwibmF2X2l0ZW1fY291bnQiLCJvcHBfaWQiLCJvcHBfaWRfc2VsZWN0b3IiLCJwb3N0X3B1cmNoYXNlIiwiaW5kZXgiLCJmaW5pc2hfc2VjdGlvbl9zZWxlY3RvciIsImFuYWx5dGljc1RyYWNraW5nU3RlcCIsImluc3RhbGxtZW50X3BlcmlvZCIsImxldmVsIiwidGhhdCIsImluc3RhbGxtZW50X3BlcmlvZF9zZWxlY3RvciIsImFqYXgiLCJtZXRob2QiLCJ1cmwiLCJkb25lIiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJnYSIsInBhZ2UiLCJsb2NhdGlvbiIsInBhdGhuYW1lIiwidGl0bGUiLCJjaGFuZ2UiLCJpcyIsInN0cmlwZV9wYXltZW50X3R5cGUiLCJnZXRTdHJpcGVQYXltZW50VHlwZSIsImFtb3VudF9zZWxlY3Rvcl9mYWlyX21hcmtldCIsInNldEZhaXJNYXJrZXRWYWx1ZSIsImNhbGN1bGF0ZUZlZXMiLCJhZGRpdGlvbmFsX2Ftb3VudF9maWVsZCIsImdldFRvdGFsQW1vdW50IiwidG90YWxfYW1vdW50IiwiYWRkaXRpb25hbF9hbW91bnQiLCJhbW91bnRfc2VsZWN0b3IiLCJmYWlyX21hcmtldF92YWx1ZV9zZWxlY3RvciIsImZhaXJNYXJrZXRWYWx1ZSIsInNldFN0cmlwZVBheW1lbnRUeXBlIiwiZmVlcyIsImNyZWRpdENhcmRGZWVDaGVja2JveCIsImZpZWxkIiwiZnVsbF9hbW91bnQiLCJmdWxsX2Ftb3VudF9zZWxlY3RvciIsInBheW1lbnRSZXF1ZXN0IiwidXBkYXRlIiwidG90YWwiLCJsYWJlbCIsInRvZ2dsZUFub255bW91cyIsImFub255bW91c19zZWxlY3RvciIsIm5hbWVfc2VsZWN0b3IiLCJoaWRlIiwic2hvdyIsImhvbm9yT3JNZW1vcnkiLCJob25vcl9vcl9tZW1vcnlfY2hvb3NlciIsImhvbm9yX21lbW9yeV9pbnB1dF9ncm91cCIsImhvbm9yX3R5cGVfc2VsZWN0b3IiLCJob25vcl9uYW1lX3NlbGVjdG9yIiwic2hvd19iaWxsaW5nX2NvdW50cnlfc2VsZWN0b3IiLCJjbGljayIsImJpbGxpbmdfY291bnRyeV9zZWxlY3RvciIsInNob3dfc2hpcHBpbmdfY291bnRyeV9zZWxlY3RvciIsInNoaXBwaW5nX2NvdW50cnlfc2VsZWN0b3IiLCJzaG93X3NoaXBwaW5nIiwidXNlX2Zvcl9zaGlwcGluZ19zZWxlY3RvciIsInNoaXBwaW5nX3NlbGVjdG9yIiwiYWNjb3VudF9leGlzdHMiLCJzaG93UGFzc3dvcmQiLCJzaG93UGFzc3dvcmRTdHJlbmd0aCIsInNwYW1FbWFpbCIsImVtYWlsX2ZpZWxkX3NlbGVjdG9yIiwidG9nZ2xlQWNjb3VudEZpZWxkcyIsImNyZWF0ZV9tcF9zZWxlY3RvciIsImRvbmVUeXBpbmciLCJlbWFpbCIsImNoZWNrTWlubnBvc3RBY2NvdW50IiwidHlwaW5nVGltZXIiLCJkb25lVHlwaW5nSW50ZXJ2YWwiLCJrZXl1cCIsImVtYWlsX2ZpZWxkIiwic3BhbUVycm9yQ29udGFpbmVyIiwiY3JlYXRlX2FjY291bnRfc2VsZWN0b3IiLCJiZWZvcmUiLCJwYXNzd29yZF9zZWxlY3RvciIsIiRzdWJtaXQiLCIkY29udGFpbmVyIiwiJGZpZWxkIiwic2hvd19wYXNzIiwiJHRvZ2dsZSIsImNoZWNrYm94IiwiJGJlZm9yZSIsImFmdGVyIiwiY2hlY2tQYXNzd29yZFN0cmVuZ3RoIiwiJHBhc3N3b3JkIiwiJHN0cmVuZ3RoTWV0ZXIiLCIkc3RyZW5ndGhUZXh0IiwicGFzc3dvcmQiLCJyZXN1bHQiLCJ6eGN2Ym4iLCJzdHJlbmd0aCIsInNjb3JlIiwiaHRtbCIsInVzZXIiLCJtaW5ucG9zdF9yb290Iiwic3RhdHVzIiwicmVhc29uIiwiY291bnRyeSIsImN1cnJlbmN5IiwicHJCdXR0b24iLCJjcmVhdGUiLCJjYW5NYWtlUGF5bWVudCIsInRoZW4iLCJtb3VudCIsImV2ZW50Iiwic3VwcG9ydGZvcm0iLCJ0b2tlbkZpZWxkTmFtZSIsInRva2VuRmllbGQiLCJwYXltZW50TWV0aG9kIiwiaWQiLCJwYXltZW50UmVxdWVzdEhhbmRsZXIiLCJjaG9vc2VfcGF5bWVudCIsImNoZWNrZWRfaWQiLCJjaGVja2VkX3ZhbHVlIiwic2V0dXBQYXltZW50TWV0aG9kIiwiZWxlbWVudF9pZCIsImVsZW1lbnRfdmFsdWUiLCJyZW1vdmVBY2hGaWVsZHMiLCJwYXltZW50X21ldGhvZF9zZWxlY3RvciIsInN0eWxlIiwiYmFzZSIsImljb25Db2xvciIsImxpbmVIZWlnaHQiLCJmb250V2VpZ2h0IiwiZm9udEZhbWlseSIsImZvbnRTaXplIiwiaW52YWxpZCIsImNvbG9yIiwiY2FyZE51bWJlckVsZW1lbnQiLCJzaG93SWNvbiIsImNjX251bV9zZWxlY3RvciIsImNhcmRFeHBpcnlFbGVtZW50IiwiY2NfZXhwX3NlbGVjdG9yIiwiY2FyZEN2Y0VsZW1lbnQiLCJjY19jdmNfc2VsZWN0b3IiLCJicmFuZCIsInN0cmlwZUVycm9yRGlzcGxheSIsImJ1dHRvblN0YXR1cyIsImJhbmtUb2tlbkZpZWxkTmFtZSIsImJhbmtUb2tlbkZpZWxkIiwicGxhaWRfZW52IiwiUGxhaWQiLCJsaW5rSGFuZGxlciIsInNlbGVjdEFjY291bnQiLCJhcGlWZXJzaW9uIiwiZW52IiwiY2xpZW50TmFtZSIsInBsYWlkX3B1YmxpY19rZXkiLCJwcm9kdWN0Iiwib25Mb2FkIiwib25TdWNjZXNzIiwicHVibGljX3Rva2VuIiwibWV0YWRhdGEiLCJhY2NvdW50X2lkIiwic2VyaWFsaXplIiwicmVzcG9uc2UiLCJwbGFpZF9saW5rIiwic3RyaXBlX2JhbmtfYWNjb3VudF90b2tlbiIsInByZXBlbmQiLCJjb250ZW50cyIsInVud3JhcCIsIm9uRXhpdCIsImVyciIsIm9wZW4iLCJidXR0b24iLCJkaXNhYmxlZCIsInNjcm9sbFRvRm9ybUVycm9yIiwiZmlyc3QiLCJmaXJzdF9ob2xkZXIiLCJlbGVtZW50T2Zmc2V0Iiwib2Zmc2V0IiwidG9wIiwicGFnZU9mZnNldCIsInBhZ2VZT2Zmc2V0IiwiaW5uZXJIZWlnaHQiLCJzY3JvbGxUb3AiLCJmb3JtcyIsInN1Ym1pdCIsInBheW1lbnRfdHlwZSIsImJpbGxpbmdEZXRhaWxzIiwiZ2VuZXJhdGVCaWxsaW5nRGV0YWlscyIsImZpcnN0X25hbWUiLCJmaXJzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yIiwibGFzdF9uYW1lIiwibGFzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yIiwicGFzc3dvcmRfZmllbGRfc2VsZWN0b3IiLCJjaXR5IiwiYmlsbGluZ19jaXR5X2ZpZWxkX3NlbGVjdG9yIiwic3RhdGUiLCJiaWxsaW5nX3N0YXRlX2ZpZWxkX3NlbGVjdG9yIiwiemlwIiwiYmlsbGluZ196aXBfZmllbGRfc2VsZWN0b3IiLCJjcmVhdGVQYXltZW50TWV0aG9kIiwiYmFua1Rva2VuSGFuZGxlciIsInRoaXNfc2VsZWN0b3IiLCJ3aGljaF9lcnJvciIsImVtcHR5IiwiYWRkcmVzc0RldGFpbHMiLCJmdWxsX25hbWUiLCJzdHJlZXQiLCJiaWxsaW5nX3N0cmVldF9maWVsZF9zZWxlY3RvciIsImxpbmUxIiwiYWNjb3VudF9jaXR5X3NlbGVjdG9yIiwiYWNjb3VudF9zdGF0ZV9zZWxlY3RvciIsImFjY291bnRfemlwX3NlbGVjdG9yIiwicG9zdGFsX2NvZGUiLCJiaWxsaW5nX2NvdW50cnlfZmllbGRfc2VsZWN0b3IiLCJhZGRyZXNzIiwiY2FyZEVsZW1lbnQiLCJiaWxsaW5nX2RldGFpbHMiLCJoYW5kbGVTZXJ2ZXJFcnJvciIsImFqYXhfdXJsIiwiZmV0Y2giLCJoZWFkZXJzIiwiYm9keSIsImpzb24iLCJoYW5kbGVTZXJ2ZXJSZXNwb25zZSIsInRva2VuIiwiY2FjaGUiLCJlcnJvcnMiLCJnZXQiLCJyZXF1aXJlc19hY3Rpb24iLCJ0aGlzX2ZpZWxkIiwiZWFjaCIsInBhcmFtIiwiZGlzcGxheUVycm9yTWVzc2FnZSIsImFuaW1hdGUiLCJzdHJpcGVFcnJvclNlbGVjdG9yIiwiZmllbGRQYXJlbnQiLCJwcmV2IiwibmV3c2xldHRlcl9ncm91cF9odG1sIiwibmV3c2xldHRlcl9ncm91cF9zZWxlY3RvciIsImdldF9kYXRhIiwic2hvcnRjb2RlIiwicGxhY2VtZW50IiwiZ3JvdXBfZmllbGRzIiwiY2F0ZWdvcnkiLCJtYWlsY2hpbXBfc3RhdHVzIiwibWFpbGNoaW1wX3VzZXJfaWQiLCJleGlzdGluZ19uZXdzbGV0dGVyX3NldHRpbmdzIiwiY29uZmlybWZvcm0iLCJuZXdzbGV0dGVyX2dyb3VwcyIsIm5ld19uZXdzbGV0dGVyX3NldHRpbmdzIiwicG9zdF9kYXRhIiwiZ3JvdXBzX3N1Ym1pdHRlZCIsImdyb3Vwc19hdmFpbGFibGUiLCJncm91cCIsImRhdGFUeXBlIiwiY29udGVudFR5cGUiLCJKU09OIiwic3RyaW5naWZ5Iiwic3VjY2VzcyIsImZhaWwiLCJqUXVlcnkiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxDQUFDLFVBQVNBLENBQVQsRUFBVztBQUFDLE1BQUcsUUFBT0MsT0FBUCx5Q0FBT0EsT0FBUCxPQUFpQixRQUFqQixJQUEyQixPQUFPQyxNQUFQLEtBQWdCLFdBQTlDLEVBQTBEO0FBQUNBLElBQUFBLE1BQU0sQ0FBQ0QsT0FBUCxHQUFlRCxDQUFDLEVBQWhCO0FBQW1CLEdBQTlFLE1BQW1GLElBQUcsT0FBT0csTUFBUCxLQUFnQixVQUFo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T0FBTyxHQUFHLEVBQWQ7O0FBQ0EsZ0JBQUtpUCxRQUFRLENBQUNnRyxPQUFULEtBQXFCLElBQTFCLEVBQWlDO0FBQy9COzs7Ozs7Ozs7OztBQVdBO0FBQ0Q7O0FBQ0RYLFlBQUFBLFdBQVcsQ0FBQ3BCLEdBQVosQ0FBZ0IsQ0FBaEIsRUFBbUIzQyxNQUFuQixHQWhCdUIsQ0FpQnZCO0FBQ0QsV0F6QkQsRUEwQkMyRSxJQTFCRCxDQTBCTSxVQUFTakcsUUFBVCxFQUFtQjtBQUN2QjtBQUNBO0FBQ0FxRixZQUFBQSxXQUFXLENBQUNwQixHQUFaLENBQWdCLENBQWhCLEVBQW1CM0MsTUFBbkI7QUFDRCxXQTlCRDtBQWdDRCxTQTVERCxNQTRETztBQUFFO0FBQ1ArRCxVQUFBQSxXQUFXLENBQUNwQixHQUFaLENBQWdCLENBQWhCLEVBQW1CM0MsTUFBbkI7QUFDRDtBQUVGLE9BMUVELEVBTCtDLENBZ0YvQztBQUNELEtBenlDZ0IsQ0F5eUNkOztBQXp5Q2MsR0FBbkIsQ0FuRjRDLENBODNDekM7QUFFSDtBQUNBOztBQUNBbFAsRUFBQUEsQ0FBQyxDQUFDdkMsRUFBRixDQUFLd0MsVUFBTCxJQUFtQixVQUFXcEIsT0FBWCxFQUFxQjtBQUN0QyxXQUFPLEtBQUttVCxJQUFMLENBQVUsWUFBWTtBQUMzQixVQUFJLENBQUNoUyxDQUFDLENBQUNsTixJQUFGLENBQU8sSUFBUCxFQUFhLFlBQVltTixVQUF6QixDQUFMLEVBQTJDO0FBQ3pDRCxRQUFBQSxDQUFDLENBQUNsTixJQUFGLENBQU8sSUFBUCxFQUFhLFlBQVltTixVQUF6QixFQUFxQyxJQUFJQyxNQUFKLENBQVksSUFBWixFQUFrQnJCLE9BQWxCLENBQXJDO0FBQ0Q7QUFDRixLQUpNLENBQVA7QUFLRCxHQU5EO0FBUUQsQ0ExNENBLEVBMDRDR2lWLE1BMTRDSCxFQTA0Q1c3akIsTUExNENYLEVBMDRDbUJ5QixRQTE0Q25CIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oZil7aWYodHlwZW9mIGV4cG9ydHM9PT1cIm9iamVjdFwiJiZ0eXBlb2YgbW9kdWxlIT09XCJ1bmRlZmluZWRcIil7bW9kdWxlLmV4cG9ydHM9ZigpfWVsc2UgaWYodHlwZW9mIGRlZmluZT09PVwiZnVuY3Rpb25cIiYmZGVmaW5lLmFtZCl7ZGVmaW5lKFtdLGYpfWVsc2V7dmFyIGc7aWYodHlwZW9mIHdpbmRvdyE9PVwidW5kZWZpbmVkXCIpe2c9d2luZG93fWVsc2UgaWYodHlwZW9mIGdsb2JhbCE9PVwidW5kZWZpbmVkXCIpe2c9Z2xvYmFsfWVsc2UgaWYodHlwZW9mIHNlbGYhPT1cInVuZGVmaW5lZFwiKXtnPXNlbGZ9ZWxzZXtnPXRoaXN9KGcucGF5bWVudCB8fCAoZy5wYXltZW50ID0ge30pKS5qcyA9IGYoKX19KShmdW5jdGlvbigpe3ZhciBkZWZpbmUsbW9kdWxlLGV4cG9ydHM7cmV0dXJuIChmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pKHsxOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbnZhciBRSiwgcnJldHVybiwgcnRyaW07XG5cblFKID0gZnVuY3Rpb24oc2VsZWN0b3IpIHtcbiAgaWYgKFFKLmlzRE9NRWxlbWVudChzZWxlY3RvcikpIHtcbiAgICByZXR1cm4gc2VsZWN0b3I7XG4gIH1cbiAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xufTtcblxuUUouaXNET01FbGVtZW50ID0gZnVuY3Rpb24oZWwpIHtcbiAgcmV0dXJuIGVsICYmIChlbC5ub2RlTmFtZSAhPSBudWxsKTtcbn07XG5cbnJ0cmltID0gL15bXFxzXFx1RkVGRlxceEEwXSt8W1xcc1xcdUZFRkZcXHhBMF0rJC9nO1xuXG5RSi50cmltID0gZnVuY3Rpb24odGV4dCkge1xuICBpZiAodGV4dCA9PT0gbnVsbCkge1xuICAgIHJldHVybiBcIlwiO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAodGV4dCArIFwiXCIpLnJlcGxhY2UocnRyaW0sIFwiXCIpO1xuICB9XG59O1xuXG5ycmV0dXJuID0gL1xcci9nO1xuXG5RSi52YWwgPSBmdW5jdGlvbihlbCwgdmFsKSB7XG4gIHZhciByZXQ7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgIHJldHVybiBlbC52YWx1ZSA9IHZhbDtcbiAgfSBlbHNlIHtcbiAgICByZXQgPSBlbC52YWx1ZTtcbiAgICBpZiAodHlwZW9mIHJldCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgcmV0dXJuIHJldC5yZXBsYWNlKHJyZXR1cm4sIFwiXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAocmV0ID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cblFKLnByZXZlbnREZWZhdWx0ID0gZnVuY3Rpb24oZXZlbnRPYmplY3QpIHtcbiAgaWYgKHR5cGVvZiBldmVudE9iamVjdC5wcmV2ZW50RGVmYXVsdCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgZXZlbnRPYmplY3QucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm47XG4gIH1cbiAgZXZlbnRPYmplY3QucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuUUoubm9ybWFsaXplRXZlbnQgPSBmdW5jdGlvbihlKSB7XG4gIHZhciBvcmlnaW5hbDtcbiAgb3JpZ2luYWwgPSBlO1xuICBlID0ge1xuICAgIHdoaWNoOiBvcmlnaW5hbC53aGljaCAhPSBudWxsID8gb3JpZ2luYWwud2hpY2ggOiB2b2lkIDAsXG4gICAgdGFyZ2V0OiBvcmlnaW5hbC50YXJnZXQgfHwgb3JpZ2luYWwuc3JjRWxlbWVudCxcbiAgICBwcmV2ZW50RGVmYXVsdDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gUUoucHJldmVudERlZmF1bHQob3JpZ2luYWwpO1xuICAgIH0sXG4gICAgb3JpZ2luYWxFdmVudDogb3JpZ2luYWwsXG4gICAgZGF0YTogb3JpZ2luYWwuZGF0YSB8fCBvcmlnaW5hbC5kZXRhaWxcbiAgfTtcbiAgaWYgKGUud2hpY2ggPT0gbnVsbCkge1xuICAgIGUud2hpY2ggPSBvcmlnaW5hbC5jaGFyQ29kZSAhPSBudWxsID8gb3JpZ2luYWwuY2hhckNvZGUgOiBvcmlnaW5hbC5rZXlDb2RlO1xuICB9XG4gIHJldHVybiBlO1xufTtcblxuUUoub24gPSBmdW5jdGlvbihlbGVtZW50LCBldmVudE5hbWUsIGNhbGxiYWNrKSB7XG4gIHZhciBlbCwgaSwgaiwgbGVuLCBsZW4xLCBtdWx0RXZlbnROYW1lLCBvcmlnaW5hbENhbGxiYWNrLCByZWY7XG4gIGlmIChlbGVtZW50Lmxlbmd0aCkge1xuICAgIGZvciAoaSA9IDAsIGxlbiA9IGVsZW1lbnQubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGVsID0gZWxlbWVudFtpXTtcbiAgICAgIFFKLm9uKGVsLCBldmVudE5hbWUsIGNhbGxiYWNrKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChldmVudE5hbWUubWF0Y2goXCIgXCIpKSB7XG4gICAgcmVmID0gZXZlbnROYW1lLnNwbGl0KFwiIFwiKTtcbiAgICBmb3IgKGogPSAwLCBsZW4xID0gcmVmLmxlbmd0aDsgaiA8IGxlbjE7IGorKykge1xuICAgICAgbXVsdEV2ZW50TmFtZSA9IHJlZltqXTtcbiAgICAgIFFKLm9uKGVsZW1lbnQsIG11bHRFdmVudE5hbWUsIGNhbGxiYWNrKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG4gIG9yaWdpbmFsQ2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgY2FsbGJhY2sgPSBmdW5jdGlvbihlKSB7XG4gICAgZSA9IFFKLm5vcm1hbGl6ZUV2ZW50KGUpO1xuICAgIHJldHVybiBvcmlnaW5hbENhbGxiYWNrKGUpO1xuICB9O1xuICBpZiAoZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgcmV0dXJuIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGNhbGxiYWNrLCBmYWxzZSk7XG4gIH1cbiAgaWYgKGVsZW1lbnQuYXR0YWNoRXZlbnQpIHtcbiAgICBldmVudE5hbWUgPSBcIm9uXCIgKyBldmVudE5hbWU7XG4gICAgcmV0dXJuIGVsZW1lbnQuYXR0YWNoRXZlbnQoZXZlbnROYW1lLCBjYWxsYmFjayk7XG4gIH1cbiAgZWxlbWVudFsnb24nICsgZXZlbnROYW1lXSA9IGNhbGxiYWNrO1xufTtcblxuUUouYWRkQ2xhc3MgPSBmdW5jdGlvbihlbCwgY2xhc3NOYW1lKSB7XG4gIHZhciBlO1xuICBpZiAoZWwubGVuZ3RoKSB7XG4gICAgcmV0dXJuIChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBpLCBsZW4sIHJlc3VsdHM7XG4gICAgICByZXN1bHRzID0gW107XG4gICAgICBmb3IgKGkgPSAwLCBsZW4gPSBlbC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBlID0gZWxbaV07XG4gICAgICAgIHJlc3VsdHMucHVzaChRSi5hZGRDbGFzcyhlLCBjbGFzc05hbWUpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH0pKCk7XG4gIH1cbiAgaWYgKGVsLmNsYXNzTGlzdCkge1xuICAgIHJldHVybiBlbC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGVsLmNsYXNzTmFtZSArPSAnICcgKyBjbGFzc05hbWU7XG4gIH1cbn07XG5cblFKLmhhc0NsYXNzID0gZnVuY3Rpb24oZWwsIGNsYXNzTmFtZSkge1xuICB2YXIgZSwgaGFzQ2xhc3MsIGksIGxlbjtcbiAgaWYgKGVsLmxlbmd0aCkge1xuICAgIGhhc0NsYXNzID0gdHJ1ZTtcbiAgICBmb3IgKGkgPSAwLCBsZW4gPSBlbC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgZSA9IGVsW2ldO1xuICAgICAgaGFzQ2xhc3MgPSBoYXNDbGFzcyAmJiBRSi5oYXNDbGFzcyhlLCBjbGFzc05hbWUpO1xuICAgIH1cbiAgICByZXR1cm4gaGFzQ2xhc3M7XG4gIH1cbiAgaWYgKGVsLmNsYXNzTGlzdCkge1xuICAgIHJldHVybiBlbC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV3IFJlZ0V4cCgnKF58ICknICsgY2xhc3NOYW1lICsgJyggfCQpJywgJ2dpJykudGVzdChlbC5jbGFzc05hbWUpO1xuICB9XG59O1xuXG5RSi5yZW1vdmVDbGFzcyA9IGZ1bmN0aW9uKGVsLCBjbGFzc05hbWUpIHtcbiAgdmFyIGNscywgZSwgaSwgbGVuLCByZWYsIHJlc3VsdHM7XG4gIGlmIChlbC5sZW5ndGgpIHtcbiAgICByZXR1cm4gKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGksIGxlbiwgcmVzdWx0cztcbiAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgIGZvciAoaSA9IDAsIGxlbiA9IGVsLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGUgPSBlbFtpXTtcbiAgICAgICAgcmVzdWx0cy5wdXNoKFFKLnJlbW92ZUNsYXNzKGUsIGNsYXNzTmFtZSkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfSkoKTtcbiAgfVxuICBpZiAoZWwuY2xhc3NMaXN0KSB7XG4gICAgcmVmID0gY2xhc3NOYW1lLnNwbGl0KCcgJyk7XG4gICAgcmVzdWx0cyA9IFtdO1xuICAgIGZvciAoaSA9IDAsIGxlbiA9IHJlZi5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgY2xzID0gcmVmW2ldO1xuICAgICAgcmVzdWx0cy5wdXNoKGVsLmNsYXNzTGlzdC5yZW1vdmUoY2xzKSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRzO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBlbC5jbGFzc05hbWUgPSBlbC5jbGFzc05hbWUucmVwbGFjZShuZXcgUmVnRXhwKCcoXnxcXFxcYiknICsgY2xhc3NOYW1lLnNwbGl0KCcgJykuam9pbignfCcpICsgJyhcXFxcYnwkKScsICdnaScpLCAnICcpO1xuICB9XG59O1xuXG5RSi50b2dnbGVDbGFzcyA9IGZ1bmN0aW9uKGVsLCBjbGFzc05hbWUsIGJvb2wpIHtcbiAgdmFyIGU7XG4gIGlmIChlbC5sZW5ndGgpIHtcbiAgICByZXR1cm4gKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGksIGxlbiwgcmVzdWx0cztcbiAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgIGZvciAoaSA9IDAsIGxlbiA9IGVsLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGUgPSBlbFtpXTtcbiAgICAgICAgcmVzdWx0cy5wdXNoKFFKLnRvZ2dsZUNsYXNzKGUsIGNsYXNzTmFtZSwgYm9vbCkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfSkoKTtcbiAgfVxuICBpZiAoYm9vbCkge1xuICAgIGlmICghUUouaGFzQ2xhc3MoZWwsIGNsYXNzTmFtZSkpIHtcbiAgICAgIHJldHVybiBRSi5hZGRDbGFzcyhlbCwgY2xhc3NOYW1lKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIFFKLnJlbW92ZUNsYXNzKGVsLCBjbGFzc05hbWUpO1xuICB9XG59O1xuXG5RSi5hcHBlbmQgPSBmdW5jdGlvbihlbCwgdG9BcHBlbmQpIHtcbiAgdmFyIGU7XG4gIGlmIChlbC5sZW5ndGgpIHtcbiAgICByZXR1cm4gKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGksIGxlbiwgcmVzdWx0cztcbiAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgIGZvciAoaSA9IDAsIGxlbiA9IGVsLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGUgPSBlbFtpXTtcbiAgICAgICAgcmVzdWx0cy5wdXNoKFFKLmFwcGVuZChlLCB0b0FwcGVuZCkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfSkoKTtcbiAgfVxuICByZXR1cm4gZWwuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCB0b0FwcGVuZCk7XG59O1xuXG5RSi5maW5kID0gZnVuY3Rpb24oZWwsIHNlbGVjdG9yKSB7XG4gIGlmIChlbCBpbnN0YW5jZW9mIE5vZGVMaXN0IHx8IGVsIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICBlbCA9IGVsWzBdO1xuICB9XG4gIHJldHVybiBlbC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbn07XG5cblFKLnRyaWdnZXIgPSBmdW5jdGlvbihlbCwgbmFtZSwgZGF0YSkge1xuICB2YXIgZSwgZXJyb3IsIGV2O1xuICB0cnkge1xuICAgIGV2ID0gbmV3IEN1c3RvbUV2ZW50KG5hbWUsIHtcbiAgICAgIGRldGFpbDogZGF0YVxuICAgIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGUgPSBlcnJvcjtcbiAgICBldiA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuICAgIGlmIChldi5pbml0Q3VzdG9tRXZlbnQpIHtcbiAgICAgIGV2LmluaXRDdXN0b21FdmVudChuYW1lLCB0cnVlLCB0cnVlLCBkYXRhKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXYuaW5pdEV2ZW50KG5hbWUsIHRydWUsIHRydWUsIGRhdGEpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZWwuZGlzcGF0Y2hFdmVudChldik7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFFKO1xuXG5cbn0se31dLDI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuKGZ1bmN0aW9uIChnbG9iYWwpe1xudmFyIFBheW1lbnQsIFFKLCBjYXJkRnJvbU51bWJlciwgY2FyZEZyb21UeXBlLCBjYXJkcywgZGVmYXVsdEZvcm1hdCwgZm9ybWF0QmFja0NhcmROdW1iZXIsIGZvcm1hdEJhY2tFeHBpcnksIGZvcm1hdENhcmROdW1iZXIsIGZvcm1hdEV4cGlyeSwgZm9ybWF0Rm9yd2FyZEV4cGlyeSwgZm9ybWF0Rm9yd2FyZFNsYXNoLCBmb3JtYXRNb250aEV4cGlyeSwgaGFzVGV4dFNlbGVjdGVkLCBsdWhuQ2hlY2ssIHJlRm9ybWF0Q2FyZE51bWJlciwgcmVzdHJpY3RDVkMsIHJlc3RyaWN0Q2FyZE51bWJlciwgcmVzdHJpY3RDb21iaW5lZEV4cGlyeSwgcmVzdHJpY3RFeHBpcnksIHJlc3RyaWN0TW9udGhFeHBpcnksIHJlc3RyaWN0TnVtZXJpYywgcmVzdHJpY3RZZWFyRXhwaXJ5LCBzZXRDYXJkVHlwZSxcbiAgaW5kZXhPZiA9IFtdLmluZGV4T2YgfHwgZnVuY3Rpb24oaXRlbSkgeyBmb3IgKHZhciBpID0gMCwgbCA9IHRoaXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7IGlmIChpIGluIHRoaXMgJiYgdGhpc1tpXSA9PT0gaXRlbSkgcmV0dXJuIGk7IH0gcmV0dXJuIC0xOyB9O1xuXG5RSiA9IHJlcXVpcmUoJ3FqL3NyYy9xai5jb2ZmZWUnKTtcblxuZGVmYXVsdEZvcm1hdCA9IC8oXFxkezEsNH0pL2c7XG5cbmNhcmRzID0gW1xuICB7XG4gICAgdHlwZTogJ2FtZXgnLFxuICAgIHBhdHRlcm46IC9eM1s0N10vLFxuICAgIGZvcm1hdDogLyhcXGR7MSw0fSkoXFxkezEsNn0pPyhcXGR7MSw1fSk/LyxcbiAgICBsZW5ndGg6IFsxNV0sXG4gICAgY3ZjTGVuZ3RoOiBbNF0sXG4gICAgbHVobjogdHJ1ZVxuICB9LCB7XG4gICAgdHlwZTogJ2RhbmtvcnQnLFxuICAgIHBhdHRlcm46IC9eNTAxOS8sXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGxlbmd0aDogWzE2XSxcbiAgICBjdmNMZW5ndGg6IFszXSxcbiAgICBsdWhuOiB0cnVlXG4gIH0sIHtcbiAgICB0eXBlOiAnZGluZXJzY2x1YicsXG4gICAgcGF0dGVybjogL14oMzZ8Mzh8MzBbMC01XSkvLFxuICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICBsZW5ndGg6IFsxNF0sXG4gICAgY3ZjTGVuZ3RoOiBbM10sXG4gICAgbHVobjogdHJ1ZVxuICB9LCB7XG4gICAgdHlwZTogJ2Rpc2NvdmVyJyxcbiAgICBwYXR0ZXJuOiAvXig2MDExfDY1fDY0WzQtOV18NjIyKS8sXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGxlbmd0aDogWzE2XSxcbiAgICBjdmNMZW5ndGg6IFszXSxcbiAgICBsdWhuOiB0cnVlXG4gIH0sIHtcbiAgICB0eXBlOiAnamNiJyxcbiAgICBwYXR0ZXJuOiAvXjM1LyxcbiAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgbGVuZ3RoOiBbMTZdLFxuICAgIGN2Y0xlbmd0aDogWzNdLFxuICAgIGx1aG46IHRydWVcbiAgfSwge1xuICAgIHR5cGU6ICdsYXNlcicsXG4gICAgcGF0dGVybjogL14oNjcwNnw2NzcxfDY3MDkpLyxcbiAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgbGVuZ3RoOiBbMTYsIDE3LCAxOCwgMTldLFxuICAgIGN2Y0xlbmd0aDogWzNdLFxuICAgIGx1aG46IHRydWVcbiAgfSwge1xuICAgIHR5cGU6ICdtYWVzdHJvJyxcbiAgICBwYXR0ZXJuOiAvXig1MDE4fDUwMjB8NTAzOHw2MzA0fDY3MDN8Njc1OXw2NzZbMS0zXSkvLFxuICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICBsZW5ndGg6IFsxMiwgMTMsIDE0LCAxNSwgMTYsIDE3LCAxOCwgMTldLFxuICAgIGN2Y0xlbmd0aDogWzNdLFxuICAgIGx1aG46IHRydWVcbiAgfSwge1xuICAgIHR5cGU6ICdtYXN0ZXJjYXJkJyxcbiAgICBwYXR0ZXJuOiAvXjVbMS01XS8sXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGxlbmd0aDogWzE2XSxcbiAgICBjdmNMZW5ndGg6IFszXSxcbiAgICBsdWhuOiB0cnVlXG4gIH0sIHtcbiAgICB0eXBlOiAndW5pb25wYXknLFxuICAgIHBhdHRlcm46IC9eNjIvLFxuICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICBsZW5ndGg6IFsxNiwgMTcsIDE4LCAxOV0sXG4gICAgY3ZjTGVuZ3RoOiBbM10sXG4gICAgbHVobjogZmFsc2VcbiAgfSwge1xuICAgIHR5cGU6ICd2aXNhZWxlY3Ryb24nLFxuICAgIHBhdHRlcm46IC9eNCgwMjZ8MTc1MDB8NDA1fDUwOHw4NDR8OTFbMzddKS8sXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGxlbmd0aDogWzE2XSxcbiAgICBjdmNMZW5ndGg6IFszXSxcbiAgICBsdWhuOiB0cnVlXG4gIH0sIHtcbiAgICB0eXBlOiAndmlzYScsXG4gICAgcGF0dGVybjogL140LyxcbiAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgbGVuZ3RoOiBbMTMsIDE2XSxcbiAgICBjdmNMZW5ndGg6IFszXSxcbiAgICBsdWhuOiB0cnVlXG4gIH0sIHtcbiAgICB0eXBlOiAnZWxvJyxcbiAgICBwYXR0ZXJuOiAvXjQwMTF8NDM4OTM1fDQ1KDE0MTZ8NzYpfDUwKDQxNzV8NjY5OXw2N3w5MFs0LTddKXw2Myg2Mjk3fDYzNjgpLyxcbiAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgbGVuZ3RoOiBbMTZdLFxuICAgIGN2Y0xlbmd0aDogWzNdLFxuICAgIGx1aG46IHRydWVcbiAgfVxuXTtcblxuY2FyZEZyb21OdW1iZXIgPSBmdW5jdGlvbihudW0pIHtcbiAgdmFyIGNhcmQsIGksIGxlbjtcbiAgbnVtID0gKG51bSArICcnKS5yZXBsYWNlKC9cXEQvZywgJycpO1xuICBmb3IgKGkgPSAwLCBsZW4gPSBjYXJkcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGNhcmQgPSBjYXJkc1tpXTtcbiAgICBpZiAoY2FyZC5wYXR0ZXJuLnRlc3QobnVtKSkge1xuICAgICAgcmV0dXJuIGNhcmQ7XG4gICAgfVxuICB9XG59O1xuXG5jYXJkRnJvbVR5cGUgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciBjYXJkLCBpLCBsZW47XG4gIGZvciAoaSA9IDAsIGxlbiA9IGNhcmRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgY2FyZCA9IGNhcmRzW2ldO1xuICAgIGlmIChjYXJkLnR5cGUgPT09IHR5cGUpIHtcbiAgICAgIHJldHVybiBjYXJkO1xuICAgIH1cbiAgfVxufTtcblxubHVobkNoZWNrID0gZnVuY3Rpb24obnVtKSB7XG4gIHZhciBkaWdpdCwgZGlnaXRzLCBpLCBsZW4sIG9kZCwgc3VtO1xuICBvZGQgPSB0cnVlO1xuICBzdW0gPSAwO1xuICBkaWdpdHMgPSAobnVtICsgJycpLnNwbGl0KCcnKS5yZXZlcnNlKCk7XG4gIGZvciAoaSA9IDAsIGxlbiA9IGRpZ2l0cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGRpZ2l0ID0gZGlnaXRzW2ldO1xuICAgIGRpZ2l0ID0gcGFyc2VJbnQoZGlnaXQsIDEwKTtcbiAgICBpZiAoKG9kZCA9ICFvZGQpKSB7XG4gICAgICBkaWdpdCAqPSAyO1xuICAgIH1cbiAgICBpZiAoZGlnaXQgPiA5KSB7XG4gICAgICBkaWdpdCAtPSA5O1xuICAgIH1cbiAgICBzdW0gKz0gZGlnaXQ7XG4gIH1cbiAgcmV0dXJuIHN1bSAlIDEwID09PSAwO1xufTtcblxuaGFzVGV4dFNlbGVjdGVkID0gZnVuY3Rpb24odGFyZ2V0KSB7XG4gIHZhciByZWY7XG4gIGlmICgodGFyZ2V0LnNlbGVjdGlvblN0YXJ0ICE9IG51bGwpICYmIHRhcmdldC5zZWxlY3Rpb25TdGFydCAhPT0gdGFyZ2V0LnNlbGVjdGlvbkVuZCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmICgodHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiICYmIGRvY3VtZW50ICE9PSBudWxsID8gKHJlZiA9IGRvY3VtZW50LnNlbGVjdGlvbikgIT0gbnVsbCA/IHJlZi5jcmVhdGVSYW5nZSA6IHZvaWQgMCA6IHZvaWQgMCkgIT0gbnVsbCkge1xuICAgIGlmIChkb2N1bWVudC5zZWxlY3Rpb24uY3JlYXRlUmFuZ2UoKS50ZXh0KSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxucmVGb3JtYXRDYXJkTnVtYmVyID0gZnVuY3Rpb24oZSkge1xuICByZXR1cm4gc2V0VGltZW91dCgoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgdGFyZ2V0LCB2YWx1ZTtcbiAgICAgIHRhcmdldCA9IGUudGFyZ2V0O1xuICAgICAgdmFsdWUgPSBRSi52YWwodGFyZ2V0KTtcbiAgICAgIHZhbHVlID0gUGF5bWVudC5mbnMuZm9ybWF0Q2FyZE51bWJlcih2YWx1ZSk7XG4gICAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgdmFsdWUpO1xuICAgIH07XG4gIH0pKHRoaXMpKTtcbn07XG5cbmZvcm1hdENhcmROdW1iZXIgPSBmdW5jdGlvbihlKSB7XG4gIHZhciBjYXJkLCBkaWdpdCwgbGVuZ3RoLCByZSwgdGFyZ2V0LCB1cHBlckxlbmd0aCwgdmFsdWU7XG4gIGRpZ2l0ID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKTtcbiAgaWYgKCEvXlxcZCskLy50ZXN0KGRpZ2l0KSkge1xuICAgIHJldHVybjtcbiAgfVxuICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgdmFsdWUgPSBRSi52YWwodGFyZ2V0KTtcbiAgY2FyZCA9IGNhcmRGcm9tTnVtYmVyKHZhbHVlICsgZGlnaXQpO1xuICBsZW5ndGggPSAodmFsdWUucmVwbGFjZSgvXFxEL2csICcnKSArIGRpZ2l0KS5sZW5ndGg7XG4gIHVwcGVyTGVuZ3RoID0gMTY7XG4gIGlmIChjYXJkKSB7XG4gICAgdXBwZXJMZW5ndGggPSBjYXJkLmxlbmd0aFtjYXJkLmxlbmd0aC5sZW5ndGggLSAxXTtcbiAgfVxuICBpZiAobGVuZ3RoID49IHVwcGVyTGVuZ3RoKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICgodGFyZ2V0LnNlbGVjdGlvblN0YXJ0ICE9IG51bGwpICYmIHRhcmdldC5zZWxlY3Rpb25TdGFydCAhPT0gdmFsdWUubGVuZ3RoKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChjYXJkICYmIGNhcmQudHlwZSA9PT0gJ2FtZXgnKSB7XG4gICAgcmUgPSAvXihcXGR7NH18XFxkezR9XFxzXFxkezZ9KSQvO1xuICB9IGVsc2Uge1xuICAgIHJlID0gLyg/Ol58XFxzKShcXGR7NH0pJC87XG4gIH1cbiAgaWYgKHJlLnRlc3QodmFsdWUpKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCB2YWx1ZSArICcgJyArIGRpZ2l0KTtcbiAgfSBlbHNlIGlmIChyZS50ZXN0KHZhbHVlICsgZGlnaXQpKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCB2YWx1ZSArIGRpZ2l0ICsgJyAnKTtcbiAgfVxufTtcblxuZm9ybWF0QmFja0NhcmROdW1iZXIgPSBmdW5jdGlvbihlKSB7XG4gIHZhciB0YXJnZXQsIHZhbHVlO1xuICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgdmFsdWUgPSBRSi52YWwodGFyZ2V0KTtcbiAgaWYgKGUubWV0YSkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoZS53aGljaCAhPT0gOCkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoKHRhcmdldC5zZWxlY3Rpb25TdGFydCAhPSBudWxsKSAmJiB0YXJnZXQuc2VsZWN0aW9uU3RhcnQgIT09IHZhbHVlLmxlbmd0aCkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoL1xcZFxccyQvLnRlc3QodmFsdWUpKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCB2YWx1ZS5yZXBsYWNlKC9cXGRcXHMkLywgJycpKTtcbiAgfSBlbHNlIGlmICgvXFxzXFxkPyQvLnRlc3QodmFsdWUpKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCB2YWx1ZS5yZXBsYWNlKC9cXHNcXGQ/JC8sICcnKSk7XG4gIH1cbn07XG5cbmZvcm1hdEV4cGlyeSA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIGRpZ2l0LCB0YXJnZXQsIHZhbDtcbiAgZGlnaXQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpO1xuICBpZiAoIS9eXFxkKyQvLnRlc3QoZGlnaXQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRhcmdldCA9IGUudGFyZ2V0O1xuICB2YWwgPSBRSi52YWwodGFyZ2V0KSArIGRpZ2l0O1xuICBpZiAoL15cXGQkLy50ZXN0KHZhbCkgJiYgKHZhbCAhPT0gJzAnICYmIHZhbCAhPT0gJzEnKSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgXCIwXCIgKyB2YWwgKyBcIiAvIFwiKTtcbiAgfSBlbHNlIGlmICgvXlxcZFxcZCQvLnRlc3QodmFsKSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgdmFsICsgXCIgLyBcIik7XG4gIH1cbn07XG5cbmZvcm1hdE1vbnRoRXhwaXJ5ID0gZnVuY3Rpb24oZSkge1xuICB2YXIgZGlnaXQsIHRhcmdldCwgdmFsO1xuICBkaWdpdCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZS53aGljaCk7XG4gIGlmICghL15cXGQrJC8udGVzdChkaWdpdCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gIHZhbCA9IFFKLnZhbCh0YXJnZXQpICsgZGlnaXQ7XG4gIGlmICgvXlxcZCQvLnRlc3QodmFsKSAmJiAodmFsICE9PSAnMCcgJiYgdmFsICE9PSAnMScpKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCBcIjBcIiArIHZhbCk7XG4gIH0gZWxzZSBpZiAoL15cXGRcXGQkLy50ZXN0KHZhbCkpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIFwiXCIgKyB2YWwpO1xuICB9XG59O1xuXG5mb3JtYXRGb3J3YXJkRXhwaXJ5ID0gZnVuY3Rpb24oZSkge1xuICB2YXIgZGlnaXQsIHRhcmdldCwgdmFsO1xuICBkaWdpdCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZS53aGljaCk7XG4gIGlmICghL15cXGQrJC8udGVzdChkaWdpdCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gIHZhbCA9IFFKLnZhbCh0YXJnZXQpO1xuICBpZiAoL15cXGRcXGQkLy50ZXN0KHZhbCkpIHtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgdmFsICsgXCIgLyBcIik7XG4gIH1cbn07XG5cbmZvcm1hdEZvcndhcmRTbGFzaCA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIHNsYXNoLCB0YXJnZXQsIHZhbDtcbiAgc2xhc2ggPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpO1xuICBpZiAoc2xhc2ggIT09ICcvJykge1xuICAgIHJldHVybjtcbiAgfVxuICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgdmFsID0gUUoudmFsKHRhcmdldCk7XG4gIGlmICgvXlxcZCQvLnRlc3QodmFsKSAmJiB2YWwgIT09ICcwJykge1xuICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCBcIjBcIiArIHZhbCArIFwiIC8gXCIpO1xuICB9XG59O1xuXG5mb3JtYXRCYWNrRXhwaXJ5ID0gZnVuY3Rpb24oZSkge1xuICB2YXIgdGFyZ2V0LCB2YWx1ZTtcbiAgaWYgKGUubWV0YUtleSkge1xuICAgIHJldHVybjtcbiAgfVxuICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgdmFsdWUgPSBRSi52YWwodGFyZ2V0KTtcbiAgaWYgKGUud2hpY2ggIT09IDgpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKCh0YXJnZXQuc2VsZWN0aW9uU3RhcnQgIT0gbnVsbCkgJiYgdGFyZ2V0LnNlbGVjdGlvblN0YXJ0ICE9PSB2YWx1ZS5sZW5ndGgpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKC9cXGQoXFxzfFxcLykrJC8udGVzdCh2YWx1ZSkpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIHZhbHVlLnJlcGxhY2UoL1xcZChcXHN8XFwvKSokLywgJycpKTtcbiAgfSBlbHNlIGlmICgvXFxzXFwvXFxzP1xcZD8kLy50ZXN0KHZhbHVlKSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgdmFsdWUucmVwbGFjZSgvXFxzXFwvXFxzP1xcZD8kLywgJycpKTtcbiAgfVxufTtcblxucmVzdHJpY3ROdW1lcmljID0gZnVuY3Rpb24oZSkge1xuICB2YXIgaW5wdXQ7XG4gIGlmIChlLm1ldGFLZXkgfHwgZS5jdHJsS2V5KSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKGUud2hpY2ggPT09IDMyKSB7XG4gICAgcmV0dXJuIGUucHJldmVudERlZmF1bHQoKTtcbiAgfVxuICBpZiAoZS53aGljaCA9PT0gMCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmIChlLndoaWNoIDwgMzMpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpbnB1dCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZS53aGljaCk7XG4gIGlmICghL1tcXGRcXHNdLy50ZXN0KGlucHV0KSkge1xuICAgIHJldHVybiBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH1cbn07XG5cbnJlc3RyaWN0Q2FyZE51bWJlciA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIGNhcmQsIGRpZ2l0LCB0YXJnZXQsIHZhbHVlO1xuICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgZGlnaXQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpO1xuICBpZiAoIS9eXFxkKyQvLnRlc3QoZGlnaXQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChoYXNUZXh0U2VsZWN0ZWQodGFyZ2V0KSkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YWx1ZSA9IChRSi52YWwodGFyZ2V0KSArIGRpZ2l0KS5yZXBsYWNlKC9cXEQvZywgJycpO1xuICBjYXJkID0gY2FyZEZyb21OdW1iZXIodmFsdWUpO1xuICBpZiAoY2FyZCkge1xuICAgIGlmICghKHZhbHVlLmxlbmd0aCA8PSBjYXJkLmxlbmd0aFtjYXJkLmxlbmd0aC5sZW5ndGggLSAxXSkpIHtcbiAgICAgIHJldHVybiBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmICghKHZhbHVlLmxlbmd0aCA8PSAxNikpIHtcbiAgICAgIHJldHVybiBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG59O1xuXG5yZXN0cmljdEV4cGlyeSA9IGZ1bmN0aW9uKGUsIGxlbmd0aCkge1xuICB2YXIgZGlnaXQsIHRhcmdldCwgdmFsdWU7XG4gIHRhcmdldCA9IGUudGFyZ2V0O1xuICBkaWdpdCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZS53aGljaCk7XG4gIGlmICghL15cXGQrJC8udGVzdChkaWdpdCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGhhc1RleHRTZWxlY3RlZCh0YXJnZXQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhbHVlID0gUUoudmFsKHRhcmdldCkgKyBkaWdpdDtcbiAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9cXEQvZywgJycpO1xuICBpZiAodmFsdWUubGVuZ3RoID4gbGVuZ3RoKSB7XG4gICAgcmV0dXJuIGUucHJldmVudERlZmF1bHQoKTtcbiAgfVxufTtcblxucmVzdHJpY3RDb21iaW5lZEV4cGlyeSA9IGZ1bmN0aW9uKGUpIHtcbiAgcmV0dXJuIHJlc3RyaWN0RXhwaXJ5KGUsIDYpO1xufTtcblxucmVzdHJpY3RNb250aEV4cGlyeSA9IGZ1bmN0aW9uKGUpIHtcbiAgcmV0dXJuIHJlc3RyaWN0RXhwaXJ5KGUsIDIpO1xufTtcblxucmVzdHJpY3RZZWFyRXhwaXJ5ID0gZnVuY3Rpb24oZSkge1xuICByZXR1cm4gcmVzdHJpY3RFeHBpcnkoZSwgNCk7XG59O1xuXG5yZXN0cmljdENWQyA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIGRpZ2l0LCB0YXJnZXQsIHZhbDtcbiAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gIGRpZ2l0ID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKTtcbiAgaWYgKCEvXlxcZCskLy50ZXN0KGRpZ2l0KSkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoaGFzVGV4dFNlbGVjdGVkKHRhcmdldCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFsID0gUUoudmFsKHRhcmdldCkgKyBkaWdpdDtcbiAgaWYgKCEodmFsLmxlbmd0aCA8PSA0KSkge1xuICAgIHJldHVybiBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH1cbn07XG5cbnNldENhcmRUeXBlID0gZnVuY3Rpb24oZSkge1xuICB2YXIgYWxsVHlwZXMsIGNhcmQsIGNhcmRUeXBlLCB0YXJnZXQsIHZhbDtcbiAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gIHZhbCA9IFFKLnZhbCh0YXJnZXQpO1xuICBjYXJkVHlwZSA9IFBheW1lbnQuZm5zLmNhcmRUeXBlKHZhbCkgfHwgJ3Vua25vd24nO1xuICBpZiAoIVFKLmhhc0NsYXNzKHRhcmdldCwgY2FyZFR5cGUpKSB7XG4gICAgYWxsVHlwZXMgPSAoZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaSwgbGVuLCByZXN1bHRzO1xuICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgZm9yIChpID0gMCwgbGVuID0gY2FyZHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgY2FyZCA9IGNhcmRzW2ldO1xuICAgICAgICByZXN1bHRzLnB1c2goY2FyZC50eXBlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH0pKCk7XG4gICAgUUoucmVtb3ZlQ2xhc3ModGFyZ2V0LCAndW5rbm93bicpO1xuICAgIFFKLnJlbW92ZUNsYXNzKHRhcmdldCwgYWxsVHlwZXMuam9pbignICcpKTtcbiAgICBRSi5hZGRDbGFzcyh0YXJnZXQsIGNhcmRUeXBlKTtcbiAgICBRSi50b2dnbGVDbGFzcyh0YXJnZXQsICdpZGVudGlmaWVkJywgY2FyZFR5cGUgIT09ICd1bmtub3duJyk7XG4gICAgcmV0dXJuIFFKLnRyaWdnZXIodGFyZ2V0LCAncGF5bWVudC5jYXJkVHlwZScsIGNhcmRUeXBlKTtcbiAgfVxufTtcblxuUGF5bWVudCA9IChmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gUGF5bWVudCgpIHt9XG5cbiAgUGF5bWVudC5mbnMgPSB7XG4gICAgY2FyZEV4cGlyeVZhbDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHZhciBtb250aCwgcHJlZml4LCByZWYsIHllYXI7XG4gICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1xccy9nLCAnJyk7XG4gICAgICByZWYgPSB2YWx1ZS5zcGxpdCgnLycsIDIpLCBtb250aCA9IHJlZlswXSwgeWVhciA9IHJlZlsxXTtcbiAgICAgIGlmICgoeWVhciAhPSBudWxsID8geWVhci5sZW5ndGggOiB2b2lkIDApID09PSAyICYmIC9eXFxkKyQvLnRlc3QoeWVhcikpIHtcbiAgICAgICAgcHJlZml4ID0gKG5ldyBEYXRlKS5nZXRGdWxsWWVhcigpO1xuICAgICAgICBwcmVmaXggPSBwcmVmaXgudG9TdHJpbmcoKS5zbGljZSgwLCAyKTtcbiAgICAgICAgeWVhciA9IHByZWZpeCArIHllYXI7XG4gICAgICB9XG4gICAgICBtb250aCA9IHBhcnNlSW50KG1vbnRoLCAxMCk7XG4gICAgICB5ZWFyID0gcGFyc2VJbnQoeWVhciwgMTApO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbW9udGg6IG1vbnRoLFxuICAgICAgICB5ZWFyOiB5ZWFyXG4gICAgICB9O1xuICAgIH0sXG4gICAgdmFsaWRhdGVDYXJkTnVtYmVyOiBmdW5jdGlvbihudW0pIHtcbiAgICAgIHZhciBjYXJkLCByZWY7XG4gICAgICBudW0gPSAobnVtICsgJycpLnJlcGxhY2UoL1xccyt8LS9nLCAnJyk7XG4gICAgICBpZiAoIS9eXFxkKyQvLnRlc3QobnVtKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBjYXJkID0gY2FyZEZyb21OdW1iZXIobnVtKTtcbiAgICAgIGlmICghY2FyZCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gKHJlZiA9IG51bS5sZW5ndGgsIGluZGV4T2YuY2FsbChjYXJkLmxlbmd0aCwgcmVmKSA+PSAwKSAmJiAoY2FyZC5sdWhuID09PSBmYWxzZSB8fCBsdWhuQ2hlY2sobnVtKSk7XG4gICAgfSxcbiAgICB2YWxpZGF0ZUNhcmRFeHBpcnk6IGZ1bmN0aW9uKG1vbnRoLCB5ZWFyKSB7XG4gICAgICB2YXIgY3VycmVudFRpbWUsIGV4cGlyeSwgcHJlZml4LCByZWY7XG4gICAgICBpZiAodHlwZW9mIG1vbnRoID09PSAnb2JqZWN0JyAmJiAnbW9udGgnIGluIG1vbnRoKSB7XG4gICAgICAgIHJlZiA9IG1vbnRoLCBtb250aCA9IHJlZi5tb250aCwgeWVhciA9IHJlZi55ZWFyO1xuICAgICAgfVxuICAgICAgaWYgKCEobW9udGggJiYgeWVhcikpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgbW9udGggPSBRSi50cmltKG1vbnRoKTtcbiAgICAgIHllYXIgPSBRSi50cmltKHllYXIpO1xuICAgICAgaWYgKCEvXlxcZCskLy50ZXN0KG1vbnRoKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoIS9eXFxkKyQvLnRlc3QoeWVhcikpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKCEocGFyc2VJbnQobW9udGgsIDEwKSA8PSAxMikpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKHllYXIubGVuZ3RoID09PSAyKSB7XG4gICAgICAgIHByZWZpeCA9IChuZXcgRGF0ZSkuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgcHJlZml4ID0gcHJlZml4LnRvU3RyaW5nKCkuc2xpY2UoMCwgMik7XG4gICAgICAgIHllYXIgPSBwcmVmaXggKyB5ZWFyO1xuICAgICAgfVxuICAgICAgZXhwaXJ5ID0gbmV3IERhdGUoeWVhciwgbW9udGgpO1xuICAgICAgY3VycmVudFRpbWUgPSBuZXcgRGF0ZTtcbiAgICAgIGV4cGlyeS5zZXRNb250aChleHBpcnkuZ2V0TW9udGgoKSAtIDEpO1xuICAgICAgZXhwaXJ5LnNldE1vbnRoKGV4cGlyeS5nZXRNb250aCgpICsgMSwgMSk7XG4gICAgICByZXR1cm4gZXhwaXJ5ID4gY3VycmVudFRpbWU7XG4gICAgfSxcbiAgICB2YWxpZGF0ZUNhcmRDVkM6IGZ1bmN0aW9uKGN2YywgdHlwZSkge1xuICAgICAgdmFyIHJlZiwgcmVmMTtcbiAgICAgIGN2YyA9IFFKLnRyaW0oY3ZjKTtcbiAgICAgIGlmICghL15cXGQrJC8udGVzdChjdmMpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlICYmIGNhcmRGcm9tVHlwZSh0eXBlKSkge1xuICAgICAgICByZXR1cm4gcmVmID0gY3ZjLmxlbmd0aCwgaW5kZXhPZi5jYWxsKChyZWYxID0gY2FyZEZyb21UeXBlKHR5cGUpKSAhPSBudWxsID8gcmVmMS5jdmNMZW5ndGggOiB2b2lkIDAsIHJlZikgPj0gMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBjdmMubGVuZ3RoID49IDMgJiYgY3ZjLmxlbmd0aCA8PSA0O1xuICAgICAgfVxuICAgIH0sXG4gICAgY2FyZFR5cGU6IGZ1bmN0aW9uKG51bSkge1xuICAgICAgdmFyIHJlZjtcbiAgICAgIGlmICghbnVtKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgcmV0dXJuICgocmVmID0gY2FyZEZyb21OdW1iZXIobnVtKSkgIT0gbnVsbCA/IHJlZi50eXBlIDogdm9pZCAwKSB8fCBudWxsO1xuICAgIH0sXG4gICAgZm9ybWF0Q2FyZE51bWJlcjogZnVuY3Rpb24obnVtKSB7XG4gICAgICB2YXIgY2FyZCwgZ3JvdXBzLCByZWYsIHVwcGVyTGVuZ3RoO1xuICAgICAgY2FyZCA9IGNhcmRGcm9tTnVtYmVyKG51bSk7XG4gICAgICBpZiAoIWNhcmQpIHtcbiAgICAgICAgcmV0dXJuIG51bTtcbiAgICAgIH1cbiAgICAgIHVwcGVyTGVuZ3RoID0gY2FyZC5sZW5ndGhbY2FyZC5sZW5ndGgubGVuZ3RoIC0gMV07XG4gICAgICBudW0gPSBudW0ucmVwbGFjZSgvXFxEL2csICcnKTtcbiAgICAgIG51bSA9IG51bS5zbGljZSgwLCArdXBwZXJMZW5ndGggKyAxIHx8IDllOSk7XG4gICAgICBpZiAoY2FyZC5mb3JtYXQuZ2xvYmFsKSB7XG4gICAgICAgIHJldHVybiAocmVmID0gbnVtLm1hdGNoKGNhcmQuZm9ybWF0KSkgIT0gbnVsbCA/IHJlZi5qb2luKCcgJykgOiB2b2lkIDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBncm91cHMgPSBjYXJkLmZvcm1hdC5leGVjKG51bSk7XG4gICAgICAgIGlmIChncm91cHMgIT0gbnVsbCkge1xuICAgICAgICAgIGdyb3Vwcy5zaGlmdCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBncm91cHMgIT0gbnVsbCA/IGdyb3Vwcy5qb2luKCcgJykgOiB2b2lkIDA7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIFBheW1lbnQucmVzdHJpY3ROdW1lcmljID0gZnVuY3Rpb24oZWwpIHtcbiAgICByZXR1cm4gUUoub24oZWwsICdrZXlwcmVzcycsIHJlc3RyaWN0TnVtZXJpYyk7XG4gIH07XG5cbiAgUGF5bWVudC5jYXJkRXhwaXJ5VmFsID0gZnVuY3Rpb24oZWwpIHtcbiAgICByZXR1cm4gUGF5bWVudC5mbnMuY2FyZEV4cGlyeVZhbChRSi52YWwoZWwpKTtcbiAgfTtcblxuICBQYXltZW50LmZvcm1hdENhcmRDVkMgPSBmdW5jdGlvbihlbCkge1xuICAgIFBheW1lbnQucmVzdHJpY3ROdW1lcmljKGVsKTtcbiAgICBRSi5vbihlbCwgJ2tleXByZXNzJywgcmVzdHJpY3RDVkMpO1xuICAgIHJldHVybiBlbDtcbiAgfTtcblxuICBQYXltZW50LmZvcm1hdENhcmRFeHBpcnkgPSBmdW5jdGlvbihlbCkge1xuICAgIHZhciBtb250aCwgeWVhcjtcbiAgICBQYXltZW50LnJlc3RyaWN0TnVtZXJpYyhlbCk7XG4gICAgaWYgKGVsLmxlbmd0aCAmJiBlbC5sZW5ndGggPT09IDIpIHtcbiAgICAgIG1vbnRoID0gZWxbMF0sIHllYXIgPSBlbFsxXTtcbiAgICAgIHRoaXMuZm9ybWF0Q2FyZEV4cGlyeU11bHRpcGxlKG1vbnRoLCB5ZWFyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgUUoub24oZWwsICdrZXlwcmVzcycsIHJlc3RyaWN0Q29tYmluZWRFeHBpcnkpO1xuICAgICAgUUoub24oZWwsICdrZXlwcmVzcycsIGZvcm1hdEV4cGlyeSk7XG4gICAgICBRSi5vbihlbCwgJ2tleXByZXNzJywgZm9ybWF0Rm9yd2FyZFNsYXNoKTtcbiAgICAgIFFKLm9uKGVsLCAna2V5cHJlc3MnLCBmb3JtYXRGb3J3YXJkRXhwaXJ5KTtcbiAgICAgIFFKLm9uKGVsLCAna2V5ZG93bicsIGZvcm1hdEJhY2tFeHBpcnkpO1xuICAgIH1cbiAgICByZXR1cm4gZWw7XG4gIH07XG5cbiAgUGF5bWVudC5mb3JtYXRDYXJkRXhwaXJ5TXVsdGlwbGUgPSBmdW5jdGlvbihtb250aCwgeWVhcikge1xuICAgIFFKLm9uKG1vbnRoLCAna2V5cHJlc3MnLCByZXN0cmljdE1vbnRoRXhwaXJ5KTtcbiAgICBRSi5vbihtb250aCwgJ2tleXByZXNzJywgZm9ybWF0TW9udGhFeHBpcnkpO1xuICAgIHJldHVybiBRSi5vbih5ZWFyLCAna2V5cHJlc3MnLCByZXN0cmljdFllYXJFeHBpcnkpO1xuICB9O1xuXG4gIFBheW1lbnQuZm9ybWF0Q2FyZE51bWJlciA9IGZ1bmN0aW9uKGVsKSB7XG4gICAgUGF5bWVudC5yZXN0cmljdE51bWVyaWMoZWwpO1xuICAgIFFKLm9uKGVsLCAna2V5cHJlc3MnLCByZXN0cmljdENhcmROdW1iZXIpO1xuICAgIFFKLm9uKGVsLCAna2V5cHJlc3MnLCBmb3JtYXRDYXJkTnVtYmVyKTtcbiAgICBRSi5vbihlbCwgJ2tleWRvd24nLCBmb3JtYXRCYWNrQ2FyZE51bWJlcik7XG4gICAgUUoub24oZWwsICdrZXl1cCcsIHNldENhcmRUeXBlKTtcbiAgICBRSi5vbihlbCwgJ3Bhc3RlJywgcmVGb3JtYXRDYXJkTnVtYmVyKTtcbiAgICByZXR1cm4gZWw7XG4gIH07XG5cbiAgUGF5bWVudC5nZXRDYXJkQXJyYXkgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gY2FyZHM7XG4gIH07XG5cbiAgUGF5bWVudC5zZXRDYXJkQXJyYXkgPSBmdW5jdGlvbihjYXJkQXJyYXkpIHtcbiAgICBjYXJkcyA9IGNhcmRBcnJheTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICBQYXltZW50LmFkZFRvQ2FyZEFycmF5ID0gZnVuY3Rpb24oY2FyZE9iamVjdCkge1xuICAgIHJldHVybiBjYXJkcy5wdXNoKGNhcmRPYmplY3QpO1xuICB9O1xuXG4gIFBheW1lbnQucmVtb3ZlRnJvbUNhcmRBcnJheSA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgICB2YXIga2V5LCB2YWx1ZTtcbiAgICBmb3IgKGtleSBpbiBjYXJkcykge1xuICAgICAgdmFsdWUgPSBjYXJkc1trZXldO1xuICAgICAgaWYgKHZhbHVlLnR5cGUgPT09IHR5cGUpIHtcbiAgICAgICAgY2FyZHMuc3BsaWNlKGtleSwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIHJldHVybiBQYXltZW50O1xuXG59KSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBheW1lbnQ7XG5cbmdsb2JhbC5QYXltZW50ID0gUGF5bWVudDtcblxuXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbn0se1wicWovc3JjL3FqLmNvZmZlZVwiOjF9XX0se30sWzJdKSgyKVxufSk7IiwiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSh7MTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XCJ1c2Ugc3RyaWN0XCI7dmFyIF92YWxpZEZvcm09cmVxdWlyZShcIi4vc3JjL3ZhbGlkLWZvcm1cIik7dmFyIF92YWxpZEZvcm0yPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3ZhbGlkRm9ybSk7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmope3JldHVybiBvYmomJm9iai5fX2VzTW9kdWxlP29iajp7ZGVmYXVsdDpvYmp9fXdpbmRvdy5WYWxpZEZvcm09X3ZhbGlkRm9ybTIuZGVmYXVsdDt3aW5kb3cuVmFsaWRGb3JtLnRvZ2dsZUludmFsaWRDbGFzcz1fdmFsaWRGb3JtLnRvZ2dsZUludmFsaWRDbGFzczt3aW5kb3cuVmFsaWRGb3JtLmhhbmRsZUN1c3RvbU1lc3NhZ2VzPV92YWxpZEZvcm0uaGFuZGxlQ3VzdG9tTWVzc2FnZXM7d2luZG93LlZhbGlkRm9ybS5oYW5kbGVDdXN0b21NZXNzYWdlRGlzcGxheT1fdmFsaWRGb3JtLmhhbmRsZUN1c3RvbU1lc3NhZ2VEaXNwbGF5fSx7XCIuL3NyYy92YWxpZC1mb3JtXCI6M31dLDI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1widXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTp0cnVlfSk7ZXhwb3J0cy5jbG9uZT1jbG9uZTtleHBvcnRzLmRlZmF1bHRzPWRlZmF1bHRzO2V4cG9ydHMuaW5zZXJ0QWZ0ZXI9aW5zZXJ0QWZ0ZXI7ZXhwb3J0cy5pbnNlcnRCZWZvcmU9aW5zZXJ0QmVmb3JlO2V4cG9ydHMuZm9yRWFjaD1mb3JFYWNoO2V4cG9ydHMuZGVib3VuY2U9ZGVib3VuY2U7ZnVuY3Rpb24gY2xvbmUob2JqKXt2YXIgY29weT17fTtmb3IodmFyIGF0dHIgaW4gb2JqKXtpZihvYmouaGFzT3duUHJvcGVydHkoYXR0cikpY29weVthdHRyXT1vYmpbYXR0cl19cmV0dXJuIGNvcHl9ZnVuY3Rpb24gZGVmYXVsdHMob2JqLGRlZmF1bHRPYmplY3Qpe29iaj1jbG9uZShvYmp8fHt9KTtmb3IodmFyIGsgaW4gZGVmYXVsdE9iamVjdCl7aWYob2JqW2tdPT09dW5kZWZpbmVkKW9ialtrXT1kZWZhdWx0T2JqZWN0W2tdfXJldHVybiBvYmp9ZnVuY3Rpb24gaW5zZXJ0QWZ0ZXIocmVmTm9kZSxub2RlVG9JbnNlcnQpe3ZhciBzaWJsaW5nPXJlZk5vZGUubmV4dFNpYmxpbmc7aWYoc2libGluZyl7dmFyIF9wYXJlbnQ9cmVmTm9kZS5wYXJlbnROb2RlO19wYXJlbnQuaW5zZXJ0QmVmb3JlKG5vZGVUb0luc2VydCxzaWJsaW5nKX1lbHNle3BhcmVudC5hcHBlbmRDaGlsZChub2RlVG9JbnNlcnQpfX1mdW5jdGlvbiBpbnNlcnRCZWZvcmUocmVmTm9kZSxub2RlVG9JbnNlcnQpe3ZhciBwYXJlbnQ9cmVmTm9kZS5wYXJlbnROb2RlO3BhcmVudC5pbnNlcnRCZWZvcmUobm9kZVRvSW5zZXJ0LHJlZk5vZGUpfWZ1bmN0aW9uIGZvckVhY2goaXRlbXMsZm4pe2lmKCFpdGVtcylyZXR1cm47aWYoaXRlbXMuZm9yRWFjaCl7aXRlbXMuZm9yRWFjaChmbil9ZWxzZXtmb3IodmFyIGk9MDtpPGl0ZW1zLmxlbmd0aDtpKyspe2ZuKGl0ZW1zW2ldLGksaXRlbXMpfX19ZnVuY3Rpb24gZGVib3VuY2UobXMsZm4pe3ZhciB0aW1lb3V0PXZvaWQgMDt2YXIgZGVib3VuY2VkRm49ZnVuY3Rpb24gZGVib3VuY2VkRm4oKXtjbGVhclRpbWVvdXQodGltZW91dCk7dGltZW91dD1zZXRUaW1lb3V0KGZuLG1zKX07cmV0dXJuIGRlYm91bmNlZEZufX0se31dLDM6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1widXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTp0cnVlfSk7ZXhwb3J0cy50b2dnbGVJbnZhbGlkQ2xhc3M9dG9nZ2xlSW52YWxpZENsYXNzO2V4cG9ydHMuaGFuZGxlQ3VzdG9tTWVzc2FnZXM9aGFuZGxlQ3VzdG9tTWVzc2FnZXM7ZXhwb3J0cy5oYW5kbGVDdXN0b21NZXNzYWdlRGlzcGxheT1oYW5kbGVDdXN0b21NZXNzYWdlRGlzcGxheTtleHBvcnRzLmRlZmF1bHQ9dmFsaWRGb3JtO3ZhciBfdXRpbD1yZXF1aXJlKFwiLi91dGlsXCIpO2Z1bmN0aW9uIHRvZ2dsZUludmFsaWRDbGFzcyhpbnB1dCxpbnZhbGlkQ2xhc3Mpe2lucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnZhbGlkXCIsZnVuY3Rpb24oKXtpbnB1dC5jbGFzc0xpc3QuYWRkKGludmFsaWRDbGFzcyl9KTtpbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIixmdW5jdGlvbigpe2lmKGlucHV0LnZhbGlkaXR5LnZhbGlkKXtpbnB1dC5jbGFzc0xpc3QucmVtb3ZlKGludmFsaWRDbGFzcyl9fSl9dmFyIGVycm9yUHJvcHM9W1wiYmFkSW5wdXRcIixcInBhdHRlcm5NaXNtYXRjaFwiLFwicmFuZ2VPdmVyZmxvd1wiLFwicmFuZ2VVbmRlcmZsb3dcIixcInN0ZXBNaXNtYXRjaFwiLFwidG9vTG9uZ1wiLFwidG9vU2hvcnRcIixcInR5cGVNaXNtYXRjaFwiLFwidmFsdWVNaXNzaW5nXCIsXCJjdXN0b21FcnJvclwiXTtmdW5jdGlvbiBnZXRDdXN0b21NZXNzYWdlKGlucHV0LGN1c3RvbU1lc3NhZ2VzKXtjdXN0b21NZXNzYWdlcz1jdXN0b21NZXNzYWdlc3x8e307dmFyIGxvY2FsRXJyb3JQcm9wcz1baW5wdXQudHlwZStcIk1pc21hdGNoXCJdLmNvbmNhdChlcnJvclByb3BzKTt2YXIgdmFsaWRpdHk9aW5wdXQudmFsaWRpdHk7Zm9yKHZhciBpPTA7aTxsb2NhbEVycm9yUHJvcHMubGVuZ3RoO2krKyl7dmFyIHByb3A9bG9jYWxFcnJvclByb3BzW2ldO2lmKHZhbGlkaXR5W3Byb3BdKXtyZXR1cm4gaW5wdXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1cIitwcm9wKXx8Y3VzdG9tTWVzc2FnZXNbcHJvcF19fX1mdW5jdGlvbiBoYW5kbGVDdXN0b21NZXNzYWdlcyhpbnB1dCxjdXN0b21NZXNzYWdlcyl7ZnVuY3Rpb24gY2hlY2tWYWxpZGl0eSgpe3ZhciBtZXNzYWdlPWlucHV0LnZhbGlkaXR5LnZhbGlkP251bGw6Z2V0Q3VzdG9tTWVzc2FnZShpbnB1dCxjdXN0b21NZXNzYWdlcyk7aW5wdXQuc2V0Q3VzdG9tVmFsaWRpdHkobWVzc2FnZXx8XCJcIil9aW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsY2hlY2tWYWxpZGl0eSk7aW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImludmFsaWRcIixjaGVja1ZhbGlkaXR5KX1mdW5jdGlvbiBoYW5kbGVDdXN0b21NZXNzYWdlRGlzcGxheShpbnB1dCxvcHRpb25zKXt2YXIgdmFsaWRhdGlvbkVycm9yQ2xhc3M9b3B0aW9ucy52YWxpZGF0aW9uRXJyb3JDbGFzcyx2YWxpZGF0aW9uRXJyb3JQYXJlbnRDbGFzcz1vcHRpb25zLnZhbGlkYXRpb25FcnJvclBhcmVudENsYXNzLGVycm9yUGxhY2VtZW50PW9wdGlvbnMuZXJyb3JQbGFjZW1lbnQ7ZnVuY3Rpb24gY2hlY2tWYWxpZGl0eShvcHRpb25zKXt2YXIgaW5zZXJ0RXJyb3I9b3B0aW9ucy5pbnNlcnRFcnJvcjt2YXIgcGFyZW50Tm9kZT1pbnB1dC5wYXJlbnROb2RlO3ZhciBlcnJvck5vZGU9cGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKFwiLlwiK3ZhbGlkYXRpb25FcnJvckNsYXNzKXx8ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtpZighaW5wdXQudmFsaWRpdHkudmFsaWQmJmlucHV0LnZhbGlkYXRpb25NZXNzYWdlKXtlcnJvck5vZGUuY2xhc3NOYW1lPXZhbGlkYXRpb25FcnJvckNsYXNzO2Vycm9yTm9kZS50ZXh0Q29udGVudD1pbnB1dC52YWxpZGF0aW9uTWVzc2FnZTtpZihpbnNlcnRFcnJvcil7ZXJyb3JQbGFjZW1lbnQ9PT1cImJlZm9yZVwiPygwLF91dGlsLmluc2VydEJlZm9yZSkoaW5wdXQsZXJyb3JOb2RlKTooMCxfdXRpbC5pbnNlcnRBZnRlcikoaW5wdXQsZXJyb3JOb2RlKTtwYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQodmFsaWRhdGlvbkVycm9yUGFyZW50Q2xhc3MpfX1lbHNle3BhcmVudE5vZGUuY2xhc3NMaXN0LnJlbW92ZSh2YWxpZGF0aW9uRXJyb3JQYXJlbnRDbGFzcyk7ZXJyb3JOb2RlLnJlbW92ZSgpfX1pbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIixmdW5jdGlvbigpe2NoZWNrVmFsaWRpdHkoe2luc2VydEVycm9yOmZhbHNlfSl9KTtpbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiaW52YWxpZFwiLGZ1bmN0aW9uKGUpe2UucHJldmVudERlZmF1bHQoKTtjaGVja1ZhbGlkaXR5KHtpbnNlcnRFcnJvcjp0cnVlfSl9KX12YXIgZGVmYXVsdE9wdGlvbnM9e2ludmFsaWRDbGFzczpcImludmFsaWRcIix2YWxpZGF0aW9uRXJyb3JDbGFzczpcInZhbGlkYXRpb24tZXJyb3JcIix2YWxpZGF0aW9uRXJyb3JQYXJlbnRDbGFzczpcImhhcy12YWxpZGF0aW9uLWVycm9yXCIsY3VzdG9tTWVzc2FnZXM6e30sZXJyb3JQbGFjZW1lbnQ6XCJiZWZvcmVcIn07ZnVuY3Rpb24gdmFsaWRGb3JtKGVsZW1lbnQsb3B0aW9ucyl7aWYoIWVsZW1lbnR8fCFlbGVtZW50Lm5vZGVOYW1lKXt0aHJvdyBuZXcgRXJyb3IoXCJGaXJzdCBhcmcgdG8gdmFsaWRGb3JtIG11c3QgYmUgYSBmb3JtLCBpbnB1dCwgc2VsZWN0LCBvciB0ZXh0YXJlYVwiKX12YXIgaW5wdXRzPXZvaWQgMDt2YXIgdHlwZT1lbGVtZW50Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7b3B0aW9ucz0oMCxfdXRpbC5kZWZhdWx0cykob3B0aW9ucyxkZWZhdWx0T3B0aW9ucyk7aWYodHlwZT09PVwiZm9ybVwiKXtpbnB1dHM9ZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXQsIHNlbGVjdCwgdGV4dGFyZWFcIik7Zm9jdXNJbnZhbGlkSW5wdXQoZWxlbWVudCxpbnB1dHMpfWVsc2UgaWYodHlwZT09PVwiaW5wdXRcInx8dHlwZT09PVwic2VsZWN0XCJ8fHR5cGU9PT1cInRleHRhcmVhXCIpe2lucHV0cz1bZWxlbWVudF19ZWxzZXt0aHJvdyBuZXcgRXJyb3IoXCJPbmx5IGZvcm0sIGlucHV0LCBzZWxlY3QsIG9yIHRleHRhcmVhIGVsZW1lbnRzIGFyZSBzdXBwb3J0ZWRcIil9dmFsaWRGb3JtSW5wdXRzKGlucHV0cyxvcHRpb25zKX1mdW5jdGlvbiBmb2N1c0ludmFsaWRJbnB1dChmb3JtLGlucHV0cyl7dmFyIGZvY3VzRmlyc3Q9KDAsX3V0aWwuZGVib3VuY2UpKDEwMCxmdW5jdGlvbigpe3ZhciBpbnZhbGlkTm9kZT1mb3JtLnF1ZXJ5U2VsZWN0b3IoXCI6aW52YWxpZFwiKTtpZihpbnZhbGlkTm9kZSlpbnZhbGlkTm9kZS5mb2N1cygpfSk7KDAsX3V0aWwuZm9yRWFjaCkoaW5wdXRzLGZ1bmN0aW9uKGlucHV0KXtyZXR1cm4gaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImludmFsaWRcIixmb2N1c0ZpcnN0KX0pfWZ1bmN0aW9uIHZhbGlkRm9ybUlucHV0cyhpbnB1dHMsb3B0aW9ucyl7dmFyIGludmFsaWRDbGFzcz1vcHRpb25zLmludmFsaWRDbGFzcyxjdXN0b21NZXNzYWdlcz1vcHRpb25zLmN1c3RvbU1lc3NhZ2VzOygwLF91dGlsLmZvckVhY2gpKGlucHV0cyxmdW5jdGlvbihpbnB1dCl7dG9nZ2xlSW52YWxpZENsYXNzKGlucHV0LGludmFsaWRDbGFzcyk7aGFuZGxlQ3VzdG9tTWVzc2FnZXMoaW5wdXQsY3VzdG9tTWVzc2FnZXMpO2hhbmRsZUN1c3RvbU1lc3NhZ2VEaXNwbGF5KGlucHV0LG9wdGlvbnMpfSl9fSx7XCIuL3V0aWxcIjoyfV19LHt9LFsxXSk7IiwiLy8gTWlublBvc3QgR2l2aW5nIHBsdWdpblxuLy8gdGhlIHNlbWktY29sb24gYmVmb3JlIGZ1bmN0aW9uIGludm9jYXRpb24gaXMgYSBzYWZldHkgbmV0IGFnYWluc3QgY29uY2F0ZW5hdGVkXG4vLyBzY3JpcHRzIGFuZC9vciBvdGhlciBwbHVnaW5zIHdoaWNoIG1heSBub3QgYmUgY2xvc2VkIHByb3Blcmx5LlxuOyhmdW5jdGlvbiAoICQsIHdpbmRvdywgZG9jdW1lbnQsIHVuZGVmaW5lZCApIHtcblxuICAvLyB1bmRlZmluZWQgaXMgdXNlZCBoZXJlIGFzIHRoZSB1bmRlZmluZWQgZ2xvYmFsIHZhcmlhYmxlIGluIEVDTUFTY3JpcHQgMyBpc1xuICAvLyBtdXRhYmxlIChpZS4gaXQgY2FuIGJlIGNoYW5nZWQgYnkgc29tZW9uZSBlbHNlKS4gdW5kZWZpbmVkIGlzbid0IHJlYWxseSBiZWluZ1xuICAvLyBwYXNzZWQgaW4gc28gd2UgY2FuIGVuc3VyZSB0aGUgdmFsdWUgb2YgaXQgaXMgdHJ1bHkgdW5kZWZpbmVkLiBJbiBFUzUsIHVuZGVmaW5lZFxuICAvLyBjYW4gbm8gbG9uZ2VyIGJlIG1vZGlmaWVkLlxuXG4gIC8vIHdpbmRvdyBhbmQgZG9jdW1lbnQgYXJlIHBhc3NlZCB0aHJvdWdoIGFzIGxvY2FsIHZhcmlhYmxlIHJhdGhlciB0aGFuIGdsb2JhbFxuICAvLyBhcyB0aGlzIChzbGlnaHRseSkgcXVpY2tlbnMgdGhlIHJlc29sdXRpb24gcHJvY2VzcyBhbmQgY2FuIGJlIG1vcmUgZWZmaWNpZW50bHlcbiAgLy8gbWluaWZpZWQgKGVzcGVjaWFsbHkgd2hlbiBib3RoIGFyZSByZWd1bGFybHkgcmVmZXJlbmNlZCBpbiB5b3VyIHBsdWdpbikuXG5cbiAgLy8gQ3JlYXRlIHRoZSBkZWZhdWx0cyBvbmNlXG4gIHZhciBwbHVnaW5OYW1lID0gJ21pbm5wb3N0X2dpdmluZycsXG4gIGRlZmF1bHRzID0ge1xuICAgICdkZWJ1ZycgOiBmYWxzZSwgLy8gdGhpcyBjYW4gYmUgc2V0IHRvIHRydWUgb24gcGFnZSBsZXZlbCBvcHRpb25zXG4gICAgJ3N0cmlwZV9wdWJsaXNoYWJsZV9rZXknIDogJycsXG4gICAgJ3BsYWlkX2VudicgOiAnJyxcbiAgICAncGxhaWRfcHVibGljX2tleScgOiAnJyxcbiAgICAncGxhaWRfbGluaycgOiAnI2F1dGhvcml6ZS1hY2gnLFxuICAgICdtaW5ucG9zdF9yb290JyA6ICdodHRwczovL3d3dy5taW5ucG9zdC5jb20nLFxuICAgICdwcm9ncmVzc19zZWxlY3RvcicgOiAnLm0tc3VwcG9ydC1wcm9ncmVzcycsXG4gICAgJ2RvbmF0ZV9mb3JtX3NlbGVjdG9yJzogJyNkb25hdGUnLFxuICAgICdjb25maXJtX2Zvcm1fc2VsZWN0b3InIDogJyNjb25maXJtJyxcbiAgICAnZmluaXNoX3NlY3Rpb25fc2VsZWN0b3InIDogJyNwYW5lbC0tY29uZmlybWF0aW9uJyxcbiAgICAncGF5X2NjX3Byb2Nlc3Npbmdfc2VsZWN0b3InIDogJ2lucHV0W25hbWU9XCJwYXlfZmVlc1wiXScsXG4gICAgJ2ZlZV9hbW91bnQnIDogJy5wcm9jZXNzaW5nLWFtb3VudCcsXG4gICAgJ2xldmVsX2Ftb3VudF9zZWxlY3RvcicgOiAnI3BhbmVsLS1wYXkgLmFtb3VudCAubGV2ZWwtYW1vdW50JywgLy8gd2UgY2FuIG1heWJlIGdldCByaWQgb2YgdGhpc1xuICAgICdvcmlnaW5hbF9hbW91bnRfc2VsZWN0b3InIDogJ1tuYW1lPVwiYW1vdW50XCJdJyxcbiAgICAnZmFpcl9tYXJrZXRfdmFsdWVfc2VsZWN0b3InIDogJyNmYWlyX21hcmtldF92YWx1ZScsXG4gICAgJ2Z1bGxfYW1vdW50X3NlbGVjdG9yJyA6ICcuZnVsbC1hbW91bnQnLFxuICAgICdpbnN0YWxsbWVudF9wZXJpb2Rfc2VsZWN0b3InIDogJ1tuYW1lPVwiaW5zdGFsbG1lbnRfcGVyaW9kXCJdJyxcbiAgICAnbmFtZV9zZWxlY3RvcicgOiAnLm0tZm9ybS1pdGVtLWRpc3BsYXktbmFtZScsXG4gICAgJ2luX2hvbm9yX29yX21lbW9yeV9maWVsZF9zZWxlY3RvcicgOiAnLm0tZm9ybS1pdGVtLWhvbm9yLW1lbW9yeScsXG4gICAgJ2hvbm9yX29yX21lbW9yeV9jaG9vc2VyJyA6ICdpbnB1dFtuYW1lPVwiaW5faG9ub3Jfb3JfbWVtb3J5XCJdJywgLy8gcmFkaW8gZmllbGRzXG4gICAgJ2hvbm9yX3R5cGVfc2VsZWN0b3InIDogJy5hLWhvbm9yLXR5cGUnLCAvLyBzcGFuIGluc2lkZSBsYWJlbFxuICAgICdob25vcl9tZW1vcnlfaW5wdXRfZ3JvdXAnIDogJy5hLWhvbm9yLW9yLW1lbW9yeScsIC8vIGhvbGRzIHRoZSBmb3JtIGZpZWxkXG4gICAgJ2Fub255bW91c19zZWxlY3RvcicgOiAnI2Fub255bW91cycsXG4gICAgJ3Nob3dfYmlsbGluZ19jb3VudHJ5X3NlbGVjdG9yJyA6ICcjYmlsbGluZ19zaG93X2NvdW50cnknLFxuICAgICdiaWxsaW5nX2NvdW50cnlfc2VsZWN0b3InIDogJy5tLWZvcm0taXRlbS1jb3VudHJ5JyxcbiAgICAnc2hvd19zaGlwcGluZ19jb3VudHJ5X3NlbGVjdG9yJyA6ICcjc2hpcHBpbmdfc2hvd19jb3VudHJ5JyxcbiAgICAnc2hpcHBpbmdfY291bnRyeV9zZWxlY3RvcicgOiAnLm0tZm9ybS1pdGVtLXNoaXBwaW5nLWNvdW50cnknLFxuICAgICdzaGlwcGluZ19hZGRyZXNzX3NlbGVjdG9yJyA6ICcubS1mb3JtLWl0ZW0tc2hpcHBpbmctYWRkcmVzcycsXG4gICAgJ3VzZV9mb3Jfc2hpcHBpbmdfc2VsZWN0b3InIDogJyN1c2Vmb3JzaGlwcGluZycsXG4gICAgJ2VtYWlsX2ZpZWxkX3NlbGVjdG9yJyA6ICcjZW1haWwnLFxuICAgICdwYXNzd29yZF9maWVsZF9zZWxlY3RvcicgOiAnI3Bhc3N3b3JkJyxcbiAgICAnZmlyc3RfbmFtZV9maWVsZF9zZWxlY3RvcicgOiAnI2ZpcnN0X25hbWUnLFxuICAgICdsYXN0X25hbWVfZmllbGRfc2VsZWN0b3InIDogJyNsYXN0X25hbWUnLFxuICAgICdiaWxsaW5nX3N0cmVldF9maWVsZF9zZWxlY3RvcicgOiAnI2JpbGxpbmdfc3RyZWV0JyxcbiAgICAnYmlsbGluZ19jaXR5X2ZpZWxkX3NlbGVjdG9yJyA6ICcjYmlsbGluZ19jaXR5JyxcbiAgICAnYmlsbGluZ19zdGF0ZV9maWVsZF9zZWxlY3RvcicgOiAnI2JpbGxpbmdfc3RhdGUnLFxuICAgICdiaWxsaW5nX3ppcF9maWVsZF9zZWxlY3Rvcic6ICcjYmlsbGluZ196aXAnLFxuICAgICdiaWxsaW5nX2NvdW50cnlfZmllbGRfc2VsZWN0b3InIDogJyNiaWxsaW5nX2NvdW50cnknLFxuICAgICdjcmVhdGVfbXBfc2VsZWN0b3InIDogJyNjcmVhdGVtcGFjY291bnQnLFxuICAgICdwYXNzd29yZF9zZWxlY3RvcicgOiAnLm0tZm9ybS1pdGVtLXBhc3N3b3JkJyxcbiAgICAnYWRkaXRpb25hbF9hbW91bnRfZmllbGQnIDogJyNhZGRpdGlvbmFsX2RvbmF0aW9uJyxcbiAgICAnc2hpcHBpbmdfc2VsZWN0b3InIDogJ2ZpZWxkc2V0Lm0tc2hpcHBpbmctaW5mb3JtYXRpb24nLFxuICAgICdjaG9vc2VfcGF5bWVudCcgOiAnI2Nob29zZS1wYXltZW50LW1ldGhvZCcsXG4gICAgJ3BheW1lbnRfbWV0aG9kX3NlbGVjdG9yJyA6ICcucGF5bWVudC1tZXRob2QnLFxuICAgICdjY19udW1fc2VsZWN0b3InIDogJyNjYXJkLW51bWJlcicsXG4gICAgJ2NjX2V4cF9zZWxlY3RvcicgOiAnI2NhcmQtZXhwaXJ5JyxcbiAgICAnY2NfY3ZjX3NlbGVjdG9yJyA6ICcjY2FyZC1jdmMnLFxuICAgICdwYXlfYnV0dG9uX3NlbGVjdG9yJyA6ICcuYS1idXR0b24tcGF5JyxcbiAgICAnb3BwX2lkX3NlbGVjdG9yJyA6ICcjbG9ja19rZXknLCAvLyB3ZSB1c2UgdGhpcyB2YWx1ZSBhcyB0aGUgR29vZ2xlIEFuYWx5dGljcyB0cmFuc2FjdGlvbiBJRFxuICAgICduZXdzbGV0dGVyX2dyb3VwX3NlbGVjdG9yJyA6ICcuc3VwcG9ydC1uZXdzbGV0dGVycydcbiAgfTsgLy8gZW5kIGRlZmF1bHRzXG5cbiAgLy8gVGhlIGFjdHVhbCBwbHVnaW4gY29uc3RydWN0b3JcbiAgZnVuY3Rpb24gUGx1Z2luKCBlbGVtZW50LCBvcHRpb25zICkge1xuXG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcblxuICAgIC8vIGpRdWVyeSBoYXMgYW4gZXh0ZW5kIG1ldGhvZCB3aGljaCBtZXJnZXMgdGhlIGNvbnRlbnRzIG9mIHR3byBvclxuICAgIC8vIG1vcmUgb2JqZWN0cywgc3RvcmluZyB0aGUgcmVzdWx0IGluIHRoZSBmaXJzdCBvYmplY3QuIFRoZSBmaXJzdCBvYmplY3RcbiAgICAvLyBpcyBnZW5lcmFsbHkgZW1wdHkgYXMgd2UgZG9uJ3Qgd2FudCB0byBhbHRlciB0aGUgZGVmYXVsdCBvcHRpb25zIGZvclxuICAgIC8vIGZ1dHVyZSBpbnN0YW5jZXMgb2YgdGhlIHBsdWdpblxuICAgIHRoaXMub3B0aW9ucyA9ICQuZXh0ZW5kKCB7fSwgZGVmYXVsdHMsIG9wdGlvbnMgKTtcblxuICAgIHRoaXMuX2RlZmF1bHRzID0gZGVmYXVsdHM7XG4gICAgdGhpcy5fbmFtZSA9IHBsdWdpbk5hbWU7XG5cbiAgICB0aGlzLmluaXQoKTtcbiAgfSAvLyBlbmQgY29uc3RydWN0b3JcblxuICBQbHVnaW4ucHJvdG90eXBlID0ge1xuXG4gICAgaW5pdDogZnVuY3Rpb24ocmVzZXQsIGFtb3VudCkge1xuXG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoICduby1qcycgKTtcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCggJ2pzJyApO1xuXG4gICAgICAvLyBQbGFjZSBpbml0aWFsaXphdGlvbiBsb2dpYyBoZXJlXG4gICAgICAvLyBZb3UgYWxyZWFkeSBoYXZlIGFjY2VzcyB0byB0aGUgRE9NIGVsZW1lbnQgYW5kXG4gICAgICAvLyB0aGUgb3B0aW9ucyB2aWEgdGhlIGluc3RhbmNlLCBlLmcuIHRoaXMuZWxlbWVudFxuICAgICAgLy8gYW5kIHRoaXMub3B0aW9uc1xuICAgICAgLy8geW91IGNhbiBhZGQgbW9yZSBmdW5jdGlvbnMgbGlrZSB0aGUgb25lIGJlbG93IGFuZFxuICAgICAgLy8gY2FsbCB0aGVtIGxpa2Ugc286IHRoaXMueW91ck90aGVyRnVuY3Rpb24odGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpLlxuXG4gICAgICAvLyBtb2RpZnkgb3B0aW9ucyBhcyBuZWVkZWRcbiAgICAgIC8vdmFyIHRoaXMub3B0aW9ucy5hbW91bnQgPSAnJztcbiAgICAgIGlmIChyZXNldCAhPT0gdHJ1ZSkge1xuICAgICAgICB0aGlzLm9wdGlvbnMuYW1vdW50ID0gcGFyc2VGbG9hdCgkKHRoaXMub3B0aW9ucy5sZXZlbF9hbW91bnRfc2VsZWN0b3IsIHRoaXMuZWxlbWVudCkudGV4dCgpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5hbW91bnQgPSBhbW91bnQ7XG4gICAgICB9XG4gICAgICB0aGlzLm9wdGlvbnMub3JpZ2luYWxfYW1vdW50ICAgICA9IHBhcnNlSW50KCQodGhpcy5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudF9zZWxlY3RvciwgdGhpcy5lbGVtZW50KS52YWwoKSwgMTApO1xuICAgICAgdGhpcy5vcHRpb25zLnByb2Nlc3NpbmdfZmVlICAgICAgPSAoTWF0aC5yb3VuZChwYXJzZUZsb2F0KHRoaXMub3B0aW9ucy5mZWVfYW1vdW50KSpNYXRoLnBvdygxMCwyKSkvTWF0aC5wb3coMTAsMikpLnRvRml4ZWQoMik7XG4gICAgICB0aGlzLm9wdGlvbnMucHJvY2Vzc2luZ19mZWVfdGV4dCA9IHRoaXMub3B0aW9ucy5wcm9jZXNzaW5nX2ZlZTtcbiAgICAgIHRoaXMub3B0aW9ucy5jcmVhdGVfYWNjb3VudCAgICAgID0gZmFsc2U7XG5cbiAgICAgIHZhciBidXR0b25fdGV4dCA9ICQodGhpcy5vcHRpb25zLnBheV9idXR0b25fc2VsZWN0b3IpLnRleHQoKTtcbiAgICAgIHRoaXMub3B0aW9ucy5idXR0b25fdGV4dCA9IGJ1dHRvbl90ZXh0O1xuXG4gICAgICB0aGlzLnN0cmlwZSA9IFN0cmlwZSh0aGlzLm9wdGlvbnMuc3RyaXBlX3B1Ymxpc2hhYmxlX2tleSk7XG4gICAgICB0aGlzLmVsZW1lbnRzID0gdGhpcy5zdHJpcGUuZWxlbWVudHMoe1xuICAgICAgICBmb250czogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIC8vIGludGVncmF0ZSB5b3VyIGZvbnQgaW50byBzdHJpcGVcbiAgICAgICAgICAgIGNzc1NyYzogJ2h0dHBzOi8vdXNlLnR5cGVraXQubmV0L2N4ajdmemcuY3NzJyxcbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH0pO1xuXG4gICAgICAvLyB1c2UgYSByZWZlcnJlciBmb3IgZWRpdCBsaW5rIGlmIHdlIGhhdmUgb25lXG4gICAgICBpZiAoZG9jdW1lbnQucmVmZXJyZXIgIT09ICcnKSB7XG4gICAgICAgICQoJyNlZGl0X3VybCcpLnByb3AoJ2hyZWYnLCBkb2N1bWVudC5yZWZlcnJlcik7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuZGVidWcgPT09IHRydWUpIHtcbiAgICAgICAgdGhpcy5kZWJ1Zyh0aGlzLm9wdGlvbnMpO1xuICAgICAgICAvLyByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIGNhbGwgZnVuY3Rpb25zXG4gICAgICB0aGlzLmFuYWx5dGljc1RyYWNraW5nKHRoaXMub3B0aW9ucyk7IC8vIHRyYWNrIGFuYWx5dGljcyBldmVudHNcbiAgICAgIHRoaXMuYW1vdW50QXNSYWRpbyh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIGlmIHRoZSBhbW91bnQgZmllbGQgaXMgYSByYWRpbyBidXR0b25cbiAgICAgIHRoaXMuYW1vdW50VXBkYXRlZCh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIGlmIHRoZSBhbW91bnQgdGV4dCBmaWVsZCBjYW4gY2hhbmdlXG5cbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5wYXlfY2NfcHJvY2Vzc2luZ19zZWxlY3RvcikubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLmNyZWRpdENhcmRQcm9jZXNzaW5nRmVlcyh0aGlzLm9wdGlvbnMpOyAvLyBwcm9jZXNzaW5nIGZlZXNcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLy8gdGhlIG1haW4gZm9ybSBJRC4gdGhpcyBpcyBub3QgdXNlZCBmb3IgY2FuY2VsbGluZ1xuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuZG9uYXRlQW5vbnltb3VzbHkodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBhbm9ueW1vdXNcbiAgICAgICAgdGhpcy5ob25vck9yTWVtb3J5VG9nZ2xlKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gaW4gaG9ub3Igb3IgaW4gbWVtb3J5IG9mIHNvbWVvbmVcbiAgICAgICAgdGhpcy5vdXRzaWRlVW5pdGVkU3RhdGVzKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gb3V0c2lkZSBVU1xuICAgICAgICB0aGlzLnNoaXBwaW5nQWRkcmVzcyh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIHNoaXBwaW5nIGFkZHJlc3NcbiAgICAgICAgdGhpcy5hbGxvd01pbm5wb3N0QWNjb3VudCh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIG9wdGlvbiBmb3IgY3JlYXRpbmcgbWlubnBvc3QgYWNjb3VudFxuICAgICAgICB0aGlzLnBheW1lbnRSZXF1ZXN0QnV0dG9uKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gY3JlYXRlIHBheW1lbnRyZXF1ZXN0IGJ1dHRvblxuICAgICAgICB0aGlzLmNob29zZVBheW1lbnRNZXRob2QodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBzd2l0Y2ggYmV0d2VlbiBjYXJkIGFuZCBhY2hcbiAgICAgICAgdGhpcy5jcmVkaXRDYXJkRmllbGRzKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gZG8gc3R1ZmYgd2l0aCB0aGUgY3JlZGl0IGNhcmQgZmllbGRzXG4gICAgICAgIHRoaXMuYWNoRmllbGRzKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gZG8gc3R1ZmYgZm9yIGFjaCBwYXltZW50cywgaWYgYXBwbGljYWJsZSB0byB0aGUgZm9ybVxuICAgICAgICB0aGlzLnZhbGlkYXRlQW5kU3VibWl0KHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gdmFsaWRhdGUgYW5kIHN1Ym1pdCB0aGUgZm9ybVxuICAgICAgfVxuXG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuY29uZmlybV9mb3JtX3NlbGVjdG9yKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuc2hvd05ld3NsZXR0ZXJTZXR0aW5ncyh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7XG4gICAgICAgIHRoaXMuY29uZmlybU1lc3NhZ2VTdWJtaXQodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBzdWJtaXQgdGhlIHN0dWZmIG9uIHRoZSBjb25maXJtYXRpb24gcGFnZVxuICAgICAgfVxuXG4gICAgfSwgLy8gaW5pdFxuXG4gICAgZGVidWc6IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuZGVidWcgPT09IHRydWUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZGlyKG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUuZGlyKHRoaXMpO1xuICAgICAgfVxuICAgIH0sIC8vIGRlYnVnXG5cbiAgICBhbmFseXRpY3NUcmFja2luZzogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgdmFyIHByb2dyZXNzID0gJChvcHRpb25zLnByb2dyZXNzX3NlbGVjdG9yKTtcbiAgICAgIHZhciBzdGVwO1xuICAgICAgdmFyIG5hdl9pdGVtX2NvdW50ID0gMDtcbiAgICAgIHZhciBvcHBfaWQgPSAkKG9wdGlvbnMub3BwX2lkX3NlbGVjdG9yKS52YWwoKTtcbiAgICAgIHZhciBwb3N0X3B1cmNoYXNlID0gZmFsc2U7XG4gICAgICBpZiAocHJvZ3Jlc3MubGVuZ3RoID4gMCkge1xuICAgICAgICBuYXZfaXRlbV9jb3VudCA9ICQoJ2xpJywgcHJvZ3Jlc3MpLmxlbmd0aDsgLy8gbGVuZ3RoIGlzIG5vdCB6ZXJvIGJhc2VkXG4gICAgICAgIHN0ZXAgPSAkKCdsaSAuYWN0aXZlJywgcHJvZ3Jlc3MpLnBhcmVudCgpLmluZGV4KCkgKyAxOyAvLyBpbmRleCBpcyB6ZXJvIGJhc2VkXG4gICAgICB9XG4gICAgICAvLyB0aGVyZSBpcyBhIHByb2dyZXNzIG1lbnUsIEFORCB0aGVyZSBJUyBOT1QgYSBjb25maXJtIGZvcm0gc2VsZWN0b3JcbiAgICAgIC8vIGlmIHRoYXQgaXMgdGhlIGNhc2UsIHdlJ3JlIG5vdCBvbiB0aGUgcHVyY2hhc2Ugc3RlcFxuICAgICAgaWYgKHByb2dyZXNzLmxlbmd0aCA+IDAgJiYgJChvcHRpb25zLmNvbmZpcm1fZm9ybV9zZWxlY3RvcikubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIC8vIHRoZSBhY3RpdmUgdGFiIG1hdGNoZXMgdGhlIGNvdW50IG9mIGl0ZW1zIEFORCB0aGVyZSBpcyBOT1QgYSBjb25maXJtIGZvcm0gdG8gYmUgc3VibWl0dGVkXG4gICAgICAgIC8vIHRoYXQgbWVhbnMgd2UncmUgb24gYSBwb3N0IHB1cmNoYXNlIHN0ZXAuXG4gICAgICAgIGlmIChzdGVwID09PSBuYXZfaXRlbV9jb3VudCAmJiAkKG9wdGlvbnMuY29uZmlybV9mb3JtX3NlbGVjdG9yKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBzdGVwID0gc3RlcCArIDE7XG4gICAgICAgICAgcG9zdF9wdXJjaGFzZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAocHJvZ3Jlc3MubGVuZ3RoID4gMCAmJiAkKG9wdGlvbnMuY29uZmlybV9mb3JtX3NlbGVjdG9yKS5sZW5ndGggPiAwIHx8ICQob3B0aW9ucy5maW5pc2hfc2VjdGlvbl9zZWxlY3RvcikubGVuZ3RoID4gMCkge1xuICAgICAgICAvLyB3ZSBhcmUgb24gdGhlIGNvbmZpcm0gZm9ybSBzZWxlY3RvciBhbmQgdGhlcmUgaXMgYSBwcm9ncmVzcyBtZWFzdXJlXG4gICAgICAgIC8vIE9SLCB3ZSBhcmUgb24gdGhlIGZpbmlzaCBzZWxlY3RvciBhbmQgdGhlcmUgaXMgTk9UIGEgcHJvZ3Jlc3MgbWVhc3VyZVxuICAgICAgICAvLyB0aGVzZSBtZWFuIHRoZSB1c2VyIGp1c3QgcHVyY2hhc2VkLlxuICAgICAgICBzdGVwID0gJ3B1cmNoYXNlJztcbiAgICAgIH0gZWxzZSBpZiAocHJvZ3Jlc3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMuZGVidWcoICdzdGVwIGlzICcgKyBzdGVwICsgJyBhbmQgbmF2IGl0ZW0gY291bnQgaXMgJyArIG5hdl9pdGVtX2NvdW50ICsgJyBhbmQgb3BwIGlkIGlzICcgKyBvcHBfaWQgKyAnIGFuZCBwb3N0IHB1cmNoYXNlIGlzICcgKyBwb3N0X3B1cmNoYXNlICk7XG4gICAgICB0aGlzLmFuYWx5dGljc1RyYWNraW5nU3RlcChzdGVwLCBwb3N0X3B1cmNoYXNlKTtcbiAgICB9LCAvLyBhbmFseXRpY3NUcmFja2luZ1xuXG4gICAgYW5hbHl0aWNzVHJhY2tpbmdTdGVwOiBmdW5jdGlvbihzdGVwLCBwb3N0X3B1cmNoYXNlKSB7XG4gICAgICB2YXIgcHJvZ3Jlc3MgPSAkKHRoaXMub3B0aW9ucy5wcm9ncmVzc19zZWxlY3Rvcik7XG4gICAgICB2YXIgYW1vdW50ID0gJCh0aGlzLm9wdGlvbnMub3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yKS52YWwoKTtcbiAgICAgIHZhciBvcHBfaWQgPSAkKHRoaXMub3B0aW9ucy5vcHBfaWRfc2VsZWN0b3IpLnZhbCgpO1xuICAgICAgdmFyIGluc3RhbGxtZW50X3BlcmlvZCA9ICdvbmUtdGltZSc7XG4gICAgICB2YXIgbGV2ZWw7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuaW5zdGFsbG1lbnRfcGVyaW9kX3NlbGVjdG9yKS5sZW5ndGggPiAwICkge1xuICAgICAgICBpbnN0YWxsbWVudF9wZXJpb2QgPSAkKHRoaXMub3B0aW9ucy5pbnN0YWxsbWVudF9wZXJpb2Rfc2VsZWN0b3IpLnZhbCgpO1xuICAgICAgfVxuICAgICAgLy8gaWYgd2UncmUgbm90IGFmdGVyIHRoZSBwdXJjaGFzZSwgdXNlIGFkZFByb2R1Y3RcbiAgICAgIGlmIChwcm9ncmVzcy5sZW5ndGggPiAwICYmIHBvc3RfcHVyY2hhc2UgIT09IHRydWUpIHtcbiAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgYW1vdW50OiBhbW91bnQsXG4gICAgICAgICAgaW5zdGFsbG1lbnRfcGVyaW9kOiBpbnN0YWxsbWVudF9wZXJpb2RcbiAgICAgICAgfTtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICB1cmw6ICcvY2FsY3VsYXRlLW1lbWJlci1sZXZlbC8nLFxuICAgICAgICAgIGRhdGE6IGRhdGFcbiAgICAgICAgfSkuZG9uZShmdW5jdGlvbiggZGF0YSApIHtcbiAgICAgICAgICBpZiAoJChkYXRhLmxldmVsKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsZXZlbCA9IGRhdGEubGV2ZWwubGV2ZWw7XG4gICAgICAgICAgICB0aGF0LmRlYnVnKCdhZGQgcHJvZHVjdDogaWQgaXMgJyArICdtaW5ucG9zdF8nICsgbGV2ZWwudG9Mb3dlckNhc2UoKSArICdfbWVtYmVyc2hpcCcgKyAnIGFuZCBuYW1lIGlzICcgKyAnTWlublBvc3QgJyArIGxldmVsLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgbGV2ZWwuc2xpY2UoMSkgKyAnIE1lbWJlcnNoaXAnICsgJyBhbmQgdmFyaWFudCBpcyAnICsgaW5zdGFsbG1lbnRfcGVyaW9kLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgaW5zdGFsbG1lbnRfcGVyaW9kLnNsaWNlKDEpKTtcbiAgICAgICAgICAgIGdhKCdlYzphZGRQcm9kdWN0Jywge1xuICAgICAgICAgICAgICAnaWQnOiAnbWlubnBvc3RfJyArIGxldmVsLnRvTG93ZXJDYXNlKCkgKyAnX21lbWJlcnNoaXAnLFxuICAgICAgICAgICAgICAnbmFtZSc6ICdNaW5uUG9zdCAnICsgbGV2ZWwuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBsZXZlbC5zbGljZSgxKSArICcgTWVtYmVyc2hpcCcsXG4gICAgICAgICAgICAgICdjYXRlZ29yeSc6ICdEb25hdGlvbicsXG4gICAgICAgICAgICAgICdicmFuZCc6ICdNaW5uUG9zdCcsXG4gICAgICAgICAgICAgICd2YXJpYW50JzogaW5zdGFsbG1lbnRfcGVyaW9kLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgaW5zdGFsbG1lbnRfcGVyaW9kLnNsaWNlKDEpLFxuICAgICAgICAgICAgICAncHJpY2UnOiBhbW91bnQsXG4gICAgICAgICAgICAgICdxdWFudGl0eSc6IDFcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGVwID09PSAncHVyY2hhc2UnKSB7XG4gICAgICAgIHRoaXMuZGVidWcoJ2FkZCBhIHB1cmNoYXNlIGFjdGlvbi4gc3RlcCBpcyAnICsgc3RlcCk7XG4gICAgICAgIGdhKCdlYzpzZXRBY3Rpb24nLCBzdGVwLHtcbiAgICAgICAgICAnaWQnOiBvcHBfaWQsIC8vIFRyYW5zYWN0aW9uIGlkIC0gVHlwZTogc3RyaW5nXG4gICAgICAgICAgJ2FmZmlsaWF0aW9uJzogJ01pbm5Qb3N0JywgLy8gU3RvcmUgbmFtZSAtIFR5cGU6IHN0cmluZ1xuICAgICAgICAgICdyZXZlbnVlJzogYW1vdW50LCAvLyBUb3RhbCBSZXZlbnVlIC0gVHlwZTogbnVtZXJpY1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZGVidWcoJ2FkZCBhIGNoZWNrb3V0IGFjdGlvbi4gc3RlcCBpcyAnICsgc3RlcCk7XG4gICAgICAgIGdhKCdlYzpzZXRBY3Rpb24nLCdjaGVja291dCcsIHtcbiAgICAgICAgICAnc3RlcCc6IHN0ZXAsIC8vIEEgdmFsdWUgb2YgMSBpbmRpY2F0ZXMgZmlyc3QgY2hlY2tvdXQgc3RlcC4gVmFsdWUgb2YgMiBpbmRpY2F0ZXMgc2Vjb25kIGNoZWNrb3V0IHN0ZXBcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGdhKCdzZXQnLCB7XG4gICAgICAgIHBhZ2U6IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSxcbiAgICAgICAgdGl0bGU6IGRvY3VtZW50LnRpdGxlXG4gICAgICB9KTtcbiAgICAgIGdhKCdzZW5kJywgJ3BhZ2V2aWV3Jywgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lKTtcblxuICAgIH0sIC8vIGFuYWx5dGljc1RyYWNraW5nU3RlcFxuXG4gICAgYW1vdW50QXNSYWRpbzogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgLy8gd2hlbiBhbW91bnQgZmllbGQgaXMgYSByYWRpbyBidXR0b24sIHdlIG5lZWQgdG8gY2hlY2sgaXQgd2hlbmV2ZXIgaXQgY2hhbmdlc1xuICAgICAgJChvcHRpb25zLm9yaWdpbmFsX2Ftb3VudF9zZWxlY3RvciwgZWxlbWVudCkuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoJCh0aGlzKS5pcygnOnJhZGlvJykpIHtcbiAgICAgICAgICAgIG9wdGlvbnMub3JpZ2luYWxfYW1vdW50ID0gcGFyc2VJbnQoJChvcHRpb25zLm9yaWdpbmFsX2Ftb3VudF9zZWxlY3RvciArICc6Y2hlY2tlZCcsIGVsZW1lbnQpLnZhbCgpLCAxMCk7XG4gICAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSwgLy8gYW1vdW50QXNSYWRpb1xuXG4gICAgYW1vdW50VXBkYXRlZDogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgLy8gd2hlbiBuZXcgYW1vdW50IHRleHQgZmllbGQgY2FuIGNoYW5nZSwgd2UgbmVlZCB0byBjaGFuZ2UgdGhlIGhpZGRlbiBmaWVsZFxuICAgICAgLy8gdGhlcmUgaXMgYWxzbyBwb3RlbnRpYWxseSBhbiBhZGRpdGlvbmFsIGFtb3VudCBmaWVsZCB2YWx1ZSB0byBhZGRcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHZhciBzdHJpcGVfcGF5bWVudF90eXBlID0gdGhhdC5nZXRTdHJpcGVQYXltZW50VHlwZSgpO1xuXG4gICAgICAvLyBzZXQgdGhlIGZhaXIgbWFya2V0IHZhbHVlIGlmIGFwcGxpY2FibGVcbiAgICAgIHZhciBhbW91bnRfc2VsZWN0b3JfZmFpcl9tYXJrZXQgPSAkKG9wdGlvbnMub3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yLCBlbGVtZW50KTtcbiAgICAgIGlmIChhbW91bnRfc2VsZWN0b3JfZmFpcl9tYXJrZXQuaXMoJzpyYWRpbycpKSB7XG4gICAgICAgIGFtb3VudF9zZWxlY3Rvcl9mYWlyX21hcmtldCA9ICQob3B0aW9ucy5vcmlnaW5hbF9hbW91bnRfc2VsZWN0b3IgKyAnOmNoZWNrZWQnLCBlbGVtZW50KTtcbiAgICAgIH1cbiAgICAgIHRoYXQuc2V0RmFpck1hcmtldFZhbHVlKGFtb3VudF9zZWxlY3Rvcl9mYWlyX21hcmtldCk7XG5cbiAgICAgICQob3B0aW9ucy5vcmlnaW5hbF9hbW91bnRfc2VsZWN0b3IsIGVsZW1lbnQpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgdGhhdC5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCA9IHBhcnNlSW50KCQodGhpcywgZWxlbWVudCkudmFsKCksIDEwKTtcbiAgICAgICAgdGhhdC5jYWxjdWxhdGVGZWVzKHRoYXQub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQsIHN0cmlwZV9wYXltZW50X3R5cGUpO1xuICAgICAgICB0aGF0LnNldEZhaXJNYXJrZXRWYWx1ZSgkKHRoaXMsIGVsZW1lbnQpKTtcbiAgICAgIH0pO1xuICAgICAgJChvcHRpb25zLmFkZGl0aW9uYWxfYW1vdW50X2ZpZWxkLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoYXQub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQgPSBwYXJzZUludCgkKG9wdGlvbnMub3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSwgMTApO1xuICAgICAgICB0aGF0LmNhbGN1bGF0ZUZlZXModGhhdC5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCwgc3RyaXBlX3BheW1lbnRfdHlwZSk7XG4gICAgICB9KTtcblxuICAgIH0sIC8vIGFtb3VudFVwZGF0ZWRcblxuICAgIGdldFRvdGFsQW1vdW50OiBmdW5jdGlvbihhbW91bnQpIHtcbiAgICAgIGFtb3VudCA9ICh0eXBlb2YgYW1vdW50ICE9PSAndW5kZWZpbmVkJykgPyAgYW1vdW50IDogdGhpcy5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudDtcbiAgICAgIHZhciB0b3RhbF9hbW91bnQgPSBhbW91bnQ7XG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuYWRkaXRpb25hbF9hbW91bnRfZmllbGQpLmxlbmd0aCA+IDAgJiYgJCh0aGlzLm9wdGlvbnMuYWRkaXRpb25hbF9hbW91bnRfZmllbGQpLnZhbCgpID4gMCkge1xuICAgICAgICB2YXIgYWRkaXRpb25hbF9hbW91bnQgPSAkKHRoaXMub3B0aW9ucy5hZGRpdGlvbmFsX2Ftb3VudF9maWVsZCkudmFsKCk7XG4gICAgICAgIHRvdGFsX2Ftb3VudCA9IHBhcnNlSW50KGFkZGl0aW9uYWxfYW1vdW50LCAxMCkgKyBwYXJzZUludChhbW91bnQsIDEwKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0b3RhbF9hbW91bnQ7XG4gICAgfSwgLy8gZ2V0VG90YWxBbW91bnRcblxuICAgIHNldEZhaXJNYXJrZXRWYWx1ZTogZnVuY3Rpb24oYW1vdW50X3NlbGVjdG9yKSB7XG4gICAgICAvLyBpZiB0aGVyZSBpcyBhIGZhaXIgbWFya2V0IHZhbHVlIGZpZWxkLCBjaGVjayBhbmQgc2VlIGlmIHdlIGNhbiBwb3B1bGF0ZSBpdFxuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmZhaXJfbWFya2V0X3ZhbHVlX3NlbGVjdG9yKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHZhciBmYWlyTWFya2V0VmFsdWUgPSBhbW91bnRfc2VsZWN0b3IuZGF0YSgnZmFpci1tYXJrZXQtdmFsdWUnKTtcbiAgICAgICAgJCh0aGlzLm9wdGlvbnMuZmFpcl9tYXJrZXRfdmFsdWVfc2VsZWN0b3IpLnZhbChmYWlyTWFya2V0VmFsdWUpO1xuICAgICAgfVxuICAgIH0sIC8vIHNldEZhaXJNYXJrZXRWYWx1ZVxuXG4gICAgY2FsY3VsYXRlRmVlczogZnVuY3Rpb24oYW1vdW50LCBzdHJpcGVfcGF5bWVudF90eXBlKSB7XG4gICAgICAvLyB0aGlzIHNlbmRzIHRoZSBhbW91bnQgYW5kIHN0cmlwZSBwYXltZW50IHR5cGUgdG8gcHl0aG9uOyBnZXQgdGhlIGZlZSBhbmQgZGlzcGxheSBpdCB0byB0aGUgdXNlciBvbiB0aGUgY2hlY2tib3ggbGFiZWxcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHZhciB0b3RhbF9hbW91bnQgPSB0aGF0LmdldFRvdGFsQW1vdW50KGFtb3VudCk7XG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgYW1vdW50OiB0b3RhbF9hbW91bnQsXG4gICAgICAgIHN0cmlwZV9wYXltZW50X3R5cGU6IHN0cmlwZV9wYXltZW50X3R5cGVcbiAgICAgIH07XG4gICAgICB0aGF0LnNldFN0cmlwZVBheW1lbnRUeXBlKHN0cmlwZV9wYXltZW50X3R5cGUpO1xuICAgICAgJC5hamF4KHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIHVybDogJy9jYWxjdWxhdGUtZmVlcy8nLFxuICAgICAgICBkYXRhOiBkYXRhXG4gICAgICB9KS5kb25lKGZ1bmN0aW9uKCBkYXRhICkge1xuICAgICAgICBpZiAoJChkYXRhLmZlZXMpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAkKHRoYXQub3B0aW9ucy5mZWVfYW1vdW50KS50ZXh0KHBhcnNlRmxvYXQoZGF0YS5mZWVzKS50b0ZpeGVkKDIpKTtcbiAgICAgICAgICB0aGF0LmNyZWRpdENhcmRGZWVDaGVja2JveCgkKHRoYXQub3B0aW9ucy5wYXlfY2NfcHJvY2Vzc2luZ19zZWxlY3RvcikpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LCAvLyBjYWxjdWxhdGVGZWVzXG5cbiAgICBjcmVkaXRDYXJkUHJvY2Vzc2luZ0ZlZXM6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgIC8vIHRoaXMgYWRkcyBvciBzdWJ0cmFjdHMgdGhlIGZlZSB0byB0aGUgb3JpZ2luYWwgYW1vdW50IHdoZW4gdGhlIHVzZXIgaW5kaWNhdGVzIHRoZXkgZG8gb3IgZG8gbm90IHdhbnQgdG8gcGF5IHRoZSBmZWVzXG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB0aGF0LmNyZWRpdENhcmRGZWVDaGVja2JveCgkKG9wdGlvbnMucGF5X2NjX3Byb2Nlc3Npbmdfc2VsZWN0b3IpKTtcbiAgICAgICQob3B0aW9ucy5wYXlfY2NfcHJvY2Vzc2luZ19zZWxlY3Rvcikub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB0aGF0LmNyZWRpdENhcmRGZWVDaGVja2JveCh0aGlzKTtcbiAgICAgIH0pO1xuICAgIH0sIC8vIGNyZWRpdENhcmRQcm9jZXNzaW5nRmVlc1xuXG4gICAgZ2V0U3RyaXBlUGF5bWVudFR5cGU6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHN0cmlwZV9wYXltZW50X3R5cGUgPSAnY2FyZCc7XG4gICAgICBpZiAoJCgnaW5wdXRbbmFtZT1cInN0cmlwZV9wYXltZW50X3R5cGVcIl0nKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHN0cmlwZV9wYXltZW50X3R5cGUgPSAkKCdpbnB1dFtuYW1lPVwic3RyaXBlX3BheW1lbnRfdHlwZVwiXScpLnZhbCgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN0cmlwZV9wYXltZW50X3R5cGU7XG4gICAgfSwgLy8gZ2V0U3RyaXBlUGF5bWVudFR5cGVcblxuICAgIHNldFN0cmlwZVBheW1lbnRUeXBlOiBmdW5jdGlvbihzdHJpcGVfcGF5bWVudF90eXBlKSB7XG4gICAgICBpZiAoJCgnaW5wdXRbbmFtZT1cInN0cmlwZV9wYXltZW50X3R5cGVcIl0nKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgJCh0aGlzLm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLmFwcGVuZCgnPGlucHV0IHR5cGU9XFxcImhpZGRlblxcXCIgbmFtZT1cXFwic3RyaXBlX3BheW1lbnRfdHlwZVxcXCI+Jyk7XG4gICAgICB9XG4gICAgICAkKCdpbnB1dFtuYW1lPVwic3RyaXBlX3BheW1lbnRfdHlwZVwiXScpLnZhbChzdHJpcGVfcGF5bWVudF90eXBlKTtcbiAgICAgIHJldHVybiBzdHJpcGVfcGF5bWVudF90eXBlO1xuICAgIH0sIC8vIHNldFN0cmlwZVBheW1lbnRUeXBlXG5cbiAgICBjcmVkaXRDYXJkRmVlQ2hlY2tib3g6IGZ1bmN0aW9uKGZpZWxkKSB7XG4gICAgICB2YXIgZnVsbF9hbW91bnQ7XG4gICAgICB2YXIgdG90YWxfYW1vdW50ID0gdGhpcy5nZXRUb3RhbEFtb3VudCgpO1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgaWYgKCQoZmllbGQpLmlzKCc6Y2hlY2tlZCcpIHx8ICQoZmllbGQpLnByb3AoJ2NoZWNrZWQnKSkge1xuICAgICAgICAkKCcuYW1vdW50IC5sZXZlbC1hbW91bnQnKS5hZGRDbGFzcygnZnVsbC1hbW91bnQnKTtcbiAgICAgICAgZnVsbF9hbW91bnQgPSAodG90YWxfYW1vdW50ICsgcGFyc2VGbG9hdCgkKHRoYXQub3B0aW9ucy5mZWVfYW1vdW50KS50ZXh0KCkpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZ1bGxfYW1vdW50ID0gdG90YWxfYW1vdW50O1xuICAgICAgfVxuICAgICAgJCh0aGF0Lm9wdGlvbnMuZnVsbF9hbW91bnRfc2VsZWN0b3IpLnRleHQocGFyc2VGbG9hdChmdWxsX2Ftb3VudCkudG9GaXhlZCgyKSk7XG5cbiAgICAgIC8vIHVwZGF0ZSB0aGUgcGF5bWVudCByZXF1ZXN0XG4gICAgICBpZiAodGhpcy5wYXltZW50UmVxdWVzdCAmJiBmdWxsX2Ftb3VudCkge1xuICAgICAgICB0aGlzLnBheW1lbnRSZXF1ZXN0LnVwZGF0ZSh7XG4gICAgICAgICAgdG90YWw6IHtcbiAgICAgICAgICAgIGxhYmVsOiBcIk1pbm5Qb3N0IERvbmF0aW9uXCIsXG4gICAgICAgICAgICBhbW91bnQ6IGZ1bGxfYW1vdW50ICogMTAwXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgIH0sIC8vIGNyZWRpdENhcmRGZWVDaGVja2JveFxuXG4gICAgZG9uYXRlQW5vbnltb3VzbHk6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHRoYXQudG9nZ2xlQW5vbnltb3VzKCQob3B0aW9ucy5hbm9ueW1vdXNfc2VsZWN0b3IsIGVsZW1lbnQpKTtcbiAgICAgICQob3B0aW9ucy5hbm9ueW1vdXNfc2VsZWN0b3IsIGVsZW1lbnQpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgdGhhdC50b2dnbGVBbm9ueW1vdXMoJCh0aGlzKSk7XG4gICAgICB9KTtcbiAgICB9LCAvLyBkb25hdGVBbm9ueW1vdXNseVxuXG4gICAgdG9nZ2xlQW5vbnltb3VzOiBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICBpZiAoZWxlbWVudC5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICAkKHRoaXMub3B0aW9ucy5uYW1lX3NlbGVjdG9yICsgJyBkaXY6Zmlyc3QnLCB0aGlzLmVsZW1lbnQpLmhpZGUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQodGhpcy5vcHRpb25zLm5hbWVfc2VsZWN0b3IgKyAnIGRpdjpmaXJzdCcsIHRoaXMuZWxlbWVudCkuc2hvdygpO1xuICAgICAgfVxuICAgIH0sIC8vIHRvZ2dsZUFub255bW91c1xuXG4gICAgaG9ub3JPck1lbW9yeTogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgaWYgKCQob3B0aW9ucy5ob25vcl9vcl9tZW1vcnlfY2hvb3NlciArICc6Y2hlY2tlZCcpLnZhbCgpKSB7XG4gICAgICAgICQob3B0aW9ucy5ob25vcl9tZW1vcnlfaW5wdXRfZ3JvdXAsIGVsZW1lbnQpLnNob3coKTtcbiAgICAgICAgJChvcHRpb25zLmhvbm9yX3R5cGVfc2VsZWN0b3IpLnRleHQoJChvcHRpb25zLmhvbm9yX29yX21lbW9yeV9jaG9vc2VyICsgJzpjaGVja2VkJykudmFsKCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJChvcHRpb25zLmhvbm9yX21lbW9yeV9pbnB1dF9ncm91cCwgZWxlbWVudCkuaGlkZSgpO1xuICAgICAgICAkKG9wdGlvbnMuaG9ub3JfbmFtZV9zZWxlY3RvciArICcgaW5wdXQnLCBlbGVtZW50KS52YWwoJycpO1xuICAgICAgfVxuICAgIH0sIC8vIGhvbm9yT3JNZW1vcnlcblxuICAgIGhvbm9yT3JNZW1vcnlUb2dnbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHRoYXQuaG9ub3JPck1lbW9yeSh0aGF0LmVsZW1lbnQsIHRoYXQub3B0aW9ucyk7XG4gICAgICAkKG9wdGlvbnMuaG9ub3Jfb3JfbWVtb3J5X2Nob29zZXIsIGVsZW1lbnQpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgdGhhdC5ob25vck9yTWVtb3J5KHRoYXQuZWxlbWVudCwgdGhhdC5vcHRpb25zKTtcbiAgICAgIH0pO1xuICAgIH0sIC8vIGhvbm9yT3JNZW1vcnlUb2dnbGVcblxuICAgIG91dHNpZGVVbml0ZWRTdGF0ZXM6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgICQob3B0aW9ucy5zaG93X2JpbGxpbmdfY291bnRyeV9zZWxlY3RvcikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICQob3B0aW9ucy5iaWxsaW5nX2NvdW50cnlfc2VsZWN0b3IpLnNob3coKTtcbiAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5oaWRlKCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuICAgICAgJChvcHRpb25zLnNob3dfc2hpcHBpbmdfY291bnRyeV9zZWxlY3RvcikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICQob3B0aW9ucy5zaGlwcGluZ19jb3VudHJ5X3NlbGVjdG9yKS5zaG93KCk7XG4gICAgICAgICQodGhpcykucGFyZW50KCkuaGlkZSgpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9LCAvLyBvdXRzaWRlVW5pdGVkU3RhdGVzXG5cbiAgICBzaGlwcGluZ0FkZHJlc3M6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHZhciBzaG93X3NoaXBwaW5nID0gZmFsc2U7XG4gICAgICBpZiAoJChvcHRpb25zLnVzZV9mb3Jfc2hpcHBpbmdfc2VsZWN0b3IpLmxlbmd0aCA+IDApIHsgLy8gd2UgaGF2ZSBhIHNoaXBwaW5nIGNoZWNrYm94XG4gICAgICAgIHNob3dfc2hpcHBpbmcgPSB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKHNob3dfc2hpcHBpbmcgPT09IHRydWUgKSB7XG4gICAgICAgICQob3B0aW9ucy51c2VfZm9yX3NoaXBwaW5nX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKS5zaG93KCk7XG4gICAgICAgIGlmICgkKG9wdGlvbnMudXNlX2Zvcl9zaGlwcGluZ19zZWxlY3RvciwgZWxlbWVudCkuaXMoJzpjaGVja2VkJykpIHsgLy8gdXNlIHNhbWUgYXMgYmlsbGluZ1xuICAgICAgICAgICQob3B0aW9ucy5zaGlwcGluZ19zZWxlY3RvcikuaGlkZSgpO1xuICAgICAgICB9IGVsc2UgeyAvLyBzZXBhcmF0ZSBzaGlwcGluZyBhbmQgYmlsbGluZ1xuICAgICAgICAgICQob3B0aW9ucy5zaGlwcGluZ19zZWxlY3Rvcikuc2hvdygpO1xuICAgICAgICB9XG4gICAgICAgICQob3B0aW9ucy51c2VfZm9yX3NoaXBwaW5nX3NlbGVjdG9yLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdGhhdC5zaGlwcGluZ0FkZHJlc3MoZWxlbWVudCwgb3B0aW9ucyk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgXG4gICAgfSwgLy8gc2hpcHBpbmdBZGRyZXNzXG5cbiAgICBhbGxvd01pbm5wb3N0QWNjb3VudDogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdmFyIGFjY291bnRfZXhpc3RzID0gZmFsc2U7XG5cbiAgICAgIC8vIHNob3cgcGFzc3dvcmQgYXMgdGV4dFxuICAgICAgdGhhdC5zaG93UGFzc3dvcmQoKTtcblxuICAgICAgLy8gY2FsY3VsYXRlIHBhc3N3b3JkIHN0cmVuZ3RoXG4gICAgICB0aGF0LnNob3dQYXNzd29yZFN0cmVuZ3RoKCk7XG4gICAgICBcbiAgICAgIHRoYXQuc3BhbUVtYWlsKCQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkpO1xuICAgICAgJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoYXQuc3BhbUVtYWlsKCQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoYXQudG9nZ2xlQWNjb3VudEZpZWxkcygkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KSk7XG4gICAgICAkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoYXQudG9nZ2xlQWNjb3VudEZpZWxkcygkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KSk7XG4gICAgICB9KTtcblxuICAgICAgZnVuY3Rpb24gZG9uZVR5cGluZyAoKSB7XG4gICAgICAgIHZhciBlbWFpbCA9ICQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCk7XG4gICAgICAgIGFjY291bnRfZXhpc3RzID0gdGhhdC5jaGVja01pbm5wb3N0QWNjb3VudChlbGVtZW50LCBvcHRpb25zLCBlbWFpbCk7XG4gICAgICB9XG5cbiAgICAgIC8vc2V0dXAgYmVmb3JlIGZ1bmN0aW9uc1xuICAgICAgdmFyIHR5cGluZ1RpbWVyOyAgICAgICAgICAgICAgICAvL3RpbWVyIGlkZW50aWZpZXJcbiAgICAgIHZhciBkb25lVHlwaW5nSW50ZXJ2YWwgPSA1MDAwOyAgLy90aW1lIGluIG1zLCA1IHNlY29uZCBmb3IgZXhhbXBsZVxuXG4gICAgICAvL29uIGtleXVwLCBzdGFydCB0aGUgY291bnRkb3duXG4gICAgICAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLmtleXVwKGZ1bmN0aW9uKCl7XG4gICAgICAgIGNsZWFyVGltZW91dCh0eXBpbmdUaW1lcik7XG4gICAgICAgIGlmICgkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCkge1xuICAgICAgICAgIHR5cGluZ1RpbWVyID0gc2V0VGltZW91dChkb25lVHlwaW5nLCBkb25lVHlwaW5nSW50ZXJ2YWwpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LCAvLyBhbGxvd01pbm5wb3N0QWNjb3VudFxuXG4gICAgc3BhbUVtYWlsOiBmdW5jdGlvbihlbWFpbF9maWVsZCkge1xuICAgICAgdmFyIHNwYW1FcnJvckNvbnRhaW5lciA9IGVtYWlsX2ZpZWxkLnBhcmVudCgpO1xuICAgICAgaWYgKCQoJy5hLXNwYW0tZW1haWwnLCBzcGFtRXJyb3JDb250YWluZXIpLmxlbmd0aCA9PT0gMCApIHtcbiAgICAgICAgc3BhbUVycm9yQ29udGFpbmVyLmFwcGVuZCgnPHAgY2xhc3M9XCJhLWZvcm0tY2FwdGlvbiBhLWVycm9yIGEtc3BhbS1lbWFpbFwiPlRoaXMgZW1haWwgYWRkcmVzcyBoYXMgYmVlbiBkZXRlY3RlZCBhcyBhIHNwYW1tZXIuPC9wPicpO1xuICAgICAgfVxuICAgICAgJCgnLmEtc3BhbS1lbWFpbCcsIHNwYW1FcnJvckNvbnRhaW5lcikuaGlkZSgpO1xuICAgICAgc3BhbUVycm9yQ29udGFpbmVyLnJlbW92ZUNsYXNzKCdpbnZhbGlkIGEtZXJyb3InKTtcbiAgICB9LCAvLyBzcGFtRW1haWxcblxuICAgIHRvZ2dsZUFjY291bnRGaWVsZHM6IGZ1bmN0aW9uKGNyZWF0ZV9hY2NvdW50X3NlbGVjdG9yKSB7XG4gICAgICBpZiAoY3JlYXRlX2FjY291bnRfc2VsZWN0b3IuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgY3JlYXRlX2FjY291bnRfc2VsZWN0b3IucGFyZW50KCkuYmVmb3JlKCc8cCBjbGFzcz1cImEtZm9ybS1jYXB0aW9uIGEtYWNjb3VudC1leGlzdHMgYS1hY2NvdW50LWV4aXN0cy1zdWNjZXNzXCI+VGhlcmUgaXMgYWxyZWFkeSBhIE1pbm5Qb3N0LmNvbSBhY2NvdW50IHdpdGggdGhpcyBlbWFpbCBhZGRyZXNzLjwvcD4nKTtcbiAgICAgICAgJCgnLmEtYWNjb3VudC1leGlzdHMnKS5oaWRlKCk7XG4gICAgICAgICQodGhpcy5vcHRpb25zLnBhc3N3b3JkX3NlbGVjdG9yLCB0aGlzLmVsZW1lbnQpLnNob3coKTtcbiAgICAgICAgdGhpcy5vcHRpb25zLmNyZWF0ZV9hY2NvdW50ID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQodGhpcy5vcHRpb25zLnBhc3N3b3JkX3NlbGVjdG9yLCB0aGlzLmVsZW1lbnQpLmhpZGUoKTtcbiAgICAgIH1cbiAgICB9LCAvLyB0b2dnbGVBY2NvdW50RmllbGRzXG5cbiAgICBzaG93UGFzc3dvcmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgLy8gQ2FjaGUgb3VyIGpxdWVyeSBlbGVtZW50c1xuICAgICAgdmFyICRzdWJtaXQgPSAkKCcuYnRuLXN1Ym1pdCcpO1xuICAgICAgdmFyICRjb250YWluZXIgPSAkKHRoaXMub3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgdGhpcy5lbGVtZW50KTtcbiAgICAgIHZhciAkZmllbGQgPSAkKCdpbnB1dFtuYW1lPVwicGFzc3dvcmRcIl0nLCAkY29udGFpbmVyKTtcbiAgICAgICQoJy5hLWFjY291bnQtZXhpc3RzJykuaGlkZSgpO1xuICAgICAgdmFyIHNob3dfcGFzcyA9ICc8ZGl2IGNsYXNzPVwiYS1mb3JtLXNob3ctcGFzc3dvcmQgYS1mb3JtLWNhcHRpb25cIj48bGFiZWw+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG5hbWU9XCJzaG93X3Bhc3N3b3JkXCIgaWQ9XCJzaG93LXBhc3N3b3JkLWNoZWNrYm94XCIgdmFsdWU9XCIxXCI+IFNob3cgcGFzc3dvcmQ8L2xhYmVsPjwvZGl2Pic7XG4gICAgICAvLyBJbmplY3QgdGhlIHRvZ2dsZSBidXR0b24gaW50byB0aGUgcGFnZVxuICAgICAgJGNvbnRhaW5lci5hcHBlbmQoIHNob3dfcGFzcyApO1xuICAgICAgLy8gQ2FjaGUgdGhlIHRvZ2dsZSBidXR0b25cbiAgICAgIHZhciAkdG9nZ2xlID0gJCgnI3Nob3ctcGFzc3dvcmQtY2hlY2tib3gnKTtcbiAgICAgIC8vIFRvZ2dsZSB0aGUgZmllbGQgdHlwZVxuICAgICAgJHRvZ2dsZS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIHZhciBjaGVja2JveCA9ICQodGhpcyk7XG4gICAgICAgIGlmIChjaGVja2JveC5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICAgICRmaWVsZC5hdHRyKCd0eXBlJywgJ3RleHQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkZmllbGQuYXR0cigndHlwZScsICdwYXNzd29yZCcpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIC8vIFNldCB0aGUgZm9ybSBmaWVsZCBiYWNrIHRvIGEgcmVndWxhciBwYXNzd29yZCBlbGVtZW50XG4gICAgICAkc3VibWl0Lm9uKCAnY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICRmaWVsZC5hdHRyKCd0eXBlJywgJ3Bhc3N3b3JkJyk7XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgc2hvd1Bhc3N3b3JkU3RyZW5ndGg6IGZ1bmN0aW9uKCkge1xuICAgICAgLy8gY2hlY2tQYXNzd29yZFN0cmVuZ3RoXG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICBpZiAoJCgnLmEtcGFzc3dvcmQtc3RyZW5ndGgnKS5sZW5ndGggPiAwICkge1xuICAgICAgICB2YXIgJGJlZm9yZSA9ICQoJy5hLWZvcm0tc2hvdy1wYXNzd29yZCcpO1xuICAgICAgICAkYmVmb3JlLmFmdGVyKCAkKCc8ZGl2IGNsYXNzPVwiYS1wYXNzd29yZC1zdHJlbmd0aFwiPjxtZXRlciBtYXg9XCI0XCIgaWQ9XCJwYXNzd29yZC1zdHJlbmd0aFwiPjxkaXY+PC9kaXY+PC9tZXRlcj48cCBjbGFzcz1cImEtZm9ybS1jYXB0aW9uXCIgaWQ9XCJwYXNzd29yZC1zdHJlbmd0aC10ZXh0XCI+PC9wPjwvZGl2PicpKTtcbiAgICAgICAgJCggJ2JvZHknICkub24oICdrZXl1cCcsICdpbnB1dFtuYW1lPXBhc3N3b3JkXScsXG4gICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGF0LmNoZWNrUGFzc3dvcmRTdHJlbmd0aChcbiAgICAgICAgICAgICAgJCgnaW5wdXRbbmFtZT1wYXNzd29yZF0nKSwgLy8gUGFzc3dvcmQgZmllbGRcbiAgICAgICAgICAgICAgJCgnI3Bhc3N3b3JkLXN0cmVuZ3RoJyksICAgICAgICAgICAvLyBTdHJlbmd0aCBtZXRlclxuICAgICAgICAgICAgICAkKCcjcGFzc3dvcmQtc3RyZW5ndGgtdGV4dCcpICAgICAgLy8gU3RyZW5ndGggdGV4dCBpbmRpY2F0b3JcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0sIC8vIHNob3dQYXNzd29yZFN0cmVuZ3RoXG5cbiAgICBjaGVja1Bhc3N3b3JkU3RyZW5ndGg6IGZ1bmN0aW9uKCAkcGFzc3dvcmQsICRzdHJlbmd0aE1ldGVyLCAkc3RyZW5ndGhUZXh0ICkge1xuICAgICAgdmFyIHBhc3N3b3JkID0gJHBhc3N3b3JkLnZhbCgpO1xuICAgICAgLy8gR2V0IHRoZSBwYXNzd29yZCBzdHJlbmd0aFxuICAgICAgdmFyIHJlc3VsdCA9IHp4Y3ZibihwYXNzd29yZCk7XG4gICAgICB2YXIgc3RyZW5ndGggPSByZXN1bHQuc2NvcmU7XG5cbiAgICAgICRzdHJlbmd0aFRleHQucmVtb3ZlQ2xhc3MoICdzaG9ydCBiYWQgZ29vZCBzdHJvbmcnICk7XG5cbiAgICAgIC8vIEFkZCB0aGUgc3RyZW5ndGggbWV0ZXIgcmVzdWx0c1xuICAgICAgc3dpdGNoICggc3RyZW5ndGggKSB7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAkc3RyZW5ndGhUZXh0LmFkZENsYXNzKCAnYmFkJyApLmh0bWwoICdTdHJlbmd0aDogPHN0cm9uZz5XZWFrPC9zdHJvbmc+JyApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgJHN0cmVuZ3RoVGV4dC5hZGRDbGFzcyggJ2dvb2QnICkuaHRtbCggJ1N0cmVuZ3RoOiA8c3Ryb25nPk1lZGl1bTwvc3Ryb25nPicgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICRzdHJlbmd0aFRleHQuYWRkQ2xhc3MoICdzdHJvbmcnICkuaHRtbCggJ1N0cmVuZ3RoOiA8c3Ryb25nPlN0cm9uZzwvc3Ryb25nPicgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICRzdHJlbmd0aFRleHQuYWRkQ2xhc3MoICdzaG9ydCcgKS5odG1sKCAnU3RyZW5ndGg6IDxzdHJvbmc+VmVyeSB3ZWFrPC9zdHJvbmc+JyApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICRzdHJlbmd0aFRleHQuYWRkQ2xhc3MoICdzaG9ydCcgKS5odG1sKCAnU3RyZW5ndGg6IDxzdHJvbmc+VmVyeSB3ZWFrPC9zdHJvbmc+JyApO1xuICAgICAgfVxuICAgICAgJHN0cmVuZ3RoTWV0ZXIudmFsKHN0cmVuZ3RoKTtcbiAgICAgIHJldHVybiBzdHJlbmd0aDtcbiAgICB9LCAvLyBjaGVja1Bhc3N3b3JkU3RyZW5ndGhcblxuICAgIGNoZWNrTWlubnBvc3RBY2NvdW50OiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zLCBlbWFpbCkge1xuICAgICAgdmFyIHVzZXIgPSB7XG4gICAgICAgIGVtYWlsOiBlbWFpbFxuICAgICAgfTtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICQuYWpheCh7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIHVybDogb3B0aW9ucy5taW5ucG9zdF9yb290ICsgJy93cC1qc29uL3VzZXItYWNjb3VudC1tYW5hZ2VtZW50L3YxL2NoZWNrLWFjY291bnQnLFxuICAgICAgICBkYXRhOiB1c2VyXG4gICAgICB9KS5kb25lKGZ1bmN0aW9uKCByZXN1bHQgKSB7XG4gICAgICAgIGlmIChyZXN1bHQuc3RhdHVzID09PSAnc3VjY2VzcycgJiYgcmVzdWx0LnJlYXNvbiA9PT0gJ3VzZXIgZXhpc3RzJykgeyAvLyB1c2VyIGV4aXN0c1xuICAgICAgICAgIGlmICgkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KS5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICAgICAgJChvcHRpb25zLnBhc3N3b3JkX3NlbGVjdG9yLCBlbGVtZW50KS5oaWRlKCk7XG4gICAgICAgICAgICAkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKS5oaWRlKCk7XG4gICAgICAgICAgICAkKCcuYS1hY2NvdW50LWV4aXN0cycsIGVsZW1lbnQpLnNob3coKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCQob3B0aW9ucy5jcmVhdGVfbXBfc2VsZWN0b3IsIGVsZW1lbnQpLmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgICAgICAgICQob3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgZWxlbWVudCkuaGlkZSgpO1xuICAgICAgICAgICAgICAkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKS5oaWRlKCk7XG4gICAgICAgICAgICAgICQoJy5hLWFjY291bnQtZXhpc3RzJywgZWxlbWVudCkuc2hvdygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKCByZXN1bHQuc3RhdHVzID09PSAnc3BhbScgKSB7XG4gICAgICAgICAgJCh0aGF0Lm9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IpLmFkZENsYXNzKCdpbnZhbGlkIGEtZXJyb3InKTtcbiAgICAgICAgICAkKCAnLmEtc3BhbS1lbWFpbCcpLnNob3coKTtcbiAgICAgICAgfSBlbHNlIHsgLy8gdXNlciBkb2VzIG5vdCBleGlzdCBvciBhamF4IGNhbGwgZmFpbGVkXG4gICAgICAgICAgaWYgKCQob3B0aW9ucy5jcmVhdGVfbXBfc2VsZWN0b3IsIGVsZW1lbnQpLmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgICAgICAkKG9wdGlvbnMucGFzc3dvcmRfc2VsZWN0b3IsIGVsZW1lbnQpLnNob3coKTtcbiAgICAgICAgICAgIG9wdGlvbnMuY3JlYXRlX2FjY291bnQgPSB0cnVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKG9wdGlvbnMucGFzc3dvcmRfc2VsZWN0b3IsIGVsZW1lbnQpLmhpZGUoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgJCgnLmEtYWNjb3VudC1leGlzdHMnLCBlbGVtZW50KS5oaWRlKCk7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LCAvLyBjaGVja01pbm5wb3N0QWNjb3VudFxuXG4gICAgcGF5bWVudFJlcXVlc3RCdXR0b246IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHZhciB0b3RhbF9hbW91bnQgPSB0aGF0LmdldFRvdGFsQW1vdW50KCk7XG4gICAgICB0aGF0LnBheW1lbnRSZXF1ZXN0ID0gdGhhdC5zdHJpcGUucGF5bWVudFJlcXVlc3Qoe1xuICAgICAgICBjb3VudHJ5OiAnVVMnLFxuICAgICAgICBjdXJyZW5jeTogJ3VzZCcsXG4gICAgICAgIHRvdGFsOiB7XG4gICAgICAgICAgbGFiZWw6ICdNaW5uUG9zdCBEb25hdGlvbicsXG4gICAgICAgICAgYW1vdW50OiB0b3RhbF9hbW91bnQgKiAxMDAsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICAgIHRoYXQucHJCdXR0b24gPSB0aGF0LmVsZW1lbnRzLmNyZWF0ZSgncGF5bWVudFJlcXVlc3RCdXR0b24nLCB7XG4gICAgICAgIHBheW1lbnRSZXF1ZXN0OiB0aGF0LnBheW1lbnRSZXF1ZXN0LFxuICAgICAgfSk7XG4gICAgICBcbiAgICAgIC8vIENoZWNrIHRoZSBhdmFpbGFiaWxpdHkgb2YgdGhlIFBheW1lbnQgUmVxdWVzdCBBUEkgZmlyc3QuXG4gICAgICB0aGF0LnBheW1lbnRSZXF1ZXN0LmNhbk1ha2VQYXltZW50KCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICQoJy5tLXBheS13aXRob3V0LXBheW1lbnQtcmVxdWVzdCcpLmhpZGUoKTtcbiAgICAgICAgICB0aGF0LnByQnV0dG9uLm1vdW50KCcjcGF5bWVudC1yZXF1ZXN0LWJ1dHRvbicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICQoJy5vLXBheS13aXRoLXBheW1lbnQtcmVxdWVzdCcpLmhpZGUoKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgICQoJy5kZWNsaW5lLWFwcGxlLXBheSBhJykuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJCh0aGlzKS5oaWRlKCk7XG4gICAgICAgICQoJy5tLXBheS13aXRob3V0LXBheW1lbnQtcmVxdWVzdCcpLnNob3coKTtcbiAgICAgICAgJCgnLm8tcGF5LXdpdGgtcGF5bWVudC1yZXF1ZXN0IC5tLWZvcm0tYWN0aW9ucy1wYXktZmVlcycpLmhpZGUoKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGF0LnBheW1lbnRSZXF1ZXN0Lm9uKCdwYXltZW50bWV0aG9kJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgLy8gU2VuZCBwYXltZW50TWV0aG9kLmlkIHRvIHNlcnZlclxuICAgICAgICB2YXIgc3VwcG9ydGZvcm0gPSAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3Rvcik7XG4gICAgICAgIHZhciB0b2tlbkZpZWxkTmFtZSA9ICdwYXltZW50X21ldGhvZF9pZCc7XG4gICAgICAgIHZhciB0b2tlbkZpZWxkID0gJ2lucHV0W25hbWU9XCInICsgdG9rZW5GaWVsZE5hbWUgKyAnXCJdJztcblxuICAgICAgICAvLyBJbnNlcnQgdGhlIHBheW1lbnQgbWV0aG9kIElEIGludG8gdGhlIGZvcm0gc28gaXQgZ2V0cyBzdWJtaXR0ZWQgdG8gdGhlIHNlcnZlclxuICAgICAgICBpZiAoJCh0b2tlbkZpZWxkKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgJCh0b2tlbkZpZWxkKS52YWwoZXZlbnQucGF5bWVudE1ldGhvZC5pZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3VwcG9ydGZvcm0uYXBwZW5kKCQoJzxpbnB1dCB0eXBlPVxcXCJoaWRkZW5cXFwiIG5hbWU9XCInICsgdG9rZW5GaWVsZE5hbWUgKyAnXCI+JykudmFsKGV2ZW50LnBheW1lbnRNZXRob2QuaWQpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoYXQucGF5bWVudFJlcXVlc3RIYW5kbGVyKCk7XG5cbiAgICAgIH0pO1xuXG4gICAgfSwgLy8gcGF5bWVudFJlcXVlc3RCdXR0b25cblxuICAgIGNob29zZVBheW1lbnRNZXRob2Q6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcblxuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuXG4gICAgICBpZiAoJChvcHRpb25zLmNob29zZV9wYXltZW50KS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGlmICgkKG9wdGlvbnMuY2hvb3NlX3BheW1lbnQgKyAnIGlucHV0JykuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgICB2YXIgY2hlY2tlZF9pZCA9ICQob3B0aW9ucy5jaG9vc2VfcGF5bWVudCArICcgaW5wdXQ6Y2hlY2tlZCcpLmF0dHIoJ2lkJyk7XG4gICAgICAgICAgdmFyIGNoZWNrZWRfdmFsdWUgPSAkKG9wdGlvbnMuY2hvb3NlX3BheW1lbnQgKyAnIGlucHV0OmNoZWNrZWQnKS52YWwoKTtcbiAgICAgICAgICB0aGF0LnNldHVwUGF5bWVudE1ldGhvZChjaGVja2VkX2lkLCBjaGVja2VkX3ZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgICQob3B0aW9ucy5jaG9vc2VfcGF5bWVudCArICcgaW5wdXQnKS5jaGFuZ2UoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciBjaGVja2VkX2lkID0gdGhpcy5pZDtcbiAgICAgICAgICB2YXIgY2hlY2tlZF92YWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgICAgICAgdGhhdC5zZXR1cFBheW1lbnRNZXRob2QoY2hlY2tlZF9pZCwgY2hlY2tlZF92YWx1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICB9XG4gICAgfSwgLy8gY2hvb3NlUGF5bWVudE1ldGhvZFxuXG4gICAgc2V0dXBQYXltZW50TWV0aG9kOiBmdW5jdGlvbihlbGVtZW50X2lkLCBlbGVtZW50X3ZhbHVlKSB7XG4gICAgICB2YXIgc3RyaXBlX3BheW1lbnRfdHlwZSA9IHRoaXMuc2V0U3RyaXBlUGF5bWVudFR5cGUoZWxlbWVudF92YWx1ZSk7XG4gICAgICBpZiAoIGVsZW1lbnRfdmFsdWUgPT09ICdiYW5rX2FjY291bnQnICkge1xuICAgICAgICAkKCdpbnB1dFtuYW1lPVwicGF5bWVudF9tZXRob2RfaWRcIl0nLCAkKHRoaXMub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikpLnJlbW92ZSgpO1xuICAgICAgICB0aGlzLmFjaEZpZWxkcyh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlbW92ZUFjaEZpZWxkcyh0aGlzLm9wdGlvbnMpO1xuICAgICAgfVxuICAgICAgJCh0aGlzLm9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICQodGhpcy5vcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yICsgJy4nICsgZWxlbWVudF9pZCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgJCh0aGlzLm9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IgKyAnOm5vdCguYWN0aXZlKSBpbnB1dCcpLnZhbCgnJyk7XG4gICAgICB0aGlzLmNhbGN1bGF0ZUZlZXModGhpcy5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCwgc3RyaXBlX3BheW1lbnRfdHlwZSk7XG4gICAgfSwgLy8gc2V0dXBQYXltZW50TWV0aG9kXG5cbiAgICByZW1vdmVBY2hGaWVsZHM6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICQoJ2lucHV0W25hbWU9XCJwdWJsaWNfdG9rZW5cIl0nLCAkKG9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpKS5yZW1vdmUoKTtcbiAgICAgICQoJ2lucHV0W25hbWU9XCJhY2NvdW50X2lkXCJdJywgJChvcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKSkucmVtb3ZlKCk7XG4gICAgICAkKCdpbnB1dFtuYW1lPVwiYmFua1Rva2VuXCJdJywgJChvcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKSkucmVtb3ZlKCk7XG4gICAgfSwgLy8gcmVtb3ZlQWNoRmllbGRzXG5cbiAgICBjcmVkaXRDYXJkRmllbGRzOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG5cbiAgICAgIHZhciB0aGF0ID0gdGhpcztcblxuICAgICAgdmFyIHN0eWxlID0ge1xuICAgICAgICBiYXNlOiB7XG4gICAgICAgICAgaWNvbkNvbG9yOiAnIzY2NkVFOCcsXG4gICAgICAgICAgbGluZUhlaWdodDogJzQzcHgnLFxuICAgICAgICAgIGZvbnRXZWlnaHQ6IDQwMCxcbiAgICAgICAgICBmb250RmFtaWx5OiAnZmYtbWV0YS13ZWItcHJvJyxcbiAgICAgICAgICBmb250U2l6ZTogJzI0cHgnLFxuICAgICAgICAgIC8vbGluZUhlaWdodDogJzM3cHgnLFxuICAgICAgICAgIC8vZm9udFNpemU6ICcxNnB4JyxcbiAgICAgICAgfSxcbiAgICAgICAgaW52YWxpZDoge1xuICAgICAgICAgIGNvbG9yOiAnIzFhMTgxOCcsXG4gICAgICAgIH0sXG4gICAgICB9O1xuXG4gICAgICAvLyBBZGQgYW4gaW5zdGFuY2Ugb2YgdGhlIGNhcmQgVUkgY29tcG9uZW50IGludG8gdGhlIGBjYXJkLWVsZW1lbnRgIDxkaXY+XG4gICAgICAvL2NhcmQubW91bnQoJyNjYXJkLWVsZW1lbnQnKTtcbiAgICAgIGlmICggJCgnLmNyZWRpdC1jYXJkLWdyb3VwJykubGVuZ3RoID09PSAwICYmICQoJy5wYXltZW50LW1ldGhvZC5jaG9vc2UtY2FyZCcpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGF0LmNhcmROdW1iZXJFbGVtZW50ID0gdGhhdC5lbGVtZW50cy5jcmVhdGUoJ2NhcmROdW1iZXInLCB7XG4gICAgICAgIHNob3dJY29uOiB0cnVlLFxuICAgICAgICBzdHlsZTogc3R5bGVcbiAgICAgIH0pO1xuICAgICAgdGhhdC5jYXJkTnVtYmVyRWxlbWVudC5tb3VudChvcHRpb25zLmNjX251bV9zZWxlY3Rvcik7XG5cbiAgICAgIHRoYXQuY2FyZEV4cGlyeUVsZW1lbnQgPSB0aGF0LmVsZW1lbnRzLmNyZWF0ZSgnY2FyZEV4cGlyeScsIHtcbiAgICAgICAgc3R5bGU6IHN0eWxlXG4gICAgICB9KTtcbiAgICAgIHRoYXQuY2FyZEV4cGlyeUVsZW1lbnQubW91bnQob3B0aW9ucy5jY19leHBfc2VsZWN0b3IpO1xuXG4gICAgICB0aGF0LmNhcmRDdmNFbGVtZW50ID0gdGhhdC5lbGVtZW50cy5jcmVhdGUoJ2NhcmRDdmMnLCB7XG4gICAgICAgIHN0eWxlOiBzdHlsZVxuICAgICAgfSk7XG4gICAgICB0aGF0LmNhcmRDdmNFbGVtZW50Lm1vdW50KG9wdGlvbnMuY2NfY3ZjX3NlbGVjdG9yKTtcblxuICAgICAgLy8gdmFsaWRhdGUvZXJyb3IgaGFuZGxlIHRoZSBjYXJkIGZpZWxkc1xuICAgICAgdGhhdC5jYXJkTnVtYmVyRWxlbWVudC5vbignY2hhbmdlJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgdmFyIHN0cmlwZV9wYXltZW50X3R5cGUgPSAnY2FyZCc7XG4gICAgICAgIC8vIFN3aXRjaCBwYXltZW50IHR5cGUgaWYgaXQncyBvbmUgdGhhdCB3ZSByZWNvZ25pemUgYXMgZGlzdGluY3RcbiAgICAgICAgaWYgKGV2ZW50LmJyYW5kKSB7XG4gICAgICAgICAgaWYgKCBldmVudC5icmFuZCA9PT0gJ2FtZXgnICkge1xuICAgICAgICAgICAgc3RyaXBlX3BheW1lbnRfdHlwZSA9ICdhbWV4JztcbiAgICAgICAgICB9ICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIC8vIGVycm9yIGhhbmRsaW5nXG4gICAgICAgIHRoYXQuc3RyaXBlRXJyb3JEaXNwbGF5KGV2ZW50LmVycm9yLCAkKG9wdGlvbnMuY2NfbnVtX3NlbGVjdG9yLCBlbGVtZW50KSwgZWxlbWVudCwgb3B0aW9ucyApO1xuICAgICAgICAvLyBpZiBpdCBjaGFuZ2VkLCByZXNldCB0aGUgYnV0dG9uXG4gICAgICAgIHRoYXQuYnV0dG9uU3RhdHVzKG9wdGlvbnMsICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKSwgZmFsc2UpO1xuICAgICAgICB0aGF0LmNhbGN1bGF0ZUZlZXModGhhdC5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCwgc3RyaXBlX3BheW1lbnRfdHlwZSk7XG4gICAgICB9KTtcblxuICAgICAgdGhhdC5jYXJkRXhwaXJ5RWxlbWVudC5vbignY2hhbmdlJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgLy8gZXJyb3IgaGFuZGxpbmdcbiAgICAgICAgdGhhdC5zdHJpcGVFcnJvckRpc3BsYXkoZXZlbnQuZXJyb3IsICQob3B0aW9ucy5jY19leHBfc2VsZWN0b3IsIGVsZW1lbnQpLCBlbGVtZW50LCBvcHRpb25zICk7XG4gICAgICAgIC8vIGlmIGl0IGNoYW5nZWQsIHJlc2V0IHRoZSBidXR0b25cbiAgICAgICAgdGhhdC5idXR0b25TdGF0dXMob3B0aW9ucywgJCh0aGF0Lm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLmZpbmQoJ2J1dHRvbicpLCBmYWxzZSk7XG4gICAgICB9KTtcblxuICAgICAgdGhhdC5jYXJkQ3ZjRWxlbWVudC5vbignY2hhbmdlJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgLy8gZXJyb3IgaGFuZGxpbmdcbiAgICAgICAgdGhhdC5zdHJpcGVFcnJvckRpc3BsYXkoZXZlbnQuZXJyb3IsICQob3B0aW9ucy5jY19jdmNfc2VsZWN0b3IsIGVsZW1lbnQpLCBlbGVtZW50LCBvcHRpb25zICk7XG4gICAgICAgIC8vIGlmIGl0IGNoYW5nZWQsIHJlc2V0IHRoZSBidXR0b25cbiAgICAgICAgdGhhdC5idXR0b25TdGF0dXMob3B0aW9ucywgJCh0aGF0Lm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLmZpbmQoJ2J1dHRvbicpLCBmYWxzZSk7XG4gICAgICB9KTtcblxuICAgICAgLy8gdGhpcyBpcyB0aGUgbWV0aG9kIHRvIGNyZWF0ZSBhIHNpbmdsZSBjYXJkIGZpZWxkIGFuZCBtb3VudCBpdFxuICAgICAgLyp2YXIgY2FyZCA9IHRoYXQuZWxlbWVudHMuY3JlYXRlKFxuICAgICAgICAnY2FyZCcsXG4gICAgICAgIHtcbiAgICAgICAgICBoaWRlUG9zdGFsQ29kZTogdHJ1ZVxuICAgICAgICB9XG4gICAgICApO1xuICAgICAgLy8gQWRkIGFuIGluc3RhbmNlIG9mIHRoZSBjYXJkIFVJIGNvbXBvbmVudCBpbnRvIHRoZSBgY2FyZC1lbGVtZW50YCA8ZGl2PlxuICAgICAgY2FyZC5tb3VudCgnI2NhcmQtZWxlbWVudCcpOyovXG5cbiAgICB9LCAvLyBjcmVkaXRDYXJkRmllbGRzXG5cbiAgICBhY2hGaWVsZHM6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciBiYW5rVG9rZW5GaWVsZE5hbWUgPSAnYmFua1Rva2VuJztcbiAgICAgIHZhciBiYW5rVG9rZW5GaWVsZCA9ICdpbnB1dFtuYW1lPVwiJyArIGJhbmtUb2tlbkZpZWxkTmFtZSArICdcIl0nO1xuICAgICAgaWYgKG9wdGlvbnMucGxhaWRfZW52ICE9ICcnICYmIG9wdGlvbnMua2V5ICE9ICcnICYmIHR5cGVvZiBQbGFpZCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdmFyIGxpbmtIYW5kbGVyID0gUGxhaWQuY3JlYXRlKHtcbiAgICAgICAgICBzZWxlY3RBY2NvdW50OiB0cnVlLFxuICAgICAgICAgIGFwaVZlcnNpb246ICd2MicsXG4gICAgICAgICAgZW52OiBvcHRpb25zLnBsYWlkX2VudixcbiAgICAgICAgICBjbGllbnROYW1lOiAnTWlublBvc3QnLFxuICAgICAgICAgIGtleTogb3B0aW9ucy5wbGFpZF9wdWJsaWNfa2V5LFxuICAgICAgICAgIHByb2R1Y3Q6ICdhdXRoJyxcbiAgICAgICAgICBvbkxvYWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy8gVGhlIExpbmsgbW9kdWxlIGZpbmlzaGVkIGxvYWRpbmcuXG4gICAgICAgICAgfSxcbiAgICAgICAgICBvblN1Y2Nlc3M6IGZ1bmN0aW9uKHB1YmxpY190b2tlbiwgbWV0YWRhdGEpIHtcbiAgICAgICAgICAgIC8vIFRoZSBvblN1Y2Nlc3MgZnVuY3Rpb24gaXMgY2FsbGVkIHdoZW4gdGhlIHVzZXIgaGFzIHN1Y2Nlc3NmdWxseVxuICAgICAgICAgICAgLy8gYXV0aGVudGljYXRlZCBhbmQgc2VsZWN0ZWQgYW4gYWNjb3VudCB0byB1c2UuXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gV2hlbiBjYWxsZWQsIHlvdSB3aWxsIHNlbmQgdGhlIHB1YmxpY190b2tlbiBhbmQgdGhlIHNlbGVjdGVkXG4gICAgICAgICAgICAvLyBhY2NvdW50IElELCBtZXRhZGF0YS5hY2NvdW50X2lkLCB0byB5b3VyIGJhY2tlbmQgYXBwIHNlcnZlci5cbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyBzZW5kRGF0YVRvQmFja2VuZFNlcnZlcih7XG4gICAgICAgICAgICAvLyAgIHB1YmxpY190b2tlbjogcHVibGljX3Rva2VuLFxuICAgICAgICAgICAgLy8gICBhY2NvdW50X2lkOiBtZXRhZGF0YS5hY2NvdW50X2lkXG4gICAgICAgICAgICAvLyB9KTtcblxuICAgICAgICAgICAgLy90aGlzLmRlYnVnKCdQdWJsaWMgVG9rZW46ICcgKyBwdWJsaWNfdG9rZW4pO1xuICAgICAgICAgICAgLy90aGlzLmRlYnVnKCdDdXN0b21lci1zZWxlY3RlZCBhY2NvdW50IElEOiAnICsgbWV0YWRhdGEuYWNjb3VudF9pZCk7XG5cbiAgICAgICAgICAgIHZhciBzdXBwb3J0Zm9ybSA9ICQob3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3Rvcik7XG5cbiAgICAgICAgICAgIC8vIHJlc3BvbnNlIGNvbnRhaW5zIGlkIGFuZCBjYXJkLCB3aGljaCBjb250YWlucyBhZGRpdGlvbmFsIGNhcmQgZGV0YWlsc1xuICAgICAgICAgICAgLy8gSW5zZXJ0IHRoZSBkYXRhIGludG8gdGhlIGZvcm0gc28gaXQgZ2V0cyBzdWJtaXR0ZWQgdG8gdGhlIHNlcnZlclxuICAgICAgICAgICAgc3VwcG9ydGZvcm0uYXBwZW5kKCQoJzxpbnB1dCB0eXBlPVxcXCJoaWRkZW5cXFwiIG5hbWU9XFxcInB1YmxpY190b2tlblxcXCIgLz4nKS52YWwocHVibGljX3Rva2VuKSk7XG4gICAgICAgICAgICBzdXBwb3J0Zm9ybS5hcHBlbmQoJCgnPGlucHV0IHR5cGU9XFxcImhpZGRlblxcXCIgbmFtZT1cXFwiYWNjb3VudF9pZFxcXCIgLz4nKS52YWwobWV0YWRhdGEuYWNjb3VudF9pZCkpO1xuXG4gICAgICAgICAgICAvLyBnZXQgdGhlIGFjY291bnQgdmFsaWRhdGVkIGJ5IGFqYXhcbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgIHVybDonL3BsYWlkX3Rva2VuLycsXG4gICAgICAgICAgICAgIGRhdGE6ICQoc3VwcG9ydGZvcm0pLnNlcmlhbGl6ZSgpLFxuICAgICAgICAgICAgICB0eXBlOiAnUE9TVCdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZG9uZShmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICBpZiAodHlwZW9mIHJlc3BvbnNlLmVycm9yICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIC8vIHRoZXJlIGlzIGFuIGVycm9yLlxuICAgICAgICAgICAgICAgICQob3B0aW9ucy5wbGFpZF9saW5rKS5wYXJlbnQoKS5hZnRlcignPHAgY2xhc3M9XCJlcnJvclwiPicgKyByZXNwb25zZS5lcnJvciArICc8L3A+JylcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL3RoaXMuZGVidWcoJ3ByaW50IHJlc3BvbnNlIGhlcmUnKTtcbiAgICAgICAgICAgICAgICAvL3RoaXMuZGVidWcocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIC8vIGFkZCB0aGUgZmllbGQocykgd2UgbmVlZCB0byB0aGUgZm9ybSBmb3Igc3VibWl0dGluZ1xuICAgICAgICAgICAgICAgIGlmICgkKGJhbmtUb2tlbkZpZWxkKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAkKGJhbmtUb2tlbkZpZWxkKS52YWwocmVzcG9uc2Uuc3RyaXBlX2JhbmtfYWNjb3VudF90b2tlbik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICQob3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikucHJlcGVuZCgkKCc8aW5wdXQgdHlwZT1cXFwiaGlkZGVuXFxcIiBuYW1lPVwiJyArIGJhbmtUb2tlbkZpZWxkTmFtZSArICdcIj4nKS52YWwocmVzcG9uc2Uuc3RyaXBlX2JhbmtfYWNjb3VudF90b2tlbikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkKG9wdGlvbnMucGxhaWRfbGluaywgZWxlbWVudCkuaHRtbCgnPHN0cm9uZz5Zb3VyIGFjY291bnQgd2FzIHN1Y2Nlc3NmdWxseSBhdXRob3JpemVkPC9zdHJvbmc+JykuY29udGVudHMoKS51bndyYXAoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5lcnJvcihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAkKG9wdGlvbnMucGxhaWRfbGluaykucGFyZW50KCkuYWZ0ZXIoJzxwIGNsYXNzPVwiZXJyb3JcIj4nICsgcmVzcG9uc2UuZXJyb3IgKyAnPC9wPicpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9uRXhpdDogZnVuY3Rpb24oZXJyLCBtZXRhZGF0YSkge1xuICAgICAgICAgICAgLy8gVGhlIHVzZXIgZXhpdGVkIHRoZSBMaW5rIGZsb3cuXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICAgICQob3B0aW9ucy5wbGFpZF9saW5rLCBlbGVtZW50KS5jbGljayhmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgJChvcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yICsgJyAuZXJyb3InKS5yZW1vdmUoKTsgLy8gcmVtb3ZlIG1ldGhvZCBlcnJvciBtZXNzYWdlIGlmIGl0IGlzIHRoZXJlXG4gICAgICAgICAgbGlua0hhbmRsZXIub3BlbigpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LCAvLyBhY2hGaWVsZHNcblxuICAgIGJ1dHRvblN0YXR1czogZnVuY3Rpb24ob3B0aW9ucywgYnV0dG9uLCBkaXNhYmxlZCkge1xuICAgICAgLy8gbWFrZSB0aGUgYnV0dG9uIGNsaWNrYWJsZSBvciBub3RcbiAgICAgIGJ1dHRvbi5wcm9wKCdkaXNhYmxlZCcsIGRpc2FibGVkKTtcbiAgICAgIGlmIChkaXNhYmxlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgYnV0dG9uLnRleHQob3B0aW9ucy5idXR0b25fdGV4dCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBidXR0b24udGV4dCgnUHJvY2Vzc2luZycpO1xuICAgICAgfVxuICAgIH0sIC8vIGJ1dHRvblN0YXR1c1xuXG4gICAgc2Nyb2xsVG9Gb3JtRXJyb3I6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGZvcm0gPSAkKCAnLm0tZm9ybScgKTtcbiAgICAgIC8vIGxpc3RlbiBmb3IgYGludmFsaWRgIGV2ZW50cyBvbiBhbGwgZm9ybSBpbnB1dHNcbiAgICAgIGZvcm0uZmluZCggJzppbnB1dCcgKS5vbiggJ2ludmFsaWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyIGlucHV0ID0gJCggdGhpcyApO1xuICAgICAgICAgIC8vIHRoZSBmaXJzdCBpbnZhbGlkIGVsZW1lbnQgaW4gdGhlIGZvcm1cbiAgICAgICAgdmFyIGZpcnN0ID0gZm9ybS5maW5kKCAnLmEtZXJyb3InICkuZmlyc3QoKTtcbiAgICAgICAgLy8gdGhlIGZvcm0gaXRlbSB0aGF0IGNvbnRhaW5zIGl0XG4gICAgICAgIHZhciBmaXJzdF9ob2xkZXIgPSBmaXJzdC5wYXJlbnQoKTtcbiAgICAgICAgICAvLyBvbmx5IGhhbmRsZSBpZiB0aGlzIGlzIHRoZSBmaXJzdCBpbnZhbGlkIGlucHV0XG4gICAgICAgICAgaWYgKGlucHV0WzBdID09PSBmaXJzdFswXSkge1xuICAgICAgICAgICAgICAvLyBoZWlnaHQgb2YgdGhlIG5hdiBiYXIgcGx1cyBzb21lIHBhZGRpbmcgaWYgdGhlcmUncyBhIGZpeGVkIG5hdlxuICAgICAgICAgICAgICAvL3ZhciBuYXZiYXJIZWlnaHQgPSBuYXZiYXIuaGVpZ2h0KCkgKyA1MFxuXG4gICAgICAgICAgICAgIC8vIHRoZSBwb3NpdGlvbiB0byBzY3JvbGwgdG8gKGFjY291bnRpbmcgZm9yIHRoZSBuYXZiYXIgaWYgaXQgZXhpc3RzKVxuICAgICAgICAgICAgICB2YXIgZWxlbWVudE9mZnNldCA9IGZpcnN0X2hvbGRlci5vZmZzZXQoKS50b3A7XG5cbiAgICAgICAgICAgICAgLy8gdGhlIGN1cnJlbnQgc2Nyb2xsIHBvc2l0aW9uIChhY2NvdW50aW5nIGZvciB0aGUgbmF2YmFyKVxuICAgICAgICAgICAgICB2YXIgcGFnZU9mZnNldCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcblxuICAgICAgICAgICAgICAvLyBkb24ndCBzY3JvbGwgaWYgdGhlIGVsZW1lbnQgaXMgYWxyZWFkeSBpbiB2aWV3XG4gICAgICAgICAgICAgIGlmICggZWxlbWVudE9mZnNldCA+IHBhZ2VPZmZzZXQgJiYgZWxlbWVudE9mZnNldCA8IHBhZ2VPZmZzZXQgKyB3aW5kb3cuaW5uZXJIZWlnaHQgKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIC8vIG5vdGU6IGF2b2lkIHVzaW5nIGFuaW1hdGUsIGFzIGl0IHByZXZlbnRzIHRoZSB2YWxpZGF0aW9uIG1lc3NhZ2UgZGlzcGxheWluZyBjb3JyZWN0bHlcbiAgICAgICAgICAgICAgJCggJ2h0bWwsIGJvZHknICkuc2Nyb2xsVG9wKCBlbGVtZW50T2Zmc2V0ICk7XG4gICAgICAgICAgfVxuICAgICAgfSApO1xuICAgIH0sIC8vIHNjcm9sbFRvRm9ybUVycm9yXG5cbiAgICB2YWxpZGF0ZUFuZFN1Ym1pdDogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuXG4gICAgICB2YXIgZm9ybXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubS1mb3JtJyk7XG4gICAgICBmb3Jtcy5mb3JFYWNoKCBmdW5jdGlvbiAoIGZvcm0gKSB7XG4gICAgICAgIFZhbGlkRm9ybSggZm9ybSwge1xuICAgICAgICAgIHZhbGlkYXRpb25FcnJvclBhcmVudENsYXNzOiAnbS1oYXMtdmFsaWRhdGlvbi1lcnJvcicsXG4gICAgICAgICAgdmFsaWRhdGlvbkVycm9yQ2xhc3M6ICdhLXZhbGlkYXRpb24tZXJyb3InLFxuICAgICAgICAgIGludmFsaWRDbGFzczogJ2EtZXJyb3InLFxuICAgICAgICAgIGVycm9yUGxhY2VtZW50OiAnYWZ0ZXInXG4gICAgICAgIH0gKVxuICAgICAgfSApO1xuXG4gICAgICB0aGlzLnNjcm9sbFRvRm9ybUVycm9yKCk7XG5cbiAgICAgIHZhciB0aGF0ID0gdGhpcztcblxuICAgICAgJChvcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5zdWJtaXQoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAvLyB2YWxpZGF0ZSBhbmQgc3VibWl0IHRoZSBmb3JtXG4gICAgICAgICQoJy5hLXZhbGlkYXRpb24tZXJyb3InKS5yZW1vdmUoKTtcbiAgICAgICAgJCgnaW5wdXQsIGxhYmVsLCBkaXYnLCBlbGVtZW50KS5yZW1vdmVDbGFzcygnYS1lcnJvcicpO1xuICAgICAgICAkKCdsYWJlbCcsIGVsZW1lbnQpLnJlbW92ZUNsYXNzKCdtLWhhcy12YWxpZGF0aW9uLWVycm9yJyk7XG4gICAgICAgICQodGhhdC5vcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yLCB0aGF0LmVsZW1lbnQpLnJlbW92ZUNsYXNzKCdhLWVycm9yIGludmFsaWQnKTtcbiAgICAgICAgJCgnLmEtdmFsaWRhdGlvbi1lcnJvcicpLnJlbW92ZSgpO1xuICAgICAgICB2YXIgdmFsaWQgPSB0cnVlO1xuICAgICAgICB2YXIgcGF5bWVudF90eXBlID0gJCgnaW5wdXRbbmFtZT1cInN0cmlwZV9wYXltZW50X3R5cGVcIl0nKS52YWwoKTtcbiAgICAgICAgJCh0aGF0Lm9wdGlvbnMuY2hvb3NlX3BheW1lbnQgKyAnIGlucHV0JykuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICQodGhhdC5vcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yICsgJyAuYS1lcnJvcicpLnJlbW92ZSgpOyAvLyByZW1vdmUgbWV0aG9kIGVycm9yIG1lc3NhZ2UgaWYgaXQgaXMgdGhlcmVcbiAgICAgICAgICAkKHRoYXQub3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvcikucGFyZW50KCkuZmluZCgnLmEtdmFsaWRhdGlvbi1lcnJvcicpLnJlbW92ZSgpO1xuICAgICAgICAgIC8vIGlmIGEgcGF5bWVudCBmaWVsZCBjaGFuZ2VkLCByZXNldCB0aGUgYnV0dG9uXG4gICAgICAgICAgdGhhdC5idXR0b25TdGF0dXMob3B0aW9ucywgJCh0aGF0Lm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLmZpbmQoJ2J1dHRvbicpLCBmYWxzZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChwYXltZW50X3R5cGUgPT09ICdiYW5rX2FjY291bnQnKSB7XG4gICAgICAgICAgaWYgKCQoJ2lucHV0W25hbWU9XCJiYW5rVG9rZW5cIl0nKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAkKHRoYXQub3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvcikucHJlcGVuZCgnPHAgY2xhc3M9XCJlcnJvclwiPllvdSBhcmUgcmVxdWlyZWQgdG8gZW50ZXIgY3JlZGl0IGNhcmQgaW5mb3JtYXRpb24sIG9yIHRvIGF1dGhvcml6ZSBNaW5uUG9zdCB0byBjaGFyZ2UgeW91ciBiYW5rIGFjY291bnQsIHRvIG1ha2UgYSBwYXltZW50LjwvcD4nKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsaWQgPT09IHRydWUpIHtcbiAgICAgICAgICAvLyAxLiBzZXQgdXAgdGhlIGJ1dHRvbiBhbmQgcmVtb3ZlIHRoZSBoaWRkZW4gZmllbGRzIHdlIGRvbid0IG5lZWRcbiAgICAgICAgICB0aGF0LmJ1dHRvblN0YXR1cyh0aGF0Lm9wdGlvbnMsICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKSwgdHJ1ZSk7XG4gICAgICAgICAgdmFyIGJpbGxpbmdEZXRhaWxzID0gdGhhdC5nZW5lcmF0ZUJpbGxpbmdEZXRhaWxzKCk7XG5cbiAgICAgICAgICAvLyAyLiBjcmVhdGUgbWlubnBvc3QgYWNjb3VudCBpZiBzcGVjaWZpZWRcbiAgICAgICAgICBpZiAodGhhdC5vcHRpb25zLmNyZWF0ZV9hY2NvdW50ID09PSB0cnVlKSB7XG4gICAgICAgICAgICB2YXIgdXNlciA9IHtcbiAgICAgICAgICAgICAgZW1haWw6ICQodGhhdC5vcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICAgICAgZmlyc3RfbmFtZTogJCh0aGF0Lm9wdGlvbnMuZmlyc3RfbmFtZV9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgICAgIGxhc3RfbmFtZTogJCh0aGF0Lm9wdGlvbnMubGFzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICAgICAgcGFzc3dvcmQ6ICQodGhhdC5vcHRpb25zLnBhc3N3b3JkX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICAgICAgY2l0eTogJCh0aGF0Lm9wdGlvbnMuYmlsbGluZ19jaXR5X2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICAgICAgc3RhdGU6ICQodGhhdC5vcHRpb25zLmJpbGxpbmdfc3RhdGVfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgICAgICB6aXA6ICQodGhhdC5vcHRpb25zLmJpbGxpbmdfemlwX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgdXJsOiB0aGF0Lm9wdGlvbnMubWlubnBvc3Rfcm9vdCArICcvd3AtanNvbi91c2VyLWFjY291bnQtbWFuYWdlbWVudC92MS9jcmVhdGUtdXNlcicsXG4gICAgICAgICAgICAgIGRhdGE6IHVzZXJcbiAgICAgICAgICAgIH0pLmRvbmUoZnVuY3Rpb24oIGRhdGEgKSB7XG4gICAgICAgICAgICAgIGlmIChkYXRhLnN0YXR1cyA9PT0gJ3N1Y2Nlc3MnICYmIGRhdGEucmVhc29uID09PSAnbmV3IHVzZXInKSB7XG4gICAgICAgICAgICAgICAgLy8gdXNlciBjcmVhdGVkIC0gdGhleSBzaG91bGQgcmVjZWl2ZSBlbWFpbFxuICAgICAgICAgICAgICAgIC8vIHN1Ym1pdCB0aGUgZm9ybVxuICAgICAgICAgICAgICAgIC8vc3VwcG9ydGZvcm0uZ2V0KDApLnN1Ym1pdCgpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIHVzZXIgbm90IGNyZWF0ZWRcbiAgICAgICAgICAgICAgICAvLyBzdGlsbCBzdWJtaXQgdGhlIGZvcm1cbiAgICAgICAgICAgICAgICAvL3N1cHBvcnRmb3JtLmdldCgwKS5zdWJtaXQoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCQoJ2lucHV0W25hbWU9XCJiYW5rVG9rZW5cIl0nKS5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgLy8gZmluYWxseSwgZ2V0IGEgcGF5bWVudCBtZXRob2QgZnJvbSBzdHJpcGUsIGFuZCB0cnkgdG8gY2hhcmdlIGl0IGlmIGl0IGlzIG5vdCBhY2hcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlUGF5bWVudE1ldGhvZCh0aGF0LmNhcmROdW1iZXJFbGVtZW50LCBiaWxsaW5nRGV0YWlscyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGlmIGl0IGlzIGFjaCwgd2UgYWxyZWFkeSBoYXZlIGEgdG9rZW4gc28gc3VibWl0IHRoZSBmb3JtXG4gICAgICAgICAgICAvLyB0b2RvOiB1cGdyYWRlIHRoZSBwbGFpZCBpbnRlZ3JhdGlvblxuICAgICAgICAgICAgdGhhdC5iYW5rVG9rZW5IYW5kbGVyKCAkKCdpbnB1dFtuYW1lPVwiYmFua1Rva2VuXCJdJykudmFsKCksICdiYW5rX2FjY291bnQnICk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIHRoaXMgbWVhbnMgdmFsaWQgaXMgZmFsc2VcbiAgICAgICAgICB0aGF0LmJ1dHRvblN0YXR1cyh0aGF0Lm9wdGlvbnMsICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKSwgZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgIH0pO1xuICAgIH0sIC8vIHZhbGlkYXRlQW5kU3VibWl0XG5cbiAgICBzdHJpcGVFcnJvckRpc3BsYXk6IGZ1bmN0aW9uKGVycm9yLCB0aGlzX3NlbGVjdG9yLCBlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICAvLyBsaXN0ZW4gZm9yIGVycm9ycyBhbmQgZGlzcGxheS9oaWRlIGVycm9yIG1lc3NhZ2VzXG4gICAgICB2YXIgd2hpY2hfZXJyb3IgPSB0aGlzX3NlbGVjdG9yLmF0dHIoJ2lkJyk7XG4gICAgICAvLyB3aGVuIHRoaXMgZmllbGQgY2hhbmdlcywgcmVzZXQgaXRzIGVycm9yc1xuICAgICAgJCgnLmEtY2FyZC1pbnN0cnVjdGlvbi4nICsgd2hpY2hfZXJyb3IpLnJlbW92ZUNsYXNzKCdhLXZhbGlkYXRpb24tZXJyb3InKTtcbiAgICAgICQoJy5hLWNhcmQtaW5zdHJ1Y3Rpb24uJyArIHdoaWNoX2Vycm9yKS5lbXB0eSgpO1xuICAgICAgJCh0aGlzX3NlbGVjdG9yKS5yZW1vdmVDbGFzcygnYS1lcnJvcicpO1xuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICQoJy5hLWNhcmQtaW5zdHJ1Y3Rpb24uJyArIHdoaWNoX2Vycm9yKS50ZXh0KGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICAkKCcuYS1jYXJkLWluc3RydWN0aW9uLicgKyB3aGljaF9lcnJvcikuYWRkQ2xhc3MoJ2EtdmFsaWRhdGlvbi1lcnJvcicpO1xuICAgICAgICB0aGlzX3NlbGVjdG9yLnBhcmVudCgpLmFkZENsYXNzKCdtLWhhcy12YWxpZGF0aW9uLWVycm9yJyk7XG4gICAgICAgICQodGhpc19zZWxlY3RvcikuYWRkQ2xhc3MoJ2EtZXJyb3InKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQodGhpc19zZWxlY3RvcikucmVtb3ZlQ2xhc3MoJ2EtZXJyb3InKTtcbiAgICAgICAgJCgnLmEtY2FyZC1pbnN0cnVjdGlvbi4nICsgd2hpY2hfZXJyb3IpLnJlbW92ZUNsYXNzKCdhLXZhbGlkYXRpb24tZXJyb3InKTtcbiAgICAgICAgJCgnLmEtY2FyZC1pbnN0cnVjdGlvbi4nICsgd2hpY2hfZXJyb3IpLmVtcHR5KCk7XG4gICAgICAgICQob3B0aW9ucy5jY19udW1fc2VsZWN0b3IsIGVsZW1lbnQpLnJlbW92ZUNsYXNzKCdhLXZhbGlkYXRpb24tZXJyb3InKTtcbiAgICAgICAgJChvcHRpb25zLmNjX2V4cF9zZWxlY3RvciwgZWxlbWVudCkucmVtb3ZlQ2xhc3MoJ2EtdmFsaWRhdGlvbi1lcnJvcicpO1xuICAgICAgICAkKG9wdGlvbnMuY2NfY3ZjX3NlbGVjdG9yLCBlbGVtZW50KS5yZW1vdmVDbGFzcygnYS12YWxpZGF0aW9uLWVycm9yJyk7XG4gICAgICAgICQob3B0aW9ucy5jY19udW1fc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdtLWhhcy12YWxpZGF0aW9uLWVycm9yJyk7XG4gICAgICAgICQob3B0aW9ucy5jY19leHBfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdtLWhhcy12YWxpZGF0aW9uLWVycm9yJyk7XG4gICAgICAgICQob3B0aW9ucy5jY19jdmNfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdtLWhhcy12YWxpZGF0aW9uLWVycm9yJyk7XG4gICAgICB9XG4gICAgfSwgLy8gc3RyaXBlRXJyb3JEaXNwbGF5XG5cbiAgICBnZW5lcmF0ZUJpbGxpbmdEZXRhaWxzOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBiaWxsaW5nRGV0YWlscyA9IHt9O1xuICAgICAgdmFyIGFkZHJlc3NEZXRhaWxzID0ge307XG5cbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvcikudmFsKCkgIT0gJycpIHtcbiAgICAgICAgYmlsbGluZ0RldGFpbHMuZW1haWwgPSAkKHRoaXMub3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvcikudmFsKCk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIHZhciBmdWxsX25hbWUgPSAnJztcbiAgICAgIGlmICgkKCcjZnVsbF9uYW1lJykubGVuZ3RoID4gMCkge1xuICAgICAgICBmdWxsX25hbWUgPSAkKCcjZnVsbF9uYW1lJykudmFsKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmdWxsX25hbWUgPSAkKHRoaXMub3B0aW9ucy5maXJzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yKS52YWwoKSArICcgJyArICQodGhpcy5vcHRpb25zLmxhc3RfbmFtZV9maWVsZF9zZWxlY3RvcikudmFsKCk7XG4gICAgICB9XG4gICAgICBiaWxsaW5nRGV0YWlscy5uYW1lID0gZnVsbF9uYW1lO1xuXG4gICAgICB2YXIgc3RyZWV0ID0gJ05vbmUnO1xuICAgICAgaWYgKCQoJ2lucHV0W25hbWU9XCJmdWxsX2FkZHJlc3NcIl0nKS52YWwoKSAhPSAnJykge1xuICAgICAgICBzdHJlZXQgPSAkKCcjZnVsbF9hZGRyZXNzJykudmFsKCk7XG4gICAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5iaWxsaW5nX3N0cmVldF9maWVsZF9zZWxlY3RvcikudmFsKCkgIT0gJycpIHtcbiAgICAgICAgICBzdHJlZXQgPSAkKHRoaXMub3B0aW9ucy5iaWxsaW5nX3N0cmVldF9maWVsZF9zZWxlY3RvcikudmFsKCk7XG4gICAgICAgIH1cbiAgICAgICAgYWRkcmVzc0RldGFpbHMubGluZTEgPSBzdHJlZXQ7XG4gICAgICB9XG5cbiAgICAgIHZhciBjaXR5ID0gJ05vbmUnO1xuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmFjY291bnRfY2l0eV9zZWxlY3RvcikudmFsKCkgIT0gJycpIHtcbiAgICAgICAgY2l0eSA9ICQodGhpcy5vcHRpb25zLmFjY291bnRfY2l0eV9zZWxlY3RvcikudmFsKCk7XG4gICAgICAgIGFkZHJlc3NEZXRhaWxzLmNpdHkgPSBjaXR5O1xuICAgICAgfVxuXG4gICAgICB2YXIgc3RhdGUgPSAnTm9uZSc7XG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuYWNjb3VudF9zdGF0ZV9zZWxlY3RvcikudmFsKCkgIT0gJycpIHtcbiAgICAgICAgc3RhdGUgPSAkKHRoaXMub3B0aW9ucy5hY2NvdW50X3N0YXRlX3NlbGVjdG9yKS52YWwoKTtcbiAgICAgICAgYWRkcmVzc0RldGFpbHMuc3RhdGUgPSBzdGF0ZTtcbiAgICAgIH1cblxuICAgICAgdmFyIHppcCA9ICdOb25lJztcbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5hY2NvdW50X3ppcF9zZWxlY3RvcikudmFsKCkgIT0gJycpIHtcbiAgICAgICAgemlwID0gJCh0aGlzLm9wdGlvbnMuYWNjb3VudF96aXBfc2VsZWN0b3IpLnZhbCgpO1xuICAgICAgICBhZGRyZXNzRGV0YWlscy5wb3N0YWxfY29kZSA9IHppcDtcbiAgICAgIH1cblxuICAgICAgdmFyIGNvdW50cnkgPSAnVVMnO1xuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmJpbGxpbmdfY291bnRyeV9maWVsZF9zZWxlY3RvcikudmFsKCkgIT0gJycpIHtcbiAgICAgICAgY291bnRyeSA9ICQodGhpcy5vcHRpb25zLmJpbGxpbmdfY291bnRyeV9maWVsZF9zZWxlY3RvcikudmFsKCk7XG4gICAgICB9XG4gICAgICBhZGRyZXNzRGV0YWlscy5jb3VudHJ5ID0gY291bnRyeTtcblxuICAgICAgaWYgKHN0cmVldCAhPT0gJ05vbmUnIHx8IGNpdHkgIT09ICdOb25lJyB8fCBzdGF0ZSAhPT0gJ05vbmUnIHx8IHppcCAhPT0gJ05vbmUnKSB7XG4gICAgICAgIGJpbGxpbmdEZXRhaWxzLmFkZHJlc3MgPSBhZGRyZXNzRGV0YWlscztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGJpbGxpbmdEZXRhaWxzO1xuICAgIH0sIC8vIGdlbmVyYXRlQmlsbGluZ0RldGFpbHNcblxuICAgIGNyZWF0ZVBheW1lbnRNZXRob2Q6IGZ1bmN0aW9uKGNhcmRFbGVtZW50LCBiaWxsaW5nRGV0YWlscykge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdGhhdC5zdHJpcGUuY3JlYXRlUGF5bWVudE1ldGhvZCh7XG4gICAgICAgIHR5cGU6ICdjYXJkJyxcbiAgICAgICAgY2FyZDogY2FyZEVsZW1lbnQsXG4gICAgICAgIGJpbGxpbmdfZGV0YWlsczogYmlsbGluZ0RldGFpbHNcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKHJlc3BvbnNlLmVycm9yKSB7XG4gICAgICAgICAgdGhhdC5oYW5kbGVTZXJ2ZXJFcnJvcihyZXNwb25zZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gU2VuZCBwYXltZW50TWV0aG9kLmlkIHRvIHNlcnZlclxuICAgICAgICAgIHZhciBzdXBwb3J0Zm9ybSA9ICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKTtcbiAgICAgICAgICB2YXIgYWpheF91cmwgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG4gICAgICAgICAgdmFyIHRva2VuRmllbGROYW1lID0gJ3BheW1lbnRfbWV0aG9kX2lkJztcbiAgICAgICAgICB2YXIgdG9rZW5GaWVsZCA9ICdpbnB1dFtuYW1lPVwiJyArIHRva2VuRmllbGROYW1lICsgJ1wiXSc7XG5cbiAgICAgICAgICAvLyBJbnNlcnQgdGhlIHBheW1lbnQgbWV0aG9kIElEIGludG8gdGhlIGZvcm0gc28gaXQgZ2V0cyBzdWJtaXR0ZWQgdG8gdGhlIHNlcnZlclxuICAgICAgICAgIGlmICgkKHRva2VuRmllbGQpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICQodG9rZW5GaWVsZCkudmFsKHJlc3BvbnNlLnBheW1lbnRNZXRob2QuaWQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdXBwb3J0Zm9ybS5hcHBlbmQoJCgnPGlucHV0IHR5cGU9XFxcImhpZGRlblxcXCIgbmFtZT1cIicgKyB0b2tlbkZpZWxkTmFtZSArICdcIj4nKS52YWwocmVzcG9uc2UucGF5bWVudE1ldGhvZC5pZCkpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGZldGNoKGFqYXhfdXJsLCB7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYm9keTogJChzdXBwb3J0Zm9ybSkuc2VyaWFsaXplKClcbiAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAvLyBIYW5kbGUgc2VydmVyIHJlc3BvbnNlIChzZWUgU3RlcCAzKVxuICAgICAgICAgICAgcmVzcG9uc2UuanNvbigpLnRoZW4oZnVuY3Rpb24oanNvbikge1xuICAgICAgICAgICAgICB0aGF0LmhhbmRsZVNlcnZlclJlc3BvbnNlKGpzb24pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSwgLy8gY3JlYXRlUGF5bWVudE1ldGhvZFxuXG4gICAgYmFua1Rva2VuSGFuZGxlcjogZnVuY3Rpb24odG9rZW4sIHR5cGUpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHZhciBzdXBwb3J0Zm9ybSA9ICQodGhpcy5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKTtcbiAgICAgIHZhciBhamF4X3VybCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcblxuICAgICAgdGhhdC5zZXRTdHJpcGVQYXltZW50VHlwZSh0eXBlKTtcblxuICAgICAgLy8gU3VibWl0IHRoZSBmb3JtXG4gICAgICAvLyB0aGUgd2F5IGl0IHdvcmtzIGN1cnJlbnRseSBpcyB0aGUgZm9ybSBzdWJtaXRzIGFuIGFqYXggcmVxdWVzdCB0byBpdHNlbGZcbiAgICAgIC8vIHRoZW4gaXQgc3VibWl0cyBhIHBvc3QgcmVxdWVzdCB0byB0aGUgZm9ybSdzIGFjdGlvbiB1cmxcbiAgICAgICQuYWpheCh7XG4gICAgICAgIHVybDogYWpheF91cmwsXG4gICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgZGF0YTogJChzdXBwb3J0Zm9ybSkuc2VyaWFsaXplKCksXG4gICAgICAgIHR5cGU6ICdQT1NUJ1xuICAgICAgfSlcbiAgICAgIC5kb25lKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVzcG9uc2UuZXJyb3JzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIHRoYXQuaGFuZGxlU2VydmVyRXJyb3IocmVzcG9uc2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN1cHBvcnRmb3JtLmdldCgwKS5zdWJtaXQoKTsgLy8gY29udGludWUgc3VibWl0dGluZyB0aGUgZm9ybSBpZiB0aGUgYWpheCB3YXMgc3VjY2Vzc2Z1bFxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLmVycm9yKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgIHRoYXQuYnV0dG9uU3RhdHVzKHRoYXQub3B0aW9ucywgJCh0aGF0Lm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLmZpbmQoJ2J1dHRvbicpLCBmYWxzZSk7XG4gICAgICB9KTtcbiAgICB9LCAvLyBiYW5rVG9rZW5IYW5kbGVyXG5cbiAgICBwYXltZW50UmVxdWVzdEhhbmRsZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdmFyIHN1cHBvcnRmb3JtID0gJCh0aGlzLm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpO1xuICAgICAgdmFyIGFqYXhfdXJsID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xuXG4gICAgICAvLyB3ZSBzaG91bGQgZG8gc29tZSBvZiB0aGUgdmFsaWRhdGlvbiBzdHVmZiBoZXJlIHRvbyB0aG91Z2guXG5cbiAgICAgIC8vIFN1Ym1pdCB0aGUgZm9ybVxuICAgICAgLy8gdGhlIHdheSBpdCB3b3JrcyBjdXJyZW50bHkgaXMgdGhlIGZvcm0gc3VibWl0cyBhbiBhamF4IHJlcXVlc3QgdG8gaXRzZWxmXG4gICAgICAvLyB0aGVuIGl0IHN1Ym1pdHMgYSBwb3N0IHJlcXVlc3QgdG8gdGhlIGZvcm0ncyBhY3Rpb24gdXJsXG4gICAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IGFqYXhfdXJsLFxuICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgIGRhdGE6ICQoc3VwcG9ydGZvcm0pLnNlcmlhbGl6ZSgpLFxuICAgICAgICB0eXBlOiAnUE9TVCdcbiAgICAgIH0pXG4gICAgICAuZG9uZShmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICBpZiAodHlwZW9mIHJlc3BvbnNlLmVycm9ycyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICB0aGF0LmhhbmRsZVNlcnZlckVycm9yKHJlc3BvbnNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdXBwb3J0Zm9ybS5nZXQoMCkuc3VibWl0KCk7IC8vIGNvbnRpbnVlIHN1Ym1pdHRpbmcgdGhlIGZvcm0gaWYgdGhlIGFqYXggd2FzIHN1Y2Nlc3NmdWxcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5lcnJvcihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICB0aGF0LmJ1dHRvblN0YXR1cyh0aGF0Lm9wdGlvbnMsICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKSwgZmFsc2UpO1xuICAgICAgfSk7XG4gICAgfSwgLy8gcGF5bWVudFJlcXVlc3RIYW5kbGVyXG5cbiAgICBoYW5kbGVTZXJ2ZXJSZXNwb25zZTogZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgIHZhciBzdXBwb3J0Zm9ybSA9ICQodGhpcy5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKTtcbiAgICAgIGlmIChyZXNwb25zZS5lcnJvcnMpIHtcbiAgICAgICAgLy8gU2hvdyBlcnJvciBmcm9tIHNlcnZlciBvbiBwYXltZW50IGZvcm1cbiAgICAgICAgdGhpcy5oYW5kbGVTZXJ2ZXJFcnJvcihyZXNwb25zZSk7XG4gICAgICB9IGVsc2UgaWYgKHJlc3BvbnNlLnJlcXVpcmVzX2FjdGlvbikge1xuICAgICAgICAvLyBVc2UgU3RyaXBlLmpzIHRvIGhhbmRsZSByZXF1aXJlZCBjYXJkIGFjdGlvblxuICAgICAgICAvL2hhbmRsZUFjdGlvbihyZXNwb25zZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdXBwb3J0Zm9ybS5nZXQoMCkuc3VibWl0KCk7IC8vIGNvbnRpbnVlIHN1Ym1pdHRpbmcgdGhlIGZvcm0gaWYgdGhlIGFqYXggd2FzIHN1Y2Nlc3NmdWxcbiAgICAgIH1cbiAgICB9LCAvLyBoYW5kbGVTZXJ2ZXJSZXNwb25zZVxuXG4gICAgaGFuZGxlU2VydmVyRXJyb3I6IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB2YXIgdGhpc19maWVsZCA9ICcnO1xuICAgICAgLy8gZG8gbm90IHN1Ym1pdC4gdGhlcmUgaXMgYW4gZXJyb3IuXG4gICAgICB0aGF0LmJ1dHRvblN0YXR1cyh0aGF0Lm9wdGlvbnMsICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKSwgZmFsc2UpO1xuICAgICAgLy8gaGFuZGxlIGVycm9yIGRpc3BsYXlcbiAgICAgIGlmICh0eXBlb2YgcmVzcG9uc2UuZXJyb3JzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBpZiAodHlwZW9mIHJlc3BvbnNlLmVycm9yc1swXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICB0aGlzX2ZpZWxkID0gcmVzcG9uc2UuZXJyb3JzWzBdLmZpZWxkICsgJ19maWVsZF9zZWxlY3Rvcic7XG4gICAgICAgIH1cbiAgICAgICAgJC5lYWNoKHJlc3BvbnNlLmVycm9ycywgZnVuY3Rpb24oIGluZGV4LCBlcnJvciApIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGVycm9yLmZpZWxkICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdGhpc19maWVsZCA9IGVycm9yLmZpZWxkICsgJ19maWVsZF9zZWxlY3Rvcic7XG4gICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZXJyb3IucGFyYW0gIT09ICd1bmRlZmluZWQnICYmIGVycm9yLnBhcmFtICE9PSAnJykge1xuICAgICAgICAgICAgdGhpc19maWVsZCA9ICdjY18nICsgZXJyb3IucGFyYW0gKyAnX3NlbGVjdG9yJzsgIFxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGF0LmRpc3BsYXlFcnJvck1lc3NhZ2UoZXJyb3IsIHRoaXNfZmllbGQpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGlmICgkKHRoYXQub3B0aW9uc1t0aGlzX2ZpZWxkXSkubGVuZ3RoID4gMCkge1xuICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgc2Nyb2xsVG9wOiAkKHRoYXQub3B0aW9uc1t0aGlzX2ZpZWxkXSkucGFyZW50KCkub2Zmc2V0KCkudG9wXG4gICAgICAgIH0sIDIwMDApO1xuICAgICAgfVxuICAgIH0sIC8vIGhhbmRsZVNlcnZlckVycm9yXG5cbiAgICBkaXNwbGF5RXJyb3JNZXNzYWdlKGVycm9yLCBmaWVsZCkge1xuICAgICAgdmFyIG1lc3NhZ2UgPSAnJztcbiAgICAgIHZhciBzdHJpcGVFcnJvclNlbGVjdG9yID0gJyc7XG4gICAgICB2YXIgZmllbGRQYXJlbnQgPSAkKHRoaXMub3B0aW9uc1tmaWVsZF0pLnBhcmVudCgpO1xuICAgICAgaWYgKHR5cGVvZiBlcnJvci5tZXNzYWdlID09PSAnc3RyaW5nJykge1xuICAgICAgICBtZXNzYWdlID0gZXJyb3IubWVzc2FnZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlWzBdO1xuICAgICAgfVxuICAgICAgaWYgKCQodGhpcy5vcHRpb25zW2ZpZWxkXSkubGVuZ3RoID4gMCkge1xuICAgICAgICAkKHRoaXMub3B0aW9uc1tmaWVsZF0pLmFkZENsYXNzKCdhLWVycm9yJyk7XG4gICAgICAgICQodGhpcy5vcHRpb25zW2ZpZWxkXSkucHJldigpLmFkZENsYXNzKCdhLWVycm9yJyk7XG4gICAgICAgIGlmICgkKCcuYS1jYXJkLWluc3RydWN0aW9uJywgZmllbGRQYXJlbnQpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAkKCcuYS1jYXJkLWluc3RydWN0aW9uJywgZmllbGRQYXJlbnQpLmFkZENsYXNzKCdhLXZhbGlkYXRpb24tZXJyb3InKTtcbiAgICAgICAgICAkKCcuYS1jYXJkLWluc3RydWN0aW9uJywgZmllbGRQYXJlbnQpLnRleHQobWVzc2FnZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJCh0aGlzLm9wdGlvbnNbZmllbGRdKS5hZnRlcignPHAgY2xhc3M9XCJhLWNhcmQtaW5zdHJ1Y3Rpb24gYS12YWxpZGF0aW9uLWVycm9yXCI+JyArIG1lc3NhZ2UgKyAnPC9wPicpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBlcnJvciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhpcy5idXR0b25TdGF0dXModGhpcy5vcHRpb25zLCAkKHRoaXMub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIGZhbHNlKTtcbiAgICAgICAgaWYgKGVycm9yLmNvZGUgPT09ICdpbmNvbXBsZXRlX251bWJlcicgfHwgZXJyb3IuY29kZSA9PSAnaW52YWxpZF9udW1iZXInIHx8IGVycm9yLmNvZGUgPT0gJ2luY29ycmVjdF9udW1iZXInIHx8IGVycm9yLmNvZGUgPT0gJ2NhcmRfZGVjbGluZWQnIHx8IGVycm9yLmNvZGUgPT0gJ3Byb2Nlc3NpbmdfZXJyb3InKSB7XG4gICAgICAgICAgLy8gZXJyb3IgaGFuZGxpbmdcbiAgICAgICAgICBzdHJpcGVFcnJvclNlbGVjdG9yID0gJCh0aGlzLm9wdGlvbnMuY2NfbnVtX3NlbGVjdG9yKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXJyb3IuY29kZSA9PSAnaW52YWxpZF9leHBpcnlfbW9udGgnIHx8IGVycm9yLmNvZGUgPT0gJ2ludmFsaWRfZXhwaXJ5X3llYXInIHx8IGVycm9yLmNvZGUgPT0gJ2V4cGlyZWRfY2FyZCcpIHtcbiAgICAgICAgICAvLyBlcnJvciBoYW5kbGluZ1xuICAgICAgICAgIHN0cmlwZUVycm9yU2VsZWN0b3IgPSAkKHRoaXMub3B0aW9ucy5jY19leHBfc2VsZWN0b3IpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJvci5jb2RlID09ICdpbnZhbGlkX2N2YycgfHwgZXJyb3IuY29kZSA9PSAnaW5jb3JyZWN0X2N2YycpIHtcbiAgICAgICAgICAvLyBlcnJvciBoYW5kbGluZ1xuICAgICAgICAgIHN0cmlwZUVycm9yU2VsZWN0b3IgPSAkKHRoaXMub3B0aW9ucy5jY19jdmNfc2VsZWN0b3IpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdHJpcGVFcnJvclNlbGVjdG9yICE9PSAnJykge1xuICAgICAgICAgIHRoaXMuc3RyaXBlRXJyb3JEaXNwbGF5KGVycm9yLCBzdHJpcGVFcnJvclNlbGVjdG9yLCB0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJvci5maWVsZCA9PSAncmVjYXB0Y2hhJykge1xuICAgICAgICAgICQodGhpcy5vcHRpb25zLnBheV9idXR0b25fc2VsZWN0b3IpLmJlZm9yZSgnPHAgY2xhc3M9XCJhLWZvcm0tY2FwdGlvbiBhLXZhbGlkYXRpb24tZXJyb3IgYS1yZWNhcHRjaGEtZXJyb3JcIj4nICsgbWVzc2FnZSArICc8L3A+JylcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXJyb3IudHlwZSA9PSAnaW52YWxpZF9yZXF1ZXN0X2Vycm9yJykge1xuICAgICAgICAgICQodGhpcy5vcHRpb25zLnBheV9idXR0b25fc2VsZWN0b3IpLmJlZm9yZSgnPHAgY2xhc3M9XCJhLWZvcm0tY2FwdGlvbiBhLXZhbGlkYXRpb24tZXJyb3JcIj4nICsgZXJyb3IubWVzc2FnZSArICc8L3A+JylcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIC8vIGRpc3BsYXlFcnJvck1lc3NhZ2VcblxuICAgIHNob3dOZXdzbGV0dGVyU2V0dGluZ3M6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcblxuICAgICAgdmFyIG5ld3NsZXR0ZXJfZ3JvdXBfaHRtbCA9ICcnO1xuICAgICAgaWYgKCQob3B0aW9ucy5uZXdzbGV0dGVyX2dyb3VwX3NlbGVjdG9yKS5sZW5ndGggPiAwICkge1xuICAgICAgICB2YXIgZ2V0X2RhdGEgPSB7XG4gICAgICAgICAgc2hvcnRjb2RlOiAnbmV3c2xldHRlcl9mb3JtJyxcbiAgICAgICAgICBwbGFjZW1lbnQ6ICd1c2VyYWNjb3VudCdcbiAgICAgICAgfTtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgIHVybDogb3B0aW9ucy5taW5ucG9zdF9yb290ICsgJy93cC1qc29uL21pbm5wb3N0LWFwaS92Mi9tYWlsY2hpbXAvZm9ybScsXG4gICAgICAgICAgZGF0YTogZ2V0X2RhdGFcbiAgICAgICAgfSkuZG9uZShmdW5jdGlvbiggcmVzdWx0ICkge1xuICAgICAgICAgIGlmICggdHlwZW9mIHJlc3VsdC5ncm91cF9maWVsZHMgIT09ICd1bmRlZmluZWQnICkge1xuICAgICAgICAgICAgJC5lYWNoKHJlc3VsdC5ncm91cF9maWVsZHMsIGZ1bmN0aW9uKCBpbmRleCwgY2F0ZWdvcnkgKSB7XG4gICAgICAgICAgICAgIG5ld3NsZXR0ZXJfZ3JvdXBfaHRtbCArPSAnPGZpZWxkc2V0IGNsYXNzPVwibS1mb3JtLWl0ZW0gc3VwcG9ydC1uZXdzbGV0dGVyIG0tZm9ybS1pdGVtLScgKyBjYXRlZ29yeS50eXBlICsgJ1wiPic7XG4gICAgICAgICAgICAgIG5ld3NsZXR0ZXJfZ3JvdXBfaHRtbCArPSAnPGxhYmVsPicgKyBjYXRlZ29yeS5uYW1lICsgJzo8L2xhYmVsPic7XG4gICAgICAgICAgICAgIGlmICggY2F0ZWdvcnkuY29udGFpbnMubGVuZ3RoID4gMCApIHtcbiAgICAgICAgICAgICAgICBuZXdzbGV0dGVyX2dyb3VwX2h0bWwgKz0gJzxkaXYgY2xhc3M9XCJtLWZvcm0taXRlbSBtLWZvcm0taXRlbS1uZXdzbGV0dGVyXCI+JztcbiAgICAgICAgICAgICAgICAkLmVhY2goY2F0ZWdvcnlbY2F0ZWdvcnkuY29udGFpbnNdLCBmdW5jdGlvbiggaW5kZXgsIGl0ZW0gKSB7XG4gICAgICAgICAgICAgICAgICBuZXdzbGV0dGVyX2dyb3VwX2h0bWwgKz0gJzxsYWJlbD48aW5wdXQgbmFtZT1cImdyb3Vwc19zdWJtaXR0ZWRcIiB0eXBlPVwiY2hlY2tib3hcIiB2YWx1ZT1cIicgKyBpdGVtLmlkICsgJ1wiPicgKyBpdGVtLm5hbWUgKyAnPC9sYWJlbD4nO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIG5ld3NsZXR0ZXJfZ3JvdXBfaHRtbCArPSAnPC9kaXY+JztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBuZXdzbGV0dGVyX2dyb3VwX2h0bWwgKz0gJzwvZmllbGRzZXQ+JztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJChvcHRpb25zLm5ld3NsZXR0ZXJfZ3JvdXBfc2VsZWN0b3IpLmh0bWwobmV3c2xldHRlcl9ncm91cF9odG1sKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoJChvcHRpb25zLm5ld3NsZXR0ZXJfZ3JvdXBfc2VsZWN0b3IpLmxlbmd0aCA+IDAgJiYgdHlwZW9mICQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHZhciBnZXRfZGF0YSA9IHtcbiAgICAgICAgICBlbWFpbDogJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKVxuICAgICAgICB9O1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgdXJsOiBvcHRpb25zLm1pbm5wb3N0X3Jvb3QgKyAnL3dwLWpzb24vbWlubnBvc3QtYXBpL3YyL21haWxjaGltcC91c2VyJyxcbiAgICAgICAgICBkYXRhOiBnZXRfZGF0YVxuICAgICAgICB9KS5kb25lKGZ1bmN0aW9uKCByZXN1bHQgKSB7XG4gICAgICAgICAgaWYgKCB0eXBlb2YgcmVzdWx0Lm1haWxjaGltcF9zdGF0dXMgIT09ICd1bmRlZmluZWQnICkge1xuICAgICAgICAgICAgJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5hZnRlcignPGlucHV0IG5hbWU9XCJtYWlsY2hpbXBfc3RhdHVzXCIgdHlwZT1cImhpZGRlblwiIHZhbHVlPVwiJyArIHJlc3VsdC5tYWlsY2hpbXBfc3RhdHVzICsgJ1wiPicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIHR5cGVvZiByZXN1bHQubWFpbGNoaW1wX3VzZXJfaWQgIT09ICd1bmRlZmluZWQnICkge1xuICAgICAgICAgICAgJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5hZnRlcignPGlucHV0IG5hbWU9XCJtYWlsY2hpbXBfdXNlcl9pZFwiIHR5cGU9XCJoaWRkZW5cIiB2YWx1ZT1cIicgKyByZXN1bHQubWFpbGNoaW1wX3VzZXJfaWQgKyAnXCI+Jyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChyZXN1bHQubWFpbGNoaW1wX3N0YXR1cyA9PT0gJ3N1YnNjcmliZWQnKSB7XG4gICAgICAgICAgICAvLyB1c2VyIGNyZWF0ZWQgLSBzaG93IGEgc3VjY2VzcyBtZXNzYWdlXG4gICAgICAgICAgICAkKCcuYS1jb25maXJtLWluc3RydWN0aW9ucycpLnRleHQoJCgnLmEtY29uZmlybS1pbnN0cnVjdGlvbnMnKS5hdHRyKCdkYXRhLWtub3duLXVzZXInKSk7XG4gICAgICAgICAgICB2YXIgZ3JvdXBzID0gcmVzdWx0Lmdyb3VwcztcbiAgICAgICAgICAgICQuZWFjaChncm91cHMsIGZ1bmN0aW9uKCBpbmRleCwgdmFsdWUgKSB7XG4gICAgICAgICAgICAgIGlmICggdmFsdWUgPT09IHRydWUgKSB7XG4gICAgICAgICAgICAgICAgJCgnOmNoZWNrYm94W3ZhbHVlPVwiJyArIGluZGV4ICsgJ1wiXScpLnByb3AoJ2NoZWNrZWQnLHRydWUpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQoJzpjaGVja2JveFt2YWx1ZT1cIicgKyBpbmRleCArICdcIl0nKS5wcm9wKCdjaGVja2VkJyxmYWxzZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICB9LCAvLyBzaG93TmV3c2xldHRlclNldHRpbmdzXG5cbiAgICBjb25maXJtTWVzc2FnZVN1Ym1pdDogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuXG4gICAgICB2YXIgZXhpc3RpbmdfbmV3c2xldHRlcl9zZXR0aW5ncyA9ICQob3B0aW9ucy5uZXdzbGV0dGVyX2dyb3VwX3NlbGVjdG9yICsgJyBpbnB1dCcpLnNlcmlhbGl6ZSgpO1xuICAgICAgLy90aGlzLmRlYnVnKGV4aXN0aW5nX25ld3NsZXR0ZXJfc2V0dGluZ3MpO1xuXG4gICAgICAkKG9wdGlvbnMuY29uZmlybV9mb3JtX3NlbGVjdG9yKS5zdWJtaXQoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB2YXIgY29uZmlybWZvcm0gPSAkKG9wdGlvbnMuY29uZmlybV9mb3JtX3NlbGVjdG9yKTtcbiAgICAgICAgLy8gc3VibWl0IHNldHRpbmdzIHRvIG1haWxjaGltcFxuICAgICAgICAvLyBuZWVkIHRvIGdldCB1c2VyIGluZm8gb24gYSBoaWRkZW4gZmllbGQgaGVyZVxuXG4gICAgICAgIHZhciBuZXdzbGV0dGVyX2dyb3VwcyA9ICQob3B0aW9ucy5uZXdzbGV0dGVyX2dyb3VwX3NlbGVjdG9yICsgJyBpbnB1dDpjaGVja2VkJyk7XG4gICAgICAgIHZhciBuZXdfbmV3c2xldHRlcl9zZXR0aW5ncyA9IG5ld3NsZXR0ZXJfZ3JvdXBzLnNlcmlhbGl6ZSgpO1xuXG4gICAgICAgIGlmICgoZXhpc3RpbmdfbmV3c2xldHRlcl9zZXR0aW5ncyAhPT0gbmV3X25ld3NsZXR0ZXJfc2V0dGluZ3MpICYmICh0eXBlb2YgbmV3c2xldHRlcl9ncm91cHMgIT09ICd1bmRlZmluZWQnKSkge1xuICAgICAgICAgIC8vYWRkIG91ciBvd24gYWpheCBjaGVjayBhcyBYLVJlcXVlc3RlZC1XaXRoIGlzIG5vdCBhbHdheXMgcmVsaWFibGVcbiAgICAgICAgICAvL2FqYXhfZm9ybV9kYXRhID0gbmV3X25ld3NsZXR0ZXJfc2V0dGluZ3MgKyAnJmFqYXhyZXF1ZXN0PXRydWUmc3Vic2NyaWJlJztcblxuICAgICAgICAgIHZhciBwb3N0X2RhdGEgPSB7XG4gICAgICAgICAgICBlbWFpbDogJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICAgIGZpcnN0X25hbWU6ICQob3B0aW9ucy5maXJzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICAgIGxhc3RfbmFtZTogJChvcHRpb25zLmxhc3RfbmFtZV9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgICBncm91cHNfc3VibWl0dGVkOiB7fVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICBwb3N0X2RhdGEuZ3JvdXBzX2F2YWlsYWJsZSA9ICdhbGwnO1xuXG4gICAgICAgICAgaWYgKCAkKCdpbnB1dFtuYW1lPVwibWFpbGNoaW1wX3N0YXR1c1wiXScpLmxlbmd0aCA+IDAgKSB7XG4gICAgICAgICAgICBwb3N0X2RhdGEubWFpbGNoaW1wX3N0YXR1cyA9ICQoJ2lucHV0W25hbWU9XCJtYWlsY2hpbXBfc3RhdHVzXCJdJykudmFsKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCAkKCdpbnB1dFtuYW1lPVwibWFpbGNoaW1wX3VzZXJfaWRcIl0nKS5sZW5ndGggPiAwICkge1xuICAgICAgICAgICAgcG9zdF9kYXRhLm1haWxjaGltcF91c2VyX2lkID0gJCgnaW5wdXRbbmFtZT1cIm1haWxjaGltcF91c2VyX2lkXCJdJykudmFsKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHR5cGVvZiBuZXdzbGV0dGVyX2dyb3VwcyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICQuZWFjaChuZXdzbGV0dGVyX2dyb3VwcywgZnVuY3Rpb24oaW5kZXgsIHZhbHVlKSB7XG4gICAgICAgICAgICAgIHZhciBncm91cCA9ICQodGhpcykudmFsKCk7XG4gICAgICAgICAgICAgIHBvc3RfZGF0YS5ncm91cHNfc3VibWl0dGVkW2luZGV4XSA9IGdyb3VwO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogb3B0aW9ucy5taW5ucG9zdF9yb290ICsgJy93cC1qc29uL21pbm5wb3N0LWFwaS92Mi9tYWlsY2hpbXAvdXNlcicsXG4gICAgICAgICAgICB0eXBlOiAncG9zdCcsXG4gICAgICAgICAgICBkYXRhVHlwZSA6ICdqc29uJyxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShwb3N0X2RhdGEpXG4gICAgICAgICAgfSlcbiAgICAgICAgICAuZG9uZShmdW5jdGlvbihyZXNwb25zZSkgeyAvLyByZXNwb25zZSBmcm9tIHRoZSBQSFAgYWN0aW9uXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9ICcnO1xuICAgICAgICAgICAgaWYgKCByZXNwb25zZS5zdWNjZXNzID09PSB0cnVlICkge1xuICAgICAgICAgICAgICAvKnN3aXRjaCAocmVzcG9uc2UuZGF0YS51c2VyX3N0YXR1cykge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2V4aXN0aW5nJzpcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnVGhhbmtzIGZvciB1cGRhdGluZyB5b3VyIGVtYWlsIHByZWZlcmVuY2VzLiBUaGV5IHdpbGwgZ28gaW50byBlZmZlY3QgaW1tZWRpYXRlbHkuJztcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ25ldyc6XG4gICAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ1dlIGhhdmUgYWRkZWQgeW91IHRvIHRoZSBNaW5uUG9zdCBtYWlsaW5nIGxpc3QuJztcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3BlbmRpbmcnOlxuICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9ICdXZSBoYXZlIGFkZGVkIHlvdSB0byB0aGUgTWlublBvc3QgbWFpbGluZyBsaXN0LiBZb3Ugd2lsbCBuZWVkIHRvIGNsaWNrIHRoZSBjb25maXJtYXRpb24gbGluayBpbiB0aGUgZW1haWwgd2Ugc2VudCB0byBiZWdpbiByZWNlaXZpbmcgbWVzc2FnZXMuJztcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9Ki9cbiAgICAgICAgICAgICAgLy9jb25maXJtZm9ybS5nZXQoMCkuc3VibWl0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25maXJtZm9ybS5nZXQoMCkuc3VibWl0KCk7XG4gICAgICAgICAgICAvLyQoJy5tLWhvbGQtbWVzc2FnZScpLmh0bWwoJzxkaXYgY2xhc3M9XCJtLWZvcm0tbWVzc2FnZSBtLWZvcm0tbWVzc2FnZS1pbmZvXCI+JyArIG1lc3NhZ2UgKyAnPC9kaXY+Jyk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuZmFpbChmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgLy8gd2Ugc2hvdWxkIHB1dCBhbiBhY3R1YWwgZXJyb3IgbWVzc2FnZSBoZXJlIHNvbWVkYXksIHByb2JhYmx5XG4gICAgICAgICAgICAvLyQoJy5tLWhvbGQtbWVzc2FnZScpLmh0bWwoJzxkaXYgY2xhc3M9XCJtLWZvcm0tbWVzc2FnZSBtLWZvcm0tbWVzc2FnZS1pbmZvXCI+QW4gZXJyb3IgaGFzIG9jY3VyZWQuIFBsZWFzZSB0cnkgYWdhaW4uPC9kaXY+Jyk7XG4gICAgICAgICAgICBjb25maXJtZm9ybS5nZXQoMCkuc3VibWl0KCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgfSBlbHNlIHsgLy8gZW5kIHBhcnQgd2hlcmUgc2V0dGluZ3MgY2hhbmdlZFxuICAgICAgICAgIGNvbmZpcm1mb3JtLmdldCgwKS5zdWJtaXQoKTtcbiAgICAgICAgfVxuXG4gICAgICB9KTtcbiAgICAgIC8vcmV0dXJuIGZhbHNlO1xuICAgIH0sIC8vIGNvbmZpcm1NZXNzYWdlU3VibWl0XG5cbiAgfTsgLy8gcGx1Z2luLnByb3RvdHlwZVxuXG4gIC8vIEEgcmVhbGx5IGxpZ2h0d2VpZ2h0IHBsdWdpbiB3cmFwcGVyIGFyb3VuZCB0aGUgY29uc3RydWN0b3IsXG4gIC8vIHByZXZlbnRpbmcgYWdhaW5zdCBtdWx0aXBsZSBpbnN0YW50aWF0aW9uc1xuICAkLmZuW3BsdWdpbk5hbWVdID0gZnVuY3Rpb24gKCBvcHRpb25zICkge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKCEkLmRhdGEodGhpcywgJ3BsdWdpbl8nICsgcGx1Z2luTmFtZSkpIHtcbiAgICAgICAgJC5kYXRhKHRoaXMsICdwbHVnaW5fJyArIHBsdWdpbk5hbWUsIG5ldyBQbHVnaW4oIHRoaXMsIG9wdGlvbnMgKSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbn0pKCBqUXVlcnksIHdpbmRvdywgZG9jdW1lbnQgKTsiXX0=
