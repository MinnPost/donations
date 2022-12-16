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
              'item_id': 'minnpost_' + level.toLowerCase() + '_membership',
              'item_name': 'MinnPost ' + level.charAt(0).toUpperCase() + level.slice(1) + ' Membership',
              'item_category': 'Donation',
              'item_brand': 'MinnPost',
              'item_variant': installment_period.charAt(0).toUpperCase() + installment_period.slice(1),
              'price': that.getTotalAmount(amount),
              'quantity': 1,
              'currency': 'USD',
              "affiliation": 'MinnPost'
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
                transaction_id: opp_id,
                // Transaction id - Type: string
                affiliation: 'MinnPost',
                // Store name - Type: string
                value: that.getTotalAmount(amount),
                // Total Revenue - Type: numeric
                currency: "USD",
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInZhbGlkLWZvcm0ubWluLmpzIiwibWlubnBvc3QuZ2l2aW5nLmpzIl0sIm5hbWVzIjpbInIiLCJlIiwibiIsInQiLCJvIiwiaSIsImYiLCJjIiwicmVxdWlyZSIsInUiLCJhIiwiRXJyb3IiLCJjb2RlIiwicCIsImV4cG9ydHMiLCJjYWxsIiwibGVuZ3RoIiwibW9kdWxlIiwiX3ZhbGlkRm9ybSIsIl92YWxpZEZvcm0yIiwiX2ludGVyb3BSZXF1aXJlRGVmYXVsdCIsIm9iaiIsIl9fZXNNb2R1bGUiLCJkZWZhdWx0Iiwid2luZG93IiwiVmFsaWRGb3JtIiwidG9nZ2xlSW52YWxpZENsYXNzIiwiaGFuZGxlQ3VzdG9tTWVzc2FnZXMiLCJoYW5kbGVDdXN0b21NZXNzYWdlRGlzcGxheSIsIk9iamVjdCIsImRlZmluZVByb3BlcnR5IiwidmFsdWUiLCJjbG9uZSIsImRlZmF1bHRzIiwiaW5zZXJ0QWZ0ZXIiLCJpbnNlcnRCZWZvcmUiLCJmb3JFYWNoIiwiZGVib3VuY2UiLCJjb3B5IiwiYXR0ciIsImhhc093blByb3BlcnR5IiwiZGVmYXVsdE9iamVjdCIsImsiLCJ1bmRlZmluZWQiLCJyZWZOb2RlIiwibm9kZVRvSW5zZXJ0Iiwic2libGluZyIsIm5leHRTaWJsaW5nIiwiX3BhcmVudCIsInBhcmVudE5vZGUiLCJwYXJlbnQiLCJhcHBlbmRDaGlsZCIsIml0ZW1zIiwiZm4iLCJtcyIsInRpbWVvdXQiLCJkZWJvdW5jZWRGbiIsImNsZWFyVGltZW91dCIsInNldFRpbWVvdXQiLCJ2YWxpZEZvcm0iLCJfdXRpbCIsImlucHV0IiwiaW52YWxpZENsYXNzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImNsYXNzTGlzdCIsImFkZCIsInZhbGlkaXR5IiwidmFsaWQiLCJyZW1vdmUiLCJlcnJvclByb3BzIiwiZ2V0Q3VzdG9tTWVzc2FnZSIsImN1c3RvbU1lc3NhZ2VzIiwibG9jYWxFcnJvclByb3BzIiwidHlwZSIsImNvbmNhdCIsInByb3AiLCJnZXRBdHRyaWJ1dGUiLCJjaGVja1ZhbGlkaXR5IiwibWVzc2FnZSIsInNldEN1c3RvbVZhbGlkaXR5Iiwib3B0aW9ucyIsInZhbGlkYXRpb25FcnJvckNsYXNzIiwidmFsaWRhdGlvbkVycm9yUGFyZW50Q2xhc3MiLCJlcnJvclBsYWNlbWVudCIsImluc2VydEVycm9yIiwiZXJyb3JOb2RlIiwicXVlcnlTZWxlY3RvciIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsInZhbGlkYXRpb25NZXNzYWdlIiwiY2xhc3NOYW1lIiwidGV4dENvbnRlbnQiLCJwcmV2ZW50RGVmYXVsdCIsImRlZmF1bHRPcHRpb25zIiwiZWxlbWVudCIsIm5vZGVOYW1lIiwiaW5wdXRzIiwidG9Mb3dlckNhc2UiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZm9jdXNJbnZhbGlkSW5wdXQiLCJ2YWxpZEZvcm1JbnB1dHMiLCJmb3JtIiwiZm9jdXNGaXJzdCIsImludmFsaWROb2RlIiwiZm9jdXMiLCIkIiwicGx1Z2luTmFtZSIsIlBsdWdpbiIsImV4dGVuZCIsIl9kZWZhdWx0cyIsIl9uYW1lIiwiaW5pdCIsInByb3RvdHlwZSIsInJlc2V0IiwiYW1vdW50IiwiZG9jdW1lbnRFbGVtZW50IiwicGFyc2VGbG9hdCIsImxldmVsX2Ftb3VudF9zZWxlY3RvciIsInRleHQiLCJvcmlnaW5hbF9hbW91bnQiLCJwYXJzZUludCIsIm9yaWdpbmFsX2Ftb3VudF9zZWxlY3RvciIsInZhbCIsInByb2Nlc3NpbmdfZmVlIiwiTWF0aCIsInJvdW5kIiwiZmVlX2Ftb3VudCIsInBvdyIsInRvRml4ZWQiLCJwcm9jZXNzaW5nX2ZlZV90ZXh0IiwiY3JlYXRlX2FjY291bnQiLCJidXR0b25fdGV4dCIsInBheV9idXR0b25fc2VsZWN0b3IiLCJzdHJpcGUiLCJTdHJpcGUiLCJzdHJpcGVfcHVibGlzaGFibGVfa2V5IiwiZWxlbWVudHMiLCJmb250cyIsImNzc1NyYyIsImRlYnVnIiwiYW5hbHl0aWNzVHJhY2tpbmciLCJhbW91bnRBc1JhZGlvIiwiYW1vdW50VXBkYXRlZCIsInBheV9jY19wcm9jZXNzaW5nX3NlbGVjdG9yIiwiY3JlZGl0Q2FyZFByb2Nlc3NpbmdGZWVzIiwiZG9uYXRlX2Zvcm1fc2VsZWN0b3IiLCJkb25hdGVBbm9ueW1vdXNseSIsImhvbm9yT3JNZW1vcnlUb2dnbGUiLCJvdXRzaWRlVW5pdGVkU3RhdGVzIiwic2hpcHBpbmdBZGRyZXNzIiwiYWxsb3dNaW5ucG9zdEFjY291bnQiLCJwYXltZW50UmVxdWVzdEJ1dHRvbiIsImNob29zZVBheW1lbnRNZXRob2QiLCJjcmVkaXRDYXJkRmllbGRzIiwidmFsaWRhdGVTZXR1cCIsImZvcm1TZXR1cCIsImNvbmZpcm1fZm9ybV9zZWxlY3RvciIsInNob3dOZXdzbGV0dGVyU2V0dGluZ3MiLCJjb25maXJtTWVzc2FnZVN1Ym1pdCIsImNvbnNvbGUiLCJsb2ciLCJkaXIiLCJhbmFseXRpY3NfdHlwZSIsInByb2dyZXNzIiwicHJvZ3Jlc3Nfc2VsZWN0b3IiLCJzdGVwIiwiYWN0aW9uIiwibmF2X2l0ZW1fY291bnQiLCJvcHBfaWQiLCJvcHBfaWRfc2VsZWN0b3IiLCJwb3N0X3B1cmNoYXNlIiwiZ2EiLCJpbmRleCIsImZpbmlzaF9zZWN0aW9uX3NlbGVjdG9yIiwiYW5hbHl0aWNzVHJhY2tpbmdTdGVwIiwiaW5zdGFsbG1lbnRfcGVyaW9kIiwibGV2ZWwiLCJ0aGF0IiwiaW5zdGFsbG1lbnRfcGVyaW9kX3NlbGVjdG9yIiwiZGF0YSIsImFqYXgiLCJtZXRob2QiLCJ1cmwiLCJkb25lIiwiY2hhckF0IiwidG9VcHBlckNhc2UiLCJzbGljZSIsInByb2R1Y3QiLCJnZXRUb3RhbEFtb3VudCIsImd0YWciLCJwYWdlX3RpdGxlIiwidGl0bGUiLCJwYWdlX3BhdGgiLCJsb2NhdGlvbiIsInBhdGhuYW1lIiwicGFnZSIsImRhdGFMYXllciIsInB1c2giLCJlY29tbWVyY2UiLCJldmVudCIsInRyYW5zYWN0aW9uX2lkIiwiYWZmaWxpYXRpb24iLCJjdXJyZW5jeSIsInNldFJhZGlvQW1vdW50IiwiY2hhbmdlIiwiZmllbGQiLCJzdHJpcGVfcGF5bWVudF90eXBlIiwiZ2V0U3RyaXBlUGF5bWVudFR5cGUiLCJpcyIsImNhbGN1bGF0ZUZlZXMiLCJzZXRGYWlyTWFya2V0VmFsdWUiLCJhbW91bnRfc2VsZWN0b3JfZmFpcl9tYXJrZXQiLCJhZGRpdGlvbmFsX2Ftb3VudF9maWVsZCIsImdpZnRfZGVsaXZlcnlfbWV0aG9kX3NlbGVjdG9yIiwidG90YWxfYW1vdW50IiwiYWRkaXRpb25hbF9hbW91bnQiLCJzaGlwcGluZ19hbW91bnRfZmllbGQiLCJzaGlwcGluZ19hbW91bnQiLCJhbW91bnRfc2VsZWN0b3IiLCJmYWlyX21hcmtldF92YWx1ZV9zZWxlY3RvciIsImZhaXJNYXJrZXRWYWx1ZSIsInNldFN0cmlwZVBheW1lbnRUeXBlIiwiZmVlcyIsImNyZWRpdENhcmRGZWVDaGVja2JveCIsIm9uIiwiYXBwZW5kIiwiZnVsbF9hbW91bnQiLCJhZGRDbGFzcyIsImZ1bGxfYW1vdW50X3NlbGVjdG9yIiwicGF5bWVudFJlcXVlc3QiLCJ1cGRhdGUiLCJ0b3RhbCIsImxhYmVsIiwidG9nZ2xlQW5vbnltb3VzIiwiYW5vbnltb3VzX3NlbGVjdG9yIiwibmFtZV9zZWxlY3RvciIsImhpZGUiLCJzaG93IiwiaG9ub3JPck1lbW9yeSIsImhvbm9yX29yX21lbW9yeV9jaG9vc2VyIiwiaG9ub3JfbWVtb3J5X2lucHV0X2dyb3VwIiwiaG9ub3JfdHlwZV9zZWxlY3RvciIsImhvbm9yX25hbWVfc2VsZWN0b3IiLCJzaG93X2JpbGxpbmdfY291bnRyeV9zZWxlY3RvciIsImNsaWNrIiwiY2hhbmdlRmllbGRzT3V0c2lkZVVTIiwic2hvd19zaGlwcGluZ19jb3VudHJ5X3NlbGVjdG9yIiwic2hpcHBpbmdfY291bnRyeV9zZWxlY3RvciIsImJpbGxpbmdfb3Jfc2hpcHBpbmciLCJ6aXBfcGFyZW50IiwiYmlsbGluZ196aXBfZmllbGRfc2VsZWN0b3IiLCJzdGF0ZV9wYXJlbnQiLCJiaWxsaW5nX3N0YXRlX2ZpZWxkX3NlbGVjdG9yIiwiYmlsbGluZ19jb3VudHJ5X3NlbGVjdG9yIiwic2hpcHBpbmdfemlwX2ZpZWxkX3NlbGVjdG9yIiwic2hpcHBpbmdfc3RhdGVfZmllbGRfc2VsZWN0b3IiLCJjaGFuZ2VGaWVsZHNJbnNpZGVVUyIsImh0bWwiLCJzaG93X3NoaXBwaW5nIiwidXNlX2Zvcl9zaGlwcGluZ19zZWxlY3RvciIsInNoaXBwaW5nX3NlbGVjdG9yIiwiYWNjb3VudF9leGlzdHMiLCJzaG93UGFzc3dvcmQiLCJzaG93UGFzc3dvcmRTdHJlbmd0aCIsInNwYW1FbWFpbCIsImVtYWlsX2ZpZWxkX3NlbGVjdG9yIiwidG9nZ2xlQWNjb3VudEZpZWxkcyIsImNyZWF0ZV9tcF9zZWxlY3RvciIsImRvbmVUeXBpbmciLCJlbWFpbCIsImNoZWNrTWlubnBvc3RBY2NvdW50IiwidHlwaW5nVGltZXIiLCJkb25lVHlwaW5nSW50ZXJ2YWwiLCJrZXl1cCIsImVtYWlsX2ZpZWxkIiwic3BhbUVycm9yQ29udGFpbmVyIiwicmVtb3ZlQ2xhc3MiLCJjcmVhdGVfYWNjb3VudF9zZWxlY3RvciIsImJlZm9yZSIsInBhc3N3b3JkX3NlbGVjdG9yIiwiJHN1Ym1pdCIsIiRjb250YWluZXIiLCIkZmllbGQiLCJzaG93X3Bhc3MiLCIkdG9nZ2xlIiwiY2hlY2tib3giLCIkYmVmb3JlIiwiYWZ0ZXIiLCJjaGVja1Bhc3N3b3JkU3RyZW5ndGgiLCIkcGFzc3dvcmQiLCIkc3RyZW5ndGhNZXRlciIsIiRzdHJlbmd0aFRleHQiLCJwYXNzd29yZCIsInJlc3VsdCIsInp4Y3ZibiIsInN0cmVuZ3RoIiwic2NvcmUiLCJ1c2VyIiwibWlubnBvc3Rfcm9vdCIsInN0YXR1cyIsInJlYXNvbiIsImNvdW50cnkiLCJwckJ1dHRvbiIsImNyZWF0ZSIsInN0eWxlIiwidGhlbWUiLCJoZWlnaHQiLCJjYW5NYWtlUGF5bWVudCIsInRoZW4iLCJtb3VudCIsImhpZGVQYXltZW50UmVxdWVzdCIsInN1cHBvcnRmb3JtIiwiZ2V0IiwicmVwb3J0VmFsaWRpdHkiLCJ0b2tlbkZpZWxkTmFtZSIsInRva2VuRmllbGQiLCJwYXltZW50TWV0aG9kIiwiaWQiLCJmb3JtUHJvY2Vzc29yIiwiaGlkZUVsZW1lbnQiLCJjaG9vc2VfcGF5bWVudCIsImNoZWNrZWRfaWQiLCJjaGVja2VkX3ZhbHVlIiwic2V0dXBQYXltZW50TWV0aG9kIiwiZWxlbWVudF9pZCIsImVsZW1lbnRfdmFsdWUiLCJhY2hGaWVsZHMiLCJyZW1vdmVBY2hGaWVsZHMiLCJwYXltZW50X21ldGhvZF9zZWxlY3RvciIsInBsYWlkX2xpbmsiLCJidXR0b25EaXNhYmxlZCIsImxpbmtIYW5kbGVyIiwiZGVzdHJveSIsImJhc2UiLCJpY29uQ29sb3IiLCJsaW5lSGVpZ2h0IiwiZm9udFdlaWdodCIsImZvbnRGYW1pbHkiLCJmb250U2l6ZSIsImludmFsaWQiLCJjb2xvciIsImNhcmROdW1iZXJFbGVtZW50Iiwic2hvd0ljb24iLCJjY19udW1fc2VsZWN0b3IiLCJjYXJkRXhwaXJ5RWxlbWVudCIsImNjX2V4cF9zZWxlY3RvciIsImNhcmRDdmNFbGVtZW50IiwiY2NfY3ZjX3NlbGVjdG9yIiwiYnJhbmQiLCJzdHJpcGVFcnJvckRpc3BsYXkiLCJlcnJvciIsImJ1dHRvblN0YXR1cyIsImZpbmQiLCJzaG93U3Bpbm5lciIsImhpZGVTcGlubmVyIiwiYmFua1Rva2VuRmllbGROYW1lIiwiYmFua1Rva2VuRmllbGQiLCJQbGFpZCIsImNsaWVudE5hbWUiLCJlbnYiLCJwbGFpZF9lbnYiLCJ0b2tlbiIsImdldEVsZW1lbnRCeUlkIiwib25TdWNjZXNzIiwicHVibGljX3Rva2VuIiwibWV0YWRhdGEiLCJKU09OIiwic3RyaW5naWZ5IiwiYWNjb3VudF9pZCIsImNvbnRlbnRUeXBlIiwicmVzcG9uc2UiLCJzdHJpcGVfYmFua19hY2NvdW50X3Rva2VuIiwicHJlcGVuZCIsImZhaWwiLCJyZXNldEZvcm1FcnJvcnMiLCJvcGVuIiwiYnV0dG9uIiwiZGlzYWJsZWQiLCJhY2hfd2FzX2luaXRpYWxpemVkIiwidGxpdGUiLCJyZW1vdmVBdHRyIiwiZ3JhdiIsImZvcm1zIiwiZm9ybV9zZWxlY3RvciIsInNjcm9sbFRvRm9ybUVycm9yIiwiZmlyc3QiLCJmaXJzdF9ob2xkZXIiLCJlbGVtZW50T2Zmc2V0Iiwib2Zmc2V0IiwidG9wIiwicGFnZU9mZnNldCIsInBhZ2VZT2Zmc2V0IiwiaW5uZXJIZWlnaHQiLCJzY3JvbGxUb3AiLCJzdWJtaXQiLCJiaWxsaW5nRGV0YWlscyIsImdlbmVyYXRlQmlsbGluZ0RldGFpbHMiLCJjcmVhdGVNaW5uUG9zdEFjY291bnQiLCJwYXltZW50X3R5cGUiLCJjcmVhdGVQYXltZW50TWV0aG9kIiwiYmFua1Rva2VuSGFuZGxlciIsInN1Ym1pdEZvcm1Pbmx5IiwidGhpc19zZWxlY3RvciIsIndoaWNoX2Vycm9yIiwiZW1wdHkiLCJhbmltYXRlIiwiZmlyc3RfbmFtZSIsImZpcnN0X25hbWVfZmllbGRfc2VsZWN0b3IiLCJsYXN0X25hbWUiLCJsYXN0X25hbWVfZmllbGRfc2VsZWN0b3IiLCJwYXNzd29yZF9maWVsZF9zZWxlY3RvciIsImNpdHkiLCJiaWxsaW5nX2NpdHlfZmllbGRfc2VsZWN0b3IiLCJzdGF0ZSIsInppcCIsImFkZHJlc3NEZXRhaWxzIiwiZnVsbF9uYW1lIiwibmFtZSIsInN0cmVldCIsImJpbGxpbmdfc3RyZWV0X2ZpZWxkX3NlbGVjdG9yIiwibGluZTEiLCJwb3N0YWxfY29kZSIsImNvdW50cnlfZmllbGRfdmFsdWUiLCJiaWxsaW5nX2NvdW50cnlfZmllbGRfc2VsZWN0b3IiLCJhZGRyZXNzIiwiY2FyZEVsZW1lbnQiLCJjYXJkIiwiYmlsbGluZ19kZXRhaWxzIiwiaGFuZGxlU2VydmVyRXJyb3IiLCJhamF4X3VybCIsImZldGNoIiwiaGVhZGVycyIsImJvZHkiLCJzZXJpYWxpemUiLCJqc29uIiwiaGFuZGxlU2VydmVyUmVzcG9uc2UiLCJjYWNoZSIsImVycm9ycyIsInJlcXVpcmVzX2FjdGlvbiIsInRoaXNfZmllbGQiLCJlYWNoIiwicGFyYW0iLCJkaXNwbGF5RXJyb3JNZXNzYWdlIiwic3RyaXBlRXJyb3JTZWxlY3RvciIsImZpZWxkUGFyZW50IiwicHJldiIsIm5ld3NsZXR0ZXJfZ3JvdXBfaHRtbCIsIm5ld3NsZXR0ZXJfZ3JvdXBfc2VsZWN0b3IiLCJnZXRfZGF0YSIsInNob3J0Y29kZSIsInBsYWNlbWVudCIsImdyb3VwX2ZpZWxkcyIsImNhdGVnb3J5IiwiY29udGFpbnMiLCJpdGVtIiwibWFpbGNoaW1wX3N0YXR1cyIsIm1haWxjaGltcF91c2VyX2lkIiwiZ3JvdXBzIiwiZXhpc3RpbmdfbmV3c2xldHRlcl9zZXR0aW5ncyIsImNvbmZpcm1mb3JtIiwibmV3c2xldHRlcl9ncm91cHMiLCJuZXdfbmV3c2xldHRlcl9zZXR0aW5ncyIsInBvc3RfZGF0YSIsImdyb3Vwc19zdWJtaXR0ZWQiLCJncm91cHNfYXZhaWxhYmxlIiwiZ3JvdXAiLCJkYXRhVHlwZSIsInN1Y2Nlc3MiLCJqUXVlcnkiXSwibWFwcGluZ3MiOiI7O0FBQUEsQ0FBQyxZQUFVO0VBQUMsU0FBU0EsQ0FBQyxDQUFDQyxDQUFDLEVBQUNDLENBQUMsRUFBQ0MsQ0FBQyxFQUFDO0lBQUMsU0FBU0MsQ0FBQyxDQUFDQyxDQUFDLEVBQUNDLENBQUMsRUFBQztNQUFDLElBQUcsQ0FBQ0osQ0FBQyxDQUFDRyxDQUFDLENBQUMsRUFBQztRQUFDLElBQUcsQ0FBQ0osQ0FBQyxDQUFDSSxDQUFDLENBQUMsRUFBQztVQUFDLElBQUlFLENBQUMsR0FBQyxVQUFVLElBQUUsT0FBT0MsT0FBTyxJQUFFQSxPQUFPO1VBQUMsSUFBRyxDQUFDRixDQUFDLElBQUVDLENBQUMsRUFBQyxPQUFPQSxDQUFDLENBQUNGLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztVQUFDLElBQUdJLENBQUMsRUFBQyxPQUFPQSxDQUFDLENBQUNKLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztVQUFDLElBQUlLLENBQUMsR0FBQyxJQUFJQyxLQUFLLENBQUMsc0JBQXNCLEdBQUNOLENBQUMsR0FBQyxHQUFHLENBQUM7VUFBQyxNQUFNSyxDQUFDLENBQUNFLElBQUksR0FB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QUksQ0FBQyxZQUFZO01BQzNCLElBQUksQ0FBQy9VLENBQUMsQ0FBQzBFLElBQUksQ0FBQyxJQUFJLEVBQUUsU0FBUyxHQUFHekUsVUFBVSxDQUFDLEVBQUU7UUFDekNELENBQUMsQ0FBQzBFLElBQUksQ0FBQyxJQUFJLEVBQUUsU0FBUyxHQUFHekUsVUFBVSxFQUFFLElBQUlDLE1BQU0sQ0FBRSxJQUFJLEVBQUUzQixPQUFPLENBQUUsQ0FBQztNQUNuRTtJQUNGLENBQUMsQ0FBQztFQUNKLENBQUM7QUFFSCxDQUFDLEVBQUdvWSxNQUFNLEVBQUU1YixNQUFNLEVBQUUrRCxRQUFRLENBQUUiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkoezE6W2Z1bmN0aW9uKHJlcXVpcmUsbW9kdWxlLGV4cG9ydHMpe1widXNlIHN0cmljdFwiO3ZhciBfdmFsaWRGb3JtPXJlcXVpcmUoXCIuL3NyYy92YWxpZC1mb3JtXCIpO3ZhciBfdmFsaWRGb3JtMj1faW50ZXJvcFJlcXVpcmVEZWZhdWx0KF92YWxpZEZvcm0pO2Z1bmN0aW9uIF9pbnRlcm9wUmVxdWlyZURlZmF1bHQob2JqKXtyZXR1cm4gb2JqJiZvYmouX19lc01vZHVsZT9vYmo6e2RlZmF1bHQ6b2JqfX13aW5kb3cuVmFsaWRGb3JtPV92YWxpZEZvcm0yLmRlZmF1bHQ7d2luZG93LlZhbGlkRm9ybS50b2dnbGVJbnZhbGlkQ2xhc3M9X3ZhbGlkRm9ybS50b2dnbGVJbnZhbGlkQ2xhc3M7d2luZG93LlZhbGlkRm9ybS5oYW5kbGVDdXN0b21NZXNzYWdlcz1fdmFsaWRGb3JtLmhhbmRsZUN1c3RvbU1lc3NhZ2VzO3dpbmRvdy5WYWxpZEZvcm0uaGFuZGxlQ3VzdG9tTWVzc2FnZURpc3BsYXk9X3ZhbGlkRm9ybS5oYW5kbGVDdXN0b21NZXNzYWdlRGlzcGxheX0se1wiLi9zcmMvdmFsaWQtZm9ybVwiOjN9XSwyOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6dHJ1ZX0pO2V4cG9ydHMuY2xvbmU9Y2xvbmU7ZXhwb3J0cy5kZWZhdWx0cz1kZWZhdWx0cztleHBvcnRzLmluc2VydEFmdGVyPWluc2VydEFmdGVyO2V4cG9ydHMuaW5zZXJ0QmVmb3JlPWluc2VydEJlZm9yZTtleHBvcnRzLmZvckVhY2g9Zm9yRWFjaDtleHBvcnRzLmRlYm91bmNlPWRlYm91bmNlO2Z1bmN0aW9uIGNsb25lKG9iail7dmFyIGNvcHk9e307Zm9yKHZhciBhdHRyIGluIG9iail7aWYob2JqLmhhc093blByb3BlcnR5KGF0dHIpKWNvcHlbYXR0cl09b2JqW2F0dHJdfXJldHVybiBjb3B5fWZ1bmN0aW9uIGRlZmF1bHRzKG9iaixkZWZhdWx0T2JqZWN0KXtvYmo9Y2xvbmUob2JqfHx7fSk7Zm9yKHZhciBrIGluIGRlZmF1bHRPYmplY3Qpe2lmKG9ialtrXT09PXVuZGVmaW5lZClvYmpba109ZGVmYXVsdE9iamVjdFtrXX1yZXR1cm4gb2JqfWZ1bmN0aW9uIGluc2VydEFmdGVyKHJlZk5vZGUsbm9kZVRvSW5zZXJ0KXt2YXIgc2libGluZz1yZWZOb2RlLm5leHRTaWJsaW5nO2lmKHNpYmxpbmcpe3ZhciBfcGFyZW50PXJlZk5vZGUucGFyZW50Tm9kZTtfcGFyZW50Lmluc2VydEJlZm9yZShub2RlVG9JbnNlcnQsc2libGluZyl9ZWxzZXtwYXJlbnQuYXBwZW5kQ2hpbGQobm9kZVRvSW5zZXJ0KX19ZnVuY3Rpb24gaW5zZXJ0QmVmb3JlKHJlZk5vZGUsbm9kZVRvSW5zZXJ0KXt2YXIgcGFyZW50PXJlZk5vZGUucGFyZW50Tm9kZTtwYXJlbnQuaW5zZXJ0QmVmb3JlKG5vZGVUb0luc2VydCxyZWZOb2RlKX1mdW5jdGlvbiBmb3JFYWNoKGl0ZW1zLGZuKXtpZighaXRlbXMpcmV0dXJuO2lmKGl0ZW1zLmZvckVhY2gpe2l0ZW1zLmZvckVhY2goZm4pfWVsc2V7Zm9yKHZhciBpPTA7aTxpdGVtcy5sZW5ndGg7aSsrKXtmbihpdGVtc1tpXSxpLGl0ZW1zKX19fWZ1bmN0aW9uIGRlYm91bmNlKG1zLGZuKXt2YXIgdGltZW91dD12b2lkIDA7dmFyIGRlYm91bmNlZEZuPWZ1bmN0aW9uIGRlYm91bmNlZEZuKCl7Y2xlYXJUaW1lb3V0KHRpbWVvdXQpO3RpbWVvdXQ9c2V0VGltZW91dChmbixtcyl9O3JldHVybiBkZWJvdW5jZWRGbn19LHt9XSwzOltmdW5jdGlvbihyZXF1aXJlLG1vZHVsZSxleHBvcnRzKXtcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6dHJ1ZX0pO2V4cG9ydHMudG9nZ2xlSW52YWxpZENsYXNzPXRvZ2dsZUludmFsaWRDbGFzcztleHBvcnRzLmhhbmRsZUN1c3RvbU1lc3NhZ2VzPWhhbmRsZUN1c3RvbU1lc3NhZ2VzO2V4cG9ydHMuaGFuZGxlQ3VzdG9tTWVzc2FnZURpc3BsYXk9aGFuZGxlQ3VzdG9tTWVzc2FnZURpc3BsYXk7ZXhwb3J0cy5kZWZhdWx0PXZhbGlkRm9ybTt2YXIgX3V0aWw9cmVxdWlyZShcIi4vdXRpbFwiKTtmdW5jdGlvbiB0b2dnbGVJbnZhbGlkQ2xhc3MoaW5wdXQsaW52YWxpZENsYXNzKXtpbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiaW52YWxpZFwiLGZ1bmN0aW9uKCl7aW5wdXQuY2xhc3NMaXN0LmFkZChpbnZhbGlkQ2xhc3MpfSk7aW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsZnVuY3Rpb24oKXtpZihpbnB1dC52YWxpZGl0eS52YWxpZCl7aW5wdXQuY2xhc3NMaXN0LnJlbW92ZShpbnZhbGlkQ2xhc3MpfX0pfXZhciBlcnJvclByb3BzPVtcImJhZElucHV0XCIsXCJwYXR0ZXJuTWlzbWF0Y2hcIixcInJhbmdlT3ZlcmZsb3dcIixcInJhbmdlVW5kZXJmbG93XCIsXCJzdGVwTWlzbWF0Y2hcIixcInRvb0xvbmdcIixcInRvb1Nob3J0XCIsXCJ0eXBlTWlzbWF0Y2hcIixcInZhbHVlTWlzc2luZ1wiLFwiY3VzdG9tRXJyb3JcIl07ZnVuY3Rpb24gZ2V0Q3VzdG9tTWVzc2FnZShpbnB1dCxjdXN0b21NZXNzYWdlcyl7Y3VzdG9tTWVzc2FnZXM9Y3VzdG9tTWVzc2FnZXN8fHt9O3ZhciBsb2NhbEVycm9yUHJvcHM9W2lucHV0LnR5cGUrXCJNaXNtYXRjaFwiXS5jb25jYXQoZXJyb3JQcm9wcyk7dmFyIHZhbGlkaXR5PWlucHV0LnZhbGlkaXR5O2Zvcih2YXIgaT0wO2k8bG9jYWxFcnJvclByb3BzLmxlbmd0aDtpKyspe3ZhciBwcm9wPWxvY2FsRXJyb3JQcm9wc1tpXTtpZih2YWxpZGl0eVtwcm9wXSl7cmV0dXJuIGlucHV0LmdldEF0dHJpYnV0ZShcImRhdGEtXCIrcHJvcCl8fGN1c3RvbU1lc3NhZ2VzW3Byb3BdfX19ZnVuY3Rpb24gaGFuZGxlQ3VzdG9tTWVzc2FnZXMoaW5wdXQsY3VzdG9tTWVzc2FnZXMpe2Z1bmN0aW9uIGNoZWNrVmFsaWRpdHkoKXt2YXIgbWVzc2FnZT1pbnB1dC52YWxpZGl0eS52YWxpZD9udWxsOmdldEN1c3RvbU1lc3NhZ2UoaW5wdXQsY3VzdG9tTWVzc2FnZXMpO2lucHV0LnNldEN1c3RvbVZhbGlkaXR5KG1lc3NhZ2V8fFwiXCIpfWlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLGNoZWNrVmFsaWRpdHkpO2lucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnZhbGlkXCIsY2hlY2tWYWxpZGl0eSl9ZnVuY3Rpb24gaGFuZGxlQ3VzdG9tTWVzc2FnZURpc3BsYXkoaW5wdXQsb3B0aW9ucyl7dmFyIHZhbGlkYXRpb25FcnJvckNsYXNzPW9wdGlvbnMudmFsaWRhdGlvbkVycm9yQ2xhc3MsdmFsaWRhdGlvbkVycm9yUGFyZW50Q2xhc3M9b3B0aW9ucy52YWxpZGF0aW9uRXJyb3JQYXJlbnRDbGFzcyxlcnJvclBsYWNlbWVudD1vcHRpb25zLmVycm9yUGxhY2VtZW50O2Z1bmN0aW9uIGNoZWNrVmFsaWRpdHkob3B0aW9ucyl7dmFyIGluc2VydEVycm9yPW9wdGlvbnMuaW5zZXJ0RXJyb3I7dmFyIHBhcmVudE5vZGU9aW5wdXQucGFyZW50Tm9kZTt2YXIgZXJyb3JOb2RlPXBhcmVudE5vZGUucXVlcnlTZWxlY3RvcihcIi5cIit2YWxpZGF0aW9uRXJyb3JDbGFzcyl8fGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7aWYoIWlucHV0LnZhbGlkaXR5LnZhbGlkJiZpbnB1dC52YWxpZGF0aW9uTWVzc2FnZSl7ZXJyb3JOb2RlLmNsYXNzTmFtZT12YWxpZGF0aW9uRXJyb3JDbGFzcztlcnJvck5vZGUudGV4dENvbnRlbnQ9aW5wdXQudmFsaWRhdGlvbk1lc3NhZ2U7aWYoaW5zZXJ0RXJyb3Ipe2Vycm9yUGxhY2VtZW50PT09XCJiZWZvcmVcIj8oMCxfdXRpbC5pbnNlcnRCZWZvcmUpKGlucHV0LGVycm9yTm9kZSk6KDAsX3V0aWwuaW5zZXJ0QWZ0ZXIpKGlucHV0LGVycm9yTm9kZSk7cGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKHZhbGlkYXRpb25FcnJvclBhcmVudENsYXNzKX19ZWxzZXtwYXJlbnROb2RlLmNsYXNzTGlzdC5yZW1vdmUodmFsaWRhdGlvbkVycm9yUGFyZW50Q2xhc3MpO2Vycm9yTm9kZS5yZW1vdmUoKX19aW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsZnVuY3Rpb24oKXtjaGVja1ZhbGlkaXR5KHtpbnNlcnRFcnJvcjpmYWxzZX0pfSk7aW5wdXQuYWRkRXZlbnRMaXN0ZW5lcihcImludmFsaWRcIixmdW5jdGlvbihlKXtlLnByZXZlbnREZWZhdWx0KCk7Y2hlY2tWYWxpZGl0eSh7aW5zZXJ0RXJyb3I6dHJ1ZX0pfSl9dmFyIGRlZmF1bHRPcHRpb25zPXtpbnZhbGlkQ2xhc3M6XCJpbnZhbGlkXCIsdmFsaWRhdGlvbkVycm9yQ2xhc3M6XCJ2YWxpZGF0aW9uLWVycm9yXCIsdmFsaWRhdGlvbkVycm9yUGFyZW50Q2xhc3M6XCJoYXMtdmFsaWRhdGlvbi1lcnJvclwiLGN1c3RvbU1lc3NhZ2VzOnt9LGVycm9yUGxhY2VtZW50OlwiYmVmb3JlXCJ9O2Z1bmN0aW9uIHZhbGlkRm9ybShlbGVtZW50LG9wdGlvbnMpe2lmKCFlbGVtZW50fHwhZWxlbWVudC5ub2RlTmFtZSl7dGhyb3cgbmV3IEVycm9yKFwiRmlyc3QgYXJnIHRvIHZhbGlkRm9ybSBtdXN0IGJlIGEgZm9ybSwgaW5wdXQsIHNlbGVjdCwgb3IgdGV4dGFyZWFcIil9dmFyIGlucHV0cz12b2lkIDA7dmFyIHR5cGU9ZWxlbWVudC5ub2RlTmFtZS50b0xvd2VyQ2FzZSgpO29wdGlvbnM9KDAsX3V0aWwuZGVmYXVsdHMpKG9wdGlvbnMsZGVmYXVsdE9wdGlvbnMpO2lmKHR5cGU9PT1cImZvcm1cIil7aW5wdXRzPWVsZW1lbnQucXVlcnlTZWxlY3RvckFsbChcImlucHV0LCBzZWxlY3QsIHRleHRhcmVhXCIpO2ZvY3VzSW52YWxpZElucHV0KGVsZW1lbnQsaW5wdXRzKX1lbHNlIGlmKHR5cGU9PT1cImlucHV0XCJ8fHR5cGU9PT1cInNlbGVjdFwifHx0eXBlPT09XCJ0ZXh0YXJlYVwiKXtpbnB1dHM9W2VsZW1lbnRdfWVsc2V7dGhyb3cgbmV3IEVycm9yKFwiT25seSBmb3JtLCBpbnB1dCwgc2VsZWN0LCBvciB0ZXh0YXJlYSBlbGVtZW50cyBhcmUgc3VwcG9ydGVkXCIpfXZhbGlkRm9ybUlucHV0cyhpbnB1dHMsb3B0aW9ucyl9ZnVuY3Rpb24gZm9jdXNJbnZhbGlkSW5wdXQoZm9ybSxpbnB1dHMpe3ZhciBmb2N1c0ZpcnN0PSgwLF91dGlsLmRlYm91bmNlKSgxMDAsZnVuY3Rpb24oKXt2YXIgaW52YWxpZE5vZGU9Zm9ybS5xdWVyeVNlbGVjdG9yKFwiOmludmFsaWRcIik7aWYoaW52YWxpZE5vZGUpaW52YWxpZE5vZGUuZm9jdXMoKX0pOygwLF91dGlsLmZvckVhY2gpKGlucHV0cyxmdW5jdGlvbihpbnB1dCl7cmV0dXJuIGlucHV0LmFkZEV2ZW50TGlzdGVuZXIoXCJpbnZhbGlkXCIsZm9jdXNGaXJzdCl9KX1mdW5jdGlvbiB2YWxpZEZvcm1JbnB1dHMoaW5wdXRzLG9wdGlvbnMpe3ZhciBpbnZhbGlkQ2xhc3M9b3B0aW9ucy5pbnZhbGlkQ2xhc3MsY3VzdG9tTWVzc2FnZXM9b3B0aW9ucy5jdXN0b21NZXNzYWdlczsoMCxfdXRpbC5mb3JFYWNoKShpbnB1dHMsZnVuY3Rpb24oaW5wdXQpe3RvZ2dsZUludmFsaWRDbGFzcyhpbnB1dCxpbnZhbGlkQ2xhc3MpO2hhbmRsZUN1c3RvbU1lc3NhZ2VzKGlucHV0LGN1c3RvbU1lc3NhZ2VzKTtoYW5kbGVDdXN0b21NZXNzYWdlRGlzcGxheShpbnB1dCxvcHRpb25zKX0pfX0se1wiLi91dGlsXCI6Mn1dfSx7fSxbMV0pOyIsIi8vIE1pbm5Qb3N0IEdpdmluZyBwbHVnaW5cbi8vIHRoZSBzZW1pLWNvbG9uIGJlZm9yZSBmdW5jdGlvbiBpbnZvY2F0aW9uIGlzIGEgc2FmZXR5IG5ldCBhZ2FpbnN0IGNvbmNhdGVuYXRlZFxuLy8gc2NyaXB0cyBhbmQvb3Igb3RoZXIgcGx1Z2lucyB3aGljaCBtYXkgbm90IGJlIGNsb3NlZCBwcm9wZXJseS5cbjsoZnVuY3Rpb24gKCAkLCB3aW5kb3csIGRvY3VtZW50LCB1bmRlZmluZWQgKSB7XG5cbiAgLy8gdW5kZWZpbmVkIGlzIHVzZWQgaGVyZSBhcyB0aGUgdW5kZWZpbmVkIGdsb2JhbCB2YXJpYWJsZSBpbiBFQ01BU2NyaXB0IDMgaXNcbiAgLy8gbXV0YWJsZSAoaWUuIGl0IGNhbiBiZSBjaGFuZ2VkIGJ5IHNvbWVvbmUgZWxzZSkuIHVuZGVmaW5lZCBpc24ndCByZWFsbHkgYmVpbmdcbiAgLy8gcGFzc2VkIGluIHNvIHdlIGNhbiBlbnN1cmUgdGhlIHZhbHVlIG9mIGl0IGlzIHRydWx5IHVuZGVmaW5lZC4gSW4gRVM1LCB1bmRlZmluZWRcbiAgLy8gY2FuIG5vIGxvbmdlciBiZSBtb2RpZmllZC5cblxuICAvLyB3aW5kb3cgYW5kIGRvY3VtZW50IGFyZSBwYXNzZWQgdGhyb3VnaCBhcyBsb2NhbCB2YXJpYWJsZSByYXRoZXIgdGhhbiBnbG9iYWxcbiAgLy8gYXMgdGhpcyAoc2xpZ2h0bHkpIHF1aWNrZW5zIHRoZSByZXNvbHV0aW9uIHByb2Nlc3MgYW5kIGNhbiBiZSBtb3JlIGVmZmljaWVudGx5XG4gIC8vIG1pbmlmaWVkIChlc3BlY2lhbGx5IHdoZW4gYm90aCBhcmUgcmVndWxhcmx5IHJlZmVyZW5jZWQgaW4geW91ciBwbHVnaW4pLlxuXG4gIC8vIENyZWF0ZSB0aGUgZGVmYXVsdHMgb25jZVxuICB2YXIgcGx1Z2luTmFtZSA9ICdtaW5ucG9zdF9naXZpbmcnLFxuICBkZWZhdWx0cyA9IHtcbiAgICAnZGVidWcnIDogZmFsc2UsIC8vIHRoaXMgY2FuIGJlIHNldCB0byB0cnVlIG9uIHBhZ2UgbGV2ZWwgb3B0aW9uc1xuICAgICdzdHJpcGVfcHVibGlzaGFibGVfa2V5JyA6ICcnLFxuICAgICdwbGFpZF9lbnYnIDogJycsXG4gICAgJ3BsYWlkX2xpbmsnIDogJyNhdXRob3JpemUtYWNoJyxcbiAgICAnbWlubnBvc3Rfcm9vdCcgOiAnaHR0cHM6Ly93d3cubWlubnBvc3QuY29tJyxcbiAgICAnYW5hbHl0aWNzX3R5cGUnIDogJycsXG4gICAgJ3Byb2dyZXNzX3NlbGVjdG9yJyA6ICcubS1zdXBwb3J0LXByb2dyZXNzJyxcbiAgICAnZm9ybV9zZWxlY3RvcicgOiAnLm0tZm9ybScsXG4gICAgJ2RvbmF0ZV9mb3JtX3NlbGVjdG9yJzogJyNkb25hdGUnLFxuICAgICdjb25maXJtX2Zvcm1fc2VsZWN0b3InIDogJyNjb25maXJtJyxcbiAgICAnZmluaXNoX3NlY3Rpb25fc2VsZWN0b3InIDogJyNwYW5lbC0tY29uZmlybWF0aW9uJyxcbiAgICAncGF5X2NjX3Byb2Nlc3Npbmdfc2VsZWN0b3InIDogJ2lucHV0W25hbWU9XCJwYXlfZmVlc1wiXScsXG4gICAgJ2ZlZV9hbW91bnQnIDogJy5wcm9jZXNzaW5nLWFtb3VudCcsXG4gICAgJ2xldmVsX2Ftb3VudF9zZWxlY3RvcicgOiAnI3BhbmVsLS1wYXkgLmFtb3VudCAubGV2ZWwtYW1vdW50JywgLy8gd2UgY2FuIG1heWJlIGdldCByaWQgb2YgdGhpc1xuICAgICdvcmlnaW5hbF9hbW91bnRfc2VsZWN0b3InIDogJ1tuYW1lPVwiYW1vdW50XCJdJyxcbiAgICAnZ2lmdF9kZWxpdmVyeV9tZXRob2Rfc2VsZWN0b3InIDogJ1tuYW1lPVwiZ2lmdF9kZWxpdmVyeV9tZXRob2RcIl0nLFxuICAgICdmYWlyX21hcmtldF92YWx1ZV9zZWxlY3RvcicgOiAnI2ZhaXJfbWFya2V0X3ZhbHVlJyxcbiAgICAnZnVsbF9hbW91bnRfc2VsZWN0b3InIDogJy5mdWxsLWFtb3VudCcsXG4gICAgJ2luc3RhbGxtZW50X3BlcmlvZF9zZWxlY3RvcicgOiAnW25hbWU9XCJpbnN0YWxsbWVudF9wZXJpb2RcIl0nLFxuICAgICduYW1lX3NlbGVjdG9yJyA6ICcubS1mb3JtLWl0ZW0tZGlzcGxheS1uYW1lJyxcbiAgICAnaW5faG9ub3Jfb3JfbWVtb3J5X2ZpZWxkX3NlbGVjdG9yJyA6ICcubS1mb3JtLWl0ZW0taG9ub3ItbWVtb3J5JyxcbiAgICAnaG9ub3Jfb3JfbWVtb3J5X2Nob29zZXInIDogJ2lucHV0W25hbWU9XCJpbl9ob25vcl9vcl9tZW1vcnlcIl0nLCAvLyByYWRpbyBmaWVsZHNcbiAgICAnaG9ub3JfdHlwZV9zZWxlY3RvcicgOiAnLmEtaG9ub3ItdHlwZScsIC8vIHNwYW4gaW5zaWRlIGxhYmVsXG4gICAgJ2hvbm9yX21lbW9yeV9pbnB1dF9ncm91cCcgOiAnLmEtaG9ub3Itb3ItbWVtb3J5JywgLy8gaG9sZHMgdGhlIGZvcm0gZmllbGRcbiAgICAnYW5vbnltb3VzX3NlbGVjdG9yJyA6ICcjYW5vbnltb3VzJyxcbiAgICAnc2hvd19iaWxsaW5nX2NvdW50cnlfc2VsZWN0b3InIDogJyNiaWxsaW5nX3Nob3dfY291bnRyeScsXG4gICAgJ2JpbGxpbmdfY291bnRyeV9zZWxlY3RvcicgOiAnLm0tZm9ybS1pdGVtLWNvdW50cnknLFxuICAgICdzaG93X3NoaXBwaW5nX2NvdW50cnlfc2VsZWN0b3InIDogJyNzaGlwcGluZ19zaG93X2NvdW50cnknLFxuICAgICdzaGlwcGluZ19jb3VudHJ5X3NlbGVjdG9yJyA6ICcubS1mb3JtLWl0ZW0tc2hpcHBpbmctY291bnRyeScsXG4gICAgJ3NoaXBwaW5nX2FkZHJlc3Nfc2VsZWN0b3InIDogJy5tLWZvcm0taXRlbS1zaGlwcGluZy1hZGRyZXNzJyxcbiAgICAndXNlX2Zvcl9zaGlwcGluZ19zZWxlY3RvcicgOiAnI3VzZWZvcnNoaXBwaW5nJyxcbiAgICAnZW1haWxfZmllbGRfc2VsZWN0b3InIDogJyNlbWFpbCcsXG4gICAgJ3Bhc3N3b3JkX2ZpZWxkX3NlbGVjdG9yJyA6ICcjcGFzc3dvcmQnLFxuICAgICdmaXJzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yJyA6ICcjZmlyc3RfbmFtZScsXG4gICAgJ2xhc3RfbmFtZV9maWVsZF9zZWxlY3RvcicgOiAnI2xhc3RfbmFtZScsXG4gICAgJ2JpbGxpbmdfc3RyZWV0X2ZpZWxkX3NlbGVjdG9yJyA6ICcjYmlsbGluZ19zdHJlZXQnLFxuICAgICdiaWxsaW5nX2NpdHlfZmllbGRfc2VsZWN0b3InIDogJyNiaWxsaW5nX2NpdHknLFxuICAgICdiaWxsaW5nX3N0YXRlX2ZpZWxkX3NlbGVjdG9yJyA6ICcjYmlsbGluZ19zdGF0ZScsXG4gICAgJ2JpbGxpbmdfemlwX2ZpZWxkX3NlbGVjdG9yJzogJyNiaWxsaW5nX3ppcCcsXG4gICAgJ2JpbGxpbmdfY291bnRyeV9maWVsZF9zZWxlY3RvcicgOiAnI2JpbGxpbmdfY291bnRyeScsXG4gICAgJ3NoaXBwaW5nX3N0YXRlX2ZpZWxkX3NlbGVjdG9yJyA6ICcjc2hpcHBpbmdfc3RhdGUnLFxuICAgICdzaGlwcGluZ196aXBfZmllbGRfc2VsZWN0b3InOiAnI3NoaXBwaW5nX3ppcCcsXG4gICAgJ3NoaXBwaW5nX2NvdW50cnlfZmllbGRfc2VsZWN0b3InIDogJyNzaGlwcGluZ19jb3VudHJ5JyxcbiAgICAnY3JlYXRlX21wX3NlbGVjdG9yJyA6ICcjY3JlYXRlbXBhY2NvdW50JyxcbiAgICAncGFzc3dvcmRfc2VsZWN0b3InIDogJy5tLWZvcm0taXRlbS1wYXNzd29yZCcsXG4gICAgJ2FkZGl0aW9uYWxfYW1vdW50X2ZpZWxkJyA6ICcjYWRkaXRpb25hbF9kb25hdGlvbicsXG4gICAgJ3NoaXBwaW5nX2Ftb3VudF9maWVsZCc6ICdbbmFtZT1cInNoaXBwaW5nX2Nvc3RcIl0nLFxuICAgICdzaGlwcGluZ19zZWxlY3RvcicgOiAnZmllbGRzZXQubS1zaGlwcGluZy1pbmZvcm1hdGlvbicsXG4gICAgJ2Nob29zZV9wYXltZW50JyA6ICcjY2hvb3NlLXBheW1lbnQtbWV0aG9kJyxcbiAgICAncGF5bWVudF9tZXRob2Rfc2VsZWN0b3InIDogJy5wYXltZW50LW1ldGhvZCcsXG4gICAgJ2NjX251bV9zZWxlY3RvcicgOiAnI2NhcmQtbnVtYmVyJyxcbiAgICAnY2NfZXhwX3NlbGVjdG9yJyA6ICcjY2FyZC1leHBpcnknLFxuICAgICdjY19jdmNfc2VsZWN0b3InIDogJyNjYXJkLWN2YycsXG4gICAgJ3BheV9idXR0b25fc2VsZWN0b3InIDogJy5hLWJ1dHRvbi1wYXknLFxuICAgICdvcHBfaWRfc2VsZWN0b3InIDogJyNsb2NrX2tleScsIC8vIHdlIHVzZSB0aGlzIHZhbHVlIGFzIHRoZSBHb29nbGUgQW5hbHl0aWNzIHRyYW5zYWN0aW9uIElEXG4gICAgJ25ld3NsZXR0ZXJfZ3JvdXBfc2VsZWN0b3InIDogJy5zdXBwb3J0LW5ld3NsZXR0ZXJzJ1xuICB9OyAvLyBlbmQgZGVmYXVsdHNcblxuICAvLyBUaGUgYWN0dWFsIHBsdWdpbiBjb25zdHJ1Y3RvclxuICBmdW5jdGlvbiBQbHVnaW4oIGVsZW1lbnQsIG9wdGlvbnMgKSB7XG5cbiAgICB0aGlzLmVsZW1lbnQgPSBlbGVtZW50O1xuXG4gICAgLy8galF1ZXJ5IGhhcyBhbiBleHRlbmQgbWV0aG9kIHdoaWNoIG1lcmdlcyB0aGUgY29udGVudHMgb2YgdHdvIG9yXG4gICAgLy8gbW9yZSBvYmplY3RzLCBzdG9yaW5nIHRoZSByZXN1bHQgaW4gdGhlIGZpcnN0IG9iamVjdC4gVGhlIGZpcnN0IG9iamVjdFxuICAgIC8vIGlzIGdlbmVyYWxseSBlbXB0eSBhcyB3ZSBkb24ndCB3YW50IHRvIGFsdGVyIHRoZSBkZWZhdWx0IG9wdGlvbnMgZm9yXG4gICAgLy8gZnV0dXJlIGluc3RhbmNlcyBvZiB0aGUgcGx1Z2luXG4gICAgdGhpcy5vcHRpb25zID0gJC5leHRlbmQoIHt9LCBkZWZhdWx0cywgb3B0aW9ucyApO1xuXG4gICAgdGhpcy5fZGVmYXVsdHMgPSBkZWZhdWx0cztcbiAgICB0aGlzLl9uYW1lID0gcGx1Z2luTmFtZTtcblxuICAgIHRoaXMuaW5pdCgpO1xuICB9IC8vIGVuZCBjb25zdHJ1Y3RvclxuXG4gIFBsdWdpbi5wcm90b3R5cGUgPSB7XG5cbiAgICBpbml0OiBmdW5jdGlvbihyZXNldCwgYW1vdW50KSB7XG5cbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSggJ25vLWpzJyApO1xuICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCAnanMnICk7XG5cbiAgICAgIC8vIFBsYWNlIGluaXRpYWxpemF0aW9uIGxvZ2ljIGhlcmVcbiAgICAgIC8vIFlvdSBhbHJlYWR5IGhhdmUgYWNjZXNzIHRvIHRoZSBET00gZWxlbWVudCBhbmRcbiAgICAgIC8vIHRoZSBvcHRpb25zIHZpYSB0aGUgaW5zdGFuY2UsIGUuZy4gdGhpcy5lbGVtZW50XG4gICAgICAvLyBhbmQgdGhpcy5vcHRpb25zXG4gICAgICAvLyB5b3UgY2FuIGFkZCBtb3JlIGZ1bmN0aW9ucyBsaWtlIHRoZSBvbmUgYmVsb3cgYW5kXG4gICAgICAvLyBjYWxsIHRoZW0gbGlrZSBzbzogdGhpcy55b3VyT3RoZXJGdW5jdGlvbih0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucykuXG5cbiAgICAgIC8vIG1vZGlmeSBvcHRpb25zIGFzIG5lZWRlZFxuICAgICAgLy92YXIgdGhpcy5vcHRpb25zLmFtb3VudCA9ICcnO1xuICAgICAgaWYgKHJlc2V0ICE9PSB0cnVlKSB7XG4gICAgICAgIHRoaXMub3B0aW9ucy5hbW91bnQgPSBwYXJzZUZsb2F0KCQodGhpcy5vcHRpb25zLmxldmVsX2Ftb3VudF9zZWxlY3RvciwgdGhpcy5lbGVtZW50KS50ZXh0KCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5vcHRpb25zLmFtb3VudCA9IGFtb3VudDtcbiAgICAgIH1cbiAgICAgIHRoaXMub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQgICAgID0gcGFyc2VJbnQoJCh0aGlzLm9wdGlvbnMub3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yLCB0aGlzLmVsZW1lbnQpLnZhbCgpLCAxMCk7XG4gICAgICB0aGlzLm9wdGlvbnMucHJvY2Vzc2luZ19mZWUgICAgICA9IChNYXRoLnJvdW5kKHBhcnNlRmxvYXQodGhpcy5vcHRpb25zLmZlZV9hbW91bnQpKk1hdGgucG93KDEwLDIpKS9NYXRoLnBvdygxMCwyKSkudG9GaXhlZCgyKTtcbiAgICAgIHRoaXMub3B0aW9ucy5wcm9jZXNzaW5nX2ZlZV90ZXh0ID0gdGhpcy5vcHRpb25zLnByb2Nlc3NpbmdfZmVlO1xuICAgICAgdGhpcy5vcHRpb25zLmNyZWF0ZV9hY2NvdW50ICAgICAgPSBmYWxzZTtcblxuICAgICAgdmFyIGJ1dHRvbl90ZXh0ID0gJCh0aGlzLm9wdGlvbnMucGF5X2J1dHRvbl9zZWxlY3RvcikudGV4dCgpO1xuICAgICAgdGhpcy5vcHRpb25zLmJ1dHRvbl90ZXh0ID0gYnV0dG9uX3RleHQ7XG5cbiAgICAgIHRoaXMuc3RyaXBlID0gU3RyaXBlKHRoaXMub3B0aW9ucy5zdHJpcGVfcHVibGlzaGFibGVfa2V5KTtcbiAgICAgIHRoaXMuZWxlbWVudHMgPSB0aGlzLnN0cmlwZS5lbGVtZW50cyh7XG4gICAgICAgIGZvbnRzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgLy8gaW50ZWdyYXRlIHlvdXIgZm9udCBpbnRvIHN0cmlwZVxuICAgICAgICAgICAgY3NzU3JjOiAnaHR0cHM6Ly91c2UudHlwZWtpdC5uZXQvY3hqN2Z6Zy5jc3MnLFxuICAgICAgICAgIH1cbiAgICAgICAgXVxuICAgICAgfSk7XG5cbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuZGVidWcgPT09IHRydWUpIHtcbiAgICAgICAgdGhpcy5kZWJ1Zyh0aGlzLm9wdGlvbnMpO1xuICAgICAgICAvLyByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIGNhbGwgZnVuY3Rpb25zXG4gICAgICB0aGlzLmFuYWx5dGljc1RyYWNraW5nKHRoaXMub3B0aW9ucyk7IC8vIHRyYWNrIGFuYWx5dGljcyBldmVudHNcbiAgICAgIHRoaXMuYW1vdW50QXNSYWRpbyh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIGlmIHRoZSBhbW91bnQgZmllbGQgaXMgYSByYWRpbyBidXR0b25cbiAgICAgIHRoaXMuYW1vdW50VXBkYXRlZCh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIGlmIHRoZSBhbW91bnQgdGV4dCBmaWVsZCBjYW4gY2hhbmdlXG5cbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5wYXlfY2NfcHJvY2Vzc2luZ19zZWxlY3RvcikubGVuZ3RoID4gMCkge1xuICAgICAgICB0aGlzLmNyZWRpdENhcmRQcm9jZXNzaW5nRmVlcyh0aGlzLm9wdGlvbnMpOyAvLyBwcm9jZXNzaW5nIGZlZXNcbiAgICAgIH1cbiAgICAgIFxuICAgICAgLy8gdGhlIG1haW4gZm9ybSBJRC4gdGhpcyBpcyBub3QgdXNlZCBmb3IgY2FuY2VsbGluZ1xuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuZG9uYXRlQW5vbnltb3VzbHkodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBhbm9ueW1vdXNcbiAgICAgICAgdGhpcy5ob25vck9yTWVtb3J5VG9nZ2xlKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gaW4gaG9ub3Igb3IgaW4gbWVtb3J5IG9mIHNvbWVvbmVcbiAgICAgICAgdGhpcy5vdXRzaWRlVW5pdGVkU3RhdGVzKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gb3V0c2lkZSBVU1xuICAgICAgICB0aGlzLnNoaXBwaW5nQWRkcmVzcyh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIHNoaXBwaW5nIGFkZHJlc3NcbiAgICAgICAgdGhpcy5hbGxvd01pbm5wb3N0QWNjb3VudCh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIG9wdGlvbiBmb3IgY3JlYXRpbmcgbWlubnBvc3QgYWNjb3VudFxuICAgICAgICB0aGlzLnBheW1lbnRSZXF1ZXN0QnV0dG9uKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gY3JlYXRlIHBheW1lbnRyZXF1ZXN0IGJ1dHRvblxuICAgICAgICB0aGlzLmNob29zZVBheW1lbnRNZXRob2QodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBzd2l0Y2ggYmV0d2VlbiBjYXJkIGFuZCBhY2hcbiAgICAgICAgdGhpcy5jcmVkaXRDYXJkRmllbGRzKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gZG8gc3R1ZmYgd2l0aCB0aGUgY3JlZGl0IGNhcmQgZmllbGRzXG4gICAgICAgIHRoaXMudmFsaWRhdGVTZXR1cCh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7IC8vIHNldHVwIGhvdyB2YWxpZGF0aW9uIGVycm9ycyB3b3JrXG4gICAgICAgIHRoaXMuZm9ybVNldHVwKHRoaXMuZWxlbWVudCwgdGhpcy5vcHRpb25zKTsgLy8gdmFsaWRhdGUgYW5kIHN1Ym1pdCB0aGUgZm9ybVxuICAgICAgfVxuXG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuY29uZmlybV9mb3JtX3NlbGVjdG9yKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHRoaXMuc2hvd05ld3NsZXR0ZXJTZXR0aW5ncyh0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyk7XG4gICAgICAgIHRoaXMuY29uZmlybU1lc3NhZ2VTdWJtaXQodGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpOyAvLyBzdWJtaXQgdGhlIHN0dWZmIG9uIHRoZSBjb25maXJtYXRpb24gcGFnZVxuICAgICAgfVxuXG4gICAgfSwgLy8gaW5pdFxuXG4gICAgZGVidWc6IGZ1bmN0aW9uKG1lc3NhZ2UpIHtcbiAgICAgIGlmICh0aGlzLm9wdGlvbnMuZGVidWcgPT09IHRydWUpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBtZXNzYWdlICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgIGNvbnNvbGUubG9nKG1lc3NhZ2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnNvbGUuZGlyKG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnNvbGUuZGlyKHRoaXMpO1xuICAgICAgfVxuICAgIH0sIC8vIGRlYnVnXG5cbiAgICBhbmFseXRpY3NUcmFja2luZzogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgdGhpcy5kZWJ1ZygnYW5hbHl0aWNzIHR5cGUgaXMgJyArIG9wdGlvbnMuYW5hbHl0aWNzX3R5cGUpO1xuICAgICAgdmFyIHByb2dyZXNzID0gJChvcHRpb25zLnByb2dyZXNzX3NlbGVjdG9yKTtcbiAgICAgIHZhciBzdGVwO1xuICAgICAgdmFyIGFjdGlvbiA9ICdiZWdpbl9jaGVja291dCc7XG4gICAgICB2YXIgbmF2X2l0ZW1fY291bnQgPSAwO1xuICAgICAgdmFyIG9wcF9pZCA9ICQob3B0aW9ucy5vcHBfaWRfc2VsZWN0b3IpLnZhbCgpO1xuICAgICAgdmFyIHBvc3RfcHVyY2hhc2UgPSBmYWxzZTtcbiAgICAgIGlmIChvcHRpb25zLmFuYWx5dGljc190eXBlID09ICdhbmFseXRpY3NqcycpIHtcbiAgICAgICAgZ2EoICdyZXF1aXJlJywgJ2VjJyApO1xuICAgICAgfVxuICAgICAgaWYgKHByb2dyZXNzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgbmF2X2l0ZW1fY291bnQgPSAkKCdsaScsIHByb2dyZXNzKS5sZW5ndGg7IC8vIGxlbmd0aCBpcyBub3QgemVybyBiYXNlZFxuICAgICAgICBzdGVwID0gJCgnbGkgLmFjdGl2ZScsIHByb2dyZXNzKS5wYXJlbnQoKS5pbmRleCgpICsgMTsgLy8gaW5kZXggaXMgemVybyBiYXNlZFxuICAgICAgfVxuICAgICAgLy8gdGhlcmUgaXMgYSBwcm9ncmVzcyBtZW51LCBBTkQgdGhlcmUgSVMgTk9UIGEgY29uZmlybSBmb3JtIHNlbGVjdG9yXG4gICAgICAvLyBpZiB0aGF0IGlzIHRoZSBjYXNlLCB3ZSdyZSBub3Qgb24gdGhlIHB1cmNoYXNlIHN0ZXBcbiAgICAgIGlmIChwcm9ncmVzcy5sZW5ndGggPiAwICYmICQob3B0aW9ucy5jb25maXJtX2Zvcm1fc2VsZWN0b3IpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAvLyB0aGUgYWN0aXZlIHRhYiBtYXRjaGVzIHRoZSBjb3VudCBvZiBpdGVtcyBBTkQgdGhlcmUgaXMgTk9UIGEgY29uZmlybSBmb3JtIHRvIGJlIHN1Ym1pdHRlZFxuICAgICAgICAvLyB0aGF0IG1lYW5zIHdlJ3JlIG9uIGEgcG9zdCBwdXJjaGFzZSBzdGVwLlxuICAgICAgICBpZiAoc3RlcCA9PT0gbmF2X2l0ZW1fY291bnQgJiYgJChvcHRpb25zLmNvbmZpcm1fZm9ybV9zZWxlY3RvcikubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgc3RlcCA9IHN0ZXAgKyAxO1xuICAgICAgICAgIHBvc3RfcHVyY2hhc2UgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHByb2dyZXNzLmxlbmd0aCA+IDAgJiYgJChvcHRpb25zLmNvbmZpcm1fZm9ybV9zZWxlY3RvcikubGVuZ3RoID4gMCB8fCAkKG9wdGlvbnMuZmluaXNoX3NlY3Rpb25fc2VsZWN0b3IpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgLy8gd2UgYXJlIG9uIHRoZSBjb25maXJtIGZvcm0gc2VsZWN0b3IgYW5kIHRoZXJlIGlzIGEgcHJvZ3Jlc3MgbWVhc3VyZVxuICAgICAgICAvLyBPUiwgd2UgYXJlIG9uIHRoZSBmaW5pc2ggc2VsZWN0b3IgYW5kIHRoZXJlIGlzIE5PVCBhIHByb2dyZXNzIG1lYXN1cmVcbiAgICAgICAgLy8gdGhlc2UgbWVhbiB0aGUgdXNlciBqdXN0IHB1cmNoYXNlZC5cbiAgICAgICAgYWN0aW9uID0gJ3B1cmNoYXNlJztcbiAgICAgIH0gZWxzZSBpZiAocHJvZ3Jlc3MubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMuZGVidWcoICdzdGVwIGlzICcgKyBzdGVwICsgJyBhbmQgbmF2IGl0ZW0gY291bnQgaXMgJyArIG5hdl9pdGVtX2NvdW50ICsgJyBhbmQgb3BwIGlkIGlzICcgKyBvcHBfaWQgKyAnIGFuZCBwb3N0IHB1cmNoYXNlIGlzICcgKyBwb3N0X3B1cmNoYXNlICk7XG4gICAgICB0aGlzLmFuYWx5dGljc1RyYWNraW5nU3RlcChzdGVwLCBhY3Rpb24sIHBvc3RfcHVyY2hhc2UpO1xuICAgIH0sIC8vIGFuYWx5dGljc1RyYWNraW5nXG5cbiAgICBhbmFseXRpY3NUcmFja2luZ1N0ZXA6IGZ1bmN0aW9uKHN0ZXAsIGFjdGlvbiwgcG9zdF9wdXJjaGFzZSkge1xuICAgICAgdmFyIHByb2dyZXNzID0gJCh0aGlzLm9wdGlvbnMucHJvZ3Jlc3Nfc2VsZWN0b3IpO1xuICAgICAgdmFyIGFtb3VudCA9ICQodGhpcy5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudF9zZWxlY3RvcikudmFsKCk7XG4gICAgICB2YXIgb3BwX2lkID0gJCh0aGlzLm9wdGlvbnMub3BwX2lkX3NlbGVjdG9yKS52YWwoKTtcbiAgICAgIHZhciBpbnN0YWxsbWVudF9wZXJpb2QgPSAnb25lLXRpbWUnO1xuICAgICAgdmFyIGxldmVsO1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmluc3RhbGxtZW50X3BlcmlvZF9zZWxlY3RvcikubGVuZ3RoID4gMCApIHtcbiAgICAgICAgaW5zdGFsbG1lbnRfcGVyaW9kID0gJCh0aGlzLm9wdGlvbnMuaW5zdGFsbG1lbnRfcGVyaW9kX3NlbGVjdG9yKS52YWwoKTtcbiAgICAgIH1cbiAgICAgIC8vIGlmIHdlJ3JlIG5vdCBhZnRlciB0aGUgcHVyY2hhc2UsIHVzZSBhZGRQcm9kdWN0XG4gICAgICAvL2lmIChwcm9ncmVzcy5sZW5ndGggPiAwICYmIHBvc3RfcHVyY2hhc2UgIT09IHRydWUpIHtcbiAgICAgIGlmIChwcm9ncmVzcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIHZhciBkYXRhID0ge1xuICAgICAgICAgIGFtb3VudDogYW1vdW50LFxuICAgICAgICAgIGluc3RhbGxtZW50X3BlcmlvZDogaW5zdGFsbG1lbnRfcGVyaW9kXG4gICAgICAgIH07XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgdXJsOiAnL2NhbGN1bGF0ZS1tZW1iZXItbGV2ZWwvJyxcbiAgICAgICAgICBkYXRhOiBkYXRhXG4gICAgICAgIH0pLmRvbmUoZnVuY3Rpb24oIGRhdGEgKSB7XG4gICAgICAgICAgaWYgKCQoZGF0YS5sZXZlbCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgbGV2ZWwgPSBkYXRhLmxldmVsLmxldmVsO1xuICAgICAgICAgICAgdGhhdC5kZWJ1ZygnY3JlYXRlIHByb2R1Y3Qgb2JqZWN0OiBpZCBpcyAnICsgJ21pbm5wb3N0XycgKyBsZXZlbC50b0xvd2VyQ2FzZSgpICsgJ19tZW1iZXJzaGlwJyArICcgYW5kIG5hbWUgaXMgJyArICdNaW5uUG9zdCAnICsgbGV2ZWwuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBsZXZlbC5zbGljZSgxKSArICcgTWVtYmVyc2hpcCcgKyAnIGFuZCB2YXJpYW50IGlzICcgKyBpbnN0YWxsbWVudF9wZXJpb2QuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBpbnN0YWxsbWVudF9wZXJpb2Quc2xpY2UoMSkpO1xuICAgICAgICAgICAgdmFyIHByb2R1Y3QgPSB7XG4gICAgICAgICAgICAgICdpdGVtX2lkJzogJ21pbm5wb3N0XycgKyBsZXZlbC50b0xvd2VyQ2FzZSgpICsgJ19tZW1iZXJzaGlwJyxcbiAgICAgICAgICAgICAgJ2l0ZW1fbmFtZSc6ICdNaW5uUG9zdCAnICsgbGV2ZWwuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBsZXZlbC5zbGljZSgxKSArICcgTWVtYmVyc2hpcCcsXG4gICAgICAgICAgICAgICdpdGVtX2NhdGVnb3J5JzogJ0RvbmF0aW9uJyxcbiAgICAgICAgICAgICAgJ2l0ZW1fYnJhbmQnOiAnTWlublBvc3QnLFxuICAgICAgICAgICAgICAnaXRlbV92YXJpYW50JzogaW5zdGFsbG1lbnRfcGVyaW9kLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgaW5zdGFsbG1lbnRfcGVyaW9kLnNsaWNlKDEpLFxuICAgICAgICAgICAgICAncHJpY2UnOiB0aGF0LmdldFRvdGFsQW1vdW50KGFtb3VudCksXG4gICAgICAgICAgICAgICdxdWFudGl0eSc6IDEsXG4gICAgICAgICAgICAgICdjdXJyZW5jeSc6ICdVU0QnLFxuICAgICAgICAgICAgICBcImFmZmlsaWF0aW9uXCI6ICdNaW5uUG9zdCdcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAodGhhdC5vcHRpb25zLmFuYWx5dGljc190eXBlID09ICdndGFnanMnKSB7XG4gICAgICAgICAgICAgIGd0YWcoJ2V2ZW50JywgJ2NoZWNrb3V0X3Byb2dyZXNzJywge1xuICAgICAgICAgICAgICAgIFwidmFsdWVcIjogdGhhdC5nZXRUb3RhbEFtb3VudChhbW91bnQpLFxuICAgICAgICAgICAgICAgIFwiaXRlbXNcIjogW3Byb2R1Y3RdLFxuICAgICAgICAgICAgICAgIFwiY2hlY2tvdXRfc3RlcFwiOiBzdGVwLFxuICAgICAgICAgICAgICAgIFwiY2hlY2tvdXRfb3B0aW9uXCI6IGFjdGlvbixcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoYXQub3B0aW9ucy5hbmFseXRpY3NfdHlwZSA9PSAnYW5hbHl0aWNzanMnKSB7XG4gICAgICAgICAgICAgIGdhKCdlYzphZGRQcm9kdWN0JywgcHJvZHVjdCk7XG4gICAgICAgICAgICAgIGdhKCdlYzpzZXRBY3Rpb24nLCAnY2hlY2tvdXQnLCB7XG4gICAgICAgICAgICAgICAgJ3N0ZXAnOiBzdGVwLFxuICAgICAgICAgICAgICAgICdvcHRpb24nOiBhY3Rpb25cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChhY3Rpb24gPT09ICdwdXJjaGFzZScpIHtcbiAgICAgICAgICAgICAgdGhhdC5kZWJ1ZygnYWRkIGEgcHVyY2hhc2UgYWN0aW9uLiBzdGVwIGlzICcgKyBzdGVwICsgJyBhbmQgYWN0aW9uIGlzICcgKyBhY3Rpb24pO1xuICAgICAgICAgICAgICBpZiAodGhhdC5vcHRpb25zLmFuYWx5dGljc190eXBlID09ICdndGFnanMnKSB7XG4gICAgICAgICAgICAgICAgZ3RhZygnZXZlbnQnLCBhY3Rpb24sIHtcbiAgICAgICAgICAgICAgICAgIFwidHJhbnNhY3Rpb25faWRcIjogb3BwX2lkLCAvLyBUcmFuc2FjdGlvbiBpZCAtIFR5cGU6IHN0cmluZ1xuICAgICAgICAgICAgICAgICAgXCJhZmZpbGlhdGlvblwiOiAnTWlublBvc3QnLCAvLyBTdG9yZSBuYW1lIC0gVHlwZTogc3RyaW5nXG4gICAgICAgICAgICAgICAgICBcInZhbHVlXCI6IHRoYXQuZ2V0VG90YWxBbW91bnQoYW1vdW50KSwgLy8gVG90YWwgUmV2ZW51ZSAtIFR5cGU6IG51bWVyaWNcbiAgICAgICAgICAgICAgICAgIFwiY3VycmVuY3lcIjogXCJVU0RcIixcbiAgICAgICAgICAgICAgICAgIFwiaXRlbXNcIjogW3Byb2R1Y3RdLFxuICAgICAgICAgICAgICAgICAgXCJjaGVja291dF9zdGVwXCI6IHN0ZXBcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGF0Lm9wdGlvbnMuYW5hbHl0aWNzX3R5cGUgPT0gJ2FuYWx5dGljc2pzJykge1xuICAgICAgICAgICAgICAgIGdhKCdlYzpzZXRBY3Rpb24nLCBhY3Rpb24sIHtcbiAgICAgICAgICAgICAgICAgICdpZCc6IG9wcF9pZCwgLy8gVHJhbnNhY3Rpb24gaWQgLSBUeXBlOiBzdHJpbmdcbiAgICAgICAgICAgICAgICAgICdhZmZpbGlhdGlvbic6ICdNaW5uUG9zdCcsIC8vIFN0b3JlIG5hbWUgLSBUeXBlOiBzdHJpbmdcbiAgICAgICAgICAgICAgICAgICdyZXZlbnVlJzogYW1vdW50LCAvLyBUb3RhbCBSZXZlbnVlIC0gVHlwZTogbnVtZXJpY1xuICAgICAgICAgICAgICAgICAgJ3N0ZXAnOiBzdGVwXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgXG4gICAgICAgICAgICBpZiAodGhhdC5vcHRpb25zLmFuYWx5dGljc190eXBlID09ICdndGFnanMnKSB7XG4gICAgICAgICAgICAgIGd0YWcoJ2V2ZW50JywgJ3BhZ2VfdmlldycsIHtcbiAgICAgICAgICAgICAgICBwYWdlX3RpdGxlOiBkb2N1bWVudC50aXRsZSxcbiAgICAgICAgICAgICAgICBwYWdlX3BhdGg6IHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZVxuICAgICAgICAgICAgICB9KSAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoYXQub3B0aW9ucy5hbmFseXRpY3NfdHlwZSA9PSAnYW5hbHl0aWNzanMnKSB7XG4gICAgICAgICAgICAgIGdhKCdzZXQnLCB7XG4gICAgICAgICAgICAgICAgcGFnZTogd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lLFxuICAgICAgICAgICAgICAgIHRpdGxlOiBkb2N1bWVudC50aXRsZVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgZ2EoJ3NlbmQnLCAncGFnZXZpZXcnLCB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBkYXRhTGF5ZXJcbiAgICAgICAgICAgIGlmICggJ3VuZGVmaW5lZCcgIT09IHR5cGVvZiBkYXRhTGF5ZXIgKSB7XG4gICAgICAgICAgICAgIGRhdGFMYXllci5wdXNoKHsgZWNvbW1lcmNlOiBudWxsIH0pOyAvLyBmaXJzdCwgbWFrZSBzdXJlIHRoZXJlIGFyZW4ndCBtdWx0aXBsZSB0aGluZ3MgaGFwcGVuaW5nLlxuICAgICAgICAgICAgICBkYXRhTGF5ZXIucHVzaCh7XG4gICAgICAgICAgICAgICAgZXZlbnQ6IGFjdGlvbixcbiAgICAgICAgICAgICAgICB0cmFuc2FjdGlvbl9pZDogb3BwX2lkLCAvLyBUcmFuc2FjdGlvbiBpZCAtIFR5cGU6IHN0cmluZ1xuICAgICAgICAgICAgICAgIGFmZmlsaWF0aW9uOiAnTWlublBvc3QnLCAvLyBTdG9yZSBuYW1lIC0gVHlwZTogc3RyaW5nXG4gICAgICAgICAgICAgICAgdmFsdWU6IHRoYXQuZ2V0VG90YWxBbW91bnQoYW1vdW50KSwgLy8gVG90YWwgUmV2ZW51ZSAtIFR5cGU6IG51bWVyaWNcbiAgICAgICAgICAgICAgICBjdXJyZW5jeTogXCJVU0RcIixcbiAgICAgICAgICAgICAgICBlY29tbWVyY2U6IHtcbiAgICAgICAgICAgICAgICAgIGl0ZW1zOiBwcm9kdWN0XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIFxuXG4gICAgfSwgLy8gYW5hbHl0aWNzVHJhY2tpbmdTdGVwXG5cbiAgICBhbW91bnRBc1JhZGlvOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICAvLyB3aGVuIGFtb3VudCBmaWVsZCBpcyBhIHJhZGlvIGJ1dHRvbiwgd2UgbmVlZCB0byBjaGVjayBpdCB3aGVuZXZlciBpdCBjaGFuZ2VzXG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB0aGF0LnNldFJhZGlvQW1vdW50KCQob3B0aW9ucy5vcmlnaW5hbF9hbW91bnRfc2VsZWN0b3IsIGVsZW1lbnQpLCBlbGVtZW50LCBvcHRpb25zKTtcbiAgICAgICQob3B0aW9ucy5vcmlnaW5hbF9hbW91bnRfc2VsZWN0b3IsIGVsZW1lbnQpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgdGhhdC5zZXRSYWRpb0Ftb3VudCgkKHRoaXMpLCBlbGVtZW50LCBvcHRpb25zKTtcbiAgICAgIH0pO1xuICAgIH0sIC8vIGFtb3VudEFzUmFkaW9cblxuICAgIHNldFJhZGlvQW1vdW50OiBmdW5jdGlvbihmaWVsZCwgZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdmFyIHN0cmlwZV9wYXltZW50X3R5cGUgPSB0aGF0LmdldFN0cmlwZVBheW1lbnRUeXBlKCk7XG4gICAgICB2YXIgYW1vdW50ID0gJChvcHRpb25zLm9yaWdpbmFsX2Ftb3VudF9zZWxlY3RvciArICc6Y2hlY2tlZCcsIGVsZW1lbnQpLnZhbCgpO1xuICAgICAgaWYgKGZpZWxkLmlzKCc6cmFkaW8nKSAmJiB0eXBlb2YgYW1vdW50ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBvcHRpb25zLm9yaWdpbmFsX2Ftb3VudCA9IHBhcnNlSW50KGFtb3VudCwgMTApO1xuICAgICAgICB0aGF0LmNhbGN1bGF0ZUZlZXModGhhdC5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCwgc3RyaXBlX3BheW1lbnRfdHlwZSk7XG4gICAgICAgIHRoYXQuc2V0RmFpck1hcmtldFZhbHVlKGZpZWxkKTtcbiAgICAgIH1cbiAgICB9LCAvLyBzZXRSYWRpb0Ftb3VudFxuXG4gICAgYW1vdW50VXBkYXRlZDogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgLy8gd2hlbiBuZXcgYW1vdW50IHRleHQgZmllbGQgY2FuIGNoYW5nZSwgd2UgbmVlZCB0byBjaGFuZ2UgdGhlIGhpZGRlbiBmaWVsZFxuICAgICAgLy8gdGhlcmUgaXMgYWxzbyBwb3RlbnRpYWxseSBhbiBhZGRpdGlvbmFsIGFtb3VudCBmaWVsZCB2YWx1ZSB0byBhZGRcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHZhciBzdHJpcGVfcGF5bWVudF90eXBlID0gdGhhdC5nZXRTdHJpcGVQYXltZW50VHlwZSgpO1xuXG4gICAgICAvLyBzZXQgdGhlIGZhaXIgbWFya2V0IHZhbHVlIGlmIGFwcGxpY2FibGVcbiAgICAgIHZhciBhbW91bnRfc2VsZWN0b3JfZmFpcl9tYXJrZXQgPSAkKG9wdGlvbnMub3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yLCBlbGVtZW50KTtcbiAgICAgIGlmIChhbW91bnRfc2VsZWN0b3JfZmFpcl9tYXJrZXQuaXMoJzpyYWRpbycpKSB7XG4gICAgICAgIGFtb3VudF9zZWxlY3Rvcl9mYWlyX21hcmtldCA9ICQob3B0aW9ucy5vcmlnaW5hbF9hbW91bnRfc2VsZWN0b3IgKyAnOmNoZWNrZWQnLCBlbGVtZW50KTtcbiAgICAgIH1cbiAgICAgIHRoYXQuc2V0RmFpck1hcmtldFZhbHVlKGFtb3VudF9zZWxlY3Rvcl9mYWlyX21hcmtldCk7XG5cbiAgICAgICQob3B0aW9ucy5vcmlnaW5hbF9hbW91bnRfc2VsZWN0b3IsIGVsZW1lbnQpLmNoYW5nZShmdW5jdGlvbigpIHtcbiAgICAgICAgdGhhdC5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCA9IHBhcnNlSW50KCQodGhpcywgZWxlbWVudCkudmFsKCksIDEwKTtcbiAgICAgICAgdGhhdC5jYWxjdWxhdGVGZWVzKHRoYXQub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQsIHN0cmlwZV9wYXltZW50X3R5cGUpO1xuICAgICAgICB0aGF0LnNldEZhaXJNYXJrZXRWYWx1ZSgkKHRoaXMsIGVsZW1lbnQpKTtcbiAgICAgIH0pO1xuICAgICAgJChvcHRpb25zLmFkZGl0aW9uYWxfYW1vdW50X2ZpZWxkLCBlbGVtZW50KS5jaGFuZ2UoZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoYXQub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQgPSBwYXJzZUludCgkKG9wdGlvbnMub3JpZ2luYWxfYW1vdW50X3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSwgMTApO1xuICAgICAgICB0aGF0LmNhbGN1bGF0ZUZlZXModGhhdC5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCwgc3RyaXBlX3BheW1lbnRfdHlwZSk7XG4gICAgICB9KTtcbiAgICAgICQob3B0aW9ucy5naWZ0X2RlbGl2ZXJ5X21ldGhvZF9zZWxlY3RvciwgZWxlbWVudCkuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGF0Lm9wdGlvbnMub3JpZ2luYWxfYW1vdW50ID0gcGFyc2VJbnQoJChvcHRpb25zLm9yaWdpbmFsX2Ftb3VudF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksIDEwKTtcbiAgICAgICAgdGhhdC5jYWxjdWxhdGVGZWVzKHRoYXQub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQsIHN0cmlwZV9wYXltZW50X3R5cGUpO1xuICAgICAgfSk7XG5cbiAgICB9LCAvLyBhbW91bnRVcGRhdGVkXG5cbiAgICBnZXRUb3RhbEFtb3VudDogZnVuY3Rpb24oYW1vdW50KSB7XG4gICAgICBhbW91bnQgPSAodHlwZW9mIGFtb3VudCAhPT0gJ3VuZGVmaW5lZCcpID8gIGFtb3VudCA6IHRoaXMub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQ7XG4gICAgICB2YXIgdG90YWxfYW1vdW50ID0gYW1vdW50O1xuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmFkZGl0aW9uYWxfYW1vdW50X2ZpZWxkKS5sZW5ndGggPiAwICYmICQodGhpcy5vcHRpb25zLmFkZGl0aW9uYWxfYW1vdW50X2ZpZWxkKS52YWwoKSA+IDApIHtcbiAgICAgICAgdmFyIGFkZGl0aW9uYWxfYW1vdW50ID0gJCh0aGlzLm9wdGlvbnMuYWRkaXRpb25hbF9hbW91bnRfZmllbGQpLnZhbCgpO1xuICAgICAgICB0b3RhbF9hbW91bnQgPSBwYXJzZUludChhZGRpdGlvbmFsX2Ftb3VudCwgMTApICsgcGFyc2VJbnQoYW1vdW50LCAxMCk7IFxuICAgICAgfVxuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLnNoaXBwaW5nX2Ftb3VudF9maWVsZCkubGVuZ3RoID4gMCAmJiAkKHRoaXMub3B0aW9ucy5zaGlwcGluZ19hbW91bnRfZmllbGQpLnZhbCgpID4gMCkge1xuICAgICAgICB2YXIgc2hpcHBpbmdfYW1vdW50ID0gJCh0aGlzLm9wdGlvbnMuc2hpcHBpbmdfYW1vdW50X2ZpZWxkKS52YWwoKTtcbiAgICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmdpZnRfZGVsaXZlcnlfbWV0aG9kX3NlbGVjdG9yICsgJzpjaGVja2VkJykudmFsKCkgPT09ICdzaGlwcGluZycpIHtcbiAgICAgICAgICB0b3RhbF9hbW91bnQgPSBwYXJzZUludChzaGlwcGluZ19hbW91bnQsIDEwKSArIHBhcnNlSW50KHRvdGFsX2Ftb3VudCwgMTApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRvdGFsX2Ftb3VudCA9IHBhcnNlSW50KHRvdGFsX2Ftb3VudCwgMTApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gdG90YWxfYW1vdW50O1xuICAgIH0sIC8vIGdldFRvdGFsQW1vdW50XG5cbiAgICBzZXRGYWlyTWFya2V0VmFsdWU6IGZ1bmN0aW9uKGFtb3VudF9zZWxlY3Rvcikge1xuICAgICAgLy8gaWYgdGhlcmUgaXMgYSBmYWlyIG1hcmtldCB2YWx1ZSBmaWVsZCBhbmQgdGhlcmUgaXMgYSBmYWlyLW1hcmtldC12YWx1ZSBkYXRhIGF0dHJpYnV0ZVxuICAgICAgLy8gY2hlY2sgYW5kIHNlZSBpZiB3ZSBjYW4gcG9wdWxhdGUgdGhlIGZpZWxkIHdpdGggdGhlIGRhdGEgYXR0cmlidXRlXG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuZmFpcl9tYXJrZXRfdmFsdWVfc2VsZWN0b3IpLmxlbmd0aCA+IDAgJiYgdHlwZW9mIGFtb3VudF9zZWxlY3Rvci5kYXRhKCdmYWlyLW1hcmtldC12YWx1ZScpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB2YXIgZmFpck1hcmtldFZhbHVlID0gYW1vdW50X3NlbGVjdG9yLmRhdGEoJ2ZhaXItbWFya2V0LXZhbHVlJyk7XG4gICAgICAgICQodGhpcy5vcHRpb25zLmZhaXJfbWFya2V0X3ZhbHVlX3NlbGVjdG9yKS52YWwoZmFpck1hcmtldFZhbHVlKTtcbiAgICAgIH1cbiAgICB9LCAvLyBzZXRGYWlyTWFya2V0VmFsdWVcblxuICAgIGNhbGN1bGF0ZUZlZXM6IGZ1bmN0aW9uKGFtb3VudCwgc3RyaXBlX3BheW1lbnRfdHlwZSkge1xuICAgICAgLy8gdGhpcyBzZW5kcyB0aGUgYW1vdW50IGFuZCBzdHJpcGUgcGF5bWVudCB0eXBlIHRvIHB5dGhvbjsgZ2V0IHRoZSBmZWUgYW5kIGRpc3BsYXkgaXQgdG8gdGhlIHVzZXIgb24gdGhlIGNoZWNrYm94IGxhYmVsXG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB2YXIgdG90YWxfYW1vdW50ID0gdGhhdC5nZXRUb3RhbEFtb3VudChhbW91bnQpO1xuICAgICAgdmFyIGRhdGEgPSB7XG4gICAgICAgIGFtb3VudDogdG90YWxfYW1vdW50LFxuICAgICAgICBzdHJpcGVfcGF5bWVudF90eXBlOiBzdHJpcGVfcGF5bWVudF90eXBlXG4gICAgICB9O1xuICAgICAgdGhhdC5zZXRTdHJpcGVQYXltZW50VHlwZShzdHJpcGVfcGF5bWVudF90eXBlKTtcbiAgICAgICQuYWpheCh7XG4gICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICB1cmw6ICcvY2FsY3VsYXRlLWZlZXMvJyxcbiAgICAgICAgZGF0YTogZGF0YVxuICAgICAgfSkuZG9uZShmdW5jdGlvbiggZGF0YSApIHtcbiAgICAgICAgaWYgKCQoZGF0YS5mZWVzKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgJCh0aGF0Lm9wdGlvbnMuZmVlX2Ftb3VudCkudGV4dChwYXJzZUZsb2F0KGRhdGEuZmVlcykudG9GaXhlZCgyKSk7XG4gICAgICAgICAgdGhhdC5jcmVkaXRDYXJkRmVlQ2hlY2tib3goJCh0aGF0Lm9wdGlvbnMucGF5X2NjX3Byb2Nlc3Npbmdfc2VsZWN0b3IpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSwgLy8gY2FsY3VsYXRlRmVlc1xuXG4gICAgY3JlZGl0Q2FyZFByb2Nlc3NpbmdGZWVzOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAvLyB0aGlzIGFkZHMgb3Igc3VidHJhY3RzIHRoZSBmZWUgdG8gdGhlIG9yaWdpbmFsIGFtb3VudCB3aGVuIHRoZSB1c2VyIGluZGljYXRlcyB0aGV5IGRvIG9yIGRvIG5vdCB3YW50IHRvIHBheSB0aGUgZmVlc1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdGhhdC5jcmVkaXRDYXJkRmVlQ2hlY2tib3goJChvcHRpb25zLnBheV9jY19wcm9jZXNzaW5nX3NlbGVjdG9yKSk7XG4gICAgICAkKG9wdGlvbnMucGF5X2NjX3Byb2Nlc3Npbmdfc2VsZWN0b3IpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdGhhdC5jcmVkaXRDYXJkRmVlQ2hlY2tib3godGhpcyk7XG4gICAgICB9KTtcbiAgICB9LCAvLyBjcmVkaXRDYXJkUHJvY2Vzc2luZ0ZlZXNcblxuICAgIGdldFN0cmlwZVBheW1lbnRUeXBlOiBmdW5jdGlvbigpIHtcbiAgICAgIHZhciBzdHJpcGVfcGF5bWVudF90eXBlID0gJ2NhcmQnO1xuICAgICAgaWYgKCQoJ2lucHV0W25hbWU9XCJzdHJpcGVfcGF5bWVudF90eXBlXCJdJykubGVuZ3RoID4gMCkge1xuICAgICAgICBzdHJpcGVfcGF5bWVudF90eXBlID0gJCgnaW5wdXRbbmFtZT1cInN0cmlwZV9wYXltZW50X3R5cGVcIl0nKS52YWwoKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzdHJpcGVfcGF5bWVudF90eXBlO1xuICAgIH0sIC8vIGdldFN0cmlwZVBheW1lbnRUeXBlXG5cbiAgICBzZXRTdHJpcGVQYXltZW50VHlwZTogZnVuY3Rpb24oc3RyaXBlX3BheW1lbnRfdHlwZSkge1xuICAgICAgaWYgKCQoJ2lucHV0W25hbWU9XCJzdHJpcGVfcGF5bWVudF90eXBlXCJdJykubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICQodGhpcy5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5hcHBlbmQoJzxpbnB1dCB0eXBlPVxcXCJoaWRkZW5cXFwiIG5hbWU9XFxcInN0cmlwZV9wYXltZW50X3R5cGVcXFwiPicpO1xuICAgICAgfVxuICAgICAgJCgnaW5wdXRbbmFtZT1cInN0cmlwZV9wYXltZW50X3R5cGVcIl0nKS52YWwoc3RyaXBlX3BheW1lbnRfdHlwZSk7XG4gICAgICByZXR1cm4gc3RyaXBlX3BheW1lbnRfdHlwZTtcbiAgICB9LCAvLyBzZXRTdHJpcGVQYXltZW50VHlwZVxuXG4gICAgY3JlZGl0Q2FyZEZlZUNoZWNrYm94OiBmdW5jdGlvbihmaWVsZCkge1xuICAgICAgdmFyIGZ1bGxfYW1vdW50O1xuICAgICAgdmFyIHRvdGFsX2Ftb3VudCA9IHRoaXMuZ2V0VG90YWxBbW91bnQoKTtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIGlmICgkKGZpZWxkKS5pcygnOmNoZWNrZWQnKSB8fCAkKGZpZWxkKS5wcm9wKCdjaGVja2VkJykpIHtcbiAgICAgICAgJCgnLmFtb3VudCAubGV2ZWwtYW1vdW50JykuYWRkQ2xhc3MoJ2Z1bGwtYW1vdW50Jyk7XG4gICAgICAgIGZ1bGxfYW1vdW50ID0gKHRvdGFsX2Ftb3VudCArIHBhcnNlRmxvYXQoJCh0aGF0Lm9wdGlvbnMuZmVlX2Ftb3VudCkudGV4dCgpKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmdWxsX2Ftb3VudCA9IHRvdGFsX2Ftb3VudDtcbiAgICAgIH1cbiAgICAgIGZ1bGxfYW1vdW50ID0gcGFyc2VGbG9hdChmdWxsX2Ftb3VudCkudG9GaXhlZCgyKTtcbiAgICAgICQodGhhdC5vcHRpb25zLmZ1bGxfYW1vdW50X3NlbGVjdG9yKS50ZXh0KGZ1bGxfYW1vdW50KTtcblxuICAgICAgLy8gdXBkYXRlIHRoZSBwYXltZW50IHJlcXVlc3RcbiAgICAgIGlmICh0aGlzLnBheW1lbnRSZXF1ZXN0ICYmIGZ1bGxfYW1vdW50KSB7XG4gICAgICAgIHRoaXMucGF5bWVudFJlcXVlc3QudXBkYXRlKHtcbiAgICAgICAgICB0b3RhbDoge1xuICAgICAgICAgICAgbGFiZWw6IFwiTWlublBvc3RcIixcbiAgICAgICAgICAgIGFtb3VudDogZnVsbF9hbW91bnQgKiAxMDBcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgfSwgLy8gY3JlZGl0Q2FyZEZlZUNoZWNrYm94XG5cbiAgICBkb25hdGVBbm9ueW1vdXNseTogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdGhhdC50b2dnbGVBbm9ueW1vdXMoJChvcHRpb25zLmFub255bW91c19zZWxlY3RvciwgZWxlbWVudCkpO1xuICAgICAgJChvcHRpb25zLmFub255bW91c19zZWxlY3RvciwgZWxlbWVudCkuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGF0LnRvZ2dsZUFub255bW91cygkKHRoaXMpKTtcbiAgICAgIH0pO1xuICAgIH0sIC8vIGRvbmF0ZUFub255bW91c2x5XG5cbiAgICB0b2dnbGVBbm9ueW1vdXM6IGZ1bmN0aW9uKGVsZW1lbnQpIHtcbiAgICAgIGlmIChlbGVtZW50LmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgICQodGhpcy5vcHRpb25zLm5hbWVfc2VsZWN0b3IgKyAnIGRpdjpmaXJzdCcsIHRoaXMuZWxlbWVudCkuaGlkZSgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgJCh0aGlzLm9wdGlvbnMubmFtZV9zZWxlY3RvciArICcgZGl2OmZpcnN0JywgdGhpcy5lbGVtZW50KS5zaG93KCk7XG4gICAgICB9XG4gICAgfSwgLy8gdG9nZ2xlQW5vbnltb3VzXG5cbiAgICBob25vck9yTWVtb3J5OiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICBpZiAoJChvcHRpb25zLmhvbm9yX29yX21lbW9yeV9jaG9vc2VyICsgJzpjaGVja2VkJykudmFsKCkpIHtcbiAgICAgICAgJChvcHRpb25zLmhvbm9yX21lbW9yeV9pbnB1dF9ncm91cCwgZWxlbWVudCkuc2hvdygpO1xuICAgICAgICAkKG9wdGlvbnMuaG9ub3JfdHlwZV9zZWxlY3RvcikudGV4dCgkKG9wdGlvbnMuaG9ub3Jfb3JfbWVtb3J5X2Nob29zZXIgKyAnOmNoZWNrZWQnKS52YWwoKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAkKG9wdGlvbnMuaG9ub3JfbWVtb3J5X2lucHV0X2dyb3VwLCBlbGVtZW50KS5oaWRlKCk7XG4gICAgICAgICQob3B0aW9ucy5ob25vcl9uYW1lX3NlbGVjdG9yICsgJyBpbnB1dCcsIGVsZW1lbnQpLnZhbCgnJyk7XG4gICAgICB9XG4gICAgfSwgLy8gaG9ub3JPck1lbW9yeVxuXG4gICAgaG9ub3JPck1lbW9yeVRvZ2dsZTogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdGhhdC5ob25vck9yTWVtb3J5KHRoYXQuZWxlbWVudCwgdGhhdC5vcHRpb25zKTtcbiAgICAgICQob3B0aW9ucy5ob25vcl9vcl9tZW1vcnlfY2hvb3NlciwgZWxlbWVudCkuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGF0Lmhvbm9yT3JNZW1vcnkodGhhdC5lbGVtZW50LCB0aGF0Lm9wdGlvbnMpO1xuICAgICAgfSk7XG4gICAgfSwgLy8gaG9ub3JPck1lbW9yeVRvZ2dsZVxuXG4gICAgb3V0c2lkZVVuaXRlZFN0YXRlczogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgJChvcHRpb25zLnNob3dfYmlsbGluZ19jb3VudHJ5X3NlbGVjdG9yKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgdGhhdC5jaGFuZ2VGaWVsZHNPdXRzaWRlVVMoJ2JpbGxpbmcnLCBlbGVtZW50LCBvcHRpb25zKTtcbiAgICAgICAgJCh0aGlzKS5wYXJlbnQoKS5oaWRlKCk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH0pO1xuICAgICAgJChvcHRpb25zLnNob3dfc2hpcHBpbmdfY291bnRyeV9zZWxlY3RvcikuY2xpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICQob3B0aW9ucy5zaGlwcGluZ19jb3VudHJ5X3NlbGVjdG9yKS5zaG93KCk7XG4gICAgICAgIHRoYXQuY2hhbmdlRmllbGRzT3V0c2lkZVVTKCdzaGlwcGluZycsIGVsZW1lbnQsIG9wdGlvbnMpO1xuICAgICAgICAkKHRoaXMpLnBhcmVudCgpLmhpZGUoKTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfSk7XG4gICAgfSwgLy8gb3V0c2lkZVVuaXRlZFN0YXRlc1xuXG4gICAgY2hhbmdlRmllbGRzT3V0c2lkZVVTOiBmdW5jdGlvbihiaWxsaW5nX29yX3NoaXBwaW5nLCBlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICBpZiAoIGJpbGxpbmdfb3Jfc2hpcHBpbmcgPT09ICdiaWxsaW5nJyApIHtcbiAgICAgICAgdmFyIHppcF9wYXJlbnQgPSAkKG9wdGlvbnMuYmlsbGluZ196aXBfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpO1xuICAgICAgICB2YXIgc3RhdGVfcGFyZW50ID0gJChvcHRpb25zLmJpbGxpbmdfc3RhdGVfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpO1xuICAgICAgICAkKG9wdGlvbnMuYmlsbGluZ19jb3VudHJ5X3NlbGVjdG9yKS5zaG93KCk7XG4gICAgICAgICQob3B0aW9ucy5iaWxsaW5nX3ppcF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkuYXR0cigndHlwZScsICd0ZXh0Jyk7XG4gICAgICAgICQob3B0aW9ucy5iaWxsaW5nX3ppcF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICAgICQob3B0aW9ucy5iaWxsaW5nX3N0YXRlX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5wcm9wKCdyZXF1aXJlZCcsIGZhbHNlKTtcbiAgICAgICAgJCgnbGFiZWwnLCB6aXBfcGFyZW50KS50ZXh0KCdQb3N0YWwgQ29kZTonKTtcbiAgICAgICAgJCgnbGFiZWwnLCBzdGF0ZV9wYXJlbnQpLnRleHQoJ1JlZ2lvbjonKTtcbiAgICAgIH0gZWxzZSBpZiAoIGJpbGxpbmdfb3Jfc2hpcHBpbmcgPT09ICdzaGlwcGluZycgKSB7XG4gICAgICAgIHZhciB6aXBfcGFyZW50ID0gJChvcHRpb25zLnNoaXBwaW5nX3ppcF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkucGFyZW50KCk7XG4gICAgICAgIHZhciBzdGF0ZV9wYXJlbnQgPSAkKG9wdGlvbnMuc2hpcHBpbmdfc3RhdGVfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpO1xuICAgICAgICAkKG9wdGlvbnMuc2hpcHBpbmdfY291bnRyeV9zZWxlY3Rvcikuc2hvdygpO1xuICAgICAgICAkKG9wdGlvbnMuc2hpcHBpbmdfemlwX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5hdHRyKCd0eXBlJywgJ3RleHQnKTtcbiAgICAgICAgJChvcHRpb25zLnNoaXBwaW5nX3ppcF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICAgICQob3B0aW9ucy5zaGlwcGluZ19zdGF0ZV9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkucHJvcCgncmVxdWlyZWQnLCBmYWxzZSk7XG4gICAgICAgICQoJ2xhYmVsJywgemlwX3BhcmVudCkudGV4dCgnU2hpcHBpbmcgUG9zdGFsIENvZGU6Jyk7XG4gICAgICAgICQoJ2xhYmVsJywgc3RhdGVfcGFyZW50KS50ZXh0KCdTaGlwcGluZyBSZWdpb246Jyk7XG4gICAgICB9XG4gICAgfSwgLy8gY2hhbmdlRmllbGRzT3V0c2lkZVVTXG5cbiAgICBjaGFuZ2VGaWVsZHNJbnNpZGVVUzogZnVuY3Rpb24oYmlsbGluZ19vcl9zaGlwcGluZywgZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgaWYgKCBiaWxsaW5nX29yX3NoaXBwaW5nID09PSAnYmlsbGluZycgKSB7XG4gICAgICAgIHZhciB6aXBfcGFyZW50ID0gJChvcHRpb25zLmJpbGxpbmdfemlwX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKTtcbiAgICAgICAgdmFyIHN0YXRlX3BhcmVudCA9ICQob3B0aW9ucy5iaWxsaW5nX3N0YXRlX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKTtcbiAgICAgICAgJChvcHRpb25zLmJpbGxpbmdfY291bnRyeV9zZWxlY3Rvcikuc2hvdygpO1xuICAgICAgICAkKG9wdGlvbnMuYmlsbGluZ196aXBfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLmF0dHIoJ3R5cGUnLCAndGVsJyk7XG4gICAgICAgICQob3B0aW9ucy5iaWxsaW5nX3ppcF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkucHJvcCgncmVxdWlyZWQnLCB0cnVlKTtcbiAgICAgICAgJChvcHRpb25zLmJpbGxpbmdfc3RhdGVfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnByb3AoJ3JlcXVpcmVkJywgdHJ1ZSk7XG4gICAgICAgICQoJ2xhYmVsJywgemlwX3BhcmVudCkuaHRtbCgnWmlwIENvZGU6IDxzcGFuIGNsYXNzPVwiYS1mb3JtLWl0ZW0tcmVxdWlyZWRcIiB0aXRsZT1cIlRoaXMgZmllbGQgaXMgcmVxdWlyZWQuXCI+Kjwvc3Bhbj4nKTtcbiAgICAgICAgJCgnbGFiZWwnLCBzdGF0ZV9wYXJlbnQpLmh0bWwoJ1N0YXRlOiA8c3BhbiBjbGFzcz1cImEtZm9ybS1pdGVtLXJlcXVpcmVkXCIgdGl0bGU9XCJUaGlzIGZpZWxkIGlzIHJlcXVpcmVkLlwiPio8L3NwYW4+Jyk7XG4gICAgICB9IGVsc2UgaWYgKCBiaWxsaW5nX29yX3NoaXBwaW5nID09PSAnc2hpcHBpbmcnICkge1xuICAgICAgICB2YXIgemlwX3BhcmVudCA9ICQob3B0aW9ucy5zaGlwcGluZ196aXBfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpO1xuICAgICAgICB2YXIgc3RhdGVfcGFyZW50ID0gJChvcHRpb25zLnNoaXBwaW5nX3N0YXRlX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKTtcbiAgICAgICAgJChvcHRpb25zLnNoaXBwaW5nX2NvdW50cnlfc2VsZWN0b3IpLnNob3coKTtcbiAgICAgICAgJChvcHRpb25zLnNoaXBwaW5nX3ppcF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkuYXR0cigndHlwZScsICd0ZWwnKTtcbiAgICAgICAgJChvcHRpb25zLnNoaXBwaW5nX3ppcF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkucHJvcCgncmVxdWlyZWQnLCB0cnVlKTtcbiAgICAgICAgJChvcHRpb25zLnNoaXBwaW5nX3N0YXRlX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5wcm9wKCdyZXF1aXJlZCcsIHRydWUpO1xuICAgICAgICAkKCdsYWJlbCcsIHppcF9wYXJlbnQpLmh0bWwoJ1NoaXBwaW5nIFppcCBDb2RlOiA8c3BhbiBjbGFzcz1cImEtZm9ybS1pdGVtLXJlcXVpcmVkXCIgdGl0bGU9XCJUaGlzIGZpZWxkIGlzIHJlcXVpcmVkLlwiPio8L3NwYW4+Jyk7XG4gICAgICAgICQoJ2xhYmVsJywgc3RhdGVfcGFyZW50KS5odG1sKCdTaGlwcGluZyBTdGF0ZTogPHNwYW4gY2xhc3M9XCJhLWZvcm0taXRlbS1yZXF1aXJlZFwiIHRpdGxlPVwiVGhpcyBmaWVsZCBpcyByZXF1aXJlZC5cIj4qPC9zcGFuPicpO1xuICAgICAgfVxuICAgIH0sIC8vIGNoYW5nZUZpZWxkc091dHNpZGVVU1xuXG4gICAgc2hpcHBpbmdBZGRyZXNzOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB2YXIgc2hvd19zaGlwcGluZyA9IGZhbHNlO1xuICAgICAgaWYgKCQob3B0aW9ucy51c2VfZm9yX3NoaXBwaW5nX3NlbGVjdG9yKS5sZW5ndGggPiAwKSB7IC8vIHdlIGhhdmUgYSBzaGlwcGluZyBjaGVja2JveFxuICAgICAgICBzaG93X3NoaXBwaW5nID0gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIGlmIChzaG93X3NoaXBwaW5nID09PSB0cnVlICkge1xuICAgICAgICAkKG9wdGlvbnMudXNlX2Zvcl9zaGlwcGluZ19zZWxlY3RvciwgZWxlbWVudCkucGFyZW50KCkuc2hvdygpO1xuICAgICAgICBpZiAoJChvcHRpb25zLnVzZV9mb3Jfc2hpcHBpbmdfc2VsZWN0b3IsIGVsZW1lbnQpLmlzKCc6Y2hlY2tlZCcpKSB7IC8vIHVzZSBzYW1lIGFzIGJpbGxpbmdcbiAgICAgICAgICAkKG9wdGlvbnMuc2hpcHBpbmdfc2VsZWN0b3IpLmhpZGUoKTtcbiAgICAgICAgfSBlbHNlIHsgLy8gc2VwYXJhdGUgc2hpcHBpbmcgYW5kIGJpbGxpbmdcbiAgICAgICAgICAkKG9wdGlvbnMuc2hpcHBpbmdfc2VsZWN0b3IpLnNob3coKTtcbiAgICAgICAgfVxuICAgICAgICAkKG9wdGlvbnMudXNlX2Zvcl9zaGlwcGluZ19zZWxlY3RvciwgZWxlbWVudCkuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICAgIHRoYXQuc2hpcHBpbmdBZGRyZXNzKGVsZW1lbnQsIG9wdGlvbnMpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIFxuICAgIH0sIC8vIHNoaXBwaW5nQWRkcmVzc1xuXG4gICAgYWxsb3dNaW5ucG9zdEFjY291bnQ6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHZhciBhY2NvdW50X2V4aXN0cyA9IGZhbHNlO1xuXG4gICAgICAvLyBzaG93IHBhc3N3b3JkIGFzIHRleHRcbiAgICAgIHRoYXQuc2hvd1Bhc3N3b3JkKCk7XG5cbiAgICAgIC8vIGNhbGN1bGF0ZSBwYXNzd29yZCBzdHJlbmd0aFxuICAgICAgdGhhdC5zaG93UGFzc3dvcmRTdHJlbmd0aCgpO1xuICAgICAgXG4gICAgICB0aGF0LnNwYW1FbWFpbCgkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpKTtcbiAgICAgICQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGF0LnNwYW1FbWFpbCgkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGF0LnRvZ2dsZUFjY291bnRGaWVsZHMoJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkpO1xuICAgICAgJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICB0aGF0LnRvZ2dsZUFjY291bnRGaWVsZHMoJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkpO1xuICAgICAgfSk7XG5cbiAgICAgIGZ1bmN0aW9uIGRvbmVUeXBpbmcgKCkge1xuICAgICAgICB2YXIgZW1haWwgPSAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpO1xuICAgICAgICBhY2NvdW50X2V4aXN0cyA9IHRoYXQuY2hlY2tNaW5ucG9zdEFjY291bnQoZWxlbWVudCwgb3B0aW9ucywgZW1haWwpO1xuICAgICAgfVxuXG4gICAgICAvL3NldHVwIGJlZm9yZSBmdW5jdGlvbnNcbiAgICAgIHZhciB0eXBpbmdUaW1lcjsgICAgICAgICAgICAgICAgLy90aW1lciBpZGVudGlmaWVyXG4gICAgICB2YXIgZG9uZVR5cGluZ0ludGVydmFsID0gNTAwMDsgIC8vdGltZSBpbiBtcywgNSBzZWNvbmQgZm9yIGV4YW1wbGVcblxuICAgICAgLy9vbiBrZXl1cCwgc3RhcnQgdGhlIGNvdW50ZG93blxuICAgICAgJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS5rZXl1cChmdW5jdGlvbigpe1xuICAgICAgICBjbGVhclRpbWVvdXQodHlwaW5nVGltZXIpO1xuICAgICAgICBpZiAoJChvcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwpIHtcbiAgICAgICAgICB0eXBpbmdUaW1lciA9IHNldFRpbWVvdXQoZG9uZVR5cGluZywgZG9uZVR5cGluZ0ludGVydmFsKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSwgLy8gYWxsb3dNaW5ucG9zdEFjY291bnRcblxuICAgIHNwYW1FbWFpbDogZnVuY3Rpb24oZW1haWxfZmllbGQpIHtcbiAgICAgIHZhciBzcGFtRXJyb3JDb250YWluZXIgPSBlbWFpbF9maWVsZC5wYXJlbnQoKTtcbiAgICAgIGlmICgkKCcuYS1zcGFtLWVtYWlsJywgc3BhbUVycm9yQ29udGFpbmVyKS5sZW5ndGggPT09IDAgKSB7XG4gICAgICAgIHNwYW1FcnJvckNvbnRhaW5lci5hcHBlbmQoJzxwIGNsYXNzPVwiYS1mb3JtLWNhcHRpb24gYS12YWxpZGF0aW9uLWVycm9yIGEtc3BhbS1lbWFpbFwiPlRoaXMgZW1haWwgYWRkcmVzcyBoYXMgYmVlbiBkZXRlY3RlZCBhcyBhIHNwYW1tZXIuPC9wPicpO1xuICAgICAgfVxuICAgICAgJCgnLmEtc3BhbS1lbWFpbCcsIHNwYW1FcnJvckNvbnRhaW5lcikuaGlkZSgpO1xuICAgICAgc3BhbUVycm9yQ29udGFpbmVyLnJlbW92ZUNsYXNzKCdpbnZhbGlkIGEtZXJyb3InKTtcbiAgICB9LCAvLyBzcGFtRW1haWxcblxuICAgIHRvZ2dsZUFjY291bnRGaWVsZHM6IGZ1bmN0aW9uKGNyZWF0ZV9hY2NvdW50X3NlbGVjdG9yKSB7XG4gICAgICBpZiAoY3JlYXRlX2FjY291bnRfc2VsZWN0b3IuaXMoJzpjaGVja2VkJykpIHtcbiAgICAgICAgY3JlYXRlX2FjY291bnRfc2VsZWN0b3IucGFyZW50KCkuYmVmb3JlKCc8cCBjbGFzcz1cImEtZm9ybS1jYXB0aW9uIGEtYWNjb3VudC1leGlzdHMgYS1hY2NvdW50LWV4aXN0cy1zdWNjZXNzXCI+VGhlcmUgaXMgYWxyZWFkeSBhIE1pbm5Qb3N0LmNvbSBhY2NvdW50IHdpdGggdGhpcyBlbWFpbCBhZGRyZXNzLjwvcD4nKTtcbiAgICAgICAgJCgnLmEtYWNjb3VudC1leGlzdHMnKS5oaWRlKCk7XG4gICAgICAgICQodGhpcy5vcHRpb25zLnBhc3N3b3JkX3NlbGVjdG9yLCB0aGlzLmVsZW1lbnQpLnNob3coKTtcbiAgICAgICAgdGhpcy5vcHRpb25zLmNyZWF0ZV9hY2NvdW50ID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQodGhpcy5vcHRpb25zLnBhc3N3b3JkX3NlbGVjdG9yLCB0aGlzLmVsZW1lbnQpLmhpZGUoKTtcbiAgICAgIH1cbiAgICB9LCAvLyB0b2dnbGVBY2NvdW50RmllbGRzXG5cbiAgICBzaG93UGFzc3dvcmQ6IGZ1bmN0aW9uKCkge1xuICAgICAgLy8gQ2FjaGUgb3VyIGpxdWVyeSBlbGVtZW50c1xuICAgICAgdmFyICRzdWJtaXQgPSAkKCcuYnRuLXN1Ym1pdCcpO1xuICAgICAgdmFyICRjb250YWluZXIgPSAkKHRoaXMub3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgdGhpcy5lbGVtZW50KTtcbiAgICAgIHZhciAkZmllbGQgPSAkKCdpbnB1dFtuYW1lPVwicGFzc3dvcmRcIl0nLCAkY29udGFpbmVyKTtcbiAgICAgICQoJy5hLWFjY291bnQtZXhpc3RzJykuaGlkZSgpO1xuICAgICAgdmFyIHNob3dfcGFzcyA9ICc8ZGl2IGNsYXNzPVwiYS1mb3JtLXNob3ctcGFzc3dvcmQgYS1mb3JtLWNhcHRpb25cIj48bGFiZWw+PGlucHV0IHR5cGU9XCJjaGVja2JveFwiIG5hbWU9XCJzaG93X3Bhc3N3b3JkXCIgaWQ9XCJzaG93LXBhc3N3b3JkLWNoZWNrYm94XCIgdmFsdWU9XCIxXCI+IFNob3cgcGFzc3dvcmQ8L2xhYmVsPjwvZGl2Pic7XG4gICAgICAvLyBJbmplY3QgdGhlIHRvZ2dsZSBidXR0b24gaW50byB0aGUgcGFnZVxuICAgICAgJGNvbnRhaW5lci5hcHBlbmQoIHNob3dfcGFzcyApO1xuICAgICAgLy8gQ2FjaGUgdGhlIHRvZ2dsZSBidXR0b25cbiAgICAgIHZhciAkdG9nZ2xlID0gJCgnI3Nob3ctcGFzc3dvcmQtY2hlY2tib3gnKTtcbiAgICAgIC8vIFRvZ2dsZSB0aGUgZmllbGQgdHlwZVxuICAgICAgJHRvZ2dsZS5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgIHZhciBjaGVja2JveCA9ICQodGhpcyk7XG4gICAgICAgIGlmIChjaGVja2JveC5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICAgICRmaWVsZC5hdHRyKCd0eXBlJywgJ3RleHQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkZmllbGQuYXR0cigndHlwZScsICdwYXNzd29yZCcpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIC8vIFNldCB0aGUgZm9ybSBmaWVsZCBiYWNrIHRvIGEgcmVndWxhciBwYXNzd29yZCBlbGVtZW50XG4gICAgICAkc3VibWl0Lm9uKCAnY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICRmaWVsZC5hdHRyKCd0eXBlJywgJ3Bhc3N3b3JkJyk7XG4gICAgICB9KTtcbiAgICB9LFxuXG4gICAgc2hvd1Bhc3N3b3JkU3RyZW5ndGg6IGZ1bmN0aW9uKCkge1xuICAgICAgLy8gY2hlY2tQYXNzd29yZFN0cmVuZ3RoXG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICBpZiAoJCgnLmEtcGFzc3dvcmQtc3RyZW5ndGgnKS5sZW5ndGggPiAwICkge1xuICAgICAgICB2YXIgJGJlZm9yZSA9ICQoJy5hLWZvcm0tc2hvdy1wYXNzd29yZCcpO1xuICAgICAgICAkYmVmb3JlLmFmdGVyKCAkKCc8ZGl2IGNsYXNzPVwiYS1wYXNzd29yZC1zdHJlbmd0aFwiPjxtZXRlciBtYXg9XCI0XCIgaWQ9XCJwYXNzd29yZC1zdHJlbmd0aFwiPjxkaXY+PC9kaXY+PC9tZXRlcj48cCBjbGFzcz1cImEtZm9ybS1jYXB0aW9uXCIgaWQ9XCJwYXNzd29yZC1zdHJlbmd0aC10ZXh0XCI+PC9wPjwvZGl2PicpKTtcbiAgICAgICAgJCggJ2JvZHknICkub24oICdrZXl1cCcsICdpbnB1dFtuYW1lPXBhc3N3b3JkXScsXG4gICAgICAgICAgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aGF0LmNoZWNrUGFzc3dvcmRTdHJlbmd0aChcbiAgICAgICAgICAgICAgJCgnaW5wdXRbbmFtZT1wYXNzd29yZF0nKSwgLy8gUGFzc3dvcmQgZmllbGRcbiAgICAgICAgICAgICAgJCgnI3Bhc3N3b3JkLXN0cmVuZ3RoJyksICAgICAgICAgICAvLyBTdHJlbmd0aCBtZXRlclxuICAgICAgICAgICAgICAkKCcjcGFzc3dvcmQtc3RyZW5ndGgtdGV4dCcpICAgICAgLy8gU3RyZW5ndGggdGV4dCBpbmRpY2F0b3JcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0sIC8vIHNob3dQYXNzd29yZFN0cmVuZ3RoXG5cbiAgICBjaGVja1Bhc3N3b3JkU3RyZW5ndGg6IGZ1bmN0aW9uKCAkcGFzc3dvcmQsICRzdHJlbmd0aE1ldGVyLCAkc3RyZW5ndGhUZXh0ICkge1xuICAgICAgdmFyIHBhc3N3b3JkID0gJHBhc3N3b3JkLnZhbCgpO1xuICAgICAgLy8gR2V0IHRoZSBwYXNzd29yZCBzdHJlbmd0aFxuICAgICAgdmFyIHJlc3VsdCA9IHp4Y3ZibihwYXNzd29yZCk7XG4gICAgICB2YXIgc3RyZW5ndGggPSByZXN1bHQuc2NvcmU7XG5cbiAgICAgICRzdHJlbmd0aFRleHQucmVtb3ZlQ2xhc3MoICdzaG9ydCBiYWQgZ29vZCBzdHJvbmcnICk7XG5cbiAgICAgIC8vIEFkZCB0aGUgc3RyZW5ndGggbWV0ZXIgcmVzdWx0c1xuICAgICAgc3dpdGNoICggc3RyZW5ndGggKSB7XG4gICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAkc3RyZW5ndGhUZXh0LmFkZENsYXNzKCAnYmFkJyApLmh0bWwoICdTdHJlbmd0aDogPHN0cm9uZz5XZWFrPC9zdHJvbmc+JyApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgJHN0cmVuZ3RoVGV4dC5hZGRDbGFzcyggJ2dvb2QnICkuaHRtbCggJ1N0cmVuZ3RoOiA8c3Ryb25nPk1lZGl1bTwvc3Ryb25nPicgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA0OlxuICAgICAgICAgICRzdHJlbmd0aFRleHQuYWRkQ2xhc3MoICdzdHJvbmcnICkuaHRtbCggJ1N0cmVuZ3RoOiA8c3Ryb25nPlN0cm9uZzwvc3Ryb25nPicgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICRzdHJlbmd0aFRleHQuYWRkQ2xhc3MoICdzaG9ydCcgKS5odG1sKCAnU3RyZW5ndGg6IDxzdHJvbmc+VmVyeSB3ZWFrPC9zdHJvbmc+JyApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICRzdHJlbmd0aFRleHQuYWRkQ2xhc3MoICdzaG9ydCcgKS5odG1sKCAnU3RyZW5ndGg6IDxzdHJvbmc+VmVyeSB3ZWFrPC9zdHJvbmc+JyApO1xuICAgICAgfVxuICAgICAgJHN0cmVuZ3RoTWV0ZXIudmFsKHN0cmVuZ3RoKTtcbiAgICAgIHJldHVybiBzdHJlbmd0aDtcbiAgICB9LCAvLyBjaGVja1Bhc3N3b3JkU3RyZW5ndGhcblxuICAgIGNoZWNrTWlubnBvc3RBY2NvdW50OiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zLCBlbWFpbCkge1xuICAgICAgdmFyIHVzZXIgPSB7XG4gICAgICAgIGVtYWlsOiBlbWFpbFxuICAgICAgfTtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICQuYWpheCh7XG4gICAgICAgIG1ldGhvZDogJ0dFVCcsXG4gICAgICAgIHVybDogb3B0aW9ucy5taW5ucG9zdF9yb290ICsgJy93cC1qc29uL3VzZXItYWNjb3VudC1tYW5hZ2VtZW50L3YxL2NoZWNrLWFjY291bnQnLFxuICAgICAgICBkYXRhOiB1c2VyXG4gICAgICB9KS5kb25lKGZ1bmN0aW9uKCByZXN1bHQgKSB7XG4gICAgICAgIGlmIChyZXN1bHQuc3RhdHVzID09PSAnc3VjY2VzcycgJiYgcmVzdWx0LnJlYXNvbiA9PT0gJ3VzZXIgZXhpc3RzJykgeyAvLyB1c2VyIGV4aXN0c1xuICAgICAgICAgIGlmICgkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KS5pcygnOmNoZWNrZWQnKSkge1xuICAgICAgICAgICAgJChvcHRpb25zLnBhc3N3b3JkX3NlbGVjdG9yLCBlbGVtZW50KS5oaWRlKCk7XG4gICAgICAgICAgICAkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKS5oaWRlKCk7XG4gICAgICAgICAgICAkKCcuYS1hY2NvdW50LWV4aXN0cycsIGVsZW1lbnQpLnNob3coKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgJChvcHRpb25zLmNyZWF0ZV9tcF9zZWxlY3RvciwgZWxlbWVudCkub24oJ2NoYW5nZScsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCQob3B0aW9ucy5jcmVhdGVfbXBfc2VsZWN0b3IsIGVsZW1lbnQpLmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgICAgICAgICQob3B0aW9ucy5wYXNzd29yZF9zZWxlY3RvciwgZWxlbWVudCkuaGlkZSgpO1xuICAgICAgICAgICAgICAkKG9wdGlvbnMuY3JlYXRlX21wX3NlbGVjdG9yLCBlbGVtZW50KS5wYXJlbnQoKS5oaWRlKCk7XG4gICAgICAgICAgICAgICQoJy5hLWFjY291bnQtZXhpc3RzJywgZWxlbWVudCkuc2hvdygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKCByZXN1bHQuc3RhdHVzID09PSAnc3BhbScgKSB7XG4gICAgICAgICAgJCh0aGF0Lm9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IpLmFkZENsYXNzKCdpbnZhbGlkIGEtZXJyb3InKTtcbiAgICAgICAgICAkKCAnLmEtc3BhbS1lbWFpbCcpLnNob3coKTtcbiAgICAgICAgfSBlbHNlIHsgLy8gdXNlciBkb2VzIG5vdCBleGlzdCBvciBhamF4IGNhbGwgZmFpbGVkXG4gICAgICAgICAgaWYgKCQob3B0aW9ucy5jcmVhdGVfbXBfc2VsZWN0b3IsIGVsZW1lbnQpLmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgICAgICAkKG9wdGlvbnMucGFzc3dvcmRfc2VsZWN0b3IsIGVsZW1lbnQpLnNob3coKTtcbiAgICAgICAgICAgIG9wdGlvbnMuY3JlYXRlX2FjY291bnQgPSB0cnVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAkKG9wdGlvbnMucGFzc3dvcmRfc2VsZWN0b3IsIGVsZW1lbnQpLmhpZGUoKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgJCgnLmEtYWNjb3VudC1leGlzdHMnLCBlbGVtZW50KS5oaWRlKCk7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9LCAvLyBjaGVja01pbm5wb3N0QWNjb3VudFxuXG4gICAgcGF5bWVudFJlcXVlc3RCdXR0b246IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgIHZhciB0b3RhbF9hbW91bnQgPSB0aGF0LmdldFRvdGFsQW1vdW50KCk7XG4gICAgICB0aGF0LnBheW1lbnRSZXF1ZXN0ID0gdGhhdC5zdHJpcGUucGF5bWVudFJlcXVlc3Qoe1xuICAgICAgICBjb3VudHJ5OiAnVVMnLFxuICAgICAgICBjdXJyZW5jeTogJ3VzZCcsXG4gICAgICAgIHRvdGFsOiB7XG4gICAgICAgICAgbGFiZWw6ICdNaW5uUG9zdCcsXG4gICAgICAgICAgYW1vdW50OiB0b3RhbF9hbW91bnQgKiAxMDAsXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICAgIHRoYXQucHJCdXR0b24gPSB0aGF0LmVsZW1lbnRzLmNyZWF0ZSgncGF5bWVudFJlcXVlc3RCdXR0b24nLCB7XG4gICAgICAgIHBheW1lbnRSZXF1ZXN0OiB0aGF0LnBheW1lbnRSZXF1ZXN0LFxuICAgICAgICBzdHlsZToge1xuICAgICAgICAgIHBheW1lbnRSZXF1ZXN0QnV0dG9uOiB7XG4gICAgICAgICAgICB0eXBlOiAnZG9uYXRlJyxcbiAgICAgICAgICAgIC8vIE9uZSBvZiAnZGVmYXVsdCcsICdib29rJywgJ2J1eScsIG9yICdkb25hdGUnXG4gICAgICAgICAgICAvLyBEZWZhdWx0cyB0byAnZGVmYXVsdCdcbiAgICAgIFxuICAgICAgICAgICAgdGhlbWU6ICdkYXJrJyxcbiAgICAgICAgICAgIC8vIE9uZSBvZiAnZGFyaycsICdsaWdodCcsIG9yICdsaWdodC1vdXRsaW5lJ1xuICAgICAgICAgICAgLy8gRGVmYXVsdHMgdG8gJ2RhcmsnXG4gICAgICBcbiAgICAgICAgICAgIGhlaWdodDogJzQ4cHgnXG4gICAgICAgICAgICAvLyBEZWZhdWx0cyB0byAnNDBweCcuIFRoZSB3aWR0aCBpcyBhbHdheXMgJzEwMCUnLlxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICAgIFxuICAgICAgLy8gQ2hlY2sgdGhlIGF2YWlsYWJpbGl0eSBvZiB0aGUgUGF5bWVudCBSZXF1ZXN0IEFQSSBmaXJzdC5cbiAgICAgIHRoYXQucGF5bWVudFJlcXVlc3QuY2FuTWFrZVBheW1lbnQoKS50aGVuKGZ1bmN0aW9uKHJlc3VsdCkge1xuICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgJCgnLm0tcGF5LXdpdGhvdXQtcGF5bWVudC1yZXF1ZXN0JykuaGlkZSgpO1xuICAgICAgICAgIHRoYXQucHJCdXR0b24ubW91bnQoJyNwYXltZW50LXJlcXVlc3QtYnV0dG9uJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhhdC5oaWRlUGF5bWVudFJlcXVlc3QoICQoJy5vLXBheS13aXRoLXBheW1lbnQtcmVxdWVzdCcpICk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICAkKCcuZGVjbGluZS1hcHBsZS1wYXkgYScpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRoYXQuaGlkZVBheW1lbnRSZXF1ZXN0KCAkKCcuby1wYXktd2l0aC1wYXltZW50LXJlcXVlc3QgLm0tZm9ybS1hY3Rpb25zLXBheS1mZWVzJykgKTtcbiAgICAgIH0pO1xuXG4gICAgICB0aGF0LnByQnV0dG9uLm9uKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KSB7XG5cbiAgICAgICAgLy8gU2VuZCBwYXltZW50TWV0aG9kLmlkIHRvIHNlcnZlclxuICAgICAgICB2YXIgc3VwcG9ydGZvcm0gPSAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3Rvcik7XG5cbiAgICAgICAgLy8gY2hlY2sgdmFsaWRhdGlvbiBvZiBmb3JtXG4gICAgICAgIGlmICghc3VwcG9ydGZvcm0uZ2V0KDApLnJlcG9ydFZhbGlkaXR5KCkpIHtcbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHRoYXQucGF5bWVudFJlcXVlc3Qub24oJ3BheW1lbnRtZXRob2QnLCBmdW5jdGlvbihldmVudCkge1xuXG4gICAgICAgIC8vIFNlbmQgcGF5bWVudE1ldGhvZC5pZCB0byBzZXJ2ZXJcbiAgICAgICAgdmFyIHN1cHBvcnRmb3JtID0gJCh0aGF0Lm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpO1xuICAgICAgICB2YXIgdG9rZW5GaWVsZE5hbWUgPSAncGF5bWVudF9tZXRob2RfaWQnO1xuICAgICAgICB2YXIgdG9rZW5GaWVsZCA9ICdpbnB1dFtuYW1lPVwiJyArIHRva2VuRmllbGROYW1lICsgJ1wiXSc7XG5cbiAgICAgICAgLy8gSW5zZXJ0IHRoZSBwYXltZW50IG1ldGhvZCBJRCBpbnRvIHRoZSBmb3JtIHNvIGl0IGdldHMgc3VibWl0dGVkIHRvIHRoZSBzZXJ2ZXJcbiAgICAgICAgaWYgKCQodG9rZW5GaWVsZCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICQodG9rZW5GaWVsZCkudmFsKGV2ZW50LnBheW1lbnRNZXRob2QuaWQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHN1cHBvcnRmb3JtLmFwcGVuZCgkKCc8aW5wdXQgdHlwZT1cXFwiaGlkZGVuXFxcIiBuYW1lPVwiJyArIHRva2VuRmllbGROYW1lICsgJ1wiPicpLnZhbChldmVudC5wYXltZW50TWV0aG9kLmlkKSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGF0LmZvcm1Qcm9jZXNzb3IodGhhdCwgJ3BheW1lbnRSZXF1ZXN0Jyk7XG5cbiAgICAgIH0pO1xuXG4gICAgfSwgLy8gcGF5bWVudFJlcXVlc3RCdXR0b25cblxuICAgIGhpZGVQYXltZW50UmVxdWVzdDogZnVuY3Rpb24oIGhpZGVFbGVtZW50ICkge1xuICAgICAgaGlkZUVsZW1lbnQuaGlkZSgpO1xuICAgICAgJCgnLmRlY2xpbmUtYXBwbGUtcGF5IGEnKS5oaWRlKCk7XG4gICAgICAkKCcubS1wYXktd2l0aG91dC1wYXltZW50LXJlcXVlc3QnKS5zaG93KCk7XG4gICAgICAkKCcuYS1nLXJlY2FwdGNoYScpLmluc2VydEFmdGVyKCcubS1wYXktd2l0aG91dC1wYXltZW50LXJlcXVlc3QgLm0tZm9ybS1hY3Rpb25zLXBheS1mZWVzJyk7XG4gICAgfSwgLy8gaGlkZVBheW1lbnRSZXF1ZXN0XG5cbiAgICBjaG9vc2VQYXltZW50TWV0aG9kOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG5cbiAgICAgIHZhciB0aGF0ID0gdGhpcztcblxuICAgICAgaWYgKCQob3B0aW9ucy5jaG9vc2VfcGF5bWVudCkubGVuZ3RoID4gMCkge1xuICAgICAgICBpZiAoJChvcHRpb25zLmNob29zZV9wYXltZW50ICsgJyBpbnB1dCcpLmlzKCc6Y2hlY2tlZCcpKSB7XG4gICAgICAgICAgdmFyIGNoZWNrZWRfaWQgPSAkKG9wdGlvbnMuY2hvb3NlX3BheW1lbnQgKyAnIGlucHV0OmNoZWNrZWQnKS5hdHRyKCdpZCcpO1xuICAgICAgICAgIHZhciBjaGVja2VkX3ZhbHVlID0gJChvcHRpb25zLmNob29zZV9wYXltZW50ICsgJyBpbnB1dDpjaGVja2VkJykudmFsKCk7XG4gICAgICAgICAgdGhhdC5zZXR1cFBheW1lbnRNZXRob2QoY2hlY2tlZF9pZCwgY2hlY2tlZF92YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICAkKG9wdGlvbnMuY2hvb3NlX3BheW1lbnQgKyAnIGlucHV0JykuY2hhbmdlKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICB2YXIgY2hlY2tlZF9pZCA9IHRoaXMuaWQ7XG4gICAgICAgICAgdmFyIGNoZWNrZWRfdmFsdWUgPSB0aGlzLnZhbHVlO1xuICAgICAgICAgIHRoYXQuc2V0dXBQYXltZW50TWV0aG9kKGNoZWNrZWRfaWQsIGNoZWNrZWRfdmFsdWUpO1xuICAgICAgICB9KTtcblxuICAgICAgfVxuICAgIH0sIC8vIGNob29zZVBheW1lbnRNZXRob2RcblxuICAgIHNldHVwUGF5bWVudE1ldGhvZDogZnVuY3Rpb24oZWxlbWVudF9pZCwgZWxlbWVudF92YWx1ZSkge1xuICAgICAgdmFyIHN0cmlwZV9wYXltZW50X3R5cGUgPSB0aGlzLnNldFN0cmlwZVBheW1lbnRUeXBlKGVsZW1lbnRfdmFsdWUpO1xuICAgICAgaWYgKCBlbGVtZW50X3ZhbHVlID09PSAnYmFua19hY2NvdW50JyApIHtcbiAgICAgICAgJCgnaW5wdXRbbmFtZT1cInBheW1lbnRfbWV0aG9kX2lkXCJdJywgJCh0aGlzLm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpKS5yZW1vdmUoKTtcbiAgICAgICAgdGhpcy5hY2hGaWVsZHModGhpcy5lbGVtZW50LCB0aGlzLm9wdGlvbnMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yZW1vdmVBY2hGaWVsZHModGhpcy5vcHRpb25zKTtcbiAgICAgIH1cbiAgICAgICQodGhpcy5vcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgICAkKHRoaXMub3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvciArICcuJyArIGVsZW1lbnRfaWQpLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICAgICQodGhpcy5vcHRpb25zLnBheW1lbnRfbWV0aG9kX3NlbGVjdG9yICsgJzpub3QoLmFjdGl2ZSkgaW5wdXQnKS52YWwoJycpO1xuICAgICAgdGhpcy5jYWxjdWxhdGVGZWVzKHRoaXMub3B0aW9ucy5vcmlnaW5hbF9hbW91bnQsIHN0cmlwZV9wYXltZW50X3R5cGUpO1xuICAgIH0sIC8vIHNldHVwUGF5bWVudE1ldGhvZFxuXG4gICAgcmVtb3ZlQWNoRmllbGRzOiBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAkKCdpbnB1dFtuYW1lPVwicHVibGljX3Rva2VuXCJdJywgJChvcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKSkucmVtb3ZlKCk7XG4gICAgICAkKCdpbnB1dFtuYW1lPVwiYWNjb3VudF9pZFwiXScsICQob3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikpLnJlbW92ZSgpO1xuICAgICAgJCgnaW5wdXRbbmFtZT1cImJhbmtUb2tlblwiXScsICQob3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikpLnJlbW92ZSgpO1xuICAgICAgJChvcHRpb25zLnBsYWlkX2xpbmspLmh0bWwoJzxhIGhyZWY9XCIjXCI+U2lnbiBpbiB0byB5b3VyIGJhbmsgYWNjb3VudDwvYT4nKTtcbiAgICAgIHRoaXMuYnV0dG9uRGlzYWJsZWQob3B0aW9ucywgZmFsc2UsICcnLCAnJywgdHJ1ZSk7IC8vIGlmIHRoZSBidXR0b24gd2FzIGRpc2FibGVkLCByZS1lbmFibGUgaXRcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5saW5rSGFuZGxlciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhpcy5saW5rSGFuZGxlci5kZXN0cm95KCk7XG4gICAgICB9XG4gICAgfSwgLy8gcmVtb3ZlQWNoRmllbGRzXG5cbiAgICBjcmVkaXRDYXJkRmllbGRzOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG5cbiAgICAgIHZhciB0aGF0ID0gdGhpcztcblxuICAgICAgdmFyIHN0eWxlID0ge1xuICAgICAgICBiYXNlOiB7XG4gICAgICAgICAgaWNvbkNvbG9yOiAnIzY2NkVFOCcsXG4gICAgICAgICAgbGluZUhlaWdodDogJzQzcHgnLFxuICAgICAgICAgIGZvbnRXZWlnaHQ6IDQwMCxcbiAgICAgICAgICBmb250RmFtaWx5OiAnZmYtbWV0YS13ZWItcHJvJyxcbiAgICAgICAgICBmb250U2l6ZTogJzI0cHgnLFxuICAgICAgICAgIC8vbGluZUhlaWdodDogJzM3cHgnLFxuICAgICAgICAgIC8vZm9udFNpemU6ICcxNnB4JyxcbiAgICAgICAgfSxcbiAgICAgICAgaW52YWxpZDoge1xuICAgICAgICAgIGNvbG9yOiAnIzFhMTgxOCcsXG4gICAgICAgIH0sXG4gICAgICB9O1xuXG4gICAgICAvLyBBZGQgYW4gaW5zdGFuY2Ugb2YgdGhlIGNhcmQgVUkgY29tcG9uZW50IGludG8gdGhlIGBjYXJkLWVsZW1lbnRgIDxkaXY+XG4gICAgICAvL2NhcmQubW91bnQoJyNjYXJkLWVsZW1lbnQnKTtcbiAgICAgIGlmICggJCgnLmNyZWRpdC1jYXJkLWdyb3VwJykubGVuZ3RoID09PSAwICYmICQoJy5wYXltZW50LW1ldGhvZC5jaG9vc2UtY2FyZCcpLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGF0LmNhcmROdW1iZXJFbGVtZW50ID0gdGhhdC5lbGVtZW50cy5jcmVhdGUoJ2NhcmROdW1iZXInLCB7XG4gICAgICAgIHNob3dJY29uOiB0cnVlLFxuICAgICAgICBzdHlsZTogc3R5bGVcbiAgICAgIH0pO1xuICAgICAgdGhhdC5jYXJkTnVtYmVyRWxlbWVudC5tb3VudChvcHRpb25zLmNjX251bV9zZWxlY3Rvcik7XG5cbiAgICAgIHRoYXQuY2FyZEV4cGlyeUVsZW1lbnQgPSB0aGF0LmVsZW1lbnRzLmNyZWF0ZSgnY2FyZEV4cGlyeScsIHtcbiAgICAgICAgc3R5bGU6IHN0eWxlXG4gICAgICB9KTtcbiAgICAgIHRoYXQuY2FyZEV4cGlyeUVsZW1lbnQubW91bnQob3B0aW9ucy5jY19leHBfc2VsZWN0b3IpO1xuXG4gICAgICB0aGF0LmNhcmRDdmNFbGVtZW50ID0gdGhhdC5lbGVtZW50cy5jcmVhdGUoJ2NhcmRDdmMnLCB7XG4gICAgICAgIHN0eWxlOiBzdHlsZVxuICAgICAgfSk7XG4gICAgICB0aGF0LmNhcmRDdmNFbGVtZW50Lm1vdW50KG9wdGlvbnMuY2NfY3ZjX3NlbGVjdG9yKTtcblxuICAgICAgLy8gdmFsaWRhdGUvZXJyb3IgaGFuZGxlIHRoZSBjYXJkIGZpZWxkc1xuICAgICAgdGhhdC5jYXJkTnVtYmVyRWxlbWVudC5vbignY2hhbmdlJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgdmFyIHN0cmlwZV9wYXltZW50X3R5cGUgPSAnY2FyZCc7XG4gICAgICAgIC8vIFN3aXRjaCBwYXltZW50IHR5cGUgaWYgaXQncyBvbmUgdGhhdCB3ZSByZWNvZ25pemUgYXMgZGlzdGluY3RcbiAgICAgICAgaWYgKGV2ZW50LmJyYW5kKSB7XG4gICAgICAgICAgaWYgKCBldmVudC5icmFuZCA9PT0gJ2FtZXgnICkge1xuICAgICAgICAgICAgc3RyaXBlX3BheW1lbnRfdHlwZSA9ICdhbWV4JztcbiAgICAgICAgICB9ICAgICAgICAgIFxuICAgICAgICB9XG4gICAgICAgIC8vIGVycm9yIGhhbmRsaW5nXG4gICAgICAgIHRoYXQuc3RyaXBlRXJyb3JEaXNwbGF5KGV2ZW50LmVycm9yLCAkKG9wdGlvbnMuY2NfbnVtX3NlbGVjdG9yLCBlbGVtZW50KSwgZWxlbWVudCwgb3B0aW9ucyApO1xuICAgICAgICAvLyBpZiBpdCBjaGFuZ2VkLCByZXNldCB0aGUgYnV0dG9uXG4gICAgICAgIHRoYXQuYnV0dG9uU3RhdHVzKG9wdGlvbnMsICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKSwgZmFsc2UpO1xuICAgICAgICB0aGF0LmNhbGN1bGF0ZUZlZXModGhhdC5vcHRpb25zLm9yaWdpbmFsX2Ftb3VudCwgc3RyaXBlX3BheW1lbnRfdHlwZSk7XG4gICAgICB9KTtcblxuICAgICAgdGhhdC5jYXJkRXhwaXJ5RWxlbWVudC5vbignY2hhbmdlJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgLy8gZXJyb3IgaGFuZGxpbmdcbiAgICAgICAgdGhhdC5zdHJpcGVFcnJvckRpc3BsYXkoZXZlbnQuZXJyb3IsICQob3B0aW9ucy5jY19leHBfc2VsZWN0b3IsIGVsZW1lbnQpLCBlbGVtZW50LCBvcHRpb25zICk7XG4gICAgICAgIC8vIGlmIGl0IGNoYW5nZWQsIHJlc2V0IHRoZSBidXR0b25cbiAgICAgICAgdGhhdC5idXR0b25TdGF0dXMob3B0aW9ucywgJCh0aGF0Lm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLmZpbmQoJ2J1dHRvbicpLCBmYWxzZSk7XG4gICAgICB9KTtcblxuICAgICAgdGhhdC5jYXJkQ3ZjRWxlbWVudC5vbignY2hhbmdlJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgLy8gZXJyb3IgaGFuZGxpbmdcbiAgICAgICAgdGhhdC5zdHJpcGVFcnJvckRpc3BsYXkoZXZlbnQuZXJyb3IsICQob3B0aW9ucy5jY19jdmNfc2VsZWN0b3IsIGVsZW1lbnQpLCBlbGVtZW50LCBvcHRpb25zICk7XG4gICAgICAgIC8vIGlmIGl0IGNoYW5nZWQsIHJlc2V0IHRoZSBidXR0b25cbiAgICAgICAgdGhhdC5idXR0b25TdGF0dXMob3B0aW9ucywgJCh0aGF0Lm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLmZpbmQoJ2J1dHRvbicpLCBmYWxzZSk7XG4gICAgICB9KTtcblxuICAgICAgLy8gdGhpcyBpcyB0aGUgbWV0aG9kIHRvIGNyZWF0ZSBhIHNpbmdsZSBjYXJkIGZpZWxkIGFuZCBtb3VudCBpdFxuICAgICAgLyp2YXIgY2FyZCA9IHRoYXQuZWxlbWVudHMuY3JlYXRlKFxuICAgICAgICAnY2FyZCcsXG4gICAgICAgIHtcbiAgICAgICAgICBoaWRlUG9zdGFsQ29kZTogdHJ1ZVxuICAgICAgICB9XG4gICAgICApO1xuICAgICAgLy8gQWRkIGFuIGluc3RhbmNlIG9mIHRoZSBjYXJkIFVJIGNvbXBvbmVudCBpbnRvIHRoZSBgY2FyZC1lbGVtZW50YCA8ZGl2PlxuICAgICAgY2FyZC5tb3VudCgnI2NhcmQtZWxlbWVudCcpOyovXG5cbiAgICB9LCAvLyBjcmVkaXRDYXJkRmllbGRzXG5cbiAgICBzaG93U3Bpbm5lcjogZnVuY3Rpb24oKSB7XG4gICAgICAkKHRoaXMub3B0aW9ucy5wbGFpZF9saW5rKS5oaWRlKCk7XG4gICAgICAkKHRoaXMub3B0aW9ucy5wbGFpZF9saW5rKS5hZnRlcignPGRpdiBjbGFzcz1cImEtc3Bpbm5lclwiPjxpbWcgc3JjPVwiaHR0cHM6Ly93d3cubWlubnBvc3QuY29tL3dwLWFkbWluL2ltYWdlcy9zcGlubmVyLmdpZlwiIHNyY3NldD1cImh0dHBzOi8vd3d3Lm1pbm5wb3N0LmNvbS93cC1hZG1pbi9pbWFnZXMvc3Bpbm5lci5naWYgMXgsIGh0dHBzOi8vd3d3Lm1pbm5wb3N0LmNvbS93cC1hZG1pbi9pbWFnZXMvc3Bpbm5lci0yeC5naWYgMngsXCI+PC9kaXY+Jyk7XG4gICAgfSxcblxuICAgIGhpZGVTcGlubmVyOiBmdW5jdGlvbigpIHtcbiAgICAgICQodGhpcy5vcHRpb25zLnBsYWlkX2xpbmspLnNob3coKTtcbiAgICAgICQoJy5hLXNwaW5uZXInKS5oaWRlKCk7XG4gICAgfSxcblxuICAgIGFjaEZpZWxkczogZnVuY3Rpb24oZWxlbWVudCwgb3B0aW9ucykge1xuICAgICAgdmFyIGJhbmtUb2tlbkZpZWxkTmFtZSA9ICdiYW5rVG9rZW4nO1xuICAgICAgdmFyIGJhbmtUb2tlbkZpZWxkID0gJ2lucHV0W25hbWU9XCInICsgYmFua1Rva2VuRmllbGROYW1lICsgJ1wiXSc7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICAvLyB0aGUgYnV0dG9uIHNob3VsZCBub3QgYmUgY2xpY2thYmxlIHVudGlsIHRoZSB1c2VyIGhhcyBzaWduZWQgaW5cbiAgICAgIHRoYXQuYnV0dG9uRGlzYWJsZWQob3B0aW9ucywgdHJ1ZSwgJycsICdTaWduIGluIHRvIHlvdXIgYmFuayBhY2NvdW50IChhYm92ZSkgZmlyc3QnKTtcblxuICAgICAgaWYgKHR5cGVvZiBQbGFpZCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgdGhhdC5saW5rSGFuZGxlciA9IFBsYWlkLmNyZWF0ZSh7XG4gICAgICAgICAgY2xpZW50TmFtZTogJ01pbm5Qb3N0JyxcbiAgICAgICAgICBlbnY6IG9wdGlvbnMucGxhaWRfZW52LFxuICAgICAgICAgIHByb2R1Y3Q6IFsnYXV0aCddLFxuICAgICAgICAgIC8vIDEuIFBhc3MgdGhlIHRva2VuIGdlbmVyYXRlZCBpbiBzdGVwIDIuXG4gICAgICAgICAgdG9rZW46IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGFpZF9saW5rX3Rva2VuJykudmFsdWUsXG4gICAgICAgICAgb25TdWNjZXNzOiBmdW5jdGlvbihwdWJsaWNfdG9rZW4sIG1ldGFkYXRhKSB7XG4gICAgICAgICAgICB0aGF0LnNob3dTcGlubmVyKCk7XG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICB1cmw6Jy9nZXRfcGxhaWRfYWNjZXNzX3Rva2VuLycsXG4gICAgICAgICAgICAgIGRhdGE6IEpTT04uc3RyaW5naWZ5KHsgcHVibGljX3Rva2VuOiBwdWJsaWNfdG9rZW4sIGFjY291bnRfaWQ6IG1ldGFkYXRhLmFjY291bnRfaWQgfSksXG4gICAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04J1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIC5kb25lKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAgIGlmICh0eXBlb2YgcmVzcG9uc2UuZXJyb3IgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgLy8gdGhlcmUgaXMgYW4gZXJyb3IuXG4gICAgICAgICAgICAgICAgdGhhdC5oaWRlU3Bpbm5lcigpO1xuICAgICAgICAgICAgICAgICQob3B0aW9ucy5wbGFpZF9saW5rKS5iZWZvcmUoJzxwIGNsYXNzPVwiYS1lcnJvciBhLXZhbGlkYXRpb24tZXJyb3JcIj4nICsgcmVzcG9uc2UuZXJyb3IgKyAnPC9wPicpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vdGhpcy5kZWJ1ZygncHJpbnQgcmVzcG9uc2UgaGVyZScpO1xuICAgICAgICAgICAgICAgIC8vdGhpcy5kZWJ1ZyhyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgLy8gYWRkIHRoZSBmaWVsZChzKSB3ZSBuZWVkIHRvIHRoZSBmb3JtIGZvciBzdWJtaXR0aW5nXG4gICAgICAgICAgICAgICAgaWYgKCQoYmFua1Rva2VuRmllbGQpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICQoYmFua1Rva2VuRmllbGQpLnZhbChyZXNwb25zZS5zdHJpcGVfYmFua19hY2NvdW50X3Rva2VuKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgJChvcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5wcmVwZW5kKCQoJzxpbnB1dCB0eXBlPVxcXCJoaWRkZW5cXFwiIG5hbWU9XCInICsgYmFua1Rva2VuRmllbGROYW1lICsgJ1wiPicpLnZhbChyZXNwb25zZS5zdHJpcGVfYmFua19hY2NvdW50X3Rva2VuKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICQob3B0aW9ucy5wbGFpZF9saW5rLCBlbGVtZW50KS5odG1sKCc8c3Ryb25nPllvdXIgYWNjb3VudCB3YXMgc3VjY2Vzc2Z1bGx5IGF1dGhvcml6ZWQ8L3N0cm9uZz4nKTtcbiAgICAgICAgICAgICAgICB0aGF0LmhpZGVTcGlubmVyKCk7XG4gICAgICAgICAgICAgICAgdGhhdC5idXR0b25EaXNhYmxlZChvcHRpb25zLCBmYWxzZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAuZmFpbChmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICB0aGF0LmRlYnVnKHJlc3BvbnNlKTtcbiAgICAgICAgICAgICAgdGhhdC5oaWRlU3Bpbm5lcigpO1xuICAgICAgICAgICAgICAkKG9wdGlvbnMucGxhaWRfbGluaykuYmVmb3JlKCc8cCBjbGFzcz1cImEtZXJyb3IgYS12YWxpZGF0aW9uLWVycm9yXCI+JyArIHJlc3BvbnNlLmVycm9yICsgJzwvcD4nKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgICAkKG9wdGlvbnMucGxhaWRfbGluayArICcgYScpLmNsaWNrKGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICB0aGF0LnJlc2V0Rm9ybUVycm9ycyh0aGF0Lm9wdGlvbnMsIHRoYXQuZWxlbWVudCk7XG4gICAgICAgICAgLy8kKG9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IgKyAnIC5hLWVycm9yJykucmVtb3ZlKCk7IC8vIHJlbW92ZSBtZXRob2QgZXJyb3IgbWVzc2FnZSBpZiBpdCBpcyB0aGVyZVxuICAgICAgICAgIHRoYXQubGlua0hhbmRsZXIub3BlbigpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9LCAvLyBhY2hGaWVsZHNcblxuICAgIGJ1dHRvblN0YXR1czogZnVuY3Rpb24ob3B0aW9ucywgYnV0dG9uLCBkaXNhYmxlZCkge1xuICAgICAgLy8gbWFrZSB0aGUgYnV0dG9uIGNsaWNrYWJsZSBvciBub3RcbiAgICAgIHRoaXMuYnV0dG9uRGlzYWJsZWQob3B0aW9ucywgZGlzYWJsZWQsIGJ1dHRvbik7XG4gICAgICBpZiAoZGlzYWJsZWQgPT09IGZhbHNlKSB7XG4gICAgICAgIGJ1dHRvbi50ZXh0KG9wdGlvbnMuYnV0dG9uX3RleHQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYnV0dG9uLnRleHQoJ1Byb2Nlc3NpbmcnKTtcbiAgICAgIH1cbiAgICB9LCAvLyBidXR0b25TdGF0dXNcblxuICAgIGJ1dHRvbkRpc2FibGVkOiBmdW5jdGlvbihvcHRpb25zLCBkaXNhYmxlZCwgYnV0dG9uID0gJycsIG1lc3NhZ2UgPSAnJywgYWNoX3dhc19pbml0aWFsaXplZCA9IGZhbHNlKSB7XG4gICAgICBpZiAoYnV0dG9uID09PSAnJykge1xuICAgICAgICBidXR0b24gPSAkKG9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpLmZpbmQoJ2J1dHRvbicpO1xuICAgICAgfVxuICAgICAgYnV0dG9uLnByb3AoJ2Rpc2FibGVkJywgZGlzYWJsZWQpO1xuICAgICAgaWYgKHR5cGVvZiB0bGl0ZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgaWYgKG1lc3NhZ2UgIT09ICcnKSB7XG4gICAgICAgICAgaWYgKGRpc2FibGVkID09PSB0cnVlKSB7XG4gICAgICAgICAgICBidXR0b24uYXR0cignZGF0YS10bGl0ZScsIG1lc3NhZ2UpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBidXR0b24ucmVtb3ZlQXR0ciggJ2RhdGEtdGxpdGUnICk7IC8vIHRoZXJlIHNob3VsZCBiZSBubyB0bGl0ZSB2YWx1ZSBpZiB0aGUgYnV0dG9uIGlzIGVuYWJsZWRcbiAgICAgICAgICB9XG4gICAgICAgICAgYnV0dG9uLm9uKCdtb3VzZWVudGVyIGZvY3VzJywgZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgICAgIHRsaXRlLnNob3coICggdGhpcyApLCB7IGdyYXY6ICdudycgfSApO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIGJ1dHRvbi5vbignbW91c2VsZWF2ZScsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICB0bGl0ZS5oaWRlKCAoIHRoaXMgKSApO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJ1dHRvbi5yZW1vdmVBdHRyKCAnZGF0YS10bGl0ZScgKTtcbiAgICAgICAgICBpZiAoYWNoX3dhc19pbml0aWFsaXplZCA9PT0gdHJ1ZSApIHtcbiAgICAgICAgICAgIGJ1dHRvbi5vbignbW91c2VlbnRlciBmb2N1cycsIGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICAgIHRsaXRlLmhpZGUoICggdGhpcyApICk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGJ1dHRvbi5jbGljayhmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sIC8vIGJ1dHRvbkRpc2FibGVkXG5cbiAgICB2YWxpZGF0ZVNldHVwOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICB2YXIgZm9ybXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKG9wdGlvbnMuZm9ybV9zZWxlY3Rvcik7XG4gICAgICBmb3Jtcy5mb3JFYWNoKCBmdW5jdGlvbiAoIGZvcm0gKSB7XG4gICAgICAgIFZhbGlkRm9ybSggZm9ybSwge1xuICAgICAgICAgIHZhbGlkYXRpb25FcnJvclBhcmVudENsYXNzOiAnbS1oYXMtdmFsaWRhdGlvbi1lcnJvcicsXG4gICAgICAgICAgdmFsaWRhdGlvbkVycm9yQ2xhc3M6ICdhLXZhbGlkYXRpb24tZXJyb3InLFxuICAgICAgICAgIGludmFsaWRDbGFzczogJ2EtZXJyb3InLFxuICAgICAgICAgIGVycm9yUGxhY2VtZW50OiAnYWZ0ZXInXG4gICAgICAgIH0gKVxuICAgICAgfSApO1xuICAgICAgdGhpcy5zY3JvbGxUb0Zvcm1FcnJvcihvcHRpb25zKTtcbiAgICB9LCAvLyB2YWxpZGF0ZVNldHVwXG5cbiAgICBzY3JvbGxUb0Zvcm1FcnJvcjogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgdmFyIGZvcm0gPSAkKCBvcHRpb25zLmZvcm1fc2VsZWN0b3IgKTtcbiAgICAgIC8vIGxpc3RlbiBmb3IgYGludmFsaWRgIGV2ZW50cyBvbiBhbGwgZm9ybSBpbnB1dHNcbiAgICAgIGZvcm0uZmluZCggJzppbnB1dCcgKS5vbiggJ2ludmFsaWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgdmFyIGlucHV0ID0gJCggdGhpcyApO1xuICAgICAgICAgIC8vIHRoZSBmaXJzdCBpbnZhbGlkIGVsZW1lbnQgaW4gdGhlIGZvcm1cbiAgICAgICAgdmFyIGZpcnN0ID0gZm9ybS5maW5kKCAnLmEtZXJyb3InICkuZmlyc3QoKTtcbiAgICAgICAgLy8gdGhlIGZvcm0gaXRlbSB0aGF0IGNvbnRhaW5zIGl0XG4gICAgICAgIHZhciBmaXJzdF9ob2xkZXIgPSBmaXJzdC5wYXJlbnQoKTtcbiAgICAgICAgICAvLyBvbmx5IGhhbmRsZSBpZiB0aGlzIGlzIHRoZSBmaXJzdCBpbnZhbGlkIGlucHV0XG4gICAgICAgICAgaWYgKGlucHV0WzBdID09PSBmaXJzdFswXSkge1xuICAgICAgICAgICAgICAvLyBoZWlnaHQgb2YgdGhlIG5hdiBiYXIgcGx1cyBzb21lIHBhZGRpbmcgaWYgdGhlcmUncyBhIGZpeGVkIG5hdlxuICAgICAgICAgICAgICAvL3ZhciBuYXZiYXJIZWlnaHQgPSBuYXZiYXIuaGVpZ2h0KCkgKyA1MFxuXG4gICAgICAgICAgICAgIC8vIHRoZSBwb3NpdGlvbiB0byBzY3JvbGwgdG8gKGFjY291bnRpbmcgZm9yIHRoZSBuYXZiYXIgaWYgaXQgZXhpc3RzKVxuICAgICAgICAgICAgICB2YXIgZWxlbWVudE9mZnNldCA9IGZpcnN0X2hvbGRlci5vZmZzZXQoKS50b3A7XG5cbiAgICAgICAgICAgICAgLy8gdGhlIGN1cnJlbnQgc2Nyb2xsIHBvc2l0aW9uIChhY2NvdW50aW5nIGZvciB0aGUgbmF2YmFyKVxuICAgICAgICAgICAgICB2YXIgcGFnZU9mZnNldCA9IHdpbmRvdy5wYWdlWU9mZnNldDtcblxuICAgICAgICAgICAgICAvLyBkb24ndCBzY3JvbGwgaWYgdGhlIGVsZW1lbnQgaXMgYWxyZWFkeSBpbiB2aWV3XG4gICAgICAgICAgICAgIGlmICggZWxlbWVudE9mZnNldCA+IHBhZ2VPZmZzZXQgJiYgZWxlbWVudE9mZnNldCA8IHBhZ2VPZmZzZXQgKyB3aW5kb3cuaW5uZXJIZWlnaHQgKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIC8vIG5vdGU6IGF2b2lkIHVzaW5nIGFuaW1hdGUsIGFzIGl0IHByZXZlbnRzIHRoZSB2YWxpZGF0aW9uIG1lc3NhZ2UgZGlzcGxheWluZyBjb3JyZWN0bHlcbiAgICAgICAgICAgICAgJCggJ2h0bWwsIGJvZHknICkuc2Nyb2xsVG9wKCBlbGVtZW50T2Zmc2V0ICk7XG4gICAgICAgICAgfVxuICAgICAgfSApO1xuICAgIH0sIC8vIHNjcm9sbFRvRm9ybUVycm9yXG5cbiAgICBmb3JtU2V0dXA6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcblxuICAgICAgJChvcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5zdWJtaXQoZnVuY3Rpb24oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhhdC5mb3JtUHJvY2Vzc29yKHRoYXQsICdzdWJtaXQnKTtcblxuICAgICAgfSk7XG4gICAgfSwgLy8gZm9ybVNldHVwXG5cbiAgICBmb3JtUHJvY2Vzc29yOiBmdW5jdGlvbih0aGF0LCB0eXBlKSB7XG5cbiAgICAgIC8vIDEuIHJlbW92ZSBwcmV2aW91cyBlcnJvcnMgYW5kIHJlc2V0IHRoZSBidXR0b25cbiAgICAgIHRoYXQucmVzZXRGb3JtRXJyb3JzKHRoYXQub3B0aW9ucywgdGhhdC5lbGVtZW50KTtcblxuICAgICAgLy8gMi4gc2V0IHVwIHRoZSBidXR0b24gaWYgaXQncyBhIGZvcm0gc3VibWl0XG4gICAgICBpZiAodHlwZSA9PT0gJ3N1Ym1pdCcpIHtcbiAgICAgICAgdGhhdC5idXR0b25TdGF0dXModGhhdC5vcHRpb25zLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIHRydWUpO1xuICAgICAgfVxuXG4gICAgICAvLyAzLiBnZW5lcmF0ZSBiaWxsaW5nIGFkZHJlc3MgZGV0YWlsc1xuICAgICAgdmFyIGJpbGxpbmdEZXRhaWxzID0gdGhhdC5nZW5lcmF0ZUJpbGxpbmdEZXRhaWxzKCk7XG5cbiAgICAgIC8vIDQuIGNyZWF0ZSBtaW5ucG9zdCB1c2VyIGFjY291bnRcbiAgICAgIHRoYXQuY3JlYXRlTWlublBvc3RBY2NvdW50KHRoYXQub3B0aW9ucywgdGhhdC5lbGVtZW50KTtcblxuICAgICAgLy8gNS4gZG8gdGhlIGNoYXJnaW5nIG9mIGNhcmQgb3IgYmFuayBhY2NvdW50IGlmIGl0J3MgYSBmb3JtIHN1Ym1pdFxuICAgICAgLy8gb3Igc3VibWl0IHRoZSBmb3JtIGlmIHRoaXMgaXMgYSBwYXltZW50IHJlcXVlc3QgYnV0dG9uXG4gICAgICBpZiAodHlwZSA9PT0gJ3N1Ym1pdCcpIHtcbiAgICAgICAgdmFyIHBheW1lbnRfdHlwZSA9ICQoJ2lucHV0W25hbWU9XCJzdHJpcGVfcGF5bWVudF90eXBlXCJdJykudmFsKCk7XG4gICAgICAgIGlmIChwYXltZW50X3R5cGUgIT09ICdiYW5rX2FjY291bnQnKSB7XG4gICAgICAgICAgLy8gZmluYWxseSwgZ2V0IGEgcGF5bWVudCBtZXRob2QgZnJvbSBzdHJpcGUsIGFuZCB0cnkgdG8gY2hhcmdlIGl0IGlmIGl0IGlzIG5vdCBhY2hcbiAgICAgICAgICB0aGF0LmNyZWF0ZVBheW1lbnRNZXRob2QodGhhdC5jYXJkTnVtYmVyRWxlbWVudCwgYmlsbGluZ0RldGFpbHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGlmIGl0IGlzIGFjaCwgd2UgYWxyZWFkeSBoYXZlIGEgdG9rZW4gc28gc3VibWl0IHRoZSBmb3JtXG4gICAgICAgICAgLy8gdG9kbzogdXBncmFkZSB0aGUgcGxhaWQgaW50ZWdyYXRpb25cbiAgICAgICAgICB0aGF0LmJhbmtUb2tlbkhhbmRsZXIoICQoJ2lucHV0W25hbWU9XCJiYW5rVG9rZW5cIl0nKS52YWwoKSwgJ2JhbmtfYWNjb3VudCcgKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhhdC5zdWJtaXRGb3JtT25seSgpO1xuICAgICAgfVxuICAgIH0sIC8vIGZvcm1Qcm9jZXNzb3JcblxuICAgIHN0cmlwZUVycm9yRGlzcGxheTogZnVuY3Rpb24oZXJyb3IsIHRoaXNfc2VsZWN0b3IsIGVsZW1lbnQsIG9wdGlvbnMpIHtcbiAgICAgIC8vIGxpc3RlbiBmb3IgZXJyb3JzIGFuZCBkaXNwbGF5L2hpZGUgZXJyb3IgbWVzc2FnZXNcbiAgICAgIHZhciB3aGljaF9lcnJvciA9IHRoaXNfc2VsZWN0b3IuYXR0cignaWQnKTtcbiAgICAgIC8vIHdoZW4gdGhpcyBmaWVsZCBjaGFuZ2VzLCByZXNldCBpdHMgZXJyb3JzXG4gICAgICAkKCcuYS1jYXJkLWluc3RydWN0aW9uLicgKyB3aGljaF9lcnJvcikucmVtb3ZlQ2xhc3MoJ2EtdmFsaWRhdGlvbi1lcnJvcicpO1xuICAgICAgJCgnLmEtY2FyZC1pbnN0cnVjdGlvbi4nICsgd2hpY2hfZXJyb3IpLmVtcHR5KCk7XG4gICAgICAkKHRoaXNfc2VsZWN0b3IpLnJlbW92ZUNsYXNzKCdhLWVycm9yJyk7XG4gICAgICBpZiAoZXJyb3IpIHtcbiAgICAgICAgaWYgKCQoJy5hLWNhcmQtaW5zdHJ1Y3Rpb24uJyArIHdoaWNoX2Vycm9yKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgJCgnLmEtY2FyZC1pbnN0cnVjdGlvbi4nICsgd2hpY2hfZXJyb3IpLnRleHQoZXJyb3IubWVzc2FnZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpc19zZWxlY3Rvci5wYXJlbnQoKS5hcHBlbmQoJzxwIGNsYXNzPVwiYS1jYXJkLWluc3RydWN0aW9uICcgKyB3aGljaF9lcnJvciArICdcIj4nICsgZXJyb3IubWVzc2FnZSArICc8L3A+Jyk7XG4gICAgICAgIH1cbiAgICAgICAgJCgnLmEtY2FyZC1pbnN0cnVjdGlvbi4nICsgd2hpY2hfZXJyb3IpLmFkZENsYXNzKCdhLXZhbGlkYXRpb24tZXJyb3InKTtcbiAgICAgICAgdGhpc19zZWxlY3Rvci5wYXJlbnQoKS5hZGRDbGFzcygnbS1oYXMtdmFsaWRhdGlvbi1lcnJvcicpO1xuICAgICAgICAkKHRoaXNfc2VsZWN0b3IpLmFkZENsYXNzKCdhLWVycm9yJyk7XG4gICAgICAgIGlmICh0aGlzX3NlbGVjdG9yLnBhcmVudCgpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgICBzY3JvbGxUb3A6IHRoaXNfc2VsZWN0b3IucGFyZW50KCkub2Zmc2V0KCkudG9wXG4gICAgICAgICAgfSwgMjAwMCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICQodGhpc19zZWxlY3RvcikucmVtb3ZlQ2xhc3MoJ2EtZXJyb3InKTtcbiAgICAgICAgJCgnLmEtY2FyZC1pbnN0cnVjdGlvbi4nICsgd2hpY2hfZXJyb3IpLnJlbW92ZUNsYXNzKCdhLXZhbGlkYXRpb24tZXJyb3InKTtcbiAgICAgICAgJCgnLmEtY2FyZC1pbnN0cnVjdGlvbi4nICsgd2hpY2hfZXJyb3IpLmVtcHR5KCk7XG4gICAgICAgICQob3B0aW9ucy5jY19udW1fc2VsZWN0b3IsIGVsZW1lbnQpLnJlbW92ZUNsYXNzKCdhLXZhbGlkYXRpb24tZXJyb3InKTtcbiAgICAgICAgJChvcHRpb25zLmNjX2V4cF9zZWxlY3RvciwgZWxlbWVudCkucmVtb3ZlQ2xhc3MoJ2EtdmFsaWRhdGlvbi1lcnJvcicpO1xuICAgICAgICAkKG9wdGlvbnMuY2NfY3ZjX3NlbGVjdG9yLCBlbGVtZW50KS5yZW1vdmVDbGFzcygnYS12YWxpZGF0aW9uLWVycm9yJyk7XG4gICAgICAgICQob3B0aW9ucy5jY19udW1fc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdtLWhhcy12YWxpZGF0aW9uLWVycm9yJyk7XG4gICAgICAgICQob3B0aW9ucy5jY19leHBfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdtLWhhcy12YWxpZGF0aW9uLWVycm9yJyk7XG4gICAgICAgICQob3B0aW9ucy5jY19jdmNfc2VsZWN0b3IsIGVsZW1lbnQpLnBhcmVudCgpLnJlbW92ZUNsYXNzKCdtLWhhcy12YWxpZGF0aW9uLWVycm9yJyk7XG4gICAgICB9XG4gICAgfSwgLy8gc3RyaXBlRXJyb3JEaXNwbGF5XG5cbiAgICByZXNldEZvcm1FcnJvcnM6IGZ1bmN0aW9uKG9wdGlvbnMsIGVsZW1lbnQpIHtcbiAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICQoJy5hLXZhbGlkYXRpb24tZXJyb3InKS5yZW1vdmUoKTtcbiAgICAgICQoJ2lucHV0LCBsYWJlbCwgZGl2JywgZWxlbWVudCkucmVtb3ZlQ2xhc3MoJ2EtZXJyb3InKTtcbiAgICAgICQoJ2xhYmVsJywgZWxlbWVudCkucmVtb3ZlQ2xhc3MoJ20taGFzLXZhbGlkYXRpb24tZXJyb3InKTtcbiAgICAgICQob3B0aW9ucy5wYXltZW50X21ldGhvZF9zZWxlY3RvciwgZWxlbWVudCkucmVtb3ZlQ2xhc3MoJ2EtZXJyb3IgaW52YWxpZCcpO1xuICAgICAgJCgnLmEtdmFsaWRhdGlvbi1lcnJvcicpLnJlbW92ZSgpO1xuICAgICAgXG4gICAgICAkKG9wdGlvbnMuY2hvb3NlX3BheW1lbnQgKyAnIGlucHV0JykuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICAkKG9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IgKyAnIC5hLWVycm9yJykucmVtb3ZlKCk7IC8vIHJlbW92ZSBtZXRob2QgZXJyb3IgbWVzc2FnZSBpZiBpdCBpcyB0aGVyZVxuICAgICAgICAkKG9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IpLnBhcmVudCgpLmZpbmQoJy5hLXZhbGlkYXRpb24tZXJyb3InKS5yZW1vdmUoKTtcbiAgICAgICAgLy8gaWYgYSBwYXltZW50IGZpZWxkIGNoYW5nZWQsIHJlc2V0IHRoZSBidXR0b25cbiAgICAgICAgdGhhdC5idXR0b25TdGF0dXMob3B0aW9ucywgJChvcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKSwgZmFsc2UpO1xuICAgICAgfSk7XG4gICAgfSwgLy8gcmVzZXRGb3JtRXJyb3JzXG4gICAgXG4gICAgY3JlYXRlTWlublBvc3RBY2NvdW50OiBmdW5jdGlvbihvcHRpb25zLCBlbGVtZW50KSB7XG4gICAgICAvLyAyLiBjcmVhdGUgbWlubnBvc3QgYWNjb3VudCBpZiBzcGVjaWZpZWRcbiAgICAgIGlmIChvcHRpb25zLmNyZWF0ZV9hY2NvdW50ID09PSB0cnVlKSB7XG4gICAgICAgIHZhciB1c2VyID0ge1xuICAgICAgICAgIGVtYWlsOiAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgIGZpcnN0X25hbWU6ICQob3B0aW9ucy5maXJzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yLCBlbGVtZW50KS52YWwoKSxcbiAgICAgICAgICBsYXN0X25hbWU6ICQob3B0aW9ucy5sYXN0X25hbWVfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgIHBhc3N3b3JkOiAkKG9wdGlvbnMucGFzc3dvcmRfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgIGNpdHk6ICQob3B0aW9ucy5iaWxsaW5nX2NpdHlfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgIHN0YXRlOiAkKG9wdGlvbnMuYmlsbGluZ19zdGF0ZV9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgemlwOiAkKG9wdGlvbnMuYmlsbGluZ196aXBfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICB9O1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgICAgICAgIHVybDogb3B0aW9ucy5taW5ucG9zdF9yb290ICsgJy93cC1qc29uL3VzZXItYWNjb3VudC1tYW5hZ2VtZW50L3YxL2NyZWF0ZS11c2VyJyxcbiAgICAgICAgICBkYXRhOiB1c2VyXG4gICAgICAgIH0pLmRvbmUoZnVuY3Rpb24oIGRhdGEgKSB7XG4gICAgICAgICAgaWYgKGRhdGEuc3RhdHVzID09PSAnc3VjY2VzcycgJiYgZGF0YS5yZWFzb24gPT09ICduZXcgdXNlcicpIHtcbiAgICAgICAgICAgIC8vIHVzZXIgY3JlYXRlZCAtIHRoZXkgc2hvdWxkIHJlY2VpdmUgZW1haWxcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sIC8vIGNyZWF0ZU1pbm5Qb3N0QWNjb3VudFxuICAgIFxuICAgIGdlbmVyYXRlQmlsbGluZ0RldGFpbHM6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGJpbGxpbmdEZXRhaWxzID0ge307XG4gICAgICB2YXIgYWRkcmVzc0RldGFpbHMgPSB7fTtcblxuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yKS52YWwoKSAhPSAnJykge1xuICAgICAgICBiaWxsaW5nRGV0YWlscy5lbWFpbCA9ICQodGhpcy5vcHRpb25zLmVtYWlsX2ZpZWxkX3NlbGVjdG9yKS52YWwoKTtcbiAgICAgIH1cbiAgICAgIFxuICAgICAgdmFyIGZ1bGxfbmFtZSA9ICcnO1xuICAgICAgaWYgKCQoJyNmdWxsX25hbWUnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGZ1bGxfbmFtZSA9ICQoJyNmdWxsX25hbWUnKS52YWwoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZ1bGxfbmFtZSA9ICQodGhpcy5vcHRpb25zLmZpcnN0X25hbWVfZmllbGRfc2VsZWN0b3IpLnZhbCgpICsgJyAnICsgJCh0aGlzLm9wdGlvbnMubGFzdF9uYW1lX2ZpZWxkX3NlbGVjdG9yKS52YWwoKTtcbiAgICAgIH1cbiAgICAgIGJpbGxpbmdEZXRhaWxzLm5hbWUgPSBmdWxsX25hbWU7XG5cbiAgICAgIHZhciBzdHJlZXQgPSAnTm9uZSc7XG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuYmlsbGluZ19zdHJlZXRfZmllbGRfc2VsZWN0b3IpLnZhbCgpICE9ICcnKSB7XG4gICAgICAgIHN0cmVldCA9ICQodGhpcy5vcHRpb25zLmJpbGxpbmdfc3RyZWV0X2ZpZWxkX3NlbGVjdG9yKS52YWwoKTtcbiAgICAgICAgYWRkcmVzc0RldGFpbHMubGluZTEgPSBzdHJlZXQ7XG4gICAgICB9XG5cbiAgICAgIHZhciBjaXR5ID0gJ05vbmUnO1xuICAgICAgaWYgKCQodGhpcy5vcHRpb25zLmJpbGxpbmdfY2l0eV9maWVsZF9zZWxlY3RvcikudmFsKCkgIT0gJycpIHtcbiAgICAgICAgY2l0eSA9ICQodGhpcy5vcHRpb25zLmJpbGxpbmdfY2l0eV9maWVsZF9zZWxlY3RvcikudmFsKCk7XG4gICAgICAgIGFkZHJlc3NEZXRhaWxzLmNpdHkgPSBjaXR5O1xuICAgICAgfVxuXG4gICAgICB2YXIgc3RhdGUgPSAnTm9uZSc7XG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnMuYmlsbGluZ19zdGF0ZV9maWVsZF9zZWxlY3RvcikudmFsKCkgIT0gJycpIHtcbiAgICAgICAgc3RhdGUgPSAkKHRoaXMub3B0aW9ucy5iaWxsaW5nX3N0YXRlX2ZpZWxkX3NlbGVjdG9yKS52YWwoKTtcbiAgICAgICAgYWRkcmVzc0RldGFpbHMuc3RhdGUgPSBzdGF0ZTtcbiAgICAgIH1cblxuICAgICAgdmFyIHppcCA9ICdOb25lJztcbiAgICAgIGlmICgkKHRoaXMub3B0aW9ucy5iaWxsaW5nX3ppcF9maWVsZF9zZWxlY3RvcikudmFsKCkgIT0gJycpIHtcbiAgICAgICAgemlwID0gJCh0aGlzLm9wdGlvbnMuYmlsbGluZ196aXBfZmllbGRfc2VsZWN0b3IpLnZhbCgpO1xuICAgICAgICBhZGRyZXNzRGV0YWlscy5wb3N0YWxfY29kZSA9IHppcDtcbiAgICAgIH1cblxuICAgICAgdmFyIGNvdW50cnkgPSAnVVMnO1xuICAgICAgdmFyIGNvdW50cnlfZmllbGRfdmFsdWUgPSAkKHRoaXMub3B0aW9ucy5iaWxsaW5nX2NvdW50cnlfZmllbGRfc2VsZWN0b3IpLnZhbCgpO1xuICAgICAgaWYgKGNvdW50cnlfZmllbGRfdmFsdWUgIT0gJycgJiYgY291bnRyeV9maWVsZF92YWx1ZSAhPSAnVW5pdGVkIFN0YXRlcycpIHtcbiAgICAgICAgY291bnRyeSA9IGNvdW50cnlfZmllbGRfdmFsdWU7XG4gICAgICB9XG4gICAgICBhZGRyZXNzRGV0YWlscy5jb3VudHJ5ID0gY291bnRyeTtcblxuICAgICAgaWYgKHN0cmVldCAhPT0gJ05vbmUnIHx8IGNpdHkgIT09ICdOb25lJyB8fCBzdGF0ZSAhPT0gJ05vbmUnIHx8IHppcCAhPT0gJ05vbmUnKSB7XG4gICAgICAgIGJpbGxpbmdEZXRhaWxzLmFkZHJlc3MgPSBhZGRyZXNzRGV0YWlscztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGJpbGxpbmdEZXRhaWxzO1xuICAgIH0sIC8vIGdlbmVyYXRlQmlsbGluZ0RldGFpbHNcblxuICAgIGNyZWF0ZVBheW1lbnRNZXRob2Q6IGZ1bmN0aW9uKGNhcmRFbGVtZW50LCBiaWxsaW5nRGV0YWlscykge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdGhhdC5zdHJpcGUuY3JlYXRlUGF5bWVudE1ldGhvZCh7XG4gICAgICAgIHR5cGU6ICdjYXJkJyxcbiAgICAgICAgY2FyZDogY2FyZEVsZW1lbnQsXG4gICAgICAgIGJpbGxpbmdfZGV0YWlsczogYmlsbGluZ0RldGFpbHNcbiAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKHJlc3BvbnNlLmVycm9yKSB7XG4gICAgICAgICAgdGhhdC5oYW5kbGVTZXJ2ZXJFcnJvcihyZXNwb25zZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gU2VuZCBwYXltZW50TWV0aG9kLmlkIHRvIHNlcnZlclxuICAgICAgICAgIHZhciBzdXBwb3J0Zm9ybSA9ICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKTtcbiAgICAgICAgICB2YXIgYWpheF91cmwgPSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWU7XG4gICAgICAgICAgdmFyIHRva2VuRmllbGROYW1lID0gJ3BheW1lbnRfbWV0aG9kX2lkJztcbiAgICAgICAgICB2YXIgdG9rZW5GaWVsZCA9ICdpbnB1dFtuYW1lPVwiJyArIHRva2VuRmllbGROYW1lICsgJ1wiXSc7XG5cbiAgICAgICAgICAvLyBJbnNlcnQgdGhlIHBheW1lbnQgbWV0aG9kIElEIGludG8gdGhlIGZvcm0gc28gaXQgZ2V0cyBzdWJtaXR0ZWQgdG8gdGhlIHNlcnZlclxuICAgICAgICAgIGlmICgkKHRva2VuRmllbGQpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICQodG9rZW5GaWVsZCkudmFsKHJlc3BvbnNlLnBheW1lbnRNZXRob2QuaWQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdXBwb3J0Zm9ybS5hcHBlbmQoJCgnPGlucHV0IHR5cGU9XFxcImhpZGRlblxcXCIgbmFtZT1cIicgKyB0b2tlbkZpZWxkTmFtZSArICdcIj4nKS52YWwocmVzcG9uc2UucGF5bWVudE1ldGhvZC5pZCkpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGZldGNoKGFqYXhfdXJsLCB7XG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYm9keTogJChzdXBwb3J0Zm9ybSkuc2VyaWFsaXplKClcbiAgICAgICAgICB9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICAvLyBIYW5kbGUgc2VydmVyIHJlc3BvbnNlIChzZWUgU3RlcCAzKVxuICAgICAgICAgICAgcmVzcG9uc2UuanNvbigpLnRoZW4oZnVuY3Rpb24oanNvbikge1xuICAgICAgICAgICAgICB0aGF0LmhhbmRsZVNlcnZlclJlc3BvbnNlKGpzb24pO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSwgLy8gY3JlYXRlUGF5bWVudE1ldGhvZFxuXG4gICAgYmFua1Rva2VuSGFuZGxlcjogZnVuY3Rpb24odG9rZW4sIHR5cGUpIHtcbiAgICAgIHRoaXMuc2V0U3RyaXBlUGF5bWVudFR5cGUodHlwZSk7XG4gICAgICB0aGlzLnN1Ym1pdEZvcm1Pbmx5KCk7XG4gICAgfSwgLy8gYmFua1Rva2VuSGFuZGxlclxuXG4gICAgc3VibWl0Rm9ybU9ubHk6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHRoYXQgPSB0aGlzO1xuICAgICAgdmFyIHN1cHBvcnRmb3JtID0gJCh0aGlzLm9wdGlvbnMuZG9uYXRlX2Zvcm1fc2VsZWN0b3IpO1xuICAgICAgdmFyIGFqYXhfdXJsID0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lO1xuXG4gICAgICAvLyBTdWJtaXQgdGhlIGZvcm1cbiAgICAgIC8vIHRoZSB3YXkgaXQgd29ya3MgY3VycmVudGx5IGlzIHRoZSBmb3JtIHN1Ym1pdHMgYW4gYWpheCByZXF1ZXN0IHRvIGl0c2VsZlxuICAgICAgLy8gdGhlbiBpdCBzdWJtaXRzIGEgcG9zdCByZXF1ZXN0IHRvIHRoZSBmb3JtJ3MgYWN0aW9uIHVybFxuICAgICAgJC5hamF4KHtcbiAgICAgICAgdXJsOiBhamF4X3VybCxcbiAgICAgICAgY2FjaGU6IGZhbHNlLFxuICAgICAgICBkYXRhOiAkKHN1cHBvcnRmb3JtKS5zZXJpYWxpemUoKSxcbiAgICAgICAgdHlwZTogJ1BPU1QnXG4gICAgICB9KVxuICAgICAgLmRvbmUoZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgaWYgKHR5cGVvZiByZXNwb25zZS5lcnJvcnMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgdGhhdC5oYW5kbGVTZXJ2ZXJFcnJvcihyZXNwb25zZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc3VwcG9ydGZvcm0uZ2V0KDApLnN1Ym1pdCgpOyAvLyBjb250aW51ZSBzdWJtaXR0aW5nIHRoZSBmb3JtIGlmIHRoZSBhamF4IHdhcyBzdWNjZXNzZnVsXG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAuZmFpbChmdW5jdGlvbigpIHtcbiAgICAgICAgdGhhdC5idXR0b25TdGF0dXModGhhdC5vcHRpb25zLCAkKHRoYXQub3B0aW9ucy5kb25hdGVfZm9ybV9zZWxlY3RvcikuZmluZCgnYnV0dG9uJyksIGZhbHNlKTtcbiAgICAgIH0pO1xuICAgIH0sIC8vIHN1Ym1pdEZvcm1Pbmx5XG5cbiAgICBoYW5kbGVTZXJ2ZXJSZXNwb25zZTogZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgIHZhciBzdXBwb3J0Zm9ybSA9ICQodGhpcy5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKTtcbiAgICAgIGlmIChyZXNwb25zZS5lcnJvcnMpIHtcbiAgICAgICAgLy8gU2hvdyBlcnJvciBmcm9tIHNlcnZlciBvbiBwYXltZW50IGZvcm1cbiAgICAgICAgdGhpcy5oYW5kbGVTZXJ2ZXJFcnJvcihyZXNwb25zZSk7XG4gICAgICB9IGVsc2UgaWYgKHJlc3BvbnNlLnJlcXVpcmVzX2FjdGlvbikge1xuICAgICAgICAvLyBVc2UgU3RyaXBlLmpzIHRvIGhhbmRsZSByZXF1aXJlZCBjYXJkIGFjdGlvblxuICAgICAgICAvL2hhbmRsZUFjdGlvbihyZXNwb25zZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzdXBwb3J0Zm9ybS5nZXQoMCkuc3VibWl0KCk7IC8vIGNvbnRpbnVlIHN1Ym1pdHRpbmcgdGhlIGZvcm0gaWYgdGhlIGFqYXggd2FzIHN1Y2Nlc3NmdWxcbiAgICAgIH1cbiAgICB9LCAvLyBoYW5kbGVTZXJ2ZXJSZXNwb25zZVxuXG4gICAgaGFuZGxlU2VydmVyRXJyb3I6IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG4gICAgICB2YXIgdGhpc19maWVsZCA9ICcnO1xuICAgICAgLy8gZG8gbm90IHN1Ym1pdC4gdGhlcmUgaXMgYW4gZXJyb3IuXG4gICAgICB0aGF0LmJ1dHRvblN0YXR1cyh0aGF0Lm9wdGlvbnMsICQodGhhdC5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKSwgZmFsc2UpO1xuICAgICAgLy8gaGFuZGxlIGVycm9yIGRpc3BsYXlcbiAgICAgIGlmICh0eXBlb2YgcmVzcG9uc2UuZXJyb3JzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBpZiAodHlwZW9mIHJlc3BvbnNlLmVycm9yc1swXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICB0aGlzX2ZpZWxkID0gcmVzcG9uc2UuZXJyb3JzWzBdLmZpZWxkICsgJ19maWVsZF9zZWxlY3Rvcic7XG4gICAgICAgIH1cbiAgICAgICAgJC5lYWNoKHJlc3BvbnNlLmVycm9ycywgZnVuY3Rpb24oIGluZGV4LCBlcnJvciApIHtcbiAgICAgICAgICBpZiAodHlwZW9mIGVycm9yLmZpZWxkICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgdGhpc19maWVsZCA9IGVycm9yLmZpZWxkICsgJ19maWVsZF9zZWxlY3Rvcic7XG4gICAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZXJyb3IucGFyYW0gIT09ICd1bmRlZmluZWQnICYmIGVycm9yLnBhcmFtICE9PSAnJykge1xuICAgICAgICAgICAgdGhpc19maWVsZCA9ICdjY18nICsgZXJyb3IucGFyYW0gKyAnX3NlbGVjdG9yJzsgIFxuICAgICAgICAgIH1cbiAgICAgICAgICB0aGF0LmRpc3BsYXlFcnJvck1lc3NhZ2UoZXJyb3IsIHRoaXNfZmllbGQpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHJlc3BvbnNlLmVycm9yICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB2YXIgZXJyb3IgPSByZXNwb25zZS5lcnJvcjtcbiAgICAgICAgaWYgKHR5cGVvZiBlcnJvci5maWVsZCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICB0aGlzX2ZpZWxkID0gZXJyb3IuZmllbGQgKyAnX2ZpZWxkX3NlbGVjdG9yJztcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZXJyb3IucGFyYW0gIT09ICd1bmRlZmluZWQnICYmIGVycm9yLnBhcmFtICE9PSAnJykge1xuICAgICAgICAgIHRoaXNfZmllbGQgPSAnY2NfJyArIGVycm9yLnBhcmFtICsgJ19zZWxlY3Rvcic7ICBcbiAgICAgICAgfVxuICAgICAgICB0aGF0LmRpc3BsYXlFcnJvck1lc3NhZ2UoZXJyb3IsIHRoaXNfZmllbGQpO1xuICAgICAgfVxuICAgICAgaWYgKCQodGhhdC5vcHRpb25zW3RoaXNfZmllbGRdKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICBzY3JvbGxUb3A6ICQodGhhdC5vcHRpb25zW3RoaXNfZmllbGRdKS5wYXJlbnQoKS5vZmZzZXQoKS50b3BcbiAgICAgICAgfSwgMjAwMCk7XG4gICAgICB9XG4gICAgfSwgLy8gaGFuZGxlU2VydmVyRXJyb3JcblxuICAgIGRpc3BsYXlFcnJvck1lc3NhZ2UoZXJyb3IsIGZpZWxkKSB7XG4gICAgICB2YXIgbWVzc2FnZSA9ICcnO1xuICAgICAgdmFyIHN0cmlwZUVycm9yU2VsZWN0b3IgPSAnJztcbiAgICAgIHZhciBmaWVsZFBhcmVudCA9ICQodGhpcy5vcHRpb25zW2ZpZWxkXSkucGFyZW50KCk7XG4gICAgICBpZiAodHlwZW9mIGVycm9yLm1lc3NhZ2UgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIG1lc3NhZ2UgPSBlcnJvci5tZXNzYWdlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWVzc2FnZSA9IGVycm9yLm1lc3NhZ2VbMF07XG4gICAgICB9XG4gICAgICBpZiAoJCh0aGlzLm9wdGlvbnNbZmllbGRdKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICQodGhpcy5vcHRpb25zW2ZpZWxkXSkuYWRkQ2xhc3MoJ2EtZXJyb3InKTtcbiAgICAgICAgJCh0aGlzLm9wdGlvbnNbZmllbGRdKS5wcmV2KCkuYWRkQ2xhc3MoJ2EtZXJyb3InKTtcbiAgICAgICAgaWYgKCQoJy5hLWNhcmQtaW5zdHJ1Y3Rpb24nLCBmaWVsZFBhcmVudCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICQoJy5hLWNhcmQtaW5zdHJ1Y3Rpb24nLCBmaWVsZFBhcmVudCkuYWRkQ2xhc3MoJ2EtdmFsaWRhdGlvbi1lcnJvcicpO1xuICAgICAgICAgICQoJy5hLWNhcmQtaW5zdHJ1Y3Rpb24nLCBmaWVsZFBhcmVudCkudGV4dChtZXNzYWdlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkKHRoaXMub3B0aW9uc1tmaWVsZF0pLmFmdGVyKCc8cCBjbGFzcz1cImEtY2FyZC1pbnN0cnVjdGlvbiBhLXZhbGlkYXRpb24tZXJyb3JcIj4nICsgbWVzc2FnZSArICc8L3A+Jyk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGVycm9yICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB0aGlzLmJ1dHRvblN0YXR1cyh0aGlzLm9wdGlvbnMsICQodGhpcy5vcHRpb25zLmRvbmF0ZV9mb3JtX3NlbGVjdG9yKS5maW5kKCdidXR0b24nKSwgZmFsc2UpO1xuICAgICAgICBpZiAoZXJyb3IuY29kZSA9PT0gJ2luY29tcGxldGVfbnVtYmVyJyB8fCBlcnJvci5jb2RlID09ICdpbnZhbGlkX251bWJlcicgfHwgZXJyb3IuY29kZSA9PSAnaW5jb3JyZWN0X251bWJlcicgfHwgZXJyb3IuY29kZSA9PSAnY2FyZF9kZWNsaW5lZCcgfHwgZXJyb3IuY29kZSA9PSAncHJvY2Vzc2luZ19lcnJvcicpIHtcbiAgICAgICAgICAvLyBlcnJvciBoYW5kbGluZ1xuICAgICAgICAgIHN0cmlwZUVycm9yU2VsZWN0b3IgPSAkKHRoaXMub3B0aW9ucy5jY19udW1fc2VsZWN0b3IpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJvci5jb2RlID09ICdpbnZhbGlkX2V4cGlyeV9tb250aCcgfHwgZXJyb3IuY29kZSA9PSAnaW52YWxpZF9leHBpcnlfeWVhcicgfHwgZXJyb3IuY29kZSA9PSAnZXhwaXJlZF9jYXJkJykge1xuICAgICAgICAgIC8vIGVycm9yIGhhbmRsaW5nXG4gICAgICAgICAgc3RyaXBlRXJyb3JTZWxlY3RvciA9ICQodGhpcy5vcHRpb25zLmNjX2V4cF9zZWxlY3Rvcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9yLmNvZGUgPT0gJ2ludmFsaWRfY3ZjJyB8fCBlcnJvci5jb2RlID09ICdpbmNvcnJlY3RfY3ZjJykge1xuICAgICAgICAgIC8vIGVycm9yIGhhbmRsaW5nXG4gICAgICAgICAgc3RyaXBlRXJyb3JTZWxlY3RvciA9ICQodGhpcy5vcHRpb25zLmNjX2N2Y19zZWxlY3Rvcik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9yLmNvZGUgPT0gJ2VtYWlsX2ludmFsaWQnKSB7XG4gICAgICAgICAgLy8gZXJyb3IgaGFuZGxpbmdcbiAgICAgICAgICBzdHJpcGVFcnJvclNlbGVjdG9yID0gJCh0aGlzLm9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdHJpcGVFcnJvclNlbGVjdG9yICE9PSAnJykge1xuICAgICAgICAgIHRoaXMuc3RyaXBlRXJyb3JEaXNwbGF5KGVycm9yLCBzdHJpcGVFcnJvclNlbGVjdG9yLCB0aGlzLmVsZW1lbnQsIHRoaXMub3B0aW9ucyApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlcnJvci50eXBlID09ICdtaXNzaW5nX3BheW1lbnQnICYmIHN0cmlwZUVycm9yU2VsZWN0b3IgPT09ICcnKSB7XG4gICAgICAgICAgJCh0aGlzLm9wdGlvbnMucGF5bWVudF9tZXRob2Rfc2VsZWN0b3IgKyAnLmFjdGl2ZScpLmFwcGVuZCgnPHAgY2xhc3M9XCJhLWZvcm0tY2FwdGlvbiBhLXZhbGlkYXRpb24tZXJyb3IgYS1taXNzaW5nLXBheW1lbnQtZXJyb3JcIj4nICsgZXJyb3IubWVzc2FnZSArICc8L3A+JylcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXJyb3IuZmllbGQgPT0gJ3JlY2FwdGNoYScpIHtcbiAgICAgICAgICAkKHRoaXMub3B0aW9ucy5wYXlfYnV0dG9uX3NlbGVjdG9yKS5iZWZvcmUoJzxwIGNsYXNzPVwiYS1mb3JtLWNhcHRpb24gYS12YWxpZGF0aW9uLWVycm9yIGEtcmVjYXB0Y2hhLWVycm9yXCI+JyArIG1lc3NhZ2UgKyAnPC9wPicpXG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycm9yLnR5cGUgPT0gJ2ludmFsaWRfcmVxdWVzdF9lcnJvcicgJiYgc3RyaXBlRXJyb3JTZWxlY3RvciA9PT0gJycpIHtcbiAgICAgICAgICAkKHRoaXMub3B0aW9ucy5wYXlfYnV0dG9uX3NlbGVjdG9yKS5iZWZvcmUoJzxwIGNsYXNzPVwiYS1mb3JtLWNhcHRpb24gYS12YWxpZGF0aW9uLWVycm9yIGEtaW52YWxpZC1yZXF1ZXN0LWVycm9yXCI+JyArIGVycm9yLm1lc3NhZ2UgKyAnPC9wPicpXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LCAvLyBkaXNwbGF5RXJyb3JNZXNzYWdlXG5cbiAgICBzaG93TmV3c2xldHRlclNldHRpbmdzOiBmdW5jdGlvbihlbGVtZW50LCBvcHRpb25zKSB7XG4gICAgICB2YXIgdGhhdCA9IHRoaXM7XG5cbiAgICAgIHZhciBuZXdzbGV0dGVyX2dyb3VwX2h0bWwgPSAnJztcbiAgICAgIGlmICgkKG9wdGlvbnMubmV3c2xldHRlcl9ncm91cF9zZWxlY3RvcikubGVuZ3RoID4gMCApIHtcbiAgICAgICAgdmFyIGdldF9kYXRhID0ge1xuICAgICAgICAgIHNob3J0Y29kZTogJ25ld3NsZXR0ZXJfZm9ybScsXG4gICAgICAgICAgcGxhY2VtZW50OiAndXNlcmFjY291bnQnXG4gICAgICAgIH07XG4gICAgICAgICQuYWpheCh7XG4gICAgICAgICAgbWV0aG9kOiAnR0VUJyxcbiAgICAgICAgICB1cmw6IG9wdGlvbnMubWlubnBvc3Rfcm9vdCArICcvd3AtanNvbi9taW5ucG9zdC1hcGkvdjIvbWFpbGNoaW1wL2Zvcm0nLFxuICAgICAgICAgIGRhdGE6IGdldF9kYXRhXG4gICAgICAgIH0pLmRvbmUoZnVuY3Rpb24oIHJlc3VsdCApIHtcbiAgICAgICAgICBpZiAoIHR5cGVvZiByZXN1bHQuZ3JvdXBfZmllbGRzICE9PSAndW5kZWZpbmVkJyApIHtcbiAgICAgICAgICAgICQuZWFjaChyZXN1bHQuZ3JvdXBfZmllbGRzLCBmdW5jdGlvbiggaW5kZXgsIGNhdGVnb3J5ICkge1xuICAgICAgICAgICAgICBuZXdzbGV0dGVyX2dyb3VwX2h0bWwgKz0gJzxmaWVsZHNldCBjbGFzcz1cIm0tZm9ybS1pdGVtIHN1cHBvcnQtbmV3c2xldHRlciBtLWZvcm0taXRlbS0nICsgY2F0ZWdvcnkudHlwZSArICdcIj4nO1xuICAgICAgICAgICAgICBuZXdzbGV0dGVyX2dyb3VwX2h0bWwgKz0gJzxsYWJlbD4nICsgY2F0ZWdvcnkubmFtZSArICc6PC9sYWJlbD4nO1xuICAgICAgICAgICAgICBpZiAoIGNhdGVnb3J5LmNvbnRhaW5zLmxlbmd0aCA+IDAgKSB7XG4gICAgICAgICAgICAgICAgbmV3c2xldHRlcl9ncm91cF9odG1sICs9ICc8ZGl2IGNsYXNzPVwibS1mb3JtLWl0ZW0gbS1mb3JtLWl0ZW0tbmV3c2xldHRlclwiPic7XG4gICAgICAgICAgICAgICAgJC5lYWNoKGNhdGVnb3J5W2NhdGVnb3J5LmNvbnRhaW5zXSwgZnVuY3Rpb24oIGluZGV4LCBpdGVtICkge1xuICAgICAgICAgICAgICAgICAgbmV3c2xldHRlcl9ncm91cF9odG1sICs9ICc8bGFiZWw+PGlucHV0IG5hbWU9XCJncm91cHNfc3VibWl0dGVkXCIgdHlwZT1cImNoZWNrYm94XCIgdmFsdWU9XCInICsgaXRlbS5pZCArICdcIj4nICsgaXRlbS5uYW1lICsgJzwvbGFiZWw+JztcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBuZXdzbGV0dGVyX2dyb3VwX2h0bWwgKz0gJzwvZGl2Pic7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgbmV3c2xldHRlcl9ncm91cF9odG1sICs9ICc8L2ZpZWxkc2V0Pic7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICQob3B0aW9ucy5uZXdzbGV0dGVyX2dyb3VwX3NlbGVjdG9yKS5odG1sKG5ld3NsZXR0ZXJfZ3JvdXBfaHRtbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgaWYgKCQob3B0aW9ucy5uZXdzbGV0dGVyX2dyb3VwX3NlbGVjdG9yKS5sZW5ndGggPiAwICYmIHR5cGVvZiAkKG9wdGlvbnMuZW1haWxfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICB2YXIgZ2V0X2RhdGEgPSB7XG4gICAgICAgICAgZW1haWw6ICQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKClcbiAgICAgICAgfTtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICBtZXRob2Q6ICdHRVQnLFxuICAgICAgICAgIHVybDogb3B0aW9ucy5taW5ucG9zdF9yb290ICsgJy93cC1qc29uL21pbm5wb3N0LWFwaS92Mi9tYWlsY2hpbXAvdXNlcicsXG4gICAgICAgICAgZGF0YTogZ2V0X2RhdGFcbiAgICAgICAgfSkuZG9uZShmdW5jdGlvbiggcmVzdWx0ICkge1xuICAgICAgICAgIGlmICggdHlwZW9mIHJlc3VsdC5tYWlsY2hpbXBfc3RhdHVzICE9PSAndW5kZWZpbmVkJyApIHtcbiAgICAgICAgICAgICQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkuYWZ0ZXIoJzxpbnB1dCBuYW1lPVwibWFpbGNoaW1wX3N0YXR1c1wiIHR5cGU9XCJoaWRkZW5cIiB2YWx1ZT1cIicgKyByZXN1bHQubWFpbGNoaW1wX3N0YXR1cyArICdcIj4nKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCB0eXBlb2YgcmVzdWx0Lm1haWxjaGltcF91c2VyX2lkICE9PSAndW5kZWZpbmVkJyApIHtcbiAgICAgICAgICAgICQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkuYWZ0ZXIoJzxpbnB1dCBuYW1lPVwibWFpbGNoaW1wX3VzZXJfaWRcIiB0eXBlPVwiaGlkZGVuXCIgdmFsdWU9XCInICsgcmVzdWx0Lm1haWxjaGltcF91c2VyX2lkICsgJ1wiPicpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAocmVzdWx0Lm1haWxjaGltcF9zdGF0dXMgPT09ICdzdWJzY3JpYmVkJykge1xuICAgICAgICAgICAgLy8gdXNlciBjcmVhdGVkIC0gc2hvdyBhIHN1Y2Nlc3MgbWVzc2FnZVxuICAgICAgICAgICAgJCgnLmEtY29uZmlybS1pbnN0cnVjdGlvbnMnKS50ZXh0KCQoJy5hLWNvbmZpcm0taW5zdHJ1Y3Rpb25zJykuYXR0cignZGF0YS1rbm93bi11c2VyJykpO1xuICAgICAgICAgICAgdmFyIGdyb3VwcyA9IHJlc3VsdC5ncm91cHM7XG4gICAgICAgICAgICAkLmVhY2goZ3JvdXBzLCBmdW5jdGlvbiggaW5kZXgsIHZhbHVlICkge1xuICAgICAgICAgICAgICBpZiAoIHZhbHVlID09PSB0cnVlICkge1xuICAgICAgICAgICAgICAgICQoJzpjaGVja2JveFt2YWx1ZT1cIicgKyBpbmRleCArICdcIl0nKS5wcm9wKCdjaGVja2VkJyx0cnVlKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkKCc6Y2hlY2tib3hbdmFsdWU9XCInICsgaW5kZXggKyAnXCJdJykucHJvcCgnY2hlY2tlZCcsZmFsc2UpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgfSwgLy8gc2hvd05ld3NsZXR0ZXJTZXR0aW5nc1xuXG4gICAgY29uZmlybU1lc3NhZ2VTdWJtaXQ6IGZ1bmN0aW9uKGVsZW1lbnQsIG9wdGlvbnMpIHtcblxuICAgICAgdmFyIGV4aXN0aW5nX25ld3NsZXR0ZXJfc2V0dGluZ3MgPSAkKG9wdGlvbnMubmV3c2xldHRlcl9ncm91cF9zZWxlY3RvciArICcgaW5wdXQnKS5zZXJpYWxpemUoKTtcbiAgICAgIC8vdGhpcy5kZWJ1ZyhleGlzdGluZ19uZXdzbGV0dGVyX3NldHRpbmdzKTtcblxuICAgICAgJChvcHRpb25zLmNvbmZpcm1fZm9ybV9zZWxlY3Rvcikuc3VibWl0KGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgdmFyIGNvbmZpcm1mb3JtID0gJChvcHRpb25zLmNvbmZpcm1fZm9ybV9zZWxlY3Rvcik7XG4gICAgICAgIC8vIHN1Ym1pdCBzZXR0aW5ncyB0byBtYWlsY2hpbXBcbiAgICAgICAgLy8gbmVlZCB0byBnZXQgdXNlciBpbmZvIG9uIGEgaGlkZGVuIGZpZWxkIGhlcmVcblxuICAgICAgICB2YXIgbmV3c2xldHRlcl9ncm91cHMgPSAkKG9wdGlvbnMubmV3c2xldHRlcl9ncm91cF9zZWxlY3RvciArICcgaW5wdXQ6Y2hlY2tlZCcpO1xuICAgICAgICB2YXIgbmV3X25ld3NsZXR0ZXJfc2V0dGluZ3MgPSBuZXdzbGV0dGVyX2dyb3Vwcy5zZXJpYWxpemUoKTtcblxuICAgICAgICBpZiAoKGV4aXN0aW5nX25ld3NsZXR0ZXJfc2V0dGluZ3MgIT09IG5ld19uZXdzbGV0dGVyX3NldHRpbmdzKSAmJiAodHlwZW9mIG5ld3NsZXR0ZXJfZ3JvdXBzICE9PSAndW5kZWZpbmVkJykpIHtcbiAgICAgICAgICAvL2FkZCBvdXIgb3duIGFqYXggY2hlY2sgYXMgWC1SZXF1ZXN0ZWQtV2l0aCBpcyBub3QgYWx3YXlzIHJlbGlhYmxlXG4gICAgICAgICAgLy9hamF4X2Zvcm1fZGF0YSA9IG5ld19uZXdzbGV0dGVyX3NldHRpbmdzICsgJyZhamF4cmVxdWVzdD10cnVlJnN1YnNjcmliZSc7XG5cbiAgICAgICAgICB2YXIgcG9zdF9kYXRhID0ge1xuICAgICAgICAgICAgZW1haWw6ICQob3B0aW9ucy5lbWFpbF9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgICBmaXJzdF9uYW1lOiAkKG9wdGlvbnMuZmlyc3RfbmFtZV9maWVsZF9zZWxlY3RvciwgZWxlbWVudCkudmFsKCksXG4gICAgICAgICAgICBsYXN0X25hbWU6ICQob3B0aW9ucy5sYXN0X25hbWVfZmllbGRfc2VsZWN0b3IsIGVsZW1lbnQpLnZhbCgpLFxuICAgICAgICAgICAgZ3JvdXBzX3N1Ym1pdHRlZDoge31cbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgcG9zdF9kYXRhLmdyb3Vwc19hdmFpbGFibGUgPSAnYWxsJztcblxuICAgICAgICAgIGlmICggJCgnaW5wdXRbbmFtZT1cIm1haWxjaGltcF9zdGF0dXNcIl0nKS5sZW5ndGggPiAwICkge1xuICAgICAgICAgICAgcG9zdF9kYXRhLm1haWxjaGltcF9zdGF0dXMgPSAkKCdpbnB1dFtuYW1lPVwibWFpbGNoaW1wX3N0YXR1c1wiXScpLnZhbCgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICggJCgnaW5wdXRbbmFtZT1cIm1haWxjaGltcF91c2VyX2lkXCJdJykubGVuZ3RoID4gMCApIHtcbiAgICAgICAgICAgIHBvc3RfZGF0YS5tYWlsY2hpbXBfdXNlcl9pZCA9ICQoJ2lucHV0W25hbWU9XCJtYWlsY2hpbXBfdXNlcl9pZFwiXScpLnZhbCgpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh0eXBlb2YgbmV3c2xldHRlcl9ncm91cHMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAkLmVhY2gobmV3c2xldHRlcl9ncm91cHMsIGZ1bmN0aW9uKGluZGV4LCB2YWx1ZSkge1xuICAgICAgICAgICAgICB2YXIgZ3JvdXAgPSAkKHRoaXMpLnZhbCgpO1xuICAgICAgICAgICAgICBwb3N0X2RhdGEuZ3JvdXBzX3N1Ym1pdHRlZFtpbmRleF0gPSBncm91cDtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgICQuYWpheCh7XG4gICAgICAgICAgICB1cmw6IG9wdGlvbnMubWlubnBvc3Rfcm9vdCArICcvd3AtanNvbi9taW5ucG9zdC1hcGkvdjIvbWFpbGNoaW1wL3VzZXInLFxuICAgICAgICAgICAgdHlwZTogJ3Bvc3QnLFxuICAgICAgICAgICAgZGF0YVR5cGUgOiAnanNvbicsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkocG9zdF9kYXRhKVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmRvbmUoZnVuY3Rpb24ocmVzcG9uc2UpIHsgLy8gcmVzcG9uc2UgZnJvbSB0aGUgUEhQIGFjdGlvblxuICAgICAgICAgICAgdmFyIG1lc3NhZ2UgPSAnJztcbiAgICAgICAgICAgIGlmICggcmVzcG9uc2Uuc3VjY2VzcyA9PT0gdHJ1ZSApIHtcbiAgICAgICAgICAgICAgLypzd2l0Y2ggKHJlc3BvbnNlLmRhdGEudXNlcl9zdGF0dXMpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdleGlzdGluZyc6XG4gICAgICAgICAgICAgICAgICBtZXNzYWdlID0gJ1RoYW5rcyBmb3IgdXBkYXRpbmcgeW91ciBlbWFpbCBwcmVmZXJlbmNlcy4gVGhleSB3aWxsIGdvIGludG8gZWZmZWN0IGltbWVkaWF0ZWx5Lic7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICduZXcnOlxuICAgICAgICAgICAgICAgICAgbWVzc2FnZSA9ICdXZSBoYXZlIGFkZGVkIHlvdSB0byB0aGUgTWlublBvc3QgbWFpbGluZyBsaXN0Lic7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICBjYXNlICdwZW5kaW5nJzpcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2UgPSAnV2UgaGF2ZSBhZGRlZCB5b3UgdG8gdGhlIE1pbm5Qb3N0IG1haWxpbmcgbGlzdC4gWW91IHdpbGwgbmVlZCB0byBjbGljayB0aGUgY29uZmlybWF0aW9uIGxpbmsgaW4gdGhlIGVtYWlsIHdlIHNlbnQgdG8gYmVnaW4gcmVjZWl2aW5nIG1lc3NhZ2VzLic7XG4gICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgfSovXG4gICAgICAgICAgICAgIC8vY29uZmlybWZvcm0uZ2V0KDApLnN1Ym1pdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uZmlybWZvcm0uZ2V0KDApLnN1Ym1pdCgpO1xuICAgICAgICAgICAgLy8kKCcubS1ob2xkLW1lc3NhZ2UnKS5odG1sKCc8ZGl2IGNsYXNzPVwibS1mb3JtLW1lc3NhZ2UgbS1mb3JtLW1lc3NhZ2UtaW5mb1wiPicgKyBtZXNzYWdlICsgJzwvZGl2PicpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmZhaWwoZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIC8vIHdlIHNob3VsZCBwdXQgYW4gYWN0dWFsIGVycm9yIG1lc3NhZ2UgaGVyZSBzb21lZGF5LCBwcm9iYWJseVxuICAgICAgICAgICAgLy8kKCcubS1ob2xkLW1lc3NhZ2UnKS5odG1sKCc8ZGl2IGNsYXNzPVwibS1mb3JtLW1lc3NhZ2UgbS1mb3JtLW1lc3NhZ2UtaW5mb1wiPkFuIGVycm9yIGhhcyBvY2N1cmVkLiBQbGVhc2UgdHJ5IGFnYWluLjwvZGl2PicpO1xuICAgICAgICAgICAgY29uZmlybWZvcm0uZ2V0KDApLnN1Ym1pdCgpO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgIH0gZWxzZSB7IC8vIGVuZCBwYXJ0IHdoZXJlIHNldHRpbmdzIGNoYW5nZWRcbiAgICAgICAgICBjb25maXJtZm9ybS5nZXQoMCkuc3VibWl0KCk7XG4gICAgICAgIH1cblxuICAgICAgfSk7XG4gICAgICAvL3JldHVybiBmYWxzZTtcbiAgICB9LCAvLyBjb25maXJtTWVzc2FnZVN1Ym1pdFxuXG4gIH07IC8vIHBsdWdpbi5wcm90b3R5cGVcblxuICAvLyBBIHJlYWxseSBsaWdodHdlaWdodCBwbHVnaW4gd3JhcHBlciBhcm91bmQgdGhlIGNvbnN0cnVjdG9yLFxuICAvLyBwcmV2ZW50aW5nIGFnYWluc3QgbXVsdGlwbGUgaW5zdGFudGlhdGlvbnNcbiAgJC5mbltwbHVnaW5OYW1lXSA9IGZ1bmN0aW9uICggb3B0aW9ucyApIHtcbiAgICByZXR1cm4gdGhpcy5lYWNoKGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmICghJC5kYXRhKHRoaXMsICdwbHVnaW5fJyArIHBsdWdpbk5hbWUpKSB7XG4gICAgICAgICQuZGF0YSh0aGlzLCAncGx1Z2luXycgKyBwbHVnaW5OYW1lLCBuZXcgUGx1Z2luKCB0aGlzLCBvcHRpb25zICkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG59KSggalF1ZXJ5LCB3aW5kb3csIGRvY3VtZW50ICk7Il19
}(jQuery));
