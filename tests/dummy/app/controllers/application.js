import Controller from '@ember/controller';
import { Promise } from 'rsvp';
import { later } from '@ember/runloop';
import Swal from 'sweetalert2';

export default Controller.extend({
  toggleModal: false,

  actions: {
    loading() {
      return new Promise(resolve => {
        Swal.enableLoading();
        later(resolve, 2000);
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
