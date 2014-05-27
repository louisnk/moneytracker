(function() {
	
	var APP = window.APP || {};

	APP.math = {



		checkSalary: function() {
			var	salary = parseInt(($('.salary').val()).replace(',',''));
			if (!isNaN(salary)) {
				APP.salary = salary,
				APP.monthly = APP.math.calcSalary(salary);
				
				APP._showOptions();
				$('.monthly').empty().append('<h4>Your post-tax monthly salary is: $' + 
																			APP.monthly + '</h4>')
				.show();
			} else {
				$('.monthly').empty().append('<h4>Please enter a number</h4>').show();
			}
		},

		calcSalary: function(salary) {
			switch(true) {
				case (salary < 37000):
				  var num = (salary - (salary * 0.15));
				  return APP.math.makePercent(num/12);
					break;

				case (salary > 37000 && salary < 90000):
					var num = (salary - (salary * 0.25));
					return APP.math.makePercent(num/12);
					break;

				case (salary > 90000 && salary < 186000):
					var num = (salary - (salary * 0.28));
					return APP.math.makePercent(num/12);
					break;

				case (salary > 186000 && salary < 405000):
					var num = (salary - (salary * 0.33));
					return APP.math.makePercent(num/12);
					break;

				case (salary > 405000 && salary < 406000):
					var num = (salary - (salary * 0.35));
					return APP.math.makePercent(num/12);
					break;

				case (salary > 406000):
					var num = (salary - (salary * 0.396));
					return APP.math.makePercent(num/12);
					break;
			}
			return;
		},

		calcPercentages: function() {
			
			var	monthly = APP.monthly, 	
					percent = {},
					self = APP.math,
					count = 0;

			$('.choices input').each(function() {
				
				var title = ($.trim($(this).parent().text())).toLowerCase(),
						value = self.makePercent($(this).val());
				
				if (isNaN(value)) value = 0;

				percent[title] = value/monthly;

				count = APP.blob._resize(title,value,count);

			});
			self.checkFinished(count);
			// if (count == 10) {
			// 	self.checkTotal(percent);
			// }
		},

		checkFinished: function(count) {
			setTimeout(function() {
				if (count == $('.choices input').length) {
				
			 	APP.blob.checkWidth(APP.blob.findWidth());
			}},200);
		},

		checkTotal: function(percent,callback) {
			var total = 0,
					blob = APP.blob;
			
			_.each(percent, function(num) { total += num });

			if (total < 1 && count == 10) {
				blob.checkWidth(blob.findWidth());
				console.log(total + '-------' + count);
			}
		},

		makePercent: function(total) {
			total = parseFloat((parseFloat(total)).toFixed(2));

			return total;
		},

		updatePercentages: function(id,value) {

			var percent = value / APP.monthly,
					amt = parseInt(percent * APP.monthly),
					name = id.slice(1);	

					$('.choices input[name=' + name + ']').val(amt);
			
			return;
		}

		// numberWithCommas: function(x) {
					
		//  var parts = x.toString().split(".");
	  //  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	  //  return parts.join(".");
		// },

	}

})();