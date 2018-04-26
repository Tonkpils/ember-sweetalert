import Component from '@ember/component';
import sweetAlert from '../index';

export default Component.extend({
  show: true,
  message: '',
  title: '',
  type: '',
  callback: ()=> {},

  didInsertElement() {
    this._super(...arguments);
    this._displaySweetAlert();
  },

  didUpdateAttrs() {
    this._super(...arguments);
    this._displaySweetAlert();
  },

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
