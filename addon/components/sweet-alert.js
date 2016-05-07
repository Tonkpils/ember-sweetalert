import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  show: false,
  message: "",
  title: "",
  type: "",
  callback: () => {},

  setupSweetAlert: Ember.on('didInsertElement', function() {}),

  updateAttrs: Ember.on('didUpdateAttrs', function() {
    if (this.get('show')) {
      window.swal(this.get('title'), this.get('message'), this.get('type')).then((confirm) => {
        let cb = this.get('callback');
        cb(confirm);
        this.set('show', false);
      });
    }
  }),

  teardownSweetAlert: Ember.on('willDestroyElement', function() {
    this.get('sweet-alert').destroy();
  })
});
