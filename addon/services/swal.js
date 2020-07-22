import Service from '@ember/service';
import { getOwner } from '@ember/application';
import { get, computed } from '@ember/object';
import { scheduleOnce } from '@ember/runloop';
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

  close() {
    this._run('close');
  },

  isVisible() {
    return Swal.isVisible();
  },

  mixin(params) {
    return get(this, 'sweetAlert').mixin(params);
  },

  getTitle() {
    return Swal.getTitle();
  },

  getCloseButton() {
    return Swal.getCloseButton();
  },

  getContent() {
    return Swal.getContent();
  },

  getImage() {
    return Swal.getImage();
  },

  getActions() {
    return Swal.getActions();
  },

  getFooter() {
    return Swal.getFooter();
  },

  getFocusableElements() {
    return Swal.getFocusableElements();
  },

  getConfirmButton() {
    return Swal.getConfirmButton();
  },

  getCancelButton() {
    return Swal.getCancelButton();
  },

  getButtonsWrapper() {
    return Swal.getButtonsWrapper();
  },

  enableButtons() {
    this._run('enableButtons');
  },

  disableButtons() {
    this._run('disableButtons');
  },

  enableConfirmButton() {
    this._run('enableConfirmButton');
  },

  disableConfirmButton() {
    this._run('disableConfirmButton');
  },

  showLoading() {
    this._run('showLoading');
  },

  enableLoading() {
    this._run('enableLoading');
  },

  hideLoading() {
    this._run('hideLoading');
  },

  disableLoading() {
    this._run('disableLoading');
  },

  isLoading() {
    return Swal.isLoading();
  },

  getTimerLeft() {
    return Swal.getTimerLeft();
  },

  stopTimer() {
    return Swal.stopTimer();
  },

  resumeTimer() {
    return Swal.resumeTimer();
  },

  toggleTimer() {
    return Swal.toggleTimer();
  },

  isTimerRunning() {
    return Swal.isTimerRunning();
  },

  increaseTimer(n) {
    return Swal.increaseTimer(n);
  },

  clickConfirm() {
    this._run('clickConfirm');
  },

  clickCancel() {
    this._run('clickCancel');
  },

  getInput() {
    return Swal.getInput();
  },

  disableInput() {
    this._run('disableInput');
  },

  enableInput() {
    this._run('enableInput');
  },

  showValidationMessage(error) {
    this._run('showValidationMessage', error);
  },

  resetValidationMessage() {
    this._run('resetValidationMessage');
  },

  getValidationMessage() {
    return this.getValidationMessage();
  },

  queue() {
    this._run('queue', ...arguments);
  },

  getQueueStep() {
    return Swal.getQueueStep();
  },

  insertQueueStep() {
    this._run('insertQueueStep', ...arguments);
  },

  deleteQueueStep(index) {
    this._run('deleteQueueStep', index);
  },

  getProgressSteps() {
    return Swal.getProgressSteps();
  },

  setProgressSteps() {
    this._run('setProgressSteps', ...arguments);
  },

  showProgressSteps() {
    this._run('showProgressSteps');
  },

  hideProgressSteps() {
    this._run('hideProgressSteps');
  },

  isValidParameter(param) {
    return Swal.isValidParameter(param);
  },

  _run(method, ...args) {
    scheduleOnce('afterRender', Swal, method, ...args);
  },
});
