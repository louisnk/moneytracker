(function() {

		window.APP = {

			salary: 0,

			init: function() {
				var self = this;

				$('input .salary').on('keydown',function(e) {
					console.log('downed');
					if (e.which === '13') {
						console.log('entered');
					}
				});

				self._bindClickHandlers($('.main-options button'), 
																self.math.checkSalary);

				$('.blob').resizable({
					resize: function(event,ui) {},
				});

				$('.blob').on('resize',function(event,ui) {
					var text = $(this).text();
					text = text.toLowerCase();

					APP.blob._resize(text,false);
				})

			},

			_bindClickHandlers: function($el,action,params) {

				$el.click(function(e) {
					e.preventDefault();					
					action(params);
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