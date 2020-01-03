"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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
    'calculated_amount_selector': '.calculated-amount',
    'quantity_field': '#quantity',
    'quantity_selector': '.quantity',
    'item_selector': '.purchase-item',
    'single_unit_price_attribute': 'unit-price',
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
    'newsletter_group_selector': '.form-item--newsletter input[type="checkbox"]',
    'message_group_selector': '.form-item--optional input[type="checkbox"]',
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

      if ($(this.options.calculated_amount_selector).length > 0) {
        this.calculateAmount(this.element, this.options, ''); //
      } // calculate amount based on quantity


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

      function doneTyping() {
        var email = $(options.email_field_selector, element).val();
        account_exists = that.checkMinnpostAccountExists(element, options, email);
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

      $('.form-item--with-help label, .form-item--with-help input').next('.help-link').click(function () {
        $(this).next('.form-help').toggle();
        return false;
      });
    },
    // allowMinnpostAccount
    displayAmount: function displayAmount(element, options, single_unit_price, quantity, additional_amount, valid_code) {
      var amount = single_unit_price * parseInt(quantity, 10);

      if (additional_amount === '') {
        additional_amount = 0;
        $(options.create_mp_selector).parent().hide();
      } else {
        amount += parseInt(additional_amount, 10);
        levelcheck = {
          original_amount: additional_amount,
          frequency: 1,
          levels: options.levels
        };
        level = this.checkLevel(element, levelcheck, 'num');

        if (level >= 2) {
          $(options.create_mp_selector).parent().show();
        }

        $(options.has_additional_text_selector).html($(options.has_additional_text_selector).data('text'));
        $(options.additional_amount_selector).text(parseFloat($(options.additional_amount_field).val()));
      }

      $(options.calculated_amount_selector).text(amount); // this is the preview text

      $(options.original_amount_selector).val(quantity * single_unit_price); // this is the amount field

      $(options.quantity_selector).text(quantity); // everywhere there's a quantity
    },
    calculateAmount: function calculateAmount(element, options, data) {
      //this.debug('start. set variables and plain text, and remove code result.');
      var that = this;
      var quantity = $(options.quantity_field).val();
      var single_unit_price = $(options.quantity_field).data(options.single_unit_price_attribute);
      var additional_amount = $(options.additional_amount_field).val();

      if (data.success === true) {
        single_unit_price = data.single_unit_price;
      }

      that.displayAmount(element, options, single_unit_price, quantity, additional_amount, data.success);
      $(options.quantity_field + ', ' + options.additional_amount_field).change(function () {
        // the quantity or additional amount changed
        quantity = $(options.quantity_field).val();
        additional_amount = $(options.additional_amount_field).val();

        if (quantity != 1) {
          $(options.item_selector).text($(options.item_selector).data('plural'));
        } else {
          $(options.item_selector).text($(options.item_selector).data('single'));
        }

        that.displayAmount(element, options, single_unit_price, quantity, additional_amount);
      });
    },
    // calculateAmount
    checkMinnpostAccountExists: function checkMinnpostAccountExists(element, options, email) {
      var user = {
        email: email
      };
      $.ajax({
        method: 'GET',
        url: options.minnpost_root + '/wp-json/user-account-management/v1/check-account-exists',
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
    // checkMinnpostAccountExists
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
        that.stripeErrorDisplay(event, $(that.options.cc_num_selector, element), element, that.options); // Switch brand logo

        if (event.brand) {
          that.calculateFees(that.options.original_amount, event.brand);
          that.setBrandIcon(event.brand);
        } //setOutcome(event);

      });
      that.cardExpiryElement.on('change', function (event) {
        // error handling
        that.stripeErrorDisplay(event, $(that.options.cc_exp_selector, element), element, that.options);
      });
      that.cardCvcElement.on('change', function (event) {
        // error handling
        that.stripeErrorDisplay(event, $(that.options.cc_cvv_selector, element), element, that.options);
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
        });

        if (payment_method === 'ach') {
          if ($('input[name="bankToken"]').length === 0) {
            valid = false;
            $(that.options.payment_method_selector).prepend('<p class="error">You are required to enter credit card information, or to authorize MinnPost to charge your bank account, to make a payment.</p>');
          }
        }

        if (valid === true) {
          // 1. process donation to stripe
          that.buttonStatus(that.options, $(that.options.donate_form_selector).find('button'), true);
          var full_name = '';

          if ($('#full_name').length > 0) {
            full_name = $('#full_name').val();
          } else {
            full_name = $('#first_name').val() + ' ' + $('#last_name').val();
          }

          var street = 'None';

          if ($('input[name="full_address"]').val() != '') {
            street = $('#full_address').val();

            if ($('input[name="billing_street"]').val() != '') {
              street = $('input[name="billing_street"]').val();
            }
          }

          var city = 'None';

          if ($('input[name="billing_city"]').val() != '') {
            city = $('input[name="billing_city"]').val();
          }

          var state = 'None';

          if ($('input[name="billing_state"]').val() != '') {
            state = $('input[name="billing_state"]').val();
          }

          var zip = 'None';

          if ($('input[name="billing_zip"]').val() != '') {
            zip = $('input[name="billing_zip"]').val();
          }

          var country = 'US';

          if ($('input[name="billing_country"]').val() != '') {
            country = $('input[name="billing_country"]').val();
          } // 2. create minnpost account if specified


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
            that.createToken(that.cardNumberElement);
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
    createToken: function createToken(card) {
      var that = this;
      that.stripe.createToken(card).then(function (result) {
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

          if (result.error.field == 'csrf_token') {
            $('button.give').before('<p class="error">Sorry, this form had a back-end error and was unable to complete your donation. Please <a href="#" onclick="location.reload(); return false;">reload the page</a> and try again (we will preserve as much of your information as possible).</p>');
          }
        } else {
          // Send the token to your server
          that.stripeTokenHandler(result.token, 'card');
        }
      });
    },
    // createToken
    stripeTokenHandler: function stripeTokenHandler(token, type) {
      var that = this; // Insert the token ID into the form so it gets submitted to the server

      var supportform = $(this.options.donate_form_selector);
      var form_data_action = $(supportform).data('action');

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

              if (error.type == 'invalid_request_error') {
                $('button.give').before('<p class="error">' + error.message + '</p>');
              }
            }

            if (typeof response.errors[0] !== 'undefined') {
              var field = response.errors[0].field + '_field_selector';

              if ($(that.options[field]).length > 0) {
                $('html, body').animate({
                  scrollTop: $(that.options[field]).parent().offset().top
                }, 2000);
              }
            }
          });
        } else {
          supportform.get(0).submit();
        } // todo: one thing that might be nice here is to load the templates from the server instead of parsing the errors from the json

      }).error(function (response) {
        // maybe it returns too fast?
        that.buttonStatus(that.options, $(that.options.donate_form_selector).find('button'), false);
      });
    },
    showNewsletterSettings: function showNewsletterSettings(element, options) {
      var that = this;

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
                $(':checkbox[name="' + index + '"]').prop('checked', true);
              } else {
                $(':checkbox[name="' + index + '"]').prop('checked', false);
              }
            });
          }
        });
      }
    },
    // showNewsletterSettings
    confirmMessageSubmit: function confirmMessageSubmit(element, options) {
      //var existing_newsletter_settings = this.options.existing_newsletter_settings;
      var existing_newsletter_settings = $('.support-newsletter :input').serialize(); //this.debug(existing_newsletter_settings);

      $(options.confirm_form_selector).submit(function (event) {
        event.preventDefault();
        var confirmform = $(options.confirm_form_selector); // submit settings to mailchimp
        // need to get user info on a hidden field here

        var newsletter_groups = $(options.newsletter_group_selector + ':checked');
        var message_groups = $(options.message_group_selector + ':checked');
        var new_newsletter_settings = $('.support-newsletter :input:checked').serialize();

        if (existing_newsletter_settings !== new_newsletter_settings && (typeof newsletter_groups !== 'undefined' || typeof message_groups !== 'undefined')) {
          //add our own ajax check as X-Requested-With is not always reliable
          //ajax_form_data = new_newsletter_settings + '&ajaxrequest=true&subscribe';
          var post_data = {
            email: $(options.email_field_selector, element).val(),
            first_name: $(options.first_name_field_selector, element).val(),
            last_name: $(options.last_name_field_selector, element).val(),
            groups_submitted: []
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
              var group = $(this).attr('name');
              post_data.groups_submitted.push(group);
            });
          }

          if (typeof message_groups !== 'undefined') {
            $.each(message_groups, function (index, value) {
              var group = $(this).attr('name');
              post_data.groups_submitted.push(group);
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0cmlwZS5wYXltZW50LmpzIiwibWlubnBvc3QuZ2l2aW5nLmpzIl0sIm5hbWVzIjpbImYiLCJleHBvcnRzIiwibW9kdWxlIiwiZGVmaW5lIiwiYW1kIiwiZyIsIndpbmRvdyIsImdsb2JhbCIsInNlbGYiLCJwYXltZW50IiwianMiLCJlIiwidCIsIm4iLCJyIiwicyIsIm8iLCJ1IiwiYSIsInJlcXVpcmUiLCJpIiwiRXJyb3IiLCJjb2RlIiwibCIsImNhbGwiLCJsZW5ndGgiLCJRSiIsInJyZXR1cm4iLCJydHJpbSIsInNlbGVjdG9yIiwiaXNET01FbGVtZW50IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZWwiLCJub2RlTmFtZSIsInRyaW0iLCJ0ZXh0IiwicmVwbGFjZSIsInZhbCIsInJldCIsImFyZ3VtZW50cyIsInZhbHVlIiwicHJldmVudERlZmF1bHQiLCJldmVudE9iamVjdCIsInJldHVyblZhbHVlIiwibm9ybWFsaXplRXZlbnQiLCJvcmlnaW5hbCIsIndoaWNoIiwidGFyZ2V0Iiwic3JjRWxlbWVudCIsIm9yaWdpbmFsRXZlbnQiLCJkYXRhIiwiZGV0YWlsIiwiY2hhckNvZGUiLCJrZXlDb2RlIiwib24iLCJlbGVtZW50IiwiZXZlbnROYW1lIiwiY2FsbGJhY2siLCJqIiwibGVuIiwibGVuMSIsIm11bHRFdmVudE5hbWUiLCJvcmlnaW5hbENhbGxiYWNrIiwicmVmIiwibWF0Y2giLCJzcGxpdCIsImFkZEV2ZW50TGlzdGVuZXIiLCJhdHRhY2hFdmVudCIsImFkZENsYXNzIiwiY2xhc3NOYW1lIiwicmVzdWx0cyIsInB1c2giLCJjbGFzc0xpc3QiLCJhZGQiLCJoYXNDbGFzcyIsImNvbnRhaW5zIiwiUmVnRXhwIiwidGVzdCIsInJlbW92ZUNsYXNzIiwiY2xzIiwicmVtb3ZlIiwiam9pbiIsInRvZ2dsZUNsYXNzIiwiYm9vbCIsImFwcGVuZCIsInRvQXBwZW5kIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwiZmluZCIsIk5vZGVMaXN0IiwiQXJyYXkiLCJ0cmlnZ2VyIiwibmFtZSIsImVycm9yIiwiZXYiLCJDdXN0b21FdmVudCIsImNyZWF0ZUV2ZW50IiwiaW5pdEN1c3RvbUV2ZW50IiwiaW5pdEV2ZW50IiwiZGlzcGF0Y2hFdmVudCIsIlBheW1lbnQiLCJjYXJkRnJvbU51bWJlciIsImNhcmRGcm9tVHlwZSIsImNhcmRzIiwiZGVmYXVsdEZvcm1hdCIsImZvcm1hdEJhY2tDYXJkTnVtYmVyIiwiZm9ybWF0QmFja0V4cGlyeSIsImZvcm1hdENhcmROdW1iZXIiLCJmb3JtYXRFeHBpcnkiLCJmb3JtYXRGb3J3YXJkRXhwaXJ5IiwiZm9ybWF0Rm9yd2FyZFNsYXNoIiwiZm9ybWF0TW9udGhFeHBpcnkiLCJoYXNUZXh0U2VsZWN0ZWQiLCJsdWhuQ2hlY2siLCJyZUZvcm1hdENhcmROdW1iZXIiLCJyZXN0cmljdENWQyIsInJlc3RyaWN0Q2FyZE51bWJlciIsInJlc3RyaWN0Q29tYmluZWRFeHBpcnkiLCJyZXN0cmljdEV4cGlyeSIsInJlc3RyaWN0TW9udGhFeHBpcnkiLCJyZXN0cmljdE51bWVyaWMiLCJyZXN0cmljdFllYXJFeHBpcnkiLCJzZXRDYXJkVHlwZSIsImluZGV4T2YiLCJpdGVtIiwidHlwZSIsInBhdHRlcm4iLCJmb3JtYXQiLCJjdmNMZW5ndGgiLCJsdWhuIiwibnVtIiwiY2FyZCIsImRpZ2l0IiwiZGlnaXRzIiwib2RkIiwic3VtIiwicmV2ZXJzZSIsInBhcnNlSW50Iiwic2VsZWN0aW9uU3RhcnQiLCJzZWxlY3Rpb25FbmQiLCJzZWxlY3Rpb24iLCJjcmVhdGVSYW5nZSIsInNldFRpbWVvdXQiLCJfdGhpcyIsImZucyIsInJlIiwidXBwZXJMZW5ndGgiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJtZXRhIiwic2xhc2giLCJtZXRhS2V5IiwiaW5wdXQiLCJjdHJsS2V5IiwiYWxsVHlwZXMiLCJjYXJkVHlwZSIsImNhcmRFeHBpcnlWYWwiLCJtb250aCIsInByZWZpeCIsInllYXIiLCJEYXRlIiwiZ2V0RnVsbFllYXIiLCJ0b1N0cmluZyIsInNsaWNlIiwidmFsaWRhdGVDYXJkTnVtYmVyIiwidmFsaWRhdGVDYXJkRXhwaXJ5IiwiY3VycmVudFRpbWUiLCJleHBpcnkiLCJzZXRNb250aCIsImdldE1vbnRoIiwidmFsaWRhdGVDYXJkQ1ZDIiwiY3ZjIiwicmVmMSIsImdyb3VwcyIsImV4ZWMiLCJzaGlmdCIsImZvcm1hdENhcmRDVkMiLCJmb3JtYXRDYXJkRXhwaXJ5IiwiZm9ybWF0Q2FyZEV4cGlyeU11bHRpcGxlIiwiZ2V0Q2FyZEFycmF5Iiwic2V0Q2FyZEFycmF5IiwiY2FyZEFycmF5IiwiYWRkVG9DYXJkQXJyYXkiLCJjYXJkT2JqZWN0IiwicmVtb3ZlRnJvbUNhcmRBcnJheSIsImtleSIsInNwbGljZSIsIiQiLCJ1bmRlZmluZWQiLCJwbHVnaW5OYW1lIiwiZGVmYXVsdHMiLCJQbHVnaW4iLCJvcHRpb25zIiwiZXh0ZW5kIiwiX2RlZmF1bHRzIiwiX25hbWUiLCJpbml0IiwicHJvdG90eXBlIiwicmVzZXQiLCJhbW91bnQiLCJwYXJzZUZsb2F0IiwibGV2ZWxfYW1vdW50X3NlbGVjdG9yIiwib3JpZ2luYWxfYW1vdW50Iiwib3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yIiwiZnJlcXVlbmN5IiwiZnJlcXVlbmN5X3NlbGVjdG9yIiwiYXR0ciIsInJlY3VycmluZyIsInJlY3VycmluZ19zZWxlY3RvciIsImNoYXJBdCIsInRvVXBwZXJDYXNlIiwicHJvY2Vzc2luZ19mZWUiLCJNYXRoIiwicm91bmQiLCJmZWVfYW1vdW50IiwicG93IiwidG9GaXhlZCIsInByb2Nlc3NpbmdfZmVlX3RleHQiLCJjcmVhdGVfYWNjb3VudCIsImJ1dHRvbl90ZXh0Iiwic3RyaXBlIiwiU3RyaXBlIiwic3RyaXBlX3B1Ymxpc2hhYmxlX2tleSIsImVsZW1lbnRzIiwicmVmZXJyZXIiLCJwcm9wIiwiZGVidWciLCJxdWVyeV9wYW5lbCIsInFzIiwicXVlcnkiLCJhY3RpdmUiLCJ0YWJOYXZpZ2F0aW9uIiwicGF5X2NjX3Byb2Nlc3Npbmdfc2VsZWN0b3IiLCJjcmVkaXRDYXJkUHJvY2Vzc2luZ0ZlZXMiLCJkb25hdGVfc3RlcF9zZWxlY3RvciIsImxldmVsIiwiY2hlY2tMZXZlbCIsImxldmVsbnVtIiwiZG9uYXRlQW5vbnltb3VzbHkiLCJob25vck9yTWVtb3J5VG9nZ2xlIiwib3V0c2lkZVVuaXRlZFN0YXRlcyIsInNoaXBwaW5nQWRkcmVzcyIsImFsbG93TWlubnBvc3RBY2NvdW50IiwiY2hvb3NlUGF5bWVudE1ldGhvZCIsImNyZWRpdENhcmRGaWVsZHMiLCJhY2hGaWVsZHMiLCJ2YWxpZGF0ZUFuZFN1Ym1pdCIsImNhbGN1bGF0ZWRfYW1vdW50X3NlbGVjdG9yIiwiY2FsY3VsYXRlQW1vdW50IiwiY29uZmlybV9zdGVwX3NlbGVjdG9yIiwic2hvd05ld3NsZXR0ZXJTZXR0aW5ncyIsImNvbmZpcm1NZXNzYWdlU3VibWl0IiwiYiIsInAiLCJkZWNvZGVVUklDb21wb25lbnQiLCJsb2NhdGlvbiIsInNlYXJjaCIsInN1YnN0ciIsIm1lc3NhZ2UiLCJjb25zb2xlIiwibG9nIiwiZGlyIiwiZ2V0UXVlcnlTdHJpbmdzIiwibGluayIsInRoYXQiLCJ0aXRsZSIsInBhZ2UiLCJuZXh0Iiwic3RlcCIsImluZGV4IiwibmF2X2l0ZW1fY291bnQiLCJvcHBfaWQiLCJvcHBfaWRfc2VsZWN0b3IiLCJuZXh0X3N0ZXAiLCJwb3N0X3B1cmNoYXNlIiwiY29uZmlybSIsImNvbmZpcm1fYnV0dG9uX3NlbGVjdG9yIiwiYW5hbHl0aWNzVHJhY2tpbmdTdGVwIiwic2hvdyIsInBhcmVudCIsImdhIiwidG9Mb3dlckNhc2UiLCJwYXRobmFtZSIsImNhbGN1bGF0ZUZlZXMiLCJwYXltZW50X3R5cGUiLCJhamF4IiwibWV0aG9kIiwidXJsIiwiZG9uZSIsImZlZXMiLCJjcmVkaXRDYXJkRmVlQ2hlY2tib3giLCJmaWVsZCIsImZ1bGxfYW1vdW50IiwiaXMiLCJmdWxsX2Ftb3VudF9zZWxlY3RvciIsImFub255bW91c19zZWxlY3RvciIsIm5hbWVfc2VsZWN0b3IiLCJoaWRlIiwiY2hhbmdlIiwicmV0dXJudmFsdWUiLCJsZXZlbGNsYXNzIiwiYW1vdW50X3llYXJseSIsImVhY2giLCJsZXZlbHMiLCJtYXgiLCJtaW4iLCJob25vck9yTWVtb3J5IiwiaG9ub3Jfb3JfbWVtb3J5X2Nob29zZXIiLCJob25vcl9tZW1vcnlfaW5wdXRfZ3JvdXAiLCJob25vcl90eXBlX3NlbGVjdG9yIiwiaG9ub3JfbmFtZV9zZWxlY3RvciIsInNob3dfYmlsbGluZ19jb3VudHJ5X3NlbGVjdG9yIiwiY2xpY2siLCJiaWxsaW5nX2NvdW50cnlfc2VsZWN0b3IiLCJzaG93X3NoaXBwaW5nX2NvdW50cnlfc2VsZWN0b3IiLCJzaGlwcGluZ19jb3VudHJ5X3NlbGVjdG9yIiwic2hvd19zaGlwcGluZyIsInVzZV9mb3Jfc2hpcHBpbmdfc2VsZWN0b3IiLCJzaGlwcGluZ19zZWxlY3RvciIsImNoYW5nZWQiLCJhY2NvdW50X2V4aXN0cyIsImRvbmVUeXBpbmciLCJlbWFpbCIsImVtYWlsX2ZpZWxkX3NlbGVjdG9yIiwiY2hlY2tNaW5ucG9zdEFjY291bnRFeGlzdHMiLCJ0eXBpbmdUaW1lciIsImRvbmVUeXBpbmdJbnRlcnZhbCIsImtleXVwIiwiY2xlYXJUaW1lb3V0IiwiY3JlYXRlX21wX3NlbGVjdG9yIiwicGFzc3dvcmRfc2VsZWN0b3IiLCJiZWZvcmUiLCJnZXQiLCJ0b2dnbGUiLCJkaXNwbGF5QW1vdW50Iiwic2luZ2xlX3VuaXRfcHJpY2UiLCJxdWFudGl0eSIsImFkZGl0aW9uYWxfYW1vdW50IiwidmFsaWRfY29kZSIsImxldmVsY2hlY2siLCJoYXNfYWRkaXRpb25hbF90ZXh0X3NlbGVjdG9yIiwiaHRtbCIsImFkZGl0aW9uYWxfYW1vdW50X3NlbGVjdG9yIiwiYWRkaXRpb25hbF9hbW91bnRfZmllbGQiLCJxdWFudGl0eV9zZWxlY3RvciIsInF1YW50aXR5X2ZpZWxkIiwic2luZ2xlX3VuaXRfcHJpY2VfYXR0cmlidXRlIiwic3VjY2VzcyIsIml0ZW1fc2VsZWN0b3IiLCJ1c2VyIiwibWlubnBvc3Rfcm9vdCIsInJlc3VsdCIsInN0YXR1cyIsInJlYXNvbiIsImNob29zZV9wYXltZW50IiwiY2hlY2tlZCIsImNoZWNrZWRfdmFsdWUiLCJwYXltZW50X21ldGhvZF9zZWxlY3RvciIsImV2ZW50IiwiaWQiLCJkb25hdGVfZm9ybV9zZWxlY3RvciIsInByZXBlbmQiLCJzdHlsZSIsImJhc2UiLCJpY29uQ29sb3IiLCJsaW5lSGVpZ2h0IiwiZm9udFdlaWdodCIsImZvbnRGYW1pbHkiLCJmb250U2l6ZSIsImNhcmROdW1iZXJFbGVtZW50IiwiY3JlYXRlIiwibW91bnQiLCJjY19udW1fc2VsZWN0b3IiLCJjYXJkRXhwaXJ5RWxlbWVudCIsImNjX2V4cF9zZWxlY3RvciIsImNhcmRDdmNFbGVtZW50IiwiY2NfY3Z2X3NlbGVjdG9yIiwic3RyaXBlRXJyb3JEaXNwbGF5IiwiYnJhbmQiLCJzZXRCcmFuZEljb24iLCJjYXJkQnJhbmRUb1BmQ2xhc3MiLCJicmFuZEljb25FbGVtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJwZkNsYXNzIiwicGxhaWRfZW52IiwiUGxhaWQiLCJsaW5rSGFuZGxlciIsInNlbGVjdEFjY291bnQiLCJhcGlWZXJzaW9uIiwiZW52IiwiY2xpZW50TmFtZSIsInBsYWlkX3B1YmxpY19rZXkiLCJwcm9kdWN0Iiwib25Mb2FkIiwib25TdWNjZXNzIiwicHVibGljX3Rva2VuIiwibWV0YWRhdGEiLCJzdXBwb3J0Zm9ybSIsImFjY291bnRfaWQiLCJzZXJpYWxpemUiLCJyZXNwb25zZSIsInBsYWlkX2xpbmsiLCJhZnRlciIsInN0cmlwZV9iYW5rX2FjY291bnRfdG9rZW4iLCJjb250ZW50cyIsInVud3JhcCIsIm9uRXhpdCIsImVyciIsIm9wZW4iLCJoYXNIdG1sNVZhbGlkYXRpb24iLCJjcmVhdGVFbGVtZW50IiwiY2hlY2tWYWxpZGl0eSIsImJ1dHRvblN0YXR1cyIsImJ1dHRvbiIsImRpc2FibGVkIiwic3VibWl0IiwiYW5pbWF0ZSIsInNjcm9sbFRvcCIsIm9mZnNldCIsInRvcCIsInZhbGlkIiwicGF5bWVudF9tZXRob2QiLCJmdWxsX25hbWUiLCJzdHJlZXQiLCJjaXR5Iiwic3RhdGUiLCJ6aXAiLCJjb3VudHJ5IiwiZmlyc3RfbmFtZSIsImZpcnN0X25hbWVfZmllbGRfc2VsZWN0b3IiLCJsYXN0X25hbWUiLCJsYXN0X25hbWVfZmllbGRfc2VsZWN0b3IiLCJwYXNzd29yZCIsInBhc3N3b3JkX2ZpZWxkX3NlbGVjdG9yIiwiYWNjb3VudF9jaXR5X3NlbGVjdG9yIiwiYWNjb3VudF9zdGF0ZV9zZWxlY3RvciIsImFjY291bnRfemlwX3NlbGVjdG9yIiwiY3JlYXRlVG9rZW4iLCJzdHJpcGVUb2tlbkhhbmRsZXIiLCJ0aGlzX3NlbGVjdG9yIiwid2hpY2hfZXJyb3IiLCJlbXB0eSIsInRoZW4iLCJwcmV2IiwidG9rZW4iLCJmb3JtX2RhdGFfYWN0aW9uIiwiY2FjaGUiLCJlcnJvcnMiLCJuZXdzbGV0dGVyX2dyb3VwX3NlbGVjdG9yIiwiZ2V0X2RhdGEiLCJtYWlsY2hpbXBfc3RhdHVzIiwibWFpbGNoaW1wX3VzZXJfaWQiLCJleGlzdGluZ19uZXdzbGV0dGVyX3NldHRpbmdzIiwiY29uZmlybV9mb3JtX3NlbGVjdG9yIiwiY29uZmlybWZvcm0iLCJuZXdzbGV0dGVyX2dyb3VwcyIsIm1lc3NhZ2VfZ3JvdXBzIiwibWVzc2FnZV9ncm91cF9zZWxlY3RvciIsIm5ld19uZXdzbGV0dGVyX3NldHRpbmdzIiwicG9zdF9kYXRhIiwiZ3JvdXBzX3N1Ym1pdHRlZCIsImdyb3Vwc19hdmFpbGFibGUiLCJncm91cCIsImRhdGFUeXBlIiwiY29udGVudFR5cGUiLCJKU09OIiwic3RyaW5naWZ5IiwiZmFpbCIsImZuIiwialF1ZXJ5Il0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsQ0FBQyxVQUFTQSxDQUFULEVBQVc7QUFBQyxNQUFHLFFBQU9DLE9BQVAseUNBQU9BLE9BQVAsT0FBaUIsUUFBakIsSUFBMkIsT0FBT0MsTUFBUCxLQUFnQixXQUE5QyxFQUEwRDtBQUFDQSxJQUFB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O0FBRUg7QUFDQTs7QUFDQXBPLEVBQUFBLENBQUMsQ0FBQ3lSLEVBQUYsQ0FBS3ZSLFVBQUwsSUFBbUIsVUFBV0csT0FBWCxFQUFxQjtBQUN0QyxXQUFPLEtBQUs4RyxJQUFMLENBQVUsWUFBWTtBQUMzQixVQUFJLENBQUNuSCxDQUFDLENBQUN4SSxJQUFGLENBQU8sSUFBUCxFQUFhLFlBQVkwSSxVQUF6QixDQUFMLEVBQTJDO0FBQ3pDRixRQUFBQSxDQUFDLENBQUN4SSxJQUFGLENBQU8sSUFBUCxFQUFhLFlBQVkwSSxVQUF6QixFQUFxQyxJQUFJRSxNQUFKLENBQVksSUFBWixFQUFrQkMsT0FBbEIsQ0FBckM7QUFDRDtBQUNGLEtBSk0sQ0FBUDtBQUtELEdBTkQ7QUFRRCxDQXJ2Q0EsRUFxdkNHcVIsTUFydkNILEVBcXZDVy9jLE1BcnZDWCxFQXF2Q21CeUIsUUFydkNuQiIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKGYpe2lmKHR5cGVvZiBleHBvcnRzPT09XCJvYmplY3RcIiYmdHlwZW9mIG1vZHVsZSE9PVwidW5kZWZpbmVkXCIpe21vZHVsZS5leHBvcnRzPWYoKX1lbHNlIGlmKHR5cGVvZiBkZWZpbmU9PT1cImZ1bmN0aW9uXCImJmRlZmluZS5hbWQpe2RlZmluZShbXSxmKX1lbHNle3ZhciBnO2lmKHR5cGVvZiB3aW5kb3chPT1cInVuZGVmaW5lZFwiKXtnPXdpbmRvd31lbHNlIGlmKHR5cGVvZiBnbG9iYWwhPT1cInVuZGVmaW5lZFwiKXtnPWdsb2JhbH1lbHNlIGlmKHR5cGVvZiBzZWxmIT09XCJ1bmRlZmluZWRcIil7Zz1zZWxmfWVsc2V7Zz10aGlzfShnLnBheW1lbnQgfHwgKGcucGF5bWVudCA9IHt9KSkuanMgPSBmKCl9fSkoZnVuY3Rpb24oKXt2YXIgZGVmaW5lLG1vZHVsZSxleHBvcnRzO3JldHVybiAoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSh7MTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG52YXIgUUosIHJyZXR1cm4sIHJ0cmltO1xuXG5RSiA9IGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG4gIGlmIChRSi5pc0RPTUVsZW1lbnQoc2VsZWN0b3IpKSB7XG4gICAgcmV0dXJuIHNlbGVjdG9yO1xuICB9XG4gIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbn07XG5cblFKLmlzRE9NRWxlbWVudCA9IGZ1bmN0aW9uKGVsKSB7XG4gIHJldHVybiBlbCAmJiAoZWwubm9kZU5hbWUgIT0gbnVsbCk7XG59O1xuXG5ydHJpbSA9IC9eW1xcc1xcdUZFRkZcXHhBMF0rfFtcXHNcXHVGRUZGXFx4QTBdKyQvZztcblxuUUoudHJpbSA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgaWYgKHRleHQgPT09IG51bGwpIHtcbiAgICByZXR1cm4gXCJcIjtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gKHRleHQgKyBcIlwiKS5yZXBsYWNlKHJ0cmltLCBcIlwiKTtcbiAgfVxufTtcblxucnJldHVybiA9IC9cXHIvZztcblxuUUoudmFsID0gZnVuY3Rpb24oZWwsIHZhbCkge1xuICB2YXIgcmV0O1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICByZXR1cm4gZWwudmFsdWUgPSB2YWw7XG4gIH0gZWxzZSB7XG4gICAgcmV0ID0gZWwudmFsdWU7XG4gICAgaWYgKHR5cGVvZiByZXQgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHJldHVybiByZXQucmVwbGFjZShycmV0dXJuLCBcIlwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHJldCA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG5RSi5wcmV2ZW50RGVmYXVsdCA9IGZ1bmN0aW9uKGV2ZW50T2JqZWN0KSB7XG4gIGlmICh0eXBlb2YgZXZlbnRPYmplY3QucHJldmVudERlZmF1bHQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIGV2ZW50T2JqZWN0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGV2ZW50T2JqZWN0LnJldHVyblZhbHVlID0gZmFsc2U7XG4gIHJldHVybiBmYWxzZTtcbn07XG5cblFKLm5vcm1hbGl6ZUV2ZW50ID0gZnVuY3Rpb24oZSkge1xuICB2YXIgb3JpZ2luYWw7XG4gIG9yaWdpbmFsID0gZTtcbiAgZSA9IHtcbiAgICB3aGljaDogb3JpZ2luYWwud2hpY2ggIT0gbnVsbCA/IG9yaWdpbmFsLndoaWNoIDogdm9pZCAwLFxuICAgIHRhcmdldDogb3JpZ2luYWwudGFyZ2V0IHx8IG9yaWdpbmFsLnNyY0VsZW1lbnQsXG4gICAgcHJldmVudERlZmF1bHQ6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIFFKLnByZXZlbnREZWZhdWx0KG9yaWdpbmFsKTtcbiAgICB9LFxuICAgIG9yaWdpbmFsRXZlbnQ6IG9yaWdpbmFsLFxuICAgIGRhdGE6IG9yaWdpbmFsLmRhdGEgfHwgb3JpZ2luYWwuZGV0YWlsXG4gIH07XG4gIGlmIChlLndoaWNoID09IG51bGwpIHtcbiAgICBlLndoaWNoID0gb3JpZ2luYWwuY2hhckNvZGUgIT0gbnVsbCA/IG9yaWdpbmFsLmNoYXJDb2RlIDogb3JpZ2luYWwua2V5Q29kZTtcbiAgfVxuICByZXR1cm4gZTtcbn07XG5cblFKLm9uID0gZnVuY3Rpb24oZWxlbWVudCwgZXZlbnROYW1lLCBjYWxsYmFjaykge1xuICB2YXIgZWwsIGksIGosIGxlbiwgbGVuMSwgbXVsdEV2ZW50TmFtZSwgb3JpZ2luYWxDYWxsYmFjaywgcmVmO1xuICBpZiAoZWxlbWVudC5sZW5ndGgpIHtcbiAgICBmb3IgKGkgPSAwLCBsZW4gPSBlbGVtZW50Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBlbCA9IGVsZW1lbnRbaV07XG4gICAgICBRSi5vbihlbCwgZXZlbnROYW1lLCBjYWxsYmFjayk7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuICBpZiAoZXZlbnROYW1lLm1hdGNoKFwiIFwiKSkge1xuICAgIHJlZiA9IGV2ZW50TmFtZS5zcGxpdChcIiBcIik7XG4gICAgZm9yIChqID0gMCwgbGVuMSA9IHJlZi5sZW5ndGg7IGogPCBsZW4xOyBqKyspIHtcbiAgICAgIG11bHRFdmVudE5hbWUgPSByZWZbal07XG4gICAgICBRSi5vbihlbGVtZW50LCBtdWx0RXZlbnROYW1lLCBjYWxsYmFjayk7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuICBvcmlnaW5hbENhbGxiYWNrID0gY2FsbGJhY2s7XG4gIGNhbGxiYWNrID0gZnVuY3Rpb24oZSkge1xuICAgIGUgPSBRSi5ub3JtYWxpemVFdmVudChlKTtcbiAgICByZXR1cm4gb3JpZ2luYWxDYWxsYmFjayhlKTtcbiAgfTtcbiAgaWYgKGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgIHJldHVybiBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBjYWxsYmFjaywgZmFsc2UpO1xuICB9XG4gIGlmIChlbGVtZW50LmF0dGFjaEV2ZW50KSB7XG4gICAgZXZlbnROYW1lID0gXCJvblwiICsgZXZlbnROYW1lO1xuICAgIHJldHVybiBlbGVtZW50LmF0dGFjaEV2ZW50KGV2ZW50TmFtZSwgY2FsbGJhY2spO1xuICB9XG4gIGVsZW1lbnRbJ29uJyArIGV2ZW50TmFtZV0gPSBjYWxsYmFjaztcbn07XG5cblFKLmFkZENsYXNzID0gZnVuY3Rpb24oZWwsIGNsYXNzTmFtZSkge1xuICB2YXIgZTtcbiAgaWYgKGVsLmxlbmd0aCkge1xuICAgIHJldHVybiAoZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaSwgbGVuLCByZXN1bHRzO1xuICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgZm9yIChpID0gMCwgbGVuID0gZWwubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgZSA9IGVsW2ldO1xuICAgICAgICByZXN1bHRzLnB1c2goUUouYWRkQ2xhc3MoZSwgY2xhc3NOYW1lKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9KSgpO1xuICB9XG4gIGlmIChlbC5jbGFzc0xpc3QpIHtcbiAgICByZXR1cm4gZWwuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBlbC5jbGFzc05hbWUgKz0gJyAnICsgY2xhc3NOYW1lO1xuICB9XG59O1xuXG5RSi5oYXNDbGFzcyA9IGZ1bmN0aW9uKGVsLCBjbGFzc05hbWUpIHtcbiAgdmFyIGUsIGhhc0NsYXNzLCBpLCBsZW47XG4gIGlmIChlbC5sZW5ndGgpIHtcbiAgICBoYXNDbGFzcyA9IHRydWU7XG4gICAgZm9yIChpID0gMCwgbGVuID0gZWwubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGUgPSBlbFtpXTtcbiAgICAgIGhhc0NsYXNzID0gaGFzQ2xhc3MgJiYgUUouaGFzQ2xhc3MoZSwgY2xhc3NOYW1lKTtcbiAgICB9XG4gICAgcmV0dXJuIGhhc0NsYXNzO1xuICB9XG4gIGlmIChlbC5jbGFzc0xpc3QpIHtcbiAgICByZXR1cm4gZWwuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyBSZWdFeHAoJyhefCApJyArIGNsYXNzTmFtZSArICcoIHwkKScsICdnaScpLnRlc3QoZWwuY2xhc3NOYW1lKTtcbiAgfVxufTtcblxuUUoucmVtb3ZlQ2xhc3MgPSBmdW5jdGlvbihlbCwgY2xhc3NOYW1lKSB7XG4gIHZhciBjbHMsIGUsIGksIGxlbiwgcmVmLCByZXN1bHRzO1xuICBpZiAoZWwubGVuZ3RoKSB7XG4gICAgcmV0dXJuIChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBpLCBsZW4sIHJlc3VsdHM7XG4gICAgICByZXN1bHRzID0gW107XG4gICAgICBmb3IgKGkgPSAwLCBsZW4gPSBlbC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBlID0gZWxbaV07XG4gICAgICAgIHJlc3VsdHMucHVzaChRSi5yZW1vdmVDbGFzcyhlLCBjbGFzc05hbWUpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH0pKCk7XG4gIH1cbiAgaWYgKGVsLmNsYXNzTGlzdCkge1xuICAgIHJlZiA9IGNsYXNzTmFtZS5zcGxpdCgnICcpO1xuICAgIHJlc3VsdHMgPSBbXTtcbiAgICBmb3IgKGkgPSAwLCBsZW4gPSByZWYubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGNscyA9IHJlZltpXTtcbiAgICAgIHJlc3VsdHMucHVzaChlbC5jbGFzc0xpc3QucmVtb3ZlKGNscykpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZWwuY2xhc3NOYW1lID0gZWwuY2xhc3NOYW1lLnJlcGxhY2UobmV3IFJlZ0V4cCgnKF58XFxcXGIpJyArIGNsYXNzTmFtZS5zcGxpdCgnICcpLmpvaW4oJ3wnKSArICcoXFxcXGJ8JCknLCAnZ2knKSwgJyAnKTtcbiAgfVxufTtcblxuUUoudG9nZ2xlQ2xhc3MgPSBmdW5jdGlvbihlbCwgY2xhc3NOYW1lLCBib29sKSB7XG4gIHZhciBlO1xuICBpZiAoZWwubGVuZ3RoKSB7XG4gICAgcmV0dXJuIChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBpLCBsZW4sIHJlc3VsdHM7XG4gICAgICByZXN1bHRzID0gW107XG4gICAgICBmb3IgKGkgPSAwLCBsZW4gPSBlbC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBlID0gZWxbaV07XG4gICAgICAgIHJlc3VsdHMucHVzaChRSi50b2dnbGVDbGFzcyhlLCBjbGFzc05hbWUsIGJvb2wpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH0pKCk7XG4gIH1cbiAgaWYgKGJvb2wpIHtcbiAgICBpZiAoIVFKLmhhc0NsYXNzKGVsLCBjbGFzc05hbWUpKSB7XG4gICAgICByZXR1cm4gUUouYWRkQ2xhc3MoZWwsIGNsYXNzTmFtZSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBRSi5yZW1vdmVDbGFzcyhlbCwgY2xhc3NOYW1lKTtcbiAgfVxufTtcblxuUUouYXBwZW5kID0gZnVuY3Rpb24oZWwsIHRvQXBwZW5kKSB7XG4gIHZhciBlO1xuICBpZiAoZWwubGVuZ3RoKSB7XG4gICAgcmV0dXJuIChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBpLCBsZW4sIHJlc3VsdHM7XG4gICAgICByZXN1bHRzID0gW107XG4gICAgICBmb3IgKGkgPSAwLCBsZW4gPSBlbC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBlID0gZWxbaV07XG4gICAgICAgIHJlc3VsdHMucHVzaChRSi5hcHBlbmQoZSwgdG9BcHBlbmQpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH0pKCk7XG4gIH1cbiAgcmV0dXJuIGVsLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgdG9BcHBlbmQpO1xufTtcblxuUUouZmluZCA9IGZ1bmN0aW9uKGVsLCBzZWxlY3Rvcikge1xuICBpZiAoZWwgaW5zdGFuY2VvZiBOb2RlTGlzdCB8fCBlbCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgZWwgPSBlbFswXTtcbiAgfVxuICByZXR1cm4gZWwucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG59O1xuXG5RSi50cmlnZ2VyID0gZnVuY3Rpb24oZWwsIG5hbWUsIGRhdGEpIHtcbiAgdmFyIGUsIGVycm9yLCBldjtcbiAgdHJ5IHtcbiAgICBldiA9IG5ldyBDdXN0b21FdmVudChuYW1lLCB7XG4gICAgICBkZXRhaWw6IGRhdGFcbiAgICB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBlID0gZXJyb3I7XG4gICAgZXYgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcbiAgICBpZiAoZXYuaW5pdEN1c3RvbUV2ZW50KSB7XG4gICAgICBldi5pbml0Q3VzdG9tRXZlbnQobmFtZSwgdHJ1ZSwgdHJ1ZSwgZGF0YSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV2LmluaXRFdmVudChuYW1lLCB0cnVlLCB0cnVlLCBkYXRhKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGVsLmRpc3BhdGNoRXZlbnQoZXYpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBRSjtcblxuXG59LHt9XSwyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbihmdW5jdGlvbiAoZ2xvYmFsKXtcbnZhciBQYXltZW50LCBRSiwgY2FyZEZyb21OdW1iZXIsIGNhcmRGcm9tVHlwZSwgY2FyZHMsIGRlZmF1bHRGb3JtYXQsIGZvcm1hdEJhY2tDYXJkTnVtYmVyLCBmb3JtYXRCYWNrRXhwaXJ5LCBmb3JtYXRDYXJkTnVtYmVyLCBmb3JtYXRFeHBpcnksIGZvcm1hdEZvcndhcmRFeHBpcnksIGZvcm1hdEZvcndhcmRTbGFzaCwgZm9ybWF0TW9udGhFeHBpcnksIGhhc1RleHRTZWxlY3RlZCwgbHVobkNoZWNrLCByZUZvcm1hdENhcmROdW1iZXIsIHJlc3RyaWN0Q1ZDLCByZXN0cmljdENhcmROdW1iZXIsIHJlc3RyaWN0Q29tYmluZWRFeHBpcnksIHJlc3RyaWN0RXhwaXJ5LCByZXN0cmljdE1vbnRoRXhwaXJ5LCByZXN0cmljdE51bWVyaWMsIHJlc3RyaWN0WWVhckV4cGlyeSwgc2V0Q2FyZFR5cGUsXG4gIGluZGV4T2YgPSBbXS5pbmRleE9mIHx8IGZ1bmN0aW9uKGl0ZW0pIHsgZm9yICh2YXIgaSA9IDAsIGwgPSB0aGlzLmxlbmd0aDsgaSA8IGw7IGkrKykgeyBpZiAoaSBpbiB0aGlzICYmIHRoaXNbaV0gPT09IGl0ZW0pIHJldHVybiBpOyB9IHJldHVybiAtMTsgfTtcblxuUUogPSByZXF1aXJlKCdxai9zcmMvcWouY29mZmVlJyk7XG5cbmRlZmF1bHRGb3JtYXQgPSAvKFxcZHsxLDR9KS9nO1xuXG5jYXJkcyA9IFtcbiAge1xuICAgIHR5cGU6ICdhbWV4JyxcbiAgICBwYXR0ZXJuOiAvXjNbNDddLyxcbiAgICBmb3JtYXQ6IC8oXFxkezEsNH0pKFxcZHsxLDZ9KT8oXFxkezEsNX0pPy8sXG4gICAgbGVuZ3RoOiBbMTVdLFxuICAgIGN2Y0xlbmd0aDogWzRdLFxuICAgIGx1aG46IHRydWVcbiAgfSwge1xuICAgIHR5cGU6ICdkYW5rb3J0JyxcbiAgICBwYXR0ZXJuOiAvXjUwMTkvLFxuICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICBsZW5ndGg6IFsxNl0sXG4gICAgY3ZjTGVuZ3RoOiBbM10sXG4gICAgbHVobjogdHJ1ZVxuICB9LCB7XG4gICAgdHlwZTogJ2RpbmVyc2NsdWInLFxuICAgIHBhdHRlcm46IC9eKDM2fDM4fDMwWzAtNV0pLyxcbiAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgbGVuZ3RoOiBbMTRdLFxuICAgIGN2Y0xlbmd0aDogWzNdLFxuICAgIGx1aG46IHRydWVcbiAgfSwge1xuICAgIHR5cGU6ICdkaXNjb3ZlcicsXG4gICAgcGF0dGVybjogL14oNjAxMXw2NXw2NFs0LTldfDYyMikvLFxuICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICBsZW5ndGg6IFsxNl0sXG4gICAgY3ZjTGVuZ3RoOiBbM10sXG4gICAgbHVobjogdHJ1ZVxuICB9LCB7XG4gICAgdHlwZTogJ2pjYicsXG4gICAgcGF0dGVybjogL14zNS8sXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGxlbmd0aDogWzE2XSxcbiAgICBjdmNMZW5ndGg6IFszXSxcbiAgICBsdWhuOiB0cnVlXG4gIH0sIHtcbiAgICB0eXBlOiAnbGFzZXInLFxuICAgIHBhdHRlcm46IC9eKDY3MDZ8Njc3MXw2NzA5KS8sXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGxlbmd0aDogWzE2LCAxNywgMTgsIDE5XSxcbiAgICBjdmNMZW5ndGg6IFszXSxcbiAgICBsdWhuOiB0cnVlXG4gIH0sIHtcbiAgICB0eXBlOiAnbWFlc3RybycsXG4gICAgcGF0dGVybjogL14oNTAxOHw1MDIwfDUwMzh8NjMwNHw2NzAzfDY3NTl8Njc2WzEtM10pLyxcbiAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgbGVuZ3RoOiBbMTIsIDEzLCAxNCwgMTUsIDE2LCAxNywgMTgsIDE5XSxcbiAgICBjdmNMZW5ndGg6IFszXSxcbiAgICBsdWhuOiB0cnVlXG4gIH0sIHtcbiAgICB0eXBlOiAnbWFzdGVyY2FyZCcsXG4gICAgcGF0dGVybjogL141WzEtNV0vLFxuICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICBsZW5ndGg6IFsxNl0sXG4gICAgY3ZjTGVuZ3RoOiBbM10sXG4gICAgbHVobjogdHJ1ZVxuICB9LCB7XG4gICAgdHlwZTogJ3VuaW9ucGF5JyxcbiAgICBwYXR0ZXJuOiAvXjYyLyxcbiAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgbGVuZ3RoOiBbMTYsIDE3LCAxOCwgMTldLFxuICAgIGN2Y0xlbmd0aDogWzNdLFxuICAgIGx1aG46IGZhbHNlXG4gIH0sIHtcbiAgICB0eXBlOiAndmlzYWVsZWN0cm9uJyxcbiAgICBwYXR0ZXJuOiAvXjQoMDI2fDE3NTAwfDQwNXw1MDh8ODQ0fDkxWzM3XSkvLFxuICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICBsZW5ndGg6IFsxNl0sXG4gICAgY3ZjTGVuZ3RoOiBbM10sXG4gICAgbHVobjogdHJ1ZVxuICB9LCB7XG4gICAgdHlwZTogJ3Zpc2EnLFxuICAgIHBhdHRlcm46IC9eNC8sXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGxlbmd0aDogWzEzLCAxNl0sXG4gICAgY3ZjTGVuZ3RoOiBbM10sXG4gICAgbHVobjogdHJ1ZVxuICB9LCB7XG4gICAgdHlwZTogJ2VsbycsXG4gICAgcGF0dGVybjogL140MDExfDQzODkzNXw0NSgxNDE2fDc2KXw1MCg0MTc1fDY2OTl8Njd8OTBbNC03XSl8NjMoNjI5N3w2MzY4KS8sXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGxlbmd0aDogWzE2XSxcbiAgICBjdmNMZW5ndGg6IFszXSxcbiAgICBsdWhuOiB0cnVlXG4gIH1cbl07XG5cbmNhcmRGcm9tTnVtYmVyID0gZnVuY3Rpb24obnVtKSB7XG4gIHZhciBjYXJkLCBpLCBsZW47XG4gIG51bSA9IChudW0gKyAnJykucmVwbGFjZSgvXFxEL2csICcnKTtcbiAgZm9yIChpID0gMCwgbGVuID0gY2FyZHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBjYXJkID0gY2FyZHNbaV07XG4gICAgaWYgKGNhcmQucGF0dGVybi50ZXN0KG51bSkpIHtcbiAgICAgIHJldHVybiBjYXJkO1xuICAgIH1cbiAgfVxufTtcblxuY2FyZEZyb21UeXBlID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIgY2FyZCwgaSwgbGVuO1xuICBmb3IgKGkgPSAwLCBsZW4gPSBjYXJkcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGNhcmQgPSBjYXJkc1tpXTtcbiAgICBpZiAoY2FyZC50eXBlID09PSB0eXBlKSB7XG4gICAgICByZXR1cm4gY2FyZDtcbiAgICB9XG4gIH1cbn07XG5cbmx1aG5DaGVjayA9IGZ1bmN0aW9uKG51bSkge1xuICB2YXIgZGlnaXQsIGRpZ2l0cywgaSwgbGVuLCBvZGQsIHN1bTtcbiAgb2RkID0gdHJ1ZTtcbiAgc3VtID0gMDtcbiAgZGlnaXRzID0gKG51bSArICcnKS5zcGxpdCgnJykucmV2ZXJzZSgpO1xuICBmb3IgKGkgPSAwLCBsZW4gPSBkaWdpdHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBkaWdpdCA9IGRpZ2l0c1tpXTtcbiAgICBkaWdpdCA9IHBhcnNlSW50KGRpZ2l0LCAxMCk7XG4gICAgaWYgKChvZGQgPSAhb2RkKSkge1xuICAgICAgZGlnaXQgKj0gMjtcbiAgICB9XG4gICAgaWYgKGRpZ2l0ID4gOSkge1xuICAgICAgZGlnaXQgLT0gOTtcbiAgICB9XG4gICAgc3VtICs9IGRpZ2l0O1xuICB9XG4gIHJldHVybiBzdW0gJSAxMCA9PT0gMDtcbn07XG5cbmhhc1RleHRTZWxlY3RlZCA9IGZ1bmN0aW9uKHRhcmdldCkge1xuICB2YXIgcmVmO1xuICBpZiAoKHRhcmdldC5zZWxlY3Rpb25TdGFydCAhPSBudWxsKSAmJiB0YXJnZXQuc2VsZWN0aW9uU3RhcnQgIT09IHRhcmdldC5zZWxlY3Rpb25FbmQpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAoKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBkb2N1bWVudCAhPT0gbnVsbCA/IChyZWYgPSBkb2N1bWVudC5zZWxlY3Rpb24pICE9IG51bGwgPyByZWYuY3JlYXRlUmFuZ2UgOiB2b2lkIDAgOiB2b2lkIDApICE9IG51bGwpIHtcbiAgICBpZiAoZG9jdW1lbnQuc2VsZWN0aW9uLmNyZWF0ZVJhbmdlKCkudGV4dCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbnJlRm9ybWF0Q2FyZE51bWJlciA9IGZ1bmN0aW9uKGUpIHtcbiAgcmV0dXJuIHNldFRpbWVvdXQoKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHRhcmdldCwgdmFsdWU7XG4gICAgICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICAgIHZhbHVlID0gUUoudmFsKHRhcmdldCk7XG4gICAgICB2YWx1ZSA9IFBheW1lbnQuZm5zLmZvcm1hdENhcmROdW1iZXIodmFsdWUpO1xuICAgICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIHZhbHVlKTtcbiAgICB9O1xuICB9KSh0aGlzKSk7XG59O1xuXG5mb3JtYXRDYXJkTnVtYmVyID0gZnVuY3Rpb24oZSkge1xuICB2YXIgY2FyZCwgZGlnaXQsIGxlbmd0aCwgcmUsIHRhcmdldCwgdXBwZXJMZW5ndGgsIHZhbHVlO1xuICBkaWdpdCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZS53aGljaCk7XG4gIGlmICghL15cXGQrJC8udGVzdChkaWdpdCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gIHZhbHVlID0gUUoudmFsKHRhcmdldCk7XG4gIGNhcmQgPSBjYXJkRnJvbU51bWJlcih2YWx1ZSArIGRpZ2l0KTtcbiAgbGVuZ3RoID0gKHZhbHVlLnJlcGxhY2UoL1xcRC9nLCAnJykgKyBkaWdpdCkubGVuZ3RoO1xuICB1cHBlckxlbmd0aCA9IDE2O1xuICBpZiAoY2FyZCkge1xuICAgIHVwcGVyTGVuZ3RoID0gY2FyZC5sZW5ndGhbY2FyZC5sZW5ndGgubGVuZ3RoIC0gMV07XG4gIH1cbiAgaWYgKGxlbmd0aCA+PSB1cHBlckxlbmd0aCkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoKHRhcmdldC5zZWxlY3Rpb25TdGFydCAhPSBudWxsKSAmJiB0YXJnZXQuc2VsZWN0aW9uU3RhcnQgIT09IHZhbHVlLmxlbmd0aCkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoY2FyZCAmJiBjYXJkLnR5cGUgPT09ICdhbWV4Jykge1xuICAgIHJlID0gL14oXFxkezR9fFxcZHs0fVxcc1xcZHs2fSkkLztcbiAgfSBlbHNlIHtcbiAgICByZSA9IC8oPzpefFxccykoXFxkezR9KSQvO1xuICB9XG4gIGlmIChyZS50ZXN0KHZhbHVlKSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgdmFsdWUgKyAnICcgKyBkaWdpdCk7XG4gIH0gZWxzZSBpZiAocmUudGVzdCh2YWx1ZSArIGRpZ2l0KSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgdmFsdWUgKyBkaWdpdCArICcgJyk7XG4gIH1cbn07XG5cbmZvcm1hdEJhY2tDYXJkTnVtYmVyID0gZnVuY3Rpb24oZSkge1xuICB2YXIgdGFyZ2V0LCB2YWx1ZTtcbiAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gIHZhbHVlID0gUUoudmFsKHRhcmdldCk7XG4gIGlmIChlLm1ldGEpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGUud2hpY2ggIT09IDgpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKCh0YXJnZXQuc2VsZWN0aW9uU3RhcnQgIT0gbnVsbCkgJiYgdGFyZ2V0LnNlbGVjdGlvblN0YXJ0ICE9PSB2YWx1ZS5sZW5ndGgpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKC9cXGRcXHMkLy50ZXN0KHZhbHVlKSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgdmFsdWUucmVwbGFjZSgvXFxkXFxzJC8sICcnKSk7XG4gIH0gZWxzZSBpZiAoL1xcc1xcZD8kLy50ZXN0KHZhbHVlKSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgdmFsdWUucmVwbGFjZSgvXFxzXFxkPyQvLCAnJykpO1xuICB9XG59O1xuXG5mb3JtYXRFeHBpcnkgPSBmdW5jdGlvbihlKSB7XG4gIHZhciBkaWdpdCwgdGFyZ2V0LCB2YWw7XG4gIGRpZ2l0ID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKTtcbiAgaWYgKCEvXlxcZCskLy50ZXN0KGRpZ2l0KSkge1xuICAgIHJldHVybjtcbiAgfVxuICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgdmFsID0gUUoudmFsKHRhcmdldCkgKyBkaWdpdDtcbiAgaWYgKC9eXFxkJC8udGVzdCh2YWwpICYmICh2YWwgIT09ICcwJyAmJiB2YWwgIT09ICcxJykpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIFwiMFwiICsgdmFsICsgXCIgLyBcIik7XG4gIH0gZWxzZSBpZiAoL15cXGRcXGQkLy50ZXN0KHZhbCkpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIHZhbCArIFwiIC8gXCIpO1xuICB9XG59O1xuXG5mb3JtYXRNb250aEV4cGlyeSA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIGRpZ2l0LCB0YXJnZXQsIHZhbDtcbiAgZGlnaXQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpO1xuICBpZiAoIS9eXFxkKyQvLnRlc3QoZGlnaXQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRhcmdldCA9IGUudGFyZ2V0O1xuICB2YWwgPSBRSi52YWwodGFyZ2V0KSArIGRpZ2l0O1xuICBpZiAoL15cXGQkLy50ZXN0KHZhbCkgJiYgKHZhbCAhPT0gJzAnICYmIHZhbCAhPT0gJzEnKSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgXCIwXCIgKyB2YWwpO1xuICB9IGVsc2UgaWYgKC9eXFxkXFxkJC8udGVzdCh2YWwpKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCBcIlwiICsgdmFsKTtcbiAgfVxufTtcblxuZm9ybWF0Rm9yd2FyZEV4cGlyeSA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIGRpZ2l0LCB0YXJnZXQsIHZhbDtcbiAgZGlnaXQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpO1xuICBpZiAoIS9eXFxkKyQvLnRlc3QoZGlnaXQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRhcmdldCA9IGUudGFyZ2V0O1xuICB2YWwgPSBRSi52YWwodGFyZ2V0KTtcbiAgaWYgKC9eXFxkXFxkJC8udGVzdCh2YWwpKSB7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIHZhbCArIFwiIC8gXCIpO1xuICB9XG59O1xuXG5mb3JtYXRGb3J3YXJkU2xhc2ggPSBmdW5jdGlvbihlKSB7XG4gIHZhciBzbGFzaCwgdGFyZ2V0LCB2YWw7XG4gIHNsYXNoID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKTtcbiAgaWYgKHNsYXNoICE9PSAnLycpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gIHZhbCA9IFFKLnZhbCh0YXJnZXQpO1xuICBpZiAoL15cXGQkLy50ZXN0KHZhbCkgJiYgdmFsICE9PSAnMCcpIHtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgXCIwXCIgKyB2YWwgKyBcIiAvIFwiKTtcbiAgfVxufTtcblxuZm9ybWF0QmFja0V4cGlyeSA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIHRhcmdldCwgdmFsdWU7XG4gIGlmIChlLm1ldGFLZXkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gIHZhbHVlID0gUUoudmFsKHRhcmdldCk7XG4gIGlmIChlLndoaWNoICE9PSA4KSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICgodGFyZ2V0LnNlbGVjdGlvblN0YXJ0ICE9IG51bGwpICYmIHRhcmdldC5zZWxlY3Rpb25TdGFydCAhPT0gdmFsdWUubGVuZ3RoKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICgvXFxkKFxcc3xcXC8pKyQvLnRlc3QodmFsdWUpKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCB2YWx1ZS5yZXBsYWNlKC9cXGQoXFxzfFxcLykqJC8sICcnKSk7XG4gIH0gZWxzZSBpZiAoL1xcc1xcL1xccz9cXGQ/JC8udGVzdCh2YWx1ZSkpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIHZhbHVlLnJlcGxhY2UoL1xcc1xcL1xccz9cXGQ/JC8sICcnKSk7XG4gIH1cbn07XG5cbnJlc3RyaWN0TnVtZXJpYyA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIGlucHV0O1xuICBpZiAoZS5tZXRhS2V5IHx8IGUuY3RybEtleSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmIChlLndoaWNoID09PSAzMikge1xuICAgIHJldHVybiBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH1cbiAgaWYgKGUud2hpY2ggPT09IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAoZS53aGljaCA8IDMzKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaW5wdXQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpO1xuICBpZiAoIS9bXFxkXFxzXS8udGVzdChpbnB1dCkpIHtcbiAgICByZXR1cm4gZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG59O1xuXG5yZXN0cmljdENhcmROdW1iZXIgPSBmdW5jdGlvbihlKSB7XG4gIHZhciBjYXJkLCBkaWdpdCwgdGFyZ2V0LCB2YWx1ZTtcbiAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gIGRpZ2l0ID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKTtcbiAgaWYgKCEvXlxcZCskLy50ZXN0KGRpZ2l0KSkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoaGFzVGV4dFNlbGVjdGVkKHRhcmdldCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFsdWUgPSAoUUoudmFsKHRhcmdldCkgKyBkaWdpdCkucmVwbGFjZSgvXFxEL2csICcnKTtcbiAgY2FyZCA9IGNhcmRGcm9tTnVtYmVyKHZhbHVlKTtcbiAgaWYgKGNhcmQpIHtcbiAgICBpZiAoISh2YWx1ZS5sZW5ndGggPD0gY2FyZC5sZW5ndGhbY2FyZC5sZW5ndGgubGVuZ3RoIC0gMV0pKSB7XG4gICAgICByZXR1cm4gZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoISh2YWx1ZS5sZW5ndGggPD0gMTYpKSB7XG4gICAgICByZXR1cm4gZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfVxufTtcblxucmVzdHJpY3RFeHBpcnkgPSBmdW5jdGlvbihlLCBsZW5ndGgpIHtcbiAgdmFyIGRpZ2l0LCB0YXJnZXQsIHZhbHVlO1xuICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgZGlnaXQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpO1xuICBpZiAoIS9eXFxkKyQvLnRlc3QoZGlnaXQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChoYXNUZXh0U2VsZWN0ZWQodGFyZ2V0KSkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YWx1ZSA9IFFKLnZhbCh0YXJnZXQpICsgZGlnaXQ7XG4gIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvXFxEL2csICcnKTtcbiAgaWYgKHZhbHVlLmxlbmd0aCA+IGxlbmd0aCkge1xuICAgIHJldHVybiBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH1cbn07XG5cbnJlc3RyaWN0Q29tYmluZWRFeHBpcnkgPSBmdW5jdGlvbihlKSB7XG4gIHJldHVybiByZXN0cmljdEV4cGlyeShlLCA2KTtcbn07XG5cbnJlc3RyaWN0TW9udGhFeHBpcnkgPSBmdW5jdGlvbihlKSB7XG4gIHJldHVybiByZXN0cmljdEV4cGlyeShlLCAyKTtcbn07XG5cbnJlc3RyaWN0WWVhckV4cGlyeSA9IGZ1bmN0aW9uKGUpIHtcbiAgcmV0dXJuIHJlc3RyaWN0RXhwaXJ5KGUsIDQpO1xufTtcblxucmVzdHJpY3RDVkMgPSBmdW5jdGlvbihlKSB7XG4gIHZhciBkaWdpdCwgdGFyZ2V0LCB2YWw7XG4gIHRhcmdldCA9IGUudGFyZ2V0O1xuICBkaWdpdCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZS53aGljaCk7XG4gIGlmICghL15cXGQrJC8udGVzdChkaWdpdCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGhhc1RleHRTZWxlY3RlZCh0YXJnZXQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhbCA9IFFKLnZhbCh0YXJnZXQpICsgZGlnaXQ7XG4gIGlmICghKHZhbC5sZW5ndGggPD0gNCkpIHtcbiAgICByZXR1cm4gZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG59O1xuXG5zZXRDYXJkVHlwZSA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIGFsbFR5cGVzLCBjYXJkLCBjYXJkVHlwZSwgdGFyZ2V0LCB2YWw7XG4gIHRhcmdldCA9IGUudGFyZ2V0O1xuICB2YWwgPSBRSi52YWwodGFyZ2V0KTtcbiAgY2FyZFR5cGUgPSBQYXltZW50LmZucy5jYXJkVHlwZSh2YWwpIHx8ICd1bmtub3duJztcbiAgaWYgKCFRSi5oYXNDbGFzcyh0YXJnZXQsIGNhcmRUeXBlKSkge1xuICAgIGFsbFR5cGVzID0gKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGksIGxlbiwgcmVzdWx0cztcbiAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgIGZvciAoaSA9IDAsIGxlbiA9IGNhcmRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGNhcmQgPSBjYXJkc1tpXTtcbiAgICAgICAgcmVzdWx0cy5wdXNoKGNhcmQudHlwZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9KSgpO1xuICAgIFFKLnJlbW92ZUNsYXNzKHRhcmdldCwgJ3Vua25vd24nKTtcbiAgICBRSi5yZW1vdmVDbGFzcyh0YXJnZXQsIGFsbFR5cGVzLmpvaW4oJyAnKSk7XG4gICAgUUouYWRkQ2xhc3ModGFyZ2V0LCBjYXJkVHlwZSk7XG4gICAgUUoudG9nZ2xlQ2xhc3ModGFyZ2V0LCAnaWRlbnRpZmllZCcsIGNhcmRUeXBlICE9PSAndW5rbm93bicpO1xuICAgIHJldHVybiBRSi50cmlnZ2VyKHRhcmdldCwgJ3BheW1lbnQuY2FyZFR5cGUnLCBjYXJkVHlwZSk7XG4gIH1cbn07XG5cblBheW1lbnQgPSAoZnVuY3Rpb24oKSB7XG4gIGZ1bmN0aW9uIFBheW1lbnQoKSB7fVxuXG4gIFBheW1lbnQuZm5zID0ge1xuICAgIGNhcmRFeHBpcnlWYWw6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICB2YXIgbW9udGgsIHByZWZpeCwgcmVmLCB5ZWFyO1xuICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9cXHMvZywgJycpO1xuICAgICAgcmVmID0gdmFsdWUuc3BsaXQoJy8nLCAyKSwgbW9udGggPSByZWZbMF0sIHllYXIgPSByZWZbMV07XG4gICAgICBpZiAoKHllYXIgIT0gbnVsbCA/IHllYXIubGVuZ3RoIDogdm9pZCAwKSA9PT0gMiAmJiAvXlxcZCskLy50ZXN0KHllYXIpKSB7XG4gICAgICAgIHByZWZpeCA9IChuZXcgRGF0ZSkuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgcHJlZml4ID0gcHJlZml4LnRvU3RyaW5nKCkuc2xpY2UoMCwgMik7XG4gICAgICAgIHllYXIgPSBwcmVmaXggKyB5ZWFyO1xuICAgICAgfVxuICAgICAgbW9udGggPSBwYXJzZUludChtb250aCwgMTApO1xuICAgICAgeWVhciA9IHBhcnNlSW50KHllYXIsIDEwKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG1vbnRoOiBtb250aCxcbiAgICAgICAgeWVhcjogeWVhclxuICAgICAgfTtcbiAgICB9LFxuICAgIHZhbGlkYXRlQ2FyZE51bWJlcjogZnVuY3Rpb24obnVtKSB7XG4gICAgICB2YXIgY2FyZCwgcmVmO1xuICAgICAgbnVtID0gKG51bSArICcnKS5yZXBsYWNlKC9cXHMrfC0vZywgJycpO1xuICAgICAgaWYgKCEvXlxcZCskLy50ZXN0KG51bSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgY2FyZCA9IGNhcmRGcm9tTnVtYmVyKG51bSk7XG4gICAgICBpZiAoIWNhcmQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIChyZWYgPSBudW0ubGVuZ3RoLCBpbmRleE9mLmNhbGwoY2FyZC5sZW5ndGgsIHJlZikgPj0gMCkgJiYgKGNhcmQubHVobiA9PT0gZmFsc2UgfHwgbHVobkNoZWNrKG51bSkpO1xuICAgIH0sXG4gICAgdmFsaWRhdGVDYXJkRXhwaXJ5OiBmdW5jdGlvbihtb250aCwgeWVhcikge1xuICAgICAgdmFyIGN1cnJlbnRUaW1lLCBleHBpcnksIHByZWZpeCwgcmVmO1xuICAgICAgaWYgKHR5cGVvZiBtb250aCA9PT0gJ29iamVjdCcgJiYgJ21vbnRoJyBpbiBtb250aCkge1xuICAgICAgICByZWYgPSBtb250aCwgbW9udGggPSByZWYubW9udGgsIHllYXIgPSByZWYueWVhcjtcbiAgICAgIH1cbiAgICAgIGlmICghKG1vbnRoICYmIHllYXIpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIG1vbnRoID0gUUoudHJpbShtb250aCk7XG4gICAgICB5ZWFyID0gUUoudHJpbSh5ZWFyKTtcbiAgICAgIGlmICghL15cXGQrJC8udGVzdChtb250aCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKCEvXlxcZCskLy50ZXN0KHllYXIpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICghKHBhcnNlSW50KG1vbnRoLCAxMCkgPD0gMTIpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICh5ZWFyLmxlbmd0aCA9PT0gMikge1xuICAgICAgICBwcmVmaXggPSAobmV3IERhdGUpLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgIHByZWZpeCA9IHByZWZpeC50b1N0cmluZygpLnNsaWNlKDAsIDIpO1xuICAgICAgICB5ZWFyID0gcHJlZml4ICsgeWVhcjtcbiAgICAgIH1cbiAgICAgIGV4cGlyeSA9IG5ldyBEYXRlKHllYXIsIG1vbnRoKTtcbiAgICAgIGN1cnJlbnRUaW1lID0gbmV3IERhdGU7XG4gICAgICBleHBpcnkuc2V0TW9udGgoZXhwaXJ5LmdldE1vbnRoKCkgLSAxKTtcbiAgICAgIGV4cGlyeS5zZXRNb250aChleHBpcnkuZ2V0TW9udGgoKSArIDEsIDEpO1xuICAgICAgcmV0dXJuIGV4cGlyeSA+IGN1cnJlbnRUaW1lO1xuICAgIH0sXG4gICAgdmFsaWRhdGVDYXJkQ1ZDOiBmdW5jdGlvbihjdmMsIHR5cGUpIHtcbiAgICAgIHZhciByZWYsIHJlZjE7XG4gICAgICBjdmMgPSBRSi50cmltKGN2Yyk7XG4gICAgICBpZiAoIS9eXFxkKyQvLnRlc3QoY3ZjKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAodHlwZSAmJiBjYXJkRnJvbVR5cGUodHlwZSkpIHtcbiAgICAgICAgcmV0dXJuIHJlZiA9IGN2Yy5sZW5ndGgsIGluZGV4T2YuY2FsbCgocmVmMSA9IGNhcmRGcm9tVHlwZSh0eXBlKSkgIT0gbnVsbCA/IHJlZjEuY3ZjTGVuZ3RoIDogdm9pZCAwLCByZWYpID49IDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gY3ZjLmxlbmd0aCA+PSAzICYmIGN2Yy5sZW5ndGggPD0gNDtcbiAgICAgIH1cbiAgICB9LFxuICAgIGNhcmRUeXBlOiBmdW5jdGlvbihudW0pIHtcbiAgICAgIHZhciByZWY7XG4gICAgICBpZiAoIW51bSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIHJldHVybiAoKHJlZiA9IGNhcmRGcm9tTnVtYmVyKG51bSkpICE9IG51bGwgPyByZWYudHlwZSA6IHZvaWQgMCkgfHwgbnVsbDtcbiAgICB9LFxuICAgIGZvcm1hdENhcmROdW1iZXI6IGZ1bmN0aW9uKG51bSkge1xuICAgICAgdmFyIGNhcmQsIGdyb3VwcywgcmVmLCB1cHBlckxlbmd0aDtcbiAgICAgIGNhcmQgPSBjYXJkRnJvbU51bWJlcihudW0pO1xuICAgICAgaWYgKCFjYXJkKSB7XG4gICAgICAgIHJldHVybiBudW07XG4gICAgICB9XG4gICAgICB1cHBlckxlbmd0aCA9IGNhcmQubGVuZ3RoW2NhcmQubGVuZ3RoLmxlbmd0aCAtIDFdO1xuICAgICAgbnVtID0gbnVtLnJlcGxhY2UoL1xcRC9nLCAnJyk7XG4gICAgICBudW0gPSBudW0uc2xpY2UoMCwgK3VwcGVyTGVuZ3RoICsgMSB8fCA5ZTkpO1xuICAgICAgaWYgKGNhcmQuZm9ybWF0Lmdsb2JhbCkge1xuICAgICAgICByZXR1cm4gKHJlZiA9IG51bS5tYXRjaChjYXJkLmZvcm1hdCkpICE9IG51bGwgPyByZWYuam9pbignICcpIDogdm9pZCAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZ3JvdXBzID0gY2FyZC5mb3JtYXQuZXhlYyhudW0pO1xuICAgICAgICBpZiAoZ3JvdXBzICE9IG51bGwpIHtcbiAgICAgICAgICBncm91cHMuc2hpZnQoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZ3JvdXBzICE9IG51bGwgPyBncm91cHMuam9pbignICcpIDogdm9pZCAwO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBQYXltZW50LnJlc3RyaWN0TnVtZXJpYyA9IGZ1bmN0aW9uKGVsKSB7XG4gICAgcmV0dXJuIFFKLm9uKGVsLCAna2V5cHJlc3MnLCByZXN0cmljdE51bWVyaWMpO1xuICB9O1xuXG4gIFBheW1lbnQuY2FyZEV4cGlyeVZhbCA9IGZ1bmN0aW9uKGVsKSB7XG4gICAgcmV0dXJuIFBheW1lbnQuZm5zLmNhcmRFeHBpcnlWYWwoUUoudmFsKGVsKSk7XG4gIH07XG5cbiAgUGF5bWVudC5mb3JtYXRDYXJkQ1ZDID0gZnVuY3Rpb24oZWwpIHtcbiAgICBQYXltZW50LnJlc3RyaWN0TnVtZXJpYyhlbCk7XG4gICAgUUoub24oZWwsICdrZXlwcmVzcycsIHJlc3RyaWN0Q1ZDKTtcbiAgICByZXR1cm4gZWw7XG4gIH07XG5cbiAgUGF5bWVudC5mb3JtYXRDYXJkRXhwaXJ5ID0gZnVuY3Rpb24oZWwpIHtcbiAgICB2YXIgbW9udGgsIHllYXI7XG4gICAgUGF5bWVudC5yZXN0cmljdE51bWVyaWMoZWwpO1xuICAgIGlmIChlbC5sZW5ndGggJiYgZWwubGVuZ3RoID09PSAyKSB7XG4gICAgICBtb250aCA9IGVsWzBdLCB5ZWFyID0gZWxbMV07XG4gICAgICB0aGlzLmZvcm1hdENhcmRFeHBpcnlNdWx0aXBsZShtb250aCwgeWVhcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIFFKLm9uKGVsLCAna2V5cHJlc3MnLCByZXN0cmljdENvbWJpbmVkRXhwaXJ5KTtcbiAgICAgIFFKLm9uKGVsLCAna2V5cHJlc3MnLCBmb3JtYXRFeHBpcnkpO1xuICAgICAgUUoub24oZWwsICdrZXlwcmVzcycsIGZvcm1hdEZvcndhcmRTbGFzaCk7XG4gICAgICBRSi5vbihlbCwgJ2tleXByZXNzJywgZm9ybWF0Rm9yd2FyZEV4cGlyeSk7XG4gICAgICBRSi5vbihlbCwgJ2tleWRvd24nLCBmb3JtYXRCYWNrRXhwaXJ5KTtcbiAgICB9XG4gICAgcmV0dXJuIGVsO1xuICB9O1xuXG4gIFBheW1lbnQuZm9ybWF0Q2FyZEV4cGlyeU11bHRpcGxlID0gZnVuY3Rpb24obW9udGgsIHllYXIpIHtcbiAgICBRSi5vbihtb250aCwgJ2tleXByZXNzJywgcmVzdHJpY3RNb250aEV4cGlyeSk7XG4gICAgUUoub24obW9udGgsICdrZXlwcmVzcycsIGZvcm1hdE1vbnRoRXhwaXJ5KTtcbiAgICByZXR1cm4gUUoub24oeWVhciwgJ2tleXByZXNzJywgcmVzdHJpY3RZZWFyRXhwaXJ5KTtcbiAgfTtcblxuICBQYXltZW50LmZvcm1hdENhcmROdW1iZXIgPSBmdW5jdGlvbihlbCkge1xuICAgIFBheW1lbnQucmVzdHJpY3ROdW1lcmljKGVsKTtcbiAgICBRSi5vbihlbCwgJ2tleXByZXNzJywgcmVzdHJpY3RDYXJkTnVtYmVyKTtcbiAgICBRSi5vbihlbCwgJ2tleXByZXNzJywgZm9ybWF0Q2FyZE51bWJlcik7XG4gICAgUUoub24oZWwsICdrZXlkb3duJywgZm9ybWF0QmFja0NhcmROdW1iZXIpO1xuICAgIFFKLm9uKGVsLCAna2V5dXAnLCBzZXRDYXJkVHlwZSk7XG4gICAgUUoub24oZWwsICdwYXN0ZScsIHJlRm9ybWF0Q2FyZE51bWJlcik7XG4gICAgcmV0dXJuIGVsO1xuICB9O1xuXG4gIFBheW1lbnQuZ2V0Q2FyZEFycmF5ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGNhcmRzO1xuICB9O1xuXG4gIFBheW1lbnQuc2V0Q2FyZEFycmF5ID0gZnVuY3Rpb24oY2FyZEFycmF5KSB7XG4gICAgY2FyZHMgPSBjYXJkQXJyYXk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgUGF5bWVudC5hZGRUb0NhcmRBcnJheSA9IGZ1bmN0aW9uKGNhcmRPYmplY3QpIHtcbiAgICByZXR1cm4gY2FyZHMucHVzaChjYXJkT2JqZWN0KTtcbiAgfTtcblxuICBQYXltZW50LnJlbW92ZUZyb21DYXJkQXJyYXkgPSBmdW5jdGlvbih0eXBlKSB7XG4gICAgdmFyIGtleSwgdmFsdWU7XG4gICAgZm9yIChrZXkgaW4gY2FyZHMpIHtcbiAgICAgIHZhbHVlID0gY2FyZHNba2V5XTtcbiAgICAgIGlmICh2YWx1ZS50eXBlID09PSB0eXBlKSB7XG4gICAgICAgIGNhcmRzLnNwbGljZShrZXksIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICByZXR1cm4gUGF5bWVudDtcblxufSkoKTtcblxubW9kdWxlLmV4cG9ydHMgPSBQYXltZW50O1xuXG5nbG9iYWwuUGF5bWVudCA9IFBheW1lbnQ7XG5cblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG59LHtcInFqL3NyYy9xai5jb2ZmZWVcIjoxfV19LHt9LFsyXSkoMilcbn0pOyIsIi8vIE1pbm5Qb3N0IEdpdmluZyBwbHVnaW5cbi8vIHRoZSBzZW1pLWNvbG9uIGJlZm9yZSBmdW5jdGlvbiBpbnZvY2F0aW9uIGlzIGEgc2FmZXR5IG5ldCBhZ2FpbnN0IGNvbmNhdGVuYXRlZFxuLy8gc2NyaXB0cyBhbmQvb3Igb3RoZXIgcGx1Z2lucyB3aGljaCBtYXkgbm90IGJlIGNsb3NlZCBwcm9wZXJseS5cbjsoZnVuY3Rpb24gKCAkLCB3aW5kb3csIGRvY3VtZW50LCB1bmRlZmluZWQgKSB7XG5cbiAgLy8gdW5kZWZpbmVkIGlzIHVzZWQgaGVyZSBhcyB0aGUgdW5kZWZpbmVkIGdsb2JhbCB2YXJpYWJsZSBpbiBFQ01BU2NyaXB0IDMgaXNcbiAgLy8gbXV0YWJsZSAoaWUuIGl0IGNhbiBiZSBjaGFuZ2VkIGJ5IHNvbWVvbmUgZWxzZSkuIHVuZGVmaW5lZCBpc24ndCByZWFsbHkgYmVpbmdcbiAgLy8gcGFzc2VkIGluIHNvIHdlIGNhbiBlbnN1cmUgdGhlIHZhbHVlIG9mIGl0IGlzIHRydWx5IHVuZGVmaW5lZC4gSW4gRVM1LCB1bmRlZmluZWRcbiAgLy8gY2FuIG5vIGxvbmdlciBiZSBtb2RpZmllZC5cblxuICAvLyB3aW5kb3cgYW5kIGRvY3VtZW50IGFyZSBwYXNzZWQgdGhyb3VnaCBhcyBsb2NhbCB2YXJpYWJsZSByYXRoZXIgdGhhbiBnbG9iYWxcbiAgLy8gYXMgdGhpcyAoc2xpZ2h0bHkpIHF1aWNrZW5zIHRoZSByZXNvbHV0aW9uIHByb2Nlc3MgYW5kIGNhbiBiZSBtb3JlIGVmZmljaWVudGx5XG4gIC8vIG1pbmlmaWVkIChlc3BlY2lhbGx5IHdoZW4gYm90aCBhcmUgcmVndWxhcmx5IHJlZmVyZW5jZWQgaW4geW91ciBwbHVnaW4pLlxuXG4gIC8vIENyZWF0ZSB0aGUgZGVmYXVsdHMgb25jZVxuICB2YXIgcGx1Z2luTmFtZSA9ICdtaW5ucG9zdF9naXZpbmcnLFxuICBkZWZhdWx0cyA9IHtcbiAgICAnZGVidWcnIDogZmFsc2UsIC8vIHRoaXMgY2FuIGJlIHNldCB0byB0cnVlIG9uIHBhZ2UgbGV2ZWwgb3B0aW9uc1xuICAgICdzdHJpcGVfcHVibGlzaGFibGVfa2V5JyA6ICcnLFxuICAgICdwbGFpZF9lbnYnIDogJycsXG4gICAgJ3BsYWlkX3B1YmxpY19rZXknIDogJycsXG4gICAgJ3BsYWlkX2xpbmsnIDogJyNhdXRob3JpemUtYWNoJyxcbiAgICAnbWlubnBvc3Rfcm9vdCcgOiAnaHR0cHM6Ly93d3cubWlubnBvc3QuY29tJyxcbiAgICAnZG9uYXRlX2Zvcm1fc2VsZWN0b3InOiAnI2RvbmF0ZScsXG4gICAgJ2RvbmF0ZV9zdGVwX3NlbGVjdG9yJyA6ICcjcGFuZWwtLXBheScsXG4gICAgJ2NvbmZpcm1fZm9ybV9zZWxlY3RvcicgOiAnI2NvbmZpcm0nLFxuICAgICdjb25maXJtX3N0ZXBfc2VsZWN0b3InIDogJyNwYW5lbC0tY29uZmlybWF0aW9uJyxcbiAgICAnYWN0aXZlJyA6ICdwYW5lbC0tcGF5JyxcbiAgICAnY29uZmlybScgOiAncGFuZWwtLWNvbmZpcm1hdGlvbicsXG4gICAgJ3F1ZXJ5JyA6ICdzdGVwJyxcbiAgICAncGF5X2NjX3Byb2Nlc3Npbmdfc2VsZWN0b3InIDogJ2lucHV0W2lkPVwiZWRpdC1wYXktZmVlc1wiXScsXG4gICAgJ2ZlZV9hbW91bnQnIDogJy5wcm9jZXNzaW5nLWFtb3VudCcsXG4gICAgJ2xldmVsX2Ftb3VudF9zZWxlY3RvcicgOiAnI3BhbmVsLS1wYXkgLmFtb3VudCAubGV2ZWwtYW1vdW50JyxcbiAgICAnb3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yJyA6ICcjYW1vdW50JyxcbiAgICAnZnJlcXVlbmN5X3NlbGVjdG9yJyA6ICcuZnJlcXVlbmN5JyxcbiAgICAnZnVsbF9hbW91bnRfc2VsZWN0b3InIDogJy5mdWxsLWFtb3VudCcsXG4gICAgJ2xldmVsX2luZGljYXRvcl9zZWxlY3RvcicgOiAnaDIubGV2ZWwnLFxuICAgICdsZXZlbF9uYW1lX3NlbGVjdG9yJyA6ICcubGV2ZWwtbmFtZScsXG4gICAgJ25hbWVfc2VsZWN0b3InIDogJy5mb3JtLWl0ZW0tLWRpc3BsYXktbmFtZScsXG4gICAgJ2luX2hvbm9yX29yX21lbW9yeV9maWVsZF9zZWxlY3RvcicgOiAnLmZvcm0taXRlbS0taG9ub3ItbWVtb3J5JyxcbiAgICAnaG9ub3Jfb3JfbWVtb3J5X2Nob29zZXInIDogJ2lucHV0W25hbWU9XCJpbl9ob25vcl9vcl9tZW1vcnlcIl0nLCAvLyByYWRpbyBmaWVsZHNcbiAgICAnaG9ub3JfdHlwZV9zZWxlY3RvcicgOiAnLmhvbm9yX3R5cGUnLCAvLyBzcGFuIGluc2lkZSBsYWJlbFxuICAgICdob25vcl9tZW1vcnlfaW5wdXRfZ3JvdXAnIDogJy5ob25vci1vci1tZW1vcnknLCAvLyBob2xkcyB0aGUgZm9ybSBmaWVsZFxuICAgICdub3RpZnlfc2VsZWN0b3InIDogJy5ub3RpZnlfc29tZW9uZScsXG4gICAgJ25vdGlmeV9maWVsZF9zZWxlY3RvcicgOiAnLmZvcm0taXRlbS0tbm90aWZ5JyxcbiAgICAnYW5vbnltb3VzX3NlbGVjdG9yJyA6ICcjYW5vbnltb3VzJyxcbiAgICAnc2hvd19iaWxsaW5nX2NvdW50cnlfc2VsZWN0b3InIDogJyNiaWxsaW5nX3Nob3dfY291bnRyeScsXG4gICAgJ2JpbGxpbmdfY291bnRyeV9zZWxlY3RvcicgOiAnLmZvcm0taXRlbS0tY291bnRyeScsXG4gICAgJ3Nob3dfc2hpcHBpbmdfY291bnRyeV9zZWxlY3RvcicgOiAnI3NoaXBwaW5nX3Nob3dfY291bnRyeScsXG4gICAgJ3NoaXBwaW5nX2NvdW50cnlfc2VsZWN0b3InIDogJy5mb3JtLWl0ZW0tLXNoaXBwaW5nLWNvdW50cnknLFxuICAgICdzaGlwcGluZ19hZGRyZXNzX3NlbGVjdG9yJyA6ICcuZm9ybS1pdGVtLS1zaGlwcGluZy1hZGRyZXNzJyxcbiAgICAndXNlX2Zvcl9zaGlwcGluZ19zZWxlY3RvcicgOiAnI3VzZWZvcnNoaXBwaW5nJyxcbiAgICAnZW1haWxfZmllbGRfc2VsZWN0b3InIDogJyNlbWFpbCcsXG4gICAgJ3Bhc3N3b3JkX2ZpZWxkX3NlbGVjdG9yJyA6ICcjcGFzc3dvcmQnLFxuICAgICdmaXJzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yJyA6ICcjZmlyc3RfbmFtZScsXG4gICAgJ2xhc3RfbmFtZV9maWVsZF9zZWxlY3RvcicgOiAnI2xhc3RfbmFtZScsXG4gICAgJ2FjY291bnRfY2l0eV9zZWxlY3RvcicgOiAnI2JpbGxpbmdfY2l0eScsXG4gICAgJ2FjY291bnRfc3RhdGVfc2VsZWN0b3InIDogJyNiaWxsaW5nX3N0YXRlJyxcbiAgICAnYWNjb3VudF96aXBfc2VsZWN0b3InIDogJyNiaWxsaW5nX3ppcCcsXG4gICAgJ2NyZWF0ZV9tcF9zZWxlY3RvcicgOiAnI2NyZWF0ZW1wYWNjb3VudCcsXG4gICAgJ3Bhc3N3b3JkX3NlbGVjdG9yJyA6ICcuZm9ybS1pdGVtLS1wYXNzd29yZCcsXG4gICAgJ2NhbGN1bGF0ZWRfYW1vdW50X3NlbGVjdG9yJyA6ICcuY2FsY3VsYXRlZC1hbW91bnQnLFxuICAgICdxdWFudGl0eV9maWVsZCcgOiAnI3F1YW50aXR5JyxcbiAgICAncXVhbnRpdHlfc2VsZWN0b3InIDogJy5xdWFudGl0eScsXG4gICAgJ2l0ZW1fc2VsZWN0b3InOiAnLnB1cmNoYXNlLWl0ZW0nLFxuICAgICdzaW5nbGVfdW5pdF9wcmljZV9hdHRyaWJ1dGUnIDogJ3VuaXQtcHJpY2UnLFxuICAgICdhZGRpdGlvbmFsX2Ftb3VudF9maWVsZCcgOiAnI2FkZGl0aW9uYWxfZG9uYXRpb24nLFxuICAgICdhZGRpdGlvbmFsX2Ftb3VudF9zZWxlY3RvcicgOiAnLmFkZGl0aW9uYWxfZG9uYXRpb24nLFxuICAgICdoYXNfYWRkaXRpb25hbF90ZXh0X3NlbGVjdG9yJyA6ICcuaGFzX2FkZGl0aW9uYWwnLFxuICAgICdiaWxsaW5nX3NlbGVjdG9yJyA6ICdmaWVsZHNldC5iaWxsaW5nJyxcbiAgICAnc2hpcHBpbmdfc2VsZWN0b3InIDogJ2ZpZWxkc2V0LnNoaXBwaW5nJyxcbiAgICAnY3JlZGl0X2NhcmRfZmllbGRzZXQnIDogJy5wYXltZW50LW1ldGhvZC1ncm91cCcsXG4gICAgJ2Nob29zZV9wYXltZW50JyA6ICcjY2hvb3NlLXBheW1lbnQtbWV0aG9kJyxcbiAgICAncGF5bWVudF9tZXRob2Rfc2VsZWN0b3InIDogJy5wYXltZW50LW1ldGhvZCcsXG4gICAgJ2NjX251bV9zZWxlY3RvcicgOiAnI2NhcmQtbnVtYmVyJyxcbiAgICAnY2NfZXhwX3NlbGVjdG9yJyA6ICcjY2FyZC1leHBpcnknLFxuICAgICdjY19jdnZfc2VsZWN0b3InIDogJyNjYXJkLWN2YycsXG4gICAgJ3BheW1lbnRfYnV0dG9uX3NlbGVjdG9yJyA6ICcjc3VibWl0JyxcbiAgICAnY29uZmlybV9idXR0b25fc2VsZWN0b3InIDogJyNmaW5pc2gnLFxuICAgICdvcHBfaWRfc2VsZWN0b3InIDogJyNmbGFza19pZCcsXG4gICAgJ3JlY3VycmluZ19zZWxlY3RvcicgOiAnI3JlY3VycmluZycsXG4gICAgJ25ld3NsZXR0ZXJfZ3JvdXBfc2VsZWN0b3InIDogJy5mb3JtLWl0ZW0tLW5ld3NsZXR0ZXIgaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJyxcbiAgICAnbWVzc2FnZV9ncm91cF9zZWxlY3RvcicgOiAnLmZvcm0taXRlbS0tb3B0aW9uYWwgaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJyxcbiAgICAncmVhc29uX2ZpZWxkX3NlbGVjdG9yJyA6ICcjcmVhc29uX2Zvcl9zdXBwb3J0aW5nJyxcbiAgICAnc2hhcmVfcmVhc29uX3NlbGVjdG9yJyA6ICcjcmVhc29uX3NoYXJlYWJsZScsXG4gICAgJ2NvbmZpcm1fdG9wX3NlbGVjdG9yJyA6ICcuc3VwcG9ydC0tcG9zdC1jb25maXJtJyxcbiAgICAnZXhpc3RpbmdfbmV3c2xldHRlcl9zZXR0aW5ncycgOiAnJyxcbiAgICAnbGV2ZWxzJyA6IHtcbiAgICAgIDEgOiB7XG4gICAgICAgICduYW1lJyA6ICdicm9uemUnLFxuICAgICAgICAnbWF4JyA6IDYwXG4gICAgICB9LFxuICAgICAgMiA6IHtcbiAgICAgICAgJ25hbWUnIDogJ3NpbHZlcicsXG4gICAgICAgICdtaW4nIDogNjAsXG4gICAgICAgICdtYXgnIDogMTIwXG4gICAgICB9LFxuICAgICAgMyA6IHtcbiAgICAgICAgJ25hbWUnIDogJ2dvbGQnLFxuICAgICAgICAnbWluJyA6IDEyMCxcbiAgICAgICAgJ21heCcgOiAyNDBcbiAgICAgIH0sXG4gICAgICA0IDoge1xuICAgICAgICAnbmFtZScgOiAncGxhdGludW0nLFxuICAgICAgICAnbWluJyA6IDI0MFxuICAgICAgfVxuICAgIH1cblxuICB9OyAvLyBlbmQgZGVmYXVsdHNcblxuICAvLyBUaGUgYWN0dWFsIHBsdWdpbiBjb25zdHJ1Y3RvclxuICBmdW5jdGlvbiBQbHVnaW4oIGVsZW1lbnQsIG9wdGlvbnMgKSB7XG5cbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuXG4gICAgLy8galF1ZXJ5IGhhcyBhbiBleHRlbmQgbWV0aG9kIHdoaWNoIG1lcmdlcyB0aGUgY29udGVudHMgb2YgdHdvIG9yXG4gICAgLy8gbW9yZSBvYmplY3RzLCBzdG9yaW5nIHRoZSByZXN1bHQgaW4gdGhlIGZpcnN0IG9iamVjdC4gVGhlIGZpcnN0IG9iamVjdFxuICAgIC8vIGlzIGdlbmVyYWxseSBlbXB0eSBhcyB3ZSBkb24ndCB3YW50IHRvIGFsdGVyIHRoZSBkZWZhdWx0IG9wdGlvbnMgZm9yXG4gICAgLy8gZnV0dXJlIGluc3RhbmNlcyBvZiB0aGUgcGx1Z2luXG4gICAgdGhpcy5vcHRpb25zID0gJC5leHRlbmQoIHt9LCBkZWZhdWx0cywgb3B0aW9ucyApO1xuXG4gICAgdGhpcy5fZGVmYXVsdHMgPSBkZWZhdWx0cztcbiAgICB0aGlzLl9uYW1lID0gcGx1Z2luTmFtZTtcblxuICAgIHRoaXMuaW5pdCgpO1xuICB9IC8vIGVuZCBjb25zdHJ1Y3RvclxuXG4gIFBsdWdpbi5wcm90b3R5cGUgPSB7XG5cbiAgICBpbml0OiBmdW5jdGlvbihyZXNldCwgYW1vdW50KSB7XG5cbiAgICAgIC8vIFBsYWNlIGluaXRpYWxpemF0aW9uIGxvZ2ljIGhlcmVcbiAgICAgIC8vIFlvdSBhbHJlYWR5IGhhdmUgYWNjZXNzIHRvIHRoZSBET00gZWxlbWVudCBhbmRcbiAgICAgIC8vIHRoZSBvcHRpb25zIHZpYSB0aGUgaW5zdGFuY2UsIGUuZy4gdGhpcy5lbGVtZW50XG4gICAgICAvLyBhbmQgdGhpcy5vcHRpb25zXG4gICAgICAvLyB5b3UgY2FuIGFkZCBtb3JlIGZ1bmN0aW9ucyBsaWtlIHRoZSBvbmUgYmVsb3cgYW5kXG4gICAgICAvLyBjYWxsIHRoZW0gbGlrZSBzbzogdGhpcy55b3VyT3RoZXJGdW5jdGlvbih0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucykuXG5cbiAgICAgIC8vIG1vZGlmeSBvcHRpb25zIGFzIG5lZWRlZFxuICAgICAgLy92YXIgdGhpcy5vcHRpb25zLmFtb3VudCA9ICcnO1xuICAgICAgaWYgKHJlc2V0ICE9PSB0cnVlKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5hbW91bnQgPSBwYXJzZUZsb2F0KCQodGhpcy5vcHRpb25zLmxldmVsX2Ftb3VudF9zZWxlY3RvciwgdGhpcy5lbGVtZW50KS50ZXh0KCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLmFtb3VudCA9IGFtb3VudDtcbiAgICAgIH1cbiAgICAgIHRoaXMub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQgPSBwYXJzZUludCgkKHRoaXMub3B0aW9ucy5vcmlnaW5hbF9hbW91bnRfc2VsZWN0b3IsIHRoaXMuZWxlbWVudCkudmFsKCksIDEwKTtcbiAgICAgIHRoaXMub3B0aW9ucy5mcmVxdWVuY3kgPSBwYXJzZUZsb2F0KCQodGhpcy5vcHRpb25zLmZyZXF1ZW5jeV9zZWxlY3RvciwgdGhpcy5lbGVtZW50KS5hdHRyKCdkYXRhLXllYXItZnJlcScpKTtcbiAgICAgIHZhciByZWN1cnJpbmcgPSAkKHRoaXMub3B0aW9ucy5yZWN1cnJpbmdfc2VsZWN0b3IsIHRoaXMuZWxlbWVudCkudmFsKCk7XG4gICAgICBpZiAodHlwZW9mIHJlY3VycmluZyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLnJlY3VycmluZyA9IHJlY3VycmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHJlY3VycmluZy5zbGljZSgxKTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgdGhpcy5vcHRpb25zLnByb2Nlc3NpbmdfZmVlID0gKE1hdGgucm91bmQocGFyc2VGbG9hdCh0aGlzLm9wdGlvbnMuZmVlX2Ftb3VudCkqTWF0aC5wb3coMTAsMikpL01hdGgucG93KDEwLDIpKS50b0ZpeGVkKDIpO1xuICAgICAgdGhpcy5vcHRpb25zLnByb2Nlc3NpbmdfZmVlX3RleHQgPSB0aGlzLm9wdGlvbnMucHJvY2Vzc2luZ19mZWU7XG4gICAgICBcbiAgICAgIHRoaXMub3B0aW9ucy5jYXJkVHlwZSA9IG51bGw7XG4gICAgICB0aGlzLm9wdGlvbnMuY3JlYXRlX2FjY291bnQgPSBmYWxzZTtcblxuICAgICAgdmFyIGJ1dHRvbl90ZXh0ID0gJCgnYnV0dG9uLmdpdmUsIGlucHV0LmdpdmUnKS50ZXh0KCk7XG4gICAgICB0aGlzLm9wdGlvbnMuYnV0dG9uX3RleHQgPSBidXR0b25fdGV4dDtcblxuICAgICAgdGhpcy5zdHJpcGUgPSBTdHJpcGUodGhpcy5vcHRpb25zLnN0cmlwZV9wdWJsaXNoYWJsZV9rZXkpO1xuICAgICAgdGhpcy5lbGVtZW50cyA9IHRoaXMuc3RyaXBlLmVsZW1lbnRzKCk7XG5cbiAgICAgIC8vIHVzZSBhIHJlZmVycmVyIGZvciBlZGl0IGxpbmsgaWYgd2UgaGF2ZSBvbmVcbiAgICAgIGlmIChkb2N1bWVudC5yZWZlcnJlciAhPT0gJycpIHtcbiAgICAgICAgJCgnI2VkaXRfdXJsJykucHJvcCgnaHJlZicsIGRvY3VtZW50LnJlZmVycmVyKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5kZWJ1ZyA9PT0gdHJ1ZSkge1xuICAgICAgICB0aGlzLmRlYnVnKHRoaXMub3B0aW9ucyk7XG4gICAgICAgIC8vIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gdGFiIHN0dWZmXG4gICAgICB2YXIgcXVlcnlfcGFuZWwgPSB0aGlzLnFzW3RoaXMub3B0aW9ucy5xdWVyeV07XG4gICAgICBpZiAodHlwZW9mIHF1ZXJ5X3BhbmVsID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBxdWVyeV9wYW5lbCA9IHRoaXMub3B0aW9ucy5hY3RpdmU7XG4gICAgICB9XG5cbiAgICAgIC8vIGNhbGwgZnVuY3Rpb25zXG5cbiAgICAgIHRoaXMudGFiTmF2aWdhdGlvbihxdWVyeV9wYW5lbCk7IC8vIG5hdmlnYXRpbmdcblxuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLnBheV9jY19wcm9jZXNzaW5nX3NlbGVjdG9yKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuY3JlZGl0Q2FyZFByb2Nlc3NpbmdGZWVzKHRoaXMub3B0aW9ucywgcmVzZXQpOyAvLyBwcm9jZXNzaW5nIGZlZXNcbiAgICAgIH1cbiAgICAgIFxuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmRvbmF0ZV9zdGVwX3NlbGVjdG9yKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5sZXZlbCA9IHRoaXMuY2hlY2tMZXZlbCh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucywgJ25hbWUnKTsgLy8gY2hlY2sgd2hhdCBsZXZlbCBpdCBpc1xuICAgICAgICB0aGlzLm9wdGlvbnMubGV2ZWxudW0gPSB0aGlzLmNoZWNrTGV2ZWwodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMsICdudW0nKTsgLy8gY2hlY2sgd2hhdCBsZXZlbCBpdCBpcyBhcyBhIG51bWJlclxuICAgICAgICB0aGlzLmRvbmF0ZUFub255bW91c2x5KHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gYW5vbnltb3VzXG4gICAgICAgIHRoaXMuaG9ub3JPck1lbW9yeVRvZ2dsZSh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIGluIGhvbm9yIG9yIGluIG1lbW9yeSBvZiBzb21lb25lXG4gICAgICAgIHRoaXMub3V0c2lkZVVuaXRlZFN0YXRlcyh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIG91dHNpZGUgVVNcbiAgICAgICAgdGhpcy5zaGlwcGluZ0FkZHJlc3ModGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBzaGlwcGluZyBhZGRyZXNzXG4gICAgICAgIHRoaXMuYWxsb3dNaW5ucG9zdEFjY291bnQodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMsIGZhbHNlKTsgLy8gb3B0aW9uIGZvciBjcmVhdGluZyBtaW5ucG9zdCBhY2NvdW50XG4gICAgICAgIHRoaXMuY2hvb3NlUGF5bWVudE1ldGhvZCh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIHN3aXRjaCBiZXR3ZWVuIGNhcmQgYW5kIGFjaFxuICAgICAgICB0aGlzLmNyZWRpdENhcmRGaWVsZHModGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBkbyBzdHVmZiB3aXRoIHRoZSBjcmVkaXQgY2FyZCBmaWVsZHNcbiAgICAgICAgdGhpcy5hY2hGaWVsZHModGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBkbyBzdHVmZiBmb3IgYWNoIHBheW1lbnRzLCBpZiBhcHBsaWNhYmxlIHRvIHRoZSBmb3JtXG4gICAgICAgIHRoaXMudmFsaWRhdGVBbmRTdWJtaXQodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyB2YWxpZGF0ZSBhbmQgc3VibWl0IHRoZSBmb3JtXG4gICAgICB9XG5cbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5jYWxjdWxhdGVkX2Ftb3VudF9zZWxlY3RvcikubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLmNhbGN1bGF0ZUFtb3VudCh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucywgJycpOyAvL1xuICAgICAgfSAvLyBjYWxjdWxhdGUgYW1vdW50IGJhc2VkIG9uIHF1YW50aXR5XG5cbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5jb25maXJtX3N0ZXBfc2VsZWN0b3IpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5zaG93TmV3c2xldHRlclNldHRpbmdzKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTtcbiAgICAgICAgdGhpcy5jb25maXJtTWVzc2FnZVN1Ym1pdCh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIHN1Ym1pdCB0aGUgc3R1ZmYgb24gdGhlIGNvbmZpcm1hdGlvbiBwYWdlXG4gICAgICB9XG5cbiAgICB9LCAvLyBpbml0XG5cbiAgICBxczogKGZ1bmN0aW9uKGEpIHtcbiAgICAgIGlmIChhID09PSAnJykge1xuICAgICAgICByZXR1cm4ge307XG4gICAgICB9XG4gICAgICB2YXIgYiA9IHt9O1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBwPWFbaV0uc3BsaXQoJz0nLCAyKTtcbiAgICAgICAgaWYgKHAubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgYltwWzBdXSA9ICcnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJbcFswXV0gPSBkZWNvZGVVUklDb21wb25lbnQocFsxXS5yZXBsYWNlKC9cXCsvZywgJyAnKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBiO1xuICAgIH0pKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3Vic3RyKDEpLnNwbGl0KCcmJykpLFxuXG4gICAgZGVidWc6IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuZGVidWcgPT09IHRydWUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZGlyKG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUuZGlyKHRoaXMpO1xuICAgICAgfVxuICAgIH0sIC8vIGRlYnVnXG5cbiAgICBnZXRRdWVyeVN0cmluZ3M6IGZ1bmN0aW9uKGxpbmspIHtcbiAgICAgIGlmICh0eXBlb2YgbGluayA9PT0gJ3VuZGVmaW5lZCcgfHwgbGluayA9PT0gJycpIHtcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGluayA9ICc/JyArIGxpbmsuc3BsaXQoJz8nKVsxXTtcbiAgICAgICAgbGluayA9IGxpbmsuc3Vic3RyKDEpLnNwbGl0KCcmJyk7XG4gICAgICB9XG4gICAgICB2YXIgYiA9IHt9O1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaW5rLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBwPWxpbmtbaV0uc3BsaXQoJz0nLCAyKTtcbiAgICAgICAgaWYgKHAubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgYltwWzBdXSA9ICcnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJbcFswXV0gPSBkZWNvZGVVUklDb21wb25lbnQocFsxXS5yZXBsYWNlKC9cXCsvZywgJyAnKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBiO1xuICAgIH0sIC8vIGdldFF1ZXJ5U3RyaW5nc1xuXG4gICAgdGFiTmF2aWdhdGlvbjogZnVuY3Rpb24oYWN0aXZlKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB2YXIgdGl0bGUgPSAnTWlublBvc3QgfCBTdXBwb3J0IFVzIHwgJztcbiAgICAgIHZhciBwYWdlID0gJCgnLnByb2dyZXNzLS1kb25hdGlvbiBsaS4nICsgYWN0aXZlKS50ZXh0KCk7XG4gICAgICB2YXIgbmV4dCA9ICQoJy5wcm9ncmVzcy0tZG9uYXRpb24gbGkuJyArIGFjdGl2ZSkubmV4dCgpLnRleHQoKTtcbiAgICAgIHZhciBzdGVwID0gJCgnLnByb2dyZXNzLS1kb25hdGlvbiBsaS4nICsgYWN0aXZlKS5pbmRleCgpICsgMTtcbiAgICAgIHZhciBuYXZfaXRlbV9jb3VudCA9ICQoJy5wcm9ncmVzcy0tZG9uYXRpb24gbGknKS5sZW5ndGg7XG4gICAgICB2YXIgb3BwX2lkID0gJCh0aGlzLm9wdGlvbnMub3BwX2lkX3NlbGVjdG9yKS52YWwoKTtcbiAgICAgIHZhciBuZXh0X3N0ZXAgPSBzdGVwICsgMTtcbiAgICAgIHZhciBwb3N0X3B1cmNoYXNlID0gZmFsc2U7XG5cbiAgICAgIC8vIHdlIHdpbGwgaGF2ZSB0byB1cGRhdGUgdGhpcyBiZWNhdXNlIG5vIG1vcmUgZmxhc2sgaWRcblxuICAgICAgdGhpcy5kZWJ1ZyggJ3N0ZXAgaXMgJyArIHN0ZXAgKyAnIGFuZCBuYXYgaXRlbSBjb3VudCBpcyAnICsgbmF2X2l0ZW1fY291bnQgKyAnIGFuZCBvcHAgaWQgaXMgJyArIG9wcF9pZCArICcgYW5kIG5leHQgc3RlcCBpcyAnICsgbmV4dF9zdGVwICk7XG5cbiAgICAgIC8vIHRoaXMgaXMgdGhlIGxhc3QgdmlzaWJsZSBzdGVwXG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuY29uZmlybV9zdGVwX3NlbGVjdG9yKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGFjdGl2ZSA9IHRoaXMub3B0aW9ucy5jb25maXJtO1xuICAgICAgICAkKCcucHJvZ3Jlc3MtLWRvbmF0aW9uIGxpLicgKyBhY3RpdmUgKyAnIHNwYW4nKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIHN0ZXAgPSAkKCcucHJvZ3Jlc3MtLWRvbmF0aW9uIGxpLicgKyBhY3RpdmUpLmluZGV4KCkgKyAxO1xuICAgICAgICAvLyB0aGVyZSBpcyBhIGNvbnRpbnVhdGlvbiBvZiB0aGUgbWFpbiBmb3JtIG9uIHRoaXMgcGFnZS4gdGhlcmUgaXMgYSBidXR0b24gdG8gY2xpY2tcbiAgICAgICAgLy8gdGhpcyBtZWFucyB0aGVyZSBpcyBhbm90aGVyIHN0ZXBcbiAgICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmNvbmZpcm1fYnV0dG9uX3NlbGVjdG9yKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgbmF2X2l0ZW1fY291bnQgKz0gMTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3RlcCA9PT0gbmF2X2l0ZW1fY291bnQgLSAxICYmICQodGhpcy5vcHRpb25zLm9wcF9pZF9zZWxlY3RvcikubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLmRlYnVnKCd0aGlzIGlzIGEgcGF5bWVudCBzdGVwIGJ1dCB0aGVyZSBpcyBhIHN0ZXAgYWZ0ZXIgaXQnKTtcbiAgICAgICAgc3RlcCA9ICdwdXJjaGFzZSc7XG4gICAgICB9IGVsc2UgaWYgKHN0ZXAgPT09IG5hdl9pdGVtX2NvdW50ICYmICQodGhpcy5vcHRpb25zLm9wcF9pZF9zZWxlY3RvcikubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLmRlYnVnKCd0aGlzIGlzIGEgcGF5bWVudCBzdGVwIGFuZCB0aGVyZSBpcyBubyBzdGVwIGFmdGVyIGl0Jyk7XG4gICAgICAgIHN0ZXAgPSAncHVyY2hhc2UnO1xuICAgICAgfSBlbHNlIGlmIChzdGVwID09PSBuYXZfaXRlbV9jb3VudCAmJiAkKHRoaXMub3B0aW9ucy5vcHBfaWRfc2VsZWN0b3IpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aGlzLmRlYnVnKCd0aGlzIGlzIGEgcG9zdC1maW5pc2ggc3RlcC4gaXQgZG9lcyBub3QgaGF2ZSBhbiBpZCcpO1xuICAgICAgICBzdGVwID0gc3RlcCArIDE7XG4gICAgICAgIHBvc3RfcHVyY2hhc2UgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBkb2N1bWVudC50aXRsZSA9IHRpdGxlICsgcGFnZTtcbiAgICAgIHRoaXMuYW5hbHl0aWNzVHJhY2tpbmdTdGVwKHN0ZXAsIHRpdGxlLCBwb3N0X3B1cmNoYXNlKTtcblxuICAgICAgLy8gYWN0aXZhdGUgdGhlIG5hdiB0YWJzXG4gICAgICBpZiAoJCgnLnByb2dyZXNzLS1kb25hdGlvbiBsaSAuYWN0aXZlJykubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICQoJyMnICsgYWN0aXZlKS5zaG93KCk7XG4gICAgICAgICQoJy5wcm9ncmVzcy0tZG9uYXRpb24gbGkuJyArIGFjdGl2ZSArICcgYScpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFjdGl2ZSA9ICQoJy5wcm9ncmVzcy0tZG9uYXRpb24gbGkgLmFjdGl2ZScpLnBhcmVudCgpLnByb3AoJ2NsYXNzJyk7XG4gICAgICAgICQoJyMnICsgYWN0aXZlKS5zaG93KCk7XG4gICAgICB9XG5cbiAgICB9LCAvLyB0YWJOYXZpZ2F0aW9uXG5cbiAgICBhbmFseXRpY3NUcmFja2luZ1N0ZXA6IGZ1bmN0aW9uKHN0ZXAsIHRpdGxlLCBwb3N0X3B1cmNoYXNlKSB7XG4gICAgICB2YXIgbGV2ZWwgPSB0aGlzLmNoZWNrTGV2ZWwodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMsICduYW1lJyk7IC8vIGNoZWNrIHdoYXQgbGV2ZWwgaXQgaXNcbiAgICAgIHZhciBsZXZlbG51bSA9IHRoaXMuY2hlY2tMZXZlbCh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucywgJ251bScpOyAvLyBjaGVjayB3aGF0IGxldmVsIGl0IGlzIGFzIGEgbnVtYmVyXG4gICAgICB2YXIgYW1vdW50ID0gJCh0aGlzLm9wdGlvbnMub3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yKS52YWwoKTtcbiAgICAgIHZhciByZWN1cnJpbmcgPSB0aGlzLm9wdGlvbnMucmVjdXJyaW5nO1xuICAgICAgdmFyIG9wcF9pZCA9ICQodGhpcy5vcHRpb25zLm9wcF9pZF9zZWxlY3RvcikudmFsKCk7XG5cbiAgICAgIC8vIGlmIHdlJ3JlIG5vdCBhZnRlciB0aGUgcHVyY2hhc2UsIHVzZSBhZGRQcm9kdWN0XG4gICAgICBpZiAoIHBvc3RfcHVyY2hhc2UgIT09IHRydWUgKSB7XG4gICAgICAgIGdhKCdlYzphZGRQcm9kdWN0Jywge1xuICAgICAgICAgICdpZCc6ICdtaW5ucG9zdF8nICsgbGV2ZWwudG9Mb3dlckNhc2UoKSArICdfbWVtYmVyc2hpcCcsXG4gICAgICAgICAgJ25hbWUnOiAnTWlublBvc3QgJyArIGxldmVsLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgbGV2ZWwuc2xpY2UoMSkgKyAnIE1lbWJlcnNoaXAnLFxuICAgICAgICAgICdjYXRlZ29yeSc6ICdEb25hdGlvbicsXG4gICAgICAgICAgJ2JyYW5kJzogJ01pbm5Qb3N0JyxcbiAgICAgICAgICAndmFyaWFudCc6ICByZWN1cnJpbmcsXG4gICAgICAgICAgJ3ByaWNlJzogYW1vdW50LFxuICAgICAgICAgICdxdWFudGl0eSc6IDFcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGVwID09PSAncHVyY2hhc2UnKSB7XG4gICAgICAgIHRoaXMuZGVidWcoJ2FkZCBhIHB1cmNoYXNlIGFjdGlvbi4gc3RlcCBpcyAnICsgc3RlcCk7XG4gICAgICAgIGdhKCdlYzpzZXRBY3Rpb24nLCBzdGVwLHtcbiAgICAgICAgICAnaWQnOiBvcHBfaWQsIC8vIFRyYW5zYWN0aW9uIGlkIC0gVHlwZTogc3RyaW5nXG4gICAgICAgICAgJ2FmZmlsaWF0aW9uJzogJ01pbm5Qb3N0JywgLy8gU3RvcmUgbmFtZSAtIFR5cGU6IHN0cmluZ1xuICAgICAgICAgICdyZXZlbnVlJzogYW1vdW50LCAvLyBUb3RhbCBSZXZlbnVlIC0gVHlwZTogbnVtZXJpY1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZGVidWcoJ2FkZCBhIGNoZWNrb3V0IGFjdGlvbi4gc3RlcCBpcyAnICsgc3RlcCk7XG4gICAgICAgIGdhKCdlYzpzZXRBY3Rpb24nLCdjaGVja291dCcsIHtcbiAgICAgICAgICAnc3RlcCc6IHN0ZXAsICAgICAgICAgICAgLy8gQSB2YWx1ZSBvZiAxIGluZGljYXRlcyBmaXJzdCBjaGVja291dCBzdGVwLlZhbHVlIG9mIDIgaW5kaWNhdGVzIHNlY29uZCBjaGVja291dCBzdGVwXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBnYSgnc2V0Jywge1xuICAgICAgICBwYWdlOiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUsXG4gICAgICAgIHRpdGxlOiB0aXRsZVxuICAgICAgfSk7XG4gICAgICBnYSgnc2VuZCcsICdwYWdldmlldycsIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSk7XG5cbiAgICB9LCAvLyBhbmFseXRpY3NUcmFja2luZ1N0ZXBcblxuICAgIGNhbGN1bGF0ZUZlZXM6IGZ1bmN0aW9uKGFtb3VudCwgcGF5bWVudF90eXBlKSB7XG4gICAgICAvLyB0aGlzIHNlbmRzIHRoZSBhbW91bnQgYW5kIHBheW1lbnQgdHlwZSB0byBweXRob247IGdldCB0aGUgZmVlIGFuZCBkaXNwbGF5IGl0IHRvIHRoZSB1c2VyIG9uIHRoZSBjaGVja2JveCBsYWJlbFxuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIGFtb3VudDogYW1vdW50LFxuICAgICAgICBwYXltZW50X3R5cGU6IHBheW1lbnRfdHlwZVxuICAgICAgfTtcbiAgICAgICQuYWpheCh7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICB1cmw6ICcvY2FsY3VsYXRlLWZlZXMvJyxcbiAgICAgICAgZGF0YTogZGF0YVxuICAgICAgfSkuZG9uZShmdW5jdGlvbiggZGF0YSApIHtcbiAgICAgICAgaWYgKCQoZGF0YS5mZWVzKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgJCh0aGF0Lm9wdGlvbnMuZmVlX2Ftb3VudCkudGV4dChwYXJzZUZsb2F0KGRhdGEuZmVlcykudG9GaXhlZCgyKSk7XG4gICAgICAgICAgdGhhdC5jcmVkaXRDYXJkRmVlQ2hlY2tib3goJCh0aGF0Lm9wdGlvbnMucGF5X2NjX3Byb2Nlc3Npbmdfc2VsZWN0b3IpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSwgLy8gY2FsY3VsYXRlRmVlc1xuXG4gICAgY3JlZGl0Q2FyZFByb2Nlc3NpbmdGZWVzOiBmdW5jdGlvbihvcHRpb25zLCByZXNldCkge1xuICAgICAgLy8gdGhpcyBhZGRzIG9yIHN1YnRyYWN0cyB0aGUgZmVlIHRvIHRoZSBvcmlnaW5hbCBhbW91bnQgd2hlbiB0aGUgdXNlciBpbmRpY2F0ZXMgdGhleSBkbyBvciBkbyBub3Qgd2FudCB0byBwYXkgdGhlIGZlZXNcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHRoYXQuY3JlZGl0Q2FyZEZlZUNoZWNrYm94KCQodGhpcy5vcHRpb25zLnBheV9jY19wcm9jZXNzaW5nX3NlbGVjdG9yKSk7XG4gICAgICAkKHRoaXMub3B0aW9ucy5wYXlfY2NfcHJvY2Vzc2luZ19zZWxlY3Rvcikub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB0aGF0LmNyZWRpdENhcmRGZWVDaGVja2JveCh0aGlzKTtcbiAgICAgIH0pO1xuICAgIH0sIC8vIGNyZWRpdENhcmRQcm9jZXNzaW5nRmVlc1xuXG4gICAgY3JlZGl0Q2FyZEZlZUNoZWNrYm94OiBmdW5jdGlvbihmaWVsZCkge1xuICAgICAgdmFyIGZ1bGxfYW1vdW50O1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgaWYgKCQoZmllbGQpLmlzKCc6Y2hlY2tlZCcpIHx8ICQoZmllbGQpLnByb3AoJ2NoZWNrZWQnKSkge1xuICAgICAgICAkKCcuYW1vdW50IC5sZXZlbC1hbW91bnQnKS5hZGRDbGFzcygnZnVsbC1hbW91bnQnKTtcbiAgICAgICAgZnVsbF9hbW91bnQgPSAodGhhdC5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCArIHBhcnNlRmxvYXQoJCh0aGF0Lm9wdGlvbnMuZmVlX2Ftb3VudCkudGV4dCgpKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmdWxsX2Ftb3VudCA9IHRoYXQub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQ7XG4gICAgICB9XG4gICAgICAkKHRoYXQub3B0aW9ucy5mdWxsX2Ftb3VudF9zZWxlY3RvcikudGV4dChwYXJzZUZsb2F0KGZ1bGxfYW1vdW50KS50b0ZpeGVkKDIpKTtcbiAgICB9LCAvLyBjcmVkaXRDYXJkRmVlQ2hlY2tib3hcblxuICAgIGRvbmF0ZUFub255bW91c2x5OiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICBpZiAoJChvcHRpb25zLmFub255bW91c19zZWxlY3RvciwgZWxlbWVudCkuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgJChvcHRpb25zLm5hbWVfc2VsZWN0b3IgKyAnIGRpdjpmaXJzdCcsIGVsZW1lbnQpLmhpZGUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQob3B0aW9ucy5uYW1lX3NlbGVjdG9yICsgJyBkaXY6Zmlyc3QnLCBlbGVtZW50KS5zaG93KCk7XG4gICAgICB9XG5cbiAgICAgICQob3B0aW9ucy5hbm9ueW1vdXNfc2VsZWN0b3IsIGVsZW1lbnQpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCQodGhpcykuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgICAkKG9wdGlvbnMubmFtZV9zZWxlY3RvciArICcgZGl2OmZpcnN0JywgZWxlbWVudCkuaGlkZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICQob3B0aW9ucy5uYW1lX3NlbGVjdG9yICsgJyBkaXY6Zmlyc3QnLCBlbGVtZW50KS5zaG93KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sIC8vIGRvbmF0ZUFub255bW91c2x5XG5cbiAgICBjaGVja0xldmVsOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zLCByZXR1cm52YWx1ZSkge1xuICAgICAgdmFyIGxldmVsID0gJyc7XG4gICAgICB2YXIgbGV2ZWxudW0gPSAwO1xuICAgICAgdmFyIGxldmVsY2xhc3MgPSAnbGV2ZWwgbGV2ZWwtLSc7XG4gICAgICB2YXIgYW1vdW50X3llYXJseTtcbiAgICAgIHZhciBmcmVxdWVuY3kgPSBvcHRpb25zLmZyZXF1ZW5jeTtcbiAgICAgIHZhciBhbW91bnQgPSBvcHRpb25zLm9yaWdpbmFsX2Ftb3VudDtcblxuICAgICAgaWYgKGZyZXF1ZW5jeSA9PT0gMTIpIHtcbiAgICAgICAgYW1vdW50X3llYXJseSA9IGFtb3VudCAqIGZyZXF1ZW5jeTtcbiAgICAgIH0gZWxzZSBpZiAoZnJlcXVlbmN5ID09PSAxKSB7XG4gICAgICAgIGFtb3VudF95ZWFybHkgPSBhbW91bnQ7XG4gICAgICB9XG4gICAgICBcbiAgICAgICQuZWFjaChvcHRpb25zLmxldmVscywgZnVuY3Rpb24oaW5kZXgsIHZhbHVlKSB7XG4gICAgICAgIHZhciBuYW1lID0gdmFsdWUubmFtZTtcbiAgICAgICAgdmFyIG51bSA9IGluZGV4O1xuICAgICAgICB2YXIgbWF4ID0gdmFsdWUubWF4O1xuICAgICAgICB2YXIgbWluID0gdmFsdWUubWluO1xuICAgICAgICBpZiAodHlwZW9mIG1pbiAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIG1heCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBpZiAoYW1vdW50X3llYXJseSA+PSBtaW4gJiYgYW1vdW50X3llYXJseSA8IG1heCkge1xuICAgICAgICAgICAgbGV2ZWwgPSBuYW1lO1xuICAgICAgICAgICAgbGV2ZWxudW0gPSBudW07XG4gICAgICAgICAgICBsZXZlbGNsYXNzICs9IG51bTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG1heCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBpZiAoYW1vdW50X3llYXJseSA8IG1heCkge1xuICAgICAgICAgICAgbGV2ZWwgPSBuYW1lO1xuICAgICAgICAgICAgbGV2ZWxudW0gPSBudW07XG4gICAgICAgICAgICBsZXZlbGNsYXNzICs9IG51bTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG1pbiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBpZiAoYW1vdW50X3llYXJseSA+PSBtaW4pIHtcbiAgICAgICAgICAgIGxldmVsID0gbmFtZTtcbiAgICAgICAgICAgIGxldmVsbnVtID0gbnVtO1xuICAgICAgICAgICAgbGV2ZWxjbGFzcyArPSBudW07XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmIChyZXR1cm52YWx1ZSA9PT0gJ25hbWUnKSB7XG4gICAgICAgIHJldHVybiBsZXZlbDtcbiAgICAgIH0gZWxzZSBpZiAocmV0dXJudmFsdWUgPT09ICdudW0nKSB7XG4gICAgICAgIHJldHVybiBsZXZlbG51bTsgIFxuICAgICAgfVxuICAgIH0sIC8vIGNoZWNrTGV2ZWxcblxuICAgIGhvbm9yT3JNZW1vcnk6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIGlmICgkKG9wdGlvbnMuaG9ub3Jfb3JfbWVtb3J5X2Nob29zZXIgKyAnOmNoZWNrZWQnKS52YWwoKSkge1xuICAgICAgICAkKG9wdGlvbnMuaG9ub3JfbWVtb3J5X2lucHV0X2dyb3VwLCBlbGVtZW50KS5zaG93KCk7XG4gICAgICAgICQob3B0aW9ucy5ob25vcl90eXBlX3NlbGVjdG9yKS50ZXh0KCQob3B0aW9ucy5ob25vcl9vcl9tZW1vcnlfY2hvb3NlciArICc6Y2hlY2tlZCcpLnZhbCgpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQob3B0aW9ucy5ob25vcl9tZW1vcnlfaW5wdXRfZ3JvdXAsIGVsZW1lbnQpLmhpZGUoKTtcbiAgICAgICAgJChvcHRpb25zLmhvbm9yX25hbWVfc2VsZWN0b3IgKyAnIGlucHV0JywgZWxlbWVudCkudmFsKCcnKTtcbiAgICAgIH1cbiAgICB9LCAvLyBob25vck9yTWVtb3J5XG5cbiAgICBob25vck9yTWVtb3J5VG9nZ2xlOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB0aGF0Lmhvbm9yT3JNZW1vcnkodGhhdC5lbGVtZW50LCB0aGF0Lm9wdGlvbnMpO1xuICAgICAgJChvcHRpb25zLmhvbm9yX29yX21lbW9yeV9jaG9vc2VyLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoYXQuaG9ub3JPck1lbW9yeSh0aGF0LmVsZW1lbnQsIHRoYXQub3B0aW9ucyk7XG4gICAgICB9KTtcbiAgICB9LCAvLyBob25vck9yTWVtb3J5VG9nZ2xlXG5cbiAgICBvdXRzaWRlVW5pdGVkU3RhdGVzOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICAkKG9wdGlvbnMuc2hvd19iaWxsaW5nX2NvdW50cnlfc2VsZWN0b3IpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAkKG9wdGlvbnMuYmlsbGluZ19jb3VudHJ5X3NlbGVjdG9yKS5zaG93KCk7XG4gICAgICAgICQodGhpcykucGFyZW50KCkuaGlkZSgpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KTtcbiAgICAgICQob3B0aW9ucy5zaG93X3NoaXBwaW5nX2NvdW50cnlfc2VsZWN0b3IpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAkKG9wdGlvbnMuc2hpcHBpbmdfY291bnRyeV9zZWxlY3Rvcikuc2hvdygpO1xuICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmhpZGUoKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSk7XG4gICAgfSwgLy8gb3V0c2lkZVVuaXRlZFN0YXRlc1xuXG4gICAgc2hpcHBpbmdBZGRyZXNzOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB2YXIgc2hvd19zaGlwcGluZyA9IGZhbHNlO1xuICAgICAgaWYgKCQob3B0aW9ucy51c2VfZm9yX3NoaXBwaW5nX3NlbGVjdG9yKS5sZW5ndGggPiAwKSB7IC8vIHdlIGhhdmUgYSBzaGlwcGluZyBjaGVja2JveFxuICAgICAgICBzaG93X3NoaXBwaW5nID0gdHJ1ZTtcbiAgICAgIH1cbi8vICAgICAgc2hvd19zaGlwcGluZyA9ICEhJChvcHRpb25zLnVzZV9mb3Jfc2hpcHBpbmdfc2VsZWN0b3IgKyAnOmNoZWNrZWQnLCBlbGVtZW50KS5sZW5ndGg7XG4vLyAgICAgIC8vdGhpcy5kZWJ1Zygnc2hvdyBpcyB0aGVyZScpO1xuXG4vKiAgICAgICQob3B0aW9ucy51c2VfZm9yX3NoaXBwaW5nX3NlbGVjdG9yLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoYXQuc2hpcHBpbmdBZGRyZXNzKGVsZW1lbnQsIG9wdGlvbnMpO1xuICAgICAgICAvL3RoaXMuZGVidWcoJ2NoYW5nZSBpdCcpO1xuICAgICAgfSk7XG4qL1xuICAgICAgaWYgKHNob3dfc2hpcHBpbmcgPT09IHRydWUgKSB7XG4gICAgICAgICQob3B0aW9ucy51c2VfZm9yX3NoaXBwaW5nX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKS5zaG93KCk7XG4gICAgICAgIGlmICgkKG9wdGlvbnMudXNlX2Zvcl9zaGlwcGluZ19zZWxlY3RvciwgZWxlbWVudCkuaXMoJzpjaGVja2VkJykpIHsgLy8gdXNlIHNhbWUgYXMgYmlsbGluZ1xuICAgICAgICAgICQob3B0aW9ucy5zaGlwcGluZ19zZWxlY3RvcikuaGlkZSgpO1xuICAgICAgICB9IGVsc2UgeyAvLyBzZXBhcmF0ZSBzaGlwcGluZyBhbmQgYmlsbGluZ1xuICAgICAgICAgICQob3B0aW9ucy5zaGlwcGluZ19zZWxlY3Rvcikuc2hvdygpO1xuICAgICAgICB9XG4gICAgICAgICQob3B0aW9ucy51c2VfZm9yX3NoaXBwaW5nX3NlbGVjdG9yLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdGhhdC5zaGlwcGluZ0FkZHJlc3MoZWxlbWVudCwgb3B0aW9ucyk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgXG4gICAgfSwgLy8gc2hpcHBpbmdBZGRyZXNzXG5cbiAgICBhbGxvd01pbm5wb3N0QWNjb3VudDogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucywgY2hhbmdlZCkge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdmFyIGFjY291bnRfZXhpc3RzID0gZmFsc2U7XG5cbiAgICAgIGZ1bmN0aW9uIGRvbmVUeXBpbmcgKCkge1xuICAgICAgICB2YXIgZW1haWwgPSAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpO1xuICAgICAgICBhY2NvdW50X2V4aXN0cyA9IHRoYXQuY2hlY2tNaW5ucG9zdEFjY291bnRFeGlzdHMoZWxlbWVudCwgb3B0aW9ucywgZW1haWwpO1xuICAgICAgfVxuXG4gICAgICAvL3NldHVwIGJlZm9yZSBmdW5jdGlvbnNcbiAgICAgIHZhciB0eXBpbmdUaW1lcjsgICAgICAgICAgICAgICAgLy90aW1lciBpZGVudGlmaWVyXG4gICAgICB2YXIgZG9uZVR5cGluZ0ludGVydmFsID0gNTAwMDsgIC8vdGltZSBpbiBtcywgNSBzZWNvbmQgZm9yIGV4YW1wbGVcblxuICAgICAgLy9vbiBrZXl1cCwgc3RhcnQgdGhlIGNvdW50ZG93blxuICAgICAgJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5rZXl1cChmdW5jdGlvbigpe1xuICAgICAgICBjbGVhclRpbWVvdXQodHlwaW5nVGltZXIpO1xuICAgICAgICBpZiAoJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwpIHtcbiAgICAgICAgICB0eXBpbmdUaW1lciA9IHNldFRpbWVvdXQoZG9uZVR5cGluZywgZG9uZVR5cGluZ0ludGVydmFsKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIC8vdXNlciBpcyBcImZpbmlzaGVkIHR5cGluZyxcIiBkbyBzb21ldGhpbmdcblxuICAgICAgaWYgKCQob3B0aW9ucy5jcmVhdGVfbXBfc2VsZWN0b3IsIGVsZW1lbnQpLmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgICQob3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgZWxlbWVudCkuc2hvdygpO1xuICAgICAgICBvcHRpb25zLmNyZWF0ZV9hY2NvdW50ID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQob3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgZWxlbWVudCkuaGlkZSgpO1xuICAgICAgfVxuXG4gICAgICAkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoYXQuYWxsb3dNaW5ucG9zdEFjY291bnQoZWxlbWVudCwgb3B0aW9ucywgdHJ1ZSk7XG4gICAgICB9KTtcblxuICAgICAgaWYgKGNoYW5nZWQgPT09IGZhbHNlKSB7XG4gICAgICAgIC8vIGFsbG93IHVzZXJzIHRvIHNob3cgcGxhaW4gdGV4dCwgb3IgdG8gc2VlIHB3IGNyaXRlcmlhXG4gICAgICAgICQob3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgZWxlbWVudCkuYXBwZW5kKCc8ZGl2IGNsYXNzPVwiaGVscC1saW5rXCI+PHNwYW4+UGFzc3dvcmQgaGVscDwvc3Bhbj48L2Rpdj48ZGl2IGNsYXNzPVwiZm9ybS1oZWxwXCI+UGFzc3dvcmQgbXVzdCBiZSBhdCBsZWFzdCA2IGNoYXJhY3RlcnMuPC9kaXY+PGxhYmVsIGNsYXNzPVwiYWRkaXRpb25hbC1vcHRpb25cIj48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgbmFtZT1cInNob3dwYXNzd29yZFwiIGlkPVwic2hvd3Bhc3N3b3JkXCI+IFNob3cgcGFzc3dvcmQ8L2xhYmVsPicpO1xuICAgICAgICAkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKS5iZWZvcmUoJzxwIGNsYXNzPVwiYWNjb3VudC1leGlzdHMgc3VjY2Vzc1wiPlRoZXJlIGlzIGFscmVhZHkgYSBNaW5uUG9zdC5jb20gYWNjb3VudCB3aXRoIHRoaXMgZW1haWwuPC9wPicpO1xuICAgICAgICAkKCcuYWNjb3VudC1leGlzdHMnKS5oaWRlKCk7XG4gICAgICAgICQoJyNzaG93cGFzc3dvcmQnKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAoJCh0aGlzKS5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICAgICAgJCgnI3Bhc3N3b3JkJykuZ2V0KDApLnR5cGUgPSAndGV4dCc7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoJyNwYXNzd29yZCcpLmdldCgwKS50eXBlID0gJ3Bhc3N3b3JkJztcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5mb3JtLWl0ZW0gLmZvcm0taGVscCcpLmhpZGUoKTtcbiAgICAgIH1cbiAgICAgICQoJy5mb3JtLWl0ZW0tLXdpdGgtaGVscCBsYWJlbCwgLmZvcm0taXRlbS0td2l0aC1oZWxwIGlucHV0JykubmV4dCgnLmhlbHAtbGluaycpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpLm5leHQoJy5mb3JtLWhlbHAnKS50b2dnbGUoKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSk7XG4gICAgfSwgLy8gYWxsb3dNaW5ucG9zdEFjY291bnRcblxuICAgIGRpc3BsYXlBbW91bnQ6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMsIHNpbmdsZV91bml0X3ByaWNlLCBxdWFudGl0eSwgYWRkaXRpb25hbF9hbW91bnQsIHZhbGlkX2NvZGUpIHtcbiAgICAgIHZhciBhbW91bnQgPSBzaW5nbGVfdW5pdF9wcmljZSAqIHBhcnNlSW50KHF1YW50aXR5LCAxMCk7XG4gICAgICBpZiAoYWRkaXRpb25hbF9hbW91bnQgPT09ICcnKSB7XG4gICAgICAgIGFkZGl0aW9uYWxfYW1vdW50ID0gMDtcbiAgICAgICAgJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvcikucGFyZW50KCkuaGlkZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYW1vdW50ICs9IHBhcnNlSW50KGFkZGl0aW9uYWxfYW1vdW50LCAxMCk7XG4gICAgICAgIGxldmVsY2hlY2sgPSB7b3JpZ2luYWxfYW1vdW50OiBhZGRpdGlvbmFsX2Ftb3VudCwgZnJlcXVlbmN5OiAxLCBsZXZlbHM6IG9wdGlvbnMubGV2ZWxzfTtcbiAgICAgICAgbGV2ZWwgPSB0aGlzLmNoZWNrTGV2ZWwoZWxlbWVudCwgbGV2ZWxjaGVjaywgJ251bScpO1xuICAgICAgICBpZiAobGV2ZWwgPj0gMikge1xuICAgICAgICAgICQob3B0aW9ucy5jcmVhdGVfbXBfc2VsZWN0b3IpLnBhcmVudCgpLnNob3coKTtcbiAgICAgICAgfVxuICAgICAgICAkKG9wdGlvbnMuaGFzX2FkZGl0aW9uYWxfdGV4dF9zZWxlY3RvcikuaHRtbCgkKG9wdGlvbnMuaGFzX2FkZGl0aW9uYWxfdGV4dF9zZWxlY3RvcikuZGF0YSgndGV4dCcpKTtcbiAgICAgICAgJChvcHRpb25zLmFkZGl0aW9uYWxfYW1vdW50X3NlbGVjdG9yKS50ZXh0KHBhcnNlRmxvYXQoJChvcHRpb25zLmFkZGl0aW9uYWxfYW1vdW50X2ZpZWxkKS52YWwoKSkpO1xuICAgICAgfVxuXG4gICAgICAkKG9wdGlvbnMuY2FsY3VsYXRlZF9hbW91bnRfc2VsZWN0b3IpLnRleHQoYW1vdW50KTsgLy8gdGhpcyBpcyB0aGUgcHJldmlldyB0ZXh0XG4gICAgICAkKG9wdGlvbnMub3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yKS52YWwocXVhbnRpdHkgKiBzaW5nbGVfdW5pdF9wcmljZSk7IC8vIHRoaXMgaXMgdGhlIGFtb3VudCBmaWVsZFxuICAgICAgJChvcHRpb25zLnF1YW50aXR5X3NlbGVjdG9yKS50ZXh0KHF1YW50aXR5KTsgLy8gZXZlcnl3aGVyZSB0aGVyZSdzIGEgcXVhbnRpdHlcblxuICAgIH0sXG5cbiAgICBjYWxjdWxhdGVBbW91bnQ6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMsIGRhdGEpIHtcbiAgICAgIC8vdGhpcy5kZWJ1Zygnc3RhcnQuIHNldCB2YXJpYWJsZXMgYW5kIHBsYWluIHRleHQsIGFuZCByZW1vdmUgY29kZSByZXN1bHQuJyk7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB2YXIgcXVhbnRpdHkgPSAkKG9wdGlvbnMucXVhbnRpdHlfZmllbGQpLnZhbCgpO1xuXG4gICAgICB2YXIgc2luZ2xlX3VuaXRfcHJpY2UgPSAkKG9wdGlvbnMucXVhbnRpdHlfZmllbGQpLmRhdGEob3B0aW9ucy5zaW5nbGVfdW5pdF9wcmljZV9hdHRyaWJ1dGUpO1xuICAgICAgdmFyIGFkZGl0aW9uYWxfYW1vdW50ID0gJChvcHRpb25zLmFkZGl0aW9uYWxfYW1vdW50X2ZpZWxkKS52YWwoKTtcbiAgICAgIGlmIChkYXRhLnN1Y2Nlc3MgPT09IHRydWUpIHtcbiAgICAgICAgc2luZ2xlX3VuaXRfcHJpY2UgPSBkYXRhLnNpbmdsZV91bml0X3ByaWNlO1xuICAgICAgfVxuICAgICAgdGhhdC5kaXNwbGF5QW1vdW50KGVsZW1lbnQsIG9wdGlvbnMsIHNpbmdsZV91bml0X3ByaWNlLCBxdWFudGl0eSwgYWRkaXRpb25hbF9hbW91bnQsIGRhdGEuc3VjY2Vzcyk7XG5cbiAgICAgICQob3B0aW9ucy5xdWFudGl0eV9maWVsZCArICcsICcgKyBvcHRpb25zLmFkZGl0aW9uYWxfYW1vdW50X2ZpZWxkKS5jaGFuZ2UoZnVuY3Rpb24oKSB7IC8vIHRoZSBxdWFudGl0eSBvciBhZGRpdGlvbmFsIGFtb3VudCBjaGFuZ2VkXG4gICAgICAgIHF1YW50aXR5ID0gJChvcHRpb25zLnF1YW50aXR5X2ZpZWxkKS52YWwoKTtcbiAgICAgICAgYWRkaXRpb25hbF9hbW91bnQgPSAkKG9wdGlvbnMuYWRkaXRpb25hbF9hbW91bnRfZmllbGQpLnZhbCgpO1xuICAgICAgICBpZiAocXVhbnRpdHkgIT0gMSkge1xuICAgICAgICAgICQob3B0aW9ucy5pdGVtX3NlbGVjdG9yKS50ZXh0KCQob3B0aW9ucy5pdGVtX3NlbGVjdG9yKS5kYXRhKCdwbHVyYWwnKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJChvcHRpb25zLml0ZW1fc2VsZWN0b3IpLnRleHQoJChvcHRpb25zLml0ZW1fc2VsZWN0b3IpLmRhdGEoJ3NpbmdsZScpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoYXQuZGlzcGxheUFtb3VudChlbGVtZW50LCBvcHRpb25zLCBzaW5nbGVfdW5pdF9wcmljZSwgcXVhbnRpdHksIGFkZGl0aW9uYWxfYW1vdW50KTtcbiAgICAgICAgXG4gICAgICB9KTtcblxuICAgIH0sIC8vIGNhbGN1bGF0ZUFtb3VudFxuXG4gICAgY2hlY2tNaW5ucG9zdEFjY291bnRFeGlzdHM6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMsIGVtYWlsKSB7ICAgICBcbiAgICAgIHZhciB1c2VyID0ge1xuICAgICAgICBlbWFpbDogZW1haWxcbiAgICAgIH07XG4gICAgICAkLmFqYXgoe1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICB1cmw6IG9wdGlvbnMubWlubnBvc3Rfcm9vdCArICcvd3AtanNvbi91c2VyLWFjY291bnQtbWFuYWdlbWVudC92MS9jaGVjay1hY2NvdW50LWV4aXN0cycsXG4gICAgICAgIGRhdGE6IHVzZXJcbiAgICAgIH0pLmRvbmUoZnVuY3Rpb24oIHJlc3VsdCApIHtcbiAgICAgICAgaWYgKHJlc3VsdC5zdGF0dXMgPT09ICdzdWNjZXNzJyAmJiByZXN1bHQucmVhc29uID09PSAndXNlciBleGlzdHMnKSB7IC8vIHVzZXIgZXhpc3RzXG4gICAgICAgICAgaWYgKCQob3B0aW9ucy5jcmVhdGVfbXBfc2VsZWN0b3IsIGVsZW1lbnQpLmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgICAgICAkKG9wdGlvbnMucGFzc3dvcmRfc2VsZWN0b3IsIGVsZW1lbnQpLmhpZGUoKTtcbiAgICAgICAgICAgICQob3B0aW9ucy5jcmVhdGVfbXBfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpLmhpZGUoKTtcbiAgICAgICAgICAgICQoJy5hY2NvdW50LWV4aXN0cycsIGVsZW1lbnQpLnNob3coKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCQob3B0aW9ucy5jcmVhdGVfbXBfc2VsZWN0b3IsIGVsZW1lbnQpLmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgICAgICAgICQob3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgZWxlbWVudCkuaGlkZSgpO1xuICAgICAgICAgICAgICAkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKS5oaWRlKCk7XG4gICAgICAgICAgICAgICQoJy5hY2NvdW50LWV4aXN0cycsIGVsZW1lbnQpLnNob3coKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHsgLy8gdXNlciBkb2VzIG5vdCBleGlzdCBvciBhamF4IGNhbGwgZmFpbGVkXG4gICAgICAgICAgaWYgKCQob3B0aW9ucy5jcmVhdGVfbXBfc2VsZWN0b3IsIGVsZW1lbnQpLmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgICAgICAkKG9wdGlvbnMucGFzc3dvcmRfc2VsZWN0b3IsIGVsZW1lbnQpLnNob3coKTtcbiAgICAgICAgICAgIG9wdGlvbnMuY3JlYXRlX2FjY291bnQgPSB0cnVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKG9wdGlvbnMucGFzc3dvcmRfc2VsZWN0b3IsIGVsZW1lbnQpLmhpZGUoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgJCgnLmFjY291bnQtZXhpc3RzJywgZWxlbWVudCkuaGlkZSgpO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSwgLy8gY2hlY2tNaW5ucG9zdEFjY291bnRFeGlzdHNcblxuICAgIGNob29zZVBheW1lbnRNZXRob2Q6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcblxuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuXG4gICAgICBpZiAoJChvcHRpb25zLmNob29zZV9wYXltZW50KS5sZW5ndGggPiAwKSB7ICAgICAgXG4gICAgICAgIGlmICgkKG9wdGlvbnMuY2hvb3NlX3BheW1lbnQgKyAnIGlucHV0JykuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgICB2YXIgY2hlY2tlZCA9ICQob3B0aW9ucy5jaG9vc2VfcGF5bWVudCArICcgaW5wdXQ6Y2hlY2tlZCcpLmF0dHIoJ2lkJyk7XG4gICAgICAgICAgdmFyIGNoZWNrZWRfdmFsdWUgPSAkKG9wdGlvbnMuY2hvb3NlX3BheW1lbnQgKyAnIGlucHV0OmNoZWNrZWQnKS52YWwoKTtcbiAgICAgICAgICAkKG9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAkKG9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IgKyAnLicgKyBjaGVja2VkKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgJChvcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yICsgJzpub3QoLmFjdGl2ZSkgbGFiZWwnKS5yZW1vdmVDbGFzcygncmVxdWlyZWQnKTtcbiAgICAgICAgICAkKG9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IgKyAnOm5vdCguYWN0aXZlKSBpbnB1dCcpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuICAgICAgICAgICQob3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvciArICcuYWN0aXZlIGxhYmVsJykuYWRkQ2xhc3MoJ3JlcXVpcmVkJyk7XG4gICAgICAgICAgJChvcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yICsgJy5hY3RpdmUgaW5wdXQnKS5wcm9wKCdyZXF1aXJlZCcsIHRydWUpO1xuICAgICAgICAgIGlmICggY2hlY2tlZF92YWx1ZSA9PT0gJ2FjaCcgKSB7XG4gICAgICAgICAgICB0aGF0LmNhbGN1bGF0ZUZlZXModGhhdC5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCwgJ2FjaCcpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGF0LmNhbGN1bGF0ZUZlZXModGhhdC5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCwgJ3Zpc2EnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAkKG9wdGlvbnMuY2hvb3NlX3BheW1lbnQgKyAnIGlucHV0JykuY2hhbmdlKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICQob3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvcikucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICQob3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvciArICcuJyArIHRoaXMuaWQpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAkKG9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IgKyAnOm5vdCguYWN0aXZlKSBsYWJlbCcpLnJlbW92ZUNsYXNzKCdyZXF1aXJlZCcpO1xuICAgICAgICAgICQob3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvciArICc6bm90KC5hY3RpdmUpIGlucHV0JykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICAgICAgJChvcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yICsgJy5hY3RpdmUgbGFiZWwnKS5hZGRDbGFzcygncmVxdWlyZWQnKTtcbiAgICAgICAgICAkKG9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IgKyAnLmFjdGl2ZSBpbnB1dCcpLnByb3AoJ3JlcXVpcmVkJywgdHJ1ZSk7XG4gICAgICAgICAgJCgnI2JhbmtUb2tlbicpLnJlbW92ZSgpO1xuICAgICAgICAgIGlmICggdGhpcy52YWx1ZSA9PT0gJ2FjaCcgKSB7XG4gICAgICAgICAgICB0aGF0LmNhbGN1bGF0ZUZlZXModGhhdC5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCwgJ2FjaCcpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGF0LmNhbGN1bGF0ZUZlZXModGhhdC5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCwgJ3Zpc2EnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sIC8vIGNob29zZVBheW1lbnRNZXRob2RcblxuICAgIGNyZWRpdENhcmRGaWVsZHM6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcblxuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuXG4gICAgICAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikucHJlcGVuZCgnPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBpZD1cInNvdXJjZVwiIG5hbWU9XCJzb3VyY2VcIiB2YWx1ZT1cIicgKyBkb2N1bWVudC5yZWZlcnJlciArICdcIiAvPicpO1xuXG4gICAgICB2YXIgc3R5bGUgPSB7XG4gICAgICAgIGJhc2U6IHtcbiAgICAgICAgICBpY29uQ29sb3I6ICcjNjY2RUU4JyxcbiAgICAgICAgICBsaW5lSGVpZ2h0OiAnMzdweCcsXG4gICAgICAgICAgZm9udFdlaWdodDogNDAwLFxuICAgICAgICAgIGZvbnRGYW1pbHk6ICdHZW9yZ2lhLENhbWJyaWEsVGltZXMgTmV3IFJvbWFuLFRpbWVzLHNlcmlmJyxcbiAgICAgICAgICBmb250U2l6ZTogJzE2cHgnLFxuICAgICAgICB9LFxuICAgICAgfTtcblxuICAgICAgLy8gQWRkIGFuIGluc3RhbmNlIG9mIHRoZSBjYXJkIFVJIGNvbXBvbmVudCBpbnRvIHRoZSBgY2FyZC1lbGVtZW50YCA8ZGl2PlxuICAgICAgLy9jYXJkLm1vdW50KCcjY2FyZC1lbGVtZW50Jyk7XG4gICAgICBpZiAoICQoJy5jcmVkaXQtY2FyZC1ncm91cCcpLmxlbmd0aCA9PT0gMCAmJiAkKCcucGF5bWVudC1tZXRob2QuY2hvb3NlLWNhcmQnKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhhdC5jYXJkTnVtYmVyRWxlbWVudCA9IHRoYXQuZWxlbWVudHMuY3JlYXRlKCdjYXJkTnVtYmVyJywge1xuICAgICAgICBzdHlsZTogc3R5bGVcbiAgICAgIH0pO1xuICAgICAgdGhhdC5jYXJkTnVtYmVyRWxlbWVudC5tb3VudChvcHRpb25zLmNjX251bV9zZWxlY3Rvcik7XG5cbiAgICAgIHRoYXQuY2FyZEV4cGlyeUVsZW1lbnQgPSB0aGF0LmVsZW1lbnRzLmNyZWF0ZSgnY2FyZEV4cGlyeScsIHtcbiAgICAgICAgc3R5bGU6IHN0eWxlXG4gICAgICB9KTtcbiAgICAgIHRoYXQuY2FyZEV4cGlyeUVsZW1lbnQubW91bnQob3B0aW9ucy5jY19leHBfc2VsZWN0b3IpO1xuXG4gICAgICB0aGF0LmNhcmRDdmNFbGVtZW50ID0gdGhhdC5lbGVtZW50cy5jcmVhdGUoJ2NhcmRDdmMnLCB7XG4gICAgICAgIHN0eWxlOiBzdHlsZVxuICAgICAgfSk7XG4gICAgICB0aGF0LmNhcmRDdmNFbGVtZW50Lm1vdW50KG9wdGlvbnMuY2NfY3Z2X3NlbGVjdG9yKTtcblxuICAgICAgLy8gdmFsaWRhdGUvZXJyb3IgaGFuZGxlIHRoZSBjYXJkIGZpZWxkc1xuICAgICAgdGhhdC5jYXJkTnVtYmVyRWxlbWVudC5vbignY2hhbmdlJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgLy8gZXJyb3IgaGFuZGxpbmdcbiAgICAgICAgdGhhdC5zdHJpcGVFcnJvckRpc3BsYXkoZXZlbnQsICQodGhhdC5vcHRpb25zLmNjX251bV9zZWxlY3RvciwgZWxlbWVudCksIGVsZW1lbnQsIHRoYXQub3B0aW9ucyApO1xuICAgICAgICAvLyBTd2l0Y2ggYnJhbmQgbG9nb1xuICAgICAgICBpZiAoZXZlbnQuYnJhbmQpIHtcbiAgICAgICAgICB0aGF0LmNhbGN1bGF0ZUZlZXModGhhdC5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCwgZXZlbnQuYnJhbmQpO1xuICAgICAgICAgIHRoYXQuc2V0QnJhbmRJY29uKGV2ZW50LmJyYW5kKTtcbiAgICAgICAgfVxuICAgICAgICAvL3NldE91dGNvbWUoZXZlbnQpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoYXQuY2FyZEV4cGlyeUVsZW1lbnQub24oJ2NoYW5nZScsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIC8vIGVycm9yIGhhbmRsaW5nXG4gICAgICAgIHRoYXQuc3RyaXBlRXJyb3JEaXNwbGF5KGV2ZW50LCAkKHRoYXQub3B0aW9ucy5jY19leHBfc2VsZWN0b3IsIGVsZW1lbnQpLCBlbGVtZW50LCB0aGF0Lm9wdGlvbnMgKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGF0LmNhcmRDdmNFbGVtZW50Lm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAvLyBlcnJvciBoYW5kbGluZ1xuICAgICAgICB0aGF0LnN0cmlwZUVycm9yRGlzcGxheShldmVudCwgJCh0aGF0Lm9wdGlvbnMuY2NfY3Z2X3NlbGVjdG9yLCBlbGVtZW50KSwgZWxlbWVudCwgdGhhdC5vcHRpb25zICk7XG4gICAgICB9KTtcblxuICAgICAgLy8gdGhpcyBpcyB0aGUgbWV0aG9kIHRvIGNyZWF0ZSBhIHNpbmdsZSBjYXJkIGZpZWxkIGFuZCBtb3VudCBpdFxuICAgICAgLyp2YXIgY2FyZCA9IHRoYXQuZWxlbWVudHMuY3JlYXRlKFxuICAgICAgICAnY2FyZCcsXG4gICAgICAgIHtcbiAgICAgICAgICBoaWRlUG9zdGFsQ29kZTogdHJ1ZVxuICAgICAgICB9XG4gICAgICApO1xuICAgICAgLy8gQWRkIGFuIGluc3RhbmNlIG9mIHRoZSBjYXJkIFVJIGNvbXBvbmVudCBpbnRvIHRoZSBgY2FyZC1lbGVtZW50YCA8ZGl2PlxuICAgICAgY2FyZC5tb3VudCgnI2NhcmQtZWxlbWVudCcpOyovXG5cbiAgICB9LCAvLyBjcmVkaXRDYXJkRmllbGRzXG5cbiAgICBzZXRCcmFuZEljb246IGZ1bmN0aW9uKGJyYW5kKSB7XG4gICAgICB2YXIgY2FyZEJyYW5kVG9QZkNsYXNzID0ge1xuICAgICAgICAndmlzYSc6ICdwZi12aXNhJyxcbiAgICAgICAgJ21hc3RlcmNhcmQnOiAncGYtbWFzdGVyY2FyZCcsXG4gICAgICAgICdhbWV4JzogJ3BmLWFtZXJpY2FuLWV4cHJlc3MnLFxuICAgICAgICAnZGlzY292ZXInOiAncGYtZGlzY292ZXInLFxuICAgICAgICAnZGluZXJzJzogJ3BmLWRpbmVycycsXG4gICAgICAgICdqY2InOiAncGYtamNiJyxcbiAgICAgICAgJ3Vua25vd24nOiAncGYtY3JlZGl0LWNhcmQnLFxuICAgICAgfVxuICAgICAgdmFyIGJyYW5kSWNvbkVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnJhbmQtaWNvbicpO1xuICAgICAgdmFyIHBmQ2xhc3MgPSAncGYtY3JlZGl0LWNhcmQnO1xuICAgICAgaWYgKGJyYW5kIGluIGNhcmRCcmFuZFRvUGZDbGFzcykge1xuICAgICAgICBwZkNsYXNzID0gY2FyZEJyYW5kVG9QZkNsYXNzW2JyYW5kXTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGkgPSBicmFuZEljb25FbGVtZW50LmNsYXNzTGlzdC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICBicmFuZEljb25FbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoYnJhbmRJY29uRWxlbWVudC5jbGFzc0xpc3RbaV0pO1xuICAgICAgfVxuICAgICAgYnJhbmRJY29uRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdwZicpO1xuICAgICAgYnJhbmRJY29uRWxlbWVudC5jbGFzc0xpc3QuYWRkKHBmQ2xhc3MpO1xuICAgIH0sXG5cbiAgICBhY2hGaWVsZHM6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIGlmIChvcHRpb25zLnBsYWlkX2VudiAhPSAnJyAmJiBvcHRpb25zLmtleSAhPSAnJyAmJiB0eXBlb2YgUGxhaWQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHZhciBsaW5rSGFuZGxlciA9IFBsYWlkLmNyZWF0ZSh7XG4gICAgICAgICAgc2VsZWN0QWNjb3VudDogdHJ1ZSxcbiAgICAgICAgICBhcGlWZXJzaW9uOiAndjInLFxuICAgICAgICAgIGVudjogb3B0aW9ucy5wbGFpZF9lbnYsXG4gICAgICAgICAgY2xpZW50TmFtZTogJ01pbm5Qb3N0JyxcbiAgICAgICAgICBrZXk6IG9wdGlvbnMucGxhaWRfcHVibGljX2tleSxcbiAgICAgICAgICBwcm9kdWN0OiAnYXV0aCcsXG4gICAgICAgICAgb25Mb2FkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vIFRoZSBMaW5rIG1vZHVsZSBmaW5pc2hlZCBsb2FkaW5nLlxuICAgICAgICAgIH0sXG4gICAgICAgICAgb25TdWNjZXNzOiBmdW5jdGlvbihwdWJsaWNfdG9rZW4sIG1ldGFkYXRhKSB7XG4gICAgICAgICAgICAvLyBUaGUgb25TdWNjZXNzIGZ1bmN0aW9uIGlzIGNhbGxlZCB3aGVuIHRoZSB1c2VyIGhhcyBzdWNjZXNzZnVsbHlcbiAgICAgICAgICAgIC8vIGF1dGhlbnRpY2F0ZWQgYW5kIHNlbGVjdGVkIGFuIGFjY291bnQgdG8gdXNlLlxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIFdoZW4gY2FsbGVkLCB5b3Ugd2lsbCBzZW5kIHRoZSBwdWJsaWNfdG9rZW4gYW5kIHRoZSBzZWxlY3RlZFxuICAgICAgICAgICAgLy8gYWNjb3VudCBJRCwgbWV0YWRhdGEuYWNjb3VudF9pZCwgdG8geW91ciBiYWNrZW5kIGFwcCBzZXJ2ZXIuXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gc2VuZERhdGFUb0JhY2tlbmRTZXJ2ZXIoe1xuICAgICAgICAgICAgLy8gICBwdWJsaWNfdG9rZW46IHB1YmxpY190b2tlbixcbiAgICAgICAgICAgIC8vICAgYWNjb3VudF9pZDogbWV0YWRhdGEuYWNjb3VudF9pZFxuICAgICAgICAgICAgLy8gfSk7XG5cbiAgICAgICAgICAgIC8vdGhpcy5kZWJ1ZygnUHVibGljIFRva2VuOiAnICsgcHVibGljX3Rva2VuKTtcbiAgICAgICAgICAgIC8vdGhpcy5kZWJ1ZygnQ3VzdG9tZXItc2VsZWN0ZWQgYWNjb3VudCBJRDogJyArIG1ldGFkYXRhLmFjY291bnRfaWQpO1xuXG4gICAgICAgICAgICB2YXIgc3VwcG9ydGZvcm0gPSAkKG9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpO1xuXG4gICAgICAgICAgICAvLyByZXNwb25zZSBjb250YWlucyBpZCBhbmQgY2FyZCwgd2hpY2ggY29udGFpbnMgYWRkaXRpb25hbCBjYXJkIGRldGFpbHNcbiAgICAgICAgICAgIC8vIEluc2VydCB0aGUgZGF0YSBpbnRvIHRoZSBmb3JtIHNvIGl0IGdldHMgc3VibWl0dGVkIHRvIHRoZSBzZXJ2ZXJcbiAgICAgICAgICAgIHN1cHBvcnRmb3JtLmFwcGVuZCgkKCc8aW5wdXQgdHlwZT1cXFwiaGlkZGVuXFxcIiBuYW1lPVxcXCJwdWJsaWNfdG9rZW5cXFwiIC8+JykudmFsKHB1YmxpY190b2tlbikpO1xuICAgICAgICAgICAgc3VwcG9ydGZvcm0uYXBwZW5kKCQoJzxpbnB1dCB0eXBlPVxcXCJoaWRkZW5cXFwiIG5hbWU9XFxcImFjY291bnRfaWRcXFwiIC8+JykudmFsKG1ldGFkYXRhLmFjY291bnRfaWQpKTtcblxuICAgICAgICAgICAgLy8gZ2V0IHRoZSBhY2NvdW50IHZhbGlkYXRlZCBieSBhamF4XG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICB1cmw6Jy9wbGFpZF90b2tlbi8nLFxuICAgICAgICAgICAgICAvL2NhY2hlOiBmYWxzZSxcbiAgICAgICAgICAgICAgZGF0YTogJChzdXBwb3J0Zm9ybSkuc2VyaWFsaXplKCksXG4gICAgICAgICAgICAgIHR5cGU6ICdQT1NUJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgIGlmICh0eXBlb2YgcmVzcG9uc2UuZXJyb3IgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgLy8gdGhlcmUgaXMgYW4gZXJyb3IuXG4gICAgICAgICAgICAgICAgJChvcHRpb25zLnBsYWlkX2xpbmspLnBhcmVudCgpLmFmdGVyKCc8cCBjbGFzcz1cImVycm9yXCI+JyArIHJlc3BvbnNlLmVycm9yICsgJzwvcD4nKVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vdGhpcy5kZWJ1ZygncHJpbnQgcmVzcG9uc2UgaGVyZScpO1xuICAgICAgICAgICAgICAgIC8vdGhpcy5kZWJ1ZyhyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgJChvcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5wcmVwZW5kKCc8aW5wdXQgdHlwZT1cImhpZGRlblwiIGlkPVwiYmFua1Rva2VuXCIgbmFtZT1cImJhbmtUb2tlblwiIHZhbHVlPVwiJyArIHJlc3BvbnNlLnN0cmlwZV9iYW5rX2FjY291bnRfdG9rZW4gKyAnXCIgLz4nKTtcbiAgICAgICAgICAgICAgICAkKG9wdGlvbnMucGxhaWRfbGluaywgZWxlbWVudCkuaHRtbCgnPHN0cm9uZz5Zb3VyIGFjY291bnQgd2FzIHN1Y2Nlc3NmdWxseSBhdXRob3JpemVkPC9zdHJvbmc+JykuY29udGVudHMoKS51bndyYXAoKTtcbiAgICAgICAgICAgICAgICB0aGF0LmNhbGN1bGF0ZUZlZXModGhhdC5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCwgJ2FjaCcpOyAvLyBjYWxjdWxhdGUgdGhlIGFjaCBmZWVzXG4gICAgICAgICAgICAgICAgLy8gYWRkIHRoZSBmaWVsZChzKSB3ZSBuZWVkIHRvIHRoZSBmb3JtIGZvciBzdWJtaXR0aW5nXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZXJyb3IoZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgJChvcHRpb25zLnBsYWlkX2xpbmspLnBhcmVudCgpLmFmdGVyKCc8cCBjbGFzcz1cImVycm9yXCI+JyArIHJlc3BvbnNlLmVycm9yICsgJzwvcD4nKVxuICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICAgXG4gICAgICAgICAgfSxcbiAgICAgICAgICBvbkV4aXQ6IGZ1bmN0aW9uKGVyciwgbWV0YWRhdGEpIHtcbiAgICAgICAgICAgIC8vIFRoZSB1c2VyIGV4aXRlZCB0aGUgTGluayBmbG93LlxuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgICAkKG9wdGlvbnMucGxhaWRfbGluaywgZWxlbWVudCkuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICQob3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvciArICcgLmVycm9yJykucmVtb3ZlKCk7IC8vIHJlbW92ZSBtZXRob2QgZXJyb3IgbWVzc2FnZSBpZiBpdCBpcyB0aGVyZVxuICAgICAgICAgIGxpbmtIYW5kbGVyLm9wZW4oKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSwgLy8gYWNoRmllbGRzXG5cbiAgICBoYXNIdG1sNVZhbGlkYXRpb246IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIC8vdGhpcy5kZWJ1ZygndmFsdWUgaXMgJyArIHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpLmNoZWNrVmFsaWRpdHkgPT09ICdmdW5jdGlvbicpO1xuICAgICAgcmV0dXJuIHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpLmNoZWNrVmFsaWRpdHkgPT09ICdmdW5jdGlvbic7XG4gICAgfSxcblxuICAgIGJ1dHRvblN0YXR1czogZnVuY3Rpb24ob3B0aW9ucywgYnV0dG9uLCBkaXNhYmxlZCkge1xuICAgICAgYnV0dG9uLnByb3AoJ2Rpc2FibGVkJywgZGlzYWJsZWQpO1xuICAgICAgaWYgKGRpc2FibGVkID09PSBmYWxzZSkge1xuICAgICAgICBidXR0b24udGV4dChvcHRpb25zLmJ1dHRvbl90ZXh0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJ1dHRvbi50ZXh0KCdQcm9jZXNzaW5nJyk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHZhbGlkYXRlQW5kU3VibWl0OiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAkKG9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLnN1Ym1pdChmdW5jdGlvbihldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIC8vIGRvIHNvbWUgZmFsbGJhY2sgc3R1ZmYgZm9yIG5vbi1odG1sNSBicm93c2Vyc1xuICAgICAgICBpZiAodGhhdC5oYXNIdG1sNVZhbGlkYXRpb24oZWxlbWVudCwgb3B0aW9ucykpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5jaGVja1ZhbGlkaXR5KCkpIHtcbiAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaW52YWxpZCcpO1xuICAgICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAkKHRoaXMpLmZpbmQoJ2lucHV0OmludmFsaWQnKS5wYXJlbnQoKS5vZmZzZXQoKS50b3BcbiAgICAgICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgICAgICAgIC8vdGhpcy5kZWJ1ZygndG9wIGlzICcgKyApO1xuICAgICAgICAgICAgICAkKHRoaXMpLmZpbmQoJ2lucHV0OmludmFsaWQnKS5wYXJlbnQoKS5hZGRDbGFzcygnZXJyb3InKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2ludmFsaWQnKTtcbiAgICAgICAgICAgICAgJCh0aGlzKS5maW5kKCdpbnB1dDppbnZhbGlkJykucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyB2YWxpZGF0ZSBhbmQgc3VibWl0IHRoZSBmb3JtXG4gICAgICAgICQoJy5jaGVjay1maWVsZCcpLnJlbW92ZSgpO1xuICAgICAgICAkKCdpbnB1dCwgbGFiZWwnLCBlbGVtZW50KS5yZW1vdmVDbGFzcygnZXJyb3InKTtcbiAgICAgICAgdmFyIHZhbGlkID0gdHJ1ZTtcbiAgICAgICAgdmFyIHBheW1lbnRfbWV0aG9kID0gJ2NhcmQnO1xuICAgICAgICBpZiAoJCh0aGF0Lm9wdGlvbnMuY2hvb3NlX3BheW1lbnQpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBwYXltZW50X21ldGhvZCA9ICQodGhhdC5vcHRpb25zLmNob29zZV9wYXltZW50ICsgJyBpbnB1dDpjaGVja2VkJykudmFsKCk7XG4gICAgICAgIH1cbiAgICAgICAgJCh0aGF0Lm9wdGlvbnMuY2hvb3NlX3BheW1lbnQgKyAnIGlucHV0JykuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICQodGhhdC5vcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yICsgJyAuZXJyb3InKS5yZW1vdmUoKTsgLy8gcmVtb3ZlIG1ldGhvZCBlcnJvciBtZXNzYWdlIGlmIGl0IGlzIHRoZXJlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChwYXltZW50X21ldGhvZCA9PT0gJ2FjaCcpIHtcbiAgICAgICAgICBpZiAoJCgnaW5wdXRbbmFtZT1cImJhbmtUb2tlblwiXScpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICQodGhhdC5vcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yKS5wcmVwZW5kKCc8cCBjbGFzcz1cImVycm9yXCI+WW91IGFyZSByZXF1aXJlZCB0byBlbnRlciBjcmVkaXQgY2FyZCBpbmZvcm1hdGlvbiwgb3IgdG8gYXV0aG9yaXplIE1pbm5Qb3N0IHRvIGNoYXJnZSB5b3VyIGJhbmsgYWNjb3VudCwgdG8gbWFrZSBhIHBheW1lbnQuPC9wPicpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWxpZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIC8vIDEuIHByb2Nlc3MgZG9uYXRpb24gdG8gc3RyaXBlXG4gICAgICAgICAgdGhhdC5idXR0b25TdGF0dXModGhhdC5vcHRpb25zLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIHRydWUpO1xuXG4gICAgICAgICAgdmFyIGZ1bGxfbmFtZSA9ICcnO1xuICAgICAgICAgIGlmICgkKCcjZnVsbF9uYW1lJykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgZnVsbF9uYW1lID0gJCgnI2Z1bGxfbmFtZScpLnZhbCgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmdWxsX25hbWUgPSAkKCcjZmlyc3RfbmFtZScpLnZhbCgpICsgJyAnICsgJCgnI2xhc3RfbmFtZScpLnZhbCgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBzdHJlZXQgPSAnTm9uZSc7XG4gICAgICAgICAgaWYgKCQoJ2lucHV0W25hbWU9XCJmdWxsX2FkZHJlc3NcIl0nKS52YWwoKSAhPSAnJykge1xuICAgICAgICAgICAgc3RyZWV0ID0gJCgnI2Z1bGxfYWRkcmVzcycpLnZhbCgpO1xuICAgICAgICAgICAgaWYgKCQoJ2lucHV0W25hbWU9XCJiaWxsaW5nX3N0cmVldFwiXScpLnZhbCgpICE9ICcnKSB7XG4gICAgICAgICAgICAgIHN0cmVldCA9ICQoJ2lucHV0W25hbWU9XCJiaWxsaW5nX3N0cmVldFwiXScpLnZhbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBjaXR5ID0gJ05vbmUnO1xuICAgICAgICAgIGlmICgkKCdpbnB1dFtuYW1lPVwiYmlsbGluZ19jaXR5XCJdJykudmFsKCkgIT0gJycpIHtcbiAgICAgICAgICAgIGNpdHkgPSAkKCdpbnB1dFtuYW1lPVwiYmlsbGluZ19jaXR5XCJdJykudmFsKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIHN0YXRlID0gJ05vbmUnO1xuICAgICAgICAgIGlmICgkKCdpbnB1dFtuYW1lPVwiYmlsbGluZ19zdGF0ZVwiXScpLnZhbCgpICE9ICcnKSB7XG4gICAgICAgICAgICBzdGF0ZSA9ICQoJ2lucHV0W25hbWU9XCJiaWxsaW5nX3N0YXRlXCJdJykudmFsKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIHppcCA9ICdOb25lJztcbiAgICAgICAgICBpZiAoJCgnaW5wdXRbbmFtZT1cImJpbGxpbmdfemlwXCJdJykudmFsKCkgIT0gJycpIHtcbiAgICAgICAgICAgIHppcCA9ICQoJ2lucHV0W25hbWU9XCJiaWxsaW5nX3ppcFwiXScpLnZhbCgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBjb3VudHJ5ID0gJ1VTJztcbiAgICAgICAgICBpZiAoJCgnaW5wdXRbbmFtZT1cImJpbGxpbmdfY291bnRyeVwiXScpLnZhbCgpICE9ICcnKSB7XG4gICAgICAgICAgICBjb3VudHJ5ID0gJCgnaW5wdXRbbmFtZT1cImJpbGxpbmdfY291bnRyeVwiXScpLnZhbCgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIDIuIGNyZWF0ZSBtaW5ucG9zdCBhY2NvdW50IGlmIHNwZWNpZmllZFxuICAgICAgICAgIGlmICh0aGF0Lm9wdGlvbnMuY3JlYXRlX2FjY291bnQgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHZhciB1c2VyID0ge1xuICAgICAgICAgICAgICBlbWFpbDogJCh0aGF0Lm9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgICAgICBmaXJzdF9uYW1lOiAkKHRoYXQub3B0aW9ucy5maXJzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICAgICAgbGFzdF9uYW1lOiAkKHRoYXQub3B0aW9ucy5sYXN0X25hbWVfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgICAgICBwYXNzd29yZDogJCh0aGF0Lm9wdGlvbnMucGFzc3dvcmRfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgICAgICBjaXR5OiAkKHRoYXQub3B0aW9ucy5hY2NvdW50X2NpdHlfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgICAgICBzdGF0ZTogJCh0aGF0Lm9wdGlvbnMuYWNjb3VudF9zdGF0ZV9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgICAgIHppcDogJCh0aGF0Lm9wdGlvbnMuYWNjb3VudF96aXBfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICB1cmw6IHRoYXQub3B0aW9ucy5taW5ucG9zdF9yb290ICsgJy93cC1qc29uL3VzZXItYWNjb3VudC1tYW5hZ2VtZW50L3YxL2NyZWF0ZS11c2VyJyxcbiAgICAgICAgICAgICAgZGF0YTogdXNlclxuICAgICAgICAgICAgfSkuZG9uZShmdW5jdGlvbiggZGF0YSApIHtcbiAgICAgICAgICAgICAgaWYgKGRhdGEuc3RhdHVzID09PSAnc3VjY2VzcycgJiYgZGF0YS5yZWFzb24gPT09ICduZXcgdXNlcicpIHtcbiAgICAgICAgICAgICAgICAvLyB1c2VyIGNyZWF0ZWQgLSB0aGV5IHNob3VsZCByZWNlaXZlIGVtYWlsXG4gICAgICAgICAgICAgICAgLy8gc3VibWl0IHRoZSBmb3JtXG4gICAgICAgICAgICAgICAgLy9zdXBwb3J0Zm9ybS5nZXQoMCkuc3VibWl0KCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gdXNlciBub3QgY3JlYXRlZFxuICAgICAgICAgICAgICAgIC8vIHN0aWxsIHN1Ym1pdCB0aGUgZm9ybVxuICAgICAgICAgICAgICAgIC8vc3VwcG9ydGZvcm0uZ2V0KDApLnN1Ym1pdCgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoJCgnaW5wdXRbbmFtZT1cImJhbmtUb2tlblwiXScpLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAvLyBmaW5hbGx5LCBnZXQgYSB0b2tlbiBmcm9tIHN0cmlwZSwgYW5kIHRyeSB0byBjaGFyZ2UgaXQgaWYgaXQgaXMgbm90IGFjaFxuICAgICAgICAgICAgdGhhdC5jcmVhdGVUb2tlbih0aGF0LmNhcmROdW1iZXJFbGVtZW50KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gaWYgaXQgaXMgYWNoLCB3ZSBhbHJlYWR5IGhhdmUgYSB0b2tlbiBzbyBwYXNzIGl0IHRvIHN0cmlwZS5cbiAgICAgICAgICAgIHRoYXQuc3RyaXBlVG9rZW5IYW5kbGVyKCAkKCcjYmFua1Rva2VuJykudmFsKCksICdhY2gnICk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIHRoaXMgbWVhbnMgdmFsaWQgaXMgZmFsc2VcbiAgICAgICAgICB0aGF0LmJ1dHRvblN0YXR1cyh0aGF0Lm9wdGlvbnMsICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKSwgZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgIH0pO1xuICAgIH0sIC8vIHZhbGlkYXRlQW5kU3VibWl0XG5cbiAgICBzdHJpcGVFcnJvckRpc3BsYXk6IGZ1bmN0aW9uKGV2ZW50LCB0aGlzX3NlbGVjdG9yLCBlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICAvLyBsaXN0ZW4gZm9yIGVycm9ycyBhbmQgZGlzcGxheS9oaWRlIGVycm9yIG1lc3NhZ2VzXG4gICAgICB2YXIgd2hpY2hfZXJyb3IgPSB0aGlzX3NlbGVjdG9yLmF0dHIoJ2lkJyk7XG4gICAgICBpZiAoZXZlbnQuZXJyb3IpIHtcbiAgICAgICAgJCgnLmNhcmQtaW5zdHJ1Y3Rpb24uJyArIHdoaWNoX2Vycm9yKS50ZXh0KGV2ZW50LmVycm9yLm1lc3NhZ2UgKyAnIFBsZWFzZSB0cnkgYWdhaW4uJyk7XG4gICAgICAgICQoJy5jYXJkLWluc3RydWN0aW9uLicgKyB3aGljaF9lcnJvcikuYWRkQ2xhc3MoJ2ludmFsaWQnKTtcbiAgICAgICAgdGhpc19zZWxlY3Rvci5wYXJlbnQoKS5hZGRDbGFzcygnZXJyb3InKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQoJy5jYXJkLWluc3RydWN0aW9uLicgKyB3aGljaF9lcnJvcikucmVtb3ZlQ2xhc3MoJ2ludmFsaWQnKTtcbiAgICAgICAgJCgnLmNhcmQtaW5zdHJ1Y3Rpb24uJyArIHdoaWNoX2Vycm9yKS5lbXB0eSgpO1xuICAgICAgICAkKG9wdGlvbnMuY2NfbnVtX3NlbGVjdG9yLCBlbGVtZW50KS5yZW1vdmVDbGFzcygnZXJyb3InKTtcbiAgICAgICAgJChvcHRpb25zLmNjX2V4cF9zZWxlY3RvciwgZWxlbWVudCkucmVtb3ZlQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICQob3B0aW9ucy5jY19jdnZfc2VsZWN0b3IsIGVsZW1lbnQpLnJlbW92ZUNsYXNzKCdlcnJvcicpO1xuICAgICAgICAkKG9wdGlvbnMuY2NfbnVtX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnZXJyb3InKTtcbiAgICAgICAgJChvcHRpb25zLmNjX2V4cF9zZWxlY3RvciwgZWxlbWVudCkucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICQob3B0aW9ucy5jY19jdnZfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdlcnJvcicpO1xuICAgICAgfVxuICAgIH0sIC8vIHN0cmlwZUVycm9yRGlzcGxheVxuXG4gICAgY3JlYXRlVG9rZW46IGZ1bmN0aW9uKGNhcmQpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHRoYXQuc3RyaXBlLmNyZWF0ZVRva2VuKGNhcmQpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgIGlmIChyZXN1bHQuZXJyb3IpIHtcbiAgICAgICAgICAvLyBTaG93IHRoZSBlcnJvcnMgb24gdGhlIGZvcm1cbiAgICAgICAgICB0aGF0LmJ1dHRvblN0YXR1cyh0aGF0Lm9wdGlvbnMsICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKSwgZmFsc2UpO1xuICAgICAgICAgIHZhciBmaWVsZCA9IHJlc3VsdC5lcnJvci5maWVsZCArICdfZmllbGRfc2VsZWN0b3InO1xuICAgICAgICAgIHZhciBtZXNzYWdlID0gJyc7XG4gICAgICAgICAgaWYgKHR5cGVvZiByZXN1bHQuZXJyb3IubWVzc2FnZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIG1lc3NhZ2UgPSByZXN1bHQuZXJyb3IubWVzc2FnZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWVzc2FnZSA9IHJlc3VsdC5lcnJvci5tZXNzYWdlWzBdO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoJChmaWVsZCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgJCh0aGF0Lm9wdGlvbnNbZmllbGRdLCBlbGVtZW50KS5hZGRDbGFzcygnZXJyb3InKTtcbiAgICAgICAgICAgICQodGhhdC5vcHRpb25zW2ZpZWxkXSwgZWxlbWVudCkucHJldigpLmFkZENsYXNzKCdlcnJvcicpO1xuICAgICAgICAgICAgJCh0aGF0Lm9wdGlvbnNbZmllbGRdLCBlbGVtZW50KS5hZnRlcignPHNwYW4gY2xhc3M9XCJjaGVjay1maWVsZCBpbnZhbGlkXCI+JyArIG1lc3NhZ2UgKyAnPC9zcGFuPicpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChyZXN1bHQuZXJyb3IuZmllbGQgPT0gJ2NzcmZfdG9rZW4nKSB7XG4gICAgICAgICAgICAkKCdidXR0b24uZ2l2ZScpLmJlZm9yZSgnPHAgY2xhc3M9XCJlcnJvclwiPlNvcnJ5LCB0aGlzIGZvcm0gaGFkIGEgYmFjay1lbmQgZXJyb3IgYW5kIHdhcyB1bmFibGUgdG8gY29tcGxldGUgeW91ciBkb25hdGlvbi4gUGxlYXNlIDxhIGhyZWY9XCIjXCIgb25jbGljaz1cImxvY2F0aW9uLnJlbG9hZCgpOyByZXR1cm4gZmFsc2U7XCI+cmVsb2FkIHRoZSBwYWdlPC9hPiBhbmQgdHJ5IGFnYWluICh3ZSB3aWxsIHByZXNlcnZlIGFzIG11Y2ggb2YgeW91ciBpbmZvcm1hdGlvbiBhcyBwb3NzaWJsZSkuPC9wPicpXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFNlbmQgdGhlIHRva2VuIHRvIHlvdXIgc2VydmVyXG4gICAgICAgICAgdGhhdC5zdHJpcGVUb2tlbkhhbmRsZXIocmVzdWx0LnRva2VuLCAnY2FyZCcpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LCAvLyBjcmVhdGVUb2tlblxuXG4gICAgc3RyaXBlVG9rZW5IYW5kbGVyOiBmdW5jdGlvbih0b2tlbiwgdHlwZSkge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgLy8gSW5zZXJ0IHRoZSB0b2tlbiBJRCBpbnRvIHRoZSBmb3JtIHNvIGl0IGdldHMgc3VibWl0dGVkIHRvIHRoZSBzZXJ2ZXJcbiAgICAgIHZhciBzdXBwb3J0Zm9ybSA9ICQodGhpcy5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKTtcbiAgICAgIHZhciBmb3JtX2RhdGFfYWN0aW9uID0gJChzdXBwb3J0Zm9ybSkuZGF0YSgnYWN0aW9uJyk7XG4gICAgICBpZiAoIHR5cGUgPT09ICdjYXJkJyApIHtcbiAgICAgICAgc3VwcG9ydGZvcm0uYXBwZW5kKCQoJzxpbnB1dCB0eXBlPVxcXCJoaWRkZW5cXFwiIG5hbWU9XFxcInN0cmlwZVRva2VuXFxcIj4nKS52YWwodG9rZW4uaWQpKTtcbiAgICAgICAgaWYgKCQoJ2lucHV0W25hbWU9XCJwYXltZW50X3R5cGVcIl0nKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgJCgnaW5wdXRbbmFtZT1cInBheW1lbnRfdHlwZVwiXScpLnZhbCh0b2tlbi5jYXJkLmJyYW5kKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdXBwb3J0Zm9ybS5hcHBlbmQoJCgnPGlucHV0IHR5cGU9XFxcImhpZGRlblxcXCIgbmFtZT1cXFwicGF5bWVudF90eXBlXFxcIiAvPicpLnZhbCh0b2tlbi5jYXJkLmJyYW5kKSk7ICBcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICggdHlwZSA9PT0gJ2FjaCcgKSB7XG4gICAgICAgIGlmICgkKCdpbnB1dFtuYW1lPVwicGF5bWVudF90eXBlXCJdJykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICQoJ2lucHV0W25hbWU9XCJwYXltZW50X3R5cGVcIl0nKS52YWwodHlwZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3VwcG9ydGZvcm0uYXBwZW5kKCQoJzxpbnB1dCB0eXBlPVxcXCJoaWRkZW5cXFwiIG5hbWU9XFxcInBheW1lbnRfdHlwZVxcXCIgLz4nKS52YWwodHlwZSkpOyAgXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gU3VibWl0IHRoZSBmb3JtXG4gICAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IGZvcm1fZGF0YV9hY3Rpb24sXG4gICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgZGF0YTogJChzdXBwb3J0Zm9ybSkuc2VyaWFsaXplKCksXG4gICAgICAgIHR5cGU6ICdQT1NUJ1xuICAgICAgfSlcbiAgICAgIC5kb25lKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVzcG9uc2UuZXJyb3JzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIC8vIGRvIG5vdCBzdWJtaXQuIHRoZXJlIGlzIGFuIGVycm9yLlxuICAgICAgICAgIHRoYXQuYnV0dG9uU3RhdHVzKHRoYXQub3B0aW9ucywgJCh0aGF0Lm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLmZpbmQoJ2J1dHRvbicpLCBmYWxzZSk7XG4gICAgICAgICAgLy8gYWRkIHNvbWUgZXJyb3IgbWVzc2FnZXMgYW5kIHN0eWxlc1xuICAgICAgICAgICQuZWFjaChyZXNwb25zZS5lcnJvcnMsIGZ1bmN0aW9uKCBpbmRleCwgZXJyb3IgKSB7XG4gICAgICAgICAgICB2YXIgZmllbGQgPSBlcnJvci5maWVsZCArICdfZmllbGRfc2VsZWN0b3InO1xuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSAnJztcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZXJyb3IubWVzc2FnZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgbWVzc2FnZSA9IGVycm9yLm1lc3NhZ2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBtZXNzYWdlID0gZXJyb3IubWVzc2FnZVswXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgkKHRoYXQub3B0aW9uc1tmaWVsZF0pLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgJCh0aGF0Lm9wdGlvbnNbZmllbGRdKS5hZGRDbGFzcygnZXJyb3InKTtcbiAgICAgICAgICAgICAgJCh0aGF0Lm9wdGlvbnNbZmllbGRdKS5wcmV2KCkuYWRkQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICAgICAgICQodGhhdC5vcHRpb25zW2ZpZWxkXSkuYWZ0ZXIoJzxzcGFuIGNsYXNzPVwiY2hlY2stZmllbGQgaW52YWxpZFwiPicgKyBtZXNzYWdlICsgJzwvc3Bhbj4nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBlcnJvciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgaWYgKGVycm9yLmNvZGUgPT0gJ2ludmFsaWRfbnVtYmVyJyB8fCBlcnJvci5jb2RlID09ICdpbmNvcnJlY3RfbnVtYmVyJyB8fCBlcnJvci5jb2RlID09ICdjYXJkX2RlY2xpbmVkJyB8fCBlcnJvci5jb2RlID09ICdwcm9jZXNzaW5nX2Vycm9yJykge1xuICAgICAgICAgICAgICAgIC8vIGVycm9yIGhhbmRsaW5nXG4gICAgICAgICAgICAgICAgdGhhdC5zdHJpcGVFcnJvckRpc3BsYXkocmVzcG9uc2UuZXJyb3JzLCAkKHRoYXQub3B0aW9ucy5jY19udW1fc2VsZWN0b3IpLCB0aGF0LmVsZW1lbnQsIHRoYXQub3B0aW9ucyApO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKGVycm9yLmNvZGUgPT0gJ2ludmFsaWRfZXhwaXJ5X21vbnRoJyB8fCBlcnJvci5jb2RlID09ICdpbnZhbGlkX2V4cGlyeV95ZWFyJyB8fCBlcnJvci5jb2RlID09ICdleHBpcmVkX2NhcmQnKSB7XG4gICAgICAgICAgICAgICAgLy8gZXJyb3IgaGFuZGxpbmdcbiAgICAgICAgICAgICAgICB0aGF0LnN0cmlwZUVycm9yRGlzcGxheShyZXNwb25zZS5lcnJvcnMsICQodGhhdC5vcHRpb25zLmNjX2V4cF9zZWxlY3RvciksIHRoYXQuZWxlbWVudCwgdGhhdC5vcHRpb25zICk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAoZXJyb3IuY29kZSA9PSAnaW52YWxpZF9jdmMnIHx8IGVycm9yLmNvZGUgPT0gJ2luY29ycmVjdF9jdmMnKSB7XG4gICAgICAgICAgICAgICAgLy8gZXJyb3IgaGFuZGxpbmdcbiAgICAgICAgICAgICAgICB0aGF0LnN0cmlwZUVycm9yRGlzcGxheShyZXNwb25zZS5lcnJvcnMsICQodGhhdC5vcHRpb25zLmNjX2N2dl9zZWxlY3RvciksIHRoYXQuZWxlbWVudCwgdGhhdC5vcHRpb25zICk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAoZXJyb3IudHlwZSA9PSAnaW52YWxpZF9yZXF1ZXN0X2Vycm9yJykge1xuICAgICAgICAgICAgICAgICQoJ2J1dHRvbi5naXZlJykuYmVmb3JlKCc8cCBjbGFzcz1cImVycm9yXCI+JyArIGVycm9yLm1lc3NhZ2UgKyAnPC9wPicpXG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHJlc3BvbnNlLmVycm9yc1swXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgdmFyIGZpZWxkID0gcmVzcG9uc2UuZXJyb3JzWzBdLmZpZWxkICsgJ19maWVsZF9zZWxlY3Rvcic7XG4gICAgICAgICAgICAgIGlmICgkKHRoYXQub3B0aW9uc1tmaWVsZF0pLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6ICQodGhhdC5vcHRpb25zW2ZpZWxkXSkucGFyZW50KCkub2Zmc2V0KCkudG9wXG4gICAgICAgICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN1cHBvcnRmb3JtLmdldCgwKS5zdWJtaXQoKTtcbiAgICAgICAgfVxuICAgICAgICAvLyB0b2RvOiBvbmUgdGhpbmcgdGhhdCBtaWdodCBiZSBuaWNlIGhlcmUgaXMgdG8gbG9hZCB0aGUgdGVtcGxhdGVzIGZyb20gdGhlIHNlcnZlciBpbnN0ZWFkIG9mIHBhcnNpbmcgdGhlIGVycm9ycyBmcm9tIHRoZSBqc29uXG4gICAgICB9KVxuICAgICAgLmVycm9yKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgIC8vIG1heWJlIGl0IHJldHVybnMgdG9vIGZhc3Q/XG4gICAgICAgIHRoYXQuYnV0dG9uU3RhdHVzKHRoYXQub3B0aW9ucywgJCh0aGF0Lm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLmZpbmQoJ2J1dHRvbicpLCBmYWxzZSk7XG4gICAgICB9KTtcblxuICAgIH0sXG5cbiAgICBzaG93TmV3c2xldHRlclNldHRpbmdzOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICBpZiAoJChvcHRpb25zLm5ld3NsZXR0ZXJfZ3JvdXBfc2VsZWN0b3IpLmxlbmd0aCA+IDAgJiYgdHlwZW9mICQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHZhciBnZXRfZGF0YSA9IHtcbiAgICAgICAgICBlbWFpbDogJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKVxuICAgICAgICB9O1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgdXJsOiBvcHRpb25zLm1pbm5wb3N0X3Jvb3QgKyAnL3dwLWpzb24vbWlubnBvc3QtYXBpL3YyL21haWxjaGltcC91c2VyJyxcbiAgICAgICAgICBkYXRhOiBnZXRfZGF0YVxuICAgICAgICB9KS5kb25lKGZ1bmN0aW9uKCByZXN1bHQgKSB7XG4gICAgICAgICAgaWYgKCB0eXBlb2YgcmVzdWx0Lm1haWxjaGltcF9zdGF0dXMgIT09ICd1bmRlZmluZWQnICkge1xuICAgICAgICAgICAgJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5hZnRlcignPGlucHV0IG5hbWU9XCJtYWlsY2hpbXBfc3RhdHVzXCIgdHlwZT1cImhpZGRlblwiIHZhbHVlPVwiJyArIHJlc3VsdC5tYWlsY2hpbXBfc3RhdHVzICsgJ1wiPicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIHR5cGVvZiByZXN1bHQubWFpbGNoaW1wX3VzZXJfaWQgIT09ICd1bmRlZmluZWQnICkge1xuICAgICAgICAgICAgJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5hZnRlcignPGlucHV0IG5hbWU9XCJtYWlsY2hpbXBfdXNlcl9pZFwiIHR5cGU9XCJoaWRkZW5cIiB2YWx1ZT1cIicgKyByZXN1bHQubWFpbGNoaW1wX3VzZXJfaWQgKyAnXCI+Jyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChyZXN1bHQubWFpbGNoaW1wX3N0YXR1cyA9PT0gJ3N1YnNjcmliZWQnKSB7XG4gICAgICAgICAgICAvLyB1c2VyIGNyZWF0ZWQgLSBzaG93IGEgc3VjY2VzcyBtZXNzYWdlXG4gICAgICAgICAgICAkKCcuY29uZmlybS1pbnN0cnVjdGlvbnMnKS50ZXh0KCQoJy5jb25maXJtLWluc3RydWN0aW9ucycpLmF0dHIoJ2RhdGEta25vd24tdXNlcicpKTtcbiAgICAgICAgICAgIHZhciBncm91cHMgPSByZXN1bHQuZ3JvdXBzO1xuICAgICAgICAgICAgJC5lYWNoKGdyb3VwcywgZnVuY3Rpb24oIGluZGV4LCB2YWx1ZSApIHtcbiAgICAgICAgICAgICAgaWYgKCB2YWx1ZSA9PT0gdHJ1ZSApIHtcbiAgICAgICAgICAgICAgICAkKCc6Y2hlY2tib3hbbmFtZT1cIicgKyBpbmRleCArICdcIl0nKS5wcm9wKCdjaGVja2VkJyx0cnVlKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKCc6Y2hlY2tib3hbbmFtZT1cIicgKyBpbmRleCArICdcIl0nKS5wcm9wKCdjaGVja2VkJyxmYWxzZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICB9LCAvLyBzaG93TmV3c2xldHRlclNldHRpbmdzXG5cbiAgICBjb25maXJtTWVzc2FnZVN1Ym1pdDogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuXG4gICAgICAvL3ZhciBleGlzdGluZ19uZXdzbGV0dGVyX3NldHRpbmdzID0gdGhpcy5vcHRpb25zLmV4aXN0aW5nX25ld3NsZXR0ZXJfc2V0dGluZ3M7XG4gICAgICB2YXIgZXhpc3RpbmdfbmV3c2xldHRlcl9zZXR0aW5ncyA9ICQoJy5zdXBwb3J0LW5ld3NsZXR0ZXIgOmlucHV0Jykuc2VyaWFsaXplKCk7XG4gICAgICAvL3RoaXMuZGVidWcoZXhpc3RpbmdfbmV3c2xldHRlcl9zZXR0aW5ncyk7XG5cbiAgICAgICQob3B0aW9ucy5jb25maXJtX2Zvcm1fc2VsZWN0b3IpLnN1Ym1pdChmdW5jdGlvbihldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIHZhciBjb25maXJtZm9ybSA9ICQob3B0aW9ucy5jb25maXJtX2Zvcm1fc2VsZWN0b3IpO1xuICAgICAgICAvLyBzdWJtaXQgc2V0dGluZ3MgdG8gbWFpbGNoaW1wXG4gICAgICAgIC8vIG5lZWQgdG8gZ2V0IHVzZXIgaW5mbyBvbiBhIGhpZGRlbiBmaWVsZCBoZXJlXG5cbiAgICAgICAgdmFyIG5ld3NsZXR0ZXJfZ3JvdXBzID0gJChvcHRpb25zLm5ld3NsZXR0ZXJfZ3JvdXBfc2VsZWN0b3IgKyAnOmNoZWNrZWQnKTtcbiAgICAgICAgdmFyIG1lc3NhZ2VfZ3JvdXBzID0gJChvcHRpb25zLm1lc3NhZ2VfZ3JvdXBfc2VsZWN0b3IgKyAnOmNoZWNrZWQnKTtcbiAgICAgICAgdmFyIG5ld19uZXdzbGV0dGVyX3NldHRpbmdzID0gJCgnLnN1cHBvcnQtbmV3c2xldHRlciA6aW5wdXQ6Y2hlY2tlZCcpLnNlcmlhbGl6ZSgpO1xuXG4gICAgICAgIGlmICgoZXhpc3RpbmdfbmV3c2xldHRlcl9zZXR0aW5ncyAhPT0gbmV3X25ld3NsZXR0ZXJfc2V0dGluZ3MpICYmICh0eXBlb2YgbmV3c2xldHRlcl9ncm91cHMgIT09ICd1bmRlZmluZWQnIHx8IHR5cGVvZiBtZXNzYWdlX2dyb3VwcyAhPT0gJ3VuZGVmaW5lZCcpKSB7XG4gICAgICAgICAgLy9hZGQgb3VyIG93biBhamF4IGNoZWNrIGFzIFgtUmVxdWVzdGVkLVdpdGggaXMgbm90IGFsd2F5cyByZWxpYWJsZVxuICAgICAgICAgIC8vYWpheF9mb3JtX2RhdGEgPSBuZXdfbmV3c2xldHRlcl9zZXR0aW5ncyArICcmYWpheHJlcXVlc3Q9dHJ1ZSZzdWJzY3JpYmUnO1xuXG4gICAgICAgICAgdmFyIHBvc3RfZGF0YSA9IHtcbiAgICAgICAgICAgIGVtYWlsOiAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgICAgZmlyc3RfbmFtZTogJChvcHRpb25zLmZpcnN0X25hbWVfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgICAgbGFzdF9uYW1lOiAkKG9wdGlvbnMubGFzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICAgIGdyb3Vwc19zdWJtaXR0ZWQ6IFtdXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHBvc3RfZGF0YS5ncm91cHNfYXZhaWxhYmxlID0gJ2FsbCc7XG5cbiAgICAgICAgICBpZiAoICQoJ2lucHV0W25hbWU9XCJtYWlsY2hpbXBfc3RhdHVzXCJdJykubGVuZ3RoID4gMCApIHtcbiAgICAgICAgICAgIHBvc3RfZGF0YS5tYWlsY2hpbXBfc3RhdHVzID0gJCgnaW5wdXRbbmFtZT1cIm1haWxjaGltcF9zdGF0dXNcIl0nKS52YWwoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoICQoJ2lucHV0W25hbWU9XCJtYWlsY2hpbXBfdXNlcl9pZFwiXScpLmxlbmd0aCA+IDAgKSB7XG4gICAgICAgICAgICBwb3N0X2RhdGEubWFpbGNoaW1wX3VzZXJfaWQgPSAkKCdpbnB1dFtuYW1lPVwibWFpbGNoaW1wX3VzZXJfaWRcIl0nKS52YWwoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodHlwZW9mIG5ld3NsZXR0ZXJfZ3JvdXBzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgJC5lYWNoKG5ld3NsZXR0ZXJfZ3JvdXBzLCBmdW5jdGlvbihpbmRleCwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgdmFyIGdyb3VwID0gJCh0aGlzKS5hdHRyKCduYW1lJyk7XG4gICAgICAgICAgICAgIHBvc3RfZGF0YS5ncm91cHNfc3VibWl0dGVkLnB1c2goZ3JvdXApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlX2dyb3VwcyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICQuZWFjaChtZXNzYWdlX2dyb3VwcywgZnVuY3Rpb24oaW5kZXgsIHZhbHVlKSB7XG4gICAgICAgICAgICAgIHZhciBncm91cCA9ICQodGhpcykuYXR0cignbmFtZScpO1xuICAgICAgICAgICAgICBwb3N0X2RhdGEuZ3JvdXBzX3N1Ym1pdHRlZC5wdXNoKGdyb3VwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IG9wdGlvbnMubWlubnBvc3Rfcm9vdCArICcvd3AtanNvbi9taW5ucG9zdC1hcGkvdjIvbWFpbGNoaW1wL3VzZXInLFxuICAgICAgICAgICAgdHlwZTogJ3Bvc3QnLFxuICAgICAgICAgICAgZGF0YVR5cGUgOiAnanNvbicsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkocG9zdF9kYXRhKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmRvbmUoZnVuY3Rpb24ocmVzcG9uc2UpIHsgLy8gcmVzcG9uc2UgZnJvbSB0aGUgUEhQIGFjdGlvblxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSAnJztcbiAgICAgICAgICAgIGlmICggcmVzcG9uc2Uuc3VjY2VzcyA9PT0gdHJ1ZSApIHtcbiAgICAgICAgICAgICAgLypzd2l0Y2ggKHJlc3BvbnNlLmRhdGEudXNlcl9zdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdleGlzdGluZyc6XG4gICAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ1RoYW5rcyBmb3IgdXBkYXRpbmcgeW91ciBlbWFpbCBwcmVmZXJlbmNlcy4gVGhleSB3aWxsIGdvIGludG8gZWZmZWN0IGltbWVkaWF0ZWx5Lic7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICduZXcnOlxuICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9ICdXZSBoYXZlIGFkZGVkIHlvdSB0byB0aGUgTWlublBvc3QgbWFpbGluZyBsaXN0Lic7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdwZW5kaW5nJzpcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnV2UgaGF2ZSBhZGRlZCB5b3UgdG8gdGhlIE1pbm5Qb3N0IG1haWxpbmcgbGlzdC4gWW91IHdpbGwgbmVlZCB0byBjbGljayB0aGUgY29uZmlybWF0aW9uIGxpbmsgaW4gdGhlIGVtYWlsIHdlIHNlbnQgdG8gYmVnaW4gcmVjZWl2aW5nIG1lc3NhZ2VzLic7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfSovXG4gICAgICAgICAgICAgIC8vY29uZmlybWZvcm0uZ2V0KDApLnN1Ym1pdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uZmlybWZvcm0uZ2V0KDApLnN1Ym1pdCgpO1xuICAgICAgICAgICAgLy8kKCcubS1ob2xkLW1lc3NhZ2UnKS5odG1sKCc8ZGl2IGNsYXNzPVwibS1mb3JtLW1lc3NhZ2UgbS1mb3JtLW1lc3NhZ2UtaW5mb1wiPicgKyBtZXNzYWdlICsgJzwvZGl2PicpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmZhaWwoZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIC8vIHdlIHNob3VsZCBwdXQgYW4gYWN0dWFsIGVycm9yIG1lc3NhZ2UgaGVyZSBzb21lZGF5LCBwcm9iYWJseVxuICAgICAgICAgICAgLy8kKCcubS1ob2xkLW1lc3NhZ2UnKS5odG1sKCc8ZGl2IGNsYXNzPVwibS1mb3JtLW1lc3NhZ2UgbS1mb3JtLW1lc3NhZ2UtaW5mb1wiPkFuIGVycm9yIGhhcyBvY2N1cmVkLiBQbGVhc2UgdHJ5IGFnYWluLjwvZGl2PicpO1xuICAgICAgICAgICAgY29uZmlybWZvcm0uZ2V0KDApLnN1Ym1pdCgpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0gZWxzZSB7IC8vIGVuZCBwYXJ0IHdoZXJlIHNldHRpbmdzIGNoYW5nZWRcbiAgICAgICAgICBjb25maXJtZm9ybS5nZXQoMCkuc3VibWl0KCk7XG4gICAgICAgIH1cblxuICAgICAgfSk7XG4gICAgICAvL3JldHVybiBmYWxzZTtcbiAgICB9LCAvLyBjb25maXJtTWVzc2FnZVN1Ym1pdFxuXG4gIH07IC8vIHBsdWdpbi5wcm90b3R5cGVcblxuICAvLyBBIHJlYWxseSBsaWdodHdlaWdodCBwbHVnaW4gd3JhcHBlciBhcm91bmQgdGhlIGNvbnN0cnVjdG9yLFxuICAvLyBwcmV2ZW50aW5nIGFnYWluc3QgbXVsdGlwbGUgaW5zdGFudGlhdGlvbnNcbiAgJC5mbltwbHVnaW5OYW1lXSA9IGZ1bmN0aW9uICggb3B0aW9ucyApIHtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICghJC5kYXRhKHRoaXMsICdwbHVnaW5fJyArIHBsdWdpbk5hbWUpKSB7XG4gICAgICAgICQuZGF0YSh0aGlzLCAncGx1Z2luXycgKyBwbHVnaW5OYW1lLCBuZXcgUGx1Z2luKCB0aGlzLCBvcHRpb25zICkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG59KSggalF1ZXJ5LCB3aW5kb3csIGRvY3VtZW50ICk7Il19
