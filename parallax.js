/* Keycher | parallax.js */

//------------------
// Parallax effect;
//
// Author: Keycher;
//
// version: 0.11;
//------------------

(function ($) {
	'use strict';
	$.fn.KeyParallax = function (setting) {
		
	$.each(this, function () {
		
		var options = $.extend({
				speed	:	0.5,
				side	:	'bottom-top',
				animateClass	:	'pulse',
				animateCycle	:	'no',
				animate	:	'default'
			}, setting),
			
					
		//Начальные Переменные
			$this = $(this),
			$window = $(window),
			documentHeight = $(document).height(),
		
		// Переменные с условиями
			symbol = (options.side === 'bottom-top') ? 1 : -1,
			classAnimate = (options.animateClass === 'none') ? '' : options.animateClass + ' animated',
			cycleAnimate = (options.animateCycle === 'no') ? 0 : 1,
		
		//Переменные other
			windowHeight = $window.height(),
			elemOffset = $this.offset().top,
			elemHeight = $this.height(),
			elemOffsetPos = windowHeight - (elemOffset + elemHeight),
			elemOffsetWindow = windowHeight - elemHeight,
			elemOffsetDocument = elemOffsetWindow / 2 - elemOffsetPos,
			elemStartPos = symbol * elemOffsetDocument * options.speed,
			scroll = $window.scrollTop(),
			elemCenterWindow = elemOffsetDocument - scroll,
			elemChangePos = elemStartPos - symbol * scroll * options.speed,
			
		//Переменные анимаций
			animOpacity = 0,
		
		// Functions
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
		
		
		//Start
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