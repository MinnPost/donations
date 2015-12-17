/**
MinnPost Givalike Pages - 0.1.0
http://www.minnpost.com
Copyright (c) 2015 Jonathan Stegall
License: MIT
*/
(function($,window,document,undefined){var defaults={bounds:true,country:null,map:false,details:false,detailsAttribute:"name",autoselect:true,location:false,mapOptions:{zoom:14,scrollwheel:false,mapTypeId:"roadmap"},markerOptions:{draggable:false},maxZoom:16,types:["geocode"],blur:false,geocodeAfterResult:false,restoreValueAfterBlur:false};var componentTypes=("street_address route intersection political "+"country administrative_area_level_1 administrative_area_level_2 "+"administrative_area_level_3 colloquial_area locality sublocality "+"neighborhood premise subpremise postal_code natural_feature airport "+"park point_of_interest post_box street_number floor room "+"lat lng viewport location "+"formatted_address location_type bounds").split(" ");var placesDetails=("id place_id url website vicinity reference name rating "+"international_phone_number icon formatted_phone_number").split(" ");function GeoComplete(input,options){this.options=$.extend(true,{},defaults,options);this.input=input;this.$input=$(input);this._defaults=defaults;this._name="geocomplete";this.init()}$.extend(GeoComplete.prototype,{init:function(){this.initMap();this.initMarker();this.initGeocoder();this.initDetails();this.initLocation()},initMap:function(){if(!this.options.map){return}if(typeof this.options.map.setCenter=="function"){this.map=this.options.map;return}this.map=new google.maps.Map($(this.options.map)[0],this.options.mapOptions);google.maps.event.addListener(this.map,"click",$.proxy(this.mapClicked,this));google.maps.event.addListener(this.map,"zoom_changed",$.proxy(this.mapZoomed,this))},initMarker:function(){if(!this.map){return}var options=$.extend(this.options.markerOptions,{map:this.map});if(options.disabled){return}this.marker=new google.maps.Marker(options);google.maps.event.addListener(this.marker,"dragend",$.proxy(this.markerDragged,this))},initGeocoder:function(){var selected=false;var options={types:this.options.types,bounds:this.options.bounds===true?null:this.options.bounds,componentRestrictions:this.options.componentRestrictions};if(this.options.country){options.componentRestrictions={country:this.options.country}}this.autocomplete=new google.maps.places.Autocomplete(this.input,options);this.geocoder=new google.maps.Geocoder;if(this.map&&this.options.bounds===true){this.autocomplete.bindTo("bounds",this.map)}google.maps.event.addListener(this.autocomplete,"place_changed",$.proxy(this.placeChanged,this));this.$input.on("keypress."+this._name,function(event){if(event.keyCode===13){return false}});if(this.options.geocodeAfterResult===true){this.$input.bind("keypress."+this._name,$.proxy(function(){if(event.keyCode!=9&&this.selected===true){this.selected=false}},this))}this.$input.bind("geocode."+this._name,$.proxy(function(){this.find()},this));this.$input.bind("geocode:result."+this._name,$.proxy(function(){this.lastInputVal=this.$input.val()},this));if(this.options.blur===true){this.$input.on("blur."+this._name,$.proxy(function(){if(this.options.geocodeAfterResult===true&&this.selected===true){return}if(this.options.restoreValueAfterBlur===true&&this.selected===true){setTimeout($.proxy(this.restoreLastValue,this),0)}else{this.find()}},this))}},initDetails:function(){if(!this.options.details){return}var $details=$(this.options.details),attribute=this.options.detailsAttribute,details={};function setDetail(value){details[value]=$details.find("["+attribute+"="+value+"]")}$.each(componentTypes,function(index,key){setDetail(key);setDetail(key+"_short")});$.each(placesDetails,function(index,key){setDetail(key)});this.$details=$details;this.details=details},initLocation:function(){var location=this.options.location,latLng;if(!location){return}if(typeof location=="string"){this.find(location);return}if(location instanceof Array){latLng=new google.maps.LatLng(location[0],location[1])}if(location instanceof google.maps.LatLng){latLng=location}if(latLng){if(this.map){this.map.setCenter(latLng)}if(this.marker){this.marker.setPosition(latLng)}}},destroy:function(){if(this.map){google.maps.event.clearInstanceListeners(this.map);google.maps.event.clearInstanceListeners(this.marker)}this.autocomplete.unbindAll();google.maps.event.clearInstanceListeners(this.autocomplete);google.maps.event.clearInstanceListeners(this.input);this.$input.removeData();this.$input.off(this._name);this.$input.unbind("."+this._name)},find:function(address){this.geocode({address:address||this.$input.val()})},geocode:function(request){if(this.options.bounds&&!request.bounds){if(this.options.bounds===true){request.bounds=this.map&&this.map.getBounds()}else{request.bounds=this.options.bounds}}if(this.options.country){request.region=this.options.country}this.geocoder.geocode(request,$.proxy(this.handleGeocode,this))},selectFirstResult:function(){var selected="";if($(".pac-item-selected")[0]){selected="-selected"}var $span1=$(".pac-container:last .pac-item"+selected+":first span:nth-child(2)").text();var $span2=$(".pac-container:last .pac-item"+selected+":first span:nth-child(3)").text();var firstResult=$span1;if($span2){firstResult+=" - "+$span2}this.$input.val(firstResult);return firstResult},restoreLastValue:function(){if(this.lastInputVal){this.$input.val(this.lastInputVal)}},handleGeocode:function(results,status){if(status===google.maps.GeocoderStatus.OK){var result=results[0];this.$input.val(result.formatted_address);this.update(result);if(results.length>1){this.trigger("geocode:multiple",results)}}else{this.trigger("geocode:error",status)}},trigger:function(event,argument){this.$input.trigger(event,[argument])},center:function(geometry){if(geometry.viewport){this.map.fitBounds(geometry.viewport);if(this.map.getZoom()>this.options.maxZoom){this.map.setZoom(this.options.maxZoom)}}else{this.map.setZoom(this.options.maxZoom);this.map.setCenter(geometry.location)}if(this.marker){this.marker.setPosition(geometry.location);this.marker.setAnimation(this.options.markerOptions.animation)}},update:function(result){if(this.map){this.center(result.geometry)}if(this.$details){this.fillDetails(result)}this.trigger("geocode:result",result)},fillDetails:function(result){var data={},geometry=result.geometry,viewport=geometry.viewport,bounds=geometry.bounds;$.each(result.address_components,function(index,object){var name=object.types[0];$.each(object.types,function(index,name){data[name]=object.long_name;data[name+"_short"]=object.short_name})});$.each(placesDetails,function(index,key){data[key]=result[key]});$.extend(data,{formatted_address:result.formatted_address,location_type:geometry.location_type||"PLACES",viewport:viewport,bounds:bounds,location:geometry.location,lat:geometry.location.lat(),lng:geometry.location.lng()});$.each(this.details,$.proxy(function(key,$detail){var value=data[key];this.setDetail($detail,value)},this));this.data=data},setDetail:function($element,value){if(value===undefined){value=""}else if(typeof value.toUrlValue=="function"){value=value.toUrlValue()}if($element.is(":input")){$element.val(value)}else{$element.text(value)}},markerDragged:function(event){this.trigger("geocode:dragged",event.latLng)},mapClicked:function(event){this.trigger("geocode:click",event.latLng)},mapZoomed:function(event){this.trigger("geocode:zoom",this.map.getZoom())},resetMarker:function(){this.marker.setPosition(this.data.location);this.setDetail(this.details.lat,this.data.location.lat());this.setDetail(this.details.lng,this.data.location.lng())},placeChanged:function(){var place=this.autocomplete.getPlace();this.selected=true;if(!place.geometry){if(this.options.autoselect){var autoSelection=this.selectFirstResult();this.find(autoSelection)}}else{this.update(place)}}});$.fn.geocomplete=function(options){var attribute="plugin_geocomplete";if(typeof options=="string"){var instance=$(this).data(attribute)||$(this).geocomplete().data(attribute),prop=instance[options];if(typeof prop=="function"){prop.apply(instance,Array.prototype.slice.call(arguments,1));return $(this)}else{if(arguments.length==2){prop=arguments[1]}return prop}}else{return this.each(function(){var instance=$.data(this,attribute);if(!instance){instance=new GeoComplete(this,options);$.data(this,attribute,instance)}})}}})(jQuery,window,document);;// Generated by CoffeeScript 1.7.1
(function() {
  var cardFromNumber, cardFromType, cards, defaultFormat, formatBackCardNumber, formatBackExpiry, formatCardNumber, formatExpiry, formatForwardExpiry, formatForwardSlashAndSpace, hasTextSelected, luhnCheck, reFormatCVC, reFormatCardNumber, reFormatExpiry, reFormatNumeric, restrictCVC, restrictCardNumber, restrictExpiry, restrictNumeric, setCardType,
    __slice = [].slice,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  $.payment = {};

  $.payment.fn = {};

  $.fn.payment = function() {
    var args, method;
    method = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    return $.payment.fn[method].apply(this, args);
  };

  defaultFormat = /(\d{1,4})/g;

  $.payment.cards = cards = [
    {
      type: 'visaelectron',
      pattern: /^4(026|17500|405|508|844|91[37])/,
      format: defaultFormat,
      length: [16],
      cvcLength: [3],
      luhn: true
    }, {
      type: 'maestro',
      pattern: /^(5(018|0[23]|[68])|6(39|7))/,
      format: defaultFormat,
      length: [12, 13, 14, 15, 16, 17, 18, 19],
      cvcLength: [3],
      luhn: true
    }, {
      type: 'forbrugsforeningen',
      pattern: /^600/,
      format: defaultFormat,
      length: [16],
      cvcLength: [3],
      luhn: true
    }, {
      type: 'dankort',
      pattern: /^5019/,
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
      type: 'mastercard',
      pattern: /^5[0-5]/,
      format: defaultFormat,
      length: [16],
      cvcLength: [3],
      luhn: true
    }, {
      type: 'amex',
      pattern: /^3[47]/,
      format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
      length: [15],
      cvcLength: [3, 4],
      luhn: true
    }, {
      type: 'dinersclub',
      pattern: /^3[0689]/,
      format: /(\d{1,4})(\d{1,6})?(\d{1,4})?/,
      length: [14],
      cvcLength: [3],
      luhn: true
    }, {
      type: 'discover',
      pattern: /^6([045]|22)/,
      format: defaultFormat,
      length: [16],
      cvcLength: [3],
      luhn: true
    }, {
      type: 'unionpay',
      pattern: /^(62|88)/,
      format: defaultFormat,
      length: [16, 17, 18, 19],
      cvcLength: [3],
      luhn: false
    }, {
      type: 'jcb',
      pattern: /^35/,
      format: defaultFormat,
      length: [16],
      cvcLength: [3],
      luhn: true
    }
  ];

  cardFromNumber = function(num) {
    var card, _i, _len;
    num = (num + '').replace(/\D/g, '');
    for (_i = 0, _len = cards.length; _i < _len; _i++) {
      card = cards[_i];
      if (card.pattern.test(num)) {
        return card;
      }
    }
  };

  cardFromType = function(type) {
    var card, _i, _len;
    for (_i = 0, _len = cards.length; _i < _len; _i++) {
      card = cards[_i];
      if (card.type === type) {
        return card;
      }
    }
  };

  luhnCheck = function(num) {
    var digit, digits, odd, sum, _i, _len;
    odd = true;
    sum = 0;
    digits = (num + '').split('').reverse();
    for (_i = 0, _len = digits.length; _i < _len; _i++) {
      digit = digits[_i];
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

  hasTextSelected = function($target) {
    var _ref;
    if (($target.prop('selectionStart') != null) && $target.prop('selectionStart') !== $target.prop('selectionEnd')) {
      return true;
    }
    if ((typeof document !== "undefined" && document !== null ? (_ref = document.selection) != null ? _ref.createRange : void 0 : void 0) != null) {
      if (document.selection.createRange().text) {
        return true;
      }
    }
    return false;
  };

  reFormatNumeric = function(e) {
    return setTimeout(function() {
      var $target, value;
      $target = $(e.currentTarget);
      value = $target.val();
      value = value.replace(/\D/g, '');
      return $target.val(value);
    });
  };

  reFormatCardNumber = function(e) {
    return setTimeout(function() {
      var $target, value;
      $target = $(e.currentTarget);
      value = $target.val();
      value = $.payment.formatCardNumber(value);
      return $target.val(value);
    });
  };

  formatCardNumber = function(e) {
    var $target, card, digit, length, re, upperLength, value;
    digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) {
      return;
    }
    $target = $(e.currentTarget);
    value = $target.val();
    card = cardFromNumber(value + digit);
    length = (value.replace(/\D/g, '') + digit).length;
    upperLength = 16;
    if (card) {
      upperLength = card.length[card.length.length - 1];
    }
    if (length >= upperLength) {
      return;
    }
    if (($target.prop('selectionStart') != null) && $target.prop('selectionStart') !== value.length) {
      return;
    }
    if (card && card.type === 'amex') {
      re = /^(\d{4}|\d{4}\s\d{6})$/;
    } else {
      re = /(?:^|\s)(\d{4})$/;
    }
    if (re.test(value)) {
      e.preventDefault();
      return setTimeout(function() {
        return $target.val(value + ' ' + digit);
      });
    } else if (re.test(value + digit)) {
      e.preventDefault();
      return setTimeout(function() {
        return $target.val(value + digit + ' ');
      });
    }
  };

  formatBackCardNumber = function(e) {
    var $target, value;
    $target = $(e.currentTarget);
    value = $target.val();
    if (e.which !== 8) {
      return;
    }
    if (($target.prop('selectionStart') != null) && $target.prop('selectionStart') !== value.length) {
      return;
    }
    if (/\d\s$/.test(value)) {
      e.preventDefault();
      return setTimeout(function() {
        return $target.val(value.replace(/\d\s$/, ''));
      });
    } else if (/\s\d?$/.test(value)) {
      e.preventDefault();
      return setTimeout(function() {
        return $target.val(value.replace(/\d$/, ''));
      });
    }
  };

  reFormatExpiry = function(e) {
    return setTimeout(function() {
      var $target, value;
      $target = $(e.currentTarget);
      value = $target.val();
      value = $.payment.formatExpiry(value);
      return $target.val(value);
    });
  };

  formatExpiry = function(e) {
    var $target, digit, val;
    digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) {
      return;
    }
    $target = $(e.currentTarget);
    val = $target.val() + digit;
    if (/^\d$/.test(val) && (val !== '0' && val !== '1')) {
      e.preventDefault();
      return setTimeout(function() {
        return $target.val("0" + val + " / ");
      });
    } else if (/^\d\d$/.test(val)) {
      e.preventDefault();
      return setTimeout(function() {
        return $target.val("" + val + " / ");
      });
    }
  };

  formatForwardExpiry = function(e) {
    var $target, digit, val;
    digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) {
      return;
    }
    $target = $(e.currentTarget);
    val = $target.val();
    if (/^\d\d$/.test(val)) {
      return $target.val("" + val + " / ");
    }
  };

  formatForwardSlashAndSpace = function(e) {
    var $target, val, which;
    which = String.fromCharCode(e.which);
    if (!(which === '/' || which === ' ')) {
      return;
    }
    $target = $(e.currentTarget);
    val = $target.val();
    if (/^\d$/.test(val) && val !== '0') {
      return $target.val("0" + val + " / ");
    }
  };

  formatBackExpiry = function(e) {
    var $target, value;
    $target = $(e.currentTarget);
    value = $target.val();
    if (e.which !== 8) {
      return;
    }
    if (($target.prop('selectionStart') != null) && $target.prop('selectionStart') !== value.length) {
      return;
    }
    if (/\d\s\/\s$/.test(value)) {
      e.preventDefault();
      return setTimeout(function() {
        return $target.val(value.replace(/\d\s\/\s$/, ''));
      });
    }
  };

  reFormatCVC = function(e) {
    return setTimeout(function() {
      var $target, value;
      $target = $(e.currentTarget);
      value = $target.val();
      value = value.replace(/\D/g, '').slice(0, 4);
      return $target.val(value);
    });
  };

  restrictNumeric = function(e) {
    var input;
    if (e.metaKey || e.ctrlKey) {
      return true;
    }
    if (e.which === 32) {
      return false;
    }
    if (e.which === 0) {
      return true;
    }
    if (e.which < 33) {
      return true;
    }
    input = String.fromCharCode(e.which);
    return !!/[\d\s]/.test(input);
  };

  restrictCardNumber = function(e) {
    var $target, card, digit, value;
    $target = $(e.currentTarget);
    digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) {
      return;
    }
    if (hasTextSelected($target)) {
      return;
    }
    value = ($target.val() + digit).replace(/\D/g, '');
    card = cardFromNumber(value);
    if (card) {
      return value.length <= card.length[card.length.length - 1];
    } else {
      return value.length <= 16;
    }
  };

  restrictExpiry = function(e) {
    var $target, digit, value;
    $target = $(e.currentTarget);
    digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) {
      return;
    }
    if (hasTextSelected($target)) {
      return;
    }
    value = $target.val() + digit;
    value = value.replace(/\D/g, '');
    if (value.length > 6) {
      return false;
    }
  };

  restrictCVC = function(e) {
    var $target, digit, val;
    $target = $(e.currentTarget);
    digit = String.fromCharCode(e.which);
    if (!/^\d+$/.test(digit)) {
      return;
    }
    if (hasTextSelected($target)) {
      return;
    }
    val = $target.val() + digit;
    return val.length <= 4;
  };

  setCardType = function(e) {
    var $target, allTypes, card, cardType, val;
    $target = $(e.currentTarget);
    val = $target.val();
    cardType = $.payment.cardType(val) || 'unknown';
    if (!$target.hasClass(cardType)) {
      allTypes = (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = cards.length; _i < _len; _i++) {
          card = cards[_i];
          _results.push(card.type);
        }
        return _results;
      })();
      $target.removeClass('unknown');
      $target.removeClass(allTypes.join(' '));
      $target.addClass(cardType);
      $target.toggleClass('identified', cardType !== 'unknown');
      return $target.trigger('payment.cardType', cardType);
    }
  };

  $.payment.fn.formatCardCVC = function() {
    this.on('keypress', restrictNumeric);
    this.on('keypress', restrictCVC);
    this.on('paste', reFormatCVC);
    this.on('change', reFormatCVC);
    this.on('input', reFormatCVC);
    return this;
  };

  $.payment.fn.formatCardExpiry = function() {
    this.on('keypress', restrictNumeric);
    this.on('keypress', restrictExpiry);
    this.on('keypress', formatExpiry);
    this.on('keypress', formatForwardSlashAndSpace);
    this.on('keypress', formatForwardExpiry);
    this.on('keydown', formatBackExpiry);
    this.on('change', reFormatExpiry);
    this.on('input', reFormatExpiry);
    return this;
  };

  $.payment.fn.formatCardNumber = function() {
    this.on('keypress', restrictNumeric);
    this.on('keypress', restrictCardNumber);
    this.on('keypress', formatCardNumber);
    this.on('keydown', formatBackCardNumber);
    this.on('keyup', setCardType);
    this.on('paste', reFormatCardNumber);
    this.on('change', reFormatCardNumber);
    this.on('input', reFormatCardNumber);
    this.on('input', setCardType);
    return this;
  };

  $.payment.fn.restrictNumeric = function() {
    this.on('keypress', restrictNumeric);
    this.on('paste', reFormatNumeric);
    this.on('change', reFormatNumeric);
    this.on('input', reFormatNumeric);
    return this;
  };

  $.payment.fn.cardExpiryVal = function() {
    return $.payment.cardExpiryVal($(this).val());
  };

  $.payment.cardExpiryVal = function(value) {
    var month, prefix, year, _ref;
    value = value.replace(/\s/g, '');
    _ref = value.split('/', 2), month = _ref[0], year = _ref[1];
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
  };

  $.payment.validateCardNumber = function(num) {
    var card, _ref;
    num = (num + '').replace(/\s+|-/g, '');
    if (!/^\d+$/.test(num)) {
      return false;
    }
    card = cardFromNumber(num);
    if (!card) {
      return false;
    }
    return (_ref = num.length, __indexOf.call(card.length, _ref) >= 0) && (card.luhn === false || luhnCheck(num));
  };

  $.payment.validateCardExpiry = function(month, year) {
    var currentTime, expiry, _ref;
    if (typeof month === 'object' && 'month' in month) {
      _ref = month, month = _ref.month, year = _ref.year;
    }
    if (!(month && year)) {
      return false;
    }
    month = $.trim(month);
    year = $.trim(year);
    if (!/^\d+$/.test(month)) {
      return false;
    }
    if (!/^\d+$/.test(year)) {
      return false;
    }
    if (!((1 <= month && month <= 12))) {
      return false;
    }
    if (year.length === 2) {
      if (year < 70) {
        year = "20" + year;
      } else {
        year = "19" + year;
      }
    }
    if (year.length !== 4) {
      return false;
    }
    expiry = new Date(year, month);
    currentTime = new Date;
    expiry.setMonth(expiry.getMonth() - 1);
    expiry.setMonth(expiry.getMonth() + 1, 1);
    return expiry > currentTime;
  };

  $.payment.validateCardCVC = function(cvc, type) {
    var card, _ref;
    cvc = $.trim(cvc);
    if (!/^\d+$/.test(cvc)) {
      return false;
    }
    card = cardFromType(type);
    if (card != null) {
      return _ref = cvc.length, __indexOf.call(card.cvcLength, _ref) >= 0;
    } else {
      return cvc.length >= 3 && cvc.length <= 4;
    }
  };

  $.payment.cardType = function(num) {
    var _ref;
    if (!num) {
      return null;
    }
    return ((_ref = cardFromNumber(num)) != null ? _ref.type : void 0) || null;
  };

  $.payment.formatCardNumber = function(num) {
    var card, groups, upperLength, _ref;
    num = num.replace(/\D/g, '');
    card = cardFromNumber(num);
    if (!card) {
      return num;
    }
    upperLength = card.length[card.length.length - 1];
    num = num.slice(0, upperLength);
    if (card.format.global) {
      return (_ref = num.match(card.format)) != null ? _ref.join(' ') : void 0;
    } else {
      groups = card.format.exec(num);
      if (groups == null) {
        return;
      }
      groups.shift();
      groups = $.grep(groups, function(n) {
        return n;
      });
      return groups.join(' ');
    }
  };

  $.payment.formatExpiry = function(expiry) {
    var mon, parts, sep, year;
    parts = expiry.match(/^\D*(\d{1,2})(\D+)?(\d{1,4})?/);
    if (!parts) {
      return '';
    }
    mon = parts[1] || '';
    sep = parts[2] || '';
    year = parts[3] || '';
    if (year.length > 0) {
      sep = ' / ';
    } else if (sep === ' /') {
      mon = mon.substring(0, 1);
      sep = '';
    } else if (mon.length === 2 || sep.length > 0) {
      sep = ' / ';
    } else if (mon.length === 1 && (mon !== '0' && mon !== '1')) {
      mon = "0" + mon;
      sep = ' / ';
    }
    return mon + sep + year;
  };

}).call(this);
;// main.js
$(document).ready(function() {
	// call plugin and pass options if need be
	$('.support--forms').minnpost_givalike({
		'minnpost_root' : 'http://minnpost.dev',
		'debug' : true
	});
});;// the semi-colon before function invocation is a safety net against concatenated
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