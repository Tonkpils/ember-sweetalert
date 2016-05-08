/* jshint node: true */
'use strict';

module.exports = {
  name: 'ember-sweetalert',
  included: function(app, parentAddon) {
    let target = (parentAddon || app);

    target.import(`${target.bowerDirectory}/sweetalert2/dist/sweetalert2.min.js`);
    target.import(`${target.bowerDirectory}/sweetalert2/dist/sweetalert2.min.css`);
    // TODO: import IE support if configured to do so...
  }
};
