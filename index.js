
/* jshint node: true */
'use strict';

var Funnel = require('broccoli-funnel');
var MergeTrees = require('broccoli-merge-trees');

module.exports = {
  name: 'ember-sweetalert',

  treeForAddon: function() {
    var addonTree = this._super.treeForAddon.apply(this, arguments);

    var swal = new Funnel('node_modules/sweetalert2/src', {
      destDir: 'modules',
      files: ['sweetalert2.js']
    });

    var swalStyles = new Funnel('node_modules/sweetalert2/dist', {
      destDir: 'assets',
      files: ['sweetalert2.css']
    });

    return new MergeTrees([addonTree, swal, swalStyles]);
  }
};
