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
    'plaid_public_key' : '',
    'plaid_link' : '#authorize-ach',
    'minnpost_root' : 'https://www.minnpost.com',
    'donate_form_selector': '#donate',
    'donate_step_selector' : '#panel--pay',
    'confirm_form_selector' : '#confirm',
    'confirm_step_selector' : '#panel--confirmation',
    'active' : 'panel--pay',
    'confirm' : 'panel--confirmation',
    'query' : 'step',
    'pay_cc_processing_selector' : 'input[id="pay-fees"]',
    'fee_amount' : '.processing-amount',
    'level_amount_selector' : '#panel--pay .amount .level-amount', // we can maybe get rid of this
    'original_amount_selector' : '[name="amount"]',
    'fair_market_value_selector' : '#fair_market_value',
    'frequency_selector' : '.frequency',
    'full_amount_selector' : '.full-amount',
    'name_selector' : '.m-form-item-display-name',
    'in_honor_or_memory_field_selector' : '.m-form-item-honor-memory',
    'honor_or_memory_chooser' : 'input[name="in_honor_or_memory"]', // radio fields
    'honor_type_selector' : '.a-honor-type', // span inside label
    'honor_memory_input_group' : '.a-honor-or-memory', // holds the form field
    'notify_selector' : '.notify_someone',
    'notify_field_selector' : '.m-form-item-notify',
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
    'account_city_selector' : '#billing_city',
    'account_state_selector' : '#billing_state',
    'account_zip_selector' : '#billing_zip',
    'create_mp_selector' : '#creatempaccount',
    'password_selector' : '.m-form-item-password',
    'additional_amount_field' : '#additional_donation',
    'billing_selector' : 'fieldset.m-billing-information',
    'shipping_selector' : 'fieldset.m-shipping-information',
    'credit_card_fieldset' : '.m-form-group-payment',
    'choose_payment' : '#choose-payment-method',
    'payment_method_selector' : '.payment-method',
    'cc_num_selector' : '#card-number',
    'cc_exp_selector' : '#card-expiry',
    'cc_cvv_selector' : '#card-cvc',
    'confirm_button_selector' : '#finish',
    'pay_button_selector' : '.a-button-pay',
    'opp_id_selector' : '#lock_key', // we use this value as the Google Analytics transaction ID
    'recurring_selector' : '#recurring',
    'newsletter_group_selector' : '.support-newsletters',
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
    }

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
      this.options.original_amount = parseInt($(this.options.original_amount_selector, this.element).val(), 10);
      this.options.frequency = parseFloat($(this.options.frequency_selector, this.element).attr('data-year-freq'));
      var recurring = $(this.options.recurring_selector, this.element).val();
      if (typeof recurring !== 'undefined') {
        this.options.recurring = recurring.charAt(0).toUpperCase() + recurring.slice(1);
      }
      
      this.options.processing_fee = (Math.round(parseFloat(this.options.fee_amount)*Math.pow(10,2))/Math.pow(10,2)).toFixed(2);
      this.options.processing_fee_text = this.options.processing_fee;
      
      this.options.cardType = null;
      this.options.create_account = false;

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

      // use a referrer for edit link if we have one
      if (document.referrer !== '') {
        $('#edit_url').prop('href', document.referrer);
      }

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

      this.tabNavigation(query_panel); // navigating

      this.amountAsRadio(this.element, this.options); // if the amount field is a radio button
      this.amountUpdated(this.element, this.options); // if the amount text field can change

      if ($(this.options.pay_cc_processing_selector).length > 0) {
        this.creditCardProcessingFees(this.options, reset); // processing fees
      }
      
      if ($(this.options.donate_step_selector).length > 0) {
        this.options.level = this.checkLevel(this.element, this.options, 'name'); // check what level it is
        this.options.levelnum = this.checkLevel(this.element, this.options, 'num'); // check what level it is as a number
        this.donateAnonymously(this.element, this.options); // anonymous
        this.honorOrMemoryToggle(this.element, this.options); // in honor or in memory of someone
        this.outsideUnitedStates(this.element, this.options); // outside US
        this.shippingAddress(this.element, this.options); // shipping address
        this.allowMinnpostAccount(this.element, this.options); // option for creating minnpost account
        this.choosePaymentMethod(this.element, this.options); // switch between card and ach
        this.creditCardFields(this.element, this.options); // do stuff with the credit card fields
        this.achFields(this.element, this.options); // do stuff for ach payments, if applicable to the form
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

    tabNavigation: function(active) {
      var step = $('.progress--donation li.' + active).index() + 1;
      var nav_item_count = $('.progress--donation li').length;
      var opp_id = $(this.options.opp_id_selector).val();
      var next_step = step + 1;
      var post_purchase = false;

      // we will have to update this because no more flask id

      this.debug( 'step is ' + step + ' and nav item count is ' + nav_item_count + ' and opp id is ' + opp_id + ' and next step is ' + next_step );

      // this is the last visible step
      if ($(this.options.confirm_step_selector).length > 0) {
        active = this.options.confirm;
        $('.progress--donation li.' + active + ' span').addClass('active');
        step = $('.progress--donation li.' + active).index() + 1;
        // there is a continuation of the main form on this page. there is a button to click
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

      this.analyticsTrackingStep(step, post_purchase);

      // activate the nav tabs
      if ($('.progress--donation li .active').length === 0) {
        $('#' + active).show();
        $('.progress--donation li.' + active + ' a').addClass('active');
      } else {
        active = $('.progress--donation li .active').parent().prop('class');
        $('#' + active).show();
      }

    }, // tabNavigation

    analyticsTrackingStep: function(step, post_purchase) {
      var level = this.checkLevel(this.element, this.options, 'name'); // check what level it is
      var amount = $(this.options.original_amount_selector).val();
      var recurring = this.options.recurring;
      var opp_id = $(this.options.opp_id_selector).val();

      // if we're not after the purchase, use addProduct
      if ( post_purchase !== true ) {
        ga('ec:addProduct', {
          'id': 'minnpost_' + level.toLowerCase() + '_membership',
          'name': 'MinnPost ' + level.charAt(0).toUpperCase() + level.slice(1) + ' Membership',
          'category': 'Donation',
          'brand': 'MinnPost',
          'variant':  recurring,
          'price': amount,
          'quantity': 1
        });
      }

      if (step === 'purchase') {
        this.debug('add a purchase action. step is ' + step);
        ga('ec:setAction', step,{
          'id': opp_id, // Transaction id - Type: string
          'affiliation': 'MinnPost', // Store name - Type: string
          'revenue': amount, // Total Revenue - Type: numeric
        });
      } else {
        this.debug('add a checkout action. step is ' + step);
        ga('ec:setAction','checkout', {
          'step': step,            // A value of 1 indicates first checkout step.Value of 2 indicates second checkout step
        });
      }

      ga('set', {
        page: window.location.pathname,
        title: document.title
      });
      ga('send', 'pageview', window.location.pathname);

    }, // analyticsTrackingStep

    amountAsRadio: function(element, options) {
      // when amount field is a radio button, we need to check it whenever it changes
      $(options.original_amount_selector, element).change(function() {
        if ($(this).is(':radio')) {
            options.original_amount = parseInt($(options.original_amount_selector + ':checked', element).val(), 10);
          }
      });
    }, // amountAsRadio

    amountUpdated: function(element, options) {
      // when new amount text field can change, we need to change the hidden field
      // there is also potentially an additional amount field value to add
      var that = this;
      var payment_type = $(options.choose_payment + ' input').val();

      // set the fair market value if applicable
      var amount_selector_fair_market = $(options.original_amount_selector, element);
      if (amount_selector_fair_market.is(':radio')) {
        amount_selector_fair_market = $(options.original_amount_selector + ':checked', element);
      }
      that.setFairMarketValue(amount_selector_fair_market);

      $(options.original_amount_selector, element).change(function() {
        that.options.original_amount = parseInt($(this, element).val(), 10);
        if ( payment_type === 'bank_account' ) {
          that.calculateFees(that.options.original_amount, 'bank_account');
        } else {
          that.calculateFees(that.options.original_amount, 'card');
        }
        that.setFairMarketValue($(this, element));
      });
      $(options.additional_amount_field, element).change(function() {
        that.options.original_amount = parseInt($(options.original_amount_selector, element).val(), 10);
        if ( payment_type === 'bank_account' ) {
          that.calculateFees(that.options.original_amount, 'bank_account');
        } else {
          that.calculateFees(that.options.original_amount, 'card');
        }
      });

    }, // amountUpdated

    setFairMarketValue: function(amount_selector) {
      // if there is a fair market value field, check and see if we can populate it
      if ($(this.options.fair_market_value_selector).length > 0) {
        var fairMarketValue = amount_selector.data('fair-market-value');
        $(this.options.fair_market_value_selector).val(fairMarketValue);
      }
    }, // setFairMarketValue

    calculateFees: function(amount, stripe_payment_type) {
      // this sends the amount and stripe payment type to python; get the fee and display it to the user on the checkbox label
      var that = this;
      var total_amount = amount;
      if ($(this.options.additional_amount_field).length > 0 && $(this.options.additional_amount_field).val() > 0) {
        var additional_amount = $(this.options.additional_amount_field).val();
        total_amount = parseInt(additional_amount, 10) + parseInt(amount, 10);
      }
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

    creditCardProcessingFees: function(options, reset) {
      // this adds or subtracts the fee to the original amount when the user indicates they do or do not want to pay the fees
      var that = this;
      that.creditCardFeeCheckbox($(this.options.pay_cc_processing_selector));
      $(this.options.pay_cc_processing_selector).on('change', function () {
          that.creditCardFeeCheckbox(this);
      });
    }, // creditCardProcessingFees

    setStripePaymentType: function(stripe_payment_type) {
      if ($('input[name="stripe_payment_type"]').length === 0) {
        $(this.options.donate_form_selector).append('<input type=\"hidden\" name=\"stripe_payment_type\">');
      }
      $('input[name="stripe_payment_type"]').val(stripe_payment_type);
    }, // setStripePaymentType

    creditCardFeeCheckbox: function(field) {
      var full_amount;
      var that = this;
      if ($(field).is(':checked') || $(field).prop('checked')) {
        $('.amount .level-amount').addClass('full-amount');
        full_amount = (that.options.original_amount + parseFloat($(that.options.fee_amount).text()));
      } else {
        full_amount = that.options.original_amount;
      }
      $(that.options.full_amount_selector).text(parseFloat(full_amount).toFixed(2));
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

    checkLevel: function(element, options, returnvalue) {
      // we could maybe get rid of this if we could move this part into wordpress
      var level = '';
      var levelnum = 0;
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
            return false;
          }
        } else if (typeof max !== 'undefined') {
          if (amount_yearly < max) {
            level = name;
            levelnum = num;
            return false;
          }
        } else if (typeof min !== 'undefined') {
          if (amount_yearly >= min) {
            level = name;
            levelnum = num;
            return false;
          }
        }
      });
      if (returnvalue === 'name') {
        return level;
      } else if (returnvalue === 'num') {
        return levelnum;  
      }
    }, // checkLevel

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
      $(options.show_billing_country_selector).click(function() {
        $(options.billing_country_selector).show();
        $(this).parent().hide();
        return false;
      });
      $(options.show_shipping_country_selector).click(function() {
        $(options.shipping_country_selector).show();
        $(this).parent().hide();
        return false;
      });
    }, // outsideUnitedStates

    shippingAddress: function(element, options) {
      var that = this;
      var show_shipping = false;
      if ($(options.use_for_shipping_selector).length > 0) { // we have a shipping checkbox
        show_shipping = true;
      }
//      show_shipping = !!$(options.use_for_shipping_selector + ':checked', element).length;
//      //this.debug('show is there');

/*      $(options.use_for_shipping_selector, element).change(function() {
        that.shippingAddress(element, options);
        //this.debug('change it');
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
        spamErrorContainer.append('<p class="a-form-caption a-error a-spam-email">This email address has been detected as a spammer.</p>');
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

    choosePaymentMethod: function(element, options) {

      var that = this;

      if ($(options.choose_payment).length > 0) {
        if ($(options.choose_payment + ' input').is(':checked')) {
          var checked = $(options.choose_payment + ' input:checked').attr('id');
          var checked_value = $(options.choose_payment + ' input:checked').val();
          that.setupPaymentMethod(checked, checked_value);
        }

        $(options.choose_payment + ' input').change(function (event) {
          that.setupPaymentMethod(this.id, this.value);

          if ( this.value === 'bank_account' ) {
            $('input[name="stripeToken"]', $(that.options.donate_form_selector)).remove();
            that.achFields(that.element, that.options);
          } else {
            $('input[name="public_token"]', $(that.options.donate_form_selector)).remove();
            $('input[name="account_id"]', $(that.options.donate_form_selector)).remove();
            $('input[name="bankToken"]', $(that.options.donate_form_selector)).remove();
            that.calculateFees(that.options.original_amount, 'card'); // we can't use creditcardfields method here
          }
        });

      }
    }, // choosePaymentMethod

    setupPaymentMethod: function(id, value) {
      $(this.options.payment_method_selector).removeClass('active');
      $(this.options.payment_method_selector + '.' + id).addClass('active');
      //$(this.options.payment_method_selector + ':not(.active) label').removeClass('required');
      //$(this.options.payment_method_selector + ':not(.active) input').prop('required', false);
      $(this.options.payment_method_selector + ':not(.active) input').val('');
      //$(this.options.payment_method_selector + '.active label').addClass('required');
      //$(this.options.payment_method_selector + '.active input').prop('required', true);
      if ( value === 'bank_account' ) {
        this.calculateFees(this.options.original_amount, 'bank_account');
      } else {
        this.calculateFees(this.options.original_amount, 'card');
      }
    }, // setupPaymentMethod

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
      };

      // Add an instance of the card UI component into the `card-element` <div>
      //card.mount('#card-element');
      if ( $('.credit-card-group').length === 0 && $('.payment-method.choose-card').length === 0) {
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
      that.cardCvcElement.mount(options.cc_cvv_selector);

      // validate/error handle the card fields
      that.cardNumberElement.on('change', function(event) {
        var stripe_payment_type = 'card';
        // error handling
        that.stripeErrorDisplay(event, $(options.cc_num_selector, element), element, options );
        // if it changed, reset the button
        that.buttonStatus(options, $(that.options.donate_form_selector).find('button'), false);
        // Switch brand logo
        if (event.brand) {
          if ( event.brand === 'amex' ) {
            stripe_payment_type = 'amex';
          }          
          that.setBrandIcon(event.brand);
        }
        that.calculateFees(that.options.original_amount, stripe_payment_type);
      });

      that.cardExpiryElement.on('change', function(event) {
        // error handling
        that.stripeErrorDisplay(event, $(options.cc_exp_selector, element), element, options );
        // if it changed, reset the button
        that.buttonStatus(options, $(that.options.donate_form_selector).find('button'), false);
      });

      that.cardCvcElement.on('change', function(event) {
        // error handling
        that.stripeErrorDisplay(event, $(options.cc_cvv_selector, element), element, options );
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

    setBrandIcon: function(brand) {
      var cardBrandToPfClass = {
        'visa': 'pf-visa',
        'mastercard': 'pf-mastercard',
        'amex': 'pf-american-express',
        'discover': 'pf-discover',
        'diners': 'pf-diners',
        'jcb': 'pf-jcb',
        'unknown': 'pf-credit-card',
      }
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

    achFields: function(element, options) {
      var bankTokenFieldName = 'bankToken';
      var bankTokenField = 'input[name="' + bankTokenFieldName + '"]';
      if (options.plaid_env != '' && options.key != '' && typeof Plaid !== 'undefined') {
        var linkHandler = Plaid.create({
          selectAccount: true,
          apiVersion: 'v2',
          env: options.plaid_env,
          clientName: 'MinnPost',
          key: options.plaid_public_key,
          product: 'auth',
          onLoad: function() {
            // The Link module finished loading.
          },
          onSuccess: function(public_token, metadata) {
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

            var supportform = $(options.donate_form_selector);

            // response contains id and card, which contains additional card details
            // Insert the data into the form so it gets submitted to the server
            supportform.append($('<input type=\"hidden\" name=\"public_token\" />').val(public_token));
            supportform.append($('<input type=\"hidden\" name=\"account_id\" />').val(metadata.account_id));

            // get the account validated by ajax
            $.ajax({
              url:'/plaid_token/',
              //cache: false,
              data: $(supportform).serialize(),
              type: 'POST'
            })
            .done(function(response) {
              if (typeof response.error !== 'undefined') {
                // there is an error.
                $(options.plaid_link).parent().after('<p class="error">' + response.error + '</p>')
              } else {
                //this.debug('print response here');
                //this.debug(response);
                // add the field(s) we need to the form for submitting
                if ($(bankTokenField).length > 0) {
                  $(bankTokenField).val(response.stripe_bank_account_token);
                } else {
                  $(options.donate_form_selector).prepend($('<input type=\"hidden\" name="' + bankTokenFieldName + '">').val(response.stripe_bank_account_token));
                }
                $(options.plaid_link, element).html('<strong>Your account was successfully authorized</strong>').contents().unwrap();
              }
            })
            .error(function(response) {
              $(options.plaid_link).parent().after('<p class="error">' + response.error + '</p>')
            });
          },
          onExit: function(err, metadata) {
            // The user exited the Link flow.
          },
        });
        $(options.plaid_link, element).click(function(event) {
          event.preventDefault();
          $(options.payment_method_selector + ' .error').remove(); // remove method error message if it is there
          linkHandler.open();
        });
      }
    }, // achFields

    hasHtml5Validation: function(element, options) {
      //this.debug('value is ' + typeof document.createElement('input').checkValidity === 'function');
      return typeof document.createElement('input').checkValidity === 'function';
    }, // hasHtml5Validation

    buttonStatus: function(options, button, disabled) {
      // make the button clickable or not
      button.prop('disabled', disabled);
      if (disabled === false) {
        button.text(options.button_text);
      } else {
        button.text('Processing');
      }
    }, // buttonStatus

    validateAndSubmit: function(element, options) {
      var that = this;
      $(options.donate_form_selector).submit(function(event) {
        event.preventDefault();

        // validate and submit the form
        $('.a-check-field').remove();
        $('input, label', element).removeClass('a-error');
        var valid = true;
        var payment_type = $('input[name="stripe_payment_type"]').val();
        $(that.options.choose_payment + ' input').change(function() {
          $(that.options.payment_method_selector + ' .error').remove(); // remove method error message if it is there
          // if a payment field changed, reset the button
          that.buttonStatus(options, $(that.options.donate_form_selector).find('button'), false);
        });

        if (payment_type === 'bank_account') {
          if ($('input[name="bankToken"]').length === 0) {
            valid = false;
            $(that.options.payment_method_selector).prepend('<p class="error">You are required to enter credit card information, or to authorize MinnPost to charge your bank account, to make a payment.</p>');
          }
        }

        if (valid === true) {
          // 1. set up the button and remove the hidden fields we don't need
          that.buttonStatus(that.options, $(that.options.donate_form_selector).find('button'), true);
          var tokenData = that.generateTokenData();

          // 2. create minnpost account if specified
          if (that.options.create_account === true) {
            var user = {
              email: $(that.options.email_field_selector, element).val(),
              first_name: $(that.options.first_name_field_selector, element).val(),
              last_name: $(that.options.last_name_field_selector, element).val(),
              password: $(that.options.password_field_selector, element).val(),
              city: $(that.options.account_city_selector, element).val(),
              state: $(that.options.account_state_selector, element).val(),
              zip: $(that.options.account_zip_selector, element).val(),
            };
            $.ajax({
              method: 'POST',
              url: that.options.minnpost_root + '/wp-json/user-account-management/v1/create-user',
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

          if ($('input[name="bankToken"]').length == 0) {
            // finally, get a token from stripe, and try to charge it if it is not ach
            that.createToken(that.cardNumberElement, tokenData);
          } else {
            // if it is ach, we already have a token so pass it to stripe.
            that.stripeTokenHandler( $('#bankToken').val(), 'bank_account' );
          }
        } else {
          // this means valid is false
          that.buttonStatus(that.options, $(that.options.donate_form_selector).find('button'), false);
        }

      });
    }, // validateAndSubmit

    stripeErrorDisplay: function(event, this_selector, element, options) {
      // listen for errors and display/hide error messages
      var which_error = this_selector.attr('id');
      // when this field changes, reset its errors
      $('.card-instruction.' + which_error).removeClass('invalid');
      $('.card-instruction.' + which_error).empty();
      if (event.error) {
        $('.card-instruction.' + which_error).text(event.error.message + ' Please try again.');
        $('.card-instruction.' + which_error).addClass('invalid');
        this_selector.parent().addClass('a-error');
      } else {
        $('.card-instruction.' + which_error).removeClass('invalid');
        $('.card-instruction.' + which_error).empty();
        $(options.cc_num_selector, element).removeClass('a-error');
        $(options.cc_exp_selector, element).removeClass('a-rror');
        $(options.cc_cvv_selector, element).removeClass('a-error');
        $(options.cc_num_selector, element).parent().removeClass('a-error');
        $(options.cc_exp_selector, element).parent().removeClass('a-error');
        $(options.cc_cvv_selector, element).parent().removeClass('a-error');
      }
    }, // stripeErrorDisplay

    generateTokenData: function() {
      var tokenData = {};
      var full_name = '';
      if ($('#full_name').length > 0) {
        full_name = $('#full_name').val();
      } else {
        full_name = $('#first_name').val() + ' ' + $('#last_name').val();
      }
      tokenData.name = full_name;

      var street = 'None';
      if ($('input[name="full_address"]').val() != '') {
        street = $('#full_address').val();
        if ($('input[name="billing_street"]').val() != '') {
          street = $('input[name="billing_street"]').val();
        }
        tokenData.address_line1 = street;
      }

      var city = 'None';
      if ($('input[name="billing_city"]').val() != '') {
        city = $('input[name="billing_city"]').val();
        tokenData.address_city = city;
      }

      var state = 'None';
      if ($('input[name="billing_state"]').val() != '') {
        state = $('input[name="billing_state"]').val();
        tokenData.address_state = state;
      }

      var zip = 'None';
      if ($('input[name="billing_zip"]').val() != '') {
        zip = $('input[name="billing_zip"]').val();
        tokenData.address_zip = zip;
      }

      var country = 'US';
      if ($('input[name="billing_country"]').val() != '') {
        country = $('input[name="billing_country"]').val();
      }
      tokenData.address_country = country;

      return tokenData;
    }, // generateTokenData

    createToken: function(card, tokenData) {
      var that = this;
      that.stripe.createToken(card, tokenData).then(function(result) {
        if (result.error) {
          // Show the errors on the form
          that.buttonStatus(that.options, $(that.options.donate_form_selector).find('button'), false);
          var field = result.error.field + '_field_selector';
          var message = '';
          if (typeof result.error.message === 'string') {
            message = result.error.message;
          } else {
            message = result.error.message[0];
          }
          if ($(field).length > 0) {
            $(that.options[field], element).addClass('a-error');
            $(that.options[field], element).prev().addClass('a-error');
            $(that.options[field], element).after('<span class="a-check-field invalid">' + message + '</span>');
          }
        } else {
          // Send the token to your server
          that.stripeTokenHandler(result.token, 'card');
        }
      });
    }, // createToken

    stripeTokenHandler: function(token, type) {
      var that = this;
      var supportform = $(this.options.donate_form_selector);
      var ajax_url = '';
      var tokenFieldName = 'stripeToken';
      var tokenField = 'input[name="' + tokenFieldName + '"]';
      if (typeof $(supportform).data('action') !== 'undefined') {
        ajax_url = $(supportform).data('action');
      } else {
        ajax_url = window.location.pathname;
      }
      // Insert the token ID into the form so it gets submitted to the server
      if ( type === 'card' ) {
        if (token.card.brand.length > 0 && token.card.brand === 'American Express') {
          type = 'amex';
        }
        if ($(tokenField).length > 0) {
          $(tokenField).val(token.id);
        } else {
          supportform.append($('<input type=\"hidden\" name="' + tokenFieldName + '">').val(token.id));
        }
      }

      $('input[name="stripe_payment_type"]').val(type);

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
          // do not submit. there is an error.
          that.buttonStatus(that.options, $(that.options.donate_form_selector).find('button'), false);
          // add some error messages and styles
          $.each(response.errors, function( index, error ) {
            var field = error.field + '_field_selector';
            var message = '';
            var stripeErrorSelector = '';
            if (typeof error.message === 'string') {
              message = error.message;
            } else {
              message = error.message[0];
            }
            if ($(that.options[field]).length > 0) {
              $(that.options[field]).addClass('a-error');
              $(that.options[field]).prev().addClass('a-error');
              $(that.options[field]).after('<span class="a-check-field invalid">' + message + '</span>');
            }

            if (typeof error !== 'undefined') {
              that.buttonStatus(that.options, $(that.options.donate_form_selector).find('button'), false, 'card');
              if (error.code == 'invalid_number' || error.code == 'incorrect_number' || error.code == 'card_declined' || error.code == 'processing_error') {
                // error handling
                stripeErrorSelector = $(that.options.cc_num_selector);
              }

              if (error.code == 'invalid_expiry_month' || error.code == 'invalid_expiry_year' || error.code == 'expired_card') {
                // error handling
                stripeErrorSelector = $(that.options.cc_exp_selector);
              }

              if (error.code == 'invalid_cvc' || error.code == 'incorrect_cvc') {
                // error handling
                stripeErrorSelector = $(that.options.cc_cvv_selector);
              }

              if (stripeErrorSelector !== '') {
                that.stripeErrorDisplay(response.errors, stripeErrorSelector, that.element, that.options );
              }

              if (error.field == 'recaptcha') {
                $(that.options.pay_button_selector).before('<p class="a-form-caption a-recaptcha-error">' + message + '</p>')
              }

              if (error.type == 'invalid_request_error') {
                $(that.options.pay_button_selector).before('<p class="error error-invalid-request">' + error.message + '</p>')
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
          supportform.get(0).submit(); // continue submitting the form if the ajax was successful
        }
      })
      .error(function(response) {
        that.buttonStatus(that.options, $(that.options.donate_form_selector).find('button'), false);
      });

    },

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
            $('.confirm-instructions').text($('.confirm-instructions').attr('data-known-user'));
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