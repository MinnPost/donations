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

      if ($(this.options.details_step_selector).length > 0 || $(this.options.review_step_selector).length > 0) {
        this.options.level = this.checkLevel(this.element, this.options, 'name'); // check what level it is

        this.options.levelnum = this.checkLevel(this.element, this.options, 'num'); // check what level it is as a number

        this.honorOrMemory(this.element, this.options); // in honor or in memory of someone
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0cmlwZS5wYXltZW50LmpzIiwibWlubnBvc3QuZ2l2aW5nLmpzIl0sIm5hbWVzIjpbImYiLCJleHBvcnRzIiwibW9kdWxlIiwiZGVmaW5lIiwiYW1kIiwiZyIsIndpbmRvdyIsImdsb2JhbCIsInNlbGYiLCJwYXltZW50IiwianMiLCJlIiwidCIsIm4iLCJyIiwicyIsIm8iLCJ1IiwiYSIsInJlcXVpcmUiLCJpIiwiRXJyb3IiLCJjb2RlIiwibCIsImNhbGwiLCJsZW5ndGgiLCJRSiIsInJyZXR1cm4iLCJydHJpbSIsInNlbGVjdG9yIiwiaXNET01FbGVtZW50IiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZWwiLCJub2RlTmFtZSIsInRyaW0iLCJ0ZXh0IiwicmVwbGFjZSIsInZhbCIsInJldCIsImFyZ3VtZW50cyIsInZhbHVlIiwicHJldmVudERlZmF1bHQiLCJldmVudE9iamVjdCIsInJldHVyblZhbHVlIiwibm9ybWFsaXplRXZlbnQiLCJvcmlnaW5hbCIsIndoaWNoIiwidGFyZ2V0Iiwic3JjRWxlbWVudCIsIm9yaWdpbmFsRXZlbnQiLCJkYXRhIiwiZGV0YWlsIiwiY2hhckNvZGUiLCJrZXlDb2RlIiwib24iLCJlbGVtZW50IiwiZXZlbnROYW1lIiwiY2FsbGJhY2siLCJqIiwibGVuIiwibGVuMSIsIm11bHRFdmVudE5hbWUiLCJvcmlnaW5hbENhbGxiYWNrIiwicmVmIiwibWF0Y2giLCJzcGxpdCIsImFkZEV2ZW50TGlzdGVuZXIiLCJhdHRhY2hFdmVudCIsImFkZENsYXNzIiwiY2xhc3NOYW1lIiwicmVzdWx0cyIsInB1c2giLCJjbGFzc0xpc3QiLCJhZGQiLCJoYXNDbGFzcyIsImNvbnRhaW5zIiwiUmVnRXhwIiwidGVzdCIsInJlbW92ZUNsYXNzIiwiY2xzIiwicmVtb3ZlIiwiam9pbiIsInRvZ2dsZUNsYXNzIiwiYm9vbCIsImFwcGVuZCIsInRvQXBwZW5kIiwiaW5zZXJ0QWRqYWNlbnRIVE1MIiwiZmluZCIsIk5vZGVMaXN0IiwiQXJyYXkiLCJ0cmlnZ2VyIiwibmFtZSIsImVycm9yIiwiZXYiLCJDdXN0b21FdmVudCIsImNyZWF0ZUV2ZW50IiwiaW5pdEN1c3RvbUV2ZW50IiwiaW5pdEV2ZW50IiwiZGlzcGF0Y2hFdmVudCIsIlBheW1lbnQiLCJjYXJkRnJvbU51bWJlciIsImNhcmRGcm9tVHlwZSIsImNhcmRzIiwiZGVmYXVsdEZvcm1hdCIsImZvcm1hdEJhY2tDYXJkTnVtYmVyIiwiZm9ybWF0QmFja0V4cGlyeSIsImZvcm1hdENhcmROdW1iZXIiLCJmb3JtYXRFeHBpcnkiLCJmb3JtYXRGb3J3YXJkRXhwaXJ5IiwiZm9ybWF0Rm9yd2FyZFNsYXNoIiwiZm9ybWF0TW9udGhFeHBpcnkiLCJoYXNUZXh0U2VsZWN0ZWQiLCJsdWhuQ2hlY2siLCJyZUZvcm1hdENhcmROdW1iZXIiLCJyZXN0cmljdENWQyIsInJlc3RyaWN0Q2FyZE51bWJlciIsInJlc3RyaWN0Q29tYmluZWRFeHBpcnkiLCJyZXN0cmljdEV4cGlyeSIsInJlc3RyaWN0TW9udGhFeHBpcnkiLCJyZXN0cmljdE51bWVyaWMiLCJyZXN0cmljdFllYXJFeHBpcnkiLCJzZXRDYXJkVHlwZSIsImluZGV4T2YiLCJpdGVtIiwidHlwZSIsInBhdHRlcm4iLCJmb3JtYXQiLCJjdmNMZW5ndGgiLCJsdWhuIiwibnVtIiwiY2FyZCIsImRpZ2l0IiwiZGlnaXRzIiwib2RkIiwic3VtIiwicmV2ZXJzZSIsInBhcnNlSW50Iiwic2VsZWN0aW9uU3RhcnQiLCJzZWxlY3Rpb25FbmQiLCJzZWxlY3Rpb24iLCJjcmVhdGVSYW5nZSIsInNldFRpbWVvdXQiLCJfdGhpcyIsImZucyIsInJlIiwidXBwZXJMZW5ndGgiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJtZXRhIiwic2xhc2giLCJtZXRhS2V5IiwiaW5wdXQiLCJjdHJsS2V5IiwiYWxsVHlwZXMiLCJjYXJkVHlwZSIsImNhcmRFeHBpcnlWYWwiLCJtb250aCIsInByZWZpeCIsInllYXIiLCJEYXRlIiwiZ2V0RnVsbFllYXIiLCJ0b1N0cmluZyIsInNsaWNlIiwidmFsaWRhdGVDYXJkTnVtYmVyIiwidmFsaWRhdGVDYXJkRXhwaXJ5IiwiY3VycmVudFRpbWUiLCJleHBpcnkiLCJzZXRNb250aCIsImdldE1vbnRoIiwidmFsaWRhdGVDYXJkQ1ZDIiwiY3ZjIiwicmVmMSIsImdyb3VwcyIsImV4ZWMiLCJzaGlmdCIsImZvcm1hdENhcmRDVkMiLCJmb3JtYXRDYXJkRXhwaXJ5IiwiZm9ybWF0Q2FyZEV4cGlyeU11bHRpcGxlIiwiZ2V0Q2FyZEFycmF5Iiwic2V0Q2FyZEFycmF5IiwiY2FyZEFycmF5IiwiYWRkVG9DYXJkQXJyYXkiLCJjYXJkT2JqZWN0IiwicmVtb3ZlRnJvbUNhcmRBcnJheSIsImtleSIsInNwbGljZSIsIiQiLCJ1bmRlZmluZWQiLCJwbHVnaW5OYW1lIiwiZGVmYXVsdHMiLCJQbHVnaW4iLCJvcHRpb25zIiwiZXh0ZW5kIiwiX2RlZmF1bHRzIiwiX25hbWUiLCJpbml0IiwicHJvdG90eXBlIiwicmVzZXQiLCJhbW91bnQiLCJwYXJzZUZsb2F0IiwibGV2ZWxfYW1vdW50X3NlbGVjdG9yIiwib3JpZ2luYWxfYW1vdW50Iiwib3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yIiwiZnJlcXVlbmN5IiwiZnJlcXVlbmN5X3NlbGVjdG9yIiwiYXR0ciIsInJlY3VycmluZyIsInJlY3VycmluZ19zZWxlY3RvciIsImNoYXJBdCIsInRvVXBwZXJDYXNlIiwicHJvY2Vzc2luZ19mZWUiLCJNYXRoIiwicm91bmQiLCJmZWVfYW1vdW50IiwicG93IiwidG9GaXhlZCIsInByb2Nlc3NpbmdfZmVlX3RleHQiLCJjcmVhdGVfYWNjb3VudCIsImJ1dHRvbl90ZXh0Iiwic3RyaXBlIiwiU3RyaXBlIiwic3RyaXBlX3B1Ymxpc2hhYmxlX2tleSIsImVsZW1lbnRzIiwicmVmZXJyZXIiLCJwcm9wIiwiZGVidWciLCJxdWVyeV9wYW5lbCIsInFzIiwicXVlcnkiLCJhY3RpdmUiLCJwYXltZW50UGFuZWxzIiwicGF5X2NjX3Byb2Nlc3Npbmdfc2VsZWN0b3IiLCJjcmVkaXRDYXJkUHJvY2Vzc2luZ0ZlZXMiLCJkZXRhaWxzX3N0ZXBfc2VsZWN0b3IiLCJyZXZpZXdfc3RlcF9zZWxlY3RvciIsImxldmVsIiwiY2hlY2tMZXZlbCIsImxldmVsbnVtIiwiaG9ub3JPck1lbW9yeSIsImRvbmF0ZV9zdGVwX3NlbGVjdG9yIiwiZG9uYXRlQW5vbnltb3VzbHkiLCJvdXRzaWRlVW5pdGVkU3RhdGVzIiwic2hpcHBpbmdBZGRyZXNzIiwiYWxsb3dNaW5ucG9zdEFjY291bnQiLCJjaG9vc2VQYXltZW50TWV0aG9kIiwiY3JlZGl0Q2FyZEZpZWxkcyIsImFjaEZpZWxkcyIsInZhbGlkYXRlQW5kU3VibWl0IiwiY2FsY3VsYXRlZF9hbW91bnRfc2VsZWN0b3IiLCJjYWxjdWxhdGVBbW91bnQiLCJ1c2VfcHJvbW9jb2RlX3NlbGVjdG9yIiwidXNlUHJvbW9Db2RlIiwiY2FsZW5kYXJfYnV0dG9uX3NlbGVjdG9yIiwiYWRkVG9DYWxlbmRhciIsImNvbmZpcm1fc3RlcF9zZWxlY3RvciIsInNob3dOZXdzbGV0dGVyU2V0dGluZ3MiLCJjb25maXJtTWVzc2FnZVN1Ym1pdCIsImIiLCJwIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwibG9jYXRpb24iLCJzZWFyY2giLCJzdWJzdHIiLCJtZXNzYWdlIiwiY29uc29sZSIsImxvZyIsImRpciIsImdldFF1ZXJ5U3RyaW5ncyIsImxpbmsiLCJ0aGF0IiwidXNldGFicyIsInRhYnMiLCJ0aXRsZSIsInBhZ2UiLCJuZXh0Iiwic3RlcCIsImluZGV4IiwibmF2X2l0ZW1fY291bnQiLCJvcHBfaWQiLCJvcHBfaWRfc2VsZWN0b3IiLCJuZXh0X3N0ZXAiLCJwb3N0X3B1cmNoYXNlIiwiY29uZmlybSIsImNvbmZpcm1fYnV0dG9uX3NlbGVjdG9yIiwiYW5hbHl0aWNzVHJhY2tpbmdTdGVwIiwiaGlkZSIsInNob3ciLCJwYXJlbnQiLCJnYSIsInRvTG93ZXJDYXNlIiwicGF0aG5hbWUiLCJjYWxjdWxhdGVGZWVzIiwicGF5bWVudF90eXBlIiwiYWpheCIsIm1ldGhvZCIsInVybCIsImRvbmUiLCJmZWVzIiwiY3JlZGl0Q2FyZEZlZUNoZWNrYm94IiwiZmllbGQiLCJmdWxsX2Ftb3VudCIsImlzIiwiZnVsbF9hbW91bnRfc2VsZWN0b3IiLCJhbm9ueW1vdXNfc2VsZWN0b3IiLCJuYW1lX3NlbGVjdG9yIiwiY2hhbmdlIiwicmV0dXJudmFsdWUiLCJsZXZlbGNsYXNzIiwiYW1vdW50X3llYXJseSIsImVhY2giLCJsZXZlbHMiLCJtYXgiLCJtaW4iLCJsZXZlbF9pbmRpY2F0b3Jfc2VsZWN0b3IiLCJyZXZpZXdfYmVuZWZpdHNfc2VsZWN0b3IiLCJsZXZlbF9uYW1lX3NlbGVjdG9yIiwicmV2aWV3X2xldmVsX2JlbmVmaXRzIiwiaG9ub3Jfc2VsZWN0b3IiLCJob25vcl9tZW1vcnlfbmFtZV9zZWxlY3RvciIsImhvbm9yX25hbWVfc2VsZWN0b3IiLCJtZW1vcnlfc2VsZWN0b3IiLCJtZW1vcnlfbmFtZV9zZWxlY3RvciIsImhvbm9yX29yX21lbW9yeV9jaG9vc2VyIiwic2hvd19iaWxsaW5nX2NvdW50cnlfc2VsZWN0b3IiLCJjbGljayIsImJpbGxpbmdfY291bnRyeV9zZWxlY3RvciIsInNob3dfc2hpcHBpbmdfY291bnRyeV9zZWxlY3RvciIsInNoaXBwaW5nX2NvdW50cnlfc2VsZWN0b3IiLCJzaG93X3NoaXBwaW5nIiwidXNlX2Zvcl9zaGlwcGluZ19zZWxlY3RvciIsInNoaXBwaW5nX3NlbGVjdG9yIiwiY2hhbmdlZCIsImFjY291bnRfZXhpc3RzIiwiZG9uZVR5cGluZyIsImVtYWlsIiwiZW1haWxfZmllbGRfc2VsZWN0b3IiLCJjaGVja01pbm5wb3N0QWNjb3VudEV4aXN0cyIsInR5cGluZ1RpbWVyIiwiZG9uZVR5cGluZ0ludGVydmFsIiwia2V5dXAiLCJjbGVhclRpbWVvdXQiLCJjcmVhdGVfbXBfc2VsZWN0b3IiLCJwYXNzd29yZF9zZWxlY3RvciIsImJlZm9yZSIsImdldCIsInRvZ2dsZSIsInBvcHVsYXRlQXR0ZW5kZWVzIiwicXVhbnRpdHkiLCJhdHRlbmRlZXMiLCJhdHRlbmRlZSIsImh0bWwiLCJkaXNwbGF5QW1vdW50Iiwic2luZ2xlX3VuaXRfcHJpY2UiLCJhZGRpdGlvbmFsX2Ftb3VudCIsInZhbGlkX2NvZGUiLCJsZXZlbGNoZWNrIiwiaGFzX2FkZGl0aW9uYWxfdGV4dF9zZWxlY3RvciIsImFkZGl0aW9uYWxfYW1vdW50X3NlbGVjdG9yIiwiYWRkaXRpb25hbF9hbW91bnRfZmllbGQiLCJxdWFudGl0eV9zZWxlY3RvciIsImFmdGVyIiwic2luZ2xlX3VuaXRfcHJpY2VfYXR0cmlidXRlIiwicXVhbnRpdHlfZmllbGQiLCJzdWNjZXNzIiwiaXRlbV9zZWxlY3RvciIsInByb21vY29kZV9zZWxlY3RvciIsImV2ZW50IiwiZXZlbnRfaWRfc2VsZWN0b3IiLCJldmVudF9pZCIsInByb21vX2NvZGUiLCJjaGVja1Byb21vQ29kZSIsInByb21vX3NlbGVjdG9yIiwiY3NzIiwidXNlciIsIm1pbm5wb3N0X3Jvb3QiLCJyZXN1bHQiLCJzdGF0dXMiLCJyZWFzb24iLCJjaG9vc2VfcGF5bWVudCIsImNoZWNrZWQiLCJjaGVja2VkX3ZhbHVlIiwicGF5bWVudF9tZXRob2Rfc2VsZWN0b3IiLCJpZCIsImRvbmF0ZV9mb3JtX3NlbGVjdG9yIiwicHJlcGVuZCIsInN0eWxlIiwiYmFzZSIsImljb25Db2xvciIsImxpbmVIZWlnaHQiLCJmb250V2VpZ2h0IiwiZm9udEZhbWlseSIsImZvbnRTaXplIiwiY2FyZE51bWJlckVsZW1lbnQiLCJjcmVhdGUiLCJtb3VudCIsImNjX251bV9zZWxlY3RvciIsImNhcmRFeHBpcnlFbGVtZW50IiwiY2NfZXhwX3NlbGVjdG9yIiwiY2FyZEN2Y0VsZW1lbnQiLCJjY19jdnZfc2VsZWN0b3IiLCJzdHJpcGVFcnJvckRpc3BsYXkiLCJicmFuZCIsInNldEJyYW5kSWNvbiIsImNhcmRCcmFuZFRvUGZDbGFzcyIsImJyYW5kSWNvbkVsZW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsInBmQ2xhc3MiLCJwbGFpZF9lbnYiLCJQbGFpZCIsImxpbmtIYW5kbGVyIiwic2VsZWN0QWNjb3VudCIsImFwaVZlcnNpb24iLCJlbnYiLCJjbGllbnROYW1lIiwicGxhaWRfcHVibGljX2tleSIsInByb2R1Y3QiLCJvbkxvYWQiLCJvblN1Y2Nlc3MiLCJwdWJsaWNfdG9rZW4iLCJtZXRhZGF0YSIsInN1cHBvcnRmb3JtIiwiYWNjb3VudF9pZCIsInNlcmlhbGl6ZSIsInJlc3BvbnNlIiwicGxhaWRfbGluayIsInN0cmlwZV9iYW5rX2FjY291bnRfdG9rZW4iLCJjb250ZW50cyIsInVud3JhcCIsIm9uRXhpdCIsImVyciIsIm9wZW4iLCJoYXNIdG1sNVZhbGlkYXRpb24iLCJjcmVhdGVFbGVtZW50IiwiY2hlY2tWYWxpZGl0eSIsImJ1dHRvblN0YXR1cyIsImJ1dHRvbiIsImRpc2FibGVkIiwic3VibWl0IiwiYW5pbWF0ZSIsInNjcm9sbFRvcCIsIm9mZnNldCIsInRvcCIsInZhbGlkIiwicGF5bWVudF9tZXRob2QiLCJmdWxsX25hbWUiLCJzdHJlZXQiLCJjaXR5Iiwic3RhdGUiLCJ6aXAiLCJjb3VudHJ5IiwiZmlyc3RfbmFtZSIsImZpcnN0X25hbWVfZmllbGRfc2VsZWN0b3IiLCJsYXN0X25hbWUiLCJsYXN0X25hbWVfZmllbGRfc2VsZWN0b3IiLCJwYXNzd29yZCIsInBhc3N3b3JkX2ZpZWxkX3NlbGVjdG9yIiwiYWNjb3VudF9jaXR5X3NlbGVjdG9yIiwiYWNjb3VudF9zdGF0ZV9zZWxlY3RvciIsImFjY291bnRfemlwX3NlbGVjdG9yIiwiY3JlYXRlVG9rZW4iLCJzdHJpcGVUb2tlbkhhbmRsZXIiLCJ0aGlzX3NlbGVjdG9yIiwid2hpY2hfZXJyb3IiLCJlbXB0eSIsInRoZW4iLCJwcmV2IiwidG9rZW4iLCJjYWNoZSIsImVycm9ycyIsIm5ld3NsZXR0ZXJfZ3JvdXBfc2VsZWN0b3IiLCJnZXRfZGF0YSIsIm1haWxjaGltcF9zdGF0dXMiLCJtYWlsY2hpbXBfdXNlcl9pZCIsImV4aXN0aW5nX25ld3NsZXR0ZXJfc2V0dGluZ3MiLCJjb25maXJtX2Zvcm1fc2VsZWN0b3IiLCJjb25maXJtZm9ybSIsIm5ld3NsZXR0ZXJfZ3JvdXBzIiwibWVzc2FnZV9ncm91cHMiLCJtZXNzYWdlX2dyb3VwX3NlbGVjdG9yIiwibmV3X25ld3NsZXR0ZXJfc2V0dGluZ3MiLCJwb3N0X2RhdGEiLCJncm91cHNfc3VibWl0dGVkIiwiZ3JvdXBzX2F2YWlsYWJsZSIsImdyb3VwIiwiZGF0YVR5cGUiLCJjb250ZW50VHlwZSIsIkpTT04iLCJzdHJpbmdpZnkiLCJmYWlsIiwiZm4iLCJqUXVlcnkiXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxDQUFDLFVBQVNBLENBQVQsRUFBVztBQUFDLE1BQUcsUUFBT0MsT0FBUCx5Q0FBT0EsT0FBUCxPQUFpQixRQUFqQixJQUEyQixPQUFPQyxNQUFQLEtBQWdCLFdBQTlDLEVBQTBEO0FBQUNBLElBQUFBLE1BQU0sQ0FBQ0QsT0FBUCxHQUFlRCxDQUFDLEVBQWhCO0FBQW1CLEdBQTlFLE1BQW1GLElBQUcsT0FBT0csTUFBUCxLQUFnQixVQUFoQixJQUE0QkEsTUFBTSxDQUFDQyxHQUF0QyxFQUEwQztBQUFDRCxJQUFBQSxNQUFNLENBQUMsRUFBRCxFQUFJSCxDQUFKLENBQU47QUFBYSxHQUF4RCxNQUE0RDtBQUFDLFFBQUlLLENBQUo7O0FBQU0sUUFBRyxPQUFPQyxNQUFQLEtBQWdCLFdBQW5CLEVBQStCO0FBQUNELE1BQUFBLENBQUMsR0FBQ0MsTUFBRjtBQUFTLEtBQXpDLE1BQThDLElBQUcsT0FBT0MsTUFBUCxLQUFnQixXQUFuQixFQUErQjtBQUFDRixNQUFBQSxDQUFDLEdBQUNFLE1BQUY7QUFBUyxLQUF6QyxNQUE4QyxJQUFHLE9BQU9DLElBQVAsS0FBYyxXQUFqQixFQUE2QjtBQUFDSCxNQUFBQSxDQUFDLEdBQUNHLElBQUY7QUFBTyxLQUFyQyxNQUF5QztBQUFDSCxNQUFBQSxDQUFDLEdBQUMsSUFBRjtBQUFPOztBQUFBLEtBQUNBLENBQUMsQ0FBQ0ksT0FBRixLQUFjSixDQUFDLENBQUNJLE9B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LFVBQVdHLE9BQVgsRUFBcUI7QUFDdEMsV0FBTyxLQUFLc0gsSUFBTCxDQUFVLFlBQVk7QUFDM0IsVUFBSSxDQUFDM0gsQ0FBQyxDQUFDeEksSUFBRixDQUFPLElBQVAsRUFBYSxZQUFZMEksVUFBekIsQ0FBTCxFQUEyQztBQUN6Q0YsUUFBQUEsQ0FBQyxDQUFDeEksSUFBRixDQUFPLElBQVAsRUFBYSxZQUFZMEksVUFBekIsRUFBcUMsSUFBSUUsTUFBSixDQUFZLElBQVosRUFBa0JDLE9BQWxCLENBQXJDO0FBQ0Q7QUFDRixLQUpNLENBQVA7QUFLRCxHQU5EO0FBUUQsQ0E5NENBLEVBODRDRzJTLE1BOTRDSCxFQTg0Q1dyZSxNQTk0Q1gsRUE4NENtQnlCLFFBOTRDbkIiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbihmKXtpZih0eXBlb2YgZXhwb3J0cz09PVwib2JqZWN0XCImJnR5cGVvZiBtb2R1bGUhPT1cInVuZGVmaW5lZFwiKXttb2R1bGUuZXhwb3J0cz1mKCl9ZWxzZSBpZih0eXBlb2YgZGVmaW5lPT09XCJmdW5jdGlvblwiJiZkZWZpbmUuYW1kKXtkZWZpbmUoW10sZil9ZWxzZXt2YXIgZztpZih0eXBlb2Ygd2luZG93IT09XCJ1bmRlZmluZWRcIil7Zz13aW5kb3d9ZWxzZSBpZih0eXBlb2YgZ2xvYmFsIT09XCJ1bmRlZmluZWRcIil7Zz1nbG9iYWx9ZWxzZSBpZih0eXBlb2Ygc2VsZiE9PVwidW5kZWZpbmVkXCIpe2c9c2VsZn1lbHNle2c9dGhpc30oZy5wYXltZW50IHx8IChnLnBheW1lbnQgPSB7fSkpLmpzID0gZigpfX0pKGZ1bmN0aW9uKCl7dmFyIGRlZmluZSxtb2R1bGUsZXhwb3J0cztyZXR1cm4gKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkoezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1xudmFyIFFKLCBycmV0dXJuLCBydHJpbTtcblxuUUogPSBmdW5jdGlvbihzZWxlY3Rvcikge1xuICBpZiAoUUouaXNET01FbGVtZW50KHNlbGVjdG9yKSkge1xuICAgIHJldHVybiBzZWxlY3RvcjtcbiAgfVxuICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XG59O1xuXG5RSi5pc0RPTUVsZW1lbnQgPSBmdW5jdGlvbihlbCkge1xuICByZXR1cm4gZWwgJiYgKGVsLm5vZGVOYW1lICE9IG51bGwpO1xufTtcblxucnRyaW0gPSAvXltcXHNcXHVGRUZGXFx4QTBdK3xbXFxzXFx1RkVGRlxceEEwXSskL2c7XG5cblFKLnRyaW0gPSBmdW5jdGlvbih0ZXh0KSB7XG4gIGlmICh0ZXh0ID09PSBudWxsKSB7XG4gICAgcmV0dXJuIFwiXCI7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuICh0ZXh0ICsgXCJcIikucmVwbGFjZShydHJpbSwgXCJcIik7XG4gIH1cbn07XG5cbnJyZXR1cm4gPSAvXFxyL2c7XG5cblFKLnZhbCA9IGZ1bmN0aW9uKGVsLCB2YWwpIHtcbiAgdmFyIHJldDtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgcmV0dXJuIGVsLnZhbHVlID0gdmFsO1xuICB9IGVsc2Uge1xuICAgIHJldCA9IGVsLnZhbHVlO1xuICAgIGlmICh0eXBlb2YgcmV0ID09PSBcInN0cmluZ1wiKSB7XG4gICAgICByZXR1cm4gcmV0LnJlcGxhY2UocnJldHVybiwgXCJcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChyZXQgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIFwiXCI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gcmV0O1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuUUoucHJldmVudERlZmF1bHQgPSBmdW5jdGlvbihldmVudE9iamVjdCkge1xuICBpZiAodHlwZW9mIGV2ZW50T2JqZWN0LnByZXZlbnREZWZhdWx0ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBldmVudE9iamVjdC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybjtcbiAgfVxuICBldmVudE9iamVjdC5yZXR1cm5WYWx1ZSA9IGZhbHNlO1xuICByZXR1cm4gZmFsc2U7XG59O1xuXG5RSi5ub3JtYWxpemVFdmVudCA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIG9yaWdpbmFsO1xuICBvcmlnaW5hbCA9IGU7XG4gIGUgPSB7XG4gICAgd2hpY2g6IG9yaWdpbmFsLndoaWNoICE9IG51bGwgPyBvcmlnaW5hbC53aGljaCA6IHZvaWQgMCxcbiAgICB0YXJnZXQ6IG9yaWdpbmFsLnRhcmdldCB8fCBvcmlnaW5hbC5zcmNFbGVtZW50LFxuICAgIHByZXZlbnREZWZhdWx0OiBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBRSi5wcmV2ZW50RGVmYXVsdChvcmlnaW5hbCk7XG4gICAgfSxcbiAgICBvcmlnaW5hbEV2ZW50OiBvcmlnaW5hbCxcbiAgICBkYXRhOiBvcmlnaW5hbC5kYXRhIHx8IG9yaWdpbmFsLmRldGFpbFxuICB9O1xuICBpZiAoZS53aGljaCA9PSBudWxsKSB7XG4gICAgZS53aGljaCA9IG9yaWdpbmFsLmNoYXJDb2RlICE9IG51bGwgPyBvcmlnaW5hbC5jaGFyQ29kZSA6IG9yaWdpbmFsLmtleUNvZGU7XG4gIH1cbiAgcmV0dXJuIGU7XG59O1xuXG5RSi5vbiA9IGZ1bmN0aW9uKGVsZW1lbnQsIGV2ZW50TmFtZSwgY2FsbGJhY2spIHtcbiAgdmFyIGVsLCBpLCBqLCBsZW4sIGxlbjEsIG11bHRFdmVudE5hbWUsIG9yaWdpbmFsQ2FsbGJhY2ssIHJlZjtcbiAgaWYgKGVsZW1lbnQubGVuZ3RoKSB7XG4gICAgZm9yIChpID0gMCwgbGVuID0gZWxlbWVudC5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgZWwgPSBlbGVtZW50W2ldO1xuICAgICAgUUoub24oZWwsIGV2ZW50TmFtZSwgY2FsbGJhY2spO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGV2ZW50TmFtZS5tYXRjaChcIiBcIikpIHtcbiAgICByZWYgPSBldmVudE5hbWUuc3BsaXQoXCIgXCIpO1xuICAgIGZvciAoaiA9IDAsIGxlbjEgPSByZWYubGVuZ3RoOyBqIDwgbGVuMTsgaisrKSB7XG4gICAgICBtdWx0RXZlbnROYW1lID0gcmVmW2pdO1xuICAgICAgUUoub24oZWxlbWVudCwgbXVsdEV2ZW50TmFtZSwgY2FsbGJhY2spO1xuICAgIH1cbiAgICByZXR1cm47XG4gIH1cbiAgb3JpZ2luYWxDYWxsYmFjayA9IGNhbGxiYWNrO1xuICBjYWxsYmFjayA9IGZ1bmN0aW9uKGUpIHtcbiAgICBlID0gUUoubm9ybWFsaXplRXZlbnQoZSk7XG4gICAgcmV0dXJuIG9yaWdpbmFsQ2FsbGJhY2soZSk7XG4gIH07XG4gIGlmIChlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIpIHtcbiAgICByZXR1cm4gZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgY2FsbGJhY2ssIGZhbHNlKTtcbiAgfVxuICBpZiAoZWxlbWVudC5hdHRhY2hFdmVudCkge1xuICAgIGV2ZW50TmFtZSA9IFwib25cIiArIGV2ZW50TmFtZTtcbiAgICByZXR1cm4gZWxlbWVudC5hdHRhY2hFdmVudChldmVudE5hbWUsIGNhbGxiYWNrKTtcbiAgfVxuICBlbGVtZW50WydvbicgKyBldmVudE5hbWVdID0gY2FsbGJhY2s7XG59O1xuXG5RSi5hZGRDbGFzcyA9IGZ1bmN0aW9uKGVsLCBjbGFzc05hbWUpIHtcbiAgdmFyIGU7XG4gIGlmIChlbC5sZW5ndGgpIHtcbiAgICByZXR1cm4gKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGksIGxlbiwgcmVzdWx0cztcbiAgICAgIHJlc3VsdHMgPSBbXTtcbiAgICAgIGZvciAoaSA9IDAsIGxlbiA9IGVsLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgIGUgPSBlbFtpXTtcbiAgICAgICAgcmVzdWx0cy5wdXNoKFFKLmFkZENsYXNzKGUsIGNsYXNzTmFtZSkpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfSkoKTtcbiAgfVxuICBpZiAoZWwuY2xhc3NMaXN0KSB7XG4gICAgcmV0dXJuIGVsLmNsYXNzTGlzdC5hZGQoY2xhc3NOYW1lKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZWwuY2xhc3NOYW1lICs9ICcgJyArIGNsYXNzTmFtZTtcbiAgfVxufTtcblxuUUouaGFzQ2xhc3MgPSBmdW5jdGlvbihlbCwgY2xhc3NOYW1lKSB7XG4gIHZhciBlLCBoYXNDbGFzcywgaSwgbGVuO1xuICBpZiAoZWwubGVuZ3RoKSB7XG4gICAgaGFzQ2xhc3MgPSB0cnVlO1xuICAgIGZvciAoaSA9IDAsIGxlbiA9IGVsLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBlID0gZWxbaV07XG4gICAgICBoYXNDbGFzcyA9IGhhc0NsYXNzICYmIFFKLmhhc0NsYXNzKGUsIGNsYXNzTmFtZSk7XG4gICAgfVxuICAgIHJldHVybiBoYXNDbGFzcztcbiAgfVxuICBpZiAoZWwuY2xhc3NMaXN0KSB7XG4gICAgcmV0dXJuIGVsLmNsYXNzTGlzdC5jb250YWlucyhjbGFzc05hbWUpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBuZXcgUmVnRXhwKCcoXnwgKScgKyBjbGFzc05hbWUgKyAnKCB8JCknLCAnZ2knKS50ZXN0KGVsLmNsYXNzTmFtZSk7XG4gIH1cbn07XG5cblFKLnJlbW92ZUNsYXNzID0gZnVuY3Rpb24oZWwsIGNsYXNzTmFtZSkge1xuICB2YXIgY2xzLCBlLCBpLCBsZW4sIHJlZiwgcmVzdWx0cztcbiAgaWYgKGVsLmxlbmd0aCkge1xuICAgIHJldHVybiAoZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaSwgbGVuLCByZXN1bHRzO1xuICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgZm9yIChpID0gMCwgbGVuID0gZWwubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgZSA9IGVsW2ldO1xuICAgICAgICByZXN1bHRzLnB1c2goUUoucmVtb3ZlQ2xhc3MoZSwgY2xhc3NOYW1lKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9KSgpO1xuICB9XG4gIGlmIChlbC5jbGFzc0xpc3QpIHtcbiAgICByZWYgPSBjbGFzc05hbWUuc3BsaXQoJyAnKTtcbiAgICByZXN1bHRzID0gW107XG4gICAgZm9yIChpID0gMCwgbGVuID0gcmVmLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBjbHMgPSByZWZbaV07XG4gICAgICByZXN1bHRzLnB1c2goZWwuY2xhc3NMaXN0LnJlbW92ZShjbHMpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdHM7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGVsLmNsYXNzTmFtZSA9IGVsLmNsYXNzTmFtZS5yZXBsYWNlKG5ldyBSZWdFeHAoJyhefFxcXFxiKScgKyBjbGFzc05hbWUuc3BsaXQoJyAnKS5qb2luKCd8JykgKyAnKFxcXFxifCQpJywgJ2dpJyksICcgJyk7XG4gIH1cbn07XG5cblFKLnRvZ2dsZUNsYXNzID0gZnVuY3Rpb24oZWwsIGNsYXNzTmFtZSwgYm9vbCkge1xuICB2YXIgZTtcbiAgaWYgKGVsLmxlbmd0aCkge1xuICAgIHJldHVybiAoZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaSwgbGVuLCByZXN1bHRzO1xuICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgZm9yIChpID0gMCwgbGVuID0gZWwubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgZSA9IGVsW2ldO1xuICAgICAgICByZXN1bHRzLnB1c2goUUoudG9nZ2xlQ2xhc3MoZSwgY2xhc3NOYW1lLCBib29sKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9KSgpO1xuICB9XG4gIGlmIChib29sKSB7XG4gICAgaWYgKCFRSi5oYXNDbGFzcyhlbCwgY2xhc3NOYW1lKSkge1xuICAgICAgcmV0dXJuIFFKLmFkZENsYXNzKGVsLCBjbGFzc05hbWUpO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gUUoucmVtb3ZlQ2xhc3MoZWwsIGNsYXNzTmFtZSk7XG4gIH1cbn07XG5cblFKLmFwcGVuZCA9IGZ1bmN0aW9uKGVsLCB0b0FwcGVuZCkge1xuICB2YXIgZTtcbiAgaWYgKGVsLmxlbmd0aCkge1xuICAgIHJldHVybiAoZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaSwgbGVuLCByZXN1bHRzO1xuICAgICAgcmVzdWx0cyA9IFtdO1xuICAgICAgZm9yIChpID0gMCwgbGVuID0gZWwubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgZSA9IGVsW2ldO1xuICAgICAgICByZXN1bHRzLnB1c2goUUouYXBwZW5kKGUsIHRvQXBwZW5kKSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzdWx0cztcbiAgICB9KSgpO1xuICB9XG4gIHJldHVybiBlbC5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIHRvQXBwZW5kKTtcbn07XG5cblFKLmZpbmQgPSBmdW5jdGlvbihlbCwgc2VsZWN0b3IpIHtcbiAgaWYgKGVsIGluc3RhbmNlb2YgTm9kZUxpc3QgfHwgZWwgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgIGVsID0gZWxbMF07XG4gIH1cbiAgcmV0dXJuIGVsLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xufTtcblxuUUoudHJpZ2dlciA9IGZ1bmN0aW9uKGVsLCBuYW1lLCBkYXRhKSB7XG4gIHZhciBlLCBlcnJvciwgZXY7XG4gIHRyeSB7XG4gICAgZXYgPSBuZXcgQ3VzdG9tRXZlbnQobmFtZSwge1xuICAgICAgZGV0YWlsOiBkYXRhXG4gICAgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgZSA9IGVycm9yO1xuICAgIGV2ID0gZG9jdW1lbnQuY3JlYXRlRXZlbnQoJ0N1c3RvbUV2ZW50Jyk7XG4gICAgaWYgKGV2LmluaXRDdXN0b21FdmVudCkge1xuICAgICAgZXYuaW5pdEN1c3RvbUV2ZW50KG5hbWUsIHRydWUsIHRydWUsIGRhdGEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBldi5pbml0RXZlbnQobmFtZSwgdHJ1ZSwgdHJ1ZSwgZGF0YSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBlbC5kaXNwYXRjaEV2ZW50KGV2KTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gUUo7XG5cblxufSx7fV0sMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XG4oZnVuY3Rpb24gKGdsb2JhbCl7XG52YXIgUGF5bWVudCwgUUosIGNhcmRGcm9tTnVtYmVyLCBjYXJkRnJvbVR5cGUsIGNhcmRzLCBkZWZhdWx0Rm9ybWF0LCBmb3JtYXRCYWNrQ2FyZE51bWJlciwgZm9ybWF0QmFja0V4cGlyeSwgZm9ybWF0Q2FyZE51bWJlciwgZm9ybWF0RXhwaXJ5LCBmb3JtYXRGb3J3YXJkRXhwaXJ5LCBmb3JtYXRGb3J3YXJkU2xhc2gsIGZvcm1hdE1vbnRoRXhwaXJ5LCBoYXNUZXh0U2VsZWN0ZWQsIGx1aG5DaGVjaywgcmVGb3JtYXRDYXJkTnVtYmVyLCByZXN0cmljdENWQywgcmVzdHJpY3RDYXJkTnVtYmVyLCByZXN0cmljdENvbWJpbmVkRXhwaXJ5LCByZXN0cmljdEV4cGlyeSwgcmVzdHJpY3RNb250aEV4cGlyeSwgcmVzdHJpY3ROdW1lcmljLCByZXN0cmljdFllYXJFeHBpcnksIHNldENhcmRUeXBlLFxuICBpbmRleE9mID0gW10uaW5kZXhPZiB8fCBmdW5jdGlvbihpdGVtKSB7IGZvciAodmFyIGkgPSAwLCBsID0gdGhpcy5sZW5ndGg7IGkgPCBsOyBpKyspIHsgaWYgKGkgaW4gdGhpcyAmJiB0aGlzW2ldID09PSBpdGVtKSByZXR1cm4gaTsgfSByZXR1cm4gLTE7IH07XG5cblFKID0gcmVxdWlyZSgncWovc3JjL3FqLmNvZmZlZScpO1xuXG5kZWZhdWx0Rm9ybWF0ID0gLyhcXGR7MSw0fSkvZztcblxuY2FyZHMgPSBbXG4gIHtcbiAgICB0eXBlOiAnYW1leCcsXG4gICAgcGF0dGVybjogL14zWzQ3XS8sXG4gICAgZm9ybWF0OiAvKFxcZHsxLDR9KShcXGR7MSw2fSk/KFxcZHsxLDV9KT8vLFxuICAgIGxlbmd0aDogWzE1XSxcbiAgICBjdmNMZW5ndGg6IFs0XSxcbiAgICBsdWhuOiB0cnVlXG4gIH0sIHtcbiAgICB0eXBlOiAnZGFua29ydCcsXG4gICAgcGF0dGVybjogL141MDE5LyxcbiAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgbGVuZ3RoOiBbMTZdLFxuICAgIGN2Y0xlbmd0aDogWzNdLFxuICAgIGx1aG46IHRydWVcbiAgfSwge1xuICAgIHR5cGU6ICdkaW5lcnNjbHViJyxcbiAgICBwYXR0ZXJuOiAvXigzNnwzOHwzMFswLTVdKS8sXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGxlbmd0aDogWzE0XSxcbiAgICBjdmNMZW5ndGg6IFszXSxcbiAgICBsdWhuOiB0cnVlXG4gIH0sIHtcbiAgICB0eXBlOiAnZGlzY292ZXInLFxuICAgIHBhdHRlcm46IC9eKDYwMTF8NjV8NjRbNC05XXw2MjIpLyxcbiAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgbGVuZ3RoOiBbMTZdLFxuICAgIGN2Y0xlbmd0aDogWzNdLFxuICAgIGx1aG46IHRydWVcbiAgfSwge1xuICAgIHR5cGU6ICdqY2InLFxuICAgIHBhdHRlcm46IC9eMzUvLFxuICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICBsZW5ndGg6IFsxNl0sXG4gICAgY3ZjTGVuZ3RoOiBbM10sXG4gICAgbHVobjogdHJ1ZVxuICB9LCB7XG4gICAgdHlwZTogJ2xhc2VyJyxcbiAgICBwYXR0ZXJuOiAvXig2NzA2fDY3NzF8NjcwOSkvLFxuICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICBsZW5ndGg6IFsxNiwgMTcsIDE4LCAxOV0sXG4gICAgY3ZjTGVuZ3RoOiBbM10sXG4gICAgbHVobjogdHJ1ZVxuICB9LCB7XG4gICAgdHlwZTogJ21hZXN0cm8nLFxuICAgIHBhdHRlcm46IC9eKDUwMTh8NTAyMHw1MDM4fDYzMDR8NjcwM3w2NzU5fDY3NlsxLTNdKS8sXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGxlbmd0aDogWzEyLCAxMywgMTQsIDE1LCAxNiwgMTcsIDE4LCAxOV0sXG4gICAgY3ZjTGVuZ3RoOiBbM10sXG4gICAgbHVobjogdHJ1ZVxuICB9LCB7XG4gICAgdHlwZTogJ21hc3RlcmNhcmQnLFxuICAgIHBhdHRlcm46IC9eNVsxLTVdLyxcbiAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgbGVuZ3RoOiBbMTZdLFxuICAgIGN2Y0xlbmd0aDogWzNdLFxuICAgIGx1aG46IHRydWVcbiAgfSwge1xuICAgIHR5cGU6ICd1bmlvbnBheScsXG4gICAgcGF0dGVybjogL142Mi8sXG4gICAgZm9ybWF0OiBkZWZhdWx0Rm9ybWF0LFxuICAgIGxlbmd0aDogWzE2LCAxNywgMTgsIDE5XSxcbiAgICBjdmNMZW5ndGg6IFszXSxcbiAgICBsdWhuOiBmYWxzZVxuICB9LCB7XG4gICAgdHlwZTogJ3Zpc2FlbGVjdHJvbicsXG4gICAgcGF0dGVybjogL140KDAyNnwxNzUwMHw0MDV8NTA4fDg0NHw5MVszN10pLyxcbiAgICBmb3JtYXQ6IGRlZmF1bHRGb3JtYXQsXG4gICAgbGVuZ3RoOiBbMTZdLFxuICAgIGN2Y0xlbmd0aDogWzNdLFxuICAgIGx1aG46IHRydWVcbiAgfSwge1xuICAgIHR5cGU6ICd2aXNhJyxcbiAgICBwYXR0ZXJuOiAvXjQvLFxuICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICBsZW5ndGg6IFsxMywgMTZdLFxuICAgIGN2Y0xlbmd0aDogWzNdLFxuICAgIGx1aG46IHRydWVcbiAgfSwge1xuICAgIHR5cGU6ICdlbG8nLFxuICAgIHBhdHRlcm46IC9eNDAxMXw0Mzg5MzV8NDUoMTQxNnw3Nil8NTAoNDE3NXw2Njk5fDY3fDkwWzQtN10pfDYzKDYyOTd8NjM2OCkvLFxuICAgIGZvcm1hdDogZGVmYXVsdEZvcm1hdCxcbiAgICBsZW5ndGg6IFsxNl0sXG4gICAgY3ZjTGVuZ3RoOiBbM10sXG4gICAgbHVobjogdHJ1ZVxuICB9XG5dO1xuXG5jYXJkRnJvbU51bWJlciA9IGZ1bmN0aW9uKG51bSkge1xuICB2YXIgY2FyZCwgaSwgbGVuO1xuICBudW0gPSAobnVtICsgJycpLnJlcGxhY2UoL1xcRC9nLCAnJyk7XG4gIGZvciAoaSA9IDAsIGxlbiA9IGNhcmRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgY2FyZCA9IGNhcmRzW2ldO1xuICAgIGlmIChjYXJkLnBhdHRlcm4udGVzdChudW0pKSB7XG4gICAgICByZXR1cm4gY2FyZDtcbiAgICB9XG4gIH1cbn07XG5cbmNhcmRGcm9tVHlwZSA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIGNhcmQsIGksIGxlbjtcbiAgZm9yIChpID0gMCwgbGVuID0gY2FyZHMubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICBjYXJkID0gY2FyZHNbaV07XG4gICAgaWYgKGNhcmQudHlwZSA9PT0gdHlwZSkge1xuICAgICAgcmV0dXJuIGNhcmQ7XG4gICAgfVxuICB9XG59O1xuXG5sdWhuQ2hlY2sgPSBmdW5jdGlvbihudW0pIHtcbiAgdmFyIGRpZ2l0LCBkaWdpdHMsIGksIGxlbiwgb2RkLCBzdW07XG4gIG9kZCA9IHRydWU7XG4gIHN1bSA9IDA7XG4gIGRpZ2l0cyA9IChudW0gKyAnJykuc3BsaXQoJycpLnJldmVyc2UoKTtcbiAgZm9yIChpID0gMCwgbGVuID0gZGlnaXRzLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgZGlnaXQgPSBkaWdpdHNbaV07XG4gICAgZGlnaXQgPSBwYXJzZUludChkaWdpdCwgMTApO1xuICAgIGlmICgob2RkID0gIW9kZCkpIHtcbiAgICAgIGRpZ2l0ICo9IDI7XG4gICAgfVxuICAgIGlmIChkaWdpdCA+IDkpIHtcbiAgICAgIGRpZ2l0IC09IDk7XG4gICAgfVxuICAgIHN1bSArPSBkaWdpdDtcbiAgfVxuICByZXR1cm4gc3VtICUgMTAgPT09IDA7XG59O1xuXG5oYXNUZXh0U2VsZWN0ZWQgPSBmdW5jdGlvbih0YXJnZXQpIHtcbiAgdmFyIHJlZjtcbiAgaWYgKCh0YXJnZXQuc2VsZWN0aW9uU3RhcnQgIT0gbnVsbCkgJiYgdGFyZ2V0LnNlbGVjdGlvblN0YXJ0ICE9PSB0YXJnZXQuc2VsZWN0aW9uRW5kKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKCh0eXBlb2YgZG9jdW1lbnQgIT09IFwidW5kZWZpbmVkXCIgJiYgZG9jdW1lbnQgIT09IG51bGwgPyAocmVmID0gZG9jdW1lbnQuc2VsZWN0aW9uKSAhPSBudWxsID8gcmVmLmNyZWF0ZVJhbmdlIDogdm9pZCAwIDogdm9pZCAwKSAhPSBudWxsKSB7XG4gICAgaWYgKGRvY3VtZW50LnNlbGVjdGlvbi5jcmVhdGVSYW5nZSgpLnRleHQpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmFsc2U7XG59O1xuXG5yZUZvcm1hdENhcmROdW1iZXIgPSBmdW5jdGlvbihlKSB7XG4gIHJldHVybiBzZXRUaW1lb3V0KChmdW5jdGlvbihfdGhpcykge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciB0YXJnZXQsIHZhbHVlO1xuICAgICAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgICB2YWx1ZSA9IFFKLnZhbCh0YXJnZXQpO1xuICAgICAgdmFsdWUgPSBQYXltZW50LmZucy5mb3JtYXRDYXJkTnVtYmVyKHZhbHVlKTtcbiAgICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCB2YWx1ZSk7XG4gICAgfTtcbiAgfSkodGhpcykpO1xufTtcblxuZm9ybWF0Q2FyZE51bWJlciA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIGNhcmQsIGRpZ2l0LCBsZW5ndGgsIHJlLCB0YXJnZXQsIHVwcGVyTGVuZ3RoLCB2YWx1ZTtcbiAgZGlnaXQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpO1xuICBpZiAoIS9eXFxkKyQvLnRlc3QoZGlnaXQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRhcmdldCA9IGUudGFyZ2V0O1xuICB2YWx1ZSA9IFFKLnZhbCh0YXJnZXQpO1xuICBjYXJkID0gY2FyZEZyb21OdW1iZXIodmFsdWUgKyBkaWdpdCk7XG4gIGxlbmd0aCA9ICh2YWx1ZS5yZXBsYWNlKC9cXEQvZywgJycpICsgZGlnaXQpLmxlbmd0aDtcbiAgdXBwZXJMZW5ndGggPSAxNjtcbiAgaWYgKGNhcmQpIHtcbiAgICB1cHBlckxlbmd0aCA9IGNhcmQubGVuZ3RoW2NhcmQubGVuZ3RoLmxlbmd0aCAtIDFdO1xuICB9XG4gIGlmIChsZW5ndGggPj0gdXBwZXJMZW5ndGgpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKCh0YXJnZXQuc2VsZWN0aW9uU3RhcnQgIT0gbnVsbCkgJiYgdGFyZ2V0LnNlbGVjdGlvblN0YXJ0ICE9PSB2YWx1ZS5sZW5ndGgpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGNhcmQgJiYgY2FyZC50eXBlID09PSAnYW1leCcpIHtcbiAgICByZSA9IC9eKFxcZHs0fXxcXGR7NH1cXHNcXGR7Nn0pJC87XG4gIH0gZWxzZSB7XG4gICAgcmUgPSAvKD86XnxcXHMpKFxcZHs0fSkkLztcbiAgfVxuICBpZiAocmUudGVzdCh2YWx1ZSkpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIHZhbHVlICsgJyAnICsgZGlnaXQpO1xuICB9IGVsc2UgaWYgKHJlLnRlc3QodmFsdWUgKyBkaWdpdCkpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIHZhbHVlICsgZGlnaXQgKyAnICcpO1xuICB9XG59O1xuXG5mb3JtYXRCYWNrQ2FyZE51bWJlciA9IGZ1bmN0aW9uKGUpIHtcbiAgdmFyIHRhcmdldCwgdmFsdWU7XG4gIHRhcmdldCA9IGUudGFyZ2V0O1xuICB2YWx1ZSA9IFFKLnZhbCh0YXJnZXQpO1xuICBpZiAoZS5tZXRhKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChlLndoaWNoICE9PSA4KSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICgodGFyZ2V0LnNlbGVjdGlvblN0YXJ0ICE9IG51bGwpICYmIHRhcmdldC5zZWxlY3Rpb25TdGFydCAhPT0gdmFsdWUubGVuZ3RoKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmICgvXFxkXFxzJC8udGVzdCh2YWx1ZSkpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIHZhbHVlLnJlcGxhY2UoL1xcZFxccyQvLCAnJykpO1xuICB9IGVsc2UgaWYgKC9cXHNcXGQ/JC8udGVzdCh2YWx1ZSkpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIHZhbHVlLnJlcGxhY2UoL1xcc1xcZD8kLywgJycpKTtcbiAgfVxufTtcblxuZm9ybWF0RXhwaXJ5ID0gZnVuY3Rpb24oZSkge1xuICB2YXIgZGlnaXQsIHRhcmdldCwgdmFsO1xuICBkaWdpdCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZS53aGljaCk7XG4gIGlmICghL15cXGQrJC8udGVzdChkaWdpdCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gIHZhbCA9IFFKLnZhbCh0YXJnZXQpICsgZGlnaXQ7XG4gIGlmICgvXlxcZCQvLnRlc3QodmFsKSAmJiAodmFsICE9PSAnMCcgJiYgdmFsICE9PSAnMScpKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCBcIjBcIiArIHZhbCArIFwiIC8gXCIpO1xuICB9IGVsc2UgaWYgKC9eXFxkXFxkJC8udGVzdCh2YWwpKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCB2YWwgKyBcIiAvIFwiKTtcbiAgfVxufTtcblxuZm9ybWF0TW9udGhFeHBpcnkgPSBmdW5jdGlvbihlKSB7XG4gIHZhciBkaWdpdCwgdGFyZ2V0LCB2YWw7XG4gIGRpZ2l0ID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKTtcbiAgaWYgKCEvXlxcZCskLy50ZXN0KGRpZ2l0KSkge1xuICAgIHJldHVybjtcbiAgfVxuICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgdmFsID0gUUoudmFsKHRhcmdldCkgKyBkaWdpdDtcbiAgaWYgKC9eXFxkJC8udGVzdCh2YWwpICYmICh2YWwgIT09ICcwJyAmJiB2YWwgIT09ICcxJykpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIFwiMFwiICsgdmFsKTtcbiAgfSBlbHNlIGlmICgvXlxcZFxcZCQvLnRlc3QodmFsKSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgXCJcIiArIHZhbCk7XG4gIH1cbn07XG5cbmZvcm1hdEZvcndhcmRFeHBpcnkgPSBmdW5jdGlvbihlKSB7XG4gIHZhciBkaWdpdCwgdGFyZ2V0LCB2YWw7XG4gIGRpZ2l0ID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKTtcbiAgaWYgKCEvXlxcZCskLy50ZXN0KGRpZ2l0KSkge1xuICAgIHJldHVybjtcbiAgfVxuICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgdmFsID0gUUoudmFsKHRhcmdldCk7XG4gIGlmICgvXlxcZFxcZCQvLnRlc3QodmFsKSkge1xuICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCB2YWwgKyBcIiAvIFwiKTtcbiAgfVxufTtcblxuZm9ybWF0Rm9yd2FyZFNsYXNoID0gZnVuY3Rpb24oZSkge1xuICB2YXIgc2xhc2gsIHRhcmdldCwgdmFsO1xuICBzbGFzaCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZS53aGljaCk7XG4gIGlmIChzbGFzaCAhPT0gJy8nKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRhcmdldCA9IGUudGFyZ2V0O1xuICB2YWwgPSBRSi52YWwodGFyZ2V0KTtcbiAgaWYgKC9eXFxkJC8udGVzdCh2YWwpICYmIHZhbCAhPT0gJzAnKSB7XG4gICAgcmV0dXJuIFFKLnZhbCh0YXJnZXQsIFwiMFwiICsgdmFsICsgXCIgLyBcIik7XG4gIH1cbn07XG5cbmZvcm1hdEJhY2tFeHBpcnkgPSBmdW5jdGlvbihlKSB7XG4gIHZhciB0YXJnZXQsIHZhbHVlO1xuICBpZiAoZS5tZXRhS2V5KSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRhcmdldCA9IGUudGFyZ2V0O1xuICB2YWx1ZSA9IFFKLnZhbCh0YXJnZXQpO1xuICBpZiAoZS53aGljaCAhPT0gOCkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoKHRhcmdldC5zZWxlY3Rpb25TdGFydCAhPSBudWxsKSAmJiB0YXJnZXQuc2VsZWN0aW9uU3RhcnQgIT09IHZhbHVlLmxlbmd0aCkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoL1xcZChcXHN8XFwvKSskLy50ZXN0KHZhbHVlKSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICByZXR1cm4gUUoudmFsKHRhcmdldCwgdmFsdWUucmVwbGFjZSgvXFxkKFxcc3xcXC8pKiQvLCAnJykpO1xuICB9IGVsc2UgaWYgKC9cXHNcXC9cXHM/XFxkPyQvLnRlc3QodmFsdWUpKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHJldHVybiBRSi52YWwodGFyZ2V0LCB2YWx1ZS5yZXBsYWNlKC9cXHNcXC9cXHM/XFxkPyQvLCAnJykpO1xuICB9XG59O1xuXG5yZXN0cmljdE51bWVyaWMgPSBmdW5jdGlvbihlKSB7XG4gIHZhciBpbnB1dDtcbiAgaWYgKGUubWV0YUtleSB8fCBlLmN0cmxLZXkpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAoZS53aGljaCA9PT0gMzIpIHtcbiAgICByZXR1cm4gZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG4gIGlmIChlLndoaWNoID09PSAwKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgaWYgKGUud2hpY2ggPCAzMykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGlucHV0ID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKTtcbiAgaWYgKCEvW1xcZFxcc10vLnRlc3QoaW5wdXQpKSB7XG4gICAgcmV0dXJuIGUucHJldmVudERlZmF1bHQoKTtcbiAgfVxufTtcblxucmVzdHJpY3RDYXJkTnVtYmVyID0gZnVuY3Rpb24oZSkge1xuICB2YXIgY2FyZCwgZGlnaXQsIHRhcmdldCwgdmFsdWU7XG4gIHRhcmdldCA9IGUudGFyZ2V0O1xuICBkaWdpdCA9IFN0cmluZy5mcm9tQ2hhckNvZGUoZS53aGljaCk7XG4gIGlmICghL15cXGQrJC8udGVzdChkaWdpdCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgaWYgKGhhc1RleHRTZWxlY3RlZCh0YXJnZXQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHZhbHVlID0gKFFKLnZhbCh0YXJnZXQpICsgZGlnaXQpLnJlcGxhY2UoL1xcRC9nLCAnJyk7XG4gIGNhcmQgPSBjYXJkRnJvbU51bWJlcih2YWx1ZSk7XG4gIGlmIChjYXJkKSB7XG4gICAgaWYgKCEodmFsdWUubGVuZ3RoIDw9IGNhcmQubGVuZ3RoW2NhcmQubGVuZ3RoLmxlbmd0aCAtIDFdKSkge1xuICAgICAgcmV0dXJuIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKCEodmFsdWUubGVuZ3RoIDw9IDE2KSkge1xuICAgICAgcmV0dXJuIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH1cbn07XG5cbnJlc3RyaWN0RXhwaXJ5ID0gZnVuY3Rpb24oZSwgbGVuZ3RoKSB7XG4gIHZhciBkaWdpdCwgdGFyZ2V0LCB2YWx1ZTtcbiAgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gIGRpZ2l0ID0gU3RyaW5nLmZyb21DaGFyQ29kZShlLndoaWNoKTtcbiAgaWYgKCEvXlxcZCskLy50ZXN0KGRpZ2l0KSkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoaGFzVGV4dFNlbGVjdGVkKHRhcmdldCkpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgdmFsdWUgPSBRSi52YWwodGFyZ2V0KSArIGRpZ2l0O1xuICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UoL1xcRC9nLCAnJyk7XG4gIGlmICh2YWx1ZS5sZW5ndGggPiBsZW5ndGgpIHtcbiAgICByZXR1cm4gZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG59O1xuXG5yZXN0cmljdENvbWJpbmVkRXhwaXJ5ID0gZnVuY3Rpb24oZSkge1xuICByZXR1cm4gcmVzdHJpY3RFeHBpcnkoZSwgNik7XG59O1xuXG5yZXN0cmljdE1vbnRoRXhwaXJ5ID0gZnVuY3Rpb24oZSkge1xuICByZXR1cm4gcmVzdHJpY3RFeHBpcnkoZSwgMik7XG59O1xuXG5yZXN0cmljdFllYXJFeHBpcnkgPSBmdW5jdGlvbihlKSB7XG4gIHJldHVybiByZXN0cmljdEV4cGlyeShlLCA0KTtcbn07XG5cbnJlc3RyaWN0Q1ZDID0gZnVuY3Rpb24oZSkge1xuICB2YXIgZGlnaXQsIHRhcmdldCwgdmFsO1xuICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgZGlnaXQgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUud2hpY2gpO1xuICBpZiAoIS9eXFxkKyQvLnRlc3QoZGlnaXQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChoYXNUZXh0U2VsZWN0ZWQodGFyZ2V0KSkge1xuICAgIHJldHVybjtcbiAgfVxuICB2YWwgPSBRSi52YWwodGFyZ2V0KSArIGRpZ2l0O1xuICBpZiAoISh2YWwubGVuZ3RoIDw9IDQpKSB7XG4gICAgcmV0dXJuIGUucHJldmVudERlZmF1bHQoKTtcbiAgfVxufTtcblxuc2V0Q2FyZFR5cGUgPSBmdW5jdGlvbihlKSB7XG4gIHZhciBhbGxUeXBlcywgY2FyZCwgY2FyZFR5cGUsIHRhcmdldCwgdmFsO1xuICB0YXJnZXQgPSBlLnRhcmdldDtcbiAgdmFsID0gUUoudmFsKHRhcmdldCk7XG4gIGNhcmRUeXBlID0gUGF5bWVudC5mbnMuY2FyZFR5cGUodmFsKSB8fCAndW5rbm93bic7XG4gIGlmICghUUouaGFzQ2xhc3ModGFyZ2V0LCBjYXJkVHlwZSkpIHtcbiAgICBhbGxUeXBlcyA9IChmdW5jdGlvbigpIHtcbiAgICAgIHZhciBpLCBsZW4sIHJlc3VsdHM7XG4gICAgICByZXN1bHRzID0gW107XG4gICAgICBmb3IgKGkgPSAwLCBsZW4gPSBjYXJkcy5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBjYXJkID0gY2FyZHNbaV07XG4gICAgICAgIHJlc3VsdHMucHVzaChjYXJkLnR5cGUpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdHM7XG4gICAgfSkoKTtcbiAgICBRSi5yZW1vdmVDbGFzcyh0YXJnZXQsICd1bmtub3duJyk7XG4gICAgUUoucmVtb3ZlQ2xhc3ModGFyZ2V0LCBhbGxUeXBlcy5qb2luKCcgJykpO1xuICAgIFFKLmFkZENsYXNzKHRhcmdldCwgY2FyZFR5cGUpO1xuICAgIFFKLnRvZ2dsZUNsYXNzKHRhcmdldCwgJ2lkZW50aWZpZWQnLCBjYXJkVHlwZSAhPT0gJ3Vua25vd24nKTtcbiAgICByZXR1cm4gUUoudHJpZ2dlcih0YXJnZXQsICdwYXltZW50LmNhcmRUeXBlJywgY2FyZFR5cGUpO1xuICB9XG59O1xuXG5QYXltZW50ID0gKGZ1bmN0aW9uKCkge1xuICBmdW5jdGlvbiBQYXltZW50KCkge31cblxuICBQYXltZW50LmZucyA9IHtcbiAgICBjYXJkRXhwaXJ5VmFsOiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgdmFyIG1vbnRoLCBwcmVmaXgsIHJlZiwgeWVhcjtcbiAgICAgIHZhbHVlID0gdmFsdWUucmVwbGFjZSgvXFxzL2csICcnKTtcbiAgICAgIHJlZiA9IHZhbHVlLnNwbGl0KCcvJywgMiksIG1vbnRoID0gcmVmWzBdLCB5ZWFyID0gcmVmWzFdO1xuICAgICAgaWYgKCh5ZWFyICE9IG51bGwgPyB5ZWFyLmxlbmd0aCA6IHZvaWQgMCkgPT09IDIgJiYgL15cXGQrJC8udGVzdCh5ZWFyKSkge1xuICAgICAgICBwcmVmaXggPSAobmV3IERhdGUpLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgIHByZWZpeCA9IHByZWZpeC50b1N0cmluZygpLnNsaWNlKDAsIDIpO1xuICAgICAgICB5ZWFyID0gcHJlZml4ICsgeWVhcjtcbiAgICAgIH1cbiAgICAgIG1vbnRoID0gcGFyc2VJbnQobW9udGgsIDEwKTtcbiAgICAgIHllYXIgPSBwYXJzZUludCh5ZWFyLCAxMCk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBtb250aDogbW9udGgsXG4gICAgICAgIHllYXI6IHllYXJcbiAgICAgIH07XG4gICAgfSxcbiAgICB2YWxpZGF0ZUNhcmROdW1iZXI6IGZ1bmN0aW9uKG51bSkge1xuICAgICAgdmFyIGNhcmQsIHJlZjtcbiAgICAgIG51bSA9IChudW0gKyAnJykucmVwbGFjZSgvXFxzK3wtL2csICcnKTtcbiAgICAgIGlmICghL15cXGQrJC8udGVzdChudW0pKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGNhcmQgPSBjYXJkRnJvbU51bWJlcihudW0pO1xuICAgICAgaWYgKCFjYXJkKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiAocmVmID0gbnVtLmxlbmd0aCwgaW5kZXhPZi5jYWxsKGNhcmQubGVuZ3RoLCByZWYpID49IDApICYmIChjYXJkLmx1aG4gPT09IGZhbHNlIHx8IGx1aG5DaGVjayhudW0pKTtcbiAgICB9LFxuICAgIHZhbGlkYXRlQ2FyZEV4cGlyeTogZnVuY3Rpb24obW9udGgsIHllYXIpIHtcbiAgICAgIHZhciBjdXJyZW50VGltZSwgZXhwaXJ5LCBwcmVmaXgsIHJlZjtcbiAgICAgIGlmICh0eXBlb2YgbW9udGggPT09ICdvYmplY3QnICYmICdtb250aCcgaW4gbW9udGgpIHtcbiAgICAgICAgcmVmID0gbW9udGgsIG1vbnRoID0gcmVmLm1vbnRoLCB5ZWFyID0gcmVmLnllYXI7XG4gICAgICB9XG4gICAgICBpZiAoIShtb250aCAmJiB5ZWFyKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBtb250aCA9IFFKLnRyaW0obW9udGgpO1xuICAgICAgeWVhciA9IFFKLnRyaW0oeWVhcik7XG4gICAgICBpZiAoIS9eXFxkKyQvLnRlc3QobW9udGgpKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGlmICghL15cXGQrJC8udGVzdCh5ZWFyKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoIShwYXJzZUludChtb250aCwgMTApIDw9IDEyKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICBpZiAoeWVhci5sZW5ndGggPT09IDIpIHtcbiAgICAgICAgcHJlZml4ID0gKG5ldyBEYXRlKS5nZXRGdWxsWWVhcigpO1xuICAgICAgICBwcmVmaXggPSBwcmVmaXgudG9TdHJpbmcoKS5zbGljZSgwLCAyKTtcbiAgICAgICAgeWVhciA9IHByZWZpeCArIHllYXI7XG4gICAgICB9XG4gICAgICBleHBpcnkgPSBuZXcgRGF0ZSh5ZWFyLCBtb250aCk7XG4gICAgICBjdXJyZW50VGltZSA9IG5ldyBEYXRlO1xuICAgICAgZXhwaXJ5LnNldE1vbnRoKGV4cGlyeS5nZXRNb250aCgpIC0gMSk7XG4gICAgICBleHBpcnkuc2V0TW9udGgoZXhwaXJ5LmdldE1vbnRoKCkgKyAxLCAxKTtcbiAgICAgIHJldHVybiBleHBpcnkgPiBjdXJyZW50VGltZTtcbiAgICB9LFxuICAgIHZhbGlkYXRlQ2FyZENWQzogZnVuY3Rpb24oY3ZjLCB0eXBlKSB7XG4gICAgICB2YXIgcmVmLCByZWYxO1xuICAgICAgY3ZjID0gUUoudHJpbShjdmMpO1xuICAgICAgaWYgKCEvXlxcZCskLy50ZXN0KGN2YykpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGUgJiYgY2FyZEZyb21UeXBlKHR5cGUpKSB7XG4gICAgICAgIHJldHVybiByZWYgPSBjdmMubGVuZ3RoLCBpbmRleE9mLmNhbGwoKHJlZjEgPSBjYXJkRnJvbVR5cGUodHlwZSkpICE9IG51bGwgPyByZWYxLmN2Y0xlbmd0aCA6IHZvaWQgMCwgcmVmKSA+PSAwO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGN2Yy5sZW5ndGggPj0gMyAmJiBjdmMubGVuZ3RoIDw9IDQ7XG4gICAgICB9XG4gICAgfSxcbiAgICBjYXJkVHlwZTogZnVuY3Rpb24obnVtKSB7XG4gICAgICB2YXIgcmVmO1xuICAgICAgaWYgKCFudW0pIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG4gICAgICByZXR1cm4gKChyZWYgPSBjYXJkRnJvbU51bWJlcihudW0pKSAhPSBudWxsID8gcmVmLnR5cGUgOiB2b2lkIDApIHx8IG51bGw7XG4gICAgfSxcbiAgICBmb3JtYXRDYXJkTnVtYmVyOiBmdW5jdGlvbihudW0pIHtcbiAgICAgIHZhciBjYXJkLCBncm91cHMsIHJlZiwgdXBwZXJMZW5ndGg7XG4gICAgICBjYXJkID0gY2FyZEZyb21OdW1iZXIobnVtKTtcbiAgICAgIGlmICghY2FyZCkge1xuICAgICAgICByZXR1cm4gbnVtO1xuICAgICAgfVxuICAgICAgdXBwZXJMZW5ndGggPSBjYXJkLmxlbmd0aFtjYXJkLmxlbmd0aC5sZW5ndGggLSAxXTtcbiAgICAgIG51bSA9IG51bS5yZXBsYWNlKC9cXEQvZywgJycpO1xuICAgICAgbnVtID0gbnVtLnNsaWNlKDAsICt1cHBlckxlbmd0aCArIDEgfHwgOWU5KTtcbiAgICAgIGlmIChjYXJkLmZvcm1hdC5nbG9iYWwpIHtcbiAgICAgICAgcmV0dXJuIChyZWYgPSBudW0ubWF0Y2goY2FyZC5mb3JtYXQpKSAhPSBudWxsID8gcmVmLmpvaW4oJyAnKSA6IHZvaWQgMDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGdyb3VwcyA9IGNhcmQuZm9ybWF0LmV4ZWMobnVtKTtcbiAgICAgICAgaWYgKGdyb3VwcyAhPSBudWxsKSB7XG4gICAgICAgICAgZ3JvdXBzLnNoaWZ0KCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGdyb3VwcyAhPSBudWxsID8gZ3JvdXBzLmpvaW4oJyAnKSA6IHZvaWQgMDtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgUGF5bWVudC5yZXN0cmljdE51bWVyaWMgPSBmdW5jdGlvbihlbCkge1xuICAgIHJldHVybiBRSi5vbihlbCwgJ2tleXByZXNzJywgcmVzdHJpY3ROdW1lcmljKTtcbiAgfTtcblxuICBQYXltZW50LmNhcmRFeHBpcnlWYWwgPSBmdW5jdGlvbihlbCkge1xuICAgIHJldHVybiBQYXltZW50LmZucy5jYXJkRXhwaXJ5VmFsKFFKLnZhbChlbCkpO1xuICB9O1xuXG4gIFBheW1lbnQuZm9ybWF0Q2FyZENWQyA9IGZ1bmN0aW9uKGVsKSB7XG4gICAgUGF5bWVudC5yZXN0cmljdE51bWVyaWMoZWwpO1xuICAgIFFKLm9uKGVsLCAna2V5cHJlc3MnLCByZXN0cmljdENWQyk7XG4gICAgcmV0dXJuIGVsO1xuICB9O1xuXG4gIFBheW1lbnQuZm9ybWF0Q2FyZEV4cGlyeSA9IGZ1bmN0aW9uKGVsKSB7XG4gICAgdmFyIG1vbnRoLCB5ZWFyO1xuICAgIFBheW1lbnQucmVzdHJpY3ROdW1lcmljKGVsKTtcbiAgICBpZiAoZWwubGVuZ3RoICYmIGVsLmxlbmd0aCA9PT0gMikge1xuICAgICAgbW9udGggPSBlbFswXSwgeWVhciA9IGVsWzFdO1xuICAgICAgdGhpcy5mb3JtYXRDYXJkRXhwaXJ5TXVsdGlwbGUobW9udGgsIHllYXIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBRSi5vbihlbCwgJ2tleXByZXNzJywgcmVzdHJpY3RDb21iaW5lZEV4cGlyeSk7XG4gICAgICBRSi5vbihlbCwgJ2tleXByZXNzJywgZm9ybWF0RXhwaXJ5KTtcbiAgICAgIFFKLm9uKGVsLCAna2V5cHJlc3MnLCBmb3JtYXRGb3J3YXJkU2xhc2gpO1xuICAgICAgUUoub24oZWwsICdrZXlwcmVzcycsIGZvcm1hdEZvcndhcmRFeHBpcnkpO1xuICAgICAgUUoub24oZWwsICdrZXlkb3duJywgZm9ybWF0QmFja0V4cGlyeSk7XG4gICAgfVxuICAgIHJldHVybiBlbDtcbiAgfTtcblxuICBQYXltZW50LmZvcm1hdENhcmRFeHBpcnlNdWx0aXBsZSA9IGZ1bmN0aW9uKG1vbnRoLCB5ZWFyKSB7XG4gICAgUUoub24obW9udGgsICdrZXlwcmVzcycsIHJlc3RyaWN0TW9udGhFeHBpcnkpO1xuICAgIFFKLm9uKG1vbnRoLCAna2V5cHJlc3MnLCBmb3JtYXRNb250aEV4cGlyeSk7XG4gICAgcmV0dXJuIFFKLm9uKHllYXIsICdrZXlwcmVzcycsIHJlc3RyaWN0WWVhckV4cGlyeSk7XG4gIH07XG5cbiAgUGF5bWVudC5mb3JtYXRDYXJkTnVtYmVyID0gZnVuY3Rpb24oZWwpIHtcbiAgICBQYXltZW50LnJlc3RyaWN0TnVtZXJpYyhlbCk7XG4gICAgUUoub24oZWwsICdrZXlwcmVzcycsIHJlc3RyaWN0Q2FyZE51bWJlcik7XG4gICAgUUoub24oZWwsICdrZXlwcmVzcycsIGZvcm1hdENhcmROdW1iZXIpO1xuICAgIFFKLm9uKGVsLCAna2V5ZG93bicsIGZvcm1hdEJhY2tDYXJkTnVtYmVyKTtcbiAgICBRSi5vbihlbCwgJ2tleXVwJywgc2V0Q2FyZFR5cGUpO1xuICAgIFFKLm9uKGVsLCAncGFzdGUnLCByZUZvcm1hdENhcmROdW1iZXIpO1xuICAgIHJldHVybiBlbDtcbiAgfTtcblxuICBQYXltZW50LmdldENhcmRBcnJheSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBjYXJkcztcbiAgfTtcblxuICBQYXltZW50LnNldENhcmRBcnJheSA9IGZ1bmN0aW9uKGNhcmRBcnJheSkge1xuICAgIGNhcmRzID0gY2FyZEFycmF5O1xuICAgIHJldHVybiB0cnVlO1xuICB9O1xuXG4gIFBheW1lbnQuYWRkVG9DYXJkQXJyYXkgPSBmdW5jdGlvbihjYXJkT2JqZWN0KSB7XG4gICAgcmV0dXJuIGNhcmRzLnB1c2goY2FyZE9iamVjdCk7XG4gIH07XG5cbiAgUGF5bWVudC5yZW1vdmVGcm9tQ2FyZEFycmF5ID0gZnVuY3Rpb24odHlwZSkge1xuICAgIHZhciBrZXksIHZhbHVlO1xuICAgIGZvciAoa2V5IGluIGNhcmRzKSB7XG4gICAgICB2YWx1ZSA9IGNhcmRzW2tleV07XG4gICAgICBpZiAodmFsdWUudHlwZSA9PT0gdHlwZSkge1xuICAgICAgICBjYXJkcy5zcGxpY2Uoa2V5LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG5cbiAgcmV0dXJuIFBheW1lbnQ7XG5cbn0pKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gUGF5bWVudDtcblxuZ2xvYmFsLlBheW1lbnQgPSBQYXltZW50O1xuXG5cbn0pLmNhbGwodGhpcyx0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiID8gZ2xvYmFsIDogdHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgPyBzZWxmIDogdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvdyA6IHt9KVxufSx7XCJxai9zcmMvcWouY29mZmVlXCI6MX1dfSx7fSxbMl0pKDIpXG59KTsiLCIvLyBNaW5uUG9zdCBHaXZpbmcgcGx1Z2luXG4vLyB0aGUgc2VtaS1jb2xvbiBiZWZvcmUgZnVuY3Rpb24gaW52b2NhdGlvbiBpcyBhIHNhZmV0eSBuZXQgYWdhaW5zdCBjb25jYXRlbmF0ZWRcbi8vIHNjcmlwdHMgYW5kL29yIG90aGVyIHBsdWdpbnMgd2hpY2ggbWF5IG5vdCBiZSBjbG9zZWQgcHJvcGVybHkuXG47KGZ1bmN0aW9uICggJCwgd2luZG93LCBkb2N1bWVudCwgdW5kZWZpbmVkICkge1xuXG4gIC8vIHVuZGVmaW5lZCBpcyB1c2VkIGhlcmUgYXMgdGhlIHVuZGVmaW5lZCBnbG9iYWwgdmFyaWFibGUgaW4gRUNNQVNjcmlwdCAzIGlzXG4gIC8vIG11dGFibGUgKGllLiBpdCBjYW4gYmUgY2hhbmdlZCBieSBzb21lb25lIGVsc2UpLiB1bmRlZmluZWQgaXNuJ3QgcmVhbGx5IGJlaW5nXG4gIC8vIHBhc3NlZCBpbiBzbyB3ZSBjYW4gZW5zdXJlIHRoZSB2YWx1ZSBvZiBpdCBpcyB0cnVseSB1bmRlZmluZWQuIEluIEVTNSwgdW5kZWZpbmVkXG4gIC8vIGNhbiBubyBsb25nZXIgYmUgbW9kaWZpZWQuXG5cbiAgLy8gd2luZG93IGFuZCBkb2N1bWVudCBhcmUgcGFzc2VkIHRocm91Z2ggYXMgbG9jYWwgdmFyaWFibGUgcmF0aGVyIHRoYW4gZ2xvYmFsXG4gIC8vIGFzIHRoaXMgKHNsaWdodGx5KSBxdWlja2VucyB0aGUgcmVzb2x1dGlvbiBwcm9jZXNzIGFuZCBjYW4gYmUgbW9yZSBlZmZpY2llbnRseVxuICAvLyBtaW5pZmllZCAoZXNwZWNpYWxseSB3aGVuIGJvdGggYXJlIHJlZ3VsYXJseSByZWZlcmVuY2VkIGluIHlvdXIgcGx1Z2luKS5cblxuICAvLyBDcmVhdGUgdGhlIGRlZmF1bHRzIG9uY2VcbiAgdmFyIHBsdWdpbk5hbWUgPSAnbWlubnBvc3RfZ2l2aW5nJyxcbiAgZGVmYXVsdHMgPSB7XG4gICAgJ2RlYnVnJyA6IGZhbHNlLCAvLyB0aGlzIGNhbiBiZSBzZXQgdG8gdHJ1ZSBvbiBwYWdlIGxldmVsIG9wdGlvbnNcbiAgICAndGFicycgOiB0cnVlLCAvLyBhcmUgd2UgZG9pbmcgdGhlIHRhYiB0aGluZ1xuICAgICdzdHJpcGVfcHVibGlzaGFibGVfa2V5JyA6ICcnLFxuICAgICdwbGFpZF9lbnYnIDogJycsXG4gICAgJ3BsYWlkX3B1YmxpY19rZXknIDogJycsXG4gICAgJ3BsYWlkX2xpbmsnIDogJyNhdXRob3JpemUtYWNoJyxcbiAgICAnbWlubnBvc3Rfcm9vdCcgOiAnaHR0cHM6Ly93d3cubWlubnBvc3QuY29tJyxcbiAgICAnZG9uYXRlX2Zvcm1fc2VsZWN0b3InOiAnI2RvbmF0ZScsXG4gICAgJ3Jldmlld19zdGVwX3NlbGVjdG9yJyA6ICcjcGFuZWwtLXJldmlldycsXG4gICAgJ2RldGFpbHNfc3RlcF9zZWxlY3RvcicgOiAnI3BhbmVsLS1kZXRhaWxzJyxcbiAgICAnYXR0ZW5kZWVzX3N0ZXBfc2VsZWN0b3InIDogJyNwYW5lbC0tYXR0ZW5kZWVzJyxcbiAgICAnZG9uYXRlX3N0ZXBfc2VsZWN0b3InIDogJyNwYW5lbC0tcGF5JyxcbiAgICAnY29uZmlybV9mb3JtX3NlbGVjdG9yJyA6ICcjY29uZmlybScsXG4gICAgJ2NvbmZpcm1fc3RlcF9zZWxlY3RvcicgOiAnI3BhbmVsLS1jb25maXJtYXRpb24nLFxuICAgICdhY3RpdmUnIDogJ3BhbmVsLS1wYXknLFxuICAgICdjb25maXJtJyA6ICdwYW5lbC0tY29uZmlybWF0aW9uJyxcbiAgICAncXVlcnknIDogJ3N0ZXAnLFxuICAgICdwYXlfY2NfcHJvY2Vzc2luZ19zZWxlY3RvcicgOiAnaW5wdXRbaWQ9XCJlZGl0LXBheS1mZWVzXCJdJyxcbiAgICAnZmVlX2Ftb3VudCcgOiAnLnByb2Nlc3NpbmctYW1vdW50JyxcbiAgICAnbGV2ZWxfYW1vdW50X3NlbGVjdG9yJyA6ICcjcGFuZWwtLXJldmlldyAuYW1vdW50IC5sZXZlbC1hbW91bnQnLFxuICAgICdvcmlnaW5hbF9hbW91bnRfc2VsZWN0b3InIDogJyNhbW91bnQnLFxuICAgICdmcmVxdWVuY3lfc2VsZWN0b3InIDogJy5mcmVxdWVuY3knLFxuICAgICdmdWxsX2Ftb3VudF9zZWxlY3RvcicgOiAnLmZ1bGwtYW1vdW50JyxcbiAgICAnbGV2ZWxfaW5kaWNhdG9yX3NlbGVjdG9yJyA6ICdoMi5sZXZlbCcsXG4gICAgJ2xldmVsX25hbWVfc2VsZWN0b3InIDogJy5sZXZlbC1uYW1lJyxcbiAgICAnbmFtZV9zZWxlY3RvcicgOiAnLmZvcm0taXRlbS0tZGlzcGxheS1uYW1lJyxcbiAgICAnaG9ub3JfbWVtb3J5X25hbWVfc2VsZWN0b3InIDogJy5mb3JtLWl0ZW0tLWhvbm9yLW1lbW9yeScsXG4gICAgJ2hvbm9yX29yX21lbW9yeV9jaG9vc2VyJyA6ICdpbnB1dFtuYW1lPVwiaW4taG9ub3Itb3ItbWVtb3J5XCJdJyxcbiAgICAnaG9ub3JfbmFtZV9zZWxlY3RvcicgOiAnLmhvbm9yJyxcbiAgICAnbWVtb3J5X25hbWVfc2VsZWN0b3InIDogJy5tZW1vcnknLFxuICAgICdob25vcl9zZWxlY3RvcicgOiAnI2VkaXQtaW4taG9ub3InLFxuICAgICdtZW1vcnlfc2VsZWN0b3InIDogJyNlZGl0LWluLW1lbW9yeScsXG4gICAgJ25vdGlmeV9zZWxlY3RvcicgOiAnLm5vdGlmeV9zb21lb25lJyxcbiAgICAnbm90aWZ5X2ZpZWxkX3NlbGVjdG9yJyA6ICcuZm9ybS1pdGVtLS1ub3RpZnknLFxuICAgICdhbm9ueW1vdXNfc2VsZWN0b3InIDogJyNlZGl0LWFub255bW91cycsXG4gICAgJ3Nob3dfYmlsbGluZ19jb3VudHJ5X3NlbGVjdG9yJyA6ICcjYmlsbGluZ19zaG93X2NvdW50cnknLFxuICAgICdiaWxsaW5nX2NvdW50cnlfc2VsZWN0b3InIDogJy5mb3JtLWl0ZW0tLWNvdW50cnknLFxuICAgICdzaG93X3NoaXBwaW5nX2NvdW50cnlfc2VsZWN0b3InIDogJyNzaGlwcGluZ19zaG93X2NvdW50cnknLFxuICAgICdzaGlwcGluZ19jb3VudHJ5X3NlbGVjdG9yJyA6ICcuZm9ybS1pdGVtLS1zaGlwcGluZy1jb3VudHJ5JyxcbiAgICAnc2hpcHBpbmdfYWRkcmVzc19zZWxlY3RvcicgOiAnLmZvcm0taXRlbS0tc2hpcHBpbmctYWRkcmVzcycsXG4gICAgJ3VzZV9mb3Jfc2hpcHBpbmdfc2VsZWN0b3InIDogJyN1c2Vmb3JzaGlwcGluZycsXG4gICAgJ2VtYWlsX2ZpZWxkX3NlbGVjdG9yJyA6ICcjZWRpdC1lbWFpbCcsXG4gICAgJ3Bhc3N3b3JkX2ZpZWxkX3NlbGVjdG9yJyA6ICcjcGFzc3dvcmQnLFxuICAgICdmaXJzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yJyA6ICcjZmlyc3RfbmFtZScsXG4gICAgJ2xhc3RfbmFtZV9maWVsZF9zZWxlY3RvcicgOiAnI2xhc3RfbmFtZScsXG4gICAgJ2FjY291bnRfY2l0eV9zZWxlY3RvcicgOiAnI2JpbGxpbmdfY2l0eScsXG4gICAgJ2FjY291bnRfc3RhdGVfc2VsZWN0b3InIDogJyNiaWxsaW5nX3N0YXRlJyxcbiAgICAnYWNjb3VudF96aXBfc2VsZWN0b3InIDogJyNiaWxsaW5nX3ppcCcsXG4gICAgJ2NyZWF0ZV9tcF9zZWxlY3RvcicgOiAnI2NyZWF0ZW1wYWNjb3VudCcsXG4gICAgJ3Bhc3N3b3JkX3NlbGVjdG9yJyA6ICcuZm9ybS1pdGVtLS1wYXNzd29yZCcsXG4gICAgJ2NhbGN1bGF0ZWRfYW1vdW50X3NlbGVjdG9yJyA6ICcuY2FsY3VsYXRlZC1hbW91bnQnLFxuICAgICdxdWFudGl0eV9maWVsZCcgOiAnI3F1YW50aXR5JyxcbiAgICAncXVhbnRpdHlfc2VsZWN0b3InIDogJy5xdWFudGl0eScsXG4gICAgJ2l0ZW1fc2VsZWN0b3InOiAnLnB1cmNoYXNlLWl0ZW0nLFxuICAgICdzaW5nbGVfdW5pdF9wcmljZV9hdHRyaWJ1dGUnIDogJ3VuaXQtcHJpY2UnLFxuICAgICdhZGRpdGlvbmFsX2Ftb3VudF9maWVsZCcgOiAnI2FkZGl0aW9uYWxfZG9uYXRpb24nLFxuICAgICdhZGRpdGlvbmFsX2Ftb3VudF9zZWxlY3RvcicgOiAnLmFkZGl0aW9uYWxfZG9uYXRpb24nLFxuICAgICdoYXNfYWRkaXRpb25hbF90ZXh0X3NlbGVjdG9yJyA6ICcuaGFzX2FkZGl0aW9uYWwnLFxuICAgICdwcm9tb19zZWxlY3RvcicgOiAnLmZvcm0taXRlbS0tcHJvbW8tY29kZScsXG4gICAgJ3VzZV9wcm9tb2NvZGVfc2VsZWN0b3InIDogJyN1c2UtcHJvbW8tY29kZScsXG4gICAgJ3Byb21vY29kZV9zZWxlY3RvcicgOiAnI3Byb21vX2NvZGUnLFxuICAgICdldmVudF9pZF9zZWxlY3RvcicgOiAnI2V2ZW50JyxcbiAgICAnY2FsZW5kYXJfYnV0dG9uX3NlbGVjdG9yJyA6ICcuYWRkZXZlbnRhdGMnLFxuICAgICdiaWxsaW5nX3NlbGVjdG9yJyA6ICdmaWVsZHNldC5iaWxsaW5nJyxcbiAgICAnc2hpcHBpbmdfc2VsZWN0b3InIDogJ2ZpZWxkc2V0LnNoaXBwaW5nJyxcbiAgICAnY3JlZGl0X2NhcmRfZmllbGRzZXQnIDogJy5wYXltZW50LW1ldGhvZC1ncm91cCcsXG4gICAgJ2Nob29zZV9wYXltZW50JyA6ICcjY2hvb3NlLXBheW1lbnQtbWV0aG9kJyxcbiAgICAncGF5bWVudF9tZXRob2Rfc2VsZWN0b3InIDogJy5wYXltZW50LW1ldGhvZCcsXG4gICAgJ2NjX251bV9zZWxlY3RvcicgOiAnI2NhcmQtbnVtYmVyJyxcbiAgICAnY2NfZXhwX3NlbGVjdG9yJyA6ICcjY2FyZC1leHBpcnknLFxuICAgICdjY19jdnZfc2VsZWN0b3InIDogJyNjYXJkLWN2YycsXG4gICAgJ3BheW1lbnRfYnV0dG9uX3NlbGVjdG9yJyA6ICcjc3VibWl0JyxcbiAgICAnY29uZmlybV9idXR0b25fc2VsZWN0b3InIDogJyNmaW5pc2gnLFxuICAgICdvcHBfaWRfc2VsZWN0b3InIDogJyNmbGFza19pZCcsXG4gICAgJ3JlY3VycmluZ19zZWxlY3RvcicgOiAnI3JlY3VycmluZycsXG4gICAgJ25ld3NsZXR0ZXJfZ3JvdXBfc2VsZWN0b3InIDogJy5mb3JtLWl0ZW0tLW5ld3NsZXR0ZXIgaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJyxcbiAgICAnbWVzc2FnZV9ncm91cF9zZWxlY3RvcicgOiAnLmZvcm0taXRlbS0tb3B0aW9uYWwgaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJyxcbiAgICAncmVhc29uX2ZpZWxkX3NlbGVjdG9yJyA6ICcjcmVhc29uX2Zvcl9zdXBwb3J0aW5nJyxcbiAgICAnc2hhcmVfcmVhc29uX3NlbGVjdG9yJyA6ICcjcmVhc29uX3NoYXJlYWJsZScsXG4gICAgJ2NvbmZpcm1fdG9wX3NlbGVjdG9yJyA6ICcuc3VwcG9ydC0tcG9zdC1jb25maXJtJyxcbiAgICAnZXhpc3RpbmdfbmV3c2xldHRlcl9zZXR0aW5ncycgOiAnJyxcbiAgICAnbGV2ZWxzJyA6IHtcbiAgICAgIDEgOiB7XG4gICAgICAgICduYW1lJyA6ICdicm9uemUnLFxuICAgICAgICAnbWF4JyA6IDYwXG4gICAgICB9LFxuICAgICAgMiA6IHtcbiAgICAgICAgJ25hbWUnIDogJ3NpbHZlcicsXG4gICAgICAgICdtaW4nIDogNjAsXG4gICAgICAgICdtYXgnIDogMTIwXG4gICAgICB9LFxuICAgICAgMyA6IHtcbiAgICAgICAgJ25hbWUnIDogJ2dvbGQnLFxuICAgICAgICAnbWluJyA6IDEyMCxcbiAgICAgICAgJ21heCcgOiAyNDBcbiAgICAgIH0sXG4gICAgICA0IDoge1xuICAgICAgICAnbmFtZScgOiAncGxhdGludW0nLFxuICAgICAgICAnbWluJyA6IDI0MFxuICAgICAgfVxuICAgIH1cblxuICB9OyAvLyBlbmQgZGVmYXVsdHNcblxuICAvLyBUaGUgYWN0dWFsIHBsdWdpbiBjb25zdHJ1Y3RvclxuICBmdW5jdGlvbiBQbHVnaW4oIGVsZW1lbnQsIG9wdGlvbnMgKSB7XG5cbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuXG4gICAgLy8galF1ZXJ5IGhhcyBhbiBleHRlbmQgbWV0aG9kIHdoaWNoIG1lcmdlcyB0aGUgY29udGVudHMgb2YgdHdvIG9yXG4gICAgLy8gbW9yZSBvYmplY3RzLCBzdG9yaW5nIHRoZSByZXN1bHQgaW4gdGhlIGZpcnN0IG9iamVjdC4gVGhlIGZpcnN0IG9iamVjdFxuICAgIC8vIGlzIGdlbmVyYWxseSBlbXB0eSBhcyB3ZSBkb24ndCB3YW50IHRvIGFsdGVyIHRoZSBkZWZhdWx0IG9wdGlvbnMgZm9yXG4gICAgLy8gZnV0dXJlIGluc3RhbmNlcyBvZiB0aGUgcGx1Z2luXG4gICAgdGhpcy5vcHRpb25zID0gJC5leHRlbmQoIHt9LCBkZWZhdWx0cywgb3B0aW9ucyApO1xuXG4gICAgdGhpcy5fZGVmYXVsdHMgPSBkZWZhdWx0cztcbiAgICB0aGlzLl9uYW1lID0gcGx1Z2luTmFtZTtcblxuICAgIHRoaXMuaW5pdCgpO1xuICB9IC8vIGVuZCBjb25zdHJ1Y3RvclxuXG4gIFBsdWdpbi5wcm90b3R5cGUgPSB7XG5cbiAgICBpbml0OiBmdW5jdGlvbihyZXNldCwgYW1vdW50KSB7XG5cbiAgICAgIC8vIFBsYWNlIGluaXRpYWxpemF0aW9uIGxvZ2ljIGhlcmVcbiAgICAgIC8vIFlvdSBhbHJlYWR5IGhhdmUgYWNjZXNzIHRvIHRoZSBET00gZWxlbWVudCBhbmRcbiAgICAgIC8vIHRoZSBvcHRpb25zIHZpYSB0aGUgaW5zdGFuY2UsIGUuZy4gdGhpcy5lbGVtZW50XG4gICAgICAvLyBhbmQgdGhpcy5vcHRpb25zXG4gICAgICAvLyB5b3UgY2FuIGFkZCBtb3JlIGZ1bmN0aW9ucyBsaWtlIHRoZSBvbmUgYmVsb3cgYW5kXG4gICAgICAvLyBjYWxsIHRoZW0gbGlrZSBzbzogdGhpcy55b3VyT3RoZXJGdW5jdGlvbih0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucykuXG5cbiAgICAgIC8vIG1vZGlmeSBvcHRpb25zIGFzIG5lZWRlZFxuICAgICAgLy92YXIgdGhpcy5vcHRpb25zLmFtb3VudCA9ICcnO1xuICAgICAgaWYgKHJlc2V0ICE9PSB0cnVlKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5hbW91bnQgPSBwYXJzZUZsb2F0KCQodGhpcy5vcHRpb25zLmxldmVsX2Ftb3VudF9zZWxlY3RvciwgdGhpcy5lbGVtZW50KS50ZXh0KCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLmFtb3VudCA9IGFtb3VudDtcbiAgICAgIH1cbiAgICAgIHRoaXMub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQgPSBwYXJzZUludCgkKHRoaXMub3B0aW9ucy5vcmlnaW5hbF9hbW91bnRfc2VsZWN0b3IsIHRoaXMuZWxlbWVudCkudmFsKCksIDEwKTtcbiAgICAgIHRoaXMub3B0aW9ucy5mcmVxdWVuY3kgPSBwYXJzZUZsb2F0KCQodGhpcy5vcHRpb25zLmZyZXF1ZW5jeV9zZWxlY3RvciwgdGhpcy5lbGVtZW50KS5hdHRyKCdkYXRhLXllYXItZnJlcScpKTtcbiAgICAgIHZhciByZWN1cnJpbmcgPSAkKHRoaXMub3B0aW9ucy5yZWN1cnJpbmdfc2VsZWN0b3IsIHRoaXMuZWxlbWVudCkudmFsKCk7XG4gICAgICBpZiAodHlwZW9mIHJlY3VycmluZyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLnJlY3VycmluZyA9IHJlY3VycmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHJlY3VycmluZy5zbGljZSgxKTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgdGhpcy5vcHRpb25zLnByb2Nlc3NpbmdfZmVlID0gKE1hdGgucm91bmQocGFyc2VGbG9hdCh0aGlzLm9wdGlvbnMuZmVlX2Ftb3VudCkqTWF0aC5wb3coMTAsMikpL01hdGgucG93KDEwLDIpKS50b0ZpeGVkKDIpO1xuICAgICAgdGhpcy5vcHRpb25zLnByb2Nlc3NpbmdfZmVlX3RleHQgPSB0aGlzLm9wdGlvbnMucHJvY2Vzc2luZ19mZWU7XG4gICAgICBcbiAgICAgIHRoaXMub3B0aW9ucy5jYXJkVHlwZSA9IG51bGw7XG4gICAgICB0aGlzLm9wdGlvbnMuY3JlYXRlX2FjY291bnQgPSBmYWxzZTtcblxuICAgICAgdmFyIGJ1dHRvbl90ZXh0ID0gJCgnYnV0dG9uLmdpdmUsIGlucHV0LmdpdmUnKS50ZXh0KCk7XG4gICAgICB0aGlzLm9wdGlvbnMuYnV0dG9uX3RleHQgPSBidXR0b25fdGV4dDtcblxuICAgICAgdGhpcy5zdHJpcGUgPSBTdHJpcGUodGhpcy5vcHRpb25zLnN0cmlwZV9wdWJsaXNoYWJsZV9rZXkpO1xuICAgICAgdGhpcy5lbGVtZW50cyA9IHRoaXMuc3RyaXBlLmVsZW1lbnRzKCk7XG5cbiAgICAgIC8vIHVzZSBhIHJlZmVycmVyIGZvciBlZGl0IGxpbmsgaWYgd2UgaGF2ZSBvbmVcbiAgICAgIGlmIChkb2N1bWVudC5yZWZlcnJlciAhPT0gJycpIHtcbiAgICAgICAgJCgnI2VkaXRfdXJsJykucHJvcCgnaHJlZicsIGRvY3VtZW50LnJlZmVycmVyKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5kZWJ1ZyA9PT0gdHJ1ZSkge1xuICAgICAgICB0aGlzLmRlYnVnKHRoaXMub3B0aW9ucyk7XG4gICAgICAgIC8vIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gdGFiIHN0dWZmXG4gICAgICB2YXIgcXVlcnlfcGFuZWwgPSB0aGlzLnFzW3RoaXMub3B0aW9ucy5xdWVyeV07XG4gICAgICBpZiAodHlwZW9mIHF1ZXJ5X3BhbmVsID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBxdWVyeV9wYW5lbCA9IHRoaXMub3B0aW9ucy5hY3RpdmU7XG4gICAgICB9XG5cbiAgICAgIC8vIGNhbGwgZnVuY3Rpb25zXG5cbiAgICAgIHRoaXMucGF5bWVudFBhbmVscyhxdWVyeV9wYW5lbCk7IC8vIHRhYnNcblxuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLnBheV9jY19wcm9jZXNzaW5nX3NlbGVjdG9yKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuY3JlZGl0Q2FyZFByb2Nlc3NpbmdGZWVzKHRoaXMub3B0aW9ucywgcmVzZXQpOyAvLyBwcm9jZXNzaW5nIGZlZXNcbiAgICAgIH1cblxuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmRldGFpbHNfc3RlcF9zZWxlY3RvcikubGVuZ3RoID4gMCB8fCAkKHRoaXMub3B0aW9ucy5yZXZpZXdfc3RlcF9zZWxlY3RvcikubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLm9wdGlvbnMubGV2ZWwgPSB0aGlzLmNoZWNrTGV2ZWwodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMsICduYW1lJyk7IC8vIGNoZWNrIHdoYXQgbGV2ZWwgaXQgaXNcbiAgICAgICAgdGhpcy5vcHRpb25zLmxldmVsbnVtID0gdGhpcy5jaGVja0xldmVsKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zLCAnbnVtJyk7IC8vIGNoZWNrIHdoYXQgbGV2ZWwgaXQgaXMgYXMgYSBudW1iZXJcbiAgICAgICAgdGhpcy5ob25vck9yTWVtb3J5KHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gaW4gaG9ub3Igb3IgaW4gbWVtb3J5IG9mIHNvbWVvbmVcbiAgICAgIH1cbiAgICAgIFxuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmRvbmF0ZV9zdGVwX3NlbGVjdG9yKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuZG9uYXRlQW5vbnltb3VzbHkodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBhbm9ueW1vdXNcbiAgICAgICAgdGhpcy5vdXRzaWRlVW5pdGVkU3RhdGVzKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gb3V0c2lkZSBVU1xuICAgICAgICB0aGlzLnNoaXBwaW5nQWRkcmVzcyh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIHNoaXBwaW5nIGFkZHJlc3NcbiAgICAgICAgdGhpcy5hbGxvd01pbm5wb3N0QWNjb3VudCh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucywgZmFsc2UpOyAvLyBvcHRpb24gZm9yIGNyZWF0aW5nIG1pbm5wb3N0IGFjY291bnRcbiAgICAgICAgdGhpcy5jaG9vc2VQYXltZW50TWV0aG9kKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gc3dpdGNoIGJldHdlZW4gY2FyZCBhbmQgYWNoXG4gICAgICAgIHRoaXMuY3JlZGl0Q2FyZEZpZWxkcyh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIGRvIHN0dWZmIHdpdGggdGhlIGNyZWRpdCBjYXJkIGZpZWxkc1xuICAgICAgICB0aGlzLmFjaEZpZWxkcyh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIGRvIHN0dWZmIGZvciBhY2ggcGF5bWVudHMsIGlmIGFwcGxpY2FibGUgdG8gdGhlIGZvcm1cbiAgICAgICAgdGhpcy52YWxpZGF0ZUFuZFN1Ym1pdCh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIHZhbGlkYXRlIGFuZCBzdWJtaXQgdGhlIGZvcm1cbiAgICAgIH1cblxuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmNhbGN1bGF0ZWRfYW1vdW50X3NlbGVjdG9yKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuY2FsY3VsYXRlQW1vdW50KHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zLCAnJyk7IC8vXG4gICAgICB9IC8vIGNhbGN1bGF0ZSBhbW91bnQgYmFzZWQgb24gcXVhbnRpdHlcblxuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLnVzZV9wcm9tb2NvZGVfc2VsZWN0b3IpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy51c2VQcm9tb0NvZGUodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBoYW5kbGUgcHJvbW8gY29kZSBmaWVsZFxuICAgICAgfSAvLyBhbGxvdyB1c2VycyB0byBlbnRlciBhIHByb21vIGNvZGUgb24gYSBwYWdlXG5cbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5jYWxlbmRhcl9idXR0b25fc2VsZWN0b3IpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5hZGRUb0NhbGVuZGFyKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTtcbiAgICAgIH0gLy8gdGhlcmUgaXMgYW4gZXZlbnQgZGV0YWlscyBpdGVtOyBhbGxvdyBmb3IgYW4gYWRkIHRvIGNhbGVuZGFyIGJ1dHRvblxuXG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuY29uZmlybV9zdGVwX3NlbGVjdG9yKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuc2hvd05ld3NsZXR0ZXJTZXR0aW5ncyh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7XG4gICAgICAgIHRoaXMuY29uZmlybU1lc3NhZ2VTdWJtaXQodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBzdWJtaXQgdGhlIHN0dWZmIG9uIHRoZSBjb25maXJtYXRpb24gcGFnZVxuICAgICAgfVxuXG4gICAgfSwgLy8gaW5pdFxuXG4gICAgcXM6IChmdW5jdGlvbihhKSB7XG4gICAgICBpZiAoYSA9PT0gJycpIHtcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgfVxuICAgICAgdmFyIGIgPSB7fTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYS5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIgcD1hW2ldLnNwbGl0KCc9JywgMik7XG4gICAgICAgIGlmIChwLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgIGJbcFswXV0gPSAnJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBiW3BbMF1dID0gZGVjb2RlVVJJQ29tcG9uZW50KHBbMV0ucmVwbGFjZSgvXFwrL2csICcgJykpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gYjtcbiAgICB9KSh3aW5kb3cubG9jYXRpb24uc2VhcmNoLnN1YnN0cigxKS5zcGxpdCgnJicpKSxcblxuICAgIGRlYnVnOiBmdW5jdGlvbihtZXNzYWdlKSB7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLmRlYnVnID09PSB0cnVlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgbWVzc2FnZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhtZXNzYWdlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmRpcihtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmRpcih0aGlzKTtcbiAgICAgIH1cbiAgICB9LCAvLyBkZWJ1Z1xuXG4gICAgZ2V0UXVlcnlTdHJpbmdzOiBmdW5jdGlvbihsaW5rKSB7XG4gICAgICBpZiAodHlwZW9mIGxpbmsgPT09ICd1bmRlZmluZWQnIHx8IGxpbmsgPT09ICcnKSB7XG4gICAgICAgIHJldHVybiB7fTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxpbmsgPSAnPycgKyBsaW5rLnNwbGl0KCc/JylbMV07XG4gICAgICAgIGxpbmsgPSBsaW5rLnN1YnN0cigxKS5zcGxpdCgnJicpO1xuICAgICAgfVxuICAgICAgdmFyIGIgPSB7fTtcbiAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGluay5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIgcD1saW5rW2ldLnNwbGl0KCc9JywgMik7XG4gICAgICAgIGlmIChwLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgIGJbcFswXV0gPSAnJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBiW3BbMF1dID0gZGVjb2RlVVJJQ29tcG9uZW50KHBbMV0ucmVwbGFjZSgvXFwrL2csICcgJykpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gYjtcbiAgICB9LCAvLyBnZXRRdWVyeVN0cmluZ3NcblxuICAgIHBheW1lbnRQYW5lbHM6IGZ1bmN0aW9uKGFjdGl2ZSkge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdmFyIHVzZXRhYnMgPSB0aGlzLm9wdGlvbnMudGFicztcbiAgICAgIHZhciB0aXRsZSA9ICdNaW5uUG9zdCB8IFN1cHBvcnQgVXMgfCAnO1xuICAgICAgdmFyIHBhZ2UgPSAkKCcucHJvZ3Jlc3MtLWRvbmF0aW9uIGxpLicgKyBhY3RpdmUpLnRleHQoKTtcbiAgICAgIHZhciBuZXh0ID0gJCgnLnByb2dyZXNzLS1kb25hdGlvbiBsaS4nICsgYWN0aXZlKS5uZXh0KCkudGV4dCgpO1xuICAgICAgdmFyIHN0ZXAgPSAkKCcucHJvZ3Jlc3MtLWRvbmF0aW9uIGxpLicgKyBhY3RpdmUpLmluZGV4KCkgKyAxO1xuICAgICAgdmFyIG5hdl9pdGVtX2NvdW50ID0gJCgnLnByb2dyZXNzLS1kb25hdGlvbiBsaScpLmxlbmd0aDtcbiAgICAgIHZhciBvcHBfaWQgPSAkKHRoaXMub3B0aW9ucy5vcHBfaWRfc2VsZWN0b3IpLnZhbCgpO1xuICAgICAgdmFyIG5leHRfc3RlcCA9IHN0ZXAgKyAxO1xuICAgICAgdmFyIHBvc3RfcHVyY2hhc2UgPSBmYWxzZTtcblxuICAgICAgdGhpcy5kZWJ1ZyggJ3N0ZXAgaXMgJyArIHN0ZXAgKyAnIGFuZCBuYXYgaXRlbSBjb3VudCBpcyAnICsgbmF2X2l0ZW1fY291bnQgKyAnIGFuZCBvcHAgaWQgaXMgJyArIG9wcF9pZCArICcgYW5kIG5leHQgc3RlcCBpcyAnICsgbmV4dF9zdGVwICk7XG5cbiAgICAgIC8vIHRoaXMgaXMgdGhlIGxhc3QgdmlzaWJsZSBzdGVwXG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuY29uZmlybV9zdGVwX3NlbGVjdG9yKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGFjdGl2ZSA9IHRoaXMub3B0aW9ucy5jb25maXJtO1xuICAgICAgICAkKCcucHJvZ3Jlc3MtLWRvbmF0aW9uIGxpLicgKyBhY3RpdmUgKyAnIHNwYW4nKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIHN0ZXAgPSAkKCcucHJvZ3Jlc3MtLWRvbmF0aW9uIGxpLicgKyBhY3RpdmUpLmluZGV4KCkgKyAxO1xuICAgICAgICAvLyB0aGVyZSBpcyBhIGNvbnRpbnVhdGlvbiBvZiB0aGUgbWFpbiBmb3JtIG9uIHRoaXMgcGFnZS4gdGhlcmUgaXMgYSBidXR0b24gdG8gY2xpY2tcbiAgICAgICAgLy8gdGhpcyBtZWFucyB0aGVyZSBpcyBhbm90aGVyIHN0ZXBcbiAgICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmNvbmZpcm1fYnV0dG9uX3NlbGVjdG9yKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgbmF2X2l0ZW1fY291bnQgKz0gMTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc3RlcCA9PT0gbmF2X2l0ZW1fY291bnQgLSAxICYmICQodGhpcy5vcHRpb25zLm9wcF9pZF9zZWxlY3RvcikubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLmRlYnVnKCd0aGlzIGlzIGEgcGF5bWVudCBzdGVwIGJ1dCB0aGVyZSBpcyBhIHN0ZXAgYWZ0ZXIgaXQnKTtcbiAgICAgICAgc3RlcCA9ICdwdXJjaGFzZSc7XG4gICAgICB9IGVsc2UgaWYgKHN0ZXAgPT09IG5hdl9pdGVtX2NvdW50ICYmICQodGhpcy5vcHRpb25zLm9wcF9pZF9zZWxlY3RvcikubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLmRlYnVnKCd0aGlzIGlzIGEgcGF5bWVudCBzdGVwIGFuZCB0aGVyZSBpcyBubyBzdGVwIGFmdGVyIGl0Jyk7XG4gICAgICAgIHN0ZXAgPSAncHVyY2hhc2UnO1xuICAgICAgfSBlbHNlIGlmIChzdGVwID09PSBuYXZfaXRlbV9jb3VudCAmJiAkKHRoaXMub3B0aW9ucy5vcHBfaWRfc2VsZWN0b3IpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aGlzLmRlYnVnKCd0aGlzIGlzIGEgcG9zdC1maW5pc2ggc3RlcC4gaXQgZG9lcyBub3QgaGF2ZSBhbiBpZCcpO1xuICAgICAgICBzdGVwID0gc3RlcCArIDE7XG4gICAgICAgIHBvc3RfcHVyY2hhc2UgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICBkb2N1bWVudC50aXRsZSA9IHRpdGxlICsgcGFnZTtcbiAgICAgIHRoaXMuYW5hbHl0aWNzVHJhY2tpbmdTdGVwKHN0ZXAsIHRpdGxlLCBwb3N0X3B1cmNoYXNlKTtcblxuICAgICAgLy8gbWFrZSBzb21lIHRhYnMgZm9yIGZvcm1cbiAgICAgIGlmICh1c2V0YWJzID09PSB0cnVlKSB7XG4gICAgICAgICQoJy5wYW5lbCcpLmhpZGUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQoJy5wYW5lbCcpLnNob3coKTtcbiAgICAgIH1cbiAgICAgIC8vIGFjdGl2YXRlIHRoZSB0YWJzXG4gICAgICBpZiAoJCgnLnByb2dyZXNzLS1kb25hdGlvbiBsaSAuYWN0aXZlJykubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICQoJyMnICsgYWN0aXZlKS5zaG93KCk7XG4gICAgICAgICQoJy5wcm9ncmVzcy0tZG9uYXRpb24gbGkuJyArIGFjdGl2ZSArICcgYScpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFjdGl2ZSA9ICQoJy5wcm9ncmVzcy0tZG9uYXRpb24gbGkgLmFjdGl2ZScpLnBhcmVudCgpLnByb3AoJ2NsYXNzJyk7XG4gICAgICAgICQoJyMnICsgYWN0aXZlKS5zaG93KCk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIC8qJCgnLnByb2dyZXNzLS1kb25hdGlvbiBsaSBhLCBhLmJ0bi5idG4tLW5leHQnKS5jbGljayhmdW5jdGlvbihldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAkKCcucHJvZ3Jlc3MtLWRvbmF0aW9uIGxpIGEnKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgIHZhciBsaW5rID0gJCh0aGlzKS5wcm9wKCdocmVmJyk7XG4gICAgICAgIHZhciBxdWVyeSA9IHRoYXQuZ2V0UXVlcnlTdHJpbmdzKGxpbmspO1xuICAgICAgICBxdWVyeSA9IHF1ZXJ5WydzdGVwJ107XG4gICAgICAgICQoJy5wcm9ncmVzcy0tZG9uYXRpb24gbGkuJyArIHF1ZXJ5ICsgJyBhJykuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICB0aGF0LnBheW1lbnRQYW5lbHMocXVlcnkpOyAgICBcbiAgICAgIH0pOyovXG4gICAgfSwgLy8gcGF5bWVudFBhbmVsc1xuXG4gICAgYW5hbHl0aWNzVHJhY2tpbmdTdGVwOiBmdW5jdGlvbihzdGVwLCB0aXRsZSwgcG9zdF9wdXJjaGFzZSkge1xuICAgICAgdmFyIGxldmVsID0gdGhpcy5jaGVja0xldmVsKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zLCAnbmFtZScpOyAvLyBjaGVjayB3aGF0IGxldmVsIGl0IGlzXG4gICAgICB2YXIgbGV2ZWxudW0gPSB0aGlzLmNoZWNrTGV2ZWwodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMsICdudW0nKTsgLy8gY2hlY2sgd2hhdCBsZXZlbCBpdCBpcyBhcyBhIG51bWJlclxuICAgICAgdmFyIGFtb3VudCA9ICQodGhpcy5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudF9zZWxlY3RvcikudmFsKCk7XG4gICAgICB2YXIgcmVjdXJyaW5nID0gdGhpcy5vcHRpb25zLnJlY3VycmluZztcbiAgICAgIHZhciBvcHBfaWQgPSAkKHRoaXMub3B0aW9ucy5vcHBfaWRfc2VsZWN0b3IpLnZhbCgpO1xuXG4gICAgICAvLyBpZiB3ZSdyZSBub3QgYWZ0ZXIgdGhlIHB1cmNoYXNlLCB1c2UgYWRkUHJvZHVjdFxuICAgICAgaWYgKCBwb3N0X3B1cmNoYXNlICE9PSB0cnVlICkge1xuICAgICAgICBnYSgnZWM6YWRkUHJvZHVjdCcsIHtcbiAgICAgICAgICAnaWQnOiAnbWlubnBvc3RfJyArIGxldmVsLnRvTG93ZXJDYXNlKCkgKyAnX21lbWJlcnNoaXAnLFxuICAgICAgICAgICduYW1lJzogJ01pbm5Qb3N0ICcgKyBsZXZlbC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGxldmVsLnNsaWNlKDEpICsgJyBNZW1iZXJzaGlwJyxcbiAgICAgICAgICAnY2F0ZWdvcnknOiAnRG9uYXRpb24nLFxuICAgICAgICAgICdicmFuZCc6ICdNaW5uUG9zdCcsXG4gICAgICAgICAgJ3ZhcmlhbnQnOiAgcmVjdXJyaW5nLFxuICAgICAgICAgICdwcmljZSc6IGFtb3VudCxcbiAgICAgICAgICAncXVhbnRpdHknOiAxXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoc3RlcCA9PT0gJ3B1cmNoYXNlJykge1xuICAgICAgICB0aGlzLmRlYnVnKCdhZGQgYSBwdXJjaGFzZSBhY3Rpb24uIHN0ZXAgaXMgJyArIHN0ZXApO1xuICAgICAgICBnYSgnZWM6c2V0QWN0aW9uJywgc3RlcCx7XG4gICAgICAgICAgJ2lkJzogb3BwX2lkLCAvLyBUcmFuc2FjdGlvbiBpZCAtIFR5cGU6IHN0cmluZ1xuICAgICAgICAgICdhZmZpbGlhdGlvbic6ICdNaW5uUG9zdCcsIC8vIFN0b3JlIG5hbWUgLSBUeXBlOiBzdHJpbmdcbiAgICAgICAgICAncmV2ZW51ZSc6IGFtb3VudCwgLy8gVG90YWwgUmV2ZW51ZSAtIFR5cGU6IG51bWVyaWNcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLmRlYnVnKCdhZGQgYSBjaGVja291dCBhY3Rpb24uIHN0ZXAgaXMgJyArIHN0ZXApO1xuICAgICAgICBnYSgnZWM6c2V0QWN0aW9uJywnY2hlY2tvdXQnLCB7XG4gICAgICAgICAgJ3N0ZXAnOiBzdGVwLCAgICAgICAgICAgIC8vIEEgdmFsdWUgb2YgMSBpbmRpY2F0ZXMgZmlyc3QgY2hlY2tvdXQgc3RlcC5WYWx1ZSBvZiAyIGluZGljYXRlcyBzZWNvbmQgY2hlY2tvdXQgc3RlcFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgZ2EoJ3NldCcsIHtcbiAgICAgICAgcGFnZTogd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLFxuICAgICAgICB0aXRsZTogdGl0bGVcbiAgICAgIH0pO1xuICAgICAgZ2EoJ3NlbmQnLCAncGFnZXZpZXcnLCB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUpO1xuXG4gICAgfSwgLy8gYW5hbHl0aWNzVHJhY2tpbmdTdGVwXG5cbiAgICBjYWxjdWxhdGVGZWVzOiBmdW5jdGlvbihhbW91bnQsIHBheW1lbnRfdHlwZSkge1xuICAgICAgLy8gdGhpcyBzZW5kcyB0aGUgYW1vdW50IGFuZCBwYXltZW50IHR5cGUgdG8gcHl0aG9uOyBnZXQgdGhlIGZlZSBhbmQgZGlzcGxheSBpdCB0byB0aGUgdXNlciBvbiB0aGUgY2hlY2tib3ggbGFiZWxcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICBhbW91bnQ6IGFtb3VudCxcbiAgICAgICAgcGF5bWVudF90eXBlOiBwYXltZW50X3R5cGVcbiAgICAgIH07XG4gICAgICAkLmFqYXgoe1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgdXJsOiAnL2NhbGN1bGF0ZS1mZWVzLycsXG4gICAgICAgIGRhdGE6IGRhdGFcbiAgICAgIH0pLmRvbmUoZnVuY3Rpb24oIGRhdGEgKSB7XG4gICAgICAgIGlmICgkKGRhdGEuZmVlcykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICQodGhhdC5vcHRpb25zLmZlZV9hbW91bnQpLnRleHQocGFyc2VGbG9hdChkYXRhLmZlZXMpLnRvRml4ZWQoMikpO1xuICAgICAgICAgIHRoYXQuY3JlZGl0Q2FyZEZlZUNoZWNrYm94KCQodGhhdC5vcHRpb25zLnBheV9jY19wcm9jZXNzaW5nX3NlbGVjdG9yKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sIC8vIGNhbGN1bGF0ZUZlZXNcblxuICAgIGNyZWRpdENhcmRQcm9jZXNzaW5nRmVlczogZnVuY3Rpb24ob3B0aW9ucywgcmVzZXQpIHtcbiAgICAgIC8vIHRoaXMgYWRkcyBvciBzdWJ0cmFjdHMgdGhlIGZlZSB0byB0aGUgb3JpZ2luYWwgYW1vdW50IHdoZW4gdGhlIHVzZXIgaW5kaWNhdGVzIHRoZXkgZG8gb3IgZG8gbm90IHdhbnQgdG8gcGF5IHRoZSBmZWVzXG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB0aGF0LmNyZWRpdENhcmRGZWVDaGVja2JveCgkKHRoaXMub3B0aW9ucy5wYXlfY2NfcHJvY2Vzc2luZ19zZWxlY3RvcikpO1xuICAgICAgJCh0aGlzLm9wdGlvbnMucGF5X2NjX3Byb2Nlc3Npbmdfc2VsZWN0b3IpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdGhhdC5jcmVkaXRDYXJkRmVlQ2hlY2tib3godGhpcyk7XG4gICAgICB9KTtcbiAgICB9LCAvLyBjcmVkaXRDYXJkUHJvY2Vzc2luZ0ZlZXNcblxuICAgIGNyZWRpdENhcmRGZWVDaGVja2JveDogZnVuY3Rpb24oZmllbGQpIHtcbiAgICAgIHZhciBmdWxsX2Ftb3VudDtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIGlmICgkKGZpZWxkKS5pcygnOmNoZWNrZWQnKSB8fCAkKGZpZWxkKS5wcm9wKCdjaGVja2VkJykpIHtcbiAgICAgICAgJCgnLmFtb3VudCAubGV2ZWwtYW1vdW50JykuYWRkQ2xhc3MoJ2Z1bGwtYW1vdW50Jyk7XG4gICAgICAgIGZ1bGxfYW1vdW50ID0gKHRoYXQub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQgKyBwYXJzZUZsb2F0KCQodGhhdC5vcHRpb25zLmZlZV9hbW91bnQpLnRleHQoKSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZnVsbF9hbW91bnQgPSB0aGF0Lm9wdGlvbnMub3JpZ2luYWxfYW1vdW50O1xuICAgICAgfVxuICAgICAgJCh0aGF0Lm9wdGlvbnMuZnVsbF9hbW91bnRfc2VsZWN0b3IpLnRleHQocGFyc2VGbG9hdChmdWxsX2Ftb3VudCkudG9GaXhlZCgyKSk7XG4gICAgfSwgLy8gY3JlZGl0Q2FyZEZlZUNoZWNrYm94XG5cbiAgICBkb25hdGVBbm9ueW1vdXNseTogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgaWYgKCQob3B0aW9ucy5hbm9ueW1vdXNfc2VsZWN0b3IsIGVsZW1lbnQpLmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgICQob3B0aW9ucy5uYW1lX3NlbGVjdG9yICsgJyBkaXY6Zmlyc3QnLCBlbGVtZW50KS5oaWRlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkKG9wdGlvbnMubmFtZV9zZWxlY3RvciArICcgZGl2OmZpcnN0JywgZWxlbWVudCkuc2hvdygpO1xuICAgICAgfVxuXG4gICAgICAkKG9wdGlvbnMuYW5vbnltb3VzX3NlbGVjdG9yLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgIGlmICgkKHRoaXMpLmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgICAgJChvcHRpb25zLm5hbWVfc2VsZWN0b3IgKyAnIGRpdjpmaXJzdCcsIGVsZW1lbnQpLmhpZGUoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkKG9wdGlvbnMubmFtZV9zZWxlY3RvciArICcgZGl2OmZpcnN0JywgZWxlbWVudCkuc2hvdygpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LCAvLyBkb25hdGVBbm9ueW1vdXNseVxuXG4gICAgY2hlY2tMZXZlbDogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucywgcmV0dXJudmFsdWUpIHtcbiAgICAgIHZhciBsZXZlbCA9ICcnO1xuICAgICAgdmFyIGxldmVsbnVtID0gMDtcbiAgICAgIHZhciBsZXZlbGNsYXNzID0gJ2xldmVsIGxldmVsLS0nO1xuICAgICAgdmFyIGFtb3VudF95ZWFybHk7XG4gICAgICB2YXIgZnJlcXVlbmN5ID0gb3B0aW9ucy5mcmVxdWVuY3k7XG4gICAgICB2YXIgYW1vdW50ID0gb3B0aW9ucy5vcmlnaW5hbF9hbW91bnQ7XG5cbiAgICAgIGlmIChmcmVxdWVuY3kgPT09IDEyKSB7XG4gICAgICAgIGFtb3VudF95ZWFybHkgPSBhbW91bnQgKiBmcmVxdWVuY3k7XG4gICAgICB9IGVsc2UgaWYgKGZyZXF1ZW5jeSA9PT0gMSkge1xuICAgICAgICBhbW91bnRfeWVhcmx5ID0gYW1vdW50O1xuICAgICAgfVxuICAgICAgXG4gICAgICAkLmVhY2gob3B0aW9ucy5sZXZlbHMsIGZ1bmN0aW9uKGluZGV4LCB2YWx1ZSkge1xuICAgICAgICB2YXIgbmFtZSA9IHZhbHVlLm5hbWU7XG4gICAgICAgIHZhciBudW0gPSBpbmRleDtcbiAgICAgICAgdmFyIG1heCA9IHZhbHVlLm1heDtcbiAgICAgICAgdmFyIG1pbiA9IHZhbHVlLm1pbjtcbiAgICAgICAgaWYgKHR5cGVvZiBtaW4gIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBtYXggIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgaWYgKGFtb3VudF95ZWFybHkgPj0gbWluICYmIGFtb3VudF95ZWFybHkgPCBtYXgpIHtcbiAgICAgICAgICAgIGxldmVsID0gbmFtZTtcbiAgICAgICAgICAgIGxldmVsbnVtID0gbnVtO1xuICAgICAgICAgICAgbGV2ZWxjbGFzcyArPSBudW07XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBtYXggIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgaWYgKGFtb3VudF95ZWFybHkgPCBtYXgpIHtcbiAgICAgICAgICAgIGxldmVsID0gbmFtZTtcbiAgICAgICAgICAgIGxldmVsbnVtID0gbnVtO1xuICAgICAgICAgICAgbGV2ZWxjbGFzcyArPSBudW07XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBtaW4gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgaWYgKGFtb3VudF95ZWFybHkgPj0gbWluKSB7XG4gICAgICAgICAgICBsZXZlbCA9IG5hbWU7XG4gICAgICAgICAgICBsZXZlbG51bSA9IG51bTtcbiAgICAgICAgICAgIGxldmVsY2xhc3MgKz0gbnVtO1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBpZiAoJChvcHRpb25zLmxldmVsX2luZGljYXRvcl9zZWxlY3RvcikubGVuZ3RoID4gMCAmJiAkKG9wdGlvbnMucmV2aWV3X2JlbmVmaXRzX3NlbGVjdG9yKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICQob3B0aW9ucy5sZXZlbF9pbmRpY2F0b3Jfc2VsZWN0b3IsIGVsZW1lbnQpLnByb3AoJ2NsYXNzJywgbGV2ZWxjbGFzcyk7XG4gICAgICAgICQob3B0aW9ucy5sZXZlbF9uYW1lX3NlbGVjdG9yKS50ZXh0KGxldmVsLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgbGV2ZWwuc2xpY2UoMSkpO1xuXG4gICAgICAgIHZhciByZXZpZXdfbGV2ZWxfYmVuZWZpdHMgPSB0aGlzLmdldFF1ZXJ5U3RyaW5ncygkKG9wdGlvbnMucmV2aWV3X2JlbmVmaXRzX3NlbGVjdG9yLCBlbGVtZW50KS5wcm9wKCdocmVmJykpO1xuICAgICAgICByZXZpZXdfbGV2ZWxfYmVuZWZpdHMgPSByZXZpZXdfbGV2ZWxfYmVuZWZpdHNbJ2xldmVsJ107XG4gICAgICAgIFxuICAgICAgICB2YXIgbGluayA9ICQob3B0aW9ucy5yZXZpZXdfYmVuZWZpdHNfc2VsZWN0b3IsIGVsZW1lbnQpLnByb3AoJ2hyZWYnKTtcbiAgICAgICAgbGluayA9IGxpbmsucmVwbGFjZShyZXZpZXdfbGV2ZWxfYmVuZWZpdHMsIGxldmVsKTtcbiAgICAgICAgJChvcHRpb25zLnJldmlld19iZW5lZml0c19zZWxlY3RvcikucHJvcCgnaHJlZicsIGxpbmspO1xuICAgICAgfVxuICAgICAgaWYgKHJldHVybnZhbHVlID09PSAnbmFtZScpIHtcbiAgICAgICAgcmV0dXJuIGxldmVsO1xuICAgICAgfSBlbHNlIGlmIChyZXR1cm52YWx1ZSA9PT0gJ251bScpIHtcbiAgICAgICAgcmV0dXJuIGxldmVsbnVtOyAgXG4gICAgICB9XG4gICAgfSwgLy8gY2hlY2tMZXZlbFxuXG4gICAgaG9ub3JPck1lbW9yeTogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgaWYgKCQob3B0aW9ucy5ob25vcl9zZWxlY3RvciwgZWxlbWVudCkuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgJChvcHRpb25zLmhvbm9yX21lbW9yeV9uYW1lX3NlbGVjdG9yICsgJyBkaXYnICsgb3B0aW9ucy5ob25vcl9uYW1lX3NlbGVjdG9yLCBlbGVtZW50KS5zaG93KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkKG9wdGlvbnMuaG9ub3JfbWVtb3J5X25hbWVfc2VsZWN0b3IgKyAnIGRpdicgKyBvcHRpb25zLmhvbm9yX25hbWVfc2VsZWN0b3IsIGVsZW1lbnQpLmhpZGUoKTtcbiAgICAgICAgJChvcHRpb25zLmhvbm9yX25hbWVfc2VsZWN0b3IgKyAnIGlucHV0JywgZWxlbWVudCkudmFsKCcnKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCQob3B0aW9ucy5tZW1vcnlfc2VsZWN0b3IsIGVsZW1lbnQpLmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgICQob3B0aW9ucy5ob25vcl9tZW1vcnlfbmFtZV9zZWxlY3RvciArICcgZGl2JyArIG9wdGlvbnMubWVtb3J5X25hbWVfc2VsZWN0b3IsIGVsZW1lbnQpLnNob3coKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQob3B0aW9ucy5ob25vcl9tZW1vcnlfbmFtZV9zZWxlY3RvciArICcgZGl2JyArIG9wdGlvbnMubWVtb3J5X25hbWVfc2VsZWN0b3IsIGVsZW1lbnQpLmhpZGUoKTtcbiAgICAgICAgJChvcHRpb25zLm1lbW9yeV9uYW1lX3NlbGVjdG9yICsgJyBpbnB1dCcsIGVsZW1lbnQpLnZhbCgnJyk7XG4gICAgICB9XG5cbiAgICAgICQob3B0aW9ucy5ob25vcl9vcl9tZW1vcnlfY2hvb3NlciwgZWxlbWVudCkuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoJChvcHRpb25zLmhvbm9yX3NlbGVjdG9yKS5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICAgICQob3B0aW9ucy5ob25vcl9tZW1vcnlfbmFtZV9zZWxlY3RvciArICcgZGl2JyArIG9wdGlvbnMuaG9ub3JfbmFtZV9zZWxlY3RvciwgZWxlbWVudCkuc2hvdygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICQob3B0aW9ucy5ob25vcl9tZW1vcnlfbmFtZV9zZWxlY3RvciArICcgZGl2JyArIG9wdGlvbnMuaG9ub3JfbmFtZV9zZWxlY3RvciwgZWxlbWVudCkuaGlkZSgpO1xuICAgICAgICAgICQob3B0aW9ucy5ob25vcl9uYW1lX3NlbGVjdG9yICsgJyBpbnB1dCcsIGVsZW1lbnQpLnZhbCgnJyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCQob3B0aW9ucy5tZW1vcnlfc2VsZWN0b3IpLmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgICAgJChvcHRpb25zLmhvbm9yX21lbW9yeV9uYW1lX3NlbGVjdG9yICsgJyBkaXYnICsgb3B0aW9ucy5tZW1vcnlfbmFtZV9zZWxlY3RvciwgZWxlbWVudCkuc2hvdygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICQob3B0aW9ucy5ob25vcl9tZW1vcnlfbmFtZV9zZWxlY3RvciArICcgZGl2JyArIG9wdGlvbnMubWVtb3J5X25hbWVfc2VsZWN0b3IsIGVsZW1lbnQpLmhpZGUoKTtcbiAgICAgICAgICAkKG9wdGlvbnMubWVtb3J5X25hbWVfc2VsZWN0b3IgKyAnIGlucHV0JywgZWxlbWVudCkudmFsKCcnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICB9LCAvLyBob25vck9yTWVtb3J5XG5cbiAgICBvdXRzaWRlVW5pdGVkU3RhdGVzOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICAkKG9wdGlvbnMuc2hvd19iaWxsaW5nX2NvdW50cnlfc2VsZWN0b3IpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAkKG9wdGlvbnMuYmlsbGluZ19jb3VudHJ5X3NlbGVjdG9yKS5zaG93KCk7XG4gICAgICAgICQodGhpcykucGFyZW50KCkuaGlkZSgpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KTtcbiAgICAgICQob3B0aW9ucy5zaG93X3NoaXBwaW5nX2NvdW50cnlfc2VsZWN0b3IpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAkKG9wdGlvbnMuc2hpcHBpbmdfY291bnRyeV9zZWxlY3Rvcikuc2hvdygpO1xuICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmhpZGUoKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSk7XG4gICAgfSwgLy8gb3V0c2lkZVVuaXRlZFN0YXRlc1xuXG4gICAgc2hpcHBpbmdBZGRyZXNzOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB2YXIgc2hvd19zaGlwcGluZyA9IGZhbHNlO1xuICAgICAgaWYgKCQob3B0aW9ucy51c2VfZm9yX3NoaXBwaW5nX3NlbGVjdG9yKS5sZW5ndGggPiAwKSB7IC8vIHdlIGhhdmUgYSBzaGlwcGluZyBjaGVja2JveFxuICAgICAgICBzaG93X3NoaXBwaW5nID0gdHJ1ZTtcbiAgICAgIH1cbi8vICAgICAgc2hvd19zaGlwcGluZyA9ICEhJChvcHRpb25zLnVzZV9mb3Jfc2hpcHBpbmdfc2VsZWN0b3IgKyAnOmNoZWNrZWQnLCBlbGVtZW50KS5sZW5ndGg7XG4vLyAgICAgIC8vdGhpcy5kZWJ1Zygnc2hvdyBpcyB0aGVyZScpO1xuXG4vKiAgICAgICQob3B0aW9ucy51c2VfZm9yX3NoaXBwaW5nX3NlbGVjdG9yLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoYXQuc2hpcHBpbmdBZGRyZXNzKGVsZW1lbnQsIG9wdGlvbnMpO1xuICAgICAgICAvL3RoaXMuZGVidWcoJ2NoYW5nZSBpdCcpO1xuICAgICAgfSk7XG4qL1xuICAgICAgaWYgKHNob3dfc2hpcHBpbmcgPT09IHRydWUgKSB7XG4gICAgICAgICQob3B0aW9ucy51c2VfZm9yX3NoaXBwaW5nX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKS5zaG93KCk7XG4gICAgICAgIGlmICgkKG9wdGlvbnMudXNlX2Zvcl9zaGlwcGluZ19zZWxlY3RvciwgZWxlbWVudCkuaXMoJzpjaGVja2VkJykpIHsgLy8gdXNlIHNhbWUgYXMgYmlsbGluZ1xuICAgICAgICAgICQob3B0aW9ucy5zaGlwcGluZ19zZWxlY3RvcikuaGlkZSgpO1xuICAgICAgICB9IGVsc2UgeyAvLyBzZXBhcmF0ZSBzaGlwcGluZyBhbmQgYmlsbGluZ1xuICAgICAgICAgICQob3B0aW9ucy5zaGlwcGluZ19zZWxlY3Rvcikuc2hvdygpO1xuICAgICAgICB9XG4gICAgICAgICQob3B0aW9ucy51c2VfZm9yX3NoaXBwaW5nX3NlbGVjdG9yLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdGhhdC5zaGlwcGluZ0FkZHJlc3MoZWxlbWVudCwgb3B0aW9ucyk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgXG4gICAgfSwgLy8gc2hpcHBpbmdBZGRyZXNzXG5cbiAgICBhbGxvd01pbm5wb3N0QWNjb3VudDogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucywgY2hhbmdlZCkge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdmFyIGFjY291bnRfZXhpc3RzID0gZmFsc2U7XG5cbiAgICAgIGZ1bmN0aW9uIGRvbmVUeXBpbmcgKCkge1xuICAgICAgICB2YXIgZW1haWwgPSAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpO1xuICAgICAgICBhY2NvdW50X2V4aXN0cyA9IHRoYXQuY2hlY2tNaW5ucG9zdEFjY291bnRFeGlzdHMoZWxlbWVudCwgb3B0aW9ucywgZW1haWwpO1xuICAgICAgfVxuXG4gICAgICAvL3NldHVwIGJlZm9yZSBmdW5jdGlvbnNcbiAgICAgIHZhciB0eXBpbmdUaW1lcjsgICAgICAgICAgICAgICAgLy90aW1lciBpZGVudGlmaWVyXG4gICAgICB2YXIgZG9uZVR5cGluZ0ludGVydmFsID0gNTAwMDsgIC8vdGltZSBpbiBtcywgNSBzZWNvbmQgZm9yIGV4YW1wbGVcblxuICAgICAgLy9vbiBrZXl1cCwgc3RhcnQgdGhlIGNvdW50ZG93blxuICAgICAgJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5rZXl1cChmdW5jdGlvbigpe1xuICAgICAgICBjbGVhclRpbWVvdXQodHlwaW5nVGltZXIpO1xuICAgICAgICBpZiAoJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwpIHtcbiAgICAgICAgICB0eXBpbmdUaW1lciA9IHNldFRpbWVvdXQoZG9uZVR5cGluZywgZG9uZVR5cGluZ0ludGVydmFsKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIC8vdXNlciBpcyBcImZpbmlzaGVkIHR5cGluZyxcIiBkbyBzb21ldGhpbmdcblxuICAgICAgaWYgKCQob3B0aW9ucy5jcmVhdGVfbXBfc2VsZWN0b3IsIGVsZW1lbnQpLmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgICQob3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgZWxlbWVudCkuc2hvdygpO1xuICAgICAgICBvcHRpb25zLmNyZWF0ZV9hY2NvdW50ID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQob3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgZWxlbWVudCkuaGlkZSgpO1xuICAgICAgfVxuXG4gICAgICAkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoYXQuYWxsb3dNaW5ucG9zdEFjY291bnQoZWxlbWVudCwgb3B0aW9ucywgdHJ1ZSk7XG4gICAgICB9KTtcblxuICAgICAgaWYgKGNoYW5nZWQgPT09IGZhbHNlKSB7XG4gICAgICAgIC8vIGFsbG93IHVzZXJzIHRvIHNob3cgcGxhaW4gdGV4dCwgb3IgdG8gc2VlIHB3IGNyaXRlcmlhXG4gICAgICAgICQob3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgZWxlbWVudCkuYXBwZW5kKCc8ZGl2IGNsYXNzPVwiaGVscC1saW5rXCI+PHNwYW4+UGFzc3dvcmQgaGVscDwvc3Bhbj48L2Rpdj48ZGl2IGNsYXNzPVwiZm9ybS1oZWxwXCI+UGFzc3dvcmQgbXVzdCBiZSBhdCBsZWFzdCA2IGNoYXJhY3RlcnMuPC9kaXY+PGxhYmVsIGNsYXNzPVwiYWRkaXRpb25hbC1vcHRpb25cIj48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgbmFtZT1cInNob3dwYXNzd29yZFwiIGlkPVwic2hvd3Bhc3N3b3JkXCI+IFNob3cgcGFzc3dvcmQ8L2xhYmVsPicpO1xuICAgICAgICAkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKS5iZWZvcmUoJzxwIGNsYXNzPVwiYWNjb3VudC1leGlzdHMgc3VjY2Vzc1wiPlRoZXJlIGlzIGFscmVhZHkgYSBNaW5uUG9zdC5jb20gYWNjb3VudCB3aXRoIHRoaXMgZW1haWwuPC9wPicpO1xuICAgICAgICAkKCcuYWNjb3VudC1leGlzdHMnKS5oaWRlKCk7XG4gICAgICAgICQoJyNzaG93cGFzc3dvcmQnKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgICBpZiAoJCh0aGlzKS5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICAgICAgJCgnI3Bhc3N3b3JkJykuZ2V0KDApLnR5cGUgPSAndGV4dCc7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQoJyNwYXNzd29yZCcpLmdldCgwKS50eXBlID0gJ3Bhc3N3b3JkJztcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgICQoJy5mb3JtLWl0ZW0gLmZvcm0taGVscCcpLmhpZGUoKTtcbiAgICAgIH1cbiAgICAgICQoJy5mb3JtLWl0ZW0tLXdpdGgtaGVscCBsYWJlbCwgLmZvcm0taXRlbS0td2l0aC1oZWxwIGlucHV0JykubmV4dCgnLmhlbHAtbGluaycpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpLm5leHQoJy5mb3JtLWhlbHAnKS50b2dnbGUoKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSk7XG4gICAgfSwgLy8gYWxsb3dNaW5ucG9zdEFjY291bnRcblxuICAgIHBvcHVsYXRlQXR0ZW5kZWVzOiBmdW5jdGlvbihxdWFudGl0eSkge1xuICAgICAgdmFyIGF0dGVuZGVlcyA9ICcnO1xuICAgICAgdmFyIGF0dGVuZGVlID0gJCgnLmF0dGVuZGVlcyA+IGZpZWxkc2V0OmZpcnN0JykuaHRtbCgpO1xuICAgICAgZm9yIChpID0gMTsgaSA8PSBxdWFudGl0eTsgaSsrKSB7XG4gICAgICAgIGF0dGVuZGVlcyArPSAnPGZpZWxkc2V0IGNsYXNzPVwiYXR0ZW5kZWVcIj4nICsgYXR0ZW5kZWUucmVwbGFjZSgvXzEvZywgJ18nICsgaSkgKyAnPC9maWVsZHNldD4nO1xuICAgICAgfVxuICAgICAgJCgnLmF0dGVuZGVlcycpLmh0bWwoYXR0ZW5kZWVzKTtcbiAgICB9LFxuXG4gICAgZGlzcGxheUFtb3VudDogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucywgc2luZ2xlX3VuaXRfcHJpY2UsIHF1YW50aXR5LCBhZGRpdGlvbmFsX2Ftb3VudCwgdmFsaWRfY29kZSkge1xuICAgICAgdmFyIGFtb3VudCA9IHNpbmdsZV91bml0X3ByaWNlICogcGFyc2VJbnQocXVhbnRpdHksIDEwKTtcbiAgICAgIGlmIChhZGRpdGlvbmFsX2Ftb3VudCA9PT0gJycpIHtcbiAgICAgICAgYWRkaXRpb25hbF9hbW91bnQgPSAwO1xuICAgICAgICAkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yKS5wYXJlbnQoKS5oaWRlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhbW91bnQgKz0gcGFyc2VJbnQoYWRkaXRpb25hbF9hbW91bnQsIDEwKTtcbiAgICAgICAgbGV2ZWxjaGVjayA9IHtvcmlnaW5hbF9hbW91bnQ6IGFkZGl0aW9uYWxfYW1vdW50LCBmcmVxdWVuY3k6IDEsIGxldmVsczogb3B0aW9ucy5sZXZlbHN9O1xuICAgICAgICBsZXZlbCA9IHRoaXMuY2hlY2tMZXZlbChlbGVtZW50LCBsZXZlbGNoZWNrLCAnbnVtJyk7XG4gICAgICAgIGlmIChsZXZlbCA+PSAyKSB7XG4gICAgICAgICAgJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvcikucGFyZW50KCkuc2hvdygpO1xuICAgICAgICB9XG4gICAgICAgICQob3B0aW9ucy5oYXNfYWRkaXRpb25hbF90ZXh0X3NlbGVjdG9yKS5odG1sKCQob3B0aW9ucy5oYXNfYWRkaXRpb25hbF90ZXh0X3NlbGVjdG9yKS5kYXRhKCd0ZXh0JykpO1xuICAgICAgICAkKG9wdGlvbnMuYWRkaXRpb25hbF9hbW91bnRfc2VsZWN0b3IpLnRleHQocGFyc2VGbG9hdCgkKG9wdGlvbnMuYWRkaXRpb25hbF9hbW91bnRfZmllbGQpLnZhbCgpKSk7XG4gICAgICB9XG5cbiAgICAgICQob3B0aW9ucy5jYWxjdWxhdGVkX2Ftb3VudF9zZWxlY3RvcikudGV4dChhbW91bnQpOyAvLyB0aGlzIGlzIHRoZSBwcmV2aWV3IHRleHRcbiAgICAgICQob3B0aW9ucy5vcmlnaW5hbF9hbW91bnRfc2VsZWN0b3IpLnZhbChxdWFudGl0eSAqIHNpbmdsZV91bml0X3ByaWNlKTsgLy8gdGhpcyBpcyB0aGUgYW1vdW50IGZpZWxkXG4gICAgICAkKG9wdGlvbnMucXVhbnRpdHlfc2VsZWN0b3IpLnRleHQocXVhbnRpdHkpOyAvLyBldmVyeXdoZXJlIHRoZXJlJ3MgYSBxdWFudGl0eVxuXG4gICAgICBpZiAocXVhbnRpdHkgPT0gMSkge1xuICAgICAgICAkKCcuYXR0ZW5kZWUtdGl0bGUnKS50ZXh0KCQoJy5hdHRlbmRlZS10aXRsZScpLmRhdGEoJ3NpbmdsZScpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQoJy5hdHRlbmRlZS10aXRsZScpLnRleHQoJCgnLmF0dGVuZGVlLXRpdGxlJykuZGF0YSgncGx1cmFsJykpO1xuICAgICAgfVxuXG4gICAgICAkKCcuY29kZS1yZXN1bHQnKS5yZW1vdmUoKTtcbiAgICAgIGlmICh2YWxpZF9jb2RlID09PSB0cnVlKSB7XG4gICAgICAgICQoJy5hcHBseS1wcm9tby1jb2RlJykuYWZ0ZXIoJzxwIGNsYXNzPVwiY29kZS1yZXN1bHQgc3VjY2Vzc1wiPllvdXIgbWVtYmVyIGRpc2NvdW50IGNvZGUgd2FzIHN1Y2Nlc3NmdWxseSBhZGRlZC48L3A+Jyk7XG4gICAgICAgICQoJy5zaG93LScgKyBvcHRpb25zLnNpbmdsZV91bml0X3ByaWNlX2F0dHJpYnV0ZSkudGV4dChzaW5nbGVfdW5pdF9wcmljZSk7XG4gICAgICAgICQoJy5hcHBseS1wcm9tby1jb2RlJykudGV4dCgnQXBwbGllZCcpLmFkZENsYXNzKCdidG4tLWRpc2FibGVkJyk7XG4gICAgICB9IGVsc2UgaWYgKHZhbGlkX2NvZGUgPT09IGZhbHNlKSB7XG4gICAgICAgICQoJy5hcHBseS1wcm9tby1jb2RlJykuYWZ0ZXIoJzxwIGNsYXNzPVwiY29kZS1yZXN1bHQgZXJyb3JcIj5UaGlzIGNvZGUgaXMgaW5jb3JyZWN0LiBUcnkgYWdhaW4uPC9wPicpO1xuICAgICAgfVxuXG4gICAgfSxcblxuICAgIGNhbGN1bGF0ZUFtb3VudDogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucywgZGF0YSkge1xuICAgICAgLy90aGlzLmRlYnVnKCdzdGFydC4gc2V0IHZhcmlhYmxlcyBhbmQgcGxhaW4gdGV4dCwgYW5kIHJlbW92ZSBjb2RlIHJlc3VsdC4nKTtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHZhciBxdWFudGl0eSA9ICQob3B0aW9ucy5xdWFudGl0eV9maWVsZCkudmFsKCk7XG5cbiAgICAgIHZhciBzaW5nbGVfdW5pdF9wcmljZSA9ICQob3B0aW9ucy5xdWFudGl0eV9maWVsZCkuZGF0YShvcHRpb25zLnNpbmdsZV91bml0X3ByaWNlX2F0dHJpYnV0ZSk7XG4gICAgICB2YXIgYWRkaXRpb25hbF9hbW91bnQgPSAkKG9wdGlvbnMuYWRkaXRpb25hbF9hbW91bnRfZmllbGQpLnZhbCgpO1xuICAgICAgaWYgKGRhdGEuc3VjY2VzcyA9PT0gdHJ1ZSkge1xuICAgICAgICBzaW5nbGVfdW5pdF9wcmljZSA9IGRhdGEuc2luZ2xlX3VuaXRfcHJpY2U7XG4gICAgICB9XG4gICAgICB0aGF0LmRpc3BsYXlBbW91bnQoZWxlbWVudCwgb3B0aW9ucywgc2luZ2xlX3VuaXRfcHJpY2UsIHF1YW50aXR5LCBhZGRpdGlvbmFsX2Ftb3VudCwgZGF0YS5zdWNjZXNzKTtcblxuICAgICAgJChvcHRpb25zLnF1YW50aXR5X2ZpZWxkICsgJywgJyArIG9wdGlvbnMuYWRkaXRpb25hbF9hbW91bnRfZmllbGQpLmNoYW5nZShmdW5jdGlvbigpIHsgLy8gdGhlIHF1YW50aXR5IG9yIGFkZGl0aW9uYWwgYW1vdW50IGNoYW5nZWRcbiAgICAgICAgcXVhbnRpdHkgPSAkKG9wdGlvbnMucXVhbnRpdHlfZmllbGQpLnZhbCgpO1xuICAgICAgICBhZGRpdGlvbmFsX2Ftb3VudCA9ICQob3B0aW9ucy5hZGRpdGlvbmFsX2Ftb3VudF9maWVsZCkudmFsKCk7XG4gICAgICAgIGlmIChxdWFudGl0eSAhPSAxKSB7XG4gICAgICAgICAgJChvcHRpb25zLml0ZW1fc2VsZWN0b3IpLnRleHQoJChvcHRpb25zLml0ZW1fc2VsZWN0b3IpLmRhdGEoJ3BsdXJhbCcpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkKG9wdGlvbnMuaXRlbV9zZWxlY3RvcikudGV4dCgkKG9wdGlvbnMuaXRlbV9zZWxlY3RvcikuZGF0YSgnc2luZ2xlJykpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhhdC5kaXNwbGF5QW1vdW50KGVsZW1lbnQsIG9wdGlvbnMsIHNpbmdsZV91bml0X3ByaWNlLCBxdWFudGl0eSwgYWRkaXRpb25hbF9hbW91bnQpO1xuICAgICAgICBcbiAgICAgIH0pO1xuXG4gICAgICB2YXIgYXR0ZW5kZWVzID0gJyc7XG4gICAgICAkKG9wdGlvbnMucmV2aWV3X3N0ZXBfc2VsZWN0b3IpLmZpbmQoJy5idG4nKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgYXR0ZW5kZWVzID0gdGhhdC5wb3B1bGF0ZUF0dGVuZGVlcyhxdWFudGl0eSk7XG4gICAgICB9KTtcblxuICAgICAgJCgnLnByb2dyZXNzLS1kb25hdGlvbiAucGFuZWwtLWF0dGVuZGVlcycpLmZpbmQoJ2EnKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgYXR0ZW5kZWVzID0gdGhhdC5wb3B1bGF0ZUF0dGVuZGVlcyhxdWFudGl0eSk7XG4gICAgICB9KTtcblxuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLnByb21vY29kZV9zZWxlY3RvcikubGVuZ3RoID4gMCkge1xuICAgICAgICAvLyQodGhpcy5vcHRpb25zLnByb21vY29kZV9zZWxlY3RvcikuYWZ0ZXIoJycpO1xuICAgICAgICAkKCcuYXBwbHktcHJvbW8tY29kZScpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgdmFyIGNvZGUgPSAkKG9wdGlvbnMucHJvbW9jb2RlX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKTtcbiAgICAgICAgICBpZiAoJChvcHRpb25zLmV2ZW50X2lkX3NlbGVjdG9yKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB2YXIgZXZlbnRfaWQgPSAkKG9wdGlvbnMuZXZlbnRfaWRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgZXZlbnRfaWQgPSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvL3VzZV9wcm9tbyA9IHRoYXQuY2hlY2tQcm9tb0NvZGUoY29kZSk7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgICAgICBwcm9tb19jb2RlOiBjb2RlLFxuICAgICAgICAgICAgICBldmVudDogZXZlbnRfaWRcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgdXJsOiAnL2V2ZW50LWNoZWNrLXByb21vLycsXG4gICAgICAgICAgICAgIGRhdGE6IGRhdGFcbiAgICAgICAgICAgIH0pLmRvbmUoZnVuY3Rpb24oIGRhdGEgKSB7XG4gICAgICAgICAgICAgIHRoYXQuY2FsY3VsYXRlQW1vdW50KGVsZW1lbnQsIG9wdGlvbnMsIGRhdGEpO1xuICAgICAgICAgICAgICAvL3RoYXQuZGlzcGxheUFtb3VudChlbGVtZW50LCBvcHRpb25zLCBkYXRhLnNpbmdsZV91bml0X3ByaWNlLCBxdWFudGl0eSwgYWRkaXRpb25hbF9hbW91bnQsIGRhdGEuc3VjY2Vzcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICB9LCAvLyBjYWxjdWxhdGVBbW91bnRcblxuICAgIGNoZWNrUHJvbW9Db2RlOiBmdW5jdGlvbihjb2RlKSB7XG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgcHJvbW9fY29kZTogY29kZVxuICAgICAgfTtcbiAgICAgICQuYWpheCh7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICB1cmw6ICcvZXZlbnQtY2hlY2stcHJvbW8vJyxcbiAgICAgICAgZGF0YTogZGF0YVxuICAgICAgfSkuZG9uZShmdW5jdGlvbiggZGF0YSApIHtcbiAgICAgICAgaWYgKGRhdGEuc3VjY2VzcyA9PT0gdHJ1ZSkge1xuICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSwgLy8gY2hlY2tQcm9tb0NvZGVcblxuICAgIHVzZVByb21vQ29kZTogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgJCh0aGlzLm9wdGlvbnMudXNlX3Byb21vY29kZV9zZWxlY3RvcikucGFyZW50KCkuaHRtbCgnPGEgaHJlZj1cIiNcIiBjbGFzcz1cInVzZS1wcm9tby1jb2RlXCI+VXNlIHByb21vIGNvZGU8L2E+Jyk7XG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMucHJvbW9jb2RlX3NlbGVjdG9yKS52YWwoKSA9PT0gJycpIHtcbiAgICAgICAgJChvcHRpb25zLnByb21vX3NlbGVjdG9yICsgJyBkaXY6Zmlyc3QnLCBlbGVtZW50KS5oaWRlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgJChvcHRpb25zLnByb21vX3NlbGVjdG9yICsgJyBkaXY6bGFzdCcsIGVsZW1lbnQpLmhpZGUoKTtcbiAgICAgIH1cbiAgICAgICQoJy51c2UtcHJvbW8tY29kZScpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICQob3B0aW9ucy5wcm9tb19zZWxlY3RvciArICcgZGl2OmZpcnN0JywgZWxlbWVudCkuc2hvdygpO1xuICAgICAgICAkKG9wdGlvbnMucHJvbW9fc2VsZWN0b3IgKyAnIGRpdjpsYXN0JywgZWxlbWVudCkuaGlkZSgpO1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgfSk7XG4gICAgfSwgLy91c2VQcm9tb0NvZGVcblxuICAgIGFkZFRvQ2FsZW5kYXI6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgICQob3B0aW9ucy5jYWxlbmRhcl9idXR0b25fc2VsZWN0b3IpLmNzcygnZGlzcGxheScsICdpbmxpbmUtYmxvY2snKTtcbiAgICB9LCAvLyBhZGRUb0NhbGVuZGFyXG5cbiAgICBjaGVja01pbm5wb3N0QWNjb3VudEV4aXN0czogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucywgZW1haWwpIHsgICAgIFxuICAgICAgdmFyIHVzZXIgPSB7XG4gICAgICAgIGVtYWlsOiBlbWFpbFxuICAgICAgfTtcbiAgICAgICQuYWpheCh7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIHVybDogb3B0aW9ucy5taW5ucG9zdF9yb290ICsgJy93cC1qc29uL3VzZXItYWNjb3VudC1tYW5hZ2VtZW50L3YxL2NoZWNrLWFjY291bnQtZXhpc3RzJyxcbiAgICAgICAgZGF0YTogdXNlclxuICAgICAgfSkuZG9uZShmdW5jdGlvbiggcmVzdWx0ICkge1xuICAgICAgICBpZiAocmVzdWx0LnN0YXR1cyA9PT0gJ3N1Y2Nlc3MnICYmIHJlc3VsdC5yZWFzb24gPT09ICd1c2VyIGV4aXN0cycpIHsgLy8gdXNlciBleGlzdHNcbiAgICAgICAgICBpZiAoJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgICAgICQob3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgZWxlbWVudCkuaGlkZSgpO1xuICAgICAgICAgICAgJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkucGFyZW50KCkuaGlkZSgpO1xuICAgICAgICAgICAgJCgnLmFjY291bnQtZXhpc3RzJywgZWxlbWVudCkuc2hvdygpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KS5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgICAgICAgJChvcHRpb25zLnBhc3N3b3JkX3NlbGVjdG9yLCBlbGVtZW50KS5oaWRlKCk7XG4gICAgICAgICAgICAgICQob3B0aW9ucy5jcmVhdGVfbXBfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpLmhpZGUoKTtcbiAgICAgICAgICAgICAgJCgnLmFjY291bnQtZXhpc3RzJywgZWxlbWVudCkuc2hvdygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgeyAvLyB1c2VyIGRvZXMgbm90IGV4aXN0IG9yIGFqYXggY2FsbCBmYWlsZWRcbiAgICAgICAgICBpZiAoJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgICAgICQob3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgZWxlbWVudCkuc2hvdygpO1xuICAgICAgICAgICAgb3B0aW9ucy5jcmVhdGVfYWNjb3VudCA9IHRydWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQob3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgZWxlbWVudCkuaGlkZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAkKCcuYWNjb3VudC1leGlzdHMnLCBlbGVtZW50KS5oaWRlKCk7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LCAvLyBjaGVja01pbm5wb3N0QWNjb3VudEV4aXN0c1xuXG4gICAgY2hvb3NlUGF5bWVudE1ldGhvZDogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuXG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG5cbiAgICAgIGlmICgkKG9wdGlvbnMuY2hvb3NlX3BheW1lbnQpLmxlbmd0aCA+IDApIHsgICAgICBcbiAgICAgICAgaWYgKCQob3B0aW9ucy5jaG9vc2VfcGF5bWVudCArICcgaW5wdXQnKS5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICAgIHZhciBjaGVja2VkID0gJChvcHRpb25zLmNob29zZV9wYXltZW50ICsgJyBpbnB1dDpjaGVja2VkJykuYXR0cignaWQnKTtcbiAgICAgICAgICB2YXIgY2hlY2tlZF92YWx1ZSA9ICQob3B0aW9ucy5jaG9vc2VfcGF5bWVudCArICcgaW5wdXQ6Y2hlY2tlZCcpLnZhbCgpO1xuICAgICAgICAgICQob3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvcikucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICQob3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvciArICcuJyArIGNoZWNrZWQpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICAgICAkKG9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IgKyAnOm5vdCguYWN0aXZlKSBsYWJlbCcpLnJlbW92ZUNsYXNzKCdyZXF1aXJlZCcpO1xuICAgICAgICAgICQob3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvciArICc6bm90KC5hY3RpdmUpIGlucHV0JykucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICAgICAgJChvcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yICsgJy5hY3RpdmUgbGFiZWwnKS5hZGRDbGFzcygncmVxdWlyZWQnKTtcbiAgICAgICAgICAkKG9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IgKyAnLmFjdGl2ZSBpbnB1dCcpLnByb3AoJ3JlcXVpcmVkJywgdHJ1ZSk7XG4gICAgICAgICAgaWYgKCBjaGVja2VkX3ZhbHVlID09PSAnYWNoJyApIHtcbiAgICAgICAgICAgIHRoYXQuY2FsY3VsYXRlRmVlcyh0aGF0Lm9wdGlvbnMub3JpZ2luYWxfYW1vdW50LCAnYWNoJyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoYXQuY2FsY3VsYXRlRmVlcyh0aGF0Lm9wdGlvbnMub3JpZ2luYWxfYW1vdW50LCAndmlzYScpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICQob3B0aW9ucy5jaG9vc2VfcGF5bWVudCArICcgaW5wdXQnKS5jaGFuZ2UoZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgJChvcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAgICAgJChvcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yICsgJy4nICsgdGhpcy5pZCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgICAgICQob3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvciArICc6bm90KC5hY3RpdmUpIGxhYmVsJykucmVtb3ZlQ2xhc3MoJ3JlcXVpcmVkJyk7XG4gICAgICAgICAgJChvcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yICsgJzpub3QoLmFjdGl2ZSkgaW5wdXQnKS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgICAgICAkKG9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IgKyAnLmFjdGl2ZSBsYWJlbCcpLmFkZENsYXNzKCdyZXF1aXJlZCcpO1xuICAgICAgICAgICQob3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvciArICcuYWN0aXZlIGlucHV0JykucHJvcCgncmVxdWlyZWQnLCB0cnVlKTtcbiAgICAgICAgICAkKCcjYmFua1Rva2VuJykucmVtb3ZlKCk7XG4gICAgICAgICAgaWYgKCB0aGlzLnZhbHVlID09PSAnYWNoJyApIHtcbiAgICAgICAgICAgIHRoYXQuY2FsY3VsYXRlRmVlcyh0aGF0Lm9wdGlvbnMub3JpZ2luYWxfYW1vdW50LCAnYWNoJyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoYXQuY2FsY3VsYXRlRmVlcyh0aGF0Lm9wdGlvbnMub3JpZ2luYWxfYW1vdW50LCAndmlzYScpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSwgLy8gY2hvb3NlUGF5bWVudE1ldGhvZFxuXG4gICAgY3JlZGl0Q2FyZEZpZWxkczogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuXG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG5cbiAgICAgICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5wcmVwZW5kKCc8aW5wdXQgdHlwZT1cImhpZGRlblwiIGlkPVwic291cmNlXCIgbmFtZT1cInNvdXJjZVwiIHZhbHVlPVwiJyArIGRvY3VtZW50LnJlZmVycmVyICsgJ1wiIC8+Jyk7XG5cbiAgICAgIHZhciBzdHlsZSA9IHtcbiAgICAgICAgYmFzZToge1xuICAgICAgICAgIGljb25Db2xvcjogJyM2NjZFRTgnLFxuICAgICAgICAgIGxpbmVIZWlnaHQ6ICczN3B4JyxcbiAgICAgICAgICBmb250V2VpZ2h0OiA0MDAsXG4gICAgICAgICAgZm9udEZhbWlseTogJ0dlb3JnaWEsQ2FtYnJpYSxUaW1lcyBOZXcgUm9tYW4sVGltZXMsc2VyaWYnLFxuICAgICAgICAgIGZvbnRTaXplOiAnMTZweCcsXG4gICAgICAgIH0sXG4gICAgICB9O1xuXG4gICAgICAvLyBBZGQgYW4gaW5zdGFuY2Ugb2YgdGhlIGNhcmQgVUkgY29tcG9uZW50IGludG8gdGhlIGBjYXJkLWVsZW1lbnRgIDxkaXY+XG4gICAgICAvL2NhcmQubW91bnQoJyNjYXJkLWVsZW1lbnQnKTtcbiAgICAgIGlmICggJCgnLmNyZWRpdC1jYXJkLWdyb3VwJykubGVuZ3RoID09PSAwICYmICQoJy5wYXltZW50LW1ldGhvZC5jaG9vc2UtY2FyZCcpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGF0LmNhcmROdW1iZXJFbGVtZW50ID0gdGhhdC5lbGVtZW50cy5jcmVhdGUoJ2NhcmROdW1iZXInLCB7XG4gICAgICAgIHN0eWxlOiBzdHlsZVxuICAgICAgfSk7XG4gICAgICB0aGF0LmNhcmROdW1iZXJFbGVtZW50Lm1vdW50KG9wdGlvbnMuY2NfbnVtX3NlbGVjdG9yKTtcblxuICAgICAgdGhhdC5jYXJkRXhwaXJ5RWxlbWVudCA9IHRoYXQuZWxlbWVudHMuY3JlYXRlKCdjYXJkRXhwaXJ5Jywge1xuICAgICAgICBzdHlsZTogc3R5bGVcbiAgICAgIH0pO1xuICAgICAgdGhhdC5jYXJkRXhwaXJ5RWxlbWVudC5tb3VudChvcHRpb25zLmNjX2V4cF9zZWxlY3Rvcik7XG5cbiAgICAgIHRoYXQuY2FyZEN2Y0VsZW1lbnQgPSB0aGF0LmVsZW1lbnRzLmNyZWF0ZSgnY2FyZEN2YycsIHtcbiAgICAgICAgc3R5bGU6IHN0eWxlXG4gICAgICB9KTtcbiAgICAgIHRoYXQuY2FyZEN2Y0VsZW1lbnQubW91bnQob3B0aW9ucy5jY19jdnZfc2VsZWN0b3IpO1xuXG4gICAgICAvLyB2YWxpZGF0ZS9lcnJvciBoYW5kbGUgdGhlIGNhcmQgZmllbGRzXG4gICAgICB0aGF0LmNhcmROdW1iZXJFbGVtZW50Lm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAvLyBlcnJvciBoYW5kbGluZ1xuICAgICAgICB0aGF0LnN0cmlwZUVycm9yRGlzcGxheShldmVudCwgJChvcHRpb25zLmNjX251bV9zZWxlY3RvciwgZWxlbWVudCksIGVsZW1lbnQsIG9wdGlvbnMgKTtcbiAgICAgICAgLy8gU3dpdGNoIGJyYW5kIGxvZ29cbiAgICAgICAgaWYgKGV2ZW50LmJyYW5kKSB7XG4gICAgICAgICAgdGhhdC5jYWxjdWxhdGVGZWVzKHRoYXQub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQsIGV2ZW50LmJyYW5kKTtcbiAgICAgICAgICB0aGF0LnNldEJyYW5kSWNvbihldmVudC5icmFuZCk7XG4gICAgICAgIH1cbiAgICAgICAgLy9zZXRPdXRjb21lKGV2ZW50KTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGF0LmNhcmRFeHBpcnlFbGVtZW50Lm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAvLyBlcnJvciBoYW5kbGluZ1xuICAgICAgICB0aGF0LnN0cmlwZUVycm9yRGlzcGxheShldmVudCwgJChvcHRpb25zLmNjX2V4cF9zZWxlY3RvciwgZWxlbWVudCksIGVsZW1lbnQsIG9wdGlvbnMgKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGF0LmNhcmRDdmNFbGVtZW50Lm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAvLyBlcnJvciBoYW5kbGluZ1xuICAgICAgICB0aGF0LnN0cmlwZUVycm9yRGlzcGxheShldmVudCwgJChvcHRpb25zLmNjX2N2dl9zZWxlY3RvciwgZWxlbWVudCksIGVsZW1lbnQsIG9wdGlvbnMgKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyB0aGlzIGlzIHRoZSBtZXRob2QgdG8gY3JlYXRlIGEgc2luZ2xlIGNhcmQgZmllbGQgYW5kIG1vdW50IGl0XG4gICAgICAvKnZhciBjYXJkID0gdGhhdC5lbGVtZW50cy5jcmVhdGUoXG4gICAgICAgICdjYXJkJyxcbiAgICAgICAge1xuICAgICAgICAgIGhpZGVQb3N0YWxDb2RlOiB0cnVlXG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgICAvLyBBZGQgYW4gaW5zdGFuY2Ugb2YgdGhlIGNhcmQgVUkgY29tcG9uZW50IGludG8gdGhlIGBjYXJkLWVsZW1lbnRgIDxkaXY+XG4gICAgICBjYXJkLm1vdW50KCcjY2FyZC1lbGVtZW50Jyk7Ki9cblxuICAgIH0sIC8vIGNyZWRpdENhcmRGaWVsZHNcblxuICAgIHNldEJyYW5kSWNvbjogZnVuY3Rpb24oYnJhbmQpIHtcbiAgICAgIHZhciBjYXJkQnJhbmRUb1BmQ2xhc3MgPSB7XG4gICAgICAgICd2aXNhJzogJ3BmLXZpc2EnLFxuICAgICAgICAnbWFzdGVyY2FyZCc6ICdwZi1tYXN0ZXJjYXJkJyxcbiAgICAgICAgJ2FtZXgnOiAncGYtYW1lcmljYW4tZXhwcmVzcycsXG4gICAgICAgICdkaXNjb3Zlcic6ICdwZi1kaXNjb3ZlcicsXG4gICAgICAgICdkaW5lcnMnOiAncGYtZGluZXJzJyxcbiAgICAgICAgJ2pjYic6ICdwZi1qY2InLFxuICAgICAgICAndW5rbm93bic6ICdwZi1jcmVkaXQtY2FyZCcsXG4gICAgICB9XG4gICAgICB2YXIgYnJhbmRJY29uRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdicmFuZC1pY29uJyk7XG4gICAgICB2YXIgcGZDbGFzcyA9ICdwZi1jcmVkaXQtY2FyZCc7XG4gICAgICBpZiAoYnJhbmQgaW4gY2FyZEJyYW5kVG9QZkNsYXNzKSB7XG4gICAgICAgIHBmQ2xhc3MgPSBjYXJkQnJhbmRUb1BmQ2xhc3NbYnJhbmRdO1xuICAgICAgfVxuICAgICAgZm9yICh2YXIgaSA9IGJyYW5kSWNvbkVsZW1lbnQuY2xhc3NMaXN0Lmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgIGJyYW5kSWNvbkVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShicmFuZEljb25FbGVtZW50LmNsYXNzTGlzdFtpXSk7XG4gICAgICB9XG4gICAgICBicmFuZEljb25FbGVtZW50LmNsYXNzTGlzdC5hZGQoJ3BmJyk7XG4gICAgICBicmFuZEljb25FbGVtZW50LmNsYXNzTGlzdC5hZGQocGZDbGFzcyk7XG4gICAgfSxcblxuICAgIGFjaEZpZWxkczogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgaWYgKG9wdGlvbnMucGxhaWRfZW52ICE9ICcnICYmIG9wdGlvbnMua2V5ICE9ICcnICYmIHR5cGVvZiBQbGFpZCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdmFyIGxpbmtIYW5kbGVyID0gUGxhaWQuY3JlYXRlKHtcbiAgICAgICAgICBzZWxlY3RBY2NvdW50OiB0cnVlLFxuICAgICAgICAgIGFwaVZlcnNpb246ICd2MicsXG4gICAgICAgICAgZW52OiBvcHRpb25zLnBsYWlkX2VudixcbiAgICAgICAgICBjbGllbnROYW1lOiAnTWlublBvc3QnLFxuICAgICAgICAgIGtleTogb3B0aW9ucy5wbGFpZF9wdWJsaWNfa2V5LFxuICAgICAgICAgIHByb2R1Y3Q6ICdhdXRoJyxcbiAgICAgICAgICBvbkxvYWQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgLy8gVGhlIExpbmsgbW9kdWxlIGZpbmlzaGVkIGxvYWRpbmcuXG4gICAgICAgICAgfSxcbiAgICAgICAgICBvblN1Y2Nlc3M6IGZ1bmN0aW9uKHB1YmxpY190b2tlbiwgbWV0YWRhdGEpIHtcbiAgICAgICAgICAgIC8vIFRoZSBvblN1Y2Nlc3MgZnVuY3Rpb24gaXMgY2FsbGVkIHdoZW4gdGhlIHVzZXIgaGFzIHN1Y2Nlc3NmdWxseVxuICAgICAgICAgICAgLy8gYXV0aGVudGljYXRlZCBhbmQgc2VsZWN0ZWQgYW4gYWNjb3VudCB0byB1c2UuXG4gICAgICAgICAgICAvL1xuICAgICAgICAgICAgLy8gV2hlbiBjYWxsZWQsIHlvdSB3aWxsIHNlbmQgdGhlIHB1YmxpY190b2tlbiBhbmQgdGhlIHNlbGVjdGVkXG4gICAgICAgICAgICAvLyBhY2NvdW50IElELCBtZXRhZGF0YS5hY2NvdW50X2lkLCB0byB5b3VyIGJhY2tlbmQgYXBwIHNlcnZlci5cbiAgICAgICAgICAgIC8vXG4gICAgICAgICAgICAvLyBzZW5kRGF0YVRvQmFja2VuZFNlcnZlcih7XG4gICAgICAgICAgICAvLyAgIHB1YmxpY190b2tlbjogcHVibGljX3Rva2VuLFxuICAgICAgICAgICAgLy8gICBhY2NvdW50X2lkOiBtZXRhZGF0YS5hY2NvdW50X2lkXG4gICAgICAgICAgICAvLyB9KTtcblxuICAgICAgICAgICAgLy90aGlzLmRlYnVnKCdQdWJsaWMgVG9rZW46ICcgKyBwdWJsaWNfdG9rZW4pO1xuICAgICAgICAgICAgLy90aGlzLmRlYnVnKCdDdXN0b21lci1zZWxlY3RlZCBhY2NvdW50IElEOiAnICsgbWV0YWRhdGEuYWNjb3VudF9pZCk7XG5cbiAgICAgICAgICAgIHZhciBzdXBwb3J0Zm9ybSA9ICQob3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3Rvcik7XG5cbiAgICAgICAgICAgIC8vIHJlc3BvbnNlIGNvbnRhaW5zIGlkIGFuZCBjYXJkLCB3aGljaCBjb250YWlucyBhZGRpdGlvbmFsIGNhcmQgZGV0YWlsc1xuICAgICAgICAgICAgLy8gSW5zZXJ0IHRoZSBkYXRhIGludG8gdGhlIGZvcm0gc28gaXQgZ2V0cyBzdWJtaXR0ZWQgdG8gdGhlIHNlcnZlclxuICAgICAgICAgICAgc3VwcG9ydGZvcm0uYXBwZW5kKCQoJzxpbnB1dCB0eXBlPVxcXCJoaWRkZW5cXFwiIG5hbWU9XFxcInB1YmxpY190b2tlblxcXCIgLz4nKS52YWwocHVibGljX3Rva2VuKSk7XG4gICAgICAgICAgICBzdXBwb3J0Zm9ybS5hcHBlbmQoJCgnPGlucHV0IHR5cGU9XFxcImhpZGRlblxcXCIgbmFtZT1cXFwiYWNjb3VudF9pZFxcXCIgLz4nKS52YWwobWV0YWRhdGEuYWNjb3VudF9pZCkpO1xuXG4gICAgICAgICAgICAvLyBnZXQgdGhlIGFjY291bnQgdmFsaWRhdGVkIGJ5IGFqYXhcbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgIHVybDonL3BsYWlkX3Rva2VuLycsXG4gICAgICAgICAgICAgIC8vY2FjaGU6IGZhbHNlLFxuICAgICAgICAgICAgICBkYXRhOiAkKHN1cHBvcnRmb3JtKS5zZXJpYWxpemUoKSxcbiAgICAgICAgICAgICAgdHlwZTogJ1BPU1QnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZXNwb25zZS5lcnJvciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAvLyB0aGVyZSBpcyBhbiBlcnJvci5cbiAgICAgICAgICAgICAgICAkKG9wdGlvbnMucGxhaWRfbGluaykucGFyZW50KCkuYWZ0ZXIoJzxwIGNsYXNzPVwiZXJyb3JcIj4nICsgcmVzcG9uc2UuZXJyb3IgKyAnPC9wPicpXG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy90aGlzLmRlYnVnKCdwcmludCByZXNwb25zZSBoZXJlJyk7XG4gICAgICAgICAgICAgICAgLy90aGlzLmRlYnVnKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAkKG9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLnByZXBlbmQoJzxpbnB1dCB0eXBlPVwiaGlkZGVuXCIgaWQ9XCJiYW5rVG9rZW5cIiBuYW1lPVwiYmFua1Rva2VuXCIgdmFsdWU9XCInICsgcmVzcG9uc2Uuc3RyaXBlX2JhbmtfYWNjb3VudF90b2tlbiArICdcIiAvPicpO1xuICAgICAgICAgICAgICAgICQob3B0aW9ucy5wbGFpZF9saW5rLCBlbGVtZW50KS5odG1sKCc8c3Ryb25nPllvdXIgYWNjb3VudCB3YXMgc3VjY2Vzc2Z1bGx5IGF1dGhvcml6ZWQ8L3N0cm9uZz4nKS5jb250ZW50cygpLnVud3JhcCgpO1xuICAgICAgICAgICAgICAgIHRoYXQuY2FsY3VsYXRlRmVlcyh0aGF0Lm9wdGlvbnMub3JpZ2luYWxfYW1vdW50LCAnYWNoJyk7IC8vIGNhbGN1bGF0ZSB0aGUgYWNoIGZlZXNcbiAgICAgICAgICAgICAgICAvLyBhZGQgdGhlIGZpZWxkKHMpIHdlIG5lZWQgdG8gdGhlIGZvcm0gZm9yIHN1Ym1pdHRpbmdcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5lcnJvcihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAkKG9wdGlvbnMucGxhaWRfbGluaykucGFyZW50KCkuYWZ0ZXIoJzxwIGNsYXNzPVwiZXJyb3JcIj4nICsgcmVzcG9uc2UuZXJyb3IgKyAnPC9wPicpXG4gICAgICAgICAgICB9KTtcblxuXG4gICAgICAgICAgICBcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9uRXhpdDogZnVuY3Rpb24oZXJyLCBtZXRhZGF0YSkge1xuICAgICAgICAgICAgLy8gVGhlIHVzZXIgZXhpdGVkIHRoZSBMaW5rIGZsb3cuXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICAgICQob3B0aW9ucy5wbGFpZF9saW5rLCBlbGVtZW50KS5jbGljayhmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgJChvcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yICsgJyAuZXJyb3InKS5yZW1vdmUoKTsgLy8gcmVtb3ZlIG1ldGhvZCBlcnJvciBtZXNzYWdlIGlmIGl0IGlzIHRoZXJlXG4gICAgICAgICAgbGlua0hhbmRsZXIub3BlbigpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LCAvLyBhY2hGaWVsZHNcblxuICAgIGhhc0h0bWw1VmFsaWRhdGlvbjogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgLy90aGlzLmRlYnVnKCd2YWx1ZSBpcyAnICsgdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykuY2hlY2tWYWxpZGl0eSA9PT0gJ2Z1bmN0aW9uJyk7XG4gICAgICByZXR1cm4gdHlwZW9mIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JykuY2hlY2tWYWxpZGl0eSA9PT0gJ2Z1bmN0aW9uJztcbiAgICB9LFxuXG4gICAgYnV0dG9uU3RhdHVzOiBmdW5jdGlvbihvcHRpb25zLCBidXR0b24sIGRpc2FibGVkKSB7XG4gICAgICBidXR0b24ucHJvcCgnZGlzYWJsZWQnLCBkaXNhYmxlZCk7XG4gICAgICBpZiAoZGlzYWJsZWQgPT09IGZhbHNlKSB7XG4gICAgICAgIGJ1dHRvbi50ZXh0KG9wdGlvbnMuYnV0dG9uX3RleHQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnV0dG9uLnRleHQoJ1Byb2Nlc3NpbmcnKTtcbiAgICAgIH1cbiAgICB9LFxuXG4gICAgdmFsaWRhdGVBbmRTdWJtaXQ6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICQob3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3Rvcikuc3VibWl0KGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgLy8gZG8gc29tZSBmYWxsYmFjayBzdHVmZiBmb3Igbm9uLWh0bWw1IGJyb3dzZXJzXG4gICAgICAgIGlmICh0aGF0Lmhhc0h0bWw1VmFsaWRhdGlvbihlbGVtZW50LCBvcHRpb25zKSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmNoZWNrVmFsaWRpdHkoKSkge1xuICAgICAgICAgICAgICAkKHRoaXMpLmFkZENsYXNzKCdpbnZhbGlkJyk7XG4gICAgICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICAgICAgICBzY3JvbGxUb3A6ICQodGhpcykuZmluZCgnaW5wdXQ6aW52YWxpZCcpLnBhcmVudCgpLm9mZnNldCgpLnRvcFxuICAgICAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgICAgICAgLy90aGlzLmRlYnVnKCd0b3AgaXMgJyArICk7XG4gICAgICAgICAgICAgICQodGhpcykuZmluZCgnaW5wdXQ6aW52YWxpZCcpLnBhcmVudCgpLmFkZENsYXNzKCdlcnJvcicpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgJCh0aGlzKS5yZW1vdmVDbGFzcygnaW52YWxpZCcpO1xuICAgICAgICAgICAgICAkKHRoaXMpLmZpbmQoJ2lucHV0OmludmFsaWQnKS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnZXJyb3InKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHZhbGlkYXRlIGFuZCBzdWJtaXQgdGhlIGZvcm1cbiAgICAgICAgJCgnLmNoZWNrLWZpZWxkJykucmVtb3ZlKCk7XG4gICAgICAgICQoJ2lucHV0LCBsYWJlbCcsIGVsZW1lbnQpLnJlbW92ZUNsYXNzKCdlcnJvcicpO1xuICAgICAgICB2YXIgdmFsaWQgPSB0cnVlO1xuICAgICAgICB2YXIgcGF5bWVudF9tZXRob2QgPSAnY2FyZCc7XG4gICAgICAgIGlmICgkKG9wdGlvbnMuY2hvb3NlX3BheW1lbnQpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBwYXltZW50X21ldGhvZCA9ICQob3B0aW9ucy5jaG9vc2VfcGF5bWVudCArICcgaW5wdXQ6Y2hlY2tlZCcpLnZhbCgpO1xuICAgICAgICB9XG4gICAgICAgICQob3B0aW9ucy5jaG9vc2VfcGF5bWVudCArICcgaW5wdXQnKS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgJChvcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yICsgJyAuZXJyb3InKS5yZW1vdmUoKTsgLy8gcmVtb3ZlIG1ldGhvZCBlcnJvciBtZXNzYWdlIGlmIGl0IGlzIHRoZXJlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChwYXltZW50X21ldGhvZCA9PT0gJ2FjaCcpIHtcbiAgICAgICAgICBpZiAoJCgnaW5wdXRbbmFtZT1cImJhbmtUb2tlblwiXScpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICQob3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvcikucHJlcGVuZCgnPHAgY2xhc3M9XCJlcnJvclwiPllvdSBhcmUgcmVxdWlyZWQgdG8gZW50ZXIgY3JlZGl0IGNhcmQgaW5mb3JtYXRpb24sIG9yIHRvIGF1dGhvcml6ZSBNaW5uUG9zdCB0byBjaGFyZ2UgeW91ciBiYW5rIGFjY291bnQsIHRvIG1ha2UgYSBwYXltZW50LjwvcD4nKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsaWQgPT09IHRydWUpIHtcbiAgICAgICAgICAvLyAxLiBwcm9jZXNzIGRvbmF0aW9uIHRvIHN0cmlwZVxuICAgICAgICAgIHRoYXQuYnV0dG9uU3RhdHVzKG9wdGlvbnMsICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKSwgdHJ1ZSk7XG5cbiAgICAgICAgICB2YXIgZnVsbF9uYW1lID0gJyc7XG4gICAgICAgICAgaWYgKCQoJyNmdWxsX25hbWUnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBmdWxsX25hbWUgPSAkKCcjZnVsbF9uYW1lJykudmFsKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZ1bGxfbmFtZSA9ICQoJyNmaXJzdF9uYW1lJykudmFsKCkgKyAnICcgKyAkKCcjbGFzdF9uYW1lJykudmFsKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIHN0cmVldCA9ICdOb25lJztcbiAgICAgICAgICBpZiAoJCgnaW5wdXRbbmFtZT1cImZ1bGxfYWRkcmVzc1wiXScpLnZhbCgpICE9ICcnKSB7XG4gICAgICAgICAgICBzdHJlZXQgPSAkKCcjZnVsbF9hZGRyZXNzJykudmFsKCk7XG4gICAgICAgICAgICBpZiAoJCgnaW5wdXRbbmFtZT1cImJpbGxpbmdfc3RyZWV0XCJdJykudmFsKCkgIT0gJycpIHtcbiAgICAgICAgICAgICAgc3RyZWV0ID0gJCgnaW5wdXRbbmFtZT1cImJpbGxpbmdfc3RyZWV0XCJdJykudmFsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIGNpdHkgPSAnTm9uZSc7XG4gICAgICAgICAgaWYgKCQoJ2lucHV0W25hbWU9XCJiaWxsaW5nX2NpdHlcIl0nKS52YWwoKSAhPSAnJykge1xuICAgICAgICAgICAgY2l0eSA9ICQoJ2lucHV0W25hbWU9XCJiaWxsaW5nX2NpdHlcIl0nKS52YWwoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgc3RhdGUgPSAnTm9uZSc7XG4gICAgICAgICAgaWYgKCQoJ2lucHV0W25hbWU9XCJiaWxsaW5nX3N0YXRlXCJdJykudmFsKCkgIT0gJycpIHtcbiAgICAgICAgICAgIHN0YXRlID0gJCgnaW5wdXRbbmFtZT1cImJpbGxpbmdfc3RhdGVcIl0nKS52YWwoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB2YXIgemlwID0gJ05vbmUnO1xuICAgICAgICAgIGlmICgkKCdpbnB1dFtuYW1lPVwiYmlsbGluZ196aXBcIl0nKS52YWwoKSAhPSAnJykge1xuICAgICAgICAgICAgemlwID0gJCgnaW5wdXRbbmFtZT1cImJpbGxpbmdfemlwXCJdJykudmFsKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdmFyIGNvdW50cnkgPSAnVVMnO1xuICAgICAgICAgIGlmICgkKCdpbnB1dFtuYW1lPVwiYmlsbGluZ19jb3VudHJ5XCJdJykudmFsKCkgIT0gJycpIHtcbiAgICAgICAgICAgIGNvdW50cnkgPSAkKCdpbnB1dFtuYW1lPVwiYmlsbGluZ19jb3VudHJ5XCJdJykudmFsKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gMi4gY3JlYXRlIG1pbm5wb3N0IGFjY291bnQgaWYgc3BlY2lmaWVkXG4gICAgICAgICAgaWYgKG9wdGlvbnMuY3JlYXRlX2FjY291bnQgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHZhciB1c2VyID0ge1xuICAgICAgICAgICAgICBlbWFpbDogJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICAgICAgZmlyc3RfbmFtZTogJChvcHRpb25zLmZpcnN0X25hbWVfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgICAgICBsYXN0X25hbWU6ICQob3B0aW9ucy5sYXN0X25hbWVfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgICAgICBwYXNzd29yZDogJChvcHRpb25zLnBhc3N3b3JkX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICAgICAgY2l0eTogJChvcHRpb25zLmFjY291bnRfY2l0eV9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgICAgIHN0YXRlOiAkKG9wdGlvbnMuYWNjb3VudF9zdGF0ZV9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgICAgIHppcDogJChvcHRpb25zLmFjY291bnRfemlwX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgICAgdXJsOiBvcHRpb25zLm1pbm5wb3N0X3Jvb3QgKyAnL3dwLWpzb24vdXNlci1hY2NvdW50LW1hbmFnZW1lbnQvdjEvY3JlYXRlLXVzZXInLFxuICAgICAgICAgICAgICBkYXRhOiB1c2VyXG4gICAgICAgICAgICB9KS5kb25lKGZ1bmN0aW9uKCBkYXRhICkge1xuICAgICAgICAgICAgICBpZiAoZGF0YS5zdGF0dXMgPT09ICdzdWNjZXNzJyAmJiBkYXRhLnJlYXNvbiA9PT0gJ25ldyB1c2VyJykge1xuICAgICAgICAgICAgICAgIC8vIHVzZXIgY3JlYXRlZCAtIHRoZXkgc2hvdWxkIHJlY2VpdmUgZW1haWxcbiAgICAgICAgICAgICAgICAvLyBzdWJtaXQgdGhlIGZvcm1cbiAgICAgICAgICAgICAgICAvL3N1cHBvcnRmb3JtLmdldCgwKS5zdWJtaXQoKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyB1c2VyIG5vdCBjcmVhdGVkXG4gICAgICAgICAgICAgICAgLy8gc3RpbGwgc3VibWl0IHRoZSBmb3JtXG4gICAgICAgICAgICAgICAgLy9zdXBwb3J0Zm9ybS5nZXQoMCkuc3VibWl0KCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICgkKCdpbnB1dFtuYW1lPVwiYmFua1Rva2VuXCJdJykubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgIC8vIGZpbmFsbHksIGdldCBhIHRva2VuIGZyb20gc3RyaXBlLCBhbmQgdHJ5IHRvIGNoYXJnZSBpdCBpZiBpdCBpcyBub3QgYWNoXG4gICAgICAgICAgICB0aGF0LmNyZWF0ZVRva2VuKHRoYXQuY2FyZE51bWJlckVsZW1lbnQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBpZiBpdCBpcyBhY2gsIHdlIGFscmVhZHkgaGF2ZSBhIHRva2VuIHNvIHBhc3MgaXQgdG8gc3RyaXBlLlxuICAgICAgICAgICAgdGhhdC5zdHJpcGVUb2tlbkhhbmRsZXIoICQoJyNiYW5rVG9rZW4nKS52YWwoKSwgJ2FjaCcgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gdGhpcyBtZWFucyB2YWxpZCBpcyBmYWxzZVxuICAgICAgICAgIHRoYXQuYnV0dG9uU3RhdHVzKG9wdGlvbnMsICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKSwgZmFsc2UpO1xuICAgICAgICB9XG5cbiAgICAgIH0pO1xuICAgIH0sIC8vIHZhbGlkYXRlQW5kU3VibWl0XG5cbiAgICBzdHJpcGVFcnJvckRpc3BsYXk6IGZ1bmN0aW9uKGV2ZW50LCB0aGlzX3NlbGVjdG9yLCBlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICAvLyBsaXN0ZW4gZm9yIGVycm9ycyBhbmQgZGlzcGxheS9oaWRlIGVycm9yIG1lc3NhZ2VzXG4gICAgICB2YXIgd2hpY2hfZXJyb3IgPSB0aGlzX3NlbGVjdG9yLmF0dHIoJ2lkJyk7XG4gICAgICBpZiAoZXZlbnQuZXJyb3IpIHtcbiAgICAgICAgJCgnLmNhcmQtaW5zdHJ1Y3Rpb24uJyArIHdoaWNoX2Vycm9yKS50ZXh0KGV2ZW50LmVycm9yLm1lc3NhZ2UgKyAnIFBsZWFzZSB0cnkgYWdhaW4uJyk7XG4gICAgICAgICQoJy5jYXJkLWluc3RydWN0aW9uLicgKyB3aGljaF9lcnJvcikuYWRkQ2xhc3MoJ2ludmFsaWQnKTtcbiAgICAgICAgdGhpc19zZWxlY3Rvci5wYXJlbnQoKS5hZGRDbGFzcygnZXJyb3InKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQoJy5jYXJkLWluc3RydWN0aW9uLicgKyB3aGljaF9lcnJvcikucmVtb3ZlQ2xhc3MoJ2ludmFsaWQnKTtcbiAgICAgICAgJCgnLmNhcmQtaW5zdHJ1Y3Rpb24uJyArIHdoaWNoX2Vycm9yKS5lbXB0eSgpO1xuICAgICAgICAkKG9wdGlvbnMuY2NfbnVtX3NlbGVjdG9yLCBlbGVtZW50KS5yZW1vdmVDbGFzcygnZXJyb3InKTtcbiAgICAgICAgJChvcHRpb25zLmNjX2V4cF9zZWxlY3RvciwgZWxlbWVudCkucmVtb3ZlQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICQob3B0aW9ucy5jY19jdnZfc2VsZWN0b3IsIGVsZW1lbnQpLnJlbW92ZUNsYXNzKCdlcnJvcicpO1xuICAgICAgICAkKG9wdGlvbnMuY2NfbnVtX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnZXJyb3InKTtcbiAgICAgICAgJChvcHRpb25zLmNjX2V4cF9zZWxlY3RvciwgZWxlbWVudCkucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICQob3B0aW9ucy5jY19jdnZfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdlcnJvcicpO1xuICAgICAgfVxuICAgIH0sIC8vIHN0cmlwZUVycm9yRGlzcGxheVxuXG4gICAgY3JlYXRlVG9rZW46IGZ1bmN0aW9uKGNhcmQpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHRoYXQuc3RyaXBlLmNyZWF0ZVRva2VuKGNhcmQpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgIGlmIChyZXN1bHQuZXJyb3IpIHtcbiAgICAgICAgICAvLyBTaG93IHRoZSBlcnJvcnMgb24gdGhlIGZvcm1cbiAgICAgICAgICB0aGF0LmJ1dHRvblN0YXR1cyhvcHRpb25zLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIGZhbHNlKTtcbiAgICAgICAgICB2YXIgZmllbGQgPSByZXN1bHQuZXJyb3IuZmllbGQgKyAnX2ZpZWxkX3NlbGVjdG9yJztcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9ICcnO1xuICAgICAgICAgIGlmICh0eXBlb2YgcmVzdWx0LmVycm9yLm1lc3NhZ2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICBtZXNzYWdlID0gcmVzdWx0LmVycm9yLm1lc3NhZ2U7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1lc3NhZ2UgPSByZXN1bHQuZXJyb3IubWVzc2FnZVswXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCQoZmllbGQpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICQodGhhdC5vcHRpb25zW2ZpZWxkXSwgZWxlbWVudCkuYWRkQ2xhc3MoJ2Vycm9yJyk7XG4gICAgICAgICAgICAkKHRoYXQub3B0aW9uc1tmaWVsZF0sIGVsZW1lbnQpLnByZXYoKS5hZGRDbGFzcygnZXJyb3InKTtcbiAgICAgICAgICAgICQodGhhdC5vcHRpb25zW2ZpZWxkXSwgZWxlbWVudCkuYWZ0ZXIoJzxzcGFuIGNsYXNzPVwiY2hlY2stZmllbGQgaW52YWxpZFwiPicgKyBtZXNzYWdlICsgJzwvc3Bhbj4nKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAocmVzdWx0LmVycm9yLmZpZWxkID09ICdjc3JmX3Rva2VuJykge1xuICAgICAgICAgICAgJCgnYnV0dG9uLmdpdmUnKS5iZWZvcmUoJzxwIGNsYXNzPVwiZXJyb3JcIj5Tb3JyeSwgdGhpcyBmb3JtIGhhZCBhIGJhY2stZW5kIGVycm9yIGFuZCB3YXMgdW5hYmxlIHRvIGNvbXBsZXRlIHlvdXIgZG9uYXRpb24uIFBsZWFzZSA8YSBocmVmPVwiI1wiIG9uY2xpY2s9XCJsb2NhdGlvbi5yZWxvYWQoKTsgcmV0dXJuIGZhbHNlO1wiPnJlbG9hZCB0aGUgcGFnZTwvYT4gYW5kIHRyeSBhZ2FpbiAod2Ugd2lsbCBwcmVzZXJ2ZSBhcyBtdWNoIG9mIHlvdXIgaW5mb3JtYXRpb24gYXMgcG9zc2libGUpLjwvcD4nKVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBTZW5kIHRoZSB0b2tlbiB0byB5b3VyIHNlcnZlclxuICAgICAgICAgIHRoYXQuc3RyaXBlVG9rZW5IYW5kbGVyKHJlc3VsdC50b2tlbiwgJ2NhcmQnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSwgLy8gY3JlYXRlVG9rZW5cblxuICAgIHN0cmlwZVRva2VuSGFuZGxlcjogZnVuY3Rpb24odG9rZW4sIHR5cGUpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIC8vIEluc2VydCB0aGUgdG9rZW4gSUQgaW50byB0aGUgZm9ybSBzbyBpdCBnZXRzIHN1Ym1pdHRlZCB0byB0aGUgc2VydmVyXG4gICAgICB2YXIgc3VwcG9ydGZvcm0gPSAkKHRoaXMub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3Rvcik7XG4gICAgICBpZiAoIHR5cGUgPT09ICdjYXJkJyApIHtcbiAgICAgICAgc3VwcG9ydGZvcm0uYXBwZW5kKCQoJzxpbnB1dCB0eXBlPVxcXCJoaWRkZW5cXFwiIG5hbWU9XFxcInN0cmlwZVRva2VuXFxcIj4nKS52YWwodG9rZW4uaWQpKTtcbiAgICAgICAgaWYgKCQoJ2lucHV0W25hbWU9XCJwYXltZW50X3R5cGVcIl0nKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgJCgnaW5wdXRbbmFtZT1cInBheW1lbnRfdHlwZVwiXScpLnZhbCh0b2tlbi5jYXJkLmJyYW5kKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdXBwb3J0Zm9ybS5hcHBlbmQoJCgnPGlucHV0IHR5cGU9XFxcImhpZGRlblxcXCIgbmFtZT1cXFwicGF5bWVudF90eXBlXFxcIiAvPicpLnZhbCh0b2tlbi5jYXJkLmJyYW5kKSk7ICBcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICggdHlwZSA9PT0gJ2FjaCcgKSB7XG4gICAgICAgIGlmICgkKCdpbnB1dFtuYW1lPVwicGF5bWVudF90eXBlXCJdJykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICQoJ2lucHV0W25hbWU9XCJwYXltZW50X3R5cGVcIl0nKS52YWwodHlwZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3VwcG9ydGZvcm0uYXBwZW5kKCQoJzxpbnB1dCB0eXBlPVxcXCJoaWRkZW5cXFwiIG5hbWU9XFxcInBheW1lbnRfdHlwZVxcXCIgLz4nKS52YWwodHlwZSkpOyAgXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gU3VibWl0IHRoZSBmb3JtXG4gICAgICAvL3N1cHBvcnRmb3JtLnN1Ym1pdCgpO1xuICAgICAgJC5hamF4KHtcbiAgICAgICAgdXJsOicvZ2l2ZS8nLFxuICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgIGRhdGE6ICQoc3VwcG9ydGZvcm0pLnNlcmlhbGl6ZSgpLFxuICAgICAgICB0eXBlOiAnUE9TVCdcbiAgICAgIH0pXG4gICAgICAuZG9uZShmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICBpZiAodHlwZW9mIHJlc3BvbnNlLmVycm9ycyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAvLyBkbyBub3Qgc3VibWl0LiB0aGVyZSBpcyBhbiBlcnJvci5cbiAgICAgICAgICB0aGF0LmJ1dHRvblN0YXR1cyh0aGF0Lm9wdGlvbnMsICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKSwgZmFsc2UpO1xuICAgICAgICAgIC8vIGFkZCBzb21lIGVycm9yIG1lc3NhZ2VzIGFuZCBzdHlsZXNcbiAgICAgICAgICAkLmVhY2gocmVzcG9uc2UuZXJyb3JzLCBmdW5jdGlvbiggaW5kZXgsIGVycm9yICkge1xuICAgICAgICAgICAgdmFyIGZpZWxkID0gZXJyb3IuZmllbGQgKyAnX2ZpZWxkX3NlbGVjdG9yJztcbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gJyc7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGVycm9yLm1lc3NhZ2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgIG1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbWVzc2FnZSA9IGVycm9yLm1lc3NhZ2VbMF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoJChmaWVsZCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAkKG9wdGlvbnNbZmllbGRdKS5hZGRDbGFzcygnZXJyb3InKTtcbiAgICAgICAgICAgICAgJChvcHRpb25zW2ZpZWxkXSkucHJldigpLmFkZENsYXNzKCdlcnJvcicpO1xuICAgICAgICAgICAgICAkKG9wdGlvbnNbZmllbGRdKS5hZnRlcignPHNwYW4gY2xhc3M9XCJjaGVjay1maWVsZCBpbnZhbGlkXCI+JyArIG1lc3NhZ2UgKyAnPC9zcGFuPicpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAodHlwZW9mIGVycm9yICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICBpZiAoZXJyb3IuY29kZSA9PSAnaW52YWxpZF9udW1iZXInIHx8IGVycm9yLmNvZGUgPT0gJ2luY29ycmVjdF9udW1iZXInIHx8IGVycm9yLmNvZGUgPT0gJ2NhcmRfZGVjbGluZWQnIHx8IGVycm9yLmNvZGUgPT0gJ3Byb2Nlc3NpbmdfZXJyb3InKSB7XG4gICAgICAgICAgICAgICAgLy8gZXJyb3IgaGFuZGxpbmdcbiAgICAgICAgICAgICAgICB0aGF0LnN0cmlwZUVycm9yRGlzcGxheShyZXNwb25zZS5lcnJvcnMsICQodGhhdC5vcHRpb25zLmNjX251bV9zZWxlY3RvciksIHRoYXQuZWxlbWVudCwgdGhhdC5vcHRpb25zICk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAoZXJyb3IuY29kZSA9PSAnaW52YWxpZF9leHBpcnlfbW9udGgnIHx8IGVycm9yLmNvZGUgPT0gJ2ludmFsaWRfZXhwaXJ5X3llYXInIHx8IGVycm9yLmNvZGUgPT0gJ2V4cGlyZWRfY2FyZCcpIHtcbiAgICAgICAgICAgICAgICAvLyBlcnJvciBoYW5kbGluZ1xuICAgICAgICAgICAgICAgIHRoYXQuc3RyaXBlRXJyb3JEaXNwbGF5KHJlc3BvbnNlLmVycm9ycywgJCh0aGF0Lm9wdGlvbnMuY2NfZXhwX3NlbGVjdG9yKSwgdGhhdC5lbGVtZW50LCB0aGF0Lm9wdGlvbnMgKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmIChlcnJvci5jb2RlID09ICdpbnZhbGlkX2N2YycgfHwgZXJyb3IuY29kZSA9PSAnaW5jb3JyZWN0X2N2YycpIHtcbiAgICAgICAgICAgICAgICAvLyBlcnJvciBoYW5kbGluZ1xuICAgICAgICAgICAgICAgIHRoYXQuc3RyaXBlRXJyb3JEaXNwbGF5KHJlc3BvbnNlLmVycm9ycywgJCh0aGF0Lm9wdGlvbnMuY2NfY3Z2X3NlbGVjdG9yKSwgdGhhdC5lbGVtZW50LCB0aGF0Lm9wdGlvbnMgKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmIChlcnJvci50eXBlID09ICdpbnZhbGlkX3JlcXVlc3RfZXJyb3InKSB7XG4gICAgICAgICAgICAgICAgJCgnYnV0dG9uLmdpdmUnKS5iZWZvcmUoJzxwIGNsYXNzPVwiZXJyb3JcIj4nICsgZXJyb3IubWVzc2FnZSArICc8L3A+JylcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgcmVzcG9uc2UuZXJyb3JzWzBdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICB2YXIgZmllbGQgPSByZXNwb25zZS5lcnJvcnNbMF0uZmllbGQgKyAnX2ZpZWxkX3NlbGVjdG9yJztcbiAgICAgICAgICAgICAgaWYgKCQoZmllbGQpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgICAgICAgICBzY3JvbGxUb3A6ICQob3B0aW9uc1tmaWVsZF0pLnBhcmVudCgpLm9mZnNldCgpLnRvcFxuICAgICAgICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdXBwb3J0Zm9ybS5nZXQoMCkuc3VibWl0KCk7IC8vIGNvbnRpbnVlIHN1Ym1pdHRpbmcgdGhlIGZvcm1cbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5lcnJvcihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICB0aGF0LmJ1dHRvblN0YXR1cyh0aGF0Lm9wdGlvbnMsICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKSwgZmFsc2UpO1xuICAgICAgfSk7XG5cbiAgICB9LFxuXG4gICAgc2hvd05ld3NsZXR0ZXJTZXR0aW5nczogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgaWYgKCQob3B0aW9ucy5uZXdzbGV0dGVyX2dyb3VwX3NlbGVjdG9yKS5sZW5ndGggPiAwICYmIHR5cGVvZiAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB2YXIgZ2V0X2RhdGEgPSB7XG4gICAgICAgICAgZW1haWw6ICQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKClcbiAgICAgICAgfTtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgIHVybDogb3B0aW9ucy5taW5ucG9zdF9yb290ICsgJy93cC1qc29uL21pbm5wb3N0LWFwaS92Mi9tYWlsY2hpbXAvdXNlcicsXG4gICAgICAgICAgZGF0YTogZ2V0X2RhdGFcbiAgICAgICAgfSkuZG9uZShmdW5jdGlvbiggcmVzdWx0ICkge1xuICAgICAgICAgIGlmICggdHlwZW9mIHJlc3VsdC5tYWlsY2hpbXBfc3RhdHVzICE9PSAndW5kZWZpbmVkJyApIHtcbiAgICAgICAgICAgICQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkuYWZ0ZXIoJzxpbnB1dCBuYW1lPVwibWFpbGNoaW1wX3N0YXR1c1wiIHR5cGU9XCJoaWRkZW5cIiB2YWx1ZT1cIicgKyByZXN1bHQubWFpbGNoaW1wX3N0YXR1cyArICdcIj4nKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCB0eXBlb2YgcmVzdWx0Lm1haWxjaGltcF91c2VyX2lkICE9PSAndW5kZWZpbmVkJyApIHtcbiAgICAgICAgICAgICQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkuYWZ0ZXIoJzxpbnB1dCBuYW1lPVwibWFpbGNoaW1wX3VzZXJfaWRcIiB0eXBlPVwiaGlkZGVuXCIgdmFsdWU9XCInICsgcmVzdWx0Lm1haWxjaGltcF91c2VyX2lkICsgJ1wiPicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAocmVzdWx0Lm1haWxjaGltcF9zdGF0dXMgPT09ICdzdWJzY3JpYmVkJykge1xuICAgICAgICAgICAgLy8gdXNlciBjcmVhdGVkIC0gc2hvdyBhIHN1Y2Nlc3MgbWVzc2FnZVxuICAgICAgICAgICAgJCgnLmNvbmZpcm0taW5zdHJ1Y3Rpb25zJykudGV4dCgkKCcuY29uZmlybS1pbnN0cnVjdGlvbnMnKS5hdHRyKCdkYXRhLWtub3duLXVzZXInKSk7XG4gICAgICAgICAgICB2YXIgZ3JvdXBzID0gcmVzdWx0Lmdyb3VwcztcbiAgICAgICAgICAgICQuZWFjaChncm91cHMsIGZ1bmN0aW9uKCBpbmRleCwgdmFsdWUgKSB7XG4gICAgICAgICAgICAgIGlmICggdmFsdWUgPT09IHRydWUgKSB7XG4gICAgICAgICAgICAgICAgJCgnOmNoZWNrYm94W25hbWU9XCInICsgaW5kZXggKyAnXCJdJykucHJvcCgnY2hlY2tlZCcsdHJ1ZSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJCgnOmNoZWNrYm94W25hbWU9XCInICsgaW5kZXggKyAnXCJdJykucHJvcCgnY2hlY2tlZCcsZmFsc2UpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgfSwgLy8gc2hvd05ld3NsZXR0ZXJTZXR0aW5nc1xuXG4gICAgY29uZmlybU1lc3NhZ2VTdWJtaXQ6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcblxuICAgICAgLy92YXIgZXhpc3RpbmdfbmV3c2xldHRlcl9zZXR0aW5ncyA9IHRoaXMub3B0aW9ucy5leGlzdGluZ19uZXdzbGV0dGVyX3NldHRpbmdzO1xuICAgICAgdmFyIGV4aXN0aW5nX25ld3NsZXR0ZXJfc2V0dGluZ3MgPSAkKCcuc3VwcG9ydC1uZXdzbGV0dGVyIDppbnB1dCcpLnNlcmlhbGl6ZSgpO1xuICAgICAgLy90aGlzLmRlYnVnKGV4aXN0aW5nX25ld3NsZXR0ZXJfc2V0dGluZ3MpO1xuXG4gICAgICAkKG9wdGlvbnMuY29uZmlybV9mb3JtX3NlbGVjdG9yKS5zdWJtaXQoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB2YXIgY29uZmlybWZvcm0gPSAkKG9wdGlvbnMuY29uZmlybV9mb3JtX3NlbGVjdG9yKTtcbiAgICAgICAgLy8gc3VibWl0IHNldHRpbmdzIHRvIG1haWxjaGltcFxuICAgICAgICAvLyBuZWVkIHRvIGdldCB1c2VyIGluZm8gb24gYSBoaWRkZW4gZmllbGQgaGVyZVxuXG4gICAgICAgIHZhciBuZXdzbGV0dGVyX2dyb3VwcyA9ICQob3B0aW9ucy5uZXdzbGV0dGVyX2dyb3VwX3NlbGVjdG9yICsgJzpjaGVja2VkJyk7XG4gICAgICAgIHZhciBtZXNzYWdlX2dyb3VwcyA9ICQob3B0aW9ucy5tZXNzYWdlX2dyb3VwX3NlbGVjdG9yICsgJzpjaGVja2VkJyk7XG4gICAgICAgIHZhciBuZXdfbmV3c2xldHRlcl9zZXR0aW5ncyA9ICQoJy5zdXBwb3J0LW5ld3NsZXR0ZXIgOmlucHV0OmNoZWNrZWQnKS5zZXJpYWxpemUoKTtcblxuICAgICAgICBpZiAoKGV4aXN0aW5nX25ld3NsZXR0ZXJfc2V0dGluZ3MgIT09IG5ld19uZXdzbGV0dGVyX3NldHRpbmdzKSAmJiAodHlwZW9mIG5ld3NsZXR0ZXJfZ3JvdXBzICE9PSAndW5kZWZpbmVkJyB8fCB0eXBlb2YgbWVzc2FnZV9ncm91cHMgIT09ICd1bmRlZmluZWQnKSkge1xuICAgICAgICAgIC8vYWRkIG91ciBvd24gYWpheCBjaGVjayBhcyBYLVJlcXVlc3RlZC1XaXRoIGlzIG5vdCBhbHdheXMgcmVsaWFibGVcbiAgICAgICAgICAvL2FqYXhfZm9ybV9kYXRhID0gbmV3X25ld3NsZXR0ZXJfc2V0dGluZ3MgKyAnJmFqYXhyZXF1ZXN0PXRydWUmc3Vic2NyaWJlJztcblxuICAgICAgICAgIHZhciBwb3N0X2RhdGEgPSB7XG4gICAgICAgICAgICBlbWFpbDogJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICAgIGZpcnN0X25hbWU6ICQob3B0aW9ucy5maXJzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICAgIGxhc3RfbmFtZTogJChvcHRpb25zLmxhc3RfbmFtZV9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgICBncm91cHNfc3VibWl0dGVkOiBbXVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICBwb3N0X2RhdGEuZ3JvdXBzX2F2YWlsYWJsZSA9ICdhbGwnO1xuXG4gICAgICAgICAgaWYgKCAkKCdpbnB1dFtuYW1lPVwibWFpbGNoaW1wX3N0YXR1c1wiXScpLmxlbmd0aCA+IDAgKSB7XG4gICAgICAgICAgICBwb3N0X2RhdGEubWFpbGNoaW1wX3N0YXR1cyA9ICQoJ2lucHV0W25hbWU9XCJtYWlsY2hpbXBfc3RhdHVzXCJdJykudmFsKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCAkKCdpbnB1dFtuYW1lPVwibWFpbGNoaW1wX3VzZXJfaWRcIl0nKS5sZW5ndGggPiAwICkge1xuICAgICAgICAgICAgcG9zdF9kYXRhLm1haWxjaGltcF91c2VyX2lkID0gJCgnaW5wdXRbbmFtZT1cIm1haWxjaGltcF91c2VyX2lkXCJdJykudmFsKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHR5cGVvZiBuZXdzbGV0dGVyX2dyb3VwcyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICQuZWFjaChuZXdzbGV0dGVyX2dyb3VwcywgZnVuY3Rpb24oaW5kZXgsIHZhbHVlKSB7XG4gICAgICAgICAgICAgIHZhciBncm91cCA9ICQodGhpcykuYXR0cignbmFtZScpO1xuICAgICAgICAgICAgICBwb3N0X2RhdGEuZ3JvdXBzX3N1Ym1pdHRlZC5wdXNoKGdyb3VwKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0eXBlb2YgbWVzc2FnZV9ncm91cHMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAkLmVhY2gobWVzc2FnZV9ncm91cHMsIGZ1bmN0aW9uKGluZGV4LCB2YWx1ZSkge1xuICAgICAgICAgICAgICB2YXIgZ3JvdXAgPSAkKHRoaXMpLmF0dHIoJ25hbWUnKTtcbiAgICAgICAgICAgICAgcG9zdF9kYXRhLmdyb3Vwc19zdWJtaXR0ZWQucHVzaChncm91cCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBvcHRpb25zLm1pbm5wb3N0X3Jvb3QgKyAnL3dwLWpzb24vbWlubnBvc3QtYXBpL3YyL21haWxjaGltcC91c2VyJyxcbiAgICAgICAgICAgIHR5cGU6ICdwb3N0JyxcbiAgICAgICAgICAgIGRhdGFUeXBlIDogJ2pzb24nLFxuICAgICAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04JyxcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHBvc3RfZGF0YSlcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5kb25lKGZ1bmN0aW9uKHJlc3BvbnNlKSB7IC8vIHJlc3BvbnNlIGZyb20gdGhlIFBIUCBhY3Rpb25cbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gJyc7XG4gICAgICAgICAgICBpZiAoIHJlc3BvbnNlLnN1Y2Nlc3MgPT09IHRydWUgKSB7XG4gICAgICAgICAgICAgIC8qc3dpdGNoIChyZXNwb25zZS5kYXRhLnVzZXJfc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnZXhpc3RpbmcnOlxuICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9ICdUaGFua3MgZm9yIHVwZGF0aW5nIHlvdXIgZW1haWwgcHJlZmVyZW5jZXMuIFRoZXkgd2lsbCBnbyBpbnRvIGVmZmVjdCBpbW1lZGlhdGVseS4nO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbmV3JzpcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnV2UgaGF2ZSBhZGRlZCB5b3UgdG8gdGhlIE1pbm5Qb3N0IG1haWxpbmcgbGlzdC4nO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncGVuZGluZyc6XG4gICAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ1dlIGhhdmUgYWRkZWQgeW91IHRvIHRoZSBNaW5uUG9zdCBtYWlsaW5nIGxpc3QuIFlvdSB3aWxsIG5lZWQgdG8gY2xpY2sgdGhlIGNvbmZpcm1hdGlvbiBsaW5rIGluIHRoZSBlbWFpbCB3ZSBzZW50IHRvIGJlZ2luIHJlY2VpdmluZyBtZXNzYWdlcy4nO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH0qL1xuICAgICAgICAgICAgICAvL2NvbmZpcm1mb3JtLmdldCgwKS5zdWJtaXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbmZpcm1mb3JtLmdldCgwKS5zdWJtaXQoKTtcbiAgICAgICAgICAgIC8vJCgnLm0taG9sZC1tZXNzYWdlJykuaHRtbCgnPGRpdiBjbGFzcz1cIm0tZm9ybS1tZXNzYWdlIG0tZm9ybS1tZXNzYWdlLWluZm9cIj4nICsgbWVzc2FnZSArICc8L2Rpdj4nKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAvLyB3ZSBzaG91bGQgcHV0IGFuIGFjdHVhbCBlcnJvciBtZXNzYWdlIGhlcmUgc29tZWRheSwgcHJvYmFibHlcbiAgICAgICAgICAgIC8vJCgnLm0taG9sZC1tZXNzYWdlJykuaHRtbCgnPGRpdiBjbGFzcz1cIm0tZm9ybS1tZXNzYWdlIG0tZm9ybS1tZXNzYWdlLWluZm9cIj5BbiBlcnJvciBoYXMgb2NjdXJlZC4gUGxlYXNlIHRyeSBhZ2Fpbi48L2Rpdj4nKTtcbiAgICAgICAgICAgIGNvbmZpcm1mb3JtLmdldCgwKS5zdWJtaXQoKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICB9IGVsc2UgeyAvLyBlbmQgcGFydCB3aGVyZSBzZXR0aW5ncyBjaGFuZ2VkXG4gICAgICAgICAgY29uZmlybWZvcm0uZ2V0KDApLnN1Ym1pdCgpO1xuICAgICAgICB9XG5cbiAgICAgIH0pO1xuICAgICAgLy9yZXR1cm4gZmFsc2U7XG4gICAgfSwgLy8gY29uZmlybU1lc3NhZ2VTdWJtaXRcblxuICB9OyAvLyBwbHVnaW4ucHJvdG90eXBlXG5cbiAgLy8gQSByZWFsbHkgbGlnaHR3ZWlnaHQgcGx1Z2luIHdyYXBwZXIgYXJvdW5kIHRoZSBjb25zdHJ1Y3RvcixcbiAgLy8gcHJldmVudGluZyBhZ2FpbnN0IG11bHRpcGxlIGluc3RhbnRpYXRpb25zXG4gICQuZm5bcGx1Z2luTmFtZV0gPSBmdW5jdGlvbiAoIG9wdGlvbnMgKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoISQuZGF0YSh0aGlzLCAncGx1Z2luXycgKyBwbHVnaW5OYW1lKSkge1xuICAgICAgICAkLmRhdGEodGhpcywgJ3BsdWdpbl8nICsgcGx1Z2luTmFtZSwgbmV3IFBsdWdpbiggdGhpcywgb3B0aW9ucyApKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxufSkoIGpRdWVyeSwgd2luZG93LCBkb2N1bWVudCApOyJdfQ==
