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
	var pluginName = 'minnpost_givalike',
	defaults = {
		'debug' : false, // this can be set to true on page level options
		'minnpost_root' : 'https://www.minnpost.com',
		'donate_form_selector' : '#donate',
		'confirm_form_selector' : '#confirm',
		'active' : 'panel--review',
		'confirm' : 'panel--confirmation',
		'query' : 'step',
		'percentage' : 0.05,
		'pay_cc_processing_selector' : 'input[name="PaymentControl$cbPayFees"]',
		'level_amount_selector' : '.amount .level-amount',
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
		'atlantic_status' : 'input[name="atlantic_status"]',
		'atlantic_existing' : '#atlantic_existing',
		'atlantic_selector' : '.form-item--atlantic_id',
		'name_selector' : '.form-item--display-name',
		'honor_selector' : '.honor',
		'notify_selector' : '#notify',
		'notify_field_selector' : '.form-item--memory-notify',
		'anonymous_selector' : '#PaymentControl_AdditionalInfoFields_AdditionalInfoCheckbox_3',
		'needs_shipping_selector' : '.swag--shipping',
		'shipping_address_selector' : '.form-item--shipping-address',
		'use_for_shipping_selector' : '#useforshipping',
		'email_field_selector' : '#PaymentControl_txtEmail',
		'password_field_selector' : '#password',
		'firstname_field_selector' : '#PaymentControl_txtFname',
		'lastname_field_selector' : '#PaymentControl_txtLname',
		'city_field_selector' : '#PaymentControl_txtBillCity',
		'state_field_selector' : '#PaymentControl_ddlBillState',
		'zip_field_selector' : '#PaymentControl_txtZip',
		'create_mp_selector' : '#creatempaccount',
		'password_selector' : '.form-item--password',
		'billing_selector' : 'fieldset.billing',
		'shipping_selector' : 'fieldset.shipping',
		'credit_card_fieldset' : '.credit-card-group',
		'cc_num_selector' : '#credit-card-number',
		'cc_exp_selector' : '#card-expiration',
		'cc_cvv_selector' : '#card-cvv',
		'payment_button_selector' : '#submit',
		'confirm_button_selector' : '#finish',
		'newsletter_group_selector' : '[name="newsletters"]',
		'message_group_selector' : '[name="messages"]',
		'reason_field_selector' : '#PaymentControl_AdditionalInfoFields_AdditionalInfoTextbox_1',
		'share_reason_selector' : '#PaymentControl_AdditionalInfoFields_AdditionalInfoLabel_2',
		'confirm_top_selector' : '.support--post-confirm',
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
			this.options.frequency = parseFloat($(this.options.frequency_selector, this.element).data('year-freq'));
			this.options.processing_percent = parseFloat(this.options.percentage);
			this.options.processing_fee = this.options.amount * this.options.processing_percent;
			this.options.new_amount = this.options.amount + this.options.processing_fee;
			this.options.processing_fee = parseFloat(this.options.processing_fee).toFixed(2);
			this.options.upsell_amount = parseFloat($(this.options.upsell_amount_selector, this.element).text());
			this.options.upsold = this.options.amount + this.options.upsell_amount;
			this.options.cardType = null;
			this.options.create_account = false;

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
			if (typeof google !== 'undefined' && google.hasOwnProperty('maps')) {
				// add combined address fields for geocomplete
				$(this.options.billing_selector, this.element).prepend('<div class="form-item form-item--billing-address form-item--geocode"><label>Billing Address<input type="text" autocapitalize="off" autocorrect="off" name="full_address" id="full_address" class="geocomplete" placeholder=""></label><label class="additional-option"><input type="checkbox" name="useforshipping" id="useforshipping" checked="checked"> Use this address for shipping</label></div>');
				$(this.options.shipping_selector, this.element).prepend('<div class="form-item form-item--shipping-address form-item--geocode"><label>Shipping Address<input type="text" autocapitalize="off" autocorrect="off" name="full_shipping_address" id="full_shipping_address" class="geocomplete" placeholder=""></label></div>');
				this.getFullAddress();
			} else {
				$('.form-item--nojs').show();
				$('.form-item--nojs input').each(function() {
					$(this).attr('type', 'text');
				});
				$('.form-item--geocode label:first').hide();
			}

			this.paymentPanels(query_panel); // tabs
			this.creditCardProcessingFees(this.options, reset); // processing fees
			this.options.level = this.checkLevel(this.element, this.options, 'name'); // check what level it is
			this.options.levelnum = this.checkLevel(this.element, this.options, 'num'); // check what level it is as a number
			this.upsell(this.element, this.options, this.options.amount, this.options.frequency); // upsell to next level
			this.honorOrMemory(this.element, this.options); // in honor or in memory of someone
			this.swag(this.element, this.options, false); // manage swag display
			this.donateAnonymously(this.element, this.options); // anonymous
			this.shippingAddress(this.element, this.options); // shipping address
			this.allowMinnpostAccount(this.element, this.options, false); // option for creating minnpost account
			this.creditCardFields(this.element, this.options); // do stuff with the credit card fields

			this.validateAndSubmit(this.element, this.options); // validate and submit the form

			this.confirmMessageSubmit(this.element, this.options); // submit the stuff on the confirmation page

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
			if (ga) {	// is ga object present?
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
				var href = that.attr('href');
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
			if (link === '') {
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

		getFullAddress: function() {
			$('.geocomplete').click(function() {
				$(this).trigger('geocode');
				var attribute = $(this).closest('fieldset').attr('data-geo');
				$(this).geocomplete({
					details: 'form',
					detailsAttribute: attribute
				});
			});
		}, // getFullAddress

		paymentPanels: function(active) {
			var that = this;
			// make some tabs for form
			$('.panel').hide();
			$('#' + active).fadeIn();
			// activate the tabs
			$('.progress--donation li.' + active + ' a').addClass('active');
			$('.progress--donation li a, a.btn.btn--next').click(function(event) {
				event.preventDefault();
				$('.progress--donation li a').removeClass('active');
				var link = $(this).attr('href');
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
			$(this.options.pay_cc_processing_selector).parent().html('<a href="#" class="add-credit-card-processing">Add $<span class="processing-amount"></span></a> to each transaction to cover MinnPost\'s credit card fees?');
			$('.processing-amount').text(options.processing_fee);
			if (reset === true) {
				remove = false;
				full_amount = that.options.amount;
				$('.add-credit-card-processing').text('Add $' + that.options.processing_fee);
			}
			$('.add-credit-card-processing').click(function(event) {
				$('.amount .level-amount').addClass('full-amount');
				if (!remove) {
					remove = true;
					full_amount = that.options.new_amount;
					$('.add-credit-card-processing').text('Remove $' + options.processing_fee);
				} else {
					remove = false;
					full_amount = that.options.amount;
					$('.add-credit-card-processing').text('Add $' + options.processing_fee);
				}
				$('.add-credit-card-processing').toggleClass('remove');
				$(options.full_amount_selector).text(parseFloat(full_amount).toFixed(2));
				event.stopPropagation();
				event.preventDefault();
			});
		}, // creditCardProcessingFees

		donateAnonymously: function(element, options) {
			if ($(options.anonymous_selector, element).is(':checked')) {
				$(options.name_selector + ' label:first', element).hide();
			} else {
				$(options.name_selector + ' label:first', element).show();
			}

			$(options.anonymous_selector, element).change(function() {
				if ($(this).is(':checked')) {
					$(options.name_selector + ' label:first', element).hide();
				} else {
					$(options.name_selector + ' label:first', element).show();
				}
			});
		}, // donateAnonymously

		checkLevel: function(element, options, returnvalue) {
			var level = '';
			var levelnum = 0;
			var levelclass = 'level level--';
			var amount_yearly;
			var frequency = options.frequency;
			var amount = options.amount;

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
			$(options.level_indicator_selector, element).attr('class', levelclass);
			$(options.level_name_selector).text(level.charAt(0).toUpperCase() + level.slice(1));

			var review_level_benefits = this.getQueryStrings($(options.review_benefits_selector, element).attr('href'));
			review_level_benefits = review_level_benefits['level'];
			
			var link = $(options.review_benefits_selector, element).attr('href');
			link = link.replace(review_level_benefits, level);
			$(options.review_benefits_selector).attr('href', link);
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
				var link_class = $(this).attr('class');
				$('fieldset.' + link_class, element).addClass('visible').show();
				return false;
			});
			$(options.honor_selector + ' fieldset a.close', element).click(function() {
				var link_class = $(this).parent().attr('class').substring(0, $(this).parent().attr('class').length - 8);
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
					return $(this).attr('class').slice(-1) <= currentlevel;
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
			show_shipping = !!$(options.needs_shipping_selector + ':checked', element).length;

			$(options.needs_shipping_selector, element).change(function() {
				that.shippingAddress(element, options);
			});

			if ($(options.needs_shipping_selector, element).length > 0 && show_shipping === true ) {
				$(options.use_for_shipping_selector, element).parent().show();
				if ($(options.use_for_shipping_selector, element).is(':checked')) {
					$(options.shipping_address_selector, element).hide();
				} else {
					$(options.shipping_address_selector, element).show();
				}
				$(options.use_for_shipping_selector, element).change(function() {
					that.shippingAddress(element, options);
				});
			} else {
				$(options.shipping_address_selector, element).hide();
				$(options.use_for_shipping_selector, element).parent().hide();
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
			if (typeof $.payment !== 'undefined') {
				$('input[type="num"]').payment('restrictNumeric');
				$(options.credit_card_fieldset + ' input').focusin(function() {
					$(this).parent().addClass('focus');
				}).focusout(function() {
					$(this).parent().removeClass('focus');
				});
				$(options.credit_card_fieldset, element).prepend('<span class="card-image"></span>');

				$(options.cc_num_selector, element).payment('formatCardNumber');
				$(options.cc_exp_selector, element).payment('formatCardExpiry');
				$(options.cc_cvv_selector, element).payment('formatCardCVC');

				$(options.cc_num_selector, element).on('keyup', function() {
					options.cardType = $.payment.cardType($(options.cc_num_selector, element).val());
					if (options.cardType !== null) {
						//$('.cc-brand').text(cardType);						
						$('.card-image').attr('class', 'card-image ' + options.cardType);
					}
				});
			}
		}, // creditCardFields

		validateAndSubmit: function(element, options) {
			var that = this;
			$(options.donate_form_selector).submit(function(event) {
				event.preventDefault();
				//$(this).attr('disabled', true);
				// validate and submit the form
				var valid = true;

				var valid_cc = $.payment.validateCardNumber($(options.cc_num_selector, element).val());
				var valid_exp = $.payment.validateCardExpiry($(options.cc_exp_selector, element).payment('cardExpiryVal'));
				var valid_cvv = $.payment.validateCardCVC($(options.cc_cvv_selector, element).val(), options.cardType);
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

				if (valid === true) {

					// this can activate the thank you tab.
					// though we might just need to redirect the user instead, depending on how we can get the data
					// switch layout somehow
					$('.progress--donation li a, .progress--donation li span').removeClass('active');
					var query = options.confirm;
					$('.progress--donation li.' + query + ' a, .progress--donation li.' + query + ' span').addClass('active');
					that.paymentPanels(query);

					// create minnpost account if specified
					if (options.create_account === true) {
						var user = {
							email: $(options.email_field_selector, element).val(),
							first: $(options.firstname_field_selector, element).val(),
							last: $(options.lastname_field_selector, element).val(),
							password: $(options.password_field_selector, element).val(),
							city: $(options.city_field_selector, element).val(),
							state: $(options.state_field_selector, element).val()
						};
						$.ajax({
							method: 'POST',
							url: options.minnpost_root + '/accounts/create',
							data: user
						}).done(function( data ) {
							if (data.status === 'success' && data.reason === 'new user') {
								// user created - they should receive email
							} else {
								// user not created
							}
						});
					}

				}

			});
			return false;
		}, // validateAndSubmit

		confirmMessageSubmit: function(element, options) {
			var that = this;
			$(options.confirm_form_selector).submit(function(event) {
				event.preventDefault();
				// validate and submit the form
				var valid = true;
				$(options.confirm_top_selector, element).prepend('<ul class="well well--messages"></ul>');
				var newsletter_groups = $(options.newsletter_group_selector + ':checked');
				var message_groups = $(options.message_group_selector + ':checked');

				if (typeof newsletter_groups !== 'undefined' || typeof message_groups !== 'undefined') {
					$('ul.well--messages').append('<li class="mailchimp"></li>');
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
							$('.well--messages').addClass('success');
							$('.well--messages .mailchimp', element).html(result.message);
						} else {
							// user not created - show error message
							$('.well--messages').addClass('error');
							$('.well--messages .mailchimp', element).html(result.message);
						}
					});
				}

				if ($(options.reason_field_selector, element).val() !== '') {
					var share = options.share_reason_selector.val();
					var message = options.reason_field_selector.val();
				}

			});
			return false;
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