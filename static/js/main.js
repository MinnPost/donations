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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZhbGlkLWZvcm0ubWluLmpzIiwibWlubnBvc3QuZ2l2aW5nLmpzIl0sIm5hbWVzIjpbInIiLCJlIiwibiIsInQiLCJvIiwiaSIsImYiLCJjIiwicmVxdWlyZSIsInUiLCJhIiwiRXJyb3IiLCJjb2RlIiwicCIsImV4cG9ydHMiLCJjYWxsIiwibGVuZ3RoIiwibW9kdWxlIiwiX3ZhbGlkRm9ybSIsIl92YWxpZEZvcm0yIiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsIm9iaiIsIl9fZXNNb2R1bGUiLCJkZWZhdWx0Iiwid2luZG93IiwiVmFsaWRGb3JtIiwidG9nZ2xlSW52YWxpZENsYXNzIiwiaGFuZGxlQ3VzdG9tTWVzc2FnZXMiLCJoYW5kbGVDdXN0b21NZXNzYWdlRGlzcGxheSIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwidmFsdWUiLCJjbG9uZSIsImRlZmF1bHRzIiwiaW5zZXJ0QWZ0ZXIiLCJpbnNlcnRCZWZvcmUiLCJmb3JFYWNoIiwiZGVib3VuY2UiLCJjb3B5IiwiYXR0ciIsImhhc093blByb3BlcnR5IiwiZGVmYXVsdE9iamVjdCIsImsiLCJ1bmRlZmluZWQiLCJyZWZOb2RlIiwibm9kZVRvSW5zZXJ0Iiwic2libGluZyIsIm5leHRTaWJsaW5nIiwiX3BhcmVudCIsInBhcmVudE5vZGUiLCJwYXJlbnQiLCJhcHBlbmRDaGlsZCIsIml0ZW1zIiwiZm4iLCJtcyIsInRpbWVvdXQiLCJkZWJvdW5jZWRGbiIsImNsZWFyVGltZW91dCIsInNldFRpbWVvdXQiLCJ2YWxpZEZvcm0iLCJfdXRpbCIsImlucHV0IiwiaW52YWxpZENsYXNzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNsYXNzTGlzdCIsImFkZCIsInZhbGlkaXR5IiwidmFsaWQiLCJyZW1vdmUiLCJlcnJvclByb3BzIiwiZ2V0Q3VzdG9tTWVzc2FnZSIsImN1c3RvbU1lc3NhZ2VzIiwibG9jYWxFcnJvclByb3BzIiwidHlwZSIsImNvbmNhdCIsInByb3AiLCJnZXRBdHRyaWJ1dGUiLCJjaGVja1ZhbGlkaXR5IiwibWVzc2FnZSIsInNldEN1c3RvbVZhbGlkaXR5Iiwib3B0aW9ucyIsInZhbGlkYXRpb25FcnJvckNsYXNzIiwidmFsaWRhdGlvbkVycm9yUGFyZW50Q2xhc3MiLCJlcnJvclBsYWNlbWVudCIsImluc2VydEVycm9yIiwiZXJyb3JOb2RlIiwicXVlcnlTZWxlY3RvciIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInZhbGlkYXRpb25NZXNzYWdlIiwiY2xhc3NOYW1lIiwidGV4dENvbnRlbnQiLCJwcmV2ZW50RGVmYXVsdCIsImRlZmF1bHRPcHRpb25zIiwiZWxlbWVudCIsIm5vZGVOYW1lIiwiaW5wdXRzIiwidG9Mb3dlckNhc2UiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9jdXNJbnZhbGlkSW5wdXQiLCJ2YWxpZEZvcm1JbnB1dHMiLCJmb3JtIiwiZm9jdXNGaXJzdCIsImludmFsaWROb2RlIiwiZm9jdXMiLCIkIiwicGx1Z2luTmFtZSIsIlBsdWdpbiIsImV4dGVuZCIsIl9kZWZhdWx0cyIsIl9uYW1lIiwiaW5pdCIsInByb3RvdHlwZSIsInJlc2V0IiwiYW1vdW50IiwiZG9jdW1lbnRFbGVtZW50IiwicGFyc2VGbG9hdCIsImxldmVsX2Ftb3VudF9zZWxlY3RvciIsInRleHQiLCJvcmlnaW5hbF9hbW91bnQiLCJwYXJzZUludCIsIm9yaWdpbmFsX2Ftb3VudF9zZWxlY3RvciIsInZhbCIsInByb2Nlc3NpbmdfZmVlIiwiTWF0aCIsInJvdW5kIiwiZmVlX2Ftb3VudCIsInBvdyIsInRvRml4ZWQiLCJwcm9jZXNzaW5nX2ZlZV90ZXh0IiwiY3JlYXRlX2FjY291bnQiLCJidXR0b25fdGV4dCIsInBheV9idXR0b25fc2VsZWN0b3IiLCJzdHJpcGUiLCJTdHJpcGUiLCJzdHJpcGVfcHVibGlzaGFibGVfa2V5IiwiZWxlbWVudHMiLCJmb250cyIsImNzc1NyYyIsImRlYnVnIiwiYW5hbHl0aWNzVHJhY2tpbmciLCJhbW91bnRBc1JhZGlvIiwiYW1vdW50VXBkYXRlZCIsInBheV9jY19wcm9jZXNzaW5nX3NlbGVjdG9yIiwiY3JlZGl0Q2FyZFByb2Nlc3NpbmdGZWVzIiwiZG9uYXRlX2Zvcm1fc2VsZWN0b3IiLCJkb25hdGVBbm9ueW1vdXNseSIsImhvbm9yT3JNZW1vcnlUb2dnbGUiLCJvdXRzaWRlVW5pdGVkU3RhdGVzIiwic2hpcHBpbmdBZGRyZXNzIiwiYWxsb3dNaW5ucG9zdEFjY291bnQiLCJwYXltZW50UmVxdWVzdEJ1dHRvbiIsImNob29zZVBheW1lbnRNZXRob2QiLCJjcmVkaXRDYXJkRmllbGRzIiwidmFsaWRhdGVTZXR1cCIsImZvcm1TZXR1cCIsImNvbmZpcm1fZm9ybV9zZWxlY3RvciIsInNob3dOZXdzbGV0dGVyU2V0dGluZ3MiLCJjb25maXJtTWVzc2FnZVN1Ym1pdCIsImNvbnNvbGUiLCJsb2ciLCJkaXIiLCJhbmFseXRpY3NfdHlwZSIsInByb2dyZXNzIiwicHJvZ3Jlc3Nfc2VsZWN0b3IiLCJzdGVwIiwiYWN0aW9uIiwibmF2X2l0ZW1fY291bnQiLCJvcHBfaWQiLCJvcHBfaWRfc2VsZWN0b3IiLCJwb3N0X3B1cmNoYXNlIiwiZ2EiLCJpbmRleCIsImZpbmlzaF9zZWN0aW9uX3NlbGVjdG9yIiwiYW5hbHl0aWNzVHJhY2tpbmdTdGVwIiwiaW5zdGFsbG1lbnRfcGVyaW9kIiwibGV2ZWwiLCJ0aGF0IiwiaW5zdGFsbG1lbnRfcGVyaW9kX3NlbGVjdG9yIiwiZGF0YSIsImFqYXgiLCJtZXRob2QiLCJ1cmwiLCJkb25lIiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzbGljZSIsInByb2R1Y3QiLCJnZXRUb3RhbEFtb3VudCIsImd0YWciLCJwYWdlX3RpdGxlIiwidGl0bGUiLCJwYWdlX3BhdGgiLCJsb2NhdGlvbiIsInBhdGhuYW1lIiwicGFnZSIsImRhdGFMYXllciIsInB1c2giLCJlY29tbWVyY2UiLCJldmVudCIsInNldFJhZGlvQW1vdW50IiwiY2hhbmdlIiwiZmllbGQiLCJzdHJpcGVfcGF5bWVudF90eXBlIiwiZ2V0U3RyaXBlUGF5bWVudFR5cGUiLCJpcyIsImNhbGN1bGF0ZUZlZXMiLCJzZXRGYWlyTWFya2V0VmFsdWUiLCJhbW91bnRfc2VsZWN0b3JfZmFpcl9tYXJrZXQiLCJhZGRpdGlvbmFsX2Ftb3VudF9maWVsZCIsImdpZnRfZGVsaXZlcnlfbWV0aG9kX3NlbGVjdG9yIiwidG90YWxfYW1vdW50IiwiYWRkaXRpb25hbF9hbW91bnQiLCJzaGlwcGluZ19hbW91bnRfZmllbGQiLCJzaGlwcGluZ19hbW91bnQiLCJhbW91bnRfc2VsZWN0b3IiLCJmYWlyX21hcmtldF92YWx1ZV9zZWxlY3RvciIsImZhaXJNYXJrZXRWYWx1ZSIsInNldFN0cmlwZVBheW1lbnRUeXBlIiwiZmVlcyIsImNyZWRpdENhcmRGZWVDaGVja2JveCIsIm9uIiwiYXBwZW5kIiwiZnVsbF9hbW91bnQiLCJhZGRDbGFzcyIsImZ1bGxfYW1vdW50X3NlbGVjdG9yIiwicGF5bWVudFJlcXVlc3QiLCJ1cGRhdGUiLCJ0b3RhbCIsImxhYmVsIiwidG9nZ2xlQW5vbnltb3VzIiwiYW5vbnltb3VzX3NlbGVjdG9yIiwibmFtZV9zZWxlY3RvciIsImhpZGUiLCJzaG93IiwiaG9ub3JPck1lbW9yeSIsImhvbm9yX29yX21lbW9yeV9jaG9vc2VyIiwiaG9ub3JfbWVtb3J5X2lucHV0X2dyb3VwIiwiaG9ub3JfdHlwZV9zZWxlY3RvciIsImhvbm9yX25hbWVfc2VsZWN0b3IiLCJzaG93X2JpbGxpbmdfY291bnRyeV9zZWxlY3RvciIsImNsaWNrIiwiY2hhbmdlRmllbGRzT3V0c2lkZVVTIiwic2hvd19zaGlwcGluZ19jb3VudHJ5X3NlbGVjdG9yIiwic2hpcHBpbmdfY291bnRyeV9zZWxlY3RvciIsImJpbGxpbmdfb3Jfc2hpcHBpbmciLCJ6aXBfcGFyZW50IiwiYmlsbGluZ196aXBfZmllbGRfc2VsZWN0b3IiLCJzdGF0ZV9wYXJlbnQiLCJiaWxsaW5nX3N0YXRlX2ZpZWxkX3NlbGVjdG9yIiwiYmlsbGluZ19jb3VudHJ5X3NlbGVjdG9yIiwic2hpcHBpbmdfemlwX2ZpZWxkX3NlbGVjdG9yIiwic2hpcHBpbmdfc3RhdGVfZmllbGRfc2VsZWN0b3IiLCJjaGFuZ2VGaWVsZHNJbnNpZGVVUyIsImh0bWwiLCJzaG93X3NoaXBwaW5nIiwidXNlX2Zvcl9zaGlwcGluZ19zZWxlY3RvciIsInNoaXBwaW5nX3NlbGVjdG9yIiwiYWNjb3VudF9leGlzdHMiLCJzaG93UGFzc3dvcmQiLCJzaG93UGFzc3dvcmRTdHJlbmd0aCIsInNwYW1FbWFpbCIsImVtYWlsX2ZpZWxkX3NlbGVjdG9yIiwidG9nZ2xlQWNjb3VudEZpZWxkcyIsImNyZWF0ZV9tcF9zZWxlY3RvciIsImRvbmVUeXBpbmciLCJlbWFpbCIsImNoZWNrTWlubnBvc3RBY2NvdW50IiwidHlwaW5nVGltZXIiLCJkb25lVHlwaW5nSW50ZXJ2YWwiLCJrZXl1cCIsImVtYWlsX2ZpZWxkIiwic3BhbUVycm9yQ29udGFpbmVyIiwicmVtb3ZlQ2xhc3MiLCJjcmVhdGVfYWNjb3VudF9zZWxlY3RvciIsImJlZm9yZSIsInBhc3N3b3JkX3NlbGVjdG9yIiwiJHN1Ym1pdCIsIiRjb250YWluZXIiLCIkZmllbGQiLCJzaG93X3Bhc3MiLCIkdG9nZ2xlIiwiY2hlY2tib3giLCIkYmVmb3JlIiwiYWZ0ZXIiLCJjaGVja1Bhc3N3b3JkU3RyZW5ndGgiLCIkcGFzc3dvcmQiLCIkc3RyZW5ndGhNZXRlciIsIiRzdHJlbmd0aFRleHQiLCJwYXNzd29yZCIsInJlc3VsdCIsInp4Y3ZibiIsInN0cmVuZ3RoIiwic2NvcmUiLCJ1c2VyIiwibWlubnBvc3Rfcm9vdCIsInN0YXR1cyIsInJlYXNvbiIsImNvdW50cnkiLCJjdXJyZW5jeSIsInByQnV0dG9uIiwiY3JlYXRlIiwic3R5bGUiLCJ0aGVtZSIsImhlaWdodCIsImNhbk1ha2VQYXltZW50IiwidGhlbiIsIm1vdW50IiwiaGlkZVBheW1lbnRSZXF1ZXN0Iiwic3VwcG9ydGZvcm0iLCJnZXQiLCJyZXBvcnRWYWxpZGl0eSIsInRva2VuRmllbGROYW1lIiwidG9rZW5GaWVsZCIsInBheW1lbnRNZXRob2QiLCJpZCIsImZvcm1Qcm9jZXNzb3IiLCJoaWRlRWxlbWVudCIsImNob29zZV9wYXltZW50IiwiY2hlY2tlZF9pZCIsImNoZWNrZWRfdmFsdWUiLCJzZXR1cFBheW1lbnRNZXRob2QiLCJlbGVtZW50X2lkIiwiZWxlbWVudF92YWx1ZSIsImFjaEZpZWxkcyIsInJlbW92ZUFjaEZpZWxkcyIsInBheW1lbnRfbWV0aG9kX3NlbGVjdG9yIiwicGxhaWRfbGluayIsImJ1dHRvbkRpc2FibGVkIiwibGlua0hhbmRsZXIiLCJkZXN0cm95IiwiYmFzZSIsImljb25Db2xvciIsImxpbmVIZWlnaHQiLCJmb250V2VpZ2h0IiwiZm9udEZhbWlseSIsImZvbnRTaXplIiwiaW52YWxpZCIsImNvbG9yIiwiY2FyZE51bWJlckVsZW1lbnQiLCJzaG93SWNvbiIsImNjX251bV9zZWxlY3RvciIsImNhcmRFeHBpcnlFbGVtZW50IiwiY2NfZXhwX3NlbGVjdG9yIiwiY2FyZEN2Y0VsZW1lbnQiLCJjY19jdmNfc2VsZWN0b3IiLCJicmFuZCIsInN0cmlwZUVycm9yRGlzcGxheSIsImVycm9yIiwiYnV0dG9uU3RhdHVzIiwiZmluZCIsInNob3dTcGlubmVyIiwiaGlkZVNwaW5uZXIiLCJiYW5rVG9rZW5GaWVsZE5hbWUiLCJiYW5rVG9rZW5GaWVsZCIsIlBsYWlkIiwiY2xpZW50TmFtZSIsImVudiIsInBsYWlkX2VudiIsInRva2VuIiwiZ2V0RWxlbWVudEJ5SWQiLCJvblN1Y2Nlc3MiLCJwdWJsaWNfdG9rZW4iLCJtZXRhZGF0YSIsIkpTT04iLCJzdHJpbmdpZnkiLCJhY2NvdW50X2lkIiwiY29udGVudFR5cGUiLCJyZXNwb25zZSIsInN0cmlwZV9iYW5rX2FjY291bnRfdG9rZW4iLCJwcmVwZW5kIiwiZmFpbCIsInJlc2V0Rm9ybUVycm9ycyIsIm9wZW4iLCJidXR0b24iLCJkaXNhYmxlZCIsImFjaF93YXNfaW5pdGlhbGl6ZWQiLCJ0bGl0ZSIsInJlbW92ZUF0dHIiLCJncmF2IiwiZm9ybXMiLCJmb3JtX3NlbGVjdG9yIiwic2Nyb2xsVG9Gb3JtRXJyb3IiLCJmaXJzdCIsImZpcnN0X2hvbGRlciIsImVsZW1lbnRPZmZzZXQiLCJvZmZzZXQiLCJ0b3AiLCJwYWdlT2Zmc2V0IiwicGFnZVlPZmZzZXQiLCJpbm5lckhlaWdodCIsInNjcm9sbFRvcCIsInN1Ym1pdCIsImJpbGxpbmdEZXRhaWxzIiwiZ2VuZXJhdGVCaWxsaW5nRGV0YWlscyIsImNyZWF0ZU1pbm5Qb3N0QWNjb3VudCIsInBheW1lbnRfdHlwZSIsImNyZWF0ZVBheW1lbnRNZXRob2QiLCJiYW5rVG9rZW5IYW5kbGVyIiwic3VibWl0Rm9ybU9ubHkiLCJ0aGlzX3NlbGVjdG9yIiwid2hpY2hfZXJyb3IiLCJlbXB0eSIsImFuaW1hdGUiLCJmaXJzdF9uYW1lIiwiZmlyc3RfbmFtZV9maWVsZF9zZWxlY3RvciIsImxhc3RfbmFtZSIsImxhc3RfbmFtZV9maWVsZF9zZWxlY3RvciIsInBhc3N3b3JkX2ZpZWxkX3NlbGVjdG9yIiwiY2l0eSIsImJpbGxpbmdfY2l0eV9maWVsZF9zZWxlY3RvciIsInN0YXRlIiwiemlwIiwiYWRkcmVzc0RldGFpbHMiLCJmdWxsX25hbWUiLCJuYW1lIiwic3RyZWV0IiwiYmlsbGluZ19zdHJlZXRfZmllbGRfc2VsZWN0b3IiLCJsaW5lMSIsInBvc3RhbF9jb2RlIiwiY291bnRyeV9maWVsZF92YWx1ZSIsImJpbGxpbmdfY291bnRyeV9maWVsZF9zZWxlY3RvciIsImFkZHJlc3MiLCJjYXJkRWxlbWVudCIsImNhcmQiLCJiaWxsaW5nX2RldGFpbHMiLCJoYW5kbGVTZXJ2ZXJFcnJvciIsImFqYXhfdXJsIiwiZmV0Y2giLCJoZWFkZXJzIiwiYm9keSIsInNlcmlhbGl6ZSIsImpzb24iLCJoYW5kbGVTZXJ2ZXJSZXNwb25zZSIsImNhY2hlIiwiZXJyb3JzIiwicmVxdWlyZXNfYWN0aW9uIiwidGhpc19maWVsZCIsImVhY2giLCJwYXJhbSIsImRpc3BsYXlFcnJvck1lc3NhZ2UiLCJzdHJpcGVFcnJvclNlbGVjdG9yIiwiZmllbGRQYXJlbnQiLCJwcmV2IiwibmV3c2xldHRlcl9ncm91cF9odG1sIiwibmV3c2xldHRlcl9ncm91cF9zZWxlY3RvciIsImdldF9kYXRhIiwic2hvcnRjb2RlIiwicGxhY2VtZW50IiwiZ3JvdXBfZmllbGRzIiwiY2F0ZWdvcnkiLCJjb250YWlucyIsIml0ZW0iLCJtYWlsY2hpbXBfc3RhdHVzIiwibWFpbGNoaW1wX3VzZXJfaWQiLCJncm91cHMiLCJleGlzdGluZ19uZXdzbGV0dGVyX3NldHRpbmdzIiwiY29uZmlybWZvcm0iLCJuZXdzbGV0dGVyX2dyb3VwcyIsIm5ld19uZXdzbGV0dGVyX3NldHRpbmdzIiwicG9zdF9kYXRhIiwiZ3JvdXBzX3N1Ym1pdHRlZCIsImdyb3Vwc19hdmFpbGFibGUiLCJncm91cCIsImRhdGFUeXBlIiwic3VjY2VzcyIsImpRdWVyeSJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxDQUFDLFlBQVU7RUFBQyxTQUFTQSxDQUFDLENBQUNDLENBQUMsRUFBQ0MsQ0FBQyxFQUFDQyxDQUFDLEVBQUM7SUFBQyxTQUFTQyxDQUFDLENBQUNDLENBQUMsRUFBQ0MsQ0FBQyxFQUFDO01BQUMsSUFBRyxDQUFDSixDQUFDLENBQUNHLENBQUMsQ0FBQyxFQUFDO1FBQUMsSUFBRyxDQUFDSixDQUFDLENBQUNJLENBQUMsQ0FBQyxFQUFDO1VBQUMsSUFBSUUsQ0FBQyxHQUFDLFVBQVUsSUFBRSxPQUFPQyxPQUFPLElBQUVBLE9BQU87VUFBQyxJQUFHLENBQUNGLENBQUMsSUFBRUMsQ0FBQyxFQUFDLE9BQU9BLENBQUMsQ0FBQ0YsQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO1VBQUMsSUFBR0ksQ0FBQyxFQUFDLE9BQU9BLENBQUMsQ0FBQ0osQ0FBQyxFQUFDLENBQUMsQ0FBQyxDQUFDO1VBQUMsSUFBSUssQ0FBQyxHQUFDLElBQUlDLEtBQUssQ0FBQyxzQkFBc0IsR0FBQ04sQ0FBQyxHQUFDLEdBQUcsQ0FBQztVQUFDLE1BQU1LLENBQUMsQ0FBQ0UsSUFBSSxHQUFDLGtCQUFrQixFQUFDRixDQUFDO1FBQUE7UUFBQyxJ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Q0FBQztBQUVILENBQUMsRUFBR2tZLE1BQU0sRUFBRTFiLE1BQU0sRUFBRStELFFBQVEsQ0FBRSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSh7MTpbZnVuY3Rpb24ocmVxdWlyZSxtb2R1bGUsZXhwb3J0cyl7XCJ1c2Ugc3RyaWN0XCI7dmFyIF92YWxpZEZvcm09cmVxdWlyZShcIi4vc3JjL3ZhbGlkLWZvcm1cIik7dmFyIF92YWxpZEZvcm0yPV9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX3ZhbGlkRm9ybSk7ZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmope3JldHVybiBvYmomJm9iai5fX2VzTW9kdWxlP29iajp7ZGVmYXVsdDpvYmp9fXdpbmRvdy5WYWxpZEZvcm09X3ZhbGlkRm9ybTIuZGVmYXVsdDt3aW5kb3cuVmFsaWRGb3JtLnRvZ2dsZUludmFsaWRDbGFzcz1fdmFsaWRGb3JtLnRvZ2dsZUludmFsaWRDbGFzczt3aW5kb3cuVmFsaWRGb3JtLmhhbmRsZUN1c3RvbU1lc3NhZ2VzPV92YWxpZEZvcm0uaGFuZGxlQ3VzdG9tTWVzc2FnZXM7d2luZG93LlZhbGlkRm9ybS5oYW5kbGVDdXN0b21NZXNzYWdlRGlzcGxheT1fdmFsaWRGb3JtLmhhbmRsZUN1c3RvbU1lc3NhZ2VEaXNwbGF5fSx7XCIuL3NyYy92YWxpZC1mb3JtXCI6M31dLDI6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1widXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTp0cnVlfSk7ZXhwb3J0cy5jbG9uZT1jbG9uZTtleHBvcnRzLmRlZmF1bHRzPWRlZmF1bHRzO2V4cG9ydHMuaW5zZXJ0QWZ0ZXI9aW5zZXJ0QWZ0ZXI7ZXhwb3J0cy5pbnNlcnRCZWZvcmU9aW5zZXJ0QmVmb3JlO2V4cG9ydHMuZm9yRWFjaD1mb3JFYWNoO2V4cG9ydHMuZGVib3VuY2U9ZGVib3VuY2U7ZnVuY3Rpb24gY2xvbmUob2JqKXt2YXIgY29weT17fTtmb3IodmFyIGF0dHIgaW4gb2JqKXtpZihvYmouaGFzT3duUHJvcGVydHkoYXR0cikpY29weVthdHRyXT1vYmpbYXR0cl19cmV0dXJuIGNvcHl9ZnVuY3Rpb24gZGVmYXVsdHMob2JqLGRlZmF1bHRPYmplY3Qpe29iaj1jbG9uZShvYmp8fHt9KTtmb3IodmFyIGsgaW4gZGVmYXVsdE9iamVjdCl7aWYob2JqW2tdPT09dW5kZWZpbmVkKW9ialtrXT1kZWZhdWx0T2JqZWN0W2tdfXJldHVybiBvYmp9ZnVuY3Rpb24gaW5zZXJ0QWZ0ZXIocmVmTm9kZSxub2RlVG9JbnNlcnQpe3ZhciBzaWJsaW5nPXJlZk5vZGUubmV4dFNpYmxpbmc7aWYoc2libGluZyl7dmFyIF9wYXJlbnQ9cmVmTm9kZS5wYXJlbnROb2RlO19wYXJlbnQuaW5zZXJ0QmVmb3JlKG5vZGVUb0luc2VydCxzaWJsaW5nKX1lbHNle3BhcmVudC5hcHBlbmRDaGlsZChub2RlVG9JbnNlcnQpfX1mdW5jdGlvbiBpbnNlcnRCZWZvcmUocmVmTm9kZSxub2RlVG9JbnNlcnQpe3ZhciBwYXJlbnQ9cmVmTm9kZS5wYXJlbnROb2RlO3BhcmVudC5pbnNlcnRCZWZvcmUobm9kZVRvSW5zZXJ0LHJlZk5vZGUpfWZ1bmN0aW9uIGZvckVhY2goaXRlbXMsZm4pe2lmKCFpdGVtcylyZXR1cm47aWYoaXRlbXMuZm9yRWFjaCl7aXRlbXMuZm9yRWFjaChmbil9ZWxzZXtmb3IodmFyIGk9MDtpPGl0ZW1zLmxlbmd0aDtpKyspe2ZuKGl0ZW1zW2ldLGksaXRlbXMpfX19ZnVuY3Rpb24gZGVib3VuY2UobXMsZm4pe3ZhciB0aW1lb3V0PXZvaWQgMDt2YXIgZGVib3VuY2VkRm49ZnVuY3Rpb24gZGVib3VuY2VkRm4oKXtjbGVhclRpbWVvdXQodGltZW91dCk7dGltZW91dD1zZXRUaW1lb3V0KGZuLG1zKX07cmV0dXJuIGRlYm91bmNlZEZufX0se31dLDM6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1widXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTp0cnVlfSk7ZXhwb3J0cy50b2dnbGVJbnZhbGlkQ2xhc3M9dG9nZ2xlSW52YWxpZENsYXNzO2V4cG9ydHMuaGFuZGxlQ3VzdG9tTWVzc2FnZXM9aGFuZGxlQ3VzdG9tTWVzc2FnZXM7ZXhwb3J0cy5oYW5kbGVDdXN0b21NZXNzYWdlRGlzcGxheT1oYW5kbGVDdXN0b21NZXNzYWdlRGlzcGxheTtleHBvcnRzLmRlZmF1bHQ9dmFsaWRGb3JtO3ZhciBfdXRpbD1yZXF1aXJlKFwiLi91dGlsXCIpO2Z1bmN0aW9uIHRvZ2dsZUludmFsaWRDbGFzcyhpbnB1dCxpbnZhbGlkQ2xhc3Mpe2lucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnZhbGlkXCIsZnVuY3Rpb24oKXtpbnB1dC5jbGFzc0xpc3QuYWRkKGludmFsaWRDbGFzcyl9KTtpbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIixmdW5jdGlvbigpe2lmKGlucHV0LnZhbGlkaXR5LnZhbGlkKXtpbnB1dC5jbGFzc0xpc3QucmVtb3ZlKGludmFsaWRDbGFzcyl9fSl9dmFyIGVycm9yUHJvcHM9W1wiYmFkSW5wdXRcIixcInBhdHRlcm5NaXNtYXRjaFwiLFwicmFuZ2VPdmVyZmxvd1wiLFwicmFuZ2VVbmRlcmZsb3dcIixcInN0ZXBNaXNtYXRjaFwiLFwidG9vTG9uZ1wiLFwidG9vU2hvcnRcIixcInR5cGVNaXNtYXRjaFwiLFwidmFsdWVNaXNzaW5nXCIsXCJjdXN0b21FcnJvclwiXTtmdW5jdGlvbiBnZXRDdXN0b21NZXNzYWdlKGlucHV0LGN1c3RvbU1lc3NhZ2VzKXtjdXN0b21NZXNzYWdlcz1jdXN0b21NZXNzYWdlc3x8e307dmFyIGxvY2FsRXJyb3JQcm9wcz1baW5wdXQudHlwZStcIk1pc21hdGNoXCJdLmNvbmNhdChlcnJvclByb3BzKTt2YXIgdmFsaWRpdHk9aW5wdXQudmFsaWRpdHk7Zm9yKHZhciBpPTA7aTxsb2NhbEVycm9yUHJvcHMubGVuZ3RoO2krKyl7dmFyIHByb3A9bG9jYWxFcnJvclByb3BzW2ldO2lmKHZhbGlkaXR5W3Byb3BdKXtyZXR1cm4gaW5wdXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1cIitwcm9wKXx8Y3VzdG9tTWVzc2FnZXNbcHJvcF19fX1mdW5jdGlvbiBoYW5kbGVDdXN0b21NZXNzYWdlcyhpbnB1dCxjdXN0b21NZXNzYWdlcyl7ZnVuY3Rpb24gY2hlY2tWYWxpZGl0eSgpe3ZhciBtZXNzYWdlPWlucHV0LnZhbGlkaXR5LnZhbGlkP251bGw6Z2V0Q3VzdG9tTWVzc2FnZShpbnB1dCxjdXN0b21NZXNzYWdlcyk7aW5wdXQuc2V0Q3VzdG9tVmFsaWRpdHkobWVzc2FnZXx8XCJcIil9aW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsY2hlY2tWYWxpZGl0eSk7aW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImludmFsaWRcIixjaGVja1ZhbGlkaXR5KX1mdW5jdGlvbiBoYW5kbGVDdXN0b21NZXNzYWdlRGlzcGxheShpbnB1dCxvcHRpb25zKXt2YXIgdmFsaWRhdGlvbkVycm9yQ2xhc3M9b3B0aW9ucy52YWxpZGF0aW9uRXJyb3JDbGFzcyx2YWxpZGF0aW9uRXJyb3JQYXJlbnRDbGFzcz1vcHRpb25zLnZhbGlkYXRpb25FcnJvclBhcmVudENsYXNzLGVycm9yUGxhY2VtZW50PW9wdGlvbnMuZXJyb3JQbGFjZW1lbnQ7ZnVuY3Rpb24gY2hlY2tWYWxpZGl0eShvcHRpb25zKXt2YXIgaW5zZXJ0RXJyb3I9b3B0aW9ucy5pbnNlcnRFcnJvcjt2YXIgcGFyZW50Tm9kZT1pbnB1dC5wYXJlbnROb2RlO3ZhciBlcnJvck5vZGU9cGFyZW50Tm9kZS5xdWVyeVNlbGVjdG9yKFwiLlwiK3ZhbGlkYXRpb25FcnJvckNsYXNzKXx8ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtpZighaW5wdXQudmFsaWRpdHkudmFsaWQmJmlucHV0LnZhbGlkYXRpb25NZXNzYWdlKXtlcnJvck5vZGUuY2xhc3NOYW1lPXZhbGlkYXRpb25FcnJvckNsYXNzO2Vycm9yTm9kZS50ZXh0Q29udGVudD1pbnB1dC52YWxpZGF0aW9uTWVzc2FnZTtpZihpbnNlcnRFcnJvcil7ZXJyb3JQbGFjZW1lbnQ9PT1cImJlZm9yZVwiPygwLF91dGlsLmluc2VydEJlZm9yZSkoaW5wdXQsZXJyb3JOb2RlKTooMCxfdXRpbC5pbnNlcnRBZnRlcikoaW5wdXQsZXJyb3JOb2RlKTtwYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQodmFsaWRhdGlvbkVycm9yUGFyZW50Q2xhc3MpfX1lbHNle3BhcmVudE5vZGUuY2xhc3NMaXN0LnJlbW92ZSh2YWxpZGF0aW9uRXJyb3JQYXJlbnRDbGFzcyk7ZXJyb3JOb2RlLnJlbW92ZSgpfX1pbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIixmdW5jdGlvbigpe2NoZWNrVmFsaWRpdHkoe2luc2VydEVycm9yOmZhbHNlfSl9KTtpbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiaW52YWxpZFwiLGZ1bmN0aW9uKGUpe2UucHJldmVudERlZmF1bHQoKTtjaGVja1ZhbGlkaXR5KHtpbnNlcnRFcnJvcjp0cnVlfSl9KX12YXIgZGVmYXVsdE9wdGlvbnM9e2ludmFsaWRDbGFzczpcImludmFsaWRcIix2YWxpZGF0aW9uRXJyb3JDbGFzczpcInZhbGlkYXRpb24tZXJyb3JcIix2YWxpZGF0aW9uRXJyb3JQYXJlbnRDbGFzczpcImhhcy12YWxpZGF0aW9uLWVycm9yXCIsY3VzdG9tTWVzc2FnZXM6e30sZXJyb3JQbGFjZW1lbnQ6XCJiZWZvcmVcIn07ZnVuY3Rpb24gdmFsaWRGb3JtKGVsZW1lbnQsb3B0aW9ucyl7aWYoIWVsZW1lbnR8fCFlbGVtZW50Lm5vZGVOYW1lKXt0aHJvdyBuZXcgRXJyb3IoXCJGaXJzdCBhcmcgdG8gdmFsaWRGb3JtIG11c3QgYmUgYSBmb3JtLCBpbnB1dCwgc2VsZWN0LCBvciB0ZXh0YXJlYVwiKX12YXIgaW5wdXRzPXZvaWQgMDt2YXIgdHlwZT1lbGVtZW50Lm5vZGVOYW1lLnRvTG93ZXJDYXNlKCk7b3B0aW9ucz0oMCxfdXRpbC5kZWZhdWx0cykob3B0aW9ucyxkZWZhdWx0T3B0aW9ucyk7aWYodHlwZT09PVwiZm9ybVwiKXtpbnB1dHM9ZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiaW5wdXQsIHNlbGVjdCwgdGV4dGFyZWFcIik7Zm9jdXNJbnZhbGlkSW5wdXQoZWxlbWVudCxpbnB1dHMpfWVsc2UgaWYodHlwZT09PVwiaW5wdXRcInx8dHlwZT09PVwic2VsZWN0XCJ8fHR5cGU9PT1cInRleHRhcmVhXCIpe2lucHV0cz1bZWxlbWVudF19ZWxzZXt0aHJvdyBuZXcgRXJyb3IoXCJPbmx5IGZvcm0sIGlucHV0LCBzZWxlY3QsIG9yIHRleHRhcmVhIGVsZW1lbnRzIGFyZSBzdXBwb3J0ZWRcIil9dmFsaWRGb3JtSW5wdXRzKGlucHV0cyxvcHRpb25zKX1mdW5jdGlvbiBmb2N1c0ludmFsaWRJbnB1dChmb3JtLGlucHV0cyl7dmFyIGZvY3VzRmlyc3Q9KDAsX3V0aWwuZGVib3VuY2UpKDEwMCxmdW5jdGlvbigpe3ZhciBpbnZhbGlkTm9kZT1mb3JtLnF1ZXJ5U2VsZWN0b3IoXCI6aW52YWxpZFwiKTtpZihpbnZhbGlkTm9kZSlpbnZhbGlkTm9kZS5mb2N1cygpfSk7KDAsX3V0aWwuZm9yRWFjaCkoaW5wdXRzLGZ1bmN0aW9uKGlucHV0KXtyZXR1cm4gaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImludmFsaWRcIixmb2N1c0ZpcnN0KX0pfWZ1bmN0aW9uIHZhbGlkRm9ybUlucHV0cyhpbnB1dHMsb3B0aW9ucyl7dmFyIGludmFsaWRDbGFzcz1vcHRpb25zLmludmFsaWRDbGFzcyxjdXN0b21NZXNzYWdlcz1vcHRpb25zLmN1c3RvbU1lc3NhZ2VzOygwLF91dGlsLmZvckVhY2gpKGlucHV0cyxmdW5jdGlvbihpbnB1dCl7dG9nZ2xlSW52YWxpZENsYXNzKGlucHV0LGludmFsaWRDbGFzcyk7aGFuZGxlQ3VzdG9tTWVzc2FnZXMoaW5wdXQsY3VzdG9tTWVzc2FnZXMpO2hhbmRsZUN1c3RvbU1lc3NhZ2VEaXNwbGF5KGlucHV0LG9wdGlvbnMpfSl9fSx7XCIuL3V0aWxcIjoyfV19LHt9LFsxXSk7IiwiLy8gTWlublBvc3QgR2l2aW5nIHBsdWdpblxuLy8gdGhlIHNlbWktY29sb24gYmVmb3JlIGZ1bmN0aW9uIGludm9jYXRpb24gaXMgYSBzYWZldHkgbmV0IGFnYWluc3QgY29uY2F0ZW5hdGVkXG4vLyBzY3JpcHRzIGFuZC9vciBvdGhlciBwbHVnaW5zIHdoaWNoIG1heSBub3QgYmUgY2xvc2VkIHByb3Blcmx5LlxuOyhmdW5jdGlvbiAoICQsIHdpbmRvdywgZG9jdW1lbnQsIHVuZGVmaW5lZCApIHtcblxuICAvLyB1bmRlZmluZWQgaXMgdXNlZCBoZXJlIGFzIHRoZSB1bmRlZmluZWQgZ2xvYmFsIHZhcmlhYmxlIGluIEVDTUFTY3JpcHQgMyBpc1xuICAvLyBtdXRhYmxlIChpZS4gaXQgY2FuIGJlIGNoYW5nZWQgYnkgc29tZW9uZSBlbHNlKS4gdW5kZWZpbmVkIGlzbid0IHJlYWxseSBiZWluZ1xuICAvLyBwYXNzZWQgaW4gc28gd2UgY2FuIGVuc3VyZSB0aGUgdmFsdWUgb2YgaXQgaXMgdHJ1bHkgdW5kZWZpbmVkLiBJbiBFUzUsIHVuZGVmaW5lZFxuICAvLyBjYW4gbm8gbG9uZ2VyIGJlIG1vZGlmaWVkLlxuXG4gIC8vIHdpbmRvdyBhbmQgZG9jdW1lbnQgYXJlIHBhc3NlZCB0aHJvdWdoIGFzIGxvY2FsIHZhcmlhYmxlIHJhdGhlciB0aGFuIGdsb2JhbFxuICAvLyBhcyB0aGlzIChzbGlnaHRseSkgcXVpY2tlbnMgdGhlIHJlc29sdXRpb24gcHJvY2VzcyBhbmQgY2FuIGJlIG1vcmUgZWZmaWNpZW50bHlcbiAgLy8gbWluaWZpZWQgKGVzcGVjaWFsbHkgd2hlbiBib3RoIGFyZSByZWd1bGFybHkgcmVmZXJlbmNlZCBpbiB5b3VyIHBsdWdpbikuXG5cbiAgLy8gQ3JlYXRlIHRoZSBkZWZhdWx0cyBvbmNlXG4gIHZhciBwbHVnaW5OYW1lID0gJ21pbm5wb3N0X2dpdmluZycsXG4gIGRlZmF1bHRzID0ge1xuICAgICdkZWJ1ZycgOiBmYWxzZSwgLy8gdGhpcyBjYW4gYmUgc2V0IHRvIHRydWUgb24gcGFnZSBsZXZlbCBvcHRpb25zXG4gICAgJ3N0cmlwZV9wdWJsaXNoYWJsZV9rZXknIDogJycsXG4gICAgJ3BsYWlkX2VudicgOiAnJyxcbiAgICAncGxhaWRfbGluaycgOiAnI2F1dGhvcml6ZS1hY2gnLFxuICAgICdtaW5ucG9zdF9yb290JyA6ICdodHRwczovL3d3dy5taW5ucG9zdC5jb20nLFxuICAgICdhbmFseXRpY3NfdHlwZScgOiAnJyxcbiAgICAncHJvZ3Jlc3Nfc2VsZWN0b3InIDogJy5tLXN1cHBvcnQtcHJvZ3Jlc3MnLFxuICAgICdmb3JtX3NlbGVjdG9yJyA6ICcubS1mb3JtJyxcbiAgICAnZG9uYXRlX2Zvcm1fc2VsZWN0b3InOiAnI2RvbmF0ZScsXG4gICAgJ2NvbmZpcm1fZm9ybV9zZWxlY3RvcicgOiAnI2NvbmZpcm0nLFxuICAgICdmaW5pc2hfc2VjdGlvbl9zZWxlY3RvcicgOiAnI3BhbmVsLS1jb25maXJtYXRpb24nLFxuICAgICdwYXlfY2NfcHJvY2Vzc2luZ19zZWxlY3RvcicgOiAnaW5wdXRbbmFtZT1cInBheV9mZWVzXCJdJyxcbiAgICAnZmVlX2Ftb3VudCcgOiAnLnByb2Nlc3NpbmctYW1vdW50JyxcbiAgICAnbGV2ZWxfYW1vdW50X3NlbGVjdG9yJyA6ICcjcGFuZWwtLXBheSAuYW1vdW50IC5sZXZlbC1hbW91bnQnLCAvLyB3ZSBjYW4gbWF5YmUgZ2V0IHJpZCBvZiB0aGlzXG4gICAgJ29yaWdpbmFsX2Ftb3VudF9zZWxlY3RvcicgOiAnW25hbWU9XCJhbW91bnRcIl0nLFxuICAgICdnaWZ0X2RlbGl2ZXJ5X21ldGhvZF9zZWxlY3RvcicgOiAnW25hbWU9XCJnaWZ0X2RlbGl2ZXJ5X21ldGhvZFwiXScsXG4gICAgJ2ZhaXJfbWFya2V0X3ZhbHVlX3NlbGVjdG9yJyA6ICcjZmFpcl9tYXJrZXRfdmFsdWUnLFxuICAgICdmdWxsX2Ftb3VudF9zZWxlY3RvcicgOiAnLmZ1bGwtYW1vdW50JyxcbiAgICAnaW5zdGFsbG1lbnRfcGVyaW9kX3NlbGVjdG9yJyA6ICdbbmFtZT1cImluc3RhbGxtZW50X3BlcmlvZFwiXScsXG4gICAgJ25hbWVfc2VsZWN0b3InIDogJy5tLWZvcm0taXRlbS1kaXNwbGF5LW5hbWUnLFxuICAgICdpbl9ob25vcl9vcl9tZW1vcnlfZmllbGRfc2VsZWN0b3InIDogJy5tLWZvcm0taXRlbS1ob25vci1tZW1vcnknLFxuICAgICdob25vcl9vcl9tZW1vcnlfY2hvb3NlcicgOiAnaW5wdXRbbmFtZT1cImluX2hvbm9yX29yX21lbW9yeVwiXScsIC8vIHJhZGlvIGZpZWxkc1xuICAgICdob25vcl90eXBlX3NlbGVjdG9yJyA6ICcuYS1ob25vci10eXBlJywgLy8gc3BhbiBpbnNpZGUgbGFiZWxcbiAgICAnaG9ub3JfbWVtb3J5X2lucHV0X2dyb3VwJyA6ICcuYS1ob25vci1vci1tZW1vcnknLCAvLyBob2xkcyB0aGUgZm9ybSBmaWVsZFxuICAgICdhbm9ueW1vdXNfc2VsZWN0b3InIDogJyNhbm9ueW1vdXMnLFxuICAgICdzaG93X2JpbGxpbmdfY291bnRyeV9zZWxlY3RvcicgOiAnI2JpbGxpbmdfc2hvd19jb3VudHJ5JyxcbiAgICAnYmlsbGluZ19jb3VudHJ5X3NlbGVjdG9yJyA6ICcubS1mb3JtLWl0ZW0tY291bnRyeScsXG4gICAgJ3Nob3dfc2hpcHBpbmdfY291bnRyeV9zZWxlY3RvcicgOiAnI3NoaXBwaW5nX3Nob3dfY291bnRyeScsXG4gICAgJ3NoaXBwaW5nX2NvdW50cnlfc2VsZWN0b3InIDogJy5tLWZvcm0taXRlbS1zaGlwcGluZy1jb3VudHJ5JyxcbiAgICAnc2hpcHBpbmdfYWRkcmVzc19zZWxlY3RvcicgOiAnLm0tZm9ybS1pdGVtLXNoaXBwaW5nLWFkZHJlc3MnLFxuICAgICd1c2VfZm9yX3NoaXBwaW5nX3NlbGVjdG9yJyA6ICcjdXNlZm9yc2hpcHBpbmcnLFxuICAgICdlbWFpbF9maWVsZF9zZWxlY3RvcicgOiAnI2VtYWlsJyxcbiAgICAncGFzc3dvcmRfZmllbGRfc2VsZWN0b3InIDogJyNwYXNzd29yZCcsXG4gICAgJ2ZpcnN0X25hbWVfZmllbGRfc2VsZWN0b3InIDogJyNmaXJzdF9uYW1lJyxcbiAgICAnbGFzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yJyA6ICcjbGFzdF9uYW1lJyxcbiAgICAnYmlsbGluZ19zdHJlZXRfZmllbGRfc2VsZWN0b3InIDogJyNiaWxsaW5nX3N0cmVldCcsXG4gICAgJ2JpbGxpbmdfY2l0eV9maWVsZF9zZWxlY3RvcicgOiAnI2JpbGxpbmdfY2l0eScsXG4gICAgJ2JpbGxpbmdfc3RhdGVfZmllbGRfc2VsZWN0b3InIDogJyNiaWxsaW5nX3N0YXRlJyxcbiAgICAnYmlsbGluZ196aXBfZmllbGRfc2VsZWN0b3InOiAnI2JpbGxpbmdfemlwJyxcbiAgICAnYmlsbGluZ19jb3VudHJ5X2ZpZWxkX3NlbGVjdG9yJyA6ICcjYmlsbGluZ19jb3VudHJ5JyxcbiAgICAnc2hpcHBpbmdfc3RhdGVfZmllbGRfc2VsZWN0b3InIDogJyNzaGlwcGluZ19zdGF0ZScsXG4gICAgJ3NoaXBwaW5nX3ppcF9maWVsZF9zZWxlY3Rvcic6ICcjc2hpcHBpbmdfemlwJyxcbiAgICAnc2hpcHBpbmdfY291bnRyeV9maWVsZF9zZWxlY3RvcicgOiAnI3NoaXBwaW5nX2NvdW50cnknLFxuICAgICdjcmVhdGVfbXBfc2VsZWN0b3InIDogJyNjcmVhdGVtcGFjY291bnQnLFxuICAgICdwYXNzd29yZF9zZWxlY3RvcicgOiAnLm0tZm9ybS1pdGVtLXBhc3N3b3JkJyxcbiAgICAnYWRkaXRpb25hbF9hbW91bnRfZmllbGQnIDogJyNhZGRpdGlvbmFsX2RvbmF0aW9uJyxcbiAgICAnc2hpcHBpbmdfYW1vdW50X2ZpZWxkJzogJ1tuYW1lPVwic2hpcHBpbmdfY29zdFwiXScsXG4gICAgJ3NoaXBwaW5nX3NlbGVjdG9yJyA6ICdmaWVsZHNldC5tLXNoaXBwaW5nLWluZm9ybWF0aW9uJyxcbiAgICAnY2hvb3NlX3BheW1lbnQnIDogJyNjaG9vc2UtcGF5bWVudC1tZXRob2QnLFxuICAgICdwYXltZW50X21ldGhvZF9zZWxlY3RvcicgOiAnLnBheW1lbnQtbWV0aG9kJyxcbiAgICAnY2NfbnVtX3NlbGVjdG9yJyA6ICcjY2FyZC1udW1iZXInLFxuICAgICdjY19leHBfc2VsZWN0b3InIDogJyNjYXJkLWV4cGlyeScsXG4gICAgJ2NjX2N2Y19zZWxlY3RvcicgOiAnI2NhcmQtY3ZjJyxcbiAgICAncGF5X2J1dHRvbl9zZWxlY3RvcicgOiAnLmEtYnV0dG9uLXBheScsXG4gICAgJ29wcF9pZF9zZWxlY3RvcicgOiAnI2xvY2tfa2V5JywgLy8gd2UgdXNlIHRoaXMgdmFsdWUgYXMgdGhlIEdvb2dsZSBBbmFseXRpY3MgdHJhbnNhY3Rpb24gSURcbiAgICAnbmV3c2xldHRlcl9ncm91cF9zZWxlY3RvcicgOiAnLnN1cHBvcnQtbmV3c2xldHRlcnMnXG4gIH07IC8vIGVuZCBkZWZhdWx0c1xuXG4gIC8vIFRoZSBhY3R1YWwgcGx1Z2luIGNvbnN0cnVjdG9yXG4gIGZ1bmN0aW9uIFBsdWdpbiggZWxlbWVudCwgb3B0aW9ucyApIHtcblxuICAgIHRoaXMuZWxlbWVudCA9IGVsZW1lbnQ7XG5cbiAgICAvLyBqUXVlcnkgaGFzIGFuIGV4dGVuZCBtZXRob2Qgd2hpY2ggbWVyZ2VzIHRoZSBjb250ZW50cyBvZiB0d28gb3JcbiAgICAvLyBtb3JlIG9iamVjdHMsIHN0b3JpbmcgdGhlIHJlc3VsdCBpbiB0aGUgZmlyc3Qgb2JqZWN0LiBUaGUgZmlyc3Qgb2JqZWN0XG4gICAgLy8gaXMgZ2VuZXJhbGx5IGVtcHR5IGFzIHdlIGRvbid0IHdhbnQgdG8gYWx0ZXIgdGhlIGRlZmF1bHQgb3B0aW9ucyBmb3JcbiAgICAvLyBmdXR1cmUgaW5zdGFuY2VzIG9mIHRoZSBwbHVnaW5cbiAgICB0aGlzLm9wdGlvbnMgPSAkLmV4dGVuZCgge30sIGRlZmF1bHRzLCBvcHRpb25zICk7XG5cbiAgICB0aGlzLl9kZWZhdWx0cyA9IGRlZmF1bHRzO1xuICAgIHRoaXMuX25hbWUgPSBwbHVnaW5OYW1lO1xuXG4gICAgdGhpcy5pbml0KCk7XG4gIH0gLy8gZW5kIGNvbnN0cnVjdG9yXG5cbiAgUGx1Z2luLnByb3RvdHlwZSA9IHtcblxuICAgIGluaXQ6IGZ1bmN0aW9uKHJlc2V0LCBhbW91bnQpIHtcblxuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCAnbm8tanMnICk7XG4gICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC5hZGQoICdqcycgKTtcblxuICAgICAgLy8gUGxhY2UgaW5pdGlhbGl6YXRpb24gbG9naWMgaGVyZVxuICAgICAgLy8gWW91IGFscmVhZHkgaGF2ZSBhY2Nlc3MgdG8gdGhlIERPTSBlbGVtZW50IGFuZFxuICAgICAgLy8gdGhlIG9wdGlvbnMgdmlhIHRoZSBpbnN0YW5jZSwgZS5nLiB0aGlzLmVsZW1lbnRcbiAgICAgIC8vIGFuZCB0aGlzLm9wdGlvbnNcbiAgICAgIC8vIHlvdSBjYW4gYWRkIG1vcmUgZnVuY3Rpb25zIGxpa2UgdGhlIG9uZSBiZWxvdyBhbmRcbiAgICAgIC8vIGNhbGwgdGhlbSBsaWtlIHNvOiB0aGlzLnlvdXJPdGhlckZ1bmN0aW9uKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKS5cblxuICAgICAgLy8gbW9kaWZ5IG9wdGlvbnMgYXMgbmVlZGVkXG4gICAgICAvL3ZhciB0aGlzLm9wdGlvbnMuYW1vdW50ID0gJyc7XG4gICAgICBpZiAocmVzZXQgIT09IHRydWUpIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLmFtb3VudCA9IHBhcnNlRmxvYXQoJCh0aGlzLm9wdGlvbnMubGV2ZWxfYW1vdW50X3NlbGVjdG9yLCB0aGlzLmVsZW1lbnQpLnRleHQoKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm9wdGlvbnMuYW1vdW50ID0gYW1vdW50O1xuICAgICAgfVxuICAgICAgdGhpcy5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCAgICAgPSBwYXJzZUludCgkKHRoaXMub3B0aW9ucy5vcmlnaW5hbF9hbW91bnRfc2VsZWN0b3IsIHRoaXMuZWxlbWVudCkudmFsKCksIDEwKTtcbiAgICAgIHRoaXMub3B0aW9ucy5wcm9jZXNzaW5nX2ZlZSAgICAgID0gKE1hdGgucm91bmQocGFyc2VGbG9hdCh0aGlzLm9wdGlvbnMuZmVlX2Ftb3VudCkqTWF0aC5wb3coMTAsMikpL01hdGgucG93KDEwLDIpKS50b0ZpeGVkKDIpO1xuICAgICAgdGhpcy5vcHRpb25zLnByb2Nlc3NpbmdfZmVlX3RleHQgPSB0aGlzLm9wdGlvbnMucHJvY2Vzc2luZ19mZWU7XG4gICAgICB0aGlzLm9wdGlvbnMuY3JlYXRlX2FjY291bnQgICAgICA9IGZhbHNlO1xuXG4gICAgICB2YXIgYnV0dG9uX3RleHQgPSAkKHRoaXMub3B0aW9ucy5wYXlfYnV0dG9uX3NlbGVjdG9yKS50ZXh0KCk7XG4gICAgICB0aGlzLm9wdGlvbnMuYnV0dG9uX3RleHQgPSBidXR0b25fdGV4dDtcblxuICAgICAgdGhpcy5zdHJpcGUgPSBTdHJpcGUodGhpcy5vcHRpb25zLnN0cmlwZV9wdWJsaXNoYWJsZV9rZXkpO1xuICAgICAgdGhpcy5lbGVtZW50cyA9IHRoaXMuc3RyaXBlLmVsZW1lbnRzKHtcbiAgICAgICAgZm9udHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICAvLyBpbnRlZ3JhdGUgeW91ciBmb250IGludG8gc3RyaXBlXG4gICAgICAgICAgICBjc3NTcmM6ICdodHRwczovL3VzZS50eXBla2l0Lm5ldC9jeGo3ZnpnLmNzcycsXG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9KTtcblxuICAgICAgaWYgKHRoaXMub3B0aW9ucy5kZWJ1ZyA9PT0gdHJ1ZSkge1xuICAgICAgICB0aGlzLmRlYnVnKHRoaXMub3B0aW9ucyk7XG4gICAgICAgIC8vIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gY2FsbCBmdW5jdGlvbnNcbiAgICAgIHRoaXMuYW5hbHl0aWNzVHJhY2tpbmcodGhpcy5vcHRpb25zKTsgLy8gdHJhY2sgYW5hbHl0aWNzIGV2ZW50c1xuICAgICAgdGhpcy5hbW91bnRBc1JhZGlvKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gaWYgdGhlIGFtb3VudCBmaWVsZCBpcyBhIHJhZGlvIGJ1dHRvblxuICAgICAgdGhpcy5hbW91bnRVcGRhdGVkKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gaWYgdGhlIGFtb3VudCB0ZXh0IGZpZWxkIGNhbiBjaGFuZ2VcblxuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLnBheV9jY19wcm9jZXNzaW5nX3NlbGVjdG9yKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuY3JlZGl0Q2FyZFByb2Nlc3NpbmdGZWVzKHRoaXMub3B0aW9ucyk7IC8vIHByb2Nlc3NpbmcgZmVlc1xuICAgICAgfVxuICAgICAgXG4gICAgICAvLyB0aGUgbWFpbiBmb3JtIElELiB0aGlzIGlzIG5vdCB1c2VkIGZvciBjYW5jZWxsaW5nXG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5kb25hdGVBbm9ueW1vdXNseSh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIGFub255bW91c1xuICAgICAgICB0aGlzLmhvbm9yT3JNZW1vcnlUb2dnbGUodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBpbiBob25vciBvciBpbiBtZW1vcnkgb2Ygc29tZW9uZVxuICAgICAgICB0aGlzLm91dHNpZGVVbml0ZWRTdGF0ZXModGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBvdXRzaWRlIFVTXG4gICAgICAgIHRoaXMuc2hpcHBpbmdBZGRyZXNzKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gc2hpcHBpbmcgYWRkcmVzc1xuICAgICAgICB0aGlzLmFsbG93TWlubnBvc3RBY2NvdW50KHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gb3B0aW9uIGZvciBjcmVhdGluZyBtaW5ucG9zdCBhY2NvdW50XG4gICAgICAgIHRoaXMucGF5bWVudFJlcXVlc3RCdXR0b24odGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBjcmVhdGUgcGF5bWVudHJlcXVlc3QgYnV0dG9uXG4gICAgICAgIHRoaXMuY2hvb3NlUGF5bWVudE1ldGhvZCh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIHN3aXRjaCBiZXR3ZWVuIGNhcmQgYW5kIGFjaFxuICAgICAgICB0aGlzLmNyZWRpdENhcmRGaWVsZHModGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBkbyBzdHVmZiB3aXRoIHRoZSBjcmVkaXQgY2FyZCBmaWVsZHNcbiAgICAgICAgdGhpcy52YWxpZGF0ZVNldHVwKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gc2V0dXAgaG93IHZhbGlkYXRpb24gZXJyb3JzIHdvcmtcbiAgICAgICAgdGhpcy5mb3JtU2V0dXAodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyB2YWxpZGF0ZSBhbmQgc3VibWl0IHRoZSBmb3JtXG4gICAgICB9XG5cbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5jb25maXJtX2Zvcm1fc2VsZWN0b3IpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdGhpcy5zaG93TmV3c2xldHRlclNldHRpbmdzKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTtcbiAgICAgICAgdGhpcy5jb25maXJtTWVzc2FnZVN1Ym1pdCh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIHN1Ym1pdCB0aGUgc3R1ZmYgb24gdGhlIGNvbmZpcm1hdGlvbiBwYWdlXG4gICAgICB9XG5cbiAgICB9LCAvLyBpbml0XG5cbiAgICBkZWJ1ZzogZnVuY3Rpb24obWVzc2FnZSkge1xuICAgICAgaWYgKHRoaXMub3B0aW9ucy5kZWJ1ZyA9PT0gdHJ1ZSkge1xuICAgICAgICBpZiAodHlwZW9mIG1lc3NhZ2UgIT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgY29uc29sZS5sb2cobWVzc2FnZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc29sZS5kaXIobWVzc2FnZSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc29sZS5kaXIodGhpcyk7XG4gICAgICB9XG4gICAgfSwgLy8gZGVidWdcblxuICAgIGFuYWx5dGljc1RyYWNraW5nOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICB0aGlzLmRlYnVnKCdhbmFseXRpY3MgdHlwZSBpcyAnICsgb3B0aW9ucy5hbmFseXRpY3NfdHlwZSk7XG4gICAgICB2YXIgcHJvZ3Jlc3MgPSAkKG9wdGlvbnMucHJvZ3Jlc3Nfc2VsZWN0b3IpO1xuICAgICAgdmFyIHN0ZXA7XG4gICAgICB2YXIgYWN0aW9uID0gJ2NoZWNrb3V0JztcbiAgICAgIHZhciBuYXZfaXRlbV9jb3VudCA9IDA7XG4gICAgICB2YXIgb3BwX2lkID0gJChvcHRpb25zLm9wcF9pZF9zZWxlY3RvcikudmFsKCk7XG4gICAgICB2YXIgcG9zdF9wdXJjaGFzZSA9IGZhbHNlO1xuICAgICAgaWYgKG9wdGlvbnMuYW5hbHl0aWNzX3R5cGUgPT0gJ2FuYWx5dGljc2pzJykge1xuICAgICAgICBnYSggJ3JlcXVpcmUnLCAnZWMnICk7XG4gICAgICB9XG4gICAgICBpZiAocHJvZ3Jlc3MubGVuZ3RoID4gMCkge1xuICAgICAgICBuYXZfaXRlbV9jb3VudCA9ICQoJ2xpJywgcHJvZ3Jlc3MpLmxlbmd0aDsgLy8gbGVuZ3RoIGlzIG5vdCB6ZXJvIGJhc2VkXG4gICAgICAgIHN0ZXAgPSAkKCdsaSAuYWN0aXZlJywgcHJvZ3Jlc3MpLnBhcmVudCgpLmluZGV4KCkgKyAxOyAvLyBpbmRleCBpcyB6ZXJvIGJhc2VkXG4gICAgICB9XG4gICAgICAvLyB0aGVyZSBpcyBhIHByb2dyZXNzIG1lbnUsIEFORCB0aGVyZSBJUyBOT1QgYSBjb25maXJtIGZvcm0gc2VsZWN0b3JcbiAgICAgIC8vIGlmIHRoYXQgaXMgdGhlIGNhc2UsIHdlJ3JlIG5vdCBvbiB0aGUgcHVyY2hhc2Ugc3RlcFxuICAgICAgaWYgKHByb2dyZXNzLmxlbmd0aCA+IDAgJiYgJChvcHRpb25zLmNvbmZpcm1fZm9ybV9zZWxlY3RvcikubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIC8vIHRoZSBhY3RpdmUgdGFiIG1hdGNoZXMgdGhlIGNvdW50IG9mIGl0ZW1zIEFORCB0aGVyZSBpcyBOT1QgYSBjb25maXJtIGZvcm0gdG8gYmUgc3VibWl0dGVkXG4gICAgICAgIC8vIHRoYXQgbWVhbnMgd2UncmUgb24gYSBwb3N0IHB1cmNoYXNlIHN0ZXAuXG4gICAgICAgIGlmIChzdGVwID09PSBuYXZfaXRlbV9jb3VudCAmJiAkKG9wdGlvbnMuY29uZmlybV9mb3JtX3NlbGVjdG9yKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICBzdGVwID0gc3RlcCArIDE7XG4gICAgICAgICAgcG9zdF9wdXJjaGFzZSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAocHJvZ3Jlc3MubGVuZ3RoID4gMCAmJiAkKG9wdGlvbnMuY29uZmlybV9mb3JtX3NlbGVjdG9yKS5sZW5ndGggPiAwIHx8ICQob3B0aW9ucy5maW5pc2hfc2VjdGlvbl9zZWxlY3RvcikubGVuZ3RoID4gMCkge1xuICAgICAgICAvLyB3ZSBhcmUgb24gdGhlIGNvbmZpcm0gZm9ybSBzZWxlY3RvciBhbmQgdGhlcmUgaXMgYSBwcm9ncmVzcyBtZWFzdXJlXG4gICAgICAgIC8vIE9SLCB3ZSBhcmUgb24gdGhlIGZpbmlzaCBzZWxlY3RvciBhbmQgdGhlcmUgaXMgTk9UIGEgcHJvZ3Jlc3MgbWVhc3VyZVxuICAgICAgICAvLyB0aGVzZSBtZWFuIHRoZSB1c2VyIGp1c3QgcHVyY2hhc2VkLlxuICAgICAgICBhY3Rpb24gPSAncHVyY2hhc2UnO1xuICAgICAgfSBlbHNlIGlmIChwcm9ncmVzcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5kZWJ1ZyggJ3N0ZXAgaXMgJyArIHN0ZXAgKyAnIGFuZCBuYXYgaXRlbSBjb3VudCBpcyAnICsgbmF2X2l0ZW1fY291bnQgKyAnIGFuZCBvcHAgaWQgaXMgJyArIG9wcF9pZCArICcgYW5kIHBvc3QgcHVyY2hhc2UgaXMgJyArIHBvc3RfcHVyY2hhc2UgKTtcbiAgICAgIHRoaXMuYW5hbHl0aWNzVHJhY2tpbmdTdGVwKHN0ZXAsIGFjdGlvbiwgcG9zdF9wdXJjaGFzZSk7XG4gICAgfSwgLy8gYW5hbHl0aWNzVHJhY2tpbmdcblxuICAgIGFuYWx5dGljc1RyYWNraW5nU3RlcDogZnVuY3Rpb24oc3RlcCwgYWN0aW9uLCBwb3N0X3B1cmNoYXNlKSB7XG4gICAgICB2YXIgcHJvZ3Jlc3MgPSAkKHRoaXMub3B0aW9ucy5wcm9ncmVzc19zZWxlY3Rvcik7XG4gICAgICB2YXIgYW1vdW50ID0gJCh0aGlzLm9wdGlvbnMub3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yKS52YWwoKTtcbiAgICAgIHZhciBvcHBfaWQgPSAkKHRoaXMub3B0aW9ucy5vcHBfaWRfc2VsZWN0b3IpLnZhbCgpO1xuICAgICAgdmFyIGluc3RhbGxtZW50X3BlcmlvZCA9ICdvbmUtdGltZSc7XG4gICAgICB2YXIgbGV2ZWw7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuaW5zdGFsbG1lbnRfcGVyaW9kX3NlbGVjdG9yKS5sZW5ndGggPiAwICkge1xuICAgICAgICBpbnN0YWxsbWVudF9wZXJpb2QgPSAkKHRoaXMub3B0aW9ucy5pbnN0YWxsbWVudF9wZXJpb2Rfc2VsZWN0b3IpLnZhbCgpO1xuICAgICAgfVxuICAgICAgLy8gaWYgd2UncmUgbm90IGFmdGVyIHRoZSBwdXJjaGFzZSwgdXNlIGFkZFByb2R1Y3RcbiAgICAgIC8vaWYgKHByb2dyZXNzLmxlbmd0aCA+IDAgJiYgcG9zdF9wdXJjaGFzZSAhPT0gdHJ1ZSkge1xuICAgICAgaWYgKHByb2dyZXNzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgICAgYW1vdW50OiBhbW91bnQsXG4gICAgICAgICAgaW5zdGFsbG1lbnRfcGVyaW9kOiBpbnN0YWxsbWVudF9wZXJpb2RcbiAgICAgICAgfTtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICB1cmw6ICcvY2FsY3VsYXRlLW1lbWJlci1sZXZlbC8nLFxuICAgICAgICAgIGRhdGE6IGRhdGFcbiAgICAgICAgfSkuZG9uZShmdW5jdGlvbiggZGF0YSApIHtcbiAgICAgICAgICBpZiAoJChkYXRhLmxldmVsKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBsZXZlbCA9IGRhdGEubGV2ZWwubGV2ZWw7XG4gICAgICAgICAgICB0aGF0LmRlYnVnKCdjcmVhdGUgcHJvZHVjdCBvYmplY3Q6IGlkIGlzICcgKyAnbWlubnBvc3RfJyArIGxldmVsLnRvTG93ZXJDYXNlKCkgKyAnX21lbWJlcnNoaXAnICsgJyBhbmQgbmFtZSBpcyAnICsgJ01pbm5Qb3N0ICcgKyBsZXZlbC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGxldmVsLnNsaWNlKDEpICsgJyBNZW1iZXJzaGlwJyArICcgYW5kIHZhcmlhbnQgaXMgJyArIGluc3RhbGxtZW50X3BlcmlvZC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGluc3RhbGxtZW50X3BlcmlvZC5zbGljZSgxKSk7XG4gICAgICAgICAgICB2YXIgcHJvZHVjdCA9IHtcbiAgICAgICAgICAgICAgJ2lkJzogJ21pbm5wb3N0XycgKyBsZXZlbC50b0xvd2VyQ2FzZSgpICsgJ19tZW1iZXJzaGlwJyxcbiAgICAgICAgICAgICAgJ25hbWUnOiAnTWlublBvc3QgJyArIGxldmVsLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgbGV2ZWwuc2xpY2UoMSkgKyAnIE1lbWJlcnNoaXAnLFxuICAgICAgICAgICAgICAnY2F0ZWdvcnknOiAnRG9uYXRpb24nLFxuICAgICAgICAgICAgICAnYnJhbmQnOiAnTWlublBvc3QnLFxuICAgICAgICAgICAgICAndmFyaWFudCc6IGluc3RhbGxtZW50X3BlcmlvZC5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGluc3RhbGxtZW50X3BlcmlvZC5zbGljZSgxKSxcbiAgICAgICAgICAgICAgJ3ByaWNlJzogdGhhdC5nZXRUb3RhbEFtb3VudChhbW91bnQpLFxuICAgICAgICAgICAgICAncXVhbnRpdHknOiAxXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaWYgKHRoYXQub3B0aW9ucy5hbmFseXRpY3NfdHlwZSA9PSAnZ3RhZ2pzJykge1xuICAgICAgICAgICAgICBndGFnKCdldmVudCcsICdjaGVja291dF9wcm9ncmVzcycsIHtcbiAgICAgICAgICAgICAgICBcInZhbHVlXCI6IHRoYXQuZ2V0VG90YWxBbW91bnQoYW1vdW50KSxcbiAgICAgICAgICAgICAgICBcIml0ZW1zXCI6IFtwcm9kdWN0XSxcbiAgICAgICAgICAgICAgICBcImNoZWNrb3V0X3N0ZXBcIjogc3RlcCxcbiAgICAgICAgICAgICAgICBcImNoZWNrb3V0X29wdGlvblwiOiBhY3Rpb24sXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGF0Lm9wdGlvbnMuYW5hbHl0aWNzX3R5cGUgPT0gJ2FuYWx5dGljc2pzJykge1xuICAgICAgICAgICAgICBnYSgnZWM6YWRkUHJvZHVjdCcsIHByb2R1Y3QpO1xuICAgICAgICAgICAgICBnYSgnZWM6c2V0QWN0aW9uJywgJ2NoZWNrb3V0Jywge1xuICAgICAgICAgICAgICAgICdzdGVwJzogc3RlcCxcbiAgICAgICAgICAgICAgICAnb3B0aW9uJzogYWN0aW9uXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoYWN0aW9uID09PSAncHVyY2hhc2UnKSB7XG4gICAgICAgICAgICAgIHRoYXQuZGVidWcoJ2FkZCBhIHB1cmNoYXNlIGFjdGlvbi4gc3RlcCBpcyAnICsgc3RlcCArICcgYW5kIGFjdGlvbiBpcyAnICsgYWN0aW9uKTtcbiAgICAgICAgICAgICAgaWYgKHRoYXQub3B0aW9ucy5hbmFseXRpY3NfdHlwZSA9PSAnZ3RhZ2pzJykge1xuICAgICAgICAgICAgICAgIGd0YWcoJ2V2ZW50JywgYWN0aW9uLCB7XG4gICAgICAgICAgICAgICAgICBcInRyYW5zYWN0aW9uX2lkXCI6IG9wcF9pZCwgLy8gVHJhbnNhY3Rpb24gaWQgLSBUeXBlOiBzdHJpbmdcbiAgICAgICAgICAgICAgICAgIFwiYWZmaWxpYXRpb25cIjogJ01pbm5Qb3N0JywgLy8gU3RvcmUgbmFtZSAtIFR5cGU6IHN0cmluZ1xuICAgICAgICAgICAgICAgICAgXCJ2YWx1ZVwiOiB0aGF0LmdldFRvdGFsQW1vdW50KGFtb3VudCksIC8vIFRvdGFsIFJldmVudWUgLSBUeXBlOiBudW1lcmljXG4gICAgICAgICAgICAgICAgICBcImN1cnJlbmN5XCI6IFwiVVNEXCIsXG4gICAgICAgICAgICAgICAgICBcIml0ZW1zXCI6IFtwcm9kdWN0XSxcbiAgICAgICAgICAgICAgICAgIFwiY2hlY2tvdXRfc3RlcFwiOiBzdGVwXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhhdC5vcHRpb25zLmFuYWx5dGljc190eXBlID09ICdhbmFseXRpY3NqcycpIHtcbiAgICAgICAgICAgICAgICBnYSgnZWM6c2V0QWN0aW9uJywgYWN0aW9uLCB7XG4gICAgICAgICAgICAgICAgICAnaWQnOiBvcHBfaWQsIC8vIFRyYW5zYWN0aW9uIGlkIC0gVHlwZTogc3RyaW5nXG4gICAgICAgICAgICAgICAgICAnYWZmaWxpYXRpb24nOiAnTWlublBvc3QnLCAvLyBTdG9yZSBuYW1lIC0gVHlwZTogc3RyaW5nXG4gICAgICAgICAgICAgICAgICAncmV2ZW51ZSc6IGFtb3VudCwgLy8gVG90YWwgUmV2ZW51ZSAtIFR5cGU6IG51bWVyaWNcbiAgICAgICAgICAgICAgICAgICdzdGVwJzogc3RlcFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgIFxuICAgICAgICAgICAgaWYgKHRoYXQub3B0aW9ucy5hbmFseXRpY3NfdHlwZSA9PSAnZ3RhZ2pzJykge1xuICAgICAgICAgICAgICBndGFnKCdldmVudCcsICdwYWdlX3ZpZXcnLCB7XG4gICAgICAgICAgICAgICAgcGFnZV90aXRsZTogZG9jdW1lbnQudGl0bGUsXG4gICAgICAgICAgICAgICAgcGFnZV9wYXRoOiB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWVcbiAgICAgICAgICAgICAgfSkgICAgICAgICAgICAgIFxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGF0Lm9wdGlvbnMuYW5hbHl0aWNzX3R5cGUgPT0gJ2FuYWx5dGljc2pzJykge1xuICAgICAgICAgICAgICBnYSgnc2V0Jywge1xuICAgICAgICAgICAgICAgIHBhZ2U6IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSxcbiAgICAgICAgICAgICAgICB0aXRsZTogZG9jdW1lbnQudGl0bGVcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIGdhKCdzZW5kJywgJ3BhZ2V2aWV3Jywgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gZGF0YUxheWVyXG4gICAgICAgICAgICBpZiAoICd1bmRlZmluZWQnICE9PSB0eXBlb2YgZGF0YUxheWVyICkge1xuICAgICAgICAgICAgICBkYXRhTGF5ZXIucHVzaCh7IGVjb21tZXJjZTogbnVsbCB9KTsgLy8gZmlyc3QsIG1ha2Ugc3VyZSB0aGVyZSBhcmVuJ3QgbXVsdGlwbGUgdGhpbmdzIGhhcHBlbmluZy5cbiAgICAgICAgICAgICAgZGF0YUxheWVyLnB1c2goe1xuICAgICAgICAgICAgICAgIGV2ZW50OiBhY3Rpb24sXG4gICAgICAgICAgICAgICAgZWNvbW1lcmNlOiB7XG4gICAgICAgICAgICAgICAgICBpdGVtczogcHJvZHVjdFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBcblxuICAgIH0sIC8vIGFuYWx5dGljc1RyYWNraW5nU3RlcFxuXG4gICAgYW1vdW50QXNSYWRpbzogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgLy8gd2hlbiBhbW91bnQgZmllbGQgaXMgYSByYWRpbyBidXR0b24sIHdlIG5lZWQgdG8gY2hlY2sgaXQgd2hlbmV2ZXIgaXQgY2hhbmdlc1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdGhhdC5zZXRSYWRpb0Ftb3VudCgkKG9wdGlvbnMub3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yLCBlbGVtZW50KSwgZWxlbWVudCwgb3B0aW9ucyk7XG4gICAgICAkKG9wdGlvbnMub3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoYXQuc2V0UmFkaW9BbW91bnQoJCh0aGlzKSwgZWxlbWVudCwgb3B0aW9ucyk7XG4gICAgICB9KTtcbiAgICB9LCAvLyBhbW91bnRBc1JhZGlvXG5cbiAgICBzZXRSYWRpb0Ftb3VudDogZnVuY3Rpb24oZmllbGQsIGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHZhciBzdHJpcGVfcGF5bWVudF90eXBlID0gdGhhdC5nZXRTdHJpcGVQYXltZW50VHlwZSgpO1xuICAgICAgdmFyIGFtb3VudCA9ICQob3B0aW9ucy5vcmlnaW5hbF9hbW91bnRfc2VsZWN0b3IgKyAnOmNoZWNrZWQnLCBlbGVtZW50KS52YWwoKTtcbiAgICAgIGlmIChmaWVsZC5pcygnOnJhZGlvJykgJiYgdHlwZW9mIGFtb3VudCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgb3B0aW9ucy5vcmlnaW5hbF9hbW91bnQgPSBwYXJzZUludChhbW91bnQsIDEwKTtcbiAgICAgICAgdGhhdC5jYWxjdWxhdGVGZWVzKHRoYXQub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQsIHN0cmlwZV9wYXltZW50X3R5cGUpO1xuICAgICAgICB0aGF0LnNldEZhaXJNYXJrZXRWYWx1ZShmaWVsZCk7XG4gICAgICB9XG4gICAgfSwgLy8gc2V0UmFkaW9BbW91bnRcblxuICAgIGFtb3VudFVwZGF0ZWQ6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIC8vIHdoZW4gbmV3IGFtb3VudCB0ZXh0IGZpZWxkIGNhbiBjaGFuZ2UsIHdlIG5lZWQgdG8gY2hhbmdlIHRoZSBoaWRkZW4gZmllbGRcbiAgICAgIC8vIHRoZXJlIGlzIGFsc28gcG90ZW50aWFsbHkgYW4gYWRkaXRpb25hbCBhbW91bnQgZmllbGQgdmFsdWUgdG8gYWRkXG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB2YXIgc3RyaXBlX3BheW1lbnRfdHlwZSA9IHRoYXQuZ2V0U3RyaXBlUGF5bWVudFR5cGUoKTtcblxuICAgICAgLy8gc2V0IHRoZSBmYWlyIG1hcmtldCB2YWx1ZSBpZiBhcHBsaWNhYmxlXG4gICAgICB2YXIgYW1vdW50X3NlbGVjdG9yX2ZhaXJfbWFya2V0ID0gJChvcHRpb25zLm9yaWdpbmFsX2Ftb3VudF9zZWxlY3RvciwgZWxlbWVudCk7XG4gICAgICBpZiAoYW1vdW50X3NlbGVjdG9yX2ZhaXJfbWFya2V0LmlzKCc6cmFkaW8nKSkge1xuICAgICAgICBhbW91bnRfc2VsZWN0b3JfZmFpcl9tYXJrZXQgPSAkKG9wdGlvbnMub3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yICsgJzpjaGVja2VkJywgZWxlbWVudCk7XG4gICAgICB9XG4gICAgICB0aGF0LnNldEZhaXJNYXJrZXRWYWx1ZShhbW91bnRfc2VsZWN0b3JfZmFpcl9tYXJrZXQpO1xuXG4gICAgICAkKG9wdGlvbnMub3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoYXQub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQgPSBwYXJzZUludCgkKHRoaXMsIGVsZW1lbnQpLnZhbCgpLCAxMCk7XG4gICAgICAgIHRoYXQuY2FsY3VsYXRlRmVlcyh0aGF0Lm9wdGlvbnMub3JpZ2luYWxfYW1vdW50LCBzdHJpcGVfcGF5bWVudF90eXBlKTtcbiAgICAgICAgdGhhdC5zZXRGYWlyTWFya2V0VmFsdWUoJCh0aGlzLCBlbGVtZW50KSk7XG4gICAgICB9KTtcbiAgICAgICQob3B0aW9ucy5hZGRpdGlvbmFsX2Ftb3VudF9maWVsZCwgZWxlbWVudCkuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGF0Lm9wdGlvbnMub3JpZ2luYWxfYW1vdW50ID0gcGFyc2VJbnQoJChvcHRpb25zLm9yaWdpbmFsX2Ftb3VudF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksIDEwKTtcbiAgICAgICAgdGhhdC5jYWxjdWxhdGVGZWVzKHRoYXQub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQsIHN0cmlwZV9wYXltZW50X3R5cGUpO1xuICAgICAgfSk7XG4gICAgICAkKG9wdGlvbnMuZ2lmdF9kZWxpdmVyeV9tZXRob2Rfc2VsZWN0b3IsIGVsZW1lbnQpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgdGhhdC5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCA9IHBhcnNlSW50KCQob3B0aW9ucy5vcmlnaW5hbF9hbW91bnRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLCAxMCk7XG4gICAgICAgIHRoYXQuY2FsY3VsYXRlRmVlcyh0aGF0Lm9wdGlvbnMub3JpZ2luYWxfYW1vdW50LCBzdHJpcGVfcGF5bWVudF90eXBlKTtcbiAgICAgIH0pO1xuXG4gICAgfSwgLy8gYW1vdW50VXBkYXRlZFxuXG4gICAgZ2V0VG90YWxBbW91bnQ6IGZ1bmN0aW9uKGFtb3VudCkge1xuICAgICAgYW1vdW50ID0gKHR5cGVvZiBhbW91bnQgIT09ICd1bmRlZmluZWQnKSA/ICBhbW91bnQgOiB0aGlzLm9wdGlvbnMub3JpZ2luYWxfYW1vdW50O1xuICAgICAgdmFyIHRvdGFsX2Ftb3VudCA9IGFtb3VudDtcbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5hZGRpdGlvbmFsX2Ftb3VudF9maWVsZCkubGVuZ3RoID4gMCAmJiAkKHRoaXMub3B0aW9ucy5hZGRpdGlvbmFsX2Ftb3VudF9maWVsZCkudmFsKCkgPiAwKSB7XG4gICAgICAgIHZhciBhZGRpdGlvbmFsX2Ftb3VudCA9ICQodGhpcy5vcHRpb25zLmFkZGl0aW9uYWxfYW1vdW50X2ZpZWxkKS52YWwoKTtcbiAgICAgICAgdG90YWxfYW1vdW50ID0gcGFyc2VJbnQoYWRkaXRpb25hbF9hbW91bnQsIDEwKSArIHBhcnNlSW50KGFtb3VudCwgMTApOyBcbiAgICAgIH1cbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5zaGlwcGluZ19hbW91bnRfZmllbGQpLmxlbmd0aCA+IDAgJiYgJCh0aGlzLm9wdGlvbnMuc2hpcHBpbmdfYW1vdW50X2ZpZWxkKS52YWwoKSA+IDApIHtcbiAgICAgICAgdmFyIHNoaXBwaW5nX2Ftb3VudCA9ICQodGhpcy5vcHRpb25zLnNoaXBwaW5nX2Ftb3VudF9maWVsZCkudmFsKCk7XG4gICAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5naWZ0X2RlbGl2ZXJ5X21ldGhvZF9zZWxlY3RvciArICc6Y2hlY2tlZCcpLnZhbCgpID09PSAnc2hpcHBpbmcnKSB7XG4gICAgICAgICAgdG90YWxfYW1vdW50ID0gcGFyc2VJbnQoc2hpcHBpbmdfYW1vdW50LCAxMCkgKyBwYXJzZUludCh0b3RhbF9hbW91bnQsIDEwKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0b3RhbF9hbW91bnQgPSBwYXJzZUludCh0b3RhbF9hbW91bnQsIDEwKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHRvdGFsX2Ftb3VudDtcbiAgICB9LCAvLyBnZXRUb3RhbEFtb3VudFxuXG4gICAgc2V0RmFpck1hcmtldFZhbHVlOiBmdW5jdGlvbihhbW91bnRfc2VsZWN0b3IpIHtcbiAgICAgIC8vIGlmIHRoZXJlIGlzIGEgZmFpciBtYXJrZXQgdmFsdWUgZmllbGQgYW5kIHRoZXJlIGlzIGEgZmFpci1tYXJrZXQtdmFsdWUgZGF0YSBhdHRyaWJ1dGVcbiAgICAgIC8vIGNoZWNrIGFuZCBzZWUgaWYgd2UgY2FuIHBvcHVsYXRlIHRoZSBmaWVsZCB3aXRoIHRoZSBkYXRhIGF0dHJpYnV0ZVxuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmZhaXJfbWFya2V0X3ZhbHVlX3NlbGVjdG9yKS5sZW5ndGggPiAwICYmIHR5cGVvZiBhbW91bnRfc2VsZWN0b3IuZGF0YSgnZmFpci1tYXJrZXQtdmFsdWUnKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdmFyIGZhaXJNYXJrZXRWYWx1ZSA9IGFtb3VudF9zZWxlY3Rvci5kYXRhKCdmYWlyLW1hcmtldC12YWx1ZScpO1xuICAgICAgICAkKHRoaXMub3B0aW9ucy5mYWlyX21hcmtldF92YWx1ZV9zZWxlY3RvcikudmFsKGZhaXJNYXJrZXRWYWx1ZSk7XG4gICAgICB9XG4gICAgfSwgLy8gc2V0RmFpck1hcmtldFZhbHVlXG5cbiAgICBjYWxjdWxhdGVGZWVzOiBmdW5jdGlvbihhbW91bnQsIHN0cmlwZV9wYXltZW50X3R5cGUpIHtcbiAgICAgIC8vIHRoaXMgc2VuZHMgdGhlIGFtb3VudCBhbmQgc3RyaXBlIHBheW1lbnQgdHlwZSB0byBweXRob247IGdldCB0aGUgZmVlIGFuZCBkaXNwbGF5IGl0IHRvIHRoZSB1c2VyIG9uIHRoZSBjaGVja2JveCBsYWJlbFxuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdmFyIHRvdGFsX2Ftb3VudCA9IHRoYXQuZ2V0VG90YWxBbW91bnQoYW1vdW50KTtcbiAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICBhbW91bnQ6IHRvdGFsX2Ftb3VudCxcbiAgICAgICAgc3RyaXBlX3BheW1lbnRfdHlwZTogc3RyaXBlX3BheW1lbnRfdHlwZVxuICAgICAgfTtcbiAgICAgIHRoYXQuc2V0U3RyaXBlUGF5bWVudFR5cGUoc3RyaXBlX3BheW1lbnRfdHlwZSk7XG4gICAgICAkLmFqYXgoe1xuICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgdXJsOiAnL2NhbGN1bGF0ZS1mZWVzLycsXG4gICAgICAgIGRhdGE6IGRhdGFcbiAgICAgIH0pLmRvbmUoZnVuY3Rpb24oIGRhdGEgKSB7XG4gICAgICAgIGlmICgkKGRhdGEuZmVlcykubGVuZ3RoID4gMCkge1xuICAgICAgICAgICQodGhhdC5vcHRpb25zLmZlZV9hbW91bnQpLnRleHQocGFyc2VGbG9hdChkYXRhLmZlZXMpLnRvRml4ZWQoMikpO1xuICAgICAgICAgIHRoYXQuY3JlZGl0Q2FyZEZlZUNoZWNrYm94KCQodGhhdC5vcHRpb25zLnBheV9jY19wcm9jZXNzaW5nX3NlbGVjdG9yKSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sIC8vIGNhbGN1bGF0ZUZlZXNcblxuICAgIGNyZWRpdENhcmRQcm9jZXNzaW5nRmVlczogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgLy8gdGhpcyBhZGRzIG9yIHN1YnRyYWN0cyB0aGUgZmVlIHRvIHRoZSBvcmlnaW5hbCBhbW91bnQgd2hlbiB0aGUgdXNlciBpbmRpY2F0ZXMgdGhleSBkbyBvciBkbyBub3Qgd2FudCB0byBwYXkgdGhlIGZlZXNcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHRoYXQuY3JlZGl0Q2FyZEZlZUNoZWNrYm94KCQob3B0aW9ucy5wYXlfY2NfcHJvY2Vzc2luZ19zZWxlY3RvcikpO1xuICAgICAgJChvcHRpb25zLnBheV9jY19wcm9jZXNzaW5nX3NlbGVjdG9yKS5vbignY2hhbmdlJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHRoYXQuY3JlZGl0Q2FyZEZlZUNoZWNrYm94KHRoaXMpO1xuICAgICAgfSk7XG4gICAgfSwgLy8gY3JlZGl0Q2FyZFByb2Nlc3NpbmdGZWVzXG5cbiAgICBnZXRTdHJpcGVQYXltZW50VHlwZTogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgc3RyaXBlX3BheW1lbnRfdHlwZSA9ICdjYXJkJztcbiAgICAgIGlmICgkKCdpbnB1dFtuYW1lPVwic3RyaXBlX3BheW1lbnRfdHlwZVwiXScpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgc3RyaXBlX3BheW1lbnRfdHlwZSA9ICQoJ2lucHV0W25hbWU9XCJzdHJpcGVfcGF5bWVudF90eXBlXCJdJykudmFsKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gc3RyaXBlX3BheW1lbnRfdHlwZTtcbiAgICB9LCAvLyBnZXRTdHJpcGVQYXltZW50VHlwZVxuXG4gICAgc2V0U3RyaXBlUGF5bWVudFR5cGU6IGZ1bmN0aW9uKHN0cmlwZV9wYXltZW50X3R5cGUpIHtcbiAgICAgIGlmICgkKCdpbnB1dFtuYW1lPVwic3RyaXBlX3BheW1lbnRfdHlwZVwiXScpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAkKHRoaXMub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuYXBwZW5kKCc8aW5wdXQgdHlwZT1cXFwiaGlkZGVuXFxcIiBuYW1lPVxcXCJzdHJpcGVfcGF5bWVudF90eXBlXFxcIj4nKTtcbiAgICAgIH1cbiAgICAgICQoJ2lucHV0W25hbWU9XCJzdHJpcGVfcGF5bWVudF90eXBlXCJdJykudmFsKHN0cmlwZV9wYXltZW50X3R5cGUpO1xuICAgICAgcmV0dXJuIHN0cmlwZV9wYXltZW50X3R5cGU7XG4gICAgfSwgLy8gc2V0U3RyaXBlUGF5bWVudFR5cGVcblxuICAgIGNyZWRpdENhcmRGZWVDaGVja2JveDogZnVuY3Rpb24oZmllbGQpIHtcbiAgICAgIHZhciBmdWxsX2Ftb3VudDtcbiAgICAgIHZhciB0b3RhbF9hbW91bnQgPSB0aGlzLmdldFRvdGFsQW1vdW50KCk7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICBpZiAoJChmaWVsZCkuaXMoJzpjaGVja2VkJykgfHwgJChmaWVsZCkucHJvcCgnY2hlY2tlZCcpKSB7XG4gICAgICAgICQoJy5hbW91bnQgLmxldmVsLWFtb3VudCcpLmFkZENsYXNzKCdmdWxsLWFtb3VudCcpO1xuICAgICAgICBmdWxsX2Ftb3VudCA9ICh0b3RhbF9hbW91bnQgKyBwYXJzZUZsb2F0KCQodGhhdC5vcHRpb25zLmZlZV9hbW91bnQpLnRleHQoKSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZnVsbF9hbW91bnQgPSB0b3RhbF9hbW91bnQ7XG4gICAgICB9XG4gICAgICBmdWxsX2Ftb3VudCA9IHBhcnNlRmxvYXQoZnVsbF9hbW91bnQpLnRvRml4ZWQoMik7XG4gICAgICAkKHRoYXQub3B0aW9ucy5mdWxsX2Ftb3VudF9zZWxlY3RvcikudGV4dChmdWxsX2Ftb3VudCk7XG5cbiAgICAgIC8vIHVwZGF0ZSB0aGUgcGF5bWVudCByZXF1ZXN0XG4gICAgICBpZiAodGhpcy5wYXltZW50UmVxdWVzdCAmJiBmdWxsX2Ftb3VudCkge1xuICAgICAgICB0aGlzLnBheW1lbnRSZXF1ZXN0LnVwZGF0ZSh7XG4gICAgICAgICAgdG90YWw6IHtcbiAgICAgICAgICAgIGxhYmVsOiBcIk1pbm5Qb3N0XCIsXG4gICAgICAgICAgICBhbW91bnQ6IGZ1bGxfYW1vdW50ICogMTAwXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgIH0sIC8vIGNyZWRpdENhcmRGZWVDaGVja2JveFxuXG4gICAgZG9uYXRlQW5vbnltb3VzbHk6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHRoYXQudG9nZ2xlQW5vbnltb3VzKCQob3B0aW9ucy5hbm9ueW1vdXNfc2VsZWN0b3IsIGVsZW1lbnQpKTtcbiAgICAgICQob3B0aW9ucy5hbm9ueW1vdXNfc2VsZWN0b3IsIGVsZW1lbnQpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgdGhhdC50b2dnbGVBbm9ueW1vdXMoJCh0aGlzKSk7XG4gICAgICB9KTtcbiAgICB9LCAvLyBkb25hdGVBbm9ueW1vdXNseVxuXG4gICAgdG9nZ2xlQW5vbnltb3VzOiBmdW5jdGlvbihlbGVtZW50KSB7XG4gICAgICBpZiAoZWxlbWVudC5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICAkKHRoaXMub3B0aW9ucy5uYW1lX3NlbGVjdG9yICsgJyBkaXY6Zmlyc3QnLCB0aGlzLmVsZW1lbnQpLmhpZGUoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQodGhpcy5vcHRpb25zLm5hbWVfc2VsZWN0b3IgKyAnIGRpdjpmaXJzdCcsIHRoaXMuZWxlbWVudCkuc2hvdygpO1xuICAgICAgfVxuICAgIH0sIC8vIHRvZ2dsZUFub255bW91c1xuXG4gICAgaG9ub3JPck1lbW9yeTogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgaWYgKCQob3B0aW9ucy5ob25vcl9vcl9tZW1vcnlfY2hvb3NlciArICc6Y2hlY2tlZCcpLnZhbCgpKSB7XG4gICAgICAgICQob3B0aW9ucy5ob25vcl9tZW1vcnlfaW5wdXRfZ3JvdXAsIGVsZW1lbnQpLnNob3coKTtcbiAgICAgICAgJChvcHRpb25zLmhvbm9yX3R5cGVfc2VsZWN0b3IpLnRleHQoJChvcHRpb25zLmhvbm9yX29yX21lbW9yeV9jaG9vc2VyICsgJzpjaGVja2VkJykudmFsKCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJChvcHRpb25zLmhvbm9yX21lbW9yeV9pbnB1dF9ncm91cCwgZWxlbWVudCkuaGlkZSgpO1xuICAgICAgICAkKG9wdGlvbnMuaG9ub3JfbmFtZV9zZWxlY3RvciArICcgaW5wdXQnLCBlbGVtZW50KS52YWwoJycpO1xuICAgICAgfVxuICAgIH0sIC8vIGhvbm9yT3JNZW1vcnlcblxuICAgIGhvbm9yT3JNZW1vcnlUb2dnbGU6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHRoYXQuaG9ub3JPck1lbW9yeSh0aGF0LmVsZW1lbnQsIHRoYXQub3B0aW9ucyk7XG4gICAgICAkKG9wdGlvbnMuaG9ub3Jfb3JfbWVtb3J5X2Nob29zZXIsIGVsZW1lbnQpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgdGhhdC5ob25vck9yTWVtb3J5KHRoYXQuZWxlbWVudCwgdGhhdC5vcHRpb25zKTtcbiAgICAgIH0pO1xuICAgIH0sIC8vIGhvbm9yT3JNZW1vcnlUb2dnbGVcblxuICAgIG91dHNpZGVVbml0ZWRTdGF0ZXM6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICQob3B0aW9ucy5zaG93X2JpbGxpbmdfY291bnRyeV9zZWxlY3RvcikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoYXQuY2hhbmdlRmllbGRzT3V0c2lkZVVTKCdiaWxsaW5nJywgZWxlbWVudCwgb3B0aW9ucyk7XG4gICAgICAgICQodGhpcykucGFyZW50KCkuaGlkZSgpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9KTtcbiAgICAgICQob3B0aW9ucy5zaG93X3NoaXBwaW5nX2NvdW50cnlfc2VsZWN0b3IpLmNsaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAkKG9wdGlvbnMuc2hpcHBpbmdfY291bnRyeV9zZWxlY3Rvcikuc2hvdygpO1xuICAgICAgICB0aGF0LmNoYW5nZUZpZWxkc091dHNpZGVVUygnc2hpcHBpbmcnLCBlbGVtZW50LCBvcHRpb25zKTtcbiAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5oaWRlKCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuICAgIH0sIC8vIG91dHNpZGVVbml0ZWRTdGF0ZXNcblxuICAgIGNoYW5nZUZpZWxkc091dHNpZGVVUzogZnVuY3Rpb24oYmlsbGluZ19vcl9zaGlwcGluZywgZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgaWYgKCBiaWxsaW5nX29yX3NoaXBwaW5nID09PSAnYmlsbGluZycgKSB7XG4gICAgICAgIHZhciB6aXBfcGFyZW50ID0gJChvcHRpb25zLmJpbGxpbmdfemlwX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKTtcbiAgICAgICAgdmFyIHN0YXRlX3BhcmVudCA9ICQob3B0aW9ucy5iaWxsaW5nX3N0YXRlX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKTtcbiAgICAgICAgJChvcHRpb25zLmJpbGxpbmdfY291bnRyeV9zZWxlY3Rvcikuc2hvdygpO1xuICAgICAgICAkKG9wdGlvbnMuYmlsbGluZ196aXBfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLmF0dHIoJ3R5cGUnLCAndGV4dCcpO1xuICAgICAgICAkKG9wdGlvbnMuYmlsbGluZ196aXBfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuICAgICAgICAkKG9wdGlvbnMuYmlsbGluZ19zdGF0ZV9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICAgICQoJ2xhYmVsJywgemlwX3BhcmVudCkudGV4dCgnUG9zdGFsIENvZGU6Jyk7XG4gICAgICAgICQoJ2xhYmVsJywgc3RhdGVfcGFyZW50KS50ZXh0KCdSZWdpb246Jyk7XG4gICAgICB9IGVsc2UgaWYgKCBiaWxsaW5nX29yX3NoaXBwaW5nID09PSAnc2hpcHBpbmcnICkge1xuICAgICAgICB2YXIgemlwX3BhcmVudCA9ICQob3B0aW9ucy5zaGlwcGluZ196aXBfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpO1xuICAgICAgICB2YXIgc3RhdGVfcGFyZW50ID0gJChvcHRpb25zLnNoaXBwaW5nX3N0YXRlX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKTtcbiAgICAgICAgJChvcHRpb25zLnNoaXBwaW5nX2NvdW50cnlfc2VsZWN0b3IpLnNob3coKTtcbiAgICAgICAgJChvcHRpb25zLnNoaXBwaW5nX3ppcF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkuYXR0cigndHlwZScsICd0ZXh0Jyk7XG4gICAgICAgICQob3B0aW9ucy5zaGlwcGluZ196aXBfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuICAgICAgICAkKG9wdGlvbnMuc2hpcHBpbmdfc3RhdGVfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnByb3AoJ3JlcXVpcmVkJywgZmFsc2UpO1xuICAgICAgICAkKCdsYWJlbCcsIHppcF9wYXJlbnQpLnRleHQoJ1NoaXBwaW5nIFBvc3RhbCBDb2RlOicpO1xuICAgICAgICAkKCdsYWJlbCcsIHN0YXRlX3BhcmVudCkudGV4dCgnU2hpcHBpbmcgUmVnaW9uOicpO1xuICAgICAgfVxuICAgIH0sIC8vIGNoYW5nZUZpZWxkc091dHNpZGVVU1xuXG4gICAgY2hhbmdlRmllbGRzSW5zaWRlVVM6IGZ1bmN0aW9uKGJpbGxpbmdfb3Jfc2hpcHBpbmcsIGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIGlmICggYmlsbGluZ19vcl9zaGlwcGluZyA9PT0gJ2JpbGxpbmcnICkge1xuICAgICAgICB2YXIgemlwX3BhcmVudCA9ICQob3B0aW9ucy5iaWxsaW5nX3ppcF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkucGFyZW50KCk7XG4gICAgICAgIHZhciBzdGF0ZV9wYXJlbnQgPSAkKG9wdGlvbnMuYmlsbGluZ19zdGF0ZV9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkucGFyZW50KCk7XG4gICAgICAgICQob3B0aW9ucy5iaWxsaW5nX2NvdW50cnlfc2VsZWN0b3IpLnNob3coKTtcbiAgICAgICAgJChvcHRpb25zLmJpbGxpbmdfemlwX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5hdHRyKCd0eXBlJywgJ3RlbCcpO1xuICAgICAgICAkKG9wdGlvbnMuYmlsbGluZ196aXBfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnByb3AoJ3JlcXVpcmVkJywgdHJ1ZSk7XG4gICAgICAgICQob3B0aW9ucy5iaWxsaW5nX3N0YXRlX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5wcm9wKCdyZXF1aXJlZCcsIHRydWUpO1xuICAgICAgICAkKCdsYWJlbCcsIHppcF9wYXJlbnQpLmh0bWwoJ1ppcCBDb2RlOiA8c3BhbiBjbGFzcz1cImEtZm9ybS1pdGVtLXJlcXVpcmVkXCIgdGl0bGU9XCJUaGlzIGZpZWxkIGlzIHJlcXVpcmVkLlwiPio8L3NwYW4+Jyk7XG4gICAgICAgICQoJ2xhYmVsJywgc3RhdGVfcGFyZW50KS5odG1sKCdTdGF0ZTogPHNwYW4gY2xhc3M9XCJhLWZvcm0taXRlbS1yZXF1aXJlZFwiIHRpdGxlPVwiVGhpcyBmaWVsZCBpcyByZXF1aXJlZC5cIj4qPC9zcGFuPicpO1xuICAgICAgfSBlbHNlIGlmICggYmlsbGluZ19vcl9zaGlwcGluZyA9PT0gJ3NoaXBwaW5nJyApIHtcbiAgICAgICAgdmFyIHppcF9wYXJlbnQgPSAkKG9wdGlvbnMuc2hpcHBpbmdfemlwX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKTtcbiAgICAgICAgdmFyIHN0YXRlX3BhcmVudCA9ICQob3B0aW9ucy5zaGlwcGluZ19zdGF0ZV9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkucGFyZW50KCk7XG4gICAgICAgICQob3B0aW9ucy5zaGlwcGluZ19jb3VudHJ5X3NlbGVjdG9yKS5zaG93KCk7XG4gICAgICAgICQob3B0aW9ucy5zaGlwcGluZ196aXBfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLmF0dHIoJ3R5cGUnLCAndGVsJyk7XG4gICAgICAgICQob3B0aW9ucy5zaGlwcGluZ196aXBfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnByb3AoJ3JlcXVpcmVkJywgdHJ1ZSk7XG4gICAgICAgICQob3B0aW9ucy5zaGlwcGluZ19zdGF0ZV9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkucHJvcCgncmVxdWlyZWQnLCB0cnVlKTtcbiAgICAgICAgJCgnbGFiZWwnLCB6aXBfcGFyZW50KS5odG1sKCdTaGlwcGluZyBaaXAgQ29kZTogPHNwYW4gY2xhc3M9XCJhLWZvcm0taXRlbS1yZXF1aXJlZFwiIHRpdGxlPVwiVGhpcyBmaWVsZCBpcyByZXF1aXJlZC5cIj4qPC9zcGFuPicpO1xuICAgICAgICAkKCdsYWJlbCcsIHN0YXRlX3BhcmVudCkuaHRtbCgnU2hpcHBpbmcgU3RhdGU6IDxzcGFuIGNsYXNzPVwiYS1mb3JtLWl0ZW0tcmVxdWlyZWRcIiB0aXRsZT1cIlRoaXMgZmllbGQgaXMgcmVxdWlyZWQuXCI+Kjwvc3Bhbj4nKTtcbiAgICAgIH1cbiAgICB9LCAvLyBjaGFuZ2VGaWVsZHNPdXRzaWRlVVNcblxuICAgIHNoaXBwaW5nQWRkcmVzczogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdmFyIHNob3dfc2hpcHBpbmcgPSBmYWxzZTtcbiAgICAgIGlmICgkKG9wdGlvbnMudXNlX2Zvcl9zaGlwcGluZ19zZWxlY3RvcikubGVuZ3RoID4gMCkgeyAvLyB3ZSBoYXZlIGEgc2hpcHBpbmcgY2hlY2tib3hcbiAgICAgICAgc2hvd19zaGlwcGluZyA9IHRydWU7XG4gICAgICB9XG4gICAgICBpZiAoc2hvd19zaGlwcGluZyA9PT0gdHJ1ZSApIHtcbiAgICAgICAgJChvcHRpb25zLnVzZV9mb3Jfc2hpcHBpbmdfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpLnNob3coKTtcbiAgICAgICAgaWYgKCQob3B0aW9ucy51c2VfZm9yX3NoaXBwaW5nX3NlbGVjdG9yLCBlbGVtZW50KS5pcygnOmNoZWNrZWQnKSkgeyAvLyB1c2Ugc2FtZSBhcyBiaWxsaW5nXG4gICAgICAgICAgJChvcHRpb25zLnNoaXBwaW5nX3NlbGVjdG9yKS5oaWRlKCk7XG4gICAgICAgIH0gZWxzZSB7IC8vIHNlcGFyYXRlIHNoaXBwaW5nIGFuZCBiaWxsaW5nXG4gICAgICAgICAgJChvcHRpb25zLnNoaXBwaW5nX3NlbGVjdG9yKS5zaG93KCk7XG4gICAgICAgIH1cbiAgICAgICAgJChvcHRpb25zLnVzZV9mb3Jfc2hpcHBpbmdfc2VsZWN0b3IsIGVsZW1lbnQpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgICB0aGF0LnNoaXBwaW5nQWRkcmVzcyhlbGVtZW50LCBvcHRpb25zKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBcbiAgICB9LCAvLyBzaGlwcGluZ0FkZHJlc3NcblxuICAgIGFsbG93TWlubnBvc3RBY2NvdW50OiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB2YXIgYWNjb3VudF9leGlzdHMgPSBmYWxzZTtcblxuICAgICAgLy8gc2hvdyBwYXNzd29yZCBhcyB0ZXh0XG4gICAgICB0aGF0LnNob3dQYXNzd29yZCgpO1xuXG4gICAgICAvLyBjYWxjdWxhdGUgcGFzc3dvcmQgc3RyZW5ndGhcbiAgICAgIHRoYXQuc2hvd1Bhc3N3b3JkU3RyZW5ndGgoKTtcbiAgICAgIFxuICAgICAgdGhhdC5zcGFtRW1haWwoJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KSk7XG4gICAgICAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgdGhhdC5zcGFtRW1haWwoJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KSk7XG4gICAgICB9KTtcblxuICAgICAgdGhhdC50b2dnbGVBY2NvdW50RmllbGRzKCQob3B0aW9ucy5jcmVhdGVfbXBfc2VsZWN0b3IsIGVsZW1lbnQpKTtcbiAgICAgICQob3B0aW9ucy5jcmVhdGVfbXBfc2VsZWN0b3IsIGVsZW1lbnQpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgdGhhdC50b2dnbGVBY2NvdW50RmllbGRzKCQob3B0aW9ucy5jcmVhdGVfbXBfc2VsZWN0b3IsIGVsZW1lbnQpKTtcbiAgICAgIH0pO1xuXG4gICAgICBmdW5jdGlvbiBkb25lVHlwaW5nICgpIHtcbiAgICAgICAgdmFyIGVtYWlsID0gJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKTtcbiAgICAgICAgYWNjb3VudF9leGlzdHMgPSB0aGF0LmNoZWNrTWlubnBvc3RBY2NvdW50KGVsZW1lbnQsIG9wdGlvbnMsIGVtYWlsKTtcbiAgICAgIH1cblxuICAgICAgLy9zZXR1cCBiZWZvcmUgZnVuY3Rpb25zXG4gICAgICB2YXIgdHlwaW5nVGltZXI7ICAgICAgICAgICAgICAgIC8vdGltZXIgaWRlbnRpZmllclxuICAgICAgdmFyIGRvbmVUeXBpbmdJbnRlcnZhbCA9IDUwMDA7ICAvL3RpbWUgaW4gbXMsIDUgc2Vjb25kIGZvciBleGFtcGxlXG5cbiAgICAgIC8vb24ga2V5dXAsIHN0YXJ0IHRoZSBjb3VudGRvd25cbiAgICAgICQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkua2V5dXAoZnVuY3Rpb24oKXtcbiAgICAgICAgY2xlYXJUaW1lb3V0KHR5cGluZ1RpbWVyKTtcbiAgICAgICAgaWYgKCQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKSB7XG4gICAgICAgICAgdHlwaW5nVGltZXIgPSBzZXRUaW1lb3V0KGRvbmVUeXBpbmcsIGRvbmVUeXBpbmdJbnRlcnZhbCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sIC8vIGFsbG93TWlubnBvc3RBY2NvdW50XG5cbiAgICBzcGFtRW1haWw6IGZ1bmN0aW9uKGVtYWlsX2ZpZWxkKSB7XG4gICAgICB2YXIgc3BhbUVycm9yQ29udGFpbmVyID0gZW1haWxfZmllbGQucGFyZW50KCk7XG4gICAgICBpZiAoJCgnLmEtc3BhbS1lbWFpbCcsIHNwYW1FcnJvckNvbnRhaW5lcikubGVuZ3RoID09PSAwICkge1xuICAgICAgICBzcGFtRXJyb3JDb250YWluZXIuYXBwZW5kKCc8cCBjbGFzcz1cImEtZm9ybS1jYXB0aW9uIGEtdmFsaWRhdGlvbi1lcnJvciBhLXNwYW0tZW1haWxcIj5UaGlzIGVtYWlsIGFkZHJlc3MgaGFzIGJlZW4gZGV0ZWN0ZWQgYXMgYSBzcGFtbWVyLjwvcD4nKTtcbiAgICAgIH1cbiAgICAgICQoJy5hLXNwYW0tZW1haWwnLCBzcGFtRXJyb3JDb250YWluZXIpLmhpZGUoKTtcbiAgICAgIHNwYW1FcnJvckNvbnRhaW5lci5yZW1vdmVDbGFzcygnaW52YWxpZCBhLWVycm9yJyk7XG4gICAgfSwgLy8gc3BhbUVtYWlsXG5cbiAgICB0b2dnbGVBY2NvdW50RmllbGRzOiBmdW5jdGlvbihjcmVhdGVfYWNjb3VudF9zZWxlY3Rvcikge1xuICAgICAgaWYgKGNyZWF0ZV9hY2NvdW50X3NlbGVjdG9yLmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgIGNyZWF0ZV9hY2NvdW50X3NlbGVjdG9yLnBhcmVudCgpLmJlZm9yZSgnPHAgY2xhc3M9XCJhLWZvcm0tY2FwdGlvbiBhLWFjY291bnQtZXhpc3RzIGEtYWNjb3VudC1leGlzdHMtc3VjY2Vzc1wiPlRoZXJlIGlzIGFscmVhZHkgYSBNaW5uUG9zdC5jb20gYWNjb3VudCB3aXRoIHRoaXMgZW1haWwgYWRkcmVzcy48L3A+Jyk7XG4gICAgICAgICQoJy5hLWFjY291bnQtZXhpc3RzJykuaGlkZSgpO1xuICAgICAgICAkKHRoaXMub3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgdGhpcy5lbGVtZW50KS5zaG93KCk7XG4gICAgICAgIHRoaXMub3B0aW9ucy5jcmVhdGVfYWNjb3VudCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkKHRoaXMub3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgdGhpcy5lbGVtZW50KS5oaWRlKCk7XG4gICAgICB9XG4gICAgfSwgLy8gdG9nZ2xlQWNjb3VudEZpZWxkc1xuXG4gICAgc2hvd1Bhc3N3b3JkOiBmdW5jdGlvbigpIHtcbiAgICAgIC8vIENhY2hlIG91ciBqcXVlcnkgZWxlbWVudHNcbiAgICAgIHZhciAkc3VibWl0ID0gJCgnLmJ0bi1zdWJtaXQnKTtcbiAgICAgIHZhciAkY29udGFpbmVyID0gJCh0aGlzLm9wdGlvbnMucGFzc3dvcmRfc2VsZWN0b3IsIHRoaXMuZWxlbWVudCk7XG4gICAgICB2YXIgJGZpZWxkID0gJCgnaW5wdXRbbmFtZT1cInBhc3N3b3JkXCJdJywgJGNvbnRhaW5lcik7XG4gICAgICAkKCcuYS1hY2NvdW50LWV4aXN0cycpLmhpZGUoKTtcbiAgICAgIHZhciBzaG93X3Bhc3MgPSAnPGRpdiBjbGFzcz1cImEtZm9ybS1zaG93LXBhc3N3b3JkIGEtZm9ybS1jYXB0aW9uXCI+PGxhYmVsPjxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBuYW1lPVwic2hvd19wYXNzd29yZFwiIGlkPVwic2hvdy1wYXNzd29yZC1jaGVja2JveFwiIHZhbHVlPVwiMVwiPiBTaG93IHBhc3N3b3JkPC9sYWJlbD48L2Rpdj4nO1xuICAgICAgLy8gSW5qZWN0IHRoZSB0b2dnbGUgYnV0dG9uIGludG8gdGhlIHBhZ2VcbiAgICAgICRjb250YWluZXIuYXBwZW5kKCBzaG93X3Bhc3MgKTtcbiAgICAgIC8vIENhY2hlIHRoZSB0b2dnbGUgYnV0dG9uXG4gICAgICB2YXIgJHRvZ2dsZSA9ICQoJyNzaG93LXBhc3N3b3JkLWNoZWNrYm94Jyk7XG4gICAgICAvLyBUb2dnbGUgdGhlIGZpZWxkIHR5cGVcbiAgICAgICR0b2dnbGUub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICB2YXIgY2hlY2tib3ggPSAkKHRoaXMpO1xuICAgICAgICBpZiAoY2hlY2tib3guaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgICAkZmllbGQuYXR0cigndHlwZScsICd0ZXh0Jyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJGZpZWxkLmF0dHIoJ3R5cGUnLCAncGFzc3dvcmQnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICAvLyBTZXQgdGhlIGZvcm0gZmllbGQgYmFjayB0byBhIHJlZ3VsYXIgcGFzc3dvcmQgZWxlbWVudFxuICAgICAgJHN1Ym1pdC5vbiggJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xuICAgICAgICAkZmllbGQuYXR0cigndHlwZScsICdwYXNzd29yZCcpO1xuICAgICAgfSk7XG4gICAgfSxcblxuICAgIHNob3dQYXNzd29yZFN0cmVuZ3RoOiBmdW5jdGlvbigpIHtcbiAgICAgIC8vIGNoZWNrUGFzc3dvcmRTdHJlbmd0aFxuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgaWYgKCQoJy5hLXBhc3N3b3JkLXN0cmVuZ3RoJykubGVuZ3RoID4gMCApIHtcbiAgICAgICAgdmFyICRiZWZvcmUgPSAkKCcuYS1mb3JtLXNob3ctcGFzc3dvcmQnKTtcbiAgICAgICAgJGJlZm9yZS5hZnRlciggJCgnPGRpdiBjbGFzcz1cImEtcGFzc3dvcmQtc3RyZW5ndGhcIj48bWV0ZXIgbWF4PVwiNFwiIGlkPVwicGFzc3dvcmQtc3RyZW5ndGhcIj48ZGl2PjwvZGl2PjwvbWV0ZXI+PHAgY2xhc3M9XCJhLWZvcm0tY2FwdGlvblwiIGlkPVwicGFzc3dvcmQtc3RyZW5ndGgtdGV4dFwiPjwvcD48L2Rpdj4nKSk7XG4gICAgICAgICQoICdib2R5JyApLm9uKCAna2V5dXAnLCAnaW5wdXRbbmFtZT1wYXNzd29yZF0nLFxuICAgICAgICAgIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGhhdC5jaGVja1Bhc3N3b3JkU3RyZW5ndGgoXG4gICAgICAgICAgICAgICQoJ2lucHV0W25hbWU9cGFzc3dvcmRdJyksIC8vIFBhc3N3b3JkIGZpZWxkXG4gICAgICAgICAgICAgICQoJyNwYXNzd29yZC1zdHJlbmd0aCcpLCAgICAgICAgICAgLy8gU3RyZW5ndGggbWV0ZXJcbiAgICAgICAgICAgICAgJCgnI3Bhc3N3b3JkLXN0cmVuZ3RoLXRleHQnKSAgICAgIC8vIFN0cmVuZ3RoIHRleHQgaW5kaWNhdG9yXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9LCAvLyBzaG93UGFzc3dvcmRTdHJlbmd0aFxuXG4gICAgY2hlY2tQYXNzd29yZFN0cmVuZ3RoOiBmdW5jdGlvbiggJHBhc3N3b3JkLCAkc3RyZW5ndGhNZXRlciwgJHN0cmVuZ3RoVGV4dCApIHtcbiAgICAgIHZhciBwYXNzd29yZCA9ICRwYXNzd29yZC52YWwoKTtcbiAgICAgIC8vIEdldCB0aGUgcGFzc3dvcmQgc3RyZW5ndGhcbiAgICAgIHZhciByZXN1bHQgPSB6eGN2Ym4ocGFzc3dvcmQpO1xuICAgICAgdmFyIHN0cmVuZ3RoID0gcmVzdWx0LnNjb3JlO1xuXG4gICAgICAkc3RyZW5ndGhUZXh0LnJlbW92ZUNsYXNzKCAnc2hvcnQgYmFkIGdvb2Qgc3Ryb25nJyApO1xuXG4gICAgICAvLyBBZGQgdGhlIHN0cmVuZ3RoIG1ldGVyIHJlc3VsdHNcbiAgICAgIHN3aXRjaCAoIHN0cmVuZ3RoICkge1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgJHN0cmVuZ3RoVGV4dC5hZGRDbGFzcyggJ2JhZCcgKS5odG1sKCAnU3RyZW5ndGg6IDxzdHJvbmc+V2Vhazwvc3Ryb25nPicgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICRzdHJlbmd0aFRleHQuYWRkQ2xhc3MoICdnb29kJyApLmh0bWwoICdTdHJlbmd0aDogPHN0cm9uZz5NZWRpdW08L3N0cm9uZz4nICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAkc3RyZW5ndGhUZXh0LmFkZENsYXNzKCAnc3Ryb25nJyApLmh0bWwoICdTdHJlbmd0aDogPHN0cm9uZz5TdHJvbmc8L3N0cm9uZz4nICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAkc3RyZW5ndGhUZXh0LmFkZENsYXNzKCAnc2hvcnQnICkuaHRtbCggJ1N0cmVuZ3RoOiA8c3Ryb25nPlZlcnkgd2Vhazwvc3Ryb25nPicgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAkc3RyZW5ndGhUZXh0LmFkZENsYXNzKCAnc2hvcnQnICkuaHRtbCggJ1N0cmVuZ3RoOiA8c3Ryb25nPlZlcnkgd2Vhazwvc3Ryb25nPicgKTtcbiAgICAgIH1cbiAgICAgICRzdHJlbmd0aE1ldGVyLnZhbChzdHJlbmd0aCk7XG4gICAgICByZXR1cm4gc3RyZW5ndGg7XG4gICAgfSwgLy8gY2hlY2tQYXNzd29yZFN0cmVuZ3RoXG5cbiAgICBjaGVja01pbm5wb3N0QWNjb3VudDogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucywgZW1haWwpIHtcbiAgICAgIHZhciB1c2VyID0ge1xuICAgICAgICBlbWFpbDogZW1haWxcbiAgICAgIH07XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAkLmFqYXgoe1xuICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICB1cmw6IG9wdGlvbnMubWlubnBvc3Rfcm9vdCArICcvd3AtanNvbi91c2VyLWFjY291bnQtbWFuYWdlbWVudC92MS9jaGVjay1hY2NvdW50JyxcbiAgICAgICAgZGF0YTogdXNlclxuICAgICAgfSkuZG9uZShmdW5jdGlvbiggcmVzdWx0ICkge1xuICAgICAgICBpZiAocmVzdWx0LnN0YXR1cyA9PT0gJ3N1Y2Nlc3MnICYmIHJlc3VsdC5yZWFzb24gPT09ICd1c2VyIGV4aXN0cycpIHsgLy8gdXNlciBleGlzdHNcbiAgICAgICAgICBpZiAoJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgICAgICQob3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgZWxlbWVudCkuaGlkZSgpO1xuICAgICAgICAgICAgJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkucGFyZW50KCkuaGlkZSgpO1xuICAgICAgICAgICAgJCgnLmEtYWNjb3VudC1leGlzdHMnLCBlbGVtZW50KS5zaG93KCk7XG4gICAgICAgICAgfVxuICAgICAgICAgICQob3B0aW9ucy5jcmVhdGVfbXBfc2VsZWN0b3IsIGVsZW1lbnQpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICgkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KS5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICAgICAgICAkKG9wdGlvbnMucGFzc3dvcmRfc2VsZWN0b3IsIGVsZW1lbnQpLmhpZGUoKTtcbiAgICAgICAgICAgICAgJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkucGFyZW50KCkuaGlkZSgpO1xuICAgICAgICAgICAgICAkKCcuYS1hY2NvdW50LWV4aXN0cycsIGVsZW1lbnQpLnNob3coKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmICggcmVzdWx0LnN0YXR1cyA9PT0gJ3NwYW0nICkge1xuICAgICAgICAgICQodGhhdC5vcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yKS5hZGRDbGFzcygnaW52YWxpZCBhLWVycm9yJyk7XG4gICAgICAgICAgJCggJy5hLXNwYW0tZW1haWwnKS5zaG93KCk7XG4gICAgICAgIH0gZWxzZSB7IC8vIHVzZXIgZG9lcyBub3QgZXhpc3Qgb3IgYWpheCBjYWxsIGZhaWxlZFxuICAgICAgICAgIGlmICgkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KS5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICAgICAgJChvcHRpb25zLnBhc3N3b3JkX3NlbGVjdG9yLCBlbGVtZW50KS5zaG93KCk7XG4gICAgICAgICAgICBvcHRpb25zLmNyZWF0ZV9hY2NvdW50ID0gdHJ1ZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJChvcHRpb25zLnBhc3N3b3JkX3NlbGVjdG9yLCBlbGVtZW50KS5oaWRlKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgICQoJy5hLWFjY291bnQtZXhpc3RzJywgZWxlbWVudCkuaGlkZSgpO1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSwgLy8gY2hlY2tNaW5ucG9zdEFjY291bnRcblxuICAgIHBheW1lbnRSZXF1ZXN0QnV0dG9uOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB2YXIgdG90YWxfYW1vdW50ID0gdGhhdC5nZXRUb3RhbEFtb3VudCgpO1xuICAgICAgdGhhdC5wYXltZW50UmVxdWVzdCA9IHRoYXQuc3RyaXBlLnBheW1lbnRSZXF1ZXN0KHtcbiAgICAgICAgY291bnRyeTogJ1VTJyxcbiAgICAgICAgY3VycmVuY3k6ICd1c2QnLFxuICAgICAgICB0b3RhbDoge1xuICAgICAgICAgIGxhYmVsOiAnTWlublBvc3QnLFxuICAgICAgICAgIGFtb3VudDogdG90YWxfYW1vdW50ICogMTAwLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgICB0aGF0LnByQnV0dG9uID0gdGhhdC5lbGVtZW50cy5jcmVhdGUoJ3BheW1lbnRSZXF1ZXN0QnV0dG9uJywge1xuICAgICAgICBwYXltZW50UmVxdWVzdDogdGhhdC5wYXltZW50UmVxdWVzdCxcbiAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICBwYXltZW50UmVxdWVzdEJ1dHRvbjoge1xuICAgICAgICAgICAgdHlwZTogJ2RvbmF0ZScsXG4gICAgICAgICAgICAvLyBPbmUgb2YgJ2RlZmF1bHQnLCAnYm9vaycsICdidXknLCBvciAnZG9uYXRlJ1xuICAgICAgICAgICAgLy8gRGVmYXVsdHMgdG8gJ2RlZmF1bHQnXG4gICAgICBcbiAgICAgICAgICAgIHRoZW1lOiAnZGFyaycsXG4gICAgICAgICAgICAvLyBPbmUgb2YgJ2RhcmsnLCAnbGlnaHQnLCBvciAnbGlnaHQtb3V0bGluZSdcbiAgICAgICAgICAgIC8vIERlZmF1bHRzIHRvICdkYXJrJ1xuICAgICAgXG4gICAgICAgICAgICBoZWlnaHQ6ICc0OHB4J1xuICAgICAgICAgICAgLy8gRGVmYXVsdHMgdG8gJzQwcHgnLiBUaGUgd2lkdGggaXMgYWx3YXlzICcxMDAlJy5cbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgICBcbiAgICAgIC8vIENoZWNrIHRoZSBhdmFpbGFiaWxpdHkgb2YgdGhlIFBheW1lbnQgUmVxdWVzdCBBUEkgZmlyc3QuXG4gICAgICB0aGF0LnBheW1lbnRSZXF1ZXN0LmNhbk1ha2VQYXltZW50KCkudGhlbihmdW5jdGlvbihyZXN1bHQpIHtcbiAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgICQoJy5tLXBheS13aXRob3V0LXBheW1lbnQtcmVxdWVzdCcpLmhpZGUoKTtcbiAgICAgICAgICB0aGF0LnByQnV0dG9uLm1vdW50KCcjcGF5bWVudC1yZXF1ZXN0LWJ1dHRvbicpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoYXQuaGlkZVBheW1lbnRSZXF1ZXN0KCAkKCcuby1wYXktd2l0aC1wYXltZW50LXJlcXVlc3QnKSApO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgJCgnLmRlY2xpbmUtYXBwbGUtcGF5IGEnKS5jbGljayhmdW5jdGlvbihldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB0aGF0LmhpZGVQYXltZW50UmVxdWVzdCggJCgnLm8tcGF5LXdpdGgtcGF5bWVudC1yZXF1ZXN0IC5tLWZvcm0tYWN0aW9ucy1wYXktZmVlcycpICk7XG4gICAgICB9KTtcblxuICAgICAgdGhhdC5wckJ1dHRvbi5vbignY2xpY2snLCBmdW5jdGlvbihldmVudCkge1xuXG4gICAgICAgIC8vIFNlbmQgcGF5bWVudE1ldGhvZC5pZCB0byBzZXJ2ZXJcbiAgICAgICAgdmFyIHN1cHBvcnRmb3JtID0gJCh0aGF0Lm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpO1xuXG4gICAgICAgIC8vIGNoZWNrIHZhbGlkYXRpb24gb2YgZm9ybVxuICAgICAgICBpZiAoIXN1cHBvcnRmb3JtLmdldCgwKS5yZXBvcnRWYWxpZGl0eSgpKSB7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICB0aGF0LnBheW1lbnRSZXF1ZXN0Lm9uKCdwYXltZW50bWV0aG9kJywgZnVuY3Rpb24oZXZlbnQpIHtcblxuICAgICAgICAvLyBTZW5kIHBheW1lbnRNZXRob2QuaWQgdG8gc2VydmVyXG4gICAgICAgIHZhciBzdXBwb3J0Zm9ybSA9ICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKTtcbiAgICAgICAgdmFyIHRva2VuRmllbGROYW1lID0gJ3BheW1lbnRfbWV0aG9kX2lkJztcbiAgICAgICAgdmFyIHRva2VuRmllbGQgPSAnaW5wdXRbbmFtZT1cIicgKyB0b2tlbkZpZWxkTmFtZSArICdcIl0nO1xuXG4gICAgICAgIC8vIEluc2VydCB0aGUgcGF5bWVudCBtZXRob2QgSUQgaW50byB0aGUgZm9ybSBzbyBpdCBnZXRzIHN1Ym1pdHRlZCB0byB0aGUgc2VydmVyXG4gICAgICAgIGlmICgkKHRva2VuRmllbGQpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAkKHRva2VuRmllbGQpLnZhbChldmVudC5wYXltZW50TWV0aG9kLmlkKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdXBwb3J0Zm9ybS5hcHBlbmQoJCgnPGlucHV0IHR5cGU9XFxcImhpZGRlblxcXCIgbmFtZT1cIicgKyB0b2tlbkZpZWxkTmFtZSArICdcIj4nKS52YWwoZXZlbnQucGF5bWVudE1ldGhvZC5pZCkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhhdC5mb3JtUHJvY2Vzc29yKHRoYXQsICdwYXltZW50UmVxdWVzdCcpO1xuXG4gICAgICB9KTtcblxuICAgIH0sIC8vIHBheW1lbnRSZXF1ZXN0QnV0dG9uXG5cbiAgICBoaWRlUGF5bWVudFJlcXVlc3Q6IGZ1bmN0aW9uKCBoaWRlRWxlbWVudCApIHtcbiAgICAgIGhpZGVFbGVtZW50LmhpZGUoKTtcbiAgICAgICQoJy5kZWNsaW5lLWFwcGxlLXBheSBhJykuaGlkZSgpO1xuICAgICAgJCgnLm0tcGF5LXdpdGhvdXQtcGF5bWVudC1yZXF1ZXN0Jykuc2hvdygpO1xuICAgICAgJCgnLmEtZy1yZWNhcHRjaGEnKS5pbnNlcnRBZnRlcignLm0tcGF5LXdpdGhvdXQtcGF5bWVudC1yZXF1ZXN0IC5tLWZvcm0tYWN0aW9ucy1wYXktZmVlcycpO1xuICAgIH0sIC8vIGhpZGVQYXltZW50UmVxdWVzdFxuXG4gICAgY2hvb3NlUGF5bWVudE1ldGhvZDogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuXG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG5cbiAgICAgIGlmICgkKG9wdGlvbnMuY2hvb3NlX3BheW1lbnQpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgaWYgKCQob3B0aW9ucy5jaG9vc2VfcGF5bWVudCArICcgaW5wdXQnKS5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICAgIHZhciBjaGVja2VkX2lkID0gJChvcHRpb25zLmNob29zZV9wYXltZW50ICsgJyBpbnB1dDpjaGVja2VkJykuYXR0cignaWQnKTtcbiAgICAgICAgICB2YXIgY2hlY2tlZF92YWx1ZSA9ICQob3B0aW9ucy5jaG9vc2VfcGF5bWVudCArICcgaW5wdXQ6Y2hlY2tlZCcpLnZhbCgpO1xuICAgICAgICAgIHRoYXQuc2V0dXBQYXltZW50TWV0aG9kKGNoZWNrZWRfaWQsIGNoZWNrZWRfdmFsdWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgJChvcHRpb25zLmNob29zZV9wYXltZW50ICsgJyBpbnB1dCcpLmNoYW5nZShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyIGNoZWNrZWRfaWQgPSB0aGlzLmlkO1xuICAgICAgICAgIHZhciBjaGVja2VkX3ZhbHVlID0gdGhpcy52YWx1ZTtcbiAgICAgICAgICB0aGF0LnNldHVwUGF5bWVudE1ldGhvZChjaGVja2VkX2lkLCBjaGVja2VkX3ZhbHVlKTtcbiAgICAgICAgfSk7XG5cbiAgICAgIH1cbiAgICB9LCAvLyBjaG9vc2VQYXltZW50TWV0aG9kXG5cbiAgICBzZXR1cFBheW1lbnRNZXRob2Q6IGZ1bmN0aW9uKGVsZW1lbnRfaWQsIGVsZW1lbnRfdmFsdWUpIHtcbiAgICAgIHZhciBzdHJpcGVfcGF5bWVudF90eXBlID0gdGhpcy5zZXRTdHJpcGVQYXltZW50VHlwZShlbGVtZW50X3ZhbHVlKTtcbiAgICAgIGlmICggZWxlbWVudF92YWx1ZSA9PT0gJ2JhbmtfYWNjb3VudCcgKSB7XG4gICAgICAgICQoJ2lucHV0W25hbWU9XCJwYXltZW50X21ldGhvZF9pZFwiXScsICQodGhpcy5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKSkucmVtb3ZlKCk7XG4gICAgICAgIHRoaXMuYWNoRmllbGRzKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucmVtb3ZlQWNoRmllbGRzKHRoaXMub3B0aW9ucyk7XG4gICAgICB9XG4gICAgICAkKHRoaXMub3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvcikucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICAgJCh0aGlzLm9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IgKyAnLicgKyBlbGVtZW50X2lkKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgICAkKHRoaXMub3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvciArICc6bm90KC5hY3RpdmUpIGlucHV0JykudmFsKCcnKTtcbiAgICAgIHRoaXMuY2FsY3VsYXRlRmVlcyh0aGlzLm9wdGlvbnMub3JpZ2luYWxfYW1vdW50LCBzdHJpcGVfcGF5bWVudF90eXBlKTtcbiAgICB9LCAvLyBzZXR1cFBheW1lbnRNZXRob2RcblxuICAgIHJlbW92ZUFjaEZpZWxkczogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgJCgnaW5wdXRbbmFtZT1cInB1YmxpY190b2tlblwiXScsICQob3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikpLnJlbW92ZSgpO1xuICAgICAgJCgnaW5wdXRbbmFtZT1cImFjY291bnRfaWRcIl0nLCAkKG9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpKS5yZW1vdmUoKTtcbiAgICAgICQoJ2lucHV0W25hbWU9XCJiYW5rVG9rZW5cIl0nLCAkKG9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpKS5yZW1vdmUoKTtcbiAgICAgICQob3B0aW9ucy5wbGFpZF9saW5rKS5odG1sKCc8YSBocmVmPVwiI1wiPlNpZ24gaW4gdG8geW91ciBiYW5rIGFjY291bnQ8L2E+Jyk7XG4gICAgICB0aGlzLmJ1dHRvbkRpc2FibGVkKG9wdGlvbnMsIGZhbHNlLCAnJywgJycsIHRydWUpOyAvLyBpZiB0aGUgYnV0dG9uIHdhcyBkaXNhYmxlZCwgcmUtZW5hYmxlIGl0XG4gICAgICBpZiAodHlwZW9mIHRoaXMubGlua0hhbmRsZXIgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRoaXMubGlua0hhbmRsZXIuZGVzdHJveSgpO1xuICAgICAgfVxuICAgIH0sIC8vIHJlbW92ZUFjaEZpZWxkc1xuXG4gICAgY3JlZGl0Q2FyZEZpZWxkczogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuXG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG5cbiAgICAgIHZhciBzdHlsZSA9IHtcbiAgICAgICAgYmFzZToge1xuICAgICAgICAgIGljb25Db2xvcjogJyM2NjZFRTgnLFxuICAgICAgICAgIGxpbmVIZWlnaHQ6ICc0M3B4JyxcbiAgICAgICAgICBmb250V2VpZ2h0OiA0MDAsXG4gICAgICAgICAgZm9udEZhbWlseTogJ2ZmLW1ldGEtd2ViLXBybycsXG4gICAgICAgICAgZm9udFNpemU6ICcyNHB4JyxcbiAgICAgICAgICAvL2xpbmVIZWlnaHQ6ICczN3B4JyxcbiAgICAgICAgICAvL2ZvbnRTaXplOiAnMTZweCcsXG4gICAgICAgIH0sXG4gICAgICAgIGludmFsaWQ6IHtcbiAgICAgICAgICBjb2xvcjogJyMxYTE4MTgnLFxuICAgICAgICB9LFxuICAgICAgfTtcblxuICAgICAgLy8gQWRkIGFuIGluc3RhbmNlIG9mIHRoZSBjYXJkIFVJIGNvbXBvbmVudCBpbnRvIHRoZSBgY2FyZC1lbGVtZW50YCA8ZGl2PlxuICAgICAgLy9jYXJkLm1vdW50KCcjY2FyZC1lbGVtZW50Jyk7XG4gICAgICBpZiAoICQoJy5jcmVkaXQtY2FyZC1ncm91cCcpLmxlbmd0aCA9PT0gMCAmJiAkKCcucGF5bWVudC1tZXRob2QuY2hvb3NlLWNhcmQnKS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhhdC5jYXJkTnVtYmVyRWxlbWVudCA9IHRoYXQuZWxlbWVudHMuY3JlYXRlKCdjYXJkTnVtYmVyJywge1xuICAgICAgICBzaG93SWNvbjogdHJ1ZSxcbiAgICAgICAgc3R5bGU6IHN0eWxlXG4gICAgICB9KTtcbiAgICAgIHRoYXQuY2FyZE51bWJlckVsZW1lbnQubW91bnQob3B0aW9ucy5jY19udW1fc2VsZWN0b3IpO1xuXG4gICAgICB0aGF0LmNhcmRFeHBpcnlFbGVtZW50ID0gdGhhdC5lbGVtZW50cy5jcmVhdGUoJ2NhcmRFeHBpcnknLCB7XG4gICAgICAgIHN0eWxlOiBzdHlsZVxuICAgICAgfSk7XG4gICAgICB0aGF0LmNhcmRFeHBpcnlFbGVtZW50Lm1vdW50KG9wdGlvbnMuY2NfZXhwX3NlbGVjdG9yKTtcblxuICAgICAgdGhhdC5jYXJkQ3ZjRWxlbWVudCA9IHRoYXQuZWxlbWVudHMuY3JlYXRlKCdjYXJkQ3ZjJywge1xuICAgICAgICBzdHlsZTogc3R5bGVcbiAgICAgIH0pO1xuICAgICAgdGhhdC5jYXJkQ3ZjRWxlbWVudC5tb3VudChvcHRpb25zLmNjX2N2Y19zZWxlY3Rvcik7XG5cbiAgICAgIC8vIHZhbGlkYXRlL2Vycm9yIGhhbmRsZSB0aGUgY2FyZCBmaWVsZHNcbiAgICAgIHRoYXQuY2FyZE51bWJlckVsZW1lbnQub24oJ2NoYW5nZScsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIHZhciBzdHJpcGVfcGF5bWVudF90eXBlID0gJ2NhcmQnO1xuICAgICAgICAvLyBTd2l0Y2ggcGF5bWVudCB0eXBlIGlmIGl0J3Mgb25lIHRoYXQgd2UgcmVjb2duaXplIGFzIGRpc3RpbmN0XG4gICAgICAgIGlmIChldmVudC5icmFuZCkge1xuICAgICAgICAgIGlmICggZXZlbnQuYnJhbmQgPT09ICdhbWV4JyApIHtcbiAgICAgICAgICAgIHN0cmlwZV9wYXltZW50X3R5cGUgPSAnYW1leCc7XG4gICAgICAgICAgfSAgICAgICAgICBcbiAgICAgICAgfVxuICAgICAgICAvLyBlcnJvciBoYW5kbGluZ1xuICAgICAgICB0aGF0LnN0cmlwZUVycm9yRGlzcGxheShldmVudC5lcnJvciwgJChvcHRpb25zLmNjX251bV9zZWxlY3RvciwgZWxlbWVudCksIGVsZW1lbnQsIG9wdGlvbnMgKTtcbiAgICAgICAgLy8gaWYgaXQgY2hhbmdlZCwgcmVzZXQgdGhlIGJ1dHRvblxuICAgICAgICB0aGF0LmJ1dHRvblN0YXR1cyhvcHRpb25zLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIGZhbHNlKTtcbiAgICAgICAgdGhhdC5jYWxjdWxhdGVGZWVzKHRoYXQub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQsIHN0cmlwZV9wYXltZW50X3R5cGUpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoYXQuY2FyZEV4cGlyeUVsZW1lbnQub24oJ2NoYW5nZScsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIC8vIGVycm9yIGhhbmRsaW5nXG4gICAgICAgIHRoYXQuc3RyaXBlRXJyb3JEaXNwbGF5KGV2ZW50LmVycm9yLCAkKG9wdGlvbnMuY2NfZXhwX3NlbGVjdG9yLCBlbGVtZW50KSwgZWxlbWVudCwgb3B0aW9ucyApO1xuICAgICAgICAvLyBpZiBpdCBjaGFuZ2VkLCByZXNldCB0aGUgYnV0dG9uXG4gICAgICAgIHRoYXQuYnV0dG9uU3RhdHVzKG9wdGlvbnMsICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKSwgZmFsc2UpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoYXQuY2FyZEN2Y0VsZW1lbnQub24oJ2NoYW5nZScsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIC8vIGVycm9yIGhhbmRsaW5nXG4gICAgICAgIHRoYXQuc3RyaXBlRXJyb3JEaXNwbGF5KGV2ZW50LmVycm9yLCAkKG9wdGlvbnMuY2NfY3ZjX3NlbGVjdG9yLCBlbGVtZW50KSwgZWxlbWVudCwgb3B0aW9ucyApO1xuICAgICAgICAvLyBpZiBpdCBjaGFuZ2VkLCByZXNldCB0aGUgYnV0dG9uXG4gICAgICAgIHRoYXQuYnV0dG9uU3RhdHVzKG9wdGlvbnMsICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKSwgZmFsc2UpO1xuICAgICAgfSk7XG5cbiAgICAgIC8vIHRoaXMgaXMgdGhlIG1ldGhvZCB0byBjcmVhdGUgYSBzaW5nbGUgY2FyZCBmaWVsZCBhbmQgbW91bnQgaXRcbiAgICAgIC8qdmFyIGNhcmQgPSB0aGF0LmVsZW1lbnRzLmNyZWF0ZShcbiAgICAgICAgJ2NhcmQnLFxuICAgICAgICB7XG4gICAgICAgICAgaGlkZVBvc3RhbENvZGU6IHRydWVcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICAgIC8vIEFkZCBhbiBpbnN0YW5jZSBvZiB0aGUgY2FyZCBVSSBjb21wb25lbnQgaW50byB0aGUgYGNhcmQtZWxlbWVudGAgPGRpdj5cbiAgICAgIGNhcmQubW91bnQoJyNjYXJkLWVsZW1lbnQnKTsqL1xuXG4gICAgfSwgLy8gY3JlZGl0Q2FyZEZpZWxkc1xuXG4gICAgc2hvd1NwaW5uZXI6IGZ1bmN0aW9uKCkge1xuICAgICAgJCh0aGlzLm9wdGlvbnMucGxhaWRfbGluaykuaGlkZSgpO1xuICAgICAgJCh0aGlzLm9wdGlvbnMucGxhaWRfbGluaykuYWZ0ZXIoJzxkaXYgY2xhc3M9XCJhLXNwaW5uZXJcIj48aW1nIHNyYz1cImh0dHBzOi8vd3d3Lm1pbm5wb3N0LmNvbS93cC1hZG1pbi9pbWFnZXMvc3Bpbm5lci5naWZcIiBzcmNzZXQ9XCJodHRwczovL3d3dy5taW5ucG9zdC5jb20vd3AtYWRtaW4vaW1hZ2VzL3NwaW5uZXIuZ2lmIDF4LCBodHRwczovL3d3dy5taW5ucG9zdC5jb20vd3AtYWRtaW4vaW1hZ2VzL3NwaW5uZXItMnguZ2lmIDJ4LFwiPjwvZGl2PicpO1xuICAgIH0sXG5cbiAgICBoaWRlU3Bpbm5lcjogZnVuY3Rpb24oKSB7XG4gICAgICAkKHRoaXMub3B0aW9ucy5wbGFpZF9saW5rKS5zaG93KCk7XG4gICAgICAkKCcuYS1zcGlubmVyJykuaGlkZSgpO1xuICAgIH0sXG5cbiAgICBhY2hGaWVsZHM6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciBiYW5rVG9rZW5GaWVsZE5hbWUgPSAnYmFua1Rva2VuJztcbiAgICAgIHZhciBiYW5rVG9rZW5GaWVsZCA9ICdpbnB1dFtuYW1lPVwiJyArIGJhbmtUb2tlbkZpZWxkTmFtZSArICdcIl0nO1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgLy8gdGhlIGJ1dHRvbiBzaG91bGQgbm90IGJlIGNsaWNrYWJsZSB1bnRpbCB0aGUgdXNlciBoYXMgc2lnbmVkIGluXG4gICAgICB0aGF0LmJ1dHRvbkRpc2FibGVkKG9wdGlvbnMsIHRydWUsICcnLCAnU2lnbiBpbiB0byB5b3VyIGJhbmsgYWNjb3VudCAoYWJvdmUpIGZpcnN0Jyk7XG5cbiAgICAgIGlmICh0eXBlb2YgUGxhaWQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHRoYXQubGlua0hhbmRsZXIgPSBQbGFpZC5jcmVhdGUoe1xuICAgICAgICAgIGNsaWVudE5hbWU6ICdNaW5uUG9zdCcsXG4gICAgICAgICAgZW52OiBvcHRpb25zLnBsYWlkX2VudixcbiAgICAgICAgICBwcm9kdWN0OiBbJ2F1dGgnXSxcbiAgICAgICAgICAvLyAxLiBQYXNzIHRoZSB0b2tlbiBnZW5lcmF0ZWQgaW4gc3RlcCAyLlxuICAgICAgICAgIHRva2VuOiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxhaWRfbGlua190b2tlbicpLnZhbHVlLFxuICAgICAgICAgIG9uU3VjY2VzczogZnVuY3Rpb24ocHVibGljX3Rva2VuLCBtZXRhZGF0YSkge1xuICAgICAgICAgICAgdGhhdC5zaG93U3Bpbm5lcigpO1xuICAgICAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgICAgdXJsOicvZ2V0X3BsYWlkX2FjY2Vzc190b2tlbi8nLFxuICAgICAgICAgICAgICBkYXRhOiBKU09OLnN0cmluZ2lmeSh7IHB1YmxpY190b2tlbjogcHVibGljX3Rva2VuLCBhY2NvdW50X2lkOiBtZXRhZGF0YS5hY2NvdW50X2lkIH0pLFxuICAgICAgICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCdcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZG9uZShmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICBpZiAodHlwZW9mIHJlc3BvbnNlLmVycm9yICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIC8vIHRoZXJlIGlzIGFuIGVycm9yLlxuICAgICAgICAgICAgICAgIHRoYXQuaGlkZVNwaW5uZXIoKTtcbiAgICAgICAgICAgICAgICAkKG9wdGlvbnMucGxhaWRfbGluaykuYmVmb3JlKCc8cCBjbGFzcz1cImEtZXJyb3IgYS12YWxpZGF0aW9uLWVycm9yXCI+JyArIHJlc3BvbnNlLmVycm9yICsgJzwvcD4nKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvL3RoaXMuZGVidWcoJ3ByaW50IHJlc3BvbnNlIGhlcmUnKTtcbiAgICAgICAgICAgICAgICAvL3RoaXMuZGVidWcocmVzcG9uc2UpO1xuICAgICAgICAgICAgICAgIC8vIGFkZCB0aGUgZmllbGQocykgd2UgbmVlZCB0byB0aGUgZm9ybSBmb3Igc3VibWl0dGluZ1xuICAgICAgICAgICAgICAgIGlmICgkKGJhbmtUb2tlbkZpZWxkKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAkKGJhbmtUb2tlbkZpZWxkKS52YWwocmVzcG9uc2Uuc3RyaXBlX2JhbmtfYWNjb3VudF90b2tlbik7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICQob3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikucHJlcGVuZCgkKCc8aW5wdXQgdHlwZT1cXFwiaGlkZGVuXFxcIiBuYW1lPVwiJyArIGJhbmtUb2tlbkZpZWxkTmFtZSArICdcIj4nKS52YWwocmVzcG9uc2Uuc3RyaXBlX2JhbmtfYWNjb3VudF90b2tlbikpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkKG9wdGlvbnMucGxhaWRfbGluaywgZWxlbWVudCkuaHRtbCgnPHN0cm9uZz5Zb3VyIGFjY291bnQgd2FzIHN1Y2Nlc3NmdWxseSBhdXRob3JpemVkPC9zdHJvbmc+Jyk7XG4gICAgICAgICAgICAgICAgdGhhdC5oaWRlU3Bpbm5lcigpO1xuICAgICAgICAgICAgICAgIHRoYXQuYnV0dG9uRGlzYWJsZWQob3B0aW9ucywgZmFsc2UpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLmZhaWwoZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgdGhhdC5kZWJ1ZyhyZXNwb25zZSk7XG4gICAgICAgICAgICAgIHRoYXQuaGlkZVNwaW5uZXIoKTtcbiAgICAgICAgICAgICAgJChvcHRpb25zLnBsYWlkX2xpbmspLmJlZm9yZSgnPHAgY2xhc3M9XCJhLWVycm9yIGEtdmFsaWRhdGlvbi1lcnJvclwiPicgKyByZXNwb25zZS5lcnJvciArICc8L3A+Jyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgICAgJChvcHRpb25zLnBsYWlkX2xpbmsgKyAnIGEnKS5jbGljayhmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgdGhhdC5yZXNldEZvcm1FcnJvcnModGhhdC5vcHRpb25zLCB0aGF0LmVsZW1lbnQpO1xuICAgICAgICAgIC8vJChvcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yICsgJyAuYS1lcnJvcicpLnJlbW92ZSgpOyAvLyByZW1vdmUgbWV0aG9kIGVycm9yIG1lc3NhZ2UgaWYgaXQgaXMgdGhlcmVcbiAgICAgICAgICB0aGF0LmxpbmtIYW5kbGVyLm9wZW4oKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSwgLy8gYWNoRmllbGRzXG5cbiAgICBidXR0b25TdGF0dXM6IGZ1bmN0aW9uKG9wdGlvbnMsIGJ1dHRvbiwgZGlzYWJsZWQpIHtcbiAgICAgIC8vIG1ha2UgdGhlIGJ1dHRvbiBjbGlja2FibGUgb3Igbm90XG4gICAgICB0aGlzLmJ1dHRvbkRpc2FibGVkKG9wdGlvbnMsIGRpc2FibGVkLCBidXR0b24pO1xuICAgICAgaWYgKGRpc2FibGVkID09PSBmYWxzZSkge1xuICAgICAgICBidXR0b24udGV4dChvcHRpb25zLmJ1dHRvbl90ZXh0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGJ1dHRvbi50ZXh0KCdQcm9jZXNzaW5nJyk7XG4gICAgICB9XG4gICAgfSwgLy8gYnV0dG9uU3RhdHVzXG5cbiAgICBidXR0b25EaXNhYmxlZDogZnVuY3Rpb24ob3B0aW9ucywgZGlzYWJsZWQsIGJ1dHRvbiA9ICcnLCBtZXNzYWdlID0gJycsIGFjaF93YXNfaW5pdGlhbGl6ZWQgPSBmYWxzZSkge1xuICAgICAgaWYgKGJ1dHRvbiA9PT0gJycpIHtcbiAgICAgICAgYnV0dG9uID0gJChvcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKTtcbiAgICAgIH1cbiAgICAgIGJ1dHRvbi5wcm9wKCdkaXNhYmxlZCcsIGRpc2FibGVkKTtcbiAgICAgIGlmICh0eXBlb2YgdGxpdGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGlmIChtZXNzYWdlICE9PSAnJykge1xuICAgICAgICAgIGlmIChkaXNhYmxlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgYnV0dG9uLmF0dHIoJ2RhdGEtdGxpdGUnLCBtZXNzYWdlKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYnV0dG9uLnJlbW92ZUF0dHIoICdkYXRhLXRsaXRlJyApOyAvLyB0aGVyZSBzaG91bGQgYmUgbm8gdGxpdGUgdmFsdWUgaWYgdGhlIGJ1dHRvbiBpcyBlbmFibGVkXG4gICAgICAgICAgfVxuICAgICAgICAgIGJ1dHRvbi5vbignbW91c2VlbnRlciBmb2N1cycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICB0bGl0ZS5zaG93KCAoIHRoaXMgKSwgeyBncmF2OiAnbncnIH0gKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBidXR0b24ub24oJ21vdXNlbGVhdmUnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgdGxpdGUuaGlkZSggKCB0aGlzICkgKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBidXR0b24ucmVtb3ZlQXR0ciggJ2RhdGEtdGxpdGUnICk7XG4gICAgICAgICAgaWYgKGFjaF93YXNfaW5pdGlhbGl6ZWQgPT09IHRydWUgKSB7XG4gICAgICAgICAgICBidXR0b24ub24oJ21vdXNlZW50ZXIgZm9jdXMnLCBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgICB0bGl0ZS5oaWRlKCAoIHRoaXMgKSApO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBidXR0b24uY2xpY2soZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCAvLyBidXR0b25EaXNhYmxlZFxuXG4gICAgdmFsaWRhdGVTZXR1cDogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgdmFyIGZvcm1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChvcHRpb25zLmZvcm1fc2VsZWN0b3IpO1xuICAgICAgZm9ybXMuZm9yRWFjaCggZnVuY3Rpb24gKCBmb3JtICkge1xuICAgICAgICBWYWxpZEZvcm0oIGZvcm0sIHtcbiAgICAgICAgICB2YWxpZGF0aW9uRXJyb3JQYXJlbnRDbGFzczogJ20taGFzLXZhbGlkYXRpb24tZXJyb3InLFxuICAgICAgICAgIHZhbGlkYXRpb25FcnJvckNsYXNzOiAnYS12YWxpZGF0aW9uLWVycm9yJyxcbiAgICAgICAgICBpbnZhbGlkQ2xhc3M6ICdhLWVycm9yJyxcbiAgICAgICAgICBlcnJvclBsYWNlbWVudDogJ2FmdGVyJ1xuICAgICAgICB9IClcbiAgICAgIH0gKTtcbiAgICAgIHRoaXMuc2Nyb2xsVG9Gb3JtRXJyb3Iob3B0aW9ucyk7XG4gICAgfSwgLy8gdmFsaWRhdGVTZXR1cFxuXG4gICAgc2Nyb2xsVG9Gb3JtRXJyb3I6IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgIHZhciBmb3JtID0gJCggb3B0aW9ucy5mb3JtX3NlbGVjdG9yICk7XG4gICAgICAvLyBsaXN0ZW4gZm9yIGBpbnZhbGlkYCBldmVudHMgb24gYWxsIGZvcm0gaW5wdXRzXG4gICAgICBmb3JtLmZpbmQoICc6aW5wdXQnICkub24oICdpbnZhbGlkJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgIHZhciBpbnB1dCA9ICQoIHRoaXMgKTtcbiAgICAgICAgICAvLyB0aGUgZmlyc3QgaW52YWxpZCBlbGVtZW50IGluIHRoZSBmb3JtXG4gICAgICAgIHZhciBmaXJzdCA9IGZvcm0uZmluZCggJy5hLWVycm9yJyApLmZpcnN0KCk7XG4gICAgICAgIC8vIHRoZSBmb3JtIGl0ZW0gdGhhdCBjb250YWlucyBpdFxuICAgICAgICB2YXIgZmlyc3RfaG9sZGVyID0gZmlyc3QucGFyZW50KCk7XG4gICAgICAgICAgLy8gb25seSBoYW5kbGUgaWYgdGhpcyBpcyB0aGUgZmlyc3QgaW52YWxpZCBpbnB1dFxuICAgICAgICAgIGlmIChpbnB1dFswXSA9PT0gZmlyc3RbMF0pIHtcbiAgICAgICAgICAgICAgLy8gaGVpZ2h0IG9mIHRoZSBuYXYgYmFyIHBsdXMgc29tZSBwYWRkaW5nIGlmIHRoZXJlJ3MgYSBmaXhlZCBuYXZcbiAgICAgICAgICAgICAgLy92YXIgbmF2YmFySGVpZ2h0ID0gbmF2YmFyLmhlaWdodCgpICsgNTBcblxuICAgICAgICAgICAgICAvLyB0aGUgcG9zaXRpb24gdG8gc2Nyb2xsIHRvIChhY2NvdW50aW5nIGZvciB0aGUgbmF2YmFyIGlmIGl0IGV4aXN0cylcbiAgICAgICAgICAgICAgdmFyIGVsZW1lbnRPZmZzZXQgPSBmaXJzdF9ob2xkZXIub2Zmc2V0KCkudG9wO1xuXG4gICAgICAgICAgICAgIC8vIHRoZSBjdXJyZW50IHNjcm9sbCBwb3NpdGlvbiAoYWNjb3VudGluZyBmb3IgdGhlIG5hdmJhcilcbiAgICAgICAgICAgICAgdmFyIHBhZ2VPZmZzZXQgPSB3aW5kb3cucGFnZVlPZmZzZXQ7XG5cbiAgICAgICAgICAgICAgLy8gZG9uJ3Qgc2Nyb2xsIGlmIHRoZSBlbGVtZW50IGlzIGFscmVhZHkgaW4gdmlld1xuICAgICAgICAgICAgICBpZiAoIGVsZW1lbnRPZmZzZXQgPiBwYWdlT2Zmc2V0ICYmIGVsZW1lbnRPZmZzZXQgPCBwYWdlT2Zmc2V0ICsgd2luZG93LmlubmVySGVpZ2h0ICkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAvLyBub3RlOiBhdm9pZCB1c2luZyBhbmltYXRlLCBhcyBpdCBwcmV2ZW50cyB0aGUgdmFsaWRhdGlvbiBtZXNzYWdlIGRpc3BsYXlpbmcgY29ycmVjdGx5XG4gICAgICAgICAgICAgICQoICdodG1sLCBib2R5JyApLnNjcm9sbFRvcCggZWxlbWVudE9mZnNldCApO1xuICAgICAgICAgIH1cbiAgICAgIH0gKTtcbiAgICB9LCAvLyBzY3JvbGxUb0Zvcm1FcnJvclxuXG4gICAgZm9ybVNldHVwOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG5cbiAgICAgICQob3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3Rvcikuc3VibWl0KGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoYXQuZm9ybVByb2Nlc3Nvcih0aGF0LCAnc3VibWl0Jyk7XG5cbiAgICAgIH0pO1xuICAgIH0sIC8vIGZvcm1TZXR1cFxuXG4gICAgZm9ybVByb2Nlc3NvcjogZnVuY3Rpb24odGhhdCwgdHlwZSkge1xuXG4gICAgICAvLyAxLiByZW1vdmUgcHJldmlvdXMgZXJyb3JzIGFuZCByZXNldCB0aGUgYnV0dG9uXG4gICAgICB0aGF0LnJlc2V0Rm9ybUVycm9ycyh0aGF0Lm9wdGlvbnMsIHRoYXQuZWxlbWVudCk7XG5cbiAgICAgIC8vIDIuIHNldCB1cCB0aGUgYnV0dG9uIGlmIGl0J3MgYSBmb3JtIHN1Ym1pdFxuICAgICAgaWYgKHR5cGUgPT09ICdzdWJtaXQnKSB7XG4gICAgICAgIHRoYXQuYnV0dG9uU3RhdHVzKHRoYXQub3B0aW9ucywgJCh0aGF0Lm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLmZpbmQoJ2J1dHRvbicpLCB0cnVlKTtcbiAgICAgIH1cblxuICAgICAgLy8gMy4gZ2VuZXJhdGUgYmlsbGluZyBhZGRyZXNzIGRldGFpbHNcbiAgICAgIHZhciBiaWxsaW5nRGV0YWlscyA9IHRoYXQuZ2VuZXJhdGVCaWxsaW5nRGV0YWlscygpO1xuXG4gICAgICAvLyA0LiBjcmVhdGUgbWlubnBvc3QgdXNlciBhY2NvdW50XG4gICAgICB0aGF0LmNyZWF0ZU1pbm5Qb3N0QWNjb3VudCh0aGF0Lm9wdGlvbnMsIHRoYXQuZWxlbWVudCk7XG5cbiAgICAgIC8vIDUuIGRvIHRoZSBjaGFyZ2luZyBvZiBjYXJkIG9yIGJhbmsgYWNjb3VudCBpZiBpdCdzIGEgZm9ybSBzdWJtaXRcbiAgICAgIC8vIG9yIHN1Ym1pdCB0aGUgZm9ybSBpZiB0aGlzIGlzIGEgcGF5bWVudCByZXF1ZXN0IGJ1dHRvblxuICAgICAgaWYgKHR5cGUgPT09ICdzdWJtaXQnKSB7XG4gICAgICAgIHZhciBwYXltZW50X3R5cGUgPSAkKCdpbnB1dFtuYW1lPVwic3RyaXBlX3BheW1lbnRfdHlwZVwiXScpLnZhbCgpO1xuICAgICAgICBpZiAocGF5bWVudF90eXBlICE9PSAnYmFua19hY2NvdW50Jykge1xuICAgICAgICAgIC8vIGZpbmFsbHksIGdldCBhIHBheW1lbnQgbWV0aG9kIGZyb20gc3RyaXBlLCBhbmQgdHJ5IHRvIGNoYXJnZSBpdCBpZiBpdCBpcyBub3QgYWNoXG4gICAgICAgICAgdGhhdC5jcmVhdGVQYXltZW50TWV0aG9kKHRoYXQuY2FyZE51bWJlckVsZW1lbnQsIGJpbGxpbmdEZXRhaWxzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBpZiBpdCBpcyBhY2gsIHdlIGFscmVhZHkgaGF2ZSBhIHRva2VuIHNvIHN1Ym1pdCB0aGUgZm9ybVxuICAgICAgICAgIC8vIHRvZG86IHVwZ3JhZGUgdGhlIHBsYWlkIGludGVncmF0aW9uXG4gICAgICAgICAgdGhhdC5iYW5rVG9rZW5IYW5kbGVyKCAkKCdpbnB1dFtuYW1lPVwiYmFua1Rva2VuXCJdJykudmFsKCksICdiYW5rX2FjY291bnQnICk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoYXQuc3VibWl0Rm9ybU9ubHkoKTtcbiAgICAgIH1cbiAgICB9LCAvLyBmb3JtUHJvY2Vzc29yXG5cbiAgICBzdHJpcGVFcnJvckRpc3BsYXk6IGZ1bmN0aW9uKGVycm9yLCB0aGlzX3NlbGVjdG9yLCBlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICAvLyBsaXN0ZW4gZm9yIGVycm9ycyBhbmQgZGlzcGxheS9oaWRlIGVycm9yIG1lc3NhZ2VzXG4gICAgICB2YXIgd2hpY2hfZXJyb3IgPSB0aGlzX3NlbGVjdG9yLmF0dHIoJ2lkJyk7XG4gICAgICAvLyB3aGVuIHRoaXMgZmllbGQgY2hhbmdlcywgcmVzZXQgaXRzIGVycm9yc1xuICAgICAgJCgnLmEtY2FyZC1pbnN0cnVjdGlvbi4nICsgd2hpY2hfZXJyb3IpLnJlbW92ZUNsYXNzKCdhLXZhbGlkYXRpb24tZXJyb3InKTtcbiAgICAgICQoJy5hLWNhcmQtaW5zdHJ1Y3Rpb24uJyArIHdoaWNoX2Vycm9yKS5lbXB0eSgpO1xuICAgICAgJCh0aGlzX3NlbGVjdG9yKS5yZW1vdmVDbGFzcygnYS1lcnJvcicpO1xuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIGlmICgkKCcuYS1jYXJkLWluc3RydWN0aW9uLicgKyB3aGljaF9lcnJvcikubGVuZ3RoID4gMCkge1xuICAgICAgICAgICQoJy5hLWNhcmQtaW5zdHJ1Y3Rpb24uJyArIHdoaWNoX2Vycm9yKS50ZXh0KGVycm9yLm1lc3NhZ2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXNfc2VsZWN0b3IucGFyZW50KCkuYXBwZW5kKCc8cCBjbGFzcz1cImEtY2FyZC1pbnN0cnVjdGlvbiAnICsgd2hpY2hfZXJyb3IgKyAnXCI+JyArIGVycm9yLm1lc3NhZ2UgKyAnPC9wPicpO1xuICAgICAgICB9XG4gICAgICAgICQoJy5hLWNhcmQtaW5zdHJ1Y3Rpb24uJyArIHdoaWNoX2Vycm9yKS5hZGRDbGFzcygnYS12YWxpZGF0aW9uLWVycm9yJyk7XG4gICAgICAgIHRoaXNfc2VsZWN0b3IucGFyZW50KCkuYWRkQ2xhc3MoJ20taGFzLXZhbGlkYXRpb24tZXJyb3InKTtcbiAgICAgICAgJCh0aGlzX3NlbGVjdG9yKS5hZGRDbGFzcygnYS1lcnJvcicpO1xuICAgICAgICBpZiAodGhpc19zZWxlY3Rvci5wYXJlbnQoKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgICAgc2Nyb2xsVG9wOiB0aGlzX3NlbGVjdG9yLnBhcmVudCgpLm9mZnNldCgpLnRvcFxuICAgICAgICAgIH0sIDIwMDApO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkKHRoaXNfc2VsZWN0b3IpLnJlbW92ZUNsYXNzKCdhLWVycm9yJyk7XG4gICAgICAgICQoJy5hLWNhcmQtaW5zdHJ1Y3Rpb24uJyArIHdoaWNoX2Vycm9yKS5yZW1vdmVDbGFzcygnYS12YWxpZGF0aW9uLWVycm9yJyk7XG4gICAgICAgICQoJy5hLWNhcmQtaW5zdHJ1Y3Rpb24uJyArIHdoaWNoX2Vycm9yKS5lbXB0eSgpO1xuICAgICAgICAkKG9wdGlvbnMuY2NfbnVtX3NlbGVjdG9yLCBlbGVtZW50KS5yZW1vdmVDbGFzcygnYS12YWxpZGF0aW9uLWVycm9yJyk7XG4gICAgICAgICQob3B0aW9ucy5jY19leHBfc2VsZWN0b3IsIGVsZW1lbnQpLnJlbW92ZUNsYXNzKCdhLXZhbGlkYXRpb24tZXJyb3InKTtcbiAgICAgICAgJChvcHRpb25zLmNjX2N2Y19zZWxlY3RvciwgZWxlbWVudCkucmVtb3ZlQ2xhc3MoJ2EtdmFsaWRhdGlvbi1lcnJvcicpO1xuICAgICAgICAkKG9wdGlvbnMuY2NfbnVtX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnbS1oYXMtdmFsaWRhdGlvbi1lcnJvcicpO1xuICAgICAgICAkKG9wdGlvbnMuY2NfZXhwX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnbS1oYXMtdmFsaWRhdGlvbi1lcnJvcicpO1xuICAgICAgICAkKG9wdGlvbnMuY2NfY3ZjX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKS5yZW1vdmVDbGFzcygnbS1oYXMtdmFsaWRhdGlvbi1lcnJvcicpO1xuICAgICAgfVxuICAgIH0sIC8vIHN0cmlwZUVycm9yRGlzcGxheVxuXG4gICAgcmVzZXRGb3JtRXJyb3JzOiBmdW5jdGlvbihvcHRpb25zLCBlbGVtZW50KSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAkKCcuYS12YWxpZGF0aW9uLWVycm9yJykucmVtb3ZlKCk7XG4gICAgICAkKCdpbnB1dCwgbGFiZWwsIGRpdicsIGVsZW1lbnQpLnJlbW92ZUNsYXNzKCdhLWVycm9yJyk7XG4gICAgICAkKCdsYWJlbCcsIGVsZW1lbnQpLnJlbW92ZUNsYXNzKCdtLWhhcy12YWxpZGF0aW9uLWVycm9yJyk7XG4gICAgICAkKG9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IsIGVsZW1lbnQpLnJlbW92ZUNsYXNzKCdhLWVycm9yIGludmFsaWQnKTtcbiAgICAgICQoJy5hLXZhbGlkYXRpb24tZXJyb3InKS5yZW1vdmUoKTtcbiAgICAgIFxuICAgICAgJChvcHRpb25zLmNob29zZV9wYXltZW50ICsgJyBpbnB1dCcpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgJChvcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yICsgJyAuYS1lcnJvcicpLnJlbW92ZSgpOyAvLyByZW1vdmUgbWV0aG9kIGVycm9yIG1lc3NhZ2UgaWYgaXQgaXMgdGhlcmVcbiAgICAgICAgJChvcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yKS5wYXJlbnQoKS5maW5kKCcuYS12YWxpZGF0aW9uLWVycm9yJykucmVtb3ZlKCk7XG4gICAgICAgIC8vIGlmIGEgcGF5bWVudCBmaWVsZCBjaGFuZ2VkLCByZXNldCB0aGUgYnV0dG9uXG4gICAgICAgIHRoYXQuYnV0dG9uU3RhdHVzKG9wdGlvbnMsICQob3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIGZhbHNlKTtcbiAgICAgIH0pO1xuICAgIH0sIC8vIHJlc2V0Rm9ybUVycm9yc1xuICAgIFxuICAgIGNyZWF0ZU1pbm5Qb3N0QWNjb3VudDogZnVuY3Rpb24ob3B0aW9ucywgZWxlbWVudCkge1xuICAgICAgLy8gMi4gY3JlYXRlIG1pbm5wb3N0IGFjY291bnQgaWYgc3BlY2lmaWVkXG4gICAgICBpZiAob3B0aW9ucy5jcmVhdGVfYWNjb3VudCA9PT0gdHJ1ZSkge1xuICAgICAgICB2YXIgdXNlciA9IHtcbiAgICAgICAgICBlbWFpbDogJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICBmaXJzdF9uYW1lOiAkKG9wdGlvbnMuZmlyc3RfbmFtZV9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgbGFzdF9uYW1lOiAkKG9wdGlvbnMubGFzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICBwYXNzd29yZDogJChvcHRpb25zLnBhc3N3b3JkX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICBjaXR5OiAkKG9wdGlvbnMuYmlsbGluZ19jaXR5X2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICBzdGF0ZTogJChvcHRpb25zLmJpbGxpbmdfc3RhdGVfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgIHppcDogJChvcHRpb25zLmJpbGxpbmdfemlwX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgfTtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICB1cmw6IG9wdGlvbnMubWlubnBvc3Rfcm9vdCArICcvd3AtanNvbi91c2VyLWFjY291bnQtbWFuYWdlbWVudC92MS9jcmVhdGUtdXNlcicsXG4gICAgICAgICAgZGF0YTogdXNlclxuICAgICAgICB9KS5kb25lKGZ1bmN0aW9uKCBkYXRhICkge1xuICAgICAgICAgIGlmIChkYXRhLnN0YXR1cyA9PT0gJ3N1Y2Nlc3MnICYmIGRhdGEucmVhc29uID09PSAnbmV3IHVzZXInKSB7XG4gICAgICAgICAgICAvLyB1c2VyIGNyZWF0ZWQgLSB0aGV5IHNob3VsZCByZWNlaXZlIGVtYWlsXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LCAvLyBjcmVhdGVNaW5uUG9zdEFjY291bnRcbiAgICBcbiAgICBnZW5lcmF0ZUJpbGxpbmdEZXRhaWxzOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBiaWxsaW5nRGV0YWlscyA9IHt9O1xuICAgICAgdmFyIGFkZHJlc3NEZXRhaWxzID0ge307XG5cbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvcikudmFsKCkgIT0gJycpIHtcbiAgICAgICAgYmlsbGluZ0RldGFpbHMuZW1haWwgPSAkKHRoaXMub3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvcikudmFsKCk7XG4gICAgICB9XG4gICAgICBcbiAgICAgIHZhciBmdWxsX25hbWUgPSAnJztcbiAgICAgIGlmICgkKCcjZnVsbF9uYW1lJykubGVuZ3RoID4gMCkge1xuICAgICAgICBmdWxsX25hbWUgPSAkKCcjZnVsbF9uYW1lJykudmFsKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmdWxsX25hbWUgPSAkKHRoaXMub3B0aW9ucy5maXJzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yKS52YWwoKSArICcgJyArICQodGhpcy5vcHRpb25zLmxhc3RfbmFtZV9maWVsZF9zZWxlY3RvcikudmFsKCk7XG4gICAgICB9XG4gICAgICBiaWxsaW5nRGV0YWlscy5uYW1lID0gZnVsbF9uYW1lO1xuXG4gICAgICB2YXIgc3RyZWV0ID0gJ05vbmUnO1xuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmJpbGxpbmdfc3RyZWV0X2ZpZWxkX3NlbGVjdG9yKS52YWwoKSAhPSAnJykge1xuICAgICAgICBzdHJlZXQgPSAkKHRoaXMub3B0aW9ucy5iaWxsaW5nX3N0cmVldF9maWVsZF9zZWxlY3RvcikudmFsKCk7XG4gICAgICAgIGFkZHJlc3NEZXRhaWxzLmxpbmUxID0gc3RyZWV0O1xuICAgICAgfVxuXG4gICAgICB2YXIgY2l0eSA9ICdOb25lJztcbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5iaWxsaW5nX2NpdHlfZmllbGRfc2VsZWN0b3IpLnZhbCgpICE9ICcnKSB7XG4gICAgICAgIGNpdHkgPSAkKHRoaXMub3B0aW9ucy5iaWxsaW5nX2NpdHlfZmllbGRfc2VsZWN0b3IpLnZhbCgpO1xuICAgICAgICBhZGRyZXNzRGV0YWlscy5jaXR5ID0gY2l0eTtcbiAgICAgIH1cblxuICAgICAgdmFyIHN0YXRlID0gJ05vbmUnO1xuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmJpbGxpbmdfc3RhdGVfZmllbGRfc2VsZWN0b3IpLnZhbCgpICE9ICcnKSB7XG4gICAgICAgIHN0YXRlID0gJCh0aGlzLm9wdGlvbnMuYmlsbGluZ19zdGF0ZV9maWVsZF9zZWxlY3RvcikudmFsKCk7XG4gICAgICAgIGFkZHJlc3NEZXRhaWxzLnN0YXRlID0gc3RhdGU7XG4gICAgICB9XG5cbiAgICAgIHZhciB6aXAgPSAnTm9uZSc7XG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuYmlsbGluZ196aXBfZmllbGRfc2VsZWN0b3IpLnZhbCgpICE9ICcnKSB7XG4gICAgICAgIHppcCA9ICQodGhpcy5vcHRpb25zLmJpbGxpbmdfemlwX2ZpZWxkX3NlbGVjdG9yKS52YWwoKTtcbiAgICAgICAgYWRkcmVzc0RldGFpbHMucG9zdGFsX2NvZGUgPSB6aXA7XG4gICAgICB9XG5cbiAgICAgIHZhciBjb3VudHJ5ID0gJ1VTJztcbiAgICAgIHZhciBjb3VudHJ5X2ZpZWxkX3ZhbHVlID0gJCh0aGlzLm9wdGlvbnMuYmlsbGluZ19jb3VudHJ5X2ZpZWxkX3NlbGVjdG9yKS52YWwoKTtcbiAgICAgIGlmIChjb3VudHJ5X2ZpZWxkX3ZhbHVlICE9ICcnICYmIGNvdW50cnlfZmllbGRfdmFsdWUgIT0gJ1VuaXRlZCBTdGF0ZXMnKSB7XG4gICAgICAgIGNvdW50cnkgPSBjb3VudHJ5X2ZpZWxkX3ZhbHVlO1xuICAgICAgfVxuICAgICAgYWRkcmVzc0RldGFpbHMuY291bnRyeSA9IGNvdW50cnk7XG5cbiAgICAgIGlmIChzdHJlZXQgIT09ICdOb25lJyB8fCBjaXR5ICE9PSAnTm9uZScgfHwgc3RhdGUgIT09ICdOb25lJyB8fCB6aXAgIT09ICdOb25lJykge1xuICAgICAgICBiaWxsaW5nRGV0YWlscy5hZGRyZXNzID0gYWRkcmVzc0RldGFpbHM7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBiaWxsaW5nRGV0YWlscztcbiAgICB9LCAvLyBnZW5lcmF0ZUJpbGxpbmdEZXRhaWxzXG5cbiAgICBjcmVhdGVQYXltZW50TWV0aG9kOiBmdW5jdGlvbihjYXJkRWxlbWVudCwgYmlsbGluZ0RldGFpbHMpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHRoYXQuc3RyaXBlLmNyZWF0ZVBheW1lbnRNZXRob2Qoe1xuICAgICAgICB0eXBlOiAnY2FyZCcsXG4gICAgICAgIGNhcmQ6IGNhcmRFbGVtZW50LFxuICAgICAgICBiaWxsaW5nX2RldGFpbHM6IGJpbGxpbmdEZXRhaWxzXG4gICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgIGlmIChyZXNwb25zZS5lcnJvcikge1xuICAgICAgICAgIHRoYXQuaGFuZGxlU2VydmVyRXJyb3IocmVzcG9uc2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIFNlbmQgcGF5bWVudE1ldGhvZC5pZCB0byBzZXJ2ZXJcbiAgICAgICAgICB2YXIgc3VwcG9ydGZvcm0gPSAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3Rvcik7XG4gICAgICAgICAgdmFyIGFqYXhfdXJsID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xuICAgICAgICAgIHZhciB0b2tlbkZpZWxkTmFtZSA9ICdwYXltZW50X21ldGhvZF9pZCc7XG4gICAgICAgICAgdmFyIHRva2VuRmllbGQgPSAnaW5wdXRbbmFtZT1cIicgKyB0b2tlbkZpZWxkTmFtZSArICdcIl0nO1xuXG4gICAgICAgICAgLy8gSW5zZXJ0IHRoZSBwYXltZW50IG1ldGhvZCBJRCBpbnRvIHRoZSBmb3JtIHNvIGl0IGdldHMgc3VibWl0dGVkIHRvIHRoZSBzZXJ2ZXJcbiAgICAgICAgICBpZiAoJCh0b2tlbkZpZWxkKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAkKHRva2VuRmllbGQpLnZhbChyZXNwb25zZS5wYXltZW50TWV0aG9kLmlkKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3VwcG9ydGZvcm0uYXBwZW5kKCQoJzxpbnB1dCB0eXBlPVxcXCJoaWRkZW5cXFwiIG5hbWU9XCInICsgdG9rZW5GaWVsZE5hbWUgKyAnXCI+JykudmFsKHJlc3BvbnNlLnBheW1lbnRNZXRob2QuaWQpKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmZXRjaChhamF4X3VybCwge1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGJvZHk6ICQoc3VwcG9ydGZvcm0pLnNlcmlhbGl6ZSgpXG4gICAgICAgICAgfSkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgLy8gSGFuZGxlIHNlcnZlciByZXNwb25zZSAoc2VlIFN0ZXAgMylcbiAgICAgICAgICAgIHJlc3BvbnNlLmpzb24oKS50aGVuKGZ1bmN0aW9uKGpzb24pIHtcbiAgICAgICAgICAgICAgdGhhdC5oYW5kbGVTZXJ2ZXJSZXNwb25zZShqc29uKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0sIC8vIGNyZWF0ZVBheW1lbnRNZXRob2RcblxuICAgIGJhbmtUb2tlbkhhbmRsZXI6IGZ1bmN0aW9uKHRva2VuLCB0eXBlKSB7XG4gICAgICB0aGlzLnNldFN0cmlwZVBheW1lbnRUeXBlKHR5cGUpO1xuICAgICAgdGhpcy5zdWJtaXRGb3JtT25seSgpO1xuICAgIH0sIC8vIGJhbmtUb2tlbkhhbmRsZXJcblxuICAgIHN1Ym1pdEZvcm1Pbmx5OiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHZhciBzdXBwb3J0Zm9ybSA9ICQodGhpcy5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKTtcbiAgICAgIHZhciBhamF4X3VybCA9IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZTtcblxuICAgICAgLy8gU3VibWl0IHRoZSBmb3JtXG4gICAgICAvLyB0aGUgd2F5IGl0IHdvcmtzIGN1cnJlbnRseSBpcyB0aGUgZm9ybSBzdWJtaXRzIGFuIGFqYXggcmVxdWVzdCB0byBpdHNlbGZcbiAgICAgIC8vIHRoZW4gaXQgc3VibWl0cyBhIHBvc3QgcmVxdWVzdCB0byB0aGUgZm9ybSdzIGFjdGlvbiB1cmxcbiAgICAgICQuYWpheCh7XG4gICAgICAgIHVybDogYWpheF91cmwsXG4gICAgICAgIGNhY2hlOiBmYWxzZSxcbiAgICAgICAgZGF0YTogJChzdXBwb3J0Zm9ybSkuc2VyaWFsaXplKCksXG4gICAgICAgIHR5cGU6ICdQT1NUJ1xuICAgICAgfSlcbiAgICAgIC5kb25lKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVzcG9uc2UuZXJyb3JzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIHRoYXQuaGFuZGxlU2VydmVyRXJyb3IocmVzcG9uc2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN1cHBvcnRmb3JtLmdldCgwKS5zdWJtaXQoKTsgLy8gY29udGludWUgc3VibWl0dGluZyB0aGUgZm9ybSBpZiB0aGUgYWpheCB3YXMgc3VjY2Vzc2Z1bFxuICAgICAgICB9XG4gICAgICB9KVxuICAgICAgLmZhaWwoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoYXQuYnV0dG9uU3RhdHVzKHRoYXQub3B0aW9ucywgJCh0aGF0Lm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLmZpbmQoJ2J1dHRvbicpLCBmYWxzZSk7XG4gICAgICB9KTtcbiAgICB9LCAvLyBzdWJtaXRGb3JtT25seVxuXG4gICAgaGFuZGxlU2VydmVyUmVzcG9uc2U6IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICB2YXIgc3VwcG9ydGZvcm0gPSAkKHRoaXMub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3Rvcik7XG4gICAgICBpZiAocmVzcG9uc2UuZXJyb3JzKSB7XG4gICAgICAgIC8vIFNob3cgZXJyb3IgZnJvbSBzZXJ2ZXIgb24gcGF5bWVudCBmb3JtXG4gICAgICAgIHRoaXMuaGFuZGxlU2VydmVyRXJyb3IocmVzcG9uc2UpO1xuICAgICAgfSBlbHNlIGlmIChyZXNwb25zZS5yZXF1aXJlc19hY3Rpb24pIHtcbiAgICAgICAgLy8gVXNlIFN0cmlwZS5qcyB0byBoYW5kbGUgcmVxdWlyZWQgY2FyZCBhY3Rpb25cbiAgICAgICAgLy9oYW5kbGVBY3Rpb24ocmVzcG9uc2UpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3VwcG9ydGZvcm0uZ2V0KDApLnN1Ym1pdCgpOyAvLyBjb250aW51ZSBzdWJtaXR0aW5nIHRoZSBmb3JtIGlmIHRoZSBhamF4IHdhcyBzdWNjZXNzZnVsXG4gICAgICB9XG4gICAgfSwgLy8gaGFuZGxlU2VydmVyUmVzcG9uc2VcblxuICAgIGhhbmRsZVNlcnZlckVycm9yOiBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdmFyIHRoaXNfZmllbGQgPSAnJztcbiAgICAgIC8vIGRvIG5vdCBzdWJtaXQuIHRoZXJlIGlzIGFuIGVycm9yLlxuICAgICAgdGhhdC5idXR0b25TdGF0dXModGhhdC5vcHRpb25zLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIGZhbHNlKTtcbiAgICAgIC8vIGhhbmRsZSBlcnJvciBkaXNwbGF5XG4gICAgICBpZiAodHlwZW9mIHJlc3BvbnNlLmVycm9ycyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgaWYgKHR5cGVvZiByZXNwb25zZS5lcnJvcnNbMF0gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgdGhpc19maWVsZCA9IHJlc3BvbnNlLmVycm9yc1swXS5maWVsZCArICdfZmllbGRfc2VsZWN0b3InO1xuICAgICAgICB9XG4gICAgICAgICQuZWFjaChyZXNwb25zZS5lcnJvcnMsIGZ1bmN0aW9uKCBpbmRleCwgZXJyb3IgKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBlcnJvci5maWVsZCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIHRoaXNfZmllbGQgPSBlcnJvci5maWVsZCArICdfZmllbGRfc2VsZWN0b3InO1xuICAgICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGVycm9yLnBhcmFtICE9PSAndW5kZWZpbmVkJyAmJiBlcnJvci5wYXJhbSAhPT0gJycpIHtcbiAgICAgICAgICAgIHRoaXNfZmllbGQgPSAnY2NfJyArIGVycm9yLnBhcmFtICsgJ19zZWxlY3Rvcic7ICBcbiAgICAgICAgICB9XG4gICAgICAgICAgdGhhdC5kaXNwbGF5RXJyb3JNZXNzYWdlKGVycm9yLCB0aGlzX2ZpZWxkKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiByZXNwb25zZS5lcnJvciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdmFyIGVycm9yID0gcmVzcG9uc2UuZXJyb3I7XG4gICAgICAgIGlmICh0eXBlb2YgZXJyb3IuZmllbGQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgdGhpc19maWVsZCA9IGVycm9yLmZpZWxkICsgJ19maWVsZF9zZWxlY3Rvcic7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGVycm9yLnBhcmFtICE9PSAndW5kZWZpbmVkJyAmJiBlcnJvci5wYXJhbSAhPT0gJycpIHtcbiAgICAgICAgICB0aGlzX2ZpZWxkID0gJ2NjXycgKyBlcnJvci5wYXJhbSArICdfc2VsZWN0b3InOyAgXG4gICAgICAgIH1cbiAgICAgICAgdGhhdC5kaXNwbGF5RXJyb3JNZXNzYWdlKGVycm9yLCB0aGlzX2ZpZWxkKTtcbiAgICAgIH1cbiAgICAgIGlmICgkKHRoYXQub3B0aW9uc1t0aGlzX2ZpZWxkXSkubGVuZ3RoID4gMCkge1xuICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgc2Nyb2xsVG9wOiAkKHRoYXQub3B0aW9uc1t0aGlzX2ZpZWxkXSkucGFyZW50KCkub2Zmc2V0KCkudG9wXG4gICAgICAgIH0sIDIwMDApO1xuICAgICAgfVxuICAgIH0sIC8vIGhhbmRsZVNlcnZlckVycm9yXG5cbiAgICBkaXNwbGF5RXJyb3JNZXNzYWdlKGVycm9yLCBmaWVsZCkge1xuICAgICAgdmFyIG1lc3NhZ2UgPSAnJztcbiAgICAgIHZhciBzdHJpcGVFcnJvclNlbGVjdG9yID0gJyc7XG4gICAgICB2YXIgZmllbGRQYXJlbnQgPSAkKHRoaXMub3B0aW9uc1tmaWVsZF0pLnBhcmVudCgpO1xuICAgICAgaWYgKHR5cGVvZiBlcnJvci5tZXNzYWdlID09PSAnc3RyaW5nJykge1xuICAgICAgICBtZXNzYWdlID0gZXJyb3IubWVzc2FnZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlWzBdO1xuICAgICAgfVxuICAgICAgaWYgKCQodGhpcy5vcHRpb25zW2ZpZWxkXSkubGVuZ3RoID4gMCkge1xuICAgICAgICAkKHRoaXMub3B0aW9uc1tmaWVsZF0pLmFkZENsYXNzKCdhLWVycm9yJyk7XG4gICAgICAgICQodGhpcy5vcHRpb25zW2ZpZWxkXSkucHJldigpLmFkZENsYXNzKCdhLWVycm9yJyk7XG4gICAgICAgIGlmICgkKCcuYS1jYXJkLWluc3RydWN0aW9uJywgZmllbGRQYXJlbnQpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAkKCcuYS1jYXJkLWluc3RydWN0aW9uJywgZmllbGRQYXJlbnQpLmFkZENsYXNzKCdhLXZhbGlkYXRpb24tZXJyb3InKTtcbiAgICAgICAgICAkKCcuYS1jYXJkLWluc3RydWN0aW9uJywgZmllbGRQYXJlbnQpLnRleHQobWVzc2FnZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJCh0aGlzLm9wdGlvbnNbZmllbGRdKS5hZnRlcignPHAgY2xhc3M9XCJhLWNhcmQtaW5zdHJ1Y3Rpb24gYS12YWxpZGF0aW9uLWVycm9yXCI+JyArIG1lc3NhZ2UgKyAnPC9wPicpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGVvZiBlcnJvciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhpcy5idXR0b25TdGF0dXModGhpcy5vcHRpb25zLCAkKHRoaXMub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIGZhbHNlKTtcbiAgICAgICAgaWYgKGVycm9yLmNvZGUgPT09ICdpbmNvbXBsZXRlX251bWJlcicgfHwgZXJyb3IuY29kZSA9PSAnaW52YWxpZF9udW1iZXInIHx8IGVycm9yLmNvZGUgPT0gJ2luY29ycmVjdF9udW1iZXInIHx8IGVycm9yLmNvZGUgPT0gJ2NhcmRfZGVjbGluZWQnIHx8IGVycm9yLmNvZGUgPT0gJ3Byb2Nlc3NpbmdfZXJyb3InKSB7XG4gICAgICAgICAgLy8gZXJyb3IgaGFuZGxpbmdcbiAgICAgICAgICBzdHJpcGVFcnJvclNlbGVjdG9yID0gJCh0aGlzLm9wdGlvbnMuY2NfbnVtX3NlbGVjdG9yKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXJyb3IuY29kZSA9PSAnaW52YWxpZF9leHBpcnlfbW9udGgnIHx8IGVycm9yLmNvZGUgPT0gJ2ludmFsaWRfZXhwaXJ5X3llYXInIHx8IGVycm9yLmNvZGUgPT0gJ2V4cGlyZWRfY2FyZCcpIHtcbiAgICAgICAgICAvLyBlcnJvciBoYW5kbGluZ1xuICAgICAgICAgIHN0cmlwZUVycm9yU2VsZWN0b3IgPSAkKHRoaXMub3B0aW9ucy5jY19leHBfc2VsZWN0b3IpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJvci5jb2RlID09ICdpbnZhbGlkX2N2YycgfHwgZXJyb3IuY29kZSA9PSAnaW5jb3JyZWN0X2N2YycpIHtcbiAgICAgICAgICAvLyBlcnJvciBoYW5kbGluZ1xuICAgICAgICAgIHN0cmlwZUVycm9yU2VsZWN0b3IgPSAkKHRoaXMub3B0aW9ucy5jY19jdmNfc2VsZWN0b3IpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJvci5jb2RlID09ICdlbWFpbF9pbnZhbGlkJykge1xuICAgICAgICAgIC8vIGVycm9yIGhhbmRsaW5nXG4gICAgICAgICAgc3RyaXBlRXJyb3JTZWxlY3RvciA9ICQodGhpcy5vcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoc3RyaXBlRXJyb3JTZWxlY3RvciAhPT0gJycpIHtcbiAgICAgICAgICB0aGlzLnN0cmlwZUVycm9yRGlzcGxheShlcnJvciwgc3RyaXBlRXJyb3JTZWxlY3RvciwgdGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXJyb3IudHlwZSA9PSAnbWlzc2luZ19wYXltZW50JyAmJiBzdHJpcGVFcnJvclNlbGVjdG9yID09PSAnJykge1xuICAgICAgICAgICQodGhpcy5vcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yICsgJy5hY3RpdmUnKS5hcHBlbmQoJzxwIGNsYXNzPVwiYS1mb3JtLWNhcHRpb24gYS12YWxpZGF0aW9uLWVycm9yIGEtbWlzc2luZy1wYXltZW50LWVycm9yXCI+JyArIGVycm9yLm1lc3NhZ2UgKyAnPC9wPicpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9yLmZpZWxkID09ICdyZWNhcHRjaGEnKSB7XG4gICAgICAgICAgJCh0aGlzLm9wdGlvbnMucGF5X2J1dHRvbl9zZWxlY3RvcikuYmVmb3JlKCc8cCBjbGFzcz1cImEtZm9ybS1jYXB0aW9uIGEtdmFsaWRhdGlvbi1lcnJvciBhLXJlY2FwdGNoYS1lcnJvclwiPicgKyBtZXNzYWdlICsgJzwvcD4nKVxuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJvci50eXBlID09ICdpbnZhbGlkX3JlcXVlc3RfZXJyb3InICYmIHN0cmlwZUVycm9yU2VsZWN0b3IgPT09ICcnKSB7XG4gICAgICAgICAgJCh0aGlzLm9wdGlvbnMucGF5X2J1dHRvbl9zZWxlY3RvcikuYmVmb3JlKCc8cCBjbGFzcz1cImEtZm9ybS1jYXB0aW9uIGEtdmFsaWRhdGlvbi1lcnJvciBhLWludmFsaWQtcmVxdWVzdC1lcnJvclwiPicgKyBlcnJvci5tZXNzYWdlICsgJzwvcD4nKVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSwgLy8gZGlzcGxheUVycm9yTWVzc2FnZVxuXG4gICAgc2hvd05ld3NsZXR0ZXJTZXR0aW5nczogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuXG4gICAgICB2YXIgbmV3c2xldHRlcl9ncm91cF9odG1sID0gJyc7XG4gICAgICBpZiAoJChvcHRpb25zLm5ld3NsZXR0ZXJfZ3JvdXBfc2VsZWN0b3IpLmxlbmd0aCA+IDAgKSB7XG4gICAgICAgIHZhciBnZXRfZGF0YSA9IHtcbiAgICAgICAgICBzaG9ydGNvZGU6ICduZXdzbGV0dGVyX2Zvcm0nLFxuICAgICAgICAgIHBsYWNlbWVudDogJ3VzZXJhY2NvdW50J1xuICAgICAgICB9O1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgICAgdXJsOiBvcHRpb25zLm1pbm5wb3N0X3Jvb3QgKyAnL3dwLWpzb24vbWlubnBvc3QtYXBpL3YyL21haWxjaGltcC9mb3JtJyxcbiAgICAgICAgICBkYXRhOiBnZXRfZGF0YVxuICAgICAgICB9KS5kb25lKGZ1bmN0aW9uKCByZXN1bHQgKSB7XG4gICAgICAgICAgaWYgKCB0eXBlb2YgcmVzdWx0Lmdyb3VwX2ZpZWxkcyAhPT0gJ3VuZGVmaW5lZCcgKSB7XG4gICAgICAgICAgICAkLmVhY2gocmVzdWx0Lmdyb3VwX2ZpZWxkcywgZnVuY3Rpb24oIGluZGV4LCBjYXRlZ29yeSApIHtcbiAgICAgICAgICAgICAgbmV3c2xldHRlcl9ncm91cF9odG1sICs9ICc8ZmllbGRzZXQgY2xhc3M9XCJtLWZvcm0taXRlbSBzdXBwb3J0LW5ld3NsZXR0ZXIgbS1mb3JtLWl0ZW0tJyArIGNhdGVnb3J5LnR5cGUgKyAnXCI+JztcbiAgICAgICAgICAgICAgbmV3c2xldHRlcl9ncm91cF9odG1sICs9ICc8bGFiZWw+JyArIGNhdGVnb3J5Lm5hbWUgKyAnOjwvbGFiZWw+JztcbiAgICAgICAgICAgICAgaWYgKCBjYXRlZ29yeS5jb250YWlucy5sZW5ndGggPiAwICkge1xuICAgICAgICAgICAgICAgIG5ld3NsZXR0ZXJfZ3JvdXBfaHRtbCArPSAnPGRpdiBjbGFzcz1cIm0tZm9ybS1pdGVtIG0tZm9ybS1pdGVtLW5ld3NsZXR0ZXJcIj4nO1xuICAgICAgICAgICAgICAgICQuZWFjaChjYXRlZ29yeVtjYXRlZ29yeS5jb250YWluc10sIGZ1bmN0aW9uKCBpbmRleCwgaXRlbSApIHtcbiAgICAgICAgICAgICAgICAgIG5ld3NsZXR0ZXJfZ3JvdXBfaHRtbCArPSAnPGxhYmVsPjxpbnB1dCBuYW1lPVwiZ3JvdXBzX3N1Ym1pdHRlZFwiIHR5cGU9XCJjaGVja2JveFwiIHZhbHVlPVwiJyArIGl0ZW0uaWQgKyAnXCI+JyArIGl0ZW0ubmFtZSArICc8L2xhYmVsPic7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgbmV3c2xldHRlcl9ncm91cF9odG1sICs9ICc8L2Rpdj4nO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIG5ld3NsZXR0ZXJfZ3JvdXBfaHRtbCArPSAnPC9maWVsZHNldD4nO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkKG9wdGlvbnMubmV3c2xldHRlcl9ncm91cF9zZWxlY3RvcikuaHRtbChuZXdzbGV0dGVyX2dyb3VwX2h0bWwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGlmICgkKG9wdGlvbnMubmV3c2xldHRlcl9ncm91cF9zZWxlY3RvcikubGVuZ3RoID4gMCAmJiB0eXBlb2YgJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdmFyIGdldF9kYXRhID0ge1xuICAgICAgICAgIGVtYWlsOiAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpXG4gICAgICAgIH07XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICB1cmw6IG9wdGlvbnMubWlubnBvc3Rfcm9vdCArICcvd3AtanNvbi9taW5ucG9zdC1hcGkvdjIvbWFpbGNoaW1wL3VzZXInLFxuICAgICAgICAgIGRhdGE6IGdldF9kYXRhXG4gICAgICAgIH0pLmRvbmUoZnVuY3Rpb24oIHJlc3VsdCApIHtcbiAgICAgICAgICBpZiAoIHR5cGVvZiByZXN1bHQubWFpbGNoaW1wX3N0YXR1cyAhPT0gJ3VuZGVmaW5lZCcgKSB7XG4gICAgICAgICAgICAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLmFmdGVyKCc8aW5wdXQgbmFtZT1cIm1haWxjaGltcF9zdGF0dXNcIiB0eXBlPVwiaGlkZGVuXCIgdmFsdWU9XCInICsgcmVzdWx0Lm1haWxjaGltcF9zdGF0dXMgKyAnXCI+Jyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICggdHlwZW9mIHJlc3VsdC5tYWlsY2hpbXBfdXNlcl9pZCAhPT0gJ3VuZGVmaW5lZCcgKSB7XG4gICAgICAgICAgICAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLmFmdGVyKCc8aW5wdXQgbmFtZT1cIm1haWxjaGltcF91c2VyX2lkXCIgdHlwZT1cImhpZGRlblwiIHZhbHVlPVwiJyArIHJlc3VsdC5tYWlsY2hpbXBfdXNlcl9pZCArICdcIj4nKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHJlc3VsdC5tYWlsY2hpbXBfc3RhdHVzID09PSAnc3Vic2NyaWJlZCcpIHtcbiAgICAgICAgICAgIC8vIHVzZXIgY3JlYXRlZCAtIHNob3cgYSBzdWNjZXNzIG1lc3NhZ2VcbiAgICAgICAgICAgICQoJy5hLWNvbmZpcm0taW5zdHJ1Y3Rpb25zJykudGV4dCgkKCcuYS1jb25maXJtLWluc3RydWN0aW9ucycpLmF0dHIoJ2RhdGEta25vd24tdXNlcicpKTtcbiAgICAgICAgICAgIHZhciBncm91cHMgPSByZXN1bHQuZ3JvdXBzO1xuICAgICAgICAgICAgJC5lYWNoKGdyb3VwcywgZnVuY3Rpb24oIGluZGV4LCB2YWx1ZSApIHtcbiAgICAgICAgICAgICAgaWYgKCB2YWx1ZSA9PT0gdHJ1ZSApIHtcbiAgICAgICAgICAgICAgICAkKCc6Y2hlY2tib3hbdmFsdWU9XCInICsgaW5kZXggKyAnXCJdJykucHJvcCgnY2hlY2tlZCcsdHJ1ZSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJCgnOmNoZWNrYm94W3ZhbHVlPVwiJyArIGluZGV4ICsgJ1wiXScpLnByb3AoJ2NoZWNrZWQnLGZhbHNlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgIH0sIC8vIHNob3dOZXdzbGV0dGVyU2V0dGluZ3NcblxuICAgIGNvbmZpcm1NZXNzYWdlU3VibWl0OiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG5cbiAgICAgIHZhciBleGlzdGluZ19uZXdzbGV0dGVyX3NldHRpbmdzID0gJChvcHRpb25zLm5ld3NsZXR0ZXJfZ3JvdXBfc2VsZWN0b3IgKyAnIGlucHV0Jykuc2VyaWFsaXplKCk7XG4gICAgICAvL3RoaXMuZGVidWcoZXhpc3RpbmdfbmV3c2xldHRlcl9zZXR0aW5ncyk7XG5cbiAgICAgICQob3B0aW9ucy5jb25maXJtX2Zvcm1fc2VsZWN0b3IpLnN1Ym1pdChmdW5jdGlvbihldmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgIHZhciBjb25maXJtZm9ybSA9ICQob3B0aW9ucy5jb25maXJtX2Zvcm1fc2VsZWN0b3IpO1xuICAgICAgICAvLyBzdWJtaXQgc2V0dGluZ3MgdG8gbWFpbGNoaW1wXG4gICAgICAgIC8vIG5lZWQgdG8gZ2V0IHVzZXIgaW5mbyBvbiBhIGhpZGRlbiBmaWVsZCBoZXJlXG5cbiAgICAgICAgdmFyIG5ld3NsZXR0ZXJfZ3JvdXBzID0gJChvcHRpb25zLm5ld3NsZXR0ZXJfZ3JvdXBfc2VsZWN0b3IgKyAnIGlucHV0OmNoZWNrZWQnKTtcbiAgICAgICAgdmFyIG5ld19uZXdzbGV0dGVyX3NldHRpbmdzID0gbmV3c2xldHRlcl9ncm91cHMuc2VyaWFsaXplKCk7XG5cbiAgICAgICAgaWYgKChleGlzdGluZ19uZXdzbGV0dGVyX3NldHRpbmdzICE9PSBuZXdfbmV3c2xldHRlcl9zZXR0aW5ncykgJiYgKHR5cGVvZiBuZXdzbGV0dGVyX2dyb3VwcyAhPT0gJ3VuZGVmaW5lZCcpKSB7XG4gICAgICAgICAgLy9hZGQgb3VyIG93biBhamF4IGNoZWNrIGFzIFgtUmVxdWVzdGVkLVdpdGggaXMgbm90IGFsd2F5cyByZWxpYWJsZVxuICAgICAgICAgIC8vYWpheF9mb3JtX2RhdGEgPSBuZXdfbmV3c2xldHRlcl9zZXR0aW5ncyArICcmYWpheHJlcXVlc3Q9dHJ1ZSZzdWJzY3JpYmUnO1xuXG4gICAgICAgICAgdmFyIHBvc3RfZGF0YSA9IHtcbiAgICAgICAgICAgIGVtYWlsOiAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgICAgZmlyc3RfbmFtZTogJChvcHRpb25zLmZpcnN0X25hbWVfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgICAgbGFzdF9uYW1lOiAkKG9wdGlvbnMubGFzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICAgIGdyb3Vwc19zdWJtaXR0ZWQ6IHt9XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIHBvc3RfZGF0YS5ncm91cHNfYXZhaWxhYmxlID0gJ2FsbCc7XG5cbiAgICAgICAgICBpZiAoICQoJ2lucHV0W25hbWU9XCJtYWlsY2hpbXBfc3RhdHVzXCJdJykubGVuZ3RoID4gMCApIHtcbiAgICAgICAgICAgIHBvc3RfZGF0YS5tYWlsY2hpbXBfc3RhdHVzID0gJCgnaW5wdXRbbmFtZT1cIm1haWxjaGltcF9zdGF0dXNcIl0nKS52YWwoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoICQoJ2lucHV0W25hbWU9XCJtYWlsY2hpbXBfdXNlcl9pZFwiXScpLmxlbmd0aCA+IDAgKSB7XG4gICAgICAgICAgICBwb3N0X2RhdGEubWFpbGNoaW1wX3VzZXJfaWQgPSAkKCdpbnB1dFtuYW1lPVwibWFpbGNoaW1wX3VzZXJfaWRcIl0nKS52YWwoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodHlwZW9mIG5ld3NsZXR0ZXJfZ3JvdXBzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgJC5lYWNoKG5ld3NsZXR0ZXJfZ3JvdXBzLCBmdW5jdGlvbihpbmRleCwgdmFsdWUpIHtcbiAgICAgICAgICAgICAgdmFyIGdyb3VwID0gJCh0aGlzKS52YWwoKTtcbiAgICAgICAgICAgICAgcG9zdF9kYXRhLmdyb3Vwc19zdWJtaXR0ZWRbaW5kZXhdID0gZ3JvdXA7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdXJsOiBvcHRpb25zLm1pbm5wb3N0X3Jvb3QgKyAnL3dwLWpzb24vbWlubnBvc3QtYXBpL3YyL21haWxjaGltcC91c2VyJyxcbiAgICAgICAgICAgIHR5cGU6ICdwb3N0JyxcbiAgICAgICAgICAgIGRhdGFUeXBlIDogJ2pzb24nLFxuICAgICAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04JyxcbiAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHBvc3RfZGF0YSlcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5kb25lKGZ1bmN0aW9uKHJlc3BvbnNlKSB7IC8vIHJlc3BvbnNlIGZyb20gdGhlIFBIUCBhY3Rpb25cbiAgICAgICAgICAgIHZhciBtZXNzYWdlID0gJyc7XG4gICAgICAgICAgICBpZiAoIHJlc3BvbnNlLnN1Y2Nlc3MgPT09IHRydWUgKSB7XG4gICAgICAgICAgICAgIC8qc3dpdGNoIChyZXNwb25zZS5kYXRhLnVzZXJfc3RhdHVzKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnZXhpc3RpbmcnOlxuICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9ICdUaGFua3MgZm9yIHVwZGF0aW5nIHlvdXIgZW1haWwgcHJlZmVyZW5jZXMuIFRoZXkgd2lsbCBnbyBpbnRvIGVmZmVjdCBpbW1lZGlhdGVseS4nO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnbmV3JzpcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnV2UgaGF2ZSBhZGRlZCB5b3UgdG8gdGhlIE1pbm5Qb3N0IG1haWxpbmcgbGlzdC4nO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAncGVuZGluZyc6XG4gICAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ1dlIGhhdmUgYWRkZWQgeW91IHRvIHRoZSBNaW5uUG9zdCBtYWlsaW5nIGxpc3QuIFlvdSB3aWxsIG5lZWQgdG8gY2xpY2sgdGhlIGNvbmZpcm1hdGlvbiBsaW5rIGluIHRoZSBlbWFpbCB3ZSBzZW50IHRvIGJlZ2luIHJlY2VpdmluZyBtZXNzYWdlcy4nO1xuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH0qL1xuICAgICAgICAgICAgICAvL2NvbmZpcm1mb3JtLmdldCgwKS5zdWJtaXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbmZpcm1mb3JtLmdldCgwKS5zdWJtaXQoKTtcbiAgICAgICAgICAgIC8vJCgnLm0taG9sZC1tZXNzYWdlJykuaHRtbCgnPGRpdiBjbGFzcz1cIm0tZm9ybS1tZXNzYWdlIG0tZm9ybS1tZXNzYWdlLWluZm9cIj4nICsgbWVzc2FnZSArICc8L2Rpdj4nKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5mYWlsKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAvLyB3ZSBzaG91bGQgcHV0IGFuIGFjdHVhbCBlcnJvciBtZXNzYWdlIGhlcmUgc29tZWRheSwgcHJvYmFibHlcbiAgICAgICAgICAgIC8vJCgnLm0taG9sZC1tZXNzYWdlJykuaHRtbCgnPGRpdiBjbGFzcz1cIm0tZm9ybS1tZXNzYWdlIG0tZm9ybS1tZXNzYWdlLWluZm9cIj5BbiBlcnJvciBoYXMgb2NjdXJlZC4gUGxlYXNlIHRyeSBhZ2Fpbi48L2Rpdj4nKTtcbiAgICAgICAgICAgIGNvbmZpcm1mb3JtLmdldCgwKS5zdWJtaXQoKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICB9IGVsc2UgeyAvLyBlbmQgcGFydCB3aGVyZSBzZXR0aW5ncyBjaGFuZ2VkXG4gICAgICAgICAgY29uZmlybWZvcm0uZ2V0KDApLnN1Ym1pdCgpO1xuICAgICAgICB9XG5cbiAgICAgIH0pO1xuICAgICAgLy9yZXR1cm4gZmFsc2U7XG4gICAgfSwgLy8gY29uZmlybU1lc3NhZ2VTdWJtaXRcblxuICB9OyAvLyBwbHVnaW4ucHJvdG90eXBlXG5cbiAgLy8gQSByZWFsbHkgbGlnaHR3ZWlnaHQgcGx1Z2luIHdyYXBwZXIgYXJvdW5kIHRoZSBjb25zdHJ1Y3RvcixcbiAgLy8gcHJldmVudGluZyBhZ2FpbnN0IG11bHRpcGxlIGluc3RhbnRpYXRpb25zXG4gICQuZm5bcGx1Z2luTmFtZV0gPSBmdW5jdGlvbiAoIG9wdGlvbnMgKSB7XG4gICAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbiAoKSB7XG4gICAgICBpZiAoISQuZGF0YSh0aGlzLCAncGx1Z2luXycgKyBwbHVnaW5OYW1lKSkge1xuICAgICAgICAkLmRhdGEodGhpcywgJ3BsdWdpbl8nICsgcGx1Z2luTmFtZSwgbmV3IFBsdWdpbiggdGhpcywgb3B0aW9ucyApKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfTtcblxufSkoIGpRdWVyeSwgd2luZG93LCBkb2N1bWVudCApOyJdfQ==
}(jQuery));
