/* Keycher | parallax.js */

//------------------
// Parallax effect;
//
// Author: Keycher;
//
// version: 0.13;
//------------------

(function ($) {
	'use strict';
	$.fn.KeyParallax = function (setting) {
		
	$.each(this, function () {
		
		var options = $.extend({
				speed	:	0.5,
				side	:	'bottom-top',
				animate	:	'default',
				animateClass	:	'pulse',
				animateCycle	:	'no'
			}, setting),


		//Get start var
			$this = $(this),
			$window = $(window),
			documentHeight = $(document).height(),
			windowHeight = $window.height(),
			scroll = $window.scrollTop(),

		//Conditions
			symbol = (options.side === 'bottom-top') ? 1 : -1,
			classAnimate = (options.animateClass === 'none') ? '' : options.animateClass + ' animated',
			cycleAnimate = (options.animateCycle === 'no') ? 0 : 1,

		//Element
			elemTopAbsolute = parseInt($this.css('top')),
			elemOffset = $this.offset().top,
			elemHeight = $this.height(),
			elemOffsetPos = windowHeight - (elemOffset + elemHeight),
			elemOffsetWindow = windowHeight - elemHeight,
			elemOffsetDocument = elemOffsetWindow / 2 - elemOffsetPos,
			elemStartPos = elemTopAbsolute + symbol * elemOffsetDocument * options.speed,
			elemCenterWindow = elemOffsetDocument - scroll,
			elemChangePos = elemStartPos - symbol * scroll * options.speed,

		//Animation
			animOpacity = 0,

		//Functions
			functions = {
				animate : {
					default : function () {
						if (scroll - elemChangePos >= elemOffset + elemHeight || scroll - elemChangePos + windowHeight <= elemOffset) {
							if (cycleAnimate === 1) {
								$this.removeClass(classAnimate);
							}
						} else {
							$this.addClass(classAnimate);
						}
					},
					stepFadeIn : function () {
						animOpacity = (100 - Math.abs(elemCenterWindow * 100 / (windowHeight + Math.abs(elemChangePos)))) / 100;
						if (elemCenterWindow >= 0) {
							$this.css('opacity', animOpacity);
						}
						
					},
					stepFadeOut : function () {
						animOpacity = (100 - Math.abs(elemCenterWindow * 100 / (windowHeight + Math.abs(elemChangePos)))) / 100;
						if (elemCenterWindow <= 0) {
							$this.css('opacity', animOpacity);
						}
					},
					stepFadeInOut : function () {
						animOpacity = (100 - Math.abs(elemCenterWindow * 100 / (windowHeight + Math.abs(elemChangePos)))) / 100;
						$this.css('opacity', animOpacity);
					}
				},
				scroll : function () {
					$this.css({'top' : elemChangePos + 'px'});
				}
			};


		//Start script
		functions.scroll();
		functions.animate[options.animate]();

		//Scroll
		$window.scroll(function () {

			scroll = $window.scrollTop();
			elemCenterWindow = elemOffsetDocument - scroll;	// if = 0, center;
			elemChangePos = elemStartPos - symbol * scroll * options.speed;

			functions.animate[options.animate]();
			functions.scroll();

		});
	});
	};
})(jQuery);