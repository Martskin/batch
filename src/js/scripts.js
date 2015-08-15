(function ($, window, document, undefined) {

	'use strict';

	$(function () {

		setTimeout(function () {
			$($('.bi-barrel').get().reverse()).each(function(i) {
				var self = $(this);
				setTimeout(function () {
					$(self).addClass('is-dropped');
				}, i*50);
			});
		}, 500);

		$('[data-behavior="smooth-scroll"]').click(function(e){
			e.preventDefault();
			var target = $($(this).attr('href'));
			var offset = target.offset();
			$('html, body').animate({
				scrollTop: offset.top
			}, 500);
		});

		$('[data-behavior="trigger-click"]').click(function(e){
			e.preventDefault();
			var link = $(this).data("target");
			$('[data-object="'+link+'"]')[0].click();
		});

	});

})(jQuery, window, document);
