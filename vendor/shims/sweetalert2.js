(function() {
  function vendorModule() {
    'use strict';

    return {
      'default': self['Swal'],
      __esModule: true,
    };
  }

  define('sweetalert2', [], vendorModule);
})();
