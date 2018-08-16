import Service from '@ember/service';
import { getOwner } from '@ember/application';
import { get, computed } from '@ember/object';
import { Promise } from 'rsvp';
import Swal from 'sweetalert2';

export default Service.extend({
  config: computed(function () {
    let config = (getOwner(this).resolveRegistration('config:environment') || {});

    return config['ember-sweetalert'] || {};
  }),

  sweetAlert: computed(function () {
    return Swal.mixin(get(this, 'config'));
  }),

  open(...args) {
    return new Promise((resolve, reject) => {
      get(this, 'sweetAlert')(...args).then(resolve, reject);
    });
  },

  enableLoading() {
    return Swal.enableLoading();
  }
});
