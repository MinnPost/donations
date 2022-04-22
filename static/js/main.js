;(function($) {
"use strict";

function tlite(t) {
  document.addEventListener("mouseover", function (e) {
    var i = e.target,
        n = t(i);
    n || (n = (i = i.parentElement) && t(i)), n && tlite.show(i, n, !0);
  });
}

tlite.show = function (t, e, i) {
  var n = "data-tlite";
  e = e || {}, (t.tooltip || function (t, e) {
    function o() {
      tlite.hide(t, !0);
    }

    function l() {
      r || (r = function (t, e, i) {
        function n() {
          o.className = "tlite tlite-" + r + s;
          var e = t.offsetTop,
              i = t.offsetLeft;
          o.offsetParent === t && (e = i = 0);
          var n = t.offsetWidth,
              l = t.offsetHeight,
              d = o.offsetHeight,
              f = o.offsetWidth,
              a = i + n / 2;
          o.style.top = ("s" === r ? e - d - 10 : "n" === r ? e + l + 10 : e + l / 2 - d / 2) + "px", o.style.left = ("w" === s ? i : "e" === s ? i + n - f : "w" === r ? i + n + 10 : "e" === r ? i - f - 10 : a - f / 2) + "px";
        }

        var o = document.createElement("span"),
            l = i.grav || t.getAttribute("data-tlite") || "n";
        o.innerHTML = e, t.appendChild(o);
        var r = l[0] || "",
            s = l[1] || "";
        n();
        var d = o.getBoundingClientRect();
        return "s" === r && d.top < 0 ? (r = "n", n()) : "n" === r && d.bottom > window.innerHeight ? (r = "s", n()) : "e" === r && d.left < 0 ? (r = "w", n()) : "w" === r && d.right > window.innerWidth && (r = "e", n()), o.className += " tlite-visible", o;
      }(t, d, e));
    }

    var r, s, d;
    return t.addEventListener("mousedown", o), t.addEventListener("mouseleave", o), t.tooltip = {
      show: function show() {
        d = t.title || t.getAttribute(n) || d, t.title = "", t.setAttribute(n, ""), d && !s && (s = setTimeout(l, i ? 150 : 1));
      },
      hide: function hide(t) {
        if (i === t) {
          s = clearTimeout(s);
          var e = r && r.parentNode;
          e && e.removeChild(r), r = void 0;
        }
      }
    };
  }(t, e)).show();
}, tlite.hide = function (t, e) {
  t.tooltip && t.tooltip.hide(e);
}, "undefined" != typeof module && module.exports && (module.exports = tlite);
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
    'plaid_link': '#authorize-ach',
    'minnpost_root': 'https://www.minnpost.com',
    'analytics_type': '',
    'progress_selector': '.m-support-progress',
    'form_selector': '.m-form',
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
    'shipping_state_field_selector': '#shipping_state',
    'shipping_zip_field_selector': '#shipping_zip',
    'shipping_country_field_selector': '#shipping_country',
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
      });

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

        this.validateSetup(this.element, this.options); // setup how validation errors work

        this.formSetup(this.element, this.options); // validate and submit the form
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
      this.debug('analytics type is ' + options.analytics_type);
      var progress = $(options.progress_selector);
      var step;
      var action = 'checkout';
      var nav_item_count = 0;
      var opp_id = $(options.opp_id_selector).val();
      var post_purchase = false;

      if (options.analytics_type == 'analyticsjs') {
        ga('require', 'ec');
      }

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
        action = 'purchase';
      } else if (progress.length === 0) {
        return;
      }

      this.debug('step is ' + step + ' and nav item count is ' + nav_item_count + ' and opp id is ' + opp_id + ' and post purchase is ' + post_purchase);
      this.analyticsTrackingStep(step, action, post_purchase);
    },
    // analyticsTracking
    analyticsTrackingStep: function analyticsTrackingStep(step, action, post_purchase) {
      var progress = $(this.options.progress_selector);
      var amount = $(this.options.original_amount_selector).val();
      var opp_id = $(this.options.opp_id_selector).val();
      var installment_period = 'one-time';
      var level;
      var that = this;

      if ($(this.options.installment_period_selector).length > 0) {
        installment_period = $(this.options.installment_period_selector).val();
      } // if we're not after the purchase, use addProduct
      //if (progress.length > 0 && post_purchase !== true) {


      if (progress.length > 0) {
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
            that.debug('create product object: id is ' + 'minnpost_' + level.toLowerCase() + '_membership' + ' and name is ' + 'MinnPost ' + level.charAt(0).toUpperCase() + level.slice(1) + ' Membership' + ' and variant is ' + installment_period.charAt(0).toUpperCase() + installment_period.slice(1));
            var product = {
              'id': 'minnpost_' + level.toLowerCase() + '_membership',
              'name': 'MinnPost ' + level.charAt(0).toUpperCase() + level.slice(1) + ' Membership',
              'category': 'Donation',
              'brand': 'MinnPost',
              'variant': installment_period.charAt(0).toUpperCase() + installment_period.slice(1),
              'price': that.getTotalAmount(amount),
              'quantity': 1
            };

            if (that.options.analytics_type == 'gtagjs') {
              gtag('event', 'checkout_progress', {
                "value": that.getTotalAmount(amount),
                "items": [product],
                "checkout_step": step,
                "checkout_option": action
              });
            } else if (that.options.analytics_type == 'analyticsjs') {
              ga('ec:addProduct', product);
              ga('ec:setAction', 'checkout', {
                'step': step,
                'option': action
              });
            }

            if (action === 'purchase') {
              that.debug('add a purchase action. step is ' + step + ' and action is ' + action);

              if (that.options.analytics_type == 'gtagjs') {
                gtag('event', action, {
                  "transaction_id": opp_id,
                  // Transaction id - Type: string
                  "affiliation": 'MinnPost',
                  // Store name - Type: string
                  "value": that.getTotalAmount(amount),
                  // Total Revenue - Type: numeric
                  "currency": "USD",
                  "items": [product],
                  "checkout_step": step
                });
              } else if (that.options.analytics_type == 'analyticsjs') {
                ga('ec:setAction', action, {
                  'id': opp_id,
                  // Transaction id - Type: string
                  'affiliation': 'MinnPost',
                  // Store name - Type: string
                  'revenue': amount,
                  // Total Revenue - Type: numeric
                  'step': step
                });
              }
            }

            if (that.options.analytics_type == 'gtagjs') {
              gtag('event', 'page_view', {
                page_title: document.title,
                page_path: window.location.pathname
              });
            } else if (that.options.analytics_type == 'analyticsjs') {
              ga('set', {
                page: window.location.pathname,
                title: document.title
              });
              ga('send', 'pageview', window.location.pathname);
            }
          }
        });
      }
    },
    // analyticsTrackingStep
    amountAsRadio: function amountAsRadio(element, options) {
      // when amount field is a radio button, we need to check it whenever it changes
      var that = this;
      that.setRadioAmount($(options.original_amount_selector, element), element, options);
      $(options.original_amount_selector, element).change(function () {
        that.setRadioAmount($(this), element, options);
      });
    },
    // amountAsRadio
    setRadioAmount: function setRadioAmount(field, element, options) {
      var that = this;
      var stripe_payment_type = that.getStripePaymentType();
      var amount = $(options.original_amount_selector + ':checked', element).val();

      if (field.is(':radio') && typeof amount !== 'undefined') {
        options.original_amount = parseInt(amount, 10);
        that.calculateFees(that.options.original_amount, stripe_payment_type);
        that.setFairMarketValue(field);
      }
    },
    // setRadioAmount
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
      // if there is a fair market value field and there is a fair-market-value data attribute
      // check and see if we can populate the field with the data attribute
      if ($(this.options.fair_market_value_selector).length > 0 && typeof amount_selector.data('fair-market-value') !== 'undefined') {
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

      full_amount = parseFloat(full_amount).toFixed(2);
      $(that.options.full_amount_selector).text(full_amount); // update the payment request

      if (this.paymentRequest && full_amount) {
        this.paymentRequest.update({
          total: {
            label: "MinnPost",
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
      var that = this;
      $(options.show_billing_country_selector).click(function () {
        that.changeFieldsOutsideUS('billing', element, options);
        $(this).parent().hide();
        return false;
      });
      $(options.show_shipping_country_selector).click(function () {
        $(options.shipping_country_selector).show();
        that.changeFieldsOutsideUS('shipping', element, options);
        $(this).parent().hide();
        return false;
      });
    },
    // outsideUnitedStates
    changeFieldsOutsideUS: function changeFieldsOutsideUS(billing_or_shipping, element, options) {
      if (billing_or_shipping === 'billing') {
        var zip_parent = $(options.billing_zip_field_selector, element).parent();
        var state_parent = $(options.billing_state_field_selector, element).parent();
        $(options.billing_country_selector).show();
        $(options.billing_zip_field_selector, element).attr('type', 'text');
        $(options.billing_zip_field_selector, element).prop('required', false);
        $(options.billing_state_field_selector, element).prop('required', false);
        $('label', zip_parent).text('Postal Code:');
        $('label', state_parent).text('Region:');
      } else if (billing_or_shipping === 'shipping') {
        var zip_parent = $(options.shipping_zip_field_selector, element).parent();
        var state_parent = $(options.shipping_state_field_selector, element).parent();
        $(options.shipping_country_selector).show();
        $(options.shipping_zip_field_selector, element).attr('type', 'text');
        $(options.shipping_zip_field_selector, element).prop('required', false);
        $(options.shipping_state_field_selector, element).prop('required', false);
        $('label', zip_parent).text('Shipping Postal Code:');
        $('label', state_parent).text('Shipping Region:');
      }
    },
    // changeFieldsOutsideUS
    changeFieldsInsideUS: function changeFieldsInsideUS(billing_or_shipping, element, options) {
      if (billing_or_shipping === 'billing') {
        var zip_parent = $(options.billing_zip_field_selector, element).parent();
        var state_parent = $(options.billing_state_field_selector, element).parent();
        $(options.billing_country_selector).show();
        $(options.billing_zip_field_selector, element).attr('type', 'tel');
        $(options.billing_zip_field_selector, element).prop('required', true);
        $(options.billing_state_field_selector, element).prop('required', true);
        $('label', zip_parent).html('Zip Code: <span class="a-form-item-required" title="This field is required.">*</span>');
        $('label', state_parent).html('State: <span class="a-form-item-required" title="This field is required.">*</span>');
      } else if (billing_or_shipping === 'shipping') {
        var zip_parent = $(options.shipping_zip_field_selector, element).parent();
        var state_parent = $(options.shipping_state_field_selector, element).parent();
        $(options.shipping_country_selector).show();
        $(options.shipping_zip_field_selector, element).attr('type', 'tel');
        $(options.shipping_zip_field_selector, element).prop('required', true);
        $(options.shipping_state_field_selector, element).prop('required', true);
        $('label', zip_parent).html('Shipping Zip Code: <span class="a-form-item-required" title="This field is required.">*</span>');
        $('label', state_parent).html('Shipping State: <span class="a-form-item-required" title="This field is required.">*</span>');
      }
    },
    // changeFieldsOutsideUS
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
        spamErrorContainer.append('<p class="a-form-caption a-validation-error a-spam-email">This email address has been detected as a spammer.</p>');
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
          label: 'MinnPost',
          amount: total_amount * 100
        }
      });
      that.prButton = that.elements.create('paymentRequestButton', {
        paymentRequest: that.paymentRequest,
        style: {
          paymentRequestButton: {
            type: 'donate',
            // One of 'default', 'book', 'buy', or 'donate'
            // Defaults to 'default'
            theme: 'dark',
            // One of 'dark', 'light', or 'light-outline'
            // Defaults to 'dark'
            height: '48px' // Defaults to '40px'. The width is always '100%'.

          }
        }
      }); // Check the availability of the Payment Request API first.

      that.paymentRequest.canMakePayment().then(function (result) {
        if (result) {
          $('.m-pay-without-payment-request').hide();
          that.prButton.mount('#payment-request-button');
        } else {
          that.hidePaymentRequest($('.o-pay-with-payment-request'));
        }
      });
      $('.decline-apple-pay a').click(function (event) {
        event.preventDefault();
        that.hidePaymentRequest($('.o-pay-with-payment-request .m-form-actions-pay-fees'));
      });
      that.prButton.on('click', function (event) {
        // Send paymentMethod.id to server
        var supportform = $(that.options.donate_form_selector); // check validation of form

        if (!supportform.get(0).reportValidity()) {
          event.preventDefault();
          return;
        }
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

        that.formProcessor(that, 'paymentRequest');
      });
    },
    // paymentRequestButton
    hidePaymentRequest: function hidePaymentRequest(hideElement) {
      hideElement.hide();
      $('.decline-apple-pay a').hide();
      $('.m-pay-without-payment-request').show();
      $('.a-g-recaptcha').insertAfter('.m-pay-without-payment-request .m-form-actions-pay-fees');
    },
    // hidePaymentRequest
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
      $(options.plaid_link).html('<a href="#">Sign in to your bank account</a>');
      this.buttonDisabled(options, false, '', '', true); // if the button was disabled, re-enable it

      if (typeof this.linkHandler !== 'undefined') {
        this.linkHandler.destroy();
      }
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
    showSpinner: function showSpinner() {
      $(this.options.plaid_link).hide();
      $(this.options.plaid_link).after('<div class="a-spinner"><img src="https://www.minnpost.com/wp-admin/images/spinner.gif" srcset="https://www.minnpost.com/wp-admin/images/spinner.gif 1x, https://www.minnpost.com/wp-admin/images/spinner-2x.gif 2x,"></div>');
    },
    hideSpinner: function hideSpinner() {
      $(this.options.plaid_link).show();
      $('.a-spinner').hide();
    },
    achFields: function achFields(element, options) {
      var bankTokenFieldName = 'bankToken';
      var bankTokenField = 'input[name="' + bankTokenFieldName + '"]';
      var that = this; // the button should not be clickable until the user has signed in

      that.buttonDisabled(options, true, '', 'Sign in to your bank account (above) first');

      if (typeof Plaid !== 'undefined') {
        that.linkHandler = Plaid.create({
          clientName: 'MinnPost',
          env: options.plaid_env,
          product: ['auth'],
          // 1. Pass the token generated in step 2.
          token: document.getElementById('plaid_link_token').value,
          onSuccess: function onSuccess(public_token, metadata) {
            that.showSpinner();
            $.ajax({
              url: '/get_plaid_access_token/',
              data: JSON.stringify({
                public_token: public_token,
                account_id: metadata.account_id
              }),
              type: 'POST',
              contentType: 'application/json; charset=utf-8'
            }).done(function (response) {
              if (typeof response.error !== 'undefined') {
                // there is an error.
                that.hideSpinner();
                $(options.plaid_link).before('<p class="a-error a-validation-error">' + response.error + '</p>');
              } else {
                //this.debug('print response here');
                //this.debug(response);
                // add the field(s) we need to the form for submitting
                if ($(bankTokenField).length > 0) {
                  $(bankTokenField).val(response.stripe_bank_account_token);
                } else {
                  $(options.donate_form_selector).prepend($('<input type=\"hidden\" name="' + bankTokenFieldName + '">').val(response.stripe_bank_account_token));
                }

                $(options.plaid_link, element).html('<strong>Your account was successfully authorized</strong>');
                that.hideSpinner();
                that.buttonDisabled(options, false);
              }
            }).fail(function (response) {
              that.debug(response);
              that.hideSpinner();
              $(options.plaid_link).before('<p class="a-error a-validation-error">' + response.error + '</p>');
            });
          }
        });
        $(options.plaid_link + ' a').click(function (event) {
          event.preventDefault();
          that.resetFormErrors(that.options, that.element); //$(options.payment_method_selector + ' .a-error').remove(); // remove method error message if it is there

          that.linkHandler.open();
        });
      }
    },
    // achFields
    buttonStatus: function buttonStatus(options, button, disabled) {
      // make the button clickable or not
      this.buttonDisabled(options, disabled, button);

      if (disabled === false) {
        button.text(options.button_text);
      } else {
        button.text('Processing');
      }
    },
    // buttonStatus
    buttonDisabled: function buttonDisabled(options, disabled) {
      var button = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      var message = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
      var ach_was_initialized = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;

      if (button === '') {
        button = $(options.donate_form_selector).find('button');
      }

      button.prop('disabled', disabled);

      if (message !== '') {
        if (disabled === true) {
          button.attr('data-tlite', message);
        } else {
          button.removeAttr('data-tlite'); // there should be no tlite value if the button is enabled
        }

        button.on('mouseenter focus', function (event) {
          tlite.show(this, {
            grav: 'nw'
          });
        });
        button.on('mouseleave', function (event) {
          tlite.hide(this);
        });
      } else {
        button.removeAttr('data-tlite');

        if (ach_was_initialized === true) {
          button.on('mouseenter focus', function (event) {
            tlite.hide(this);
          });
          button.click(function (event) {
            return true;
          });
        }
      }
    },
    // buttonDisabled
    validateSetup: function validateSetup(element, options) {
      var forms = document.querySelectorAll(options.form_selector);
      forms.forEach(function (form) {
        ValidForm(form, {
          validationErrorParentClass: 'm-has-validation-error',
          validationErrorClass: 'a-validation-error',
          invalidClass: 'a-error',
          errorPlacement: 'after'
        });
      });
      this.scrollToFormError(options);
    },
    // validateSetup
    scrollToFormError: function scrollToFormError(options) {
      var form = $(options.form_selector); // listen for `invalid` events on all form inputs

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
    formSetup: function formSetup(element, options) {
      var that = this;
      $(options.donate_form_selector).submit(function (event) {
        event.preventDefault();
        that.formProcessor(that, 'submit');
      });
    },
    // formSetup
    formProcessor: function formProcessor(that, type) {
      // 1. remove previous errors and reset the button
      that.resetFormErrors(that.options, that.element); // 2. set up the button if it's a form submit

      if (type === 'submit') {
        that.buttonStatus(that.options, $(that.options.donate_form_selector).find('button'), true);
      } // 3. generate billing address details


      var billingDetails = that.generateBillingDetails(); // 4. create minnpost user account

      that.createMinnPostAccount(that.options, that.element); // 5. do the charging of card or bank account if it's a form submit
      // or submit the form if this is a payment request button

      if (type === 'submit') {
        var payment_type = $('input[name="stripe_payment_type"]').val();

        if (payment_type !== 'bank_account') {
          // finally, get a payment method from stripe, and try to charge it if it is not ach
          that.createPaymentMethod(that.cardNumberElement, billingDetails);
        } else {
          // if it is ach, we already have a token so submit the form
          // todo: upgrade the plaid integration
          that.bankTokenHandler($('input[name="bankToken"]').val(), 'bank_account');
        }
      } else {
        that.submitFormOnly();
      }
    },
    // formProcessor
    stripeErrorDisplay: function stripeErrorDisplay(error, this_selector, element, options) {
      // listen for errors and display/hide error messages
      var which_error = this_selector.attr('id'); // when this field changes, reset its errors

      $('.a-card-instruction.' + which_error).removeClass('a-validation-error');
      $('.a-card-instruction.' + which_error).empty();
      $(this_selector).removeClass('a-error');

      if (error) {
        if ($('.a-card-instruction.' + which_error).length > 0) {
          $('.a-card-instruction.' + which_error).text(error.message);
        } else {
          this_selector.parent().append('<p class="a-card-instruction ' + which_error + '">' + error.message + '</p>');
        }

        $('.a-card-instruction.' + which_error).addClass('a-validation-error');
        this_selector.parent().addClass('m-has-validation-error');
        $(this_selector).addClass('a-error');

        if (this_selector.parent().length > 0) {
          $('html, body').animate({
            scrollTop: this_selector.parent().offset().top
          }, 2000);
        }
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
    resetFormErrors: function resetFormErrors(options, element) {
      var that = this;
      $('.a-validation-error').remove();
      $('input, label, div', element).removeClass('a-error');
      $('label', element).removeClass('m-has-validation-error');
      $(options.payment_method_selector, element).removeClass('a-error invalid');
      $('.a-validation-error').remove();
      $(options.choose_payment + ' input').change(function () {
        $(options.payment_method_selector + ' .a-error').remove(); // remove method error message if it is there

        $(options.payment_method_selector).parent().find('.a-validation-error').remove(); // if a payment field changed, reset the button

        that.buttonStatus(options, $(options.donate_form_selector).find('button'), false);
      });
    },
    // resetFormErrors
    createMinnPostAccount: function createMinnPostAccount(options, element) {
      // 2. create minnpost account if specified
      if (options.create_account === true) {
        var user = {
          email: $(options.email_field_selector, element).val(),
          first_name: $(options.first_name_field_selector, element).val(),
          last_name: $(options.last_name_field_selector, element).val(),
          password: $(options.password_field_selector, element).val(),
          city: $(options.billing_city_field_selector, element).val(),
          state: $(options.billing_state_field_selector, element).val(),
          zip: $(options.billing_zip_field_selector, element).val()
        };
        $.ajax({
          method: 'POST',
          url: options.minnpost_root + '/wp-json/user-account-management/v1/create-user',
          data: user
        }).done(function (data) {
          if (data.status === 'success' && data.reason === 'new user') {// user created - they should receive email
          }
        });
      }
    },
    // createMinnPostAccount
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

      if ($(this.options.billing_street_field_selector).val() != '') {
        street = $(this.options.billing_street_field_selector).val();
        addressDetails.line1 = street;
      }

      var city = 'None';

      if ($(this.options.billing_city_field_selector).val() != '') {
        city = $(this.options.billing_city_field_selector).val();
        addressDetails.city = city;
      }

      var state = 'None';

      if ($(this.options.billing_state_field_selector).val() != '') {
        state = $(this.options.billing_state_field_selector).val();
        addressDetails.state = state;
      }

      var zip = 'None';

      if ($(this.options.billing_zip_field_selector).val() != '') {
        zip = $(this.options.billing_zip_field_selector).val();
        addressDetails.postal_code = zip;
      }

      var country = 'US';
      var country_field_value = $(this.options.billing_country_field_selector).val();

      if (country_field_value != '' && country_field_value != 'United States') {
        country = country_field_value;
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
      this.setStripePaymentType(type);
      this.submitFormOnly();
    },
    // bankTokenHandler
    submitFormOnly: function submitFormOnly() {
      var that = this;
      var supportform = $(this.options.donate_form_selector);
      var ajax_url = window.location.pathname; // Submit the form
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
      }).fail(function () {
        that.buttonStatus(that.options, $(that.options.donate_form_selector).find('button'), false);
      });
    },
    // submitFormOnly
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
      } else if (typeof response.error !== 'undefined') {
        var error = response.error;

        if (typeof error.field !== 'undefined') {
          this_field = error.field + '_field_selector';
        } else if (typeof error.param !== 'undefined' && error.param !== '') {
          this_field = 'cc_' + error.param + '_selector';
        }

        that.displayErrorMessage(error, this_field);
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

        if (error.code == 'email_invalid') {
          // error handling
          stripeErrorSelector = $(this.options.email_field_selector);
        }

        if (stripeErrorSelector !== '') {
          this.stripeErrorDisplay(error, stripeErrorSelector, this.element, this.options);
        }

        if (error.type == 'missing_payment' && stripeErrorSelector === '') {
          $(this.options.payment_method_selector + '.active').append('<p class="a-form-caption a-validation-error a-missing-payment-error">' + error.message + '</p>');
        }

        if (error.field == 'recaptcha') {
          $(this.options.pay_button_selector).before('<p class="a-form-caption a-validation-error a-recaptcha-error">' + message + '</p>');
        }

        if (error.type == 'invalid_request_error' && stripeErrorSelector === '') {
          $(this.options.pay_button_selector).before('<p class="a-form-caption a-validation-error a-invalid-request-error">' + error.message + '</p>');
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRsaXRlLm1pbi5qcyIsInZhbGlkLWZvcm0ubWluLmpzIiwibWlubnBvc3QuZ2l2aW5nLmpzIl0sIm5hbWVzIjpbInRsaXRlIiwidCIsImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJpIiwidGFyZ2V0IiwibiIsInBhcmVudEVsZW1lbnQiLCJzaG93IiwidG9vbHRpcCIsIm8iLCJoaWRlIiwibCIsInIiLCJjbGFzc05hbWUiLCJzIiwib2Zmc2V0VG9wIiwib2Zmc2V0TGVmdCIsIm9mZnNldFBhcmVudCIsIm9mZnNldFdpZHRoIiwib2Zmc2V0SGVpZ2h0IiwiZCIsImYiLCJhIiwic3R5bGUiLCJ0b3AiLCJsZWZ0IiwiY3JlYXRlRWxlbWVudCIsImdyYXYiLCJnZXRBdHRyaWJ1dGUiLCJpbm5lckhUTUwiLCJhcHBlbmRDaGlsZCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImJvdHRvbSIsIndpbmRvdyIsImlubmVySGVpZ2h0IiwicmlnaHQiLCJpbm5lcldpZHRoIiwidGl0bGUiLCJzZXRBdHRyaWJ1dGUiLCJzZXRUaW1lb3V0IiwiY2xlYXJUaW1lb3V0IiwicGFyZW50Tm9kZSIsInJlbW92ZUNoaWxkIiwibW9kdWxlIiwiZXhwb3J0cyIsImMiLCJyZXF1aXJlIiwidSIsIkVycm9yIiwiY29kZSIsInAiLCJjYWxsIiwibGVuZ3RoIiwiX3ZhbGlkRm9ybSIsIl92YWxpZEZvcm0yIiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsIm9iaiIsIl9fZXNNb2R1bGUiLCJkZWZhdWx0IiwiVmFsaWRGb3JtIiwidG9nZ2xlSW52YWxpZENsYXNzIiwiaGFuZGxlQ3VzdG9tTWVzc2FnZXMiLCJoYW5kbGVDdXN0b21NZXNzYWdlRGlzcGxheSIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwidmFsdWUiLCJjbG9uZSIsImRlZmF1bHRzIiwiaW5zZXJ0QWZ0ZXIiLCJpbnNlcnRCZWZvcmUiLCJmb3JFYWNoIiwiZGVib3VuY2UiLCJjb3B5IiwiYXR0ciIsImhhc093blByb3BlcnR5IiwiZGVmYXVsdE9iamVjdCIsImsiLCJ1bmRlZmluZWQiLCJyZWZOb2RlIiwibm9kZVRvSW5zZXJ0Iiwic2libGluZyIsIm5leHRTaWJsaW5nIiwiX3BhcmVudCIsInBhcmVudCIsIml0ZW1zIiwiZm4iLCJtcyIsInRpbWVvdXQiLCJkZWJvdW5jZWRGbiIsInZhbGlkRm9ybSIsIl91dGlsIiwiaW5wdXQiLCJpbnZhbGlkQ2xhc3MiLCJjbGFzc0xpc3QiLCJhZGQiLCJ2YWxpZGl0eSIsInZhbGlkIiwicmVtb3ZlIiwiZXJyb3JQcm9wcyIsImdldEN1c3RvbU1lc3NhZ2UiLCJjdXN0b21NZXNzYWdlcyIsImxvY2FsRXJyb3JQcm9wcyIsInR5cGUiLCJjb25jYXQiLCJwcm9wIiwiY2hlY2tWYWxpZGl0eSIsIm1lc3NhZ2UiLCJzZXRDdXN0b21WYWxpZGl0eSIsIm9wdGlvbnMiLCJ2YWxpZGF0aW9uRXJyb3JDbGFzcyIsInZhbGlkYXRpb25FcnJvclBhcmVudENsYXNzIiwiZXJyb3JQbGFjZW1lbnQiLCJpbnNlcnRFcnJvciIsImVycm9yTm9kZSIsInF1ZXJ5U2VsZWN0b3IiLCJ2YWxpZGF0aW9uTWVzc2FnZSIsInRleHRDb250ZW50IiwicHJldmVudERlZmF1bHQiLCJkZWZhdWx0T3B0aW9ucyIsImVsZW1lbnQiLCJub2RlTmFtZSIsImlucHV0cyIsInRvTG93ZXJDYXNlIiwicXVlcnlTZWxlY3RvckFsbCIsImZvY3VzSW52YWxpZElucHV0IiwidmFsaWRGb3JtSW5wdXRzIiwiZm9ybSIsImZvY3VzRmlyc3QiLCJpbnZhbGlkTm9kZSIsImZvY3VzIiwiJCIsInBsdWdpbk5hbWUiLCJQbHVnaW4iLCJleHRlbmQiLCJfZGVmYXVsdHMiLCJfbmFtZSIsImluaXQiLCJwcm90b3R5cGUiLCJyZXNldCIsImFtb3VudCIsImRvY3VtZW50RWxlbWVudCIsInBhcnNlRmxvYXQiLCJsZXZlbF9hbW91bnRfc2VsZWN0b3IiLCJ0ZXh0Iiwib3JpZ2luYWxfYW1vdW50IiwicGFyc2VJbnQiLCJvcmlnaW5hbF9hbW91bnRfc2VsZWN0b3IiLCJ2YWwiLCJwcm9jZXNzaW5nX2ZlZSIsIk1hdGgiLCJyb3VuZCIsImZlZV9hbW91bnQiLCJwb3ciLCJ0b0ZpeGVkIiwicHJvY2Vzc2luZ19mZWVfdGV4dCIsImNyZWF0ZV9hY2NvdW50IiwiYnV0dG9uX3RleHQiLCJwYXlfYnV0dG9uX3NlbGVjdG9yIiwic3RyaXBlIiwiU3RyaXBlIiwic3RyaXBlX3B1Ymxpc2hhYmxlX2tleSIsImVsZW1lbnRzIiwiZm9udHMiLCJjc3NTcmMiLCJkZWJ1ZyIsImFuYWx5dGljc1RyYWNraW5nIiwiYW1vdW50QXNSYWRpbyIsImFtb3VudFVwZGF0ZWQiLCJwYXlfY2NfcHJvY2Vzc2luZ19zZWxlY3RvciIsImNyZWRpdENhcmRQcm9jZXNzaW5nRmVlcyIsImRvbmF0ZV9mb3JtX3NlbGVjdG9yIiwiZG9uYXRlQW5vbnltb3VzbHkiLCJob25vck9yTWVtb3J5VG9nZ2xlIiwib3V0c2lkZVVuaXRlZFN0YXRlcyIsInNoaXBwaW5nQWRkcmVzcyIsImFsbG93TWlubnBvc3RBY2NvdW50IiwicGF5bWVudFJlcXVlc3RCdXR0b24iLCJjaG9vc2VQYXltZW50TWV0aG9kIiwiY3JlZGl0Q2FyZEZpZWxkcyIsInZhbGlkYXRlU2V0dXAiLCJmb3JtU2V0dXAiLCJjb25maXJtX2Zvcm1fc2VsZWN0b3IiLCJzaG93TmV3c2xldHRlclNldHRpbmdzIiwiY29uZmlybU1lc3NhZ2VTdWJtaXQiLCJjb25zb2xlIiwibG9nIiwiZGlyIiwiYW5hbHl0aWNzX3R5cGUiLCJwcm9ncmVzcyIsInByb2dyZXNzX3NlbGVjdG9yIiwic3RlcCIsImFjdGlvbiIsIm5hdl9pdGVtX2NvdW50Iiwib3BwX2lkIiwib3BwX2lkX3NlbGVjdG9yIiwicG9zdF9wdXJjaGFzZSIsImdhIiwiaW5kZXgiLCJmaW5pc2hfc2VjdGlvbl9zZWxlY3RvciIsImFuYWx5dGljc1RyYWNraW5nU3RlcCIsImluc3RhbGxtZW50X3BlcmlvZCIsImxldmVsIiwidGhhdCIsImluc3RhbGxtZW50X3BlcmlvZF9zZWxlY3RvciIsImRhdGEiLCJhamF4IiwibWV0aG9kIiwidXJsIiwiZG9uZSIsImNoYXJBdCIsInRvVXBwZXJDYXNlIiwic2xpY2UiLCJwcm9kdWN0IiwiZ2V0VG90YWxBbW91bnQiLCJndGFnIiwicGFnZV90aXRsZSIsInBhZ2VfcGF0aCIsImxvY2F0aW9uIiwicGF0aG5hbWUiLCJwYWdlIiwic2V0UmFkaW9BbW91bnQiLCJjaGFuZ2UiLCJmaWVsZCIsInN0cmlwZV9wYXltZW50X3R5cGUiLCJnZXRTdHJpcGVQYXltZW50VHlwZSIsImlzIiwiY2FsY3VsYXRlRmVlcyIsInNldEZhaXJNYXJrZXRWYWx1ZSIsImFtb3VudF9zZWxlY3Rvcl9mYWlyX21hcmtldCIsImFkZGl0aW9uYWxfYW1vdW50X2ZpZWxkIiwidG90YWxfYW1vdW50IiwiYWRkaXRpb25hbF9hbW91bnQiLCJhbW91bnRfc2VsZWN0b3IiLCJmYWlyX21hcmtldF92YWx1ZV9zZWxlY3RvciIsImZhaXJNYXJrZXRWYWx1ZSIsInNldFN0cmlwZVBheW1lbnRUeXBlIiwiZmVlcyIsImNyZWRpdENhcmRGZWVDaGVja2JveCIsIm9uIiwiYXBwZW5kIiwiZnVsbF9hbW91bnQiLCJhZGRDbGFzcyIsImZ1bGxfYW1vdW50X3NlbGVjdG9yIiwicGF5bWVudFJlcXVlc3QiLCJ1cGRhdGUiLCJ0b3RhbCIsImxhYmVsIiwidG9nZ2xlQW5vbnltb3VzIiwiYW5vbnltb3VzX3NlbGVjdG9yIiwibmFtZV9zZWxlY3RvciIsImhvbm9yT3JNZW1vcnkiLCJob25vcl9vcl9tZW1vcnlfY2hvb3NlciIsImhvbm9yX21lbW9yeV9pbnB1dF9ncm91cCIsImhvbm9yX3R5cGVfc2VsZWN0b3IiLCJob25vcl9uYW1lX3NlbGVjdG9yIiwic2hvd19iaWxsaW5nX2NvdW50cnlfc2VsZWN0b3IiLCJjbGljayIsImNoYW5nZUZpZWxkc091dHNpZGVVUyIsInNob3dfc2hpcHBpbmdfY291bnRyeV9zZWxlY3RvciIsInNoaXBwaW5nX2NvdW50cnlfc2VsZWN0b3IiLCJiaWxsaW5nX29yX3NoaXBwaW5nIiwiemlwX3BhcmVudCIsImJpbGxpbmdfemlwX2ZpZWxkX3NlbGVjdG9yIiwic3RhdGVfcGFyZW50IiwiYmlsbGluZ19zdGF0ZV9maWVsZF9zZWxlY3RvciIsImJpbGxpbmdfY291bnRyeV9zZWxlY3RvciIsInNoaXBwaW5nX3ppcF9maWVsZF9zZWxlY3RvciIsInNoaXBwaW5nX3N0YXRlX2ZpZWxkX3NlbGVjdG9yIiwiY2hhbmdlRmllbGRzSW5zaWRlVVMiLCJodG1sIiwic2hvd19zaGlwcGluZyIsInVzZV9mb3Jfc2hpcHBpbmdfc2VsZWN0b3IiLCJzaGlwcGluZ19zZWxlY3RvciIsImFjY291bnRfZXhpc3RzIiwic2hvd1Bhc3N3b3JkIiwic2hvd1Bhc3N3b3JkU3RyZW5ndGgiLCJzcGFtRW1haWwiLCJlbWFpbF9maWVsZF9zZWxlY3RvciIsInRvZ2dsZUFjY291bnRGaWVsZHMiLCJjcmVhdGVfbXBfc2VsZWN0b3IiLCJkb25lVHlwaW5nIiwiZW1haWwiLCJjaGVja01pbm5wb3N0QWNjb3VudCIsInR5cGluZ1RpbWVyIiwiZG9uZVR5cGluZ0ludGVydmFsIiwia2V5dXAiLCJlbWFpbF9maWVsZCIsInNwYW1FcnJvckNvbnRhaW5lciIsInJlbW92ZUNsYXNzIiwiY3JlYXRlX2FjY291bnRfc2VsZWN0b3IiLCJiZWZvcmUiLCJwYXNzd29yZF9zZWxlY3RvciIsIiRzdWJtaXQiLCIkY29udGFpbmVyIiwiJGZpZWxkIiwic2hvd19wYXNzIiwiJHRvZ2dsZSIsImNoZWNrYm94IiwiJGJlZm9yZSIsImFmdGVyIiwiY2hlY2tQYXNzd29yZFN0cmVuZ3RoIiwiJHBhc3N3b3JkIiwiJHN0cmVuZ3RoTWV0ZXIiLCIkc3RyZW5ndGhUZXh0IiwicGFzc3dvcmQiLCJyZXN1bHQiLCJ6eGN2Ym4iLCJzdHJlbmd0aCIsInNjb3JlIiwidXNlciIsIm1pbm5wb3N0X3Jvb3QiLCJzdGF0dXMiLCJyZWFzb24iLCJjb3VudHJ5IiwiY3VycmVuY3kiLCJwckJ1dHRvbiIsImNyZWF0ZSIsInRoZW1lIiwiaGVpZ2h0IiwiY2FuTWFrZVBheW1lbnQiLCJ0aGVuIiwibW91bnQiLCJoaWRlUGF5bWVudFJlcXVlc3QiLCJldmVudCIsInN1cHBvcnRmb3JtIiwiZ2V0IiwicmVwb3J0VmFsaWRpdHkiLCJ0b2tlbkZpZWxkTmFtZSIsInRva2VuRmllbGQiLCJwYXltZW50TWV0aG9kIiwiaWQiLCJmb3JtUHJvY2Vzc29yIiwiaGlkZUVsZW1lbnQiLCJjaG9vc2VfcGF5bWVudCIsImNoZWNrZWRfaWQiLCJjaGVja2VkX3ZhbHVlIiwic2V0dXBQYXltZW50TWV0aG9kIiwiZWxlbWVudF9pZCIsImVsZW1lbnRfdmFsdWUiLCJhY2hGaWVsZHMiLCJyZW1vdmVBY2hGaWVsZHMiLCJwYXltZW50X21ldGhvZF9zZWxlY3RvciIsInBsYWlkX2xpbmsiLCJidXR0b25EaXNhYmxlZCIsImxpbmtIYW5kbGVyIiwiZGVzdHJveSIsImJhc2UiLCJpY29uQ29sb3IiLCJsaW5lSGVpZ2h0IiwiZm9udFdlaWdodCIsImZvbnRGYW1pbHkiLCJmb250U2l6ZSIsImludmFsaWQiLCJjb2xvciIsImNhcmROdW1iZXJFbGVtZW50Iiwic2hvd0ljb24iLCJjY19udW1fc2VsZWN0b3IiLCJjYXJkRXhwaXJ5RWxlbWVudCIsImNjX2V4cF9zZWxlY3RvciIsImNhcmRDdmNFbGVtZW50IiwiY2NfY3ZjX3NlbGVjdG9yIiwiYnJhbmQiLCJzdHJpcGVFcnJvckRpc3BsYXkiLCJlcnJvciIsImJ1dHRvblN0YXR1cyIsImZpbmQiLCJzaG93U3Bpbm5lciIsImhpZGVTcGlubmVyIiwiYmFua1Rva2VuRmllbGROYW1lIiwiYmFua1Rva2VuRmllbGQiLCJQbGFpZCIsImNsaWVudE5hbWUiLCJlbnYiLCJwbGFpZF9lbnYiLCJ0b2tlbiIsImdldEVsZW1lbnRCeUlkIiwib25TdWNjZXNzIiwicHVibGljX3Rva2VuIiwibWV0YWRhdGEiLCJKU09OIiwic3RyaW5naWZ5IiwiYWNjb3VudF9pZCIsImNvbnRlbnRUeXBlIiwicmVzcG9uc2UiLCJzdHJpcGVfYmFua19hY2NvdW50X3Rva2VuIiwicHJlcGVuZCIsImZhaWwiLCJyZXNldEZvcm1FcnJvcnMiLCJvcGVuIiwiYnV0dG9uIiwiZGlzYWJsZWQiLCJhY2hfd2FzX2luaXRpYWxpemVkIiwicmVtb3ZlQXR0ciIsImZvcm1zIiwiZm9ybV9zZWxlY3RvciIsInNjcm9sbFRvRm9ybUVycm9yIiwiZmlyc3QiLCJmaXJzdF9ob2xkZXIiLCJlbGVtZW50T2Zmc2V0Iiwib2Zmc2V0IiwicGFnZU9mZnNldCIsInBhZ2VZT2Zmc2V0Iiwic2Nyb2xsVG9wIiwic3VibWl0IiwiYmlsbGluZ0RldGFpbHMiLCJnZW5lcmF0ZUJpbGxpbmdEZXRhaWxzIiwiY3JlYXRlTWlublBvc3RBY2NvdW50IiwicGF5bWVudF90eXBlIiwiY3JlYXRlUGF5bWVudE1ldGhvZCIsImJhbmtUb2tlbkhhbmRsZXIiLCJzdWJtaXRGb3JtT25seSIsInRoaXNfc2VsZWN0b3IiLCJ3aGljaF9lcnJvciIsImVtcHR5IiwiYW5pbWF0ZSIsImZpcnN0X25hbWUiLCJmaXJzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yIiwibGFzdF9uYW1lIiwibGFzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yIiwicGFzc3dvcmRfZmllbGRfc2VsZWN0b3IiLCJjaXR5IiwiYmlsbGluZ19jaXR5X2ZpZWxkX3NlbGVjdG9yIiwic3RhdGUiLCJ6aXAiLCJhZGRyZXNzRGV0YWlscyIsImZ1bGxfbmFtZSIsIm5hbWUiLCJzdHJlZXQiLCJiaWxsaW5nX3N0cmVldF9maWVsZF9zZWxlY3RvciIsImxpbmUxIiwicG9zdGFsX2NvZGUiLCJjb3VudHJ5X2ZpZWxkX3ZhbHVlIiwiYmlsbGluZ19jb3VudHJ5X2ZpZWxkX3NlbGVjdG9yIiwiYWRkcmVzcyIsImNhcmRFbGVtZW50IiwiY2FyZCIsImJpbGxpbmdfZGV0YWlscyIsImhhbmRsZVNlcnZlckVycm9yIiwiYWpheF91cmwiLCJmZXRjaCIsImhlYWRlcnMiLCJib2R5Iiwic2VyaWFsaXplIiwianNvbiIsImhhbmRsZVNlcnZlclJlc3BvbnNlIiwiY2FjaGUiLCJlcnJvcnMiLCJyZXF1aXJlc19hY3Rpb24iLCJ0aGlzX2ZpZWxkIiwiZWFjaCIsInBhcmFtIiwiZGlzcGxheUVycm9yTWVzc2FnZSIsInN0cmlwZUVycm9yU2VsZWN0b3IiLCJmaWVsZFBhcmVudCIsInByZXYiLCJuZXdzbGV0dGVyX2dyb3VwX2h0bWwiLCJuZXdzbGV0dGVyX2dyb3VwX3NlbGVjdG9yIiwiZ2V0X2RhdGEiLCJzaG9ydGNvZGUiLCJwbGFjZW1lbnQiLCJncm91cF9maWVsZHMiLCJjYXRlZ29yeSIsImNvbnRhaW5zIiwiaXRlbSIsIm1haWxjaGltcF9zdGF0dXMiLCJtYWlsY2hpbXBfdXNlcl9pZCIsImdyb3VwcyIsImV4aXN0aW5nX25ld3NsZXR0ZXJfc2V0dGluZ3MiLCJjb25maXJtZm9ybSIsIm5ld3NsZXR0ZXJfZ3JvdXBzIiwibmV3X25ld3NsZXR0ZXJfc2V0dGluZ3MiLCJwb3N0X2RhdGEiLCJncm91cHNfc3VibWl0dGVkIiwiZ3JvdXBzX2F2YWlsYWJsZSIsImdyb3VwIiwiZGF0YVR5cGUiLCJzdWNjZXNzIiwialF1ZXJ5Il0sIm1hcHBpbmdzIjoiOztBQUFBLFNBQVNBLEtBQVQsQ0FBZUMsQ0FBZixFQUFpQjtBQUFDQyxFQUFBQSxRQUFRLENBQUNDLGdCQUFULENBQTBCLFdBQTFCLEVBQXNDLFVBQVNDLENBQVQsRUFBVztBQUFDLFFBQUlDLENBQUMsR0FBQ0QsQ0FBQyxDQUFDRSxNQUFSO0FBQUEsUUFBZUMsQ0FBQyxHQUFDTixDQUFDLENBQUNJLENBQUQsQ0FBbEI7QUFBc0JFLElBQUFBLENBQUMsS0FBR0EsQ0FBQyxHQUFDLENBQUNGLENBQUMsR0FBQ0EsQ0FBQyxDQUFDRyxhQUFMLEtBQXFCUCxDQUFDLENBQUNJLENBQUQsQ0FBM0IsQ0FBRCxFQUFpQ0UsQ0FBQyxJQUFFUCxLQUFLLENBQUNTLElBQU4sQ0FBV0osQ0FBWCxFQUFhRSxDQUFiLEVBQWUsQ0FBQyxDQUFoQixDQUFwQztBQUF1RCxHQUEvSDtBQUFpSTs7QUFBQVAsS0FBSyxDQUFDUyxJ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TCtDLENBZ0YvQztBQUNELEtBbjhDZ0IsQ0FtOENkOztBQW44Q2MsR0FBbkIsQ0F2RjRDLENBNGhEekM7QUFFSDtBQUNBOztBQUNBalIsRUFBQUEsQ0FBQyxDQUFDN0MsRUFBRixDQUFLOEMsVUFBTCxJQUFtQixVQUFXdkIsT0FBWCxFQUFxQjtBQUN0QyxXQUFPLEtBQUtxVixJQUFMLENBQVUsWUFBWTtBQUMzQixVQUFJLENBQUMvVCxDQUFDLENBQUMwRSxJQUFGLENBQU8sSUFBUCxFQUFhLFlBQVl6RSxVQUF6QixDQUFMLEVBQTJDO0FBQ3pDRCxRQUFBQSxDQUFDLENBQUMwRSxJQUFGLENBQU8sSUFBUCxFQUFhLFlBQVl6RSxVQUF6QixFQUFxQyxJQUFJQyxNQUFKLENBQVksSUFBWixFQUFrQnhCLE9BQWxCLENBQXJDO0FBQ0Q7QUFDRixLQUpNLENBQVA7QUFLRCxHQU5EO0FBUUQsQ0F4aURBLEVBd2lER2lYLE1BeGlESCxFQXdpRFc1YixNQXhpRFgsRUF3aURtQmpDLFFBeGlEbkIiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHRsaXRlKHQpe2RvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW92ZXJcIixmdW5jdGlvbihlKXt2YXIgaT1lLnRhcmdldCxuPXQoaSk7bnx8KG49KGk9aS5wYXJlbnRFbGVtZW50KSYmdChpKSksbiYmdGxpdGUuc2hvdyhpLG4sITApfSl9dGxpdGUuc2hvdz1mdW5jdGlvbih0LGUsaSl7dmFyIG49XCJkYXRhLXRsaXRlXCI7ZT1lfHx7fSwodC50b29sdGlwfHxmdW5jdGlvbih0LGUpe2Z1bmN0aW9uIG8oKXt0bGl0ZS5oaWRlKHQsITApfWZ1bmN0aW9uIGwoKXtyfHwocj1mdW5jdGlvbih0LGUsaSl7ZnVuY3Rpb24gbigpe28uY2xhc3NOYW1lPVwidGxpdGUgdGxpdGUtXCIrcitzO3ZhciBlPXQub2Zmc2V0VG9wLGk9dC5vZmZzZXRMZWZ0O28ub2Zmc2V0UGFyZW50PT09dCYmKGU9aT0wKTt2YXIgbj10Lm9mZnNldFdpZHRoLGw9dC5vZmZzZXRIZWlnaHQsZD1vLm9mZnNldEhlaWdodCxmPW8ub2Zmc2V0V2lkdGgsYT1pK24vMjtvLnN0eWxlLnRvcD0oXCJzXCI9PT1yP2UtZC0xMDpcIm5cIj09PXI/ZStsKzEwOmUrbC8yLWQvMikrXCJweFwiLG8uc3R5bGUubGVmdD0oXCJ3XCI9PT1zP2k6XCJlXCI9PT1zP2krbi1mOlwid1wiPT09cj9pK24rMTA6XCJlXCI9PT1yP2ktZi0xMDphLWYvMikrXCJweFwifXZhciBvPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpLGw9aS5ncmF2fHx0LmdldEF0dHJpYnV0ZShcImRhdGEtdGxpdGVcIil8fFwiblwiO28uaW5uZXJIVE1MPWUsdC5hcHBlbmRDaGlsZChvKTt2YXIgcj1sWzBdfHxcIlwiLHM9bFsxXXx8XCJcIjtuKCk7dmFyIGQ9by5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtyZXR1cm5cInNcIj09PXImJmQudG9wPDA/KHI9XCJuXCIsbigpKTpcIm5cIj09PXImJmQuYm90dG9tPndpbmRvdy5pbm5lckhlaWdodD8ocj1cInNcIixuKCkpOlwiZVwiPT09ciYmZC5sZWZ0PDA/KHI9XCJ3XCIsbigpKTpcIndcIj09PXImJmQucmlnaHQ+d2luZG93LmlubmVyV2lkdGgmJihyPVwiZVwiLG4oKSksby5jbGFzc05hbWUrPVwiIHRsaXRlLXZpc2libGVcIixvfSh0LGQsZSkpfXZhciByLHMsZDtyZXR1cm4gdC5hZGRFdmVudExpc3RlbmVyKFwibW91c2Vkb3duXCIsbyksdC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLG8pLHQudG9vbHRpcD17c2hvdzpmdW5jdGlvbigpe2Q9dC50aXRsZXx8dC5nZXRBdHRyaWJ1dGUobil8fGQsdC50aXRsZT1cIlwiLHQuc2V0QXR0cmlidXRlKG4sXCJcIiksZCYmIXMmJihzPXNldFRpbWVvdXQobCxpPzE1MDoxKSl9LGhpZGU6ZnVuY3Rpb24odCl7aWYoaT09PXQpe3M9Y2xlYXJUaW1lb3V0KHMpO3ZhciBlPXImJnIucGFyZW50Tm9kZTtlJiZlLnJlbW92ZUNoaWxkKHIpLHI9dm9pZCAwfX19fSh0LGUpKS5zaG93KCl9LHRsaXRlLmhpZGU9ZnVuY3Rpb24odCxlKXt0LnRvb2x0aXAmJnQudG9vbHRpcC5oaWRlKGUpfSxcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlJiZtb2R1bGUuZXhwb3J0cyYmKG1vZHVsZS5leHBvcnRzPXRsaXRlKTsiLCIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpKHsxOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcInVzZSBzdHJpY3RcIjt2YXIgX3ZhbGlkRm9ybT1yZXF1aXJlKFwiLi9zcmMvdmFsaWQtZm9ybVwiKTt2YXIgX3ZhbGlkRm9ybTI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdmFsaWRGb3JtKTtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iail7cmV0dXJuIG9iaiYmb2JqLl9fZXNNb2R1bGU/b2JqOntkZWZhdWx0Om9ian19d2luZG93LlZhbGlkRm9ybT1fdmFsaWRGb3JtMi5kZWZhdWx0O3dpbmRvdy5WYWxpZEZvcm0udG9nZ2xlSW52YWxpZENsYXNzPV92YWxpZEZvcm0udG9nZ2xlSW52YWxpZENsYXNzO3dpbmRvdy5WYWxpZEZvcm0uaGFuZGxlQ3VzdG9tTWVzc2FnZXM9X3ZhbGlkRm9ybS5oYW5kbGVDdXN0b21NZXNzYWdlczt3aW5kb3cuVmFsaWRGb3JtLmhhbmRsZUN1c3RvbU1lc3NhZ2VEaXNwbGF5PV92YWxpZEZvcm0uaGFuZGxlQ3VzdG9tTWVzc2FnZURpc3BsYXl9LHtcIi4vc3JjL3ZhbGlkLWZvcm1cIjozfV0sMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOnRydWV9KTtleHBvcnRzLmNsb25lPWNsb25lO2V4cG9ydHMuZGVmYXVsdHM9ZGVmYXVsdHM7ZXhwb3J0cy5pbnNlcnRBZnRlcj1pbnNlcnRBZnRlcjtleHBvcnRzLmluc2VydEJlZm9yZT1pbnNlcnRCZWZvcmU7ZXhwb3J0cy5mb3JFYWNoPWZvckVhY2g7ZXhwb3J0cy5kZWJvdW5jZT1kZWJvdW5jZTtmdW5jdGlvbiBjbG9uZShvYmope3ZhciBjb3B5PXt9O2Zvcih2YXIgYXR0ciBpbiBvYmope2lmKG9iai5oYXNPd25Qcm9wZXJ0eShhdHRyKSljb3B5W2F0dHJdPW9ialthdHRyXX1yZXR1cm4gY29weX1mdW5jdGlvbiBkZWZhdWx0cyhvYmosZGVmYXVsdE9iamVjdCl7b2JqPWNsb25lKG9ianx8e30pO2Zvcih2YXIgayBpbiBkZWZhdWx0T2JqZWN0KXtpZihvYmpba109PT11bmRlZmluZWQpb2JqW2tdPWRlZmF1bHRPYmplY3Rba119cmV0dXJuIG9ian1mdW5jdGlvbiBpbnNlcnRBZnRlcihyZWZOb2RlLG5vZGVUb0luc2VydCl7dmFyIHNpYmxpbmc9cmVmTm9kZS5uZXh0U2libGluZztpZihzaWJsaW5nKXt2YXIgX3BhcmVudD1yZWZOb2RlLnBhcmVudE5vZGU7X3BhcmVudC5pbnNlcnRCZWZvcmUobm9kZVRvSW5zZXJ0LHNpYmxpbmcpfWVsc2V7cGFyZW50LmFwcGVuZENoaWxkKG5vZGVUb0luc2VydCl9fWZ1bmN0aW9uIGluc2VydEJlZm9yZShyZWZOb2RlLG5vZGVUb0luc2VydCl7dmFyIHBhcmVudD1yZWZOb2RlLnBhcmVudE5vZGU7cGFyZW50Lmluc2VydEJlZm9yZShub2RlVG9JbnNlcnQscmVmTm9kZSl9ZnVuY3Rpb24gZm9yRWFjaChpdGVtcyxmbil7aWYoIWl0ZW1zKXJldHVybjtpZihpdGVtcy5mb3JFYWNoKXtpdGVtcy5mb3JFYWNoKGZuKX1lbHNle2Zvcih2YXIgaT0wO2k8aXRlbXMubGVuZ3RoO2krKyl7Zm4oaXRlbXNbaV0saSxpdGVtcyl9fX1mdW5jdGlvbiBkZWJvdW5jZShtcyxmbil7dmFyIHRpbWVvdXQ9dm9pZCAwO3ZhciBkZWJvdW5jZWRGbj1mdW5jdGlvbiBkZWJvdW5jZWRGbigpe2NsZWFyVGltZW91dCh0aW1lb3V0KTt0aW1lb3V0PXNldFRpbWVvdXQoZm4sbXMpfTtyZXR1cm4gZGVib3VuY2VkRm59fSx7fV0sMzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOnRydWV9KTtleHBvcnRzLnRvZ2dsZUludmFsaWRDbGFzcz10b2dnbGVJbnZhbGlkQ2xhc3M7ZXhwb3J0cy5oYW5kbGVDdXN0b21NZXNzYWdlcz1oYW5kbGVDdXN0b21NZXNzYWdlcztleHBvcnRzLmhhbmRsZUN1c3RvbU1lc3NhZ2VEaXNwbGF5PWhhbmRsZUN1c3RvbU1lc3NhZ2VEaXNwbGF5O2V4cG9ydHMuZGVmYXVsdD12YWxpZEZvcm07dmFyIF91dGlsPXJlcXVpcmUoXCIuL3V0aWxcIik7ZnVuY3Rpb24gdG9nZ2xlSW52YWxpZENsYXNzKGlucHV0LGludmFsaWRDbGFzcyl7aW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImludmFsaWRcIixmdW5jdGlvbigpe2lucHV0LmNsYXNzTGlzdC5hZGQoaW52YWxpZENsYXNzKX0pO2lucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLGZ1bmN0aW9uKCl7aWYoaW5wdXQudmFsaWRpdHkudmFsaWQpe2lucHV0LmNsYXNzTGlzdC5yZW1vdmUoaW52YWxpZENsYXNzKX19KX12YXIgZXJyb3JQcm9wcz1bXCJiYWRJbnB1dFwiLFwicGF0dGVybk1pc21hdGNoXCIsXCJyYW5nZU92ZXJmbG93XCIsXCJyYW5nZVVuZGVyZmxvd1wiLFwic3RlcE1pc21hdGNoXCIsXCJ0b29Mb25nXCIsXCJ0b29TaG9ydFwiLFwidHlwZU1pc21hdGNoXCIsXCJ2YWx1ZU1pc3NpbmdcIixcImN1c3RvbUVycm9yXCJdO2Z1bmN0aW9uIGdldEN1c3RvbU1lc3NhZ2UoaW5wdXQsY3VzdG9tTWVzc2FnZXMpe2N1c3RvbU1lc3NhZ2VzPWN1c3RvbU1lc3NhZ2VzfHx7fTt2YXIgbG9jYWxFcnJvclByb3BzPVtpbnB1dC50eXBlK1wiTWlzbWF0Y2hcIl0uY29uY2F0KGVycm9yUHJvcHMpO3ZhciB2YWxpZGl0eT1pbnB1dC52YWxpZGl0eTtmb3IodmFyIGk9MDtpPGxvY2FsRXJyb3JQcm9wcy5sZW5ndGg7aSsrKXt2YXIgcHJvcD1sb2NhbEVycm9yUHJvcHNbaV07aWYodmFsaWRpdHlbcHJvcF0pe3JldHVybiBpbnB1dC5nZXRBdHRyaWJ1dGUoXCJkYXRhLVwiK3Byb3ApfHxjdXN0b21NZXNzYWdlc1twcm9wXX19fWZ1bmN0aW9uIGhhbmRsZUN1c3RvbU1lc3NhZ2VzKGlucHV0LGN1c3RvbU1lc3NhZ2VzKXtmdW5jdGlvbiBjaGVja1ZhbGlkaXR5KCl7dmFyIG1lc3NhZ2U9aW5wdXQudmFsaWRpdHkudmFsaWQ/bnVsbDpnZXRDdXN0b21NZXNzYWdlKGlucHV0LGN1c3RvbU1lc3NhZ2VzKTtpbnB1dC5zZXRDdXN0b21WYWxpZGl0eShtZXNzYWdlfHxcIlwiKX1pbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIixjaGVja1ZhbGlkaXR5KTtpbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiaW52YWxpZFwiLGNoZWNrVmFsaWRpdHkpfWZ1bmN0aW9uIGhhbmRsZUN1c3RvbU1lc3NhZ2VEaXNwbGF5KGlucHV0LG9wdGlvbnMpe3ZhciB2YWxpZGF0aW9uRXJyb3JDbGFzcz1vcHRpb25zLnZhbGlkYXRpb25FcnJvckNsYXNzLHZhbGlkYXRpb25FcnJvclBhcmVudENsYXNzPW9wdGlvbnMudmFsaWRhdGlvbkVycm9yUGFyZW50Q2xhc3MsZXJyb3JQbGFjZW1lbnQ9b3B0aW9ucy5lcnJvclBsYWNlbWVudDtmdW5jdGlvbiBjaGVja1ZhbGlkaXR5KG9wdGlvbnMpe3ZhciBpbnNlcnRFcnJvcj1vcHRpb25zLmluc2VydEVycm9yO3ZhciBwYXJlbnROb2RlPWlucHV0LnBhcmVudE5vZGU7dmFyIGVycm9yTm9kZT1wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoXCIuXCIrdmFsaWRhdGlvbkVycm9yQ2xhc3MpfHxkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO2lmKCFpbnB1dC52YWxpZGl0eS52YWxpZCYmaW5wdXQudmFsaWRhdGlvbk1lc3NhZ2Upe2Vycm9yTm9kZS5jbGFzc05hbWU9dmFsaWRhdGlvbkVycm9yQ2xhc3M7ZXJyb3JOb2RlLnRleHRDb250ZW50PWlucHV0LnZhbGlkYXRpb25NZXNzYWdlO2lmKGluc2VydEVycm9yKXtlcnJvclBsYWNlbWVudD09PVwiYmVmb3JlXCI/KDAsX3V0aWwuaW5zZXJ0QmVmb3JlKShpbnB1dCxlcnJvck5vZGUpOigwLF91dGlsLmluc2VydEFmdGVyKShpbnB1dCxlcnJvck5vZGUpO3BhcmVudE5vZGUuY2xhc3NMaXN0LmFkZCh2YWxpZGF0aW9uRXJyb3JQYXJlbnRDbGFzcyl9fWVsc2V7cGFyZW50Tm9kZS5jbGFzc0xpc3QucmVtb3ZlKHZhbGlkYXRpb25FcnJvclBhcmVudENsYXNzKTtlcnJvck5vZGUucmVtb3ZlKCl9fWlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLGZ1bmN0aW9uKCl7Y2hlY2tWYWxpZGl0eSh7aW5zZXJ0RXJyb3I6ZmFsc2V9KX0pO2lucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnZhbGlkXCIsZnVuY3Rpb24oZSl7ZS5wcmV2ZW50RGVmYXVsdCgpO2NoZWNrVmFsaWRpdHkoe2luc2VydEVycm9yOnRydWV9KX0pfXZhciBkZWZhdWx0T3B0aW9ucz17aW52YWxpZENsYXNzOlwiaW52YWxpZFwiLHZhbGlkYXRpb25FcnJvckNsYXNzOlwidmFsaWRhdGlvbi1lcnJvclwiLHZhbGlkYXRpb25FcnJvclBhcmVudENsYXNzOlwiaGFzLXZhbGlkYXRpb24tZXJyb3JcIixjdXN0b21NZXNzYWdlczp7fSxlcnJvclBsYWNlbWVudDpcImJlZm9yZVwifTtmdW5jdGlvbiB2YWxpZEZvcm0oZWxlbWVudCxvcHRpb25zKXtpZighZWxlbWVudHx8IWVsZW1lbnQubm9kZU5hbWUpe3Rocm93IG5ldyBFcnJvcihcIkZpcnN0IGFyZyB0byB2YWxpZEZvcm0gbXVzdCBiZSBhIGZvcm0sIGlucHV0LCBzZWxlY3QsIG9yIHRleHRhcmVhXCIpfXZhciBpbnB1dHM9dm9pZCAwO3ZhciB0eXBlPWVsZW1lbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtvcHRpb25zPSgwLF91dGlsLmRlZmF1bHRzKShvcHRpb25zLGRlZmF1bHRPcHRpb25zKTtpZih0eXBlPT09XCJmb3JtXCIpe2lucHV0cz1lbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbnB1dCwgc2VsZWN0LCB0ZXh0YXJlYVwiKTtmb2N1c0ludmFsaWRJbnB1dChlbGVtZW50LGlucHV0cyl9ZWxzZSBpZih0eXBlPT09XCJpbnB1dFwifHx0eXBlPT09XCJzZWxlY3RcInx8dHlwZT09PVwidGV4dGFyZWFcIil7aW5wdXRzPVtlbGVtZW50XX1lbHNle3Rocm93IG5ldyBFcnJvcihcIk9ubHkgZm9ybSwgaW5wdXQsIHNlbGVjdCwgb3IgdGV4dGFyZWEgZWxlbWVudHMgYXJlIHN1cHBvcnRlZFwiKX12YWxpZEZvcm1JbnB1dHMoaW5wdXRzLG9wdGlvbnMpfWZ1bmN0aW9uIGZvY3VzSW52YWxpZElucHV0KGZvcm0saW5wdXRzKXt2YXIgZm9jdXNGaXJzdD0oMCxfdXRpbC5kZWJvdW5jZSkoMTAwLGZ1bmN0aW9uKCl7dmFyIGludmFsaWROb2RlPWZvcm0ucXVlcnlTZWxlY3RvcihcIjppbnZhbGlkXCIpO2lmKGludmFsaWROb2RlKWludmFsaWROb2RlLmZvY3VzKCl9KTsoMCxfdXRpbC5mb3JFYWNoKShpbnB1dHMsZnVuY3Rpb24oaW5wdXQpe3JldHVybiBpbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiaW52YWxpZFwiLGZvY3VzRmlyc3QpfSl9ZnVuY3Rpb24gdmFsaWRGb3JtSW5wdXRzKGlucHV0cyxvcHRpb25zKXt2YXIgaW52YWxpZENsYXNzPW9wdGlvbnMuaW52YWxpZENsYXNzLGN1c3RvbU1lc3NhZ2VzPW9wdGlvbnMuY3VzdG9tTWVzc2FnZXM7KDAsX3V0aWwuZm9yRWFjaCkoaW5wdXRzLGZ1bmN0aW9uKGlucHV0KXt0b2dnbGVJbnZhbGlkQ2xhc3MoaW5wdXQsaW52YWxpZENsYXNzKTtoYW5kbGVDdXN0b21NZXNzYWdlcyhpbnB1dCxjdXN0b21NZXNzYWdlcyk7aGFuZGxlQ3VzdG9tTWVzc2FnZURpc3BsYXkoaW5wdXQsb3B0aW9ucyl9KX19LHtcIi4vdXRpbFwiOjJ9XX0se30sWzFdKTsiLCIvLyBNaW5uUG9zdCBHaXZpbmcgcGx1Z2luXG4vLyB0aGUgc2VtaS1jb2xvbiBiZWZvcmUgZnVuY3Rpb24gaW52b2NhdGlvbiBpcyBhIHNhZmV0eSBuZXQgYWdhaW5zdCBjb25jYXRlbmF0ZWRcbi8vIHNjcmlwdHMgYW5kL29yIG90aGVyIHBsdWdpbnMgd2hpY2ggbWF5IG5vdCBiZSBjbG9zZWQgcHJvcGVybHkuXG47KGZ1bmN0aW9uICggJCwgd2luZG93LCBkb2N1bWVudCwgdW5kZWZpbmVkICkge1xuXG4gIC8vIHVuZGVmaW5lZCBpcyB1c2VkIGhlcmUgYXMgdGhlIHVuZGVmaW5lZCBnbG9iYWwgdmFyaWFibGUgaW4gRUNNQVNjcmlwdCAzIGlzXG4gIC8vIG11dGFibGUgKGllLiBpdCBjYW4gYmUgY2hhbmdlZCBieSBzb21lb25lIGVsc2UpLiB1bmRlZmluZWQgaXNuJ3QgcmVhbGx5IGJlaW5nXG4gIC8vIHBhc3NlZCBpbiBzbyB3ZSBjYW4gZW5zdXJlIHRoZSB2YWx1ZSBvZiBpdCBpcyB0cnVseSB1bmRlZmluZWQuIEluIEVTNSwgdW5kZWZpbmVkXG4gIC8vIGNhbiBubyBsb25nZXIgYmUgbW9kaWZpZWQuXG5cbiAgLy8gd2luZG93IGFuZCBkb2N1bWVudCBhcmUgcGFzc2VkIHRocm91Z2ggYXMgbG9jYWwgdmFyaWFibGUgcmF0aGVyIHRoYW4gZ2xvYmFsXG4gIC8vIGFzIHRoaXMgKHNsaWdodGx5KSBxdWlja2VucyB0aGUgcmVzb2x1dGlvbiBwcm9jZXNzIGFuZCBjYW4gYmUgbW9yZSBlZmZpY2llbnRseVxuICAvLyBtaW5pZmllZCAoZXNwZWNpYWxseSB3aGVuIGJvdGggYXJlIHJlZ3VsYXJseSByZWZlcmVuY2VkIGluIHlvdXIgcGx1Z2luKS5cblxuICAvLyBDcmVhdGUgdGhlIGRlZmF1bHRzIG9uY2VcbiAgdmFyIHBsdWdpbk5hbWUgPSAnbWlubnBvc3RfZ2l2aW5nJyxcbiAgZGVmYXVsdHMgPSB7XG4gICAgJ2RlYnVnJyA6IGZhbHNlLCAvLyB0aGlzIGNhbiBiZSBzZXQgdG8gdHJ1ZSBvbiBwYWdlIGxldmVsIG9wdGlvbnNcbiAgICAnc3RyaXBlX3B1Ymxpc2hhYmxlX2tleScgOiAnJyxcbiAgICAncGxhaWRfZW52JyA6ICcnLFxuICAgICdwbGFpZF9saW5rJyA6ICcjYXV0aG9yaXplLWFjaCcsXG4gICAgJ21pbm5wb3N0X3Jvb3QnIDogJ2h0dHBzOi8vd3d3Lm1pbm5wb3N0LmNvbScsXG4gICAgJ2FuYWx5dGljc190eXBlJyA6ICcnLFxuICAgICdwcm9ncmVzc19zZWxlY3RvcicgOiAnLm0tc3VwcG9ydC1wcm9ncmVzcycsXG4gICAgJ2Zvcm1fc2VsZWN0b3InIDogJy5tLWZvcm0nLFxuICAgICdkb25hdGVfZm9ybV9zZWxlY3Rvcic6ICcjZG9uYXRlJyxcbiAgICAnY29uZmlybV9mb3JtX3NlbGVjdG9yJyA6ICcjY29uZmlybScsXG4gICAgJ2ZpbmlzaF9zZWN0aW9uX3NlbGVjdG9yJyA6ICcjcGFuZWwtLWNvbmZpcm1hdGlvbicsXG4gICAgJ3BheV9jY19wcm9jZXNzaW5nX3NlbGVjdG9yJyA6ICdpbnB1dFtuYW1lPVwicGF5X2ZlZXNcIl0nLFxuICAgICdmZWVfYW1vdW50JyA6ICcucHJvY2Vzc2luZy1hbW91bnQnLFxuICAgICdsZXZlbF9hbW91bnRfc2VsZWN0b3InIDogJyNwYW5lbC0tcGF5IC5hbW91bnQgLmxldmVsLWFtb3VudCcsIC8vIHdlIGNhbiBtYXliZSBnZXQgcmlkIG9mIHRoaXNcbiAgICAnb3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yJyA6ICdbbmFtZT1cImFtb3VudFwiXScsXG4gICAgJ2ZhaXJfbWFya2V0X3ZhbHVlX3NlbGVjdG9yJyA6ICcjZmFpcl9tYXJrZXRfdmFsdWUnLFxuICAgICdmdWxsX2Ftb3VudF9zZWxlY3RvcicgOiAnLmZ1bGwtYW1vdW50JyxcbiAgICAnaW5zdGFsbG1lbnRfcGVyaW9kX3NlbGVjdG9yJyA6ICdbbmFtZT1cImluc3RhbGxtZW50X3BlcmlvZFwiXScsXG4gICAgJ25hbWVfc2VsZWN0b3InIDogJy5tLWZvcm0taXRlbS1kaXNwbGF5LW5hbWUnLFxuICAgICdpbl9ob25vcl9vcl9tZW1vcnlfZmllbGRfc2VsZWN0b3InIDogJy5tLWZvcm0taXRlbS1ob25vci1tZW1vcnknLFxuICAgICdob25vcl9vcl9tZW1vcnlfY2hvb3NlcicgOiAnaW5wdXRbbmFtZT1cImluX2hvbm9yX29yX21lbW9yeVwiXScsIC8vIHJhZGlvIGZpZWxkc1xuICAgICdob25vcl90eXBlX3NlbGVjdG9yJyA6ICcuYS1ob25vci10eXBlJywgLy8gc3BhbiBpbnNpZGUgbGFiZWxcbiAgICAnaG9ub3JfbWVtb3J5X2lucHV0X2dyb3VwJyA6ICcuYS1ob25vci1vci1tZW1vcnknLCAvLyBob2xkcyB0aGUgZm9ybSBmaWVsZFxuICAgICdhbm9ueW1vdXNfc2VsZWN0b3InIDogJyNhbm9ueW1vdXMnLFxuICAgICdzaG93X2JpbGxpbmdfY291bnRyeV9zZWxlY3RvcicgOiAnI2JpbGxpbmdfc2hvd19jb3VudHJ5JyxcbiAgICAnYmlsbGluZ19jb3VudHJ5X3NlbGVjdG9yJyA6ICcubS1mb3JtLWl0ZW0tY291bnRyeScsXG4gICAgJ3Nob3dfc2hpcHBpbmdfY291bnRyeV9zZWxlY3RvcicgOiAnI3NoaXBwaW5nX3Nob3dfY291bnRyeScsXG4gICAgJ3NoaXBwaW5nX2NvdW50cnlfc2VsZWN0b3InIDogJy5tLWZvcm0taXRlbS1zaGlwcGluZy1jb3VudHJ5JyxcbiAgICAnc2hpcHBpbmdfYWRkcmVzc19zZWxlY3RvcicgOiAnLm0tZm9ybS1pdGVtLXNoaXBwaW5nLWFkZHJlc3MnLFxuICAgICd1c2VfZm9yX3NoaXBwaW5nX3NlbGVjdG9yJyA6ICcjdXNlZm9yc2hpcHBpbmcnLFxuICAgICdlbWFpbF9maWVsZF9zZWxlY3RvcicgOiAnI2VtYWlsJyxcbiAgICAncGFzc3dvcmRfZmllbGRfc2VsZWN0b3InIDogJyNwYXNzd29yZCcsXG4gICAgJ2ZpcnN0X25hbWVfZmllbGRfc2VsZWN0b3InIDogJyNmaXJzdF9uYW1lJyxcbiAgICAnbGFzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yJyA6ICcjbGFzdF9uYW1lJyxcbiAgICAnYmlsbGluZ19zdHJlZXRfZmllbGRfc2VsZWN0b3InIDogJyNiaWxsaW5nX3N0cmVldCcsXG4gICAgJ2JpbGxpbmdfY2l0eV9maWVsZF9zZWxlY3RvcicgOiAnI2JpbGxpbmdfY2l0eScsXG4gICAgJ2JpbGxpbmdfc3RhdGVfZmllbGRfc2VsZWN0b3InIDogJyNiaWxsaW5nX3N0YXRlJyxcbiAgICAnYmlsbGluZ196aXBfZmllbGRfc2VsZWN0b3InOiAnI2JpbGxpbmdfemlwJyxcbiAgICAnYmlsbGluZ19jb3VudHJ5X2ZpZWxkX3NlbGVjdG9yJyA6ICcjYmlsbGluZ19jb3VudHJ5JyxcbiAgICAnc2hpcHBpbmdfc3RhdGVfZmllbGRfc2VsZWN0b3InIDogJyNzaGlwcGluZ19zdGF0ZScsXG4gICAgJ3NoaXBwaW5nX3ppcF9maWVsZF9zZWxlY3Rvcic6ICcjc2hpcHBpbmdfemlwJyxcbiAgICAnc2hpcHBpbmdfY291bnRyeV9maWVsZF9zZWxlY3RvcicgOiAnI3NoaXBwaW5nX2NvdW50cnknLFxuICAgICdjcmVhdGVfbXBfc2VsZWN0b3InIDogJyNjcmVhdGVtcGFjY291bnQnLFxuICAgICdwYXNzd29yZF9zZWxlY3RvcicgOiAnLm0tZm9ybS1pdGVtLXBhc3N3b3JkJyxcbiAgICAnYWRkaXRpb25hbF9hbW91bnRfZmllbGQnIDogJyNhZGRpdGlvbmFsX2RvbmF0aW9uJyxcbiAgICAnc2hpcHBpbmdfc2VsZWN0b3InIDogJ2ZpZWxkc2V0Lm0tc2hpcHBpbmctaW5mb3JtYXRpb24nLFxuICAgICdjaG9vc2VfcGF5bWVudCcgOiAnI2Nob29zZS1wYXltZW50LW1ldGhvZCcsXG4gICAgJ3BheW1lbnRfbWV0aG9kX3NlbGVjdG9yJyA6ICcucGF5bWVudC1tZXRob2QnLFxuICAgICdjY19udW1fc2VsZWN0b3InIDogJyNjYXJkLW51bWJlcicsXG4gICAgJ2NjX2V4cF9zZWxlY3RvcicgOiAnI2NhcmQtZXhwaXJ5JyxcbiAgICAnY2NfY3ZjX3NlbGVjdG9yJyA6ICcjY2FyZC1jdmMnLFxuICAgICdwYXlfYnV0dG9uX3NlbGVjdG9yJyA6ICcuYS1idXR0b24tcGF5JyxcbiAgICAnb3BwX2lkX3NlbGVjdG9yJyA6ICcjbG9ja19rZXknLCAvLyB3ZSB1c2UgdGhpcyB2YWx1ZSBhcyB0aGUgR29vZ2xlIEFuYWx5dGljcyB0cmFuc2FjdGlvbiBJRFxuICAgICduZXdzbGV0dGVyX2dyb3VwX3NlbGVjdG9yJyA6ICcuc3VwcG9ydC1uZXdzbGV0dGVycydcbiAgfTsgLy8gZW5kIGRlZmF1bHRzXG5cbiAgLy8gVGhlIGFjdHVhbCBwbHVnaW4gY29uc3RydWN0b3JcbiAgZnVuY3Rpb24gUGx1Z2luKCBlbGVtZW50LCBvcHRpb25zICkge1xuXG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcblxuICAgIC8vIGpRdWVyeSBoYXMgYW4gZXh0ZW5kIG1ldGhvZCB3aGljaCBtZXJnZXMgdGhlIGNvbnRlbnRzIG9mIHR3byBvclxuICAgIC8vIG1vcmUgb2JqZWN0cywgc3RvcmluZyB0aGUgcmVzdWx0IGluIHRoZSBmaXJzdCBvYmplY3QuIFRoZSBmaXJzdCBvYmplY3RcbiAgICAvLyBpcyBnZW5lcmFsbHkgZW1wdHkgYXMgd2UgZG9uJ3Qgd2FudCB0byBhbHRlciB0aGUgZGVmYXVsdCBvcHRpb25zIGZvclxuICAgIC8vIGZ1dHVyZSBpbnN0YW5jZXMgb2YgdGhlIHBsdWdpblxuICAgIHRoaXMub3B0aW9ucyA9ICQuZXh0ZW5kKCB7fSwgZGVmYXVsdHMsIG9wdGlvbnMgKTtcblxuICAgIHRoaXMuX2RlZmF1bHRzID0gZGVmYXVsdHM7XG4gICAgdGhpcy5fbmFtZSA9IHBsdWdpbk5hbWU7XG5cbiAgICB0aGlzLmluaXQoKTtcbiAgfSAvLyBlbmQgY29uc3RydWN0b3JcblxuICBQbHVnaW4ucHJvdG90eXBlID0ge1xuXG4gICAgaW5pdDogZnVuY3Rpb24ocmVzZXQsIGFtb3VudCkge1xuXG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoICduby1qcycgKTtcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCggJ2pzJyApO1xuXG4gICAgICAvLyBQbGFjZSBpbml0aWFsaXphdGlvbiBsb2dpYyBoZXJlXG4gICAgICAvLyBZb3UgYWxyZWFkeSBoYXZlIGFjY2VzcyB0byB0aGUgRE9NIGVsZW1lbnQgYW5kXG4gICAgICAvLyB0aGUgb3B0aW9ucyB2aWEgdGhlIGluc3RhbmNlLCBlLmcuIHRoaXMuZWxlbWVudFxuICAgICAgLy8gYW5kIHRoaXMub3B0aW9uc1xuICAgICAgLy8geW91IGNhbiBhZGQgbW9yZSBmdW5jdGlvbnMgbGlrZSB0aGUgb25lIGJlbG93IGFuZFxuICAgICAgLy8gY2FsbCB0aGVtIGxpa2Ugc286IHRoaXMueW91ck90aGVyRnVuY3Rpb24odGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpLlxuXG4gICAgICAvLyBtb2RpZnkgb3B0aW9ucyBhcyBuZWVkZWRcbiAgICAgIC8vdmFyIHRoaXMub3B0aW9ucy5hbW91bnQgPSAnJztcbiAgICAgIGlmIChyZXNldCAhPT0gdHJ1ZSkge1xuICAgICAgICB0aGlzLm9wdGlvbnMuYW1vdW50ID0gcGFyc2VGbG9hdCgkKHRoaXMub3B0aW9ucy5sZXZlbF9hbW91bnRfc2VsZWN0b3IsIHRoaXMuZWxlbWVudCkudGV4dCgpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5hbW91bnQgPSBhbW91bnQ7XG4gICAgICB9XG4gICAgICB0aGlzLm9wdGlvbnMub3JpZ2luYWxfYW1vdW50ICAgICA9IHBhcnNlSW50KCQodGhpcy5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudF9zZWxlY3RvciwgdGhpcy5lbGVtZW50KS52YWwoKSwgMTApO1xuICAgICAgdGhpcy5vcHRpb25zLnByb2Nlc3NpbmdfZmVlICAgICAgPSAoTWF0aC5yb3VuZChwYXJzZUZsb2F0KHRoaXMub3B0aW9ucy5mZWVfYW1vdW50KSpNYXRoLnBvdygxMCwyKSkvTWF0aC5wb3coMTAsMikpLnRvRml4ZWQoMik7XG4gICAgICB0aGlzLm9wdGlvbnMucHJvY2Vzc2luZ19mZWVfdGV4dCA9IHRoaXMub3B0aW9ucy5wcm9jZXNzaW5nX2ZlZTtcbiAgICAgIHRoaXMub3B0aW9ucy5jcmVhdGVfYWNjb3VudCAgICAgID0gZmFsc2U7XG5cbiAgICAgIHZhciBidXR0b25fdGV4dCA9ICQodGhpcy5vcHRpb25zLnBheV9idXR0b25fc2VsZWN0b3IpLnRleHQoKTtcbiAgICAgIHRoaXMub3B0aW9ucy5idXR0b25fdGV4dCA9IGJ1dHRvbl90ZXh0O1xuXG4gICAgICB0aGlzLnN0cmlwZSA9IFN0cmlwZSh0aGlzLm9wdGlvbnMuc3RyaXBlX3B1Ymxpc2hhYmxlX2tleSk7XG4gICAgICB0aGlzLmVsZW1lbnRzID0gdGhpcy5zdHJpcGUuZWxlbWVudHMoe1xuICAgICAgICBmb250czogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIC8vIGludGVncmF0ZSB5b3VyIGZvbnQgaW50byBzdHJpcGVcbiAgICAgICAgICAgIGNzc1NyYzogJ2h0dHBzOi8vdXNlLnR5cGVraXQubmV0L2N4ajdmemcuY3NzJyxcbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH0pO1xuXG4gICAgICBpZiAodGhpcy5vcHRpb25zLmRlYnVnID09PSB0cnVlKSB7XG4gICAgICAgIHRoaXMuZGVidWcodGhpcy5vcHRpb25zKTtcbiAgICAgICAgLy8gcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBjYWxsIGZ1bmN0aW9uc1xuICAgICAgdGhpcy5hbmFseXRpY3NUcmFja2luZyh0aGlzLm9wdGlvbnMpOyAvLyB0cmFjayBhbmFseXRpY3MgZXZlbnRzXG4gICAgICB0aGlzLmFtb3VudEFzUmFkaW8odGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBpZiB0aGUgYW1vdW50IGZpZWxkIGlzIGEgcmFkaW8gYnV0dG9uXG4gICAgICB0aGlzLmFtb3VudFVwZGF0ZWQodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBpZiB0aGUgYW1vdW50IHRleHQgZmllbGQgY2FuIGNoYW5nZVxuXG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMucGF5X2NjX3Byb2Nlc3Npbmdfc2VsZWN0b3IpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5jcmVkaXRDYXJkUHJvY2Vzc2luZ0ZlZXModGhpcy5vcHRpb25zKTsgLy8gcHJvY2Vzc2luZyBmZWVzXG4gICAgICB9XG4gICAgICBcbiAgICAgIC8vIHRoZSBtYWluIGZvcm0gSUQuIHRoaXMgaXMgbm90IHVzZWQgZm9yIGNhbmNlbGxpbmdcbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLmRvbmF0ZUFub255bW91c2x5KHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gYW5vbnltb3VzXG4gICAgICAgIHRoaXMuaG9ub3JPck1lbW9yeVRvZ2dsZSh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIGluIGhvbm9yIG9yIGluIG1lbW9yeSBvZiBzb21lb25lXG4gICAgICAgIHRoaXMub3V0c2lkZVVuaXRlZFN0YXRlcyh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIG91dHNpZGUgVVNcbiAgICAgICAgdGhpcy5zaGlwcGluZ0FkZHJlc3ModGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBzaGlwcGluZyBhZGRyZXNzXG4gICAgICAgIHRoaXMuYWxsb3dNaW5ucG9zdEFjY291bnQodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBvcHRpb24gZm9yIGNyZWF0aW5nIG1pbm5wb3N0IGFjY291bnRcbiAgICAgICAgdGhpcy5wYXltZW50UmVxdWVzdEJ1dHRvbih0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIGNyZWF0ZSBwYXltZW50cmVxdWVzdCBidXR0b25cbiAgICAgICAgdGhpcy5jaG9vc2VQYXltZW50TWV0aG9kKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gc3dpdGNoIGJldHdlZW4gY2FyZCBhbmQgYWNoXG4gICAgICAgIHRoaXMuY3JlZGl0Q2FyZEZpZWxkcyh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIGRvIHN0dWZmIHdpdGggdGhlIGNyZWRpdCBjYXJkIGZpZWxkc1xuICAgICAgICB0aGlzLnZhbGlkYXRlU2V0dXAodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBzZXR1cCBob3cgdmFsaWRhdGlvbiBlcnJvcnMgd29ya1xuICAgICAgICB0aGlzLmZvcm1TZXR1cCh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIHZhbGlkYXRlIGFuZCBzdWJtaXQgdGhlIGZvcm1cbiAgICAgIH1cblxuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmNvbmZpcm1fZm9ybV9zZWxlY3RvcikubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLnNob3dOZXdzbGV0dGVyU2V0dGluZ3ModGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpO1xuICAgICAgICB0aGlzLmNvbmZpcm1NZXNzYWdlU3VibWl0KHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gc3VibWl0IHRoZSBzdHVmZiBvbiB0aGUgY29uZmlybWF0aW9uIHBhZ2VcbiAgICAgIH1cblxuICAgIH0sIC8vIGluaXRcblxuICAgIGRlYnVnOiBmdW5jdGlvbihtZXNzYWdlKSB7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLmRlYnVnID09PSB0cnVlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgbWVzc2FnZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhtZXNzYWdlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmRpcihtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmRpcih0aGlzKTtcbiAgICAgIH1cbiAgICB9LCAvLyBkZWJ1Z1xuXG4gICAgYW5hbHl0aWNzVHJhY2tpbmc6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgIHRoaXMuZGVidWcoJ2FuYWx5dGljcyB0eXBlIGlzICcgKyBvcHRpb25zLmFuYWx5dGljc190eXBlKTtcbiAgICAgIHZhciBwcm9ncmVzcyA9ICQob3B0aW9ucy5wcm9ncmVzc19zZWxlY3Rvcik7XG4gICAgICB2YXIgc3RlcDtcbiAgICAgIHZhciBhY3Rpb24gPSAnY2hlY2tvdXQnO1xuICAgICAgdmFyIG5hdl9pdGVtX2NvdW50ID0gMDtcbiAgICAgIHZhciBvcHBfaWQgPSAkKG9wdGlvbnMub3BwX2lkX3NlbGVjdG9yKS52YWwoKTtcbiAgICAgIHZhciBwb3N0X3B1cmNoYXNlID0gZmFsc2U7XG4gICAgICBpZiAob3B0aW9ucy5hbmFseXRpY3NfdHlwZSA9PSAnYW5hbHl0aWNzanMnKSB7XG4gICAgICAgIGdhKCAncmVxdWlyZScsICdlYycgKTtcbiAgICAgIH1cbiAgICAgIGlmIChwcm9ncmVzcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIG5hdl9pdGVtX2NvdW50ID0gJCgnbGknLCBwcm9ncmVzcykubGVuZ3RoOyAvLyBsZW5ndGggaXMgbm90IHplcm8gYmFzZWRcbiAgICAgICAgc3RlcCA9ICQoJ2xpIC5hY3RpdmUnLCBwcm9ncmVzcykucGFyZW50KCkuaW5kZXgoKSArIDE7IC8vIGluZGV4IGlzIHplcm8gYmFzZWRcbiAgICAgIH1cbiAgICAgIC8vIHRoZXJlIGlzIGEgcHJvZ3Jlc3MgbWVudSwgQU5EIHRoZXJlIElTIE5PVCBhIGNvbmZpcm0gZm9ybSBzZWxlY3RvclxuICAgICAgLy8gaWYgdGhhdCBpcyB0aGUgY2FzZSwgd2UncmUgbm90IG9uIHRoZSBwdXJjaGFzZSBzdGVwXG4gICAgICBpZiAocHJvZ3Jlc3MubGVuZ3RoID4gMCAmJiAkKG9wdGlvbnMuY29uZmlybV9mb3JtX3NlbGVjdG9yKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgLy8gdGhlIGFjdGl2ZSB0YWIgbWF0Y2hlcyB0aGUgY291bnQgb2YgaXRlbXMgQU5EIHRoZXJlIGlzIE5PVCBhIGNvbmZpcm0gZm9ybSB0byBiZSBzdWJtaXR0ZWRcbiAgICAgICAgLy8gdGhhdCBtZWFucyB3ZSdyZSBvbiBhIHBvc3QgcHVyY2hhc2Ugc3RlcC5cbiAgICAgICAgaWYgKHN0ZXAgPT09IG5hdl9pdGVtX2NvdW50ICYmICQob3B0aW9ucy5jb25maXJtX2Zvcm1fc2VsZWN0b3IpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHN0ZXAgPSBzdGVwICsgMTtcbiAgICAgICAgICBwb3N0X3B1cmNoYXNlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChwcm9ncmVzcy5sZW5ndGggPiAwICYmICQob3B0aW9ucy5jb25maXJtX2Zvcm1fc2VsZWN0b3IpLmxlbmd0aCA+IDAgfHwgJChvcHRpb25zLmZpbmlzaF9zZWN0aW9uX3NlbGVjdG9yKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIC8vIHdlIGFyZSBvbiB0aGUgY29uZmlybSBmb3JtIHNlbGVjdG9yIGFuZCB0aGVyZSBpcyBhIHByb2dyZXNzIG1lYXN1cmVcbiAgICAgICAgLy8gT1IsIHdlIGFyZSBvbiB0aGUgZmluaXNoIHNlbGVjdG9yIGFuZCB0aGVyZSBpcyBOT1QgYSBwcm9ncmVzcyBtZWFzdXJlXG4gICAgICAgIC8vIHRoZXNlIG1lYW4gdGhlIHVzZXIganVzdCBwdXJjaGFzZWQuXG4gICAgICAgIGFjdGlvbiA9ICdwdXJjaGFzZSc7XG4gICAgICB9IGVsc2UgaWYgKHByb2dyZXNzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLmRlYnVnKCAnc3RlcCBpcyAnICsgc3RlcCArICcgYW5kIG5hdiBpdGVtIGNvdW50IGlzICcgKyBuYXZfaXRlbV9jb3VudCArICcgYW5kIG9wcCBpZCBpcyAnICsgb3BwX2lkICsgJyBhbmQgcG9zdCBwdXJjaGFzZSBpcyAnICsgcG9zdF9wdXJjaGFzZSApO1xuICAgICAgdGhpcy5hbmFseXRpY3NUcmFja2luZ1N0ZXAoc3RlcCwgYWN0aW9uLCBwb3N0X3B1cmNoYXNlKTtcbiAgICB9LCAvLyBhbmFseXRpY3NUcmFja2luZ1xuXG4gICAgYW5hbHl0aWNzVHJhY2tpbmdTdGVwOiBmdW5jdGlvbihzdGVwLCBhY3Rpb24sIHBvc3RfcHVyY2hhc2UpIHtcbiAgICAgIHZhciBwcm9ncmVzcyA9ICQodGhpcy5vcHRpb25zLnByb2dyZXNzX3NlbGVjdG9yKTtcbiAgICAgIHZhciBhbW91bnQgPSAkKHRoaXMub3B0aW9ucy5vcmlnaW5hbF9hbW91bnRfc2VsZWN0b3IpLnZhbCgpO1xuICAgICAgdmFyIG9wcF9pZCA9ICQodGhpcy5vcHRpb25zLm9wcF9pZF9zZWxlY3RvcikudmFsKCk7XG4gICAgICB2YXIgaW5zdGFsbG1lbnRfcGVyaW9kID0gJ29uZS10aW1lJztcbiAgICAgIHZhciBsZXZlbDtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5pbnN0YWxsbWVudF9wZXJpb2Rfc2VsZWN0b3IpLmxlbmd0aCA+IDAgKSB7XG4gICAgICAgIGluc3RhbGxtZW50X3BlcmlvZCA9ICQodGhpcy5vcHRpb25zLmluc3RhbGxtZW50X3BlcmlvZF9zZWxlY3RvcikudmFsKCk7XG4gICAgICB9XG4gICAgICAvLyBpZiB3ZSdyZSBub3QgYWZ0ZXIgdGhlIHB1cmNoYXNlLCB1c2UgYWRkUHJvZHVjdFxuICAgICAgLy9pZiAocHJvZ3Jlc3MubGVuZ3RoID4gMCAmJiBwb3N0X3B1cmNoYXNlICE9PSB0cnVlKSB7XG4gICAgICBpZiAocHJvZ3Jlc3MubGVuZ3RoID4gMCkge1xuICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICBhbW91bnQ6IGFtb3VudCxcbiAgICAgICAgICBpbnN0YWxsbWVudF9wZXJpb2Q6IGluc3RhbGxtZW50X3BlcmlvZFxuICAgICAgICB9O1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIHVybDogJy9jYWxjdWxhdGUtbWVtYmVyLWxldmVsLycsXG4gICAgICAgICAgZGF0YTogZGF0YVxuICAgICAgICB9KS5kb25lKGZ1bmN0aW9uKCBkYXRhICkge1xuICAgICAgICAgIGlmICgkKGRhdGEubGV2ZWwpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxldmVsID0gZGF0YS5sZXZlbC5sZXZlbDtcbiAgICAgICAgICAgIHRoYXQuZGVidWcoJ2NyZWF0ZSBwcm9kdWN0IG9iamVjdDogaWQgaXMgJyArICdtaW5ucG9zdF8nICsgbGV2ZWwudG9Mb3dlckNhc2UoKSArICdfbWVtYmVyc2hpcCcgKyAnIGFuZCBuYW1lIGlzICcgKyAnTWlublBvc3QgJyArIGxldmVsLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgbGV2ZWwuc2xpY2UoMSkgKyAnIE1lbWJlcnNoaXAnICsgJyBhbmQgdmFyaWFudCBpcyAnICsgaW5zdGFsbG1lbnRfcGVyaW9kLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgaW5zdGFsbG1lbnRfcGVyaW9kLnNsaWNlKDEpKTtcbiAgICAgICAgICAgIHZhciBwcm9kdWN0ID0ge1xuICAgICAgICAgICAgICAnaWQnOiAnbWlubnBvc3RfJyArIGxldmVsLnRvTG93ZXJDYXNlKCkgKyAnX21lbWJlcnNoaXAnLFxuICAgICAgICAgICAgICAnbmFtZSc6ICdNaW5uUG9zdCAnICsgbGV2ZWwuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBsZXZlbC5zbGljZSgxKSArICcgTWVtYmVyc2hpcCcsXG4gICAgICAgICAgICAgICdjYXRlZ29yeSc6ICdEb25hdGlvbicsXG4gICAgICAgICAgICAgICdicmFuZCc6ICdNaW5uUG9zdCcsXG4gICAgICAgICAgICAgICd2YXJpYW50JzogaW5zdGFsbG1lbnRfcGVyaW9kLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgaW5zdGFsbG1lbnRfcGVyaW9kLnNsaWNlKDEpLFxuICAgICAgICAgICAgICAncHJpY2UnOiB0aGF0LmdldFRvdGFsQW1vdW50KGFtb3VudCksXG4gICAgICAgICAgICAgICdxdWFudGl0eSc6IDFcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAodGhhdC5vcHRpb25zLmFuYWx5dGljc190eXBlID09ICdndGFnanMnKSB7XG4gICAgICAgICAgICAgIGd0YWcoJ2V2ZW50JywgJ2NoZWNrb3V0X3Byb2dyZXNzJywge1xuICAgICAgICAgICAgICAgIFwidmFsdWVcIjogdGhhdC5nZXRUb3RhbEFtb3VudChhbW91bnQpLFxuICAgICAgICAgICAgICAgIFwiaXRlbXNcIjogW3Byb2R1Y3RdLFxuICAgICAgICAgICAgICAgIFwiY2hlY2tvdXRfc3RlcFwiOiBzdGVwLFxuICAgICAgICAgICAgICAgIFwiY2hlY2tvdXRfb3B0aW9uXCI6IGFjdGlvbixcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoYXQub3B0aW9ucy5hbmFseXRpY3NfdHlwZSA9PSAnYW5hbHl0aWNzanMnKSB7XG4gICAgICAgICAgICAgIGdhKCdlYzphZGRQcm9kdWN0JywgcHJvZHVjdCk7XG4gICAgICAgICAgICAgIGdhKCdlYzpzZXRBY3Rpb24nLCAnY2hlY2tvdXQnLCB7XG4gICAgICAgICAgICAgICAgJ3N0ZXAnOiBzdGVwLFxuICAgICAgICAgICAgICAgICdvcHRpb24nOiBhY3Rpb25cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChhY3Rpb24gPT09ICdwdXJjaGFzZScpIHtcbiAgICAgICAgICAgICAgdGhhdC5kZWJ1ZygnYWRkIGEgcHVyY2hhc2UgYWN0aW9uLiBzdGVwIGlzICcgKyBzdGVwICsgJyBhbmQgYWN0aW9uIGlzICcgKyBhY3Rpb24pO1xuICAgICAgICAgICAgICBpZiAodGhhdC5vcHRpb25zLmFuYWx5dGljc190eXBlID09ICdndGFnanMnKSB7XG4gICAgICAgICAgICAgICAgZ3RhZygnZXZlbnQnLCBhY3Rpb24sIHtcbiAgICAgICAgICAgICAgICAgIFwidHJhbnNhY3Rpb25faWRcIjogb3BwX2lkLCAvLyBUcmFuc2FjdGlvbiBpZCAtIFR5cGU6IHN0cmluZ1xuICAgICAgICAgICAgICAgICAgXCJhZmZpbGlhdGlvblwiOiAnTWlublBvc3QnLCAvLyBTdG9yZSBuYW1lIC0gVHlwZTogc3RyaW5nXG4gICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IHRoYXQuZ2V0VG90YWxBbW91bnQoYW1vdW50KSwgLy8gVG90YWwgUmV2ZW51ZSAtIFR5cGU6IG51bWVyaWNcbiAgICAgICAgICAgICAgICAgIFwiY3VycmVuY3lcIjogXCJVU0RcIixcbiAgICAgICAgICAgICAgICAgIFwiaXRlbXNcIjogW3Byb2R1Y3RdLFxuICAgICAgICAgICAgICAgICAgXCJjaGVja291dF9zdGVwXCI6IHN0ZXBcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGF0Lm9wdGlvbnMuYW5hbHl0aWNzX3R5cGUgPT0gJ2FuYWx5dGljc2pzJykge1xuICAgICAgICAgICAgICAgIGdhKCdlYzpzZXRBY3Rpb24nLCBhY3Rpb24sIHtcbiAgICAgICAgICAgICAgICAgICdpZCc6IG9wcF9pZCwgLy8gVHJhbnNhY3Rpb24gaWQgLSBUeXBlOiBzdHJpbmdcbiAgICAgICAgICAgICAgICAgICdhZmZpbGlhdGlvbic6ICdNaW5uUG9zdCcsIC8vIFN0b3JlIG5hbWUgLSBUeXBlOiBzdHJpbmdcbiAgICAgICAgICAgICAgICAgICdyZXZlbnVlJzogYW1vdW50LCAvLyBUb3RhbCBSZXZlbnVlIC0gVHlwZTogbnVtZXJpY1xuICAgICAgICAgICAgICAgICAgJ3N0ZXAnOiBzdGVwXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgXG4gICAgICAgICAgICBpZiAodGhhdC5vcHRpb25zLmFuYWx5dGljc190eXBlID09ICdndGFnanMnKSB7XG4gICAgICAgICAgICAgIGd0YWcoJ2V2ZW50JywgJ3BhZ2VfdmlldycsIHtcbiAgICAgICAgICAgICAgICBwYWdlX3RpdGxlOiBkb2N1bWVudC50aXRsZSxcbiAgICAgICAgICAgICAgICBwYWdlX3BhdGg6IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZVxuICAgICAgICAgICAgICB9KSAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoYXQub3B0aW9ucy5hbmFseXRpY3NfdHlwZSA9PSAnYW5hbHl0aWNzanMnKSB7XG4gICAgICAgICAgICAgIGdhKCdzZXQnLCB7XG4gICAgICAgICAgICAgICAgcGFnZTogd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLFxuICAgICAgICAgICAgICAgIHRpdGxlOiBkb2N1bWVudC50aXRsZVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgZ2EoJ3NlbmQnLCAncGFnZXZpZXcnLCB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgXG5cbiAgICB9LCAvLyBhbmFseXRpY3NUcmFja2luZ1N0ZXBcblxuICAgIGFtb3VudEFzUmFkaW86IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIC8vIHdoZW4gYW1vdW50IGZpZWxkIGlzIGEgcmFkaW8gYnV0dG9uLCB3ZSBuZWVkIHRvIGNoZWNrIGl0IHdoZW5ldmVyIGl0IGNoYW5nZXNcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHRoYXQuc2V0UmFkaW9BbW91bnQoJChvcHRpb25zLm9yaWdpbmFsX2Ftb3VudF9zZWxlY3RvciwgZWxlbWVudCksIGVsZW1lbnQsIG9wdGlvbnMpO1xuICAgICAgJChvcHRpb25zLm9yaWdpbmFsX2Ftb3VudF9zZWxlY3RvciwgZWxlbWVudCkuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGF0LnNldFJhZGlvQW1vdW50KCQodGhpcyksIGVsZW1lbnQsIG9wdGlvbnMpO1xuICAgICAgfSk7XG4gICAgfSwgLy8gYW1vdW50QXNSYWRpb1xuXG4gICAgc2V0UmFkaW9BbW91bnQ6IGZ1bmN0aW9uKGZpZWxkLCBlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB2YXIgc3RyaXBlX3BheW1lbnRfdHlwZSA9IHRoYXQuZ2V0U3RyaXBlUGF5bWVudFR5cGUoKTtcbiAgICAgIHZhciBhbW91bnQgPSAkKG9wdGlvbnMub3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yICsgJzpjaGVja2VkJywgZWxlbWVudCkudmFsKCk7XG4gICAgICBpZiAoZmllbGQuaXMoJzpyYWRpbycpICYmIHR5cGVvZiBhbW91bnQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIG9wdGlvbnMub3JpZ2luYWxfYW1vdW50ID0gcGFyc2VJbnQoYW1vdW50LCAxMCk7XG4gICAgICAgIHRoYXQuY2FsY3VsYXRlRmVlcyh0aGF0Lm9wdGlvbnMub3JpZ2luYWxfYW1vdW50LCBzdHJpcGVfcGF5bWVudF90eXBlKTtcbiAgICAgICAgdGhhdC5zZXRGYWlyTWFya2V0VmFsdWUoZmllbGQpO1xuICAgICAgfVxuICAgIH0sIC8vIHNldFJhZGlvQW1vdW50XG5cbiAgICBhbW91bnRVcGRhdGVkOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICAvLyB3aGVuIG5ldyBhbW91bnQgdGV4dCBmaWVsZCBjYW4gY2hhbmdlLCB3ZSBuZWVkIHRvIGNoYW5nZSB0aGUgaGlkZGVuIGZpZWxkXG4gICAgICAvLyB0aGVyZSBpcyBhbHNvIHBvdGVudGlhbGx5IGFuIGFkZGl0aW9uYWwgYW1vdW50IGZpZWxkIHZhbHVlIHRvIGFkZFxuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdmFyIHN0cmlwZV9wYXltZW50X3R5cGUgPSB0aGF0LmdldFN0cmlwZVBheW1lbnRUeXBlKCk7XG5cbiAgICAgIC8vIHNldCB0aGUgZmFpciBtYXJrZXQgdmFsdWUgaWYgYXBwbGljYWJsZVxuICAgICAgdmFyIGFtb3VudF9zZWxlY3Rvcl9mYWlyX21hcmtldCA9ICQob3B0aW9ucy5vcmlnaW5hbF9hbW91bnRfc2VsZWN0b3IsIGVsZW1lbnQpO1xuICAgICAgaWYgKGFtb3VudF9zZWxlY3Rvcl9mYWlyX21hcmtldC5pcygnOnJhZGlvJykpIHtcbiAgICAgICAgYW1vdW50X3NlbGVjdG9yX2ZhaXJfbWFya2V0ID0gJChvcHRpb25zLm9yaWdpbmFsX2Ftb3VudF9zZWxlY3RvciArICc6Y2hlY2tlZCcsIGVsZW1lbnQpO1xuICAgICAgfVxuICAgICAgdGhhdC5zZXRGYWlyTWFya2V0VmFsdWUoYW1vdW50X3NlbGVjdG9yX2ZhaXJfbWFya2V0KTtcblxuICAgICAgJChvcHRpb25zLm9yaWdpbmFsX2Ftb3VudF9zZWxlY3RvciwgZWxlbWVudCkuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGF0Lm9wdGlvbnMub3JpZ2luYWxfYW1vdW50ID0gcGFyc2VJbnQoJCh0aGlzLCBlbGVtZW50KS52YWwoKSwgMTApO1xuICAgICAgICB0aGF0LmNhbGN1bGF0ZUZlZXModGhhdC5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCwgc3RyaXBlX3BheW1lbnRfdHlwZSk7XG4gICAgICAgIHRoYXQuc2V0RmFpck1hcmtldFZhbHVlKCQodGhpcywgZWxlbWVudCkpO1xuICAgICAgfSk7XG4gICAgICAkKG9wdGlvbnMuYWRkaXRpb25hbF9hbW91bnRfZmllbGQsIGVsZW1lbnQpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgdGhhdC5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCA9IHBhcnNlSW50KCQob3B0aW9ucy5vcmlnaW5hbF9hbW91bnRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLCAxMCk7XG4gICAgICAgIHRoYXQuY2FsY3VsYXRlRmVlcyh0aGF0Lm9wdGlvbnMub3JpZ2luYWxfYW1vdW50LCBzdHJpcGVfcGF5bWVudF90eXBlKTtcbiAgICAgIH0pO1xuXG4gICAgfSwgLy8gYW1vdW50VXBkYXRlZFxuXG4gICAgZ2V0VG90YWxBbW91bnQ6IGZ1bmN0aW9uKGFtb3VudCkge1xuICAgICAgYW1vdW50ID0gKHR5cGVvZiBhbW91bnQgIT09ICd1bmRlZmluZWQnKSA/ICBhbW91bnQgOiB0aGlzLm9wdGlvbnMub3JpZ2luYWxfYW1vdW50O1xuICAgICAgdmFyIHRvdGFsX2Ftb3VudCA9IGFtb3VudDtcbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5hZGRpdGlvbmFsX2Ftb3VudF9maWVsZCkubGVuZ3RoID4gMCAmJiAkKHRoaXMub3B0aW9ucy5hZGRpdGlvbmFsX2Ftb3VudF9maWVsZCkudmFsKCkgPiAwKSB7XG4gICAgICAgIHZhciBhZGRpdGlvbmFsX2Ftb3VudCA9ICQodGhpcy5vcHRpb25zLmFkZGl0aW9uYWxfYW1vdW50X2ZpZWxkKS52YWwoKTtcbiAgICAgICAgdG90YWxfYW1vdW50ID0gcGFyc2VJbnQoYWRkaXRpb25hbF9hbW91bnQsIDEwKSArIHBhcnNlSW50KGFtb3VudCwgMTApOyBcbiAgICAgIH1cbiAgICAgIHJldHVybiB0b3RhbF9hbW91bnQ7XG4gICAgfSwgLy8gZ2V0VG90YWxBbW91bnRcblxuICAgIHNldEZhaXJNYXJrZXRWYWx1ZTogZnVuY3Rpb24oYW1vdW50X3NlbGVjdG9yKSB7XG4gICAgICAvLyBpZiB0aGVyZSBpcyBhIGZhaXIgbWFya2V0IHZhbHVlIGZpZWxkIGFuZCB0aGVyZSBpcyBhIGZhaXItbWFya2V0LXZhbHVlIGRhdGEgYXR0cmlidXRlXG4gICAgICAvLyBjaGVjayBhbmQgc2VlIGlmIHdlIGNhbiBwb3B1bGF0ZSB0aGUgZmllbGQgd2l0aCB0aGUgZGF0YSBhdHRyaWJ1dGVcbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5mYWlyX21hcmtldF92YWx1ZV9zZWxlY3RvcikubGVuZ3RoID4gMCAmJiB0eXBlb2YgYW1vdW50X3NlbGVjdG9yLmRhdGEoJ2ZhaXItbWFya2V0LXZhbHVlJykgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHZhciBmYWlyTWFya2V0VmFsdWUgPSBhbW91bnRfc2VsZWN0b3IuZGF0YSgnZmFpci1tYXJrZXQtdmFsdWUnKTtcbiAgICAgICAgJCh0aGlzLm9wdGlvbnMuZmFpcl9tYXJrZXRfdmFsdWVfc2VsZWN0b3IpLnZhbChmYWlyTWFya2V0VmFsdWUpO1xuICAgICAgfVxuICAgIH0sIC8vIHNldEZhaXJNYXJrZXRWYWx1ZVxuXG4gICAgY2FsY3VsYXRlRmVlczogZnVuY3Rpb24oYW1vdW50LCBzdHJpcGVfcGF5bWVudF90eXBlKSB7XG4gICAgICAvLyB0aGlzIHNlbmRzIHRoZSBhbW91bnQgYW5kIHN0cmlwZSBwYXltZW50IHR5cGUgdG8gcHl0aG9uOyBnZXQgdGhlIGZlZSBhbmQgZGlzcGxheSBpdCB0byB0aGUgdXNlciBvbiB0aGUgY2hlY2tib3ggbGFiZWxcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHZhciB0b3RhbF9hbW91bnQgPSB0aGF0LmdldFRvdGFsQW1vdW50KGFtb3VudCk7XG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgYW1vdW50OiB0b3RhbF9hbW91bnQsXG4gICAgICAgIHN0cmlwZV9wYXltZW50X3R5cGU6IHN0cmlwZV9wYXltZW50X3R5cGVcbiAgICAgIH07XG4gICAgICB0aGF0LnNldFN0cmlwZVBheW1lbnRUeXBlKHN0cmlwZV9wYXltZW50X3R5cGUpO1xuICAgICAgJC5hamF4KHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIHVybDogJy9jYWxjdWxhdGUtZmVlcy8nLFxuICAgICAgICBkYXRhOiBkYXRhXG4gICAgICB9KS5kb25lKGZ1bmN0aW9uKCBkYXRhICkge1xuICAgICAgICBpZiAoJChkYXRhLmZlZXMpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAkKHRoYXQub3B0aW9ucy5mZWVfYW1vdW50KS50ZXh0KHBhcnNlRmxvYXQoZGF0YS5mZWVzKS50b0ZpeGVkKDIpKTtcbiAgICAgICAgICB0aGF0LmNyZWRpdENhcmRGZWVDaGVja2JveCgkKHRoYXQub3B0aW9ucy5wYXlfY2NfcHJvY2Vzc2luZ19zZWxlY3RvcikpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LCAvLyBjYWxjdWxhdGVGZWVzXG5cbiAgICBjcmVkaXRDYXJkUHJvY2Vzc2luZ0ZlZXM6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgIC8vIHRoaXMgYWRkcyBvciBzdWJ0cmFjdHMgdGhlIGZlZSB0byB0aGUgb3JpZ2luYWwgYW1vdW50IHdoZW4gdGhlIHVzZXIgaW5kaWNhdGVzIHRoZXkgZG8gb3IgZG8gbm90IHdhbnQgdG8gcGF5IHRoZSBmZWVzXG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB0aGF0LmNyZWRpdENhcmRGZWVDaGVja2JveCgkKG9wdGlvbnMucGF5X2NjX3Byb2Nlc3Npbmdfc2VsZWN0b3IpKTtcbiAgICAgICQob3B0aW9ucy5wYXlfY2NfcHJvY2Vzc2luZ19zZWxlY3Rvcikub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB0aGF0LmNyZWRpdENhcmRGZWVDaGVja2JveCh0aGlzKTtcbiAgICAgIH0pO1xuICAgIH0sIC8vIGNyZWRpdENhcmRQcm9jZXNzaW5nRmVlc1xuXG4gICAgZ2V0U3RyaXBlUGF5bWVudFR5cGU6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHN0cmlwZV9wYXltZW50X3R5cGUgPSAnY2FyZCc7XG4gICAgICBpZiAoJCgnaW5wdXRbbmFtZT1cInN0cmlwZV9wYXltZW50X3R5cGVcIl0nKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHN0cmlwZV9wYXltZW50X3R5cGUgPSAkKCdpbnB1dFtuYW1lPVwic3RyaXBlX3BheW1lbnRfdHlwZVwiXScpLnZhbCgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN0cmlwZV9wYXltZW50X3R5cGU7XG4gICAgfSwgLy8gZ2V0U3RyaXBlUGF5bWVudFR5cGVcblxuICAgIHNldFN0cmlwZVBheW1lbnRUeXBlOiBmdW5jdGlvbihzdHJpcGVfcGF5bWVudF90eXBlKSB7XG4gICAgICBpZiAoJCgnaW5wdXRbbmFtZT1cInN0cmlwZV9wYXltZW50X3R5cGVcIl0nKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgJCh0aGlzLm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLmFwcGVuZCgnPGlucHV0IHR5cGU9XFxcImhpZGRlblxcXCIgbmFtZT1cXFwic3RyaXBlX3BheW1lbnRfdHlwZVxcXCI+Jyk7XG4gICAgICB9XG4gICAgICAkKCdpbnB1dFtuYW1lPVwic3RyaXBlX3BheW1lbnRfdHlwZVwiXScpLnZhbChzdHJpcGVfcGF5bWVudF90eXBlKTtcbiAgICAgIHJldHVybiBzdHJpcGVfcGF5bWVudF90eXBlO1xuICAgIH0sIC8vIHNldFN0cmlwZVBheW1lbnRUeXBlXG5cbiAgICBjcmVkaXRDYXJkRmVlQ2hlY2tib3g6IGZ1bmN0aW9uKGZpZWxkKSB7XG4gICAgICB2YXIgZnVsbF9hbW91bnQ7XG4gICAgICB2YXIgdG90YWxfYW1vdW50ID0gdGhpcy5nZXRUb3RhbEFtb3VudCgpO1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgaWYgKCQoZmllbGQpLmlzKCc6Y2hlY2tlZCcpIHx8ICQoZmllbGQpLnByb3AoJ2NoZWNrZWQnKSkge1xuICAgICAgICAkKCcuYW1vdW50IC5sZXZlbC1hbW91bnQnKS5hZGRDbGFzcygnZnVsbC1hbW91bnQnKTtcbiAgICAgICAgZnVsbF9hbW91bnQgPSAodG90YWxfYW1vdW50ICsgcGFyc2VGbG9hdCgkKHRoYXQub3B0aW9ucy5mZWVfYW1vdW50KS50ZXh0KCkpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZ1bGxfYW1vdW50ID0gdG90YWxfYW1vdW50O1xuICAgICAgfVxuICAgICAgZnVsbF9hbW91bnQgPSBwYXJzZUZsb2F0KGZ1bGxfYW1vdW50KS50b0ZpeGVkKDIpO1xuICAgICAgJCh0aGF0Lm9wdGlvbnMuZnVsbF9hbW91bnRfc2VsZWN0b3IpLnRleHQoZnVsbF9hbW91bnQpO1xuXG4gICAgICAvLyB1cGRhdGUgdGhlIHBheW1lbnQgcmVxdWVzdFxuICAgICAgaWYgKHRoaXMucGF5bWVudFJlcXVlc3QgJiYgZnVsbF9hbW91bnQpIHtcbiAgICAgICAgdGhpcy5wYXltZW50UmVxdWVzdC51cGRhdGUoe1xuICAgICAgICAgIHRvdGFsOiB7XG4gICAgICAgICAgICBsYWJlbDogXCJNaW5uUG9zdFwiLFxuICAgICAgICAgICAgYW1vdW50OiBmdWxsX2Ftb3VudCAqIDEwMFxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICB9LCAvLyBjcmVkaXRDYXJkRmVlQ2hlY2tib3hcblxuICAgIGRvbmF0ZUFub255bW91c2x5OiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB0aGF0LnRvZ2dsZUFub255bW91cygkKG9wdGlvbnMuYW5vbnltb3VzX3NlbGVjdG9yLCBlbGVtZW50KSk7XG4gICAgICAkKG9wdGlvbnMuYW5vbnltb3VzX3NlbGVjdG9yLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoYXQudG9nZ2xlQW5vbnltb3VzKCQodGhpcykpO1xuICAgICAgfSk7XG4gICAgfSwgLy8gZG9uYXRlQW5vbnltb3VzbHlcblxuICAgIHRvZ2dsZUFub255bW91czogZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgaWYgKGVsZW1lbnQuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgJCh0aGlzLm9wdGlvbnMubmFtZV9zZWxlY3RvciArICcgZGl2OmZpcnN0JywgdGhpcy5lbGVtZW50KS5oaWRlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkKHRoaXMub3B0aW9ucy5uYW1lX3NlbGVjdG9yICsgJyBkaXY6Zmlyc3QnLCB0aGlzLmVsZW1lbnQpLnNob3coKTtcbiAgICAgIH1cbiAgICB9LCAvLyB0b2dnbGVBbm9ueW1vdXNcblxuICAgIGhvbm9yT3JNZW1vcnk6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIGlmICgkKG9wdGlvbnMuaG9ub3Jfb3JfbWVtb3J5X2Nob29zZXIgKyAnOmNoZWNrZWQnKS52YWwoKSkge1xuICAgICAgICAkKG9wdGlvbnMuaG9ub3JfbWVtb3J5X2lucHV0X2dyb3VwLCBlbGVtZW50KS5zaG93KCk7XG4gICAgICAgICQob3B0aW9ucy5ob25vcl90eXBlX3NlbGVjdG9yKS50ZXh0KCQob3B0aW9ucy5ob25vcl9vcl9tZW1vcnlfY2hvb3NlciArICc6Y2hlY2tlZCcpLnZhbCgpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQob3B0aW9ucy5ob25vcl9tZW1vcnlfaW5wdXRfZ3JvdXAsIGVsZW1lbnQpLmhpZGUoKTtcbiAgICAgICAgJChvcHRpb25zLmhvbm9yX25hbWVfc2VsZWN0b3IgKyAnIGlucHV0JywgZWxlbWVudCkudmFsKCcnKTtcbiAgICAgIH1cbiAgICB9LCAvLyBob25vck9yTWVtb3J5XG5cbiAgICBob25vck9yTWVtb3J5VG9nZ2xlOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB0aGF0Lmhvbm9yT3JNZW1vcnkodGhhdC5lbGVtZW50LCB0aGF0Lm9wdGlvbnMpO1xuICAgICAgJChvcHRpb25zLmhvbm9yX29yX21lbW9yeV9jaG9vc2VyLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoYXQuaG9ub3JPck1lbW9yeSh0aGF0LmVsZW1lbnQsIHRoYXQub3B0aW9ucyk7XG4gICAgICB9KTtcbiAgICB9LCAvLyBob25vck9yTWVtb3J5VG9nZ2xlXG5cbiAgICBvdXRzaWRlVW5pdGVkU3RhdGVzOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAkKG9wdGlvbnMuc2hvd19iaWxsaW5nX2NvdW50cnlfc2VsZWN0b3IpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGF0LmNoYW5nZUZpZWxkc091dHNpZGVVUygnYmlsbGluZycsIGVsZW1lbnQsIG9wdGlvbnMpO1xuICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmhpZGUoKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSk7XG4gICAgICAkKG9wdGlvbnMuc2hvd19zaGlwcGluZ19jb3VudHJ5X3NlbGVjdG9yKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgJChvcHRpb25zLnNoaXBwaW5nX2NvdW50cnlfc2VsZWN0b3IpLnNob3coKTtcbiAgICAgICAgdGhhdC5jaGFuZ2VGaWVsZHNPdXRzaWRlVVMoJ3NoaXBwaW5nJywgZWxlbWVudCwgb3B0aW9ucyk7XG4gICAgICAgICQodGhpcykucGFyZW50KCkuaGlkZSgpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9LCAvLyBvdXRzaWRlVW5pdGVkU3RhdGVzXG5cbiAgICBjaGFuZ2VGaWVsZHNPdXRzaWRlVVM6IGZ1bmN0aW9uKGJpbGxpbmdfb3Jfc2hpcHBpbmcsIGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIGlmICggYmlsbGluZ19vcl9zaGlwcGluZyA9PT0gJ2JpbGxpbmcnICkge1xuICAgICAgICB2YXIgemlwX3BhcmVudCA9ICQob3B0aW9ucy5iaWxsaW5nX3ppcF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkucGFyZW50KCk7XG4gICAgICAgIHZhciBzdGF0ZV9wYXJlbnQgPSAkKG9wdGlvbnMuYmlsbGluZ19zdGF0ZV9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkucGFyZW50KCk7XG4gICAgICAgICQob3B0aW9ucy5iaWxsaW5nX2NvdW50cnlfc2VsZWN0b3IpLnNob3coKTtcbiAgICAgICAgJChvcHRpb25zLmJpbGxpbmdfemlwX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5hdHRyKCd0eXBlJywgJ3RleHQnKTtcbiAgICAgICAgJChvcHRpb25zLmJpbGxpbmdfemlwX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgICAgJChvcHRpb25zLmJpbGxpbmdfc3RhdGVfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuICAgICAgICAkKCdsYWJlbCcsIHppcF9wYXJlbnQpLnRleHQoJ1Bvc3RhbCBDb2RlOicpO1xuICAgICAgICAkKCdsYWJlbCcsIHN0YXRlX3BhcmVudCkudGV4dCgnUmVnaW9uOicpO1xuICAgICAgfSBlbHNlIGlmICggYmlsbGluZ19vcl9zaGlwcGluZyA9PT0gJ3NoaXBwaW5nJyApIHtcbiAgICAgICAgdmFyIHppcF9wYXJlbnQgPSAkKG9wdGlvbnMuc2hpcHBpbmdfemlwX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKTtcbiAgICAgICAgdmFyIHN0YXRlX3BhcmVudCA9ICQob3B0aW9ucy5zaGlwcGluZ19zdGF0ZV9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkucGFyZW50KCk7XG4gICAgICAgICQob3B0aW9ucy5zaGlwcGluZ19jb3VudHJ5X3NlbGVjdG9yKS5zaG93KCk7XG4gICAgICAgICQob3B0aW9ucy5zaGlwcGluZ196aXBfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLmF0dHIoJ3R5cGUnLCAndGV4dCcpO1xuICAgICAgICAkKG9wdGlvbnMuc2hpcHBpbmdfemlwX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgICAgJChvcHRpb25zLnNoaXBwaW5nX3N0YXRlX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgICAgJCgnbGFiZWwnLCB6aXBfcGFyZW50KS50ZXh0KCdTaGlwcGluZyBQb3N0YWwgQ29kZTonKTtcbiAgICAgICAgJCgnbGFiZWwnLCBzdGF0ZV9wYXJlbnQpLnRleHQoJ1NoaXBwaW5nIFJlZ2lvbjonKTtcbiAgICAgIH1cbiAgICB9LCAvLyBjaGFuZ2VGaWVsZHNPdXRzaWRlVVNcblxuICAgIGNoYW5nZUZpZWxkc0luc2lkZVVTOiBmdW5jdGlvbihiaWxsaW5nX29yX3NoaXBwaW5nLCBlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICBpZiAoIGJpbGxpbmdfb3Jfc2hpcHBpbmcgPT09ICdiaWxsaW5nJyApIHtcbiAgICAgICAgdmFyIHppcF9wYXJlbnQgPSAkKG9wdGlvbnMuYmlsbGluZ196aXBfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpO1xuICAgICAgICB2YXIgc3RhdGVfcGFyZW50ID0gJChvcHRpb25zLmJpbGxpbmdfc3RhdGVfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpO1xuICAgICAgICAkKG9wdGlvbnMuYmlsbGluZ19jb3VudHJ5X3NlbGVjdG9yKS5zaG93KCk7XG4gICAgICAgICQob3B0aW9ucy5iaWxsaW5nX3ppcF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkuYXR0cigndHlwZScsICd0ZWwnKTtcbiAgICAgICAgJChvcHRpb25zLmJpbGxpbmdfemlwX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5wcm9wKCdyZXF1aXJlZCcsIHRydWUpO1xuICAgICAgICAkKG9wdGlvbnMuYmlsbGluZ19zdGF0ZV9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkucHJvcCgncmVxdWlyZWQnLCB0cnVlKTtcbiAgICAgICAgJCgnbGFiZWwnLCB6aXBfcGFyZW50KS5odG1sKCdaaXAgQ29kZTogPHNwYW4gY2xhc3M9XCJhLWZvcm0taXRlbS1yZXF1aXJlZFwiIHRpdGxlPVwiVGhpcyBmaWVsZCBpcyByZXF1aXJlZC5cIj4qPC9zcGFuPicpO1xuICAgICAgICAkKCdsYWJlbCcsIHN0YXRlX3BhcmVudCkuaHRtbCgnU3RhdGU6IDxzcGFuIGNsYXNzPVwiYS1mb3JtLWl0ZW0tcmVxdWlyZWRcIiB0aXRsZT1cIlRoaXMgZmllbGQgaXMgcmVxdWlyZWQuXCI+Kjwvc3Bhbj4nKTtcbiAgICAgIH0gZWxzZSBpZiAoIGJpbGxpbmdfb3Jfc2hpcHBpbmcgPT09ICdzaGlwcGluZycgKSB7XG4gICAgICAgIHZhciB6aXBfcGFyZW50ID0gJChvcHRpb25zLnNoaXBwaW5nX3ppcF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkucGFyZW50KCk7XG4gICAgICAgIHZhciBzdGF0ZV9wYXJlbnQgPSAkKG9wdGlvbnMuc2hpcHBpbmdfc3RhdGVfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpO1xuICAgICAgICAkKG9wdGlvbnMuc2hpcHBpbmdfY291bnRyeV9zZWxlY3Rvcikuc2hvdygpO1xuICAgICAgICAkKG9wdGlvbnMuc2hpcHBpbmdfemlwX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5hdHRyKCd0eXBlJywgJ3RlbCcpO1xuICAgICAgICAkKG9wdGlvbnMuc2hpcHBpbmdfemlwX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5wcm9wKCdyZXF1aXJlZCcsIHRydWUpO1xuICAgICAgICAkKG9wdGlvbnMuc2hpcHBpbmdfc3RhdGVfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnByb3AoJ3JlcXVpcmVkJywgdHJ1ZSk7XG4gICAgICAgICQoJ2xhYmVsJywgemlwX3BhcmVudCkuaHRtbCgnU2hpcHBpbmcgWmlwIENvZGU6IDxzcGFuIGNsYXNzPVwiYS1mb3JtLWl0ZW0tcmVxdWlyZWRcIiB0aXRsZT1cIlRoaXMgZmllbGQgaXMgcmVxdWlyZWQuXCI+Kjwvc3Bhbj4nKTtcbiAgICAgICAgJCgnbGFiZWwnLCBzdGF0ZV9wYXJlbnQpLmh0bWwoJ1NoaXBwaW5nIFN0YXRlOiA8c3BhbiBjbGFzcz1cImEtZm9ybS1pdGVtLXJlcXVpcmVkXCIgdGl0bGU9XCJUaGlzIGZpZWxkIGlzIHJlcXVpcmVkLlwiPio8L3NwYW4+Jyk7XG4gICAgICB9XG4gICAgfSwgLy8gY2hhbmdlRmllbGRzT3V0c2lkZVVTXG5cbiAgICBzaGlwcGluZ0FkZHJlc3M6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHZhciBzaG93X3NoaXBwaW5nID0gZmFsc2U7XG4gICAgICBpZiAoJChvcHRpb25zLnVzZV9mb3Jfc2hpcHBpbmdfc2VsZWN0b3IpLmxlbmd0aCA+IDApIHsgLy8gd2UgaGF2ZSBhIHNoaXBwaW5nIGNoZWNrYm94XG4gICAgICAgIHNob3dfc2hpcHBpbmcgPSB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKHNob3dfc2hpcHBpbmcgPT09IHRydWUgKSB7XG4gICAgICAgICQob3B0aW9ucy51c2VfZm9yX3NoaXBwaW5nX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKS5zaG93KCk7XG4gICAgICAgIGlmICgkKG9wdGlvbnMudXNlX2Zvcl9zaGlwcGluZ19zZWxlY3RvciwgZWxlbWVudCkuaXMoJzpjaGVja2VkJykpIHsgLy8gdXNlIHNhbWUgYXMgYmlsbGluZ1xuICAgICAgICAgICQob3B0aW9ucy5zaGlwcGluZ19zZWxlY3RvcikuaGlkZSgpO1xuICAgICAgICB9IGVsc2UgeyAvLyBzZXBhcmF0ZSBzaGlwcGluZyBhbmQgYmlsbGluZ1xuICAgICAgICAgICQob3B0aW9ucy5zaGlwcGluZ19zZWxlY3Rvcikuc2hvdygpO1xuICAgICAgICB9XG4gICAgICAgICQob3B0aW9ucy51c2VfZm9yX3NoaXBwaW5nX3NlbGVjdG9yLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdGhhdC5zaGlwcGluZ0FkZHJlc3MoZWxlbWVudCwgb3B0aW9ucyk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgXG4gICAgfSwgLy8gc2hpcHBpbmdBZGRyZXNzXG5cbiAgICBhbGxvd01pbm5wb3N0QWNjb3VudDogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdmFyIGFjY291bnRfZXhpc3RzID0gZmFsc2U7XG5cbiAgICAgIC8vIHNob3cgcGFzc3dvcmQgYXMgdGV4dFxuICAgICAgdGhhdC5zaG93UGFzc3dvcmQoKTtcblxuICAgICAgLy8gY2FsY3VsYXRlIHBhc3N3b3JkIHN0cmVuZ3RoXG4gICAgICB0aGF0LnNob3dQYXNzd29yZFN0cmVuZ3RoKCk7XG4gICAgICBcbiAgICAgIHRoYXQuc3BhbUVtYWlsKCQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkpO1xuICAgICAgJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoYXQuc3BhbUVtYWlsKCQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoYXQudG9nZ2xlQWNjb3VudEZpZWxkcygkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KSk7XG4gICAgICAkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoYXQudG9nZ2xlQWNjb3VudEZpZWxkcygkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KSk7XG4gICAgICB9KTtcblxuICAgICAgZnVuY3Rpb24gZG9uZVR5cGluZyAoKSB7XG4gICAgICAgIHZhciBlbWFpbCA9ICQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCk7XG4gICAgICAgIGFjY291bnRfZXhpc3RzID0gdGhhdC5jaGVja01pbm5wb3N0QWNjb3VudChlbGVtZW50LCBvcHRpb25zLCBlbWFpbCk7XG4gICAgICB9XG5cbiAgICAgIC8vc2V0dXAgYmVmb3JlIGZ1bmN0aW9uc1xuICAgICAgdmFyIHR5cGluZ1RpbWVyOyAgICAgICAgICAgICAgICAvL3RpbWVyIGlkZW50aWZpZXJcbiAgICAgIHZhciBkb25lVHlwaW5nSW50ZXJ2YWwgPSA1MDAwOyAgLy90aW1lIGluIG1zLCA1IHNlY29uZCBmb3IgZXhhbXBsZVxuXG4gICAgICAvL29uIGtleXVwLCBzdGFydCB0aGUgY291bnRkb3duXG4gICAgICAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLmtleXVwKGZ1bmN0aW9uKCl7XG4gICAgICAgIGNsZWFyVGltZW91dCh0eXBpbmdUaW1lcik7XG4gICAgICAgIGlmICgkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCkge1xuICAgICAgICAgIHR5cGluZ1RpbWVyID0gc2V0VGltZW91dChkb25lVHlwaW5nLCBkb25lVHlwaW5nSW50ZXJ2YWwpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LCAvLyBhbGxvd01pbm5wb3N0QWNjb3VudFxuXG4gICAgc3BhbUVtYWlsOiBmdW5jdGlvbihlbWFpbF9maWVsZCkge1xuICAgICAgdmFyIHNwYW1FcnJvckNvbnRhaW5lciA9IGVtYWlsX2ZpZWxkLnBhcmVudCgpO1xuICAgICAgaWYgKCQoJy5hLXNwYW0tZW1haWwnLCBzcGFtRXJyb3JDb250YWluZXIpLmxlbmd0aCA9PT0gMCApIHtcbiAgICAgICAgc3BhbUVycm9yQ29udGFpbmVyLmFwcGVuZCgnPHAgY2xhc3M9XCJhLWZvcm0tY2FwdGlvbiBhLXZhbGlkYXRpb24tZXJyb3IgYS1zcGFtLWVtYWlsXCI+VGhpcyBlbWFpbCBhZGRyZXNzIGhhcyBiZWVuIGRldGVjdGVkIGFzIGEgc3BhbW1lci48L3A+Jyk7XG4gICAgICB9XG4gICAgICAkKCcuYS1zcGFtLWVtYWlsJywgc3BhbUVycm9yQ29udGFpbmVyKS5oaWRlKCk7XG4gICAgICBzcGFtRXJyb3JDb250YWluZXIucmVtb3ZlQ2xhc3MoJ2ludmFsaWQgYS1lcnJvcicpO1xuICAgIH0sIC8vIHNwYW1FbWFpbFxuXG4gICAgdG9nZ2xlQWNjb3VudEZpZWxkczogZnVuY3Rpb24oY3JlYXRlX2FjY291bnRfc2VsZWN0b3IpIHtcbiAgICAgIGlmIChjcmVhdGVfYWNjb3VudF9zZWxlY3Rvci5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICBjcmVhdGVfYWNjb3VudF9zZWxlY3Rvci5wYXJlbnQoKS5iZWZvcmUoJzxwIGNsYXNzPVwiYS1mb3JtLWNhcHRpb24gYS1hY2NvdW50LWV4aXN0cyBhLWFjY291bnQtZXhpc3RzLXN1Y2Nlc3NcIj5UaGVyZSBpcyBhbHJlYWR5IGEgTWlublBvc3QuY29tIGFjY291bnQgd2l0aCB0aGlzIGVtYWlsIGFkZHJlc3MuPC9wPicpO1xuICAgICAgICAkKCcuYS1hY2NvdW50LWV4aXN0cycpLmhpZGUoKTtcbiAgICAgICAgJCh0aGlzLm9wdGlvbnMucGFzc3dvcmRfc2VsZWN0b3IsIHRoaXMuZWxlbWVudCkuc2hvdygpO1xuICAgICAgICB0aGlzLm9wdGlvbnMuY3JlYXRlX2FjY291bnQgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJCh0aGlzLm9wdGlvbnMucGFzc3dvcmRfc2VsZWN0b3IsIHRoaXMuZWxlbWVudCkuaGlkZSgpO1xuICAgICAgfVxuICAgIH0sIC8vIHRvZ2dsZUFjY291bnRGaWVsZHNcblxuICAgIHNob3dQYXNzd29yZDogZnVuY3Rpb24oKSB7XG4gICAgICAvLyBDYWNoZSBvdXIganF1ZXJ5IGVsZW1lbnRzXG4gICAgICB2YXIgJHN1Ym1pdCA9ICQoJy5idG4tc3VibWl0Jyk7XG4gICAgICB2YXIgJGNvbnRhaW5lciA9ICQodGhpcy5vcHRpb25zLnBhc3N3b3JkX3NlbGVjdG9yLCB0aGlzLmVsZW1lbnQpO1xuICAgICAgdmFyICRmaWVsZCA9ICQoJ2lucHV0W25hbWU9XCJwYXNzd29yZFwiXScsICRjb250YWluZXIpO1xuICAgICAgJCgnLmEtYWNjb3VudC1leGlzdHMnKS5oaWRlKCk7XG4gICAgICB2YXIgc2hvd19wYXNzID0gJzxkaXYgY2xhc3M9XCJhLWZvcm0tc2hvdy1wYXNzd29yZCBhLWZvcm0tY2FwdGlvblwiPjxsYWJlbD48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgbmFtZT1cInNob3dfcGFzc3dvcmRcIiBpZD1cInNob3ctcGFzc3dvcmQtY2hlY2tib3hcIiB2YWx1ZT1cIjFcIj4gU2hvdyBwYXNzd29yZDwvbGFiZWw+PC9kaXY+JztcbiAgICAgIC8vIEluamVjdCB0aGUgdG9nZ2xlIGJ1dHRvbiBpbnRvIHRoZSBwYWdlXG4gICAgICAkY29udGFpbmVyLmFwcGVuZCggc2hvd19wYXNzICk7XG4gICAgICAvLyBDYWNoZSB0aGUgdG9nZ2xlIGJ1dHRvblxuICAgICAgdmFyICR0b2dnbGUgPSAkKCcjc2hvdy1wYXNzd29yZC1jaGVja2JveCcpO1xuICAgICAgLy8gVG9nZ2xlIHRoZSBmaWVsZCB0eXBlXG4gICAgICAkdG9nZ2xlLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgdmFyIGNoZWNrYm94ID0gJCh0aGlzKTtcbiAgICAgICAgaWYgKGNoZWNrYm94LmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgICAgJGZpZWxkLmF0dHIoJ3R5cGUnLCAndGV4dCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICRmaWVsZC5hdHRyKCd0eXBlJywgJ3Bhc3N3b3JkJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgLy8gU2V0IHRoZSBmb3JtIGZpZWxkIGJhY2sgdG8gYSByZWd1bGFyIHBhc3N3b3JkIGVsZW1lbnRcbiAgICAgICRzdWJtaXQub24oICdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgJGZpZWxkLmF0dHIoJ3R5cGUnLCAncGFzc3dvcmQnKTtcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBzaG93UGFzc3dvcmRTdHJlbmd0aDogZnVuY3Rpb24oKSB7XG4gICAgICAvLyBjaGVja1Bhc3N3b3JkU3RyZW5ndGhcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIGlmICgkKCcuYS1wYXNzd29yZC1zdHJlbmd0aCcpLmxlbmd0aCA+IDAgKSB7XG4gICAgICAgIHZhciAkYmVmb3JlID0gJCgnLmEtZm9ybS1zaG93LXBhc3N3b3JkJyk7XG4gICAgICAgICRiZWZvcmUuYWZ0ZXIoICQoJzxkaXYgY2xhc3M9XCJhLXBhc3N3b3JkLXN0cmVuZ3RoXCI+PG1ldGVyIG1heD1cIjRcIiBpZD1cInBhc3N3b3JkLXN0cmVuZ3RoXCI+PGRpdj48L2Rpdj48L21ldGVyPjxwIGNsYXNzPVwiYS1mb3JtLWNhcHRpb25cIiBpZD1cInBhc3N3b3JkLXN0cmVuZ3RoLXRleHRcIj48L3A+PC9kaXY+JykpO1xuICAgICAgICAkKCAnYm9keScgKS5vbiggJ2tleXVwJywgJ2lucHV0W25hbWU9cGFzc3dvcmRdJyxcbiAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoYXQuY2hlY2tQYXNzd29yZFN0cmVuZ3RoKFxuICAgICAgICAgICAgICAkKCdpbnB1dFtuYW1lPXBhc3N3b3JkXScpLCAvLyBQYXNzd29yZCBmaWVsZFxuICAgICAgICAgICAgICAkKCcjcGFzc3dvcmQtc3RyZW5ndGgnKSwgICAgICAgICAgIC8vIFN0cmVuZ3RoIG1ldGVyXG4gICAgICAgICAgICAgICQoJyNwYXNzd29yZC1zdHJlbmd0aC10ZXh0JykgICAgICAvLyBTdHJlbmd0aCB0ZXh0IGluZGljYXRvclxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSwgLy8gc2hvd1Bhc3N3b3JkU3RyZW5ndGhcblxuICAgIGNoZWNrUGFzc3dvcmRTdHJlbmd0aDogZnVuY3Rpb24oICRwYXNzd29yZCwgJHN0cmVuZ3RoTWV0ZXIsICRzdHJlbmd0aFRleHQgKSB7XG4gICAgICB2YXIgcGFzc3dvcmQgPSAkcGFzc3dvcmQudmFsKCk7XG4gICAgICAvLyBHZXQgdGhlIHBhc3N3b3JkIHN0cmVuZ3RoXG4gICAgICB2YXIgcmVzdWx0ID0genhjdmJuKHBhc3N3b3JkKTtcbiAgICAgIHZhciBzdHJlbmd0aCA9IHJlc3VsdC5zY29yZTtcblxuICAgICAgJHN0cmVuZ3RoVGV4dC5yZW1vdmVDbGFzcyggJ3Nob3J0IGJhZCBnb29kIHN0cm9uZycgKTtcblxuICAgICAgLy8gQWRkIHRoZSBzdHJlbmd0aCBtZXRlciByZXN1bHRzXG4gICAgICBzd2l0Y2ggKCBzdHJlbmd0aCApIHtcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICRzdHJlbmd0aFRleHQuYWRkQ2xhc3MoICdiYWQnICkuaHRtbCggJ1N0cmVuZ3RoOiA8c3Ryb25nPldlYWs8L3N0cm9uZz4nICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAkc3RyZW5ndGhUZXh0LmFkZENsYXNzKCAnZ29vZCcgKS5odG1sKCAnU3RyZW5ndGg6IDxzdHJvbmc+TWVkaXVtPC9zdHJvbmc+JyApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgJHN0cmVuZ3RoVGV4dC5hZGRDbGFzcyggJ3N0cm9uZycgKS5odG1sKCAnU3RyZW5ndGg6IDxzdHJvbmc+U3Ryb25nPC9zdHJvbmc+JyApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgJHN0cmVuZ3RoVGV4dC5hZGRDbGFzcyggJ3Nob3J0JyApLmh0bWwoICdTdHJlbmd0aDogPHN0cm9uZz5WZXJ5IHdlYWs8L3N0cm9uZz4nICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgJHN0cmVuZ3RoVGV4dC5hZGRDbGFzcyggJ3Nob3J0JyApLmh0bWwoICdTdHJlbmd0aDogPHN0cm9uZz5WZXJ5IHdlYWs8L3N0cm9uZz4nICk7XG4gICAgICB9XG4gICAgICAkc3RyZW5ndGhNZXRlci52YWwoc3RyZW5ndGgpO1xuICAgICAgcmV0dXJuIHN0cmVuZ3RoO1xuICAgIH0sIC8vIGNoZWNrUGFzc3dvcmRTdHJlbmd0aFxuXG4gICAgY2hlY2tNaW5ucG9zdEFjY291bnQ6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMsIGVtYWlsKSB7XG4gICAgICB2YXIgdXNlciA9IHtcbiAgICAgICAgZW1haWw6IGVtYWlsXG4gICAgICB9O1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgJC5hamF4KHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgdXJsOiBvcHRpb25zLm1pbm5wb3N0X3Jvb3QgKyAnL3dwLWpzb24vdXNlci1hY2NvdW50LW1hbmFnZW1lbnQvdjEvY2hlY2stYWNjb3VudCcsXG4gICAgICAgIGRhdGE6IHVzZXJcbiAgICAgIH0pLmRvbmUoZnVuY3Rpb24oIHJlc3VsdCApIHtcbiAgICAgICAgaWYgKHJlc3VsdC5zdGF0dXMgPT09ICdzdWNjZXNzJyAmJiByZXN1bHQucmVhc29uID09PSAndXNlciBleGlzdHMnKSB7IC8vIHVzZXIgZXhpc3RzXG4gICAgICAgICAgaWYgKCQob3B0aW9ucy5jcmVhdGVfbXBfc2VsZWN0b3IsIGVsZW1lbnQpLmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgICAgICAkKG9wdGlvbnMucGFzc3dvcmRfc2VsZWN0b3IsIGVsZW1lbnQpLmhpZGUoKTtcbiAgICAgICAgICAgICQob3B0aW9ucy5jcmVhdGVfbXBfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpLmhpZGUoKTtcbiAgICAgICAgICAgICQoJy5hLWFjY291bnQtZXhpc3RzJywgZWxlbWVudCkuc2hvdygpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KS5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgICAgICAgJChvcHRpb25zLnBhc3N3b3JkX3NlbGVjdG9yLCBlbGVtZW50KS5oaWRlKCk7XG4gICAgICAgICAgICAgICQob3B0aW9ucy5jcmVhdGVfbXBfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpLmhpZGUoKTtcbiAgICAgICAgICAgICAgJCgnLmEtYWNjb3VudC1leGlzdHMnLCBlbGVtZW50KS5zaG93KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoIHJlc3VsdC5zdGF0dXMgPT09ICdzcGFtJyApIHtcbiAgICAgICAgICAkKHRoYXQub3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvcikuYWRkQ2xhc3MoJ2ludmFsaWQgYS1lcnJvcicpO1xuICAgICAgICAgICQoICcuYS1zcGFtLWVtYWlsJykuc2hvdygpO1xuICAgICAgICB9IGVsc2UgeyAvLyB1c2VyIGRvZXMgbm90IGV4aXN0IG9yIGFqYXggY2FsbCBmYWlsZWRcbiAgICAgICAgICBpZiAoJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgICAgICQob3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgZWxlbWVudCkuc2hvdygpO1xuICAgICAgICAgICAgb3B0aW9ucy5jcmVhdGVfYWNjb3VudCA9IHRydWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQob3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgZWxlbWVudCkuaGlkZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAkKCcuYS1hY2NvdW50LWV4aXN0cycsIGVsZW1lbnQpLmhpZGUoKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sIC8vIGNoZWNrTWlubnBvc3RBY2NvdW50XG5cbiAgICBwYXltZW50UmVxdWVzdEJ1dHRvbjogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdmFyIHRvdGFsX2Ftb3VudCA9IHRoYXQuZ2V0VG90YWxBbW91bnQoKTtcbiAgICAgIHRoYXQucGF5bWVudFJlcXVlc3QgPSB0aGF0LnN0cmlwZS5wYXltZW50UmVxdWVzdCh7XG4gICAgICAgIGNvdW50cnk6ICdVUycsXG4gICAgICAgIGN1cnJlbmN5OiAndXNkJyxcbiAgICAgICAgdG90YWw6IHtcbiAgICAgICAgICBsYWJlbDogJ01pbm5Qb3N0JyxcbiAgICAgICAgICBhbW91bnQ6IHRvdGFsX2Ftb3VudCAqIDEwMCxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgICAgdGhhdC5wckJ1dHRvbiA9IHRoYXQuZWxlbWVudHMuY3JlYXRlKCdwYXltZW50UmVxdWVzdEJ1dHRvbicsIHtcbiAgICAgICAgcGF5bWVudFJlcXVlc3Q6IHRoYXQucGF5bWVudFJlcXVlc3QsXG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgcGF5bWVudFJlcXVlc3RCdXR0b246IHtcbiAgICAgICAgICAgIHR5cGU6ICdkb25hdGUnLFxuICAgICAgICAgICAgLy8gT25lIG9mICdkZWZhdWx0JywgJ2Jvb2snLCAnYnV5Jywgb3IgJ2RvbmF0ZSdcbiAgICAgICAgICAgIC8vIERlZmF1bHRzIHRvICdkZWZhdWx0J1xuICAgICAgXG4gICAgICAgICAgICB0aGVtZTogJ2RhcmsnLFxuICAgICAgICAgICAgLy8gT25lIG9mICdkYXJrJywgJ2xpZ2h0Jywgb3IgJ2xpZ2h0LW91dGxpbmUnXG4gICAgICAgICAgICAvLyBEZWZhdWx0cyB0byAnZGFyaydcbiAgICAgIFxuICAgICAgICAgICAgaGVpZ2h0OiAnNDhweCdcbiAgICAgICAgICAgIC8vIERlZmF1bHRzIHRvICc0MHB4Jy4gVGhlIHdpZHRoIGlzIGFsd2F5cyAnMTAwJScuXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgICAgXG4gICAgICAvLyBDaGVjayB0aGUgYXZhaWxhYmlsaXR5IG9mIHRoZSBQYXltZW50IFJlcXVlc3QgQVBJIGZpcnN0LlxuICAgICAgdGhhdC5wYXltZW50UmVxdWVzdC5jYW5NYWtlUGF5bWVudCgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAkKCcubS1wYXktd2l0aG91dC1wYXltZW50LXJlcXVlc3QnKS5oaWRlKCk7XG4gICAgICAgICAgdGhhdC5wckJ1dHRvbi5tb3VudCgnI3BheW1lbnQtcmVxdWVzdC1idXR0b24nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGF0LmhpZGVQYXltZW50UmVxdWVzdCggJCgnLm8tcGF5LXdpdGgtcGF5bWVudC1yZXF1ZXN0JykgKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgICQoJy5kZWNsaW5lLWFwcGxlLXBheSBhJykuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhhdC5oaWRlUGF5bWVudFJlcXVlc3QoICQoJy5vLXBheS13aXRoLXBheW1lbnQtcmVxdWVzdCAubS1mb3JtLWFjdGlvbnMtcGF5LWZlZXMnKSApO1xuICAgICAgfSk7XG5cbiAgICAgIHRoYXQucHJCdXR0b24ub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcblxuICAgICAgICAvLyBTZW5kIHBheW1lbnRNZXRob2QuaWQgdG8gc2VydmVyXG4gICAgICAgIHZhciBzdXBwb3J0Zm9ybSA9ICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKTtcblxuICAgICAgICAvLyBjaGVjayB2YWxpZGF0aW9uIG9mIGZvcm1cbiAgICAgICAgaWYgKCFzdXBwb3J0Zm9ybS5nZXQoMCkucmVwb3J0VmFsaWRpdHkoKSkge1xuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgdGhhdC5wYXltZW50UmVxdWVzdC5vbigncGF5bWVudG1ldGhvZCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cbiAgICAgICAgLy8gU2VuZCBwYXltZW50TWV0aG9kLmlkIHRvIHNlcnZlclxuICAgICAgICB2YXIgc3VwcG9ydGZvcm0gPSAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3Rvcik7XG4gICAgICAgIHZhciB0b2tlbkZpZWxkTmFtZSA9ICdwYXltZW50X21ldGhvZF9pZCc7XG4gICAgICAgIHZhciB0b2tlbkZpZWxkID0gJ2lucHV0W25hbWU9XCInICsgdG9rZW5GaWVsZE5hbWUgKyAnXCJdJztcblxuICAgICAgICAvLyBJbnNlcnQgdGhlIHBheW1lbnQgbWV0aG9kIElEIGludG8gdGhlIGZvcm0gc28gaXQgZ2V0cyBzdWJtaXR0ZWQgdG8gdGhlIHNlcnZlclxuICAgICAgICBpZiAoJCh0b2tlbkZpZWxkKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgJCh0b2tlbkZpZWxkKS52YWwoZXZlbnQucGF5bWVudE1ldGhvZC5pZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3VwcG9ydGZvcm0uYXBwZW5kKCQoJzxpbnB1dCB0eXBlPVxcXCJoaWRkZW5cXFwiIG5hbWU9XCInICsgdG9rZW5GaWVsZE5hbWUgKyAnXCI+JykudmFsKGV2ZW50LnBheW1lbnRNZXRob2QuaWQpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoYXQuZm9ybVByb2Nlc3Nvcih0aGF0LCAncGF5bWVudFJlcXVlc3QnKTtcblxuICAgICAgfSk7XG5cbiAgICB9LCAvLyBwYXltZW50UmVxdWVzdEJ1dHRvblxuXG4gICAgaGlkZVBheW1lbnRSZXF1ZXN0OiBmdW5jdGlvbiggaGlkZUVsZW1lbnQgKSB7XG4gICAgICBoaWRlRWxlbWVudC5oaWRlKCk7XG4gICAgICAkKCcuZGVjbGluZS1hcHBsZS1wYXkgYScpLmhpZGUoKTtcbiAgICAgICQoJy5tLXBheS13aXRob3V0LXBheW1lbnQtcmVxdWVzdCcpLnNob3coKTtcbiAgICAgICQoJy5hLWctcmVjYXB0Y2hhJykuaW5zZXJ0QWZ0ZXIoJy5tLXBheS13aXRob3V0LXBheW1lbnQtcmVxdWVzdCAubS1mb3JtLWFjdGlvbnMtcGF5LWZlZXMnKTtcbiAgICB9LCAvLyBoaWRlUGF5bWVudFJlcXVlc3RcblxuICAgIGNob29zZVBheW1lbnRNZXRob2Q6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcblxuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuXG4gICAgICBpZiAoJChvcHRpb25zLmNob29zZV9wYXltZW50KS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGlmICgkKG9wdGlvbnMuY2hvb3NlX3BheW1lbnQgKyAnIGlucHV0JykuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgICB2YXIgY2hlY2tlZF9pZCA9ICQob3B0aW9ucy5jaG9vc2VfcGF5bWVudCArICcgaW5wdXQ6Y2hlY2tlZCcpLmF0dHIoJ2lkJyk7XG4gICAgICAgICAgdmFyIGNoZWNrZWRfdmFsdWUgPSAkKG9wdGlvbnMuY2hvb3NlX3BheW1lbnQgKyAnIGlucHV0OmNoZWNrZWQnKS52YWwoKTtcbiAgICAgICAgICB0aGF0LnNldHVwUGF5bWVudE1ldGhvZChjaGVja2VkX2lkLCBjaGVja2VkX3ZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgICQob3B0aW9ucy5jaG9vc2VfcGF5bWVudCArICcgaW5wdXQnKS5jaGFuZ2UoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciBjaGVja2VkX2lkID0gdGhpcy5pZDtcbiAgICAgICAgICB2YXIgY2hlY2tlZF92YWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgICAgICAgdGhhdC5zZXR1cFBheW1lbnRNZXRob2QoY2hlY2tlZF9pZCwgY2hlY2tlZF92YWx1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICB9XG4gICAgfSwgLy8gY2hvb3NlUGF5bWVudE1ldGhvZFxuXG4gICAgc2V0dXBQYXltZW50TWV0aG9kOiBmdW5jdGlvbihlbGVtZW50X2lkLCBlbGVtZW50X3ZhbHVlKSB7XG4gICAgICB2YXIgc3RyaXBlX3BheW1lbnRfdHlwZSA9IHRoaXMuc2V0U3RyaXBlUGF5bWVudFR5cGUoZWxlbWVudF92YWx1ZSk7XG4gICAgICBpZiAoIGVsZW1lbnRfdmFsdWUgPT09ICdiYW5rX2FjY291bnQnICkge1xuICAgICAgICAkKCdpbnB1dFtuYW1lPVwicGF5bWVudF9tZXRob2RfaWRcIl0nLCAkKHRoaXMub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikpLnJlbW92ZSgpO1xuICAgICAgICB0aGlzLmFjaEZpZWxkcyh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlbW92ZUFjaEZpZWxkcyh0aGlzLm9wdGlvbnMpO1xuICAgICAgfVxuICAgICAgJCh0aGlzLm9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICQodGhpcy5vcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yICsgJy4nICsgZWxlbWVudF9pZCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgJCh0aGlzLm9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IgKyAnOm5vdCguYWN0aXZlKSBpbnB1dCcpLnZhbCgnJyk7XG4gICAgICB0aGlzLmNhbGN1bGF0ZUZlZXModGhpcy5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCwgc3RyaXBlX3BheW1lbnRfdHlwZSk7XG4gICAgfSwgLy8gc2V0dXBQYXltZW50TWV0aG9kXG5cbiAgICByZW1vdmVBY2hGaWVsZHM6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICQoJ2lucHV0W25hbWU9XCJwdWJsaWNfdG9rZW5cIl0nLCAkKG9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpKS5yZW1vdmUoKTtcbiAgICAgICQoJ2lucHV0W25hbWU9XCJhY2NvdW50X2lkXCJdJywgJChvcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKSkucmVtb3ZlKCk7XG4gICAgICAkKCdpbnB1dFtuYW1lPVwiYmFua1Rva2VuXCJdJywgJChvcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKSkucmVtb3ZlKCk7XG4gICAgICAkKG9wdGlvbnMucGxhaWRfbGluaykuaHRtbCgnPGEgaHJlZj1cIiNcIj5TaWduIGluIHRvIHlvdXIgYmFuayBhY2NvdW50PC9hPicpO1xuICAgICAgdGhpcy5idXR0b25EaXNhYmxlZChvcHRpb25zLCBmYWxzZSwgJycsICcnLCB0cnVlKTsgLy8gaWYgdGhlIGJ1dHRvbiB3YXMgZGlzYWJsZWQsIHJlLWVuYWJsZSBpdFxuICAgICAgaWYgKHR5cGVvZiB0aGlzLmxpbmtIYW5kbGVyICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aGlzLmxpbmtIYW5kbGVyLmRlc3Ryb3koKTtcbiAgICAgIH1cbiAgICB9LCAvLyByZW1vdmVBY2hGaWVsZHNcblxuICAgIGNyZWRpdENhcmRGaWVsZHM6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcblxuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuXG4gICAgICB2YXIgc3R5bGUgPSB7XG4gICAgICAgIGJhc2U6IHtcbiAgICAgICAgICBpY29uQ29sb3I6ICcjNjY2RUU4JyxcbiAgICAgICAgICBsaW5lSGVpZ2h0OiAnNDNweCcsXG4gICAgICAgICAgZm9udFdlaWdodDogNDAwLFxuICAgICAgICAgIGZvbnRGYW1pbHk6ICdmZi1tZXRhLXdlYi1wcm8nLFxuICAgICAgICAgIGZvbnRTaXplOiAnMjRweCcsXG4gICAgICAgICAgLy9saW5lSGVpZ2h0OiAnMzdweCcsXG4gICAgICAgICAgLy9mb250U2l6ZTogJzE2cHgnLFxuICAgICAgICB9LFxuICAgICAgICBpbnZhbGlkOiB7XG4gICAgICAgICAgY29sb3I6ICcjMWExODE4JyxcbiAgICAgICAgfSxcbiAgICAgIH07XG5cbiAgICAgIC8vIEFkZCBhbiBpbnN0YW5jZSBvZiB0aGUgY2FyZCBVSSBjb21wb25lbnQgaW50byB0aGUgYGNhcmQtZWxlbWVudGAgPGRpdj5cbiAgICAgIC8vY2FyZC5tb3VudCgnI2NhcmQtZWxlbWVudCcpO1xuICAgICAgaWYgKCAkKCcuY3JlZGl0LWNhcmQtZ3JvdXAnKS5sZW5ndGggPT09IDAgJiYgJCgnLnBheW1lbnQtbWV0aG9kLmNob29zZS1jYXJkJykubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoYXQuY2FyZE51bWJlckVsZW1lbnQgPSB0aGF0LmVsZW1lbnRzLmNyZWF0ZSgnY2FyZE51bWJlcicsIHtcbiAgICAgICAgc2hvd0ljb246IHRydWUsXG4gICAgICAgIHN0eWxlOiBzdHlsZVxuICAgICAgfSk7XG4gICAgICB0aGF0LmNhcmROdW1iZXJFbGVtZW50Lm1vdW50KG9wdGlvbnMuY2NfbnVtX3NlbGVjdG9yKTtcblxuICAgICAgdGhhdC5jYXJkRXhwaXJ5RWxlbWVudCA9IHRoYXQuZWxlbWVudHMuY3JlYXRlKCdjYXJkRXhwaXJ5Jywge1xuICAgICAgICBzdHlsZTogc3R5bGVcbiAgICAgIH0pO1xuICAgICAgdGhhdC5jYXJkRXhwaXJ5RWxlbWVudC5tb3VudChvcHRpb25zLmNjX2V4cF9zZWxlY3Rvcik7XG5cbiAgICAgIHRoYXQuY2FyZEN2Y0VsZW1lbnQgPSB0aGF0LmVsZW1lbnRzLmNyZWF0ZSgnY2FyZEN2YycsIHtcbiAgICAgICAgc3R5bGU6IHN0eWxlXG4gICAgICB9KTtcbiAgICAgIHRoYXQuY2FyZEN2Y0VsZW1lbnQubW91bnQob3B0aW9ucy5jY19jdmNfc2VsZWN0b3IpO1xuXG4gICAgICAvLyB2YWxpZGF0ZS9lcnJvciBoYW5kbGUgdGhlIGNhcmQgZmllbGRzXG4gICAgICB0aGF0LmNhcmROdW1iZXJFbGVtZW50Lm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICB2YXIgc3RyaXBlX3BheW1lbnRfdHlwZSA9ICdjYXJkJztcbiAgICAgICAgLy8gU3dpdGNoIHBheW1lbnQgdHlwZSBpZiBpdCdzIG9uZSB0aGF0IHdlIHJlY29nbml6ZSBhcyBkaXN0aW5jdFxuICAgICAgICBpZiAoZXZlbnQuYnJhbmQpIHtcbiAgICAgICAgICBpZiAoIGV2ZW50LmJyYW5kID09PSAnYW1leCcgKSB7XG4gICAgICAgICAgICBzdHJpcGVfcGF5bWVudF90eXBlID0gJ2FtZXgnO1xuICAgICAgICAgIH0gICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgLy8gZXJyb3IgaGFuZGxpbmdcbiAgICAgICAgdGhhdC5zdHJpcGVFcnJvckRpc3BsYXkoZXZlbnQuZXJyb3IsICQob3B0aW9ucy5jY19udW1fc2VsZWN0b3IsIGVsZW1lbnQpLCBlbGVtZW50LCBvcHRpb25zICk7XG4gICAgICAgIC8vIGlmIGl0IGNoYW5nZWQsIHJlc2V0IHRoZSBidXR0b25cbiAgICAgICAgdGhhdC5idXR0b25TdGF0dXMob3B0aW9ucywgJCh0aGF0Lm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLmZpbmQoJ2J1dHRvbicpLCBmYWxzZSk7XG4gICAgICAgIHRoYXQuY2FsY3VsYXRlRmVlcyh0aGF0Lm9wdGlvbnMub3JpZ2luYWxfYW1vdW50LCBzdHJpcGVfcGF5bWVudF90eXBlKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGF0LmNhcmRFeHBpcnlFbGVtZW50Lm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAvLyBlcnJvciBoYW5kbGluZ1xuICAgICAgICB0aGF0LnN0cmlwZUVycm9yRGlzcGxheShldmVudC5lcnJvciwgJChvcHRpb25zLmNjX2V4cF9zZWxlY3RvciwgZWxlbWVudCksIGVsZW1lbnQsIG9wdGlvbnMgKTtcbiAgICAgICAgLy8gaWYgaXQgY2hhbmdlZCwgcmVzZXQgdGhlIGJ1dHRvblxuICAgICAgICB0aGF0LmJ1dHRvblN0YXR1cyhvcHRpb25zLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIGZhbHNlKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGF0LmNhcmRDdmNFbGVtZW50Lm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAvLyBlcnJvciBoYW5kbGluZ1xuICAgICAgICB0aGF0LnN0cmlwZUVycm9yRGlzcGxheShldmVudC5lcnJvciwgJChvcHRpb25zLmNjX2N2Y19zZWxlY3RvciwgZWxlbWVudCksIGVsZW1lbnQsIG9wdGlvbnMgKTtcbiAgICAgICAgLy8gaWYgaXQgY2hhbmdlZCwgcmVzZXQgdGhlIGJ1dHRvblxuICAgICAgICB0aGF0LmJ1dHRvblN0YXR1cyhvcHRpb25zLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIGZhbHNlKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyB0aGlzIGlzIHRoZSBtZXRob2QgdG8gY3JlYXRlIGEgc2luZ2xlIGNhcmQgZmllbGQgYW5kIG1vdW50IGl0XG4gICAgICAvKnZhciBjYXJkID0gdGhhdC5lbGVtZW50cy5jcmVhdGUoXG4gICAgICAgICdjYXJkJyxcbiAgICAgICAge1xuICAgICAgICAgIGhpZGVQb3N0YWxDb2RlOiB0cnVlXG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgICAvLyBBZGQgYW4gaW5zdGFuY2Ugb2YgdGhlIGNhcmQgVUkgY29tcG9uZW50IGludG8gdGhlIGBjYXJkLWVsZW1lbnRgIDxkaXY+XG4gICAgICBjYXJkLm1vdW50KCcjY2FyZC1lbGVtZW50Jyk7Ki9cblxuICAgIH0sIC8vIGNyZWRpdENhcmRGaWVsZHNcblxuICAgIHNob3dTcGlubmVyOiBmdW5jdGlvbigpIHtcbiAgICAgICQodGhpcy5vcHRpb25zLnBsYWlkX2xpbmspLmhpZGUoKTtcbiAgICAgICQodGhpcy5vcHRpb25zLnBsYWlkX2xpbmspLmFmdGVyKCc8ZGl2IGNsYXNzPVwiYS1zcGlubmVyXCI+PGltZyBzcmM9XCJodHRwczovL3d3dy5taW5ucG9zdC5jb20vd3AtYWRtaW4vaW1hZ2VzL3NwaW5uZXIuZ2lmXCIgc3Jjc2V0PVwiaHR0cHM6Ly93d3cubWlubnBvc3QuY29tL3dwLWFkbWluL2ltYWdlcy9zcGlubmVyLmdpZiAxeCwgaHR0cHM6Ly93d3cubWlubnBvc3QuY29tL3dwLWFkbWluL2ltYWdlcy9zcGlubmVyLTJ4LmdpZiAyeCxcIj48L2Rpdj4nKTtcbiAgICB9LFxuXG4gICAgaGlkZVNwaW5uZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgJCh0aGlzLm9wdGlvbnMucGxhaWRfbGluaykuc2hvdygpO1xuICAgICAgJCgnLmEtc3Bpbm5lcicpLmhpZGUoKTtcbiAgICB9LFxuXG4gICAgYWNoRmllbGRzOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICB2YXIgYmFua1Rva2VuRmllbGROYW1lID0gJ2JhbmtUb2tlbic7XG4gICAgICB2YXIgYmFua1Rva2VuRmllbGQgPSAnaW5wdXRbbmFtZT1cIicgKyBiYW5rVG9rZW5GaWVsZE5hbWUgKyAnXCJdJztcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIC8vIHRoZSBidXR0b24gc2hvdWxkIG5vdCBiZSBjbGlja2FibGUgdW50aWwgdGhlIHVzZXIgaGFzIHNpZ25lZCBpblxuICAgICAgdGhhdC5idXR0b25EaXNhYmxlZChvcHRpb25zLCB0cnVlLCAnJywgJ1NpZ24gaW4gdG8geW91ciBiYW5rIGFjY291bnQgKGFib3ZlKSBmaXJzdCcpO1xuXG4gICAgICBpZiAodHlwZW9mIFBsYWlkICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aGF0LmxpbmtIYW5kbGVyID0gUGxhaWQuY3JlYXRlKHtcbiAgICAgICAgICBjbGllbnROYW1lOiAnTWlublBvc3QnLFxuICAgICAgICAgIGVudjogb3B0aW9ucy5wbGFpZF9lbnYsXG4gICAgICAgICAgcHJvZHVjdDogWydhdXRoJ10sXG4gICAgICAgICAgLy8gMS4gUGFzcyB0aGUgdG9rZW4gZ2VuZXJhdGVkIGluIHN0ZXAgMi5cbiAgICAgICAgICB0b2tlbjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYWlkX2xpbmtfdG9rZW4nKS52YWx1ZSxcbiAgICAgICAgICBvblN1Y2Nlc3M6IGZ1bmN0aW9uKHB1YmxpY190b2tlbiwgbWV0YWRhdGEpIHtcbiAgICAgICAgICAgIHRoYXQuc2hvd1NwaW5uZXIoKTtcbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgIHVybDonL2dldF9wbGFpZF9hY2Nlc3NfdG9rZW4vJyxcbiAgICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoeyBwdWJsaWNfdG9rZW46IHB1YmxpY190b2tlbiwgYWNjb3VudF9pZDogbWV0YWRhdGEuYWNjb3VudF9pZCB9KSxcbiAgICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZXNwb25zZS5lcnJvciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAvLyB0aGVyZSBpcyBhbiBlcnJvci5cbiAgICAgICAgICAgICAgICB0aGF0LmhpZGVTcGlubmVyKCk7XG4gICAgICAgICAgICAgICAgJChvcHRpb25zLnBsYWlkX2xpbmspLmJlZm9yZSgnPHAgY2xhc3M9XCJhLWVycm9yIGEtdmFsaWRhdGlvbi1lcnJvclwiPicgKyByZXNwb25zZS5lcnJvciArICc8L3A+Jyk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy90aGlzLmRlYnVnKCdwcmludCByZXNwb25zZSBoZXJlJyk7XG4gICAgICAgICAgICAgICAgLy90aGlzLmRlYnVnKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAvLyBhZGQgdGhlIGZpZWxkKHMpIHdlIG5lZWQgdG8gdGhlIGZvcm0gZm9yIHN1Ym1pdHRpbmdcbiAgICAgICAgICAgICAgICBpZiAoJChiYW5rVG9rZW5GaWVsZCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgJChiYW5rVG9rZW5GaWVsZCkudmFsKHJlc3BvbnNlLnN0cmlwZV9iYW5rX2FjY291bnRfdG9rZW4pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAkKG9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLnByZXBlbmQoJCgnPGlucHV0IHR5cGU9XFxcImhpZGRlblxcXCIgbmFtZT1cIicgKyBiYW5rVG9rZW5GaWVsZE5hbWUgKyAnXCI+JykudmFsKHJlc3BvbnNlLnN0cmlwZV9iYW5rX2FjY291bnRfdG9rZW4pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgJChvcHRpb25zLnBsYWlkX2xpbmssIGVsZW1lbnQpLmh0bWwoJzxzdHJvbmc+WW91ciBhY2NvdW50IHdhcyBzdWNjZXNzZnVsbHkgYXV0aG9yaXplZDwvc3Ryb25nPicpO1xuICAgICAgICAgICAgICAgIHRoYXQuaGlkZVNwaW5uZXIoKTtcbiAgICAgICAgICAgICAgICB0aGF0LmJ1dHRvbkRpc2FibGVkKG9wdGlvbnMsIGZhbHNlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgIHRoYXQuZGVidWcocmVzcG9uc2UpO1xuICAgICAgICAgICAgICB0aGF0LmhpZGVTcGlubmVyKCk7XG4gICAgICAgICAgICAgICQob3B0aW9ucy5wbGFpZF9saW5rKS5iZWZvcmUoJzxwIGNsYXNzPVwiYS1lcnJvciBhLXZhbGlkYXRpb24tZXJyb3JcIj4nICsgcmVzcG9uc2UuZXJyb3IgKyAnPC9wPicpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICAgICQob3B0aW9ucy5wbGFpZF9saW5rICsgJyBhJykuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHRoYXQucmVzZXRGb3JtRXJyb3JzKHRoYXQub3B0aW9ucywgdGhhdC5lbGVtZW50KTtcbiAgICAgICAgICAvLyQob3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvciArICcgLmEtZXJyb3InKS5yZW1vdmUoKTsgLy8gcmVtb3ZlIG1ldGhvZCBlcnJvciBtZXNzYWdlIGlmIGl0IGlzIHRoZXJlXG4gICAgICAgICAgdGhhdC5saW5rSGFuZGxlci5vcGVuKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sIC8vIGFjaEZpZWxkc1xuXG4gICAgYnV0dG9uU3RhdHVzOiBmdW5jdGlvbihvcHRpb25zLCBidXR0b24sIGRpc2FibGVkKSB7XG4gICAgICAvLyBtYWtlIHRoZSBidXR0b24gY2xpY2thYmxlIG9yIG5vdFxuICAgICAgdGhpcy5idXR0b25EaXNhYmxlZChvcHRpb25zLCBkaXNhYmxlZCwgYnV0dG9uKTtcbiAgICAgIGlmIChkaXNhYmxlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgYnV0dG9uLnRleHQob3B0aW9ucy5idXR0b25fdGV4dCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBidXR0b24udGV4dCgnUHJvY2Vzc2luZycpO1xuICAgICAgfVxuICAgIH0sIC8vIGJ1dHRvblN0YXR1c1xuXG4gICAgYnV0dG9uRGlzYWJsZWQ6IGZ1bmN0aW9uKG9wdGlvbnMsIGRpc2FibGVkLCBidXR0b24gPSAnJywgbWVzc2FnZSA9ICcnLCBhY2hfd2FzX2luaXRpYWxpemVkID0gZmFsc2UpIHtcbiAgICAgIGlmIChidXR0b24gPT09ICcnKSB7XG4gICAgICAgIGJ1dHRvbiA9ICQob3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyk7XG4gICAgICB9XG4gICAgICBidXR0b24ucHJvcCgnZGlzYWJsZWQnLCBkaXNhYmxlZCk7XG4gICAgICBpZiAobWVzc2FnZSAhPT0gJycpIHtcbiAgICAgICAgaWYgKGRpc2FibGVkID09PSB0cnVlKSB7XG4gICAgICAgICAgYnV0dG9uLmF0dHIoJ2RhdGEtdGxpdGUnLCBtZXNzYWdlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBidXR0b24ucmVtb3ZlQXR0ciggJ2RhdGEtdGxpdGUnICk7IC8vIHRoZXJlIHNob3VsZCBiZSBubyB0bGl0ZSB2YWx1ZSBpZiB0aGUgYnV0dG9uIGlzIGVuYWJsZWRcbiAgICAgICAgfVxuICAgICAgICBidXR0b24ub24oJ21vdXNlZW50ZXIgZm9jdXMnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIHRsaXRlLnNob3coICggdGhpcyApLCB7IGdyYXY6ICdudycgfSApO1xuICAgICAgICB9KTtcbiAgICAgICAgYnV0dG9uLm9uKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICB0bGl0ZS5oaWRlKCAoIHRoaXMgKSApO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJ1dHRvbi5yZW1vdmVBdHRyKCAnZGF0YS10bGl0ZScgKTtcbiAgICAgICAgaWYgKGFjaF93YXNfaW5pdGlhbGl6ZWQgPT09IHRydWUgKSB7XG4gICAgICAgICAgYnV0dG9uLm9uKCdtb3VzZWVudGVyIGZvY3VzJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIHRsaXRlLmhpZGUoICggdGhpcyApICk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYnV0dG9uLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIC8vIGJ1dHRvbkRpc2FibGVkXG5cbiAgICB2YWxpZGF0ZVNldHVwOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICB2YXIgZm9ybXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKG9wdGlvbnMuZm9ybV9zZWxlY3Rvcik7XG4gICAgICBmb3Jtcy5mb3JFYWNoKCBmdW5jdGlvbiAoIGZvcm0gKSB7XG4gICAgICAgIFZhbGlkRm9ybSggZm9ybSwge1xuICAgICAgICAgIHZhbGlkYXRpb25FcnJvclBhcmVudENsYXNzOiAnbS1oYXMtdmFsaWRhdGlvbi1lcnJvcicsXG4gICAgICAgICAgdmFsaWRhdGlvbkVycm9yQ2xhc3M6ICdhLXZhbGlkYXRpb24tZXJyb3InLFxuICAgICAgICAgIGludmFsaWRDbGFzczogJ2EtZXJyb3InLFxuICAgICAgICAgIGVycm9yUGxhY2VtZW50OiAnYWZ0ZXInXG4gICAgICAgIH0gKVxuICAgICAgfSApO1xuICAgICAgdGhpcy5zY3JvbGxUb0Zvcm1FcnJvcihvcHRpb25zKTtcbiAgICB9LCAvLyB2YWxpZGF0ZVNldHVwXG5cbiAgICBzY3JvbGxUb0Zvcm1FcnJvcjogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgdmFyIGZvcm0gPSAkKCBvcHRpb25zLmZvcm1fc2VsZWN0b3IgKTtcbiAgICAgIC8vIGxpc3RlbiBmb3IgYGludmFsaWRgIGV2ZW50cyBvbiBhbGwgZm9ybSBpbnB1dHNcbiAgICAgIGZvcm0uZmluZCggJzppbnB1dCcgKS5vbiggJ2ludmFsaWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyIGlucHV0ID0gJCggdGhpcyApO1xuICAgICAgICAgIC8vIHRoZSBmaXJzdCBpbnZhbGlkIGVsZW1lbnQgaW4gdGhlIGZvcm1cbiAgICAgICAgdmFyIGZpcnN0ID0gZm9ybS5maW5kKCAnLmEtZXJyb3InICkuZmlyc3QoKTtcbiAgICAgICAgLy8gdGhlIGZvcm0gaXRlbSB0aGF0IGNvbnRhaW5zIGl0XG4gICAgICAgIHZhciBmaXJzdF9ob2xkZXIgPSBmaXJzdC5wYXJlbnQoKTtcbiAgICAgICAgICAvLyBvbmx5IGhhbmRsZSBpZiB0aGlzIGlzIHRoZSBmaXJzdCBpbnZhbGlkIGlucHV0XG4gICAgICAgICAgaWYgKGlucHV0WzBdID09PSBmaXJzdFswXSkge1xuICAgICAgICAgICAgICAvLyBoZWlnaHQgb2YgdGhlIG5hdiBiYXIgcGx1cyBzb21lIHBhZGRpbmcgaWYgdGhlcmUncyBhIGZpeGVkIG5hdlxuICAgICAgICAgICAgICAvL3ZhciBuYXZiYXJIZWlnaHQgPSBuYXZiYXIuaGVpZ2h0KCkgKyA1MFxuXG4gICAgICAgICAgICAgIC8vIHRoZSBwb3NpdGlvbiB0byBzY3JvbGwgdG8gKGFjY291bnRpbmcgZm9yIHRoZSBuYXZiYXIgaWYgaXQgZXhpc3RzKVxuICAgICAgICAgICAgICB2YXIgZWxlbWVudE9mZnNldCA9IGZpcnN0X2hvbGRlci5vZmZzZXQoKS50b3A7XG5cbiAgICAgICAgICAgICAgLy8gdGhlIGN1cnJlbnQgc2Nyb2xsIHBvc2l0aW9uIChhY2NvdW50aW5nIGZvciB0aGUgbmF2YmFyKVxuICAgICAgICAgICAgICB2YXIgcGFnZU9mZnNldCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcblxuICAgICAgICAgICAgICAvLyBkb24ndCBzY3JvbGwgaWYgdGhlIGVsZW1lbnQgaXMgYWxyZWFkeSBpbiB2aWV3XG4gICAgICAgICAgICAgIGlmICggZWxlbWVudE9mZnNldCA+IHBhZ2VPZmZzZXQgJiYgZWxlbWVudE9mZnNldCA8IHBhZ2VPZmZzZXQgKyB3aW5kb3cuaW5uZXJIZWlnaHQgKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIC8vIG5vdGU6IGF2b2lkIHVzaW5nIGFuaW1hdGUsIGFzIGl0IHByZXZlbnRzIHRoZSB2YWxpZGF0aW9uIG1lc3NhZ2UgZGlzcGxheWluZyBjb3JyZWN0bHlcbiAgICAgICAgICAgICAgJCggJ2h0bWwsIGJvZHknICkuc2Nyb2xsVG9wKCBlbGVtZW50T2Zmc2V0ICk7XG4gICAgICAgICAgfVxuICAgICAgfSApO1xuICAgIH0sIC8vIHNjcm9sbFRvRm9ybUVycm9yXG5cbiAgICBmb3JtU2V0dXA6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcblxuICAgICAgJChvcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5zdWJtaXQoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhhdC5mb3JtUHJvY2Vzc29yKHRoYXQsICdzdWJtaXQnKTtcblxuICAgICAgfSk7XG4gICAgfSwgLy8gZm9ybVNldHVwXG5cbiAgICBmb3JtUHJvY2Vzc29yOiBmdW5jdGlvbih0aGF0LCB0eXBlKSB7XG5cbiAgICAgIC8vIDEuIHJlbW92ZSBwcmV2aW91cyBlcnJvcnMgYW5kIHJlc2V0IHRoZSBidXR0b25cbiAgICAgIHRoYXQucmVzZXRGb3JtRXJyb3JzKHRoYXQub3B0aW9ucywgdGhhdC5lbGVtZW50KTtcblxuICAgICAgLy8gMi4gc2V0IHVwIHRoZSBidXR0b24gaWYgaXQncyBhIGZvcm0gc3VibWl0XG4gICAgICBpZiAodHlwZSA9PT0gJ3N1Ym1pdCcpIHtcbiAgICAgICAgdGhhdC5idXR0b25TdGF0dXModGhhdC5vcHRpb25zLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIHRydWUpO1xuICAgICAgfVxuXG4gICAgICAvLyAzLiBnZW5lcmF0ZSBiaWxsaW5nIGFkZHJlc3MgZGV0YWlsc1xuICAgICAgdmFyIGJpbGxpbmdEZXRhaWxzID0gdGhhdC5nZW5lcmF0ZUJpbGxpbmdEZXRhaWxzKCk7XG5cbiAgICAgIC8vIDQuIGNyZWF0ZSBtaW5ucG9zdCB1c2VyIGFjY291bnRcbiAgICAgIHRoYXQuY3JlYXRlTWlublBvc3RBY2NvdW50KHRoYXQub3B0aW9ucywgdGhhdC5lbGVtZW50KTtcblxuICAgICAgLy8gNS4gZG8gdGhlIGNoYXJnaW5nIG9mIGNhcmQgb3IgYmFuayBhY2NvdW50IGlmIGl0J3MgYSBmb3JtIHN1Ym1pdFxuICAgICAgLy8gb3Igc3VibWl0IHRoZSBmb3JtIGlmIHRoaXMgaXMgYSBwYXltZW50IHJlcXVlc3QgYnV0dG9uXG4gICAgICBpZiAodHlwZSA9PT0gJ3N1Ym1pdCcpIHtcbiAgICAgICAgdmFyIHBheW1lbnRfdHlwZSA9ICQoJ2lucHV0W25hbWU9XCJzdHJpcGVfcGF5bWVudF90eXBlXCJdJykudmFsKCk7XG4gICAgICAgIGlmIChwYXltZW50X3R5cGUgIT09ICdiYW5rX2FjY291bnQnKSB7XG4gICAgICAgICAgLy8gZmluYWxseSwgZ2V0IGEgcGF5bWVudCBtZXRob2QgZnJvbSBzdHJpcGUsIGFuZCB0cnkgdG8gY2hhcmdlIGl0IGlmIGl0IGlzIG5vdCBhY2hcbiAgICAgICAgICB0aGF0LmNyZWF0ZVBheW1lbnRNZXRob2QodGhhdC5jYXJkTnVtYmVyRWxlbWVudCwgYmlsbGluZ0RldGFpbHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGlmIGl0IGlzIGFjaCwgd2UgYWxyZWFkeSBoYXZlIGEgdG9rZW4gc28gc3VibWl0IHRoZSBmb3JtXG4gICAgICAgICAgLy8gdG9kbzogdXBncmFkZSB0aGUgcGxhaWQgaW50ZWdyYXRpb25cbiAgICAgICAgICB0aGF0LmJhbmtUb2tlbkhhbmRsZXIoICQoJ2lucHV0W25hbWU9XCJiYW5rVG9rZW5cIl0nKS52YWwoKSwgJ2JhbmtfYWNjb3VudCcgKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhhdC5zdWJtaXRGb3JtT25seSgpO1xuICAgICAgfVxuICAgIH0sIC8vIGZvcm1Qcm9jZXNzb3JcblxuICAgIHN0cmlwZUVycm9yRGlzcGxheTogZnVuY3Rpb24oZXJyb3IsIHRoaXNfc2VsZWN0b3IsIGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIC8vIGxpc3RlbiBmb3IgZXJyb3JzIGFuZCBkaXNwbGF5L2hpZGUgZXJyb3IgbWVzc2FnZXNcbiAgICAgIHZhciB3aGljaF9lcnJvciA9IHRoaXNfc2VsZWN0b3IuYXR0cignaWQnKTtcbiAgICAgIC8vIHdoZW4gdGhpcyBmaWVsZCBjaGFuZ2VzLCByZXNldCBpdHMgZXJyb3JzXG4gICAgICAkKCcuYS1jYXJkLWluc3RydWN0aW9uLicgKyB3aGljaF9lcnJvcikucmVtb3ZlQ2xhc3MoJ2EtdmFsaWRhdGlvbi1lcnJvcicpO1xuICAgICAgJCgnLmEtY2FyZC1pbnN0cnVjdGlvbi4nICsgd2hpY2hfZXJyb3IpLmVtcHR5KCk7XG4gICAgICAkKHRoaXNfc2VsZWN0b3IpLnJlbW92ZUNsYXNzKCdhLWVycm9yJyk7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgaWYgKCQoJy5hLWNhcmQtaW5zdHJ1Y3Rpb24uJyArIHdoaWNoX2Vycm9yKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgJCgnLmEtY2FyZC1pbnN0cnVjdGlvbi4nICsgd2hpY2hfZXJyb3IpLnRleHQoZXJyb3IubWVzc2FnZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpc19zZWxlY3Rvci5wYXJlbnQoKS5hcHBlbmQoJzxwIGNsYXNzPVwiYS1jYXJkLWluc3RydWN0aW9uICcgKyB3aGljaF9lcnJvciArICdcIj4nICsgZXJyb3IubWVzc2FnZSArICc8L3A+Jyk7XG4gICAgICAgIH1cbiAgICAgICAgJCgnLmEtY2FyZC1pbnN0cnVjdGlvbi4nICsgd2hpY2hfZXJyb3IpLmFkZENsYXNzKCdhLXZhbGlkYXRpb24tZXJyb3InKTtcbiAgICAgICAgdGhpc19zZWxlY3Rvci5wYXJlbnQoKS5hZGRDbGFzcygnbS1oYXMtdmFsaWRhdGlvbi1lcnJvcicpO1xuICAgICAgICAkKHRoaXNfc2VsZWN0b3IpLmFkZENsYXNzKCdhLWVycm9yJyk7XG4gICAgICAgIGlmICh0aGlzX3NlbGVjdG9yLnBhcmVudCgpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgICBzY3JvbGxUb3A6IHRoaXNfc2VsZWN0b3IucGFyZW50KCkub2Zmc2V0KCkudG9wXG4gICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQodGhpc19zZWxlY3RvcikucmVtb3ZlQ2xhc3MoJ2EtZXJyb3InKTtcbiAgICAgICAgJCgnLmEtY2FyZC1pbnN0cnVjdGlvbi4nICsgd2hpY2hfZXJyb3IpLnJlbW92ZUNsYXNzKCdhLXZhbGlkYXRpb24tZXJyb3InKTtcbiAgICAgICAgJCgnLmEtY2FyZC1pbnN0cnVjdGlvbi4nICsgd2hpY2hfZXJyb3IpLmVtcHR5KCk7XG4gICAgICAgICQob3B0aW9ucy5jY19udW1fc2VsZWN0b3IsIGVsZW1lbnQpLnJlbW92ZUNsYXNzKCdhLXZhbGlkYXRpb24tZXJyb3InKTtcbiAgICAgICAgJChvcHRpb25zLmNjX2V4cF9zZWxlY3RvciwgZWxlbWVudCkucmVtb3ZlQ2xhc3MoJ2EtdmFsaWRhdGlvbi1lcnJvcicpO1xuICAgICAgICAkKG9wdGlvbnMuY2NfY3ZjX3NlbGVjdG9yLCBlbGVtZW50KS5yZW1vdmVDbGFzcygnYS12YWxpZGF0aW9uLWVycm9yJyk7XG4gICAgICAgICQob3B0aW9ucy5jY19udW1fc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdtLWhhcy12YWxpZGF0aW9uLWVycm9yJyk7XG4gICAgICAgICQob3B0aW9ucy5jY19leHBfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdtLWhhcy12YWxpZGF0aW9uLWVycm9yJyk7XG4gICAgICAgICQob3B0aW9ucy5jY19jdmNfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdtLWhhcy12YWxpZGF0aW9uLWVycm9yJyk7XG4gICAgICB9XG4gICAgfSwgLy8gc3RyaXBlRXJyb3JEaXNwbGF5XG5cbiAgICByZXNldEZvcm1FcnJvcnM6IGZ1bmN0aW9uKG9wdGlvbnMsIGVsZW1lbnQpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICQoJy5hLXZhbGlkYXRpb24tZXJyb3InKS5yZW1vdmUoKTtcbiAgICAgICQoJ2lucHV0LCBsYWJlbCwgZGl2JywgZWxlbWVudCkucmVtb3ZlQ2xhc3MoJ2EtZXJyb3InKTtcbiAgICAgICQoJ2xhYmVsJywgZWxlbWVudCkucmVtb3ZlQ2xhc3MoJ20taGFzLXZhbGlkYXRpb24tZXJyb3InKTtcbiAgICAgICQob3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvciwgZWxlbWVudCkucmVtb3ZlQ2xhc3MoJ2EtZXJyb3IgaW52YWxpZCcpO1xuICAgICAgJCgnLmEtdmFsaWRhdGlvbi1lcnJvcicpLnJlbW92ZSgpO1xuICAgICAgXG4gICAgICAkKG9wdGlvbnMuY2hvb3NlX3BheW1lbnQgKyAnIGlucHV0JykuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICAkKG9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IgKyAnIC5hLWVycm9yJykucmVtb3ZlKCk7IC8vIHJlbW92ZSBtZXRob2QgZXJyb3IgbWVzc2FnZSBpZiBpdCBpcyB0aGVyZVxuICAgICAgICAkKG9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IpLnBhcmVudCgpLmZpbmQoJy5hLXZhbGlkYXRpb24tZXJyb3InKS5yZW1vdmUoKTtcbiAgICAgICAgLy8gaWYgYSBwYXltZW50IGZpZWxkIGNoYW5nZWQsIHJlc2V0IHRoZSBidXR0b25cbiAgICAgICAgdGhhdC5idXR0b25TdGF0dXMob3B0aW9ucywgJChvcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKSwgZmFsc2UpO1xuICAgICAgfSk7XG4gICAgfSwgLy8gcmVzZXRGb3JtRXJyb3JzXG4gICAgXG4gICAgY3JlYXRlTWlublBvc3RBY2NvdW50OiBmdW5jdGlvbihvcHRpb25zLCBlbGVtZW50KSB7XG4gICAgICAvLyAyLiBjcmVhdGUgbWlubnBvc3QgYWNjb3VudCBpZiBzcGVjaWZpZWRcbiAgICAgIGlmIChvcHRpb25zLmNyZWF0ZV9hY2NvdW50ID09PSB0cnVlKSB7XG4gICAgICAgIHZhciB1c2VyID0ge1xuICAgICAgICAgIGVtYWlsOiAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgIGZpcnN0X25hbWU6ICQob3B0aW9ucy5maXJzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICBsYXN0X25hbWU6ICQob3B0aW9ucy5sYXN0X25hbWVfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgIHBhc3N3b3JkOiAkKG9wdGlvbnMucGFzc3dvcmRfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgIGNpdHk6ICQob3B0aW9ucy5iaWxsaW5nX2NpdHlfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgIHN0YXRlOiAkKG9wdGlvbnMuYmlsbGluZ19zdGF0ZV9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgemlwOiAkKG9wdGlvbnMuYmlsbGluZ196aXBfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICB9O1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIHVybDogb3B0aW9ucy5taW5ucG9zdF9yb290ICsgJy93cC1qc29uL3VzZXItYWNjb3VudC1tYW5hZ2VtZW50L3YxL2NyZWF0ZS11c2VyJyxcbiAgICAgICAgICBkYXRhOiB1c2VyXG4gICAgICAgIH0pLmRvbmUoZnVuY3Rpb24oIGRhdGEgKSB7XG4gICAgICAgICAgaWYgKGRhdGEuc3RhdHVzID09PSAnc3VjY2VzcycgJiYgZGF0YS5yZWFzb24gPT09ICduZXcgdXNlcicpIHtcbiAgICAgICAgICAgIC8vIHVzZXIgY3JlYXRlZCAtIHRoZXkgc2hvdWxkIHJlY2VpdmUgZW1haWxcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sIC8vIGNyZWF0ZU1pbm5Qb3N0QWNjb3VudFxuICAgIFxuICAgIGdlbmVyYXRlQmlsbGluZ0RldGFpbHM6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGJpbGxpbmdEZXRhaWxzID0ge307XG4gICAgICB2YXIgYWRkcmVzc0RldGFpbHMgPSB7fTtcblxuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yKS52YWwoKSAhPSAnJykge1xuICAgICAgICBiaWxsaW5nRGV0YWlscy5lbWFpbCA9ICQodGhpcy5vcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yKS52YWwoKTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgdmFyIGZ1bGxfbmFtZSA9ICcnO1xuICAgICAgaWYgKCQoJyNmdWxsX25hbWUnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGZ1bGxfbmFtZSA9ICQoJyNmdWxsX25hbWUnKS52YWwoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZ1bGxfbmFtZSA9ICQodGhpcy5vcHRpb25zLmZpcnN0X25hbWVfZmllbGRfc2VsZWN0b3IpLnZhbCgpICsgJyAnICsgJCh0aGlzLm9wdGlvbnMubGFzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yKS52YWwoKTtcbiAgICAgIH1cbiAgICAgIGJpbGxpbmdEZXRhaWxzLm5hbWUgPSBmdWxsX25hbWU7XG5cbiAgICAgIHZhciBzdHJlZXQgPSAnTm9uZSc7XG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuYmlsbGluZ19zdHJlZXRfZmllbGRfc2VsZWN0b3IpLnZhbCgpICE9ICcnKSB7XG4gICAgICAgIHN0cmVldCA9ICQodGhpcy5vcHRpb25zLmJpbGxpbmdfc3RyZWV0X2ZpZWxkX3NlbGVjdG9yKS52YWwoKTtcbiAgICAgICAgYWRkcmVzc0RldGFpbHMubGluZTEgPSBzdHJlZXQ7XG4gICAgICB9XG5cbiAgICAgIHZhciBjaXR5ID0gJ05vbmUnO1xuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmJpbGxpbmdfY2l0eV9maWVsZF9zZWxlY3RvcikudmFsKCkgIT0gJycpIHtcbiAgICAgICAgY2l0eSA9ICQodGhpcy5vcHRpb25zLmJpbGxpbmdfY2l0eV9maWVsZF9zZWxlY3RvcikudmFsKCk7XG4gICAgICAgIGFkZHJlc3NEZXRhaWxzLmNpdHkgPSBjaXR5O1xuICAgICAgfVxuXG4gICAgICB2YXIgc3RhdGUgPSAnTm9uZSc7XG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuYmlsbGluZ19zdGF0ZV9maWVsZF9zZWxlY3RvcikudmFsKCkgIT0gJycpIHtcbiAgICAgICAgc3RhdGUgPSAkKHRoaXMub3B0aW9ucy5iaWxsaW5nX3N0YXRlX2ZpZWxkX3NlbGVjdG9yKS52YWwoKTtcbiAgICAgICAgYWRkcmVzc0RldGFpbHMuc3RhdGUgPSBzdGF0ZTtcbiAgICAgIH1cblxuICAgICAgdmFyIHppcCA9ICdOb25lJztcbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5iaWxsaW5nX3ppcF9maWVsZF9zZWxlY3RvcikudmFsKCkgIT0gJycpIHtcbiAgICAgICAgemlwID0gJCh0aGlzLm9wdGlvbnMuYmlsbGluZ196aXBfZmllbGRfc2VsZWN0b3IpLnZhbCgpO1xuICAgICAgICBhZGRyZXNzRGV0YWlscy5wb3N0YWxfY29kZSA9IHppcDtcbiAgICAgIH1cblxuICAgICAgdmFyIGNvdW50cnkgPSAnVVMnO1xuICAgICAgdmFyIGNvdW50cnlfZmllbGRfdmFsdWUgPSAkKHRoaXMub3B0aW9ucy5iaWxsaW5nX2NvdW50cnlfZmllbGRfc2VsZWN0b3IpLnZhbCgpO1xuICAgICAgaWYgKGNvdW50cnlfZmllbGRfdmFsdWUgIT0gJycgJiYgY291bnRyeV9maWVsZF92YWx1ZSAhPSAnVW5pdGVkIFN0YXRlcycpIHtcbiAgICAgICAgY291bnRyeSA9IGNvdW50cnlfZmllbGRfdmFsdWU7XG4gICAgICB9XG4gICAgICBhZGRyZXNzRGV0YWlscy5jb3VudHJ5ID0gY291bnRyeTtcblxuICAgICAgaWYgKHN0cmVldCAhPT0gJ05vbmUnIHx8IGNpdHkgIT09ICdOb25lJyB8fCBzdGF0ZSAhPT0gJ05vbmUnIHx8IHppcCAhPT0gJ05vbmUnKSB7XG4gICAgICAgIGJpbGxpbmdEZXRhaWxzLmFkZHJlc3MgPSBhZGRyZXNzRGV0YWlscztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGJpbGxpbmdEZXRhaWxzO1xuICAgIH0sIC8vIGdlbmVyYXRlQmlsbGluZ0RldGFpbHNcblxuICAgIGNyZWF0ZVBheW1lbnRNZXRob2Q6IGZ1bmN0aW9uKGNhcmRFbGVtZW50LCBiaWxsaW5nRGV0YWlscykge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdGhhdC5zdHJpcGUuY3JlYXRlUGF5bWVudE1ldGhvZCh7XG4gICAgICAgIHR5cGU6ICdjYXJkJyxcbiAgICAgICAgY2FyZDogY2FyZEVsZW1lbnQsXG4gICAgICAgIGJpbGxpbmdfZGV0YWlsczogYmlsbGluZ0RldGFpbHNcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKHJlc3BvbnNlLmVycm9yKSB7XG4gICAgICAgICAgdGhhdC5oYW5kbGVTZXJ2ZXJFcnJvcihyZXNwb25zZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gU2VuZCBwYXltZW50TWV0aG9kLmlkIHRvIHNlcnZlclxuICAgICAgICAgIHZhciBzdXBwb3J0Zm9ybSA9ICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKTtcbiAgICAgICAgICB2YXIgYWpheF91cmwgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG4gICAgICAgICAgdmFyIHRva2VuRmllbGROYW1lID0gJ3BheW1lbnRfbWV0aG9kX2lkJztcbiAgICAgICAgICB2YXIgdG9rZW5GaWVsZCA9ICdpbnB1dFtuYW1lPVwiJyArIHRva2VuRmllbGROYW1lICsgJ1wiXSc7XG5cbiAgICAgICAgICAvLyBJbnNlcnQgdGhlIHBheW1lbnQgbWV0aG9kIElEIGludG8gdGhlIGZvcm0gc28gaXQgZ2V0cyBzdWJtaXR0ZWQgdG8gdGhlIHNlcnZlclxuICAgICAgICAgIGlmICgkKHRva2VuRmllbGQpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICQodG9rZW5GaWVsZCkudmFsKHJlc3BvbnNlLnBheW1lbnRNZXRob2QuaWQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdXBwb3J0Zm9ybS5hcHBlbmQoJCgnPGlucHV0IHR5cGU9XFxcImhpZGRlblxcXCIgbmFtZT1cIicgKyB0b2tlbkZpZWxkTmFtZSArICdcIj4nKS52YWwocmVzcG9uc2UucGF5bWVudE1ldGhvZC5pZCkpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGZldGNoKGFqYXhfdXJsLCB7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYm9keTogJChzdXBwb3J0Zm9ybSkuc2VyaWFsaXplKClcbiAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAvLyBIYW5kbGUgc2VydmVyIHJlc3BvbnNlIChzZWUgU3RlcCAzKVxuICAgICAgICAgICAgcmVzcG9uc2UuanNvbigpLnRoZW4oZnVuY3Rpb24oanNvbikge1xuICAgICAgICAgICAgICB0aGF0LmhhbmRsZVNlcnZlclJlc3BvbnNlKGpzb24pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSwgLy8gY3JlYXRlUGF5bWVudE1ldGhvZFxuXG4gICAgYmFua1Rva2VuSGFuZGxlcjogZnVuY3Rpb24odG9rZW4sIHR5cGUpIHtcbiAgICAgIHRoaXMuc2V0U3RyaXBlUGF5bWVudFR5cGUodHlwZSk7XG4gICAgICB0aGlzLnN1Ym1pdEZvcm1Pbmx5KCk7XG4gICAgfSwgLy8gYmFua1Rva2VuSGFuZGxlclxuXG4gICAgc3VibWl0Rm9ybU9ubHk6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdmFyIHN1cHBvcnRmb3JtID0gJCh0aGlzLm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpO1xuICAgICAgdmFyIGFqYXhfdXJsID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xuXG4gICAgICAvLyBTdWJtaXQgdGhlIGZvcm1cbiAgICAgIC8vIHRoZSB3YXkgaXQgd29ya3MgY3VycmVudGx5IGlzIHRoZSBmb3JtIHN1Ym1pdHMgYW4gYWpheCByZXF1ZXN0IHRvIGl0c2VsZlxuICAgICAgLy8gdGhlbiBpdCBzdWJtaXRzIGEgcG9zdCByZXF1ZXN0IHRvIHRoZSBmb3JtJ3MgYWN0aW9uIHVybFxuICAgICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBhamF4X3VybCxcbiAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICBkYXRhOiAkKHN1cHBvcnRmb3JtKS5zZXJpYWxpemUoKSxcbiAgICAgICAgdHlwZTogJ1BPU1QnXG4gICAgICB9KVxuICAgICAgLmRvbmUoZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKHR5cGVvZiByZXNwb25zZS5lcnJvcnMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgdGhhdC5oYW5kbGVTZXJ2ZXJFcnJvcihyZXNwb25zZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3VwcG9ydGZvcm0uZ2V0KDApLnN1Ym1pdCgpOyAvLyBjb250aW51ZSBzdWJtaXR0aW5nIHRoZSBmb3JtIGlmIHRoZSBhamF4IHdhcyBzdWNjZXNzZnVsXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAuZmFpbChmdW5jdGlvbigpIHtcbiAgICAgICAgdGhhdC5idXR0b25TdGF0dXModGhhdC5vcHRpb25zLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIGZhbHNlKTtcbiAgICAgIH0pO1xuICAgIH0sIC8vIHN1Ym1pdEZvcm1Pbmx5XG5cbiAgICBoYW5kbGVTZXJ2ZXJSZXNwb25zZTogZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgIHZhciBzdXBwb3J0Zm9ybSA9ICQodGhpcy5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKTtcbiAgICAgIGlmIChyZXNwb25zZS5lcnJvcnMpIHtcbiAgICAgICAgLy8gU2hvdyBlcnJvciBmcm9tIHNlcnZlciBvbiBwYXltZW50IGZvcm1cbiAgICAgICAgdGhpcy5oYW5kbGVTZXJ2ZXJFcnJvcihyZXNwb25zZSk7XG4gICAgICB9IGVsc2UgaWYgKHJlc3BvbnNlLnJlcXVpcmVzX2FjdGlvbikge1xuICAgICAgICAvLyBVc2UgU3RyaXBlLmpzIHRvIGhhbmRsZSByZXF1aXJlZCBjYXJkIGFjdGlvblxuICAgICAgICAvL2hhbmRsZUFjdGlvbihyZXNwb25zZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdXBwb3J0Zm9ybS5nZXQoMCkuc3VibWl0KCk7IC8vIGNvbnRpbnVlIHN1Ym1pdHRpbmcgdGhlIGZvcm0gaWYgdGhlIGFqYXggd2FzIHN1Y2Nlc3NmdWxcbiAgICAgIH1cbiAgICB9LCAvLyBoYW5kbGVTZXJ2ZXJSZXNwb25zZVxuXG4gICAgaGFuZGxlU2VydmVyRXJyb3I6IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB2YXIgdGhpc19maWVsZCA9ICcnO1xuICAgICAgLy8gZG8gbm90IHN1Ym1pdC4gdGhlcmUgaXMgYW4gZXJyb3IuXG4gICAgICB0aGF0LmJ1dHRvblN0YXR1cyh0aGF0Lm9wdGlvbnMsICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKSwgZmFsc2UpO1xuICAgICAgLy8gaGFuZGxlIGVycm9yIGRpc3BsYXlcbiAgICAgIGlmICh0eXBlb2YgcmVzcG9uc2UuZXJyb3JzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBpZiAodHlwZW9mIHJlc3BvbnNlLmVycm9yc1swXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICB0aGlzX2ZpZWxkID0gcmVzcG9uc2UuZXJyb3JzWzBdLmZpZWxkICsgJ19maWVsZF9zZWxlY3Rvcic7XG4gICAgICAgIH1cbiAgICAgICAgJC5lYWNoKHJlc3BvbnNlLmVycm9ycywgZnVuY3Rpb24oIGluZGV4LCBlcnJvciApIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGVycm9yLmZpZWxkICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdGhpc19maWVsZCA9IGVycm9yLmZpZWxkICsgJ19maWVsZF9zZWxlY3Rvcic7XG4gICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZXJyb3IucGFyYW0gIT09ICd1bmRlZmluZWQnICYmIGVycm9yLnBhcmFtICE9PSAnJykge1xuICAgICAgICAgICAgdGhpc19maWVsZCA9ICdjY18nICsgZXJyb3IucGFyYW0gKyAnX3NlbGVjdG9yJzsgIFxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGF0LmRpc3BsYXlFcnJvck1lc3NhZ2UoZXJyb3IsIHRoaXNfZmllbGQpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHJlc3BvbnNlLmVycm9yICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB2YXIgZXJyb3IgPSByZXNwb25zZS5lcnJvcjtcbiAgICAgICAgaWYgKHR5cGVvZiBlcnJvci5maWVsZCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICB0aGlzX2ZpZWxkID0gZXJyb3IuZmllbGQgKyAnX2ZpZWxkX3NlbGVjdG9yJztcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZXJyb3IucGFyYW0gIT09ICd1bmRlZmluZWQnICYmIGVycm9yLnBhcmFtICE9PSAnJykge1xuICAgICAgICAgIHRoaXNfZmllbGQgPSAnY2NfJyArIGVycm9yLnBhcmFtICsgJ19zZWxlY3Rvcic7ICBcbiAgICAgICAgfVxuICAgICAgICB0aGF0LmRpc3BsYXlFcnJvck1lc3NhZ2UoZXJyb3IsIHRoaXNfZmllbGQpO1xuICAgICAgfVxuICAgICAgaWYgKCQodGhhdC5vcHRpb25zW3RoaXNfZmllbGRdKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICBzY3JvbGxUb3A6ICQodGhhdC5vcHRpb25zW3RoaXNfZmllbGRdKS5wYXJlbnQoKS5vZmZzZXQoKS50b3BcbiAgICAgICAgfSwgMjAwMCk7XG4gICAgICB9XG4gICAgfSwgLy8gaGFuZGxlU2VydmVyRXJyb3JcblxuICAgIGRpc3BsYXlFcnJvck1lc3NhZ2UoZXJyb3IsIGZpZWxkKSB7XG4gICAgICB2YXIgbWVzc2FnZSA9ICcnO1xuICAgICAgdmFyIHN0cmlwZUVycm9yU2VsZWN0b3IgPSAnJztcbiAgICAgIHZhciBmaWVsZFBhcmVudCA9ICQodGhpcy5vcHRpb25zW2ZpZWxkXSkucGFyZW50KCk7XG4gICAgICBpZiAodHlwZW9mIGVycm9yLm1lc3NhZ2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIG1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWVzc2FnZSA9IGVycm9yLm1lc3NhZ2VbMF07XG4gICAgICB9XG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnNbZmllbGRdKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICQodGhpcy5vcHRpb25zW2ZpZWxkXSkuYWRkQ2xhc3MoJ2EtZXJyb3InKTtcbiAgICAgICAgJCh0aGlzLm9wdGlvbnNbZmllbGRdKS5wcmV2KCkuYWRkQ2xhc3MoJ2EtZXJyb3InKTtcbiAgICAgICAgaWYgKCQoJy5hLWNhcmQtaW5zdHJ1Y3Rpb24nLCBmaWVsZFBhcmVudCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICQoJy5hLWNhcmQtaW5zdHJ1Y3Rpb24nLCBmaWVsZFBhcmVudCkuYWRkQ2xhc3MoJ2EtdmFsaWRhdGlvbi1lcnJvcicpO1xuICAgICAgICAgICQoJy5hLWNhcmQtaW5zdHJ1Y3Rpb24nLCBmaWVsZFBhcmVudCkudGV4dChtZXNzYWdlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkKHRoaXMub3B0aW9uc1tmaWVsZF0pLmFmdGVyKCc8cCBjbGFzcz1cImEtY2FyZC1pbnN0cnVjdGlvbiBhLXZhbGlkYXRpb24tZXJyb3JcIj4nICsgbWVzc2FnZSArICc8L3A+Jyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGVycm9yICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aGlzLmJ1dHRvblN0YXR1cyh0aGlzLm9wdGlvbnMsICQodGhpcy5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKSwgZmFsc2UpO1xuICAgICAgICBpZiAoZXJyb3IuY29kZSA9PT0gJ2luY29tcGxldGVfbnVtYmVyJyB8fCBlcnJvci5jb2RlID09ICdpbnZhbGlkX251bWJlcicgfHwgZXJyb3IuY29kZSA9PSAnaW5jb3JyZWN0X251bWJlcicgfHwgZXJyb3IuY29kZSA9PSAnY2FyZF9kZWNsaW5lZCcgfHwgZXJyb3IuY29kZSA9PSAncHJvY2Vzc2luZ19lcnJvcicpIHtcbiAgICAgICAgICAvLyBlcnJvciBoYW5kbGluZ1xuICAgICAgICAgIHN0cmlwZUVycm9yU2VsZWN0b3IgPSAkKHRoaXMub3B0aW9ucy5jY19udW1fc2VsZWN0b3IpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJvci5jb2RlID09ICdpbnZhbGlkX2V4cGlyeV9tb250aCcgfHwgZXJyb3IuY29kZSA9PSAnaW52YWxpZF9leHBpcnlfeWVhcicgfHwgZXJyb3IuY29kZSA9PSAnZXhwaXJlZF9jYXJkJykge1xuICAgICAgICAgIC8vIGVycm9yIGhhbmRsaW5nXG4gICAgICAgICAgc3RyaXBlRXJyb3JTZWxlY3RvciA9ICQodGhpcy5vcHRpb25zLmNjX2V4cF9zZWxlY3Rvcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9yLmNvZGUgPT0gJ2ludmFsaWRfY3ZjJyB8fCBlcnJvci5jb2RlID09ICdpbmNvcnJlY3RfY3ZjJykge1xuICAgICAgICAgIC8vIGVycm9yIGhhbmRsaW5nXG4gICAgICAgICAgc3RyaXBlRXJyb3JTZWxlY3RvciA9ICQodGhpcy5vcHRpb25zLmNjX2N2Y19zZWxlY3Rvcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9yLmNvZGUgPT0gJ2VtYWlsX2ludmFsaWQnKSB7XG4gICAgICAgICAgLy8gZXJyb3IgaGFuZGxpbmdcbiAgICAgICAgICBzdHJpcGVFcnJvclNlbGVjdG9yID0gJCh0aGlzLm9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdHJpcGVFcnJvclNlbGVjdG9yICE9PSAnJykge1xuICAgICAgICAgIHRoaXMuc3RyaXBlRXJyb3JEaXNwbGF5KGVycm9yLCBzdHJpcGVFcnJvclNlbGVjdG9yLCB0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJvci50eXBlID09ICdtaXNzaW5nX3BheW1lbnQnICYmIHN0cmlwZUVycm9yU2VsZWN0b3IgPT09ICcnKSB7XG4gICAgICAgICAgJCh0aGlzLm9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IgKyAnLmFjdGl2ZScpLmFwcGVuZCgnPHAgY2xhc3M9XCJhLWZvcm0tY2FwdGlvbiBhLXZhbGlkYXRpb24tZXJyb3IgYS1taXNzaW5nLXBheW1lbnQtZXJyb3JcIj4nICsgZXJyb3IubWVzc2FnZSArICc8L3A+JylcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXJyb3IuZmllbGQgPT0gJ3JlY2FwdGNoYScpIHtcbiAgICAgICAgICAkKHRoaXMub3B0aW9ucy5wYXlfYnV0dG9uX3NlbGVjdG9yKS5iZWZvcmUoJzxwIGNsYXNzPVwiYS1mb3JtLWNhcHRpb24gYS12YWxpZGF0aW9uLWVycm9yIGEtcmVjYXB0Y2hhLWVycm9yXCI+JyArIG1lc3NhZ2UgKyAnPC9wPicpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9yLnR5cGUgPT0gJ2ludmFsaWRfcmVxdWVzdF9lcnJvcicgJiYgc3RyaXBlRXJyb3JTZWxlY3RvciA9PT0gJycpIHtcbiAgICAgICAgICAkKHRoaXMub3B0aW9ucy5wYXlfYnV0dG9uX3NlbGVjdG9yKS5iZWZvcmUoJzxwIGNsYXNzPVwiYS1mb3JtLWNhcHRpb24gYS12YWxpZGF0aW9uLWVycm9yIGEtaW52YWxpZC1yZXF1ZXN0LWVycm9yXCI+JyArIGVycm9yLm1lc3NhZ2UgKyAnPC9wPicpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCAvLyBkaXNwbGF5RXJyb3JNZXNzYWdlXG5cbiAgICBzaG93TmV3c2xldHRlclNldHRpbmdzOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG5cbiAgICAgIHZhciBuZXdzbGV0dGVyX2dyb3VwX2h0bWwgPSAnJztcbiAgICAgIGlmICgkKG9wdGlvbnMubmV3c2xldHRlcl9ncm91cF9zZWxlY3RvcikubGVuZ3RoID4gMCApIHtcbiAgICAgICAgdmFyIGdldF9kYXRhID0ge1xuICAgICAgICAgIHNob3J0Y29kZTogJ25ld3NsZXR0ZXJfZm9ybScsXG4gICAgICAgICAgcGxhY2VtZW50OiAndXNlcmFjY291bnQnXG4gICAgICAgIH07XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICB1cmw6IG9wdGlvbnMubWlubnBvc3Rfcm9vdCArICcvd3AtanNvbi9taW5ucG9zdC1hcGkvdjIvbWFpbGNoaW1wL2Zvcm0nLFxuICAgICAgICAgIGRhdGE6IGdldF9kYXRhXG4gICAgICAgIH0pLmRvbmUoZnVuY3Rpb24oIHJlc3VsdCApIHtcbiAgICAgICAgICBpZiAoIHR5cGVvZiByZXN1bHQuZ3JvdXBfZmllbGRzICE9PSAndW5kZWZpbmVkJyApIHtcbiAgICAgICAgICAgICQuZWFjaChyZXN1bHQuZ3JvdXBfZmllbGRzLCBmdW5jdGlvbiggaW5kZXgsIGNhdGVnb3J5ICkge1xuICAgICAgICAgICAgICBuZXdzbGV0dGVyX2dyb3VwX2h0bWwgKz0gJzxmaWVsZHNldCBjbGFzcz1cIm0tZm9ybS1pdGVtIHN1cHBvcnQtbmV3c2xldHRlciBtLWZvcm0taXRlbS0nICsgY2F0ZWdvcnkudHlwZSArICdcIj4nO1xuICAgICAgICAgICAgICBuZXdzbGV0dGVyX2dyb3VwX2h0bWwgKz0gJzxsYWJlbD4nICsgY2F0ZWdvcnkubmFtZSArICc6PC9sYWJlbD4nO1xuICAgICAgICAgICAgICBpZiAoIGNhdGVnb3J5LmNvbnRhaW5zLmxlbmd0aCA+IDAgKSB7XG4gICAgICAgICAgICAgICAgbmV3c2xldHRlcl9ncm91cF9odG1sICs9ICc8ZGl2IGNsYXNzPVwibS1mb3JtLWl0ZW0gbS1mb3JtLWl0ZW0tbmV3c2xldHRlclwiPic7XG4gICAgICAgICAgICAgICAgJC5lYWNoKGNhdGVnb3J5W2NhdGVnb3J5LmNvbnRhaW5zXSwgZnVuY3Rpb24oIGluZGV4LCBpdGVtICkge1xuICAgICAgICAgICAgICAgICAgbmV3c2xldHRlcl9ncm91cF9odG1sICs9ICc8bGFiZWw+PGlucHV0IG5hbWU9XCJncm91cHNfc3VibWl0dGVkXCIgdHlwZT1cImNoZWNrYm94XCIgdmFsdWU9XCInICsgaXRlbS5pZCArICdcIj4nICsgaXRlbS5uYW1lICsgJzwvbGFiZWw+JztcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBuZXdzbGV0dGVyX2dyb3VwX2h0bWwgKz0gJzwvZGl2Pic7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgbmV3c2xldHRlcl9ncm91cF9odG1sICs9ICc8L2ZpZWxkc2V0Pic7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICQob3B0aW9ucy5uZXdzbGV0dGVyX2dyb3VwX3NlbGVjdG9yKS5odG1sKG5ld3NsZXR0ZXJfZ3JvdXBfaHRtbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKCQob3B0aW9ucy5uZXdzbGV0dGVyX2dyb3VwX3NlbGVjdG9yKS5sZW5ndGggPiAwICYmIHR5cGVvZiAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB2YXIgZ2V0X2RhdGEgPSB7XG4gICAgICAgICAgZW1haWw6ICQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKClcbiAgICAgICAgfTtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgIHVybDogb3B0aW9ucy5taW5ucG9zdF9yb290ICsgJy93cC1qc29uL21pbm5wb3N0LWFwaS92Mi9tYWlsY2hpbXAvdXNlcicsXG4gICAgICAgICAgZGF0YTogZ2V0X2RhdGFcbiAgICAgICAgfSkuZG9uZShmdW5jdGlvbiggcmVzdWx0ICkge1xuICAgICAgICAgIGlmICggdHlwZW9mIHJlc3VsdC5tYWlsY2hpbXBfc3RhdHVzICE9PSAndW5kZWZpbmVkJyApIHtcbiAgICAgICAgICAgICQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkuYWZ0ZXIoJzxpbnB1dCBuYW1lPVwibWFpbGNoaW1wX3N0YXR1c1wiIHR5cGU9XCJoaWRkZW5cIiB2YWx1ZT1cIicgKyByZXN1bHQubWFpbGNoaW1wX3N0YXR1cyArICdcIj4nKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCB0eXBlb2YgcmVzdWx0Lm1haWxjaGltcF91c2VyX2lkICE9PSAndW5kZWZpbmVkJyApIHtcbiAgICAgICAgICAgICQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkuYWZ0ZXIoJzxpbnB1dCBuYW1lPVwibWFpbGNoaW1wX3VzZXJfaWRcIiB0eXBlPVwiaGlkZGVuXCIgdmFsdWU9XCInICsgcmVzdWx0Lm1haWxjaGltcF91c2VyX2lkICsgJ1wiPicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAocmVzdWx0Lm1haWxjaGltcF9zdGF0dXMgPT09ICdzdWJzY3JpYmVkJykge1xuICAgICAgICAgICAgLy8gdXNlciBjcmVhdGVkIC0gc2hvdyBhIHN1Y2Nlc3MgbWVzc2FnZVxuICAgICAgICAgICAgJCgnLmEtY29uZmlybS1pbnN0cnVjdGlvbnMnKS50ZXh0KCQoJy5hLWNvbmZpcm0taW5zdHJ1Y3Rpb25zJykuYXR0cignZGF0YS1rbm93bi11c2VyJykpO1xuICAgICAgICAgICAgdmFyIGdyb3VwcyA9IHJlc3VsdC5ncm91cHM7XG4gICAgICAgICAgICAkLmVhY2goZ3JvdXBzLCBmdW5jdGlvbiggaW5kZXgsIHZhbHVlICkge1xuICAgICAgICAgICAgICBpZiAoIHZhbHVlID09PSB0cnVlICkge1xuICAgICAgICAgICAgICAgICQoJzpjaGVja2JveFt2YWx1ZT1cIicgKyBpbmRleCArICdcIl0nKS5wcm9wKCdjaGVja2VkJyx0cnVlKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKCc6Y2hlY2tib3hbdmFsdWU9XCInICsgaW5kZXggKyAnXCJdJykucHJvcCgnY2hlY2tlZCcsZmFsc2UpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgfSwgLy8gc2hvd05ld3NsZXR0ZXJTZXR0aW5nc1xuXG4gICAgY29uZmlybU1lc3NhZ2VTdWJtaXQ6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcblxuICAgICAgdmFyIGV4aXN0aW5nX25ld3NsZXR0ZXJfc2V0dGluZ3MgPSAkKG9wdGlvbnMubmV3c2xldHRlcl9ncm91cF9zZWxlY3RvciArICcgaW5wdXQnKS5zZXJpYWxpemUoKTtcbiAgICAgIC8vdGhpcy5kZWJ1ZyhleGlzdGluZ19uZXdzbGV0dGVyX3NldHRpbmdzKTtcblxuICAgICAgJChvcHRpb25zLmNvbmZpcm1fZm9ybV9zZWxlY3Rvcikuc3VibWl0KGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgdmFyIGNvbmZpcm1mb3JtID0gJChvcHRpb25zLmNvbmZpcm1fZm9ybV9zZWxlY3Rvcik7XG4gICAgICAgIC8vIHN1Ym1pdCBzZXR0aW5ncyB0byBtYWlsY2hpbXBcbiAgICAgICAgLy8gbmVlZCB0byBnZXQgdXNlciBpbmZvIG9uIGEgaGlkZGVuIGZpZWxkIGhlcmVcblxuICAgICAgICB2YXIgbmV3c2xldHRlcl9ncm91cHMgPSAkKG9wdGlvbnMubmV3c2xldHRlcl9ncm91cF9zZWxlY3RvciArICcgaW5wdXQ6Y2hlY2tlZCcpO1xuICAgICAgICB2YXIgbmV3X25ld3NsZXR0ZXJfc2V0dGluZ3MgPSBuZXdzbGV0dGVyX2dyb3Vwcy5zZXJpYWxpemUoKTtcblxuICAgICAgICBpZiAoKGV4aXN0aW5nX25ld3NsZXR0ZXJfc2V0dGluZ3MgIT09IG5ld19uZXdzbGV0dGVyX3NldHRpbmdzKSAmJiAodHlwZW9mIG5ld3NsZXR0ZXJfZ3JvdXBzICE9PSAndW5kZWZpbmVkJykpIHtcbiAgICAgICAgICAvL2FkZCBvdXIgb3duIGFqYXggY2hlY2sgYXMgWC1SZXF1ZXN0ZWQtV2l0aCBpcyBub3QgYWx3YXlzIHJlbGlhYmxlXG4gICAgICAgICAgLy9hamF4X2Zvcm1fZGF0YSA9IG5ld19uZXdzbGV0dGVyX3NldHRpbmdzICsgJyZhamF4cmVxdWVzdD10cnVlJnN1YnNjcmliZSc7XG5cbiAgICAgICAgICB2YXIgcG9zdF9kYXRhID0ge1xuICAgICAgICAgICAgZW1haWw6ICQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgICBmaXJzdF9uYW1lOiAkKG9wdGlvbnMuZmlyc3RfbmFtZV9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgICBsYXN0X25hbWU6ICQob3B0aW9ucy5sYXN0X25hbWVfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgICAgZ3JvdXBzX3N1Ym1pdHRlZDoge31cbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgcG9zdF9kYXRhLmdyb3Vwc19hdmFpbGFibGUgPSAnYWxsJztcblxuICAgICAgICAgIGlmICggJCgnaW5wdXRbbmFtZT1cIm1haWxjaGltcF9zdGF0dXNcIl0nKS5sZW5ndGggPiAwICkge1xuICAgICAgICAgICAgcG9zdF9kYXRhLm1haWxjaGltcF9zdGF0dXMgPSAkKCdpbnB1dFtuYW1lPVwibWFpbGNoaW1wX3N0YXR1c1wiXScpLnZhbCgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICggJCgnaW5wdXRbbmFtZT1cIm1haWxjaGltcF91c2VyX2lkXCJdJykubGVuZ3RoID4gMCApIHtcbiAgICAgICAgICAgIHBvc3RfZGF0YS5tYWlsY2hpbXBfdXNlcl9pZCA9ICQoJ2lucHV0W25hbWU9XCJtYWlsY2hpbXBfdXNlcl9pZFwiXScpLnZhbCgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0eXBlb2YgbmV3c2xldHRlcl9ncm91cHMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAkLmVhY2gobmV3c2xldHRlcl9ncm91cHMsIGZ1bmN0aW9uKGluZGV4LCB2YWx1ZSkge1xuICAgICAgICAgICAgICB2YXIgZ3JvdXAgPSAkKHRoaXMpLnZhbCgpO1xuICAgICAgICAgICAgICBwb3N0X2RhdGEuZ3JvdXBzX3N1Ym1pdHRlZFtpbmRleF0gPSBncm91cDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IG9wdGlvbnMubWlubnBvc3Rfcm9vdCArICcvd3AtanNvbi9taW5ucG9zdC1hcGkvdjIvbWFpbGNoaW1wL3VzZXInLFxuICAgICAgICAgICAgdHlwZTogJ3Bvc3QnLFxuICAgICAgICAgICAgZGF0YVR5cGUgOiAnanNvbicsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkocG9zdF9kYXRhKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmRvbmUoZnVuY3Rpb24ocmVzcG9uc2UpIHsgLy8gcmVzcG9uc2UgZnJvbSB0aGUgUEhQIGFjdGlvblxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSAnJztcbiAgICAgICAgICAgIGlmICggcmVzcG9uc2Uuc3VjY2VzcyA9PT0gdHJ1ZSApIHtcbiAgICAgICAgICAgICAgLypzd2l0Y2ggKHJlc3BvbnNlLmRhdGEudXNlcl9zdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdleGlzdGluZyc6XG4gICAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ1RoYW5rcyBmb3IgdXBkYXRpbmcgeW91ciBlbWFpbCBwcmVmZXJlbmNlcy4gVGhleSB3aWxsIGdvIGludG8gZWZmZWN0IGltbWVkaWF0ZWx5Lic7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICduZXcnOlxuICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9ICdXZSBoYXZlIGFkZGVkIHlvdSB0byB0aGUgTWlublBvc3QgbWFpbGluZyBsaXN0Lic7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdwZW5kaW5nJzpcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnV2UgaGF2ZSBhZGRlZCB5b3UgdG8gdGhlIE1pbm5Qb3N0IG1haWxpbmcgbGlzdC4gWW91IHdpbGwgbmVlZCB0byBjbGljayB0aGUgY29uZmlybWF0aW9uIGxpbmsgaW4gdGhlIGVtYWlsIHdlIHNlbnQgdG8gYmVnaW4gcmVjZWl2aW5nIG1lc3NhZ2VzLic7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfSovXG4gICAgICAgICAgICAgIC8vY29uZmlybWZvcm0uZ2V0KDApLnN1Ym1pdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uZmlybWZvcm0uZ2V0KDApLnN1Ym1pdCgpO1xuICAgICAgICAgICAgLy8kKCcubS1ob2xkLW1lc3NhZ2UnKS5odG1sKCc8ZGl2IGNsYXNzPVwibS1mb3JtLW1lc3NhZ2UgbS1mb3JtLW1lc3NhZ2UtaW5mb1wiPicgKyBtZXNzYWdlICsgJzwvZGl2PicpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmZhaWwoZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIC8vIHdlIHNob3VsZCBwdXQgYW4gYWN0dWFsIGVycm9yIG1lc3NhZ2UgaGVyZSBzb21lZGF5LCBwcm9iYWJseVxuICAgICAgICAgICAgLy8kKCcubS1ob2xkLW1lc3NhZ2UnKS5odG1sKCc8ZGl2IGNsYXNzPVwibS1mb3JtLW1lc3NhZ2UgbS1mb3JtLW1lc3NhZ2UtaW5mb1wiPkFuIGVycm9yIGhhcyBvY2N1cmVkLiBQbGVhc2UgdHJ5IGFnYWluLjwvZGl2PicpO1xuICAgICAgICAgICAgY29uZmlybWZvcm0uZ2V0KDApLnN1Ym1pdCgpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0gZWxzZSB7IC8vIGVuZCBwYXJ0IHdoZXJlIHNldHRpbmdzIGNoYW5nZWRcbiAgICAgICAgICBjb25maXJtZm9ybS5nZXQoMCkuc3VibWl0KCk7XG4gICAgICAgIH1cblxuICAgICAgfSk7XG4gICAgICAvL3JldHVybiBmYWxzZTtcbiAgICB9LCAvLyBjb25maXJtTWVzc2FnZVN1Ym1pdFxuXG4gIH07IC8vIHBsdWdpbi5wcm90b3R5cGVcblxuICAvLyBBIHJlYWxseSBsaWdodHdlaWdodCBwbHVnaW4gd3JhcHBlciBhcm91bmQgdGhlIGNvbnN0cnVjdG9yLFxuICAvLyBwcmV2ZW50aW5nIGFnYWluc3QgbXVsdGlwbGUgaW5zdGFudGlhdGlvbnNcbiAgJC5mbltwbHVnaW5OYW1lXSA9IGZ1bmN0aW9uICggb3B0aW9ucyApIHtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICghJC5kYXRhKHRoaXMsICdwbHVnaW5fJyArIHBsdWdpbk5hbWUpKSB7XG4gICAgICAgICQuZGF0YSh0aGlzLCAncGx1Z2luXycgKyBwbHVnaW5OYW1lLCBuZXcgUGx1Z2luKCB0aGlzLCBvcHRpb25zICkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG59KSggalF1ZXJ5LCB3aW5kb3csIGRvY3VtZW50ICk7Il19
}(jQuery));
