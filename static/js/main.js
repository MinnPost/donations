(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}(g.payment || (g.payment = {})).js = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var QJ, rreturn, rtrim;

QJ = function(selector) {
  if (QJ.isDOMElement(selector)) {
    return selector;
  }
  return document.querySelectorAll(selector);
};

QJ.isDOMElement = function(el) {
  return el && (el.nodeName != null);
};

rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

QJ.trim = function(text) {
  if (text === null) {
    return "";
  } else {
    return (text + "").replace(rtrim, "");
  }
};

rreturn = /\r/g;

QJ.val = function(el, val) {
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

QJ.preventDefault = function(eventObject) {
  if (typeof eventObject.preventDefault === "function") {
    eventObject.preventDefault();
    return;
  }
  eventObject.returnValue = false;
  return false;
};

QJ.normalizeEvent = function(e) {
  var original;
  original = e;
  e = {
    which: original.which != null ? original.which : void 0,
    target: original.target || original.srcElement,
    preventDefault: function() {
      return QJ.preventDefault(original);
    },
    originalEvent: original,
    data: original.data || original.detail
  };
  if (e.which == null) {
    e.which = original.charCode != null ? original.charCode : original.keyCode;
  }
  return e;
};

QJ.on = function(element, eventName, callback) {
  var el, i, j, len, len1, multEventName, originalCallback, ref;
  if (element.length) {
    for (i = 0, len = element.length; i < len; i++) {
      el = element[i];
      QJ.on(el, eventName, callback);
    }
    return;
  }
  if (eventName.match(" ")) {
    ref = eventName.split(" ");
    for (j = 0, len1 = ref.length; j < len1; j++) {
      multEventName = ref[j];
      QJ.on(element, multEventName, callback);
    }
    return;
  }
  originalCallback = callback;
  callback = function(e) {
    e = QJ.normalizeEvent(e);
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

QJ.addClass = function(el, className) {
  var e;
  if (el.length) {
    return (function() {
      var i, len, results;
      results = [];
      for (i = 0, len = el.length; i < len; i++) {
        e = el[i];
        results.push(QJ.addClass(e, className));
      }
      return results;
    })();
  }
  if (el.classList) {
    return el.classList.add(className);
  } else {
    return el.className += ' ' + className;
  }
};

QJ.hasClass = function(el, className) {
  var e, hasClass, i, len;
  if (el.length) {
    hasClass = true;
    for (i = 0, len = el.length; i < len; i++) {
      e = el[i];
      hasClass = hasClass && QJ.hasClass(e, className);
    }
    return hasClass;
  }
  if (el.classList) {
    return el.classList.contains(className);
  } else {
    return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
  }
};

QJ.removeClass = function(el, className) {
  var cls, e, i, len, ref, results;
  if (el.length) {
    return (function() {
      var i, len, results;
      results = [];
      for (i = 0, len = el.length; i < len; i++) {
        e = el[i];
        results.push(QJ.removeClass(e, className));
      }
      return results;
    })();
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

QJ.toggleClass = function(el, className, bool) {
  var e;
  if (el.length) {
    return (function() {
      var i, len, results;
      results = [];
      for (i = 0, len = el.length; i < len; i++) {
        e = el[i];
        results.push(QJ.toggleClass(e, className, bool));
      }
      return results;
    })();
  }
  if (bool) {
    if (!QJ.hasClass(el, className)) {
      return QJ.addClass(el, className);
    }
  } else {
    return QJ.removeClass(el, className);
  }
};

QJ.append = function(el, toAppend) {
  var e;
  if (el.length) {
    return (function() {
      var i, len, results;
      results = [];
      for (i = 0, len = el.length; i < len; i++) {
        e = el[i];
        results.push(QJ.append(e, toAppend));
      }
      return results;
    })();
  }
  return el.insertAdjacentHTML('beforeend', toAppend);
};

QJ.find = function(el, selector) {
  if (el instanceof NodeList || el instanceof Array) {
    el = el[0];
  }
  return el.querySelectorAll(selector);
};

QJ.trigger = function(el, name, data) {
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

module.exports = QJ;


},{}],2:[function(require,module,exports){
(function (global){
var Payment, QJ, cardFromNumber, cardFromType, cards, defaultFormat, formatBackCardNumber, formatBackExpiry, formatCardNumber, formatExpiry, formatForwardExpiry, formatForwardSlash, formatMonthExpiry, hasTextSelected, luhnCheck, reFormatCardNumber, restrictCVC, restrictCardNumber, restrictCombinedExpiry, restrictExpiry, restrictMonthExpiry, restrictNumeric, restrictYearExpiry, setCardType,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

QJ = require('qj/src/qj.coffee');

defaultFormat = /(\d{1,4})/g;

cards = [
  {
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
  }
];

cardFromNumber = function(num) {
  var card, i, len;
  num = (num + '').replace(/\D/g, '');
  for (i = 0, len = cards.length; i < len; i++) {
    card = cards[i];
    if (card.pattern.test(num)) {
      return card;
    }
  }
};

cardFromType = function(type) {
  var card, i, len;
  for (i = 0, len = cards.length; i < len; i++) {
    card = cards[i];
    if (card.type === type) {
      return card;
    }
  }
};

luhnCheck = function(num) {
  var digit, digits, i, len, odd, sum;
  odd = true;
  sum = 0;
  digits = (num + '').split('').reverse();
  for (i = 0, len = digits.length; i < len; i++) {
    digit = digits[i];
    digit = parseInt(digit, 10);
    if ((odd = !odd)) {
      digit *= 2;
    }
    if (digit > 9) {
      digit -= 9;
    }
    sum += digit;
  }
  return sum % 10 === 0;
};

hasTextSelected = function(target) {
  var ref;
  if ((target.selectionStart != null) && target.selectionStart !== target.selectionEnd) {
    return true;
  }
  if ((typeof document !== "undefined" && document !== null ? (ref = document.selection) != null ? ref.createRange : void 0 : void 0) != null) {
    if (document.selection.createRange().text) {
      return true;
    }
  }
  return false;
};

reFormatCardNumber = function(e) {
  return setTimeout((function(_this) {
    return function() {
      var target, value;
      target = e.target;
      value = QJ.val(target);
      value = Payment.fns.formatCardNumber(value);
      return QJ.val(target, value);
    };
  })(this));
};

formatCardNumber = function(e) {
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
  if ((target.selectionStart != null) && target.selectionStart !== value.length) {
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

formatBackCardNumber = function(e) {
  var target, value;
  target = e.target;
  value = QJ.val(target);
  if (e.meta) {
    return;
  }
  if (e.which !== 8) {
    return;
  }
  if ((target.selectionStart != null) && target.selectionStart !== value.length) {
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

formatExpiry = function(e) {
  var digit, target, val;
  digit = String.fromCharCode(e.which);
  if (!/^\d+$/.test(digit)) {
    return;
  }
  target = e.target;
  val = QJ.val(target) + digit;
  if (/^\d$/.test(val) && (val !== '0' && val !== '1')) {
    e.preventDefault();
    return QJ.val(target, "0" + val + " / ");
  } else if (/^\d\d$/.test(val)) {
    e.preventDefault();
    return QJ.val(target, val + " / ");
  }
};

formatMonthExpiry = function(e) {
  var digit, target, val;
  digit = String.fromCharCode(e.which);
  if (!/^\d+$/.test(digit)) {
    return;
  }
  target = e.target;
  val = QJ.val(target) + digit;
  if (/^\d$/.test(val) && (val !== '0' && val !== '1')) {
    e.preventDefault();
    return QJ.val(target, "0" + val);
  } else if (/^\d\d$/.test(val)) {
    e.preventDefault();
    return QJ.val(target, "" + val);
  }
};

formatForwardExpiry = function(e) {
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

formatForwardSlash = function(e) {
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

formatBackExpiry = function(e) {
  var target, value;
  if (e.metaKey) {
    return;
  }
  target = e.target;
  value = QJ.val(target);
  if (e.which !== 8) {
    return;
  }
  if ((target.selectionStart != null) && target.selectionStart !== value.length) {
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

restrictNumeric = function(e) {
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

restrictCardNumber = function(e) {
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

restrictExpiry = function(e, length) {
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

restrictCombinedExpiry = function(e) {
  return restrictExpiry(e, 6);
};

restrictMonthExpiry = function(e) {
  return restrictExpiry(e, 2);
};

restrictYearExpiry = function(e) {
  return restrictExpiry(e, 4);
};

restrictCVC = function(e) {
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

setCardType = function(e) {
  var allTypes, card, cardType, target, val;
  target = e.target;
  val = QJ.val(target);
  cardType = Payment.fns.cardType(val) || 'unknown';
  if (!QJ.hasClass(target, cardType)) {
    allTypes = (function() {
      var i, len, results;
      results = [];
      for (i = 0, len = cards.length; i < len; i++) {
        card = cards[i];
        results.push(card.type);
      }
      return results;
    })();
    QJ.removeClass(target, 'unknown');
    QJ.removeClass(target, allTypes.join(' '));
    QJ.addClass(target, cardType);
    QJ.toggleClass(target, 'identified', cardType !== 'unknown');
    return QJ.trigger(target, 'payment.cardType', cardType);
  }
};

Payment = (function() {
  function Payment() {}

  Payment.fns = {
    cardExpiryVal: function(value) {
      var month, prefix, ref, year;
      value = value.replace(/\s/g, '');
      ref = value.split('/', 2), month = ref[0], year = ref[1];
      if ((year != null ? year.length : void 0) === 2 && /^\d+$/.test(year)) {
        prefix = (new Date).getFullYear();
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
    validateCardNumber: function(num) {
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
    validateCardExpiry: function(month, year) {
      var currentTime, expiry, prefix, ref;
      if (typeof month === 'object' && 'month' in month) {
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
        prefix = (new Date).getFullYear();
        prefix = prefix.toString().slice(0, 2);
        year = prefix + year;
      }
      expiry = new Date(year, month);
      currentTime = new Date;
      expiry.setMonth(expiry.getMonth() - 1);
      expiry.setMonth(expiry.getMonth() + 1, 1);
      return expiry > currentTime;
    },
    validateCardCVC: function(cvc, type) {
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
    cardType: function(num) {
      var ref;
      if (!num) {
        return null;
      }
      return ((ref = cardFromNumber(num)) != null ? ref.type : void 0) || null;
    },
    formatCardNumber: function(num) {
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

  Payment.restrictNumeric = function(el) {
    return QJ.on(el, 'keypress', restrictNumeric);
  };

  Payment.cardExpiryVal = function(el) {
    return Payment.fns.cardExpiryVal(QJ.val(el));
  };

  Payment.formatCardCVC = function(el) {
    Payment.restrictNumeric(el);
    QJ.on(el, 'keypress', restrictCVC);
    return el;
  };

  Payment.formatCardExpiry = function(el) {
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

  Payment.formatCardExpiryMultiple = function(month, year) {
    QJ.on(month, 'keypress', restrictMonthExpiry);
    QJ.on(month, 'keypress', formatMonthExpiry);
    return QJ.on(year, 'keypress', restrictYearExpiry);
  };

  Payment.formatCardNumber = function(el) {
    Payment.restrictNumeric(el);
    QJ.on(el, 'keypress', restrictCardNumber);
    QJ.on(el, 'keypress', formatCardNumber);
    QJ.on(el, 'keydown', formatBackCardNumber);
    QJ.on(el, 'keyup', setCardType);
    QJ.on(el, 'paste', reFormatCardNumber);
    return el;
  };

  Payment.getCardArray = function() {
    return cards;
  };

  Payment.setCardArray = function(cardArray) {
    cards = cardArray;
    return true;
  };

  Payment.addToCardArray = function(cardObject) {
    return cards.push(cardObject);
  };

  Payment.removeFromCardArray = function(type) {
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

})();

module.exports = Payment;

global.Payment = Payment;


}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"qj/src/qj.coffee":1}]},{},[2])(2)
});// MinnPost Giving plugin
// the semi-colon before function invocation is a safety net against concatenated
// scripts and/or other plugins which may not be closed properly.
;(function ( $, window, document, undefined ) {

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
    'debug' : false, // this can be set to true on page level options
    'stripe_publishable_key' : '',
    'minnpost_root' : 'https://www.minnpost.com',
    'donate_form_selector': '#donate',
    'review_step_selector' : '#panel--review',
    'donate_step_selector' : '#panel--pay',
    'confirm_form_selector' : '#confirm',
    'confirm_step_selector' : '#panel--confirmation',
    'active' : 'panel--review',
    'confirm' : 'panel--confirmation',
    'query' : 'step',
    'percentage' : 0.029,
    'fixed_amount' : 0.3,
    'pay_cc_processing_selector' : 'input[id="edit-pay-fees"]',
    'level_amount_selector' : '#panel--review .amount .level-amount',
    'original_amount_selector' : '#amount',
    'frequency_selector' : '.frequency',
    'full_amount_selector' : '.full-amount',
    'level_indicator_selector' : 'h2.level',
    'level_name_selector' : '.level-name',
    'review_benefits_selector' : '.review-benefits',
    'allow_upsell' : true,
    'upsell_btn_selector' : '.btn--upsell',
    'upsell_selector' : '.well--upsell',
    'upsell_amount_selector' : '.upsell-amount',
    'swag_selector' : '.swag',
    'separate_swag_selector' : 'fieldset.swag--separate',
    'separate_swag_redeem' : '.swag-redeem--separate',
    'atlantic_status' : 'input[name="swag_atlanticsubscription"]',
    'atlantic_existing' : '#atlantic_existing',
    'atlantic_selector' : '.form-item--atlantic_id',
    'name_selector' : '.form-item--display-name',
    'honor_selector' : '.honor',
    'notify_selector' : '.notify_someone',
    'notify_field_selector' : '.form-item--memory-notify',
    'anonymous_selector' : '#edit-anonymous',
    //'needs_shipping_selector' : '.swag--shipping',
    'shipping_address_selector' : '.form-item--shipping-address',
    'use_for_shipping_selector' : '#useforshipping',
    'email_field_selector' : '#edit-email',
    'password_field_selector' : '#password',
    'firstname_field_selector' : '#first_name',
    'lastname_field_selector' : '#last_name',
    'account_city_selector' : '#billing_city_geocode',
    'account_state_selector' : '#billing_state_geocode',
    'account_zip_selector' : '#billing_zip_geocode',
    'create_mp_selector' : '#creatempaccount',
    'password_selector' : '.form-item--password',
    'billing_selector' : 'fieldset.billing',
    'shipping_selector' : 'fieldset.shipping',
    'credit_card_fieldset' : '.credit-card-group',
    'cc_num_selector' : '#cc-number',
    'cc_exp_selector' : '#cc-exp',
    'cc_cvv_selector' : '#cc-cvc',
    'payment_button_selector' : '#submit',
    'confirm_button_selector' : '#finish',
    'newsletter_group_selector' : '[name="newsletters"]',
    'message_group_selector' : '[name="messages"]',
    'reason_field_selector' : '#reason_for_supporting',
    'share_reason_selector' : '#reason_shareable',
    'confirm_top_selector' : '.support--post-confirm',
    'existing_newsletter_settings' : '',
    'levels' : {
      1 : {
        'name' : 'bronze',
        'max' : 60
      },
      2 : {
        'name' : 'silver',
        'min' : 60,
        'max' : 120
      },
      3 : {
        'name' : 'gold',
        'min' : 120,
        'max' : 240
      },
      4 : {
        'name' : 'platinum',
        'min' : 240
      }
    },
    'upsell' : {
      'bronze' : true,
      'silver' : 9,
      'gold' : 19,
      'platinum' : false
    },

  }; // end defaults

  // The actual plugin constructor
  function Plugin( element, options ) {

    this.element = element;

    // jQuery has an extend method which merges the contents of two or
    // more objects, storing the result in the first object. The first object
    // is generally empty as we don't want to alter the default options for
    // future instances of the plugin
    this.options = $.extend( {}, defaults, options );

    this._defaults = defaults;
    this._name = pluginName;

    this.init();
  } // end constructor

  Plugin.prototype = {

    init: function(reset, amount) {

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
      this.options.original_amount = parseInt($(this.options.original_amount_selector, this.element).val());
      this.options.frequency = parseFloat($(this.options.frequency_selector, this.element).attr('data-year-freq'));
      this.options.processing_percent = parseFloat(this.options.percentage);
      this.options.fixed_fee = parseFloat(this.options.fixed_amount);
      
      this.options.new_amount = (this.options.original_amount + this.options.fixed_fee) / (1 - this.options.processing_percent);
      this.options.processing_fee = this.options.new_amount - this.options.original_amount;
      this.options.processing_fee = (Math.round(parseFloat(this.options.processing_fee)*Math.pow(10,2))/Math.pow(10,2)).toFixed(2)
      this.options.processing_fee_text = this.options.processing_fee;
      
      this.options.upsell_amount = parseFloat($(this.options.upsell_amount_selector, this.element).text());
      this.options.upsold = this.options.amount + this.options.upsell_amount;
      this.options.cardType = null;
      this.options.create_account = false;

      var button_text = $('button.give, input.give').text();
      this.options.button_text = button_text;
      $(window).unload(function() {
        $('button.give, input.give').removeProp('disabled');
        $('button.give, input.give').text(button_text);
      });

      Stripe.setPublishableKey(this.options.stripe_publishable_key);

      if (this.options.debug === true) {
        this.debug(this.options);
        // return;
      }

      // tab stuff
      var query_panel = this.qs[this.options.query];
      if (typeof query_panel === 'undefined') {
        query_panel = this.options.active;
      }

      // call functions

      // geocomplete addresses if library loaded successfully
      if (typeof google !== 'undefined' && google.hasOwnProperty('maps') && $('fieldset[data-geo="data-geo"]').length > 0) {
        // add combined address fields for geocomplete
        $('> div', this.options.billing_selector).not('.form-item--geocode').hide();
        $('> div', this.options.shipping_selector).not('.form-item--geocode').hide();
        $(this.options.billing_selector, this.element).prepend('<div class="form-item form-item--billing-address form-item--geocode"><label for="full_address" class="required">Billing Address: </label><input type="text" autocapitalize="off" autocorrect="off" name="full_address" id="full_address" class="geocomplete form-text" required placeholder=""></div>');
        this.getFullAddress($('#full_address'));
        $(this.options.shipping_selector, this.element).append('<div class="form-item form-item--shipping-address form-item--geocode"><label for="full_shipping_address">Shipping Address: </label><input type="text" autocapitalize="off" autocorrect="off" name="full_shipping_address" id="full_shipping_address" class="geocomplete form-text" placeholder=""></div>');
        this.getFullAddress($('#full_shipping_address'));
      } else {
        $('> div', this.options.billing_selector).not('.form-item--geocode').show();
        $('> div', this.options.shipping_selector).not('.form-item--geocode').show();
      }

      this.paymentPanels(query_panel); // tabs
      if ($(this.options.pay_cc_processing_selector).length > 0) {

        this.creditCardProcessingFees(this.options, reset); // processing fees
        $(this.options.review_step_selector).prepend('<input type="hidden" id="edit-pay-fees" name="pay_fees" value="0" />');
      }
      if ($(this.options.review_step_selector).length > 0) {
        this.options.level = this.checkLevel(this.element, this.options, 'name'); // check what level it is
        this.options.levelnum = this.checkLevel(this.element, this.options, 'num'); // check what level it is as a number
        this.honorOrMemory(this.element, this.options); // in honor or in memory of someone
        this.swag(this.element, this.options, false); // manage swag display
        this.upsell(this.element, this.options, this.options.amount, this.options.frequency); // upsell to next level
      }
      
      if ($(this.options.donate_step_selector).length > 0) {
        this.donateAnonymously(this.element, this.options); // anonymous
        this.shippingAddress(this.element, this.options); // shipping address
        this.allowMinnpostAccount(this.element, this.options, false); // option for creating minnpost account
        this.creditCardFields(this.element, this.options); // do stuff with the credit card fields
        this.validateAndSubmit(this.element, this.options); // validate and submit the form
      }

      if ($(this.options.confirm_step_selector).length > 0) {
        this.showNewsletterSettings(this.element, this.options);
        this.confirmMessageSubmit(this.element, this.options); // submit the stuff on the confirmation page
      }

    }, // init

    qs: (function(a) {
      if (a === '') {
        return {};
      }
      var b = {};
      for (var i = 0; i < a.length; ++i) {
        var p=a[i].split('=', 2);
        if (p.length === 1) {
          b[p[0]] = '';
        } else {
          b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, ' '));
        }
      }
      return b;
    })(window.location.search.substr(1).split('&')),

    debug: function(message) {
      if (this.options.debug === true) {
        if (typeof message !== 'object') {
          console.log(message);
        } else {
          console.dir(message);
        }
        console.dir(this);
      }
    }, // debug

    loadAnalytics: function(options) {
      var ga = window.gaq;
      var that = this;
      if (ga) { // is ga object present?
        this.debug('we have analytics');                  
        jQuery.each(options, function( key, value ) {
          that.debug('key is '+key+' and value is '+value);
          if (typeof value === 'object') {
            var onevent = options.on;
            var label = options.label($(this));
            var selector = value.selector;
            var category = value.category;
            var action = value.action;
            if (typeof value.on !== 'undefined') {
              onevent = value.on;
            }
            $(selector).on(onevent, function(event) {
              if (options.debug === true) {
                if (typeof value.label !== 'undefined') {
                  label = value.label($(this));
                } else {
                  label = options.label($(this));
                }
                this.debug('we did a '+onevent+' on the '+selector+' object which has the category '+category+' and action '+action+' and label '+label);
                ga('send', 'event', category, action, label);
                return false; // do i actually need this?
              }
            });
          }
        }); // for each option

        // Push data to google. do we still need this or is it replaced by line 275?
        /* $.when(gaq.push(args)).done(
        function () {
        // Redirect the location - delayed so that any other page functionality has time to run.
        setTimeout(function () {
        var href = that.prop('href');
        if (href && href.indexOf('#'') !== 0) {
        window.location = href;
        }
        }, 100);
        }
        );*/

      } else {
        this.debug('Google Analaytics _gaq is not defined');
      }

    }, // loadAnalytics

    getQueryStrings: function(link) {
      if (typeof link === 'undefined' || link === '') {
        return {};
      } else {
        link = '?' + link.split('?')[1];
        link = link.substr(1).split('&');
      }
      var b = {};
      for (var i = 0; i < link.length; ++i) {
        var p=link[i].split('=', 2);
        if (p.length === 1) {
          b[p[0]] = '';
        } else {
          b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, ' '));
        }
      }
      return b;
    }, // getQueryStrings

    getFullAddress: function(selector) {
      var that = this;
      var autocomplete = new google.maps.places.Autocomplete(selector[0], {});
            google.maps.event.addListener(autocomplete, 'place_changed', function() {
                var place = autocomplete.getPlace();
                var address = {};
        // Create a simplified version of the address components.
        $.each(place.address_components, function(index, object){
          var name = object.types[0];
          $.each(object.types, function(index, name) {
            address[name] = object.long_name;
            address[name + "_short"] = object.short_name;
          });
        });
                var fieldset = $(selector).closest('fieldset[data-geo="data-geo"]');
                var prefix = $(fieldset).prop('class');
                /*$(fieldset).append('<input type="hidden" name="' + prefix + '_street" value="' + address.street_number + ' ' + address.route_short + '" />');
                $(fieldset).append('<input type="hidden" name="' + prefix + '_city" value="' + address.locality + '" />');
                $(fieldset).append('<input type="hidden" name="' + prefix + '_state" value="' + address.administrative_area_level_1_short + '" />');
                $(fieldset).append('<input type="hidden" name="' + prefix + '_zip" value="' + address.postal_code + '" />');
                $(fieldset).append('<input type="hidden" name="' + prefix + '_country" value="' + address.country_short + '" />');*/
                //$(fieldset).find('input[data-geo-value="address"]').val(address.street_number + ' ' + address.route_short);

                $('#' + prefix + '_street_geocode').val(address.street_number + ' ' + address.route_short);
                $('#' + prefix + '_city_geocode').val(address.locality);
                $('#' + prefix + '_state_geocode').val(address.administrative_area_level_1_short);
                $('#' + prefix + '_zip_geocode').val(address.postal_code);
                $('#' + prefix + '_country_geocode').val(address.country_short);
            });
    }, // getFullAddress

    paymentPanels: function(active) {
      var that = this;
      // make some tabs for form
      $('.panel').hide();
      // activate the tabs
      if ($('.progress--donation li .active').length == 0) {
        $('#' + active).fadeIn();
        $('.progress--donation li.' + active + ' a').addClass('active');
      } else {
        active = $('.progress--donation li .active').parent().prop('class');
        $('#' + active).fadeIn();
      }
      $('.progress--donation li a, a.btn.btn--next').click(function(event) {
        event.preventDefault();
        $('.progress--donation li a').removeClass('active');
        var link = $(this).prop('href');
        var query = that.getQueryStrings(link);
        query = query['step'];
        $('.progress--donation li.' + query + ' a').addClass('active');
        that.paymentPanels(query);    
      });
    }, // paymentPanels

    creditCardProcessingFees: function(options, reset) {
      var full_amount;
      var that = this;
      var remove = false;
      $(this.options.pay_cc_processing_selector).parent().html('<a href="#" class="add-credit-card-processing">Add $<span class="processing-amount"></span></a> <span class="processing-explain">to each transaction to cover MinnPost\'s credit card fees?</span>');      
      $('.processing-amount').text(options.processing_fee_text);
      if (this.options.original_amount != this.options.amount) {
        $('.add-credit-card-processing').text('Remove $' + options.processing_fee_text);
        $('#edit-pay-fees').val(1);
        remove = true;
        $('.processing-explain').hide();
      }
      if (reset === true) {
        remove = false;
        full_amount = that.options.original_amount;
        $('.add-credit-card-processing').text('Add $' + that.options.processing_fee_text);
        $('#edit-pay-fees').val(0);
        $('.processing-explain').show();
        //$('#amount').val(full_amount);
      }
      $('.add-credit-card-processing').click(function(event) {
        $('.amount .level-amount').addClass('full-amount');
        if (!remove) {
          remove = true;
          full_amount = that.options.new_amount;
          $('.add-credit-card-processing').text('Remove $' + options.processing_fee_text);
          $('#edit-pay-fees').val(1);
          $('.processing-explain').hide();
        } else {
          remove = false;
          full_amount = that.options.original_amount;
          $('.add-credit-card-processing').text('Add $' + options.processing_fee_text);
          $('#edit-pay-fees').val(0);
          $('.processing-explain').show();
        }
        $('.add-credit-card-processing').toggleClass('remove');
        $(options.full_amount_selector).text(parseFloat(full_amount).toFixed(2));
        //$('#amount').val(parseFloat(full_amount).toFixed(2));
        event.stopPropagation();
        event.preventDefault();
      });
    }, // creditCardProcessingFees

    donateAnonymously: function(element, options) {
      if ($(options.anonymous_selector, element).is(':checked')) {
        $(options.name_selector + ' div:first', element).hide();
      } else {
        $(options.name_selector + ' div:first', element).show();
      }

      $(options.anonymous_selector, element).change(function() {
        if ($(this).is(':checked')) {
          $(options.name_selector + ' div:first', element).hide();
        } else {
          $(options.name_selector + ' div:first', element).show();
        }
      });
    }, // donateAnonymously

    checkLevel: function(element, options, returnvalue) {
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
      
      $.each(options.levels, function(index, value) {
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
      $(options.level_indicator_selector, element).prop('class', levelclass);
      $(options.level_name_selector).text(level.charAt(0).toUpperCase() + level.slice(1));

      var review_level_benefits = this.getQueryStrings($(options.review_benefits_selector, element).prop('href'));
      review_level_benefits = review_level_benefits['level'];
      
      var link = $(options.review_benefits_selector, element).prop('href');
      link = link.replace(review_level_benefits, level);
      $(options.review_benefits_selector).prop('href', link);
      if (returnvalue === 'name') {
        return level;
      } else if (returnvalue === 'num') {
        return levelnum;  
      }
    }, // checkLevel

    upsell: function(element, options, amount, frequency) {
      if (options.allow_upsell === true) {
        var that = this;
        var amount_monthly;

        if (frequency === 12) {
          amount_monthly = amount;
        } else if (frequency === 1) {
          amount_monthly = amount / frequency;
        }

        $.each(options.upsell, function(index, value) {
          if (index === options.level) { // current level upsell
            if ((value !== true && amount_monthly < value) || value === false) {
              $(options.upsell_selector, element).hide();
            }
          }
        });

        $(options.upsell_btn_selector, element).click(function(event) {
          var upsold = options.upsold;
          that.options.amount = upsold;
          $(options.level_amount_selector, element).text(upsold);
          $(options.full_amount_selector, element).text(upsold);
          $('#amount').val(upsold);
          $(this).remove();
          event.stopPropagation();
          event.preventDefault();
          that.init(true, upsold);
        });
      } else {
        $(options.upsell_selector, element).hide();
      }
    }, // upsell

    honorOrMemory: function(element, options) {
      var that = this;
      var key_escape = 27;

      $(options.honor_selector + ' fieldset').prepend('<a href="#" class="close">Close</a>');
      $(options.honor_selector + ' p a', element).click(function() {
        var link_class = $(this).prop('class');
        $('fieldset.' + link_class, element).addClass('visible').show();
        return false;
      });
      $(options.honor_selector + ' fieldset a.close', element).click(function() {
        var link_class = $(this).parent().prop('class').substring(0, $(this).parent().prop('class').length - 8);
        $('fieldset.' + link_class, element).removeClass('visible').hide();
        return false;
      });

      $(document).keyup(function(e) {
        if (e.keyCode === key_escape) {
          $('fieldset.visible', element).removeClass('visible').hide();
        }
      });

      if ($(options.notify_selector, element).is(':checked')) {
        $(options.notify_field_selector, element).show();
      } else {
        $(options.notify_field_selector, element).hide();
      }
      $(options.notify_selector, element).change(function() {
        if ($(this).is(':checked')) {
          $(options.notify_field_selector, element).show();
        } else {
          $(options.notify_field_selector, element).hide();
        }
      });

    }, // honorOrMemory

    swag: function(element, options, change) {
      
      var that = this;
      var currentlevel = that.options.levelnum;

      if (change === false) { // keep this from repeating
        $(options.swag_selector, element).hide(); // hide all the swag items first
        $(options.swag_selector, element).filter(function(index) { // only show items that are less than or equal to donation level
          return $(this).prop('class').slice(-1) <= currentlevel;
        }).show();

        $(options.separate_swag_redeem, element).click(function(event) { // if user clicks to redeem a separate item (ie atlantic)
          event.stopImmediatePropagation();
          $(options.separate_swag_selector, element).toggle(); // show the options there
          return false;
        });
      }

      if ($(options.atlantic_existing, element).is(':checked')) { // if user has existing atlantic subscription
        $(options.atlantic_selector, element).show();
      } else {
        $(options.atlantic_selector, element).hide();
      }

      $(options.atlantic_status, element).change(function() { // if user clicks one of the atlantic radio buttons
        that.swag(element, options, true);
      });

    }, // swag

    shippingAddress: function(element, options) {
      var that = this;
      var show_shipping = false;
      if ($(options.use_for_shipping_selector).length > 0) { // we have a shipping checkbox
        show_shipping = true;
      }
//      show_shipping = !!$(options.use_for_shipping_selector + ':checked', element).length;
//      console.log('show is there');

/*      $(options.use_for_shipping_selector, element).change(function() {
        that.shippingAddress(element, options);
        console.log('change it');
      });
*/
      if (show_shipping === true ) {
        $(options.use_for_shipping_selector, element).parent().show();
        if ($(options.use_for_shipping_selector, element).is(':checked')) { // use same as billing
          $(options.shipping_selector).hide();
        } else { // separate shipping and billing
          $(options.shipping_selector).show();
        }
        $(options.use_for_shipping_selector, element).change(function() {
          that.shippingAddress(element, options);
        });
      }
      
    }, // shippingAddress

    allowMinnpostAccount: function(element, options, changed) {
      var that = this;
      var account_exists = false;

      function doneTyping () {
        var email = $(options.email_field_selector, element).val();
        account_exists = that.checkMinnpostAccountExists(element, options, email);
      }

      //setup before functions
      var typingTimer;                //timer identifier
      var doneTypingInterval = 5000;  //time in ms, 5 second for example

      //on keyup, start the countdown
      $(options.email_field_selector, element).keyup(function(){
        clearTimeout(typingTimer);
        if ($(options.email_field_selector, element).val) {
          typingTimer = setTimeout(doneTyping, doneTypingInterval);
        }
      });

      //user is "finished typing," do something

      if ($(options.create_mp_selector, element).is(':checked')) {
        $(options.password_selector, element).show();
        options.create_account = true;
      } else {
        $(options.password_selector, element).hide();
      }

      $(options.create_mp_selector, element).change(function() {
        that.allowMinnpostAccount(element, options, true);
      });

      if (changed === false) {
        // allow users to show plain text, or to see pw criteria
        $(options.password_selector, element).append('<div class="help-link"><span>Password help</span></div><div class="form-help">Password must be at least 6 characters.</div><label class="additional-option"><input type="checkbox" name="showpassword" id="showpassword"> Show password</label>');
        $(options.create_mp_selector, element).parent().before('<p class="account-exists success">There is already a MinnPost.com account with this email.</p>');
        $('.account-exists').hide();
        $('#showpassword').click(function() {
          if ($(this).is(':checked')) {
            $('#password').get(0).type = 'text';
          } else {
            $('#password').get(0).type = 'password';
          }
        });

        $('.form-item .form-help').hide();
      }
      $('.form-item--with-help label, .form-item--with-help input').next('.help-link').click(function() {
        $(this).next('.form-help').toggle();
        return false;
      });
    }, // allowMinnpostAccount

    checkMinnpostAccountExists: function(element, options, email) {     
      var user = {
        email: email
      };
      $.ajax({
        method: 'POST',
        url: options.minnpost_root + '/accounts/exists',
        data: user
      }).done(function( data ) {
        if (data.status === 'success' && data.reason === 'user exists') { // user exists
          if ($(options.create_mp_selector, element).is(':checked')) {
            $(options.password_selector, element).hide();
            $(options.create_mp_selector, element).parent().hide();
            $('.account-exists', element).show();
          }
          $(options.create_mp_selector, element).on('change', function() {
            if ($(options.create_mp_selector, element).is(':checked')) {
              $(options.password_selector, element).hide();
              $(options.create_mp_selector, element).parent().hide();
              $('.account-exists', element).show();
            }
          });
        } else { // user does not exist or ajax call failed
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
    }, // checkMinnpostAccountExists

    creditCardFields: function(element, options) {
      if (typeof Payment !== 'undefined') {
        // format values
        Payment.formatCardNumber($(options.cc_num_selector, element));
        Payment.formatCardExpiry($(options.cc_exp_selector, element));
        Payment.formatCardCVC($(options.cc_cvv_selector, element));
        
        // get and show the card type
        $(options.cc_num_selector, element).parent().prepend('<span class="card-image"></span>');
        $(options.cc_num_selector, element).keyup(function() {
          options.cardType = Payment.fns.cardType($(options.cc_num_selector, element).val());
          /*if (options.cardType !== null) {            
            $('.card-image').prop('class', 'card-image ' + options.cardType);
          }*/
          $('.card-image').prop('class', 'card-image ' + $('#cc-number').prop('class'));
        });



        /*$(options.credit_card_fieldset + ' input').focusin(function() {
          $(this).parent().addClass('focus');
        }).focusout(function() {
          $(this).parent().removeClass('focus');
        });*/
      }
    }, // creditCardFields

    validateAndSubmit: function(element, options) {
      var that = this;
      $(options.donate_form_selector).submit(function(event) {
        event.preventDefault();
        // validate and submit the form
        var valid = true;
        if (typeof Payment !== 'undefined') {
          var exp = Payment.fns.cardExpiryVal($(options.cc_exp_selector, element).val());
          var valid_cc = Payment.fns.validateCardNumber($(options.cc_num_selector, element).val());
          var valid_exp = Payment.fns.validateCardExpiry(exp.month, exp.year);
          var valid_cvv = Payment.fns.validateCardCVC($(options.cc_cvv_selector, element).val(), options.cardType);
          if (valid_cc === false || valid_exp === false || valid_cvv === false) {
            that.debug('cc ' + valid_cc + ' exp ' + valid_exp + ' cvv ' + valid_cvv);
            valid = false;
            $(options.cc_num_selector, element).parent().addClass('error');
            if (valid_cc === false) {
              $(options.cc_num_selector, element).addClass('error');
            } else {
              $(options.cc_exp_selector, element).removeClass('error');
              $(options.cc_cvv_selector, element).removeClass('error');
            }
            if (valid_exp === false) {
              $(options.cc_exp_selector, element).addClass('error');
            } else {
              $(options.cc_num_selector, element).removeClass('error');
              $(options.cc_cvv_selector, element).removeClass('error');
            }
            if (valid_cvv === false) {
              $(options.cc_cvv_selector, element).addClass('error');
            } else {
              $(options.cc_num_selector, element).removeClass('error');
              $(options.cc_exp_selector, element).removeClass('error');
            }
          } else {
            $(options.cc_num_selector, element).parent().removeClass('error');
            $(options.cc_num_selector, element).removeClass('error');
            $(options.cc_exp_selector, element).removeClass('error');
            $(options.cc_cvv_selector, element).removeClass('error');
          }
        }

        if (valid === true) {

          // 1. process donation to stripe          
          var supportform = $(options.donate_form_selector);

          var stripeResponseHandler = function(status, response) {
            var supportform = $(options.donate_form_selector);

            if (response.error) {
              // Show the errors on the form
              supportform.find('.payment-errors').text(response.error.message);
              supportform.find('button').removeProp('disabled');
              supportform.find('button').text(options.button_text);
            } else {
              // response contains id and card, which contains additional card details
              var token = response.id;
              // Insert the token into the form so it gets submitted to the server
              if ($('input[name="stripeToken"]').length > 0) {
                $('input[name="stripeToken"]').val(token);
              } else {
                supportform.append($('<input type=\"hidden\" name=\"stripeToken\" />').val(token));  
              }
              
              // and submit

              //console.dir(response);
              //supportform.get(0).submit();

              //setTimeout(function() {
                $.ajax({
                  url:'/charge_ajax/',
                  cache: false,
                  data: $(supportform).serialize(),
                  type: 'POST'
                })
                .done(function(data) {
                  if (typeof data.error !== 'undefined') {
                    // do not submit. there is an error.
                    supportform.find('.payment-errors').text(data.error.message);
                    supportform.find('button').removeProp('disabled');
                    supportform.find('button').text(options.button_text);

                    // add some error messages and styles
                    if (data.error.code == 'invalid_number' || data.error.code == 'incorrect_number' || data.error.code == 'card_declined' || data.error.code == 'processing_error') {
                      $(options.cc_num_selector, element).addClass('error');
                      $(options.cc_num_selector, element).prev().addClass('error');
                      $(options.cc_num_selector, element).after('<span class="card-instruction invalid">' + data.error.message + '</span>');
                    }

                    if (data.error.code == 'invalid_expiry_month' || data.error.code == 'invalid_expiry_year' || data.error.code == 'expired_card') {
                      $(options.cc_exp_selector, element).addClass('error');
                      $(options.cc_exp_selector, element).prev().addClass('error');
                      $(options.cc_num_selector, element).after('<span class="card-instruction invalid">' + data.error.message + '</span>');
                    }

                    if (data.error.code == 'invalid_cvc' || data.error.code == 'incorrect_cvc') {
                      $(options.cc_cvv_selector, element).addClass('error');
                      $(options.cc_cvv_selector, element).prev().addClass('error');
                      $(options.cc_num_selector, element).after('<span class="card-instruction invalid">' + data.error.message + '</span>');
                    }

                  } else {
                    //window.location.href = '/thanks';
                    supportform.get(0).submit();
                  }
                })
                .error(function(data) {
                  supportform.find('.payment-errors').text(data.error.message);
                  supportform.find('button').removeProp('disabled');
                  supportform.find('button').text(options.button_text);
                });
              //},500);

              // Disable the submit button to prevent repeated clicks
              supportform.find('button').prop('disabled', true);
              supportform.find('button').text('Processing');

            }
          }; // end stripeResponseHandler          

          // prepare for stripeResponseHandler
          var full_name = '';
          if ($('#full_name').length > 0) {
            full_name = $('#full_name').val();
          } else {
            full_name = $('#first_name').val() + ' ' + $('#last_name').val();
          }

          var street = '';
          if ($('input[name="billing_street"]').length > 0) {
            street = $('input[name="billing_street"]').val();
          }

          var city = '';
          if ($('input[name="billing_city"]').length > 0) {
            city = $('input[name="billing_city"]').val();
          }

          var state = '';
          if ($('input[name="billing_state"]').length > 0) {
            state = $('input[name="billing_state"]').val();
          }

          var zip = '';
          if ($('input[name="billing_zip"]').length > 0) {
            zip = $('input[name="billing_zip"]').val();
          }

          var country = '';
          if ($('input[name="billing_country"]').length > 0) {
            country = $('input[name="billing_country"]').val();
          }

          // 2. create minnpost account if specified
          if (options.create_account === true) {
            var user = {
              email: $(options.email_field_selector, element).val(),
              first: $(options.firstname_field_selector, element).val(),
              last: $(options.lastname_field_selector, element).val(),
              password: $(options.password_field_selector, element).val(),
              city: $(options.account_city_selector, element).val(),
              state: $(options.account_state_selector, element).val(),
              zip: $(options.account_zip_selector, element).val(),
            };
            $.ajax({
              method: 'POST',
              url: options.minnpost_root + '/accounts/create',
              data: user
            }).done(function( data ) {
              if (data.status === 'success' && data.reason === 'new user') {
                // user created - they should receive email
                // submit the form
                //supportform.get(0).submit();
              } else {
                // user not created
                // still submit the form
                //supportform.get(0).submit();
              }
            });
          }

          // finally, get a token from stripe, and try to charge it
          Stripe.card.createToken({
            number: $('#cc-number').val(),
            cvc: $('#cc-cvc').val(),
            exp: $('#cc-exp').val()
          }, stripeResponseHandler);
          //return true;

        }

      });
      //return false;
    }, // validateAndSubmit

    showNewsletterSettings: function(element, options) {
      var that = this;
      if ($(options.newsletter_group_selector).length > 0 && typeof $(options.email_field_selector, element).val() !== 'undefined') {
        var post_data = {
          email: $(options.email_field_selector, element).val()
        };
        $.ajax({
          method: 'POST',
          url: options.minnpost_root + '/mailchimp/minnpost/groups',
          data: post_data
        }).done(function( result ) {
          if (result.status === 'success' && result.reason === 'user exists') {
            // user created - show a success message
            $('.confirm-instructions').text($('.confirm-instructions').attr('data-known-user'));
            var groups = result.groups;
            $.each(groups, function( index, value ) {
              $(':checkbox[value="' + value + '"]').prop('checked','true');
            });

            //this.options.existing_newsletter_settings = $('.support-newsletter :input').serialize();

          }
        });
      }

    }, // showNewsletterSettings

    confirmMessageSubmit: function(element, options) {

      //var existing_newsletter_settings = this.options.existing_newsletter_settings;
      var existing_newsletter_settings = $('.support-newsletter :input').serialize();
      //console.dir(existing_newsletter_settings);

      $(options.confirm_form_selector).submit(function(event) {
        event.preventDefault();

        var confirmform = $(options.confirm_form_selector);
        // submit settings to mailchimp
        // need to get user info on a hidden field here

        var newsletter_groups = $(options.newsletter_group_selector + ':checked');
        var message_groups = $(options.message_group_selector + ':checked');
        var new_newsletter_settings = $('.support-newsletter :input:checked').serialize();

        if ((existing_newsletter_settings !== new_newsletter_settings) && (typeof newsletter_groups !== 'undefined' || typeof message_groups !== 'undefined')) {
          var post_data = {
            minnpost_mailchimp_js_form_action: 'newsletter_subscribe',
            minnpost_mailchimp_email: $(options.email_field_selector, element).val(),
            minnpost_mailchimp_firstname: $(options.firstname_field_selector, element).val(),
            minnpost_mailchimp_lastname: $(options.lastname_field_selector, element).val(),
            minnpost_mailchimp_groups: {},
            minnpost_mailchimp_periodic: {}
          };

          if (typeof newsletter_groups !== 'undefined') {
            $.each(newsletter_groups, function() {
              var group = $(this).val();
              post_data.minnpost_mailchimp_groups[group] = group;
            });
          }

          if (typeof message_groups !== 'undefined') {
            $.each(message_groups, function() {
              var group = $(this).val();
              post_data.minnpost_mailchimp_periodic[group] = group;
            });
          }

          $.ajax({
            method: 'POST',
            url: options.minnpost_root + '/mailchimp/minnpost/api',
            data: post_data
          }).done(function( result ) {
            if (result.status === 'success') {
              // user created - show a success message
              console.dir(result);
            } else {
              // user not created - show error message
              console.dir(result);
            }
          });
        }

        //console.log('try to submit now');
        confirmform.get(0).submit();

      });
      //return false;
    }, // confirmMessageSubmit

  }; // plugin.prototype

  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[pluginName] = function ( options ) {
    return this.each(function () {
      if (!$.data(this, 'plugin_' + pluginName)) {
        $.data(this, 'plugin_' + pluginName, new Plugin( this, options ));
      }
    });
  };

})( jQuery, window, document );