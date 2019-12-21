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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0cmlwZS5wYXltZW50LmpzIiwibWlubnBvc3QuZ2l2aW5nLmpzIl0sIm5hbWVzIjpbImYiLCJleHBvcnRzIiwibW9kdWxlIiwiZGVmaW5lIiwiYW1kIiwiZyIsIndpbmRvdyIsImdsb2JhbCIsInNlbGYiLCJwYXltZW50IiwianMiLCJlIiwidCIsIm4iLCJyIiwicyIsIm8iLCJ1IiwiYSIsInJlcXVpcmUiLCJpIiwiRXJyb3IiLCJjb2RlIiwibCIsImNhbGwiLCJsZW5ndGgiLCJRSiIsInJyZXR1cm4iLCJydHJpbSIsInNlbGVjdG9yIiwiaXNET01FbGVtZW50IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZWwiLCJub2RlTmFtZSIsInRyaW0iLCJ0ZXh0IiwicmVwbGFjZSIsInZhbCIsInJldCIsImFyZ3VtZW50cyIsInZhbHVlIiwicHJldmVudERlZmF1bHQiLCJldmVudE9iamVjdCIsInJldHVyblZhbHVlIiwibm9ybWFsaXplRXZlbnQiLCJvcmlnaW5hbCIsIndoaWNoIiwidGFyZ2V0Iiwic3JjRWxlbWVudCIsIm9yaWdpbmFsRXZlbnQiLCJkYXRhIiwiZGV0YWlsIiwiY2hhckNvZGUiLCJrZXlDb2RlIiwib24iLCJlbGVtZW50IiwiZXZlbnROYW1lIiwiY2FsbGJhY2siLCJqIiwibGVuIiwibGVuMSIsIm11bHRFdmVudE5hbWUiLCJvcmlnaW5hbENhbGxiYWNrIiwicmVmIiwibWF0Y2giLCJzcGxpdCIsImFkZEV2ZW50TGlzdGVuZXIiLCJhdHRhY2hFdmVudCIsImFkZENsYXNzIiwiY2xhc3NOYW1lIiwicmVzdWx0cyIsInB1c2giLCJjbGFzc0xpc3QiLCJhZGQiLCJoYXNDbGFzcyIsImNvbnRhaW5zIiwiUmVnRXhwIiwidGVzdCIsInJlbW92ZUNsYXNzIiwiY2xzIiwicmVtb3ZlIiwiam9pbiIsInRvZ2dsZUNsYXNzIiwiYm9vbCIsImFwcGVuZCIsInRvQXBwZW5kIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwiZmluZCIsIk5vZGVMaXN0IiwiQXJyYXkiLCJ0cmlnZ2VyIiwibmFtZSIsImVycm9yIiwiZXYiLCJDdXN0b21FdmVudCIsImNyZWF0ZUV2ZW50IiwiaW5pdEN1c3RvbUV2ZW50IiwiaW5pdEV2ZW50IiwiZGlzcGF0Y2hFdmVudCIsIlBheW1lbnQiLCJjYXJkRnJvbU51bWJlciIsImNhcmRGcm9tVHlwZSIsImNhcmRzIiwiZGVmYXVsdEZvcm1hdCIsImZvcm1hdEJhY2tDYXJkTnVtYmVyIiwiZm9ybWF0QmFja0V4cGlyeSIsImZvcm1hdENhcmROdW1iZXIiLCJmb3JtYXRFeHBpcnkiLCJmb3JtYXRGb3J3YXJkRXhwaXJ5IiwiZm9ybWF0Rm9yd2FyZFNsYXNoIiwiZm9ybWF0TW9udGhFeHBpcnkiLCJoYXNUZXh0U2VsZWN0ZWQiLCJsdWhuQ2hlY2siLCJyZUZvcm1hdENhcmROdW1iZXIiLCJyZXN0cmljdENWQyIsInJlc3RyaWN0Q2FyZE51bWJlciIsInJlc3RyaWN0Q29tYmluZWRFeHBpcnkiLCJyZXN0cmljdEV4cGlyeSIsInJlc3RyaWN0TW9udGhFeHBpcnkiLCJyZXN0cmljdE51bWVyaWMiLCJyZXN0cmljdFllYXJFeHBpcnkiLCJzZXRDYXJkVHlwZSIsImluZGV4T2YiLCJpdGVtIiwidHlwZSIsInBhdHRlcm4iLCJmb3JtYXQiLCJjdmNMZW5ndGgiLCJsdWhuIiwibnVtIiwiY2FyZCIsImRpZ2l0IiwiZGlnaXRzIiwib2RkIiwic3VtIiwicmV2ZXJzZSIsInBhcnNlSW50Iiwic2VsZWN0aW9uU3RhcnQiLCJzZWxlY3Rpb25FbmQiLCJzZWxlY3Rpb24iLCJjcmVhdGVSYW5nZSIsInNldFRpbWVvdXQiLCJfdGhpcyIsImZucyIsInJlIiwidXBwZXJMZW5ndGgiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJtZXRhIiwic2xhc2giLCJtZXRhS2V5IiwiaW5wdXQiLCJjdHJsS2V5IiwiYWxsVHlwZXMiLCJjYXJkVHlwZSIsImNhcmRFeHBpcnlWYWwiLCJtb250aCIsInByZWZpeCIsInllYXIiLCJEYXRlIiwiZ2V0RnVsbFllYXIiLCJ0b1N0cmluZyIsInNsaWNlIiwidmFsaWRhdGVDYXJkTnVtYmVyIiwidmFsaWRhdGVDYXJkRXhwaXJ5IiwiY3VycmVudFRpbWUiLCJleHBpcnkiLCJzZXRNb250aCIsImdldE1vbnRoIiwidmFsaWRhdGVDYXJkQ1ZDIiwiY3ZjIiwicmVmMSIsImdyb3VwcyIsImV4ZWMiLCJzaGlmdCIsImZvcm1hdENhcmRDVkMiLCJmb3JtYXRDYXJkRXhwaXJ5IiwiZm9ybWF0Q2FyZEV4cGlyeU11bHRpcGxlIiwiZ2V0Q2FyZEFycmF5Iiwic2V0Q2FyZEFycmF5IiwiY2FyZEFycmF5IiwiYWRkVG9DYXJkQXJyYXkiLCJjYXJkT2JqZWN0IiwicmVtb3ZlRnJvbUNhcmRBcnJheSIsImtleSIsInNwbGljZSIsIiQiLCJ1bmRlZmluZWQiLCJwbHVnaW5OYW1lIiwiZGVmYXVsdHMiLCJQbHVnaW4iLCJvcHRpb25zIiwiZXh0ZW5kIiwiX2RlZmF1bHRzIiwiX25hbWUiLCJpbml0IiwicHJvdG90eXBlIiwicmVzZXQiLCJhbW91bnQiLCJwYXJzZUZsb2F0IiwibGV2ZWxfYW1vdW50X3NlbGVjdG9yIiwib3JpZ2luYWxfYW1vdW50Iiwib3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yIiwiZnJlcXVlbmN5IiwiZnJlcXVlbmN5X3NlbGVjdG9yIiwiYXR0ciIsInJlY3VycmluZyIsInJlY3VycmluZ19zZWxlY3RvciIsImNoYXJBdCIsInRvVXBwZXJDYXNlIiwicHJvY2Vzc2luZ19mZWUiLCJNYXRoIiwicm91bmQiLCJmZWVfYW1vdW50IiwicG93IiwidG9GaXhlZCIsInByb2Nlc3NpbmdfZmVlX3RleHQiLCJ1cHNlbGxfYW1vdW50IiwidXBzZWxsX2Ftb3VudF9zZWxlY3RvciIsInVwc29sZCIsImNyZWF0ZV9hY2NvdW50IiwiYnV0dG9uX3RleHQiLCJzdHJpcGUiLCJTdHJpcGUiLCJzdHJpcGVfcHVibGlzaGFibGVfa2V5IiwiZWxlbWVudHMiLCJyZWZlcnJlciIsInByb3AiLCJkZWJ1ZyIsInF1ZXJ5X3BhbmVsIiwicXMiLCJxdWVyeSIsImFjdGl2ZSIsInBheW1lbnRQYW5lbHMiLCJwYXlfY2NfcHJvY2Vzc2luZ19zZWxlY3RvciIsImNyZWRpdENhcmRQcm9jZXNzaW5nRmVlcyIsImRldGFpbHNfc3RlcF9zZWxlY3RvciIsInJldmlld19zdGVwX3NlbGVjdG9yIiwibGV2ZWwiLCJjaGVja0xldmVsIiwibGV2ZWxudW0iLCJob25vck9yTWVtb3J5Iiwic3dhZyIsInVwc2VsbCIsImRvbmF0ZV9zdGVwX3NlbGVjdG9yIiwiZG9uYXRlQW5vbnltb3VzbHkiLCJvdXRzaWRlVW5pdGVkU3RhdGVzIiwic2hpcHBpbmdBZGRyZXNzIiwiYWxsb3dNaW5ucG9zdEFjY291bnQiLCJjaG9vc2VQYXltZW50TWV0aG9kIiwiY3JlZGl0Q2FyZEZpZWxkcyIsImFjaEZpZWxkcyIsInZhbGlkYXRlQW5kU3VibWl0IiwiY2FsY3VsYXRlZF9hbW91bnRfc2VsZWN0b3IiLCJjYWxjdWxhdGVBbW91bnQiLCJ1c2VfcHJvbW9jb2RlX3NlbGVjdG9yIiwidXNlUHJvbW9Db2RlIiwiY2FsZW5kYXJfYnV0dG9uX3NlbGVjdG9yIiwiYWRkVG9DYWxlbmRhciIsImNvbmZpcm1fc3RlcF9zZWxlY3RvciIsInNob3dOZXdzbGV0dGVyU2V0dGluZ3MiLCJjb25maXJtTWVzc2FnZVN1Ym1pdCIsImIiLCJwIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwibG9jYXRpb24iLCJzZWFyY2giLCJzdWJzdHIiLCJtZXNzYWdlIiwiY29uc29sZSIsImxvZyIsImRpciIsImdldFF1ZXJ5U3RyaW5ncyIsImxpbmsiLCJ0aGF0IiwidXNldGFicyIsInRhYnMiLCJ0aXRsZSIsInBhZ2UiLCJuZXh0Iiwic3RlcCIsImluZGV4IiwibmF2X2l0ZW1fY291bnQiLCJvcHBfaWQiLCJvcHBfaWRfc2VsZWN0b3IiLCJuZXh0X3N0ZXAiLCJwb3N0X3B1cmNoYXNlIiwiY29uZmlybSIsImNvbmZpcm1fYnV0dG9uX3NlbGVjdG9yIiwiYW5hbHl0aWNzVHJhY2tpbmdTdGVwIiwiaGlkZSIsInNob3ciLCJwYXJlbnQiLCJnYSIsInRvTG93ZXJDYXNlIiwicGF0aG5hbWUiLCJjYWxjdWxhdGVGZWVzIiwicGF5bWVudF90eXBlIiwiYWpheCIsIm1ldGhvZCIsInVybCIsImRvbmUiLCJmZWVzIiwiY3JlZGl0Q2FyZEZlZUNoZWNrYm94IiwiZmllbGQiLCJmdWxsX2Ftb3VudCIsImlzIiwiZnVsbF9hbW91bnRfc2VsZWN0b3IiLCJhbm9ueW1vdXNfc2VsZWN0b3IiLCJuYW1lX3NlbGVjdG9yIiwiY2hhbmdlIiwicmV0dXJudmFsdWUiLCJsZXZlbGNsYXNzIiwiYW1vdW50X3llYXJseSIsImVhY2giLCJsZXZlbHMiLCJtYXgiLCJtaW4iLCJsZXZlbF9pbmRpY2F0b3Jfc2VsZWN0b3IiLCJyZXZpZXdfYmVuZWZpdHNfc2VsZWN0b3IiLCJsZXZlbF9uYW1lX3NlbGVjdG9yIiwicmV2aWV3X2xldmVsX2JlbmVmaXRzIiwiYWxsb3dfdXBzZWxsIiwiYW1vdW50X21vbnRobHkiLCJ1cHNlbGxfc2VsZWN0b3IiLCJ1cHNlbGxfYnRuX3NlbGVjdG9yIiwiY2xpY2siLCJldmVudCIsInN0b3BQcm9wYWdhdGlvbiIsImhvbm9yX3NlbGVjdG9yIiwiaG9ub3JfbWVtb3J5X25hbWVfc2VsZWN0b3IiLCJob25vcl9uYW1lX3NlbGVjdG9yIiwibWVtb3J5X3NlbGVjdG9yIiwibWVtb3J5X25hbWVfc2VsZWN0b3IiLCJob25vcl9vcl9tZW1vcnlfY2hvb3NlciIsImN1cnJlbnRsZXZlbCIsInN3YWdfc2VsZWN0b3IiLCJmaWx0ZXIiLCJzZXBhcmF0ZV9zd2FnX3JlZGVlbSIsInN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbiIsInNlcGFyYXRlX3N3YWdfc2VsZWN0b3IiLCJ0b2dnbGUiLCJhdGxhbnRpY19leGlzdGluZyIsImF0bGFudGljX3NlbGVjdG9yIiwiYXRsYW50aWNfc3RhdHVzIiwic3dhZ19kZWNsaW5lX3NlbGVjdG9yIiwic3dhZ19ueXRfc2VsZWN0b3IiLCJtYXhpbXVtX2Nob29zZSIsInN3YWdfc2VsZWN0b3JfY2hvb3NlX211bHRpcGxlIiwiY291bnRfY2hlY2tlZCIsInN3YWdfY2hvb3NlX211bHRpcGxlX25hbWUiLCJzaG93X2JpbGxpbmdfY291bnRyeV9zZWxlY3RvciIsImJpbGxpbmdfY291bnRyeV9zZWxlY3RvciIsInNob3dfc2hpcHBpbmdfY291bnRyeV9zZWxlY3RvciIsInNoaXBwaW5nX2NvdW50cnlfc2VsZWN0b3IiLCJzaG93X3NoaXBwaW5nIiwidXNlX2Zvcl9zaGlwcGluZ19zZWxlY3RvciIsInNoaXBwaW5nX3NlbGVjdG9yIiwiY2hhbmdlZCIsImFjY291bnRfZXhpc3RzIiwiZG9uZVR5cGluZyIsImVtYWlsIiwiZW1haWxfZmllbGRfc2VsZWN0b3IiLCJjaGVja01pbm5wb3N0QWNjb3VudEV4aXN0cyIsInR5cGluZ1RpbWVyIiwiZG9uZVR5cGluZ0ludGVydmFsIiwia2V5dXAiLCJjbGVhclRpbWVvdXQiLCJjcmVhdGVfbXBfc2VsZWN0b3IiLCJwYXNzd29yZF9zZWxlY3RvciIsImJlZm9yZSIsImdldCIsInBvcHVsYXRlQXR0ZW5kZWVzIiwicXVhbnRpdHkiLCJhdHRlbmRlZXMiLCJhdHRlbmRlZSIsImh0bWwiLCJkaXNwbGF5QW1vdW50Iiwic2luZ2xlX3VuaXRfcHJpY2UiLCJhZGRpdGlvbmFsX2Ftb3VudCIsInZhbGlkX2NvZGUiLCJsZXZlbGNoZWNrIiwiaGFzX2FkZGl0aW9uYWxfdGV4dF9zZWxlY3RvciIsImFkZGl0aW9uYWxfYW1vdW50X3NlbGVjdG9yIiwiYWRkaXRpb25hbF9hbW91bnRfZmllbGQiLCJxdWFudGl0eV9zZWxlY3RvciIsImFmdGVyIiwic2luZ2xlX3VuaXRfcHJpY2VfYXR0cmlidXRlIiwicXVhbnRpdHlfZmllbGQiLCJzdWNjZXNzIiwiaXRlbV9zZWxlY3RvciIsInByb21vY29kZV9zZWxlY3RvciIsImV2ZW50X2lkX3NlbGVjdG9yIiwiZXZlbnRfaWQiLCJwcm9tb19jb2RlIiwiY2hlY2tQcm9tb0NvZGUiLCJwcm9tb19zZWxlY3RvciIsImNzcyIsInVzZXIiLCJtaW5ucG9zdF9yb290IiwicmVzdWx0Iiwic3RhdHVzIiwicmVhc29uIiwiY2hvb3NlX3BheW1lbnQiLCJjaGVja2VkIiwiY2hlY2tlZF92YWx1ZSIsInBheW1lbnRfbWV0aG9kX3NlbGVjdG9yIiwiaWQiLCJkb25hdGVfZm9ybV9zZWxlY3RvciIsInByZXBlbmQiLCJzdHlsZSIsImJhc2UiLCJpY29uQ29sb3IiLCJsaW5lSGVpZ2h0IiwiZm9udFdlaWdodCIsImZvbnRGYW1pbHkiLCJmb250U2l6ZSIsImNhcmROdW1iZXJFbGVtZW50IiwiY3JlYXRlIiwibW91bnQiLCJjY19udW1fc2VsZWN0b3IiLCJjYXJkRXhwaXJ5RWxlbWVudCIsImNjX2V4cF9zZWxlY3RvciIsImNhcmRDdmNFbGVtZW50IiwiY2NfY3Z2X3NlbGVjdG9yIiwic3RyaXBlRXJyb3JEaXNwbGF5IiwiYnJhbmQiLCJzZXRCcmFuZEljb24iLCJjYXJkQnJhbmRUb1BmQ2xhc3MiLCJicmFuZEljb25FbGVtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJwZkNsYXNzIiwicGxhaWRfZW52IiwiUGxhaWQiLCJsaW5rSGFuZGxlciIsInNlbGVjdEFjY291bnQiLCJhcGlWZXJzaW9uIiwiZW52IiwiY2xpZW50TmFtZSIsInBsYWlkX3B1YmxpY19rZXkiLCJwcm9kdWN0Iiwib25Mb2FkIiwib25TdWNjZXNzIiwicHVibGljX3Rva2VuIiwibWV0YWRhdGEiLCJzdXBwb3J0Zm9ybSIsImFjY291bnRfaWQiLCJzZXJpYWxpemUiLCJyZXNwb25zZSIsInBsYWlkX2xpbmsiLCJzdHJpcGVfYmFua19hY2NvdW50X3Rva2VuIiwiY29udGVudHMiLCJ1bndyYXAiLCJvbkV4aXQiLCJlcnIiLCJvcGVuIiwiaGFzSHRtbDVWYWxpZGF0aW9uIiwiY3JlYXRlRWxlbWVudCIsImNoZWNrVmFsaWRpdHkiLCJidXR0b25TdGF0dXMiLCJidXR0b24iLCJkaXNhYmxlZCIsInN1Ym1pdCIsImFuaW1hdGUiLCJzY3JvbGxUb3AiLCJvZmZzZXQiLCJ0b3AiLCJ2YWxpZCIsInBheW1lbnRfbWV0aG9kIiwiZnVsbF9uYW1lIiwic3RyZWV0IiwiY2l0eSIsInN0YXRlIiwiemlwIiwiY291bnRyeSIsImZpcnN0X25hbWUiLCJmaXJzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yIiwibGFzdF9uYW1lIiwibGFzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yIiwicGFzc3dvcmQiLCJwYXNzd29yZF9maWVsZF9zZWxlY3RvciIsImFjY291bnRfY2l0eV9zZWxlY3RvciIsImFjY291bnRfc3RhdGVfc2VsZWN0b3IiLCJhY2NvdW50X3ppcF9zZWxlY3RvciIsImNyZWF0ZVRva2VuIiwic3RyaXBlVG9rZW5IYW5kbGVyIiwidGhpc19zZWxlY3RvciIsIndoaWNoX2Vycm9yIiwiZW1wdHkiLCJ0aGVuIiwicHJldiIsInRva2VuIiwiY2FjaGUiLCJlcnJvcnMiLCJuZXdzbGV0dGVyX2dyb3VwX3NlbGVjdG9yIiwiZ2V0X2RhdGEiLCJtYWlsY2hpbXBfc3RhdHVzIiwibWFpbGNoaW1wX3VzZXJfaWQiLCJleGlzdGluZ19uZXdzbGV0dGVyX3NldHRpbmdzIiwiY29uZmlybV9mb3JtX3NlbGVjdG9yIiwiY29uZmlybWZvcm0iLCJuZXdzbGV0dGVyX2dyb3VwcyIsIm1lc3NhZ2VfZ3JvdXBzIiwibWVzc2FnZV9ncm91cF9zZWxlY3RvciIsIm5ld19uZXdzbGV0dGVyX3NldHRpbmdzIiwicG9zdF9kYXRhIiwiZ3JvdXBzX3N1Ym1pdHRlZCIsImdyb3Vwc19hdmFpbGFibGUiLCJncm91cCIsImRhdGFUeXBlIiwiY29udGVudFR5cGUiLCJKU09OIiwic3RyaW5naWZ5IiwiZmFpbCIsImZuIiwialF1ZXJ5Il0sIm1hcHBpbmdzIjoiOzs7O0FBQUEsQ0FBQyxVQUFTQSxDQUFULEVBQVc7QUFBQyxNQUFHLFFBQU9DLE9BQVAseUNBQU9BLE9BQVAsT0FBaUIsUUFBakIsSUFBMkIsT0FBT0MsTUFBUCxLQUFnQixXQUE5QyxFQUEwRDtBQUFDQSxJQUFBQSxNQUFNLENBQUNELE9BQVAsR0FBZUQsQ0FBQyxFQUFoQjtBQUFtQixH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aW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oZil7aWYodHlwZW9mIGV4cG9ydHM9PT1cIm9iamVjdFwiJiZ0eXBlb2YgbW9kdWxlIT09XCJ1bmRlZmluZWRcIil7bW9kdWxlLmV4cG9ydHM9ZigpfWVsc2UgaWYodHlwZW9mIGRlZmluZT09PVwiZnVuY3Rpb25cIiYmZGVmaW5lLmFtZCl7ZGVmaW5lKFtdLGYpfWVsc2V7dmFyIGc7aWYodHlwZW9mIHdpbmRvdyE9PVwidW5kZWZpbmVkXCIpe2c9d2luZG93fWVsc2UgaWYodHlwZW9mIGdsb2JhbCE9PVwidW5kZWZpbmVkXCIpe2c9Z2xvYmFsfWVsc2UgaWYodHlwZW9mIHNlbGYhPT1cInVuZGVmaW5lZFwiKXtnPXNlbGZ9ZWxzZXtnPXRoaXN9KGcucGF5bWVudCB8fCAoZy5wYXltZW50ID0ge30pKS5qcyA9IGYoKX19KShmdW5jdGlvbigpe3ZhciBkZWZpbmUsbW9kdWxlLGV4cG9ydHM7cmV0dXJuIChmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pKHsxOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcbnZhciBRSiwgcnJldHVybiwgcnRyaW07XG5cblFKID0gZnVuY3Rpb24oc2VsZWN0b3IpIHtcbiAgaWYgKFFKLmlzRE9NRWxlbWVudChzZWxlY3RvcikpIHtcbiAgICByZXR1cm4gc2VsZWN0b3I7XG4gIH1cbiAgcmV0dXJuIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xufTtcblxuUUouaXNET01FbGVtZW50ID0gZnVuY3Rpb24oZWwpIHtcbiAgcmV0dXJuIGVsICYmIChlbC5ub2RlTmFtZSAhPSBudWxsKTtcbn07XG5cbnJ0cmltID0gL15bXFxzXFx1RkVGRlxceEEwXSt8W1xcc1xcdUZFRkZcXHhBMF0rJC9nO1xuXG5RSi50cmltID0gZnVuY3Rpb24odGV4dCkge1xuICBpZiAodGV4dCA9PT0gbnVsbCkge1xuICAgIHJldHVybiBcIlwiO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiAodGV4dCArIFwiXCIpLnJlcGxhY2UocnRyaW0sIFwiXCIpO1xuICB9XG59O1xuXG5ycmV0dXJuID0gL1xcci9nO1xuXG5RSi52YWwgPSBmdW5jdGlvbihlbCwgdmFsKSB7XG4gIHZhciByZXQ7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgIHJldHVybiBlbC52YWx1ZSA9IHZhbDtcbiAgfSBlbHNlIHtcbiAgICByZXQgPSBlbC52YWx1ZTtcbiAgICBpZiAodHlwZW9mIHJldCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgcmV0dXJuIHJldC5yZXBsYWNlKHJyZXR1cm4sIFwiXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAocmV0ID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cblFKLnByZXZlbnREZWZhdWx0ID0gZnVuY3Rpb24oZXZlbnRPYmplY3QpIHtcbiAgaWYgKHR5cGVvZiBldmVudE9iamVjdC5wcmV2ZW50RGVmYXVsdCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgZXZlbnRPYmplY3QucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm47XG4gIH1cbiAgZXZlbnRPYmplY3QucmV0dXJuVmFsdWUgPSBmYWxzZTtcbiAgcmV0dXJuIGZhbHNlO1xufTtcblxuUUoubm9ybWFsaXplRXZlbnQgPSBmdW5jdGlvbihlKSB7XG4gIHZhciBvcmlnaW5hbDtcbiAgb3JpZ2luYWwgPSBlO1xuICBlID0ge1xuICAgIHdoaWNoOiBvcmlnaW5hbC53aGljaCAhPSBudWxsID8gb3JpZ2luYWwud2hpY2ggOiB2b2lkIDAsXG4gICAgdGFyZ2V0OiBvcmlnaW5hbC50YXJnZXQgfHwgb3JpZ2luYWwuc3JjRWxlbWVudCxcbiAgICBwcmV2ZW50RGVmYXVsdDogZnVuY3Rpb24oKSB7XG4gICAgICByZXR1cm4gUUoucHJldmVudERlZmF1bHQob3JpZ2luYWwpO1xuICAgIH0sXG4gICAgb3JpZ2luYWxFdmVudDogb3JpZ2luYWwsXG4gICAgZGF0YTogb3JpZ2luYWwuZGF0YSB8fCBvcmlnaW5hbC5kZXRhaWxcbiAgfTtcbiAgaWYgKGUud2hpY2ggPT0gbnVsbCkge1xuICAgIGUud2hpY2ggPSBvcmlnaW5hbC5jaGFyQ29kZSAhPSBudWxsID8gb3JpZ2luYWwuY2hhckNvZGUgOiBvcmlnaW5hbC5rZXlDb2RlO1xuICB9XG4gIHJldHVybiBlO1xufTtcblxuUUoub24gPSBmdW5jdGlvbihlbGVtZW50LCBldmVudE5hbWUsIGNhbGxiYWNrKSB7XG4gIHZhciBlbCwgaSwgaiwgbGVuLCBsZW4xLCBtdWx0RXZlbnROYW1lLCBvcmlnaW5hbENhbGxiYWNrLCByZWY7XG4gIGlmIChlbGVtZW50Lmxlbmd0aCkge1xuICAgIGZvciAoaSA9IDAsIGxlbiA9IGVsZW1lbnQubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgIGVsID0gZWxlbWVudFtpXTtcbiAgICAgIFFKLm9uKGVsLCBldmVudE5hbWUsIGNhbGxiYWNrKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChldmVudE5hbWUubWF0Y2goXCIgXCIpKSB7XG4gICAgcmVmID0gZXZlbnROYW1lLnNwbGl0KFwiIFwiKTtcbiAgICBmb3IgKGogPSAwLCBsZW4xID0gcmVmLmxlbmd0aDsgaiA8IGxlbjE7IGorKykge1xuICAgICAgbXVsdEV2ZW50TmFtZSA9IHJlZltqXTtcbiAgICAgIFFKLm9uKGVsZW1lbnQsIG11bHRFdmVudE5hbWUsIGNhbGxiYWNrKTtcbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG4gIG9yaWdpbmFsQ2FsbGJhY2sgPSBjYWxsYmFjaztcbiAgY2FsbGJhY2sgPSBmdW5jdGlvbihlKSB7XG4gICAgZSA9IFFKLm5vcm1hbGl6ZUV2ZW50KGUpO1xuICAgIHJldHVybiBvcmlnaW5hbENhbGxiYWNrKGUpO1xuICB9O1xuICBpZiAoZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKSB7XG4gICAgcmV0dXJuIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWUsIGNhbGxiYWNrLCBmYWxzZSk7XG4gIH1cbiAgaWYgKGVsZW1lbnQuYXR0YWNoRXZlbnQpIHtcbiAgICBldmVudE5hbWUgPSBcIm9uXCIgKyBldmVudE5hbWU7XG4gICAgcmV0dXJuIGVsZW1lbnQuYXR0YWNoRXZlbnQoZXZlbnROYW1lLCBjYWxsYmFjayk7XG4gIH1cbiAgZWxlbWVudFsnb24nICsgZXZlbnROYW1lXSA9IGNhbGxiYWNrO1xufTtcblxuUUouYWRkQ2xhc3MgPSBmdW5jdGlvbihlbCwgY2xhc3NOYW1lKSB7XG4gIHZhciBlO1xuICBpZiAoZWwubGVuZ3RoKSB7XG4gICAgcmV0dXJuIChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBpLCBsZW4sIHJlc3VsdHM7XG4gICAgICByZXN1bHRzID0gW107XG4gICAgICBmb3IgKGkgPSAwLCBsZW4gPSBlbC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBlID0gZWxbaV07XG4gICAgICAgIHJlc3VsdHMucHVzaChRSi5hZGRDbGFzcyhlLCBjbGFzc05hbWUpKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH0pKCk7XG4gIH1cbiAgaWYgKGVsLmNsYXNzTGlzdCkge1xuICAgIHJldHVybiBlbC5jbGFzc0xpc3QuYWRkKGNsYXNzTmFtZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGVsLmNsYXNzTmFtZSArPSAnICcgKyBjbGFzc05hbWU7XG4gIH1cbn07XG5cblFKLmhhc0NsYXNzID0gZnVuY3Rpb24oZWwsIGNsYXNzTmFtZSkge1xuICB2YXIgZSwgaGFzQ2xhc3MsIGksIGxlbjtcbiAgaWYgKGVsLmxlbmd0aCkge1xuICAgIGhhc0NsYXNzID0gdHJ1ZTtcbiAgICBmb3IgKGkgPSAwLCBsZW4gPSBlbC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgZSA9IGVsW2ldO1xuICAgICAgaGFzQ2xhc3MgPSBoYXNDbGFzcyAmJiBRSi5oYXNDbGFzcyhlLCBjbGFzc05hbWUpO1xuICAgIH1cbiAgICByZXR1cm4gaGFzQ2xhc3M7XG4gIH1cbiAgaWYgKGVsLmNsYXNzTGlzdCkge1xuICAgIHJldHVybiBlbC5jbGFzc0xpc3QuY29udGFpbnMoY2xhc3NOYW1lKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gbmV3IFJlZ0V4cCgnKF58ICknICsgY2xhc3NOYW1lICsgJyggfCQpJywgJ2dpJykudGVzdChlbC5jbGFzc05hbWUpO1xuICB9XG59O1xuXG5RSi5yZW1vdmVDbGFzcyA9IGZ1bmN0aW9uKGVsLCBjbGFzc05hbWUpIHtcbiAgdmFyIGNscywgZSwgaSwgbGVuLCByZWYsIHJlc3VsdHM7XG4gIGlmIChlbC5sZW5ndGgpIHtcbiAgICByZXR1cm4gKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGksIGxlbiwgcmVzdWx0cztcbiAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgIGZvciAoaSA9IDAsIGxlbiA9IGVsLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGUgPSBlbFtpXTtcbiAgICAgICAgcmVzdWx0cy5wdXNoKFFKLnJlbW92ZUNsYXNzKGUsIGNsYXNzTmFtZSkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfSkoKTtcbiAgfVxuICBpZiAoZWwuY2xhc3NMaXN0KSB7XG4gICAgcmVmID0gY2xhc3NOYW1lLnNwbGl0KCcgJyk7XG4gICAgcmVzdWx0cyA9IFtdO1xuICAgIGZvciAoaSA9IDAsIGxlbiA9IHJlZi5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgY2xzID0gcmVmW2ldO1xuICAgICAgcmVzdWx0cy5wdXNoKGVsLmNsYXNzTGlzdC5yZW1vdmUoY2xzKSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRzO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBlbC5jbGFzc05hbWUgPSBlbC5jbGFzc05hbWUucmVwbGFjZShuZXcgUmVnRXhwKCcoXnxcXFxcYiknICsgY2xhc3NOYW1lLnNwbGl0KCcgJykuam9pbignfCcpICsgJyhcXFxcYnwkKScsICdnaScpLCAnICcpO1xuICB9XG59O1xuXG5RSi50b2dnbGVDbGFzcyA9IGZ1bmN0aW9uKGVsLCBjbGFzc05hbWUsIGJvb2wpIHtcbiAgdmFyIGU7XG4gIGlmIChlbC5sZW5ndGgpIHtcbiAgICByZXR1cm4gKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGksIGxlbiwgcmVzdWx0cztcbiAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgIGZvciAoaSA9IDAsIGxlbiA9IGVsLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGUgPSBlbFtpXTtcbiAgICAgICAgcmVzdWx0cy5wdXNoKFFKLnRvZ2dsZUNsYXNzKGUsIGNsYXNzTmFtZSwgYm9vbCkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfSkoKTtcbiAgfVxuICBpZiAoYm9vbCkge1xuICAgIGlmICghUUouaGFzQ2xhc3MoZWwsIGNsYXNzTmFtZSkpIHtcbiAgICAgIHJldHVybiBRSi5hZGRDbGFzcyhlbCwgY2xhc3NOYW1lKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIFFKLnJlbW92ZUNsYXNzKGVsLCBjbGFzc05hbWUpO1xuICB9XG59O1xuXG5RSi5hcHBlbmQgPSBmdW5jdGlvbihlbCwgdG9BcHBlbmQpIHtcbiAgdmFyIGU7XG4gIGlmIChlbC5sZW5ndGgpIHtcbiAgICByZXR1cm4gKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGksIGxlbiwgcmVzdWx0cztcbiAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgIGZvciAoaSA9IDAsIGxlbiA9IGVsLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGUgPSBlbFtpXTtcbiAgICAgICAgcmVzdWx0cy5wdXNoKFFKLmFwcGVuZChlLCB0b0FwcGVuZCkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfSkoKTtcbiAgfVxuICByZXR1cm4gZWwuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCB0b0FwcGVuZCk7XG59O1xuXG5RSi5maW5kID0gZnVuY3Rpb24oZWwsIHNlbGVjdG9yKSB7XG4gIGlmIChlbCBpbnN0YW5jZW9mIE5vZGVMaXN0IHx8IGVsIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICBlbCA9IGVsWzBdO1xuICB9XG4gIHJldHVybiBlbC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbn07XG5cblFKLnRyaWdnZXIgPSBmdW5jdGlvbihlbCwgbmFtZSwgZGF0YSkge1xuICB2YXIgZSwgZXJyb3IsIGV2O1xuICB0cnkge1xuICAgIGV2ID0gbmV3IEN1c3RvbUV2ZW50KG5hbWUsIHtcbiAgICAgIGRldGFpbDogZGF0YVxuICAgIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGUgPSBlcnJvcjtcbiAgICBldiA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KCdDdXN0b21FdmVudCcpO1xuICAgIGlmIChldi5pbml0Q3VzdG9tRXZlbnQpIHtcbiAgICAgIGV2LmluaXRDdXN0b21FdmVudChuYW1lLCB0cnVlLCB0cnVlLCBkYXRhKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZXYuaW5pdEV2ZW50KG5hbWUsIHRydWUsIHRydWUsIGRhdGEpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZWwuZGlzcGF0Y2hFdmVudChldik7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IFFKO1xuXG5cbn0se31dLDI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xuKGZ1bmN0aW9uIChnbG9iYWwpe1xudmFyIFBheW1lbnQsIFFKLCBjYXJkRnJvbU51bWJlciwgY2FyZEZyb21UeXBlLCBjYXJkcywgZGVmYXVsdEZvcm1hdCwgZm9ybWF0QmFja0NhcmROdW1iZXIsIGZvcm1hdEJhY2tFeHBpcnksIGZvcm1hdENhcmROdW1iZXIsIGZvcm1hdEV4cGlyeSwgZm9ybWF0Rm9yd2FyZEV4cGlyeSwgZm9ybWF0Rm9yd2FyZFNsYXNoLCBmb3JtYXRNb250aEV4cGlyeSwgaGFzVGV4dFNlbGVjdGVkLCBsdWhuQ2hlY2ssIHJlRm9ybWF0Q2FyZE51bWJlciwgcmVzdHJpY3RDVkMsIHJlc3RyaWN0Q2FyZE51bWJlciwgcmVzdHJpY3RDb21iaW5lZEV4cGlyeSwgcmVzdHJpY3RFeHBpcnksIHJlc3RyaWN0TW9udGhFeHBpcnksIHJlc3RyaWN0TnVtZXJpYywgcmVzdHJpY3RZZWFyRXhwaXJ5LCBzZXRDYXJkVHlwZSxcbiAgaW5kZXhPZiA9IFtdLmluZGV4T2YgfHwgZnVuY3Rpb24oaXRlbSkgeyBmb3IgKHZhciBpID0gMCwgbCA9IHRoaXMubGVuZ3RoOyBpIDwgbDsgaSsrKSB7IGlmIChpIGluIHRoaXMgJiYgdGhpc1tpXSA9PT0gaXRlbSkgcmV0dXJuIGk7IH0gcmV0dXJuIC0xOyB9O1xuXG5RSiA9IHJlcXVpcmUoJ3FqL3NyYy9xai5jb2ZmZWUnKTtcblxuZGVmYXVsdEZvcm1hdCA9IC8oXFxkezEsNH0pL2c7XG5cbmNhcmRzID0gW1xuICB7XG4gICAgdHlwZTogJ2FtZXgnLFxuICAgIHBhdHRlcm46IC9eM1s0N10vLFxuICAgIGZvcm1hdDogLyhcXGR7MSw0fSkoXFxkezEsNn0pPyhcXGR7MSw1fSk/LyxcbiAgICBsZW5ndGg6IFsxNV0sXG4gICAgY3ZjTGVuZ3RoOiBbNF0sXG4gICAgbHVobjogdHJ1ZVxuICB9LCB7XG4gICAgdHlwZTogJ2RhbmtvcnQnLFxuICAgIHBhdHRlcm46IC9eNTAxOS8sXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGxlbmd0aDogWzE2XSxcbiAgICBjdmNMZW5ndGg6IFszXSxcbiAgICBsdWhuOiB0cnVlXG4gIH0sIHtcbiAgICB0eXBlOiAnZGluZXJzY2x1YicsXG4gICAgcGF0dGVybjogL14oMzZ8Mzh8MzBbMC01XSkvLFxuICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICBsZW5ndGg6IFsxNF0sXG4gICAgY3ZjTGVuZ3RoOiBbM10sXG4gICAgbHVobjogdHJ1ZVxuICB9LCB7XG4gICAgdHlwZTogJ2Rpc2NvdmVyJyxcbiAgICBwYXR0ZXJuOiAvXig2MDExfDY1fDY0WzQtOV18NjIyKS8sXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGxlbmd0aDogWzE2XSxcbiAgICBjdmNMZW5ndGg6IFszXSxcbiAgICBsdWhuOiB0cnVlXG4gIH0sIHtcbiAgICB0eXBlOiAnamNiJyxcbiAgICBwYXR0ZXJuOiAvXjM1LyxcbiAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgbGVuZ3RoOiBbMTZdLFxuICAgIGN2Y0xlbmd0aDogWzNdLFxuICAgIGx1aG46IHRydWVcbiAgfSwge1xuICAgIHR5cGU6ICdsYXNlcicsXG4gICAgcGF0dGVybjogL14oNjcwNnw2NzcxfDY3MDkpLyxcbiAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgbGVuZ3RoOiBbMTYsIDE3LCAxOCwgMTldLFxuICAgIGN2Y0xlbmd0aDogWzNdLFxuICAgIGx1aG46IHRydWVcbiAgfSwge1xuICAgIHR5cGU6ICdtYWVzdHJvJyxcbiAgICBwYXR0ZXJuOiAvXig1MDE4fDUwMjB8NTAzOHw2MzA0fDY3MDN8Njc1OXw2NzZbMS0zXSkvLFxuICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICBsZW5ndGg6IFsxMiwgMTMsIDE0LCAxNSwgMTYsIDE3LCAxOCwgMTldLFxuICAgIGN2Y0xlbmd0aDogWzNdLFxuICAgIGx1aG46IHRydWVcbiAgfSwge1xuICAgIHR5cGU6ICdtYXN0ZXJjYXJkJyxcbiAgICBwYXR0ZXJuOiAvXjVbMS01XS8sXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGxlbmd0aDogWzE2XSxcbiAgICBjdmNMZW5ndGg6IFszXSxcbiAgICBsdWhuOiB0cnVlXG4gIH0sIHtcbiAgICB0eXBlOiAndW5pb25wYXknLFxuICAgIHBhdHRlcm46IC9eNjIvLFxuICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICBsZW5ndGg6IFsxNiwgMTcsIDE4LCAxOV0sXG4gICAgY3ZjTGVuZ3RoOiBbM10sXG4gICAgbHVobjogZmFsc2VcbiAgfSwge1xuICAgIHR5cGU6ICd2aXNhZWxlY3Ryb24nLFxuICAgIHBhdHRlcm46IC9eNCgwMjZ8MTc1MDB8NDA1fDUwOHw4NDR8OTFbMzddKS8sXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGxlbmd0aDogWzE2XSxcbiAgICBjdmNMZW5ndGg6IFszXSxcbiAgICBsdWhuOiB0cnVlXG4gIH0sIHtcbiAgICB0eXBlOiAndmlzYScsXG4gICAgcGF0dGVybjogL140LyxcbiAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgbGVuZ3RoOiBbMTMsIDE2XSxcbiAgICBjdmNMZW5ndGg6IFszXSxcbiAgICBsdWhuOiB0cnVlXG4gIH0sIHtcbiAgICB0eXBlOiAnZWxvJyxcbiAgICBwYXR0ZXJuOiAvXjQwMTF8NDM4OTM1fDQ1KDE0MTZ8NzYpfDUwKDQxNzV8NjY5OXw2N3w5MFs0LTddKXw2Myg2Mjk3fDYzNjgpLyxcbiAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgbGVuZ3RoOiBbMTZdLFxuICAgIGN2Y0xlbmd0aDogWzNdLFxuICAgIGx1aG46IHRydWVcbiAgfVxuXTtcblxuY2FyZEZyb21OdW1iZXIgPSBmdW5jdGlvbihudW0pIHtcbiAgdmFyIGNhcmQsIGksIGxlbjtcbiAgbnVtID0gKG51bSArICcnKS5yZXBsYWNlKC9cXEQvZywgJycpO1xuICBmb3IgKGkgPSAwLCBsZW4gPSBjYXJkcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGNhcmQgPSBjYXJkc1tpXTtcbiAgICBpZiAoY2FyZC5wYXR0ZXJuLnRlc3QobnVtKSkge1xuICAgICAgcmV0dXJuIGNhcmQ7XG4gICAgfVxuICB9XG59O1xuXG5jYXJkRnJvbVR5cGUgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciBjYXJkLCBpLCBsZW47XG4gIGZvciAoaSA9IDAsIGxlbiA9IGNhcmRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgY2FyZCA9IGNhcmRzW2ldO1xuICAgIGlmIChjYXJkLnR5cGUgPT09IHR5cGUpIHtcbiAgICAgIHJldHVybiBjYXJkO1xuICAgIH1cbiAgfVxufTtcblxubHVobkNoZWNrID0gZnVuY3Rpb24obnVtKSB7XG4gIHZhciBkaWdpdCwgZGlnaXRzLCBpLCBsZW4sIG9kZCwgc3VtO1xuICBvZGQgPSB0cnVlO1xuICBzdW0gPSAwO1xuICBkaWdpdHMgPSAobnVtICsgJycpLnNwbGl0KCcnKS5yZXZlcnNlKCk7XG4gIGZvciAoaSA9IDAsIGxlbiA9IGRpZ2l0cy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgIGRpZ2l0ID0gZGlnaXRzW2ldO1xuICAgIGRpZ2l0ID0gcGFyc2VJbnQoZGlnaXQsIDEwKTtcbiAgICBpZiAoKG9kZCA9ICFvZGQpKSB7XG4gICAgICBkaWdpdCAqPSAyO1xuICAgIH1cbiAgICBpZiAoZGlnaXQgPiA5KSB7XG4gICAgICBkaWdpdCAtPSA5O1xuICAgIH1cbiAgICBzdW0gKz0gZGlnaXQ7XG4gIH1cbiAgcmV0dXJuIHN1bSAlIDEwID09PSAwO1xufTtcblxuaGFzVGV4dFNlbGVjdGVkID0gZnVuY3Rpb24odGFyZ2V0KSB7XG4gIHZhciByZWY7XG4gIGlmICgodGFyZ2V0LnNlbGVjdGlvblN0YXJ0ICE9IG51bGwpICYmIHRhcmdldC5zZWxlY3Rpb25TdGFydCAhPT0gdGFyZ2V0LnNlbGVjdGlvbkVuZCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmICgodHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiICYmIGRvY3VtZW50ICE9PSBudWxsID8gKHJlZiA9IGRvY3VtZW50LnNlbGVjdGlvbikgIT0gbnVsbCA/IHJlZi5jcmVhdGVSYW5nZSA6IHZvaWQgMCA6IHZvaWQgMCkgIT0gbnVsbCkge1xuICAgIGlmIChkb2N1bWVudC5zZWxlY3Rpb24uY3JlYXRlUmFuZ2UoKS50ZXh0KSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufTtcblxucmVGb3JtYXRDYXJkTnVtYmVyID0gZnVuY3Rpb24oZSkge1xuICByZXR1cm4gc2V0VGltZW91dCgoZnVuY3Rpb24oX3RoaXMpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgdGFyZ2V0LCB2YWx1ZTtcbiAgICAgIHRhcmdldCA9IGUudGFyZ2V0O1xuICAgICAgdmFsdWUgPSBRSi52YWwodGFyZ2V0KTtcbiAgICAgIHZhbHVlID0gUGF5bWVudC5mbnMuZm9ybWF0Q2FyZE51bWJlcih2YWx1ZSk7XG4gICAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgdmFsdWUpO1xuICAgIH07XG4gIH0pKHRoaXMpKTtcbn07XG5cbmZvcm1hdENhcmROdW1iZXIgPSBmdW5jdGlvbihlKSB7XG4gIHZhciBjYXJkLCBkaWdpdCwgbGVuZ3RoLCByZSwgdGFyZ2V0LCB1cHBlckxlbmd0aCwgdmFsdWU7XG4gIGRpZ2l0ID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKTtcbiAgaWYgKCEvXlxcZCskLy50ZXN0KGRpZ2l0KSkge1xuICAgIHJldHVybjtcbiAgfVxuICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgdmFsdWUgPSBRSi52YWwodGFyZ2V0KTtcbiAgY2FyZCA9IGNhcmRGcm9tTnVtYmVyKHZhbHVlICsgZGlnaXQpO1xuICBsZW5ndGggPSAodmFsdWUucmVwbGFjZSgvXFxEL2csICcnKSArIGRpZ2l0KS5sZW5ndGg7XG4gIHVwcGVyTGVuZ3RoID0gMTY7XG4gIGlmIChjYXJkKSB7XG4gICAgdXBwZXJMZW5ndGggPSBjYXJkLmxlbmd0aFtjYXJkLmxlbmd0aC5sZW5ndGggLSAxXTtcbiAgfVxuICBpZiAobGVuZ3RoID49IHVwcGVyTGVuZ3RoKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICgodGFyZ2V0LnNlbGVjdGlvblN0YXJ0ICE9IG51bGwpICYmIHRhcmdldC5zZWxlY3Rpb25TdGFydCAhPT0gdmFsdWUubGVuZ3RoKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChjYXJkICYmIGNhcmQudHlwZSA9PT0gJ2FtZXgnKSB7XG4gICAgcmUgPSAvXihcXGR7NH18XFxkezR9XFxzXFxkezZ9KSQvO1xuICB9IGVsc2Uge1xuICAgIHJlID0gLyg/Ol58XFxzKShcXGR7NH0pJC87XG4gIH1cbiAgaWYgKHJlLnRlc3QodmFsdWUpKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCB2YWx1ZSArICcgJyArIGRpZ2l0KTtcbiAgfSBlbHNlIGlmIChyZS50ZXN0KHZhbHVlICsgZGlnaXQpKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCB2YWx1ZSArIGRpZ2l0ICsgJyAnKTtcbiAgfVxufTtcblxuZm9ybWF0QmFja0NhcmROdW1iZXIgPSBmdW5jdGlvbihlKSB7XG4gIHZhciB0YXJnZXQsIHZhbHVlO1xuICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgdmFsdWUgPSBRSi52YWwodGFyZ2V0KTtcbiAgaWYgKGUubWV0YSkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoZS53aGljaCAhPT0gOCkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoKHRhcmdldC5zZWxlY3Rpb25TdGFydCAhPSBudWxsKSAmJiB0YXJnZXQuc2VsZWN0aW9uU3RhcnQgIT09IHZhbHVlLmxlbmd0aCkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoL1xcZFxccyQvLnRlc3QodmFsdWUpKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCB2YWx1ZS5yZXBsYWNlKC9cXGRcXHMkLywgJycpKTtcbiAgfSBlbHNlIGlmICgvXFxzXFxkPyQvLnRlc3QodmFsdWUpKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCB2YWx1ZS5yZXBsYWNlKC9cXHNcXGQ/JC8sICcnKSk7XG4gIH1cbn07XG5cbmZvcm1hdEV4cGlyeSA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIGRpZ2l0LCB0YXJnZXQsIHZhbDtcbiAgZGlnaXQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpO1xuICBpZiAoIS9eXFxkKyQvLnRlc3QoZGlnaXQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRhcmdldCA9IGUudGFyZ2V0O1xuICB2YWwgPSBRSi52YWwodGFyZ2V0KSArIGRpZ2l0O1xuICBpZiAoL15cXGQkLy50ZXN0KHZhbCkgJiYgKHZhbCAhPT0gJzAnICYmIHZhbCAhPT0gJzEnKSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgXCIwXCIgKyB2YWwgKyBcIiAvIFwiKTtcbiAgfSBlbHNlIGlmICgvXlxcZFxcZCQvLnRlc3QodmFsKSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgdmFsICsgXCIgLyBcIik7XG4gIH1cbn07XG5cbmZvcm1hdE1vbnRoRXhwaXJ5ID0gZnVuY3Rpb24oZSkge1xuICB2YXIgZGlnaXQsIHRhcmdldCwgdmFsO1xuICBkaWdpdCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZS53aGljaCk7XG4gIGlmICghL15cXGQrJC8udGVzdChkaWdpdCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gIHZhbCA9IFFKLnZhbCh0YXJnZXQpICsgZGlnaXQ7XG4gIGlmICgvXlxcZCQvLnRlc3QodmFsKSAmJiAodmFsICE9PSAnMCcgJiYgdmFsICE9PSAnMScpKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCBcIjBcIiArIHZhbCk7XG4gIH0gZWxzZSBpZiAoL15cXGRcXGQkLy50ZXN0KHZhbCkpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIFwiXCIgKyB2YWwpO1xuICB9XG59O1xuXG5mb3JtYXRGb3J3YXJkRXhwaXJ5ID0gZnVuY3Rpb24oZSkge1xuICB2YXIgZGlnaXQsIHRhcmdldCwgdmFsO1xuICBkaWdpdCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZS53aGljaCk7XG4gIGlmICghL15cXGQrJC8udGVzdChkaWdpdCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gIHZhbCA9IFFKLnZhbCh0YXJnZXQpO1xuICBpZiAoL15cXGRcXGQkLy50ZXN0KHZhbCkpIHtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgdmFsICsgXCIgLyBcIik7XG4gIH1cbn07XG5cbmZvcm1hdEZvcndhcmRTbGFzaCA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIHNsYXNoLCB0YXJnZXQsIHZhbDtcbiAgc2xhc2ggPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpO1xuICBpZiAoc2xhc2ggIT09ICcvJykge1xuICAgIHJldHVybjtcbiAgfVxuICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgdmFsID0gUUoudmFsKHRhcmdldCk7XG4gIGlmICgvXlxcZCQvLnRlc3QodmFsKSAmJiB2YWwgIT09ICcwJykge1xuICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCBcIjBcIiArIHZhbCArIFwiIC8gXCIpO1xuICB9XG59O1xuXG5mb3JtYXRCYWNrRXhwaXJ5ID0gZnVuY3Rpb24oZSkge1xuICB2YXIgdGFyZ2V0LCB2YWx1ZTtcbiAgaWYgKGUubWV0YUtleSkge1xuICAgIHJldHVybjtcbiAgfVxuICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgdmFsdWUgPSBRSi52YWwodGFyZ2V0KTtcbiAgaWYgKGUud2hpY2ggIT09IDgpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKCh0YXJnZXQuc2VsZWN0aW9uU3RhcnQgIT0gbnVsbCkgJiYgdGFyZ2V0LnNlbGVjdGlvblN0YXJ0ICE9PSB2YWx1ZS5sZW5ndGgpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKC9cXGQoXFxzfFxcLykrJC8udGVzdCh2YWx1ZSkpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIHZhbHVlLnJlcGxhY2UoL1xcZChcXHN8XFwvKSokLywgJycpKTtcbiAgfSBlbHNlIGlmICgvXFxzXFwvXFxzP1xcZD8kLy50ZXN0KHZhbHVlKSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgdmFsdWUucmVwbGFjZSgvXFxzXFwvXFxzP1xcZD8kLywgJycpKTtcbiAgfVxufTtcblxucmVzdHJpY3ROdW1lcmljID0gZnVuY3Rpb24oZSkge1xuICB2YXIgaW5wdXQ7XG4gIGlmIChlLm1ldGFLZXkgfHwgZS5jdHJsS2V5KSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKGUud2hpY2ggPT09IDMyKSB7XG4gICAgcmV0dXJuIGUucHJldmVudERlZmF1bHQoKTtcbiAgfVxuICBpZiAoZS53aGljaCA9PT0gMCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlmIChlLndoaWNoIDwgMzMpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpbnB1dCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZS53aGljaCk7XG4gIGlmICghL1tcXGRcXHNdLy50ZXN0KGlucHV0KSkge1xuICAgIHJldHVybiBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH1cbn07XG5cbnJlc3RyaWN0Q2FyZE51bWJlciA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIGNhcmQsIGRpZ2l0LCB0YXJnZXQsIHZhbHVlO1xuICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgZGlnaXQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpO1xuICBpZiAoIS9eXFxkKyQvLnRlc3QoZGlnaXQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChoYXNUZXh0U2VsZWN0ZWQodGFyZ2V0KSkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YWx1ZSA9IChRSi52YWwodGFyZ2V0KSArIGRpZ2l0KS5yZXBsYWNlKC9cXEQvZywgJycpO1xuICBjYXJkID0gY2FyZEZyb21OdW1iZXIodmFsdWUpO1xuICBpZiAoY2FyZCkge1xuICAgIGlmICghKHZhbHVlLmxlbmd0aCA8PSBjYXJkLmxlbmd0aFtjYXJkLmxlbmd0aC5sZW5ndGggLSAxXSkpIHtcbiAgICAgIHJldHVybiBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIGlmICghKHZhbHVlLmxlbmd0aCA8PSAxNikpIHtcbiAgICAgIHJldHVybiBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuICB9XG59O1xuXG5yZXN0cmljdEV4cGlyeSA9IGZ1bmN0aW9uKGUsIGxlbmd0aCkge1xuICB2YXIgZGlnaXQsIHRhcmdldCwgdmFsdWU7XG4gIHRhcmdldCA9IGUudGFyZ2V0O1xuICBkaWdpdCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZS53aGljaCk7XG4gIGlmICghL15cXGQrJC8udGVzdChkaWdpdCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGhhc1RleHRTZWxlY3RlZCh0YXJnZXQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhbHVlID0gUUoudmFsKHRhcmdldCkgKyBkaWdpdDtcbiAgdmFsdWUgPSB2YWx1ZS5yZXBsYWNlKC9cXEQvZywgJycpO1xuICBpZiAodmFsdWUubGVuZ3RoID4gbGVuZ3RoKSB7XG4gICAgcmV0dXJuIGUucHJldmVudERlZmF1bHQoKTtcbiAgfVxufTtcblxucmVzdHJpY3RDb21iaW5lZEV4cGlyeSA9IGZ1bmN0aW9uKGUpIHtcbiAgcmV0dXJuIHJlc3RyaWN0RXhwaXJ5KGUsIDYpO1xufTtcblxucmVzdHJpY3RNb250aEV4cGlyeSA9IGZ1bmN0aW9uKGUpIHtcbiAgcmV0dXJuIHJlc3RyaWN0RXhwaXJ5KGUsIDIpO1xufTtcblxucmVzdHJpY3RZZWFyRXhwaXJ5ID0gZnVuY3Rpb24oZSkge1xuICByZXR1cm4gcmVzdHJpY3RFeHBpcnkoZSwgNCk7XG59O1xuXG5yZXN0cmljdENWQyA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIGRpZ2l0LCB0YXJnZXQsIHZhbDtcbiAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gIGRpZ2l0ID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKTtcbiAgaWYgKCEvXlxcZCskLy50ZXN0KGRpZ2l0KSkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoaGFzVGV4dFNlbGVjdGVkKHRhcmdldCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFsID0gUUoudmFsKHRhcmdldCkgKyBkaWdpdDtcbiAgaWYgKCEodmFsLmxlbmd0aCA8PSA0KSkge1xuICAgIHJldHVybiBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH1cbn07XG5cbnNldENhcmRUeXBlID0gZnVuY3Rpb24oZSkge1xuICB2YXIgYWxsVHlwZXMsIGNhcmQsIGNhcmRUeXBlLCB0YXJnZXQsIHZhbDtcbiAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gIHZhbCA9IFFKLnZhbCh0YXJnZXQpO1xuICBjYXJkVHlwZSA9IFBheW1lbnQuZm5zLmNhcmRUeXBlKHZhbCkgfHwgJ3Vua25vd24nO1xuICBpZiAoIVFKLmhhc0NsYXNzKHRhcmdldCwgY2FyZFR5cGUpKSB7XG4gICAgYWxsVHlwZXMgPSAoZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaSwgbGVuLCByZXN1bHRzO1xuICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgZm9yIChpID0gMCwgbGVuID0gY2FyZHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgY2FyZCA9IGNhcmRzW2ldO1xuICAgICAgICByZXN1bHRzLnB1c2goY2FyZC50eXBlKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXN1bHRzO1xuICAgIH0pKCk7XG4gICAgUUoucmVtb3ZlQ2xhc3ModGFyZ2V0LCAndW5rbm93bicpO1xuICAgIFFKLnJlbW92ZUNsYXNzKHRhcmdldCwgYWxsVHlwZXMuam9pbignICcpKTtcbiAgICBRSi5hZGRDbGFzcyh0YXJnZXQsIGNhcmRUeXBlKTtcbiAgICBRSi50b2dnbGVDbGFzcyh0YXJnZXQsICdpZGVudGlmaWVkJywgY2FyZFR5cGUgIT09ICd1bmtub3duJyk7XG4gICAgcmV0dXJuIFFKLnRyaWdnZXIodGFyZ2V0LCAncGF5bWVudC5jYXJkVHlwZScsIGNhcmRUeXBlKTtcbiAgfVxufTtcblxuUGF5bWVudCA9IChmdW5jdGlvbigpIHtcbiAgZnVuY3Rpb24gUGF5bWVudCgpIHt9XG5cbiAgUGF5bWVudC5mbnMgPSB7XG4gICAgY2FyZEV4cGlyeVZhbDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgIHZhciBtb250aCwgcHJlZml4LCByZWYsIHllYXI7XG4gICAgICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1xccy9nLCAnJyk7XG4gICAgICByZWYgPSB2YWx1ZS5zcGxpdCgnLycsIDIpLCBtb250aCA9IHJlZlswXSwgeWVhciA9IHJlZlsxXTtcbiAgICAgIGlmICgoeWVhciAhPSBudWxsID8geWVhci5sZW5ndGggOiB2b2lkIDApID09PSAyICYmIC9eXFxkKyQvLnRlc3QoeWVhcikpIHtcbiAgICAgICAgcHJlZml4ID0gKG5ldyBEYXRlKS5nZXRGdWxsWWVhcigpO1xuICAgICAgICBwcmVmaXggPSBwcmVmaXgudG9TdHJpbmcoKS5zbGljZSgwLCAyKTtcbiAgICAgICAgeWVhciA9IHByZWZpeCArIHllYXI7XG4gICAgICB9XG4gICAgICBtb250aCA9IHBhcnNlSW50KG1vbnRoLCAxMCk7XG4gICAgICB5ZWFyID0gcGFyc2VJbnQoeWVhciwgMTApO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbW9udGg6IG1vbnRoLFxuICAgICAgICB5ZWFyOiB5ZWFyXG4gICAgICB9O1xuICAgIH0sXG4gICAgdmFsaWRhdGVDYXJkTnVtYmVyOiBmdW5jdGlvbihudW0pIHtcbiAgICAgIHZhciBjYXJkLCByZWY7XG4gICAgICBudW0gPSAobnVtICsgJycpLnJlcGxhY2UoL1xccyt8LS9nLCAnJyk7XG4gICAgICBpZiAoIS9eXFxkKyQvLnRlc3QobnVtKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBjYXJkID0gY2FyZEZyb21OdW1iZXIobnVtKTtcbiAgICAgIGlmICghY2FyZCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gKHJlZiA9IG51bS5sZW5ndGgsIGluZGV4T2YuY2FsbChjYXJkLmxlbmd0aCwgcmVmKSA+PSAwKSAmJiAoY2FyZC5sdWhuID09PSBmYWxzZSB8fCBsdWhuQ2hlY2sobnVtKSk7XG4gICAgfSxcbiAgICB2YWxpZGF0ZUNhcmRFeHBpcnk6IGZ1bmN0aW9uKG1vbnRoLCB5ZWFyKSB7XG4gICAgICB2YXIgY3VycmVudFRpbWUsIGV4cGlyeSwgcHJlZml4LCByZWY7XG4gICAgICBpZiAodHlwZW9mIG1vbnRoID09PSAnb2JqZWN0JyAmJiAnbW9udGgnIGluIG1vbnRoKSB7XG4gICAgICAgIHJlZiA9IG1vbnRoLCBtb250aCA9IHJlZi5tb250aCwgeWVhciA9IHJlZi55ZWFyO1xuICAgICAgfVxuICAgICAgaWYgKCEobW9udGggJiYgeWVhcikpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgbW9udGggPSBRSi50cmltKG1vbnRoKTtcbiAgICAgIHllYXIgPSBRSi50cmltKHllYXIpO1xuICAgICAgaWYgKCEvXlxcZCskLy50ZXN0KG1vbnRoKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoIS9eXFxkKyQvLnRlc3QoeWVhcikpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKCEocGFyc2VJbnQobW9udGgsIDEwKSA8PSAxMikpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKHllYXIubGVuZ3RoID09PSAyKSB7XG4gICAgICAgIHByZWZpeCA9IChuZXcgRGF0ZSkuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgcHJlZml4ID0gcHJlZml4LnRvU3RyaW5nKCkuc2xpY2UoMCwgMik7XG4gICAgICAgIHllYXIgPSBwcmVmaXggKyB5ZWFyO1xuICAgICAgfVxuICAgICAgZXhwaXJ5ID0gbmV3IERhdGUoeWVhciwgbW9udGgpO1xuICAgICAgY3VycmVudFRpbWUgPSBuZXcgRGF0ZTtcbiAgICAgIGV4cGlyeS5zZXRNb250aChleHBpcnkuZ2V0TW9udGgoKSAtIDEpO1xuICAgICAgZXhwaXJ5LnNldE1vbnRoKGV4cGlyeS5nZXRNb250aCgpICsgMSwgMSk7XG4gICAgICByZXR1cm4gZXhwaXJ5ID4gY3VycmVudFRpbWU7XG4gICAgfSxcbiAgICB2YWxpZGF0ZUNhcmRDVkM6IGZ1bmN0aW9uKGN2YywgdHlwZSkge1xuICAgICAgdmFyIHJlZiwgcmVmMTtcbiAgICAgIGN2YyA9IFFKLnRyaW0oY3ZjKTtcbiAgICAgIGlmICghL15cXGQrJC8udGVzdChjdmMpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlICYmIGNhcmRGcm9tVHlwZSh0eXBlKSkge1xuICAgICAgICByZXR1cm4gcmVmID0gY3ZjLmxlbmd0aCwgaW5kZXhPZi5jYWxsKChyZWYxID0gY2FyZEZyb21UeXBlKHR5cGUpKSAhPSBudWxsID8gcmVmMS5jdmNMZW5ndGggOiB2b2lkIDAsIHJlZikgPj0gMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBjdmMubGVuZ3RoID49IDMgJiYgY3ZjLmxlbmd0aCA8PSA0O1xuICAgICAgfVxuICAgIH0sXG4gICAgY2FyZFR5cGU6IGZ1bmN0aW9uKG51bSkge1xuICAgICAgdmFyIHJlZjtcbiAgICAgIGlmICghbnVtKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgcmV0dXJuICgocmVmID0gY2FyZEZyb21OdW1iZXIobnVtKSkgIT0gbnVsbCA/IHJlZi50eXBlIDogdm9pZCAwKSB8fCBudWxsO1xuICAgIH0sXG4gICAgZm9ybWF0Q2FyZE51bWJlcjogZnVuY3Rpb24obnVtKSB7XG4gICAgICB2YXIgY2FyZCwgZ3JvdXBzLCByZWYsIHVwcGVyTGVuZ3RoO1xuICAgICAgY2FyZCA9IGNhcmRGcm9tTnVtYmVyKG51bSk7XG4gICAgICBpZiAoIWNhcmQpIHtcbiAgICAgICAgcmV0dXJuIG51bTtcbiAgICAgIH1cbiAgICAgIHVwcGVyTGVuZ3RoID0gY2FyZC5sZW5ndGhbY2FyZC5sZW5ndGgubGVuZ3RoIC0gMV07XG4gICAgICBudW0gPSBudW0ucmVwbGFjZSgvXFxEL2csICcnKTtcbiAgICAgIG51bSA9IG51bS5zbGljZSgwLCArdXBwZXJMZW5ndGggKyAxIHx8IDllOSk7XG4gICAgICBpZiAoY2FyZC5mb3JtYXQuZ2xvYmFsKSB7XG4gICAgICAgIHJldHVybiAocmVmID0gbnVtLm1hdGNoKGNhcmQuZm9ybWF0KSkgIT0gbnVsbCA/IHJlZi5qb2luKCcgJykgOiB2b2lkIDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBncm91cHMgPSBjYXJkLmZvcm1hdC5leGVjKG51bSk7XG4gICAgICAgIGlmIChncm91cHMgIT0gbnVsbCkge1xuICAgICAgICAgIGdyb3Vwcy5zaGlmdCgpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBncm91cHMgIT0gbnVsbCA/IGdyb3Vwcy5qb2luKCcgJykgOiB2b2lkIDA7XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIFBheW1lbnQucmVzdHJpY3ROdW1lcmljID0gZnVuY3Rpb24oZWwpIHtcbiAgICByZXR1cm4gUUoub24oZWwsICdrZXlwcmVzcycsIHJlc3RyaWN0TnVtZXJpYyk7XG4gIH07XG5cbiAgUGF5bWVudC5jYXJkRXhwaXJ5VmFsID0gZnVuY3Rpb24oZWwpIHtcbiAgICByZXR1cm4gUGF5bWVudC5mbnMuY2FyZEV4cGlyeVZhbChRSi52YWwoZWwpKTtcbiAgfTtcblxuICBQYXltZW50LmZvcm1hdENhcmRDVkMgPSBmdW5jdGlvbihlbCkge1xuICAgIFBheW1lbnQucmVzdHJpY3ROdW1lcmljKGVsKTtcbiAgICBRSi5vbihlbCwgJ2tleXByZXNzJywgcmVzdHJpY3RDVkMpO1xuICAgIHJldHVybiBlbDtcbiAgfTtcblxuICBQYXltZW50LmZvcm1hdENhcmRFeHBpcnkgPSBmdW5jdGlvbihlbCkge1xuICAgIHZhciBtb250aCwgeWVhcjtcbiAgICBQYXltZW50LnJlc3RyaWN0TnVtZXJpYyhlbCk7XG4gICAgaWYgKGVsLmxlbmd0aCAmJiBlbC5sZW5ndGggPT09IDIpIHtcbiAgICAgIG1vbnRoID0gZWxbMF0sIHllYXIgPSBlbFsxXTtcbiAgICAgIHRoaXMuZm9ybWF0Q2FyZEV4cGlyeU11bHRpcGxlKG1vbnRoLCB5ZWFyKTtcbiAgICB9IGVsc2Uge1xuICAgICAgUUoub24oZWwsICdrZXlwcmVzcycsIHJlc3RyaWN0Q29tYmluZWRFeHBpcnkpO1xuICAgICAgUUoub24oZWwsICdrZXlwcmVzcycsIGZvcm1hdEV4cGlyeSk7XG4gICAgICBRSi5vbihlbCwgJ2tleXByZXNzJywgZm9ybWF0Rm9yd2FyZFNsYXNoKTtcbiAgICAgIFFKLm9uKGVsLCAna2V5cHJlc3MnLCBmb3JtYXRGb3J3YXJkRXhwaXJ5KTtcbiAgICAgIFFKLm9uKGVsLCAna2V5ZG93bicsIGZvcm1hdEJhY2tFeHBpcnkpO1xuICAgIH1cbiAgICByZXR1cm4gZWw7XG4gIH07XG5cbiAgUGF5bWVudC5mb3JtYXRDYXJkRXhwaXJ5TXVsdGlwbGUgPSBmdW5jdGlvbihtb250aCwgeWVhcikge1xuICAgIFFKLm9uKG1vbnRoLCAna2V5cHJlc3MnLCByZXN0cmljdE1vbnRoRXhwaXJ5KTtcbiAgICBRSi5vbihtb250aCwgJ2tleXByZXNzJywgZm9ybWF0TW9udGhFeHBpcnkpO1xuICAgIHJldHVybiBRSi5vbih5ZWFyLCAna2V5cHJlc3MnLCByZXN0cmljdFllYXJFeHBpcnkpO1xuICB9O1xuXG4gIFBheW1lbnQuZm9ybWF0Q2FyZE51bWJlciA9IGZ1bmN0aW9uKGVsKSB7XG4gICAgUGF5bWVudC5yZXN0cmljdE51bWVyaWMoZWwpO1xuICAgIFFKLm9uKGVsLCAna2V5cHJlc3MnLCByZXN0cmljdENhcmROdW1iZXIpO1xuICAgIFFKLm9uKGVsLCAna2V5cHJlc3MnLCBmb3JtYXRDYXJkTnVtYmVyKTtcbiAgICBRSi5vbihlbCwgJ2tleWRvd24nLCBmb3JtYXRCYWNrQ2FyZE51bWJlcik7XG4gICAgUUoub24oZWwsICdrZXl1cCcsIHNldENhcmRUeXBlKTtcbiAgICBRSi5vbihlbCwgJ3Bhc3RlJywgcmVGb3JtYXRDYXJkTnVtYmVyKTtcbiAgICByZXR1cm4gZWw7XG4gIH07XG5cbiAgUGF5bWVudC5nZXRDYXJkQXJyYXkgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gY2FyZHM7XG4gIH07XG5cbiAgUGF5bWVudC5zZXRDYXJkQXJyYXkgPSBmdW5jdGlvbihjYXJkQXJyYXkpIHtcbiAgICBjYXJkcyA9IGNhcmRBcnJheTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfTtcblxuICBQYXltZW50LmFkZFRvQ2FyZEFycmF5ID0gZnVuY3Rpb24oY2FyZE9iamVjdCkge1xuICAgIHJldHVybiBjYXJkcy5wdXNoKGNhcmRPYmplY3QpO1xuICB9O1xuXG4gIFBheW1lbnQucmVtb3ZlRnJvbUNhcmRBcnJheSA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgICB2YXIga2V5LCB2YWx1ZTtcbiAgICBmb3IgKGtleSBpbiBjYXJkcykge1xuICAgICAgdmFsdWUgPSBjYXJkc1trZXldO1xuICAgICAgaWYgKHZhbHVlLnR5cGUgPT09IHR5cGUpIHtcbiAgICAgICAgY2FyZHMuc3BsaWNlKGtleSwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIHJldHVybiBQYXltZW50O1xuXG59KSgpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFBheW1lbnQ7XG5cbmdsb2JhbC5QYXltZW50ID0gUGF5bWVudDtcblxuXG59KS5jYWxsKHRoaXMsdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbCA6IHR5cGVvZiBzZWxmICE9PSBcInVuZGVmaW5lZFwiID8gc2VsZiA6IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgPyB3aW5kb3cgOiB7fSlcbn0se1wicWovc3JjL3FqLmNvZmZlZVwiOjF9XX0se30sWzJdKSgyKVxufSk7IiwiLy8gTWlublBvc3QgR2l2aW5nIHBsdWdpblxuLy8gdGhlIHNlbWktY29sb24gYmVmb3JlIGZ1bmN0aW9uIGludm9jYXRpb24gaXMgYSBzYWZldHkgbmV0IGFnYWluc3QgY29uY2F0ZW5hdGVkXG4vLyBzY3JpcHRzIGFuZC9vciBvdGhlciBwbHVnaW5zIHdoaWNoIG1heSBub3QgYmUgY2xvc2VkIHByb3Blcmx5LlxuOyhmdW5jdGlvbiAoICQsIHdpbmRvdywgZG9jdW1lbnQsIHVuZGVmaW5lZCApIHtcblxuICAvLyB1bmRlZmluZWQgaXMgdXNlZCBoZXJlIGFzIHRoZSB1bmRlZmluZWQgZ2xvYmFsIHZhcmlhYmxlIGluIEVDTUFTY3JpcHQgMyBpc1xuICAvLyBtdXRhYmxlIChpZS4gaXQgY2FuIGJlIGNoYW5nZWQgYnkgc29tZW9uZSBlbHNlKS4gdW5kZWZpbmVkIGlzbid0IHJlYWxseSBiZWluZ1xuICAvLyBwYXNzZWQgaW4gc28gd2UgY2FuIGVuc3VyZSB0aGUgdmFsdWUgb2YgaXQgaXMgdHJ1bHkgdW5kZWZpbmVkLiBJbiBFUzUsIHVuZGVmaW5lZFxuICAvLyBjYW4gbm8gbG9uZ2VyIGJlIG1vZGlmaWVkLlxuXG4gIC8vIHdpbmRvdyBhbmQgZG9jdW1lbnQgYXJlIHBhc3NlZCB0aHJvdWdoIGFzIGxvY2FsIHZhcmlhYmxlIHJhdGhlciB0aGFuIGdsb2JhbFxuICAvLyBhcyB0aGlzIChzbGlnaHRseSkgcXVpY2tlbnMgdGhlIHJlc29sdXRpb24gcHJvY2VzcyBhbmQgY2FuIGJlIG1vcmUgZWZmaWNpZW50bHlcbiAgLy8gbWluaWZpZWQgKGVzcGVjaWFsbHkgd2hlbiBib3RoIGFyZSByZWd1bGFybHkgcmVmZXJlbmNlZCBpbiB5b3VyIHBsdWdpbikuXG5cbiAgLy8gQ3JlYXRlIHRoZSBkZWZhdWx0cyBvbmNlXG4gIHZhciBwbHVnaW5OYW1lID0gJ21pbm5wb3N0X2dpdmluZycsXG4gIGRlZmF1bHRzID0ge1xuICAgICdkZWJ1ZycgOiBmYWxzZSwgLy8gdGhpcyBjYW4gYmUgc2V0IHRvIHRydWUgb24gcGFnZSBsZXZlbCBvcHRpb25zXG4gICAgJ3RhYnMnIDogdHJ1ZSwgLy8gYXJlIHdlIGRvaW5nIHRoZSB0YWIgdGhpbmdcbiAgICAnc3RyaXBlX3B1Ymxpc2hhYmxlX2tleScgOiAnJyxcbiAgICAncGxhaWRfZW52JyA6ICcnLFxuICAgICdwbGFpZF9wdWJsaWNfa2V5JyA6ICcnLFxuICAgICdwbGFpZF9saW5rJyA6ICcjYXV0aG9yaXplLWFjaCcsXG4gICAgJ21pbm5wb3N0X3Jvb3QnIDogJ2h0dHBzOi8vd3d3Lm1pbm5wb3N0LmNvbScsXG4gICAgJ2RvbmF0ZV9mb3JtX3NlbGVjdG9yJzogJyNkb25hdGUnLFxuICAgICdyZXZpZXdfc3RlcF9zZWxlY3RvcicgOiAnI3BhbmVsLS1yZXZpZXcnLFxuICAgICdkZXRhaWxzX3N0ZXBfc2VsZWN0b3InIDogJyNwYW5lbC0tZGV0YWlscycsXG4gICAgJ2F0dGVuZGVlc19zdGVwX3NlbGVjdG9yJyA6ICcjcGFuZWwtLWF0dGVuZGVlcycsXG4gICAgJ2RvbmF0ZV9zdGVwX3NlbGVjdG9yJyA6ICcjcGFuZWwtLXBheScsXG4gICAgJ2NvbmZpcm1fZm9ybV9zZWxlY3RvcicgOiAnI2NvbmZpcm0nLFxuICAgICdjb25maXJtX3N0ZXBfc2VsZWN0b3InIDogJyNwYW5lbC0tY29uZmlybWF0aW9uJyxcbiAgICAnYWN0aXZlJyA6ICdwYW5lbC0tcGF5JyxcbiAgICAnY29uZmlybScgOiAncGFuZWwtLWNvbmZpcm1hdGlvbicsXG4gICAgJ3F1ZXJ5JyA6ICdzdGVwJyxcbiAgICAncGF5X2NjX3Byb2Nlc3Npbmdfc2VsZWN0b3InIDogJ2lucHV0W2lkPVwiZWRpdC1wYXktZmVlc1wiXScsXG4gICAgJ2ZlZV9hbW91bnQnIDogJy5wcm9jZXNzaW5nLWFtb3VudCcsXG4gICAgJ2xldmVsX2Ftb3VudF9zZWxlY3RvcicgOiAnI3BhbmVsLS1yZXZpZXcgLmFtb3VudCAubGV2ZWwtYW1vdW50JyxcbiAgICAnb3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yJyA6ICcjYW1vdW50JyxcbiAgICAnZnJlcXVlbmN5X3NlbGVjdG9yJyA6ICcuZnJlcXVlbmN5JyxcbiAgICAnZnVsbF9hbW91bnRfc2VsZWN0b3InIDogJy5mdWxsLWFtb3VudCcsXG4gICAgJ2xldmVsX2luZGljYXRvcl9zZWxlY3RvcicgOiAnaDIubGV2ZWwnLFxuICAgICdsZXZlbF9uYW1lX3NlbGVjdG9yJyA6ICcubGV2ZWwtbmFtZScsXG4gICAgJ3Jldmlld19iZW5lZml0c19zZWxlY3RvcicgOiAnLnJldmlldy1iZW5lZml0cycsXG4gICAgJ2FsbG93X3Vwc2VsbCcgOiB0cnVlLFxuICAgICd1cHNlbGxfYnRuX3NlbGVjdG9yJyA6ICcuYnRuLS11cHNlbGwnLFxuICAgICd1cHNlbGxfc2VsZWN0b3InIDogJy53ZWxsLS11cHNlbGwnLFxuICAgICd1cHNlbGxfYW1vdW50X3NlbGVjdG9yJyA6ICcudXBzZWxsLWFtb3VudCcsXG4gICAgJ3N3YWdfc2VsZWN0b3InIDogJy5zd2FnJyxcbiAgICAnc3dhZ19kZWNsaW5lX3NlbGVjdG9yJyA6ICcjc3dhZy1ubycsXG4gICAgJ3N3YWdfbnl0X3NlbGVjdG9yJyA6ICdpbnB1dFtuYW1lPVwibnl0XCJdJyxcbiAgICAnc2VwYXJhdGVfc3dhZ19zZWxlY3RvcicgOiAnZmllbGRzZXQuc3dhZy0tc2VwYXJhdGUnLFxuICAgICdzZXBhcmF0ZV9zd2FnX3JlZGVlbScgOiAnLnN3YWctcmVkZWVtLS1zZXBhcmF0ZScsXG4gICAgJ3N3YWdfc2VsZWN0b3JfY2hvb3NlX211bHRpcGxlJyA6ICcuc3dhZy0tY2hvb3NlLW11bHRpcGxlJyxcbiAgICAnc3dhZ19jaG9vc2VfbXVsdGlwbGVfbmFtZScgOiAnc3dhZ190aGFua3lvdScsXG4gICAgJ2F0bGFudGljX3N0YXR1cycgOiAnaW5wdXRbbmFtZT1cInN3YWdfYXRsYW50aWNzdWJzY3JpcHRpb25cIl0nLFxuICAgICdhdGxhbnRpY19leGlzdGluZycgOiAnI2F0bGFudGljX2V4aXN0aW5nJyxcbiAgICAnYXRsYW50aWNfc2VsZWN0b3InIDogJy5mb3JtLWl0ZW0tLWF0bGFudGljX2lkJyxcbiAgICAnbmFtZV9zZWxlY3RvcicgOiAnLmZvcm0taXRlbS0tZGlzcGxheS1uYW1lJyxcbiAgICAnaG9ub3JfbWVtb3J5X25hbWVfc2VsZWN0b3InIDogJy5mb3JtLWl0ZW0tLWhvbm9yLW1lbW9yeScsXG4gICAgJ2hvbm9yX29yX21lbW9yeV9jaG9vc2VyJyA6ICdpbnB1dFtuYW1lPVwiaW4taG9ub3Itb3ItbWVtb3J5XCJdJyxcbiAgICAnaG9ub3JfbmFtZV9zZWxlY3RvcicgOiAnLmhvbm9yJyxcbiAgICAnbWVtb3J5X25hbWVfc2VsZWN0b3InIDogJy5tZW1vcnknLFxuICAgICdob25vcl9zZWxlY3RvcicgOiAnI2VkaXQtaW4taG9ub3InLFxuICAgICdtZW1vcnlfc2VsZWN0b3InIDogJyNlZGl0LWluLW1lbW9yeScsXG4gICAgJ25vdGlmeV9zZWxlY3RvcicgOiAnLm5vdGlmeV9zb21lb25lJyxcbiAgICAnbm90aWZ5X2ZpZWxkX3NlbGVjdG9yJyA6ICcuZm9ybS1pdGVtLS1ub3RpZnknLFxuICAgICdhbm9ueW1vdXNfc2VsZWN0b3InIDogJyNlZGl0LWFub255bW91cycsXG4gICAgJ3Nob3dfYmlsbGluZ19jb3VudHJ5X3NlbGVjdG9yJyA6ICcjYmlsbGluZ19zaG93X2NvdW50cnknLFxuICAgICdiaWxsaW5nX2NvdW50cnlfc2VsZWN0b3InIDogJy5mb3JtLWl0ZW0tLWNvdW50cnknLFxuICAgICdzaG93X3NoaXBwaW5nX2NvdW50cnlfc2VsZWN0b3InIDogJyNzaGlwcGluZ19zaG93X2NvdW50cnknLFxuICAgICdzaGlwcGluZ19jb3VudHJ5X3NlbGVjdG9yJyA6ICcuZm9ybS1pdGVtLS1zaGlwcGluZy1jb3VudHJ5JyxcbiAgICAvLyduZWVkc19zaGlwcGluZ19zZWxlY3RvcicgOiAnLnN3YWctLXNoaXBwaW5nJyxcbiAgICAnc2hpcHBpbmdfYWRkcmVzc19zZWxlY3RvcicgOiAnLmZvcm0taXRlbS0tc2hpcHBpbmctYWRkcmVzcycsXG4gICAgJ3VzZV9mb3Jfc2hpcHBpbmdfc2VsZWN0b3InIDogJyN1c2Vmb3JzaGlwcGluZycsXG4gICAgJ2VtYWlsX2ZpZWxkX3NlbGVjdG9yJyA6ICcjZWRpdC1lbWFpbCcsXG4gICAgJ3Bhc3N3b3JkX2ZpZWxkX3NlbGVjdG9yJyA6ICcjcGFzc3dvcmQnLFxuICAgICdmaXJzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yJyA6ICcjZmlyc3RfbmFtZScsXG4gICAgJ2xhc3RfbmFtZV9maWVsZF9zZWxlY3RvcicgOiAnI2xhc3RfbmFtZScsXG4gICAgJ2FjY291bnRfY2l0eV9zZWxlY3RvcicgOiAnI2JpbGxpbmdfY2l0eScsXG4gICAgJ2FjY291bnRfc3RhdGVfc2VsZWN0b3InIDogJyNiaWxsaW5nX3N0YXRlJyxcbiAgICAnYWNjb3VudF96aXBfc2VsZWN0b3InIDogJyNiaWxsaW5nX3ppcCcsXG4gICAgJ2NyZWF0ZV9tcF9zZWxlY3RvcicgOiAnI2NyZWF0ZW1wYWNjb3VudCcsXG4gICAgJ3Bhc3N3b3JkX3NlbGVjdG9yJyA6ICcuZm9ybS1pdGVtLS1wYXNzd29yZCcsXG4gICAgJ2NhbGN1bGF0ZWRfYW1vdW50X3NlbGVjdG9yJyA6ICcuY2FsY3VsYXRlZC1hbW91bnQnLFxuICAgICdxdWFudGl0eV9maWVsZCcgOiAnI3F1YW50aXR5JyxcbiAgICAncXVhbnRpdHlfc2VsZWN0b3InIDogJy5xdWFudGl0eScsXG4gICAgJ2l0ZW1fc2VsZWN0b3InOiAnLnB1cmNoYXNlLWl0ZW0nLFxuICAgICdzaW5nbGVfdW5pdF9wcmljZV9hdHRyaWJ1dGUnIDogJ3VuaXQtcHJpY2UnLFxuICAgICdhZGRpdGlvbmFsX2Ftb3VudF9maWVsZCcgOiAnI2FkZGl0aW9uYWxfZG9uYXRpb24nLFxuICAgICdhZGRpdGlvbmFsX2Ftb3VudF9zZWxlY3RvcicgOiAnLmFkZGl0aW9uYWxfZG9uYXRpb24nLFxuICAgICdoYXNfYWRkaXRpb25hbF90ZXh0X3NlbGVjdG9yJyA6ICcuaGFzX2FkZGl0aW9uYWwnLFxuICAgICdwcm9tb19zZWxlY3RvcicgOiAnLmZvcm0taXRlbS0tcHJvbW8tY29kZScsXG4gICAgJ3VzZV9wcm9tb2NvZGVfc2VsZWN0b3InIDogJyN1c2UtcHJvbW8tY29kZScsXG4gICAgJ3Byb21vY29kZV9zZWxlY3RvcicgOiAnI3Byb21vX2NvZGUnLFxuICAgICdldmVudF9pZF9zZWxlY3RvcicgOiAnI2V2ZW50JyxcbiAgICAnY2FsZW5kYXJfYnV0dG9uX3NlbGVjdG9yJyA6ICcuYWRkZXZlbnRhdGMnLFxuICAgICdiaWxsaW5nX3NlbGVjdG9yJyA6ICdmaWVsZHNldC5iaWxsaW5nJyxcbiAgICAnc2hpcHBpbmdfc2VsZWN0b3InIDogJ2ZpZWxkc2V0LnNoaXBwaW5nJyxcbiAgICAnY3JlZGl0X2NhcmRfZmllbGRzZXQnIDogJy5wYXltZW50LW1ldGhvZC1ncm91cCcsXG4gICAgJ2Nob29zZV9wYXltZW50JyA6ICcjY2hvb3NlLXBheW1lbnQtbWV0aG9kJyxcbiAgICAncGF5bWVudF9tZXRob2Rfc2VsZWN0b3InIDogJy5wYXltZW50LW1ldGhvZCcsXG4gICAgJ2NjX251bV9zZWxlY3RvcicgOiAnI2NhcmQtbnVtYmVyJyxcbiAgICAnY2NfZXhwX3NlbGVjdG9yJyA6ICcjY2FyZC1leHBpcnknLFxuICAgICdjY19jdnZfc2VsZWN0b3InIDogJyNjYXJkLWN2YycsXG4gICAgJ3BheW1lbnRfYnV0dG9uX3NlbGVjdG9yJyA6ICcjc3VibWl0JyxcbiAgICAnY29uZmlybV9idXR0b25fc2VsZWN0b3InIDogJyNmaW5pc2gnLFxuICAgICdvcHBfaWRfc2VsZWN0b3InIDogJyNmbGFza19pZCcsXG4gICAgJ3JlY3VycmluZ19zZWxlY3RvcicgOiAnI3JlY3VycmluZycsXG4gICAgJ25ld3NsZXR0ZXJfZ3JvdXBfc2VsZWN0b3InIDogJy5mb3JtLWl0ZW0tLW5ld3NsZXR0ZXIgaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJyxcbiAgICAnbWVzc2FnZV9ncm91cF9zZWxlY3RvcicgOiAnLmZvcm0taXRlbS0tb3B0aW9uYWwgaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJyxcbiAgICAncmVhc29uX2ZpZWxkX3NlbGVjdG9yJyA6ICcjcmVhc29uX2Zvcl9zdXBwb3J0aW5nJyxcbiAgICAnc2hhcmVfcmVhc29uX3NlbGVjdG9yJyA6ICcjcmVhc29uX3NoYXJlYWJsZScsXG4gICAgJ2NvbmZpcm1fdG9wX3NlbGVjdG9yJyA6ICcuc3VwcG9ydC0tcG9zdC1jb25maXJtJyxcbiAgICAnZXhpc3RpbmdfbmV3c2xldHRlcl9zZXR0aW5ncycgOiAnJyxcbiAgICAnbGV2ZWxzJyA6IHtcbiAgICAgIDEgOiB7XG4gICAgICAgICduYW1lJyA6ICdicm9uemUnLFxuICAgICAgICAnbWF4JyA6IDYwXG4gICAgICB9LFxuICAgICAgMiA6IHtcbiAgICAgICAgJ25hbWUnIDogJ3NpbHZlcicsXG4gICAgICAgICdtaW4nIDogNjAsXG4gICAgICAgICdtYXgnIDogMTIwXG4gICAgICB9LFxuICAgICAgMyA6IHtcbiAgICAgICAgJ25hbWUnIDogJ2dvbGQnLFxuICAgICAgICAnbWluJyA6IDEyMCxcbiAgICAgICAgJ21heCcgOiAyNDBcbiAgICAgIH0sXG4gICAgICA0IDoge1xuICAgICAgICAnbmFtZScgOiAncGxhdGludW0nLFxuICAgICAgICAnbWluJyA6IDI0MFxuICAgICAgfVxuICAgIH0sXG4gICAgJ3Vwc2VsbCcgOiB7XG4gICAgICAnYnJvbnplJyA6IHRydWUsXG4gICAgICAnc2lsdmVyJyA6IDksXG4gICAgICAnZ29sZCcgOiAxOSxcbiAgICAgICdwbGF0aW51bScgOiBmYWxzZVxuICAgIH0sXG5cbiAgfTsgLy8gZW5kIGRlZmF1bHRzXG5cbiAgLy8gVGhlIGFjdHVhbCBwbHVnaW4gY29uc3RydWN0b3JcbiAgZnVuY3Rpb24gUGx1Z2luKCBlbGVtZW50LCBvcHRpb25zICkge1xuXG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcblxuICAgIC8vIGpRdWVyeSBoYXMgYW4gZXh0ZW5kIG1ldGhvZCB3aGljaCBtZXJnZXMgdGhlIGNvbnRlbnRzIG9mIHR3byBvclxuICAgIC8vIG1vcmUgb2JqZWN0cywgc3RvcmluZyB0aGUgcmVzdWx0IGluIHRoZSBmaXJzdCBvYmplY3QuIFRoZSBmaXJzdCBvYmplY3RcbiAgICAvLyBpcyBnZW5lcmFsbHkgZW1wdHkgYXMgd2UgZG9uJ3Qgd2FudCB0byBhbHRlciB0aGUgZGVmYXVsdCBvcHRpb25zIGZvclxuICAgIC8vIGZ1dHVyZSBpbnN0YW5jZXMgb2YgdGhlIHBsdWdpblxuICAgIHRoaXMub3B0aW9ucyA9ICQuZXh0ZW5kKCB7fSwgZGVmYXVsdHMsIG9wdGlvbnMgKTtcblxuICAgIHRoaXMuX2RlZmF1bHRzID0gZGVmYXVsdHM7XG4gICAgdGhpcy5fbmFtZSA9IHBsdWdpbk5hbWU7XG5cbiAgICB0aGlzLmluaXQoKTtcbiAgfSAvLyBlbmQgY29uc3RydWN0b3JcblxuICBQbHVnaW4ucHJvdG90eXBlID0ge1xuXG4gICAgaW5pdDogZnVuY3Rpb24ocmVzZXQsIGFtb3VudCkge1xuXG4gICAgICAvLyBQbGFjZSBpbml0aWFsaXphdGlvbiBsb2dpYyBoZXJlXG4gICAgICAvLyBZb3UgYWxyZWFkeSBoYXZlIGFjY2VzcyB0byB0aGUgRE9NIGVsZW1lbnQgYW5kXG4gICAgICAvLyB0aGUgb3B0aW9ucyB2aWEgdGhlIGluc3RhbmNlLCBlLmcuIHRoaXMuZWxlbWVudFxuICAgICAgLy8gYW5kIHRoaXMub3B0aW9uc1xuICAgICAgLy8geW91IGNhbiBhZGQgbW9yZSBmdW5jdGlvbnMgbGlrZSB0aGUgb25lIGJlbG93IGFuZFxuICAgICAgLy8gY2FsbCB0aGVtIGxpa2Ugc286IHRoaXMueW91ck90aGVyRnVuY3Rpb24odGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpLlxuXG4gICAgICAvLyBtb2RpZnkgb3B0aW9ucyBhcyBuZWVkZWRcbiAgICAgIC8vdmFyIHRoaXMub3B0aW9ucy5hbW91bnQgPSAnJztcbiAgICAgIGlmIChyZXNldCAhPT0gdHJ1ZSkge1xuICAgICAgICB0aGlzLm9wdGlvbnMuYW1vdW50ID0gcGFyc2VGbG9hdCgkKHRoaXMub3B0aW9ucy5sZXZlbF9hbW91bnRfc2VsZWN0b3IsIHRoaXMuZWxlbWVudCkudGV4dCgpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5hbW91bnQgPSBhbW91bnQ7XG4gICAgICB9XG4gICAgICB0aGlzLm9wdGlvbnMub3JpZ2luYWxfYW1vdW50ID0gcGFyc2VJbnQoJCh0aGlzLm9wdGlvbnMub3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yLCB0aGlzLmVsZW1lbnQpLnZhbCgpLCAxMCk7XG4gICAgICB0aGlzLm9wdGlvbnMuZnJlcXVlbmN5ID0gcGFyc2VGbG9hdCgkKHRoaXMub3B0aW9ucy5mcmVxdWVuY3lfc2VsZWN0b3IsIHRoaXMuZWxlbWVudCkuYXR0cignZGF0YS15ZWFyLWZyZXEnKSk7XG4gICAgICB2YXIgcmVjdXJyaW5nID0gJCh0aGlzLm9wdGlvbnMucmVjdXJyaW5nX3NlbGVjdG9yLCB0aGlzLmVsZW1lbnQpLnZhbCgpO1xuICAgICAgaWYgKHR5cGVvZiByZWN1cnJpbmcgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5yZWN1cnJpbmcgPSByZWN1cnJpbmcuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyByZWN1cnJpbmcuc2xpY2UoMSk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIHRoaXMub3B0aW9ucy5wcm9jZXNzaW5nX2ZlZSA9IChNYXRoLnJvdW5kKHBhcnNlRmxvYXQodGhpcy5vcHRpb25zLmZlZV9hbW91bnQpKk1hdGgucG93KDEwLDIpKS9NYXRoLnBvdygxMCwyKSkudG9GaXhlZCgyKTtcbiAgICAgIHRoaXMub3B0aW9ucy5wcm9jZXNzaW5nX2ZlZV90ZXh0ID0gdGhpcy5vcHRpb25zLnByb2Nlc3NpbmdfZmVlO1xuICAgICAgXG4gICAgICB0aGlzLm9wdGlvbnMudXBzZWxsX2Ftb3VudCA9IHBhcnNlRmxvYXQoJCh0aGlzLm9wdGlvbnMudXBzZWxsX2Ftb3VudF9zZWxlY3RvciwgdGhpcy5lbGVtZW50KS50ZXh0KCkpO1xuICAgICAgdGhpcy5vcHRpb25zLnVwc29sZCA9IHRoaXMub3B0aW9ucy5hbW91bnQgKyB0aGlzLm9wdGlvbnMudXBzZWxsX2Ftb3VudDtcbiAgICAgIHRoaXMub3B0aW9ucy5jYXJkVHlwZSA9IG51bGw7XG4gICAgICB0aGlzLm9wdGlvbnMuY3JlYXRlX2FjY291bnQgPSBmYWxzZTtcblxuICAgICAgdmFyIGJ1dHRvbl90ZXh0ID0gJCgnYnV0dG9uLmdpdmUsIGlucHV0LmdpdmUnKS50ZXh0KCk7XG4gICAgICB0aGlzLm9wdGlvbnMuYnV0dG9uX3RleHQgPSBidXR0b25fdGV4dDtcblxuICAgICAgdGhpcy5zdHJpcGUgPSBTdHJpcGUodGhpcy5vcHRpb25zLnN0cmlwZV9wdWJsaXNoYWJsZV9rZXkpO1xuICAgICAgdGhpcy5lbGVtZW50cyA9IHRoaXMuc3RyaXBlLmVsZW1lbnRzKCk7XG5cbiAgICAgIC8vIHVzZSBhIHJlZmVycmVyIGZvciBlZGl0IGxpbmsgaWYgd2UgaGF2ZSBvbmVcbiAgICAgIGlmIChkb2N1bWVudC5yZWZlcnJlciAhPT0gJycpIHtcbiAgICAgICAgJCgnI2VkaXRfdXJsJykucHJvcCgnaHJlZicsIGRvY3VtZW50LnJlZmVycmVyKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5kZWJ1ZyA9PT0gdHJ1ZSkge1xuICAgICAgICB0aGlzLmRlYnVnKHRoaXMub3B0aW9ucyk7XG4gICAgICAgIC8vIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gdGFiIHN0dWZmXG4gICAgICB2YXIgcXVlcnlfcGFuZWwgPSB0aGlzLnFzW3RoaXMub3B0aW9ucy5xdWVyeV07XG4gICAgICBpZiAodHlwZW9mIHF1ZXJ5X3BhbmVsID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBxdWVyeV9wYW5lbCA9IHRoaXMub3B0aW9ucy5hY3RpdmU7XG4gICAgICB9XG5cbiAgICAgIC8vIGNhbGwgZnVuY3Rpb25zXG5cbiAgICAgIHRoaXMucGF5bWVudFBhbmVscyhxdWVyeV9wYW5lbCk7IC8vIHRhYnNcblxuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLnBheV9jY19wcm9jZXNzaW5nX3NlbGVjdG9yKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuY3JlZGl0Q2FyZFByb2Nlc3NpbmdGZWVzKHRoaXMub3B0aW9ucywgcmVzZXQpOyAvLyBwcm9jZXNzaW5nIGZlZXNcbiAgICAgIH1cblxuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmRldGFpbHNfc3RlcF9zZWxlY3RvcikubGVuZ3RoID4gMCB8fCAkKHRoaXMub3B0aW9ucy5yZXZpZXdfc3RlcF9zZWxlY3RvcikubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLm9wdGlvbnMubGV2ZWwgPSB0aGlzLmNoZWNrTGV2ZWwodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMsICduYW1lJyk7IC8vIGNoZWNrIHdoYXQgbGV2ZWwgaXQgaXNcbiAgICAgICAgdGhpcy5vcHRpb25zLmxldmVsbnVtID0gdGhpcy5jaGVja0xldmVsKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zLCAnbnVtJyk7IC8vIGNoZWNrIHdoYXQgbGV2ZWwgaXQgaXMgYXMgYSBudW1iZXJcbiAgICAgICAgdGhpcy5ob25vck9yTWVtb3J5KHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gaW4gaG9ub3Igb3IgaW4gbWVtb3J5IG9mIHNvbWVvbmVcbiAgICAgICAgdGhpcy5zd2FnKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zLCBmYWxzZSk7IC8vIG1hbmFnZSBzd2FnIGRpc3BsYXlcbiAgICAgICAgdGhpcy51cHNlbGwodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMsIHRoaXMub3B0aW9ucy5hbW91bnQsIHRoaXMub3B0aW9ucy5mcmVxdWVuY3kpOyAvLyB1cHNlbGwgdG8gbmV4dCBsZXZlbFxuICAgICAgfVxuICAgICAgXG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuZG9uYXRlX3N0ZXBfc2VsZWN0b3IpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5kb25hdGVBbm9ueW1vdXNseSh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIGFub255bW91c1xuICAgICAgICB0aGlzLm91dHNpZGVVbml0ZWRTdGF0ZXModGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBvdXRzaWRlIFVTXG4gICAgICAgIHRoaXMuc2hpcHBpbmdBZGRyZXNzKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gc2hpcHBpbmcgYWRkcmVzc1xuICAgICAgICB0aGlzLmFsbG93TWlubnBvc3RBY2NvdW50KHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zLCBmYWxzZSk7IC8vIG9wdGlvbiBmb3IgY3JlYXRpbmcgbWlubnBvc3QgYWNjb3VudFxuICAgICAgICB0aGlzLmNob29zZVBheW1lbnRNZXRob2QodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBzd2l0Y2ggYmV0d2VlbiBjYXJkIGFuZCBhY2hcbiAgICAgICAgdGhpcy5jcmVkaXRDYXJkRmllbGRzKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gZG8gc3R1ZmYgd2l0aCB0aGUgY3JlZGl0IGNhcmQgZmllbGRzXG4gICAgICAgIHRoaXMuYWNoRmllbGRzKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gZG8gc3R1ZmYgZm9yIGFjaCBwYXltZW50cywgaWYgYXBwbGljYWJsZSB0byB0aGUgZm9ybVxuICAgICAgICB0aGlzLnZhbGlkYXRlQW5kU3VibWl0KHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gdmFsaWRhdGUgYW5kIHN1Ym1pdCB0aGUgZm9ybVxuICAgICAgfVxuXG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuY2FsY3VsYXRlZF9hbW91bnRfc2VsZWN0b3IpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5jYWxjdWxhdGVBbW91bnQodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMsICcnKTsgLy9cbiAgICAgIH0gLy8gY2FsY3VsYXRlIGFtb3VudCBiYXNlZCBvbiBxdWFudGl0eVxuXG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMudXNlX3Byb21vY29kZV9zZWxlY3RvcikubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLnVzZVByb21vQ29kZSh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIGhhbmRsZSBwcm9tbyBjb2RlIGZpZWxkXG4gICAgICB9IC8vIGFsbG93IHVzZXJzIHRvIGVudGVyIGEgcHJvbW8gY29kZSBvbiBhIHBhZ2VcblxuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmNhbGVuZGFyX2J1dHRvbl9zZWxlY3RvcikubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLmFkZFRvQ2FsZW5kYXIodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpO1xuICAgICAgfSAvLyB0aGVyZSBpcyBhbiBldmVudCBkZXRhaWxzIGl0ZW07IGFsbG93IGZvciBhbiBhZGQgdG8gY2FsZW5kYXIgYnV0dG9uXG5cbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5jb25maXJtX3N0ZXBfc2VsZWN0b3IpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5zaG93TmV3c2xldHRlclNldHRpbmdzKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTtcbiAgICAgICAgdGhpcy5jb25maXJtTWVzc2FnZVN1Ym1pdCh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIHN1Ym1pdCB0aGUgc3R1ZmYgb24gdGhlIGNvbmZpcm1hdGlvbiBwYWdlXG4gICAgICB9XG5cbiAgICB9LCAvLyBpbml0XG5cbiAgICBxczogKGZ1bmN0aW9uKGEpIHtcbiAgICAgIGlmIChhID09PSAnJykge1xuICAgICAgICByZXR1cm4ge307XG4gICAgICB9XG4gICAgICB2YXIgYiA9IHt9O1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBhLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBwPWFbaV0uc3BsaXQoJz0nLCAyKTtcbiAgICAgICAgaWYgKHAubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgYltwWzBdXSA9ICcnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJbcFswXV0gPSBkZWNvZGVVUklDb21wb25lbnQocFsxXS5yZXBsYWNlKC9cXCsvZywgJyAnKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBiO1xuICAgIH0pKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2guc3Vic3RyKDEpLnNwbGl0KCcmJykpLFxuXG4gICAgZGVidWc6IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuZGVidWcgPT09IHRydWUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZGlyKG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUuZGlyKHRoaXMpO1xuICAgICAgfVxuICAgIH0sIC8vIGRlYnVnXG5cbiAgICBnZXRRdWVyeVN0cmluZ3M6IGZ1bmN0aW9uKGxpbmspIHtcbiAgICAgIGlmICh0eXBlb2YgbGluayA9PT0gJ3VuZGVmaW5lZCcgfHwgbGluayA9PT0gJycpIHtcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGluayA9ICc/JyArIGxpbmsuc3BsaXQoJz8nKVsxXTtcbiAgICAgICAgbGluayA9IGxpbmsuc3Vic3RyKDEpLnNwbGl0KCcmJyk7XG4gICAgICB9XG4gICAgICB2YXIgYiA9IHt9O1xuICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaW5rLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBwPWxpbmtbaV0uc3BsaXQoJz0nLCAyKTtcbiAgICAgICAgaWYgKHAubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgYltwWzBdXSA9ICcnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJbcFswXV0gPSBkZWNvZGVVUklDb21wb25lbnQocFsxXS5yZXBsYWNlKC9cXCsvZywgJyAnKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBiO1xuICAgIH0sIC8vIGdldFF1ZXJ5U3RyaW5nc1xuXG4gICAgcGF5bWVudFBhbmVsczogZnVuY3Rpb24oYWN0aXZlKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB2YXIgdXNldGFicyA9IHRoaXMub3B0aW9ucy50YWJzO1xuICAgICAgdmFyIHRpdGxlID0gJ01pbm5Qb3N0IHwgU3VwcG9ydCBVcyB8ICc7XG4gICAgICB2YXIgcGFnZSA9ICQoJy5wcm9ncmVzcy0tZG9uYXRpb24gbGkuJyArIGFjdGl2ZSkudGV4dCgpO1xuICAgICAgdmFyIG5leHQgPSAkKCcucHJvZ3Jlc3MtLWRvbmF0aW9uIGxpLicgKyBhY3RpdmUpLm5leHQoKS50ZXh0KCk7XG4gICAgICB2YXIgc3RlcCA9ICQoJy5wcm9ncmVzcy0tZG9uYXRpb24gbGkuJyArIGFjdGl2ZSkuaW5kZXgoKSArIDE7XG4gICAgICB2YXIgbmF2X2l0ZW1fY291bnQgPSAkKCcucHJvZ3Jlc3MtLWRvbmF0aW9uIGxpJykubGVuZ3RoO1xuICAgICAgdmFyIG9wcF9pZCA9ICQodGhpcy5vcHRpb25zLm9wcF9pZF9zZWxlY3RvcikudmFsKCk7XG4gICAgICB2YXIgbmV4dF9zdGVwID0gc3RlcCArIDE7XG4gICAgICB2YXIgcG9zdF9wdXJjaGFzZSA9IGZhbHNlO1xuXG4gICAgICB0aGlzLmRlYnVnKCAnc3RlcCBpcyAnICsgc3RlcCArICcgYW5kIG5hdiBpdGVtIGNvdW50IGlzICcgKyBuYXZfaXRlbV9jb3VudCArICcgYW5kIG9wcCBpZCBpcyAnICsgb3BwX2lkICsgJyBhbmQgbmV4dCBzdGVwIGlzICcgKyBuZXh0X3N0ZXAgKTtcblxuICAgICAgLy8gdGhpcyBpcyB0aGUgbGFzdCB2aXNpYmxlIHN0ZXBcbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5jb25maXJtX3N0ZXBfc2VsZWN0b3IpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgYWN0aXZlID0gdGhpcy5vcHRpb25zLmNvbmZpcm07XG4gICAgICAgICQoJy5wcm9ncmVzcy0tZG9uYXRpb24gbGkuJyArIGFjdGl2ZSArICcgc3BhbicpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgc3RlcCA9ICQoJy5wcm9ncmVzcy0tZG9uYXRpb24gbGkuJyArIGFjdGl2ZSkuaW5kZXgoKSArIDE7XG4gICAgICAgIC8vIHRoZXJlIGlzIGEgY29udGludWF0aW9uIG9mIHRoZSBtYWluIGZvcm0gb24gdGhpcyBwYWdlLiB0aGVyZSBpcyBhIGJ1dHRvbiB0byBjbGlja1xuICAgICAgICAvLyB0aGlzIG1lYW5zIHRoZXJlIGlzIGFub3RoZXIgc3RlcFxuICAgICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuY29uZmlybV9idXR0b25fc2VsZWN0b3IpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBuYXZfaXRlbV9jb3VudCArPSAxO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGVwID09PSBuYXZfaXRlbV9jb3VudCAtIDEgJiYgJCh0aGlzLm9wdGlvbnMub3BwX2lkX3NlbGVjdG9yKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuZGVidWcoJ3RoaXMgaXMgYSBwYXltZW50IHN0ZXAgYnV0IHRoZXJlIGlzIGEgc3RlcCBhZnRlciBpdCcpO1xuICAgICAgICBzdGVwID0gJ3B1cmNoYXNlJztcbiAgICAgIH0gZWxzZSBpZiAoc3RlcCA9PT0gbmF2X2l0ZW1fY291bnQgJiYgJCh0aGlzLm9wdGlvbnMub3BwX2lkX3NlbGVjdG9yKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuZGVidWcoJ3RoaXMgaXMgYSBwYXltZW50IHN0ZXAgYW5kIHRoZXJlIGlzIG5vIHN0ZXAgYWZ0ZXIgaXQnKTtcbiAgICAgICAgc3RlcCA9ICdwdXJjaGFzZSc7XG4gICAgICB9IGVsc2UgaWYgKHN0ZXAgPT09IG5hdl9pdGVtX2NvdW50ICYmICQodGhpcy5vcHRpb25zLm9wcF9pZF9zZWxlY3RvcikubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHRoaXMuZGVidWcoJ3RoaXMgaXMgYSBwb3N0LWZpbmlzaCBzdGVwLiBpdCBkb2VzIG5vdCBoYXZlIGFuIGlkJyk7XG4gICAgICAgIHN0ZXAgPSBzdGVwICsgMTtcbiAgICAgICAgcG9zdF9wdXJjaGFzZSA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGRvY3VtZW50LnRpdGxlID0gdGl0bGUgKyBwYWdlO1xuICAgICAgdGhpcy5hbmFseXRpY3NUcmFja2luZ1N0ZXAoc3RlcCwgdGl0bGUsIHBvc3RfcHVyY2hhc2UpO1xuXG4gICAgICAvLyBtYWtlIHNvbWUgdGFicyBmb3IgZm9ybVxuICAgICAgaWYgKHVzZXRhYnMgPT09IHRydWUpIHtcbiAgICAgICAgJCgnLnBhbmVsJykuaGlkZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJCgnLnBhbmVsJykuc2hvdygpO1xuICAgICAgfVxuICAgICAgLy8gYWN0aXZhdGUgdGhlIHRhYnNcbiAgICAgIGlmICgkKCcucHJvZ3Jlc3MtLWRvbmF0aW9uIGxpIC5hY3RpdmUnKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgJCgnIycgKyBhY3RpdmUpLnNob3coKTtcbiAgICAgICAgJCgnLnByb2dyZXNzLS1kb25hdGlvbiBsaS4nICsgYWN0aXZlICsgJyBhJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWN0aXZlID0gJCgnLnByb2dyZXNzLS1kb25hdGlvbiBsaSAuYWN0aXZlJykucGFyZW50KCkucHJvcCgnY2xhc3MnKTtcbiAgICAgICAgJCgnIycgKyBhY3RpdmUpLnNob3coKTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLyokKCcucHJvZ3Jlc3MtLWRvbmF0aW9uIGxpIGEsIGEuYnRuLmJ0bi0tbmV4dCcpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICQoJy5wcm9ncmVzcy0tZG9uYXRpb24gbGkgYScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgdmFyIGxpbmsgPSAkKHRoaXMpLnByb3AoJ2hyZWYnKTtcbiAgICAgICAgdmFyIHF1ZXJ5ID0gdGhhdC5nZXRRdWVyeVN0cmluZ3MobGluayk7XG4gICAgICAgIHF1ZXJ5ID0gcXVlcnlbJ3N0ZXAnXTtcbiAgICAgICAgJCgnLnByb2dyZXNzLS1kb25hdGlvbiBsaS4nICsgcXVlcnkgKyAnIGEnKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIHRoYXQucGF5bWVudFBhbmVscyhxdWVyeSk7ICAgIFxuICAgICAgfSk7Ki9cbiAgICB9LCAvLyBwYXltZW50UGFuZWxzXG5cbiAgICBhbmFseXRpY3NUcmFja2luZ1N0ZXA6IGZ1bmN0aW9uKHN0ZXAsIHRpdGxlLCBwb3N0X3B1cmNoYXNlKSB7XG4gICAgICB2YXIgbGV2ZWwgPSB0aGlzLmNoZWNrTGV2ZWwodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMsICduYW1lJyk7IC8vIGNoZWNrIHdoYXQgbGV2ZWwgaXQgaXNcbiAgICAgIHZhciBsZXZlbG51bSA9IHRoaXMuY2hlY2tMZXZlbCh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucywgJ251bScpOyAvLyBjaGVjayB3aGF0IGxldmVsIGl0IGlzIGFzIGEgbnVtYmVyXG4gICAgICB2YXIgYW1vdW50ID0gJCh0aGlzLm9wdGlvbnMub3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yKS52YWwoKTtcbiAgICAgIHZhciByZWN1cnJpbmcgPSB0aGlzLm9wdGlvbnMucmVjdXJyaW5nO1xuICAgICAgdmFyIG9wcF9pZCA9ICQodGhpcy5vcHRpb25zLm9wcF9pZF9zZWxlY3RvcikudmFsKCk7XG5cbiAgICAgIC8vIGlmIHdlJ3JlIG5vdCBhZnRlciB0aGUgcHVyY2hhc2UsIHVzZSBhZGRQcm9kdWN0XG4gICAgICBpZiAoIHBvc3RfcHVyY2hhc2UgIT09IHRydWUgKSB7XG4gICAgICAgIGdhKCdlYzphZGRQcm9kdWN0Jywge1xuICAgICAgICAgICdpZCc6ICdtaW5ucG9zdF8nICsgbGV2ZWwudG9Mb3dlckNhc2UoKSArICdfbWVtYmVyc2hpcCcsXG4gICAgICAgICAgJ25hbWUnOiAnTWlublBvc3QgJyArIGxldmVsLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgbGV2ZWwuc2xpY2UoMSkgKyAnIE1lbWJlcnNoaXAnLFxuICAgICAgICAgICdjYXRlZ29yeSc6ICdEb25hdGlvbicsXG4gICAgICAgICAgJ2JyYW5kJzogJ01pbm5Qb3N0JyxcbiAgICAgICAgICAndmFyaWFudCc6ICByZWN1cnJpbmcsXG4gICAgICAgICAgJ3ByaWNlJzogYW1vdW50LFxuICAgICAgICAgICdxdWFudGl0eSc6IDFcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGVwID09PSAncHVyY2hhc2UnKSB7XG4gICAgICAgIHRoaXMuZGVidWcoJ2FkZCBhIHB1cmNoYXNlIGFjdGlvbi4gc3RlcCBpcyAnICsgc3RlcCk7XG4gICAgICAgIGdhKCdlYzpzZXRBY3Rpb24nLCBzdGVwLHtcbiAgICAgICAgICAnaWQnOiBvcHBfaWQsIC8vIFRyYW5zYWN0aW9uIGlkIC0gVHlwZTogc3RyaW5nXG4gICAgICAgICAgJ2FmZmlsaWF0aW9uJzogJ01pbm5Qb3N0JywgLy8gU3RvcmUgbmFtZSAtIFR5cGU6IHN0cmluZ1xuICAgICAgICAgICdyZXZlbnVlJzogYW1vdW50LCAvLyBUb3RhbCBSZXZlbnVlIC0gVHlwZTogbnVtZXJpY1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuZGVidWcoJ2FkZCBhIGNoZWNrb3V0IGFjdGlvbi4gc3RlcCBpcyAnICsgc3RlcCk7XG4gICAgICAgIGdhKCdlYzpzZXRBY3Rpb24nLCdjaGVja291dCcsIHtcbiAgICAgICAgICAnc3RlcCc6IHN0ZXAsICAgICAgICAgICAgLy8gQSB2YWx1ZSBvZiAxIGluZGljYXRlcyBmaXJzdCBjaGVja291dCBzdGVwLlZhbHVlIG9mIDIgaW5kaWNhdGVzIHNlY29uZCBjaGVja291dCBzdGVwXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBnYSgnc2V0Jywge1xuICAgICAgICBwYWdlOiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUsXG4gICAgICAgIHRpdGxlOiB0aXRsZVxuICAgICAgfSk7XG4gICAgICBnYSgnc2VuZCcsICdwYWdldmlldycsIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSk7XG5cbiAgICB9LCAvLyBhbmFseXRpY3NUcmFja2luZ1N0ZXBcblxuICAgIGNhbGN1bGF0ZUZlZXM6IGZ1bmN0aW9uKGFtb3VudCwgcGF5bWVudF90eXBlKSB7XG4gICAgICAvLyB0aGlzIHNlbmRzIHRoZSBhbW91bnQgYW5kIHBheW1lbnQgdHlwZSB0byBweXRob247IGdldCB0aGUgZmVlIGFuZCBkaXNwbGF5IGl0IHRvIHRoZSB1c2VyIG9uIHRoZSBjaGVja2JveCBsYWJlbFxuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIGFtb3VudDogYW1vdW50LFxuICAgICAgICBwYXltZW50X3R5cGU6IHBheW1lbnRfdHlwZVxuICAgICAgfTtcbiAgICAgICQuYWpheCh7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICB1cmw6ICcvY2FsY3VsYXRlLWZlZXMvJyxcbiAgICAgICAgZGF0YTogZGF0YVxuICAgICAgfSkuZG9uZShmdW5jdGlvbiggZGF0YSApIHtcbiAgICAgICAgaWYgKCQoZGF0YS5mZWVzKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgJCh0aGF0Lm9wdGlvbnMuZmVlX2Ftb3VudCkudGV4dChwYXJzZUZsb2F0KGRhdGEuZmVlcykudG9GaXhlZCgyKSk7XG4gICAgICAgICAgdGhhdC5jcmVkaXRDYXJkRmVlQ2hlY2tib3goJCh0aGF0Lm9wdGlvbnMucGF5X2NjX3Byb2Nlc3Npbmdfc2VsZWN0b3IpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSwgLy8gY2FsY3VsYXRlRmVlc1xuXG4gICAgY3JlZGl0Q2FyZFByb2Nlc3NpbmdGZWVzOiBmdW5jdGlvbihvcHRpb25zLCByZXNldCkge1xuICAgICAgLy8gdGhpcyBhZGRzIG9yIHN1YnRyYWN0cyB0aGUgZmVlIHRvIHRoZSBvcmlnaW5hbCBhbW91bnQgd2hlbiB0aGUgdXNlciBpbmRpY2F0ZXMgdGhleSBkbyBvciBkbyBub3Qgd2FudCB0byBwYXkgdGhlIGZlZXNcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHRoYXQuY3JlZGl0Q2FyZEZlZUNoZWNrYm94KCQodGhpcy5vcHRpb25zLnBheV9jY19wcm9jZXNzaW5nX3NlbGVjdG9yKSk7XG4gICAgICAkKHRoaXMub3B0aW9ucy5wYXlfY2NfcHJvY2Vzc2luZ19zZWxlY3Rvcikub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB0aGF0LmNyZWRpdENhcmRGZWVDaGVja2JveCh0aGlzKTtcbiAgICAgIH0pO1xuICAgIH0sIC8vIGNyZWRpdENhcmRQcm9jZXNzaW5nRmVlc1xuXG4gICAgY3JlZGl0Q2FyZEZlZUNoZWNrYm94OiBmdW5jdGlvbihmaWVsZCkge1xuICAgICAgdmFyIGZ1bGxfYW1vdW50O1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgaWYgKCQoZmllbGQpLmlzKCc6Y2hlY2tlZCcpIHx8ICQoZmllbGQpLnByb3AoJ2NoZWNrZWQnKSkge1xuICAgICAgICAkKCcuYW1vdW50IC5sZXZlbC1hbW91bnQnKS5hZGRDbGFzcygnZnVsbC1hbW91bnQnKTtcbiAgICAgICAgZnVsbF9hbW91bnQgPSAodGhhdC5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCArIHBhcnNlRmxvYXQoJCh0aGF0Lm9wdGlvbnMuZmVlX2Ftb3VudCkudGV4dCgpKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmdWxsX2Ftb3VudCA9IHRoYXQub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQ7XG4gICAgICB9XG4gICAgICAkKHRoYXQub3B0aW9ucy5mdWxsX2Ftb3VudF9zZWxlY3RvcikudGV4dChwYXJzZUZsb2F0KGZ1bGxfYW1vdW50KS50b0ZpeGVkKDIpKTtcbiAgICB9LCAvLyBjcmVkaXRDYXJkRmVlQ2hlY2tib3hcblxuICAgIGRvbmF0ZUFub255bW91c2x5OiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICBpZiAoJChvcHRpb25zLmFub255bW91c19zZWxlY3RvciwgZWxlbWVudCkuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgJChvcHRpb25zLm5hbWVfc2VsZWN0b3IgKyAnIGRpdjpmaXJzdCcsIGVsZW1lbnQpLmhpZGUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQob3B0aW9ucy5uYW1lX3NlbGVjdG9yICsgJyBkaXY6Zmlyc3QnLCBlbGVtZW50KS5zaG93KCk7XG4gICAgICB9XG5cbiAgICAgICQob3B0aW9ucy5hbm9ueW1vdXNfc2VsZWN0b3IsIGVsZW1lbnQpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCQodGhpcykuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgICAkKG9wdGlvbnMubmFtZV9zZWxlY3RvciArICcgZGl2OmZpcnN0JywgZWxlbWVudCkuaGlkZSgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICQob3B0aW9ucy5uYW1lX3NlbGVjdG9yICsgJyBkaXY6Zmlyc3QnLCBlbGVtZW50KS5zaG93KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sIC8vIGRvbmF0ZUFub255bW91c2x5XG5cbiAgICBjaGVja0xldmVsOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zLCByZXR1cm52YWx1ZSkge1xuICAgICAgdmFyIGxldmVsID0gJyc7XG4gICAgICB2YXIgbGV2ZWxudW0gPSAwO1xuICAgICAgdmFyIGxldmVsY2xhc3MgPSAnbGV2ZWwgbGV2ZWwtLSc7XG4gICAgICB2YXIgYW1vdW50X3llYXJseTtcbiAgICAgIHZhciBmcmVxdWVuY3kgPSBvcHRpb25zLmZyZXF1ZW5jeTtcbiAgICAgIHZhciBhbW91bnQgPSBvcHRpb25zLm9yaWdpbmFsX2Ftb3VudDtcblxuICAgICAgaWYgKGZyZXF1ZW5jeSA9PT0gMTIpIHtcbiAgICAgICAgYW1vdW50X3llYXJseSA9IGFtb3VudCAqIGZyZXF1ZW5jeTtcbiAgICAgIH0gZWxzZSBpZiAoZnJlcXVlbmN5ID09PSAxKSB7XG4gICAgICAgIGFtb3VudF95ZWFybHkgPSBhbW91bnQ7XG4gICAgICB9XG4gICAgICBcbiAgICAgICQuZWFjaChvcHRpb25zLmxldmVscywgZnVuY3Rpb24oaW5kZXgsIHZhbHVlKSB7XG4gICAgICAgIHZhciBuYW1lID0gdmFsdWUubmFtZTtcbiAgICAgICAgdmFyIG51bSA9IGluZGV4O1xuICAgICAgICB2YXIgbWF4ID0gdmFsdWUubWF4O1xuICAgICAgICB2YXIgbWluID0gdmFsdWUubWluO1xuICAgICAgICBpZiAodHlwZW9mIG1pbiAhPT0gJ3VuZGVmaW5lZCcgJiYgdHlwZW9mIG1heCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBpZiAoYW1vdW50X3llYXJseSA+PSBtaW4gJiYgYW1vdW50X3llYXJseSA8IG1heCkge1xuICAgICAgICAgICAgbGV2ZWwgPSBuYW1lO1xuICAgICAgICAgICAgbGV2ZWxudW0gPSBudW07XG4gICAgICAgICAgICBsZXZlbGNsYXNzICs9IG51bTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG1heCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBpZiAoYW1vdW50X3llYXJseSA8IG1heCkge1xuICAgICAgICAgICAgbGV2ZWwgPSBuYW1lO1xuICAgICAgICAgICAgbGV2ZWxudW0gPSBudW07XG4gICAgICAgICAgICBsZXZlbGNsYXNzICs9IG51bTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG1pbiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBpZiAoYW1vdW50X3llYXJseSA+PSBtaW4pIHtcbiAgICAgICAgICAgIGxldmVsID0gbmFtZTtcbiAgICAgICAgICAgIGxldmVsbnVtID0gbnVtO1xuICAgICAgICAgICAgbGV2ZWxjbGFzcyArPSBudW07XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmICgkKG9wdGlvbnMubGV2ZWxfaW5kaWNhdG9yX3NlbGVjdG9yKS5sZW5ndGggPiAwICYmICQob3B0aW9ucy5yZXZpZXdfYmVuZWZpdHNfc2VsZWN0b3IpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgJChvcHRpb25zLmxldmVsX2luZGljYXRvcl9zZWxlY3RvciwgZWxlbWVudCkucHJvcCgnY2xhc3MnLCBsZXZlbGNsYXNzKTtcbiAgICAgICAgJChvcHRpb25zLmxldmVsX25hbWVfc2VsZWN0b3IpLnRleHQobGV2ZWwuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBsZXZlbC5zbGljZSgxKSk7XG5cbiAgICAgICAgdmFyIHJldmlld19sZXZlbF9iZW5lZml0cyA9IHRoaXMuZ2V0UXVlcnlTdHJpbmdzKCQob3B0aW9ucy5yZXZpZXdfYmVuZWZpdHNfc2VsZWN0b3IsIGVsZW1lbnQpLnByb3AoJ2hyZWYnKSk7XG4gICAgICAgIHJldmlld19sZXZlbF9iZW5lZml0cyA9IHJldmlld19sZXZlbF9iZW5lZml0c1snbGV2ZWwnXTtcbiAgICAgICAgXG4gICAgICAgIHZhciBsaW5rID0gJChvcHRpb25zLnJldmlld19iZW5lZml0c19zZWxlY3RvciwgZWxlbWVudCkucHJvcCgnaHJlZicpO1xuICAgICAgICBsaW5rID0gbGluay5yZXBsYWNlKHJldmlld19sZXZlbF9iZW5lZml0cywgbGV2ZWwpO1xuICAgICAgICAkKG9wdGlvbnMucmV2aWV3X2JlbmVmaXRzX3NlbGVjdG9yKS5wcm9wKCdocmVmJywgbGluayk7XG4gICAgICB9XG4gICAgICBpZiAocmV0dXJudmFsdWUgPT09ICduYW1lJykge1xuICAgICAgICByZXR1cm4gbGV2ZWw7XG4gICAgICB9IGVsc2UgaWYgKHJldHVybnZhbHVlID09PSAnbnVtJykge1xuICAgICAgICByZXR1cm4gbGV2ZWxudW07ICBcbiAgICAgIH1cbiAgICB9LCAvLyBjaGVja0xldmVsXG5cbiAgICB1cHNlbGw6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMsIGFtb3VudCwgZnJlcXVlbmN5KSB7XG4gICAgICBpZiAob3B0aW9ucy5hbGxvd191cHNlbGwgPT09IHRydWUpIHtcbiAgICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgICB2YXIgYW1vdW50X21vbnRobHk7XG5cbiAgICAgICAgaWYgKGZyZXF1ZW5jeSA9PT0gMTIpIHtcbiAgICAgICAgICBhbW91bnRfbW9udGhseSA9IGFtb3VudDtcbiAgICAgICAgfSBlbHNlIGlmIChmcmVxdWVuY3kgPT09IDEpIHtcbiAgICAgICAgICBhbW91bnRfbW9udGhseSA9IGFtb3VudCAvIGZyZXF1ZW5jeTtcbiAgICAgICAgfVxuXG4gICAgICAgICQuZWFjaChvcHRpb25zLnVwc2VsbCwgZnVuY3Rpb24oaW5kZXgsIHZhbHVlKSB7XG4gICAgICAgICAgaWYgKGluZGV4ID09PSBvcHRpb25zLmxldmVsKSB7IC8vIGN1cnJlbnQgbGV2ZWwgdXBzZWxsXG4gICAgICAgICAgICBpZiAoKHZhbHVlICE9PSB0cnVlICYmIGFtb3VudF9tb250aGx5IDwgdmFsdWUpIHx8IHZhbHVlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgICAkKG9wdGlvbnMudXBzZWxsX3NlbGVjdG9yLCBlbGVtZW50KS5oaWRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAkKG9wdGlvbnMudXBzZWxsX2J0bl9zZWxlY3RvciwgZWxlbWVudCkuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICB2YXIgdXBzb2xkID0gb3B0aW9ucy51cHNvbGQ7XG4gICAgICAgICAgdGhhdC5vcHRpb25zLmFtb3VudCA9IHVwc29sZDtcbiAgICAgICAgICAkKG9wdGlvbnMubGV2ZWxfYW1vdW50X3NlbGVjdG9yLCBlbGVtZW50KS50ZXh0KHVwc29sZCk7XG4gICAgICAgICAgJChvcHRpb25zLmZ1bGxfYW1vdW50X3NlbGVjdG9yLCBlbGVtZW50KS50ZXh0KHVwc29sZCk7XG4gICAgICAgICAgJChvcHRpb25zLm9yaWdpbmFsX2Ftb3VudF9zZWxlY3RvciwgZWxlbWVudCkudmFsKHVwc29sZCk7XG4gICAgICAgICAgJCh0aGlzKS5yZW1vdmUoKTtcbiAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHRoYXQuaW5pdCh0cnVlLCB1cHNvbGQpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQob3B0aW9ucy51cHNlbGxfc2VsZWN0b3IsIGVsZW1lbnQpLmhpZGUoKTtcbiAgICAgIH1cbiAgICB9LCAvLyB1cHNlbGxcblxuICAgIGhvbm9yT3JNZW1vcnk6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIGlmICgkKG9wdGlvbnMuaG9ub3Jfc2VsZWN0b3IsIGVsZW1lbnQpLmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgICQob3B0aW9ucy5ob25vcl9tZW1vcnlfbmFtZV9zZWxlY3RvciArICcgZGl2JyArIG9wdGlvbnMuaG9ub3JfbmFtZV9zZWxlY3RvciwgZWxlbWVudCkuc2hvdygpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJChvcHRpb25zLmhvbm9yX21lbW9yeV9uYW1lX3NlbGVjdG9yICsgJyBkaXYnICsgb3B0aW9ucy5ob25vcl9uYW1lX3NlbGVjdG9yLCBlbGVtZW50KS5oaWRlKCk7XG4gICAgICAgICQob3B0aW9ucy5ob25vcl9uYW1lX3NlbGVjdG9yICsgJyBpbnB1dCcsIGVsZW1lbnQpLnZhbCgnJyk7XG4gICAgICB9XG5cbiAgICAgIGlmICgkKG9wdGlvbnMubWVtb3J5X3NlbGVjdG9yLCBlbGVtZW50KS5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICAkKG9wdGlvbnMuaG9ub3JfbWVtb3J5X25hbWVfc2VsZWN0b3IgKyAnIGRpdicgKyBvcHRpb25zLm1lbW9yeV9uYW1lX3NlbGVjdG9yLCBlbGVtZW50KS5zaG93KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkKG9wdGlvbnMuaG9ub3JfbWVtb3J5X25hbWVfc2VsZWN0b3IgKyAnIGRpdicgKyBvcHRpb25zLm1lbW9yeV9uYW1lX3NlbGVjdG9yLCBlbGVtZW50KS5oaWRlKCk7XG4gICAgICAgICQob3B0aW9ucy5tZW1vcnlfbmFtZV9zZWxlY3RvciArICcgaW5wdXQnLCBlbGVtZW50KS52YWwoJycpO1xuICAgICAgfVxuXG4gICAgICAkKG9wdGlvbnMuaG9ub3Jfb3JfbWVtb3J5X2Nob29zZXIsIGVsZW1lbnQpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKCQob3B0aW9ucy5ob25vcl9zZWxlY3RvcikuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgICAkKG9wdGlvbnMuaG9ub3JfbWVtb3J5X25hbWVfc2VsZWN0b3IgKyAnIGRpdicgKyBvcHRpb25zLmhvbm9yX25hbWVfc2VsZWN0b3IsIGVsZW1lbnQpLnNob3coKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkKG9wdGlvbnMuaG9ub3JfbWVtb3J5X25hbWVfc2VsZWN0b3IgKyAnIGRpdicgKyBvcHRpb25zLmhvbm9yX25hbWVfc2VsZWN0b3IsIGVsZW1lbnQpLmhpZGUoKTtcbiAgICAgICAgICAkKG9wdGlvbnMuaG9ub3JfbmFtZV9zZWxlY3RvciArICcgaW5wdXQnLCBlbGVtZW50KS52YWwoJycpO1xuICAgICAgICB9XG4gICAgICAgIGlmICgkKG9wdGlvbnMubWVtb3J5X3NlbGVjdG9yKS5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICAgICQob3B0aW9ucy5ob25vcl9tZW1vcnlfbmFtZV9zZWxlY3RvciArICcgZGl2JyArIG9wdGlvbnMubWVtb3J5X25hbWVfc2VsZWN0b3IsIGVsZW1lbnQpLnNob3coKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkKG9wdGlvbnMuaG9ub3JfbWVtb3J5X25hbWVfc2VsZWN0b3IgKyAnIGRpdicgKyBvcHRpb25zLm1lbW9yeV9uYW1lX3NlbGVjdG9yLCBlbGVtZW50KS5oaWRlKCk7XG4gICAgICAgICAgJChvcHRpb25zLm1lbW9yeV9uYW1lX3NlbGVjdG9yICsgJyBpbnB1dCcsIGVsZW1lbnQpLnZhbCgnJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgfSwgLy8gaG9ub3JPck1lbW9yeVxuXG4gICAgc3dhZzogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucywgY2hhbmdlKSB7XG4gICAgICBcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHZhciBjdXJyZW50bGV2ZWwgPSB0aGF0Lm9wdGlvbnMubGV2ZWxudW07XG5cbiAgICAgIGlmIChjaGFuZ2UgPT09IGZhbHNlKSB7IC8vIGtlZXAgdGhpcyBmcm9tIHJlcGVhdGluZ1xuICAgICAgICAkKG9wdGlvbnMuc3dhZ19zZWxlY3RvciwgZWxlbWVudCkuaGlkZSgpOyAvLyBoaWRlIGFsbCB0aGUgc3dhZyBpdGVtcyBmaXJzdFxuICAgICAgICAkKG9wdGlvbnMuc3dhZ19zZWxlY3RvciwgZWxlbWVudCkuZmlsdGVyKGZ1bmN0aW9uKGluZGV4KSB7IC8vIG9ubHkgc2hvdyBpdGVtcyB0aGF0IGFyZSBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gZG9uYXRpb24gbGV2ZWxcbiAgICAgICAgICByZXR1cm4gJCh0aGlzKS5wcm9wKCdjbGFzcycpLnNsaWNlKC0xKSA8PSBjdXJyZW50bGV2ZWw7XG4gICAgICAgIH0pLnNob3coKTtcblxuICAgICAgICAkKG9wdGlvbnMuc2VwYXJhdGVfc3dhZ19yZWRlZW0sIGVsZW1lbnQpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7IC8vIGlmIHVzZXIgY2xpY2tzIHRvIHJlZGVlbSBhIHNlcGFyYXRlIGl0ZW0gKGllIGF0bGFudGljKVxuICAgICAgICAgIGV2ZW50LnN0b3BJbW1lZGlhdGVQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICQob3B0aW9ucy5zZXBhcmF0ZV9zd2FnX3NlbGVjdG9yLCBlbGVtZW50KS50b2dnbGUoKTsgLy8gc2hvdyB0aGUgb3B0aW9ucyB0aGVyZVxuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmICgkKG9wdGlvbnMuYXRsYW50aWNfZXhpc3RpbmcsIGVsZW1lbnQpLmlzKCc6Y2hlY2tlZCcpKSB7IC8vIGlmIHVzZXIgaGFzIGV4aXN0aW5nIGF0bGFudGljIHN1YnNjcmlwdGlvblxuICAgICAgICAkKG9wdGlvbnMuYXRsYW50aWNfc2VsZWN0b3IsIGVsZW1lbnQpLnNob3coKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQob3B0aW9ucy5hdGxhbnRpY19zZWxlY3RvciwgZWxlbWVudCkuaGlkZSgpO1xuICAgICAgfVxuXG4gICAgICAkKG9wdGlvbnMuYXRsYW50aWNfc3RhdHVzLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7IC8vIGlmIHVzZXIgY2xpY2tzIG9uZSBvZiB0aGUgYXRsYW50aWMgcmFkaW8gYnV0dG9uc1xuICAgICAgICB0aGF0LnN3YWcoZWxlbWVudCwgb3B0aW9ucywgdHJ1ZSk7XG4gICAgICB9KTtcblxuICAgICAgJChvcHRpb25zLnN3YWdfZGVjbGluZV9zZWxlY3RvciwgZWxlbWVudCkuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgJChvcHRpb25zLnN3YWdfbnl0X3NlbGVjdG9yLCBlbGVtZW50KS5wcm9wKCdjaGVja2VkJywgZmFsc2UpO1xuICAgICAgfSk7XG5cbiAgICAgIHZhciBtYXhpbXVtX2Nob29zZSA9ICQob3B0aW9ucy5zd2FnX3NlbGVjdG9yX2Nob29zZV9tdWx0aXBsZSwgZWxlbWVudCkuZGF0YSgnbWF4aW11bS1jaG9vc2UnKTtcbiAgICAgICQob3B0aW9ucy5zd2FnX3NlbGVjdG9yX2Nob29zZV9tdWx0aXBsZSwgZWxlbWVudCkuc2hvdygpO1xuICAgICAgJChvcHRpb25zLnN3YWdfc2VsZWN0b3JfY2hvb3NlX211bHRpcGxlLCBlbGVtZW50KS5maW5kKCdsYWJlbCwgLnN3YWcnKS5zaG93KCk7XG4gICAgICB2YXIgY291bnRfY2hlY2tlZCA9ICQob3B0aW9ucy5zd2FnX3NlbGVjdG9yX2Nob29zZV9tdWx0aXBsZSArICcgaW5wdXRbbmFtZT1cIicgKyBvcHRpb25zLnN3YWdfY2hvb3NlX211bHRpcGxlX25hbWUgKyAnXCJdOmNoZWNrZWQnKS5sZW5ndGg7XG4gICAgICAkKCdpbnB1dCcsIG9wdGlvbnMuc3dhZ19zZWxlY3Rvcl9jaG9vc2VfbXVsdGlwbGUpLmNoYW5nZShmdW5jdGlvbigpIHsgLy8gaWYgdXNlciBjbGlja3Mgb25lIG9mIHRoZSBhdGxhbnRpYyByYWRpbyBidXR0b25zXG4gICAgICAgIGlmICggJCh0aGlzKS5wcm9wKCd0eXBlJykgPT0gJ2NoZWNrYm94Jykge1xuICAgICAgICAgIGNvdW50X2NoZWNrZWQgPSAkKG9wdGlvbnMuc3dhZ19zZWxlY3Rvcl9jaG9vc2VfbXVsdGlwbGUgKyAnIGlucHV0W25hbWU9XCInICsgb3B0aW9ucy5zd2FnX2Nob29zZV9tdWx0aXBsZV9uYW1lICsgJ1wiXTpjaGVja2VkJykubGVuZ3RoO1xuICAgICAgICAgIGlmIChtYXhpbXVtX2Nob29zZSA9PT0gY291bnRfY2hlY2tlZCkge1xuICAgICAgICAgICAgJCgnaW5wdXQ6bm90KDpjaGVja2VkKScsIG9wdGlvbnMuc3dhZ19zZWxlY3Rvcl9jaG9vc2VfbXVsdGlwbGUpLmF0dHIoJ2Rpc2FibGVkJyx0cnVlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCgnaW5wdXQ6bm90KDpjaGVja2VkKScsIG9wdGlvbnMuc3dhZ19zZWxlY3Rvcl9jaG9vc2VfbXVsdGlwbGUpLmF0dHIoJ2Rpc2FibGVkJyxmYWxzZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIH0sIC8vIHN3YWdcblxuICAgIG91dHNpZGVVbml0ZWRTdGF0ZXM6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgICQob3B0aW9ucy5zaG93X2JpbGxpbmdfY291bnRyeV9zZWxlY3RvcikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICQob3B0aW9ucy5iaWxsaW5nX2NvdW50cnlfc2VsZWN0b3IpLnNob3coKTtcbiAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5oaWRlKCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuICAgICAgJChvcHRpb25zLnNob3dfc2hpcHBpbmdfY291bnRyeV9zZWxlY3RvcikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICQob3B0aW9ucy5zaGlwcGluZ19jb3VudHJ5X3NlbGVjdG9yKS5zaG93KCk7XG4gICAgICAgICQodGhpcykucGFyZW50KCkuaGlkZSgpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9LCAvLyBvdXRzaWRlVW5pdGVkU3RhdGVzXG5cbiAgICBzaGlwcGluZ0FkZHJlc3M6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHZhciBzaG93X3NoaXBwaW5nID0gZmFsc2U7XG4gICAgICBpZiAoJChvcHRpb25zLnVzZV9mb3Jfc2hpcHBpbmdfc2VsZWN0b3IpLmxlbmd0aCA+IDApIHsgLy8gd2UgaGF2ZSBhIHNoaXBwaW5nIGNoZWNrYm94XG4gICAgICAgIHNob3dfc2hpcHBpbmcgPSB0cnVlO1xuICAgICAgfVxuLy8gICAgICBzaG93X3NoaXBwaW5nID0gISEkKG9wdGlvbnMudXNlX2Zvcl9zaGlwcGluZ19zZWxlY3RvciArICc6Y2hlY2tlZCcsIGVsZW1lbnQpLmxlbmd0aDtcbi8vICAgICAgLy90aGlzLmRlYnVnKCdzaG93IGlzIHRoZXJlJyk7XG5cbi8qICAgICAgJChvcHRpb25zLnVzZV9mb3Jfc2hpcHBpbmdfc2VsZWN0b3IsIGVsZW1lbnQpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgdGhhdC5zaGlwcGluZ0FkZHJlc3MoZWxlbWVudCwgb3B0aW9ucyk7XG4gICAgICAgIC8vdGhpcy5kZWJ1ZygnY2hhbmdlIGl0Jyk7XG4gICAgICB9KTtcbiovXG4gICAgICBpZiAoc2hvd19zaGlwcGluZyA9PT0gdHJ1ZSApIHtcbiAgICAgICAgJChvcHRpb25zLnVzZV9mb3Jfc2hpcHBpbmdfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpLnNob3coKTtcbiAgICAgICAgaWYgKCQob3B0aW9ucy51c2VfZm9yX3NoaXBwaW5nX3NlbGVjdG9yLCBlbGVtZW50KS5pcygnOmNoZWNrZWQnKSkgeyAvLyB1c2Ugc2FtZSBhcyBiaWxsaW5nXG4gICAgICAgICAgJChvcHRpb25zLnNoaXBwaW5nX3NlbGVjdG9yKS5oaWRlKCk7XG4gICAgICAgIH0gZWxzZSB7IC8vIHNlcGFyYXRlIHNoaXBwaW5nIGFuZCBiaWxsaW5nXG4gICAgICAgICAgJChvcHRpb25zLnNoaXBwaW5nX3NlbGVjdG9yKS5zaG93KCk7XG4gICAgICAgIH1cbiAgICAgICAgJChvcHRpb25zLnVzZV9mb3Jfc2hpcHBpbmdfc2VsZWN0b3IsIGVsZW1lbnQpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgICB0aGF0LnNoaXBwaW5nQWRkcmVzcyhlbGVtZW50LCBvcHRpb25zKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBcbiAgICB9LCAvLyBzaGlwcGluZ0FkZHJlc3NcblxuICAgIGFsbG93TWlubnBvc3RBY2NvdW50OiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zLCBjaGFuZ2VkKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB2YXIgYWNjb3VudF9leGlzdHMgPSBmYWxzZTtcblxuICAgICAgZnVuY3Rpb24gZG9uZVR5cGluZyAoKSB7XG4gICAgICAgIHZhciBlbWFpbCA9ICQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCk7XG4gICAgICAgIGFjY291bnRfZXhpc3RzID0gdGhhdC5jaGVja01pbm5wb3N0QWNjb3VudEV4aXN0cyhlbGVtZW50LCBvcHRpb25zLCBlbWFpbCk7XG4gICAgICB9XG5cbiAgICAgIC8vc2V0dXAgYmVmb3JlIGZ1bmN0aW9uc1xuICAgICAgdmFyIHR5cGluZ1RpbWVyOyAgICAgICAgICAgICAgICAvL3RpbWVyIGlkZW50aWZpZXJcbiAgICAgIHZhciBkb25lVHlwaW5nSW50ZXJ2YWwgPSA1MDAwOyAgLy90aW1lIGluIG1zLCA1IHNlY29uZCBmb3IgZXhhbXBsZVxuXG4gICAgICAvL29uIGtleXVwLCBzdGFydCB0aGUgY291bnRkb3duXG4gICAgICAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLmtleXVwKGZ1bmN0aW9uKCl7XG4gICAgICAgIGNsZWFyVGltZW91dCh0eXBpbmdUaW1lcik7XG4gICAgICAgIGlmICgkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCkge1xuICAgICAgICAgIHR5cGluZ1RpbWVyID0gc2V0VGltZW91dChkb25lVHlwaW5nLCBkb25lVHlwaW5nSW50ZXJ2YWwpO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgLy91c2VyIGlzIFwiZmluaXNoZWQgdHlwaW5nLFwiIGRvIHNvbWV0aGluZ1xuXG4gICAgICBpZiAoJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgJChvcHRpb25zLnBhc3N3b3JkX3NlbGVjdG9yLCBlbGVtZW50KS5zaG93KCk7XG4gICAgICAgIG9wdGlvbnMuY3JlYXRlX2FjY291bnQgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJChvcHRpb25zLnBhc3N3b3JkX3NlbGVjdG9yLCBlbGVtZW50KS5oaWRlKCk7XG4gICAgICB9XG5cbiAgICAgICQob3B0aW9ucy5jcmVhdGVfbXBfc2VsZWN0b3IsIGVsZW1lbnQpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgdGhhdC5hbGxvd01pbm5wb3N0QWNjb3VudChlbGVtZW50LCBvcHRpb25zLCB0cnVlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoY2hhbmdlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgLy8gYWxsb3cgdXNlcnMgdG8gc2hvdyBwbGFpbiB0ZXh0LCBvciB0byBzZWUgcHcgY3JpdGVyaWFcbiAgICAgICAgJChvcHRpb25zLnBhc3N3b3JkX3NlbGVjdG9yLCBlbGVtZW50KS5hcHBlbmQoJzxkaXYgY2xhc3M9XCJoZWxwLWxpbmtcIj48c3Bhbj5QYXNzd29yZCBoZWxwPC9zcGFuPjwvZGl2PjxkaXYgY2xhc3M9XCJmb3JtLWhlbHBcIj5QYXNzd29yZCBtdXN0IGJlIGF0IGxlYXN0IDYgY2hhcmFjdGVycy48L2Rpdj48bGFiZWwgY2xhc3M9XCJhZGRpdGlvbmFsLW9wdGlvblwiPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBuYW1lPVwic2hvd3Bhc3N3b3JkXCIgaWQ9XCJzaG93cGFzc3dvcmRcIj4gU2hvdyBwYXNzd29yZDwvbGFiZWw+Jyk7XG4gICAgICAgICQob3B0aW9ucy5jcmVhdGVfbXBfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpLmJlZm9yZSgnPHAgY2xhc3M9XCJhY2NvdW50LWV4aXN0cyBzdWNjZXNzXCI+VGhlcmUgaXMgYWxyZWFkeSBhIE1pbm5Qb3N0LmNvbSBhY2NvdW50IHdpdGggdGhpcyBlbWFpbC48L3A+Jyk7XG4gICAgICAgICQoJy5hY2NvdW50LWV4aXN0cycpLmhpZGUoKTtcbiAgICAgICAgJCgnI3Nob3dwYXNzd29yZCcpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGlmICgkKHRoaXMpLmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgICAgICAkKCcjcGFzc3dvcmQnKS5nZXQoMCkudHlwZSA9ICd0ZXh0JztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJCgnI3Bhc3N3b3JkJykuZ2V0KDApLnR5cGUgPSAncGFzc3dvcmQnO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJCgnLmZvcm0taXRlbSAuZm9ybS1oZWxwJykuaGlkZSgpO1xuICAgICAgfVxuICAgICAgJCgnLmZvcm0taXRlbS0td2l0aC1oZWxwIGxhYmVsLCAuZm9ybS1pdGVtLS13aXRoLWhlbHAgaW5wdXQnKS5uZXh0KCcuaGVscC1saW5rJykuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICQodGhpcykubmV4dCgnLmZvcm0taGVscCcpLnRvZ2dsZSgpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9LCAvLyBhbGxvd01pbm5wb3N0QWNjb3VudFxuXG4gICAgcG9wdWxhdGVBdHRlbmRlZXM6IGZ1bmN0aW9uKHF1YW50aXR5KSB7XG4gICAgICB2YXIgYXR0ZW5kZWVzID0gJyc7XG4gICAgICB2YXIgYXR0ZW5kZWUgPSAkKCcuYXR0ZW5kZWVzID4gZmllbGRzZXQ6Zmlyc3QnKS5odG1sKCk7XG4gICAgICBmb3IgKGkgPSAxOyBpIDw9IHF1YW50aXR5OyBpKyspIHtcbiAgICAgICAgYXR0ZW5kZWVzICs9ICc8ZmllbGRzZXQgY2xhc3M9XCJhdHRlbmRlZVwiPicgKyBhdHRlbmRlZS5yZXBsYWNlKC9fMS9nLCAnXycgKyBpKSArICc8L2ZpZWxkc2V0Pic7XG4gICAgICB9XG4gICAgICAkKCcuYXR0ZW5kZWVzJykuaHRtbChhdHRlbmRlZXMpO1xuICAgIH0sXG5cbiAgICBkaXNwbGF5QW1vdW50OiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zLCBzaW5nbGVfdW5pdF9wcmljZSwgcXVhbnRpdHksIGFkZGl0aW9uYWxfYW1vdW50LCB2YWxpZF9jb2RlKSB7XG4gICAgICB2YXIgYW1vdW50ID0gc2luZ2xlX3VuaXRfcHJpY2UgKiBwYXJzZUludChxdWFudGl0eSwgMTApO1xuICAgICAgaWYgKGFkZGl0aW9uYWxfYW1vdW50ID09PSAnJykge1xuICAgICAgICBhZGRpdGlvbmFsX2Ftb3VudCA9IDA7XG4gICAgICAgICQob3B0aW9ucy5jcmVhdGVfbXBfc2VsZWN0b3IpLnBhcmVudCgpLmhpZGUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFtb3VudCArPSBwYXJzZUludChhZGRpdGlvbmFsX2Ftb3VudCwgMTApO1xuICAgICAgICBsZXZlbGNoZWNrID0ge29yaWdpbmFsX2Ftb3VudDogYWRkaXRpb25hbF9hbW91bnQsIGZyZXF1ZW5jeTogMSwgbGV2ZWxzOiBvcHRpb25zLmxldmVsc307XG4gICAgICAgIGxldmVsID0gdGhpcy5jaGVja0xldmVsKGVsZW1lbnQsIGxldmVsY2hlY2ssICdudW0nKTtcbiAgICAgICAgaWYgKGxldmVsID49IDIpIHtcbiAgICAgICAgICAkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yKS5wYXJlbnQoKS5zaG93KCk7XG4gICAgICAgIH1cbiAgICAgICAgJChvcHRpb25zLmhhc19hZGRpdGlvbmFsX3RleHRfc2VsZWN0b3IpLmh0bWwoJChvcHRpb25zLmhhc19hZGRpdGlvbmFsX3RleHRfc2VsZWN0b3IpLmRhdGEoJ3RleHQnKSk7XG4gICAgICAgICQob3B0aW9ucy5hZGRpdGlvbmFsX2Ftb3VudF9zZWxlY3RvcikudGV4dChwYXJzZUZsb2F0KCQob3B0aW9ucy5hZGRpdGlvbmFsX2Ftb3VudF9maWVsZCkudmFsKCkpKTtcbiAgICAgIH1cblxuICAgICAgJChvcHRpb25zLmNhbGN1bGF0ZWRfYW1vdW50X3NlbGVjdG9yKS50ZXh0KGFtb3VudCk7IC8vIHRoaXMgaXMgdGhlIHByZXZpZXcgdGV4dFxuICAgICAgJChvcHRpb25zLm9yaWdpbmFsX2Ftb3VudF9zZWxlY3RvcikudmFsKHF1YW50aXR5ICogc2luZ2xlX3VuaXRfcHJpY2UpOyAvLyB0aGlzIGlzIHRoZSBhbW91bnQgZmllbGRcbiAgICAgICQob3B0aW9ucy5xdWFudGl0eV9zZWxlY3RvcikudGV4dChxdWFudGl0eSk7IC8vIGV2ZXJ5d2hlcmUgdGhlcmUncyBhIHF1YW50aXR5XG5cbiAgICAgIGlmIChxdWFudGl0eSA9PSAxKSB7XG4gICAgICAgICQoJy5hdHRlbmRlZS10aXRsZScpLnRleHQoJCgnLmF0dGVuZGVlLXRpdGxlJykuZGF0YSgnc2luZ2xlJykpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJCgnLmF0dGVuZGVlLXRpdGxlJykudGV4dCgkKCcuYXR0ZW5kZWUtdGl0bGUnKS5kYXRhKCdwbHVyYWwnKSk7XG4gICAgICB9XG5cbiAgICAgICQoJy5jb2RlLXJlc3VsdCcpLnJlbW92ZSgpO1xuICAgICAgaWYgKHZhbGlkX2NvZGUgPT09IHRydWUpIHtcbiAgICAgICAgJCgnLmFwcGx5LXByb21vLWNvZGUnKS5hZnRlcignPHAgY2xhc3M9XCJjb2RlLXJlc3VsdCBzdWNjZXNzXCI+WW91ciBtZW1iZXIgZGlzY291bnQgY29kZSB3YXMgc3VjY2Vzc2Z1bGx5IGFkZGVkLjwvcD4nKTtcbiAgICAgICAgJCgnLnNob3ctJyArIG9wdGlvbnMuc2luZ2xlX3VuaXRfcHJpY2VfYXR0cmlidXRlKS50ZXh0KHNpbmdsZV91bml0X3ByaWNlKTtcbiAgICAgICAgJCgnLmFwcGx5LXByb21vLWNvZGUnKS50ZXh0KCdBcHBsaWVkJykuYWRkQ2xhc3MoJ2J0bi0tZGlzYWJsZWQnKTtcbiAgICAgIH0gZWxzZSBpZiAodmFsaWRfY29kZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgJCgnLmFwcGx5LXByb21vLWNvZGUnKS5hZnRlcignPHAgY2xhc3M9XCJjb2RlLXJlc3VsdCBlcnJvclwiPlRoaXMgY29kZSBpcyBpbmNvcnJlY3QuIFRyeSBhZ2Fpbi48L3A+Jyk7XG4gICAgICB9XG5cbiAgICB9LFxuXG4gICAgY2FsY3VsYXRlQW1vdW50OiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zLCBkYXRhKSB7XG4gICAgICAvL3RoaXMuZGVidWcoJ3N0YXJ0LiBzZXQgdmFyaWFibGVzIGFuZCBwbGFpbiB0ZXh0LCBhbmQgcmVtb3ZlIGNvZGUgcmVzdWx0LicpO1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdmFyIHF1YW50aXR5ID0gJChvcHRpb25zLnF1YW50aXR5X2ZpZWxkKS52YWwoKTtcblxuICAgICAgdmFyIHNpbmdsZV91bml0X3ByaWNlID0gJChvcHRpb25zLnF1YW50aXR5X2ZpZWxkKS5kYXRhKG9wdGlvbnMuc2luZ2xlX3VuaXRfcHJpY2VfYXR0cmlidXRlKTtcbiAgICAgIHZhciBhZGRpdGlvbmFsX2Ftb3VudCA9ICQob3B0aW9ucy5hZGRpdGlvbmFsX2Ftb3VudF9maWVsZCkudmFsKCk7XG4gICAgICBpZiAoZGF0YS5zdWNjZXNzID09PSB0cnVlKSB7XG4gICAgICAgIHNpbmdsZV91bml0X3ByaWNlID0gZGF0YS5zaW5nbGVfdW5pdF9wcmljZTtcbiAgICAgIH1cbiAgICAgIHRoYXQuZGlzcGxheUFtb3VudChlbGVtZW50LCBvcHRpb25zLCBzaW5nbGVfdW5pdF9wcmljZSwgcXVhbnRpdHksIGFkZGl0aW9uYWxfYW1vdW50LCBkYXRhLnN1Y2Nlc3MpO1xuXG4gICAgICAkKG9wdGlvbnMucXVhbnRpdHlfZmllbGQgKyAnLCAnICsgb3B0aW9ucy5hZGRpdGlvbmFsX2Ftb3VudF9maWVsZCkuY2hhbmdlKGZ1bmN0aW9uKCkgeyAvLyB0aGUgcXVhbnRpdHkgb3IgYWRkaXRpb25hbCBhbW91bnQgY2hhbmdlZFxuICAgICAgICBxdWFudGl0eSA9ICQob3B0aW9ucy5xdWFudGl0eV9maWVsZCkudmFsKCk7XG4gICAgICAgIGFkZGl0aW9uYWxfYW1vdW50ID0gJChvcHRpb25zLmFkZGl0aW9uYWxfYW1vdW50X2ZpZWxkKS52YWwoKTtcbiAgICAgICAgaWYgKHF1YW50aXR5ICE9IDEpIHtcbiAgICAgICAgICAkKG9wdGlvbnMuaXRlbV9zZWxlY3RvcikudGV4dCgkKG9wdGlvbnMuaXRlbV9zZWxlY3RvcikuZGF0YSgncGx1cmFsJykpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICQob3B0aW9ucy5pdGVtX3NlbGVjdG9yKS50ZXh0KCQob3B0aW9ucy5pdGVtX3NlbGVjdG9yKS5kYXRhKCdzaW5nbGUnKSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGF0LmRpc3BsYXlBbW91bnQoZWxlbWVudCwgb3B0aW9ucywgc2luZ2xlX3VuaXRfcHJpY2UsIHF1YW50aXR5LCBhZGRpdGlvbmFsX2Ftb3VudCk7XG4gICAgICAgIFxuICAgICAgfSk7XG5cbiAgICAgIHZhciBhdHRlbmRlZXMgPSAnJztcbiAgICAgICQob3B0aW9ucy5yZXZpZXdfc3RlcF9zZWxlY3RvcikuZmluZCgnLmJ0bicpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICBhdHRlbmRlZXMgPSB0aGF0LnBvcHVsYXRlQXR0ZW5kZWVzKHF1YW50aXR5KTtcbiAgICAgIH0pO1xuXG4gICAgICAkKCcucHJvZ3Jlc3MtLWRvbmF0aW9uIC5wYW5lbC0tYXR0ZW5kZWVzJykuZmluZCgnYScpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICBhdHRlbmRlZXMgPSB0aGF0LnBvcHVsYXRlQXR0ZW5kZWVzKHF1YW50aXR5KTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMucHJvbW9jb2RlX3NlbGVjdG9yKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIC8vJCh0aGlzLm9wdGlvbnMucHJvbW9jb2RlX3NlbGVjdG9yKS5hZnRlcignJyk7XG4gICAgICAgICQoJy5hcHBseS1wcm9tby1jb2RlJykuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICB2YXIgY29kZSA9ICQob3B0aW9ucy5wcm9tb2NvZGVfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpO1xuICAgICAgICAgIGlmICgkKG9wdGlvbnMuZXZlbnRfaWRfc2VsZWN0b3IpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHZhciBldmVudF9pZCA9ICQob3B0aW9ucy5ldmVudF9pZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciBldmVudF9pZCA9IDE7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vdXNlX3Byb21vID0gdGhhdC5jaGVja1Byb21vQ29kZShjb2RlKTtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgICAgIHByb21vX2NvZGU6IGNvZGUsXG4gICAgICAgICAgICAgIGV2ZW50OiBldmVudF9pZFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICB1cmw6ICcvZXZlbnQtY2hlY2stcHJvbW8vJyxcbiAgICAgICAgICAgICAgZGF0YTogZGF0YVxuICAgICAgICAgICAgfSkuZG9uZShmdW5jdGlvbiggZGF0YSApIHtcbiAgICAgICAgICAgICAgdGhhdC5jYWxjdWxhdGVBbW91bnQoZWxlbWVudCwgb3B0aW9ucywgZGF0YSk7XG4gICAgICAgICAgICAgIC8vdGhhdC5kaXNwbGF5QW1vdW50KGVsZW1lbnQsIG9wdGlvbnMsIGRhdGEuc2luZ2xlX3VuaXRfcHJpY2UsIHF1YW50aXR5LCBhZGRpdGlvbmFsX2Ftb3VudCwgZGF0YS5zdWNjZXNzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgIH0sIC8vIGNhbGN1bGF0ZUFtb3VudFxuXG4gICAgY2hlY2tQcm9tb0NvZGU6IGZ1bmN0aW9uKGNvZGUpIHtcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICBwcm9tb19jb2RlOiBjb2RlXG4gICAgICB9O1xuICAgICAgJC5hamF4KHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIHVybDogJy9ldmVudC1jaGVjay1wcm9tby8nLFxuICAgICAgICBkYXRhOiBkYXRhXG4gICAgICB9KS5kb25lKGZ1bmN0aW9uKCBkYXRhICkge1xuICAgICAgICBpZiAoZGF0YS5zdWNjZXNzID09PSB0cnVlKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LCAvLyBjaGVja1Byb21vQ29kZVxuXG4gICAgdXNlUHJvbW9Db2RlOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICAkKHRoaXMub3B0aW9ucy51c2VfcHJvbW9jb2RlX3NlbGVjdG9yKS5wYXJlbnQoKS5odG1sKCc8YSBocmVmPVwiI1wiIGNsYXNzPVwidXNlLXByb21vLWNvZGVcIj5Vc2UgcHJvbW8gY29kZTwvYT4nKTtcbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5wcm9tb2NvZGVfc2VsZWN0b3IpLnZhbCgpID09PSAnJykge1xuICAgICAgICAkKG9wdGlvbnMucHJvbW9fc2VsZWN0b3IgKyAnIGRpdjpmaXJzdCcsIGVsZW1lbnQpLmhpZGUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAkKG9wdGlvbnMucHJvbW9fc2VsZWN0b3IgKyAnIGRpdjpsYXN0JywgZWxlbWVudCkuaGlkZSgpO1xuICAgICAgfVxuICAgICAgJCgnLnVzZS1wcm9tby1jb2RlJykuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgJChvcHRpb25zLnByb21vX3NlbGVjdG9yICsgJyBkaXY6Zmlyc3QnLCBlbGVtZW50KS5zaG93KCk7XG4gICAgICAgICQob3B0aW9ucy5wcm9tb19zZWxlY3RvciArICcgZGl2Omxhc3QnLCBlbGVtZW50KS5oaWRlKCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB9KTtcbiAgICB9LCAvL3VzZVByb21vQ29kZVxuXG4gICAgYWRkVG9DYWxlbmRhcjogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgJChvcHRpb25zLmNhbGVuZGFyX2J1dHRvbl9zZWxlY3RvcikuY3NzKCdkaXNwbGF5JywgJ2lubGluZS1ibG9jaycpO1xuICAgIH0sIC8vIGFkZFRvQ2FsZW5kYXJcblxuICAgIGNoZWNrTWlubnBvc3RBY2NvdW50RXhpc3RzOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zLCBlbWFpbCkgeyAgICAgXG4gICAgICB2YXIgdXNlciA9IHtcbiAgICAgICAgZW1haWw6IGVtYWlsXG4gICAgICB9O1xuICAgICAgJC5hamF4KHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgdXJsOiBvcHRpb25zLm1pbm5wb3N0X3Jvb3QgKyAnL3dwLWpzb24vdXNlci1hY2NvdW50LW1hbmFnZW1lbnQvdjEvY2hlY2stYWNjb3VudC1leGlzdHMnLFxuICAgICAgICBkYXRhOiB1c2VyXG4gICAgICB9KS5kb25lKGZ1bmN0aW9uKCByZXN1bHQgKSB7XG4gICAgICAgIGlmIChyZXN1bHQuc3RhdHVzID09PSAnc3VjY2VzcycgJiYgcmVzdWx0LnJlYXNvbiA9PT0gJ3VzZXIgZXhpc3RzJykgeyAvLyB1c2VyIGV4aXN0c1xuICAgICAgICAgIGlmICgkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KS5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICAgICAgJChvcHRpb25zLnBhc3N3b3JkX3NlbGVjdG9yLCBlbGVtZW50KS5oaWRlKCk7XG4gICAgICAgICAgICAkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKS5oaWRlKCk7XG4gICAgICAgICAgICAkKCcuYWNjb3VudC1leGlzdHMnLCBlbGVtZW50KS5zaG93KCk7XG4gICAgICAgICAgfVxuICAgICAgICAgICQob3B0aW9ucy5jcmVhdGVfbXBfc2VsZWN0b3IsIGVsZW1lbnQpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICgkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KS5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICAgICAgICAkKG9wdGlvbnMucGFzc3dvcmRfc2VsZWN0b3IsIGVsZW1lbnQpLmhpZGUoKTtcbiAgICAgICAgICAgICAgJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkucGFyZW50KCkuaGlkZSgpO1xuICAgICAgICAgICAgICAkKCcuYWNjb3VudC1leGlzdHMnLCBlbGVtZW50KS5zaG93KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7IC8vIHVzZXIgZG9lcyBub3QgZXhpc3Qgb3IgYWpheCBjYWxsIGZhaWxlZFxuICAgICAgICAgIGlmICgkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KS5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICAgICAgJChvcHRpb25zLnBhc3N3b3JkX3NlbGVjdG9yLCBlbGVtZW50KS5zaG93KCk7XG4gICAgICAgICAgICBvcHRpb25zLmNyZWF0ZV9hY2NvdW50ID0gdHJ1ZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJChvcHRpb25zLnBhc3N3b3JkX3NlbGVjdG9yLCBlbGVtZW50KS5oaWRlKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgICQoJy5hY2NvdW50LWV4aXN0cycsIGVsZW1lbnQpLmhpZGUoKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sIC8vIGNoZWNrTWlubnBvc3RBY2NvdW50RXhpc3RzXG5cbiAgICBjaG9vc2VQYXltZW50TWV0aG9kOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG5cbiAgICAgIHZhciB0aGF0ID0gdGhpcztcblxuICAgICAgaWYgKCQob3B0aW9ucy5jaG9vc2VfcGF5bWVudCkubGVuZ3RoID4gMCkgeyAgICAgIFxuICAgICAgICBpZiAoJChvcHRpb25zLmNob29zZV9wYXltZW50ICsgJyBpbnB1dCcpLmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgICAgdmFyIGNoZWNrZWQgPSAkKG9wdGlvbnMuY2hvb3NlX3BheW1lbnQgKyAnIGlucHV0OmNoZWNrZWQnKS5hdHRyKCdpZCcpO1xuICAgICAgICAgIHZhciBjaGVja2VkX3ZhbHVlID0gJChvcHRpb25zLmNob29zZV9wYXltZW50ICsgJyBpbnB1dDpjaGVja2VkJykudmFsKCk7XG4gICAgICAgICAgJChvcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgJChvcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yICsgJy4nICsgY2hlY2tlZCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICQob3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvciArICc6bm90KC5hY3RpdmUpIGxhYmVsJykucmVtb3ZlQ2xhc3MoJ3JlcXVpcmVkJyk7XG4gICAgICAgICAgJChvcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yICsgJzpub3QoLmFjdGl2ZSkgaW5wdXQnKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgICAgICAkKG9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IgKyAnLmFjdGl2ZSBsYWJlbCcpLmFkZENsYXNzKCdyZXF1aXJlZCcpO1xuICAgICAgICAgICQob3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvciArICcuYWN0aXZlIGlucHV0JykucHJvcCgncmVxdWlyZWQnLCB0cnVlKTtcbiAgICAgICAgICBpZiAoIGNoZWNrZWRfdmFsdWUgPT09ICdhY2gnICkge1xuICAgICAgICAgICAgdGhhdC5jYWxjdWxhdGVGZWVzKHRoYXQub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQsICdhY2gnKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhhdC5jYWxjdWxhdGVGZWVzKHRoYXQub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQsICd2aXNhJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgJChvcHRpb25zLmNob29zZV9wYXltZW50ICsgJyBpbnB1dCcpLmNoYW5nZShmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAkKG9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAkKG9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IgKyAnLicgKyB0aGlzLmlkKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgJChvcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yICsgJzpub3QoLmFjdGl2ZSkgbGFiZWwnKS5yZW1vdmVDbGFzcygncmVxdWlyZWQnKTtcbiAgICAgICAgICAkKG9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IgKyAnOm5vdCguYWN0aXZlKSBpbnB1dCcpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuICAgICAgICAgICQob3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvciArICcuYWN0aXZlIGxhYmVsJykuYWRkQ2xhc3MoJ3JlcXVpcmVkJyk7XG4gICAgICAgICAgJChvcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yICsgJy5hY3RpdmUgaW5wdXQnKS5wcm9wKCdyZXF1aXJlZCcsIHRydWUpO1xuICAgICAgICAgICQoJyNiYW5rVG9rZW4nKS5yZW1vdmUoKTtcbiAgICAgICAgICBpZiAoIHRoaXMudmFsdWUgPT09ICdhY2gnICkge1xuICAgICAgICAgICAgdGhhdC5jYWxjdWxhdGVGZWVzKHRoYXQub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQsICdhY2gnKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhhdC5jYWxjdWxhdGVGZWVzKHRoYXQub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQsICd2aXNhJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LCAvLyBjaG9vc2VQYXltZW50TWV0aG9kXG5cbiAgICBjcmVkaXRDYXJkRmllbGRzOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG5cbiAgICAgIHZhciB0aGF0ID0gdGhpcztcblxuICAgICAgJCh0aGF0Lm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLnByZXBlbmQoJzxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgaWQ9XCJzb3VyY2VcIiBuYW1lPVwic291cmNlXCIgdmFsdWU9XCInICsgZG9jdW1lbnQucmVmZXJyZXIgKyAnXCIgLz4nKTtcblxuICAgICAgdmFyIHN0eWxlID0ge1xuICAgICAgICBiYXNlOiB7XG4gICAgICAgICAgaWNvbkNvbG9yOiAnIzY2NkVFOCcsXG4gICAgICAgICAgbGluZUhlaWdodDogJzM3cHgnLFxuICAgICAgICAgIGZvbnRXZWlnaHQ6IDQwMCxcbiAgICAgICAgICBmb250RmFtaWx5OiAnR2VvcmdpYSxDYW1icmlhLFRpbWVzIE5ldyBSb21hbixUaW1lcyxzZXJpZicsXG4gICAgICAgICAgZm9udFNpemU6ICcxNnB4JyxcbiAgICAgICAgfSxcbiAgICAgIH07XG5cbiAgICAgIC8vIEFkZCBhbiBpbnN0YW5jZSBvZiB0aGUgY2FyZCBVSSBjb21wb25lbnQgaW50byB0aGUgYGNhcmQtZWxlbWVudGAgPGRpdj5cbiAgICAgIC8vY2FyZC5tb3VudCgnI2NhcmQtZWxlbWVudCcpO1xuICAgICAgaWYgKCAkKCcuY3JlZGl0LWNhcmQtZ3JvdXAnKS5sZW5ndGggPT09IDAgJiYgJCgnLnBheW1lbnQtbWV0aG9kLmNob29zZS1jYXJkJykubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoYXQuY2FyZE51bWJlckVsZW1lbnQgPSB0aGF0LmVsZW1lbnRzLmNyZWF0ZSgnY2FyZE51bWJlcicsIHtcbiAgICAgICAgc3R5bGU6IHN0eWxlXG4gICAgICB9KTtcbiAgICAgIHRoYXQuY2FyZE51bWJlckVsZW1lbnQubW91bnQob3B0aW9ucy5jY19udW1fc2VsZWN0b3IpO1xuXG4gICAgICB0aGF0LmNhcmRFeHBpcnlFbGVtZW50ID0gdGhhdC5lbGVtZW50cy5jcmVhdGUoJ2NhcmRFeHBpcnknLCB7XG4gICAgICAgIHN0eWxlOiBzdHlsZVxuICAgICAgfSk7XG4gICAgICB0aGF0LmNhcmRFeHBpcnlFbGVtZW50Lm1vdW50KG9wdGlvbnMuY2NfZXhwX3NlbGVjdG9yKTtcblxuICAgICAgdGhhdC5jYXJkQ3ZjRWxlbWVudCA9IHRoYXQuZWxlbWVudHMuY3JlYXRlKCdjYXJkQ3ZjJywge1xuICAgICAgICBzdHlsZTogc3R5bGVcbiAgICAgIH0pO1xuICAgICAgdGhhdC5jYXJkQ3ZjRWxlbWVudC5tb3VudChvcHRpb25zLmNjX2N2dl9zZWxlY3Rvcik7XG5cbiAgICAgIC8vIHZhbGlkYXRlL2Vycm9yIGhhbmRsZSB0aGUgY2FyZCBmaWVsZHNcbiAgICAgIHRoYXQuY2FyZE51bWJlckVsZW1lbnQub24oJ2NoYW5nZScsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIC8vIGVycm9yIGhhbmRsaW5nXG4gICAgICAgIHRoYXQuc3RyaXBlRXJyb3JEaXNwbGF5KGV2ZW50LCAkKG9wdGlvbnMuY2NfbnVtX3NlbGVjdG9yLCBlbGVtZW50KSwgZWxlbWVudCwgb3B0aW9ucyApO1xuICAgICAgICAvLyBTd2l0Y2ggYnJhbmQgbG9nb1xuICAgICAgICBpZiAoZXZlbnQuYnJhbmQpIHtcbiAgICAgICAgICB0aGF0LmNhbGN1bGF0ZUZlZXModGhhdC5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCwgZXZlbnQuYnJhbmQpO1xuICAgICAgICAgIHRoYXQuc2V0QnJhbmRJY29uKGV2ZW50LmJyYW5kKTtcbiAgICAgICAgfVxuICAgICAgICAvL3NldE91dGNvbWUoZXZlbnQpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoYXQuY2FyZEV4cGlyeUVsZW1lbnQub24oJ2NoYW5nZScsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIC8vIGVycm9yIGhhbmRsaW5nXG4gICAgICAgIHRoYXQuc3RyaXBlRXJyb3JEaXNwbGF5KGV2ZW50LCAkKG9wdGlvbnMuY2NfZXhwX3NlbGVjdG9yLCBlbGVtZW50KSwgZWxlbWVudCwgb3B0aW9ucyApO1xuICAgICAgfSk7XG5cbiAgICAgIHRoYXQuY2FyZEN2Y0VsZW1lbnQub24oJ2NoYW5nZScsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIC8vIGVycm9yIGhhbmRsaW5nXG4gICAgICAgIHRoYXQuc3RyaXBlRXJyb3JEaXNwbGF5KGV2ZW50LCAkKG9wdGlvbnMuY2NfY3Z2X3NlbGVjdG9yLCBlbGVtZW50KSwgZWxlbWVudCwgb3B0aW9ucyApO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIHRoaXMgaXMgdGhlIG1ldGhvZCB0byBjcmVhdGUgYSBzaW5nbGUgY2FyZCBmaWVsZCBhbmQgbW91bnQgaXRcbiAgICAgIC8qdmFyIGNhcmQgPSB0aGF0LmVsZW1lbnRzLmNyZWF0ZShcbiAgICAgICAgJ2NhcmQnLFxuICAgICAgICB7XG4gICAgICAgICAgaGlkZVBvc3RhbENvZGU6IHRydWVcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICAgIC8vIEFkZCBhbiBpbnN0YW5jZSBvZiB0aGUgY2FyZCBVSSBjb21wb25lbnQgaW50byB0aGUgYGNhcmQtZWxlbWVudGAgPGRpdj5cbiAgICAgIGNhcmQubW91bnQoJyNjYXJkLWVsZW1lbnQnKTsqL1xuXG4gICAgfSwgLy8gY3JlZGl0Q2FyZEZpZWxkc1xuXG4gICAgc2V0QnJhbmRJY29uOiBmdW5jdGlvbihicmFuZCkge1xuICAgICAgdmFyIGNhcmRCcmFuZFRvUGZDbGFzcyA9IHtcbiAgICAgICAgJ3Zpc2EnOiAncGYtdmlzYScsXG4gICAgICAgICdtYXN0ZXJjYXJkJzogJ3BmLW1hc3RlcmNhcmQnLFxuICAgICAgICAnYW1leCc6ICdwZi1hbWVyaWNhbi1leHByZXNzJyxcbiAgICAgICAgJ2Rpc2NvdmVyJzogJ3BmLWRpc2NvdmVyJyxcbiAgICAgICAgJ2RpbmVycyc6ICdwZi1kaW5lcnMnLFxuICAgICAgICAnamNiJzogJ3BmLWpjYicsXG4gICAgICAgICd1bmtub3duJzogJ3BmLWNyZWRpdC1jYXJkJyxcbiAgICAgIH1cbiAgICAgIHZhciBicmFuZEljb25FbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2JyYW5kLWljb24nKTtcbiAgICAgIHZhciBwZkNsYXNzID0gJ3BmLWNyZWRpdC1jYXJkJztcbiAgICAgIGlmIChicmFuZCBpbiBjYXJkQnJhbmRUb1BmQ2xhc3MpIHtcbiAgICAgICAgcGZDbGFzcyA9IGNhcmRCcmFuZFRvUGZDbGFzc1ticmFuZF07XG4gICAgICB9XG4gICAgICBmb3IgKHZhciBpID0gYnJhbmRJY29uRWxlbWVudC5jbGFzc0xpc3QubGVuZ3RoIC0gMTsgaSA+PSAwOyBpLS0pIHtcbiAgICAgICAgYnJhbmRJY29uRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGJyYW5kSWNvbkVsZW1lbnQuY2xhc3NMaXN0W2ldKTtcbiAgICAgIH1cbiAgICAgIGJyYW5kSWNvbkVsZW1lbnQuY2xhc3NMaXN0LmFkZCgncGYnKTtcbiAgICAgIGJyYW5kSWNvbkVsZW1lbnQuY2xhc3NMaXN0LmFkZChwZkNsYXNzKTtcbiAgICB9LFxuXG4gICAgYWNoRmllbGRzOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICBpZiAob3B0aW9ucy5wbGFpZF9lbnYgIT0gJycgJiYgb3B0aW9ucy5rZXkgIT0gJycgJiYgdHlwZW9mIFBsYWlkICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB2YXIgbGlua0hhbmRsZXIgPSBQbGFpZC5jcmVhdGUoe1xuICAgICAgICAgIHNlbGVjdEFjY291bnQ6IHRydWUsXG4gICAgICAgICAgYXBpVmVyc2lvbjogJ3YyJyxcbiAgICAgICAgICBlbnY6IG9wdGlvbnMucGxhaWRfZW52LFxuICAgICAgICAgIGNsaWVudE5hbWU6ICdNaW5uUG9zdCcsXG4gICAgICAgICAga2V5OiBvcHRpb25zLnBsYWlkX3B1YmxpY19rZXksXG4gICAgICAgICAgcHJvZHVjdDogJ2F1dGgnLFxuICAgICAgICAgIG9uTG9hZDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAvLyBUaGUgTGluayBtb2R1bGUgZmluaXNoZWQgbG9hZGluZy5cbiAgICAgICAgICB9LFxuICAgICAgICAgIG9uU3VjY2VzczogZnVuY3Rpb24ocHVibGljX3Rva2VuLCBtZXRhZGF0YSkge1xuICAgICAgICAgICAgLy8gVGhlIG9uU3VjY2VzcyBmdW5jdGlvbiBpcyBjYWxsZWQgd2hlbiB0aGUgdXNlciBoYXMgc3VjY2Vzc2Z1bGx5XG4gICAgICAgICAgICAvLyBhdXRoZW50aWNhdGVkIGFuZCBzZWxlY3RlZCBhbiBhY2NvdW50IHRvIHVzZS5cbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyBXaGVuIGNhbGxlZCwgeW91IHdpbGwgc2VuZCB0aGUgcHVibGljX3Rva2VuIGFuZCB0aGUgc2VsZWN0ZWRcbiAgICAgICAgICAgIC8vIGFjY291bnQgSUQsIG1ldGFkYXRhLmFjY291bnRfaWQsIHRvIHlvdXIgYmFja2VuZCBhcHAgc2VydmVyLlxuICAgICAgICAgICAgLy9cbiAgICAgICAgICAgIC8vIHNlbmREYXRhVG9CYWNrZW5kU2VydmVyKHtcbiAgICAgICAgICAgIC8vICAgcHVibGljX3Rva2VuOiBwdWJsaWNfdG9rZW4sXG4gICAgICAgICAgICAvLyAgIGFjY291bnRfaWQ6IG1ldGFkYXRhLmFjY291bnRfaWRcbiAgICAgICAgICAgIC8vIH0pO1xuXG4gICAgICAgICAgICAvL3RoaXMuZGVidWcoJ1B1YmxpYyBUb2tlbjogJyArIHB1YmxpY190b2tlbik7XG4gICAgICAgICAgICAvL3RoaXMuZGVidWcoJ0N1c3RvbWVyLXNlbGVjdGVkIGFjY291bnQgSUQ6ICcgKyBtZXRhZGF0YS5hY2NvdW50X2lkKTtcblxuICAgICAgICAgICAgdmFyIHN1cHBvcnRmb3JtID0gJChvcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKTtcblxuICAgICAgICAgICAgLy8gcmVzcG9uc2UgY29udGFpbnMgaWQgYW5kIGNhcmQsIHdoaWNoIGNvbnRhaW5zIGFkZGl0aW9uYWwgY2FyZCBkZXRhaWxzXG4gICAgICAgICAgICAvLyBJbnNlcnQgdGhlIGRhdGEgaW50byB0aGUgZm9ybSBzbyBpdCBnZXRzIHN1Ym1pdHRlZCB0byB0aGUgc2VydmVyXG4gICAgICAgICAgICBzdXBwb3J0Zm9ybS5hcHBlbmQoJCgnPGlucHV0IHR5cGU9XFxcImhpZGRlblxcXCIgbmFtZT1cXFwicHVibGljX3Rva2VuXFxcIiAvPicpLnZhbChwdWJsaWNfdG9rZW4pKTtcbiAgICAgICAgICAgIHN1cHBvcnRmb3JtLmFwcGVuZCgkKCc8aW5wdXQgdHlwZT1cXFwiaGlkZGVuXFxcIiBuYW1lPVxcXCJhY2NvdW50X2lkXFxcIiAvPicpLnZhbChtZXRhZGF0YS5hY2NvdW50X2lkKSk7XG5cbiAgICAgICAgICAgIC8vIGdldCB0aGUgYWNjb3VudCB2YWxpZGF0ZWQgYnkgYWpheFxuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgdXJsOicvcGxhaWRfdG9rZW4vJyxcbiAgICAgICAgICAgICAgLy9jYWNoZTogZmFsc2UsXG4gICAgICAgICAgICAgIGRhdGE6ICQoc3VwcG9ydGZvcm0pLnNlcmlhbGl6ZSgpLFxuICAgICAgICAgICAgICB0eXBlOiAnUE9TVCdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZG9uZShmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICBpZiAodHlwZW9mIHJlc3BvbnNlLmVycm9yICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIC8vIHRoZXJlIGlzIGFuIGVycm9yLlxuICAgICAgICAgICAgICAgICQob3B0aW9ucy5wbGFpZF9saW5rKS5wYXJlbnQoKS5hZnRlcignPHAgY2xhc3M9XCJlcnJvclwiPicgKyByZXNwb25zZS5lcnJvciArICc8L3A+JylcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL3RoaXMuZGVidWcoJ3ByaW50IHJlc3BvbnNlIGhlcmUnKTtcbiAgICAgICAgICAgICAgICAvL3RoaXMuZGVidWcocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgICQob3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikucHJlcGVuZCgnPGlucHV0IHR5cGU9XCJoaWRkZW5cIiBpZD1cImJhbmtUb2tlblwiIG5hbWU9XCJiYW5rVG9rZW5cIiB2YWx1ZT1cIicgKyByZXNwb25zZS5zdHJpcGVfYmFua19hY2NvdW50X3Rva2VuICsgJ1wiIC8+Jyk7XG4gICAgICAgICAgICAgICAgJChvcHRpb25zLnBsYWlkX2xpbmssIGVsZW1lbnQpLmh0bWwoJzxzdHJvbmc+WW91ciBhY2NvdW50IHdhcyBzdWNjZXNzZnVsbHkgYXV0aG9yaXplZDwvc3Ryb25nPicpLmNvbnRlbnRzKCkudW53cmFwKCk7XG4gICAgICAgICAgICAgICAgdGhhdC5jYWxjdWxhdGVGZWVzKHRoYXQub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQsICdhY2gnKTsgLy8gY2FsY3VsYXRlIHRoZSBhY2ggZmVlc1xuICAgICAgICAgICAgICAgIC8vIGFkZCB0aGUgZmllbGQocykgd2UgbmVlZCB0byB0aGUgZm9ybSBmb3Igc3VibWl0dGluZ1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmVycm9yKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgICQob3B0aW9ucy5wbGFpZF9saW5rKS5wYXJlbnQoKS5hZnRlcignPHAgY2xhc3M9XCJlcnJvclwiPicgKyByZXNwb25zZS5lcnJvciArICc8L3A+JylcbiAgICAgICAgICAgIH0pO1xuXG5cbiAgICAgICAgICAgIFxuICAgICAgICAgIH0sXG4gICAgICAgICAgb25FeGl0OiBmdW5jdGlvbihlcnIsIG1ldGFkYXRhKSB7XG4gICAgICAgICAgICAvLyBUaGUgdXNlciBleGl0ZWQgdGhlIExpbmsgZmxvdy5cbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgICAgJChvcHRpb25zLnBsYWlkX2xpbmssIGVsZW1lbnQpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAkKG9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IgKyAnIC5lcnJvcicpLnJlbW92ZSgpOyAvLyByZW1vdmUgbWV0aG9kIGVycm9yIG1lc3NhZ2UgaWYgaXQgaXMgdGhlcmVcbiAgICAgICAgICBsaW5rSGFuZGxlci5vcGVuKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sIC8vIGFjaEZpZWxkc1xuXG4gICAgaGFzSHRtbDVWYWxpZGF0aW9uOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICAvL3RoaXMuZGVidWcoJ3ZhbHVlIGlzICcgKyB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKS5jaGVja1ZhbGlkaXR5ID09PSAnZnVuY3Rpb24nKTtcbiAgICAgIHJldHVybiB0eXBlb2YgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKS5jaGVja1ZhbGlkaXR5ID09PSAnZnVuY3Rpb24nO1xuICAgIH0sXG5cbiAgICBidXR0b25TdGF0dXM6IGZ1bmN0aW9uKG9wdGlvbnMsIGJ1dHRvbiwgZGlzYWJsZWQpIHtcbiAgICAgIGJ1dHRvbi5wcm9wKCdkaXNhYmxlZCcsIGRpc2FibGVkKTtcbiAgICAgIGlmIChkaXNhYmxlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgYnV0dG9uLnRleHQob3B0aW9ucy5idXR0b25fdGV4dCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBidXR0b24udGV4dCgnUHJvY2Vzc2luZycpO1xuICAgICAgfVxuICAgIH0sXG5cbiAgICB2YWxpZGF0ZUFuZFN1Ym1pdDogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgJChvcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5zdWJtaXQoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAvLyBkbyBzb21lIGZhbGxiYWNrIHN0dWZmIGZvciBub24taHRtbDUgYnJvd3NlcnNcbiAgICAgICAgaWYgKHRoYXQuaGFzSHRtbDVWYWxpZGF0aW9uKGVsZW1lbnQsIG9wdGlvbnMpKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuY2hlY2tWYWxpZGl0eSgpKSB7XG4gICAgICAgICAgICAgICQodGhpcykuYWRkQ2xhc3MoJ2ludmFsaWQnKTtcbiAgICAgICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogJCh0aGlzKS5maW5kKCdpbnB1dDppbnZhbGlkJykucGFyZW50KCkub2Zmc2V0KCkudG9wXG4gICAgICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICAgICAgICAvL3RoaXMuZGVidWcoJ3RvcCBpcyAnICsgKTtcbiAgICAgICAgICAgICAgJCh0aGlzKS5maW5kKCdpbnB1dDppbnZhbGlkJykucGFyZW50KCkuYWRkQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAkKHRoaXMpLnJlbW92ZUNsYXNzKCdpbnZhbGlkJyk7XG4gICAgICAgICAgICAgICQodGhpcykuZmluZCgnaW5wdXQ6aW52YWxpZCcpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdlcnJvcicpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gdmFsaWRhdGUgYW5kIHN1Ym1pdCB0aGUgZm9ybVxuICAgICAgICAkKCcuY2hlY2stZmllbGQnKS5yZW1vdmUoKTtcbiAgICAgICAgJCgnaW5wdXQsIGxhYmVsJywgZWxlbWVudCkucmVtb3ZlQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgIHZhciB2YWxpZCA9IHRydWU7XG4gICAgICAgIHZhciBwYXltZW50X21ldGhvZCA9ICdjYXJkJztcbiAgICAgICAgaWYgKCQob3B0aW9ucy5jaG9vc2VfcGF5bWVudCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHBheW1lbnRfbWV0aG9kID0gJChvcHRpb25zLmNob29zZV9wYXltZW50ICsgJyBpbnB1dDpjaGVja2VkJykudmFsKCk7XG4gICAgICAgIH1cbiAgICAgICAgJChvcHRpb25zLmNob29zZV9wYXltZW50ICsgJyBpbnB1dCcpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgICAkKG9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IgKyAnIC5lcnJvcicpLnJlbW92ZSgpOyAvLyByZW1vdmUgbWV0aG9kIGVycm9yIG1lc3NhZ2UgaWYgaXQgaXMgdGhlcmVcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHBheW1lbnRfbWV0aG9kID09PSAnYWNoJykge1xuICAgICAgICAgIGlmICgkKCdpbnB1dFtuYW1lPVwiYmFua1Rva2VuXCJdJykubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB2YWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgJChvcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yKS5wcmVwZW5kKCc8cCBjbGFzcz1cImVycm9yXCI+WW91IGFyZSByZXF1aXJlZCB0byBlbnRlciBjcmVkaXQgY2FyZCBpbmZvcm1hdGlvbiwgb3IgdG8gYXV0aG9yaXplIE1pbm5Qb3N0IHRvIGNoYXJnZSB5b3VyIGJhbmsgYWNjb3VudCwgdG8gbWFrZSBhIHBheW1lbnQuPC9wPicpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh2YWxpZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgIC8vIDEuIHByb2Nlc3MgZG9uYXRpb24gdG8gc3RyaXBlXG4gICAgICAgICAgdGhhdC5idXR0b25TdGF0dXMob3B0aW9ucywgJCh0aGF0Lm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLmZpbmQoJ2J1dHRvbicpLCB0cnVlKTtcblxuICAgICAgICAgIHZhciBmdWxsX25hbWUgPSAnJztcbiAgICAgICAgICBpZiAoJCgnI2Z1bGxfbmFtZScpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGZ1bGxfbmFtZSA9ICQoJyNmdWxsX25hbWUnKS52YWwoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZnVsbF9uYW1lID0gJCgnI2ZpcnN0X25hbWUnKS52YWwoKSArICcgJyArICQoJyNsYXN0X25hbWUnKS52YWwoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgc3RyZWV0ID0gJ05vbmUnO1xuICAgICAgICAgIGlmICgkKCdpbnB1dFtuYW1lPVwiZnVsbF9hZGRyZXNzXCJdJykudmFsKCkgIT0gJycpIHtcbiAgICAgICAgICAgIHN0cmVldCA9ICQoJyNmdWxsX2FkZHJlc3MnKS52YWwoKTtcbiAgICAgICAgICAgIGlmICgkKCdpbnB1dFtuYW1lPVwiYmlsbGluZ19zdHJlZXRcIl0nKS52YWwoKSAhPSAnJykge1xuICAgICAgICAgICAgICBzdHJlZXQgPSAkKCdpbnB1dFtuYW1lPVwiYmlsbGluZ19zdHJlZXRcIl0nKS52YWwoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgY2l0eSA9ICdOb25lJztcbiAgICAgICAgICBpZiAoJCgnaW5wdXRbbmFtZT1cImJpbGxpbmdfY2l0eVwiXScpLnZhbCgpICE9ICcnKSB7XG4gICAgICAgICAgICBjaXR5ID0gJCgnaW5wdXRbbmFtZT1cImJpbGxpbmdfY2l0eVwiXScpLnZhbCgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciBzdGF0ZSA9ICdOb25lJztcbiAgICAgICAgICBpZiAoJCgnaW5wdXRbbmFtZT1cImJpbGxpbmdfc3RhdGVcIl0nKS52YWwoKSAhPSAnJykge1xuICAgICAgICAgICAgc3RhdGUgPSAkKCdpbnB1dFtuYW1lPVwiYmlsbGluZ19zdGF0ZVwiXScpLnZhbCgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHZhciB6aXAgPSAnTm9uZSc7XG4gICAgICAgICAgaWYgKCQoJ2lucHV0W25hbWU9XCJiaWxsaW5nX3ppcFwiXScpLnZhbCgpICE9ICcnKSB7XG4gICAgICAgICAgICB6aXAgPSAkKCdpbnB1dFtuYW1lPVwiYmlsbGluZ196aXBcIl0nKS52YWwoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgY291bnRyeSA9ICdVUyc7XG4gICAgICAgICAgaWYgKCQoJ2lucHV0W25hbWU9XCJiaWxsaW5nX2NvdW50cnlcIl0nKS52YWwoKSAhPSAnJykge1xuICAgICAgICAgICAgY291bnRyeSA9ICQoJ2lucHV0W25hbWU9XCJiaWxsaW5nX2NvdW50cnlcIl0nKS52YWwoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyAyLiBjcmVhdGUgbWlubnBvc3QgYWNjb3VudCBpZiBzcGVjaWZpZWRcbiAgICAgICAgICBpZiAob3B0aW9ucy5jcmVhdGVfYWNjb3VudCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdmFyIHVzZXIgPSB7XG4gICAgICAgICAgICAgIGVtYWlsOiAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgICAgICBmaXJzdF9uYW1lOiAkKG9wdGlvbnMuZmlyc3RfbmFtZV9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgICAgIGxhc3RfbmFtZTogJChvcHRpb25zLmxhc3RfbmFtZV9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgICAgIHBhc3N3b3JkOiAkKG9wdGlvbnMucGFzc3dvcmRfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgICAgICBjaXR5OiAkKG9wdGlvbnMuYWNjb3VudF9jaXR5X3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICAgICAgc3RhdGU6ICQob3B0aW9ucy5hY2NvdW50X3N0YXRlX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICAgICAgemlwOiAkKG9wdGlvbnMuYWNjb3VudF96aXBfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgICB1cmw6IG9wdGlvbnMubWlubnBvc3Rfcm9vdCArICcvd3AtanNvbi91c2VyLWFjY291bnQtbWFuYWdlbWVudC92MS9jcmVhdGUtdXNlcicsXG4gICAgICAgICAgICAgIGRhdGE6IHVzZXJcbiAgICAgICAgICAgIH0pLmRvbmUoZnVuY3Rpb24oIGRhdGEgKSB7XG4gICAgICAgICAgICAgIGlmIChkYXRhLnN0YXR1cyA9PT0gJ3N1Y2Nlc3MnICYmIGRhdGEucmVhc29uID09PSAnbmV3IHVzZXInKSB7XG4gICAgICAgICAgICAgICAgLy8gdXNlciBjcmVhdGVkIC0gdGhleSBzaG91bGQgcmVjZWl2ZSBlbWFpbFxuICAgICAgICAgICAgICAgIC8vIHN1Ym1pdCB0aGUgZm9ybVxuICAgICAgICAgICAgICAgIC8vc3VwcG9ydGZvcm0uZ2V0KDApLnN1Ym1pdCgpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIHVzZXIgbm90IGNyZWF0ZWRcbiAgICAgICAgICAgICAgICAvLyBzdGlsbCBzdWJtaXQgdGhlIGZvcm1cbiAgICAgICAgICAgICAgICAvL3N1cHBvcnRmb3JtLmdldCgwKS5zdWJtaXQoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCQoJ2lucHV0W25hbWU9XCJiYW5rVG9rZW5cIl0nKS5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgLy8gZmluYWxseSwgZ2V0IGEgdG9rZW4gZnJvbSBzdHJpcGUsIGFuZCB0cnkgdG8gY2hhcmdlIGl0IGlmIGl0IGlzIG5vdCBhY2hcbiAgICAgICAgICAgIHRoYXQuY3JlYXRlVG9rZW4odGhhdC5jYXJkTnVtYmVyRWxlbWVudCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIGlmIGl0IGlzIGFjaCwgd2UgYWxyZWFkeSBoYXZlIGEgdG9rZW4gc28gcGFzcyBpdCB0byBzdHJpcGUuXG4gICAgICAgICAgICB0aGF0LnN0cmlwZVRva2VuSGFuZGxlciggJCgnI2JhbmtUb2tlbicpLnZhbCgpLCAnYWNoJyApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyB0aGlzIG1lYW5zIHZhbGlkIGlzIGZhbHNlXG4gICAgICAgICAgdGhhdC5idXR0b25TdGF0dXMob3B0aW9ucywgJCh0aGF0Lm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLmZpbmQoJ2J1dHRvbicpLCBmYWxzZSk7XG4gICAgICAgIH1cblxuICAgICAgfSk7XG4gICAgfSwgLy8gdmFsaWRhdGVBbmRTdWJtaXRcblxuICAgIHN0cmlwZUVycm9yRGlzcGxheTogZnVuY3Rpb24oZXZlbnQsIHRoaXNfc2VsZWN0b3IsIGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIC8vIGxpc3RlbiBmb3IgZXJyb3JzIGFuZCBkaXNwbGF5L2hpZGUgZXJyb3IgbWVzc2FnZXNcbiAgICAgIHZhciB3aGljaF9lcnJvciA9IHRoaXNfc2VsZWN0b3IuYXR0cignaWQnKTtcbiAgICAgIGlmIChldmVudC5lcnJvcikge1xuICAgICAgICAkKCcuY2FyZC1pbnN0cnVjdGlvbi4nICsgd2hpY2hfZXJyb3IpLnRleHQoZXZlbnQuZXJyb3IubWVzc2FnZSArICcgUGxlYXNlIHRyeSBhZ2Fpbi4nKTtcbiAgICAgICAgJCgnLmNhcmQtaW5zdHJ1Y3Rpb24uJyArIHdoaWNoX2Vycm9yKS5hZGRDbGFzcygnaW52YWxpZCcpO1xuICAgICAgICB0aGlzX3NlbGVjdG9yLnBhcmVudCgpLmFkZENsYXNzKCdlcnJvcicpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJCgnLmNhcmQtaW5zdHJ1Y3Rpb24uJyArIHdoaWNoX2Vycm9yKS5yZW1vdmVDbGFzcygnaW52YWxpZCcpO1xuICAgICAgICAkKCcuY2FyZC1pbnN0cnVjdGlvbi4nICsgd2hpY2hfZXJyb3IpLmVtcHR5KCk7XG4gICAgICAgICQob3B0aW9ucy5jY19udW1fc2VsZWN0b3IsIGVsZW1lbnQpLnJlbW92ZUNsYXNzKCdlcnJvcicpO1xuICAgICAgICAkKG9wdGlvbnMuY2NfZXhwX3NlbGVjdG9yLCBlbGVtZW50KS5yZW1vdmVDbGFzcygnZXJyb3InKTtcbiAgICAgICAgJChvcHRpb25zLmNjX2N2dl9zZWxlY3RvciwgZWxlbWVudCkucmVtb3ZlQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICQob3B0aW9ucy5jY19udW1fc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdlcnJvcicpO1xuICAgICAgICAkKG9wdGlvbnMuY2NfZXhwX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnZXJyb3InKTtcbiAgICAgICAgJChvcHRpb25zLmNjX2N2dl9zZWxlY3RvciwgZWxlbWVudCkucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICB9XG4gICAgfSwgLy8gc3RyaXBlRXJyb3JEaXNwbGF5XG5cbiAgICBjcmVhdGVUb2tlbjogZnVuY3Rpb24oY2FyZCkge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdGhhdC5zdHJpcGUuY3JlYXRlVG9rZW4oY2FyZCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgaWYgKHJlc3VsdC5lcnJvcikge1xuICAgICAgICAgIC8vIFNob3cgdGhlIGVycm9ycyBvbiB0aGUgZm9ybVxuICAgICAgICAgIHRoYXQuYnV0dG9uU3RhdHVzKG9wdGlvbnMsICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKSwgZmFsc2UpO1xuICAgICAgICAgIHZhciBmaWVsZCA9IHJlc3VsdC5lcnJvci5maWVsZCArICdfZmllbGRfc2VsZWN0b3InO1xuICAgICAgICAgIHZhciBtZXNzYWdlID0gJyc7XG4gICAgICAgICAgaWYgKHR5cGVvZiByZXN1bHQuZXJyb3IubWVzc2FnZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIG1lc3NhZ2UgPSByZXN1bHQuZXJyb3IubWVzc2FnZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbWVzc2FnZSA9IHJlc3VsdC5lcnJvci5tZXNzYWdlWzBdO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoJChmaWVsZCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgJCh0aGF0Lm9wdGlvbnNbZmllbGRdLCBlbGVtZW50KS5hZGRDbGFzcygnZXJyb3InKTtcbiAgICAgICAgICAgICQodGhhdC5vcHRpb25zW2ZpZWxkXSwgZWxlbWVudCkucHJldigpLmFkZENsYXNzKCdlcnJvcicpO1xuICAgICAgICAgICAgJCh0aGF0Lm9wdGlvbnNbZmllbGRdLCBlbGVtZW50KS5hZnRlcignPHNwYW4gY2xhc3M9XCJjaGVjay1maWVsZCBpbnZhbGlkXCI+JyArIG1lc3NhZ2UgKyAnPC9zcGFuPicpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChyZXN1bHQuZXJyb3IuZmllbGQgPT0gJ2NzcmZfdG9rZW4nKSB7XG4gICAgICAgICAgICAkKCdidXR0b24uZ2l2ZScpLmJlZm9yZSgnPHAgY2xhc3M9XCJlcnJvclwiPlNvcnJ5LCB0aGlzIGZvcm0gaGFkIGEgYmFjay1lbmQgZXJyb3IgYW5kIHdhcyB1bmFibGUgdG8gY29tcGxldGUgeW91ciBkb25hdGlvbi4gUGxlYXNlIDxhIGhyZWY9XCIjXCIgb25jbGljaz1cImxvY2F0aW9uLnJlbG9hZCgpOyByZXR1cm4gZmFsc2U7XCI+cmVsb2FkIHRoZSBwYWdlPC9hPiBhbmQgdHJ5IGFnYWluICh3ZSB3aWxsIHByZXNlcnZlIGFzIG11Y2ggb2YgeW91ciBpbmZvcm1hdGlvbiBhcyBwb3NzaWJsZSkuPC9wPicpXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFNlbmQgdGhlIHRva2VuIHRvIHlvdXIgc2VydmVyXG4gICAgICAgICAgdGhhdC5zdHJpcGVUb2tlbkhhbmRsZXIocmVzdWx0LnRva2VuLCAnY2FyZCcpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LCAvLyBjcmVhdGVUb2tlblxuXG4gICAgc3RyaXBlVG9rZW5IYW5kbGVyOiBmdW5jdGlvbih0b2tlbiwgdHlwZSkge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgLy8gSW5zZXJ0IHRoZSB0b2tlbiBJRCBpbnRvIHRoZSBmb3JtIHNvIGl0IGdldHMgc3VibWl0dGVkIHRvIHRoZSBzZXJ2ZXJcbiAgICAgIHZhciBzdXBwb3J0Zm9ybSA9ICQodGhpcy5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKTtcbiAgICAgIGlmICggdHlwZSA9PT0gJ2NhcmQnICkge1xuICAgICAgICBzdXBwb3J0Zm9ybS5hcHBlbmQoJCgnPGlucHV0IHR5cGU9XFxcImhpZGRlblxcXCIgbmFtZT1cXFwic3RyaXBlVG9rZW5cXFwiPicpLnZhbCh0b2tlbi5pZCkpO1xuICAgICAgICBpZiAoJCgnaW5wdXRbbmFtZT1cInBheW1lbnRfdHlwZVwiXScpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAkKCdpbnB1dFtuYW1lPVwicGF5bWVudF90eXBlXCJdJykudmFsKHRva2VuLmNhcmQuYnJhbmQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN1cHBvcnRmb3JtLmFwcGVuZCgkKCc8aW5wdXQgdHlwZT1cXFwiaGlkZGVuXFxcIiBuYW1lPVxcXCJwYXltZW50X3R5cGVcXFwiIC8+JykudmFsKHRva2VuLmNhcmQuYnJhbmQpKTsgIFxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKCB0eXBlID09PSAnYWNoJyApIHtcbiAgICAgICAgaWYgKCQoJ2lucHV0W25hbWU9XCJwYXltZW50X3R5cGVcIl0nKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgJCgnaW5wdXRbbmFtZT1cInBheW1lbnRfdHlwZVwiXScpLnZhbCh0eXBlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdXBwb3J0Zm9ybS5hcHBlbmQoJCgnPGlucHV0IHR5cGU9XFxcImhpZGRlblxcXCIgbmFtZT1cXFwicGF5bWVudF90eXBlXFxcIiAvPicpLnZhbCh0eXBlKSk7ICBcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBTdWJtaXQgdGhlIGZvcm1cbiAgICAgIC8vc3VwcG9ydGZvcm0uc3VibWl0KCk7XG4gICAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6Jy9naXZlLycsXG4gICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgZGF0YTogJChzdXBwb3J0Zm9ybSkuc2VyaWFsaXplKCksXG4gICAgICAgIHR5cGU6ICdQT1NUJ1xuICAgICAgfSlcbiAgICAgIC5kb25lKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVzcG9uc2UuZXJyb3JzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIC8vIGRvIG5vdCBzdWJtaXQuIHRoZXJlIGlzIGFuIGVycm9yLlxuICAgICAgICAgIHRoYXQuYnV0dG9uU3RhdHVzKHRoYXQub3B0aW9ucywgJCh0aGF0Lm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLmZpbmQoJ2J1dHRvbicpLCBmYWxzZSk7XG4gICAgICAgICAgLy8gYWRkIHNvbWUgZXJyb3IgbWVzc2FnZXMgYW5kIHN0eWxlc1xuICAgICAgICAgICQuZWFjaChyZXNwb25zZS5lcnJvcnMsIGZ1bmN0aW9uKCBpbmRleCwgZXJyb3IgKSB7XG4gICAgICAgICAgICB2YXIgZmllbGQgPSBlcnJvci5maWVsZCArICdfZmllbGRfc2VsZWN0b3InO1xuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSAnJztcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZXJyb3IubWVzc2FnZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgbWVzc2FnZSA9IGVycm9yLm1lc3NhZ2U7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBtZXNzYWdlID0gZXJyb3IubWVzc2FnZVswXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICgkKGZpZWxkKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICQob3B0aW9uc1tmaWVsZF0pLmFkZENsYXNzKCdlcnJvcicpO1xuICAgICAgICAgICAgICAkKG9wdGlvbnNbZmllbGRdKS5wcmV2KCkuYWRkQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICAgICAgICQob3B0aW9uc1tmaWVsZF0pLmFmdGVyKCc8c3BhbiBjbGFzcz1cImNoZWNrLWZpZWxkIGludmFsaWRcIj4nICsgbWVzc2FnZSArICc8L3NwYW4+Jyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgZXJyb3IgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgIGlmIChlcnJvci5jb2RlID09ICdpbnZhbGlkX251bWJlcicgfHwgZXJyb3IuY29kZSA9PSAnaW5jb3JyZWN0X251bWJlcicgfHwgZXJyb3IuY29kZSA9PSAnY2FyZF9kZWNsaW5lZCcgfHwgZXJyb3IuY29kZSA9PSAncHJvY2Vzc2luZ19lcnJvcicpIHtcbiAgICAgICAgICAgICAgICAvLyBlcnJvciBoYW5kbGluZ1xuICAgICAgICAgICAgICAgIHRoYXQuc3RyaXBlRXJyb3JEaXNwbGF5KHJlc3BvbnNlLmVycm9ycywgJCh0aGF0Lm9wdGlvbnMuY2NfbnVtX3NlbGVjdG9yKSwgdGhhdC5lbGVtZW50LCB0aGF0Lm9wdGlvbnMgKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmIChlcnJvci5jb2RlID09ICdpbnZhbGlkX2V4cGlyeV9tb250aCcgfHwgZXJyb3IuY29kZSA9PSAnaW52YWxpZF9leHBpcnlfeWVhcicgfHwgZXJyb3IuY29kZSA9PSAnZXhwaXJlZF9jYXJkJykge1xuICAgICAgICAgICAgICAgIC8vIGVycm9yIGhhbmRsaW5nXG4gICAgICAgICAgICAgICAgdGhhdC5zdHJpcGVFcnJvckRpc3BsYXkocmVzcG9uc2UuZXJyb3JzLCAkKHRoYXQub3B0aW9ucy5jY19leHBfc2VsZWN0b3IpLCB0aGF0LmVsZW1lbnQsIHRoYXQub3B0aW9ucyApO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKGVycm9yLmNvZGUgPT0gJ2ludmFsaWRfY3ZjJyB8fCBlcnJvci5jb2RlID09ICdpbmNvcnJlY3RfY3ZjJykge1xuICAgICAgICAgICAgICAgIC8vIGVycm9yIGhhbmRsaW5nXG4gICAgICAgICAgICAgICAgdGhhdC5zdHJpcGVFcnJvckRpc3BsYXkocmVzcG9uc2UuZXJyb3JzLCAkKHRoYXQub3B0aW9ucy5jY19jdnZfc2VsZWN0b3IpLCB0aGF0LmVsZW1lbnQsIHRoYXQub3B0aW9ucyApO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKGVycm9yLnR5cGUgPT0gJ2ludmFsaWRfcmVxdWVzdF9lcnJvcicpIHtcbiAgICAgICAgICAgICAgICAkKCdidXR0b24uZ2l2ZScpLmJlZm9yZSgnPHAgY2xhc3M9XCJlcnJvclwiPicgKyBlcnJvci5tZXNzYWdlICsgJzwvcD4nKVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHR5cGVvZiByZXNwb25zZS5lcnJvcnNbMF0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgIHZhciBmaWVsZCA9IHJlc3BvbnNlLmVycm9yc1swXS5maWVsZCArICdfZmllbGRfc2VsZWN0b3InO1xuICAgICAgICAgICAgICBpZiAoJChmaWVsZCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICAgIHNjcm9sbFRvcDogJChvcHRpb25zW2ZpZWxkXSkucGFyZW50KCkub2Zmc2V0KCkudG9wXG4gICAgICAgICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN1cHBvcnRmb3JtLmdldCgwKS5zdWJtaXQoKTsgLy8gY29udGludWUgc3VibWl0dGluZyB0aGUgZm9ybVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLmVycm9yKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgIHRoYXQuYnV0dG9uU3RhdHVzKHRoYXQub3B0aW9ucywgJCh0aGF0Lm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLmZpbmQoJ2J1dHRvbicpLCBmYWxzZSk7XG4gICAgICB9KTtcblxuICAgIH0sXG5cbiAgICBzaG93TmV3c2xldHRlclNldHRpbmdzOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICBpZiAoJChvcHRpb25zLm5ld3NsZXR0ZXJfZ3JvdXBfc2VsZWN0b3IpLmxlbmd0aCA+IDAgJiYgdHlwZW9mICQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHZhciBnZXRfZGF0YSA9IHtcbiAgICAgICAgICBlbWFpbDogJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKVxuICAgICAgICB9O1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgdXJsOiBvcHRpb25zLm1pbm5wb3N0X3Jvb3QgKyAnL3dwLWpzb24vbWlubnBvc3QtYXBpL3YyL21haWxjaGltcC91c2VyJyxcbiAgICAgICAgICBkYXRhOiBnZXRfZGF0YVxuICAgICAgICB9KS5kb25lKGZ1bmN0aW9uKCByZXN1bHQgKSB7XG4gICAgICAgICAgaWYgKCB0eXBlb2YgcmVzdWx0Lm1haWxjaGltcF9zdGF0dXMgIT09ICd1bmRlZmluZWQnICkge1xuICAgICAgICAgICAgJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5hZnRlcignPGlucHV0IG5hbWU9XCJtYWlsY2hpbXBfc3RhdHVzXCIgdHlwZT1cImhpZGRlblwiIHZhbHVlPVwiJyArIHJlc3VsdC5tYWlsY2hpbXBfc3RhdHVzICsgJ1wiPicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIHR5cGVvZiByZXN1bHQubWFpbGNoaW1wX3VzZXJfaWQgIT09ICd1bmRlZmluZWQnICkge1xuICAgICAgICAgICAgJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5hZnRlcignPGlucHV0IG5hbWU9XCJtYWlsY2hpbXBfdXNlcl9pZFwiIHR5cGU9XCJoaWRkZW5cIiB2YWx1ZT1cIicgKyByZXN1bHQubWFpbGNoaW1wX3VzZXJfaWQgKyAnXCI+Jyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChyZXN1bHQubWFpbGNoaW1wX3N0YXR1cyA9PT0gJ3N1YnNjcmliZWQnKSB7XG4gICAgICAgICAgICAvLyB1c2VyIGNyZWF0ZWQgLSBzaG93IGEgc3VjY2VzcyBtZXNzYWdlXG4gICAgICAgICAgICAkKCcuY29uZmlybS1pbnN0cnVjdGlvbnMnKS50ZXh0KCQoJy5jb25maXJtLWluc3RydWN0aW9ucycpLmF0dHIoJ2RhdGEta25vd24tdXNlcicpKTtcbiAgICAgICAgICAgIHZhciBncm91cHMgPSByZXN1bHQuZ3JvdXBzO1xuICAgICAgICAgICAgJC5lYWNoKGdyb3VwcywgZnVuY3Rpb24oIGluZGV4LCB2YWx1ZSApIHtcbiAgICAgICAgICAgICAgaWYgKCB2YWx1ZSA9PT0gdHJ1ZSApIHtcbiAgICAgICAgICAgICAgICAkKCc6Y2hlY2tib3hbbmFtZT1cIicgKyBpbmRleCArICdcIl0nKS5wcm9wKCdjaGVja2VkJyx0cnVlKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKCc6Y2hlY2tib3hbbmFtZT1cIicgKyBpbmRleCArICdcIl0nKS5wcm9wKCdjaGVja2VkJyxmYWxzZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICB9LCAvLyBzaG93TmV3c2xldHRlclNldHRpbmdzXG5cbiAgICBjb25maXJtTWVzc2FnZVN1Ym1pdDogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuXG4gICAgICAvL3ZhciBleGlzdGluZ19uZXdzbGV0dGVyX3NldHRpbmdzID0gdGhpcy5vcHRpb25zLmV4aXN0aW5nX25ld3NsZXR0ZXJfc2V0dGluZ3M7XG4gICAgICB2YXIgZXhpc3RpbmdfbmV3c2xldHRlcl9zZXR0aW5ncyA9ICQoJy5zdXBwb3J0LW5ld3NsZXR0ZXIgOmlucHV0Jykuc2VyaWFsaXplKCk7XG4gICAgICAvL3RoaXMuZGVidWcoZXhpc3RpbmdfbmV3c2xldHRlcl9zZXR0aW5ncyk7XG5cbiAgICAgICQob3B0aW9ucy5jb25maXJtX2Zvcm1fc2VsZWN0b3IpLnN1Ym1pdChmdW5jdGlvbihldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIHZhciBjb25maXJtZm9ybSA9ICQob3B0aW9ucy5jb25maXJtX2Zvcm1fc2VsZWN0b3IpO1xuICAgICAgICAvLyBzdWJtaXQgc2V0dGluZ3MgdG8gbWFpbGNoaW1wXG4gICAgICAgIC8vIG5lZWQgdG8gZ2V0IHVzZXIgaW5mbyBvbiBhIGhpZGRlbiBmaWVsZCBoZXJlXG5cbiAgICAgICAgdmFyIG5ld3NsZXR0ZXJfZ3JvdXBzID0gJChvcHRpb25zLm5ld3NsZXR0ZXJfZ3JvdXBfc2VsZWN0b3IgKyAnOmNoZWNrZWQnKTtcbiAgICAgICAgdmFyIG1lc3NhZ2VfZ3JvdXBzID0gJChvcHRpb25zLm1lc3NhZ2VfZ3JvdXBfc2VsZWN0b3IgKyAnOmNoZWNrZWQnKTtcbiAgICAgICAgdmFyIG5ld19uZXdzbGV0dGVyX3NldHRpbmdzID0gJCgnLnN1cHBvcnQtbmV3c2xldHRlciA6aW5wdXQ6Y2hlY2tlZCcpLnNlcmlhbGl6ZSgpO1xuXG4gICAgICAgIGlmICgoZXhpc3RpbmdfbmV3c2xldHRlcl9zZXR0aW5ncyAhPT0gbmV3X25ld3NsZXR0ZXJfc2V0dGluZ3MpICYmICh0eXBlb2YgbmV3c2xldHRlcl9ncm91cHMgIT09ICd1bmRlZmluZWQnIHx8IHR5cGVvZiBtZXNzYWdlX2dyb3VwcyAhPT0gJ3VuZGVmaW5lZCcpKSB7XG4gICAgICAgICAgLy9hZGQgb3VyIG93biBhamF4IGNoZWNrIGFzIFgtUmVxdWVzdGVkLVdpdGggaXMgbm90IGFsd2F5cyByZWxpYWJsZVxuICAgICAgICAgIC8vYWpheF9mb3JtX2RhdGEgPSBuZXdfbmV3c2xldHRlcl9zZXR0aW5ncyArICcmYWpheHJlcXVlc3Q9dHJ1ZSZzdWJzY3JpYmUnO1xuXG4gICAgICAgICAgdmFyIHBvc3RfZGF0YSA9IHtcbiAgICAgICAgICAgIGVtYWlsOiAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgICAgZmlyc3RfbmFtZTogJChvcHRpb25zLmZpcnN0X25hbWVfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgICAgbGFzdF9uYW1lOiAkKG9wdGlvbnMubGFzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICAgIGdyb3Vwc19zdWJtaXR0ZWQ6IFtdXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHBvc3RfZGF0YS5ncm91cHNfYXZhaWxhYmxlID0gJ2FsbCc7XG5cbiAgICAgICAgICBpZiAoICQoJ2lucHV0W25hbWU9XCJtYWlsY2hpbXBfc3RhdHVzXCJdJykubGVuZ3RoID4gMCApIHtcbiAgICAgICAgICAgIHBvc3RfZGF0YS5tYWlsY2hpbXBfc3RhdHVzID0gJCgnaW5wdXRbbmFtZT1cIm1haWxjaGltcF9zdGF0dXNcIl0nKS52YWwoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoICQoJ2lucHV0W25hbWU9XCJtYWlsY2hpbXBfdXNlcl9pZFwiXScpLmxlbmd0aCA+IDAgKSB7XG4gICAgICAgICAgICBwb3N0X2RhdGEubWFpbGNoaW1wX3VzZXJfaWQgPSAkKCdpbnB1dFtuYW1lPVwibWFpbGNoaW1wX3VzZXJfaWRcIl0nKS52YWwoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodHlwZW9mIG5ld3NsZXR0ZXJfZ3JvdXBzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgJC5lYWNoKG5ld3NsZXR0ZXJfZ3JvdXBzLCBmdW5jdGlvbihpbmRleCwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgdmFyIGdyb3VwID0gJCh0aGlzKS5hdHRyKCduYW1lJyk7XG4gICAgICAgICAgICAgIHBvc3RfZGF0YS5ncm91cHNfc3VibWl0dGVkLnB1c2goZ3JvdXApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlX2dyb3VwcyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICQuZWFjaChtZXNzYWdlX2dyb3VwcywgZnVuY3Rpb24oaW5kZXgsIHZhbHVlKSB7XG4gICAgICAgICAgICAgIHZhciBncm91cCA9ICQodGhpcykuYXR0cignbmFtZScpO1xuICAgICAgICAgICAgICBwb3N0X2RhdGEuZ3JvdXBzX3N1Ym1pdHRlZC5wdXNoKGdyb3VwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IG9wdGlvbnMubWlubnBvc3Rfcm9vdCArICcvd3AtanNvbi9taW5ucG9zdC1hcGkvdjIvbWFpbGNoaW1wL3VzZXInLFxuICAgICAgICAgICAgdHlwZTogJ3Bvc3QnLFxuICAgICAgICAgICAgZGF0YVR5cGUgOiAnanNvbicsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkocG9zdF9kYXRhKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmRvbmUoZnVuY3Rpb24ocmVzcG9uc2UpIHsgLy8gcmVzcG9uc2UgZnJvbSB0aGUgUEhQIGFjdGlvblxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSAnJztcbiAgICAgICAgICAgIGlmICggcmVzcG9uc2Uuc3VjY2VzcyA9PT0gdHJ1ZSApIHtcbiAgICAgICAgICAgICAgLypzd2l0Y2ggKHJlc3BvbnNlLmRhdGEudXNlcl9zdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdleGlzdGluZyc6XG4gICAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ1RoYW5rcyBmb3IgdXBkYXRpbmcgeW91ciBlbWFpbCBwcmVmZXJlbmNlcy4gVGhleSB3aWxsIGdvIGludG8gZWZmZWN0IGltbWVkaWF0ZWx5Lic7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICduZXcnOlxuICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9ICdXZSBoYXZlIGFkZGVkIHlvdSB0byB0aGUgTWlublBvc3QgbWFpbGluZyBsaXN0Lic7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdwZW5kaW5nJzpcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnV2UgaGF2ZSBhZGRlZCB5b3UgdG8gdGhlIE1pbm5Qb3N0IG1haWxpbmcgbGlzdC4gWW91IHdpbGwgbmVlZCB0byBjbGljayB0aGUgY29uZmlybWF0aW9uIGxpbmsgaW4gdGhlIGVtYWlsIHdlIHNlbnQgdG8gYmVnaW4gcmVjZWl2aW5nIG1lc3NhZ2VzLic7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfSovXG4gICAgICAgICAgICAgIC8vY29uZmlybWZvcm0uZ2V0KDApLnN1Ym1pdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uZmlybWZvcm0uZ2V0KDApLnN1Ym1pdCgpO1xuICAgICAgICAgICAgLy8kKCcubS1ob2xkLW1lc3NhZ2UnKS5odG1sKCc8ZGl2IGNsYXNzPVwibS1mb3JtLW1lc3NhZ2UgbS1mb3JtLW1lc3NhZ2UtaW5mb1wiPicgKyBtZXNzYWdlICsgJzwvZGl2PicpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmZhaWwoZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIC8vIHdlIHNob3VsZCBwdXQgYW4gYWN0dWFsIGVycm9yIG1lc3NhZ2UgaGVyZSBzb21lZGF5LCBwcm9iYWJseVxuICAgICAgICAgICAgLy8kKCcubS1ob2xkLW1lc3NhZ2UnKS5odG1sKCc8ZGl2IGNsYXNzPVwibS1mb3JtLW1lc3NhZ2UgbS1mb3JtLW1lc3NhZ2UtaW5mb1wiPkFuIGVycm9yIGhhcyBvY2N1cmVkLiBQbGVhc2UgdHJ5IGFnYWluLjwvZGl2PicpO1xuICAgICAgICAgICAgY29uZmlybWZvcm0uZ2V0KDApLnN1Ym1pdCgpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0gZWxzZSB7IC8vIGVuZCBwYXJ0IHdoZXJlIHNldHRpbmdzIGNoYW5nZWRcbiAgICAgICAgICBjb25maXJtZm9ybS5nZXQoMCkuc3VibWl0KCk7XG4gICAgICAgIH1cblxuICAgICAgfSk7XG4gICAgICAvL3JldHVybiBmYWxzZTtcbiAgICB9LCAvLyBjb25maXJtTWVzc2FnZVN1Ym1pdFxuXG4gIH07IC8vIHBsdWdpbi5wcm90b3R5cGVcblxuICAvLyBBIHJlYWxseSBsaWdodHdlaWdodCBwbHVnaW4gd3JhcHBlciBhcm91bmQgdGhlIGNvbnN0cnVjdG9yLFxuICAvLyBwcmV2ZW50aW5nIGFnYWluc3QgbXVsdGlwbGUgaW5zdGFudGlhdGlvbnNcbiAgJC5mbltwbHVnaW5OYW1lXSA9IGZ1bmN0aW9uICggb3B0aW9ucyApIHtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICghJC5kYXRhKHRoaXMsICdwbHVnaW5fJyArIHBsdWdpbk5hbWUpKSB7XG4gICAgICAgICQuZGF0YSh0aGlzLCAncGx1Z2luXycgKyBwbHVnaW5OYW1lLCBuZXcgUGx1Z2luKCB0aGlzLCBvcHRpb25zICkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG59KSggalF1ZXJ5LCB3aW5kb3csIGRvY3VtZW50ICk7Il19
