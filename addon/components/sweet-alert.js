import Ember from 'ember';
import sweetAlert from '../index';

const { Component, on } = Ember;

export default Component.extend({
  show: true,
  message: '',
  title: '',
  type: '',
  callback: ()=> {},

  setupSweetAlert: on('didInsertElement', function() {
    this._displaySweetAlert();
  }),

  updateAttrs: on('didUpdateAttrs', function() {
    this._displaySweetAlert();
  }),

  teardownSweetAlert: on('willDestroyElement', function() {}),

  _displaySweetAlert() {
    if (this.get('show')) {
      sweetAlert(this.get('title'), this.get('message'), this.get('type')).then((confirm)=> {
        let cb = this.get('callback');
        cb(confirm);
        this.set('show', false);
      });
    }
  }
});
