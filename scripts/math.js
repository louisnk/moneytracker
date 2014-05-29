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
			var math = APP.math;
			var levels = [37000,
										53000,
										96000,
										199000,
										1000,
										1 	],

					total = 0;

			for (var i = 0; salary > 0; i++) {
				var bracket = levels[i];
				
				if (salary >= bracket && i < 5) {
					salary 	-= bracket;
					total 	+= math.taxBrackets(bracket,i)
				} else if (salary > 0) {
					total += math.taxBrackets(salary,i);
					salary = 0;
				}
			}

			monthly = math.makePercent((total-(total*0.04197))/12);
	
			return monthly;
		},

		taxBrackets: function(amount,level) {
			var math = APP.math,
					brackets = {
						'0': amount-(amount*0.15),
						'1': amount-(amount*0.25),
						'2': amount-(amount*0.28),
						'3': amount-(amount*0.33),
						'4': amount-(amount*0.35),
						'5': amount-(amount*0.396)
					}

			return brackets[level];

			// switch(true) {
			// 	case (amount < 37000):
			// 	  var num = (amount - (amount * 0.15));
			// 	  return APP.math.makePercent(num/12);
			// 		break;

			// 	case (amount > 37000 && amount < 90000):
			// 		var num = (amount - (amount * 0.25));
			// 		return APP.math.makePercent(num/12);
			// 		break;

			// 	case (amount > 90000 && amount < 186000):
			// 		var num = (amount - (amount * 0.28));
			// 		return APP.math.makePercent(num/12);
			// 		break;

			// 	case (amount > 186000 && amount < 405000):
			// 		var num = (amount - (amount * 0.33));
			// 		return APP.math.makePercent(num/12);
			// 		break;

			// 	case (amount > 405000 && amount < 406000):
			// 		var num = (amount - (amount * 0.35));
			// 		return APP.math.makePercent(num/12);
			// 		break;

			// 	case (amount > 406000):
			// 		var num = (amount - (amount * 0.396));
			// 		return APP.math.makePercent(num/12);
			// 		break;
			// }
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