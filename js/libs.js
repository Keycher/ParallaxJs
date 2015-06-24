/* Keycher | libs.js | Use: jQuery */

$(document).ready(function () {
	'use strict';
	$('.example_block--standart').eq(0).KeyParallax({});
	$('.example_block--standart').eq(1).KeyParallax({
		speed:1.2
	});
	$('.example_block--standart').eq(2).KeyParallax({
		side:'top-bottom'
	});
	$('.example_block--standart').eq(3).KeyParallax({
		side:'top-bottom',
		speed:1.2
	});
	$('.example_block--standart').eq(4).KeyParallax({
		animateClass : 'wobble'
	});
	$('.example_block--standart').eq(5).KeyParallax({
		animateClass : 'wobble',
		animateCycle : 'yes'
	});
	$('.example_block--standart').eq(6).KeyParallax({
		animate : 'stepFadeInOut',
		side:'top-bottom'
	});
	$('.example_block--standart').eq(7).KeyParallax({
		side:'top-bottom',
		speed:0.3,
		animateClass : 'flip',
		animateCycle : 'yes'
	});
});