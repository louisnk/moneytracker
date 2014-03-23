(function() {
	
	var APP = window.APP || {};

	APP.math = {

		checkSalary: function() {
			var	salary = parseInt(($('.salary').val()).replace(',',''),10);
			
			if (salary != '') {
				APP.salary = APP.math.calcSalary(salary);
				APP._showOptions();
				$('.monthly').append('<h4>Your monthly salary is: $' + 
																			APP.salary/12 + '</h4>')
				.show();
			} else {
				// APP.inform();
				console.log('no salary?');
			}
		},

		calcSalary: function(salary) {
			switch(true) {
				case (salary < 37000):
					return parseInt(salary - (salary * 0.15));
					break;

				case (salary > 37000 && salary < 90000):
					return parseInt(salary - (salary * 0.25));
					break;

				case (salary > 90000 && salary < 186000):
					return parseInt(salary - (salary * 0.28));
					break;

				case (salary > 186000 && salary < 405000):
					return parseInt(salary - (salary * 0.33));
					break;

				case (salary > 405000 && salary < 406000):
					return parseInt(salary - (salary * 0.35));
					break;

				case (salary > 406000):
					return parseInt(salary - (salary * 0.396));
					break;
			}
			return;
		},

		calcPercentages: function() {
			APP.monthly = APP.salary /12,
					monthly = APP.monthly, 	
					amount = {},
					total = 0,
					self = APP.math;

			$('.choices input').each(function() {
				
				var title = ($.trim($(this).parent().text())).toLowerCase(),
						value = self.makePercent($(this).val());
				
				if (isNaN(value)) value = 0;

				amount[title] = value/monthly;

				APP.blob._resize(title,value);

			});
			
			_.each(amount,function(num) { total += num })

			if (total > 0 && total < 2) {
				total = total * 100;
				total = self.makePercent(total);
			} else {
				$('.percent').html('<h4>You are massively exceeding your budget</h4>');
				return;
			}

			$('.percent').html('<h4>You are currently using ' + 
																		total + '% of your monthly budget</h4>');
		},

		makePercent: function(total) {
			total = parseFloat((parseFloat(total)).toFixed(2));

			return total;
		},

		changeFields: function($el,vals) {
			var percent = parseInt($el.outerWidth() / ($('.graph').outerWidth() -10)),
					box = $el.attr('id'),
					val = percent * APP.monthly;

			console.log(box);
			return;
			if(!isNaN(val)) {
				
				console.log(val + 'changeFields');
				// $("'#"+box+"'").text(val);
			} else {
				console.error('nope');
			}


		},

		updatePercentages: function(id,value) {
			var percent = value / APP.monthly,
					amt = parseInt(percent * APP.monthly),
					name = id.slice(1);	

					$('.choices input[name=' + name + ']').val(amt);
			
			return;
		},

		numberWithCommas: function(x) {
					
	    var parts = x.toString().split(".");
	    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	    return parts.join(".");
		},

	}

	
})();