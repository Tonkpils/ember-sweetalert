(function() {

	['sweetalert2'].forEach(function(name) {
		define(name, [], function() {
			'use strict';

			return {
				default: swal
			};
		});
	});

})();
