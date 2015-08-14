(function ($, window, document, undefined) {

	'use strict';

	$(function () {

		$('[data-behavior="smooth-scroll"]').click(function(e){
			e.preventDefault();
			var target = $($(this).attr('href'));
			var offset = target.offset();
			$('html, body').animate({
				scrollTop: offset.top
			}, 500);
		});

		setTimeout(function () {
			$($('.bi-barrel').get().reverse()).each(function(i) {
				var self = $(this);
				setTimeout(function () {
					$(self).addClass('is-dropped');
				}, i*50);
			});
		}, 500);

	});

})(jQuery, window, document);
