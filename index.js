'use strict';

module.exports = {
  name: 'ember-sweetalert',

  included: function included(app) {
    this._super.included.apply(this, arguments);

    app.import(require.resolve('sweetalert2'));
    app.import(this.treePaths.vendor + '/shims/sweetalert2.js');
  }
};
