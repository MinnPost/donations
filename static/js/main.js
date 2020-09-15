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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0cmlwZS5wYXltZW50LmpzIiwibWlubnBvc3QuZ2l2aW5nLmpzIl0sIm5hbWVzIjpbImYiLCJleHBvcnRzIiwibW9kdWxlIiwiZGVmaW5lIiwiYW1kIiwiZyIsIndpbmRvdyIsImdsb2JhbCIsInNlbGYiLCJwYXltZW50IiwianMiLCJlIiwidCIsIm4iLCJyIiwicyIsIm8iLCJ1IiwiYSIsInJlcXVpcmUiLCJpIiwiRXJyb3IiLCJjb2RlIiwibCIsImNhbGwiLCJsZW5ndGgiLCJRSiIsInJyZXR1cm4iLCJydHJpbSIsInNlbGVjdG9yIiwiaXNET01FbGVtZW50IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZWwiLCJub2RlTmFtZSIsInRyaW0iLCJ0ZXh0IiwicmVwbGFjZSIsInZhbCIsInJldCIsImFyZ3VtZW50cyIsInZhbHVlIiwicHJldmVudERlZmF1bHQiLCJldmVudE9iamVjdCIsInJldHVyblZhbHVlIiwibm9ybWFsaXplRXZlbnQiLCJvcmlnaW5hbCIsIndoaWNoIiwidGFyZ2V0Iiwic3JjRWxlbWVudCIsIm9yaWdpbmFsRXZlbnQiLCJkYXRhIiwiZGV0YWlsIiwiY2hhckNvZGUiLCJrZXlDb2RlIiwib24iLCJlbGVtZW50IiwiZXZlbnROYW1lIiwiY2FsbGJhY2siLCJqIiwibGVuIiwibGVuMSIsIm11bHRFdmVudE5hbWUiLCJvcmlnaW5hbENhbGxiYWNrIiwicmVmIiwibWF0Y2giLCJzcGxpdCIsImFkZEV2ZW50TGlzdGVuZXIiLCJhdHRhY2hFdmVudCIsImFkZENsYXNzIiwiY2xhc3NOYW1lIiwicmVzdWx0cyIsInB1c2giLCJjbGFzc0xpc3QiLCJhZGQiLCJoYXNDbGFzcyIsImNvbnRhaW5zIiwiUmVnRXhwIiwidGVzdCIsInJlbW92ZUNsYXNzIiwiY2xzIiwicmVtb3ZlIiwiam9pbiIsInRvZ2dsZUNsYXNzIiwiYm9vbCIsImFwcGVuZCIsInRvQXBwZW5kIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwiZmluZCIsIk5vZGVMaXN0IiwiQXJyYXkiLCJ0cmlnZ2VyIiwibmFtZSIsImVycm9yIiwiZXYiLCJDdXN0b21FdmVudCIsImNyZWF0ZUV2ZW50IiwiaW5pdEN1c3RvbUV2ZW50IiwiaW5pdEV2ZW50IiwiZGlzcGF0Y2hFdmVudCIsIlBheW1lbnQiLCJjYXJkRnJvbU51bWJlciIsImNhcmRGcm9tVHlwZSIsImNhcmRzIiwiZGVmYXVsdEZvcm1hdCIsImZvcm1hdEJhY2tDYXJkTnVtYmVyIiwiZm9ybWF0QmFja0V4cGlyeSIsImZvcm1hdENhcmROdW1iZXIiLCJmb3JtYXRFeHBpcnkiLCJmb3JtYXRGb3J3YXJkRXhwaXJ5IiwiZm9ybWF0Rm9yd2FyZFNsYXNoIiwiZm9ybWF0TW9udGhFeHBpcnkiLCJoYXNUZXh0U2VsZWN0ZWQiLCJsdWhuQ2hlY2siLCJyZUZvcm1hdENhcmROdW1iZXIiLCJyZXN0cmljdENWQyIsInJlc3RyaWN0Q2FyZE51bWJlciIsInJlc3RyaWN0Q29tYmluZWRFeHBpcnkiLCJyZXN0cmljdEV4cGlyeSIsInJlc3RyaWN0TW9udGhFeHBpcnkiLCJyZXN0cmljdE51bWVyaWMiLCJyZXN0cmljdFllYXJFeHBpcnkiLCJzZXRDYXJkVHlwZSIsImluZGV4T2YiLCJpdGVtIiwidHlwZSIsInBhdHRlcm4iLCJmb3JtYXQiLCJjdmNMZW5ndGgiLCJsdWhuIiwibnVtIiwiY2FyZCIsImRpZ2l0IiwiZGlnaXRzIiwib2RkIiwic3VtIiwicmV2ZXJzZSIsInBhcnNlSW50Iiwic2VsZWN0aW9uU3RhcnQiLCJzZWxlY3Rpb25FbmQiLCJzZWxlY3Rpb24iLCJjcmVhdGVSYW5nZSIsInNldFRpbWVvdXQiLCJfdGhpcyIsImZucyIsInJlIiwidXBwZXJMZW5ndGgiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJtZXRhIiwic2xhc2giLCJtZXRhS2V5IiwiaW5wdXQiLCJjdHJsS2V5IiwiYWxsVHlwZXMiLCJjYXJkVHlwZSIsImNhcmRFeHBpcnlWYWwiLCJtb250aCIsInByZWZpeCIsInllYXIiLCJEYXRlIiwiZ2V0RnVsbFllYXIiLCJ0b1N0cmluZyIsInNsaWNlIiwidmFsaWRhdGVDYXJkTnVtYmVyIiwidmFsaWRhdGVDYXJkRXhwaXJ5IiwiY3VycmVudFRpbWUiLCJleHBpcnkiLCJzZXRNb250aCIsImdldE1vbnRoIiwidmFsaWRhdGVDYXJkQ1ZDIiwiY3ZjIiwicmVmMSIsImdyb3VwcyIsImV4ZWMiLCJzaGlmdCIsImZvcm1hdENhcmRDVkMiLCJmb3JtYXRDYXJkRXhwaXJ5IiwiZm9ybWF0Q2FyZEV4cGlyeU11bHRpcGxlIiwiZ2V0Q2FyZEFycmF5Iiwic2V0Q2FyZEFycmF5IiwiY2FyZEFycmF5IiwiYWRkVG9DYXJkQXJyYXkiLCJjYXJkT2JqZWN0IiwicmVtb3ZlRnJvbUNhcmRBcnJheSIsImtleSIsInNwbGljZSIsIiQiLCJ1bmRlZmluZWQiLCJwbHVnaW5OYW1lIiwiZGVmYXVsdHMiLCJQbHVnaW4iLCJvcHRpb25zIiwiZXh0ZW5kIiwiX2RlZmF1bHRzIiwiX25hbWUiLCJpbml0IiwicHJvdG90eXBlIiwicmVzZXQiLCJhbW91bnQiLCJkb2N1bWVudEVsZW1lbnQiLCJwYXJzZUZsb2F0IiwibGV2ZWxfYW1vdW50X3NlbGVjdG9yIiwib3JpZ2luYWxfYW1vdW50Iiwib3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yIiwiZnJlcXVlbmN5IiwiZnJlcXVlbmN5X3NlbGVjdG9yIiwiYXR0ciIsInJlY3VycmluZyIsInJlY3VycmluZ19zZWxlY3RvciIsImNoYXJBdCIsInRvVXBwZXJDYXNlIiwicHJvY2Vzc2luZ19mZWUiLCJNYXRoIiwicm91bmQiLCJmZWVfYW1vdW50IiwicG93IiwidG9GaXhlZCIsInByb2Nlc3NpbmdfZmVlX3RleHQiLCJjcmVhdGVfYWNjb3VudCIsImJ1dHRvbl90ZXh0Iiwic3RyaXBlIiwiU3RyaXBlIiwic3RyaXBlX3B1Ymxpc2hhYmxlX2tleSIsImVsZW1lbnRzIiwicmVmZXJyZXIiLCJwcm9wIiwiZGVidWciLCJxdWVyeV9wYW5lbCIsInFzIiwicXVlcnkiLCJhY3RpdmUiLCJ0YWJOYXZpZ2F0aW9uIiwiYW1vdW50QXNSYWRpbyIsImFtb3VudFVwZGF0ZWQiLCJwYXlfY2NfcHJvY2Vzc2luZ19zZWxlY3RvciIsImNyZWRpdENhcmRQcm9jZXNzaW5nRmVlcyIsImRvbmF0ZV9zdGVwX3NlbGVjdG9yIiwibGV2ZWwiLCJjaGVja0xldmVsIiwibGV2ZWxudW0iLCJkb25hdGVBbm9ueW1vdXNseSIsImhvbm9yT3JNZW1vcnlUb2dnbGUiLCJvdXRzaWRlVW5pdGVkU3RhdGVzIiwic2hpcHBpbmdBZGRyZXNzIiwiYWxsb3dNaW5ucG9zdEFjY291bnQiLCJjaG9vc2VQYXltZW50TWV0aG9kIiwiY3JlZGl0Q2FyZEZpZWxkcyIsImFjaEZpZWxkcyIsInZhbGlkYXRlQW5kU3VibWl0IiwiY29uZmlybV9zdGVwX3NlbGVjdG9yIiwic2hvd05ld3NsZXR0ZXJTZXR0aW5ncyIsImNvbmZpcm1NZXNzYWdlU3VibWl0IiwiYiIsInAiLCJkZWNvZGVVUklDb21wb25lbnQiLCJsb2NhdGlvbiIsInNlYXJjaCIsInN1YnN0ciIsIm1lc3NhZ2UiLCJjb25zb2xlIiwibG9nIiwiZGlyIiwiZ2V0UXVlcnlTdHJpbmdzIiwibGluayIsInN0ZXAiLCJpbmRleCIsIm5hdl9pdGVtX2NvdW50Iiwib3BwX2lkIiwib3BwX2lkX3NlbGVjdG9yIiwibmV4dF9zdGVwIiwicG9zdF9wdXJjaGFzZSIsImNvbmZpcm0iLCJjb25maXJtX2J1dHRvbl9zZWxlY3RvciIsImFuYWx5dGljc1RyYWNraW5nU3RlcCIsInNob3ciLCJwYXJlbnQiLCJnYSIsInRvTG93ZXJDYXNlIiwicGFnZSIsInBhdGhuYW1lIiwidGl0bGUiLCJjaGFuZ2UiLCJpcyIsInRoYXQiLCJwYXltZW50X3R5cGUiLCJjaG9vc2VfcGF5bWVudCIsImFtb3VudF9zZWxlY3Rvcl9mYWlyX21hcmtldCIsInNldEZhaXJNYXJrZXRWYWx1ZSIsImNhbGN1bGF0ZUZlZXMiLCJhZGRpdGlvbmFsX2Ftb3VudF9maWVsZCIsImFtb3VudF9zZWxlY3RvciIsImZhaXJfbWFya2V0X3ZhbHVlX3NlbGVjdG9yIiwiZmFpck1hcmtldFZhbHVlIiwic3RyaXBlX3BheW1lbnRfdHlwZSIsInRvdGFsX2Ftb3VudCIsImFkZGl0aW9uYWxfYW1vdW50Iiwic2V0U3RyaXBlUGF5bWVudFR5cGUiLCJhamF4IiwibWV0aG9kIiwidXJsIiwiZG9uZSIsImZlZXMiLCJjcmVkaXRDYXJkRmVlQ2hlY2tib3giLCJkb25hdGVfZm9ybV9zZWxlY3RvciIsImZpZWxkIiwiZnVsbF9hbW91bnQiLCJmdWxsX2Ftb3VudF9zZWxlY3RvciIsImFub255bW91c19zZWxlY3RvciIsIm5hbWVfc2VsZWN0b3IiLCJoaWRlIiwicmV0dXJudmFsdWUiLCJhbW91bnRfeWVhcmx5IiwiZWFjaCIsImxldmVscyIsIm1heCIsIm1pbiIsImhvbm9yT3JNZW1vcnkiLCJob25vcl9vcl9tZW1vcnlfY2hvb3NlciIsImhvbm9yX21lbW9yeV9pbnB1dF9ncm91cCIsImhvbm9yX3R5cGVfc2VsZWN0b3IiLCJob25vcl9uYW1lX3NlbGVjdG9yIiwic2hvd19iaWxsaW5nX2NvdW50cnlfc2VsZWN0b3IiLCJjbGljayIsImJpbGxpbmdfY291bnRyeV9zZWxlY3RvciIsInNob3dfc2hpcHBpbmdfY291bnRyeV9zZWxlY3RvciIsInNoaXBwaW5nX2NvdW50cnlfc2VsZWN0b3IiLCJzaG93X3NoaXBwaW5nIiwidXNlX2Zvcl9zaGlwcGluZ19zZWxlY3RvciIsInNoaXBwaW5nX3NlbGVjdG9yIiwiY2hhbmdlZCIsImFjY291bnRfZXhpc3RzIiwiZW1haWxfZmllbGRfc2VsZWN0b3IiLCJkb25lVHlwaW5nIiwiZW1haWwiLCJjaGVja01pbm5wb3N0QWNjb3VudCIsInR5cGluZ1RpbWVyIiwiZG9uZVR5cGluZ0ludGVydmFsIiwia2V5dXAiLCJjbGVhclRpbWVvdXQiLCJjcmVhdGVfbXBfc2VsZWN0b3IiLCJwYXNzd29yZF9zZWxlY3RvciIsImJlZm9yZSIsImdldCIsIm5leHQiLCJ0b2dnbGUiLCJ1c2VyIiwibWlubnBvc3Rfcm9vdCIsInJlc3VsdCIsInN0YXR1cyIsInJlYXNvbiIsImNoZWNrZWQiLCJjaGVja2VkX3ZhbHVlIiwic2V0dXBQYXltZW50TWV0aG9kIiwiZXZlbnQiLCJpZCIsInBheW1lbnRfbWV0aG9kX3NlbGVjdG9yIiwic3R5bGUiLCJiYXNlIiwiaWNvbkNvbG9yIiwibGluZUhlaWdodCIsImZvbnRXZWlnaHQiLCJmb250RmFtaWx5IiwiZm9udFNpemUiLCJjYXJkTnVtYmVyRWxlbWVudCIsImNyZWF0ZSIsIm1vdW50IiwiY2NfbnVtX3NlbGVjdG9yIiwiY2FyZEV4cGlyeUVsZW1lbnQiLCJjY19leHBfc2VsZWN0b3IiLCJjYXJkQ3ZjRWxlbWVudCIsImNjX2N2dl9zZWxlY3RvciIsInN0cmlwZUVycm9yRGlzcGxheSIsImJ1dHRvblN0YXR1cyIsImJyYW5kIiwic2V0QnJhbmRJY29uIiwiY2FyZEJyYW5kVG9QZkNsYXNzIiwiYnJhbmRJY29uRWxlbWVudCIsImdldEVsZW1lbnRCeUlkIiwicGZDbGFzcyIsImJhbmtUb2tlbkZpZWxkTmFtZSIsImJhbmtUb2tlbkZpZWxkIiwicGxhaWRfZW52IiwiUGxhaWQiLCJsaW5rSGFuZGxlciIsInNlbGVjdEFjY291bnQiLCJhcGlWZXJzaW9uIiwiZW52IiwiY2xpZW50TmFtZSIsInBsYWlkX3B1YmxpY19rZXkiLCJwcm9kdWN0Iiwib25Mb2FkIiwib25TdWNjZXNzIiwicHVibGljX3Rva2VuIiwibWV0YWRhdGEiLCJzdXBwb3J0Zm9ybSIsImFjY291bnRfaWQiLCJzZXJpYWxpemUiLCJyZXNwb25zZSIsInBsYWlkX2xpbmsiLCJhZnRlciIsInN0cmlwZV9iYW5rX2FjY291bnRfdG9rZW4iLCJwcmVwZW5kIiwiaHRtbCIsImNvbnRlbnRzIiwidW53cmFwIiwib25FeGl0IiwiZXJyIiwib3BlbiIsImhhc0h0bWw1VmFsaWRhdGlvbiIsImNyZWF0ZUVsZW1lbnQiLCJjaGVja1ZhbGlkaXR5IiwiYnV0dG9uIiwiZGlzYWJsZWQiLCJzdWJtaXQiLCJhbmltYXRlIiwic2Nyb2xsVG9wIiwib2Zmc2V0IiwidG9wIiwidmFsaWQiLCJ0b2tlbkRhdGEiLCJnZW5lcmF0ZVRva2VuRGF0YSIsImZpcnN0X25hbWUiLCJmaXJzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yIiwibGFzdF9uYW1lIiwibGFzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yIiwicGFzc3dvcmQiLCJwYXNzd29yZF9maWVsZF9zZWxlY3RvciIsImNpdHkiLCJhY2NvdW50X2NpdHlfc2VsZWN0b3IiLCJzdGF0ZSIsImFjY291bnRfc3RhdGVfc2VsZWN0b3IiLCJ6aXAiLCJhY2NvdW50X3ppcF9zZWxlY3RvciIsImNyZWF0ZVRva2VuIiwic3RyaXBlVG9rZW5IYW5kbGVyIiwidGhpc19zZWxlY3RvciIsIndoaWNoX2Vycm9yIiwiZW1wdHkiLCJmdWxsX25hbWUiLCJzdHJlZXQiLCJhZGRyZXNzX2xpbmUxIiwiYWRkcmVzc19jaXR5IiwiYWRkcmVzc19zdGF0ZSIsImFkZHJlc3NfemlwIiwiY291bnRyeSIsImFkZHJlc3NfY291bnRyeSIsInRoZW4iLCJwcmV2IiwidG9rZW4iLCJhamF4X3VybCIsInRva2VuRmllbGROYW1lIiwidG9rZW5GaWVsZCIsImNhY2hlIiwiZXJyb3JzIiwic3RyaXBlRXJyb3JTZWxlY3RvciIsIm5ld3NsZXR0ZXJfZ3JvdXBfaHRtbCIsIm5ld3NsZXR0ZXJfZ3JvdXBfc2VsZWN0b3IiLCJnZXRfZGF0YSIsInNob3J0Y29kZSIsInBsYWNlbWVudCIsImdyb3VwX2ZpZWxkcyIsImNhdGVnb3J5IiwibWFpbGNoaW1wX3N0YXR1cyIsIm1haWxjaGltcF91c2VyX2lkIiwiZXhpc3RpbmdfbmV3c2xldHRlcl9zZXR0aW5ncyIsImNvbmZpcm1fZm9ybV9zZWxlY3RvciIsImNvbmZpcm1mb3JtIiwibmV3c2xldHRlcl9ncm91cHMiLCJuZXdfbmV3c2xldHRlcl9zZXR0aW5ncyIsInBvc3RfZGF0YSIsImdyb3Vwc19zdWJtaXR0ZWQiLCJncm91cHNfYXZhaWxhYmxlIiwiZ3JvdXAiLCJkYXRhVHlwZSIsImNvbnRlbnRUeXBlIiwiSlNPTiIsInN0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QUFXQTtBQUNEOztBQUNEWCxZQUFBQSxXQUFXLENBQUM1SCxHQUFaLENBQWdCLENBQWhCLEVBQW1CdUUsTUFBbkIsR0FoQnVCLENBaUJ2QjtBQUNELFdBekJELEVBMEJDaUUsSUExQkQsQ0EwQk0sVUFBU2pGLFFBQVQsRUFBbUI7QUFDdkI7QUFDQTtBQUNBcUUsWUFBQUEsV0FBVyxDQUFDNUgsR0FBWixDQUFnQixDQUFoQixFQUFtQnVFLE1BQW5CO0FBQ0QsV0E5QkQ7QUFnQ0QsU0E1REQsTUE0RE87QUFBRTtBQUNQcUQsVUFBQUEsV0FBVyxDQUFDNUgsR0FBWixDQUFnQixDQUFoQixFQUFtQnVFLE1BQW5CO0FBQ0Q7QUFFRixPQTFFRCxFQUwrQyxDQWdGL0M7QUFDRCxLQXpyQ2dCLENBeXJDZDs7QUF6ckNjLEdBQW5CLENBbkg0QyxDQTh5Q3pDO0FBRUg7QUFDQTs7QUFDQW5PLEVBQUFBLENBQUMsQ0FBQ3FTLEVBQUYsQ0FBS25TLFVBQUwsSUFBbUIsVUFBV0csT0FBWCxFQUFxQjtBQUN0QyxXQUFPLEtBQUt5SCxJQUFMLENBQVUsWUFBWTtBQUMzQixVQUFJLENBQUM5SCxDQUFDLENBQUN4SSxJQUFGLENBQU8sSUFBUCxFQUFhLFlBQVkwSSxVQUF6QixDQUFMLEVBQTJDO0FBQ3pDRixRQUFBQSxDQUFDLENBQUN4SSxJQUFGLENBQU8sSUFBUCxFQUFhLFlBQVkwSSxVQUF6QixFQUFxQyxJQUFJRSxNQUFKLENBQVksSUFBWixFQUFrQkMsT0FBbEIsQ0FBckM7QUFDRDtBQUNGLEtBSk0sQ0FBUDtBQUtELEdBTkQ7QUFRRCxDQTF6Q0EsRUEwekNHaVMsTUExekNILEVBMHpDVzNkLE1BMXpDWCxFQTB6Q21CeUIsUUExekNuQiIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKGYpe2lmKHR5cGVvZiBleHBvcnRzPT09XCJvYmplY3RcIiYmdHlwZW9mIG1vZHVsZSE9PVwidW5kZWZpbmVkXCIpe21vZHVsZS5leHBvcnRzPWYoKX1lbHNlIGlmKHR5cGVvZiBkZWZpbmU9PT1cImZ1bmN0aW9uXCImJmRlZmluZS5hbWQpe2RlZmluZShbXSxmKX1lbHNle3ZhciBnO2lmKHR5cGVvZiB3aW5kb3chPT1cInVuZGVmaW5lZFwiKXtnPXdpbmRvd31lbHNlIGlmKHR5cGVvZiBnbG9iYWwhPT1cInVuZGVmaW5lZFwiKXtnPWdsb2JhbH1lbHNlIGlmKHR5cGVvZiBzZWxmIT09XCJ1bmRlZmluZWRcIil7Zz1zZWxmfWVsc2V7Zz10aGlzfShnLnBheW1lbnQgfHwgKGcucGF5bWVudCA9IHt9KSkuanMgPSBmKCl9fSkoZnVuY3Rpb24oKXt2YXIgZGVmaW5lLG1vZHVsZSxleHBvcnRzO3JldHVybiAoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSh7MTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG52YXIgUUosIHJyZXR1cm4sIHJ0cmltO1xuXG5RSiA9IGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG4gIGlmIChRSi5pc0RPTUVsZW1lbnQoc2VsZWN0b3IpKSB7XG4gICAgcmV0dXJuIHNlbGVjdG9yO1xuICB9XG4gIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbn07XG5cblFKLmlzRE9NRWxlbWVudCA9IGZ1bmN0aW9uKGVsKSB7XG4gIHJldHVybiBlbCAmJiAoZWwubm9kZU5hbWUgIT0gbnVsbCk7XG59O1xuXG5ydHJpbSA9IC9eW1xcc1xcdUZFRkZcXHhBMF0rfFtcXHNcXHVGRUZGXFx4QTBdKyQvZztcblxuUUoudHJpbSA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgaWYgKHRleHQgPT09IG51bGwpIHtcbiAgICByZXR1cm4gXCJcIjtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gKHRleHQgKyBcIlwiKS5yZXBsYWNlKHJ0cmltLCBcIlwiKTtcbiAgfVxufTtcblxucnJldHVybiA9IC9cXHIvZztcblxuUUoudmFsID0gZnVuY3Rpb24oZWwsIHZhbCkge1xuICB2YXIgcmV0O1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICByZXR1cm4gZWwudmFsdWUgPSB2YWw7XG4gIH0gZWxzZSB7XG4gICAgcmV0ID0gZWwudmFsdWU7XG4gICAgaWYgKHR5cGVvZiByZXQgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHJldHVybiByZXQucmVwbGFjZShycmV0dXJuLCBcIlwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHJldCA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG5RSi5wcmV2ZW50RGVmYXVsdCA9IGZ1bmN0aW9uKGV2ZW50T2JqZWN0KSB7XG4gIGlmICh0eXBlb2YgZXZlbnRPYmplY3QucHJldmVudERlZmF1bHQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIGV2ZW50T2JqZWN0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGV2ZW50T2JqZWN0LnJldHVyblZhbHVlID0gZmFsc2U7XG4gIHJldHVybiBmYWxzZTtcbn07XG5cblFKLm5vcm1hbGl6ZUV2ZW50ID0gZnVuY3Rpb24oZSkge1xuICB2YXIgb3JpZ2luYWw7XG4gIG9yaWdpbmFsID0gZTtcbiAgZSA9IHtcbiAgICB3aGljaDogb3JpZ2luYWwud2hpY2ggIT0gbnVsbCA/IG9yaWdpbmFsLndoaWNoIDogdm9pZCAwLFxuICAgIHRhcmdldDogb3JpZ2luYWwudGFyZ2V0IHx8IG9yaWdpbmFsLnNyY0VsZW1lbnQsXG4gICAgcHJldmVudERlZmF1bHQ6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIFFKLnByZXZlbnREZWZhdWx0KG9yaWdpbmFsKTtcbiAgICB9LFxuICAgIG9yaWdpbmFsRXZlbnQ6IG9yaWdpbmFsLFxuICAgIGRhdGE6IG9yaWdpbmFsLmRhdGEgfHwgb3JpZ2luYWwuZGV0YWlsXG4gIH07XG4gIGlmIChlLndoaWNoID09IG51bGwpIHtcbiAgICBlLndoaWNoID0gb3JpZ2luYWwuY2hhckNvZGUgIT0gbnVsbCA/IG9yaWdpbmFsLmNoYXJDb2RlIDogb3JpZ2luYWwua2V5Q29kZTtcbiAgfVxuICByZXR1cm4gZTtcbn07XG5cblFKLm9uID0gZnVuY3Rpb24oZWxlbWVudCwgZXZlbnROYW1lLCBjYWxsYmFjaykge1xuICB2YXIgZWwsIGksIGosIGxlbiwgbGVuMSwgbXVsdEV2ZW50TmFtZSwgb3JpZ2luYWxDYWxsYmFjaywgcmVmO1xuICBpZiAoZWxlbWVudC5sZW5ndGgpIHtcbiAgICBmb3IgKGkgPSAwLCBsZW4gPSBlbGVtZW50Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBlbCA9IGVsZW1lbnRbaV07XG4gICAgICBRSi5vbihlbCwgZXZlbnROYW1lLCBjYWxsYmFjayk7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuICBpZiAoZXZlbnROYW1lLm1hdGNoKFwiIFwiKSkge1xuICAgIHJlZiA9IGV2ZW50TmFtZS5zcGxpdChcIiBcIik7XG4gICAgZm9yIChqID0gMCwgbGVuMSA9IHJlZi5sZW5ndGg7IGogPCBsZW4xOyBqKyspIHtcbiAgICAgIG11bHRFdmVudE5hbWUgPSByZWZbal07XG4gICAgICBRSi5vbihlbGVtZW50LCBtdWx0RXZlbnROYW1lLCBjYWxsYmFjayk7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuICBvcmlnaW5hbENhbGxiYWNrID0gY2FsbGJhY2s7XG4gIGNhbGxiYWNrID0gZnVuY3Rpb24oZSkge1xuICAgIGUgPSBRSi5ub3JtYWxpemVFdmVudChlKTtcbiAgICByZXR1cm4gb3JpZ2luYWxDYWxsYmFjayhlKTtcbiAgfTtcbiAgaWYgKGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgIHJldHVybiBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBjYWxsYmFjaywgZmFsc2UpO1xuICB9XG4gIGlmIChlbGVtZW50LmF0dGFjaEV2ZW50KSB7XG4gICAgZXZlbnROYW1lID0gXCJvblwiICsgZXZlbnROYW1lO1xuICAgIHJldHVybiBlbGVtZW50LmF0dGFjaEV2ZW50KGV2ZW50TmFtZSwgY2FsbGJhY2spO1xuICB9XG4gIGVsZW1lbnRbJ29uJyArIGV2ZW50TmFtZV0gPSBjYWxsYmFjaztcbn07XG5cblFKLmFkZENsYXNzID0gZnVuY3Rpb24oZWwsIGNsYXNzTmFtZSkge1xuICB2YXIgZTtcbiAgaWYgKGVsLmxlbmd0aCkge1xuICAgIHJldHVybiAoZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaSwgbGVuLCByZXN1bHRzO1xuICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgZm9yIChpID0gMCwgbGVuID0gZWwubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgZSA9IGVsW2ldO1xuICAgICAgICByZXN1bHRzLnB1c2goUUouYWRkQ2xhc3MoZSwgY2xhc3NOYW1lKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9KSgpO1xuICB9XG4gIGlmIChlbC5jbGFzc0xpc3QpIHtcbiAgICByZXR1cm4gZWwuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBlbC5jbGFzc05hbWUgKz0gJyAnICsgY2xhc3NOYW1lO1xuICB9XG59O1xuXG5RSi5oYXNDbGFzcyA9IGZ1bmN0aW9uKGVsLCBjbGFzc05hbWUpIHtcbiAgdmFyIGUsIGhhc0NsYXNzLCBpLCBsZW47XG4gIGlmIChlbC5sZW5ndGgpIHtcbiAgICBoYXNDbGFzcyA9IHRydWU7XG4gICAgZm9yIChpID0gMCwgbGVuID0gZWwubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGUgPSBlbFtpXTtcbiAgICAgIGhhc0NsYXNzID0gaGFzQ2xhc3MgJiYgUUouaGFzQ2xhc3MoZSwgY2xhc3NOYW1lKTtcbiAgICB9XG4gICAgcmV0dXJuIGhhc0NsYXNzO1xuICB9XG4gIGlmIChlbC5jbGFzc0xpc3QpIHtcbiAgICByZXR1cm4gZWwuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyBSZWdFeHAoJyhefCApJyArIGNsYXNzTmFtZSArICcoIHwkKScsICdnaScpLnRlc3QoZWwuY2xhc3NOYW1lKTtcbiAgfVxufTtcblxuUUoucmVtb3ZlQ2xhc3MgPSBmdW5jdGlvbihlbCwgY2xhc3NOYW1lKSB7XG4gIHZhciBjbHMsIGUsIGksIGxlbiwgcmVmLCByZXN1bHRzO1xuICBpZiAoZWwubGVuZ3RoKSB7XG4gICAgcmV0dXJuIChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBpLCBsZW4sIHJlc3VsdHM7XG4gICAgICByZXN1bHRzID0gW107XG4gICAgICBmb3IgKGkgPSAwLCBsZW4gPSBlbC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBlID0gZWxbaV07XG4gICAgICAgIHJlc3VsdHMucHVzaChRSi5yZW1vdmVDbGFzcyhlLCBjbGFzc05hbWUpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH0pKCk7XG4gIH1cbiAgaWYgKGVsLmNsYXNzTGlzdCkge1xuICAgIHJlZiA9IGNsYXNzTmFtZS5zcGxpdCgnICcpO1xuICAgIHJlc3VsdHMgPSBbXTtcbiAgICBmb3IgKGkgPSAwLCBsZW4gPSByZWYubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGNscyA9IHJlZltpXTtcbiAgICAgIHJlc3VsdHMucHVzaChlbC5jbGFzc0xpc3QucmVtb3ZlKGNscykpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZWwuY2xhc3NOYW1lID0gZWwuY2xhc3NOYW1lLnJlcGxhY2UobmV3IFJlZ0V4cCgnKF58XFxcXGIpJyArIGNsYXNzTmFtZS5zcGxpdCgnICcpLmpvaW4oJ3wnKSArICcoXFxcXGJ8JCknLCAnZ2knKSwgJyAnKTtcbiAgfVxufTtcblxuUUoudG9nZ2xlQ2xhc3MgPSBmdW5jdGlvbihlbCwgY2xhc3NOYW1lLCBib29sKSB7XG4gIHZhciBlO1xuICBpZiAoZWwubGVuZ3RoKSB7XG4gICAgcmV0dXJuIChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBpLCBsZW4sIHJlc3VsdHM7XG4gICAgICByZXN1bHRzID0gW107XG4gICAgICBmb3IgKGkgPSAwLCBsZW4gPSBlbC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBlID0gZWxbaV07XG4gICAgICAgIHJlc3VsdHMucHVzaChRSi50b2dnbGVDbGFzcyhlLCBjbGFzc05hbWUsIGJvb2wpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH0pKCk7XG4gIH1cbiAgaWYgKGJvb2wpIHtcbiAgICBpZiAoIVFKLmhhc0NsYXNzKGVsLCBjbGFzc05hbWUpKSB7XG4gICAgICByZXR1cm4gUUouYWRkQ2xhc3MoZWwsIGNsYXNzTmFtZSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBRSi5yZW1vdmVDbGFzcyhlbCwgY2xhc3NOYW1lKTtcbiAgfVxufTtcblxuUUouYXBwZW5kID0gZnVuY3Rpb24oZWwsIHRvQXBwZW5kKSB7XG4gIHZhciBlO1xuICBpZiAoZWwubGVuZ3RoKSB7XG4gICAgcmV0dXJuIChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBpLCBsZW4sIHJlc3VsdHM7XG4gICAgICByZXN1bHRzID0gW107XG4gICAgICBmb3IgKGkgPSAwLCBsZW4gPSBlbC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBlID0gZWxbaV07XG4gICAgICAgIHJlc3VsdHMucHVzaChRSi5hcHBlbmQoZSwgdG9BcHBlbmQpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH0pKCk7XG4gIH1cbiAgcmV0dXJuIGVsLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgdG9BcHBlbmQpO1xufTtcblxuUUouZmluZCA9IGZ1bmN0aW9uKGVsLCBzZWxlY3Rvcikge1xuICBpZiAoZWwgaW5zdGFuY2VvZiBOb2RlTGlzdCB8fCBlbCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgZWwgPSBlbFswXTtcbiAgfVxuICByZXR1cm4gZWwucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG59O1xuXG5RSi50cmlnZ2VyID0gZnVuY3Rpb24oZWwsIG5hbWUsIGRhdGEpIHtcbiAgdmFyIGUsIGVycm9yLCBldjtcbiAgdHJ5IHtcbiAgICBldiA9IG5ldyBDdXN0b21FdmVudChuYW1lLCB7XG4gICAgICBkZXRhaWw6IGRhdGFcbiAgICB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBlID0gZXJyb3I7XG4gICAgZXYgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcbiAgICBpZiAoZXYuaW5pdEN1c3RvbUV2ZW50KSB7XG4gICAgICBldi5pbml0Q3VzdG9tRXZlbnQobmFtZSwgdHJ1ZSwgdHJ1ZSwgZGF0YSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV2LmluaXRFdmVudChuYW1lLCB0cnVlLCB0cnVlLCBkYXRhKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGVsLmRpc3BhdGNoRXZlbnQoZXYpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBRSjtcblxuXG59LHt9XSwyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbihmdW5jdGlvbiAoZ2xvYmFsKXtcbnZhciBQYXltZW50LCBRSiwgY2FyZEZyb21OdW1iZXIsIGNhcmRGcm9tVHlwZSwgY2FyZHMsIGRlZmF1bHRGb3JtYXQsIGZvcm1hdEJhY2tDYXJkTnVtYmVyLCBmb3JtYXRCYWNrRXhwaXJ5LCBmb3JtYXRDYXJkTnVtYmVyLCBmb3JtYXRFeHBpcnksIGZvcm1hdEZvcndhcmRFeHBpcnksIGZvcm1hdEZvcndhcmRTbGFzaCwgZm9ybWF0TW9udGhFeHBpcnksIGhhc1RleHRTZWxlY3RlZCwgbHVobkNoZWNrLCByZUZvcm1hdENhcmROdW1iZXIsIHJlc3RyaWN0Q1ZDLCByZXN0cmljdENhcmROdW1iZXIsIHJlc3RyaWN0Q29tYmluZWRFeHBpcnksIHJlc3RyaWN0RXhwaXJ5LCByZXN0cmljdE1vbnRoRXhwaXJ5LCByZXN0cmljdE51bWVyaWMsIHJlc3RyaWN0WWVhckV4cGlyeSwgc2V0Q2FyZFR5cGUsXG4gIGluZGV4T2YgPSBbXS5pbmRleE9mIHx8IGZ1bmN0aW9uKGl0ZW0pIHsgZm9yICh2YXIgaSA9IDAsIGwgPSB0aGlzLmxlbmd0aDsgaSA8IGw7IGkrKykgeyBpZiAoaSBpbiB0aGlzICYmIHRoaXNbaV0gPT09IGl0ZW0pIHJldHVybiBpOyB9IHJldHVybiAtMTsgfTtcblxuUUogPSByZXF1aXJlKCdxai9zcmMvcWouY29mZmVlJyk7XG5cbmRlZmF1bHRGb3JtYXQgPSAvKFxcZHsxLDR9KS9nO1xuXG5jYXJkcyA9IFtcbiAge1xuICAgIHR5cGU6ICdhbWV4JyxcbiAgICBwYXR0ZXJuOiAvXjNbNDddLyxcbiAgICBmb3JtYXQ6IC8oXFxkezEsNH0pKFxcZHsxLDZ9KT8oXFxkezEsNX0pPy8sXG4gICAgbGVuZ3RoOiBbMTVdLFxuICAgIGN2Y0xlbmd0aDogWzRdLFxuICAgIGx1aG46IHRydWVcbiAgfSwge1xuICAgIHR5cGU6ICdkYW5rb3J0JyxcbiAgICBwYXR0ZXJuOiAvXjUwMTkvLFxuICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICBsZW5ndGg6IFsxNl0sXG4gICAgY3ZjTGVuZ3RoOiBbM10sXG4gICAgbHVobjogdHJ1ZVxuICB9LCB7XG4gICAgdHlwZTogJ2RpbmVyc2NsdWInLFxuICAgIHBhdHRlcm46IC9eKDM2fDM4fDMwWzAtNV0pLyxcbiAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgbGVuZ3RoOiBbMTRdLFxuICAgIGN2Y0xlbmd0aDogWzNdLFxuICAgIGx1aG46IHRydWVcbiAgfSwge1xuICAgIHR5cGU6ICdkaXNjb3ZlcicsXG4gICAgcGF0dGVybjogL14oNjAxMXw2NXw2NFs0LTldfDYyMikvLFxuICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICBsZW5ndGg6IFsxNl0sXG4gICAgY3ZjTGVuZ3RoOiBbM10sXG4gICAgbHVobjogdHJ1ZVxuICB9LCB7XG4gICAgdHlwZTogJ2pjYicsXG4gICAgcGF0dGVybjogL14zNS8sXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGxlbmd0aDogWzE2XSxcbiAgICBjdmNMZW5ndGg6IFszXSxcbiAgICBsdWhuOiB0cnVlXG4gIH0sIHtcbiAgICB0eXBlOiAnbGFzZXInLFxuICAgIHBhdHRlcm46IC9eKDY3MDZ8Njc3MXw2NzA5KS8sXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGxlbmd0aDogWzE2LCAxNywgMTgsIDE5XSxcbiAgICBjdmNMZW5ndGg6IFszXSxcbiAgICBsdWhuOiB0cnVlXG4gIH0sIHtcbiAgICB0eXBlOiAnbWFlc3RybycsXG4gICAgcGF0dGVybjogL14oNTAxOHw1MDIwfDUwMzh8NjMwNHw2NzAzfDY3NTl8Njc2WzEtM10pLyxcbiAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgbGVuZ3RoOiBbMTIsIDEzLCAxNCwgMTUsIDE2LCAxNywgMTgsIDE5XSxcbiAgICBjdmNMZW5ndGg6IFszXSxcbiAgICBsdWhuOiB0cnVlXG4gIH0sIHtcbiAgICB0eXBlOiAnbWFzdGVyY2FyZCcsXG4gICAgcGF0dGVybjogL141WzEtNV0vLFxuICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICBsZW5ndGg6IFsxNl0sXG4gICAgY3ZjTGVuZ3RoOiBbM10sXG4gICAgbHVobjogdHJ1ZVxuICB9LCB7XG4gICAgdHlwZTogJ3VuaW9ucGF5JyxcbiAgICBwYXR0ZXJuOiAvXjYyLyxcbiAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgbGVuZ3RoOiBbMTYsIDE3LCAxOCwgMTldLFxuICAgIGN2Y0xlbmd0aDogWzNdLFxuICAgIGx1aG46IGZhbHNlXG4gIH0sIHtcbiAgICB0eXBlOiAndmlzYWVsZWN0cm9uJyxcbiAgICBwYXR0ZXJuOiAvXjQoMDI2fDE3NTAwfDQwNXw1MDh8ODQ0fDkxWzM3XSkvLFxuICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICBsZW5ndGg6IFsxNl0sXG4gICAgY3ZjTGVuZ3RoOiBbM10sXG4gICAgbHVobjogdHJ1ZVxuICB9LCB7XG4gICAgdHlwZTogJ3Zpc2EnLFxuICAgIHBhdHRlcm46IC9eNC8sXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGxlbmd0aDogWzEzLCAxNl0sXG4gICAgY3ZjTGVuZ3RoOiBbM10sXG4gICAgbHVobjogdHJ1ZVxuICB9LCB7XG4gICAgdHlwZTogJ2VsbycsXG4gICAgcGF0dGVybjogL140MDExfDQzODkzNXw0NSgxNDE2fDc2KXw1MCg0MTc1fDY2OTl8Njd8OTBbNC03XSl8NjMoNjI5N3w2MzY4KS8sXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGxlbmd0aDogWzE2XSxcbiAgICBjdmNMZW5ndGg6IFszXSxcbiAgICBsdWhuOiB0cnVlXG4gIH1cbl07XG5cbmNhcmRGcm9tTnVtYmVyID0gZnVuY3Rpb24obnVtKSB7XG4gIHZhciBjYXJkLCBpLCBsZW47XG4gIG51bSA9IChudW0gKyAnJykucmVwbGFjZSgvXFxEL2csICcnKTtcbiAgZm9yIChpID0gMCwgbGVuID0gY2FyZHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBjYXJkID0gY2FyZHNbaV07XG4gICAgaWYgKGNhcmQucGF0dGVybi50ZXN0KG51bSkpIHtcbiAgICAgIHJldHVybiBjYXJkO1xuICAgIH1cbiAgfVxufTtcblxuY2FyZEZyb21UeXBlID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIgY2FyZCwgaSwgbGVuO1xuICBmb3IgKGkgPSAwLCBsZW4gPSBjYXJkcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGNhcmQgPSBjYXJkc1tpXTtcbiAgICBpZiAoY2FyZC50eXBlID09PSB0eXBlKSB7XG4gICAgICByZXR1cm4gY2FyZDtcbiAgICB9XG4gIH1cbn07XG5cbmx1aG5DaGVjayA9IGZ1bmN0aW9uKG51bSkge1xuICB2YXIgZGlnaXQsIGRpZ2l0cywgaSwgbGVuLCBvZGQsIHN1bTtcbiAgb2RkID0gdHJ1ZTtcbiAgc3VtID0gMDtcbiAgZGlnaXRzID0gKG51bSArICcnKS5zcGxpdCgnJykucmV2ZXJzZSgpO1xuICBmb3IgKGkgPSAwLCBsZW4gPSBkaWdpdHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBkaWdpdCA9IGRpZ2l0c1tpXTtcbiAgICBkaWdpdCA9IHBhcnNlSW50KGRpZ2l0LCAxMCk7XG4gICAgaWYgKChvZGQgPSAhb2RkKSkge1xuICAgICAgZGlnaXQgKj0gMjtcbiAgICB9XG4gICAgaWYgKGRpZ2l0ID4gOSkge1xuICAgICAgZGlnaXQgLT0gOTtcbiAgICB9XG4gICAgc3VtICs9IGRpZ2l0O1xuICB9XG4gIHJldHVybiBzdW0gJSAxMCA9PT0gMDtcbn07XG5cbmhhc1RleHRTZWxlY3RlZCA9IGZ1bmN0aW9uKHRhcmdldCkge1xuICB2YXIgcmVmO1xuICBpZiAoKHRhcmdldC5zZWxlY3Rpb25TdGFydCAhPSBudWxsKSAmJiB0YXJnZXQuc2VsZWN0aW9uU3RhcnQgIT09IHRhcmdldC5zZWxlY3Rpb25FbmQpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAoKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBkb2N1bWVudCAhPT0gbnVsbCA/IChyZWYgPSBkb2N1bWVudC5zZWxlY3Rpb24pICE9IG51bGwgPyByZWYuY3JlYXRlUmFuZ2UgOiB2b2lkIDAgOiB2b2lkIDApICE9IG51bGwpIHtcbiAgICBpZiAoZG9jdW1lbnQuc2VsZWN0aW9uLmNyZWF0ZVJhbmdlKCkudGV4dCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbnJlRm9ybWF0Q2FyZE51bWJlciA9IGZ1bmN0aW9uKGUpIHtcbiAgcmV0dXJuIHNldFRpbWVvdXQoKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHRhcmdldCwgdmFsdWU7XG4gICAgICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICAgIHZhbHVlID0gUUoudmFsKHRhcmdldCk7XG4gICAgICB2YWx1ZSA9IFBheW1lbnQuZm5zLmZvcm1hdENhcmROdW1iZXIodmFsdWUpO1xuICAgICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIHZhbHVlKTtcbiAgICB9O1xuICB9KSh0aGlzKSk7XG59O1xuXG5mb3JtYXRDYXJkTnVtYmVyID0gZnVuY3Rpb24oZSkge1xuICB2YXIgY2FyZCwgZGlnaXQsIGxlbmd0aCwgcmUsIHRhcmdldCwgdXBwZXJMZW5ndGgsIHZhbHVlO1xuICBkaWdpdCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZS53aGljaCk7XG4gIGlmICghL15cXGQrJC8udGVzdChkaWdpdCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gIHZhbHVlID0gUUoudmFsKHRhcmdldCk7XG4gIGNhcmQgPSBjYXJkRnJvbU51bWJlcih2YWx1ZSArIGRpZ2l0KTtcbiAgbGVuZ3RoID0gKHZhbHVlLnJlcGxhY2UoL1xcRC9nLCAnJykgKyBkaWdpdCkubGVuZ3RoO1xuICB1cHBlckxlbmd0aCA9IDE2O1xuICBpZiAoY2FyZCkge1xuICAgIHVwcGVyTGVuZ3RoID0gY2FyZC5sZW5ndGhbY2FyZC5sZW5ndGgubGVuZ3RoIC0gMV07XG4gIH1cbiAgaWYgKGxlbmd0aCA+PSB1cHBlckxlbmd0aCkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoKHRhcmdldC5zZWxlY3Rpb25TdGFydCAhPSBudWxsKSAmJiB0YXJnZXQuc2VsZWN0aW9uU3RhcnQgIT09IHZhbHVlLmxlbmd0aCkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoY2FyZCAmJiBjYXJkLnR5cGUgPT09ICdhbWV4Jykge1xuICAgIHJlID0gL14oXFxkezR9fFxcZHs0fVxcc1xcZHs2fSkkLztcbiAgfSBlbHNlIHtcbiAgICByZSA9IC8oPzpefFxccykoXFxkezR9KSQvO1xuICB9XG4gIGlmIChyZS50ZXN0KHZhbHVlKSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgdmFsdWUgKyAnICcgKyBkaWdpdCk7XG4gIH0gZWxzZSBpZiAocmUudGVzdCh2YWx1ZSArIGRpZ2l0KSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgdmFsdWUgKyBkaWdpdCArICcgJyk7XG4gIH1cbn07XG5cbmZvcm1hdEJhY2tDYXJkTnVtYmVyID0gZnVuY3Rpb24oZSkge1xuICB2YXIgdGFyZ2V0LCB2YWx1ZTtcbiAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gIHZhbHVlID0gUUoudmFsKHRhcmdldCk7XG4gIGlmIChlLm1ldGEpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGUud2hpY2ggIT09IDgpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKCh0YXJnZXQuc2VsZWN0aW9uU3RhcnQgIT0gbnVsbCkgJiYgdGFyZ2V0LnNlbGVjdGlvblN0YXJ0ICE9PSB2YWx1ZS5sZW5ndGgpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKC9cXGRcXHMkLy50ZXN0KHZhbHVlKSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgdmFsdWUucmVwbGFjZSgvXFxkXFxzJC8sICcnKSk7XG4gIH0gZWxzZSBpZiAoL1xcc1xcZD8kLy50ZXN0KHZhbHVlKSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgdmFsdWUucmVwbGFjZSgvXFxzXFxkPyQvLCAnJykpO1xuICB9XG59O1xuXG5mb3JtYXRFeHBpcnkgPSBmdW5jdGlvbihlKSB7XG4gIHZhciBkaWdpdCwgdGFyZ2V0LCB2YWw7XG4gIGRpZ2l0ID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKTtcbiAgaWYgKCEvXlxcZCskLy50ZXN0KGRpZ2l0KSkge1xuICAgIHJldHVybjtcbiAgfVxuICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgdmFsID0gUUoudmFsKHRhcmdldCkgKyBkaWdpdDtcbiAgaWYgKC9eXFxkJC8udGVzdCh2YWwpICYmICh2YWwgIT09ICcwJyAmJiB2YWwgIT09ICcxJykpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIFwiMFwiICsgdmFsICsgXCIgLyBcIik7XG4gIH0gZWxzZSBpZiAoL15cXGRcXGQkLy50ZXN0KHZhbCkpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIHZhbCArIFwiIC8gXCIpO1xuICB9XG59O1xuXG5mb3JtYXRNb250aEV4cGlyeSA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIGRpZ2l0LCB0YXJnZXQsIHZhbDtcbiAgZGlnaXQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpO1xuICBpZiAoIS9eXFxkKyQvLnRlc3QoZGlnaXQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRhcmdldCA9IGUudGFyZ2V0O1xuICB2YWwgPSBRSi52YWwodGFyZ2V0KSArIGRpZ2l0O1xuICBpZiAoL15cXGQkLy50ZXN0KHZhbCkgJiYgKHZhbCAhPT0gJzAnICYmIHZhbCAhPT0gJzEnKSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgXCIwXCIgKyB2YWwpO1xuICB9IGVsc2UgaWYgKC9eXFxkXFxkJC8udGVzdCh2YWwpKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCBcIlwiICsgdmFsKTtcbiAgfVxufTtcblxuZm9ybWF0Rm9yd2FyZEV4cGlyeSA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIGRpZ2l0LCB0YXJnZXQsIHZhbDtcbiAgZGlnaXQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpO1xuICBpZiAoIS9eXFxkKyQvLnRlc3QoZGlnaXQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRhcmdldCA9IGUudGFyZ2V0O1xuICB2YWwgPSBRSi52YWwodGFyZ2V0KTtcbiAgaWYgKC9eXFxkXFxkJC8udGVzdCh2YWwpKSB7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIHZhbCArIFwiIC8gXCIpO1xuICB9XG59O1xuXG5mb3JtYXRGb3J3YXJkU2xhc2ggPSBmdW5jdGlvbihlKSB7XG4gIHZhciBzbGFzaCwgdGFyZ2V0LCB2YWw7XG4gIHNsYXNoID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKTtcbiAgaWYgKHNsYXNoICE9PSAnLycpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gIHZhbCA9IFFKLnZhbCh0YXJnZXQpO1xuICBpZiAoL15cXGQkLy50ZXN0KHZhbCkgJiYgdmFsICE9PSAnMCcpIHtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgXCIwXCIgKyB2YWwgKyBcIiAvIFwiKTtcbiAgfVxufTtcblxuZm9ybWF0QmFja0V4cGlyeSA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIHRhcmdldCwgdmFsdWU7XG4gIGlmIChlLm1ldGFLZXkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gIHZhbHVlID0gUUoudmFsKHRhcmdldCk7XG4gIGlmIChlLndoaWNoICE9PSA4KSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICgodGFyZ2V0LnNlbGVjdGlvblN0YXJ0ICE9IG51bGwpICYmIHRhcmdldC5zZWxlY3Rpb25TdGFydCAhPT0gdmFsdWUubGVuZ3RoKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICgvXFxkKFxcc3xcXC8pKyQvLnRlc3QodmFsdWUpKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCB2YWx1ZS5yZXBsYWNlKC9cXGQoXFxzfFxcLykqJC8sICcnKSk7XG4gIH0gZWxzZSBpZiAoL1xcc1xcL1xccz9cXGQ/JC8udGVzdCh2YWx1ZSkpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIHZhbHVlLnJlcGxhY2UoL1xcc1xcL1xccz9cXGQ/JC8sICcnKSk7XG4gIH1cbn07XG5cbnJlc3RyaWN0TnVtZXJpYyA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIGlucHV0O1xuICBpZiAoZS5tZXRhS2V5IHx8IGUuY3RybEtleSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmIChlLndoaWNoID09PSAzMikge1xuICAgIHJldHVybiBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH1cbiAgaWYgKGUud2hpY2ggPT09IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAoZS53aGljaCA8IDMzKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaW5wdXQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpO1xuICBpZiAoIS9bXFxkXFxzXS8udGVzdChpbnB1dCkpIHtcbiAgICByZXR1cm4gZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG59O1xuXG5yZXN0cmljdENhcmROdW1iZXIgPSBmdW5jdGlvbihlKSB7XG4gIHZhciBjYXJkLCBkaWdpdCwgdGFyZ2V0LCB2YWx1ZTtcbiAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gIGRpZ2l0ID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKTtcbiAgaWYgKCEvXlxcZCskLy50ZXN0KGRpZ2l0KSkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoaGFzVGV4dFNlbGVjdGVkKHRhcmdldCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFsdWUgPSAoUUoudmFsKHRhcmdldCkgKyBkaWdpdCkucmVwbGFjZSgvXFxEL2csICcnKTtcbiAgY2FyZCA9IGNhcmRGcm9tTnVtYmVyKHZhbHVlKTtcbiAgaWYgKGNhcmQpIHtcbiAgICBpZiAoISh2YWx1ZS5sZW5ndGggPD0gY2FyZC5sZW5ndGhbY2FyZC5sZW5ndGgubGVuZ3RoIC0gMV0pKSB7XG4gICAgICByZXR1cm4gZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoISh2YWx1ZS5sZW5ndGggPD0gMTYpKSB7XG4gICAgICByZXR1cm4gZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfVxufTtcblxucmVzdHJpY3RFeHBpcnkgPSBmdW5jdGlvbihlLCBsZW5ndGgpIHtcbiAgdmFyIGRpZ2l0LCB0YXJnZXQsIHZhbHVlO1xuICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgZGlnaXQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpO1xuICBpZiAoIS9eXFxkKyQvLnRlc3QoZGlnaXQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChoYXNUZXh0U2VsZWN0ZWQodGFyZ2V0KSkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YWx1ZSA9IFFKLnZhbCh0YXJnZXQpICsgZGlnaXQ7XG4gIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvXFxEL2csICcnKTtcbiAgaWYgKHZhbHVlLmxlbmd0aCA+IGxlbmd0aCkge1xuICAgIHJldHVybiBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH1cbn07XG5cbnJlc3RyaWN0Q29tYmluZWRFeHBpcnkgPSBmdW5jdGlvbihlKSB7XG4gIHJldHVybiByZXN0cmljdEV4cGlyeShlLCA2KTtcbn07XG5cbnJlc3RyaWN0TW9udGhFeHBpcnkgPSBmdW5jdGlvbihlKSB7XG4gIHJldHVybiByZXN0cmljdEV4cGlyeShlLCAyKTtcbn07XG5cbnJlc3RyaWN0WWVhckV4cGlyeSA9IGZ1bmN0aW9uKGUpIHtcbiAgcmV0dXJuIHJlc3RyaWN0RXhwaXJ5KGUsIDQpO1xufTtcblxucmVzdHJpY3RDVkMgPSBmdW5jdGlvbihlKSB7XG4gIHZhciBkaWdpdCwgdGFyZ2V0LCB2YWw7XG4gIHRhcmdldCA9IGUudGFyZ2V0O1xuICBkaWdpdCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZS53aGljaCk7XG4gIGlmICghL15cXGQrJC8udGVzdChkaWdpdCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGhhc1RleHRTZWxlY3RlZCh0YXJnZXQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhbCA9IFFKLnZhbCh0YXJnZXQpICsgZGlnaXQ7XG4gIGlmICghKHZhbC5sZW5ndGggPD0gNCkpIHtcbiAgICByZXR1cm4gZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG59O1xuXG5zZXRDYXJkVHlwZSA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIGFsbFR5cGVzLCBjYXJkLCBjYXJkVHlwZSwgdGFyZ2V0LCB2YWw7XG4gIHRhcmdldCA9IGUudGFyZ2V0O1xuICB2YWwgPSBRSi52YWwodGFyZ2V0KTtcbiAgY2FyZFR5cGUgPSBQYXltZW50LmZucy5jYXJkVHlwZSh2YWwpIHx8ICd1bmtub3duJztcbiAgaWYgKCFRSi5oYXNDbGFzcyh0YXJnZXQsIGNhcmRUeXBlKSkge1xuICAgIGFsbFR5cGVzID0gKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGksIGxlbiwgcmVzdWx0cztcbiAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgIGZvciAoaSA9IDAsIGxlbiA9IGNhcmRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGNhcmQgPSBjYXJkc1tpXTtcbiAgICAgICAgcmVzdWx0cy5wdXNoKGNhcmQudHlwZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9KSgpO1xuICAgIFFKLnJlbW92ZUNsYXNzKHRhcmdldCwgJ3Vua25vd24nKTtcbiAgICBRSi5yZW1vdmVDbGFzcyh0YXJnZXQsIGFsbFR5cGVzLmpvaW4oJyAnKSk7XG4gICAgUUouYWRkQ2xhc3ModGFyZ2V0LCBjYXJkVHlwZSk7XG4gICAgUUoudG9nZ2xlQ2xhc3ModGFyZ2V0LCAnaWRlbnRpZmllZCcsIGNhcmRUeXBlICE9PSAndW5rbm93bicpO1xuICAgIHJldHVybiBRSi50cmlnZ2VyKHRhcmdldCwgJ3BheW1lbnQuY2FyZFR5cGUnLCBjYXJkVHlwZSk7XG4gIH1cbn07XG5cblBheW1lbnQgPSAoZnVuY3Rpb24oKSB7XG4gIGZ1bmN0aW9uIFBheW1lbnQoKSB7fVxuXG4gIFBheW1lbnQuZm5zID0ge1xuICAgIGNhcmRFeHBpcnlWYWw6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICB2YXIgbW9udGgsIHByZWZpeCwgcmVmLCB5ZWFyO1xuICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9cXHMvZywgJycpO1xuICAgICAgcmVmID0gdmFsdWUuc3BsaXQoJy8nLCAyKSwgbW9udGggPSByZWZbMF0sIHllYXIgPSByZWZbMV07XG4gICAgICBpZiAoKHllYXIgIT0gbnVsbCA/IHllYXIubGVuZ3RoIDogdm9pZCAwKSA9PT0gMiAmJiAvXlxcZCskLy50ZXN0KHllYXIpKSB7XG4gICAgICAgIHByZWZpeCA9IChuZXcgRGF0ZSkuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgcHJlZml4ID0gcHJlZml4LnRvU3RyaW5nKCkuc2xpY2UoMCwgMik7XG4gICAgICAgIHllYXIgPSBwcmVmaXggKyB5ZWFyO1xuICAgICAgfVxuICAgICAgbW9udGggPSBwYXJzZUludChtb250aCwgMTApO1xuICAgICAgeWVhciA9IHBhcnNlSW50KHllYXIsIDEwKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG1vbnRoOiBtb250aCxcbiAgICAgICAgeWVhcjogeWVhclxuICAgICAgfTtcbiAgICB9LFxuICAgIHZhbGlkYXRlQ2FyZE51bWJlcjogZnVuY3Rpb24obnVtKSB7XG4gICAgICB2YXIgY2FyZCwgcmVmO1xuICAgICAgbnVtID0gKG51bSArICcnKS5yZXBsYWNlKC9cXHMrfC0vZywgJycpO1xuICAgICAgaWYgKCEvXlxcZCskLy50ZXN0KG51bSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgY2FyZCA9IGNhcmRGcm9tTnVtYmVyKG51bSk7XG4gICAgICBpZiAoIWNhcmQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIChyZWYgPSBudW0ubGVuZ3RoLCBpbmRleE9mLmNhbGwoY2FyZC5sZW5ndGgsIHJlZikgPj0gMCkgJiYgKGNhcmQubHVobiA9PT0gZmFsc2UgfHwgbHVobkNoZWNrKG51bSkpO1xuICAgIH0sXG4gICAgdmFsaWRhdGVDYXJkRXhwaXJ5OiBmdW5jdGlvbihtb250aCwgeWVhcikge1xuICAgICAgdmFyIGN1cnJlbnRUaW1lLCBleHBpcnksIHByZWZpeCwgcmVmO1xuICAgICAgaWYgKHR5cGVvZiBtb250aCA9PT0gJ29iamVjdCcgJiYgJ21vbnRoJyBpbiBtb250aCkge1xuICAgICAgICByZWYgPSBtb250aCwgbW9udGggPSByZWYubW9udGgsIHllYXIgPSByZWYueWVhcjtcbiAgICAgIH1cbiAgICAgIGlmICghKG1vbnRoICYmIHllYXIpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIG1vbnRoID0gUUoudHJpbShtb250aCk7XG4gICAgICB5ZWFyID0gUUoudHJpbSh5ZWFyKTtcbiAgICAgIGlmICghL15cXGQrJC8udGVzdChtb250aCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKCEvXlxcZCskLy50ZXN0KHllYXIpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICghKHBhcnNlSW50KG1vbnRoLCAxMCkgPD0gMTIpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICh5ZWFyLmxlbmd0aCA9PT0gMikge1xuICAgICAgICBwcmVmaXggPSAobmV3IERhdGUpLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgIHByZWZpeCA9IHByZWZpeC50b1N0cmluZygpLnNsaWNlKDAsIDIpO1xuICAgICAgICB5ZWFyID0gcHJlZml4ICsgeWVhcjtcbiAgICAgIH1cbiAgICAgIGV4cGlyeSA9IG5ldyBEYXRlKHllYXIsIG1vbnRoKTtcbiAgICAgIGN1cnJlbnRUaW1lID0gbmV3IERhdGU7XG4gICAgICBleHBpcnkuc2V0TW9udGgoZXhwaXJ5LmdldE1vbnRoKCkgLSAxKTtcbiAgICAgIGV4cGlyeS5zZXRNb250aChleHBpcnkuZ2V0TW9udGgoKSArIDEsIDEpO1xuICAgICAgcmV0dXJuIGV4cGlyeSA+IGN1cnJlbnRUaW1lO1xuICAgIH0sXG4gICAgdmFsaWRhdGVDYXJkQ1ZDOiBmdW5jdGlvbihjdmMsIHR5cGUpIHtcbiAgICAgIHZhciByZWYsIHJlZjE7XG4gICAgICBjdmMgPSBRSi50cmltKGN2Yyk7XG4gICAgICBpZiAoIS9eXFxkKyQvLnRlc3QoY3ZjKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAodHlwZSAmJiBjYXJkRnJvbVR5cGUodHlwZSkpIHtcbiAgICAgICAgcmV0dXJuIHJlZiA9IGN2Yy5sZW5ndGgsIGluZGV4T2YuY2FsbCgocmVmMSA9IGNhcmRGcm9tVHlwZSh0eXBlKSkgIT0gbnVsbCA/IHJlZjEuY3ZjTGVuZ3RoIDogdm9pZCAwLCByZWYpID49IDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gY3ZjLmxlbmd0aCA+PSAzICYmIGN2Yy5sZW5ndGggPD0gNDtcbiAgICAgIH1cbiAgICB9LFxuICAgIGNhcmRUeXBlOiBmdW5jdGlvbihudW0pIHtcbiAgICAgIHZhciByZWY7XG4gICAgICBpZiAoIW51bSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIHJldHVybiAoKHJlZiA9IGNhcmRGcm9tTnVtYmVyKG51bSkpICE9IG51bGwgPyByZWYudHlwZSA6IHZvaWQgMCkgfHwgbnVsbDtcbiAgICB9LFxuICAgIGZvcm1hdENhcmROdW1iZXI6IGZ1bmN0aW9uKG51bSkge1xuICAgICAgdmFyIGNhcmQsIGdyb3VwcywgcmVmLCB1cHBlckxlbmd0aDtcbiAgICAgIGNhcmQgPSBjYXJkRnJvbU51bWJlcihudW0pO1xuICAgICAgaWYgKCFjYXJkKSB7XG4gICAgICAgIHJldHVybiBudW07XG4gICAgICB9XG4gICAgICB1cHBlckxlbmd0aCA9IGNhcmQubGVuZ3RoW2NhcmQubGVuZ3RoLmxlbmd0aCAtIDFdO1xuICAgICAgbnVtID0gbnVtLnJlcGxhY2UoL1xcRC9nLCAnJyk7XG4gICAgICBudW0gPSBudW0uc2xpY2UoMCwgK3VwcGVyTGVuZ3RoICsgMSB8fCA5ZTkpO1xuICAgICAgaWYgKGNhcmQuZm9ybWF0Lmdsb2JhbCkge1xuICAgICAgICByZXR1cm4gKHJlZiA9IG51bS5tYXRjaChjYXJkLmZvcm1hdCkpICE9IG51bGwgPyByZWYuam9pbignICcpIDogdm9pZCAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZ3JvdXBzID0gY2FyZC5mb3JtYXQuZXhlYyhudW0pO1xuICAgICAgICBpZiAoZ3JvdXBzICE9IG51bGwpIHtcbiAgICAgICAgICBncm91cHMuc2hpZnQoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZ3JvdXBzICE9IG51bGwgPyBncm91cHMuam9pbignICcpIDogdm9pZCAwO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBQYXltZW50LnJlc3RyaWN0TnVtZXJpYyA9IGZ1bmN0aW9uKGVsKSB7XG4gICAgcmV0dXJuIFFKLm9uKGVsLCAna2V5cHJlc3MnLCByZXN0cmljdE51bWVyaWMpO1xuICB9O1xuXG4gIFBheW1lbnQuY2FyZEV4cGlyeVZhbCA9IGZ1bmN0aW9uKGVsKSB7XG4gICAgcmV0dXJuIFBheW1lbnQuZm5zLmNhcmRFeHBpcnlWYWwoUUoudmFsKGVsKSk7XG4gIH07XG5cbiAgUGF5bWVudC5mb3JtYXRDYXJkQ1ZDID0gZnVuY3Rpb24oZWwpIHtcbiAgICBQYXltZW50LnJlc3RyaWN0TnVtZXJpYyhlbCk7XG4gICAgUUoub24oZWwsICdrZXlwcmVzcycsIHJlc3RyaWN0Q1ZDKTtcbiAgICByZXR1cm4gZWw7XG4gIH07XG5cbiAgUGF5bWVudC5mb3JtYXRDYXJkRXhwaXJ5ID0gZnVuY3Rpb24oZWwpIHtcbiAgICB2YXIgbW9udGgsIHllYXI7XG4gICAgUGF5bWVudC5yZXN0cmljdE51bWVyaWMoZWwpO1xuICAgIGlmIChlbC5sZW5ndGggJiYgZWwubGVuZ3RoID09PSAyKSB7XG4gICAgICBtb250aCA9IGVsWzBdLCB5ZWFyID0gZWxbMV07XG4gICAgICB0aGlzLmZvcm1hdENhcmRFeHBpcnlNdWx0aXBsZShtb250aCwgeWVhcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIFFKLm9uKGVsLCAna2V5cHJlc3MnLCByZXN0cmljdENvbWJpbmVkRXhwaXJ5KTtcbiAgICAgIFFKLm9uKGVsLCAna2V5cHJlc3MnLCBmb3JtYXRFeHBpcnkpO1xuICAgICAgUUoub24oZWwsICdrZXlwcmVzcycsIGZvcm1hdEZvcndhcmRTbGFzaCk7XG4gICAgICBRSi5vbihlbCwgJ2tleXByZXNzJywgZm9ybWF0Rm9yd2FyZEV4cGlyeSk7XG4gICAgICBRSi5vbihlbCwgJ2tleWRvd24nLCBmb3JtYXRCYWNrRXhwaXJ5KTtcbiAgICB9XG4gICAgcmV0dXJuIGVsO1xuICB9O1xuXG4gIFBheW1lbnQuZm9ybWF0Q2FyZEV4cGlyeU11bHRpcGxlID0gZnVuY3Rpb24obW9udGgsIHllYXIpIHtcbiAgICBRSi5vbihtb250aCwgJ2tleXByZXNzJywgcmVzdHJpY3RNb250aEV4cGlyeSk7XG4gICAgUUoub24obW9udGgsICdrZXlwcmVzcycsIGZvcm1hdE1vbnRoRXhwaXJ5KTtcbiAgICByZXR1cm4gUUoub24oeWVhciwgJ2tleXByZXNzJywgcmVzdHJpY3RZZWFyRXhwaXJ5KTtcbiAgfTtcblxuICBQYXltZW50LmZvcm1hdENhcmROdW1iZXIgPSBmdW5jdGlvbihlbCkge1xuICAgIFBheW1lbnQucmVzdHJpY3ROdW1lcmljKGVsKTtcbiAgICBRSi5vbihlbCwgJ2tleXByZXNzJywgcmVzdHJpY3RDYXJkTnVtYmVyKTtcbiAgICBRSi5vbihlbCwgJ2tleXByZXNzJywgZm9ybWF0Q2FyZE51bWJlcik7XG4gICAgUUoub24oZWwsICdrZXlkb3duJywgZm9ybWF0QmFja0NhcmROdW1iZXIpO1xuICAgIFFKLm9uKGVsLCAna2V5dXAnLCBzZXRDYXJkVHlwZSk7XG4gICAgUUoub24oZWwsICdwYXN0ZScsIHJlRm9ybWF0Q2FyZE51bWJlcik7XG4gICAgcmV0dXJuIGVsO1xuICB9O1xuXG4gIFBheW1lbnQuZ2V0Q2FyZEFycmF5ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGNhcmRzO1xuICB9O1xuXG4gIFBheW1lbnQuc2V0Q2FyZEFycmF5ID0gZnVuY3Rpb24oY2FyZEFycmF5KSB7XG4gICAgY2FyZHMgPSBjYXJkQXJyYXk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgUGF5bWVudC5hZGRUb0NhcmRBcnJheSA9IGZ1bmN0aW9uKGNhcmRPYmplY3QpIHtcbiAgICByZXR1cm4gY2FyZHMucHVzaChjYXJkT2JqZWN0KTtcbiAgfTtcblxuICBQYXltZW50LnJlbW92ZUZyb21DYXJkQXJyYXkgPSBmdW5jdGlvbih0eXBlKSB7XG4gICAgdmFyIGtleSwgdmFsdWU7XG4gICAgZm9yIChrZXkgaW4gY2FyZHMpIHtcbiAgICAgIHZhbHVlID0gY2FyZHNba2V5XTtcbiAgICAgIGlmICh2YWx1ZS50eXBlID09PSB0eXBlKSB7XG4gICAgICAgIGNhcmRzLnNwbGljZShrZXksIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICByZXR1cm4gUGF5bWVudDtcblxufSkoKTtcblxubW9kdWxlLmV4cG9ydHMgPSBQYXltZW50O1xuXG5nbG9iYWwuUGF5bWVudCA9IFBheW1lbnQ7XG5cblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG59LHtcInFqL3NyYy9xai5jb2ZmZWVcIjoxfV19LHt9LFsyXSkoMilcbn0pOyIsIi8vIE1pbm5Qb3N0IEdpdmluZyBwbHVnaW5cbi8vIHRoZSBzZW1pLWNvbG9uIGJlZm9yZSBmdW5jdGlvbiBpbnZvY2F0aW9uIGlzIGEgc2FmZXR5IG5ldCBhZ2FpbnN0IGNvbmNhdGVuYXRlZFxuLy8gc2NyaXB0cyBhbmQvb3Igb3RoZXIgcGx1Z2lucyB3aGljaCBtYXkgbm90IGJlIGNsb3NlZCBwcm9wZXJseS5cbjsoZnVuY3Rpb24gKCAkLCB3aW5kb3csIGRvY3VtZW50LCB1bmRlZmluZWQgKSB7XG5cbiAgLy8gdW5kZWZpbmVkIGlzIHVzZWQgaGVyZSBhcyB0aGUgdW5kZWZpbmVkIGdsb2JhbCB2YXJpYWJsZSBpbiBFQ01BU2NyaXB0IDMgaXNcbiAgLy8gbXV0YWJsZSAoaWUuIGl0IGNhbiBiZSBjaGFuZ2VkIGJ5IHNvbWVvbmUgZWxzZSkuIHVuZGVmaW5lZCBpc24ndCByZWFsbHkgYmVpbmdcbiAgLy8gcGFzc2VkIGluIHNvIHdlIGNhbiBlbnN1cmUgdGhlIHZhbHVlIG9mIGl0IGlzIHRydWx5IHVuZGVmaW5lZC4gSW4gRVM1LCB1bmRlZmluZWRcbiAgLy8gY2FuIG5vIGxvbmdlciBiZSBtb2RpZmllZC5cblxuICAvLyB3aW5kb3cgYW5kIGRvY3VtZW50IGFyZSBwYXNzZWQgdGhyb3VnaCBhcyBsb2NhbCB2YXJpYWJsZSByYXRoZXIgdGhhbiBnbG9iYWxcbiAgLy8gYXMgdGhpcyAoc2xpZ2h0bHkpIHF1aWNrZW5zIHRoZSByZXNvbHV0aW9uIHByb2Nlc3MgYW5kIGNhbiBiZSBtb3JlIGVmZmljaWVudGx5XG4gIC8vIG1pbmlmaWVkIChlc3BlY2lhbGx5IHdoZW4gYm90aCBhcmUgcmVndWxhcmx5IHJlZmVyZW5jZWQgaW4geW91ciBwbHVnaW4pLlxuXG4gIC8vIENyZWF0ZSB0aGUgZGVmYXVsdHMgb25jZVxuICB2YXIgcGx1Z2luTmFtZSA9ICdtaW5ucG9zdF9naXZpbmcnLFxuICBkZWZhdWx0cyA9IHtcbiAgICAnZGVidWcnIDogZmFsc2UsIC8vIHRoaXMgY2FuIGJlIHNldCB0byB0cnVlIG9uIHBhZ2UgbGV2ZWwgb3B0aW9uc1xuICAgICdzdHJpcGVfcHVibGlzaGFibGVfa2V5JyA6ICcnLFxuICAgICdwbGFpZF9lbnYnIDogJycsXG4gICAgJ3BsYWlkX3B1YmxpY19rZXknIDogJycsXG4gICAgJ3BsYWlkX2xpbmsnIDogJyNhdXRob3JpemUtYWNoJyxcbiAgICAnbWlubnBvc3Rfcm9vdCcgOiAnaHR0cHM6Ly93d3cubWlubnBvc3QuY29tJyxcbiAgICAnZG9uYXRlX2Zvcm1fc2VsZWN0b3InOiAnI2RvbmF0ZScsXG4gICAgJ2RvbmF0ZV9zdGVwX3NlbGVjdG9yJyA6ICcjcGFuZWwtLXBheScsXG4gICAgJ2NvbmZpcm1fZm9ybV9zZWxlY3RvcicgOiAnI2NvbmZpcm0nLFxuICAgICdjb25maXJtX3N0ZXBfc2VsZWN0b3InIDogJyNwYW5lbC0tY29uZmlybWF0aW9uJyxcbiAgICAnYWN0aXZlJyA6ICdwYW5lbC0tcGF5JyxcbiAgICAnY29uZmlybScgOiAncGFuZWwtLWNvbmZpcm1hdGlvbicsXG4gICAgJ3F1ZXJ5JyA6ICdzdGVwJyxcbiAgICAncGF5X2NjX3Byb2Nlc3Npbmdfc2VsZWN0b3InIDogJ2lucHV0W2lkPVwicGF5LWZlZXNcIl0nLFxuICAgICdmZWVfYW1vdW50JyA6ICcucHJvY2Vzc2luZy1hbW91bnQnLFxuICAgICdsZXZlbF9hbW91bnRfc2VsZWN0b3InIDogJyNwYW5lbC0tcGF5IC5hbW91bnQgLmxldmVsLWFtb3VudCcsIC8vIHdlIGNhbiBtYXliZSBnZXQgcmlkIG9mIHRoaXNcbiAgICAnb3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yJyA6ICdbbmFtZT1cImFtb3VudFwiXScsXG4gICAgJ2ZhaXJfbWFya2V0X3ZhbHVlX3NlbGVjdG9yJyA6ICcjZmFpcl9tYXJrZXRfdmFsdWUnLFxuICAgICdmcmVxdWVuY3lfc2VsZWN0b3InIDogJy5mcmVxdWVuY3knLFxuICAgICdmdWxsX2Ftb3VudF9zZWxlY3RvcicgOiAnLmZ1bGwtYW1vdW50JyxcbiAgICAnbmFtZV9zZWxlY3RvcicgOiAnLmZvcm0taXRlbS0tZGlzcGxheS1uYW1lJyxcbiAgICAnaW5faG9ub3Jfb3JfbWVtb3J5X2ZpZWxkX3NlbGVjdG9yJyA6ICcuZm9ybS1pdGVtLS1ob25vci1tZW1vcnknLFxuICAgICdob25vcl9vcl9tZW1vcnlfY2hvb3NlcicgOiAnaW5wdXRbbmFtZT1cImluX2hvbm9yX29yX21lbW9yeVwiXScsIC8vIHJhZGlvIGZpZWxkc1xuICAgICdob25vcl90eXBlX3NlbGVjdG9yJyA6ICcuaG9ub3JfdHlwZScsIC8vIHNwYW4gaW5zaWRlIGxhYmVsXG4gICAgJ2hvbm9yX21lbW9yeV9pbnB1dF9ncm91cCcgOiAnLmhvbm9yLW9yLW1lbW9yeScsIC8vIGhvbGRzIHRoZSBmb3JtIGZpZWxkXG4gICAgJ25vdGlmeV9zZWxlY3RvcicgOiAnLm5vdGlmeV9zb21lb25lJyxcbiAgICAnbm90aWZ5X2ZpZWxkX3NlbGVjdG9yJyA6ICcuZm9ybS1pdGVtLS1ub3RpZnknLFxuICAgICdhbm9ueW1vdXNfc2VsZWN0b3InIDogJyNhbm9ueW1vdXMnLFxuICAgICdzaG93X2JpbGxpbmdfY291bnRyeV9zZWxlY3RvcicgOiAnI2JpbGxpbmdfc2hvd19jb3VudHJ5JyxcbiAgICAnYmlsbGluZ19jb3VudHJ5X3NlbGVjdG9yJyA6ICcuZm9ybS1pdGVtLS1jb3VudHJ5JyxcbiAgICAnc2hvd19zaGlwcGluZ19jb3VudHJ5X3NlbGVjdG9yJyA6ICcjc2hpcHBpbmdfc2hvd19jb3VudHJ5JyxcbiAgICAnc2hpcHBpbmdfY291bnRyeV9zZWxlY3RvcicgOiAnLmZvcm0taXRlbS0tc2hpcHBpbmctY291bnRyeScsXG4gICAgJ3NoaXBwaW5nX2FkZHJlc3Nfc2VsZWN0b3InIDogJy5mb3JtLWl0ZW0tLXNoaXBwaW5nLWFkZHJlc3MnLFxuICAgICd1c2VfZm9yX3NoaXBwaW5nX3NlbGVjdG9yJyA6ICcjdXNlZm9yc2hpcHBpbmcnLFxuICAgICdlbWFpbF9maWVsZF9zZWxlY3RvcicgOiAnI2VtYWlsJyxcbiAgICAncGFzc3dvcmRfZmllbGRfc2VsZWN0b3InIDogJyNwYXNzd29yZCcsXG4gICAgJ2ZpcnN0X25hbWVfZmllbGRfc2VsZWN0b3InIDogJyNmaXJzdF9uYW1lJyxcbiAgICAnbGFzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yJyA6ICcjbGFzdF9uYW1lJyxcbiAgICAnYWNjb3VudF9jaXR5X3NlbGVjdG9yJyA6ICcjYmlsbGluZ19jaXR5JyxcbiAgICAnYWNjb3VudF9zdGF0ZV9zZWxlY3RvcicgOiAnI2JpbGxpbmdfc3RhdGUnLFxuICAgICdhY2NvdW50X3ppcF9zZWxlY3RvcicgOiAnI2JpbGxpbmdfemlwJyxcbiAgICAnY3JlYXRlX21wX3NlbGVjdG9yJyA6ICcjY3JlYXRlbXBhY2NvdW50JyxcbiAgICAncGFzc3dvcmRfc2VsZWN0b3InIDogJy5mb3JtLWl0ZW0tLXBhc3N3b3JkJyxcbiAgICAnYWRkaXRpb25hbF9hbW91bnRfZmllbGQnIDogJyNhZGRpdGlvbmFsX2RvbmF0aW9uJyxcbiAgICAnYmlsbGluZ19zZWxlY3RvcicgOiAnZmllbGRzZXQuYmlsbGluZycsXG4gICAgJ3NoaXBwaW5nX3NlbGVjdG9yJyA6ICdmaWVsZHNldC5zaGlwcGluZycsXG4gICAgJ2NyZWRpdF9jYXJkX2ZpZWxkc2V0JyA6ICcucGF5bWVudC1tZXRob2QtZ3JvdXAnLFxuICAgICdjaG9vc2VfcGF5bWVudCcgOiAnI2Nob29zZS1wYXltZW50LW1ldGhvZCcsXG4gICAgJ3BheW1lbnRfbWV0aG9kX3NlbGVjdG9yJyA6ICcucGF5bWVudC1tZXRob2QnLFxuICAgICdjY19udW1fc2VsZWN0b3InIDogJyNjYXJkLW51bWJlcicsXG4gICAgJ2NjX2V4cF9zZWxlY3RvcicgOiAnI2NhcmQtZXhwaXJ5JyxcbiAgICAnY2NfY3Z2X3NlbGVjdG9yJyA6ICcjY2FyZC1jdmMnLFxuICAgICdwYXltZW50X2J1dHRvbl9zZWxlY3RvcicgOiAnI3N1Ym1pdCcsXG4gICAgJ2NvbmZpcm1fYnV0dG9uX3NlbGVjdG9yJyA6ICcjZmluaXNoJyxcbiAgICAnb3BwX2lkX3NlbGVjdG9yJyA6ICcjbG9ja19rZXknLCAvLyB3ZSB1c2UgdGhpcyB2YWx1ZSBhcyB0aGUgR29vZ2xlIEFuYWx5dGljcyB0cmFuc2FjdGlvbiBJRFxuICAgICdyZWN1cnJpbmdfc2VsZWN0b3InIDogJyNyZWN1cnJpbmcnLFxuICAgICduZXdzbGV0dGVyX2dyb3VwX3NlbGVjdG9yJyA6ICcuc3VwcG9ydC1uZXdzbGV0dGVycycsXG4gICAgJ3JlYXNvbl9maWVsZF9zZWxlY3RvcicgOiAnI3JlYXNvbl9mb3Jfc3VwcG9ydGluZycsXG4gICAgJ3NoYXJlX3JlYXNvbl9zZWxlY3RvcicgOiAnI3JlYXNvbl9zaGFyZWFibGUnLFxuICAgICdjb25maXJtX3RvcF9zZWxlY3RvcicgOiAnLnN1cHBvcnQtLXBvc3QtY29uZmlybScsXG4gICAgJ2V4aXN0aW5nX25ld3NsZXR0ZXJfc2V0dGluZ3MnIDogJycsXG4gICAgJ2xldmVscycgOiB7XG4gICAgICAxIDoge1xuICAgICAgICAnbmFtZScgOiAnYnJvbnplJyxcbiAgICAgICAgJ21heCcgOiA2MFxuICAgICAgfSxcbiAgICAgIDIgOiB7XG4gICAgICAgICduYW1lJyA6ICdzaWx2ZXInLFxuICAgICAgICAnbWluJyA6IDYwLFxuICAgICAgICAnbWF4JyA6IDEyMFxuICAgICAgfSxcbiAgICAgIDMgOiB7XG4gICAgICAgICduYW1lJyA6ICdnb2xkJyxcbiAgICAgICAgJ21pbicgOiAxMjAsXG4gICAgICAgICdtYXgnIDogMjQwXG4gICAgICB9LFxuICAgICAgNCA6IHtcbiAgICAgICAgJ25hbWUnIDogJ3BsYXRpbnVtJyxcbiAgICAgICAgJ21pbicgOiAyNDBcbiAgICAgIH1cbiAgICB9XG5cbiAgfTsgLy8gZW5kIGRlZmF1bHRzXG5cbiAgLy8gVGhlIGFjdHVhbCBwbHVnaW4gY29uc3RydWN0b3JcbiAgZnVuY3Rpb24gUGx1Z2luKCBlbGVtZW50LCBvcHRpb25zICkge1xuXG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcblxuICAgIC8vIGpRdWVyeSBoYXMgYW4gZXh0ZW5kIG1ldGhvZCB3aGljaCBtZXJnZXMgdGhlIGNvbnRlbnRzIG9mIHR3byBvclxuICAgIC8vIG1vcmUgb2JqZWN0cywgc3RvcmluZyB0aGUgcmVzdWx0IGluIHRoZSBmaXJzdCBvYmplY3QuIFRoZSBmaXJzdCBvYmplY3RcbiAgICAvLyBpcyBnZW5lcmFsbHkgZW1wdHkgYXMgd2UgZG9uJ3Qgd2FudCB0byBhbHRlciB0aGUgZGVmYXVsdCBvcHRpb25zIGZvclxuICAgIC8vIGZ1dHVyZSBpbnN0YW5jZXMgb2YgdGhlIHBsdWdpblxuICAgIHRoaXMub3B0aW9ucyA9ICQuZXh0ZW5kKCB7fSwgZGVmYXVsdHMsIG9wdGlvbnMgKTtcblxuICAgIHRoaXMuX2RlZmF1bHRzID0gZGVmYXVsdHM7XG4gICAgdGhpcy5fbmFtZSA9IHBsdWdpbk5hbWU7XG5cbiAgICB0aGlzLmluaXQoKTtcbiAgfSAvLyBlbmQgY29uc3RydWN0b3JcblxuICBQbHVnaW4ucHJvdG90eXBlID0ge1xuXG4gICAgaW5pdDogZnVuY3Rpb24ocmVzZXQsIGFtb3VudCkge1xuXG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoICduby1qcycgKTtcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCggJ2pzJyApO1xuXG4gICAgICAvLyBQbGFjZSBpbml0aWFsaXphdGlvbiBsb2dpYyBoZXJlXG4gICAgICAvLyBZb3UgYWxyZWFkeSBoYXZlIGFjY2VzcyB0byB0aGUgRE9NIGVsZW1lbnQgYW5kXG4gICAgICAvLyB0aGUgb3B0aW9ucyB2aWEgdGhlIGluc3RhbmNlLCBlLmcuIHRoaXMuZWxlbWVudFxuICAgICAgLy8gYW5kIHRoaXMub3B0aW9uc1xuICAgICAgLy8geW91IGNhbiBhZGQgbW9yZSBmdW5jdGlvbnMgbGlrZSB0aGUgb25lIGJlbG93IGFuZFxuICAgICAgLy8gY2FsbCB0aGVtIGxpa2Ugc286IHRoaXMueW91ck90aGVyRnVuY3Rpb24odGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpLlxuXG4gICAgICAvLyBtb2RpZnkgb3B0aW9ucyBhcyBuZWVkZWRcbiAgICAgIC8vdmFyIHRoaXMub3B0aW9ucy5hbW91bnQgPSAnJztcbiAgICAgIGlmIChyZXNldCAhPT0gdHJ1ZSkge1xuICAgICAgICB0aGlzLm9wdGlvbnMuYW1vdW50ID0gcGFyc2VGbG9hdCgkKHRoaXMub3B0aW9ucy5sZXZlbF9hbW91bnRfc2VsZWN0b3IsIHRoaXMuZWxlbWVudCkudGV4dCgpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5hbW91bnQgPSBhbW91bnQ7XG4gICAgICB9XG4gICAgICB0aGlzLm9wdGlvbnMub3JpZ2luYWxfYW1vdW50ID0gcGFyc2VJbnQoJCh0aGlzLm9wdGlvbnMub3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yLCB0aGlzLmVsZW1lbnQpLnZhbCgpLCAxMCk7XG4gICAgICB0aGlzLm9wdGlvbnMuZnJlcXVlbmN5ID0gcGFyc2VGbG9hdCgkKHRoaXMub3B0aW9ucy5mcmVxdWVuY3lfc2VsZWN0b3IsIHRoaXMuZWxlbWVudCkuYXR0cignZGF0YS15ZWFyLWZyZXEnKSk7XG4gICAgICB2YXIgcmVjdXJyaW5nID0gJCh0aGlzLm9wdGlvbnMucmVjdXJyaW5nX3NlbGVjdG9yLCB0aGlzLmVsZW1lbnQpLnZhbCgpO1xuICAgICAgaWYgKHR5cGVvZiByZWN1cnJpbmcgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5yZWN1cnJpbmcgPSByZWN1cnJpbmcuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyByZWN1cnJpbmcuc2xpY2UoMSk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIHRoaXMub3B0aW9ucy5wcm9jZXNzaW5nX2ZlZSA9IChNYXRoLnJvdW5kKHBhcnNlRmxvYXQodGhpcy5vcHRpb25zLmZlZV9hbW91bnQpKk1hdGgucG93KDEwLDIpKS9NYXRoLnBvdygxMCwyKSkudG9GaXhlZCgyKTtcbiAgICAgIHRoaXMub3B0aW9ucy5wcm9jZXNzaW5nX2ZlZV90ZXh0ID0gdGhpcy5vcHRpb25zLnByb2Nlc3NpbmdfZmVlO1xuICAgICAgXG4gICAgICB0aGlzLm9wdGlvbnMuY2FyZFR5cGUgPSBudWxsO1xuICAgICAgdGhpcy5vcHRpb25zLmNyZWF0ZV9hY2NvdW50ID0gZmFsc2U7XG5cbiAgICAgIHZhciBidXR0b25fdGV4dCA9ICQoJ2J1dHRvbi5naXZlLCBpbnB1dC5naXZlJykudGV4dCgpO1xuICAgICAgdGhpcy5vcHRpb25zLmJ1dHRvbl90ZXh0ID0gYnV0dG9uX3RleHQ7XG5cbiAgICAgIHRoaXMuc3RyaXBlID0gU3RyaXBlKHRoaXMub3B0aW9ucy5zdHJpcGVfcHVibGlzaGFibGVfa2V5KTtcbiAgICAgIHRoaXMuZWxlbWVudHMgPSB0aGlzLnN0cmlwZS5lbGVtZW50cygpO1xuXG4gICAgICAvLyB1c2UgYSByZWZlcnJlciBmb3IgZWRpdCBsaW5rIGlmIHdlIGhhdmUgb25lXG4gICAgICBpZiAoZG9jdW1lbnQucmVmZXJyZXIgIT09ICcnKSB7XG4gICAgICAgICQoJyNlZGl0X3VybCcpLnByb3AoJ2hyZWYnLCBkb2N1bWVudC5yZWZlcnJlcik7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuZGVidWcgPT09IHRydWUpIHtcbiAgICAgICAgdGhpcy5kZWJ1Zyh0aGlzLm9wdGlvbnMpO1xuICAgICAgICAvLyByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIHRhYiBzdHVmZlxuICAgICAgdmFyIHF1ZXJ5X3BhbmVsID0gdGhpcy5xc1t0aGlzLm9wdGlvbnMucXVlcnldO1xuICAgICAgaWYgKHR5cGVvZiBxdWVyeV9wYW5lbCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcXVlcnlfcGFuZWwgPSB0aGlzLm9wdGlvbnMuYWN0aXZlO1xuICAgICAgfVxuXG4gICAgICAvLyBjYWxsIGZ1bmN0aW9uc1xuXG4gICAgICB0aGlzLnRhYk5hdmlnYXRpb24ocXVlcnlfcGFuZWwpOyAvLyBuYXZpZ2F0aW5nXG5cbiAgICAgIHRoaXMuYW1vdW50QXNSYWRpbyh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIGlmIHRoZSBhbW91bnQgZmllbGQgaXMgYSByYWRpbyBidXR0b25cbiAgICAgIHRoaXMuYW1vdW50VXBkYXRlZCh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIGlmIHRoZSBhbW91bnQgdGV4dCBmaWVsZCBjYW4gY2hhbmdlXG5cbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5wYXlfY2NfcHJvY2Vzc2luZ19zZWxlY3RvcikubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLmNyZWRpdENhcmRQcm9jZXNzaW5nRmVlcyh0aGlzLm9wdGlvbnMsIHJlc2V0KTsgLy8gcHJvY2Vzc2luZyBmZWVzXG4gICAgICB9XG4gICAgICBcbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5kb25hdGVfc3RlcF9zZWxlY3RvcikubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLm9wdGlvbnMubGV2ZWwgPSB0aGlzLmNoZWNrTGV2ZWwodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMsICduYW1lJyk7IC8vIGNoZWNrIHdoYXQgbGV2ZWwgaXQgaXNcbiAgICAgICAgdGhpcy5vcHRpb25zLmxldmVsbnVtID0gdGhpcy5jaGVja0xldmVsKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zLCAnbnVtJyk7IC8vIGNoZWNrIHdoYXQgbGV2ZWwgaXQgaXMgYXMgYSBudW1iZXJcbiAgICAgICAgdGhpcy5kb25hdGVBbm9ueW1vdXNseSh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIGFub255bW91c1xuICAgICAgICB0aGlzLmhvbm9yT3JNZW1vcnlUb2dnbGUodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBpbiBob25vciBvciBpbiBtZW1vcnkgb2Ygc29tZW9uZVxuICAgICAgICB0aGlzLm91dHNpZGVVbml0ZWRTdGF0ZXModGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBvdXRzaWRlIFVTXG4gICAgICAgIHRoaXMuc2hpcHBpbmdBZGRyZXNzKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gc2hpcHBpbmcgYWRkcmVzc1xuICAgICAgICB0aGlzLmFsbG93TWlubnBvc3RBY2NvdW50KHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zLCBmYWxzZSk7IC8vIG9wdGlvbiBmb3IgY3JlYXRpbmcgbWlubnBvc3QgYWNjb3VudFxuICAgICAgICB0aGlzLmNob29zZVBheW1lbnRNZXRob2QodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBzd2l0Y2ggYmV0d2VlbiBjYXJkIGFuZCBhY2hcbiAgICAgICAgdGhpcy5jcmVkaXRDYXJkRmllbGRzKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gZG8gc3R1ZmYgd2l0aCB0aGUgY3JlZGl0IGNhcmQgZmllbGRzXG4gICAgICAgIHRoaXMuYWNoRmllbGRzKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gZG8gc3R1ZmYgZm9yIGFjaCBwYXltZW50cywgaWYgYXBwbGljYWJsZSB0byB0aGUgZm9ybVxuICAgICAgICB0aGlzLnZhbGlkYXRlQW5kU3VibWl0KHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gdmFsaWRhdGUgYW5kIHN1Ym1pdCB0aGUgZm9ybVxuICAgICAgfVxuXG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuY29uZmlybV9zdGVwX3NlbGVjdG9yKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuc2hvd05ld3NsZXR0ZXJTZXR0aW5ncyh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7XG4gICAgICAgIHRoaXMuY29uZmlybU1lc3NhZ2VTdWJtaXQodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBzdWJtaXQgdGhlIHN0dWZmIG9uIHRoZSBjb25maXJtYXRpb24gcGFnZVxuICAgICAgfVxuXG4gICAgfSwgLy8gaW5pdFxuXG4gICAgcXM6IChmdW5jdGlvbihhKSB7XG4gICAgICBpZiAoYSA9PT0gJycpIHtcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgfVxuICAgICAgdmFyIGIgPSB7fTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYS5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIgcD1hW2ldLnNwbGl0KCc9JywgMik7XG4gICAgICAgIGlmIChwLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgIGJbcFswXV0gPSAnJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBiW3BbMF1dID0gZGVjb2RlVVJJQ29tcG9uZW50KHBbMV0ucmVwbGFjZSgvXFwrL2csICcgJykpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gYjtcbiAgICB9KSh3aW5kb3cubG9jYXRpb24uc2VhcmNoLnN1YnN0cigxKS5zcGxpdCgnJicpKSxcblxuICAgIGRlYnVnOiBmdW5jdGlvbihtZXNzYWdlKSB7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLmRlYnVnID09PSB0cnVlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgbWVzc2FnZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhtZXNzYWdlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmRpcihtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmRpcih0aGlzKTtcbiAgICAgIH1cbiAgICB9LCAvLyBkZWJ1Z1xuXG4gICAgZ2V0UXVlcnlTdHJpbmdzOiBmdW5jdGlvbihsaW5rKSB7XG4gICAgICBpZiAodHlwZW9mIGxpbmsgPT09ICd1bmRlZmluZWQnIHx8IGxpbmsgPT09ICcnKSB7XG4gICAgICAgIHJldHVybiB7fTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxpbmsgPSAnPycgKyBsaW5rLnNwbGl0KCc/JylbMV07XG4gICAgICAgIGxpbmsgPSBsaW5rLnN1YnN0cigxKS5zcGxpdCgnJicpO1xuICAgICAgfVxuICAgICAgdmFyIGIgPSB7fTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGluay5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIgcD1saW5rW2ldLnNwbGl0KCc9JywgMik7XG4gICAgICAgIGlmIChwLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgIGJbcFswXV0gPSAnJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBiW3BbMF1dID0gZGVjb2RlVVJJQ29tcG9uZW50KHBbMV0ucmVwbGFjZSgvXFwrL2csICcgJykpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gYjtcbiAgICB9LCAvLyBnZXRRdWVyeVN0cmluZ3NcblxuICAgIHRhYk5hdmlnYXRpb246IGZ1bmN0aW9uKGFjdGl2ZSkge1xuICAgICAgdmFyIHN0ZXAgPSAkKCcucHJvZ3Jlc3MtLWRvbmF0aW9uIGxpLicgKyBhY3RpdmUpLmluZGV4KCkgKyAxO1xuICAgICAgdmFyIG5hdl9pdGVtX2NvdW50ID0gJCgnLnByb2dyZXNzLS1kb25hdGlvbiBsaScpLmxlbmd0aDtcbiAgICAgIHZhciBvcHBfaWQgPSAkKHRoaXMub3B0aW9ucy5vcHBfaWRfc2VsZWN0b3IpLnZhbCgpO1xuICAgICAgdmFyIG5leHRfc3RlcCA9IHN0ZXAgKyAxO1xuICAgICAgdmFyIHBvc3RfcHVyY2hhc2UgPSBmYWxzZTtcblxuICAgICAgLy8gd2Ugd2lsbCBoYXZlIHRvIHVwZGF0ZSB0aGlzIGJlY2F1c2Ugbm8gbW9yZSBmbGFzayBpZFxuXG4gICAgICB0aGlzLmRlYnVnKCAnc3RlcCBpcyAnICsgc3RlcCArICcgYW5kIG5hdiBpdGVtIGNvdW50IGlzICcgKyBuYXZfaXRlbV9jb3VudCArICcgYW5kIG9wcCBpZCBpcyAnICsgb3BwX2lkICsgJyBhbmQgbmV4dCBzdGVwIGlzICcgKyBuZXh0X3N0ZXAgKTtcblxuICAgICAgLy8gdGhpcyBpcyB0aGUgbGFzdCB2aXNpYmxlIHN0ZXBcbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5jb25maXJtX3N0ZXBfc2VsZWN0b3IpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgYWN0aXZlID0gdGhpcy5vcHRpb25zLmNvbmZpcm07XG4gICAgICAgICQoJy5wcm9ncmVzcy0tZG9uYXRpb24gbGkuJyArIGFjdGl2ZSArICcgc3BhbicpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgc3RlcCA9ICQoJy5wcm9ncmVzcy0tZG9uYXRpb24gbGkuJyArIGFjdGl2ZSkuaW5kZXgoKSArIDE7XG4gICAgICAgIC8vIHRoZXJlIGlzIGEgY29udGludWF0aW9uIG9mIHRoZSBtYWluIGZvcm0gb24gdGhpcyBwYWdlLiB0aGVyZSBpcyBhIGJ1dHRvbiB0byBjbGlja1xuICAgICAgICAvLyB0aGlzIG1lYW5zIHRoZXJlIGlzIGFub3RoZXIgc3RlcFxuICAgICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuY29uZmlybV9idXR0b25fc2VsZWN0b3IpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBuYXZfaXRlbV9jb3VudCArPSAxO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGVwID09PSBuYXZfaXRlbV9jb3VudCAtIDEgJiYgJCh0aGlzLm9wdGlvbnMub3BwX2lkX3NlbGVjdG9yKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuZGVidWcoJ3RoaXMgaXMgYSBwYXltZW50IHN0ZXAgYnV0IHRoZXJlIGlzIGEgc3RlcCBhZnRlciBpdCcpO1xuICAgICAgICBzdGVwID0gJ3B1cmNoYXNlJztcbiAgICAgIH0gZWxzZSBpZiAoc3RlcCA9PT0gbmF2X2l0ZW1fY291bnQgJiYgJCh0aGlzLm9wdGlvbnMub3BwX2lkX3NlbGVjdG9yKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuZGVidWcoJ3RoaXMgaXMgYSBwYXltZW50IHN0ZXAgYW5kIHRoZXJlIGlzIG5vIHN0ZXAgYWZ0ZXIgaXQnKTtcbiAgICAgICAgc3RlcCA9ICdwdXJjaGFzZSc7XG4gICAgICB9IGVsc2UgaWYgKHN0ZXAgPT09IG5hdl9pdGVtX2NvdW50ICYmICQodGhpcy5vcHRpb25zLm9wcF9pZF9zZWxlY3RvcikubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHRoaXMuZGVidWcoJ3RoaXMgaXMgYSBwb3N0LWZpbmlzaCBzdGVwLiBpdCBkb2VzIG5vdCBoYXZlIGFuIGlkJyk7XG4gICAgICAgIHN0ZXAgPSBzdGVwICsgMTtcbiAgICAgICAgcG9zdF9wdXJjaGFzZSA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuYW5hbHl0aWNzVHJhY2tpbmdTdGVwKHN0ZXAsIHBvc3RfcHVyY2hhc2UpO1xuXG4gICAgICAvLyBhY3RpdmF0ZSB0aGUgbmF2IHRhYnNcbiAgICAgIGlmICgkKCcucHJvZ3Jlc3MtLWRvbmF0aW9uIGxpIC5hY3RpdmUnKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgJCgnIycgKyBhY3RpdmUpLnNob3coKTtcbiAgICAgICAgJCgnLnByb2dyZXNzLS1kb25hdGlvbiBsaS4nICsgYWN0aXZlICsgJyBhJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWN0aXZlID0gJCgnLnByb2dyZXNzLS1kb25hdGlvbiBsaSAuYWN0aXZlJykucGFyZW50KCkucHJvcCgnY2xhc3MnKTtcbiAgICAgICAgJCgnIycgKyBhY3RpdmUpLnNob3coKTtcbiAgICAgIH1cblxuICAgIH0sIC8vIHRhYk5hdmlnYXRpb25cblxuICAgIGFuYWx5dGljc1RyYWNraW5nU3RlcDogZnVuY3Rpb24oc3RlcCwgcG9zdF9wdXJjaGFzZSkge1xuICAgICAgdmFyIGxldmVsID0gdGhpcy5jaGVja0xldmVsKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zLCAnbmFtZScpOyAvLyBjaGVjayB3aGF0IGxldmVsIGl0IGlzXG4gICAgICB2YXIgYW1vdW50ID0gJCh0aGlzLm9wdGlvbnMub3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yKS52YWwoKTtcbiAgICAgIHZhciByZWN1cnJpbmcgPSB0aGlzLm9wdGlvbnMucmVjdXJyaW5nO1xuICAgICAgdmFyIG9wcF9pZCA9ICQodGhpcy5vcHRpb25zLm9wcF9pZF9zZWxlY3RvcikudmFsKCk7XG5cbiAgICAgIC8vIGlmIHdlJ3JlIG5vdCBhZnRlciB0aGUgcHVyY2hhc2UsIHVzZSBhZGRQcm9kdWN0XG4gICAgICBpZiAoIHBvc3RfcHVyY2hhc2UgIT09IHRydWUgKSB7XG4gICAgICAgIGdhKCdlYzphZGRQcm9kdWN0Jywge1xuICAgICAgICAgICdpZCc6ICdtaW5ucG9zdF8nICsgbGV2ZWwudG9Mb3dlckNhc2UoKSArICdfbWVtYmVyc2hpcCcsXG4gICAgICAgICAgJ25hbWUnOiAnTWlublBvc3QgJyArIGxldmVsLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgbGV2ZWwuc2xpY2UoMSkgKyAnIE1lbWJlcnNoaXAnLFxuICAgICAgICAgICdjYXRlZ29yeSc6ICdEb25hdGlvbicsXG4gICAgICAgICAgJ2JyYW5kJzogJ01pbm5Qb3N0JyxcbiAgICAgICAgICAndmFyaWFudCc6ICByZWN1cnJpbmcsXG4gICAgICAgICAgJ3ByaWNlJzogYW1vdW50LFxuICAgICAgICAgICdxdWFudGl0eSc6IDFcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGVwID09PSAncHVyY2hhc2UnKSB7XG4gICAgICAgIHRoaXMuZGVidWcoJ2FkZCBhIHB1cmNoYXNlIGFjdGlvbi4gc3RlcCBpcyAnICsgc3RlcCk7XG4gICAgICAgIGdhKCdlYzpzZXRBY3Rpb24nLCBzdGVwLHtcbiAgICAgICAgICAnaWQnOiBvcHBfaWQsIC8vIFRyYW5zYWN0aW9uIGlkIC0gVHlwZTogc3RyaW5nXG4gICAgICAgICAgJ2FmZmlsaWF0aW9uJzogJ01pbm5Qb3N0JywgLy8gU3RvcmUgbmFtZSAtIFR5cGU6IHN0cmluZ1xuICAgICAgICAgICdyZXZlbnVlJzogYW1vdW50LCAvLyBUb3RhbCBSZXZlbnVlIC0gVHlwZTogbnVtZXJpY1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZGVidWcoJ2FkZCBhIGNoZWNrb3V0IGFjdGlvbi4gc3RlcCBpcyAnICsgc3RlcCk7XG4gICAgICAgIGdhKCdlYzpzZXRBY3Rpb24nLCdjaGVja291dCcsIHtcbiAgICAgICAgICAnc3RlcCc6IHN0ZXAsICAgICAgICAgICAgLy8gQSB2YWx1ZSBvZiAxIGluZGljYXRlcyBmaXJzdCBjaGVja291dCBzdGVwLlZhbHVlIG9mIDIgaW5kaWNhdGVzIHNlY29uZCBjaGVja291dCBzdGVwXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBnYSgnc2V0Jywge1xuICAgICAgICBwYWdlOiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUsXG4gICAgICAgIHRpdGxlOiBkb2N1bWVudC50aXRsZVxuICAgICAgfSk7XG4gICAgICBnYSgnc2VuZCcsICdwYWdldmlldycsIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSk7XG5cbiAgICB9LCAvLyBhbmFseXRpY3NUcmFja2luZ1N0ZXBcblxuICAgIGFtb3VudEFzUmFkaW86IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIC8vIHdoZW4gYW1vdW50IGZpZWxkIGlzIGEgcmFkaW8gYnV0dG9uLCB3ZSBuZWVkIHRvIGNoZWNrIGl0IHdoZW5ldmVyIGl0IGNoYW5nZXNcbiAgICAgICQob3B0aW9ucy5vcmlnaW5hbF9hbW91bnRfc2VsZWN0b3IsIGVsZW1lbnQpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCQodGhpcykuaXMoJzpyYWRpbycpKSB7XG4gICAgICAgICAgICBvcHRpb25zLm9yaWdpbmFsX2Ftb3VudCA9IHBhcnNlSW50KCQob3B0aW9ucy5vcmlnaW5hbF9hbW91bnRfc2VsZWN0b3IgKyAnOmNoZWNrZWQnLCBlbGVtZW50KS52YWwoKSwgMTApO1xuICAgICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sIC8vIGFtb3VudEFzUmFkaW9cblxuICAgIGFtb3VudFVwZGF0ZWQ6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIC8vIHdoZW4gbmV3IGFtb3VudCB0ZXh0IGZpZWxkIGNhbiBjaGFuZ2UsIHdlIG5lZWQgdG8gY2hhbmdlIHRoZSBoaWRkZW4gZmllbGRcbiAgICAgIC8vIHRoZXJlIGlzIGFsc28gcG90ZW50aWFsbHkgYW4gYWRkaXRpb25hbCBhbW91bnQgZmllbGQgdmFsdWUgdG8gYWRkXG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB2YXIgcGF5bWVudF90eXBlID0gJChvcHRpb25zLmNob29zZV9wYXltZW50ICsgJyBpbnB1dCcpLnZhbCgpO1xuXG4gICAgICAvLyBzZXQgdGhlIGZhaXIgbWFya2V0IHZhbHVlIGlmIGFwcGxpY2FibGVcbiAgICAgIHZhciBhbW91bnRfc2VsZWN0b3JfZmFpcl9tYXJrZXQgPSAkKG9wdGlvbnMub3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yLCBlbGVtZW50KTtcbiAgICAgIGlmIChhbW91bnRfc2VsZWN0b3JfZmFpcl9tYXJrZXQuaXMoJzpyYWRpbycpKSB7XG4gICAgICAgIGFtb3VudF9zZWxlY3Rvcl9mYWlyX21hcmtldCA9ICQob3B0aW9ucy5vcmlnaW5hbF9hbW91bnRfc2VsZWN0b3IgKyAnOmNoZWNrZWQnLCBlbGVtZW50KTtcbiAgICAgIH1cbiAgICAgIHRoYXQuc2V0RmFpck1hcmtldFZhbHVlKGFtb3VudF9zZWxlY3Rvcl9mYWlyX21hcmtldCk7XG5cbiAgICAgICQob3B0aW9ucy5vcmlnaW5hbF9hbW91bnRfc2VsZWN0b3IsIGVsZW1lbnQpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgdGhhdC5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCA9IHBhcnNlSW50KCQodGhpcywgZWxlbWVudCkudmFsKCksIDEwKTtcbiAgICAgICAgaWYgKCBwYXltZW50X3R5cGUgPT09ICdiYW5rX2FjY291bnQnICkge1xuICAgICAgICAgIHRoYXQuY2FsY3VsYXRlRmVlcyh0aGF0Lm9wdGlvbnMub3JpZ2luYWxfYW1vdW50LCAnYmFua19hY2NvdW50Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhhdC5jYWxjdWxhdGVGZWVzKHRoYXQub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQsICdjYXJkJyk7XG4gICAgICAgIH1cbiAgICAgICAgdGhhdC5zZXRGYWlyTWFya2V0VmFsdWUoJCh0aGlzLCBlbGVtZW50KSk7XG4gICAgICB9KTtcbiAgICAgICQob3B0aW9ucy5hZGRpdGlvbmFsX2Ftb3VudF9maWVsZCwgZWxlbWVudCkuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGF0Lm9wdGlvbnMub3JpZ2luYWxfYW1vdW50ID0gcGFyc2VJbnQoJChvcHRpb25zLm9yaWdpbmFsX2Ftb3VudF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksIDEwKTtcbiAgICAgICAgaWYgKCBwYXltZW50X3R5cGUgPT09ICdiYW5rX2FjY291bnQnICkge1xuICAgICAgICAgIHRoYXQuY2FsY3VsYXRlRmVlcyh0aGF0Lm9wdGlvbnMub3JpZ2luYWxfYW1vdW50LCAnYmFua19hY2NvdW50Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhhdC5jYWxjdWxhdGVGZWVzKHRoYXQub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQsICdjYXJkJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgfSwgLy8gYW1vdW50VXBkYXRlZFxuXG4gICAgc2V0RmFpck1hcmtldFZhbHVlOiBmdW5jdGlvbihhbW91bnRfc2VsZWN0b3IpIHtcbiAgICAgIC8vIGlmIHRoZXJlIGlzIGEgZmFpciBtYXJrZXQgdmFsdWUgZmllbGQsIGNoZWNrIGFuZCBzZWUgaWYgd2UgY2FuIHBvcHVsYXRlIGl0XG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuZmFpcl9tYXJrZXRfdmFsdWVfc2VsZWN0b3IpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdmFyIGZhaXJNYXJrZXRWYWx1ZSA9IGFtb3VudF9zZWxlY3Rvci5kYXRhKCdmYWlyLW1hcmtldC12YWx1ZScpO1xuICAgICAgICAkKHRoaXMub3B0aW9ucy5mYWlyX21hcmtldF92YWx1ZV9zZWxlY3RvcikudmFsKGZhaXJNYXJrZXRWYWx1ZSk7XG4gICAgICB9XG4gICAgfSwgLy8gc2V0RmFpck1hcmtldFZhbHVlXG5cbiAgICBjYWxjdWxhdGVGZWVzOiBmdW5jdGlvbihhbW91bnQsIHN0cmlwZV9wYXltZW50X3R5cGUpIHtcbiAgICAgIC8vIHRoaXMgc2VuZHMgdGhlIGFtb3VudCBhbmQgc3RyaXBlIHBheW1lbnQgdHlwZSB0byBweXRob247IGdldCB0aGUgZmVlIGFuZCBkaXNwbGF5IGl0IHRvIHRoZSB1c2VyIG9uIHRoZSBjaGVja2JveCBsYWJlbFxuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdmFyIHRvdGFsX2Ftb3VudCA9IGFtb3VudDtcbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5hZGRpdGlvbmFsX2Ftb3VudF9maWVsZCkubGVuZ3RoID4gMCAmJiAkKHRoaXMub3B0aW9ucy5hZGRpdGlvbmFsX2Ftb3VudF9maWVsZCkudmFsKCkgPiAwKSB7XG4gICAgICAgIHZhciBhZGRpdGlvbmFsX2Ftb3VudCA9ICQodGhpcy5vcHRpb25zLmFkZGl0aW9uYWxfYW1vdW50X2ZpZWxkKS52YWwoKTtcbiAgICAgICAgdG90YWxfYW1vdW50ID0gcGFyc2VJbnQoYWRkaXRpb25hbF9hbW91bnQsIDEwKSArIHBhcnNlSW50KGFtb3VudCwgMTApO1xuICAgICAgfVxuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIGFtb3VudDogdG90YWxfYW1vdW50LFxuICAgICAgICBzdHJpcGVfcGF5bWVudF90eXBlOiBzdHJpcGVfcGF5bWVudF90eXBlXG4gICAgICB9O1xuICAgICAgdGhhdC5zZXRTdHJpcGVQYXltZW50VHlwZShzdHJpcGVfcGF5bWVudF90eXBlKTtcbiAgICAgICQuYWpheCh7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICB1cmw6ICcvY2FsY3VsYXRlLWZlZXMvJyxcbiAgICAgICAgZGF0YTogZGF0YVxuICAgICAgfSkuZG9uZShmdW5jdGlvbiggZGF0YSApIHtcbiAgICAgICAgaWYgKCQoZGF0YS5mZWVzKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgJCh0aGF0Lm9wdGlvbnMuZmVlX2Ftb3VudCkudGV4dChwYXJzZUZsb2F0KGRhdGEuZmVlcykudG9GaXhlZCgyKSk7XG4gICAgICAgICAgdGhhdC5jcmVkaXRDYXJkRmVlQ2hlY2tib3goJCh0aGF0Lm9wdGlvbnMucGF5X2NjX3Byb2Nlc3Npbmdfc2VsZWN0b3IpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSwgLy8gY2FsY3VsYXRlRmVlc1xuXG4gICAgY3JlZGl0Q2FyZFByb2Nlc3NpbmdGZWVzOiBmdW5jdGlvbihvcHRpb25zLCByZXNldCkge1xuICAgICAgLy8gdGhpcyBhZGRzIG9yIHN1YnRyYWN0cyB0aGUgZmVlIHRvIHRoZSBvcmlnaW5hbCBhbW91bnQgd2hlbiB0aGUgdXNlciBpbmRpY2F0ZXMgdGhleSBkbyBvciBkbyBub3Qgd2FudCB0byBwYXkgdGhlIGZlZXNcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHRoYXQuY3JlZGl0Q2FyZEZlZUNoZWNrYm94KCQodGhpcy5vcHRpb25zLnBheV9jY19wcm9jZXNzaW5nX3NlbGVjdG9yKSk7XG4gICAgICAkKHRoaXMub3B0aW9ucy5wYXlfY2NfcHJvY2Vzc2luZ19zZWxlY3Rvcikub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB0aGF0LmNyZWRpdENhcmRGZWVDaGVja2JveCh0aGlzKTtcbiAgICAgIH0pO1xuICAgIH0sIC8vIGNyZWRpdENhcmRQcm9jZXNzaW5nRmVlc1xuXG4gICAgc2V0U3RyaXBlUGF5bWVudFR5cGU6IGZ1bmN0aW9uKHN0cmlwZV9wYXltZW50X3R5cGUpIHtcbiAgICAgIGlmICgkKCdpbnB1dFtuYW1lPVwic3RyaXBlX3BheW1lbnRfdHlwZVwiXScpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAkKHRoaXMub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuYXBwZW5kKCc8aW5wdXQgdHlwZT1cXFwiaGlkZGVuXFxcIiBuYW1lPVxcXCJzdHJpcGVfcGF5bWVudF90eXBlXFxcIj4nKTtcbiAgICAgIH1cbiAgICAgICQoJ2lucHV0W25hbWU9XCJzdHJpcGVfcGF5bWVudF90eXBlXCJdJykudmFsKHN0cmlwZV9wYXltZW50X3R5cGUpO1xuICAgIH0sIC8vIHNldFN0cmlwZVBheW1lbnRUeXBlXG5cbiAgICBjcmVkaXRDYXJkRmVlQ2hlY2tib3g6IGZ1bmN0aW9uKGZpZWxkKSB7XG4gICAgICB2YXIgZnVsbF9hbW91bnQ7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICBpZiAoJChmaWVsZCkuaXMoJzpjaGVja2VkJykgfHwgJChmaWVsZCkucHJvcCgnY2hlY2tlZCcpKSB7XG4gICAgICAgICQoJy5hbW91bnQgLmxldmVsLWFtb3VudCcpLmFkZENsYXNzKCdmdWxsLWFtb3VudCcpO1xuICAgICAgICBmdWxsX2Ftb3VudCA9ICh0aGF0Lm9wdGlvbnMub3JpZ2luYWxfYW1vdW50ICsgcGFyc2VGbG9hdCgkKHRoYXQub3B0aW9ucy5mZWVfYW1vdW50KS50ZXh0KCkpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZ1bGxfYW1vdW50ID0gdGhhdC5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudDtcbiAgICAgIH1cbiAgICAgICQodGhhdC5vcHRpb25zLmZ1bGxfYW1vdW50X3NlbGVjdG9yKS50ZXh0KHBhcnNlRmxvYXQoZnVsbF9hbW91bnQpLnRvRml4ZWQoMikpO1xuICAgIH0sIC8vIGNyZWRpdENhcmRGZWVDaGVja2JveFxuXG4gICAgZG9uYXRlQW5vbnltb3VzbHk6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIGlmICgkKG9wdGlvbnMuYW5vbnltb3VzX3NlbGVjdG9yLCBlbGVtZW50KS5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICAkKG9wdGlvbnMubmFtZV9zZWxlY3RvciArICcgZGl2OmZpcnN0JywgZWxlbWVudCkuaGlkZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJChvcHRpb25zLm5hbWVfc2VsZWN0b3IgKyAnIGRpdjpmaXJzdCcsIGVsZW1lbnQpLnNob3coKTtcbiAgICAgIH1cblxuICAgICAgJChvcHRpb25zLmFub255bW91c19zZWxlY3RvciwgZWxlbWVudCkuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoJCh0aGlzKS5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICAgICQob3B0aW9ucy5uYW1lX3NlbGVjdG9yICsgJyBkaXY6Zmlyc3QnLCBlbGVtZW50KS5oaWRlKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJChvcHRpb25zLm5hbWVfc2VsZWN0b3IgKyAnIGRpdjpmaXJzdCcsIGVsZW1lbnQpLnNob3coKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSwgLy8gZG9uYXRlQW5vbnltb3VzbHlcblxuICAgIGNoZWNrTGV2ZWw6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMsIHJldHVybnZhbHVlKSB7XG4gICAgICAvLyB3ZSBjb3VsZCBtYXliZSBnZXQgcmlkIG9mIHRoaXMgaWYgd2UgY291bGQgbW92ZSB0aGlzIHBhcnQgaW50byB3b3JkcHJlc3NcbiAgICAgIHZhciBsZXZlbCA9ICcnO1xuICAgICAgdmFyIGxldmVsbnVtID0gMDtcbiAgICAgIHZhciBhbW91bnRfeWVhcmx5O1xuICAgICAgdmFyIGZyZXF1ZW5jeSA9IG9wdGlvbnMuZnJlcXVlbmN5O1xuICAgICAgdmFyIGFtb3VudCA9IG9wdGlvbnMub3JpZ2luYWxfYW1vdW50O1xuXG4gICAgICBpZiAoZnJlcXVlbmN5ID09PSAxMikge1xuICAgICAgICBhbW91bnRfeWVhcmx5ID0gYW1vdW50ICogZnJlcXVlbmN5O1xuICAgICAgfSBlbHNlIGlmIChmcmVxdWVuY3kgPT09IDEpIHtcbiAgICAgICAgYW1vdW50X3llYXJseSA9IGFtb3VudDtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgJC5lYWNoKG9wdGlvbnMubGV2ZWxzLCBmdW5jdGlvbihpbmRleCwgdmFsdWUpIHtcbiAgICAgICAgdmFyIG5hbWUgPSB2YWx1ZS5uYW1lO1xuICAgICAgICB2YXIgbnVtID0gaW5kZXg7XG4gICAgICAgIHZhciBtYXggPSB2YWx1ZS5tYXg7XG4gICAgICAgIHZhciBtaW4gPSB2YWx1ZS5taW47XG4gICAgICAgIGlmICh0eXBlb2YgbWluICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgbWF4ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGlmIChhbW91bnRfeWVhcmx5ID49IG1pbiAmJiBhbW91bnRfeWVhcmx5IDwgbWF4KSB7XG4gICAgICAgICAgICBsZXZlbCA9IG5hbWU7XG4gICAgICAgICAgICBsZXZlbG51bSA9IG51bTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG1heCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBpZiAoYW1vdW50X3llYXJseSA8IG1heCkge1xuICAgICAgICAgICAgbGV2ZWwgPSBuYW1lO1xuICAgICAgICAgICAgbGV2ZWxudW0gPSBudW07XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBtaW4gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgaWYgKGFtb3VudF95ZWFybHkgPj0gbWluKSB7XG4gICAgICAgICAgICBsZXZlbCA9IG5hbWU7XG4gICAgICAgICAgICBsZXZlbG51bSA9IG51bTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgaWYgKHJldHVybnZhbHVlID09PSAnbmFtZScpIHtcbiAgICAgICAgcmV0dXJuIGxldmVsO1xuICAgICAgfSBlbHNlIGlmIChyZXR1cm52YWx1ZSA9PT0gJ251bScpIHtcbiAgICAgICAgcmV0dXJuIGxldmVsbnVtOyAgXG4gICAgICB9XG4gICAgfSwgLy8gY2hlY2tMZXZlbFxuXG4gICAgaG9ub3JPck1lbW9yeTogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgaWYgKCQob3B0aW9ucy5ob25vcl9vcl9tZW1vcnlfY2hvb3NlciArICc6Y2hlY2tlZCcpLnZhbCgpKSB7XG4gICAgICAgICQob3B0aW9ucy5ob25vcl9tZW1vcnlfaW5wdXRfZ3JvdXAsIGVsZW1lbnQpLnNob3coKTtcbiAgICAgICAgJChvcHRpb25zLmhvbm9yX3R5cGVfc2VsZWN0b3IpLnRleHQoJChvcHRpb25zLmhvbm9yX29yX21lbW9yeV9jaG9vc2VyICsgJzpjaGVja2VkJykudmFsKCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJChvcHRpb25zLmhvbm9yX21lbW9yeV9pbnB1dF9ncm91cCwgZWxlbWVudCkuaGlkZSgpO1xuICAgICAgICAkKG9wdGlvbnMuaG9ub3JfbmFtZV9zZWxlY3RvciArICcgaW5wdXQnLCBlbGVtZW50KS52YWwoJycpO1xuICAgICAgfVxuICAgIH0sIC8vIGhvbm9yT3JNZW1vcnlcblxuICAgIGhvbm9yT3JNZW1vcnlUb2dnbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHRoYXQuaG9ub3JPck1lbW9yeSh0aGF0LmVsZW1lbnQsIHRoYXQub3B0aW9ucyk7XG4gICAgICAkKG9wdGlvbnMuaG9ub3Jfb3JfbWVtb3J5X2Nob29zZXIsIGVsZW1lbnQpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgdGhhdC5ob25vck9yTWVtb3J5KHRoYXQuZWxlbWVudCwgdGhhdC5vcHRpb25zKTtcbiAgICAgIH0pO1xuICAgIH0sIC8vIGhvbm9yT3JNZW1vcnlUb2dnbGVcblxuICAgIG91dHNpZGVVbml0ZWRTdGF0ZXM6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgICQob3B0aW9ucy5zaG93X2JpbGxpbmdfY291bnRyeV9zZWxlY3RvcikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICQob3B0aW9ucy5iaWxsaW5nX2NvdW50cnlfc2VsZWN0b3IpLnNob3coKTtcbiAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5oaWRlKCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuICAgICAgJChvcHRpb25zLnNob3dfc2hpcHBpbmdfY291bnRyeV9zZWxlY3RvcikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICQob3B0aW9ucy5zaGlwcGluZ19jb3VudHJ5X3NlbGVjdG9yKS5zaG93KCk7XG4gICAgICAgICQodGhpcykucGFyZW50KCkuaGlkZSgpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9LCAvLyBvdXRzaWRlVW5pdGVkU3RhdGVzXG5cbiAgICBzaGlwcGluZ0FkZHJlc3M6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHZhciBzaG93X3NoaXBwaW5nID0gZmFsc2U7XG4gICAgICBpZiAoJChvcHRpb25zLnVzZV9mb3Jfc2hpcHBpbmdfc2VsZWN0b3IpLmxlbmd0aCA+IDApIHsgLy8gd2UgaGF2ZSBhIHNoaXBwaW5nIGNoZWNrYm94XG4gICAgICAgIHNob3dfc2hpcHBpbmcgPSB0cnVlO1xuICAgICAgfVxuLy8gICAgICBzaG93X3NoaXBwaW5nID0gISEkKG9wdGlvbnMudXNlX2Zvcl9zaGlwcGluZ19zZWxlY3RvciArICc6Y2hlY2tlZCcsIGVsZW1lbnQpLmxlbmd0aDtcbi8vICAgICAgLy90aGlzLmRlYnVnKCdzaG93IGlzIHRoZXJlJyk7XG5cbi8qICAgICAgJChvcHRpb25zLnVzZV9mb3Jfc2hpcHBpbmdfc2VsZWN0b3IsIGVsZW1lbnQpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgdGhhdC5zaGlwcGluZ0FkZHJlc3MoZWxlbWVudCwgb3B0aW9ucyk7XG4gICAgICAgIC8vdGhpcy5kZWJ1ZygnY2hhbmdlIGl0Jyk7XG4gICAgICB9KTtcbiovXG4gICAgICBpZiAoc2hvd19zaGlwcGluZyA9PT0gdHJ1ZSApIHtcbiAgICAgICAgJChvcHRpb25zLnVzZV9mb3Jfc2hpcHBpbmdfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpLnNob3coKTtcbiAgICAgICAgaWYgKCQob3B0aW9ucy51c2VfZm9yX3NoaXBwaW5nX3NlbGVjdG9yLCBlbGVtZW50KS5pcygnOmNoZWNrZWQnKSkgeyAvLyB1c2Ugc2FtZSBhcyBiaWxsaW5nXG4gICAgICAgICAgJChvcHRpb25zLnNoaXBwaW5nX3NlbGVjdG9yKS5oaWRlKCk7XG4gICAgICAgIH0gZWxzZSB7IC8vIHNlcGFyYXRlIHNoaXBwaW5nIGFuZCBiaWxsaW5nXG4gICAgICAgICAgJChvcHRpb25zLnNoaXBwaW5nX3NlbGVjdG9yKS5zaG93KCk7XG4gICAgICAgIH1cbiAgICAgICAgJChvcHRpb25zLnVzZV9mb3Jfc2hpcHBpbmdfc2VsZWN0b3IsIGVsZW1lbnQpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgICB0aGF0LnNoaXBwaW5nQWRkcmVzcyhlbGVtZW50LCBvcHRpb25zKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBcbiAgICB9LCAvLyBzaGlwcGluZ0FkZHJlc3NcblxuICAgIGFsbG93TWlubnBvc3RBY2NvdW50OiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zLCBjaGFuZ2VkKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB2YXIgYWNjb3VudF9leGlzdHMgPSBmYWxzZTtcblxuICAgICAgJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKS5hcHBlbmQoJzxwIGNsYXNzPVwiZXJyb3Igc3BhbS1lbWFpbFwiPlRoaXMgZW1haWwgYWRkcmVzcyBoYXMgYmVlbiBkZXRlY3RlZCBhcyBhIHNwYW1tZXIuPC9wPicpO1xuICAgICAgJCgnLnNwYW0tZW1haWwnKS5oaWRlKCk7XG5cbiAgICAgICQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICAkKCcuc3BhbS1lbWFpbCcpLmhpZGUoKTtcbiAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaW52YWxpZCBlcnJvcicpO1xuICAgICAgfSk7XG5cbiAgICAgIGZ1bmN0aW9uIGRvbmVUeXBpbmcgKCkge1xuICAgICAgICB2YXIgZW1haWwgPSAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpO1xuICAgICAgICBhY2NvdW50X2V4aXN0cyA9IHRoYXQuY2hlY2tNaW5ucG9zdEFjY291bnQoZWxlbWVudCwgb3B0aW9ucywgZW1haWwpO1xuICAgICAgfVxuXG4gICAgICAvL3NldHVwIGJlZm9yZSBmdW5jdGlvbnNcbiAgICAgIHZhciB0eXBpbmdUaW1lcjsgICAgICAgICAgICAgICAgLy90aW1lciBpZGVudGlmaWVyXG4gICAgICB2YXIgZG9uZVR5cGluZ0ludGVydmFsID0gNTAwMDsgIC8vdGltZSBpbiBtcywgNSBzZWNvbmQgZm9yIGV4YW1wbGVcblxuICAgICAgLy9vbiBrZXl1cCwgc3RhcnQgdGhlIGNvdW50ZG93blxuICAgICAgJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5rZXl1cChmdW5jdGlvbigpe1xuICAgICAgICBjbGVhclRpbWVvdXQodHlwaW5nVGltZXIpO1xuICAgICAgICBpZiAoJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwpIHtcbiAgICAgICAgICB0eXBpbmdUaW1lciA9IHNldFRpbWVvdXQoZG9uZVR5cGluZywgZG9uZVR5cGluZ0ludGVydmFsKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIC8vdXNlciBpcyBcImZpbmlzaGVkIHR5cGluZyxcIiBkbyBzb21ldGhpbmdcblxuICAgICAgaWYgKCQob3B0aW9ucy5jcmVhdGVfbXBfc2VsZWN0b3IsIGVsZW1lbnQpLmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgICQob3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgZWxlbWVudCkuc2hvdygpO1xuICAgICAgICBvcHRpb25zLmNyZWF0ZV9hY2NvdW50ID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQob3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgZWxlbWVudCkuaGlkZSgpO1xuICAgICAgfVxuXG4gICAgICAkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoYXQuYWxsb3dNaW5ucG9zdEFjY291bnQoZWxlbWVudCwgb3B0aW9ucywgdHJ1ZSk7XG4gICAgICB9KTtcblxuICAgICAgaWYgKGNoYW5nZWQgPT09IGZhbHNlKSB7XG4gICAgICAgIC8vIGFsbG93IHVzZXJzIHRvIHNob3cgcGxhaW4gdGV4dCwgb3IgdG8gc2VlIHB3IGNyaXRlcmlhXG4gICAgICAgICQob3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgZWxlbWVudCkuYXBwZW5kKCc8ZGl2IGNsYXNzPVwiaGVscC1saW5rXCI+PHNwYW4+UGFzc3dvcmQgaGVscDwvc3Bhbj48L2Rpdj48ZGl2IGNsYXNzPVwiZm9ybS1oZWxwXCI+UGFzc3dvcmQgbXVzdCBiZSBhdCBsZWFzdCA2IGNoYXJhY3RlcnMuPC9kaXY+PGxhYmVsIGNsYXNzPVwiYWRkaXRpb25hbC1vcHRpb25cIj48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgbmFtZT1cInNob3dwYXNzd29yZFwiIGlkPVwic2hvd3Bhc3N3b3JkXCI+IFNob3cgcGFzc3dvcmQ8L2xhYmVsPicpO1xuICAgICAgICAkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKS5iZWZvcmUoJzxwIGNsYXNzPVwiYWNjb3VudC1leGlzdHMgc3VjY2Vzc1wiPlRoZXJlIGlzIGFscmVhZHkgYSBNaW5uUG9zdC5jb20gYWNjb3VudCB3aXRoIHRoaXMgZW1haWwuPC9wPicpO1xuICAgICAgICAkKCcuYWNjb3VudC1leGlzdHMnKS5oaWRlKCk7XG4gICAgICAgICQoJyNzaG93cGFzc3dvcmQnKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAoJCh0aGlzKS5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICAgICAgJCgnI3Bhc3N3b3JkJykuZ2V0KDApLnR5cGUgPSAndGV4dCc7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoJyNwYXNzd29yZCcpLmdldCgwKS50eXBlID0gJ3Bhc3N3b3JkJztcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5mb3JtLWl0ZW0gLmZvcm0taGVscCcpLmhpZGUoKTtcbiAgICAgIH1cbiAgICAgICQoJy5oZWxwLWxpbmsnKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgJCh0aGlzKS5uZXh0KCcuZm9ybS1oZWxwJykudG9nZ2xlKCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuICAgIH0sIC8vIGFsbG93TWlubnBvc3RBY2NvdW50XG5cbiAgICBjaGVja01pbm5wb3N0QWNjb3VudDogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucywgZW1haWwpIHtcbiAgICAgIHZhciB1c2VyID0ge1xuICAgICAgICBlbWFpbDogZW1haWxcbiAgICAgIH07XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAkLmFqYXgoe1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICB1cmw6IG9wdGlvbnMubWlubnBvc3Rfcm9vdCArICcvd3AtanNvbi91c2VyLWFjY291bnQtbWFuYWdlbWVudC92MS9jaGVjay1hY2NvdW50JyxcbiAgICAgICAgZGF0YTogdXNlclxuICAgICAgfSkuZG9uZShmdW5jdGlvbiggcmVzdWx0ICkge1xuICAgICAgICBpZiAocmVzdWx0LnN0YXR1cyA9PT0gJ3N1Y2Nlc3MnICYmIHJlc3VsdC5yZWFzb24gPT09ICd1c2VyIGV4aXN0cycpIHsgLy8gdXNlciBleGlzdHNcbiAgICAgICAgICBpZiAoJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgICAgICQob3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgZWxlbWVudCkuaGlkZSgpO1xuICAgICAgICAgICAgJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkucGFyZW50KCkuaGlkZSgpO1xuICAgICAgICAgICAgJCgnLmFjY291bnQtZXhpc3RzJywgZWxlbWVudCkuc2hvdygpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KS5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgICAgICAgJChvcHRpb25zLnBhc3N3b3JkX3NlbGVjdG9yLCBlbGVtZW50KS5oaWRlKCk7XG4gICAgICAgICAgICAgICQob3B0aW9ucy5jcmVhdGVfbXBfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpLmhpZGUoKTtcbiAgICAgICAgICAgICAgJCgnLmFjY291bnQtZXhpc3RzJywgZWxlbWVudCkuc2hvdygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKCByZXN1bHQuc3RhdHVzID09PSAnc3BhbScgKSB7XG4gICAgICAgICAgJCh0aGF0Lm9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IpLmFkZENsYXNzKCdpbnZhbGlkIGVycm9yJyk7XG4gICAgICAgICAgJCggJy5zcGFtLWVtYWlsJykuc2hvdygpO1xuICAgICAgICB9IGVsc2UgeyAvLyB1c2VyIGRvZXMgbm90IGV4aXN0IG9yIGFqYXggY2FsbCBmYWlsZWRcbiAgICAgICAgICBpZiAoJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgICAgICQob3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgZWxlbWVudCkuc2hvdygpO1xuICAgICAgICAgICAgb3B0aW9ucy5jcmVhdGVfYWNjb3VudCA9IHRydWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQob3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgZWxlbWVudCkuaGlkZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAkKCcuYWNjb3VudC1leGlzdHMnLCBlbGVtZW50KS5oaWRlKCk7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LCAvLyBjaGVja01pbm5wb3N0QWNjb3VudFxuXG4gICAgY2hvb3NlUGF5bWVudE1ldGhvZDogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuXG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG5cbiAgICAgIGlmICgkKG9wdGlvbnMuY2hvb3NlX3BheW1lbnQpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgaWYgKCQob3B0aW9ucy5jaG9vc2VfcGF5bWVudCArICcgaW5wdXQnKS5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICAgIHZhciBjaGVja2VkID0gJChvcHRpb25zLmNob29zZV9wYXltZW50ICsgJyBpbnB1dDpjaGVja2VkJykuYXR0cignaWQnKTtcbiAgICAgICAgICB2YXIgY2hlY2tlZF92YWx1ZSA9ICQob3B0aW9ucy5jaG9vc2VfcGF5bWVudCArICcgaW5wdXQ6Y2hlY2tlZCcpLnZhbCgpO1xuICAgICAgICAgIHRoYXQuc2V0dXBQYXltZW50TWV0aG9kKGNoZWNrZWQsIGNoZWNrZWRfdmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgJChvcHRpb25zLmNob29zZV9wYXltZW50ICsgJyBpbnB1dCcpLmNoYW5nZShmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICB0aGF0LnNldHVwUGF5bWVudE1ldGhvZCh0aGlzLmlkLCB0aGlzLnZhbHVlKTtcblxuICAgICAgICAgIGlmICggdGhpcy52YWx1ZSA9PT0gJ2JhbmtfYWNjb3VudCcgKSB7XG4gICAgICAgICAgICAkKCdpbnB1dFtuYW1lPVwic3RyaXBlVG9rZW5cIl0nLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikpLnJlbW92ZSgpO1xuICAgICAgICAgICAgdGhhdC5hY2hGaWVsZHModGhhdC5lbGVtZW50LCB0aGF0Lm9wdGlvbnMpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKCdpbnB1dFtuYW1lPVwicHVibGljX3Rva2VuXCJdJywgJCh0aGF0Lm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICQoJ2lucHV0W25hbWU9XCJhY2NvdW50X2lkXCJdJywgJCh0aGF0Lm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpKS5yZW1vdmUoKTtcbiAgICAgICAgICAgICQoJ2lucHV0W25hbWU9XCJiYW5rVG9rZW5cIl0nLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikpLnJlbW92ZSgpO1xuICAgICAgICAgICAgdGhhdC5jYWxjdWxhdGVGZWVzKHRoYXQub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQsICdjYXJkJyk7IC8vIHdlIGNhbid0IHVzZSBjcmVkaXRjYXJkZmllbGRzIG1ldGhvZCBoZXJlXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgfVxuICAgIH0sIC8vIGNob29zZVBheW1lbnRNZXRob2RcblxuICAgIHNldHVwUGF5bWVudE1ldGhvZDogZnVuY3Rpb24oaWQsIHZhbHVlKSB7XG4gICAgICAkKHRoaXMub3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvcikucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgJCh0aGlzLm9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IgKyAnLicgKyBpZCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgLy8kKHRoaXMub3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvciArICc6bm90KC5hY3RpdmUpIGxhYmVsJykucmVtb3ZlQ2xhc3MoJ3JlcXVpcmVkJyk7XG4gICAgICAvLyQodGhpcy5vcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yICsgJzpub3QoLmFjdGl2ZSkgaW5wdXQnKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgICQodGhpcy5vcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yICsgJzpub3QoLmFjdGl2ZSkgaW5wdXQnKS52YWwoJycpO1xuICAgICAgLy8kKHRoaXMub3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvciArICcuYWN0aXZlIGxhYmVsJykuYWRkQ2xhc3MoJ3JlcXVpcmVkJyk7XG4gICAgICAvLyQodGhpcy5vcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yICsgJy5hY3RpdmUgaW5wdXQnKS5wcm9wKCdyZXF1aXJlZCcsIHRydWUpO1xuICAgICAgaWYgKCB2YWx1ZSA9PT0gJ2JhbmtfYWNjb3VudCcgKSB7XG4gICAgICAgIHRoaXMuY2FsY3VsYXRlRmVlcyh0aGlzLm9wdGlvbnMub3JpZ2luYWxfYW1vdW50LCAnYmFua19hY2NvdW50Jyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmNhbGN1bGF0ZUZlZXModGhpcy5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCwgJ2NhcmQnKTtcbiAgICAgIH1cbiAgICB9LCAvLyBzZXR1cFBheW1lbnRNZXRob2RcblxuICAgIGNyZWRpdENhcmRGaWVsZHM6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcblxuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuXG4gICAgICB2YXIgc3R5bGUgPSB7XG4gICAgICAgIGJhc2U6IHtcbiAgICAgICAgICBpY29uQ29sb3I6ICcjNjY2RUU4JyxcbiAgICAgICAgICBsaW5lSGVpZ2h0OiAnMzdweCcsXG4gICAgICAgICAgZm9udFdlaWdodDogNDAwLFxuICAgICAgICAgIGZvbnRGYW1pbHk6ICdHZW9yZ2lhLENhbWJyaWEsVGltZXMgTmV3IFJvbWFuLFRpbWVzLHNlcmlmJyxcbiAgICAgICAgICBmb250U2l6ZTogJzE2cHgnLFxuICAgICAgICB9LFxuICAgICAgfTtcblxuICAgICAgLy8gQWRkIGFuIGluc3RhbmNlIG9mIHRoZSBjYXJkIFVJIGNvbXBvbmVudCBpbnRvIHRoZSBgY2FyZC1lbGVtZW50YCA8ZGl2PlxuICAgICAgLy9jYXJkLm1vdW50KCcjY2FyZC1lbGVtZW50Jyk7XG4gICAgICBpZiAoICQoJy5jcmVkaXQtY2FyZC1ncm91cCcpLmxlbmd0aCA9PT0gMCAmJiAkKCcucGF5bWVudC1tZXRob2QuY2hvb3NlLWNhcmQnKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhhdC5jYXJkTnVtYmVyRWxlbWVudCA9IHRoYXQuZWxlbWVudHMuY3JlYXRlKCdjYXJkTnVtYmVyJywge1xuICAgICAgICBzdHlsZTogc3R5bGVcbiAgICAgIH0pO1xuICAgICAgdGhhdC5jYXJkTnVtYmVyRWxlbWVudC5tb3VudChvcHRpb25zLmNjX251bV9zZWxlY3Rvcik7XG5cbiAgICAgIHRoYXQuY2FyZEV4cGlyeUVsZW1lbnQgPSB0aGF0LmVsZW1lbnRzLmNyZWF0ZSgnY2FyZEV4cGlyeScsIHtcbiAgICAgICAgc3R5bGU6IHN0eWxlXG4gICAgICB9KTtcbiAgICAgIHRoYXQuY2FyZEV4cGlyeUVsZW1lbnQubW91bnQob3B0aW9ucy5jY19leHBfc2VsZWN0b3IpO1xuXG4gICAgICB0aGF0LmNhcmRDdmNFbGVtZW50ID0gdGhhdC5lbGVtZW50cy5jcmVhdGUoJ2NhcmRDdmMnLCB7XG4gICAgICAgIHN0eWxlOiBzdHlsZVxuICAgICAgfSk7XG4gICAgICB0aGF0LmNhcmRDdmNFbGVtZW50Lm1vdW50KG9wdGlvbnMuY2NfY3Z2X3NlbGVjdG9yKTtcblxuICAgICAgLy8gdmFsaWRhdGUvZXJyb3IgaGFuZGxlIHRoZSBjYXJkIGZpZWxkc1xuICAgICAgdGhhdC5jYXJkTnVtYmVyRWxlbWVudC5vbignY2hhbmdlJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgdmFyIHN0cmlwZV9wYXltZW50X3R5cGUgPSAnY2FyZCc7XG4gICAgICAgIC8vIGVycm9yIGhhbmRsaW5nXG4gICAgICAgIHRoYXQuc3RyaXBlRXJyb3JEaXNwbGF5KGV2ZW50LCAkKG9wdGlvbnMuY2NfbnVtX3NlbGVjdG9yLCBlbGVtZW50KSwgZWxlbWVudCwgb3B0aW9ucyApO1xuICAgICAgICAvLyBpZiBpdCBjaGFuZ2VkLCByZXNldCB0aGUgYnV0dG9uXG4gICAgICAgIHRoYXQuYnV0dG9uU3RhdHVzKG9wdGlvbnMsICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKSwgZmFsc2UpO1xuICAgICAgICAvLyBTd2l0Y2ggYnJhbmQgbG9nb1xuICAgICAgICBpZiAoZXZlbnQuYnJhbmQpIHtcbiAgICAgICAgICBpZiAoIGV2ZW50LmJyYW5kID09PSAnYW1leCcgKSB7XG4gICAgICAgICAgICBzdHJpcGVfcGF5bWVudF90eXBlID0gJ2FtZXgnO1xuICAgICAgICAgIH0gICAgICAgICAgXG4gICAgICAgICAgdGhhdC5zZXRCcmFuZEljb24oZXZlbnQuYnJhbmQpO1xuICAgICAgICB9XG4gICAgICAgIHRoYXQuY2FsY3VsYXRlRmVlcyh0aGF0Lm9wdGlvbnMub3JpZ2luYWxfYW1vdW50LCBzdHJpcGVfcGF5bWVudF90eXBlKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGF0LmNhcmRFeHBpcnlFbGVtZW50Lm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAvLyBlcnJvciBoYW5kbGluZ1xuICAgICAgICB0aGF0LnN0cmlwZUVycm9yRGlzcGxheShldmVudCwgJChvcHRpb25zLmNjX2V4cF9zZWxlY3RvciwgZWxlbWVudCksIGVsZW1lbnQsIG9wdGlvbnMgKTtcbiAgICAgICAgLy8gaWYgaXQgY2hhbmdlZCwgcmVzZXQgdGhlIGJ1dHRvblxuICAgICAgICB0aGF0LmJ1dHRvblN0YXR1cyhvcHRpb25zLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIGZhbHNlKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGF0LmNhcmRDdmNFbGVtZW50Lm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAvLyBlcnJvciBoYW5kbGluZ1xuICAgICAgICB0aGF0LnN0cmlwZUVycm9yRGlzcGxheShldmVudCwgJChvcHRpb25zLmNjX2N2dl9zZWxlY3RvciwgZWxlbWVudCksIGVsZW1lbnQsIG9wdGlvbnMgKTtcbiAgICAgICAgLy8gaWYgaXQgY2hhbmdlZCwgcmVzZXQgdGhlIGJ1dHRvblxuICAgICAgICB0aGF0LmJ1dHRvblN0YXR1cyhvcHRpb25zLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIGZhbHNlKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyB0aGlzIGlzIHRoZSBtZXRob2QgdG8gY3JlYXRlIGEgc2luZ2xlIGNhcmQgZmllbGQgYW5kIG1vdW50IGl0XG4gICAgICAvKnZhciBjYXJkID0gdGhhdC5lbGVtZW50cy5jcmVhdGUoXG4gICAgICAgICdjYXJkJyxcbiAgICAgICAge1xuICAgICAgICAgIGhpZGVQb3N0YWxDb2RlOiB0cnVlXG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgICAvLyBBZGQgYW4gaW5zdGFuY2Ugb2YgdGhlIGNhcmQgVUkgY29tcG9uZW50IGludG8gdGhlIGBjYXJkLWVsZW1lbnRgIDxkaXY+XG4gICAgICBjYXJkLm1vdW50KCcjY2FyZC1lbGVtZW50Jyk7Ki9cblxuICAgIH0sIC8vIGNyZWRpdENhcmRGaWVsZHNcblxuICAgIHNldEJyYW5kSWNvbjogZnVuY3Rpb24oYnJhbmQpIHtcbiAgICAgIHZhciBjYXJkQnJhbmRUb1BmQ2xhc3MgPSB7XG4gICAgICAgICd2aXNhJzogJ3BmLXZpc2EnLFxuICAgICAgICAnbWFzdGVyY2FyZCc6ICdwZi1tYXN0ZXJjYXJkJyxcbiAgICAgICAgJ2FtZXgnOiAncGYtYW1lcmljYW4tZXhwcmVzcycsXG4gICAgICAgICdkaXNjb3Zlcic6ICdwZi1kaXNjb3ZlcicsXG4gICAgICAgICdkaW5lcnMnOiAncGYtZGluZXJzJyxcbiAgICAgICAgJ2pjYic6ICdwZi1qY2InLFxuICAgICAgICAndW5rbm93bic6ICdwZi1jcmVkaXQtY2FyZCcsXG4gICAgICB9XG4gICAgICB2YXIgYnJhbmRJY29uRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdicmFuZC1pY29uJyk7XG4gICAgICB2YXIgcGZDbGFzcyA9ICdwZi1jcmVkaXQtY2FyZCc7XG4gICAgICBpZiAoYnJhbmQgaW4gY2FyZEJyYW5kVG9QZkNsYXNzKSB7XG4gICAgICAgIHBmQ2xhc3MgPSBjYXJkQnJhbmRUb1BmQ2xhc3NbYnJhbmRdO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIgaSA9IGJyYW5kSWNvbkVsZW1lbnQuY2xhc3NMaXN0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIGJyYW5kSWNvbkVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShicmFuZEljb25FbGVtZW50LmNsYXNzTGlzdFtpXSk7XG4gICAgICB9XG4gICAgICBicmFuZEljb25FbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3BmJyk7XG4gICAgICBicmFuZEljb25FbGVtZW50LmNsYXNzTGlzdC5hZGQocGZDbGFzcyk7XG4gICAgfSxcblxuICAgIGFjaEZpZWxkczogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgdmFyIGJhbmtUb2tlbkZpZWxkTmFtZSA9ICdiYW5rVG9rZW4nO1xuICAgICAgdmFyIGJhbmtUb2tlbkZpZWxkID0gJ2lucHV0W25hbWU9XCInICsgYmFua1Rva2VuRmllbGROYW1lICsgJ1wiXSc7XG4gICAgICBpZiAob3B0aW9ucy5wbGFpZF9lbnYgIT0gJycgJiYgb3B0aW9ucy5rZXkgIT0gJycgJiYgdHlwZW9mIFBsYWlkICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB2YXIgbGlua0hhbmRsZXIgPSBQbGFpZC5jcmVhdGUoe1xuICAgICAgICAgIHNlbGVjdEFjY291bnQ6IHRydWUsXG4gICAgICAgICAgYXBpVmVyc2lvbjogJ3YyJyxcbiAgICAgICAgICBlbnY6IG9wdGlvbnMucGxhaWRfZW52LFxuICAgICAgICAgIGNsaWVudE5hbWU6ICdNaW5uUG9zdCcsXG4gICAgICAgICAga2V5OiBvcHRpb25zLnBsYWlkX3B1YmxpY19rZXksXG4gICAgICAgICAgcHJvZHVjdDogJ2F1dGgnLFxuICAgICAgICAgIG9uTG9hZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvLyBUaGUgTGluayBtb2R1bGUgZmluaXNoZWQgbG9hZGluZy5cbiAgICAgICAgICB9LFxuICAgICAgICAgIG9uU3VjY2VzczogZnVuY3Rpb24ocHVibGljX3Rva2VuLCBtZXRhZGF0YSkge1xuICAgICAgICAgICAgLy8gVGhlIG9uU3VjY2VzcyBmdW5jdGlvbiBpcyBjYWxsZWQgd2hlbiB0aGUgdXNlciBoYXMgc3VjY2Vzc2Z1bGx5XG4gICAgICAgICAgICAvLyBhdXRoZW50aWNhdGVkIGFuZCBzZWxlY3RlZCBhbiBhY2NvdW50IHRvIHVzZS5cbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyBXaGVuIGNhbGxlZCwgeW91IHdpbGwgc2VuZCB0aGUgcHVibGljX3Rva2VuIGFuZCB0aGUgc2VsZWN0ZWRcbiAgICAgICAgICAgIC8vIGFjY291bnQgSUQsIG1ldGFkYXRhLmFjY291bnRfaWQsIHRvIHlvdXIgYmFja2VuZCBhcHAgc2VydmVyLlxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIHNlbmREYXRhVG9CYWNrZW5kU2VydmVyKHtcbiAgICAgICAgICAgIC8vICAgcHVibGljX3Rva2VuOiBwdWJsaWNfdG9rZW4sXG4gICAgICAgICAgICAvLyAgIGFjY291bnRfaWQ6IG1ldGFkYXRhLmFjY291bnRfaWRcbiAgICAgICAgICAgIC8vIH0pO1xuXG4gICAgICAgICAgICAvL3RoaXMuZGVidWcoJ1B1YmxpYyBUb2tlbjogJyArIHB1YmxpY190b2tlbik7XG4gICAgICAgICAgICAvL3RoaXMuZGVidWcoJ0N1c3RvbWVyLXNlbGVjdGVkIGFjY291bnQgSUQ6ICcgKyBtZXRhZGF0YS5hY2NvdW50X2lkKTtcblxuICAgICAgICAgICAgdmFyIHN1cHBvcnRmb3JtID0gJChvcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKTtcblxuICAgICAgICAgICAgLy8gcmVzcG9uc2UgY29udGFpbnMgaWQgYW5kIGNhcmQsIHdoaWNoIGNvbnRhaW5zIGFkZGl0aW9uYWwgY2FyZCBkZXRhaWxzXG4gICAgICAgICAgICAvLyBJbnNlcnQgdGhlIGRhdGEgaW50byB0aGUgZm9ybSBzbyBpdCBnZXRzIHN1Ym1pdHRlZCB0byB0aGUgc2VydmVyXG4gICAgICAgICAgICBzdXBwb3J0Zm9ybS5hcHBlbmQoJCgnPGlucHV0IHR5cGU9XFxcImhpZGRlblxcXCIgbmFtZT1cXFwicHVibGljX3Rva2VuXFxcIiAvPicpLnZhbChwdWJsaWNfdG9rZW4pKTtcbiAgICAgICAgICAgIHN1cHBvcnRmb3JtLmFwcGVuZCgkKCc8aW5wdXQgdHlwZT1cXFwiaGlkZGVuXFxcIiBuYW1lPVxcXCJhY2NvdW50X2lkXFxcIiAvPicpLnZhbChtZXRhZGF0YS5hY2NvdW50X2lkKSk7XG5cbiAgICAgICAgICAgIC8vIGdldCB0aGUgYWNjb3VudCB2YWxpZGF0ZWQgYnkgYWpheFxuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgdXJsOicvcGxhaWRfdG9rZW4vJyxcbiAgICAgICAgICAgICAgLy9jYWNoZTogZmFsc2UsXG4gICAgICAgICAgICAgIGRhdGE6ICQoc3VwcG9ydGZvcm0pLnNlcmlhbGl6ZSgpLFxuICAgICAgICAgICAgICB0eXBlOiAnUE9TVCdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZG9uZShmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICBpZiAodHlwZW9mIHJlc3BvbnNlLmVycm9yICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIC8vIHRoZXJlIGlzIGFuIGVycm9yLlxuICAgICAgICAgICAgICAgICQob3B0aW9ucy5wbGFpZF9saW5rKS5wYXJlbnQoKS5hZnRlcignPHAgY2xhc3M9XCJlcnJvclwiPicgKyByZXNwb25zZS5lcnJvciArICc8L3A+JylcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL3RoaXMuZGVidWcoJ3ByaW50IHJlc3BvbnNlIGhlcmUnKTtcbiAgICAgICAgICAgICAgICAvL3RoaXMuZGVidWcocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIC8vIGFkZCB0aGUgZmllbGQocykgd2UgbmVlZCB0byB0aGUgZm9ybSBmb3Igc3VibWl0dGluZ1xuICAgICAgICAgICAgICAgIGlmICgkKGJhbmtUb2tlbkZpZWxkKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAkKGJhbmtUb2tlbkZpZWxkKS52YWwocmVzcG9uc2Uuc3RyaXBlX2JhbmtfYWNjb3VudF90b2tlbik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICQob3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikucHJlcGVuZCgkKCc8aW5wdXQgdHlwZT1cXFwiaGlkZGVuXFxcIiBuYW1lPVwiJyArIGJhbmtUb2tlbkZpZWxkTmFtZSArICdcIj4nKS52YWwocmVzcG9uc2Uuc3RyaXBlX2JhbmtfYWNjb3VudF90b2tlbikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkKG9wdGlvbnMucGxhaWRfbGluaywgZWxlbWVudCkuaHRtbCgnPHN0cm9uZz5Zb3VyIGFjY291bnQgd2FzIHN1Y2Nlc3NmdWxseSBhdXRob3JpemVkPC9zdHJvbmc+JykuY29udGVudHMoKS51bndyYXAoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5lcnJvcihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAkKG9wdGlvbnMucGxhaWRfbGluaykucGFyZW50KCkuYWZ0ZXIoJzxwIGNsYXNzPVwiZXJyb3JcIj4nICsgcmVzcG9uc2UuZXJyb3IgKyAnPC9wPicpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9uRXhpdDogZnVuY3Rpb24oZXJyLCBtZXRhZGF0YSkge1xuICAgICAgICAgICAgLy8gVGhlIHVzZXIgZXhpdGVkIHRoZSBMaW5rIGZsb3cuXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICAgICQob3B0aW9ucy5wbGFpZF9saW5rLCBlbGVtZW50KS5jbGljayhmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgJChvcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yICsgJyAuZXJyb3InKS5yZW1vdmUoKTsgLy8gcmVtb3ZlIG1ldGhvZCBlcnJvciBtZXNzYWdlIGlmIGl0IGlzIHRoZXJlXG4gICAgICAgICAgbGlua0hhbmRsZXIub3BlbigpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LCAvLyBhY2hGaWVsZHNcblxuICAgIGhhc0h0bWw1VmFsaWRhdGlvbjogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgLy90aGlzLmRlYnVnKCd2YWx1ZSBpcyAnICsgdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykuY2hlY2tWYWxpZGl0eSA9PT0gJ2Z1bmN0aW9uJyk7XG4gICAgICByZXR1cm4gdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykuY2hlY2tWYWxpZGl0eSA9PT0gJ2Z1bmN0aW9uJztcbiAgICB9LCAvLyBoYXNIdG1sNVZhbGlkYXRpb25cblxuICAgIGJ1dHRvblN0YXR1czogZnVuY3Rpb24ob3B0aW9ucywgYnV0dG9uLCBkaXNhYmxlZCkge1xuICAgICAgLy8gbWFrZSB0aGUgYnV0dG9uIGNsaWNrYWJsZSBvciBub3RcbiAgICAgIGJ1dHRvbi5wcm9wKCdkaXNhYmxlZCcsIGRpc2FibGVkKTtcbiAgICAgIGlmIChkaXNhYmxlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgYnV0dG9uLnRleHQob3B0aW9ucy5idXR0b25fdGV4dCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBidXR0b24udGV4dCgnUHJvY2Vzc2luZycpO1xuICAgICAgfVxuICAgIH0sIC8vIGJ1dHRvblN0YXR1c1xuXG4gICAgdmFsaWRhdGVBbmRTdWJtaXQ6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICQob3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3Rvcikuc3VibWl0KGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgLy8gZG8gc29tZSBmYWxsYmFjayBzdHVmZiBmb3Igbm9uLWh0bWw1IGJyb3dzZXJzXG4gICAgICAgIGlmICh0aGF0Lmhhc0h0bWw1VmFsaWRhdGlvbihlbGVtZW50LCBvcHRpb25zKSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmNoZWNrVmFsaWRpdHkoKSkge1xuICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpbnZhbGlkJyk7XG4gICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICBzY3JvbGxUb3A6ICQodGhpcykuZmluZCgnaW5wdXQ6aW52YWxpZCcpLnBhcmVudCgpLm9mZnNldCgpLnRvcFxuICAgICAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgICAgICAgLy90aGlzLmRlYnVnKCd0b3AgaXMgJyArICk7XG4gICAgICAgICAgICAgICQodGhpcykuZmluZCgnaW5wdXQ6aW52YWxpZCcpLnBhcmVudCgpLmFkZENsYXNzKCdlcnJvcicpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaW52YWxpZCcpO1xuICAgICAgICAgICAgICAkKHRoaXMpLmZpbmQoJ2lucHV0OmludmFsaWQnKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnZXJyb3InKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHZhbGlkYXRlIGFuZCBzdWJtaXQgdGhlIGZvcm1cbiAgICAgICAgJCgnLmNoZWNrLWZpZWxkJykucmVtb3ZlKCk7XG4gICAgICAgICQoJ2lucHV0LCBsYWJlbCcsIGVsZW1lbnQpLnJlbW92ZUNsYXNzKCdlcnJvcicpO1xuICAgICAgICB2YXIgdmFsaWQgPSB0cnVlO1xuICAgICAgICB2YXIgcGF5bWVudF90eXBlID0gJCgnaW5wdXRbbmFtZT1cInN0cmlwZV9wYXltZW50X3R5cGVcIl0nKS52YWwoKTtcbiAgICAgICAgJCh0aGF0Lm9wdGlvbnMuY2hvb3NlX3BheW1lbnQgKyAnIGlucHV0JykuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICQodGhhdC5vcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yICsgJyAuZXJyb3InKS5yZW1vdmUoKTsgLy8gcmVtb3ZlIG1ldGhvZCBlcnJvciBtZXNzYWdlIGlmIGl0IGlzIHRoZXJlXG4gICAgICAgICAgLy8gaWYgYSBwYXltZW50IGZpZWxkIGNoYW5nZWQsIHJlc2V0IHRoZSBidXR0b25cbiAgICAgICAgICB0aGF0LmJ1dHRvblN0YXR1cyhvcHRpb25zLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIGZhbHNlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHBheW1lbnRfdHlwZSA9PT0gJ2JhbmtfYWNjb3VudCcpIHtcbiAgICAgICAgICBpZiAoJCgnaW5wdXRbbmFtZT1cImJhbmtUb2tlblwiXScpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICQodGhhdC5vcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yKS5wcmVwZW5kKCc8cCBjbGFzcz1cImVycm9yXCI+WW91IGFyZSByZXF1aXJlZCB0byBlbnRlciBjcmVkaXQgY2FyZCBpbmZvcm1hdGlvbiwgb3IgdG8gYXV0aG9yaXplIE1pbm5Qb3N0IHRvIGNoYXJnZSB5b3VyIGJhbmsgYWNjb3VudCwgdG8gbWFrZSBhIHBheW1lbnQuPC9wPicpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWxpZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIC8vIDEuIHNldCB1cCB0aGUgYnV0dG9uIGFuZCByZW1vdmUgdGhlIGhpZGRlbiBmaWVsZHMgd2UgZG9uJ3QgbmVlZFxuICAgICAgICAgIHRoYXQuYnV0dG9uU3RhdHVzKHRoYXQub3B0aW9ucywgJCh0aGF0Lm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLmZpbmQoJ2J1dHRvbicpLCB0cnVlKTtcbiAgICAgICAgICB2YXIgdG9rZW5EYXRhID0gdGhhdC5nZW5lcmF0ZVRva2VuRGF0YSgpO1xuXG4gICAgICAgICAgLy8gMi4gY3JlYXRlIG1pbm5wb3N0IGFjY291bnQgaWYgc3BlY2lmaWVkXG4gICAgICAgICAgaWYgKHRoYXQub3B0aW9ucy5jcmVhdGVfYWNjb3VudCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdmFyIHVzZXIgPSB7XG4gICAgICAgICAgICAgIGVtYWlsOiAkKHRoYXQub3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgICAgIGZpcnN0X25hbWU6ICQodGhhdC5vcHRpb25zLmZpcnN0X25hbWVfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgICAgICBsYXN0X25hbWU6ICQodGhhdC5vcHRpb25zLmxhc3RfbmFtZV9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgICAgIHBhc3N3b3JkOiAkKHRoYXQub3B0aW9ucy5wYXNzd29yZF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgICAgIGNpdHk6ICQodGhhdC5vcHRpb25zLmFjY291bnRfY2l0eV9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgICAgIHN0YXRlOiAkKHRoYXQub3B0aW9ucy5hY2NvdW50X3N0YXRlX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICAgICAgemlwOiAkKHRoYXQub3B0aW9ucy5hY2NvdW50X3ppcF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgIHVybDogdGhhdC5vcHRpb25zLm1pbm5wb3N0X3Jvb3QgKyAnL3dwLWpzb24vdXNlci1hY2NvdW50LW1hbmFnZW1lbnQvdjEvY3JlYXRlLXVzZXInLFxuICAgICAgICAgICAgICBkYXRhOiB1c2VyXG4gICAgICAgICAgICB9KS5kb25lKGZ1bmN0aW9uKCBkYXRhICkge1xuICAgICAgICAgICAgICBpZiAoZGF0YS5zdGF0dXMgPT09ICdzdWNjZXNzJyAmJiBkYXRhLnJlYXNvbiA9PT0gJ25ldyB1c2VyJykge1xuICAgICAgICAgICAgICAgIC8vIHVzZXIgY3JlYXRlZCAtIHRoZXkgc2hvdWxkIHJlY2VpdmUgZW1haWxcbiAgICAgICAgICAgICAgICAvLyBzdWJtaXQgdGhlIGZvcm1cbiAgICAgICAgICAgICAgICAvL3N1cHBvcnRmb3JtLmdldCgwKS5zdWJtaXQoKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyB1c2VyIG5vdCBjcmVhdGVkXG4gICAgICAgICAgICAgICAgLy8gc3RpbGwgc3VibWl0IHRoZSBmb3JtXG4gICAgICAgICAgICAgICAgLy9zdXBwb3J0Zm9ybS5nZXQoMCkuc3VibWl0KCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICgkKCdpbnB1dFtuYW1lPVwiYmFua1Rva2VuXCJdJykubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgIC8vIGZpbmFsbHksIGdldCBhIHRva2VuIGZyb20gc3RyaXBlLCBhbmQgdHJ5IHRvIGNoYXJnZSBpdCBpZiBpdCBpcyBub3QgYWNoXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZVRva2VuKHRoYXQuY2FyZE51bWJlckVsZW1lbnQsIHRva2VuRGF0YSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGlmIGl0IGlzIGFjaCwgd2UgYWxyZWFkeSBoYXZlIGEgdG9rZW4gc28gcGFzcyBpdCB0byBzdHJpcGUuXG4gICAgICAgICAgICB0aGF0LnN0cmlwZVRva2VuSGFuZGxlciggJCgnI2JhbmtUb2tlbicpLnZhbCgpLCAnYmFua19hY2NvdW50JyApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyB0aGlzIG1lYW5zIHZhbGlkIGlzIGZhbHNlXG4gICAgICAgICAgdGhhdC5idXR0b25TdGF0dXModGhhdC5vcHRpb25zLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICB9KTtcbiAgICB9LCAvLyB2YWxpZGF0ZUFuZFN1Ym1pdFxuXG4gICAgc3RyaXBlRXJyb3JEaXNwbGF5OiBmdW5jdGlvbihldmVudCwgdGhpc19zZWxlY3RvciwgZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgLy8gbGlzdGVuIGZvciBlcnJvcnMgYW5kIGRpc3BsYXkvaGlkZSBlcnJvciBtZXNzYWdlc1xuICAgICAgdmFyIHdoaWNoX2Vycm9yID0gdGhpc19zZWxlY3Rvci5hdHRyKCdpZCcpO1xuICAgICAgLy8gd2hlbiB0aGlzIGZpZWxkIGNoYW5nZXMsIHJlc2V0IGl0cyBlcnJvcnNcbiAgICAgICQoJy5jYXJkLWluc3RydWN0aW9uLicgKyB3aGljaF9lcnJvcikucmVtb3ZlQ2xhc3MoJ2ludmFsaWQnKTtcbiAgICAgICQoJy5jYXJkLWluc3RydWN0aW9uLicgKyB3aGljaF9lcnJvcikuZW1wdHkoKTtcbiAgICAgIGlmIChldmVudC5lcnJvcikge1xuICAgICAgICAkKCcuY2FyZC1pbnN0cnVjdGlvbi4nICsgd2hpY2hfZXJyb3IpLnRleHQoZXZlbnQuZXJyb3IubWVzc2FnZSArICcgUGxlYXNlIHRyeSBhZ2Fpbi4nKTtcbiAgICAgICAgJCgnLmNhcmQtaW5zdHJ1Y3Rpb24uJyArIHdoaWNoX2Vycm9yKS5hZGRDbGFzcygnaW52YWxpZCcpO1xuICAgICAgICB0aGlzX3NlbGVjdG9yLnBhcmVudCgpLmFkZENsYXNzKCdlcnJvcicpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJCgnLmNhcmQtaW5zdHJ1Y3Rpb24uJyArIHdoaWNoX2Vycm9yKS5yZW1vdmVDbGFzcygnaW52YWxpZCcpO1xuICAgICAgICAkKCcuY2FyZC1pbnN0cnVjdGlvbi4nICsgd2hpY2hfZXJyb3IpLmVtcHR5KCk7XG4gICAgICAgICQob3B0aW9ucy5jY19udW1fc2VsZWN0b3IsIGVsZW1lbnQpLnJlbW92ZUNsYXNzKCdlcnJvcicpO1xuICAgICAgICAkKG9wdGlvbnMuY2NfZXhwX3NlbGVjdG9yLCBlbGVtZW50KS5yZW1vdmVDbGFzcygnZXJyb3InKTtcbiAgICAgICAgJChvcHRpb25zLmNjX2N2dl9zZWxlY3RvciwgZWxlbWVudCkucmVtb3ZlQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICQob3B0aW9ucy5jY19udW1fc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdlcnJvcicpO1xuICAgICAgICAkKG9wdGlvbnMuY2NfZXhwX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnZXJyb3InKTtcbiAgICAgICAgJChvcHRpb25zLmNjX2N2dl9zZWxlY3RvciwgZWxlbWVudCkucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICB9XG4gICAgfSwgLy8gc3RyaXBlRXJyb3JEaXNwbGF5XG5cbiAgICBnZW5lcmF0ZVRva2VuRGF0YTogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgdG9rZW5EYXRhID0ge307XG4gICAgICB2YXIgZnVsbF9uYW1lID0gJyc7XG4gICAgICBpZiAoJCgnI2Z1bGxfbmFtZScpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZnVsbF9uYW1lID0gJCgnI2Z1bGxfbmFtZScpLnZhbCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZnVsbF9uYW1lID0gJCgnI2ZpcnN0X25hbWUnKS52YWwoKSArICcgJyArICQoJyNsYXN0X25hbWUnKS52YWwoKTtcbiAgICAgIH1cbiAgICAgIHRva2VuRGF0YS5uYW1lID0gZnVsbF9uYW1lO1xuXG4gICAgICB2YXIgc3RyZWV0ID0gJ05vbmUnO1xuICAgICAgaWYgKCQoJ2lucHV0W25hbWU9XCJmdWxsX2FkZHJlc3NcIl0nKS52YWwoKSAhPSAnJykge1xuICAgICAgICBzdHJlZXQgPSAkKCcjZnVsbF9hZGRyZXNzJykudmFsKCk7XG4gICAgICAgIGlmICgkKCdpbnB1dFtuYW1lPVwiYmlsbGluZ19zdHJlZXRcIl0nKS52YWwoKSAhPSAnJykge1xuICAgICAgICAgIHN0cmVldCA9ICQoJ2lucHV0W25hbWU9XCJiaWxsaW5nX3N0cmVldFwiXScpLnZhbCgpO1xuICAgICAgICB9XG4gICAgICAgIHRva2VuRGF0YS5hZGRyZXNzX2xpbmUxID0gc3RyZWV0O1xuICAgICAgfVxuXG4gICAgICB2YXIgY2l0eSA9ICdOb25lJztcbiAgICAgIGlmICgkKCdpbnB1dFtuYW1lPVwiYmlsbGluZ19jaXR5XCJdJykudmFsKCkgIT0gJycpIHtcbiAgICAgICAgY2l0eSA9ICQoJ2lucHV0W25hbWU9XCJiaWxsaW5nX2NpdHlcIl0nKS52YWwoKTtcbiAgICAgICAgdG9rZW5EYXRhLmFkZHJlc3NfY2l0eSA9IGNpdHk7XG4gICAgICB9XG5cbiAgICAgIHZhciBzdGF0ZSA9ICdOb25lJztcbiAgICAgIGlmICgkKCdpbnB1dFtuYW1lPVwiYmlsbGluZ19zdGF0ZVwiXScpLnZhbCgpICE9ICcnKSB7XG4gICAgICAgIHN0YXRlID0gJCgnaW5wdXRbbmFtZT1cImJpbGxpbmdfc3RhdGVcIl0nKS52YWwoKTtcbiAgICAgICAgdG9rZW5EYXRhLmFkZHJlc3Nfc3RhdGUgPSBzdGF0ZTtcbiAgICAgIH1cblxuICAgICAgdmFyIHppcCA9ICdOb25lJztcbiAgICAgIGlmICgkKCdpbnB1dFtuYW1lPVwiYmlsbGluZ196aXBcIl0nKS52YWwoKSAhPSAnJykge1xuICAgICAgICB6aXAgPSAkKCdpbnB1dFtuYW1lPVwiYmlsbGluZ196aXBcIl0nKS52YWwoKTtcbiAgICAgICAgdG9rZW5EYXRhLmFkZHJlc3NfemlwID0gemlwO1xuICAgICAgfVxuXG4gICAgICB2YXIgY291bnRyeSA9ICdVUyc7XG4gICAgICBpZiAoJCgnaW5wdXRbbmFtZT1cImJpbGxpbmdfY291bnRyeVwiXScpLnZhbCgpICE9ICcnKSB7XG4gICAgICAgIGNvdW50cnkgPSAkKCdpbnB1dFtuYW1lPVwiYmlsbGluZ19jb3VudHJ5XCJdJykudmFsKCk7XG4gICAgICB9XG4gICAgICB0b2tlbkRhdGEuYWRkcmVzc19jb3VudHJ5ID0gY291bnRyeTtcblxuICAgICAgcmV0dXJuIHRva2VuRGF0YTtcbiAgICB9LCAvLyBnZW5lcmF0ZVRva2VuRGF0YVxuXG4gICAgY3JlYXRlVG9rZW46IGZ1bmN0aW9uKGNhcmQsIHRva2VuRGF0YSkge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdGhhdC5zdHJpcGUuY3JlYXRlVG9rZW4oY2FyZCwgdG9rZW5EYXRhKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICBpZiAocmVzdWx0LmVycm9yKSB7XG4gICAgICAgICAgLy8gU2hvdyB0aGUgZXJyb3JzIG9uIHRoZSBmb3JtXG4gICAgICAgICAgdGhhdC5idXR0b25TdGF0dXModGhhdC5vcHRpb25zLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIGZhbHNlKTtcbiAgICAgICAgICB2YXIgZmllbGQgPSByZXN1bHQuZXJyb3IuZmllbGQgKyAnX2ZpZWxkX3NlbGVjdG9yJztcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9ICcnO1xuICAgICAgICAgIGlmICh0eXBlb2YgcmVzdWx0LmVycm9yLm1lc3NhZ2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBtZXNzYWdlID0gcmVzdWx0LmVycm9yLm1lc3NhZ2U7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1lc3NhZ2UgPSByZXN1bHQuZXJyb3IubWVzc2FnZVswXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCQoZmllbGQpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICQodGhhdC5vcHRpb25zW2ZpZWxkXSwgZWxlbWVudCkuYWRkQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICAgICAkKHRoYXQub3B0aW9uc1tmaWVsZF0sIGVsZW1lbnQpLnByZXYoKS5hZGRDbGFzcygnZXJyb3InKTtcbiAgICAgICAgICAgICQodGhhdC5vcHRpb25zW2ZpZWxkXSwgZWxlbWVudCkuYWZ0ZXIoJzxzcGFuIGNsYXNzPVwiY2hlY2stZmllbGQgaW52YWxpZFwiPicgKyBtZXNzYWdlICsgJzwvc3Bhbj4nKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gU2VuZCB0aGUgdG9rZW4gdG8geW91ciBzZXJ2ZXJcbiAgICAgICAgICB0aGF0LnN0cmlwZVRva2VuSGFuZGxlcihyZXN1bHQudG9rZW4sICdjYXJkJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sIC8vIGNyZWF0ZVRva2VuXG5cbiAgICBzdHJpcGVUb2tlbkhhbmRsZXI6IGZ1bmN0aW9uKHRva2VuLCB0eXBlKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB2YXIgc3VwcG9ydGZvcm0gPSAkKHRoaXMub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3Rvcik7XG4gICAgICB2YXIgYWpheF91cmwgPSAnJztcbiAgICAgIHZhciB0b2tlbkZpZWxkTmFtZSA9ICdzdHJpcGVUb2tlbic7XG4gICAgICB2YXIgdG9rZW5GaWVsZCA9ICdpbnB1dFtuYW1lPVwiJyArIHRva2VuRmllbGROYW1lICsgJ1wiXSc7XG4gICAgICBpZiAodHlwZW9mICQoc3VwcG9ydGZvcm0pLmRhdGEoJ2FjdGlvbicpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBhamF4X3VybCA9ICQoc3VwcG9ydGZvcm0pLmRhdGEoJ2FjdGlvbicpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWpheF91cmwgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG4gICAgICB9XG4gICAgICAvLyBJbnNlcnQgdGhlIHRva2VuIElEIGludG8gdGhlIGZvcm0gc28gaXQgZ2V0cyBzdWJtaXR0ZWQgdG8gdGhlIHNlcnZlclxuICAgICAgaWYgKCB0eXBlID09PSAnY2FyZCcgKSB7XG4gICAgICAgIGlmICh0b2tlbi5jYXJkLmJyYW5kLmxlbmd0aCA+IDAgJiYgdG9rZW4uY2FyZC5icmFuZCA9PT0gJ0FtZXJpY2FuIEV4cHJlc3MnKSB7XG4gICAgICAgICAgdHlwZSA9ICdhbWV4JztcbiAgICAgICAgfVxuICAgICAgICBpZiAoJCh0b2tlbkZpZWxkKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgJCh0b2tlbkZpZWxkKS52YWwodG9rZW4uaWQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN1cHBvcnRmb3JtLmFwcGVuZCgkKCc8aW5wdXQgdHlwZT1cXFwiaGlkZGVuXFxcIiBuYW1lPVwiJyArIHRva2VuRmllbGROYW1lICsgJ1wiPicpLnZhbCh0b2tlbi5pZCkpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgICQoJ2lucHV0W25hbWU9XCJzdHJpcGVfcGF5bWVudF90eXBlXCJdJykudmFsKHR5cGUpO1xuXG4gICAgICAvLyBTdWJtaXQgdGhlIGZvcm1cbiAgICAgIC8vIHRoZSB3YXkgaXQgd29ya3MgY3VycmVudGx5IGlzIHRoZSBmb3JtIHN1Ym1pdHMgYW4gYWpheCByZXF1ZXN0IHRvIGl0c2VsZlxuICAgICAgLy8gdGhlbiBpdCBzdWJtaXRzIGEgcG9zdCByZXF1ZXN0IHRvIHRoZSBmb3JtJ3MgYWN0aW9uIHVybFxuICAgICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBhamF4X3VybCxcbiAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICBkYXRhOiAkKHN1cHBvcnRmb3JtKS5zZXJpYWxpemUoKSxcbiAgICAgICAgdHlwZTogJ1BPU1QnXG4gICAgICB9KVxuICAgICAgLmRvbmUoZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKHR5cGVvZiByZXNwb25zZS5lcnJvcnMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgLy8gZG8gbm90IHN1Ym1pdC4gdGhlcmUgaXMgYW4gZXJyb3IuXG4gICAgICAgICAgdGhhdC5idXR0b25TdGF0dXModGhhdC5vcHRpb25zLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIGZhbHNlKTtcbiAgICAgICAgICAvLyBhZGQgc29tZSBlcnJvciBtZXNzYWdlcyBhbmQgc3R5bGVzXG4gICAgICAgICAgJC5lYWNoKHJlc3BvbnNlLmVycm9ycywgZnVuY3Rpb24oIGluZGV4LCBlcnJvciApIHtcbiAgICAgICAgICAgIHZhciBmaWVsZCA9IGVycm9yLmZpZWxkICsgJ19maWVsZF9zZWxlY3Rvcic7XG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9ICcnO1xuICAgICAgICAgICAgdmFyIHN0cmlwZUVycm9yU2VsZWN0b3IgPSAnJztcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZXJyb3IubWVzc2FnZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgbWVzc2FnZSA9IGVycm9yLm1lc3NhZ2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBtZXNzYWdlID0gZXJyb3IubWVzc2FnZVswXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgkKHRoYXQub3B0aW9uc1tmaWVsZF0pLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgJCh0aGF0Lm9wdGlvbnNbZmllbGRdKS5hZGRDbGFzcygnZXJyb3InKTtcbiAgICAgICAgICAgICAgJCh0aGF0Lm9wdGlvbnNbZmllbGRdKS5wcmV2KCkuYWRkQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICAgICAgICQodGhhdC5vcHRpb25zW2ZpZWxkXSkuYWZ0ZXIoJzxzcGFuIGNsYXNzPVwiY2hlY2stZmllbGQgaW52YWxpZFwiPicgKyBtZXNzYWdlICsgJzwvc3Bhbj4nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBlcnJvciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgdGhhdC5idXR0b25TdGF0dXModGhhdC5vcHRpb25zLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIGZhbHNlLCAnY2FyZCcpO1xuICAgICAgICAgICAgICBpZiAoZXJyb3IuY29kZSA9PSAnaW52YWxpZF9udW1iZXInIHx8IGVycm9yLmNvZGUgPT0gJ2luY29ycmVjdF9udW1iZXInIHx8IGVycm9yLmNvZGUgPT0gJ2NhcmRfZGVjbGluZWQnIHx8IGVycm9yLmNvZGUgPT0gJ3Byb2Nlc3NpbmdfZXJyb3InKSB7XG4gICAgICAgICAgICAgICAgLy8gZXJyb3IgaGFuZGxpbmdcbiAgICAgICAgICAgICAgICBzdHJpcGVFcnJvclNlbGVjdG9yID0gJCh0aGF0Lm9wdGlvbnMuY2NfbnVtX3NlbGVjdG9yKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmIChlcnJvci5jb2RlID09ICdpbnZhbGlkX2V4cGlyeV9tb250aCcgfHwgZXJyb3IuY29kZSA9PSAnaW52YWxpZF9leHBpcnlfeWVhcicgfHwgZXJyb3IuY29kZSA9PSAnZXhwaXJlZF9jYXJkJykge1xuICAgICAgICAgICAgICAgIC8vIGVycm9yIGhhbmRsaW5nXG4gICAgICAgICAgICAgICAgc3RyaXBlRXJyb3JTZWxlY3RvciA9ICQodGhhdC5vcHRpb25zLmNjX2V4cF9zZWxlY3Rvcik7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAoZXJyb3IuY29kZSA9PSAnaW52YWxpZF9jdmMnIHx8IGVycm9yLmNvZGUgPT0gJ2luY29ycmVjdF9jdmMnKSB7XG4gICAgICAgICAgICAgICAgLy8gZXJyb3IgaGFuZGxpbmdcbiAgICAgICAgICAgICAgICBzdHJpcGVFcnJvclNlbGVjdG9yID0gJCh0aGF0Lm9wdGlvbnMuY2NfY3Z2X3NlbGVjdG9yKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmIChzdHJpcGVFcnJvclNlbGVjdG9yICE9PSAnJykge1xuICAgICAgICAgICAgICAgIHRoYXQuc3RyaXBlRXJyb3JEaXNwbGF5KHJlc3BvbnNlLmVycm9ycywgc3RyaXBlRXJyb3JTZWxlY3RvciwgdGhhdC5lbGVtZW50LCB0aGF0Lm9wdGlvbnMgKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmIChlcnJvci5maWVsZCA9PSAncmVjYXB0Y2hhJykge1xuICAgICAgICAgICAgICAgICQoJ2J1dHRvbi5naXZlJykuYmVmb3JlKCc8cCBjbGFzcz1cInJlY2FwdGNoYS1lcnJvclwiPicgKyBtZXNzYWdlICsgJzwvcD4nKVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKGVycm9yLnR5cGUgPT0gJ2ludmFsaWRfcmVxdWVzdF9lcnJvcicpIHtcbiAgICAgICAgICAgICAgICAkKCdidXR0b24uZ2l2ZScpLmJlZm9yZSgnPHAgY2xhc3M9XCJlcnJvciBlcnJvci1pbnZhbGlkLXJlcXVlc3RcIj4nICsgZXJyb3IubWVzc2FnZSArICc8L3A+JylcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgcmVzcG9uc2UuZXJyb3JzWzBdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICB2YXIgZmllbGQgPSByZXNwb25zZS5lcnJvcnNbMF0uZmllbGQgKyAnX2ZpZWxkX3NlbGVjdG9yJztcbiAgICAgICAgICAgICAgaWYgKCQoZmllbGQpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6ICQob3B0aW9uc1tmaWVsZF0pLnBhcmVudCgpLm9mZnNldCgpLnRvcFxuICAgICAgICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3VwcG9ydGZvcm0uZ2V0KDApLnN1Ym1pdCgpOyAvLyBjb250aW51ZSBzdWJtaXR0aW5nIHRoZSBmb3JtIGlmIHRoZSBhamF4IHdhcyBzdWNjZXNzZnVsXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAuZXJyb3IoZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgdGhhdC5idXR0b25TdGF0dXModGhhdC5vcHRpb25zLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIGZhbHNlKTtcbiAgICAgIH0pO1xuXG4gICAgfSxcblxuICAgIHNob3dOZXdzbGV0dGVyU2V0dGluZ3M6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcblxuICAgICAgdmFyIG5ld3NsZXR0ZXJfZ3JvdXBfaHRtbCA9ICcnO1xuICAgICAgaWYgKCQob3B0aW9ucy5uZXdzbGV0dGVyX2dyb3VwX3NlbGVjdG9yKS5sZW5ndGggPiAwICkge1xuICAgICAgICB2YXIgZ2V0X2RhdGEgPSB7XG4gICAgICAgICAgc2hvcnRjb2RlOiAnbmV3c2xldHRlcl9mb3JtJyxcbiAgICAgICAgICBwbGFjZW1lbnQ6ICd1c2VyYWNjb3VudCdcbiAgICAgICAgfTtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgIHVybDogb3B0aW9ucy5taW5ucG9zdF9yb290ICsgJy93cC1qc29uL21pbm5wb3N0LWFwaS92Mi9tYWlsY2hpbXAvZm9ybScsXG4gICAgICAgICAgZGF0YTogZ2V0X2RhdGFcbiAgICAgICAgfSkuZG9uZShmdW5jdGlvbiggcmVzdWx0ICkge1xuICAgICAgICAgIGlmICggdHlwZW9mIHJlc3VsdC5ncm91cF9maWVsZHMgIT09ICd1bmRlZmluZWQnICkge1xuICAgICAgICAgICAgJC5lYWNoKHJlc3VsdC5ncm91cF9maWVsZHMsIGZ1bmN0aW9uKCBpbmRleCwgY2F0ZWdvcnkgKSB7XG4gICAgICAgICAgICAgIG5ld3NsZXR0ZXJfZ3JvdXBfaHRtbCArPSAnPGZpZWxkc2V0IGNsYXNzPVwibS1mb3JtLWl0ZW0gc3VwcG9ydC1uZXdzbGV0dGVyIG0tZm9ybS1pdGVtLScgKyBjYXRlZ29yeS50eXBlICsgJ1wiPic7XG4gICAgICAgICAgICAgIG5ld3NsZXR0ZXJfZ3JvdXBfaHRtbCArPSAnPGxhYmVsPicgKyBjYXRlZ29yeS5uYW1lICsgJzo8L2xhYmVsPic7XG4gICAgICAgICAgICAgIGlmICggY2F0ZWdvcnkuY29udGFpbnMubGVuZ3RoID4gMCApIHtcbiAgICAgICAgICAgICAgICBuZXdzbGV0dGVyX2dyb3VwX2h0bWwgKz0gJzxkaXYgY2xhc3M9XCJmb3JtLWl0ZW0gZm9ybS1pdGVtLS1uZXdzbGV0dGVyXCI+JztcbiAgICAgICAgICAgICAgICAkLmVhY2goY2F0ZWdvcnlbY2F0ZWdvcnkuY29udGFpbnNdLCBmdW5jdGlvbiggaW5kZXgsIGl0ZW0gKSB7XG4gICAgICAgICAgICAgICAgICBuZXdzbGV0dGVyX2dyb3VwX2h0bWwgKz0gJzxsYWJlbD48aW5wdXQgbmFtZT1cImdyb3Vwc19zdWJtaXR0ZWRcIiB0eXBlPVwiY2hlY2tib3hcIiB2YWx1ZT1cIicgKyBpdGVtLmlkICsgJ1wiPicgKyBpdGVtLm5hbWUgKyAnPC9sYWJlbD4nO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIG5ld3NsZXR0ZXJfZ3JvdXBfaHRtbCArPSAnPC9kaXY+JztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBuZXdzbGV0dGVyX2dyb3VwX2h0bWwgKz0gJzwvZmllbGRzZXQ+JztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJChvcHRpb25zLm5ld3NsZXR0ZXJfZ3JvdXBfc2VsZWN0b3IpLmh0bWwobmV3c2xldHRlcl9ncm91cF9odG1sKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoJChvcHRpb25zLm5ld3NsZXR0ZXJfZ3JvdXBfc2VsZWN0b3IpLmxlbmd0aCA+IDAgJiYgdHlwZW9mICQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHZhciBnZXRfZGF0YSA9IHtcbiAgICAgICAgICBlbWFpbDogJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKVxuICAgICAgICB9O1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgdXJsOiBvcHRpb25zLm1pbm5wb3N0X3Jvb3QgKyAnL3dwLWpzb24vbWlubnBvc3QtYXBpL3YyL21haWxjaGltcC91c2VyJyxcbiAgICAgICAgICBkYXRhOiBnZXRfZGF0YVxuICAgICAgICB9KS5kb25lKGZ1bmN0aW9uKCByZXN1bHQgKSB7XG4gICAgICAgICAgaWYgKCB0eXBlb2YgcmVzdWx0Lm1haWxjaGltcF9zdGF0dXMgIT09ICd1bmRlZmluZWQnICkge1xuICAgICAgICAgICAgJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5hZnRlcignPGlucHV0IG5hbWU9XCJtYWlsY2hpbXBfc3RhdHVzXCIgdHlwZT1cImhpZGRlblwiIHZhbHVlPVwiJyArIHJlc3VsdC5tYWlsY2hpbXBfc3RhdHVzICsgJ1wiPicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIHR5cGVvZiByZXN1bHQubWFpbGNoaW1wX3VzZXJfaWQgIT09ICd1bmRlZmluZWQnICkge1xuICAgICAgICAgICAgJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5hZnRlcignPGlucHV0IG5hbWU9XCJtYWlsY2hpbXBfdXNlcl9pZFwiIHR5cGU9XCJoaWRkZW5cIiB2YWx1ZT1cIicgKyByZXN1bHQubWFpbGNoaW1wX3VzZXJfaWQgKyAnXCI+Jyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChyZXN1bHQubWFpbGNoaW1wX3N0YXR1cyA9PT0gJ3N1YnNjcmliZWQnKSB7XG4gICAgICAgICAgICAvLyB1c2VyIGNyZWF0ZWQgLSBzaG93IGEgc3VjY2VzcyBtZXNzYWdlXG4gICAgICAgICAgICAkKCcuY29uZmlybS1pbnN0cnVjdGlvbnMnKS50ZXh0KCQoJy5jb25maXJtLWluc3RydWN0aW9ucycpLmF0dHIoJ2RhdGEta25vd24tdXNlcicpKTtcbiAgICAgICAgICAgIHZhciBncm91cHMgPSByZXN1bHQuZ3JvdXBzO1xuICAgICAgICAgICAgJC5lYWNoKGdyb3VwcywgZnVuY3Rpb24oIGluZGV4LCB2YWx1ZSApIHtcbiAgICAgICAgICAgICAgaWYgKCB2YWx1ZSA9PT0gdHJ1ZSApIHtcbiAgICAgICAgICAgICAgICAkKCc6Y2hlY2tib3hbdmFsdWU9XCInICsgaW5kZXggKyAnXCJdJykucHJvcCgnY2hlY2tlZCcsdHJ1ZSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJCgnOmNoZWNrYm94W3ZhbHVlPVwiJyArIGluZGV4ICsgJ1wiXScpLnByb3AoJ2NoZWNrZWQnLGZhbHNlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgIH0sIC8vIHNob3dOZXdzbGV0dGVyU2V0dGluZ3NcblxuICAgIGNvbmZpcm1NZXNzYWdlU3VibWl0OiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG5cbiAgICAgIHZhciBleGlzdGluZ19uZXdzbGV0dGVyX3NldHRpbmdzID0gJChvcHRpb25zLm5ld3NsZXR0ZXJfZ3JvdXBfc2VsZWN0b3IgKyAnIGlucHV0Jykuc2VyaWFsaXplKCk7XG4gICAgICAvL3RoaXMuZGVidWcoZXhpc3RpbmdfbmV3c2xldHRlcl9zZXR0aW5ncyk7XG5cbiAgICAgICQob3B0aW9ucy5jb25maXJtX2Zvcm1fc2VsZWN0b3IpLnN1Ym1pdChmdW5jdGlvbihldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIHZhciBjb25maXJtZm9ybSA9ICQob3B0aW9ucy5jb25maXJtX2Zvcm1fc2VsZWN0b3IpO1xuICAgICAgICAvLyBzdWJtaXQgc2V0dGluZ3MgdG8gbWFpbGNoaW1wXG4gICAgICAgIC8vIG5lZWQgdG8gZ2V0IHVzZXIgaW5mbyBvbiBhIGhpZGRlbiBmaWVsZCBoZXJlXG5cbiAgICAgICAgdmFyIG5ld3NsZXR0ZXJfZ3JvdXBzID0gJChvcHRpb25zLm5ld3NsZXR0ZXJfZ3JvdXBfc2VsZWN0b3IgKyAnIGlucHV0OmNoZWNrZWQnKTtcbiAgICAgICAgdmFyIG5ld19uZXdzbGV0dGVyX3NldHRpbmdzID0gbmV3c2xldHRlcl9ncm91cHMuc2VyaWFsaXplKCk7XG5cbiAgICAgICAgaWYgKChleGlzdGluZ19uZXdzbGV0dGVyX3NldHRpbmdzICE9PSBuZXdfbmV3c2xldHRlcl9zZXR0aW5ncykgJiYgKHR5cGVvZiBuZXdzbGV0dGVyX2dyb3VwcyAhPT0gJ3VuZGVmaW5lZCcpKSB7XG4gICAgICAgICAgLy9hZGQgb3VyIG93biBhamF4IGNoZWNrIGFzIFgtUmVxdWVzdGVkLVdpdGggaXMgbm90IGFsd2F5cyByZWxpYWJsZVxuICAgICAgICAgIC8vYWpheF9mb3JtX2RhdGEgPSBuZXdfbmV3c2xldHRlcl9zZXR0aW5ncyArICcmYWpheHJlcXVlc3Q9dHJ1ZSZzdWJzY3JpYmUnO1xuXG4gICAgICAgICAgdmFyIHBvc3RfZGF0YSA9IHtcbiAgICAgICAgICAgIGVtYWlsOiAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgICAgZmlyc3RfbmFtZTogJChvcHRpb25zLmZpcnN0X25hbWVfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgICAgbGFzdF9uYW1lOiAkKG9wdGlvbnMubGFzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICAgIGdyb3Vwc19zdWJtaXR0ZWQ6IHt9XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHBvc3RfZGF0YS5ncm91cHNfYXZhaWxhYmxlID0gJ2FsbCc7XG5cbiAgICAgICAgICBpZiAoICQoJ2lucHV0W25hbWU9XCJtYWlsY2hpbXBfc3RhdHVzXCJdJykubGVuZ3RoID4gMCApIHtcbiAgICAgICAgICAgIHBvc3RfZGF0YS5tYWlsY2hpbXBfc3RhdHVzID0gJCgnaW5wdXRbbmFtZT1cIm1haWxjaGltcF9zdGF0dXNcIl0nKS52YWwoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoICQoJ2lucHV0W25hbWU9XCJtYWlsY2hpbXBfdXNlcl9pZFwiXScpLmxlbmd0aCA+IDAgKSB7XG4gICAgICAgICAgICBwb3N0X2RhdGEubWFpbGNoaW1wX3VzZXJfaWQgPSAkKCdpbnB1dFtuYW1lPVwibWFpbGNoaW1wX3VzZXJfaWRcIl0nKS52YWwoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodHlwZW9mIG5ld3NsZXR0ZXJfZ3JvdXBzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgJC5lYWNoKG5ld3NsZXR0ZXJfZ3JvdXBzLCBmdW5jdGlvbihpbmRleCwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgdmFyIGdyb3VwID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgICAgICAgcG9zdF9kYXRhLmdyb3Vwc19zdWJtaXR0ZWRbaW5kZXhdID0gZ3JvdXA7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBvcHRpb25zLm1pbm5wb3N0X3Jvb3QgKyAnL3dwLWpzb24vbWlubnBvc3QtYXBpL3YyL21haWxjaGltcC91c2VyJyxcbiAgICAgICAgICAgIHR5cGU6ICdwb3N0JyxcbiAgICAgICAgICAgIGRhdGFUeXBlIDogJ2pzb24nLFxuICAgICAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04JyxcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHBvc3RfZGF0YSlcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5kb25lKGZ1bmN0aW9uKHJlc3BvbnNlKSB7IC8vIHJlc3BvbnNlIGZyb20gdGhlIFBIUCBhY3Rpb25cbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gJyc7XG4gICAgICAgICAgICBpZiAoIHJlc3BvbnNlLnN1Y2Nlc3MgPT09IHRydWUgKSB7XG4gICAgICAgICAgICAgIC8qc3dpdGNoIChyZXNwb25zZS5kYXRhLnVzZXJfc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnZXhpc3RpbmcnOlxuICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9ICdUaGFua3MgZm9yIHVwZGF0aW5nIHlvdXIgZW1haWwgcHJlZmVyZW5jZXMuIFRoZXkgd2lsbCBnbyBpbnRvIGVmZmVjdCBpbW1lZGlhdGVseS4nO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbmV3JzpcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnV2UgaGF2ZSBhZGRlZCB5b3UgdG8gdGhlIE1pbm5Qb3N0IG1haWxpbmcgbGlzdC4nO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncGVuZGluZyc6XG4gICAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ1dlIGhhdmUgYWRkZWQgeW91IHRvIHRoZSBNaW5uUG9zdCBtYWlsaW5nIGxpc3QuIFlvdSB3aWxsIG5lZWQgdG8gY2xpY2sgdGhlIGNvbmZpcm1hdGlvbiBsaW5rIGluIHRoZSBlbWFpbCB3ZSBzZW50IHRvIGJlZ2luIHJlY2VpdmluZyBtZXNzYWdlcy4nO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH0qL1xuICAgICAgICAgICAgICAvL2NvbmZpcm1mb3JtLmdldCgwKS5zdWJtaXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbmZpcm1mb3JtLmdldCgwKS5zdWJtaXQoKTtcbiAgICAgICAgICAgIC8vJCgnLm0taG9sZC1tZXNzYWdlJykuaHRtbCgnPGRpdiBjbGFzcz1cIm0tZm9ybS1tZXNzYWdlIG0tZm9ybS1tZXNzYWdlLWluZm9cIj4nICsgbWVzc2FnZSArICc8L2Rpdj4nKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAvLyB3ZSBzaG91bGQgcHV0IGFuIGFjdHVhbCBlcnJvciBtZXNzYWdlIGhlcmUgc29tZWRheSwgcHJvYmFibHlcbiAgICAgICAgICAgIC8vJCgnLm0taG9sZC1tZXNzYWdlJykuaHRtbCgnPGRpdiBjbGFzcz1cIm0tZm9ybS1tZXNzYWdlIG0tZm9ybS1tZXNzYWdlLWluZm9cIj5BbiBlcnJvciBoYXMgb2NjdXJlZC4gUGxlYXNlIHRyeSBhZ2Fpbi48L2Rpdj4nKTtcbiAgICAgICAgICAgIGNvbmZpcm1mb3JtLmdldCgwKS5zdWJtaXQoKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICB9IGVsc2UgeyAvLyBlbmQgcGFydCB3aGVyZSBzZXR0aW5ncyBjaGFuZ2VkXG4gICAgICAgICAgY29uZmlybWZvcm0uZ2V0KDApLnN1Ym1pdCgpO1xuICAgICAgICB9XG5cbiAgICAgIH0pO1xuICAgICAgLy9yZXR1cm4gZmFsc2U7XG4gICAgfSwgLy8gY29uZmlybU1lc3NhZ2VTdWJtaXRcblxuICB9OyAvLyBwbHVnaW4ucHJvdG90eXBlXG5cbiAgLy8gQSByZWFsbHkgbGlnaHR3ZWlnaHQgcGx1Z2luIHdyYXBwZXIgYXJvdW5kIHRoZSBjb25zdHJ1Y3RvcixcbiAgLy8gcHJldmVudGluZyBhZ2FpbnN0IG11bHRpcGxlIGluc3RhbnRpYXRpb25zXG4gICQuZm5bcGx1Z2luTmFtZV0gPSBmdW5jdGlvbiAoIG9wdGlvbnMgKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoISQuZGF0YSh0aGlzLCAncGx1Z2luXycgKyBwbHVnaW5OYW1lKSkge1xuICAgICAgICAkLmRhdGEodGhpcywgJ3BsdWdpbl8nICsgcGx1Z2luTmFtZSwgbmV3IFBsdWdpbiggdGhpcywgb3B0aW9ucyApKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxufSkoIGpRdWVyeSwgd2luZG93LCBkb2N1bWVudCApOyJdfQ==
