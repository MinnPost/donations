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
    'gift_delivery_method_selector': '[name="gift_delivery_method"]',
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
    'shipping_amount_field': '[name="shipping_cost"]',
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
      $(options.gift_delivery_method_selector, element).change(function () {
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

      if ($(this.options.shipping_amount_field).length > 0 && $(this.options.shipping_amount_field).val() > 0) {
        var shipping_amount = $(this.options.shipping_amount_field).val();

        if ($(this.options.gift_delivery_method_selector + ':checked').val() === 'shipping') {
          total_amount = parseInt(shipping_amount, 10) + parseInt(total_amount, 10);
        } else {
          total_amount = parseInt(total_amount, 10);
        }
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

      if (typeof tlite !== 'undefined') {
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZhbGlkLWZvcm0ubWluLmpzIiwibWlubnBvc3QuZ2l2aW5nLmpzIl0sIm5hbWVzIjpbInIiLCJlIiwibiIsInQiLCJvIiwiaSIsImYiLCJjIiwicmVxdWlyZSIsInUiLCJhIiwiRXJyb3IiLCJjb2RlIiwicCIsImV4cG9ydHMiLCJjYWxsIiwibGVuZ3RoIiwibW9kdWxlIiwiX3ZhbGlkRm9ybSIsIl92YWxpZEZvcm0yIiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsIm9iaiIsIl9fZXNNb2R1bGUiLCJkZWZhdWx0Iiwid2luZG93IiwiVmFsaWRGb3JtIiwidG9nZ2xlSW52YWxpZENsYXNzIiwiaGFuZGxlQ3VzdG9tTWVzc2FnZXMiLCJoYW5kbGVDdXN0b21NZXNzYWdlRGlzcGxheSIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwidmFsdWUiLCJjbG9uZSIsImRlZmF1bHRzIiwiaW5zZXJ0QWZ0ZXIiLCJpbnNlcnRCZWZvcmUiLCJmb3JFYWNoIiwiZGVib3VuY2UiLCJjb3B5IiwiYXR0ciIsImhhc093blByb3BlcnR5IiwiZGVmYXVsdE9iamVjdCIsImsiLCJ1bmRlZmluZWQiLCJyZWZOb2RlIiwibm9kZVRvSW5zZXJ0Iiwic2libGluZyIsIm5leHRTaWJsaW5nIiwiX3BhcmVudCIsInBhcmVudE5vZGUiLCJwYXJlbnQiLCJhcHBlbmRDaGlsZCIsIml0ZW1zIiwiZm4iLCJtcyIsInRpbWVvdXQiLCJkZWJvdW5jZWRGbiIsImNsZWFyVGltZW91dCIsInNldFRpbWVvdXQiLCJ2YWxpZEZvcm0iLCJfdXRpbCIsImlucHV0IiwiaW52YWxpZENsYXNzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNsYXNzTGlzdCIsImFkZCIsInZhbGlkaXR5IiwidmFsaWQiLCJyZW1vdmUiLCJlcnJvclByb3BzIiwiZ2V0Q3VzdG9tTWVzc2FnZSIsImN1c3RvbU1lc3NhZ2VzIiwibG9jYWxFcnJvclByb3BzIiwidHlwZSIsImNvbmNhdCIsInByb3AiLCJnZXRBdHRyaWJ1dGUiLCJjaGVja1ZhbGlkaXR5IiwibWVzc2FnZSIsInNldEN1c3RvbVZhbGlkaXR5Iiwib3B0aW9ucyIsInZhbGlkYXRpb25FcnJvckNsYXNzIiwidmFsaWRhdGlvbkVycm9yUGFyZW50Q2xhc3MiLCJlcnJvclBsYWNlbWVudCIsImluc2VydEVycm9yIiwiZXJyb3JOb2RlIiwicXVlcnlTZWxlY3RvciIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInZhbGlkYXRpb25NZXNzYWdlIiwiY2xhc3NOYW1lIiwidGV4dENvbnRlbnQiLCJwcmV2ZW50RGVmYXVsdCIsImRlZmF1bHRPcHRpb25zIiwiZWxlbWVudCIsIm5vZGVOYW1lIiwiaW5wdXRzIiwidG9Mb3dlckNhc2UiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9jdXNJbnZhbGlkSW5wdXQiLCJ2YWxpZEZvcm1JbnB1dHMiLCJmb3JtIiwiZm9jdXNGaXJzdCIsImludmFsaWROb2RlIiwiZm9jdXMiLCIkIiwicGx1Z2luTmFtZSIsIlBsdWdpbiIsImV4dGVuZCIsIl9kZWZhdWx0cyIsIl9uYW1lIiwiaW5pdCIsInByb3RvdHlwZSIsInJlc2V0IiwiYW1vdW50IiwiZG9jdW1lbnRFbGVtZW50IiwicGFyc2VGbG9hdCIsImxldmVsX2Ftb3VudF9zZWxlY3RvciIsInRleHQiLCJvcmlnaW5hbF9hbW91bnQiLCJwYXJzZUludCIsIm9yaWdpbmFsX2Ftb3VudF9zZWxlY3RvciIsInZhbCIsInByb2Nlc3NpbmdfZmVlIiwiTWF0aCIsInJvdW5kIiwiZmVlX2Ftb3VudCIsInBvdyIsInRvRml4ZWQiLCJwcm9jZXNzaW5nX2ZlZV90ZXh0IiwiY3JlYXRlX2FjY291bnQiLCJidXR0b25fdGV4dCIsInBheV9idXR0b25fc2VsZWN0b3IiLCJzdHJpcGUiLCJTdHJpcGUiLCJzdHJpcGVfcHVibGlzaGFibGVfa2V5IiwiZWxlbWVudHMiLCJmb250cyIsImNzc1NyYyIsImRlYnVnIiwiYW5hbHl0aWNzVHJhY2tpbmciLCJhbW91bnRBc1JhZGlvIiwiYW1vdW50VXBkYXRlZCIsInBheV9jY19wcm9jZXNzaW5nX3NlbGVjdG9yIiwiY3JlZGl0Q2FyZFByb2Nlc3NpbmdGZWVzIiwiZG9uYXRlX2Zvcm1fc2VsZWN0b3IiLCJkb25hdGVBbm9ueW1vdXNseSIsImhvbm9yT3JNZW1vcnlUb2dnbGUiLCJvdXRzaWRlVW5pdGVkU3RhdGVzIiwic2hpcHBpbmdBZGRyZXNzIiwiYWxsb3dNaW5ucG9zdEFjY291bnQiLCJwYXltZW50UmVxdWVzdEJ1dHRvbiIsImNob29zZVBheW1lbnRNZXRob2QiLCJjcmVkaXRDYXJkRmllbGRzIiwidmFsaWRhdGVTZXR1cCIsImZvcm1TZXR1cCIsImNvbmZpcm1fZm9ybV9zZWxlY3RvciIsInNob3dOZXdzbGV0dGVyU2V0dGluZ3MiLCJjb25maXJtTWVzc2FnZVN1Ym1pdCIsImNvbnNvbGUiLCJsb2ciLCJkaXIiLCJhbmFseXRpY3NfdHlwZSIsInByb2dyZXNzIiwicHJvZ3Jlc3Nfc2VsZWN0b3IiLCJzdGVwIiwiYWN0aW9uIiwibmF2X2l0ZW1fY291bnQiLCJvcHBfaWQiLCJvcHBfaWRfc2VsZWN0b3IiLCJwb3N0X3B1cmNoYXNlIiwiZ2EiLCJpbmRleCIsImZpbmlzaF9zZWN0aW9uX3NlbGVjdG9yIiwiYW5hbHl0aWNzVHJhY2tpbmdTdGVwIiwiaW5zdGFsbG1lbnRfcGVyaW9kIiwibGV2ZWwiLCJ0aGF0IiwiaW5zdGFsbG1lbnRfcGVyaW9kX3NlbGVjdG9yIiwiZGF0YSIsImFqYXgiLCJtZXRob2QiLCJ1cmwiLCJkb25lIiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzbGljZSIsInByb2R1Y3QiLCJnZXRUb3RhbEFtb3VudCIsImd0YWciLCJwYWdlX3RpdGxlIiwidGl0bGUiLCJwYWdlX3BhdGgiLCJsb2NhdGlvbiIsInBhdGhuYW1lIiwicGFnZSIsInNldFJhZGlvQW1vdW50IiwiY2hhbmdlIiwiZmllbGQiLCJzdHJpcGVfcGF5bWVudF90eXBlIiwiZ2V0U3RyaXBlUGF5bWVudFR5cGUiLCJpcyIsImNhbGN1bGF0ZUZlZXMiLCJzZXRGYWlyTWFya2V0VmFsdWUiLCJhbW91bnRfc2VsZWN0b3JfZmFpcl9tYXJrZXQiLCJhZGRpdGlvbmFsX2Ftb3VudF9maWVsZCIsImdpZnRfZGVsaXZlcnlfbWV0aG9kX3NlbGVjdG9yIiwidG90YWxfYW1vdW50IiwiYWRkaXRpb25hbF9hbW91bnQiLCJzaGlwcGluZ19hbW91bnRfZmllbGQiLCJzaGlwcGluZ19hbW91bnQiLCJhbW91bnRfc2VsZWN0b3IiLCJmYWlyX21hcmtldF92YWx1ZV9zZWxlY3RvciIsImZhaXJNYXJrZXRWYWx1ZSIsInNldFN0cmlwZVBheW1lbnRUeXBlIiwiZmVlcyIsImNyZWRpdENhcmRGZWVDaGVja2JveCIsIm9uIiwiYXBwZW5kIiwiZnVsbF9hbW91bnQiLCJhZGRDbGFzcyIsImZ1bGxfYW1vdW50X3NlbGVjdG9yIiwicGF5bWVudFJlcXVlc3QiLCJ1cGRhdGUiLCJ0b3RhbCIsImxhYmVsIiwidG9nZ2xlQW5vbnltb3VzIiwiYW5vbnltb3VzX3NlbGVjdG9yIiwibmFtZV9zZWxlY3RvciIsImhpZGUiLCJzaG93IiwiaG9ub3JPck1lbW9yeSIsImhvbm9yX29yX21lbW9yeV9jaG9vc2VyIiwiaG9ub3JfbWVtb3J5X2lucHV0X2dyb3VwIiwiaG9ub3JfdHlwZV9zZWxlY3RvciIsImhvbm9yX25hbWVfc2VsZWN0b3IiLCJzaG93X2JpbGxpbmdfY291bnRyeV9zZWxlY3RvciIsImNsaWNrIiwiY2hhbmdlRmllbGRzT3V0c2lkZVVTIiwic2hvd19zaGlwcGluZ19jb3VudHJ5X3NlbGVjdG9yIiwic2hpcHBpbmdfY291bnRyeV9zZWxlY3RvciIsImJpbGxpbmdfb3Jfc2hpcHBpbmciLCJ6aXBfcGFyZW50IiwiYmlsbGluZ196aXBfZmllbGRfc2VsZWN0b3IiLCJzdGF0ZV9wYXJlbnQiLCJiaWxsaW5nX3N0YXRlX2ZpZWxkX3NlbGVjdG9yIiwiYmlsbGluZ19jb3VudHJ5X3NlbGVjdG9yIiwic2hpcHBpbmdfemlwX2ZpZWxkX3NlbGVjdG9yIiwic2hpcHBpbmdfc3RhdGVfZmllbGRfc2VsZWN0b3IiLCJjaGFuZ2VGaWVsZHNJbnNpZGVVUyIsImh0bWwiLCJzaG93X3NoaXBwaW5nIiwidXNlX2Zvcl9zaGlwcGluZ19zZWxlY3RvciIsInNoaXBwaW5nX3NlbGVjdG9yIiwiYWNjb3VudF9leGlzdHMiLCJzaG93UGFzc3dvcmQiLCJzaG93UGFzc3dvcmRTdHJlbmd0aCIsInNwYW1FbWFpbCIsImVtYWlsX2ZpZWxkX3NlbGVjdG9yIiwidG9nZ2xlQWNjb3VudEZpZWxkcyIsImNyZWF0ZV9tcF9zZWxlY3RvciIsImRvbmVUeXBpbmciLCJlbWFpbCIsImNoZWNrTWlubnBvc3RBY2NvdW50IiwidHlwaW5nVGltZXIiLCJkb25lVHlwaW5nSW50ZXJ2YWwiLCJrZXl1cCIsImVtYWlsX2ZpZWxkIiwic3BhbUVycm9yQ29udGFpbmVyIiwicmVtb3ZlQ2xhc3MiLCJjcmVhdGVfYWNjb3VudF9zZWxlY3RvciIsImJlZm9yZSIsInBhc3N3b3JkX3NlbGVjdG9yIiwiJHN1Ym1pdCIsIiRjb250YWluZXIiLCIkZmllbGQiLCJzaG93X3Bhc3MiLCIkdG9nZ2xlIiwiY2hlY2tib3giLCIkYmVmb3JlIiwiYWZ0ZXIiLCJjaGVja1Bhc3N3b3JkU3RyZW5ndGgiLCIkcGFzc3dvcmQiLCIkc3RyZW5ndGhNZXRlciIsIiRzdHJlbmd0aFRleHQiLCJwYXNzd29yZCIsInJlc3VsdCIsInp4Y3ZibiIsInN0cmVuZ3RoIiwic2NvcmUiLCJ1c2VyIiwibWlubnBvc3Rfcm9vdCIsInN0YXR1cyIsInJlYXNvbiIsImNvdW50cnkiLCJjdXJyZW5jeSIsInByQnV0dG9uIiwiY3JlYXRlIiwic3R5bGUiLCJ0aGVtZSIsImhlaWdodCIsImNhbk1ha2VQYXltZW50IiwidGhlbiIsIm1vdW50IiwiaGlkZVBheW1lbnRSZXF1ZXN0IiwiZXZlbnQiLCJzdXBwb3J0Zm9ybSIsImdldCIsInJlcG9ydFZhbGlkaXR5IiwidG9rZW5GaWVsZE5hbWUiLCJ0b2tlbkZpZWxkIiwicGF5bWVudE1ldGhvZCIsImlkIiwiZm9ybVByb2Nlc3NvciIsImhpZGVFbGVtZW50IiwiY2hvb3NlX3BheW1lbnQiLCJjaGVja2VkX2lkIiwiY2hlY2tlZF92YWx1ZSIsInNldHVwUGF5bWVudE1ldGhvZCIsImVsZW1lbnRfaWQiLCJlbGVtZW50X3ZhbHVlIiwiYWNoRmllbGRzIiwicmVtb3ZlQWNoRmllbGRzIiwicGF5bWVudF9tZXRob2Rfc2VsZWN0b3IiLCJwbGFpZF9saW5rIiwiYnV0dG9uRGlzYWJsZWQiLCJsaW5rSGFuZGxlciIsImRlc3Ryb3kiLCJiYXNlIiwiaWNvbkNvbG9yIiwibGluZUhlaWdodCIsImZvbnRXZWlnaHQiLCJmb250RmFtaWx5IiwiZm9udFNpemUiLCJpbnZhbGlkIiwiY29sb3IiLCJjYXJkTnVtYmVyRWxlbWVudCIsInNob3dJY29uIiwiY2NfbnVtX3NlbGVjdG9yIiwiY2FyZEV4cGlyeUVsZW1lbnQiLCJjY19leHBfc2VsZWN0b3IiLCJjYXJkQ3ZjRWxlbWVudCIsImNjX2N2Y19zZWxlY3RvciIsImJyYW5kIiwic3RyaXBlRXJyb3JEaXNwbGF5IiwiZXJyb3IiLCJidXR0b25TdGF0dXMiLCJmaW5kIiwic2hvd1NwaW5uZXIiLCJoaWRlU3Bpbm5lciIsImJhbmtUb2tlbkZpZWxkTmFtZSIsImJhbmtUb2tlbkZpZWxkIiwiUGxhaWQiLCJjbGllbnROYW1lIiwiZW52IiwicGxhaWRfZW52IiwidG9rZW4iLCJnZXRFbGVtZW50QnlJZCIsIm9uU3VjY2VzcyIsInB1YmxpY190b2tlbiIsIm1ldGFkYXRhIiwiSlNPTiIsInN0cmluZ2lmeSIsImFjY291bnRfaWQiLCJjb250ZW50VHlwZSIsInJlc3BvbnNlIiwic3RyaXBlX2JhbmtfYWNjb3VudF90b2tlbiIsInByZXBlbmQiLCJmYWlsIiwicmVzZXRGb3JtRXJyb3JzIiwib3BlbiIsImJ1dHRvbiIsImRpc2FibGVkIiwiYWNoX3dhc19pbml0aWFsaXplZCIsInRsaXRlIiwicmVtb3ZlQXR0ciIsImdyYXYiLCJmb3JtcyIsImZvcm1fc2VsZWN0b3IiLCJzY3JvbGxUb0Zvcm1FcnJvciIsImZpcnN0IiwiZmlyc3RfaG9sZGVyIiwiZWxlbWVudE9mZnNldCIsIm9mZnNldCIsInRvcCIsInBhZ2VPZmZzZXQiLCJwYWdlWU9mZnNldCIsImlubmVySGVpZ2h0Iiwic2Nyb2xsVG9wIiwic3VibWl0IiwiYmlsbGluZ0RldGFpbHMiLCJnZW5lcmF0ZUJpbGxpbmdEZXRhaWxzIiwiY3JlYXRlTWlublBvc3RBY2NvdW50IiwicGF5bWVudF90eXBlIiwiY3JlYXRlUGF5bWVudE1ldGhvZCIsImJhbmtUb2tlbkhhbmRsZXIiLCJzdWJtaXRGb3JtT25seSIsInRoaXNfc2VsZWN0b3IiLCJ3aGljaF9lcnJvciIsImVtcHR5IiwiYW5pbWF0ZSIsImZpcnN0X25hbWUiLCJmaXJzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yIiwibGFzdF9uYW1lIiwibGFzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yIiwicGFzc3dvcmRfZmllbGRfc2VsZWN0b3IiLCJjaXR5IiwiYmlsbGluZ19jaXR5X2ZpZWxkX3NlbGVjdG9yIiwic3RhdGUiLCJ6aXAiLCJhZGRyZXNzRGV0YWlscyIsImZ1bGxfbmFtZSIsIm5hbWUiLCJzdHJlZXQiLCJiaWxsaW5nX3N0cmVldF9maWVsZF9zZWxlY3RvciIsImxpbmUxIiwicG9zdGFsX2NvZGUiLCJjb3VudHJ5X2ZpZWxkX3ZhbHVlIiwiYmlsbGluZ19jb3VudHJ5X2ZpZWxkX3NlbGVjdG9yIiwiYWRkcmVzcyIsImNhcmRFbGVtZW50IiwiY2FyZCIsImJpbGxpbmdfZGV0YWlscyIsImhhbmRsZVNlcnZlckVycm9yIiwiYWpheF91cmwiLCJmZXRjaCIsImhlYWRlcnMiLCJib2R5Iiwic2VyaWFsaXplIiwianNvbiIsImhhbmRsZVNlcnZlclJlc3BvbnNlIiwiY2FjaGUiLCJlcnJvcnMiLCJyZXF1aXJlc19hY3Rpb24iLCJ0aGlzX2ZpZWxkIiwiZWFjaCIsInBhcmFtIiwiZGlzcGxheUVycm9yTWVzc2FnZSIsInN0cmlwZUVycm9yU2VsZWN0b3IiLCJmaWVsZFBhcmVudCIsInByZXYiLCJuZXdzbGV0dGVyX2dyb3VwX2h0bWwiLCJuZXdzbGV0dGVyX2dyb3VwX3NlbGVjdG9yIiwiZ2V0X2RhdGEiLCJzaG9ydGNvZGUiLCJwbGFjZW1lbnQiLCJncm91cF9maWVsZHMiLCJjYXRlZ29yeSIsImNvbnRhaW5zIiwiaXRlbSIsIm1haWxjaGltcF9zdGF0dXMiLCJtYWlsY2hpbXBfdXNlcl9pZCIsImdyb3VwcyIsImV4aXN0aW5nX25ld3NsZXR0ZXJfc2V0dGluZ3MiLCJjb25maXJtZm9ybSIsIm5ld3NsZXR0ZXJfZ3JvdXBzIiwibmV3X25ld3NsZXR0ZXJfc2V0dGluZ3MiLCJwb3N0X2RhdGEiLCJncm91cHNfc3VibWl0dGVkIiwiZ3JvdXBzX2F2YWlsYWJsZSIsImdyb3VwIiwiZGF0YVR5cGUiLCJzdWNjZXNzIiwialF1ZXJ5Il0sIm1hcHBpbmdzIjoiOztBQUFBLENBQUMsWUFBVTtBQUFDLFdBQVNBLENBQVQsQ0FBV0MsQ0FBWCxFQUFhQyxDQUFiLEVBQWVDLENBQWYsRUFBaUI7QUFBQyxhQUFTQyxDQUFULENBQVdDLENBQVgsRUFBYUMsQ0FBYixFQUFlO0FBQUMsVUFBRyxDQUFDSixDQUFDLENBQUNHLENBQUQsQ0FBTCxFQUFTO0FBQUMsWUFBRyxDQUFDSixDQUFDLENBQUNJLENBQUQsQ0FBTCxFQUFTO0FBQUMsY0FBSUUsQ0FBQyxHQUFDLGNBQVksT0FBT0MsT0FBbkIsSUFBNEJBLE9BQWxDO0FBQTBDLGNBQUcsQ0FBQ0YsQ0FBRCxJQUFJQyxDQUFQLEVBQVMsT0FBT0EsQ0FBQyxDQUFDRixDQUFELEVBQUcsQ0FBQyxDQUFKLENBQVI7QUFBZSxjQUFHSSxDQUFILEVBQUssT0FBT0EsQ0FBQyxDQUFDSixDQUFELEVBQUcsQ0FBQyxDQUFKLENBQVI7QUFBZSxjQUFJSyxDQUFDLEdBQUMsSUFBSUMsS0FBSixDQUFVLHlCQUF1Qk4sQ0FBdkIsR0FBeUIsR0FBbkMsQ0FBTjtBQUE4QyxnQkFBTUssQ0FBQyxDQUFDRSxJQUFGLEdBQU8sa0JBQVAsRUFBMEJGLENBQWhDO0FBQWtDOztBQUFBLFlBQUlHLENBQUMsR0FBQ1gsQ0FBQyxDQUFDRyxD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SUFBRixDQUFPLElBQVAsRUFBYSxZQUFZekUsVUFBekIsRUFBcUMsSUFBSUMsTUFBSixDQUFZLElBQVosRUFBa0IzQixPQUFsQixDQUFyQztBQUNEO0FBQ0YsS0FKTSxDQUFQO0FBS0QsR0FORDtBQVFELENBeGpEQSxFQXdqREcrWCxNQXhqREgsRUF3akRXdmIsTUF4akRYLEVBd2pEbUIrRCxRQXhqRG5CIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpKHsxOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcInVzZSBzdHJpY3RcIjt2YXIgX3ZhbGlkRm9ybT1yZXF1aXJlKFwiLi9zcmMvdmFsaWQtZm9ybVwiKTt2YXIgX3ZhbGlkRm9ybTI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdmFsaWRGb3JtKTtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iail7cmV0dXJuIG9iaiYmb2JqLl9fZXNNb2R1bGU/b2JqOntkZWZhdWx0Om9ian19d2luZG93LlZhbGlkRm9ybT1fdmFsaWRGb3JtMi5kZWZhdWx0O3dpbmRvdy5WYWxpZEZvcm0udG9nZ2xlSW52YWxpZENsYXNzPV92YWxpZEZvcm0udG9nZ2xlSW52YWxpZENsYXNzO3dpbmRvdy5WYWxpZEZvcm0uaGFuZGxlQ3VzdG9tTWVzc2FnZXM9X3ZhbGlkRm9ybS5oYW5kbGVDdXN0b21NZXNzYWdlczt3aW5kb3cuVmFsaWRGb3JtLmhhbmRsZUN1c3RvbU1lc3NhZ2VEaXNwbGF5PV92YWxpZEZvcm0uaGFuZGxlQ3VzdG9tTWVzc2FnZURpc3BsYXl9LHtcIi4vc3JjL3ZhbGlkLWZvcm1cIjozfV0sMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOnRydWV9KTtleHBvcnRzLmNsb25lPWNsb25lO2V4cG9ydHMuZGVmYXVsdHM9ZGVmYXVsdHM7ZXhwb3J0cy5pbnNlcnRBZnRlcj1pbnNlcnRBZnRlcjtleHBvcnRzLmluc2VydEJlZm9yZT1pbnNlcnRCZWZvcmU7ZXhwb3J0cy5mb3JFYWNoPWZvckVhY2g7ZXhwb3J0cy5kZWJvdW5jZT1kZWJvdW5jZTtmdW5jdGlvbiBjbG9uZShvYmope3ZhciBjb3B5PXt9O2Zvcih2YXIgYXR0ciBpbiBvYmope2lmKG9iai5oYXNPd25Qcm9wZXJ0eShhdHRyKSljb3B5W2F0dHJdPW9ialthdHRyXX1yZXR1cm4gY29weX1mdW5jdGlvbiBkZWZhdWx0cyhvYmosZGVmYXVsdE9iamVjdCl7b2JqPWNsb25lKG9ianx8e30pO2Zvcih2YXIgayBpbiBkZWZhdWx0T2JqZWN0KXtpZihvYmpba109PT11bmRlZmluZWQpb2JqW2tdPWRlZmF1bHRPYmplY3Rba119cmV0dXJuIG9ian1mdW5jdGlvbiBpbnNlcnRBZnRlcihyZWZOb2RlLG5vZGVUb0luc2VydCl7dmFyIHNpYmxpbmc9cmVmTm9kZS5uZXh0U2libGluZztpZihzaWJsaW5nKXt2YXIgX3BhcmVudD1yZWZOb2RlLnBhcmVudE5vZGU7X3BhcmVudC5pbnNlcnRCZWZvcmUobm9kZVRvSW5zZXJ0LHNpYmxpbmcpfWVsc2V7cGFyZW50LmFwcGVuZENoaWxkKG5vZGVUb0luc2VydCl9fWZ1bmN0aW9uIGluc2VydEJlZm9yZShyZWZOb2RlLG5vZGVUb0luc2VydCl7dmFyIHBhcmVudD1yZWZOb2RlLnBhcmVudE5vZGU7cGFyZW50Lmluc2VydEJlZm9yZShub2RlVG9JbnNlcnQscmVmTm9kZSl9ZnVuY3Rpb24gZm9yRWFjaChpdGVtcyxmbil7aWYoIWl0ZW1zKXJldHVybjtpZihpdGVtcy5mb3JFYWNoKXtpdGVtcy5mb3JFYWNoKGZuKX1lbHNle2Zvcih2YXIgaT0wO2k8aXRlbXMubGVuZ3RoO2krKyl7Zm4oaXRlbXNbaV0saSxpdGVtcyl9fX1mdW5jdGlvbiBkZWJvdW5jZShtcyxmbil7dmFyIHRpbWVvdXQ9dm9pZCAwO3ZhciBkZWJvdW5jZWRGbj1mdW5jdGlvbiBkZWJvdW5jZWRGbigpe2NsZWFyVGltZW91dCh0aW1lb3V0KTt0aW1lb3V0PXNldFRpbWVvdXQoZm4sbXMpfTtyZXR1cm4gZGVib3VuY2VkRm59fSx7fV0sMzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOnRydWV9KTtleHBvcnRzLnRvZ2dsZUludmFsaWRDbGFzcz10b2dnbGVJbnZhbGlkQ2xhc3M7ZXhwb3J0cy5oYW5kbGVDdXN0b21NZXNzYWdlcz1oYW5kbGVDdXN0b21NZXNzYWdlcztleHBvcnRzLmhhbmRsZUN1c3RvbU1lc3NhZ2VEaXNwbGF5PWhhbmRsZUN1c3RvbU1lc3NhZ2VEaXNwbGF5O2V4cG9ydHMuZGVmYXVsdD12YWxpZEZvcm07dmFyIF91dGlsPXJlcXVpcmUoXCIuL3V0aWxcIik7ZnVuY3Rpb24gdG9nZ2xlSW52YWxpZENsYXNzKGlucHV0LGludmFsaWRDbGFzcyl7aW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImludmFsaWRcIixmdW5jdGlvbigpe2lucHV0LmNsYXNzTGlzdC5hZGQoaW52YWxpZENsYXNzKX0pO2lucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLGZ1bmN0aW9uKCl7aWYoaW5wdXQudmFsaWRpdHkudmFsaWQpe2lucHV0LmNsYXNzTGlzdC5yZW1vdmUoaW52YWxpZENsYXNzKX19KX12YXIgZXJyb3JQcm9wcz1bXCJiYWRJbnB1dFwiLFwicGF0dGVybk1pc21hdGNoXCIsXCJyYW5nZU92ZXJmbG93XCIsXCJyYW5nZVVuZGVyZmxvd1wiLFwic3RlcE1pc21hdGNoXCIsXCJ0b29Mb25nXCIsXCJ0b29TaG9ydFwiLFwidHlwZU1pc21hdGNoXCIsXCJ2YWx1ZU1pc3NpbmdcIixcImN1c3RvbUVycm9yXCJdO2Z1bmN0aW9uIGdldEN1c3RvbU1lc3NhZ2UoaW5wdXQsY3VzdG9tTWVzc2FnZXMpe2N1c3RvbU1lc3NhZ2VzPWN1c3RvbU1lc3NhZ2VzfHx7fTt2YXIgbG9jYWxFcnJvclByb3BzPVtpbnB1dC50eXBlK1wiTWlzbWF0Y2hcIl0uY29uY2F0KGVycm9yUHJvcHMpO3ZhciB2YWxpZGl0eT1pbnB1dC52YWxpZGl0eTtmb3IodmFyIGk9MDtpPGxvY2FsRXJyb3JQcm9wcy5sZW5ndGg7aSsrKXt2YXIgcHJvcD1sb2NhbEVycm9yUHJvcHNbaV07aWYodmFsaWRpdHlbcHJvcF0pe3JldHVybiBpbnB1dC5nZXRBdHRyaWJ1dGUoXCJkYXRhLVwiK3Byb3ApfHxjdXN0b21NZXNzYWdlc1twcm9wXX19fWZ1bmN0aW9uIGhhbmRsZUN1c3RvbU1lc3NhZ2VzKGlucHV0LGN1c3RvbU1lc3NhZ2VzKXtmdW5jdGlvbiBjaGVja1ZhbGlkaXR5KCl7dmFyIG1lc3NhZ2U9aW5wdXQudmFsaWRpdHkudmFsaWQ/bnVsbDpnZXRDdXN0b21NZXNzYWdlKGlucHV0LGN1c3RvbU1lc3NhZ2VzKTtpbnB1dC5zZXRDdXN0b21WYWxpZGl0eShtZXNzYWdlfHxcIlwiKX1pbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIixjaGVja1ZhbGlkaXR5KTtpbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiaW52YWxpZFwiLGNoZWNrVmFsaWRpdHkpfWZ1bmN0aW9uIGhhbmRsZUN1c3RvbU1lc3NhZ2VEaXNwbGF5KGlucHV0LG9wdGlvbnMpe3ZhciB2YWxpZGF0aW9uRXJyb3JDbGFzcz1vcHRpb25zLnZhbGlkYXRpb25FcnJvckNsYXNzLHZhbGlkYXRpb25FcnJvclBhcmVudENsYXNzPW9wdGlvbnMudmFsaWRhdGlvbkVycm9yUGFyZW50Q2xhc3MsZXJyb3JQbGFjZW1lbnQ9b3B0aW9ucy5lcnJvclBsYWNlbWVudDtmdW5jdGlvbiBjaGVja1ZhbGlkaXR5KG9wdGlvbnMpe3ZhciBpbnNlcnRFcnJvcj1vcHRpb25zLmluc2VydEVycm9yO3ZhciBwYXJlbnROb2RlPWlucHV0LnBhcmVudE5vZGU7dmFyIGVycm9yTm9kZT1wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoXCIuXCIrdmFsaWRhdGlvbkVycm9yQ2xhc3MpfHxkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO2lmKCFpbnB1dC52YWxpZGl0eS52YWxpZCYmaW5wdXQudmFsaWRhdGlvbk1lc3NhZ2Upe2Vycm9yTm9kZS5jbGFzc05hbWU9dmFsaWRhdGlvbkVycm9yQ2xhc3M7ZXJyb3JOb2RlLnRleHRDb250ZW50PWlucHV0LnZhbGlkYXRpb25NZXNzYWdlO2lmKGluc2VydEVycm9yKXtlcnJvclBsYWNlbWVudD09PVwiYmVmb3JlXCI/KDAsX3V0aWwuaW5zZXJ0QmVmb3JlKShpbnB1dCxlcnJvck5vZGUpOigwLF91dGlsLmluc2VydEFmdGVyKShpbnB1dCxlcnJvck5vZGUpO3BhcmVudE5vZGUuY2xhc3NMaXN0LmFkZCh2YWxpZGF0aW9uRXJyb3JQYXJlbnRDbGFzcyl9fWVsc2V7cGFyZW50Tm9kZS5jbGFzc0xpc3QucmVtb3ZlKHZhbGlkYXRpb25FcnJvclBhcmVudENsYXNzKTtlcnJvck5vZGUucmVtb3ZlKCl9fWlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLGZ1bmN0aW9uKCl7Y2hlY2tWYWxpZGl0eSh7aW5zZXJ0RXJyb3I6ZmFsc2V9KX0pO2lucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnZhbGlkXCIsZnVuY3Rpb24oZSl7ZS5wcmV2ZW50RGVmYXVsdCgpO2NoZWNrVmFsaWRpdHkoe2luc2VydEVycm9yOnRydWV9KX0pfXZhciBkZWZhdWx0T3B0aW9ucz17aW52YWxpZENsYXNzOlwiaW52YWxpZFwiLHZhbGlkYXRpb25FcnJvckNsYXNzOlwidmFsaWRhdGlvbi1lcnJvclwiLHZhbGlkYXRpb25FcnJvclBhcmVudENsYXNzOlwiaGFzLXZhbGlkYXRpb24tZXJyb3JcIixjdXN0b21NZXNzYWdlczp7fSxlcnJvclBsYWNlbWVudDpcImJlZm9yZVwifTtmdW5jdGlvbiB2YWxpZEZvcm0oZWxlbWVudCxvcHRpb25zKXtpZighZWxlbWVudHx8IWVsZW1lbnQubm9kZU5hbWUpe3Rocm93IG5ldyBFcnJvcihcIkZpcnN0IGFyZyB0byB2YWxpZEZvcm0gbXVzdCBiZSBhIGZvcm0sIGlucHV0LCBzZWxlY3QsIG9yIHRleHRhcmVhXCIpfXZhciBpbnB1dHM9dm9pZCAwO3ZhciB0eXBlPWVsZW1lbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtvcHRpb25zPSgwLF91dGlsLmRlZmF1bHRzKShvcHRpb25zLGRlZmF1bHRPcHRpb25zKTtpZih0eXBlPT09XCJmb3JtXCIpe2lucHV0cz1lbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbnB1dCwgc2VsZWN0LCB0ZXh0YXJlYVwiKTtmb2N1c0ludmFsaWRJbnB1dChlbGVtZW50LGlucHV0cyl9ZWxzZSBpZih0eXBlPT09XCJpbnB1dFwifHx0eXBlPT09XCJzZWxlY3RcInx8dHlwZT09PVwidGV4dGFyZWFcIil7aW5wdXRzPVtlbGVtZW50XX1lbHNle3Rocm93IG5ldyBFcnJvcihcIk9ubHkgZm9ybSwgaW5wdXQsIHNlbGVjdCwgb3IgdGV4dGFyZWEgZWxlbWVudHMgYXJlIHN1cHBvcnRlZFwiKX12YWxpZEZvcm1JbnB1dHMoaW5wdXRzLG9wdGlvbnMpfWZ1bmN0aW9uIGZvY3VzSW52YWxpZElucHV0KGZvcm0saW5wdXRzKXt2YXIgZm9jdXNGaXJzdD0oMCxfdXRpbC5kZWJvdW5jZSkoMTAwLGZ1bmN0aW9uKCl7dmFyIGludmFsaWROb2RlPWZvcm0ucXVlcnlTZWxlY3RvcihcIjppbnZhbGlkXCIpO2lmKGludmFsaWROb2RlKWludmFsaWROb2RlLmZvY3VzKCl9KTsoMCxfdXRpbC5mb3JFYWNoKShpbnB1dHMsZnVuY3Rpb24oaW5wdXQpe3JldHVybiBpbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiaW52YWxpZFwiLGZvY3VzRmlyc3QpfSl9ZnVuY3Rpb24gdmFsaWRGb3JtSW5wdXRzKGlucHV0cyxvcHRpb25zKXt2YXIgaW52YWxpZENsYXNzPW9wdGlvbnMuaW52YWxpZENsYXNzLGN1c3RvbU1lc3NhZ2VzPW9wdGlvbnMuY3VzdG9tTWVzc2FnZXM7KDAsX3V0aWwuZm9yRWFjaCkoaW5wdXRzLGZ1bmN0aW9uKGlucHV0KXt0b2dnbGVJbnZhbGlkQ2xhc3MoaW5wdXQsaW52YWxpZENsYXNzKTtoYW5kbGVDdXN0b21NZXNzYWdlcyhpbnB1dCxjdXN0b21NZXNzYWdlcyk7aGFuZGxlQ3VzdG9tTWVzc2FnZURpc3BsYXkoaW5wdXQsb3B0aW9ucyl9KX19LHtcIi4vdXRpbFwiOjJ9XX0se30sWzFdKTsiLCIvLyBNaW5uUG9zdCBHaXZpbmcgcGx1Z2luXG4vLyB0aGUgc2VtaS1jb2xvbiBiZWZvcmUgZnVuY3Rpb24gaW52b2NhdGlvbiBpcyBhIHNhZmV0eSBuZXQgYWdhaW5zdCBjb25jYXRlbmF0ZWRcbi8vIHNjcmlwdHMgYW5kL29yIG90aGVyIHBsdWdpbnMgd2hpY2ggbWF5IG5vdCBiZSBjbG9zZWQgcHJvcGVybHkuXG47KGZ1bmN0aW9uICggJCwgd2luZG93LCBkb2N1bWVudCwgdW5kZWZpbmVkICkge1xuXG4gIC8vIHVuZGVmaW5lZCBpcyB1c2VkIGhlcmUgYXMgdGhlIHVuZGVmaW5lZCBnbG9iYWwgdmFyaWFibGUgaW4gRUNNQVNjcmlwdCAzIGlzXG4gIC8vIG11dGFibGUgKGllLiBpdCBjYW4gYmUgY2hhbmdlZCBieSBzb21lb25lIGVsc2UpLiB1bmRlZmluZWQgaXNuJ3QgcmVhbGx5IGJlaW5nXG4gIC8vIHBhc3NlZCBpbiBzbyB3ZSBjYW4gZW5zdXJlIHRoZSB2YWx1ZSBvZiBpdCBpcyB0cnVseSB1bmRlZmluZWQuIEluIEVTNSwgdW5kZWZpbmVkXG4gIC8vIGNhbiBubyBsb25nZXIgYmUgbW9kaWZpZWQuXG5cbiAgLy8gd2luZG93IGFuZCBkb2N1bWVudCBhcmUgcGFzc2VkIHRocm91Z2ggYXMgbG9jYWwgdmFyaWFibGUgcmF0aGVyIHRoYW4gZ2xvYmFsXG4gIC8vIGFzIHRoaXMgKHNsaWdodGx5KSBxdWlja2VucyB0aGUgcmVzb2x1dGlvbiBwcm9jZXNzIGFuZCBjYW4gYmUgbW9yZSBlZmZpY2llbnRseVxuICAvLyBtaW5pZmllZCAoZXNwZWNpYWxseSB3aGVuIGJvdGggYXJlIHJlZ3VsYXJseSByZWZlcmVuY2VkIGluIHlvdXIgcGx1Z2luKS5cblxuICAvLyBDcmVhdGUgdGhlIGRlZmF1bHRzIG9uY2VcbiAgdmFyIHBsdWdpbk5hbWUgPSAnbWlubnBvc3RfZ2l2aW5nJyxcbiAgZGVmYXVsdHMgPSB7XG4gICAgJ2RlYnVnJyA6IGZhbHNlLCAvLyB0aGlzIGNhbiBiZSBzZXQgdG8gdHJ1ZSBvbiBwYWdlIGxldmVsIG9wdGlvbnNcbiAgICAnc3RyaXBlX3B1Ymxpc2hhYmxlX2tleScgOiAnJyxcbiAgICAncGxhaWRfZW52JyA6ICcnLFxuICAgICdwbGFpZF9saW5rJyA6ICcjYXV0aG9yaXplLWFjaCcsXG4gICAgJ21pbm5wb3N0X3Jvb3QnIDogJ2h0dHBzOi8vd3d3Lm1pbm5wb3N0LmNvbScsXG4gICAgJ2FuYWx5dGljc190eXBlJyA6ICcnLFxuICAgICdwcm9ncmVzc19zZWxlY3RvcicgOiAnLm0tc3VwcG9ydC1wcm9ncmVzcycsXG4gICAgJ2Zvcm1fc2VsZWN0b3InIDogJy5tLWZvcm0nLFxuICAgICdkb25hdGVfZm9ybV9zZWxlY3Rvcic6ICcjZG9uYXRlJyxcbiAgICAnY29uZmlybV9mb3JtX3NlbGVjdG9yJyA6ICcjY29uZmlybScsXG4gICAgJ2ZpbmlzaF9zZWN0aW9uX3NlbGVjdG9yJyA6ICcjcGFuZWwtLWNvbmZpcm1hdGlvbicsXG4gICAgJ3BheV9jY19wcm9jZXNzaW5nX3NlbGVjdG9yJyA6ICdpbnB1dFtuYW1lPVwicGF5X2ZlZXNcIl0nLFxuICAgICdmZWVfYW1vdW50JyA6ICcucHJvY2Vzc2luZy1hbW91bnQnLFxuICAgICdsZXZlbF9hbW91bnRfc2VsZWN0b3InIDogJyNwYW5lbC0tcGF5IC5hbW91bnQgLmxldmVsLWFtb3VudCcsIC8vIHdlIGNhbiBtYXliZSBnZXQgcmlkIG9mIHRoaXNcbiAgICAnb3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yJyA6ICdbbmFtZT1cImFtb3VudFwiXScsXG4gICAgJ2dpZnRfZGVsaXZlcnlfbWV0aG9kX3NlbGVjdG9yJyA6ICdbbmFtZT1cImdpZnRfZGVsaXZlcnlfbWV0aG9kXCJdJyxcbiAgICAnZmFpcl9tYXJrZXRfdmFsdWVfc2VsZWN0b3InIDogJyNmYWlyX21hcmtldF92YWx1ZScsXG4gICAgJ2Z1bGxfYW1vdW50X3NlbGVjdG9yJyA6ICcuZnVsbC1hbW91bnQnLFxuICAgICdpbnN0YWxsbWVudF9wZXJpb2Rfc2VsZWN0b3InIDogJ1tuYW1lPVwiaW5zdGFsbG1lbnRfcGVyaW9kXCJdJyxcbiAgICAnbmFtZV9zZWxlY3RvcicgOiAnLm0tZm9ybS1pdGVtLWRpc3BsYXktbmFtZScsXG4gICAgJ2luX2hvbm9yX29yX21lbW9yeV9maWVsZF9zZWxlY3RvcicgOiAnLm0tZm9ybS1pdGVtLWhvbm9yLW1lbW9yeScsXG4gICAgJ2hvbm9yX29yX21lbW9yeV9jaG9vc2VyJyA6ICdpbnB1dFtuYW1lPVwiaW5faG9ub3Jfb3JfbWVtb3J5XCJdJywgLy8gcmFkaW8gZmllbGRzXG4gICAgJ2hvbm9yX3R5cGVfc2VsZWN0b3InIDogJy5hLWhvbm9yLXR5cGUnLCAvLyBzcGFuIGluc2lkZSBsYWJlbFxuICAgICdob25vcl9tZW1vcnlfaW5wdXRfZ3JvdXAnIDogJy5hLWhvbm9yLW9yLW1lbW9yeScsIC8vIGhvbGRzIHRoZSBmb3JtIGZpZWxkXG4gICAgJ2Fub255bW91c19zZWxlY3RvcicgOiAnI2Fub255bW91cycsXG4gICAgJ3Nob3dfYmlsbGluZ19jb3VudHJ5X3NlbGVjdG9yJyA6ICcjYmlsbGluZ19zaG93X2NvdW50cnknLFxuICAgICdiaWxsaW5nX2NvdW50cnlfc2VsZWN0b3InIDogJy5tLWZvcm0taXRlbS1jb3VudHJ5JyxcbiAgICAnc2hvd19zaGlwcGluZ19jb3VudHJ5X3NlbGVjdG9yJyA6ICcjc2hpcHBpbmdfc2hvd19jb3VudHJ5JyxcbiAgICAnc2hpcHBpbmdfY291bnRyeV9zZWxlY3RvcicgOiAnLm0tZm9ybS1pdGVtLXNoaXBwaW5nLWNvdW50cnknLFxuICAgICdzaGlwcGluZ19hZGRyZXNzX3NlbGVjdG9yJyA6ICcubS1mb3JtLWl0ZW0tc2hpcHBpbmctYWRkcmVzcycsXG4gICAgJ3VzZV9mb3Jfc2hpcHBpbmdfc2VsZWN0b3InIDogJyN1c2Vmb3JzaGlwcGluZycsXG4gICAgJ2VtYWlsX2ZpZWxkX3NlbGVjdG9yJyA6ICcjZW1haWwnLFxuICAgICdwYXNzd29yZF9maWVsZF9zZWxlY3RvcicgOiAnI3Bhc3N3b3JkJyxcbiAgICAnZmlyc3RfbmFtZV9maWVsZF9zZWxlY3RvcicgOiAnI2ZpcnN0X25hbWUnLFxuICAgICdsYXN0X25hbWVfZmllbGRfc2VsZWN0b3InIDogJyNsYXN0X25hbWUnLFxuICAgICdiaWxsaW5nX3N0cmVldF9maWVsZF9zZWxlY3RvcicgOiAnI2JpbGxpbmdfc3RyZWV0JyxcbiAgICAnYmlsbGluZ19jaXR5X2ZpZWxkX3NlbGVjdG9yJyA6ICcjYmlsbGluZ19jaXR5JyxcbiAgICAnYmlsbGluZ19zdGF0ZV9maWVsZF9zZWxlY3RvcicgOiAnI2JpbGxpbmdfc3RhdGUnLFxuICAgICdiaWxsaW5nX3ppcF9maWVsZF9zZWxlY3Rvcic6ICcjYmlsbGluZ196aXAnLFxuICAgICdiaWxsaW5nX2NvdW50cnlfZmllbGRfc2VsZWN0b3InIDogJyNiaWxsaW5nX2NvdW50cnknLFxuICAgICdzaGlwcGluZ19zdGF0ZV9maWVsZF9zZWxlY3RvcicgOiAnI3NoaXBwaW5nX3N0YXRlJyxcbiAgICAnc2hpcHBpbmdfemlwX2ZpZWxkX3NlbGVjdG9yJzogJyNzaGlwcGluZ196aXAnLFxuICAgICdzaGlwcGluZ19jb3VudHJ5X2ZpZWxkX3NlbGVjdG9yJyA6ICcjc2hpcHBpbmdfY291bnRyeScsXG4gICAgJ2NyZWF0ZV9tcF9zZWxlY3RvcicgOiAnI2NyZWF0ZW1wYWNjb3VudCcsXG4gICAgJ3Bhc3N3b3JkX3NlbGVjdG9yJyA6ICcubS1mb3JtLWl0ZW0tcGFzc3dvcmQnLFxuICAgICdhZGRpdGlvbmFsX2Ftb3VudF9maWVsZCcgOiAnI2FkZGl0aW9uYWxfZG9uYXRpb24nLFxuICAgICdzaGlwcGluZ19hbW91bnRfZmllbGQnOiAnW25hbWU9XCJzaGlwcGluZ19jb3N0XCJdJyxcbiAgICAnc2hpcHBpbmdfc2VsZWN0b3InIDogJ2ZpZWxkc2V0Lm0tc2hpcHBpbmctaW5mb3JtYXRpb24nLFxuICAgICdjaG9vc2VfcGF5bWVudCcgOiAnI2Nob29zZS1wYXltZW50LW1ldGhvZCcsXG4gICAgJ3BheW1lbnRfbWV0aG9kX3NlbGVjdG9yJyA6ICcucGF5bWVudC1tZXRob2QnLFxuICAgICdjY19udW1fc2VsZWN0b3InIDogJyNjYXJkLW51bWJlcicsXG4gICAgJ2NjX2V4cF9zZWxlY3RvcicgOiAnI2NhcmQtZXhwaXJ5JyxcbiAgICAnY2NfY3ZjX3NlbGVjdG9yJyA6ICcjY2FyZC1jdmMnLFxuICAgICdwYXlfYnV0dG9uX3NlbGVjdG9yJyA6ICcuYS1idXR0b24tcGF5JyxcbiAgICAnb3BwX2lkX3NlbGVjdG9yJyA6ICcjbG9ja19rZXknLCAvLyB3ZSB1c2UgdGhpcyB2YWx1ZSBhcyB0aGUgR29vZ2xlIEFuYWx5dGljcyB0cmFuc2FjdGlvbiBJRFxuICAgICduZXdzbGV0dGVyX2dyb3VwX3NlbGVjdG9yJyA6ICcuc3VwcG9ydC1uZXdzbGV0dGVycydcbiAgfTsgLy8gZW5kIGRlZmF1bHRzXG5cbiAgLy8gVGhlIGFjdHVhbCBwbHVnaW4gY29uc3RydWN0b3JcbiAgZnVuY3Rpb24gUGx1Z2luKCBlbGVtZW50LCBvcHRpb25zICkge1xuXG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcblxuICAgIC8vIGpRdWVyeSBoYXMgYW4gZXh0ZW5kIG1ldGhvZCB3aGljaCBtZXJnZXMgdGhlIGNvbnRlbnRzIG9mIHR3byBvclxuICAgIC8vIG1vcmUgb2JqZWN0cywgc3RvcmluZyB0aGUgcmVzdWx0IGluIHRoZSBmaXJzdCBvYmplY3QuIFRoZSBmaXJzdCBvYmplY3RcbiAgICAvLyBpcyBnZW5lcmFsbHkgZW1wdHkgYXMgd2UgZG9uJ3Qgd2FudCB0byBhbHRlciB0aGUgZGVmYXVsdCBvcHRpb25zIGZvclxuICAgIC8vIGZ1dHVyZSBpbnN0YW5jZXMgb2YgdGhlIHBsdWdpblxuICAgIHRoaXMub3B0aW9ucyA9ICQuZXh0ZW5kKCB7fSwgZGVmYXVsdHMsIG9wdGlvbnMgKTtcblxuICAgIHRoaXMuX2RlZmF1bHRzID0gZGVmYXVsdHM7XG4gICAgdGhpcy5fbmFtZSA9IHBsdWdpbk5hbWU7XG5cbiAgICB0aGlzLmluaXQoKTtcbiAgfSAvLyBlbmQgY29uc3RydWN0b3JcblxuICBQbHVnaW4ucHJvdG90eXBlID0ge1xuXG4gICAgaW5pdDogZnVuY3Rpb24ocmVzZXQsIGFtb3VudCkge1xuXG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoICduby1qcycgKTtcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCggJ2pzJyApO1xuXG4gICAgICAvLyBQbGFjZSBpbml0aWFsaXphdGlvbiBsb2dpYyBoZXJlXG4gICAgICAvLyBZb3UgYWxyZWFkeSBoYXZlIGFjY2VzcyB0byB0aGUgRE9NIGVsZW1lbnQgYW5kXG4gICAgICAvLyB0aGUgb3B0aW9ucyB2aWEgdGhlIGluc3RhbmNlLCBlLmcuIHRoaXMuZWxlbWVudFxuICAgICAgLy8gYW5kIHRoaXMub3B0aW9uc1xuICAgICAgLy8geW91IGNhbiBhZGQgbW9yZSBmdW5jdGlvbnMgbGlrZSB0aGUgb25lIGJlbG93IGFuZFxuICAgICAgLy8gY2FsbCB0aGVtIGxpa2Ugc286IHRoaXMueW91ck90aGVyRnVuY3Rpb24odGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpLlxuXG4gICAgICAvLyBtb2RpZnkgb3B0aW9ucyBhcyBuZWVkZWRcbiAgICAgIC8vdmFyIHRoaXMub3B0aW9ucy5hbW91bnQgPSAnJztcbiAgICAgIGlmIChyZXNldCAhPT0gdHJ1ZSkge1xuICAgICAgICB0aGlzLm9wdGlvbnMuYW1vdW50ID0gcGFyc2VGbG9hdCgkKHRoaXMub3B0aW9ucy5sZXZlbF9hbW91bnRfc2VsZWN0b3IsIHRoaXMuZWxlbWVudCkudGV4dCgpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5hbW91bnQgPSBhbW91bnQ7XG4gICAgICB9XG4gICAgICB0aGlzLm9wdGlvbnMub3JpZ2luYWxfYW1vdW50ICAgICA9IHBhcnNlSW50KCQodGhpcy5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudF9zZWxlY3RvciwgdGhpcy5lbGVtZW50KS52YWwoKSwgMTApO1xuICAgICAgdGhpcy5vcHRpb25zLnByb2Nlc3NpbmdfZmVlICAgICAgPSAoTWF0aC5yb3VuZChwYXJzZUZsb2F0KHRoaXMub3B0aW9ucy5mZWVfYW1vdW50KSpNYXRoLnBvdygxMCwyKSkvTWF0aC5wb3coMTAsMikpLnRvRml4ZWQoMik7XG4gICAgICB0aGlzLm9wdGlvbnMucHJvY2Vzc2luZ19mZWVfdGV4dCA9IHRoaXMub3B0aW9ucy5wcm9jZXNzaW5nX2ZlZTtcbiAgICAgIHRoaXMub3B0aW9ucy5jcmVhdGVfYWNjb3VudCAgICAgID0gZmFsc2U7XG5cbiAgICAgIHZhciBidXR0b25fdGV4dCA9ICQodGhpcy5vcHRpb25zLnBheV9idXR0b25fc2VsZWN0b3IpLnRleHQoKTtcbiAgICAgIHRoaXMub3B0aW9ucy5idXR0b25fdGV4dCA9IGJ1dHRvbl90ZXh0O1xuXG4gICAgICB0aGlzLnN0cmlwZSA9IFN0cmlwZSh0aGlzLm9wdGlvbnMuc3RyaXBlX3B1Ymxpc2hhYmxlX2tleSk7XG4gICAgICB0aGlzLmVsZW1lbnRzID0gdGhpcy5zdHJpcGUuZWxlbWVudHMoe1xuICAgICAgICBmb250czogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIC8vIGludGVncmF0ZSB5b3VyIGZvbnQgaW50byBzdHJpcGVcbiAgICAgICAgICAgIGNzc1NyYzogJ2h0dHBzOi8vdXNlLnR5cGVraXQubmV0L2N4ajdmemcuY3NzJyxcbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH0pO1xuXG4gICAgICBpZiAodGhpcy5vcHRpb25zLmRlYnVnID09PSB0cnVlKSB7XG4gICAgICAgIHRoaXMuZGVidWcodGhpcy5vcHRpb25zKTtcbiAgICAgICAgLy8gcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBjYWxsIGZ1bmN0aW9uc1xuICAgICAgdGhpcy5hbmFseXRpY3NUcmFja2luZyh0aGlzLm9wdGlvbnMpOyAvLyB0cmFjayBhbmFseXRpY3MgZXZlbnRzXG4gICAgICB0aGlzLmFtb3VudEFzUmFkaW8odGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBpZiB0aGUgYW1vdW50IGZpZWxkIGlzIGEgcmFkaW8gYnV0dG9uXG4gICAgICB0aGlzLmFtb3VudFVwZGF0ZWQodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBpZiB0aGUgYW1vdW50IHRleHQgZmllbGQgY2FuIGNoYW5nZVxuXG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMucGF5X2NjX3Byb2Nlc3Npbmdfc2VsZWN0b3IpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5jcmVkaXRDYXJkUHJvY2Vzc2luZ0ZlZXModGhpcy5vcHRpb25zKTsgLy8gcHJvY2Vzc2luZyBmZWVzXG4gICAgICB9XG4gICAgICBcbiAgICAgIC8vIHRoZSBtYWluIGZvcm0gSUQuIHRoaXMgaXMgbm90IHVzZWQgZm9yIGNhbmNlbGxpbmdcbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLmRvbmF0ZUFub255bW91c2x5KHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gYW5vbnltb3VzXG4gICAgICAgIHRoaXMuaG9ub3JPck1lbW9yeVRvZ2dsZSh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIGluIGhvbm9yIG9yIGluIG1lbW9yeSBvZiBzb21lb25lXG4gICAgICAgIHRoaXMub3V0c2lkZVVuaXRlZFN0YXRlcyh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIG91dHNpZGUgVVNcbiAgICAgICAgdGhpcy5zaGlwcGluZ0FkZHJlc3ModGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBzaGlwcGluZyBhZGRyZXNzXG4gICAgICAgIHRoaXMuYWxsb3dNaW5ucG9zdEFjY291bnQodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBvcHRpb24gZm9yIGNyZWF0aW5nIG1pbm5wb3N0IGFjY291bnRcbiAgICAgICAgdGhpcy5wYXltZW50UmVxdWVzdEJ1dHRvbih0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIGNyZWF0ZSBwYXltZW50cmVxdWVzdCBidXR0b25cbiAgICAgICAgdGhpcy5jaG9vc2VQYXltZW50TWV0aG9kKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gc3dpdGNoIGJldHdlZW4gY2FyZCBhbmQgYWNoXG4gICAgICAgIHRoaXMuY3JlZGl0Q2FyZEZpZWxkcyh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIGRvIHN0dWZmIHdpdGggdGhlIGNyZWRpdCBjYXJkIGZpZWxkc1xuICAgICAgICB0aGlzLnZhbGlkYXRlU2V0dXAodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBzZXR1cCBob3cgdmFsaWRhdGlvbiBlcnJvcnMgd29ya1xuICAgICAgICB0aGlzLmZvcm1TZXR1cCh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIHZhbGlkYXRlIGFuZCBzdWJtaXQgdGhlIGZvcm1cbiAgICAgIH1cblxuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmNvbmZpcm1fZm9ybV9zZWxlY3RvcikubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLnNob3dOZXdzbGV0dGVyU2V0dGluZ3ModGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpO1xuICAgICAgICB0aGlzLmNvbmZpcm1NZXNzYWdlU3VibWl0KHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gc3VibWl0IHRoZSBzdHVmZiBvbiB0aGUgY29uZmlybWF0aW9uIHBhZ2VcbiAgICAgIH1cblxuICAgIH0sIC8vIGluaXRcblxuICAgIGRlYnVnOiBmdW5jdGlvbihtZXNzYWdlKSB7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLmRlYnVnID09PSB0cnVlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgbWVzc2FnZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhtZXNzYWdlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmRpcihtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmRpcih0aGlzKTtcbiAgICAgIH1cbiAgICB9LCAvLyBkZWJ1Z1xuXG4gICAgYW5hbHl0aWNzVHJhY2tpbmc6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgIHRoaXMuZGVidWcoJ2FuYWx5dGljcyB0eXBlIGlzICcgKyBvcHRpb25zLmFuYWx5dGljc190eXBlKTtcbiAgICAgIHZhciBwcm9ncmVzcyA9ICQob3B0aW9ucy5wcm9ncmVzc19zZWxlY3Rvcik7XG4gICAgICB2YXIgc3RlcDtcbiAgICAgIHZhciBhY3Rpb24gPSAnY2hlY2tvdXQnO1xuICAgICAgdmFyIG5hdl9pdGVtX2NvdW50ID0gMDtcbiAgICAgIHZhciBvcHBfaWQgPSAkKG9wdGlvbnMub3BwX2lkX3NlbGVjdG9yKS52YWwoKTtcbiAgICAgIHZhciBwb3N0X3B1cmNoYXNlID0gZmFsc2U7XG4gICAgICBpZiAob3B0aW9ucy5hbmFseXRpY3NfdHlwZSA9PSAnYW5hbHl0aWNzanMnKSB7XG4gICAgICAgIGdhKCAncmVxdWlyZScsICdlYycgKTtcbiAgICAgIH1cbiAgICAgIGlmIChwcm9ncmVzcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIG5hdl9pdGVtX2NvdW50ID0gJCgnbGknLCBwcm9ncmVzcykubGVuZ3RoOyAvLyBsZW5ndGggaXMgbm90IHplcm8gYmFzZWRcbiAgICAgICAgc3RlcCA9ICQoJ2xpIC5hY3RpdmUnLCBwcm9ncmVzcykucGFyZW50KCkuaW5kZXgoKSArIDE7IC8vIGluZGV4IGlzIHplcm8gYmFzZWRcbiAgICAgIH1cbiAgICAgIC8vIHRoZXJlIGlzIGEgcHJvZ3Jlc3MgbWVudSwgQU5EIHRoZXJlIElTIE5PVCBhIGNvbmZpcm0gZm9ybSBzZWxlY3RvclxuICAgICAgLy8gaWYgdGhhdCBpcyB0aGUgY2FzZSwgd2UncmUgbm90IG9uIHRoZSBwdXJjaGFzZSBzdGVwXG4gICAgICBpZiAocHJvZ3Jlc3MubGVuZ3RoID4gMCAmJiAkKG9wdGlvbnMuY29uZmlybV9mb3JtX3NlbGVjdG9yKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgLy8gdGhlIGFjdGl2ZSB0YWIgbWF0Y2hlcyB0aGUgY291bnQgb2YgaXRlbXMgQU5EIHRoZXJlIGlzIE5PVCBhIGNvbmZpcm0gZm9ybSB0byBiZSBzdWJtaXR0ZWRcbiAgICAgICAgLy8gdGhhdCBtZWFucyB3ZSdyZSBvbiBhIHBvc3QgcHVyY2hhc2Ugc3RlcC5cbiAgICAgICAgaWYgKHN0ZXAgPT09IG5hdl9pdGVtX2NvdW50ICYmICQob3B0aW9ucy5jb25maXJtX2Zvcm1fc2VsZWN0b3IpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHN0ZXAgPSBzdGVwICsgMTtcbiAgICAgICAgICBwb3N0X3B1cmNoYXNlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChwcm9ncmVzcy5sZW5ndGggPiAwICYmICQob3B0aW9ucy5jb25maXJtX2Zvcm1fc2VsZWN0b3IpLmxlbmd0aCA+IDAgfHwgJChvcHRpb25zLmZpbmlzaF9zZWN0aW9uX3NlbGVjdG9yKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIC8vIHdlIGFyZSBvbiB0aGUgY29uZmlybSBmb3JtIHNlbGVjdG9yIGFuZCB0aGVyZSBpcyBhIHByb2dyZXNzIG1lYXN1cmVcbiAgICAgICAgLy8gT1IsIHdlIGFyZSBvbiB0aGUgZmluaXNoIHNlbGVjdG9yIGFuZCB0aGVyZSBpcyBOT1QgYSBwcm9ncmVzcyBtZWFzdXJlXG4gICAgICAgIC8vIHRoZXNlIG1lYW4gdGhlIHVzZXIganVzdCBwdXJjaGFzZWQuXG4gICAgICAgIGFjdGlvbiA9ICdwdXJjaGFzZSc7XG4gICAgICB9IGVsc2UgaWYgKHByb2dyZXNzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLmRlYnVnKCAnc3RlcCBpcyAnICsgc3RlcCArICcgYW5kIG5hdiBpdGVtIGNvdW50IGlzICcgKyBuYXZfaXRlbV9jb3VudCArICcgYW5kIG9wcCBpZCBpcyAnICsgb3BwX2lkICsgJyBhbmQgcG9zdCBwdXJjaGFzZSBpcyAnICsgcG9zdF9wdXJjaGFzZSApO1xuICAgICAgdGhpcy5hbmFseXRpY3NUcmFja2luZ1N0ZXAoc3RlcCwgYWN0aW9uLCBwb3N0X3B1cmNoYXNlKTtcbiAgICB9LCAvLyBhbmFseXRpY3NUcmFja2luZ1xuXG4gICAgYW5hbHl0aWNzVHJhY2tpbmdTdGVwOiBmdW5jdGlvbihzdGVwLCBhY3Rpb24sIHBvc3RfcHVyY2hhc2UpIHtcbiAgICAgIHZhciBwcm9ncmVzcyA9ICQodGhpcy5vcHRpb25zLnByb2dyZXNzX3NlbGVjdG9yKTtcbiAgICAgIHZhciBhbW91bnQgPSAkKHRoaXMub3B0aW9ucy5vcmlnaW5hbF9hbW91bnRfc2VsZWN0b3IpLnZhbCgpO1xuICAgICAgdmFyIG9wcF9pZCA9ICQodGhpcy5vcHRpb25zLm9wcF9pZF9zZWxlY3RvcikudmFsKCk7XG4gICAgICB2YXIgaW5zdGFsbG1lbnRfcGVyaW9kID0gJ29uZS10aW1lJztcbiAgICAgIHZhciBsZXZlbDtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5pbnN0YWxsbWVudF9wZXJpb2Rfc2VsZWN0b3IpLmxlbmd0aCA+IDAgKSB7XG4gICAgICAgIGluc3RhbGxtZW50X3BlcmlvZCA9ICQodGhpcy5vcHRpb25zLmluc3RhbGxtZW50X3BlcmlvZF9zZWxlY3RvcikudmFsKCk7XG4gICAgICB9XG4gICAgICAvLyBpZiB3ZSdyZSBub3QgYWZ0ZXIgdGhlIHB1cmNoYXNlLCB1c2UgYWRkUHJvZHVjdFxuICAgICAgLy9pZiAocHJvZ3Jlc3MubGVuZ3RoID4gMCAmJiBwb3N0X3B1cmNoYXNlICE9PSB0cnVlKSB7XG4gICAgICBpZiAocHJvZ3Jlc3MubGVuZ3RoID4gMCkge1xuICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICBhbW91bnQ6IGFtb3VudCxcbiAgICAgICAgICBpbnN0YWxsbWVudF9wZXJpb2Q6IGluc3RhbGxtZW50X3BlcmlvZFxuICAgICAgICB9O1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIHVybDogJy9jYWxjdWxhdGUtbWVtYmVyLWxldmVsLycsXG4gICAgICAgICAgZGF0YTogZGF0YVxuICAgICAgICB9KS5kb25lKGZ1bmN0aW9uKCBkYXRhICkge1xuICAgICAgICAgIGlmICgkKGRhdGEubGV2ZWwpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxldmVsID0gZGF0YS5sZXZlbC5sZXZlbDtcbiAgICAgICAgICAgIHRoYXQuZGVidWcoJ2NyZWF0ZSBwcm9kdWN0IG9iamVjdDogaWQgaXMgJyArICdtaW5ucG9zdF8nICsgbGV2ZWwudG9Mb3dlckNhc2UoKSArICdfbWVtYmVyc2hpcCcgKyAnIGFuZCBuYW1lIGlzICcgKyAnTWlublBvc3QgJyArIGxldmVsLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgbGV2ZWwuc2xpY2UoMSkgKyAnIE1lbWJlcnNoaXAnICsgJyBhbmQgdmFyaWFudCBpcyAnICsgaW5zdGFsbG1lbnRfcGVyaW9kLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgaW5zdGFsbG1lbnRfcGVyaW9kLnNsaWNlKDEpKTtcbiAgICAgICAgICAgIHZhciBwcm9kdWN0ID0ge1xuICAgICAgICAgICAgICAnaWQnOiAnbWlubnBvc3RfJyArIGxldmVsLnRvTG93ZXJDYXNlKCkgKyAnX21lbWJlcnNoaXAnLFxuICAgICAgICAgICAgICAnbmFtZSc6ICdNaW5uUG9zdCAnICsgbGV2ZWwuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBsZXZlbC5zbGljZSgxKSArICcgTWVtYmVyc2hpcCcsXG4gICAgICAgICAgICAgICdjYXRlZ29yeSc6ICdEb25hdGlvbicsXG4gICAgICAgICAgICAgICdicmFuZCc6ICdNaW5uUG9zdCcsXG4gICAgICAgICAgICAgICd2YXJpYW50JzogaW5zdGFsbG1lbnRfcGVyaW9kLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgaW5zdGFsbG1lbnRfcGVyaW9kLnNsaWNlKDEpLFxuICAgICAgICAgICAgICAncHJpY2UnOiB0aGF0LmdldFRvdGFsQW1vdW50KGFtb3VudCksXG4gICAgICAgICAgICAgICdxdWFudGl0eSc6IDFcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAodGhhdC5vcHRpb25zLmFuYWx5dGljc190eXBlID09ICdndGFnanMnKSB7XG4gICAgICAgICAgICAgIGd0YWcoJ2V2ZW50JywgJ2NoZWNrb3V0X3Byb2dyZXNzJywge1xuICAgICAgICAgICAgICAgIFwidmFsdWVcIjogdGhhdC5nZXRUb3RhbEFtb3VudChhbW91bnQpLFxuICAgICAgICAgICAgICAgIFwiaXRlbXNcIjogW3Byb2R1Y3RdLFxuICAgICAgICAgICAgICAgIFwiY2hlY2tvdXRfc3RlcFwiOiBzdGVwLFxuICAgICAgICAgICAgICAgIFwiY2hlY2tvdXRfb3B0aW9uXCI6IGFjdGlvbixcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoYXQub3B0aW9ucy5hbmFseXRpY3NfdHlwZSA9PSAnYW5hbHl0aWNzanMnKSB7XG4gICAgICAgICAgICAgIGdhKCdlYzphZGRQcm9kdWN0JywgcHJvZHVjdCk7XG4gICAgICAgICAgICAgIGdhKCdlYzpzZXRBY3Rpb24nLCAnY2hlY2tvdXQnLCB7XG4gICAgICAgICAgICAgICAgJ3N0ZXAnOiBzdGVwLFxuICAgICAgICAgICAgICAgICdvcHRpb24nOiBhY3Rpb25cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChhY3Rpb24gPT09ICdwdXJjaGFzZScpIHtcbiAgICAgICAgICAgICAgdGhhdC5kZWJ1ZygnYWRkIGEgcHVyY2hhc2UgYWN0aW9uLiBzdGVwIGlzICcgKyBzdGVwICsgJyBhbmQgYWN0aW9uIGlzICcgKyBhY3Rpb24pO1xuICAgICAgICAgICAgICBpZiAodGhhdC5vcHRpb25zLmFuYWx5dGljc190eXBlID09ICdndGFnanMnKSB7XG4gICAgICAgICAgICAgICAgZ3RhZygnZXZlbnQnLCBhY3Rpb24sIHtcbiAgICAgICAgICAgICAgICAgIFwidHJhbnNhY3Rpb25faWRcIjogb3BwX2lkLCAvLyBUcmFuc2FjdGlvbiBpZCAtIFR5cGU6IHN0cmluZ1xuICAgICAgICAgICAgICAgICAgXCJhZmZpbGlhdGlvblwiOiAnTWlublBvc3QnLCAvLyBTdG9yZSBuYW1lIC0gVHlwZTogc3RyaW5nXG4gICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IHRoYXQuZ2V0VG90YWxBbW91bnQoYW1vdW50KSwgLy8gVG90YWwgUmV2ZW51ZSAtIFR5cGU6IG51bWVyaWNcbiAgICAgICAgICAgICAgICAgIFwiY3VycmVuY3lcIjogXCJVU0RcIixcbiAgICAgICAgICAgICAgICAgIFwiaXRlbXNcIjogW3Byb2R1Y3RdLFxuICAgICAgICAgICAgICAgICAgXCJjaGVja291dF9zdGVwXCI6IHN0ZXBcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGF0Lm9wdGlvbnMuYW5hbHl0aWNzX3R5cGUgPT0gJ2FuYWx5dGljc2pzJykge1xuICAgICAgICAgICAgICAgIGdhKCdlYzpzZXRBY3Rpb24nLCBhY3Rpb24sIHtcbiAgICAgICAgICAgICAgICAgICdpZCc6IG9wcF9pZCwgLy8gVHJhbnNhY3Rpb24gaWQgLSBUeXBlOiBzdHJpbmdcbiAgICAgICAgICAgICAgICAgICdhZmZpbGlhdGlvbic6ICdNaW5uUG9zdCcsIC8vIFN0b3JlIG5hbWUgLSBUeXBlOiBzdHJpbmdcbiAgICAgICAgICAgICAgICAgICdyZXZlbnVlJzogYW1vdW50LCAvLyBUb3RhbCBSZXZlbnVlIC0gVHlwZTogbnVtZXJpY1xuICAgICAgICAgICAgICAgICAgJ3N0ZXAnOiBzdGVwXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgXG4gICAgICAgICAgICBpZiAodGhhdC5vcHRpb25zLmFuYWx5dGljc190eXBlID09ICdndGFnanMnKSB7XG4gICAgICAgICAgICAgIGd0YWcoJ2V2ZW50JywgJ3BhZ2VfdmlldycsIHtcbiAgICAgICAgICAgICAgICBwYWdlX3RpdGxlOiBkb2N1bWVudC50aXRsZSxcbiAgICAgICAgICAgICAgICBwYWdlX3BhdGg6IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZVxuICAgICAgICAgICAgICB9KSAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoYXQub3B0aW9ucy5hbmFseXRpY3NfdHlwZSA9PSAnYW5hbHl0aWNzanMnKSB7XG4gICAgICAgICAgICAgIGdhKCdzZXQnLCB7XG4gICAgICAgICAgICAgICAgcGFnZTogd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLFxuICAgICAgICAgICAgICAgIHRpdGxlOiBkb2N1bWVudC50aXRsZVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgZ2EoJ3NlbmQnLCAncGFnZXZpZXcnLCB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgXG5cbiAgICB9LCAvLyBhbmFseXRpY3NUcmFja2luZ1N0ZXBcblxuICAgIGFtb3VudEFzUmFkaW86IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIC8vIHdoZW4gYW1vdW50IGZpZWxkIGlzIGEgcmFkaW8gYnV0dG9uLCB3ZSBuZWVkIHRvIGNoZWNrIGl0IHdoZW5ldmVyIGl0IGNoYW5nZXNcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHRoYXQuc2V0UmFkaW9BbW91bnQoJChvcHRpb25zLm9yaWdpbmFsX2Ftb3VudF9zZWxlY3RvciwgZWxlbWVudCksIGVsZW1lbnQsIG9wdGlvbnMpO1xuICAgICAgJChvcHRpb25zLm9yaWdpbmFsX2Ftb3VudF9zZWxlY3RvciwgZWxlbWVudCkuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGF0LnNldFJhZGlvQW1vdW50KCQodGhpcyksIGVsZW1lbnQsIG9wdGlvbnMpO1xuICAgICAgfSk7XG4gICAgfSwgLy8gYW1vdW50QXNSYWRpb1xuXG4gICAgc2V0UmFkaW9BbW91bnQ6IGZ1bmN0aW9uKGZpZWxkLCBlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB2YXIgc3RyaXBlX3BheW1lbnRfdHlwZSA9IHRoYXQuZ2V0U3RyaXBlUGF5bWVudFR5cGUoKTtcbiAgICAgIHZhciBhbW91bnQgPSAkKG9wdGlvbnMub3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yICsgJzpjaGVja2VkJywgZWxlbWVudCkudmFsKCk7XG4gICAgICBpZiAoZmllbGQuaXMoJzpyYWRpbycpICYmIHR5cGVvZiBhbW91bnQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIG9wdGlvbnMub3JpZ2luYWxfYW1vdW50ID0gcGFyc2VJbnQoYW1vdW50LCAxMCk7XG4gICAgICAgIHRoYXQuY2FsY3VsYXRlRmVlcyh0aGF0Lm9wdGlvbnMub3JpZ2luYWxfYW1vdW50LCBzdHJpcGVfcGF5bWVudF90eXBlKTtcbiAgICAgICAgdGhhdC5zZXRGYWlyTWFya2V0VmFsdWUoZmllbGQpO1xuICAgICAgfVxuICAgIH0sIC8vIHNldFJhZGlvQW1vdW50XG5cbiAgICBhbW91bnRVcGRhdGVkOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICAvLyB3aGVuIG5ldyBhbW91bnQgdGV4dCBmaWVsZCBjYW4gY2hhbmdlLCB3ZSBuZWVkIHRvIGNoYW5nZSB0aGUgaGlkZGVuIGZpZWxkXG4gICAgICAvLyB0aGVyZSBpcyBhbHNvIHBvdGVudGlhbGx5IGFuIGFkZGl0aW9uYWwgYW1vdW50IGZpZWxkIHZhbHVlIHRvIGFkZFxuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdmFyIHN0cmlwZV9wYXltZW50X3R5cGUgPSB0aGF0LmdldFN0cmlwZVBheW1lbnRUeXBlKCk7XG5cbiAgICAgIC8vIHNldCB0aGUgZmFpciBtYXJrZXQgdmFsdWUgaWYgYXBwbGljYWJsZVxuICAgICAgdmFyIGFtb3VudF9zZWxlY3Rvcl9mYWlyX21hcmtldCA9ICQob3B0aW9ucy5vcmlnaW5hbF9hbW91bnRfc2VsZWN0b3IsIGVsZW1lbnQpO1xuICAgICAgaWYgKGFtb3VudF9zZWxlY3Rvcl9mYWlyX21hcmtldC5pcygnOnJhZGlvJykpIHtcbiAgICAgICAgYW1vdW50X3NlbGVjdG9yX2ZhaXJfbWFya2V0ID0gJChvcHRpb25zLm9yaWdpbmFsX2Ftb3VudF9zZWxlY3RvciArICc6Y2hlY2tlZCcsIGVsZW1lbnQpO1xuICAgICAgfVxuICAgICAgdGhhdC5zZXRGYWlyTWFya2V0VmFsdWUoYW1vdW50X3NlbGVjdG9yX2ZhaXJfbWFya2V0KTtcblxuICAgICAgJChvcHRpb25zLm9yaWdpbmFsX2Ftb3VudF9zZWxlY3RvciwgZWxlbWVudCkuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGF0Lm9wdGlvbnMub3JpZ2luYWxfYW1vdW50ID0gcGFyc2VJbnQoJCh0aGlzLCBlbGVtZW50KS52YWwoKSwgMTApO1xuICAgICAgICB0aGF0LmNhbGN1bGF0ZUZlZXModGhhdC5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCwgc3RyaXBlX3BheW1lbnRfdHlwZSk7XG4gICAgICAgIHRoYXQuc2V0RmFpck1hcmtldFZhbHVlKCQodGhpcywgZWxlbWVudCkpO1xuICAgICAgfSk7XG4gICAgICAkKG9wdGlvbnMuYWRkaXRpb25hbF9hbW91bnRfZmllbGQsIGVsZW1lbnQpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgdGhhdC5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCA9IHBhcnNlSW50KCQob3B0aW9ucy5vcmlnaW5hbF9hbW91bnRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLCAxMCk7XG4gICAgICAgIHRoYXQuY2FsY3VsYXRlRmVlcyh0aGF0Lm9wdGlvbnMub3JpZ2luYWxfYW1vdW50LCBzdHJpcGVfcGF5bWVudF90eXBlKTtcbiAgICAgIH0pO1xuICAgICAgJChvcHRpb25zLmdpZnRfZGVsaXZlcnlfbWV0aG9kX3NlbGVjdG9yLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoYXQub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQgPSBwYXJzZUludCgkKG9wdGlvbnMub3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSwgMTApO1xuICAgICAgICB0aGF0LmNhbGN1bGF0ZUZlZXModGhhdC5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCwgc3RyaXBlX3BheW1lbnRfdHlwZSk7XG4gICAgICB9KTtcblxuICAgIH0sIC8vIGFtb3VudFVwZGF0ZWRcblxuICAgIGdldFRvdGFsQW1vdW50OiBmdW5jdGlvbihhbW91bnQpIHtcbiAgICAgIGFtb3VudCA9ICh0eXBlb2YgYW1vdW50ICE9PSAndW5kZWZpbmVkJykgPyAgYW1vdW50IDogdGhpcy5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudDtcbiAgICAgIHZhciB0b3RhbF9hbW91bnQgPSBhbW91bnQ7XG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuYWRkaXRpb25hbF9hbW91bnRfZmllbGQpLmxlbmd0aCA+IDAgJiYgJCh0aGlzLm9wdGlvbnMuYWRkaXRpb25hbF9hbW91bnRfZmllbGQpLnZhbCgpID4gMCkge1xuICAgICAgICB2YXIgYWRkaXRpb25hbF9hbW91bnQgPSAkKHRoaXMub3B0aW9ucy5hZGRpdGlvbmFsX2Ftb3VudF9maWVsZCkudmFsKCk7XG4gICAgICAgIHRvdGFsX2Ftb3VudCA9IHBhcnNlSW50KGFkZGl0aW9uYWxfYW1vdW50LCAxMCkgKyBwYXJzZUludChhbW91bnQsIDEwKTsgXG4gICAgICB9XG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuc2hpcHBpbmdfYW1vdW50X2ZpZWxkKS5sZW5ndGggPiAwICYmICQodGhpcy5vcHRpb25zLnNoaXBwaW5nX2Ftb3VudF9maWVsZCkudmFsKCkgPiAwKSB7XG4gICAgICAgIHZhciBzaGlwcGluZ19hbW91bnQgPSAkKHRoaXMub3B0aW9ucy5zaGlwcGluZ19hbW91bnRfZmllbGQpLnZhbCgpO1xuICAgICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuZ2lmdF9kZWxpdmVyeV9tZXRob2Rfc2VsZWN0b3IgKyAnOmNoZWNrZWQnKS52YWwoKSA9PT0gJ3NoaXBwaW5nJykge1xuICAgICAgICAgIHRvdGFsX2Ftb3VudCA9IHBhcnNlSW50KHNoaXBwaW5nX2Ftb3VudCwgMTApICsgcGFyc2VJbnQodG90YWxfYW1vdW50LCAxMCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdG90YWxfYW1vdW50ID0gcGFyc2VJbnQodG90YWxfYW1vdW50LCAxMCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB0b3RhbF9hbW91bnQ7XG4gICAgfSwgLy8gZ2V0VG90YWxBbW91bnRcblxuICAgIHNldEZhaXJNYXJrZXRWYWx1ZTogZnVuY3Rpb24oYW1vdW50X3NlbGVjdG9yKSB7XG4gICAgICAvLyBpZiB0aGVyZSBpcyBhIGZhaXIgbWFya2V0IHZhbHVlIGZpZWxkIGFuZCB0aGVyZSBpcyBhIGZhaXItbWFya2V0LXZhbHVlIGRhdGEgYXR0cmlidXRlXG4gICAgICAvLyBjaGVjayBhbmQgc2VlIGlmIHdlIGNhbiBwb3B1bGF0ZSB0aGUgZmllbGQgd2l0aCB0aGUgZGF0YSBhdHRyaWJ1dGVcbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5mYWlyX21hcmtldF92YWx1ZV9zZWxlY3RvcikubGVuZ3RoID4gMCAmJiB0eXBlb2YgYW1vdW50X3NlbGVjdG9yLmRhdGEoJ2ZhaXItbWFya2V0LXZhbHVlJykgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHZhciBmYWlyTWFya2V0VmFsdWUgPSBhbW91bnRfc2VsZWN0b3IuZGF0YSgnZmFpci1tYXJrZXQtdmFsdWUnKTtcbiAgICAgICAgJCh0aGlzLm9wdGlvbnMuZmFpcl9tYXJrZXRfdmFsdWVfc2VsZWN0b3IpLnZhbChmYWlyTWFya2V0VmFsdWUpO1xuICAgICAgfVxuICAgIH0sIC8vIHNldEZhaXJNYXJrZXRWYWx1ZVxuXG4gICAgY2FsY3VsYXRlRmVlczogZnVuY3Rpb24oYW1vdW50LCBzdHJpcGVfcGF5bWVudF90eXBlKSB7XG4gICAgICAvLyB0aGlzIHNlbmRzIHRoZSBhbW91bnQgYW5kIHN0cmlwZSBwYXltZW50IHR5cGUgdG8gcHl0aG9uOyBnZXQgdGhlIGZlZSBhbmQgZGlzcGxheSBpdCB0byB0aGUgdXNlciBvbiB0aGUgY2hlY2tib3ggbGFiZWxcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHZhciB0b3RhbF9hbW91bnQgPSB0aGF0LmdldFRvdGFsQW1vdW50KGFtb3VudCk7XG4gICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgYW1vdW50OiB0b3RhbF9hbW91bnQsXG4gICAgICAgIHN0cmlwZV9wYXltZW50X3R5cGU6IHN0cmlwZV9wYXltZW50X3R5cGVcbiAgICAgIH07XG4gICAgICB0aGF0LnNldFN0cmlwZVBheW1lbnRUeXBlKHN0cmlwZV9wYXltZW50X3R5cGUpO1xuICAgICAgJC5hamF4KHtcbiAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgIHVybDogJy9jYWxjdWxhdGUtZmVlcy8nLFxuICAgICAgICBkYXRhOiBkYXRhXG4gICAgICB9KS5kb25lKGZ1bmN0aW9uKCBkYXRhICkge1xuICAgICAgICBpZiAoJChkYXRhLmZlZXMpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAkKHRoYXQub3B0aW9ucy5mZWVfYW1vdW50KS50ZXh0KHBhcnNlRmxvYXQoZGF0YS5mZWVzKS50b0ZpeGVkKDIpKTtcbiAgICAgICAgICB0aGF0LmNyZWRpdENhcmRGZWVDaGVja2JveCgkKHRoYXQub3B0aW9ucy5wYXlfY2NfcHJvY2Vzc2luZ19zZWxlY3RvcikpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LCAvLyBjYWxjdWxhdGVGZWVzXG5cbiAgICBjcmVkaXRDYXJkUHJvY2Vzc2luZ0ZlZXM6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgIC8vIHRoaXMgYWRkcyBvciBzdWJ0cmFjdHMgdGhlIGZlZSB0byB0aGUgb3JpZ2luYWwgYW1vdW50IHdoZW4gdGhlIHVzZXIgaW5kaWNhdGVzIHRoZXkgZG8gb3IgZG8gbm90IHdhbnQgdG8gcGF5IHRoZSBmZWVzXG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB0aGF0LmNyZWRpdENhcmRGZWVDaGVja2JveCgkKG9wdGlvbnMucGF5X2NjX3Byb2Nlc3Npbmdfc2VsZWN0b3IpKTtcbiAgICAgICQob3B0aW9ucy5wYXlfY2NfcHJvY2Vzc2luZ19zZWxlY3Rvcikub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB0aGF0LmNyZWRpdENhcmRGZWVDaGVja2JveCh0aGlzKTtcbiAgICAgIH0pO1xuICAgIH0sIC8vIGNyZWRpdENhcmRQcm9jZXNzaW5nRmVlc1xuXG4gICAgZ2V0U3RyaXBlUGF5bWVudFR5cGU6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHN0cmlwZV9wYXltZW50X3R5cGUgPSAnY2FyZCc7XG4gICAgICBpZiAoJCgnaW5wdXRbbmFtZT1cInN0cmlwZV9wYXltZW50X3R5cGVcIl0nKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHN0cmlwZV9wYXltZW50X3R5cGUgPSAkKCdpbnB1dFtuYW1lPVwic3RyaXBlX3BheW1lbnRfdHlwZVwiXScpLnZhbCgpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHN0cmlwZV9wYXltZW50X3R5cGU7XG4gICAgfSwgLy8gZ2V0U3RyaXBlUGF5bWVudFR5cGVcblxuICAgIHNldFN0cmlwZVBheW1lbnRUeXBlOiBmdW5jdGlvbihzdHJpcGVfcGF5bWVudF90eXBlKSB7XG4gICAgICBpZiAoJCgnaW5wdXRbbmFtZT1cInN0cmlwZV9wYXltZW50X3R5cGVcIl0nKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgJCh0aGlzLm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLmFwcGVuZCgnPGlucHV0IHR5cGU9XFxcImhpZGRlblxcXCIgbmFtZT1cXFwic3RyaXBlX3BheW1lbnRfdHlwZVxcXCI+Jyk7XG4gICAgICB9XG4gICAgICAkKCdpbnB1dFtuYW1lPVwic3RyaXBlX3BheW1lbnRfdHlwZVwiXScpLnZhbChzdHJpcGVfcGF5bWVudF90eXBlKTtcbiAgICAgIHJldHVybiBzdHJpcGVfcGF5bWVudF90eXBlO1xuICAgIH0sIC8vIHNldFN0cmlwZVBheW1lbnRUeXBlXG5cbiAgICBjcmVkaXRDYXJkRmVlQ2hlY2tib3g6IGZ1bmN0aW9uKGZpZWxkKSB7XG4gICAgICB2YXIgZnVsbF9hbW91bnQ7XG4gICAgICB2YXIgdG90YWxfYW1vdW50ID0gdGhpcy5nZXRUb3RhbEFtb3VudCgpO1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgaWYgKCQoZmllbGQpLmlzKCc6Y2hlY2tlZCcpIHx8ICQoZmllbGQpLnByb3AoJ2NoZWNrZWQnKSkge1xuICAgICAgICAkKCcuYW1vdW50IC5sZXZlbC1hbW91bnQnKS5hZGRDbGFzcygnZnVsbC1hbW91bnQnKTtcbiAgICAgICAgZnVsbF9hbW91bnQgPSAodG90YWxfYW1vdW50ICsgcGFyc2VGbG9hdCgkKHRoYXQub3B0aW9ucy5mZWVfYW1vdW50KS50ZXh0KCkpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZ1bGxfYW1vdW50ID0gdG90YWxfYW1vdW50O1xuICAgICAgfVxuICAgICAgZnVsbF9hbW91bnQgPSBwYXJzZUZsb2F0KGZ1bGxfYW1vdW50KS50b0ZpeGVkKDIpO1xuICAgICAgJCh0aGF0Lm9wdGlvbnMuZnVsbF9hbW91bnRfc2VsZWN0b3IpLnRleHQoZnVsbF9hbW91bnQpO1xuXG4gICAgICAvLyB1cGRhdGUgdGhlIHBheW1lbnQgcmVxdWVzdFxuICAgICAgaWYgKHRoaXMucGF5bWVudFJlcXVlc3QgJiYgZnVsbF9hbW91bnQpIHtcbiAgICAgICAgdGhpcy5wYXltZW50UmVxdWVzdC51cGRhdGUoe1xuICAgICAgICAgIHRvdGFsOiB7XG4gICAgICAgICAgICBsYWJlbDogXCJNaW5uUG9zdFwiLFxuICAgICAgICAgICAgYW1vdW50OiBmdWxsX2Ftb3VudCAqIDEwMFxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICB9LCAvLyBjcmVkaXRDYXJkRmVlQ2hlY2tib3hcblxuICAgIGRvbmF0ZUFub255bW91c2x5OiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB0aGF0LnRvZ2dsZUFub255bW91cygkKG9wdGlvbnMuYW5vbnltb3VzX3NlbGVjdG9yLCBlbGVtZW50KSk7XG4gICAgICAkKG9wdGlvbnMuYW5vbnltb3VzX3NlbGVjdG9yLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoYXQudG9nZ2xlQW5vbnltb3VzKCQodGhpcykpO1xuICAgICAgfSk7XG4gICAgfSwgLy8gZG9uYXRlQW5vbnltb3VzbHlcblxuICAgIHRvZ2dsZUFub255bW91czogZnVuY3Rpb24oZWxlbWVudCkge1xuICAgICAgaWYgKGVsZW1lbnQuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgJCh0aGlzLm9wdGlvbnMubmFtZV9zZWxlY3RvciArICcgZGl2OmZpcnN0JywgdGhpcy5lbGVtZW50KS5oaWRlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkKHRoaXMub3B0aW9ucy5uYW1lX3NlbGVjdG9yICsgJyBkaXY6Zmlyc3QnLCB0aGlzLmVsZW1lbnQpLnNob3coKTtcbiAgICAgIH1cbiAgICB9LCAvLyB0b2dnbGVBbm9ueW1vdXNcblxuICAgIGhvbm9yT3JNZW1vcnk6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIGlmICgkKG9wdGlvbnMuaG9ub3Jfb3JfbWVtb3J5X2Nob29zZXIgKyAnOmNoZWNrZWQnKS52YWwoKSkge1xuICAgICAgICAkKG9wdGlvbnMuaG9ub3JfbWVtb3J5X2lucHV0X2dyb3VwLCBlbGVtZW50KS5zaG93KCk7XG4gICAgICAgICQob3B0aW9ucy5ob25vcl90eXBlX3NlbGVjdG9yKS50ZXh0KCQob3B0aW9ucy5ob25vcl9vcl9tZW1vcnlfY2hvb3NlciArICc6Y2hlY2tlZCcpLnZhbCgpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQob3B0aW9ucy5ob25vcl9tZW1vcnlfaW5wdXRfZ3JvdXAsIGVsZW1lbnQpLmhpZGUoKTtcbiAgICAgICAgJChvcHRpb25zLmhvbm9yX25hbWVfc2VsZWN0b3IgKyAnIGlucHV0JywgZWxlbWVudCkudmFsKCcnKTtcbiAgICAgIH1cbiAgICB9LCAvLyBob25vck9yTWVtb3J5XG5cbiAgICBob25vck9yTWVtb3J5VG9nZ2xlOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB0aGF0Lmhvbm9yT3JNZW1vcnkodGhhdC5lbGVtZW50LCB0aGF0Lm9wdGlvbnMpO1xuICAgICAgJChvcHRpb25zLmhvbm9yX29yX21lbW9yeV9jaG9vc2VyLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoYXQuaG9ub3JPck1lbW9yeSh0aGF0LmVsZW1lbnQsIHRoYXQub3B0aW9ucyk7XG4gICAgICB9KTtcbiAgICB9LCAvLyBob25vck9yTWVtb3J5VG9nZ2xlXG5cbiAgICBvdXRzaWRlVW5pdGVkU3RhdGVzOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAkKG9wdGlvbnMuc2hvd19iaWxsaW5nX2NvdW50cnlfc2VsZWN0b3IpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGF0LmNoYW5nZUZpZWxkc091dHNpZGVVUygnYmlsbGluZycsIGVsZW1lbnQsIG9wdGlvbnMpO1xuICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmhpZGUoKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSk7XG4gICAgICAkKG9wdGlvbnMuc2hvd19zaGlwcGluZ19jb3VudHJ5X3NlbGVjdG9yKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgJChvcHRpb25zLnNoaXBwaW5nX2NvdW50cnlfc2VsZWN0b3IpLnNob3coKTtcbiAgICAgICAgdGhhdC5jaGFuZ2VGaWVsZHNPdXRzaWRlVVMoJ3NoaXBwaW5nJywgZWxlbWVudCwgb3B0aW9ucyk7XG4gICAgICAgICQodGhpcykucGFyZW50KCkuaGlkZSgpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9LCAvLyBvdXRzaWRlVW5pdGVkU3RhdGVzXG5cbiAgICBjaGFuZ2VGaWVsZHNPdXRzaWRlVVM6IGZ1bmN0aW9uKGJpbGxpbmdfb3Jfc2hpcHBpbmcsIGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIGlmICggYmlsbGluZ19vcl9zaGlwcGluZyA9PT0gJ2JpbGxpbmcnICkge1xuICAgICAgICB2YXIgemlwX3BhcmVudCA9ICQob3B0aW9ucy5iaWxsaW5nX3ppcF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkucGFyZW50KCk7XG4gICAgICAgIHZhciBzdGF0ZV9wYXJlbnQgPSAkKG9wdGlvbnMuYmlsbGluZ19zdGF0ZV9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkucGFyZW50KCk7XG4gICAgICAgICQob3B0aW9ucy5iaWxsaW5nX2NvdW50cnlfc2VsZWN0b3IpLnNob3coKTtcbiAgICAgICAgJChvcHRpb25zLmJpbGxpbmdfemlwX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5hdHRyKCd0eXBlJywgJ3RleHQnKTtcbiAgICAgICAgJChvcHRpb25zLmJpbGxpbmdfemlwX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgICAgJChvcHRpb25zLmJpbGxpbmdfc3RhdGVfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuICAgICAgICAkKCdsYWJlbCcsIHppcF9wYXJlbnQpLnRleHQoJ1Bvc3RhbCBDb2RlOicpO1xuICAgICAgICAkKCdsYWJlbCcsIHN0YXRlX3BhcmVudCkudGV4dCgnUmVnaW9uOicpO1xuICAgICAgfSBlbHNlIGlmICggYmlsbGluZ19vcl9zaGlwcGluZyA9PT0gJ3NoaXBwaW5nJyApIHtcbiAgICAgICAgdmFyIHppcF9wYXJlbnQgPSAkKG9wdGlvbnMuc2hpcHBpbmdfemlwX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKTtcbiAgICAgICAgdmFyIHN0YXRlX3BhcmVudCA9ICQob3B0aW9ucy5zaGlwcGluZ19zdGF0ZV9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkucGFyZW50KCk7XG4gICAgICAgICQob3B0aW9ucy5zaGlwcGluZ19jb3VudHJ5X3NlbGVjdG9yKS5zaG93KCk7XG4gICAgICAgICQob3B0aW9ucy5zaGlwcGluZ196aXBfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLmF0dHIoJ3R5cGUnLCAndGV4dCcpO1xuICAgICAgICAkKG9wdGlvbnMuc2hpcHBpbmdfemlwX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgICAgJChvcHRpb25zLnNoaXBwaW5nX3N0YXRlX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgICAgJCgnbGFiZWwnLCB6aXBfcGFyZW50KS50ZXh0KCdTaGlwcGluZyBQb3N0YWwgQ29kZTonKTtcbiAgICAgICAgJCgnbGFiZWwnLCBzdGF0ZV9wYXJlbnQpLnRleHQoJ1NoaXBwaW5nIFJlZ2lvbjonKTtcbiAgICAgIH1cbiAgICB9LCAvLyBjaGFuZ2VGaWVsZHNPdXRzaWRlVVNcblxuICAgIGNoYW5nZUZpZWxkc0luc2lkZVVTOiBmdW5jdGlvbihiaWxsaW5nX29yX3NoaXBwaW5nLCBlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICBpZiAoIGJpbGxpbmdfb3Jfc2hpcHBpbmcgPT09ICdiaWxsaW5nJyApIHtcbiAgICAgICAgdmFyIHppcF9wYXJlbnQgPSAkKG9wdGlvbnMuYmlsbGluZ196aXBfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpO1xuICAgICAgICB2YXIgc3RhdGVfcGFyZW50ID0gJChvcHRpb25zLmJpbGxpbmdfc3RhdGVfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpO1xuICAgICAgICAkKG9wdGlvbnMuYmlsbGluZ19jb3VudHJ5X3NlbGVjdG9yKS5zaG93KCk7XG4gICAgICAgICQob3B0aW9ucy5iaWxsaW5nX3ppcF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkuYXR0cigndHlwZScsICd0ZWwnKTtcbiAgICAgICAgJChvcHRpb25zLmJpbGxpbmdfemlwX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5wcm9wKCdyZXF1aXJlZCcsIHRydWUpO1xuICAgICAgICAkKG9wdGlvbnMuYmlsbGluZ19zdGF0ZV9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkucHJvcCgncmVxdWlyZWQnLCB0cnVlKTtcbiAgICAgICAgJCgnbGFiZWwnLCB6aXBfcGFyZW50KS5odG1sKCdaaXAgQ29kZTogPHNwYW4gY2xhc3M9XCJhLWZvcm0taXRlbS1yZXF1aXJlZFwiIHRpdGxlPVwiVGhpcyBmaWVsZCBpcyByZXF1aXJlZC5cIj4qPC9zcGFuPicpO1xuICAgICAgICAkKCdsYWJlbCcsIHN0YXRlX3BhcmVudCkuaHRtbCgnU3RhdGU6IDxzcGFuIGNsYXNzPVwiYS1mb3JtLWl0ZW0tcmVxdWlyZWRcIiB0aXRsZT1cIlRoaXMgZmllbGQgaXMgcmVxdWlyZWQuXCI+Kjwvc3Bhbj4nKTtcbiAgICAgIH0gZWxzZSBpZiAoIGJpbGxpbmdfb3Jfc2hpcHBpbmcgPT09ICdzaGlwcGluZycgKSB7XG4gICAgICAgIHZhciB6aXBfcGFyZW50ID0gJChvcHRpb25zLnNoaXBwaW5nX3ppcF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkucGFyZW50KCk7XG4gICAgICAgIHZhciBzdGF0ZV9wYXJlbnQgPSAkKG9wdGlvbnMuc2hpcHBpbmdfc3RhdGVfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpO1xuICAgICAgICAkKG9wdGlvbnMuc2hpcHBpbmdfY291bnRyeV9zZWxlY3Rvcikuc2hvdygpO1xuICAgICAgICAkKG9wdGlvbnMuc2hpcHBpbmdfemlwX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5hdHRyKCd0eXBlJywgJ3RlbCcpO1xuICAgICAgICAkKG9wdGlvbnMuc2hpcHBpbmdfemlwX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5wcm9wKCdyZXF1aXJlZCcsIHRydWUpO1xuICAgICAgICAkKG9wdGlvbnMuc2hpcHBpbmdfc3RhdGVfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnByb3AoJ3JlcXVpcmVkJywgdHJ1ZSk7XG4gICAgICAgICQoJ2xhYmVsJywgemlwX3BhcmVudCkuaHRtbCgnU2hpcHBpbmcgWmlwIENvZGU6IDxzcGFuIGNsYXNzPVwiYS1mb3JtLWl0ZW0tcmVxdWlyZWRcIiB0aXRsZT1cIlRoaXMgZmllbGQgaXMgcmVxdWlyZWQuXCI+Kjwvc3Bhbj4nKTtcbiAgICAgICAgJCgnbGFiZWwnLCBzdGF0ZV9wYXJlbnQpLmh0bWwoJ1NoaXBwaW5nIFN0YXRlOiA8c3BhbiBjbGFzcz1cImEtZm9ybS1pdGVtLXJlcXVpcmVkXCIgdGl0bGU9XCJUaGlzIGZpZWxkIGlzIHJlcXVpcmVkLlwiPio8L3NwYW4+Jyk7XG4gICAgICB9XG4gICAgfSwgLy8gY2hhbmdlRmllbGRzT3V0c2lkZVVTXG5cbiAgICBzaGlwcGluZ0FkZHJlc3M6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHZhciBzaG93X3NoaXBwaW5nID0gZmFsc2U7XG4gICAgICBpZiAoJChvcHRpb25zLnVzZV9mb3Jfc2hpcHBpbmdfc2VsZWN0b3IpLmxlbmd0aCA+IDApIHsgLy8gd2UgaGF2ZSBhIHNoaXBwaW5nIGNoZWNrYm94XG4gICAgICAgIHNob3dfc2hpcHBpbmcgPSB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKHNob3dfc2hpcHBpbmcgPT09IHRydWUgKSB7XG4gICAgICAgICQob3B0aW9ucy51c2VfZm9yX3NoaXBwaW5nX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKS5zaG93KCk7XG4gICAgICAgIGlmICgkKG9wdGlvbnMudXNlX2Zvcl9zaGlwcGluZ19zZWxlY3RvciwgZWxlbWVudCkuaXMoJzpjaGVja2VkJykpIHsgLy8gdXNlIHNhbWUgYXMgYmlsbGluZ1xuICAgICAgICAgICQob3B0aW9ucy5zaGlwcGluZ19zZWxlY3RvcikuaGlkZSgpO1xuICAgICAgICB9IGVsc2UgeyAvLyBzZXBhcmF0ZSBzaGlwcGluZyBhbmQgYmlsbGluZ1xuICAgICAgICAgICQob3B0aW9ucy5zaGlwcGluZ19zZWxlY3Rvcikuc2hvdygpO1xuICAgICAgICB9XG4gICAgICAgICQob3B0aW9ucy51c2VfZm9yX3NoaXBwaW5nX3NlbGVjdG9yLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdGhhdC5zaGlwcGluZ0FkZHJlc3MoZWxlbWVudCwgb3B0aW9ucyk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgXG4gICAgfSwgLy8gc2hpcHBpbmdBZGRyZXNzXG5cbiAgICBhbGxvd01pbm5wb3N0QWNjb3VudDogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdmFyIGFjY291bnRfZXhpc3RzID0gZmFsc2U7XG5cbiAgICAgIC8vIHNob3cgcGFzc3dvcmQgYXMgdGV4dFxuICAgICAgdGhhdC5zaG93UGFzc3dvcmQoKTtcblxuICAgICAgLy8gY2FsY3VsYXRlIHBhc3N3b3JkIHN0cmVuZ3RoXG4gICAgICB0aGF0LnNob3dQYXNzd29yZFN0cmVuZ3RoKCk7XG4gICAgICBcbiAgICAgIHRoYXQuc3BhbUVtYWlsKCQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkpO1xuICAgICAgJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoYXQuc3BhbUVtYWlsKCQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoYXQudG9nZ2xlQWNjb3VudEZpZWxkcygkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KSk7XG4gICAgICAkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoYXQudG9nZ2xlQWNjb3VudEZpZWxkcygkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KSk7XG4gICAgICB9KTtcblxuICAgICAgZnVuY3Rpb24gZG9uZVR5cGluZyAoKSB7XG4gICAgICAgIHZhciBlbWFpbCA9ICQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCk7XG4gICAgICAgIGFjY291bnRfZXhpc3RzID0gdGhhdC5jaGVja01pbm5wb3N0QWNjb3VudChlbGVtZW50LCBvcHRpb25zLCBlbWFpbCk7XG4gICAgICB9XG5cbiAgICAgIC8vc2V0dXAgYmVmb3JlIGZ1bmN0aW9uc1xuICAgICAgdmFyIHR5cGluZ1RpbWVyOyAgICAgICAgICAgICAgICAvL3RpbWVyIGlkZW50aWZpZXJcbiAgICAgIHZhciBkb25lVHlwaW5nSW50ZXJ2YWwgPSA1MDAwOyAgLy90aW1lIGluIG1zLCA1IHNlY29uZCBmb3IgZXhhbXBsZVxuXG4gICAgICAvL29uIGtleXVwLCBzdGFydCB0aGUgY291bnRkb3duXG4gICAgICAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLmtleXVwKGZ1bmN0aW9uKCl7XG4gICAgICAgIGNsZWFyVGltZW91dCh0eXBpbmdUaW1lcik7XG4gICAgICAgIGlmICgkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCkge1xuICAgICAgICAgIHR5cGluZ1RpbWVyID0gc2V0VGltZW91dChkb25lVHlwaW5nLCBkb25lVHlwaW5nSW50ZXJ2YWwpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LCAvLyBhbGxvd01pbm5wb3N0QWNjb3VudFxuXG4gICAgc3BhbUVtYWlsOiBmdW5jdGlvbihlbWFpbF9maWVsZCkge1xuICAgICAgdmFyIHNwYW1FcnJvckNvbnRhaW5lciA9IGVtYWlsX2ZpZWxkLnBhcmVudCgpO1xuICAgICAgaWYgKCQoJy5hLXNwYW0tZW1haWwnLCBzcGFtRXJyb3JDb250YWluZXIpLmxlbmd0aCA9PT0gMCApIHtcbiAgICAgICAgc3BhbUVycm9yQ29udGFpbmVyLmFwcGVuZCgnPHAgY2xhc3M9XCJhLWZvcm0tY2FwdGlvbiBhLXZhbGlkYXRpb24tZXJyb3IgYS1zcGFtLWVtYWlsXCI+VGhpcyBlbWFpbCBhZGRyZXNzIGhhcyBiZWVuIGRldGVjdGVkIGFzIGEgc3BhbW1lci48L3A+Jyk7XG4gICAgICB9XG4gICAgICAkKCcuYS1zcGFtLWVtYWlsJywgc3BhbUVycm9yQ29udGFpbmVyKS5oaWRlKCk7XG4gICAgICBzcGFtRXJyb3JDb250YWluZXIucmVtb3ZlQ2xhc3MoJ2ludmFsaWQgYS1lcnJvcicpO1xuICAgIH0sIC8vIHNwYW1FbWFpbFxuXG4gICAgdG9nZ2xlQWNjb3VudEZpZWxkczogZnVuY3Rpb24oY3JlYXRlX2FjY291bnRfc2VsZWN0b3IpIHtcbiAgICAgIGlmIChjcmVhdGVfYWNjb3VudF9zZWxlY3Rvci5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICBjcmVhdGVfYWNjb3VudF9zZWxlY3Rvci5wYXJlbnQoKS5iZWZvcmUoJzxwIGNsYXNzPVwiYS1mb3JtLWNhcHRpb24gYS1hY2NvdW50LWV4aXN0cyBhLWFjY291bnQtZXhpc3RzLXN1Y2Nlc3NcIj5UaGVyZSBpcyBhbHJlYWR5IGEgTWlublBvc3QuY29tIGFjY291bnQgd2l0aCB0aGlzIGVtYWlsIGFkZHJlc3MuPC9wPicpO1xuICAgICAgICAkKCcuYS1hY2NvdW50LWV4aXN0cycpLmhpZGUoKTtcbiAgICAgICAgJCh0aGlzLm9wdGlvbnMucGFzc3dvcmRfc2VsZWN0b3IsIHRoaXMuZWxlbWVudCkuc2hvdygpO1xuICAgICAgICB0aGlzLm9wdGlvbnMuY3JlYXRlX2FjY291bnQgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJCh0aGlzLm9wdGlvbnMucGFzc3dvcmRfc2VsZWN0b3IsIHRoaXMuZWxlbWVudCkuaGlkZSgpO1xuICAgICAgfVxuICAgIH0sIC8vIHRvZ2dsZUFjY291bnRGaWVsZHNcblxuICAgIHNob3dQYXNzd29yZDogZnVuY3Rpb24oKSB7XG4gICAgICAvLyBDYWNoZSBvdXIganF1ZXJ5IGVsZW1lbnRzXG4gICAgICB2YXIgJHN1Ym1pdCA9ICQoJy5idG4tc3VibWl0Jyk7XG4gICAgICB2YXIgJGNvbnRhaW5lciA9ICQodGhpcy5vcHRpb25zLnBhc3N3b3JkX3NlbGVjdG9yLCB0aGlzLmVsZW1lbnQpO1xuICAgICAgdmFyICRmaWVsZCA9ICQoJ2lucHV0W25hbWU9XCJwYXNzd29yZFwiXScsICRjb250YWluZXIpO1xuICAgICAgJCgnLmEtYWNjb3VudC1leGlzdHMnKS5oaWRlKCk7XG4gICAgICB2YXIgc2hvd19wYXNzID0gJzxkaXYgY2xhc3M9XCJhLWZvcm0tc2hvdy1wYXNzd29yZCBhLWZvcm0tY2FwdGlvblwiPjxsYWJlbD48aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgbmFtZT1cInNob3dfcGFzc3dvcmRcIiBpZD1cInNob3ctcGFzc3dvcmQtY2hlY2tib3hcIiB2YWx1ZT1cIjFcIj4gU2hvdyBwYXNzd29yZDwvbGFiZWw+PC9kaXY+JztcbiAgICAgIC8vIEluamVjdCB0aGUgdG9nZ2xlIGJ1dHRvbiBpbnRvIHRoZSBwYWdlXG4gICAgICAkY29udGFpbmVyLmFwcGVuZCggc2hvd19wYXNzICk7XG4gICAgICAvLyBDYWNoZSB0aGUgdG9nZ2xlIGJ1dHRvblxuICAgICAgdmFyICR0b2dnbGUgPSAkKCcjc2hvdy1wYXNzd29yZC1jaGVja2JveCcpO1xuICAgICAgLy8gVG9nZ2xlIHRoZSBmaWVsZCB0eXBlXG4gICAgICAkdG9nZ2xlLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgdmFyIGNoZWNrYm94ID0gJCh0aGlzKTtcbiAgICAgICAgaWYgKGNoZWNrYm94LmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgICAgJGZpZWxkLmF0dHIoJ3R5cGUnLCAndGV4dCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICRmaWVsZC5hdHRyKCd0eXBlJywgJ3Bhc3N3b3JkJyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgLy8gU2V0IHRoZSBmb3JtIGZpZWxkIGJhY2sgdG8gYSByZWd1bGFyIHBhc3N3b3JkIGVsZW1lbnRcbiAgICAgICRzdWJtaXQub24oICdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgJGZpZWxkLmF0dHIoJ3R5cGUnLCAncGFzc3dvcmQnKTtcbiAgICAgIH0pO1xuICAgIH0sXG5cbiAgICBzaG93UGFzc3dvcmRTdHJlbmd0aDogZnVuY3Rpb24oKSB7XG4gICAgICAvLyBjaGVja1Bhc3N3b3JkU3RyZW5ndGhcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIGlmICgkKCcuYS1wYXNzd29yZC1zdHJlbmd0aCcpLmxlbmd0aCA+IDAgKSB7XG4gICAgICAgIHZhciAkYmVmb3JlID0gJCgnLmEtZm9ybS1zaG93LXBhc3N3b3JkJyk7XG4gICAgICAgICRiZWZvcmUuYWZ0ZXIoICQoJzxkaXYgY2xhc3M9XCJhLXBhc3N3b3JkLXN0cmVuZ3RoXCI+PG1ldGVyIG1heD1cIjRcIiBpZD1cInBhc3N3b3JkLXN0cmVuZ3RoXCI+PGRpdj48L2Rpdj48L21ldGVyPjxwIGNsYXNzPVwiYS1mb3JtLWNhcHRpb25cIiBpZD1cInBhc3N3b3JkLXN0cmVuZ3RoLXRleHRcIj48L3A+PC9kaXY+JykpO1xuICAgICAgICAkKCAnYm9keScgKS5vbiggJ2tleXVwJywgJ2lucHV0W25hbWU9cGFzc3dvcmRdJyxcbiAgICAgICAgICBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHRoYXQuY2hlY2tQYXNzd29yZFN0cmVuZ3RoKFxuICAgICAgICAgICAgICAkKCdpbnB1dFtuYW1lPXBhc3N3b3JkXScpLCAvLyBQYXNzd29yZCBmaWVsZFxuICAgICAgICAgICAgICAkKCcjcGFzc3dvcmQtc3RyZW5ndGgnKSwgICAgICAgICAgIC8vIFN0cmVuZ3RoIG1ldGVyXG4gICAgICAgICAgICAgICQoJyNwYXNzd29yZC1zdHJlbmd0aC10ZXh0JykgICAgICAvLyBTdHJlbmd0aCB0ZXh0IGluZGljYXRvclxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSwgLy8gc2hvd1Bhc3N3b3JkU3RyZW5ndGhcblxuICAgIGNoZWNrUGFzc3dvcmRTdHJlbmd0aDogZnVuY3Rpb24oICRwYXNzd29yZCwgJHN0cmVuZ3RoTWV0ZXIsICRzdHJlbmd0aFRleHQgKSB7XG4gICAgICB2YXIgcGFzc3dvcmQgPSAkcGFzc3dvcmQudmFsKCk7XG4gICAgICAvLyBHZXQgdGhlIHBhc3N3b3JkIHN0cmVuZ3RoXG4gICAgICB2YXIgcmVzdWx0ID0genhjdmJuKHBhc3N3b3JkKTtcbiAgICAgIHZhciBzdHJlbmd0aCA9IHJlc3VsdC5zY29yZTtcblxuICAgICAgJHN0cmVuZ3RoVGV4dC5yZW1vdmVDbGFzcyggJ3Nob3J0IGJhZCBnb29kIHN0cm9uZycgKTtcblxuICAgICAgLy8gQWRkIHRoZSBzdHJlbmd0aCBtZXRlciByZXN1bHRzXG4gICAgICBzd2l0Y2ggKCBzdHJlbmd0aCApIHtcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICRzdHJlbmd0aFRleHQuYWRkQ2xhc3MoICdiYWQnICkuaHRtbCggJ1N0cmVuZ3RoOiA8c3Ryb25nPldlYWs8L3N0cm9uZz4nICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAkc3RyZW5ndGhUZXh0LmFkZENsYXNzKCAnZ29vZCcgKS5odG1sKCAnU3RyZW5ndGg6IDxzdHJvbmc+TWVkaXVtPC9zdHJvbmc+JyApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgJHN0cmVuZ3RoVGV4dC5hZGRDbGFzcyggJ3N0cm9uZycgKS5odG1sKCAnU3RyZW5ndGg6IDxzdHJvbmc+U3Ryb25nPC9zdHJvbmc+JyApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgJHN0cmVuZ3RoVGV4dC5hZGRDbGFzcyggJ3Nob3J0JyApLmh0bWwoICdTdHJlbmd0aDogPHN0cm9uZz5WZXJ5IHdlYWs8L3N0cm9uZz4nICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgJHN0cmVuZ3RoVGV4dC5hZGRDbGFzcyggJ3Nob3J0JyApLmh0bWwoICdTdHJlbmd0aDogPHN0cm9uZz5WZXJ5IHdlYWs8L3N0cm9uZz4nICk7XG4gICAgICB9XG4gICAgICAkc3RyZW5ndGhNZXRlci52YWwoc3RyZW5ndGgpO1xuICAgICAgcmV0dXJuIHN0cmVuZ3RoO1xuICAgIH0sIC8vIGNoZWNrUGFzc3dvcmRTdHJlbmd0aFxuXG4gICAgY2hlY2tNaW5ucG9zdEFjY291bnQ6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMsIGVtYWlsKSB7XG4gICAgICB2YXIgdXNlciA9IHtcbiAgICAgICAgZW1haWw6IGVtYWlsXG4gICAgICB9O1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgJC5hamF4KHtcbiAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgdXJsOiBvcHRpb25zLm1pbm5wb3N0X3Jvb3QgKyAnL3dwLWpzb24vdXNlci1hY2NvdW50LW1hbmFnZW1lbnQvdjEvY2hlY2stYWNjb3VudCcsXG4gICAgICAgIGRhdGE6IHVzZXJcbiAgICAgIH0pLmRvbmUoZnVuY3Rpb24oIHJlc3VsdCApIHtcbiAgICAgICAgaWYgKHJlc3VsdC5zdGF0dXMgPT09ICdzdWNjZXNzJyAmJiByZXN1bHQucmVhc29uID09PSAndXNlciBleGlzdHMnKSB7IC8vIHVzZXIgZXhpc3RzXG4gICAgICAgICAgaWYgKCQob3B0aW9ucy5jcmVhdGVfbXBfc2VsZWN0b3IsIGVsZW1lbnQpLmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgICAgICAkKG9wdGlvbnMucGFzc3dvcmRfc2VsZWN0b3IsIGVsZW1lbnQpLmhpZGUoKTtcbiAgICAgICAgICAgICQob3B0aW9ucy5jcmVhdGVfbXBfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpLmhpZGUoKTtcbiAgICAgICAgICAgICQoJy5hLWFjY291bnQtZXhpc3RzJywgZWxlbWVudCkuc2hvdygpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KS5vbignY2hhbmdlJywgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAoJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgICAgICAgJChvcHRpb25zLnBhc3N3b3JkX3NlbGVjdG9yLCBlbGVtZW50KS5oaWRlKCk7XG4gICAgICAgICAgICAgICQob3B0aW9ucy5jcmVhdGVfbXBfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpLmhpZGUoKTtcbiAgICAgICAgICAgICAgJCgnLmEtYWNjb3VudC1leGlzdHMnLCBlbGVtZW50KS5zaG93KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoIHJlc3VsdC5zdGF0dXMgPT09ICdzcGFtJyApIHtcbiAgICAgICAgICAkKHRoYXQub3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvcikuYWRkQ2xhc3MoJ2ludmFsaWQgYS1lcnJvcicpO1xuICAgICAgICAgICQoICcuYS1zcGFtLWVtYWlsJykuc2hvdygpO1xuICAgICAgICB9IGVsc2UgeyAvLyB1c2VyIGRvZXMgbm90IGV4aXN0IG9yIGFqYXggY2FsbCBmYWlsZWRcbiAgICAgICAgICBpZiAoJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgICAgICQob3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgZWxlbWVudCkuc2hvdygpO1xuICAgICAgICAgICAgb3B0aW9ucy5jcmVhdGVfYWNjb3VudCA9IHRydWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICQob3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgZWxlbWVudCkuaGlkZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAkKCcuYS1hY2NvdW50LWV4aXN0cycsIGVsZW1lbnQpLmhpZGUoKTtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sIC8vIGNoZWNrTWlubnBvc3RBY2NvdW50XG5cbiAgICBwYXltZW50UmVxdWVzdEJ1dHRvbjogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdmFyIHRvdGFsX2Ftb3VudCA9IHRoYXQuZ2V0VG90YWxBbW91bnQoKTtcbiAgICAgIHRoYXQucGF5bWVudFJlcXVlc3QgPSB0aGF0LnN0cmlwZS5wYXltZW50UmVxdWVzdCh7XG4gICAgICAgIGNvdW50cnk6ICdVUycsXG4gICAgICAgIGN1cnJlbmN5OiAndXNkJyxcbiAgICAgICAgdG90YWw6IHtcbiAgICAgICAgICBsYWJlbDogJ01pbm5Qb3N0JyxcbiAgICAgICAgICBhbW91bnQ6IHRvdGFsX2Ftb3VudCAqIDEwMCxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgICAgdGhhdC5wckJ1dHRvbiA9IHRoYXQuZWxlbWVudHMuY3JlYXRlKCdwYXltZW50UmVxdWVzdEJ1dHRvbicsIHtcbiAgICAgICAgcGF5bWVudFJlcXVlc3Q6IHRoYXQucGF5bWVudFJlcXVlc3QsXG4gICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgcGF5bWVudFJlcXVlc3RCdXR0b246IHtcbiAgICAgICAgICAgIHR5cGU6ICdkb25hdGUnLFxuICAgICAgICAgICAgLy8gT25lIG9mICdkZWZhdWx0JywgJ2Jvb2snLCAnYnV5Jywgb3IgJ2RvbmF0ZSdcbiAgICAgICAgICAgIC8vIERlZmF1bHRzIHRvICdkZWZhdWx0J1xuICAgICAgXG4gICAgICAgICAgICB0aGVtZTogJ2RhcmsnLFxuICAgICAgICAgICAgLy8gT25lIG9mICdkYXJrJywgJ2xpZ2h0Jywgb3IgJ2xpZ2h0LW91dGxpbmUnXG4gICAgICAgICAgICAvLyBEZWZhdWx0cyB0byAnZGFyaydcbiAgICAgIFxuICAgICAgICAgICAgaGVpZ2h0OiAnNDhweCdcbiAgICAgICAgICAgIC8vIERlZmF1bHRzIHRvICc0MHB4Jy4gVGhlIHdpZHRoIGlzIGFsd2F5cyAnMTAwJScuXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgICAgXG4gICAgICAvLyBDaGVjayB0aGUgYXZhaWxhYmlsaXR5IG9mIHRoZSBQYXltZW50IFJlcXVlc3QgQVBJIGZpcnN0LlxuICAgICAgdGhhdC5wYXltZW50UmVxdWVzdC5jYW5NYWtlUGF5bWVudCgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAkKCcubS1wYXktd2l0aG91dC1wYXltZW50LXJlcXVlc3QnKS5oaWRlKCk7XG4gICAgICAgICAgdGhhdC5wckJ1dHRvbi5tb3VudCgnI3BheW1lbnQtcmVxdWVzdC1idXR0b24nKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGF0LmhpZGVQYXltZW50UmVxdWVzdCggJCgnLm8tcGF5LXdpdGgtcGF5bWVudC1yZXF1ZXN0JykgKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgICQoJy5kZWNsaW5lLWFwcGxlLXBheSBhJykuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhhdC5oaWRlUGF5bWVudFJlcXVlc3QoICQoJy5vLXBheS13aXRoLXBheW1lbnQtcmVxdWVzdCAubS1mb3JtLWFjdGlvbnMtcGF5LWZlZXMnKSApO1xuICAgICAgfSk7XG5cbiAgICAgIHRoYXQucHJCdXR0b24ub24oJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpIHtcblxuICAgICAgICAvLyBTZW5kIHBheW1lbnRNZXRob2QuaWQgdG8gc2VydmVyXG4gICAgICAgIHZhciBzdXBwb3J0Zm9ybSA9ICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKTtcblxuICAgICAgICAvLyBjaGVjayB2YWxpZGF0aW9uIG9mIGZvcm1cbiAgICAgICAgaWYgKCFzdXBwb3J0Zm9ybS5nZXQoMCkucmVwb3J0VmFsaWRpdHkoKSkge1xuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgdGhhdC5wYXltZW50UmVxdWVzdC5vbigncGF5bWVudG1ldGhvZCcsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cbiAgICAgICAgLy8gU2VuZCBwYXltZW50TWV0aG9kLmlkIHRvIHNlcnZlclxuICAgICAgICB2YXIgc3VwcG9ydGZvcm0gPSAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3Rvcik7XG4gICAgICAgIHZhciB0b2tlbkZpZWxkTmFtZSA9ICdwYXltZW50X21ldGhvZF9pZCc7XG4gICAgICAgIHZhciB0b2tlbkZpZWxkID0gJ2lucHV0W25hbWU9XCInICsgdG9rZW5GaWVsZE5hbWUgKyAnXCJdJztcblxuICAgICAgICAvLyBJbnNlcnQgdGhlIHBheW1lbnQgbWV0aG9kIElEIGludG8gdGhlIGZvcm0gc28gaXQgZ2V0cyBzdWJtaXR0ZWQgdG8gdGhlIHNlcnZlclxuICAgICAgICBpZiAoJCh0b2tlbkZpZWxkKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgJCh0b2tlbkZpZWxkKS52YWwoZXZlbnQucGF5bWVudE1ldGhvZC5pZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3VwcG9ydGZvcm0uYXBwZW5kKCQoJzxpbnB1dCB0eXBlPVxcXCJoaWRkZW5cXFwiIG5hbWU9XCInICsgdG9rZW5GaWVsZE5hbWUgKyAnXCI+JykudmFsKGV2ZW50LnBheW1lbnRNZXRob2QuaWQpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoYXQuZm9ybVByb2Nlc3Nvcih0aGF0LCAncGF5bWVudFJlcXVlc3QnKTtcblxuICAgICAgfSk7XG5cbiAgICB9LCAvLyBwYXltZW50UmVxdWVzdEJ1dHRvblxuXG4gICAgaGlkZVBheW1lbnRSZXF1ZXN0OiBmdW5jdGlvbiggaGlkZUVsZW1lbnQgKSB7XG4gICAgICBoaWRlRWxlbWVudC5oaWRlKCk7XG4gICAgICAkKCcuZGVjbGluZS1hcHBsZS1wYXkgYScpLmhpZGUoKTtcbiAgICAgICQoJy5tLXBheS13aXRob3V0LXBheW1lbnQtcmVxdWVzdCcpLnNob3coKTtcbiAgICAgICQoJy5hLWctcmVjYXB0Y2hhJykuaW5zZXJ0QWZ0ZXIoJy5tLXBheS13aXRob3V0LXBheW1lbnQtcmVxdWVzdCAubS1mb3JtLWFjdGlvbnMtcGF5LWZlZXMnKTtcbiAgICB9LCAvLyBoaWRlUGF5bWVudFJlcXVlc3RcblxuICAgIGNob29zZVBheW1lbnRNZXRob2Q6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcblxuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuXG4gICAgICBpZiAoJChvcHRpb25zLmNob29zZV9wYXltZW50KS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGlmICgkKG9wdGlvbnMuY2hvb3NlX3BheW1lbnQgKyAnIGlucHV0JykuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgICB2YXIgY2hlY2tlZF9pZCA9ICQob3B0aW9ucy5jaG9vc2VfcGF5bWVudCArICcgaW5wdXQ6Y2hlY2tlZCcpLmF0dHIoJ2lkJyk7XG4gICAgICAgICAgdmFyIGNoZWNrZWRfdmFsdWUgPSAkKG9wdGlvbnMuY2hvb3NlX3BheW1lbnQgKyAnIGlucHV0OmNoZWNrZWQnKS52YWwoKTtcbiAgICAgICAgICB0aGF0LnNldHVwUGF5bWVudE1ldGhvZChjaGVja2VkX2lkLCBjaGVja2VkX3ZhbHVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgICQob3B0aW9ucy5jaG9vc2VfcGF5bWVudCArICcgaW5wdXQnKS5jaGFuZ2UoZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciBjaGVja2VkX2lkID0gdGhpcy5pZDtcbiAgICAgICAgICB2YXIgY2hlY2tlZF92YWx1ZSA9IHRoaXMudmFsdWU7XG4gICAgICAgICAgdGhhdC5zZXR1cFBheW1lbnRNZXRob2QoY2hlY2tlZF9pZCwgY2hlY2tlZF92YWx1ZSk7XG4gICAgICAgIH0pO1xuXG4gICAgICB9XG4gICAgfSwgLy8gY2hvb3NlUGF5bWVudE1ldGhvZFxuXG4gICAgc2V0dXBQYXltZW50TWV0aG9kOiBmdW5jdGlvbihlbGVtZW50X2lkLCBlbGVtZW50X3ZhbHVlKSB7XG4gICAgICB2YXIgc3RyaXBlX3BheW1lbnRfdHlwZSA9IHRoaXMuc2V0U3RyaXBlUGF5bWVudFR5cGUoZWxlbWVudF92YWx1ZSk7XG4gICAgICBpZiAoIGVsZW1lbnRfdmFsdWUgPT09ICdiYW5rX2FjY291bnQnICkge1xuICAgICAgICAkKCdpbnB1dFtuYW1lPVwicGF5bWVudF9tZXRob2RfaWRcIl0nLCAkKHRoaXMub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikpLnJlbW92ZSgpO1xuICAgICAgICB0aGlzLmFjaEZpZWxkcyh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnJlbW92ZUFjaEZpZWxkcyh0aGlzLm9wdGlvbnMpO1xuICAgICAgfVxuICAgICAgJCh0aGlzLm9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAgICQodGhpcy5vcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yICsgJy4nICsgZWxlbWVudF9pZCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgJCh0aGlzLm9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IgKyAnOm5vdCguYWN0aXZlKSBpbnB1dCcpLnZhbCgnJyk7XG4gICAgICB0aGlzLmNhbGN1bGF0ZUZlZXModGhpcy5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCwgc3RyaXBlX3BheW1lbnRfdHlwZSk7XG4gICAgfSwgLy8gc2V0dXBQYXltZW50TWV0aG9kXG5cbiAgICByZW1vdmVBY2hGaWVsZHM6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICQoJ2lucHV0W25hbWU9XCJwdWJsaWNfdG9rZW5cIl0nLCAkKG9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpKS5yZW1vdmUoKTtcbiAgICAgICQoJ2lucHV0W25hbWU9XCJhY2NvdW50X2lkXCJdJywgJChvcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKSkucmVtb3ZlKCk7XG4gICAgICAkKCdpbnB1dFtuYW1lPVwiYmFua1Rva2VuXCJdJywgJChvcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKSkucmVtb3ZlKCk7XG4gICAgICAkKG9wdGlvbnMucGxhaWRfbGluaykuaHRtbCgnPGEgaHJlZj1cIiNcIj5TaWduIGluIHRvIHlvdXIgYmFuayBhY2NvdW50PC9hPicpO1xuICAgICAgdGhpcy5idXR0b25EaXNhYmxlZChvcHRpb25zLCBmYWxzZSwgJycsICcnLCB0cnVlKTsgLy8gaWYgdGhlIGJ1dHRvbiB3YXMgZGlzYWJsZWQsIHJlLWVuYWJsZSBpdFxuICAgICAgaWYgKHR5cGVvZiB0aGlzLmxpbmtIYW5kbGVyICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aGlzLmxpbmtIYW5kbGVyLmRlc3Ryb3koKTtcbiAgICAgIH1cbiAgICB9LCAvLyByZW1vdmVBY2hGaWVsZHNcblxuICAgIGNyZWRpdENhcmRGaWVsZHM6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcblxuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuXG4gICAgICB2YXIgc3R5bGUgPSB7XG4gICAgICAgIGJhc2U6IHtcbiAgICAgICAgICBpY29uQ29sb3I6ICcjNjY2RUU4JyxcbiAgICAgICAgICBsaW5lSGVpZ2h0OiAnNDNweCcsXG4gICAgICAgICAgZm9udFdlaWdodDogNDAwLFxuICAgICAgICAgIGZvbnRGYW1pbHk6ICdmZi1tZXRhLXdlYi1wcm8nLFxuICAgICAgICAgIGZvbnRTaXplOiAnMjRweCcsXG4gICAgICAgICAgLy9saW5lSGVpZ2h0OiAnMzdweCcsXG4gICAgICAgICAgLy9mb250U2l6ZTogJzE2cHgnLFxuICAgICAgICB9LFxuICAgICAgICBpbnZhbGlkOiB7XG4gICAgICAgICAgY29sb3I6ICcjMWExODE4JyxcbiAgICAgICAgfSxcbiAgICAgIH07XG5cbiAgICAgIC8vIEFkZCBhbiBpbnN0YW5jZSBvZiB0aGUgY2FyZCBVSSBjb21wb25lbnQgaW50byB0aGUgYGNhcmQtZWxlbWVudGAgPGRpdj5cbiAgICAgIC8vY2FyZC5tb3VudCgnI2NhcmQtZWxlbWVudCcpO1xuICAgICAgaWYgKCAkKCcuY3JlZGl0LWNhcmQtZ3JvdXAnKS5sZW5ndGggPT09IDAgJiYgJCgnLnBheW1lbnQtbWV0aG9kLmNob29zZS1jYXJkJykubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoYXQuY2FyZE51bWJlckVsZW1lbnQgPSB0aGF0LmVsZW1lbnRzLmNyZWF0ZSgnY2FyZE51bWJlcicsIHtcbiAgICAgICAgc2hvd0ljb246IHRydWUsXG4gICAgICAgIHN0eWxlOiBzdHlsZVxuICAgICAgfSk7XG4gICAgICB0aGF0LmNhcmROdW1iZXJFbGVtZW50Lm1vdW50KG9wdGlvbnMuY2NfbnVtX3NlbGVjdG9yKTtcblxuICAgICAgdGhhdC5jYXJkRXhwaXJ5RWxlbWVudCA9IHRoYXQuZWxlbWVudHMuY3JlYXRlKCdjYXJkRXhwaXJ5Jywge1xuICAgICAgICBzdHlsZTogc3R5bGVcbiAgICAgIH0pO1xuICAgICAgdGhhdC5jYXJkRXhwaXJ5RWxlbWVudC5tb3VudChvcHRpb25zLmNjX2V4cF9zZWxlY3Rvcik7XG5cbiAgICAgIHRoYXQuY2FyZEN2Y0VsZW1lbnQgPSB0aGF0LmVsZW1lbnRzLmNyZWF0ZSgnY2FyZEN2YycsIHtcbiAgICAgICAgc3R5bGU6IHN0eWxlXG4gICAgICB9KTtcbiAgICAgIHRoYXQuY2FyZEN2Y0VsZW1lbnQubW91bnQob3B0aW9ucy5jY19jdmNfc2VsZWN0b3IpO1xuXG4gICAgICAvLyB2YWxpZGF0ZS9lcnJvciBoYW5kbGUgdGhlIGNhcmQgZmllbGRzXG4gICAgICB0aGF0LmNhcmROdW1iZXJFbGVtZW50Lm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICB2YXIgc3RyaXBlX3BheW1lbnRfdHlwZSA9ICdjYXJkJztcbiAgICAgICAgLy8gU3dpdGNoIHBheW1lbnQgdHlwZSBpZiBpdCdzIG9uZSB0aGF0IHdlIHJlY29nbml6ZSBhcyBkaXN0aW5jdFxuICAgICAgICBpZiAoZXZlbnQuYnJhbmQpIHtcbiAgICAgICAgICBpZiAoIGV2ZW50LmJyYW5kID09PSAnYW1leCcgKSB7XG4gICAgICAgICAgICBzdHJpcGVfcGF5bWVudF90eXBlID0gJ2FtZXgnO1xuICAgICAgICAgIH0gICAgICAgICAgXG4gICAgICAgIH1cbiAgICAgICAgLy8gZXJyb3IgaGFuZGxpbmdcbiAgICAgICAgdGhhdC5zdHJpcGVFcnJvckRpc3BsYXkoZXZlbnQuZXJyb3IsICQob3B0aW9ucy5jY19udW1fc2VsZWN0b3IsIGVsZW1lbnQpLCBlbGVtZW50LCBvcHRpb25zICk7XG4gICAgICAgIC8vIGlmIGl0IGNoYW5nZWQsIHJlc2V0IHRoZSBidXR0b25cbiAgICAgICAgdGhhdC5idXR0b25TdGF0dXMob3B0aW9ucywgJCh0aGF0Lm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLmZpbmQoJ2J1dHRvbicpLCBmYWxzZSk7XG4gICAgICAgIHRoYXQuY2FsY3VsYXRlRmVlcyh0aGF0Lm9wdGlvbnMub3JpZ2luYWxfYW1vdW50LCBzdHJpcGVfcGF5bWVudF90eXBlKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGF0LmNhcmRFeHBpcnlFbGVtZW50Lm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAvLyBlcnJvciBoYW5kbGluZ1xuICAgICAgICB0aGF0LnN0cmlwZUVycm9yRGlzcGxheShldmVudC5lcnJvciwgJChvcHRpb25zLmNjX2V4cF9zZWxlY3RvciwgZWxlbWVudCksIGVsZW1lbnQsIG9wdGlvbnMgKTtcbiAgICAgICAgLy8gaWYgaXQgY2hhbmdlZCwgcmVzZXQgdGhlIGJ1dHRvblxuICAgICAgICB0aGF0LmJ1dHRvblN0YXR1cyhvcHRpb25zLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIGZhbHNlKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGF0LmNhcmRDdmNFbGVtZW50Lm9uKCdjaGFuZ2UnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAvLyBlcnJvciBoYW5kbGluZ1xuICAgICAgICB0aGF0LnN0cmlwZUVycm9yRGlzcGxheShldmVudC5lcnJvciwgJChvcHRpb25zLmNjX2N2Y19zZWxlY3RvciwgZWxlbWVudCksIGVsZW1lbnQsIG9wdGlvbnMgKTtcbiAgICAgICAgLy8gaWYgaXQgY2hhbmdlZCwgcmVzZXQgdGhlIGJ1dHRvblxuICAgICAgICB0aGF0LmJ1dHRvblN0YXR1cyhvcHRpb25zLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIGZhbHNlKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyB0aGlzIGlzIHRoZSBtZXRob2QgdG8gY3JlYXRlIGEgc2luZ2xlIGNhcmQgZmllbGQgYW5kIG1vdW50IGl0XG4gICAgICAvKnZhciBjYXJkID0gdGhhdC5lbGVtZW50cy5jcmVhdGUoXG4gICAgICAgICdjYXJkJyxcbiAgICAgICAge1xuICAgICAgICAgIGhpZGVQb3N0YWxDb2RlOiB0cnVlXG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgICAvLyBBZGQgYW4gaW5zdGFuY2Ugb2YgdGhlIGNhcmQgVUkgY29tcG9uZW50IGludG8gdGhlIGBjYXJkLWVsZW1lbnRgIDxkaXY+XG4gICAgICBjYXJkLm1vdW50KCcjY2FyZC1lbGVtZW50Jyk7Ki9cblxuICAgIH0sIC8vIGNyZWRpdENhcmRGaWVsZHNcblxuICAgIHNob3dTcGlubmVyOiBmdW5jdGlvbigpIHtcbiAgICAgICQodGhpcy5vcHRpb25zLnBsYWlkX2xpbmspLmhpZGUoKTtcbiAgICAgICQodGhpcy5vcHRpb25zLnBsYWlkX2xpbmspLmFmdGVyKCc8ZGl2IGNsYXNzPVwiYS1zcGlubmVyXCI+PGltZyBzcmM9XCJodHRwczovL3d3dy5taW5ucG9zdC5jb20vd3AtYWRtaW4vaW1hZ2VzL3NwaW5uZXIuZ2lmXCIgc3Jjc2V0PVwiaHR0cHM6Ly93d3cubWlubnBvc3QuY29tL3dwLWFkbWluL2ltYWdlcy9zcGlubmVyLmdpZiAxeCwgaHR0cHM6Ly93d3cubWlubnBvc3QuY29tL3dwLWFkbWluL2ltYWdlcy9zcGlubmVyLTJ4LmdpZiAyeCxcIj48L2Rpdj4nKTtcbiAgICB9LFxuXG4gICAgaGlkZVNwaW5uZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgJCh0aGlzLm9wdGlvbnMucGxhaWRfbGluaykuc2hvdygpO1xuICAgICAgJCgnLmEtc3Bpbm5lcicpLmhpZGUoKTtcbiAgICB9LFxuXG4gICAgYWNoRmllbGRzOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICB2YXIgYmFua1Rva2VuRmllbGROYW1lID0gJ2JhbmtUb2tlbic7XG4gICAgICB2YXIgYmFua1Rva2VuRmllbGQgPSAnaW5wdXRbbmFtZT1cIicgKyBiYW5rVG9rZW5GaWVsZE5hbWUgKyAnXCJdJztcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIC8vIHRoZSBidXR0b24gc2hvdWxkIG5vdCBiZSBjbGlja2FibGUgdW50aWwgdGhlIHVzZXIgaGFzIHNpZ25lZCBpblxuICAgICAgdGhhdC5idXR0b25EaXNhYmxlZChvcHRpb25zLCB0cnVlLCAnJywgJ1NpZ24gaW4gdG8geW91ciBiYW5rIGFjY291bnQgKGFib3ZlKSBmaXJzdCcpO1xuXG4gICAgICBpZiAodHlwZW9mIFBsYWlkICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aGF0LmxpbmtIYW5kbGVyID0gUGxhaWQuY3JlYXRlKHtcbiAgICAgICAgICBjbGllbnROYW1lOiAnTWlublBvc3QnLFxuICAgICAgICAgIGVudjogb3B0aW9ucy5wbGFpZF9lbnYsXG4gICAgICAgICAgcHJvZHVjdDogWydhdXRoJ10sXG4gICAgICAgICAgLy8gMS4gUGFzcyB0aGUgdG9rZW4gZ2VuZXJhdGVkIGluIHN0ZXAgMi5cbiAgICAgICAgICB0b2tlbjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYWlkX2xpbmtfdG9rZW4nKS52YWx1ZSxcbiAgICAgICAgICBvblN1Y2Nlc3M6IGZ1bmN0aW9uKHB1YmxpY190b2tlbiwgbWV0YWRhdGEpIHtcbiAgICAgICAgICAgIHRoYXQuc2hvd1NwaW5uZXIoKTtcbiAgICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICAgIHVybDonL2dldF9wbGFpZF9hY2Nlc3NfdG9rZW4vJyxcbiAgICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoeyBwdWJsaWNfdG9rZW46IHB1YmxpY190b2tlbiwgYWNjb3VudF9pZDogbWV0YWRhdGEuYWNjb3VudF9pZCB9KSxcbiAgICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmRvbmUoZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiByZXNwb25zZS5lcnJvciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAvLyB0aGVyZSBpcyBhbiBlcnJvci5cbiAgICAgICAgICAgICAgICB0aGF0LmhpZGVTcGlubmVyKCk7XG4gICAgICAgICAgICAgICAgJChvcHRpb25zLnBsYWlkX2xpbmspLmJlZm9yZSgnPHAgY2xhc3M9XCJhLWVycm9yIGEtdmFsaWRhdGlvbi1lcnJvclwiPicgKyByZXNwb25zZS5lcnJvciArICc8L3A+Jyk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy90aGlzLmRlYnVnKCdwcmludCByZXNwb25zZSBoZXJlJyk7XG4gICAgICAgICAgICAgICAgLy90aGlzLmRlYnVnKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgICAvLyBhZGQgdGhlIGZpZWxkKHMpIHdlIG5lZWQgdG8gdGhlIGZvcm0gZm9yIHN1Ym1pdHRpbmdcbiAgICAgICAgICAgICAgICBpZiAoJChiYW5rVG9rZW5GaWVsZCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgJChiYW5rVG9rZW5GaWVsZCkudmFsKHJlc3BvbnNlLnN0cmlwZV9iYW5rX2FjY291bnRfdG9rZW4pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAkKG9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLnByZXBlbmQoJCgnPGlucHV0IHR5cGU9XFxcImhpZGRlblxcXCIgbmFtZT1cIicgKyBiYW5rVG9rZW5GaWVsZE5hbWUgKyAnXCI+JykudmFsKHJlc3BvbnNlLnN0cmlwZV9iYW5rX2FjY291bnRfdG9rZW4pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgJChvcHRpb25zLnBsYWlkX2xpbmssIGVsZW1lbnQpLmh0bWwoJzxzdHJvbmc+WW91ciBhY2NvdW50IHdhcyBzdWNjZXNzZnVsbHkgYXV0aG9yaXplZDwvc3Ryb25nPicpO1xuICAgICAgICAgICAgICAgIHRoYXQuaGlkZVNwaW5uZXIoKTtcbiAgICAgICAgICAgICAgICB0aGF0LmJ1dHRvbkRpc2FibGVkKG9wdGlvbnMsIGZhbHNlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgIHRoYXQuZGVidWcocmVzcG9uc2UpO1xuICAgICAgICAgICAgICB0aGF0LmhpZGVTcGlubmVyKCk7XG4gICAgICAgICAgICAgICQob3B0aW9ucy5wbGFpZF9saW5rKS5iZWZvcmUoJzxwIGNsYXNzPVwiYS1lcnJvciBhLXZhbGlkYXRpb24tZXJyb3JcIj4nICsgcmVzcG9uc2UuZXJyb3IgKyAnPC9wPicpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICAgICQob3B0aW9ucy5wbGFpZF9saW5rICsgJyBhJykuY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHRoYXQucmVzZXRGb3JtRXJyb3JzKHRoYXQub3B0aW9ucywgdGhhdC5lbGVtZW50KTtcbiAgICAgICAgICAvLyQob3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvciArICcgLmEtZXJyb3InKS5yZW1vdmUoKTsgLy8gcmVtb3ZlIG1ldGhvZCBlcnJvciBtZXNzYWdlIGlmIGl0IGlzIHRoZXJlXG4gICAgICAgICAgdGhhdC5saW5rSGFuZGxlci5vcGVuKCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sIC8vIGFjaEZpZWxkc1xuXG4gICAgYnV0dG9uU3RhdHVzOiBmdW5jdGlvbihvcHRpb25zLCBidXR0b24sIGRpc2FibGVkKSB7XG4gICAgICAvLyBtYWtlIHRoZSBidXR0b24gY2xpY2thYmxlIG9yIG5vdFxuICAgICAgdGhpcy5idXR0b25EaXNhYmxlZChvcHRpb25zLCBkaXNhYmxlZCwgYnV0dG9uKTtcbiAgICAgIGlmIChkaXNhYmxlZCA9PT0gZmFsc2UpIHtcbiAgICAgICAgYnV0dG9uLnRleHQob3B0aW9ucy5idXR0b25fdGV4dCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBidXR0b24udGV4dCgnUHJvY2Vzc2luZycpO1xuICAgICAgfVxuICAgIH0sIC8vIGJ1dHRvblN0YXR1c1xuXG4gICAgYnV0dG9uRGlzYWJsZWQ6IGZ1bmN0aW9uKG9wdGlvbnMsIGRpc2FibGVkLCBidXR0b24gPSAnJywgbWVzc2FnZSA9ICcnLCBhY2hfd2FzX2luaXRpYWxpemVkID0gZmFsc2UpIHtcbiAgICAgIGlmIChidXR0b24gPT09ICcnKSB7XG4gICAgICAgIGJ1dHRvbiA9ICQob3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyk7XG4gICAgICB9XG4gICAgICBidXR0b24ucHJvcCgnZGlzYWJsZWQnLCBkaXNhYmxlZCk7XG4gICAgICBpZiAodHlwZW9mIHRsaXRlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBpZiAobWVzc2FnZSAhPT0gJycpIHtcbiAgICAgICAgICBpZiAoZGlzYWJsZWQgPT09IHRydWUpIHtcbiAgICAgICAgICAgIGJ1dHRvbi5hdHRyKCdkYXRhLXRsaXRlJywgbWVzc2FnZSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGJ1dHRvbi5yZW1vdmVBdHRyKCAnZGF0YS10bGl0ZScgKTsgLy8gdGhlcmUgc2hvdWxkIGJlIG5vIHRsaXRlIHZhbHVlIGlmIHRoZSBidXR0b24gaXMgZW5hYmxlZFxuICAgICAgICAgIH1cbiAgICAgICAgICBidXR0b24ub24oJ21vdXNlZW50ZXIgZm9jdXMnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgdGxpdGUuc2hvdyggKCB0aGlzICksIHsgZ3JhdjogJ253JyB9ICk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYnV0dG9uLm9uKCdtb3VzZWxlYXZlJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIHRsaXRlLmhpZGUoICggdGhpcyApICk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYnV0dG9uLnJlbW92ZUF0dHIoICdkYXRhLXRsaXRlJyApO1xuICAgICAgICAgIGlmIChhY2hfd2FzX2luaXRpYWxpemVkID09PSB0cnVlICkge1xuICAgICAgICAgICAgYnV0dG9uLm9uKCdtb3VzZWVudGVyIGZvY3VzJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgICAgdGxpdGUuaGlkZSggKCB0aGlzICkgKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgYnV0dG9uLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwgLy8gYnV0dG9uRGlzYWJsZWRcblxuICAgIHZhbGlkYXRlU2V0dXA6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciBmb3JtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwob3B0aW9ucy5mb3JtX3NlbGVjdG9yKTtcbiAgICAgIGZvcm1zLmZvckVhY2goIGZ1bmN0aW9uICggZm9ybSApIHtcbiAgICAgICAgVmFsaWRGb3JtKCBmb3JtLCB7XG4gICAgICAgICAgdmFsaWRhdGlvbkVycm9yUGFyZW50Q2xhc3M6ICdtLWhhcy12YWxpZGF0aW9uLWVycm9yJyxcbiAgICAgICAgICB2YWxpZGF0aW9uRXJyb3JDbGFzczogJ2EtdmFsaWRhdGlvbi1lcnJvcicsXG4gICAgICAgICAgaW52YWxpZENsYXNzOiAnYS1lcnJvcicsXG4gICAgICAgICAgZXJyb3JQbGFjZW1lbnQ6ICdhZnRlcidcbiAgICAgICAgfSApXG4gICAgICB9ICk7XG4gICAgICB0aGlzLnNjcm9sbFRvRm9ybUVycm9yKG9wdGlvbnMpO1xuICAgIH0sIC8vIHZhbGlkYXRlU2V0dXBcblxuICAgIHNjcm9sbFRvRm9ybUVycm9yOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICB2YXIgZm9ybSA9ICQoIG9wdGlvbnMuZm9ybV9zZWxlY3RvciApO1xuICAgICAgLy8gbGlzdGVuIGZvciBgaW52YWxpZGAgZXZlbnRzIG9uIGFsbCBmb3JtIGlucHV0c1xuICAgICAgZm9ybS5maW5kKCAnOmlucHV0JyApLm9uKCAnaW52YWxpZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgaW5wdXQgPSAkKCB0aGlzICk7XG4gICAgICAgICAgLy8gdGhlIGZpcnN0IGludmFsaWQgZWxlbWVudCBpbiB0aGUgZm9ybVxuICAgICAgICB2YXIgZmlyc3QgPSBmb3JtLmZpbmQoICcuYS1lcnJvcicgKS5maXJzdCgpO1xuICAgICAgICAvLyB0aGUgZm9ybSBpdGVtIHRoYXQgY29udGFpbnMgaXRcbiAgICAgICAgdmFyIGZpcnN0X2hvbGRlciA9IGZpcnN0LnBhcmVudCgpO1xuICAgICAgICAgIC8vIG9ubHkgaGFuZGxlIGlmIHRoaXMgaXMgdGhlIGZpcnN0IGludmFsaWQgaW5wdXRcbiAgICAgICAgICBpZiAoaW5wdXRbMF0gPT09IGZpcnN0WzBdKSB7XG4gICAgICAgICAgICAgIC8vIGhlaWdodCBvZiB0aGUgbmF2IGJhciBwbHVzIHNvbWUgcGFkZGluZyBpZiB0aGVyZSdzIGEgZml4ZWQgbmF2XG4gICAgICAgICAgICAgIC8vdmFyIG5hdmJhckhlaWdodCA9IG5hdmJhci5oZWlnaHQoKSArIDUwXG5cbiAgICAgICAgICAgICAgLy8gdGhlIHBvc2l0aW9uIHRvIHNjcm9sbCB0byAoYWNjb3VudGluZyBmb3IgdGhlIG5hdmJhciBpZiBpdCBleGlzdHMpXG4gICAgICAgICAgICAgIHZhciBlbGVtZW50T2Zmc2V0ID0gZmlyc3RfaG9sZGVyLm9mZnNldCgpLnRvcDtcblxuICAgICAgICAgICAgICAvLyB0aGUgY3VycmVudCBzY3JvbGwgcG9zaXRpb24gKGFjY291bnRpbmcgZm9yIHRoZSBuYXZiYXIpXG4gICAgICAgICAgICAgIHZhciBwYWdlT2Zmc2V0ID0gd2luZG93LnBhZ2VZT2Zmc2V0O1xuXG4gICAgICAgICAgICAgIC8vIGRvbid0IHNjcm9sbCBpZiB0aGUgZWxlbWVudCBpcyBhbHJlYWR5IGluIHZpZXdcbiAgICAgICAgICAgICAgaWYgKCBlbGVtZW50T2Zmc2V0ID4gcGFnZU9mZnNldCAmJiBlbGVtZW50T2Zmc2V0IDwgcGFnZU9mZnNldCArIHdpbmRvdy5pbm5lckhlaWdodCApIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgLy8gbm90ZTogYXZvaWQgdXNpbmcgYW5pbWF0ZSwgYXMgaXQgcHJldmVudHMgdGhlIHZhbGlkYXRpb24gbWVzc2FnZSBkaXNwbGF5aW5nIGNvcnJlY3RseVxuICAgICAgICAgICAgICAkKCAnaHRtbCwgYm9keScgKS5zY3JvbGxUb3AoIGVsZW1lbnRPZmZzZXQgKTtcbiAgICAgICAgICB9XG4gICAgICB9ICk7XG4gICAgfSwgLy8gc2Nyb2xsVG9Gb3JtRXJyb3JcblxuICAgIGZvcm1TZXR1cDogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuXG4gICAgICAkKG9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLnN1Ym1pdChmdW5jdGlvbihldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGF0LmZvcm1Qcm9jZXNzb3IodGhhdCwgJ3N1Ym1pdCcpO1xuXG4gICAgICB9KTtcbiAgICB9LCAvLyBmb3JtU2V0dXBcblxuICAgIGZvcm1Qcm9jZXNzb3I6IGZ1bmN0aW9uKHRoYXQsIHR5cGUpIHtcblxuICAgICAgLy8gMS4gcmVtb3ZlIHByZXZpb3VzIGVycm9ycyBhbmQgcmVzZXQgdGhlIGJ1dHRvblxuICAgICAgdGhhdC5yZXNldEZvcm1FcnJvcnModGhhdC5vcHRpb25zLCB0aGF0LmVsZW1lbnQpO1xuXG4gICAgICAvLyAyLiBzZXQgdXAgdGhlIGJ1dHRvbiBpZiBpdCdzIGEgZm9ybSBzdWJtaXRcbiAgICAgIGlmICh0eXBlID09PSAnc3VibWl0Jykge1xuICAgICAgICB0aGF0LmJ1dHRvblN0YXR1cyh0aGF0Lm9wdGlvbnMsICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKSwgdHJ1ZSk7XG4gICAgICB9XG5cbiAgICAgIC8vIDMuIGdlbmVyYXRlIGJpbGxpbmcgYWRkcmVzcyBkZXRhaWxzXG4gICAgICB2YXIgYmlsbGluZ0RldGFpbHMgPSB0aGF0LmdlbmVyYXRlQmlsbGluZ0RldGFpbHMoKTtcblxuICAgICAgLy8gNC4gY3JlYXRlIG1pbm5wb3N0IHVzZXIgYWNjb3VudFxuICAgICAgdGhhdC5jcmVhdGVNaW5uUG9zdEFjY291bnQodGhhdC5vcHRpb25zLCB0aGF0LmVsZW1lbnQpO1xuXG4gICAgICAvLyA1LiBkbyB0aGUgY2hhcmdpbmcgb2YgY2FyZCBvciBiYW5rIGFjY291bnQgaWYgaXQncyBhIGZvcm0gc3VibWl0XG4gICAgICAvLyBvciBzdWJtaXQgdGhlIGZvcm0gaWYgdGhpcyBpcyBhIHBheW1lbnQgcmVxdWVzdCBidXR0b25cbiAgICAgIGlmICh0eXBlID09PSAnc3VibWl0Jykge1xuICAgICAgICB2YXIgcGF5bWVudF90eXBlID0gJCgnaW5wdXRbbmFtZT1cInN0cmlwZV9wYXltZW50X3R5cGVcIl0nKS52YWwoKTtcbiAgICAgICAgaWYgKHBheW1lbnRfdHlwZSAhPT0gJ2JhbmtfYWNjb3VudCcpIHtcbiAgICAgICAgICAvLyBmaW5hbGx5LCBnZXQgYSBwYXltZW50IG1ldGhvZCBmcm9tIHN0cmlwZSwgYW5kIHRyeSB0byBjaGFyZ2UgaXQgaWYgaXQgaXMgbm90IGFjaFxuICAgICAgICAgIHRoYXQuY3JlYXRlUGF5bWVudE1ldGhvZCh0aGF0LmNhcmROdW1iZXJFbGVtZW50LCBiaWxsaW5nRGV0YWlscyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gaWYgaXQgaXMgYWNoLCB3ZSBhbHJlYWR5IGhhdmUgYSB0b2tlbiBzbyBzdWJtaXQgdGhlIGZvcm1cbiAgICAgICAgICAvLyB0b2RvOiB1cGdyYWRlIHRoZSBwbGFpZCBpbnRlZ3JhdGlvblxuICAgICAgICAgIHRoYXQuYmFua1Rva2VuSGFuZGxlciggJCgnaW5wdXRbbmFtZT1cImJhbmtUb2tlblwiXScpLnZhbCgpLCAnYmFua19hY2NvdW50JyApO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGF0LnN1Ym1pdEZvcm1Pbmx5KCk7XG4gICAgICB9XG4gICAgfSwgLy8gZm9ybVByb2Nlc3NvclxuXG4gICAgc3RyaXBlRXJyb3JEaXNwbGF5OiBmdW5jdGlvbihlcnJvciwgdGhpc19zZWxlY3RvciwgZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgLy8gbGlzdGVuIGZvciBlcnJvcnMgYW5kIGRpc3BsYXkvaGlkZSBlcnJvciBtZXNzYWdlc1xuICAgICAgdmFyIHdoaWNoX2Vycm9yID0gdGhpc19zZWxlY3Rvci5hdHRyKCdpZCcpO1xuICAgICAgLy8gd2hlbiB0aGlzIGZpZWxkIGNoYW5nZXMsIHJlc2V0IGl0cyBlcnJvcnNcbiAgICAgICQoJy5hLWNhcmQtaW5zdHJ1Y3Rpb24uJyArIHdoaWNoX2Vycm9yKS5yZW1vdmVDbGFzcygnYS12YWxpZGF0aW9uLWVycm9yJyk7XG4gICAgICAkKCcuYS1jYXJkLWluc3RydWN0aW9uLicgKyB3aGljaF9lcnJvcikuZW1wdHkoKTtcbiAgICAgICQodGhpc19zZWxlY3RvcikucmVtb3ZlQ2xhc3MoJ2EtZXJyb3InKTtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICBpZiAoJCgnLmEtY2FyZC1pbnN0cnVjdGlvbi4nICsgd2hpY2hfZXJyb3IpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAkKCcuYS1jYXJkLWluc3RydWN0aW9uLicgKyB3aGljaF9lcnJvcikudGV4dChlcnJvci5tZXNzYWdlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzX3NlbGVjdG9yLnBhcmVudCgpLmFwcGVuZCgnPHAgY2xhc3M9XCJhLWNhcmQtaW5zdHJ1Y3Rpb24gJyArIHdoaWNoX2Vycm9yICsgJ1wiPicgKyBlcnJvci5tZXNzYWdlICsgJzwvcD4nKTtcbiAgICAgICAgfVxuICAgICAgICAkKCcuYS1jYXJkLWluc3RydWN0aW9uLicgKyB3aGljaF9lcnJvcikuYWRkQ2xhc3MoJ2EtdmFsaWRhdGlvbi1lcnJvcicpO1xuICAgICAgICB0aGlzX3NlbGVjdG9yLnBhcmVudCgpLmFkZENsYXNzKCdtLWhhcy12YWxpZGF0aW9uLWVycm9yJyk7XG4gICAgICAgICQodGhpc19zZWxlY3RvcikuYWRkQ2xhc3MoJ2EtZXJyb3InKTtcbiAgICAgICAgaWYgKHRoaXNfc2VsZWN0b3IucGFyZW50KCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICAgIHNjcm9sbFRvcDogdGhpc19zZWxlY3Rvci5wYXJlbnQoKS5vZmZzZXQoKS50b3BcbiAgICAgICAgICB9LCAyMDAwKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJCh0aGlzX3NlbGVjdG9yKS5yZW1vdmVDbGFzcygnYS1lcnJvcicpO1xuICAgICAgICAkKCcuYS1jYXJkLWluc3RydWN0aW9uLicgKyB3aGljaF9lcnJvcikucmVtb3ZlQ2xhc3MoJ2EtdmFsaWRhdGlvbi1lcnJvcicpO1xuICAgICAgICAkKCcuYS1jYXJkLWluc3RydWN0aW9uLicgKyB3aGljaF9lcnJvcikuZW1wdHkoKTtcbiAgICAgICAgJChvcHRpb25zLmNjX251bV9zZWxlY3RvciwgZWxlbWVudCkucmVtb3ZlQ2xhc3MoJ2EtdmFsaWRhdGlvbi1lcnJvcicpO1xuICAgICAgICAkKG9wdGlvbnMuY2NfZXhwX3NlbGVjdG9yLCBlbGVtZW50KS5yZW1vdmVDbGFzcygnYS12YWxpZGF0aW9uLWVycm9yJyk7XG4gICAgICAgICQob3B0aW9ucy5jY19jdmNfc2VsZWN0b3IsIGVsZW1lbnQpLnJlbW92ZUNsYXNzKCdhLXZhbGlkYXRpb24tZXJyb3InKTtcbiAgICAgICAgJChvcHRpb25zLmNjX251bV9zZWxlY3RvciwgZWxlbWVudCkucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ20taGFzLXZhbGlkYXRpb24tZXJyb3InKTtcbiAgICAgICAgJChvcHRpb25zLmNjX2V4cF9zZWxlY3RvciwgZWxlbWVudCkucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ20taGFzLXZhbGlkYXRpb24tZXJyb3InKTtcbiAgICAgICAgJChvcHRpb25zLmNjX2N2Y19zZWxlY3RvciwgZWxlbWVudCkucGFyZW50KCkucmVtb3ZlQ2xhc3MoJ20taGFzLXZhbGlkYXRpb24tZXJyb3InKTtcbiAgICAgIH1cbiAgICB9LCAvLyBzdHJpcGVFcnJvckRpc3BsYXlcblxuICAgIHJlc2V0Rm9ybUVycm9yczogZnVuY3Rpb24ob3B0aW9ucywgZWxlbWVudCkge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgJCgnLmEtdmFsaWRhdGlvbi1lcnJvcicpLnJlbW92ZSgpO1xuICAgICAgJCgnaW5wdXQsIGxhYmVsLCBkaXYnLCBlbGVtZW50KS5yZW1vdmVDbGFzcygnYS1lcnJvcicpO1xuICAgICAgJCgnbGFiZWwnLCBlbGVtZW50KS5yZW1vdmVDbGFzcygnbS1oYXMtdmFsaWRhdGlvbi1lcnJvcicpO1xuICAgICAgJChvcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yLCBlbGVtZW50KS5yZW1vdmVDbGFzcygnYS1lcnJvciBpbnZhbGlkJyk7XG4gICAgICAkKCcuYS12YWxpZGF0aW9uLWVycm9yJykucmVtb3ZlKCk7XG4gICAgICBcbiAgICAgICQob3B0aW9ucy5jaG9vc2VfcGF5bWVudCArICcgaW5wdXQnKS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgICQob3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvciArICcgLmEtZXJyb3InKS5yZW1vdmUoKTsgLy8gcmVtb3ZlIG1ldGhvZCBlcnJvciBtZXNzYWdlIGlmIGl0IGlzIHRoZXJlXG4gICAgICAgICQob3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvcikucGFyZW50KCkuZmluZCgnLmEtdmFsaWRhdGlvbi1lcnJvcicpLnJlbW92ZSgpO1xuICAgICAgICAvLyBpZiBhIHBheW1lbnQgZmllbGQgY2hhbmdlZCwgcmVzZXQgdGhlIGJ1dHRvblxuICAgICAgICB0aGF0LmJ1dHRvblN0YXR1cyhvcHRpb25zLCAkKG9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLmZpbmQoJ2J1dHRvbicpLCBmYWxzZSk7XG4gICAgICB9KTtcbiAgICB9LCAvLyByZXNldEZvcm1FcnJvcnNcbiAgICBcbiAgICBjcmVhdGVNaW5uUG9zdEFjY291bnQ6IGZ1bmN0aW9uKG9wdGlvbnMsIGVsZW1lbnQpIHtcbiAgICAgIC8vIDIuIGNyZWF0ZSBtaW5ucG9zdCBhY2NvdW50IGlmIHNwZWNpZmllZFxuICAgICAgaWYgKG9wdGlvbnMuY3JlYXRlX2FjY291bnQgPT09IHRydWUpIHtcbiAgICAgICAgdmFyIHVzZXIgPSB7XG4gICAgICAgICAgZW1haWw6ICQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgZmlyc3RfbmFtZTogJChvcHRpb25zLmZpcnN0X25hbWVfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgIGxhc3RfbmFtZTogJChvcHRpb25zLmxhc3RfbmFtZV9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgcGFzc3dvcmQ6ICQob3B0aW9ucy5wYXNzd29yZF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgY2l0eTogJChvcHRpb25zLmJpbGxpbmdfY2l0eV9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgc3RhdGU6ICQob3B0aW9ucy5iaWxsaW5nX3N0YXRlX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICB6aXA6ICQob3B0aW9ucy5iaWxsaW5nX3ppcF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgIH07XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgdXJsOiBvcHRpb25zLm1pbm5wb3N0X3Jvb3QgKyAnL3dwLWpzb24vdXNlci1hY2NvdW50LW1hbmFnZW1lbnQvdjEvY3JlYXRlLXVzZXInLFxuICAgICAgICAgIGRhdGE6IHVzZXJcbiAgICAgICAgfSkuZG9uZShmdW5jdGlvbiggZGF0YSApIHtcbiAgICAgICAgICBpZiAoZGF0YS5zdGF0dXMgPT09ICdzdWNjZXNzJyAmJiBkYXRhLnJlYXNvbiA9PT0gJ25ldyB1c2VyJykge1xuICAgICAgICAgICAgLy8gdXNlciBjcmVhdGVkIC0gdGhleSBzaG91bGQgcmVjZWl2ZSBlbWFpbFxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSwgLy8gY3JlYXRlTWlublBvc3RBY2NvdW50XG4gICAgXG4gICAgZ2VuZXJhdGVCaWxsaW5nRGV0YWlsczogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgYmlsbGluZ0RldGFpbHMgPSB7fTtcbiAgICAgIHZhciBhZGRyZXNzRGV0YWlscyA9IHt9O1xuXG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IpLnZhbCgpICE9ICcnKSB7XG4gICAgICAgIGJpbGxpbmdEZXRhaWxzLmVtYWlsID0gJCh0aGlzLm9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IpLnZhbCgpO1xuICAgICAgfVxuICAgICAgXG4gICAgICB2YXIgZnVsbF9uYW1lID0gJyc7XG4gICAgICBpZiAoJCgnI2Z1bGxfbmFtZScpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgZnVsbF9uYW1lID0gJCgnI2Z1bGxfbmFtZScpLnZhbCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZnVsbF9uYW1lID0gJCh0aGlzLm9wdGlvbnMuZmlyc3RfbmFtZV9maWVsZF9zZWxlY3RvcikudmFsKCkgKyAnICcgKyAkKHRoaXMub3B0aW9ucy5sYXN0X25hbWVfZmllbGRfc2VsZWN0b3IpLnZhbCgpO1xuICAgICAgfVxuICAgICAgYmlsbGluZ0RldGFpbHMubmFtZSA9IGZ1bGxfbmFtZTtcblxuICAgICAgdmFyIHN0cmVldCA9ICdOb25lJztcbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5iaWxsaW5nX3N0cmVldF9maWVsZF9zZWxlY3RvcikudmFsKCkgIT0gJycpIHtcbiAgICAgICAgc3RyZWV0ID0gJCh0aGlzLm9wdGlvbnMuYmlsbGluZ19zdHJlZXRfZmllbGRfc2VsZWN0b3IpLnZhbCgpO1xuICAgICAgICBhZGRyZXNzRGV0YWlscy5saW5lMSA9IHN0cmVldDtcbiAgICAgIH1cblxuICAgICAgdmFyIGNpdHkgPSAnTm9uZSc7XG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuYmlsbGluZ19jaXR5X2ZpZWxkX3NlbGVjdG9yKS52YWwoKSAhPSAnJykge1xuICAgICAgICBjaXR5ID0gJCh0aGlzLm9wdGlvbnMuYmlsbGluZ19jaXR5X2ZpZWxkX3NlbGVjdG9yKS52YWwoKTtcbiAgICAgICAgYWRkcmVzc0RldGFpbHMuY2l0eSA9IGNpdHk7XG4gICAgICB9XG5cbiAgICAgIHZhciBzdGF0ZSA9ICdOb25lJztcbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5iaWxsaW5nX3N0YXRlX2ZpZWxkX3NlbGVjdG9yKS52YWwoKSAhPSAnJykge1xuICAgICAgICBzdGF0ZSA9ICQodGhpcy5vcHRpb25zLmJpbGxpbmdfc3RhdGVfZmllbGRfc2VsZWN0b3IpLnZhbCgpO1xuICAgICAgICBhZGRyZXNzRGV0YWlscy5zdGF0ZSA9IHN0YXRlO1xuICAgICAgfVxuXG4gICAgICB2YXIgemlwID0gJ05vbmUnO1xuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmJpbGxpbmdfemlwX2ZpZWxkX3NlbGVjdG9yKS52YWwoKSAhPSAnJykge1xuICAgICAgICB6aXAgPSAkKHRoaXMub3B0aW9ucy5iaWxsaW5nX3ppcF9maWVsZF9zZWxlY3RvcikudmFsKCk7XG4gICAgICAgIGFkZHJlc3NEZXRhaWxzLnBvc3RhbF9jb2RlID0gemlwO1xuICAgICAgfVxuXG4gICAgICB2YXIgY291bnRyeSA9ICdVUyc7XG4gICAgICB2YXIgY291bnRyeV9maWVsZF92YWx1ZSA9ICQodGhpcy5vcHRpb25zLmJpbGxpbmdfY291bnRyeV9maWVsZF9zZWxlY3RvcikudmFsKCk7XG4gICAgICBpZiAoY291bnRyeV9maWVsZF92YWx1ZSAhPSAnJyAmJiBjb3VudHJ5X2ZpZWxkX3ZhbHVlICE9ICdVbml0ZWQgU3RhdGVzJykge1xuICAgICAgICBjb3VudHJ5ID0gY291bnRyeV9maWVsZF92YWx1ZTtcbiAgICAgIH1cbiAgICAgIGFkZHJlc3NEZXRhaWxzLmNvdW50cnkgPSBjb3VudHJ5O1xuXG4gICAgICBpZiAoc3RyZWV0ICE9PSAnTm9uZScgfHwgY2l0eSAhPT0gJ05vbmUnIHx8IHN0YXRlICE9PSAnTm9uZScgfHwgemlwICE9PSAnTm9uZScpIHtcbiAgICAgICAgYmlsbGluZ0RldGFpbHMuYWRkcmVzcyA9IGFkZHJlc3NEZXRhaWxzO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gYmlsbGluZ0RldGFpbHM7XG4gICAgfSwgLy8gZ2VuZXJhdGVCaWxsaW5nRGV0YWlsc1xuXG4gICAgY3JlYXRlUGF5bWVudE1ldGhvZDogZnVuY3Rpb24oY2FyZEVsZW1lbnQsIGJpbGxpbmdEZXRhaWxzKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB0aGF0LnN0cmlwZS5jcmVhdGVQYXltZW50TWV0aG9kKHtcbiAgICAgICAgdHlwZTogJ2NhcmQnLFxuICAgICAgICBjYXJkOiBjYXJkRWxlbWVudCxcbiAgICAgICAgYmlsbGluZ19kZXRhaWxzOiBiaWxsaW5nRGV0YWlsc1xuICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICBpZiAocmVzcG9uc2UuZXJyb3IpIHtcbiAgICAgICAgICB0aGF0LmhhbmRsZVNlcnZlckVycm9yKHJlc3BvbnNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBTZW5kIHBheW1lbnRNZXRob2QuaWQgdG8gc2VydmVyXG4gICAgICAgICAgdmFyIHN1cHBvcnRmb3JtID0gJCh0aGF0Lm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpO1xuICAgICAgICAgIHZhciBhamF4X3VybCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcbiAgICAgICAgICB2YXIgdG9rZW5GaWVsZE5hbWUgPSAncGF5bWVudF9tZXRob2RfaWQnO1xuICAgICAgICAgIHZhciB0b2tlbkZpZWxkID0gJ2lucHV0W25hbWU9XCInICsgdG9rZW5GaWVsZE5hbWUgKyAnXCJdJztcblxuICAgICAgICAgIC8vIEluc2VydCB0aGUgcGF5bWVudCBtZXRob2QgSUQgaW50byB0aGUgZm9ybSBzbyBpdCBnZXRzIHN1Ym1pdHRlZCB0byB0aGUgc2VydmVyXG4gICAgICAgICAgaWYgKCQodG9rZW5GaWVsZCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgJCh0b2tlbkZpZWxkKS52YWwocmVzcG9uc2UucGF5bWVudE1ldGhvZC5pZCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHN1cHBvcnRmb3JtLmFwcGVuZCgkKCc8aW5wdXQgdHlwZT1cXFwiaGlkZGVuXFxcIiBuYW1lPVwiJyArIHRva2VuRmllbGROYW1lICsgJ1wiPicpLnZhbChyZXNwb25zZS5wYXltZW50TWV0aG9kLmlkKSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZmV0Y2goYWpheF91cmwsIHtcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBib2R5OiAkKHN1cHBvcnRmb3JtKS5zZXJpYWxpemUoKVxuICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIC8vIEhhbmRsZSBzZXJ2ZXIgcmVzcG9uc2UgKHNlZSBTdGVwIDMpXG4gICAgICAgICAgICByZXNwb25zZS5qc29uKCkudGhlbihmdW5jdGlvbihqc29uKSB7XG4gICAgICAgICAgICAgIHRoYXQuaGFuZGxlU2VydmVyUmVzcG9uc2UoanNvbik7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LCAvLyBjcmVhdGVQYXltZW50TWV0aG9kXG5cbiAgICBiYW5rVG9rZW5IYW5kbGVyOiBmdW5jdGlvbih0b2tlbiwgdHlwZSkge1xuICAgICAgdGhpcy5zZXRTdHJpcGVQYXltZW50VHlwZSh0eXBlKTtcbiAgICAgIHRoaXMuc3VibWl0Rm9ybU9ubHkoKTtcbiAgICB9LCAvLyBiYW5rVG9rZW5IYW5kbGVyXG5cbiAgICBzdWJtaXRGb3JtT25seTogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB2YXIgc3VwcG9ydGZvcm0gPSAkKHRoaXMub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3Rvcik7XG4gICAgICB2YXIgYWpheF91cmwgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG5cbiAgICAgIC8vIFN1Ym1pdCB0aGUgZm9ybVxuICAgICAgLy8gdGhlIHdheSBpdCB3b3JrcyBjdXJyZW50bHkgaXMgdGhlIGZvcm0gc3VibWl0cyBhbiBhamF4IHJlcXVlc3QgdG8gaXRzZWxmXG4gICAgICAvLyB0aGVuIGl0IHN1Ym1pdHMgYSBwb3N0IHJlcXVlc3QgdG8gdGhlIGZvcm0ncyBhY3Rpb24gdXJsXG4gICAgICAkLmFqYXgoe1xuICAgICAgICB1cmw6IGFqYXhfdXJsLFxuICAgICAgICBjYWNoZTogZmFsc2UsXG4gICAgICAgIGRhdGE6ICQoc3VwcG9ydGZvcm0pLnNlcmlhbGl6ZSgpLFxuICAgICAgICB0eXBlOiAnUE9TVCdcbiAgICAgIH0pXG4gICAgICAuZG9uZShmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICBpZiAodHlwZW9mIHJlc3BvbnNlLmVycm9ycyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICB0aGF0LmhhbmRsZVNlcnZlckVycm9yKHJlc3BvbnNlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdXBwb3J0Zm9ybS5nZXQoMCkuc3VibWl0KCk7IC8vIGNvbnRpbnVlIHN1Ym1pdHRpbmcgdGhlIGZvcm0gaWYgdGhlIGFqYXggd2FzIHN1Y2Nlc3NmdWxcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5mYWlsKGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGF0LmJ1dHRvblN0YXR1cyh0aGF0Lm9wdGlvbnMsICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKSwgZmFsc2UpO1xuICAgICAgfSk7XG4gICAgfSwgLy8gc3VibWl0Rm9ybU9ubHlcblxuICAgIGhhbmRsZVNlcnZlclJlc3BvbnNlOiBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgdmFyIHN1cHBvcnRmb3JtID0gJCh0aGlzLm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpO1xuICAgICAgaWYgKHJlc3BvbnNlLmVycm9ycykge1xuICAgICAgICAvLyBTaG93IGVycm9yIGZyb20gc2VydmVyIG9uIHBheW1lbnQgZm9ybVxuICAgICAgICB0aGlzLmhhbmRsZVNlcnZlckVycm9yKHJlc3BvbnNlKTtcbiAgICAgIH0gZWxzZSBpZiAocmVzcG9uc2UucmVxdWlyZXNfYWN0aW9uKSB7XG4gICAgICAgIC8vIFVzZSBTdHJpcGUuanMgdG8gaGFuZGxlIHJlcXVpcmVkIGNhcmQgYWN0aW9uXG4gICAgICAgIC8vaGFuZGxlQWN0aW9uKHJlc3BvbnNlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN1cHBvcnRmb3JtLmdldCgwKS5zdWJtaXQoKTsgLy8gY29udGludWUgc3VibWl0dGluZyB0aGUgZm9ybSBpZiB0aGUgYWpheCB3YXMgc3VjY2Vzc2Z1bFxuICAgICAgfVxuICAgIH0sIC8vIGhhbmRsZVNlcnZlclJlc3BvbnNlXG5cbiAgICBoYW5kbGVTZXJ2ZXJFcnJvcjogZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHZhciB0aGlzX2ZpZWxkID0gJyc7XG4gICAgICAvLyBkbyBub3Qgc3VibWl0LiB0aGVyZSBpcyBhbiBlcnJvci5cbiAgICAgIHRoYXQuYnV0dG9uU3RhdHVzKHRoYXQub3B0aW9ucywgJCh0aGF0Lm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLmZpbmQoJ2J1dHRvbicpLCBmYWxzZSk7XG4gICAgICAvLyBoYW5kbGUgZXJyb3IgZGlzcGxheVxuICAgICAgaWYgKHR5cGVvZiByZXNwb25zZS5lcnJvcnMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVzcG9uc2UuZXJyb3JzWzBdICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIHRoaXNfZmllbGQgPSByZXNwb25zZS5lcnJvcnNbMF0uZmllbGQgKyAnX2ZpZWxkX3NlbGVjdG9yJztcbiAgICAgICAgfVxuICAgICAgICAkLmVhY2gocmVzcG9uc2UuZXJyb3JzLCBmdW5jdGlvbiggaW5kZXgsIGVycm9yICkge1xuICAgICAgICAgIGlmICh0eXBlb2YgZXJyb3IuZmllbGQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICB0aGlzX2ZpZWxkID0gZXJyb3IuZmllbGQgKyAnX2ZpZWxkX3NlbGVjdG9yJztcbiAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBlcnJvci5wYXJhbSAhPT0gJ3VuZGVmaW5lZCcgJiYgZXJyb3IucGFyYW0gIT09ICcnKSB7XG4gICAgICAgICAgICB0aGlzX2ZpZWxkID0gJ2NjXycgKyBlcnJvci5wYXJhbSArICdfc2VsZWN0b3InOyAgXG4gICAgICAgICAgfVxuICAgICAgICAgIHRoYXQuZGlzcGxheUVycm9yTWVzc2FnZShlcnJvciwgdGhpc19maWVsZCk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgcmVzcG9uc2UuZXJyb3IgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHZhciBlcnJvciA9IHJlc3BvbnNlLmVycm9yO1xuICAgICAgICBpZiAodHlwZW9mIGVycm9yLmZpZWxkICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIHRoaXNfZmllbGQgPSBlcnJvci5maWVsZCArICdfZmllbGRfc2VsZWN0b3InO1xuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBlcnJvci5wYXJhbSAhPT0gJ3VuZGVmaW5lZCcgJiYgZXJyb3IucGFyYW0gIT09ICcnKSB7XG4gICAgICAgICAgdGhpc19maWVsZCA9ICdjY18nICsgZXJyb3IucGFyYW0gKyAnX3NlbGVjdG9yJzsgIFxuICAgICAgICB9XG4gICAgICAgIHRoYXQuZGlzcGxheUVycm9yTWVzc2FnZShlcnJvciwgdGhpc19maWVsZCk7XG4gICAgICB9XG4gICAgICBpZiAoJCh0aGF0Lm9wdGlvbnNbdGhpc19maWVsZF0pLmxlbmd0aCA+IDApIHtcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgIHNjcm9sbFRvcDogJCh0aGF0Lm9wdGlvbnNbdGhpc19maWVsZF0pLnBhcmVudCgpLm9mZnNldCgpLnRvcFxuICAgICAgICB9LCAyMDAwKTtcbiAgICAgIH1cbiAgICB9LCAvLyBoYW5kbGVTZXJ2ZXJFcnJvclxuXG4gICAgZGlzcGxheUVycm9yTWVzc2FnZShlcnJvciwgZmllbGQpIHtcbiAgICAgIHZhciBtZXNzYWdlID0gJyc7XG4gICAgICB2YXIgc3RyaXBlRXJyb3JTZWxlY3RvciA9ICcnO1xuICAgICAgdmFyIGZpZWxkUGFyZW50ID0gJCh0aGlzLm9wdGlvbnNbZmllbGRdKS5wYXJlbnQoKTtcbiAgICAgIGlmICh0eXBlb2YgZXJyb3IubWVzc2FnZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgbWVzc2FnZSA9IGVycm9yLm1lc3NhZ2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBtZXNzYWdlID0gZXJyb3IubWVzc2FnZVswXTtcbiAgICAgIH1cbiAgICAgIGlmICgkKHRoaXMub3B0aW9uc1tmaWVsZF0pLmxlbmd0aCA+IDApIHtcbiAgICAgICAgJCh0aGlzLm9wdGlvbnNbZmllbGRdKS5hZGRDbGFzcygnYS1lcnJvcicpO1xuICAgICAgICAkKHRoaXMub3B0aW9uc1tmaWVsZF0pLnByZXYoKS5hZGRDbGFzcygnYS1lcnJvcicpO1xuICAgICAgICBpZiAoJCgnLmEtY2FyZC1pbnN0cnVjdGlvbicsIGZpZWxkUGFyZW50KS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgJCgnLmEtY2FyZC1pbnN0cnVjdGlvbicsIGZpZWxkUGFyZW50KS5hZGRDbGFzcygnYS12YWxpZGF0aW9uLWVycm9yJyk7XG4gICAgICAgICAgJCgnLmEtY2FyZC1pbnN0cnVjdGlvbicsIGZpZWxkUGFyZW50KS50ZXh0KG1lc3NhZ2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICQodGhpcy5vcHRpb25zW2ZpZWxkXSkuYWZ0ZXIoJzxwIGNsYXNzPVwiYS1jYXJkLWluc3RydWN0aW9uIGEtdmFsaWRhdGlvbi1lcnJvclwiPicgKyBtZXNzYWdlICsgJzwvcD4nKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZXJyb3IgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRoaXMuYnV0dG9uU3RhdHVzKHRoaXMub3B0aW9ucywgJCh0aGlzLm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLmZpbmQoJ2J1dHRvbicpLCBmYWxzZSk7XG4gICAgICAgIGlmIChlcnJvci5jb2RlID09PSAnaW5jb21wbGV0ZV9udW1iZXInIHx8IGVycm9yLmNvZGUgPT0gJ2ludmFsaWRfbnVtYmVyJyB8fCBlcnJvci5jb2RlID09ICdpbmNvcnJlY3RfbnVtYmVyJyB8fCBlcnJvci5jb2RlID09ICdjYXJkX2RlY2xpbmVkJyB8fCBlcnJvci5jb2RlID09ICdwcm9jZXNzaW5nX2Vycm9yJykge1xuICAgICAgICAgIC8vIGVycm9yIGhhbmRsaW5nXG4gICAgICAgICAgc3RyaXBlRXJyb3JTZWxlY3RvciA9ICQodGhpcy5vcHRpb25zLmNjX251bV9zZWxlY3Rvcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9yLmNvZGUgPT0gJ2ludmFsaWRfZXhwaXJ5X21vbnRoJyB8fCBlcnJvci5jb2RlID09ICdpbnZhbGlkX2V4cGlyeV95ZWFyJyB8fCBlcnJvci5jb2RlID09ICdleHBpcmVkX2NhcmQnKSB7XG4gICAgICAgICAgLy8gZXJyb3IgaGFuZGxpbmdcbiAgICAgICAgICBzdHJpcGVFcnJvclNlbGVjdG9yID0gJCh0aGlzLm9wdGlvbnMuY2NfZXhwX3NlbGVjdG9yKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXJyb3IuY29kZSA9PSAnaW52YWxpZF9jdmMnIHx8IGVycm9yLmNvZGUgPT0gJ2luY29ycmVjdF9jdmMnKSB7XG4gICAgICAgICAgLy8gZXJyb3IgaGFuZGxpbmdcbiAgICAgICAgICBzdHJpcGVFcnJvclNlbGVjdG9yID0gJCh0aGlzLm9wdGlvbnMuY2NfY3ZjX3NlbGVjdG9yKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXJyb3IuY29kZSA9PSAnZW1haWxfaW52YWxpZCcpIHtcbiAgICAgICAgICAvLyBlcnJvciBoYW5kbGluZ1xuICAgICAgICAgIHN0cmlwZUVycm9yU2VsZWN0b3IgPSAkKHRoaXMub3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3Rvcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN0cmlwZUVycm9yU2VsZWN0b3IgIT09ICcnKSB7XG4gICAgICAgICAgdGhpcy5zdHJpcGVFcnJvckRpc3BsYXkoZXJyb3IsIHN0cmlwZUVycm9yU2VsZWN0b3IsIHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9yLnR5cGUgPT0gJ21pc3NpbmdfcGF5bWVudCcgJiYgc3RyaXBlRXJyb3JTZWxlY3RvciA9PT0gJycpIHtcbiAgICAgICAgICAkKHRoaXMub3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvciArICcuYWN0aXZlJykuYXBwZW5kKCc8cCBjbGFzcz1cImEtZm9ybS1jYXB0aW9uIGEtdmFsaWRhdGlvbi1lcnJvciBhLW1pc3NpbmctcGF5bWVudC1lcnJvclwiPicgKyBlcnJvci5tZXNzYWdlICsgJzwvcD4nKVxuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJvci5maWVsZCA9PSAncmVjYXB0Y2hhJykge1xuICAgICAgICAgICQodGhpcy5vcHRpb25zLnBheV9idXR0b25fc2VsZWN0b3IpLmJlZm9yZSgnPHAgY2xhc3M9XCJhLWZvcm0tY2FwdGlvbiBhLXZhbGlkYXRpb24tZXJyb3IgYS1yZWNhcHRjaGEtZXJyb3JcIj4nICsgbWVzc2FnZSArICc8L3A+JylcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXJyb3IudHlwZSA9PSAnaW52YWxpZF9yZXF1ZXN0X2Vycm9yJyAmJiBzdHJpcGVFcnJvclNlbGVjdG9yID09PSAnJykge1xuICAgICAgICAgICQodGhpcy5vcHRpb25zLnBheV9idXR0b25fc2VsZWN0b3IpLmJlZm9yZSgnPHAgY2xhc3M9XCJhLWZvcm0tY2FwdGlvbiBhLXZhbGlkYXRpb24tZXJyb3IgYS1pbnZhbGlkLXJlcXVlc3QtZXJyb3JcIj4nICsgZXJyb3IubWVzc2FnZSArICc8L3A+JylcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIC8vIGRpc3BsYXlFcnJvck1lc3NhZ2VcblxuICAgIHNob3dOZXdzbGV0dGVyU2V0dGluZ3M6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcblxuICAgICAgdmFyIG5ld3NsZXR0ZXJfZ3JvdXBfaHRtbCA9ICcnO1xuICAgICAgaWYgKCQob3B0aW9ucy5uZXdzbGV0dGVyX2dyb3VwX3NlbGVjdG9yKS5sZW5ndGggPiAwICkge1xuICAgICAgICB2YXIgZ2V0X2RhdGEgPSB7XG4gICAgICAgICAgc2hvcnRjb2RlOiAnbmV3c2xldHRlcl9mb3JtJyxcbiAgICAgICAgICBwbGFjZW1lbnQ6ICd1c2VyYWNjb3VudCdcbiAgICAgICAgfTtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgIHVybDogb3B0aW9ucy5taW5ucG9zdF9yb290ICsgJy93cC1qc29uL21pbm5wb3N0LWFwaS92Mi9tYWlsY2hpbXAvZm9ybScsXG4gICAgICAgICAgZGF0YTogZ2V0X2RhdGFcbiAgICAgICAgfSkuZG9uZShmdW5jdGlvbiggcmVzdWx0ICkge1xuICAgICAgICAgIGlmICggdHlwZW9mIHJlc3VsdC5ncm91cF9maWVsZHMgIT09ICd1bmRlZmluZWQnICkge1xuICAgICAgICAgICAgJC5lYWNoKHJlc3VsdC5ncm91cF9maWVsZHMsIGZ1bmN0aW9uKCBpbmRleCwgY2F0ZWdvcnkgKSB7XG4gICAgICAgICAgICAgIG5ld3NsZXR0ZXJfZ3JvdXBfaHRtbCArPSAnPGZpZWxkc2V0IGNsYXNzPVwibS1mb3JtLWl0ZW0gc3VwcG9ydC1uZXdzbGV0dGVyIG0tZm9ybS1pdGVtLScgKyBjYXRlZ29yeS50eXBlICsgJ1wiPic7XG4gICAgICAgICAgICAgIG5ld3NsZXR0ZXJfZ3JvdXBfaHRtbCArPSAnPGxhYmVsPicgKyBjYXRlZ29yeS5uYW1lICsgJzo8L2xhYmVsPic7XG4gICAgICAgICAgICAgIGlmICggY2F0ZWdvcnkuY29udGFpbnMubGVuZ3RoID4gMCApIHtcbiAgICAgICAgICAgICAgICBuZXdzbGV0dGVyX2dyb3VwX2h0bWwgKz0gJzxkaXYgY2xhc3M9XCJtLWZvcm0taXRlbSBtLWZvcm0taXRlbS1uZXdzbGV0dGVyXCI+JztcbiAgICAgICAgICAgICAgICAkLmVhY2goY2F0ZWdvcnlbY2F0ZWdvcnkuY29udGFpbnNdLCBmdW5jdGlvbiggaW5kZXgsIGl0ZW0gKSB7XG4gICAgICAgICAgICAgICAgICBuZXdzbGV0dGVyX2dyb3VwX2h0bWwgKz0gJzxsYWJlbD48aW5wdXQgbmFtZT1cImdyb3Vwc19zdWJtaXR0ZWRcIiB0eXBlPVwiY2hlY2tib3hcIiB2YWx1ZT1cIicgKyBpdGVtLmlkICsgJ1wiPicgKyBpdGVtLm5hbWUgKyAnPC9sYWJlbD4nO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIG5ld3NsZXR0ZXJfZ3JvdXBfaHRtbCArPSAnPC9kaXY+JztcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBuZXdzbGV0dGVyX2dyb3VwX2h0bWwgKz0gJzwvZmllbGRzZXQ+JztcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJChvcHRpb25zLm5ld3NsZXR0ZXJfZ3JvdXBfc2VsZWN0b3IpLmh0bWwobmV3c2xldHRlcl9ncm91cF9odG1sKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoJChvcHRpb25zLm5ld3NsZXR0ZXJfZ3JvdXBfc2VsZWN0b3IpLmxlbmd0aCA+IDAgJiYgdHlwZW9mICQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHZhciBnZXRfZGF0YSA9IHtcbiAgICAgICAgICBlbWFpbDogJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKVxuICAgICAgICB9O1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgdXJsOiBvcHRpb25zLm1pbm5wb3N0X3Jvb3QgKyAnL3dwLWpzb24vbWlubnBvc3QtYXBpL3YyL21haWxjaGltcC91c2VyJyxcbiAgICAgICAgICBkYXRhOiBnZXRfZGF0YVxuICAgICAgICB9KS5kb25lKGZ1bmN0aW9uKCByZXN1bHQgKSB7XG4gICAgICAgICAgaWYgKCB0eXBlb2YgcmVzdWx0Lm1haWxjaGltcF9zdGF0dXMgIT09ICd1bmRlZmluZWQnICkge1xuICAgICAgICAgICAgJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5hZnRlcignPGlucHV0IG5hbWU9XCJtYWlsY2hpbXBfc3RhdHVzXCIgdHlwZT1cImhpZGRlblwiIHZhbHVlPVwiJyArIHJlc3VsdC5tYWlsY2hpbXBfc3RhdHVzICsgJ1wiPicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIHR5cGVvZiByZXN1bHQubWFpbGNoaW1wX3VzZXJfaWQgIT09ICd1bmRlZmluZWQnICkge1xuICAgICAgICAgICAgJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5hZnRlcignPGlucHV0IG5hbWU9XCJtYWlsY2hpbXBfdXNlcl9pZFwiIHR5cGU9XCJoaWRkZW5cIiB2YWx1ZT1cIicgKyByZXN1bHQubWFpbGNoaW1wX3VzZXJfaWQgKyAnXCI+Jyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChyZXN1bHQubWFpbGNoaW1wX3N0YXR1cyA9PT0gJ3N1YnNjcmliZWQnKSB7XG4gICAgICAgICAgICAvLyB1c2VyIGNyZWF0ZWQgLSBzaG93IGEgc3VjY2VzcyBtZXNzYWdlXG4gICAgICAgICAgICAkKCcuYS1jb25maXJtLWluc3RydWN0aW9ucycpLnRleHQoJCgnLmEtY29uZmlybS1pbnN0cnVjdGlvbnMnKS5hdHRyKCdkYXRhLWtub3duLXVzZXInKSk7XG4gICAgICAgICAgICB2YXIgZ3JvdXBzID0gcmVzdWx0Lmdyb3VwcztcbiAgICAgICAgICAgICQuZWFjaChncm91cHMsIGZ1bmN0aW9uKCBpbmRleCwgdmFsdWUgKSB7XG4gICAgICAgICAgICAgIGlmICggdmFsdWUgPT09IHRydWUgKSB7XG4gICAgICAgICAgICAgICAgJCgnOmNoZWNrYm94W3ZhbHVlPVwiJyArIGluZGV4ICsgJ1wiXScpLnByb3AoJ2NoZWNrZWQnLHRydWUpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICQoJzpjaGVja2JveFt2YWx1ZT1cIicgKyBpbmRleCArICdcIl0nKS5wcm9wKCdjaGVja2VkJyxmYWxzZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICB9LCAvLyBzaG93TmV3c2xldHRlclNldHRpbmdzXG5cbiAgICBjb25maXJtTWVzc2FnZVN1Ym1pdDogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuXG4gICAgICB2YXIgZXhpc3RpbmdfbmV3c2xldHRlcl9zZXR0aW5ncyA9ICQob3B0aW9ucy5uZXdzbGV0dGVyX2dyb3VwX3NlbGVjdG9yICsgJyBpbnB1dCcpLnNlcmlhbGl6ZSgpO1xuICAgICAgLy90aGlzLmRlYnVnKGV4aXN0aW5nX25ld3NsZXR0ZXJfc2V0dGluZ3MpO1xuXG4gICAgICAkKG9wdGlvbnMuY29uZmlybV9mb3JtX3NlbGVjdG9yKS5zdWJtaXQoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICB2YXIgY29uZmlybWZvcm0gPSAkKG9wdGlvbnMuY29uZmlybV9mb3JtX3NlbGVjdG9yKTtcbiAgICAgICAgLy8gc3VibWl0IHNldHRpbmdzIHRvIG1haWxjaGltcFxuICAgICAgICAvLyBuZWVkIHRvIGdldCB1c2VyIGluZm8gb24gYSBoaWRkZW4gZmllbGQgaGVyZVxuXG4gICAgICAgIHZhciBuZXdzbGV0dGVyX2dyb3VwcyA9ICQob3B0aW9ucy5uZXdzbGV0dGVyX2dyb3VwX3NlbGVjdG9yICsgJyBpbnB1dDpjaGVja2VkJyk7XG4gICAgICAgIHZhciBuZXdfbmV3c2xldHRlcl9zZXR0aW5ncyA9IG5ld3NsZXR0ZXJfZ3JvdXBzLnNlcmlhbGl6ZSgpO1xuXG4gICAgICAgIGlmICgoZXhpc3RpbmdfbmV3c2xldHRlcl9zZXR0aW5ncyAhPT0gbmV3X25ld3NsZXR0ZXJfc2V0dGluZ3MpICYmICh0eXBlb2YgbmV3c2xldHRlcl9ncm91cHMgIT09ICd1bmRlZmluZWQnKSkge1xuICAgICAgICAgIC8vYWRkIG91ciBvd24gYWpheCBjaGVjayBhcyBYLVJlcXVlc3RlZC1XaXRoIGlzIG5vdCBhbHdheXMgcmVsaWFibGVcbiAgICAgICAgICAvL2FqYXhfZm9ybV9kYXRhID0gbmV3X25ld3NsZXR0ZXJfc2V0dGluZ3MgKyAnJmFqYXhyZXF1ZXN0PXRydWUmc3Vic2NyaWJlJztcblxuICAgICAgICAgIHZhciBwb3N0X2RhdGEgPSB7XG4gICAgICAgICAgICBlbWFpbDogJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICAgIGZpcnN0X25hbWU6ICQob3B0aW9ucy5maXJzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICAgIGxhc3RfbmFtZTogJChvcHRpb25zLmxhc3RfbmFtZV9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgICBncm91cHNfc3VibWl0dGVkOiB7fVxuICAgICAgICAgIH07XG5cbiAgICAgICAgICBwb3N0X2RhdGEuZ3JvdXBzX2F2YWlsYWJsZSA9ICdhbGwnO1xuXG4gICAgICAgICAgaWYgKCAkKCdpbnB1dFtuYW1lPVwibWFpbGNoaW1wX3N0YXR1c1wiXScpLmxlbmd0aCA+IDAgKSB7XG4gICAgICAgICAgICBwb3N0X2RhdGEubWFpbGNoaW1wX3N0YXR1cyA9ICQoJ2lucHV0W25hbWU9XCJtYWlsY2hpbXBfc3RhdHVzXCJdJykudmFsKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKCAkKCdpbnB1dFtuYW1lPVwibWFpbGNoaW1wX3VzZXJfaWRcIl0nKS5sZW5ndGggPiAwICkge1xuICAgICAgICAgICAgcG9zdF9kYXRhLm1haWxjaGltcF91c2VyX2lkID0gJCgnaW5wdXRbbmFtZT1cIm1haWxjaGltcF91c2VyX2lkXCJdJykudmFsKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHR5cGVvZiBuZXdzbGV0dGVyX2dyb3VwcyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICQuZWFjaChuZXdzbGV0dGVyX2dyb3VwcywgZnVuY3Rpb24oaW5kZXgsIHZhbHVlKSB7XG4gICAgICAgICAgICAgIHZhciBncm91cCA9ICQodGhpcykudmFsKCk7XG4gICAgICAgICAgICAgIHBvc3RfZGF0YS5ncm91cHNfc3VibWl0dGVkW2luZGV4XSA9IGdyb3VwO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHVybDogb3B0aW9ucy5taW5ucG9zdF9yb290ICsgJy93cC1qc29uL21pbm5wb3N0LWFwaS92Mi9tYWlsY2hpbXAvdXNlcicsXG4gICAgICAgICAgICB0eXBlOiAncG9zdCcsXG4gICAgICAgICAgICBkYXRhVHlwZSA6ICdqc29uJyxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcsXG4gICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeShwb3N0X2RhdGEpXG4gICAgICAgICAgfSlcbiAgICAgICAgICAuZG9uZShmdW5jdGlvbihyZXNwb25zZSkgeyAvLyByZXNwb25zZSBmcm9tIHRoZSBQSFAgYWN0aW9uXG4gICAgICAgICAgICB2YXIgbWVzc2FnZSA9ICcnO1xuICAgICAgICAgICAgaWYgKCByZXNwb25zZS5zdWNjZXNzID09PSB0cnVlICkge1xuICAgICAgICAgICAgICAvKnN3aXRjaCAocmVzcG9uc2UuZGF0YS51c2VyX3N0YXR1cykge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2V4aXN0aW5nJzpcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnVGhhbmtzIGZvciB1cGRhdGluZyB5b3VyIGVtYWlsIHByZWZlcmVuY2VzLiBUaGV5IHdpbGwgZ28gaW50byBlZmZlY3QgaW1tZWRpYXRlbHkuJztcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ25ldyc6XG4gICAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ1dlIGhhdmUgYWRkZWQgeW91IHRvIHRoZSBNaW5uUG9zdCBtYWlsaW5nIGxpc3QuJztcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ3BlbmRpbmcnOlxuICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9ICdXZSBoYXZlIGFkZGVkIHlvdSB0byB0aGUgTWlublBvc3QgbWFpbGluZyBsaXN0LiBZb3Ugd2lsbCBuZWVkIHRvIGNsaWNrIHRoZSBjb25maXJtYXRpb24gbGluayBpbiB0aGUgZW1haWwgd2Ugc2VudCB0byBiZWdpbiByZWNlaXZpbmcgbWVzc2FnZXMuJztcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9Ki9cbiAgICAgICAgICAgICAgLy9jb25maXJtZm9ybS5nZXQoMCkuc3VibWl0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb25maXJtZm9ybS5nZXQoMCkuc3VibWl0KCk7XG4gICAgICAgICAgICAvLyQoJy5tLWhvbGQtbWVzc2FnZScpLmh0bWwoJzxkaXYgY2xhc3M9XCJtLWZvcm0tbWVzc2FnZSBtLWZvcm0tbWVzc2FnZS1pbmZvXCI+JyArIG1lc3NhZ2UgKyAnPC9kaXY+Jyk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuZmFpbChmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgLy8gd2Ugc2hvdWxkIHB1dCBhbiBhY3R1YWwgZXJyb3IgbWVzc2FnZSBoZXJlIHNvbWVkYXksIHByb2JhYmx5XG4gICAgICAgICAgICAvLyQoJy5tLWhvbGQtbWVzc2FnZScpLmh0bWwoJzxkaXYgY2xhc3M9XCJtLWZvcm0tbWVzc2FnZSBtLWZvcm0tbWVzc2FnZS1pbmZvXCI+QW4gZXJyb3IgaGFzIG9jY3VyZWQuIFBsZWFzZSB0cnkgYWdhaW4uPC9kaXY+Jyk7XG4gICAgICAgICAgICBjb25maXJtZm9ybS5nZXQoMCkuc3VibWl0KCk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgfSBlbHNlIHsgLy8gZW5kIHBhcnQgd2hlcmUgc2V0dGluZ3MgY2hhbmdlZFxuICAgICAgICAgIGNvbmZpcm1mb3JtLmdldCgwKS5zdWJtaXQoKTtcbiAgICAgICAgfVxuXG4gICAgICB9KTtcbiAgICAgIC8vcmV0dXJuIGZhbHNlO1xuICAgIH0sIC8vIGNvbmZpcm1NZXNzYWdlU3VibWl0XG5cbiAgfTsgLy8gcGx1Z2luLnByb3RvdHlwZVxuXG4gIC8vIEEgcmVhbGx5IGxpZ2h0d2VpZ2h0IHBsdWdpbiB3cmFwcGVyIGFyb3VuZCB0aGUgY29uc3RydWN0b3IsXG4gIC8vIHByZXZlbnRpbmcgYWdhaW5zdCBtdWx0aXBsZSBpbnN0YW50aWF0aW9uc1xuICAkLmZuW3BsdWdpbk5hbWVdID0gZnVuY3Rpb24gKCBvcHRpb25zICkge1xuICAgIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24gKCkge1xuICAgICAgaWYgKCEkLmRhdGEodGhpcywgJ3BsdWdpbl8nICsgcGx1Z2luTmFtZSkpIHtcbiAgICAgICAgJC5kYXRhKHRoaXMsICdwbHVnaW5fJyArIHBsdWdpbk5hbWUsIG5ldyBQbHVnaW4oIHRoaXMsIG9wdGlvbnMgKSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG5cbn0pKCBqUXVlcnksIHdpbmRvdywgZG9jdW1lbnQgKTsiXX0=
}(jQuery));
