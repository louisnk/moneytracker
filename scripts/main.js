(function() {

	APP = window.APP || {};

	APP = {

		salary: 0,

		init: function() {
			var self = this;

			self._watchEnter($('.salary'), APP.math.checkSalary);

			self._watchEnter($('.choices'), APP.math.calcPercentages);

			self._bindClickHandlers($('.main-options button'), 
															self.math.checkSalary);

			$('.blob').resizable({
				resize: function(event,ui) {},
				autoHide: true,
			});

			$('.blob').on('resize',function(event,ui) {
				var title = $(this).text();
				
				APP.blob._resize(title,false);
			})

		},

		_bindClickHandlers: function($el,action,params) {

			$el.click(function(e) {
				e.preventDefault();					
				action(params);
			});

		},

		_watchEnter: function($el, action) {
			$el.keypress(function(e) {
				if (e.which == 13) {
					action();
				}
			});
		},

		_showOptions: function() {
			$('.choices').show();
			APP._bindClickHandlers($('.choices .submit'),
																APP.math.calcPercentages);
		},
	}

	$(document).ready(function() {
		
		APP.init();

	});
})();