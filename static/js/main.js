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
    for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
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
    this.element = element;

    // jQuery has an extend method which merges the contents of two or
    // more objects, storing the result in the first object. The first object
    // is generally empty as we don't want to alter the default options for
    // future instances of the plugin
    this.options = $.extend({}, defaults, options);
    this._defaults = defaults;
    this._name = pluginName;
    this.init();
  } // end constructor

  Plugin.prototype = {
    init: function (reset, amount) {
      document.documentElement.classList.remove('no-js');
      document.documentElement.classList.add('js');

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
        this.debug(this.options);
        // return;
      }

      // call functions
      this.analyticsTracking(this.options); // track analytics events
      this.amountAsRadio(this.element, this.options); // if the amount field is a radio button
      this.amountUpdated(this.element, this.options); // if the amount text field can change

      if ($(this.options.pay_cc_processing_selector).length > 0) {
        this.creditCardProcessingFees(this.options); // processing fees
      }

      // the main form ID. this is not used for cancelling
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

    debug: function (message) {
      if (this.options.debug === true) {
        if (typeof message !== 'object') {
          console.log(message);
        } else {
          console.dir(message);
        }
        console.dir(this);
      }
    },
    // debug

    analyticsTracking: function (options) {
      this.debug('analytics type is ' + options.analytics_type);
      var progress = $(options.progress_selector);
      var step;
      var action = 'begin_checkout';
      var nav_item_count = 0;
      var opp_id = $(options.opp_id_selector).val();
      var post_purchase = false;
      if (options.analytics_type == 'analyticsjs') {
        ga('require', 'ec');
      }
      if (progress.length > 0) {
        nav_item_count = $('li', progress).length; // length is not zero based
        step = $('li .active', progress).parent().index() + 1; // index is zero based
      }
      // there is a progress menu, AND there IS NOT a confirm form selector
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

    analyticsTrackingStep: function (step, action, post_purchase) {
      var progress = $(this.options.progress_selector);
      var amount = $(this.options.original_amount_selector).val();
      var opp_id = $(this.options.opp_id_selector).val();
      var installment_period = 'one-time';
      var level;
      var that = this;
      if ($(this.options.installment_period_selector).length > 0) {
        installment_period = $(this.options.installment_period_selector).val();
      }
      // if we're not after the purchase, use addProduct
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

            // dataLayer
            if ('undefined' !== typeof dataLayer) {
              dataLayer.push({
                ecommerce: null
              }); // first, make sure there aren't multiple things happening.
              dataLayer.push({
                event: action,
                ecommerce: {
                  items: product
                }
              });
            }
          }
        });
      }
    },
    // analyticsTrackingStep

    amountAsRadio: function (element, options) {
      // when amount field is a radio button, we need to check it whenever it changes
      var that = this;
      that.setRadioAmount($(options.original_amount_selector, element), element, options);
      $(options.original_amount_selector, element).change(function () {
        that.setRadioAmount($(this), element, options);
      });
    },
    // amountAsRadio

    setRadioAmount: function (field, element, options) {
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

    amountUpdated: function (element, options) {
      // when new amount text field can change, we need to change the hidden field
      // there is also potentially an additional amount field value to add
      var that = this;
      var stripe_payment_type = that.getStripePaymentType();

      // set the fair market value if applicable
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

    getTotalAmount: function (amount) {
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

    setFairMarketValue: function (amount_selector) {
      // if there is a fair market value field and there is a fair-market-value data attribute
      // check and see if we can populate the field with the data attribute
      if ($(this.options.fair_market_value_selector).length > 0 && typeof amount_selector.data('fair-market-value') !== 'undefined') {
        var fairMarketValue = amount_selector.data('fair-market-value');
        $(this.options.fair_market_value_selector).val(fairMarketValue);
      }
    },
    // setFairMarketValue

    calculateFees: function (amount, stripe_payment_type) {
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

    creditCardProcessingFees: function (options) {
      // this adds or subtracts the fee to the original amount when the user indicates they do or do not want to pay the fees
      var that = this;
      that.creditCardFeeCheckbox($(options.pay_cc_processing_selector));
      $(options.pay_cc_processing_selector).on('change', function () {
        that.creditCardFeeCheckbox(this);
      });
    },
    // creditCardProcessingFees

    getStripePaymentType: function () {
      var stripe_payment_type = 'card';
      if ($('input[name="stripe_payment_type"]').length > 0) {
        stripe_payment_type = $('input[name="stripe_payment_type"]').val();
      }
      return stripe_payment_type;
    },
    // getStripePaymentType

    setStripePaymentType: function (stripe_payment_type) {
      if ($('input[name="stripe_payment_type"]').length === 0) {
        $(this.options.donate_form_selector).append('<input type=\"hidden\" name=\"stripe_payment_type\">');
      }
      $('input[name="stripe_payment_type"]').val(stripe_payment_type);
      return stripe_payment_type;
    },
    // setStripePaymentType

    creditCardFeeCheckbox: function (field) {
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
      $(that.options.full_amount_selector).text(full_amount);

      // update the payment request
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

    donateAnonymously: function (element, options) {
      var that = this;
      that.toggleAnonymous($(options.anonymous_selector, element));
      $(options.anonymous_selector, element).change(function () {
        that.toggleAnonymous($(this));
      });
    },
    // donateAnonymously

    toggleAnonymous: function (element) {
      if (element.is(':checked')) {
        $(this.options.name_selector + ' div:first', this.element).hide();
      } else {
        $(this.options.name_selector + ' div:first', this.element).show();
      }
    },
    // toggleAnonymous

    honorOrMemory: function (element, options) {
      if ($(options.honor_or_memory_chooser + ':checked').val()) {
        $(options.honor_memory_input_group, element).show();
        $(options.honor_type_selector).text($(options.honor_or_memory_chooser + ':checked').val());
      } else {
        $(options.honor_memory_input_group, element).hide();
        $(options.honor_name_selector + ' input', element).val('');
      }
    },
    // honorOrMemory

    honorOrMemoryToggle: function (element, options) {
      var that = this;
      that.honorOrMemory(that.element, that.options);
      $(options.honor_or_memory_chooser, element).change(function () {
        that.honorOrMemory(that.element, that.options);
      });
    },
    // honorOrMemoryToggle

    outsideUnitedStates: function (element, options) {
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

    changeFieldsOutsideUS: function (billing_or_shipping, element, options) {
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

    changeFieldsInsideUS: function (billing_or_shipping, element, options) {
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

    shippingAddress: function (element, options) {
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

    allowMinnpostAccount: function (element, options) {
      var that = this;
      var account_exists = false;

      // show password as text
      that.showPassword();

      // calculate password strength
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
      }

      //setup before functions
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

    spamEmail: function (email_field) {
      var spamErrorContainer = email_field.parent();
      if ($('.a-spam-email', spamErrorContainer).length === 0) {
        spamErrorContainer.append('<p class="a-form-caption a-validation-error a-spam-email">This email address has been detected as a spammer.</p>');
      }
      $('.a-spam-email', spamErrorContainer).hide();
      spamErrorContainer.removeClass('invalid a-error');
    },
    // spamEmail

    toggleAccountFields: function (create_account_selector) {
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

    showPassword: function () {
      // Cache our jquery elements
      var $submit = $('.btn-submit');
      var $container = $(this.options.password_selector, this.element);
      var $field = $('input[name="password"]', $container);
      $('.a-account-exists').hide();
      var show_pass = '<div class="a-form-show-password a-form-caption"><label><input type="checkbox" name="show_password" id="show-password-checkbox" value="1"> Show password</label></div>';
      // Inject the toggle button into the page
      $container.append(show_pass);
      // Cache the toggle button
      var $toggle = $('#show-password-checkbox');
      // Toggle the field type
      $toggle.on('click', function (e) {
        var checkbox = $(this);
        if (checkbox.is(':checked')) {
          $field.attr('type', 'text');
        } else {
          $field.attr('type', 'password');
        }
      });
      // Set the form field back to a regular password element
      $submit.on('click', function (e) {
        $field.attr('type', 'password');
      });
    },
    showPasswordStrength: function () {
      // checkPasswordStrength
      var that = this;
      if ($('.a-password-strength').length > 0) {
        var $before = $('.a-form-show-password');
        $before.after($('<div class="a-password-strength"><meter max="4" id="password-strength"><div></div></meter><p class="a-form-caption" id="password-strength-text"></p></div>'));
        $('body').on('keyup', 'input[name=password]', function () {
          that.checkPasswordStrength($('input[name=password]'),
          // Password field
          $('#password-strength'),
          // Strength meter
          $('#password-strength-text') // Strength text indicator
          );
        });
      }
    },

    // showPasswordStrength

    checkPasswordStrength: function ($password, $strengthMeter, $strengthText) {
      var password = $password.val();
      // Get the password strength
      var result = zxcvbn(password);
      var strength = result.score;
      $strengthText.removeClass('short bad good strong');

      // Add the strength meter results
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

    checkMinnpostAccount: function (element, options, email) {
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

    paymentRequestButton: function (element, options) {
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

            height: '48px'
            // Defaults to '40px'. The width is always '100%'.
          }
        }
      });

      // Check the availability of the Payment Request API first.
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
        var supportform = $(that.options.donate_form_selector);

        // check validation of form
        if (!supportform.get(0).reportValidity()) {
          event.preventDefault();
          return;
        }
      });
      that.paymentRequest.on('paymentmethod', function (event) {
        // Send paymentMethod.id to server
        var supportform = $(that.options.donate_form_selector);
        var tokenFieldName = 'payment_method_id';
        var tokenField = 'input[name="' + tokenFieldName + '"]';

        // Insert the payment method ID into the form so it gets submitted to the server
        if ($(tokenField).length > 0) {
          $(tokenField).val(event.paymentMethod.id);
        } else {
          supportform.append($('<input type=\"hidden\" name="' + tokenFieldName + '">').val(event.paymentMethod.id));
        }
        that.formProcessor(that, 'paymentRequest');
      });
    },
    // paymentRequestButton

    hidePaymentRequest: function (hideElement) {
      hideElement.hide();
      $('.decline-apple-pay a').hide();
      $('.m-pay-without-payment-request').show();
      $('.a-g-recaptcha').insertAfter('.m-pay-without-payment-request .m-form-actions-pay-fees');
    },
    // hidePaymentRequest

    choosePaymentMethod: function (element, options) {
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

    setupPaymentMethod: function (element_id, element_value) {
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

    removeAchFields: function (options) {
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

    creditCardFields: function (element, options) {
      var that = this;
      var style = {
        base: {
          iconColor: '#666EE8',
          lineHeight: '43px',
          fontWeight: 400,
          fontFamily: 'ff-meta-web-pro',
          fontSize: '24px'
          //lineHeight: '37px',
          //fontSize: '16px',
        },

        invalid: {
          color: '#1a1818'
        }
      };

      // Add an instance of the card UI component into the `card-element` <div>
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
      that.cardCvcElement.mount(options.cc_cvc_selector);

      // validate/error handle the card fields
      that.cardNumberElement.on('change', function (event) {
        var stripe_payment_type = 'card';
        // Switch payment type if it's one that we recognize as distinct
        if (event.brand) {
          if (event.brand === 'amex') {
            stripe_payment_type = 'amex';
          }
        }
        // error handling
        that.stripeErrorDisplay(event.error, $(options.cc_num_selector, element), element, options);
        // if it changed, reset the button
        that.buttonStatus(options, $(that.options.donate_form_selector).find('button'), false);
        that.calculateFees(that.options.original_amount, stripe_payment_type);
      });
      that.cardExpiryElement.on('change', function (event) {
        // error handling
        that.stripeErrorDisplay(event.error, $(options.cc_exp_selector, element), element, options);
        // if it changed, reset the button
        that.buttonStatus(options, $(that.options.donate_form_selector).find('button'), false);
      });
      that.cardCvcElement.on('change', function (event) {
        // error handling
        that.stripeErrorDisplay(event.error, $(options.cc_cvc_selector, element), element, options);
        // if it changed, reset the button
        that.buttonStatus(options, $(that.options.donate_form_selector).find('button'), false);
      });

      // this is the method to create a single card field and mount it
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

    showSpinner: function () {
      $(this.options.plaid_link).hide();
      $(this.options.plaid_link).after('<div class="a-spinner"><img src="https://www.minnpost.com/wp-admin/images/spinner.gif" srcset="https://www.minnpost.com/wp-admin/images/spinner.gif 1x, https://www.minnpost.com/wp-admin/images/spinner-2x.gif 2x,"></div>');
    },
    hideSpinner: function () {
      $(this.options.plaid_link).show();
      $('.a-spinner').hide();
    },
    achFields: function (element, options) {
      var bankTokenFieldName = 'bankToken';
      var bankTokenField = 'input[name="' + bankTokenFieldName + '"]';
      var that = this;
      // the button should not be clickable until the user has signed in
      that.buttonDisabled(options, true, '', 'Sign in to your bank account (above) first');
      if (typeof Plaid !== 'undefined') {
        that.linkHandler = Plaid.create({
          clientName: 'MinnPost',
          env: options.plaid_env,
          product: ['auth'],
          // 1. Pass the token generated in step 2.
          token: document.getElementById('plaid_link_token').value,
          onSuccess: function (public_token, metadata) {
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
          that.resetFormErrors(that.options, that.element);
          //$(options.payment_method_selector + ' .a-error').remove(); // remove method error message if it is there
          that.linkHandler.open();
        });
      }
    },
    // achFields

    buttonStatus: function (options, button, disabled) {
      // make the button clickable or not
      this.buttonDisabled(options, disabled, button);
      if (disabled === false) {
        button.text(options.button_text);
      } else {
        button.text('Processing');
      }
    },
    // buttonStatus

    buttonDisabled: function (options, disabled) {
      let button = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
      let message = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : '';
      let ach_was_initialized = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
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

    validateSetup: function (element, options) {
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

    scrollToFormError: function (options) {
      var form = $(options.form_selector);
      // listen for `invalid` events on all form inputs
      form.find(':input').on('invalid', function () {
        var input = $(this);
        // the first invalid element in the form
        var first = form.find('.a-error').first();
        // the form item that contains it
        var first_holder = first.parent();
        // only handle if this is the first invalid input
        if (input[0] === first[0]) {
          // height of the nav bar plus some padding if there's a fixed nav
          //var navbarHeight = navbar.height() + 50

          // the position to scroll to (accounting for the navbar if it exists)
          var elementOffset = first_holder.offset().top;

          // the current scroll position (accounting for the navbar)
          var pageOffset = window.pageYOffset;

          // don't scroll if the element is already in view
          if (elementOffset > pageOffset && elementOffset < pageOffset + window.innerHeight) {
            return true;
          }

          // note: avoid using animate, as it prevents the validation message displaying correctly
          $('html, body').scrollTop(elementOffset);
        }
      });
    },
    // scrollToFormError

    formSetup: function (element, options) {
      var that = this;
      $(options.donate_form_selector).submit(function (event) {
        event.preventDefault();
        that.formProcessor(that, 'submit');
      });
    },
    // formSetup

    formProcessor: function (that, type) {
      // 1. remove previous errors and reset the button
      that.resetFormErrors(that.options, that.element);

      // 2. set up the button if it's a form submit
      if (type === 'submit') {
        that.buttonStatus(that.options, $(that.options.donate_form_selector).find('button'), true);
      }

      // 3. generate billing address details
      var billingDetails = that.generateBillingDetails();

      // 4. create minnpost user account
      that.createMinnPostAccount(that.options, that.element);

      // 5. do the charging of card or bank account if it's a form submit
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

    stripeErrorDisplay: function (error, this_selector, element, options) {
      // listen for errors and display/hide error messages
      var which_error = this_selector.attr('id');
      // when this field changes, reset its errors
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

    resetFormErrors: function (options, element) {
      var that = this;
      $('.a-validation-error').remove();
      $('input, label, div', element).removeClass('a-error');
      $('label', element).removeClass('m-has-validation-error');
      $(options.payment_method_selector, element).removeClass('a-error invalid');
      $('.a-validation-error').remove();
      $(options.choose_payment + ' input').change(function () {
        $(options.payment_method_selector + ' .a-error').remove(); // remove method error message if it is there
        $(options.payment_method_selector).parent().find('.a-validation-error').remove();
        // if a payment field changed, reset the button
        that.buttonStatus(options, $(options.donate_form_selector).find('button'), false);
      });
    },
    // resetFormErrors

    createMinnPostAccount: function (options, element) {
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
          if (data.status === 'success' && data.reason === 'new user') {
            // user created - they should receive email
          }
        });
      }
    },
    // createMinnPostAccount

    generateBillingDetails: function () {
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

    createPaymentMethod: function (cardElement, billingDetails) {
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
          var tokenField = 'input[name="' + tokenFieldName + '"]';

          // Insert the payment method ID into the form so it gets submitted to the server
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

    bankTokenHandler: function (token, type) {
      this.setStripePaymentType(type);
      this.submitFormOnly();
    },
    // bankTokenHandler

    submitFormOnly: function () {
      var that = this;
      var supportform = $(this.options.donate_form_selector);
      var ajax_url = window.location.pathname;

      // Submit the form
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

    handleServerResponse: function (response) {
      var supportform = $(this.options.donate_form_selector);
      if (response.errors) {
        // Show error from server on payment form
        this.handleServerError(response);
      } else if (response.requires_action) {
        // Use Stripe.js to handle required card action
        //handleAction(response);
      } else {
        supportform.get(0).submit(); // continue submitting the form if the ajax was successful
      }
    },

    // handleServerResponse

    handleServerError: function (response) {
      var that = this;
      var this_field = '';
      // do not submit. there is an error.
      that.buttonStatus(that.options, $(that.options.donate_form_selector).find('button'), false);
      // handle error display
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

    displayErrorMessage(error, field) {
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

    showNewsletterSettings: function (element, options) {
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

    confirmMessageSubmit: function (element, options) {
      var existing_newsletter_settings = $(options.newsletter_group_selector + ' input').serialize();
      //this.debug(existing_newsletter_settings);

      $(options.confirm_form_selector).submit(function (event) {
        event.preventDefault();
        var confirmform = $(options.confirm_form_selector);
        // submit settings to mailchimp
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
            confirmform.get(0).submit();
            //$('.m-hold-message').html('<div class="m-form-message m-form-message-info">' + message + '</div>');
          }).fail(function (response) {
            // we should put an actual error message here someday, probably
            //$('.m-hold-message').html('<div class="m-form-message m-form-message-info">An error has occured. Please try again.</div>');
            confirmform.get(0).submit();
          });
        } else {
          // end part where settings changed
          confirmform.get(0).submit();
        }
      });
      //return false;
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZhbGlkLWZvcm0ubWluLmpzIiwibWlubnBvc3QuZ2l2aW5nLmpzIl0sIm5hbWVzIjpbInIiLCJlIiwibiIsInQiLCJvIiwiaSIsImYiLCJjIiwicmVxdWlyZSIsInUiLCJhIiwiRXJyb3IiLCJjb2RlIiwicCIsImV4cG9ydHMiLCJjYWxsIiwibGVuZ3RoIiwibW9kdWxlIiwiX3ZhbGlkRm9ybSIsIl92YWxpZEZvcm0yIiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsIm9iaiIsIl9fZXNNb2R1bGUiLCJkZWZhdWx0Iiwid2luZG93IiwiVmFsaWRGb3JtIiwidG9nZ2xlSW52YWxpZENsYXNzIiwiaGFuZGxlQ3VzdG9tTWVzc2FnZXMiLCJoYW5kbGVDdXN0b21NZXNzYWdlRGlzcGxheSIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwidmFsdWUiLCJjbG9uZSIsImRlZmF1bHRzIiwiaW5zZXJ0QWZ0ZXIiLCJpbnNlcnRCZWZvcmUiLCJmb3JFYWNoIiwiZGVib3VuY2UiLCJjb3B5IiwiYXR0ciIsImhhc093blByb3BlcnR5IiwiZGVmYXVsdE9iamVjdCIsImsiLCJ1bmRlZmluZWQiLCJyZWZOb2RlIiwibm9kZVRvSW5zZXJ0Iiwic2libGluZyIsIm5leHRTaWJsaW5nIiwiX3BhcmVudCIsInBhcmVudE5vZGUiLCJwYXJlbnQiLCJhcHBlbmRDaGlsZCIsIml0ZW1zIiwiZm4iLCJtcyIsInRpbWVvdXQiLCJkZWJvdW5jZWRGbiIsImNsZWFyVGltZW91dCIsInNldFRpbWVvdXQiLCJ2YWxpZEZvcm0iLCJfdXRpbCIsImlucHV0IiwiaW52YWxpZENsYXNzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNsYXNzTGlzdCIsImFkZCIsInZhbGlkaXR5IiwidmFsaWQiLCJyZW1vdmUiLCJlcnJvclByb3BzIiwiZ2V0Q3VzdG9tTWVzc2FnZSIsImN1c3RvbU1lc3NhZ2VzIiwibG9jYWxFcnJvclByb3BzIiwidHlwZSIsImNvbmNhdCIsInByb3AiLCJnZXRBdHRyaWJ1dGUiLCJjaGVja1ZhbGlkaXR5IiwibWVzc2FnZSIsInNldEN1c3RvbVZhbGlkaXR5Iiwib3B0aW9ucyIsInZhbGlkYXRpb25FcnJvckNsYXNzIiwidmFsaWRhdGlvbkVycm9yUGFyZW50Q2xhc3MiLCJlcnJvclBsYWNlbWVudCIsImluc2VydEVycm9yIiwiZXJyb3JOb2RlIiwicXVlcnlTZWxlY3RvciIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInZhbGlkYXRpb25NZXNzYWdlIiwiY2xhc3NOYW1lIiwidGV4dENvbnRlbnQiLCJwcmV2ZW50RGVmYXVsdCIsImRlZmF1bHRPcHRpb25zIiwiZWxlbWVudCIsIm5vZGVOYW1lIiwiaW5wdXRzIiwidG9Mb3dlckNhc2UiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9jdXNJbnZhbGlkSW5wdXQiLCJ2YWxpZEZvcm1JbnB1dHMiLCJmb3JtIiwiZm9jdXNGaXJzdCIsImludmFsaWROb2RlIiwiZm9jdXMiLCIkIiwicGx1Z2luTmFtZSIsIlBsdWdpbiIsImV4dGVuZCIsIl9kZWZhdWx0cyIsIl9uYW1lIiwiaW5pdCIsInByb3RvdHlwZSIsInJlc2V0IiwiYW1vdW50IiwiZG9jdW1lbnRFbGVtZW50IiwicGFyc2VGbG9hdCIsImxldmVsX2Ftb3VudF9zZWxlY3RvciIsInRleHQiLCJvcmlnaW5hbF9hbW91bnQiLCJwYXJzZUludCIsIm9yaWdpbmFsX2Ftb3VudF9zZWxlY3RvciIsInZhbCIsInByb2Nlc3NpbmdfZmVlIiwiTWF0aCIsInJvdW5kIiwiZmVlX2Ftb3VudCIsInBvdyIsInRvRml4ZWQiLCJwcm9jZXNzaW5nX2ZlZV90ZXh0IiwiY3JlYXRlX2FjY291bnQiLCJidXR0b25fdGV4dCIsInBheV9idXR0b25fc2VsZWN0b3IiLCJzdHJpcGUiLCJTdHJpcGUiLCJzdHJpcGVfcHVibGlzaGFibGVfa2V5IiwiZWxlbWVudHMiLCJmb250cyIsImNzc1NyYyIsImRlYnVnIiwiYW5hbHl0aWNzVHJhY2tpbmciLCJhbW91bnRBc1JhZGlvIiwiYW1vdW50VXBkYXRlZCIsInBheV9jY19wcm9jZXNzaW5nX3NlbGVjdG9yIiwiY3JlZGl0Q2FyZFByb2Nlc3NpbmdGZWVzIiwiZG9uYXRlX2Zvcm1fc2VsZWN0b3IiLCJkb25hdGVBbm9ueW1vdXNseSIsImhvbm9yT3JNZW1vcnlUb2dnbGUiLCJvdXRzaWRlVW5pdGVkU3RhdGVzIiwic2hpcHBpbmdBZGRyZXNzIiwiYWxsb3dNaW5ucG9zdEFjY291bnQiLCJwYXltZW50UmVxdWVzdEJ1dHRvbiIsImNob29zZVBheW1lbnRNZXRob2QiLCJjcmVkaXRDYXJkRmllbGRzIiwidmFsaWRhdGVTZXR1cCIsImZvcm1TZXR1cCIsImNvbmZpcm1fZm9ybV9zZWxlY3RvciIsInNob3dOZXdzbGV0dGVyU2V0dGluZ3MiLCJjb25maXJtTWVzc2FnZVN1Ym1pdCIsImNvbnNvbGUiLCJsb2ciLCJkaXIiLCJhbmFseXRpY3NfdHlwZSIsInByb2dyZXNzIiwicHJvZ3Jlc3Nfc2VsZWN0b3IiLCJzdGVwIiwiYWN0aW9uIiwibmF2X2l0ZW1fY291bnQiLCJvcHBfaWQiLCJvcHBfaWRfc2VsZWN0b3IiLCJwb3N0X3B1cmNoYXNlIiwiZ2EiLCJpbmRleCIsImZpbmlzaF9zZWN0aW9uX3NlbGVjdG9yIiwiYW5hbHl0aWNzVHJhY2tpbmdTdGVwIiwiaW5zdGFsbG1lbnRfcGVyaW9kIiwibGV2ZWwiLCJ0aGF0IiwiaW5zdGFsbG1lbnRfcGVyaW9kX3NlbGVjdG9yIiwiZGF0YSIsImFqYXgiLCJtZXRob2QiLCJ1cmwiLCJkb25lIiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzbGljZSIsInByb2R1Y3QiLCJnZXRUb3RhbEFtb3VudCIsImd0YWciLCJwYWdlX3RpdGxlIiwidGl0bGUiLCJwYWdlX3BhdGgiLCJsb2NhdGlvbiIsInBhdGhuYW1lIiwicGFnZSIsImRhdGFMYXllciIsInB1c2giLCJlY29tbWVyY2UiLCJldmVudCIsInNldFJhZGlvQW1vdW50IiwiY2hhbmdlIiwiZmllbGQiLCJzdHJpcGVfcGF5bWVudF90eXBlIiwiZ2V0U3RyaXBlUGF5bWVudFR5cGUiLCJpcyIsImNhbGN1bGF0ZUZlZXMiLCJzZXRGYWlyTWFya2V0VmFsdWUiLCJhbW91bnRfc2VsZWN0b3JfZmFpcl9tYXJrZXQiLCJhZGRpdGlvbmFsX2Ftb3VudF9maWVsZCIsImdpZnRfZGVsaXZlcnlfbWV0aG9kX3NlbGVjdG9yIiwidG90YWxfYW1vdW50IiwiYWRkaXRpb25hbF9hbW91bnQiLCJzaGlwcGluZ19hbW91bnRfZmllbGQiLCJzaGlwcGluZ19hbW91bnQiLCJhbW91bnRfc2VsZWN0b3IiLCJmYWlyX21hcmtldF92YWx1ZV9zZWxlY3RvciIsImZhaXJNYXJrZXRWYWx1ZSIsInNldFN0cmlwZVBheW1lbnRUeXBlIiwiZmVlcyIsImNyZWRpdENhcmRGZWVDaGVja2JveCIsIm9uIiwiYXBwZW5kIiwiZnVsbF9hbW91bnQiLCJhZGRDbGFzcyIsImZ1bGxfYW1vdW50X3NlbGVjdG9yIiwicGF5bWVudFJlcXVlc3QiLCJ1cGRhdGUiLCJ0b3RhbCIsImxhYmVsIiwidG9nZ2xlQW5vbnltb3VzIiwiYW5vbnltb3VzX3NlbGVjdG9yIiwibmFtZV9zZWxlY3RvciIsImhpZGUiLCJzaG93IiwiaG9ub3JPck1lbW9yeSIsImhvbm9yX29yX21lbW9yeV9jaG9vc2VyIiwiaG9ub3JfbWVtb3J5X2lucHV0X2dyb3VwIiwiaG9ub3JfdHlwZV9zZWxlY3RvciIsImhvbm9yX25hbWVfc2VsZWN0b3IiLCJzaG93X2JpbGxpbmdfY291bnRyeV9zZWxlY3RvciIsImNsaWNrIiwiY2hhbmdlRmllbGRzT3V0c2lkZVVTIiwic2hvd19zaGlwcGluZ19jb3VudHJ5X3NlbGVjdG9yIiwic2hpcHBpbmdfY291bnRyeV9zZWxlY3RvciIsImJpbGxpbmdfb3Jfc2hpcHBpbmciLCJ6aXBfcGFyZW50IiwiYmlsbGluZ196aXBfZmllbGRfc2VsZWN0b3IiLCJzdGF0ZV9wYXJlbnQiLCJiaWxsaW5nX3N0YXRlX2ZpZWxkX3NlbGVjdG9yIiwiYmlsbGluZ19jb3VudHJ5X3NlbGVjdG9yIiwic2hpcHBpbmdfemlwX2ZpZWxkX3NlbGVjdG9yIiwic2hpcHBpbmdfc3RhdGVfZmllbGRfc2VsZWN0b3IiLCJjaGFuZ2VGaWVsZHNJbnNpZGVVUyIsImh0bWwiLCJzaG93X3NoaXBwaW5nIiwidXNlX2Zvcl9zaGlwcGluZ19zZWxlY3RvciIsInNoaXBwaW5nX3NlbGVjdG9yIiwiYWNjb3VudF9leGlzdHMiLCJzaG93UGFzc3dvcmQiLCJzaG93UGFzc3dvcmRTdHJlbmd0aCIsInNwYW1FbWFpbCIsImVtYWlsX2ZpZWxkX3NlbGVjdG9yIiwidG9nZ2xlQWNjb3VudEZpZWxkcyIsImNyZWF0ZV9tcF9zZWxlY3RvciIsImRvbmVUeXBpbmciLCJlbWFpbCIsImNoZWNrTWlubnBvc3RBY2NvdW50IiwidHlwaW5nVGltZXIiLCJkb25lVHlwaW5nSW50ZXJ2YWwiLCJrZXl1cCIsImVtYWlsX2ZpZWxkIiwic3BhbUVycm9yQ29udGFpbmVyIiwicmVtb3ZlQ2xhc3MiLCJjcmVhdGVfYWNjb3VudF9zZWxlY3RvciIsImJlZm9yZSIsInBhc3N3b3JkX3NlbGVjdG9yIiwiJHN1Ym1pdCIsIiRjb250YWluZXIiLCIkZmllbGQiLCJzaG93X3Bhc3MiLCIkdG9nZ2xlIiwiY2hlY2tib3giLCIkYmVmb3JlIiwiYWZ0ZXIiLCJjaGVja1Bhc3N3b3JkU3RyZW5ndGgiLCIkcGFzc3dvcmQiLCIkc3RyZW5ndGhNZXRlciIsIiRzdHJlbmd0aFRleHQiLCJwYXNzd29yZCIsInJlc3VsdCIsInp4Y3ZibiIsInN0cmVuZ3RoIiwic2NvcmUiLCJ1c2VyIiwibWlubnBvc3Rfcm9vdCIsInN0YXR1cyIsInJlYXNvbiIsImNvdW50cnkiLCJjdXJyZW5jeSIsInByQnV0dG9uIiwiY3JlYXRlIiwic3R5bGUiLCJ0aGVtZSIsImhlaWdodCIsImNhbk1ha2VQYXltZW50IiwidGhlbiIsIm1vdW50IiwiaGlkZVBheW1lbnRSZXF1ZXN0Iiwic3VwcG9ydGZvcm0iLCJnZXQiLCJyZXBvcnRWYWxpZGl0eSIsInRva2VuRmllbGROYW1lIiwidG9rZW5GaWVsZCIsInBheW1lbnRNZXRob2QiLCJpZCIsImZvcm1Qcm9jZXNzb3IiLCJoaWRlRWxlbWVudCIsImNob29zZV9wYXltZW50IiwiY2hlY2tlZF9pZCIsImNoZWNrZWRfdmFsdWUiLCJzZXR1cFBheW1lbnRNZXRob2QiLCJlbGVtZW50X2lkIiwiZWxlbWVudF92YWx1ZSIsImFjaEZpZWxkcyIsInJlbW92ZUFjaEZpZWxkcyIsInBheW1lbnRfbWV0aG9kX3NlbGVjdG9yIiwicGxhaWRfbGluayIsImJ1dHRvbkRpc2FibGVkIiwibGlua0hhbmRsZXIiLCJkZXN0cm95IiwiYmFzZSIsImljb25Db2xvciIsImxpbmVIZWlnaHQiLCJmb250V2VpZ2h0IiwiZm9udEZhbWlseSIsImZvbnRTaXplIiwiaW52YWxpZCIsImNvbG9yIiwiY2FyZE51bWJlckVsZW1lbnQiLCJzaG93SWNvbiIsImNjX251bV9zZWxlY3RvciIsImNhcmRFeHBpcnlFbGVtZW50IiwiY2NfZXhwX3NlbGVjdG9yIiwiY2FyZEN2Y0VsZW1lbnQiLCJjY19jdmNfc2VsZWN0b3IiLCJicmFuZCIsInN0cmlwZUVycm9yRGlzcGxheSIsImVycm9yIiwiYnV0dG9uU3RhdHVzIiwiZmluZCIsInNob3dTcGlubmVyIiwiaGlkZVNwaW5uZXIiLCJiYW5rVG9rZW5GaWVsZE5hbWUiLCJiYW5rVG9rZW5GaWVsZCIsIlBsYWlkIiwiY2xpZW50TmFtZSIsImVudiIsInBsYWlkX2VudiIsInRva2VuIiwiZ2V0RWxlbWVudEJ5SWQiLCJvblN1Y2Nlc3MiLCJwdWJsaWNfdG9rZW4iLCJtZXRhZGF0YSIsIkpTT04iLCJzdHJpbmdpZnkiLCJhY2NvdW50X2lkIiwiY29udGVudFR5cGUiLCJyZXNwb25zZSIsInN0cmlwZV9iYW5rX2FjY291bnRfdG9rZW4iLCJwcmVwZW5kIiwiZmFpbCIsInJlc2V0Rm9ybUVycm9ycyIsIm9wZW4iLCJidXR0b24iLCJkaXNhYmxlZCIsImFjaF93YXNfaW5pdGlhbGl6ZWQiLCJ0bGl0ZSIsInJlbW92ZUF0dHIiLCJncmF2IiwiZm9ybXMiLCJmb3JtX3NlbGVjdG9yIiwic2Nyb2xsVG9Gb3JtRXJyb3IiLCJmaXJzdCIsImZpcnN0X2hvbGRlciIsImVsZW1lbnRPZmZzZXQiLCJvZmZzZXQiLCJ0b3AiLCJwYWdlT2Zmc2V0IiwicGFnZVlPZmZzZXQiLCJpbm5lckhlaWdodCIsInNjcm9sbFRvcCIsInN1Ym1pdCIsImJpbGxpbmdEZXRhaWxzIiwiZ2VuZXJhdGVCaWxsaW5nRGV0YWlscyIsImNyZWF0ZU1pbm5Qb3N0QWNjb3VudCIsInBheW1lbnRfdHlwZSIsImNyZWF0ZVBheW1lbnRNZXRob2QiLCJiYW5rVG9rZW5IYW5kbGVyIiwic3VibWl0Rm9ybU9ubHkiLCJ0aGlzX3NlbGVjdG9yIiwid2hpY2hfZXJyb3IiLCJlbXB0eSIsImFuaW1hdGUiLCJmaXJzdF9uYW1lIiwiZmlyc3RfbmFtZV9maWVsZF9zZWxlY3RvciIsImxhc3RfbmFtZSIsImxhc3RfbmFtZV9maWVsZF9zZWxlY3RvciIsInBhc3N3b3JkX2ZpZWxkX3NlbGVjdG9yIiwiY2l0eSIsImJpbGxpbmdfY2l0eV9maWVsZF9zZWxlY3RvciIsInN0YXRlIiwiemlwIiwiYWRkcmVzc0RldGFpbHMiLCJmdWxsX25hbWUiLCJuYW1lIiwic3RyZWV0IiwiYmlsbGluZ19zdHJlZXRfZmllbGRfc2VsZWN0b3IiLCJsaW5lMSIsInBvc3RhbF9jb2RlIiwiY291bnRyeV9maWVsZF92YWx1ZSIsImJpbGxpbmdfY291bnRyeV9maWVsZF9zZWxlY3RvciIsImFkZHJlc3MiLCJjYXJkRWxlbWVudCIsImNhcmQiLCJiaWxsaW5nX2RldGFpbHMiLCJoYW5kbGVTZXJ2ZXJFcnJvciIsImFqYXhfdXJsIiwiZmV0Y2giLCJoZWFkZXJzIiwiYm9keSIsInNlcmlhbGl6ZSIsImpzb24iLCJoYW5kbGVTZXJ2ZXJSZXNwb25zZSIsImNhY2hlIiwiZXJyb3JzIiwicmVxdWlyZXNfYWN0aW9uIiwidGhpc19maWVsZCIsImVhY2giLCJwYXJhbSIsImRpc3BsYXlFcnJvck1lc3NhZ2UiLCJzdHJpcGVFcnJvclNlbGVjdG9yIiwiZmllbGRQYXJlbnQiLCJwcmV2IiwibmV3c2xldHRlcl9ncm91cF9odG1sIiwibmV3c2xldHRlcl9ncm91cF9zZWxlY3RvciIsImdldF9kYXRhIiwic2hvcnRjb2RlIiwicGxhY2VtZW50IiwiZ3JvdXBfZmllbGRzIiwiY2F0ZWdvcnkiLCJjb250YWlucyIsIml0ZW0iLCJtYWlsY2hpbXBfc3RhdHVzIiwibWFpbGNoaW1wX3VzZXJfaWQiLCJncm91cHMiLCJleGlzdGluZ19uZXdzbGV0dGVyX3NldHRpbmdzIiwiY29uZmlybWZvcm0iLCJuZXdzbGV0dGVyX2dyb3VwcyIsIm5ld19uZXdzbGV0dGVyX3NldHRpbmdzIiwicG9zdF9kYXRhIiwiZ3JvdXBzX3N1Ym1pdHRlZCIsImdyb3Vwc19hdmFpbGFibGUiLCJncm91cCIsImRhdGFUeXBlIiwic3VjY2VzcyIsImpRdWVyeSJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxDQUFDLFlBQVU7RUFBQyxTQUFTQSxDQUFDLENBQUNDLENBQUMsRUFBQ0MsQ0FBQyxFQUFDQyxDQUFDLEVBQUM7SUFBQyxTQUFTQyxDQUFDLENBQUNDLENBQUMsRUFBQ0MsQ0FBQyxFQUFDO01BQUMsSUFBRyxDQUFDSixDQUFDLENBQUNHLENBQUMsQ0FBQyxFQUFDO1FBQUMsSUFBRyxDQUFDSixDQUFDLENBQUNJLENBQUMsQ0FBQyxFQUFDO1VBQUMsSUFBSUUsQ0FBQyxHQUFDLFVBQVUsSUFBRSxPQUFPQyxPQUFPLElBQUVBLE9BQU87VUFBQyxJQUFHLENBQUNGLENBQUMsSUFBRUMsQ0FBQyxFQUFDLE9BQU9BLENBQUMsQ0FBQ0YsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO1VBQUMsSUFBR0ksQ0FBQyxFQUFDLE9BQU9BLENBQUMsQ0FBQ0osQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO1VBQUMsSUFBSUssQ0FBQyxHQUFDLElBQUlDLEtBQUssQ0FBQyxzQkFBc0IsR0FBQ04sQ0FBQyxHQUFDLEdBQUcsQ0FBQztVQUFDLE1BQU1LLENBQUMsQ0FBQ0UsSUFBSSxHQUFDLGtCQUFrQixFQUFDRixDQUFDO1FBQUE7UUFBQyxJQUFJRyxDQUFDLEdBQUNYLENBQUMsQ0FBQ0csQ0FBQyxDQUFDLEdBQUM7VUFBQ1MsT0FBTyxFQUFDLENBQUM7UUFBQyxDQUFDO1FBQUNiLENBQUMsQ0FBQ0ksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUNVLElBQUksQ0FBQ0YsQ0FBQyxDQUFDQyxPQUFPLEVBQUMsVUFBU2QsQ0FBQyxFQUFDO1VBQUMsSUFBSUUsQ0FBQyxHQUFDRCxDQUFDLENBQUNJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDTCxDQUFDLENBQUM7VUFBQyxPQUFPSSxDQUFDLENBQUNGLENBQUMsSUFBRUYsQ0FBQyxDQUFDO1FBQUEsQ0FBQyxFQUFDYSxDQUFDLEVBQUNBLENBQUMsQ0FBQ0MsT0FBTyxFQUFDZCxDQUFDLEVBQUNDLENBQUMsRUFBQ0MsQ0FBQyxFQUFDQyxDQUFDLENBQUM7TUFBQTtNQUFDLE9BQU9ELENBQUMsQ0FBQ0csQ0FBQyxDQUFDLENBQUNTLE9BQU87SUFBQTtJQUFDLEtBQUksSUFBSUwsQ0FBQyxHQUFDLFVBQVUsSUFBRSxPQUFPRCxPQUFPLElBQUVBLE9BQU8sRUFBQ0gsQ0FBQyxHQUFDLENBQUMsRUFBQ0EsQ0FBQyxHQUFDRixDQUFDLENBQUNhLE1BQU0sRUFBQ1gsQ0FBQyxFQUFFLEVBQUNELENBQUMsQ0FBQ0QsQ0FBQyxDQUFDRSxDQUFDLENBQUMsQ0FBQztJQUFDLE9BQU9ELENBQUM7RUFBQTtFQUFDLE9BQU9KLENBQUM7QUFBQSxDQUFDLEdBQUcsQ0FBQztFQUFDLENBQUMsRUFBQyxDQUFDLFVBQVNRLE9BQU8sRUFBQ1MsTUFBTSxFQUFDSCxPQUFPLEVBQUM7SUFBQyxZQUFZOztJQUFDLElBQUlJLFVBQVUsR0FBQ1YsT0FBTyxDQUFDLGtCQUFrQixDQUFDO0lBQUMsSUFBSVcsV0FBVyxHQUFDQyxzQkFBc0IsQ0FBQ0YsVUFBVSxDQUFDO0lBQUMsU0FBU0Usc0JBQXNCLENBQUNDLEdBQUcsRUFBQztNQUFDLE9BQU9BLEdBQUcsSUFBRUEsR0FBRyxDQUFDQyxVQUFVLEdBQUNELEdBQUcsR0FBQztRQUFDRSxPQUFPLEVBQUNGO01BQUcsQ0FBQztJQUFBO0lBQUNHLE1BQU0sQ0FBQ0MsU0FBUyxHQUFDTixXQUFXLENBQUNJLE9BQU87SUFBQ0MsTUFBTSxDQUFDQyxTQUFTLENBQUNDLGtCQUFrQixHQUFDUixVQUFVLENBQUNRLGtCQUFrQjtJQUFDRixNQUFNLENBQUNDLFNBQVMsQ0FBQ0Usb0JBQW9CLEdBQUNULFVBQVUsQ0FBQ1Msb0JBQW9CO0lBQUNILE1BQU0sQ0FBQ0MsU0FBUyxDQUFDRywwQkFBMEIsR0FBQ1YsVUFBVSxDQUFDVSwwQkFBMEI7RUFBQSxDQUFDLEVBQUM7SUFBQyxrQkFBa0IsRUFBQztFQUFDLENBQUMsQ0FBQztFQUFDLENBQUMsRUFBQyxDQUFDLFVBQVNwQixPQUFPLEVBQUNTLE1BQU0sRUFBQ0gsT0FBTyxFQUFDO0lBQUMsWUFBWTs7SUFBQ2UsTUFBTSxDQUFDQyxjQUFjLENBQUNoQixPQUFPLEVBQUMsWUFBWSxFQUFDO01BQUNpQixLQUFLLEVBQUM7SUFBSSxDQUFDLENBQUM7SUFBQ2pCLE9BQU8sQ0FBQ2tCLEtBQUssR0FBQ0EsS0FBSztJQUFDbEIsT0FBTyxDQUFDbUIsUUFBUSxHQUFDQSxRQUFRO0lBQUNuQixPQUFPLENBQUNvQixXQUFXLEdBQUNBLFdBQVc7SUFBQ3BCLE9BQU8sQ0FBQ3FCLFlBQVksR0FBQ0EsWUFBWTtJQUFDckIsT0FBTyxDQUFDc0IsT0FBTyxHQUFDQSxPQUFPO0lBQUN0QixPQUFPLENBQUN1QixRQUFRLEdBQUNBLFFBQVE7SUFBQyxTQUFTTCxLQUFLLENBQUNYLEdBQUcsRUFBQztNQUFDLElBQUlpQixJQUFJLEdBQUMsQ0FBQyxDQUFDO01BQUMsS0FBSSxJQUFJQyxJQUFJLElBQUlsQixHQUFHLEVBQUM7UUFBQyxJQUFHQSxHQUFHLENBQUNtQixjQUFjLENBQUNELElBQUksQ0FBQyxFQUFDRCxJQUFJLENBQUNDLElBQUksQ0FBQyxHQUFDbEIsR0FBRyxDQUFDa0IsSUFBSSxDQUFDO01BQUE7TUFBQyxPQUFPRCxJQUFJO0lBQUE7SUFBQyxTQUFTTCxRQUFRLENBQUNaLEdBQUcsRUFBQ29CLGFBQWEsRUFBQztNQUFDcEIsR0FBRyxHQUFDVyxLQUFLLENBQUNYLEdBQUcsSUFBRSxDQUFDLENBQUMsQ0FBQztNQUFDLEtBQUksSUFBSXFCLENBQUMsSUFBSUQsYUFBYSxFQUFDO1FBQUMsSUFBR3BCLEdBQUcsQ0FBQ3FCLENBQUMsQ0FBQyxLQUFHQyxTQUFTLEVBQUN0QixHQUFHLENBQUNxQixDQUFDLENBQUMsR0FBQ0QsYUFBYSxDQUFDQyxDQUFDLENBQUM7TUFBQTtNQUFDLE9BQU9yQixHQUFHO0lBQUE7SUFBQyxTQUFTYSxXQUFXLENBQUNVLE9BQU8sRUFBQ0MsWUFBWSxFQUFDO01BQUMsSUFBSUMsT0FBTyxHQUFDRixPQUFPLENBQUNHLFdBQVc7TUFBQyxJQUFHRCxPQUFPLEVBQUM7UUFBQyxJQUFJRSxPQUFPLEdBQUNKLE9BQU8sQ0FBQ0ssVUFBVTtRQUFDRCxPQUFPLENBQUNiLFlBQVksQ0FBQ1UsWUFBWSxFQUFDQyxPQUFPLENBQUM7TUFBQSxDQUFDLE1BQUk7UUFBQ0ksTUFBTSxDQUFDQyxXQUFXLENBQUNOLFlBQVksQ0FBQztNQUFBO0lBQUM7SUFBQyxTQUFTVixZQUFZLENBQUNTLE9BQU8sRUFBQ0MsWUFBWSxFQUFDO01BQUMsSUFBSUssTUFBTSxHQUFDTixPQUFPLENBQUNLLFVBQVU7TUFBQ0MsTUFBTSxDQUFDZixZQUFZLENBQUNVLFlBQVksRUFBQ0QsT0FBTyxDQUFDO0lBQUE7SUFBQyxTQUFTUixPQUFPLENBQUNnQixLQUFLLEVBQUNDLEVBQUUsRUFBQztNQUFDLElBQUcsQ0FBQ0QsS0FBSyxFQUFDO01BQU8sSUFBR0EsS0FBSyxDQUFDaEIsT0FBTyxFQUFDO1FBQUNnQixLQUFLLENBQUNoQixPQUFPLENBQUNpQixFQUFFLENBQUM7TUFBQSxDQUFDLE1BQUk7UUFBQyxLQUFJLElBQUloRCxDQUFDLEdBQUMsQ0FBQyxFQUFDQSxDQUFDLEdBQUMrQyxLQUFLLENBQUNwQyxNQUFNLEVBQUNYLENBQUMsRUFBRSxFQUFDO1VBQUNnRCxFQUFFLENBQUNELEtBQUssQ0FBQy9DLENBQUMsQ0FBQyxFQUFDQSxDQUFDLEVBQUMrQyxLQUFLLENBQUM7UUFBQTtNQUFDO0lBQUM7SUFBQyxTQUFTZixRQUFRLENBQUNpQixFQUFFLEVBQUNELEVBQUUsRUFBQztNQUFDLElBQUlFLE9BQU8sR0FBQyxLQUFLLENBQUM7TUFBQyxJQUFJQyxXQUFXLEdBQUMsU0FBU0EsV0FBVyxHQUFFO1FBQUNDLFlBQVksQ0FBQ0YsT0FBTyxDQUFDO1FBQUNBLE9BQU8sR0FBQ0csVUFBVSxDQUFDTCxFQUFFLEVBQUNDLEVBQUUsQ0FBQztNQUFBLENBQUM7TUFBQyxPQUFPRSxXQUFXO0lBQUE7RUFBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUM7RUFBQyxDQUFDLEVBQUMsQ0FBQyxVQUFTaEQsT0FBTyxFQUFDUyxNQUFNLEVBQUNILE9BQU8sRUFBQztJQUFDLFlBQVk7O0lBQUNlLE1BQU0sQ0FBQ0MsY0FBYyxDQUFDaEIsT0FBTyxFQUFDLFlBQVksRUFBQztNQUFDaUIsS0FBSyxFQUFDO0lBQUksQ0FBQyxDQUFDO0lBQUNqQixPQUFPLENBQUNZLGtCQUFrQixHQUFDQSxrQkFBa0I7SUFBQ1osT0FBTyxDQUFDYSxvQkFBb0IsR0FBQ0Esb0JBQW9CO0lBQUNiLE9BQU8sQ0FBQ2MsMEJBQTBCLEdBQUNBLDBCQUEwQjtJQUFDZCxPQUFPLENBQUNTLE9BQU8sR0FBQ29DLFNBQVM7SUFBQyxJQUFJQyxLQUFLLEdBQUNwRCxPQUFPLENBQUMsUUFBUSxDQUFDO0lBQUMsU0FBU2tCLGtCQUFrQixDQUFDbUMsS0FBSyxFQUFDQyxZQUFZLEVBQUM7TUFBQ0QsS0FBSyxDQUFDRSxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUMsWUFBVTtRQUFDRixLQUFLLENBQUNHLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDSCxZQUFZLENBQUM7TUFBQSxDQUFDLENBQUM7TUFBQ0QsS0FBSyxDQUFDRSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUMsWUFBVTtRQUFDLElBQUdGLEtBQUssQ0FBQ0ssUUFBUSxDQUFDQyxLQUFLLEVBQUM7VUFBQ04sS0FBSyxDQUFDRyxTQUFTLENBQUNJLE1BQU0sQ0FBQ04sWUFBWSxDQUFDO1FBQUE7TUFBQyxDQUFDLENBQUM7SUFBQTtJQUFDLElBQUlPLFVBQVUsR0FBQyxDQUFDLFVBQVUsRUFBQyxpQkFBaUIsRUFBQyxlQUFlLEVBQUMsZ0JBQWdCLEVBQUMsY0FBYyxFQUFDLFNBQVMsRUFBQyxVQUFVLEVBQUMsY0FBYyxFQUFDLGNBQWMsRUFBQyxhQUFhLENBQUM7SUFBQyxTQUFTQyxnQkFBZ0IsQ0FBQ1QsS0FBSyxFQUFDVSxjQUFjLEVBQUM7TUFBQ0EsY0FBYyxHQUFDQSxjQUFjLElBQUUsQ0FBQyxDQUFDO01BQUMsSUFBSUMsZUFBZSxHQUFDLENBQUNYLEtBQUssQ0FBQ1ksSUFBSSxHQUFDLFVBQVUsQ0FBQyxDQUFDQyxNQUFNLENBQUNMLFVBQVUsQ0FBQztNQUFDLElBQUlILFFBQVEsR0FBQ0wsS0FBSyxDQUFDSyxRQUFRO01BQUMsS0FBSSxJQUFJN0QsQ0FBQyxHQUFDLENBQUMsRUFBQ0EsQ0FBQyxHQUFDbUUsZUFBZSxDQUFDeEQsTUFBTSxFQUFDWCxDQUFDLEVBQUUsRUFBQztRQUFDLElBQUlzRSxJQUFJLEdBQUNILGVBQWUsQ0FBQ25FLENBQUMsQ0FBQztRQUFDLElBQUc2RCxRQUFRLENBQUNTLElBQUksQ0FBQyxFQUFDO1VBQUMsT0FBT2QsS0FBSyxDQUFDZSxZQUFZLENBQUMsT0FBTyxHQUFDRCxJQUFJLENBQUMsSUFBRUosY0FBYyxDQUFDSSxJQUFJLENBQUM7UUFBQTtNQUFDO0lBQUM7SUFBQyxTQUFTaEQsb0JBQW9CLENBQUNrQyxLQUFLLEVBQUNVLGNBQWMsRUFBQztNQUFDLFNBQVNNLGFBQWEsR0FBRTtRQUFDLElBQUlDLE9BQU8sR0FBQ2pCLEtBQUssQ0FBQ0ssUUFBUSxDQUFDQyxLQUFLLEdBQUMsSUFBSSxHQUFDRyxnQkFBZ0IsQ0FBQ1QsS0FBSyxFQUFDVSxjQUFjLENBQUM7UUFBQ1YsS0FBSyxDQUFDa0IsaUJBQWlCLENBQUNELE9BQU8sSUFBRSxFQUFFLENBQUM7TUFBQTtNQUFDakIsS0FBSyxDQUFDRSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUNjLGFBQWEsQ0FBQztNQUFDaEIsS0FBSyxDQUFDRSxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUNjLGFBQWEsQ0FBQztJQUFBO0lBQUMsU0FBU2pELDBCQUEwQixDQUFDaUMsS0FBSyxFQUFDbUIsT0FBTyxFQUFDO01BQUMsSUFBSUMsb0JBQW9CLEdBQUNELE9BQU8sQ0FBQ0Msb0JBQW9CO1FBQUNDLDBCQUEwQixHQUFDRixPQUFPLENBQUNFLDBCQUEwQjtRQUFDQyxjQUFjLEdBQUNILE9BQU8sQ0FBQ0csY0FBYztNQUFDLFNBQVNOLGFBQWEsQ0FBQ0csT0FBTyxFQUFDO1FBQUMsSUFBSUksV0FBVyxHQUFDSixPQUFPLENBQUNJLFdBQVc7UUFBQyxJQUFJbkMsVUFBVSxHQUFDWSxLQUFLLENBQUNaLFVBQVU7UUFBQyxJQUFJb0MsU0FBUyxHQUFDcEMsVUFBVSxDQUFDcUMsYUFBYSxDQUFDLEdBQUcsR0FBQ0wsb0JBQW9CLENBQUMsSUFBRU0sUUFBUSxDQUFDQyxhQUFhLENBQUMsS0FBSyxDQUFDO1FBQUMsSUFBRyxDQUFDM0IsS0FBSyxDQUFDSyxRQUFRLENBQUNDLEtBQUssSUFBRU4sS0FBSyxDQUFDNEIsaUJBQWlCLEVBQUM7VUFBQ0osU0FBUyxDQUFDSyxTQUFTLEdBQUNULG9CQUFvQjtVQUFDSSxTQUFTLENBQUNNLFdBQVcsR0FBQzlCLEtBQUssQ0FBQzRCLGlCQUFpQjtVQUFDLElBQUdMLFdBQVcsRUFBQztZQUFDRCxjQUFjLEtBQUcsUUFBUSxHQUFDLENBQUMsQ0FBQyxFQUFDdkIsS0FBSyxDQUFDekIsWUFBWSxFQUFFMEIsS0FBSyxFQUFDd0IsU0FBUyxDQUFDLEdBQUMsQ0FBQyxDQUFDLEVBQUN6QixLQUFLLENBQUMxQixXQUFXLEVBQUUyQixLQUFLLEVBQUN3QixTQUFTLENBQUM7WUFBQ3BDLFVBQVUsQ0FBQ2UsU0FBUyxDQUFDQyxHQUFHLENBQUNpQiwwQkFBMEIsQ0FBQztVQUFBO1FBQUMsQ0FBQyxNQUFJO1VBQUNqQyxVQUFVLENBQUNlLFNBQVMsQ0FBQ0ksTUFBTSxDQUFDYywwQkFBMEIsQ0FBQztVQUFDRyxTQUFTLENBQUNqQixNQUFNLEVBQUU7UUFBQTtNQUFDO01BQUNQLEtBQUssQ0FBQ0UsZ0JBQWdCLENBQUMsT0FBTyxFQUFDLFlBQVU7UUFBQ2MsYUFBYSxDQUFDO1VBQUNPLFdBQVcsRUFBQztRQUFLLENBQUMsQ0FBQztNQUFBLENBQUMsQ0FBQztNQUFDdkIsS0FBSyxDQUFDRSxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUMsVUFBUzlELENBQUMsRUFBQztRQUFDQSxDQUFDLENBQUMyRixjQUFjLEVBQUU7UUFBQ2YsYUFBYSxDQUFDO1VBQUNPLFdBQVcsRUFBQztRQUFJLENBQUMsQ0FBQztNQUFBLENBQUMsQ0FBQztJQUFBO0lBQUMsSUFBSVMsY0FBYyxHQUFDO01BQUMvQixZQUFZLEVBQUMsU0FBUztNQUFDbUIsb0JBQW9CLEVBQUMsa0JBQWtCO01BQUNDLDBCQUEwQixFQUFDLHNCQUFzQjtNQUFDWCxjQUFjLEVBQUMsQ0FBQyxDQUFDO01BQUNZLGNBQWMsRUFBQztJQUFRLENBQUM7SUFBQyxTQUFTeEIsU0FBUyxDQUFDbUMsT0FBTyxFQUFDZCxPQUFPLEVBQUM7TUFBQyxJQUFHLENBQUNjLE9BQU8sSUFBRSxDQUFDQSxPQUFPLENBQUNDLFFBQVEsRUFBQztRQUFDLE1BQU0sSUFBSXBGLEtBQUssQ0FBQyxtRUFBbUUsQ0FBQztNQUFBO01BQUMsSUFBSXFGLE1BQU0sR0FBQyxLQUFLLENBQUM7TUFBQyxJQUFJdkIsSUFBSSxHQUFDcUIsT0FBTyxDQUFDQyxRQUFRLENBQUNFLFdBQVcsRUFBRTtNQUFDakIsT0FBTyxHQUFDLENBQUMsQ0FBQyxFQUFDcEIsS0FBSyxDQUFDM0IsUUFBUSxFQUFFK0MsT0FBTyxFQUFDYSxjQUFjLENBQUM7TUFBQyxJQUFHcEIsSUFBSSxLQUFHLE1BQU0sRUFBQztRQUFDdUIsTUFBTSxHQUFDRixPQUFPLENBQUNJLGdCQUFnQixDQUFDLHlCQUF5QixDQUFDO1FBQUNDLGlCQUFpQixDQUFDTCxPQUFPLEVBQUNFLE1BQU0sQ0FBQztNQUFBLENBQUMsTUFBSyxJQUFHdkIsSUFBSSxLQUFHLE9BQU8sSUFBRUEsSUFBSSxLQUFHLFFBQVEsSUFBRUEsSUFBSSxLQUFHLFVBQVUsRUFBQztRQUFDdUIsTUFBTSxHQUFDLENBQUNGLE9BQU8sQ0FBQztNQUFBLENBQUMsTUFBSTtRQUFDLE1BQU0sSUFBSW5GLEtBQUssQ0FBQyw4REFBOEQsQ0FBQztNQUFBO01BQUN5RixlQUFlLENBQUNKLE1BQU0sRUFBQ2hCLE9BQU8sQ0FBQztJQUFBO0lBQUMsU0FBU21CLGlCQUFpQixDQUFDRSxJQUFJLEVBQUNMLE1BQU0sRUFBQztNQUFDLElBQUlNLFVBQVUsR0FBQyxDQUFDLENBQUMsRUFBQzFDLEtBQUssQ0FBQ3ZCLFFBQVEsRUFBRSxHQUFHLEVBQUMsWUFBVTtRQUFDLElBQUlrRSxXQUFXLEdBQUNGLElBQUksQ0FBQ2YsYUFBYSxDQUFDLFVBQVUsQ0FBQztRQUFDLElBQUdpQixXQUFXLEVBQUNBLFdBQVcsQ0FBQ0MsS0FBSyxFQUFFO01BQUEsQ0FBQyxDQUFDO01BQUMsQ0FBQyxDQUFDLEVBQUM1QyxLQUFLLENBQUN4QixPQUFPLEVBQUU0RCxNQUFNLEVBQUMsVUFBU25DLEtBQUssRUFBQztRQUFDLE9BQU9BLEtBQUssQ0FBQ0UsZ0JBQWdCLENBQUMsU0FBUyxFQUFDdUMsVUFBVSxDQUFDO01BQUEsQ0FBQyxDQUFDO0lBQUE7SUFBQyxTQUFTRixlQUFlLENBQUNKLE1BQU0sRUFBQ2hCLE9BQU8sRUFBQztNQUFDLElBQUlsQixZQUFZLEdBQUNrQixPQUFPLENBQUNsQixZQUFZO1FBQUNTLGNBQWMsR0FBQ1MsT0FBTyxDQUFDVCxjQUFjO01BQUMsQ0FBQyxDQUFDLEVBQUNYLEtBQUssQ0FBQ3hCLE9BQU8sRUFBRTRELE1BQU0sRUFBQyxVQUFTbkMsS0FBSyxFQUFDO1FBQUNuQyxrQkFBa0IsQ0FBQ21DLEtBQUssRUFBQ0MsWUFBWSxDQUFDO1FBQUNuQyxvQkFBb0IsQ0FBQ2tDLEtBQUssRUFBQ1UsY0FBYyxDQUFDO1FBQUMzQywwQkFBMEIsQ0FBQ2lDLEtBQUssRUFBQ21CLE9BQU8sQ0FBQztNQUFBLENBQUMsQ0FBQztJQUFBO0VBQUMsQ0FBQyxFQUFDO0lBQUMsUUFBUSxFQUFDO0VBQUMsQ0FBQztBQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7QUNBdGxMO0FBQ0E7QUFDQTtBQUNBO0FBQUMsQ0FBQyxVQUFXeUIsQ0FBQyxFQUFFakYsTUFBTSxFQUFFK0QsUUFBUSxFQUFFNUMsU0FBUyxFQUFHO0VBRTVDO0VBQ0E7RUFDQTtFQUNBOztFQUVBO0VBQ0E7RUFDQTs7RUFFQTtFQUNBLElBQUkrRCxVQUFVLEdBQUcsaUJBQWlCO0lBQ2xDekUsUUFBUSxHQUFHO01BQ1QsT0FBTyxFQUFHLEtBQUs7TUFBRTtNQUNqQix3QkFBd0IsRUFBRyxFQUFFO01BQzdCLFdBQVcsRUFBRyxFQUFFO01BQ2hCLFlBQVksRUFBRyxnQkFBZ0I7TUFDL0IsZUFBZSxFQUFHLDBCQUEwQjtNQUM1QyxnQkFBZ0IsRUFBRyxFQUFFO01BQ3JCLG1CQUFtQixFQUFHLHFCQUFxQjtNQUMzQyxlQUFlLEVBQUcsU0FBUztNQUMzQixzQkFBc0IsRUFBRSxTQUFTO01BQ2pDLHVCQUF1QixFQUFHLFVBQVU7TUFDcEMseUJBQXlCLEVBQUcsc0JBQXNCO01BQ2xELDRCQUE0QixFQUFHLHdCQUF3QjtNQUN2RCxZQUFZLEVBQUcsb0JBQW9CO01BQ25DLHVCQUF1QixFQUFHLG1DQUFtQztNQUFFO01BQy9ELDBCQUEwQixFQUFHLGlCQUFpQjtNQUM5QywrQkFBK0IsRUFBRywrQkFBK0I7TUFDakUsNEJBQTRCLEVBQUcsb0JBQW9CO01BQ25ELHNCQUFzQixFQUFHLGNBQWM7TUFDdkMsNkJBQTZCLEVBQUcsNkJBQTZCO01BQzdELGVBQWUsRUFBRywyQkFBMkI7TUFDN0MsbUNBQW1DLEVBQUcsMkJBQTJCO01BQ2pFLHlCQUF5QixFQUFHLGtDQUFrQztNQUFFO01BQ2hFLHFCQUFxQixFQUFHLGVBQWU7TUFBRTtNQUN6QywwQkFBMEIsRUFBRyxvQkFBb0I7TUFBRTtNQUNuRCxvQkFBb0IsRUFBRyxZQUFZO01BQ25DLCtCQUErQixFQUFHLHVCQUF1QjtNQUN6RCwwQkFBMEIsRUFBRyxzQkFBc0I7TUFDbkQsZ0NBQWdDLEVBQUcsd0JBQXdCO01BQzNELDJCQUEyQixFQUFHLCtCQUErQjtNQUM3RCwyQkFBMkIsRUFBRywrQkFBK0I7TUFDN0QsMkJBQTJCLEVBQUcsaUJBQWlCO01BQy9DLHNCQUFzQixFQUFHLFFBQVE7TUFDakMseUJBQXlCLEVBQUcsV0FBVztNQUN2QywyQkFBMkIsRUFBRyxhQUFhO01BQzNDLDBCQUEwQixFQUFHLFlBQVk7TUFDekMsK0JBQStCLEVBQUcsaUJBQWlCO01BQ25ELDZCQUE2QixFQUFHLGVBQWU7TUFDL0MsOEJBQThCLEVBQUcsZ0JBQWdCO01BQ2pELDRCQUE0QixFQUFFLGNBQWM7TUFDNUMsZ0NBQWdDLEVBQUcsa0JBQWtCO01BQ3JELCtCQUErQixFQUFHLGlCQUFpQjtNQUNuRCw2QkFBNkIsRUFBRSxlQUFlO01BQzlDLGlDQUFpQyxFQUFHLG1CQUFtQjtNQUN2RCxvQkFBb0IsRUFBRyxrQkFBa0I7TUFDekMsbUJBQW1CLEVBQUcsdUJBQXVCO01BQzdDLHlCQUF5QixFQUFHLHNCQUFzQjtNQUNsRCx1QkFBdUIsRUFBRSx3QkFBd0I7TUFDakQsbUJBQW1CLEVBQUcsaUNBQWlDO01BQ3ZELGdCQUFnQixFQUFHLHdCQUF3QjtNQUMzQyx5QkFBeUIsRUFBRyxpQkFBaUI7TUFDN0MsaUJBQWlCLEVBQUcsY0FBYztNQUNsQyxpQkFBaUIsRUFBRyxjQUFjO01BQ2xDLGlCQUFpQixFQUFHLFdBQVc7TUFDL0IscUJBQXFCLEVBQUcsZUFBZTtNQUN2QyxpQkFBaUIsRUFBRyxXQUFXO01BQUU7TUFDakMsMkJBQTJCLEVBQUc7SUFDaEMsQ0FBQyxDQUFDLENBQUM7O0VBRUg7RUFDQSxTQUFTMEUsTUFBTSxDQUFFYixPQUFPLEVBQUVkLE9BQU8sRUFBRztJQUVsQyxJQUFJLENBQUNjLE9BQU8sR0FBR0EsT0FBTzs7SUFFdEI7SUFDQTtJQUNBO0lBQ0E7SUFDQSxJQUFJLENBQUNkLE9BQU8sR0FBR3lCLENBQUMsQ0FBQ0csTUFBTSxDQUFFLENBQUMsQ0FBQyxFQUFFM0UsUUFBUSxFQUFFK0MsT0FBTyxDQUFFO0lBRWhELElBQUksQ0FBQzZCLFNBQVMsR0FBRzVFLFFBQVE7SUFDekIsSUFBSSxDQUFDNkUsS0FBSyxHQUFHSixVQUFVO0lBRXZCLElBQUksQ0FBQ0ssSUFBSSxFQUFFO0VBQ2IsQ0FBQyxDQUFDOztFQUVGSixNQUFNLENBQUNLLFNBQVMsR0FBRztJQUVqQkQsSUFBSSxFQUFFLFVBQVNFLEtBQUssRUFBRUMsTUFBTSxFQUFFO01BRTlCM0IsUUFBUSxDQUFDNEIsZUFBZSxDQUFDbkQsU0FBUyxDQUFDSSxNQUFNLENBQUUsT0FBTyxDQUFFO01BQ3BEbUIsUUFBUSxDQUFDNEIsZUFBZSxDQUFDbkQsU0FBUyxDQUFDQyxHQUFHLENBQUUsSUFBSSxDQUFFOztNQUU1QztNQUNBO01BQ0E7TUFDQTtNQUNBO01BQ0E7O01BRUE7TUFDQTtNQUNBLElBQUlnRCxLQUFLLEtBQUssSUFBSSxFQUFFO1FBQ2xCLElBQUksQ0FBQ2pDLE9BQU8sQ0FBQ2tDLE1BQU0sR0FBR0UsVUFBVSxDQUFDWCxDQUFDLENBQUMsSUFBSSxDQUFDekIsT0FBTyxDQUFDcUMscUJBQXFCLEVBQUUsSUFBSSxDQUFDdkIsT0FBTyxDQUFDLENBQUN3QixJQUFJLEVBQUUsQ0FBQztNQUM5RixDQUFDLE1BQU07UUFDTCxJQUFJLENBQUN0QyxPQUFPLENBQUNrQyxNQUFNLEdBQUdBLE1BQU07TUFDOUI7TUFDQSxJQUFJLENBQUNsQyxPQUFPLENBQUN1QyxlQUFlLEdBQU9DLFFBQVEsQ0FBQ2YsQ0FBQyxDQUFDLElBQUksQ0FBQ3pCLE9BQU8sQ0FBQ3lDLHdCQUF3QixFQUFFLElBQUksQ0FBQzNCLE9BQU8sQ0FBQyxDQUFDNEIsR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUFDO01BQzdHLElBQUksQ0FBQzFDLE9BQU8sQ0FBQzJDLGNBQWMsR0FBUSxDQUFDQyxJQUFJLENBQUNDLEtBQUssQ0FBQ1QsVUFBVSxDQUFDLElBQUksQ0FBQ3BDLE9BQU8sQ0FBQzhDLFVBQVUsQ0FBQyxHQUFDRixJQUFJLENBQUNHLEdBQUcsQ0FBQyxFQUFFLEVBQUMsQ0FBQyxDQUFDLENBQUMsR0FBQ0gsSUFBSSxDQUFDRyxHQUFHLENBQUMsRUFBRSxFQUFDLENBQUMsQ0FBQyxFQUFFQyxPQUFPLENBQUMsQ0FBQyxDQUFDO01BQzdILElBQUksQ0FBQ2hELE9BQU8sQ0FBQ2lELG1CQUFtQixHQUFHLElBQUksQ0FBQ2pELE9BQU8sQ0FBQzJDLGNBQWM7TUFDOUQsSUFBSSxDQUFDM0MsT0FBTyxDQUFDa0QsY0FBYyxHQUFRLEtBQUs7TUFFeEMsSUFBSUMsV0FBVyxHQUFHMUIsQ0FBQyxDQUFDLElBQUksQ0FBQ3pCLE9BQU8sQ0FBQ29ELG1CQUFtQixDQUFDLENBQUNkLElBQUksRUFBRTtNQUM1RCxJQUFJLENBQUN0QyxPQUFPLENBQUNtRCxXQUFXLEdBQUdBLFdBQVc7TUFFdEMsSUFBSSxDQUFDRSxNQUFNLEdBQUdDLE1BQU0sQ0FBQyxJQUFJLENBQUN0RCxPQUFPLENBQUN1RCxzQkFBc0IsQ0FBQztNQUN6RCxJQUFJLENBQUNDLFFBQVEsR0FBRyxJQUFJLENBQUNILE1BQU0sQ0FBQ0csUUFBUSxDQUFDO1FBQ25DQyxLQUFLLEVBQUUsQ0FDTDtVQUNFO1VBQ0FDLE1BQU0sRUFBRTtRQUNWLENBQUM7TUFFTCxDQUFDLENBQUM7TUFFRixJQUFJLElBQUksQ0FBQzFELE9BQU8sQ0FBQzJELEtBQUssS0FBSyxJQUFJLEVBQUU7UUFDL0IsSUFBSSxDQUFDQSxLQUFLLENBQUMsSUFBSSxDQUFDM0QsT0FBTyxDQUFDO1FBQ3hCO01BQ0Y7O01BRUE7TUFDQSxJQUFJLENBQUM0RCxpQkFBaUIsQ0FBQyxJQUFJLENBQUM1RCxPQUFPLENBQUMsQ0FBQyxDQUFDO01BQ3RDLElBQUksQ0FBQzZELGFBQWEsQ0FBQyxJQUFJLENBQUMvQyxPQUFPLEVBQUUsSUFBSSxDQUFDZCxPQUFPLENBQUMsQ0FBQyxDQUFDO01BQ2hELElBQUksQ0FBQzhELGFBQWEsQ0FBQyxJQUFJLENBQUNoRCxPQUFPLEVBQUUsSUFBSSxDQUFDZCxPQUFPLENBQUMsQ0FBQyxDQUFDOztNQUVoRCxJQUFJeUIsQ0FBQyxDQUFDLElBQUksQ0FBQ3pCLE9BQU8sQ0FBQytELDBCQUEwQixDQUFDLENBQUMvSCxNQUFNLEdBQUcsQ0FBQyxFQUFFO1FBQ3pELElBQUksQ0FBQ2dJLHdCQUF3QixDQUFDLElBQUksQ0FBQ2hFLE9BQU8sQ0FBQyxDQUFDLENBQUM7TUFDL0M7O01BRUE7TUFDQSxJQUFJeUIsQ0FBQyxDQUFDLElBQUksQ0FBQ3pCLE9BQU8sQ0FBQ2lFLG9CQUFvQixDQUFDLENBQUNqSSxNQUFNLEdBQUcsQ0FBQyxFQUFFO1FBQ25ELElBQUksQ0FBQ2tJLGlCQUFpQixDQUFDLElBQUksQ0FBQ3BELE9BQU8sRUFBRSxJQUFJLENBQUNkLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDbUUsbUJBQW1CLENBQUMsSUFBSSxDQUFDckQsT0FBTyxFQUFFLElBQUksQ0FBQ2QsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUN0RCxJQUFJLENBQUNvRSxtQkFBbUIsQ0FBQyxJQUFJLENBQUN0RCxPQUFPLEVBQUUsSUFBSSxDQUFDZCxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQ3FFLGVBQWUsQ0FBQyxJQUFJLENBQUN2RCxPQUFPLEVBQUUsSUFBSSxDQUFDZCxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQ3NFLG9CQUFvQixDQUFDLElBQUksQ0FBQ3hELE9BQU8sRUFBRSxJQUFJLENBQUNkLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDdUUsb0JBQW9CLENBQUMsSUFBSSxDQUFDekQsT0FBTyxFQUFFLElBQUksQ0FBQ2QsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUN3RSxtQkFBbUIsQ0FBQyxJQUFJLENBQUMxRCxPQUFPLEVBQUUsSUFBSSxDQUFDZCxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ3RELElBQUksQ0FBQ3lFLGdCQUFnQixDQUFDLElBQUksQ0FBQzNELE9BQU8sRUFBRSxJQUFJLENBQUNkLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDMEUsYUFBYSxDQUFDLElBQUksQ0FBQzVELE9BQU8sRUFBRSxJQUFJLENBQUNkLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDMkUsU0FBUyxDQUFDLElBQUksQ0FBQzdELE9BQU8sRUFBRSxJQUFJLENBQUNkLE9BQU8sQ0FBQyxDQUFDLENBQUM7TUFDOUM7O01BRUEsSUFBSXlCLENBQUMsQ0FBQyxJQUFJLENBQUN6QixPQUFPLENBQUM0RSxxQkFBcUIsQ0FBQyxDQUFDNUksTUFBTSxHQUFHLENBQUMsRUFBRTtRQUNwRCxJQUFJLENBQUM2SSxzQkFBc0IsQ0FBQyxJQUFJLENBQUMvRCxPQUFPLEVBQUUsSUFBSSxDQUFDZCxPQUFPLENBQUM7UUFDdkQsSUFBSSxDQUFDOEUsb0JBQW9CLENBQUMsSUFBSSxDQUFDaEUsT0FBTyxFQUFFLElBQUksQ0FBQ2QsT0FBTyxDQUFDLENBQUMsQ0FBQztNQUN6RDtJQUVGLENBQUM7O0lBQUU7O0lBRUgyRCxLQUFLLEVBQUUsVUFBUzdELE9BQU8sRUFBRTtNQUN2QixJQUFJLElBQUksQ0FBQ0UsT0FBTyxDQUFDMkQsS0FBSyxLQUFLLElBQUksRUFBRTtRQUMvQixJQUFJLE9BQU83RCxPQUFPLEtBQUssUUFBUSxFQUFFO1VBQy9CaUYsT0FBTyxDQUFDQyxHQUFHLENBQUNsRixPQUFPLENBQUM7UUFDdEIsQ0FBQyxNQUFNO1VBQ0xpRixPQUFPLENBQUNFLEdBQUcsQ0FBQ25GLE9BQU8sQ0FBQztRQUN0QjtRQUNBaUYsT0FBTyxDQUFDRSxHQUFHLENBQUMsSUFBSSxDQUFDO01BQ25CO0lBQ0YsQ0FBQztJQUFFOztJQUVIckIsaUJBQWlCLEVBQUUsVUFBUzVELE9BQU8sRUFBRTtNQUNuQyxJQUFJLENBQUMyRCxLQUFLLENBQUMsb0JBQW9CLEdBQUczRCxPQUFPLENBQUNrRixjQUFjLENBQUM7TUFDekQsSUFBSUMsUUFBUSxHQUFHMUQsQ0FBQyxDQUFDekIsT0FBTyxDQUFDb0YsaUJBQWlCLENBQUM7TUFDM0MsSUFBSUMsSUFBSTtNQUNSLElBQUlDLE1BQU0sR0FBRyxnQkFBZ0I7TUFDN0IsSUFBSUMsY0FBYyxHQUFHLENBQUM7TUFDdEIsSUFBSUMsTUFBTSxHQUFHL0QsQ0FBQyxDQUFDekIsT0FBTyxDQUFDeUYsZUFBZSxDQUFDLENBQUMvQyxHQUFHLEVBQUU7TUFDN0MsSUFBSWdELGFBQWEsR0FBRyxLQUFLO01BQ3pCLElBQUkxRixPQUFPLENBQUNrRixjQUFjLElBQUksYUFBYSxFQUFFO1FBQzNDUyxFQUFFLENBQUUsU0FBUyxFQUFFLElBQUksQ0FBRTtNQUN2QjtNQUNBLElBQUlSLFFBQVEsQ0FBQ25KLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDdkJ1SixjQUFjLEdBQUc5RCxDQUFDLENBQUMsSUFBSSxFQUFFMEQsUUFBUSxDQUFDLENBQUNuSixNQUFNLENBQUMsQ0FBQztRQUMzQ3FKLElBQUksR0FBRzVELENBQUMsQ0FBQyxZQUFZLEVBQUUwRCxRQUFRLENBQUMsQ0FBQ2pILE1BQU0sRUFBRSxDQUFDMEgsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7TUFDekQ7TUFDQTtNQUNBO01BQ0EsSUFBSVQsUUFBUSxDQUFDbkosTUFBTSxHQUFHLENBQUMsSUFBSXlGLENBQUMsQ0FBQ3pCLE9BQU8sQ0FBQzRFLHFCQUFxQixDQUFDLENBQUM1SSxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQ3hFO1FBQ0E7UUFDQSxJQUFJcUosSUFBSSxLQUFLRSxjQUFjLElBQUk5RCxDQUFDLENBQUN6QixPQUFPLENBQUM0RSxxQkFBcUIsQ0FBQyxDQUFDNUksTUFBTSxLQUFLLENBQUMsRUFBRTtVQUM1RXFKLElBQUksR0FBR0EsSUFBSSxHQUFHLENBQUM7VUFDZkssYUFBYSxHQUFHLElBQUk7UUFDdEI7TUFDRixDQUFDLE1BQU0sSUFBSVAsUUFBUSxDQUFDbkosTUFBTSxHQUFHLENBQUMsSUFBSXlGLENBQUMsQ0FBQ3pCLE9BQU8sQ0FBQzRFLHFCQUFxQixDQUFDLENBQUM1SSxNQUFNLEdBQUcsQ0FBQyxJQUFJeUYsQ0FBQyxDQUFDekIsT0FBTyxDQUFDNkYsdUJBQXVCLENBQUMsQ0FBQzdKLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDOUg7UUFDQTtRQUNBO1FBQ0FzSixNQUFNLEdBQUcsVUFBVTtNQUNyQixDQUFDLE1BQU0sSUFBSUgsUUFBUSxDQUFDbkosTUFBTSxLQUFLLENBQUMsRUFBRTtRQUNoQztNQUNGO01BQ0EsSUFBSSxDQUFDMkgsS0FBSyxDQUFFLFVBQVUsR0FBRzBCLElBQUksR0FBRyx5QkFBeUIsR0FBR0UsY0FBYyxHQUFHLGlCQUFpQixHQUFHQyxNQUFNLEdBQUcsd0JBQXdCLEdBQUdFLGFBQWEsQ0FBRTtNQUNwSixJQUFJLENBQUNJLHFCQUFxQixDQUFDVCxJQUFJLEVBQUVDLE1BQU0sRUFBRUksYUFBYSxDQUFDO0lBQ3pELENBQUM7SUFBRTs7SUFFSEkscUJBQXFCLEVBQUUsVUFBU1QsSUFBSSxFQUFFQyxNQUFNLEVBQUVJLGFBQWEsRUFBRTtNQUMzRCxJQUFJUCxRQUFRLEdBQUcxRCxDQUFDLENBQUMsSUFBSSxDQUFDekIsT0FBTyxDQUFDb0YsaUJBQWlCLENBQUM7TUFDaEQsSUFBSWxELE1BQU0sR0FBR1QsQ0FBQyxDQUFDLElBQUksQ0FBQ3pCLE9BQU8sQ0FBQ3lDLHdCQUF3QixDQUFDLENBQUNDLEdBQUcsRUFBRTtNQUMzRCxJQUFJOEMsTUFBTSxHQUFHL0QsQ0FBQyxDQUFDLElBQUksQ0FBQ3pCLE9BQU8sQ0FBQ3lGLGVBQWUsQ0FBQyxDQUFDL0MsR0FBRyxFQUFFO01BQ2xELElBQUlxRCxrQkFBa0IsR0FBRyxVQUFVO01BQ25DLElBQUlDLEtBQUs7TUFDVCxJQUFJQyxJQUFJLEdBQUcsSUFBSTtNQUNmLElBQUl4RSxDQUFDLENBQUMsSUFBSSxDQUFDekIsT0FBTyxDQUFDa0csMkJBQTJCLENBQUMsQ0FBQ2xLLE1BQU0sR0FBRyxDQUFDLEVBQUc7UUFDM0QrSixrQkFBa0IsR0FBR3RFLENBQUMsQ0FBQyxJQUFJLENBQUN6QixPQUFPLENBQUNrRywyQkFBMkIsQ0FBQyxDQUFDeEQsR0FBRyxFQUFFO01BQ3hFO01BQ0E7TUFDQTtNQUNBLElBQUl5QyxRQUFRLENBQUNuSixNQUFNLEdBQUcsQ0FBQyxFQUFFO1FBQ3ZCLElBQUltSyxJQUFJLEdBQUc7VUFDVGpFLE1BQU0sRUFBRUEsTUFBTTtVQUNkNkQsa0JBQWtCLEVBQUVBO1FBQ3RCLENBQUM7UUFDRHRFLENBQUMsQ0FBQzJFLElBQUksQ0FBQztVQUNMQyxNQUFNLEVBQUUsTUFBTTtVQUNkQyxHQUFHLEVBQUUsMEJBQTBCO1VBQy9CSCxJQUFJLEVBQUVBO1FBQ1IsQ0FBQyxDQUFDLENBQUNJLElBQUksQ0FBQyxVQUFVSixJQUFJLEVBQUc7VUFDdkIsSUFBSTFFLENBQUMsQ0FBQzBFLElBQUksQ0FBQ0gsS0FBSyxDQUFDLENBQUNoSyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzVCZ0ssS0FBSyxHQUFHRyxJQUFJLENBQUNILEtBQUssQ0FBQ0EsS0FBSztZQUN4QkMsSUFBSSxDQUFDdEMsS0FBSyxDQUFDLCtCQUErQixHQUFHLFdBQVcsR0FBR3FDLEtBQUssQ0FBQy9FLFdBQVcsRUFBRSxHQUFHLGFBQWEsR0FBRyxlQUFlLEdBQUcsV0FBVyxHQUFHK0UsS0FBSyxDQUFDUSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUNDLFdBQVcsRUFBRSxHQUFHVCxLQUFLLENBQUNVLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxhQUFhLEdBQUcsa0JBQWtCLEdBQUdYLGtCQUFrQixDQUFDUyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUNDLFdBQVcsRUFBRSxHQUFHVixrQkFBa0IsQ0FBQ1csS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hTLElBQUlDLE9BQU8sR0FBRztjQUNaLElBQUksRUFBRSxXQUFXLEdBQUdYLEtBQUssQ0FBQy9FLFdBQVcsRUFBRSxHQUFHLGFBQWE7Y0FDdkQsTUFBTSxFQUFFLFdBQVcsR0FBRytFLEtBQUssQ0FBQ1EsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDQyxXQUFXLEVBQUUsR0FBR1QsS0FBSyxDQUFDVSxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsYUFBYTtjQUNwRixVQUFVLEVBQUUsVUFBVTtjQUN0QixPQUFPLEVBQUUsVUFBVTtjQUNuQixTQUFTLEVBQUVYLGtCQUFrQixDQUFDUyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUNDLFdBQVcsRUFBRSxHQUFHVixrQkFBa0IsQ0FBQ1csS0FBSyxDQUFDLENBQUMsQ0FBQztjQUNuRixPQUFPLEVBQUVULElBQUksQ0FBQ1csY0FBYyxDQUFDMUUsTUFBTSxDQUFDO2NBQ3BDLFVBQVUsRUFBRTtZQUNkLENBQUM7WUFDRCxJQUFJK0QsSUFBSSxDQUFDakcsT0FBTyxDQUFDa0YsY0FBYyxJQUFJLFFBQVEsRUFBRTtjQUMzQzJCLElBQUksQ0FBQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUU7Z0JBQ2pDLE9BQU8sRUFBRVosSUFBSSxDQUFDVyxjQUFjLENBQUMxRSxNQUFNLENBQUM7Z0JBQ3BDLE9BQU8sRUFBRSxDQUFDeUUsT0FBTyxDQUFDO2dCQUNsQixlQUFlLEVBQUV0QixJQUFJO2dCQUNyQixpQkFBaUIsRUFBRUM7Y0FDckIsQ0FBQyxDQUFDO1lBQ0osQ0FBQyxNQUFNLElBQUlXLElBQUksQ0FBQ2pHLE9BQU8sQ0FBQ2tGLGNBQWMsSUFBSSxhQUFhLEVBQUU7Y0FDdkRTLEVBQUUsQ0FBQyxlQUFlLEVBQUVnQixPQUFPLENBQUM7Y0FDNUJoQixFQUFFLENBQUMsY0FBYyxFQUFFLFVBQVUsRUFBRTtnQkFDN0IsTUFBTSxFQUFFTixJQUFJO2dCQUNaLFFBQVEsRUFBRUM7Y0FDWixDQUFDLENBQUM7WUFDSjtZQUVBLElBQUlBLE1BQU0sS0FBSyxVQUFVLEVBQUU7Y0FDekJXLElBQUksQ0FBQ3RDLEtBQUssQ0FBQyxpQ0FBaUMsR0FBRzBCLElBQUksR0FBRyxpQkFBaUIsR0FBR0MsTUFBTSxDQUFDO2NBQ2pGLElBQUlXLElBQUksQ0FBQ2pHLE9BQU8sQ0FBQ2tGLGNBQWMsSUFBSSxRQUFRLEVBQUU7Z0JBQzNDMkIsSUFBSSxDQUFDLE9BQU8sRUFBRXZCLE1BQU0sRUFBRTtrQkFDcEIsZ0JBQWdCLEVBQUVFLE1BQU07a0JBQUU7a0JBQzFCLGFBQWEsRUFBRSxVQUFVO2tCQUFFO2tCQUMzQixPQUFPLEVBQUVTLElBQUksQ0FBQ1csY0FBYyxDQUFDMUUsTUFBTSxDQUFDO2tCQUFFO2tCQUN0QyxVQUFVLEVBQUUsS0FBSztrQkFDakIsT0FBTyxFQUFFLENBQUN5RSxPQUFPLENBQUM7a0JBQ2xCLGVBQWUsRUFBRXRCO2dCQUNuQixDQUFDLENBQUM7Y0FDSixDQUFDLE1BQU0sSUFBSVksSUFBSSxDQUFDakcsT0FBTyxDQUFDa0YsY0FBYyxJQUFJLGFBQWEsRUFBRTtnQkFDdkRTLEVBQUUsQ0FBQyxjQUFjLEVBQUVMLE1BQU0sRUFBRTtrQkFDekIsSUFBSSxFQUFFRSxNQUFNO2tCQUFFO2tCQUNkLGFBQWEsRUFBRSxVQUFVO2tCQUFFO2tCQUMzQixTQUFTLEVBQUV0RCxNQUFNO2tCQUFFO2tCQUNuQixNQUFNLEVBQUVtRDtnQkFDVixDQUFDLENBQUM7Y0FDSjtZQUNGO1lBRUEsSUFBSVksSUFBSSxDQUFDakcsT0FBTyxDQUFDa0YsY0FBYyxJQUFJLFFBQVEsRUFBRTtjQUMzQzJCLElBQUksQ0FBQyxPQUFPLEVBQUUsV0FBVyxFQUFFO2dCQUN6QkMsVUFBVSxFQUFFdkcsUUFBUSxDQUFDd0csS0FBSztnQkFDMUJDLFNBQVMsRUFBRXhLLE1BQU0sQ0FBQ3lLLFFBQVEsQ0FBQ0M7Y0FDN0IsQ0FBQyxDQUFDO1lBQ0osQ0FBQyxNQUFNLElBQUlqQixJQUFJLENBQUNqRyxPQUFPLENBQUNrRixjQUFjLElBQUksYUFBYSxFQUFFO2NBQ3ZEUyxFQUFFLENBQUMsS0FBSyxFQUFFO2dCQUNSd0IsSUFBSSxFQUFFM0ssTUFBTSxDQUFDeUssUUFBUSxDQUFDQyxRQUFRO2dCQUM5QkgsS0FBSyxFQUFFeEcsUUFBUSxDQUFDd0c7Y0FDbEIsQ0FBQyxDQUFDO2NBQ0ZwQixFQUFFLENBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRW5KLE1BQU0sQ0FBQ3lLLFFBQVEsQ0FBQ0MsUUFBUSxDQUFDO1lBQ2xEOztZQUVBO1lBQ0EsSUFBSyxXQUFXLEtBQUssT0FBT0UsU0FBUyxFQUFHO2NBQ3RDQSxTQUFTLENBQUNDLElBQUksQ0FBQztnQkFBRUMsU0FBUyxFQUFFO2NBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztjQUNyQ0YsU0FBUyxDQUFDQyxJQUFJLENBQUM7Z0JBQ2JFLEtBQUssRUFBRWpDLE1BQU07Z0JBQ2JnQyxTQUFTLEVBQUU7a0JBQ1RsSixLQUFLLEVBQUV1STtnQkFDVDtjQUNGLENBQUMsQ0FBQztZQUNKO1VBRUY7UUFDRixDQUFDLENBQUM7TUFDSjtJQUlGLENBQUM7SUFBRTs7SUFFSDlDLGFBQWEsRUFBRSxVQUFTL0MsT0FBTyxFQUFFZCxPQUFPLEVBQUU7TUFDeEM7TUFDQSxJQUFJaUcsSUFBSSxHQUFHLElBQUk7TUFDZkEsSUFBSSxDQUFDdUIsY0FBYyxDQUFDL0YsQ0FBQyxDQUFDekIsT0FBTyxDQUFDeUMsd0JBQXdCLEVBQUUzQixPQUFPLENBQUMsRUFBRUEsT0FBTyxFQUFFZCxPQUFPLENBQUM7TUFDbkZ5QixDQUFDLENBQUN6QixPQUFPLENBQUN5Qyx3QkFBd0IsRUFBRTNCLE9BQU8sQ0FBQyxDQUFDMkcsTUFBTSxDQUFDLFlBQVc7UUFDN0R4QixJQUFJLENBQUN1QixjQUFjLENBQUMvRixDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUVYLE9BQU8sRUFBRWQsT0FBTyxDQUFDO01BQ2hELENBQUMsQ0FBQztJQUNKLENBQUM7SUFBRTs7SUFFSHdILGNBQWMsRUFBRSxVQUFTRSxLQUFLLEVBQUU1RyxPQUFPLEVBQUVkLE9BQU8sRUFBRTtNQUNoRCxJQUFJaUcsSUFBSSxHQUFHLElBQUk7TUFDZixJQUFJMEIsbUJBQW1CLEdBQUcxQixJQUFJLENBQUMyQixvQkFBb0IsRUFBRTtNQUNyRCxJQUFJMUYsTUFBTSxHQUFHVCxDQUFDLENBQUN6QixPQUFPLENBQUN5Qyx3QkFBd0IsR0FBRyxVQUFVLEVBQUUzQixPQUFPLENBQUMsQ0FBQzRCLEdBQUcsRUFBRTtNQUM1RSxJQUFJZ0YsS0FBSyxDQUFDRyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksT0FBTzNGLE1BQU0sS0FBSyxXQUFXLEVBQUU7UUFDdkRsQyxPQUFPLENBQUN1QyxlQUFlLEdBQUdDLFFBQVEsQ0FBQ04sTUFBTSxFQUFFLEVBQUUsQ0FBQztRQUM5QytELElBQUksQ0FBQzZCLGFBQWEsQ0FBQzdCLElBQUksQ0FBQ2pHLE9BQU8sQ0FBQ3VDLGVBQWUsRUFBRW9GLG1CQUFtQixDQUFDO1FBQ3JFMUIsSUFBSSxDQUFDOEIsa0JBQWtCLENBQUNMLEtBQUssQ0FBQztNQUNoQztJQUNGLENBQUM7SUFBRTs7SUFFSDVELGFBQWEsRUFBRSxVQUFTaEQsT0FBTyxFQUFFZCxPQUFPLEVBQUU7TUFDeEM7TUFDQTtNQUNBLElBQUlpRyxJQUFJLEdBQUcsSUFBSTtNQUNmLElBQUkwQixtQkFBbUIsR0FBRzFCLElBQUksQ0FBQzJCLG9CQUFvQixFQUFFOztNQUVyRDtNQUNBLElBQUlJLDJCQUEyQixHQUFHdkcsQ0FBQyxDQUFDekIsT0FBTyxDQUFDeUMsd0JBQXdCLEVBQUUzQixPQUFPLENBQUM7TUFDOUUsSUFBSWtILDJCQUEyQixDQUFDSCxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUU7UUFDNUNHLDJCQUEyQixHQUFHdkcsQ0FBQyxDQUFDekIsT0FBTyxDQUFDeUMsd0JBQXdCLEdBQUcsVUFBVSxFQUFFM0IsT0FBTyxDQUFDO01BQ3pGO01BQ0FtRixJQUFJLENBQUM4QixrQkFBa0IsQ0FBQ0MsMkJBQTJCLENBQUM7TUFFcER2RyxDQUFDLENBQUN6QixPQUFPLENBQUN5Qyx3QkFBd0IsRUFBRTNCLE9BQU8sQ0FBQyxDQUFDMkcsTUFBTSxDQUFDLFlBQVc7UUFDN0R4QixJQUFJLENBQUNqRyxPQUFPLENBQUN1QyxlQUFlLEdBQUdDLFFBQVEsQ0FBQ2YsQ0FBQyxDQUFDLElBQUksRUFBRVgsT0FBTyxDQUFDLENBQUM0QixHQUFHLEVBQUUsRUFBRSxFQUFFLENBQUM7UUFDbkV1RCxJQUFJLENBQUM2QixhQUFhLENBQUM3QixJQUFJLENBQUNqRyxPQUFPLENBQUN1QyxlQUFlLEVBQUVvRixtQkFBbUIsQ0FBQztRQUNyRTFCLElBQUksQ0FBQzhCLGtCQUFrQixDQUFDdEcsQ0FBQyxDQUFDLElBQUksRUFBRVgsT0FBTyxDQUFDLENBQUM7TUFDM0MsQ0FBQyxDQUFDO01BQ0ZXLENBQUMsQ0FBQ3pCLE9BQU8sQ0FBQ2lJLHVCQUF1QixFQUFFbkgsT0FBTyxDQUFDLENBQUMyRyxNQUFNLENBQUMsWUFBVztRQUM1RHhCLElBQUksQ0FBQ2pHLE9BQU8sQ0FBQ3VDLGVBQWUsR0FBR0MsUUFBUSxDQUFDZixDQUFDLENBQUN6QixPQUFPLENBQUN5Qyx3QkFBd0IsRUFBRTNCLE9BQU8sQ0FBQyxDQUFDNEIsR0FBRyxFQUFFLEVBQUUsRUFBRSxDQUFDO1FBQy9GdUQsSUFBSSxDQUFDNkIsYUFBYSxDQUFDN0IsSUFBSSxDQUFDakcsT0FBTyxDQUFDdUMsZUFBZSxFQUFFb0YsbUJBQW1CLENBQUM7TUFDdkUsQ0FBQyxDQUFDO01BQ0ZsRyxDQUFDLENBQUN6QixPQUFPLENBQUNrSSw2QkFBNkIsRUFBRXBILE9BQU8sQ0FBQyxDQUFDMkcsTUFBTSxDQUFDLFlBQVc7UUFDbEV4QixJQUFJLENBQUNqRyxPQUFPLENBQUN1QyxlQUFlLEdBQUdDLFFBQVEsQ0FBQ2YsQ0FBQyxDQUFDekIsT0FBTyxDQUFDeUMsd0JBQXdCLEVBQUUzQixPQUFPLENBQUMsQ0FBQzRCLEdBQUcsRUFBRSxFQUFFLEVBQUUsQ0FBQztRQUMvRnVELElBQUksQ0FBQzZCLGFBQWEsQ0FBQzdCLElBQUksQ0FBQ2pHLE9BQU8sQ0FBQ3VDLGVBQWUsRUFBRW9GLG1CQUFtQixDQUFDO01BQ3ZFLENBQUMsQ0FBQztJQUVKLENBQUM7SUFBRTs7SUFFSGYsY0FBYyxFQUFFLFVBQVMxRSxNQUFNLEVBQUU7TUFDL0JBLE1BQU0sR0FBSSxPQUFPQSxNQUFNLEtBQUssV0FBVyxHQUFLQSxNQUFNLEdBQUcsSUFBSSxDQUFDbEMsT0FBTyxDQUFDdUMsZUFBZTtNQUNqRixJQUFJNEYsWUFBWSxHQUFHakcsTUFBTTtNQUN6QixJQUFJVCxDQUFDLENBQUMsSUFBSSxDQUFDekIsT0FBTyxDQUFDaUksdUJBQXVCLENBQUMsQ0FBQ2pNLE1BQU0sR0FBRyxDQUFDLElBQUl5RixDQUFDLENBQUMsSUFBSSxDQUFDekIsT0FBTyxDQUFDaUksdUJBQXVCLENBQUMsQ0FBQ3ZGLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRTtRQUMzRyxJQUFJMEYsaUJBQWlCLEdBQUczRyxDQUFDLENBQUMsSUFBSSxDQUFDekIsT0FBTyxDQUFDaUksdUJBQXVCLENBQUMsQ0FBQ3ZGLEdBQUcsRUFBRTtRQUNyRXlGLFlBQVksR0FBRzNGLFFBQVEsQ0FBQzRGLGlCQUFpQixFQUFFLEVBQUUsQ0FBQyxHQUFHNUYsUUFBUSxDQUFDTixNQUFNLEVBQUUsRUFBRSxDQUFDO01BQ3ZFO01BQ0EsSUFBSVQsQ0FBQyxDQUFDLElBQUksQ0FBQ3pCLE9BQU8sQ0FBQ3FJLHFCQUFxQixDQUFDLENBQUNyTSxNQUFNLEdBQUcsQ0FBQyxJQUFJeUYsQ0FBQyxDQUFDLElBQUksQ0FBQ3pCLE9BQU8sQ0FBQ3FJLHFCQUFxQixDQUFDLENBQUMzRixHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUU7UUFDdkcsSUFBSTRGLGVBQWUsR0FBRzdHLENBQUMsQ0FBQyxJQUFJLENBQUN6QixPQUFPLENBQUNxSSxxQkFBcUIsQ0FBQyxDQUFDM0YsR0FBRyxFQUFFO1FBQ2pFLElBQUlqQixDQUFDLENBQUMsSUFBSSxDQUFDekIsT0FBTyxDQUFDa0ksNkJBQTZCLEdBQUcsVUFBVSxDQUFDLENBQUN4RixHQUFHLEVBQUUsS0FBSyxVQUFVLEVBQUU7VUFDbkZ5RixZQUFZLEdBQUczRixRQUFRLENBQUM4RixlQUFlLEVBQUUsRUFBRSxDQUFDLEdBQUc5RixRQUFRLENBQUMyRixZQUFZLEVBQUUsRUFBRSxDQUFDO1FBQzNFLENBQUMsTUFBTTtVQUNMQSxZQUFZLEdBQUczRixRQUFRLENBQUMyRixZQUFZLEVBQUUsRUFBRSxDQUFDO1FBQzNDO01BQ0Y7TUFDQSxPQUFPQSxZQUFZO0lBQ3JCLENBQUM7SUFBRTs7SUFFSEosa0JBQWtCLEVBQUUsVUFBU1EsZUFBZSxFQUFFO01BQzVDO01BQ0E7TUFDQSxJQUFJOUcsQ0FBQyxDQUFDLElBQUksQ0FBQ3pCLE9BQU8sQ0FBQ3dJLDBCQUEwQixDQUFDLENBQUN4TSxNQUFNLEdBQUcsQ0FBQyxJQUFJLE9BQU91TSxlQUFlLENBQUNwQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxXQUFXLEVBQUU7UUFDN0gsSUFBSXNDLGVBQWUsR0FBR0YsZUFBZSxDQUFDcEMsSUFBSSxDQUFDLG1CQUFtQixDQUFDO1FBQy9EMUUsQ0FBQyxDQUFDLElBQUksQ0FBQ3pCLE9BQU8sQ0FBQ3dJLDBCQUEwQixDQUFDLENBQUM5RixHQUFHLENBQUMrRixlQUFlLENBQUM7TUFDakU7SUFDRixDQUFDO0lBQUU7O0lBRUhYLGFBQWEsRUFBRSxVQUFTNUYsTUFBTSxFQUFFeUYsbUJBQW1CLEVBQUU7TUFDbkQ7TUFDQSxJQUFJMUIsSUFBSSxHQUFHLElBQUk7TUFDZixJQUFJa0MsWUFBWSxHQUFHbEMsSUFBSSxDQUFDVyxjQUFjLENBQUMxRSxNQUFNLENBQUM7TUFDOUMsSUFBSWlFLElBQUksR0FBRztRQUNUakUsTUFBTSxFQUFFaUcsWUFBWTtRQUNwQlIsbUJBQW1CLEVBQUVBO01BQ3ZCLENBQUM7TUFDRDFCLElBQUksQ0FBQ3lDLG9CQUFvQixDQUFDZixtQkFBbUIsQ0FBQztNQUM5Q2xHLENBQUMsQ0FBQzJFLElBQUksQ0FBQztRQUNMQyxNQUFNLEVBQUUsTUFBTTtRQUNkQyxHQUFHLEVBQUUsa0JBQWtCO1FBQ3ZCSCxJQUFJLEVBQUVBO01BQ1IsQ0FBQyxDQUFDLENBQUNJLElBQUksQ0FBQyxVQUFVSixJQUFJLEVBQUc7UUFDdkIsSUFBSTFFLENBQUMsQ0FBQzBFLElBQUksQ0FBQ3dDLElBQUksQ0FBQyxDQUFDM00sTUFBTSxHQUFHLENBQUMsRUFBRTtVQUMzQnlGLENBQUMsQ0FBQ3dFLElBQUksQ0FBQ2pHLE9BQU8sQ0FBQzhDLFVBQVUsQ0FBQyxDQUFDUixJQUFJLENBQUNGLFVBQVUsQ0FBQytELElBQUksQ0FBQ3dDLElBQUksQ0FBQyxDQUFDM0YsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1VBQ2pFaUQsSUFBSSxDQUFDMkMscUJBQXFCLENBQUNuSCxDQUFDLENBQUN3RSxJQUFJLENBQUNqRyxPQUFPLENBQUMrRCwwQkFBMEIsQ0FBQyxDQUFDO1FBQ3hFO01BQ0YsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUFFOztJQUVIQyx3QkFBd0IsRUFBRSxVQUFTaEUsT0FBTyxFQUFFO01BQzFDO01BQ0EsSUFBSWlHLElBQUksR0FBRyxJQUFJO01BQ2ZBLElBQUksQ0FBQzJDLHFCQUFxQixDQUFDbkgsQ0FBQyxDQUFDekIsT0FBTyxDQUFDK0QsMEJBQTBCLENBQUMsQ0FBQztNQUNqRXRDLENBQUMsQ0FBQ3pCLE9BQU8sQ0FBQytELDBCQUEwQixDQUFDLENBQUM4RSxFQUFFLENBQUMsUUFBUSxFQUFFLFlBQVk7UUFDM0Q1QyxJQUFJLENBQUMyQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUM7TUFDcEMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUFFOztJQUVIaEIsb0JBQW9CLEVBQUUsWUFBVztNQUMvQixJQUFJRCxtQkFBbUIsR0FBRyxNQUFNO01BQ2hDLElBQUlsRyxDQUFDLENBQUMsbUNBQW1DLENBQUMsQ0FBQ3pGLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDckQyTCxtQkFBbUIsR0FBR2xHLENBQUMsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDaUIsR0FBRyxFQUFFO01BQ3BFO01BQ0EsT0FBT2lGLG1CQUFtQjtJQUM1QixDQUFDO0lBQUU7O0lBRUhlLG9CQUFvQixFQUFFLFVBQVNmLG1CQUFtQixFQUFFO01BQ2xELElBQUlsRyxDQUFDLENBQUMsbUNBQW1DLENBQUMsQ0FBQ3pGLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDdkR5RixDQUFDLENBQUMsSUFBSSxDQUFDekIsT0FBTyxDQUFDaUUsb0JBQW9CLENBQUMsQ0FBQzZFLE1BQU0sQ0FBQyxzREFBc0QsQ0FBQztNQUNyRztNQUNBckgsQ0FBQyxDQUFDLG1DQUFtQyxDQUFDLENBQUNpQixHQUFHLENBQUNpRixtQkFBbUIsQ0FBQztNQUMvRCxPQUFPQSxtQkFBbUI7SUFDNUIsQ0FBQztJQUFFOztJQUVIaUIscUJBQXFCLEVBQUUsVUFBU2xCLEtBQUssRUFBRTtNQUNyQyxJQUFJcUIsV0FBVztNQUNmLElBQUlaLFlBQVksR0FBRyxJQUFJLENBQUN2QixjQUFjLEVBQUU7TUFDeEMsSUFBSVgsSUFBSSxHQUFHLElBQUk7TUFDZixJQUFJeEUsQ0FBQyxDQUFDaUcsS0FBSyxDQUFDLENBQUNHLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSXBHLENBQUMsQ0FBQ2lHLEtBQUssQ0FBQyxDQUFDL0gsSUFBSSxDQUFDLFNBQVMsQ0FBQyxFQUFFO1FBQ3ZEOEIsQ0FBQyxDQUFDLHVCQUF1QixDQUFDLENBQUN1SCxRQUFRLENBQUMsYUFBYSxDQUFDO1FBQ2xERCxXQUFXLEdBQUlaLFlBQVksR0FBRy9GLFVBQVUsQ0FBQ1gsQ0FBQyxDQUFDd0UsSUFBSSxDQUFDakcsT0FBTyxDQUFDOEMsVUFBVSxDQUFDLENBQUNSLElBQUksRUFBRSxDQUFFO01BQzlFLENBQUMsTUFBTTtRQUNMeUcsV0FBVyxHQUFHWixZQUFZO01BQzVCO01BQ0FZLFdBQVcsR0FBRzNHLFVBQVUsQ0FBQzJHLFdBQVcsQ0FBQyxDQUFDL0YsT0FBTyxDQUFDLENBQUMsQ0FBQztNQUNoRHZCLENBQUMsQ0FBQ3dFLElBQUksQ0FBQ2pHLE9BQU8sQ0FBQ2lKLG9CQUFvQixDQUFDLENBQUMzRyxJQUFJLENBQUN5RyxXQUFXLENBQUM7O01BRXREO01BQ0EsSUFBSSxJQUFJLENBQUNHLGNBQWMsSUFBSUgsV0FBVyxFQUFFO1FBQ3RDLElBQUksQ0FBQ0csY0FBYyxDQUFDQyxNQUFNLENBQUM7VUFDekJDLEtBQUssRUFBRTtZQUNMQyxLQUFLLEVBQUUsVUFBVTtZQUNqQm5ILE1BQU0sRUFBRTZHLFdBQVcsR0FBRztVQUN4QjtRQUNGLENBQUMsQ0FBQztNQUNKO0lBRUYsQ0FBQztJQUFFOztJQUVIN0UsaUJBQWlCLEVBQUUsVUFBU3BELE9BQU8sRUFBRWQsT0FBTyxFQUFFO01BQzVDLElBQUlpRyxJQUFJLEdBQUcsSUFBSTtNQUNmQSxJQUFJLENBQUNxRCxlQUFlLENBQUM3SCxDQUFDLENBQUN6QixPQUFPLENBQUN1SixrQkFBa0IsRUFBRXpJLE9BQU8sQ0FBQyxDQUFDO01BQzVEVyxDQUFDLENBQUN6QixPQUFPLENBQUN1SixrQkFBa0IsRUFBRXpJLE9BQU8sQ0FBQyxDQUFDMkcsTUFBTSxDQUFDLFlBQVc7UUFDdkR4QixJQUFJLENBQUNxRCxlQUFlLENBQUM3SCxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7TUFDL0IsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUFFOztJQUVINkgsZUFBZSxFQUFFLFVBQVN4SSxPQUFPLEVBQUU7TUFDakMsSUFBSUEsT0FBTyxDQUFDK0csRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQzFCcEcsQ0FBQyxDQUFDLElBQUksQ0FBQ3pCLE9BQU8sQ0FBQ3dKLGFBQWEsR0FBRyxZQUFZLEVBQUUsSUFBSSxDQUFDMUksT0FBTyxDQUFDLENBQUMySSxJQUFJLEVBQUU7TUFDbkUsQ0FBQyxNQUFNO1FBQ0xoSSxDQUFDLENBQUMsSUFBSSxDQUFDekIsT0FBTyxDQUFDd0osYUFBYSxHQUFHLFlBQVksRUFBRSxJQUFJLENBQUMxSSxPQUFPLENBQUMsQ0FBQzRJLElBQUksRUFBRTtNQUNuRTtJQUNGLENBQUM7SUFBRTs7SUFFSEMsYUFBYSxFQUFFLFVBQVM3SSxPQUFPLEVBQUVkLE9BQU8sRUFBRTtNQUN4QyxJQUFJeUIsQ0FBQyxDQUFDekIsT0FBTyxDQUFDNEosdUJBQXVCLEdBQUcsVUFBVSxDQUFDLENBQUNsSCxHQUFHLEVBQUUsRUFBRTtRQUN6RGpCLENBQUMsQ0FBQ3pCLE9BQU8sQ0FBQzZKLHdCQUF3QixFQUFFL0ksT0FBTyxDQUFDLENBQUM0SSxJQUFJLEVBQUU7UUFDbkRqSSxDQUFDLENBQUN6QixPQUFPLENBQUM4SixtQkFBbUIsQ0FBQyxDQUFDeEgsSUFBSSxDQUFDYixDQUFDLENBQUN6QixPQUFPLENBQUM0Six1QkFBdUIsR0FBRyxVQUFVLENBQUMsQ0FBQ2xILEdBQUcsRUFBRSxDQUFDO01BQzVGLENBQUMsTUFBTTtRQUNMakIsQ0FBQyxDQUFDekIsT0FBTyxDQUFDNkosd0JBQXdCLEVBQUUvSSxPQUFPLENBQUMsQ0FBQzJJLElBQUksRUFBRTtRQUNuRGhJLENBQUMsQ0FBQ3pCLE9BQU8sQ0FBQytKLG1CQUFtQixHQUFHLFFBQVEsRUFBRWpKLE9BQU8sQ0FBQyxDQUFDNEIsR0FBRyxDQUFDLEVBQUUsQ0FBQztNQUM1RDtJQUNGLENBQUM7SUFBRTs7SUFFSHlCLG1CQUFtQixFQUFFLFVBQVNyRCxPQUFPLEVBQUVkLE9BQU8sRUFBRTtNQUM5QyxJQUFJaUcsSUFBSSxHQUFHLElBQUk7TUFDZkEsSUFBSSxDQUFDMEQsYUFBYSxDQUFDMUQsSUFBSSxDQUFDbkYsT0FBTyxFQUFFbUYsSUFBSSxDQUFDakcsT0FBTyxDQUFDO01BQzlDeUIsQ0FBQyxDQUFDekIsT0FBTyxDQUFDNEosdUJBQXVCLEVBQUU5SSxPQUFPLENBQUMsQ0FBQzJHLE1BQU0sQ0FBQyxZQUFXO1FBQzVEeEIsSUFBSSxDQUFDMEQsYUFBYSxDQUFDMUQsSUFBSSxDQUFDbkYsT0FBTyxFQUFFbUYsSUFBSSxDQUFDakcsT0FBTyxDQUFDO01BQ2hELENBQUMsQ0FBQztJQUNKLENBQUM7SUFBRTs7SUFFSG9FLG1CQUFtQixFQUFFLFVBQVN0RCxPQUFPLEVBQUVkLE9BQU8sRUFBRTtNQUM5QyxJQUFJaUcsSUFBSSxHQUFHLElBQUk7TUFDZnhFLENBQUMsQ0FBQ3pCLE9BQU8sQ0FBQ2dLLDZCQUE2QixDQUFDLENBQUNDLEtBQUssQ0FBQyxZQUFXO1FBQ3hEaEUsSUFBSSxDQUFDaUUscUJBQXFCLENBQUMsU0FBUyxFQUFFcEosT0FBTyxFQUFFZCxPQUFPLENBQUM7UUFDdkR5QixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUN2RCxNQUFNLEVBQUUsQ0FBQ3VMLElBQUksRUFBRTtRQUN2QixPQUFPLEtBQUs7TUFDZCxDQUFDLENBQUM7TUFDRmhJLENBQUMsQ0FBQ3pCLE9BQU8sQ0FBQ21LLDhCQUE4QixDQUFDLENBQUNGLEtBQUssQ0FBQyxZQUFXO1FBQ3pEeEksQ0FBQyxDQUFDekIsT0FBTyxDQUFDb0sseUJBQXlCLENBQUMsQ0FBQ1YsSUFBSSxFQUFFO1FBQzNDekQsSUFBSSxDQUFDaUUscUJBQXFCLENBQUMsVUFBVSxFQUFFcEosT0FBTyxFQUFFZCxPQUFPLENBQUM7UUFDeER5QixDQUFDLENBQUMsSUFBSSxDQUFDLENBQUN2RCxNQUFNLEVBQUUsQ0FBQ3VMLElBQUksRUFBRTtRQUN2QixPQUFPLEtBQUs7TUFDZCxDQUFDLENBQUM7SUFDSixDQUFDO0lBQUU7O0lBRUhTLHFCQUFxQixFQUFFLFVBQVNHLG1CQUFtQixFQUFFdkosT0FBTyxFQUFFZCxPQUFPLEVBQUU7TUFDckUsSUFBS3FLLG1CQUFtQixLQUFLLFNBQVMsRUFBRztRQUN2QyxJQUFJQyxVQUFVLEdBQUc3SSxDQUFDLENBQUN6QixPQUFPLENBQUN1SywwQkFBMEIsRUFBRXpKLE9BQU8sQ0FBQyxDQUFDNUMsTUFBTSxFQUFFO1FBQ3hFLElBQUlzTSxZQUFZLEdBQUcvSSxDQUFDLENBQUN6QixPQUFPLENBQUN5Syw0QkFBNEIsRUFBRTNKLE9BQU8sQ0FBQyxDQUFDNUMsTUFBTSxFQUFFO1FBQzVFdUQsQ0FBQyxDQUFDekIsT0FBTyxDQUFDMEssd0JBQXdCLENBQUMsQ0FBQ2hCLElBQUksRUFBRTtRQUMxQ2pJLENBQUMsQ0FBQ3pCLE9BQU8sQ0FBQ3VLLDBCQUEwQixFQUFFekosT0FBTyxDQUFDLENBQUN2RCxJQUFJLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQztRQUNuRWtFLENBQUMsQ0FBQ3pCLE9BQU8sQ0FBQ3VLLDBCQUEwQixFQUFFekosT0FBTyxDQUFDLENBQUNuQixJQUFJLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQztRQUN0RThCLENBQUMsQ0FBQ3pCLE9BQU8sQ0FBQ3lLLDRCQUE0QixFQUFFM0osT0FBTyxDQUFDLENBQUNuQixJQUFJLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQztRQUN4RThCLENBQUMsQ0FBQyxPQUFPLEVBQUU2SSxVQUFVLENBQUMsQ0FBQ2hJLElBQUksQ0FBQyxjQUFjLENBQUM7UUFDM0NiLENBQUMsQ0FBQyxPQUFPLEVBQUUrSSxZQUFZLENBQUMsQ0FBQ2xJLElBQUksQ0FBQyxTQUFTLENBQUM7TUFDMUMsQ0FBQyxNQUFNLElBQUsrSCxtQkFBbUIsS0FBSyxVQUFVLEVBQUc7UUFDL0MsSUFBSUMsVUFBVSxHQUFHN0ksQ0FBQyxDQUFDekIsT0FBTyxDQUFDMkssMkJBQTJCLEVBQUU3SixPQUFPLENBQUMsQ0FBQzVDLE1BQU0sRUFBRTtRQUN6RSxJQUFJc00sWUFBWSxHQUFHL0ksQ0FBQyxDQUFDekIsT0FBTyxDQUFDNEssNkJBQTZCLEVBQUU5SixPQUFPLENBQUMsQ0FBQzVDLE1BQU0sRUFBRTtRQUM3RXVELENBQUMsQ0FBQ3pCLE9BQU8sQ0FBQ29LLHlCQUF5QixDQUFDLENBQUNWLElBQUksRUFBRTtRQUMzQ2pJLENBQUMsQ0FBQ3pCLE9BQU8sQ0FBQzJLLDJCQUEyQixFQUFFN0osT0FBTyxDQUFDLENBQUN2RCxJQUFJLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQztRQUNwRWtFLENBQUMsQ0FBQ3pCLE9BQU8sQ0FBQzJLLDJCQUEyQixFQUFFN0osT0FBTyxDQUFDLENBQUNuQixJQUFJLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQztRQUN2RThCLENBQUMsQ0FBQ3pCLE9BQU8sQ0FBQzRLLDZCQUE2QixFQUFFOUosT0FBTyxDQUFDLENBQUNuQixJQUFJLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQztRQUN6RThCLENBQUMsQ0FBQyxPQUFPLEVBQUU2SSxVQUFVLENBQUMsQ0FBQ2hJLElBQUksQ0FBQyx1QkFBdUIsQ0FBQztRQUNwRGIsQ0FBQyxDQUFDLE9BQU8sRUFBRStJLFlBQVksQ0FBQyxDQUFDbEksSUFBSSxDQUFDLGtCQUFrQixDQUFDO01BQ25EO0lBQ0YsQ0FBQztJQUFFOztJQUVIdUksb0JBQW9CLEVBQUUsVUFBU1IsbUJBQW1CLEVBQUV2SixPQUFPLEVBQUVkLE9BQU8sRUFBRTtNQUNwRSxJQUFLcUssbUJBQW1CLEtBQUssU0FBUyxFQUFHO1FBQ3ZDLElBQUlDLFVBQVUsR0FBRzdJLENBQUMsQ0FBQ3pCLE9BQU8sQ0FBQ3VLLDBCQUEwQixFQUFFekosT0FBTyxDQUFDLENBQUM1QyxNQUFNLEVBQUU7UUFDeEUsSUFBSXNNLFlBQVksR0FBRy9JLENBQUMsQ0FBQ3pCLE9BQU8sQ0FBQ3lLLDRCQUE0QixFQUFFM0osT0FBTyxDQUFDLENBQUM1QyxNQUFNLEVBQUU7UUFDNUV1RCxDQUFDLENBQUN6QixPQUFPLENBQUMwSyx3QkFBd0IsQ0FBQyxDQUFDaEIsSUFBSSxFQUFFO1FBQzFDakksQ0FBQyxDQUFDekIsT0FBTyxDQUFDdUssMEJBQTBCLEVBQUV6SixPQUFPLENBQUMsQ0FBQ3ZELElBQUksQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO1FBQ2xFa0UsQ0FBQyxDQUFDekIsT0FBTyxDQUFDdUssMEJBQTBCLEVBQUV6SixPQUFPLENBQUMsQ0FBQ25CLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDO1FBQ3JFOEIsQ0FBQyxDQUFDekIsT0FBTyxDQUFDeUssNEJBQTRCLEVBQUUzSixPQUFPLENBQUMsQ0FBQ25CLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDO1FBQ3ZFOEIsQ0FBQyxDQUFDLE9BQU8sRUFBRTZJLFVBQVUsQ0FBQyxDQUFDUSxJQUFJLENBQUMsdUZBQXVGLENBQUM7UUFDcEhySixDQUFDLENBQUMsT0FBTyxFQUFFK0ksWUFBWSxDQUFDLENBQUNNLElBQUksQ0FBQyxvRkFBb0YsQ0FBQztNQUNySCxDQUFDLE1BQU0sSUFBS1QsbUJBQW1CLEtBQUssVUFBVSxFQUFHO1FBQy9DLElBQUlDLFVBQVUsR0FBRzdJLENBQUMsQ0FBQ3pCLE9BQU8sQ0FBQzJLLDJCQUEyQixFQUFFN0osT0FBTyxDQUFDLENBQUM1QyxNQUFNLEVBQUU7UUFDekUsSUFBSXNNLFlBQVksR0FBRy9JLENBQUMsQ0FBQ3pCLE9BQU8sQ0FBQzRLLDZCQUE2QixFQUFFOUosT0FBTyxDQUFDLENBQUM1QyxNQUFNLEVBQUU7UUFDN0V1RCxDQUFDLENBQUN6QixPQUFPLENBQUNvSyx5QkFBeUIsQ0FBQyxDQUFDVixJQUFJLEVBQUU7UUFDM0NqSSxDQUFDLENBQUN6QixPQUFPLENBQUMySywyQkFBMkIsRUFBRTdKLE9BQU8sQ0FBQyxDQUFDdkQsSUFBSSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7UUFDbkVrRSxDQUFDLENBQUN6QixPQUFPLENBQUMySywyQkFBMkIsRUFBRTdKLE9BQU8sQ0FBQyxDQUFDbkIsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUM7UUFDdEU4QixDQUFDLENBQUN6QixPQUFPLENBQUM0Syw2QkFBNkIsRUFBRTlKLE9BQU8sQ0FBQyxDQUFDbkIsSUFBSSxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUM7UUFDeEU4QixDQUFDLENBQUMsT0FBTyxFQUFFNkksVUFBVSxDQUFDLENBQUNRLElBQUksQ0FBQyxnR0FBZ0csQ0FBQztRQUM3SHJKLENBQUMsQ0FBQyxPQUFPLEVBQUUrSSxZQUFZLENBQUMsQ0FBQ00sSUFBSSxDQUFDLDZGQUE2RixDQUFDO01BQzlIO0lBQ0YsQ0FBQztJQUFFOztJQUVIekcsZUFBZSxFQUFFLFVBQVN2RCxPQUFPLEVBQUVkLE9BQU8sRUFBRTtNQUMxQyxJQUFJaUcsSUFBSSxHQUFHLElBQUk7TUFDZixJQUFJOEUsYUFBYSxHQUFHLEtBQUs7TUFDekIsSUFBSXRKLENBQUMsQ0FBQ3pCLE9BQU8sQ0FBQ2dMLHlCQUF5QixDQUFDLENBQUNoUCxNQUFNLEdBQUcsQ0FBQyxFQUFFO1FBQUU7UUFDckQrTyxhQUFhLEdBQUcsSUFBSTtNQUN0QjtNQUNBLElBQUlBLGFBQWEsS0FBSyxJQUFJLEVBQUc7UUFDM0J0SixDQUFDLENBQUN6QixPQUFPLENBQUNnTCx5QkFBeUIsRUFBRWxLLE9BQU8sQ0FBQyxDQUFDNUMsTUFBTSxFQUFFLENBQUN3TCxJQUFJLEVBQUU7UUFDN0QsSUFBSWpJLENBQUMsQ0FBQ3pCLE9BQU8sQ0FBQ2dMLHlCQUF5QixFQUFFbEssT0FBTyxDQUFDLENBQUMrRyxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUU7VUFBRTtVQUNsRXBHLENBQUMsQ0FBQ3pCLE9BQU8sQ0FBQ2lMLGlCQUFpQixDQUFDLENBQUN4QixJQUFJLEVBQUU7UUFDckMsQ0FBQyxNQUFNO1VBQUU7VUFDUGhJLENBQUMsQ0FBQ3pCLE9BQU8sQ0FBQ2lMLGlCQUFpQixDQUFDLENBQUN2QixJQUFJLEVBQUU7UUFDckM7UUFDQWpJLENBQUMsQ0FBQ3pCLE9BQU8sQ0FBQ2dMLHlCQUF5QixFQUFFbEssT0FBTyxDQUFDLENBQUMyRyxNQUFNLENBQUMsWUFBVztVQUM5RHhCLElBQUksQ0FBQzVCLGVBQWUsQ0FBQ3ZELE9BQU8sRUFBRWQsT0FBTyxDQUFDO1FBQ3hDLENBQUMsQ0FBQztNQUNKO0lBRUYsQ0FBQztJQUFFOztJQUVIc0Usb0JBQW9CLEVBQUUsVUFBU3hELE9BQU8sRUFBRWQsT0FBTyxFQUFFO01BQy9DLElBQUlpRyxJQUFJLEdBQUcsSUFBSTtNQUNmLElBQUlpRixjQUFjLEdBQUcsS0FBSzs7TUFFMUI7TUFDQWpGLElBQUksQ0FBQ2tGLFlBQVksRUFBRTs7TUFFbkI7TUFDQWxGLElBQUksQ0FBQ21GLG9CQUFvQixFQUFFO01BRTNCbkYsSUFBSSxDQUFDb0YsU0FBUyxDQUFDNUosQ0FBQyxDQUFDekIsT0FBTyxDQUFDc0wsb0JBQW9CLEVBQUV4SyxPQUFPLENBQUMsQ0FBQztNQUN4RFcsQ0FBQyxDQUFDekIsT0FBTyxDQUFDc0wsb0JBQW9CLEVBQUV4SyxPQUFPLENBQUMsQ0FBQzJHLE1BQU0sQ0FBQyxZQUFXO1FBQ3pEeEIsSUFBSSxDQUFDb0YsU0FBUyxDQUFDNUosQ0FBQyxDQUFDekIsT0FBTyxDQUFDc0wsb0JBQW9CLEVBQUV4SyxPQUFPLENBQUMsQ0FBQztNQUMxRCxDQUFDLENBQUM7TUFFRm1GLElBQUksQ0FBQ3NGLG1CQUFtQixDQUFDOUosQ0FBQyxDQUFDekIsT0FBTyxDQUFDd0wsa0JBQWtCLEVBQUUxSyxPQUFPLENBQUMsQ0FBQztNQUNoRVcsQ0FBQyxDQUFDekIsT0FBTyxDQUFDd0wsa0JBQWtCLEVBQUUxSyxPQUFPLENBQUMsQ0FBQzJHLE1BQU0sQ0FBQyxZQUFXO1FBQ3ZEeEIsSUFBSSxDQUFDc0YsbUJBQW1CLENBQUM5SixDQUFDLENBQUN6QixPQUFPLENBQUN3TCxrQkFBa0IsRUFBRTFLLE9BQU8sQ0FBQyxDQUFDO01BQ2xFLENBQUMsQ0FBQztNQUVGLFNBQVMySyxVQUFVLEdBQUk7UUFDckIsSUFBSUMsS0FBSyxHQUFHakssQ0FBQyxDQUFDekIsT0FBTyxDQUFDc0wsb0JBQW9CLEVBQUV4SyxPQUFPLENBQUMsQ0FBQzRCLEdBQUcsRUFBRTtRQUMxRHdJLGNBQWMsR0FBR2pGLElBQUksQ0FBQzBGLG9CQUFvQixDQUFDN0ssT0FBTyxFQUFFZCxPQUFPLEVBQUUwTCxLQUFLLENBQUM7TUFDckU7O01BRUE7TUFDQSxJQUFJRSxXQUFXLENBQUMsQ0FBZ0I7TUFDaEMsSUFBSUMsa0JBQWtCLEdBQUcsSUFBSSxDQUFDLENBQUU7O01BRWhDO01BQ0FwSyxDQUFDLENBQUN6QixPQUFPLENBQUNzTCxvQkFBb0IsRUFBRXhLLE9BQU8sQ0FBQyxDQUFDZ0wsS0FBSyxDQUFDLFlBQVU7UUFDdkRyTixZQUFZLENBQUNtTixXQUFXLENBQUM7UUFDekIsSUFBSW5LLENBQUMsQ0FBQ3pCLE9BQU8sQ0FBQ3NMLG9CQUFvQixFQUFFeEssT0FBTyxDQUFDLENBQUM0QixHQUFHLEVBQUU7VUFDaERrSixXQUFXLEdBQUdsTixVQUFVLENBQUMrTSxVQUFVLEVBQUVJLGtCQUFrQixDQUFDO1FBQzFEO01BQ0YsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUFFOztJQUVIUixTQUFTLEVBQUUsVUFBU1UsV0FBVyxFQUFFO01BQy9CLElBQUlDLGtCQUFrQixHQUFHRCxXQUFXLENBQUM3TixNQUFNLEVBQUU7TUFDN0MsSUFBSXVELENBQUMsQ0FBQyxlQUFlLEVBQUV1SyxrQkFBa0IsQ0FBQyxDQUFDaFEsTUFBTSxLQUFLLENBQUMsRUFBRztRQUN4RGdRLGtCQUFrQixDQUFDbEQsTUFBTSxDQUFDLGtIQUFrSCxDQUFDO01BQy9JO01BQ0FySCxDQUFDLENBQUMsZUFBZSxFQUFFdUssa0JBQWtCLENBQUMsQ0FBQ3ZDLElBQUksRUFBRTtNQUM3Q3VDLGtCQUFrQixDQUFDQyxXQUFXLENBQUMsaUJBQWlCLENBQUM7SUFDbkQsQ0FBQztJQUFFOztJQUVIVixtQkFBbUIsRUFBRSxVQUFTVyx1QkFBdUIsRUFBRTtNQUNyRCxJQUFJQSx1QkFBdUIsQ0FBQ3JFLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUMxQ3FFLHVCQUF1QixDQUFDaE8sTUFBTSxFQUFFLENBQUNpTyxNQUFNLENBQUMsMElBQTBJLENBQUM7UUFDbkwxSyxDQUFDLENBQUMsbUJBQW1CLENBQUMsQ0FBQ2dJLElBQUksRUFBRTtRQUM3QmhJLENBQUMsQ0FBQyxJQUFJLENBQUN6QixPQUFPLENBQUNvTSxpQkFBaUIsRUFBRSxJQUFJLENBQUN0TCxPQUFPLENBQUMsQ0FBQzRJLElBQUksRUFBRTtRQUN0RCxJQUFJLENBQUMxSixPQUFPLENBQUNrRCxjQUFjLEdBQUcsSUFBSTtNQUNwQyxDQUFDLE1BQU07UUFDTHpCLENBQUMsQ0FBQyxJQUFJLENBQUN6QixPQUFPLENBQUNvTSxpQkFBaUIsRUFBRSxJQUFJLENBQUN0TCxPQUFPLENBQUMsQ0FBQzJJLElBQUksRUFBRTtNQUN4RDtJQUNGLENBQUM7SUFBRTs7SUFFSDBCLFlBQVksRUFBRSxZQUFXO01BQ3ZCO01BQ0EsSUFBSWtCLE9BQU8sR0FBRzVLLENBQUMsQ0FBQyxhQUFhLENBQUM7TUFDOUIsSUFBSTZLLFVBQVUsR0FBRzdLLENBQUMsQ0FBQyxJQUFJLENBQUN6QixPQUFPLENBQUNvTSxpQkFBaUIsRUFBRSxJQUFJLENBQUN0TCxPQUFPLENBQUM7TUFDaEUsSUFBSXlMLE1BQU0sR0FBRzlLLENBQUMsQ0FBQyx3QkFBd0IsRUFBRTZLLFVBQVUsQ0FBQztNQUNwRDdLLENBQUMsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDZ0ksSUFBSSxFQUFFO01BQzdCLElBQUkrQyxTQUFTLEdBQUcsd0tBQXdLO01BQ3hMO01BQ0FGLFVBQVUsQ0FBQ3hELE1BQU0sQ0FBRTBELFNBQVMsQ0FBRTtNQUM5QjtNQUNBLElBQUlDLE9BQU8sR0FBR2hMLENBQUMsQ0FBQyx5QkFBeUIsQ0FBQztNQUMxQztNQUNBZ0wsT0FBTyxDQUFDNUQsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFTNU4sQ0FBQyxFQUFFO1FBQzlCLElBQUl5UixRQUFRLEdBQUdqTCxDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ3RCLElBQUlpTCxRQUFRLENBQUM3RSxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUU7VUFDM0IwRSxNQUFNLENBQUNoUCxJQUFJLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQztRQUM3QixDQUFDLE1BQU07VUFDTGdQLE1BQU0sQ0FBQ2hQLElBQUksQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDO1FBQ2pDO01BQ0YsQ0FBQyxDQUFDO01BQ0Y7TUFDQThPLE9BQU8sQ0FBQ3hELEVBQUUsQ0FBRSxPQUFPLEVBQUUsVUFBUzVOLENBQUMsRUFBRTtRQUMvQnNSLE1BQU0sQ0FBQ2hQLElBQUksQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDO01BQ2pDLENBQUMsQ0FBQztJQUNKLENBQUM7SUFFRDZOLG9CQUFvQixFQUFFLFlBQVc7TUFDL0I7TUFDQSxJQUFJbkYsSUFBSSxHQUFHLElBQUk7TUFDZixJQUFJeEUsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUN6RixNQUFNLEdBQUcsQ0FBQyxFQUFHO1FBQ3pDLElBQUkyUSxPQUFPLEdBQUdsTCxDQUFDLENBQUMsdUJBQXVCLENBQUM7UUFDeENrTCxPQUFPLENBQUNDLEtBQUssQ0FBRW5MLENBQUMsQ0FBQyw0SkFBNEosQ0FBQyxDQUFDO1FBQy9LQSxDQUFDLENBQUUsTUFBTSxDQUFFLENBQUNvSCxFQUFFLENBQUUsT0FBTyxFQUFFLHNCQUFzQixFQUM3QyxZQUFXO1VBQ1Q1QyxJQUFJLENBQUM0RyxxQkFBcUIsQ0FDeEJwTCxDQUFDLENBQUMsc0JBQXNCLENBQUM7VUFBRTtVQUMzQkEsQ0FBQyxDQUFDLG9CQUFvQixDQUFDO1VBQVk7VUFDbkNBLENBQUMsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFNO1VBQUEsQ0FDbkM7UUFDSCxDQUFDLENBQ0Y7TUFDSDtJQUNGLENBQUM7O0lBQUU7O0lBRUhvTCxxQkFBcUIsRUFBRSxVQUFVQyxTQUFTLEVBQUVDLGNBQWMsRUFBRUMsYUFBYSxFQUFHO01BQzFFLElBQUlDLFFBQVEsR0FBR0gsU0FBUyxDQUFDcEssR0FBRyxFQUFFO01BQzlCO01BQ0EsSUFBSXdLLE1BQU0sR0FBR0MsTUFBTSxDQUFDRixRQUFRLENBQUM7TUFDN0IsSUFBSUcsUUFBUSxHQUFHRixNQUFNLENBQUNHLEtBQUs7TUFFM0JMLGFBQWEsQ0FBQ2YsV0FBVyxDQUFFLHVCQUF1QixDQUFFOztNQUVwRDtNQUNBLFFBQVNtQixRQUFRO1FBQ2YsS0FBSyxDQUFDO1VBQ0pKLGFBQWEsQ0FBQ2hFLFFBQVEsQ0FBRSxLQUFLLENBQUUsQ0FBQzhCLElBQUksQ0FBRSxpQ0FBaUMsQ0FBRTtVQUN6RTtRQUNGLEtBQUssQ0FBQztVQUNKa0MsYUFBYSxDQUFDaEUsUUFBUSxDQUFFLE1BQU0sQ0FBRSxDQUFDOEIsSUFBSSxDQUFFLG1DQUFtQyxDQUFFO1VBQzVFO1FBQ0YsS0FBSyxDQUFDO1VBQ0prQyxhQUFhLENBQUNoRSxRQUFRLENBQUUsUUFBUSxDQUFFLENBQUM4QixJQUFJLENBQUUsbUNBQW1DLENBQUU7VUFDOUU7UUFDRixLQUFLLENBQUM7VUFDSmtDLGFBQWEsQ0FBQ2hFLFFBQVEsQ0FBRSxPQUFPLENBQUUsQ0FBQzhCLElBQUksQ0FBRSxzQ0FBc0MsQ0FBRTtVQUNoRjtRQUNGO1VBQ0VrQyxhQUFhLENBQUNoRSxRQUFRLENBQUUsT0FBTyxDQUFFLENBQUM4QixJQUFJLENBQUUsc0NBQXNDLENBQUU7TUFBQztNQUVyRmlDLGNBQWMsQ0FBQ3JLLEdBQUcsQ0FBQzBLLFFBQVEsQ0FBQztNQUM1QixPQUFPQSxRQUFRO0lBQ2pCLENBQUM7SUFBRTs7SUFFSHpCLG9CQUFvQixFQUFFLFVBQVM3SyxPQUFPLEVBQUVkLE9BQU8sRUFBRTBMLEtBQUssRUFBRTtNQUN0RCxJQUFJNEIsSUFBSSxHQUFHO1FBQ1Q1QixLQUFLLEVBQUVBO01BQ1QsQ0FBQztNQUNELElBQUl6RixJQUFJLEdBQUcsSUFBSTtNQUNmeEUsQ0FBQyxDQUFDMkUsSUFBSSxDQUFDO1FBQ0xDLE1BQU0sRUFBRSxLQUFLO1FBQ2JDLEdBQUcsRUFBRXRHLE9BQU8sQ0FBQ3VOLGFBQWEsR0FBRyxtREFBbUQ7UUFDaEZwSCxJQUFJLEVBQUVtSDtNQUNSLENBQUMsQ0FBQyxDQUFDL0csSUFBSSxDQUFDLFVBQVUyRyxNQUFNLEVBQUc7UUFDekIsSUFBSUEsTUFBTSxDQUFDTSxNQUFNLEtBQUssU0FBUyxJQUFJTixNQUFNLENBQUNPLE1BQU0sS0FBSyxhQUFhLEVBQUU7VUFBRTtVQUNwRSxJQUFJaE0sQ0FBQyxDQUFDekIsT0FBTyxDQUFDd0wsa0JBQWtCLEVBQUUxSyxPQUFPLENBQUMsQ0FBQytHLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUN6RHBHLENBQUMsQ0FBQ3pCLE9BQU8sQ0FBQ29NLGlCQUFpQixFQUFFdEwsT0FBTyxDQUFDLENBQUMySSxJQUFJLEVBQUU7WUFDNUNoSSxDQUFDLENBQUN6QixPQUFPLENBQUN3TCxrQkFBa0IsRUFBRTFLLE9BQU8sQ0FBQyxDQUFDNUMsTUFBTSxFQUFFLENBQUN1TCxJQUFJLEVBQUU7WUFDdERoSSxDQUFDLENBQUMsbUJBQW1CLEVBQUVYLE9BQU8sQ0FBQyxDQUFDNEksSUFBSSxFQUFFO1VBQ3hDO1VBQ0FqSSxDQUFDLENBQUN6QixPQUFPLENBQUN3TCxrQkFBa0IsRUFBRTFLLE9BQU8sQ0FBQyxDQUFDK0gsRUFBRSxDQUFDLFFBQVEsRUFBRSxZQUFXO1lBQzdELElBQUlwSCxDQUFDLENBQUN6QixPQUFPLENBQUN3TCxrQkFBa0IsRUFBRTFLLE9BQU8sQ0FBQyxDQUFDK0csRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFO2NBQ3pEcEcsQ0FBQyxDQUFDekIsT0FBTyxDQUFDb00saUJBQWlCLEVBQUV0TCxPQUFPLENBQUMsQ0FBQzJJLElBQUksRUFBRTtjQUM1Q2hJLENBQUMsQ0FBQ3pCLE9BQU8sQ0FBQ3dMLGtCQUFrQixFQUFFMUssT0FBTyxDQUFDLENBQUM1QyxNQUFNLEVBQUUsQ0FBQ3VMLElBQUksRUFBRTtjQUN0RGhJLENBQUMsQ0FBQyxtQkFBbUIsRUFBRVgsT0FBTyxDQUFDLENBQUM0SSxJQUFJLEVBQUU7WUFDeEM7VUFDRixDQUFDLENBQUM7UUFDSixDQUFDLE1BQU0sSUFBS3dELE1BQU0sQ0FBQ00sTUFBTSxLQUFLLE1BQU0sRUFBRztVQUNyQy9MLENBQUMsQ0FBQ3dFLElBQUksQ0FBQ2pHLE9BQU8sQ0FBQ3NMLG9CQUFvQixDQUFDLENBQUN0QyxRQUFRLENBQUMsaUJBQWlCLENBQUM7VUFDaEV2SCxDQUFDLENBQUUsZUFBZSxDQUFDLENBQUNpSSxJQUFJLEVBQUU7UUFDNUIsQ0FBQyxNQUFNO1VBQUU7VUFDUCxJQUFJakksQ0FBQyxDQUFDekIsT0FBTyxDQUFDd0wsa0JBQWtCLEVBQUUxSyxPQUFPLENBQUMsQ0FBQytHLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUN6RHBHLENBQUMsQ0FBQ3pCLE9BQU8sQ0FBQ29NLGlCQUFpQixFQUFFdEwsT0FBTyxDQUFDLENBQUM0SSxJQUFJLEVBQUU7WUFDNUMxSixPQUFPLENBQUNrRCxjQUFjLEdBQUcsSUFBSTtVQUMvQixDQUFDLE1BQU07WUFDTHpCLENBQUMsQ0FBQ3pCLE9BQU8sQ0FBQ29NLGlCQUFpQixFQUFFdEwsT0FBTyxDQUFDLENBQUMySSxJQUFJLEVBQUU7VUFDOUM7VUFDQWhJLENBQUMsQ0FBQyxtQkFBbUIsRUFBRVgsT0FBTyxDQUFDLENBQUMySSxJQUFJLEVBQUU7VUFDdEMsT0FBTyxLQUFLO1FBQ2Q7TUFDRixDQUFDLENBQUM7SUFDSixDQUFDO0lBQUU7O0lBRUhsRixvQkFBb0IsRUFBRSxVQUFTekQsT0FBTyxFQUFFZCxPQUFPLEVBQUU7TUFDL0MsSUFBSWlHLElBQUksR0FBRyxJQUFJO01BQ2YsSUFBSWtDLFlBQVksR0FBR2xDLElBQUksQ0FBQ1csY0FBYyxFQUFFO01BQ3hDWCxJQUFJLENBQUNpRCxjQUFjLEdBQUdqRCxJQUFJLENBQUM1QyxNQUFNLENBQUM2RixjQUFjLENBQUM7UUFDL0N3RSxPQUFPLEVBQUUsSUFBSTtRQUNiQyxRQUFRLEVBQUUsS0FBSztRQUNmdkUsS0FBSyxFQUFFO1VBQ0xDLEtBQUssRUFBRSxVQUFVO1VBQ2pCbkgsTUFBTSxFQUFFaUcsWUFBWSxHQUFHO1FBQ3pCO01BQ0YsQ0FBQyxDQUFDO01BQ0ZsQyxJQUFJLENBQUMySCxRQUFRLEdBQUczSCxJQUFJLENBQUN6QyxRQUFRLENBQUNxSyxNQUFNLENBQUMsc0JBQXNCLEVBQUU7UUFDM0QzRSxjQUFjLEVBQUVqRCxJQUFJLENBQUNpRCxjQUFjO1FBQ25DNEUsS0FBSyxFQUFFO1VBQ0x2SixvQkFBb0IsRUFBRTtZQUNwQjlFLElBQUksRUFBRSxRQUFRO1lBQ2Q7WUFDQTs7WUFFQXNPLEtBQUssRUFBRSxNQUFNO1lBQ2I7WUFDQTs7WUFFQUMsTUFBTSxFQUFFO1lBQ1I7VUFDRjtRQUNGO01BQ0YsQ0FBQyxDQUFDOztNQUVGO01BQ0EvSCxJQUFJLENBQUNpRCxjQUFjLENBQUMrRSxjQUFjLEVBQUUsQ0FBQ0MsSUFBSSxDQUFDLFVBQVNoQixNQUFNLEVBQUU7UUFDekQsSUFBSUEsTUFBTSxFQUFFO1VBQ1Z6TCxDQUFDLENBQUMsZ0NBQWdDLENBQUMsQ0FBQ2dJLElBQUksRUFBRTtVQUMxQ3hELElBQUksQ0FBQzJILFFBQVEsQ0FBQ08sS0FBSyxDQUFDLHlCQUF5QixDQUFDO1FBQ2hELENBQUMsTUFBTTtVQUNMbEksSUFBSSxDQUFDbUksa0JBQWtCLENBQUUzTSxDQUFDLENBQUMsNkJBQTZCLENBQUMsQ0FBRTtRQUM3RDtNQUNGLENBQUMsQ0FBQztNQUVGQSxDQUFDLENBQUMsc0JBQXNCLENBQUMsQ0FBQ3dJLEtBQUssQ0FBQyxVQUFTMUMsS0FBSyxFQUFFO1FBQzlDQSxLQUFLLENBQUMzRyxjQUFjLEVBQUU7UUFDdEJxRixJQUFJLENBQUNtSSxrQkFBa0IsQ0FBRTNNLENBQUMsQ0FBQyxzREFBc0QsQ0FBQyxDQUFFO01BQ3RGLENBQUMsQ0FBQztNQUVGd0UsSUFBSSxDQUFDMkgsUUFBUSxDQUFDL0UsRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFTdEIsS0FBSyxFQUFFO1FBRXhDO1FBQ0EsSUFBSThHLFdBQVcsR0FBRzVNLENBQUMsQ0FBQ3dFLElBQUksQ0FBQ2pHLE9BQU8sQ0FBQ2lFLG9CQUFvQixDQUFDOztRQUV0RDtRQUNBLElBQUksQ0FBQ29LLFdBQVcsQ0FBQ0MsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDQyxjQUFjLEVBQUUsRUFBRTtVQUN4Q2hILEtBQUssQ0FBQzNHLGNBQWMsRUFBRTtVQUN0QjtRQUNGO01BQ0YsQ0FBQyxDQUFDO01BRUZxRixJQUFJLENBQUNpRCxjQUFjLENBQUNMLEVBQUUsQ0FBQyxlQUFlLEVBQUUsVUFBU3RCLEtBQUssRUFBRTtRQUV0RDtRQUNBLElBQUk4RyxXQUFXLEdBQUc1TSxDQUFDLENBQUN3RSxJQUFJLENBQUNqRyxPQUFPLENBQUNpRSxvQkFBb0IsQ0FBQztRQUN0RCxJQUFJdUssY0FBYyxHQUFHLG1CQUFtQjtRQUN4QyxJQUFJQyxVQUFVLEdBQUcsY0FBYyxHQUFHRCxjQUFjLEdBQUcsSUFBSTs7UUFFdkQ7UUFDQSxJQUFJL00sQ0FBQyxDQUFDZ04sVUFBVSxDQUFDLENBQUN6UyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1VBQzVCeUYsQ0FBQyxDQUFDZ04sVUFBVSxDQUFDLENBQUMvTCxHQUFHLENBQUM2RSxLQUFLLENBQUNtSCxhQUFhLENBQUNDLEVBQUUsQ0FBQztRQUMzQyxDQUFDLE1BQU07VUFDTE4sV0FBVyxDQUFDdkYsTUFBTSxDQUFDckgsQ0FBQyxDQUFDLCtCQUErQixHQUFHK00sY0FBYyxHQUFHLElBQUksQ0FBQyxDQUFDOUwsR0FBRyxDQUFDNkUsS0FBSyxDQUFDbUgsYUFBYSxDQUFDQyxFQUFFLENBQUMsQ0FBQztRQUM1RztRQUVBMUksSUFBSSxDQUFDMkksYUFBYSxDQUFDM0ksSUFBSSxFQUFFLGdCQUFnQixDQUFDO01BRTVDLENBQUMsQ0FBQztJQUVKLENBQUM7SUFBRTs7SUFFSG1JLGtCQUFrQixFQUFFLFVBQVVTLFdBQVcsRUFBRztNQUMxQ0EsV0FBVyxDQUFDcEYsSUFBSSxFQUFFO01BQ2xCaEksQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUNnSSxJQUFJLEVBQUU7TUFDaENoSSxDQUFDLENBQUMsZ0NBQWdDLENBQUMsQ0FBQ2lJLElBQUksRUFBRTtNQUMxQ2pJLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDdkUsV0FBVyxDQUFDLHlEQUF5RCxDQUFDO0lBQzVGLENBQUM7SUFBRTs7SUFFSHNILG1CQUFtQixFQUFFLFVBQVMxRCxPQUFPLEVBQUVkLE9BQU8sRUFBRTtNQUU5QyxJQUFJaUcsSUFBSSxHQUFHLElBQUk7TUFFZixJQUFJeEUsQ0FBQyxDQUFDekIsT0FBTyxDQUFDOE8sY0FBYyxDQUFDLENBQUM5UyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1FBQ3hDLElBQUl5RixDQUFDLENBQUN6QixPQUFPLENBQUM4TyxjQUFjLEdBQUcsUUFBUSxDQUFDLENBQUNqSCxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUU7VUFDdkQsSUFBSWtILFVBQVUsR0FBR3ROLENBQUMsQ0FBQ3pCLE9BQU8sQ0FBQzhPLGNBQWMsR0FBRyxnQkFBZ0IsQ0FBQyxDQUFDdlIsSUFBSSxDQUFDLElBQUksQ0FBQztVQUN4RSxJQUFJeVIsYUFBYSxHQUFHdk4sQ0FBQyxDQUFDekIsT0FBTyxDQUFDOE8sY0FBYyxHQUFHLGdCQUFnQixDQUFDLENBQUNwTSxHQUFHLEVBQUU7VUFDdEV1RCxJQUFJLENBQUNnSixrQkFBa0IsQ0FBQ0YsVUFBVSxFQUFFQyxhQUFhLENBQUM7UUFDcEQ7UUFFQXZOLENBQUMsQ0FBQ3pCLE9BQU8sQ0FBQzhPLGNBQWMsR0FBRyxRQUFRLENBQUMsQ0FBQ3JILE1BQU0sQ0FBQyxZQUFZO1VBQ3RELElBQUlzSCxVQUFVLEdBQUcsSUFBSSxDQUFDSixFQUFFO1VBQ3hCLElBQUlLLGFBQWEsR0FBRyxJQUFJLENBQUNqUyxLQUFLO1VBQzlCa0osSUFBSSxDQUFDZ0osa0JBQWtCLENBQUNGLFVBQVUsRUFBRUMsYUFBYSxDQUFDO1FBQ3BELENBQUMsQ0FBQztNQUVKO0lBQ0YsQ0FBQztJQUFFOztJQUVIQyxrQkFBa0IsRUFBRSxVQUFTQyxVQUFVLEVBQUVDLGFBQWEsRUFBRTtNQUN0RCxJQUFJeEgsbUJBQW1CLEdBQUcsSUFBSSxDQUFDZSxvQkFBb0IsQ0FBQ3lHLGFBQWEsQ0FBQztNQUNsRSxJQUFLQSxhQUFhLEtBQUssY0FBYyxFQUFHO1FBQ3RDMU4sQ0FBQyxDQUFDLGlDQUFpQyxFQUFFQSxDQUFDLENBQUMsSUFBSSxDQUFDekIsT0FBTyxDQUFDaUUsb0JBQW9CLENBQUMsQ0FBQyxDQUFDN0UsTUFBTSxFQUFFO1FBQ25GLElBQUksQ0FBQ2dRLFNBQVMsQ0FBQyxJQUFJLENBQUN0TyxPQUFPLEVBQUUsSUFBSSxDQUFDZCxPQUFPLENBQUM7TUFDNUMsQ0FBQyxNQUFNO1FBQ0wsSUFBSSxDQUFDcVAsZUFBZSxDQUFDLElBQUksQ0FBQ3JQLE9BQU8sQ0FBQztNQUNwQztNQUNBeUIsQ0FBQyxDQUFDLElBQUksQ0FBQ3pCLE9BQU8sQ0FBQ3NQLHVCQUF1QixDQUFDLENBQUNyRCxXQUFXLENBQUMsUUFBUSxDQUFDO01BQzdEeEssQ0FBQyxDQUFDLElBQUksQ0FBQ3pCLE9BQU8sQ0FBQ3NQLHVCQUF1QixHQUFHLEdBQUcsR0FBR0osVUFBVSxDQUFDLENBQUNsRyxRQUFRLENBQUMsUUFBUSxDQUFDO01BQzdFdkgsQ0FBQyxDQUFDLElBQUksQ0FBQ3pCLE9BQU8sQ0FBQ3NQLHVCQUF1QixHQUFHLHFCQUFxQixDQUFDLENBQUM1TSxHQUFHLENBQUMsRUFBRSxDQUFDO01BQ3ZFLElBQUksQ0FBQ29GLGFBQWEsQ0FBQyxJQUFJLENBQUM5SCxPQUFPLENBQUN1QyxlQUFlLEVBQUVvRixtQkFBbUIsQ0FBQztJQUN2RSxDQUFDO0lBQUU7O0lBRUgwSCxlQUFlLEVBQUUsVUFBU3JQLE9BQU8sRUFBRTtNQUNqQ3lCLENBQUMsQ0FBQyw0QkFBNEIsRUFBRUEsQ0FBQyxDQUFDekIsT0FBTyxDQUFDaUUsb0JBQW9CLENBQUMsQ0FBQyxDQUFDN0UsTUFBTSxFQUFFO01BQ3pFcUMsQ0FBQyxDQUFDLDBCQUEwQixFQUFFQSxDQUFDLENBQUN6QixPQUFPLENBQUNpRSxvQkFBb0IsQ0FBQyxDQUFDLENBQUM3RSxNQUFNLEVBQUU7TUFDdkVxQyxDQUFDLENBQUMseUJBQXlCLEVBQUVBLENBQUMsQ0FBQ3pCLE9BQU8sQ0FBQ2lFLG9CQUFvQixDQUFDLENBQUMsQ0FBQzdFLE1BQU0sRUFBRTtNQUN0RXFDLENBQUMsQ0FBQ3pCLE9BQU8sQ0FBQ3VQLFVBQVUsQ0FBQyxDQUFDekUsSUFBSSxDQUFDLDhDQUE4QyxDQUFDO01BQzFFLElBQUksQ0FBQzBFLGNBQWMsQ0FBQ3hQLE9BQU8sRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO01BQ25ELElBQUksT0FBTyxJQUFJLENBQUN5UCxXQUFXLEtBQUssV0FBVyxFQUFFO1FBQzNDLElBQUksQ0FBQ0EsV0FBVyxDQUFDQyxPQUFPLEVBQUU7TUFDNUI7SUFDRixDQUFDO0lBQUU7O0lBRUhqTCxnQkFBZ0IsRUFBRSxVQUFTM0QsT0FBTyxFQUFFZCxPQUFPLEVBQUU7TUFFM0MsSUFBSWlHLElBQUksR0FBRyxJQUFJO01BRWYsSUFBSTZILEtBQUssR0FBRztRQUNWNkIsSUFBSSxFQUFFO1VBQ0pDLFNBQVMsRUFBRSxTQUFTO1VBQ3BCQyxVQUFVLEVBQUUsTUFBTTtVQUNsQkMsVUFBVSxFQUFFLEdBQUc7VUFDZkMsVUFBVSxFQUFFLGlCQUFpQjtVQUM3QkMsUUFBUSxFQUFFO1VBQ1Y7VUFDQTtRQUNGLENBQUM7O1FBQ0RDLE9BQU8sRUFBRTtVQUNQQyxLQUFLLEVBQUU7UUFDVDtNQUNGLENBQUM7O01BRUQ7TUFDQTtNQUNBLElBQUt6TyxDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQ3pGLE1BQU0sS0FBSyxDQUFDLElBQUl5RixDQUFDLENBQUMsNkJBQTZCLENBQUMsQ0FBQ3pGLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDMUY7TUFDRjtNQUNBaUssSUFBSSxDQUFDa0ssaUJBQWlCLEdBQUdsSyxJQUFJLENBQUN6QyxRQUFRLENBQUNxSyxNQUFNLENBQUMsWUFBWSxFQUFFO1FBQzFEdUMsUUFBUSxFQUFFLElBQUk7UUFDZHRDLEtBQUssRUFBRUE7TUFDVCxDQUFDLENBQUM7TUFDRjdILElBQUksQ0FBQ2tLLGlCQUFpQixDQUFDaEMsS0FBSyxDQUFDbk8sT0FBTyxDQUFDcVEsZUFBZSxDQUFDO01BRXJEcEssSUFBSSxDQUFDcUssaUJBQWlCLEdBQUdySyxJQUFJLENBQUN6QyxRQUFRLENBQUNxSyxNQUFNLENBQUMsWUFBWSxFQUFFO1FBQzFEQyxLQUFLLEVBQUVBO01BQ1QsQ0FBQyxDQUFDO01BQ0Y3SCxJQUFJLENBQUNxSyxpQkFBaUIsQ0FBQ25DLEtBQUssQ0FBQ25PLE9BQU8sQ0FBQ3VRLGVBQWUsQ0FBQztNQUVyRHRLLElBQUksQ0FBQ3VLLGNBQWMsR0FBR3ZLLElBQUksQ0FBQ3pDLFFBQVEsQ0FBQ3FLLE1BQU0sQ0FBQyxTQUFTLEVBQUU7UUFDcERDLEtBQUssRUFBRUE7TUFDVCxDQUFDLENBQUM7TUFDRjdILElBQUksQ0FBQ3VLLGNBQWMsQ0FBQ3JDLEtBQUssQ0FBQ25PLE9BQU8sQ0FBQ3lRLGVBQWUsQ0FBQzs7TUFFbEQ7TUFDQXhLLElBQUksQ0FBQ2tLLGlCQUFpQixDQUFDdEgsRUFBRSxDQUFDLFFBQVEsRUFBRSxVQUFTdEIsS0FBSyxFQUFFO1FBQ2xELElBQUlJLG1CQUFtQixHQUFHLE1BQU07UUFDaEM7UUFDQSxJQUFJSixLQUFLLENBQUNtSixLQUFLLEVBQUU7VUFDZixJQUFLbkosS0FBSyxDQUFDbUosS0FBSyxLQUFLLE1BQU0sRUFBRztZQUM1Qi9JLG1CQUFtQixHQUFHLE1BQU07VUFDOUI7UUFDRjtRQUNBO1FBQ0ExQixJQUFJLENBQUMwSyxrQkFBa0IsQ0FBQ3BKLEtBQUssQ0FBQ3FKLEtBQUssRUFBRW5QLENBQUMsQ0FBQ3pCLE9BQU8sQ0FBQ3FRLGVBQWUsRUFBRXZQLE9BQU8sQ0FBQyxFQUFFQSxPQUFPLEVBQUVkLE9BQU8sQ0FBRTtRQUM1RjtRQUNBaUcsSUFBSSxDQUFDNEssWUFBWSxDQUFDN1EsT0FBTyxFQUFFeUIsQ0FBQyxDQUFDd0UsSUFBSSxDQUFDakcsT0FBTyxDQUFDaUUsb0JBQW9CLENBQUMsQ0FBQzZNLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxLQUFLLENBQUM7UUFDdEY3SyxJQUFJLENBQUM2QixhQUFhLENBQUM3QixJQUFJLENBQUNqRyxPQUFPLENBQUN1QyxlQUFlLEVBQUVvRixtQkFBbUIsQ0FBQztNQUN2RSxDQUFDLENBQUM7TUFFRjFCLElBQUksQ0FBQ3FLLGlCQUFpQixDQUFDekgsRUFBRSxDQUFDLFFBQVEsRUFBRSxVQUFTdEIsS0FBSyxFQUFFO1FBQ2xEO1FBQ0F0QixJQUFJLENBQUMwSyxrQkFBa0IsQ0FBQ3BKLEtBQUssQ0FBQ3FKLEtBQUssRUFBRW5QLENBQUMsQ0FBQ3pCLE9BQU8sQ0FBQ3VRLGVBQWUsRUFBRXpQLE9BQU8sQ0FBQyxFQUFFQSxPQUFPLEVBQUVkLE9BQU8sQ0FBRTtRQUM1RjtRQUNBaUcsSUFBSSxDQUFDNEssWUFBWSxDQUFDN1EsT0FBTyxFQUFFeUIsQ0FBQyxDQUFDd0UsSUFBSSxDQUFDakcsT0FBTyxDQUFDaUUsb0JBQW9CLENBQUMsQ0FBQzZNLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxLQUFLLENBQUM7TUFDeEYsQ0FBQyxDQUFDO01BRUY3SyxJQUFJLENBQUN1SyxjQUFjLENBQUMzSCxFQUFFLENBQUMsUUFBUSxFQUFFLFVBQVN0QixLQUFLLEVBQUU7UUFDL0M7UUFDQXRCLElBQUksQ0FBQzBLLGtCQUFrQixDQUFDcEosS0FBSyxDQUFDcUosS0FBSyxFQUFFblAsQ0FBQyxDQUFDekIsT0FBTyxDQUFDeVEsZUFBZSxFQUFFM1AsT0FBTyxDQUFDLEVBQUVBLE9BQU8sRUFBRWQsT0FBTyxDQUFFO1FBQzVGO1FBQ0FpRyxJQUFJLENBQUM0SyxZQUFZLENBQUM3USxPQUFPLEVBQUV5QixDQUFDLENBQUN3RSxJQUFJLENBQUNqRyxPQUFPLENBQUNpRSxvQkFBb0IsQ0FBQyxDQUFDNk0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEtBQUssQ0FBQztNQUN4RixDQUFDLENBQUM7O01BRUY7TUFDQTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0lBRUksQ0FBQzs7SUFBRTs7SUFFSEMsV0FBVyxFQUFFLFlBQVc7TUFDdEJ0UCxDQUFDLENBQUMsSUFBSSxDQUFDekIsT0FBTyxDQUFDdVAsVUFBVSxDQUFDLENBQUM5RixJQUFJLEVBQUU7TUFDakNoSSxDQUFDLENBQUMsSUFBSSxDQUFDekIsT0FBTyxDQUFDdVAsVUFBVSxDQUFDLENBQUMzQyxLQUFLLENBQUMsNk5BQTZOLENBQUM7SUFDalEsQ0FBQztJQUVEb0UsV0FBVyxFQUFFLFlBQVc7TUFDdEJ2UCxDQUFDLENBQUMsSUFBSSxDQUFDekIsT0FBTyxDQUFDdVAsVUFBVSxDQUFDLENBQUM3RixJQUFJLEVBQUU7TUFDakNqSSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUNnSSxJQUFJLEVBQUU7SUFDeEIsQ0FBQztJQUVEMkYsU0FBUyxFQUFFLFVBQVN0TyxPQUFPLEVBQUVkLE9BQU8sRUFBRTtNQUNwQyxJQUFJaVIsa0JBQWtCLEdBQUcsV0FBVztNQUNwQyxJQUFJQyxjQUFjLEdBQUcsY0FBYyxHQUFHRCxrQkFBa0IsR0FBRyxJQUFJO01BQy9ELElBQUloTCxJQUFJLEdBQUcsSUFBSTtNQUNmO01BQ0FBLElBQUksQ0FBQ3VKLGNBQWMsQ0FBQ3hQLE9BQU8sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLDRDQUE0QyxDQUFDO01BRXBGLElBQUksT0FBT21SLEtBQUssS0FBSyxXQUFXLEVBQUU7UUFDaENsTCxJQUFJLENBQUN3SixXQUFXLEdBQUcwQixLQUFLLENBQUN0RCxNQUFNLENBQUM7VUFDOUJ1RCxVQUFVLEVBQUUsVUFBVTtVQUN0QkMsR0FBRyxFQUFFclIsT0FBTyxDQUFDc1IsU0FBUztVQUN0QjNLLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQztVQUNqQjtVQUNBNEssS0FBSyxFQUFFaFIsUUFBUSxDQUFDaVIsY0FBYyxDQUFDLGtCQUFrQixDQUFDLENBQUN6VSxLQUFLO1VBQ3hEMFUsU0FBUyxFQUFFLFVBQVNDLFlBQVksRUFBRUMsUUFBUSxFQUFFO1lBQzFDMUwsSUFBSSxDQUFDOEssV0FBVyxFQUFFO1lBQ2xCdFAsQ0FBQyxDQUFDMkUsSUFBSSxDQUFDO2NBQ0xFLEdBQUcsRUFBQywwQkFBMEI7Y0FDOUJILElBQUksRUFBRXlMLElBQUksQ0FBQ0MsU0FBUyxDQUFDO2dCQUFFSCxZQUFZLEVBQUVBLFlBQVk7Z0JBQUVJLFVBQVUsRUFBRUgsUUFBUSxDQUFDRztjQUFXLENBQUMsQ0FBQztjQUNyRnJTLElBQUksRUFBRSxNQUFNO2NBQ1pzUyxXQUFXLEVBQUU7WUFDZixDQUFDLENBQUMsQ0FDRHhMLElBQUksQ0FBQyxVQUFTeUwsUUFBUSxFQUFFO2NBQ3ZCLElBQUksT0FBT0EsUUFBUSxDQUFDcEIsS0FBSyxLQUFLLFdBQVcsRUFBRTtnQkFDekM7Z0JBQ0EzSyxJQUFJLENBQUMrSyxXQUFXLEVBQUU7Z0JBQ2xCdlAsQ0FBQyxDQUFDekIsT0FBTyxDQUFDdVAsVUFBVSxDQUFDLENBQUNwRCxNQUFNLENBQUMsd0NBQXdDLEdBQUc2RixRQUFRLENBQUNwQixLQUFLLEdBQUcsTUFBTSxDQUFDO2NBQ2xHLENBQUMsTUFBTTtnQkFDTDtnQkFDQTtnQkFDQTtnQkFDQSxJQUFJblAsQ0FBQyxDQUFDeVAsY0FBYyxDQUFDLENBQUNsVixNQUFNLEdBQUcsQ0FBQyxFQUFFO2tCQUNoQ3lGLENBQUMsQ0FBQ3lQLGNBQWMsQ0FBQyxDQUFDeE8sR0FBRyxDQUFDc1AsUUFBUSxDQUFDQyx5QkFBeUIsQ0FBQztnQkFDM0QsQ0FBQyxNQUFNO2tCQUNMeFEsQ0FBQyxDQUFDekIsT0FBTyxDQUFDaUUsb0JBQW9CLENBQUMsQ0FBQ2lPLE9BQU8sQ0FBQ3pRLENBQUMsQ0FBQywrQkFBK0IsR0FBR3dQLGtCQUFrQixHQUFHLElBQUksQ0FBQyxDQUFDdk8sR0FBRyxDQUFDc1AsUUFBUSxDQUFDQyx5QkFBeUIsQ0FBQyxDQUFDO2dCQUNqSjtnQkFDQXhRLENBQUMsQ0FBQ3pCLE9BQU8sQ0FBQ3VQLFVBQVUsRUFBRXpPLE9BQU8sQ0FBQyxDQUFDZ0ssSUFBSSxDQUFDLDJEQUEyRCxDQUFDO2dCQUNoRzdFLElBQUksQ0FBQytLLFdBQVcsRUFBRTtnQkFDbEIvSyxJQUFJLENBQUN1SixjQUFjLENBQUN4UCxPQUFPLEVBQUUsS0FBSyxDQUFDO2NBQ3JDO1lBQ0YsQ0FBQyxDQUFDLENBQ0RtUyxJQUFJLENBQUMsVUFBU0gsUUFBUSxFQUFFO2NBQ3ZCL0wsSUFBSSxDQUFDdEMsS0FBSyxDQUFDcU8sUUFBUSxDQUFDO2NBQ3BCL0wsSUFBSSxDQUFDK0ssV0FBVyxFQUFFO2NBQ2xCdlAsQ0FBQyxDQUFDekIsT0FBTyxDQUFDdVAsVUFBVSxDQUFDLENBQUNwRCxNQUFNLENBQUMsd0NBQXdDLEdBQUc2RixRQUFRLENBQUNwQixLQUFLLEdBQUcsTUFBTSxDQUFDO1lBQ2xHLENBQUMsQ0FBQztVQUNKO1FBQ0YsQ0FBQyxDQUFDO1FBQ0ZuUCxDQUFDLENBQUN6QixPQUFPLENBQUN1UCxVQUFVLEdBQUcsSUFBSSxDQUFDLENBQUN0RixLQUFLLENBQUMsVUFBUzFDLEtBQUssRUFBRTtVQUNqREEsS0FBSyxDQUFDM0csY0FBYyxFQUFFO1VBQ3RCcUYsSUFBSSxDQUFDbU0sZUFBZSxDQUFDbk0sSUFBSSxDQUFDakcsT0FBTyxFQUFFaUcsSUFBSSxDQUFDbkYsT0FBTyxDQUFDO1VBQ2hEO1VBQ0FtRixJQUFJLENBQUN3SixXQUFXLENBQUM0QyxJQUFJLEVBQUU7UUFDekIsQ0FBQyxDQUFDO01BQ0o7SUFDRixDQUFDO0lBQUU7O0lBRUh4QixZQUFZLEVBQUUsVUFBUzdRLE9BQU8sRUFBRXNTLE1BQU0sRUFBRUMsUUFBUSxFQUFFO01BQ2hEO01BQ0EsSUFBSSxDQUFDL0MsY0FBYyxDQUFDeFAsT0FBTyxFQUFFdVMsUUFBUSxFQUFFRCxNQUFNLENBQUM7TUFDOUMsSUFBSUMsUUFBUSxLQUFLLEtBQUssRUFBRTtRQUN0QkQsTUFBTSxDQUFDaFEsSUFBSSxDQUFDdEMsT0FBTyxDQUFDbUQsV0FBVyxDQUFDO01BQ2xDLENBQUMsTUFBTTtRQUNMbVAsTUFBTSxDQUFDaFEsSUFBSSxDQUFDLFlBQVksQ0FBQztNQUMzQjtJQUNGLENBQUM7SUFBRTs7SUFFSGtOLGNBQWMsRUFBRSxVQUFTeFAsT0FBTyxFQUFFdVMsUUFBUSxFQUEwRDtNQUFBLElBQXhERCxNQUFNLHVFQUFHLEVBQUU7TUFBQSxJQUFFeFMsT0FBTyx1RUFBRyxFQUFFO01BQUEsSUFBRTBTLG1CQUFtQix1RUFBRyxLQUFLO01BQ2hHLElBQUlGLE1BQU0sS0FBSyxFQUFFLEVBQUU7UUFDakJBLE1BQU0sR0FBRzdRLENBQUMsQ0FBQ3pCLE9BQU8sQ0FBQ2lFLG9CQUFvQixDQUFDLENBQUM2TSxJQUFJLENBQUMsUUFBUSxDQUFDO01BQ3pEO01BQ0F3QixNQUFNLENBQUMzUyxJQUFJLENBQUMsVUFBVSxFQUFFNFMsUUFBUSxDQUFDO01BQ2pDLElBQUksT0FBT0UsS0FBSyxLQUFLLFdBQVcsRUFBRTtRQUNoQyxJQUFJM1MsT0FBTyxLQUFLLEVBQUUsRUFBRTtVQUNsQixJQUFJeVMsUUFBUSxLQUFLLElBQUksRUFBRTtZQUNyQkQsTUFBTSxDQUFDL1UsSUFBSSxDQUFDLFlBQVksRUFBRXVDLE9BQU8sQ0FBQztVQUNwQyxDQUFDLE1BQU07WUFDTHdTLE1BQU0sQ0FBQ0ksVUFBVSxDQUFFLFlBQVksQ0FBRSxDQUFDLENBQUM7VUFDckM7O1VBQ0FKLE1BQU0sQ0FBQ3pKLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxVQUFTdEIsS0FBSyxFQUFFO1lBQzVDa0wsS0FBSyxDQUFDL0ksSUFBSSxDQUFJLElBQUksRUFBSTtjQUFFaUosSUFBSSxFQUFFO1lBQUssQ0FBQyxDQUFFO1VBQ3hDLENBQUMsQ0FBQztVQUNGTCxNQUFNLENBQUN6SixFQUFFLENBQUMsWUFBWSxFQUFFLFVBQVN0QixLQUFLLEVBQUU7WUFDdENrTCxLQUFLLENBQUNoSixJQUFJLENBQUksSUFBSSxDQUFJO1VBQ3hCLENBQUMsQ0FBQztRQUNKLENBQUMsTUFBTTtVQUNMNkksTUFBTSxDQUFDSSxVQUFVLENBQUUsWUFBWSxDQUFFO1VBQ2pDLElBQUlGLG1CQUFtQixLQUFLLElBQUksRUFBRztZQUNqQ0YsTUFBTSxDQUFDekosRUFBRSxDQUFDLGtCQUFrQixFQUFFLFVBQVN0QixLQUFLLEVBQUU7Y0FDNUNrTCxLQUFLLENBQUNoSixJQUFJLENBQUksSUFBSSxDQUFJO1lBQ3hCLENBQUMsQ0FBQztZQUNGNkksTUFBTSxDQUFDckksS0FBSyxDQUFDLFVBQVMxQyxLQUFLLEVBQUU7Y0FDM0IsT0FBTyxJQUFJO1lBQ2IsQ0FBQyxDQUFDO1VBQ0o7UUFDRjtNQUNGO0lBQ0YsQ0FBQztJQUFFOztJQUVIN0MsYUFBYSxFQUFFLFVBQVM1RCxPQUFPLEVBQUVkLE9BQU8sRUFBRTtNQUN4QyxJQUFJNFMsS0FBSyxHQUFHclMsUUFBUSxDQUFDVyxnQkFBZ0IsQ0FBQ2xCLE9BQU8sQ0FBQzZTLGFBQWEsQ0FBQztNQUM1REQsS0FBSyxDQUFDeFYsT0FBTyxDQUFFLFVBQVdpRSxJQUFJLEVBQUc7UUFDL0I1RSxTQUFTLENBQUU0RSxJQUFJLEVBQUU7VUFDZm5CLDBCQUEwQixFQUFFLHdCQUF3QjtVQUNwREQsb0JBQW9CLEVBQUUsb0JBQW9CO1VBQzFDbkIsWUFBWSxFQUFFLFNBQVM7VUFDdkJxQixjQUFjLEVBQUU7UUFDbEIsQ0FBQyxDQUFFO01BQ0wsQ0FBQyxDQUFFO01BQ0gsSUFBSSxDQUFDMlMsaUJBQWlCLENBQUM5UyxPQUFPLENBQUM7SUFDakMsQ0FBQztJQUFFOztJQUVIOFMsaUJBQWlCLEVBQUUsVUFBUzlTLE9BQU8sRUFBRTtNQUNuQyxJQUFJcUIsSUFBSSxHQUFHSSxDQUFDLENBQUV6QixPQUFPLENBQUM2UyxhQUFhLENBQUU7TUFDckM7TUFDQXhSLElBQUksQ0FBQ3lQLElBQUksQ0FBRSxRQUFRLENBQUUsQ0FBQ2pJLEVBQUUsQ0FBRSxTQUFTLEVBQUUsWUFBWTtRQUM3QyxJQUFJaEssS0FBSyxHQUFHNEMsQ0FBQyxDQUFFLElBQUksQ0FBRTtRQUNyQjtRQUNGLElBQUlzUixLQUFLLEdBQUcxUixJQUFJLENBQUN5UCxJQUFJLENBQUUsVUFBVSxDQUFFLENBQUNpQyxLQUFLLEVBQUU7UUFDM0M7UUFDQSxJQUFJQyxZQUFZLEdBQUdELEtBQUssQ0FBQzdVLE1BQU0sRUFBRTtRQUMvQjtRQUNBLElBQUlXLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBS2tVLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRTtVQUN2QjtVQUNBOztVQUVBO1VBQ0EsSUFBSUUsYUFBYSxHQUFHRCxZQUFZLENBQUNFLE1BQU0sRUFBRSxDQUFDQyxHQUFHOztVQUU3QztVQUNBLElBQUlDLFVBQVUsR0FBRzVXLE1BQU0sQ0FBQzZXLFdBQVc7O1VBRW5DO1VBQ0EsSUFBS0osYUFBYSxHQUFHRyxVQUFVLElBQUlILGFBQWEsR0FBR0csVUFBVSxHQUFHNVcsTUFBTSxDQUFDOFcsV0FBVyxFQUFHO1lBQ2pGLE9BQU8sSUFBSTtVQUNmOztVQUVBO1VBQ0E3UixDQUFDLENBQUUsWUFBWSxDQUFFLENBQUM4UixTQUFTLENBQUVOLGFBQWEsQ0FBRTtRQUNoRDtNQUNKLENBQUMsQ0FBRTtJQUNMLENBQUM7SUFBRTs7SUFFSHRPLFNBQVMsRUFBRSxVQUFTN0QsT0FBTyxFQUFFZCxPQUFPLEVBQUU7TUFDcEMsSUFBSWlHLElBQUksR0FBRyxJQUFJO01BRWZ4RSxDQUFDLENBQUN6QixPQUFPLENBQUNpRSxvQkFBb0IsQ0FBQyxDQUFDdVAsTUFBTSxDQUFDLFVBQVNqTSxLQUFLLEVBQUU7UUFDckRBLEtBQUssQ0FBQzNHLGNBQWMsRUFBRTtRQUN0QnFGLElBQUksQ0FBQzJJLGFBQWEsQ0FBQzNJLElBQUksRUFBRSxRQUFRLENBQUM7TUFFcEMsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUFFOztJQUVIMkksYUFBYSxFQUFFLFVBQVMzSSxJQUFJLEVBQUV4RyxJQUFJLEVBQUU7TUFFbEM7TUFDQXdHLElBQUksQ0FBQ21NLGVBQWUsQ0FBQ25NLElBQUksQ0FBQ2pHLE9BQU8sRUFBRWlHLElBQUksQ0FBQ25GLE9BQU8sQ0FBQzs7TUFFaEQ7TUFDQSxJQUFJckIsSUFBSSxLQUFLLFFBQVEsRUFBRTtRQUNyQndHLElBQUksQ0FBQzRLLFlBQVksQ0FBQzVLLElBQUksQ0FBQ2pHLE9BQU8sRUFBRXlCLENBQUMsQ0FBQ3dFLElBQUksQ0FBQ2pHLE9BQU8sQ0FBQ2lFLG9CQUFvQixDQUFDLENBQUM2TSxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBSSxDQUFDO01BQzVGOztNQUVBO01BQ0EsSUFBSTJDLGNBQWMsR0FBR3hOLElBQUksQ0FBQ3lOLHNCQUFzQixFQUFFOztNQUVsRDtNQUNBek4sSUFBSSxDQUFDME4scUJBQXFCLENBQUMxTixJQUFJLENBQUNqRyxPQUFPLEVBQUVpRyxJQUFJLENBQUNuRixPQUFPLENBQUM7O01BRXREO01BQ0E7TUFDQSxJQUFJckIsSUFBSSxLQUFLLFFBQVEsRUFBRTtRQUNyQixJQUFJbVUsWUFBWSxHQUFHblMsQ0FBQyxDQUFDLG1DQUFtQyxDQUFDLENBQUNpQixHQUFHLEVBQUU7UUFDL0QsSUFBSWtSLFlBQVksS0FBSyxjQUFjLEVBQUU7VUFDbkM7VUFDQTNOLElBQUksQ0FBQzROLG1CQUFtQixDQUFDNU4sSUFBSSxDQUFDa0ssaUJBQWlCLEVBQUVzRCxjQUFjLENBQUM7UUFDbEUsQ0FBQyxNQUFNO1VBQ0w7VUFDQTtVQUNBeE4sSUFBSSxDQUFDNk4sZ0JBQWdCLENBQUVyUyxDQUFDLENBQUMseUJBQXlCLENBQUMsQ0FBQ2lCLEdBQUcsRUFBRSxFQUFFLGNBQWMsQ0FBRTtRQUM3RTtNQUNGLENBQUMsTUFBTTtRQUNMdUQsSUFBSSxDQUFDOE4sY0FBYyxFQUFFO01BQ3ZCO0lBQ0YsQ0FBQztJQUFFOztJQUVIcEQsa0JBQWtCLEVBQUUsVUFBU0MsS0FBSyxFQUFFb0QsYUFBYSxFQUFFbFQsT0FBTyxFQUFFZCxPQUFPLEVBQUU7TUFDbkU7TUFDQSxJQUFJaVUsV0FBVyxHQUFHRCxhQUFhLENBQUN6VyxJQUFJLENBQUMsSUFBSSxDQUFDO01BQzFDO01BQ0FrRSxDQUFDLENBQUMsc0JBQXNCLEdBQUd3UyxXQUFXLENBQUMsQ0FBQ2hJLFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQztNQUN6RXhLLENBQUMsQ0FBQyxzQkFBc0IsR0FBR3dTLFdBQVcsQ0FBQyxDQUFDQyxLQUFLLEVBQUU7TUFDL0N6UyxDQUFDLENBQUN1UyxhQUFhLENBQUMsQ0FBQy9ILFdBQVcsQ0FBQyxTQUFTLENBQUM7TUFDdkMsSUFBSTJFLEtBQUssRUFBRTtRQUNULElBQUluUCxDQUFDLENBQUMsc0JBQXNCLEdBQUd3UyxXQUFXLENBQUMsQ0FBQ2pZLE1BQU0sR0FBRyxDQUFDLEVBQUU7VUFDdER5RixDQUFDLENBQUMsc0JBQXNCLEdBQUd3UyxXQUFXLENBQUMsQ0FBQzNSLElBQUksQ0FBQ3NPLEtBQUssQ0FBQzlRLE9BQU8sQ0FBQztRQUM3RCxDQUFDLE1BQU07VUFDTGtVLGFBQWEsQ0FBQzlWLE1BQU0sRUFBRSxDQUFDNEssTUFBTSxDQUFDLCtCQUErQixHQUFHbUwsV0FBVyxHQUFHLElBQUksR0FBR3JELEtBQUssQ0FBQzlRLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDOUc7UUFDQTJCLENBQUMsQ0FBQyxzQkFBc0IsR0FBR3dTLFdBQVcsQ0FBQyxDQUFDakwsUUFBUSxDQUFDLG9CQUFvQixDQUFDO1FBQ3RFZ0wsYUFBYSxDQUFDOVYsTUFBTSxFQUFFLENBQUM4SyxRQUFRLENBQUMsd0JBQXdCLENBQUM7UUFDekR2SCxDQUFDLENBQUN1UyxhQUFhLENBQUMsQ0FBQ2hMLFFBQVEsQ0FBQyxTQUFTLENBQUM7UUFDcEMsSUFBSWdMLGFBQWEsQ0FBQzlWLE1BQU0sRUFBRSxDQUFDbEMsTUFBTSxHQUFHLENBQUMsRUFBRTtVQUNyQ3lGLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQzBTLE9BQU8sQ0FBQztZQUN0QlosU0FBUyxFQUFFUyxhQUFhLENBQUM5VixNQUFNLEVBQUUsQ0FBQ2dWLE1BQU0sRUFBRSxDQUFDQztVQUM3QyxDQUFDLEVBQUUsSUFBSSxDQUFDO1FBQ1Y7TUFDRixDQUFDLE1BQU07UUFDTDFSLENBQUMsQ0FBQ3VTLGFBQWEsQ0FBQyxDQUFDL0gsV0FBVyxDQUFDLFNBQVMsQ0FBQztRQUN2Q3hLLENBQUMsQ0FBQyxzQkFBc0IsR0FBR3dTLFdBQVcsQ0FBQyxDQUFDaEksV0FBVyxDQUFDLG9CQUFvQixDQUFDO1FBQ3pFeEssQ0FBQyxDQUFDLHNCQUFzQixHQUFHd1MsV0FBVyxDQUFDLENBQUNDLEtBQUssRUFBRTtRQUMvQ3pTLENBQUMsQ0FBQ3pCLE9BQU8sQ0FBQ3FRLGVBQWUsRUFBRXZQLE9BQU8sQ0FBQyxDQUFDbUwsV0FBVyxDQUFDLG9CQUFvQixDQUFDO1FBQ3JFeEssQ0FBQyxDQUFDekIsT0FBTyxDQUFDdVEsZUFBZSxFQUFFelAsT0FBTyxDQUFDLENBQUNtTCxXQUFXLENBQUMsb0JBQW9CLENBQUM7UUFDckV4SyxDQUFDLENBQUN6QixPQUFPLENBQUN5USxlQUFlLEVBQUUzUCxPQUFPLENBQUMsQ0FBQ21MLFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQztRQUNyRXhLLENBQUMsQ0FBQ3pCLE9BQU8sQ0FBQ3FRLGVBQWUsRUFBRXZQLE9BQU8sQ0FBQyxDQUFDNUMsTUFBTSxFQUFFLENBQUMrTixXQUFXLENBQUMsd0JBQXdCLENBQUM7UUFDbEZ4SyxDQUFDLENBQUN6QixPQUFPLENBQUN1USxlQUFlLEVBQUV6UCxPQUFPLENBQUMsQ0FBQzVDLE1BQU0sRUFBRSxDQUFDK04sV0FBVyxDQUFDLHdCQUF3QixDQUFDO1FBQ2xGeEssQ0FBQyxDQUFDekIsT0FBTyxDQUFDeVEsZUFBZSxFQUFFM1AsT0FBTyxDQUFDLENBQUM1QyxNQUFNLEVBQUUsQ0FBQytOLFdBQVcsQ0FBQyx3QkFBd0IsQ0FBQztNQUNwRjtJQUNGLENBQUM7SUFBRTs7SUFFSG1HLGVBQWUsRUFBRSxVQUFTcFMsT0FBTyxFQUFFYyxPQUFPLEVBQUU7TUFDMUMsSUFBSW1GLElBQUksR0FBRyxJQUFJO01BQ2Z4RSxDQUFDLENBQUMscUJBQXFCLENBQUMsQ0FBQ3JDLE1BQU0sRUFBRTtNQUNqQ3FDLENBQUMsQ0FBQyxtQkFBbUIsRUFBRVgsT0FBTyxDQUFDLENBQUNtTCxXQUFXLENBQUMsU0FBUyxDQUFDO01BQ3REeEssQ0FBQyxDQUFDLE9BQU8sRUFBRVgsT0FBTyxDQUFDLENBQUNtTCxXQUFXLENBQUMsd0JBQXdCLENBQUM7TUFDekR4SyxDQUFDLENBQUN6QixPQUFPLENBQUNzUCx1QkFBdUIsRUFBRXhPLE9BQU8sQ0FBQyxDQUFDbUwsV0FBVyxDQUFDLGlCQUFpQixDQUFDO01BQzFFeEssQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUNyQyxNQUFNLEVBQUU7TUFFakNxQyxDQUFDLENBQUN6QixPQUFPLENBQUM4TyxjQUFjLEdBQUcsUUFBUSxDQUFDLENBQUNySCxNQUFNLENBQUMsWUFBVztRQUNyRGhHLENBQUMsQ0FBQ3pCLE9BQU8sQ0FBQ3NQLHVCQUF1QixHQUFHLFdBQVcsQ0FBQyxDQUFDbFEsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUMzRHFDLENBQUMsQ0FBQ3pCLE9BQU8sQ0FBQ3NQLHVCQUF1QixDQUFDLENBQUNwUixNQUFNLEVBQUUsQ0FBQzRTLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDMVIsTUFBTSxFQUFFO1FBQ2hGO1FBQ0E2RyxJQUFJLENBQUM0SyxZQUFZLENBQUM3USxPQUFPLEVBQUV5QixDQUFDLENBQUN6QixPQUFPLENBQUNpRSxvQkFBb0IsQ0FBQyxDQUFDNk0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEtBQUssQ0FBQztNQUNuRixDQUFDLENBQUM7SUFDSixDQUFDO0lBQUU7O0lBRUg2QyxxQkFBcUIsRUFBRSxVQUFTM1QsT0FBTyxFQUFFYyxPQUFPLEVBQUU7TUFDaEQ7TUFDQSxJQUFJZCxPQUFPLENBQUNrRCxjQUFjLEtBQUssSUFBSSxFQUFFO1FBQ25DLElBQUlvSyxJQUFJLEdBQUc7VUFDVDVCLEtBQUssRUFBRWpLLENBQUMsQ0FBQ3pCLE9BQU8sQ0FBQ3NMLG9CQUFvQixFQUFFeEssT0FBTyxDQUFDLENBQUM0QixHQUFHLEVBQUU7VUFDckQwUixVQUFVLEVBQUUzUyxDQUFDLENBQUN6QixPQUFPLENBQUNxVSx5QkFBeUIsRUFBRXZULE9BQU8sQ0FBQyxDQUFDNEIsR0FBRyxFQUFFO1VBQy9ENFIsU0FBUyxFQUFFN1MsQ0FBQyxDQUFDekIsT0FBTyxDQUFDdVUsd0JBQXdCLEVBQUV6VCxPQUFPLENBQUMsQ0FBQzRCLEdBQUcsRUFBRTtVQUM3RHVLLFFBQVEsRUFBRXhMLENBQUMsQ0FBQ3pCLE9BQU8sQ0FBQ3dVLHVCQUF1QixFQUFFMVQsT0FBTyxDQUFDLENBQUM0QixHQUFHLEVBQUU7VUFDM0QrUixJQUFJLEVBQUVoVCxDQUFDLENBQUN6QixPQUFPLENBQUMwVSwyQkFBMkIsRUFBRTVULE9BQU8sQ0FBQyxDQUFDNEIsR0FBRyxFQUFFO1VBQzNEaVMsS0FBSyxFQUFFbFQsQ0FBQyxDQUFDekIsT0FBTyxDQUFDeUssNEJBQTRCLEVBQUUzSixPQUFPLENBQUMsQ0FBQzRCLEdBQUcsRUFBRTtVQUM3RGtTLEdBQUcsRUFBRW5ULENBQUMsQ0FBQ3pCLE9BQU8sQ0FBQ3VLLDBCQUEwQixFQUFFekosT0FBTyxDQUFDLENBQUM0QixHQUFHO1FBQ3pELENBQUM7UUFDRGpCLENBQUMsQ0FBQzJFLElBQUksQ0FBQztVQUNMQyxNQUFNLEVBQUUsTUFBTTtVQUNkQyxHQUFHLEVBQUV0RyxPQUFPLENBQUN1TixhQUFhLEdBQUcsaURBQWlEO1VBQzlFcEgsSUFBSSxFQUFFbUg7UUFDUixDQUFDLENBQUMsQ0FBQy9HLElBQUksQ0FBQyxVQUFVSixJQUFJLEVBQUc7VUFDdkIsSUFBSUEsSUFBSSxDQUFDcUgsTUFBTSxLQUFLLFNBQVMsSUFBSXJILElBQUksQ0FBQ3NILE1BQU0sS0FBSyxVQUFVLEVBQUU7WUFDM0Q7VUFBQTtRQUVKLENBQUMsQ0FBQztNQUNKO0lBQ0YsQ0FBQztJQUFFOztJQUVIaUcsc0JBQXNCLEVBQUUsWUFBVztNQUNqQyxJQUFJRCxjQUFjLEdBQUcsQ0FBQyxDQUFDO01BQ3ZCLElBQUlvQixjQUFjLEdBQUcsQ0FBQyxDQUFDO01BRXZCLElBQUlwVCxDQUFDLENBQUMsSUFBSSxDQUFDekIsT0FBTyxDQUFDc0wsb0JBQW9CLENBQUMsQ0FBQzVJLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtRQUNwRCtRLGNBQWMsQ0FBQy9ILEtBQUssR0FBR2pLLENBQUMsQ0FBQyxJQUFJLENBQUN6QixPQUFPLENBQUNzTCxvQkFBb0IsQ0FBQyxDQUFDNUksR0FBRyxFQUFFO01BQ25FO01BRUEsSUFBSW9TLFNBQVMsR0FBRyxFQUFFO01BQ2xCLElBQUlyVCxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUN6RixNQUFNLEdBQUcsQ0FBQyxFQUFFO1FBQzlCOFksU0FBUyxHQUFHclQsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDaUIsR0FBRyxFQUFFO01BQ25DLENBQUMsTUFBTTtRQUNMb1MsU0FBUyxHQUFHclQsQ0FBQyxDQUFDLElBQUksQ0FBQ3pCLE9BQU8sQ0FBQ3FVLHlCQUF5QixDQUFDLENBQUMzUixHQUFHLEVBQUUsR0FBRyxHQUFHLEdBQUdqQixDQUFDLENBQUMsSUFBSSxDQUFDekIsT0FBTyxDQUFDdVUsd0JBQXdCLENBQUMsQ0FBQzdSLEdBQUcsRUFBRTtNQUNwSDtNQUNBK1EsY0FBYyxDQUFDc0IsSUFBSSxHQUFHRCxTQUFTO01BRS9CLElBQUlFLE1BQU0sR0FBRyxNQUFNO01BQ25CLElBQUl2VCxDQUFDLENBQUMsSUFBSSxDQUFDekIsT0FBTyxDQUFDaVYsNkJBQTZCLENBQUMsQ0FBQ3ZTLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtRQUM3RHNTLE1BQU0sR0FBR3ZULENBQUMsQ0FBQyxJQUFJLENBQUN6QixPQUFPLENBQUNpViw2QkFBNkIsQ0FBQyxDQUFDdlMsR0FBRyxFQUFFO1FBQzVEbVMsY0FBYyxDQUFDSyxLQUFLLEdBQUdGLE1BQU07TUFDL0I7TUFFQSxJQUFJUCxJQUFJLEdBQUcsTUFBTTtNQUNqQixJQUFJaFQsQ0FBQyxDQUFDLElBQUksQ0FBQ3pCLE9BQU8sQ0FBQzBVLDJCQUEyQixDQUFDLENBQUNoUyxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7UUFDM0QrUixJQUFJLEdBQUdoVCxDQUFDLENBQUMsSUFBSSxDQUFDekIsT0FBTyxDQUFDMFUsMkJBQTJCLENBQUMsQ0FBQ2hTLEdBQUcsRUFBRTtRQUN4RG1TLGNBQWMsQ0FBQ0osSUFBSSxHQUFHQSxJQUFJO01BQzVCO01BRUEsSUFBSUUsS0FBSyxHQUFHLE1BQU07TUFDbEIsSUFBSWxULENBQUMsQ0FBQyxJQUFJLENBQUN6QixPQUFPLENBQUN5Syw0QkFBNEIsQ0FBQyxDQUFDL0gsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFO1FBQzVEaVMsS0FBSyxHQUFHbFQsQ0FBQyxDQUFDLElBQUksQ0FBQ3pCLE9BQU8sQ0FBQ3lLLDRCQUE0QixDQUFDLENBQUMvSCxHQUFHLEVBQUU7UUFDMURtUyxjQUFjLENBQUNGLEtBQUssR0FBR0EsS0FBSztNQUM5QjtNQUVBLElBQUlDLEdBQUcsR0FBRyxNQUFNO01BQ2hCLElBQUluVCxDQUFDLENBQUMsSUFBSSxDQUFDekIsT0FBTyxDQUFDdUssMEJBQTBCLENBQUMsQ0FBQzdILEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtRQUMxRGtTLEdBQUcsR0FBR25ULENBQUMsQ0FBQyxJQUFJLENBQUN6QixPQUFPLENBQUN1SywwQkFBMEIsQ0FBQyxDQUFDN0gsR0FBRyxFQUFFO1FBQ3REbVMsY0FBYyxDQUFDTSxXQUFXLEdBQUdQLEdBQUc7TUFDbEM7TUFFQSxJQUFJbEgsT0FBTyxHQUFHLElBQUk7TUFDbEIsSUFBSTBILG1CQUFtQixHQUFHM1QsQ0FBQyxDQUFDLElBQUksQ0FBQ3pCLE9BQU8sQ0FBQ3FWLDhCQUE4QixDQUFDLENBQUMzUyxHQUFHLEVBQUU7TUFDOUUsSUFBSTBTLG1CQUFtQixJQUFJLEVBQUUsSUFBSUEsbUJBQW1CLElBQUksZUFBZSxFQUFFO1FBQ3ZFMUgsT0FBTyxHQUFHMEgsbUJBQW1CO01BQy9CO01BQ0FQLGNBQWMsQ0FBQ25ILE9BQU8sR0FBR0EsT0FBTztNQUVoQyxJQUFJc0gsTUFBTSxLQUFLLE1BQU0sSUFBSVAsSUFBSSxLQUFLLE1BQU0sSUFBSUUsS0FBSyxLQUFLLE1BQU0sSUFBSUMsR0FBRyxLQUFLLE1BQU0sRUFBRTtRQUM5RW5CLGNBQWMsQ0FBQzZCLE9BQU8sR0FBR1QsY0FBYztNQUN6QztNQUVBLE9BQU9wQixjQUFjO0lBQ3ZCLENBQUM7SUFBRTs7SUFFSEksbUJBQW1CLEVBQUUsVUFBUzBCLFdBQVcsRUFBRTlCLGNBQWMsRUFBRTtNQUN6RCxJQUFJeE4sSUFBSSxHQUFHLElBQUk7TUFDZkEsSUFBSSxDQUFDNUMsTUFBTSxDQUFDd1EsbUJBQW1CLENBQUM7UUFDOUJwVSxJQUFJLEVBQUUsTUFBTTtRQUNaK1YsSUFBSSxFQUFFRCxXQUFXO1FBQ2pCRSxlQUFlLEVBQUVoQztNQUNuQixDQUFDLENBQUMsQ0FBQ3ZGLElBQUksQ0FBQyxVQUFTOEQsUUFBUSxFQUFFO1FBQ3pCLElBQUlBLFFBQVEsQ0FBQ3BCLEtBQUssRUFBRTtVQUNsQjNLLElBQUksQ0FBQ3lQLGlCQUFpQixDQUFDMUQsUUFBUSxDQUFDO1FBQ2xDLENBQUMsTUFBTTtVQUNMO1VBQ0EsSUFBSTNELFdBQVcsR0FBRzVNLENBQUMsQ0FBQ3dFLElBQUksQ0FBQ2pHLE9BQU8sQ0FBQ2lFLG9CQUFvQixDQUFDO1VBQ3RELElBQUkwUixRQUFRLEdBQUduWixNQUFNLENBQUN5SyxRQUFRLENBQUNDLFFBQVE7VUFDdkMsSUFBSXNILGNBQWMsR0FBRyxtQkFBbUI7VUFDeEMsSUFBSUMsVUFBVSxHQUFHLGNBQWMsR0FBR0QsY0FBYyxHQUFHLElBQUk7O1VBRXZEO1VBQ0EsSUFBSS9NLENBQUMsQ0FBQ2dOLFVBQVUsQ0FBQyxDQUFDelMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUM1QnlGLENBQUMsQ0FBQ2dOLFVBQVUsQ0FBQyxDQUFDL0wsR0FBRyxDQUFDc1AsUUFBUSxDQUFDdEQsYUFBYSxDQUFDQyxFQUFFLENBQUM7VUFDOUMsQ0FBQyxNQUFNO1lBQ0xOLFdBQVcsQ0FBQ3ZGLE1BQU0sQ0FBQ3JILENBQUMsQ0FBQywrQkFBK0IsR0FBRytNLGNBQWMsR0FBRyxJQUFJLENBQUMsQ0FBQzlMLEdBQUcsQ0FBQ3NQLFFBQVEsQ0FBQ3RELGFBQWEsQ0FBQ0MsRUFBRSxDQUFDLENBQUM7VUFDL0c7VUFFQWlILEtBQUssQ0FBQ0QsUUFBUSxFQUFFO1lBQ2R0UCxNQUFNLEVBQUUsTUFBTTtZQUNkd1AsT0FBTyxFQUFFO2NBQ1AsY0FBYyxFQUFFO1lBQ2xCLENBQUM7WUFDREMsSUFBSSxFQUFFclUsQ0FBQyxDQUFDNE0sV0FBVyxDQUFDLENBQUMwSCxTQUFTO1VBQ2hDLENBQUMsQ0FBQyxDQUFDN0gsSUFBSSxDQUFDLFVBQVM4RCxRQUFRLEVBQUU7WUFDekI7WUFDQUEsUUFBUSxDQUFDZ0UsSUFBSSxFQUFFLENBQUM5SCxJQUFJLENBQUMsVUFBUzhILElBQUksRUFBRTtjQUNsQy9QLElBQUksQ0FBQ2dRLG9CQUFvQixDQUFDRCxJQUFJLENBQUM7WUFDakMsQ0FBQyxDQUFDO1VBQ0osQ0FBQyxDQUFDO1FBQ0o7TUFDRixDQUFDLENBQUM7SUFDSixDQUFDO0lBQUU7O0lBRUhsQyxnQkFBZ0IsRUFBRSxVQUFTdkMsS0FBSyxFQUFFOVIsSUFBSSxFQUFFO01BQ3RDLElBQUksQ0FBQ2lKLG9CQUFvQixDQUFDakosSUFBSSxDQUFDO01BQy9CLElBQUksQ0FBQ3NVLGNBQWMsRUFBRTtJQUN2QixDQUFDO0lBQUU7O0lBRUhBLGNBQWMsRUFBRSxZQUFXO01BQ3pCLElBQUk5TixJQUFJLEdBQUcsSUFBSTtNQUNmLElBQUlvSSxXQUFXLEdBQUc1TSxDQUFDLENBQUMsSUFBSSxDQUFDekIsT0FBTyxDQUFDaUUsb0JBQW9CLENBQUM7TUFDdEQsSUFBSTBSLFFBQVEsR0FBR25aLE1BQU0sQ0FBQ3lLLFFBQVEsQ0FBQ0MsUUFBUTs7TUFFdkM7TUFDQTtNQUNBO01BQ0F6RixDQUFDLENBQUMyRSxJQUFJLENBQUM7UUFDTEUsR0FBRyxFQUFFcVAsUUFBUTtRQUNiTyxLQUFLLEVBQUUsS0FBSztRQUNaL1AsSUFBSSxFQUFFMUUsQ0FBQyxDQUFDNE0sV0FBVyxDQUFDLENBQUMwSCxTQUFTLEVBQUU7UUFDaEN0VyxJQUFJLEVBQUU7TUFDUixDQUFDLENBQUMsQ0FDRDhHLElBQUksQ0FBQyxVQUFTeUwsUUFBUSxFQUFFO1FBQ3ZCLElBQUksT0FBT0EsUUFBUSxDQUFDbUUsTUFBTSxLQUFLLFdBQVcsRUFBRTtVQUMxQ2xRLElBQUksQ0FBQ3lQLGlCQUFpQixDQUFDMUQsUUFBUSxDQUFDO1FBQ2xDLENBQUMsTUFBTTtVQUNMM0QsV0FBVyxDQUFDQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUNrRixNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQy9CO01BQ0YsQ0FBQyxDQUFDLENBQ0RyQixJQUFJLENBQUMsWUFBVztRQUNmbE0sSUFBSSxDQUFDNEssWUFBWSxDQUFDNUssSUFBSSxDQUFDakcsT0FBTyxFQUFFeUIsQ0FBQyxDQUFDd0UsSUFBSSxDQUFDakcsT0FBTyxDQUFDaUUsb0JBQW9CLENBQUMsQ0FBQzZNLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxLQUFLLENBQUM7TUFDN0YsQ0FBQyxDQUFDO0lBQ0osQ0FBQztJQUFFOztJQUVIbUYsb0JBQW9CLEVBQUUsVUFBU2pFLFFBQVEsRUFBRTtNQUN2QyxJQUFJM0QsV0FBVyxHQUFHNU0sQ0FBQyxDQUFDLElBQUksQ0FBQ3pCLE9BQU8sQ0FBQ2lFLG9CQUFvQixDQUFDO01BQ3RELElBQUkrTixRQUFRLENBQUNtRSxNQUFNLEVBQUU7UUFDbkI7UUFDQSxJQUFJLENBQUNULGlCQUFpQixDQUFDMUQsUUFBUSxDQUFDO01BQ2xDLENBQUMsTUFBTSxJQUFJQSxRQUFRLENBQUNvRSxlQUFlLEVBQUU7UUFDbkM7UUFDQTtNQUFBLENBQ0QsTUFBTTtRQUNML0gsV0FBVyxDQUFDQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUNrRixNQUFNLEVBQUUsQ0FBQyxDQUFDO01BQy9CO0lBQ0YsQ0FBQzs7SUFBRTs7SUFFSGtDLGlCQUFpQixFQUFFLFVBQVMxRCxRQUFRLEVBQUU7TUFDcEMsSUFBSS9MLElBQUksR0FBRyxJQUFJO01BQ2YsSUFBSW9RLFVBQVUsR0FBRyxFQUFFO01BQ25CO01BQ0FwUSxJQUFJLENBQUM0SyxZQUFZLENBQUM1SyxJQUFJLENBQUNqRyxPQUFPLEVBQUV5QixDQUFDLENBQUN3RSxJQUFJLENBQUNqRyxPQUFPLENBQUNpRSxvQkFBb0IsQ0FBQyxDQUFDNk0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLEtBQUssQ0FBQztNQUMzRjtNQUNBLElBQUksT0FBT2tCLFFBQVEsQ0FBQ21FLE1BQU0sS0FBSyxXQUFXLEVBQUU7UUFDMUMsSUFBSSxPQUFPbkUsUUFBUSxDQUFDbUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLFdBQVcsRUFBRTtVQUM3Q0UsVUFBVSxHQUFHckUsUUFBUSxDQUFDbUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDek8sS0FBSyxHQUFHLGlCQUFpQjtRQUMzRDtRQUNBakcsQ0FBQyxDQUFDNlUsSUFBSSxDQUFDdEUsUUFBUSxDQUFDbUUsTUFBTSxFQUFFLFVBQVV2USxLQUFLLEVBQUVnTCxLQUFLLEVBQUc7VUFDL0MsSUFBSSxPQUFPQSxLQUFLLENBQUNsSixLQUFLLEtBQUssV0FBVyxFQUFFO1lBQ3RDMk8sVUFBVSxHQUFHekYsS0FBSyxDQUFDbEosS0FBSyxHQUFHLGlCQUFpQjtVQUM5QyxDQUFDLE1BQU0sSUFBSSxPQUFPa0osS0FBSyxDQUFDMkYsS0FBSyxLQUFLLFdBQVcsSUFBSTNGLEtBQUssQ0FBQzJGLEtBQUssS0FBSyxFQUFFLEVBQUU7WUFDbkVGLFVBQVUsR0FBRyxLQUFLLEdBQUd6RixLQUFLLENBQUMyRixLQUFLLEdBQUcsV0FBVztVQUNoRDtVQUNBdFEsSUFBSSxDQUFDdVEsbUJBQW1CLENBQUM1RixLQUFLLEVBQUV5RixVQUFVLENBQUM7UUFDN0MsQ0FBQyxDQUFDO01BQ0osQ0FBQyxNQUFNLElBQUksT0FBT3JFLFFBQVEsQ0FBQ3BCLEtBQUssS0FBSyxXQUFXLEVBQUU7UUFDaEQsSUFBSUEsS0FBSyxHQUFHb0IsUUFBUSxDQUFDcEIsS0FBSztRQUMxQixJQUFJLE9BQU9BLEtBQUssQ0FBQ2xKLEtBQUssS0FBSyxXQUFXLEVBQUU7VUFDdEMyTyxVQUFVLEdBQUd6RixLQUFLLENBQUNsSixLQUFLLEdBQUcsaUJBQWlCO1FBQzlDLENBQUMsTUFBTSxJQUFJLE9BQU9rSixLQUFLLENBQUMyRixLQUFLLEtBQUssV0FBVyxJQUFJM0YsS0FBSyxDQUFDMkYsS0FBSyxLQUFLLEVBQUUsRUFBRTtVQUNuRUYsVUFBVSxHQUFHLEtBQUssR0FBR3pGLEtBQUssQ0FBQzJGLEtBQUssR0FBRyxXQUFXO1FBQ2hEO1FBQ0F0USxJQUFJLENBQUN1USxtQkFBbUIsQ0FBQzVGLEtBQUssRUFBRXlGLFVBQVUsQ0FBQztNQUM3QztNQUNBLElBQUk1VSxDQUFDLENBQUN3RSxJQUFJLENBQUNqRyxPQUFPLENBQUNxVyxVQUFVLENBQUMsQ0FBQyxDQUFDcmEsTUFBTSxHQUFHLENBQUMsRUFBRTtRQUMxQ3lGLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQzBTLE9BQU8sQ0FBQztVQUN0QlosU0FBUyxFQUFFOVIsQ0FBQyxDQUFDd0UsSUFBSSxDQUFDakcsT0FBTyxDQUFDcVcsVUFBVSxDQUFDLENBQUMsQ0FBQ25ZLE1BQU0sRUFBRSxDQUFDZ1YsTUFBTSxFQUFFLENBQUNDO1FBQzNELENBQUMsRUFBRSxJQUFJLENBQUM7TUFDVjtJQUNGLENBQUM7SUFBRTs7SUFFSHFELG1CQUFtQixDQUFDNUYsS0FBSyxFQUFFbEosS0FBSyxFQUFFO01BQ2hDLElBQUk1SCxPQUFPLEdBQUcsRUFBRTtNQUNoQixJQUFJMlcsbUJBQW1CLEdBQUcsRUFBRTtNQUM1QixJQUFJQyxXQUFXLEdBQUdqVixDQUFDLENBQUMsSUFBSSxDQUFDekIsT0FBTyxDQUFDMEgsS0FBSyxDQUFDLENBQUMsQ0FBQ3hKLE1BQU0sRUFBRTtNQUNqRCxJQUFJLE9BQU8wUyxLQUFLLENBQUM5USxPQUFPLEtBQUssUUFBUSxFQUFFO1FBQ3JDQSxPQUFPLEdBQUc4USxLQUFLLENBQUM5USxPQUFPO01BQ3pCLENBQUMsTUFBTTtRQUNMQSxPQUFPLEdBQUc4USxLQUFLLENBQUM5USxPQUFPLENBQUMsQ0FBQyxDQUFDO01BQzVCO01BQ0EsSUFBSTJCLENBQUMsQ0FBQyxJQUFJLENBQUN6QixPQUFPLENBQUMwSCxLQUFLLENBQUMsQ0FBQyxDQUFDMUwsTUFBTSxHQUFHLENBQUMsRUFBRTtRQUNyQ3lGLENBQUMsQ0FBQyxJQUFJLENBQUN6QixPQUFPLENBQUMwSCxLQUFLLENBQUMsQ0FBQyxDQUFDc0IsUUFBUSxDQUFDLFNBQVMsQ0FBQztRQUMxQ3ZILENBQUMsQ0FBQyxJQUFJLENBQUN6QixPQUFPLENBQUMwSCxLQUFLLENBQUMsQ0FBQyxDQUFDaVAsSUFBSSxFQUFFLENBQUMzTixRQUFRLENBQUMsU0FBUyxDQUFDO1FBQ2pELElBQUl2SCxDQUFDLENBQUMscUJBQXFCLEVBQUVpVixXQUFXLENBQUMsQ0FBQzFhLE1BQU0sR0FBRyxDQUFDLEVBQUU7VUFDcER5RixDQUFDLENBQUMscUJBQXFCLEVBQUVpVixXQUFXLENBQUMsQ0FBQzFOLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQztVQUNwRXZILENBQUMsQ0FBQyxxQkFBcUIsRUFBRWlWLFdBQVcsQ0FBQyxDQUFDcFUsSUFBSSxDQUFDeEMsT0FBTyxDQUFDO1FBQ3JELENBQUMsTUFBTTtVQUNMMkIsQ0FBQyxDQUFDLElBQUksQ0FBQ3pCLE9BQU8sQ0FBQzBILEtBQUssQ0FBQyxDQUFDLENBQUNrRixLQUFLLENBQUMsbURBQW1ELEdBQUc5TSxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3RHO01BQ0YsQ0FBQyxNQUFNLElBQUksT0FBTzhRLEtBQUssS0FBSyxXQUFXLEVBQUU7UUFDdkMsSUFBSSxDQUFDQyxZQUFZLENBQUMsSUFBSSxDQUFDN1EsT0FBTyxFQUFFeUIsQ0FBQyxDQUFDLElBQUksQ0FBQ3pCLE9BQU8sQ0FBQ2lFLG9CQUFvQixDQUFDLENBQUM2TSxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsS0FBSyxDQUFDO1FBQzNGLElBQUlGLEtBQUssQ0FBQ2hWLElBQUksS0FBSyxtQkFBbUIsSUFBSWdWLEtBQUssQ0FBQ2hWLElBQUksSUFBSSxnQkFBZ0IsSUFBSWdWLEtBQUssQ0FBQ2hWLElBQUksSUFBSSxrQkFBa0IsSUFBSWdWLEtBQUssQ0FBQ2hWLElBQUksSUFBSSxlQUFlLElBQUlnVixLQUFLLENBQUNoVixJQUFJLElBQUksa0JBQWtCLEVBQUU7VUFDakw7VUFDQTZhLG1CQUFtQixHQUFHaFYsQ0FBQyxDQUFDLElBQUksQ0FBQ3pCLE9BQU8sQ0FBQ3FRLGVBQWUsQ0FBQztRQUN2RDtRQUNBLElBQUlPLEtBQUssQ0FBQ2hWLElBQUksSUFBSSxzQkFBc0IsSUFBSWdWLEtBQUssQ0FBQ2hWLElBQUksSUFBSSxxQkFBcUIsSUFBSWdWLEtBQUssQ0FBQ2hWLElBQUksSUFBSSxjQUFjLEVBQUU7VUFDL0c7VUFDQTZhLG1CQUFtQixHQUFHaFYsQ0FBQyxDQUFDLElBQUksQ0FBQ3pCLE9BQU8sQ0FBQ3VRLGVBQWUsQ0FBQztRQUN2RDtRQUNBLElBQUlLLEtBQUssQ0FBQ2hWLElBQUksSUFBSSxhQUFhLElBQUlnVixLQUFLLENBQUNoVixJQUFJLElBQUksZUFBZSxFQUFFO1VBQ2hFO1VBQ0E2YSxtQkFBbUIsR0FBR2hWLENBQUMsQ0FBQyxJQUFJLENBQUN6QixPQUFPLENBQUN5USxlQUFlLENBQUM7UUFDdkQ7UUFDQSxJQUFJRyxLQUFLLENBQUNoVixJQUFJLElBQUksZUFBZSxFQUFFO1VBQ2pDO1VBQ0E2YSxtQkFBbUIsR0FBR2hWLENBQUMsQ0FBQyxJQUFJLENBQUN6QixPQUFPLENBQUNzTCxvQkFBb0IsQ0FBQztRQUM1RDtRQUNBLElBQUltTCxtQkFBbUIsS0FBSyxFQUFFLEVBQUU7VUFDOUIsSUFBSSxDQUFDOUYsa0JBQWtCLENBQUNDLEtBQUssRUFBRTZGLG1CQUFtQixFQUFFLElBQUksQ0FBQzNWLE9BQU8sRUFBRSxJQUFJLENBQUNkLE9BQU8sQ0FBRTtRQUNsRjtRQUNBLElBQUk0USxLQUFLLENBQUNuUixJQUFJLElBQUksaUJBQWlCLElBQUlnWCxtQkFBbUIsS0FBSyxFQUFFLEVBQUU7VUFDakVoVixDQUFDLENBQUMsSUFBSSxDQUFDekIsT0FBTyxDQUFDc1AsdUJBQXVCLEdBQUcsU0FBUyxDQUFDLENBQUN4RyxNQUFNLENBQUMsdUVBQXVFLEdBQUc4SCxLQUFLLENBQUM5USxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQzlKO1FBQ0EsSUFBSThRLEtBQUssQ0FBQ2xKLEtBQUssSUFBSSxXQUFXLEVBQUU7VUFDOUJqRyxDQUFDLENBQUMsSUFBSSxDQUFDekIsT0FBTyxDQUFDb0QsbUJBQW1CLENBQUMsQ0FBQytJLE1BQU0sQ0FBQyxpRUFBaUUsR0FBR3JNLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDbEk7UUFDQSxJQUFJOFEsS0FBSyxDQUFDblIsSUFBSSxJQUFJLHVCQUF1QixJQUFJZ1gsbUJBQW1CLEtBQUssRUFBRSxFQUFFO1VBQ3ZFaFYsQ0FBQyxDQUFDLElBQUksQ0FBQ3pCLE9BQU8sQ0FBQ29ELG1CQUFtQixDQUFDLENBQUMrSSxNQUFNLENBQUMsdUVBQXVFLEdBQUd5RSxLQUFLLENBQUM5USxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQzlJO01BQ0Y7SUFDRixDQUFDO0lBQUU7O0lBRUgrRSxzQkFBc0IsRUFBRSxVQUFTL0QsT0FBTyxFQUFFZCxPQUFPLEVBQUU7TUFDakQsSUFBSWlHLElBQUksR0FBRyxJQUFJO01BRWYsSUFBSTJRLHFCQUFxQixHQUFHLEVBQUU7TUFDOUIsSUFBSW5WLENBQUMsQ0FBQ3pCLE9BQU8sQ0FBQzZXLHlCQUF5QixDQUFDLENBQUM3YSxNQUFNLEdBQUcsQ0FBQyxFQUFHO1FBQ3BELElBQUk4YSxRQUFRLEdBQUc7VUFDYkMsU0FBUyxFQUFFLGlCQUFpQjtVQUM1QkMsU0FBUyxFQUFFO1FBQ2IsQ0FBQztRQUNEdlYsQ0FBQyxDQUFDMkUsSUFBSSxDQUFDO1VBQ0xDLE1BQU0sRUFBRSxLQUFLO1VBQ2JDLEdBQUcsRUFBRXRHLE9BQU8sQ0FBQ3VOLGFBQWEsR0FBRyx5Q0FBeUM7VUFDdEVwSCxJQUFJLEVBQUUyUTtRQUNSLENBQUMsQ0FBQyxDQUFDdlEsSUFBSSxDQUFDLFVBQVUyRyxNQUFNLEVBQUc7VUFDekIsSUFBSyxPQUFPQSxNQUFNLENBQUMrSixZQUFZLEtBQUssV0FBVyxFQUFHO1lBQ2hEeFYsQ0FBQyxDQUFDNlUsSUFBSSxDQUFDcEosTUFBTSxDQUFDK0osWUFBWSxFQUFFLFVBQVVyUixLQUFLLEVBQUVzUixRQUFRLEVBQUc7Y0FDdEROLHFCQUFxQixJQUFJLDhEQUE4RCxHQUFHTSxRQUFRLENBQUN6WCxJQUFJLEdBQUcsSUFBSTtjQUM5R21YLHFCQUFxQixJQUFJLFNBQVMsR0FBR00sUUFBUSxDQUFDbkMsSUFBSSxHQUFHLFdBQVc7Y0FDaEUsSUFBS21DLFFBQVEsQ0FBQ0MsUUFBUSxDQUFDbmIsTUFBTSxHQUFHLENBQUMsRUFBRztnQkFDbEM0YSxxQkFBcUIsSUFBSSxrREFBa0Q7Z0JBQzNFblYsQ0FBQyxDQUFDNlUsSUFBSSxDQUFDWSxRQUFRLENBQUNBLFFBQVEsQ0FBQ0MsUUFBUSxDQUFDLEVBQUUsVUFBVXZSLEtBQUssRUFBRXdSLElBQUksRUFBRztrQkFDMURSLHFCQUFxQixJQUFJLCtEQUErRCxHQUFHUSxJQUFJLENBQUN6SSxFQUFFLEdBQUcsSUFBSSxHQUFHeUksSUFBSSxDQUFDckMsSUFBSSxHQUFHLFVBQVU7Z0JBQ3BJLENBQUMsQ0FBQztnQkFDRjZCLHFCQUFxQixJQUFJLFFBQVE7Y0FDbkM7Y0FDQUEscUJBQXFCLElBQUksYUFBYTtZQUN4QyxDQUFDLENBQUM7WUFDRm5WLENBQUMsQ0FBQ3pCLE9BQU8sQ0FBQzZXLHlCQUF5QixDQUFDLENBQUMvTCxJQUFJLENBQUM4TCxxQkFBcUIsQ0FBQztVQUNsRTtRQUNGLENBQUMsQ0FBQztNQUNKO01BRUEsSUFBSW5WLENBQUMsQ0FBQ3pCLE9BQU8sQ0FBQzZXLHlCQUF5QixDQUFDLENBQUM3YSxNQUFNLEdBQUcsQ0FBQyxJQUFJLE9BQU95RixDQUFDLENBQUN6QixPQUFPLENBQUNzTCxvQkFBb0IsRUFBRXhLLE9BQU8sQ0FBQyxDQUFDNEIsR0FBRyxFQUFFLEtBQUssV0FBVyxFQUFFO1FBQzVILElBQUlvVSxRQUFRLEdBQUc7VUFDYnBMLEtBQUssRUFBRWpLLENBQUMsQ0FBQ3pCLE9BQU8sQ0FBQ3NMLG9CQUFvQixFQUFFeEssT0FBTyxDQUFDLENBQUM0QixHQUFHO1FBQ3JELENBQUM7UUFDRGpCLENBQUMsQ0FBQzJFLElBQUksQ0FBQztVQUNMQyxNQUFNLEVBQUUsS0FBSztVQUNiQyxHQUFHLEVBQUV0RyxPQUFPLENBQUN1TixhQUFhLEdBQUcseUNBQXlDO1VBQ3RFcEgsSUFBSSxFQUFFMlE7UUFDUixDQUFDLENBQUMsQ0FBQ3ZRLElBQUksQ0FBQyxVQUFVMkcsTUFBTSxFQUFHO1VBQ3pCLElBQUssT0FBT0EsTUFBTSxDQUFDbUssZ0JBQWdCLEtBQUssV0FBVyxFQUFHO1lBQ3BENVYsQ0FBQyxDQUFDekIsT0FBTyxDQUFDc0wsb0JBQW9CLEVBQUV4SyxPQUFPLENBQUMsQ0FBQzhMLEtBQUssQ0FBQyxzREFBc0QsR0FBR00sTUFBTSxDQUFDbUssZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1VBQ3pJO1VBQ0EsSUFBSyxPQUFPbkssTUFBTSxDQUFDb0ssaUJBQWlCLEtBQUssV0FBVyxFQUFHO1lBQ3JEN1YsQ0FBQyxDQUFDekIsT0FBTyxDQUFDc0wsb0JBQW9CLEVBQUV4SyxPQUFPLENBQUMsQ0FBQzhMLEtBQUssQ0FBQyx1REFBdUQsR0FBR00sTUFBTSxDQUFDb0ssaUJBQWlCLEdBQUcsSUFBSSxDQUFDO1VBQzNJO1VBQ0EsSUFBSXBLLE1BQU0sQ0FBQ21LLGdCQUFnQixLQUFLLFlBQVksRUFBRTtZQUM1QztZQUNBNVYsQ0FBQyxDQUFDLHlCQUF5QixDQUFDLENBQUNhLElBQUksQ0FBQ2IsQ0FBQyxDQUFDLHlCQUF5QixDQUFDLENBQUNsRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUN2RixJQUFJZ2EsTUFBTSxHQUFHckssTUFBTSxDQUFDcUssTUFBTTtZQUMxQjlWLENBQUMsQ0FBQzZVLElBQUksQ0FBQ2lCLE1BQU0sRUFBRSxVQUFVM1IsS0FBSyxFQUFFN0ksS0FBSyxFQUFHO2NBQ3RDLElBQUtBLEtBQUssS0FBSyxJQUFJLEVBQUc7Z0JBQ3BCMEUsQ0FBQyxDQUFDLG1CQUFtQixHQUFHbUUsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDakcsSUFBSSxDQUFDLFNBQVMsRUFBQyxJQUFJLENBQUM7Y0FDNUQsQ0FBQyxNQUFNO2dCQUNMOEIsQ0FBQyxDQUFDLG1CQUFtQixHQUFHbUUsS0FBSyxHQUFHLElBQUksQ0FBQyxDQUFDakcsSUFBSSxDQUFDLFNBQVMsRUFBQyxLQUFLLENBQUM7Y0FDN0Q7WUFDRixDQUFDLENBQUM7VUFDSjtRQUNGLENBQUMsQ0FBQztNQUNKO0lBRUYsQ0FBQztJQUFFOztJQUVIbUYsb0JBQW9CLEVBQUUsVUFBU2hFLE9BQU8sRUFBRWQsT0FBTyxFQUFFO01BRS9DLElBQUl3WCw0QkFBNEIsR0FBRy9WLENBQUMsQ0FBQ3pCLE9BQU8sQ0FBQzZXLHlCQUF5QixHQUFHLFFBQVEsQ0FBQyxDQUFDZCxTQUFTLEVBQUU7TUFDOUY7O01BRUF0VSxDQUFDLENBQUN6QixPQUFPLENBQUM0RSxxQkFBcUIsQ0FBQyxDQUFDNE8sTUFBTSxDQUFDLFVBQVNqTSxLQUFLLEVBQUU7UUFDdERBLEtBQUssQ0FBQzNHLGNBQWMsRUFBRTtRQUV0QixJQUFJNlcsV0FBVyxHQUFHaFcsQ0FBQyxDQUFDekIsT0FBTyxDQUFDNEUscUJBQXFCLENBQUM7UUFDbEQ7UUFDQTs7UUFFQSxJQUFJOFMsaUJBQWlCLEdBQUdqVyxDQUFDLENBQUN6QixPQUFPLENBQUM2Vyx5QkFBeUIsR0FBRyxnQkFBZ0IsQ0FBQztRQUMvRSxJQUFJYyx1QkFBdUIsR0FBR0QsaUJBQWlCLENBQUMzQixTQUFTLEVBQUU7UUFFM0QsSUFBS3lCLDRCQUE0QixLQUFLRyx1QkFBdUIsSUFBTSxPQUFPRCxpQkFBaUIsS0FBSyxXQUFZLEVBQUU7VUFDNUc7VUFDQTs7VUFFQSxJQUFJRSxTQUFTLEdBQUc7WUFDZGxNLEtBQUssRUFBRWpLLENBQUMsQ0FBQ3pCLE9BQU8sQ0FBQ3NMLG9CQUFvQixFQUFFeEssT0FBTyxDQUFDLENBQUM0QixHQUFHLEVBQUU7WUFDckQwUixVQUFVLEVBQUUzUyxDQUFDLENBQUN6QixPQUFPLENBQUNxVSx5QkFBeUIsRUFBRXZULE9BQU8sQ0FBQyxDQUFDNEIsR0FBRyxFQUFFO1lBQy9ENFIsU0FBUyxFQUFFN1MsQ0FBQyxDQUFDekIsT0FBTyxDQUFDdVUsd0JBQXdCLEVBQUV6VCxPQUFPLENBQUMsQ0FBQzRCLEdBQUcsRUFBRTtZQUM3RG1WLGdCQUFnQixFQUFFLENBQUM7VUFDckIsQ0FBQztVQUVERCxTQUFTLENBQUNFLGdCQUFnQixHQUFHLEtBQUs7VUFFbEMsSUFBS3JXLENBQUMsQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDekYsTUFBTSxHQUFHLENBQUMsRUFBRztZQUNwRDRiLFNBQVMsQ0FBQ1AsZ0JBQWdCLEdBQUc1VixDQUFDLENBQUMsZ0NBQWdDLENBQUMsQ0FBQ2lCLEdBQUcsRUFBRTtVQUN4RTtVQUVBLElBQUtqQixDQUFDLENBQUMsaUNBQWlDLENBQUMsQ0FBQ3pGLE1BQU0sR0FBRyxDQUFDLEVBQUc7WUFDckQ0YixTQUFTLENBQUNOLGlCQUFpQixHQUFHN1YsQ0FBQyxDQUFDLGlDQUFpQyxDQUFDLENBQUNpQixHQUFHLEVBQUU7VUFDMUU7VUFFQSxJQUFJLE9BQU9nVixpQkFBaUIsS0FBSyxXQUFXLEVBQUU7WUFDNUNqVyxDQUFDLENBQUM2VSxJQUFJLENBQUNvQixpQkFBaUIsRUFBRSxVQUFTOVIsS0FBSyxFQUFFN0ksS0FBSyxFQUFFO2NBQy9DLElBQUlnYixLQUFLLEdBQUd0VyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUNpQixHQUFHLEVBQUU7Y0FDekJrVixTQUFTLENBQUNDLGdCQUFnQixDQUFDalMsS0FBSyxDQUFDLEdBQUdtUyxLQUFLO1lBQzNDLENBQUMsQ0FBQztVQUNKO1VBRUF0VyxDQUFDLENBQUMyRSxJQUFJLENBQUM7WUFDTEUsR0FBRyxFQUFFdEcsT0FBTyxDQUFDdU4sYUFBYSxHQUFHLHlDQUF5QztZQUN0RTlOLElBQUksRUFBRSxNQUFNO1lBQ1p1WSxRQUFRLEVBQUcsTUFBTTtZQUNqQmpHLFdBQVcsRUFBRSxpQ0FBaUM7WUFDOUM1TCxJQUFJLEVBQUV5TCxJQUFJLENBQUNDLFNBQVMsQ0FBQytGLFNBQVM7VUFDaEMsQ0FBQyxDQUFDLENBQ0RyUixJQUFJLENBQUMsVUFBU3lMLFFBQVEsRUFBRTtZQUFFO1lBQ3pCLElBQUlsUyxPQUFPLEdBQUcsRUFBRTtZQUNoQixJQUFLa1MsUUFBUSxDQUFDaUcsT0FBTyxLQUFLLElBQUksRUFBRztjQUMvQjtBQUNkO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO2NBQ2M7WUFBQTtZQUVGUixXQUFXLENBQUNuSixHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUNrRixNQUFNLEVBQUU7WUFDM0I7VUFDRixDQUFDLENBQUMsQ0FDRHJCLElBQUksQ0FBQyxVQUFTSCxRQUFRLEVBQUU7WUFDdkI7WUFDQTtZQUNBeUYsV0FBVyxDQUFDbkosR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDa0YsTUFBTSxFQUFFO1VBQzdCLENBQUMsQ0FBQztRQUVKLENBQUMsTUFBTTtVQUFFO1VBQ1BpRSxXQUFXLENBQUNuSixHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUNrRixNQUFNLEVBQUU7UUFDN0I7TUFFRixDQUFDLENBQUM7TUFDRjtJQUNGLENBQUMsQ0FBRTtFQUVMLENBQUMsQ0FBQyxDQUFDOztFQUVIO0VBQ0E7RUFDQS9SLENBQUMsQ0FBQ3BELEVBQUUsQ0FBQ3FELFVBQVUsQ0FBQyxHQUFHLFVBQVcxQixPQUFPLEVBQUc7SUFDdEMsT0FBTyxJQUFJLENBQUNzVyxJQUFJLENBQUMsWUFBWTtNQUMzQixJQUFJLENBQUM3VSxDQUFDLENBQUMwRSxJQUFJLENBQUMsSUFBSSxFQUFFLFNBQVMsR0FBR3pFLFVBQVUsQ0FBQyxFQUFFO1FBQ3pDRCxDQUFDLENBQUMwRSxJQUFJLENBQUMsSUFBSSxFQUFFLFNBQVMsR0FBR3pFLFVBQVUsRUFBRSxJQUFJQyxNQUFNLENBQUUsSUFBSSxFQUFFM0IsT0FBTyxDQUFFLENBQUM7TUFDbkU7SUFDRixDQUFDLENBQUM7RUFDSixDQUFDO0FBRUgsQ0FBQyxFQUFHa1ksTUFBTSxFQUFFMWIsTUFBTSxFQUFFK0QsUUFBUSxDQUFFIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpKHsxOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcInVzZSBzdHJpY3RcIjt2YXIgX3ZhbGlkRm9ybT1yZXF1aXJlKFwiLi9zcmMvdmFsaWQtZm9ybVwiKTt2YXIgX3ZhbGlkRm9ybTI9X2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdmFsaWRGb3JtKTtmdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iail7cmV0dXJuIG9iaiYmb2JqLl9fZXNNb2R1bGU/b2JqOntkZWZhdWx0Om9ian19d2luZG93LlZhbGlkRm9ybT1fdmFsaWRGb3JtMi5kZWZhdWx0O3dpbmRvdy5WYWxpZEZvcm0udG9nZ2xlSW52YWxpZENsYXNzPV92YWxpZEZvcm0udG9nZ2xlSW52YWxpZENsYXNzO3dpbmRvdy5WYWxpZEZvcm0uaGFuZGxlQ3VzdG9tTWVzc2FnZXM9X3ZhbGlkRm9ybS5oYW5kbGVDdXN0b21NZXNzYWdlczt3aW5kb3cuVmFsaWRGb3JtLmhhbmRsZUN1c3RvbU1lc3NhZ2VEaXNwbGF5PV92YWxpZEZvcm0uaGFuZGxlQ3VzdG9tTWVzc2FnZURpc3BsYXl9LHtcIi4vc3JjL3ZhbGlkLWZvcm1cIjozfV0sMjpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOnRydWV9KTtleHBvcnRzLmNsb25lPWNsb25lO2V4cG9ydHMuZGVmYXVsdHM9ZGVmYXVsdHM7ZXhwb3J0cy5pbnNlcnRBZnRlcj1pbnNlcnRBZnRlcjtleHBvcnRzLmluc2VydEJlZm9yZT1pbnNlcnRCZWZvcmU7ZXhwb3J0cy5mb3JFYWNoPWZvckVhY2g7ZXhwb3J0cy5kZWJvdW5jZT1kZWJvdW5jZTtmdW5jdGlvbiBjbG9uZShvYmope3ZhciBjb3B5PXt9O2Zvcih2YXIgYXR0ciBpbiBvYmope2lmKG9iai5oYXNPd25Qcm9wZXJ0eShhdHRyKSljb3B5W2F0dHJdPW9ialthdHRyXX1yZXR1cm4gY29weX1mdW5jdGlvbiBkZWZhdWx0cyhvYmosZGVmYXVsdE9iamVjdCl7b2JqPWNsb25lKG9ianx8e30pO2Zvcih2YXIgayBpbiBkZWZhdWx0T2JqZWN0KXtpZihvYmpba109PT11bmRlZmluZWQpb2JqW2tdPWRlZmF1bHRPYmplY3Rba119cmV0dXJuIG9ian1mdW5jdGlvbiBpbnNlcnRBZnRlcihyZWZOb2RlLG5vZGVUb0luc2VydCl7dmFyIHNpYmxpbmc9cmVmTm9kZS5uZXh0U2libGluZztpZihzaWJsaW5nKXt2YXIgX3BhcmVudD1yZWZOb2RlLnBhcmVudE5vZGU7X3BhcmVudC5pbnNlcnRCZWZvcmUobm9kZVRvSW5zZXJ0LHNpYmxpbmcpfWVsc2V7cGFyZW50LmFwcGVuZENoaWxkKG5vZGVUb0luc2VydCl9fWZ1bmN0aW9uIGluc2VydEJlZm9yZShyZWZOb2RlLG5vZGVUb0luc2VydCl7dmFyIHBhcmVudD1yZWZOb2RlLnBhcmVudE5vZGU7cGFyZW50Lmluc2VydEJlZm9yZShub2RlVG9JbnNlcnQscmVmTm9kZSl9ZnVuY3Rpb24gZm9yRWFjaChpdGVtcyxmbil7aWYoIWl0ZW1zKXJldHVybjtpZihpdGVtcy5mb3JFYWNoKXtpdGVtcy5mb3JFYWNoKGZuKX1lbHNle2Zvcih2YXIgaT0wO2k8aXRlbXMubGVuZ3RoO2krKyl7Zm4oaXRlbXNbaV0saSxpdGVtcyl9fX1mdW5jdGlvbiBkZWJvdW5jZShtcyxmbil7dmFyIHRpbWVvdXQ9dm9pZCAwO3ZhciBkZWJvdW5jZWRGbj1mdW5jdGlvbiBkZWJvdW5jZWRGbigpe2NsZWFyVGltZW91dCh0aW1lb3V0KTt0aW1lb3V0PXNldFRpbWVvdXQoZm4sbXMpfTtyZXR1cm4gZGVib3VuY2VkRm59fSx7fV0sMzpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOnRydWV9KTtleHBvcnRzLnRvZ2dsZUludmFsaWRDbGFzcz10b2dnbGVJbnZhbGlkQ2xhc3M7ZXhwb3J0cy5oYW5kbGVDdXN0b21NZXNzYWdlcz1oYW5kbGVDdXN0b21NZXNzYWdlcztleHBvcnRzLmhhbmRsZUN1c3RvbU1lc3NhZ2VEaXNwbGF5PWhhbmRsZUN1c3RvbU1lc3NhZ2VEaXNwbGF5O2V4cG9ydHMuZGVmYXVsdD12YWxpZEZvcm07dmFyIF91dGlsPXJlcXVpcmUoXCIuL3V0aWxcIik7ZnVuY3Rpb24gdG9nZ2xlSW52YWxpZENsYXNzKGlucHV0LGludmFsaWRDbGFzcyl7aW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImludmFsaWRcIixmdW5jdGlvbigpe2lucHV0LmNsYXNzTGlzdC5hZGQoaW52YWxpZENsYXNzKX0pO2lucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLGZ1bmN0aW9uKCl7aWYoaW5wdXQudmFsaWRpdHkudmFsaWQpe2lucHV0LmNsYXNzTGlzdC5yZW1vdmUoaW52YWxpZENsYXNzKX19KX12YXIgZXJyb3JQcm9wcz1bXCJiYWRJbnB1dFwiLFwicGF0dGVybk1pc21hdGNoXCIsXCJyYW5nZU92ZXJmbG93XCIsXCJyYW5nZVVuZGVyZmxvd1wiLFwic3RlcE1pc21hdGNoXCIsXCJ0b29Mb25nXCIsXCJ0b29TaG9ydFwiLFwidHlwZU1pc21hdGNoXCIsXCJ2YWx1ZU1pc3NpbmdcIixcImN1c3RvbUVycm9yXCJdO2Z1bmN0aW9uIGdldEN1c3RvbU1lc3NhZ2UoaW5wdXQsY3VzdG9tTWVzc2FnZXMpe2N1c3RvbU1lc3NhZ2VzPWN1c3RvbU1lc3NhZ2VzfHx7fTt2YXIgbG9jYWxFcnJvclByb3BzPVtpbnB1dC50eXBlK1wiTWlzbWF0Y2hcIl0uY29uY2F0KGVycm9yUHJvcHMpO3ZhciB2YWxpZGl0eT1pbnB1dC52YWxpZGl0eTtmb3IodmFyIGk9MDtpPGxvY2FsRXJyb3JQcm9wcy5sZW5ndGg7aSsrKXt2YXIgcHJvcD1sb2NhbEVycm9yUHJvcHNbaV07aWYodmFsaWRpdHlbcHJvcF0pe3JldHVybiBpbnB1dC5nZXRBdHRyaWJ1dGUoXCJkYXRhLVwiK3Byb3ApfHxjdXN0b21NZXNzYWdlc1twcm9wXX19fWZ1bmN0aW9uIGhhbmRsZUN1c3RvbU1lc3NhZ2VzKGlucHV0LGN1c3RvbU1lc3NhZ2VzKXtmdW5jdGlvbiBjaGVja1ZhbGlkaXR5KCl7dmFyIG1lc3NhZ2U9aW5wdXQudmFsaWRpdHkudmFsaWQ/bnVsbDpnZXRDdXN0b21NZXNzYWdlKGlucHV0LGN1c3RvbU1lc3NhZ2VzKTtpbnB1dC5zZXRDdXN0b21WYWxpZGl0eShtZXNzYWdlfHxcIlwiKX1pbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIixjaGVja1ZhbGlkaXR5KTtpbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiaW52YWxpZFwiLGNoZWNrVmFsaWRpdHkpfWZ1bmN0aW9uIGhhbmRsZUN1c3RvbU1lc3NhZ2VEaXNwbGF5KGlucHV0LG9wdGlvbnMpe3ZhciB2YWxpZGF0aW9uRXJyb3JDbGFzcz1vcHRpb25zLnZhbGlkYXRpb25FcnJvckNsYXNzLHZhbGlkYXRpb25FcnJvclBhcmVudENsYXNzPW9wdGlvbnMudmFsaWRhdGlvbkVycm9yUGFyZW50Q2xhc3MsZXJyb3JQbGFjZW1lbnQ9b3B0aW9ucy5lcnJvclBsYWNlbWVudDtmdW5jdGlvbiBjaGVja1ZhbGlkaXR5KG9wdGlvbnMpe3ZhciBpbnNlcnRFcnJvcj1vcHRpb25zLmluc2VydEVycm9yO3ZhciBwYXJlbnROb2RlPWlucHV0LnBhcmVudE5vZGU7dmFyIGVycm9yTm9kZT1wYXJlbnROb2RlLnF1ZXJ5U2VsZWN0b3IoXCIuXCIrdmFsaWRhdGlvbkVycm9yQ2xhc3MpfHxkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO2lmKCFpbnB1dC52YWxpZGl0eS52YWxpZCYmaW5wdXQudmFsaWRhdGlvbk1lc3NhZ2Upe2Vycm9yTm9kZS5jbGFzc05hbWU9dmFsaWRhdGlvbkVycm9yQ2xhc3M7ZXJyb3JOb2RlLnRleHRDb250ZW50PWlucHV0LnZhbGlkYXRpb25NZXNzYWdlO2lmKGluc2VydEVycm9yKXtlcnJvclBsYWNlbWVudD09PVwiYmVmb3JlXCI/KDAsX3V0aWwuaW5zZXJ0QmVmb3JlKShpbnB1dCxlcnJvck5vZGUpOigwLF91dGlsLmluc2VydEFmdGVyKShpbnB1dCxlcnJvck5vZGUpO3BhcmVudE5vZGUuY2xhc3NMaXN0LmFkZCh2YWxpZGF0aW9uRXJyb3JQYXJlbnRDbGFzcyl9fWVsc2V7cGFyZW50Tm9kZS5jbGFzc0xpc3QucmVtb3ZlKHZhbGlkYXRpb25FcnJvclBhcmVudENsYXNzKTtlcnJvck5vZGUucmVtb3ZlKCl9fWlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLGZ1bmN0aW9uKCl7Y2hlY2tWYWxpZGl0eSh7aW5zZXJ0RXJyb3I6ZmFsc2V9KX0pO2lucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnZhbGlkXCIsZnVuY3Rpb24oZSl7ZS5wcmV2ZW50RGVmYXVsdCgpO2NoZWNrVmFsaWRpdHkoe2luc2VydEVycm9yOnRydWV9KX0pfXZhciBkZWZhdWx0T3B0aW9ucz17aW52YWxpZENsYXNzOlwiaW52YWxpZFwiLHZhbGlkYXRpb25FcnJvckNsYXNzOlwidmFsaWRhdGlvbi1lcnJvclwiLHZhbGlkYXRpb25FcnJvclBhcmVudENsYXNzOlwiaGFzLXZhbGlkYXRpb24tZXJyb3JcIixjdXN0b21NZXNzYWdlczp7fSxlcnJvclBsYWNlbWVudDpcImJlZm9yZVwifTtmdW5jdGlvbiB2YWxpZEZvcm0oZWxlbWVudCxvcHRpb25zKXtpZighZWxlbWVudHx8IWVsZW1lbnQubm9kZU5hbWUpe3Rocm93IG5ldyBFcnJvcihcIkZpcnN0IGFyZyB0byB2YWxpZEZvcm0gbXVzdCBiZSBhIGZvcm0sIGlucHV0LCBzZWxlY3QsIG9yIHRleHRhcmVhXCIpfXZhciBpbnB1dHM9dm9pZCAwO3ZhciB0eXBlPWVsZW1lbnQubm9kZU5hbWUudG9Mb3dlckNhc2UoKTtvcHRpb25zPSgwLF91dGlsLmRlZmF1bHRzKShvcHRpb25zLGRlZmF1bHRPcHRpb25zKTtpZih0eXBlPT09XCJmb3JtXCIpe2lucHV0cz1lbGVtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbnB1dCwgc2VsZWN0LCB0ZXh0YXJlYVwiKTtmb2N1c0ludmFsaWRJbnB1dChlbGVtZW50LGlucHV0cyl9ZWxzZSBpZih0eXBlPT09XCJpbnB1dFwifHx0eXBlPT09XCJzZWxlY3RcInx8dHlwZT09PVwidGV4dGFyZWFcIil7aW5wdXRzPVtlbGVtZW50XX1lbHNle3Rocm93IG5ldyBFcnJvcihcIk9ubHkgZm9ybSwgaW5wdXQsIHNlbGVjdCwgb3IgdGV4dGFyZWEgZWxlbWVudHMgYXJlIHN1cHBvcnRlZFwiKX12YWxpZEZvcm1JbnB1dHMoaW5wdXRzLG9wdGlvbnMpfWZ1bmN0aW9uIGZvY3VzSW52YWxpZElucHV0KGZvcm0saW5wdXRzKXt2YXIgZm9jdXNGaXJzdD0oMCxfdXRpbC5kZWJvdW5jZSkoMTAwLGZ1bmN0aW9uKCl7dmFyIGludmFsaWROb2RlPWZvcm0ucXVlcnlTZWxlY3RvcihcIjppbnZhbGlkXCIpO2lmKGludmFsaWROb2RlKWludmFsaWROb2RlLmZvY3VzKCl9KTsoMCxfdXRpbC5mb3JFYWNoKShpbnB1dHMsZnVuY3Rpb24oaW5wdXQpe3JldHVybiBpbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiaW52YWxpZFwiLGZvY3VzRmlyc3QpfSl9ZnVuY3Rpb24gdmFsaWRGb3JtSW5wdXRzKGlucHV0cyxvcHRpb25zKXt2YXIgaW52YWxpZENsYXNzPW9wdGlvbnMuaW52YWxpZENsYXNzLGN1c3RvbU1lc3NhZ2VzPW9wdGlvbnMuY3VzdG9tTWVzc2FnZXM7KDAsX3V0aWwuZm9yRWFjaCkoaW5wdXRzLGZ1bmN0aW9uKGlucHV0KXt0b2dnbGVJbnZhbGlkQ2xhc3MoaW5wdXQsaW52YWxpZENsYXNzKTtoYW5kbGVDdXN0b21NZXNzYWdlcyhpbnB1dCxjdXN0b21NZXNzYWdlcyk7aGFuZGxlQ3VzdG9tTWVzc2FnZURpc3BsYXkoaW5wdXQsb3B0aW9ucyl9KX19LHtcIi4vdXRpbFwiOjJ9XX0se30sWzFdKTsiLCIvLyBNaW5uUG9zdCBHaXZpbmcgcGx1Z2luXG4vLyB0aGUgc2VtaS1jb2xvbiBiZWZvcmUgZnVuY3Rpb24gaW52b2NhdGlvbiBpcyBhIHNhZmV0eSBuZXQgYWdhaW5zdCBjb25jYXRlbmF0ZWRcbi8vIHNjcmlwdHMgYW5kL29yIG90aGVyIHBsdWdpbnMgd2hpY2ggbWF5IG5vdCBiZSBjbG9zZWQgcHJvcGVybHkuXG47KGZ1bmN0aW9uICggJCwgd2luZG93LCBkb2N1bWVudCwgdW5kZWZpbmVkICkge1xuXG4gIC8vIHVuZGVmaW5lZCBpcyB1c2VkIGhlcmUgYXMgdGhlIHVuZGVmaW5lZCBnbG9iYWwgdmFyaWFibGUgaW4gRUNNQVNjcmlwdCAzIGlzXG4gIC8vIG11dGFibGUgKGllLiBpdCBjYW4gYmUgY2hhbmdlZCBieSBzb21lb25lIGVsc2UpLiB1bmRlZmluZWQgaXNuJ3QgcmVhbGx5IGJlaW5nXG4gIC8vIHBhc3NlZCBpbiBzbyB3ZSBjYW4gZW5zdXJlIHRoZSB2YWx1ZSBvZiBpdCBpcyB0cnVseSB1bmRlZmluZWQuIEluIEVTNSwgdW5kZWZpbmVkXG4gIC8vIGNhbiBubyBsb25nZXIgYmUgbW9kaWZpZWQuXG5cbiAgLy8gd2luZG93IGFuZCBkb2N1bWVudCBhcmUgcGFzc2VkIHRocm91Z2ggYXMgbG9jYWwgdmFyaWFibGUgcmF0aGVyIHRoYW4gZ2xvYmFsXG4gIC8vIGFzIHRoaXMgKHNsaWdodGx5KSBxdWlja2VucyB0aGUgcmVzb2x1dGlvbiBwcm9jZXNzIGFuZCBjYW4gYmUgbW9yZSBlZmZpY2llbnRseVxuICAvLyBtaW5pZmllZCAoZXNwZWNpYWxseSB3aGVuIGJvdGggYXJlIHJlZ3VsYXJseSByZWZlcmVuY2VkIGluIHlvdXIgcGx1Z2luKS5cblxuICAvLyBDcmVhdGUgdGhlIGRlZmF1bHRzIG9uY2VcbiAgdmFyIHBsdWdpbk5hbWUgPSAnbWlubnBvc3RfZ2l2aW5nJyxcbiAgZGVmYXVsdHMgPSB7XG4gICAgJ2RlYnVnJyA6IGZhbHNlLCAvLyB0aGlzIGNhbiBiZSBzZXQgdG8gdHJ1ZSBvbiBwYWdlIGxldmVsIG9wdGlvbnNcbiAgICAnc3RyaXBlX3B1Ymxpc2hhYmxlX2tleScgOiAnJyxcbiAgICAncGxhaWRfZW52JyA6ICcnLFxuICAgICdwbGFpZF9saW5rJyA6ICcjYXV0aG9yaXplLWFjaCcsXG4gICAgJ21pbm5wb3N0X3Jvb3QnIDogJ2h0dHBzOi8vd3d3Lm1pbm5wb3N0LmNvbScsXG4gICAgJ2FuYWx5dGljc190eXBlJyA6ICcnLFxuICAgICdwcm9ncmVzc19zZWxlY3RvcicgOiAnLm0tc3VwcG9ydC1wcm9ncmVzcycsXG4gICAgJ2Zvcm1fc2VsZWN0b3InIDogJy5tLWZvcm0nLFxuICAgICdkb25hdGVfZm9ybV9zZWxlY3Rvcic6ICcjZG9uYXRlJyxcbiAgICAnY29uZmlybV9mb3JtX3NlbGVjdG9yJyA6ICcjY29uZmlybScsXG4gICAgJ2ZpbmlzaF9zZWN0aW9uX3NlbGVjdG9yJyA6ICcjcGFuZWwtLWNvbmZpcm1hdGlvbicsXG4gICAgJ3BheV9jY19wcm9jZXNzaW5nX3NlbGVjdG9yJyA6ICdpbnB1dFtuYW1lPVwicGF5X2ZlZXNcIl0nLFxuICAgICdmZWVfYW1vdW50JyA6ICcucHJvY2Vzc2luZy1hbW91bnQnLFxuICAgICdsZXZlbF9hbW91bnRfc2VsZWN0b3InIDogJyNwYW5lbC0tcGF5IC5hbW91bnQgLmxldmVsLWFtb3VudCcsIC8vIHdlIGNhbiBtYXliZSBnZXQgcmlkIG9mIHRoaXNcbiAgICAnb3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yJyA6ICdbbmFtZT1cImFtb3VudFwiXScsXG4gICAgJ2dpZnRfZGVsaXZlcnlfbWV0aG9kX3NlbGVjdG9yJyA6ICdbbmFtZT1cImdpZnRfZGVsaXZlcnlfbWV0aG9kXCJdJyxcbiAgICAnZmFpcl9tYXJrZXRfdmFsdWVfc2VsZWN0b3InIDogJyNmYWlyX21hcmtldF92YWx1ZScsXG4gICAgJ2Z1bGxfYW1vdW50X3NlbGVjdG9yJyA6ICcuZnVsbC1hbW91bnQnLFxuICAgICdpbnN0YWxsbWVudF9wZXJpb2Rfc2VsZWN0b3InIDogJ1tuYW1lPVwiaW5zdGFsbG1lbnRfcGVyaW9kXCJdJyxcbiAgICAnbmFtZV9zZWxlY3RvcicgOiAnLm0tZm9ybS1pdGVtLWRpc3BsYXktbmFtZScsXG4gICAgJ2luX2hvbm9yX29yX21lbW9yeV9maWVsZF9zZWxlY3RvcicgOiAnLm0tZm9ybS1pdGVtLWhvbm9yLW1lbW9yeScsXG4gICAgJ2hvbm9yX29yX21lbW9yeV9jaG9vc2VyJyA6ICdpbnB1dFtuYW1lPVwiaW5faG9ub3Jfb3JfbWVtb3J5XCJdJywgLy8gcmFkaW8gZmllbGRzXG4gICAgJ2hvbm9yX3R5cGVfc2VsZWN0b3InIDogJy5hLWhvbm9yLXR5cGUnLCAvLyBzcGFuIGluc2lkZSBsYWJlbFxuICAgICdob25vcl9tZW1vcnlfaW5wdXRfZ3JvdXAnIDogJy5hLWhvbm9yLW9yLW1lbW9yeScsIC8vIGhvbGRzIHRoZSBmb3JtIGZpZWxkXG4gICAgJ2Fub255bW91c19zZWxlY3RvcicgOiAnI2Fub255bW91cycsXG4gICAgJ3Nob3dfYmlsbGluZ19jb3VudHJ5X3NlbGVjdG9yJyA6ICcjYmlsbGluZ19zaG93X2NvdW50cnknLFxuICAgICdiaWxsaW5nX2NvdW50cnlfc2VsZWN0b3InIDogJy5tLWZvcm0taXRlbS1jb3VudHJ5JyxcbiAgICAnc2hvd19zaGlwcGluZ19jb3VudHJ5X3NlbGVjdG9yJyA6ICcjc2hpcHBpbmdfc2hvd19jb3VudHJ5JyxcbiAgICAnc2hpcHBpbmdfY291bnRyeV9zZWxlY3RvcicgOiAnLm0tZm9ybS1pdGVtLXNoaXBwaW5nLWNvdW50cnknLFxuICAgICdzaGlwcGluZ19hZGRyZXNzX3NlbGVjdG9yJyA6ICcubS1mb3JtLWl0ZW0tc2hpcHBpbmctYWRkcmVzcycsXG4gICAgJ3VzZV9mb3Jfc2hpcHBpbmdfc2VsZWN0b3InIDogJyN1c2Vmb3JzaGlwcGluZycsXG4gICAgJ2VtYWlsX2ZpZWxkX3NlbGVjdG9yJyA6ICcjZW1haWwnLFxuICAgICdwYXNzd29yZF9maWVsZF9zZWxlY3RvcicgOiAnI3Bhc3N3b3JkJyxcbiAgICAnZmlyc3RfbmFtZV9maWVsZF9zZWxlY3RvcicgOiAnI2ZpcnN0X25hbWUnLFxuICAgICdsYXN0X25hbWVfZmllbGRfc2VsZWN0b3InIDogJyNsYXN0X25hbWUnLFxuICAgICdiaWxsaW5nX3N0cmVldF9maWVsZF9zZWxlY3RvcicgOiAnI2JpbGxpbmdfc3RyZWV0JyxcbiAgICAnYmlsbGluZ19jaXR5X2ZpZWxkX3NlbGVjdG9yJyA6ICcjYmlsbGluZ19jaXR5JyxcbiAgICAnYmlsbGluZ19zdGF0ZV9maWVsZF9zZWxlY3RvcicgOiAnI2JpbGxpbmdfc3RhdGUnLFxuICAgICdiaWxsaW5nX3ppcF9maWVsZF9zZWxlY3Rvcic6ICcjYmlsbGluZ196aXAnLFxuICAgICdiaWxsaW5nX2NvdW50cnlfZmllbGRfc2VsZWN0b3InIDogJyNiaWxsaW5nX2NvdW50cnknLFxuICAgICdzaGlwcGluZ19zdGF0ZV9maWVsZF9zZWxlY3RvcicgOiAnI3NoaXBwaW5nX3N0YXRlJyxcbiAgICAnc2hpcHBpbmdfemlwX2ZpZWxkX3NlbGVjdG9yJzogJyNzaGlwcGluZ196aXAnLFxuICAgICdzaGlwcGluZ19jb3VudHJ5X2ZpZWxkX3NlbGVjdG9yJyA6ICcjc2hpcHBpbmdfY291bnRyeScsXG4gICAgJ2NyZWF0ZV9tcF9zZWxlY3RvcicgOiAnI2NyZWF0ZW1wYWNjb3VudCcsXG4gICAgJ3Bhc3N3b3JkX3NlbGVjdG9yJyA6ICcubS1mb3JtLWl0ZW0tcGFzc3dvcmQnLFxuICAgICdhZGRpdGlvbmFsX2Ftb3VudF9maWVsZCcgOiAnI2FkZGl0aW9uYWxfZG9uYXRpb24nLFxuICAgICdzaGlwcGluZ19hbW91bnRfZmllbGQnOiAnW25hbWU9XCJzaGlwcGluZ19jb3N0XCJdJyxcbiAgICAnc2hpcHBpbmdfc2VsZWN0b3InIDogJ2ZpZWxkc2V0Lm0tc2hpcHBpbmctaW5mb3JtYXRpb24nLFxuICAgICdjaG9vc2VfcGF5bWVudCcgOiAnI2Nob29zZS1wYXltZW50LW1ldGhvZCcsXG4gICAgJ3BheW1lbnRfbWV0aG9kX3NlbGVjdG9yJyA6ICcucGF5bWVudC1tZXRob2QnLFxuICAgICdjY19udW1fc2VsZWN0b3InIDogJyNjYXJkLW51bWJlcicsXG4gICAgJ2NjX2V4cF9zZWxlY3RvcicgOiAnI2NhcmQtZXhwaXJ5JyxcbiAgICAnY2NfY3ZjX3NlbGVjdG9yJyA6ICcjY2FyZC1jdmMnLFxuICAgICdwYXlfYnV0dG9uX3NlbGVjdG9yJyA6ICcuYS1idXR0b24tcGF5JyxcbiAgICAnb3BwX2lkX3NlbGVjdG9yJyA6ICcjbG9ja19rZXknLCAvLyB3ZSB1c2UgdGhpcyB2YWx1ZSBhcyB0aGUgR29vZ2xlIEFuYWx5dGljcyB0cmFuc2FjdGlvbiBJRFxuICAgICduZXdzbGV0dGVyX2dyb3VwX3NlbGVjdG9yJyA6ICcuc3VwcG9ydC1uZXdzbGV0dGVycydcbiAgfTsgLy8gZW5kIGRlZmF1bHRzXG5cbiAgLy8gVGhlIGFjdHVhbCBwbHVnaW4gY29uc3RydWN0b3JcbiAgZnVuY3Rpb24gUGx1Z2luKCBlbGVtZW50LCBvcHRpb25zICkge1xuXG4gICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcblxuICAgIC8vIGpRdWVyeSBoYXMgYW4gZXh0ZW5kIG1ldGhvZCB3aGljaCBtZXJnZXMgdGhlIGNvbnRlbnRzIG9mIHR3byBvclxuICAgIC8vIG1vcmUgb2JqZWN0cywgc3RvcmluZyB0aGUgcmVzdWx0IGluIHRoZSBmaXJzdCBvYmplY3QuIFRoZSBmaXJzdCBvYmplY3RcbiAgICAvLyBpcyBnZW5lcmFsbHkgZW1wdHkgYXMgd2UgZG9uJ3Qgd2FudCB0byBhbHRlciB0aGUgZGVmYXVsdCBvcHRpb25zIGZvclxuICAgIC8vIGZ1dHVyZSBpbnN0YW5jZXMgb2YgdGhlIHBsdWdpblxuICAgIHRoaXMub3B0aW9ucyA9ICQuZXh0ZW5kKCB7fSwgZGVmYXVsdHMsIG9wdGlvbnMgKTtcblxuICAgIHRoaXMuX2RlZmF1bHRzID0gZGVmYXVsdHM7XG4gICAgdGhpcy5fbmFtZSA9IHBsdWdpbk5hbWU7XG5cbiAgICB0aGlzLmluaXQoKTtcbiAgfSAvLyBlbmQgY29uc3RydWN0b3JcblxuICBQbHVnaW4ucHJvdG90eXBlID0ge1xuXG4gICAgaW5pdDogZnVuY3Rpb24ocmVzZXQsIGFtb3VudCkge1xuXG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoICduby1qcycgKTtcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LmFkZCggJ2pzJyApO1xuXG4gICAgICAvLyBQbGFjZSBpbml0aWFsaXphdGlvbiBsb2dpYyBoZXJlXG4gICAgICAvLyBZb3UgYWxyZWFkeSBoYXZlIGFjY2VzcyB0byB0aGUgRE9NIGVsZW1lbnQgYW5kXG4gICAgICAvLyB0aGUgb3B0aW9ucyB2aWEgdGhlIGluc3RhbmNlLCBlLmcuIHRoaXMuZWxlbWVudFxuICAgICAgLy8gYW5kIHRoaXMub3B0aW9uc1xuICAgICAgLy8geW91IGNhbiBhZGQgbW9yZSBmdW5jdGlvbnMgbGlrZSB0aGUgb25lIGJlbG93IGFuZFxuICAgICAgLy8gY2FsbCB0aGVtIGxpa2Ugc286IHRoaXMueW91ck90aGVyRnVuY3Rpb24odGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpLlxuXG4gICAgICAvLyBtb2RpZnkgb3B0aW9ucyBhcyBuZWVkZWRcbiAgICAgIC8vdmFyIHRoaXMub3B0aW9ucy5hbW91bnQgPSAnJztcbiAgICAgIGlmIChyZXNldCAhPT0gdHJ1ZSkge1xuICAgICAgICB0aGlzLm9wdGlvbnMuYW1vdW50ID0gcGFyc2VGbG9hdCgkKHRoaXMub3B0aW9ucy5sZXZlbF9hbW91bnRfc2VsZWN0b3IsIHRoaXMuZWxlbWVudCkudGV4dCgpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5hbW91bnQgPSBhbW91bnQ7XG4gICAgICB9XG4gICAgICB0aGlzLm9wdGlvbnMub3JpZ2luYWxfYW1vdW50ICAgICA9IHBhcnNlSW50KCQodGhpcy5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudF9zZWxlY3RvciwgdGhpcy5lbGVtZW50KS52YWwoKSwgMTApO1xuICAgICAgdGhpcy5vcHRpb25zLnByb2Nlc3NpbmdfZmVlICAgICAgPSAoTWF0aC5yb3VuZChwYXJzZUZsb2F0KHRoaXMub3B0aW9ucy5mZWVfYW1vdW50KSpNYXRoLnBvdygxMCwyKSkvTWF0aC5wb3coMTAsMikpLnRvRml4ZWQoMik7XG4gICAgICB0aGlzLm9wdGlvbnMucHJvY2Vzc2luZ19mZWVfdGV4dCA9IHRoaXMub3B0aW9ucy5wcm9jZXNzaW5nX2ZlZTtcbiAgICAgIHRoaXMub3B0aW9ucy5jcmVhdGVfYWNjb3VudCAgICAgID0gZmFsc2U7XG5cbiAgICAgIHZhciBidXR0b25fdGV4dCA9ICQodGhpcy5vcHRpb25zLnBheV9idXR0b25fc2VsZWN0b3IpLnRleHQoKTtcbiAgICAgIHRoaXMub3B0aW9ucy5idXR0b25fdGV4dCA9IGJ1dHRvbl90ZXh0O1xuXG4gICAgICB0aGlzLnN0cmlwZSA9IFN0cmlwZSh0aGlzLm9wdGlvbnMuc3RyaXBlX3B1Ymxpc2hhYmxlX2tleSk7XG4gICAgICB0aGlzLmVsZW1lbnRzID0gdGhpcy5zdHJpcGUuZWxlbWVudHMoe1xuICAgICAgICBmb250czogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIC8vIGludGVncmF0ZSB5b3VyIGZvbnQgaW50byBzdHJpcGVcbiAgICAgICAgICAgIGNzc1NyYzogJ2h0dHBzOi8vdXNlLnR5cGVraXQubmV0L2N4ajdmemcuY3NzJyxcbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH0pO1xuXG4gICAgICBpZiAodGhpcy5vcHRpb25zLmRlYnVnID09PSB0cnVlKSB7XG4gICAgICAgIHRoaXMuZGVidWcodGhpcy5vcHRpb25zKTtcbiAgICAgICAgLy8gcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBjYWxsIGZ1bmN0aW9uc1xuICAgICAgdGhpcy5hbmFseXRpY3NUcmFja2luZyh0aGlzLm9wdGlvbnMpOyAvLyB0cmFjayBhbmFseXRpY3MgZXZlbnRzXG4gICAgICB0aGlzLmFtb3VudEFzUmFkaW8odGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBpZiB0aGUgYW1vdW50IGZpZWxkIGlzIGEgcmFkaW8gYnV0dG9uXG4gICAgICB0aGlzLmFtb3VudFVwZGF0ZWQodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBpZiB0aGUgYW1vdW50IHRleHQgZmllbGQgY2FuIGNoYW5nZVxuXG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMucGF5X2NjX3Byb2Nlc3Npbmdfc2VsZWN0b3IpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5jcmVkaXRDYXJkUHJvY2Vzc2luZ0ZlZXModGhpcy5vcHRpb25zKTsgLy8gcHJvY2Vzc2luZyBmZWVzXG4gICAgICB9XG4gICAgICBcbiAgICAgIC8vIHRoZSBtYWluIGZvcm0gSUQuIHRoaXMgaXMgbm90IHVzZWQgZm9yIGNhbmNlbGxpbmdcbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLmRvbmF0ZUFub255bW91c2x5KHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gYW5vbnltb3VzXG4gICAgICAgIHRoaXMuaG9ub3JPck1lbW9yeVRvZ2dsZSh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIGluIGhvbm9yIG9yIGluIG1lbW9yeSBvZiBzb21lb25lXG4gICAgICAgIHRoaXMub3V0c2lkZVVuaXRlZFN0YXRlcyh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIG91dHNpZGUgVVNcbiAgICAgICAgdGhpcy5zaGlwcGluZ0FkZHJlc3ModGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBzaGlwcGluZyBhZGRyZXNzXG4gICAgICAgIHRoaXMuYWxsb3dNaW5ucG9zdEFjY291bnQodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBvcHRpb24gZm9yIGNyZWF0aW5nIG1pbm5wb3N0IGFjY291bnRcbiAgICAgICAgdGhpcy5wYXltZW50UmVxdWVzdEJ1dHRvbih0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIGNyZWF0ZSBwYXltZW50cmVxdWVzdCBidXR0b25cbiAgICAgICAgdGhpcy5jaG9vc2VQYXltZW50TWV0aG9kKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gc3dpdGNoIGJldHdlZW4gY2FyZCBhbmQgYWNoXG4gICAgICAgIHRoaXMuY3JlZGl0Q2FyZEZpZWxkcyh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIGRvIHN0dWZmIHdpdGggdGhlIGNyZWRpdCBjYXJkIGZpZWxkc1xuICAgICAgICB0aGlzLnZhbGlkYXRlU2V0dXAodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBzZXR1cCBob3cgdmFsaWRhdGlvbiBlcnJvcnMgd29ya1xuICAgICAgICB0aGlzLmZvcm1TZXR1cCh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIHZhbGlkYXRlIGFuZCBzdWJtaXQgdGhlIGZvcm1cbiAgICAgIH1cblxuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmNvbmZpcm1fZm9ybV9zZWxlY3RvcikubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLnNob3dOZXdzbGV0dGVyU2V0dGluZ3ModGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpO1xuICAgICAgICB0aGlzLmNvbmZpcm1NZXNzYWdlU3VibWl0KHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gc3VibWl0IHRoZSBzdHVmZiBvbiB0aGUgY29uZmlybWF0aW9uIHBhZ2VcbiAgICAgIH1cblxuICAgIH0sIC8vIGluaXRcblxuICAgIGRlYnVnOiBmdW5jdGlvbihtZXNzYWdlKSB7XG4gICAgICBpZiAodGhpcy5vcHRpb25zLmRlYnVnID09PSB0cnVlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgbWVzc2FnZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhtZXNzYWdlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zb2xlLmRpcihtZXNzYWdlKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zb2xlLmRpcih0aGlzKTtcbiAgICAgIH1cbiAgICB9LCAvLyBkZWJ1Z1xuXG4gICAgYW5hbHl0aWNzVHJhY2tpbmc6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgIHRoaXMuZGVidWcoJ2FuYWx5dGljcyB0eXBlIGlzICcgKyBvcHRpb25zLmFuYWx5dGljc190eXBlKTtcbiAgICAgIHZhciBwcm9ncmVzcyA9ICQob3B0aW9ucy5wcm9ncmVzc19zZWxlY3Rvcik7XG4gICAgICB2YXIgc3RlcDtcbiAgICAgIHZhciBhY3Rpb24gPSAnYmVnaW5fY2hlY2tvdXQnO1xuICAgICAgdmFyIG5hdl9pdGVtX2NvdW50ID0gMDtcbiAgICAgIHZhciBvcHBfaWQgPSAkKG9wdGlvbnMub3BwX2lkX3NlbGVjdG9yKS52YWwoKTtcbiAgICAgIHZhciBwb3N0X3B1cmNoYXNlID0gZmFsc2U7XG4gICAgICBpZiAob3B0aW9ucy5hbmFseXRpY3NfdHlwZSA9PSAnYW5hbHl0aWNzanMnKSB7XG4gICAgICAgIGdhKCAncmVxdWlyZScsICdlYycgKTtcbiAgICAgIH1cbiAgICAgIGlmIChwcm9ncmVzcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIG5hdl9pdGVtX2NvdW50ID0gJCgnbGknLCBwcm9ncmVzcykubGVuZ3RoOyAvLyBsZW5ndGggaXMgbm90IHplcm8gYmFzZWRcbiAgICAgICAgc3RlcCA9ICQoJ2xpIC5hY3RpdmUnLCBwcm9ncmVzcykucGFyZW50KCkuaW5kZXgoKSArIDE7IC8vIGluZGV4IGlzIHplcm8gYmFzZWRcbiAgICAgIH1cbiAgICAgIC8vIHRoZXJlIGlzIGEgcHJvZ3Jlc3MgbWVudSwgQU5EIHRoZXJlIElTIE5PVCBhIGNvbmZpcm0gZm9ybSBzZWxlY3RvclxuICAgICAgLy8gaWYgdGhhdCBpcyB0aGUgY2FzZSwgd2UncmUgbm90IG9uIHRoZSBwdXJjaGFzZSBzdGVwXG4gICAgICBpZiAocHJvZ3Jlc3MubGVuZ3RoID4gMCAmJiAkKG9wdGlvbnMuY29uZmlybV9mb3JtX3NlbGVjdG9yKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgLy8gdGhlIGFjdGl2ZSB0YWIgbWF0Y2hlcyB0aGUgY291bnQgb2YgaXRlbXMgQU5EIHRoZXJlIGlzIE5PVCBhIGNvbmZpcm0gZm9ybSB0byBiZSBzdWJtaXR0ZWRcbiAgICAgICAgLy8gdGhhdCBtZWFucyB3ZSdyZSBvbiBhIHBvc3QgcHVyY2hhc2Ugc3RlcC5cbiAgICAgICAgaWYgKHN0ZXAgPT09IG5hdl9pdGVtX2NvdW50ICYmICQob3B0aW9ucy5jb25maXJtX2Zvcm1fc2VsZWN0b3IpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgIHN0ZXAgPSBzdGVwICsgMTtcbiAgICAgICAgICBwb3N0X3B1cmNoYXNlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChwcm9ncmVzcy5sZW5ndGggPiAwICYmICQob3B0aW9ucy5jb25maXJtX2Zvcm1fc2VsZWN0b3IpLmxlbmd0aCA+IDAgfHwgJChvcHRpb25zLmZpbmlzaF9zZWN0aW9uX3NlbGVjdG9yKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIC8vIHdlIGFyZSBvbiB0aGUgY29uZmlybSBmb3JtIHNlbGVjdG9yIGFuZCB0aGVyZSBpcyBhIHByb2dyZXNzIG1lYXN1cmVcbiAgICAgICAgLy8gT1IsIHdlIGFyZSBvbiB0aGUgZmluaXNoIHNlbGVjdG9yIGFuZCB0aGVyZSBpcyBOT1QgYSBwcm9ncmVzcyBtZWFzdXJlXG4gICAgICAgIC8vIHRoZXNlIG1lYW4gdGhlIHVzZXIganVzdCBwdXJjaGFzZWQuXG4gICAgICAgIGFjdGlvbiA9ICdwdXJjaGFzZSc7XG4gICAgICB9IGVsc2UgaWYgKHByb2dyZXNzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLmRlYnVnKCAnc3RlcCBpcyAnICsgc3RlcCArICcgYW5kIG5hdiBpdGVtIGNvdW50IGlzICcgKyBuYXZfaXRlbV9jb3VudCArICcgYW5kIG9wcCBpZCBpcyAnICsgb3BwX2lkICsgJyBhbmQgcG9zdCBwdXJjaGFzZSBpcyAnICsgcG9zdF9wdXJjaGFzZSApO1xuICAgICAgdGhpcy5hbmFseXRpY3NUcmFja2luZ1N0ZXAoc3RlcCwgYWN0aW9uLCBwb3N0X3B1cmNoYXNlKTtcbiAgICB9LCAvLyBhbmFseXRpY3NUcmFja2luZ1xuXG4gICAgYW5hbHl0aWNzVHJhY2tpbmdTdGVwOiBmdW5jdGlvbihzdGVwLCBhY3Rpb24sIHBvc3RfcHVyY2hhc2UpIHtcbiAgICAgIHZhciBwcm9ncmVzcyA9ICQodGhpcy5vcHRpb25zLnByb2dyZXNzX3NlbGVjdG9yKTtcbiAgICAgIHZhciBhbW91bnQgPSAkKHRoaXMub3B0aW9ucy5vcmlnaW5hbF9hbW91bnRfc2VsZWN0b3IpLnZhbCgpO1xuICAgICAgdmFyIG9wcF9pZCA9ICQodGhpcy5vcHRpb25zLm9wcF9pZF9zZWxlY3RvcikudmFsKCk7XG4gICAgICB2YXIgaW5zdGFsbG1lbnRfcGVyaW9kID0gJ29uZS10aW1lJztcbiAgICAgIHZhciBsZXZlbDtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5pbnN0YWxsbWVudF9wZXJpb2Rfc2VsZWN0b3IpLmxlbmd0aCA+IDAgKSB7XG4gICAgICAgIGluc3RhbGxtZW50X3BlcmlvZCA9ICQodGhpcy5vcHRpb25zLmluc3RhbGxtZW50X3BlcmlvZF9zZWxlY3RvcikudmFsKCk7XG4gICAgICB9XG4gICAgICAvLyBpZiB3ZSdyZSBub3QgYWZ0ZXIgdGhlIHB1cmNoYXNlLCB1c2UgYWRkUHJvZHVjdFxuICAgICAgLy9pZiAocHJvZ3Jlc3MubGVuZ3RoID4gMCAmJiBwb3N0X3B1cmNoYXNlICE9PSB0cnVlKSB7XG4gICAgICBpZiAocHJvZ3Jlc3MubGVuZ3RoID4gMCkge1xuICAgICAgICB2YXIgZGF0YSA9IHtcbiAgICAgICAgICBhbW91bnQ6IGFtb3VudCxcbiAgICAgICAgICBpbnN0YWxsbWVudF9wZXJpb2Q6IGluc3RhbGxtZW50X3BlcmlvZFxuICAgICAgICB9O1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIHVybDogJy9jYWxjdWxhdGUtbWVtYmVyLWxldmVsLycsXG4gICAgICAgICAgZGF0YTogZGF0YVxuICAgICAgICB9KS5kb25lKGZ1bmN0aW9uKCBkYXRhICkge1xuICAgICAgICAgIGlmICgkKGRhdGEubGV2ZWwpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGxldmVsID0gZGF0YS5sZXZlbC5sZXZlbDtcbiAgICAgICAgICAgIHRoYXQuZGVidWcoJ2NyZWF0ZSBwcm9kdWN0IG9iamVjdDogaWQgaXMgJyArICdtaW5ucG9zdF8nICsgbGV2ZWwudG9Mb3dlckNhc2UoKSArICdfbWVtYmVyc2hpcCcgKyAnIGFuZCBuYW1lIGlzICcgKyAnTWlublBvc3QgJyArIGxldmVsLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgbGV2ZWwuc2xpY2UoMSkgKyAnIE1lbWJlcnNoaXAnICsgJyBhbmQgdmFyaWFudCBpcyAnICsgaW5zdGFsbG1lbnRfcGVyaW9kLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgaW5zdGFsbG1lbnRfcGVyaW9kLnNsaWNlKDEpKTtcbiAgICAgICAgICAgIHZhciBwcm9kdWN0ID0ge1xuICAgICAgICAgICAgICAnaWQnOiAnbWlubnBvc3RfJyArIGxldmVsLnRvTG93ZXJDYXNlKCkgKyAnX21lbWJlcnNoaXAnLFxuICAgICAgICAgICAgICAnbmFtZSc6ICdNaW5uUG9zdCAnICsgbGV2ZWwuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBsZXZlbC5zbGljZSgxKSArICcgTWVtYmVyc2hpcCcsXG4gICAgICAgICAgICAgICdjYXRlZ29yeSc6ICdEb25hdGlvbicsXG4gICAgICAgICAgICAgICdicmFuZCc6ICdNaW5uUG9zdCcsXG4gICAgICAgICAgICAgICd2YXJpYW50JzogaW5zdGFsbG1lbnRfcGVyaW9kLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgaW5zdGFsbG1lbnRfcGVyaW9kLnNsaWNlKDEpLFxuICAgICAgICAgICAgICAncHJpY2UnOiB0aGF0LmdldFRvdGFsQW1vdW50KGFtb3VudCksXG4gICAgICAgICAgICAgICdxdWFudGl0eSc6IDFcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAodGhhdC5vcHRpb25zLmFuYWx5dGljc190eXBlID09ICdndGFnanMnKSB7XG4gICAgICAgICAgICAgIGd0YWcoJ2V2ZW50JywgJ2NoZWNrb3V0X3Byb2dyZXNzJywge1xuICAgICAgICAgICAgICAgIFwidmFsdWVcIjogdGhhdC5nZXRUb3RhbEFtb3VudChhbW91bnQpLFxuICAgICAgICAgICAgICAgIFwiaXRlbXNcIjogW3Byb2R1Y3RdLFxuICAgICAgICAgICAgICAgIFwiY2hlY2tvdXRfc3RlcFwiOiBzdGVwLFxuICAgICAgICAgICAgICAgIFwiY2hlY2tvdXRfb3B0aW9uXCI6IGFjdGlvbixcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoYXQub3B0aW9ucy5hbmFseXRpY3NfdHlwZSA9PSAnYW5hbHl0aWNzanMnKSB7XG4gICAgICAgICAgICAgIGdhKCdlYzphZGRQcm9kdWN0JywgcHJvZHVjdCk7XG4gICAgICAgICAgICAgIGdhKCdlYzpzZXRBY3Rpb24nLCAnY2hlY2tvdXQnLCB7XG4gICAgICAgICAgICAgICAgJ3N0ZXAnOiBzdGVwLFxuICAgICAgICAgICAgICAgICdvcHRpb24nOiBhY3Rpb25cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChhY3Rpb24gPT09ICdwdXJjaGFzZScpIHtcbiAgICAgICAgICAgICAgdGhhdC5kZWJ1ZygnYWRkIGEgcHVyY2hhc2UgYWN0aW9uLiBzdGVwIGlzICcgKyBzdGVwICsgJyBhbmQgYWN0aW9uIGlzICcgKyBhY3Rpb24pO1xuICAgICAgICAgICAgICBpZiAodGhhdC5vcHRpb25zLmFuYWx5dGljc190eXBlID09ICdndGFnanMnKSB7XG4gICAgICAgICAgICAgICAgZ3RhZygnZXZlbnQnLCBhY3Rpb24sIHtcbiAgICAgICAgICAgICAgICAgIFwidHJhbnNhY3Rpb25faWRcIjogb3BwX2lkLCAvLyBUcmFuc2FjdGlvbiBpZCAtIFR5cGU6IHN0cmluZ1xuICAgICAgICAgICAgICAgICAgXCJhZmZpbGlhdGlvblwiOiAnTWlublBvc3QnLCAvLyBTdG9yZSBuYW1lIC0gVHlwZTogc3RyaW5nXG4gICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IHRoYXQuZ2V0VG90YWxBbW91bnQoYW1vdW50KSwgLy8gVG90YWwgUmV2ZW51ZSAtIFR5cGU6IG51bWVyaWNcbiAgICAgICAgICAgICAgICAgIFwiY3VycmVuY3lcIjogXCJVU0RcIixcbiAgICAgICAgICAgICAgICAgIFwiaXRlbXNcIjogW3Byb2R1Y3RdLFxuICAgICAgICAgICAgICAgICAgXCJjaGVja291dF9zdGVwXCI6IHN0ZXBcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGF0Lm9wdGlvbnMuYW5hbHl0aWNzX3R5cGUgPT0gJ2FuYWx5dGljc2pzJykge1xuICAgICAgICAgICAgICAgIGdhKCdlYzpzZXRBY3Rpb24nLCBhY3Rpb24sIHtcbiAgICAgICAgICAgICAgICAgICdpZCc6IG9wcF9pZCwgLy8gVHJhbnNhY3Rpb24gaWQgLSBUeXBlOiBzdHJpbmdcbiAgICAgICAgICAgICAgICAgICdhZmZpbGlhdGlvbic6ICdNaW5uUG9zdCcsIC8vIFN0b3JlIG5hbWUgLSBUeXBlOiBzdHJpbmdcbiAgICAgICAgICAgICAgICAgICdyZXZlbnVlJzogYW1vdW50LCAvLyBUb3RhbCBSZXZlbnVlIC0gVHlwZTogbnVtZXJpY1xuICAgICAgICAgICAgICAgICAgJ3N0ZXAnOiBzdGVwXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgXG4gICAgICAgICAgICBpZiAodGhhdC5vcHRpb25zLmFuYWx5dGljc190eXBlID09ICdndGFnanMnKSB7XG4gICAgICAgICAgICAgIGd0YWcoJ2V2ZW50JywgJ3BhZ2VfdmlldycsIHtcbiAgICAgICAgICAgICAgICBwYWdlX3RpdGxlOiBkb2N1bWVudC50aXRsZSxcbiAgICAgICAgICAgICAgICBwYWdlX3BhdGg6IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZVxuICAgICAgICAgICAgICB9KSAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoYXQub3B0aW9ucy5hbmFseXRpY3NfdHlwZSA9PSAnYW5hbHl0aWNzanMnKSB7XG4gICAgICAgICAgICAgIGdhKCdzZXQnLCB7XG4gICAgICAgICAgICAgICAgcGFnZTogd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLFxuICAgICAgICAgICAgICAgIHRpdGxlOiBkb2N1bWVudC50aXRsZVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgZ2EoJ3NlbmQnLCAncGFnZXZpZXcnLCB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBkYXRhTGF5ZXJcbiAgICAgICAgICAgIGlmICggJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiBkYXRhTGF5ZXIgKSB7XG4gICAgICAgICAgICAgIGRhdGFMYXllci5wdXNoKHsgZWNvbW1lcmNlOiBudWxsIH0pOyAvLyBmaXJzdCwgbWFrZSBzdXJlIHRoZXJlIGFyZW4ndCBtdWx0aXBsZSB0aGluZ3MgaGFwcGVuaW5nLlxuICAgICAgICAgICAgICBkYXRhTGF5ZXIucHVzaCh7XG4gICAgICAgICAgICAgICAgZXZlbnQ6IGFjdGlvbixcbiAgICAgICAgICAgICAgICBlY29tbWVyY2U6IHtcbiAgICAgICAgICAgICAgICAgIGl0ZW1zOiBwcm9kdWN0XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIFxuXG4gICAgfSwgLy8gYW5hbHl0aWNzVHJhY2tpbmdTdGVwXG5cbiAgICBhbW91bnRBc1JhZGlvOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICAvLyB3aGVuIGFtb3VudCBmaWVsZCBpcyBhIHJhZGlvIGJ1dHRvbiwgd2UgbmVlZCB0byBjaGVjayBpdCB3aGVuZXZlciBpdCBjaGFuZ2VzXG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB0aGF0LnNldFJhZGlvQW1vdW50KCQob3B0aW9ucy5vcmlnaW5hbF9hbW91bnRfc2VsZWN0b3IsIGVsZW1lbnQpLCBlbGVtZW50LCBvcHRpb25zKTtcbiAgICAgICQob3B0aW9ucy5vcmlnaW5hbF9hbW91bnRfc2VsZWN0b3IsIGVsZW1lbnQpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgdGhhdC5zZXRSYWRpb0Ftb3VudCgkKHRoaXMpLCBlbGVtZW50LCBvcHRpb25zKTtcbiAgICAgIH0pO1xuICAgIH0sIC8vIGFtb3VudEFzUmFkaW9cblxuICAgIHNldFJhZGlvQW1vdW50OiBmdW5jdGlvbihmaWVsZCwgZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdmFyIHN0cmlwZV9wYXltZW50X3R5cGUgPSB0aGF0LmdldFN0cmlwZVBheW1lbnRUeXBlKCk7XG4gICAgICB2YXIgYW1vdW50ID0gJChvcHRpb25zLm9yaWdpbmFsX2Ftb3VudF9zZWxlY3RvciArICc6Y2hlY2tlZCcsIGVsZW1lbnQpLnZhbCgpO1xuICAgICAgaWYgKGZpZWxkLmlzKCc6cmFkaW8nKSAmJiB0eXBlb2YgYW1vdW50ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBvcHRpb25zLm9yaWdpbmFsX2Ftb3VudCA9IHBhcnNlSW50KGFtb3VudCwgMTApO1xuICAgICAgICB0aGF0LmNhbGN1bGF0ZUZlZXModGhhdC5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCwgc3RyaXBlX3BheW1lbnRfdHlwZSk7XG4gICAgICAgIHRoYXQuc2V0RmFpck1hcmtldFZhbHVlKGZpZWxkKTtcbiAgICAgIH1cbiAgICB9LCAvLyBzZXRSYWRpb0Ftb3VudFxuXG4gICAgYW1vdW50VXBkYXRlZDogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgLy8gd2hlbiBuZXcgYW1vdW50IHRleHQgZmllbGQgY2FuIGNoYW5nZSwgd2UgbmVlZCB0byBjaGFuZ2UgdGhlIGhpZGRlbiBmaWVsZFxuICAgICAgLy8gdGhlcmUgaXMgYWxzbyBwb3RlbnRpYWxseSBhbiBhZGRpdGlvbmFsIGFtb3VudCBmaWVsZCB2YWx1ZSB0byBhZGRcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHZhciBzdHJpcGVfcGF5bWVudF90eXBlID0gdGhhdC5nZXRTdHJpcGVQYXltZW50VHlwZSgpO1xuXG4gICAgICAvLyBzZXQgdGhlIGZhaXIgbWFya2V0IHZhbHVlIGlmIGFwcGxpY2FibGVcbiAgICAgIHZhciBhbW91bnRfc2VsZWN0b3JfZmFpcl9tYXJrZXQgPSAkKG9wdGlvbnMub3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yLCBlbGVtZW50KTtcbiAgICAgIGlmIChhbW91bnRfc2VsZWN0b3JfZmFpcl9tYXJrZXQuaXMoJzpyYWRpbycpKSB7XG4gICAgICAgIGFtb3VudF9zZWxlY3Rvcl9mYWlyX21hcmtldCA9ICQob3B0aW9ucy5vcmlnaW5hbF9hbW91bnRfc2VsZWN0b3IgKyAnOmNoZWNrZWQnLCBlbGVtZW50KTtcbiAgICAgIH1cbiAgICAgIHRoYXQuc2V0RmFpck1hcmtldFZhbHVlKGFtb3VudF9zZWxlY3Rvcl9mYWlyX21hcmtldCk7XG5cbiAgICAgICQob3B0aW9ucy5vcmlnaW5hbF9hbW91bnRfc2VsZWN0b3IsIGVsZW1lbnQpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgdGhhdC5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCA9IHBhcnNlSW50KCQodGhpcywgZWxlbWVudCkudmFsKCksIDEwKTtcbiAgICAgICAgdGhhdC5jYWxjdWxhdGVGZWVzKHRoYXQub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQsIHN0cmlwZV9wYXltZW50X3R5cGUpO1xuICAgICAgICB0aGF0LnNldEZhaXJNYXJrZXRWYWx1ZSgkKHRoaXMsIGVsZW1lbnQpKTtcbiAgICAgIH0pO1xuICAgICAgJChvcHRpb25zLmFkZGl0aW9uYWxfYW1vdW50X2ZpZWxkLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoYXQub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQgPSBwYXJzZUludCgkKG9wdGlvbnMub3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSwgMTApO1xuICAgICAgICB0aGF0LmNhbGN1bGF0ZUZlZXModGhhdC5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCwgc3RyaXBlX3BheW1lbnRfdHlwZSk7XG4gICAgICB9KTtcbiAgICAgICQob3B0aW9ucy5naWZ0X2RlbGl2ZXJ5X21ldGhvZF9zZWxlY3RvciwgZWxlbWVudCkuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGF0Lm9wdGlvbnMub3JpZ2luYWxfYW1vdW50ID0gcGFyc2VJbnQoJChvcHRpb25zLm9yaWdpbmFsX2Ftb3VudF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksIDEwKTtcbiAgICAgICAgdGhhdC5jYWxjdWxhdGVGZWVzKHRoYXQub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQsIHN0cmlwZV9wYXltZW50X3R5cGUpO1xuICAgICAgfSk7XG5cbiAgICB9LCAvLyBhbW91bnRVcGRhdGVkXG5cbiAgICBnZXRUb3RhbEFtb3VudDogZnVuY3Rpb24oYW1vdW50KSB7XG4gICAgICBhbW91bnQgPSAodHlwZW9mIGFtb3VudCAhPT0gJ3VuZGVmaW5lZCcpID8gIGFtb3VudCA6IHRoaXMub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQ7XG4gICAgICB2YXIgdG90YWxfYW1vdW50ID0gYW1vdW50O1xuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmFkZGl0aW9uYWxfYW1vdW50X2ZpZWxkKS5sZW5ndGggPiAwICYmICQodGhpcy5vcHRpb25zLmFkZGl0aW9uYWxfYW1vdW50X2ZpZWxkKS52YWwoKSA+IDApIHtcbiAgICAgICAgdmFyIGFkZGl0aW9uYWxfYW1vdW50ID0gJCh0aGlzLm9wdGlvbnMuYWRkaXRpb25hbF9hbW91bnRfZmllbGQpLnZhbCgpO1xuICAgICAgICB0b3RhbF9hbW91bnQgPSBwYXJzZUludChhZGRpdGlvbmFsX2Ftb3VudCwgMTApICsgcGFyc2VJbnQoYW1vdW50LCAxMCk7IFxuICAgICAgfVxuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLnNoaXBwaW5nX2Ftb3VudF9maWVsZCkubGVuZ3RoID4gMCAmJiAkKHRoaXMub3B0aW9ucy5zaGlwcGluZ19hbW91bnRfZmllbGQpLnZhbCgpID4gMCkge1xuICAgICAgICB2YXIgc2hpcHBpbmdfYW1vdW50ID0gJCh0aGlzLm9wdGlvbnMuc2hpcHBpbmdfYW1vdW50X2ZpZWxkKS52YWwoKTtcbiAgICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmdpZnRfZGVsaXZlcnlfbWV0aG9kX3NlbGVjdG9yICsgJzpjaGVja2VkJykudmFsKCkgPT09ICdzaGlwcGluZycpIHtcbiAgICAgICAgICB0b3RhbF9hbW91bnQgPSBwYXJzZUludChzaGlwcGluZ19hbW91bnQsIDEwKSArIHBhcnNlSW50KHRvdGFsX2Ftb3VudCwgMTApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRvdGFsX2Ftb3VudCA9IHBhcnNlSW50KHRvdGFsX2Ftb3VudCwgMTApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdG90YWxfYW1vdW50O1xuICAgIH0sIC8vIGdldFRvdGFsQW1vdW50XG5cbiAgICBzZXRGYWlyTWFya2V0VmFsdWU6IGZ1bmN0aW9uKGFtb3VudF9zZWxlY3Rvcikge1xuICAgICAgLy8gaWYgdGhlcmUgaXMgYSBmYWlyIG1hcmtldCB2YWx1ZSBmaWVsZCBhbmQgdGhlcmUgaXMgYSBmYWlyLW1hcmtldC12YWx1ZSBkYXRhIGF0dHJpYnV0ZVxuICAgICAgLy8gY2hlY2sgYW5kIHNlZSBpZiB3ZSBjYW4gcG9wdWxhdGUgdGhlIGZpZWxkIHdpdGggdGhlIGRhdGEgYXR0cmlidXRlXG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuZmFpcl9tYXJrZXRfdmFsdWVfc2VsZWN0b3IpLmxlbmd0aCA+IDAgJiYgdHlwZW9mIGFtb3VudF9zZWxlY3Rvci5kYXRhKCdmYWlyLW1hcmtldC12YWx1ZScpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB2YXIgZmFpck1hcmtldFZhbHVlID0gYW1vdW50X3NlbGVjdG9yLmRhdGEoJ2ZhaXItbWFya2V0LXZhbHVlJyk7XG4gICAgICAgICQodGhpcy5vcHRpb25zLmZhaXJfbWFya2V0X3ZhbHVlX3NlbGVjdG9yKS52YWwoZmFpck1hcmtldFZhbHVlKTtcbiAgICAgIH1cbiAgICB9LCAvLyBzZXRGYWlyTWFya2V0VmFsdWVcblxuICAgIGNhbGN1bGF0ZUZlZXM6IGZ1bmN0aW9uKGFtb3VudCwgc3RyaXBlX3BheW1lbnRfdHlwZSkge1xuICAgICAgLy8gdGhpcyBzZW5kcyB0aGUgYW1vdW50IGFuZCBzdHJpcGUgcGF5bWVudCB0eXBlIHRvIHB5dGhvbjsgZ2V0IHRoZSBmZWUgYW5kIGRpc3BsYXkgaXQgdG8gdGhlIHVzZXIgb24gdGhlIGNoZWNrYm94IGxhYmVsXG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB2YXIgdG90YWxfYW1vdW50ID0gdGhhdC5nZXRUb3RhbEFtb3VudChhbW91bnQpO1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIGFtb3VudDogdG90YWxfYW1vdW50LFxuICAgICAgICBzdHJpcGVfcGF5bWVudF90eXBlOiBzdHJpcGVfcGF5bWVudF90eXBlXG4gICAgICB9O1xuICAgICAgdGhhdC5zZXRTdHJpcGVQYXltZW50VHlwZShzdHJpcGVfcGF5bWVudF90eXBlKTtcbiAgICAgICQuYWpheCh7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICB1cmw6ICcvY2FsY3VsYXRlLWZlZXMvJyxcbiAgICAgICAgZGF0YTogZGF0YVxuICAgICAgfSkuZG9uZShmdW5jdGlvbiggZGF0YSApIHtcbiAgICAgICAgaWYgKCQoZGF0YS5mZWVzKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgJCh0aGF0Lm9wdGlvbnMuZmVlX2Ftb3VudCkudGV4dChwYXJzZUZsb2F0KGRhdGEuZmVlcykudG9GaXhlZCgyKSk7XG4gICAgICAgICAgdGhhdC5jcmVkaXRDYXJkRmVlQ2hlY2tib3goJCh0aGF0Lm9wdGlvbnMucGF5X2NjX3Byb2Nlc3Npbmdfc2VsZWN0b3IpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSwgLy8gY2FsY3VsYXRlRmVlc1xuXG4gICAgY3JlZGl0Q2FyZFByb2Nlc3NpbmdGZWVzOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAvLyB0aGlzIGFkZHMgb3Igc3VidHJhY3RzIHRoZSBmZWUgdG8gdGhlIG9yaWdpbmFsIGFtb3VudCB3aGVuIHRoZSB1c2VyIGluZGljYXRlcyB0aGV5IGRvIG9yIGRvIG5vdCB3YW50IHRvIHBheSB0aGUgZmVlc1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdGhhdC5jcmVkaXRDYXJkRmVlQ2hlY2tib3goJChvcHRpb25zLnBheV9jY19wcm9jZXNzaW5nX3NlbGVjdG9yKSk7XG4gICAgICAkKG9wdGlvbnMucGF5X2NjX3Byb2Nlc3Npbmdfc2VsZWN0b3IpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdGhhdC5jcmVkaXRDYXJkRmVlQ2hlY2tib3godGhpcyk7XG4gICAgICB9KTtcbiAgICB9LCAvLyBjcmVkaXRDYXJkUHJvY2Vzc2luZ0ZlZXNcblxuICAgIGdldFN0cmlwZVBheW1lbnRUeXBlOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBzdHJpcGVfcGF5bWVudF90eXBlID0gJ2NhcmQnO1xuICAgICAgaWYgKCQoJ2lucHV0W25hbWU9XCJzdHJpcGVfcGF5bWVudF90eXBlXCJdJykubGVuZ3RoID4gMCkge1xuICAgICAgICBzdHJpcGVfcGF5bWVudF90eXBlID0gJCgnaW5wdXRbbmFtZT1cInN0cmlwZV9wYXltZW50X3R5cGVcIl0nKS52YWwoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdHJpcGVfcGF5bWVudF90eXBlO1xuICAgIH0sIC8vIGdldFN0cmlwZVBheW1lbnRUeXBlXG5cbiAgICBzZXRTdHJpcGVQYXltZW50VHlwZTogZnVuY3Rpb24oc3RyaXBlX3BheW1lbnRfdHlwZSkge1xuICAgICAgaWYgKCQoJ2lucHV0W25hbWU9XCJzdHJpcGVfcGF5bWVudF90eXBlXCJdJykubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICQodGhpcy5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5hcHBlbmQoJzxpbnB1dCB0eXBlPVxcXCJoaWRkZW5cXFwiIG5hbWU9XFxcInN0cmlwZV9wYXltZW50X3R5cGVcXFwiPicpO1xuICAgICAgfVxuICAgICAgJCgnaW5wdXRbbmFtZT1cInN0cmlwZV9wYXltZW50X3R5cGVcIl0nKS52YWwoc3RyaXBlX3BheW1lbnRfdHlwZSk7XG4gICAgICByZXR1cm4gc3RyaXBlX3BheW1lbnRfdHlwZTtcbiAgICB9LCAvLyBzZXRTdHJpcGVQYXltZW50VHlwZVxuXG4gICAgY3JlZGl0Q2FyZEZlZUNoZWNrYm94OiBmdW5jdGlvbihmaWVsZCkge1xuICAgICAgdmFyIGZ1bGxfYW1vdW50O1xuICAgICAgdmFyIHRvdGFsX2Ftb3VudCA9IHRoaXMuZ2V0VG90YWxBbW91bnQoKTtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIGlmICgkKGZpZWxkKS5pcygnOmNoZWNrZWQnKSB8fCAkKGZpZWxkKS5wcm9wKCdjaGVja2VkJykpIHtcbiAgICAgICAgJCgnLmFtb3VudCAubGV2ZWwtYW1vdW50JykuYWRkQ2xhc3MoJ2Z1bGwtYW1vdW50Jyk7XG4gICAgICAgIGZ1bGxfYW1vdW50ID0gKHRvdGFsX2Ftb3VudCArIHBhcnNlRmxvYXQoJCh0aGF0Lm9wdGlvbnMuZmVlX2Ftb3VudCkudGV4dCgpKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmdWxsX2Ftb3VudCA9IHRvdGFsX2Ftb3VudDtcbiAgICAgIH1cbiAgICAgIGZ1bGxfYW1vdW50ID0gcGFyc2VGbG9hdChmdWxsX2Ftb3VudCkudG9GaXhlZCgyKTtcbiAgICAgICQodGhhdC5vcHRpb25zLmZ1bGxfYW1vdW50X3NlbGVjdG9yKS50ZXh0KGZ1bGxfYW1vdW50KTtcblxuICAgICAgLy8gdXBkYXRlIHRoZSBwYXltZW50IHJlcXVlc3RcbiAgICAgIGlmICh0aGlzLnBheW1lbnRSZXF1ZXN0ICYmIGZ1bGxfYW1vdW50KSB7XG4gICAgICAgIHRoaXMucGF5bWVudFJlcXVlc3QudXBkYXRlKHtcbiAgICAgICAgICB0b3RhbDoge1xuICAgICAgICAgICAgbGFiZWw6IFwiTWlublBvc3RcIixcbiAgICAgICAgICAgIGFtb3VudDogZnVsbF9hbW91bnQgKiAxMDBcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgfSwgLy8gY3JlZGl0Q2FyZEZlZUNoZWNrYm94XG5cbiAgICBkb25hdGVBbm9ueW1vdXNseTogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdGhhdC50b2dnbGVBbm9ueW1vdXMoJChvcHRpb25zLmFub255bW91c19zZWxlY3RvciwgZWxlbWVudCkpO1xuICAgICAgJChvcHRpb25zLmFub255bW91c19zZWxlY3RvciwgZWxlbWVudCkuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGF0LnRvZ2dsZUFub255bW91cygkKHRoaXMpKTtcbiAgICAgIH0pO1xuICAgIH0sIC8vIGRvbmF0ZUFub255bW91c2x5XG5cbiAgICB0b2dnbGVBbm9ueW1vdXM6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICAgIGlmIChlbGVtZW50LmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgICQodGhpcy5vcHRpb25zLm5hbWVfc2VsZWN0b3IgKyAnIGRpdjpmaXJzdCcsIHRoaXMuZWxlbWVudCkuaGlkZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJCh0aGlzLm9wdGlvbnMubmFtZV9zZWxlY3RvciArICcgZGl2OmZpcnN0JywgdGhpcy5lbGVtZW50KS5zaG93KCk7XG4gICAgICB9XG4gICAgfSwgLy8gdG9nZ2xlQW5vbnltb3VzXG5cbiAgICBob25vck9yTWVtb3J5OiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICBpZiAoJChvcHRpb25zLmhvbm9yX29yX21lbW9yeV9jaG9vc2VyICsgJzpjaGVja2VkJykudmFsKCkpIHtcbiAgICAgICAgJChvcHRpb25zLmhvbm9yX21lbW9yeV9pbnB1dF9ncm91cCwgZWxlbWVudCkuc2hvdygpO1xuICAgICAgICAkKG9wdGlvbnMuaG9ub3JfdHlwZV9zZWxlY3RvcikudGV4dCgkKG9wdGlvbnMuaG9ub3Jfb3JfbWVtb3J5X2Nob29zZXIgKyAnOmNoZWNrZWQnKS52YWwoKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkKG9wdGlvbnMuaG9ub3JfbWVtb3J5X2lucHV0X2dyb3VwLCBlbGVtZW50KS5oaWRlKCk7XG4gICAgICAgICQob3B0aW9ucy5ob25vcl9uYW1lX3NlbGVjdG9yICsgJyBpbnB1dCcsIGVsZW1lbnQpLnZhbCgnJyk7XG4gICAgICB9XG4gICAgfSwgLy8gaG9ub3JPck1lbW9yeVxuXG4gICAgaG9ub3JPck1lbW9yeVRvZ2dsZTogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdGhhdC5ob25vck9yTWVtb3J5KHRoYXQuZWxlbWVudCwgdGhhdC5vcHRpb25zKTtcbiAgICAgICQob3B0aW9ucy5ob25vcl9vcl9tZW1vcnlfY2hvb3NlciwgZWxlbWVudCkuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGF0Lmhvbm9yT3JNZW1vcnkodGhhdC5lbGVtZW50LCB0aGF0Lm9wdGlvbnMpO1xuICAgICAgfSk7XG4gICAgfSwgLy8gaG9ub3JPck1lbW9yeVRvZ2dsZVxuXG4gICAgb3V0c2lkZVVuaXRlZFN0YXRlczogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgJChvcHRpb25zLnNob3dfYmlsbGluZ19jb3VudHJ5X3NlbGVjdG9yKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgdGhhdC5jaGFuZ2VGaWVsZHNPdXRzaWRlVVMoJ2JpbGxpbmcnLCBlbGVtZW50LCBvcHRpb25zKTtcbiAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5oaWRlKCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuICAgICAgJChvcHRpb25zLnNob3dfc2hpcHBpbmdfY291bnRyeV9zZWxlY3RvcikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICQob3B0aW9ucy5zaGlwcGluZ19jb3VudHJ5X3NlbGVjdG9yKS5zaG93KCk7XG4gICAgICAgIHRoYXQuY2hhbmdlRmllbGRzT3V0c2lkZVVTKCdzaGlwcGluZycsIGVsZW1lbnQsIG9wdGlvbnMpO1xuICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmhpZGUoKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSk7XG4gICAgfSwgLy8gb3V0c2lkZVVuaXRlZFN0YXRlc1xuXG4gICAgY2hhbmdlRmllbGRzT3V0c2lkZVVTOiBmdW5jdGlvbihiaWxsaW5nX29yX3NoaXBwaW5nLCBlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICBpZiAoIGJpbGxpbmdfb3Jfc2hpcHBpbmcgPT09ICdiaWxsaW5nJyApIHtcbiAgICAgICAgdmFyIHppcF9wYXJlbnQgPSAkKG9wdGlvbnMuYmlsbGluZ196aXBfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpO1xuICAgICAgICB2YXIgc3RhdGVfcGFyZW50ID0gJChvcHRpb25zLmJpbGxpbmdfc3RhdGVfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpO1xuICAgICAgICAkKG9wdGlvbnMuYmlsbGluZ19jb3VudHJ5X3NlbGVjdG9yKS5zaG93KCk7XG4gICAgICAgICQob3B0aW9ucy5iaWxsaW5nX3ppcF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkuYXR0cigndHlwZScsICd0ZXh0Jyk7XG4gICAgICAgICQob3B0aW9ucy5iaWxsaW5nX3ppcF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICAgICQob3B0aW9ucy5iaWxsaW5nX3N0YXRlX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgICAgJCgnbGFiZWwnLCB6aXBfcGFyZW50KS50ZXh0KCdQb3N0YWwgQ29kZTonKTtcbiAgICAgICAgJCgnbGFiZWwnLCBzdGF0ZV9wYXJlbnQpLnRleHQoJ1JlZ2lvbjonKTtcbiAgICAgIH0gZWxzZSBpZiAoIGJpbGxpbmdfb3Jfc2hpcHBpbmcgPT09ICdzaGlwcGluZycgKSB7XG4gICAgICAgIHZhciB6aXBfcGFyZW50ID0gJChvcHRpb25zLnNoaXBwaW5nX3ppcF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkucGFyZW50KCk7XG4gICAgICAgIHZhciBzdGF0ZV9wYXJlbnQgPSAkKG9wdGlvbnMuc2hpcHBpbmdfc3RhdGVfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpO1xuICAgICAgICAkKG9wdGlvbnMuc2hpcHBpbmdfY291bnRyeV9zZWxlY3Rvcikuc2hvdygpO1xuICAgICAgICAkKG9wdGlvbnMuc2hpcHBpbmdfemlwX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5hdHRyKCd0eXBlJywgJ3RleHQnKTtcbiAgICAgICAgJChvcHRpb25zLnNoaXBwaW5nX3ppcF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICAgICQob3B0aW9ucy5zaGlwcGluZ19zdGF0ZV9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICAgICQoJ2xhYmVsJywgemlwX3BhcmVudCkudGV4dCgnU2hpcHBpbmcgUG9zdGFsIENvZGU6Jyk7XG4gICAgICAgICQoJ2xhYmVsJywgc3RhdGVfcGFyZW50KS50ZXh0KCdTaGlwcGluZyBSZWdpb246Jyk7XG4gICAgICB9XG4gICAgfSwgLy8gY2hhbmdlRmllbGRzT3V0c2lkZVVTXG5cbiAgICBjaGFuZ2VGaWVsZHNJbnNpZGVVUzogZnVuY3Rpb24oYmlsbGluZ19vcl9zaGlwcGluZywgZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgaWYgKCBiaWxsaW5nX29yX3NoaXBwaW5nID09PSAnYmlsbGluZycgKSB7XG4gICAgICAgIHZhciB6aXBfcGFyZW50ID0gJChvcHRpb25zLmJpbGxpbmdfemlwX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKTtcbiAgICAgICAgdmFyIHN0YXRlX3BhcmVudCA9ICQob3B0aW9ucy5iaWxsaW5nX3N0YXRlX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKTtcbiAgICAgICAgJChvcHRpb25zLmJpbGxpbmdfY291bnRyeV9zZWxlY3Rvcikuc2hvdygpO1xuICAgICAgICAkKG9wdGlvbnMuYmlsbGluZ196aXBfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLmF0dHIoJ3R5cGUnLCAndGVsJyk7XG4gICAgICAgICQob3B0aW9ucy5iaWxsaW5nX3ppcF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkucHJvcCgncmVxdWlyZWQnLCB0cnVlKTtcbiAgICAgICAgJChvcHRpb25zLmJpbGxpbmdfc3RhdGVfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnByb3AoJ3JlcXVpcmVkJywgdHJ1ZSk7XG4gICAgICAgICQoJ2xhYmVsJywgemlwX3BhcmVudCkuaHRtbCgnWmlwIENvZGU6IDxzcGFuIGNsYXNzPVwiYS1mb3JtLWl0ZW0tcmVxdWlyZWRcIiB0aXRsZT1cIlRoaXMgZmllbGQgaXMgcmVxdWlyZWQuXCI+Kjwvc3Bhbj4nKTtcbiAgICAgICAgJCgnbGFiZWwnLCBzdGF0ZV9wYXJlbnQpLmh0bWwoJ1N0YXRlOiA8c3BhbiBjbGFzcz1cImEtZm9ybS1pdGVtLXJlcXVpcmVkXCIgdGl0bGU9XCJUaGlzIGZpZWxkIGlzIHJlcXVpcmVkLlwiPio8L3NwYW4+Jyk7XG4gICAgICB9IGVsc2UgaWYgKCBiaWxsaW5nX29yX3NoaXBwaW5nID09PSAnc2hpcHBpbmcnICkge1xuICAgICAgICB2YXIgemlwX3BhcmVudCA9ICQob3B0aW9ucy5zaGlwcGluZ196aXBfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpO1xuICAgICAgICB2YXIgc3RhdGVfcGFyZW50ID0gJChvcHRpb25zLnNoaXBwaW5nX3N0YXRlX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKTtcbiAgICAgICAgJChvcHRpb25zLnNoaXBwaW5nX2NvdW50cnlfc2VsZWN0b3IpLnNob3coKTtcbiAgICAgICAgJChvcHRpb25zLnNoaXBwaW5nX3ppcF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkuYXR0cigndHlwZScsICd0ZWwnKTtcbiAgICAgICAgJChvcHRpb25zLnNoaXBwaW5nX3ppcF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkucHJvcCgncmVxdWlyZWQnLCB0cnVlKTtcbiAgICAgICAgJChvcHRpb25zLnNoaXBwaW5nX3N0YXRlX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5wcm9wKCdyZXF1aXJlZCcsIHRydWUpO1xuICAgICAgICAkKCdsYWJlbCcsIHppcF9wYXJlbnQpLmh0bWwoJ1NoaXBwaW5nIFppcCBDb2RlOiA8c3BhbiBjbGFzcz1cImEtZm9ybS1pdGVtLXJlcXVpcmVkXCIgdGl0bGU9XCJUaGlzIGZpZWxkIGlzIHJlcXVpcmVkLlwiPio8L3NwYW4+Jyk7XG4gICAgICAgICQoJ2xhYmVsJywgc3RhdGVfcGFyZW50KS5odG1sKCdTaGlwcGluZyBTdGF0ZTogPHNwYW4gY2xhc3M9XCJhLWZvcm0taXRlbS1yZXF1aXJlZFwiIHRpdGxlPVwiVGhpcyBmaWVsZCBpcyByZXF1aXJlZC5cIj4qPC9zcGFuPicpO1xuICAgICAgfVxuICAgIH0sIC8vIGNoYW5nZUZpZWxkc091dHNpZGVVU1xuXG4gICAgc2hpcHBpbmdBZGRyZXNzOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB2YXIgc2hvd19zaGlwcGluZyA9IGZhbHNlO1xuICAgICAgaWYgKCQob3B0aW9ucy51c2VfZm9yX3NoaXBwaW5nX3NlbGVjdG9yKS5sZW5ndGggPiAwKSB7IC8vIHdlIGhhdmUgYSBzaGlwcGluZyBjaGVja2JveFxuICAgICAgICBzaG93X3NoaXBwaW5nID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmIChzaG93X3NoaXBwaW5nID09PSB0cnVlICkge1xuICAgICAgICAkKG9wdGlvbnMudXNlX2Zvcl9zaGlwcGluZ19zZWxlY3RvciwgZWxlbWVudCkucGFyZW50KCkuc2hvdygpO1xuICAgICAgICBpZiAoJChvcHRpb25zLnVzZV9mb3Jfc2hpcHBpbmdfc2VsZWN0b3IsIGVsZW1lbnQpLmlzKCc6Y2hlY2tlZCcpKSB7IC8vIHVzZSBzYW1lIGFzIGJpbGxpbmdcbiAgICAgICAgICAkKG9wdGlvbnMuc2hpcHBpbmdfc2VsZWN0b3IpLmhpZGUoKTtcbiAgICAgICAgfSBlbHNlIHsgLy8gc2VwYXJhdGUgc2hpcHBpbmcgYW5kIGJpbGxpbmdcbiAgICAgICAgICAkKG9wdGlvbnMuc2hpcHBpbmdfc2VsZWN0b3IpLnNob3coKTtcbiAgICAgICAgfVxuICAgICAgICAkKG9wdGlvbnMudXNlX2Zvcl9zaGlwcGluZ19zZWxlY3RvciwgZWxlbWVudCkuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHRoYXQuc2hpcHBpbmdBZGRyZXNzKGVsZW1lbnQsIG9wdGlvbnMpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIFxuICAgIH0sIC8vIHNoaXBwaW5nQWRkcmVzc1xuXG4gICAgYWxsb3dNaW5ucG9zdEFjY291bnQ6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHZhciBhY2NvdW50X2V4aXN0cyA9IGZhbHNlO1xuXG4gICAgICAvLyBzaG93IHBhc3N3b3JkIGFzIHRleHRcbiAgICAgIHRoYXQuc2hvd1Bhc3N3b3JkKCk7XG5cbiAgICAgIC8vIGNhbGN1bGF0ZSBwYXNzd29yZCBzdHJlbmd0aFxuICAgICAgdGhhdC5zaG93UGFzc3dvcmRTdHJlbmd0aCgpO1xuICAgICAgXG4gICAgICB0aGF0LnNwYW1FbWFpbCgkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpKTtcbiAgICAgICQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGF0LnNwYW1FbWFpbCgkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGF0LnRvZ2dsZUFjY291bnRGaWVsZHMoJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkpO1xuICAgICAgJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGF0LnRvZ2dsZUFjY291bnRGaWVsZHMoJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkpO1xuICAgICAgfSk7XG5cbiAgICAgIGZ1bmN0aW9uIGRvbmVUeXBpbmcgKCkge1xuICAgICAgICB2YXIgZW1haWwgPSAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpO1xuICAgICAgICBhY2NvdW50X2V4aXN0cyA9IHRoYXQuY2hlY2tNaW5ucG9zdEFjY291bnQoZWxlbWVudCwgb3B0aW9ucywgZW1haWwpO1xuICAgICAgfVxuXG4gICAgICAvL3NldHVwIGJlZm9yZSBmdW5jdGlvbnNcbiAgICAgIHZhciB0eXBpbmdUaW1lcjsgICAgICAgICAgICAgICAgLy90aW1lciBpZGVudGlmaWVyXG4gICAgICB2YXIgZG9uZVR5cGluZ0ludGVydmFsID0gNTAwMDsgIC8vdGltZSBpbiBtcywgNSBzZWNvbmQgZm9yIGV4YW1wbGVcblxuICAgICAgLy9vbiBrZXl1cCwgc3RhcnQgdGhlIGNvdW50ZG93blxuICAgICAgJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5rZXl1cChmdW5jdGlvbigpe1xuICAgICAgICBjbGVhclRpbWVvdXQodHlwaW5nVGltZXIpO1xuICAgICAgICBpZiAoJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwpIHtcbiAgICAgICAgICB0eXBpbmdUaW1lciA9IHNldFRpbWVvdXQoZG9uZVR5cGluZywgZG9uZVR5cGluZ0ludGVydmFsKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSwgLy8gYWxsb3dNaW5ucG9zdEFjY291bnRcblxuICAgIHNwYW1FbWFpbDogZnVuY3Rpb24oZW1haWxfZmllbGQpIHtcbiAgICAgIHZhciBzcGFtRXJyb3JDb250YWluZXIgPSBlbWFpbF9maWVsZC5wYXJlbnQoKTtcbiAgICAgIGlmICgkKCcuYS1zcGFtLWVtYWlsJywgc3BhbUVycm9yQ29udGFpbmVyKS5sZW5ndGggPT09IDAgKSB7XG4gICAgICAgIHNwYW1FcnJvckNvbnRhaW5lci5hcHBlbmQoJzxwIGNsYXNzPVwiYS1mb3JtLWNhcHRpb24gYS12YWxpZGF0aW9uLWVycm9yIGEtc3BhbS1lbWFpbFwiPlRoaXMgZW1haWwgYWRkcmVzcyBoYXMgYmVlbiBkZXRlY3RlZCBhcyBhIHNwYW1tZXIuPC9wPicpO1xuICAgICAgfVxuICAgICAgJCgnLmEtc3BhbS1lbWFpbCcsIHNwYW1FcnJvckNvbnRhaW5lcikuaGlkZSgpO1xuICAgICAgc3BhbUVycm9yQ29udGFpbmVyLnJlbW92ZUNsYXNzKCdpbnZhbGlkIGEtZXJyb3InKTtcbiAgICB9LCAvLyBzcGFtRW1haWxcblxuICAgIHRvZ2dsZUFjY291bnRGaWVsZHM6IGZ1bmN0aW9uKGNyZWF0ZV9hY2NvdW50X3NlbGVjdG9yKSB7XG4gICAgICBpZiAoY3JlYXRlX2FjY291bnRfc2VsZWN0b3IuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgY3JlYXRlX2FjY291bnRfc2VsZWN0b3IucGFyZW50KCkuYmVmb3JlKCc8cCBjbGFzcz1cImEtZm9ybS1jYXB0aW9uIGEtYWNjb3VudC1leGlzdHMgYS1hY2NvdW50LWV4aXN0cy1zdWNjZXNzXCI+VGhlcmUgaXMgYWxyZWFkeSBhIE1pbm5Qb3N0LmNvbSBhY2NvdW50IHdpdGggdGhpcyBlbWFpbCBhZGRyZXNzLjwvcD4nKTtcbiAgICAgICAgJCgnLmEtYWNjb3VudC1leGlzdHMnKS5oaWRlKCk7XG4gICAgICAgICQodGhpcy5vcHRpb25zLnBhc3N3b3JkX3NlbGVjdG9yLCB0aGlzLmVsZW1lbnQpLnNob3coKTtcbiAgICAgICAgdGhpcy5vcHRpb25zLmNyZWF0ZV9hY2NvdW50ID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQodGhpcy5vcHRpb25zLnBhc3N3b3JkX3NlbGVjdG9yLCB0aGlzLmVsZW1lbnQpLmhpZGUoKTtcbiAgICAgIH1cbiAgICB9LCAvLyB0b2dnbGVBY2NvdW50RmllbGRzXG5cbiAgICBzaG93UGFzc3dvcmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgLy8gQ2FjaGUgb3VyIGpxdWVyeSBlbGVtZW50c1xuICAgICAgdmFyICRzdWJtaXQgPSAkKCcuYnRuLXN1Ym1pdCcpO1xuICAgICAgdmFyICRjb250YWluZXIgPSAkKHRoaXMub3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgdGhpcy5lbGVtZW50KTtcbiAgICAgIHZhciAkZmllbGQgPSAkKCdpbnB1dFtuYW1lPVwicGFzc3dvcmRcIl0nLCAkY29udGFpbmVyKTtcbiAgICAgICQoJy5hLWFjY291bnQtZXhpc3RzJykuaGlkZSgpO1xuICAgICAgdmFyIHNob3dfcGFzcyA9ICc8ZGl2IGNsYXNzPVwiYS1mb3JtLXNob3ctcGFzc3dvcmQgYS1mb3JtLWNhcHRpb25cIj48bGFiZWw+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG5hbWU9XCJzaG93X3Bhc3N3b3JkXCIgaWQ9XCJzaG93LXBhc3N3b3JkLWNoZWNrYm94XCIgdmFsdWU9XCIxXCI+IFNob3cgcGFzc3dvcmQ8L2xhYmVsPjwvZGl2Pic7XG4gICAgICAvLyBJbmplY3QgdGhlIHRvZ2dsZSBidXR0b24gaW50byB0aGUgcGFnZVxuICAgICAgJGNvbnRhaW5lci5hcHBlbmQoIHNob3dfcGFzcyApO1xuICAgICAgLy8gQ2FjaGUgdGhlIHRvZ2dsZSBidXR0b25cbiAgICAgIHZhciAkdG9nZ2xlID0gJCgnI3Nob3ctcGFzc3dvcmQtY2hlY2tib3gnKTtcbiAgICAgIC8vIFRvZ2dsZSB0aGUgZmllbGQgdHlwZVxuICAgICAgJHRvZ2dsZS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIHZhciBjaGVja2JveCA9ICQodGhpcyk7XG4gICAgICAgIGlmIChjaGVja2JveC5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICAgICRmaWVsZC5hdHRyKCd0eXBlJywgJ3RleHQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkZmllbGQuYXR0cigndHlwZScsICdwYXNzd29yZCcpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIC8vIFNldCB0aGUgZm9ybSBmaWVsZCBiYWNrIHRvIGEgcmVndWxhciBwYXNzd29yZCBlbGVtZW50XG4gICAgICAkc3VibWl0Lm9uKCAnY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICRmaWVsZC5hdHRyKCd0eXBlJywgJ3Bhc3N3b3JkJyk7XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgc2hvd1Bhc3N3b3JkU3RyZW5ndGg6IGZ1bmN0aW9uKCkge1xuICAgICAgLy8gY2hlY2tQYXNzd29yZFN0cmVuZ3RoXG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICBpZiAoJCgnLmEtcGFzc3dvcmQtc3RyZW5ndGgnKS5sZW5ndGggPiAwICkge1xuICAgICAgICB2YXIgJGJlZm9yZSA9ICQoJy5hLWZvcm0tc2hvdy1wYXNzd29yZCcpO1xuICAgICAgICAkYmVmb3JlLmFmdGVyKCAkKCc8ZGl2IGNsYXNzPVwiYS1wYXNzd29yZC1zdHJlbmd0aFwiPjxtZXRlciBtYXg9XCI0XCIgaWQ9XCJwYXNzd29yZC1zdHJlbmd0aFwiPjxkaXY+PC9kaXY+PC9tZXRlcj48cCBjbGFzcz1cImEtZm9ybS1jYXB0aW9uXCIgaWQ9XCJwYXNzd29yZC1zdHJlbmd0aC10ZXh0XCI+PC9wPjwvZGl2PicpKTtcbiAgICAgICAgJCggJ2JvZHknICkub24oICdrZXl1cCcsICdpbnB1dFtuYW1lPXBhc3N3b3JkXScsXG4gICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGF0LmNoZWNrUGFzc3dvcmRTdHJlbmd0aChcbiAgICAgICAgICAgICAgJCgnaW5wdXRbbmFtZT1wYXNzd29yZF0nKSwgLy8gUGFzc3dvcmQgZmllbGRcbiAgICAgICAgICAgICAgJCgnI3Bhc3N3b3JkLXN0cmVuZ3RoJyksICAgICAgICAgICAvLyBTdHJlbmd0aCBtZXRlclxuICAgICAgICAgICAgICAkKCcjcGFzc3dvcmQtc3RyZW5ndGgtdGV4dCcpICAgICAgLy8gU3RyZW5ndGggdGV4dCBpbmRpY2F0b3JcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0sIC8vIHNob3dQYXNzd29yZFN0cmVuZ3RoXG5cbiAgICBjaGVja1Bhc3N3b3JkU3RyZW5ndGg6IGZ1bmN0aW9uKCAkcGFzc3dvcmQsICRzdHJlbmd0aE1ldGVyLCAkc3RyZW5ndGhUZXh0ICkge1xuICAgICAgdmFyIHBhc3N3b3JkID0gJHBhc3N3b3JkLnZhbCgpO1xuICAgICAgLy8gR2V0IHRoZSBwYXNzd29yZCBzdHJlbmd0aFxuICAgICAgdmFyIHJlc3VsdCA9IHp4Y3ZibihwYXNzd29yZCk7XG4gICAgICB2YXIgc3RyZW5ndGggPSByZXN1bHQuc2NvcmU7XG5cbiAgICAgICRzdHJlbmd0aFRleHQucmVtb3ZlQ2xhc3MoICdzaG9ydCBiYWQgZ29vZCBzdHJvbmcnICk7XG5cbiAgICAgIC8vIEFkZCB0aGUgc3RyZW5ndGggbWV0ZXIgcmVzdWx0c1xuICAgICAgc3dpdGNoICggc3RyZW5ndGggKSB7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAkc3RyZW5ndGhUZXh0LmFkZENsYXNzKCAnYmFkJyApLmh0bWwoICdTdHJlbmd0aDogPHN0cm9uZz5XZWFrPC9zdHJvbmc+JyApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgJHN0cmVuZ3RoVGV4dC5hZGRDbGFzcyggJ2dvb2QnICkuaHRtbCggJ1N0cmVuZ3RoOiA8c3Ryb25nPk1lZGl1bTwvc3Ryb25nPicgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICRzdHJlbmd0aFRleHQuYWRkQ2xhc3MoICdzdHJvbmcnICkuaHRtbCggJ1N0cmVuZ3RoOiA8c3Ryb25nPlN0cm9uZzwvc3Ryb25nPicgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICRzdHJlbmd0aFRleHQuYWRkQ2xhc3MoICdzaG9ydCcgKS5odG1sKCAnU3RyZW5ndGg6IDxzdHJvbmc+VmVyeSB3ZWFrPC9zdHJvbmc+JyApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICRzdHJlbmd0aFRleHQuYWRkQ2xhc3MoICdzaG9ydCcgKS5odG1sKCAnU3RyZW5ndGg6IDxzdHJvbmc+VmVyeSB3ZWFrPC9zdHJvbmc+JyApO1xuICAgICAgfVxuICAgICAgJHN0cmVuZ3RoTWV0ZXIudmFsKHN0cmVuZ3RoKTtcbiAgICAgIHJldHVybiBzdHJlbmd0aDtcbiAgICB9LCAvLyBjaGVja1Bhc3N3b3JkU3RyZW5ndGhcblxuICAgIGNoZWNrTWlubnBvc3RBY2NvdW50OiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zLCBlbWFpbCkge1xuICAgICAgdmFyIHVzZXIgPSB7XG4gICAgICAgIGVtYWlsOiBlbWFpbFxuICAgICAgfTtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICQuYWpheCh7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIHVybDogb3B0aW9ucy5taW5ucG9zdF9yb290ICsgJy93cC1qc29uL3VzZXItYWNjb3VudC1tYW5hZ2VtZW50L3YxL2NoZWNrLWFjY291bnQnLFxuICAgICAgICBkYXRhOiB1c2VyXG4gICAgICB9KS5kb25lKGZ1bmN0aW9uKCByZXN1bHQgKSB7XG4gICAgICAgIGlmIChyZXN1bHQuc3RhdHVzID09PSAnc3VjY2VzcycgJiYgcmVzdWx0LnJlYXNvbiA9PT0gJ3VzZXIgZXhpc3RzJykgeyAvLyB1c2VyIGV4aXN0c1xuICAgICAgICAgIGlmICgkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KS5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICAgICAgJChvcHRpb25zLnBhc3N3b3JkX3NlbGVjdG9yLCBlbGVtZW50KS5oaWRlKCk7XG4gICAgICAgICAgICAkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKS5oaWRlKCk7XG4gICAgICAgICAgICAkKCcuYS1hY2NvdW50LWV4aXN0cycsIGVsZW1lbnQpLnNob3coKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCQob3B0aW9ucy5jcmVhdGVfbXBfc2VsZWN0b3IsIGVsZW1lbnQpLmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgICAgICAgICQob3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgZWxlbWVudCkuaGlkZSgpO1xuICAgICAgICAgICAgICAkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKS5oaWRlKCk7XG4gICAgICAgICAgICAgICQoJy5hLWFjY291bnQtZXhpc3RzJywgZWxlbWVudCkuc2hvdygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKCByZXN1bHQuc3RhdHVzID09PSAnc3BhbScgKSB7XG4gICAgICAgICAgJCh0aGF0Lm9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IpLmFkZENsYXNzKCdpbnZhbGlkIGEtZXJyb3InKTtcbiAgICAgICAgICAkKCAnLmEtc3BhbS1lbWFpbCcpLnNob3coKTtcbiAgICAgICAgfSBlbHNlIHsgLy8gdXNlciBkb2VzIG5vdCBleGlzdCBvciBhamF4IGNhbGwgZmFpbGVkXG4gICAgICAgICAgaWYgKCQob3B0aW9ucy5jcmVhdGVfbXBfc2VsZWN0b3IsIGVsZW1lbnQpLmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgICAgICAkKG9wdGlvbnMucGFzc3dvcmRfc2VsZWN0b3IsIGVsZW1lbnQpLnNob3coKTtcbiAgICAgICAgICAgIG9wdGlvbnMuY3JlYXRlX2FjY291bnQgPSB0cnVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKG9wdGlvbnMucGFzc3dvcmRfc2VsZWN0b3IsIGVsZW1lbnQpLmhpZGUoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgJCgnLmEtYWNjb3VudC1leGlzdHMnLCBlbGVtZW50KS5oaWRlKCk7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LCAvLyBjaGVja01pbm5wb3N0QWNjb3VudFxuXG4gICAgcGF5bWVudFJlcXVlc3RCdXR0b246IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHZhciB0b3RhbF9hbW91bnQgPSB0aGF0LmdldFRvdGFsQW1vdW50KCk7XG4gICAgICB0aGF0LnBheW1lbnRSZXF1ZXN0ID0gdGhhdC5zdHJpcGUucGF5bWVudFJlcXVlc3Qoe1xuICAgICAgICBjb3VudHJ5OiAnVVMnLFxuICAgICAgICBjdXJyZW5jeTogJ3VzZCcsXG4gICAgICAgIHRvdGFsOiB7XG4gICAgICAgICAgbGFiZWw6ICdNaW5uUG9zdCcsXG4gICAgICAgICAgYW1vdW50OiB0b3RhbF9hbW91bnQgKiAxMDAsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICAgIHRoYXQucHJCdXR0b24gPSB0aGF0LmVsZW1lbnRzLmNyZWF0ZSgncGF5bWVudFJlcXVlc3RCdXR0b24nLCB7XG4gICAgICAgIHBheW1lbnRSZXF1ZXN0OiB0aGF0LnBheW1lbnRSZXF1ZXN0LFxuICAgICAgICBzdHlsZToge1xuICAgICAgICAgIHBheW1lbnRSZXF1ZXN0QnV0dG9uOiB7XG4gICAgICAgICAgICB0eXBlOiAnZG9uYXRlJyxcbiAgICAgICAgICAgIC8vIE9uZSBvZiAnZGVmYXVsdCcsICdib29rJywgJ2J1eScsIG9yICdkb25hdGUnXG4gICAgICAgICAgICAvLyBEZWZhdWx0cyB0byAnZGVmYXVsdCdcbiAgICAgIFxuICAgICAgICAgICAgdGhlbWU6ICdkYXJrJyxcbiAgICAgICAgICAgIC8vIE9uZSBvZiAnZGFyaycsICdsaWdodCcsIG9yICdsaWdodC1vdXRsaW5lJ1xuICAgICAgICAgICAgLy8gRGVmYXVsdHMgdG8gJ2RhcmsnXG4gICAgICBcbiAgICAgICAgICAgIGhlaWdodDogJzQ4cHgnXG4gICAgICAgICAgICAvLyBEZWZhdWx0cyB0byAnNDBweCcuIFRoZSB3aWR0aCBpcyBhbHdheXMgJzEwMCUnLlxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICAgIFxuICAgICAgLy8gQ2hlY2sgdGhlIGF2YWlsYWJpbGl0eSBvZiB0aGUgUGF5bWVudCBSZXF1ZXN0IEFQSSBmaXJzdC5cbiAgICAgIHRoYXQucGF5bWVudFJlcXVlc3QuY2FuTWFrZVBheW1lbnQoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgJCgnLm0tcGF5LXdpdGhvdXQtcGF5bWVudC1yZXF1ZXN0JykuaGlkZSgpO1xuICAgICAgICAgIHRoYXQucHJCdXR0b24ubW91bnQoJyNwYXltZW50LXJlcXVlc3QtYnV0dG9uJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhhdC5oaWRlUGF5bWVudFJlcXVlc3QoICQoJy5vLXBheS13aXRoLXBheW1lbnQtcmVxdWVzdCcpICk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAkKCcuZGVjbGluZS1hcHBsZS1wYXkgYScpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoYXQuaGlkZVBheW1lbnRSZXF1ZXN0KCAkKCcuby1wYXktd2l0aC1wYXltZW50LXJlcXVlc3QgLm0tZm9ybS1hY3Rpb25zLXBheS1mZWVzJykgKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGF0LnByQnV0dG9uLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cbiAgICAgICAgLy8gU2VuZCBwYXltZW50TWV0aG9kLmlkIHRvIHNlcnZlclxuICAgICAgICB2YXIgc3VwcG9ydGZvcm0gPSAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3Rvcik7XG5cbiAgICAgICAgLy8gY2hlY2sgdmFsaWRhdGlvbiBvZiBmb3JtXG4gICAgICAgIGlmICghc3VwcG9ydGZvcm0uZ2V0KDApLnJlcG9ydFZhbGlkaXR5KCkpIHtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHRoYXQucGF5bWVudFJlcXVlc3Qub24oJ3BheW1lbnRtZXRob2QnLCBmdW5jdGlvbihldmVudCkge1xuXG4gICAgICAgIC8vIFNlbmQgcGF5bWVudE1ldGhvZC5pZCB0byBzZXJ2ZXJcbiAgICAgICAgdmFyIHN1cHBvcnRmb3JtID0gJCh0aGF0Lm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpO1xuICAgICAgICB2YXIgdG9rZW5GaWVsZE5hbWUgPSAncGF5bWVudF9tZXRob2RfaWQnO1xuICAgICAgICB2YXIgdG9rZW5GaWVsZCA9ICdpbnB1dFtuYW1lPVwiJyArIHRva2VuRmllbGROYW1lICsgJ1wiXSc7XG5cbiAgICAgICAgLy8gSW5zZXJ0IHRoZSBwYXltZW50IG1ldGhvZCBJRCBpbnRvIHRoZSBmb3JtIHNvIGl0IGdldHMgc3VibWl0dGVkIHRvIHRoZSBzZXJ2ZXJcbiAgICAgICAgaWYgKCQodG9rZW5GaWVsZCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICQodG9rZW5GaWVsZCkudmFsKGV2ZW50LnBheW1lbnRNZXRob2QuaWQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN1cHBvcnRmb3JtLmFwcGVuZCgkKCc8aW5wdXQgdHlwZT1cXFwiaGlkZGVuXFxcIiBuYW1lPVwiJyArIHRva2VuRmllbGROYW1lICsgJ1wiPicpLnZhbChldmVudC5wYXltZW50TWV0aG9kLmlkKSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGF0LmZvcm1Qcm9jZXNzb3IodGhhdCwgJ3BheW1lbnRSZXF1ZXN0Jyk7XG5cbiAgICAgIH0pO1xuXG4gICAgfSwgLy8gcGF5bWVudFJlcXVlc3RCdXR0b25cblxuICAgIGhpZGVQYXltZW50UmVxdWVzdDogZnVuY3Rpb24oIGhpZGVFbGVtZW50ICkge1xuICAgICAgaGlkZUVsZW1lbnQuaGlkZSgpO1xuICAgICAgJCgnLmRlY2xpbmUtYXBwbGUtcGF5IGEnKS5oaWRlKCk7XG4gICAgICAkKCcubS1wYXktd2l0aG91dC1wYXltZW50LXJlcXVlc3QnKS5zaG93KCk7XG4gICAgICAkKCcuYS1nLXJlY2FwdGNoYScpLmluc2VydEFmdGVyKCcubS1wYXktd2l0aG91dC1wYXltZW50LXJlcXVlc3QgLm0tZm9ybS1hY3Rpb25zLXBheS1mZWVzJyk7XG4gICAgfSwgLy8gaGlkZVBheW1lbnRSZXF1ZXN0XG5cbiAgICBjaG9vc2VQYXltZW50TWV0aG9kOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG5cbiAgICAgIHZhciB0aGF0ID0gdGhpcztcblxuICAgICAgaWYgKCQob3B0aW9ucy5jaG9vc2VfcGF5bWVudCkubGVuZ3RoID4gMCkge1xuICAgICAgICBpZiAoJChvcHRpb25zLmNob29zZV9wYXltZW50ICsgJyBpbnB1dCcpLmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgICAgdmFyIGNoZWNrZWRfaWQgPSAkKG9wdGlvbnMuY2hvb3NlX3BheW1lbnQgKyAnIGlucHV0OmNoZWNrZWQnKS5hdHRyKCdpZCcpO1xuICAgICAgICAgIHZhciBjaGVja2VkX3ZhbHVlID0gJChvcHRpb25zLmNob29zZV9wYXltZW50ICsgJyBpbnB1dDpjaGVja2VkJykudmFsKCk7XG4gICAgICAgICAgdGhhdC5zZXR1cFBheW1lbnRNZXRob2QoY2hlY2tlZF9pZCwgY2hlY2tlZF92YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICAkKG9wdGlvbnMuY2hvb3NlX3BheW1lbnQgKyAnIGlucHV0JykuY2hhbmdlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgY2hlY2tlZF9pZCA9IHRoaXMuaWQ7XG4gICAgICAgICAgdmFyIGNoZWNrZWRfdmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgICAgICAgIHRoYXQuc2V0dXBQYXltZW50TWV0aG9kKGNoZWNrZWRfaWQsIGNoZWNrZWRfdmFsdWUpO1xuICAgICAgICB9KTtcblxuICAgICAgfVxuICAgIH0sIC8vIGNob29zZVBheW1lbnRNZXRob2RcblxuICAgIHNldHVwUGF5bWVudE1ldGhvZDogZnVuY3Rpb24oZWxlbWVudF9pZCwgZWxlbWVudF92YWx1ZSkge1xuICAgICAgdmFyIHN0cmlwZV9wYXltZW50X3R5cGUgPSB0aGlzLnNldFN0cmlwZVBheW1lbnRUeXBlKGVsZW1lbnRfdmFsdWUpO1xuICAgICAgaWYgKCBlbGVtZW50X3ZhbHVlID09PSAnYmFua19hY2NvdW50JyApIHtcbiAgICAgICAgJCgnaW5wdXRbbmFtZT1cInBheW1lbnRfbWV0aG9kX2lkXCJdJywgJCh0aGlzLm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpKS5yZW1vdmUoKTtcbiAgICAgICAgdGhpcy5hY2hGaWVsZHModGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yZW1vdmVBY2hGaWVsZHModGhpcy5vcHRpb25zKTtcbiAgICAgIH1cbiAgICAgICQodGhpcy5vcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAkKHRoaXMub3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvciArICcuJyArIGVsZW1lbnRfaWQpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICQodGhpcy5vcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yICsgJzpub3QoLmFjdGl2ZSkgaW5wdXQnKS52YWwoJycpO1xuICAgICAgdGhpcy5jYWxjdWxhdGVGZWVzKHRoaXMub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQsIHN0cmlwZV9wYXltZW50X3R5cGUpO1xuICAgIH0sIC8vIHNldHVwUGF5bWVudE1ldGhvZFxuXG4gICAgcmVtb3ZlQWNoRmllbGRzOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAkKCdpbnB1dFtuYW1lPVwicHVibGljX3Rva2VuXCJdJywgJChvcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKSkucmVtb3ZlKCk7XG4gICAgICAkKCdpbnB1dFtuYW1lPVwiYWNjb3VudF9pZFwiXScsICQob3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikpLnJlbW92ZSgpO1xuICAgICAgJCgnaW5wdXRbbmFtZT1cImJhbmtUb2tlblwiXScsICQob3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikpLnJlbW92ZSgpO1xuICAgICAgJChvcHRpb25zLnBsYWlkX2xpbmspLmh0bWwoJzxhIGhyZWY9XCIjXCI+U2lnbiBpbiB0byB5b3VyIGJhbmsgYWNjb3VudDwvYT4nKTtcbiAgICAgIHRoaXMuYnV0dG9uRGlzYWJsZWQob3B0aW9ucywgZmFsc2UsICcnLCAnJywgdHJ1ZSk7IC8vIGlmIHRoZSBidXR0b24gd2FzIGRpc2FibGVkLCByZS1lbmFibGUgaXRcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5saW5rSGFuZGxlciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhpcy5saW5rSGFuZGxlci5kZXN0cm95KCk7XG4gICAgICB9XG4gICAgfSwgLy8gcmVtb3ZlQWNoRmllbGRzXG5cbiAgICBjcmVkaXRDYXJkRmllbGRzOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG5cbiAgICAgIHZhciB0aGF0ID0gdGhpcztcblxuICAgICAgdmFyIHN0eWxlID0ge1xuICAgICAgICBiYXNlOiB7XG4gICAgICAgICAgaWNvbkNvbG9yOiAnIzY2NkVFOCcsXG4gICAgICAgICAgbGluZUhlaWdodDogJzQzcHgnLFxuICAgICAgICAgIGZvbnRXZWlnaHQ6IDQwMCxcbiAgICAgICAgICBmb250RmFtaWx5OiAnZmYtbWV0YS13ZWItcHJvJyxcbiAgICAgICAgICBmb250U2l6ZTogJzI0cHgnLFxuICAgICAgICAgIC8vbGluZUhlaWdodDogJzM3cHgnLFxuICAgICAgICAgIC8vZm9udFNpemU6ICcxNnB4JyxcbiAgICAgICAgfSxcbiAgICAgICAgaW52YWxpZDoge1xuICAgICAgICAgIGNvbG9yOiAnIzFhMTgxOCcsXG4gICAgICAgIH0sXG4gICAgICB9O1xuXG4gICAgICAvLyBBZGQgYW4gaW5zdGFuY2Ugb2YgdGhlIGNhcmQgVUkgY29tcG9uZW50IGludG8gdGhlIGBjYXJkLWVsZW1lbnRgIDxkaXY+XG4gICAgICAvL2NhcmQubW91bnQoJyNjYXJkLWVsZW1lbnQnKTtcbiAgICAgIGlmICggJCgnLmNyZWRpdC1jYXJkLWdyb3VwJykubGVuZ3RoID09PSAwICYmICQoJy5wYXltZW50LW1ldGhvZC5jaG9vc2UtY2FyZCcpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGF0LmNhcmROdW1iZXJFbGVtZW50ID0gdGhhdC5lbGVtZW50cy5jcmVhdGUoJ2NhcmROdW1iZXInLCB7XG4gICAgICAgIHNob3dJY29uOiB0cnVlLFxuICAgICAgICBzdHlsZTogc3R5bGVcbiAgICAgIH0pO1xuICAgICAgdGhhdC5jYXJkTnVtYmVyRWxlbWVudC5tb3VudChvcHRpb25zLmNjX251bV9zZWxlY3Rvcik7XG5cbiAgICAgIHRoYXQuY2FyZEV4cGlyeUVsZW1lbnQgPSB0aGF0LmVsZW1lbnRzLmNyZWF0ZSgnY2FyZEV4cGlyeScsIHtcbiAgICAgICAgc3R5bGU6IHN0eWxlXG4gICAgICB9KTtcbiAgICAgIHRoYXQuY2FyZEV4cGlyeUVsZW1lbnQubW91bnQob3B0aW9ucy5jY19leHBfc2VsZWN0b3IpO1xuXG4gICAgICB0aGF0LmNhcmRDdmNFbGVtZW50ID0gdGhhdC5lbGVtZW50cy5jcmVhdGUoJ2NhcmRDdmMnLCB7XG4gICAgICAgIHN0eWxlOiBzdHlsZVxuICAgICAgfSk7XG4gICAgICB0aGF0LmNhcmRDdmNFbGVtZW50Lm1vdW50KG9wdGlvbnMuY2NfY3ZjX3NlbGVjdG9yKTtcblxuICAgICAgLy8gdmFsaWRhdGUvZXJyb3IgaGFuZGxlIHRoZSBjYXJkIGZpZWxkc1xuICAgICAgdGhhdC5jYXJkTnVtYmVyRWxlbWVudC5vbignY2hhbmdlJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgdmFyIHN0cmlwZV9wYXltZW50X3R5cGUgPSAnY2FyZCc7XG4gICAgICAgIC8vIFN3aXRjaCBwYXltZW50IHR5cGUgaWYgaXQncyBvbmUgdGhhdCB3ZSByZWNvZ25pemUgYXMgZGlzdGluY3RcbiAgICAgICAgaWYgKGV2ZW50LmJyYW5kKSB7XG4gICAgICAgICAgaWYgKCBldmVudC5icmFuZCA9PT0gJ2FtZXgnICkge1xuICAgICAgICAgICAgc3RyaXBlX3BheW1lbnRfdHlwZSA9ICdhbWV4JztcbiAgICAgICAgICB9ICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIC8vIGVycm9yIGhhbmRsaW5nXG4gICAgICAgIHRoYXQuc3RyaXBlRXJyb3JEaXNwbGF5KGV2ZW50LmVycm9yLCAkKG9wdGlvbnMuY2NfbnVtX3NlbGVjdG9yLCBlbGVtZW50KSwgZWxlbWVudCwgb3B0aW9ucyApO1xuICAgICAgICAvLyBpZiBpdCBjaGFuZ2VkLCByZXNldCB0aGUgYnV0dG9uXG4gICAgICAgIHRoYXQuYnV0dG9uU3RhdHVzKG9wdGlvbnMsICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKSwgZmFsc2UpO1xuICAgICAgICB0aGF0LmNhbGN1bGF0ZUZlZXModGhhdC5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCwgc3RyaXBlX3BheW1lbnRfdHlwZSk7XG4gICAgICB9KTtcblxuICAgICAgdGhhdC5jYXJkRXhwaXJ5RWxlbWVudC5vbignY2hhbmdlJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgLy8gZXJyb3IgaGFuZGxpbmdcbiAgICAgICAgdGhhdC5zdHJpcGVFcnJvckRpc3BsYXkoZXZlbnQuZXJyb3IsICQob3B0aW9ucy5jY19leHBfc2VsZWN0b3IsIGVsZW1lbnQpLCBlbGVtZW50LCBvcHRpb25zICk7XG4gICAgICAgIC8vIGlmIGl0IGNoYW5nZWQsIHJlc2V0IHRoZSBidXR0b25cbiAgICAgICAgdGhhdC5idXR0b25TdGF0dXMob3B0aW9ucywgJCh0aGF0Lm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLmZpbmQoJ2J1dHRvbicpLCBmYWxzZSk7XG4gICAgICB9KTtcblxuICAgICAgdGhhdC5jYXJkQ3ZjRWxlbWVudC5vbignY2hhbmdlJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgLy8gZXJyb3IgaGFuZGxpbmdcbiAgICAgICAgdGhhdC5zdHJpcGVFcnJvckRpc3BsYXkoZXZlbnQuZXJyb3IsICQob3B0aW9ucy5jY19jdmNfc2VsZWN0b3IsIGVsZW1lbnQpLCBlbGVtZW50LCBvcHRpb25zICk7XG4gICAgICAgIC8vIGlmIGl0IGNoYW5nZWQsIHJlc2V0IHRoZSBidXR0b25cbiAgICAgICAgdGhhdC5idXR0b25TdGF0dXMob3B0aW9ucywgJCh0aGF0Lm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLmZpbmQoJ2J1dHRvbicpLCBmYWxzZSk7XG4gICAgICB9KTtcblxuICAgICAgLy8gdGhpcyBpcyB0aGUgbWV0aG9kIHRvIGNyZWF0ZSBhIHNpbmdsZSBjYXJkIGZpZWxkIGFuZCBtb3VudCBpdFxuICAgICAgLyp2YXIgY2FyZCA9IHRoYXQuZWxlbWVudHMuY3JlYXRlKFxuICAgICAgICAnY2FyZCcsXG4gICAgICAgIHtcbiAgICAgICAgICBoaWRlUG9zdGFsQ29kZTogdHJ1ZVxuICAgICAgICB9XG4gICAgICApO1xuICAgICAgLy8gQWRkIGFuIGluc3RhbmNlIG9mIHRoZSBjYXJkIFVJIGNvbXBvbmVudCBpbnRvIHRoZSBgY2FyZC1lbGVtZW50YCA8ZGl2PlxuICAgICAgY2FyZC5tb3VudCgnI2NhcmQtZWxlbWVudCcpOyovXG5cbiAgICB9LCAvLyBjcmVkaXRDYXJkRmllbGRzXG5cbiAgICBzaG93U3Bpbm5lcjogZnVuY3Rpb24oKSB7XG4gICAgICAkKHRoaXMub3B0aW9ucy5wbGFpZF9saW5rKS5oaWRlKCk7XG4gICAgICAkKHRoaXMub3B0aW9ucy5wbGFpZF9saW5rKS5hZnRlcignPGRpdiBjbGFzcz1cImEtc3Bpbm5lclwiPjxpbWcgc3JjPVwiaHR0cHM6Ly93d3cubWlubnBvc3QuY29tL3dwLWFkbWluL2ltYWdlcy9zcGlubmVyLmdpZlwiIHNyY3NldD1cImh0dHBzOi8vd3d3Lm1pbm5wb3N0LmNvbS93cC1hZG1pbi9pbWFnZXMvc3Bpbm5lci5naWYgMXgsIGh0dHBzOi8vd3d3Lm1pbm5wb3N0LmNvbS93cC1hZG1pbi9pbWFnZXMvc3Bpbm5lci0yeC5naWYgMngsXCI+PC9kaXY+Jyk7XG4gICAgfSxcblxuICAgIGhpZGVTcGlubmVyOiBmdW5jdGlvbigpIHtcbiAgICAgICQodGhpcy5vcHRpb25zLnBsYWlkX2xpbmspLnNob3coKTtcbiAgICAgICQoJy5hLXNwaW5uZXInKS5oaWRlKCk7XG4gICAgfSxcblxuICAgIGFjaEZpZWxkczogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgdmFyIGJhbmtUb2tlbkZpZWxkTmFtZSA9ICdiYW5rVG9rZW4nO1xuICAgICAgdmFyIGJhbmtUb2tlbkZpZWxkID0gJ2lucHV0W25hbWU9XCInICsgYmFua1Rva2VuRmllbGROYW1lICsgJ1wiXSc7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAvLyB0aGUgYnV0dG9uIHNob3VsZCBub3QgYmUgY2xpY2thYmxlIHVudGlsIHRoZSB1c2VyIGhhcyBzaWduZWQgaW5cbiAgICAgIHRoYXQuYnV0dG9uRGlzYWJsZWQob3B0aW9ucywgdHJ1ZSwgJycsICdTaWduIGluIHRvIHlvdXIgYmFuayBhY2NvdW50IChhYm92ZSkgZmlyc3QnKTtcblxuICAgICAgaWYgKHR5cGVvZiBQbGFpZCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhhdC5saW5rSGFuZGxlciA9IFBsYWlkLmNyZWF0ZSh7XG4gICAgICAgICAgY2xpZW50TmFtZTogJ01pbm5Qb3N0JyxcbiAgICAgICAgICBlbnY6IG9wdGlvbnMucGxhaWRfZW52LFxuICAgICAgICAgIHByb2R1Y3Q6IFsnYXV0aCddLFxuICAgICAgICAgIC8vIDEuIFBhc3MgdGhlIHRva2VuIGdlbmVyYXRlZCBpbiBzdGVwIDIuXG4gICAgICAgICAgdG9rZW46IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGFpZF9saW5rX3Rva2VuJykudmFsdWUsXG4gICAgICAgICAgb25TdWNjZXNzOiBmdW5jdGlvbihwdWJsaWNfdG9rZW4sIG1ldGFkYXRhKSB7XG4gICAgICAgICAgICB0aGF0LnNob3dTcGlubmVyKCk7XG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICB1cmw6Jy9nZXRfcGxhaWRfYWNjZXNzX3Rva2VuLycsXG4gICAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHsgcHVibGljX3Rva2VuOiBwdWJsaWNfdG9rZW4sIGFjY291bnRfaWQ6IG1ldGFkYXRhLmFjY291bnRfaWQgfSksXG4gICAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04J1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgIGlmICh0eXBlb2YgcmVzcG9uc2UuZXJyb3IgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgLy8gdGhlcmUgaXMgYW4gZXJyb3IuXG4gICAgICAgICAgICAgICAgdGhhdC5oaWRlU3Bpbm5lcigpO1xuICAgICAgICAgICAgICAgICQob3B0aW9ucy5wbGFpZF9saW5rKS5iZWZvcmUoJzxwIGNsYXNzPVwiYS1lcnJvciBhLXZhbGlkYXRpb24tZXJyb3JcIj4nICsgcmVzcG9uc2UuZXJyb3IgKyAnPC9wPicpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vdGhpcy5kZWJ1ZygncHJpbnQgcmVzcG9uc2UgaGVyZScpO1xuICAgICAgICAgICAgICAgIC8vdGhpcy5kZWJ1ZyhyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgLy8gYWRkIHRoZSBmaWVsZChzKSB3ZSBuZWVkIHRvIHRoZSBmb3JtIGZvciBzdWJtaXR0aW5nXG4gICAgICAgICAgICAgICAgaWYgKCQoYmFua1Rva2VuRmllbGQpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICQoYmFua1Rva2VuRmllbGQpLnZhbChyZXNwb25zZS5zdHJpcGVfYmFua19hY2NvdW50X3Rva2VuKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgJChvcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5wcmVwZW5kKCQoJzxpbnB1dCB0eXBlPVxcXCJoaWRkZW5cXFwiIG5hbWU9XCInICsgYmFua1Rva2VuRmllbGROYW1lICsgJ1wiPicpLnZhbChyZXNwb25zZS5zdHJpcGVfYmFua19hY2NvdW50X3Rva2VuKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICQob3B0aW9ucy5wbGFpZF9saW5rLCBlbGVtZW50KS5odG1sKCc8c3Ryb25nPllvdXIgYWNjb3VudCB3YXMgc3VjY2Vzc2Z1bGx5IGF1dGhvcml6ZWQ8L3N0cm9uZz4nKTtcbiAgICAgICAgICAgICAgICB0aGF0LmhpZGVTcGlubmVyKCk7XG4gICAgICAgICAgICAgICAgdGhhdC5idXR0b25EaXNhYmxlZChvcHRpb25zLCBmYWxzZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZmFpbChmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICB0aGF0LmRlYnVnKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgdGhhdC5oaWRlU3Bpbm5lcigpO1xuICAgICAgICAgICAgICAkKG9wdGlvbnMucGxhaWRfbGluaykuYmVmb3JlKCc8cCBjbGFzcz1cImEtZXJyb3IgYS12YWxpZGF0aW9uLWVycm9yXCI+JyArIHJlc3BvbnNlLmVycm9yICsgJzwvcD4nKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgICAkKG9wdGlvbnMucGxhaWRfbGluayArICcgYScpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB0aGF0LnJlc2V0Rm9ybUVycm9ycyh0aGF0Lm9wdGlvbnMsIHRoYXQuZWxlbWVudCk7XG4gICAgICAgICAgLy8kKG9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IgKyAnIC5hLWVycm9yJykucmVtb3ZlKCk7IC8vIHJlbW92ZSBtZXRob2QgZXJyb3IgbWVzc2FnZSBpZiBpdCBpcyB0aGVyZVxuICAgICAgICAgIHRoYXQubGlua0hhbmRsZXIub3BlbigpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LCAvLyBhY2hGaWVsZHNcblxuICAgIGJ1dHRvblN0YXR1czogZnVuY3Rpb24ob3B0aW9ucywgYnV0dG9uLCBkaXNhYmxlZCkge1xuICAgICAgLy8gbWFrZSB0aGUgYnV0dG9uIGNsaWNrYWJsZSBvciBub3RcbiAgICAgIHRoaXMuYnV0dG9uRGlzYWJsZWQob3B0aW9ucywgZGlzYWJsZWQsIGJ1dHRvbik7XG4gICAgICBpZiAoZGlzYWJsZWQgPT09IGZhbHNlKSB7XG4gICAgICAgIGJ1dHRvbi50ZXh0KG9wdGlvbnMuYnV0dG9uX3RleHQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnV0dG9uLnRleHQoJ1Byb2Nlc3NpbmcnKTtcbiAgICAgIH1cbiAgICB9LCAvLyBidXR0b25TdGF0dXNcblxuICAgIGJ1dHRvbkRpc2FibGVkOiBmdW5jdGlvbihvcHRpb25zLCBkaXNhYmxlZCwgYnV0dG9uID0gJycsIG1lc3NhZ2UgPSAnJywgYWNoX3dhc19pbml0aWFsaXplZCA9IGZhbHNlKSB7XG4gICAgICBpZiAoYnV0dG9uID09PSAnJykge1xuICAgICAgICBidXR0b24gPSAkKG9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLmZpbmQoJ2J1dHRvbicpO1xuICAgICAgfVxuICAgICAgYnV0dG9uLnByb3AoJ2Rpc2FibGVkJywgZGlzYWJsZWQpO1xuICAgICAgaWYgKHR5cGVvZiB0bGl0ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgaWYgKG1lc3NhZ2UgIT09ICcnKSB7XG4gICAgICAgICAgaWYgKGRpc2FibGVkID09PSB0cnVlKSB7XG4gICAgICAgICAgICBidXR0b24uYXR0cignZGF0YS10bGl0ZScsIG1lc3NhZ2UpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBidXR0b24ucmVtb3ZlQXR0ciggJ2RhdGEtdGxpdGUnICk7IC8vIHRoZXJlIHNob3VsZCBiZSBubyB0bGl0ZSB2YWx1ZSBpZiB0aGUgYnV0dG9uIGlzIGVuYWJsZWRcbiAgICAgICAgICB9XG4gICAgICAgICAgYnV0dG9uLm9uKCdtb3VzZWVudGVyIGZvY3VzJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIHRsaXRlLnNob3coICggdGhpcyApLCB7IGdyYXY6ICdudycgfSApO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGJ1dHRvbi5vbignbW91c2VsZWF2ZScsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICB0bGl0ZS5oaWRlKCAoIHRoaXMgKSApO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJ1dHRvbi5yZW1vdmVBdHRyKCAnZGF0YS10bGl0ZScgKTtcbiAgICAgICAgICBpZiAoYWNoX3dhc19pbml0aWFsaXplZCA9PT0gdHJ1ZSApIHtcbiAgICAgICAgICAgIGJ1dHRvbi5vbignbW91c2VlbnRlciBmb2N1cycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAgIHRsaXRlLmhpZGUoICggdGhpcyApICk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGJ1dHRvbi5jbGljayhmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIC8vIGJ1dHRvbkRpc2FibGVkXG5cbiAgICB2YWxpZGF0ZVNldHVwOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICB2YXIgZm9ybXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKG9wdGlvbnMuZm9ybV9zZWxlY3Rvcik7XG4gICAgICBmb3Jtcy5mb3JFYWNoKCBmdW5jdGlvbiAoIGZvcm0gKSB7XG4gICAgICAgIFZhbGlkRm9ybSggZm9ybSwge1xuICAgICAgICAgIHZhbGlkYXRpb25FcnJvclBhcmVudENsYXNzOiAnbS1oYXMtdmFsaWRhdGlvbi1lcnJvcicsXG4gICAgICAgICAgdmFsaWRhdGlvbkVycm9yQ2xhc3M6ICdhLXZhbGlkYXRpb24tZXJyb3InLFxuICAgICAgICAgIGludmFsaWRDbGFzczogJ2EtZXJyb3InLFxuICAgICAgICAgIGVycm9yUGxhY2VtZW50OiAnYWZ0ZXInXG4gICAgICAgIH0gKVxuICAgICAgfSApO1xuICAgICAgdGhpcy5zY3JvbGxUb0Zvcm1FcnJvcihvcHRpb25zKTtcbiAgICB9LCAvLyB2YWxpZGF0ZVNldHVwXG5cbiAgICBzY3JvbGxUb0Zvcm1FcnJvcjogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgdmFyIGZvcm0gPSAkKCBvcHRpb25zLmZvcm1fc2VsZWN0b3IgKTtcbiAgICAgIC8vIGxpc3RlbiBmb3IgYGludmFsaWRgIGV2ZW50cyBvbiBhbGwgZm9ybSBpbnB1dHNcbiAgICAgIGZvcm0uZmluZCggJzppbnB1dCcgKS5vbiggJ2ludmFsaWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyIGlucHV0ID0gJCggdGhpcyApO1xuICAgICAgICAgIC8vIHRoZSBmaXJzdCBpbnZhbGlkIGVsZW1lbnQgaW4gdGhlIGZvcm1cbiAgICAgICAgdmFyIGZpcnN0ID0gZm9ybS5maW5kKCAnLmEtZXJyb3InICkuZmlyc3QoKTtcbiAgICAgICAgLy8gdGhlIGZvcm0gaXRlbSB0aGF0IGNvbnRhaW5zIGl0XG4gICAgICAgIHZhciBmaXJzdF9ob2xkZXIgPSBmaXJzdC5wYXJlbnQoKTtcbiAgICAgICAgICAvLyBvbmx5IGhhbmRsZSBpZiB0aGlzIGlzIHRoZSBmaXJzdCBpbnZhbGlkIGlucHV0XG4gICAgICAgICAgaWYgKGlucHV0WzBdID09PSBmaXJzdFswXSkge1xuICAgICAgICAgICAgICAvLyBoZWlnaHQgb2YgdGhlIG5hdiBiYXIgcGx1cyBzb21lIHBhZGRpbmcgaWYgdGhlcmUncyBhIGZpeGVkIG5hdlxuICAgICAgICAgICAgICAvL3ZhciBuYXZiYXJIZWlnaHQgPSBuYXZiYXIuaGVpZ2h0KCkgKyA1MFxuXG4gICAgICAgICAgICAgIC8vIHRoZSBwb3NpdGlvbiB0byBzY3JvbGwgdG8gKGFjY291bnRpbmcgZm9yIHRoZSBuYXZiYXIgaWYgaXQgZXhpc3RzKVxuICAgICAgICAgICAgICB2YXIgZWxlbWVudE9mZnNldCA9IGZpcnN0X2hvbGRlci5vZmZzZXQoKS50b3A7XG5cbiAgICAgICAgICAgICAgLy8gdGhlIGN1cnJlbnQgc2Nyb2xsIHBvc2l0aW9uIChhY2NvdW50aW5nIGZvciB0aGUgbmF2YmFyKVxuICAgICAgICAgICAgICB2YXIgcGFnZU9mZnNldCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcblxuICAgICAgICAgICAgICAvLyBkb24ndCBzY3JvbGwgaWYgdGhlIGVsZW1lbnQgaXMgYWxyZWFkeSBpbiB2aWV3XG4gICAgICAgICAgICAgIGlmICggZWxlbWVudE9mZnNldCA+IHBhZ2VPZmZzZXQgJiYgZWxlbWVudE9mZnNldCA8IHBhZ2VPZmZzZXQgKyB3aW5kb3cuaW5uZXJIZWlnaHQgKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIC8vIG5vdGU6IGF2b2lkIHVzaW5nIGFuaW1hdGUsIGFzIGl0IHByZXZlbnRzIHRoZSB2YWxpZGF0aW9uIG1lc3NhZ2UgZGlzcGxheWluZyBjb3JyZWN0bHlcbiAgICAgICAgICAgICAgJCggJ2h0bWwsIGJvZHknICkuc2Nyb2xsVG9wKCBlbGVtZW50T2Zmc2V0ICk7XG4gICAgICAgICAgfVxuICAgICAgfSApO1xuICAgIH0sIC8vIHNjcm9sbFRvRm9ybUVycm9yXG5cbiAgICBmb3JtU2V0dXA6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcblxuICAgICAgJChvcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5zdWJtaXQoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhhdC5mb3JtUHJvY2Vzc29yKHRoYXQsICdzdWJtaXQnKTtcblxuICAgICAgfSk7XG4gICAgfSwgLy8gZm9ybVNldHVwXG5cbiAgICBmb3JtUHJvY2Vzc29yOiBmdW5jdGlvbih0aGF0LCB0eXBlKSB7XG5cbiAgICAgIC8vIDEuIHJlbW92ZSBwcmV2aW91cyBlcnJvcnMgYW5kIHJlc2V0IHRoZSBidXR0b25cbiAgICAgIHRoYXQucmVzZXRGb3JtRXJyb3JzKHRoYXQub3B0aW9ucywgdGhhdC5lbGVtZW50KTtcblxuICAgICAgLy8gMi4gc2V0IHVwIHRoZSBidXR0b24gaWYgaXQncyBhIGZvcm0gc3VibWl0XG4gICAgICBpZiAodHlwZSA9PT0gJ3N1Ym1pdCcpIHtcbiAgICAgICAgdGhhdC5idXR0b25TdGF0dXModGhhdC5vcHRpb25zLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIHRydWUpO1xuICAgICAgfVxuXG4gICAgICAvLyAzLiBnZW5lcmF0ZSBiaWxsaW5nIGFkZHJlc3MgZGV0YWlsc1xuICAgICAgdmFyIGJpbGxpbmdEZXRhaWxzID0gdGhhdC5nZW5lcmF0ZUJpbGxpbmdEZXRhaWxzKCk7XG5cbiAgICAgIC8vIDQuIGNyZWF0ZSBtaW5ucG9zdCB1c2VyIGFjY291bnRcbiAgICAgIHRoYXQuY3JlYXRlTWlublBvc3RBY2NvdW50KHRoYXQub3B0aW9ucywgdGhhdC5lbGVtZW50KTtcblxuICAgICAgLy8gNS4gZG8gdGhlIGNoYXJnaW5nIG9mIGNhcmQgb3IgYmFuayBhY2NvdW50IGlmIGl0J3MgYSBmb3JtIHN1Ym1pdFxuICAgICAgLy8gb3Igc3VibWl0IHRoZSBmb3JtIGlmIHRoaXMgaXMgYSBwYXltZW50IHJlcXVlc3QgYnV0dG9uXG4gICAgICBpZiAodHlwZSA9PT0gJ3N1Ym1pdCcpIHtcbiAgICAgICAgdmFyIHBheW1lbnRfdHlwZSA9ICQoJ2lucHV0W25hbWU9XCJzdHJpcGVfcGF5bWVudF90eXBlXCJdJykudmFsKCk7XG4gICAgICAgIGlmIChwYXltZW50X3R5cGUgIT09ICdiYW5rX2FjY291bnQnKSB7XG4gICAgICAgICAgLy8gZmluYWxseSwgZ2V0IGEgcGF5bWVudCBtZXRob2QgZnJvbSBzdHJpcGUsIGFuZCB0cnkgdG8gY2hhcmdlIGl0IGlmIGl0IGlzIG5vdCBhY2hcbiAgICAgICAgICB0aGF0LmNyZWF0ZVBheW1lbnRNZXRob2QodGhhdC5jYXJkTnVtYmVyRWxlbWVudCwgYmlsbGluZ0RldGFpbHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGlmIGl0IGlzIGFjaCwgd2UgYWxyZWFkeSBoYXZlIGEgdG9rZW4gc28gc3VibWl0IHRoZSBmb3JtXG4gICAgICAgICAgLy8gdG9kbzogdXBncmFkZSB0aGUgcGxhaWQgaW50ZWdyYXRpb25cbiAgICAgICAgICB0aGF0LmJhbmtUb2tlbkhhbmRsZXIoICQoJ2lucHV0W25hbWU9XCJiYW5rVG9rZW5cIl0nKS52YWwoKSwgJ2JhbmtfYWNjb3VudCcgKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhhdC5zdWJtaXRGb3JtT25seSgpO1xuICAgICAgfVxuICAgIH0sIC8vIGZvcm1Qcm9jZXNzb3JcblxuICAgIHN0cmlwZUVycm9yRGlzcGxheTogZnVuY3Rpb24oZXJyb3IsIHRoaXNfc2VsZWN0b3IsIGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIC8vIGxpc3RlbiBmb3IgZXJyb3JzIGFuZCBkaXNwbGF5L2hpZGUgZXJyb3IgbWVzc2FnZXNcbiAgICAgIHZhciB3aGljaF9lcnJvciA9IHRoaXNfc2VsZWN0b3IuYXR0cignaWQnKTtcbiAgICAgIC8vIHdoZW4gdGhpcyBmaWVsZCBjaGFuZ2VzLCByZXNldCBpdHMgZXJyb3JzXG4gICAgICAkKCcuYS1jYXJkLWluc3RydWN0aW9uLicgKyB3aGljaF9lcnJvcikucmVtb3ZlQ2xhc3MoJ2EtdmFsaWRhdGlvbi1lcnJvcicpO1xuICAgICAgJCgnLmEtY2FyZC1pbnN0cnVjdGlvbi4nICsgd2hpY2hfZXJyb3IpLmVtcHR5KCk7XG4gICAgICAkKHRoaXNfc2VsZWN0b3IpLnJlbW92ZUNsYXNzKCdhLWVycm9yJyk7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgaWYgKCQoJy5hLWNhcmQtaW5zdHJ1Y3Rpb24uJyArIHdoaWNoX2Vycm9yKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgJCgnLmEtY2FyZC1pbnN0cnVjdGlvbi4nICsgd2hpY2hfZXJyb3IpLnRleHQoZXJyb3IubWVzc2FnZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpc19zZWxlY3Rvci5wYXJlbnQoKS5hcHBlbmQoJzxwIGNsYXNzPVwiYS1jYXJkLWluc3RydWN0aW9uICcgKyB3aGljaF9lcnJvciArICdcIj4nICsgZXJyb3IubWVzc2FnZSArICc8L3A+Jyk7XG4gICAgICAgIH1cbiAgICAgICAgJCgnLmEtY2FyZC1pbnN0cnVjdGlvbi4nICsgd2hpY2hfZXJyb3IpLmFkZENsYXNzKCdhLXZhbGlkYXRpb24tZXJyb3InKTtcbiAgICAgICAgdGhpc19zZWxlY3Rvci5wYXJlbnQoKS5hZGRDbGFzcygnbS1oYXMtdmFsaWRhdGlvbi1lcnJvcicpO1xuICAgICAgICAkKHRoaXNfc2VsZWN0b3IpLmFkZENsYXNzKCdhLWVycm9yJyk7XG4gICAgICAgIGlmICh0aGlzX3NlbGVjdG9yLnBhcmVudCgpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgICBzY3JvbGxUb3A6IHRoaXNfc2VsZWN0b3IucGFyZW50KCkub2Zmc2V0KCkudG9wXG4gICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQodGhpc19zZWxlY3RvcikucmVtb3ZlQ2xhc3MoJ2EtZXJyb3InKTtcbiAgICAgICAgJCgnLmEtY2FyZC1pbnN0cnVjdGlvbi4nICsgd2hpY2hfZXJyb3IpLnJlbW92ZUNsYXNzKCdhLXZhbGlkYXRpb24tZXJyb3InKTtcbiAgICAgICAgJCgnLmEtY2FyZC1pbnN0cnVjdGlvbi4nICsgd2hpY2hfZXJyb3IpLmVtcHR5KCk7XG4gICAgICAgICQob3B0aW9ucy5jY19udW1fc2VsZWN0b3IsIGVsZW1lbnQpLnJlbW92ZUNsYXNzKCdhLXZhbGlkYXRpb24tZXJyb3InKTtcbiAgICAgICAgJChvcHRpb25zLmNjX2V4cF9zZWxlY3RvciwgZWxlbWVudCkucmVtb3ZlQ2xhc3MoJ2EtdmFsaWRhdGlvbi1lcnJvcicpO1xuICAgICAgICAkKG9wdGlvbnMuY2NfY3ZjX3NlbGVjdG9yLCBlbGVtZW50KS5yZW1vdmVDbGFzcygnYS12YWxpZGF0aW9uLWVycm9yJyk7XG4gICAgICAgICQob3B0aW9ucy5jY19udW1fc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdtLWhhcy12YWxpZGF0aW9uLWVycm9yJyk7XG4gICAgICAgICQob3B0aW9ucy5jY19leHBfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdtLWhhcy12YWxpZGF0aW9uLWVycm9yJyk7XG4gICAgICAgICQob3B0aW9ucy5jY19jdmNfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdtLWhhcy12YWxpZGF0aW9uLWVycm9yJyk7XG4gICAgICB9XG4gICAgfSwgLy8gc3RyaXBlRXJyb3JEaXNwbGF5XG5cbiAgICByZXNldEZvcm1FcnJvcnM6IGZ1bmN0aW9uKG9wdGlvbnMsIGVsZW1lbnQpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICQoJy5hLXZhbGlkYXRpb24tZXJyb3InKS5yZW1vdmUoKTtcbiAgICAgICQoJ2lucHV0LCBsYWJlbCwgZGl2JywgZWxlbWVudCkucmVtb3ZlQ2xhc3MoJ2EtZXJyb3InKTtcbiAgICAgICQoJ2xhYmVsJywgZWxlbWVudCkucmVtb3ZlQ2xhc3MoJ20taGFzLXZhbGlkYXRpb24tZXJyb3InKTtcbiAgICAgICQob3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvciwgZWxlbWVudCkucmVtb3ZlQ2xhc3MoJ2EtZXJyb3IgaW52YWxpZCcpO1xuICAgICAgJCgnLmEtdmFsaWRhdGlvbi1lcnJvcicpLnJlbW92ZSgpO1xuICAgICAgXG4gICAgICAkKG9wdGlvbnMuY2hvb3NlX3BheW1lbnQgKyAnIGlucHV0JykuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICAkKG9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IgKyAnIC5hLWVycm9yJykucmVtb3ZlKCk7IC8vIHJlbW92ZSBtZXRob2QgZXJyb3IgbWVzc2FnZSBpZiBpdCBpcyB0aGVyZVxuICAgICAgICAkKG9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IpLnBhcmVudCgpLmZpbmQoJy5hLXZhbGlkYXRpb24tZXJyb3InKS5yZW1vdmUoKTtcbiAgICAgICAgLy8gaWYgYSBwYXltZW50IGZpZWxkIGNoYW5nZWQsIHJlc2V0IHRoZSBidXR0b25cbiAgICAgICAgdGhhdC5idXR0b25TdGF0dXMob3B0aW9ucywgJChvcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKSwgZmFsc2UpO1xuICAgICAgfSk7XG4gICAgfSwgLy8gcmVzZXRGb3JtRXJyb3JzXG4gICAgXG4gICAgY3JlYXRlTWlublBvc3RBY2NvdW50OiBmdW5jdGlvbihvcHRpb25zLCBlbGVtZW50KSB7XG4gICAgICAvLyAyLiBjcmVhdGUgbWlubnBvc3QgYWNjb3VudCBpZiBzcGVjaWZpZWRcbiAgICAgIGlmIChvcHRpb25zLmNyZWF0ZV9hY2NvdW50ID09PSB0cnVlKSB7XG4gICAgICAgIHZhciB1c2VyID0ge1xuICAgICAgICAgIGVtYWlsOiAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgIGZpcnN0X25hbWU6ICQob3B0aW9ucy5maXJzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICBsYXN0X25hbWU6ICQob3B0aW9ucy5sYXN0X25hbWVfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgIHBhc3N3b3JkOiAkKG9wdGlvbnMucGFzc3dvcmRfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgIGNpdHk6ICQob3B0aW9ucy5iaWxsaW5nX2NpdHlfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgIHN0YXRlOiAkKG9wdGlvbnMuYmlsbGluZ19zdGF0ZV9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgemlwOiAkKG9wdGlvbnMuYmlsbGluZ196aXBfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICB9O1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIHVybDogb3B0aW9ucy5taW5ucG9zdF9yb290ICsgJy93cC1qc29uL3VzZXItYWNjb3VudC1tYW5hZ2VtZW50L3YxL2NyZWF0ZS11c2VyJyxcbiAgICAgICAgICBkYXRhOiB1c2VyXG4gICAgICAgIH0pLmRvbmUoZnVuY3Rpb24oIGRhdGEgKSB7XG4gICAgICAgICAgaWYgKGRhdGEuc3RhdHVzID09PSAnc3VjY2VzcycgJiYgZGF0YS5yZWFzb24gPT09ICduZXcgdXNlcicpIHtcbiAgICAgICAgICAgIC8vIHVzZXIgY3JlYXRlZCAtIHRoZXkgc2hvdWxkIHJlY2VpdmUgZW1haWxcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sIC8vIGNyZWF0ZU1pbm5Qb3N0QWNjb3VudFxuICAgIFxuICAgIGdlbmVyYXRlQmlsbGluZ0RldGFpbHM6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGJpbGxpbmdEZXRhaWxzID0ge307XG4gICAgICB2YXIgYWRkcmVzc0RldGFpbHMgPSB7fTtcblxuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yKS52YWwoKSAhPSAnJykge1xuICAgICAgICBiaWxsaW5nRGV0YWlscy5lbWFpbCA9ICQodGhpcy5vcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yKS52YWwoKTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgdmFyIGZ1bGxfbmFtZSA9ICcnO1xuICAgICAgaWYgKCQoJyNmdWxsX25hbWUnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGZ1bGxfbmFtZSA9ICQoJyNmdWxsX25hbWUnKS52YWwoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZ1bGxfbmFtZSA9ICQodGhpcy5vcHRpb25zLmZpcnN0X25hbWVfZmllbGRfc2VsZWN0b3IpLnZhbCgpICsgJyAnICsgJCh0aGlzLm9wdGlvbnMubGFzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yKS52YWwoKTtcbiAgICAgIH1cbiAgICAgIGJpbGxpbmdEZXRhaWxzLm5hbWUgPSBmdWxsX25hbWU7XG5cbiAgICAgIHZhciBzdHJlZXQgPSAnTm9uZSc7XG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuYmlsbGluZ19zdHJlZXRfZmllbGRfc2VsZWN0b3IpLnZhbCgpICE9ICcnKSB7XG4gICAgICAgIHN0cmVldCA9ICQodGhpcy5vcHRpb25zLmJpbGxpbmdfc3RyZWV0X2ZpZWxkX3NlbGVjdG9yKS52YWwoKTtcbiAgICAgICAgYWRkcmVzc0RldGFpbHMubGluZTEgPSBzdHJlZXQ7XG4gICAgICB9XG5cbiAgICAgIHZhciBjaXR5ID0gJ05vbmUnO1xuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmJpbGxpbmdfY2l0eV9maWVsZF9zZWxlY3RvcikudmFsKCkgIT0gJycpIHtcbiAgICAgICAgY2l0eSA9ICQodGhpcy5vcHRpb25zLmJpbGxpbmdfY2l0eV9maWVsZF9zZWxlY3RvcikudmFsKCk7XG4gICAgICAgIGFkZHJlc3NEZXRhaWxzLmNpdHkgPSBjaXR5O1xuICAgICAgfVxuXG4gICAgICB2YXIgc3RhdGUgPSAnTm9uZSc7XG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuYmlsbGluZ19zdGF0ZV9maWVsZF9zZWxlY3RvcikudmFsKCkgIT0gJycpIHtcbiAgICAgICAgc3RhdGUgPSAkKHRoaXMub3B0aW9ucy5iaWxsaW5nX3N0YXRlX2ZpZWxkX3NlbGVjdG9yKS52YWwoKTtcbiAgICAgICAgYWRkcmVzc0RldGFpbHMuc3RhdGUgPSBzdGF0ZTtcbiAgICAgIH1cblxuICAgICAgdmFyIHppcCA9ICdOb25lJztcbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5iaWxsaW5nX3ppcF9maWVsZF9zZWxlY3RvcikudmFsKCkgIT0gJycpIHtcbiAgICAgICAgemlwID0gJCh0aGlzLm9wdGlvbnMuYmlsbGluZ196aXBfZmllbGRfc2VsZWN0b3IpLnZhbCgpO1xuICAgICAgICBhZGRyZXNzRGV0YWlscy5wb3N0YWxfY29kZSA9IHppcDtcbiAgICAgIH1cblxuICAgICAgdmFyIGNvdW50cnkgPSAnVVMnO1xuICAgICAgdmFyIGNvdW50cnlfZmllbGRfdmFsdWUgPSAkKHRoaXMub3B0aW9ucy5iaWxsaW5nX2NvdW50cnlfZmllbGRfc2VsZWN0b3IpLnZhbCgpO1xuICAgICAgaWYgKGNvdW50cnlfZmllbGRfdmFsdWUgIT0gJycgJiYgY291bnRyeV9maWVsZF92YWx1ZSAhPSAnVW5pdGVkIFN0YXRlcycpIHtcbiAgICAgICAgY291bnRyeSA9IGNvdW50cnlfZmllbGRfdmFsdWU7XG4gICAgICB9XG4gICAgICBhZGRyZXNzRGV0YWlscy5jb3VudHJ5ID0gY291bnRyeTtcblxuICAgICAgaWYgKHN0cmVldCAhPT0gJ05vbmUnIHx8IGNpdHkgIT09ICdOb25lJyB8fCBzdGF0ZSAhPT0gJ05vbmUnIHx8IHppcCAhPT0gJ05vbmUnKSB7XG4gICAgICAgIGJpbGxpbmdEZXRhaWxzLmFkZHJlc3MgPSBhZGRyZXNzRGV0YWlscztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGJpbGxpbmdEZXRhaWxzO1xuICAgIH0sIC8vIGdlbmVyYXRlQmlsbGluZ0RldGFpbHNcblxuICAgIGNyZWF0ZVBheW1lbnRNZXRob2Q6IGZ1bmN0aW9uKGNhcmRFbGVtZW50LCBiaWxsaW5nRGV0YWlscykge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdGhhdC5zdHJpcGUuY3JlYXRlUGF5bWVudE1ldGhvZCh7XG4gICAgICAgIHR5cGU6ICdjYXJkJyxcbiAgICAgICAgY2FyZDogY2FyZEVsZW1lbnQsXG4gICAgICAgIGJpbGxpbmdfZGV0YWlsczogYmlsbGluZ0RldGFpbHNcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKHJlc3BvbnNlLmVycm9yKSB7XG4gICAgICAgICAgdGhhdC5oYW5kbGVTZXJ2ZXJFcnJvcihyZXNwb25zZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gU2VuZCBwYXltZW50TWV0aG9kLmlkIHRvIHNlcnZlclxuICAgICAgICAgIHZhciBzdXBwb3J0Zm9ybSA9ICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKTtcbiAgICAgICAgICB2YXIgYWpheF91cmwgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG4gICAgICAgICAgdmFyIHRva2VuRmllbGROYW1lID0gJ3BheW1lbnRfbWV0aG9kX2lkJztcbiAgICAgICAgICB2YXIgdG9rZW5GaWVsZCA9ICdpbnB1dFtuYW1lPVwiJyArIHRva2VuRmllbGROYW1lICsgJ1wiXSc7XG5cbiAgICAgICAgICAvLyBJbnNlcnQgdGhlIHBheW1lbnQgbWV0aG9kIElEIGludG8gdGhlIGZvcm0gc28gaXQgZ2V0cyBzdWJtaXR0ZWQgdG8gdGhlIHNlcnZlclxuICAgICAgICAgIGlmICgkKHRva2VuRmllbGQpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICQodG9rZW5GaWVsZCkudmFsKHJlc3BvbnNlLnBheW1lbnRNZXRob2QuaWQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdXBwb3J0Zm9ybS5hcHBlbmQoJCgnPGlucHV0IHR5cGU9XFxcImhpZGRlblxcXCIgbmFtZT1cIicgKyB0b2tlbkZpZWxkTmFtZSArICdcIj4nKS52YWwocmVzcG9uc2UucGF5bWVudE1ldGhvZC5pZCkpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGZldGNoKGFqYXhfdXJsLCB7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYm9keTogJChzdXBwb3J0Zm9ybSkuc2VyaWFsaXplKClcbiAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAvLyBIYW5kbGUgc2VydmVyIHJlc3BvbnNlIChzZWUgU3RlcCAzKVxuICAgICAgICAgICAgcmVzcG9uc2UuanNvbigpLnRoZW4oZnVuY3Rpb24oanNvbikge1xuICAgICAgICAgICAgICB0aGF0LmhhbmRsZVNlcnZlclJlc3BvbnNlKGpzb24pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSwgLy8gY3JlYXRlUGF5bWVudE1ldGhvZFxuXG4gICAgYmFua1Rva2VuSGFuZGxlcjogZnVuY3Rpb24odG9rZW4sIHR5cGUpIHtcbiAgICAgIHRoaXMuc2V0U3RyaXBlUGF5bWVudFR5cGUodHlwZSk7XG4gICAgICB0aGlzLnN1Ym1pdEZvcm1Pbmx5KCk7XG4gICAgfSwgLy8gYmFua1Rva2VuSGFuZGxlclxuXG4gICAgc3VibWl0Rm9ybU9ubHk6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdmFyIHN1cHBvcnRmb3JtID0gJCh0aGlzLm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpO1xuICAgICAgdmFyIGFqYXhfdXJsID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xuXG4gICAgICAvLyBTdWJtaXQgdGhlIGZvcm1cbiAgICAgIC8vIHRoZSB3YXkgaXQgd29ya3MgY3VycmVudGx5IGlzIHRoZSBmb3JtIHN1Ym1pdHMgYW4gYWpheCByZXF1ZXN0IHRvIGl0c2VsZlxuICAgICAgLy8gdGhlbiBpdCBzdWJtaXRzIGEgcG9zdCByZXF1ZXN0IHRvIHRoZSBmb3JtJ3MgYWN0aW9uIHVybFxuICAgICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBhamF4X3VybCxcbiAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICBkYXRhOiAkKHN1cHBvcnRmb3JtKS5zZXJpYWxpemUoKSxcbiAgICAgICAgdHlwZTogJ1BPU1QnXG4gICAgICB9KVxuICAgICAgLmRvbmUoZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKHR5cGVvZiByZXNwb25zZS5lcnJvcnMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgdGhhdC5oYW5kbGVTZXJ2ZXJFcnJvcihyZXNwb25zZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3VwcG9ydGZvcm0uZ2V0KDApLnN1Ym1pdCgpOyAvLyBjb250aW51ZSBzdWJtaXR0aW5nIHRoZSBmb3JtIGlmIHRoZSBhamF4IHdhcyBzdWNjZXNzZnVsXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAuZmFpbChmdW5jdGlvbigpIHtcbiAgICAgICAgdGhhdC5idXR0b25TdGF0dXModGhhdC5vcHRpb25zLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIGZhbHNlKTtcbiAgICAgIH0pO1xuICAgIH0sIC8vIHN1Ym1pdEZvcm1Pbmx5XG5cbiAgICBoYW5kbGVTZXJ2ZXJSZXNwb25zZTogZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgIHZhciBzdXBwb3J0Zm9ybSA9ICQodGhpcy5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKTtcbiAgICAgIGlmIChyZXNwb25zZS5lcnJvcnMpIHtcbiAgICAgICAgLy8gU2hvdyBlcnJvciBmcm9tIHNlcnZlciBvbiBwYXltZW50IGZvcm1cbiAgICAgICAgdGhpcy5oYW5kbGVTZXJ2ZXJFcnJvcihyZXNwb25zZSk7XG4gICAgICB9IGVsc2UgaWYgKHJlc3BvbnNlLnJlcXVpcmVzX2FjdGlvbikge1xuICAgICAgICAvLyBVc2UgU3RyaXBlLmpzIHRvIGhhbmRsZSByZXF1aXJlZCBjYXJkIGFjdGlvblxuICAgICAgICAvL2hhbmRsZUFjdGlvbihyZXNwb25zZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdXBwb3J0Zm9ybS5nZXQoMCkuc3VibWl0KCk7IC8vIGNvbnRpbnVlIHN1Ym1pdHRpbmcgdGhlIGZvcm0gaWYgdGhlIGFqYXggd2FzIHN1Y2Nlc3NmdWxcbiAgICAgIH1cbiAgICB9LCAvLyBoYW5kbGVTZXJ2ZXJSZXNwb25zZVxuXG4gICAgaGFuZGxlU2VydmVyRXJyb3I6IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB2YXIgdGhpc19maWVsZCA9ICcnO1xuICAgICAgLy8gZG8gbm90IHN1Ym1pdC4gdGhlcmUgaXMgYW4gZXJyb3IuXG4gICAgICB0aGF0LmJ1dHRvblN0YXR1cyh0aGF0Lm9wdGlvbnMsICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKSwgZmFsc2UpO1xuICAgICAgLy8gaGFuZGxlIGVycm9yIGRpc3BsYXlcbiAgICAgIGlmICh0eXBlb2YgcmVzcG9uc2UuZXJyb3JzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBpZiAodHlwZW9mIHJlc3BvbnNlLmVycm9yc1swXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICB0aGlzX2ZpZWxkID0gcmVzcG9uc2UuZXJyb3JzWzBdLmZpZWxkICsgJ19maWVsZF9zZWxlY3Rvcic7XG4gICAgICAgIH1cbiAgICAgICAgJC5lYWNoKHJlc3BvbnNlLmVycm9ycywgZnVuY3Rpb24oIGluZGV4LCBlcnJvciApIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGVycm9yLmZpZWxkICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdGhpc19maWVsZCA9IGVycm9yLmZpZWxkICsgJ19maWVsZF9zZWxlY3Rvcic7XG4gICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZXJyb3IucGFyYW0gIT09ICd1bmRlZmluZWQnICYmIGVycm9yLnBhcmFtICE9PSAnJykge1xuICAgICAgICAgICAgdGhpc19maWVsZCA9ICdjY18nICsgZXJyb3IucGFyYW0gKyAnX3NlbGVjdG9yJzsgIFxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGF0LmRpc3BsYXlFcnJvck1lc3NhZ2UoZXJyb3IsIHRoaXNfZmllbGQpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHJlc3BvbnNlLmVycm9yICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB2YXIgZXJyb3IgPSByZXNwb25zZS5lcnJvcjtcbiAgICAgICAgaWYgKHR5cGVvZiBlcnJvci5maWVsZCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICB0aGlzX2ZpZWxkID0gZXJyb3IuZmllbGQgKyAnX2ZpZWxkX3NlbGVjdG9yJztcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZXJyb3IucGFyYW0gIT09ICd1bmRlZmluZWQnICYmIGVycm9yLnBhcmFtICE9PSAnJykge1xuICAgICAgICAgIHRoaXNfZmllbGQgPSAnY2NfJyArIGVycm9yLnBhcmFtICsgJ19zZWxlY3Rvcic7ICBcbiAgICAgICAgfVxuICAgICAgICB0aGF0LmRpc3BsYXlFcnJvck1lc3NhZ2UoZXJyb3IsIHRoaXNfZmllbGQpO1xuICAgICAgfVxuICAgICAgaWYgKCQodGhhdC5vcHRpb25zW3RoaXNfZmllbGRdKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICBzY3JvbGxUb3A6ICQodGhhdC5vcHRpb25zW3RoaXNfZmllbGRdKS5wYXJlbnQoKS5vZmZzZXQoKS50b3BcbiAgICAgICAgfSwgMjAwMCk7XG4gICAgICB9XG4gICAgfSwgLy8gaGFuZGxlU2VydmVyRXJyb3JcblxuICAgIGRpc3BsYXlFcnJvck1lc3NhZ2UoZXJyb3IsIGZpZWxkKSB7XG4gICAgICB2YXIgbWVzc2FnZSA9ICcnO1xuICAgICAgdmFyIHN0cmlwZUVycm9yU2VsZWN0b3IgPSAnJztcbiAgICAgIHZhciBmaWVsZFBhcmVudCA9ICQodGhpcy5vcHRpb25zW2ZpZWxkXSkucGFyZW50KCk7XG4gICAgICBpZiAodHlwZW9mIGVycm9yLm1lc3NhZ2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIG1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWVzc2FnZSA9IGVycm9yLm1lc3NhZ2VbMF07XG4gICAgICB9XG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnNbZmllbGRdKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICQodGhpcy5vcHRpb25zW2ZpZWxkXSkuYWRkQ2xhc3MoJ2EtZXJyb3InKTtcbiAgICAgICAgJCh0aGlzLm9wdGlvbnNbZmllbGRdKS5wcmV2KCkuYWRkQ2xhc3MoJ2EtZXJyb3InKTtcbiAgICAgICAgaWYgKCQoJy5hLWNhcmQtaW5zdHJ1Y3Rpb24nLCBmaWVsZFBhcmVudCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICQoJy5hLWNhcmQtaW5zdHJ1Y3Rpb24nLCBmaWVsZFBhcmVudCkuYWRkQ2xhc3MoJ2EtdmFsaWRhdGlvbi1lcnJvcicpO1xuICAgICAgICAgICQoJy5hLWNhcmQtaW5zdHJ1Y3Rpb24nLCBmaWVsZFBhcmVudCkudGV4dChtZXNzYWdlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkKHRoaXMub3B0aW9uc1tmaWVsZF0pLmFmdGVyKCc8cCBjbGFzcz1cImEtY2FyZC1pbnN0cnVjdGlvbiBhLXZhbGlkYXRpb24tZXJyb3JcIj4nICsgbWVzc2FnZSArICc8L3A+Jyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGVycm9yICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aGlzLmJ1dHRvblN0YXR1cyh0aGlzLm9wdGlvbnMsICQodGhpcy5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKSwgZmFsc2UpO1xuICAgICAgICBpZiAoZXJyb3IuY29kZSA9PT0gJ2luY29tcGxldGVfbnVtYmVyJyB8fCBlcnJvci5jb2RlID09ICdpbnZhbGlkX251bWJlcicgfHwgZXJyb3IuY29kZSA9PSAnaW5jb3JyZWN0X251bWJlcicgfHwgZXJyb3IuY29kZSA9PSAnY2FyZF9kZWNsaW5lZCcgfHwgZXJyb3IuY29kZSA9PSAncHJvY2Vzc2luZ19lcnJvcicpIHtcbiAgICAgICAgICAvLyBlcnJvciBoYW5kbGluZ1xuICAgICAgICAgIHN0cmlwZUVycm9yU2VsZWN0b3IgPSAkKHRoaXMub3B0aW9ucy5jY19udW1fc2VsZWN0b3IpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJvci5jb2RlID09ICdpbnZhbGlkX2V4cGlyeV9tb250aCcgfHwgZXJyb3IuY29kZSA9PSAnaW52YWxpZF9leHBpcnlfeWVhcicgfHwgZXJyb3IuY29kZSA9PSAnZXhwaXJlZF9jYXJkJykge1xuICAgICAgICAgIC8vIGVycm9yIGhhbmRsaW5nXG4gICAgICAgICAgc3RyaXBlRXJyb3JTZWxlY3RvciA9ICQodGhpcy5vcHRpb25zLmNjX2V4cF9zZWxlY3Rvcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9yLmNvZGUgPT0gJ2ludmFsaWRfY3ZjJyB8fCBlcnJvci5jb2RlID09ICdpbmNvcnJlY3RfY3ZjJykge1xuICAgICAgICAgIC8vIGVycm9yIGhhbmRsaW5nXG4gICAgICAgICAgc3RyaXBlRXJyb3JTZWxlY3RvciA9ICQodGhpcy5vcHRpb25zLmNjX2N2Y19zZWxlY3Rvcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9yLmNvZGUgPT0gJ2VtYWlsX2ludmFsaWQnKSB7XG4gICAgICAgICAgLy8gZXJyb3IgaGFuZGxpbmdcbiAgICAgICAgICBzdHJpcGVFcnJvclNlbGVjdG9yID0gJCh0aGlzLm9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdHJpcGVFcnJvclNlbGVjdG9yICE9PSAnJykge1xuICAgICAgICAgIHRoaXMuc3RyaXBlRXJyb3JEaXNwbGF5KGVycm9yLCBzdHJpcGVFcnJvclNlbGVjdG9yLCB0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJvci50eXBlID09ICdtaXNzaW5nX3BheW1lbnQnICYmIHN0cmlwZUVycm9yU2VsZWN0b3IgPT09ICcnKSB7XG4gICAgICAgICAgJCh0aGlzLm9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IgKyAnLmFjdGl2ZScpLmFwcGVuZCgnPHAgY2xhc3M9XCJhLWZvcm0tY2FwdGlvbiBhLXZhbGlkYXRpb24tZXJyb3IgYS1taXNzaW5nLXBheW1lbnQtZXJyb3JcIj4nICsgZXJyb3IubWVzc2FnZSArICc8L3A+JylcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXJyb3IuZmllbGQgPT0gJ3JlY2FwdGNoYScpIHtcbiAgICAgICAgICAkKHRoaXMub3B0aW9ucy5wYXlfYnV0dG9uX3NlbGVjdG9yKS5iZWZvcmUoJzxwIGNsYXNzPVwiYS1mb3JtLWNhcHRpb24gYS12YWxpZGF0aW9uLWVycm9yIGEtcmVjYXB0Y2hhLWVycm9yXCI+JyArIG1lc3NhZ2UgKyAnPC9wPicpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9yLnR5cGUgPT0gJ2ludmFsaWRfcmVxdWVzdF9lcnJvcicgJiYgc3RyaXBlRXJyb3JTZWxlY3RvciA9PT0gJycpIHtcbiAgICAgICAgICAkKHRoaXMub3B0aW9ucy5wYXlfYnV0dG9uX3NlbGVjdG9yKS5iZWZvcmUoJzxwIGNsYXNzPVwiYS1mb3JtLWNhcHRpb24gYS12YWxpZGF0aW9uLWVycm9yIGEtaW52YWxpZC1yZXF1ZXN0LWVycm9yXCI+JyArIGVycm9yLm1lc3NhZ2UgKyAnPC9wPicpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCAvLyBkaXNwbGF5RXJyb3JNZXNzYWdlXG5cbiAgICBzaG93TmV3c2xldHRlclNldHRpbmdzOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG5cbiAgICAgIHZhciBuZXdzbGV0dGVyX2dyb3VwX2h0bWwgPSAnJztcbiAgICAgIGlmICgkKG9wdGlvbnMubmV3c2xldHRlcl9ncm91cF9zZWxlY3RvcikubGVuZ3RoID4gMCApIHtcbiAgICAgICAgdmFyIGdldF9kYXRhID0ge1xuICAgICAgICAgIHNob3J0Y29kZTogJ25ld3NsZXR0ZXJfZm9ybScsXG4gICAgICAgICAgcGxhY2VtZW50OiAndXNlcmFjY291bnQnXG4gICAgICAgIH07XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICB1cmw6IG9wdGlvbnMubWlubnBvc3Rfcm9vdCArICcvd3AtanNvbi9taW5ucG9zdC1hcGkvdjIvbWFpbGNoaW1wL2Zvcm0nLFxuICAgICAgICAgIGRhdGE6IGdldF9kYXRhXG4gICAgICAgIH0pLmRvbmUoZnVuY3Rpb24oIHJlc3VsdCApIHtcbiAgICAgICAgICBpZiAoIHR5cGVvZiByZXN1bHQuZ3JvdXBfZmllbGRzICE9PSAndW5kZWZpbmVkJyApIHtcbiAgICAgICAgICAgICQuZWFjaChyZXN1bHQuZ3JvdXBfZmllbGRzLCBmdW5jdGlvbiggaW5kZXgsIGNhdGVnb3J5ICkge1xuICAgICAgICAgICAgICBuZXdzbGV0dGVyX2dyb3VwX2h0bWwgKz0gJzxmaWVsZHNldCBjbGFzcz1cIm0tZm9ybS1pdGVtIHN1cHBvcnQtbmV3c2xldHRlciBtLWZvcm0taXRlbS0nICsgY2F0ZWdvcnkudHlwZSArICdcIj4nO1xuICAgICAgICAgICAgICBuZXdzbGV0dGVyX2dyb3VwX2h0bWwgKz0gJzxsYWJlbD4nICsgY2F0ZWdvcnkubmFtZSArICc6PC9sYWJlbD4nO1xuICAgICAgICAgICAgICBpZiAoIGNhdGVnb3J5LmNvbnRhaW5zLmxlbmd0aCA+IDAgKSB7XG4gICAgICAgICAgICAgICAgbmV3c2xldHRlcl9ncm91cF9odG1sICs9ICc8ZGl2IGNsYXNzPVwibS1mb3JtLWl0ZW0gbS1mb3JtLWl0ZW0tbmV3c2xldHRlclwiPic7XG4gICAgICAgICAgICAgICAgJC5lYWNoKGNhdGVnb3J5W2NhdGVnb3J5LmNvbnRhaW5zXSwgZnVuY3Rpb24oIGluZGV4LCBpdGVtICkge1xuICAgICAgICAgICAgICAgICAgbmV3c2xldHRlcl9ncm91cF9odG1sICs9ICc8bGFiZWw+PGlucHV0IG5hbWU9XCJncm91cHNfc3VibWl0dGVkXCIgdHlwZT1cImNoZWNrYm94XCIgdmFsdWU9XCInICsgaXRlbS5pZCArICdcIj4nICsgaXRlbS5uYW1lICsgJzwvbGFiZWw+JztcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBuZXdzbGV0dGVyX2dyb3VwX2h0bWwgKz0gJzwvZGl2Pic7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgbmV3c2xldHRlcl9ncm91cF9odG1sICs9ICc8L2ZpZWxkc2V0Pic7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICQob3B0aW9ucy5uZXdzbGV0dGVyX2dyb3VwX3NlbGVjdG9yKS5odG1sKG5ld3NsZXR0ZXJfZ3JvdXBfaHRtbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKCQob3B0aW9ucy5uZXdzbGV0dGVyX2dyb3VwX3NlbGVjdG9yKS5sZW5ndGggPiAwICYmIHR5cGVvZiAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB2YXIgZ2V0X2RhdGEgPSB7XG4gICAgICAgICAgZW1haWw6ICQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKClcbiAgICAgICAgfTtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgIHVybDogb3B0aW9ucy5taW5ucG9zdF9yb290ICsgJy93cC1qc29uL21pbm5wb3N0LWFwaS92Mi9tYWlsY2hpbXAvdXNlcicsXG4gICAgICAgICAgZGF0YTogZ2V0X2RhdGFcbiAgICAgICAgfSkuZG9uZShmdW5jdGlvbiggcmVzdWx0ICkge1xuICAgICAgICAgIGlmICggdHlwZW9mIHJlc3VsdC5tYWlsY2hpbXBfc3RhdHVzICE9PSAndW5kZWZpbmVkJyApIHtcbiAgICAgICAgICAgICQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkuYWZ0ZXIoJzxpbnB1dCBuYW1lPVwibWFpbGNoaW1wX3N0YXR1c1wiIHR5cGU9XCJoaWRkZW5cIiB2YWx1ZT1cIicgKyByZXN1bHQubWFpbGNoaW1wX3N0YXR1cyArICdcIj4nKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCB0eXBlb2YgcmVzdWx0Lm1haWxjaGltcF91c2VyX2lkICE9PSAndW5kZWZpbmVkJyApIHtcbiAgICAgICAgICAgICQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkuYWZ0ZXIoJzxpbnB1dCBuYW1lPVwibWFpbGNoaW1wX3VzZXJfaWRcIiB0eXBlPVwiaGlkZGVuXCIgdmFsdWU9XCInICsgcmVzdWx0Lm1haWxjaGltcF91c2VyX2lkICsgJ1wiPicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAocmVzdWx0Lm1haWxjaGltcF9zdGF0dXMgPT09ICdzdWJzY3JpYmVkJykge1xuICAgICAgICAgICAgLy8gdXNlciBjcmVhdGVkIC0gc2hvdyBhIHN1Y2Nlc3MgbWVzc2FnZVxuICAgICAgICAgICAgJCgnLmEtY29uZmlybS1pbnN0cnVjdGlvbnMnKS50ZXh0KCQoJy5hLWNvbmZpcm0taW5zdHJ1Y3Rpb25zJykuYXR0cignZGF0YS1rbm93bi11c2VyJykpO1xuICAgICAgICAgICAgdmFyIGdyb3VwcyA9IHJlc3VsdC5ncm91cHM7XG4gICAgICAgICAgICAkLmVhY2goZ3JvdXBzLCBmdW5jdGlvbiggaW5kZXgsIHZhbHVlICkge1xuICAgICAgICAgICAgICBpZiAoIHZhbHVlID09PSB0cnVlICkge1xuICAgICAgICAgICAgICAgICQoJzpjaGVja2JveFt2YWx1ZT1cIicgKyBpbmRleCArICdcIl0nKS5wcm9wKCdjaGVja2VkJyx0cnVlKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKCc6Y2hlY2tib3hbdmFsdWU9XCInICsgaW5kZXggKyAnXCJdJykucHJvcCgnY2hlY2tlZCcsZmFsc2UpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgfSwgLy8gc2hvd05ld3NsZXR0ZXJTZXR0aW5nc1xuXG4gICAgY29uZmlybU1lc3NhZ2VTdWJtaXQ6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcblxuICAgICAgdmFyIGV4aXN0aW5nX25ld3NsZXR0ZXJfc2V0dGluZ3MgPSAkKG9wdGlvbnMubmV3c2xldHRlcl9ncm91cF9zZWxlY3RvciArICcgaW5wdXQnKS5zZXJpYWxpemUoKTtcbiAgICAgIC8vdGhpcy5kZWJ1ZyhleGlzdGluZ19uZXdzbGV0dGVyX3NldHRpbmdzKTtcblxuICAgICAgJChvcHRpb25zLmNvbmZpcm1fZm9ybV9zZWxlY3Rvcikuc3VibWl0KGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgdmFyIGNvbmZpcm1mb3JtID0gJChvcHRpb25zLmNvbmZpcm1fZm9ybV9zZWxlY3Rvcik7XG4gICAgICAgIC8vIHN1Ym1pdCBzZXR0aW5ncyB0byBtYWlsY2hpbXBcbiAgICAgICAgLy8gbmVlZCB0byBnZXQgdXNlciBpbmZvIG9uIGEgaGlkZGVuIGZpZWxkIGhlcmVcblxuICAgICAgICB2YXIgbmV3c2xldHRlcl9ncm91cHMgPSAkKG9wdGlvbnMubmV3c2xldHRlcl9ncm91cF9zZWxlY3RvciArICcgaW5wdXQ6Y2hlY2tlZCcpO1xuICAgICAgICB2YXIgbmV3X25ld3NsZXR0ZXJfc2V0dGluZ3MgPSBuZXdzbGV0dGVyX2dyb3Vwcy5zZXJpYWxpemUoKTtcblxuICAgICAgICBpZiAoKGV4aXN0aW5nX25ld3NsZXR0ZXJfc2V0dGluZ3MgIT09IG5ld19uZXdzbGV0dGVyX3NldHRpbmdzKSAmJiAodHlwZW9mIG5ld3NsZXR0ZXJfZ3JvdXBzICE9PSAndW5kZWZpbmVkJykpIHtcbiAgICAgICAgICAvL2FkZCBvdXIgb3duIGFqYXggY2hlY2sgYXMgWC1SZXF1ZXN0ZWQtV2l0aCBpcyBub3QgYWx3YXlzIHJlbGlhYmxlXG4gICAgICAgICAgLy9hamF4X2Zvcm1fZGF0YSA9IG5ld19uZXdzbGV0dGVyX3NldHRpbmdzICsgJyZhamF4cmVxdWVzdD10cnVlJnN1YnNjcmliZSc7XG5cbiAgICAgICAgICB2YXIgcG9zdF9kYXRhID0ge1xuICAgICAgICAgICAgZW1haWw6ICQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgICBmaXJzdF9uYW1lOiAkKG9wdGlvbnMuZmlyc3RfbmFtZV9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgICBsYXN0X25hbWU6ICQob3B0aW9ucy5sYXN0X25hbWVfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgICAgZ3JvdXBzX3N1Ym1pdHRlZDoge31cbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgcG9zdF9kYXRhLmdyb3Vwc19hdmFpbGFibGUgPSAnYWxsJztcblxuICAgICAgICAgIGlmICggJCgnaW5wdXRbbmFtZT1cIm1haWxjaGltcF9zdGF0dXNcIl0nKS5sZW5ndGggPiAwICkge1xuICAgICAgICAgICAgcG9zdF9kYXRhLm1haWxjaGltcF9zdGF0dXMgPSAkKCdpbnB1dFtuYW1lPVwibWFpbGNoaW1wX3N0YXR1c1wiXScpLnZhbCgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICggJCgnaW5wdXRbbmFtZT1cIm1haWxjaGltcF91c2VyX2lkXCJdJykubGVuZ3RoID4gMCApIHtcbiAgICAgICAgICAgIHBvc3RfZGF0YS5tYWlsY2hpbXBfdXNlcl9pZCA9ICQoJ2lucHV0W25hbWU9XCJtYWlsY2hpbXBfdXNlcl9pZFwiXScpLnZhbCgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0eXBlb2YgbmV3c2xldHRlcl9ncm91cHMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAkLmVhY2gobmV3c2xldHRlcl9ncm91cHMsIGZ1bmN0aW9uKGluZGV4LCB2YWx1ZSkge1xuICAgICAgICAgICAgICB2YXIgZ3JvdXAgPSAkKHRoaXMpLnZhbCgpO1xuICAgICAgICAgICAgICBwb3N0X2RhdGEuZ3JvdXBzX3N1Ym1pdHRlZFtpbmRleF0gPSBncm91cDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IG9wdGlvbnMubWlubnBvc3Rfcm9vdCArICcvd3AtanNvbi9taW5ucG9zdC1hcGkvdjIvbWFpbGNoaW1wL3VzZXInLFxuICAgICAgICAgICAgdHlwZTogJ3Bvc3QnLFxuICAgICAgICAgICAgZGF0YVR5cGUgOiAnanNvbicsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkocG9zdF9kYXRhKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmRvbmUoZnVuY3Rpb24ocmVzcG9uc2UpIHsgLy8gcmVzcG9uc2UgZnJvbSB0aGUgUEhQIGFjdGlvblxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSAnJztcbiAgICAgICAgICAgIGlmICggcmVzcG9uc2Uuc3VjY2VzcyA9PT0gdHJ1ZSApIHtcbiAgICAgICAgICAgICAgLypzd2l0Y2ggKHJlc3BvbnNlLmRhdGEudXNlcl9zdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdleGlzdGluZyc6XG4gICAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ1RoYW5rcyBmb3IgdXBkYXRpbmcgeW91ciBlbWFpbCBwcmVmZXJlbmNlcy4gVGhleSB3aWxsIGdvIGludG8gZWZmZWN0IGltbWVkaWF0ZWx5Lic7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICduZXcnOlxuICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9ICdXZSBoYXZlIGFkZGVkIHlvdSB0byB0aGUgTWlublBvc3QgbWFpbGluZyBsaXN0Lic7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdwZW5kaW5nJzpcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnV2UgaGF2ZSBhZGRlZCB5b3UgdG8gdGhlIE1pbm5Qb3N0IG1haWxpbmcgbGlzdC4gWW91IHdpbGwgbmVlZCB0byBjbGljayB0aGUgY29uZmlybWF0aW9uIGxpbmsgaW4gdGhlIGVtYWlsIHdlIHNlbnQgdG8gYmVnaW4gcmVjZWl2aW5nIG1lc3NhZ2VzLic7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfSovXG4gICAgICAgICAgICAgIC8vY29uZmlybWZvcm0uZ2V0KDApLnN1Ym1pdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uZmlybWZvcm0uZ2V0KDApLnN1Ym1pdCgpO1xuICAgICAgICAgICAgLy8kKCcubS1ob2xkLW1lc3NhZ2UnKS5odG1sKCc8ZGl2IGNsYXNzPVwibS1mb3JtLW1lc3NhZ2UgbS1mb3JtLW1lc3NhZ2UtaW5mb1wiPicgKyBtZXNzYWdlICsgJzwvZGl2PicpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmZhaWwoZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIC8vIHdlIHNob3VsZCBwdXQgYW4gYWN0dWFsIGVycm9yIG1lc3NhZ2UgaGVyZSBzb21lZGF5LCBwcm9iYWJseVxuICAgICAgICAgICAgLy8kKCcubS1ob2xkLW1lc3NhZ2UnKS5odG1sKCc8ZGl2IGNsYXNzPVwibS1mb3JtLW1lc3NhZ2UgbS1mb3JtLW1lc3NhZ2UtaW5mb1wiPkFuIGVycm9yIGhhcyBvY2N1cmVkLiBQbGVhc2UgdHJ5IGFnYWluLjwvZGl2PicpO1xuICAgICAgICAgICAgY29uZmlybWZvcm0uZ2V0KDApLnN1Ym1pdCgpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0gZWxzZSB7IC8vIGVuZCBwYXJ0IHdoZXJlIHNldHRpbmdzIGNoYW5nZWRcbiAgICAgICAgICBjb25maXJtZm9ybS5nZXQoMCkuc3VibWl0KCk7XG4gICAgICAgIH1cblxuICAgICAgfSk7XG4gICAgICAvL3JldHVybiBmYWxzZTtcbiAgICB9LCAvLyBjb25maXJtTWVzc2FnZVN1Ym1pdFxuXG4gIH07IC8vIHBsdWdpbi5wcm90b3R5cGVcblxuICAvLyBBIHJlYWxseSBsaWdodHdlaWdodCBwbHVnaW4gd3JhcHBlciBhcm91bmQgdGhlIGNvbnN0cnVjdG9yLFxuICAvLyBwcmV2ZW50aW5nIGFnYWluc3QgbXVsdGlwbGUgaW5zdGFudGlhdGlvbnNcbiAgJC5mbltwbHVnaW5OYW1lXSA9IGZ1bmN0aW9uICggb3B0aW9ucyApIHtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICghJC5kYXRhKHRoaXMsICdwbHVnaW5fJyArIHBsdWdpbk5hbWUpKSB7XG4gICAgICAgICQuZGF0YSh0aGlzLCAncGx1Z2luXycgKyBwbHVnaW5OYW1lLCBuZXcgUGx1Z2luKCB0aGlzLCBvcHRpb25zICkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG59KSggalF1ZXJ5LCB3aW5kb3csIGRvY3VtZW50ICk7Il19
}(jQuery));
