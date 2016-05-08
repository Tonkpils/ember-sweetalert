import Ember from 'ember';

export default Ember.Controller.extend({
  toggleModal: false,

  actions: {
    testing() {
      window.swal({
        title: 'Submit email to run ajax request',
        input: 'email',
        showCancelButton: true,
        confirmButtonText: 'Submit',
        preConfirm: function() {
          return new Ember.RSVP.Promise(function(resolve) {
            window.swal.enableLoading();
            setTimeout(function() {
              resolve();
            }, 2000);
          });
        },
        allowOutsideClick: false
      }).then(function(email) {
        if (email) {
          window.swal({
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
