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
    'review_step_selector': '#panel--review',
    'details_step_selector': '#panel--details',
    'attendees_step_selector': '#panel--attendees',
    'donate_step_selector': '#panel--pay',
    'confirm_form_selector': '#confirm',
    'confirm_step_selector': '#panel--confirmation',
    'active': 'panel--pay',
    'confirm': 'panel--confirmation',
    'query': 'step',
    'pay_cc_processing_selector': 'input[id="edit-pay-fees"]',
    'fee_amount': '.processing-amount',
    'level_amount_selector': '#panel--review .amount .level-amount',
    'original_amount_selector': '#amount',
    'frequency_selector': '.frequency',
    'full_amount_selector': '.full-amount',
    'level_indicator_selector': 'h2.level',
    'level_name_selector': '.level-name',
    'review_benefits_selector': '.review-benefits',
    'allow_upsell': true,
    'upsell_btn_selector': '.btn--upsell',
    'upsell_selector': '.well--upsell',
    'upsell_amount_selector': '.upsell-amount',
    'swag_selector': '.swag',
    'swag_decline_selector': '#swag-no',
    'swag_nyt_selector': 'input[name="nyt"]',
    'separate_swag_selector': 'fieldset.swag--separate',
    'separate_swag_redeem': '.swag-redeem--separate',
    'swag_selector_choose_multiple': '.swag--choose-multiple',
    'swag_choose_multiple_name': 'swag_thankyou',
    'atlantic_status': 'input[name="swag_atlanticsubscription"]',
    'atlantic_existing': '#atlantic_existing',
    'atlantic_selector': '.form-item--atlantic_id',
    'name_selector': '.form-item--display-name',
    'honor_memory_name_selector': '.form-item--honor-memory',
    'honor_or_memory_chooser': 'input[name="in-honor-or-memory"]',
    'honor_name_selector': '.honor',
    'memory_name_selector': '.memory',
    'honor_selector': '#edit-in-honor',
    'memory_selector': '#edit-in-memory',
    'notify_selector': '.notify_someone',
    'notify_field_selector': '.form-item--notify',
    'anonymous_selector': '#edit-anonymous',
    'show_billing_country_selector': '#billing_show_country',
    'billing_country_selector': '.form-item--country',
    'show_shipping_country_selector': '#shipping_show_country',
    'shipping_country_selector': '.form-item--shipping-country',
    //'needs_shipping_selector' : '.swag--shipping',
    'shipping_address_selector': '.form-item--shipping-address',
    'use_for_shipping_selector': '#useforshipping',
    'email_field_selector': '#edit-email',
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
    'promo_selector': '.form-item--promo-code',
    'use_promocode_selector': '#use-promo-code',
    'promocode_selector': '#promo_code',
    'event_id_selector': '#event',
    'calendar_button_selector': '.addeventatc',
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
    'newsletter_group_selector': '[name="newsletters"]',
    'message_group_selector': '[name="messages"]',
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
    },
    'upsell': {
      'bronze': true,
      'silver': 9,
      'gold': 19,
      'platinum': false
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
      this.options.upsell_amount = parseFloat($(this.options.upsell_amount_selector, this.element).text());
      this.options.upsold = this.options.amount + this.options.upsell_amount;
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

      if ($(this.options.details_step_selector).length > 0 || $(this.options.review_step_selector).length > 0) {
        this.options.level = this.checkLevel(this.element, this.options, 'name'); // check what level it is

        this.options.levelnum = this.checkLevel(this.element, this.options, 'num'); // check what level it is as a number

        this.honorOrMemory(this.element, this.options); // in honor or in memory of someone

        this.swag(this.element, this.options, false); // manage swag display

        this.upsell(this.element, this.options, this.options.amount, this.options.frequency); // upsell to next level
      }

      if ($(this.options.donate_step_selector).length > 0) {
        this.donateAnonymously(this.element, this.options); // anonymous

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


      if ($(this.options.use_promocode_selector).length > 0) {
        this.usePromoCode(this.element, this.options); // handle promo code field
      } // allow users to enter a promo code on a page


      if ($(this.options.calendar_button_selector).length > 0) {
        this.addToCalendar(this.element, this.options);
      } // there is an event details item; allow for an add to calendar button


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

      if ($(options.level_indicator_selector).length > 0 && $(options.review_benefits_selector).length > 0) {
        $(options.level_indicator_selector, element).prop('class', levelclass);
        $(options.level_name_selector).text(level.charAt(0).toUpperCase() + level.slice(1));
        var review_level_benefits = this.getQueryStrings($(options.review_benefits_selector, element).prop('href'));
        review_level_benefits = review_level_benefits['level'];
        var link = $(options.review_benefits_selector, element).prop('href');
        link = link.replace(review_level_benefits, level);
        $(options.review_benefits_selector).prop('href', link);
      }

      if (returnvalue === 'name') {
        return level;
      } else if (returnvalue === 'num') {
        return levelnum;
      }
    },
    // checkLevel
    upsell: function upsell(element, options, amount, frequency) {
      if (options.allow_upsell === true) {
        var that = this;
        var amount_monthly;

        if (frequency === 12) {
          amount_monthly = amount;
        } else if (frequency === 1) {
          amount_monthly = amount / frequency;
        }

        $.each(options.upsell, function (index, value) {
          if (index === options.level) {
            // current level upsell
            if (value !== true && amount_monthly < value || value === false) {
              $(options.upsell_selector, element).hide();
            }
          }
        });
        $(options.upsell_btn_selector, element).click(function (event) {
          var upsold = options.upsold;
          that.options.amount = upsold;
          $(options.level_amount_selector, element).text(upsold);
          $(options.full_amount_selector, element).text(upsold);
          $(options.original_amount_selector, element).val(upsold);
          $(this).remove();
          event.stopPropagation();
          event.preventDefault();
          that.init(true, upsold);
        });
      } else {
        $(options.upsell_selector, element).hide();
      }
    },
    // upsell
    honorOrMemory: function honorOrMemory(element, options) {
      if ($(options.honor_selector, element).is(':checked')) {
        $(options.honor_memory_name_selector + ' div' + options.honor_name_selector, element).show();
      } else {
        $(options.honor_memory_name_selector + ' div' + options.honor_name_selector, element).hide();
        $(options.honor_name_selector + ' input', element).val('');
      }

      if ($(options.memory_selector, element).is(':checked')) {
        $(options.honor_memory_name_selector + ' div' + options.memory_name_selector, element).show();
      } else {
        $(options.honor_memory_name_selector + ' div' + options.memory_name_selector, element).hide();
        $(options.memory_name_selector + ' input', element).val('');
      }

      $(options.honor_or_memory_chooser, element).change(function () {
        if ($(options.honor_selector).is(':checked')) {
          $(options.honor_memory_name_selector + ' div' + options.honor_name_selector, element).show();
        } else {
          $(options.honor_memory_name_selector + ' div' + options.honor_name_selector, element).hide();
          $(options.honor_name_selector + ' input', element).val('');
        }

        if ($(options.memory_selector).is(':checked')) {
          $(options.honor_memory_name_selector + ' div' + options.memory_name_selector, element).show();
        } else {
          $(options.honor_memory_name_selector + ' div' + options.memory_name_selector, element).hide();
          $(options.memory_name_selector + ' input', element).val('');
        }
      });
    },
    // honorOrMemory
    swag: function swag(element, options, change) {
      var that = this;
      var currentlevel = that.options.levelnum;

      if (change === false) {
        // keep this from repeating
        $(options.swag_selector, element).hide(); // hide all the swag items first

        $(options.swag_selector, element).filter(function (index) {
          // only show items that are less than or equal to donation level
          return $(this).prop('class').slice(-1) <= currentlevel;
        }).show();
        $(options.separate_swag_redeem, element).click(function (event) {
          // if user clicks to redeem a separate item (ie atlantic)
          event.stopImmediatePropagation();
          $(options.separate_swag_selector, element).toggle(); // show the options there

          return false;
        });
      }

      if ($(options.atlantic_existing, element).is(':checked')) {
        // if user has existing atlantic subscription
        $(options.atlantic_selector, element).show();
      } else {
        $(options.atlantic_selector, element).hide();
      }

      $(options.atlantic_status, element).change(function () {
        // if user clicks one of the atlantic radio buttons
        that.swag(element, options, true);
      });
      $(options.swag_decline_selector, element).click(function (event) {
        $(options.swag_nyt_selector, element).prop('checked', false);
      });
      var maximum_choose = $(options.swag_selector_choose_multiple, element).data('maximum-choose');
      $(options.swag_selector_choose_multiple, element).show();
      $(options.swag_selector_choose_multiple, element).find('label, .swag').show();
      var count_checked = $(options.swag_selector_choose_multiple + ' input[name="' + options.swag_choose_multiple_name + '"]:checked').length;
      $('input', options.swag_selector_choose_multiple).change(function () {
        // if user clicks one of the atlantic radio buttons
        if ($(this).prop('type') == 'checkbox') {
          count_checked = $(options.swag_selector_choose_multiple + ' input[name="' + options.swag_choose_multiple_name + '"]:checked').length;

          if (maximum_choose === count_checked) {
            $('input:not(:checked)', options.swag_selector_choose_multiple).attr('disabled', true);
          } else {
            $('input:not(:checked)', options.swag_selector_choose_multiple).attr('disabled', false);
          }
        }
      });
    },
    // swag
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
    populateAttendees: function populateAttendees(quantity) {
      var attendees = '';
      var attendee = $('.attendees > fieldset:first').html();

      for (i = 1; i <= quantity; i++) {
        attendees += '<fieldset class="attendee">' + attendee.replace(/_1/g, '_' + i) + '</fieldset>';
      }

      $('.attendees').html(attendees);
    },
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

      if (quantity == 1) {
        $('.attendee-title').text($('.attendee-title').data('single'));
      } else {
        $('.attendee-title').text($('.attendee-title').data('plural'));
      }

      $('.code-result').remove();

      if (valid_code === true) {
        $('.apply-promo-code').after('<p class="code-result success">Your member discount code was successfully added.</p>');
        $('.show-' + options.single_unit_price_attribute).text(single_unit_price);
        $('.apply-promo-code').text('Applied').addClass('btn--disabled');
      } else if (valid_code === false) {
        $('.apply-promo-code').after('<p class="code-result error">This code is incorrect. Try again.</p>');
      }
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
      var attendees = '';
      $(options.review_step_selector).find('.btn').click(function () {
        attendees = that.populateAttendees(quantity);
      });
      $('.progress--donation .panel--attendees').find('a').click(function () {
        attendees = that.populateAttendees(quantity);
      });

      if ($(this.options.promocode_selector).length > 0) {
        //$(this.options.promocode_selector).after('');
        $('.apply-promo-code').click(function (event) {
          var code = $(options.promocode_selector, element).val();

          if ($(options.event_id_selector).length > 0) {
            var event_id = $(options.event_id_selector, element).val();
          } else {
            var event_id = 1;
          } //use_promo = that.checkPromoCode(code);


          event.preventDefault();
          var data = {
            promo_code: code,
            event: event_id
          };
          $.ajax({
            method: 'POST',
            url: '/event-check-promo/',
            data: data
          }).done(function (data) {
            that.calculateAmount(element, options, data); //that.displayAmount(element, options, data.single_unit_price, quantity, additional_amount, data.success);
          });
        });
      }
    },
    // calculateAmount
    checkPromoCode: function checkPromoCode(code) {
      var data = {
        promo_code: code
      };
      $.ajax({
        method: 'POST',
        url: '/event-check-promo/',
        data: data
      }).done(function (data) {
        if (data.success === true) {
          return true;
        } else {
          return false;
        }
      });
    },
    // checkPromoCode
    usePromoCode: function usePromoCode(element, options) {
      $(this.options.use_promocode_selector).parent().html('<a href="#" class="use-promo-code">Use promo code</a>');

      if ($(this.options.promocode_selector).val() === '') {
        $(options.promo_selector + ' div:first', element).hide();
      } else {
        $(options.promo_selector + ' div:last', element).hide();
      }

      $('.use-promo-code').click(function (event) {
        $(options.promo_selector + ' div:first', element).show();
        $(options.promo_selector + ' div:last', element).hide();
        event.preventDefault();
      });
    },
    //usePromoCode
    addToCalendar: function addToCalendar(element, options) {
      $(options.calendar_button_selector).css('display', 'inline-block');
    },
    // addToCalendar
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
        url: '/charge_ajax/',
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
          if (typeof result.status !== 'undefined') {
            $(options.email_field_selector, element).after('<input name="mailchimp_status" type="hidden" value="' + result.status + '">');
          }

          if (typeof result.mailchimp_id !== 'undefined') {
            $(options.email_field_selector, element).after('<input name="mailchimp_user_id" type="hidden" value="' + result.mailchimp_id + '">');
          }

          if (result.status === 'subscribed') {
            // user created - show a success message
            $('.confirm-instructions').text($('.confirm-instructions').attr('data-known-user'));
            var interests = result.interests;
            $.each(interests, function (index, value) {
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

          if (typeof message_groups !== 'undefined') {
            $.each(message_groups, function (index, value) {
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0cmlwZS5wYXltZW50LmpzIiwibWlubnBvc3QuZ2l2aW5nLmpzIl0sIm5hbWVzIjpbImYiLCJleHBvcnRzIiwibW9kdWxlIiwiZGVmaW5lIiwiYW1kIiwiZyIsIndpbmRvdyIsImdsb2JhbCIsInNlbGYiLCJwYXltZW50IiwianMiLCJlIiwidCIsIm4iLCJyIiwicyIsIm8iLCJ1IiwiYSIsInJlcXVpcmUiLCJpIiwiRXJyb3IiLCJjb2RlIiwibCIsImNhbGwiLCJsZW5ndGgiLCJRSiIsInJyZXR1cm4iLCJydHJpbSIsInNlbGVjdG9yIiwiaXNET01FbGVtZW50IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZWwiLCJub2RlTmFtZSIsInRyaW0iLCJ0ZXh0IiwicmVwbGFjZSIsInZhbCIsInJldCIsImFyZ3VtZW50cyIsInZhbHVlIiwicHJldmVudERlZmF1bHQiLCJldmVudE9iamVjdCIsInJldHVyblZhbHVlIiwibm9ybWFsaXplRXZlbnQiLCJvcmlnaW5hbCIsIndoaWNoIiwidGFyZ2V0Iiwic3JjRWxlbWVudCIsIm9yaWdpbmFsRXZlbnQiLCJkYXRhIiwiZGV0YWlsIiwiY2hhckNvZGUiLCJrZXlDb2RlIiwib24iLCJlbGVtZW50IiwiZXZlbnROYW1lIiwiY2FsbGJhY2siLCJqIiwibGVuIiwibGVuMSIsIm11bHRFdmVudE5hbWUiLCJvcmlnaW5hbENhbGxiYWNrIiwicmVmIiwibWF0Y2giLCJzcGxpdCIsImFkZEV2ZW50TGlzdGVuZXIiLCJhdHRhY2hFdmVudCIsImFkZENsYXNzIiwiY2xhc3NOYW1lIiwicmVzdWx0cyIsInB1c2giLCJjbGFzc0xpc3QiLCJhZGQiLCJoYXNDbGFzcyIsImNvbnRhaW5zIiwiUmVnRXhwIiwidGVzdCIsInJlbW92ZUNsYXNzIiwiY2xzIiwicmVtb3ZlIiwiam9pbiIsInRvZ2dsZUNsYXNzIiwiYm9vbCIsImFwcGVuZCIsInRvQXBwZW5kIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwiZmluZCIsIk5vZGVMaXN0IiwiQXJyYXkiLCJ0cmlnZ2VyIiwibmFtZSIsImVycm9yIiwiZXYiLCJDdXN0b21FdmVudCIsImNyZWF0ZUV2ZW50IiwiaW5pdEN1c3RvbUV2ZW50IiwiaW5pdEV2ZW50IiwiZGlzcGF0Y2hFdmVudCIsIlBheW1lbnQiLCJjYXJkRnJvbU51bWJlciIsImNhcmRGcm9tVHlwZSIsImNhcmRzIiwiZGVmYXVsdEZvcm1hdCIsImZvcm1hdEJhY2tDYXJkTnVtYmVyIiwiZm9ybWF0QmFja0V4cGlyeSIsImZvcm1hdENhcmROdW1iZXIiLCJmb3JtYXRFeHBpcnkiLCJmb3JtYXRGb3J3YXJkRXhwaXJ5IiwiZm9ybWF0Rm9yd2FyZFNsYXNoIiwiZm9ybWF0TW9udGhFeHBpcnkiLCJoYXNUZXh0U2VsZWN0ZWQiLCJsdWhuQ2hlY2siLCJyZUZvcm1hdENhcmROdW1iZXIiLCJyZXN0cmljdENWQyIsInJlc3RyaWN0Q2FyZE51bWJlciIsInJlc3RyaWN0Q29tYmluZWRFeHBpcnkiLCJyZXN0cmljdEV4cGlyeSIsInJlc3RyaWN0TW9udGhFeHBpcnkiLCJyZXN0cmljdE51bWVyaWMiLCJyZXN0cmljdFllYXJFeHBpcnkiLCJzZXRDYXJkVHlwZSIsImluZGV4T2YiLCJpdGVtIiwidHlwZSIsInBhdHRlcm4iLCJmb3JtYXQiLCJjdmNMZW5ndGgiLCJsdWhuIiwibnVtIiwiY2FyZCIsImRpZ2l0IiwiZGlnaXRzIiwib2RkIiwic3VtIiwicmV2ZXJzZSIsInBhcnNlSW50Iiwic2VsZWN0aW9uU3RhcnQiLCJzZWxlY3Rpb25FbmQiLCJzZWxlY3Rpb24iLCJjcmVhdGVSYW5nZSIsInNldFRpbWVvdXQiLCJfdGhpcyIsImZucyIsInJlIiwidXBwZXJMZW5ndGgiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJtZXRhIiwic2xhc2giLCJtZXRhS2V5IiwiaW5wdXQiLCJjdHJsS2V5IiwiYWxsVHlwZXMiLCJjYXJkVHlwZSIsImNhcmRFeHBpcnlWYWwiLCJtb250aCIsInByZWZpeCIsInllYXIiLCJEYXRlIiwiZ2V0RnVsbFllYXIiLCJ0b1N0cmluZyIsInNsaWNlIiwidmFsaWRhdGVDYXJkTnVtYmVyIiwidmFsaWRhdGVDYXJkRXhwaXJ5IiwiY3VycmVudFRpbWUiLCJleHBpcnkiLCJzZXRNb250aCIsImdldE1vbnRoIiwidmFsaWRhdGVDYXJkQ1ZDIiwiY3ZjIiwicmVmMSIsImdyb3VwcyIsImV4ZWMiLCJzaGlmdCIsImZvcm1hdENhcmRDVkMiLCJmb3JtYXRDYXJkRXhwaXJ5IiwiZm9ybWF0Q2FyZEV4cGlyeU11bHRpcGxlIiwiZ2V0Q2FyZEFycmF5Iiwic2V0Q2FyZEFycmF5IiwiY2FyZEFycmF5IiwiYWRkVG9DYXJkQXJyYXkiLCJjYXJkT2JqZWN0IiwicmVtb3ZlRnJvbUNhcmRBcnJheSIsImtleSIsInNwbGljZSIsIiQiLCJ1bmRlZmluZWQiLCJwbHVnaW5OYW1lIiwiZGVmYXVsdHMiLCJQbHVnaW4iLCJvcHRpb25zIiwiZXh0ZW5kIiwiX2RlZmF1bHRzIiwiX25hbWUiLCJpbml0IiwicHJvdG90eXBlIiwicmVzZXQiLCJhbW91bnQiLCJwYXJzZUZsb2F0IiwibGV2ZWxfYW1vdW50X3NlbGVjdG9yIiwib3JpZ2luYWxfYW1vdW50Iiwib3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yIiwiZnJlcXVlbmN5IiwiZnJlcXVlbmN5X3NlbGVjdG9yIiwiYXR0ciIsInJlY3VycmluZyIsInJlY3VycmluZ19zZWxlY3RvciIsImNoYXJBdCIsInRvVXBwZXJDYXNlIiwicHJvY2Vzc2luZ19mZWUiLCJNYXRoIiwicm91bmQiLCJmZWVfYW1vdW50IiwicG93IiwidG9GaXhlZCIsInByb2Nlc3NpbmdfZmVlX3RleHQiLCJ1cHNlbGxfYW1vdW50IiwidXBzZWxsX2Ftb3VudF9zZWxlY3RvciIsInVwc29sZCIsImNyZWF0ZV9hY2NvdW50IiwiYnV0dG9uX3RleHQiLCJzdHJpcGUiLCJTdHJpcGUiLCJzdHJpcGVfcHVibGlzaGFibGVfa2V5IiwiZWxlbWVudHMiLCJyZWZlcnJlciIsInByb3AiLCJkZWJ1ZyIsInF1ZXJ5X3BhbmVsIiwicXMiLCJxdWVyeSIsImFjdGl2ZSIsInBheW1lbnRQYW5lbHMiLCJwYXlfY2NfcHJvY2Vzc2luZ19zZWxlY3RvciIsImNyZWRpdENhcmRQcm9jZXNzaW5nRmVlcyIsImRldGFpbHNfc3RlcF9zZWxlY3RvciIsInJldmlld19zdGVwX3NlbGVjdG9yIiwibGV2ZWwiLCJjaGVja0xldmVsIiwibGV2ZWxudW0iLCJob25vck9yTWVtb3J5Iiwic3dhZyIsInVwc2VsbCIsImRvbmF0ZV9zdGVwX3NlbGVjdG9yIiwiZG9uYXRlQW5vbnltb3VzbHkiLCJvdXRzaWRlVW5pdGVkU3RhdGVzIiwic2hpcHBpbmdBZGRyZXNzIiwiYWxsb3dNaW5ucG9zdEFjY291bnQiLCJjaG9vc2VQYXltZW50TWV0aG9kIiwiY3JlZGl0Q2FyZEZpZWxkcyIsImFjaEZpZWxkcyIsInZhbGlkYXRlQW5kU3VibWl0IiwiY2FsY3VsYXRlZF9hbW91bnRfc2VsZWN0b3IiLCJjYWxjdWxhdGVBbW91bnQiLCJ1c2VfcHJvbW9jb2RlX3NlbGVjdG9yIiwidXNlUHJvbW9Db2RlIiwiY2FsZW5kYXJfYnV0dG9uX3NlbGVjdG9yIiwiYWRkVG9DYWxlbmRhciIsImNvbmZpcm1fc3RlcF9zZWxlY3RvciIsInNob3dOZXdzbGV0dGVyU2V0dGluZ3MiLCJjb25maXJtTWVzc2FnZVN1Ym1pdCIsImIiLCJwIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwibG9jYXRpb24iLCJzZWFyY2giLCJzdWJzdHIiLCJtZXNzYWdlIiwiY29uc29sZSIsImxvZyIsImRpciIsImdldFF1ZXJ5U3RyaW5ncyIsImxpbmsiLCJ0aGF0IiwidXNldGFicyIsInRhYnMiLCJ0aXRsZSIsInBhZ2UiLCJuZXh0Iiwic3RlcCIsImluZGV4IiwibmF2X2l0ZW1fY291bnQiLCJvcHBfaWQiLCJvcHBfaWRfc2VsZWN0b3IiLCJuZXh0X3N0ZXAiLCJwb3N0X3B1cmNoYXNlIiwiY29uZmlybSIsImNvbmZpcm1fYnV0dG9uX3NlbGVjdG9yIiwiYW5hbHl0aWNzVHJhY2tpbmdTdGVwIiwiaGlkZSIsInNob3ciLCJwYXJlbnQiLCJnYSIsInRvTG93ZXJDYXNlIiwicGF0aG5hbWUiLCJjYWxjdWxhdGVGZWVzIiwicGF5bWVudF90eXBlIiwiYWpheCIsIm1ldGhvZCIsInVybCIsImRvbmUiLCJmZWVzIiwiY3JlZGl0Q2FyZEZlZUNoZWNrYm94IiwiZmllbGQiLCJmdWxsX2Ftb3VudCIsImlzIiwiZnVsbF9hbW91bnRfc2VsZWN0b3IiLCJhbm9ueW1vdXNfc2VsZWN0b3IiLCJuYW1lX3NlbGVjdG9yIiwiY2hhbmdlIiwicmV0dXJudmFsdWUiLCJsZXZlbGNsYXNzIiwiYW1vdW50X3llYXJseSIsImVhY2giLCJsZXZlbHMiLCJtYXgiLCJtaW4iLCJsZXZlbF9pbmRpY2F0b3Jfc2VsZWN0b3IiLCJyZXZpZXdfYmVuZWZpdHNfc2VsZWN0b3IiLCJsZXZlbF9uYW1lX3NlbGVjdG9yIiwicmV2aWV3X2xldmVsX2JlbmVmaXRzIiwiYWxsb3dfdXBzZWxsIiwiYW1vdW50X21vbnRobHkiLCJ1cHNlbGxfc2VsZWN0b3IiLCJ1cHNlbGxfYnRuX3NlbGVjdG9yIiwiY2xpY2siLCJldmVudCIsInN0b3BQcm9wYWdhdGlvbiIsImhvbm9yX3NlbGVjdG9yIiwiaG9ub3JfbWVtb3J5X25hbWVfc2VsZWN0b3IiLCJob25vcl9uYW1lX3NlbGVjdG9yIiwibWVtb3J5X3NlbGVjdG9yIiwibWVtb3J5X25hbWVfc2VsZWN0b3IiLCJob25vcl9vcl9tZW1vcnlfY2hvb3NlciIsImN1cnJlbnRsZXZlbCIsInN3YWdfc2VsZWN0b3IiLCJmaWx0ZXIiLCJzZXBhcmF0ZV9zd2FnX3JlZGVlbSIsInN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiIsInNlcGFyYXRlX3N3YWdfc2VsZWN0b3IiLCJ0b2dnbGUiLCJhdGxhbnRpY19leGlzdGluZyIsImF0bGFudGljX3NlbGVjdG9yIiwiYXRsYW50aWNfc3RhdHVzIiwic3dhZ19kZWNsaW5lX3NlbGVjdG9yIiwic3dhZ19ueXRfc2VsZWN0b3IiLCJtYXhpbXVtX2Nob29zZSIsInN3YWdfc2VsZWN0b3JfY2hvb3NlX211bHRpcGxlIiwiY291bnRfY2hlY2tlZCIsInN3YWdfY2hvb3NlX211bHRpcGxlX25hbWUiLCJzaG93X2JpbGxpbmdfY291bnRyeV9zZWxlY3RvciIsImJpbGxpbmdfY291bnRyeV9zZWxlY3RvciIsInNob3dfc2hpcHBpbmdfY291bnRyeV9zZWxlY3RvciIsInNoaXBwaW5nX2NvdW50cnlfc2VsZWN0b3IiLCJzaG93X3NoaXBwaW5nIiwidXNlX2Zvcl9zaGlwcGluZ19zZWxlY3RvciIsInNoaXBwaW5nX3NlbGVjdG9yIiwiY2hhbmdlZCIsImFjY291bnRfZXhpc3RzIiwiZG9uZVR5cGluZyIsImVtYWlsIiwiZW1haWxfZmllbGRfc2VsZWN0b3IiLCJjaGVja01pbm5wb3N0QWNjb3VudEV4aXN0cyIsInR5cGluZ1RpbWVyIiwiZG9uZVR5cGluZ0ludGVydmFsIiwia2V5dXAiLCJjbGVhclRpbWVvdXQiLCJjcmVhdGVfbXBfc2VsZWN0b3IiLCJwYXNzd29yZF9zZWxlY3RvciIsImJlZm9yZSIsImdldCIsInBvcHVsYXRlQXR0ZW5kZWVzIiwicXVhbnRpdHkiLCJhdHRlbmRlZXMiLCJhdHRlbmRlZSIsImh0bWwiLCJkaXNwbGF5QW1vdW50Iiwic2luZ2xlX3VuaXRfcHJpY2UiLCJhZGRpdGlvbmFsX2Ftb3VudCIsInZhbGlkX2NvZGUiLCJsZXZlbGNoZWNrIiwiaGFzX2FkZGl0aW9uYWxfdGV4dF9zZWxlY3RvciIsImFkZGl0aW9uYWxfYW1vdW50X3NlbGVjdG9yIiwiYWRkaXRpb25hbF9hbW91bnRfZmllbGQiLCJxdWFudGl0eV9zZWxlY3RvciIsImFmdGVyIiwic2luZ2xlX3VuaXRfcHJpY2VfYXR0cmlidXRlIiwicXVhbnRpdHlfZmllbGQiLCJzdWNjZXNzIiwiaXRlbV9zZWxlY3RvciIsInByb21vY29kZV9zZWxlY3RvciIsImV2ZW50X2lkX3NlbGVjdG9yIiwiZXZlbnRfaWQiLCJwcm9tb19jb2RlIiwiY2hlY2tQcm9tb0NvZGUiLCJwcm9tb19zZWxlY3RvciIsImNzcyIsInVzZXIiLCJtaW5ucG9zdF9yb290IiwicmVzdWx0Iiwic3RhdHVzIiwicmVhc29uIiwiY2hvb3NlX3BheW1lbnQiLCJjaGVja2VkIiwiY2hlY2tlZF92YWx1ZSIsInBheW1lbnRfbWV0aG9kX3NlbGVjdG9yIiwiaWQiLCJkb25hdGVfZm9ybV9zZWxlY3RvciIsInByZXBlbmQiLCJzdHlsZSIsImJhc2UiLCJpY29uQ29sb3IiLCJsaW5lSGVpZ2h0IiwiZm9udFdlaWdodCIsImZvbnRGYW1pbHkiLCJmb250U2l6ZSIsImNhcmROdW1iZXJFbGVtZW50IiwiY3JlYXRlIiwibW91bnQiLCJjY19udW1fc2VsZWN0b3IiLCJjYXJkRXhwaXJ5RWxlbWVudCIsImNjX2V4cF9zZWxlY3RvciIsImNhcmRDdmNFbGVtZW50IiwiY2NfY3Z2X3NlbGVjdG9yIiwic3RyaXBlRXJyb3JEaXNwbGF5IiwiYnJhbmQiLCJzZXRCcmFuZEljb24iLCJjYXJkQnJhbmRUb1BmQ2xhc3MiLCJicmFuZEljb25FbGVtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJwZkNsYXNzIiwicGxhaWRfZW52IiwiUGxhaWQiLCJsaW5rSGFuZGxlciIsInNlbGVjdEFjY291bnQiLCJhcGlWZXJzaW9uIiwiZW52IiwiY2xpZW50TmFtZSIsInBsYWlkX3B1YmxpY19rZXkiLCJwcm9kdWN0Iiwib25Mb2FkIiwib25TdWNjZXNzIiwicHVibGljX3Rva2VuIiwibWV0YWRhdGEiLCJzdXBwb3J0Zm9ybSIsImFjY291bnRfaWQiLCJzZXJpYWxpemUiLCJyZXNwb25zZSIsInBsYWlkX2xpbmsiLCJzdHJpcGVfYmFua19hY2NvdW50X3Rva2VuIiwiY29udGVudHMiLCJ1bndyYXAiLCJvbkV4aXQiLCJlcnIiLCJvcGVuIiwiaGFzSHRtbDVWYWxpZGF0aW9uIiwiY3JlYXRlRWxlbWVudCIsImNoZWNrVmFsaWRpdHkiLCJidXR0b25TdGF0dXMiLCJidXR0b24iLCJkaXNhYmxlZCIsInN1Ym1pdCIsImFuaW1hdGUiLCJzY3JvbGxUb3AiLCJvZmZzZXQiLCJ0b3AiLCJ2YWxpZCIsInBheW1lbnRfbWV0aG9kIiwiZnVsbF9uYW1lIiwic3RyZWV0IiwiY2l0eSIsInN0YXRlIiwiemlwIiwiY291bnRyeSIsImZpcnN0X25hbWUiLCJmaXJzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yIiwibGFzdF9uYW1lIiwibGFzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yIiwicGFzc3dvcmQiLCJwYXNzd29yZF9maWVsZF9zZWxlY3RvciIsImFjY291bnRfY2l0eV9zZWxlY3RvciIsImFjY291bnRfc3RhdGVfc2VsZWN0b3IiLCJhY2NvdW50X3ppcF9zZWxlY3RvciIsImNyZWF0ZVRva2VuIiwic3RyaXBlVG9rZW5IYW5kbGVyIiwidGhpc19zZWxlY3RvciIsIndoaWNoX2Vycm9yIiwiZW1wdHkiLCJ0aGVuIiwicHJldiIsInRva2VuIiwiY2FjaGUiLCJlcnJvcnMiLCJuZXdzbGV0dGVyX2dyb3VwX3NlbGVjdG9yIiwiZ2V0X2RhdGEiLCJtYWlsY2hpbXBfaWQiLCJpbnRlcmVzdHMiLCJleGlzdGluZ19uZXdzbGV0dGVyX3NldHRpbmdzIiwiY29uZmlybV9mb3JtX3NlbGVjdG9yIiwiY29uZmlybWZvcm0iLCJuZXdzbGV0dGVyX2dyb3VwcyIsIm1lc3NhZ2VfZ3JvdXBzIiwibWVzc2FnZV9ncm91cF9zZWxlY3RvciIsIm5ld19uZXdzbGV0dGVyX3NldHRpbmdzIiwicG9zdF9kYXRhIiwiZ3JvdXBzX3N1Ym1pdHRlZCIsImdyb3Vwc19hdmFpbGFibGUiLCJtYWlsY2hpbXBfc3RhdHVzIiwibWFpbGNoaW1wX3VzZXJfaWQiLCJncm91cCIsImRhdGFUeXBlIiwiY29udGVudFR5cGUiLCJKU09OIiwic3RyaW5naWZ5IiwiZmFpbCIsImZuIiwialF1ZXJ5Il0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsQ0FBQyxVQUFTQSxDQUFULEVBQVc7QUFBQyxNQUFHLFFBQU9DLE9BQVAseUNBQU9BLE9BQVAsT0FBaUIsUUFBakIsSUFBMkIsT0FBT0MsTUFBUCxLQUFnQixXQUE5QyxFQUEwRDtBQUFDQSxJQUFBQSxNQUFNLENBQUNELE9B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YWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKGYpe2lmKHR5cGVvZiBleHBvcnRzPT09XCJvYmplY3RcIiYmdHlwZW9mIG1vZHVsZSE9PVwidW5kZWZpbmVkXCIpe21vZHVsZS5leHBvcnRzPWYoKX1lbHNlIGlmKHR5cGVvZiBkZWZpbmU9PT1cImZ1bmN0aW9uXCImJmRlZmluZS5hbWQpe2RlZmluZShbXSxmKX1lbHNle3ZhciBnO2lmKHR5cGVvZiB3aW5kb3chPT1cInVuZGVmaW5lZFwiKXtnPXdpbmRvd31lbHNlIGlmKHR5cGVvZiBnbG9iYWwhPT1cInVuZGVmaW5lZFwiKXtnPWdsb2JhbH1lbHNlIGlmKHR5cGVvZiBzZWxmIT09XCJ1bmRlZmluZWRcIil7Zz1zZWxmfWVsc2V7Zz10aGlzfShnLnBheW1lbnQgfHwgKGcucGF5bWVudCA9IHt9KSkuanMgPSBmKCl9fSkoZnVuY3Rpb24oKXt2YXIgZGVmaW5lLG1vZHVsZSxleHBvcnRzO3JldHVybiAoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSh7MTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG52YXIgUUosIHJyZXR1cm4sIHJ0cmltO1xuXG5RSiA9IGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG4gIGlmIChRSi5pc0RPTUVsZW1lbnQoc2VsZWN0b3IpKSB7XG4gICAgcmV0dXJuIHNlbGVjdG9yO1xuICB9XG4gIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbn07XG5cblFKLmlzRE9NRWxlbWVudCA9IGZ1bmN0aW9uKGVsKSB7XG4gIHJldHVybiBlbCAmJiAoZWwubm9kZU5hbWUgIT0gbnVsbCk7XG59O1xuXG5ydHJpbSA9IC9eW1xcc1xcdUZFRkZcXHhBMF0rfFtcXHNcXHVGRUZGXFx4QTBdKyQvZztcblxuUUoudHJpbSA9IGZ1bmN0aW9uKHRleHQpIHtcbiAgaWYgKHRleHQgPT09IG51bGwpIHtcbiAgICByZXR1cm4gXCJcIjtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gKHRleHQgKyBcIlwiKS5yZXBsYWNlKHJ0cmltLCBcIlwiKTtcbiAgfVxufTtcblxucnJldHVybiA9IC9cXHIvZztcblxuUUoudmFsID0gZnVuY3Rpb24oZWwsIHZhbCkge1xuICB2YXIgcmV0O1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICByZXR1cm4gZWwudmFsdWUgPSB2YWw7XG4gIH0gZWxzZSB7XG4gICAgcmV0ID0gZWwudmFsdWU7XG4gICAgaWYgKHR5cGVvZiByZXQgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHJldHVybiByZXQucmVwbGFjZShycmV0dXJuLCBcIlwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHJldCA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gXCJcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiByZXQ7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG5RSi5wcmV2ZW50RGVmYXVsdCA9IGZ1bmN0aW9uKGV2ZW50T2JqZWN0KSB7XG4gIGlmICh0eXBlb2YgZXZlbnRPYmplY3QucHJldmVudERlZmF1bHQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIGV2ZW50T2JqZWN0LnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuO1xuICB9XG4gIGV2ZW50T2JqZWN0LnJldHVyblZhbHVlID0gZmFsc2U7XG4gIHJldHVybiBmYWxzZTtcbn07XG5cblFKLm5vcm1hbGl6ZUV2ZW50ID0gZnVuY3Rpb24oZSkge1xuICB2YXIgb3JpZ2luYWw7XG4gIG9yaWdpbmFsID0gZTtcbiAgZSA9IHtcbiAgICB3aGljaDogb3JpZ2luYWwud2hpY2ggIT0gbnVsbCA/IG9yaWdpbmFsLndoaWNoIDogdm9pZCAwLFxuICAgIHRhcmdldDogb3JpZ2luYWwudGFyZ2V0IHx8IG9yaWdpbmFsLnNyY0VsZW1lbnQsXG4gICAgcHJldmVudERlZmF1bHQ6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIFFKLnByZXZlbnREZWZhdWx0KG9yaWdpbmFsKTtcbiAgICB9LFxuICAgIG9yaWdpbmFsRXZlbnQ6IG9yaWdpbmFsLFxuICAgIGRhdGE6IG9yaWdpbmFsLmRhdGEgfHwgb3JpZ2luYWwuZGV0YWlsXG4gIH07XG4gIGlmIChlLndoaWNoID09IG51bGwpIHtcbiAgICBlLndoaWNoID0gb3JpZ2luYWwuY2hhckNvZGUgIT0gbnVsbCA/IG9yaWdpbmFsLmNoYXJDb2RlIDogb3JpZ2luYWwua2V5Q29kZTtcbiAgfVxuICByZXR1cm4gZTtcbn07XG5cblFKLm9uID0gZnVuY3Rpb24oZWxlbWVudCwgZXZlbnROYW1lLCBjYWxsYmFjaykge1xuICB2YXIgZWwsIGksIGosIGxlbiwgbGVuMSwgbXVsdEV2ZW50TmFtZSwgb3JpZ2luYWxDYWxsYmFjaywgcmVmO1xuICBpZiAoZWxlbWVudC5sZW5ndGgpIHtcbiAgICBmb3IgKGkgPSAwLCBsZW4gPSBlbGVtZW50Lmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBlbCA9IGVsZW1lbnRbaV07XG4gICAgICBRSi5vbihlbCwgZXZlbnROYW1lLCBjYWxsYmFjayk7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuICBpZiAoZXZlbnROYW1lLm1hdGNoKFwiIFwiKSkge1xuICAgIHJlZiA9IGV2ZW50TmFtZS5zcGxpdChcIiBcIik7XG4gICAgZm9yIChqID0gMCwgbGVuMSA9IHJlZi5sZW5ndGg7IGogPCBsZW4xOyBqKyspIHtcbiAgICAgIG11bHRFdmVudE5hbWUgPSByZWZbal07XG4gICAgICBRSi5vbihlbGVtZW50LCBtdWx0RXZlbnROYW1lLCBjYWxsYmFjayk7XG4gICAgfVxuICAgIHJldHVybjtcbiAgfVxuICBvcmlnaW5hbENhbGxiYWNrID0gY2FsbGJhY2s7XG4gIGNhbGxiYWNrID0gZnVuY3Rpb24oZSkge1xuICAgIGUgPSBRSi5ub3JtYWxpemVFdmVudChlKTtcbiAgICByZXR1cm4gb3JpZ2luYWxDYWxsYmFjayhlKTtcbiAgfTtcbiAgaWYgKGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgIHJldHVybiBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBjYWxsYmFjaywgZmFsc2UpO1xuICB9XG4gIGlmIChlbGVtZW50LmF0dGFjaEV2ZW50KSB7XG4gICAgZXZlbnROYW1lID0gXCJvblwiICsgZXZlbnROYW1lO1xuICAgIHJldHVybiBlbGVtZW50LmF0dGFjaEV2ZW50KGV2ZW50TmFtZSwgY2FsbGJhY2spO1xuICB9XG4gIGVsZW1lbnRbJ29uJyArIGV2ZW50TmFtZV0gPSBjYWxsYmFjaztcbn07XG5cblFKLmFkZENsYXNzID0gZnVuY3Rpb24oZWwsIGNsYXNzTmFtZSkge1xuICB2YXIgZTtcbiAgaWYgKGVsLmxlbmd0aCkge1xuICAgIHJldHVybiAoZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaSwgbGVuLCByZXN1bHRzO1xuICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgZm9yIChpID0gMCwgbGVuID0gZWwubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgZSA9IGVsW2ldO1xuICAgICAgICByZXN1bHRzLnB1c2goUUouYWRkQ2xhc3MoZSwgY2xhc3NOYW1lKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9KSgpO1xuICB9XG4gIGlmIChlbC5jbGFzc0xpc3QpIHtcbiAgICByZXR1cm4gZWwuY2xhc3NMaXN0LmFkZChjbGFzc05hbWUpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBlbC5jbGFzc05hbWUgKz0gJyAnICsgY2xhc3NOYW1lO1xuICB9XG59O1xuXG5RSi5oYXNDbGFzcyA9IGZ1bmN0aW9uKGVsLCBjbGFzc05hbWUpIHtcbiAgdmFyIGUsIGhhc0NsYXNzLCBpLCBsZW47XG4gIGlmIChlbC5sZW5ndGgpIHtcbiAgICBoYXNDbGFzcyA9IHRydWU7XG4gICAgZm9yIChpID0gMCwgbGVuID0gZWwubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGUgPSBlbFtpXTtcbiAgICAgIGhhc0NsYXNzID0gaGFzQ2xhc3MgJiYgUUouaGFzQ2xhc3MoZSwgY2xhc3NOYW1lKTtcbiAgICB9XG4gICAgcmV0dXJuIGhhc0NsYXNzO1xuICB9XG4gIGlmIChlbC5jbGFzc0xpc3QpIHtcbiAgICByZXR1cm4gZWwuY2xhc3NMaXN0LmNvbnRhaW5zKGNsYXNzTmFtZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIG5ldyBSZWdFeHAoJyhefCApJyArIGNsYXNzTmFtZSArICcoIHwkKScsICdnaScpLnRlc3QoZWwuY2xhc3NOYW1lKTtcbiAgfVxufTtcblxuUUoucmVtb3ZlQ2xhc3MgPSBmdW5jdGlvbihlbCwgY2xhc3NOYW1lKSB7XG4gIHZhciBjbHMsIGUsIGksIGxlbiwgcmVmLCByZXN1bHRzO1xuICBpZiAoZWwubGVuZ3RoKSB7XG4gICAgcmV0dXJuIChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBpLCBsZW4sIHJlc3VsdHM7XG4gICAgICByZXN1bHRzID0gW107XG4gICAgICBmb3IgKGkgPSAwLCBsZW4gPSBlbC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBlID0gZWxbaV07XG4gICAgICAgIHJlc3VsdHMucHVzaChRSi5yZW1vdmVDbGFzcyhlLCBjbGFzc05hbWUpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH0pKCk7XG4gIH1cbiAgaWYgKGVsLmNsYXNzTGlzdCkge1xuICAgIHJlZiA9IGNsYXNzTmFtZS5zcGxpdCgnICcpO1xuICAgIHJlc3VsdHMgPSBbXTtcbiAgICBmb3IgKGkgPSAwLCBsZW4gPSByZWYubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGNscyA9IHJlZltpXTtcbiAgICAgIHJlc3VsdHMucHVzaChlbC5jbGFzc0xpc3QucmVtb3ZlKGNscykpO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZWwuY2xhc3NOYW1lID0gZWwuY2xhc3NOYW1lLnJlcGxhY2UobmV3IFJlZ0V4cCgnKF58XFxcXGIpJyArIGNsYXNzTmFtZS5zcGxpdCgnICcpLmpvaW4oJ3wnKSArICcoXFxcXGJ8JCknLCAnZ2knKSwgJyAnKTtcbiAgfVxufTtcblxuUUoudG9nZ2xlQ2xhc3MgPSBmdW5jdGlvbihlbCwgY2xhc3NOYW1lLCBib29sKSB7XG4gIHZhciBlO1xuICBpZiAoZWwubGVuZ3RoKSB7XG4gICAgcmV0dXJuIChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBpLCBsZW4sIHJlc3VsdHM7XG4gICAgICByZXN1bHRzID0gW107XG4gICAgICBmb3IgKGkgPSAwLCBsZW4gPSBlbC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBlID0gZWxbaV07XG4gICAgICAgIHJlc3VsdHMucHVzaChRSi50b2dnbGVDbGFzcyhlLCBjbGFzc05hbWUsIGJvb2wpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH0pKCk7XG4gIH1cbiAgaWYgKGJvb2wpIHtcbiAgICBpZiAoIVFKLmhhc0NsYXNzKGVsLCBjbGFzc05hbWUpKSB7XG4gICAgICByZXR1cm4gUUouYWRkQ2xhc3MoZWwsIGNsYXNzTmFtZSk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBRSi5yZW1vdmVDbGFzcyhlbCwgY2xhc3NOYW1lKTtcbiAgfVxufTtcblxuUUouYXBwZW5kID0gZnVuY3Rpb24oZWwsIHRvQXBwZW5kKSB7XG4gIHZhciBlO1xuICBpZiAoZWwubGVuZ3RoKSB7XG4gICAgcmV0dXJuIChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBpLCBsZW4sIHJlc3VsdHM7XG4gICAgICByZXN1bHRzID0gW107XG4gICAgICBmb3IgKGkgPSAwLCBsZW4gPSBlbC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBlID0gZWxbaV07XG4gICAgICAgIHJlc3VsdHMucHVzaChRSi5hcHBlbmQoZSwgdG9BcHBlbmQpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH0pKCk7XG4gIH1cbiAgcmV0dXJuIGVsLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgdG9BcHBlbmQpO1xufTtcblxuUUouZmluZCA9IGZ1bmN0aW9uKGVsLCBzZWxlY3Rvcikge1xuICBpZiAoZWwgaW5zdGFuY2VvZiBOb2RlTGlzdCB8fCBlbCBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgZWwgPSBlbFswXTtcbiAgfVxuICByZXR1cm4gZWwucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG59O1xuXG5RSi50cmlnZ2VyID0gZnVuY3Rpb24oZWwsIG5hbWUsIGRhdGEpIHtcbiAgdmFyIGUsIGVycm9yLCBldjtcbiAgdHJ5IHtcbiAgICBldiA9IG5ldyBDdXN0b21FdmVudChuYW1lLCB7XG4gICAgICBkZXRhaWw6IGRhdGFcbiAgICB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBlID0gZXJyb3I7XG4gICAgZXYgPSBkb2N1bWVudC5jcmVhdGVFdmVudCgnQ3VzdG9tRXZlbnQnKTtcbiAgICBpZiAoZXYuaW5pdEN1c3RvbUV2ZW50KSB7XG4gICAgICBldi5pbml0Q3VzdG9tRXZlbnQobmFtZSwgdHJ1ZSwgdHJ1ZSwgZGF0YSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGV2LmluaXRFdmVudChuYW1lLCB0cnVlLCB0cnVlLCBkYXRhKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGVsLmRpc3BhdGNoRXZlbnQoZXYpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSBRSjtcblxuXG59LHt9XSwyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbihmdW5jdGlvbiAoZ2xvYmFsKXtcbnZhciBQYXltZW50LCBRSiwgY2FyZEZyb21OdW1iZXIsIGNhcmRGcm9tVHlwZSwgY2FyZHMsIGRlZmF1bHRGb3JtYXQsIGZvcm1hdEJhY2tDYXJkTnVtYmVyLCBmb3JtYXRCYWNrRXhwaXJ5LCBmb3JtYXRDYXJkTnVtYmVyLCBmb3JtYXRFeHBpcnksIGZvcm1hdEZvcndhcmRFeHBpcnksIGZvcm1hdEZvcndhcmRTbGFzaCwgZm9ybWF0TW9udGhFeHBpcnksIGhhc1RleHRTZWxlY3RlZCwgbHVobkNoZWNrLCByZUZvcm1hdENhcmROdW1iZXIsIHJlc3RyaWN0Q1ZDLCByZXN0cmljdENhcmROdW1iZXIsIHJlc3RyaWN0Q29tYmluZWRFeHBpcnksIHJlc3RyaWN0RXhwaXJ5LCByZXN0cmljdE1vbnRoRXhwaXJ5LCByZXN0cmljdE51bWVyaWMsIHJlc3RyaWN0WWVhckV4cGlyeSwgc2V0Q2FyZFR5cGUsXG4gIGluZGV4T2YgPSBbXS5pbmRleE9mIHx8IGZ1bmN0aW9uKGl0ZW0pIHsgZm9yICh2YXIgaSA9IDAsIGwgPSB0aGlzLmxlbmd0aDsgaSA8IGw7IGkrKykgeyBpZiAoaSBpbiB0aGlzICYmIHRoaXNbaV0gPT09IGl0ZW0pIHJldHVybiBpOyB9IHJldHVybiAtMTsgfTtcblxuUUogPSByZXF1aXJlKCdxai9zcmMvcWouY29mZmVlJyk7XG5cbmRlZmF1bHRGb3JtYXQgPSAvKFxcZHsxLDR9KS9nO1xuXG5jYXJkcyA9IFtcbiAge1xuICAgIHR5cGU6ICdhbWV4JyxcbiAgICBwYXR0ZXJuOiAvXjNbNDddLyxcbiAgICBmb3JtYXQ6IC8oXFxkezEsNH0pKFxcZHsxLDZ9KT8oXFxkezEsNX0pPy8sXG4gICAgbGVuZ3RoOiBbMTVdLFxuICAgIGN2Y0xlbmd0aDogWzRdLFxuICAgIGx1aG46IHRydWVcbiAgfSwge1xuICAgIHR5cGU6ICdkYW5rb3J0JyxcbiAgICBwYXR0ZXJuOiAvXjUwMTkvLFxuICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICBsZW5ndGg6IFsxNl0sXG4gICAgY3ZjTGVuZ3RoOiBbM10sXG4gICAgbHVobjogdHJ1ZVxuICB9LCB7XG4gICAgdHlwZTogJ2RpbmVyc2NsdWInLFxuICAgIHBhdHRlcm46IC9eKDM2fDM4fDMwWzAtNV0pLyxcbiAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgbGVuZ3RoOiBbMTRdLFxuICAgIGN2Y0xlbmd0aDogWzNdLFxuICAgIGx1aG46IHRydWVcbiAgfSwge1xuICAgIHR5cGU6ICdkaXNjb3ZlcicsXG4gICAgcGF0dGVybjogL14oNjAxMXw2NXw2NFs0LTldfDYyMikvLFxuICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICBsZW5ndGg6IFsxNl0sXG4gICAgY3ZjTGVuZ3RoOiBbM10sXG4gICAgbHVobjogdHJ1ZVxuICB9LCB7XG4gICAgdHlwZTogJ2pjYicsXG4gICAgcGF0dGVybjogL14zNS8sXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGxlbmd0aDogWzE2XSxcbiAgICBjdmNMZW5ndGg6IFszXSxcbiAgICBsdWhuOiB0cnVlXG4gIH0sIHtcbiAgICB0eXBlOiAnbGFzZXInLFxuICAgIHBhdHRlcm46IC9eKDY3MDZ8Njc3MXw2NzA5KS8sXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGxlbmd0aDogWzE2LCAxNywgMTgsIDE5XSxcbiAgICBjdmNMZW5ndGg6IFszXSxcbiAgICBsdWhuOiB0cnVlXG4gIH0sIHtcbiAgICB0eXBlOiAnbWFlc3RybycsXG4gICAgcGF0dGVybjogL14oNTAxOHw1MDIwfDUwMzh8NjMwNHw2NzAzfDY3NTl8Njc2WzEtM10pLyxcbiAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgbGVuZ3RoOiBbMTIsIDEzLCAxNCwgMTUsIDE2LCAxNywgMTgsIDE5XSxcbiAgICBjdmNMZW5ndGg6IFszXSxcbiAgICBsdWhuOiB0cnVlXG4gIH0sIHtcbiAgICB0eXBlOiAnbWFzdGVyY2FyZCcsXG4gICAgcGF0dGVybjogL141WzEtNV0vLFxuICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICBsZW5ndGg6IFsxNl0sXG4gICAgY3ZjTGVuZ3RoOiBbM10sXG4gICAgbHVobjogdHJ1ZVxuICB9LCB7XG4gICAgdHlwZTogJ3VuaW9ucGF5JyxcbiAgICBwYXR0ZXJuOiAvXjYyLyxcbiAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgbGVuZ3RoOiBbMTYsIDE3LCAxOCwgMTldLFxuICAgIGN2Y0xlbmd0aDogWzNdLFxuICAgIGx1aG46IGZhbHNlXG4gIH0sIHtcbiAgICB0eXBlOiAndmlzYWVsZWN0cm9uJyxcbiAgICBwYXR0ZXJuOiAvXjQoMDI2fDE3NTAwfDQwNXw1MDh8ODQ0fDkxWzM3XSkvLFxuICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICBsZW5ndGg6IFsxNl0sXG4gICAgY3ZjTGVuZ3RoOiBbM10sXG4gICAgbHVobjogdHJ1ZVxuICB9LCB7XG4gICAgdHlwZTogJ3Zpc2EnLFxuICAgIHBhdHRlcm46IC9eNC8sXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGxlbmd0aDogWzEzLCAxNl0sXG4gICAgY3ZjTGVuZ3RoOiBbM10sXG4gICAgbHVobjogdHJ1ZVxuICB9LCB7XG4gICAgdHlwZTogJ2VsbycsXG4gICAgcGF0dGVybjogL140MDExfDQzODkzNXw0NSgxNDE2fDc2KXw1MCg0MTc1fDY2OTl8Njd8OTBbNC03XSl8NjMoNjI5N3w2MzY4KS8sXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGxlbmd0aDogWzE2XSxcbiAgICBjdmNMZW5ndGg6IFszXSxcbiAgICBsdWhuOiB0cnVlXG4gIH1cbl07XG5cbmNhcmRGcm9tTnVtYmVyID0gZnVuY3Rpb24obnVtKSB7XG4gIHZhciBjYXJkLCBpLCBsZW47XG4gIG51bSA9IChudW0gKyAnJykucmVwbGFjZSgvXFxEL2csICcnKTtcbiAgZm9yIChpID0gMCwgbGVuID0gY2FyZHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBjYXJkID0gY2FyZHNbaV07XG4gICAgaWYgKGNhcmQucGF0dGVybi50ZXN0KG51bSkpIHtcbiAgICAgIHJldHVybiBjYXJkO1xuICAgIH1cbiAgfVxufTtcblxuY2FyZEZyb21UeXBlID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIgY2FyZCwgaSwgbGVuO1xuICBmb3IgKGkgPSAwLCBsZW4gPSBjYXJkcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGNhcmQgPSBjYXJkc1tpXTtcbiAgICBpZiAoY2FyZC50eXBlID09PSB0eXBlKSB7XG4gICAgICByZXR1cm4gY2FyZDtcbiAgICB9XG4gIH1cbn07XG5cbmx1aG5DaGVjayA9IGZ1bmN0aW9uKG51bSkge1xuICB2YXIgZGlnaXQsIGRpZ2l0cywgaSwgbGVuLCBvZGQsIHN1bTtcbiAgb2RkID0gdHJ1ZTtcbiAgc3VtID0gMDtcbiAgZGlnaXRzID0gKG51bSArICcnKS5zcGxpdCgnJykucmV2ZXJzZSgpO1xuICBmb3IgKGkgPSAwLCBsZW4gPSBkaWdpdHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBkaWdpdCA9IGRpZ2l0c1tpXTtcbiAgICBkaWdpdCA9IHBhcnNlSW50KGRpZ2l0LCAxMCk7XG4gICAgaWYgKChvZGQgPSAhb2RkKSkge1xuICAgICAgZGlnaXQgKj0gMjtcbiAgICB9XG4gICAgaWYgKGRpZ2l0ID4gOSkge1xuICAgICAgZGlnaXQgLT0gOTtcbiAgICB9XG4gICAgc3VtICs9IGRpZ2l0O1xuICB9XG4gIHJldHVybiBzdW0gJSAxMCA9PT0gMDtcbn07XG5cbmhhc1RleHRTZWxlY3RlZCA9IGZ1bmN0aW9uKHRhcmdldCkge1xuICB2YXIgcmVmO1xuICBpZiAoKHRhcmdldC5zZWxlY3Rpb25TdGFydCAhPSBudWxsKSAmJiB0YXJnZXQuc2VsZWN0aW9uU3RhcnQgIT09IHRhcmdldC5zZWxlY3Rpb25FbmQpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAoKHR5cGVvZiBkb2N1bWVudCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBkb2N1bWVudCAhPT0gbnVsbCA/IChyZWYgPSBkb2N1bWVudC5zZWxlY3Rpb24pICE9IG51bGwgPyByZWYuY3JlYXRlUmFuZ2UgOiB2b2lkIDAgOiB2b2lkIDApICE9IG51bGwpIHtcbiAgICBpZiAoZG9jdW1lbnQuc2VsZWN0aW9uLmNyZWF0ZVJhbmdlKCkudGV4dCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBmYWxzZTtcbn07XG5cbnJlRm9ybWF0Q2FyZE51bWJlciA9IGZ1bmN0aW9uKGUpIHtcbiAgcmV0dXJuIHNldFRpbWVvdXQoKGZ1bmN0aW9uKF90aGlzKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHRhcmdldCwgdmFsdWU7XG4gICAgICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgICAgIHZhbHVlID0gUUoudmFsKHRhcmdldCk7XG4gICAgICB2YWx1ZSA9IFBheW1lbnQuZm5zLmZvcm1hdENhcmROdW1iZXIodmFsdWUpO1xuICAgICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIHZhbHVlKTtcbiAgICB9O1xuICB9KSh0aGlzKSk7XG59O1xuXG5mb3JtYXRDYXJkTnVtYmVyID0gZnVuY3Rpb24oZSkge1xuICB2YXIgY2FyZCwgZGlnaXQsIGxlbmd0aCwgcmUsIHRhcmdldCwgdXBwZXJMZW5ndGgsIHZhbHVlO1xuICBkaWdpdCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZS53aGljaCk7XG4gIGlmICghL15cXGQrJC8udGVzdChkaWdpdCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gIHZhbHVlID0gUUoudmFsKHRhcmdldCk7XG4gIGNhcmQgPSBjYXJkRnJvbU51bWJlcih2YWx1ZSArIGRpZ2l0KTtcbiAgbGVuZ3RoID0gKHZhbHVlLnJlcGxhY2UoL1xcRC9nLCAnJykgKyBkaWdpdCkubGVuZ3RoO1xuICB1cHBlckxlbmd0aCA9IDE2O1xuICBpZiAoY2FyZCkge1xuICAgIHVwcGVyTGVuZ3RoID0gY2FyZC5sZW5ndGhbY2FyZC5sZW5ndGgubGVuZ3RoIC0gMV07XG4gIH1cbiAgaWYgKGxlbmd0aCA+PSB1cHBlckxlbmd0aCkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoKHRhcmdldC5zZWxlY3Rpb25TdGFydCAhPSBudWxsKSAmJiB0YXJnZXQuc2VsZWN0aW9uU3RhcnQgIT09IHZhbHVlLmxlbmd0aCkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoY2FyZCAmJiBjYXJkLnR5cGUgPT09ICdhbWV4Jykge1xuICAgIHJlID0gL14oXFxkezR9fFxcZHs0fVxcc1xcZHs2fSkkLztcbiAgfSBlbHNlIHtcbiAgICByZSA9IC8oPzpefFxccykoXFxkezR9KSQvO1xuICB9XG4gIGlmIChyZS50ZXN0KHZhbHVlKSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgdmFsdWUgKyAnICcgKyBkaWdpdCk7XG4gIH0gZWxzZSBpZiAocmUudGVzdCh2YWx1ZSArIGRpZ2l0KSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgdmFsdWUgKyBkaWdpdCArICcgJyk7XG4gIH1cbn07XG5cbmZvcm1hdEJhY2tDYXJkTnVtYmVyID0gZnVuY3Rpb24oZSkge1xuICB2YXIgdGFyZ2V0LCB2YWx1ZTtcbiAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gIHZhbHVlID0gUUoudmFsKHRhcmdldCk7XG4gIGlmIChlLm1ldGEpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGUud2hpY2ggIT09IDgpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKCh0YXJnZXQuc2VsZWN0aW9uU3RhcnQgIT0gbnVsbCkgJiYgdGFyZ2V0LnNlbGVjdGlvblN0YXJ0ICE9PSB2YWx1ZS5sZW5ndGgpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKC9cXGRcXHMkLy50ZXN0KHZhbHVlKSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgdmFsdWUucmVwbGFjZSgvXFxkXFxzJC8sICcnKSk7XG4gIH0gZWxzZSBpZiAoL1xcc1xcZD8kLy50ZXN0KHZhbHVlKSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgdmFsdWUucmVwbGFjZSgvXFxzXFxkPyQvLCAnJykpO1xuICB9XG59O1xuXG5mb3JtYXRFeHBpcnkgPSBmdW5jdGlvbihlKSB7XG4gIHZhciBkaWdpdCwgdGFyZ2V0LCB2YWw7XG4gIGRpZ2l0ID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKTtcbiAgaWYgKCEvXlxcZCskLy50ZXN0KGRpZ2l0KSkge1xuICAgIHJldHVybjtcbiAgfVxuICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgdmFsID0gUUoudmFsKHRhcmdldCkgKyBkaWdpdDtcbiAgaWYgKC9eXFxkJC8udGVzdCh2YWwpICYmICh2YWwgIT09ICcwJyAmJiB2YWwgIT09ICcxJykpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIFwiMFwiICsgdmFsICsgXCIgLyBcIik7XG4gIH0gZWxzZSBpZiAoL15cXGRcXGQkLy50ZXN0KHZhbCkpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIHZhbCArIFwiIC8gXCIpO1xuICB9XG59O1xuXG5mb3JtYXRNb250aEV4cGlyeSA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIGRpZ2l0LCB0YXJnZXQsIHZhbDtcbiAgZGlnaXQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpO1xuICBpZiAoIS9eXFxkKyQvLnRlc3QoZGlnaXQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRhcmdldCA9IGUudGFyZ2V0O1xuICB2YWwgPSBRSi52YWwodGFyZ2V0KSArIGRpZ2l0O1xuICBpZiAoL15cXGQkLy50ZXN0KHZhbCkgJiYgKHZhbCAhPT0gJzAnICYmIHZhbCAhPT0gJzEnKSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgXCIwXCIgKyB2YWwpO1xuICB9IGVsc2UgaWYgKC9eXFxkXFxkJC8udGVzdCh2YWwpKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCBcIlwiICsgdmFsKTtcbiAgfVxufTtcblxuZm9ybWF0Rm9yd2FyZEV4cGlyeSA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIGRpZ2l0LCB0YXJnZXQsIHZhbDtcbiAgZGlnaXQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpO1xuICBpZiAoIS9eXFxkKyQvLnRlc3QoZGlnaXQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRhcmdldCA9IGUudGFyZ2V0O1xuICB2YWwgPSBRSi52YWwodGFyZ2V0KTtcbiAgaWYgKC9eXFxkXFxkJC8udGVzdCh2YWwpKSB7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIHZhbCArIFwiIC8gXCIpO1xuICB9XG59O1xuXG5mb3JtYXRGb3J3YXJkU2xhc2ggPSBmdW5jdGlvbihlKSB7XG4gIHZhciBzbGFzaCwgdGFyZ2V0LCB2YWw7XG4gIHNsYXNoID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKTtcbiAgaWYgKHNsYXNoICE9PSAnLycpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gIHZhbCA9IFFKLnZhbCh0YXJnZXQpO1xuICBpZiAoL15cXGQkLy50ZXN0KHZhbCkgJiYgdmFsICE9PSAnMCcpIHtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgXCIwXCIgKyB2YWwgKyBcIiAvIFwiKTtcbiAgfVxufTtcblxuZm9ybWF0QmFja0V4cGlyeSA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIHRhcmdldCwgdmFsdWU7XG4gIGlmIChlLm1ldGFLZXkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gIHZhbHVlID0gUUoudmFsKHRhcmdldCk7XG4gIGlmIChlLndoaWNoICE9PSA4KSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICgodGFyZ2V0LnNlbGVjdGlvblN0YXJ0ICE9IG51bGwpICYmIHRhcmdldC5zZWxlY3Rpb25TdGFydCAhPT0gdmFsdWUubGVuZ3RoKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICgvXFxkKFxcc3xcXC8pKyQvLnRlc3QodmFsdWUpKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCB2YWx1ZS5yZXBsYWNlKC9cXGQoXFxzfFxcLykqJC8sICcnKSk7XG4gIH0gZWxzZSBpZiAoL1xcc1xcL1xccz9cXGQ/JC8udGVzdCh2YWx1ZSkpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIHZhbHVlLnJlcGxhY2UoL1xcc1xcL1xccz9cXGQ/JC8sICcnKSk7XG4gIH1cbn07XG5cbnJlc3RyaWN0TnVtZXJpYyA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIGlucHV0O1xuICBpZiAoZS5tZXRhS2V5IHx8IGUuY3RybEtleSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmIChlLndoaWNoID09PSAzMikge1xuICAgIHJldHVybiBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH1cbiAgaWYgKGUud2hpY2ggPT09IDApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAoZS53aGljaCA8IDMzKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaW5wdXQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpO1xuICBpZiAoIS9bXFxkXFxzXS8udGVzdChpbnB1dCkpIHtcbiAgICByZXR1cm4gZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG59O1xuXG5yZXN0cmljdENhcmROdW1iZXIgPSBmdW5jdGlvbihlKSB7XG4gIHZhciBjYXJkLCBkaWdpdCwgdGFyZ2V0LCB2YWx1ZTtcbiAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gIGRpZ2l0ID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKTtcbiAgaWYgKCEvXlxcZCskLy50ZXN0KGRpZ2l0KSkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoaGFzVGV4dFNlbGVjdGVkKHRhcmdldCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFsdWUgPSAoUUoudmFsKHRhcmdldCkgKyBkaWdpdCkucmVwbGFjZSgvXFxEL2csICcnKTtcbiAgY2FyZCA9IGNhcmRGcm9tTnVtYmVyKHZhbHVlKTtcbiAgaWYgKGNhcmQpIHtcbiAgICBpZiAoISh2YWx1ZS5sZW5ndGggPD0gY2FyZC5sZW5ndGhbY2FyZC5sZW5ndGgubGVuZ3RoIC0gMV0pKSB7XG4gICAgICByZXR1cm4gZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoISh2YWx1ZS5sZW5ndGggPD0gMTYpKSB7XG4gICAgICByZXR1cm4gZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfVxufTtcblxucmVzdHJpY3RFeHBpcnkgPSBmdW5jdGlvbihlLCBsZW5ndGgpIHtcbiAgdmFyIGRpZ2l0LCB0YXJnZXQsIHZhbHVlO1xuICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgZGlnaXQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpO1xuICBpZiAoIS9eXFxkKyQvLnRlc3QoZGlnaXQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChoYXNUZXh0U2VsZWN0ZWQodGFyZ2V0KSkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YWx1ZSA9IFFKLnZhbCh0YXJnZXQpICsgZGlnaXQ7XG4gIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvXFxEL2csICcnKTtcbiAgaWYgKHZhbHVlLmxlbmd0aCA+IGxlbmd0aCkge1xuICAgIHJldHVybiBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH1cbn07XG5cbnJlc3RyaWN0Q29tYmluZWRFeHBpcnkgPSBmdW5jdGlvbihlKSB7XG4gIHJldHVybiByZXN0cmljdEV4cGlyeShlLCA2KTtcbn07XG5cbnJlc3RyaWN0TW9udGhFeHBpcnkgPSBmdW5jdGlvbihlKSB7XG4gIHJldHVybiByZXN0cmljdEV4cGlyeShlLCAyKTtcbn07XG5cbnJlc3RyaWN0WWVhckV4cGlyeSA9IGZ1bmN0aW9uKGUpIHtcbiAgcmV0dXJuIHJlc3RyaWN0RXhwaXJ5KGUsIDQpO1xufTtcblxucmVzdHJpY3RDVkMgPSBmdW5jdGlvbihlKSB7XG4gIHZhciBkaWdpdCwgdGFyZ2V0LCB2YWw7XG4gIHRhcmdldCA9IGUudGFyZ2V0O1xuICBkaWdpdCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZS53aGljaCk7XG4gIGlmICghL15cXGQrJC8udGVzdChkaWdpdCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGhhc1RleHRTZWxlY3RlZCh0YXJnZXQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhbCA9IFFKLnZhbCh0YXJnZXQpICsgZGlnaXQ7XG4gIGlmICghKHZhbC5sZW5ndGggPD0gNCkpIHtcbiAgICByZXR1cm4gZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG59O1xuXG5zZXRDYXJkVHlwZSA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIGFsbFR5cGVzLCBjYXJkLCBjYXJkVHlwZSwgdGFyZ2V0LCB2YWw7XG4gIHRhcmdldCA9IGUudGFyZ2V0O1xuICB2YWwgPSBRSi52YWwodGFyZ2V0KTtcbiAgY2FyZFR5cGUgPSBQYXltZW50LmZucy5jYXJkVHlwZSh2YWwpIHx8ICd1bmtub3duJztcbiAgaWYgKCFRSi5oYXNDbGFzcyh0YXJnZXQsIGNhcmRUeXBlKSkge1xuICAgIGFsbFR5cGVzID0gKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGksIGxlbiwgcmVzdWx0cztcbiAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgIGZvciAoaSA9IDAsIGxlbiA9IGNhcmRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGNhcmQgPSBjYXJkc1tpXTtcbiAgICAgICAgcmVzdWx0cy5wdXNoKGNhcmQudHlwZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9KSgpO1xuICAgIFFKLnJlbW92ZUNsYXNzKHRhcmdldCwgJ3Vua25vd24nKTtcbiAgICBRSi5yZW1vdmVDbGFzcyh0YXJnZXQsIGFsbFR5cGVzLmpvaW4oJyAnKSk7XG4gICAgUUouYWRkQ2xhc3ModGFyZ2V0LCBjYXJkVHlwZSk7XG4gICAgUUoudG9nZ2xlQ2xhc3ModGFyZ2V0LCAnaWRlbnRpZmllZCcsIGNhcmRUeXBlICE9PSAndW5rbm93bicpO1xuICAgIHJldHVybiBRSi50cmlnZ2VyKHRhcmdldCwgJ3BheW1lbnQuY2FyZFR5cGUnLCBjYXJkVHlwZSk7XG4gIH1cbn07XG5cblBheW1lbnQgPSAoZnVuY3Rpb24oKSB7XG4gIGZ1bmN0aW9uIFBheW1lbnQoKSB7fVxuXG4gIFBheW1lbnQuZm5zID0ge1xuICAgIGNhcmRFeHBpcnlWYWw6IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICB2YXIgbW9udGgsIHByZWZpeCwgcmVmLCB5ZWFyO1xuICAgICAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9cXHMvZywgJycpO1xuICAgICAgcmVmID0gdmFsdWUuc3BsaXQoJy8nLCAyKSwgbW9udGggPSByZWZbMF0sIHllYXIgPSByZWZbMV07XG4gICAgICBpZiAoKHllYXIgIT0gbnVsbCA/IHllYXIubGVuZ3RoIDogdm9pZCAwKSA9PT0gMiAmJiAvXlxcZCskLy50ZXN0KHllYXIpKSB7XG4gICAgICAgIHByZWZpeCA9IChuZXcgRGF0ZSkuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgcHJlZml4ID0gcHJlZml4LnRvU3RyaW5nKCkuc2xpY2UoMCwgMik7XG4gICAgICAgIHllYXIgPSBwcmVmaXggKyB5ZWFyO1xuICAgICAgfVxuICAgICAgbW9udGggPSBwYXJzZUludChtb250aCwgMTApO1xuICAgICAgeWVhciA9IHBhcnNlSW50KHllYXIsIDEwKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG1vbnRoOiBtb250aCxcbiAgICAgICAgeWVhcjogeWVhclxuICAgICAgfTtcbiAgICB9LFxuICAgIHZhbGlkYXRlQ2FyZE51bWJlcjogZnVuY3Rpb24obnVtKSB7XG4gICAgICB2YXIgY2FyZCwgcmVmO1xuICAgICAgbnVtID0gKG51bSArICcnKS5yZXBsYWNlKC9cXHMrfC0vZywgJycpO1xuICAgICAgaWYgKCEvXlxcZCskLy50ZXN0KG51bSkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgY2FyZCA9IGNhcmRGcm9tTnVtYmVyKG51bSk7XG4gICAgICBpZiAoIWNhcmQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIChyZWYgPSBudW0ubGVuZ3RoLCBpbmRleE9mLmNhbGwoY2FyZC5sZW5ndGgsIHJlZikgPj0gMCkgJiYgKGNhcmQubHVobiA9PT0gZmFsc2UgfHwgbHVobkNoZWNrKG51bSkpO1xuICAgIH0sXG4gICAgdmFsaWRhdGVDYXJkRXhwaXJ5OiBmdW5jdGlvbihtb250aCwgeWVhcikge1xuICAgICAgdmFyIGN1cnJlbnRUaW1lLCBleHBpcnksIHByZWZpeCwgcmVmO1xuICAgICAgaWYgKHR5cGVvZiBtb250aCA9PT0gJ29iamVjdCcgJiYgJ21vbnRoJyBpbiBtb250aCkge1xuICAgICAgICByZWYgPSBtb250aCwgbW9udGggPSByZWYubW9udGgsIHllYXIgPSByZWYueWVhcjtcbiAgICAgIH1cbiAgICAgIGlmICghKG1vbnRoICYmIHllYXIpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIG1vbnRoID0gUUoudHJpbShtb250aCk7XG4gICAgICB5ZWFyID0gUUoudHJpbSh5ZWFyKTtcbiAgICAgIGlmICghL15cXGQrJC8udGVzdChtb250aCkpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKCEvXlxcZCskLy50ZXN0KHllYXIpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICghKHBhcnNlSW50KG1vbnRoLCAxMCkgPD0gMTIpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICh5ZWFyLmxlbmd0aCA9PT0gMikge1xuICAgICAgICBwcmVmaXggPSAobmV3IERhdGUpLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgIHByZWZpeCA9IHByZWZpeC50b1N0cmluZygpLnNsaWNlKDAsIDIpO1xuICAgICAgICB5ZWFyID0gcHJlZml4ICsgeWVhcjtcbiAgICAgIH1cbiAgICAgIGV4cGlyeSA9IG5ldyBEYXRlKHllYXIsIG1vbnRoKTtcbiAgICAgIGN1cnJlbnRUaW1lID0gbmV3IERhdGU7XG4gICAgICBleHBpcnkuc2V0TW9udGgoZXhwaXJ5LmdldE1vbnRoKCkgLSAxKTtcbiAgICAgIGV4cGlyeS5zZXRNb250aChleHBpcnkuZ2V0TW9udGgoKSArIDEsIDEpO1xuICAgICAgcmV0dXJuIGV4cGlyeSA+IGN1cnJlbnRUaW1lO1xuICAgIH0sXG4gICAgdmFsaWRhdGVDYXJkQ1ZDOiBmdW5jdGlvbihjdmMsIHR5cGUpIHtcbiAgICAgIHZhciByZWYsIHJlZjE7XG4gICAgICBjdmMgPSBRSi50cmltKGN2Yyk7XG4gICAgICBpZiAoIS9eXFxkKyQvLnRlc3QoY3ZjKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAodHlwZSAmJiBjYXJkRnJvbVR5cGUodHlwZSkpIHtcbiAgICAgICAgcmV0dXJuIHJlZiA9IGN2Yy5sZW5ndGgsIGluZGV4T2YuY2FsbCgocmVmMSA9IGNhcmRGcm9tVHlwZSh0eXBlKSkgIT0gbnVsbCA/IHJlZjEuY3ZjTGVuZ3RoIDogdm9pZCAwLCByZWYpID49IDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gY3ZjLmxlbmd0aCA+PSAzICYmIGN2Yy5sZW5ndGggPD0gNDtcbiAgICAgIH1cbiAgICB9LFxuICAgIGNhcmRUeXBlOiBmdW5jdGlvbihudW0pIHtcbiAgICAgIHZhciByZWY7XG4gICAgICBpZiAoIW51bSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIHJldHVybiAoKHJlZiA9IGNhcmRGcm9tTnVtYmVyKG51bSkpICE9IG51bGwgPyByZWYudHlwZSA6IHZvaWQgMCkgfHwgbnVsbDtcbiAgICB9LFxuICAgIGZvcm1hdENhcmROdW1iZXI6IGZ1bmN0aW9uKG51bSkge1xuICAgICAgdmFyIGNhcmQsIGdyb3VwcywgcmVmLCB1cHBlckxlbmd0aDtcbiAgICAgIGNhcmQgPSBjYXJkRnJvbU51bWJlcihudW0pO1xuICAgICAgaWYgKCFjYXJkKSB7XG4gICAgICAgIHJldHVybiBudW07XG4gICAgICB9XG4gICAgICB1cHBlckxlbmd0aCA9IGNhcmQubGVuZ3RoW2NhcmQubGVuZ3RoLmxlbmd0aCAtIDFdO1xuICAgICAgbnVtID0gbnVtLnJlcGxhY2UoL1xcRC9nLCAnJyk7XG4gICAgICBudW0gPSBudW0uc2xpY2UoMCwgK3VwcGVyTGVuZ3RoICsgMSB8fCA5ZTkpO1xuICAgICAgaWYgKGNhcmQuZm9ybWF0Lmdsb2JhbCkge1xuICAgICAgICByZXR1cm4gKHJlZiA9IG51bS5tYXRjaChjYXJkLmZvcm1hdCkpICE9IG51bGwgPyByZWYuam9pbignICcpIDogdm9pZCAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZ3JvdXBzID0gY2FyZC5mb3JtYXQuZXhlYyhudW0pO1xuICAgICAgICBpZiAoZ3JvdXBzICE9IG51bGwpIHtcbiAgICAgICAgICBncm91cHMuc2hpZnQoKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZ3JvdXBzICE9IG51bGwgPyBncm91cHMuam9pbignICcpIDogdm9pZCAwO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBQYXltZW50LnJlc3RyaWN0TnVtZXJpYyA9IGZ1bmN0aW9uKGVsKSB7XG4gICAgcmV0dXJuIFFKLm9uKGVsLCAna2V5cHJlc3MnLCByZXN0cmljdE51bWVyaWMpO1xuICB9O1xuXG4gIFBheW1lbnQuY2FyZEV4cGlyeVZhbCA9IGZ1bmN0aW9uKGVsKSB7XG4gICAgcmV0dXJuIFBheW1lbnQuZm5zLmNhcmRFeHBpcnlWYWwoUUoudmFsKGVsKSk7XG4gIH07XG5cbiAgUGF5bWVudC5mb3JtYXRDYXJkQ1ZDID0gZnVuY3Rpb24oZWwpIHtcbiAgICBQYXltZW50LnJlc3RyaWN0TnVtZXJpYyhlbCk7XG4gICAgUUoub24oZWwsICdrZXlwcmVzcycsIHJlc3RyaWN0Q1ZDKTtcbiAgICByZXR1cm4gZWw7XG4gIH07XG5cbiAgUGF5bWVudC5mb3JtYXRDYXJkRXhwaXJ5ID0gZnVuY3Rpb24oZWwpIHtcbiAgICB2YXIgbW9udGgsIHllYXI7XG4gICAgUGF5bWVudC5yZXN0cmljdE51bWVyaWMoZWwpO1xuICAgIGlmIChlbC5sZW5ndGggJiYgZWwubGVuZ3RoID09PSAyKSB7XG4gICAgICBtb250aCA9IGVsWzBdLCB5ZWFyID0gZWxbMV07XG4gICAgICB0aGlzLmZvcm1hdENhcmRFeHBpcnlNdWx0aXBsZShtb250aCwgeWVhcik7XG4gICAgfSBlbHNlIHtcbiAgICAgIFFKLm9uKGVsLCAna2V5cHJlc3MnLCByZXN0cmljdENvbWJpbmVkRXhwaXJ5KTtcbiAgICAgIFFKLm9uKGVsLCAna2V5cHJlc3MnLCBmb3JtYXRFeHBpcnkpO1xuICAgICAgUUoub24oZWwsICdrZXlwcmVzcycsIGZvcm1hdEZvcndhcmRTbGFzaCk7XG4gICAgICBRSi5vbihlbCwgJ2tleXByZXNzJywgZm9ybWF0Rm9yd2FyZEV4cGlyeSk7XG4gICAgICBRSi5vbihlbCwgJ2tleWRvd24nLCBmb3JtYXRCYWNrRXhwaXJ5KTtcbiAgICB9XG4gICAgcmV0dXJuIGVsO1xuICB9O1xuXG4gIFBheW1lbnQuZm9ybWF0Q2FyZEV4cGlyeU11bHRpcGxlID0gZnVuY3Rpb24obW9udGgsIHllYXIpIHtcbiAgICBRSi5vbihtb250aCwgJ2tleXByZXNzJywgcmVzdHJpY3RNb250aEV4cGlyeSk7XG4gICAgUUoub24obW9udGgsICdrZXlwcmVzcycsIGZvcm1hdE1vbnRoRXhwaXJ5KTtcbiAgICByZXR1cm4gUUoub24oeWVhciwgJ2tleXByZXNzJywgcmVzdHJpY3RZZWFyRXhwaXJ5KTtcbiAgfTtcblxuICBQYXltZW50LmZvcm1hdENhcmROdW1iZXIgPSBmdW5jdGlvbihlbCkge1xuICAgIFBheW1lbnQucmVzdHJpY3ROdW1lcmljKGVsKTtcbiAgICBRSi5vbihlbCwgJ2tleXByZXNzJywgcmVzdHJpY3RDYXJkTnVtYmVyKTtcbiAgICBRSi5vbihlbCwgJ2tleXByZXNzJywgZm9ybWF0Q2FyZE51bWJlcik7XG4gICAgUUoub24oZWwsICdrZXlkb3duJywgZm9ybWF0QmFja0NhcmROdW1iZXIpO1xuICAgIFFKLm9uKGVsLCAna2V5dXAnLCBzZXRDYXJkVHlwZSk7XG4gICAgUUoub24oZWwsICdwYXN0ZScsIHJlRm9ybWF0Q2FyZE51bWJlcik7XG4gICAgcmV0dXJuIGVsO1xuICB9O1xuXG4gIFBheW1lbnQuZ2V0Q2FyZEFycmF5ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGNhcmRzO1xuICB9O1xuXG4gIFBheW1lbnQuc2V0Q2FyZEFycmF5ID0gZnVuY3Rpb24oY2FyZEFycmF5KSB7XG4gICAgY2FyZHMgPSBjYXJkQXJyYXk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgUGF5bWVudC5hZGRUb0NhcmRBcnJheSA9IGZ1bmN0aW9uKGNhcmRPYmplY3QpIHtcbiAgICByZXR1cm4gY2FyZHMucHVzaChjYXJkT2JqZWN0KTtcbiAgfTtcblxuICBQYXltZW50LnJlbW92ZUZyb21DYXJkQXJyYXkgPSBmdW5jdGlvbih0eXBlKSB7XG4gICAgdmFyIGtleSwgdmFsdWU7XG4gICAgZm9yIChrZXkgaW4gY2FyZHMpIHtcbiAgICAgIHZhbHVlID0gY2FyZHNba2V5XTtcbiAgICAgIGlmICh2YWx1ZS50eXBlID09PSB0eXBlKSB7XG4gICAgICAgIGNhcmRzLnNwbGljZShrZXksIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICByZXR1cm4gUGF5bWVudDtcblxufSkoKTtcblxubW9kdWxlLmV4cG9ydHMgPSBQYXltZW50O1xuXG5nbG9iYWwuUGF5bWVudCA9IFBheW1lbnQ7XG5cblxufSkuY2FsbCh0aGlzLHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgPyBnbG9iYWwgOiB0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiA/IHNlbGYgOiB0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiID8gd2luZG93IDoge30pXG59LHtcInFqL3NyYy9xai5jb2ZmZWVcIjoxfV19LHt9LFsyXSkoMilcbn0pOyIsIi8vIE1pbm5Qb3N0IEdpdmluZyBwbHVnaW5cbi8vIHRoZSBzZW1pLWNvbG9uIGJlZm9yZSBmdW5jdGlvbiBpbnZvY2F0aW9uIGlzIGEgc2FmZXR5IG5ldCBhZ2FpbnN0IGNvbmNhdGVuYXRlZFxuLy8gc2NyaXB0cyBhbmQvb3Igb3RoZXIgcGx1Z2lucyB3aGljaCBtYXkgbm90IGJlIGNsb3NlZCBwcm9wZXJseS5cbjsoZnVuY3Rpb24gKCAkLCB3aW5kb3csIGRvY3VtZW50LCB1bmRlZmluZWQgKSB7XG5cbiAgLy8gdW5kZWZpbmVkIGlzIHVzZWQgaGVyZSBhcyB0aGUgdW5kZWZpbmVkIGdsb2JhbCB2YXJpYWJsZSBpbiBFQ01BU2NyaXB0IDMgaXNcbiAgLy8gbXV0YWJsZSAoaWUuIGl0IGNhbiBiZSBjaGFuZ2VkIGJ5IHNvbWVvbmUgZWxzZSkuIHVuZGVmaW5lZCBpc24ndCByZWFsbHkgYmVpbmdcbiAgLy8gcGFzc2VkIGluIHNvIHdlIGNhbiBlbnN1cmUgdGhlIHZhbHVlIG9mIGl0IGlzIHRydWx5IHVuZGVmaW5lZC4gSW4gRVM1LCB1bmRlZmluZWRcbiAgLy8gY2FuIG5vIGxvbmdlciBiZSBtb2RpZmllZC5cblxuICAvLyB3aW5kb3cgYW5kIGRvY3VtZW50IGFyZSBwYXNzZWQgdGhyb3VnaCBhcyBsb2NhbCB2YXJpYWJsZSByYXRoZXIgdGhhbiBnbG9iYWxcbiAgLy8gYXMgdGhpcyAoc2xpZ2h0bHkpIHF1aWNrZW5zIHRoZSByZXNvbHV0aW9uIHByb2Nlc3MgYW5kIGNhbiBiZSBtb3JlIGVmZmljaWVudGx5XG4gIC8vIG1pbmlmaWVkIChlc3BlY2lhbGx5IHdoZW4gYm90aCBhcmUgcmVndWxhcmx5IHJlZmVyZW5jZWQgaW4geW91ciBwbHVnaW4pLlxuXG4gIC8vIENyZWF0ZSB0aGUgZGVmYXVsdHMgb25jZVxuICB2YXIgcGx1Z2luTmFtZSA9ICdtaW5ucG9zdF9naXZpbmcnLFxuICBkZWZhdWx0cyA9IHtcbiAgICAnZGVidWcnIDogZmFsc2UsIC8vIHRoaXMgY2FuIGJlIHNldCB0byB0cnVlIG9uIHBhZ2UgbGV2ZWwgb3B0aW9uc1xuICAgICd0YWJzJyA6IHRydWUsIC8vIGFyZSB3ZSBkb2luZyB0aGUgdGFiIHRoaW5nXG4gICAgJ3N0cmlwZV9wdWJsaXNoYWJsZV9rZXknIDogJycsXG4gICAgJ3BsYWlkX2VudicgOiAnJyxcbiAgICAncGxhaWRfcHVibGljX2tleScgOiAnJyxcbiAgICAncGxhaWRfbGluaycgOiAnI2F1dGhvcml6ZS1hY2gnLFxuICAgICdtaW5ucG9zdF9yb290JyA6ICdodHRwczovL3d3dy5taW5ucG9zdC5jb20nLFxuICAgICdkb25hdGVfZm9ybV9zZWxlY3Rvcic6ICcjZG9uYXRlJyxcbiAgICAncmV2aWV3X3N0ZXBfc2VsZWN0b3InIDogJyNwYW5lbC0tcmV2aWV3JyxcbiAgICAnZGV0YWlsc19zdGVwX3NlbGVjdG9yJyA6ICcjcGFuZWwtLWRldGFpbHMnLFxuICAgICdhdHRlbmRlZXNfc3RlcF9zZWxlY3RvcicgOiAnI3BhbmVsLS1hdHRlbmRlZXMnLFxuICAgICdkb25hdGVfc3RlcF9zZWxlY3RvcicgOiAnI3BhbmVsLS1wYXknLFxuICAgICdjb25maXJtX2Zvcm1fc2VsZWN0b3InIDogJyNjb25maXJtJyxcbiAgICAnY29uZmlybV9zdGVwX3NlbGVjdG9yJyA6ICcjcGFuZWwtLWNvbmZpcm1hdGlvbicsXG4gICAgJ2FjdGl2ZScgOiAncGFuZWwtLXBheScsXG4gICAgJ2NvbmZpcm0nIDogJ3BhbmVsLS1jb25maXJtYXRpb24nLFxuICAgICdxdWVyeScgOiAnc3RlcCcsXG4gICAgJ3BheV9jY19wcm9jZXNzaW5nX3NlbGVjdG9yJyA6ICdpbnB1dFtpZD1cImVkaXQtcGF5LWZlZXNcIl0nLFxuICAgICdmZWVfYW1vdW50JyA6ICcucHJvY2Vzc2luZy1hbW91bnQnLFxuICAgICdsZXZlbF9hbW91bnRfc2VsZWN0b3InIDogJyNwYW5lbC0tcmV2aWV3IC5hbW91bnQgLmxldmVsLWFtb3VudCcsXG4gICAgJ29yaWdpbmFsX2Ftb3VudF9zZWxlY3RvcicgOiAnI2Ftb3VudCcsXG4gICAgJ2ZyZXF1ZW5jeV9zZWxlY3RvcicgOiAnLmZyZXF1ZW5jeScsXG4gICAgJ2Z1bGxfYW1vdW50X3NlbGVjdG9yJyA6ICcuZnVsbC1hbW91bnQnLFxuICAgICdsZXZlbF9pbmRpY2F0b3Jfc2VsZWN0b3InIDogJ2gyLmxldmVsJyxcbiAgICAnbGV2ZWxfbmFtZV9zZWxlY3RvcicgOiAnLmxldmVsLW5hbWUnLFxuICAgICdyZXZpZXdfYmVuZWZpdHNfc2VsZWN0b3InIDogJy5yZXZpZXctYmVuZWZpdHMnLFxuICAgICdhbGxvd191cHNlbGwnIDogdHJ1ZSxcbiAgICAndXBzZWxsX2J0bl9zZWxlY3RvcicgOiAnLmJ0bi0tdXBzZWxsJyxcbiAgICAndXBzZWxsX3NlbGVjdG9yJyA6ICcud2VsbC0tdXBzZWxsJyxcbiAgICAndXBzZWxsX2Ftb3VudF9zZWxlY3RvcicgOiAnLnVwc2VsbC1hbW91bnQnLFxuICAgICdzd2FnX3NlbGVjdG9yJyA6ICcuc3dhZycsXG4gICAgJ3N3YWdfZGVjbGluZV9zZWxlY3RvcicgOiAnI3N3YWctbm8nLFxuICAgICdzd2FnX255dF9zZWxlY3RvcicgOiAnaW5wdXRbbmFtZT1cIm55dFwiXScsXG4gICAgJ3NlcGFyYXRlX3N3YWdfc2VsZWN0b3InIDogJ2ZpZWxkc2V0LnN3YWctLXNlcGFyYXRlJyxcbiAgICAnc2VwYXJhdGVfc3dhZ19yZWRlZW0nIDogJy5zd2FnLXJlZGVlbS0tc2VwYXJhdGUnLFxuICAgICdzd2FnX3NlbGVjdG9yX2Nob29zZV9tdWx0aXBsZScgOiAnLnN3YWctLWNob29zZS1tdWx0aXBsZScsXG4gICAgJ3N3YWdfY2hvb3NlX211bHRpcGxlX25hbWUnIDogJ3N3YWdfdGhhbmt5b3UnLFxuICAgICdhdGxhbnRpY19zdGF0dXMnIDogJ2lucHV0W25hbWU9XCJzd2FnX2F0bGFudGljc3Vic2NyaXB0aW9uXCJdJyxcbiAgICAnYXRsYW50aWNfZXhpc3RpbmcnIDogJyNhdGxhbnRpY19leGlzdGluZycsXG4gICAgJ2F0bGFudGljX3NlbGVjdG9yJyA6ICcuZm9ybS1pdGVtLS1hdGxhbnRpY19pZCcsXG4gICAgJ25hbWVfc2VsZWN0b3InIDogJy5mb3JtLWl0ZW0tLWRpc3BsYXktbmFtZScsXG4gICAgJ2hvbm9yX21lbW9yeV9uYW1lX3NlbGVjdG9yJyA6ICcuZm9ybS1pdGVtLS1ob25vci1tZW1vcnknLFxuICAgICdob25vcl9vcl9tZW1vcnlfY2hvb3NlcicgOiAnaW5wdXRbbmFtZT1cImluLWhvbm9yLW9yLW1lbW9yeVwiXScsXG4gICAgJ2hvbm9yX25hbWVfc2VsZWN0b3InIDogJy5ob25vcicsXG4gICAgJ21lbW9yeV9uYW1lX3NlbGVjdG9yJyA6ICcubWVtb3J5JyxcbiAgICAnaG9ub3Jfc2VsZWN0b3InIDogJyNlZGl0LWluLWhvbm9yJyxcbiAgICAnbWVtb3J5X3NlbGVjdG9yJyA6ICcjZWRpdC1pbi1tZW1vcnknLFxuICAgICdub3RpZnlfc2VsZWN0b3InIDogJy5ub3RpZnlfc29tZW9uZScsXG4gICAgJ25vdGlmeV9maWVsZF9zZWxlY3RvcicgOiAnLmZvcm0taXRlbS0tbm90aWZ5JyxcbiAgICAnYW5vbnltb3VzX3NlbGVjdG9yJyA6ICcjZWRpdC1hbm9ueW1vdXMnLFxuICAgICdzaG93X2JpbGxpbmdfY291bnRyeV9zZWxlY3RvcicgOiAnI2JpbGxpbmdfc2hvd19jb3VudHJ5JyxcbiAgICAnYmlsbGluZ19jb3VudHJ5X3NlbGVjdG9yJyA6ICcuZm9ybS1pdGVtLS1jb3VudHJ5JyxcbiAgICAnc2hvd19zaGlwcGluZ19jb3VudHJ5X3NlbGVjdG9yJyA6ICcjc2hpcHBpbmdfc2hvd19jb3VudHJ5JyxcbiAgICAnc2hpcHBpbmdfY291bnRyeV9zZWxlY3RvcicgOiAnLmZvcm0taXRlbS0tc2hpcHBpbmctY291bnRyeScsXG4gICAgLy8nbmVlZHNfc2hpcHBpbmdfc2VsZWN0b3InIDogJy5zd2FnLS1zaGlwcGluZycsXG4gICAgJ3NoaXBwaW5nX2FkZHJlc3Nfc2VsZWN0b3InIDogJy5mb3JtLWl0ZW0tLXNoaXBwaW5nLWFkZHJlc3MnLFxuICAgICd1c2VfZm9yX3NoaXBwaW5nX3NlbGVjdG9yJyA6ICcjdXNlZm9yc2hpcHBpbmcnLFxuICAgICdlbWFpbF9maWVsZF9zZWxlY3RvcicgOiAnI2VkaXQtZW1haWwnLFxuICAgICdwYXNzd29yZF9maWVsZF9zZWxlY3RvcicgOiAnI3Bhc3N3b3JkJyxcbiAgICAnZmlyc3RfbmFtZV9maWVsZF9zZWxlY3RvcicgOiAnI2ZpcnN0X25hbWUnLFxuICAgICdsYXN0X25hbWVfZmllbGRfc2VsZWN0b3InIDogJyNsYXN0X25hbWUnLFxuICAgICdhY2NvdW50X2NpdHlfc2VsZWN0b3InIDogJyNiaWxsaW5nX2NpdHknLFxuICAgICdhY2NvdW50X3N0YXRlX3NlbGVjdG9yJyA6ICcjYmlsbGluZ19zdGF0ZScsXG4gICAgJ2FjY291bnRfemlwX3NlbGVjdG9yJyA6ICcjYmlsbGluZ196aXAnLFxuICAgICdjcmVhdGVfbXBfc2VsZWN0b3InIDogJyNjcmVhdGVtcGFjY291bnQnLFxuICAgICdwYXNzd29yZF9zZWxlY3RvcicgOiAnLmZvcm0taXRlbS0tcGFzc3dvcmQnLFxuICAgICdjYWxjdWxhdGVkX2Ftb3VudF9zZWxlY3RvcicgOiAnLmNhbGN1bGF0ZWQtYW1vdW50JyxcbiAgICAncXVhbnRpdHlfZmllbGQnIDogJyNxdWFudGl0eScsXG4gICAgJ3F1YW50aXR5X3NlbGVjdG9yJyA6ICcucXVhbnRpdHknLFxuICAgICdpdGVtX3NlbGVjdG9yJzogJy5wdXJjaGFzZS1pdGVtJyxcbiAgICAnc2luZ2xlX3VuaXRfcHJpY2VfYXR0cmlidXRlJyA6ICd1bml0LXByaWNlJyxcbiAgICAnYWRkaXRpb25hbF9hbW91bnRfZmllbGQnIDogJyNhZGRpdGlvbmFsX2RvbmF0aW9uJyxcbiAgICAnYWRkaXRpb25hbF9hbW91bnRfc2VsZWN0b3InIDogJy5hZGRpdGlvbmFsX2RvbmF0aW9uJyxcbiAgICAnaGFzX2FkZGl0aW9uYWxfdGV4dF9zZWxlY3RvcicgOiAnLmhhc19hZGRpdGlvbmFsJyxcbiAgICAncHJvbW9fc2VsZWN0b3InIDogJy5mb3JtLWl0ZW0tLXByb21vLWNvZGUnLFxuICAgICd1c2VfcHJvbW9jb2RlX3NlbGVjdG9yJyA6ICcjdXNlLXByb21vLWNvZGUnLFxuICAgICdwcm9tb2NvZGVfc2VsZWN0b3InIDogJyNwcm9tb19jb2RlJyxcbiAgICAnZXZlbnRfaWRfc2VsZWN0b3InIDogJyNldmVudCcsXG4gICAgJ2NhbGVuZGFyX2J1dHRvbl9zZWxlY3RvcicgOiAnLmFkZGV2ZW50YXRjJyxcbiAgICAnYmlsbGluZ19zZWxlY3RvcicgOiAnZmllbGRzZXQuYmlsbGluZycsXG4gICAgJ3NoaXBwaW5nX3NlbGVjdG9yJyA6ICdmaWVsZHNldC5zaGlwcGluZycsXG4gICAgJ2NyZWRpdF9jYXJkX2ZpZWxkc2V0JyA6ICcucGF5bWVudC1tZXRob2QtZ3JvdXAnLFxuICAgICdjaG9vc2VfcGF5bWVudCcgOiAnI2Nob29zZS1wYXltZW50LW1ldGhvZCcsXG4gICAgJ3BheW1lbnRfbWV0aG9kX3NlbGVjdG9yJyA6ICcucGF5bWVudC1tZXRob2QnLFxuICAgICdjY19udW1fc2VsZWN0b3InIDogJyNjYXJkLW51bWJlcicsXG4gICAgJ2NjX2V4cF9zZWxlY3RvcicgOiAnI2NhcmQtZXhwaXJ5JyxcbiAgICAnY2NfY3Z2X3NlbGVjdG9yJyA6ICcjY2FyZC1jdmMnLFxuICAgICdwYXltZW50X2J1dHRvbl9zZWxlY3RvcicgOiAnI3N1Ym1pdCcsXG4gICAgJ2NvbmZpcm1fYnV0dG9uX3NlbGVjdG9yJyA6ICcjZmluaXNoJyxcbiAgICAnb3BwX2lkX3NlbGVjdG9yJyA6ICcjZmxhc2tfaWQnLFxuICAgICdyZWN1cnJpbmdfc2VsZWN0b3InIDogJyNyZWN1cnJpbmcnLFxuICAgICduZXdzbGV0dGVyX2dyb3VwX3NlbGVjdG9yJyA6ICdbbmFtZT1cIm5ld3NsZXR0ZXJzXCJdJyxcbiAgICAnbWVzc2FnZV9ncm91cF9zZWxlY3RvcicgOiAnW25hbWU9XCJtZXNzYWdlc1wiXScsXG4gICAgJ3JlYXNvbl9maWVsZF9zZWxlY3RvcicgOiAnI3JlYXNvbl9mb3Jfc3VwcG9ydGluZycsXG4gICAgJ3NoYXJlX3JlYXNvbl9zZWxlY3RvcicgOiAnI3JlYXNvbl9zaGFyZWFibGUnLFxuICAgICdjb25maXJtX3RvcF9zZWxlY3RvcicgOiAnLnN1cHBvcnQtLXBvc3QtY29uZmlybScsXG4gICAgJ2V4aXN0aW5nX25ld3NsZXR0ZXJfc2V0dGluZ3MnIDogJycsXG4gICAgJ2xldmVscycgOiB7XG4gICAgICAxIDoge1xuICAgICAgICAnbmFtZScgOiAnYnJvbnplJyxcbiAgICAgICAgJ21heCcgOiA2MFxuICAgICAgfSxcbiAgICAgIDIgOiB7XG4gICAgICAgICduYW1lJyA6ICdzaWx2ZXInLFxuICAgICAgICAnbWluJyA6IDYwLFxuICAgICAgICAnbWF4JyA6IDEyMFxuICAgICAgfSxcbiAgICAgIDMgOiB7XG4gICAgICAgICduYW1lJyA6ICdnb2xkJyxcbiAgICAgICAgJ21pbicgOiAxMjAsXG4gICAgICAgICdtYXgnIDogMjQwXG4gICAgICB9LFxuICAgICAgNCA6IHtcbiAgICAgICAgJ25hbWUnIDogJ3BsYXRpbnVtJyxcbiAgICAgICAgJ21pbicgOiAyNDBcbiAgICAgIH1cbiAgICB9LFxuICAgICd1cHNlbGwnIDoge1xuICAgICAgJ2Jyb256ZScgOiB0cnVlLFxuICAgICAgJ3NpbHZlcicgOiA5LFxuICAgICAgJ2dvbGQnIDogMTksXG4gICAgICAncGxhdGludW0nIDogZmFsc2VcbiAgICB9LFxuXG4gIH07IC8vIGVuZCBkZWZhdWx0c1xuXG4gIC8vIFRoZSBhY3R1YWwgcGx1Z2luIGNvbnN0cnVjdG9yXG4gIGZ1bmN0aW9uIFBsdWdpbiggZWxlbWVudCwgb3B0aW9ucyApIHtcblxuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG5cbiAgICAvLyBqUXVlcnkgaGFzIGFuIGV4dGVuZCBtZXRob2Qgd2hpY2ggbWVyZ2VzIHRoZSBjb250ZW50cyBvZiB0d28gb3JcbiAgICAvLyBtb3JlIG9iamVjdHMsIHN0b3JpbmcgdGhlIHJlc3VsdCBpbiB0aGUgZmlyc3Qgb2JqZWN0LiBUaGUgZmlyc3Qgb2JqZWN0XG4gICAgLy8gaXMgZ2VuZXJhbGx5IGVtcHR5IGFzIHdlIGRvbid0IHdhbnQgdG8gYWx0ZXIgdGhlIGRlZmF1bHQgb3B0aW9ucyBmb3JcbiAgICAvLyBmdXR1cmUgaW5zdGFuY2VzIG9mIHRoZSBwbHVnaW5cbiAgICB0aGlzLm9wdGlvbnMgPSAkLmV4dGVuZCgge30sIGRlZmF1bHRzLCBvcHRpb25zICk7XG5cbiAgICB0aGlzLl9kZWZhdWx0cyA9IGRlZmF1bHRzO1xuICAgIHRoaXMuX25hbWUgPSBwbHVnaW5OYW1lO1xuXG4gICAgdGhpcy5pbml0KCk7XG4gIH0gLy8gZW5kIGNvbnN0cnVjdG9yXG5cbiAgUGx1Z2luLnByb3RvdHlwZSA9IHtcblxuICAgIGluaXQ6IGZ1bmN0aW9uKHJlc2V0LCBhbW91bnQpIHtcblxuICAgICAgLy8gUGxhY2UgaW5pdGlhbGl6YXRpb24gbG9naWMgaGVyZVxuICAgICAgLy8gWW91IGFscmVhZHkgaGF2ZSBhY2Nlc3MgdG8gdGhlIERPTSBlbGVtZW50IGFuZFxuICAgICAgLy8gdGhlIG9wdGlvbnMgdmlhIHRoZSBpbnN0YW5jZSwgZS5nLiB0aGlzLmVsZW1lbnRcbiAgICAgIC8vIGFuZCB0aGlzLm9wdGlvbnNcbiAgICAgIC8vIHlvdSBjYW4gYWRkIG1vcmUgZnVuY3Rpb25zIGxpa2UgdGhlIG9uZSBiZWxvdyBhbmRcbiAgICAgIC8vIGNhbGwgdGhlbSBsaWtlIHNvOiB0aGlzLnlvdXJPdGhlckZ1bmN0aW9uKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKS5cblxuICAgICAgLy8gbW9kaWZ5IG9wdGlvbnMgYXMgbmVlZGVkXG4gICAgICAvL3ZhciB0aGlzLm9wdGlvbnMuYW1vdW50ID0gJyc7XG4gICAgICBpZiAocmVzZXQgIT09IHRydWUpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLmFtb3VudCA9IHBhcnNlRmxvYXQoJCh0aGlzLm9wdGlvbnMubGV2ZWxfYW1vdW50X3NlbGVjdG9yLCB0aGlzLmVsZW1lbnQpLnRleHQoKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm9wdGlvbnMuYW1vdW50ID0gYW1vdW50O1xuICAgICAgfVxuICAgICAgdGhpcy5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCA9IHBhcnNlSW50KCQodGhpcy5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudF9zZWxlY3RvciwgdGhpcy5lbGVtZW50KS52YWwoKSwgMTApO1xuICAgICAgdGhpcy5vcHRpb25zLmZyZXF1ZW5jeSA9IHBhcnNlRmxvYXQoJCh0aGlzLm9wdGlvbnMuZnJlcXVlbmN5X3NlbGVjdG9yLCB0aGlzLmVsZW1lbnQpLmF0dHIoJ2RhdGEteWVhci1mcmVxJykpO1xuICAgICAgdmFyIHJlY3VycmluZyA9ICQodGhpcy5vcHRpb25zLnJlY3VycmluZ19zZWxlY3RvciwgdGhpcy5lbGVtZW50KS52YWwoKTtcbiAgICAgIGlmICh0eXBlb2YgcmVjdXJyaW5nICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aGlzLm9wdGlvbnMucmVjdXJyaW5nID0gcmVjdXJyaW5nLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgcmVjdXJyaW5nLnNsaWNlKDEpO1xuICAgICAgfVxuICAgICAgXG4gICAgICB0aGlzLm9wdGlvbnMucHJvY2Vzc2luZ19mZWUgPSAoTWF0aC5yb3VuZChwYXJzZUZsb2F0KHRoaXMub3B0aW9ucy5mZWVfYW1vdW50KSpNYXRoLnBvdygxMCwyKSkvTWF0aC5wb3coMTAsMikpLnRvRml4ZWQoMik7XG4gICAgICB0aGlzLm9wdGlvbnMucHJvY2Vzc2luZ19mZWVfdGV4dCA9IHRoaXMub3B0aW9ucy5wcm9jZXNzaW5nX2ZlZTtcbiAgICAgIFxuICAgICAgdGhpcy5vcHRpb25zLnVwc2VsbF9hbW91bnQgPSBwYXJzZUZsb2F0KCQodGhpcy5vcHRpb25zLnVwc2VsbF9hbW91bnRfc2VsZWN0b3IsIHRoaXMuZWxlbWVudCkudGV4dCgpKTtcbiAgICAgIHRoaXMub3B0aW9ucy51cHNvbGQgPSB0aGlzLm9wdGlvbnMuYW1vdW50ICsgdGhpcy5vcHRpb25zLnVwc2VsbF9hbW91bnQ7XG4gICAgICB0aGlzLm9wdGlvbnMuY2FyZFR5cGUgPSBudWxsO1xuICAgICAgdGhpcy5vcHRpb25zLmNyZWF0ZV9hY2NvdW50ID0gZmFsc2U7XG5cbiAgICAgIHZhciBidXR0b25fdGV4dCA9ICQoJ2J1dHRvbi5naXZlLCBpbnB1dC5naXZlJykudGV4dCgpO1xuICAgICAgdGhpcy5vcHRpb25zLmJ1dHRvbl90ZXh0ID0gYnV0dG9uX3RleHQ7XG5cbiAgICAgIHRoaXMuc3RyaXBlID0gU3RyaXBlKHRoaXMub3B0aW9ucy5zdHJpcGVfcHVibGlzaGFibGVfa2V5KTtcbiAgICAgIHRoaXMuZWxlbWVudHMgPSB0aGlzLnN0cmlwZS5lbGVtZW50cygpO1xuXG4gICAgICAvLyB1c2UgYSByZWZlcnJlciBmb3IgZWRpdCBsaW5rIGlmIHdlIGhhdmUgb25lXG4gICAgICBpZiAoZG9jdW1lbnQucmVmZXJyZXIgIT09ICcnKSB7XG4gICAgICAgICQoJyNlZGl0X3VybCcpLnByb3AoJ2hyZWYnLCBkb2N1bWVudC5yZWZlcnJlcik7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuZGVidWcgPT09IHRydWUpIHtcbiAgICAgICAgdGhpcy5kZWJ1Zyh0aGlzLm9wdGlvbnMpO1xuICAgICAgICAvLyByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIHRhYiBzdHVmZlxuICAgICAgdmFyIHF1ZXJ5X3BhbmVsID0gdGhpcy5xc1t0aGlzLm9wdGlvbnMucXVlcnldO1xuICAgICAgaWYgKHR5cGVvZiBxdWVyeV9wYW5lbCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcXVlcnlfcGFuZWwgPSB0aGlzLm9wdGlvbnMuYWN0aXZlO1xuICAgICAgfVxuXG4gICAgICAvLyBjYWxsIGZ1bmN0aW9uc1xuXG4gICAgICB0aGlzLnBheW1lbnRQYW5lbHMocXVlcnlfcGFuZWwpOyAvLyB0YWJzXG5cbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5wYXlfY2NfcHJvY2Vzc2luZ19zZWxlY3RvcikubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLmNyZWRpdENhcmRQcm9jZXNzaW5nRmVlcyh0aGlzLm9wdGlvbnMsIHJlc2V0KTsgLy8gcHJvY2Vzc2luZyBmZWVzXG4gICAgICB9XG5cbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5kZXRhaWxzX3N0ZXBfc2VsZWN0b3IpLmxlbmd0aCA+IDAgfHwgJCh0aGlzLm9wdGlvbnMucmV2aWV3X3N0ZXBfc2VsZWN0b3IpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLmxldmVsID0gdGhpcy5jaGVja0xldmVsKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zLCAnbmFtZScpOyAvLyBjaGVjayB3aGF0IGxldmVsIGl0IGlzXG4gICAgICAgIHRoaXMub3B0aW9ucy5sZXZlbG51bSA9IHRoaXMuY2hlY2tMZXZlbCh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucywgJ251bScpOyAvLyBjaGVjayB3aGF0IGxldmVsIGl0IGlzIGFzIGEgbnVtYmVyXG4gICAgICAgIHRoaXMuaG9ub3JPck1lbW9yeSh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIGluIGhvbm9yIG9yIGluIG1lbW9yeSBvZiBzb21lb25lXG4gICAgICAgIHRoaXMuc3dhZyh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucywgZmFsc2UpOyAvLyBtYW5hZ2Ugc3dhZyBkaXNwbGF5XG4gICAgICAgIHRoaXMudXBzZWxsKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zLCB0aGlzLm9wdGlvbnMuYW1vdW50LCB0aGlzLm9wdGlvbnMuZnJlcXVlbmN5KTsgLy8gdXBzZWxsIHRvIG5leHQgbGV2ZWxcbiAgICAgIH1cbiAgICAgIFxuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmRvbmF0ZV9zdGVwX3NlbGVjdG9yKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuZG9uYXRlQW5vbnltb3VzbHkodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBhbm9ueW1vdXNcbiAgICAgICAgdGhpcy5vdXRzaWRlVW5pdGVkU3RhdGVzKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gb3V0c2lkZSBVU1xuICAgICAgICB0aGlzLnNoaXBwaW5nQWRkcmVzcyh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIHNoaXBwaW5nIGFkZHJlc3NcbiAgICAgICAgdGhpcy5hbGxvd01pbm5wb3N0QWNjb3VudCh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucywgZmFsc2UpOyAvLyBvcHRpb24gZm9yIGNyZWF0aW5nIG1pbm5wb3N0IGFjY291bnRcbiAgICAgICAgdGhpcy5jaG9vc2VQYXltZW50TWV0aG9kKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gc3dpdGNoIGJldHdlZW4gY2FyZCBhbmQgYWNoXG4gICAgICAgIHRoaXMuY3JlZGl0Q2FyZEZpZWxkcyh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIGRvIHN0dWZmIHdpdGggdGhlIGNyZWRpdCBjYXJkIGZpZWxkc1xuICAgICAgICB0aGlzLmFjaEZpZWxkcyh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIGRvIHN0dWZmIGZvciBhY2ggcGF5bWVudHMsIGlmIGFwcGxpY2FibGUgdG8gdGhlIGZvcm1cbiAgICAgICAgdGhpcy52YWxpZGF0ZUFuZFN1Ym1pdCh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIHZhbGlkYXRlIGFuZCBzdWJtaXQgdGhlIGZvcm1cbiAgICAgIH1cblxuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmNhbGN1bGF0ZWRfYW1vdW50X3NlbGVjdG9yKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuY2FsY3VsYXRlQW1vdW50KHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zLCAnJyk7IC8vXG4gICAgICB9IC8vIGNhbGN1bGF0ZSBhbW91bnQgYmFzZWQgb24gcXVhbnRpdHlcblxuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLnVzZV9wcm9tb2NvZGVfc2VsZWN0b3IpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy51c2VQcm9tb0NvZGUodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBoYW5kbGUgcHJvbW8gY29kZSBmaWVsZFxuICAgICAgfSAvLyBhbGxvdyB1c2VycyB0byBlbnRlciBhIHByb21vIGNvZGUgb24gYSBwYWdlXG5cbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5jYWxlbmRhcl9idXR0b25fc2VsZWN0b3IpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5hZGRUb0NhbGVuZGFyKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTtcbiAgICAgIH0gLy8gdGhlcmUgaXMgYW4gZXZlbnQgZGV0YWlscyBpdGVtOyBhbGxvdyBmb3IgYW4gYWRkIHRvIGNhbGVuZGFyIGJ1dHRvblxuXG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuY29uZmlybV9zdGVwX3NlbGVjdG9yKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuc2hvd05ld3NsZXR0ZXJTZXR0aW5ncyh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7XG4gICAgICAgIHRoaXMuY29uZmlybU1lc3NhZ2VTdWJtaXQodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBzdWJtaXQgdGhlIHN0dWZmIG9uIHRoZSBjb25maXJtYXRpb24gcGFnZVxuICAgICAgfVxuXG4gICAgfSwgLy8gaW5pdFxuXG4gICAgcXM6IChmdW5jdGlvbihhKSB7XG4gICAgICBpZiAoYSA9PT0gJycpIHtcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgfVxuICAgICAgdmFyIGIgPSB7fTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYS5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIgcD1hW2ldLnNwbGl0KCc9JywgMik7XG4gICAgICAgIGlmIChwLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgIGJbcFswXV0gPSAnJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBiW3BbMF1dID0gZGVjb2RlVVJJQ29tcG9uZW50KHBbMV0ucmVwbGFjZSgvXFwrL2csICcgJykpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gYjtcbiAgICB9KSh3aW5kb3cubG9jYXRpb24uc2VhcmNoLnN1YnN0cigxKS5zcGxpdCgnJicpKSxcblxuICAgIGRlYnVnOiBmdW5jdGlvbihtZXNzYWdlKSB7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLmRlYnVnID09PSB0cnVlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgbWVzc2FnZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhtZXNzYWdlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmRpcihtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmRpcih0aGlzKTtcbiAgICAgIH1cbiAgICB9LCAvLyBkZWJ1Z1xuXG4gICAgZ2V0UXVlcnlTdHJpbmdzOiBmdW5jdGlvbihsaW5rKSB7XG4gICAgICBpZiAodHlwZW9mIGxpbmsgPT09ICd1bmRlZmluZWQnIHx8IGxpbmsgPT09ICcnKSB7XG4gICAgICAgIHJldHVybiB7fTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxpbmsgPSAnPycgKyBsaW5rLnNwbGl0KCc/JylbMV07XG4gICAgICAgIGxpbmsgPSBsaW5rLnN1YnN0cigxKS5zcGxpdCgnJicpO1xuICAgICAgfVxuICAgICAgdmFyIGIgPSB7fTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGluay5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIgcD1saW5rW2ldLnNwbGl0KCc9JywgMik7XG4gICAgICAgIGlmIChwLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgIGJbcFswXV0gPSAnJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBiW3BbMF1dID0gZGVjb2RlVVJJQ29tcG9uZW50KHBbMV0ucmVwbGFjZSgvXFwrL2csICcgJykpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gYjtcbiAgICB9LCAvLyBnZXRRdWVyeVN0cmluZ3NcblxuICAgIHBheW1lbnRQYW5lbHM6IGZ1bmN0aW9uKGFjdGl2ZSkge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdmFyIHVzZXRhYnMgPSB0aGlzLm9wdGlvbnMudGFicztcbiAgICAgIHZhciB0aXRsZSA9ICdNaW5uUG9zdCB8IFN1cHBvcnQgVXMgfCAnO1xuICAgICAgdmFyIHBhZ2UgPSAkKCcucHJvZ3Jlc3MtLWRvbmF0aW9uIGxpLicgKyBhY3RpdmUpLnRleHQoKTtcbiAgICAgIHZhciBuZXh0ID0gJCgnLnByb2dyZXNzLS1kb25hdGlvbiBsaS4nICsgYWN0aXZlKS5uZXh0KCkudGV4dCgpO1xuICAgICAgdmFyIHN0ZXAgPSAkKCcucHJvZ3Jlc3MtLWRvbmF0aW9uIGxpLicgKyBhY3RpdmUpLmluZGV4KCkgKyAxO1xuICAgICAgdmFyIG5hdl9pdGVtX2NvdW50ID0gJCgnLnByb2dyZXNzLS1kb25hdGlvbiBsaScpLmxlbmd0aDtcbiAgICAgIHZhciBvcHBfaWQgPSAkKHRoaXMub3B0aW9ucy5vcHBfaWRfc2VsZWN0b3IpLnZhbCgpO1xuICAgICAgdmFyIG5leHRfc3RlcCA9IHN0ZXAgKyAxO1xuICAgICAgdmFyIHBvc3RfcHVyY2hhc2UgPSBmYWxzZTtcblxuICAgICAgdGhpcy5kZWJ1ZyggJ3N0ZXAgaXMgJyArIHN0ZXAgKyAnIGFuZCBuYXYgaXRlbSBjb3VudCBpcyAnICsgbmF2X2l0ZW1fY291bnQgKyAnIGFuZCBvcHAgaWQgaXMgJyArIG9wcF9pZCArICcgYW5kIG5leHQgc3RlcCBpcyAnICsgbmV4dF9zdGVwICk7XG5cbiAgICAgIC8vIHRoaXMgaXMgdGhlIGxhc3QgdmlzaWJsZSBzdGVwXG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuY29uZmlybV9zdGVwX3NlbGVjdG9yKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGFjdGl2ZSA9IHRoaXMub3B0aW9ucy5jb25maXJtO1xuICAgICAgICAkKCcucHJvZ3Jlc3MtLWRvbmF0aW9uIGxpLicgKyBhY3RpdmUgKyAnIHNwYW4nKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIHN0ZXAgPSAkKCcucHJvZ3Jlc3MtLWRvbmF0aW9uIGxpLicgKyBhY3RpdmUpLmluZGV4KCkgKyAxO1xuICAgICAgICAvLyB0aGVyZSBpcyBhIGNvbnRpbnVhdGlvbiBvZiB0aGUgbWFpbiBmb3JtIG9uIHRoaXMgcGFnZS4gdGhlcmUgaXMgYSBidXR0b24gdG8gY2xpY2tcbiAgICAgICAgLy8gdGhpcyBtZWFucyB0aGVyZSBpcyBhbm90aGVyIHN0ZXBcbiAgICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmNvbmZpcm1fYnV0dG9uX3NlbGVjdG9yKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgbmF2X2l0ZW1fY291bnQgKz0gMTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3RlcCA9PT0gbmF2X2l0ZW1fY291bnQgLSAxICYmICQodGhpcy5vcHRpb25zLm9wcF9pZF9zZWxlY3RvcikubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLmRlYnVnKCd0aGlzIGlzIGEgcGF5bWVudCBzdGVwIGJ1dCB0aGVyZSBpcyBhIHN0ZXAgYWZ0ZXIgaXQnKTtcbiAgICAgICAgc3RlcCA9ICdwdXJjaGFzZSc7XG4gICAgICB9IGVsc2UgaWYgKHN0ZXAgPT09IG5hdl9pdGVtX2NvdW50ICYmICQodGhpcy5vcHRpb25zLm9wcF9pZF9zZWxlY3RvcikubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLmRlYnVnKCd0aGlzIGlzIGEgcGF5bWVudCBzdGVwIGFuZCB0aGVyZSBpcyBubyBzdGVwIGFmdGVyIGl0Jyk7XG4gICAgICAgIHN0ZXAgPSAncHVyY2hhc2UnO1xuICAgICAgfSBlbHNlIGlmIChzdGVwID09PSBuYXZfaXRlbV9jb3VudCAmJiAkKHRoaXMub3B0aW9ucy5vcHBfaWRfc2VsZWN0b3IpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aGlzLmRlYnVnKCd0aGlzIGlzIGEgcG9zdC1maW5pc2ggc3RlcC4gaXQgZG9lcyBub3QgaGF2ZSBhbiBpZCcpO1xuICAgICAgICBzdGVwID0gc3RlcCArIDE7XG4gICAgICAgIHBvc3RfcHVyY2hhc2UgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBkb2N1bWVudC50aXRsZSA9IHRpdGxlICsgcGFnZTtcbiAgICAgIHRoaXMuYW5hbHl0aWNzVHJhY2tpbmdTdGVwKHN0ZXAsIHRpdGxlLCBwb3N0X3B1cmNoYXNlKTtcblxuICAgICAgLy8gbWFrZSBzb21lIHRhYnMgZm9yIGZvcm1cbiAgICAgIGlmICh1c2V0YWJzID09PSB0cnVlKSB7XG4gICAgICAgICQoJy5wYW5lbCcpLmhpZGUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQoJy5wYW5lbCcpLnNob3coKTtcbiAgICAgIH1cbiAgICAgIC8vIGFjdGl2YXRlIHRoZSB0YWJzXG4gICAgICBpZiAoJCgnLnByb2dyZXNzLS1kb25hdGlvbiBsaSAuYWN0aXZlJykubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICQoJyMnICsgYWN0aXZlKS5zaG93KCk7XG4gICAgICAgICQoJy5wcm9ncmVzcy0tZG9uYXRpb24gbGkuJyArIGFjdGl2ZSArICcgYScpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFjdGl2ZSA9ICQoJy5wcm9ncmVzcy0tZG9uYXRpb24gbGkgLmFjdGl2ZScpLnBhcmVudCgpLnByb3AoJ2NsYXNzJyk7XG4gICAgICAgICQoJyMnICsgYWN0aXZlKS5zaG93KCk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIC8qJCgnLnByb2dyZXNzLS1kb25hdGlvbiBsaSBhLCBhLmJ0bi5idG4tLW5leHQnKS5jbGljayhmdW5jdGlvbihldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAkKCcucHJvZ3Jlc3MtLWRvbmF0aW9uIGxpIGEnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIHZhciBsaW5rID0gJCh0aGlzKS5wcm9wKCdocmVmJyk7XG4gICAgICAgIHZhciBxdWVyeSA9IHRoYXQuZ2V0UXVlcnlTdHJpbmdzKGxpbmspO1xuICAgICAgICBxdWVyeSA9IHF1ZXJ5WydzdGVwJ107XG4gICAgICAgICQoJy5wcm9ncmVzcy0tZG9uYXRpb24gbGkuJyArIHF1ZXJ5ICsgJyBhJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICB0aGF0LnBheW1lbnRQYW5lbHMocXVlcnkpOyAgICBcbiAgICAgIH0pOyovXG4gICAgfSwgLy8gcGF5bWVudFBhbmVsc1xuXG4gICAgYW5hbHl0aWNzVHJhY2tpbmdTdGVwOiBmdW5jdGlvbihzdGVwLCB0aXRsZSwgcG9zdF9wdXJjaGFzZSkge1xuICAgICAgdmFyIGxldmVsID0gdGhpcy5jaGVja0xldmVsKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zLCAnbmFtZScpOyAvLyBjaGVjayB3aGF0IGxldmVsIGl0IGlzXG4gICAgICB2YXIgbGV2ZWxudW0gPSB0aGlzLmNoZWNrTGV2ZWwodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMsICdudW0nKTsgLy8gY2hlY2sgd2hhdCBsZXZlbCBpdCBpcyBhcyBhIG51bWJlclxuICAgICAgdmFyIGFtb3VudCA9ICQodGhpcy5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudF9zZWxlY3RvcikudmFsKCk7XG4gICAgICB2YXIgcmVjdXJyaW5nID0gdGhpcy5vcHRpb25zLnJlY3VycmluZztcbiAgICAgIHZhciBvcHBfaWQgPSAkKHRoaXMub3B0aW9ucy5vcHBfaWRfc2VsZWN0b3IpLnZhbCgpO1xuXG4gICAgICAvLyBpZiB3ZSdyZSBub3QgYWZ0ZXIgdGhlIHB1cmNoYXNlLCB1c2UgYWRkUHJvZHVjdFxuICAgICAgaWYgKCBwb3N0X3B1cmNoYXNlICE9PSB0cnVlICkge1xuICAgICAgICBnYSgnZWM6YWRkUHJvZHVjdCcsIHtcbiAgICAgICAgICAnaWQnOiAnbWlubnBvc3RfJyArIGxldmVsLnRvTG93ZXJDYXNlKCkgKyAnX21lbWJlcnNoaXAnLFxuICAgICAgICAgICduYW1lJzogJ01pbm5Qb3N0ICcgKyBsZXZlbC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGxldmVsLnNsaWNlKDEpICsgJyBNZW1iZXJzaGlwJyxcbiAgICAgICAgICAnY2F0ZWdvcnknOiAnRG9uYXRpb24nLFxuICAgICAgICAgICdicmFuZCc6ICdNaW5uUG9zdCcsXG4gICAgICAgICAgJ3ZhcmlhbnQnOiAgcmVjdXJyaW5nLFxuICAgICAgICAgICdwcmljZSc6IGFtb3VudCxcbiAgICAgICAgICAncXVhbnRpdHknOiAxXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RlcCA9PT0gJ3B1cmNoYXNlJykge1xuICAgICAgICB0aGlzLmRlYnVnKCdhZGQgYSBwdXJjaGFzZSBhY3Rpb24uIHN0ZXAgaXMgJyArIHN0ZXApO1xuICAgICAgICBnYSgnZWM6c2V0QWN0aW9uJywgc3RlcCx7XG4gICAgICAgICAgJ2lkJzogb3BwX2lkLCAvLyBUcmFuc2FjdGlvbiBpZCAtIFR5cGU6IHN0cmluZ1xuICAgICAgICAgICdhZmZpbGlhdGlvbic6ICdNaW5uUG9zdCcsIC8vIFN0b3JlIG5hbWUgLSBUeXBlOiBzdHJpbmdcbiAgICAgICAgICAncmV2ZW51ZSc6IGFtb3VudCwgLy8gVG90YWwgUmV2ZW51ZSAtIFR5cGU6IG51bWVyaWNcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmRlYnVnKCdhZGQgYSBjaGVja291dCBhY3Rpb24uIHN0ZXAgaXMgJyArIHN0ZXApO1xuICAgICAgICBnYSgnZWM6c2V0QWN0aW9uJywnY2hlY2tvdXQnLCB7XG4gICAgICAgICAgJ3N0ZXAnOiBzdGVwLCAgICAgICAgICAgIC8vIEEgdmFsdWUgb2YgMSBpbmRpY2F0ZXMgZmlyc3QgY2hlY2tvdXQgc3RlcC5WYWx1ZSBvZiAyIGluZGljYXRlcyBzZWNvbmQgY2hlY2tvdXQgc3RlcFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgZ2EoJ3NldCcsIHtcbiAgICAgICAgcGFnZTogd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLFxuICAgICAgICB0aXRsZTogdGl0bGVcbiAgICAgIH0pO1xuICAgICAgZ2EoJ3NlbmQnLCAncGFnZXZpZXcnLCB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUpO1xuXG4gICAgfSwgLy8gYW5hbHl0aWNzVHJhY2tpbmdTdGVwXG5cbiAgICBjYWxjdWxhdGVGZWVzOiBmdW5jdGlvbihhbW91bnQsIHBheW1lbnRfdHlwZSkge1xuICAgICAgLy8gdGhpcyBzZW5kcyB0aGUgYW1vdW50IGFuZCBwYXltZW50IHR5cGUgdG8gcHl0aG9uOyBnZXQgdGhlIGZlZSBhbmQgZGlzcGxheSBpdCB0byB0aGUgdXNlciBvbiB0aGUgY2hlY2tib3ggbGFiZWxcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICBhbW91bnQ6IGFtb3VudCxcbiAgICAgICAgcGF5bWVudF90eXBlOiBwYXltZW50X3R5cGVcbiAgICAgIH07XG4gICAgICAkLmFqYXgoe1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgdXJsOiAnL2NhbGN1bGF0ZS1mZWVzLycsXG4gICAgICAgIGRhdGE6IGRhdGFcbiAgICAgIH0pLmRvbmUoZnVuY3Rpb24oIGRhdGEgKSB7XG4gICAgICAgIGlmICgkKGRhdGEuZmVlcykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICQodGhhdC5vcHRpb25zLmZlZV9hbW91bnQpLnRleHQocGFyc2VGbG9hdChkYXRhLmZlZXMpLnRvRml4ZWQoMikpO1xuICAgICAgICAgIHRoYXQuY3JlZGl0Q2FyZEZlZUNoZWNrYm94KCQodGhhdC5vcHRpb25zLnBheV9jY19wcm9jZXNzaW5nX3NlbGVjdG9yKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sIC8vIGNhbGN1bGF0ZUZlZXNcblxuICAgIGNyZWRpdENhcmRQcm9jZXNzaW5nRmVlczogZnVuY3Rpb24ob3B0aW9ucywgcmVzZXQpIHtcbiAgICAgIC8vIHRoaXMgYWRkcyBvciBzdWJ0cmFjdHMgdGhlIGZlZSB0byB0aGUgb3JpZ2luYWwgYW1vdW50IHdoZW4gdGhlIHVzZXIgaW5kaWNhdGVzIHRoZXkgZG8gb3IgZG8gbm90IHdhbnQgdG8gcGF5IHRoZSBmZWVzXG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB0aGF0LmNyZWRpdENhcmRGZWVDaGVja2JveCgkKHRoaXMub3B0aW9ucy5wYXlfY2NfcHJvY2Vzc2luZ19zZWxlY3RvcikpO1xuICAgICAgJCh0aGlzLm9wdGlvbnMucGF5X2NjX3Byb2Nlc3Npbmdfc2VsZWN0b3IpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdGhhdC5jcmVkaXRDYXJkRmVlQ2hlY2tib3godGhpcyk7XG4gICAgICB9KTtcbiAgICB9LCAvLyBjcmVkaXRDYXJkUHJvY2Vzc2luZ0ZlZXNcblxuICAgIGNyZWRpdENhcmRGZWVDaGVja2JveDogZnVuY3Rpb24oZmllbGQpIHtcbiAgICAgIHZhciBmdWxsX2Ftb3VudDtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIGlmICgkKGZpZWxkKS5pcygnOmNoZWNrZWQnKSB8fCAkKGZpZWxkKS5wcm9wKCdjaGVja2VkJykpIHtcbiAgICAgICAgJCgnLmFtb3VudCAubGV2ZWwtYW1vdW50JykuYWRkQ2xhc3MoJ2Z1bGwtYW1vdW50Jyk7XG4gICAgICAgIGZ1bGxfYW1vdW50ID0gKHRoYXQub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQgKyBwYXJzZUZsb2F0KCQodGhhdC5vcHRpb25zLmZlZV9hbW91bnQpLnRleHQoKSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZnVsbF9hbW91bnQgPSB0aGF0Lm9wdGlvbnMub3JpZ2luYWxfYW1vdW50O1xuICAgICAgfVxuICAgICAgJCh0aGF0Lm9wdGlvbnMuZnVsbF9hbW91bnRfc2VsZWN0b3IpLnRleHQocGFyc2VGbG9hdChmdWxsX2Ftb3VudCkudG9GaXhlZCgyKSk7XG4gICAgfSwgLy8gY3JlZGl0Q2FyZEZlZUNoZWNrYm94XG5cbiAgICBkb25hdGVBbm9ueW1vdXNseTogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgaWYgKCQob3B0aW9ucy5hbm9ueW1vdXNfc2VsZWN0b3IsIGVsZW1lbnQpLmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgICQob3B0aW9ucy5uYW1lX3NlbGVjdG9yICsgJyBkaXY6Zmlyc3QnLCBlbGVtZW50KS5oaWRlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkKG9wdGlvbnMubmFtZV9zZWxlY3RvciArICcgZGl2OmZpcnN0JywgZWxlbWVudCkuc2hvdygpO1xuICAgICAgfVxuXG4gICAgICAkKG9wdGlvbnMuYW5vbnltb3VzX3NlbGVjdG9yLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICgkKHRoaXMpLmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgICAgJChvcHRpb25zLm5hbWVfc2VsZWN0b3IgKyAnIGRpdjpmaXJzdCcsIGVsZW1lbnQpLmhpZGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkKG9wdGlvbnMubmFtZV9zZWxlY3RvciArICcgZGl2OmZpcnN0JywgZWxlbWVudCkuc2hvdygpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LCAvLyBkb25hdGVBbm9ueW1vdXNseVxuXG4gICAgY2hlY2tMZXZlbDogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucywgcmV0dXJudmFsdWUpIHtcbiAgICAgIHZhciBsZXZlbCA9ICcnO1xuICAgICAgdmFyIGxldmVsbnVtID0gMDtcbiAgICAgIHZhciBsZXZlbGNsYXNzID0gJ2xldmVsIGxldmVsLS0nO1xuICAgICAgdmFyIGFtb3VudF95ZWFybHk7XG4gICAgICB2YXIgZnJlcXVlbmN5ID0gb3B0aW9ucy5mcmVxdWVuY3k7XG4gICAgICB2YXIgYW1vdW50ID0gb3B0aW9ucy5vcmlnaW5hbF9hbW91bnQ7XG5cbiAgICAgIGlmIChmcmVxdWVuY3kgPT09IDEyKSB7XG4gICAgICAgIGFtb3VudF95ZWFybHkgPSBhbW91bnQgKiBmcmVxdWVuY3k7XG4gICAgICB9IGVsc2UgaWYgKGZyZXF1ZW5jeSA9PT0gMSkge1xuICAgICAgICBhbW91bnRfeWVhcmx5ID0gYW1vdW50O1xuICAgICAgfVxuICAgICAgXG4gICAgICAkLmVhY2gob3B0aW9ucy5sZXZlbHMsIGZ1bmN0aW9uKGluZGV4LCB2YWx1ZSkge1xuICAgICAgICB2YXIgbmFtZSA9IHZhbHVlLm5hbWU7XG4gICAgICAgIHZhciBudW0gPSBpbmRleDtcbiAgICAgICAgdmFyIG1heCA9IHZhbHVlLm1heDtcbiAgICAgICAgdmFyIG1pbiA9IHZhbHVlLm1pbjtcbiAgICAgICAgaWYgKHR5cGVvZiBtaW4gIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBtYXggIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgaWYgKGFtb3VudF95ZWFybHkgPj0gbWluICYmIGFtb3VudF95ZWFybHkgPCBtYXgpIHtcbiAgICAgICAgICAgIGxldmVsID0gbmFtZTtcbiAgICAgICAgICAgIGxldmVsbnVtID0gbnVtO1xuICAgICAgICAgICAgbGV2ZWxjbGFzcyArPSBudW07XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBtYXggIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgaWYgKGFtb3VudF95ZWFybHkgPCBtYXgpIHtcbiAgICAgICAgICAgIGxldmVsID0gbmFtZTtcbiAgICAgICAgICAgIGxldmVsbnVtID0gbnVtO1xuICAgICAgICAgICAgbGV2ZWxjbGFzcyArPSBudW07XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBtaW4gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgaWYgKGFtb3VudF95ZWFybHkgPj0gbWluKSB7XG4gICAgICAgICAgICBsZXZlbCA9IG5hbWU7XG4gICAgICAgICAgICBsZXZlbG51bSA9IG51bTtcbiAgICAgICAgICAgIGxldmVsY2xhc3MgKz0gbnVtO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBpZiAoJChvcHRpb25zLmxldmVsX2luZGljYXRvcl9zZWxlY3RvcikubGVuZ3RoID4gMCAmJiAkKG9wdGlvbnMucmV2aWV3X2JlbmVmaXRzX3NlbGVjdG9yKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICQob3B0aW9ucy5sZXZlbF9pbmRpY2F0b3Jfc2VsZWN0b3IsIGVsZW1lbnQpLnByb3AoJ2NsYXNzJywgbGV2ZWxjbGFzcyk7XG4gICAgICAgICQob3B0aW9ucy5sZXZlbF9uYW1lX3NlbGVjdG9yKS50ZXh0KGxldmVsLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgbGV2ZWwuc2xpY2UoMSkpO1xuXG4gICAgICAgIHZhciByZXZpZXdfbGV2ZWxfYmVuZWZpdHMgPSB0aGlzLmdldFF1ZXJ5U3RyaW5ncygkKG9wdGlvbnMucmV2aWV3X2JlbmVmaXRzX3NlbGVjdG9yLCBlbGVtZW50KS5wcm9wKCdocmVmJykpO1xuICAgICAgICByZXZpZXdfbGV2ZWxfYmVuZWZpdHMgPSByZXZpZXdfbGV2ZWxfYmVuZWZpdHNbJ2xldmVsJ107XG4gICAgICAgIFxuICAgICAgICB2YXIgbGluayA9ICQob3B0aW9ucy5yZXZpZXdfYmVuZWZpdHNfc2VsZWN0b3IsIGVsZW1lbnQpLnByb3AoJ2hyZWYnKTtcbiAgICAgICAgbGluayA9IGxpbmsucmVwbGFjZShyZXZpZXdfbGV2ZWxfYmVuZWZpdHMsIGxldmVsKTtcbiAgICAgICAgJChvcHRpb25zLnJldmlld19iZW5lZml0c19zZWxlY3RvcikucHJvcCgnaHJlZicsIGxpbmspO1xuICAgICAgfVxuICAgICAgaWYgKHJldHVybnZhbHVlID09PSAnbmFtZScpIHtcbiAgICAgICAgcmV0dXJuIGxldmVsO1xuICAgICAgfSBlbHNlIGlmIChyZXR1cm52YWx1ZSA9PT0gJ251bScpIHtcbiAgICAgICAgcmV0dXJuIGxldmVsbnVtOyAgXG4gICAgICB9XG4gICAgfSwgLy8gY2hlY2tMZXZlbFxuXG4gICAgdXBzZWxsOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zLCBhbW91bnQsIGZyZXF1ZW5jeSkge1xuICAgICAgaWYgKG9wdGlvbnMuYWxsb3dfdXBzZWxsID09PSB0cnVlKSB7XG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgdmFyIGFtb3VudF9tb250aGx5O1xuXG4gICAgICAgIGlmIChmcmVxdWVuY3kgPT09IDEyKSB7XG4gICAgICAgICAgYW1vdW50X21vbnRobHkgPSBhbW91bnQ7XG4gICAgICAgIH0gZWxzZSBpZiAoZnJlcXVlbmN5ID09PSAxKSB7XG4gICAgICAgICAgYW1vdW50X21vbnRobHkgPSBhbW91bnQgLyBmcmVxdWVuY3k7XG4gICAgICAgIH1cblxuICAgICAgICAkLmVhY2gob3B0aW9ucy51cHNlbGwsIGZ1bmN0aW9uKGluZGV4LCB2YWx1ZSkge1xuICAgICAgICAgIGlmIChpbmRleCA9PT0gb3B0aW9ucy5sZXZlbCkgeyAvLyBjdXJyZW50IGxldmVsIHVwc2VsbFxuICAgICAgICAgICAgaWYgKCh2YWx1ZSAhPT0gdHJ1ZSAmJiBhbW91bnRfbW9udGhseSA8IHZhbHVlKSB8fCB2YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgICAgJChvcHRpb25zLnVwc2VsbF9zZWxlY3RvciwgZWxlbWVudCkuaGlkZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJChvcHRpb25zLnVwc2VsbF9idG5fc2VsZWN0b3IsIGVsZW1lbnQpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgdmFyIHVwc29sZCA9IG9wdGlvbnMudXBzb2xkO1xuICAgICAgICAgIHRoYXQub3B0aW9ucy5hbW91bnQgPSB1cHNvbGQ7XG4gICAgICAgICAgJChvcHRpb25zLmxldmVsX2Ftb3VudF9zZWxlY3RvciwgZWxlbWVudCkudGV4dCh1cHNvbGQpO1xuICAgICAgICAgICQob3B0aW9ucy5mdWxsX2Ftb3VudF9zZWxlY3RvciwgZWxlbWVudCkudGV4dCh1cHNvbGQpO1xuICAgICAgICAgICQob3B0aW9ucy5vcmlnaW5hbF9hbW91bnRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCh1cHNvbGQpO1xuICAgICAgICAgICQodGhpcykucmVtb3ZlKCk7XG4gICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB0aGF0LmluaXQodHJ1ZSwgdXBzb2xkKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkKG9wdGlvbnMudXBzZWxsX3NlbGVjdG9yLCBlbGVtZW50KS5oaWRlKCk7XG4gICAgICB9XG4gICAgfSwgLy8gdXBzZWxsXG5cbiAgICBob25vck9yTWVtb3J5OiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICBpZiAoJChvcHRpb25zLmhvbm9yX3NlbGVjdG9yLCBlbGVtZW50KS5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICAkKG9wdGlvbnMuaG9ub3JfbWVtb3J5X25hbWVfc2VsZWN0b3IgKyAnIGRpdicgKyBvcHRpb25zLmhvbm9yX25hbWVfc2VsZWN0b3IsIGVsZW1lbnQpLnNob3coKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQob3B0aW9ucy5ob25vcl9tZW1vcnlfbmFtZV9zZWxlY3RvciArICcgZGl2JyArIG9wdGlvbnMuaG9ub3JfbmFtZV9zZWxlY3RvciwgZWxlbWVudCkuaGlkZSgpO1xuICAgICAgICAkKG9wdGlvbnMuaG9ub3JfbmFtZV9zZWxlY3RvciArICcgaW5wdXQnLCBlbGVtZW50KS52YWwoJycpO1xuICAgICAgfVxuXG4gICAgICBpZiAoJChvcHRpb25zLm1lbW9yeV9zZWxlY3RvciwgZWxlbWVudCkuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgJChvcHRpb25zLmhvbm9yX21lbW9yeV9uYW1lX3NlbGVjdG9yICsgJyBkaXYnICsgb3B0aW9ucy5tZW1vcnlfbmFtZV9zZWxlY3RvciwgZWxlbWVudCkuc2hvdygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJChvcHRpb25zLmhvbm9yX21lbW9yeV9uYW1lX3NlbGVjdG9yICsgJyBkaXYnICsgb3B0aW9ucy5tZW1vcnlfbmFtZV9zZWxlY3RvciwgZWxlbWVudCkuaGlkZSgpO1xuICAgICAgICAkKG9wdGlvbnMubWVtb3J5X25hbWVfc2VsZWN0b3IgKyAnIGlucHV0JywgZWxlbWVudCkudmFsKCcnKTtcbiAgICAgIH1cblxuICAgICAgJChvcHRpb25zLmhvbm9yX29yX21lbW9yeV9jaG9vc2VyLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICgkKG9wdGlvbnMuaG9ub3Jfc2VsZWN0b3IpLmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgICAgJChvcHRpb25zLmhvbm9yX21lbW9yeV9uYW1lX3NlbGVjdG9yICsgJyBkaXYnICsgb3B0aW9ucy5ob25vcl9uYW1lX3NlbGVjdG9yLCBlbGVtZW50KS5zaG93KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJChvcHRpb25zLmhvbm9yX21lbW9yeV9uYW1lX3NlbGVjdG9yICsgJyBkaXYnICsgb3B0aW9ucy5ob25vcl9uYW1lX3NlbGVjdG9yLCBlbGVtZW50KS5oaWRlKCk7XG4gICAgICAgICAgJChvcHRpb25zLmhvbm9yX25hbWVfc2VsZWN0b3IgKyAnIGlucHV0JywgZWxlbWVudCkudmFsKCcnKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoJChvcHRpb25zLm1lbW9yeV9zZWxlY3RvcikuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgICAkKG9wdGlvbnMuaG9ub3JfbWVtb3J5X25hbWVfc2VsZWN0b3IgKyAnIGRpdicgKyBvcHRpb25zLm1lbW9yeV9uYW1lX3NlbGVjdG9yLCBlbGVtZW50KS5zaG93KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJChvcHRpb25zLmhvbm9yX21lbW9yeV9uYW1lX3NlbGVjdG9yICsgJyBkaXYnICsgb3B0aW9ucy5tZW1vcnlfbmFtZV9zZWxlY3RvciwgZWxlbWVudCkuaGlkZSgpO1xuICAgICAgICAgICQob3B0aW9ucy5tZW1vcnlfbmFtZV9zZWxlY3RvciArICcgaW5wdXQnLCBlbGVtZW50KS52YWwoJycpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIH0sIC8vIGhvbm9yT3JNZW1vcnlcblxuICAgIHN3YWc6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMsIGNoYW5nZSkge1xuICAgICAgXG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB2YXIgY3VycmVudGxldmVsID0gdGhhdC5vcHRpb25zLmxldmVsbnVtO1xuXG4gICAgICBpZiAoY2hhbmdlID09PSBmYWxzZSkgeyAvLyBrZWVwIHRoaXMgZnJvbSByZXBlYXRpbmdcbiAgICAgICAgJChvcHRpb25zLnN3YWdfc2VsZWN0b3IsIGVsZW1lbnQpLmhpZGUoKTsgLy8gaGlkZSBhbGwgdGhlIHN3YWcgaXRlbXMgZmlyc3RcbiAgICAgICAgJChvcHRpb25zLnN3YWdfc2VsZWN0b3IsIGVsZW1lbnQpLmZpbHRlcihmdW5jdGlvbihpbmRleCkgeyAvLyBvbmx5IHNob3cgaXRlbXMgdGhhdCBhcmUgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIGRvbmF0aW9uIGxldmVsXG4gICAgICAgICAgcmV0dXJuICQodGhpcykucHJvcCgnY2xhc3MnKS5zbGljZSgtMSkgPD0gY3VycmVudGxldmVsO1xuICAgICAgICB9KS5zaG93KCk7XG5cbiAgICAgICAgJChvcHRpb25zLnNlcGFyYXRlX3N3YWdfcmVkZWVtLCBlbGVtZW50KS5jbGljayhmdW5jdGlvbihldmVudCkgeyAvLyBpZiB1c2VyIGNsaWNrcyB0byByZWRlZW0gYSBzZXBhcmF0ZSBpdGVtIChpZSBhdGxhbnRpYylcbiAgICAgICAgICBldmVudC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAkKG9wdGlvbnMuc2VwYXJhdGVfc3dhZ19zZWxlY3RvciwgZWxlbWVudCkudG9nZ2xlKCk7IC8vIHNob3cgdGhlIG9wdGlvbnMgdGhlcmVcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoJChvcHRpb25zLmF0bGFudGljX2V4aXN0aW5nLCBlbGVtZW50KS5pcygnOmNoZWNrZWQnKSkgeyAvLyBpZiB1c2VyIGhhcyBleGlzdGluZyBhdGxhbnRpYyBzdWJzY3JpcHRpb25cbiAgICAgICAgJChvcHRpb25zLmF0bGFudGljX3NlbGVjdG9yLCBlbGVtZW50KS5zaG93KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkKG9wdGlvbnMuYXRsYW50aWNfc2VsZWN0b3IsIGVsZW1lbnQpLmhpZGUoKTtcbiAgICAgIH1cblxuICAgICAgJChvcHRpb25zLmF0bGFudGljX3N0YXR1cywgZWxlbWVudCkuY2hhbmdlKGZ1bmN0aW9uKCkgeyAvLyBpZiB1c2VyIGNsaWNrcyBvbmUgb2YgdGhlIGF0bGFudGljIHJhZGlvIGJ1dHRvbnNcbiAgICAgICAgdGhhdC5zd2FnKGVsZW1lbnQsIG9wdGlvbnMsIHRydWUpO1xuICAgICAgfSk7XG5cbiAgICAgICQob3B0aW9ucy5zd2FnX2RlY2xpbmVfc2VsZWN0b3IsIGVsZW1lbnQpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICQob3B0aW9ucy5zd2FnX255dF9zZWxlY3RvciwgZWxlbWVudCkucHJvcCgnY2hlY2tlZCcsIGZhbHNlKTtcbiAgICAgIH0pO1xuXG4gICAgICB2YXIgbWF4aW11bV9jaG9vc2UgPSAkKG9wdGlvbnMuc3dhZ19zZWxlY3Rvcl9jaG9vc2VfbXVsdGlwbGUsIGVsZW1lbnQpLmRhdGEoJ21heGltdW0tY2hvb3NlJyk7XG4gICAgICAkKG9wdGlvbnMuc3dhZ19zZWxlY3Rvcl9jaG9vc2VfbXVsdGlwbGUsIGVsZW1lbnQpLnNob3coKTtcbiAgICAgICQob3B0aW9ucy5zd2FnX3NlbGVjdG9yX2Nob29zZV9tdWx0aXBsZSwgZWxlbWVudCkuZmluZCgnbGFiZWwsIC5zd2FnJykuc2hvdygpO1xuICAgICAgdmFyIGNvdW50X2NoZWNrZWQgPSAkKG9wdGlvbnMuc3dhZ19zZWxlY3Rvcl9jaG9vc2VfbXVsdGlwbGUgKyAnIGlucHV0W25hbWU9XCInICsgb3B0aW9ucy5zd2FnX2Nob29zZV9tdWx0aXBsZV9uYW1lICsgJ1wiXTpjaGVja2VkJykubGVuZ3RoO1xuICAgICAgJCgnaW5wdXQnLCBvcHRpb25zLnN3YWdfc2VsZWN0b3JfY2hvb3NlX211bHRpcGxlKS5jaGFuZ2UoZnVuY3Rpb24oKSB7IC8vIGlmIHVzZXIgY2xpY2tzIG9uZSBvZiB0aGUgYXRsYW50aWMgcmFkaW8gYnV0dG9uc1xuICAgICAgICBpZiAoICQodGhpcykucHJvcCgndHlwZScpID09ICdjaGVja2JveCcpIHtcbiAgICAgICAgICBjb3VudF9jaGVja2VkID0gJChvcHRpb25zLnN3YWdfc2VsZWN0b3JfY2hvb3NlX211bHRpcGxlICsgJyBpbnB1dFtuYW1lPVwiJyArIG9wdGlvbnMuc3dhZ19jaG9vc2VfbXVsdGlwbGVfbmFtZSArICdcIl06Y2hlY2tlZCcpLmxlbmd0aDtcbiAgICAgICAgICBpZiAobWF4aW11bV9jaG9vc2UgPT09IGNvdW50X2NoZWNrZWQpIHtcbiAgICAgICAgICAgICQoJ2lucHV0Om5vdCg6Y2hlY2tlZCknLCBvcHRpb25zLnN3YWdfc2VsZWN0b3JfY2hvb3NlX211bHRpcGxlKS5hdHRyKCdkaXNhYmxlZCcsdHJ1ZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoJ2lucHV0Om5vdCg6Y2hlY2tlZCknLCBvcHRpb25zLnN3YWdfc2VsZWN0b3JfY2hvb3NlX211bHRpcGxlKS5hdHRyKCdkaXNhYmxlZCcsZmFsc2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICB9LCAvLyBzd2FnXG5cbiAgICBvdXRzaWRlVW5pdGVkU3RhdGVzOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICAkKG9wdGlvbnMuc2hvd19iaWxsaW5nX2NvdW50cnlfc2VsZWN0b3IpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAkKG9wdGlvbnMuYmlsbGluZ19jb3VudHJ5X3NlbGVjdG9yKS5zaG93KCk7XG4gICAgICAgICQodGhpcykucGFyZW50KCkuaGlkZSgpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KTtcbiAgICAgICQob3B0aW9ucy5zaG93X3NoaXBwaW5nX2NvdW50cnlfc2VsZWN0b3IpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAkKG9wdGlvbnMuc2hpcHBpbmdfY291bnRyeV9zZWxlY3Rvcikuc2hvdygpO1xuICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmhpZGUoKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSk7XG4gICAgfSwgLy8gb3V0c2lkZVVuaXRlZFN0YXRlc1xuXG4gICAgc2hpcHBpbmdBZGRyZXNzOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB2YXIgc2hvd19zaGlwcGluZyA9IGZhbHNlO1xuICAgICAgaWYgKCQob3B0aW9ucy51c2VfZm9yX3NoaXBwaW5nX3NlbGVjdG9yKS5sZW5ndGggPiAwKSB7IC8vIHdlIGhhdmUgYSBzaGlwcGluZyBjaGVja2JveFxuICAgICAgICBzaG93X3NoaXBwaW5nID0gdHJ1ZTtcbiAgICAgIH1cbi8vICAgICAgc2hvd19zaGlwcGluZyA9ICEhJChvcHRpb25zLnVzZV9mb3Jfc2hpcHBpbmdfc2VsZWN0b3IgKyAnOmNoZWNrZWQnLCBlbGVtZW50KS5sZW5ndGg7XG4vLyAgICAgIC8vdGhpcy5kZWJ1Zygnc2hvdyBpcyB0aGVyZScpO1xuXG4vKiAgICAgICQob3B0aW9ucy51c2VfZm9yX3NoaXBwaW5nX3NlbGVjdG9yLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoYXQuc2hpcHBpbmdBZGRyZXNzKGVsZW1lbnQsIG9wdGlvbnMpO1xuICAgICAgICAvL3RoaXMuZGVidWcoJ2NoYW5nZSBpdCcpO1xuICAgICAgfSk7XG4qL1xuICAgICAgaWYgKHNob3dfc2hpcHBpbmcgPT09IHRydWUgKSB7XG4gICAgICAgICQob3B0aW9ucy51c2VfZm9yX3NoaXBwaW5nX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKS5zaG93KCk7XG4gICAgICAgIGlmICgkKG9wdGlvbnMudXNlX2Zvcl9zaGlwcGluZ19zZWxlY3RvciwgZWxlbWVudCkuaXMoJzpjaGVja2VkJykpIHsgLy8gdXNlIHNhbWUgYXMgYmlsbGluZ1xuICAgICAgICAgICQob3B0aW9ucy5zaGlwcGluZ19zZWxlY3RvcikuaGlkZSgpO1xuICAgICAgICB9IGVsc2UgeyAvLyBzZXBhcmF0ZSBzaGlwcGluZyBhbmQgYmlsbGluZ1xuICAgICAgICAgICQob3B0aW9ucy5zaGlwcGluZ19zZWxlY3Rvcikuc2hvdygpO1xuICAgICAgICB9XG4gICAgICAgICQob3B0aW9ucy51c2VfZm9yX3NoaXBwaW5nX3NlbGVjdG9yLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdGhhdC5zaGlwcGluZ0FkZHJlc3MoZWxlbWVudCwgb3B0aW9ucyk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgXG4gICAgfSwgLy8gc2hpcHBpbmdBZGRyZXNzXG5cbiAgICBhbGxvd01pbm5wb3N0QWNjb3VudDogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucywgY2hhbmdlZCkge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdmFyIGFjY291bnRfZXhpc3RzID0gZmFsc2U7XG5cbiAgICAgIGZ1bmN0aW9uIGRvbmVUeXBpbmcgKCkge1xuICAgICAgICB2YXIgZW1haWwgPSAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpO1xuICAgICAgICBhY2NvdW50X2V4aXN0cyA9IHRoYXQuY2hlY2tNaW5ucG9zdEFjY291bnRFeGlzdHMoZWxlbWVudCwgb3B0aW9ucywgZW1haWwpO1xuICAgICAgfVxuXG4gICAgICAvL3NldHVwIGJlZm9yZSBmdW5jdGlvbnNcbiAgICAgIHZhciB0eXBpbmdUaW1lcjsgICAgICAgICAgICAgICAgLy90aW1lciBpZGVudGlmaWVyXG4gICAgICB2YXIgZG9uZVR5cGluZ0ludGVydmFsID0gNTAwMDsgIC8vdGltZSBpbiBtcywgNSBzZWNvbmQgZm9yIGV4YW1wbGVcblxuICAgICAgLy9vbiBrZXl1cCwgc3RhcnQgdGhlIGNvdW50ZG93blxuICAgICAgJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5rZXl1cChmdW5jdGlvbigpe1xuICAgICAgICBjbGVhclRpbWVvdXQodHlwaW5nVGltZXIpO1xuICAgICAgICBpZiAoJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwpIHtcbiAgICAgICAgICB0eXBpbmdUaW1lciA9IHNldFRpbWVvdXQoZG9uZVR5cGluZywgZG9uZVR5cGluZ0ludGVydmFsKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIC8vdXNlciBpcyBcImZpbmlzaGVkIHR5cGluZyxcIiBkbyBzb21ldGhpbmdcblxuICAgICAgaWYgKCQob3B0aW9ucy5jcmVhdGVfbXBfc2VsZWN0b3IsIGVsZW1lbnQpLmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgICQob3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgZWxlbWVudCkuc2hvdygpO1xuICAgICAgICBvcHRpb25zLmNyZWF0ZV9hY2NvdW50ID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQob3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgZWxlbWVudCkuaGlkZSgpO1xuICAgICAgfVxuXG4gICAgICAkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoYXQuYWxsb3dNaW5ucG9zdEFjY291bnQoZWxlbWVudCwgb3B0aW9ucywgdHJ1ZSk7XG4gICAgICB9KTtcblxuICAgICAgaWYgKGNoYW5nZWQgPT09IGZhbHNlKSB7XG4gICAgICAgIC8vIGFsbG93IHVzZXJzIHRvIHNob3cgcGxhaW4gdGV4dCwgb3IgdG8gc2VlIHB3IGNyaXRlcmlhXG4gICAgICAgICQob3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgZWxlbWVudCkuYXBwZW5kKCc8ZGl2IGNsYXNzPVwiaGVscC1saW5rXCI+PHNwYW4+UGFzc3dvcmQgaGVscDwvc3Bhbj48L2Rpdj48ZGl2IGNsYXNzPVwiZm9ybS1oZWxwXCI+UGFzc3dvcmQgbXVzdCBiZSBhdCBsZWFzdCA2IGNoYXJhY3RlcnMuPC9kaXY+PGxhYmVsIGNsYXNzPVwiYWRkaXRpb25hbC1vcHRpb25cIj48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgbmFtZT1cInNob3dwYXNzd29yZFwiIGlkPVwic2hvd3Bhc3N3b3JkXCI+IFNob3cgcGFzc3dvcmQ8L2xhYmVsPicpO1xuICAgICAgICAkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKS5iZWZvcmUoJzxwIGNsYXNzPVwiYWNjb3VudC1leGlzdHMgc3VjY2Vzc1wiPlRoZXJlIGlzIGFscmVhZHkgYSBNaW5uUG9zdC5jb20gYWNjb3VudCB3aXRoIHRoaXMgZW1haWwuPC9wPicpO1xuICAgICAgICAkKCcuYWNjb3VudC1leGlzdHMnKS5oaWRlKCk7XG4gICAgICAgICQoJyNzaG93cGFzc3dvcmQnKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAoJCh0aGlzKS5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICAgICAgJCgnI3Bhc3N3b3JkJykuZ2V0KDApLnR5cGUgPSAndGV4dCc7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoJyNwYXNzd29yZCcpLmdldCgwKS50eXBlID0gJ3Bhc3N3b3JkJztcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5mb3JtLWl0ZW0gLmZvcm0taGVscCcpLmhpZGUoKTtcbiAgICAgIH1cbiAgICAgICQoJy5mb3JtLWl0ZW0tLXdpdGgtaGVscCBsYWJlbCwgLmZvcm0taXRlbS0td2l0aC1oZWxwIGlucHV0JykubmV4dCgnLmhlbHAtbGluaycpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpLm5leHQoJy5mb3JtLWhlbHAnKS50b2dnbGUoKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSk7XG4gICAgfSwgLy8gYWxsb3dNaW5ucG9zdEFjY291bnRcblxuICAgIHBvcHVsYXRlQXR0ZW5kZWVzOiBmdW5jdGlvbihxdWFudGl0eSkge1xuICAgICAgdmFyIGF0dGVuZGVlcyA9ICcnO1xuICAgICAgdmFyIGF0dGVuZGVlID0gJCgnLmF0dGVuZGVlcyA+IGZpZWxkc2V0OmZpcnN0JykuaHRtbCgpO1xuICAgICAgZm9yIChpID0gMTsgaSA8PSBxdWFudGl0eTsgaSsrKSB7XG4gICAgICAgIGF0dGVuZGVlcyArPSAnPGZpZWxkc2V0IGNsYXNzPVwiYXR0ZW5kZWVcIj4nICsgYXR0ZW5kZWUucmVwbGFjZSgvXzEvZywgJ18nICsgaSkgKyAnPC9maWVsZHNldD4nO1xuICAgICAgfVxuICAgICAgJCgnLmF0dGVuZGVlcycpLmh0bWwoYXR0ZW5kZWVzKTtcbiAgICB9LFxuXG4gICAgZGlzcGxheUFtb3VudDogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucywgc2luZ2xlX3VuaXRfcHJpY2UsIHF1YW50aXR5LCBhZGRpdGlvbmFsX2Ftb3VudCwgdmFsaWRfY29kZSkge1xuICAgICAgdmFyIGFtb3VudCA9IHNpbmdsZV91bml0X3ByaWNlICogcGFyc2VJbnQocXVhbnRpdHksIDEwKTtcbiAgICAgIGlmIChhZGRpdGlvbmFsX2Ftb3VudCA9PT0gJycpIHtcbiAgICAgICAgYWRkaXRpb25hbF9hbW91bnQgPSAwO1xuICAgICAgICAkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yKS5wYXJlbnQoKS5oaWRlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhbW91bnQgKz0gcGFyc2VJbnQoYWRkaXRpb25hbF9hbW91bnQsIDEwKTtcbiAgICAgICAgbGV2ZWxjaGVjayA9IHtvcmlnaW5hbF9hbW91bnQ6IGFkZGl0aW9uYWxfYW1vdW50LCBmcmVxdWVuY3k6IDEsIGxldmVsczogb3B0aW9ucy5sZXZlbHN9O1xuICAgICAgICBsZXZlbCA9IHRoaXMuY2hlY2tMZXZlbChlbGVtZW50LCBsZXZlbGNoZWNrLCAnbnVtJyk7XG4gICAgICAgIGlmIChsZXZlbCA+PSAyKSB7XG4gICAgICAgICAgJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvcikucGFyZW50KCkuc2hvdygpO1xuICAgICAgICB9XG4gICAgICAgICQob3B0aW9ucy5oYXNfYWRkaXRpb25hbF90ZXh0X3NlbGVjdG9yKS5odG1sKCQob3B0aW9ucy5oYXNfYWRkaXRpb25hbF90ZXh0X3NlbGVjdG9yKS5kYXRhKCd0ZXh0JykpO1xuICAgICAgICAkKG9wdGlvbnMuYWRkaXRpb25hbF9hbW91bnRfc2VsZWN0b3IpLnRleHQocGFyc2VGbG9hdCgkKG9wdGlvbnMuYWRkaXRpb25hbF9hbW91bnRfZmllbGQpLnZhbCgpKSk7XG4gICAgICB9XG5cbiAgICAgICQob3B0aW9ucy5jYWxjdWxhdGVkX2Ftb3VudF9zZWxlY3RvcikudGV4dChhbW91bnQpOyAvLyB0aGlzIGlzIHRoZSBwcmV2aWV3IHRleHRcbiAgICAgICQob3B0aW9ucy5vcmlnaW5hbF9hbW91bnRfc2VsZWN0b3IpLnZhbChxdWFudGl0eSAqIHNpbmdsZV91bml0X3ByaWNlKTsgLy8gdGhpcyBpcyB0aGUgYW1vdW50IGZpZWxkXG4gICAgICAkKG9wdGlvbnMucXVhbnRpdHlfc2VsZWN0b3IpLnRleHQocXVhbnRpdHkpOyAvLyBldmVyeXdoZXJlIHRoZXJlJ3MgYSBxdWFudGl0eVxuXG4gICAgICBpZiAocXVhbnRpdHkgPT0gMSkge1xuICAgICAgICAkKCcuYXR0ZW5kZWUtdGl0bGUnKS50ZXh0KCQoJy5hdHRlbmRlZS10aXRsZScpLmRhdGEoJ3NpbmdsZScpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQoJy5hdHRlbmRlZS10aXRsZScpLnRleHQoJCgnLmF0dGVuZGVlLXRpdGxlJykuZGF0YSgncGx1cmFsJykpO1xuICAgICAgfVxuXG4gICAgICAkKCcuY29kZS1yZXN1bHQnKS5yZW1vdmUoKTtcbiAgICAgIGlmICh2YWxpZF9jb2RlID09PSB0cnVlKSB7XG4gICAgICAgICQoJy5hcHBseS1wcm9tby1jb2RlJykuYWZ0ZXIoJzxwIGNsYXNzPVwiY29kZS1yZXN1bHQgc3VjY2Vzc1wiPllvdXIgbWVtYmVyIGRpc2NvdW50IGNvZGUgd2FzIHN1Y2Nlc3NmdWxseSBhZGRlZC48L3A+Jyk7XG4gICAgICAgICQoJy5zaG93LScgKyBvcHRpb25zLnNpbmdsZV91bml0X3ByaWNlX2F0dHJpYnV0ZSkudGV4dChzaW5nbGVfdW5pdF9wcmljZSk7XG4gICAgICAgICQoJy5hcHBseS1wcm9tby1jb2RlJykudGV4dCgnQXBwbGllZCcpLmFkZENsYXNzKCdidG4tLWRpc2FibGVkJyk7XG4gICAgICB9IGVsc2UgaWYgKHZhbGlkX2NvZGUgPT09IGZhbHNlKSB7XG4gICAgICAgICQoJy5hcHBseS1wcm9tby1jb2RlJykuYWZ0ZXIoJzxwIGNsYXNzPVwiY29kZS1yZXN1bHQgZXJyb3JcIj5UaGlzIGNvZGUgaXMgaW5jb3JyZWN0LiBUcnkgYWdhaW4uPC9wPicpO1xuICAgICAgfVxuXG4gICAgfSxcblxuICAgIGNhbGN1bGF0ZUFtb3VudDogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucywgZGF0YSkge1xuICAgICAgLy90aGlzLmRlYnVnKCdzdGFydC4gc2V0IHZhcmlhYmxlcyBhbmQgcGxhaW4gdGV4dCwgYW5kIHJlbW92ZSBjb2RlIHJlc3VsdC4nKTtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHZhciBxdWFudGl0eSA9ICQob3B0aW9ucy5xdWFudGl0eV9maWVsZCkudmFsKCk7XG5cbiAgICAgIHZhciBzaW5nbGVfdW5pdF9wcmljZSA9ICQob3B0aW9ucy5xdWFudGl0eV9maWVsZCkuZGF0YShvcHRpb25zLnNpbmdsZV91bml0X3ByaWNlX2F0dHJpYnV0ZSk7XG4gICAgICB2YXIgYWRkaXRpb25hbF9hbW91bnQgPSAkKG9wdGlvbnMuYWRkaXRpb25hbF9hbW91bnRfZmllbGQpLnZhbCgpO1xuICAgICAgaWYgKGRhdGEuc3VjY2VzcyA9PT0gdHJ1ZSkge1xuICAgICAgICBzaW5nbGVfdW5pdF9wcmljZSA9IGRhdGEuc2luZ2xlX3VuaXRfcHJpY2U7XG4gICAgICB9XG4gICAgICB0aGF0LmRpc3BsYXlBbW91bnQoZWxlbWVudCwgb3B0aW9ucywgc2luZ2xlX3VuaXRfcHJpY2UsIHF1YW50aXR5LCBhZGRpdGlvbmFsX2Ftb3VudCwgZGF0YS5zdWNjZXNzKTtcblxuICAgICAgJChvcHRpb25zLnF1YW50aXR5X2ZpZWxkICsgJywgJyArIG9wdGlvbnMuYWRkaXRpb25hbF9hbW91bnRfZmllbGQpLmNoYW5nZShmdW5jdGlvbigpIHsgLy8gdGhlIHF1YW50aXR5IG9yIGFkZGl0aW9uYWwgYW1vdW50IGNoYW5nZWRcbiAgICAgICAgcXVhbnRpdHkgPSAkKG9wdGlvbnMucXVhbnRpdHlfZmllbGQpLnZhbCgpO1xuICAgICAgICBhZGRpdGlvbmFsX2Ftb3VudCA9ICQob3B0aW9ucy5hZGRpdGlvbmFsX2Ftb3VudF9maWVsZCkudmFsKCk7XG4gICAgICAgIGlmIChxdWFudGl0eSAhPSAxKSB7XG4gICAgICAgICAgJChvcHRpb25zLml0ZW1fc2VsZWN0b3IpLnRleHQoJChvcHRpb25zLml0ZW1fc2VsZWN0b3IpLmRhdGEoJ3BsdXJhbCcpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkKG9wdGlvbnMuaXRlbV9zZWxlY3RvcikudGV4dCgkKG9wdGlvbnMuaXRlbV9zZWxlY3RvcikuZGF0YSgnc2luZ2xlJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhhdC5kaXNwbGF5QW1vdW50KGVsZW1lbnQsIG9wdGlvbnMsIHNpbmdsZV91bml0X3ByaWNlLCBxdWFudGl0eSwgYWRkaXRpb25hbF9hbW91bnQpO1xuICAgICAgICBcbiAgICAgIH0pO1xuXG4gICAgICB2YXIgYXR0ZW5kZWVzID0gJyc7XG4gICAgICAkKG9wdGlvbnMucmV2aWV3X3N0ZXBfc2VsZWN0b3IpLmZpbmQoJy5idG4nKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgYXR0ZW5kZWVzID0gdGhhdC5wb3B1bGF0ZUF0dGVuZGVlcyhxdWFudGl0eSk7XG4gICAgICB9KTtcblxuICAgICAgJCgnLnByb2dyZXNzLS1kb25hdGlvbiAucGFuZWwtLWF0dGVuZGVlcycpLmZpbmQoJ2EnKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgYXR0ZW5kZWVzID0gdGhhdC5wb3B1bGF0ZUF0dGVuZGVlcyhxdWFudGl0eSk7XG4gICAgICB9KTtcblxuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLnByb21vY29kZV9zZWxlY3RvcikubGVuZ3RoID4gMCkge1xuICAgICAgICAvLyQodGhpcy5vcHRpb25zLnByb21vY29kZV9zZWxlY3RvcikuYWZ0ZXIoJycpO1xuICAgICAgICAkKCcuYXBwbHktcHJvbW8tY29kZScpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgdmFyIGNvZGUgPSAkKG9wdGlvbnMucHJvbW9jb2RlX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKTtcbiAgICAgICAgICBpZiAoJChvcHRpb25zLmV2ZW50X2lkX3NlbGVjdG9yKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB2YXIgZXZlbnRfaWQgPSAkKG9wdGlvbnMuZXZlbnRfaWRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgZXZlbnRfaWQgPSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvL3VzZV9wcm9tbyA9IHRoYXQuY2hlY2tQcm9tb0NvZGUoY29kZSk7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgICBwcm9tb19jb2RlOiBjb2RlLFxuICAgICAgICAgICAgICBldmVudDogZXZlbnRfaWRcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgdXJsOiAnL2V2ZW50LWNoZWNrLXByb21vLycsXG4gICAgICAgICAgICAgIGRhdGE6IGRhdGFcbiAgICAgICAgICAgIH0pLmRvbmUoZnVuY3Rpb24oIGRhdGEgKSB7XG4gICAgICAgICAgICAgIHRoYXQuY2FsY3VsYXRlQW1vdW50KGVsZW1lbnQsIG9wdGlvbnMsIGRhdGEpO1xuICAgICAgICAgICAgICAvL3RoYXQuZGlzcGxheUFtb3VudChlbGVtZW50LCBvcHRpb25zLCBkYXRhLnNpbmdsZV91bml0X3ByaWNlLCBxdWFudGl0eSwgYWRkaXRpb25hbF9hbW91bnQsIGRhdGEuc3VjY2Vzcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICB9LCAvLyBjYWxjdWxhdGVBbW91bnRcblxuICAgIGNoZWNrUHJvbW9Db2RlOiBmdW5jdGlvbihjb2RlKSB7XG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgcHJvbW9fY29kZTogY29kZVxuICAgICAgfTtcbiAgICAgICQuYWpheCh7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICB1cmw6ICcvZXZlbnQtY2hlY2stcHJvbW8vJyxcbiAgICAgICAgZGF0YTogZGF0YVxuICAgICAgfSkuZG9uZShmdW5jdGlvbiggZGF0YSApIHtcbiAgICAgICAgaWYgKGRhdGEuc3VjY2VzcyA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSwgLy8gY2hlY2tQcm9tb0NvZGVcblxuICAgIHVzZVByb21vQ29kZTogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgJCh0aGlzLm9wdGlvbnMudXNlX3Byb21vY29kZV9zZWxlY3RvcikucGFyZW50KCkuaHRtbCgnPGEgaHJlZj1cIiNcIiBjbGFzcz1cInVzZS1wcm9tby1jb2RlXCI+VXNlIHByb21vIGNvZGU8L2E+Jyk7XG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMucHJvbW9jb2RlX3NlbGVjdG9yKS52YWwoKSA9PT0gJycpIHtcbiAgICAgICAgJChvcHRpb25zLnByb21vX3NlbGVjdG9yICsgJyBkaXY6Zmlyc3QnLCBlbGVtZW50KS5oaWRlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgJChvcHRpb25zLnByb21vX3NlbGVjdG9yICsgJyBkaXY6bGFzdCcsIGVsZW1lbnQpLmhpZGUoKTtcbiAgICAgIH1cbiAgICAgICQoJy51c2UtcHJvbW8tY29kZScpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICQob3B0aW9ucy5wcm9tb19zZWxlY3RvciArICcgZGl2OmZpcnN0JywgZWxlbWVudCkuc2hvdygpO1xuICAgICAgICAkKG9wdGlvbnMucHJvbW9fc2VsZWN0b3IgKyAnIGRpdjpsYXN0JywgZWxlbWVudCkuaGlkZSgpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfSk7XG4gICAgfSwgLy91c2VQcm9tb0NvZGVcblxuICAgIGFkZFRvQ2FsZW5kYXI6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgICQob3B0aW9ucy5jYWxlbmRhcl9idXR0b25fc2VsZWN0b3IpLmNzcygnZGlzcGxheScsICdpbmxpbmUtYmxvY2snKTtcbiAgICB9LCAvLyBhZGRUb0NhbGVuZGFyXG5cbiAgICBjaGVja01pbm5wb3N0QWNjb3VudEV4aXN0czogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucywgZW1haWwpIHsgICAgIFxuICAgICAgdmFyIHVzZXIgPSB7XG4gICAgICAgIGVtYWlsOiBlbWFpbFxuICAgICAgfTtcbiAgICAgICQuYWpheCh7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIHVybDogb3B0aW9ucy5taW5ucG9zdF9yb290ICsgJy93cC1qc29uL3VzZXItYWNjb3VudC1tYW5hZ2VtZW50L3YxL2NoZWNrLWFjY291bnQtZXhpc3RzJyxcbiAgICAgICAgZGF0YTogdXNlclxuICAgICAgfSkuZG9uZShmdW5jdGlvbiggcmVzdWx0ICkge1xuICAgICAgICBpZiAocmVzdWx0LnN0YXR1cyA9PT0gJ3N1Y2Nlc3MnICYmIHJlc3VsdC5yZWFzb24gPT09ICd1c2VyIGV4aXN0cycpIHsgLy8gdXNlciBleGlzdHNcbiAgICAgICAgICBpZiAoJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgICAgICQob3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgZWxlbWVudCkuaGlkZSgpO1xuICAgICAgICAgICAgJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkucGFyZW50KCkuaGlkZSgpO1xuICAgICAgICAgICAgJCgnLmFjY291bnQtZXhpc3RzJywgZWxlbWVudCkuc2hvdygpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KS5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgICAgICAgJChvcHRpb25zLnBhc3N3b3JkX3NlbGVjdG9yLCBlbGVtZW50KS5oaWRlKCk7XG4gICAgICAgICAgICAgICQob3B0aW9ucy5jcmVhdGVfbXBfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpLmhpZGUoKTtcbiAgICAgICAgICAgICAgJCgnLmFjY291bnQtZXhpc3RzJywgZWxlbWVudCkuc2hvdygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgeyAvLyB1c2VyIGRvZXMgbm90IGV4aXN0IG9yIGFqYXggY2FsbCBmYWlsZWRcbiAgICAgICAgICBpZiAoJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgICAgICQob3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgZWxlbWVudCkuc2hvdygpO1xuICAgICAgICAgICAgb3B0aW9ucy5jcmVhdGVfYWNjb3VudCA9IHRydWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQob3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgZWxlbWVudCkuaGlkZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAkKCcuYWNjb3VudC1leGlzdHMnLCBlbGVtZW50KS5oaWRlKCk7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LCAvLyBjaGVja01pbm5wb3N0QWNjb3VudEV4aXN0c1xuXG4gICAgY2hvb3NlUGF5bWVudE1ldGhvZDogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuXG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG5cbiAgICAgIGlmICgkKG9wdGlvbnMuY2hvb3NlX3BheW1lbnQpLmxlbmd0aCA+IDApIHsgICAgICBcbiAgICAgICAgaWYgKCQob3B0aW9ucy5jaG9vc2VfcGF5bWVudCArICcgaW5wdXQnKS5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICAgIHZhciBjaGVja2VkID0gJChvcHRpb25zLmNob29zZV9wYXltZW50ICsgJyBpbnB1dDpjaGVja2VkJykuYXR0cignaWQnKTtcbiAgICAgICAgICB2YXIgY2hlY2tlZF92YWx1ZSA9ICQob3B0aW9ucy5jaG9vc2VfcGF5bWVudCArICcgaW5wdXQ6Y2hlY2tlZCcpLnZhbCgpO1xuICAgICAgICAgICQob3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvcikucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICQob3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvciArICcuJyArIGNoZWNrZWQpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAkKG9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IgKyAnOm5vdCguYWN0aXZlKSBsYWJlbCcpLnJlbW92ZUNsYXNzKCdyZXF1aXJlZCcpO1xuICAgICAgICAgICQob3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvciArICc6bm90KC5hY3RpdmUpIGlucHV0JykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICAgICAgJChvcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yICsgJy5hY3RpdmUgbGFiZWwnKS5hZGRDbGFzcygncmVxdWlyZWQnKTtcbiAgICAgICAgICAkKG9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IgKyAnLmFjdGl2ZSBpbnB1dCcpLnByb3AoJ3JlcXVpcmVkJywgdHJ1ZSk7XG4gICAgICAgICAgaWYgKCBjaGVja2VkX3ZhbHVlID09PSAnYWNoJyApIHtcbiAgICAgICAgICAgIHRoYXQuY2FsY3VsYXRlRmVlcyh0aGF0Lm9wdGlvbnMub3JpZ2luYWxfYW1vdW50LCAnYWNoJyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoYXQuY2FsY3VsYXRlRmVlcyh0aGF0Lm9wdGlvbnMub3JpZ2luYWxfYW1vdW50LCAndmlzYScpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICQob3B0aW9ucy5jaG9vc2VfcGF5bWVudCArICcgaW5wdXQnKS5jaGFuZ2UoZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgJChvcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgJChvcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yICsgJy4nICsgdGhpcy5pZCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICQob3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvciArICc6bm90KC5hY3RpdmUpIGxhYmVsJykucmVtb3ZlQ2xhc3MoJ3JlcXVpcmVkJyk7XG4gICAgICAgICAgJChvcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yICsgJzpub3QoLmFjdGl2ZSkgaW5wdXQnKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgICAgICAkKG9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IgKyAnLmFjdGl2ZSBsYWJlbCcpLmFkZENsYXNzKCdyZXF1aXJlZCcpO1xuICAgICAgICAgICQob3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvciArICcuYWN0aXZlIGlucHV0JykucHJvcCgncmVxdWlyZWQnLCB0cnVlKTtcbiAgICAgICAgICAkKCcjYmFua1Rva2VuJykucmVtb3ZlKCk7XG4gICAgICAgICAgaWYgKCB0aGlzLnZhbHVlID09PSAnYWNoJyApIHtcbiAgICAgICAgICAgIHRoYXQuY2FsY3VsYXRlRmVlcyh0aGF0Lm9wdGlvbnMub3JpZ2luYWxfYW1vdW50LCAnYWNoJyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoYXQuY2FsY3VsYXRlRmVlcyh0aGF0Lm9wdGlvbnMub3JpZ2luYWxfYW1vdW50LCAndmlzYScpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSwgLy8gY2hvb3NlUGF5bWVudE1ldGhvZFxuXG4gICAgY3JlZGl0Q2FyZEZpZWxkczogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuXG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG5cbiAgICAgICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5wcmVwZW5kKCc8aW5wdXQgdHlwZT1cImhpZGRlblwiIGlkPVwic291cmNlXCIgbmFtZT1cInNvdXJjZVwiIHZhbHVlPVwiJyArIGRvY3VtZW50LnJlZmVycmVyICsgJ1wiIC8+Jyk7XG5cbiAgICAgIHZhciBzdHlsZSA9IHtcbiAgICAgICAgYmFzZToge1xuICAgICAgICAgIGljb25Db2xvcjogJyM2NjZFRTgnLFxuICAgICAgICAgIGxpbmVIZWlnaHQ6ICczN3B4JyxcbiAgICAgICAgICBmb250V2VpZ2h0OiA0MDAsXG4gICAgICAgICAgZm9udEZhbWlseTogJ0dlb3JnaWEsQ2FtYnJpYSxUaW1lcyBOZXcgUm9tYW4sVGltZXMsc2VyaWYnLFxuICAgICAgICAgIGZvbnRTaXplOiAnMTZweCcsXG4gICAgICAgIH0sXG4gICAgICB9O1xuXG4gICAgICAvLyBBZGQgYW4gaW5zdGFuY2Ugb2YgdGhlIGNhcmQgVUkgY29tcG9uZW50IGludG8gdGhlIGBjYXJkLWVsZW1lbnRgIDxkaXY+XG4gICAgICAvL2NhcmQubW91bnQoJyNjYXJkLWVsZW1lbnQnKTtcbiAgICAgIGlmICggJCgnLmNyZWRpdC1jYXJkLWdyb3VwJykubGVuZ3RoID09PSAwICYmICQoJy5wYXltZW50LW1ldGhvZC5jaG9vc2UtY2FyZCcpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGF0LmNhcmROdW1iZXJFbGVtZW50ID0gdGhhdC5lbGVtZW50cy5jcmVhdGUoJ2NhcmROdW1iZXInLCB7XG4gICAgICAgIHN0eWxlOiBzdHlsZVxuICAgICAgfSk7XG4gICAgICB0aGF0LmNhcmROdW1iZXJFbGVtZW50Lm1vdW50KG9wdGlvbnMuY2NfbnVtX3NlbGVjdG9yKTtcblxuICAgICAgdGhhdC5jYXJkRXhwaXJ5RWxlbWVudCA9IHRoYXQuZWxlbWVudHMuY3JlYXRlKCdjYXJkRXhwaXJ5Jywge1xuICAgICAgICBzdHlsZTogc3R5bGVcbiAgICAgIH0pO1xuICAgICAgdGhhdC5jYXJkRXhwaXJ5RWxlbWVudC5tb3VudChvcHRpb25zLmNjX2V4cF9zZWxlY3Rvcik7XG5cbiAgICAgIHRoYXQuY2FyZEN2Y0VsZW1lbnQgPSB0aGF0LmVsZW1lbnRzLmNyZWF0ZSgnY2FyZEN2YycsIHtcbiAgICAgICAgc3R5bGU6IHN0eWxlXG4gICAgICB9KTtcbiAgICAgIHRoYXQuY2FyZEN2Y0VsZW1lbnQubW91bnQob3B0aW9ucy5jY19jdnZfc2VsZWN0b3IpO1xuXG4gICAgICAvLyB2YWxpZGF0ZS9lcnJvciBoYW5kbGUgdGhlIGNhcmQgZmllbGRzXG4gICAgICB0aGF0LmNhcmROdW1iZXJFbGVtZW50Lm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAvLyBlcnJvciBoYW5kbGluZ1xuICAgICAgICB0aGF0LnN0cmlwZUVycm9yRGlzcGxheShldmVudCwgJChvcHRpb25zLmNjX251bV9zZWxlY3RvciwgZWxlbWVudCksIGVsZW1lbnQsIG9wdGlvbnMgKTtcbiAgICAgICAgLy8gU3dpdGNoIGJyYW5kIGxvZ29cbiAgICAgICAgaWYgKGV2ZW50LmJyYW5kKSB7XG4gICAgICAgICAgdGhhdC5jYWxjdWxhdGVGZWVzKHRoYXQub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQsIGV2ZW50LmJyYW5kKTtcbiAgICAgICAgICB0aGF0LnNldEJyYW5kSWNvbihldmVudC5icmFuZCk7XG4gICAgICAgIH1cbiAgICAgICAgLy9zZXRPdXRjb21lKGV2ZW50KTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGF0LmNhcmRFeHBpcnlFbGVtZW50Lm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAvLyBlcnJvciBoYW5kbGluZ1xuICAgICAgICB0aGF0LnN0cmlwZUVycm9yRGlzcGxheShldmVudCwgJChvcHRpb25zLmNjX2V4cF9zZWxlY3RvciwgZWxlbWVudCksIGVsZW1lbnQsIG9wdGlvbnMgKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGF0LmNhcmRDdmNFbGVtZW50Lm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAvLyBlcnJvciBoYW5kbGluZ1xuICAgICAgICB0aGF0LnN0cmlwZUVycm9yRGlzcGxheShldmVudCwgJChvcHRpb25zLmNjX2N2dl9zZWxlY3RvciwgZWxlbWVudCksIGVsZW1lbnQsIG9wdGlvbnMgKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyB0aGlzIGlzIHRoZSBtZXRob2QgdG8gY3JlYXRlIGEgc2luZ2xlIGNhcmQgZmllbGQgYW5kIG1vdW50IGl0XG4gICAgICAvKnZhciBjYXJkID0gdGhhdC5lbGVtZW50cy5jcmVhdGUoXG4gICAgICAgICdjYXJkJyxcbiAgICAgICAge1xuICAgICAgICAgIGhpZGVQb3N0YWxDb2RlOiB0cnVlXG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgICAvLyBBZGQgYW4gaW5zdGFuY2Ugb2YgdGhlIGNhcmQgVUkgY29tcG9uZW50IGludG8gdGhlIGBjYXJkLWVsZW1lbnRgIDxkaXY+XG4gICAgICBjYXJkLm1vdW50KCcjY2FyZC1lbGVtZW50Jyk7Ki9cblxuICAgIH0sIC8vIGNyZWRpdENhcmRGaWVsZHNcblxuICAgIHNldEJyYW5kSWNvbjogZnVuY3Rpb24oYnJhbmQpIHtcbiAgICAgIHZhciBjYXJkQnJhbmRUb1BmQ2xhc3MgPSB7XG4gICAgICAgICd2aXNhJzogJ3BmLXZpc2EnLFxuICAgICAgICAnbWFzdGVyY2FyZCc6ICdwZi1tYXN0ZXJjYXJkJyxcbiAgICAgICAgJ2FtZXgnOiAncGYtYW1lcmljYW4tZXhwcmVzcycsXG4gICAgICAgICdkaXNjb3Zlcic6ICdwZi1kaXNjb3ZlcicsXG4gICAgICAgICdkaW5lcnMnOiAncGYtZGluZXJzJyxcbiAgICAgICAgJ2pjYic6ICdwZi1qY2InLFxuICAgICAgICAndW5rbm93bic6ICdwZi1jcmVkaXQtY2FyZCcsXG4gICAgICB9XG4gICAgICB2YXIgYnJhbmRJY29uRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdicmFuZC1pY29uJyk7XG4gICAgICB2YXIgcGZDbGFzcyA9ICdwZi1jcmVkaXQtY2FyZCc7XG4gICAgICBpZiAoYnJhbmQgaW4gY2FyZEJyYW5kVG9QZkNsYXNzKSB7XG4gICAgICAgIHBmQ2xhc3MgPSBjYXJkQnJhbmRUb1BmQ2xhc3NbYnJhbmRdO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIgaSA9IGJyYW5kSWNvbkVsZW1lbnQuY2xhc3NMaXN0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIGJyYW5kSWNvbkVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShicmFuZEljb25FbGVtZW50LmNsYXNzTGlzdFtpXSk7XG4gICAgICB9XG4gICAgICBicmFuZEljb25FbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3BmJyk7XG4gICAgICBicmFuZEljb25FbGVtZW50LmNsYXNzTGlzdC5hZGQocGZDbGFzcyk7XG4gICAgfSxcblxuICAgIGFjaEZpZWxkczogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgaWYgKG9wdGlvbnMucGxhaWRfZW52ICE9ICcnICYmIG9wdGlvbnMua2V5ICE9ICcnICYmIHR5cGVvZiBQbGFpZCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdmFyIGxpbmtIYW5kbGVyID0gUGxhaWQuY3JlYXRlKHtcbiAgICAgICAgICBzZWxlY3RBY2NvdW50OiB0cnVlLFxuICAgICAgICAgIGFwaVZlcnNpb246ICd2MicsXG4gICAgICAgICAgZW52OiBvcHRpb25zLnBsYWlkX2VudixcbiAgICAgICAgICBjbGllbnROYW1lOiAnTWlublBvc3QnLFxuICAgICAgICAgIGtleTogb3B0aW9ucy5wbGFpZF9wdWJsaWNfa2V5LFxuICAgICAgICAgIHByb2R1Y3Q6ICdhdXRoJyxcbiAgICAgICAgICBvbkxvYWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy8gVGhlIExpbmsgbW9kdWxlIGZpbmlzaGVkIGxvYWRpbmcuXG4gICAgICAgICAgfSxcbiAgICAgICAgICBvblN1Y2Nlc3M6IGZ1bmN0aW9uKHB1YmxpY190b2tlbiwgbWV0YWRhdGEpIHtcbiAgICAgICAgICAgIC8vIFRoZSBvblN1Y2Nlc3MgZnVuY3Rpb24gaXMgY2FsbGVkIHdoZW4gdGhlIHVzZXIgaGFzIHN1Y2Nlc3NmdWxseVxuICAgICAgICAgICAgLy8gYXV0aGVudGljYXRlZCBhbmQgc2VsZWN0ZWQgYW4gYWNjb3VudCB0byB1c2UuXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gV2hlbiBjYWxsZWQsIHlvdSB3aWxsIHNlbmQgdGhlIHB1YmxpY190b2tlbiBhbmQgdGhlIHNlbGVjdGVkXG4gICAgICAgICAgICAvLyBhY2NvdW50IElELCBtZXRhZGF0YS5hY2NvdW50X2lkLCB0byB5b3VyIGJhY2tlbmQgYXBwIHNlcnZlci5cbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyBzZW5kRGF0YVRvQmFja2VuZFNlcnZlcih7XG4gICAgICAgICAgICAvLyAgIHB1YmxpY190b2tlbjogcHVibGljX3Rva2VuLFxuICAgICAgICAgICAgLy8gICBhY2NvdW50X2lkOiBtZXRhZGF0YS5hY2NvdW50X2lkXG4gICAgICAgICAgICAvLyB9KTtcblxuICAgICAgICAgICAgLy90aGlzLmRlYnVnKCdQdWJsaWMgVG9rZW46ICcgKyBwdWJsaWNfdG9rZW4pO1xuICAgICAgICAgICAgLy90aGlzLmRlYnVnKCdDdXN0b21lci1zZWxlY3RlZCBhY2NvdW50IElEOiAnICsgbWV0YWRhdGEuYWNjb3VudF9pZCk7XG5cbiAgICAgICAgICAgIHZhciBzdXBwb3J0Zm9ybSA9ICQob3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3Rvcik7XG5cbiAgICAgICAgICAgIC8vIHJlc3BvbnNlIGNvbnRhaW5zIGlkIGFuZCBjYXJkLCB3aGljaCBjb250YWlucyBhZGRpdGlvbmFsIGNhcmQgZGV0YWlsc1xuICAgICAgICAgICAgLy8gSW5zZXJ0IHRoZSBkYXRhIGludG8gdGhlIGZvcm0gc28gaXQgZ2V0cyBzdWJtaXR0ZWQgdG8gdGhlIHNlcnZlclxuICAgICAgICAgICAgc3VwcG9ydGZvcm0uYXBwZW5kKCQoJzxpbnB1dCB0eXBlPVxcXCJoaWRkZW5cXFwiIG5hbWU9XFxcInB1YmxpY190b2tlblxcXCIgLz4nKS52YWwocHVibGljX3Rva2VuKSk7XG4gICAgICAgICAgICBzdXBwb3J0Zm9ybS5hcHBlbmQoJCgnPGlucHV0IHR5cGU9XFxcImhpZGRlblxcXCIgbmFtZT1cXFwiYWNjb3VudF9pZFxcXCIgLz4nKS52YWwobWV0YWRhdGEuYWNjb3VudF9pZCkpO1xuXG4gICAgICAgICAgICAvLyBnZXQgdGhlIGFjY291bnQgdmFsaWRhdGVkIGJ5IGFqYXhcbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgIHVybDonL3BsYWlkX3Rva2VuLycsXG4gICAgICAgICAgICAgIC8vY2FjaGU6IGZhbHNlLFxuICAgICAgICAgICAgICBkYXRhOiAkKHN1cHBvcnRmb3JtKS5zZXJpYWxpemUoKSxcbiAgICAgICAgICAgICAgdHlwZTogJ1BPU1QnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZXNwb25zZS5lcnJvciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAvLyB0aGVyZSBpcyBhbiBlcnJvci5cbiAgICAgICAgICAgICAgICAkKG9wdGlvbnMucGxhaWRfbGluaykucGFyZW50KCkuYWZ0ZXIoJzxwIGNsYXNzPVwiZXJyb3JcIj4nICsgcmVzcG9uc2UuZXJyb3IgKyAnPC9wPicpXG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy90aGlzLmRlYnVnKCdwcmludCByZXNwb25zZSBoZXJlJyk7XG4gICAgICAgICAgICAgICAgLy90aGlzLmRlYnVnKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAkKG9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLnByZXBlbmQoJzxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgaWQ9XCJiYW5rVG9rZW5cIiBuYW1lPVwiYmFua1Rva2VuXCIgdmFsdWU9XCInICsgcmVzcG9uc2Uuc3RyaXBlX2JhbmtfYWNjb3VudF90b2tlbiArICdcIiAvPicpO1xuICAgICAgICAgICAgICAgICQob3B0aW9ucy5wbGFpZF9saW5rLCBlbGVtZW50KS5odG1sKCc8c3Ryb25nPllvdXIgYWNjb3VudCB3YXMgc3VjY2Vzc2Z1bGx5IGF1dGhvcml6ZWQ8L3N0cm9uZz4nKS5jb250ZW50cygpLnVud3JhcCgpO1xuICAgICAgICAgICAgICAgIHRoYXQuY2FsY3VsYXRlRmVlcyh0aGF0Lm9wdGlvbnMub3JpZ2luYWxfYW1vdW50LCAnYWNoJyk7IC8vIGNhbGN1bGF0ZSB0aGUgYWNoIGZlZXNcbiAgICAgICAgICAgICAgICAvLyBhZGQgdGhlIGZpZWxkKHMpIHdlIG5lZWQgdG8gdGhlIGZvcm0gZm9yIHN1Ym1pdHRpbmdcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5lcnJvcihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAkKG9wdGlvbnMucGxhaWRfbGluaykucGFyZW50KCkuYWZ0ZXIoJzxwIGNsYXNzPVwiZXJyb3JcIj4nICsgcmVzcG9uc2UuZXJyb3IgKyAnPC9wPicpXG4gICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICBcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9uRXhpdDogZnVuY3Rpb24oZXJyLCBtZXRhZGF0YSkge1xuICAgICAgICAgICAgLy8gVGhlIHVzZXIgZXhpdGVkIHRoZSBMaW5rIGZsb3cuXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICAgICQob3B0aW9ucy5wbGFpZF9saW5rLCBlbGVtZW50KS5jbGljayhmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgJChvcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yICsgJyAuZXJyb3InKS5yZW1vdmUoKTsgLy8gcmVtb3ZlIG1ldGhvZCBlcnJvciBtZXNzYWdlIGlmIGl0IGlzIHRoZXJlXG4gICAgICAgICAgbGlua0hhbmRsZXIub3BlbigpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LCAvLyBhY2hGaWVsZHNcblxuICAgIGhhc0h0bWw1VmFsaWRhdGlvbjogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgLy90aGlzLmRlYnVnKCd2YWx1ZSBpcyAnICsgdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykuY2hlY2tWYWxpZGl0eSA9PT0gJ2Z1bmN0aW9uJyk7XG4gICAgICByZXR1cm4gdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykuY2hlY2tWYWxpZGl0eSA9PT0gJ2Z1bmN0aW9uJztcbiAgICB9LFxuXG4gICAgYnV0dG9uU3RhdHVzOiBmdW5jdGlvbihvcHRpb25zLCBidXR0b24sIGRpc2FibGVkKSB7XG4gICAgICBidXR0b24ucHJvcCgnZGlzYWJsZWQnLCBkaXNhYmxlZCk7XG4gICAgICBpZiAoZGlzYWJsZWQgPT09IGZhbHNlKSB7XG4gICAgICAgIGJ1dHRvbi50ZXh0KG9wdGlvbnMuYnV0dG9uX3RleHQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnV0dG9uLnRleHQoJ1Byb2Nlc3NpbmcnKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdmFsaWRhdGVBbmRTdWJtaXQ6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICQob3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3Rvcikuc3VibWl0KGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgLy8gZG8gc29tZSBmYWxsYmFjayBzdHVmZiBmb3Igbm9uLWh0bWw1IGJyb3dzZXJzXG4gICAgICAgIGlmICh0aGF0Lmhhc0h0bWw1VmFsaWRhdGlvbihlbGVtZW50LCBvcHRpb25zKSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmNoZWNrVmFsaWRpdHkoKSkge1xuICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpbnZhbGlkJyk7XG4gICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICBzY3JvbGxUb3A6ICQodGhpcykuZmluZCgnaW5wdXQ6aW52YWxpZCcpLnBhcmVudCgpLm9mZnNldCgpLnRvcFxuICAgICAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgICAgICAgLy90aGlzLmRlYnVnKCd0b3AgaXMgJyArICk7XG4gICAgICAgICAgICAgICQodGhpcykuZmluZCgnaW5wdXQ6aW52YWxpZCcpLnBhcmVudCgpLmFkZENsYXNzKCdlcnJvcicpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaW52YWxpZCcpO1xuICAgICAgICAgICAgICAkKHRoaXMpLmZpbmQoJ2lucHV0OmludmFsaWQnKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnZXJyb3InKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHZhbGlkYXRlIGFuZCBzdWJtaXQgdGhlIGZvcm1cbiAgICAgICAgJCgnLmNoZWNrLWZpZWxkJykucmVtb3ZlKCk7XG4gICAgICAgICQoJ2lucHV0LCBsYWJlbCcsIGVsZW1lbnQpLnJlbW92ZUNsYXNzKCdlcnJvcicpO1xuICAgICAgICB2YXIgdmFsaWQgPSB0cnVlO1xuICAgICAgICB2YXIgcGF5bWVudF9tZXRob2QgPSAnY2FyZCc7XG4gICAgICAgIGlmICgkKG9wdGlvbnMuY2hvb3NlX3BheW1lbnQpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBwYXltZW50X21ldGhvZCA9ICQob3B0aW9ucy5jaG9vc2VfcGF5bWVudCArICcgaW5wdXQ6Y2hlY2tlZCcpLnZhbCgpO1xuICAgICAgICB9XG4gICAgICAgICQob3B0aW9ucy5jaG9vc2VfcGF5bWVudCArICcgaW5wdXQnKS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJChvcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yICsgJyAuZXJyb3InKS5yZW1vdmUoKTsgLy8gcmVtb3ZlIG1ldGhvZCBlcnJvciBtZXNzYWdlIGlmIGl0IGlzIHRoZXJlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChwYXltZW50X21ldGhvZCA9PT0gJ2FjaCcpIHtcbiAgICAgICAgICBpZiAoJCgnaW5wdXRbbmFtZT1cImJhbmtUb2tlblwiXScpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICQob3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvcikucHJlcGVuZCgnPHAgY2xhc3M9XCJlcnJvclwiPllvdSBhcmUgcmVxdWlyZWQgdG8gZW50ZXIgY3JlZGl0IGNhcmQgaW5mb3JtYXRpb24sIG9yIHRvIGF1dGhvcml6ZSBNaW5uUG9zdCB0byBjaGFyZ2UgeW91ciBiYW5rIGFjY291bnQsIHRvIG1ha2UgYSBwYXltZW50LjwvcD4nKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsaWQgPT09IHRydWUpIHtcbiAgICAgICAgICAvLyAxLiBwcm9jZXNzIGRvbmF0aW9uIHRvIHN0cmlwZVxuICAgICAgICAgIHRoYXQuYnV0dG9uU3RhdHVzKG9wdGlvbnMsICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKSwgdHJ1ZSk7XG5cbiAgICAgICAgICB2YXIgZnVsbF9uYW1lID0gJyc7XG4gICAgICAgICAgaWYgKCQoJyNmdWxsX25hbWUnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBmdWxsX25hbWUgPSAkKCcjZnVsbF9uYW1lJykudmFsKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZ1bGxfbmFtZSA9ICQoJyNmaXJzdF9uYW1lJykudmFsKCkgKyAnICcgKyAkKCcjbGFzdF9uYW1lJykudmFsKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIHN0cmVldCA9ICdOb25lJztcbiAgICAgICAgICBpZiAoJCgnaW5wdXRbbmFtZT1cImZ1bGxfYWRkcmVzc1wiXScpLnZhbCgpICE9ICcnKSB7XG4gICAgICAgICAgICBzdHJlZXQgPSAkKCcjZnVsbF9hZGRyZXNzJykudmFsKCk7XG4gICAgICAgICAgICBpZiAoJCgnaW5wdXRbbmFtZT1cImJpbGxpbmdfc3RyZWV0XCJdJykudmFsKCkgIT0gJycpIHtcbiAgICAgICAgICAgICAgc3RyZWV0ID0gJCgnaW5wdXRbbmFtZT1cImJpbGxpbmdfc3RyZWV0XCJdJykudmFsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIGNpdHkgPSAnTm9uZSc7XG4gICAgICAgICAgaWYgKCQoJ2lucHV0W25hbWU9XCJiaWxsaW5nX2NpdHlcIl0nKS52YWwoKSAhPSAnJykge1xuICAgICAgICAgICAgY2l0eSA9ICQoJ2lucHV0W25hbWU9XCJiaWxsaW5nX2NpdHlcIl0nKS52YWwoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgc3RhdGUgPSAnTm9uZSc7XG4gICAgICAgICAgaWYgKCQoJ2lucHV0W25hbWU9XCJiaWxsaW5nX3N0YXRlXCJdJykudmFsKCkgIT0gJycpIHtcbiAgICAgICAgICAgIHN0YXRlID0gJCgnaW5wdXRbbmFtZT1cImJpbGxpbmdfc3RhdGVcIl0nKS52YWwoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgemlwID0gJ05vbmUnO1xuICAgICAgICAgIGlmICgkKCdpbnB1dFtuYW1lPVwiYmlsbGluZ196aXBcIl0nKS52YWwoKSAhPSAnJykge1xuICAgICAgICAgICAgemlwID0gJCgnaW5wdXRbbmFtZT1cImJpbGxpbmdfemlwXCJdJykudmFsKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIGNvdW50cnkgPSAnVVMnO1xuICAgICAgICAgIGlmICgkKCdpbnB1dFtuYW1lPVwiYmlsbGluZ19jb3VudHJ5XCJdJykudmFsKCkgIT0gJycpIHtcbiAgICAgICAgICAgIGNvdW50cnkgPSAkKCdpbnB1dFtuYW1lPVwiYmlsbGluZ19jb3VudHJ5XCJdJykudmFsKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gMi4gY3JlYXRlIG1pbm5wb3N0IGFjY291bnQgaWYgc3BlY2lmaWVkXG4gICAgICAgICAgaWYgKG9wdGlvbnMuY3JlYXRlX2FjY291bnQgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHZhciB1c2VyID0ge1xuICAgICAgICAgICAgICBlbWFpbDogJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICAgICAgZmlyc3RfbmFtZTogJChvcHRpb25zLmZpcnN0X25hbWVfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgICAgICBsYXN0X25hbWU6ICQob3B0aW9ucy5sYXN0X25hbWVfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgICAgICBwYXNzd29yZDogJChvcHRpb25zLnBhc3N3b3JkX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICAgICAgY2l0eTogJChvcHRpb25zLmFjY291bnRfY2l0eV9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgICAgIHN0YXRlOiAkKG9wdGlvbnMuYWNjb3VudF9zdGF0ZV9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgICAgIHppcDogJChvcHRpb25zLmFjY291bnRfemlwX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgdXJsOiBvcHRpb25zLm1pbm5wb3N0X3Jvb3QgKyAnL3dwLWpzb24vdXNlci1hY2NvdW50LW1hbmFnZW1lbnQvdjEvY3JlYXRlLXVzZXInLFxuICAgICAgICAgICAgICBkYXRhOiB1c2VyXG4gICAgICAgICAgICB9KS5kb25lKGZ1bmN0aW9uKCBkYXRhICkge1xuICAgICAgICAgICAgICBpZiAoZGF0YS5zdGF0dXMgPT09ICdzdWNjZXNzJyAmJiBkYXRhLnJlYXNvbiA9PT0gJ25ldyB1c2VyJykge1xuICAgICAgICAgICAgICAgIC8vIHVzZXIgY3JlYXRlZCAtIHRoZXkgc2hvdWxkIHJlY2VpdmUgZW1haWxcbiAgICAgICAgICAgICAgICAvLyBzdWJtaXQgdGhlIGZvcm1cbiAgICAgICAgICAgICAgICAvL3N1cHBvcnRmb3JtLmdldCgwKS5zdWJtaXQoKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyB1c2VyIG5vdCBjcmVhdGVkXG4gICAgICAgICAgICAgICAgLy8gc3RpbGwgc3VibWl0IHRoZSBmb3JtXG4gICAgICAgICAgICAgICAgLy9zdXBwb3J0Zm9ybS5nZXQoMCkuc3VibWl0KCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICgkKCdpbnB1dFtuYW1lPVwiYmFua1Rva2VuXCJdJykubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgIC8vIGZpbmFsbHksIGdldCBhIHRva2VuIGZyb20gc3RyaXBlLCBhbmQgdHJ5IHRvIGNoYXJnZSBpdCBpZiBpdCBpcyBub3QgYWNoXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZVRva2VuKHRoYXQuY2FyZE51bWJlckVsZW1lbnQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBpZiBpdCBpcyBhY2gsIHdlIGFscmVhZHkgaGF2ZSBhIHRva2VuIHNvIHBhc3MgaXQgdG8gc3RyaXBlLlxuICAgICAgICAgICAgdGhhdC5zdHJpcGVUb2tlbkhhbmRsZXIoICQoJyNiYW5rVG9rZW4nKS52YWwoKSwgJ2FjaCcgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gdGhpcyBtZWFucyB2YWxpZCBpcyBmYWxzZVxuICAgICAgICAgIHRoYXQuYnV0dG9uU3RhdHVzKG9wdGlvbnMsICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKSwgZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgIH0pO1xuICAgIH0sIC8vIHZhbGlkYXRlQW5kU3VibWl0XG5cbiAgICBzdHJpcGVFcnJvckRpc3BsYXk6IGZ1bmN0aW9uKGV2ZW50LCB0aGlzX3NlbGVjdG9yLCBlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICAvLyBsaXN0ZW4gZm9yIGVycm9ycyBhbmQgZGlzcGxheS9oaWRlIGVycm9yIG1lc3NhZ2VzXG4gICAgICB2YXIgd2hpY2hfZXJyb3IgPSB0aGlzX3NlbGVjdG9yLmF0dHIoJ2lkJyk7XG4gICAgICBpZiAoZXZlbnQuZXJyb3IpIHtcbiAgICAgICAgJCgnLmNhcmQtaW5zdHJ1Y3Rpb24uJyArIHdoaWNoX2Vycm9yKS50ZXh0KGV2ZW50LmVycm9yLm1lc3NhZ2UgKyAnIFBsZWFzZSB0cnkgYWdhaW4uJyk7XG4gICAgICAgICQoJy5jYXJkLWluc3RydWN0aW9uLicgKyB3aGljaF9lcnJvcikuYWRkQ2xhc3MoJ2ludmFsaWQnKTtcbiAgICAgICAgdGhpc19zZWxlY3Rvci5wYXJlbnQoKS5hZGRDbGFzcygnZXJyb3InKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQoJy5jYXJkLWluc3RydWN0aW9uLicgKyB3aGljaF9lcnJvcikucmVtb3ZlQ2xhc3MoJ2ludmFsaWQnKTtcbiAgICAgICAgJCgnLmNhcmQtaW5zdHJ1Y3Rpb24uJyArIHdoaWNoX2Vycm9yKS5lbXB0eSgpO1xuICAgICAgICAkKG9wdGlvbnMuY2NfbnVtX3NlbGVjdG9yLCBlbGVtZW50KS5yZW1vdmVDbGFzcygnZXJyb3InKTtcbiAgICAgICAgJChvcHRpb25zLmNjX2V4cF9zZWxlY3RvciwgZWxlbWVudCkucmVtb3ZlQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICQob3B0aW9ucy5jY19jdnZfc2VsZWN0b3IsIGVsZW1lbnQpLnJlbW92ZUNsYXNzKCdlcnJvcicpO1xuICAgICAgICAkKG9wdGlvbnMuY2NfbnVtX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnZXJyb3InKTtcbiAgICAgICAgJChvcHRpb25zLmNjX2V4cF9zZWxlY3RvciwgZWxlbWVudCkucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICQob3B0aW9ucy5jY19jdnZfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdlcnJvcicpO1xuICAgICAgfVxuICAgIH0sIC8vIHN0cmlwZUVycm9yRGlzcGxheVxuXG4gICAgY3JlYXRlVG9rZW46IGZ1bmN0aW9uKGNhcmQpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHRoYXQuc3RyaXBlLmNyZWF0ZVRva2VuKGNhcmQpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgIGlmIChyZXN1bHQuZXJyb3IpIHtcbiAgICAgICAgICAvLyBTaG93IHRoZSBlcnJvcnMgb24gdGhlIGZvcm1cbiAgICAgICAgICB0aGF0LmJ1dHRvblN0YXR1cyhvcHRpb25zLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIGZhbHNlKTtcbiAgICAgICAgICB2YXIgZmllbGQgPSByZXN1bHQuZXJyb3IuZmllbGQgKyAnX2ZpZWxkX3NlbGVjdG9yJztcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9ICcnO1xuICAgICAgICAgIGlmICh0eXBlb2YgcmVzdWx0LmVycm9yLm1lc3NhZ2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBtZXNzYWdlID0gcmVzdWx0LmVycm9yLm1lc3NhZ2U7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1lc3NhZ2UgPSByZXN1bHQuZXJyb3IubWVzc2FnZVswXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCQoZmllbGQpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICQodGhhdC5vcHRpb25zW2ZpZWxkXSwgZWxlbWVudCkuYWRkQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICAgICAkKHRoYXQub3B0aW9uc1tmaWVsZF0sIGVsZW1lbnQpLnByZXYoKS5hZGRDbGFzcygnZXJyb3InKTtcbiAgICAgICAgICAgICQodGhhdC5vcHRpb25zW2ZpZWxkXSwgZWxlbWVudCkuYWZ0ZXIoJzxzcGFuIGNsYXNzPVwiY2hlY2stZmllbGQgaW52YWxpZFwiPicgKyBtZXNzYWdlICsgJzwvc3Bhbj4nKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAocmVzdWx0LmVycm9yLmZpZWxkID09ICdjc3JmX3Rva2VuJykge1xuICAgICAgICAgICAgJCgnYnV0dG9uLmdpdmUnKS5iZWZvcmUoJzxwIGNsYXNzPVwiZXJyb3JcIj5Tb3JyeSwgdGhpcyBmb3JtIGhhZCBhIGJhY2stZW5kIGVycm9yIGFuZCB3YXMgdW5hYmxlIHRvIGNvbXBsZXRlIHlvdXIgZG9uYXRpb24uIFBsZWFzZSA8YSBocmVmPVwiI1wiIG9uY2xpY2s9XCJsb2NhdGlvbi5yZWxvYWQoKTsgcmV0dXJuIGZhbHNlO1wiPnJlbG9hZCB0aGUgcGFnZTwvYT4gYW5kIHRyeSBhZ2FpbiAod2Ugd2lsbCBwcmVzZXJ2ZSBhcyBtdWNoIG9mIHlvdXIgaW5mb3JtYXRpb24gYXMgcG9zc2libGUpLjwvcD4nKVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBTZW5kIHRoZSB0b2tlbiB0byB5b3VyIHNlcnZlclxuICAgICAgICAgIHRoYXQuc3RyaXBlVG9rZW5IYW5kbGVyKHJlc3VsdC50b2tlbiwgJ2NhcmQnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSwgLy8gY3JlYXRlVG9rZW5cblxuICAgIHN0cmlwZVRva2VuSGFuZGxlcjogZnVuY3Rpb24odG9rZW4sIHR5cGUpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIC8vIEluc2VydCB0aGUgdG9rZW4gSUQgaW50byB0aGUgZm9ybSBzbyBpdCBnZXRzIHN1Ym1pdHRlZCB0byB0aGUgc2VydmVyXG4gICAgICB2YXIgc3VwcG9ydGZvcm0gPSAkKHRoaXMub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3Rvcik7XG4gICAgICBpZiAoIHR5cGUgPT09ICdjYXJkJyApIHtcbiAgICAgICAgc3VwcG9ydGZvcm0uYXBwZW5kKCQoJzxpbnB1dCB0eXBlPVxcXCJoaWRkZW5cXFwiIG5hbWU9XFxcInN0cmlwZVRva2VuXFxcIj4nKS52YWwodG9rZW4uaWQpKTtcbiAgICAgICAgaWYgKCQoJ2lucHV0W25hbWU9XCJwYXltZW50X3R5cGVcIl0nKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgJCgnaW5wdXRbbmFtZT1cInBheW1lbnRfdHlwZVwiXScpLnZhbCh0b2tlbi5jYXJkLmJyYW5kKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdXBwb3J0Zm9ybS5hcHBlbmQoJCgnPGlucHV0IHR5cGU9XFxcImhpZGRlblxcXCIgbmFtZT1cXFwicGF5bWVudF90eXBlXFxcIiAvPicpLnZhbCh0b2tlbi5jYXJkLmJyYW5kKSk7ICBcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICggdHlwZSA9PT0gJ2FjaCcgKSB7XG4gICAgICAgIGlmICgkKCdpbnB1dFtuYW1lPVwicGF5bWVudF90eXBlXCJdJykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICQoJ2lucHV0W25hbWU9XCJwYXltZW50X3R5cGVcIl0nKS52YWwodHlwZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3VwcG9ydGZvcm0uYXBwZW5kKCQoJzxpbnB1dCB0eXBlPVxcXCJoaWRkZW5cXFwiIG5hbWU9XFxcInBheW1lbnRfdHlwZVxcXCIgLz4nKS52YWwodHlwZSkpOyAgXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gU3VibWl0IHRoZSBmb3JtXG4gICAgICAvL3N1cHBvcnRmb3JtLnN1Ym1pdCgpO1xuICAgICAgJC5hamF4KHtcbiAgICAgICAgdXJsOicvY2hhcmdlX2FqYXgvJyxcbiAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICBkYXRhOiAkKHN1cHBvcnRmb3JtKS5zZXJpYWxpemUoKSxcbiAgICAgICAgdHlwZTogJ1BPU1QnXG4gICAgICB9KVxuICAgICAgLmRvbmUoZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKHR5cGVvZiByZXNwb25zZS5lcnJvcnMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgLy8gZG8gbm90IHN1Ym1pdC4gdGhlcmUgaXMgYW4gZXJyb3IuXG4gICAgICAgICAgdGhhdC5idXR0b25TdGF0dXModGhhdC5vcHRpb25zLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIGZhbHNlKTtcbiAgICAgICAgICAvLyBhZGQgc29tZSBlcnJvciBtZXNzYWdlcyBhbmQgc3R5bGVzXG4gICAgICAgICAgJC5lYWNoKHJlc3BvbnNlLmVycm9ycywgZnVuY3Rpb24oIGluZGV4LCBlcnJvciApIHtcbiAgICAgICAgICAgIHZhciBmaWVsZCA9IGVycm9yLmZpZWxkICsgJ19maWVsZF9zZWxlY3Rvcic7XG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9ICcnO1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBlcnJvci5tZXNzYWdlID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICBtZXNzYWdlID0gZXJyb3IubWVzc2FnZTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIG1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlWzBdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCQoZmllbGQpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgJChvcHRpb25zW2ZpZWxkXSkuYWRkQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICAgICAgICQob3B0aW9uc1tmaWVsZF0pLnByZXYoKS5hZGRDbGFzcygnZXJyb3InKTtcbiAgICAgICAgICAgICAgJChvcHRpb25zW2ZpZWxkXSkuYWZ0ZXIoJzxzcGFuIGNsYXNzPVwiY2hlY2stZmllbGQgaW52YWxpZFwiPicgKyBtZXNzYWdlICsgJzwvc3Bhbj4nKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBlcnJvciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgaWYgKGVycm9yLmNvZGUgPT0gJ2ludmFsaWRfbnVtYmVyJyB8fCBlcnJvci5jb2RlID09ICdpbmNvcnJlY3RfbnVtYmVyJyB8fCBlcnJvci5jb2RlID09ICdjYXJkX2RlY2xpbmVkJyB8fCBlcnJvci5jb2RlID09ICdwcm9jZXNzaW5nX2Vycm9yJykge1xuICAgICAgICAgICAgICAgIC8vIGVycm9yIGhhbmRsaW5nXG4gICAgICAgICAgICAgICAgdGhhdC5zdHJpcGVFcnJvckRpc3BsYXkocmVzcG9uc2UuZXJyb3JzLCAkKHRoYXQub3B0aW9ucy5jY19udW1fc2VsZWN0b3IpLCB0aGF0LmVsZW1lbnQsIHRoYXQub3B0aW9ucyApO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKGVycm9yLmNvZGUgPT0gJ2ludmFsaWRfZXhwaXJ5X21vbnRoJyB8fCBlcnJvci5jb2RlID09ICdpbnZhbGlkX2V4cGlyeV95ZWFyJyB8fCBlcnJvci5jb2RlID09ICdleHBpcmVkX2NhcmQnKSB7XG4gICAgICAgICAgICAgICAgLy8gZXJyb3IgaGFuZGxpbmdcbiAgICAgICAgICAgICAgICB0aGF0LnN0cmlwZUVycm9yRGlzcGxheShyZXNwb25zZS5lcnJvcnMsICQodGhhdC5vcHRpb25zLmNjX2V4cF9zZWxlY3RvciksIHRoYXQuZWxlbWVudCwgdGhhdC5vcHRpb25zICk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAoZXJyb3IuY29kZSA9PSAnaW52YWxpZF9jdmMnIHx8IGVycm9yLmNvZGUgPT0gJ2luY29ycmVjdF9jdmMnKSB7XG4gICAgICAgICAgICAgICAgLy8gZXJyb3IgaGFuZGxpbmdcbiAgICAgICAgICAgICAgICB0aGF0LnN0cmlwZUVycm9yRGlzcGxheShyZXNwb25zZS5lcnJvcnMsICQodGhhdC5vcHRpb25zLmNjX2N2dl9zZWxlY3RvciksIHRoYXQuZWxlbWVudCwgdGhhdC5vcHRpb25zICk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAoZXJyb3IudHlwZSA9PSAnaW52YWxpZF9yZXF1ZXN0X2Vycm9yJykge1xuICAgICAgICAgICAgICAgICQoJ2J1dHRvbi5naXZlJykuYmVmb3JlKCc8cCBjbGFzcz1cImVycm9yXCI+JyArIGVycm9yLm1lc3NhZ2UgKyAnPC9wPicpXG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIHJlc3BvbnNlLmVycm9yc1swXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgdmFyIGZpZWxkID0gcmVzcG9uc2UuZXJyb3JzWzBdLmZpZWxkICsgJ19maWVsZF9zZWxlY3Rvcic7XG4gICAgICAgICAgICAgIGlmICgkKGZpZWxkKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9wOiAkKG9wdGlvbnNbZmllbGRdKS5wYXJlbnQoKS5vZmZzZXQoKS50b3BcbiAgICAgICAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3VwcG9ydGZvcm0uZ2V0KDApLnN1Ym1pdCgpOyAvLyBjb250aW51ZSBzdWJtaXR0aW5nIHRoZSBmb3JtXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAuZXJyb3IoZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgdGhhdC5idXR0b25TdGF0dXModGhhdC5vcHRpb25zLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIGZhbHNlKTtcbiAgICAgIH0pO1xuXG4gICAgfSxcblxuICAgIHNob3dOZXdzbGV0dGVyU2V0dGluZ3M6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIGlmICgkKG9wdGlvbnMubmV3c2xldHRlcl9ncm91cF9zZWxlY3RvcikubGVuZ3RoID4gMCAmJiB0eXBlb2YgJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdmFyIGdldF9kYXRhID0ge1xuICAgICAgICAgIGVtYWlsOiAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpXG4gICAgICAgIH07XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICB1cmw6IG9wdGlvbnMubWlubnBvc3Rfcm9vdCArICcvd3AtanNvbi9taW5ucG9zdC1hcGkvdjIvbWFpbGNoaW1wL3VzZXInLFxuICAgICAgICAgIGRhdGE6IGdldF9kYXRhXG4gICAgICAgIH0pLmRvbmUoZnVuY3Rpb24oIHJlc3VsdCApIHtcbiAgICAgICAgICBpZiAoIHR5cGVvZiByZXN1bHQuc3RhdHVzICE9PSAndW5kZWZpbmVkJyApIHtcbiAgICAgICAgICAgICQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkuYWZ0ZXIoJzxpbnB1dCBuYW1lPVwibWFpbGNoaW1wX3N0YXR1c1wiIHR5cGU9XCJoaWRkZW5cIiB2YWx1ZT1cIicgKyByZXN1bHQuc3RhdHVzICsgJ1wiPicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIHR5cGVvZiByZXN1bHQubWFpbGNoaW1wX2lkICE9PSAndW5kZWZpbmVkJyApIHtcbiAgICAgICAgICAgICQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkuYWZ0ZXIoJzxpbnB1dCBuYW1lPVwibWFpbGNoaW1wX3VzZXJfaWRcIiB0eXBlPVwiaGlkZGVuXCIgdmFsdWU9XCInICsgcmVzdWx0Lm1haWxjaGltcF9pZCArICdcIj4nKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHJlc3VsdC5zdGF0dXMgPT09ICdzdWJzY3JpYmVkJykge1xuICAgICAgICAgICAgLy8gdXNlciBjcmVhdGVkIC0gc2hvdyBhIHN1Y2Nlc3MgbWVzc2FnZVxuICAgICAgICAgICAgJCgnLmNvbmZpcm0taW5zdHJ1Y3Rpb25zJykudGV4dCgkKCcuY29uZmlybS1pbnN0cnVjdGlvbnMnKS5hdHRyKCdkYXRhLWtub3duLXVzZXInKSk7XG4gICAgICAgICAgICB2YXIgaW50ZXJlc3RzID0gcmVzdWx0LmludGVyZXN0cztcbiAgICAgICAgICAgICQuZWFjaChpbnRlcmVzdHMsIGZ1bmN0aW9uKCBpbmRleCwgdmFsdWUgKSB7XG4gICAgICAgICAgICAgIGlmICggdmFsdWUgPT09IHRydWUgKSB7XG4gICAgICAgICAgICAgICAgJCgnOmNoZWNrYm94W3ZhbHVlPVwiJyArIGluZGV4ICsgJ1wiXScpLnByb3AoJ2NoZWNrZWQnLHRydWUpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQoJzpjaGVja2JveFt2YWx1ZT1cIicgKyBpbmRleCArICdcIl0nKS5wcm9wKCdjaGVja2VkJyxmYWxzZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICB9LCAvLyBzaG93TmV3c2xldHRlclNldHRpbmdzXG5cbiAgICBjb25maXJtTWVzc2FnZVN1Ym1pdDogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuXG4gICAgICAvL3ZhciBleGlzdGluZ19uZXdzbGV0dGVyX3NldHRpbmdzID0gdGhpcy5vcHRpb25zLmV4aXN0aW5nX25ld3NsZXR0ZXJfc2V0dGluZ3M7XG4gICAgICB2YXIgZXhpc3RpbmdfbmV3c2xldHRlcl9zZXR0aW5ncyA9ICQoJy5zdXBwb3J0LW5ld3NsZXR0ZXIgOmlucHV0Jykuc2VyaWFsaXplKCk7XG4gICAgICAvL3RoaXMuZGVidWcoZXhpc3RpbmdfbmV3c2xldHRlcl9zZXR0aW5ncyk7XG5cbiAgICAgICQob3B0aW9ucy5jb25maXJtX2Zvcm1fc2VsZWN0b3IpLnN1Ym1pdChmdW5jdGlvbihldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIHZhciBjb25maXJtZm9ybSA9ICQob3B0aW9ucy5jb25maXJtX2Zvcm1fc2VsZWN0b3IpO1xuICAgICAgICAvLyBzdWJtaXQgc2V0dGluZ3MgdG8gbWFpbGNoaW1wXG4gICAgICAgIC8vIG5lZWQgdG8gZ2V0IHVzZXIgaW5mbyBvbiBhIGhpZGRlbiBmaWVsZCBoZXJlXG5cbiAgICAgICAgdmFyIG5ld3NsZXR0ZXJfZ3JvdXBzID0gJChvcHRpb25zLm5ld3NsZXR0ZXJfZ3JvdXBfc2VsZWN0b3IgKyAnOmNoZWNrZWQnKTtcbiAgICAgICAgdmFyIG1lc3NhZ2VfZ3JvdXBzID0gJChvcHRpb25zLm1lc3NhZ2VfZ3JvdXBfc2VsZWN0b3IgKyAnOmNoZWNrZWQnKTtcbiAgICAgICAgdmFyIG5ld19uZXdzbGV0dGVyX3NldHRpbmdzID0gJCgnLnN1cHBvcnQtbmV3c2xldHRlciA6aW5wdXQ6Y2hlY2tlZCcpLnNlcmlhbGl6ZSgpO1xuXG4gICAgICAgIGlmICgoZXhpc3RpbmdfbmV3c2xldHRlcl9zZXR0aW5ncyAhPT0gbmV3X25ld3NsZXR0ZXJfc2V0dGluZ3MpICYmICh0eXBlb2YgbmV3c2xldHRlcl9ncm91cHMgIT09ICd1bmRlZmluZWQnIHx8IHR5cGVvZiBtZXNzYWdlX2dyb3VwcyAhPT0gJ3VuZGVmaW5lZCcpKSB7XG4gICAgICAgICAgLy9hZGQgb3VyIG93biBhamF4IGNoZWNrIGFzIFgtUmVxdWVzdGVkLVdpdGggaXMgbm90IGFsd2F5cyByZWxpYWJsZVxuICAgICAgICAgIC8vYWpheF9mb3JtX2RhdGEgPSBuZXdfbmV3c2xldHRlcl9zZXR0aW5ncyArICcmYWpheHJlcXVlc3Q9dHJ1ZSZzdWJzY3JpYmUnO1xuXG4gICAgICAgICAgdmFyIHBvc3RfZGF0YSA9IHtcbiAgICAgICAgICAgIGVtYWlsOiAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgICAgZmlyc3RfbmFtZTogJChvcHRpb25zLmZpcnN0X25hbWVfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgICAgbGFzdF9uYW1lOiAkKG9wdGlvbnMubGFzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICAgIGdyb3Vwc19zdWJtaXR0ZWQ6IHt9XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHBvc3RfZGF0YS5ncm91cHNfYXZhaWxhYmxlID0gJ2FsbCc7XG5cbiAgICAgICAgICBpZiAoICQoJ2lucHV0W25hbWU9XCJtYWlsY2hpbXBfc3RhdHVzXCJdJykubGVuZ3RoID4gMCApIHtcbiAgICAgICAgICAgIHBvc3RfZGF0YS5tYWlsY2hpbXBfc3RhdHVzID0gJCgnaW5wdXRbbmFtZT1cIm1haWxjaGltcF9zdGF0dXNcIl0nKS52YWwoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoICQoJ2lucHV0W25hbWU9XCJtYWlsY2hpbXBfdXNlcl9pZFwiXScpLmxlbmd0aCA+IDAgKSB7XG4gICAgICAgICAgICBwb3N0X2RhdGEubWFpbGNoaW1wX3VzZXJfaWQgPSAkKCdpbnB1dFtuYW1lPVwibWFpbGNoaW1wX3VzZXJfaWRcIl0nKS52YWwoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodHlwZW9mIG5ld3NsZXR0ZXJfZ3JvdXBzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgJC5lYWNoKG5ld3NsZXR0ZXJfZ3JvdXBzLCBmdW5jdGlvbihpbmRleCwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgdmFyIGdyb3VwID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgICAgICAgcG9zdF9kYXRhLmdyb3Vwc19zdWJtaXR0ZWRbaW5kZXhdID0gZ3JvdXA7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodHlwZW9mIG1lc3NhZ2VfZ3JvdXBzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgJC5lYWNoKG1lc3NhZ2VfZ3JvdXBzLCBmdW5jdGlvbihpbmRleCwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgdmFyIGdyb3VwID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgICAgICAgcG9zdF9kYXRhLmdyb3Vwc19zdWJtaXR0ZWRbaW5kZXhdID0gZ3JvdXA7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBvcHRpb25zLm1pbm5wb3N0X3Jvb3QgKyAnL3dwLWpzb24vbWlubnBvc3QtYXBpL3YyL21haWxjaGltcC91c2VyJyxcbiAgICAgICAgICAgIHR5cGU6ICdwb3N0JyxcbiAgICAgICAgICAgIGRhdGFUeXBlIDogJ2pzb24nLFxuICAgICAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04JyxcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHBvc3RfZGF0YSlcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5kb25lKGZ1bmN0aW9uKHJlc3BvbnNlKSB7IC8vIHJlc3BvbnNlIGZyb20gdGhlIFBIUCBhY3Rpb25cbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gJyc7XG4gICAgICAgICAgICBpZiAoIHJlc3BvbnNlLnN1Y2Nlc3MgPT09IHRydWUgKSB7XG4gICAgICAgICAgICAgIC8qc3dpdGNoIChyZXNwb25zZS5kYXRhLnVzZXJfc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnZXhpc3RpbmcnOlxuICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9ICdUaGFua3MgZm9yIHVwZGF0aW5nIHlvdXIgZW1haWwgcHJlZmVyZW5jZXMuIFRoZXkgd2lsbCBnbyBpbnRvIGVmZmVjdCBpbW1lZGlhdGVseS4nO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbmV3JzpcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnV2UgaGF2ZSBhZGRlZCB5b3UgdG8gdGhlIE1pbm5Qb3N0IG1haWxpbmcgbGlzdC4nO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncGVuZGluZyc6XG4gICAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ1dlIGhhdmUgYWRkZWQgeW91IHRvIHRoZSBNaW5uUG9zdCBtYWlsaW5nIGxpc3QuIFlvdSB3aWxsIG5lZWQgdG8gY2xpY2sgdGhlIGNvbmZpcm1hdGlvbiBsaW5rIGluIHRoZSBlbWFpbCB3ZSBzZW50IHRvIGJlZ2luIHJlY2VpdmluZyBtZXNzYWdlcy4nO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH0qL1xuICAgICAgICAgICAgICAvL2NvbmZpcm1mb3JtLmdldCgwKS5zdWJtaXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbmZpcm1mb3JtLmdldCgwKS5zdWJtaXQoKTtcbiAgICAgICAgICAgIC8vJCgnLm0taG9sZC1tZXNzYWdlJykuaHRtbCgnPGRpdiBjbGFzcz1cIm0tZm9ybS1tZXNzYWdlIG0tZm9ybS1tZXNzYWdlLWluZm9cIj4nICsgbWVzc2FnZSArICc8L2Rpdj4nKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAvLyB3ZSBzaG91bGQgcHV0IGFuIGFjdHVhbCBlcnJvciBtZXNzYWdlIGhlcmUgc29tZWRheSwgcHJvYmFibHlcbiAgICAgICAgICAgIC8vJCgnLm0taG9sZC1tZXNzYWdlJykuaHRtbCgnPGRpdiBjbGFzcz1cIm0tZm9ybS1tZXNzYWdlIG0tZm9ybS1tZXNzYWdlLWluZm9cIj5BbiBlcnJvciBoYXMgb2NjdXJlZC4gUGxlYXNlIHRyeSBhZ2Fpbi48L2Rpdj4nKTtcbiAgICAgICAgICAgIGNvbmZpcm1mb3JtLmdldCgwKS5zdWJtaXQoKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICB9IGVsc2UgeyAvLyBlbmQgcGFydCB3aGVyZSBzZXR0aW5ncyBjaGFuZ2VkXG4gICAgICAgICAgY29uZmlybWZvcm0uZ2V0KDApLnN1Ym1pdCgpO1xuICAgICAgICB9XG5cbiAgICAgIH0pO1xuICAgICAgLy9yZXR1cm4gZmFsc2U7XG4gICAgfSwgLy8gY29uZmlybU1lc3NhZ2VTdWJtaXRcblxuICB9OyAvLyBwbHVnaW4ucHJvdG90eXBlXG5cbiAgLy8gQSByZWFsbHkgbGlnaHR3ZWlnaHQgcGx1Z2luIHdyYXBwZXIgYXJvdW5kIHRoZSBjb25zdHJ1Y3RvcixcbiAgLy8gcHJldmVudGluZyBhZ2FpbnN0IG11bHRpcGxlIGluc3RhbnRpYXRpb25zXG4gICQuZm5bcGx1Z2luTmFtZV0gPSBmdW5jdGlvbiAoIG9wdGlvbnMgKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoISQuZGF0YSh0aGlzLCAncGx1Z2luXycgKyBwbHVnaW5OYW1lKSkge1xuICAgICAgICAkLmRhdGEodGhpcywgJ3BsdWdpbl8nICsgcGx1Z2luTmFtZSwgbmV3IFBsdWdpbiggdGhpcywgb3B0aW9ucyApKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxufSkoIGpRdWVyeSwgd2luZG93LCBkb2N1bWVudCApOyJdfQ==
