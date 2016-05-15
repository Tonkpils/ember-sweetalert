import Ember from 'ember';
import SweetAlertMixin from 'ember-sweetalert/mixins/sweetalert-mixin';

export default Ember.Controller.extend(SweetAlertMixin, {
  toggleModal: false,

  actions: {
    testing() {
      this.sweetAlert({
        title: 'Submit email to run ajax request',
        input: 'email',
        showCancelButton: true,
        confirmButtonText: 'Submit',
        preConfirm: function() {
          return new Ember.RSVP.Promise(function(resolve) {
            this.sweetAlert.enableLoading();
            setTimeout(function() {
              resolve();
            }, 2000);
          });
        },
        allowOutsideClick: false
      }).then(function(email) {
        if (email) {
          this.sweetAlert({
            type: 'success',
            title: 'Ajax request finished!',
            html: 'Submitted email: ' + email
          });
        }
      });
    },
    toggle() {
      this.set('toggleModal', true);
    }
  }
});
