import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { Promise } from 'rsvp';
import { later, next } from '@ember/runloop';
import config from '../config/environment';

const testing = 'test' === config.environment;

export default Controller.extend({
  swal: service('swal'),

  toggleModal: false,

  actions: {
    loading() {
      return new Promise(resolve => {
        this.get('swal').enableLoading();
        testing ? next(null, resolve) : later(resolve, 2000);
      });
    },

    cancelled({ dismiss }) {
      this.set('cancellation', dismiss);
    },

    toggle() {
      this.set('toggleModal', true);
    },

    updateEmail({ value }) {
      this.set('email', value);
    },

    open() {
      this.get('swal').open({ title: 'Hello World!' });
    }
  }
});
