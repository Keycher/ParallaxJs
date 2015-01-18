/* OneX studio (onexstudio.com) | parallax.js */

//------------------
// Parallax effect;
//
// Author: Keycher;
//
// version: 0.41;
//------------------

(function ($) {
	'use strict';
	var browser = {
		isIE		:	 false || !!document.documentMode,
		isOpera		:	 !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0,
		isFirefox	:	 typeof InstallTrigger !== 'undefined',
		isChrome	:	 !!window.chrome || navigator.userAgent.indexOf(' Chrome/') >= 0
	},	zIndex = 0;
		
	$.fn.KeyParallax = function (setting) {
		
		zIndex = zIndex + 1;
		
		//console.log(browser.isChrome);
		
		var options = $.extend({
				speed	:	0.5,
				side	:	'bottom-top',
				animateClass	:	'pulse',
				animate	:	'default'
			}, setting),
			
		//Начальные Переменные
			$this = $(this),
			$window = $(window),
			documentHeight = $(document).height(),
		
		// Переменные с условиями
			symbol = (options.side === 'bottom-top') ? 1 : -1,
			
		//Новые переменные
			classAnimate = options.animateClass + ' animated',
		
		//Переменные other
			windowHeight = $window.height(),
			elemOffset = $this.offset().top,
			elemHeight = $this.height(),
			elemOffsetPos = windowHeight - (elemOffset + elemHeight),
			elemOffsetWindow = windowHeight - elemHeight,
			elemOffsetDocument = elemOffsetWindow / 2 - elemOffsetPos,
			elemStartPos = symbol * elemOffsetDocument * options.speed,
			scroll = 0,
			elemCenterWindow = elemOffsetDocument - scroll,
			elemChangePos = elemStartPos - symbol * scroll * options.speed,
		
		// Functions
			functions = {
				animate : {
					default : function () {
						if (scroll - elemChangePos >= elemOffset + elemHeight || scroll - elemChangePos + windowHeight <= elemOffset) {
							$this.removeClass(classAnimate);
						} else {
							$this.addClass(classAnimate);
						}
					},
					stepFadeIn : function () {
						if (scroll - elemChangePos >= elemOffset + elemHeight || scroll - elemChangePos + windowHeight <= elemOffset) {
							alert('work');
						}
					}
					
				},
				scroll : function () {
					$this.css({'top' : elemChangePos + 'px'});
				}
			};
		
		
		//Start
		$this.css('top', elemStartPos + 'px');
		
		if (scroll - elemChangePos <= elemOffset + elemHeight || scroll - elemChangePos + windowHeight >= elemOffset) {
			$this.addClass(classAnimate);
		}
		
		//Scroll
		$window.scroll(function () {
			
			scroll = $window.scrollTop();
			elemCenterWindow = elemOffsetDocument - scroll;	// if = 0, center;
			elemChangePos = elemStartPos - symbol * scroll * options.speed;
			
			functions.animate[options.animate]();
			functions.scroll();
			
		});
	};
})(jQuery);