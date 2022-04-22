;(function($) {
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZhbGlkLWZvcm0ubWluLmpzIiwibWlubnBvc3QuZ2l2aW5nLmpzIl0sIm5hbWVzIjpbInIiLCJlIiwibiIsInQiLCJvIiwiaSIsImYiLCJjIiwicmVxdWlyZSIsInUiLCJhIiwiRXJyb3IiLCJjb2RlIiwicCIsImV4cG9ydHMiLCJjYWxsIiwibGVuZ3RoIiwibW9kdWxlIiwiX3ZhbGlkRm9ybSIsIl92YWxpZEZvcm0yIiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsIm9iaiIsIl9fZXNNb2R1bGUiLCJkZWZhdWx0Iiwid2luZG93IiwiVmFsaWRGb3JtIiwidG9nZ2xlSW52YWxpZENsYXNzIiwiaGFuZGxlQ3VzdG9tTWVzc2FnZXMiLCJoYW5kbGVDdXN0b21NZXNzYWdlRGlzcGxheSIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwidmFsdWUiLCJjbG9uZSIsImRlZmF1bHRzIiwiaW5zZXJ0QWZ0ZXIiLCJpbnNlcnRCZWZvcmUiLCJmb3JFYWNoIiwiZGVib3VuY2UiLCJjb3B5IiwiYXR0ciIsImhhc093blByb3BlcnR5IiwiZGVmYXVsdE9iamVjdCIsImsiLCJ1bmRlZmluZWQiLCJyZWZOb2RlIiwibm9kZVRvSW5zZXJ0Iiwic2libGluZyIsIm5leHRTaWJsaW5nIiwiX3BhcmVudCIsInBhcmVudE5vZGUiLCJwYXJlbnQiLCJhcHBlbmRDaGlsZCIsIml0ZW1zIiwiZm4iLCJtcyIsInRpbWVvdXQiLCJkZWJvdW5jZWRGbiIsImNsZWFyVGltZW91dCIsInNldFRpbWVvdXQiLCJ2YWxpZEZvcm0iLCJfdXRpbCIsImlucHV0IiwiaW52YWxpZENsYXNzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNsYXNzTGlzdCIsImFkZCIsInZhbGlkaXR5IiwidmFsaWQiLCJyZW1vdmUiLCJlcnJvclByb3BzIiwiZ2V0Q3VzdG9tTWVzc2FnZSIsImN1c3RvbU1lc3NhZ2VzIiwibG9jYWxFcnJvclByb3BzIiwidHlwZSIsImNvbmNhdCIsInByb3AiLCJnZXRBdHRyaWJ1dGUiLCJjaGVja1ZhbGlkaXR5IiwibWVzc2FnZSIsInNldEN1c3RvbVZhbGlkaXR5Iiwib3B0aW9ucyIsInZhbGlkYXRpb25FcnJvckNsYXNzIiwidmFsaWRhdGlvbkVycm9yUGFyZW50Q2xhc3MiLCJlcnJvclBsYWNlbWVudCIsImluc2VydEVycm9yIiwiZXJyb3JOb2RlIiwicXVlcnlTZWxlY3RvciIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInZhbGlkYXRpb25NZXNzYWdlIiwiY2xhc3NOYW1lIiwidGV4dENvbnRlbnQiLCJwcmV2ZW50RGVmYXVsdCIsImRlZmF1bHRPcHRpb25zIiwiZWxlbWVudCIsIm5vZGVOYW1lIiwiaW5wdXRzIiwidG9Mb3dlckNhc2UiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9jdXNJbnZhbGlkSW5wdXQiLCJ2YWxpZEZvcm1JbnB1dHMiLCJmb3JtIiwiZm9jdXNGaXJzdCIsImludmFsaWROb2RlIiwiZm9jdXMiLCIkIiwicGx1Z2luTmFtZSIsIlBsdWdpbiIsImV4dGVuZCIsIl9kZWZhdWx0cyIsIl9uYW1lIiwiaW5pdCIsInByb3RvdHlwZSIsInJlc2V0IiwiYW1vdW50IiwiZG9jdW1lbnRFbGVtZW50IiwicGFyc2VGbG9hdCIsImxldmVsX2Ftb3VudF9zZWxlY3RvciIsInRleHQiLCJvcmlnaW5hbF9hbW91bnQiLCJwYXJzZUludCIsIm9yaWdpbmFsX2Ftb3VudF9zZWxlY3RvciIsInZhbCIsInByb2Nlc3NpbmdfZmVlIiwiTWF0aCIsInJvdW5kIiwiZmVlX2Ftb3VudCIsInBvdyIsInRvRml4ZWQiLCJwcm9jZXNzaW5nX2ZlZV90ZXh0IiwiY3JlYXRlX2FjY291bnQiLCJidXR0b25fdGV4dCIsInBheV9idXR0b25fc2VsZWN0b3IiLCJzdHJpcGUiLCJTdHJpcGUiLCJzdHJpcGVfcHVibGlzaGFibGVfa2V5IiwiZWxlbWVudHMiLCJmb250cyIsImNzc1NyYyIsImRlYnVnIiwiYW5hbHl0aWNzVHJhY2tpbmciLCJhbW91bnRBc1JhZGlvIiwiYW1vdW50VXBkYXRlZCIsInBheV9jY19wcm9jZXNzaW5nX3NlbGVjdG9yIiwiY3JlZGl0Q2FyZFByb2Nlc3NpbmdGZWVzIiwiZG9uYXRlX2Zvcm1fc2VsZWN0b3IiLCJkb25hdGVBbm9ueW1vdXNseSIsImhvbm9yT3JNZW1vcnlUb2dnbGUiLCJvdXRzaWRlVW5pdGVkU3RhdGVzIiwic2hpcHBpbmdBZGRyZXNzIiwiYWxsb3dNaW5ucG9zdEFjY291bnQiLCJwYXltZW50UmVxdWVzdEJ1dHRvbiIsImNob29zZVBheW1lbnRNZXRob2QiLCJjcmVkaXRDYXJkRmllbGRzIiwidmFsaWRhdGVTZXR1cCIsImZvcm1TZXR1cCIsImNvbmZpcm1fZm9ybV9zZWxlY3RvciIsInNob3dOZXdzbGV0dGVyU2V0dGluZ3MiLCJjb25maXJtTWVzc2FnZVN1Ym1pdCIsImNvbnNvbGUiLCJsb2ciLCJkaXIiLCJhbmFseXRpY3NfdHlwZSIsInByb2dyZXNzIiwicHJvZ3Jlc3Nfc2VsZWN0b3IiLCJzdGVwIiwiYWN0aW9uIiwibmF2X2l0ZW1fY291bnQiLCJvcHBfaWQiLCJvcHBfaWRfc2VsZWN0b3IiLCJwb3N0X3B1cmNoYXNlIiwiZ2EiLCJpbmRleCIsImZpbmlzaF9zZWN0aW9uX3NlbGVjdG9yIiwiYW5hbHl0aWNzVHJhY2tpbmdTdGVwIiwiaW5zdGFsbG1lbnRfcGVyaW9kIiwibGV2ZWwiLCJ0aGF0IiwiaW5zdGFsbG1lbnRfcGVyaW9kX3NlbGVjdG9yIiwiZGF0YSIsImFqYXgiLCJtZXRob2QiLCJ1cmwiLCJkb25lIiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzbGljZSIsInByb2R1Y3QiLCJnZXRUb3RhbEFtb3VudCIsImd0YWciLCJwYWdlX3RpdGxlIiwidGl0bGUiLCJwYWdlX3BhdGgiLCJsb2NhdGlvbiIsInBhdGhuYW1lIiwicGFnZSIsInNldFJhZGlvQW1vdW50IiwiY2hhbmdlIiwiZmllbGQiLCJzdHJpcGVfcGF5bWVudF90eXBlIiwiZ2V0U3RyaXBlUGF5bWVudFR5cGUiLCJpcyIsImNhbGN1bGF0ZUZlZXMiLCJzZXRGYWlyTWFya2V0VmFsdWUiLCJhbW91bnRfc2VsZWN0b3JfZmFpcl9tYXJrZXQiLCJhZGRpdGlvbmFsX2Ftb3VudF9maWVsZCIsInRvdGFsX2Ftb3VudCIsImFkZGl0aW9uYWxfYW1vdW50IiwiYW1vdW50X3NlbGVjdG9yIiwiZmFpcl9tYXJrZXRfdmFsdWVfc2VsZWN0b3IiLCJmYWlyTWFya2V0VmFsdWUiLCJzZXRTdHJpcGVQYXltZW50VHlwZSIsImZlZXMiLCJjcmVkaXRDYXJkRmVlQ2hlY2tib3giLCJvbiIsImFwcGVuZCIsImZ1bGxfYW1vdW50IiwiYWRkQ2xhc3MiLCJmdWxsX2Ftb3VudF9zZWxlY3RvciIsInBheW1lbnRSZXF1ZXN0IiwidXBkYXRlIiwidG90YWwiLCJsYWJlbCIsInRvZ2dsZUFub255bW91cyIsImFub255bW91c19zZWxlY3RvciIsIm5hbWVfc2VsZWN0b3IiLCJoaWRlIiwic2hvdyIsImhvbm9yT3JNZW1vcnkiLCJob25vcl9vcl9tZW1vcnlfY2hvb3NlciIsImhvbm9yX21lbW9yeV9pbnB1dF9ncm91cCIsImhvbm9yX3R5cGVfc2VsZWN0b3IiLCJob25vcl9uYW1lX3NlbGVjdG9yIiwic2hvd19iaWxsaW5nX2NvdW50cnlfc2VsZWN0b3IiLCJjbGljayIsImNoYW5nZUZpZWxkc091dHNpZGVVUyIsInNob3dfc2hpcHBpbmdfY291bnRyeV9zZWxlY3RvciIsInNoaXBwaW5nX2NvdW50cnlfc2VsZWN0b3IiLCJiaWxsaW5nX29yX3NoaXBwaW5nIiwiemlwX3BhcmVudCIsImJpbGxpbmdfemlwX2ZpZWxkX3NlbGVjdG9yIiwic3RhdGVfcGFyZW50IiwiYmlsbGluZ19zdGF0ZV9maWVsZF9zZWxlY3RvciIsImJpbGxpbmdfY291bnRyeV9zZWxlY3RvciIsInNoaXBwaW5nX3ppcF9maWVsZF9zZWxlY3RvciIsInNoaXBwaW5nX3N0YXRlX2ZpZWxkX3NlbGVjdG9yIiwiY2hhbmdlRmllbGRzSW5zaWRlVVMiLCJodG1sIiwic2hvd19zaGlwcGluZyIsInVzZV9mb3Jfc2hpcHBpbmdfc2VsZWN0b3IiLCJzaGlwcGluZ19zZWxlY3RvciIsImFjY291bnRfZXhpc3RzIiwic2hvd1Bhc3N3b3JkIiwic2hvd1Bhc3N3b3JkU3RyZW5ndGgiLCJzcGFtRW1haWwiLCJlbWFpbF9maWVsZF9zZWxlY3RvciIsInRvZ2dsZUFjY291bnRGaWVsZHMiLCJjcmVhdGVfbXBfc2VsZWN0b3IiLCJkb25lVHlwaW5nIiwiZW1haWwiLCJjaGVja01pbm5wb3N0QWNjb3VudCIsInR5cGluZ1RpbWVyIiwiZG9uZVR5cGluZ0ludGVydmFsIiwia2V5dXAiLCJlbWFpbF9maWVsZCIsInNwYW1FcnJvckNvbnRhaW5lciIsInJlbW92ZUNsYXNzIiwiY3JlYXRlX2FjY291bnRfc2VsZWN0b3IiLCJiZWZvcmUiLCJwYXNzd29yZF9zZWxlY3RvciIsIiRzdWJtaXQiLCIkY29udGFpbmVyIiwiJGZpZWxkIiwic2hvd19wYXNzIiwiJHRvZ2dsZSIsImNoZWNrYm94IiwiJGJlZm9yZSIsImFmdGVyIiwiY2hlY2tQYXNzd29yZFN0cmVuZ3RoIiwiJHBhc3N3b3JkIiwiJHN0cmVuZ3RoTWV0ZXIiLCIkc3RyZW5ndGhUZXh0IiwicGFzc3dvcmQiLCJyZXN1bHQiLCJ6eGN2Ym4iLCJzdHJlbmd0aCIsInNjb3JlIiwidXNlciIsIm1pbm5wb3N0X3Jvb3QiLCJzdGF0dXMiLCJyZWFzb24iLCJjb3VudHJ5IiwiY3VycmVuY3kiLCJwckJ1dHRvbiIsImNyZWF0ZSIsInN0eWxlIiwidGhlbWUiLCJoZWlnaHQiLCJjYW5NYWtlUGF5bWVudCIsInRoZW4iLCJtb3VudCIsImhpZGVQYXltZW50UmVxdWVzdCIsImV2ZW50Iiwic3VwcG9ydGZvcm0iLCJnZXQiLCJyZXBvcnRWYWxpZGl0eSIsInRva2VuRmllbGROYW1lIiwidG9rZW5GaWVsZCIsInBheW1lbnRNZXRob2QiLCJpZCIsImZvcm1Qcm9jZXNzb3IiLCJoaWRlRWxlbWVudCIsImNob29zZV9wYXltZW50IiwiY2hlY2tlZF9pZCIsImNoZWNrZWRfdmFsdWUiLCJzZXR1cFBheW1lbnRNZXRob2QiLCJlbGVtZW50X2lkIiwiZWxlbWVudF92YWx1ZSIsImFjaEZpZWxkcyIsInJlbW92ZUFjaEZpZWxkcyIsInBheW1lbnRfbWV0aG9kX3NlbGVjdG9yIiwicGxhaWRfbGluayIsImJ1dHRvbkRpc2FibGVkIiwibGlua0hhbmRsZXIiLCJkZXN0cm95IiwiYmFzZSIsImljb25Db2xvciIsImxpbmVIZWlnaHQiLCJmb250V2VpZ2h0IiwiZm9udEZhbWlseSIsImZvbnRTaXplIiwiaW52YWxpZCIsImNvbG9yIiwiY2FyZE51bWJlckVsZW1lbnQiLCJzaG93SWNvbiIsImNjX251bV9zZWxlY3RvciIsImNhcmRFeHBpcnlFbGVtZW50IiwiY2NfZXhwX3NlbGVjdG9yIiwiY2FyZEN2Y0VsZW1lbnQiLCJjY19jdmNfc2VsZWN0b3IiLCJicmFuZCIsInN0cmlwZUVycm9yRGlzcGxheSIsImVycm9yIiwiYnV0dG9uU3RhdHVzIiwiZmluZCIsInNob3dTcGlubmVyIiwiaGlkZVNwaW5uZXIiLCJiYW5rVG9rZW5GaWVsZE5hbWUiLCJiYW5rVG9rZW5GaWVsZCIsIlBsYWlkIiwiY2xpZW50TmFtZSIsImVudiIsInBsYWlkX2VudiIsInRva2VuIiwiZ2V0RWxlbWVudEJ5SWQiLCJvblN1Y2Nlc3MiLCJwdWJsaWNfdG9rZW4iLCJtZXRhZGF0YSIsIkpTT04iLCJzdHJpbmdpZnkiLCJhY2NvdW50X2lkIiwiY29udGVudFR5cGUiLCJyZXNwb25zZSIsInN0cmlwZV9iYW5rX2FjY291bnRfdG9rZW4iLCJwcmVwZW5kIiwiZmFpbCIsInJlc2V0Rm9ybUVycm9ycyIsIm9wZW4iLCJidXR0b24iLCJkaXNhYmxlZCIsImFjaF93YXNfaW5pdGlhbGl6ZWQiLCJyZW1vdmVBdHRyIiwidGxpdGUiLCJncmF2IiwiZm9ybXMiLCJmb3JtX3NlbGVjdG9yIiwic2Nyb2xsVG9Gb3JtRXJyb3IiLCJmaXJzdCIsImZpcnN0X2hvbGRlciIsImVsZW1lbnRPZmZzZXQiLCJvZmZzZXQiLCJ0b3AiLCJwYWdlT2Zmc2V0IiwicGFnZVlPZmZzZXQiLCJpbm5lckhlaWdodCIsInNjcm9sbFRvcCIsInN1Ym1pdCIsImJpbGxpbmdEZXRhaWxzIiwiZ2VuZXJhdGVCaWxsaW5nRGV0YWlscyIsImNyZWF0ZU1pbm5Qb3N0QWNjb3VudCIsInBheW1lbnRfdHlwZSIsImNyZWF0ZVBheW1lbnRNZXRob2QiLCJiYW5rVG9rZW5IYW5kbGVyIiwic3VibWl0Rm9ybU9ubHkiLCJ0aGlzX3NlbGVjdG9yIiwid2hpY2hfZXJyb3IiLCJlbXB0eSIsImFuaW1hdGUiLCJmaXJzdF9uYW1lIiwiZmlyc3RfbmFtZV9maWVsZF9zZWxlY3RvciIsImxhc3RfbmFtZSIsImxhc3RfbmFtZV9maWVsZF9zZWxlY3RvciIsInBhc3N3b3JkX2ZpZWxkX3NlbGVjdG9yIiwiY2l0eSIsImJpbGxpbmdfY2l0eV9maWVsZF9zZWxlY3RvciIsInN0YXRlIiwiemlwIiwiYWRkcmVzc0RldGFpbHMiLCJmdWxsX25hbWUiLCJuYW1lIiwic3RyZWV0IiwiYmlsbGluZ19zdHJlZXRfZmllbGRfc2VsZWN0b3IiLCJsaW5lMSIsInBvc3RhbF9jb2RlIiwiY291bnRyeV9maWVsZF92YWx1ZSIsImJpbGxpbmdfY291bnRyeV9maWVsZF9zZWxlY3RvciIsImFkZHJlc3MiLCJjYXJkRWxlbWVudCIsImNhcmQiLCJiaWxsaW5nX2RldGFpbHMiLCJoYW5kbGVTZXJ2ZXJFcnJvciIsImFqYXhfdXJsIiwiZmV0Y2giLCJoZWFkZXJzIiwiYm9keSIsInNlcmlhbGl6ZSIsImpzb24iLCJoYW5kbGVTZXJ2ZXJSZXNwb25zZSIsImNhY2hlIiwiZXJyb3JzIiwicmVxdWlyZXNfYWN0aW9uIiwidGhpc19maWVsZCIsImVhY2giLCJwYXJhbSIsImRpc3BsYXlFcnJvck1lc3NhZ2UiLCJzdHJpcGVFcnJvclNlbGVjdG9yIiwiZmllbGRQYXJlbnQiLCJwcmV2IiwibmV3c2xldHRlcl9ncm91cF9odG1sIiwibmV3c2xldHRlcl9ncm91cF9zZWxlY3RvciIsImdldF9kYXRhIiwic2hvcnRjb2RlIiwicGxhY2VtZW50IiwiZ3JvdXBfZmllbGRzIiwiY2F0ZWdvcnkiLCJjb250YWlucyIsIml0ZW0iLCJtYWlsY2hpbXBfc3RhdHVzIiwibWFpbGNoaW1wX3VzZXJfaWQiLCJncm91cHMiLCJleGlzdGluZ19uZXdzbGV0dGVyX3NldHRpbmdzIiwiY29uZmlybWZvcm0iLCJuZXdzbGV0dGVyX2dyb3VwcyIsIm5ld19uZXdzbGV0dGVyX3NldHRpbmdzIiwicG9zdF9kYXRhIiwiZ3JvdXBzX3N1Ym1pdHRlZCIsImdyb3Vwc19hdmFpbGFibGUiLCJncm91cCIsImRhdGFUeXBlIiwic3VjY2VzcyIsImpRdWVyeSJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxDQUFDLFlBQVU7QUFBQyxXQUFTQSxDQUFULENBQVdDLENBQVgsRUFBYUMsQ0FBYixFQUFlQyxDQUFmLEVBQWlCO0FBQUMsYUFBU0MsQ0FBVCxDQUFXQyxDQUFYLEVBQWFDLENBQWIsRUFBZTtBQUFDLFVBQUcsQ0FBQ0osQ0FBQyxDQUFDRyxDQUFELENBQUwsRUFBUztBQUFDLFlBQUcsQ0FBQ0osQ0FBQyxDQUFDSSxDQUFELENBQUwsRUFBUztBQUFDLGNBQUlFLENBQUMsR0FBQyxjQUFZLE9BQU9DLE9BQW5CLElBQTRCQSxPQUFsQztBQUEwQyxjQUFHLENBQUNGLENBQUQsSUFBSUMsQ0FBUCxFQUFTLE9BQU9BLENBQUMsQ0FBQ0YsQ0FBRCxFQUFHLENBQUMsQ0FBSixDQUFSO0FBQWUsY0FBR0ksQ0FBSCxFQUFLLE9BQU9BLENBQUMsQ0FBQ0osQ0FBRCxFQUFHLENBQUMsQ0FBSixDQUFSO0FBQWUsY0FBSUssQ0FBQyxHQUFDLElBQUlDLEtBQUosQ0FBVSx5QkFBdUJOLENBQXZCLEdBQXlCLEdBQW5DLENBQU47QUFBOEMsZ0JBQU1LLENBQUMsQ0FBQ0UsSUFBRixHQUFPLGtCQUFQLEVBQTBCRixDQUFoQztBQUFrQzs7QUFBQSxZQUFJRyxDQUFDLEdBQUNYLENBQUMsQ0FBQ0csQ0FBRCxDQUFELEdBQUs7QUFBQ1MsVUFBQUEsT0FBTyxFQUFDO0FBQVQsU0FBWDtBQUF3QmIsUUFBQUEsQ0FBQyxDQUFDSSxDQUFE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Q0F4aURBLEVBd2lERzRYLE1BeGlESCxFQXdpRFdwYixNQXhpRFgsRUF3aURtQitELFFBeGlEbkIiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkoezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1widXNlIHN0cmljdFwiO3ZhciBfdmFsaWRGb3JtPXJlcXVpcmUoXCIuL3NyYy92YWxpZC1mb3JtXCIpO3ZhciBfdmFsaWRGb3JtMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF92YWxpZEZvcm0pO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKXtyZXR1cm4gb2JqJiZvYmouX19lc01vZHVsZT9vYmo6e2RlZmF1bHQ6b2JqfX13aW5kb3cuVmFsaWRGb3JtPV92YWxpZEZvcm0yLmRlZmF1bHQ7d2luZG93LlZhbGlkRm9ybS50b2dnbGVJbnZhbGlkQ2xhc3M9X3ZhbGlkRm9ybS50b2dnbGVJbnZhbGlkQ2xhc3M7d2luZG93LlZhbGlkRm9ybS5oYW5kbGVDdXN0b21NZXNzYWdlcz1fdmFsaWRGb3JtLmhhbmRsZUN1c3RvbU1lc3NhZ2VzO3dpbmRvdy5WYWxpZEZvcm0uaGFuZGxlQ3VzdG9tTWVzc2FnZURpc3BsYXk9X3ZhbGlkRm9ybS5oYW5kbGVDdXN0b21NZXNzYWdlRGlzcGxheX0se1wiLi9zcmMvdmFsaWQtZm9ybVwiOjN9XSwyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6dHJ1ZX0pO2V4cG9ydHMuY2xvbmU9Y2xvbmU7ZXhwb3J0cy5kZWZhdWx0cz1kZWZhdWx0cztleHBvcnRzLmluc2VydEFmdGVyPWluc2VydEFmdGVyO2V4cG9ydHMuaW5zZXJ0QmVmb3JlPWluc2VydEJlZm9yZTtleHBvcnRzLmZvckVhY2g9Zm9yRWFjaDtleHBvcnRzLmRlYm91bmNlPWRlYm91bmNlO2Z1bmN0aW9uIGNsb25lKG9iail7dmFyIGNvcHk9e307Zm9yKHZhciBhdHRyIGluIG9iail7aWYob2JqLmhhc093blByb3BlcnR5KGF0dHIpKWNvcHlbYXR0cl09b2JqW2F0dHJdfXJldHVybiBjb3B5fWZ1bmN0aW9uIGRlZmF1bHRzKG9iaixkZWZhdWx0T2JqZWN0KXtvYmo9Y2xvbmUob2JqfHx7fSk7Zm9yKHZhciBrIGluIGRlZmF1bHRPYmplY3Qpe2lmKG9ialtrXT09PXVuZGVmaW5lZClvYmpba109ZGVmYXVsdE9iamVjdFtrXX1yZXR1cm4gb2JqfWZ1bmN0aW9uIGluc2VydEFmdGVyKHJlZk5vZGUsbm9kZVRvSW5zZXJ0KXt2YXIgc2libGluZz1yZWZOb2RlLm5leHRTaWJsaW5nO2lmKHNpYmxpbmcpe3ZhciBfcGFyZW50PXJlZk5vZGUucGFyZW50Tm9kZTtfcGFyZW50Lmluc2VydEJlZm9yZShub2RlVG9JbnNlcnQsc2libGluZyl9ZWxzZXtwYXJlbnQuYXBwZW5kQ2hpbGQobm9kZVRvSW5zZXJ0KX19ZnVuY3Rpb24gaW5zZXJ0QmVmb3JlKHJlZk5vZGUsbm9kZVRvSW5zZXJ0KXt2YXIgcGFyZW50PXJlZk5vZGUucGFyZW50Tm9kZTtwYXJlbnQuaW5zZXJ0QmVmb3JlKG5vZGVUb0luc2VydCxyZWZOb2RlKX1mdW5jdGlvbiBmb3JFYWNoKGl0ZW1zLGZuKXtpZighaXRlbXMpcmV0dXJuO2lmKGl0ZW1zLmZvckVhY2gpe2l0ZW1zLmZvckVhY2goZm4pfWVsc2V7Zm9yKHZhciBpPTA7aTxpdGVtcy5sZW5ndGg7aSsrKXtmbihpdGVtc1tpXSxpLGl0ZW1zKX19fWZ1bmN0aW9uIGRlYm91bmNlKG1zLGZuKXt2YXIgdGltZW91dD12b2lkIDA7dmFyIGRlYm91bmNlZEZuPWZ1bmN0aW9uIGRlYm91bmNlZEZuKCl7Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO3RpbWVvdXQ9c2V0VGltZW91dChmbixtcyl9O3JldHVybiBkZWJvdW5jZWRGbn19LHt9XSwzOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6dHJ1ZX0pO2V4cG9ydHMudG9nZ2xlSW52YWxpZENsYXNzPXRvZ2dsZUludmFsaWRDbGFzcztleHBvcnRzLmhhbmRsZUN1c3RvbU1lc3NhZ2VzPWhhbmRsZUN1c3RvbU1lc3NhZ2VzO2V4cG9ydHMuaGFuZGxlQ3VzdG9tTWVzc2FnZURpc3BsYXk9aGFuZGxlQ3VzdG9tTWVzc2FnZURpc3BsYXk7ZXhwb3J0cy5kZWZhdWx0PXZhbGlkRm9ybTt2YXIgX3V0aWw9cmVxdWlyZShcIi4vdXRpbFwiKTtmdW5jdGlvbiB0b2dnbGVJbnZhbGlkQ2xhc3MoaW5wdXQsaW52YWxpZENsYXNzKXtpbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiaW52YWxpZFwiLGZ1bmN0aW9uKCl7aW5wdXQuY2xhc3NMaXN0LmFkZChpbnZhbGlkQ2xhc3MpfSk7aW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsZnVuY3Rpb24oKXtpZihpbnB1dC52YWxpZGl0eS52YWxpZCl7aW5wdXQuY2xhc3NMaXN0LnJlbW92ZShpbnZhbGlkQ2xhc3MpfX0pfXZhciBlcnJvclByb3BzPVtcImJhZElucHV0XCIsXCJwYXR0ZXJuTWlzbWF0Y2hcIixcInJhbmdlT3ZlcmZsb3dcIixcInJhbmdlVW5kZXJmbG93XCIsXCJzdGVwTWlzbWF0Y2hcIixcInRvb0xvbmdcIixcInRvb1Nob3J0XCIsXCJ0eXBlTWlzbWF0Y2hcIixcInZhbHVlTWlzc2luZ1wiLFwiY3VzdG9tRXJyb3JcIl07ZnVuY3Rpb24gZ2V0Q3VzdG9tTWVzc2FnZShpbnB1dCxjdXN0b21NZXNzYWdlcyl7Y3VzdG9tTWVzc2FnZXM9Y3VzdG9tTWVzc2FnZXN8fHt9O3ZhciBsb2NhbEVycm9yUHJvcHM9W2lucHV0LnR5cGUrXCJNaXNtYXRjaFwiXS5jb25jYXQoZXJyb3JQcm9wcyk7dmFyIHZhbGlkaXR5PWlucHV0LnZhbGlkaXR5O2Zvcih2YXIgaT0wO2k8bG9jYWxFcnJvclByb3BzLmxlbmd0aDtpKyspe3ZhciBwcm9wPWxvY2FsRXJyb3JQcm9wc1tpXTtpZih2YWxpZGl0eVtwcm9wXSl7cmV0dXJuIGlucHV0LmdldEF0dHJpYnV0ZShcImRhdGEtXCIrcHJvcCl8fGN1c3RvbU1lc3NhZ2VzW3Byb3BdfX19ZnVuY3Rpb24gaGFuZGxlQ3VzdG9tTWVzc2FnZXMoaW5wdXQsY3VzdG9tTWVzc2FnZXMpe2Z1bmN0aW9uIGNoZWNrVmFsaWRpdHkoKXt2YXIgbWVzc2FnZT1pbnB1dC52YWxpZGl0eS52YWxpZD9udWxsOmdldEN1c3RvbU1lc3NhZ2UoaW5wdXQsY3VzdG9tTWVzc2FnZXMpO2lucHV0LnNldEN1c3RvbVZhbGlkaXR5KG1lc3NhZ2V8fFwiXCIpfWlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLGNoZWNrVmFsaWRpdHkpO2lucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnZhbGlkXCIsY2hlY2tWYWxpZGl0eSl9ZnVuY3Rpb24gaGFuZGxlQ3VzdG9tTWVzc2FnZURpc3BsYXkoaW5wdXQsb3B0aW9ucyl7dmFyIHZhbGlkYXRpb25FcnJvckNsYXNzPW9wdGlvbnMudmFsaWRhdGlvbkVycm9yQ2xhc3MsdmFsaWRhdGlvbkVycm9yUGFyZW50Q2xhc3M9b3B0aW9ucy52YWxpZGF0aW9uRXJyb3JQYXJlbnRDbGFzcyxlcnJvclBsYWNlbWVudD1vcHRpb25zLmVycm9yUGxhY2VtZW50O2Z1bmN0aW9uIGNoZWNrVmFsaWRpdHkob3B0aW9ucyl7dmFyIGluc2VydEVycm9yPW9wdGlvbnMuaW5zZXJ0RXJyb3I7dmFyIHBhcmVudE5vZGU9aW5wdXQucGFyZW50Tm9kZTt2YXIgZXJyb3JOb2RlPXBhcmVudE5vZGUucXVlcnlTZWxlY3RvcihcIi5cIit2YWxpZGF0aW9uRXJyb3JDbGFzcyl8fGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7aWYoIWlucHV0LnZhbGlkaXR5LnZhbGlkJiZpbnB1dC52YWxpZGF0aW9uTWVzc2FnZSl7ZXJyb3JOb2RlLmNsYXNzTmFtZT12YWxpZGF0aW9uRXJyb3JDbGFzcztlcnJvck5vZGUudGV4dENvbnRlbnQ9aW5wdXQudmFsaWRhdGlvbk1lc3NhZ2U7aWYoaW5zZXJ0RXJyb3Ipe2Vycm9yUGxhY2VtZW50PT09XCJiZWZvcmVcIj8oMCxfdXRpbC5pbnNlcnRCZWZvcmUpKGlucHV0LGVycm9yTm9kZSk6KDAsX3V0aWwuaW5zZXJ0QWZ0ZXIpKGlucHV0LGVycm9yTm9kZSk7cGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKHZhbGlkYXRpb25FcnJvclBhcmVudENsYXNzKX19ZWxzZXtwYXJlbnROb2RlLmNsYXNzTGlzdC5yZW1vdmUodmFsaWRhdGlvbkVycm9yUGFyZW50Q2xhc3MpO2Vycm9yTm9kZS5yZW1vdmUoKX19aW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsZnVuY3Rpb24oKXtjaGVja1ZhbGlkaXR5KHtpbnNlcnRFcnJvcjpmYWxzZX0pfSk7aW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImludmFsaWRcIixmdW5jdGlvbihlKXtlLnByZXZlbnREZWZhdWx0KCk7Y2hlY2tWYWxpZGl0eSh7aW5zZXJ0RXJyb3I6dHJ1ZX0pfSl9dmFyIGRlZmF1bHRPcHRpb25zPXtpbnZhbGlkQ2xhc3M6XCJpbnZhbGlkXCIsdmFsaWRhdGlvbkVycm9yQ2xhc3M6XCJ2YWxpZGF0aW9uLWVycm9yXCIsdmFsaWRhdGlvbkVycm9yUGFyZW50Q2xhc3M6XCJoYXMtdmFsaWRhdGlvbi1lcnJvclwiLGN1c3RvbU1lc3NhZ2VzOnt9LGVycm9yUGxhY2VtZW50OlwiYmVmb3JlXCJ9O2Z1bmN0aW9uIHZhbGlkRm9ybShlbGVtZW50LG9wdGlvbnMpe2lmKCFlbGVtZW50fHwhZWxlbWVudC5ub2RlTmFtZSl7dGhyb3cgbmV3IEVycm9yKFwiRmlyc3QgYXJnIHRvIHZhbGlkRm9ybSBtdXN0IGJlIGEgZm9ybSwgaW5wdXQsIHNlbGVjdCwgb3IgdGV4dGFyZWFcIil9dmFyIGlucHV0cz12b2lkIDA7dmFyIHR5cGU9ZWxlbWVudC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO29wdGlvbnM9KDAsX3V0aWwuZGVmYXVsdHMpKG9wdGlvbnMsZGVmYXVsdE9wdGlvbnMpO2lmKHR5cGU9PT1cImZvcm1cIil7aW5wdXRzPWVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChcImlucHV0LCBzZWxlY3QsIHRleHRhcmVhXCIpO2ZvY3VzSW52YWxpZElucHV0KGVsZW1lbnQsaW5wdXRzKX1lbHNlIGlmKHR5cGU9PT1cImlucHV0XCJ8fHR5cGU9PT1cInNlbGVjdFwifHx0eXBlPT09XCJ0ZXh0YXJlYVwiKXtpbnB1dHM9W2VsZW1lbnRdfWVsc2V7dGhyb3cgbmV3IEVycm9yKFwiT25seSBmb3JtLCBpbnB1dCwgc2VsZWN0LCBvciB0ZXh0YXJlYSBlbGVtZW50cyBhcmUgc3VwcG9ydGVkXCIpfXZhbGlkRm9ybUlucHV0cyhpbnB1dHMsb3B0aW9ucyl9ZnVuY3Rpb24gZm9jdXNJbnZhbGlkSW5wdXQoZm9ybSxpbnB1dHMpe3ZhciBmb2N1c0ZpcnN0PSgwLF91dGlsLmRlYm91bmNlKSgxMDAsZnVuY3Rpb24oKXt2YXIgaW52YWxpZE5vZGU9Zm9ybS5xdWVyeVNlbGVjdG9yKFwiOmludmFsaWRcIik7aWYoaW52YWxpZE5vZGUpaW52YWxpZE5vZGUuZm9jdXMoKX0pOygwLF91dGlsLmZvckVhY2gpKGlucHV0cyxmdW5jdGlvbihpbnB1dCl7cmV0dXJuIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnZhbGlkXCIsZm9jdXNGaXJzdCl9KX1mdW5jdGlvbiB2YWxpZEZvcm1JbnB1dHMoaW5wdXRzLG9wdGlvbnMpe3ZhciBpbnZhbGlkQ2xhc3M9b3B0aW9ucy5pbnZhbGlkQ2xhc3MsY3VzdG9tTWVzc2FnZXM9b3B0aW9ucy5jdXN0b21NZXNzYWdlczsoMCxfdXRpbC5mb3JFYWNoKShpbnB1dHMsZnVuY3Rpb24oaW5wdXQpe3RvZ2dsZUludmFsaWRDbGFzcyhpbnB1dCxpbnZhbGlkQ2xhc3MpO2hhbmRsZUN1c3RvbU1lc3NhZ2VzKGlucHV0LGN1c3RvbU1lc3NhZ2VzKTtoYW5kbGVDdXN0b21NZXNzYWdlRGlzcGxheShpbnB1dCxvcHRpb25zKX0pfX0se1wiLi91dGlsXCI6Mn1dfSx7fSxbMV0pOyIsIi8vIE1pbm5Qb3N0IEdpdmluZyBwbHVnaW5cbi8vIHRoZSBzZW1pLWNvbG9uIGJlZm9yZSBmdW5jdGlvbiBpbnZvY2F0aW9uIGlzIGEgc2FmZXR5IG5ldCBhZ2FpbnN0IGNvbmNhdGVuYXRlZFxuLy8gc2NyaXB0cyBhbmQvb3Igb3RoZXIgcGx1Z2lucyB3aGljaCBtYXkgbm90IGJlIGNsb3NlZCBwcm9wZXJseS5cbjsoZnVuY3Rpb24gKCAkLCB3aW5kb3csIGRvY3VtZW50LCB1bmRlZmluZWQgKSB7XG5cbiAgLy8gdW5kZWZpbmVkIGlzIHVzZWQgaGVyZSBhcyB0aGUgdW5kZWZpbmVkIGdsb2JhbCB2YXJpYWJsZSBpbiBFQ01BU2NyaXB0IDMgaXNcbiAgLy8gbXV0YWJsZSAoaWUuIGl0IGNhbiBiZSBjaGFuZ2VkIGJ5IHNvbWVvbmUgZWxzZSkuIHVuZGVmaW5lZCBpc24ndCByZWFsbHkgYmVpbmdcbiAgLy8gcGFzc2VkIGluIHNvIHdlIGNhbiBlbnN1cmUgdGhlIHZhbHVlIG9mIGl0IGlzIHRydWx5IHVuZGVmaW5lZC4gSW4gRVM1LCB1bmRlZmluZWRcbiAgLy8gY2FuIG5vIGxvbmdlciBiZSBtb2RpZmllZC5cblxuICAvLyB3aW5kb3cgYW5kIGRvY3VtZW50IGFyZSBwYXNzZWQgdGhyb3VnaCBhcyBsb2NhbCB2YXJpYWJsZSByYXRoZXIgdGhhbiBnbG9iYWxcbiAgLy8gYXMgdGhpcyAoc2xpZ2h0bHkpIHF1aWNrZW5zIHRoZSByZXNvbHV0aW9uIHByb2Nlc3MgYW5kIGNhbiBiZSBtb3JlIGVmZmljaWVudGx5XG4gIC8vIG1pbmlmaWVkIChlc3BlY2lhbGx5IHdoZW4gYm90aCBhcmUgcmVndWxhcmx5IHJlZmVyZW5jZWQgaW4geW91ciBwbHVnaW4pLlxuXG4gIC8vIENyZWF0ZSB0aGUgZGVmYXVsdHMgb25jZVxuICB2YXIgcGx1Z2luTmFtZSA9ICdtaW5ucG9zdF9naXZpbmcnLFxuICBkZWZhdWx0cyA9IHtcbiAgICAnZGVidWcnIDogZmFsc2UsIC8vIHRoaXMgY2FuIGJlIHNldCB0byB0cnVlIG9uIHBhZ2UgbGV2ZWwgb3B0aW9uc1xuICAgICdzdHJpcGVfcHVibGlzaGFibGVfa2V5JyA6ICcnLFxuICAgICdwbGFpZF9lbnYnIDogJycsXG4gICAgJ3BsYWlkX2xpbmsnIDogJyNhdXRob3JpemUtYWNoJyxcbiAgICAnbWlubnBvc3Rfcm9vdCcgOiAnaHR0cHM6Ly93d3cubWlubnBvc3QuY29tJyxcbiAgICAnYW5hbHl0aWNzX3R5cGUnIDogJycsXG4gICAgJ3Byb2dyZXNzX3NlbGVjdG9yJyA6ICcubS1zdXBwb3J0LXByb2dyZXNzJyxcbiAgICAnZm9ybV9zZWxlY3RvcicgOiAnLm0tZm9ybScsXG4gICAgJ2RvbmF0ZV9mb3JtX3NlbGVjdG9yJzogJyNkb25hdGUnLFxuICAgICdjb25maXJtX2Zvcm1fc2VsZWN0b3InIDogJyNjb25maXJtJyxcbiAgICAnZmluaXNoX3NlY3Rpb25fc2VsZWN0b3InIDogJyNwYW5lbC0tY29uZmlybWF0aW9uJyxcbiAgICAncGF5X2NjX3Byb2Nlc3Npbmdfc2VsZWN0b3InIDogJ2lucHV0W25hbWU9XCJwYXlfZmVlc1wiXScsXG4gICAgJ2ZlZV9hbW91bnQnIDogJy5wcm9jZXNzaW5nLWFtb3VudCcsXG4gICAgJ2xldmVsX2Ftb3VudF9zZWxlY3RvcicgOiAnI3BhbmVsLS1wYXkgLmFtb3VudCAubGV2ZWwtYW1vdW50JywgLy8gd2UgY2FuIG1heWJlIGdldCByaWQgb2YgdGhpc1xuICAgICdvcmlnaW5hbF9hbW91bnRfc2VsZWN0b3InIDogJ1tuYW1lPVwiYW1vdW50XCJdJyxcbiAgICAnZmFpcl9tYXJrZXRfdmFsdWVfc2VsZWN0b3InIDogJyNmYWlyX21hcmtldF92YWx1ZScsXG4gICAgJ2Z1bGxfYW1vdW50X3NlbGVjdG9yJyA6ICcuZnVsbC1hbW91bnQnLFxuICAgICdpbnN0YWxsbWVudF9wZXJpb2Rfc2VsZWN0b3InIDogJ1tuYW1lPVwiaW5zdGFsbG1lbnRfcGVyaW9kXCJdJyxcbiAgICAnbmFtZV9zZWxlY3RvcicgOiAnLm0tZm9ybS1pdGVtLWRpc3BsYXktbmFtZScsXG4gICAgJ2luX2hvbm9yX29yX21lbW9yeV9maWVsZF9zZWxlY3RvcicgOiAnLm0tZm9ybS1pdGVtLWhvbm9yLW1lbW9yeScsXG4gICAgJ2hvbm9yX29yX21lbW9yeV9jaG9vc2VyJyA6ICdpbnB1dFtuYW1lPVwiaW5faG9ub3Jfb3JfbWVtb3J5XCJdJywgLy8gcmFkaW8gZmllbGRzXG4gICAgJ2hvbm9yX3R5cGVfc2VsZWN0b3InIDogJy5hLWhvbm9yLXR5cGUnLCAvLyBzcGFuIGluc2lkZSBsYWJlbFxuICAgICdob25vcl9tZW1vcnlfaW5wdXRfZ3JvdXAnIDogJy5hLWhvbm9yLW9yLW1lbW9yeScsIC8vIGhvbGRzIHRoZSBmb3JtIGZpZWxkXG4gICAgJ2Fub255bW91c19zZWxlY3RvcicgOiAnI2Fub255bW91cycsXG4gICAgJ3Nob3dfYmlsbGluZ19jb3VudHJ5X3NlbGVjdG9yJyA6ICcjYmlsbGluZ19zaG93X2NvdW50cnknLFxuICAgICdiaWxsaW5nX2NvdW50cnlfc2VsZWN0b3InIDogJy5tLWZvcm0taXRlbS1jb3VudHJ5JyxcbiAgICAnc2hvd19zaGlwcGluZ19jb3VudHJ5X3NlbGVjdG9yJyA6ICcjc2hpcHBpbmdfc2hvd19jb3VudHJ5JyxcbiAgICAnc2hpcHBpbmdfY291bnRyeV9zZWxlY3RvcicgOiAnLm0tZm9ybS1pdGVtLXNoaXBwaW5nLWNvdW50cnknLFxuICAgICdzaGlwcGluZ19hZGRyZXNzX3NlbGVjdG9yJyA6ICcubS1mb3JtLWl0ZW0tc2hpcHBpbmctYWRkcmVzcycsXG4gICAgJ3VzZV9mb3Jfc2hpcHBpbmdfc2VsZWN0b3InIDogJyN1c2Vmb3JzaGlwcGluZycsXG4gICAgJ2VtYWlsX2ZpZWxkX3NlbGVjdG9yJyA6ICcjZW1haWwnLFxuICAgICdwYXNzd29yZF9maWVsZF9zZWxlY3RvcicgOiAnI3Bhc3N3b3JkJyxcbiAgICAnZmlyc3RfbmFtZV9maWVsZF9zZWxlY3RvcicgOiAnI2ZpcnN0X25hbWUnLFxuICAgICdsYXN0X25hbWVfZmllbGRfc2VsZWN0b3InIDogJyNsYXN0X25hbWUnLFxuICAgICdiaWxsaW5nX3N0cmVldF9maWVsZF9zZWxlY3RvcicgOiAnI2JpbGxpbmdfc3RyZWV0JyxcbiAgICAnYmlsbGluZ19jaXR5X2ZpZWxkX3NlbGVjdG9yJyA6ICcjYmlsbGluZ19jaXR5JyxcbiAgICAnYmlsbGluZ19zdGF0ZV9maWVsZF9zZWxlY3RvcicgOiAnI2JpbGxpbmdfc3RhdGUnLFxuICAgICdiaWxsaW5nX3ppcF9maWVsZF9zZWxlY3Rvcic6ICcjYmlsbGluZ196aXAnLFxuICAgICdiaWxsaW5nX2NvdW50cnlfZmllbGRfc2VsZWN0b3InIDogJyNiaWxsaW5nX2NvdW50cnknLFxuICAgICdzaGlwcGluZ19zdGF0ZV9maWVsZF9zZWxlY3RvcicgOiAnI3NoaXBwaW5nX3N0YXRlJyxcbiAgICAnc2hpcHBpbmdfemlwX2ZpZWxkX3NlbGVjdG9yJzogJyNzaGlwcGluZ196aXAnLFxuICAgICdzaGlwcGluZ19jb3VudHJ5X2ZpZWxkX3NlbGVjdG9yJyA6ICcjc2hpcHBpbmdfY291bnRyeScsXG4gICAgJ2NyZWF0ZV9tcF9zZWxlY3RvcicgOiAnI2NyZWF0ZW1wYWNjb3VudCcsXG4gICAgJ3Bhc3N3b3JkX3NlbGVjdG9yJyA6ICcubS1mb3JtLWl0ZW0tcGFzc3dvcmQnLFxuICAgICdhZGRpdGlvbmFsX2Ftb3VudF9maWVsZCcgOiAnI2FkZGl0aW9uYWxfZG9uYXRpb24nLFxuICAgICdzaGlwcGluZ19zZWxlY3RvcicgOiAnZmllbGRzZXQubS1zaGlwcGluZy1pbmZvcm1hdGlvbicsXG4gICAgJ2Nob29zZV9wYXltZW50JyA6ICcjY2hvb3NlLXBheW1lbnQtbWV0aG9kJyxcbiAgICAncGF5bWVudF9tZXRob2Rfc2VsZWN0b3InIDogJy5wYXltZW50LW1ldGhvZCcsXG4gICAgJ2NjX251bV9zZWxlY3RvcicgOiAnI2NhcmQtbnVtYmVyJyxcbiAgICAnY2NfZXhwX3NlbGVjdG9yJyA6ICcjY2FyZC1leHBpcnknLFxuICAgICdjY19jdmNfc2VsZWN0b3InIDogJyNjYXJkLWN2YycsXG4gICAgJ3BheV9idXR0b25fc2VsZWN0b3InIDogJy5hLWJ1dHRvbi1wYXknLFxuICAgICdvcHBfaWRfc2VsZWN0b3InIDogJyNsb2NrX2tleScsIC8vIHdlIHVzZSB0aGlzIHZhbHVlIGFzIHRoZSBHb29nbGUgQW5hbHl0aWNzIHRyYW5zYWN0aW9uIElEXG4gICAgJ25ld3NsZXR0ZXJfZ3JvdXBfc2VsZWN0b3InIDogJy5zdXBwb3J0LW5ld3NsZXR0ZXJzJ1xuICB9OyAvLyBlbmQgZGVmYXVsdHNcblxuICAvLyBUaGUgYWN0dWFsIHBsdWdpbiBjb25zdHJ1Y3RvclxuICBmdW5jdGlvbiBQbHVnaW4oIGVsZW1lbnQsIG9wdGlvbnMgKSB7XG5cbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuXG4gICAgLy8galF1ZXJ5IGhhcyBhbiBleHRlbmQgbWV0aG9kIHdoaWNoIG1lcmdlcyB0aGUgY29udGVudHMgb2YgdHdvIG9yXG4gICAgLy8gbW9yZSBvYmplY3RzLCBzdG9yaW5nIHRoZSByZXN1bHQgaW4gdGhlIGZpcnN0IG9iamVjdC4gVGhlIGZpcnN0IG9iamVjdFxuICAgIC8vIGlzIGdlbmVyYWxseSBlbXB0eSBhcyB3ZSBkb24ndCB3YW50IHRvIGFsdGVyIHRoZSBkZWZhdWx0IG9wdGlvbnMgZm9yXG4gICAgLy8gZnV0dXJlIGluc3RhbmNlcyBvZiB0aGUgcGx1Z2luXG4gICAgdGhpcy5vcHRpb25zID0gJC5leHRlbmQoIHt9LCBkZWZhdWx0cywgb3B0aW9ucyApO1xuXG4gICAgdGhpcy5fZGVmYXVsdHMgPSBkZWZhdWx0cztcbiAgICB0aGlzLl9uYW1lID0gcGx1Z2luTmFtZTtcblxuICAgIHRoaXMuaW5pdCgpO1xuICB9IC8vIGVuZCBjb25zdHJ1Y3RvclxuXG4gIFBsdWdpbi5wcm90b3R5cGUgPSB7XG5cbiAgICBpbml0OiBmdW5jdGlvbihyZXNldCwgYW1vdW50KSB7XG5cbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSggJ25vLWpzJyApO1xuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCAnanMnICk7XG5cbiAgICAgIC8vIFBsYWNlIGluaXRpYWxpemF0aW9uIGxvZ2ljIGhlcmVcbiAgICAgIC8vIFlvdSBhbHJlYWR5IGhhdmUgYWNjZXNzIHRvIHRoZSBET00gZWxlbWVudCBhbmRcbiAgICAgIC8vIHRoZSBvcHRpb25zIHZpYSB0aGUgaW5zdGFuY2UsIGUuZy4gdGhpcy5lbGVtZW50XG4gICAgICAvLyBhbmQgdGhpcy5vcHRpb25zXG4gICAgICAvLyB5b3UgY2FuIGFkZCBtb3JlIGZ1bmN0aW9ucyBsaWtlIHRoZSBvbmUgYmVsb3cgYW5kXG4gICAgICAvLyBjYWxsIHRoZW0gbGlrZSBzbzogdGhpcy55b3VyT3RoZXJGdW5jdGlvbih0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucykuXG5cbiAgICAgIC8vIG1vZGlmeSBvcHRpb25zIGFzIG5lZWRlZFxuICAgICAgLy92YXIgdGhpcy5vcHRpb25zLmFtb3VudCA9ICcnO1xuICAgICAgaWYgKHJlc2V0ICE9PSB0cnVlKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5hbW91bnQgPSBwYXJzZUZsb2F0KCQodGhpcy5vcHRpb25zLmxldmVsX2Ftb3VudF9zZWxlY3RvciwgdGhpcy5lbGVtZW50KS50ZXh0KCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLmFtb3VudCA9IGFtb3VudDtcbiAgICAgIH1cbiAgICAgIHRoaXMub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQgICAgID0gcGFyc2VJbnQoJCh0aGlzLm9wdGlvbnMub3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yLCB0aGlzLmVsZW1lbnQpLnZhbCgpLCAxMCk7XG4gICAgICB0aGlzLm9wdGlvbnMucHJvY2Vzc2luZ19mZWUgICAgICA9IChNYXRoLnJvdW5kKHBhcnNlRmxvYXQodGhpcy5vcHRpb25zLmZlZV9hbW91bnQpKk1hdGgucG93KDEwLDIpKS9NYXRoLnBvdygxMCwyKSkudG9GaXhlZCgyKTtcbiAgICAgIHRoaXMub3B0aW9ucy5wcm9jZXNzaW5nX2ZlZV90ZXh0ID0gdGhpcy5vcHRpb25zLnByb2Nlc3NpbmdfZmVlO1xuICAgICAgdGhpcy5vcHRpb25zLmNyZWF0ZV9hY2NvdW50ICAgICAgPSBmYWxzZTtcblxuICAgICAgdmFyIGJ1dHRvbl90ZXh0ID0gJCh0aGlzLm9wdGlvbnMucGF5X2J1dHRvbl9zZWxlY3RvcikudGV4dCgpO1xuICAgICAgdGhpcy5vcHRpb25zLmJ1dHRvbl90ZXh0ID0gYnV0dG9uX3RleHQ7XG5cbiAgICAgIHRoaXMuc3RyaXBlID0gU3RyaXBlKHRoaXMub3B0aW9ucy5zdHJpcGVfcHVibGlzaGFibGVfa2V5KTtcbiAgICAgIHRoaXMuZWxlbWVudHMgPSB0aGlzLnN0cmlwZS5lbGVtZW50cyh7XG4gICAgICAgIGZvbnRzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgLy8gaW50ZWdyYXRlIHlvdXIgZm9udCBpbnRvIHN0cmlwZVxuICAgICAgICAgICAgY3NzU3JjOiAnaHR0cHM6Ly91c2UudHlwZWtpdC5uZXQvY3hqN2Z6Zy5jc3MnLFxuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfSk7XG5cbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuZGVidWcgPT09IHRydWUpIHtcbiAgICAgICAgdGhpcy5kZWJ1Zyh0aGlzLm9wdGlvbnMpO1xuICAgICAgICAvLyByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIGNhbGwgZnVuY3Rpb25zXG4gICAgICB0aGlzLmFuYWx5dGljc1RyYWNraW5nKHRoaXMub3B0aW9ucyk7IC8vIHRyYWNrIGFuYWx5dGljcyBldmVudHNcbiAgICAgIHRoaXMuYW1vdW50QXNSYWRpbyh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIGlmIHRoZSBhbW91bnQgZmllbGQgaXMgYSByYWRpbyBidXR0b25cbiAgICAgIHRoaXMuYW1vdW50VXBkYXRlZCh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIGlmIHRoZSBhbW91bnQgdGV4dCBmaWVsZCBjYW4gY2hhbmdlXG5cbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5wYXlfY2NfcHJvY2Vzc2luZ19zZWxlY3RvcikubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLmNyZWRpdENhcmRQcm9jZXNzaW5nRmVlcyh0aGlzLm9wdGlvbnMpOyAvLyBwcm9jZXNzaW5nIGZlZXNcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLy8gdGhlIG1haW4gZm9ybSBJRC4gdGhpcyBpcyBub3QgdXNlZCBmb3IgY2FuY2VsbGluZ1xuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuZG9uYXRlQW5vbnltb3VzbHkodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBhbm9ueW1vdXNcbiAgICAgICAgdGhpcy5ob25vck9yTWVtb3J5VG9nZ2xlKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gaW4gaG9ub3Igb3IgaW4gbWVtb3J5IG9mIHNvbWVvbmVcbiAgICAgICAgdGhpcy5vdXRzaWRlVW5pdGVkU3RhdGVzKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gb3V0c2lkZSBVU1xuICAgICAgICB0aGlzLnNoaXBwaW5nQWRkcmVzcyh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIHNoaXBwaW5nIGFkZHJlc3NcbiAgICAgICAgdGhpcy5hbGxvd01pbm5wb3N0QWNjb3VudCh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIG9wdGlvbiBmb3IgY3JlYXRpbmcgbWlubnBvc3QgYWNjb3VudFxuICAgICAgICB0aGlzLnBheW1lbnRSZXF1ZXN0QnV0dG9uKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gY3JlYXRlIHBheW1lbnRyZXF1ZXN0IGJ1dHRvblxuICAgICAgICB0aGlzLmNob29zZVBheW1lbnRNZXRob2QodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBzd2l0Y2ggYmV0d2VlbiBjYXJkIGFuZCBhY2hcbiAgICAgICAgdGhpcy5jcmVkaXRDYXJkRmllbGRzKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gZG8gc3R1ZmYgd2l0aCB0aGUgY3JlZGl0IGNhcmQgZmllbGRzXG4gICAgICAgIHRoaXMudmFsaWRhdGVTZXR1cCh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIHNldHVwIGhvdyB2YWxpZGF0aW9uIGVycm9ycyB3b3JrXG4gICAgICAgIHRoaXMuZm9ybVNldHVwKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gdmFsaWRhdGUgYW5kIHN1Ym1pdCB0aGUgZm9ybVxuICAgICAgfVxuXG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuY29uZmlybV9mb3JtX3NlbGVjdG9yKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuc2hvd05ld3NsZXR0ZXJTZXR0aW5ncyh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7XG4gICAgICAgIHRoaXMuY29uZmlybU1lc3NhZ2VTdWJtaXQodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBzdWJtaXQgdGhlIHN0dWZmIG9uIHRoZSBjb25maXJtYXRpb24gcGFnZVxuICAgICAgfVxuXG4gICAgfSwgLy8gaW5pdFxuXG4gICAgZGVidWc6IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuZGVidWcgPT09IHRydWUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZGlyKG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUuZGlyKHRoaXMpO1xuICAgICAgfVxuICAgIH0sIC8vIGRlYnVnXG5cbiAgICBhbmFseXRpY3NUcmFja2luZzogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgdGhpcy5kZWJ1ZygnYW5hbHl0aWNzIHR5cGUgaXMgJyArIG9wdGlvbnMuYW5hbHl0aWNzX3R5cGUpO1xuICAgICAgdmFyIHByb2dyZXNzID0gJChvcHRpb25zLnByb2dyZXNzX3NlbGVjdG9yKTtcbiAgICAgIHZhciBzdGVwO1xuICAgICAgdmFyIGFjdGlvbiA9ICdjaGVja291dCc7XG4gICAgICB2YXIgbmF2X2l0ZW1fY291bnQgPSAwO1xuICAgICAgdmFyIG9wcF9pZCA9ICQob3B0aW9ucy5vcHBfaWRfc2VsZWN0b3IpLnZhbCgpO1xuICAgICAgdmFyIHBvc3RfcHVyY2hhc2UgPSBmYWxzZTtcbiAgICAgIGlmIChvcHRpb25zLmFuYWx5dGljc190eXBlID09ICdhbmFseXRpY3NqcycpIHtcbiAgICAgICAgZ2EoICdyZXF1aXJlJywgJ2VjJyApO1xuICAgICAgfVxuICAgICAgaWYgKHByb2dyZXNzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgbmF2X2l0ZW1fY291bnQgPSAkKCdsaScsIHByb2dyZXNzKS5sZW5ndGg7IC8vIGxlbmd0aCBpcyBub3QgemVybyBiYXNlZFxuICAgICAgICBzdGVwID0gJCgnbGkgLmFjdGl2ZScsIHByb2dyZXNzKS5wYXJlbnQoKS5pbmRleCgpICsgMTsgLy8gaW5kZXggaXMgemVybyBiYXNlZFxuICAgICAgfVxuICAgICAgLy8gdGhlcmUgaXMgYSBwcm9ncmVzcyBtZW51LCBBTkQgdGhlcmUgSVMgTk9UIGEgY29uZmlybSBmb3JtIHNlbGVjdG9yXG4gICAgICAvLyBpZiB0aGF0IGlzIHRoZSBjYXNlLCB3ZSdyZSBub3Qgb24gdGhlIHB1cmNoYXNlIHN0ZXBcbiAgICAgIGlmIChwcm9ncmVzcy5sZW5ndGggPiAwICYmICQob3B0aW9ucy5jb25maXJtX2Zvcm1fc2VsZWN0b3IpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAvLyB0aGUgYWN0aXZlIHRhYiBtYXRjaGVzIHRoZSBjb3VudCBvZiBpdGVtcyBBTkQgdGhlcmUgaXMgTk9UIGEgY29uZmlybSBmb3JtIHRvIGJlIHN1Ym1pdHRlZFxuICAgICAgICAvLyB0aGF0IG1lYW5zIHdlJ3JlIG9uIGEgcG9zdCBwdXJjaGFzZSBzdGVwLlxuICAgICAgICBpZiAoc3RlcCA9PT0gbmF2X2l0ZW1fY291bnQgJiYgJChvcHRpb25zLmNvbmZpcm1fZm9ybV9zZWxlY3RvcikubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgc3RlcCA9IHN0ZXAgKyAxO1xuICAgICAgICAgIHBvc3RfcHVyY2hhc2UgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHByb2dyZXNzLmxlbmd0aCA+IDAgJiYgJChvcHRpb25zLmNvbmZpcm1fZm9ybV9zZWxlY3RvcikubGVuZ3RoID4gMCB8fCAkKG9wdGlvbnMuZmluaXNoX3NlY3Rpb25fc2VsZWN0b3IpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgLy8gd2UgYXJlIG9uIHRoZSBjb25maXJtIGZvcm0gc2VsZWN0b3IgYW5kIHRoZXJlIGlzIGEgcHJvZ3Jlc3MgbWVhc3VyZVxuICAgICAgICAvLyBPUiwgd2UgYXJlIG9uIHRoZSBmaW5pc2ggc2VsZWN0b3IgYW5kIHRoZXJlIGlzIE5PVCBhIHByb2dyZXNzIG1lYXN1cmVcbiAgICAgICAgLy8gdGhlc2UgbWVhbiB0aGUgdXNlciBqdXN0IHB1cmNoYXNlZC5cbiAgICAgICAgYWN0aW9uID0gJ3B1cmNoYXNlJztcbiAgICAgIH0gZWxzZSBpZiAocHJvZ3Jlc3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMuZGVidWcoICdzdGVwIGlzICcgKyBzdGVwICsgJyBhbmQgbmF2IGl0ZW0gY291bnQgaXMgJyArIG5hdl9pdGVtX2NvdW50ICsgJyBhbmQgb3BwIGlkIGlzICcgKyBvcHBfaWQgKyAnIGFuZCBwb3N0IHB1cmNoYXNlIGlzICcgKyBwb3N0X3B1cmNoYXNlICk7XG4gICAgICB0aGlzLmFuYWx5dGljc1RyYWNraW5nU3RlcChzdGVwLCBhY3Rpb24sIHBvc3RfcHVyY2hhc2UpO1xuICAgIH0sIC8vIGFuYWx5dGljc1RyYWNraW5nXG5cbiAgICBhbmFseXRpY3NUcmFja2luZ1N0ZXA6IGZ1bmN0aW9uKHN0ZXAsIGFjdGlvbiwgcG9zdF9wdXJjaGFzZSkge1xuICAgICAgdmFyIHByb2dyZXNzID0gJCh0aGlzLm9wdGlvbnMucHJvZ3Jlc3Nfc2VsZWN0b3IpO1xuICAgICAgdmFyIGFtb3VudCA9ICQodGhpcy5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudF9zZWxlY3RvcikudmFsKCk7XG4gICAgICB2YXIgb3BwX2lkID0gJCh0aGlzLm9wdGlvbnMub3BwX2lkX3NlbGVjdG9yKS52YWwoKTtcbiAgICAgIHZhciBpbnN0YWxsbWVudF9wZXJpb2QgPSAnb25lLXRpbWUnO1xuICAgICAgdmFyIGxldmVsO1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmluc3RhbGxtZW50X3BlcmlvZF9zZWxlY3RvcikubGVuZ3RoID4gMCApIHtcbiAgICAgICAgaW5zdGFsbG1lbnRfcGVyaW9kID0gJCh0aGlzLm9wdGlvbnMuaW5zdGFsbG1lbnRfcGVyaW9kX3NlbGVjdG9yKS52YWwoKTtcbiAgICAgIH1cbiAgICAgIC8vIGlmIHdlJ3JlIG5vdCBhZnRlciB0aGUgcHVyY2hhc2UsIHVzZSBhZGRQcm9kdWN0XG4gICAgICAvL2lmIChwcm9ncmVzcy5sZW5ndGggPiAwICYmIHBvc3RfcHVyY2hhc2UgIT09IHRydWUpIHtcbiAgICAgIGlmIChwcm9ncmVzcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgIGFtb3VudDogYW1vdW50LFxuICAgICAgICAgIGluc3RhbGxtZW50X3BlcmlvZDogaW5zdGFsbG1lbnRfcGVyaW9kXG4gICAgICAgIH07XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgdXJsOiAnL2NhbGN1bGF0ZS1tZW1iZXItbGV2ZWwvJyxcbiAgICAgICAgICBkYXRhOiBkYXRhXG4gICAgICAgIH0pLmRvbmUoZnVuY3Rpb24oIGRhdGEgKSB7XG4gICAgICAgICAgaWYgKCQoZGF0YS5sZXZlbCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGV2ZWwgPSBkYXRhLmxldmVsLmxldmVsO1xuICAgICAgICAgICAgdGhhdC5kZWJ1ZygnY3JlYXRlIHByb2R1Y3Qgb2JqZWN0OiBpZCBpcyAnICsgJ21pbm5wb3N0XycgKyBsZXZlbC50b0xvd2VyQ2FzZSgpICsgJ19tZW1iZXJzaGlwJyArICcgYW5kIG5hbWUgaXMgJyArICdNaW5uUG9zdCAnICsgbGV2ZWwuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBsZXZlbC5zbGljZSgxKSArICcgTWVtYmVyc2hpcCcgKyAnIGFuZCB2YXJpYW50IGlzICcgKyBpbnN0YWxsbWVudF9wZXJpb2QuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBpbnN0YWxsbWVudF9wZXJpb2Quc2xpY2UoMSkpO1xuICAgICAgICAgICAgdmFyIHByb2R1Y3QgPSB7XG4gICAgICAgICAgICAgICdpZCc6ICdtaW5ucG9zdF8nICsgbGV2ZWwudG9Mb3dlckNhc2UoKSArICdfbWVtYmVyc2hpcCcsXG4gICAgICAgICAgICAgICduYW1lJzogJ01pbm5Qb3N0ICcgKyBsZXZlbC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGxldmVsLnNsaWNlKDEpICsgJyBNZW1iZXJzaGlwJyxcbiAgICAgICAgICAgICAgJ2NhdGVnb3J5JzogJ0RvbmF0aW9uJyxcbiAgICAgICAgICAgICAgJ2JyYW5kJzogJ01pbm5Qb3N0JyxcbiAgICAgICAgICAgICAgJ3ZhcmlhbnQnOiBpbnN0YWxsbWVudF9wZXJpb2QuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBpbnN0YWxsbWVudF9wZXJpb2Quc2xpY2UoMSksXG4gICAgICAgICAgICAgICdwcmljZSc6IHRoYXQuZ2V0VG90YWxBbW91bnQoYW1vdW50KSxcbiAgICAgICAgICAgICAgJ3F1YW50aXR5JzogMVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGlmICh0aGF0Lm9wdGlvbnMuYW5hbHl0aWNzX3R5cGUgPT0gJ2d0YWdqcycpIHtcbiAgICAgICAgICAgICAgZ3RhZygnZXZlbnQnLCAnY2hlY2tvdXRfcHJvZ3Jlc3MnLCB7XG4gICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiB0aGF0LmdldFRvdGFsQW1vdW50KGFtb3VudCksXG4gICAgICAgICAgICAgICAgXCJpdGVtc1wiOiBbcHJvZHVjdF0sXG4gICAgICAgICAgICAgICAgXCJjaGVja291dF9zdGVwXCI6IHN0ZXAsXG4gICAgICAgICAgICAgICAgXCJjaGVja291dF9vcHRpb25cIjogYWN0aW9uLFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhhdC5vcHRpb25zLmFuYWx5dGljc190eXBlID09ICdhbmFseXRpY3NqcycpIHtcbiAgICAgICAgICAgICAgZ2EoJ2VjOmFkZFByb2R1Y3QnLCBwcm9kdWN0KTtcbiAgICAgICAgICAgICAgZ2EoJ2VjOnNldEFjdGlvbicsICdjaGVja291dCcsIHtcbiAgICAgICAgICAgICAgICAnc3RlcCc6IHN0ZXAsXG4gICAgICAgICAgICAgICAgJ29wdGlvbic6IGFjdGlvblxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGFjdGlvbiA9PT0gJ3B1cmNoYXNlJykge1xuICAgICAgICAgICAgICB0aGF0LmRlYnVnKCdhZGQgYSBwdXJjaGFzZSBhY3Rpb24uIHN0ZXAgaXMgJyArIHN0ZXAgKyAnIGFuZCBhY3Rpb24gaXMgJyArIGFjdGlvbik7XG4gICAgICAgICAgICAgIGlmICh0aGF0Lm9wdGlvbnMuYW5hbHl0aWNzX3R5cGUgPT0gJ2d0YWdqcycpIHtcbiAgICAgICAgICAgICAgICBndGFnKCdldmVudCcsIGFjdGlvbiwge1xuICAgICAgICAgICAgICAgICAgXCJ0cmFuc2FjdGlvbl9pZFwiOiBvcHBfaWQsIC8vIFRyYW5zYWN0aW9uIGlkIC0gVHlwZTogc3RyaW5nXG4gICAgICAgICAgICAgICAgICBcImFmZmlsaWF0aW9uXCI6ICdNaW5uUG9zdCcsIC8vIFN0b3JlIG5hbWUgLSBUeXBlOiBzdHJpbmdcbiAgICAgICAgICAgICAgICAgIFwidmFsdWVcIjogdGhhdC5nZXRUb3RhbEFtb3VudChhbW91bnQpLCAvLyBUb3RhbCBSZXZlbnVlIC0gVHlwZTogbnVtZXJpY1xuICAgICAgICAgICAgICAgICAgXCJjdXJyZW5jeVwiOiBcIlVTRFwiLFxuICAgICAgICAgICAgICAgICAgXCJpdGVtc1wiOiBbcHJvZHVjdF0sXG4gICAgICAgICAgICAgICAgICBcImNoZWNrb3V0X3N0ZXBcIjogc3RlcFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoYXQub3B0aW9ucy5hbmFseXRpY3NfdHlwZSA9PSAnYW5hbHl0aWNzanMnKSB7XG4gICAgICAgICAgICAgICAgZ2EoJ2VjOnNldEFjdGlvbicsIGFjdGlvbiwge1xuICAgICAgICAgICAgICAgICAgJ2lkJzogb3BwX2lkLCAvLyBUcmFuc2FjdGlvbiBpZCAtIFR5cGU6IHN0cmluZ1xuICAgICAgICAgICAgICAgICAgJ2FmZmlsaWF0aW9uJzogJ01pbm5Qb3N0JywgLy8gU3RvcmUgbmFtZSAtIFR5cGU6IHN0cmluZ1xuICAgICAgICAgICAgICAgICAgJ3JldmVudWUnOiBhbW91bnQsIC8vIFRvdGFsIFJldmVudWUgLSBUeXBlOiBudW1lcmljXG4gICAgICAgICAgICAgICAgICAnc3RlcCc6IHN0ZXBcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICBcbiAgICAgICAgICAgIGlmICh0aGF0Lm9wdGlvbnMuYW5hbHl0aWNzX3R5cGUgPT0gJ2d0YWdqcycpIHtcbiAgICAgICAgICAgICAgZ3RhZygnZXZlbnQnLCAncGFnZV92aWV3Jywge1xuICAgICAgICAgICAgICAgIHBhZ2VfdGl0bGU6IGRvY3VtZW50LnRpdGxlLFxuICAgICAgICAgICAgICAgIHBhZ2VfcGF0aDogd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lXG4gICAgICAgICAgICAgIH0pICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhhdC5vcHRpb25zLmFuYWx5dGljc190eXBlID09ICdhbmFseXRpY3NqcycpIHtcbiAgICAgICAgICAgICAgZ2EoJ3NldCcsIHtcbiAgICAgICAgICAgICAgICBwYWdlOiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUsXG4gICAgICAgICAgICAgICAgdGl0bGU6IGRvY3VtZW50LnRpdGxlXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBnYSgnc2VuZCcsICdwYWdldmlldycsIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBcblxuICAgIH0sIC8vIGFuYWx5dGljc1RyYWNraW5nU3RlcFxuXG4gICAgYW1vdW50QXNSYWRpbzogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgLy8gd2hlbiBhbW91bnQgZmllbGQgaXMgYSByYWRpbyBidXR0b24sIHdlIG5lZWQgdG8gY2hlY2sgaXQgd2hlbmV2ZXIgaXQgY2hhbmdlc1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdGhhdC5zZXRSYWRpb0Ftb3VudCgkKG9wdGlvbnMub3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yLCBlbGVtZW50KSwgZWxlbWVudCwgb3B0aW9ucyk7XG4gICAgICAkKG9wdGlvbnMub3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoYXQuc2V0UmFkaW9BbW91bnQoJCh0aGlzKSwgZWxlbWVudCwgb3B0aW9ucyk7XG4gICAgICB9KTtcbiAgICB9LCAvLyBhbW91bnRBc1JhZGlvXG5cbiAgICBzZXRSYWRpb0Ftb3VudDogZnVuY3Rpb24oZmllbGQsIGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHZhciBzdHJpcGVfcGF5bWVudF90eXBlID0gdGhhdC5nZXRTdHJpcGVQYXltZW50VHlwZSgpO1xuICAgICAgdmFyIGFtb3VudCA9ICQob3B0aW9ucy5vcmlnaW5hbF9hbW91bnRfc2VsZWN0b3IgKyAnOmNoZWNrZWQnLCBlbGVtZW50KS52YWwoKTtcbiAgICAgIGlmIChmaWVsZC5pcygnOnJhZGlvJykgJiYgdHlwZW9mIGFtb3VudCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgb3B0aW9ucy5vcmlnaW5hbF9hbW91bnQgPSBwYXJzZUludChhbW91bnQsIDEwKTtcbiAgICAgICAgdGhhdC5jYWxjdWxhdGVGZWVzKHRoYXQub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQsIHN0cmlwZV9wYXltZW50X3R5cGUpO1xuICAgICAgICB0aGF0LnNldEZhaXJNYXJrZXRWYWx1ZShmaWVsZCk7XG4gICAgICB9XG4gICAgfSwgLy8gc2V0UmFkaW9BbW91bnRcblxuICAgIGFtb3VudFVwZGF0ZWQ6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIC8vIHdoZW4gbmV3IGFtb3VudCB0ZXh0IGZpZWxkIGNhbiBjaGFuZ2UsIHdlIG5lZWQgdG8gY2hhbmdlIHRoZSBoaWRkZW4gZmllbGRcbiAgICAgIC8vIHRoZXJlIGlzIGFsc28gcG90ZW50aWFsbHkgYW4gYWRkaXRpb25hbCBhbW91bnQgZmllbGQgdmFsdWUgdG8gYWRkXG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB2YXIgc3RyaXBlX3BheW1lbnRfdHlwZSA9IHRoYXQuZ2V0U3RyaXBlUGF5bWVudFR5cGUoKTtcblxuICAgICAgLy8gc2V0IHRoZSBmYWlyIG1hcmtldCB2YWx1ZSBpZiBhcHBsaWNhYmxlXG4gICAgICB2YXIgYW1vdW50X3NlbGVjdG9yX2ZhaXJfbWFya2V0ID0gJChvcHRpb25zLm9yaWdpbmFsX2Ftb3VudF9zZWxlY3RvciwgZWxlbWVudCk7XG4gICAgICBpZiAoYW1vdW50X3NlbGVjdG9yX2ZhaXJfbWFya2V0LmlzKCc6cmFkaW8nKSkge1xuICAgICAgICBhbW91bnRfc2VsZWN0b3JfZmFpcl9tYXJrZXQgPSAkKG9wdGlvbnMub3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yICsgJzpjaGVja2VkJywgZWxlbWVudCk7XG4gICAgICB9XG4gICAgICB0aGF0LnNldEZhaXJNYXJrZXRWYWx1ZShhbW91bnRfc2VsZWN0b3JfZmFpcl9tYXJrZXQpO1xuXG4gICAgICAkKG9wdGlvbnMub3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoYXQub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQgPSBwYXJzZUludCgkKHRoaXMsIGVsZW1lbnQpLnZhbCgpLCAxMCk7XG4gICAgICAgIHRoYXQuY2FsY3VsYXRlRmVlcyh0aGF0Lm9wdGlvbnMub3JpZ2luYWxfYW1vdW50LCBzdHJpcGVfcGF5bWVudF90eXBlKTtcbiAgICAgICAgdGhhdC5zZXRGYWlyTWFya2V0VmFsdWUoJCh0aGlzLCBlbGVtZW50KSk7XG4gICAgICB9KTtcbiAgICAgICQob3B0aW9ucy5hZGRpdGlvbmFsX2Ftb3VudF9maWVsZCwgZWxlbWVudCkuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGF0Lm9wdGlvbnMub3JpZ2luYWxfYW1vdW50ID0gcGFyc2VJbnQoJChvcHRpb25zLm9yaWdpbmFsX2Ftb3VudF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksIDEwKTtcbiAgICAgICAgdGhhdC5jYWxjdWxhdGVGZWVzKHRoYXQub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQsIHN0cmlwZV9wYXltZW50X3R5cGUpO1xuICAgICAgfSk7XG5cbiAgICB9LCAvLyBhbW91bnRVcGRhdGVkXG5cbiAgICBnZXRUb3RhbEFtb3VudDogZnVuY3Rpb24oYW1vdW50KSB7XG4gICAgICBhbW91bnQgPSAodHlwZW9mIGFtb3VudCAhPT0gJ3VuZGVmaW5lZCcpID8gIGFtb3VudCA6IHRoaXMub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQ7XG4gICAgICB2YXIgdG90YWxfYW1vdW50ID0gYW1vdW50O1xuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmFkZGl0aW9uYWxfYW1vdW50X2ZpZWxkKS5sZW5ndGggPiAwICYmICQodGhpcy5vcHRpb25zLmFkZGl0aW9uYWxfYW1vdW50X2ZpZWxkKS52YWwoKSA+IDApIHtcbiAgICAgICAgdmFyIGFkZGl0aW9uYWxfYW1vdW50ID0gJCh0aGlzLm9wdGlvbnMuYWRkaXRpb25hbF9hbW91bnRfZmllbGQpLnZhbCgpO1xuICAgICAgICB0b3RhbF9hbW91bnQgPSBwYXJzZUludChhZGRpdGlvbmFsX2Ftb3VudCwgMTApICsgcGFyc2VJbnQoYW1vdW50LCAxMCk7IFxuICAgICAgfVxuICAgICAgcmV0dXJuIHRvdGFsX2Ftb3VudDtcbiAgICB9LCAvLyBnZXRUb3RhbEFtb3VudFxuXG4gICAgc2V0RmFpck1hcmtldFZhbHVlOiBmdW5jdGlvbihhbW91bnRfc2VsZWN0b3IpIHtcbiAgICAgIC8vIGlmIHRoZXJlIGlzIGEgZmFpciBtYXJrZXQgdmFsdWUgZmllbGQgYW5kIHRoZXJlIGlzIGEgZmFpci1tYXJrZXQtdmFsdWUgZGF0YSBhdHRyaWJ1dGVcbiAgICAgIC8vIGNoZWNrIGFuZCBzZWUgaWYgd2UgY2FuIHBvcHVsYXRlIHRoZSBmaWVsZCB3aXRoIHRoZSBkYXRhIGF0dHJpYnV0ZVxuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmZhaXJfbWFya2V0X3ZhbHVlX3NlbGVjdG9yKS5sZW5ndGggPiAwICYmIHR5cGVvZiBhbW91bnRfc2VsZWN0b3IuZGF0YSgnZmFpci1tYXJrZXQtdmFsdWUnKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdmFyIGZhaXJNYXJrZXRWYWx1ZSA9IGFtb3VudF9zZWxlY3Rvci5kYXRhKCdmYWlyLW1hcmtldC12YWx1ZScpO1xuICAgICAgICAkKHRoaXMub3B0aW9ucy5mYWlyX21hcmtldF92YWx1ZV9zZWxlY3RvcikudmFsKGZhaXJNYXJrZXRWYWx1ZSk7XG4gICAgICB9XG4gICAgfSwgLy8gc2V0RmFpck1hcmtldFZhbHVlXG5cbiAgICBjYWxjdWxhdGVGZWVzOiBmdW5jdGlvbihhbW91bnQsIHN0cmlwZV9wYXltZW50X3R5cGUpIHtcbiAgICAgIC8vIHRoaXMgc2VuZHMgdGhlIGFtb3VudCBhbmQgc3RyaXBlIHBheW1lbnQgdHlwZSB0byBweXRob247IGdldCB0aGUgZmVlIGFuZCBkaXNwbGF5IGl0IHRvIHRoZSB1c2VyIG9uIHRoZSBjaGVja2JveCBsYWJlbFxuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdmFyIHRvdGFsX2Ftb3VudCA9IHRoYXQuZ2V0VG90YWxBbW91bnQoYW1vdW50KTtcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICBhbW91bnQ6IHRvdGFsX2Ftb3VudCxcbiAgICAgICAgc3RyaXBlX3BheW1lbnRfdHlwZTogc3RyaXBlX3BheW1lbnRfdHlwZVxuICAgICAgfTtcbiAgICAgIHRoYXQuc2V0U3RyaXBlUGF5bWVudFR5cGUoc3RyaXBlX3BheW1lbnRfdHlwZSk7XG4gICAgICAkLmFqYXgoe1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgdXJsOiAnL2NhbGN1bGF0ZS1mZWVzLycsXG4gICAgICAgIGRhdGE6IGRhdGFcbiAgICAgIH0pLmRvbmUoZnVuY3Rpb24oIGRhdGEgKSB7XG4gICAgICAgIGlmICgkKGRhdGEuZmVlcykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICQodGhhdC5vcHRpb25zLmZlZV9hbW91bnQpLnRleHQocGFyc2VGbG9hdChkYXRhLmZlZXMpLnRvRml4ZWQoMikpO1xuICAgICAgICAgIHRoYXQuY3JlZGl0Q2FyZEZlZUNoZWNrYm94KCQodGhhdC5vcHRpb25zLnBheV9jY19wcm9jZXNzaW5nX3NlbGVjdG9yKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sIC8vIGNhbGN1bGF0ZUZlZXNcblxuICAgIGNyZWRpdENhcmRQcm9jZXNzaW5nRmVlczogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgLy8gdGhpcyBhZGRzIG9yIHN1YnRyYWN0cyB0aGUgZmVlIHRvIHRoZSBvcmlnaW5hbCBhbW91bnQgd2hlbiB0aGUgdXNlciBpbmRpY2F0ZXMgdGhleSBkbyBvciBkbyBub3Qgd2FudCB0byBwYXkgdGhlIGZlZXNcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHRoYXQuY3JlZGl0Q2FyZEZlZUNoZWNrYm94KCQob3B0aW9ucy5wYXlfY2NfcHJvY2Vzc2luZ19zZWxlY3RvcikpO1xuICAgICAgJChvcHRpb25zLnBheV9jY19wcm9jZXNzaW5nX3NlbGVjdG9yKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHRoYXQuY3JlZGl0Q2FyZEZlZUNoZWNrYm94KHRoaXMpO1xuICAgICAgfSk7XG4gICAgfSwgLy8gY3JlZGl0Q2FyZFByb2Nlc3NpbmdGZWVzXG5cbiAgICBnZXRTdHJpcGVQYXltZW50VHlwZTogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgc3RyaXBlX3BheW1lbnRfdHlwZSA9ICdjYXJkJztcbiAgICAgIGlmICgkKCdpbnB1dFtuYW1lPVwic3RyaXBlX3BheW1lbnRfdHlwZVwiXScpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgc3RyaXBlX3BheW1lbnRfdHlwZSA9ICQoJ2lucHV0W25hbWU9XCJzdHJpcGVfcGF5bWVudF90eXBlXCJdJykudmFsKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gc3RyaXBlX3BheW1lbnRfdHlwZTtcbiAgICB9LCAvLyBnZXRTdHJpcGVQYXltZW50VHlwZVxuXG4gICAgc2V0U3RyaXBlUGF5bWVudFR5cGU6IGZ1bmN0aW9uKHN0cmlwZV9wYXltZW50X3R5cGUpIHtcbiAgICAgIGlmICgkKCdpbnB1dFtuYW1lPVwic3RyaXBlX3BheW1lbnRfdHlwZVwiXScpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAkKHRoaXMub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuYXBwZW5kKCc8aW5wdXQgdHlwZT1cXFwiaGlkZGVuXFxcIiBuYW1lPVxcXCJzdHJpcGVfcGF5bWVudF90eXBlXFxcIj4nKTtcbiAgICAgIH1cbiAgICAgICQoJ2lucHV0W25hbWU9XCJzdHJpcGVfcGF5bWVudF90eXBlXCJdJykudmFsKHN0cmlwZV9wYXltZW50X3R5cGUpO1xuICAgICAgcmV0dXJuIHN0cmlwZV9wYXltZW50X3R5cGU7XG4gICAgfSwgLy8gc2V0U3RyaXBlUGF5bWVudFR5cGVcblxuICAgIGNyZWRpdENhcmRGZWVDaGVja2JveDogZnVuY3Rpb24oZmllbGQpIHtcbiAgICAgIHZhciBmdWxsX2Ftb3VudDtcbiAgICAgIHZhciB0b3RhbF9hbW91bnQgPSB0aGlzLmdldFRvdGFsQW1vdW50KCk7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICBpZiAoJChmaWVsZCkuaXMoJzpjaGVja2VkJykgfHwgJChmaWVsZCkucHJvcCgnY2hlY2tlZCcpKSB7XG4gICAgICAgICQoJy5hbW91bnQgLmxldmVsLWFtb3VudCcpLmFkZENsYXNzKCdmdWxsLWFtb3VudCcpO1xuICAgICAgICBmdWxsX2Ftb3VudCA9ICh0b3RhbF9hbW91bnQgKyBwYXJzZUZsb2F0KCQodGhhdC5vcHRpb25zLmZlZV9hbW91bnQpLnRleHQoKSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZnVsbF9hbW91bnQgPSB0b3RhbF9hbW91bnQ7XG4gICAgICB9XG4gICAgICBmdWxsX2Ftb3VudCA9IHBhcnNlRmxvYXQoZnVsbF9hbW91bnQpLnRvRml4ZWQoMik7XG4gICAgICAkKHRoYXQub3B0aW9ucy5mdWxsX2Ftb3VudF9zZWxlY3RvcikudGV4dChmdWxsX2Ftb3VudCk7XG5cbiAgICAgIC8vIHVwZGF0ZSB0aGUgcGF5bWVudCByZXF1ZXN0XG4gICAgICBpZiAodGhpcy5wYXltZW50UmVxdWVzdCAmJiBmdWxsX2Ftb3VudCkge1xuICAgICAgICB0aGlzLnBheW1lbnRSZXF1ZXN0LnVwZGF0ZSh7XG4gICAgICAgICAgdG90YWw6IHtcbiAgICAgICAgICAgIGxhYmVsOiBcIk1pbm5Qb3N0XCIsXG4gICAgICAgICAgICBhbW91bnQ6IGZ1bGxfYW1vdW50ICogMTAwXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgIH0sIC8vIGNyZWRpdENhcmRGZWVDaGVja2JveFxuXG4gICAgZG9uYXRlQW5vbnltb3VzbHk6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHRoYXQudG9nZ2xlQW5vbnltb3VzKCQob3B0aW9ucy5hbm9ueW1vdXNfc2VsZWN0b3IsIGVsZW1lbnQpKTtcbiAgICAgICQob3B0aW9ucy5hbm9ueW1vdXNfc2VsZWN0b3IsIGVsZW1lbnQpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgdGhhdC50b2dnbGVBbm9ueW1vdXMoJCh0aGlzKSk7XG4gICAgICB9KTtcbiAgICB9LCAvLyBkb25hdGVBbm9ueW1vdXNseVxuXG4gICAgdG9nZ2xlQW5vbnltb3VzOiBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICBpZiAoZWxlbWVudC5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICAkKHRoaXMub3B0aW9ucy5uYW1lX3NlbGVjdG9yICsgJyBkaXY6Zmlyc3QnLCB0aGlzLmVsZW1lbnQpLmhpZGUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQodGhpcy5vcHRpb25zLm5hbWVfc2VsZWN0b3IgKyAnIGRpdjpmaXJzdCcsIHRoaXMuZWxlbWVudCkuc2hvdygpO1xuICAgICAgfVxuICAgIH0sIC8vIHRvZ2dsZUFub255bW91c1xuXG4gICAgaG9ub3JPck1lbW9yeTogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgaWYgKCQob3B0aW9ucy5ob25vcl9vcl9tZW1vcnlfY2hvb3NlciArICc6Y2hlY2tlZCcpLnZhbCgpKSB7XG4gICAgICAgICQob3B0aW9ucy5ob25vcl9tZW1vcnlfaW5wdXRfZ3JvdXAsIGVsZW1lbnQpLnNob3coKTtcbiAgICAgICAgJChvcHRpb25zLmhvbm9yX3R5cGVfc2VsZWN0b3IpLnRleHQoJChvcHRpb25zLmhvbm9yX29yX21lbW9yeV9jaG9vc2VyICsgJzpjaGVja2VkJykudmFsKCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJChvcHRpb25zLmhvbm9yX21lbW9yeV9pbnB1dF9ncm91cCwgZWxlbWVudCkuaGlkZSgpO1xuICAgICAgICAkKG9wdGlvbnMuaG9ub3JfbmFtZV9zZWxlY3RvciArICcgaW5wdXQnLCBlbGVtZW50KS52YWwoJycpO1xuICAgICAgfVxuICAgIH0sIC8vIGhvbm9yT3JNZW1vcnlcblxuICAgIGhvbm9yT3JNZW1vcnlUb2dnbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHRoYXQuaG9ub3JPck1lbW9yeSh0aGF0LmVsZW1lbnQsIHRoYXQub3B0aW9ucyk7XG4gICAgICAkKG9wdGlvbnMuaG9ub3Jfb3JfbWVtb3J5X2Nob29zZXIsIGVsZW1lbnQpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgdGhhdC5ob25vck9yTWVtb3J5KHRoYXQuZWxlbWVudCwgdGhhdC5vcHRpb25zKTtcbiAgICAgIH0pO1xuICAgIH0sIC8vIGhvbm9yT3JNZW1vcnlUb2dnbGVcblxuICAgIG91dHNpZGVVbml0ZWRTdGF0ZXM6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICQob3B0aW9ucy5zaG93X2JpbGxpbmdfY291bnRyeV9zZWxlY3RvcikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoYXQuY2hhbmdlRmllbGRzT3V0c2lkZVVTKCdiaWxsaW5nJywgZWxlbWVudCwgb3B0aW9ucyk7XG4gICAgICAgICQodGhpcykucGFyZW50KCkuaGlkZSgpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KTtcbiAgICAgICQob3B0aW9ucy5zaG93X3NoaXBwaW5nX2NvdW50cnlfc2VsZWN0b3IpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAkKG9wdGlvbnMuc2hpcHBpbmdfY291bnRyeV9zZWxlY3Rvcikuc2hvdygpO1xuICAgICAgICB0aGF0LmNoYW5nZUZpZWxkc091dHNpZGVVUygnc2hpcHBpbmcnLCBlbGVtZW50LCBvcHRpb25zKTtcbiAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5oaWRlKCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuICAgIH0sIC8vIG91dHNpZGVVbml0ZWRTdGF0ZXNcblxuICAgIGNoYW5nZUZpZWxkc091dHNpZGVVUzogZnVuY3Rpb24oYmlsbGluZ19vcl9zaGlwcGluZywgZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgaWYgKCBiaWxsaW5nX29yX3NoaXBwaW5nID09PSAnYmlsbGluZycgKSB7XG4gICAgICAgIHZhciB6aXBfcGFyZW50ID0gJChvcHRpb25zLmJpbGxpbmdfemlwX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKTtcbiAgICAgICAgdmFyIHN0YXRlX3BhcmVudCA9ICQob3B0aW9ucy5iaWxsaW5nX3N0YXRlX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKTtcbiAgICAgICAgJChvcHRpb25zLmJpbGxpbmdfY291bnRyeV9zZWxlY3Rvcikuc2hvdygpO1xuICAgICAgICAkKG9wdGlvbnMuYmlsbGluZ196aXBfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLmF0dHIoJ3R5cGUnLCAndGV4dCcpO1xuICAgICAgICAkKG9wdGlvbnMuYmlsbGluZ196aXBfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuICAgICAgICAkKG9wdGlvbnMuYmlsbGluZ19zdGF0ZV9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICAgICQoJ2xhYmVsJywgemlwX3BhcmVudCkudGV4dCgnUG9zdGFsIENvZGU6Jyk7XG4gICAgICAgICQoJ2xhYmVsJywgc3RhdGVfcGFyZW50KS50ZXh0KCdSZWdpb246Jyk7XG4gICAgICB9IGVsc2UgaWYgKCBiaWxsaW5nX29yX3NoaXBwaW5nID09PSAnc2hpcHBpbmcnICkge1xuICAgICAgICB2YXIgemlwX3BhcmVudCA9ICQob3B0aW9ucy5zaGlwcGluZ196aXBfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpO1xuICAgICAgICB2YXIgc3RhdGVfcGFyZW50ID0gJChvcHRpb25zLnNoaXBwaW5nX3N0YXRlX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKTtcbiAgICAgICAgJChvcHRpb25zLnNoaXBwaW5nX2NvdW50cnlfc2VsZWN0b3IpLnNob3coKTtcbiAgICAgICAgJChvcHRpb25zLnNoaXBwaW5nX3ppcF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkuYXR0cigndHlwZScsICd0ZXh0Jyk7XG4gICAgICAgICQob3B0aW9ucy5zaGlwcGluZ196aXBfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuICAgICAgICAkKG9wdGlvbnMuc2hpcHBpbmdfc3RhdGVfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuICAgICAgICAkKCdsYWJlbCcsIHppcF9wYXJlbnQpLnRleHQoJ1NoaXBwaW5nIFBvc3RhbCBDb2RlOicpO1xuICAgICAgICAkKCdsYWJlbCcsIHN0YXRlX3BhcmVudCkudGV4dCgnU2hpcHBpbmcgUmVnaW9uOicpO1xuICAgICAgfVxuICAgIH0sIC8vIGNoYW5nZUZpZWxkc091dHNpZGVVU1xuXG4gICAgY2hhbmdlRmllbGRzSW5zaWRlVVM6IGZ1bmN0aW9uKGJpbGxpbmdfb3Jfc2hpcHBpbmcsIGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIGlmICggYmlsbGluZ19vcl9zaGlwcGluZyA9PT0gJ2JpbGxpbmcnICkge1xuICAgICAgICB2YXIgemlwX3BhcmVudCA9ICQob3B0aW9ucy5iaWxsaW5nX3ppcF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkucGFyZW50KCk7XG4gICAgICAgIHZhciBzdGF0ZV9wYXJlbnQgPSAkKG9wdGlvbnMuYmlsbGluZ19zdGF0ZV9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkucGFyZW50KCk7XG4gICAgICAgICQob3B0aW9ucy5iaWxsaW5nX2NvdW50cnlfc2VsZWN0b3IpLnNob3coKTtcbiAgICAgICAgJChvcHRpb25zLmJpbGxpbmdfemlwX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5hdHRyKCd0eXBlJywgJ3RlbCcpO1xuICAgICAgICAkKG9wdGlvbnMuYmlsbGluZ196aXBfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnByb3AoJ3JlcXVpcmVkJywgdHJ1ZSk7XG4gICAgICAgICQob3B0aW9ucy5iaWxsaW5nX3N0YXRlX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5wcm9wKCdyZXF1aXJlZCcsIHRydWUpO1xuICAgICAgICAkKCdsYWJlbCcsIHppcF9wYXJlbnQpLmh0bWwoJ1ppcCBDb2RlOiA8c3BhbiBjbGFzcz1cImEtZm9ybS1pdGVtLXJlcXVpcmVkXCIgdGl0bGU9XCJUaGlzIGZpZWxkIGlzIHJlcXVpcmVkLlwiPio8L3NwYW4+Jyk7XG4gICAgICAgICQoJ2xhYmVsJywgc3RhdGVfcGFyZW50KS5odG1sKCdTdGF0ZTogPHNwYW4gY2xhc3M9XCJhLWZvcm0taXRlbS1yZXF1aXJlZFwiIHRpdGxlPVwiVGhpcyBmaWVsZCBpcyByZXF1aXJlZC5cIj4qPC9zcGFuPicpO1xuICAgICAgfSBlbHNlIGlmICggYmlsbGluZ19vcl9zaGlwcGluZyA9PT0gJ3NoaXBwaW5nJyApIHtcbiAgICAgICAgdmFyIHppcF9wYXJlbnQgPSAkKG9wdGlvbnMuc2hpcHBpbmdfemlwX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKTtcbiAgICAgICAgdmFyIHN0YXRlX3BhcmVudCA9ICQob3B0aW9ucy5zaGlwcGluZ19zdGF0ZV9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkucGFyZW50KCk7XG4gICAgICAgICQob3B0aW9ucy5zaGlwcGluZ19jb3VudHJ5X3NlbGVjdG9yKS5zaG93KCk7XG4gICAgICAgICQob3B0aW9ucy5zaGlwcGluZ196aXBfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLmF0dHIoJ3R5cGUnLCAndGVsJyk7XG4gICAgICAgICQob3B0aW9ucy5zaGlwcGluZ196aXBfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnByb3AoJ3JlcXVpcmVkJywgdHJ1ZSk7XG4gICAgICAgICQob3B0aW9ucy5zaGlwcGluZ19zdGF0ZV9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkucHJvcCgncmVxdWlyZWQnLCB0cnVlKTtcbiAgICAgICAgJCgnbGFiZWwnLCB6aXBfcGFyZW50KS5odG1sKCdTaGlwcGluZyBaaXAgQ29kZTogPHNwYW4gY2xhc3M9XCJhLWZvcm0taXRlbS1yZXF1aXJlZFwiIHRpdGxlPVwiVGhpcyBmaWVsZCBpcyByZXF1aXJlZC5cIj4qPC9zcGFuPicpO1xuICAgICAgICAkKCdsYWJlbCcsIHN0YXRlX3BhcmVudCkuaHRtbCgnU2hpcHBpbmcgU3RhdGU6IDxzcGFuIGNsYXNzPVwiYS1mb3JtLWl0ZW0tcmVxdWlyZWRcIiB0aXRsZT1cIlRoaXMgZmllbGQgaXMgcmVxdWlyZWQuXCI+Kjwvc3Bhbj4nKTtcbiAgICAgIH1cbiAgICB9LCAvLyBjaGFuZ2VGaWVsZHNPdXRzaWRlVVNcblxuICAgIHNoaXBwaW5nQWRkcmVzczogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdmFyIHNob3dfc2hpcHBpbmcgPSBmYWxzZTtcbiAgICAgIGlmICgkKG9wdGlvbnMudXNlX2Zvcl9zaGlwcGluZ19zZWxlY3RvcikubGVuZ3RoID4gMCkgeyAvLyB3ZSBoYXZlIGEgc2hpcHBpbmcgY2hlY2tib3hcbiAgICAgICAgc2hvd19zaGlwcGluZyA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZiAoc2hvd19zaGlwcGluZyA9PT0gdHJ1ZSApIHtcbiAgICAgICAgJChvcHRpb25zLnVzZV9mb3Jfc2hpcHBpbmdfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpLnNob3coKTtcbiAgICAgICAgaWYgKCQob3B0aW9ucy51c2VfZm9yX3NoaXBwaW5nX3NlbGVjdG9yLCBlbGVtZW50KS5pcygnOmNoZWNrZWQnKSkgeyAvLyB1c2Ugc2FtZSBhcyBiaWxsaW5nXG4gICAgICAgICAgJChvcHRpb25zLnNoaXBwaW5nX3NlbGVjdG9yKS5oaWRlKCk7XG4gICAgICAgIH0gZWxzZSB7IC8vIHNlcGFyYXRlIHNoaXBwaW5nIGFuZCBiaWxsaW5nXG4gICAgICAgICAgJChvcHRpb25zLnNoaXBwaW5nX3NlbGVjdG9yKS5zaG93KCk7XG4gICAgICAgIH1cbiAgICAgICAgJChvcHRpb25zLnVzZV9mb3Jfc2hpcHBpbmdfc2VsZWN0b3IsIGVsZW1lbnQpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgICB0aGF0LnNoaXBwaW5nQWRkcmVzcyhlbGVtZW50LCBvcHRpb25zKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBcbiAgICB9LCAvLyBzaGlwcGluZ0FkZHJlc3NcblxuICAgIGFsbG93TWlubnBvc3RBY2NvdW50OiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB2YXIgYWNjb3VudF9leGlzdHMgPSBmYWxzZTtcblxuICAgICAgLy8gc2hvdyBwYXNzd29yZCBhcyB0ZXh0XG4gICAgICB0aGF0LnNob3dQYXNzd29yZCgpO1xuXG4gICAgICAvLyBjYWxjdWxhdGUgcGFzc3dvcmQgc3RyZW5ndGhcbiAgICAgIHRoYXQuc2hvd1Bhc3N3b3JkU3RyZW5ndGgoKTtcbiAgICAgIFxuICAgICAgdGhhdC5zcGFtRW1haWwoJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KSk7XG4gICAgICAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgdGhhdC5zcGFtRW1haWwoJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KSk7XG4gICAgICB9KTtcblxuICAgICAgdGhhdC50b2dnbGVBY2NvdW50RmllbGRzKCQob3B0aW9ucy5jcmVhdGVfbXBfc2VsZWN0b3IsIGVsZW1lbnQpKTtcbiAgICAgICQob3B0aW9ucy5jcmVhdGVfbXBfc2VsZWN0b3IsIGVsZW1lbnQpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgdGhhdC50b2dnbGVBY2NvdW50RmllbGRzKCQob3B0aW9ucy5jcmVhdGVfbXBfc2VsZWN0b3IsIGVsZW1lbnQpKTtcbiAgICAgIH0pO1xuXG4gICAgICBmdW5jdGlvbiBkb25lVHlwaW5nICgpIHtcbiAgICAgICAgdmFyIGVtYWlsID0gJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKTtcbiAgICAgICAgYWNjb3VudF9leGlzdHMgPSB0aGF0LmNoZWNrTWlubnBvc3RBY2NvdW50KGVsZW1lbnQsIG9wdGlvbnMsIGVtYWlsKTtcbiAgICAgIH1cblxuICAgICAgLy9zZXR1cCBiZWZvcmUgZnVuY3Rpb25zXG4gICAgICB2YXIgdHlwaW5nVGltZXI7ICAgICAgICAgICAgICAgIC8vdGltZXIgaWRlbnRpZmllclxuICAgICAgdmFyIGRvbmVUeXBpbmdJbnRlcnZhbCA9IDUwMDA7ICAvL3RpbWUgaW4gbXMsIDUgc2Vjb25kIGZvciBleGFtcGxlXG5cbiAgICAgIC8vb24ga2V5dXAsIHN0YXJ0IHRoZSBjb3VudGRvd25cbiAgICAgICQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkua2V5dXAoZnVuY3Rpb24oKXtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHR5cGluZ1RpbWVyKTtcbiAgICAgICAgaWYgKCQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKSB7XG4gICAgICAgICAgdHlwaW5nVGltZXIgPSBzZXRUaW1lb3V0KGRvbmVUeXBpbmcsIGRvbmVUeXBpbmdJbnRlcnZhbCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sIC8vIGFsbG93TWlubnBvc3RBY2NvdW50XG5cbiAgICBzcGFtRW1haWw6IGZ1bmN0aW9uKGVtYWlsX2ZpZWxkKSB7XG4gICAgICB2YXIgc3BhbUVycm9yQ29udGFpbmVyID0gZW1haWxfZmllbGQucGFyZW50KCk7XG4gICAgICBpZiAoJCgnLmEtc3BhbS1lbWFpbCcsIHNwYW1FcnJvckNvbnRhaW5lcikubGVuZ3RoID09PSAwICkge1xuICAgICAgICBzcGFtRXJyb3JDb250YWluZXIuYXBwZW5kKCc8cCBjbGFzcz1cImEtZm9ybS1jYXB0aW9uIGEtdmFsaWRhdGlvbi1lcnJvciBhLXNwYW0tZW1haWxcIj5UaGlzIGVtYWlsIGFkZHJlc3MgaGFzIGJlZW4gZGV0ZWN0ZWQgYXMgYSBzcGFtbWVyLjwvcD4nKTtcbiAgICAgIH1cbiAgICAgICQoJy5hLXNwYW0tZW1haWwnLCBzcGFtRXJyb3JDb250YWluZXIpLmhpZGUoKTtcbiAgICAgIHNwYW1FcnJvckNvbnRhaW5lci5yZW1vdmVDbGFzcygnaW52YWxpZCBhLWVycm9yJyk7XG4gICAgfSwgLy8gc3BhbUVtYWlsXG5cbiAgICB0b2dnbGVBY2NvdW50RmllbGRzOiBmdW5jdGlvbihjcmVhdGVfYWNjb3VudF9zZWxlY3Rvcikge1xuICAgICAgaWYgKGNyZWF0ZV9hY2NvdW50X3NlbGVjdG9yLmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgIGNyZWF0ZV9hY2NvdW50X3NlbGVjdG9yLnBhcmVudCgpLmJlZm9yZSgnPHAgY2xhc3M9XCJhLWZvcm0tY2FwdGlvbiBhLWFjY291bnQtZXhpc3RzIGEtYWNjb3VudC1leGlzdHMtc3VjY2Vzc1wiPlRoZXJlIGlzIGFscmVhZHkgYSBNaW5uUG9zdC5jb20gYWNjb3VudCB3aXRoIHRoaXMgZW1haWwgYWRkcmVzcy48L3A+Jyk7XG4gICAgICAgICQoJy5hLWFjY291bnQtZXhpc3RzJykuaGlkZSgpO1xuICAgICAgICAkKHRoaXMub3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgdGhpcy5lbGVtZW50KS5zaG93KCk7XG4gICAgICAgIHRoaXMub3B0aW9ucy5jcmVhdGVfYWNjb3VudCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkKHRoaXMub3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgdGhpcy5lbGVtZW50KS5oaWRlKCk7XG4gICAgICB9XG4gICAgfSwgLy8gdG9nZ2xlQWNjb3VudEZpZWxkc1xuXG4gICAgc2hvd1Bhc3N3b3JkOiBmdW5jdGlvbigpIHtcbiAgICAgIC8vIENhY2hlIG91ciBqcXVlcnkgZWxlbWVudHNcbiAgICAgIHZhciAkc3VibWl0ID0gJCgnLmJ0bi1zdWJtaXQnKTtcbiAgICAgIHZhciAkY29udGFpbmVyID0gJCh0aGlzLm9wdGlvbnMucGFzc3dvcmRfc2VsZWN0b3IsIHRoaXMuZWxlbWVudCk7XG4gICAgICB2YXIgJGZpZWxkID0gJCgnaW5wdXRbbmFtZT1cInBhc3N3b3JkXCJdJywgJGNvbnRhaW5lcik7XG4gICAgICAkKCcuYS1hY2NvdW50LWV4aXN0cycpLmhpZGUoKTtcbiAgICAgIHZhciBzaG93X3Bhc3MgPSAnPGRpdiBjbGFzcz1cImEtZm9ybS1zaG93LXBhc3N3b3JkIGEtZm9ybS1jYXB0aW9uXCI+PGxhYmVsPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBuYW1lPVwic2hvd19wYXNzd29yZFwiIGlkPVwic2hvdy1wYXNzd29yZC1jaGVja2JveFwiIHZhbHVlPVwiMVwiPiBTaG93IHBhc3N3b3JkPC9sYWJlbD48L2Rpdj4nO1xuICAgICAgLy8gSW5qZWN0IHRoZSB0b2dnbGUgYnV0dG9uIGludG8gdGhlIHBhZ2VcbiAgICAgICRjb250YWluZXIuYXBwZW5kKCBzaG93X3Bhc3MgKTtcbiAgICAgIC8vIENhY2hlIHRoZSB0b2dnbGUgYnV0dG9uXG4gICAgICB2YXIgJHRvZ2dsZSA9ICQoJyNzaG93LXBhc3N3b3JkLWNoZWNrYm94Jyk7XG4gICAgICAvLyBUb2dnbGUgdGhlIGZpZWxkIHR5cGVcbiAgICAgICR0b2dnbGUub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICB2YXIgY2hlY2tib3ggPSAkKHRoaXMpO1xuICAgICAgICBpZiAoY2hlY2tib3guaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgICAkZmllbGQuYXR0cigndHlwZScsICd0ZXh0Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJGZpZWxkLmF0dHIoJ3R5cGUnLCAncGFzc3dvcmQnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICAvLyBTZXQgdGhlIGZvcm0gZmllbGQgYmFjayB0byBhIHJlZ3VsYXIgcGFzc3dvcmQgZWxlbWVudFxuICAgICAgJHN1Ym1pdC5vbiggJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAkZmllbGQuYXR0cigndHlwZScsICdwYXNzd29yZCcpO1xuICAgICAgfSk7XG4gICAgfSxcblxuICAgIHNob3dQYXNzd29yZFN0cmVuZ3RoOiBmdW5jdGlvbigpIHtcbiAgICAgIC8vIGNoZWNrUGFzc3dvcmRTdHJlbmd0aFxuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgaWYgKCQoJy5hLXBhc3N3b3JkLXN0cmVuZ3RoJykubGVuZ3RoID4gMCApIHtcbiAgICAgICAgdmFyICRiZWZvcmUgPSAkKCcuYS1mb3JtLXNob3ctcGFzc3dvcmQnKTtcbiAgICAgICAgJGJlZm9yZS5hZnRlciggJCgnPGRpdiBjbGFzcz1cImEtcGFzc3dvcmQtc3RyZW5ndGhcIj48bWV0ZXIgbWF4PVwiNFwiIGlkPVwicGFzc3dvcmQtc3RyZW5ndGhcIj48ZGl2PjwvZGl2PjwvbWV0ZXI+PHAgY2xhc3M9XCJhLWZvcm0tY2FwdGlvblwiIGlkPVwicGFzc3dvcmQtc3RyZW5ndGgtdGV4dFwiPjwvcD48L2Rpdj4nKSk7XG4gICAgICAgICQoICdib2R5JyApLm9uKCAna2V5dXAnLCAnaW5wdXRbbmFtZT1wYXNzd29yZF0nLFxuICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhhdC5jaGVja1Bhc3N3b3JkU3RyZW5ndGgoXG4gICAgICAgICAgICAgICQoJ2lucHV0W25hbWU9cGFzc3dvcmRdJyksIC8vIFBhc3N3b3JkIGZpZWxkXG4gICAgICAgICAgICAgICQoJyNwYXNzd29yZC1zdHJlbmd0aCcpLCAgICAgICAgICAgLy8gU3RyZW5ndGggbWV0ZXJcbiAgICAgICAgICAgICAgJCgnI3Bhc3N3b3JkLXN0cmVuZ3RoLXRleHQnKSAgICAgIC8vIFN0cmVuZ3RoIHRleHQgaW5kaWNhdG9yXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9LCAvLyBzaG93UGFzc3dvcmRTdHJlbmd0aFxuXG4gICAgY2hlY2tQYXNzd29yZFN0cmVuZ3RoOiBmdW5jdGlvbiggJHBhc3N3b3JkLCAkc3RyZW5ndGhNZXRlciwgJHN0cmVuZ3RoVGV4dCApIHtcbiAgICAgIHZhciBwYXNzd29yZCA9ICRwYXNzd29yZC52YWwoKTtcbiAgICAgIC8vIEdldCB0aGUgcGFzc3dvcmQgc3RyZW5ndGhcbiAgICAgIHZhciByZXN1bHQgPSB6eGN2Ym4ocGFzc3dvcmQpO1xuICAgICAgdmFyIHN0cmVuZ3RoID0gcmVzdWx0LnNjb3JlO1xuXG4gICAgICAkc3RyZW5ndGhUZXh0LnJlbW92ZUNsYXNzKCAnc2hvcnQgYmFkIGdvb2Qgc3Ryb25nJyApO1xuXG4gICAgICAvLyBBZGQgdGhlIHN0cmVuZ3RoIG1ldGVyIHJlc3VsdHNcbiAgICAgIHN3aXRjaCAoIHN0cmVuZ3RoICkge1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgJHN0cmVuZ3RoVGV4dC5hZGRDbGFzcyggJ2JhZCcgKS5odG1sKCAnU3RyZW5ndGg6IDxzdHJvbmc+V2Vhazwvc3Ryb25nPicgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICRzdHJlbmd0aFRleHQuYWRkQ2xhc3MoICdnb29kJyApLmh0bWwoICdTdHJlbmd0aDogPHN0cm9uZz5NZWRpdW08L3N0cm9uZz4nICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAkc3RyZW5ndGhUZXh0LmFkZENsYXNzKCAnc3Ryb25nJyApLmh0bWwoICdTdHJlbmd0aDogPHN0cm9uZz5TdHJvbmc8L3N0cm9uZz4nICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAkc3RyZW5ndGhUZXh0LmFkZENsYXNzKCAnc2hvcnQnICkuaHRtbCggJ1N0cmVuZ3RoOiA8c3Ryb25nPlZlcnkgd2Vhazwvc3Ryb25nPicgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAkc3RyZW5ndGhUZXh0LmFkZENsYXNzKCAnc2hvcnQnICkuaHRtbCggJ1N0cmVuZ3RoOiA8c3Ryb25nPlZlcnkgd2Vhazwvc3Ryb25nPicgKTtcbiAgICAgIH1cbiAgICAgICRzdHJlbmd0aE1ldGVyLnZhbChzdHJlbmd0aCk7XG4gICAgICByZXR1cm4gc3RyZW5ndGg7XG4gICAgfSwgLy8gY2hlY2tQYXNzd29yZFN0cmVuZ3RoXG5cbiAgICBjaGVja01pbm5wb3N0QWNjb3VudDogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucywgZW1haWwpIHtcbiAgICAgIHZhciB1c2VyID0ge1xuICAgICAgICBlbWFpbDogZW1haWxcbiAgICAgIH07XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAkLmFqYXgoe1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICB1cmw6IG9wdGlvbnMubWlubnBvc3Rfcm9vdCArICcvd3AtanNvbi91c2VyLWFjY291bnQtbWFuYWdlbWVudC92MS9jaGVjay1hY2NvdW50JyxcbiAgICAgICAgZGF0YTogdXNlclxuICAgICAgfSkuZG9uZShmdW5jdGlvbiggcmVzdWx0ICkge1xuICAgICAgICBpZiAocmVzdWx0LnN0YXR1cyA9PT0gJ3N1Y2Nlc3MnICYmIHJlc3VsdC5yZWFzb24gPT09ICd1c2VyIGV4aXN0cycpIHsgLy8gdXNlciBleGlzdHNcbiAgICAgICAgICBpZiAoJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgICAgICQob3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgZWxlbWVudCkuaGlkZSgpO1xuICAgICAgICAgICAgJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkucGFyZW50KCkuaGlkZSgpO1xuICAgICAgICAgICAgJCgnLmEtYWNjb3VudC1leGlzdHMnLCBlbGVtZW50KS5zaG93KCk7XG4gICAgICAgICAgfVxuICAgICAgICAgICQob3B0aW9ucy5jcmVhdGVfbXBfc2VsZWN0b3IsIGVsZW1lbnQpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICgkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KS5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICAgICAgICAkKG9wdGlvbnMucGFzc3dvcmRfc2VsZWN0b3IsIGVsZW1lbnQpLmhpZGUoKTtcbiAgICAgICAgICAgICAgJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkucGFyZW50KCkuaGlkZSgpO1xuICAgICAgICAgICAgICAkKCcuYS1hY2NvdW50LWV4aXN0cycsIGVsZW1lbnQpLnNob3coKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmICggcmVzdWx0LnN0YXR1cyA9PT0gJ3NwYW0nICkge1xuICAgICAgICAgICQodGhhdC5vcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yKS5hZGRDbGFzcygnaW52YWxpZCBhLWVycm9yJyk7XG4gICAgICAgICAgJCggJy5hLXNwYW0tZW1haWwnKS5zaG93KCk7XG4gICAgICAgIH0gZWxzZSB7IC8vIHVzZXIgZG9lcyBub3QgZXhpc3Qgb3IgYWpheCBjYWxsIGZhaWxlZFxuICAgICAgICAgIGlmICgkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KS5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICAgICAgJChvcHRpb25zLnBhc3N3b3JkX3NlbGVjdG9yLCBlbGVtZW50KS5zaG93KCk7XG4gICAgICAgICAgICBvcHRpb25zLmNyZWF0ZV9hY2NvdW50ID0gdHJ1ZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJChvcHRpb25zLnBhc3N3b3JkX3NlbGVjdG9yLCBlbGVtZW50KS5oaWRlKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgICQoJy5hLWFjY291bnQtZXhpc3RzJywgZWxlbWVudCkuaGlkZSgpO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSwgLy8gY2hlY2tNaW5ucG9zdEFjY291bnRcblxuICAgIHBheW1lbnRSZXF1ZXN0QnV0dG9uOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB2YXIgdG90YWxfYW1vdW50ID0gdGhhdC5nZXRUb3RhbEFtb3VudCgpO1xuICAgICAgdGhhdC5wYXltZW50UmVxdWVzdCA9IHRoYXQuc3RyaXBlLnBheW1lbnRSZXF1ZXN0KHtcbiAgICAgICAgY291bnRyeTogJ1VTJyxcbiAgICAgICAgY3VycmVuY3k6ICd1c2QnLFxuICAgICAgICB0b3RhbDoge1xuICAgICAgICAgIGxhYmVsOiAnTWlublBvc3QnLFxuICAgICAgICAgIGFtb3VudDogdG90YWxfYW1vdW50ICogMTAwLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgICB0aGF0LnByQnV0dG9uID0gdGhhdC5lbGVtZW50cy5jcmVhdGUoJ3BheW1lbnRSZXF1ZXN0QnV0dG9uJywge1xuICAgICAgICBwYXltZW50UmVxdWVzdDogdGhhdC5wYXltZW50UmVxdWVzdCxcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICBwYXltZW50UmVxdWVzdEJ1dHRvbjoge1xuICAgICAgICAgICAgdHlwZTogJ2RvbmF0ZScsXG4gICAgICAgICAgICAvLyBPbmUgb2YgJ2RlZmF1bHQnLCAnYm9vaycsICdidXknLCBvciAnZG9uYXRlJ1xuICAgICAgICAgICAgLy8gRGVmYXVsdHMgdG8gJ2RlZmF1bHQnXG4gICAgICBcbiAgICAgICAgICAgIHRoZW1lOiAnZGFyaycsXG4gICAgICAgICAgICAvLyBPbmUgb2YgJ2RhcmsnLCAnbGlnaHQnLCBvciAnbGlnaHQtb3V0bGluZSdcbiAgICAgICAgICAgIC8vIERlZmF1bHRzIHRvICdkYXJrJ1xuICAgICAgXG4gICAgICAgICAgICBoZWlnaHQ6ICc0OHB4J1xuICAgICAgICAgICAgLy8gRGVmYXVsdHMgdG8gJzQwcHgnLiBUaGUgd2lkdGggaXMgYWx3YXlzICcxMDAlJy5cbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgICBcbiAgICAgIC8vIENoZWNrIHRoZSBhdmFpbGFiaWxpdHkgb2YgdGhlIFBheW1lbnQgUmVxdWVzdCBBUEkgZmlyc3QuXG4gICAgICB0aGF0LnBheW1lbnRSZXF1ZXN0LmNhbk1ha2VQYXltZW50KCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICQoJy5tLXBheS13aXRob3V0LXBheW1lbnQtcmVxdWVzdCcpLmhpZGUoKTtcbiAgICAgICAgICB0aGF0LnByQnV0dG9uLm1vdW50KCcjcGF5bWVudC1yZXF1ZXN0LWJ1dHRvbicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoYXQuaGlkZVBheW1lbnRSZXF1ZXN0KCAkKCcuby1wYXktd2l0aC1wYXltZW50LXJlcXVlc3QnKSApO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgJCgnLmRlY2xpbmUtYXBwbGUtcGF5IGEnKS5jbGljayhmdW5jdGlvbihldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGF0LmhpZGVQYXltZW50UmVxdWVzdCggJCgnLm8tcGF5LXdpdGgtcGF5bWVudC1yZXF1ZXN0IC5tLWZvcm0tYWN0aW9ucy1wYXktZmVlcycpICk7XG4gICAgICB9KTtcblxuICAgICAgdGhhdC5wckJ1dHRvbi5vbignY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xuXG4gICAgICAgIC8vIFNlbmQgcGF5bWVudE1ldGhvZC5pZCB0byBzZXJ2ZXJcbiAgICAgICAgdmFyIHN1cHBvcnRmb3JtID0gJCh0aGF0Lm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpO1xuXG4gICAgICAgIC8vIGNoZWNrIHZhbGlkYXRpb24gb2YgZm9ybVxuICAgICAgICBpZiAoIXN1cHBvcnRmb3JtLmdldCgwKS5yZXBvcnRWYWxpZGl0eSgpKSB7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICB0aGF0LnBheW1lbnRSZXF1ZXN0Lm9uKCdwYXltZW50bWV0aG9kJywgZnVuY3Rpb24oZXZlbnQpIHtcblxuICAgICAgICAvLyBTZW5kIHBheW1lbnRNZXRob2QuaWQgdG8gc2VydmVyXG4gICAgICAgIHZhciBzdXBwb3J0Zm9ybSA9ICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKTtcbiAgICAgICAgdmFyIHRva2VuRmllbGROYW1lID0gJ3BheW1lbnRfbWV0aG9kX2lkJztcbiAgICAgICAgdmFyIHRva2VuRmllbGQgPSAnaW5wdXRbbmFtZT1cIicgKyB0b2tlbkZpZWxkTmFtZSArICdcIl0nO1xuXG4gICAgICAgIC8vIEluc2VydCB0aGUgcGF5bWVudCBtZXRob2QgSUQgaW50byB0aGUgZm9ybSBzbyBpdCBnZXRzIHN1Ym1pdHRlZCB0byB0aGUgc2VydmVyXG4gICAgICAgIGlmICgkKHRva2VuRmllbGQpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAkKHRva2VuRmllbGQpLnZhbChldmVudC5wYXltZW50TWV0aG9kLmlkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdXBwb3J0Zm9ybS5hcHBlbmQoJCgnPGlucHV0IHR5cGU9XFxcImhpZGRlblxcXCIgbmFtZT1cIicgKyB0b2tlbkZpZWxkTmFtZSArICdcIj4nKS52YWwoZXZlbnQucGF5bWVudE1ldGhvZC5pZCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhhdC5mb3JtUHJvY2Vzc29yKHRoYXQsICdwYXltZW50UmVxdWVzdCcpO1xuXG4gICAgICB9KTtcblxuICAgIH0sIC8vIHBheW1lbnRSZXF1ZXN0QnV0dG9uXG5cbiAgICBoaWRlUGF5bWVudFJlcXVlc3Q6IGZ1bmN0aW9uKCBoaWRlRWxlbWVudCApIHtcbiAgICAgIGhpZGVFbGVtZW50LmhpZGUoKTtcbiAgICAgICQoJy5kZWNsaW5lLWFwcGxlLXBheSBhJykuaGlkZSgpO1xuICAgICAgJCgnLm0tcGF5LXdpdGhvdXQtcGF5bWVudC1yZXF1ZXN0Jykuc2hvdygpO1xuICAgICAgJCgnLmEtZy1yZWNhcHRjaGEnKS5pbnNlcnRBZnRlcignLm0tcGF5LXdpdGhvdXQtcGF5bWVudC1yZXF1ZXN0IC5tLWZvcm0tYWN0aW9ucy1wYXktZmVlcycpO1xuICAgIH0sIC8vIGhpZGVQYXltZW50UmVxdWVzdFxuXG4gICAgY2hvb3NlUGF5bWVudE1ldGhvZDogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuXG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG5cbiAgICAgIGlmICgkKG9wdGlvbnMuY2hvb3NlX3BheW1lbnQpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgaWYgKCQob3B0aW9ucy5jaG9vc2VfcGF5bWVudCArICcgaW5wdXQnKS5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICAgIHZhciBjaGVja2VkX2lkID0gJChvcHRpb25zLmNob29zZV9wYXltZW50ICsgJyBpbnB1dDpjaGVja2VkJykuYXR0cignaWQnKTtcbiAgICAgICAgICB2YXIgY2hlY2tlZF92YWx1ZSA9ICQob3B0aW9ucy5jaG9vc2VfcGF5bWVudCArICcgaW5wdXQ6Y2hlY2tlZCcpLnZhbCgpO1xuICAgICAgICAgIHRoYXQuc2V0dXBQYXltZW50TWV0aG9kKGNoZWNrZWRfaWQsIGNoZWNrZWRfdmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgJChvcHRpb25zLmNob29zZV9wYXltZW50ICsgJyBpbnB1dCcpLmNoYW5nZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyIGNoZWNrZWRfaWQgPSB0aGlzLmlkO1xuICAgICAgICAgIHZhciBjaGVja2VkX3ZhbHVlID0gdGhpcy52YWx1ZTtcbiAgICAgICAgICB0aGF0LnNldHVwUGF5bWVudE1ldGhvZChjaGVja2VkX2lkLCBjaGVja2VkX3ZhbHVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgIH1cbiAgICB9LCAvLyBjaG9vc2VQYXltZW50TWV0aG9kXG5cbiAgICBzZXR1cFBheW1lbnRNZXRob2Q6IGZ1bmN0aW9uKGVsZW1lbnRfaWQsIGVsZW1lbnRfdmFsdWUpIHtcbiAgICAgIHZhciBzdHJpcGVfcGF5bWVudF90eXBlID0gdGhpcy5zZXRTdHJpcGVQYXltZW50VHlwZShlbGVtZW50X3ZhbHVlKTtcbiAgICAgIGlmICggZWxlbWVudF92YWx1ZSA9PT0gJ2JhbmtfYWNjb3VudCcgKSB7XG4gICAgICAgICQoJ2lucHV0W25hbWU9XCJwYXltZW50X21ldGhvZF9pZFwiXScsICQodGhpcy5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKSkucmVtb3ZlKCk7XG4gICAgICAgIHRoaXMuYWNoRmllbGRzKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucmVtb3ZlQWNoRmllbGRzKHRoaXMub3B0aW9ucyk7XG4gICAgICB9XG4gICAgICAkKHRoaXMub3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvcikucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgJCh0aGlzLm9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IgKyAnLicgKyBlbGVtZW50X2lkKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAkKHRoaXMub3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvciArICc6bm90KC5hY3RpdmUpIGlucHV0JykudmFsKCcnKTtcbiAgICAgIHRoaXMuY2FsY3VsYXRlRmVlcyh0aGlzLm9wdGlvbnMub3JpZ2luYWxfYW1vdW50LCBzdHJpcGVfcGF5bWVudF90eXBlKTtcbiAgICB9LCAvLyBzZXR1cFBheW1lbnRNZXRob2RcblxuICAgIHJlbW92ZUFjaEZpZWxkczogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgJCgnaW5wdXRbbmFtZT1cInB1YmxpY190b2tlblwiXScsICQob3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikpLnJlbW92ZSgpO1xuICAgICAgJCgnaW5wdXRbbmFtZT1cImFjY291bnRfaWRcIl0nLCAkKG9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpKS5yZW1vdmUoKTtcbiAgICAgICQoJ2lucHV0W25hbWU9XCJiYW5rVG9rZW5cIl0nLCAkKG9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpKS5yZW1vdmUoKTtcbiAgICAgICQob3B0aW9ucy5wbGFpZF9saW5rKS5odG1sKCc8YSBocmVmPVwiI1wiPlNpZ24gaW4gdG8geW91ciBiYW5rIGFjY291bnQ8L2E+Jyk7XG4gICAgICB0aGlzLmJ1dHRvbkRpc2FibGVkKG9wdGlvbnMsIGZhbHNlLCAnJywgJycsIHRydWUpOyAvLyBpZiB0aGUgYnV0dG9uIHdhcyBkaXNhYmxlZCwgcmUtZW5hYmxlIGl0XG4gICAgICBpZiAodHlwZW9mIHRoaXMubGlua0hhbmRsZXIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRoaXMubGlua0hhbmRsZXIuZGVzdHJveSgpO1xuICAgICAgfVxuICAgIH0sIC8vIHJlbW92ZUFjaEZpZWxkc1xuXG4gICAgY3JlZGl0Q2FyZEZpZWxkczogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuXG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG5cbiAgICAgIHZhciBzdHlsZSA9IHtcbiAgICAgICAgYmFzZToge1xuICAgICAgICAgIGljb25Db2xvcjogJyM2NjZFRTgnLFxuICAgICAgICAgIGxpbmVIZWlnaHQ6ICc0M3B4JyxcbiAgICAgICAgICBmb250V2VpZ2h0OiA0MDAsXG4gICAgICAgICAgZm9udEZhbWlseTogJ2ZmLW1ldGEtd2ViLXBybycsXG4gICAgICAgICAgZm9udFNpemU6ICcyNHB4JyxcbiAgICAgICAgICAvL2xpbmVIZWlnaHQ6ICczN3B4JyxcbiAgICAgICAgICAvL2ZvbnRTaXplOiAnMTZweCcsXG4gICAgICAgIH0sXG4gICAgICAgIGludmFsaWQ6IHtcbiAgICAgICAgICBjb2xvcjogJyMxYTE4MTgnLFxuICAgICAgICB9LFxuICAgICAgfTtcblxuICAgICAgLy8gQWRkIGFuIGluc3RhbmNlIG9mIHRoZSBjYXJkIFVJIGNvbXBvbmVudCBpbnRvIHRoZSBgY2FyZC1lbGVtZW50YCA8ZGl2PlxuICAgICAgLy9jYXJkLm1vdW50KCcjY2FyZC1lbGVtZW50Jyk7XG4gICAgICBpZiAoICQoJy5jcmVkaXQtY2FyZC1ncm91cCcpLmxlbmd0aCA9PT0gMCAmJiAkKCcucGF5bWVudC1tZXRob2QuY2hvb3NlLWNhcmQnKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhhdC5jYXJkTnVtYmVyRWxlbWVudCA9IHRoYXQuZWxlbWVudHMuY3JlYXRlKCdjYXJkTnVtYmVyJywge1xuICAgICAgICBzaG93SWNvbjogdHJ1ZSxcbiAgICAgICAgc3R5bGU6IHN0eWxlXG4gICAgICB9KTtcbiAgICAgIHRoYXQuY2FyZE51bWJlckVsZW1lbnQubW91bnQob3B0aW9ucy5jY19udW1fc2VsZWN0b3IpO1xuXG4gICAgICB0aGF0LmNhcmRFeHBpcnlFbGVtZW50ID0gdGhhdC5lbGVtZW50cy5jcmVhdGUoJ2NhcmRFeHBpcnknLCB7XG4gICAgICAgIHN0eWxlOiBzdHlsZVxuICAgICAgfSk7XG4gICAgICB0aGF0LmNhcmRFeHBpcnlFbGVtZW50Lm1vdW50KG9wdGlvbnMuY2NfZXhwX3NlbGVjdG9yKTtcblxuICAgICAgdGhhdC5jYXJkQ3ZjRWxlbWVudCA9IHRoYXQuZWxlbWVudHMuY3JlYXRlKCdjYXJkQ3ZjJywge1xuICAgICAgICBzdHlsZTogc3R5bGVcbiAgICAgIH0pO1xuICAgICAgdGhhdC5jYXJkQ3ZjRWxlbWVudC5tb3VudChvcHRpb25zLmNjX2N2Y19zZWxlY3Rvcik7XG5cbiAgICAgIC8vIHZhbGlkYXRlL2Vycm9yIGhhbmRsZSB0aGUgY2FyZCBmaWVsZHNcbiAgICAgIHRoYXQuY2FyZE51bWJlckVsZW1lbnQub24oJ2NoYW5nZScsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIHZhciBzdHJpcGVfcGF5bWVudF90eXBlID0gJ2NhcmQnO1xuICAgICAgICAvLyBTd2l0Y2ggcGF5bWVudCB0eXBlIGlmIGl0J3Mgb25lIHRoYXQgd2UgcmVjb2duaXplIGFzIGRpc3RpbmN0XG4gICAgICAgIGlmIChldmVudC5icmFuZCkge1xuICAgICAgICAgIGlmICggZXZlbnQuYnJhbmQgPT09ICdhbWV4JyApIHtcbiAgICAgICAgICAgIHN0cmlwZV9wYXltZW50X3R5cGUgPSAnYW1leCc7XG4gICAgICAgICAgfSAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICAvLyBlcnJvciBoYW5kbGluZ1xuICAgICAgICB0aGF0LnN0cmlwZUVycm9yRGlzcGxheShldmVudC5lcnJvciwgJChvcHRpb25zLmNjX251bV9zZWxlY3RvciwgZWxlbWVudCksIGVsZW1lbnQsIG9wdGlvbnMgKTtcbiAgICAgICAgLy8gaWYgaXQgY2hhbmdlZCwgcmVzZXQgdGhlIGJ1dHRvblxuICAgICAgICB0aGF0LmJ1dHRvblN0YXR1cyhvcHRpb25zLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIGZhbHNlKTtcbiAgICAgICAgdGhhdC5jYWxjdWxhdGVGZWVzKHRoYXQub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQsIHN0cmlwZV9wYXltZW50X3R5cGUpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoYXQuY2FyZEV4cGlyeUVsZW1lbnQub24oJ2NoYW5nZScsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIC8vIGVycm9yIGhhbmRsaW5nXG4gICAgICAgIHRoYXQuc3RyaXBlRXJyb3JEaXNwbGF5KGV2ZW50LmVycm9yLCAkKG9wdGlvbnMuY2NfZXhwX3NlbGVjdG9yLCBlbGVtZW50KSwgZWxlbWVudCwgb3B0aW9ucyApO1xuICAgICAgICAvLyBpZiBpdCBjaGFuZ2VkLCByZXNldCB0aGUgYnV0dG9uXG4gICAgICAgIHRoYXQuYnV0dG9uU3RhdHVzKG9wdGlvbnMsICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKSwgZmFsc2UpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoYXQuY2FyZEN2Y0VsZW1lbnQub24oJ2NoYW5nZScsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIC8vIGVycm9yIGhhbmRsaW5nXG4gICAgICAgIHRoYXQuc3RyaXBlRXJyb3JEaXNwbGF5KGV2ZW50LmVycm9yLCAkKG9wdGlvbnMuY2NfY3ZjX3NlbGVjdG9yLCBlbGVtZW50KSwgZWxlbWVudCwgb3B0aW9ucyApO1xuICAgICAgICAvLyBpZiBpdCBjaGFuZ2VkLCByZXNldCB0aGUgYnV0dG9uXG4gICAgICAgIHRoYXQuYnV0dG9uU3RhdHVzKG9wdGlvbnMsICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKSwgZmFsc2UpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIHRoaXMgaXMgdGhlIG1ldGhvZCB0byBjcmVhdGUgYSBzaW5nbGUgY2FyZCBmaWVsZCBhbmQgbW91bnQgaXRcbiAgICAgIC8qdmFyIGNhcmQgPSB0aGF0LmVsZW1lbnRzLmNyZWF0ZShcbiAgICAgICAgJ2NhcmQnLFxuICAgICAgICB7XG4gICAgICAgICAgaGlkZVBvc3RhbENvZGU6IHRydWVcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICAgIC8vIEFkZCBhbiBpbnN0YW5jZSBvZiB0aGUgY2FyZCBVSSBjb21wb25lbnQgaW50byB0aGUgYGNhcmQtZWxlbWVudGAgPGRpdj5cbiAgICAgIGNhcmQubW91bnQoJyNjYXJkLWVsZW1lbnQnKTsqL1xuXG4gICAgfSwgLy8gY3JlZGl0Q2FyZEZpZWxkc1xuXG4gICAgc2hvd1NwaW5uZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgJCh0aGlzLm9wdGlvbnMucGxhaWRfbGluaykuaGlkZSgpO1xuICAgICAgJCh0aGlzLm9wdGlvbnMucGxhaWRfbGluaykuYWZ0ZXIoJzxkaXYgY2xhc3M9XCJhLXNwaW5uZXJcIj48aW1nIHNyYz1cImh0dHBzOi8vd3d3Lm1pbm5wb3N0LmNvbS93cC1hZG1pbi9pbWFnZXMvc3Bpbm5lci5naWZcIiBzcmNzZXQ9XCJodHRwczovL3d3dy5taW5ucG9zdC5jb20vd3AtYWRtaW4vaW1hZ2VzL3NwaW5uZXIuZ2lmIDF4LCBodHRwczovL3d3dy5taW5ucG9zdC5jb20vd3AtYWRtaW4vaW1hZ2VzL3NwaW5uZXItMnguZ2lmIDJ4LFwiPjwvZGl2PicpO1xuICAgIH0sXG5cbiAgICBoaWRlU3Bpbm5lcjogZnVuY3Rpb24oKSB7XG4gICAgICAkKHRoaXMub3B0aW9ucy5wbGFpZF9saW5rKS5zaG93KCk7XG4gICAgICAkKCcuYS1zcGlubmVyJykuaGlkZSgpO1xuICAgIH0sXG5cbiAgICBhY2hGaWVsZHM6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciBiYW5rVG9rZW5GaWVsZE5hbWUgPSAnYmFua1Rva2VuJztcbiAgICAgIHZhciBiYW5rVG9rZW5GaWVsZCA9ICdpbnB1dFtuYW1lPVwiJyArIGJhbmtUb2tlbkZpZWxkTmFtZSArICdcIl0nO1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgLy8gdGhlIGJ1dHRvbiBzaG91bGQgbm90IGJlIGNsaWNrYWJsZSB1bnRpbCB0aGUgdXNlciBoYXMgc2lnbmVkIGluXG4gICAgICB0aGF0LmJ1dHRvbkRpc2FibGVkKG9wdGlvbnMsIHRydWUsICcnLCAnU2lnbiBpbiB0byB5b3VyIGJhbmsgYWNjb3VudCAoYWJvdmUpIGZpcnN0Jyk7XG5cbiAgICAgIGlmICh0eXBlb2YgUGxhaWQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRoYXQubGlua0hhbmRsZXIgPSBQbGFpZC5jcmVhdGUoe1xuICAgICAgICAgIGNsaWVudE5hbWU6ICdNaW5uUG9zdCcsXG4gICAgICAgICAgZW52OiBvcHRpb25zLnBsYWlkX2VudixcbiAgICAgICAgICBwcm9kdWN0OiBbJ2F1dGgnXSxcbiAgICAgICAgICAvLyAxLiBQYXNzIHRoZSB0b2tlbiBnZW5lcmF0ZWQgaW4gc3RlcCAyLlxuICAgICAgICAgIHRva2VuOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxhaWRfbGlua190b2tlbicpLnZhbHVlLFxuICAgICAgICAgIG9uU3VjY2VzczogZnVuY3Rpb24ocHVibGljX3Rva2VuLCBtZXRhZGF0YSkge1xuICAgICAgICAgICAgdGhhdC5zaG93U3Bpbm5lcigpO1xuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgdXJsOicvZ2V0X3BsYWlkX2FjY2Vzc190b2tlbi8nLFxuICAgICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7IHB1YmxpY190b2tlbjogcHVibGljX3Rva2VuLCBhY2NvdW50X2lkOiBtZXRhZGF0YS5hY2NvdW50X2lkIH0pLFxuICAgICAgICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZG9uZShmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICBpZiAodHlwZW9mIHJlc3BvbnNlLmVycm9yICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIC8vIHRoZXJlIGlzIGFuIGVycm9yLlxuICAgICAgICAgICAgICAgIHRoYXQuaGlkZVNwaW5uZXIoKTtcbiAgICAgICAgICAgICAgICAkKG9wdGlvbnMucGxhaWRfbGluaykuYmVmb3JlKCc8cCBjbGFzcz1cImEtZXJyb3IgYS12YWxpZGF0aW9uLWVycm9yXCI+JyArIHJlc3BvbnNlLmVycm9yICsgJzwvcD4nKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL3RoaXMuZGVidWcoJ3ByaW50IHJlc3BvbnNlIGhlcmUnKTtcbiAgICAgICAgICAgICAgICAvL3RoaXMuZGVidWcocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIC8vIGFkZCB0aGUgZmllbGQocykgd2UgbmVlZCB0byB0aGUgZm9ybSBmb3Igc3VibWl0dGluZ1xuICAgICAgICAgICAgICAgIGlmICgkKGJhbmtUb2tlbkZpZWxkKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAkKGJhbmtUb2tlbkZpZWxkKS52YWwocmVzcG9uc2Uuc3RyaXBlX2JhbmtfYWNjb3VudF90b2tlbik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICQob3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikucHJlcGVuZCgkKCc8aW5wdXQgdHlwZT1cXFwiaGlkZGVuXFxcIiBuYW1lPVwiJyArIGJhbmtUb2tlbkZpZWxkTmFtZSArICdcIj4nKS52YWwocmVzcG9uc2Uuc3RyaXBlX2JhbmtfYWNjb3VudF90b2tlbikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkKG9wdGlvbnMucGxhaWRfbGluaywgZWxlbWVudCkuaHRtbCgnPHN0cm9uZz5Zb3VyIGFjY291bnQgd2FzIHN1Y2Nlc3NmdWxseSBhdXRob3JpemVkPC9zdHJvbmc+Jyk7XG4gICAgICAgICAgICAgICAgdGhhdC5oaWRlU3Bpbm5lcigpO1xuICAgICAgICAgICAgICAgIHRoYXQuYnV0dG9uRGlzYWJsZWQob3B0aW9ucywgZmFsc2UpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgdGhhdC5kZWJ1ZyhyZXNwb25zZSk7XG4gICAgICAgICAgICAgIHRoYXQuaGlkZVNwaW5uZXIoKTtcbiAgICAgICAgICAgICAgJChvcHRpb25zLnBsYWlkX2xpbmspLmJlZm9yZSgnPHAgY2xhc3M9XCJhLWVycm9yIGEtdmFsaWRhdGlvbi1lcnJvclwiPicgKyByZXNwb25zZS5lcnJvciArICc8L3A+Jyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgICAgJChvcHRpb25zLnBsYWlkX2xpbmsgKyAnIGEnKS5jbGljayhmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgdGhhdC5yZXNldEZvcm1FcnJvcnModGhhdC5vcHRpb25zLCB0aGF0LmVsZW1lbnQpO1xuICAgICAgICAgIC8vJChvcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yICsgJyAuYS1lcnJvcicpLnJlbW92ZSgpOyAvLyByZW1vdmUgbWV0aG9kIGVycm9yIG1lc3NhZ2UgaWYgaXQgaXMgdGhlcmVcbiAgICAgICAgICB0aGF0LmxpbmtIYW5kbGVyLm9wZW4oKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSwgLy8gYWNoRmllbGRzXG5cbiAgICBidXR0b25TdGF0dXM6IGZ1bmN0aW9uKG9wdGlvbnMsIGJ1dHRvbiwgZGlzYWJsZWQpIHtcbiAgICAgIC8vIG1ha2UgdGhlIGJ1dHRvbiBjbGlja2FibGUgb3Igbm90XG4gICAgICB0aGlzLmJ1dHRvbkRpc2FibGVkKG9wdGlvbnMsIGRpc2FibGVkLCBidXR0b24pO1xuICAgICAgaWYgKGRpc2FibGVkID09PSBmYWxzZSkge1xuICAgICAgICBidXR0b24udGV4dChvcHRpb25zLmJ1dHRvbl90ZXh0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJ1dHRvbi50ZXh0KCdQcm9jZXNzaW5nJyk7XG4gICAgICB9XG4gICAgfSwgLy8gYnV0dG9uU3RhdHVzXG5cbiAgICBidXR0b25EaXNhYmxlZDogZnVuY3Rpb24ob3B0aW9ucywgZGlzYWJsZWQsIGJ1dHRvbiA9ICcnLCBtZXNzYWdlID0gJycsIGFjaF93YXNfaW5pdGlhbGl6ZWQgPSBmYWxzZSkge1xuICAgICAgaWYgKGJ1dHRvbiA9PT0gJycpIHtcbiAgICAgICAgYnV0dG9uID0gJChvcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKTtcbiAgICAgIH1cbiAgICAgIGJ1dHRvbi5wcm9wKCdkaXNhYmxlZCcsIGRpc2FibGVkKTtcbiAgICAgIGlmIChtZXNzYWdlICE9PSAnJykge1xuICAgICAgICBpZiAoZGlzYWJsZWQgPT09IHRydWUpIHtcbiAgICAgICAgICBidXR0b24uYXR0cignZGF0YS10bGl0ZScsIG1lc3NhZ2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJ1dHRvbi5yZW1vdmVBdHRyKCAnZGF0YS10bGl0ZScgKTsgLy8gdGhlcmUgc2hvdWxkIGJlIG5vIHRsaXRlIHZhbHVlIGlmIHRoZSBidXR0b24gaXMgZW5hYmxlZFxuICAgICAgICB9XG4gICAgICAgIGJ1dHRvbi5vbignbW91c2VlbnRlciBmb2N1cycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgdGxpdGUuc2hvdyggKCB0aGlzICksIHsgZ3JhdjogJ253JyB9ICk7XG4gICAgICAgIH0pO1xuICAgICAgICBidXR0b24ub24oJ21vdXNlbGVhdmUnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIHRsaXRlLmhpZGUoICggdGhpcyApICk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnV0dG9uLnJlbW92ZUF0dHIoICdkYXRhLXRsaXRlJyApO1xuICAgICAgICBpZiAoYWNoX3dhc19pbml0aWFsaXplZCA9PT0gdHJ1ZSApIHtcbiAgICAgICAgICBidXR0b24ub24oJ21vdXNlZW50ZXIgZm9jdXMnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgdGxpdGUuaGlkZSggKCB0aGlzICkgKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBidXR0b24uY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwgLy8gYnV0dG9uRGlzYWJsZWRcblxuICAgIHZhbGlkYXRlU2V0dXA6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciBmb3JtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwob3B0aW9ucy5mb3JtX3NlbGVjdG9yKTtcbiAgICAgIGZvcm1zLmZvckVhY2goIGZ1bmN0aW9uICggZm9ybSApIHtcbiAgICAgICAgVmFsaWRGb3JtKCBmb3JtLCB7XG4gICAgICAgICAgdmFsaWRhdGlvbkVycm9yUGFyZW50Q2xhc3M6ICdtLWhhcy12YWxpZGF0aW9uLWVycm9yJyxcbiAgICAgICAgICB2YWxpZGF0aW9uRXJyb3JDbGFzczogJ2EtdmFsaWRhdGlvbi1lcnJvcicsXG4gICAgICAgICAgaW52YWxpZENsYXNzOiAnYS1lcnJvcicsXG4gICAgICAgICAgZXJyb3JQbGFjZW1lbnQ6ICdhZnRlcidcbiAgICAgICAgfSApXG4gICAgICB9ICk7XG4gICAgICB0aGlzLnNjcm9sbFRvRm9ybUVycm9yKG9wdGlvbnMpO1xuICAgIH0sIC8vIHZhbGlkYXRlU2V0dXBcblxuICAgIHNjcm9sbFRvRm9ybUVycm9yOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICB2YXIgZm9ybSA9ICQoIG9wdGlvbnMuZm9ybV9zZWxlY3RvciApO1xuICAgICAgLy8gbGlzdGVuIGZvciBgaW52YWxpZGAgZXZlbnRzIG9uIGFsbCBmb3JtIGlucHV0c1xuICAgICAgZm9ybS5maW5kKCAnOmlucHV0JyApLm9uKCAnaW52YWxpZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgaW5wdXQgPSAkKCB0aGlzICk7XG4gICAgICAgICAgLy8gdGhlIGZpcnN0IGludmFsaWQgZWxlbWVudCBpbiB0aGUgZm9ybVxuICAgICAgICB2YXIgZmlyc3QgPSBmb3JtLmZpbmQoICcuYS1lcnJvcicgKS5maXJzdCgpO1xuICAgICAgICAvLyB0aGUgZm9ybSBpdGVtIHRoYXQgY29udGFpbnMgaXRcbiAgICAgICAgdmFyIGZpcnN0X2hvbGRlciA9IGZpcnN0LnBhcmVudCgpO1xuICAgICAgICAgIC8vIG9ubHkgaGFuZGxlIGlmIHRoaXMgaXMgdGhlIGZpcnN0IGludmFsaWQgaW5wdXRcbiAgICAgICAgICBpZiAoaW5wdXRbMF0gPT09IGZpcnN0WzBdKSB7XG4gICAgICAgICAgICAgIC8vIGhlaWdodCBvZiB0aGUgbmF2IGJhciBwbHVzIHNvbWUgcGFkZGluZyBpZiB0aGVyZSdzIGEgZml4ZWQgbmF2XG4gICAgICAgICAgICAgIC8vdmFyIG5hdmJhckhlaWdodCA9IG5hdmJhci5oZWlnaHQoKSArIDUwXG5cbiAgICAgICAgICAgICAgLy8gdGhlIHBvc2l0aW9uIHRvIHNjcm9sbCB0byAoYWNjb3VudGluZyBmb3IgdGhlIG5hdmJhciBpZiBpdCBleGlzdHMpXG4gICAgICAgICAgICAgIHZhciBlbGVtZW50T2Zmc2V0ID0gZmlyc3RfaG9sZGVyLm9mZnNldCgpLnRvcDtcblxuICAgICAgICAgICAgICAvLyB0aGUgY3VycmVudCBzY3JvbGwgcG9zaXRpb24gKGFjY291bnRpbmcgZm9yIHRoZSBuYXZiYXIpXG4gICAgICAgICAgICAgIHZhciBwYWdlT2Zmc2V0ID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xuXG4gICAgICAgICAgICAgIC8vIGRvbid0IHNjcm9sbCBpZiB0aGUgZWxlbWVudCBpcyBhbHJlYWR5IGluIHZpZXdcbiAgICAgICAgICAgICAgaWYgKCBlbGVtZW50T2Zmc2V0ID4gcGFnZU9mZnNldCAmJiBlbGVtZW50T2Zmc2V0IDwgcGFnZU9mZnNldCArIHdpbmRvdy5pbm5lckhlaWdodCApIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgLy8gbm90ZTogYXZvaWQgdXNpbmcgYW5pbWF0ZSwgYXMgaXQgcHJldmVudHMgdGhlIHZhbGlkYXRpb24gbWVzc2FnZSBkaXNwbGF5aW5nIGNvcnJlY3RseVxuICAgICAgICAgICAgICAkKCAnaHRtbCwgYm9keScgKS5zY3JvbGxUb3AoIGVsZW1lbnRPZmZzZXQgKTtcbiAgICAgICAgICB9XG4gICAgICB9ICk7XG4gICAgfSwgLy8gc2Nyb2xsVG9Gb3JtRXJyb3JcblxuICAgIGZvcm1TZXR1cDogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuXG4gICAgICAkKG9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLnN1Ym1pdChmdW5jdGlvbihldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGF0LmZvcm1Qcm9jZXNzb3IodGhhdCwgJ3N1Ym1pdCcpO1xuXG4gICAgICB9KTtcbiAgICB9LCAvLyBmb3JtU2V0dXBcblxuICAgIGZvcm1Qcm9jZXNzb3I6IGZ1bmN0aW9uKHRoYXQsIHR5cGUpIHtcblxuICAgICAgLy8gMS4gcmVtb3ZlIHByZXZpb3VzIGVycm9ycyBhbmQgcmVzZXQgdGhlIGJ1dHRvblxuICAgICAgdGhhdC5yZXNldEZvcm1FcnJvcnModGhhdC5vcHRpb25zLCB0aGF0LmVsZW1lbnQpO1xuXG4gICAgICAvLyAyLiBzZXQgdXAgdGhlIGJ1dHRvbiBpZiBpdCdzIGEgZm9ybSBzdWJtaXRcbiAgICAgIGlmICh0eXBlID09PSAnc3VibWl0Jykge1xuICAgICAgICB0aGF0LmJ1dHRvblN0YXR1cyh0aGF0Lm9wdGlvbnMsICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKSwgdHJ1ZSk7XG4gICAgICB9XG5cbiAgICAgIC8vIDMuIGdlbmVyYXRlIGJpbGxpbmcgYWRkcmVzcyBkZXRhaWxzXG4gICAgICB2YXIgYmlsbGluZ0RldGFpbHMgPSB0aGF0LmdlbmVyYXRlQmlsbGluZ0RldGFpbHMoKTtcblxuICAgICAgLy8gNC4gY3JlYXRlIG1pbm5wb3N0IHVzZXIgYWNjb3VudFxuICAgICAgdGhhdC5jcmVhdGVNaW5uUG9zdEFjY291bnQodGhhdC5vcHRpb25zLCB0aGF0LmVsZW1lbnQpO1xuXG4gICAgICAvLyA1LiBkbyB0aGUgY2hhcmdpbmcgb2YgY2FyZCBvciBiYW5rIGFjY291bnQgaWYgaXQncyBhIGZvcm0gc3VibWl0XG4gICAgICAvLyBvciBzdWJtaXQgdGhlIGZvcm0gaWYgdGhpcyBpcyBhIHBheW1lbnQgcmVxdWVzdCBidXR0b25cbiAgICAgIGlmICh0eXBlID09PSAnc3VibWl0Jykge1xuICAgICAgICB2YXIgcGF5bWVudF90eXBlID0gJCgnaW5wdXRbbmFtZT1cInN0cmlwZV9wYXltZW50X3R5cGVcIl0nKS52YWwoKTtcbiAgICAgICAgaWYgKHBheW1lbnRfdHlwZSAhPT0gJ2JhbmtfYWNjb3VudCcpIHtcbiAgICAgICAgICAvLyBmaW5hbGx5LCBnZXQgYSBwYXltZW50IG1ldGhvZCBmcm9tIHN0cmlwZSwgYW5kIHRyeSB0byBjaGFyZ2UgaXQgaWYgaXQgaXMgbm90IGFjaFxuICAgICAgICAgIHRoYXQuY3JlYXRlUGF5bWVudE1ldGhvZCh0aGF0LmNhcmROdW1iZXJFbGVtZW50LCBiaWxsaW5nRGV0YWlscyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gaWYgaXQgaXMgYWNoLCB3ZSBhbHJlYWR5IGhhdmUgYSB0b2tlbiBzbyBzdWJtaXQgdGhlIGZvcm1cbiAgICAgICAgICAvLyB0b2RvOiB1cGdyYWRlIHRoZSBwbGFpZCBpbnRlZ3JhdGlvblxuICAgICAgICAgIHRoYXQuYmFua1Rva2VuSGFuZGxlciggJCgnaW5wdXRbbmFtZT1cImJhbmtUb2tlblwiXScpLnZhbCgpLCAnYmFua19hY2NvdW50JyApO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGF0LnN1Ym1pdEZvcm1Pbmx5KCk7XG4gICAgICB9XG4gICAgfSwgLy8gZm9ybVByb2Nlc3NvclxuXG4gICAgc3RyaXBlRXJyb3JEaXNwbGF5OiBmdW5jdGlvbihlcnJvciwgdGhpc19zZWxlY3RvciwgZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgLy8gbGlzdGVuIGZvciBlcnJvcnMgYW5kIGRpc3BsYXkvaGlkZSBlcnJvciBtZXNzYWdlc1xuICAgICAgdmFyIHdoaWNoX2Vycm9yID0gdGhpc19zZWxlY3Rvci5hdHRyKCdpZCcpO1xuICAgICAgLy8gd2hlbiB0aGlzIGZpZWxkIGNoYW5nZXMsIHJlc2V0IGl0cyBlcnJvcnNcbiAgICAgICQoJy5hLWNhcmQtaW5zdHJ1Y3Rpb24uJyArIHdoaWNoX2Vycm9yKS5yZW1vdmVDbGFzcygnYS12YWxpZGF0aW9uLWVycm9yJyk7XG4gICAgICAkKCcuYS1jYXJkLWluc3RydWN0aW9uLicgKyB3aGljaF9lcnJvcikuZW1wdHkoKTtcbiAgICAgICQodGhpc19zZWxlY3RvcikucmVtb3ZlQ2xhc3MoJ2EtZXJyb3InKTtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICBpZiAoJCgnLmEtY2FyZC1pbnN0cnVjdGlvbi4nICsgd2hpY2hfZXJyb3IpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAkKCcuYS1jYXJkLWluc3RydWN0aW9uLicgKyB3aGljaF9lcnJvcikudGV4dChlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzX3NlbGVjdG9yLnBhcmVudCgpLmFwcGVuZCgnPHAgY2xhc3M9XCJhLWNhcmQtaW5zdHJ1Y3Rpb24gJyArIHdoaWNoX2Vycm9yICsgJ1wiPicgKyBlcnJvci5tZXNzYWdlICsgJzwvcD4nKTtcbiAgICAgICAgfVxuICAgICAgICAkKCcuYS1jYXJkLWluc3RydWN0aW9uLicgKyB3aGljaF9lcnJvcikuYWRkQ2xhc3MoJ2EtdmFsaWRhdGlvbi1lcnJvcicpO1xuICAgICAgICB0aGlzX3NlbGVjdG9yLnBhcmVudCgpLmFkZENsYXNzKCdtLWhhcy12YWxpZGF0aW9uLWVycm9yJyk7XG4gICAgICAgICQodGhpc19zZWxlY3RvcikuYWRkQ2xhc3MoJ2EtZXJyb3InKTtcbiAgICAgICAgaWYgKHRoaXNfc2VsZWN0b3IucGFyZW50KCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICAgIHNjcm9sbFRvcDogdGhpc19zZWxlY3Rvci5wYXJlbnQoKS5vZmZzZXQoKS50b3BcbiAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJCh0aGlzX3NlbGVjdG9yKS5yZW1vdmVDbGFzcygnYS1lcnJvcicpO1xuICAgICAgICAkKCcuYS1jYXJkLWluc3RydWN0aW9uLicgKyB3aGljaF9lcnJvcikucmVtb3ZlQ2xhc3MoJ2EtdmFsaWRhdGlvbi1lcnJvcicpO1xuICAgICAgICAkKCcuYS1jYXJkLWluc3RydWN0aW9uLicgKyB3aGljaF9lcnJvcikuZW1wdHkoKTtcbiAgICAgICAgJChvcHRpb25zLmNjX251bV9zZWxlY3RvciwgZWxlbWVudCkucmVtb3ZlQ2xhc3MoJ2EtdmFsaWRhdGlvbi1lcnJvcicpO1xuICAgICAgICAkKG9wdGlvbnMuY2NfZXhwX3NlbGVjdG9yLCBlbGVtZW50KS5yZW1vdmVDbGFzcygnYS12YWxpZGF0aW9uLWVycm9yJyk7XG4gICAgICAgICQob3B0aW9ucy5jY19jdmNfc2VsZWN0b3IsIGVsZW1lbnQpLnJlbW92ZUNsYXNzKCdhLXZhbGlkYXRpb24tZXJyb3InKTtcbiAgICAgICAgJChvcHRpb25zLmNjX251bV9zZWxlY3RvciwgZWxlbWVudCkucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ20taGFzLXZhbGlkYXRpb24tZXJyb3InKTtcbiAgICAgICAgJChvcHRpb25zLmNjX2V4cF9zZWxlY3RvciwgZWxlbWVudCkucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ20taGFzLXZhbGlkYXRpb24tZXJyb3InKTtcbiAgICAgICAgJChvcHRpb25zLmNjX2N2Y19zZWxlY3RvciwgZWxlbWVudCkucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ20taGFzLXZhbGlkYXRpb24tZXJyb3InKTtcbiAgICAgIH1cbiAgICB9LCAvLyBzdHJpcGVFcnJvckRpc3BsYXlcblxuICAgIHJlc2V0Rm9ybUVycm9yczogZnVuY3Rpb24ob3B0aW9ucywgZWxlbWVudCkge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgJCgnLmEtdmFsaWRhdGlvbi1lcnJvcicpLnJlbW92ZSgpO1xuICAgICAgJCgnaW5wdXQsIGxhYmVsLCBkaXYnLCBlbGVtZW50KS5yZW1vdmVDbGFzcygnYS1lcnJvcicpO1xuICAgICAgJCgnbGFiZWwnLCBlbGVtZW50KS5yZW1vdmVDbGFzcygnbS1oYXMtdmFsaWRhdGlvbi1lcnJvcicpO1xuICAgICAgJChvcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yLCBlbGVtZW50KS5yZW1vdmVDbGFzcygnYS1lcnJvciBpbnZhbGlkJyk7XG4gICAgICAkKCcuYS12YWxpZGF0aW9uLWVycm9yJykucmVtb3ZlKCk7XG4gICAgICBcbiAgICAgICQob3B0aW9ucy5jaG9vc2VfcGF5bWVudCArICcgaW5wdXQnKS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgICQob3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvciArICcgLmEtZXJyb3InKS5yZW1vdmUoKTsgLy8gcmVtb3ZlIG1ldGhvZCBlcnJvciBtZXNzYWdlIGlmIGl0IGlzIHRoZXJlXG4gICAgICAgICQob3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvcikucGFyZW50KCkuZmluZCgnLmEtdmFsaWRhdGlvbi1lcnJvcicpLnJlbW92ZSgpO1xuICAgICAgICAvLyBpZiBhIHBheW1lbnQgZmllbGQgY2hhbmdlZCwgcmVzZXQgdGhlIGJ1dHRvblxuICAgICAgICB0aGF0LmJ1dHRvblN0YXR1cyhvcHRpb25zLCAkKG9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLmZpbmQoJ2J1dHRvbicpLCBmYWxzZSk7XG4gICAgICB9KTtcbiAgICB9LCAvLyByZXNldEZvcm1FcnJvcnNcbiAgICBcbiAgICBjcmVhdGVNaW5uUG9zdEFjY291bnQ6IGZ1bmN0aW9uKG9wdGlvbnMsIGVsZW1lbnQpIHtcbiAgICAgIC8vIDIuIGNyZWF0ZSBtaW5ucG9zdCBhY2NvdW50IGlmIHNwZWNpZmllZFxuICAgICAgaWYgKG9wdGlvbnMuY3JlYXRlX2FjY291bnQgPT09IHRydWUpIHtcbiAgICAgICAgdmFyIHVzZXIgPSB7XG4gICAgICAgICAgZW1haWw6ICQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgZmlyc3RfbmFtZTogJChvcHRpb25zLmZpcnN0X25hbWVfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgIGxhc3RfbmFtZTogJChvcHRpb25zLmxhc3RfbmFtZV9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgcGFzc3dvcmQ6ICQob3B0aW9ucy5wYXNzd29yZF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgY2l0eTogJChvcHRpb25zLmJpbGxpbmdfY2l0eV9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgc3RhdGU6ICQob3B0aW9ucy5iaWxsaW5nX3N0YXRlX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICB6aXA6ICQob3B0aW9ucy5iaWxsaW5nX3ppcF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgIH07XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgdXJsOiBvcHRpb25zLm1pbm5wb3N0X3Jvb3QgKyAnL3dwLWpzb24vdXNlci1hY2NvdW50LW1hbmFnZW1lbnQvdjEvY3JlYXRlLXVzZXInLFxuICAgICAgICAgIGRhdGE6IHVzZXJcbiAgICAgICAgfSkuZG9uZShmdW5jdGlvbiggZGF0YSApIHtcbiAgICAgICAgICBpZiAoZGF0YS5zdGF0dXMgPT09ICdzdWNjZXNzJyAmJiBkYXRhLnJlYXNvbiA9PT0gJ25ldyB1c2VyJykge1xuICAgICAgICAgICAgLy8gdXNlciBjcmVhdGVkIC0gdGhleSBzaG91bGQgcmVjZWl2ZSBlbWFpbFxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSwgLy8gY3JlYXRlTWlublBvc3RBY2NvdW50XG4gICAgXG4gICAgZ2VuZXJhdGVCaWxsaW5nRGV0YWlsczogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgYmlsbGluZ0RldGFpbHMgPSB7fTtcbiAgICAgIHZhciBhZGRyZXNzRGV0YWlscyA9IHt9O1xuXG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IpLnZhbCgpICE9ICcnKSB7XG4gICAgICAgIGJpbGxpbmdEZXRhaWxzLmVtYWlsID0gJCh0aGlzLm9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IpLnZhbCgpO1xuICAgICAgfVxuICAgICAgXG4gICAgICB2YXIgZnVsbF9uYW1lID0gJyc7XG4gICAgICBpZiAoJCgnI2Z1bGxfbmFtZScpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZnVsbF9uYW1lID0gJCgnI2Z1bGxfbmFtZScpLnZhbCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZnVsbF9uYW1lID0gJCh0aGlzLm9wdGlvbnMuZmlyc3RfbmFtZV9maWVsZF9zZWxlY3RvcikudmFsKCkgKyAnICcgKyAkKHRoaXMub3B0aW9ucy5sYXN0X25hbWVfZmllbGRfc2VsZWN0b3IpLnZhbCgpO1xuICAgICAgfVxuICAgICAgYmlsbGluZ0RldGFpbHMubmFtZSA9IGZ1bGxfbmFtZTtcblxuICAgICAgdmFyIHN0cmVldCA9ICdOb25lJztcbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5iaWxsaW5nX3N0cmVldF9maWVsZF9zZWxlY3RvcikudmFsKCkgIT0gJycpIHtcbiAgICAgICAgc3RyZWV0ID0gJCh0aGlzLm9wdGlvbnMuYmlsbGluZ19zdHJlZXRfZmllbGRfc2VsZWN0b3IpLnZhbCgpO1xuICAgICAgICBhZGRyZXNzRGV0YWlscy5saW5lMSA9IHN0cmVldDtcbiAgICAgIH1cblxuICAgICAgdmFyIGNpdHkgPSAnTm9uZSc7XG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuYmlsbGluZ19jaXR5X2ZpZWxkX3NlbGVjdG9yKS52YWwoKSAhPSAnJykge1xuICAgICAgICBjaXR5ID0gJCh0aGlzLm9wdGlvbnMuYmlsbGluZ19jaXR5X2ZpZWxkX3NlbGVjdG9yKS52YWwoKTtcbiAgICAgICAgYWRkcmVzc0RldGFpbHMuY2l0eSA9IGNpdHk7XG4gICAgICB9XG5cbiAgICAgIHZhciBzdGF0ZSA9ICdOb25lJztcbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5iaWxsaW5nX3N0YXRlX2ZpZWxkX3NlbGVjdG9yKS52YWwoKSAhPSAnJykge1xuICAgICAgICBzdGF0ZSA9ICQodGhpcy5vcHRpb25zLmJpbGxpbmdfc3RhdGVfZmllbGRfc2VsZWN0b3IpLnZhbCgpO1xuICAgICAgICBhZGRyZXNzRGV0YWlscy5zdGF0ZSA9IHN0YXRlO1xuICAgICAgfVxuXG4gICAgICB2YXIgemlwID0gJ05vbmUnO1xuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmJpbGxpbmdfemlwX2ZpZWxkX3NlbGVjdG9yKS52YWwoKSAhPSAnJykge1xuICAgICAgICB6aXAgPSAkKHRoaXMub3B0aW9ucy5iaWxsaW5nX3ppcF9maWVsZF9zZWxlY3RvcikudmFsKCk7XG4gICAgICAgIGFkZHJlc3NEZXRhaWxzLnBvc3RhbF9jb2RlID0gemlwO1xuICAgICAgfVxuXG4gICAgICB2YXIgY291bnRyeSA9ICdVUyc7XG4gICAgICB2YXIgY291bnRyeV9maWVsZF92YWx1ZSA9ICQodGhpcy5vcHRpb25zLmJpbGxpbmdfY291bnRyeV9maWVsZF9zZWxlY3RvcikudmFsKCk7XG4gICAgICBpZiAoY291bnRyeV9maWVsZF92YWx1ZSAhPSAnJyAmJiBjb3VudHJ5X2ZpZWxkX3ZhbHVlICE9ICdVbml0ZWQgU3RhdGVzJykge1xuICAgICAgICBjb3VudHJ5ID0gY291bnRyeV9maWVsZF92YWx1ZTtcbiAgICAgIH1cbiAgICAgIGFkZHJlc3NEZXRhaWxzLmNvdW50cnkgPSBjb3VudHJ5O1xuXG4gICAgICBpZiAoc3RyZWV0ICE9PSAnTm9uZScgfHwgY2l0eSAhPT0gJ05vbmUnIHx8IHN0YXRlICE9PSAnTm9uZScgfHwgemlwICE9PSAnTm9uZScpIHtcbiAgICAgICAgYmlsbGluZ0RldGFpbHMuYWRkcmVzcyA9IGFkZHJlc3NEZXRhaWxzO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gYmlsbGluZ0RldGFpbHM7XG4gICAgfSwgLy8gZ2VuZXJhdGVCaWxsaW5nRGV0YWlsc1xuXG4gICAgY3JlYXRlUGF5bWVudE1ldGhvZDogZnVuY3Rpb24oY2FyZEVsZW1lbnQsIGJpbGxpbmdEZXRhaWxzKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB0aGF0LnN0cmlwZS5jcmVhdGVQYXltZW50TWV0aG9kKHtcbiAgICAgICAgdHlwZTogJ2NhcmQnLFxuICAgICAgICBjYXJkOiBjYXJkRWxlbWVudCxcbiAgICAgICAgYmlsbGluZ19kZXRhaWxzOiBiaWxsaW5nRGV0YWlsc1xuICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICBpZiAocmVzcG9uc2UuZXJyb3IpIHtcbiAgICAgICAgICB0aGF0LmhhbmRsZVNlcnZlckVycm9yKHJlc3BvbnNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBTZW5kIHBheW1lbnRNZXRob2QuaWQgdG8gc2VydmVyXG4gICAgICAgICAgdmFyIHN1cHBvcnRmb3JtID0gJCh0aGF0Lm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpO1xuICAgICAgICAgIHZhciBhamF4X3VybCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcbiAgICAgICAgICB2YXIgdG9rZW5GaWVsZE5hbWUgPSAncGF5bWVudF9tZXRob2RfaWQnO1xuICAgICAgICAgIHZhciB0b2tlbkZpZWxkID0gJ2lucHV0W25hbWU9XCInICsgdG9rZW5GaWVsZE5hbWUgKyAnXCJdJztcblxuICAgICAgICAgIC8vIEluc2VydCB0aGUgcGF5bWVudCBtZXRob2QgSUQgaW50byB0aGUgZm9ybSBzbyBpdCBnZXRzIHN1Ym1pdHRlZCB0byB0aGUgc2VydmVyXG4gICAgICAgICAgaWYgKCQodG9rZW5GaWVsZCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgJCh0b2tlbkZpZWxkKS52YWwocmVzcG9uc2UucGF5bWVudE1ldGhvZC5pZCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN1cHBvcnRmb3JtLmFwcGVuZCgkKCc8aW5wdXQgdHlwZT1cXFwiaGlkZGVuXFxcIiBuYW1lPVwiJyArIHRva2VuRmllbGROYW1lICsgJ1wiPicpLnZhbChyZXNwb25zZS5wYXltZW50TWV0aG9kLmlkKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZmV0Y2goYWpheF91cmwsIHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBib2R5OiAkKHN1cHBvcnRmb3JtKS5zZXJpYWxpemUoKVxuICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIC8vIEhhbmRsZSBzZXJ2ZXIgcmVzcG9uc2UgKHNlZSBTdGVwIDMpXG4gICAgICAgICAgICByZXNwb25zZS5qc29uKCkudGhlbihmdW5jdGlvbihqc29uKSB7XG4gICAgICAgICAgICAgIHRoYXQuaGFuZGxlU2VydmVyUmVzcG9uc2UoanNvbik7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LCAvLyBjcmVhdGVQYXltZW50TWV0aG9kXG5cbiAgICBiYW5rVG9rZW5IYW5kbGVyOiBmdW5jdGlvbih0b2tlbiwgdHlwZSkge1xuICAgICAgdGhpcy5zZXRTdHJpcGVQYXltZW50VHlwZSh0eXBlKTtcbiAgICAgIHRoaXMuc3VibWl0Rm9ybU9ubHkoKTtcbiAgICB9LCAvLyBiYW5rVG9rZW5IYW5kbGVyXG5cbiAgICBzdWJtaXRGb3JtT25seTogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB2YXIgc3VwcG9ydGZvcm0gPSAkKHRoaXMub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3Rvcik7XG4gICAgICB2YXIgYWpheF91cmwgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG5cbiAgICAgIC8vIFN1Ym1pdCB0aGUgZm9ybVxuICAgICAgLy8gdGhlIHdheSBpdCB3b3JrcyBjdXJyZW50bHkgaXMgdGhlIGZvcm0gc3VibWl0cyBhbiBhamF4IHJlcXVlc3QgdG8gaXRzZWxmXG4gICAgICAvLyB0aGVuIGl0IHN1Ym1pdHMgYSBwb3N0IHJlcXVlc3QgdG8gdGhlIGZvcm0ncyBhY3Rpb24gdXJsXG4gICAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IGFqYXhfdXJsLFxuICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgIGRhdGE6ICQoc3VwcG9ydGZvcm0pLnNlcmlhbGl6ZSgpLFxuICAgICAgICB0eXBlOiAnUE9TVCdcbiAgICAgIH0pXG4gICAgICAuZG9uZShmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICBpZiAodHlwZW9mIHJlc3BvbnNlLmVycm9ycyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICB0aGF0LmhhbmRsZVNlcnZlckVycm9yKHJlc3BvbnNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdXBwb3J0Zm9ybS5nZXQoMCkuc3VibWl0KCk7IC8vIGNvbnRpbnVlIHN1Ym1pdHRpbmcgdGhlIGZvcm0gaWYgdGhlIGFqYXggd2FzIHN1Y2Nlc3NmdWxcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5mYWlsKGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGF0LmJ1dHRvblN0YXR1cyh0aGF0Lm9wdGlvbnMsICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKSwgZmFsc2UpO1xuICAgICAgfSk7XG4gICAgfSwgLy8gc3VibWl0Rm9ybU9ubHlcblxuICAgIGhhbmRsZVNlcnZlclJlc3BvbnNlOiBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgdmFyIHN1cHBvcnRmb3JtID0gJCh0aGlzLm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpO1xuICAgICAgaWYgKHJlc3BvbnNlLmVycm9ycykge1xuICAgICAgICAvLyBTaG93IGVycm9yIGZyb20gc2VydmVyIG9uIHBheW1lbnQgZm9ybVxuICAgICAgICB0aGlzLmhhbmRsZVNlcnZlckVycm9yKHJlc3BvbnNlKTtcbiAgICAgIH0gZWxzZSBpZiAocmVzcG9uc2UucmVxdWlyZXNfYWN0aW9uKSB7XG4gICAgICAgIC8vIFVzZSBTdHJpcGUuanMgdG8gaGFuZGxlIHJlcXVpcmVkIGNhcmQgYWN0aW9uXG4gICAgICAgIC8vaGFuZGxlQWN0aW9uKHJlc3BvbnNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN1cHBvcnRmb3JtLmdldCgwKS5zdWJtaXQoKTsgLy8gY29udGludWUgc3VibWl0dGluZyB0aGUgZm9ybSBpZiB0aGUgYWpheCB3YXMgc3VjY2Vzc2Z1bFxuICAgICAgfVxuICAgIH0sIC8vIGhhbmRsZVNlcnZlclJlc3BvbnNlXG5cbiAgICBoYW5kbGVTZXJ2ZXJFcnJvcjogZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHZhciB0aGlzX2ZpZWxkID0gJyc7XG4gICAgICAvLyBkbyBub3Qgc3VibWl0LiB0aGVyZSBpcyBhbiBlcnJvci5cbiAgICAgIHRoYXQuYnV0dG9uU3RhdHVzKHRoYXQub3B0aW9ucywgJCh0aGF0Lm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLmZpbmQoJ2J1dHRvbicpLCBmYWxzZSk7XG4gICAgICAvLyBoYW5kbGUgZXJyb3IgZGlzcGxheVxuICAgICAgaWYgKHR5cGVvZiByZXNwb25zZS5lcnJvcnMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVzcG9uc2UuZXJyb3JzWzBdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIHRoaXNfZmllbGQgPSByZXNwb25zZS5lcnJvcnNbMF0uZmllbGQgKyAnX2ZpZWxkX3NlbGVjdG9yJztcbiAgICAgICAgfVxuICAgICAgICAkLmVhY2gocmVzcG9uc2UuZXJyb3JzLCBmdW5jdGlvbiggaW5kZXgsIGVycm9yICkge1xuICAgICAgICAgIGlmICh0eXBlb2YgZXJyb3IuZmllbGQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB0aGlzX2ZpZWxkID0gZXJyb3IuZmllbGQgKyAnX2ZpZWxkX3NlbGVjdG9yJztcbiAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBlcnJvci5wYXJhbSAhPT0gJ3VuZGVmaW5lZCcgJiYgZXJyb3IucGFyYW0gIT09ICcnKSB7XG4gICAgICAgICAgICB0aGlzX2ZpZWxkID0gJ2NjXycgKyBlcnJvci5wYXJhbSArICdfc2VsZWN0b3InOyAgXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoYXQuZGlzcGxheUVycm9yTWVzc2FnZShlcnJvciwgdGhpc19maWVsZCk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcmVzcG9uc2UuZXJyb3IgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHZhciBlcnJvciA9IHJlc3BvbnNlLmVycm9yO1xuICAgICAgICBpZiAodHlwZW9mIGVycm9yLmZpZWxkICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIHRoaXNfZmllbGQgPSBlcnJvci5maWVsZCArICdfZmllbGRfc2VsZWN0b3InO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBlcnJvci5wYXJhbSAhPT0gJ3VuZGVmaW5lZCcgJiYgZXJyb3IucGFyYW0gIT09ICcnKSB7XG4gICAgICAgICAgdGhpc19maWVsZCA9ICdjY18nICsgZXJyb3IucGFyYW0gKyAnX3NlbGVjdG9yJzsgIFxuICAgICAgICB9XG4gICAgICAgIHRoYXQuZGlzcGxheUVycm9yTWVzc2FnZShlcnJvciwgdGhpc19maWVsZCk7XG4gICAgICB9XG4gICAgICBpZiAoJCh0aGF0Lm9wdGlvbnNbdGhpc19maWVsZF0pLmxlbmd0aCA+IDApIHtcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgIHNjcm9sbFRvcDogJCh0aGF0Lm9wdGlvbnNbdGhpc19maWVsZF0pLnBhcmVudCgpLm9mZnNldCgpLnRvcFxuICAgICAgICB9LCAyMDAwKTtcbiAgICAgIH1cbiAgICB9LCAvLyBoYW5kbGVTZXJ2ZXJFcnJvclxuXG4gICAgZGlzcGxheUVycm9yTWVzc2FnZShlcnJvciwgZmllbGQpIHtcbiAgICAgIHZhciBtZXNzYWdlID0gJyc7XG4gICAgICB2YXIgc3RyaXBlRXJyb3JTZWxlY3RvciA9ICcnO1xuICAgICAgdmFyIGZpZWxkUGFyZW50ID0gJCh0aGlzLm9wdGlvbnNbZmllbGRdKS5wYXJlbnQoKTtcbiAgICAgIGlmICh0eXBlb2YgZXJyb3IubWVzc2FnZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgbWVzc2FnZSA9IGVycm9yLm1lc3NhZ2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtZXNzYWdlID0gZXJyb3IubWVzc2FnZVswXTtcbiAgICAgIH1cbiAgICAgIGlmICgkKHRoaXMub3B0aW9uc1tmaWVsZF0pLmxlbmd0aCA+IDApIHtcbiAgICAgICAgJCh0aGlzLm9wdGlvbnNbZmllbGRdKS5hZGRDbGFzcygnYS1lcnJvcicpO1xuICAgICAgICAkKHRoaXMub3B0aW9uc1tmaWVsZF0pLnByZXYoKS5hZGRDbGFzcygnYS1lcnJvcicpO1xuICAgICAgICBpZiAoJCgnLmEtY2FyZC1pbnN0cnVjdGlvbicsIGZpZWxkUGFyZW50KS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgJCgnLmEtY2FyZC1pbnN0cnVjdGlvbicsIGZpZWxkUGFyZW50KS5hZGRDbGFzcygnYS12YWxpZGF0aW9uLWVycm9yJyk7XG4gICAgICAgICAgJCgnLmEtY2FyZC1pbnN0cnVjdGlvbicsIGZpZWxkUGFyZW50KS50ZXh0KG1lc3NhZ2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICQodGhpcy5vcHRpb25zW2ZpZWxkXSkuYWZ0ZXIoJzxwIGNsYXNzPVwiYS1jYXJkLWluc3RydWN0aW9uIGEtdmFsaWRhdGlvbi1lcnJvclwiPicgKyBtZXNzYWdlICsgJzwvcD4nKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZXJyb3IgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRoaXMuYnV0dG9uU3RhdHVzKHRoaXMub3B0aW9ucywgJCh0aGlzLm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLmZpbmQoJ2J1dHRvbicpLCBmYWxzZSk7XG4gICAgICAgIGlmIChlcnJvci5jb2RlID09PSAnaW5jb21wbGV0ZV9udW1iZXInIHx8IGVycm9yLmNvZGUgPT0gJ2ludmFsaWRfbnVtYmVyJyB8fCBlcnJvci5jb2RlID09ICdpbmNvcnJlY3RfbnVtYmVyJyB8fCBlcnJvci5jb2RlID09ICdjYXJkX2RlY2xpbmVkJyB8fCBlcnJvci5jb2RlID09ICdwcm9jZXNzaW5nX2Vycm9yJykge1xuICAgICAgICAgIC8vIGVycm9yIGhhbmRsaW5nXG4gICAgICAgICAgc3RyaXBlRXJyb3JTZWxlY3RvciA9ICQodGhpcy5vcHRpb25zLmNjX251bV9zZWxlY3Rvcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9yLmNvZGUgPT0gJ2ludmFsaWRfZXhwaXJ5X21vbnRoJyB8fCBlcnJvci5jb2RlID09ICdpbnZhbGlkX2V4cGlyeV95ZWFyJyB8fCBlcnJvci5jb2RlID09ICdleHBpcmVkX2NhcmQnKSB7XG4gICAgICAgICAgLy8gZXJyb3IgaGFuZGxpbmdcbiAgICAgICAgICBzdHJpcGVFcnJvclNlbGVjdG9yID0gJCh0aGlzLm9wdGlvbnMuY2NfZXhwX3NlbGVjdG9yKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXJyb3IuY29kZSA9PSAnaW52YWxpZF9jdmMnIHx8IGVycm9yLmNvZGUgPT0gJ2luY29ycmVjdF9jdmMnKSB7XG4gICAgICAgICAgLy8gZXJyb3IgaGFuZGxpbmdcbiAgICAgICAgICBzdHJpcGVFcnJvclNlbGVjdG9yID0gJCh0aGlzLm9wdGlvbnMuY2NfY3ZjX3NlbGVjdG9yKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXJyb3IuY29kZSA9PSAnZW1haWxfaW52YWxpZCcpIHtcbiAgICAgICAgICAvLyBlcnJvciBoYW5kbGluZ1xuICAgICAgICAgIHN0cmlwZUVycm9yU2VsZWN0b3IgPSAkKHRoaXMub3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3Rvcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN0cmlwZUVycm9yU2VsZWN0b3IgIT09ICcnKSB7XG4gICAgICAgICAgdGhpcy5zdHJpcGVFcnJvckRpc3BsYXkoZXJyb3IsIHN0cmlwZUVycm9yU2VsZWN0b3IsIHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9yLnR5cGUgPT0gJ21pc3NpbmdfcGF5bWVudCcgJiYgc3RyaXBlRXJyb3JTZWxlY3RvciA9PT0gJycpIHtcbiAgICAgICAgICAkKHRoaXMub3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvciArICcuYWN0aXZlJykuYXBwZW5kKCc8cCBjbGFzcz1cImEtZm9ybS1jYXB0aW9uIGEtdmFsaWRhdGlvbi1lcnJvciBhLW1pc3NpbmctcGF5bWVudC1lcnJvclwiPicgKyBlcnJvci5tZXNzYWdlICsgJzwvcD4nKVxuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJvci5maWVsZCA9PSAncmVjYXB0Y2hhJykge1xuICAgICAgICAgICQodGhpcy5vcHRpb25zLnBheV9idXR0b25fc2VsZWN0b3IpLmJlZm9yZSgnPHAgY2xhc3M9XCJhLWZvcm0tY2FwdGlvbiBhLXZhbGlkYXRpb24tZXJyb3IgYS1yZWNhcHRjaGEtZXJyb3JcIj4nICsgbWVzc2FnZSArICc8L3A+JylcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXJyb3IudHlwZSA9PSAnaW52YWxpZF9yZXF1ZXN0X2Vycm9yJyAmJiBzdHJpcGVFcnJvclNlbGVjdG9yID09PSAnJykge1xuICAgICAgICAgICQodGhpcy5vcHRpb25zLnBheV9idXR0b25fc2VsZWN0b3IpLmJlZm9yZSgnPHAgY2xhc3M9XCJhLWZvcm0tY2FwdGlvbiBhLXZhbGlkYXRpb24tZXJyb3IgYS1pbnZhbGlkLXJlcXVlc3QtZXJyb3JcIj4nICsgZXJyb3IubWVzc2FnZSArICc8L3A+JylcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIC8vIGRpc3BsYXlFcnJvck1lc3NhZ2VcblxuICAgIHNob3dOZXdzbGV0dGVyU2V0dGluZ3M6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcblxuICAgICAgdmFyIG5ld3NsZXR0ZXJfZ3JvdXBfaHRtbCA9ICcnO1xuICAgICAgaWYgKCQob3B0aW9ucy5uZXdzbGV0dGVyX2dyb3VwX3NlbGVjdG9yKS5sZW5ndGggPiAwICkge1xuICAgICAgICB2YXIgZ2V0X2RhdGEgPSB7XG4gICAgICAgICAgc2hvcnRjb2RlOiAnbmV3c2xldHRlcl9mb3JtJyxcbiAgICAgICAgICBwbGFjZW1lbnQ6ICd1c2VyYWNjb3VudCdcbiAgICAgICAgfTtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgIHVybDogb3B0aW9ucy5taW5ucG9zdF9yb290ICsgJy93cC1qc29uL21pbm5wb3N0LWFwaS92Mi9tYWlsY2hpbXAvZm9ybScsXG4gICAgICAgICAgZGF0YTogZ2V0X2RhdGFcbiAgICAgICAgfSkuZG9uZShmdW5jdGlvbiggcmVzdWx0ICkge1xuICAgICAgICAgIGlmICggdHlwZW9mIHJlc3VsdC5ncm91cF9maWVsZHMgIT09ICd1bmRlZmluZWQnICkge1xuICAgICAgICAgICAgJC5lYWNoKHJlc3VsdC5ncm91cF9maWVsZHMsIGZ1bmN0aW9uKCBpbmRleCwgY2F0ZWdvcnkgKSB7XG4gICAgICAgICAgICAgIG5ld3NsZXR0ZXJfZ3JvdXBfaHRtbCArPSAnPGZpZWxkc2V0IGNsYXNzPVwibS1mb3JtLWl0ZW0gc3VwcG9ydC1uZXdzbGV0dGVyIG0tZm9ybS1pdGVtLScgKyBjYXRlZ29yeS50eXBlICsgJ1wiPic7XG4gICAgICAgICAgICAgIG5ld3NsZXR0ZXJfZ3JvdXBfaHRtbCArPSAnPGxhYmVsPicgKyBjYXRlZ29yeS5uYW1lICsgJzo8L2xhYmVsPic7XG4gICAgICAgICAgICAgIGlmICggY2F0ZWdvcnkuY29udGFpbnMubGVuZ3RoID4gMCApIHtcbiAgICAgICAgICAgICAgICBuZXdzbGV0dGVyX2dyb3VwX2h0bWwgKz0gJzxkaXYgY2xhc3M9XCJtLWZvcm0taXRlbSBtLWZvcm0taXRlbS1uZXdzbGV0dGVyXCI+JztcbiAgICAgICAgICAgICAgICAkLmVhY2goY2F0ZWdvcnlbY2F0ZWdvcnkuY29udGFpbnNdLCBmdW5jdGlvbiggaW5kZXgsIGl0ZW0gKSB7XG4gICAgICAgICAgICAgICAgICBuZXdzbGV0dGVyX2dyb3VwX2h0bWwgKz0gJzxsYWJlbD48aW5wdXQgbmFtZT1cImdyb3Vwc19zdWJtaXR0ZWRcIiB0eXBlPVwiY2hlY2tib3hcIiB2YWx1ZT1cIicgKyBpdGVtLmlkICsgJ1wiPicgKyBpdGVtLm5hbWUgKyAnPC9sYWJlbD4nO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIG5ld3NsZXR0ZXJfZ3JvdXBfaHRtbCArPSAnPC9kaXY+JztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBuZXdzbGV0dGVyX2dyb3VwX2h0bWwgKz0gJzwvZmllbGRzZXQ+JztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJChvcHRpb25zLm5ld3NsZXR0ZXJfZ3JvdXBfc2VsZWN0b3IpLmh0bWwobmV3c2xldHRlcl9ncm91cF9odG1sKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoJChvcHRpb25zLm5ld3NsZXR0ZXJfZ3JvdXBfc2VsZWN0b3IpLmxlbmd0aCA+IDAgJiYgdHlwZW9mICQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHZhciBnZXRfZGF0YSA9IHtcbiAgICAgICAgICBlbWFpbDogJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKVxuICAgICAgICB9O1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgdXJsOiBvcHRpb25zLm1pbm5wb3N0X3Jvb3QgKyAnL3dwLWpzb24vbWlubnBvc3QtYXBpL3YyL21haWxjaGltcC91c2VyJyxcbiAgICAgICAgICBkYXRhOiBnZXRfZGF0YVxuICAgICAgICB9KS5kb25lKGZ1bmN0aW9uKCByZXN1bHQgKSB7XG4gICAgICAgICAgaWYgKCB0eXBlb2YgcmVzdWx0Lm1haWxjaGltcF9zdGF0dXMgIT09ICd1bmRlZmluZWQnICkge1xuICAgICAgICAgICAgJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5hZnRlcignPGlucHV0IG5hbWU9XCJtYWlsY2hpbXBfc3RhdHVzXCIgdHlwZT1cImhpZGRlblwiIHZhbHVlPVwiJyArIHJlc3VsdC5tYWlsY2hpbXBfc3RhdHVzICsgJ1wiPicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIHR5cGVvZiByZXN1bHQubWFpbGNoaW1wX3VzZXJfaWQgIT09ICd1bmRlZmluZWQnICkge1xuICAgICAgICAgICAgJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5hZnRlcignPGlucHV0IG5hbWU9XCJtYWlsY2hpbXBfdXNlcl9pZFwiIHR5cGU9XCJoaWRkZW5cIiB2YWx1ZT1cIicgKyByZXN1bHQubWFpbGNoaW1wX3VzZXJfaWQgKyAnXCI+Jyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChyZXN1bHQubWFpbGNoaW1wX3N0YXR1cyA9PT0gJ3N1YnNjcmliZWQnKSB7XG4gICAgICAgICAgICAvLyB1c2VyIGNyZWF0ZWQgLSBzaG93IGEgc3VjY2VzcyBtZXNzYWdlXG4gICAgICAgICAgICAkKCcuYS1jb25maXJtLWluc3RydWN0aW9ucycpLnRleHQoJCgnLmEtY29uZmlybS1pbnN0cnVjdGlvbnMnKS5hdHRyKCdkYXRhLWtub3duLXVzZXInKSk7XG4gICAgICAgICAgICB2YXIgZ3JvdXBzID0gcmVzdWx0Lmdyb3VwcztcbiAgICAgICAgICAgICQuZWFjaChncm91cHMsIGZ1bmN0aW9uKCBpbmRleCwgdmFsdWUgKSB7XG4gICAgICAgICAgICAgIGlmICggdmFsdWUgPT09IHRydWUgKSB7XG4gICAgICAgICAgICAgICAgJCgnOmNoZWNrYm94W3ZhbHVlPVwiJyArIGluZGV4ICsgJ1wiXScpLnByb3AoJ2NoZWNrZWQnLHRydWUpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQoJzpjaGVja2JveFt2YWx1ZT1cIicgKyBpbmRleCArICdcIl0nKS5wcm9wKCdjaGVja2VkJyxmYWxzZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICB9LCAvLyBzaG93TmV3c2xldHRlclNldHRpbmdzXG5cbiAgICBjb25maXJtTWVzc2FnZVN1Ym1pdDogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuXG4gICAgICB2YXIgZXhpc3RpbmdfbmV3c2xldHRlcl9zZXR0aW5ncyA9ICQob3B0aW9ucy5uZXdzbGV0dGVyX2dyb3VwX3NlbGVjdG9yICsgJyBpbnB1dCcpLnNlcmlhbGl6ZSgpO1xuICAgICAgLy90aGlzLmRlYnVnKGV4aXN0aW5nX25ld3NsZXR0ZXJfc2V0dGluZ3MpO1xuXG4gICAgICAkKG9wdGlvbnMuY29uZmlybV9mb3JtX3NlbGVjdG9yKS5zdWJtaXQoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB2YXIgY29uZmlybWZvcm0gPSAkKG9wdGlvbnMuY29uZmlybV9mb3JtX3NlbGVjdG9yKTtcbiAgICAgICAgLy8gc3VibWl0IHNldHRpbmdzIHRvIG1haWxjaGltcFxuICAgICAgICAvLyBuZWVkIHRvIGdldCB1c2VyIGluZm8gb24gYSBoaWRkZW4gZmllbGQgaGVyZVxuXG4gICAgICAgIHZhciBuZXdzbGV0dGVyX2dyb3VwcyA9ICQob3B0aW9ucy5uZXdzbGV0dGVyX2dyb3VwX3NlbGVjdG9yICsgJyBpbnB1dDpjaGVja2VkJyk7XG4gICAgICAgIHZhciBuZXdfbmV3c2xldHRlcl9zZXR0aW5ncyA9IG5ld3NsZXR0ZXJfZ3JvdXBzLnNlcmlhbGl6ZSgpO1xuXG4gICAgICAgIGlmICgoZXhpc3RpbmdfbmV3c2xldHRlcl9zZXR0aW5ncyAhPT0gbmV3X25ld3NsZXR0ZXJfc2V0dGluZ3MpICYmICh0eXBlb2YgbmV3c2xldHRlcl9ncm91cHMgIT09ICd1bmRlZmluZWQnKSkge1xuICAgICAgICAgIC8vYWRkIG91ciBvd24gYWpheCBjaGVjayBhcyBYLVJlcXVlc3RlZC1XaXRoIGlzIG5vdCBhbHdheXMgcmVsaWFibGVcbiAgICAgICAgICAvL2FqYXhfZm9ybV9kYXRhID0gbmV3X25ld3NsZXR0ZXJfc2V0dGluZ3MgKyAnJmFqYXhyZXF1ZXN0PXRydWUmc3Vic2NyaWJlJztcblxuICAgICAgICAgIHZhciBwb3N0X2RhdGEgPSB7XG4gICAgICAgICAgICBlbWFpbDogJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICAgIGZpcnN0X25hbWU6ICQob3B0aW9ucy5maXJzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICAgIGxhc3RfbmFtZTogJChvcHRpb25zLmxhc3RfbmFtZV9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgICBncm91cHNfc3VibWl0dGVkOiB7fVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICBwb3N0X2RhdGEuZ3JvdXBzX2F2YWlsYWJsZSA9ICdhbGwnO1xuXG4gICAgICAgICAgaWYgKCAkKCdpbnB1dFtuYW1lPVwibWFpbGNoaW1wX3N0YXR1c1wiXScpLmxlbmd0aCA+IDAgKSB7XG4gICAgICAgICAgICBwb3N0X2RhdGEubWFpbGNoaW1wX3N0YXR1cyA9ICQoJ2lucHV0W25hbWU9XCJtYWlsY2hpbXBfc3RhdHVzXCJdJykudmFsKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCAkKCdpbnB1dFtuYW1lPVwibWFpbGNoaW1wX3VzZXJfaWRcIl0nKS5sZW5ndGggPiAwICkge1xuICAgICAgICAgICAgcG9zdF9kYXRhLm1haWxjaGltcF91c2VyX2lkID0gJCgnaW5wdXRbbmFtZT1cIm1haWxjaGltcF91c2VyX2lkXCJdJykudmFsKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHR5cGVvZiBuZXdzbGV0dGVyX2dyb3VwcyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICQuZWFjaChuZXdzbGV0dGVyX2dyb3VwcywgZnVuY3Rpb24oaW5kZXgsIHZhbHVlKSB7XG4gICAgICAgICAgICAgIHZhciBncm91cCA9ICQodGhpcykudmFsKCk7XG4gICAgICAgICAgICAgIHBvc3RfZGF0YS5ncm91cHNfc3VibWl0dGVkW2luZGV4XSA9IGdyb3VwO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogb3B0aW9ucy5taW5ucG9zdF9yb290ICsgJy93cC1qc29uL21pbm5wb3N0LWFwaS92Mi9tYWlsY2hpbXAvdXNlcicsXG4gICAgICAgICAgICB0eXBlOiAncG9zdCcsXG4gICAgICAgICAgICBkYXRhVHlwZSA6ICdqc29uJyxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShwb3N0X2RhdGEpXG4gICAgICAgICAgfSlcbiAgICAgICAgICAuZG9uZShmdW5jdGlvbihyZXNwb25zZSkgeyAvLyByZXNwb25zZSBmcm9tIHRoZSBQSFAgYWN0aW9uXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9ICcnO1xuICAgICAgICAgICAgaWYgKCByZXNwb25zZS5zdWNjZXNzID09PSB0cnVlICkge1xuICAgICAgICAgICAgICAvKnN3aXRjaCAocmVzcG9uc2UuZGF0YS51c2VyX3N0YXR1cykge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2V4aXN0aW5nJzpcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnVGhhbmtzIGZvciB1cGRhdGluZyB5b3VyIGVtYWlsIHByZWZlcmVuY2VzLiBUaGV5IHdpbGwgZ28gaW50byBlZmZlY3QgaW1tZWRpYXRlbHkuJztcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ25ldyc6XG4gICAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ1dlIGhhdmUgYWRkZWQgeW91IHRvIHRoZSBNaW5uUG9zdCBtYWlsaW5nIGxpc3QuJztcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3BlbmRpbmcnOlxuICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9ICdXZSBoYXZlIGFkZGVkIHlvdSB0byB0aGUgTWlublBvc3QgbWFpbGluZyBsaXN0LiBZb3Ugd2lsbCBuZWVkIHRvIGNsaWNrIHRoZSBjb25maXJtYXRpb24gbGluayBpbiB0aGUgZW1haWwgd2Ugc2VudCB0byBiZWdpbiByZWNlaXZpbmcgbWVzc2FnZXMuJztcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9Ki9cbiAgICAgICAgICAgICAgLy9jb25maXJtZm9ybS5nZXQoMCkuc3VibWl0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25maXJtZm9ybS5nZXQoMCkuc3VibWl0KCk7XG4gICAgICAgICAgICAvLyQoJy5tLWhvbGQtbWVzc2FnZScpLmh0bWwoJzxkaXYgY2xhc3M9XCJtLWZvcm0tbWVzc2FnZSBtLWZvcm0tbWVzc2FnZS1pbmZvXCI+JyArIG1lc3NhZ2UgKyAnPC9kaXY+Jyk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuZmFpbChmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgLy8gd2Ugc2hvdWxkIHB1dCBhbiBhY3R1YWwgZXJyb3IgbWVzc2FnZSBoZXJlIHNvbWVkYXksIHByb2JhYmx5XG4gICAgICAgICAgICAvLyQoJy5tLWhvbGQtbWVzc2FnZScpLmh0bWwoJzxkaXYgY2xhc3M9XCJtLWZvcm0tbWVzc2FnZSBtLWZvcm0tbWVzc2FnZS1pbmZvXCI+QW4gZXJyb3IgaGFzIG9jY3VyZWQuIFBsZWFzZSB0cnkgYWdhaW4uPC9kaXY+Jyk7XG4gICAgICAgICAgICBjb25maXJtZm9ybS5nZXQoMCkuc3VibWl0KCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgfSBlbHNlIHsgLy8gZW5kIHBhcnQgd2hlcmUgc2V0dGluZ3MgY2hhbmdlZFxuICAgICAgICAgIGNvbmZpcm1mb3JtLmdldCgwKS5zdWJtaXQoKTtcbiAgICAgICAgfVxuXG4gICAgICB9KTtcbiAgICAgIC8vcmV0dXJuIGZhbHNlO1xuICAgIH0sIC8vIGNvbmZpcm1NZXNzYWdlU3VibWl0XG5cbiAgfTsgLy8gcGx1Z2luLnByb3RvdHlwZVxuXG4gIC8vIEEgcmVhbGx5IGxpZ2h0d2VpZ2h0IHBsdWdpbiB3cmFwcGVyIGFyb3VuZCB0aGUgY29uc3RydWN0b3IsXG4gIC8vIHByZXZlbnRpbmcgYWdhaW5zdCBtdWx0aXBsZSBpbnN0YW50aWF0aW9uc1xuICAkLmZuW3BsdWdpbk5hbWVdID0gZnVuY3Rpb24gKCBvcHRpb25zICkge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKCEkLmRhdGEodGhpcywgJ3BsdWdpbl8nICsgcGx1Z2luTmFtZSkpIHtcbiAgICAgICAgJC5kYXRhKHRoaXMsICdwbHVnaW5fJyArIHBsdWdpbk5hbWUsIG5ldyBQbHVnaW4oIHRoaXMsIG9wdGlvbnMgKSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbn0pKCBqUXVlcnksIHdpbmRvdywgZG9jdW1lbnQgKTsiXX0=
}(jQuery));
