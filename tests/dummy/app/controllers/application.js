import Controller from '@ember/controller';
import { Promise } from 'rsvp';
import SweetAlertMixin from 'ember-sweetalert/mixins/sweetalert-mixin';

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
          return new Promise((resolve)=> {
            sweetAlert.enableLoading();
            setTimeout(function() {
              resolve();
            }, 2000);
          });
        },
        allowOutsideClick: false
      }).then(({ value })=> {
        if (value) {
          sweetAlert({
            type: 'success',
            title: 'Ajax request finished!',
            html: `Submitted email: ${value}`
          });
        }
      });
    },
    toggle() {
      this.set('toggleModal', true);
    }
  }
});
