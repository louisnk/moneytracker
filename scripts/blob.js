(function() {

	var APP = window.APP || {};

	APP.blob = {

		blocksWidth: [],

		_resize: function(title,value,count) {

			var self = APP.blob,
					title = title.toLowerCase(),
					id = '#' + title,
					size = (value / APP.monthly) * 100;

			if (value) {			
				self.animateBlobs(id,size,value);
			} else if (!value) {

				var $el = $('.choices input[name=' + title + ']');
					
				self.changeFields($el,id);
				self.findWidth()
			}

			return ++count;

		},

		animateBlobs: function(id,size,value) {
				$(id).animate({
					width: size + '%',
				}, 100, 'swing', APP.math.updatePercentages(id,value));				
		},

		changeFields: function($el,id) {

			var self = APP.math,
					percent = ($(id).outerWidth() / $('.graph').outerWidth()),
					amt = self.makePercent(percent * APP.monthly);

			$el.val(amt);

			console.log('changing fields');
		},

		findWidth: function() {
			var width = 0;

			$('.blob').each(function() {
				width += $(this).outerWidth();
			});

			console.log(width + '------------------------- width found!');

			APP.blob.checkWidth(width);
		},

		checkWidth: function(width) {
			if (width >= $('.graph').outerWidth()) {
				APP.blob.shrinkSavings(width);
			} else if (width < $('.graph').outerWidth()) {
				APP.blob.growSavings(width);
			}

			console.log('width checked, passing it on....');
		},

		shrinkSavings: function(width) {
			var overflow = (width - $('.graph').outerWidth()),
					size = $('#savings').width() - overflow,
					id = '#savings';
			
			$('#savings').width(size);
			APP.blob.changeFields($('.choices input[name=savings]'), id);
		},

		growSavings: function(width) {
			var extra = ($('.graph').outerWidth() - width),
					size = $('#savings').width() + extra,
					id = '#savings';

			$('#savings').width(size);
			APP.blob.changeFields($('.choices input[name=savings]'), id);
		}

	}


})();