// MinnPost Giving plugin
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
    'plaid_env' : '',
    'plaid_link' : '#authorize-ach',
    'minnpost_root' : 'https://www.minnpost.com',
    'analytics_type' : '',
    'progress_selector' : '.m-support-progress',
    'form_selector' : '.m-form',
    'donate_form_selector': '#donate',
    'confirm_form_selector' : '#confirm',
    'finish_section_selector' : '#panel--confirmation',
    'pay_cc_processing_selector' : 'input[name="pay_fees"]',
    'fee_amount' : '.processing-amount',
    'level_amount_selector' : '#panel--pay .amount .level-amount', // we can maybe get rid of this
    'original_amount_selector' : '[name="amount"]',
    'gift_delivery_method_selector' : '[name="gift_delivery_method"]',
    'fair_market_value_selector' : '#fair_market_value',
    'full_amount_selector' : '.full-amount',
    'installment_period_selector' : '[name="installment_period"]',
    'name_selector' : '.m-form-item-display-name',
    'in_honor_or_memory_field_selector' : '.m-form-item-honor-memory',
    'honor_or_memory_chooser' : 'input[name="in_honor_or_memory"]', // radio fields
    'honor_type_selector' : '.a-honor-type', // span inside label
    'honor_memory_input_group' : '.a-honor-or-memory', // holds the form field
    'anonymous_selector' : '#anonymous',
    'show_billing_country_selector' : '#billing_show_country',
    'billing_country_selector' : '.m-form-item-country',
    'show_shipping_country_selector' : '#shipping_show_country',
    'shipping_country_selector' : '.m-form-item-shipping-country',
    'shipping_address_selector' : '.m-form-item-shipping-address',
    'use_for_shipping_selector' : '#useforshipping',
    'email_field_selector' : '#email',
    'password_field_selector' : '#password',
    'first_name_field_selector' : '#first_name',
    'last_name_field_selector' : '#last_name',
    'billing_street_field_selector' : '#billing_street',
    'billing_city_field_selector' : '#billing_city',
    'billing_state_field_selector' : '#billing_state',
    'billing_zip_field_selector': '#billing_zip',
    'billing_country_field_selector' : '#billing_country',
    'shipping_state_field_selector' : '#shipping_state',
    'shipping_zip_field_selector': '#shipping_zip',
    'shipping_country_field_selector' : '#shipping_country',
    'create_mp_selector' : '#creatempaccount',
    'password_selector' : '.m-form-item-password',
    'additional_amount_field' : '#additional_donation',
    'shipping_amount_field': '[name="shipping_cost"]',
    'shipping_selector' : 'fieldset.m-shipping-information',
    'choose_payment' : '#choose-payment-method',
    'payment_method_selector' : '.payment-method',
    'cc_num_selector' : '#card-number',
    'cc_exp_selector' : '#card-expiry',
    'cc_cvc_selector' : '#card-cvc',
    'pay_button_selector' : '.a-button-pay',
    'opp_id_selector' : '#lock_key', // we use this value as the Google Analytics transaction ID
    'newsletter_group_selector' : '.support-newsletters'
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

    document.documentElement.classList.remove( 'no-js' );
    document.documentElement.classList.add( 'js' );

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
      this.options.original_amount     = parseInt($(this.options.original_amount_selector, this.element).val(), 10);
      this.options.processing_fee      = (Math.round(parseFloat(this.options.fee_amount)*Math.pow(10,2))/Math.pow(10,2)).toFixed(2);
      this.options.processing_fee_text = this.options.processing_fee;
      this.options.create_account      = false;

      var button_text = $(this.options.pay_button_selector).text();
      this.options.button_text = button_text;

      this.stripe = Stripe(this.options.stripe_publishable_key);
      this.elements = this.stripe.elements({
        fonts: [
          {
            // integrate your font into stripe
            cssSrc: 'https://use.typekit.net/cxj7fzg.css',
          }
        ]
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

    }, // init

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

    analyticsTracking: function(options) {
      this.debug('analytics type is ' + options.analytics_type);
      var progress = $(options.progress_selector);
      var step;
      var action = 'checkout';
      var nav_item_count = 0;
      var opp_id = $(options.opp_id_selector).val();
      var post_purchase = false;
      if (options.analytics_type == 'analyticsjs') {
        ga( 'require', 'ec' );
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
      this.debug( 'step is ' + step + ' and nav item count is ' + nav_item_count + ' and opp id is ' + opp_id + ' and post purchase is ' + post_purchase );
      this.analyticsTrackingStep(step, action, post_purchase);
    }, // analyticsTracking

    analyticsTrackingStep: function(step, action, post_purchase) {
      var progress = $(this.options.progress_selector);
      var amount = $(this.options.original_amount_selector).val();
      var opp_id = $(this.options.opp_id_selector).val();
      var installment_period = 'one-time';
      var level;
      var that = this;
      if ($(this.options.installment_period_selector).length > 0 ) {
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
        }).done(function( data ) {
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
                "checkout_option": action,
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
                  "transaction_id": opp_id, // Transaction id - Type: string
                  "affiliation": 'MinnPost', // Store name - Type: string
                  "value": that.getTotalAmount(amount), // Total Revenue - Type: numeric
                  "currency": "USD",
                  "items": [product],
                  "checkout_step": step
                });
              } else if (that.options.analytics_type == 'analyticsjs') {
                ga('ec:setAction', action, {
                  'id': opp_id, // Transaction id - Type: string
                  'affiliation': 'MinnPost', // Store name - Type: string
                  'revenue': amount, // Total Revenue - Type: numeric
                  'step': step
                });
              }
            }
     
            if (that.options.analytics_type == 'gtagjs') {
              gtag('event', 'page_view', {
                page_title: document.title,
                page_path: window.location.pathname
              })              
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

      

    }, // analyticsTrackingStep

    amountAsRadio: function(element, options) {
      // when amount field is a radio button, we need to check it whenever it changes
      var that = this;
      that.setRadioAmount($(options.original_amount_selector, element), element, options);
      $(options.original_amount_selector, element).change(function() {
        that.setRadioAmount($(this), element, options);
      });
    }, // amountAsRadio

    setRadioAmount: function(field, element, options) {
      var that = this;
      var stripe_payment_type = that.getStripePaymentType();
      var amount = $(options.original_amount_selector + ':checked', element).val();
      if (field.is(':radio') && typeof amount !== 'undefined') {
        options.original_amount = parseInt(amount, 10);
        that.calculateFees(that.options.original_amount, stripe_payment_type);
        that.setFairMarketValue(field);
      }
    }, // setRadioAmount

    amountUpdated: function(element, options) {
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

      $(options.original_amount_selector, element).change(function() {
        that.options.original_amount = parseInt($(this, element).val(), 10);
        that.calculateFees(that.options.original_amount, stripe_payment_type);
        that.setFairMarketValue($(this, element));
      });
      $(options.additional_amount_field, element).change(function() {
        that.options.original_amount = parseInt($(options.original_amount_selector, element).val(), 10);
        that.calculateFees(that.options.original_amount, stripe_payment_type);
      });
      $(options.gift_delivery_method_selector, element).change(function() {
        that.options.original_amount = parseInt($(options.original_amount_selector, element).val(), 10);
        that.calculateFees(that.options.original_amount, stripe_payment_type);
      });

    }, // amountUpdated

    getTotalAmount: function(amount) {
      amount = (typeof amount !== 'undefined') ?  amount : this.options.original_amount;
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
    }, // getTotalAmount

    setFairMarketValue: function(amount_selector) {
      // if there is a fair market value field and there is a fair-market-value data attribute
      // check and see if we can populate the field with the data attribute
      if ($(this.options.fair_market_value_selector).length > 0 && typeof amount_selector.data('fair-market-value') !== 'undefined') {
        var fairMarketValue = amount_selector.data('fair-market-value');
        $(this.options.fair_market_value_selector).val(fairMarketValue);
      }
    }, // setFairMarketValue

    calculateFees: function(amount, stripe_payment_type) {
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
      }).done(function( data ) {
        if ($(data.fees).length > 0) {
          $(that.options.fee_amount).text(parseFloat(data.fees).toFixed(2));
          that.creditCardFeeCheckbox($(that.options.pay_cc_processing_selector));
        }
      });
    }, // calculateFees

    creditCardProcessingFees: function(options) {
      // this adds or subtracts the fee to the original amount when the user indicates they do or do not want to pay the fees
      var that = this;
      that.creditCardFeeCheckbox($(options.pay_cc_processing_selector));
      $(options.pay_cc_processing_selector).on('change', function () {
          that.creditCardFeeCheckbox(this);
      });
    }, // creditCardProcessingFees

    getStripePaymentType: function() {
      var stripe_payment_type = 'card';
      if ($('input[name="stripe_payment_type"]').length > 0) {
        stripe_payment_type = $('input[name="stripe_payment_type"]').val();
      }
      return stripe_payment_type;
    }, // getStripePaymentType

    setStripePaymentType: function(stripe_payment_type) {
      if ($('input[name="stripe_payment_type"]').length === 0) {
        $(this.options.donate_form_selector).append('<input type=\"hidden\" name=\"stripe_payment_type\">');
      }
      $('input[name="stripe_payment_type"]').val(stripe_payment_type);
      return stripe_payment_type;
    }, // setStripePaymentType

    creditCardFeeCheckbox: function(field) {
      var full_amount;
      var total_amount = this.getTotalAmount();
      var that = this;
      if ($(field).is(':checked') || $(field).prop('checked')) {
        $('.amount .level-amount').addClass('full-amount');
        full_amount = (total_amount + parseFloat($(that.options.fee_amount).text()));
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

    }, // creditCardFeeCheckbox

    donateAnonymously: function(element, options) {
      var that = this;
      that.toggleAnonymous($(options.anonymous_selector, element));
      $(options.anonymous_selector, element).change(function() {
        that.toggleAnonymous($(this));
      });
    }, // donateAnonymously

    toggleAnonymous: function(element) {
      if (element.is(':checked')) {
        $(this.options.name_selector + ' div:first', this.element).hide();
      } else {
        $(this.options.name_selector + ' div:first', this.element).show();
      }
    }, // toggleAnonymous

    honorOrMemory: function(element, options) {
      if ($(options.honor_or_memory_chooser + ':checked').val()) {
        $(options.honor_memory_input_group, element).show();
        $(options.honor_type_selector).text($(options.honor_or_memory_chooser + ':checked').val());
      } else {
        $(options.honor_memory_input_group, element).hide();
        $(options.honor_name_selector + ' input', element).val('');
      }
    }, // honorOrMemory

    honorOrMemoryToggle: function(element, options) {
      var that = this;
      that.honorOrMemory(that.element, that.options);
      $(options.honor_or_memory_chooser, element).change(function() {
        that.honorOrMemory(that.element, that.options);
      });
    }, // honorOrMemoryToggle

    outsideUnitedStates: function(element, options) {
      var that = this;
      $(options.show_billing_country_selector).click(function() {
        that.changeFieldsOutsideUS('billing', element, options);
        $(this).parent().hide();
        return false;
      });
      $(options.show_shipping_country_selector).click(function() {
        $(options.shipping_country_selector).show();
        that.changeFieldsOutsideUS('shipping', element, options);
        $(this).parent().hide();
        return false;
      });
    }, // outsideUnitedStates

    changeFieldsOutsideUS: function(billing_or_shipping, element, options) {
      if ( billing_or_shipping === 'billing' ) {
        var zip_parent = $(options.billing_zip_field_selector, element).parent();
        var state_parent = $(options.billing_state_field_selector, element).parent();
        $(options.billing_country_selector).show();
        $(options.billing_zip_field_selector, element).attr('type', 'text');
        $(options.billing_zip_field_selector, element).prop('required', false);
        $(options.billing_state_field_selector, element).prop('required', false);
        $('label', zip_parent).text('Postal Code:');
        $('label', state_parent).text('Region:');
      } else if ( billing_or_shipping === 'shipping' ) {
        var zip_parent = $(options.shipping_zip_field_selector, element).parent();
        var state_parent = $(options.shipping_state_field_selector, element).parent();
        $(options.shipping_country_selector).show();
        $(options.shipping_zip_field_selector, element).attr('type', 'text');
        $(options.shipping_zip_field_selector, element).prop('required', false);
        $(options.shipping_state_field_selector, element).prop('required', false);
        $('label', zip_parent).text('Shipping Postal Code:');
        $('label', state_parent).text('Shipping Region:');
      }
    }, // changeFieldsOutsideUS

    changeFieldsInsideUS: function(billing_or_shipping, element, options) {
      if ( billing_or_shipping === 'billing' ) {
        var zip_parent = $(options.billing_zip_field_selector, element).parent();
        var state_parent = $(options.billing_state_field_selector, element).parent();
        $(options.billing_country_selector).show();
        $(options.billing_zip_field_selector, element).attr('type', 'tel');
        $(options.billing_zip_field_selector, element).prop('required', true);
        $(options.billing_state_field_selector, element).prop('required', true);
        $('label', zip_parent).html('Zip Code: <span class="a-form-item-required" title="This field is required.">*</span>');
        $('label', state_parent).html('State: <span class="a-form-item-required" title="This field is required.">*</span>');
      } else if ( billing_or_shipping === 'shipping' ) {
        var zip_parent = $(options.shipping_zip_field_selector, element).parent();
        var state_parent = $(options.shipping_state_field_selector, element).parent();
        $(options.shipping_country_selector).show();
        $(options.shipping_zip_field_selector, element).attr('type', 'tel');
        $(options.shipping_zip_field_selector, element).prop('required', true);
        $(options.shipping_state_field_selector, element).prop('required', true);
        $('label', zip_parent).html('Shipping Zip Code: <span class="a-form-item-required" title="This field is required.">*</span>');
        $('label', state_parent).html('Shipping State: <span class="a-form-item-required" title="This field is required.">*</span>');
      }
    }, // changeFieldsOutsideUS

    shippingAddress: function(element, options) {
      var that = this;
      var show_shipping = false;
      if ($(options.use_for_shipping_selector).length > 0) { // we have a shipping checkbox
        show_shipping = true;
      }
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

    allowMinnpostAccount: function(element, options) {
      var that = this;
      var account_exists = false;

      // show password as text
      that.showPassword();

      // calculate password strength
      that.showPasswordStrength();
      
      that.spamEmail($(options.email_field_selector, element));
      $(options.email_field_selector, element).change(function() {
        that.spamEmail($(options.email_field_selector, element));
      });

      that.toggleAccountFields($(options.create_mp_selector, element));
      $(options.create_mp_selector, element).change(function() {
        that.toggleAccountFields($(options.create_mp_selector, element));
      });

      function doneTyping () {
        var email = $(options.email_field_selector, element).val();
        account_exists = that.checkMinnpostAccount(element, options, email);
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
    }, // allowMinnpostAccount

    spamEmail: function(email_field) {
      var spamErrorContainer = email_field.parent();
      if ($('.a-spam-email', spamErrorContainer).length === 0 ) {
        spamErrorContainer.append('<p class="a-form-caption a-validation-error a-spam-email">This email address has been detected as a spammer.</p>');
      }
      $('.a-spam-email', spamErrorContainer).hide();
      spamErrorContainer.removeClass('invalid a-error');
    }, // spamEmail

    toggleAccountFields: function(create_account_selector) {
      if (create_account_selector.is(':checked')) {
        create_account_selector.parent().before('<p class="a-form-caption a-account-exists a-account-exists-success">There is already a MinnPost.com account with this email address.</p>');
        $('.a-account-exists').hide();
        $(this.options.password_selector, this.element).show();
        this.options.create_account = true;
      } else {
        $(this.options.password_selector, this.element).hide();
      }
    }, // toggleAccountFields

    showPassword: function() {
      // Cache our jquery elements
      var $submit = $('.btn-submit');
      var $container = $(this.options.password_selector, this.element);
      var $field = $('input[name="password"]', $container);
      $('.a-account-exists').hide();
      var show_pass = '<div class="a-form-show-password a-form-caption"><label><input type="checkbox" name="show_password" id="show-password-checkbox" value="1"> Show password</label></div>';
      // Inject the toggle button into the page
      $container.append( show_pass );
      // Cache the toggle button
      var $toggle = $('#show-password-checkbox');
      // Toggle the field type
      $toggle.on('click', function(e) {
        var checkbox = $(this);
        if (checkbox.is(':checked')) {
          $field.attr('type', 'text');
        } else {
          $field.attr('type', 'password');
        }
      });
      // Set the form field back to a regular password element
      $submit.on( 'click', function(e) {
        $field.attr('type', 'password');
      });
    },

    showPasswordStrength: function() {
      // checkPasswordStrength
      var that = this;
      if ($('.a-password-strength').length > 0 ) {
        var $before = $('.a-form-show-password');
        $before.after( $('<div class="a-password-strength"><meter max="4" id="password-strength"><div></div></meter><p class="a-form-caption" id="password-strength-text"></p></div>'));
        $( 'body' ).on( 'keyup', 'input[name=password]',
          function() {
            that.checkPasswordStrength(
              $('input[name=password]'), // Password field
              $('#password-strength'),           // Strength meter
              $('#password-strength-text')      // Strength text indicator
            );
          }
        );
      }
    }, // showPasswordStrength

    checkPasswordStrength: function( $password, $strengthMeter, $strengthText ) {
      var password = $password.val();
      // Get the password strength
      var result = zxcvbn(password);
      var strength = result.score;

      $strengthText.removeClass( 'short bad good strong' );

      // Add the strength meter results
      switch ( strength ) {
        case 2:
          $strengthText.addClass( 'bad' ).html( 'Strength: <strong>Weak</strong>' );
          break;
        case 3:
          $strengthText.addClass( 'good' ).html( 'Strength: <strong>Medium</strong>' );
          break;
        case 4:
          $strengthText.addClass( 'strong' ).html( 'Strength: <strong>Strong</strong>' );
          break;
        case 5:
          $strengthText.addClass( 'short' ).html( 'Strength: <strong>Very weak</strong>' );
          break;
        default:
          $strengthText.addClass( 'short' ).html( 'Strength: <strong>Very weak</strong>' );
      }
      $strengthMeter.val(strength);
      return strength;
    }, // checkPasswordStrength

    checkMinnpostAccount: function(element, options, email) {
      var user = {
        email: email
      };
      var that = this;
      $.ajax({
        method: 'GET',
        url: options.minnpost_root + '/wp-json/user-account-management/v1/check-account',
        data: user
      }).done(function( result ) {
        if (result.status === 'success' && result.reason === 'user exists') { // user exists
          if ($(options.create_mp_selector, element).is(':checked')) {
            $(options.password_selector, element).hide();
            $(options.create_mp_selector, element).parent().hide();
            $('.a-account-exists', element).show();
          }
          $(options.create_mp_selector, element).on('change', function() {
            if ($(options.create_mp_selector, element).is(':checked')) {
              $(options.password_selector, element).hide();
              $(options.create_mp_selector, element).parent().hide();
              $('.a-account-exists', element).show();
            }
          });
        } else if ( result.status === 'spam' ) {
          $(that.options.email_field_selector).addClass('invalid a-error');
          $( '.a-spam-email').show();
        } else { // user does not exist or ajax call failed
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
    }, // checkMinnpostAccount

    paymentRequestButton: function(element, options) {
      var that = this;
      var total_amount = that.getTotalAmount();
      that.paymentRequest = that.stripe.paymentRequest({
        country: 'US',
        currency: 'usd',
        total: {
          label: 'MinnPost',
          amount: total_amount * 100,
        },
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
          },
        },
      });
      
      // Check the availability of the Payment Request API first.
      that.paymentRequest.canMakePayment().then(function(result) {
        if (result) {
          $('.m-pay-without-payment-request').hide();
          that.prButton.mount('#payment-request-button');
        } else {
          that.hidePaymentRequest( $('.o-pay-with-payment-request') );
        }
      });

      $('.decline-apple-pay a').click(function(event) {
        event.preventDefault();
        that.hidePaymentRequest( $('.o-pay-with-payment-request .m-form-actions-pay-fees') );
      });

      that.prButton.on('click', function(event) {

        // Send paymentMethod.id to server
        var supportform = $(that.options.donate_form_selector);

        // check validation of form
        if (!supportform.get(0).reportValidity()) {
          event.preventDefault();
          return;
        }
      });

      that.paymentRequest.on('paymentmethod', function(event) {

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

    }, // paymentRequestButton

    hidePaymentRequest: function( hideElement ) {
      hideElement.hide();
      $('.decline-apple-pay a').hide();
      $('.m-pay-without-payment-request').show();
      $('.a-g-recaptcha').insertAfter('.m-pay-without-payment-request .m-form-actions-pay-fees');
    }, // hidePaymentRequest

    choosePaymentMethod: function(element, options) {

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
    }, // choosePaymentMethod

    setupPaymentMethod: function(element_id, element_value) {
      var stripe_payment_type = this.setStripePaymentType(element_value);
      if ( element_value === 'bank_account' ) {
        $('input[name="payment_method_id"]', $(this.options.donate_form_selector)).remove();
        this.achFields(this.element, this.options);
      } else {
        this.removeAchFields(this.options);
      }
      $(this.options.payment_method_selector).removeClass('active');
      $(this.options.payment_method_selector + '.' + element_id).addClass('active');
      $(this.options.payment_method_selector + ':not(.active) input').val('');
      this.calculateFees(this.options.original_amount, stripe_payment_type);
    }, // setupPaymentMethod

    removeAchFields: function(options) {
      $('input[name="public_token"]', $(options.donate_form_selector)).remove();
      $('input[name="account_id"]', $(options.donate_form_selector)).remove();
      $('input[name="bankToken"]', $(options.donate_form_selector)).remove();
      $(options.plaid_link).html('<a href="#">Sign in to your bank account</a>');
      this.buttonDisabled(options, false, '', '', true); // if the button was disabled, re-enable it
      if (typeof this.linkHandler !== 'undefined') {
        this.linkHandler.destroy();
      }
    }, // removeAchFields

    creditCardFields: function(element, options) {

      var that = this;

      var style = {
        base: {
          iconColor: '#666EE8',
          lineHeight: '43px',
          fontWeight: 400,
          fontFamily: 'ff-meta-web-pro',
          fontSize: '24px',
          //lineHeight: '37px',
          //fontSize: '16px',
        },
        invalid: {
          color: '#1a1818',
        },
      };

      // Add an instance of the card UI component into the `card-element` <div>
      //card.mount('#card-element');
      if ( $('.credit-card-group').length === 0 && $('.payment-method.choose-card').length === 0) {
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
      that.cardNumberElement.on('change', function(event) {
        var stripe_payment_type = 'card';
        // Switch payment type if it's one that we recognize as distinct
        if (event.brand) {
          if ( event.brand === 'amex' ) {
            stripe_payment_type = 'amex';
          }          
        }
        // error handling
        that.stripeErrorDisplay(event.error, $(options.cc_num_selector, element), element, options );
        // if it changed, reset the button
        that.buttonStatus(options, $(that.options.donate_form_selector).find('button'), false);
        that.calculateFees(that.options.original_amount, stripe_payment_type);
      });

      that.cardExpiryElement.on('change', function(event) {
        // error handling
        that.stripeErrorDisplay(event.error, $(options.cc_exp_selector, element), element, options );
        // if it changed, reset the button
        that.buttonStatus(options, $(that.options.donate_form_selector).find('button'), false);
      });

      that.cardCvcElement.on('change', function(event) {
        // error handling
        that.stripeErrorDisplay(event.error, $(options.cc_cvc_selector, element), element, options );
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

    }, // creditCardFields

    showSpinner: function() {
      $(this.options.plaid_link).hide();
      $(this.options.plaid_link).after('<div class="a-spinner"><img src="https://www.minnpost.com/wp-admin/images/spinner.gif" srcset="https://www.minnpost.com/wp-admin/images/spinner.gif 1x, https://www.minnpost.com/wp-admin/images/spinner-2x.gif 2x,"></div>');
    },

    hideSpinner: function() {
      $(this.options.plaid_link).show();
      $('.a-spinner').hide();
    },

    achFields: function(element, options) {
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
          onSuccess: function(public_token, metadata) {
            that.showSpinner();
            $.ajax({
              url:'/get_plaid_access_token/',
              data: JSON.stringify({ public_token: public_token, account_id: metadata.account_id }),
              type: 'POST',
              contentType: 'application/json; charset=utf-8'
            })
            .done(function(response) {
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
            })
            .fail(function(response) {
              that.debug(response);
              that.hideSpinner();
              $(options.plaid_link).before('<p class="a-error a-validation-error">' + response.error + '</p>');
            });
          },
        });
        $(options.plaid_link + ' a').click(function(event) {
          event.preventDefault();
          that.resetFormErrors(that.options, that.element);
          //$(options.payment_method_selector + ' .a-error').remove(); // remove method error message if it is there
          that.linkHandler.open();
        });
      }
    }, // achFields

    buttonStatus: function(options, button, disabled) {
      // make the button clickable or not
      this.buttonDisabled(options, disabled, button);
      if (disabled === false) {
        button.text(options.button_text);
      } else {
        button.text('Processing');
      }
    }, // buttonStatus

    buttonDisabled: function(options, disabled, button = '', message = '', ach_was_initialized = false) {
      if (button === '') {
        button = $(options.donate_form_selector).find('button');
      }
      button.prop('disabled', disabled);
      if (typeof tlite !== 'undefined') {
        if (message !== '') {
          if (disabled === true) {
            button.attr('data-tlite', message);
          } else {
            button.removeAttr( 'data-tlite' ); // there should be no tlite value if the button is enabled
          }
          button.on('mouseenter focus', function(event) {
            tlite.show( ( this ), { grav: 'nw' } );
          });
          button.on('mouseleave', function(event) {
            tlite.hide( ( this ) );
          });
        } else {
          button.removeAttr( 'data-tlite' );
          if (ach_was_initialized === true ) {
            button.on('mouseenter focus', function(event) {
              tlite.hide( ( this ) );
            });
            button.click(function(event) {
              return true;
            });
          }
        }
      }
    }, // buttonDisabled

    validateSetup: function(element, options) {
      var forms = document.querySelectorAll(options.form_selector);
      forms.forEach( function ( form ) {
        ValidForm( form, {
          validationErrorParentClass: 'm-has-validation-error',
          validationErrorClass: 'a-validation-error',
          invalidClass: 'a-error',
          errorPlacement: 'after'
        } )
      } );
      this.scrollToFormError(options);
    }, // validateSetup

    scrollToFormError: function(options) {
      var form = $( options.form_selector );
      // listen for `invalid` events on all form inputs
      form.find( ':input' ).on( 'invalid', function () {
          var input = $( this );
          // the first invalid element in the form
        var first = form.find( '.a-error' ).first();
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
              if ( elementOffset > pageOffset && elementOffset < pageOffset + window.innerHeight ) {
                  return true;
              }

              // note: avoid using animate, as it prevents the validation message displaying correctly
              $( 'html, body' ).scrollTop( elementOffset );
          }
      } );
    }, // scrollToFormError

    formSetup: function(element, options) {
      var that = this;

      $(options.donate_form_selector).submit(function(event) {
        event.preventDefault();
        that.formProcessor(that, 'submit');

      });
    }, // formSetup

    formProcessor: function(that, type) {

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
          that.bankTokenHandler( $('input[name="bankToken"]').val(), 'bank_account' );
        }
      } else {
        that.submitFormOnly();
      }
    }, // formProcessor

    stripeErrorDisplay: function(error, this_selector, element, options) {
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
    }, // stripeErrorDisplay

    resetFormErrors: function(options, element) {
      var that = this;
      $('.a-validation-error').remove();
      $('input, label, div', element).removeClass('a-error');
      $('label', element).removeClass('m-has-validation-error');
      $(options.payment_method_selector, element).removeClass('a-error invalid');
      $('.a-validation-error').remove();
      
      $(options.choose_payment + ' input').change(function() {
        $(options.payment_method_selector + ' .a-error').remove(); // remove method error message if it is there
        $(options.payment_method_selector).parent().find('.a-validation-error').remove();
        // if a payment field changed, reset the button
        that.buttonStatus(options, $(options.donate_form_selector).find('button'), false);
      });
    }, // resetFormErrors
    
    createMinnPostAccount: function(options, element) {
      // 2. create minnpost account if specified
      if (options.create_account === true) {
        var user = {
          email: $(options.email_field_selector, element).val(),
          first_name: $(options.first_name_field_selector, element).val(),
          last_name: $(options.last_name_field_selector, element).val(),
          password: $(options.password_field_selector, element).val(),
          city: $(options.billing_city_field_selector, element).val(),
          state: $(options.billing_state_field_selector, element).val(),
          zip: $(options.billing_zip_field_selector, element).val(),
        };
        $.ajax({
          method: 'POST',
          url: options.minnpost_root + '/wp-json/user-account-management/v1/create-user',
          data: user
        }).done(function( data ) {
          if (data.status === 'success' && data.reason === 'new user') {
            // user created - they should receive email
          }
        });
      }
    }, // createMinnPostAccount
    
    generateBillingDetails: function() {
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
    }, // generateBillingDetails

    createPaymentMethod: function(cardElement, billingDetails) {
      var that = this;
      that.stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: billingDetails
      }).then(function(response) {
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
          }).then(function(response) {
            // Handle server response (see Step 3)
            response.json().then(function(json) {
              that.handleServerResponse(json);
            })
          });
        }
      });
    }, // createPaymentMethod

    bankTokenHandler: function(token, type) {
      this.setStripePaymentType(type);
      this.submitFormOnly();
    }, // bankTokenHandler

    submitFormOnly: function() {
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
      })
      .done(function(response) {
        if (typeof response.errors !== 'undefined') {
          that.handleServerError(response);
        } else {
          supportform.get(0).submit(); // continue submitting the form if the ajax was successful
        }
      })
      .fail(function() {
        that.buttonStatus(that.options, $(that.options.donate_form_selector).find('button'), false);
      });
    }, // submitFormOnly

    handleServerResponse: function(response) {
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
    }, // handleServerResponse

    handleServerError: function(response) {
      var that = this;
      var this_field = '';
      // do not submit. there is an error.
      that.buttonStatus(that.options, $(that.options.donate_form_selector).find('button'), false);
      // handle error display
      if (typeof response.errors !== 'undefined') {
        if (typeof response.errors[0] !== 'undefined') {
          this_field = response.errors[0].field + '_field_selector';
        }
        $.each(response.errors, function( index, error ) {
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
    }, // handleServerError

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
          this.stripeErrorDisplay(error, stripeErrorSelector, this.element, this.options );
        }
        if (error.type == 'missing_payment' && stripeErrorSelector === '') {
          $(this.options.payment_method_selector + '.active').append('<p class="a-form-caption a-validation-error a-missing-payment-error">' + error.message + '</p>')
        }
        if (error.field == 'recaptcha') {
          $(this.options.pay_button_selector).before('<p class="a-form-caption a-validation-error a-recaptcha-error">' + message + '</p>')
        }
        if (error.type == 'invalid_request_error' && stripeErrorSelector === '') {
          $(this.options.pay_button_selector).before('<p class="a-form-caption a-validation-error a-invalid-request-error">' + error.message + '</p>')
        }
      }
    }, // displayErrorMessage

    showNewsletterSettings: function(element, options) {
      var that = this;

      var newsletter_group_html = '';
      if ($(options.newsletter_group_selector).length > 0 ) {
        var get_data = {
          shortcode: 'newsletter_form',
          placement: 'useraccount'
        };
        $.ajax({
          method: 'GET',
          url: options.minnpost_root + '/wp-json/minnpost-api/v2/mailchimp/form',
          data: get_data
        }).done(function( result ) {
          if ( typeof result.group_fields !== 'undefined' ) {
            $.each(result.group_fields, function( index, category ) {
              newsletter_group_html += '<fieldset class="m-form-item support-newsletter m-form-item-' + category.type + '">';
              newsletter_group_html += '<label>' + category.name + ':</label>';
              if ( category.contains.length > 0 ) {
                newsletter_group_html += '<div class="m-form-item m-form-item-newsletter">';
                $.each(category[category.contains], function( index, item ) {
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
        }).done(function( result ) {
          if ( typeof result.mailchimp_status !== 'undefined' ) {
            $(options.email_field_selector, element).after('<input name="mailchimp_status" type="hidden" value="' + result.mailchimp_status + '">');
          }
          if ( typeof result.mailchimp_user_id !== 'undefined' ) {
            $(options.email_field_selector, element).after('<input name="mailchimp_user_id" type="hidden" value="' + result.mailchimp_user_id + '">');
          }
          if (result.mailchimp_status === 'subscribed') {
            // user created - show a success message
            $('.a-confirm-instructions').text($('.a-confirm-instructions').attr('data-known-user'));
            var groups = result.groups;
            $.each(groups, function( index, value ) {
              if ( value === true ) {
                $(':checkbox[value="' + index + '"]').prop('checked',true);
              } else {
                $(':checkbox[value="' + index + '"]').prop('checked',false);
              }
            });
          }
        });
      }

    }, // showNewsletterSettings

    confirmMessageSubmit: function(element, options) {

      var existing_newsletter_settings = $(options.newsletter_group_selector + ' input').serialize();
      //this.debug(existing_newsletter_settings);

      $(options.confirm_form_selector).submit(function(event) {
        event.preventDefault();

        var confirmform = $(options.confirm_form_selector);
        // submit settings to mailchimp
        // need to get user info on a hidden field here

        var newsletter_groups = $(options.newsletter_group_selector + ' input:checked');
        var new_newsletter_settings = newsletter_groups.serialize();

        if ((existing_newsletter_settings !== new_newsletter_settings) && (typeof newsletter_groups !== 'undefined')) {
          //add our own ajax check as X-Requested-With is not always reliable
          //ajax_form_data = new_newsletter_settings + '&ajaxrequest=true&subscribe';

          var post_data = {
            email: $(options.email_field_selector, element).val(),
            first_name: $(options.first_name_field_selector, element).val(),
            last_name: $(options.last_name_field_selector, element).val(),
            groups_submitted: {}
          };

          post_data.groups_available = 'all';

          if ( $('input[name="mailchimp_status"]').length > 0 ) {
            post_data.mailchimp_status = $('input[name="mailchimp_status"]').val();
          }

          if ( $('input[name="mailchimp_user_id"]').length > 0 ) {
            post_data.mailchimp_user_id = $('input[name="mailchimp_user_id"]').val();
          }

          if (typeof newsletter_groups !== 'undefined') {
            $.each(newsletter_groups, function(index, value) {
              var group = $(this).val();
              post_data.groups_submitted[index] = group;
            });
          }

          $.ajax({
            url: options.minnpost_root + '/wp-json/minnpost-api/v2/mailchimp/user',
            type: 'post',
            dataType : 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(post_data)
          })
          .done(function(response) { // response from the PHP action
            var message = '';
            if ( response.success === true ) {
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
          })
          .fail(function(response) {
            // we should put an actual error message here someday, probably
            //$('.m-hold-message').html('<div class="m-form-message m-form-message-info">An error has occured. Please try again.</div>');
            confirmform.get(0).submit();
          });

        } else { // end part where settings changed
          confirmform.get(0).submit();
        }

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