// Dependencies
var navigation = Alloy.Globals.navigation;
var mainWindow = navigation.getMainWindow();
var menu = navigation.getMenuDriver();

// Properties
$.prop = {};

$.prop.backButton = false;
$.prop.viewMode = 'nav';
$.prop.title = '';

// General getter/setter
var get = exports.get = function(property) {
	if ($.prop.hasOwnProperty(property)) {
		return $.prop[property];
	}
	else {
		return undefined;
	}
};
var set = exports.set = function(property, value) {
	$.prop[property] = value;
};

// Internal helper functions
$.merge = function(mergeInto, mergeFrom) {
	for (var prop in mergeFrom) {
		mergeInto[prop] = mergeFrom[prop];
	}
	return mergeInto;
};
$.mergeMissing = function(mergeInto, mergeFrom) {
	for (var prop in mergeFrom) {
		if ( ! mergeInto.hasOwnProperty(prop)) {
			mergeInto[prop] = mergeFrom[prop];
		}
	}
	return mergeInto;
}

// Set properties
var args = arguments[0] || {};
$.prop = $.merge($.prop, args);

// Init
exports.init = function(options) {
	// Set options
	if ( ! options) {
		options = {};
	}
	options = $.mergeMissing(options, $.prop);
	
	// Bind navigation controls
	$.buttonMenu.addEventListener("click", menu.toggle);
	$.buttonBack.addEventListener("click", navigation.back);
	$.buttonBack.addEventListener("touchstart", function() {$.buttonBackWrap.backgroundColor = "#1b2026"});
	$.buttonBack.addEventListener("touchend", function() {$.buttonBackWrap.backgroundColor = "#2e3641"});
	$.buttonBack.addEventListener("touchcancel", function() {$.buttonBackWrap.backgroundColor = "#2e3641"});
	
	$.title.text = options.title;
		
	if (options.viewMode == 'nav') {
		exports.show();

		if ( ! options.topLevel && ! $.backButton) {
			$.buttonMenu.visible = false;
			$.buttonBackWrap.visible = true;
			$.buttonWrap.width = $.buttonBackWrap.width;
			$.backButton = true;
		}
		else {
			if ($.backButton) {
				$.buttonMenu.visible = true;
				$.buttonBackWrap.visible = false;
				$.buttonWrap.width = $.buttonMenu.width + $.buttonMenu.left + $.buttonMenu.right;
				$.backButton = false;
			}
		}
		
		$.title.left = $.buttonWrap.width + 15;
	}
	else {
		exports.hide();
	}

	// navigation.addOrientationChangeAction(function() {
		// if ($.viewMode == 'nav') {
			// exports.show();
		// }
		// else {
			// exports.hide();
		// }
	// });
	Ti.API.info("Controller initialized");
};

exports.setTitle = function(title) {
	$.title.text = title;
};

exports.getViewMode = function() {
	return $.prop.viewMode;
};

exports.show = function() {
	Ti.API.info("Showing the navigation controls");
	$.navBar.visible = true;
	$.navBar.height = 50;
};

exports.hide = function() {
	Ti.API.info("Hiding the navigation controls");
	$.navBar.visible = false;
	$.navBar.height = 0;
};

exports.addEventListener = function(eventName, action) {
	$.navBar.addEventListener(eventName, action);
};
	
exports.removeEventListener = function(eventName, action) {
	$.navBar.removeEventListener(eventName, action);
};
	
exports.fireEvent = function(eventName) {
	$.navBar.fireEvent(eventName);
};
