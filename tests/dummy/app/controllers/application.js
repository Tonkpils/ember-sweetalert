import Ember from 'ember';
import SweetAlertMixin from 'ember-sweetalert/mixins/sweetalert-mixin';

const { Controller, RSVP } = Ember;

export default Controller.extend(SweetAlertMixin, {
  toggleModal: false,

  actions: {
    testing() {
      let sweetAlert = this.get('sweetAlert');
      sweetAlert({
        title: 'Submit email to run ajax request',
        input: 'email',
        showCancelButton: true,
        confirmButtonText: 'Submit',
        preConfirm() {
          return new RSVP.Promise((resolve)=> {
            sweetAlert.enableLoading();
            setTimeout(function() {
              resolve();
            }, 2000);
          });
        },
        allowOutsideClick: false
      }).then((email)=> {
        if (email) {
          sweetAlert({
            type: 'success',
            title: 'Ajax request finished!',
            html: `Submitted email: ${email}`
          });
        }
      });
    },
    toggle() {
      this.set('toggleModal', true);
    }
  }
});
