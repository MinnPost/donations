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
    'tabs': true,
    // are we doing the tab thing
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
    'honor_name_selector': '.honor',
    // label
    'memory_name_selector': '.memory',
    // label
    'honor_selector': '#in-honor',
    // single radio field
    'memory_selector': '#in-memory',
    // single radio field
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


      this.paymentPanels(query_panel); // tabs

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
    paymentPanels: function paymentPanels(active) {
      var that = this;
      var usetabs = this.options.tabs;
      var title = 'MinnPost | Support Us | ';
      var page = $('.progress--donation li.' + active).text();
      var next = $('.progress--donation li.' + active).next().text();
      var step = $('.progress--donation li.' + active).index() + 1;
      var nav_item_count = $('.progress--donation li').length;
      var opp_id = $(this.options.opp_id_selector).val();
      var next_step = step + 1;
      var post_purchase = false;
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
      this.analyticsTrackingStep(step, title, post_purchase); // make some tabs for form

      if (usetabs === true) {
        $('.panel').hide();
      } else {
        $('.panel').show();
      } // activate the tabs


      if ($('.progress--donation li .active').length === 0) {
        $('#' + active).show();
        $('.progress--donation li.' + active + ' a').addClass('active');
      } else {
        active = $('.progress--donation li .active').parent().prop('class');
        $('#' + active).show();
      }
      /*$('.progress--donation li a, a.btn.btn--next').click(function(event) {
        event.preventDefault();
        $('.progress--donation li a').removeClass('active');
        var link = $(this).prop('href');
        var query = that.getQueryStrings(link);
        query = query['step'];
        $('.progress--donation li.' + query + ' a').addClass('active');
        that.paymentPanels(query);    
      });*/

    },
    // paymentPanels
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

        if ($(options.honor_selector, element).is(':checked')) {
          $(options.in_honor_or_memory_field_selector + ' span' + options.honor_name_selector, element).show();
        } else {
          $(options.in_honor_or_memory_field_selector + ' span' + options.honor_name_selector, element).hide();
          $(options.honor_name_selector + ' input', element).val('');
        }

        if ($(options.memory_selector, element).is(':checked')) {
          $(options.in_honor_or_memory_field_selector + ' span' + options.memory_name_selector, element).show();
        } else {
          $(options.in_honor_or_memory_field_selector + ' span' + options.memory_name_selector, element).hide();
          $(options.memory_name_selector + ' input', element).val('');
        }
      } else {
        $(options.honor_memory_input_group, element).hide();
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
        that.stripeErrorDisplay(event, $(options.cc_num_selector, element), element, options); // Switch brand logo

        if (event.brand) {
          that.calculateFees(that.options.original_amount, event.brand);
          that.setBrandIcon(event.brand);
        } //setOutcome(event);

      });
      that.cardExpiryElement.on('change', function (event) {
        // error handling
        that.stripeErrorDisplay(event, $(options.cc_exp_selector, element), element, options);
      });
      that.cardCvcElement.on('change', function (event) {
        // error handling
        that.stripeErrorDisplay(event, $(options.cc_cvv_selector, element), element, options);
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

        if ($(options.choose_payment).length > 0) {
          payment_method = $(options.choose_payment + ' input:checked').val();
        }

        $(options.choose_payment + ' input').change(function () {
          $(options.payment_method_selector + ' .error').remove(); // remove method error message if it is there
        });

        if (payment_method === 'ach') {
          if ($('input[name="bankToken"]').length === 0) {
            valid = false;
            $(options.payment_method_selector).prepend('<p class="error">You are required to enter credit card information, or to authorize MinnPost to charge your bank account, to make a payment.</p>');
          }
        }

        if (valid === true) {
          // 1. process donation to stripe
          that.buttonStatus(options, $(that.options.donate_form_selector).find('button'), true);
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


          if (options.create_account === true) {
            var user = {
              email: $(options.email_field_selector, element).val(),
              first_name: $(options.first_name_field_selector, element).val(),
              last_name: $(options.last_name_field_selector, element).val(),
              password: $(options.password_field_selector, element).val(),
              city: $(options.account_city_selector, element).val(),
              state: $(options.account_state_selector, element).val(),
              zip: $(options.account_zip_selector, element).val()
            };
            $.ajax({
              method: 'POST',
              url: options.minnpost_root + '/wp-json/user-account-management/v1/create-user',
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
          that.buttonStatus(options, $(that.options.donate_form_selector).find('button'), false);
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
          that.buttonStatus(options, $(that.options.donate_form_selector).find('button'), false);
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
      //supportform.submit();


      $.ajax({
        url: '/give/',
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

            if ($(field).length > 0) {
              $(options[field]).addClass('error');
              $(options[field]).prev().addClass('error');
              $(options[field]).after('<span class="check-field invalid">' + message + '</span>');
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0cmlwZS5wYXltZW50LmpzIiwibWlubnBvc3QuZ2l2aW5nLmpzIl0sIm5hbWVzIjpbImYiLCJleHBvcnRzIiwibW9kdWxlIiwiZGVmaW5lIiwiYW1kIiwiZyIsIndpbmRvdyIsImdsb2JhbCIsInNlbGYiLCJwYXltZW50IiwianMiLCJlIiwidCIsIm4iLCJyIiwicyIsIm8iLCJ1IiwiYSIsInJlcXVpcmUiLCJpIiwiRXJyb3IiLCJjb2RlIiwibCIsImNhbGwiLCJsZW5ndGgiLCJRSiIsInJyZXR1cm4iLCJydHJpbSIsInNlbGVjdG9yIiwiaXNET01FbGVtZW50IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZWwiLCJub2RlTmFtZSIsInRyaW0iLCJ0ZXh0IiwicmVwbGFjZSIsInZhbCIsInJldCIsImFyZ3VtZW50cyIsInZhbHVlIiwicHJldmVudERlZmF1bHQiLCJldmVudE9iamVjdCIsInJldHVyblZhbHVlIiwibm9ybWFsaXplRXZlbnQiLCJvcmlnaW5hbCIsIndoaWNoIiwidGFyZ2V0Iiwic3JjRWxlbWVudCIsIm9yaWdpbmFsRXZlbnQiLCJkYXRhIiwiZGV0YWlsIiwiY2hhckNvZGUiLCJrZXlDb2RlIiwib24iLCJlbGVtZW50IiwiZXZlbnROYW1lIiwiY2FsbGJhY2siLCJqIiwibGVuIiwibGVuMSIsIm11bHRFdmVudE5hbWUiLCJvcmlnaW5hbENhbGxiYWNrIiwicmVmIiwibWF0Y2giLCJzcGxpdCIsImFkZEV2ZW50TGlzdGVuZXIiLCJhdHRhY2hFdmVudCIsImFkZENsYXNzIiwiY2xhc3NOYW1lIiwicmVzdWx0cyIsInB1c2giLCJjbGFzc0xpc3QiLCJhZGQiLCJoYXNDbGFzcyIsImNvbnRhaW5zIiwiUmVnRXhwIiwidGVzdCIsInJlbW92ZUNsYXNzIiwiY2xzIiwicmVtb3ZlIiwiam9pbiIsInRvZ2dsZUNsYXNzIiwiYm9vbCIsImFwcGVuZCIsInRvQXBwZW5kIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwiZmluZCIsIk5vZGVMaXN0IiwiQXJyYXkiLCJ0cmlnZ2VyIiwibmFtZSIsImVycm9yIiwiZXYiLCJDdXN0b21FdmVudCIsImNyZWF0ZUV2ZW50IiwiaW5pdEN1c3RvbUV2ZW50IiwiaW5pdEV2ZW50IiwiZGlzcGF0Y2hFdmVudCIsIlBheW1lbnQiLCJjYXJkRnJvbU51bWJlciIsImNhcmRGcm9tVHlwZSIsImNhcmRzIiwiZGVmYXVsdEZvcm1hdCIsImZvcm1hdEJhY2tDYXJkTnVtYmVyIiwiZm9ybWF0QmFja0V4cGlyeSIsImZvcm1hdENhcmROdW1iZXIiLCJmb3JtYXRFeHBpcnkiLCJmb3JtYXRGb3J3YXJkRXhwaXJ5IiwiZm9ybWF0Rm9yd2FyZFNsYXNoIiwiZm9ybWF0TW9udGhFeHBpcnkiLCJoYXNUZXh0U2VsZWN0ZWQiLCJsdWhuQ2hlY2siLCJyZUZvcm1hdENhcmROdW1iZXIiLCJyZXN0cmljdENWQyIsInJlc3RyaWN0Q2FyZE51bWJlciIsInJlc3RyaWN0Q29tYmluZWRFeHBpcnkiLCJyZXN0cmljdEV4cGlyeSIsInJlc3RyaWN0TW9udGhFeHBpcnkiLCJyZXN0cmljdE51bWVyaWMiLCJyZXN0cmljdFllYXJFeHBpcnkiLCJzZXRDYXJkVHlwZSIsImluZGV4T2YiLCJpdGVtIiwidHlwZSIsInBhdHRlcm4iLCJmb3JtYXQiLCJjdmNMZW5ndGgiLCJsdWhuIiwibnVtIiwiY2FyZCIsImRpZ2l0IiwiZGlnaXRzIiwib2RkIiwic3VtIiwicmV2ZXJzZSIsInBhcnNlSW50Iiwic2VsZWN0aW9uU3RhcnQiLCJzZWxlY3Rpb25FbmQiLCJzZWxlY3Rpb24iLCJjcmVhdGVSYW5nZSIsInNldFRpbWVvdXQiLCJfdGhpcyIsImZucyIsInJlIiwidXBwZXJMZW5ndGgiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJtZXRhIiwic2xhc2giLCJtZXRhS2V5IiwiaW5wdXQiLCJjdHJsS2V5IiwiYWxsVHlwZXMiLCJjYXJkVHlwZSIsImNhcmRFeHBpcnlWYWwiLCJtb250aCIsInByZWZpeCIsInllYXIiLCJEYXRlIiwiZ2V0RnVsbFllYXIiLCJ0b1N0cmluZyIsInNsaWNlIiwidmFsaWRhdGVDYXJkTnVtYmVyIiwidmFsaWRhdGVDYXJkRXhwaXJ5IiwiY3VycmVudFRpbWUiLCJleHBpcnkiLCJzZXRNb250aCIsImdldE1vbnRoIiwidmFsaWRhdGVDYXJkQ1ZDIiwiY3ZjIiwicmVmMSIsImdyb3VwcyIsImV4ZWMiLCJzaGlmdCIsImZvcm1hdENhcmRDVkMiLCJmb3JtYXRDYXJkRXhwaXJ5IiwiZm9ybWF0Q2FyZEV4cGlyeU11bHRpcGxlIiwiZ2V0Q2FyZEFycmF5Iiwic2V0Q2FyZEFycmF5IiwiY2FyZEFycmF5IiwiYWRkVG9DYXJkQXJyYXkiLCJjYXJkT2JqZWN0IiwicmVtb3ZlRnJvbUNhcmRBcnJheSIsImtleSIsInNwbGljZSIsIiQiLCJ1bmRlZmluZWQiLCJwbHVnaW5OYW1lIiwiZGVmYXVsdHMiLCJQbHVnaW4iLCJvcHRpb25zIiwiZXh0ZW5kIiwiX2RlZmF1bHRzIiwiX25hbWUiLCJpbml0IiwicHJvdG90eXBlIiwicmVzZXQiLCJhbW91bnQiLCJwYXJzZUZsb2F0IiwibGV2ZWxfYW1vdW50X3NlbGVjdG9yIiwib3JpZ2luYWxfYW1vdW50Iiwib3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yIiwiZnJlcXVlbmN5IiwiZnJlcXVlbmN5X3NlbGVjdG9yIiwiYXR0ciIsInJlY3VycmluZyIsInJlY3VycmluZ19zZWxlY3RvciIsImNoYXJBdCIsInRvVXBwZXJDYXNlIiwicHJvY2Vzc2luZ19mZWUiLCJNYXRoIiwicm91bmQiLCJmZWVfYW1vdW50IiwicG93IiwidG9GaXhlZCIsInByb2Nlc3NpbmdfZmVlX3RleHQiLCJjcmVhdGVfYWNjb3VudCIsImJ1dHRvbl90ZXh0Iiwic3RyaXBlIiwiU3RyaXBlIiwic3RyaXBlX3B1Ymxpc2hhYmxlX2tleSIsImVsZW1lbnRzIiwicmVmZXJyZXIiLCJwcm9wIiwiZGVidWciLCJxdWVyeV9wYW5lbCIsInFzIiwicXVlcnkiLCJhY3RpdmUiLCJwYXltZW50UGFuZWxzIiwicGF5X2NjX3Byb2Nlc3Npbmdfc2VsZWN0b3IiLCJjcmVkaXRDYXJkUHJvY2Vzc2luZ0ZlZXMiLCJkb25hdGVfc3RlcF9zZWxlY3RvciIsImxldmVsIiwiY2hlY2tMZXZlbCIsImxldmVsbnVtIiwiZG9uYXRlQW5vbnltb3VzbHkiLCJob25vck9yTWVtb3J5VG9nZ2xlIiwib3V0c2lkZVVuaXRlZFN0YXRlcyIsInNoaXBwaW5nQWRkcmVzcyIsImFsbG93TWlubnBvc3RBY2NvdW50IiwiY2hvb3NlUGF5bWVudE1ldGhvZCIsImNyZWRpdENhcmRGaWVsZHMiLCJhY2hGaWVsZHMiLCJ2YWxpZGF0ZUFuZFN1Ym1pdCIsImNhbGN1bGF0ZWRfYW1vdW50X3NlbGVjdG9yIiwiY2FsY3VsYXRlQW1vdW50IiwiY29uZmlybV9zdGVwX3NlbGVjdG9yIiwic2hvd05ld3NsZXR0ZXJTZXR0aW5ncyIsImNvbmZpcm1NZXNzYWdlU3VibWl0IiwiYiIsInAiLCJkZWNvZGVVUklDb21wb25lbnQiLCJsb2NhdGlvbiIsInNlYXJjaCIsInN1YnN0ciIsIm1lc3NhZ2UiLCJjb25zb2xlIiwibG9nIiwiZGlyIiwiZ2V0UXVlcnlTdHJpbmdzIiwibGluayIsInRoYXQiLCJ1c2V0YWJzIiwidGFicyIsInRpdGxlIiwicGFnZSIsIm5leHQiLCJzdGVwIiwiaW5kZXgiLCJuYXZfaXRlbV9jb3VudCIsIm9wcF9pZCIsIm9wcF9pZF9zZWxlY3RvciIsIm5leHRfc3RlcCIsInBvc3RfcHVyY2hhc2UiLCJjb25maXJtIiwiY29uZmlybV9idXR0b25fc2VsZWN0b3IiLCJhbmFseXRpY3NUcmFja2luZ1N0ZXAiLCJoaWRlIiwic2hvdyIsInBhcmVudCIsImdhIiwidG9Mb3dlckNhc2UiLCJwYXRobmFtZSIsImNhbGN1bGF0ZUZlZXMiLCJwYXltZW50X3R5cGUiLCJhamF4IiwibWV0aG9kIiwidXJsIiwiZG9uZSIsImZlZXMiLCJjcmVkaXRDYXJkRmVlQ2hlY2tib3giLCJmaWVsZCIsImZ1bGxfYW1vdW50IiwiaXMiLCJmdWxsX2Ftb3VudF9zZWxlY3RvciIsImFub255bW91c19zZWxlY3RvciIsIm5hbWVfc2VsZWN0b3IiLCJjaGFuZ2UiLCJyZXR1cm52YWx1ZSIsImxldmVsY2xhc3MiLCJhbW91bnRfeWVhcmx5IiwiZWFjaCIsImxldmVscyIsIm1heCIsIm1pbiIsImhvbm9yT3JNZW1vcnkiLCJob25vcl9vcl9tZW1vcnlfY2hvb3NlciIsImhvbm9yX21lbW9yeV9pbnB1dF9ncm91cCIsImhvbm9yX3NlbGVjdG9yIiwiaW5faG9ub3Jfb3JfbWVtb3J5X2ZpZWxkX3NlbGVjdG9yIiwiaG9ub3JfbmFtZV9zZWxlY3RvciIsIm1lbW9yeV9zZWxlY3RvciIsIm1lbW9yeV9uYW1lX3NlbGVjdG9yIiwic2hvd19iaWxsaW5nX2NvdW50cnlfc2VsZWN0b3IiLCJjbGljayIsImJpbGxpbmdfY291bnRyeV9zZWxlY3RvciIsInNob3dfc2hpcHBpbmdfY291bnRyeV9zZWxlY3RvciIsInNoaXBwaW5nX2NvdW50cnlfc2VsZWN0b3IiLCJzaG93X3NoaXBwaW5nIiwidXNlX2Zvcl9zaGlwcGluZ19zZWxlY3RvciIsInNoaXBwaW5nX3NlbGVjdG9yIiwiY2hhbmdlZCIsImFjY291bnRfZXhpc3RzIiwiZG9uZVR5cGluZyIsImVtYWlsIiwiZW1haWxfZmllbGRfc2VsZWN0b3IiLCJjaGVja01pbm5wb3N0QWNjb3VudEV4aXN0cyIsInR5cGluZ1RpbWVyIiwiZG9uZVR5cGluZ0ludGVydmFsIiwia2V5dXAiLCJjbGVhclRpbWVvdXQiLCJjcmVhdGVfbXBfc2VsZWN0b3IiLCJwYXNzd29yZF9zZWxlY3RvciIsImJlZm9yZSIsImdldCIsInRvZ2dsZSIsImRpc3BsYXlBbW91bnQiLCJzaW5nbGVfdW5pdF9wcmljZSIsInF1YW50aXR5IiwiYWRkaXRpb25hbF9hbW91bnQiLCJ2YWxpZF9jb2RlIiwibGV2ZWxjaGVjayIsImhhc19hZGRpdGlvbmFsX3RleHRfc2VsZWN0b3IiLCJodG1sIiwiYWRkaXRpb25hbF9hbW91bnRfc2VsZWN0b3IiLCJhZGRpdGlvbmFsX2Ftb3VudF9maWVsZCIsInF1YW50aXR5X3NlbGVjdG9yIiwicXVhbnRpdHlfZmllbGQiLCJzaW5nbGVfdW5pdF9wcmljZV9hdHRyaWJ1dGUiLCJzdWNjZXNzIiwiaXRlbV9zZWxlY3RvciIsInVzZXIiLCJtaW5ucG9zdF9yb290IiwicmVzdWx0Iiwic3RhdHVzIiwicmVhc29uIiwiY2hvb3NlX3BheW1lbnQiLCJjaGVja2VkIiwiY2hlY2tlZF92YWx1ZSIsInBheW1lbnRfbWV0aG9kX3NlbGVjdG9yIiwiZXZlbnQiLCJpZCIsImRvbmF0ZV9mb3JtX3NlbGVjdG9yIiwicHJlcGVuZCIsInN0eWxlIiwiYmFzZSIsImljb25Db2xvciIsImxpbmVIZWlnaHQiLCJmb250V2VpZ2h0IiwiZm9udEZhbWlseSIsImZvbnRTaXplIiwiY2FyZE51bWJlckVsZW1lbnQiLCJjcmVhdGUiLCJtb3VudCIsImNjX251bV9zZWxlY3RvciIsImNhcmRFeHBpcnlFbGVtZW50IiwiY2NfZXhwX3NlbGVjdG9yIiwiY2FyZEN2Y0VsZW1lbnQiLCJjY19jdnZfc2VsZWN0b3IiLCJzdHJpcGVFcnJvckRpc3BsYXkiLCJicmFuZCIsInNldEJyYW5kSWNvbiIsImNhcmRCcmFuZFRvUGZDbGFzcyIsImJyYW5kSWNvbkVsZW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInBmQ2xhc3MiLCJwbGFpZF9lbnYiLCJQbGFpZCIsImxpbmtIYW5kbGVyIiwic2VsZWN0QWNjb3VudCIsImFwaVZlcnNpb24iLCJlbnYiLCJjbGllbnROYW1lIiwicGxhaWRfcHVibGljX2tleSIsInByb2R1Y3QiLCJvbkxvYWQiLCJvblN1Y2Nlc3MiLCJwdWJsaWNfdG9rZW4iLCJtZXRhZGF0YSIsInN1cHBvcnRmb3JtIiwiYWNjb3VudF9pZCIsInNlcmlhbGl6ZSIsInJlc3BvbnNlIiwicGxhaWRfbGluayIsImFmdGVyIiwic3RyaXBlX2JhbmtfYWNjb3VudF90b2tlbiIsImNvbnRlbnRzIiwidW53cmFwIiwib25FeGl0IiwiZXJyIiwib3BlbiIsImhhc0h0bWw1VmFsaWRhdGlvbiIsImNyZWF0ZUVsZW1lbnQiLCJjaGVja1ZhbGlkaXR5IiwiYnV0dG9uU3RhdHVzIiwiYnV0dG9uIiwiZGlzYWJsZWQiLCJzdWJtaXQiLCJhbmltYXRlIiwic2Nyb2xsVG9wIiwib2Zmc2V0IiwidG9wIiwidmFsaWQiLCJwYXltZW50X21ldGhvZCIsImZ1bGxfbmFtZSIsInN0cmVldCIsImNpdHkiLCJzdGF0ZSIsInppcCIsImNvdW50cnkiLCJmaXJzdF9uYW1lIiwiZmlyc3RfbmFtZV9maWVsZF9zZWxlY3RvciIsImxhc3RfbmFtZSIsImxhc3RfbmFtZV9maWVsZF9zZWxlY3RvciIsInBhc3N3b3JkIiwicGFzc3dvcmRfZmllbGRfc2VsZWN0b3IiLCJhY2NvdW50X2NpdHlfc2VsZWN0b3IiLCJhY2NvdW50X3N0YXRlX3NlbGVjdG9yIiwiYWNjb3VudF96aXBfc2VsZWN0b3IiLCJjcmVhdGVUb2tlbiIsInN0cmlwZVRva2VuSGFuZGxlciIsInRoaXNfc2VsZWN0b3IiLCJ3aGljaF9lcnJvciIsImVtcHR5IiwidGhlbiIsInByZXYiLCJ0b2tlbiIsImNhY2hlIiwiZXJyb3JzIiwibmV3c2xldHRlcl9ncm91cF9zZWxlY3RvciIsImdldF9kYXRhIiwibWFpbGNoaW1wX3N0YXR1cyIsIm1haWxjaGltcF91c2VyX2lkIiwiZXhpc3RpbmdfbmV3c2xldHRlcl9zZXR0aW5ncyIsImNvbmZpcm1fZm9ybV9zZWxlY3RvciIsImNvbmZpcm1mb3JtIiwibmV3c2xldHRlcl9ncm91cHMiLCJtZXNzYWdlX2dyb3VwcyIsIm1lc3NhZ2VfZ3JvdXBfc2VsZWN0b3IiLCJuZXdfbmV3c2xldHRlcl9zZXR0aW5ncyIsInBvc3RfZGF0YSIsImdyb3Vwc19zdWJtaXR0ZWQiLCJncm91cHNfYXZhaWxhYmxlIiwiZ3JvdXAiLCJkYXRhVHlwZSIsImNvbnRlbnRUeXBlIiwiSlNPTiIsInN0cmluZ2lmeSIsImZhaWwiLCJmbiIsImpRdWVyeSJdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLENBQUMsVUFBU0EsQ0FBVCxFQUFXO0FBQUMsTUFBRyxRQUFPQyxPQUFQ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QS93Q1gsRUErd0NtQnlCLFFBL3dDbkIiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbihmKXtpZih0eXBlb2YgZXhwb3J0cz09PVwib2JqZWN0XCImJnR5cGVvZiBtb2R1bGUhPT1cInVuZGVmaW5lZFwiKXttb2R1bGUuZXhwb3J0cz1mKCl9ZWxzZSBpZih0eXBlb2YgZGVmaW5lPT09XCJmdW5jdGlvblwiJiZkZWZpbmUuYW1kKXtkZWZpbmUoW10sZil9ZWxzZXt2YXIgZztpZih0eXBlb2Ygd2luZG93IT09XCJ1bmRlZmluZWRcIil7Zz13aW5kb3d9ZWxzZSBpZih0eXBlb2YgZ2xvYmFsIT09XCJ1bmRlZmluZWRcIil7Zz1nbG9iYWx9ZWxzZSBpZih0eXBlb2Ygc2VsZiE9PVwidW5kZWZpbmVkXCIpe2c9c2VsZn1lbHNle2c9dGhpc30oZy5wYXltZW50IHx8IChnLnBheW1lbnQgPSB7fSkpLmpzID0gZigpfX0pKGZ1bmN0aW9uKCl7dmFyIGRlZmluZSxtb2R1bGUsZXhwb3J0cztyZXR1cm4gKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkoezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xudmFyIFFKLCBycmV0dXJuLCBydHJpbTtcblxuUUogPSBmdW5jdGlvbihzZWxlY3Rvcikge1xuICBpZiAoUUouaXNET01FbGVtZW50KHNlbGVjdG9yKSkge1xuICAgIHJldHVybiBzZWxlY3RvcjtcbiAgfVxuICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG59O1xuXG5RSi5pc0RPTUVsZW1lbnQgPSBmdW5jdGlvbihlbCkge1xuICByZXR1cm4gZWwgJiYgKGVsLm5vZGVOYW1lICE9IG51bGwpO1xufTtcblxucnRyaW0gPSAvXltcXHNcXHVGRUZGXFx4QTBdK3xbXFxzXFx1RkVGRlxceEEwXSskL2c7XG5cblFKLnRyaW0gPSBmdW5jdGlvbih0ZXh0KSB7XG4gIGlmICh0ZXh0ID09PSBudWxsKSB7XG4gICAgcmV0dXJuIFwiXCI7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICh0ZXh0ICsgXCJcIikucmVwbGFjZShydHJpbSwgXCJcIik7XG4gIH1cbn07XG5cbnJyZXR1cm4gPSAvXFxyL2c7XG5cblFKLnZhbCA9IGZ1bmN0aW9uKGVsLCB2YWwpIHtcbiAgdmFyIHJldDtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgcmV0dXJuIGVsLnZhbHVlID0gdmFsO1xuICB9IGVsc2Uge1xuICAgIHJldCA9IGVsLnZhbHVlO1xuICAgIGlmICh0eXBlb2YgcmV0ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICByZXR1cm4gcmV0LnJlcGxhY2UocnJldHVybiwgXCJcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChyZXQgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuUUoucHJldmVudERlZmF1bHQgPSBmdW5jdGlvbihldmVudE9iamVjdCkge1xuICBpZiAodHlwZW9mIGV2ZW50T2JqZWN0LnByZXZlbnREZWZhdWx0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBldmVudE9iamVjdC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybjtcbiAgfVxuICBldmVudE9iamVjdC5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICByZXR1cm4gZmFsc2U7XG59O1xuXG5RSi5ub3JtYWxpemVFdmVudCA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIG9yaWdpbmFsO1xuICBvcmlnaW5hbCA9IGU7XG4gIGUgPSB7XG4gICAgd2hpY2g6IG9yaWdpbmFsLndoaWNoICE9IG51bGwgPyBvcmlnaW5hbC53aGljaCA6IHZvaWQgMCxcbiAgICB0YXJnZXQ6IG9yaWdpbmFsLnRhcmdldCB8fCBvcmlnaW5hbC5zcmNFbGVtZW50LFxuICAgIHByZXZlbnREZWZhdWx0OiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBRSi5wcmV2ZW50RGVmYXVsdChvcmlnaW5hbCk7XG4gICAgfSxcbiAgICBvcmlnaW5hbEV2ZW50OiBvcmlnaW5hbCxcbiAgICBkYXRhOiBvcmlnaW5hbC5kYXRhIHx8IG9yaWdpbmFsLmRldGFpbFxuICB9O1xuICBpZiAoZS53aGljaCA9PSBudWxsKSB7XG4gICAgZS53aGljaCA9IG9yaWdpbmFsLmNoYXJDb2RlICE9IG51bGwgPyBvcmlnaW5hbC5jaGFyQ29kZSA6IG9yaWdpbmFsLmtleUNvZGU7XG4gIH1cbiAgcmV0dXJuIGU7XG59O1xuXG5RSi5vbiA9IGZ1bmN0aW9uKGVsZW1lbnQsIGV2ZW50TmFtZSwgY2FsbGJhY2spIHtcbiAgdmFyIGVsLCBpLCBqLCBsZW4sIGxlbjEsIG11bHRFdmVudE5hbWUsIG9yaWdpbmFsQ2FsbGJhY2ssIHJlZjtcbiAgaWYgKGVsZW1lbnQubGVuZ3RoKSB7XG4gICAgZm9yIChpID0gMCwgbGVuID0gZWxlbWVudC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgZWwgPSBlbGVtZW50W2ldO1xuICAgICAgUUoub24oZWwsIGV2ZW50TmFtZSwgY2FsbGJhY2spO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGV2ZW50TmFtZS5tYXRjaChcIiBcIikpIHtcbiAgICByZWYgPSBldmVudE5hbWUuc3BsaXQoXCIgXCIpO1xuICAgIGZvciAoaiA9IDAsIGxlbjEgPSByZWYubGVuZ3RoOyBqIDwgbGVuMTsgaisrKSB7XG4gICAgICBtdWx0RXZlbnROYW1lID0gcmVmW2pdO1xuICAgICAgUUoub24oZWxlbWVudCwgbXVsdEV2ZW50TmFtZSwgY2FsbGJhY2spO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cbiAgb3JpZ2luYWxDYWxsYmFjayA9IGNhbGxiYWNrO1xuICBjYWxsYmFjayA9IGZ1bmN0aW9uKGUpIHtcbiAgICBlID0gUUoubm9ybWFsaXplRXZlbnQoZSk7XG4gICAgcmV0dXJuIG9yaWdpbmFsQ2FsbGJhY2soZSk7XG4gIH07XG4gIGlmIChlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICByZXR1cm4gZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgY2FsbGJhY2ssIGZhbHNlKTtcbiAgfVxuICBpZiAoZWxlbWVudC5hdHRhY2hFdmVudCkge1xuICAgIGV2ZW50TmFtZSA9IFwib25cIiArIGV2ZW50TmFtZTtcbiAgICByZXR1cm4gZWxlbWVudC5hdHRhY2hFdmVudChldmVudE5hbWUsIGNhbGxiYWNrKTtcbiAgfVxuICBlbGVtZW50WydvbicgKyBldmVudE5hbWVdID0gY2FsbGJhY2s7XG59O1xuXG5RSi5hZGRDbGFzcyA9IGZ1bmN0aW9uKGVsLCBjbGFzc05hbWUpIHtcbiAgdmFyIGU7XG4gIGlmIChlbC5sZW5ndGgpIHtcbiAgICByZXR1cm4gKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGksIGxlbiwgcmVzdWx0cztcbiAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgIGZvciAoaSA9IDAsIGxlbiA9IGVsLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGUgPSBlbFtpXTtcbiAgICAgICAgcmVzdWx0cy5wdXNoKFFKLmFkZENsYXNzKGUsIGNsYXNzTmFtZSkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfSkoKTtcbiAgfVxuICBpZiAoZWwuY2xhc3NMaXN0KSB7XG4gICAgcmV0dXJuIGVsLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZWwuY2xhc3NOYW1lICs9ICcgJyArIGNsYXNzTmFtZTtcbiAgfVxufTtcblxuUUouaGFzQ2xhc3MgPSBmdW5jdGlvbihlbCwgY2xhc3NOYW1lKSB7XG4gIHZhciBlLCBoYXNDbGFzcywgaSwgbGVuO1xuICBpZiAoZWwubGVuZ3RoKSB7XG4gICAgaGFzQ2xhc3MgPSB0cnVlO1xuICAgIGZvciAoaSA9IDAsIGxlbiA9IGVsLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBlID0gZWxbaV07XG4gICAgICBoYXNDbGFzcyA9IGhhc0NsYXNzICYmIFFKLmhhc0NsYXNzKGUsIGNsYXNzTmFtZSk7XG4gICAgfVxuICAgIHJldHVybiBoYXNDbGFzcztcbiAgfVxuICBpZiAoZWwuY2xhc3NMaXN0KSB7XG4gICAgcmV0dXJuIGVsLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgUmVnRXhwKCcoXnwgKScgKyBjbGFzc05hbWUgKyAnKCB8JCknLCAnZ2knKS50ZXN0KGVsLmNsYXNzTmFtZSk7XG4gIH1cbn07XG5cblFKLnJlbW92ZUNsYXNzID0gZnVuY3Rpb24oZWwsIGNsYXNzTmFtZSkge1xuICB2YXIgY2xzLCBlLCBpLCBsZW4sIHJlZiwgcmVzdWx0cztcbiAgaWYgKGVsLmxlbmd0aCkge1xuICAgIHJldHVybiAoZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaSwgbGVuLCByZXN1bHRzO1xuICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgZm9yIChpID0gMCwgbGVuID0gZWwubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgZSA9IGVsW2ldO1xuICAgICAgICByZXN1bHRzLnB1c2goUUoucmVtb3ZlQ2xhc3MoZSwgY2xhc3NOYW1lKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9KSgpO1xuICB9XG4gIGlmIChlbC5jbGFzc0xpc3QpIHtcbiAgICByZWYgPSBjbGFzc05hbWUuc3BsaXQoJyAnKTtcbiAgICByZXN1bHRzID0gW107XG4gICAgZm9yIChpID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBjbHMgPSByZWZbaV07XG4gICAgICByZXN1bHRzLnB1c2goZWwuY2xhc3NMaXN0LnJlbW92ZShjbHMpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGVsLmNsYXNzTmFtZSA9IGVsLmNsYXNzTmFtZS5yZXBsYWNlKG5ldyBSZWdFeHAoJyhefFxcXFxiKScgKyBjbGFzc05hbWUuc3BsaXQoJyAnKS5qb2luKCd8JykgKyAnKFxcXFxifCQpJywgJ2dpJyksICcgJyk7XG4gIH1cbn07XG5cblFKLnRvZ2dsZUNsYXNzID0gZnVuY3Rpb24oZWwsIGNsYXNzTmFtZSwgYm9vbCkge1xuICB2YXIgZTtcbiAgaWYgKGVsLmxlbmd0aCkge1xuICAgIHJldHVybiAoZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaSwgbGVuLCByZXN1bHRzO1xuICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgZm9yIChpID0gMCwgbGVuID0gZWwubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgZSA9IGVsW2ldO1xuICAgICAgICByZXN1bHRzLnB1c2goUUoudG9nZ2xlQ2xhc3MoZSwgY2xhc3NOYW1lLCBib29sKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9KSgpO1xuICB9XG4gIGlmIChib29sKSB7XG4gICAgaWYgKCFRSi5oYXNDbGFzcyhlbCwgY2xhc3NOYW1lKSkge1xuICAgICAgcmV0dXJuIFFKLmFkZENsYXNzKGVsLCBjbGFzc05hbWUpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gUUoucmVtb3ZlQ2xhc3MoZWwsIGNsYXNzTmFtZSk7XG4gIH1cbn07XG5cblFKLmFwcGVuZCA9IGZ1bmN0aW9uKGVsLCB0b0FwcGVuZCkge1xuICB2YXIgZTtcbiAgaWYgKGVsLmxlbmd0aCkge1xuICAgIHJldHVybiAoZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaSwgbGVuLCByZXN1bHRzO1xuICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgZm9yIChpID0gMCwgbGVuID0gZWwubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgZSA9IGVsW2ldO1xuICAgICAgICByZXN1bHRzLnB1c2goUUouYXBwZW5kKGUsIHRvQXBwZW5kKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9KSgpO1xuICB9XG4gIHJldHVybiBlbC5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIHRvQXBwZW5kKTtcbn07XG5cblFKLmZpbmQgPSBmdW5jdGlvbihlbCwgc2VsZWN0b3IpIHtcbiAgaWYgKGVsIGluc3RhbmNlb2YgTm9kZUxpc3QgfHwgZWwgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgIGVsID0gZWxbMF07XG4gIH1cbiAgcmV0dXJuIGVsLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xufTtcblxuUUoudHJpZ2dlciA9IGZ1bmN0aW9uKGVsLCBuYW1lLCBkYXRhKSB7XG4gIHZhciBlLCBlcnJvciwgZXY7XG4gIHRyeSB7XG4gICAgZXYgPSBuZXcgQ3VzdG9tRXZlbnQobmFtZSwge1xuICAgICAgZGV0YWlsOiBkYXRhXG4gICAgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgZSA9IGVycm9yO1xuICAgIGV2ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG4gICAgaWYgKGV2LmluaXRDdXN0b21FdmVudCkge1xuICAgICAgZXYuaW5pdEN1c3RvbUV2ZW50KG5hbWUsIHRydWUsIHRydWUsIGRhdGEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBldi5pbml0RXZlbnQobmFtZSwgdHJ1ZSwgdHJ1ZSwgZGF0YSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBlbC5kaXNwYXRjaEV2ZW50KGV2KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUUo7XG5cblxufSx7fV0sMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4oZnVuY3Rpb24gKGdsb2JhbCl7XG52YXIgUGF5bWVudCwgUUosIGNhcmRGcm9tTnVtYmVyLCBjYXJkRnJvbVR5cGUsIGNhcmRzLCBkZWZhdWx0Rm9ybWF0LCBmb3JtYXRCYWNrQ2FyZE51bWJlciwgZm9ybWF0QmFja0V4cGlyeSwgZm9ybWF0Q2FyZE51bWJlciwgZm9ybWF0RXhwaXJ5LCBmb3JtYXRGb3J3YXJkRXhwaXJ5LCBmb3JtYXRGb3J3YXJkU2xhc2gsIGZvcm1hdE1vbnRoRXhwaXJ5LCBoYXNUZXh0U2VsZWN0ZWQsIGx1aG5DaGVjaywgcmVGb3JtYXRDYXJkTnVtYmVyLCByZXN0cmljdENWQywgcmVzdHJpY3RDYXJkTnVtYmVyLCByZXN0cmljdENvbWJpbmVkRXhwaXJ5LCByZXN0cmljdEV4cGlyeSwgcmVzdHJpY3RNb250aEV4cGlyeSwgcmVzdHJpY3ROdW1lcmljLCByZXN0cmljdFllYXJFeHBpcnksIHNldENhcmRUeXBlLFxuICBpbmRleE9mID0gW10uaW5kZXhPZiB8fCBmdW5jdGlvbihpdGVtKSB7IGZvciAodmFyIGkgPSAwLCBsID0gdGhpcy5sZW5ndGg7IGkgPCBsOyBpKyspIHsgaWYgKGkgaW4gdGhpcyAmJiB0aGlzW2ldID09PSBpdGVtKSByZXR1cm4gaTsgfSByZXR1cm4gLTE7IH07XG5cblFKID0gcmVxdWlyZSgncWovc3JjL3FqLmNvZmZlZScpO1xuXG5kZWZhdWx0Rm9ybWF0ID0gLyhcXGR7MSw0fSkvZztcblxuY2FyZHMgPSBbXG4gIHtcbiAgICB0eXBlOiAnYW1leCcsXG4gICAgcGF0dGVybjogL14zWzQ3XS8sXG4gICAgZm9ybWF0OiAvKFxcZHsxLDR9KShcXGR7MSw2fSk/KFxcZHsxLDV9KT8vLFxuICAgIGxlbmd0aDogWzE1XSxcbiAgICBjdmNMZW5ndGg6IFs0XSxcbiAgICBsdWhuOiB0cnVlXG4gIH0sIHtcbiAgICB0eXBlOiAnZGFua29ydCcsXG4gICAgcGF0dGVybjogL141MDE5LyxcbiAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgbGVuZ3RoOiBbMTZdLFxuICAgIGN2Y0xlbmd0aDogWzNdLFxuICAgIGx1aG46IHRydWVcbiAgfSwge1xuICAgIHR5cGU6ICdkaW5lcnNjbHViJyxcbiAgICBwYXR0ZXJuOiAvXigzNnwzOHwzMFswLTVdKS8sXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGxlbmd0aDogWzE0XSxcbiAgICBjdmNMZW5ndGg6IFszXSxcbiAgICBsdWhuOiB0cnVlXG4gIH0sIHtcbiAgICB0eXBlOiAnZGlzY292ZXInLFxuICAgIHBhdHRlcm46IC9eKDYwMTF8NjV8NjRbNC05XXw2MjIpLyxcbiAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgbGVuZ3RoOiBbMTZdLFxuICAgIGN2Y0xlbmd0aDogWzNdLFxuICAgIGx1aG46IHRydWVcbiAgfSwge1xuICAgIHR5cGU6ICdqY2InLFxuICAgIHBhdHRlcm46IC9eMzUvLFxuICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICBsZW5ndGg6IFsxNl0sXG4gICAgY3ZjTGVuZ3RoOiBbM10sXG4gICAgbHVobjogdHJ1ZVxuICB9LCB7XG4gICAgdHlwZTogJ2xhc2VyJyxcbiAgICBwYXR0ZXJuOiAvXig2NzA2fDY3NzF8NjcwOSkvLFxuICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICBsZW5ndGg6IFsxNiwgMTcsIDE4LCAxOV0sXG4gICAgY3ZjTGVuZ3RoOiBbM10sXG4gICAgbHVobjogdHJ1ZVxuICB9LCB7XG4gICAgdHlwZTogJ21hZXN0cm8nLFxuICAgIHBhdHRlcm46IC9eKDUwMTh8NTAyMHw1MDM4fDYzMDR8NjcwM3w2NzU5fDY3NlsxLTNdKS8sXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGxlbmd0aDogWzEyLCAxMywgMTQsIDE1LCAxNiwgMTcsIDE4LCAxOV0sXG4gICAgY3ZjTGVuZ3RoOiBbM10sXG4gICAgbHVobjogdHJ1ZVxuICB9LCB7XG4gICAgdHlwZTogJ21hc3RlcmNhcmQnLFxuICAgIHBhdHRlcm46IC9eNVsxLTVdLyxcbiAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgbGVuZ3RoOiBbMTZdLFxuICAgIGN2Y0xlbmd0aDogWzNdLFxuICAgIGx1aG46IHRydWVcbiAgfSwge1xuICAgIHR5cGU6ICd1bmlvbnBheScsXG4gICAgcGF0dGVybjogL142Mi8sXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGxlbmd0aDogWzE2LCAxNywgMTgsIDE5XSxcbiAgICBjdmNMZW5ndGg6IFszXSxcbiAgICBsdWhuOiBmYWxzZVxuICB9LCB7XG4gICAgdHlwZTogJ3Zpc2FlbGVjdHJvbicsXG4gICAgcGF0dGVybjogL140KDAyNnwxNzUwMHw0MDV8NTA4fDg0NHw5MVszN10pLyxcbiAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgbGVuZ3RoOiBbMTZdLFxuICAgIGN2Y0xlbmd0aDogWzNdLFxuICAgIGx1aG46IHRydWVcbiAgfSwge1xuICAgIHR5cGU6ICd2aXNhJyxcbiAgICBwYXR0ZXJuOiAvXjQvLFxuICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICBsZW5ndGg6IFsxMywgMTZdLFxuICAgIGN2Y0xlbmd0aDogWzNdLFxuICAgIGx1aG46IHRydWVcbiAgfSwge1xuICAgIHR5cGU6ICdlbG8nLFxuICAgIHBhdHRlcm46IC9eNDAxMXw0Mzg5MzV8NDUoMTQxNnw3Nil8NTAoNDE3NXw2Njk5fDY3fDkwWzQtN10pfDYzKDYyOTd8NjM2OCkvLFxuICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICBsZW5ndGg6IFsxNl0sXG4gICAgY3ZjTGVuZ3RoOiBbM10sXG4gICAgbHVobjogdHJ1ZVxuICB9XG5dO1xuXG5jYXJkRnJvbU51bWJlciA9IGZ1bmN0aW9uKG51bSkge1xuICB2YXIgY2FyZCwgaSwgbGVuO1xuICBudW0gPSAobnVtICsgJycpLnJlcGxhY2UoL1xcRC9nLCAnJyk7XG4gIGZvciAoaSA9IDAsIGxlbiA9IGNhcmRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgY2FyZCA9IGNhcmRzW2ldO1xuICAgIGlmIChjYXJkLnBhdHRlcm4udGVzdChudW0pKSB7XG4gICAgICByZXR1cm4gY2FyZDtcbiAgICB9XG4gIH1cbn07XG5cbmNhcmRGcm9tVHlwZSA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIGNhcmQsIGksIGxlbjtcbiAgZm9yIChpID0gMCwgbGVuID0gY2FyZHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBjYXJkID0gY2FyZHNbaV07XG4gICAgaWYgKGNhcmQudHlwZSA9PT0gdHlwZSkge1xuICAgICAgcmV0dXJuIGNhcmQ7XG4gICAgfVxuICB9XG59O1xuXG5sdWhuQ2hlY2sgPSBmdW5jdGlvbihudW0pIHtcbiAgdmFyIGRpZ2l0LCBkaWdpdHMsIGksIGxlbiwgb2RkLCBzdW07XG4gIG9kZCA9IHRydWU7XG4gIHN1bSA9IDA7XG4gIGRpZ2l0cyA9IChudW0gKyAnJykuc3BsaXQoJycpLnJldmVyc2UoKTtcbiAgZm9yIChpID0gMCwgbGVuID0gZGlnaXRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgZGlnaXQgPSBkaWdpdHNbaV07XG4gICAgZGlnaXQgPSBwYXJzZUludChkaWdpdCwgMTApO1xuICAgIGlmICgob2RkID0gIW9kZCkpIHtcbiAgICAgIGRpZ2l0ICo9IDI7XG4gICAgfVxuICAgIGlmIChkaWdpdCA+IDkpIHtcbiAgICAgIGRpZ2l0IC09IDk7XG4gICAgfVxuICAgIHN1bSArPSBkaWdpdDtcbiAgfVxuICByZXR1cm4gc3VtICUgMTAgPT09IDA7XG59O1xuXG5oYXNUZXh0U2VsZWN0ZWQgPSBmdW5jdGlvbih0YXJnZXQpIHtcbiAgdmFyIHJlZjtcbiAgaWYgKCh0YXJnZXQuc2VsZWN0aW9uU3RhcnQgIT0gbnVsbCkgJiYgdGFyZ2V0LnNlbGVjdGlvblN0YXJ0ICE9PSB0YXJnZXQuc2VsZWN0aW9uRW5kKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKCh0eXBlb2YgZG9jdW1lbnQgIT09IFwidW5kZWZpbmVkXCIgJiYgZG9jdW1lbnQgIT09IG51bGwgPyAocmVmID0gZG9jdW1lbnQuc2VsZWN0aW9uKSAhPSBudWxsID8gcmVmLmNyZWF0ZVJhbmdlIDogdm9pZCAwIDogdm9pZCAwKSAhPSBudWxsKSB7XG4gICAgaWYgKGRvY3VtZW50LnNlbGVjdGlvbi5jcmVhdGVSYW5nZSgpLnRleHQpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuXG5yZUZvcm1hdENhcmROdW1iZXIgPSBmdW5jdGlvbihlKSB7XG4gIHJldHVybiBzZXRUaW1lb3V0KChmdW5jdGlvbihfdGhpcykge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciB0YXJnZXQsIHZhbHVlO1xuICAgICAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgICB2YWx1ZSA9IFFKLnZhbCh0YXJnZXQpO1xuICAgICAgdmFsdWUgPSBQYXltZW50LmZucy5mb3JtYXRDYXJkTnVtYmVyKHZhbHVlKTtcbiAgICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCB2YWx1ZSk7XG4gICAgfTtcbiAgfSkodGhpcykpO1xufTtcblxuZm9ybWF0Q2FyZE51bWJlciA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIGNhcmQsIGRpZ2l0LCBsZW5ndGgsIHJlLCB0YXJnZXQsIHVwcGVyTGVuZ3RoLCB2YWx1ZTtcbiAgZGlnaXQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpO1xuICBpZiAoIS9eXFxkKyQvLnRlc3QoZGlnaXQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRhcmdldCA9IGUudGFyZ2V0O1xuICB2YWx1ZSA9IFFKLnZhbCh0YXJnZXQpO1xuICBjYXJkID0gY2FyZEZyb21OdW1iZXIodmFsdWUgKyBkaWdpdCk7XG4gIGxlbmd0aCA9ICh2YWx1ZS5yZXBsYWNlKC9cXEQvZywgJycpICsgZGlnaXQpLmxlbmd0aDtcbiAgdXBwZXJMZW5ndGggPSAxNjtcbiAgaWYgKGNhcmQpIHtcbiAgICB1cHBlckxlbmd0aCA9IGNhcmQubGVuZ3RoW2NhcmQubGVuZ3RoLmxlbmd0aCAtIDFdO1xuICB9XG4gIGlmIChsZW5ndGggPj0gdXBwZXJMZW5ndGgpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKCh0YXJnZXQuc2VsZWN0aW9uU3RhcnQgIT0gbnVsbCkgJiYgdGFyZ2V0LnNlbGVjdGlvblN0YXJ0ICE9PSB2YWx1ZS5sZW5ndGgpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGNhcmQgJiYgY2FyZC50eXBlID09PSAnYW1leCcpIHtcbiAgICByZSA9IC9eKFxcZHs0fXxcXGR7NH1cXHNcXGR7Nn0pJC87XG4gIH0gZWxzZSB7XG4gICAgcmUgPSAvKD86XnxcXHMpKFxcZHs0fSkkLztcbiAgfVxuICBpZiAocmUudGVzdCh2YWx1ZSkpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIHZhbHVlICsgJyAnICsgZGlnaXQpO1xuICB9IGVsc2UgaWYgKHJlLnRlc3QodmFsdWUgKyBkaWdpdCkpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIHZhbHVlICsgZGlnaXQgKyAnICcpO1xuICB9XG59O1xuXG5mb3JtYXRCYWNrQ2FyZE51bWJlciA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIHRhcmdldCwgdmFsdWU7XG4gIHRhcmdldCA9IGUudGFyZ2V0O1xuICB2YWx1ZSA9IFFKLnZhbCh0YXJnZXQpO1xuICBpZiAoZS5tZXRhKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChlLndoaWNoICE9PSA4KSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICgodGFyZ2V0LnNlbGVjdGlvblN0YXJ0ICE9IG51bGwpICYmIHRhcmdldC5zZWxlY3Rpb25TdGFydCAhPT0gdmFsdWUubGVuZ3RoKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICgvXFxkXFxzJC8udGVzdCh2YWx1ZSkpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIHZhbHVlLnJlcGxhY2UoL1xcZFxccyQvLCAnJykpO1xuICB9IGVsc2UgaWYgKC9cXHNcXGQ/JC8udGVzdCh2YWx1ZSkpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIHZhbHVlLnJlcGxhY2UoL1xcc1xcZD8kLywgJycpKTtcbiAgfVxufTtcblxuZm9ybWF0RXhwaXJ5ID0gZnVuY3Rpb24oZSkge1xuICB2YXIgZGlnaXQsIHRhcmdldCwgdmFsO1xuICBkaWdpdCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZS53aGljaCk7XG4gIGlmICghL15cXGQrJC8udGVzdChkaWdpdCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gIHZhbCA9IFFKLnZhbCh0YXJnZXQpICsgZGlnaXQ7XG4gIGlmICgvXlxcZCQvLnRlc3QodmFsKSAmJiAodmFsICE9PSAnMCcgJiYgdmFsICE9PSAnMScpKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCBcIjBcIiArIHZhbCArIFwiIC8gXCIpO1xuICB9IGVsc2UgaWYgKC9eXFxkXFxkJC8udGVzdCh2YWwpKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCB2YWwgKyBcIiAvIFwiKTtcbiAgfVxufTtcblxuZm9ybWF0TW9udGhFeHBpcnkgPSBmdW5jdGlvbihlKSB7XG4gIHZhciBkaWdpdCwgdGFyZ2V0LCB2YWw7XG4gIGRpZ2l0ID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKTtcbiAgaWYgKCEvXlxcZCskLy50ZXN0KGRpZ2l0KSkge1xuICAgIHJldHVybjtcbiAgfVxuICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgdmFsID0gUUoudmFsKHRhcmdldCkgKyBkaWdpdDtcbiAgaWYgKC9eXFxkJC8udGVzdCh2YWwpICYmICh2YWwgIT09ICcwJyAmJiB2YWwgIT09ICcxJykpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIFwiMFwiICsgdmFsKTtcbiAgfSBlbHNlIGlmICgvXlxcZFxcZCQvLnRlc3QodmFsKSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgXCJcIiArIHZhbCk7XG4gIH1cbn07XG5cbmZvcm1hdEZvcndhcmRFeHBpcnkgPSBmdW5jdGlvbihlKSB7XG4gIHZhciBkaWdpdCwgdGFyZ2V0LCB2YWw7XG4gIGRpZ2l0ID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKTtcbiAgaWYgKCEvXlxcZCskLy50ZXN0KGRpZ2l0KSkge1xuICAgIHJldHVybjtcbiAgfVxuICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgdmFsID0gUUoudmFsKHRhcmdldCk7XG4gIGlmICgvXlxcZFxcZCQvLnRlc3QodmFsKSkge1xuICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCB2YWwgKyBcIiAvIFwiKTtcbiAgfVxufTtcblxuZm9ybWF0Rm9yd2FyZFNsYXNoID0gZnVuY3Rpb24oZSkge1xuICB2YXIgc2xhc2gsIHRhcmdldCwgdmFsO1xuICBzbGFzaCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZS53aGljaCk7XG4gIGlmIChzbGFzaCAhPT0gJy8nKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRhcmdldCA9IGUudGFyZ2V0O1xuICB2YWwgPSBRSi52YWwodGFyZ2V0KTtcbiAgaWYgKC9eXFxkJC8udGVzdCh2YWwpICYmIHZhbCAhPT0gJzAnKSB7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIFwiMFwiICsgdmFsICsgXCIgLyBcIik7XG4gIH1cbn07XG5cbmZvcm1hdEJhY2tFeHBpcnkgPSBmdW5jdGlvbihlKSB7XG4gIHZhciB0YXJnZXQsIHZhbHVlO1xuICBpZiAoZS5tZXRhS2V5KSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRhcmdldCA9IGUudGFyZ2V0O1xuICB2YWx1ZSA9IFFKLnZhbCh0YXJnZXQpO1xuICBpZiAoZS53aGljaCAhPT0gOCkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoKHRhcmdldC5zZWxlY3Rpb25TdGFydCAhPSBudWxsKSAmJiB0YXJnZXQuc2VsZWN0aW9uU3RhcnQgIT09IHZhbHVlLmxlbmd0aCkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoL1xcZChcXHN8XFwvKSskLy50ZXN0KHZhbHVlKSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgdmFsdWUucmVwbGFjZSgvXFxkKFxcc3xcXC8pKiQvLCAnJykpO1xuICB9IGVsc2UgaWYgKC9cXHNcXC9cXHM/XFxkPyQvLnRlc3QodmFsdWUpKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCB2YWx1ZS5yZXBsYWNlKC9cXHNcXC9cXHM/XFxkPyQvLCAnJykpO1xuICB9XG59O1xuXG5yZXN0cmljdE51bWVyaWMgPSBmdW5jdGlvbihlKSB7XG4gIHZhciBpbnB1dDtcbiAgaWYgKGUubWV0YUtleSB8fCBlLmN0cmxLZXkpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAoZS53aGljaCA9PT0gMzIpIHtcbiAgICByZXR1cm4gZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG4gIGlmIChlLndoaWNoID09PSAwKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKGUud2hpY2ggPCAzMykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlucHV0ID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKTtcbiAgaWYgKCEvW1xcZFxcc10vLnRlc3QoaW5wdXQpKSB7XG4gICAgcmV0dXJuIGUucHJldmVudERlZmF1bHQoKTtcbiAgfVxufTtcblxucmVzdHJpY3RDYXJkTnVtYmVyID0gZnVuY3Rpb24oZSkge1xuICB2YXIgY2FyZCwgZGlnaXQsIHRhcmdldCwgdmFsdWU7XG4gIHRhcmdldCA9IGUudGFyZ2V0O1xuICBkaWdpdCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZS53aGljaCk7XG4gIGlmICghL15cXGQrJC8udGVzdChkaWdpdCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGhhc1RleHRTZWxlY3RlZCh0YXJnZXQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhbHVlID0gKFFKLnZhbCh0YXJnZXQpICsgZGlnaXQpLnJlcGxhY2UoL1xcRC9nLCAnJyk7XG4gIGNhcmQgPSBjYXJkRnJvbU51bWJlcih2YWx1ZSk7XG4gIGlmIChjYXJkKSB7XG4gICAgaWYgKCEodmFsdWUubGVuZ3RoIDw9IGNhcmQubGVuZ3RoW2NhcmQubGVuZ3RoLmxlbmd0aCAtIDFdKSkge1xuICAgICAgcmV0dXJuIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKCEodmFsdWUubGVuZ3RoIDw9IDE2KSkge1xuICAgICAgcmV0dXJuIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH1cbn07XG5cbnJlc3RyaWN0RXhwaXJ5ID0gZnVuY3Rpb24oZSwgbGVuZ3RoKSB7XG4gIHZhciBkaWdpdCwgdGFyZ2V0LCB2YWx1ZTtcbiAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gIGRpZ2l0ID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKTtcbiAgaWYgKCEvXlxcZCskLy50ZXN0KGRpZ2l0KSkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoaGFzVGV4dFNlbGVjdGVkKHRhcmdldCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFsdWUgPSBRSi52YWwodGFyZ2V0KSArIGRpZ2l0O1xuICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1xcRC9nLCAnJyk7XG4gIGlmICh2YWx1ZS5sZW5ndGggPiBsZW5ndGgpIHtcbiAgICByZXR1cm4gZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG59O1xuXG5yZXN0cmljdENvbWJpbmVkRXhwaXJ5ID0gZnVuY3Rpb24oZSkge1xuICByZXR1cm4gcmVzdHJpY3RFeHBpcnkoZSwgNik7XG59O1xuXG5yZXN0cmljdE1vbnRoRXhwaXJ5ID0gZnVuY3Rpb24oZSkge1xuICByZXR1cm4gcmVzdHJpY3RFeHBpcnkoZSwgMik7XG59O1xuXG5yZXN0cmljdFllYXJFeHBpcnkgPSBmdW5jdGlvbihlKSB7XG4gIHJldHVybiByZXN0cmljdEV4cGlyeShlLCA0KTtcbn07XG5cbnJlc3RyaWN0Q1ZDID0gZnVuY3Rpb24oZSkge1xuICB2YXIgZGlnaXQsIHRhcmdldCwgdmFsO1xuICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgZGlnaXQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpO1xuICBpZiAoIS9eXFxkKyQvLnRlc3QoZGlnaXQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChoYXNUZXh0U2VsZWN0ZWQodGFyZ2V0KSkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YWwgPSBRSi52YWwodGFyZ2V0KSArIGRpZ2l0O1xuICBpZiAoISh2YWwubGVuZ3RoIDw9IDQpKSB7XG4gICAgcmV0dXJuIGUucHJldmVudERlZmF1bHQoKTtcbiAgfVxufTtcblxuc2V0Q2FyZFR5cGUgPSBmdW5jdGlvbihlKSB7XG4gIHZhciBhbGxUeXBlcywgY2FyZCwgY2FyZFR5cGUsIHRhcmdldCwgdmFsO1xuICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgdmFsID0gUUoudmFsKHRhcmdldCk7XG4gIGNhcmRUeXBlID0gUGF5bWVudC5mbnMuY2FyZFR5cGUodmFsKSB8fCAndW5rbm93bic7XG4gIGlmICghUUouaGFzQ2xhc3ModGFyZ2V0LCBjYXJkVHlwZSkpIHtcbiAgICBhbGxUeXBlcyA9IChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBpLCBsZW4sIHJlc3VsdHM7XG4gICAgICByZXN1bHRzID0gW107XG4gICAgICBmb3IgKGkgPSAwLCBsZW4gPSBjYXJkcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBjYXJkID0gY2FyZHNbaV07XG4gICAgICAgIHJlc3VsdHMucHVzaChjYXJkLnR5cGUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfSkoKTtcbiAgICBRSi5yZW1vdmVDbGFzcyh0YXJnZXQsICd1bmtub3duJyk7XG4gICAgUUoucmVtb3ZlQ2xhc3ModGFyZ2V0LCBhbGxUeXBlcy5qb2luKCcgJykpO1xuICAgIFFKLmFkZENsYXNzKHRhcmdldCwgY2FyZFR5cGUpO1xuICAgIFFKLnRvZ2dsZUNsYXNzKHRhcmdldCwgJ2lkZW50aWZpZWQnLCBjYXJkVHlwZSAhPT0gJ3Vua25vd24nKTtcbiAgICByZXR1cm4gUUoudHJpZ2dlcih0YXJnZXQsICdwYXltZW50LmNhcmRUeXBlJywgY2FyZFR5cGUpO1xuICB9XG59O1xuXG5QYXltZW50ID0gKGZ1bmN0aW9uKCkge1xuICBmdW5jdGlvbiBQYXltZW50KCkge31cblxuICBQYXltZW50LmZucyA9IHtcbiAgICBjYXJkRXhwaXJ5VmFsOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgdmFyIG1vbnRoLCBwcmVmaXgsIHJlZiwgeWVhcjtcbiAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvXFxzL2csICcnKTtcbiAgICAgIHJlZiA9IHZhbHVlLnNwbGl0KCcvJywgMiksIG1vbnRoID0gcmVmWzBdLCB5ZWFyID0gcmVmWzFdO1xuICAgICAgaWYgKCh5ZWFyICE9IG51bGwgPyB5ZWFyLmxlbmd0aCA6IHZvaWQgMCkgPT09IDIgJiYgL15cXGQrJC8udGVzdCh5ZWFyKSkge1xuICAgICAgICBwcmVmaXggPSAobmV3IERhdGUpLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgIHByZWZpeCA9IHByZWZpeC50b1N0cmluZygpLnNsaWNlKDAsIDIpO1xuICAgICAgICB5ZWFyID0gcHJlZml4ICsgeWVhcjtcbiAgICAgIH1cbiAgICAgIG1vbnRoID0gcGFyc2VJbnQobW9udGgsIDEwKTtcbiAgICAgIHllYXIgPSBwYXJzZUludCh5ZWFyLCAxMCk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBtb250aDogbW9udGgsXG4gICAgICAgIHllYXI6IHllYXJcbiAgICAgIH07XG4gICAgfSxcbiAgICB2YWxpZGF0ZUNhcmROdW1iZXI6IGZ1bmN0aW9uKG51bSkge1xuICAgICAgdmFyIGNhcmQsIHJlZjtcbiAgICAgIG51bSA9IChudW0gKyAnJykucmVwbGFjZSgvXFxzK3wtL2csICcnKTtcbiAgICAgIGlmICghL15cXGQrJC8udGVzdChudW0pKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGNhcmQgPSBjYXJkRnJvbU51bWJlcihudW0pO1xuICAgICAgaWYgKCFjYXJkKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAocmVmID0gbnVtLmxlbmd0aCwgaW5kZXhPZi5jYWxsKGNhcmQubGVuZ3RoLCByZWYpID49IDApICYmIChjYXJkLmx1aG4gPT09IGZhbHNlIHx8IGx1aG5DaGVjayhudW0pKTtcbiAgICB9LFxuICAgIHZhbGlkYXRlQ2FyZEV4cGlyeTogZnVuY3Rpb24obW9udGgsIHllYXIpIHtcbiAgICAgIHZhciBjdXJyZW50VGltZSwgZXhwaXJ5LCBwcmVmaXgsIHJlZjtcbiAgICAgIGlmICh0eXBlb2YgbW9udGggPT09ICdvYmplY3QnICYmICdtb250aCcgaW4gbW9udGgpIHtcbiAgICAgICAgcmVmID0gbW9udGgsIG1vbnRoID0gcmVmLm1vbnRoLCB5ZWFyID0gcmVmLnllYXI7XG4gICAgICB9XG4gICAgICBpZiAoIShtb250aCAmJiB5ZWFyKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBtb250aCA9IFFKLnRyaW0obW9udGgpO1xuICAgICAgeWVhciA9IFFKLnRyaW0oeWVhcik7XG4gICAgICBpZiAoIS9eXFxkKyQvLnRlc3QobW9udGgpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICghL15cXGQrJC8udGVzdCh5ZWFyKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoIShwYXJzZUludChtb250aCwgMTApIDw9IDEyKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoeWVhci5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgcHJlZml4ID0gKG5ldyBEYXRlKS5nZXRGdWxsWWVhcigpO1xuICAgICAgICBwcmVmaXggPSBwcmVmaXgudG9TdHJpbmcoKS5zbGljZSgwLCAyKTtcbiAgICAgICAgeWVhciA9IHByZWZpeCArIHllYXI7XG4gICAgICB9XG4gICAgICBleHBpcnkgPSBuZXcgRGF0ZSh5ZWFyLCBtb250aCk7XG4gICAgICBjdXJyZW50VGltZSA9IG5ldyBEYXRlO1xuICAgICAgZXhwaXJ5LnNldE1vbnRoKGV4cGlyeS5nZXRNb250aCgpIC0gMSk7XG4gICAgICBleHBpcnkuc2V0TW9udGgoZXhwaXJ5LmdldE1vbnRoKCkgKyAxLCAxKTtcbiAgICAgIHJldHVybiBleHBpcnkgPiBjdXJyZW50VGltZTtcbiAgICB9LFxuICAgIHZhbGlkYXRlQ2FyZENWQzogZnVuY3Rpb24oY3ZjLCB0eXBlKSB7XG4gICAgICB2YXIgcmVmLCByZWYxO1xuICAgICAgY3ZjID0gUUoudHJpbShjdmMpO1xuICAgICAgaWYgKCEvXlxcZCskLy50ZXN0KGN2YykpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGUgJiYgY2FyZEZyb21UeXBlKHR5cGUpKSB7XG4gICAgICAgIHJldHVybiByZWYgPSBjdmMubGVuZ3RoLCBpbmRleE9mLmNhbGwoKHJlZjEgPSBjYXJkRnJvbVR5cGUodHlwZSkpICE9IG51bGwgPyByZWYxLmN2Y0xlbmd0aCA6IHZvaWQgMCwgcmVmKSA+PSAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGN2Yy5sZW5ndGggPj0gMyAmJiBjdmMubGVuZ3RoIDw9IDQ7XG4gICAgICB9XG4gICAgfSxcbiAgICBjYXJkVHlwZTogZnVuY3Rpb24obnVtKSB7XG4gICAgICB2YXIgcmVmO1xuICAgICAgaWYgKCFudW0pIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICByZXR1cm4gKChyZWYgPSBjYXJkRnJvbU51bWJlcihudW0pKSAhPSBudWxsID8gcmVmLnR5cGUgOiB2b2lkIDApIHx8IG51bGw7XG4gICAgfSxcbiAgICBmb3JtYXRDYXJkTnVtYmVyOiBmdW5jdGlvbihudW0pIHtcbiAgICAgIHZhciBjYXJkLCBncm91cHMsIHJlZiwgdXBwZXJMZW5ndGg7XG4gICAgICBjYXJkID0gY2FyZEZyb21OdW1iZXIobnVtKTtcbiAgICAgIGlmICghY2FyZCkge1xuICAgICAgICByZXR1cm4gbnVtO1xuICAgICAgfVxuICAgICAgdXBwZXJMZW5ndGggPSBjYXJkLmxlbmd0aFtjYXJkLmxlbmd0aC5sZW5ndGggLSAxXTtcbiAgICAgIG51bSA9IG51bS5yZXBsYWNlKC9cXEQvZywgJycpO1xuICAgICAgbnVtID0gbnVtLnNsaWNlKDAsICt1cHBlckxlbmd0aCArIDEgfHwgOWU5KTtcbiAgICAgIGlmIChjYXJkLmZvcm1hdC5nbG9iYWwpIHtcbiAgICAgICAgcmV0dXJuIChyZWYgPSBudW0ubWF0Y2goY2FyZC5mb3JtYXQpKSAhPSBudWxsID8gcmVmLmpvaW4oJyAnKSA6IHZvaWQgMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGdyb3VwcyA9IGNhcmQuZm9ybWF0LmV4ZWMobnVtKTtcbiAgICAgICAgaWYgKGdyb3VwcyAhPSBudWxsKSB7XG4gICAgICAgICAgZ3JvdXBzLnNoaWZ0KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGdyb3VwcyAhPSBudWxsID8gZ3JvdXBzLmpvaW4oJyAnKSA6IHZvaWQgMDtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgUGF5bWVudC5yZXN0cmljdE51bWVyaWMgPSBmdW5jdGlvbihlbCkge1xuICAgIHJldHVybiBRSi5vbihlbCwgJ2tleXByZXNzJywgcmVzdHJpY3ROdW1lcmljKTtcbiAgfTtcblxuICBQYXltZW50LmNhcmRFeHBpcnlWYWwgPSBmdW5jdGlvbihlbCkge1xuICAgIHJldHVybiBQYXltZW50LmZucy5jYXJkRXhwaXJ5VmFsKFFKLnZhbChlbCkpO1xuICB9O1xuXG4gIFBheW1lbnQuZm9ybWF0Q2FyZENWQyA9IGZ1bmN0aW9uKGVsKSB7XG4gICAgUGF5bWVudC5yZXN0cmljdE51bWVyaWMoZWwpO1xuICAgIFFKLm9uKGVsLCAna2V5cHJlc3MnLCByZXN0cmljdENWQyk7XG4gICAgcmV0dXJuIGVsO1xuICB9O1xuXG4gIFBheW1lbnQuZm9ybWF0Q2FyZEV4cGlyeSA9IGZ1bmN0aW9uKGVsKSB7XG4gICAgdmFyIG1vbnRoLCB5ZWFyO1xuICAgIFBheW1lbnQucmVzdHJpY3ROdW1lcmljKGVsKTtcbiAgICBpZiAoZWwubGVuZ3RoICYmIGVsLmxlbmd0aCA9PT0gMikge1xuICAgICAgbW9udGggPSBlbFswXSwgeWVhciA9IGVsWzFdO1xuICAgICAgdGhpcy5mb3JtYXRDYXJkRXhwaXJ5TXVsdGlwbGUobW9udGgsIHllYXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBRSi5vbihlbCwgJ2tleXByZXNzJywgcmVzdHJpY3RDb21iaW5lZEV4cGlyeSk7XG4gICAgICBRSi5vbihlbCwgJ2tleXByZXNzJywgZm9ybWF0RXhwaXJ5KTtcbiAgICAgIFFKLm9uKGVsLCAna2V5cHJlc3MnLCBmb3JtYXRGb3J3YXJkU2xhc2gpO1xuICAgICAgUUoub24oZWwsICdrZXlwcmVzcycsIGZvcm1hdEZvcndhcmRFeHBpcnkpO1xuICAgICAgUUoub24oZWwsICdrZXlkb3duJywgZm9ybWF0QmFja0V4cGlyeSk7XG4gICAgfVxuICAgIHJldHVybiBlbDtcbiAgfTtcblxuICBQYXltZW50LmZvcm1hdENhcmRFeHBpcnlNdWx0aXBsZSA9IGZ1bmN0aW9uKG1vbnRoLCB5ZWFyKSB7XG4gICAgUUoub24obW9udGgsICdrZXlwcmVzcycsIHJlc3RyaWN0TW9udGhFeHBpcnkpO1xuICAgIFFKLm9uKG1vbnRoLCAna2V5cHJlc3MnLCBmb3JtYXRNb250aEV4cGlyeSk7XG4gICAgcmV0dXJuIFFKLm9uKHllYXIsICdrZXlwcmVzcycsIHJlc3RyaWN0WWVhckV4cGlyeSk7XG4gIH07XG5cbiAgUGF5bWVudC5mb3JtYXRDYXJkTnVtYmVyID0gZnVuY3Rpb24oZWwpIHtcbiAgICBQYXltZW50LnJlc3RyaWN0TnVtZXJpYyhlbCk7XG4gICAgUUoub24oZWwsICdrZXlwcmVzcycsIHJlc3RyaWN0Q2FyZE51bWJlcik7XG4gICAgUUoub24oZWwsICdrZXlwcmVzcycsIGZvcm1hdENhcmROdW1iZXIpO1xuICAgIFFKLm9uKGVsLCAna2V5ZG93bicsIGZvcm1hdEJhY2tDYXJkTnVtYmVyKTtcbiAgICBRSi5vbihlbCwgJ2tleXVwJywgc2V0Q2FyZFR5cGUpO1xuICAgIFFKLm9uKGVsLCAncGFzdGUnLCByZUZvcm1hdENhcmROdW1iZXIpO1xuICAgIHJldHVybiBlbDtcbiAgfTtcblxuICBQYXltZW50LmdldENhcmRBcnJheSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBjYXJkcztcbiAgfTtcblxuICBQYXltZW50LnNldENhcmRBcnJheSA9IGZ1bmN0aW9uKGNhcmRBcnJheSkge1xuICAgIGNhcmRzID0gY2FyZEFycmF5O1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIFBheW1lbnQuYWRkVG9DYXJkQXJyYXkgPSBmdW5jdGlvbihjYXJkT2JqZWN0KSB7XG4gICAgcmV0dXJuIGNhcmRzLnB1c2goY2FyZE9iamVjdCk7XG4gIH07XG5cbiAgUGF5bWVudC5yZW1vdmVGcm9tQ2FyZEFycmF5ID0gZnVuY3Rpb24odHlwZSkge1xuICAgIHZhciBrZXksIHZhbHVlO1xuICAgIGZvciAoa2V5IGluIGNhcmRzKSB7XG4gICAgICB2YWx1ZSA9IGNhcmRzW2tleV07XG4gICAgICBpZiAodmFsdWUudHlwZSA9PT0gdHlwZSkge1xuICAgICAgICBjYXJkcy5zcGxpY2Uoa2V5LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgcmV0dXJuIFBheW1lbnQ7XG5cbn0pKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gUGF5bWVudDtcblxuZ2xvYmFsLlBheW1lbnQgPSBQYXltZW50O1xuXG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxufSx7XCJxai9zcmMvcWouY29mZmVlXCI6MX1dfSx7fSxbMl0pKDIpXG59KTsiLCIvLyBNaW5uUG9zdCBHaXZpbmcgcGx1Z2luXG4vLyB0aGUgc2VtaS1jb2xvbiBiZWZvcmUgZnVuY3Rpb24gaW52b2NhdGlvbiBpcyBhIHNhZmV0eSBuZXQgYWdhaW5zdCBjb25jYXRlbmF0ZWRcbi8vIHNjcmlwdHMgYW5kL29yIG90aGVyIHBsdWdpbnMgd2hpY2ggbWF5IG5vdCBiZSBjbG9zZWQgcHJvcGVybHkuXG47KGZ1bmN0aW9uICggJCwgd2luZG93LCBkb2N1bWVudCwgdW5kZWZpbmVkICkge1xuXG4gIC8vIHVuZGVmaW5lZCBpcyB1c2VkIGhlcmUgYXMgdGhlIHVuZGVmaW5lZCBnbG9iYWwgdmFyaWFibGUgaW4gRUNNQVNjcmlwdCAzIGlzXG4gIC8vIG11dGFibGUgKGllLiBpdCBjYW4gYmUgY2hhbmdlZCBieSBzb21lb25lIGVsc2UpLiB1bmRlZmluZWQgaXNuJ3QgcmVhbGx5IGJlaW5nXG4gIC8vIHBhc3NlZCBpbiBzbyB3ZSBjYW4gZW5zdXJlIHRoZSB2YWx1ZSBvZiBpdCBpcyB0cnVseSB1bmRlZmluZWQuIEluIEVTNSwgdW5kZWZpbmVkXG4gIC8vIGNhbiBubyBsb25nZXIgYmUgbW9kaWZpZWQuXG5cbiAgLy8gd2luZG93IGFuZCBkb2N1bWVudCBhcmUgcGFzc2VkIHRocm91Z2ggYXMgbG9jYWwgdmFyaWFibGUgcmF0aGVyIHRoYW4gZ2xvYmFsXG4gIC8vIGFzIHRoaXMgKHNsaWdodGx5KSBxdWlja2VucyB0aGUgcmVzb2x1dGlvbiBwcm9jZXNzIGFuZCBjYW4gYmUgbW9yZSBlZmZpY2llbnRseVxuICAvLyBtaW5pZmllZCAoZXNwZWNpYWxseSB3aGVuIGJvdGggYXJlIHJlZ3VsYXJseSByZWZlcmVuY2VkIGluIHlvdXIgcGx1Z2luKS5cblxuICAvLyBDcmVhdGUgdGhlIGRlZmF1bHRzIG9uY2VcbiAgdmFyIHBsdWdpbk5hbWUgPSAnbWlubnBvc3RfZ2l2aW5nJyxcbiAgZGVmYXVsdHMgPSB7XG4gICAgJ2RlYnVnJyA6IGZhbHNlLCAvLyB0aGlzIGNhbiBiZSBzZXQgdG8gdHJ1ZSBvbiBwYWdlIGxldmVsIG9wdGlvbnNcbiAgICAndGFicycgOiB0cnVlLCAvLyBhcmUgd2UgZG9pbmcgdGhlIHRhYiB0aGluZ1xuICAgICdzdHJpcGVfcHVibGlzaGFibGVfa2V5JyA6ICcnLFxuICAgICdwbGFpZF9lbnYnIDogJycsXG4gICAgJ3BsYWlkX3B1YmxpY19rZXknIDogJycsXG4gICAgJ3BsYWlkX2xpbmsnIDogJyNhdXRob3JpemUtYWNoJyxcbiAgICAnbWlubnBvc3Rfcm9vdCcgOiAnaHR0cHM6Ly93d3cubWlubnBvc3QuY29tJyxcbiAgICAnZG9uYXRlX2Zvcm1fc2VsZWN0b3InOiAnI2RvbmF0ZScsXG4gICAgJ2RvbmF0ZV9zdGVwX3NlbGVjdG9yJyA6ICcjcGFuZWwtLXBheScsXG4gICAgJ2NvbmZpcm1fZm9ybV9zZWxlY3RvcicgOiAnI2NvbmZpcm0nLFxuICAgICdjb25maXJtX3N0ZXBfc2VsZWN0b3InIDogJyNwYW5lbC0tY29uZmlybWF0aW9uJyxcbiAgICAnYWN0aXZlJyA6ICdwYW5lbC0tcGF5JyxcbiAgICAnY29uZmlybScgOiAncGFuZWwtLWNvbmZpcm1hdGlvbicsXG4gICAgJ3F1ZXJ5JyA6ICdzdGVwJyxcbiAgICAncGF5X2NjX3Byb2Nlc3Npbmdfc2VsZWN0b3InIDogJ2lucHV0W2lkPVwiZWRpdC1wYXktZmVlc1wiXScsXG4gICAgJ2ZlZV9hbW91bnQnIDogJy5wcm9jZXNzaW5nLWFtb3VudCcsXG4gICAgJ2xldmVsX2Ftb3VudF9zZWxlY3RvcicgOiAnI3BhbmVsLS1wYXkgLmFtb3VudCAubGV2ZWwtYW1vdW50JyxcbiAgICAnb3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yJyA6ICcjYW1vdW50JyxcbiAgICAnZnJlcXVlbmN5X3NlbGVjdG9yJyA6ICcuZnJlcXVlbmN5JyxcbiAgICAnZnVsbF9hbW91bnRfc2VsZWN0b3InIDogJy5mdWxsLWFtb3VudCcsXG4gICAgJ2xldmVsX2luZGljYXRvcl9zZWxlY3RvcicgOiAnaDIubGV2ZWwnLFxuICAgICdsZXZlbF9uYW1lX3NlbGVjdG9yJyA6ICcubGV2ZWwtbmFtZScsXG4gICAgJ25hbWVfc2VsZWN0b3InIDogJy5mb3JtLWl0ZW0tLWRpc3BsYXktbmFtZScsXG4gICAgJ2luX2hvbm9yX29yX21lbW9yeV9maWVsZF9zZWxlY3RvcicgOiAnLmZvcm0taXRlbS0taG9ub3ItbWVtb3J5JyxcbiAgICAnaG9ub3Jfb3JfbWVtb3J5X2Nob29zZXInIDogJ2lucHV0W25hbWU9XCJpbl9ob25vcl9vcl9tZW1vcnlcIl0nLCAvLyByYWRpbyBmaWVsZHNcbiAgICAnaG9ub3JfbmFtZV9zZWxlY3RvcicgOiAnLmhvbm9yJywgLy8gbGFiZWxcbiAgICAnbWVtb3J5X25hbWVfc2VsZWN0b3InIDogJy5tZW1vcnknLCAvLyBsYWJlbFxuICAgICdob25vcl9zZWxlY3RvcicgOiAnI2luLWhvbm9yJywgLy8gc2luZ2xlIHJhZGlvIGZpZWxkXG4gICAgJ21lbW9yeV9zZWxlY3RvcicgOiAnI2luLW1lbW9yeScsIC8vIHNpbmdsZSByYWRpbyBmaWVsZFxuICAgICdob25vcl9tZW1vcnlfaW5wdXRfZ3JvdXAnIDogJy5ob25vci1vci1tZW1vcnknLCAvLyBob2xkcyB0aGUgZm9ybSBmaWVsZFxuICAgICdub3RpZnlfc2VsZWN0b3InIDogJy5ub3RpZnlfc29tZW9uZScsXG4gICAgJ25vdGlmeV9maWVsZF9zZWxlY3RvcicgOiAnLmZvcm0taXRlbS0tbm90aWZ5JyxcbiAgICAnYW5vbnltb3VzX3NlbGVjdG9yJyA6ICcjYW5vbnltb3VzJyxcbiAgICAnc2hvd19iaWxsaW5nX2NvdW50cnlfc2VsZWN0b3InIDogJyNiaWxsaW5nX3Nob3dfY291bnRyeScsXG4gICAgJ2JpbGxpbmdfY291bnRyeV9zZWxlY3RvcicgOiAnLmZvcm0taXRlbS0tY291bnRyeScsXG4gICAgJ3Nob3dfc2hpcHBpbmdfY291bnRyeV9zZWxlY3RvcicgOiAnI3NoaXBwaW5nX3Nob3dfY291bnRyeScsXG4gICAgJ3NoaXBwaW5nX2NvdW50cnlfc2VsZWN0b3InIDogJy5mb3JtLWl0ZW0tLXNoaXBwaW5nLWNvdW50cnknLFxuICAgICdzaGlwcGluZ19hZGRyZXNzX3NlbGVjdG9yJyA6ICcuZm9ybS1pdGVtLS1zaGlwcGluZy1hZGRyZXNzJyxcbiAgICAndXNlX2Zvcl9zaGlwcGluZ19zZWxlY3RvcicgOiAnI3VzZWZvcnNoaXBwaW5nJyxcbiAgICAnZW1haWxfZmllbGRfc2VsZWN0b3InIDogJyNlbWFpbCcsXG4gICAgJ3Bhc3N3b3JkX2ZpZWxkX3NlbGVjdG9yJyA6ICcjcGFzc3dvcmQnLFxuICAgICdmaXJzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yJyA6ICcjZmlyc3RfbmFtZScsXG4gICAgJ2xhc3RfbmFtZV9maWVsZF9zZWxlY3RvcicgOiAnI2xhc3RfbmFtZScsXG4gICAgJ2FjY291bnRfY2l0eV9zZWxlY3RvcicgOiAnI2JpbGxpbmdfY2l0eScsXG4gICAgJ2FjY291bnRfc3RhdGVfc2VsZWN0b3InIDogJyNiaWxsaW5nX3N0YXRlJyxcbiAgICAnYWNjb3VudF96aXBfc2VsZWN0b3InIDogJyNiaWxsaW5nX3ppcCcsXG4gICAgJ2NyZWF0ZV9tcF9zZWxlY3RvcicgOiAnI2NyZWF0ZW1wYWNjb3VudCcsXG4gICAgJ3Bhc3N3b3JkX3NlbGVjdG9yJyA6ICcuZm9ybS1pdGVtLS1wYXNzd29yZCcsXG4gICAgJ2NhbGN1bGF0ZWRfYW1vdW50X3NlbGVjdG9yJyA6ICcuY2FsY3VsYXRlZC1hbW91bnQnLFxuICAgICdxdWFudGl0eV9maWVsZCcgOiAnI3F1YW50aXR5JyxcbiAgICAncXVhbnRpdHlfc2VsZWN0b3InIDogJy5xdWFudGl0eScsXG4gICAgJ2l0ZW1fc2VsZWN0b3InOiAnLnB1cmNoYXNlLWl0ZW0nLFxuICAgICdzaW5nbGVfdW5pdF9wcmljZV9hdHRyaWJ1dGUnIDogJ3VuaXQtcHJpY2UnLFxuICAgICdhZGRpdGlvbmFsX2Ftb3VudF9maWVsZCcgOiAnI2FkZGl0aW9uYWxfZG9uYXRpb24nLFxuICAgICdhZGRpdGlvbmFsX2Ftb3VudF9zZWxlY3RvcicgOiAnLmFkZGl0aW9uYWxfZG9uYXRpb24nLFxuICAgICdoYXNfYWRkaXRpb25hbF90ZXh0X3NlbGVjdG9yJyA6ICcuaGFzX2FkZGl0aW9uYWwnLFxuICAgICdiaWxsaW5nX3NlbGVjdG9yJyA6ICdmaWVsZHNldC5iaWxsaW5nJyxcbiAgICAnc2hpcHBpbmdfc2VsZWN0b3InIDogJ2ZpZWxkc2V0LnNoaXBwaW5nJyxcbiAgICAnY3JlZGl0X2NhcmRfZmllbGRzZXQnIDogJy5wYXltZW50LW1ldGhvZC1ncm91cCcsXG4gICAgJ2Nob29zZV9wYXltZW50JyA6ICcjY2hvb3NlLXBheW1lbnQtbWV0aG9kJyxcbiAgICAncGF5bWVudF9tZXRob2Rfc2VsZWN0b3InIDogJy5wYXltZW50LW1ldGhvZCcsXG4gICAgJ2NjX251bV9zZWxlY3RvcicgOiAnI2NhcmQtbnVtYmVyJyxcbiAgICAnY2NfZXhwX3NlbGVjdG9yJyA6ICcjY2FyZC1leHBpcnknLFxuICAgICdjY19jdnZfc2VsZWN0b3InIDogJyNjYXJkLWN2YycsXG4gICAgJ3BheW1lbnRfYnV0dG9uX3NlbGVjdG9yJyA6ICcjc3VibWl0JyxcbiAgICAnY29uZmlybV9idXR0b25fc2VsZWN0b3InIDogJyNmaW5pc2gnLFxuICAgICdvcHBfaWRfc2VsZWN0b3InIDogJyNmbGFza19pZCcsXG4gICAgJ3JlY3VycmluZ19zZWxlY3RvcicgOiAnI3JlY3VycmluZycsXG4gICAgJ25ld3NsZXR0ZXJfZ3JvdXBfc2VsZWN0b3InIDogJy5mb3JtLWl0ZW0tLW5ld3NsZXR0ZXIgaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJyxcbiAgICAnbWVzc2FnZV9ncm91cF9zZWxlY3RvcicgOiAnLmZvcm0taXRlbS0tb3B0aW9uYWwgaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJyxcbiAgICAncmVhc29uX2ZpZWxkX3NlbGVjdG9yJyA6ICcjcmVhc29uX2Zvcl9zdXBwb3J0aW5nJyxcbiAgICAnc2hhcmVfcmVhc29uX3NlbGVjdG9yJyA6ICcjcmVhc29uX3NoYXJlYWJsZScsXG4gICAgJ2NvbmZpcm1fdG9wX3NlbGVjdG9yJyA6ICcuc3VwcG9ydC0tcG9zdC1jb25maXJtJyxcbiAgICAnZXhpc3RpbmdfbmV3c2xldHRlcl9zZXR0aW5ncycgOiAnJyxcbiAgICAnbGV2ZWxzJyA6IHtcbiAgICAgIDEgOiB7XG4gICAgICAgICduYW1lJyA6ICdicm9uemUnLFxuICAgICAgICAnbWF4JyA6IDYwXG4gICAgICB9LFxuICAgICAgMiA6IHtcbiAgICAgICAgJ25hbWUnIDogJ3NpbHZlcicsXG4gICAgICAgICdtaW4nIDogNjAsXG4gICAgICAgICdtYXgnIDogMTIwXG4gICAgICB9LFxuICAgICAgMyA6IHtcbiAgICAgICAgJ25hbWUnIDogJ2dvbGQnLFxuICAgICAgICAnbWluJyA6IDEyMCxcbiAgICAgICAgJ21heCcgOiAyNDBcbiAgICAgIH0sXG4gICAgICA0IDoge1xuICAgICAgICAnbmFtZScgOiAncGxhdGludW0nLFxuICAgICAgICAnbWluJyA6IDI0MFxuICAgICAgfVxuICAgIH1cblxuICB9OyAvLyBlbmQgZGVmYXVsdHNcblxuICAvLyBUaGUgYWN0dWFsIHBsdWdpbiBjb25zdHJ1Y3RvclxuICBmdW5jdGlvbiBQbHVnaW4oIGVsZW1lbnQsIG9wdGlvbnMgKSB7XG5cbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuXG4gICAgLy8galF1ZXJ5IGhhcyBhbiBleHRlbmQgbWV0aG9kIHdoaWNoIG1lcmdlcyB0aGUgY29udGVudHMgb2YgdHdvIG9yXG4gICAgLy8gbW9yZSBvYmplY3RzLCBzdG9yaW5nIHRoZSByZXN1bHQgaW4gdGhlIGZpcnN0IG9iamVjdC4gVGhlIGZpcnN0IG9iamVjdFxuICAgIC8vIGlzIGdlbmVyYWxseSBlbXB0eSBhcyB3ZSBkb24ndCB3YW50IHRvIGFsdGVyIHRoZSBkZWZhdWx0IG9wdGlvbnMgZm9yXG4gICAgLy8gZnV0dXJlIGluc3RhbmNlcyBvZiB0aGUgcGx1Z2luXG4gICAgdGhpcy5vcHRpb25zID0gJC5leHRlbmQoIHt9LCBkZWZhdWx0cywgb3B0aW9ucyApO1xuXG4gICAgdGhpcy5fZGVmYXVsdHMgPSBkZWZhdWx0cztcbiAgICB0aGlzLl9uYW1lID0gcGx1Z2luTmFtZTtcblxuICAgIHRoaXMuaW5pdCgpO1xuICB9IC8vIGVuZCBjb25zdHJ1Y3RvclxuXG4gIFBsdWdpbi5wcm90b3R5cGUgPSB7XG5cbiAgICBpbml0OiBmdW5jdGlvbihyZXNldCwgYW1vdW50KSB7XG5cbiAgICAgIC8vIFBsYWNlIGluaXRpYWxpemF0aW9uIGxvZ2ljIGhlcmVcbiAgICAgIC8vIFlvdSBhbHJlYWR5IGhhdmUgYWNjZXNzIHRvIHRoZSBET00gZWxlbWVudCBhbmRcbiAgICAgIC8vIHRoZSBvcHRpb25zIHZpYSB0aGUgaW5zdGFuY2UsIGUuZy4gdGhpcy5lbGVtZW50XG4gICAgICAvLyBhbmQgdGhpcy5vcHRpb25zXG4gICAgICAvLyB5b3UgY2FuIGFkZCBtb3JlIGZ1bmN0aW9ucyBsaWtlIHRoZSBvbmUgYmVsb3cgYW5kXG4gICAgICAvLyBjYWxsIHRoZW0gbGlrZSBzbzogdGhpcy55b3VyT3RoZXJGdW5jdGlvbih0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucykuXG5cbiAgICAgIC8vIG1vZGlmeSBvcHRpb25zIGFzIG5lZWRlZFxuICAgICAgLy92YXIgdGhpcy5vcHRpb25zLmFtb3VudCA9ICcnO1xuICAgICAgaWYgKHJlc2V0ICE9PSB0cnVlKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5hbW91bnQgPSBwYXJzZUZsb2F0KCQodGhpcy5vcHRpb25zLmxldmVsX2Ftb3VudF9zZWxlY3RvciwgdGhpcy5lbGVtZW50KS50ZXh0KCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLmFtb3VudCA9IGFtb3VudDtcbiAgICAgIH1cbiAgICAgIHRoaXMub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQgPSBwYXJzZUludCgkKHRoaXMub3B0aW9ucy5vcmlnaW5hbF9hbW91bnRfc2VsZWN0b3IsIHRoaXMuZWxlbWVudCkudmFsKCksIDEwKTtcbiAgICAgIHRoaXMub3B0aW9ucy5mcmVxdWVuY3kgPSBwYXJzZUZsb2F0KCQodGhpcy5vcHRpb25zLmZyZXF1ZW5jeV9zZWxlY3RvciwgdGhpcy5lbGVtZW50KS5hdHRyKCdkYXRhLXllYXItZnJlcScpKTtcbiAgICAgIHZhciByZWN1cnJpbmcgPSAkKHRoaXMub3B0aW9ucy5yZWN1cnJpbmdfc2VsZWN0b3IsIHRoaXMuZWxlbWVudCkudmFsKCk7XG4gICAgICBpZiAodHlwZW9mIHJlY3VycmluZyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLnJlY3VycmluZyA9IHJlY3VycmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHJlY3VycmluZy5zbGljZSgxKTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgdGhpcy5vcHRpb25zLnByb2Nlc3NpbmdfZmVlID0gKE1hdGgucm91bmQocGFyc2VGbG9hdCh0aGlzLm9wdGlvbnMuZmVlX2Ftb3VudCkqTWF0aC5wb3coMTAsMikpL01hdGgucG93KDEwLDIpKS50b0ZpeGVkKDIpO1xuICAgICAgdGhpcy5vcHRpb25zLnByb2Nlc3NpbmdfZmVlX3RleHQgPSB0aGlzLm9wdGlvbnMucHJvY2Vzc2luZ19mZWU7XG4gICAgICBcbiAgICAgIHRoaXMub3B0aW9ucy5jYXJkVHlwZSA9IG51bGw7XG4gICAgICB0aGlzLm9wdGlvbnMuY3JlYXRlX2FjY291bnQgPSBmYWxzZTtcblxuICAgICAgdmFyIGJ1dHRvbl90ZXh0ID0gJCgnYnV0dG9uLmdpdmUsIGlucHV0LmdpdmUnKS50ZXh0KCk7XG4gICAgICB0aGlzLm9wdGlvbnMuYnV0dG9uX3RleHQgPSBidXR0b25fdGV4dDtcblxuICAgICAgdGhpcy5zdHJpcGUgPSBTdHJpcGUodGhpcy5vcHRpb25zLnN0cmlwZV9wdWJsaXNoYWJsZV9rZXkpO1xuICAgICAgdGhpcy5lbGVtZW50cyA9IHRoaXMuc3RyaXBlLmVsZW1lbnRzKCk7XG5cbiAgICAgIC8vIHVzZSBhIHJlZmVycmVyIGZvciBlZGl0IGxpbmsgaWYgd2UgaGF2ZSBvbmVcbiAgICAgIGlmIChkb2N1bWVudC5yZWZlcnJlciAhPT0gJycpIHtcbiAgICAgICAgJCgnI2VkaXRfdXJsJykucHJvcCgnaHJlZicsIGRvY3VtZW50LnJlZmVycmVyKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5kZWJ1ZyA9PT0gdHJ1ZSkge1xuICAgICAgICB0aGlzLmRlYnVnKHRoaXMub3B0aW9ucyk7XG4gICAgICAgIC8vIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gdGFiIHN0dWZmXG4gICAgICB2YXIgcXVlcnlfcGFuZWwgPSB0aGlzLnFzW3RoaXMub3B0aW9ucy5xdWVyeV07XG4gICAgICBpZiAodHlwZW9mIHF1ZXJ5X3BhbmVsID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBxdWVyeV9wYW5lbCA9IHRoaXMub3B0aW9ucy5hY3RpdmU7XG4gICAgICB9XG5cbiAgICAgIC8vIGNhbGwgZnVuY3Rpb25zXG5cbiAgICAgIHRoaXMucGF5bWVudFBhbmVscyhxdWVyeV9wYW5lbCk7IC8vIHRhYnNcblxuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLnBheV9jY19wcm9jZXNzaW5nX3NlbGVjdG9yKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuY3JlZGl0Q2FyZFByb2Nlc3NpbmdGZWVzKHRoaXMub3B0aW9ucywgcmVzZXQpOyAvLyBwcm9jZXNzaW5nIGZlZXNcbiAgICAgIH1cbiAgICAgIFxuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmRvbmF0ZV9zdGVwX3NlbGVjdG9yKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5sZXZlbCA9IHRoaXMuY2hlY2tMZXZlbCh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucywgJ25hbWUnKTsgLy8gY2hlY2sgd2hhdCBsZXZlbCBpdCBpc1xuICAgICAgICB0aGlzLm9wdGlvbnMubGV2ZWxudW0gPSB0aGlzLmNoZWNrTGV2ZWwodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMsICdudW0nKTsgLy8gY2hlY2sgd2hhdCBsZXZlbCBpdCBpcyBhcyBhIG51bWJlclxuICAgICAgICB0aGlzLmRvbmF0ZUFub255bW91c2x5KHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gYW5vbnltb3VzXG4gICAgICAgIHRoaXMuaG9ub3JPck1lbW9yeVRvZ2dsZSh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIGluIGhvbm9yIG9yIGluIG1lbW9yeSBvZiBzb21lb25lXG4gICAgICAgIHRoaXMub3V0c2lkZVVuaXRlZFN0YXRlcyh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIG91dHNpZGUgVVNcbiAgICAgICAgdGhpcy5zaGlwcGluZ0FkZHJlc3ModGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBzaGlwcGluZyBhZGRyZXNzXG4gICAgICAgIHRoaXMuYWxsb3dNaW5ucG9zdEFjY291bnQodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMsIGZhbHNlKTsgLy8gb3B0aW9uIGZvciBjcmVhdGluZyBtaW5ucG9zdCBhY2NvdW50XG4gICAgICAgIHRoaXMuY2hvb3NlUGF5bWVudE1ldGhvZCh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIHN3aXRjaCBiZXR3ZWVuIGNhcmQgYW5kIGFjaFxuICAgICAgICB0aGlzLmNyZWRpdENhcmRGaWVsZHModGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBkbyBzdHVmZiB3aXRoIHRoZSBjcmVkaXQgY2FyZCBmaWVsZHNcbiAgICAgICAgdGhpcy5hY2hGaWVsZHModGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBkbyBzdHVmZiBmb3IgYWNoIHBheW1lbnRzLCBpZiBhcHBsaWNhYmxlIHRvIHRoZSBmb3JtXG4gICAgICAgIHRoaXMudmFsaWRhdGVBbmRTdWJtaXQodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyB2YWxpZGF0ZSBhbmQgc3VibWl0IHRoZSBmb3JtXG4gICAgICB9XG5cbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5jYWxjdWxhdGVkX2Ftb3VudF9zZWxlY3RvcikubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLmNhbGN1bGF0ZUFtb3VudCh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucywgJycpOyAvL1xuICAgICAgfSAvLyBjYWxjdWxhdGUgYW1vdW50IGJhc2VkIG9uIHF1YW50aXR5XG5cbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5jb25maXJtX3N0ZXBfc2VsZWN0b3IpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5zaG93TmV3c2xldHRlclNldHRpbmdzKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTtcbiAgICAgICAgdGhpcy5jb25maXJtTWVzc2FnZVN1Ym1pdCh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIHN1Ym1pdCB0aGUgc3R1ZmYgb24gdGhlIGNvbmZpcm1hdGlvbiBwYWdlXG4gICAgICB9XG5cbiAgICB9LCAvLyBpbml0XG5cbiAgICBxczogKGZ1bmN0aW9uKGEpIHtcbiAgICAgIGlmIChhID09PSAnJykge1xuICAgICAgICByZXR1cm4ge307XG4gICAgICB9XG4gICAgICB2YXIgYiA9IHt9O1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBwPWFbaV0uc3BsaXQoJz0nLCAyKTtcbiAgICAgICAgaWYgKHAubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgYltwWzBdXSA9ICcnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJbcFswXV0gPSBkZWNvZGVVUklDb21wb25lbnQocFsxXS5yZXBsYWNlKC9cXCsvZywgJyAnKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBiO1xuICAgIH0pKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3Vic3RyKDEpLnNwbGl0KCcmJykpLFxuXG4gICAgZGVidWc6IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuZGVidWcgPT09IHRydWUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZGlyKG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUuZGlyKHRoaXMpO1xuICAgICAgfVxuICAgIH0sIC8vIGRlYnVnXG5cbiAgICBnZXRRdWVyeVN0cmluZ3M6IGZ1bmN0aW9uKGxpbmspIHtcbiAgICAgIGlmICh0eXBlb2YgbGluayA9PT0gJ3VuZGVmaW5lZCcgfHwgbGluayA9PT0gJycpIHtcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGluayA9ICc/JyArIGxpbmsuc3BsaXQoJz8nKVsxXTtcbiAgICAgICAgbGluayA9IGxpbmsuc3Vic3RyKDEpLnNwbGl0KCcmJyk7XG4gICAgICB9XG4gICAgICB2YXIgYiA9IHt9O1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaW5rLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBwPWxpbmtbaV0uc3BsaXQoJz0nLCAyKTtcbiAgICAgICAgaWYgKHAubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgYltwWzBdXSA9ICcnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJbcFswXV0gPSBkZWNvZGVVUklDb21wb25lbnQocFsxXS5yZXBsYWNlKC9cXCsvZywgJyAnKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBiO1xuICAgIH0sIC8vIGdldFF1ZXJ5U3RyaW5nc1xuXG4gICAgcGF5bWVudFBhbmVsczogZnVuY3Rpb24oYWN0aXZlKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB2YXIgdXNldGFicyA9IHRoaXMub3B0aW9ucy50YWJzO1xuICAgICAgdmFyIHRpdGxlID0gJ01pbm5Qb3N0IHwgU3VwcG9ydCBVcyB8ICc7XG4gICAgICB2YXIgcGFnZSA9ICQoJy5wcm9ncmVzcy0tZG9uYXRpb24gbGkuJyArIGFjdGl2ZSkudGV4dCgpO1xuICAgICAgdmFyIG5leHQgPSAkKCcucHJvZ3Jlc3MtLWRvbmF0aW9uIGxpLicgKyBhY3RpdmUpLm5leHQoKS50ZXh0KCk7XG4gICAgICB2YXIgc3RlcCA9ICQoJy5wcm9ncmVzcy0tZG9uYXRpb24gbGkuJyArIGFjdGl2ZSkuaW5kZXgoKSArIDE7XG4gICAgICB2YXIgbmF2X2l0ZW1fY291bnQgPSAkKCcucHJvZ3Jlc3MtLWRvbmF0aW9uIGxpJykubGVuZ3RoO1xuICAgICAgdmFyIG9wcF9pZCA9ICQodGhpcy5vcHRpb25zLm9wcF9pZF9zZWxlY3RvcikudmFsKCk7XG4gICAgICB2YXIgbmV4dF9zdGVwID0gc3RlcCArIDE7XG4gICAgICB2YXIgcG9zdF9wdXJjaGFzZSA9IGZhbHNlO1xuXG4gICAgICB0aGlzLmRlYnVnKCAnc3RlcCBpcyAnICsgc3RlcCArICcgYW5kIG5hdiBpdGVtIGNvdW50IGlzICcgKyBuYXZfaXRlbV9jb3VudCArICcgYW5kIG9wcCBpZCBpcyAnICsgb3BwX2lkICsgJyBhbmQgbmV4dCBzdGVwIGlzICcgKyBuZXh0X3N0ZXAgKTtcblxuICAgICAgLy8gdGhpcyBpcyB0aGUgbGFzdCB2aXNpYmxlIHN0ZXBcbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5jb25maXJtX3N0ZXBfc2VsZWN0b3IpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgYWN0aXZlID0gdGhpcy5vcHRpb25zLmNvbmZpcm07XG4gICAgICAgICQoJy5wcm9ncmVzcy0tZG9uYXRpb24gbGkuJyArIGFjdGl2ZSArICcgc3BhbicpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgc3RlcCA9ICQoJy5wcm9ncmVzcy0tZG9uYXRpb24gbGkuJyArIGFjdGl2ZSkuaW5kZXgoKSArIDE7XG4gICAgICAgIC8vIHRoZXJlIGlzIGEgY29udGludWF0aW9uIG9mIHRoZSBtYWluIGZvcm0gb24gdGhpcyBwYWdlLiB0aGVyZSBpcyBhIGJ1dHRvbiB0byBjbGlja1xuICAgICAgICAvLyB0aGlzIG1lYW5zIHRoZXJlIGlzIGFub3RoZXIgc3RlcFxuICAgICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuY29uZmlybV9idXR0b25fc2VsZWN0b3IpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBuYXZfaXRlbV9jb3VudCArPSAxO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGVwID09PSBuYXZfaXRlbV9jb3VudCAtIDEgJiYgJCh0aGlzLm9wdGlvbnMub3BwX2lkX3NlbGVjdG9yKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuZGVidWcoJ3RoaXMgaXMgYSBwYXltZW50IHN0ZXAgYnV0IHRoZXJlIGlzIGEgc3RlcCBhZnRlciBpdCcpO1xuICAgICAgICBzdGVwID0gJ3B1cmNoYXNlJztcbiAgICAgIH0gZWxzZSBpZiAoc3RlcCA9PT0gbmF2X2l0ZW1fY291bnQgJiYgJCh0aGlzLm9wdGlvbnMub3BwX2lkX3NlbGVjdG9yKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuZGVidWcoJ3RoaXMgaXMgYSBwYXltZW50IHN0ZXAgYW5kIHRoZXJlIGlzIG5vIHN0ZXAgYWZ0ZXIgaXQnKTtcbiAgICAgICAgc3RlcCA9ICdwdXJjaGFzZSc7XG4gICAgICB9IGVsc2UgaWYgKHN0ZXAgPT09IG5hdl9pdGVtX2NvdW50ICYmICQodGhpcy5vcHRpb25zLm9wcF9pZF9zZWxlY3RvcikubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHRoaXMuZGVidWcoJ3RoaXMgaXMgYSBwb3N0LWZpbmlzaCBzdGVwLiBpdCBkb2VzIG5vdCBoYXZlIGFuIGlkJyk7XG4gICAgICAgIHN0ZXAgPSBzdGVwICsgMTtcbiAgICAgICAgcG9zdF9wdXJjaGFzZSA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGRvY3VtZW50LnRpdGxlID0gdGl0bGUgKyBwYWdlO1xuICAgICAgdGhpcy5hbmFseXRpY3NUcmFja2luZ1N0ZXAoc3RlcCwgdGl0bGUsIHBvc3RfcHVyY2hhc2UpO1xuXG4gICAgICAvLyBtYWtlIHNvbWUgdGFicyBmb3IgZm9ybVxuICAgICAgaWYgKHVzZXRhYnMgPT09IHRydWUpIHtcbiAgICAgICAgJCgnLnBhbmVsJykuaGlkZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJCgnLnBhbmVsJykuc2hvdygpO1xuICAgICAgfVxuICAgICAgLy8gYWN0aXZhdGUgdGhlIHRhYnNcbiAgICAgIGlmICgkKCcucHJvZ3Jlc3MtLWRvbmF0aW9uIGxpIC5hY3RpdmUnKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgJCgnIycgKyBhY3RpdmUpLnNob3coKTtcbiAgICAgICAgJCgnLnByb2dyZXNzLS1kb25hdGlvbiBsaS4nICsgYWN0aXZlICsgJyBhJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWN0aXZlID0gJCgnLnByb2dyZXNzLS1kb25hdGlvbiBsaSAuYWN0aXZlJykucGFyZW50KCkucHJvcCgnY2xhc3MnKTtcbiAgICAgICAgJCgnIycgKyBhY3RpdmUpLnNob3coKTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLyokKCcucHJvZ3Jlc3MtLWRvbmF0aW9uIGxpIGEsIGEuYnRuLmJ0bi0tbmV4dCcpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICQoJy5wcm9ncmVzcy0tZG9uYXRpb24gbGkgYScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgdmFyIGxpbmsgPSAkKHRoaXMpLnByb3AoJ2hyZWYnKTtcbiAgICAgICAgdmFyIHF1ZXJ5ID0gdGhhdC5nZXRRdWVyeVN0cmluZ3MobGluayk7XG4gICAgICAgIHF1ZXJ5ID0gcXVlcnlbJ3N0ZXAnXTtcbiAgICAgICAgJCgnLnByb2dyZXNzLS1kb25hdGlvbiBsaS4nICsgcXVlcnkgKyAnIGEnKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIHRoYXQucGF5bWVudFBhbmVscyhxdWVyeSk7ICAgIFxuICAgICAgfSk7Ki9cbiAgICB9LCAvLyBwYXltZW50UGFuZWxzXG5cbiAgICBhbmFseXRpY3NUcmFja2luZ1N0ZXA6IGZ1bmN0aW9uKHN0ZXAsIHRpdGxlLCBwb3N0X3B1cmNoYXNlKSB7XG4gICAgICB2YXIgbGV2ZWwgPSB0aGlzLmNoZWNrTGV2ZWwodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMsICduYW1lJyk7IC8vIGNoZWNrIHdoYXQgbGV2ZWwgaXQgaXNcbiAgICAgIHZhciBsZXZlbG51bSA9IHRoaXMuY2hlY2tMZXZlbCh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucywgJ251bScpOyAvLyBjaGVjayB3aGF0IGxldmVsIGl0IGlzIGFzIGEgbnVtYmVyXG4gICAgICB2YXIgYW1vdW50ID0gJCh0aGlzLm9wdGlvbnMub3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yKS52YWwoKTtcbiAgICAgIHZhciByZWN1cnJpbmcgPSB0aGlzLm9wdGlvbnMucmVjdXJyaW5nO1xuICAgICAgdmFyIG9wcF9pZCA9ICQodGhpcy5vcHRpb25zLm9wcF9pZF9zZWxlY3RvcikudmFsKCk7XG5cbiAgICAgIC8vIGlmIHdlJ3JlIG5vdCBhZnRlciB0aGUgcHVyY2hhc2UsIHVzZSBhZGRQcm9kdWN0XG4gICAgICBpZiAoIHBvc3RfcHVyY2hhc2UgIT09IHRydWUgKSB7XG4gICAgICAgIGdhKCdlYzphZGRQcm9kdWN0Jywge1xuICAgICAgICAgICdpZCc6ICdtaW5ucG9zdF8nICsgbGV2ZWwudG9Mb3dlckNhc2UoKSArICdfbWVtYmVyc2hpcCcsXG4gICAgICAgICAgJ25hbWUnOiAnTWlublBvc3QgJyArIGxldmVsLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgbGV2ZWwuc2xpY2UoMSkgKyAnIE1lbWJlcnNoaXAnLFxuICAgICAgICAgICdjYXRlZ29yeSc6ICdEb25hdGlvbicsXG4gICAgICAgICAgJ2JyYW5kJzogJ01pbm5Qb3N0JyxcbiAgICAgICAgICAndmFyaWFudCc6ICByZWN1cnJpbmcsXG4gICAgICAgICAgJ3ByaWNlJzogYW1vdW50LFxuICAgICAgICAgICdxdWFudGl0eSc6IDFcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGVwID09PSAncHVyY2hhc2UnKSB7XG4gICAgICAgIHRoaXMuZGVidWcoJ2FkZCBhIHB1cmNoYXNlIGFjdGlvbi4gc3RlcCBpcyAnICsgc3RlcCk7XG4gICAgICAgIGdhKCdlYzpzZXRBY3Rpb24nLCBzdGVwLHtcbiAgICAgICAgICAnaWQnOiBvcHBfaWQsIC8vIFRyYW5zYWN0aW9uIGlkIC0gVHlwZTogc3RyaW5nXG4gICAgICAgICAgJ2FmZmlsaWF0aW9uJzogJ01pbm5Qb3N0JywgLy8gU3RvcmUgbmFtZSAtIFR5cGU6IHN0cmluZ1xuICAgICAgICAgICdyZXZlbnVlJzogYW1vdW50LCAvLyBUb3RhbCBSZXZlbnVlIC0gVHlwZTogbnVtZXJpY1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZGVidWcoJ2FkZCBhIGNoZWNrb3V0IGFjdGlvbi4gc3RlcCBpcyAnICsgc3RlcCk7XG4gICAgICAgIGdhKCdlYzpzZXRBY3Rpb24nLCdjaGVja291dCcsIHtcbiAgICAgICAgICAnc3RlcCc6IHN0ZXAsICAgICAgICAgICAgLy8gQSB2YWx1ZSBvZiAxIGluZGljYXRlcyBmaXJzdCBjaGVja291dCBzdGVwLlZhbHVlIG9mIDIgaW5kaWNhdGVzIHNlY29uZCBjaGVja291dCBzdGVwXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBnYSgnc2V0Jywge1xuICAgICAgICBwYWdlOiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUsXG4gICAgICAgIHRpdGxlOiB0aXRsZVxuICAgICAgfSk7XG4gICAgICBnYSgnc2VuZCcsICdwYWdldmlldycsIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSk7XG5cbiAgICB9LCAvLyBhbmFseXRpY3NUcmFja2luZ1N0ZXBcblxuICAgIGNhbGN1bGF0ZUZlZXM6IGZ1bmN0aW9uKGFtb3VudCwgcGF5bWVudF90eXBlKSB7XG4gICAgICAvLyB0aGlzIHNlbmRzIHRoZSBhbW91bnQgYW5kIHBheW1lbnQgdHlwZSB0byBweXRob247IGdldCB0aGUgZmVlIGFuZCBkaXNwbGF5IGl0IHRvIHRoZSB1c2VyIG9uIHRoZSBjaGVja2JveCBsYWJlbFxuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIGFtb3VudDogYW1vdW50LFxuICAgICAgICBwYXltZW50X3R5cGU6IHBheW1lbnRfdHlwZVxuICAgICAgfTtcbiAgICAgICQuYWpheCh7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICB1cmw6ICcvY2FsY3VsYXRlLWZlZXMvJyxcbiAgICAgICAgZGF0YTogZGF0YVxuICAgICAgfSkuZG9uZShmdW5jdGlvbiggZGF0YSApIHtcbiAgICAgICAgaWYgKCQoZGF0YS5mZWVzKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgJCh0aGF0Lm9wdGlvbnMuZmVlX2Ftb3VudCkudGV4dChwYXJzZUZsb2F0KGRhdGEuZmVlcykudG9GaXhlZCgyKSk7XG4gICAgICAgICAgdGhhdC5jcmVkaXRDYXJkRmVlQ2hlY2tib3goJCh0aGF0Lm9wdGlvbnMucGF5X2NjX3Byb2Nlc3Npbmdfc2VsZWN0b3IpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSwgLy8gY2FsY3VsYXRlRmVlc1xuXG4gICAgY3JlZGl0Q2FyZFByb2Nlc3NpbmdGZWVzOiBmdW5jdGlvbihvcHRpb25zLCByZXNldCkge1xuICAgICAgLy8gdGhpcyBhZGRzIG9yIHN1YnRyYWN0cyB0aGUgZmVlIHRvIHRoZSBvcmlnaW5hbCBhbW91bnQgd2hlbiB0aGUgdXNlciBpbmRpY2F0ZXMgdGhleSBkbyBvciBkbyBub3Qgd2FudCB0byBwYXkgdGhlIGZlZXNcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHRoYXQuY3JlZGl0Q2FyZEZlZUNoZWNrYm94KCQodGhpcy5vcHRpb25zLnBheV9jY19wcm9jZXNzaW5nX3NlbGVjdG9yKSk7XG4gICAgICAkKHRoaXMub3B0aW9ucy5wYXlfY2NfcHJvY2Vzc2luZ19zZWxlY3Rvcikub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB0aGF0LmNyZWRpdENhcmRGZWVDaGVja2JveCh0aGlzKTtcbiAgICAgIH0pO1xuICAgIH0sIC8vIGNyZWRpdENhcmRQcm9jZXNzaW5nRmVlc1xuXG4gICAgY3JlZGl0Q2FyZEZlZUNoZWNrYm94OiBmdW5jdGlvbihmaWVsZCkge1xuICAgICAgdmFyIGZ1bGxfYW1vdW50O1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgaWYgKCQoZmllbGQpLmlzKCc6Y2hlY2tlZCcpIHx8ICQoZmllbGQpLnByb3AoJ2NoZWNrZWQnKSkge1xuICAgICAgICAkKCcuYW1vdW50IC5sZXZlbC1hbW91bnQnKS5hZGRDbGFzcygnZnVsbC1hbW91bnQnKTtcbiAgICAgICAgZnVsbF9hbW91bnQgPSAodGhhdC5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCArIHBhcnNlRmxvYXQoJCh0aGF0Lm9wdGlvbnMuZmVlX2Ftb3VudCkudGV4dCgpKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmdWxsX2Ftb3VudCA9IHRoYXQub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQ7XG4gICAgICB9XG4gICAgICAkKHRoYXQub3B0aW9ucy5mdWxsX2Ftb3VudF9zZWxlY3RvcikudGV4dChwYXJzZUZsb2F0KGZ1bGxfYW1vdW50KS50b0ZpeGVkKDIpKTtcbiAgICB9LCAvLyBjcmVkaXRDYXJkRmVlQ2hlY2tib3hcblxuICAgIGRvbmF0ZUFub255bW91c2x5OiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICBpZiAoJChvcHRpb25zLmFub255bW91c19zZWxlY3RvciwgZWxlbWVudCkuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgJChvcHRpb25zLm5hbWVfc2VsZWN0b3IgKyAnIGRpdjpmaXJzdCcsIGVsZW1lbnQpLmhpZGUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQob3B0aW9ucy5uYW1lX3NlbGVjdG9yICsgJyBkaXY6Zmlyc3QnLCBlbGVtZW50KS5zaG93KCk7XG4gICAgICB9XG5cbiAgICAgICQob3B0aW9ucy5hbm9ueW1vdXNfc2VsZWN0b3IsIGVsZW1lbnQpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCQodGhpcykuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgICAkKG9wdGlvbnMubmFtZV9zZWxlY3RvciArICcgZGl2OmZpcnN0JywgZWxlbWVudCkuaGlkZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICQob3B0aW9ucy5uYW1lX3NlbGVjdG9yICsgJyBkaXY6Zmlyc3QnLCBlbGVtZW50KS5zaG93KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sIC8vIGRvbmF0ZUFub255bW91c2x5XG5cbiAgICBjaGVja0xldmVsOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zLCByZXR1cm52YWx1ZSkge1xuICAgICAgdmFyIGxldmVsID0gJyc7XG4gICAgICB2YXIgbGV2ZWxudW0gPSAwO1xuICAgICAgdmFyIGxldmVsY2xhc3MgPSAnbGV2ZWwgbGV2ZWwtLSc7XG4gICAgICB2YXIgYW1vdW50X3llYXJseTtcbiAgICAgIHZhciBmcmVxdWVuY3kgPSBvcHRpb25zLmZyZXF1ZW5jeTtcbiAgICAgIHZhciBhbW91bnQgPSBvcHRpb25zLm9yaWdpbmFsX2Ftb3VudDtcblxuICAgICAgaWYgKGZyZXF1ZW5jeSA9PT0gMTIpIHtcbiAgICAgICAgYW1vdW50X3llYXJseSA9IGFtb3VudCAqIGZyZXF1ZW5jeTtcbiAgICAgIH0gZWxzZSBpZiAoZnJlcXVlbmN5ID09PSAxKSB7XG4gICAgICAgIGFtb3VudF95ZWFybHkgPSBhbW91bnQ7XG4gICAgICB9XG4gICAgICBcbiAgICAgICQuZWFjaChvcHRpb25zLmxldmVscywgZnVuY3Rpb24oaW5kZXgsIHZhbHVlKSB7XG4gICAgICAgIHZhciBuYW1lID0gdmFsdWUubmFtZTtcbiAgICAgICAgdmFyIG51bSA9IGluZGV4O1xuICAgICAgICB2YXIgbWF4ID0gdmFsdWUubWF4O1xuICAgICAgICB2YXIgbWluID0gdmFsdWUubWluO1xuICAgICAgICBpZiAodHlwZW9mIG1pbiAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIG1heCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBpZiAoYW1vdW50X3llYXJseSA+PSBtaW4gJiYgYW1vdW50X3llYXJseSA8IG1heCkge1xuICAgICAgICAgICAgbGV2ZWwgPSBuYW1lO1xuICAgICAgICAgICAgbGV2ZWxudW0gPSBudW07XG4gICAgICAgICAgICBsZXZlbGNsYXNzICs9IG51bTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG1heCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBpZiAoYW1vdW50X3llYXJseSA8IG1heCkge1xuICAgICAgICAgICAgbGV2ZWwgPSBuYW1lO1xuICAgICAgICAgICAgbGV2ZWxudW0gPSBudW07XG4gICAgICAgICAgICBsZXZlbGNsYXNzICs9IG51bTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG1pbiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBpZiAoYW1vdW50X3llYXJseSA+PSBtaW4pIHtcbiAgICAgICAgICAgIGxldmVsID0gbmFtZTtcbiAgICAgICAgICAgIGxldmVsbnVtID0gbnVtO1xuICAgICAgICAgICAgbGV2ZWxjbGFzcyArPSBudW07XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmIChyZXR1cm52YWx1ZSA9PT0gJ25hbWUnKSB7XG4gICAgICAgIHJldHVybiBsZXZlbDtcbiAgICAgIH0gZWxzZSBpZiAocmV0dXJudmFsdWUgPT09ICdudW0nKSB7XG4gICAgICAgIHJldHVybiBsZXZlbG51bTsgIFxuICAgICAgfVxuICAgIH0sIC8vIGNoZWNrTGV2ZWxcblxuICAgIGhvbm9yT3JNZW1vcnk6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIGlmICgkKG9wdGlvbnMuaG9ub3Jfb3JfbWVtb3J5X2Nob29zZXIgKyAnOmNoZWNrZWQnKS52YWwoKSkge1xuICAgICAgICAkKG9wdGlvbnMuaG9ub3JfbWVtb3J5X2lucHV0X2dyb3VwLCBlbGVtZW50KS5zaG93KCk7XG4gICAgICAgIGlmICgkKG9wdGlvbnMuaG9ub3Jfc2VsZWN0b3IsIGVsZW1lbnQpLmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgICAgJChvcHRpb25zLmluX2hvbm9yX29yX21lbW9yeV9maWVsZF9zZWxlY3RvciArICcgc3BhbicgKyBvcHRpb25zLmhvbm9yX25hbWVfc2VsZWN0b3IsIGVsZW1lbnQpLnNob3coKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkKG9wdGlvbnMuaW5faG9ub3Jfb3JfbWVtb3J5X2ZpZWxkX3NlbGVjdG9yICsgJyBzcGFuJyArIG9wdGlvbnMuaG9ub3JfbmFtZV9zZWxlY3RvciwgZWxlbWVudCkuaGlkZSgpO1xuICAgICAgICAgICQob3B0aW9ucy5ob25vcl9uYW1lX3NlbGVjdG9yICsgJyBpbnB1dCcsIGVsZW1lbnQpLnZhbCgnJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCQob3B0aW9ucy5tZW1vcnlfc2VsZWN0b3IsIGVsZW1lbnQpLmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgICAgJChvcHRpb25zLmluX2hvbm9yX29yX21lbW9yeV9maWVsZF9zZWxlY3RvciArICcgc3BhbicgKyBvcHRpb25zLm1lbW9yeV9uYW1lX3NlbGVjdG9yLCBlbGVtZW50KS5zaG93KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJChvcHRpb25zLmluX2hvbm9yX29yX21lbW9yeV9maWVsZF9zZWxlY3RvciArICcgc3BhbicgKyBvcHRpb25zLm1lbW9yeV9uYW1lX3NlbGVjdG9yLCBlbGVtZW50KS5oaWRlKCk7XG4gICAgICAgICAgJChvcHRpb25zLm1lbW9yeV9uYW1lX3NlbGVjdG9yICsgJyBpbnB1dCcsIGVsZW1lbnQpLnZhbCgnJyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQob3B0aW9ucy5ob25vcl9tZW1vcnlfaW5wdXRfZ3JvdXAsIGVsZW1lbnQpLmhpZGUoKTtcbiAgICAgIH1cbiAgICB9LCAvLyBob25vck9yTWVtb3J5XG5cbiAgICBob25vck9yTWVtb3J5VG9nZ2xlOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB0aGF0Lmhvbm9yT3JNZW1vcnkodGhhdC5lbGVtZW50LCB0aGF0Lm9wdGlvbnMpO1xuICAgICAgJChvcHRpb25zLmhvbm9yX29yX21lbW9yeV9jaG9vc2VyLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoYXQuaG9ub3JPck1lbW9yeSh0aGF0LmVsZW1lbnQsIHRoYXQub3B0aW9ucyk7XG4gICAgICB9KTtcbiAgICB9LCAvLyBob25vck9yTWVtb3J5VG9nZ2xlXG5cbiAgICBvdXRzaWRlVW5pdGVkU3RhdGVzOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICAkKG9wdGlvbnMuc2hvd19iaWxsaW5nX2NvdW50cnlfc2VsZWN0b3IpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAkKG9wdGlvbnMuYmlsbGluZ19jb3VudHJ5X3NlbGVjdG9yKS5zaG93KCk7XG4gICAgICAgICQodGhpcykucGFyZW50KCkuaGlkZSgpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KTtcbiAgICAgICQob3B0aW9ucy5zaG93X3NoaXBwaW5nX2NvdW50cnlfc2VsZWN0b3IpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAkKG9wdGlvbnMuc2hpcHBpbmdfY291bnRyeV9zZWxlY3Rvcikuc2hvdygpO1xuICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmhpZGUoKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSk7XG4gICAgfSwgLy8gb3V0c2lkZVVuaXRlZFN0YXRlc1xuXG4gICAgc2hpcHBpbmdBZGRyZXNzOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB2YXIgc2hvd19zaGlwcGluZyA9IGZhbHNlO1xuICAgICAgaWYgKCQob3B0aW9ucy51c2VfZm9yX3NoaXBwaW5nX3NlbGVjdG9yKS5sZW5ndGggPiAwKSB7IC8vIHdlIGhhdmUgYSBzaGlwcGluZyBjaGVja2JveFxuICAgICAgICBzaG93X3NoaXBwaW5nID0gdHJ1ZTtcbiAgICAgIH1cbi8vICAgICAgc2hvd19zaGlwcGluZyA9ICEhJChvcHRpb25zLnVzZV9mb3Jfc2hpcHBpbmdfc2VsZWN0b3IgKyAnOmNoZWNrZWQnLCBlbGVtZW50KS5sZW5ndGg7XG4vLyAgICAgIC8vdGhpcy5kZWJ1Zygnc2hvdyBpcyB0aGVyZScpO1xuXG4vKiAgICAgICQob3B0aW9ucy51c2VfZm9yX3NoaXBwaW5nX3NlbGVjdG9yLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoYXQuc2hpcHBpbmdBZGRyZXNzKGVsZW1lbnQsIG9wdGlvbnMpO1xuICAgICAgICAvL3RoaXMuZGVidWcoJ2NoYW5nZSBpdCcpO1xuICAgICAgfSk7XG4qL1xuICAgICAgaWYgKHNob3dfc2hpcHBpbmcgPT09IHRydWUgKSB7XG4gICAgICAgICQob3B0aW9ucy51c2VfZm9yX3NoaXBwaW5nX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKS5zaG93KCk7XG4gICAgICAgIGlmICgkKG9wdGlvbnMudXNlX2Zvcl9zaGlwcGluZ19zZWxlY3RvciwgZWxlbWVudCkuaXMoJzpjaGVja2VkJykpIHsgLy8gdXNlIHNhbWUgYXMgYmlsbGluZ1xuICAgICAgICAgICQob3B0aW9ucy5zaGlwcGluZ19zZWxlY3RvcikuaGlkZSgpO1xuICAgICAgICB9IGVsc2UgeyAvLyBzZXBhcmF0ZSBzaGlwcGluZyBhbmQgYmlsbGluZ1xuICAgICAgICAgICQob3B0aW9ucy5zaGlwcGluZ19zZWxlY3Rvcikuc2hvdygpO1xuICAgICAgICB9XG4gICAgICAgICQob3B0aW9ucy51c2VfZm9yX3NoaXBwaW5nX3NlbGVjdG9yLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdGhhdC5zaGlwcGluZ0FkZHJlc3MoZWxlbWVudCwgb3B0aW9ucyk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgXG4gICAgfSwgLy8gc2hpcHBpbmdBZGRyZXNzXG5cbiAgICBhbGxvd01pbm5wb3N0QWNjb3VudDogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucywgY2hhbmdlZCkge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdmFyIGFjY291bnRfZXhpc3RzID0gZmFsc2U7XG5cbiAgICAgIGZ1bmN0aW9uIGRvbmVUeXBpbmcgKCkge1xuICAgICAgICB2YXIgZW1haWwgPSAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpO1xuICAgICAgICBhY2NvdW50X2V4aXN0cyA9IHRoYXQuY2hlY2tNaW5ucG9zdEFjY291bnRFeGlzdHMoZWxlbWVudCwgb3B0aW9ucywgZW1haWwpO1xuICAgICAgfVxuXG4gICAgICAvL3NldHVwIGJlZm9yZSBmdW5jdGlvbnNcbiAgICAgIHZhciB0eXBpbmdUaW1lcjsgICAgICAgICAgICAgICAgLy90aW1lciBpZGVudGlmaWVyXG4gICAgICB2YXIgZG9uZVR5cGluZ0ludGVydmFsID0gNTAwMDsgIC8vdGltZSBpbiBtcywgNSBzZWNvbmQgZm9yIGV4YW1wbGVcblxuICAgICAgLy9vbiBrZXl1cCwgc3RhcnQgdGhlIGNvdW50ZG93blxuICAgICAgJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5rZXl1cChmdW5jdGlvbigpe1xuICAgICAgICBjbGVhclRpbWVvdXQodHlwaW5nVGltZXIpO1xuICAgICAgICBpZiAoJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwpIHtcbiAgICAgICAgICB0eXBpbmdUaW1lciA9IHNldFRpbWVvdXQoZG9uZVR5cGluZywgZG9uZVR5cGluZ0ludGVydmFsKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIC8vdXNlciBpcyBcImZpbmlzaGVkIHR5cGluZyxcIiBkbyBzb21ldGhpbmdcblxuICAgICAgaWYgKCQob3B0aW9ucy5jcmVhdGVfbXBfc2VsZWN0b3IsIGVsZW1lbnQpLmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgICQob3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgZWxlbWVudCkuc2hvdygpO1xuICAgICAgICBvcHRpb25zLmNyZWF0ZV9hY2NvdW50ID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQob3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgZWxlbWVudCkuaGlkZSgpO1xuICAgICAgfVxuXG4gICAgICAkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoYXQuYWxsb3dNaW5ucG9zdEFjY291bnQoZWxlbWVudCwgb3B0aW9ucywgdHJ1ZSk7XG4gICAgICB9KTtcblxuICAgICAgaWYgKGNoYW5nZWQgPT09IGZhbHNlKSB7XG4gICAgICAgIC8vIGFsbG93IHVzZXJzIHRvIHNob3cgcGxhaW4gdGV4dCwgb3IgdG8gc2VlIHB3IGNyaXRlcmlhXG4gICAgICAgICQob3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgZWxlbWVudCkuYXBwZW5kKCc8ZGl2IGNsYXNzPVwiaGVscC1saW5rXCI+PHNwYW4+UGFzc3dvcmQgaGVscDwvc3Bhbj48L2Rpdj48ZGl2IGNsYXNzPVwiZm9ybS1oZWxwXCI+UGFzc3dvcmQgbXVzdCBiZSBhdCBsZWFzdCA2IGNoYXJhY3RlcnMuPC9kaXY+PGxhYmVsIGNsYXNzPVwiYWRkaXRpb25hbC1vcHRpb25cIj48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgbmFtZT1cInNob3dwYXNzd29yZFwiIGlkPVwic2hvd3Bhc3N3b3JkXCI+IFNob3cgcGFzc3dvcmQ8L2xhYmVsPicpO1xuICAgICAgICAkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKS5iZWZvcmUoJzxwIGNsYXNzPVwiYWNjb3VudC1leGlzdHMgc3VjY2Vzc1wiPlRoZXJlIGlzIGFscmVhZHkgYSBNaW5uUG9zdC5jb20gYWNjb3VudCB3aXRoIHRoaXMgZW1haWwuPC9wPicpO1xuICAgICAgICAkKCcuYWNjb3VudC1leGlzdHMnKS5oaWRlKCk7XG4gICAgICAgICQoJyNzaG93cGFzc3dvcmQnKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAoJCh0aGlzKS5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICAgICAgJCgnI3Bhc3N3b3JkJykuZ2V0KDApLnR5cGUgPSAndGV4dCc7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoJyNwYXNzd29yZCcpLmdldCgwKS50eXBlID0gJ3Bhc3N3b3JkJztcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5mb3JtLWl0ZW0gLmZvcm0taGVscCcpLmhpZGUoKTtcbiAgICAgIH1cbiAgICAgICQoJy5mb3JtLWl0ZW0tLXdpdGgtaGVscCBsYWJlbCwgLmZvcm0taXRlbS0td2l0aC1oZWxwIGlucHV0JykubmV4dCgnLmhlbHAtbGluaycpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpLm5leHQoJy5mb3JtLWhlbHAnKS50b2dnbGUoKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSk7XG4gICAgfSwgLy8gYWxsb3dNaW5ucG9zdEFjY291bnRcblxuICAgIGRpc3BsYXlBbW91bnQ6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMsIHNpbmdsZV91bml0X3ByaWNlLCBxdWFudGl0eSwgYWRkaXRpb25hbF9hbW91bnQsIHZhbGlkX2NvZGUpIHtcbiAgICAgIHZhciBhbW91bnQgPSBzaW5nbGVfdW5pdF9wcmljZSAqIHBhcnNlSW50KHF1YW50aXR5LCAxMCk7XG4gICAgICBpZiAoYWRkaXRpb25hbF9hbW91bnQgPT09ICcnKSB7XG4gICAgICAgIGFkZGl0aW9uYWxfYW1vdW50ID0gMDtcbiAgICAgICAgJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvcikucGFyZW50KCkuaGlkZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYW1vdW50ICs9IHBhcnNlSW50KGFkZGl0aW9uYWxfYW1vdW50LCAxMCk7XG4gICAgICAgIGxldmVsY2hlY2sgPSB7b3JpZ2luYWxfYW1vdW50OiBhZGRpdGlvbmFsX2Ftb3VudCwgZnJlcXVlbmN5OiAxLCBsZXZlbHM6IG9wdGlvbnMubGV2ZWxzfTtcbiAgICAgICAgbGV2ZWwgPSB0aGlzLmNoZWNrTGV2ZWwoZWxlbWVudCwgbGV2ZWxjaGVjaywgJ251bScpO1xuICAgICAgICBpZiAobGV2ZWwgPj0gMikge1xuICAgICAgICAgICQob3B0aW9ucy5jcmVhdGVfbXBfc2VsZWN0b3IpLnBhcmVudCgpLnNob3coKTtcbiAgICAgICAgfVxuICAgICAgICAkKG9wdGlvbnMuaGFzX2FkZGl0aW9uYWxfdGV4dF9zZWxlY3RvcikuaHRtbCgkKG9wdGlvbnMuaGFzX2FkZGl0aW9uYWxfdGV4dF9zZWxlY3RvcikuZGF0YSgndGV4dCcpKTtcbiAgICAgICAgJChvcHRpb25zLmFkZGl0aW9uYWxfYW1vdW50X3NlbGVjdG9yKS50ZXh0KHBhcnNlRmxvYXQoJChvcHRpb25zLmFkZGl0aW9uYWxfYW1vdW50X2ZpZWxkKS52YWwoKSkpO1xuICAgICAgfVxuXG4gICAgICAkKG9wdGlvbnMuY2FsY3VsYXRlZF9hbW91bnRfc2VsZWN0b3IpLnRleHQoYW1vdW50KTsgLy8gdGhpcyBpcyB0aGUgcHJldmlldyB0ZXh0XG4gICAgICAkKG9wdGlvbnMub3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yKS52YWwocXVhbnRpdHkgKiBzaW5nbGVfdW5pdF9wcmljZSk7IC8vIHRoaXMgaXMgdGhlIGFtb3VudCBmaWVsZFxuICAgICAgJChvcHRpb25zLnF1YW50aXR5X3NlbGVjdG9yKS50ZXh0KHF1YW50aXR5KTsgLy8gZXZlcnl3aGVyZSB0aGVyZSdzIGEgcXVhbnRpdHlcblxuICAgIH0sXG5cbiAgICBjYWxjdWxhdGVBbW91bnQ6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMsIGRhdGEpIHtcbiAgICAgIC8vdGhpcy5kZWJ1Zygnc3RhcnQuIHNldCB2YXJpYWJsZXMgYW5kIHBsYWluIHRleHQsIGFuZCByZW1vdmUgY29kZSByZXN1bHQuJyk7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB2YXIgcXVhbnRpdHkgPSAkKG9wdGlvbnMucXVhbnRpdHlfZmllbGQpLnZhbCgpO1xuXG4gICAgICB2YXIgc2luZ2xlX3VuaXRfcHJpY2UgPSAkKG9wdGlvbnMucXVhbnRpdHlfZmllbGQpLmRhdGEob3B0aW9ucy5zaW5nbGVfdW5pdF9wcmljZV9hdHRyaWJ1dGUpO1xuICAgICAgdmFyIGFkZGl0aW9uYWxfYW1vdW50ID0gJChvcHRpb25zLmFkZGl0aW9uYWxfYW1vdW50X2ZpZWxkKS52YWwoKTtcbiAgICAgIGlmIChkYXRhLnN1Y2Nlc3MgPT09IHRydWUpIHtcbiAgICAgICAgc2luZ2xlX3VuaXRfcHJpY2UgPSBkYXRhLnNpbmdsZV91bml0X3ByaWNlO1xuICAgICAgfVxuICAgICAgdGhhdC5kaXNwbGF5QW1vdW50KGVsZW1lbnQsIG9wdGlvbnMsIHNpbmdsZV91bml0X3ByaWNlLCBxdWFudGl0eSwgYWRkaXRpb25hbF9hbW91bnQsIGRhdGEuc3VjY2Vzcyk7XG5cbiAgICAgICQob3B0aW9ucy5xdWFudGl0eV9maWVsZCArICcsICcgKyBvcHRpb25zLmFkZGl0aW9uYWxfYW1vdW50X2ZpZWxkKS5jaGFuZ2UoZnVuY3Rpb24oKSB7IC8vIHRoZSBxdWFudGl0eSBvciBhZGRpdGlvbmFsIGFtb3VudCBjaGFuZ2VkXG4gICAgICAgIHF1YW50aXR5ID0gJChvcHRpb25zLnF1YW50aXR5X2ZpZWxkKS52YWwoKTtcbiAgICAgICAgYWRkaXRpb25hbF9hbW91bnQgPSAkKG9wdGlvbnMuYWRkaXRpb25hbF9hbW91bnRfZmllbGQpLnZhbCgpO1xuICAgICAgICBpZiAocXVhbnRpdHkgIT0gMSkge1xuICAgICAgICAgICQob3B0aW9ucy5pdGVtX3NlbGVjdG9yKS50ZXh0KCQob3B0aW9ucy5pdGVtX3NlbGVjdG9yKS5kYXRhKCdwbHVyYWwnKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJChvcHRpb25zLml0ZW1fc2VsZWN0b3IpLnRleHQoJChvcHRpb25zLml0ZW1fc2VsZWN0b3IpLmRhdGEoJ3NpbmdsZScpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoYXQuZGlzcGxheUFtb3VudChlbGVtZW50LCBvcHRpb25zLCBzaW5nbGVfdW5pdF9wcmljZSwgcXVhbnRpdHksIGFkZGl0aW9uYWxfYW1vdW50KTtcbiAgICAgICAgXG4gICAgICB9KTtcblxuICAgIH0sIC8vIGNhbGN1bGF0ZUFtb3VudFxuXG4gICAgY2hlY2tNaW5ucG9zdEFjY291bnRFeGlzdHM6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMsIGVtYWlsKSB7ICAgICBcbiAgICAgIHZhciB1c2VyID0ge1xuICAgICAgICBlbWFpbDogZW1haWxcbiAgICAgIH07XG4gICAgICAkLmFqYXgoe1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICB1cmw6IG9wdGlvbnMubWlubnBvc3Rfcm9vdCArICcvd3AtanNvbi91c2VyLWFjY291bnQtbWFuYWdlbWVudC92MS9jaGVjay1hY2NvdW50LWV4aXN0cycsXG4gICAgICAgIGRhdGE6IHVzZXJcbiAgICAgIH0pLmRvbmUoZnVuY3Rpb24oIHJlc3VsdCApIHtcbiAgICAgICAgaWYgKHJlc3VsdC5zdGF0dXMgPT09ICdzdWNjZXNzJyAmJiByZXN1bHQucmVhc29uID09PSAndXNlciBleGlzdHMnKSB7IC8vIHVzZXIgZXhpc3RzXG4gICAgICAgICAgaWYgKCQob3B0aW9ucy5jcmVhdGVfbXBfc2VsZWN0b3IsIGVsZW1lbnQpLmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgICAgICAkKG9wdGlvbnMucGFzc3dvcmRfc2VsZWN0b3IsIGVsZW1lbnQpLmhpZGUoKTtcbiAgICAgICAgICAgICQob3B0aW9ucy5jcmVhdGVfbXBfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpLmhpZGUoKTtcbiAgICAgICAgICAgICQoJy5hY2NvdW50LWV4aXN0cycsIGVsZW1lbnQpLnNob3coKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCQob3B0aW9ucy5jcmVhdGVfbXBfc2VsZWN0b3IsIGVsZW1lbnQpLmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgICAgICAgICQob3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgZWxlbWVudCkuaGlkZSgpO1xuICAgICAgICAgICAgICAkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKS5oaWRlKCk7XG4gICAgICAgICAgICAgICQoJy5hY2NvdW50LWV4aXN0cycsIGVsZW1lbnQpLnNob3coKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHsgLy8gdXNlciBkb2VzIG5vdCBleGlzdCBvciBhamF4IGNhbGwgZmFpbGVkXG4gICAgICAgICAgaWYgKCQob3B0aW9ucy5jcmVhdGVfbXBfc2VsZWN0b3IsIGVsZW1lbnQpLmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgICAgICAkKG9wdGlvbnMucGFzc3dvcmRfc2VsZWN0b3IsIGVsZW1lbnQpLnNob3coKTtcbiAgICAgICAgICAgIG9wdGlvbnMuY3JlYXRlX2FjY291bnQgPSB0cnVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKG9wdGlvbnMucGFzc3dvcmRfc2VsZWN0b3IsIGVsZW1lbnQpLmhpZGUoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgJCgnLmFjY291bnQtZXhpc3RzJywgZWxlbWVudCkuaGlkZSgpO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSwgLy8gY2hlY2tNaW5ucG9zdEFjY291bnRFeGlzdHNcblxuICAgIGNob29zZVBheW1lbnRNZXRob2Q6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcblxuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuXG4gICAgICBpZiAoJChvcHRpb25zLmNob29zZV9wYXltZW50KS5sZW5ndGggPiAwKSB7ICAgICAgXG4gICAgICAgIGlmICgkKG9wdGlvbnMuY2hvb3NlX3BheW1lbnQgKyAnIGlucHV0JykuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgICB2YXIgY2hlY2tlZCA9ICQob3B0aW9ucy5jaG9vc2VfcGF5bWVudCArICcgaW5wdXQ6Y2hlY2tlZCcpLmF0dHIoJ2lkJyk7XG4gICAgICAgICAgdmFyIGNoZWNrZWRfdmFsdWUgPSAkKG9wdGlvbnMuY2hvb3NlX3BheW1lbnQgKyAnIGlucHV0OmNoZWNrZWQnKS52YWwoKTtcbiAgICAgICAgICAkKG9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAkKG9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IgKyAnLicgKyBjaGVja2VkKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgJChvcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yICsgJzpub3QoLmFjdGl2ZSkgbGFiZWwnKS5yZW1vdmVDbGFzcygncmVxdWlyZWQnKTtcbiAgICAgICAgICAkKG9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IgKyAnOm5vdCguYWN0aXZlKSBpbnB1dCcpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuICAgICAgICAgICQob3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvciArICcuYWN0aXZlIGxhYmVsJykuYWRkQ2xhc3MoJ3JlcXVpcmVkJyk7XG4gICAgICAgICAgJChvcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yICsgJy5hY3RpdmUgaW5wdXQnKS5wcm9wKCdyZXF1aXJlZCcsIHRydWUpO1xuICAgICAgICAgIGlmICggY2hlY2tlZF92YWx1ZSA9PT0gJ2FjaCcgKSB7XG4gICAgICAgICAgICB0aGF0LmNhbGN1bGF0ZUZlZXModGhhdC5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCwgJ2FjaCcpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGF0LmNhbGN1bGF0ZUZlZXModGhhdC5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCwgJ3Zpc2EnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAkKG9wdGlvbnMuY2hvb3NlX3BheW1lbnQgKyAnIGlucHV0JykuY2hhbmdlKGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICQob3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvcikucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICQob3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvciArICcuJyArIHRoaXMuaWQpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAkKG9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IgKyAnOm5vdCguYWN0aXZlKSBsYWJlbCcpLnJlbW92ZUNsYXNzKCdyZXF1aXJlZCcpO1xuICAgICAgICAgICQob3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvciArICc6bm90KC5hY3RpdmUpIGlucHV0JykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICAgICAgJChvcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yICsgJy5hY3RpdmUgbGFiZWwnKS5hZGRDbGFzcygncmVxdWlyZWQnKTtcbiAgICAgICAgICAkKG9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IgKyAnLmFjdGl2ZSBpbnB1dCcpLnByb3AoJ3JlcXVpcmVkJywgdHJ1ZSk7XG4gICAgICAgICAgJCgnI2JhbmtUb2tlbicpLnJlbW92ZSgpO1xuICAgICAgICAgIGlmICggdGhpcy52YWx1ZSA9PT0gJ2FjaCcgKSB7XG4gICAgICAgICAgICB0aGF0LmNhbGN1bGF0ZUZlZXModGhhdC5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCwgJ2FjaCcpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGF0LmNhbGN1bGF0ZUZlZXModGhhdC5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCwgJ3Zpc2EnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sIC8vIGNob29zZVBheW1lbnRNZXRob2RcblxuICAgIGNyZWRpdENhcmRGaWVsZHM6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcblxuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuXG4gICAgICAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikucHJlcGVuZCgnPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBpZD1cInNvdXJjZVwiIG5hbWU9XCJzb3VyY2VcIiB2YWx1ZT1cIicgKyBkb2N1bWVudC5yZWZlcnJlciArICdcIiAvPicpO1xuXG4gICAgICB2YXIgc3R5bGUgPSB7XG4gICAgICAgIGJhc2U6IHtcbiAgICAgICAgICBpY29uQ29sb3I6ICcjNjY2RUU4JyxcbiAgICAgICAgICBsaW5lSGVpZ2h0OiAnMzdweCcsXG4gICAgICAgICAgZm9udFdlaWdodDogNDAwLFxuICAgICAgICAgIGZvbnRGYW1pbHk6ICdHZW9yZ2lhLENhbWJyaWEsVGltZXMgTmV3IFJvbWFuLFRpbWVzLHNlcmlmJyxcbiAgICAgICAgICBmb250U2l6ZTogJzE2cHgnLFxuICAgICAgICB9LFxuICAgICAgfTtcblxuICAgICAgLy8gQWRkIGFuIGluc3RhbmNlIG9mIHRoZSBjYXJkIFVJIGNvbXBvbmVudCBpbnRvIHRoZSBgY2FyZC1lbGVtZW50YCA8ZGl2PlxuICAgICAgLy9jYXJkLm1vdW50KCcjY2FyZC1lbGVtZW50Jyk7XG4gICAgICBpZiAoICQoJy5jcmVkaXQtY2FyZC1ncm91cCcpLmxlbmd0aCA9PT0gMCAmJiAkKCcucGF5bWVudC1tZXRob2QuY2hvb3NlLWNhcmQnKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhhdC5jYXJkTnVtYmVyRWxlbWVudCA9IHRoYXQuZWxlbWVudHMuY3JlYXRlKCdjYXJkTnVtYmVyJywge1xuICAgICAgICBzdHlsZTogc3R5bGVcbiAgICAgIH0pO1xuICAgICAgdGhhdC5jYXJkTnVtYmVyRWxlbWVudC5tb3VudChvcHRpb25zLmNjX251bV9zZWxlY3Rvcik7XG5cbiAgICAgIHRoYXQuY2FyZEV4cGlyeUVsZW1lbnQgPSB0aGF0LmVsZW1lbnRzLmNyZWF0ZSgnY2FyZEV4cGlyeScsIHtcbiAgICAgICAgc3R5bGU6IHN0eWxlXG4gICAgICB9KTtcbiAgICAgIHRoYXQuY2FyZEV4cGlyeUVsZW1lbnQubW91bnQob3B0aW9ucy5jY19leHBfc2VsZWN0b3IpO1xuXG4gICAgICB0aGF0LmNhcmRDdmNFbGVtZW50ID0gdGhhdC5lbGVtZW50cy5jcmVhdGUoJ2NhcmRDdmMnLCB7XG4gICAgICAgIHN0eWxlOiBzdHlsZVxuICAgICAgfSk7XG4gICAgICB0aGF0LmNhcmRDdmNFbGVtZW50Lm1vdW50KG9wdGlvbnMuY2NfY3Z2X3NlbGVjdG9yKTtcblxuICAgICAgLy8gdmFsaWRhdGUvZXJyb3IgaGFuZGxlIHRoZSBjYXJkIGZpZWxkc1xuICAgICAgdGhhdC5jYXJkTnVtYmVyRWxlbWVudC5vbignY2hhbmdlJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgLy8gZXJyb3IgaGFuZGxpbmdcbiAgICAgICAgdGhhdC5zdHJpcGVFcnJvckRpc3BsYXkoZXZlbnQsICQob3B0aW9ucy5jY19udW1fc2VsZWN0b3IsIGVsZW1lbnQpLCBlbGVtZW50LCBvcHRpb25zICk7XG4gICAgICAgIC8vIFN3aXRjaCBicmFuZCBsb2dvXG4gICAgICAgIGlmIChldmVudC5icmFuZCkge1xuICAgICAgICAgIHRoYXQuY2FsY3VsYXRlRmVlcyh0aGF0Lm9wdGlvbnMub3JpZ2luYWxfYW1vdW50LCBldmVudC5icmFuZCk7XG4gICAgICAgICAgdGhhdC5zZXRCcmFuZEljb24oZXZlbnQuYnJhbmQpO1xuICAgICAgICB9XG4gICAgICAgIC8vc2V0T3V0Y29tZShldmVudCk7XG4gICAgICB9KTtcblxuICAgICAgdGhhdC5jYXJkRXhwaXJ5RWxlbWVudC5vbignY2hhbmdlJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgLy8gZXJyb3IgaGFuZGxpbmdcbiAgICAgICAgdGhhdC5zdHJpcGVFcnJvckRpc3BsYXkoZXZlbnQsICQob3B0aW9ucy5jY19leHBfc2VsZWN0b3IsIGVsZW1lbnQpLCBlbGVtZW50LCBvcHRpb25zICk7XG4gICAgICB9KTtcblxuICAgICAgdGhhdC5jYXJkQ3ZjRWxlbWVudC5vbignY2hhbmdlJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgLy8gZXJyb3IgaGFuZGxpbmdcbiAgICAgICAgdGhhdC5zdHJpcGVFcnJvckRpc3BsYXkoZXZlbnQsICQob3B0aW9ucy5jY19jdnZfc2VsZWN0b3IsIGVsZW1lbnQpLCBlbGVtZW50LCBvcHRpb25zICk7XG4gICAgICB9KTtcblxuICAgICAgLy8gdGhpcyBpcyB0aGUgbWV0aG9kIHRvIGNyZWF0ZSBhIHNpbmdsZSBjYXJkIGZpZWxkIGFuZCBtb3VudCBpdFxuICAgICAgLyp2YXIgY2FyZCA9IHRoYXQuZWxlbWVudHMuY3JlYXRlKFxuICAgICAgICAnY2FyZCcsXG4gICAgICAgIHtcbiAgICAgICAgICBoaWRlUG9zdGFsQ29kZTogdHJ1ZVxuICAgICAgICB9XG4gICAgICApO1xuICAgICAgLy8gQWRkIGFuIGluc3RhbmNlIG9mIHRoZSBjYXJkIFVJIGNvbXBvbmVudCBpbnRvIHRoZSBgY2FyZC1lbGVtZW50YCA8ZGl2PlxuICAgICAgY2FyZC5tb3VudCgnI2NhcmQtZWxlbWVudCcpOyovXG5cbiAgICB9LCAvLyBjcmVkaXRDYXJkRmllbGRzXG5cbiAgICBzZXRCcmFuZEljb246IGZ1bmN0aW9uKGJyYW5kKSB7XG4gICAgICB2YXIgY2FyZEJyYW5kVG9QZkNsYXNzID0ge1xuICAgICAgICAndmlzYSc6ICdwZi12aXNhJyxcbiAgICAgICAgJ21hc3RlcmNhcmQnOiAncGYtbWFzdGVyY2FyZCcsXG4gICAgICAgICdhbWV4JzogJ3BmLWFtZXJpY2FuLWV4cHJlc3MnLFxuICAgICAgICAnZGlzY292ZXInOiAncGYtZGlzY292ZXInLFxuICAgICAgICAnZGluZXJzJzogJ3BmLWRpbmVycycsXG4gICAgICAgICdqY2InOiAncGYtamNiJyxcbiAgICAgICAgJ3Vua25vd24nOiAncGYtY3JlZGl0LWNhcmQnLFxuICAgICAgfVxuICAgICAgdmFyIGJyYW5kSWNvbkVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYnJhbmQtaWNvbicpO1xuICAgICAgdmFyIHBmQ2xhc3MgPSAncGYtY3JlZGl0LWNhcmQnO1xuICAgICAgaWYgKGJyYW5kIGluIGNhcmRCcmFuZFRvUGZDbGFzcykge1xuICAgICAgICBwZkNsYXNzID0gY2FyZEJyYW5kVG9QZkNsYXNzW2JyYW5kXTtcbiAgICAgIH1cbiAgICAgIGZvciAodmFyIGkgPSBicmFuZEljb25FbGVtZW50LmNsYXNzTGlzdC5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xuICAgICAgICBicmFuZEljb25FbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoYnJhbmRJY29uRWxlbWVudC5jbGFzc0xpc3RbaV0pO1xuICAgICAgfVxuICAgICAgYnJhbmRJY29uRWxlbWVudC5jbGFzc0xpc3QuYWRkKCdwZicpO1xuICAgICAgYnJhbmRJY29uRWxlbWVudC5jbGFzc0xpc3QuYWRkKHBmQ2xhc3MpO1xuICAgIH0sXG5cbiAgICBhY2hGaWVsZHM6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIGlmIChvcHRpb25zLnBsYWlkX2VudiAhPSAnJyAmJiBvcHRpb25zLmtleSAhPSAnJyAmJiB0eXBlb2YgUGxhaWQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHZhciBsaW5rSGFuZGxlciA9IFBsYWlkLmNyZWF0ZSh7XG4gICAgICAgICAgc2VsZWN0QWNjb3VudDogdHJ1ZSxcbiAgICAgICAgICBhcGlWZXJzaW9uOiAndjInLFxuICAgICAgICAgIGVudjogb3B0aW9ucy5wbGFpZF9lbnYsXG4gICAgICAgICAgY2xpZW50TmFtZTogJ01pbm5Qb3N0JyxcbiAgICAgICAgICBrZXk6IG9wdGlvbnMucGxhaWRfcHVibGljX2tleSxcbiAgICAgICAgICBwcm9kdWN0OiAnYXV0aCcsXG4gICAgICAgICAgb25Mb2FkOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIC8vIFRoZSBMaW5rIG1vZHVsZSBmaW5pc2hlZCBsb2FkaW5nLlxuICAgICAgICAgIH0sXG4gICAgICAgICAgb25TdWNjZXNzOiBmdW5jdGlvbihwdWJsaWNfdG9rZW4sIG1ldGFkYXRhKSB7XG4gICAgICAgICAgICAvLyBUaGUgb25TdWNjZXNzIGZ1bmN0aW9uIGlzIGNhbGxlZCB3aGVuIHRoZSB1c2VyIGhhcyBzdWNjZXNzZnVsbHlcbiAgICAgICAgICAgIC8vIGF1dGhlbnRpY2F0ZWQgYW5kIHNlbGVjdGVkIGFuIGFjY291bnQgdG8gdXNlLlxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIFdoZW4gY2FsbGVkLCB5b3Ugd2lsbCBzZW5kIHRoZSBwdWJsaWNfdG9rZW4gYW5kIHRoZSBzZWxlY3RlZFxuICAgICAgICAgICAgLy8gYWNjb3VudCBJRCwgbWV0YWRhdGEuYWNjb3VudF9pZCwgdG8geW91ciBiYWNrZW5kIGFwcCBzZXJ2ZXIuXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gc2VuZERhdGFUb0JhY2tlbmRTZXJ2ZXIoe1xuICAgICAgICAgICAgLy8gICBwdWJsaWNfdG9rZW46IHB1YmxpY190b2tlbixcbiAgICAgICAgICAgIC8vICAgYWNjb3VudF9pZDogbWV0YWRhdGEuYWNjb3VudF9pZFxuICAgICAgICAgICAgLy8gfSk7XG5cbiAgICAgICAgICAgIC8vdGhpcy5kZWJ1ZygnUHVibGljIFRva2VuOiAnICsgcHVibGljX3Rva2VuKTtcbiAgICAgICAgICAgIC8vdGhpcy5kZWJ1ZygnQ3VzdG9tZXItc2VsZWN0ZWQgYWNjb3VudCBJRDogJyArIG1ldGFkYXRhLmFjY291bnRfaWQpO1xuXG4gICAgICAgICAgICB2YXIgc3VwcG9ydGZvcm0gPSAkKG9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpO1xuXG4gICAgICAgICAgICAvLyByZXNwb25zZSBjb250YWlucyBpZCBhbmQgY2FyZCwgd2hpY2ggY29udGFpbnMgYWRkaXRpb25hbCBjYXJkIGRldGFpbHNcbiAgICAgICAgICAgIC8vIEluc2VydCB0aGUgZGF0YSBpbnRvIHRoZSBmb3JtIHNvIGl0IGdldHMgc3VibWl0dGVkIHRvIHRoZSBzZXJ2ZXJcbiAgICAgICAgICAgIHN1cHBvcnRmb3JtLmFwcGVuZCgkKCc8aW5wdXQgdHlwZT1cXFwiaGlkZGVuXFxcIiBuYW1lPVxcXCJwdWJsaWNfdG9rZW5cXFwiIC8+JykudmFsKHB1YmxpY190b2tlbikpO1xuICAgICAgICAgICAgc3VwcG9ydGZvcm0uYXBwZW5kKCQoJzxpbnB1dCB0eXBlPVxcXCJoaWRkZW5cXFwiIG5hbWU9XFxcImFjY291bnRfaWRcXFwiIC8+JykudmFsKG1ldGFkYXRhLmFjY291bnRfaWQpKTtcblxuICAgICAgICAgICAgLy8gZ2V0IHRoZSBhY2NvdW50IHZhbGlkYXRlZCBieSBhamF4XG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICB1cmw6Jy9wbGFpZF90b2tlbi8nLFxuICAgICAgICAgICAgICAvL2NhY2hlOiBmYWxzZSxcbiAgICAgICAgICAgICAgZGF0YTogJChzdXBwb3J0Zm9ybSkuc2VyaWFsaXplKCksXG4gICAgICAgICAgICAgIHR5cGU6ICdQT1NUJ1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgIGlmICh0eXBlb2YgcmVzcG9uc2UuZXJyb3IgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgLy8gdGhlcmUgaXMgYW4gZXJyb3IuXG4gICAgICAgICAgICAgICAgJChvcHRpb25zLnBsYWlkX2xpbmspLnBhcmVudCgpLmFmdGVyKCc8cCBjbGFzcz1cImVycm9yXCI+JyArIHJlc3BvbnNlLmVycm9yICsgJzwvcD4nKVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vdGhpcy5kZWJ1ZygncHJpbnQgcmVzcG9uc2UgaGVyZScpO1xuICAgICAgICAgICAgICAgIC8vdGhpcy5kZWJ1ZyhyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgJChvcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5wcmVwZW5kKCc8aW5wdXQgdHlwZT1cImhpZGRlblwiIGlkPVwiYmFua1Rva2VuXCIgbmFtZT1cImJhbmtUb2tlblwiIHZhbHVlPVwiJyArIHJlc3BvbnNlLnN0cmlwZV9iYW5rX2FjY291bnRfdG9rZW4gKyAnXCIgLz4nKTtcbiAgICAgICAgICAgICAgICAkKG9wdGlvbnMucGxhaWRfbGluaywgZWxlbWVudCkuaHRtbCgnPHN0cm9uZz5Zb3VyIGFjY291bnQgd2FzIHN1Y2Nlc3NmdWxseSBhdXRob3JpemVkPC9zdHJvbmc+JykuY29udGVudHMoKS51bndyYXAoKTtcbiAgICAgICAgICAgICAgICB0aGF0LmNhbGN1bGF0ZUZlZXModGhhdC5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCwgJ2FjaCcpOyAvLyBjYWxjdWxhdGUgdGhlIGFjaCBmZWVzXG4gICAgICAgICAgICAgICAgLy8gYWRkIHRoZSBmaWVsZChzKSB3ZSBuZWVkIHRvIHRoZSBmb3JtIGZvciBzdWJtaXR0aW5nXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZXJyb3IoZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgJChvcHRpb25zLnBsYWlkX2xpbmspLnBhcmVudCgpLmFmdGVyKCc8cCBjbGFzcz1cImVycm9yXCI+JyArIHJlc3BvbnNlLmVycm9yICsgJzwvcD4nKVxuICAgICAgICAgICAgfSk7XG5cblxuICAgICAgICAgICAgXG4gICAgICAgICAgfSxcbiAgICAgICAgICBvbkV4aXQ6IGZ1bmN0aW9uKGVyciwgbWV0YWRhdGEpIHtcbiAgICAgICAgICAgIC8vIFRoZSB1c2VyIGV4aXRlZCB0aGUgTGluayBmbG93LlxuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgICAkKG9wdGlvbnMucGxhaWRfbGluaywgZWxlbWVudCkuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICQob3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvciArICcgLmVycm9yJykucmVtb3ZlKCk7IC8vIHJlbW92ZSBtZXRob2QgZXJyb3IgbWVzc2FnZSBpZiBpdCBpcyB0aGVyZVxuICAgICAgICAgIGxpbmtIYW5kbGVyLm9wZW4oKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSwgLy8gYWNoRmllbGRzXG5cbiAgICBoYXNIdG1sNVZhbGlkYXRpb246IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIC8vdGhpcy5kZWJ1ZygndmFsdWUgaXMgJyArIHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpLmNoZWNrVmFsaWRpdHkgPT09ICdmdW5jdGlvbicpO1xuICAgICAgcmV0dXJuIHR5cGVvZiBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpLmNoZWNrVmFsaWRpdHkgPT09ICdmdW5jdGlvbic7XG4gICAgfSxcblxuICAgIGJ1dHRvblN0YXR1czogZnVuY3Rpb24ob3B0aW9ucywgYnV0dG9uLCBkaXNhYmxlZCkge1xuICAgICAgYnV0dG9uLnByb3AoJ2Rpc2FibGVkJywgZGlzYWJsZWQpO1xuICAgICAgaWYgKGRpc2FibGVkID09PSBmYWxzZSkge1xuICAgICAgICBidXR0b24udGV4dChvcHRpb25zLmJ1dHRvbl90ZXh0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJ1dHRvbi50ZXh0KCdQcm9jZXNzaW5nJyk7XG4gICAgICB9XG4gICAgfSxcblxuICAgIHZhbGlkYXRlQW5kU3VibWl0OiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAkKG9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLnN1Ym1pdChmdW5jdGlvbihldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIC8vIGRvIHNvbWUgZmFsbGJhY2sgc3R1ZmYgZm9yIG5vbi1odG1sNSBicm93c2Vyc1xuICAgICAgICBpZiAodGhhdC5oYXNIdG1sNVZhbGlkYXRpb24oZWxlbWVudCwgb3B0aW9ucykpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5jaGVja1ZhbGlkaXR5KCkpIHtcbiAgICAgICAgICAgICAgJCh0aGlzKS5hZGRDbGFzcygnaW52YWxpZCcpO1xuICAgICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAkKHRoaXMpLmZpbmQoJ2lucHV0OmludmFsaWQnKS5wYXJlbnQoKS5vZmZzZXQoKS50b3BcbiAgICAgICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgICAgICAgIC8vdGhpcy5kZWJ1ZygndG9wIGlzICcgKyApO1xuICAgICAgICAgICAgICAkKHRoaXMpLmZpbmQoJ2lucHV0OmludmFsaWQnKS5wYXJlbnQoKS5hZGRDbGFzcygnZXJyb3InKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICQodGhpcykucmVtb3ZlQ2xhc3MoJ2ludmFsaWQnKTtcbiAgICAgICAgICAgICAgJCh0aGlzKS5maW5kKCdpbnB1dDppbnZhbGlkJykucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyB2YWxpZGF0ZSBhbmQgc3VibWl0IHRoZSBmb3JtXG4gICAgICAgICQoJy5jaGVjay1maWVsZCcpLnJlbW92ZSgpO1xuICAgICAgICAkKCdpbnB1dCwgbGFiZWwnLCBlbGVtZW50KS5yZW1vdmVDbGFzcygnZXJyb3InKTtcbiAgICAgICAgdmFyIHZhbGlkID0gdHJ1ZTtcbiAgICAgICAgdmFyIHBheW1lbnRfbWV0aG9kID0gJ2NhcmQnO1xuICAgICAgICBpZiAoJChvcHRpb25zLmNob29zZV9wYXltZW50KS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgcGF5bWVudF9tZXRob2QgPSAkKG9wdGlvbnMuY2hvb3NlX3BheW1lbnQgKyAnIGlucHV0OmNoZWNrZWQnKS52YWwoKTtcbiAgICAgICAgfVxuICAgICAgICAkKG9wdGlvbnMuY2hvb3NlX3BheW1lbnQgKyAnIGlucHV0JykuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICQob3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvciArICcgLmVycm9yJykucmVtb3ZlKCk7IC8vIHJlbW92ZSBtZXRob2QgZXJyb3IgbWVzc2FnZSBpZiBpdCBpcyB0aGVyZVxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAocGF5bWVudF9tZXRob2QgPT09ICdhY2gnKSB7XG4gICAgICAgICAgaWYgKCQoJ2lucHV0W25hbWU9XCJiYW5rVG9rZW5cIl0nKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAkKG9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IpLnByZXBlbmQoJzxwIGNsYXNzPVwiZXJyb3JcIj5Zb3UgYXJlIHJlcXVpcmVkIHRvIGVudGVyIGNyZWRpdCBjYXJkIGluZm9ybWF0aW9uLCBvciB0byBhdXRob3JpemUgTWlublBvc3QgdG8gY2hhcmdlIHlvdXIgYmFuayBhY2NvdW50LCB0byBtYWtlIGEgcGF5bWVudC48L3A+Jyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbGlkID09PSB0cnVlKSB7XG4gICAgICAgICAgLy8gMS4gcHJvY2VzcyBkb25hdGlvbiB0byBzdHJpcGVcbiAgICAgICAgICB0aGF0LmJ1dHRvblN0YXR1cyhvcHRpb25zLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIHRydWUpO1xuXG4gICAgICAgICAgdmFyIGZ1bGxfbmFtZSA9ICcnO1xuICAgICAgICAgIGlmICgkKCcjZnVsbF9uYW1lJykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgZnVsbF9uYW1lID0gJCgnI2Z1bGxfbmFtZScpLnZhbCgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmdWxsX25hbWUgPSAkKCcjZmlyc3RfbmFtZScpLnZhbCgpICsgJyAnICsgJCgnI2xhc3RfbmFtZScpLnZhbCgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBzdHJlZXQgPSAnTm9uZSc7XG4gICAgICAgICAgaWYgKCQoJ2lucHV0W25hbWU9XCJmdWxsX2FkZHJlc3NcIl0nKS52YWwoKSAhPSAnJykge1xuICAgICAgICAgICAgc3RyZWV0ID0gJCgnI2Z1bGxfYWRkcmVzcycpLnZhbCgpO1xuICAgICAgICAgICAgaWYgKCQoJ2lucHV0W25hbWU9XCJiaWxsaW5nX3N0cmVldFwiXScpLnZhbCgpICE9ICcnKSB7XG4gICAgICAgICAgICAgIHN0cmVldCA9ICQoJ2lucHV0W25hbWU9XCJiaWxsaW5nX3N0cmVldFwiXScpLnZhbCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBjaXR5ID0gJ05vbmUnO1xuICAgICAgICAgIGlmICgkKCdpbnB1dFtuYW1lPVwiYmlsbGluZ19jaXR5XCJdJykudmFsKCkgIT0gJycpIHtcbiAgICAgICAgICAgIGNpdHkgPSAkKCdpbnB1dFtuYW1lPVwiYmlsbGluZ19jaXR5XCJdJykudmFsKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIHN0YXRlID0gJ05vbmUnO1xuICAgICAgICAgIGlmICgkKCdpbnB1dFtuYW1lPVwiYmlsbGluZ19zdGF0ZVwiXScpLnZhbCgpICE9ICcnKSB7XG4gICAgICAgICAgICBzdGF0ZSA9ICQoJ2lucHV0W25hbWU9XCJiaWxsaW5nX3N0YXRlXCJdJykudmFsKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIHppcCA9ICdOb25lJztcbiAgICAgICAgICBpZiAoJCgnaW5wdXRbbmFtZT1cImJpbGxpbmdfemlwXCJdJykudmFsKCkgIT0gJycpIHtcbiAgICAgICAgICAgIHppcCA9ICQoJ2lucHV0W25hbWU9XCJiaWxsaW5nX3ppcFwiXScpLnZhbCgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBjb3VudHJ5ID0gJ1VTJztcbiAgICAgICAgICBpZiAoJCgnaW5wdXRbbmFtZT1cImJpbGxpbmdfY291bnRyeVwiXScpLnZhbCgpICE9ICcnKSB7XG4gICAgICAgICAgICBjb3VudHJ5ID0gJCgnaW5wdXRbbmFtZT1cImJpbGxpbmdfY291bnRyeVwiXScpLnZhbCgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIDIuIGNyZWF0ZSBtaW5ucG9zdCBhY2NvdW50IGlmIHNwZWNpZmllZFxuICAgICAgICAgIGlmIChvcHRpb25zLmNyZWF0ZV9hY2NvdW50ID09PSB0cnVlKSB7XG4gICAgICAgICAgICB2YXIgdXNlciA9IHtcbiAgICAgICAgICAgICAgZW1haWw6ICQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgICAgIGZpcnN0X25hbWU6ICQob3B0aW9ucy5maXJzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICAgICAgbGFzdF9uYW1lOiAkKG9wdGlvbnMubGFzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICAgICAgcGFzc3dvcmQ6ICQob3B0aW9ucy5wYXNzd29yZF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgICAgIGNpdHk6ICQob3B0aW9ucy5hY2NvdW50X2NpdHlfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgICAgICBzdGF0ZTogJChvcHRpb25zLmFjY291bnRfc3RhdGVfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgICAgICB6aXA6ICQob3B0aW9ucy5hY2NvdW50X3ppcF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICAgIHVybDogb3B0aW9ucy5taW5ucG9zdF9yb290ICsgJy93cC1qc29uL3VzZXItYWNjb3VudC1tYW5hZ2VtZW50L3YxL2NyZWF0ZS11c2VyJyxcbiAgICAgICAgICAgICAgZGF0YTogdXNlclxuICAgICAgICAgICAgfSkuZG9uZShmdW5jdGlvbiggZGF0YSApIHtcbiAgICAgICAgICAgICAgaWYgKGRhdGEuc3RhdHVzID09PSAnc3VjY2VzcycgJiYgZGF0YS5yZWFzb24gPT09ICduZXcgdXNlcicpIHtcbiAgICAgICAgICAgICAgICAvLyB1c2VyIGNyZWF0ZWQgLSB0aGV5IHNob3VsZCByZWNlaXZlIGVtYWlsXG4gICAgICAgICAgICAgICAgLy8gc3VibWl0IHRoZSBmb3JtXG4gICAgICAgICAgICAgICAgLy9zdXBwb3J0Zm9ybS5nZXQoMCkuc3VibWl0KCk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gdXNlciBub3QgY3JlYXRlZFxuICAgICAgICAgICAgICAgIC8vIHN0aWxsIHN1Ym1pdCB0aGUgZm9ybVxuICAgICAgICAgICAgICAgIC8vc3VwcG9ydGZvcm0uZ2V0KDApLnN1Ym1pdCgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoJCgnaW5wdXRbbmFtZT1cImJhbmtUb2tlblwiXScpLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAvLyBmaW5hbGx5LCBnZXQgYSB0b2tlbiBmcm9tIHN0cmlwZSwgYW5kIHRyeSB0byBjaGFyZ2UgaXQgaWYgaXQgaXMgbm90IGFjaFxuICAgICAgICAgICAgdGhhdC5jcmVhdGVUb2tlbih0aGF0LmNhcmROdW1iZXJFbGVtZW50KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gaWYgaXQgaXMgYWNoLCB3ZSBhbHJlYWR5IGhhdmUgYSB0b2tlbiBzbyBwYXNzIGl0IHRvIHN0cmlwZS5cbiAgICAgICAgICAgIHRoYXQuc3RyaXBlVG9rZW5IYW5kbGVyKCAkKCcjYmFua1Rva2VuJykudmFsKCksICdhY2gnICk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIHRoaXMgbWVhbnMgdmFsaWQgaXMgZmFsc2VcbiAgICAgICAgICB0aGF0LmJ1dHRvblN0YXR1cyhvcHRpb25zLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIGZhbHNlKTtcbiAgICAgICAgfVxuXG4gICAgICB9KTtcbiAgICB9LCAvLyB2YWxpZGF0ZUFuZFN1Ym1pdFxuXG4gICAgc3RyaXBlRXJyb3JEaXNwbGF5OiBmdW5jdGlvbihldmVudCwgdGhpc19zZWxlY3RvciwgZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgLy8gbGlzdGVuIGZvciBlcnJvcnMgYW5kIGRpc3BsYXkvaGlkZSBlcnJvciBtZXNzYWdlc1xuICAgICAgdmFyIHdoaWNoX2Vycm9yID0gdGhpc19zZWxlY3Rvci5hdHRyKCdpZCcpO1xuICAgICAgaWYgKGV2ZW50LmVycm9yKSB7XG4gICAgICAgICQoJy5jYXJkLWluc3RydWN0aW9uLicgKyB3aGljaF9lcnJvcikudGV4dChldmVudC5lcnJvci5tZXNzYWdlICsgJyBQbGVhc2UgdHJ5IGFnYWluLicpO1xuICAgICAgICAkKCcuY2FyZC1pbnN0cnVjdGlvbi4nICsgd2hpY2hfZXJyb3IpLmFkZENsYXNzKCdpbnZhbGlkJyk7XG4gICAgICAgIHRoaXNfc2VsZWN0b3IucGFyZW50KCkuYWRkQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkKCcuY2FyZC1pbnN0cnVjdGlvbi4nICsgd2hpY2hfZXJyb3IpLnJlbW92ZUNsYXNzKCdpbnZhbGlkJyk7XG4gICAgICAgICQoJy5jYXJkLWluc3RydWN0aW9uLicgKyB3aGljaF9lcnJvcikuZW1wdHkoKTtcbiAgICAgICAgJChvcHRpb25zLmNjX251bV9zZWxlY3RvciwgZWxlbWVudCkucmVtb3ZlQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICQob3B0aW9ucy5jY19leHBfc2VsZWN0b3IsIGVsZW1lbnQpLnJlbW92ZUNsYXNzKCdlcnJvcicpO1xuICAgICAgICAkKG9wdGlvbnMuY2NfY3Z2X3NlbGVjdG9yLCBlbGVtZW50KS5yZW1vdmVDbGFzcygnZXJyb3InKTtcbiAgICAgICAgJChvcHRpb25zLmNjX251bV9zZWxlY3RvciwgZWxlbWVudCkucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICQob3B0aW9ucy5jY19leHBfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdlcnJvcicpO1xuICAgICAgICAkKG9wdGlvbnMuY2NfY3Z2X3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnZXJyb3InKTtcbiAgICAgIH1cbiAgICB9LCAvLyBzdHJpcGVFcnJvckRpc3BsYXlcblxuICAgIGNyZWF0ZVRva2VuOiBmdW5jdGlvbihjYXJkKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB0aGF0LnN0cmlwZS5jcmVhdGVUb2tlbihjYXJkKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICBpZiAocmVzdWx0LmVycm9yKSB7XG4gICAgICAgICAgLy8gU2hvdyB0aGUgZXJyb3JzIG9uIHRoZSBmb3JtXG4gICAgICAgICAgdGhhdC5idXR0b25TdGF0dXMob3B0aW9ucywgJCh0aGF0Lm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLmZpbmQoJ2J1dHRvbicpLCBmYWxzZSk7XG4gICAgICAgICAgdmFyIGZpZWxkID0gcmVzdWx0LmVycm9yLmZpZWxkICsgJ19maWVsZF9zZWxlY3Rvcic7XG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSAnJztcbiAgICAgICAgICBpZiAodHlwZW9mIHJlc3VsdC5lcnJvci5tZXNzYWdlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgbWVzc2FnZSA9IHJlc3VsdC5lcnJvci5tZXNzYWdlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtZXNzYWdlID0gcmVzdWx0LmVycm9yLm1lc3NhZ2VbMF07XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICgkKGZpZWxkKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAkKHRoYXQub3B0aW9uc1tmaWVsZF0sIGVsZW1lbnQpLmFkZENsYXNzKCdlcnJvcicpO1xuICAgICAgICAgICAgJCh0aGF0Lm9wdGlvbnNbZmllbGRdLCBlbGVtZW50KS5wcmV2KCkuYWRkQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICAgICAkKHRoYXQub3B0aW9uc1tmaWVsZF0sIGVsZW1lbnQpLmFmdGVyKCc8c3BhbiBjbGFzcz1cImNoZWNrLWZpZWxkIGludmFsaWRcIj4nICsgbWVzc2FnZSArICc8L3NwYW4+Jyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHJlc3VsdC5lcnJvci5maWVsZCA9PSAnY3NyZl90b2tlbicpIHtcbiAgICAgICAgICAgICQoJ2J1dHRvbi5naXZlJykuYmVmb3JlKCc8cCBjbGFzcz1cImVycm9yXCI+U29ycnksIHRoaXMgZm9ybSBoYWQgYSBiYWNrLWVuZCBlcnJvciBhbmQgd2FzIHVuYWJsZSB0byBjb21wbGV0ZSB5b3VyIGRvbmF0aW9uLiBQbGVhc2UgPGEgaHJlZj1cIiNcIiBvbmNsaWNrPVwibG9jYXRpb24ucmVsb2FkKCk7IHJldHVybiBmYWxzZTtcIj5yZWxvYWQgdGhlIHBhZ2U8L2E+IGFuZCB0cnkgYWdhaW4gKHdlIHdpbGwgcHJlc2VydmUgYXMgbXVjaCBvZiB5b3VyIGluZm9ybWF0aW9uIGFzIHBvc3NpYmxlKS48L3A+JylcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gU2VuZCB0aGUgdG9rZW4gdG8geW91ciBzZXJ2ZXJcbiAgICAgICAgICB0aGF0LnN0cmlwZVRva2VuSGFuZGxlcihyZXN1bHQudG9rZW4sICdjYXJkJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sIC8vIGNyZWF0ZVRva2VuXG5cbiAgICBzdHJpcGVUb2tlbkhhbmRsZXI6IGZ1bmN0aW9uKHRva2VuLCB0eXBlKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAvLyBJbnNlcnQgdGhlIHRva2VuIElEIGludG8gdGhlIGZvcm0gc28gaXQgZ2V0cyBzdWJtaXR0ZWQgdG8gdGhlIHNlcnZlclxuICAgICAgdmFyIHN1cHBvcnRmb3JtID0gJCh0aGlzLm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpO1xuICAgICAgaWYgKCB0eXBlID09PSAnY2FyZCcgKSB7XG4gICAgICAgIHN1cHBvcnRmb3JtLmFwcGVuZCgkKCc8aW5wdXQgdHlwZT1cXFwiaGlkZGVuXFxcIiBuYW1lPVxcXCJzdHJpcGVUb2tlblxcXCI+JykudmFsKHRva2VuLmlkKSk7XG4gICAgICAgIGlmICgkKCdpbnB1dFtuYW1lPVwicGF5bWVudF90eXBlXCJdJykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICQoJ2lucHV0W25hbWU9XCJwYXltZW50X3R5cGVcIl0nKS52YWwodG9rZW4uY2FyZC5icmFuZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3VwcG9ydGZvcm0uYXBwZW5kKCQoJzxpbnB1dCB0eXBlPVxcXCJoaWRkZW5cXFwiIG5hbWU9XFxcInBheW1lbnRfdHlwZVxcXCIgLz4nKS52YWwodG9rZW4uY2FyZC5icmFuZCkpOyAgXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoIHR5cGUgPT09ICdhY2gnICkge1xuICAgICAgICBpZiAoJCgnaW5wdXRbbmFtZT1cInBheW1lbnRfdHlwZVwiXScpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAkKCdpbnB1dFtuYW1lPVwicGF5bWVudF90eXBlXCJdJykudmFsKHR5cGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN1cHBvcnRmb3JtLmFwcGVuZCgkKCc8aW5wdXQgdHlwZT1cXFwiaGlkZGVuXFxcIiBuYW1lPVxcXCJwYXltZW50X3R5cGVcXFwiIC8+JykudmFsKHR5cGUpKTsgIFxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFN1Ym1pdCB0aGUgZm9ybVxuICAgICAgLy9zdXBwb3J0Zm9ybS5zdWJtaXQoKTtcbiAgICAgICQuYWpheCh7XG4gICAgICAgIHVybDonL2dpdmUvJyxcbiAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICBkYXRhOiAkKHN1cHBvcnRmb3JtKS5zZXJpYWxpemUoKSxcbiAgICAgICAgdHlwZTogJ1BPU1QnXG4gICAgICB9KVxuICAgICAgLmRvbmUoZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKHR5cGVvZiByZXNwb25zZS5lcnJvcnMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgLy8gZG8gbm90IHN1Ym1pdC4gdGhlcmUgaXMgYW4gZXJyb3IuXG4gICAgICAgICAgdGhhdC5idXR0b25TdGF0dXModGhhdC5vcHRpb25zLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIGZhbHNlKTtcbiAgICAgICAgICAvLyBhZGQgc29tZSBlcnJvciBtZXNzYWdlcyBhbmQgc3R5bGVzXG4gICAgICAgICAgJC5lYWNoKHJlc3BvbnNlLmVycm9ycywgZnVuY3Rpb24oIGluZGV4LCBlcnJvciApIHtcbiAgICAgICAgICAgIHZhciBmaWVsZCA9IGVycm9yLmZpZWxkICsgJ19maWVsZF9zZWxlY3Rvcic7XG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9ICcnO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBlcnJvci5tZXNzYWdlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICBtZXNzYWdlID0gZXJyb3IubWVzc2FnZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIG1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlWzBdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCQoZmllbGQpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgJChvcHRpb25zW2ZpZWxkXSkuYWRkQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICAgICAgICQob3B0aW9uc1tmaWVsZF0pLnByZXYoKS5hZGRDbGFzcygnZXJyb3InKTtcbiAgICAgICAgICAgICAgJChvcHRpb25zW2ZpZWxkXSkuYWZ0ZXIoJzxzcGFuIGNsYXNzPVwiY2hlY2stZmllbGQgaW52YWxpZFwiPicgKyBtZXNzYWdlICsgJzwvc3Bhbj4nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBlcnJvciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgaWYgKGVycm9yLmNvZGUgPT0gJ2ludmFsaWRfbnVtYmVyJyB8fCBlcnJvci5jb2RlID09ICdpbmNvcnJlY3RfbnVtYmVyJyB8fCBlcnJvci5jb2RlID09ICdjYXJkX2RlY2xpbmVkJyB8fCBlcnJvci5jb2RlID09ICdwcm9jZXNzaW5nX2Vycm9yJykge1xuICAgICAgICAgICAgICAgIC8vIGVycm9yIGhhbmRsaW5nXG4gICAgICAgICAgICAgICAgdGhhdC5zdHJpcGVFcnJvckRpc3BsYXkocmVzcG9uc2UuZXJyb3JzLCAkKHRoYXQub3B0aW9ucy5jY19udW1fc2VsZWN0b3IpLCB0aGF0LmVsZW1lbnQsIHRoYXQub3B0aW9ucyApO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKGVycm9yLmNvZGUgPT0gJ2ludmFsaWRfZXhwaXJ5X21vbnRoJyB8fCBlcnJvci5jb2RlID09ICdpbnZhbGlkX2V4cGlyeV95ZWFyJyB8fCBlcnJvci5jb2RlID09ICdleHBpcmVkX2NhcmQnKSB7XG4gICAgICAgICAgICAgICAgLy8gZXJyb3IgaGFuZGxpbmdcbiAgICAgICAgICAgICAgICB0aGF0LnN0cmlwZUVycm9yRGlzcGxheShyZXNwb25zZS5lcnJvcnMsICQodGhhdC5vcHRpb25zLmNjX2V4cF9zZWxlY3RvciksIHRoYXQuZWxlbWVudCwgdGhhdC5vcHRpb25zICk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAoZXJyb3IuY29kZSA9PSAnaW52YWxpZF9jdmMnIHx8IGVycm9yLmNvZGUgPT0gJ2luY29ycmVjdF9jdmMnKSB7XG4gICAgICAgICAgICAgICAgLy8gZXJyb3IgaGFuZGxpbmdcbiAgICAgICAgICAgICAgICB0aGF0LnN0cmlwZUVycm9yRGlzcGxheShyZXNwb25zZS5lcnJvcnMsICQodGhhdC5vcHRpb25zLmNjX2N2dl9zZWxlY3RvciksIHRoYXQuZWxlbWVudCwgdGhhdC5vcHRpb25zICk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAoZXJyb3IudHlwZSA9PSAnaW52YWxpZF9yZXF1ZXN0X2Vycm9yJykge1xuICAgICAgICAgICAgICAgICQoJ2J1dHRvbi5naXZlJykuYmVmb3JlKCc8cCBjbGFzcz1cImVycm9yXCI+JyArIGVycm9yLm1lc3NhZ2UgKyAnPC9wPicpXG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHJlc3BvbnNlLmVycm9yc1swXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgdmFyIGZpZWxkID0gcmVzcG9uc2UuZXJyb3JzWzBdLmZpZWxkICsgJ19maWVsZF9zZWxlY3Rvcic7XG4gICAgICAgICAgICAgIGlmICgkKGZpZWxkKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAkKG9wdGlvbnNbZmllbGRdKS5wYXJlbnQoKS5vZmZzZXQoKS50b3BcbiAgICAgICAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3VwcG9ydGZvcm0uZ2V0KDApLnN1Ym1pdCgpOyAvLyBjb250aW51ZSBzdWJtaXR0aW5nIHRoZSBmb3JtXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAuZXJyb3IoZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgdGhhdC5idXR0b25TdGF0dXModGhhdC5vcHRpb25zLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIGZhbHNlKTtcbiAgICAgIH0pO1xuXG4gICAgfSxcblxuICAgIHNob3dOZXdzbGV0dGVyU2V0dGluZ3M6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIGlmICgkKG9wdGlvbnMubmV3c2xldHRlcl9ncm91cF9zZWxlY3RvcikubGVuZ3RoID4gMCAmJiB0eXBlb2YgJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdmFyIGdldF9kYXRhID0ge1xuICAgICAgICAgIGVtYWlsOiAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpXG4gICAgICAgIH07XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICB1cmw6IG9wdGlvbnMubWlubnBvc3Rfcm9vdCArICcvd3AtanNvbi9taW5ucG9zdC1hcGkvdjIvbWFpbGNoaW1wL3VzZXInLFxuICAgICAgICAgIGRhdGE6IGdldF9kYXRhXG4gICAgICAgIH0pLmRvbmUoZnVuY3Rpb24oIHJlc3VsdCApIHtcbiAgICAgICAgICBpZiAoIHR5cGVvZiByZXN1bHQubWFpbGNoaW1wX3N0YXR1cyAhPT0gJ3VuZGVmaW5lZCcgKSB7XG4gICAgICAgICAgICAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLmFmdGVyKCc8aW5wdXQgbmFtZT1cIm1haWxjaGltcF9zdGF0dXNcIiB0eXBlPVwiaGlkZGVuXCIgdmFsdWU9XCInICsgcmVzdWx0Lm1haWxjaGltcF9zdGF0dXMgKyAnXCI+Jyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICggdHlwZW9mIHJlc3VsdC5tYWlsY2hpbXBfdXNlcl9pZCAhPT0gJ3VuZGVmaW5lZCcgKSB7XG4gICAgICAgICAgICAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLmFmdGVyKCc8aW5wdXQgbmFtZT1cIm1haWxjaGltcF91c2VyX2lkXCIgdHlwZT1cImhpZGRlblwiIHZhbHVlPVwiJyArIHJlc3VsdC5tYWlsY2hpbXBfdXNlcl9pZCArICdcIj4nKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHJlc3VsdC5tYWlsY2hpbXBfc3RhdHVzID09PSAnc3Vic2NyaWJlZCcpIHtcbiAgICAgICAgICAgIC8vIHVzZXIgY3JlYXRlZCAtIHNob3cgYSBzdWNjZXNzIG1lc3NhZ2VcbiAgICAgICAgICAgICQoJy5jb25maXJtLWluc3RydWN0aW9ucycpLnRleHQoJCgnLmNvbmZpcm0taW5zdHJ1Y3Rpb25zJykuYXR0cignZGF0YS1rbm93bi11c2VyJykpO1xuICAgICAgICAgICAgdmFyIGdyb3VwcyA9IHJlc3VsdC5ncm91cHM7XG4gICAgICAgICAgICAkLmVhY2goZ3JvdXBzLCBmdW5jdGlvbiggaW5kZXgsIHZhbHVlICkge1xuICAgICAgICAgICAgICBpZiAoIHZhbHVlID09PSB0cnVlICkge1xuICAgICAgICAgICAgICAgICQoJzpjaGVja2JveFtuYW1lPVwiJyArIGluZGV4ICsgJ1wiXScpLnByb3AoJ2NoZWNrZWQnLHRydWUpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQoJzpjaGVja2JveFtuYW1lPVwiJyArIGluZGV4ICsgJ1wiXScpLnByb3AoJ2NoZWNrZWQnLGZhbHNlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgIH0sIC8vIHNob3dOZXdzbGV0dGVyU2V0dGluZ3NcblxuICAgIGNvbmZpcm1NZXNzYWdlU3VibWl0OiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG5cbiAgICAgIC8vdmFyIGV4aXN0aW5nX25ld3NsZXR0ZXJfc2V0dGluZ3MgPSB0aGlzLm9wdGlvbnMuZXhpc3RpbmdfbmV3c2xldHRlcl9zZXR0aW5ncztcbiAgICAgIHZhciBleGlzdGluZ19uZXdzbGV0dGVyX3NldHRpbmdzID0gJCgnLnN1cHBvcnQtbmV3c2xldHRlciA6aW5wdXQnKS5zZXJpYWxpemUoKTtcbiAgICAgIC8vdGhpcy5kZWJ1ZyhleGlzdGluZ19uZXdzbGV0dGVyX3NldHRpbmdzKTtcblxuICAgICAgJChvcHRpb25zLmNvbmZpcm1fZm9ybV9zZWxlY3Rvcikuc3VibWl0KGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgdmFyIGNvbmZpcm1mb3JtID0gJChvcHRpb25zLmNvbmZpcm1fZm9ybV9zZWxlY3Rvcik7XG4gICAgICAgIC8vIHN1Ym1pdCBzZXR0aW5ncyB0byBtYWlsY2hpbXBcbiAgICAgICAgLy8gbmVlZCB0byBnZXQgdXNlciBpbmZvIG9uIGEgaGlkZGVuIGZpZWxkIGhlcmVcblxuICAgICAgICB2YXIgbmV3c2xldHRlcl9ncm91cHMgPSAkKG9wdGlvbnMubmV3c2xldHRlcl9ncm91cF9zZWxlY3RvciArICc6Y2hlY2tlZCcpO1xuICAgICAgICB2YXIgbWVzc2FnZV9ncm91cHMgPSAkKG9wdGlvbnMubWVzc2FnZV9ncm91cF9zZWxlY3RvciArICc6Y2hlY2tlZCcpO1xuICAgICAgICB2YXIgbmV3X25ld3NsZXR0ZXJfc2V0dGluZ3MgPSAkKCcuc3VwcG9ydC1uZXdzbGV0dGVyIDppbnB1dDpjaGVja2VkJykuc2VyaWFsaXplKCk7XG5cbiAgICAgICAgaWYgKChleGlzdGluZ19uZXdzbGV0dGVyX3NldHRpbmdzICE9PSBuZXdfbmV3c2xldHRlcl9zZXR0aW5ncykgJiYgKHR5cGVvZiBuZXdzbGV0dGVyX2dyb3VwcyAhPT0gJ3VuZGVmaW5lZCcgfHwgdHlwZW9mIG1lc3NhZ2VfZ3JvdXBzICE9PSAndW5kZWZpbmVkJykpIHtcbiAgICAgICAgICAvL2FkZCBvdXIgb3duIGFqYXggY2hlY2sgYXMgWC1SZXF1ZXN0ZWQtV2l0aCBpcyBub3QgYWx3YXlzIHJlbGlhYmxlXG4gICAgICAgICAgLy9hamF4X2Zvcm1fZGF0YSA9IG5ld19uZXdzbGV0dGVyX3NldHRpbmdzICsgJyZhamF4cmVxdWVzdD10cnVlJnN1YnNjcmliZSc7XG5cbiAgICAgICAgICB2YXIgcG9zdF9kYXRhID0ge1xuICAgICAgICAgICAgZW1haWw6ICQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgICBmaXJzdF9uYW1lOiAkKG9wdGlvbnMuZmlyc3RfbmFtZV9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgICBsYXN0X25hbWU6ICQob3B0aW9ucy5sYXN0X25hbWVfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgICAgZ3JvdXBzX3N1Ym1pdHRlZDogW11cbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgcG9zdF9kYXRhLmdyb3Vwc19hdmFpbGFibGUgPSAnYWxsJztcblxuICAgICAgICAgIGlmICggJCgnaW5wdXRbbmFtZT1cIm1haWxjaGltcF9zdGF0dXNcIl0nKS5sZW5ndGggPiAwICkge1xuICAgICAgICAgICAgcG9zdF9kYXRhLm1haWxjaGltcF9zdGF0dXMgPSAkKCdpbnB1dFtuYW1lPVwibWFpbGNoaW1wX3N0YXR1c1wiXScpLnZhbCgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICggJCgnaW5wdXRbbmFtZT1cIm1haWxjaGltcF91c2VyX2lkXCJdJykubGVuZ3RoID4gMCApIHtcbiAgICAgICAgICAgIHBvc3RfZGF0YS5tYWlsY2hpbXBfdXNlcl9pZCA9ICQoJ2lucHV0W25hbWU9XCJtYWlsY2hpbXBfdXNlcl9pZFwiXScpLnZhbCgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0eXBlb2YgbmV3c2xldHRlcl9ncm91cHMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAkLmVhY2gobmV3c2xldHRlcl9ncm91cHMsIGZ1bmN0aW9uKGluZGV4LCB2YWx1ZSkge1xuICAgICAgICAgICAgICB2YXIgZ3JvdXAgPSAkKHRoaXMpLmF0dHIoJ25hbWUnKTtcbiAgICAgICAgICAgICAgcG9zdF9kYXRhLmdyb3Vwc19zdWJtaXR0ZWQucHVzaChncm91cCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodHlwZW9mIG1lc3NhZ2VfZ3JvdXBzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgJC5lYWNoKG1lc3NhZ2VfZ3JvdXBzLCBmdW5jdGlvbihpbmRleCwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgdmFyIGdyb3VwID0gJCh0aGlzKS5hdHRyKCduYW1lJyk7XG4gICAgICAgICAgICAgIHBvc3RfZGF0YS5ncm91cHNfc3VibWl0dGVkLnB1c2goZ3JvdXApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogb3B0aW9ucy5taW5ucG9zdF9yb290ICsgJy93cC1qc29uL21pbm5wb3N0LWFwaS92Mi9tYWlsY2hpbXAvdXNlcicsXG4gICAgICAgICAgICB0eXBlOiAncG9zdCcsXG4gICAgICAgICAgICBkYXRhVHlwZSA6ICdqc29uJyxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShwb3N0X2RhdGEpXG4gICAgICAgICAgfSlcbiAgICAgICAgICAuZG9uZShmdW5jdGlvbihyZXNwb25zZSkgeyAvLyByZXNwb25zZSBmcm9tIHRoZSBQSFAgYWN0aW9uXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9ICcnO1xuICAgICAgICAgICAgaWYgKCByZXNwb25zZS5zdWNjZXNzID09PSB0cnVlICkge1xuICAgICAgICAgICAgICAvKnN3aXRjaCAocmVzcG9uc2UuZGF0YS51c2VyX3N0YXR1cykge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2V4aXN0aW5nJzpcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnVGhhbmtzIGZvciB1cGRhdGluZyB5b3VyIGVtYWlsIHByZWZlcmVuY2VzLiBUaGV5IHdpbGwgZ28gaW50byBlZmZlY3QgaW1tZWRpYXRlbHkuJztcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ25ldyc6XG4gICAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ1dlIGhhdmUgYWRkZWQgeW91IHRvIHRoZSBNaW5uUG9zdCBtYWlsaW5nIGxpc3QuJztcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3BlbmRpbmcnOlxuICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9ICdXZSBoYXZlIGFkZGVkIHlvdSB0byB0aGUgTWlublBvc3QgbWFpbGluZyBsaXN0LiBZb3Ugd2lsbCBuZWVkIHRvIGNsaWNrIHRoZSBjb25maXJtYXRpb24gbGluayBpbiB0aGUgZW1haWwgd2Ugc2VudCB0byBiZWdpbiByZWNlaXZpbmcgbWVzc2FnZXMuJztcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9Ki9cbiAgICAgICAgICAgICAgLy9jb25maXJtZm9ybS5nZXQoMCkuc3VibWl0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25maXJtZm9ybS5nZXQoMCkuc3VibWl0KCk7XG4gICAgICAgICAgICAvLyQoJy5tLWhvbGQtbWVzc2FnZScpLmh0bWwoJzxkaXYgY2xhc3M9XCJtLWZvcm0tbWVzc2FnZSBtLWZvcm0tbWVzc2FnZS1pbmZvXCI+JyArIG1lc3NhZ2UgKyAnPC9kaXY+Jyk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuZmFpbChmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgLy8gd2Ugc2hvdWxkIHB1dCBhbiBhY3R1YWwgZXJyb3IgbWVzc2FnZSBoZXJlIHNvbWVkYXksIHByb2JhYmx5XG4gICAgICAgICAgICAvLyQoJy5tLWhvbGQtbWVzc2FnZScpLmh0bWwoJzxkaXYgY2xhc3M9XCJtLWZvcm0tbWVzc2FnZSBtLWZvcm0tbWVzc2FnZS1pbmZvXCI+QW4gZXJyb3IgaGFzIG9jY3VyZWQuIFBsZWFzZSB0cnkgYWdhaW4uPC9kaXY+Jyk7XG4gICAgICAgICAgICBjb25maXJtZm9ybS5nZXQoMCkuc3VibWl0KCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgfSBlbHNlIHsgLy8gZW5kIHBhcnQgd2hlcmUgc2V0dGluZ3MgY2hhbmdlZFxuICAgICAgICAgIGNvbmZpcm1mb3JtLmdldCgwKS5zdWJtaXQoKTtcbiAgICAgICAgfVxuXG4gICAgICB9KTtcbiAgICAgIC8vcmV0dXJuIGZhbHNlO1xuICAgIH0sIC8vIGNvbmZpcm1NZXNzYWdlU3VibWl0XG5cbiAgfTsgLy8gcGx1Z2luLnByb3RvdHlwZVxuXG4gIC8vIEEgcmVhbGx5IGxpZ2h0d2VpZ2h0IHBsdWdpbiB3cmFwcGVyIGFyb3VuZCB0aGUgY29uc3RydWN0b3IsXG4gIC8vIHByZXZlbnRpbmcgYWdhaW5zdCBtdWx0aXBsZSBpbnN0YW50aWF0aW9uc1xuICAkLmZuW3BsdWdpbk5hbWVdID0gZnVuY3Rpb24gKCBvcHRpb25zICkge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKCEkLmRhdGEodGhpcywgJ3BsdWdpbl8nICsgcGx1Z2luTmFtZSkpIHtcbiAgICAgICAgJC5kYXRhKHRoaXMsICdwbHVnaW5fJyArIHBsdWdpbk5hbWUsIG5ldyBQbHVnaW4oIHRoaXMsIG9wdGlvbnMgKSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbn0pKCBqUXVlcnksIHdpbmRvdywgZG9jdW1lbnQgKTsiXX0=
