import Ember from 'ember';
import sweetAlert from 'sweetalert2';

const { Component } = Ember;

export default Component.extend({
  show: true,
  message: "",
  title: "",
  type: "",
  callback: () => {},

  setupSweetAlert: Ember.on('didInsertElement', function() {
    this._displaySweetAlert();
  }),

  updateAttrs: Ember.on('didUpdateAttrs', function() {
    this._displaySweetAlert();
  }),

  teardownSweetAlert: Ember.on('willDestroyElement', function() {}),

  _displaySweetAlert() {
    if (this.get('show')) {
      sweetAlert(this.get('title'), this.get('message'), this.get('type')).then((confirm) => {
        let cb = this.get('callback');
        cb(confirm);
        this.set('show', false);
      });
    }
  }
});
