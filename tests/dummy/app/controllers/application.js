import Controller from '@ember/controller';
import { Promise } from 'rsvp';
import { later, next } from '@ember/runloop';
import Swal from 'sweetalert2';
import config from '../config/environment';

const testing = 'test' === config.environment;

export default Controller.extend({
  toggleModal: false,

  actions: {
    loading() {
      return new Promise(resolve => {
        Swal.enableLoading();
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
    }
  }
});
