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
					percent = ($(id).innerWidth() / $('.graph').innerWidth()),
					amt = self.makePercent(percent * APP.monthly);

			$el.val(amt);
		},

		findWidth: function() {
			var width = 0;

			$('.blob').each(function() {
				width += $(this).innerWidth();
			});

			width += $('#savings').innerWidth() - 25;

			APP.blob.checkWidth(width);
		},

		checkWidth: function(width) {
			if (width >= $('.graph').innerWidth()) {
				APP.blob.shrinkSavings(width);
			} else if (width < $('.graph').innerWidth()) {
				APP.blob.growSavings(width);
			}
		},

		shrinkSavings: function(width) {
			var overflow = (width - $('.graph').innerWidth()),
					size = $('#savings').width() - overflow,
					id = '#savings';
			
			$('#savings').width(size);
			APP.blob.changeFields($('.choices input[name=savings]'), id);
		},

		growSavings: function(width) {
			var extra = ($('.graph').innerWidth() - width),
					size = $('#savings').width() + extra,
					id = '#savings';

			$('#savings').width(size);
			APP.blob.changeFields($('.choices input[name=savings]'), id);
		}

	}


})();