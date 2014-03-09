// Hacked on @ The IC (http://interaction.net.au)
//  >> Adapted by Greg Turner to work on elements, not their children, and to take into account borders and padding
//  >> Added to by Mark Finger to include `equalHeightsByHClass` which groups elements together by a `h-class` attribute, then equalises the heights of each group of elements.

/*--------------------------------------------------------------------
 * JQuery Plugin: "EqualHeights"
 * by:	Scott Jehl, Todd Parker, Maggie Costello Wachs (http://www.filamentgroup.com)
 *
 * Copyright (c) 2007 Filament Group
 * Licensed under GPL (http://www.opensource.org/licenses/gpl-license.php)
 *
 * Description: Compares the heights or widths of the top-level children of a provided element
 		and sets their min-height to the tallest height (or width to widest width). Sets in em units
 		by default if pxToEm() method is available.
 * Dependencies: jQuery library, pxToEm method	(article: http://www.filamentgroup.com/lab/retaining_scalable_interfaces_with_pixel_to_em_conversion/)
 * Usage Example: $(element).equalHeights();
 * 		Optional: to set min-height in px, pass a true argument: $(element).equalHeights(true);
 * Version: 2.0, 07.24.2008
 * Changelog:
 *  	08.02.2007 initial Version 1.0
 *  	07.24.2008 v 2.0 - added support for widths
--------------------------------------------------------------------*/

$.fn.equalHeights = function(px) {
	var current_tallest = 0;
	var self = $(this);

	//clear heights
	self.each(function() {
		var element = $(this);
		element.css({'min-height': ''});
	});

	//measure heights
	self.each(function() {
		var element = $(this);
		var elh = element.outerHeight(false);
		if (elh > current_tallest)
			current_tallest = elh;
		if (!px && Number.prototype.pxToEm)
			current_tallest = current_tallest.pxToEm(); //use ems unless px is specified
	});

	//set heights
	self.each(function() {
		var element = $(this);
		var padding_and_border = element.outerHeight() - element.height();
		element.css({'min-height': current_tallest - padding_and_border});
	});

	return this;
};

$.fn.equalHeightsByHClass = function(px) {
	// Group elements together by the value of their `h-class` attribute,
	// then perform equalHeights on them. Any elements without the
	// attribute are grouped together
	var height_classes = {};
	$(this).each(function() {
		var element = $(this);
		var class_name = element.attr('h-class');
		// Instantiate, or push to, an array of elements
		if (height_classes[class_name] == undefined)
			height_classes[class_name] = [element];
		else
			height_classes[class_name].push(element);
	});
	for (var class_name in height_classes)
		$(height_classes[class_name]).equalHeights(px);
	return this;
};

// just in case you need it...
$.fn.equalWidths = function(px) {
	var current_widest = 0;
	var self = $(this);

	//clear widths
	self.each(function() {
		var element = $(this);
		element.css({'min-width': ''});
	});

	//measure widths
	self.each(function() {
		var element = $(this);
		var elh = element.outerWidth(false);
		if (elh > current_widest)
			current_widest = elh;
		if (!px && Number.prototype.pxToEm)
			current_widest = current_widest.pxToEm(); //use ems unless px is specified
	});

	//set widths
	self.each(function() {
		var element = $(this);
		var padding_and_border = element.outerWidth() - element.width();
		element.css({'min-width': current_widest - padding_and_border});
	});

	return this;
};

