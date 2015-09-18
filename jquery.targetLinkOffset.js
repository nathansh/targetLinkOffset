/*!
* targetLinkOffset 1.0-beta
*
* Written by Nathan Shubert-Harbison at Domain7 (www.domain7.com).
* 
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
*/

(function ($) {

	var tlo = {

		defaults: {

			settings: {},
			offset: 100,
			buffer: 25,
			linkSelector: "a[href^='#']",
			boundEvent: "click.targetLinkOffset",
			animate: false,
			animationSpeed: 800

		}, // defaults

		goToHash: function(hash, dontPushState) {

			// Only do something if the hash isn't just '#'
			if ( hash !== '#' ) {

			 	// Get the scrollTop to the hash
			 	var element = $(hash),
			 			scrollTarget = Math.floor(element.offset().top - (tlo.settings.offset + tlo.settings.buffer));

			 	// Replace the url, method depending on whether pushState is supported or not
			 	if ( !dontPushState ) {
				 	if ( history.pushState ) {
				 		history.pushState(null, null, hash);
				 	} else {
				 		location.hash = hash;
				 	}					 		
			 	}

			 	// Scroll to element, either with an animation or directly
			 	if ( tlo.settings.animate ) {
			 		$('html, body').animate({
			 			scrollTop: scrollTarget
			 		}, tlo.settings.animationSpeed);
			 	} else {
					$(document, 'body').scrollTop(scrollTarget);
			 	}

			} // hash == #

		}, // goToHash()

		init: function() {

			// Bind efent, default is click
			$(tlo.settings.linkSelector).on(tlo.settings.boundEvent, function(event){

				// Get the target id
				var href = $(this).attr('href');

				// Go to the hash
				if ( href !== '#' ) {
					tlo.goToHash(href);
				 	event.preventDefault();			
				}
			
			}); // on.boundEvent

			// On load see if there's a hash in the url and go to it
			if ( document.location.hash ) {
				tlo.goToHash(document.location.hash, true);
			}

			// Also check hashchange
			$(window).bind('hashchange', function() {
				var hash = "#"+window.location.hash.replace(/^#/,'');
				tlo.goToHash(hash, true);
			}); // hashchange

		} // init

	}; // tlo


	$.extend({
		targetLinkOffset: function(options) {

			// Merge settings
			tlo.settings = $.extend(tlo.defaults, options);

			// Run the main init
			tlo.init();

		}
	});

})(jQuery);
