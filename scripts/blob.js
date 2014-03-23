(function() {

	var APP = window.APP || {};

	APP.blob = {

		_resize: function(title,value) {

			var id = '#' + title.toLowerCase(),
					size = (value / APP.monthly) * 100;

			

			if(value) {			
				$(id).animate({
					width: size + '%',
				}, 300, 'swing', APP.math.updatePercentages(id,value));

			} else if (!value) {

				$('.choices input').each(function() {
					if ($(this).attr('name') == title) {
						var amt = ($(id).outerWidth() / $('.graph').outerWidth()) * APP.monthly;
						amt = APP.math.makePercent(amt);
						$(this).val(amt);
					}
				});
			}

		},

	}


})();