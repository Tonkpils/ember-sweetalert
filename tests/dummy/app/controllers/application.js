import Ember from 'ember';

export default Ember.Controller.extend({
  toggleModal: false,

  actions: {
    testing() {
      window.swal("Hello World", "success");
    },
    toggle() {
      this.set('toggleModal', true);
    }
  }
});
